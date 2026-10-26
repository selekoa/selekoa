import type { Claim, Dataset, Entity } from './schema';
import { dateOf, timeLabel } from './query';

/**
 * Full-text search over the stored records. Matching is literal: a term
 * matches the beginning of a word, or a whole word when asked, ignoring case,
 * accents, hyphens and quote styles. Nothing is inferred, expanded or ranked by importance; the score
 * only orders matches by where and how completely the terms occur.
 */

export const searchRecordTypes = [
  'claim',
  'passage',
  'source',
  'entity',
] as const;
export type SearchRecordType = (typeof searchRecordTypes)[number];

export type SearchField =
  | 'statement'
  | 'qualification'
  | 'passage'
  | 'locator'
  | 'title'
  | 'name'
  | 'shortName'
  | 'alias'
  | 'id';

/** Name lookup reads only these fields. */
const nameFields: readonly SearchField[] = ['name', 'shortName', 'alias'];

// Ordering weights only; they say nothing about a record's reliability.
const fieldWeights: Record<SearchField, number> = {
  name: 6,
  shortName: 5,
  alias: 5,
  title: 4,
  statement: 4,
  passage: 3,
  qualification: 2,
  locator: 1,
  id: 1,
};

/** The fields each record type is searched in, in display order. */
export const searchedFields: Record<SearchRecordType, readonly SearchField[]> =
  {
    claim: ['statement', 'qualification', 'id'],
    passage: ['passage', 'locator', 'id'],
    source: ['title', 'id'],
    entity: ['name', 'shortName', 'alias', 'id'],
  };

export type SearchMode = 'all' | 'names';

export type SearchFilters = {
  mode?: SearchMode;
  /** Record types to return; all types when omitted or empty. */
  types?: readonly SearchRecordType[];
  /** Claim IDs of a collection. Other records follow their claims. */
  collection?: ReadonlySet<string> | null;
  /**
   * Only records from claims that name this entity or a document version it
   * published, sources it published, and records named in those claims.
   */
  organisationId?: string | null;
  /** Inclusive year range. Undated records are left out when either is set. */
  fromYear?: number | null;
  untilYear?: number | null;
  /** Match whole words only: "critic" no longer finds "criticality". */
  wholeWords?: boolean;
};

export type Highlight = { text: string; match: boolean };

export type SearchHit = {
  type: SearchRecordType;
  id: string;
  /** The claim a claim or passage record belongs to. */
  claimId?: string;
  /** The field shown in the snippet: the one matching most terms. */
  field: SearchField;
  snippet: Highlight[];
  matchedFields: SearchField[];
  score: number;
  status?: Pick<Claim, 'derivation' | 'resolution'>;
  /** The record's date as stored, with its kind for claims. */
  date?: string;
  sourceIds: string[];
  entityType?: Entity['type'];
};

export type SearchGroup = { type: SearchRecordType; hits: SearchHit[] };
export type SearchResults = {
  terms: string[];
  total: number;
  groups: SearchGroup[];
};

type IndexedField = { field: SearchField; text: string; folded: string };
type IndexedRecord = {
  type: SearchRecordType;
  id: string;
  claimId?: string;
  fields: IndexedField[];
  claimIds: string[];
  entityIds: ReadonlySet<string>;
  years: readonly [number, number] | null;
  sortDate?: string;
  status?: Pick<Claim, 'derivation' | 'resolution'>;
  date?: string;
  sourceIds: string[];
  entityType?: Entity['type'];
};
export type SearchIndex = { records: IndexedRecord[] };

const foldCache = new Map<string, string>();
/** Case, accent, dash and quote folding for one code point. */
function foldChar(ch: string): string {
  const code = ch.charCodeAt(0);
  if (code < 128) {
    if (code >= 65 && code <= 90) return String.fromCharCode(code + 32);
    return ch === '-' ? ' ' : ch;
  }
  let folded = foldCache.get(ch);
  if (folded === undefined) {
    folded =
      ch === '­'
        ? ''
        : /[‐-―−]/.test(ch)
          ? ' '
          : /[‘’‚‛′]/.test(ch)
            ? "'"
            : /[“-‟″]/.test(ch)
              ? '"'
              : ch.normalize('NFKD').replace(/\p{M}/gu, '').toLowerCase();
    foldCache.set(ch, folded);
  }
  return folded;
}

/** Folds text for matching. ASCII text keeps its length. */
export function foldText(text: string): string {
  // eslint-disable-next-line no-control-regex
  if (/^[\x00-\x7f]*$/.test(text))
    return text.toLowerCase().replaceAll('-', ' ');
  let out = '';
  for (const ch of text) out += foldChar(ch);
  return out;
}

