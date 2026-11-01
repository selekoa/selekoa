/**
 * Per-page data: where a page's slice is published, and how slices are put
 * together. A slice holds the records rendering a page reads, with only the
 * fields read (src/prerender/trace.ts), and where each record stands in the
 * dataset, so that slices put together keep the dataset's order. Claim
 * pages share bucket files, by a hash of the claim ID, which also serve a
 * claim panel opened anywhere. See docs/data-loading-design-c.md
 * ("Per-page data").
 */
import { normalisePath, queryForm } from './addresses';
import type { Dataset } from './schema';
import type { CollectionIndex } from './collection-index';
import type { Topic } from './predicates';

export const sliceKinds = [
  'entities',
  'claims',
  'sources',
  'evidence',
] as const;
export type SliceKind = (typeof sliceKinds)[number];

/**
 * Part of the dataset: some records, each with some of its fields, and the
 * dataset description with the fields read, if any.
 */
export type Slice = {
  meta?: Partial<Dataset['meta']>;
  entities: Partial<Dataset['entities'][number]>[];
  claims: Partial<Dataset['claims'][number]>[];
  sources: Partial<Dataset['sources'][number]>[];
  evidence: Partial<Dataset['evidence'][number]>[];
};
/**
 * A slice with each record's position in the dataset, and the dataset's
 * version: positions hold only within one version of the dataset.
 */
export type PlacedSlice = Slice & {
  at: Record<SliceKind, number[]>;
  version?: string;
  /**
   * Set when a page drawn from this slice needs the whole relation core as
   * well (a page that counts or draws every record, such as the explorer).
   * Without it the slice stands alone: it holds every record the page
   * reads, with its relation fields (src/prerender/trace.ts).
   */
  core?: true;
  /**
   * The collection index entries of the records it holds
   * (`indexFor` in src/domain/collection-index.ts).
   */
  index?: CollectionIndex;
};

/**
 * A short fingerprint of the dataset (FNV-1a over its JSON), written into
 * the core and every slice, so that parts of different builds are never put
 * together (a tab kept open across a deploy).
 */
export function datasetVersion(data: Dataset) {
  return hash(JSON.stringify(data)).toString(36);
}

/**
 * The fields of the relation core: what pages read to choose and order
 * records (who, what relation, which topic, when; which claim and source a
 * passage belongs to; an entity's type and document version). A slice holds
 * them for each of its records and for the records related to them, so that
 * scans over it give the results they give over the whole dataset for the
 * records the page names. The whole core (every record) is what the
 * explorer and the map read, and what a page whose slice says `core` holds
 * as well; with the content it makes the whole records.
 */
export const coreFields: Record<SliceKind, readonly string[]> = {
  entities: ['id', 'type', 'proposition', 'documentVersion'],
  claims: ['id', 'subject', 'predicate', 'object', 'topic', 'time'],
  sources: ['id', 'publisherId', 'documentId'],
  evidence: ['id', 'claimId', 'sourceId'],
};

/** The name under which the core is loaded: a module, not a slice file. */
export const corePath = 'core';

export function coreOf(data: Dataset): PlacedSlice {
  const keep = <T extends object>(kind: SliceKind, records: T[]) =>
    records.map(
      (r) =>
        Object.fromEntries(
          Object.entries(r).filter(([f]) => coreFields[kind].includes(f)),
        ) as Partial<T>,
    );
  const all = (records: unknown[]) => records.map((_, i) => i);
  return {
    version: datasetVersion(data),
    entities: keep('entities', data.entities),
    claims: keep('claims', data.claims),
    sources: keep('sources', data.sources),
    evidence: keep('evidence', data.evidence),
    at: {
      entities: all(data.entities),
      claims: all(data.claims),
      sources: all(data.sources),
      evidence: all(data.evidence),
    },
  };
}

/** How many files claim slices are packed into. */
export const claimBuckets = 128;

/** Pages built with a slice of their own, by the first segment of the path. */
const slicedPages = new Set([
  'dossier',
  'person',
  'document',
  'documents',
  'compare',
  'control',
  'commitments',
  'guide',
  'propositions',
  'question',
  'year',
]);

/** Pages without an ID built with a slice: About & method, the explorer. */
const singlePages = new Set(['about', 'explore', 'years']);
const hubs = new Set(['governance', 'ideas', 'institutions']);

