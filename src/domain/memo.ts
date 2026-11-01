/**
 * Values computed once per dataset, with what computing them read. The page
 * renderer notes the fields each page reads to make the page's slice
 * (src/prerender/trace.ts); a value computed while drawing one page and
 * reused for another must count its reads for both, or the second page's
 * slice would miss them. The renderer sets these hooks; elsewhere they are
 * not set and a value is simply kept.
 */
export type ReadHooks = {
  /** Computes a value, returning it with the reads it made. */
  capture: <T>(compute: () => T) => { value: T; reads: unknown };
  /** Counts reads made earlier for the page being drawn now. */
  replay: (reads: unknown) => void;
  /** Notes records a page selected by their relations (`selected`). */
  select?: (
    kind: 'entities' | 'claims' | 'sources' | 'evidence',
    records: readonly { id: string }[],
  ) => void;
};

let hooks: ReadHooks | null = null;
export const setReadHooks = (next: ReadHooks | null) => {
  hooks = next;
};

export type Remembered<T> = { value: T; reads?: unknown };

/** The value held for a key, or computed and held, counting its reads. */
export function remember<K, T>(
  cache: {
    get(key: K): Remembered<T> | undefined;
    set(key: K, value: Remembered<T>): unknown;
  },
  key: K,
  compute: () => T,
): T {
  const held = cache.get(key);
  if (held) {
    if (held.reads !== undefined) hooks?.replay(held.reads);
    return held.value;
  }
  if (!hooks) {
    const value = compute();
    cache.set(key, { value });
    return value;
  }
  const { value, reads } = hooks.capture(compute);
  cache.set(key, { value, reads });
  return value;
}

/**
 * Records a page selects by their relation fields alone, to count or draw
 * them (the explorer's graph): the renderer puts them in the page's slice,
 * which otherwise holds only the records whose other fields the page reads
 * (src/prerender/trace.ts). Returns the records.
 */
export function selected<T extends { id: string }>(
  kind: 'entities' | 'claims' | 'sources' | 'evidence',
  records: T[],
): T[] {
  hooks?.select?.(kind, records);
  return records;
}
