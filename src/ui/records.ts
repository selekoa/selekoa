/**
 * The records the browser holds, as one repository whose contents are
 * replaced when more have loaded. The page renderer holds the whole dataset
 * from the start (src/prerender/render.tsx). The browser starts with none and
 * loads what a page needs before it is drawn: a page's slice and claim
 * buckets, with the relation core when a slice says it needs it
 * (`loadData`), or the whole records (`loadRecords`), before a
 * built page is taken over (`preloadData` in App) and before any change of
 * page that needs more (`whenData`, `whenRecords`). A link from a page drawn
 * from its slice opens the next page from that page's own parts alone
 * (`partsFor`), as a fresh load of its address holds them. See
 * docs/data-loading-design-c.md ("The browser repository", "Navigation").
 */
import { useSyncExternalStore } from 'react';
import { flushSync } from 'react-dom';
import {
  bucketPath,
  corePath,
  dataNeeds,
  mergeSlices,
  overlay,
  type PlacedSlice,
} from '../domain/slices';
import type { Repository } from '../domain/repository';
import type { Dataset } from '../domain/schema';
import type { CollectionIndex } from '../domain/collection-index';
import { settled, track, type Tracked } from './tracked';
import { remember, type Remembered } from '../domain/memo';
import { pageFailed } from './page-failure';

/** A repository over part of the dataset. */
export function repositoryOf(data: Dataset): Repository {
  return {
    data,
    entities: new Map(data.entities.map((e) => [e.id, e])),
    claims: new Map(data.claims.map((c) => [c.id, c])),
    sources: new Map(data.sources.map((s) => [s.id, s])),
    evidence: new Map(data.evidence.map((e) => [e.id, e])),
  };
}

const none = repositoryOf({
  meta: undefined as unknown as Dataset['meta'],
  entities: [],
  claims: [],
  sources: [],
  evidence: [],
});

let current: Repository = none;
/** Whether `current` is the whole dataset rather than parts of it. */
let whole = false;
const listeners = new Set<() => void>();
let loader: (() => Promise<Repository>) | null = null;
let loading: Tracked<void> | null = null;
let fetchPart: ((url: string) => Promise<PlacedSlice>) | null = null;
/** Parts held or loading, by file. */
const partLoads = new Map<string, Tracked<void>>();
const parts = new Map<string, PlacedSlice>();
/** Files fetched, held or not, by file: a page's parts are fetched once. */
const fetched = new Map<string, Tracked<PlacedSlice>>();
/**
 * Counts the pages opened from their parts alone (`holdOnly`): a part still
 * loading for a page the reader has left is not held with the next one.
 */
let visits = 0;

const changed = () => {
  for (const listener of listeners) listener();
};

type PartsHook = (data: Dataset, index: CollectionIndex | undefined) => void;
const partHooks: PartsHook[] = [];
/**
 * Runs whenever parts are held, with the dataset they make and the
 * collection index entries the slices held carry: the renderer and the
 * browser give the dataset those entries (src/domain/collection-index.ts).
 * A dataset held as a part as it is (`holdAsPart`) comes with none.
 */
export const onPartsHeld = (hook: PartsHook) => {
  partHooks.push(hook);
};
const partsHeld = (index?: CollectionIndex) => {
  for (const hook of partHooks) hook(current.data, index);
  changed();
};

/** The records held now; read at the moment of use, never kept. */
export const repository: Repository = {
  get data() {
    return current.data;
  },
  get entities() {
    return current.entities;
  },
  get claims() {
    return current.claims;
  },
  get sources() {
    return current.sources;
  },
  get evidence() {
    return current.evidence;
  },
};

/** Holds the whole dataset from now on, or none. */
export function holdRecords(next: Repository | null) {
  current = next ?? none;
  whole = next !== null;
  loading = null;
  parts.clear();
  partLoads.clear();
  fetched.clear();
  visits += 1;
  changed();
}

/**
 * Holds parts of the dataset (slices) together with those already held.
 * Once the whole dataset is held, parts add nothing.
 */
