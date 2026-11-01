// Admits the risk-debate candidate pack (research/risk-debate) into the
// dataset, using the authored map in
// review/risk-debate-admission-map-2026-10-31.json, the maintainer's decisions
// of 2026-10-30 and the adjudication of 2026-10-31 of the cross-family check
// (both in review/risk-debate-pack-2026-10-29.md).
//
//   pnpm tsx scripts/risk-debate-admission.ts --verify   match the admission's own quotations in a fresh retrieval
//   pnpm tsx scripts/risk-debate-admission.ts            write the records and the before-snapshot
//   pnpm tsx scripts/risk-debate-admission.ts --check    compare with the stored records
//
// `--verify` reads the ignored retrieval cache that
// `node research/risk-debate/tools.mjs fetch` fills and writes
// research/risk-debate/admission-verification-2026-10-31.json; the admission
// reads that file and never the cache.
//
// The script runs on whatever base it finds: where the stored data holds every
// row its before-snapshot lists as added, it first removes those rows and
// restores the rows it changed; otherwise it treats the snapshot as foreign
// and builds on the stored data as it is. It then rebuilds the rows. A pack document or source that the base already holds (the
// same identifier, or a source with the same address or arXiv identifier) is
// reused, never duplicated, so packs admitted earlier on the chain are
// respected. No schema change is needed, so there is one part.
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { maxQuotedWords } from '../src/domain/schema';

const names = ['entities', 'claims', 'sources', 'evidence'] as const;
type Name = (typeof names)[number];
type Row = Record<string, unknown> & { id: string };
type Json = Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any

const read = (path: string) => JSON.parse(readFileSync(path, 'utf8'));
const args = process.argv.slice(2);
const check = args.includes('--check');
const map: Json = read('review/risk-debate-admission-map-2026-10-31.json');
const date: string = map.admissionDate;
const pack: Json = read(map.files.pack);
const words = (s: string) =>
  s.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;

const packSources = new Map<string, Json>(
  pack.sources.map((s: Json) => [s.key, s]),
);
const packDocuments = new Map<string, Json>(
  pack.documents.map((d: Json) => [d.id, d]),
);
const packRecords = new Map<string, Json>(
  pack.records.map((r: Json) => [r.id, r]),
);
const newSources = map.newSources as Record<string, Json>;
/** A pack document's date as admitted: the map's correction where it has one. */
const documentDates = (map.documentDates ?? {}) as Record<string, Json>;
const dateOfDocument = (id: string): string | undefined =>
  documentDates[id]?.date ?? packDocuments.get(id)?.date;

// ---------------------------------------------------------------- verify
/** The quotations the admission adds or corrects; the pack's own are in its verification. */
function admissionQuotes() {
  const out: { key: string; source: string; passage: string }[] = [];
  for (const c of map.newClaims as Json[])
    (c.evidence as Json[]).forEach((e, i) => {
      if (e.passageType === 'quote' && !e.checkOnly)
        out.push({ key: `${c.id}:${i}`, source: e.source, passage: e.passage });
    });
  for (const [key, e] of Object.entries(map.evidence as Record<string, Json>))
    if (e.quoteCorrection) {
      const [id, i] = key.split(':');
      out.push({
        key,
        source: packRecords.get(id)!.evidence[Number(i)].source,
        passage: e.set.passage,
      });
    }
  return out;
}

if (args.includes('--verify')) {
  const toolsPath = '../research/risk-debate/tools.mjs';
  const tools: Json = await import(toolsPath);
  const cache = '.local/risk-debate/doc';
  // Pack sources whose quotations the admission corrects, and their cache keys.
  const keys: Record<string, string> = {
    'ntia-2024-open-weights': 'adm-ntia-2024',
  };
  const sources: Json = {};
  const quotes: Json = {};
  for (const q of admissionQuotes()) {
    const key = keys[q.source] ?? q.source;
    const meta: Json | null = existsSync(`${cache}/${key}.json`)
      ? read(`${cache}/${key}.json`)
      : null;
    const text = meta?.httpStatus === 200 ? tools.cachedText(key) : null;
    sources[q.source] ??= meta
      ? {
          url: meta.requestedUrl ?? meta.url,
          route: meta.route ?? 'direct',
          httpStatus: meta.httpStatus,
          sha256: meta.sha256,
          retrievedAt: date,
          // The pack's counts: the PDF text layer, or the blocks of ten or
          // more words of a web page (its body without navigation).
          documentWords: text
            ? existsSync(`${cache}/${key}.txt`)
              ? tools.words(text)
              : (text as string)
                  .split(/\n+/)
                  .map((l: string) => tools.words(l) as number)
                  .filter((n: number) => n >= 10)
                  .reduce((a: number, b: number) => a + b, 0)
            : null,
          documentWordsBasis: existsSync(`${cache}/${key}.txt`)
            ? 'Whitespace-separated words in the PDF text layer'
            : 'Words in text blocks of ten or more words of the retrieved page, so navigation and footers are excluded',
        }
      : { httpStatus: null };
    quotes[q.key] = {
      source: q.source,
      words: words(q.passage),
      found: text ? tools.quoteFound(q.passage, text) === true : false,
    };
  }
  const result = {
    checkedAt: date,
    method:
      'Each quotation the admission adds or corrects was matched in a fresh retrieval with the pack’s matcher (research/risk-debate/tools.mjs quoteFound), which ignores differences of whitespace, case, quotation marks, dashes, PDF line-break hyphens and Unicode compatibility forms. Two LessWrong posts, which refused direct retrieval, were read through the LessWrong API. Quotations read only in archive captures (the Internet Archive refused this environment) rest on the cross-family check and are not listed.',
    sources: Object.fromEntries(Object.entries(sources).sort()),
    quotes,
  };
  writeFileSync(map.files.admission, JSON.stringify(result, null, 2) + '\n');
  execFileSync('pnpm', ['prettier', '--write', map.files.admission], {
    stdio: 'ignore',
  });
  const missing = Object.entries(quotes).filter(([, q]) => !(q as Json).found);
  console.log(
    `${Object.keys(quotes).length} quotations; not matched: ${missing.length}`,
  );
  for (const [k] of missing) console.log('  ' + k);
  process.exit(missing.length ? 1 : 0);
}

