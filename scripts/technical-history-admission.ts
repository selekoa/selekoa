// Admits the Kinds of AI and technical history candidate pack
// (research/technical-history) into the dataset, in two parts, using the
// authored map in review/technical-history-admission-map-2026-10-31.json, the
// maintainer's decisions of 2026-10-30 and adjudication of 2026-10-31
// (review/technical-history-pack-2026-10-29.md) and the corrections of the
// cross-family check (research/technical-history/cross-family-check-2026-10-29.md).
//
//   pnpm tsx scripts/technical-history-admission.ts --part 1          write part 1
//   pnpm tsx scripts/technical-history-admission.ts --part 1 --check  compare with the stored records
//   pnpm tsx scripts/technical-history-admission.ts --part 2          write part 2 (schema 2.26)
//
// Run part 1, then part 2. A part is idempotent: where its before-snapshot is
// applied to the stored data (some row it lists as added is present), it
// first removes the rows the snapshot lists as added and restores the rows it
// changed, then rebuilds them. Where the snapshot is absent, or was made on
// another base and none of its rows is present, the stored data is the base
// and a new snapshot is written with the current commit. The pack is never
// changed. Quotations rest on the pack's mechanical check
// (research/technical-history/verification.json) and the cross-family check;
// the two passages the check added are matched as the map records.
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { maxQuotedWords } from '../src/domain/schema';
import { predicates } from '../src/domain/predicates';
import { subtypeLists } from '../src/editorial/subtype-lists';

const dir = 'research/technical-history';
const names = ['entities', 'claims', 'sources', 'evidence'] as const;
type Name = (typeof names)[number];
type Row = Record<string, unknown> & { id: string };
type Json = Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any

const read = (path: string) => JSON.parse(readFileSync(path, 'utf8'));
const args = process.argv.slice(2);
const check = args.includes('--check');
const map: Json = read(
  'review/technical-history-admission-map-2026-10-31.json',
);
const pack: Json = read(`${dir}/pack.json`);
const verification: Json = read(`${dir}/verification.json`);
const crossCheck: Json = read(`${dir}/cross-family-check-2026-10-29.json`);
const packSources = new Map<string, Json>(
  pack.sources.map((s: Json) => [s.key, s]),
);
const extraSources = new Map<string, Json>(
  (map.extraSources as Json[]).map((s) => [s.key, s]),
);
const packDocuments = new Map<string, Json>(
  pack.documents.map((d: Json) => [d.id, d]),
);
const packClaim = (id: string): Json | undefined =>
  pack.claims.find((c: Json) => c.id === id);
const checkOf = new Map<string, Json>(
  Object.values(crossCheck.items as Json)
    .filter((item: Json) => item.part === 'B')
    .map((item: Json) => [item.recordId, item]),
);
const words = (s: string) =>
  s.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;

const part = args[args.indexOf('--part') + 1];
const plan: Json = map.parts[part];
if (!args.includes('--part') || !plan)
  throw new Error('Usage: --part 1|2 [--check]');
const date: string = map.admissionDate;
const packDate: string = map.packRetrieved;
const snapshotPath = `review/technical-history-admission-${part}-before-2026-10-31.json`;
const hold = map.hold as Record<string, string>;

// ---------------------------------------------------------------- base
const stored = {
  meta: read('data/meta.json'),
  ...Object.fromEntries(names.map((n) => [n, read(`data/${n}.json`)])),
} as { meta: Json } & Record<Name, Row[]>;
const snapshotFile: Json | null = existsSync(snapshotPath)
  ? read(snapshotPath)
  : null;
// A snapshot applies only where its rows are in the stored data; one made on
// another base is ignored and replaced (the operating guide: regenerate the
// before-snapshot from the new base, never by hand).
const storedIds = Object.fromEntries(
  names.map((n) => [n, new Set(stored[n].map((r) => r.id))]),
) as Record<Name, Set<string>>;
const snapshot: Json | null =
  snapshotFile &&
  names.some((n) =>
    (snapshotFile.added[n] as string[]).some((id) => storedIds[n].has(id)),
  )
    ? snapshotFile
    : null;
