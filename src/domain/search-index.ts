/**
 * The static search index: the files the build writes for search in the
 * browser, and the search over them. It reproduces `searchRecords` over the
 * whole dataset exactly, without the whole dataset. The index only finds
 * candidates, records containing every term's words; the scoring in
 * `search.ts` then runs unchanged on the candidates' text. See
 * docs/data-loading-design-c.md ("Search index").
 *
 * Files: postings (the records each folded word occurs in, cut into ranges
 * of the sorted words), record chunks (each record's searched text and what
 * a result shows of it, ordered by subject so that related records share a
 * chunk), and one list per collection and per organisation of the records a
 * filter by it keeps.
 */
import type { Claim, Dataset, Entity, Evidence, Source } from './schema';
import {
  createSearchIndex,
  foldText,
  isWordChar,
  parseQuery,
  searchRecordTypes,
  searchRecords,
  unspaced,
  type IndexedRecord,
  type SearchField,
  type SearchFilters,
  type SearchRecordType,
  type SearchResults,
} from './search';

/** A record as a chunk stores it; `fields` leaves out the record ID. */
export type StoredRecord = {
  /** Position in `createSearchIndex`'s order, which breaks any tie the same way. */
  n: number;
  type: SearchRecordType;
  id: string;
  claimId?: string;
  fields: [SearchField, string][];
  years: readonly [number, number] | null;
  sortDate?: string;
  status?: IndexedRecord['status'];
  date?: string;
  sourceIds: string[];
  entityType?: Entity['type'];
};

/** The records a chunk's results show, with only the fields shown. */
export type ShownRecords = {
  claims: Partial<Claim>[];
  evidence: Partial<Evidence>[];
  sources: Partial<Source>[];
  entities: Partial<Entity>[];
};
const shownKinds = ['claims', 'evidence', 'sources', 'entities'] as const;
type ShownKind = (typeof shownKinds)[number];
/**
 * A chunk: its records, the records their results show, and where each of
 * those stands in the dataset, so that put together they keep its order.
 */
export type RecordChunk = {
  records: StoredRecord[];
  at: Record<ShownKind, number[]>;
} & ShownRecords;

/** Sorted words with their records' ordinals, each list delta-encoded. */
export type PostingsFile = { words: string[]; postings: number[][] };

export type IndexManifest = {
  /** The first word of each postings file. */
  bounds: string[];
  /** The first ordinal of each record chunk. */
  starts: number[];
  /** Each ordinal's record type, one letter: c, p, s or e. */
  types: string;
  /** Collection and organisation IDs with a filter file, in file order. */
  collections: string[];
  organisations: string[];
};

export type IndexFiles = {
  manifest: IndexManifest;
  postings: PostingsFile[];
  chunks: RecordChunk[];
  /** Ordinals a filter keeps, delta-encoded, in manifest order. */
  collections: number[][];
  organisations: number[][];
};

const typeLetters: Record<SearchRecordType, string> = {
  claim: 'c',
  passage: 'p',
  source: 's',
  entity: 'e',
};

/** The key under which a character of an unspaced script is indexed. */
const charKey = (ch: string) => `#${ch}`;

/**
 * Every word of folded text: maximal runs of word characters, read one
 * UTF-16 unit at a time as `occurrences` reads word boundaries, so that a
 * character outside the Basic Multilingual Plane separates words there too.
 */
function wordsOf(folded: string) {
  const words: string[] = [];
  let word = '';
  for (let i = 0; i < folded.length; i++) {
    const ch = folded[i];
    if (isWordChar(ch)) word += ch;
    else if (word) {
      words.push(word);
      word = '';
    }
  }
  if (word) words.push(word);
  return words;
}

/** The keys a record is found by: its words and its unspaced characters. */
function keysOf(record: IndexedRecord) {
  const keys = new Set<string>();
  for (const f of record.fields) {
    for (const w of wordsOf(f.folded)) keys.add(w);
    for (const ch of f.folded) if (unspaced.test(ch)) keys.add(charKey(ch));
  }
  return keys;
}

const delta = (sorted: number[]) =>
  sorted.map((v, i) => (i ? v - sorted[i - 1] : v));
const undelta = (list: number[]) => {
  const out = new Array<number>(list.length);
  let v = 0;
  for (let i = 0; i < list.length; i++) out[i] = v += list[i];
  return out;
};

/** Collection IDs and claim IDs for the collection filter. */
export type CollectionClaims = { id: string; claimIds: readonly string[] }[];

/**
 * Writes the index of a dataset. `collections` are the filter's collections
 * with their claims; `organisations` the filter's organisation IDs. Sizes
 * are targets for the raw JSON of a file.
 */
