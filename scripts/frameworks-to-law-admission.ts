// Admits the frameworks-to-law candidate pack (research/frameworks-to-law)
// into the dataset, in two parts, using the authored map in
// review/frameworks-to-law-admission-map-2026-10-28.json and the
// maintainer's decisions of 2026-10-28
// (review/frameworks-to-law-admission-{1,2}-2026-10-28.md).
//
//   pnpm tsx scripts/frameworks-to-law-admission.ts --part 1           write part 1
//   pnpm tsx scripts/frameworks-to-law-admission.ts --part 1 --check   compare with the stored records
//
// A part is idempotent: it first removes the rows its before-snapshot lists
// as added and restores the rows it changed, then rebuilds them. The pack is
// never changed. Every admitted quotation matched the pack's own retrieval
// (verification.json) and a fresh retrieval at admission
// (admission-verification-2026-10-28.json), or the map says why not.
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { maxQuotedWords } from '../src/domain/schema';

const dir = 'research/frameworks-to-law';
const names = ['entities', 'claims', 'sources', 'evidence'] as const;
type Name = (typeof names)[number];
type Row = Record<string, unknown> & { id: string };
type Json = Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any

const read = (path: string) => JSON.parse(readFileSync(path, 'utf8'));
const args = process.argv.slice(2);
const part = args[args.indexOf('--part') + 1];
const check = args.includes('--check');
const map: Json = read(
  'review/frameworks-to-law-admission-map-2026-10-28.json',
);
const plan: Json = map.parts[part];
if (!plan) throw new Error('Usage: --part 1|2 [--check]');
const date: string = plan.date;
const files = {
  pack: `${dir}/pack.json`,
  verification: `${dir}/verification.json`,
  admission: `${dir}/admission-verification-2026-10-28.json`,
  check: `${dir}/cross-family-check-2026-10-28.json`,
  snapshot: `review/frameworks-to-law-${part}-before-2026-10-28.json`,
};
const pack: Json = read(files.pack);
const verification: Json = read(files.verification);
const admission: Json = read(files.admission);
const crossCheck: Json = read(files.check).items;

// The cross-family check, by record ID (its printed numbers repeat).
const checkOf = new Map<string, Json>(
  Object.values(crossCheck).map((item: Json) => [item.record_id, item]),
);

// ---------------------------------------------------------------- base data
const stored = {
  meta: read('data/meta.json'),
  ...Object.fromEntries(names.map((n) => [n, read(`data/${n}.json`)])),
} as { meta: Json } & Record<Name, Row[]>;
const snapshot: Json | null = existsSync(files.snapshot)
  ? read(files.snapshot)
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

// ---------------------------------------------------------------- helpers
const words = (s: string) => s.trim().split(/\s+/).length;
// The pack's stricter count: each CJK character is one word.
const cjk = /[぀-ヿ㐀-鿿豈-﫿]/g;
const packWords = (s: string) =>
  (s.match(cjk) ?? []).length +
  s
    .replace(cjk, ' ')
    .split(/\s+/)
    .filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
const hasCjk = (s: string) => /[㐀-鿿]/.test(s);
const machine = (text: string) =>
  `English machine translation, not verified by a person: “${text}”.`;

const packSources = new Map<string, Json>(
  pack.sources.map((s: Json) => [s.key, s]),
);
const sourcePlan = (key: string): Json => map.sources[key] ?? {};
/** The dataset ID a pack source becomes. */
const sourceId = (key: string): string => {
  const s = packSources.get(key);
  if (!s) throw new Error('Unknown pack source: ' + key);
  const p = sourcePlan(key);
  const id = p.datasetSource ?? p.id ?? s.datasetSource;
  if (!id) throw new Error('No dataset ID for pack source: ' + key);
  return id;
};