/** Folded text with each folded character's span in the original. */
function foldWithMap(text: string) {
  let folded = '';
  const starts: number[] = [];
  const ends: number[] = [];
  let i = 0;
  for (const ch of text) {
    for (const f of foldChar(ch)) {
      folded += f;
      starts.push(i);
      ends.push(i + ch.length);
    }
    i += ch.length;
  }
  return { folded, starts, ends };
}

const isWordChar = (ch: string | undefined) =>
  !!ch &&
  (/[a-z0-9]/.test(ch) || (ch.charCodeAt(0) > 127 && /[\p{L}\p{N}]/u.test(ch)));
// Scripts written without spaces between words match anywhere.
const unspaced =
  /^[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]/u;

/**
 * Start positions of a folded term at word beginnings in folded text, or at
 * whole words only when `whole` is set.
 */
function occurrences(
  text: string,
  term: string,
  limit = Infinity,
  whole = false,
) {
  const found: number[] = [];
  const anywhere = unspaced.test(term);
  for (
    let at = text.indexOf(term);
    at !== -1 && found.length < limit;
    at = text.indexOf(term, at + 1)
  )
    if (
      anywhere ||
      (!isWordChar(text[at - 1]) &&
        // A single letter or digit, such as an initial, is a whole word.
        ((term.length > 1 && !whole) || !isWordChar(text[at + term.length])))
    )
      found.push(at);
  return found;
}

/**
 * Splits a query into folded terms. Quoted text and hyphenated words such as
 * "ASL-3" stay together as phrases; edge punctuation is dropped.
 */
export function parseQuery(query: string): string[] {
  const terms: string[] = [];
  for (const match of query.matchAll(/["“”„]([^"“”„]+)["“”„]|([^\s"“”„]+)/g)) {
    const term = foldText(match[1] ?? match[2])
      .replace(/\s+/g, ' ')
      .replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, '');
    if (term && !terms.includes(term)) terms.push(term);
  }
  return terms;
}

const yearOf = (date: string | undefined) =>
  date ? Number(date.slice(0, 4)) : undefined;
function claimYears(claim: Claim): readonly [number, number] | null {
  const t = claim.time;
  if (t.kind === 'event' || t.kind === 'snapshot') {
    const y = yearOf(t.date)!;
    return [y, y];
  }
  if (t.kind === 'interval') {
    const from = yearOf(t.from) ?? yearOf(t.until);
    const until = yearOf(t.until) ?? from;
    return from === undefined ? null : [from, until!];
  }
  return null;
}
const field = (field: SearchField, text: string): IndexedField => ({
  field,
  text,
  folded: foldText(text),
});
const endpoints = (claim: Claim) => [
  claim.subject,
  ...(claim.object.kind === 'entity' ? [claim.object.entityId] : []),
];
const status = (claim: Claim) => ({
  derivation: claim.derivation,
  resolution: claim.resolution,
});

