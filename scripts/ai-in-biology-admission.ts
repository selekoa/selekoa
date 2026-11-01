// Admits the AI in biology candidate pack (research/ai-in-biology) into the
// dataset, in two parts, using the authored map in
// review/ai-in-biology-admission-map-2026-10-31.json, the maintainer's
// decisions of 2026-10-30 (review/ai-in-biology-pack-2026-10-30.md) and the
// corrections of the cross-family check
// (research/ai-in-biology/cross-family-check-2026-10-30.md).
//
//   pnpm tsx scripts/ai-in-biology-admission.ts --part 1          write part 1
//   pnpm tsx scripts/ai-in-biology-admission.ts --part 1 --check  compare with the stored records
//   pnpm tsx scripts/ai-in-biology-admission.ts --part 2          write part 2 (schema 2.23)
//
// Part 1 holds the institutions, models and people records on existing
// predicates; part 2 the two predicates decision 5 adopts, the claims strand
// and its collection. A part is idempotent: it first removes the rows its
// before-snapshot lists as added and restores the rows it changed, then
// rebuilds them, so it can run again on the same base or on a new one (the
// snapshot is then regenerated from that base, never by hand). The snapshot's
// base commit is the map's `baseCommit` for the part, or the current `HEAD`
// when the map gives "HEAD". The pack is never changed.
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { maxQuotedWords } from '../src/domain/schema';

const dir = 'research/ai-in-biology';
const names = ['entities', 'claims', 'sources', 'evidence'] as const;
type Name = (typeof names)[number];
type Row = Record<string, unknown> & { id: string };
type Json = Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any

const read = (path: string) => JSON.parse(readFileSync(path, 'utf8'));
const args = process.argv.slice(2);
const check = args.includes('--check');
const map: Json = read('review/ai-in-biology-admission-map-2026-10-31.json');
const pack: Json = read(`${dir}/pack.json`);
const verification: Json = read(`${dir}/verification.json`);
const crossCheck: Json = read(`${dir}/cross-family-check-2026-10-30.json`);
const date: string = map.admissionDate;
/** The date of the pack's quotation check and of the cross-family check. */
const packChecked: string = verification.checkedAt;

const part = args[args.indexOf('--part') + 1];
const plan: Json = map.parts[part];
if (!args.includes('--part') || !plan)
  throw new Error('Usage: --part 1|2 [--check]');
const snapshotPath = `review/ai-in-biology-admission-${part}-before-2026-10-31.json`;

const packSources = new Map<string, Json>(
  pack.sources.map((s: Json) => [s.key, s]),
);
const extraSources = new Map<string, Json>(
  (map.extraSources as Json[]).map((s) => [s.key, s]),
);
const packDocuments = new Map<string, Json>(
  pack.documents.map((d: Json) => [d.id, d]),
);
const packEntities = new Map<string, Json>(
  pack.entities.map((e: Json) => [e.id, e]),
);
const packClaim = (id: string): Json | undefined =>
  pack.claims.find((c: Json) => c.id === id);
const words = (s: string) =>
  s.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
// The pack's count for quotations in Chinese: each CJK character is a word.
const cjk = /[぀-ヿ㐀-鿿豈-﫿]/g;
const quoteWords = (s: string) =>
  (s.match(cjk) ?? []).length + words(s.replace(cjk, ' '));

// The cross-family check keys its items by part and displayed number.
const checkOf = new Map<string, Json>(
  Object.values(crossCheck.items as Json).map((item: Json) => [
    item.record_id,
    item,
  ]),
);

// ---------------------------------------------------------------- base
const stored = {
  meta: read('data/meta.json'),
  ...Object.fromEntries(names.map((n) => [n, read(`data/${n}.json`)])),
} as { meta: Json } & Record<Name, Row[]>;
const snapshot: Json | null = existsSync(snapshotPath)
  ? read(snapshotPath)
  : null;
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
const sha = (value: unknown) =>
  createHash('sha256').update(JSON.stringify(value)).digest('hex');