export function buildIndexFiles(
  data: Dataset,
  {
    collections,
    organisations,
    postingsBytes = 32_000,
    chunkBytes = 64000,
  }: {
    collections: CollectionClaims;
    organisations: readonly string[];
    postingsBytes?: number;
    chunkBytes?: number;
  },
): IndexFiles {
  const index = createSearchIndex(data);
  const claims = new Map(data.claims.map((c) => [c.id, c]));
  const sources = new Map(data.sources.map((s) => [s.id, s]));
  const entities = new Map(data.entities.map((e) => [e.id, e]));
  const evidence = new Map(data.evidence.map((e) => [e.id, e]));
  const position = Object.fromEntries(
    shownKinds.map((kind) => [
      kind,
      new Map(data[kind].map((r, i) => [r.id, i] as const)),
    ]),
  ) as Record<ShownKind, Map<string, number>>;
  const evidenceBySource = new Map<string, Evidence[]>();
  for (const e of data.evidence)
    evidenceBySource.set(e.sourceId, [
      ...(evidenceBySource.get(e.sourceId) ?? []),
      e,
    ]);

  // Claims and passages by the claim's subject, sources by publisher,
  // entities by type: related records share a chunk.
  const order = index.records.map((r, n) => ({ r, n }));
  const family = (r: IndexedRecord) =>
    r.type === 'claim' || r.type === 'passage'
      ? 0
      : r.type === 'source'
        ? 1
        : 2;
  const group = (r: IndexedRecord) =>
    r.claimId
      ? claims.get(r.claimId)!.subject
      : r.type === 'source'
        ? (sources.get(r.id)!.publisherId ?? '')
        : (r.entityType ?? '');
  order.sort(
    (a, b) =>
      family(a.r) - family(b.r) ||
      cmp(group(a.r), group(b.r)) ||
      cmp(a.r.claimId ?? '', b.r.claimId ?? '') ||
      a.n - b.n,
  );

  // Fields shown with a result (src/ui/Search.tsx).
  const shownClaim = (c: Claim): Partial<Claim> => ({
    id: c.id,
    subject: c.subject,
    statement: c.statement,
    derivation: c.derivation,
    resolution: c.resolution,
  });
  const shownEvidence = (e: Evidence): Partial<Evidence> => ({
    id: e.id,
    claimId: e.claimId,
    sourceId: e.sourceId,
    passage: e.passage,
    passageType: e.passageType,
    locator: e.locator,
    support: e.support,
    ...(e.contextOnly ? { contextOnly: e.contextOnly } : {}),
  });
  const shownSource = (s: Source): Partial<Source> => ({
    id: s.id,
    title: s.title,
    publisher: s.publisher,
    publicationDate: s.publicationDate,
    canonicalUrl: s.canonicalUrl,
    accessedAt: s.accessedAt,
    ...(s.archivedUrl ? { archivedUrl: s.archivedUrl } : {}),
    ...(s.archivedAt ? { archivedAt: s.archivedAt } : {}),
    ...(s.versionDate ? { versionDate: s.versionDate } : {}),
  });
  const shownEntity = (e: Entity): Partial<Entity> => ({
    id: e.id,
    type: e.type,
    subtype: e.subtype,
    name: e.name,
    ...(e.shortName ? { shortName: e.shortName } : {}),
    ...(e.documentVersion ? { documentVersion: e.documentVersion } : {}),
    ...(e.proposition ? { proposition: e.proposition } : {}),
  });

  const chunks: RecordChunk[] = [];
  const starts: number[] = [];
  const ordinalOf = new Map<number, number>();
  let current: RecordChunk | null = null;
  let size = 0;
  let held: {
    claims: Map<string, Partial<Claim>>;
    evidence: Map<string, Partial<Evidence>>;
    sources: Map<string, Partial<Source>>;
    entities: Map<string, Partial<Entity>>;
  } | null = null;
  // Text a chunk's own records hold is not repeated in its shown records;
  // `chunkShown` puts it back.
  const close = () => {
    if (!current || !held) return;
    const own = new Map(current.records.map((r) => [`${r.type}:${r.id}`, r]));
    const inOrder = <T extends { id?: string }>(
      kind: ShownKind,
      map: Map<string, T>,
    ) =>
      [...map.values()].sort(
        (a, b) => position[kind].get(a.id!)! - position[kind].get(b.id!)!,
      );
    current.claims = inOrder('claims', held.claims).map((c) => {
      if (!own.has(`claim:${c.id}`)) return c;
      return without(c, ['statement', 'derivation', 'resolution']);
    });
    current.evidence = inOrder('evidence', held.evidence).map((e) => {
      if (!own.has(`passage:${e.id}`)) return e;
      return without(e, ['passage', 'locator']);
    });
    current.sources = inOrder('sources', held.sources);
    current.entities = inOrder('entities', held.entities);
    current.at = Object.fromEntries(
      shownKinds.map((kind) => [
        kind,
        (current![kind] as { id?: string }[]).map((r) =>
          position[kind].get(r.id!)!,
        ),
      ]),
    ) as Record<ShownKind, number[]>;
  };
  /** Adds a shown record, or more of its fields, counting the bytes. */
  const put = <T extends { id?: string }>(
    map: Map<string, T>,
    record: T,
    replace = true,
  ) => {
    const before = map.get(record.id!);
    if (before && !replace) return;
    map.set(record.id!, record);
    size +=
      JSON.stringify(record).length -
      (before ? JSON.stringify(before).length : 0);
  };
  const entityWithPublisher = (id: string) => {
    const e = entities.get(id);
    if (!e) return;
    put(held!.entities, shownEntity(e));
    const publisher = e.documentVersion?.publisherId;
    const p = publisher ? entities.get(publisher) : undefined;
    if (p) put(held!.entities, shownEntity(p), false);
  };
  const claimShown = (id: string) => {
    const c = claims.get(id)!;
    put(held!.claims, shownClaim(c));
    entityWithPublisher(c.subject);
  };
  order.forEach(({ r, n }, ordinal) => {
    const stored: StoredRecord = {
      n,
      type: r.type,
      id: r.id,
      ...(r.claimId ? { claimId: r.claimId } : {}),
      fields: r.fields
        .filter((f) => f.field !== 'id')
        .map((f) => [f.field, f.text] as [SearchField, string]),
      years: r.years,
      ...(r.sortDate !== undefined ? { sortDate: r.sortDate } : {}),
      ...(r.status ? { status: r.status } : {}),
      ...(r.date !== undefined ? { date: r.date } : {}),
      sourceIds: r.sourceIds,
      ...(r.entityType ? { entityType: r.entityType } : {}),
    };
    if (!current || size > chunkBytes) {
      close();
      current = {
        records: [],
        at: { claims: [], evidence: [], sources: [], entities: [] },
        claims: [],
        evidence: [],
        sources: [],
        entities: [],
      };
      held = {
        claims: new Map(),
        evidence: new Map(),
        sources: new Map(),
        entities: new Map(),
      };
      chunks.push(current);
      starts.push(ordinal);
      size = 0;
    }
    current.records.push(stored);
    size += JSON.stringify(stored).length;
    ordinalOf.set(n, ordinal);
    if (r.type === 'claim' || r.type === 'passage') {
      claimShown(r.claimId!);
      for (const id of r.sourceIds) {
        const s = sources.get(id)!;
        put(held!.sources, { id: s.id, title: s.title }, false);
      }
      if (r.type === 'passage')
        put(held!.evidence, shownEvidence(evidence.get(r.id)!));
    } else if (r.type === 'source') {
      put(held!.sources, shownSource(sources.get(r.id)!));
      for (const e of evidenceBySource.get(r.id) ?? []) {
        put(
          held!.evidence,
          { id: e.id, claimId: e.claimId, sourceId: e.sourceId },
          false,
        );
        const c = claims.get(e.claimId)!;
        put(held!.claims, { id: c.id, statement: c.statement }, false);
      }
    } else entityWithPublisher(r.id);
  });
  close();

  // Postings over the chunk order's ordinals.
  const postings = new Map<string, number[]>();
  index.records.forEach((r, n) => {
    const ordinal = ordinalOf.get(n)!;
    for (const key of keysOf(r)) {
      const list = postings.get(key);
      if (list) list.push(ordinal);
      else postings.set(key, [ordinal]);
    }
  });
  const words = [...postings.keys()].sort(cmp);
  const files: PostingsFile[] = [];
  const bounds: string[] = [];
  let file: PostingsFile | null = null;
  let fileSize = 0;
  for (const word of words) {
    const list = delta(postings.get(word)!.sort((a, b) => a - b));
    const bytes = word.length + 4 + JSON.stringify(list).length;
    if (!file || fileSize + bytes > postingsBytes) {
      file = { words: [], postings: [] };
      files.push(file);
      bounds.push(word);
      fileSize = 0;
    }
    file.words.push(word);
    file.postings.push(list);
    fileSize += bytes;
  }

  // Filter files: the ordinals each collection and organisation filter keeps.
  const keeps = (test: (r: IndexedRecord) => boolean) =>
    delta(
      index.records
        .flatMap((r, n) => (test(r) ? [ordinalOf.get(n)!] : []))
        .sort((a, b) => a - b),
    );
  return {
    manifest: {
      bounds,
      starts,
      types: order.map(({ r }) => typeLetters[r.type]).join(''),
      collections: collections.map((c) => c.id),
      organisations: [...organisations],
    },
    postings: files,
    chunks,
    collections: collections.map((c) => {
      const ids = new Set(c.claimIds);
      return keeps((r) => r.claimIds.some((id) => ids.has(id)));
    }),
    organisations: organisations.map((id) => keeps((r) => r.entityIds.has(id))),
  };
}