// Reader-facing text never names a record ID.
const knownIds = new Set<string>([
  ...pack.claims.map((c: Json) => c.id),
  ...pack.entities.map((e: Json) => e.id),
  ...pack.documents.map((d: Json) => d.id),
  ...pack.sources.map((s: Json) => s.key),
  ...names.flatMap((n) => base[n].map((r) => r.id)),
]);
const idPattern = /\b[a-z0-9]+(?:-[a-z0-9]+)+(?:-\*)?/g;
function noIds(text: string, where: string) {
  const left = (text.match(idPattern) ?? []).filter(
    (w) => knownIds.has(w) || w.endsWith('-*'),
  );
  if (left.length) throw new Error(`Record ID left in ${where}: ${left}`);
  return text;
}
// Editorial prose says "initial", never "first"; quotations keep the source's
// wording (cross-family check, editorial word review).
// A pack pointer to a dataset record becomes "recorded separately".
const prose = (text: string) =>
  text
    .replace(
      /\bdataset records? [a-z0-9]+(?:-[a-z0-9]+)+(?:(?:,| and) [a-z0-9]+(?:-[a-z0-9]+)+)*/g,
      'recorded separately',
    )
    .replace(
      /\bdataset claims? [a-z0-9]+(?:-[a-z0-9]+)+/g,
      'recorded separately',
    )
    .replace(/\((?:see )?(?:fl|cm|sb)-[a-z0-9-]+\)/g, '(recorded separately)')
    .replace(/\bsee (?:fl|cm|sb)-[a-z0-9-]+/g, 'recorded separately')
    .replace(/\bfirst draft\b/g, 'initial draft')
    .replace(/\bFirst draft\b/g, 'Initial draft')
    .replace(/\bfirst paragraph\b/g, 'opening paragraph')
    .replace(/\bFirst paragraph\b/g, 'Opening paragraph')
    .replace(/\bfirst (round|responses|milestone)\b/g, (_, w) =>
      w === 'round' ? 'opening round' : `initial ${w}`,
    );
const loaded =
  /\b(poach(ed|ing)?|ousted?|defect(ed|ion)?|exodus|rivals?|betray\w*|purge\w*|landmark|pioneer\w*)\b/i;

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
const change = (n: Name, id: string): Json => {
  const row = existing(n, id);
  if (!row) throw new Error(`Existing ${n} row not found: ${id}`);
  if (!changed[n].has(id)) changed[n].set(id, structuredClone(row));
  return row;
};
const used = new Set<string>();
for (const key of ['claims', 'evidence'])
  for (const id of Object.keys(map[key] ?? {})) used.add(`${key}:${id}`);
const take = (key: string, id: string): Json | undefined => {
  used.delete(`${key}:${id}`);
  return map[key]?.[id];
};

const groups = new Set<string>(plan.groups);
const hold: Record<string, string> = plan.hold ?? {};
const merge: Record<string, string> = plan.merge ?? {};
const fold: Record<string, Json> = plan.fold ?? {};
const split: Record<string, string[]> = plan.split ?? {};
const adopted = new Set<string>(plan.adoptedPredicates ?? []);
const included = new Set<string>(plan.include ?? []);
const claimsInPart = (pack.claims as Json[]).filter(
  (c) => groups.has(c.group) || included.has(c.id),
);
for (const id of [
  ...Object.keys(hold),
  ...Object.keys(merge),
  ...Object.keys(fold),
  ...Object.keys(split),
])
  if (!claimsInPart.some((c) => c.id === id))
    throw new Error(
      'Held, merged, folded or split record outside this part: ' + id,
    );
// Map entries for records of the other part, or held here, are not this
// part's to use.
const splitIds = new Set(Object.values(split).flat());
const ours = (id: string) =>
  splitIds.has(id) || (claimsInPart.some((c) => c.id === id) && !hold[id]);
for (const id of Object.keys(map.claims))
  if (!ours(id)) used.delete(`claims:${id}`);
for (const key of Object.keys(map.evidence))
  if (!ours(key.split(':')[0])) used.delete(`evidence:${key}`);