// ---------------------------------------------------------------- base
const snapshotPath = 'review/risk-debate-admission-before-2026-10-31.json';
const verification: Json = read(map.files.verification);
const admission: Json = read(map.files.admission);
const crossCheck: Json = read(map.files.check);
const checkItemOf = new Map<string, Json>(
  Object.values(crossCheck.items as Json)
    .filter((item: Json) => item.part !== 'A1')
    .map((item: Json) => [item.key ?? item.recordId, item]),
);
const sourceComparison = new Map<string, Json>(
  (crossCheck.sourceComparisons as Json[]).map((s) => [s.sourceId, s]),
);

const stored = {
  meta: read('data/meta.json'),
  ...Object.fromEntries(names.map((n) => [n, read(`data/${n}.json`)])),
} as { meta: Json } & Record<Name, Row[]>;
// The snapshot describes an admission already applied to the stored data. It
// is used only when the stored data holds every row it lists as added;
// otherwise it is foreign to this base (a new base, or data rebuilt
// elsewhere), and its meta and rows are not restored: the admission is
// rebuilt from the current data.
const storedSnapshot: Json | null = existsSync(snapshotPath)
  ? read(snapshotPath)
  : null;
const snapshotApplies = (s: Json) =>
  names.some((n) => ((s.added?.[n] ?? []) as string[]).length) &&
  names.every((n) => {
    const ids = new Set(stored[n].map((r) => r.id));
    return ((s.added?.[n] ?? []) as string[]).every((id) => ids.has(id));
  });
const snapshot: Json | null =
  storedSnapshot && snapshotApplies(storedSnapshot) ? storedSnapshot : null;
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
const baseIndex = Object.fromEntries(
  names.map((n) => [n, new Map(base[n].map((r) => [r.id, r]))]),
) as Record<Name, Map<string, Row>>;
const existing = (n: Name, id: string) => baseIndex[n].get(id);
const sha = (value: unknown) =>
  createHash('sha256').update(JSON.stringify(value)).digest('hex');
const baseCommit = execFileSync('git', ['rev-parse', 'HEAD'], {
  encoding: 'utf8',
}).trim();

// ------------------------------------------------- reuse of base records
/** An address as the dataset may hold it: no scheme, www, query or trailing slash. */
const urlKey = (u: string) =>
  u
    .toLowerCase()
    .split('#')[0]
    .split('?')[0]
    .replace(/^https?:\/\/(www\.)?/, '')
    .replace(/\/$/, '');
const arxivKey = (u: string) =>
  u.match(/arxiv\.org\/(?:abs|pdf)\/(\d{4}\.\d{4,5})/)?.[1];
const baseByUrl = new Map<string, Row[]>();
const baseByArxiv = new Map<string, Row[]>();
for (const s of base.sources)
  for (const u of new Set([s.canonicalUrl, s.evidenceUrl] as string[])) {
    baseByUrl.set(urlKey(u), [...(baseByUrl.get(urlKey(u)) ?? []), s]);
    const a = arxivKey(u);
    if (a) baseByArxiv.set(a, [...(baseByArxiv.get(a) ?? []), s]);
  }