/** A copy of a record without some of its fields. */
function without<T extends object, K extends keyof T>(
  record: T,
  fields: readonly K[],
): Omit<T, K> {
  const copy = { ...record };
  for (const field of fields) delete copy[field];
  return copy;
}

/** Code-unit order, which keeps every word with a given prefix together. */
const cmp = (a: string, b: string) => (a < b ? -1 : a > b ? 1 : 0);

/** Index of the last bound at or before `key` (0 when before all). */
function fileOf(bounds: readonly string[], key: string) {
  let lo = 0;
  let hi = bounds.length - 1;
  while (lo < hi) {
    const mid = (lo + hi + 1) >> 1;
    if (bounds[mid] <= key) lo = mid;
    else hi = mid - 1;
  }
  return lo;
}

/**
 * What a term needs of the index. A match starts at a word start: every
 * word run of the term but the last is a whole word there, and the last is
 * the start of one; a one-character term is a whole word. A term in a script
 * written without spaces matches anywhere, so it needs each of its unspaced
 * characters.
 */
export function termKeys(term: string): { key: string; prefix: boolean }[] {
  if (unspaced.test(term))
    return [...new Set([...term].filter((ch) => unspaced.test(ch)))].map(
      (ch) => ({
        key: charKey(ch),
        prefix: false,
      }),
    );
  const runs = wordsOf(term);
  return runs.map((run, i) => ({
    key: run,
    prefix: i === runs.length - 1 && term.length > 1,
  }));
}