// A later part built on this one must be removed first: rebuilding an
// earlier part under it would record the later part's rows in its base.
for (const later of Object.keys(map.parts).filter((p) => p > part)) {
  const path = `review/technical-history-admission-${later}-before-2026-10-31.json`;
  const s: Json | null = existsSync(path) ? read(path) : null;
  if (
    s &&
    names.some((n) =>
      (s.added[n] as string[]).some((id) => storedIds[n].has(id)),
    )
  )
    throw new Error(
      `Part ${later} is applied to data/; restore data/ to the base and run the parts in order`,
    );
}
if (snapshotFile && !snapshot)
  console.log(
    `${snapshotPath} lists no row present in data/; it is regenerated from the current base.`,
  );
const base = {
  meta: snapshot ? snapshot.meta : stored.meta,
  ...Object.fromEntries(
    names.map((n) => {
      const added = new Set<string>(snapshot?.added[n] ?? []);
      const before = new Map<string, Row>(
        (snapshot?.before[n] ?? []).map((r: Row) => [r.id, r]),
      );
      return [
        n,
        stored[n]
          .filter((r) => !added.has(r.id))
          .map((r) => structuredClone(before.get(r.id) ?? r)),
      ];
    }),
  ),
} as { meta: Json } & Record<Name, Row[]>;
const baseCommit: string =
  snapshot?.baseCommit ??
  execFileSync('git', ['rev-parse', '--short', 'HEAD'], {
    encoding: 'utf8',
  }).trim();
const sha = (value: unknown) =>
  createHash('sha256').update(JSON.stringify(value)).digest('hex');
const existing = (n: Name, id: string) => base[n].find((r) => r.id === id);

for (const p of (plan.adoptedPredicates ?? []) as string[])
  if (!(p in predicates))
    throw new Error(`Part ${part} needs the predicate ${p} in the schema`);

// ---------------------------------------------------------------- prose
const include: string[] = (plan.include as string[]).filter((id) => !hold[id]);
const partNew = (map.newClaims as Json[]).filter((n) => n.part === part);
const admittedIds = new Set<string>([
  ...base.claims.map((c) => c.id),
  ...include,
  ...partNew.map((n) => n.id),
]);
// The IDs reader-facing text must not name: the pack's, and the dataset's
// own entities (persons, organisations, documents). A stored concept's ID can
// be ordinary hyphenated wording ("reinforcement-learning") and is left out.
const knownIds = new Set<string>([
  ...pack.claims.map((c: Json) => c.id),
  ...pack.documents.map((d: Json) => d.id),
  ...pack.entities.map((e: Json) => e.id),
  ...base.entities.filter((e) => e.type !== 'concept').map((e) => e.id),
]);
const idToken = /\b[a-z][a-z0-9]*(?:-[a-z0-9]+)+\b/g;
const rules: [RegExp, string][] = (map.prose as [string, string][]).map(
  ([re, to]) => [new RegExp(re, 'g'), to],
);
const tidy: [RegExp, string][] = [
  [/\(see recorded separately\)/g, '(recorded separately)'],
  [/see recorded separately/g, 'recorded separately'],
  [/recorded separately(?:,| and) recorded separately/g, 'recorded separately'],
];
/** Reader-facing text never names a record ID (as in earlier admissions). */
function prose(text: string) {
  let out = text;
  for (const [re, to] of rules) out = out.replace(re, to);
  out = out.replace(idToken, (t) =>
    admittedIds.has(t) ? 'recorded separately' : t,
  );
  for (const [re, to] of tidy) out = out.replace(re, to);
  return out.trim();
}
function noIds(text: string, where: string) {
  const left = (text.match(idToken) ?? []).find(
    (t) => admittedIds.has(t) || knownIds.has(t),
  );
  if (left) throw new Error(`Record ID left in ${where}: ${left}`);
  return text;
}
const loaded =
  /\b(poach(ed|ing)?|ousted?|defect(ed|ion)?|exodus|rivals?|betray\w*|purge\w*|landmark|pioneer\w*|race|breakthrough)\b/i;
/** Priority words in Selekoa's own sentences (quotations are the source's). */
const priority =
  /\b(the first(?!-)|first to|coined|originated|invented|introduced the|founder of|father of)\b/i;