export function createSearchIndex(data: Dataset): SearchIndex {
  const claims = new Map(data.claims.map((c) => [c.id, c]));
  const evidenceByClaim = new Map<string, Dataset['evidence']>();
  const claimsBySource = new Map<string, Set<string>>();
  for (const e of data.evidence) {
    evidenceByClaim.set(e.claimId, [
      ...(evidenceByClaim.get(e.claimId) ?? []),
      e,
    ]);
    claimsBySource.set(
      e.sourceId,
      (claimsBySource.get(e.sourceId) ?? new Set()).add(e.claimId),
    );
  }
  // A claim about a document version also counts for its stored publisher.
  const publisherOf = new Map(
    data.entities.flatMap((e) =>
      e.documentVersion ? [[e.id, e.documentVersion.publisherId] as const] : [],
    ),
  );
  const named = (c: Claim) =>
    endpoints(c).flatMap((id) =>
      publisherOf.has(id) ? [id, publisherOf.get(id)!] : [id],
    );
  const claimsByEntity = new Map<string, string[]>();
  for (const c of data.claims)
    for (const id of endpoints(c))
      claimsByEntity.set(id, [...(claimsByEntity.get(id) ?? []), c.id]);
  const records: IndexedRecord[] = [];
  for (const c of data.claims)
    records.push({
      type: 'claim',
      id: c.id,
      claimId: c.id,
      fields: [
        field('statement', c.statement),
        field('qualification', c.qualification),
        field('id', c.id),
      ],
      claimIds: [c.id],
      entityIds: new Set(named(c)),
      years: claimYears(c),
      sortDate: dateOf(c),
      status: status(c),
      date: timeLabel(c),
      sourceIds: [
        ...new Set((evidenceByClaim.get(c.id) ?? []).map((e) => e.sourceId)),
      ],
    });
  for (const e of data.evidence) {
    const c = claims.get(e.claimId)!;
    records.push({
      type: 'passage',
      id: e.id,
      claimId: c.id,
      fields: [
        field('passage', e.passage),
        field('locator', e.locator),
        field('id', e.id),
      ],
      claimIds: [c.id],
      entityIds: new Set(named(c)),
      years: claimYears(c),
      sortDate: dateOf(c),
      status: status(c),
      date: timeLabel(c),
      sourceIds: [e.sourceId],
    });
  }
  for (const s of data.sources) {
    const citing = [...(claimsBySource.get(s.id) ?? [])];
    const y = yearOf(s.publicationDate ?? undefined);
    records.push({
      type: 'source',
      id: s.id,
      fields: [field('title', s.title), field('id', s.id)],
      claimIds: citing,
      entityIds: new Set([
        ...(s.publisherId ? [s.publisherId] : []),
        ...citing.flatMap((id) => named(claims.get(id)!)),
      ]),
      years: y === undefined ? null : [y, y],
      sortDate: s.publicationDate ?? undefined,
      date: s.publicationDate ?? undefined,
      sourceIds: [s.id],
    });
  }
  for (const e of data.entities) {
    const own = claimsByEntity.get(e.id) ?? [];
    const published = e.documentVersion?.publishedAt;
    const y = yearOf(published);
    records.push({
      type: 'entity',
      id: e.id,
      fields: [
        field('name', e.name),
        ...(e.shortName ? [field('shortName', e.shortName)] : []),
        ...e.aliases.map((a) => field('alias', a)),
        field('id', e.id),
      ],
      claimIds: own,
      entityIds: new Set([
        e.id,
        ...(e.documentVersion ? [e.documentVersion.publisherId] : []),
        ...own.flatMap((id) => named(claims.get(id)!)),
      ]),
      years: y === undefined ? null : [y, y],
      sortDate: published,
      date: published,
      sourceIds: e.sourceIds,
      entityType: e.type,
    });
  }
  return { records };
}

function passesFilters(record: IndexedRecord, filters: SearchFilters) {
  const types =
    filters.mode === 'names'
      ? ['entity']
      : filters.types?.length
        ? filters.types
        : searchRecordTypes;
  if (!types.includes(record.type)) return false;
  if (
    filters.collection &&
    !record.claimIds.some((id) => filters.collection!.has(id))
  )
    return false;
  if (filters.organisationId && !record.entityIds.has(filters.organisationId))
    return false;
  const from = filters.fromYear ?? null;
  const until = filters.untilYear ?? null;
  if (from !== null || until !== null) {
    if (!record.years) return false;
    if (from !== null && record.years[1] < from) return false;
    if (until !== null && record.years[0] > until) return false;
  }
  return true;
}

/** Highlights every term occurrence in a window around the first match. */
export function highlight(
  text: string,
  terms: readonly string[],
  radius = 90,
  whole = false,
): Highlight[] {
  const { folded, starts, ends } = foldWithMap(text);
  const ranges = terms
    .flatMap((term) =>
      occurrences(folded, term, Infinity, whole).map(
        (at) => [at, at + term.length] as const,
      ),
    )
    .sort((a, b) => a[0] - b[0] || b[1] - a[1]);
  const merged: [number, number][] = [];
  for (const [s, e] of ranges) {
    const last = merged.at(-1);
    // Overlapping matches, and matches separated only by spaces, join.
    if (last && (s <= last[1] || !folded.slice(last[1], s).trim()))
      last[1] = Math.max(last[1], e);
    else merged.push([s, e]);
  }
  let from = 0;
  let to = folded.length;
  if (folded.length > radius * 2 + 40) {
    const first = merged[0]?.[0] ?? 0;
    from = Math.max(0, first - radius);
    to = Math.min(folded.length, Math.max(from + radius * 2, first + 40));
    // Cut at spaces so no word is split.
    if (from > 0) {
      const space = folded.indexOf(' ', from);
      if (space !== -1 && space < first) from = space + 1;
    }
    if (to < folded.length) {
      const space = folded.lastIndexOf(' ', to);
      if (space > (merged[0]?.[1] ?? from)) to = space;
    }
  }
  const origin = (k: number) => (k >= folded.length ? text.length : starts[k]);
  const segments: Highlight[] = [];
  let cursor = origin(from);
  for (const [s, e] of merged) {
    if (e <= from || s >= to) continue;
    const start = origin(Math.max(s, from));
    const end = ends[Math.min(e, to) - 1];
    if (start > cursor)
      segments.push({ text: text.slice(cursor, start), match: false });
    segments.push({ text: text.slice(start, end), match: true });
    cursor = end;
  }
  const stop = origin(to);
  if (stop > cursor)
    segments.push({ text: text.slice(cursor, stop), match: false });
  if (!segments.length) segments.push({ text: '', match: false });
  if (origin(from) > 0) segments.unshift({ text: '…', match: false });
  if (stop < text.length) segments.push({ text: '…', match: false });
  return segments.filter((s, i) => s.text || i === 0);
}