/** How a quotation was matched, for its evidence note. */
function matched(c: Json, index: number, e: Json) {
  const packCheck = (verification.quotes as Json[]).find(
    (q) => q.claim === c.id && q.evidence === index + 1,
  );
  if (!packCheck?.found)
    throw new Error(`Quotation not matched by the pack: ${c.id}#${index}`);
  const fresh = admission.quotes[`${c.id}:${index}`];
  if (!fresh?.found)
    throw new Error(`Quotation not matched at admission: ${c.id}#${index}`);
  const retrieval = admission.sources[fresh.source];
  const same = retrieval.sha256 === packSources.get(e.source)?.sha256;
  return `matched the text retrieved for the candidate pack on 2026-10-27 and again at admission on ${admission.checkedAt}, in a fresh retrieval ${
    same
      ? 'whose SHA-256 equals the pack’s'
      : fresh.source === e.source
        ? 'of the same address (the page’s bytes had changed)'
        : `of ${retrieval.label} (SHA-256 ${retrieval.sha256})`
  }`;
}

function checkSentence(c: Json) {
  const item = checkOf.get(c.id);
  if (!item) return '';
  if (item.part === 'A') {
    const status = item.comparison.status;
    return `A cross-family machine check (2026-10-28, item ${item.number}) answered the record’s question blind from fresh retrievals and ${status === 'agree' ? 'agreed with the record' : 'agreed in part; its corrections were applied at admission'}.`;
  }
  return `A cross-family machine check (2026-10-28, item ${item.number}) re-read the record’s sources and found ${item.support === 'full' ? 'full support' : 'partial support; its corrections were applied at admission'}.`;
}

function evidenceNote(c: Json, index: number, e: Json, extra: Json = {}) {
  const s = packSources.get(e.source)!;
  const p = sourcePlan(e.source);
  const route = p.route ?? `directly from ${s.url.split('/')[2]}`;
  const text =
    e.passageType === 'quote'
      ? `The quotation (${packWords(e.passage)} words${hasCjk(e.passage) ? ', each CJK character counted as one' : ''}) ${matched(c, index, e)}. Read ${route}. Matching ignored differences of whitespace, case, quotation marks, dashes and Unicode compatibility forms, so the source’s typography can differ.`
      : (p.paraphraseNote ??
        `The paraphrase is Selekoa’s, written from the text retrieved on 2026-10-27 and read ${route}; it is not a quotation and was not machine-matched.`);
  return [
    `Candidate pack passage, frameworks to law (${dir}).`,
    text,
    extra.note ?? e.note ?? '',
    e.translation ? machine(e.translation) : '',
    hasCjk(e.passage) && !e.translation && e.passageType === 'quote'
      ? 'No English rendering is given; no human translation review.'
      : '',
    checkSentence(c),
    'No human editorial review.',
  ]
    .filter(Boolean)
    .join(' ');
}

// Quotations per dataset source, for the limit check below.
const quoted = new Map<string, Set<string>>();
const quote = (source: string, passage: string) => {
  if (packWords(passage) > 50 || words(passage) > 50)
    throw new Error('Quote over 50 words: ' + passage);
  quoted.set(source, (quoted.get(source) ?? new Set()).add(passage));
};
const usedSources = new Set<string>();

function evidenceRow(c: Json, id: string, e: Json, note: string): Row {
  usedSources.add(e.source);
  const sid = sourceId(e.source);
  if (e.passageType === 'quote') quote(sid, e.passage);
  return {
    id,
    claimId: c.id,
    sourceId: sid,
    sourceRole: e.sourceRole,
    support: e.support,
    locator: e.locator,
    passage: noIds(
      e.passageType === 'quote' ? e.passage : prose(e.passage),
      id,
    ),
    passageType: e.passageType,
    verification: 'machine_checked',
    checkedAt: date,
    note: noIds(note, id),
    retrievalRoute: 'direct',
  };
}

const basisMap: Record<string, Record<string, string | null>> = map.basisMap;
const docOf = (docId: string): Json | undefined =>
  map.documents[docId] ?? existing('entities', docId);
const publisherOf = (docId: string) =>
  (docOf(docId)?.documentVersion?.publisherId ?? docOf(docId)?.publisherId) as
    string | undefined;