const existing = (n: Name, id: string) => base[n].find((r) => r.id === id);

// ---------------------------------------------------------------- reader text
const hold: Record<string, string> = plan.hold ?? {};
const included = (plan.include as string[]).filter((id) => !hold[id]);
const newClaimsOfPart = (map.newClaims as Json[]).filter(
  (n) => n.part === part,
);
const admittedIds = new Set<string>([
  ...base.claims.map((c) => c.id),
  ...included,
  ...newClaimsOfPart.map((n) => n.id),
]);
const packIds = new Set<string>([
  ...pack.claims.map((c: Json) => c.id),
  ...pack.documents.map((d: Json) => d.id),
  ...pack.entities.map((e: Json) => e.id),
]);
const idToken = /\b[a-z][a-z0-9]*(?:-[a-z0-9]+)+\b/g;
const tidy: [RegExp, string][] = [
  [/\(see recorded separately\)/g, '(recorded separately)'],
  [
    /\(recorded separately(?:,| and) recorded separately\)/g,
    '(recorded separately)',
  ],
  [/recorded separately(?:,| and) recorded separately/g, 'recorded separately'],
  [/\bas in recorded separately\b/g, 'as in the record of that publication'],
  // The collection states its searches once, under "How we searched".
  [
    /\b(?:the searches )?in howWeSearched\b/g,
    'described under “How we searched”',
  ],
  [/\(see howWeSearched\)/g, '(see “How we searched”)'],
];
/** Reader-facing text never names a record ID (as in earlier admissions). */
function prose(text: string) {
  let out = text;
  for (const [from, to] of Object.entries(
    (map.phrases ?? {}) as Record<string, string>,
  ))
    out = out.split(from).join(to);
  out = out.replace(idToken, (t) =>
    admittedIds.has(t) ? 'recorded separately' : t,
  );
  for (let pass = 0; pass < 3; pass++)
    for (const [re, to] of tidy) out = out.replace(re, to);
  return out;
}
const textProblems: string[] = [];
function noIds(text: string, where: string) {
  const left = (text.match(idToken) ?? []).find(
    (t) => admittedIds.has(t) || packIds.has(t),
  );
  if (left) textProblems.push(`Record ID left in ${where}: ${left}`);
  const vocabulary = text.match(
    /howWeSearched|siblingLinks|integrator|(?:models|claims|people|companies|labs) pass\b|drafting pass/,
  );
  if (vocabulary)
    textProblems.push(`Pack vocabulary left in ${where}: ${vocabulary[0]}`);
  return text;
}
// Lower case only: a proper name such as Flagship Pioneering is not loaded.
const loaded =
  /\b(poach(ed|ing)?|ousted?|defect(ed|ion)?|exodus|rivals?|betray\w*|purge\w*|landmark|pioneer\w*|race|breakthrough|solved)\b/;

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
/** Records an edit to a stored row, keeping the row as it was in the snapshot. */
function changeRow(n: Name, id: string, edit: (row: Row) => void) {
  const row = existing(n, id);
  if (!row) throw new Error(`No stored ${n} row: ${id}`);
  if (!changed[n].has(id)) changed[n].set(id, structuredClone(row));
  edit(row);
}
const usedSources = new Set<string>();
/** A pack key whose page another key also retrieved cites that key's row. */
const keptKey = (key: string): string => map.sources[key]?.sameAs ?? key;
const sourceId = (key: string): string => {
  if (keptKey(key) !== key) return sourceId(keptKey(key));
  const x = extraSources.get(key);
  if (x) return x.id as string;
  const s = packSources.get(key);
  if (!s) throw new Error('Unknown pack source: ' + key);
  return (
    map.sources[key]?.id ??
    (s.datasetSource as string | null) ??
    `source-aib-${key}`
  );
};