/** The base source that is the same expression as a pack source, if any. */
function baseSourceFor(s: Json): Row | undefined {
  if (s.datasetSource && existing('sources', s.datasetSource))
    return existing('sources', s.datasetSource);
  const exact = baseByUrl.get(urlKey(s.url));
  if (exact?.length) return exact.find((r) => r.documentId) ?? exact[0];
  const a = arxivKey(s.url);
  const byId = a ? baseByArxiv.get(a) : undefined;
  return (
    byId?.find((r) => /\/pdf\//.test(r.canonicalUrl as string)) ?? byId?.[0]
  );
}
const reused = {
  documents: new Map<string, string>(),
  sources: new Map<string, string>(),
};
/** Admission retrievals of sources the base already holds, by cache key. */
const existingQuoted = new Map<string, string>(
  Object.entries(map.existingSourceQuotes as Record<string, string>).map(
    ([id, key]) => [key, id],
  ),
);
const sourceId = (key: string): string => {
  if (newSources[key]) return newSources[key].id;
  const kept = existingQuoted.get(key);
  if (kept) {
    if (!existing('sources', kept))
      throw new Error('The base lacks the source ' + kept);
    return kept;
  }
  const s = packSources.get(key);
  if (!s) throw new Error('Unknown source: ' + key);
  const b = baseSourceFor(s);
  if (b) {
    reused.sources.set(key, b.id);
    return b.id;
  }
  return `source-rd-${key}`;
};
/** The admitted ID of a pack document: the base's where it already holds the work. */
const documentId = (id: string): string => {
  if (map.newDocuments[id] || existing('entities', id)) return id;
  if (!packDocuments.has(id)) throw new Error('Unknown document: ' + id);
  for (const s of pack.sources as Json[])
    if (s.documentId === id) {
      const b = baseSourceFor(s);
      if (b?.documentId && existing('entities', b.documentId as string)) {
        reused.documents.set(id, b.documentId as string);
        return b.documentId as string;
      }
    }
  return id;
};

// ------------------------------------------------- propositions and IDs
const propositionOf = (code: string): Json => {
  const p = map.propositions[code];
  if (!p) throw new Error('No proposition mapping: ' + code);
  return p;
};
const conceptId = (code: string) =>
  propositionOf(code).existing ?? propositionOf(code).id;
/** Stance-neutral, re-lettered IDs (convention C4; decision 1). */
const claimIdOf = new Map<string, string>();
{
  const taken = new Set<string>();
  for (const r of pack.records as Json[]) {
    const code = r.proposition as string;
    let id = r.id as string;
    const idCode = propositionOf(code).idCode;
    if (idCode) id = id.replace(/^rd-r0[45]-/, `rd-${idCode}-`);
    const neutral = id.replace(/-(contests|context)$/, '');
    id = taken.has(neutral) ? id : neutral;
    if (taken.has(id)) throw new Error('Duplicate admitted ID: ' + id);
    taken.add(id);
    claimIdOf.set(r.id, id);
  }
}

// Reader-facing text never names a record ID.
const admittedIds = new Set<string>([
  ...base.claims.map((c) => c.id),
  ...base.entities.map((e) => e.id),
  ...claimIdOf.values(),
  ...claimIdOf.keys(),
]);
const idToken = /\b[a-z][a-z0-9]*(?:-[a-z0-9]+){2,}\b/g;
const tidy: [RegExp, string][] = [
  [
    /\((?:see |the dataset's record )?recorded separately\)/g,
    '(recorded separately)',
  ],
  [/recorded separately(?:,| and) recorded separately/g, 'recorded separately'],
];
function prose(text: string) {
  let out = text;
  for (const [from, to] of map.textReplacements as [string, string][])
    out = out.split(from).join(to);
  out = out
    .replace(/\bR04\b/g, 'B1')
    .replace(/\bR05\b/g, 'A4')
    .replace(idToken, (t) => (admittedIds.has(t) ? 'recorded separately' : t));
  for (let pass = 0; pass < 3; pass++)
    for (const [re, to] of tidy) out = out.replace(re, to);
  return out;
}
function noIds(text: string, where: string) {
  const left = (text.match(idToken) ?? []).find((t) => admittedIds.has(t));
  if (left) throw new Error(`Record ID left in ${where}: ${left}`);
  return text;
}
const loaded =
  /\b(doomers?|accelerationists?|sceptics?|skeptics?|admits|concedes|debunks|dismisses|warns)\b/i;

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
const quoted = new Map<string, Set<string>>();

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
  return day
    ? `${Number(day)} ${months[Number(m) - 1]} ${y}`
    : `${months[Number(m) - 1]} ${y}`;
};

function checkSentence(packId: string) {
  const item = checkItemOf.get(packId);
  if (!item) return '';
  const agrees =
    item.part === 'A2'
      ? 'answered the record’s question blind and agreed with its stance'
      : /^yes/.test(item.stanceCheck ?? '') &&
          /^yes/.test(item.quoteCheck ?? '')
        ? 're-read the record’s source and found the quotation and stance supported'
        : 're-read the record’s source; its findings were applied at admission';
  return `A cross-family machine check (2026-10-31, item ${item.number}) ${agrees}.`;
}

function packQuoteNote(packId: string, index: number, e: Json) {
  const v = (verification.quotes as Json[]).find(
    (q) => q.claim === packId && q.evidence === index + 1,
  );
  if (!v?.found)
    throw new Error(`Quotation not matched by the pack: ${packId}:${index}`);
  const s = packSources.get(e.source)!;
  return `The quotation (${words(e.passage)} words) matched the text retrieved for the candidate pack on ${s.retrievedAt}. Matching ignored differences of whitespace, case, quotation marks, dashes and Unicode compatibility forms, so the source’s typography can differ.`;
}

function evidenceRow(claimId: string, eid: string, e: Json, note: string): Row {
  const sid = sourceId(e.source);
  usedSources.add(e.source);
  if (e.passageType === 'quote') {
    if (words(e.passage) > 50) throw new Error('Quote over 50 words: ' + eid);
    quoted.set(sid, (quoted.get(sid) ?? new Set()).add(e.passage));
  }
  const archiveOnly = newSources[e.source]?.archiveOnly;
  return {
    id: eid,
    claimId,
    sourceId: sid,
    sourceRole: e.sourceRole ?? 'primary',
    support: e.support ?? 'supports',
    locator: e.locator,
    passage:
      e.passageType === 'quote'
        ? e.passage
        : noIds(prose(e.passage.replace(/^Paraphrase:\s*/, '')), eid),
    passageType: e.passageType,
    verification: 'machine_checked',
    checkedAt: date,
    note: noIds(prose(note), eid),
    // A passage read in an archive capture carries no retrieval route.
    ...(archiveOnly || e.retrievalRoute === null
      ? {}
      : { retrievalRoute: 'direct' }),
  };
}

const basisNote: Record<string, string> = {
  posting: 'Date of posting.',
  submission: 'Date of the arXiv v1 submission.',
  delivery: 'Date the talk was given.',
  publication: 'Date of publication, as the source gives it.',
};
function timeOf(t: Json, over?: Json, document?: string) {
  const basis = t.basis as string;
  const time: Json = {
    kind: 'event',
    date: over?.date ?? t.date,
    ...(basis === 'delivery' ? {} : { basis: 'publication' }),
    note:
      over?.note ??
      t.note ??
      (document ? documentDates[document]?.note : undefined) ??
      basisNote[basis] ??
      basisNote.publication,
  };
  return time;
}

/** Builds one admitted proposition record from a pack record and its map entry. */
function buildRecord(r: Json) {
  const over: Json = map.claims[r.id] ?? {};
  const id = claimIdOf.get(r.id)!;
  const predicate: string = over.predicate ?? r.predicate;
  // Schema 2.11: an articulation is never also most developed; the pack's
  // three records with both keep the most-developed role.
  const roles: string[] = (over.roles ?? r.roles).filter(
    (role: string, _: number, all: string[]) =>
      !(role === 'articulation' && all.includes('most-developed')),
  );
  const stance = predicate.replace('_proposition', '');
  const thought: Json = { roles, register: r.register };
  if (r.term && !over.dropTerm && roles.includes('earliest-located-term'))
    thought.term = r.term;
  if (stance === 'bears_on') thought.missing = over.missing ?? r.missing;
  if (r.claimed && !over.dropClaimed) thought.claimed = r.claimed;
  const attested = 'attested' in over ? over.attested : r.attested;
  if (attested)
    thought.attested = {
      ...(attested.date ? { date: attested.date } : {}),
      note: noIds(prose(attested.note), id),
    };
  const engagement = over.engagement ?? r.engagement;
  if (stance === 'contests' && engagement) thought.engagement = engagement;
  if (thought.engagement)
    thought.engagement = {
      ...thought.engagement,
      rationale: noIds(prose(thought.engagement.rationale), id),
    };
  if (thought.missing) thought.missing = noIds(prose(thought.missing), id);

  let qualification = prose(over.qualification ?? r.qualification);
  if (over.qualificationAppend)
    qualification = `${qualification} ${over.qualificationAppend}`;
  const statement = noIds(prose(over.statement ?? r.statement), id);
  qualification = noIds(qualification, id);
  if (loaded.test(statement) || loaded.test(qualification))
    throw new Error('Loaded wording: ' + id);

  const evidenceIds: string[] = [];
  (r.evidence as Json[]).forEach((raw, index) => {
    const key = `${r.id}:${index}`;
    const eOver: Json = map.evidence[key] ?? {};
    const e: Json = { ...structuredClone(raw), ...(eOver.set ?? {}) };
    // A record rests on at least one supporting passage: where the pack
    // marked every passage of a context record as context, the first one
    // supports the record's statement that the text bears on the proposition.
    if (
      index === 0 &&
      (r.evidence as Json[]).every((x) => x.support !== 'supports')
    )
      e.support = 'supports';
    if (eOver.set?.passage && !eOver.quoteCorrection)
      throw new Error('A changed quotation without a correction: ' + key);
    const eid = `evidence-${id}-${evidenceIds.length + 1}`;
    let text: string;
    if (e.passageType !== 'quote')
      text = `The paraphrase is Selekoa’s, written from the text retrieved for the candidate pack; it is not a quotation and was not machine-matched.`;
    else if (eOver.quoteCorrection) {
      const fresh = admission.quotes[key];
      if (!fresh?.found)
        throw new Error('Corrected quotation not matched at admission: ' + key);
      text = `The quotation (${words(e.passage)} words) was corrected at admission and matched a fresh retrieval of ${date} (SHA-256 ${admission.sources[e.source].sha256}). ${eOver.reason}`;
    } else text = packQuoteNote(r.id, index, raw);
    const note = [
      'Candidate pack passage, arguments about catastrophic risk from advanced AI (research/risk-debate).',
      text,
      e.note ?? '',
      eOver.quoteCorrection ? '' : (eOver.reason ?? ''),
      checkSentence(r.id),
      'No human editorial review.',
    ]
      .filter(Boolean)
      .join(' ');
    addOnce('evidence', evidenceRow(id, eid, e, note));
    evidenceIds.push(eid);
  });

  addOnce('claims', {
    id,
    subject: documentId(r.document),
    predicate,
    object: { kind: 'entity', entityId: conceptId(r.proposition) },
    topic: 'ideas',
    statement,
    time: timeOf(r.time, over.time, r.document),
    derivation: 'explicit',
    resolution: 'supported',
    editorialState: 'seed',
    qualification,
    evidenceIds,
    recordedAt: date,
    attributes: { thought },
  });
}

/** Builds a record the admission adds (from the check or the adjudication). */
function buildNewRecord(c: Json) {
  const stance = (c.predicate as string).replace('_proposition', '');
  const thought: Json = { roles: c.roles, register: c.register };
  if (c.attested) thought.attested = c.attested;
  if (stance === 'contests' && c.engagement) thought.engagement = c.engagement;
  if (c.conditions) thought.conditions = c.conditions;
  if (c.estimates) thought.estimates = c.estimates;
  const evidenceIds: string[] = [];
  (c.evidence as Json[]).forEach((e, index) => {
    const key = `${c.id}:${index}`;
    const eid = `evidence-${c.id}-${index + 1}`;
    let text: string;
    if (e.checkOnly)
      text = `The quotation (${words(e.passage)} words) was read by the cross-family check of 2026-10-31 in the archive capture named in the source record; the Internet Archive refused connections at admission, so it was not matched again.`;
    else {
      const fresh = admission.quotes[key];
      if (!fresh?.found)
        throw new Error('Added quotation not matched at admission: ' + key);
      const s = admission.sources[e.source];
      text = `The quotation (${words(e.passage)} words) matched a fresh retrieval of ${date}${s.route && s.route !== 'direct' ? ' through the LessWrong API' : ''} (SHA-256 ${s.sha256}). Matching ignored differences of whitespace, case, quotation marks, dashes and Unicode compatibility forms.`;
    }
    const note = [
      'Added at the admission of the risk-debate pack (research/risk-debate).',
      text,
      e.fromCheck
        ? 'The cross-family check of 2026-10-31 proposed the record and read this passage.'
        : '',
      e.note ?? '',
      'No human editorial review.',
    ]
      .filter(Boolean)
      .join(' ');
    addOnce(
      'evidence',
      evidenceRow(
        c.id,
        eid,
        { ...e, sourceRole: 'primary', support: 'supports' },
        note,
      ),
    );
    evidenceIds.push(eid);
  });
  addOnce('claims', {
    id: c.id,
    subject: c.subject,
    predicate: c.predicate,
    object: { kind: 'entity', entityId: conceptId(c.proposition) },
    topic: 'ideas',
    statement: noIds(c.statement, c.id),
    time: c.time,
    derivation: 'explicit',
    resolution: 'supported',
    editorialState: 'seed',
    qualification: noIds(c.qualification, c.id),
    evidenceIds,
    recordedAt: date,
    attributes: { thought },
  });
}

// ---------------------------------------------------------------- claims
for (const id of Object.keys(map.claims))
  if (!packRecords.has(id))
    throw new Error('Map entry for no pack record: ' + id);
for (const id of Object.keys(map.hold))
  if (!packRecords.has(id)) throw new Error('Hold for no pack record: ' + id);
for (const r of pack.records as Json[]) {
  if (map.hold[r.id]) continue;
  buildRecord(r);
}
for (const c of map.newClaims as Json[]) buildNewRecord(c);

// Replies (decision 14): cites claims, with the reply qualification.
const docDate = (id: string): Json => {
  const d = packDocuments.get(id);
  if (!d) throw new Error('A reply from a document outside the pack: ' + id);
  const basis = d.dateBasis as string;
  // The document's own date note where the map gives one (a compiler's
  // copy, file metadata), not the generic note of its basis.
  return {
    kind: 'event',
    date: dateOfDocument(id),
    ...(basis === 'delivery' ? {} : { basis: 'publication' }),
    note: documentDates[id]?.note ?? basisNote[basis] ?? basisNote.publication,
  };
};
for (const reply of pack.replies as Json[]) {
  const id = reply.id as string;
  const evidenceIds: string[] = [];
  (reply.evidence as Json[]).forEach((e, index) => {
    const eid = `evidence-${id}-${index + 1}`;
    const note = [
      'Candidate pack passage, arguments about catastrophic risk from advanced AI (research/risk-debate).',
      e.passageType === 'quote'
        ? packQuoteNote(id, index, e)
        : 'The paraphrase is Selekoa’s; it is not a quotation and was not machine-matched.',
      e.note ?? '',
      'No human editorial review.',
    ]
      .filter(Boolean)
      .join(' ');
    addOnce('evidence', evidenceRow(id, eid, e, note));
    evidenceIds.push(eid);
  });
  const statement = noIds(prose(reply.statement), id);
  addOnce('claims', {
    id,
    subject: documentId(reply.from),
    predicate: 'cites',
    object: { kind: 'entity', entityId: documentId(reply.to) },
    topic: 'ideas',
    statement,
    time: docDate(reply.from),
    derivation: 'explicit',
    resolution: 'supported',
    editorialState: 'seed',
    qualification: map.replies.qualification,
    evidenceIds,
    recordedAt: date,
  });
}

// ------------------------------------------------- earliest located terms
// Schema 2.11: when any record's evidence uses a usual name, exactly one
// record holds the earliest located use of it, and none is dated before it.
// The pack assigned the role partly from titles; the admission applies the
// rule to the quoted passages, mechanically, and reports every change.
const boundary = (d: string, end: boolean) =>
  d.length === 4
    ? `${d}-${end ? '12-31' : '01-01'}`
    : d.length === 7
      ? `${d}-${end ? '31' : '01'}`
      : d;
const termMoves: string[] = [];
for (const [code, p] of Object.entries(
  map.propositions as Record<string, Json>,
)) {
  const concept = p.existing ?? p.id;
  const terms: string[] = p.existing
    ? ((existing('entities', concept)?.proposition as Json)?.terms ?? [])
    : (pack.propositions as Json[]).find((x) => x.code === code)!.terms;
  const records = added.claims.filter(
    (c) => (c.object as Json).entityId === concept && c.predicate !== 'cites',
  );
  const passages = (c: Row) =>
    (c.evidenceIds as string[]).map(
      (eid) => added.evidence.find((e) => e.id === eid)!.passage as string,
    );
  const termOf = (c: Row) =>
    terms.find((t) =>
      passages(c).some((x) => x.toLowerCase().includes(t.toLowerCase())),
    );
  const wordingOf = (c: Row): string | undefined => {
    const t = (c.attributes as Json).thought;
    if (t.attested) return t.attested.date;
    return (c.time as Json).date;
  };
  const before = records.find((c) =>
    (c.attributes as Json).thought.roles.includes('earliest-located-term'),
  );
  for (const c of records) {
    const t = (c.attributes as Json).thought;
    t.roles = t.roles.filter((r: string) => r !== 'earliest-located-term');
    delete t.term;
  }
  if (p.existing) {
    // The existing concept keeps its holder; no admitted use may precede it.
    const holder = base.claims.find(
      (c) =>
        (c.object as Json)?.entityId === concept &&
        (c.attributes as Json)?.thought?.roles.includes(
          'earliest-located-term',
        ),
    );
    const at = holder && wordingOf(holder);
    for (const c of records) {
      const w = wordingOf(c);
      if (termOf(c) && at && w && boundary(w, true) < boundary(at, false))
        throw new Error(
          `${c.id} uses a usual name of ${code} before its holder`,
        );
    }
    if (before)
      termMoves.push(`${code}: the pack's term role lapses (${before.id})`);
    continue;
  }
  const users = records
    .filter((c) => termOf(c) && wordingOf(c))
    .sort(
      (a, b) =>
        boundary(wordingOf(a)!, false).localeCompare(
          boundary(wordingOf(b)!, false),
        ) ||
        boundary(wordingOf(a)!, true).localeCompare(
          boundary(wordingOf(b)!, true),
        ) ||
        Number(b === before) - Number(a === before) ||
        a.id.localeCompare(b.id),
    );
  const holder = users[0];
  if (holder) {
    const t = (holder.attributes as Json).thought;
    t.roles.push('earliest-located-term');
    t.term = termOf(holder);
  }
  if (holder !== before)
    termMoves.push(
      `${code}: ${before ? before.id : 'none'} → ${holder ? `${holder.id} (“${termOf(holder)}”)` : 'none'}`,
    );
}

// ---------------------------------------------------------------- entities
const referenced = new Set<string>();
for (const c of added.claims) {
  referenced.add(c.subject as string);
  referenced.add((c.object as Json).entityId);
}
// The documents of the sources the records quote are referenced too.
for (const k of usedSources) {
  const d = newSources[k]?.documentId ?? packSources.get(k)?.documentId;
  if (d) referenced.add(documentId(d));
}
const authorsOf = (list: string[]) =>
  list.length > 4
    ? `${list[0]} and ${list.length - 1} co-authors`
    : list.length <= 2
      ? list.join(' and ')
      : `${list.slice(0, -1).join(', ')} and ${list.at(-1)}`;
const subtypeOf = (d: Json) => {
  const fixed = map.documentSubtypes[d.id];
  if (fixed) return fixed as string;
  if (
    d.subtype === 'Paper' &&
    (pack.sources as Json[]).some(
      (s) => s.documentId === d.id && arxivKey(s.url),
    )
  )
    return map.subtypes.arXivPaper as string;
  const t = map.subtypes[d.subtype];
  if (!t) throw new Error('No subtype mapping: ' + d.subtype);
  return t as string;
};
const article = (s: string) => (/^[AEIOU]/i.test(s) ? 'An' : 'A');
for (const id of [...referenced].sort()) {
  if (existing('entities', id)) continue;
  const fresh = map.newDocuments[id];
  if (fresh) {
    for (const k of fresh.sources as string[]) usedSources.add(k);
    addOnce('entities', {
      id,
      name: fresh.name,
      shortName: fresh.shortName,
      type: 'document',
      subtype: fresh.subtype,
      aliases: [],
      description: noIds(fresh.description, id),
      sourceIds: (fresh.sources as string[]).map(sourceId),
    });
    continue;
  }
  const d = packDocuments.get(id);
  if (d) {
    const sources = (pack.sources as Json[]).filter((s) => s.documentId === id);
    const subtype = subtypeOf(d);
    const publisher = sources[0]?.publisher
      ? `, ${String(sources[0].publisher)
          .replace(/\s*\(.*$/, '')
          .replace(/[;,].*$/, '')}`
      : '';
    const corrected = documentDates[id];
    const lead = `${article(subtype)} ${subtype.toLowerCase()} by ${authorsOf(d.authors)}${publisher}, dated ${inWords(dateOfDocument(id)!)}.`;
    const dateNote = corrected?.description ?? d.dateNote;
    const full = dateNote
      ? `${lead} ${String(dateNote).replace(/([^.])$/, '$1.')}`
      : lead;
    const description = noIds(prose(full.length <= 600 ? full : lead), id);
    addOnce('entities', {
      id,
      name: d.title,
      ...(d.shortName ? { shortName: d.shortName } : {}),
      type: 'document',
      subtype,
      aliases: [],
      description,
      // A comment read in a compiler's copy is identified by that copy.
      sourceIds: sources.length
        ? sources.map((s) => sourceId(s.key))
        : [
            ...new Set(
              added.claims
                .filter((c) => c.subject === id)
                .flatMap((c) => c.evidenceIds as string[])
                .map(
                  (eid) =>
                    added.evidence.find((e) => e.id === eid)!
                      .sourceId as string,
                ),
            ),
          ].sort(),
    });
    for (const s of sources) usedSources.add(s.key);
    continue;
  }
  const code = Object.keys(map.propositions).find(
    (k) => map.propositions[k].id === id,
  );
  if (code) {
    const p = (pack.propositions as Json[]).find((x) => x.code === code)!;
    // Identity sources: those of the records on the proposition.
    const ids = new Set<string>();
    for (const c of added.claims)
      if ((c.object as Json).entityId === id && c.predicate !== 'cites')
        for (const eid of c.evidenceIds as string[])
          ids.add(added.evidence.find((e) => e.id === eid)!.sourceId as string);
    addOnce('entities', {
      id,
      name: p.label,
      type: 'concept',
      subtype: 'Proposition',
      aliases: [],
      description: `A proposition about catastrophic risk from advanced AI, recorded with one criterion so that texts can be classified against it (code ${code} in the collection of arguments about catastrophic risk from advanced AI). A record says what a text states, not whether the proposition is true.${map.propositions[code].note ? ' ' + map.propositions[code].note : ''}`,
      sourceIds: [...ids].sort().slice(0, 3),
      proposition: {
        code,
        criterion: p.criterion,
        terms: p.terms,
      },
    });
    continue;
  }
  throw new Error('Entity without a row: ' + id);
}
for (const e of added.entities)
  if (!(e.sourceIds as string[]).length)
    throw new Error('An entity without an identity source: ' + e.id);

// ---------------------------------------------------------------- sources
const kindOf = (s: Json) =>
  map.sourceKindOverrides[s.key] ??
  map.sourceKinds[s.kind] ??
  (() => {
    throw new Error('No source kind: ' + s.kind);
  })();
const reuseNote =
  'Bibliographic metadata, editorial paraphrases and short attributed quotations (at most 50 words each). Recheck terms before wider redistribution.';
for (const key of [...usedSources].sort()) {
  const id = sourceId(key);
  if (existing('sources', id) || added.sources.some((s) => s.id === id))
    continue;
  const x = newSources[key];
  if (x) {
    const fresh = admission.sources[key];
    const documentWords =
      x.documentWords ??
      (fresh?.documentWords
        ? {
            count: fresh.documentWords,
            basis: `${fresh.documentWordsBasis}, in the retrieval of ${date}${x.apiRoute ? ' through the LessWrong API' : ''}`,
          }
        : undefined);
    const quotedHere = quoted.has(id);
    if (quotedHere && !documentWords)
      throw new Error('A quoted source without a length: ' + key);
    addOnce('sources', {
      id,
      documentId: x.documentId,
      title: x.title,
      authors: x.authors,
      publisher: x.publisher,
      publicationDate: x.publicationDate,
      version: [
        x.version,
        fresh?.sha256
          ? `Retrieved at admission on ${date}${x.apiRoute ? ' through the LessWrong API' : ''} (SHA-256 ${fresh.sha256}).`
          : '',
      ]
        .filter(Boolean)
        .join(' '),
      canonicalUrl: x.url,
      evidenceUrl: x.evidenceUrl ?? x.url,
      language: 'en',
      ...(x.archivedUrl
        ? { archivedUrl: x.archivedUrl, archivedAt: x.archivedAt }
        : {}),
      ...(documentWords ? { documentWords } : {}),
      kind: x.kind,
      accessedAt: x.accessedAt ?? date,
      reuse: {
        attribution: `${x.authors.join(', ')}, “${x.title}”, ${x.publicationDate}.`,
        licence: 'No open redistribution licence asserted',
        note: reuseNote,
      },
    });
    continue;
  }
  const s = packSources.get(key)!;
  const edit: Json = map.sourceEdits[key] ?? {};
  const comparison = sourceComparison.get(key);
  const doc = packDocuments.get(s.documentId);
  const docId = doc ? documentId(s.documentId) : undefined;
  const docDateHere = doc ? dateOfDocument(doc.id) : undefined;
  const version = [
    `Retrieved for the candidate pack on ${s.retrievedAt} (SHA-256 ${s.sha256}). ${String(edit.version ?? s.version).replace(/([^.])$/, '$1.')}`,
    comparison
      ? comparison.hashMatches
        ? `The cross-family check retrieved it again on ${comparison.checkDate}, with the same bytes.`
        : `The cross-family check retrieved it again on ${comparison.checkDate}; the bytes differ, and the check compared the quoted passages.`
      : '',
    edit.versionNote ?? '',
  ]
    .filter(Boolean)
    .join(' ');
  addOnce('sources', {
    id,
    ...(docId ? { documentId: docId } : {}),
    title: s.title,
    authors: s.authors.length
      ? s.authors
      : [String(s.publisher).replace(/\s*\(.*$/, '')],
    publisher: s.publisher,
    publicationDate: docDateHere ?? null,
    version: noIds(prose(version), id),
    canonicalUrl: s.url,
    evidenceUrl: s.url,
    language: s.language,
    ...(edit.archivedUrl
      ? { archivedUrl: edit.archivedUrl, archivedAt: edit.archivedAt }
      : {}),
    ...(s.documentWords
      ? {
          documentWords: {
            count: s.documentWords.count,
            basis: `${String(s.documentWords.basis).replace(/\.$/, '')}; counted for the candidate pack`,
          },
        }
      : {}),
    kind: kindOf(s),
    accessedAt: s.retrievedAt,
    reuse: {
      attribution: `${(s.authors.length ? s.authors : [String(s.publisher).replace(/\s*\(.*$/, '')]).join(', ')}, “${s.title}”${docDateHere ? `, ${docDateHere}` : ''}.`,
      licence: 'No open redistribution licence asserted',
      note: reuseNote,
    },
  });
}

// A base source that had no quotation before gains the pack's length count,
// so that the quotation limit can be checked; nothing else about it changes.
for (const key of usedSources) {
  const s = packSources.get(key);
  const id = sourceId(key);
  const row = existing('sources', id);
  if (!s || !row || row.documentWords || !quoted.has(id)) continue;
  if (!s.documentWords)
    throw new Error('No length for the quoted source ' + key);
  changeRow('sources', id, (r) => {
    r.documentWords = {
      count: s.documentWords.count,
      basis: `${String(s.documentWords.basis).replace(/\.$/, '')}; counted for the risk-debate candidate pack`,
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
  updatedAt: date > base.meta.updatedAt ? date : base.meta.updatedAt,
  scope: `${base.meta.scope} ${map.scope}`,
};
const result = {
  meta,
  ...Object.fromEntries(names.map((n) => [n, [...base[n], ...added[n]]])),
} as unknown as { meta: Json } & Record<Name, Row[]>;
const newSnapshot = {
  description: map.snapshotDescription,
  baseCommit: check && snapshot ? snapshot.baseCommit : baseCommit,
  meta: base.meta,
  added: Object.fromEntries(names.map((n) => [n, added[n].map((r) => r.id)])),
  before: Object.fromEntries(names.map((n) => [n, [...changed[n].values()]])),
  reused: {
    documents: Object.fromEntries([...reused.documents].sort()),
    sources: Object.fromEntries([...reused.sources].sort()),
  },
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
  for (const m of termMoves) console.log('Term role: ' + m);
  console.log(
    `Added ${names.map((n) => `${added[n].length} ${n}`).join(', ')}; changed ${names.map((n) => `${changed[n].size} ${n}`).join(', ')}; reused ${reused.documents.size} documents and ${reused.sources.size} sources of the base.`,
  );
}