/** FNV-1a: a fixed, quick hash, the same in the build and the browser. */
function hash(text: string) {
  let h = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/** The bucket file holding a claim's slice. */
export const bucketPath = (claimId: string) =>
  `/slices/claims/${hash(claimId) % claimBuckets}.json`;

/** The file holding a page's slice, or null when the page has none. */
export function slicePath(path: string): string | null {
  const [, kind, id, rest] = normalisePath(path).split('/');
  // The three hubs read the same records; they share one file.
  if (!id && hubs.has(kind)) return '/slices/hubs.json';
  if (!id && singlePages.has(kind)) return `/slices/${kind}.json`;
  if (!id || rest !== undefined) return null;
  if (kind === 'claim') return bucketPath(decodeURIComponent(id));
  return slicedPages.has(kind) ? `/slices/${kind}/${id}.json` : null;
}

/**
 * What the browser loads to draw a page at an address: the files of slices,
 * or the whole records. A page with a slice needs only it (and the relation
 * core when the slice says so), and the bucket of a claim inspected on it;
 * any other query (a section, an edition, a bookmarked claim) needs the whole
 * records, as do pages without a slice. The search page needs neither,
 * unless a claim is inspected.
 */
export function dataNeeds(address: string): {
  records: boolean;
  parts: string[];
} {
  const url = new URL(queryForm(address), 'https://site.invalid');
  const inspect = url.searchParams.get('inspect');
  const others = [...url.searchParams.keys()].filter(
    (k) => k !== 'inspect' && k !== 'q' && k !== 'mode',
  );
  const inspected = inspect ? [bucketPath(inspect)] : [];
  const path = normalisePath(url.pathname);
  // The search page runs without records; its claim panel and every change
  // of page from it use the whole records.
  if (path === '/search')
    return { records: others.length > 0 || !!inspect, parts: [] };
  const own = slicePath(path);
  if (!own || others.length || url.searchParams.has('q'))
    return { records: true, parts: [] };
  return { records: false, parts: [own, ...inspected] };
}

/**
 * A slice laid over the core, which holds every record in dataset order:
 * each record of the slice adds its fields to the core's.
 */
export function overlay(core: PlacedSlice, part: PlacedSlice): Slice {
  const laid = {} as Record<SliceKind, Record<string, unknown>[]>;
  for (const kind of sliceKinds) {
    const list = (core[kind] as Record<string, unknown>[]).slice();
    (part[kind] as Record<string, unknown>[]).forEach((record, i) => {
      const at = part.at[kind][i];
      list[at] = { ...list[at], ...record };
    });
    laid[kind] = list;
  }
  return {
    ...(part.meta ? { meta: part.meta } : {}),
    ...(laid as unknown as Slice),
  };
}

/** Slices put together, record by record and field by field, in dataset order. */
export function mergeSlices(parts: readonly PlacedSlice[]): PlacedSlice {
  const merged = Object.fromEntries(
    sliceKinds.map((k) => [k, new Map<number, Record<string, unknown>>()]),
  ) as Record<SliceKind, Map<number, Record<string, unknown>>>;
  let core = false;
  const index = mergeIndexes(parts.flatMap((p) => (p.index ? [p.index] : [])));
  for (const part of parts) {
    core ||= !!part.core;
    for (const kind of sliceKinds)
      (part[kind] as Record<string, unknown>[]).forEach((record, i) => {
        const at = part.at[kind][i];
        merged[kind].set(at, { ...merged[kind].get(at), ...record });
      });
  }
  // Each part's description holds the fields its page reads: together, every
  // field any of them holds. The fullest goes first, so that a description
  // read whole (whose page holds every field) keeps its stored order.
  const metas = parts
    .flatMap((p) => (p.meta ? [p.meta] : []))
    .sort((a, b) => Object.keys(b).length - Object.keys(a).length);
  const meta: Slice['meta'] = metas.length
    ? Object.assign({}, ...metas)
    : undefined;
  const sorted = Object.fromEntries(
    sliceKinds.map((k) => [k, [...merged[k]].sort((a, b) => a[0] - b[0])]),
  ) as Record<SliceKind, [number, Record<string, unknown>][]>;
  return {
    ...(meta ? { meta } : {}),
    ...(core ? { core: true as const } : {}),
    ...(index ? { index } : {}),
    ...(Object.fromEntries(
      sliceKinds.map((k) => [k, sorted[k].map(([, r]) => r)]),
    ) as unknown as Slice),
    at: Object.fromEntries(
      sliceKinds.map((k) => [k, sorted[k].map(([at]) => at)]),
    ) as Record<SliceKind, number[]>,
  };
}

/**
 * The collection index entries of several parts together: each claim's and
 * document's entries once, each collection's claims and records from every
 * part, and the chronicle's scheduled and stated dates from every part.
 * Every part lists every collection in the same order, and the chronicle's
 * years.
 */
export function mergeIndexes(
  list: readonly CollectionIndex[],
): CollectionIndex | undefined {
  if (list.length < 2) return list[0];
  // The same claim or document has the same entries in every part.
  const once = <T>(entries: [string, T][]) => [...new Map(entries)];
  return {
    byClaim: once(list.flatMap((x) => x.byClaim)),
    marks: once(list.flatMap((x) => x.marks)),
    chronicle: {
      // The years and counts are the whole dataset's in every part.
      years: list[0].chronicle.years,
      scheduled: [
        ...new Set(list.flatMap((x) => x.chronicle.scheduled)),
      ].sort(),
      statedBy: [
        ...list
          .flatMap((x) => x.chronicle.statedBy)
          .reduce(
            (years, [year, ids]) =>
              years.set(year, new Map([...(years.get(year) ?? []), ...ids])),
            new Map<number, Map<string, Topic>>(),
          ),
      ]
        .sort(([a], [b]) => a - b)
        .map(([year, ids]) => [
          year,
          [...ids].sort(([a], [b]) => a.localeCompare(b)),
        ]),
    },
    collections: list[0].collections.map((c, i) => {
      const all = list.map((x) => x.collections[i]);
      const records = c.records
        ? [
            ...new Map(
              all.flatMap((x) => x.records ?? []).map((r) => [r.claim.id, r]),
            ).values(),
          ]
        : undefined;
      return {
        ...c,
        claimIds: [...new Set(all.flatMap((x) => x.claimIds))],
        ...(records ? { records } : {}),
      };
    }),
  };
}

/**
 * Every field the core leaves out, for every record, with the dataset
 * description: put together with the core (`assemble`), the whole dataset,
 * each record with its fields in their stored order. It replaces the single
 * records chunk the browser loaded before (docs/data-loading-design-c.md,
 * stage c3). Compact: each record is the index of its field order followed
 * by the values of its fields outside the core, in that order.
 */
export type Content = {
  version: string;
  meta: Dataset['meta'];
  orders: string[][];
  records: Record<SliceKind, unknown[][]>;
};

export function contentOf(data: Dataset): Content {
  const orders: string[][] = [];
  const known = new Map<string, number>();
  const records = {} as Content['records'];
  for (const kind of sliceKinds)
    records[kind] = (data[kind] as unknown as Record<string, unknown>[]).map(
      (record) => {
        const keys = Object.keys(record);
        const key = keys.join(',');
        let order = known.get(key);
        if (order === undefined) {
          order = orders.push(keys) - 1;
          known.set(key, order);
        }
        const values = keys
          .filter((k) => !coreFields[kind].includes(k))
          .map((k) => record[k]);
        // JSON would turn an undefined value into null, and exports with it.
        if (values.includes(undefined))
          throw new Error(
            `${kind} ${String(record.id)} has an undefined field`,
          );
        return [order, ...values];
      },
    );
  return { version: datasetVersion(data), meta: data.meta, orders, records };
}

/** The whole dataset from the core and the content of the same version. */
export function assemble(core: PlacedSlice, content: Content): Dataset {
  if (core.version !== content.version)
    throw new Error('The core and the content are of different versions');
  const kinds = {} as Record<SliceKind, Record<string, unknown>[]>;
  for (const kind of sliceKinds)
    kinds[kind] = content.records[kind].map(([order, ...values], i) => {
      const held = core[kind][i] as Record<string, unknown>;
      const record: Record<string, unknown> = {};
      let next = 0;
      for (const key of content.orders[order as number])
        record[key] = coreFields[kind].includes(key)
          ? held[key]
          : values[next++];
      return record;
    });
  return { meta: content.meta, ...kinds } as unknown as Dataset;
}

/**
 * Where the build writes the layouts of the map centred on a record with a
 * page of its own: an organisation's dossier map, a person's map. Beside the
 * page slices, under their headers (docs/data-loading-design-c.md); read
 * by src/ui/map-layout.ts.
 */
export function mapLayoutPath(
  entity: Pick<Dataset['entities'][number], 'id' | 'type'>,
) {
  const kind =
    entity.type === 'organisation'
      ? 'dossier'
      : entity.type === 'person'
        ? 'person'
        : null;
  return kind && `/slices/map/${kind}/${entity.id}.json`;
}