function checkSentence(id: string) {
  const item = checkOf.get(id);
  if (!item) return '';
  const where = `2026-10-30, item ${item.part}${item.item}`;
  if (item.part === 'A')
    return `A cross-family machine check (${where}) answered the record’s question blind from fresh retrievals and ${
      item.comparison === 'agree'
        ? 'agreed with the record'
        : item.comparison === 'disagree'
          ? 'located an earlier text; the record was corrected at admission'
          : 'agreed in part; its corrections were applied at admission'
    }.`;
  const support = item.checks?.evidence_support;
  const flagged = Object.entries(item.checks ?? {}).some(
    ([k, v]) =>
      ['quotation_verbatim', 'date_and_kind_right'].includes(k) && v === 'no',
  );
  return `A cross-family machine check (${where}) re-read the record’s sources and found ${support === 'full' ? 'full' : 'partial'} support${flagged || item.checks?.locator_right === 'minor' ? '; its corrections were applied at admission' : ''}.`;
}

function quoteNote(key: string, e: Json) {
  const [claim, index] = key.split(':');
  const packCheck = (verification.quotes as Json[]).find(
    (q) => q.claim === claim && q.evidence - 1 === Number(index),
  );
  if (!packCheck?.found)
    throw new Error('Quotation not matched by the pack: ' + key);
  return `The quotation (${quoteWords(e.passage)} words) matched the text retrieved for the candidate pack on ${packChecked}. Matching ignored differences of whitespace, case, quotation marks, dashes and Unicode compatibility forms, so the source’s typography can differ.`;
}

const translated = (t: string) =>
  `English machine translation, not verified by a person: “${t}”.`;

// Quotations per dataset source, for the limit check below.
const quoted = new Map<string, Set<string>>();
function evidenceRow(
  claimId: string,
  eid: string,
  e: Json,
  note: string,
  checkedAt: string,
): Row {
  usedSources.add(keptKey(e.source));
  const sid = sourceId(e.source);
  if (e.passageType === 'quote') {
    if (quoteWords(e.passage) > 50)
      throw new Error('Quote over 50 words: ' + eid);
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
    checkedAt,
    note: noIds(prose(note), eid),
    // A passage read in an archive capture carries no retrieval route: the
    // schema's routes are ways of reaching a live address.
    ...('retrievalRoute' in e && e.retrievalRoute === null
      ? {}
      : { retrievalRoute: e.retrievalRoute ?? 'direct' }),
  };
}

// ---------------------------------------------------------------- claims
const unsupportedAttributes = ['statedStart', 'award', 'share', 'citation'];
const topicOf = (c: Json, over: Json): string =>
  over.topic ??
  map.topics.byPredicate[c.predicate] ??
  map.topics.byGroup[c.group ?? 'new'];

