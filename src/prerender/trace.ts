/**
 * Which records, and which of their fields, rendering a page reads: the
 * page's slice. The renderer renders each page once more with a dataset whose
 * records record every field read, and keeps the records whose fields were
 * read with those fields, their relation-core fields (`coreFields` in
 * src/domain/slices.ts) and their neighbourhood (`neighbourhood`). A read of
 * relation fields alone does not put a record in the slice: a scan that
 * chooses records by their relations reads them for every record. Every
 * slice is checked by rendering the page from it alone; a page that draws
 * differently is checked again with the whole relation core, and its slice
 * then says the page needs it (src/prerender/render.tsx). See
 * docs/data-loading-design-c.md ("What a slice is", stage c4).
 */
import type { Dataset } from '../domain/schema';
import type { ReadHooks } from '../domain/memo';
import {
  coreFields,
  sliceKinds as kinds,
  type PlacedSlice,
} from '../domain/slices';

type Kind = (typeof kinds)[number];

export type Trace = {
  /**
   * Fields read beyond the relation core, by kind and record ID: the records
   * the page uses. Reads of the core put nothing in a slice, so they are not
   * noted.
   */
  read: Record<Kind, Map<string, Set<string>>>;
  /**
   * Fields of the dataset description read: the slice carries the
   * description with only those fields, as it carries records.
   */
  meta: Set<string>;
};

export const newTrace = (): Trace => ({
  read: Object.fromEntries(kinds.map((k) => [k, new Map()])) as Trace['read'],
  meta: new Set(),
});

/** The trace reads are noted in, while a page is drawn. */
let trace: Trace = newTrace();
/** Counts changes of the current trace, so records know when theirs changed. */
let turn = 0;
/** Notes reads in a new trace from now on, and returns it. */
export function startTrace() {
  turn += 1;
  return (trace = newTrace());
}

/** Adds one trace's reads to another. */
function merge(into: Trace, from: Trace) {
  for (const f of from.meta) into.meta.add(f);
  for (const kind of kinds) {
    for (const [id, fields] of from.read[kind]) {
      const held = into.read[kind].get(id);
      if (held) for (const f of fields) held.add(f);
      else into.read[kind].set(id, new Set(fields));
    }
  }
}

/**
 * Hooks for values computed once per dataset (src/domain/memo.ts): their
 * reads count for every page that uses them.
 */
export const readHooks: ReadHooks = {
  capture(compute) {
    const outer = trace;
    turn += 1;
    const inner = (trace = newTrace());
    try {
      return { value: compute(), reads: inner };
    } finally {
      turn += 1;
      trace = outer;
      merge(outer, inner);
    }
  },
  replay(reads) {
    merge(trace, reads as Trace);
  },
  // A selected record counts as used, as if its ID were a field read.
  select(kind, records) {
    for (const { id } of records)
      if (!trace.read[kind].has(id)) trace.read[kind].set(id, new Set(['id']));
      else trace.read[kind].get(id)!.add('id');
  },
};

/**
 * The dataset with every record noting its reads in the current trace. One
 * traced dataset serves every page, so values computed once per dataset are
 * not computed again; reads of their results count for the page that reads
 * them. A page whose slice misses a record read only inside such a value
 * draws differently from its slice, which the check refuses.
 */
export function tracedDataset(data: Dataset): Dataset {
  const core = Object.fromEntries(
    kinds.map((k) => [k, new Set<string>(coreFields[k])]),
  ) as Record<Kind, Set<string>>;
  const wrap = <T extends { id: string }>(kind: Kind, record: T): T => {
    const relations = core[kind];
    // When this record last noted a read, and its fields in that trace.
    let noted = -1;
    let fields: Set<string> | undefined;
    const note = (field: string) => {
      if (relations.has(field)) return;
      if (noted !== turn) {
        noted = turn;
        fields = trace.read[kind].get(record.id);
        if (!fields) trace.read[kind].set(record.id, (fields = new Set()));
      }
      fields!.add(field);
    };
    return new Proxy(record, {
      get(target, prop, receiver) {
        if (typeof prop === 'string') note(prop);
        return Reflect.get(target, prop, receiver);
      },
      has(target, prop) {
        if (typeof prop === 'string') note(prop);
        return Reflect.has(target, prop);
      },
      // Copying a record (spread, JSON) reads every field.
      ownKeys(target) {
        for (const key of Reflect.ownKeys(target))
          if (typeof key === 'string') note(key);
        return Reflect.ownKeys(target);
      },
    });
  };
  // The description notes its fields read as a record does.
  const noteMeta = (field: string | symbol) => {
    if (typeof field === 'string') trace.meta.add(field);
  };
  const meta = new Proxy(data.meta, {
    get(target, prop, receiver) {
      noteMeta(prop);
      return Reflect.get(target, prop, receiver);
    },
    has(target, prop) {
      noteMeta(prop);
      return Reflect.has(target, prop);
    },
    ownKeys(target) {
      Reflect.ownKeys(target).forEach(noteMeta);
      return Reflect.ownKeys(target);
    },
  });
  return {
    meta,
    entities: data.entities.map((r) => wrap('entities', r)),
    claims: data.claims.map((r) => wrap('claims', r)),
    sources: data.sources.map((r) => wrap('sources', r)),
    evidence: data.evidence.map((r) => wrap('evidence', r)),
  };
}