const bases = [
  'publication',
  'effective',
  'revision',
  'announcement',
  'signature',
];

/** The map's corrections to one pack evidence item, applied in place. */
function correctEvidence(raw: Json, index: number, e: Json, id: string): Json {
  const eOver: Json = { ...(take('evidence', `${raw.id}:${index}`) ?? {}) };
  for (const key of ['locator', 'support']) if (eOver[key]) e[key] = eOver[key];
  if (eOver.passage) {
    if (e.passageType === 'quote')
      throw new Error('A changed quotation: ' + id);
    e.passage = eOver.passage;
  }
  // A quotation corrected to the source's wording, matched at admission.
  if (eOver.correctQuote) {
    if (!admission.extra[`${raw.id}:${index}`]?.found)
      throw new Error('A corrected quotation not matched: ' + id);
    e.passage = eOver.correctQuote;
  }
  // A quotation given by paraphrase, to keep within a short text's limit.
  if (eOver.toParaphrase) {
    e.passage = eOver.toParaphrase;
    e.passageType = 'paraphrase';
  }
  // A quotation shortened to a part of the matched passage.
  if (eOver.shorten) {
    if (!e.passage.includes(eOver.shorten))
      throw new Error('A shortened quotation must come from the pack: ' + id);
    e.passage = eOver.shorten;
    e.translation = eOver.translation;
    eOver.note = [
      eOver.note,
      eOver.shortenNote ??
        'Shortened at admission to keep the quotation within 50 words, each CJK character counted as one; the shortened wording is part of the matched passage.',
    ]
      .filter(Boolean)
      .join(' ');
  }
  return eOver;
}