/** Builds one admitted claim from a pack record and its map entry. */
function buildClaim(raw: Json, over: Json) {
  const id: string = over.id ?? raw.id;
  const c: Json = structuredClone(raw);
  for (const key of [
    'subject',
    'predicate',
    'object',
    'statement',
    'qualification',
    'derivation',
    'resolution',
    'hazardNote',
    'inferenceRationale',
  ])
    if (over[key] !== undefined) c[key] = over[key];
  if (over.inferenceRationale === null) delete c.inferenceRationale;
  if (
    raw.proposedPredicate &&
    !(plan.adoptedPredicates ?? []).includes(c.predicate)
  )
    throw new Error('A proposed predicate without a decision: ' + id);
  if (over.qualificationAppend)
    c.qualification = `${c.qualification} ${over.qualificationAppend}`;

  // Attributes: the pack's, less those the schema has no place for, then the
  // map's.
  const attributes: Json = structuredClone(c.attributes ?? {});
  for (const k of unsupportedAttributes) delete attributes[k];
  for (const [k, v] of Object.entries(over.attributes ?? {}))
    if (v === null) delete attributes[k];
    else attributes[k] = v;
  if (attributes.thought) {
    const t = attributes.thought;
    if (over.roles) t.roles = over.roles;
    if (over.thought) Object.assign(t, over.thought);
    for (const [k, v] of Object.entries(t)) if (v === null) delete t[k];
    if (!t.roles.includes('context')) delete t.missing;
    if (c.predicate !== 'contests_proposition') delete t.engagement;
  }
  if (attributes.provision) {
    const p = attributes.provision;
    // The schema's provision keys are lower-case slugs.
    p.key = (p.key ?? id.replace(/^aib-/, ''))
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  // Time: the schema's bases. A stated provision is dated by its expression's
  // own date, so a release's date of announcement is its date of publication.
  const time: Json = { kind: c.time.kind };
  for (const key of ['date', 'from', 'until', 'basis', 'note'])
    if (c.time[key] !== undefined && c.time[key] !== null)
      time[key] = c.time[key];
  if (
    c.predicate === 'states_provision' &&
    time.kind === 'event' &&
    time.basis === 'announcement'
  ) {
    time.basis = 'publication';
    time.note = `${time.note} The record is dated by the text’s date of publication, which is the date of its announcement.`;
  }
  Object.assign(time, over.time ?? {});
  for (const [k, v] of Object.entries(time)) if (v === null) delete time[k];
  time.note = noIds(prose(time.note ?? 'Date as the source gives it.'), id);

  const statement = noIds(prose(c.statement), id);
  const hazard = c.hazardNote ? ` ${prose(c.hazardNote)}` : '';
  const qualification = noIds(prose(c.qualification) + hazard, id);
  if (loaded.test(statement))
    textProblems.push(`Loaded wording in a statement: ${id}`);

  // Evidence, in pack order, with the map's corrections; then additions.
  const evidenceIds: string[] = [];
  (c.evidence as Json[]).forEach((rawEvidence, index) => {
    const key = `${raw.id}:${index}`;
    const eOver: Json = map.evidence[key] ?? {};
    if (eOver.drop) return;
    const e: Json = { ...structuredClone(rawEvidence), ...(eOver.set ?? {}) };
    if (eOver.set?.passage && e.passageType === 'quote')
      throw new Error('A changed quotation: ' + key);
    if (eOver.quoteFix) {
      // Typography only (cross-family check): the words must not change.
      const norm = (s: string) =>
        s
          .replace(/[‘’'“”"–—-]/g, '')
          .replace(/\s+/g, ' ')
          .trim();
      if (norm(eOver.quoteFix) !== norm(e.passage))
        throw new Error('A quotation fix that changes words: ' + key);
      e.passage = eOver.quoteFix;
    }
    const eid = `evidence-${id}-${evidenceIds.length + 1}`;
    const text =
      e.passageType === 'quote'
        ? quoteNote(key, rawEvidence)
        : `The paraphrase is Selekoa’s, written from the text retrieved for the candidate pack on ${packChecked}; it is not a quotation and was not machine-matched.`;
    const note = [
      `Candidate pack passage, AI in biology (${dir}).`,
      text,
      e.translation ? translated(e.translation) : '',
      eOver.note ?? e.note ?? '',
      checkSentence(raw.id),
      'No human editorial review.',
    ]
      .filter(Boolean)
      .join(' ');
    addOnce('evidence', evidenceRow(id, eid, e, note, packChecked));
    evidenceIds.push(eid);
  });
  addNewEvidence(id, evidenceIds);
  if (!evidenceIds.length) throw new Error('A record without evidence: ' + id);

  addOnce('claims', {
    id,
    subject: c.subject,
    predicate: c.predicate,
    object: c.object,
    topic: topicOf(c, over),
    statement,
    time,
    derivation: c.derivation,
    resolution: c.resolution,
    ...(c.inferenceRationale
      ? { inferenceRationale: noIds(prose(c.inferenceRationale), id) }
      : {}),
    editorialState: 'seed',
    qualification,
    evidenceIds,
    recordedAt: date,
    ...(Object.keys(attributes).length ? { attributes } : {}),
  });
}

function addNewEvidence(claimId: string, evidenceIds: string[]) {
  for (const n of (map.newEvidence as Json[]).filter(
    (n) => n.claimId === claimId,
  )) {
    const x = extraSources.get(n.source);
    const fresh = x?.retrieval;
    if (n.passageType === 'quote' && !fresh?.matched?.includes(n.id))
      throw new Error('Added quotation not matched in a retrieval: ' + n.id);
    const note = [
      `Added at the admission of the AI in biology pack (${dir}).`,
      n.reason,
      n.passageType === 'quote'
        ? `The quotation (${quoteWords(n.passage)} words) matched a direct retrieval of ${fresh.date} (SHA-256 ${fresh.sha256}). Matching ignored differences of whitespace, case, quotation marks and dashes.`
        : '',
      'No human editorial review.',
    ]
      .filter(Boolean)
      .join(' ');
    const rowId = `evidence-${claimId}-${evidenceIds.length + 1}`;
    addOnce(
      'evidence',
      evidenceRow(claimId, rowId, n, note, n.checkedAt ?? fresh?.date ?? date),
    );
    evidenceIds.push(rowId);
  }
}

for (const id of included) {
  const raw = packClaim(id);
  if (!raw) throw new Error('Not a pack record: ' + id);
  buildClaim(raw, map.claims[id] ?? {});
}
for (const n of newClaimsOfPart)
  buildClaim(
    { ...n, evidence: n.evidence ?? [], group: n.group ?? 'new' },
    { id: n.id, topic: n.topic },
  );
for (const id of Object.keys(map.claims))
  if (
    !Object.values(map.parts).some((p) =>
      ((p as Json).include as string[]).includes(id),
    )
  )
    throw new Error('A map entry for a record in no part: ' + id);
for (const id of Object.keys(hold))
  if (!(plan.include as string[]).includes(id))
    throw new Error('A held record outside the part: ' + id);

// --------------------------------------------------- edits to stored rows
// A stored source quoted for the first time records its length (schema 2.8)
// and the practice its reuse note describes.
for (const [id, edit] of Object.entries(
  (plan.storedSourceEdits ?? {}) as Record<string, Json>,
))
  changeRow('sources', id, (row) => {
    for (const [k, v] of Object.entries(edit))
      if (k === 'reuseNote') (row.reuse as Json).note = v;
      else row[k] = v;
  });

// ---------------------------------------------------------------- entities
const referenced = new Set<string>();
for (const c of added.claims) {
  referenced.add(c.subject as string);
  if ((c.object as Json).kind === 'entity')
    referenced.add((c.object as Json).entityId);
}
for (const e of added.claims)
  for (const id of ((e.attributes as Json)?.statedReason
    ? [(e.attributes as Json).statedReason.by]
    : []) as string[])
    referenced.add(id);

/** The sources of the admitted evidence of the records naming an entity. */
function sourcesNaming(id: string): string[] {
  const keys = new Set<string>();
  for (const c of added.claims) {
    if (c.subject !== id && (c.object as Json).entityId !== id) continue;
    for (const eid of c.evidenceIds as string[]) {
      const e = added.evidence.find((x) => x.id === eid);
      if (e) keys.add(e.sourceId as string);
    }
  }
  return [...keys].sort().slice(0, 3);
}

const subtypeOf = (type: string, subtype: string): string =>
  map.subtypes[`${type}:${subtype}`] ?? subtype;
const docDates = (d: Json): Json => d.dates ?? {};
/** A document's own date, at the precision it gives, by kind of date. */
function documentDate(d: Json): string | null {
  const x = docDates(d);
  return (
    x.publishedAt ??
    x.postedAt ??
    x.announcedAt ??
    x.releasedAt ??
    x.issueAt ??
    null
  );
}

for (const id of [...referenced].sort()) {
  if (existing('entities', id)) continue;
  const over: Json = map.entities[id] ?? {};
  const doc = packDocuments.get(id);
  const ent = packEntities.get(id);
  const fresh = (map.newEntities as Json[]).find((n) => n.id === id);
  if (doc && !doc.existingEntity) {
    const description =
      over.description ??
      [doc.label, doc.dateNote]
        .filter(Boolean)
        .join('. ')
        .replace(/\.\./g, '.');
    addOnce('entities', {
      id,
      name: over.name ?? doc.title,
      type: 'document',
      subtype: subtypeOf('document', over.subtype ?? doc.subtype),
      aliases: over.aliases ?? [],
      description: noIds(prose(description), id),
      sourceIds: [], // filled below, from the sources admitted for it
    });
  } else if (ent) {
    const proposition = ent.proposition
      ? {
          code: ent.proposition.code,
          criterion: over.criterion ?? ent.proposition.criterion,
          terms: ent.proposition.terms,
          ...(over.withheld ? { withheld: over.withheld } : {}),
        }
      : undefined;
    addOnce('entities', {
      id,
      name: over.name ?? ent.name,
      ...(over.shortName ? { shortName: over.shortName } : {}),
      ...(ent.type === 'person'
        ? { sortName: over.sortName ?? sortNameOf(ent.name) }
        : {}),
      type: over.type ?? ent.type,
      subtype: subtypeOf(over.type ?? ent.type, over.subtype ?? ent.subtype),
      aliases: over.aliases ?? [],
      description: noIds(
        prose(
          over.description ??
            (ent.proposition
              ? 'The record of a text’s stance on it is never evidence that it is true.'
              : ent.note),
        ),
        id,
      ),
      sourceIds: over.sources
        ? (over.sources as string[]).map(sourceId)
        : sourcesNaming(id),
      ...(proposition ? { proposition } : {}),
    });
    for (const k of (over.sources ?? []) as string[])
      usedSources.add(keptKey(k));
  } else if (fresh) {
    addOnce('entities', {
      id,
      name: fresh.name,
      type: fresh.type,
      subtype: fresh.subtype,
      aliases: fresh.aliases ?? [],
      description: fresh.description,
      sourceIds: [],
    });
  } else throw new Error('Entity without a row: ' + id);
}
function sortNameOf(name: string) {
  const plain = name.replace(/\s*\/.*$/, '').trim();
  const parts = plain.split(/\s+/);
  const family = parts.pop()!;
  return `${family}, ${parts.join(' ')}`;
}

// ---------------------------------------------------------------- sources
const documentOfKey = (key: string): string | undefined =>
  extraSources.get(key)?.documentId ??
  map.sources[key]?.documentId ??
  packSources.get(key)?.documentId;
const isAdmittedEntity = (id: string | undefined) =>
  Boolean(
    id && (existing('entities', id) || added.entities.some((e) => e.id === id)),
  );
const sourceKinds: Record<string, string> = map.sourceKindMap;

for (const key of [...packSources.keys(), ...extraSources.keys()].filter((k) =>
  usedSources.has(k),
)) {
  const id = sourceId(key);
  if (existing('sources', id) || added.sources.some((s) => s.id === id))
    continue;
  const x = extraSources.get(key);
  const s: Json = x ?? packSources.get(key)!;
  const p: Json = { ...(map.sources[key] ?? {}), ...(x ?? {}) };
  const docId = documentOfKey(key);
  const doc = docId ? packDocuments.get(docId) : undefined;
  const title: string = p.title ?? s.title;
  const publisher: string = p.publisher ?? s.publisher;
  // A credited list that the retrieved expression abbreviates keeps the
  // names it gives, without "et al.", and its version says so.
  const listed: string[] =
    p.authors ??
    (doc?.authorsAsPrinted?.length ? doc.authorsAsPrinted : [publisher]);
  const authors = listed.filter((a) => !/\bet al\b/.test(a));
  const partial =
    authors.length < listed.length
      ? 'The author list is partial: it gives the authors the retrieved expression names and leaves out those it abbreviates.'
      : '';
  const publicationDate: string | null =
    'publicationDate' in p ? p.publicationDate : doc ? documentDate(doc) : null;
  const version = x
    ? [x.version as string, partial].filter(Boolean).join(' ')
    : [
        `Retrieved for the candidate pack on ${s.retrievedAt} (SHA-256 ${s.sha256}).`,
        s.version.replace(/\.?$/, '.'),
        p.versionNote ?? '',
        ['webpage', 'press release', 'news article'].includes(s.kind)
          ? 'Its wording can change; earlier wording is not authenticated.'
          : '',
        partial,
      ]
        .filter(Boolean)
        .join(' ');
  const documentId = isAdmittedEntity(docId) ? docId : undefined;
  const publisherId =
    p.publisherId ??
    (isAdmittedEntity(doc?.publisherId) ? doc!.publisherId : undefined);
  const documentWords = x
    ? x.documentWords
    : s.documentWords
      ? {
          count: s.documentWords.count,
          basis: `${s.documentWords.basis.replace(/\.$/, '')}; counted for the candidate pack`,
        }
      : undefined;
  addOnce('sources', {
    id,
    ...(documentId ? { documentId } : {}),
    title,
    authors,
    publisher,
    ...(publisherId ? { publisherId } : {}),
    publicationDate,
    version: noIds(prose(version), id),
    canonicalUrl: p.canonicalUrl ?? p.url ?? s.url,
    evidenceUrl: p.evidenceUrl ?? p.url ?? s.url,
    language:
      (p.language ?? s.language) === 'zh'
        ? 'zh-Hans'
        : (p.language ?? s.language),
    ...(p.archivedUrl
      ? { archivedUrl: p.archivedUrl, archivedAt: p.archivedAt }
      : {}),
    ...(documentWords ? { documentWords } : {}),
    kind: p.kind ?? sourceKinds[s.kind],
    accessedAt: x ? x.accessedAt : s.retrievedAt,
    reuse: {
      attribution: `${authors.join(', ')}, “${title}”${publicationDate ? `, ${publicationDate}` : ''}.`,
      licence: 'No open redistribution licence asserted',
      note: 'Bibliographic metadata, editorial paraphrases and short attributed quotations (at most 50 words each). Recheck terms before wider redistribution.',
    },
  });
}
// Each admitted document and entity names the sources admitted for it.
for (const e of added.entities) {
  if ((e.sourceIds as string[]).length) continue;
  e.sourceIds = added.sources
    .filter((s) => s.documentId === e.id)
    .map((s) => s.id)
    .concat(base.sources.filter((s) => s.documentId === e.id).map((s) => s.id));
  if (!(e.sourceIds as string[]).length) e.sourceIds = sourcesNaming(e.id);
  if (!(e.sourceIds as string[]).length)
    throw new Error('An entity without a source: ' + e.id);
}

if (textProblems.length) throw new Error(textProblems.join('\n'));

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
    .reduce((n, p) => n + quoteWords(p), 0);
  if (!length || total > maxQuotedWords(length))
    overLimit.push(
      `${id}: ${total} quoted words, limit ${length ? maxQuotedWords(length) : '?'}`,
    );
}
if (overLimit.length)
  throw new Error('Over the quotation limit:\n' + overLimit.join('\n'));
const leftRaw = JSON.stringify([...added.claims, ...added.entities]).match(
  /@[a-z0-9.-]+\.[a-z]{2,}|\/(?:home|Users|tmp)\//i,
);
if (leftRaw) throw new Error('An address or local path in the records');

// ---------------------------------------------------------------- output
// "HEAD" takes the commit the part is written on; a check keeps the commit
// its stored snapshot names, so committing the part does not change it.
const baseCommit: string =
  plan.baseCommit !== 'HEAD'
    ? plan.baseCommit
    : check && snapshot
      ? snapshot.baseCommit
      : execFileSync('git', ['rev-parse', '--short', 'HEAD'], {
          encoding: 'utf8',
        }).trim();
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
    `Part ${part}: added ${names.map((n) => `${added[n].length} ${n}`).join(', ')}; changed ${names.map((n) => `${changed[n].size} ${n}`).join(', ')}.`,
  );
}