const unquoted = (s: string) => s.replace(/[“"‘][^”"’]*[”"’]/g, '');
/** A sentence of Selekoa's own: not an attributed statement, quotations removed. */
const ownWords = (s: string) =>
  /\b(According to|states|writes|says|reports)\b/.test(s)
    ? ''
    : unquoted(s).replace(/(^|\s)'[^']*'(?=[\s.,;:)]|$)/g, '$1');

// ---------------------------------------------------------------- rows
const added: Record<Name, Row[]> = {
  entities: [],
  claims: [],
  sources: [],
  evidence: [],
};
const changed: Record<Name, Map<string, Row>> = {
  entities: new Map(),
  claims: new Map(),
  sources: new Map(),
  evidence: new Map(),
};
const addOnce = (n: Name, row: Row) => {
  if (added[n].some((r) => r.id === row.id) || existing(n, row.id))
    throw new Error(`Duplicate ${n} id: ${row.id}`);
  added[n].push(row);
};
function changeRow(n: Name, id: string, edit: (row: Row) => void) {
  const row = existing(n, id);
  if (!row) throw new Error(`No stored ${n} row: ${id}`);
  if (!changed[n].has(id)) changed[n].set(id, structuredClone(row));
  edit(row);
}

// A source is reused where the dataset already holds one for the same
// address (another admission may have recorded the same expression).
const usedSources = new Set<string>();
const sourceId = (key: string): string => {
  const x = extraSources.get(key);
  if (x) return x.id;
  const s = packSources.get(key);
  if (!s) throw new Error('Unknown pack source: ' + key);
  if (s.datasetSource) return s.datasetSource;
  if (map.sources[key]?.id) return map.sources[key].id;
  const same = base.sources.find(
    (r) => r.canonicalUrl === s.url || r.evidenceUrl === s.url,
  );
  return same ? same.id : `source-th-${key}`;
};
/** A pack concept or document the dataset already holds under another ID. */
const conceptOf = (id: string): string => map.conceptMap[id] ?? id;

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const inWords = (d: string) => {
  const [y, m, day] = d.split('-');
  if (!m) return y;
  const month = months[Number(m) - 1];
  return day ? `${Number(day)} ${month} ${y}` : `${month} ${y}`;
};

/** The check's own verdict on the record: full support, or partial support until its corrections were applied. */
function checkSentence(id: string, applied?: string) {
  const item = checkOf.get(id);
  if (!item) return '';
  const verdict: string = item.checks?.evidenceSupportsProposition;
  if (verdict !== 'full' && verdict !== 'partial')
    throw new Error(`No check verdict for ${id}: ${verdict}`);
  if (verdict === 'partial' && !applied)
    throw new Error(
      `A partial check verdict without an applied correction: ${id}`,
    );
  const found =
    verdict === 'full'
      ? 'found that they support what the record states'
      : 'found only partial support for what the pack’s record stated';
  return `A cross-family machine check (${inWords(item.checkedOn)}, item ${item.number}) re-read the record’s sources and ${found}.${applied ? ` Its point that ${applied} was applied at admission.` : ''}`;
}

function quoteNote(key: string, e: Json, repair?: Json) {
  const [claim, index] = key.split(':');
  const packCheck = (verification.perQuote as Json[]).find(
    (q) => q.claim === claim && q.evidence === Number(index) + 1,
  );
  if (!packCheck?.found)
    throw new Error('Quotation not matched by the pack: ' + key);
  return [
    `The quotation (${words(e.passage)} words) matched the text retrieved for the candidate pack on ${packDate}. Matching ignored differences of whitespace, case, quotation marks, dashes, PDF line-break hyphens and Unicode compatibility forms, so the source’s typography can differ.`,
    repair ? repair.reason : '',
  ]
    .filter(Boolean)
    .join(' ');
}

const quoted = new Map<string, Set<string>>();
function evidenceRow(claimId: string, eid: string, e: Json, note: string): Row {
  usedSources.add(e.source);
  const sid = sourceId(e.source);
  if (e.passageType === 'quote') {
    if (words(e.passage) > 50) throw new Error('Quote over 50 words: ' + eid);
    quoted.set(sid, (quoted.get(sid) ?? new Set()).add(e.passage));
  }
  return {
    id: eid,
    claimId,
    sourceId: sid,
    sourceRole: e.sourceRole,
    support: e.support,
    locator: e.locator,
    passage:
      e.passageType === 'quote'
        ? e.passage
        : noIds(prose(e.passage.replace(/^Paraphrase:\s*/, '')), eid),
    passageType: e.passageType,
    verification: 'machine_checked',
    checkedAt: date,
    note: noIds(prose(note), eid),
    // A passage read in an archive capture carries no retrieval route: the
    // schema's routes are ways of reaching a live address.
    ...('retrievalRoute' in e && e.retrievalRoute === null
      ? {}
      : { retrievalRoute: e.retrievalRoute ?? 'direct' }),
  };
}

// --------------------------------------------------- edits to stored rows
// A stored source that is a document's expression names it (so a statement
// of that document is dated by it); a concept the pack maps onto takes its
// naming criterion.
for (const [n, key] of [
  ['entities', 'storedEntityEdits'],
  ['sources', 'storedSourceEdits'],
] as const)
  for (const [id, edit] of Object.entries(
    (plan[key] ?? {}) as Record<string, Json>,
  ))
    changeRow(n, id, (row) => {
      for (const [k, v] of Object.entries(edit)) row[k] = v;
    });

// ---------------------------------------------------------------- dates
/**
 * The date of a pack source's expression: the publication date the pack ties
 * to this source (a document with several versions dates each by its own),
 * else the document's; for an arXiv copy the submission date of the version
 * read. A revision the copy carries is its version date (map.sources).
 */
function expressionDate(key: string): string | null {
  const p: Json = map.sources[key] ?? {};
  if ('publicationDate' in p) return p.publicationDate;
  const s = packSources.get(key);
  const doc = s && packDocuments.get(s.documentId);
  const dates = (doc?.dates ?? []) as Json[];
  const published =
    dates.find((d) => d.kind === 'publication' && d.source === key) ??
    dates.find((d) => d.kind === 'publication' && !d.source) ??
    dates.find((d) => d.kind === 'publication');
  if (published) return published.date;
  if (!/arxiv\.org/.test(s?.url ?? '')) return null;
  const submitted = dates.filter((d) => d.kind === 'submission');
  return (
    (submitted.find((d) => /version read/.test(d.label)) ?? submitted[0])
      ?.date ?? null
  );
}
/** Dates of the expressions of a document, stored or added by this part. */
function expressionDates(docId: string): string[] {
  const out = base.sources
    .filter((r) => r.documentId === docId)
    .flatMap((r) => [r.publicationDate, r.versionDate] as string[]);
  // A pack source that resolves to a stored source is dated by the stored
  // row, not by the pack's reading of it.
  for (const s of packSources.values())
    if (
      conceptOf(s.documentId) === docId &&
      !existing('sources', sourceId(s.key))
    )
      out.push(expressionDate(s.key)!, map.sources[s.key]?.versionDate);
  return [...new Set(out.filter(Boolean))];
}

// ---------------------------------------------------------------- claims
const keptBases = new Set(['publication', 'announcement', 'revision']);
/** A date as the schema holds it: kinds outside its bases keep their kind in the note. */
function timeOf(raw: Json): Json {
  if (!raw.date)
    return { kind: 'unknown', note: raw.note ?? map.timeNotes.unknown };
  const basis: string = raw.basis ?? 'event';
  const time: Json = { kind: 'event', date: raw.date };
  if (keptBases.has(basis)) {
    time.basis = basis;
    time.note = raw.note ?? map.timeNotes[basis];
  } else time.note = [map.timeNotes[basis], raw.note].filter(Boolean).join(' ');
  return time;
}
/** "1993-12 (NTRS scan)" or "undated: …" as the schema's dated note. */
function datedNote(value: string | null | undefined): Json | undefined {
  if (!value) return undefined;
  const m = value.match(
    /^(\d{4}(?:-\d{2}(?:-\d{2})?)?)\s*(?:\((.*)\))?\s*;?\s*(.*)$/,
  );
  if (m)
    return {
      date: m[1],
      note:
        [m[2], m[3]].filter(Boolean).join('; ') || 'As the source gives it.',
    };
  return { note: value.replace(/^undated:\s*/, 'Undated: ') };
}
function namingOf(raw: Json, over: Json): Json {
  const t: Json = raw.attributes.term;
  const titleOnly = /title/.test(t.register);
  const naming: Json = {
    string: t.string,
    sense: t.sense,
    role: (t.roles as string[]).includes('earliest-located-term')
      ? 'earliest-located'
      : 'use',
    register: titleOnly ? 'nonfiction' : t.register,
    reading: titleOnly ? 'indexed-title' : 'text',
  };
  const claimed = datedNote(t.claimed);
  if (claimed?.date) naming.claimed = claimed;
  const attested = datedNote(t.attested);
  if (attested) naming.attested = attested;
  for (const [k, v] of Object.entries(over.naming ?? {}))
    if (v === null) delete naming[k];
    else naming[k] = v;
  for (const k of ['claimed', 'attested'])
    if (naming[k]) naming[k].note = noIds(prose(naming[k].note), raw.id);
  return naming;
}

function buildClaim(raw: Json, over: Json) {
  const id: string = raw.id;
  // A record the map moves to another predicate (a credit the check found
  // to be a citation) states its relation anew.
  const predicate: string = over.predicate ?? raw.predicate;
  if (over.predicate && !over.statement)
    throw new Error('A changed predicate without a rewritten statement: ' + id);
  if (
    raw.proposedPredicate &&
    predicate === raw.predicate &&
    !(plan.adoptedPredicates ?? []).includes(predicate)
  )
    throw new Error('A proposed predicate without a decision: ' + id);
  if (!(predicate in predicates))
    throw new Error(`Predicate ${predicate} is not in the schema: ${id}`);
  const object: Json =
    raw.object.kind === 'entity'
      ? { kind: 'entity', entityId: conceptOf(raw.object.entityId) }
      : raw.object;

  const attributes: Json = {};
  const a: Json = raw.attributes ?? {};
  if (a.term) attributes.naming = namingOf(raw, over);
  if (raw.naming) attributes.naming = raw.naming;
  if (a.technical) attributes.technical = { kind: a.technical.kind };
  Object.assign(attributes, over.attributes ?? {});
  if (a.provision)
    attributes.provision = {
      kind: a.provision.kind,
      key: id
        .replace(/^th-/, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, ''),
    };

  let time: Json = over.time ?? timeOf(raw.time);
  // Schema 2.20: a stated statement is dated by its text; the date of what
  // it reports stays in the statement and the note.
  if (attributes.provision) {
    const dates = expressionDates(conceptOf(raw.subject));
    const keeps =
      ['publication', 'revision'].includes(time.basis) &&
      dates.includes(time.date);
    if (!keeps) {
      if (!dates.length) throw new Error('An undated stated text: ' + id);
      const d = dates.sort()[0];
      // A record the pack already dated by its text, where the stored
      // source of that text records the date at another precision.
      const sameText =
        ['publication', 'revision'].includes(time.basis) &&
        time.date.startsWith(d);
      time = {
        kind: 'event',
        date: d,
        basis: 'publication',
        note: sameText
          ? `Dated by the text that states it, ${inWords(d)}, as its stored source records it; the candidate pack read ${inWords(time.date)} on the same text.`
          : `Dated by the text that states it, ${inWords(d)}. ${time.kind === 'event' ? `The statement reports ${inWords(time.date)}: ` : ''}${time.note}`,
      };
    }
  }
  time.note = noIds(prose(time.note), id);
  const statement = noIds(prose(over.statement ?? raw.statement), id);
  const qualification = noIds(
    prose(
      [over.qualification ?? raw.qualification, over.qualificationAppend]
        .filter(Boolean)
        .join(' '),
    ),
    id,
  );
  if (loaded.test(unquoted(statement)) || loaded.test(unquoted(qualification)))
    throw new Error('Loaded wording: ' + id);
  if (priority.test(ownWords(statement)))
    throw new Error('Priority wording: ' + id);

  const evidenceIds: string[] = [];
  (raw.evidence as Json[]).forEach((rawEvidence, index) => {
    const key = `${id}:${index}`;
    const eOver: Json = map.evidence[key] ?? {};
    if (eOver.drop) return;
    const e: Json = { ...structuredClone(rawEvidence), ...(eOver.set ?? {}) };
    if (eOver.set?.passage && e.passageType === 'quote')
      throw new Error('A changed quotation: ' + key);
    if (
      eOver.set?.sourceRole &&
      eOver.set.sourceRole !== rawEvidence.sourceRole &&
      !eOver.roleReason
    )
      throw new Error('A changed source role without its reason: ' + key);
    if (eOver.repair) {
      if (!e.passage.includes(eOver.repair.from))
        throw new Error('Nothing to repair: ' + key);
      e.passage = e.passage.replace(eOver.repair.from, eOver.repair.to);
    }
    const eid = `evidence-${id}-${evidenceIds.length + 1}`;
    let text: string;
    if (rawEvidence.reason)
      text = [
        'Added at the admission of the technical history pack.',
        rawEvidence.reason,
        e.passageType === 'quote'
          ? `The quotation (${words(e.passage)} words) matched as stated.`
          : '',
      ]
        .filter(Boolean)
        .join(' ');
    else
      text = [
        `Candidate pack passage, Kinds of AI and technical history (${dir}).`,
        e.passageType === 'quote'
          ? quoteNote(key, rawEvidence, eOver.repair)
          : `The paraphrase is Selekoa’s, written from the text retrieved for the candidate pack on ${packDate}; it is not a quotation and was not machine-matched.`,
        eOver.note ?? e.note ?? '',
        eOver.roleReason ?? '',
      ]
        .filter(Boolean)
        .join(' ');
    const note = [
      text,
      checkSentence(id, over.applied),
      'No human editorial review.',
    ]
      .filter(Boolean)
      .join(' ');
    addOnce('evidence', evidenceRow(id, eid, e, note));
    evidenceIds.push(eid);
  });
  if (!evidenceIds.length) throw new Error('A record without evidence: ' + id);

  addOnce('claims', {
    id,
    subject: conceptOf(raw.subject),
    predicate,
    object,
    topic: 'ideas',
    statement,
    time,
    derivation: raw.derivation,
    resolution: raw.resolution,
    ...(raw.inferenceRationale
      ? { inferenceRationale: noIds(prose(raw.inferenceRationale), id) }
      : {}),
    editorialState: 'seed',
    qualification,
    evidenceIds,
    recordedAt: date,
    ...(Object.keys(attributes).length ? { attributes } : {}),
  });
}

for (const id of include) {
  const raw = packClaim(id);
  if (!raw) throw new Error('Not a pack record: ' + id);
  buildClaim(raw, map.claims[id] ?? {});
}
for (const n of partNew) buildClaim(n, { time: structuredClone(n.time) });
for (const id of [...Object.keys(map.claims), ...Object.keys(hold)])
  if (
    !hold[id] &&
    !Object.values(map.parts).some((p) => (p as Json).include.includes(id))
  )
    throw new Error('A map entry for a record in no part: ' + id);
for (const id of Object.keys(hold))
  if (Object.values(map.parts).some((p) => (p as Json).include.includes(id)))
    throw new Error('A held record is also included: ' + id);
if (
  pack.claims.some(
    (c: Json) =>
      !hold[c.id] &&
      !Object.values(map.parts).some((p) => (p as Json).include.includes(c.id)),
  )
)
  throw new Error('A pack record in no part and not held');

// ---------------------------------------------------------------- entities
const referenced = new Set<string>();
for (const c of added.claims) {
  referenced.add(c.subject as string);
  if ((c.object as Json).kind === 'entity')
    referenced.add((c.object as Json).entityId);
}
const firstSource = (conceptId: string) =>
  added.claims
    .filter(
      (c) =>
        (c.object as Json).entityId === conceptId || c.subject === conceptId,
    )
    .flatMap((c) => c.evidenceIds as string[])
    .map((e) => added.evidence.find((r) => r.id === e)?.sourceId)
    .find(Boolean) as string | undefined;
const documentTypes = subtypeLists.document ?? [];
for (const [id, d] of Object.entries(map.documents as Record<string, Json>)) {
  if (!referenced.has(id) || existing('entities', id)) continue;
  if (!documentTypes.includes(d.subtype))
    throw new Error(`Subtype not in the closed list: ${d.subtype} (${id})`);
  // A work known only from a citation is documented by the citing source.
  const sourceIds = (d.sources as string[]).length
    ? (d.sources as string[]).map(sourceId)
    : [firstSource(id)].filter(Boolean);
  if (!sourceIds.length) throw new Error('A document without a source: ' + id);
  const publisher = packDocuments.get(id)?.publisherId;
  addOnce('entities', {
    id,
    name: d.name,
    ...(d.shortName ? { shortName: d.shortName } : {}),
    type: 'document',
    subtype: d.subtype,
    aliases: d.aliases ?? [],
    description: noIds(prose(d.description), id),
    sourceIds,
  });
  for (const k of d.sources as string[]) usedSources.add(k);
  if (publisher && existing('entities', publisher)) referenced.add(publisher);
}
for (const [id, d] of Object.entries(map.entities as Record<string, Json>)) {
  if (!referenced.has(id) || existing('entities', id)) continue;
  const sourceIds = (d.sources as string[]).length
    ? (d.sources as string[]).map(sourceId)
    : [firstSource(id)].filter(Boolean);
  if (!sourceIds.length) throw new Error('An entity without a source: ' + id);
  addOnce('entities', {
    id,
    name: d.name,
    ...(d.sortName ? { sortName: d.sortName } : {}),
    type: d.type,
    subtype: d.subtype,
    aliases: d.aliases ?? [],
    description: noIds(prose(d.description), id),
    sourceIds,
    ...(d.naming ? { naming: d.naming } : {}),
  });
  for (const k of d.sources as string[]) usedSources.add(k);
}
for (const id of referenced)
  if (!existing('entities', id) && !added.entities.some((e) => e.id === id))
    throw new Error('Entity without a row: ' + id);

// ---------------------------------------------------------------- sources
const reuse = (authors: string[], title: string, date: string | null) => ({
  attribution: `${authors.join(', ')}, “${title}”${date ? `, ${date}` : ''}.`,
  licence: 'No open redistribution licence asserted',
  note: 'Bibliographic metadata, editorial paraphrases and short attributed quotations (at most 50 words each). Recheck terms before wider redistribution.',
});
const known = (id: string) =>
  existing('entities', id) || added.entities.some((e) => e.id === id);
for (const key of [...packSources.keys(), ...extraSources.keys()].filter((k) =>
  usedSources.has(k),
)) {
  const id = sourceId(key);
  if (existing('sources', id) || added.sources.some((s) => s.id === id))
    continue;
  const x = extraSources.get(key);
  if (x) {
    addOnce('sources', {
      id,
      ...(x.documentId && known(x.documentId)
        ? { documentId: x.documentId }
        : {}),
      title: x.title,
      authors: x.authors,
      ...(x.authorNames ? { authorNames: x.authorNames } : {}),
      publisher: x.publisher,
      publicationDate: x.publicationDate,
      version: x.version,
      ...(x.versionDate ? { versionDate: x.versionDate } : {}),
      canonicalUrl: x.url,
      evidenceUrl: x.evidenceUrl ?? x.url,
      language: x.language,
      ...(x.archivedUrl
        ? { archivedUrl: x.archivedUrl, archivedAt: x.archivedAt }
        : {}),
      ...(x.documentWords ? { documentWords: x.documentWords } : {}),
      kind: x.kind,
      accessedAt: x.accessedAt,
      reuse: reuse(x.authors, x.title, x.publicationDate),
    });
    continue;
  }
  const s = packSources.get(key)!;
  const p: Json = map.sources[key] ?? {};
  const doc = packDocuments.get(s.documentId);
  const title: string = s.title;
  // An "et al." entry is not a name: only the named authors are recorded,
  // and the version says the source credits more.
  const named = (s.authorsAsPrinted as string[]).filter(
    (a) => !/\bet al\b/.test(a),
  );
  const truncated = named.length < s.authorsAsPrinted.length;
  const authors: string[] = named.length ? named : [s.publisher];
  const publicationDate: string | null = expressionDate(key);
  const version = [
    `Retrieved for the candidate pack on ${s.retrievedAt} (SHA-256 ${s.sha256}). ${s.version}`,
    p.versionNote ?? '',
    truncated
      ? 'Only the first-listed authors are recorded here; the source credits further authors.'
      : '',
    s.kind === 'webpage' &&
    !(map.paperSubtypes as string[]).includes(doc?.subtype)
      ? 'Its wording can change; earlier wording is not authenticated.'
      : '',
  ]
    .filter(Boolean)
    .join(' ');
  const kind: string =
    p.kind ??
    (s.kind === 'webpage' &&
    (map.paperSubtypes as string[]).includes(doc?.subtype)
      ? 'paper'
      : map.sourceKindMap[s.kind]);
  if (!kind) throw new Error(`No source kind for ${s.kind}: ${key}`);
  const publisherId: string | undefined =
    doc?.publisherId && known(doc.publisherId) ? doc.publisherId : undefined;
  addOnce('sources', {
    id,
    ...(s.documentId && known(s.documentId)
      ? { documentId: s.documentId }
      : {}),
    title,
    authors,
    publisher: s.publisher,
    ...(publisherId ? { publisherId } : {}),
    publicationDate,
    ...(p.versionDate ? { versionDate: p.versionDate } : {}),
    version: noIds(prose(version), id),
    canonicalUrl: s.url,
    evidenceUrl: s.url,
    language: s.language,
    ...(p.archivedUrl
      ? { archivedUrl: p.archivedUrl, archivedAt: p.archivedAt }
      : {}),
    // A scan without a text layer, quoted nowhere, records no length.
    ...(s.documentWords?.count
      ? {
          documentWords: {
            count: s.documentWords.count,
            basis: `${s.documentWords.basis.replace(/\.$/, '')}; counted for the candidate pack`,
          },
        }
      : {}),
    kind,
    accessedAt: s.retrievedAt,
    reuse: reuse(authors, title, publicationDate),
  });
}
// An archive capture the check opened, on a source this admission reuses.
for (const [key, p] of Object.entries(map.sources as Record<string, Json>)) {
  const id = sourceId(key);
  const row = existing('sources', id);
  if (!p.archivedUrl || !row || row.archivedUrl === p.archivedUrl) continue;
  changeRow('sources', id, (row) => {
    row.archivedUrl = p.archivedUrl;
    row.archivedAt = p.archivedAt;
  });
}

// A reused source that records no length takes the pack's count of the
// same address, so the per-document quotation limit can be checked.
for (const id of quoted.keys()) {
  const row = existing('sources', id);
  if (!row || row.documentWords) continue;
  const s = [...packSources.values()].find(
    (p) => sourceId(p.key) === id && p.documentWords?.count,
  );
  if (!s) continue;
  changeRow('sources', id, (r) => {
    r.documentWords = {
      count: s.documentWords.count,
      basis: `${s.documentWords.basis.replace(/\.$/, '')}; counted for the technical history candidate pack on ${s.retrievedAt}`,
    };
  });
}

// ---------------------------------------------------------------- limits
const norm = (p: string) =>
  p
    .toLowerCase()
    .replace(/[‘’'“”"]/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
const overLimit: string[] = [];
for (const id of quoted.keys()) {
  const row = added.sources.find((s) => s.id === id) ?? existing('sources', id);
  const length = (row?.documentWords as Json)?.count;
  const all = new Set<string>([...quoted.get(id)!].map(norm));
  for (const e of base.evidence)
    if (e.sourceId === id && e.passageType === 'quote')
      all.add(norm(e.passage as string));
  const list = [...all];
  const total = list
    .filter((p) => !list.some((q) => q !== p && q.includes(p)))
    .reduce((n, p) => n + words(p), 0);
  if (!length || total > maxQuotedWords(length))
    overLimit.push(
      `${id}: ${total} quoted words, limit ${length ? maxQuotedWords(length) : '?'}`,
    );
}
if (overLimit.length)
  throw new Error('Over the quotation limit:\n' + overLimit.join('\n'));

// ---------------------------------------------------------------- output
const meta = {
  ...base.meta,
  ...(plan.schemaVersion ? { schemaVersion: plan.schemaVersion } : {}),
  updatedAt: date,
  scope: `${base.meta.scope} ${plan.scope}`,
};
const result = {
  meta,
  ...Object.fromEntries(names.map((n) => [n, [...base[n], ...added[n]]])),
} as unknown as { meta: Json } & Record<Name, Row[]>;
const newSnapshot = {
  description: plan.snapshotDescription,
  baseCommit,
  meta: base.meta,
  added: Object.fromEntries(names.map((n) => [n, added[n].map((r) => r.id)])),
  before: Object.fromEntries(names.map((n) => [n, [...changed[n].values()]])),
  sha256: {
    meta: sha(base.meta),
    ...Object.fromEntries(
      names.map((n) => [n, sha(base[n].map((r) => changed[n].get(r.id) ?? r))]),
    ),
  },
};
const outputs: Record<string, unknown> = {
  'data/meta.json': result.meta,
  ...Object.fromEntries(names.map((n) => [`data/${n}.json`, result[n]])),
  [snapshotPath]: newSnapshot,
};
if (check) {
  const differing = Object.entries(outputs).filter(
    ([path, value]) =>
      !existsSync(path) ||
      JSON.stringify(read(path)) !==
        JSON.stringify(JSON.parse(JSON.stringify(value))),
  );
  if (differing.length) {
    console.error(
      'Differs from stored: ' + differing.map(([p]) => p).join(', '),
    );
    process.exitCode = 1;
  } else console.log('Stored records match the pack and the map.');
} else {
  for (const [path, value] of Object.entries(outputs))
    writeFileSync(path, JSON.stringify(value, null, 2) + '\n');
  execFileSync('pnpm', ['prettier', '--write', ...Object.keys(outputs)], {
    stdio: 'ignore',
  });
  console.log(
    `Part ${part} on ${baseCommit}: added ${names.map((n) => `${added[n].length} ${n}`).join(', ')}; changed ${names.map((n) => `${changed[n].size} ${n}`).join(', ')}; held ${Object.keys(hold).length} pack records.`,
  );
}