/** Builds one admitted claim from a pack record and its map entry. */
function buildClaim(raw: Json, id: string, over: Json) {
  const c: Json = structuredClone(raw);
  for (const key of [
    'subject',
    'predicate',
    'object',
    'statement',
    'qualification',
    'time',
    'derivation',
    'inferenceRationale',
    'resolution',
    'attributes',
  ])
    if (over[key] !== undefined)
      c[key] =
        key === 'time' || (key === 'attributes' && !over.replaceAttributes)
          ? { ...c[key], ...over[key] }
          : over[key];
  if (over.replaceAttributes && over.attributes === undefined)
    c.attributes = {};
  if (c.proposedPredicate && !over.predicate && !adopted.has(c.predicate))
    throw new Error('A proposed predicate without a decision: ' + id);
  for (const k of over.dropAttributes ?? []) delete c.attributes.provision[k];

  // A statement of a document that is not a provision is recorded as what
  // the document states, made by its publisher.
  if (over.published) {
    const publisher = publisherOf(c.subject);
    if (c.predicate !== 'states_provision' || !publisher)
      throw new Error('Cannot record as published: ' + id);
    c.object = { kind: 'entity', entityId: c.subject };
    c.subject = publisher;
    c.predicate = 'published';
    delete c.attributes.provision;
  }
  const provision = c.attributes?.provision;
  if (provision) {
    provision.kind = over.kind ?? map.kindMap[provision.kind] ?? provision.kind;
    if (plan.normaliseProvisions) provision.key ??= id.replace(/^fl-/, '');
  } else if (over.kind) throw new Error('A kind for a non-provision: ' + id);

  // Date bases the schema does not have.
  const time: Json = { kind: c.time.kind };
  for (const key of ['date', 'from', 'until', 'basis', 'note'])
    if (c.time[key] !== undefined && c.time[key] !== null)
      time[key] = c.time[key];
  for (const [prefix, mapped] of Object.entries(basisMap))
    if (id.startsWith(prefix) && time.basis in mapped) {
      if (mapped[time.basis]) time.basis = mapped[time.basis];
      else delete time.basis;
    }
  if (plan.normaliseProvisions && time.basis && !bases.includes(time.basis))
    delete time.basis;
  // Only a list is a dated snapshot; other records are events of their text.
  if (
    plan.normaliseProvisions &&
    time.kind === 'snapshot' &&
    c.predicate !== 'lists_participants'
  ) {
    time.kind = 'event';
    time.basis ??= 'publication';
  }
  // A provision is dated by one of its edition's own dates (decision of
  // part 2: the pack dated some provisions by signature or as snapshots).
  if (
    plan.normaliseProvisions &&
    provision &&
    !provision.computed &&
    over.time === undefined
  ) {
    const version: Json = docOf(c.subject)?.documentVersion;
    if (!version) throw new Error('A provision without an edition: ' + id);
    const dates = [version.publishedAt, version.effectiveAt].filter(Boolean);
    const keep =
      time.kind === 'event' &&
      dates.includes(time.date) &&
      ['publication', 'effective', 'revision', 'signature'].includes(
        time.basis,
      );
    if (!keep) {
      const date = dates.includes(time.date) ? time.date : version.publishedAt;
      const basis =
        date === version.effectiveAt && date !== version.publishedAt
          ? 'effective'
          : 'publication';
      time.kind = 'event';
      time.basis = basis;
      if (time.date !== date || !time.note)
        time.note = `Provision as the edition states it, dated by its ${basis === 'effective' ? 'effective date' : 'date of publication'}, ${date}. ${version.dateNote}`;
      time.date = date;
    }
  }
  if (time.kind === 'snapshot') delete time.basis;
  if (!time.note && plan.normaliseProvisions)
    time.note =
      {
        publication: 'Date of publication, as the source gives it.',
        announcement: 'Date of the announcement, as the source gives it.',
        signature: 'Date of signature, as the source gives it.',
        effective: 'Date of effect, as the source gives it.',
        revision: 'Date of the revision, as the source gives it.',
      }[time.basis as string] ?? 'Date as the source gives it.';
  if (!time.note) throw new Error('A time without a note: ' + id);
  time.note = noIds(prose(time.note), id);

  const statement = noIds(prose(c.statement), id);
  const qualification = noIds(prose(c.qualification), id);
  if (loaded.test(statement) || loaded.test(qualification))
    throw new Error('Loaded wording: ' + id);

  // Evidence, in pack order, with the map's corrections.
  const evidenceIds: string[] = [];
  const target = { ...c, id };
  (c.evidence as Json[]).forEach((rawEvidence, index) => {
    const e: Json = structuredClone(rawEvidence);
    const eOver = correctEvidence(raw, index, e, id);
    const eid = `evidence-${id}-${index + 1}`;
    const row = evidenceRow(target, eid, e, evidenceNote(raw, index, e, eOver));
    addOnce('evidence', row);
    evidenceIds.push(eid);
  });
  for (const n of (map.newEvidence as Json[]).filter((n) => n.claimId === id)) {
    if (n.passageType === 'quote' && !admission.extra[n.id]?.found)
      throw new Error('Added quotation not matched at admission: ' + n.id);
    if (n.passageType === 'quote') quote(n.sourceId, n.passage);
    if (n.packSource) usedSources.add(n.packSource);
    addOnce('evidence', {
      id: n.id,
      claimId: id,
      sourceId: n.sourceId,
      sourceRole: n.sourceRole,
      support: n.support,
      locator: n.locator,
      passage: n.passage,
      passageType: n.passageType,
      verification: 'machine_checked',
      checkedAt: date,
      note: noIds(
        [
          `Added at the admission of the frameworks-to-law pack (${dir}).`,
          n.reason,
          n.translation ? machine(n.translation) : '',
          n.passageType === 'paraphrase'
            ? 'The paraphrase is Selekoa’s; it is not a quotation.'
            : '',
          'No human editorial review.',
        ]
          .filter(Boolean)
          .join(' '),
        n.id,
      ),
      retrievalRoute: 'direct',
    });
    evidenceIds.push(n.id);
  }

  const attributes: Json = { ...(c.attributes ?? {}) };
  addOnce('claims', {
    id,
    subject: c.subject,
    predicate: c.predicate,
    object: c.object,
    topic: 'governance',
    statement,
    time,
    derivation: c.derivation,
    resolution: c.resolution,
    ...(c.derivation === 'inferred' && c.inferenceRationale
      ? { inferenceRationale: noIds(prose(c.inferenceRationale), id) }
      : {}),
    editorialState: 'seed',
    qualification,
    evidenceIds,
    recordedAt: date,
    ...(Object.keys(attributes).length ? { attributes } : {}),
  });
}