/** The parts of the index, loaded on demand; each call may return the same promise. */
export type IndexLoader = {
  postings: (file: number) => Promise<PostingsFile>;
  chunk: (chunk: number) => Promise<RecordChunk>;
  collection: (file: number) => Promise<number[]>;
  organisation: (file: number) => Promise<number[]>;
};

/** Filters as search takes them, with the collection named by its ID. */
export type IndexFilters = Omit<SearchFilters, 'collection'> & {
  collectionId?: string | null;
};

export type IndexSearchResult = {
  results: SearchResults;
  /** The records the chunks of the results show, with the fields shown. */
  shown: ShownRecords;
};

/**
 * Searches the index as `searchRecords` searches the whole dataset: the
 * same results, in the same order, with the same snippets.
 */
export async function searchIndexFiles(
  manifest: IndexManifest,
  load: IndexLoader,
  query: string,
  filters: IndexFilters = {},
): Promise<IndexSearchResult> {
  const terms = parseQuery(query);
  const none = { claims: [], evidence: [], sources: [], entities: [] };
  if (!terms.length)
    return { results: searchRecords({ records: [] }, query), shown: none };

  // Records holding a key: one file, rarely two, per key.
  const holding = async ({ key, prefix }: { key: string; prefix: boolean }) => {
    const first = fileOf(manifest.bounds, key);
    const last = prefix ? fileOf(manifest.bounds, key + '￿') : first;
    const found = new Set<number>();
    for (let f = first; f <= last; f++) {
      const file = await load.postings(f);
      for (let i = 0; i < file.words.length; i++) {
        const word = file.words[i];
        if (prefix ? word.startsWith(key) : word === key)
          for (const ordinal of undelta(file.postings[i])) found.add(ordinal);
      }
    }
    return found;
  };
  const keys = terms.flatMap(termKeys);
  const sets = await Promise.all(keys.map(holding));
  const keepTypes =
    filters.mode === 'names'
      ? (['entity'] as const)
      : filters.types?.length
        ? filters.types
        : searchRecordTypes;
  const letters = new Set(keepTypes.map((t) => typeLetters[t]));
  sets.sort((a, b) => a.size - b.size);
  let candidates = [...sets[0]].filter(
    (o) => letters.has(manifest.types[o]) && sets.every((s) => s.has(o)),
  );
  // Filters apply in every mode, as in `searchRecords`. A collection the
  // filter does not list leaves the records unfiltered, as Search passes no
  // collection then. Only the organisations the filter lists have a file;
  // any other ID is refused rather than answered wrongly.
  const filterSets: Promise<number[]>[] = [];
  const collection = filters.collectionId
    ? manifest.collections.indexOf(filters.collectionId)
    : -1;
  if (collection !== -1) filterSets.push(load.collection(collection));
  if (filters.organisationId) {
    const org = manifest.organisations.indexOf(filters.organisationId);
    if (org === -1)
      throw new Error(`No organisation filter for ${filters.organisationId}`);
    filterSets.push(load.organisation(org));
  }
  for (const kept of await Promise.all(filterSets)) {
    const set = new Set(undelta(kept));
    candidates = candidates.filter((o) => set.has(o));
  }

  // The candidates' chunks, then the scoring of search.ts on their records.
  const chunkIds = [
    ...new Set(candidates.map((o) => chunkOf(manifest.starts, o))),
  ];
  const loaded = await Promise.all(chunkIds.map((c) => load.chunk(c)));
  const byChunk = new Map(chunkIds.map((c, i) => [c, loaded[i]]));
  const records = candidates.map((o) => {
    const c = chunkOf(manifest.starts, o);
    return indexedRecord(byChunk.get(c)!.records[o - manifest.starts[c]]);
  });
  records.sort((a, b) => a.n - b.n);
  const results = searchRecords(
    { records },
    query,
    without(filters, ['collectionId', 'organisationId']),
  );
  return { results, shown: mergeShown(loaded.map(chunkShown)) };
}