export function holdParts(added: Record<string, PlacedSlice>) {
  if (whole) return;
  for (const [file, part] of Object.entries(added)) parts.set(file, part);
  const core = parts.get(corePath);
  const others = [...parts].filter(([file]) => file !== corePath);
  const merged =
    others.length === 1 ? others[0][1] : mergeSlices(others.map(([, p]) => p));
  const data = core ? overlay(core, merged) : merged;
  // The description holds only the fields the pages held read
  // (src/prerender/trace.ts); each page is checked to draw from it.
  current = repositoryOf({
    ...(data as unknown as Dataset),
    meta: (merged.meta ?? undefined) as Dataset['meta'],
  });
  partsHeld(merged.index);
}

/**
 * Holds a dataset as a part, as it is: the renderer draws a page from one
 * whose records note each field read (src/prerender/trace.ts).
 */
let asPart: Repository | undefined;
export function holdAsPart(data: Dataset) {
  holdRecords(null);
  current = asPart?.data === data ? asPart : (asPart = repositoryOf(data));
  partsHeld();
}

/** How the browser loads a part's file (src/main.tsx). */
export function provideParts(load: (url: string) => Promise<PlacedSlice>) {
  fetchPart = load;
}

/** Fetches a part's file once, without holding it. */
function fetchOnce(url: string): Tracked<PlacedSlice> {
  let found = fetched.get(url);
  if (!found) {
    if (!fetchPart) throw new Error('No parts to load');
    found = track(
      // A file that failed is fetched again at the next request.
      fetchPart(url).catch((error: unknown) => {
        fetched.delete(url);
        throw error;
      }),
    );
    fetched.set(url, found);
  }
  return found;
}

/** Loads a part once; resolves when it is held. */
function loadPart(url: string): Tracked<void> {
  if (whole || parts.has(url)) return settled(undefined);
  let found = partLoads.get(url);
  if (!found) {
    const visit = visits;
    found = track(
      fetchOnce(url)
        .then(async (part) => {
          // A slice that needs the whole relation core is held with it.
          if (part.core) await loadPart(corePath);
          // A part asked for by a page the reader has since left (a claim
          // panel's bucket) is not held with the page in view.
          if (visit !== visits) return;
          // Parts of another build cannot be put together with these.
          const version = [...parts.values()][0]?.version;
          if (version && part.version !== version)
            throw new Error(`${url} is from another version of the records`);
          holdParts({ [url]: part });
        })
        // A part that failed (or whose core failed) is tried again at the
        // next request.
        .catch((error: unknown) => {
          if (partLoads.get(url) === loadingPart) partLoads.delete(url);
          fetched.delete(url);
          throw error;
        }),
    );
    const loadingPart = found;
    partLoads.set(url, found);
  }
  return found;
}

/**
 * Holds these parts and nothing else: the parts a fresh load of a page's
 * address holds. Parts held for the page left (its slice, claim panels'
 * buckets) are dropped, and so are their fetched files, except those of the
 * page opened.
 */
function holdOnly(added: Record<string, PlacedSlice>) {
  visits += 1;
  // Records that finished loading meanwhile are dropped too.
  whole = false;
  loading = null;
  parts.clear();
  partLoads.clear();
  for (const url of [...fetched.keys()])
    if (!(url in added)) fetched.delete(url);
  if (Object.keys(added).length) holdParts(added);
  else {
    // A page that holds no records (search), as when opened afresh.
    current = none;
    changed();
  }
}

/**
 * Starts fetching the parts a page at this address needs, without holding
 * them: a link pointed at or focused. Nothing for a page that needs the
 * whole records.
 */
export function prefetchParts(address: string) {
  const needs = dataNeeds(address);
  if (needs.records || whole) return;
  for (const url of needs.parts)
    fetchOnce(url).then(
      (part) => (part.core ? fetchOnce(corePath) : undefined),
      () => {},
    );
}

/**
 * Fetches what a page at this address needs, without holding it; resolves to
 * a function that holds those parts and only those (`holdOnly`), to be called
 * in the change of page itself, so that the page in view is drawn from its
 * own records until it is replaced. Rejects for a page that needs the whole
 * records, and when a part cannot be loaded or parts are of different
 * versions.
 */
