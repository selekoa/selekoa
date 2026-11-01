/**
 * Where a map's positions come from. The build lays out the map centred on
 * each organisation and person with a page, as their pages draw it, and
 * writes it beside the page slices (`mapLayoutPath`). A map whose records
 * match such a layout (the same `layoutKey`) is drawn from it at once. Any
 * other map (a search, a topic, other filters) is laid out in a worker,
 * off the main thread; when it is centred on a record with a stored layout,
 * that layout seeds it, so records keep their bearings when filters change.
 */
import type { Claim, Entity } from '../domain/schema';
import {
  layoutKey,
  networkLayout,
  readLayout,
  type LayoutFile,
  type Point,
  type StoredLayout,
} from './layout';
import type { LayoutAnswer, LayoutRequest } from './layout-worker';

const files = new Map<string, Promise<StoredLayout[]>>();

/** The layouts stored at a path; none when the file cannot be read. */
function stored(path: string) {
  let file = files.get(path);
  if (!file) {
    file = fetch(path)
      .then((response) => {
        if (!response.ok) throw new Error(`${path}: ${response.status}`);
        return response.json() as Promise<LayoutFile>;
      })
      .then(
        (f) => f.layouts,
        (error: unknown) => {
          console.warn('No stored map layout; laying it out here', error);
          files.delete(path);
          return [];
        },
      );
    files.set(path, file);
  }
  return file;
}

/** Starts loading the stored layouts at a path, without waiting. */
export const prefetchLayout = (path: string) => void stored(path);

/** A layout asked for, waiting for its turn or being computed. */
type Job = {
  id: string;
  request: Omit<LayoutRequest, 'n'>;
  resolve: (positions: Map<string, Point>) => void;
  reject: (reason: unknown) => void;
  /** How many maps still wait for it; at none it is dropped unstarted. */
  wanted: number;
};

/**
 * One layout at a time goes to the worker; the others wait here, so that a
 * layout no map still wants (the reader changed the filters again) is
 * dropped before it starts instead of delaying the one they want.
 */
const queue: Job[] = [];
let running: {
  job: Job;
  n: number;
  timer?: ReturnType<typeof setTimeout>;
} | null = null;
let worker: Worker | null | undefined;
let asked = 0;
/**
 * How long a layout may take in the worker before it is computed here
 * instead: a worker whose script never arrives sends no error.
 */
const patience = 15_000;

function layoutWorker() {
  if (worker !== undefined) return worker;
  try {
    worker = new Worker(new URL('./layout-worker.ts', import.meta.url), {
      type: 'module',
    });
    worker.onmessage = (event: MessageEvent<LayoutAnswer>) => {
      if (!running || event.data.n !== running.n) return;
      const { job, timer } = running;
      clearTimeout(timer);
      running = null;
      job.resolve(new Map(event.data.positions));
      next();
    };
    // A script that fails to load (a dropped request, a file gone after a
    // deploy) or a layout that fails there: lay out in the page from now on.
    worker.onerror = worker.onmessageerror = () => giveUpWorker();
  } catch {
    worker = null;
  }
  return worker;
}

function giveUpWorker() {
  console.warn('The map layout worker failed; laying out maps in the page');
  worker?.terminate();
  worker = null;
  if (!running) return;
  const { job, timer } = running;
  clearTimeout(timer);
  running = null;
  queue.unshift(job);
  next();
}

/** Starts the worker that lays out maps, without waiting. */
export const startWorker = () => void layoutWorker();

function inPage(job: Job) {
  const { entities, claims, anchors, focusId, reference } = job.request;
  try {
    job.resolve(
      networkLayout(
        entities,
        claims,
        anchors,
        focusId,
        reference ? new Map(reference) : undefined,
      ),
    );
  } catch (error) {
    computed.delete(job.id);
    job.reject(error);
  }
}