/** Each record's position in a list of records, by ID. */
const positions = new WeakMap<readonly { id: string }[], Map<string, number>>();
function positionsOf(records: readonly { id: string }[]) {
  let found = positions.get(records);
  if (!found)
    positions.set(records, (found = new Map(records.map((r, i) => [r.id, i]))));
  return found;
}

/** Each claim's evidence items, by claim ID. */
const evidenceByClaim = new WeakMap<Dataset, Map<string, string[]>>();
function evidenceOf(data: Dataset) {
  let found = evidenceByClaim.get(data);
  if (!found) {
    found = new Map();
    for (const e of data.evidence)
      found.set(e.claimId, [...(found.get(e.claimId) ?? []), e.id]);
    evidenceByClaim.set(data, found);
  }
  return found;
}

/**
 * The records a page's slice holds: those the page read beyond the relation
 * core, with their relations — each passage's claim, each claim's passages,
 * subject and object, each passage's source, each source's publisher and
 * document, each document version's other versions. A scan over a page's slice then finds what it finds over the
 * whole dataset for the records the page names (src/domain/slices.ts).
 */
export function neighbourhood(
  data: Dataset,
  used: Record<Kind, Set<string>>,
): Record<Kind, Set<string>> {
  const near = Object.fromEntries(
    kinds.map((k) => [k, new Set(used[k])]),
  ) as Record<Kind, Set<string>>;
  const at = (kind: Kind, id: string) =>
    (data[kind] as { id: string }[])[positionsOf(data[kind])!.get(id)!];
  for (const id of used.evidence)
    near.claims.add(
      (at('evidence', id) as Dataset['evidence'][number]).claimId,
    );
  const passages = evidenceOf(data);
  for (const id of near.claims) {
    for (const e of passages.get(id) ?? []) near.evidence.add(e);
    const claim = at('claims', id) as Dataset['claims'][number];
    near.entities.add(claim.subject);
    if (claim.object.kind === 'entity')
      near.entities.add(claim.object.entityId);
  }
  for (const id of near.evidence)
    near.sources.add(
      (at('evidence', id) as Dataset['evidence'][number]).sourceId,
    );
  for (const id of near.sources) {
    const source = at('sources', id) as Dataset['sources'][number];
    if (source.publisherId) near.entities.add(source.publisherId);
    if (source.documentId) near.entities.add(source.documentId);
  }
  addVersions(data, near.entities);
  return near;
}

/**
 * Adds to a set of entities the other versions of each document version,
 * and the versions of each document family it holds.
 */
function addVersions(data: Dataset, entities: Set<string>) {
  const place = positionsOf(data.entities);
  const families = new Set<string>(entities);
  for (const id of entities) {
    const version = data.entities[place.get(id)!].documentVersion;
    if (version) families.add(version.family);
  }
  if (families.size)
    for (const entity of data.entities)
      if (entity.documentVersion && families.has(entity.documentVersion.family))
        entities.add(entity.id);
}

/**
 * How a slice holds its records: `alone`, the records a trace used (with
 * the other versions of each document version), each with its
 * relation-core fields and the other fields read; `near`, those
 * and their neighbourhood; `core`, the records used with only the other
 * fields read, to be held with the whole relation core
 * (`PlacedSlice.core`). The renderer takes the first that draws the page
 * as built (src/prerender/render.tsx).
 */
export type SliceForm = 'alone' | 'near' | 'core';

/**
 * The page's slice, in dataset order and with each record's position.
 */
export function sliceOf(
  data: Dataset,
  trace: Trace,
  form: SliceForm = 'near',
): PlacedSlice {
  const withCore = form === 'core';
  const used = {} as Record<Kind, Set<string>>;
  for (const kind of kinds) {
    used[kind] = new Set();
    const records = data[kind] as unknown as Record<string, unknown>[];
    const place = positionsOf(data[kind]);
    // A record read only for fields it lacks adds nothing: a scan that
    // looks for a field reads it on every record.
    for (const [id, fields] of trace.read[kind])
      if ([...fields].some((f) => f in records[place.get(id)!]))
        used[kind].add(id);
  }
  // A page that names a document version lists its other versions.
  if (form === 'alone') addVersions(data, used.entities);
  const near = form === 'near' ? neighbourhood(data, used) : used;
  const at = {} as PlacedSlice['at'];
  const pick = <T extends { id: string }>(kind: Kind, records: T[]) => {
    const place = positionsOf(records);
    const read = trace.read[kind];
    const relations = withCore ? ['id'] : coreFields[kind];
    at[kind] = [...near[kind]]
      .map((id) => place.get(id)!)
      .sort((a, b) => a - b);
    return at[kind].map((i) => {
      const fields = read.get(records[i].id);
      return Object.fromEntries(
        Object.entries(records[i]).filter(
          ([f]) => relations.includes(f) || fields?.has(f),
        ),
      ) as Partial<T>;
    });
  };
  // The description with the fields read, in their stored order; held even
  // when none of them is stored, so that reading one finds it missing, as
  // in the whole dataset.
  const meta = trace.meta.size
    ? (Object.fromEntries(
        Object.entries(data.meta).filter(([f]) => trace.meta.has(f)),
      ) as Partial<Dataset['meta']>)
    : undefined;
  return {
    ...(meta ? { meta } : {}),
    ...(withCore ? { core: true as const } : {}),
    entities: pick('entities', data.entities),
    claims: pick('claims', data.claims),
    sources: pick('sources', data.sources),
    evidence: pick('evidence', data.evidence),
    at,
  };
}