for (const raw of claimsInPart) {
  if (hold[raw.id] || merge[raw.id] || fold[raw.id]) continue;
  if (split[raw.id]) {
    take('claims', raw.id);
    for (const id of split[raw.id]) {
      const over: Json = take('claims', id) ?? {};
      if (over.from !== raw.id)
        throw new Error('Split from another record: ' + id);
      buildClaim(raw, id, over);
    }
    continue;
  }
  buildClaim(raw, raw.id, take('claims', raw.id) ?? {});
}
// A record folded into others: its evidence joins theirs (decision 2 adds
// no predicate for it).
for (const [packId, f] of Object.entries(fold)) {
  const raw: Json = claimsInPart.find((x) => x.id === packId)!;
  take('claims', packId);
  // Its sources stay recorded, for the dated names that cite them.
  if (!(f.into as string[]).length)
    for (const e of raw.evidence as Json[]) usedSources.add(e.source);
  for (const into of f.into as string[]) {
    const target = added.claims.find((c) => c.id === into);
    if (!target) throw new Error('Fold into a record not admitted: ' + into);
    (raw.evidence as Json[]).forEach((rawEvidence, index) => {
      const e: Json = structuredClone(rawEvidence);
      const eOver = correctEvidence(raw, index, e, into);
      // Only the items read in the target's own expression, if so asked.
      if (
        f.bySubject &&
        ('documentId' in sourcePlan(e.source)
          ? sourcePlan(e.source).documentId
          : packSources.get(e.source)?.documentId) !== target.subject
      )
        return;
      const eid = `evidence-${into}-${(target.evidenceIds as string[]).length + 1}`;
      const row = evidenceRow(
        { ...raw, id: into },
        eid,
        e,
        evidenceNote(raw, index, e, {
          note: [
            eOver.note ?? e.note,
            `Admitted as evidence of this record: ${f.why}`,
          ]
            .filter(Boolean)
            .join(' '),
        }),
      );
      addOnce('evidence', row);
      (target.evidenceIds as string[]).push(eid);
    });
  }
}

// Provision-level links become a further evidence item on the existing link
// record (decision 7).
for (const [packId, into] of Object.entries(merge)) {
  const c: Json = claimsInPart.find((x) => x.id === packId)!;
  const m: Json = map.mergedEvidence[packId];
  if (m.into !== into) throw new Error('Merge target differs: ' + packId);
  const target = change('claims', into);
  if (
    target.subject !== c.subject ||
    (target.object as Json).entityId !== c.object.entityId
  )
    throw new Error('Merged into a link of another edition or text: ' + packId);
  if (c.evidence.length !== 1) throw new Error('One item to merge: ' + packId);
  const e: Json = { ...c.evidence[0] };
  if (m.passage) {
    e.passage = m.passage;
    e.passageType = 'paraphrase';
    e.note = m.note;
  }
  const row = evidenceRow(
    { ...c, id: into, origin: packId },
    m.id,
    e,
    evidenceNote(c, 0, e).replace(
      'Candidate pack passage, frameworks to law',
      'Candidate pack passage (a provision-level link, admitted as a further evidence item under decision 7 of 2026-10-28), frameworks to law',
    ),
  );
  addOnce('evidence', row);
  target.statement = m.statement;
  target.qualification = `${target.qualification} ${m.qualificationAppend}`;
  target.time = { ...(target.time as Json), note: m.timeNote };
  target.evidenceIds = [...(target.evidenceIds as string[]), m.id];
}

const left = [...used];
if (left.length) throw new Error('Unused map entries: ' + left.join(', '));

// ---------------------------------------------------------------- entities
const referenced = (id: string) =>
  added.claims.some(
    (c) => c.subject === id || (c.object as Json).entityId === id,
  );