/** Starts the next layout still wanted, if none is being computed. */
function next() {
  if (running) return;
  const job = queue.shift();
  if (!job) return;
  const thread = layoutWorker();
  if (!thread) {
    // Without a worker, one layout per task, so the page answers between.
    running = { job, n: 0 };
    setTimeout(() => {
      running = null;
      inPage(job);
      next();
    }, 0);
    return;
  }
  const n = ++asked;
  running = { job, n, timer: setTimeout(giveUpWorker, patience) };
  thread.postMessage({ n, ...job.request } satisfies LayoutRequest);
}

/** Computed layouts by key and seed, kept for this visit. */
const computed = new Map<
  string,
  { job: Job; promise: Promise<Map<string, Point>> }
>();

function compute(
  entities: Entity[],
  claims: Claim[],
  anchors: string[],
  focusId: string | null,
  reference: StoredLayout | undefined,
  signal: AbortSignal | undefined,
) {
  const id = `${layoutKey(entities, claims, anchors, focusId)} ${reference?.key ?? ''}`;
  let found = computed.get(id);
  if (!found) {
    let job!: Job;
    const promise = new Promise<Map<string, Point>>((resolve, reject) => {
      job = {
        id,
        resolve,
        reject,
        wanted: 0,
        request: {
          // Only what the layout reads, so that little is copied.
          entities: entities.map(({ id, type, documentVersion }) => ({
            id,
            type,
            ...(documentVersion ? { documentVersion } : {}),
          })) as Entity[],
          claims: claims.map(({ id, subject, predicate, object }) => ({
            id,
            subject,
            predicate,
            object,
          })) as Claim[],
          anchors,
          focusId,
          reference: reference ? [...readLayout(reference)] : null,
        },
      };
    });
    found = { job, promise };
    computed.set(id, found);
    queue.push(job);
  }
  const { job, promise } = found;
  job.wanted += 1;
  if (signal?.aborted) release(job);
  else signal?.addEventListener('abort', () => release(job), { once: true });
  next();
  return promise;
}

const notWanted = () => new DOMException('No longer wanted', 'AbortError');

/** One map no longer wants a layout; a layout none wants is dropped unstarted. */
function release(job: Job) {
  job.wanted -= 1;
  const at = queue.indexOf(job);
  if (job.wanted > 0 || at < 0) return;
  // Not started and no longer wanted: dropped, and forgotten.
  queue.splice(at, 1);
  computed.delete(job.id);
  job.reject(notWanted());
}

/** How many layouts wait or are being computed (for tests). */
export const layoutsWaiting = () => queue.length + (running ? 1 : 0);

/** Where a map's positions came from. */
export type Placement = {
  positions: Map<string, Point>;
  /** Stored by the build, or laid out in the worker or in the page. */
  source: 'stored' | 'worker' | 'page';
  /** The key of the stored layout that seeded a computed one, if any. */
  seed: string | null;
};

/**
 * The positions of a map's records, and where they came from. A signal
 * that aborts drops a layout not yet started that no other map wants.
 */
export async function placeRecords(
  entities: Entity[],
  claims: Claim[],
  anchors: string[],
  focusId: string | null,
  /** Where the stored layouts centred on the focus are, if any. */
  path: string | null,
  signal?: AbortSignal,
): Promise<Placement> {
  const layouts = path ? await stored(path) : [];
  const key = layoutKey(entities, claims, anchors, focusId);
  const match = layouts.find(
    (l) =>
      l.key === key &&
      l.ids.length === entities.length &&
      entities.every((e) => l.ids.includes(e.id)),
  );
  if (match)
    return { positions: readLayout(match), source: 'stored', seed: null };
  // The map may have changed while the stored layouts loaded.
  if (signal?.aborted) throw notWanted();
  const seed = layouts[0];
  const usingWorker = layoutWorker() !== null;
  const positions = await compute(
    entities,
    claims,
    anchors,
    focusId,
    seed,
    signal,
  );
  return {
    positions,
    source: usingWorker && worker !== null ? 'worker' : 'page',
    seed: seed?.key ?? null,
  };
}