export async function partsFor(address: string): Promise<() => void> {
  const needs = dataNeeds(address);
  if (needs.records) throw new Error(`${address} needs the whole records`);
  const loaded = await Promise.all(needs.parts.map(fetchOnce));
  const held: Record<string, PlacedSlice> = Object.fromEntries(
    needs.parts.map((url, i) => [url, loaded[i]]),
  );
  if (loaded.some((part) => part.core))
    held[corePath] = await fetchOnce(corePath);
  const versions = new Set(Object.values(held).map((part) => part.version));
  if (versions.size > 1)
    throw new Error(`The parts of ${address} are of different versions`);
  return () => holdOnly(held);
}

/** Whether what a page at this address needs is held. */
export function dataHeld(address: string) {
  const needs = dataNeeds(address);
  return needs.records
    ? whole
    : whole || needs.parts.every((url) => parts.has(url));
}

/** Loads what a page at this address needs; resolves when it is held. */
export function loadData(address: string): Promise<unknown> {
  const needs = dataNeeds(address);
  return needs.records
    ? loadRecords()
    : Promise.all(needs.parts.map(loadPart)).catch(fallBack);
}

/**
 * When a part cannot be loaded (offline, a file gone after a deploy, or from
 * another version of the records), the whole records serve instead.
 */
function fallBack(error: unknown) {
  console.error('Part of the records could not be loaded; loading all', error);
  return loadRecords();
}

/**
 * Runs a change to the page at an address once what it needs is held, at
 * once when it is.
 */
export function whenData(address: string, change: () => void) {
  if (dataHeld(address)) change();
  else
    loadData(address).then(
      () => flushSync(change),
      // A change of page that cannot be made is made by the browser.
      (error: unknown) => pageFailed('The records could not be loaded', error),
    );
}

/** Loads the bucket of a claim, for its claim panel; resolves when held. */
export const loadClaim = (claimId: string) =>
  loadPart(bucketPath(claimId)).catch(fallBack);
export const claimHeld = (claimId: string) =>
  whole || parts.has(bucketPath(claimId));

/**
 * Loads a further part of a page once the page is drawn, such as the text
 * of the Model cards page's cells (`cellTextPath`); resolves when held.
 */
export const loadFurther = (url: string) => loadPart(url).catch(fallBack);
export const furtherHeld = (url: string) => whole || parts.has(url);

/** How the browser loads the records chunk (src/main.tsx). */
export function provideRecords(load: () => Promise<Repository>) {
  loader = load;
}

/** Whether the whole dataset is held. */
export const recordsHeld = () => whole;

/** Loads the records once; resolves when they are held. */
export function loadRecords(): Tracked<void> {
  if (recordsHeld()) return settled(undefined);
  if (!loader) throw new Error('No records to load');
  // A failed load (offline, or a file gone after a deploy) is tried again
  // at the next request.
  return (loading ??= track(
    loader().then(holdRecords, (error: unknown) => {
      loading = null;
      throw error;
    }),
  ));
}

/**
 * Runs a change of page once the records are held: at once when they are,
 * otherwise after they have loaded, with the next page's code (`code`), so
 * that the page in view stays until the next one can be drawn. The change
 * reads `repository`, which holds them by then.
 */
export function whenRecords(change: () => void, code?: () => Promise<unknown>) {
  if (recordsHeld()) change();
  else
    Promise.all([loadRecords(), code?.()]).then(
      // Drawn at once, as a change made in the event itself would be, so
      // that what the change does next (such as moving focus) finds it.
      () => flushSync(change),
      // A change of page that cannot be made is made by the browser.
      (error: unknown) => pageFailed('The records could not be loaded', error),
    );
}

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};
/**
 * The records held, as a value that changes when others are held: for
 * values a component computes from them. Event handlers read `repository`.
 */
export const useHeldRecords = () =>
  useSyncExternalStore(
    subscribe,
    () => current,
    () => current,
  );

/** Values computed from the records held, once per set of records. */
export function perRecords<T>(make: () => T) {
  const made = new WeakMap<Dataset, Remembered<T>>();
  return () => remember(made, current.data, make);
}