for (const [id, d] of Object.entries(map.documents as Record<string, Json>)) {
  if (!referenced(id)) continue;
  addOnce('entities', {
    id,
    name: d.name,
    ...(d.shortName ? { shortName: d.shortName } : {}),
    type: 'document',
    subtype: d.subtype,
    aliases: d.aliases ?? [],
    description: noIds(d.description, id),
    sourceIds: d.sourceIds,
    ...(d.documentVersion ? { documentVersion: d.documentVersion } : {}),
  });
}
// Publishers of the added documents and sources are needed too.
const publishers = new Set<string>([
  ...added.entities.map((e) => (e.documentVersion as Json)?.publisherId),
  ...[...usedSources].map((k) => sourcePlan(k).publisherId),
  ...((map.extraSources ?? []) as Json[])
    .filter((x) => added.evidence.some((e) => e.sourceId === x.id))
    .map((x) => x.publisherId),
]);
for (const [id, d] of Object.entries(map.entities as Record<string, Json>)) {
  if (!referenced(id) && !publishers.has(id) && d.keep !== part) continue;
  if (existing('entities', id)) continue;
  addOnce('entities', {
    id,
    name: d.name,
    ...(d.shortName ? { shortName: d.shortName } : {}),
    type: d.type,
    subtype: d.subtype,
    aliases: d.aliases ?? [],
    ...(d.countryCode ? { countryCode: d.countryCode } : {}),
    description: noIds(d.description, id),
    sourceIds: d.sourceIds,
    ...(d.datedNames ? { datedNames: d.datedNames } : {}),
  });
}
// Dated names on an existing entity (decision 2: a renaming keeps one
// entity).
for (const [id, d] of Object.entries(
  (plan.changedEntities ? map.changedEntities : {}) as Record<string, Json>,
)) {
  const row = change('entities', id);
  row.datedNames = d.datedNames;
  row.sourceIds = [
    ...new Set([...(row.sourceIds as string[]), ...(d.addSourceIds ?? [])]),
  ];
}
for (const c of added.claims)
  for (const id of [c.subject, (c.object as Json).entityId].filter(Boolean))
    if (
      !existing('entities', id as string) &&
      !added.entities.some((e) => e.id === id)
    )
      throw new Error(`Entity without a row: ${id} (${c.id})`);