/**
 * Every record matching all terms, grouped by record type in a fixed order.
 * Within a group, records with more complete and better-placed matches come
 * first, then dated records in date order, then by ID.
 */
export function searchRecords(
  index: SearchIndex,
  query: string,
  filters: SearchFilters = {},
): SearchResults {
  const terms = parseQuery(query);
  const groups = new Map<
    SearchRecordType,
    { hit: SearchHit; sortDate: string }[]
  >(searchRecordTypes.map((t) => [t, []]));
  if (!terms.length) return { terms, total: 0, groups: [] };
  const phrase = terms.length > 1 ? terms.join(' ') : null;
  for (const record of index.records) {
    if (!passesFilters(record, filters)) continue;
    const fields =
      filters.mode === 'names'
        ? record.fields.filter((f) => nameFields.includes(f.field))
        : record.fields;
    let score = 0;
    const matched = new Map<IndexedField, number>();
    let all = true;
    for (const term of terms) {
      let best = 0;
      for (const f of fields) {
        const at = occurrences(f.folded, term, 8, filters.wholeWords);
        if (!at.length) continue;
        matched.set(f, (matched.get(f) ?? 0) + 1);
        const whole = at.some((p) => !isWordChar(f.folded[p + term.length]));
        best = Math.max(best, fieldWeights[f.field] * (whole ? 2 : 1));
      }
      if (!best) {
        all = false;
        break;
      }
      score += best;
    }
    if (!all) continue;
    if (phrase)
      for (const f of matched.keys())
        if (occurrences(f.folded, phrase, 1, filters.wholeWords).length)
          score += fieldWeights[f.field] * 2;
    // A field that is exactly the query, such as an alias, ranks first.
    const query = phrase ?? terms[0];
    for (const f of matched.keys())
      if (f.folded.trim() === query) score += fieldWeights[f.field] * 4;
    const [shown] = [...matched.entries()].sort(
      (a, b) =>
        b[1] - a[1] || fieldWeights[b[0].field] - fieldWeights[a[0].field],
    )[0];
    groups.get(record.type)!.push({
      sortDate: record.sortDate ?? '9999',
      hit: {
        type: record.type,
        id: record.id,
        claimId: record.claimId,
        field: shown.field,
        snippet: highlight(shown.text, terms, 90, filters.wholeWords),
        matchedFields: [...new Set([...matched.keys()].map((f) => f.field))],
        score,
        status: record.status,
        date: record.date,
        sourceIds: record.sourceIds,
        entityType: record.entityType,
      },
    });
  }
  const result = [...groups.entries()]
    .filter(([, hits]) => hits.length)
    .map(([type, hits]) => ({
      type,
      hits: hits
        .sort(
          (a, b) =>
            b.hit.score - a.hit.score ||
            a.sortDate.localeCompare(b.sortDate) ||
            a.hit.id.localeCompare(b.hit.id),
        )
        .map((h) => h.hit),
    }));
  return {
    terms,
    total: result.reduce((n, g) => n + g.hits.length, 0),
    groups: result,
  };
}

/** Organisations named in at least one claim, by name, for filtering. */
export function searchOrganisations(data: Dataset) {
  const named = new Set(data.claims.flatMap(endpoints));
  return data.entities
    .filter((e) => e.type === 'organisation' && named.has(e.id))
    .map((e) => ({ id: e.id, name: e.name }))
    .sort((a, b) => a.name.localeCompare(b.name, 'en'));
}

/** Years present in claim dates and source publication dates. */
export function searchYears(data: Dataset) {
  const years = new Set<number>();
  for (const c of data.claims) {
    const y = claimYears(c);
    if (y) {
      years.add(y[0]);
      years.add(y[1]);
    }
  }
  for (const s of data.sources)
    if (s.publicationDate) years.add(yearOf(s.publicationDate)!);
  return [...years].sort((a, b) => a - b);
}