/** The chunk holding an ordinal. */
function chunkOf(starts: readonly number[], ordinal: number) {
  let lo = 0;
  let hi = starts.length - 1;
  while (lo < hi) {
    const mid = (lo + hi + 1) >> 1;
    if (starts[mid] <= ordinal) lo = mid;
    else hi = mid - 1;
  }
  return lo;
}

/** A stored record as `searchRecords` reads it. */
function indexedRecord(stored: StoredRecord): IndexedRecord & { n: number } {
  const field = (f: SearchField, text: string) => ({
    field: f,
    text,
    folded: foldText(text),
  });
  return {
    n: stored.n,
    type: stored.type,
    id: stored.id,
    claimId: stored.claimId,
    fields: [
      ...stored.fields.map(([f, t]) => field(f, t)),
      field('id', stored.id),
    ],
    // Collection and organisation filters are applied from their own files.
    claimIds: [],
    entityIds: new Set(),
    years: stored.years,
    sortDate: stored.sortDate,
    status: stored.status,
    date: stored.date,
    sourceIds: stored.sourceIds,
    entityType: stored.entityType,
  };
}

/** A chunk's shown records, with the text its own records hold put back. */
export function chunkShown(
  chunk: RecordChunk,
): ShownRecords & Pick<RecordChunk, 'at'> {
  const own = new Map(chunk.records.map((r) => [`${r.type}:${r.id}`, r]));
  const text = (r: StoredRecord, field: SearchField) =>
    r.fields.find(([f]) => f === field)![1];
  return {
    at: chunk.at,
    claims: chunk.claims.map((c) => {
      const r = own.get(`claim:${c.id}`);
      return r ? { ...c, statement: text(r, 'statement'), ...r.status } : c;
    }),
    evidence: chunk.evidence.map((e) => {
      const r = own.get(`passage:${e.id}`);
      return r
        ? { ...e, passage: text(r, 'passage'), locator: text(r, 'locator') }
        : e;
    }),
    sources: chunk.sources,
    entities: chunk.entities,
  };
}

/**
 * The shown records of several chunks, each record's fields merged, in the
 * dataset's order.
 */
export function mergeShown(
  chunks: readonly (ShownRecords & Pick<RecordChunk, 'at'>)[],
): ShownRecords {
  const merged = Object.fromEntries(
    shownKinds.map((k) => [k, new Map<number, Record<string, unknown>>()]),
  ) as Record<ShownKind, Map<number, Record<string, unknown>>>;
  for (const chunk of chunks)
    for (const kind of shownKinds)
      (chunk[kind] as Record<string, unknown>[]).forEach((record, i) => {
        const at = chunk.at[kind][i];
        merged[kind].set(at, { ...merged[kind].get(at), ...record });
      });
  return Object.fromEntries(
    shownKinds.map((k) => [
      k,
      [...merged[k].entries()].sort((a, b) => a[0] - b[0]).map(([, r]) => r),
    ]),
  ) as unknown as ShownRecords;
}