// ---------------------------------------------------------------- sources
for (const key of [...packSources.keys()].filter((k) => usedSources.has(k))) {
  const s = packSources.get(key)!;
  const p = sourcePlan(key);
  const id = sourceId(key);
  if (
    p.datasetSource ??
    (p.id ? null : s.datasetSource) ??
    existing('sources', id)
  ) {
    const row = existing('sources', id);
    if (!row) throw new Error('Existing source not found: ' + id);
    if (row.documentId && row.documentId !== s.documentId)
      throw new Error('Another document: ' + id);
    if (p.documentId && !row.documentId)
      change('sources', id).documentId = p.documentId;
    continue;
  }
  const url: string = p.url ?? s.url;
  const title: string = p.title ?? s.title;
  const authors: string[] = p.authors ?? [s.publisher];
  const version = [
    `Retrieved on ${p.retrievedAt ?? s.retrievedAt} (SHA-256 ${p.sha256 ?? s.sha256}).`,
    p.versionNote ?? s.version,
    [
      'webpage',
      'announcement',
      'press release',
      'statement',
      'speech',
    ].includes(s.kind)
      ? 'Its wording can change; earlier wording is not authenticated.'
      : '',
    hasCjk(title) && /\(/.test(title)
      ? 'The English in parentheses in the title is a machine translation.'
      : '',
  ]
    .filter(Boolean)
    .join(' ');
  addOnce('sources', {
    id,
    ...(('documentId' in p ? p.documentId : s.documentId)
      ? { documentId: 'documentId' in p ? p.documentId : s.documentId }
      : {}),
    title,
    authors,
    publisher: p.publisher ?? s.publisher,
    ...(p.publisherId ? { publisherId: p.publisherId } : {}),
    publicationDate: p.publicationDate ?? null,
    version: noIds(version, id),
    canonicalUrl: url,
    evidenceUrl: url,
    language: s.language,
    ...(p.archivedUrl
      ? { archivedUrl: p.archivedUrl, archivedAt: p.archivedAt }
      : {}),
    documentWords: p.documentWords ?? {
      count: s.documentWords.count,
      basis: `${s.documentWords.basis.replace(/\.$/, '')}${s.language === 'en' ? '' : ' (each CJK character counted as one word)'}; counted for the candidate pack`,
    },
    kind: p.kind ?? s.kind,
    accessedAt: p.retrievedAt ?? s.retrievedAt,
    reuse: {
      attribution: `${authors.join(', ')}, “${title}”${p.publicationDate ? `, ${p.publicationDate}` : ''}.`,
      licence: 'No open redistribution licence asserted',
      note: 'Bibliographic metadata, editorial paraphrases and short attributed quotations (at most 50 words each). Recheck terms before wider redistribution.',
    },
  });
}
for (const x of (map.extraSources ?? []) as Json[]) {
  if (
    !added.evidence.some((e) => e.sourceId === x.id) &&
    !added.entities.some((e) => (e.sourceIds as string[]).includes(x.id))
  )
    continue;
  addOnce('sources', {
    id: x.id,
    title: x.title,
    authors: x.authors,
    publisher: x.publisher,
    ...(x.publisherId ? { publisherId: x.publisherId } : {}),
    publicationDate: x.publicationDate,
    version: x.version,
    canonicalUrl: x.canonicalUrl,
    evidenceUrl: x.canonicalUrl,
    language: x.language,
    ...(x.archivedUrl
      ? { archivedUrl: x.archivedUrl, archivedAt: x.archivedAt }
      : {}),
    ...(x.documentWords ? { documentWords: x.documentWords } : {}),
    kind: x.kind,
    accessedAt: x.accessedAt,
    reuse: {
      attribution: `${x.authors.join(', ')}, “${x.title}”, ${x.publicationDate}.`,
      licence: 'No open redistribution licence asserted',
      note: 'Bibliographic metadata and editorial paraphrases only. Recheck terms before wider redistribution.',
    },
  });
}
for (const e of added.entities)
  for (const s of e.sourceIds as string[])
    if (!existing('sources', s) && !added.sources.some((r) => r.id === s))
      throw new Error(`Entity source without a row: ${s} (${e.id})`);

// ---------------------------------------------------------------- limits
// Quotations per source, with the dataset's existing quotations from the
// same source and from sources whose limit it shares, each CJK character
// counted as one word.
const norm = (p: string) =>
  p
    .toLowerCase()
    .replace(/[‘’'“”"]/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
const shared: string[][] = map.sharedLimits ?? [];
const overLimit: string[] = [];
for (const id of quoted.keys()) {
  const together = shared.find((g) => g.includes(id)) ?? [id];
  const row = added.sources.find((s) => s.id === id) ?? existing('sources', id);
  const length = (row?.documentWords as Json)?.count;
  const all = new Set<string>();
  for (const s of together)
    for (const p of quoted.get(s) ?? []) all.add(norm(p));
  for (const e of base.evidence)
    if (together.includes(e.sourceId as string) && e.passageType === 'quote')
      all.add(norm(e.passage as string));
  const list = [...all];
  const total = list
    .filter((p) => !list.some((q) => q !== p && q.includes(p)))
    .reduce((n, p) => n + packWords(p), 0);
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
  baseCommit: plan.baseCommit,
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
  [files.snapshot]: newSnapshot,
};
if (check) {
  const differing = Object.entries(outputs).filter(
    ([path, value]) =>
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
  execFileSync(
    process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm',
    ['prettier', '--write', ...Object.keys(outputs)],
    { stdio: 'ignore', shell: process.platform === 'win32' },
  );
  console.log(
    `Added ${names.map((n) => `${added[n].length} ${n}`).join(', ')}; changed ${names.map((n) => `${changed[n].size} ${n}`).join(', ')}.`,
  );
}
