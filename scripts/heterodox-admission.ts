// Admits the candidate pack research/heterodox-thought into the dataset as
// the collection on machine succession, scale and acceleration, using the
// authored map in review/heterodox-admission-map-2026-11-01.json and the
// maintainer's decisions of 2026-11-01 on the open questions and on the
// cross-family check (both in review/heterodox-thought-pack-2026-10-31.md).
//
//   pnpm tsx scripts/heterodox-admission.ts --verify   match the admission's own quotations in a fresh retrieval
//   pnpm tsx scripts/heterodox-admission.ts            write the records and the before-snapshot
//   pnpm tsx scripts/heterodox-admission.ts --check    compare with the stored records
//   pnpm tsx scripts/heterodox-admission.ts --base <commit>
//                                         rebuild on a new base: the snapshot names that base commit
//
// `--verify` reads the ignored retrieval cache that
// `node research/heterodox-thought/tools.mjs fetch` fills and writes
// research/heterodox-thought/admission-verification-2026-11-01.json; the
// admission reads that file and never the cache.
//
// Adapted from scripts/risk-debate-admission.ts. The script runs on whatever
// base it finds: where the stored data holds every row its before-snapshot
// lists as added, it first removes those rows and restores the rows it
// changed; otherwise it builds on the stored data as it is. A pack document
// or source that the base already holds (the same identifier, or a source
// with the same address) is reused, never duplicated.
//
// Two rules are applied mechanically and every change they make is
// reported: a capture the cross-family check compared attests the wording it
// holds from the capture's date (open question 3, check decision 3); and the
// earliest located roles, articulating and contesting, and the earliest
// located use of a usual name are then recomputed from the wording dates.
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
const map: Json = read('review/heterodox-admission-map-2026-11-01.json');
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
const documentDates = (map.documentDates ?? {}) as Record<string, Json>;
const dateOfDocument = (id: string): string | undefined =>
  documentDates[id]?.date ?? packDocuments.get(id)?.date;

// ---------------------------------------------------------------- verify
/** The quotations the admission adds or corrects; the pack's own are in its verification. */
function admissionQuotes() {
  const out: { key: string; source: string; passage: string }[] = [];
  for (const c of map.newClaims as Json[])
    (c.evidence as Json[]).forEach((e, i) => {
      if (e.passageType === 'quote')
        out.push({ key: `${c.id}:${i}`, source: e.source, passage: e.passage });
    });
  for (const [id, over] of Object.entries(map.claims as Record<string, Json>))
    for (const [i, e] of Object.entries((over.evidence ?? {}) as Json))
      if ((e as Json).quoteCorrection)
        out.push({
          key: `${id}:${i}`,
          source: packRecords.get(id)!.evidence[Number(i)].source,
          passage: (e as Json).passage,
        });
  return out;
}

if (args.includes('--verify')) {
  const toolsPath = '../research/heterodox-thought/tools.mjs';
  const tools: Json = await import(toolsPath);
  const cache = '.local/heterodox-thought/doc';
  const sources: Json = {};
  const quotes: Json = {};
  for (const q of admissionQuotes()) {
    const key = q.source;
    const meta: Json | null = existsSync(`${cache}/${key}.json`)
      ? read(`${cache}/${key}.json`)
      : null;
    const text = meta?.httpStatus === 200 ? tools.cachedText(key) : null;
    sources[q.source] ??= meta
      ? {
          url: meta.requestedUrl ?? meta.url,
          httpStatus: meta.httpStatus,
          sha256: meta.sha256,
          retrievedAt: date,
          documentWords: text ? tools.words(text) : null,
          documentWordsBasis:
            'Whitespace-separated words in the PDF text layer',
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
      'Each quotation the admission adds or corrects was matched in a fresh retrieval with the pack’s matcher (research/heterodox-thought/tools.mjs quoteFound), which ignores differences of whitespace, case, quotation marks, dashes, PDF line-break hyphens and Unicode compatibility forms, and matches the parts of a quotation on either side of a marked omission in order. The file of “Machinic desire” retrieved at admission has the SHA-256 hash of the archive capture the cross-family check read (3b1c20b2…), so it is the same file. The four xenosystems.net captures of check decision 1 could not be opened: the Internet Archive is refused by this environment’s network policy, and the posts are no longer served at their addresses.',
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
const snapshotPath = 'review/heterodox-admission-before-2026-11-01.json';
const verification: Json = read(map.files.verification);
const admission: Json = read(map.files.admission);
const crossCheck: Json = read(map.files.check);
const checkItemOf = new Map<string, Json>(
  (crossCheck.items as Json[])
    .filter((item) => item.part !== 'A1')
    .map((item) => [item.id, item]),
);
/** Passages the check found in a dated capture, by pack source key. */
const capturePassages = new Map<string, Set<string>>();
for (const h of crossCheck.historical_passage_checks as Json[])
  for (const p of h.passages as Json[])
    if (/^yes/.test(p.passage_present))
      capturePassages.set(
        h.source_id,
        (capturePassages.get(h.source_id) ?? new Set()).add(p.passage),
      );

const stored = {
  meta: read('data/meta.json'),
  ...Object.fromEntries(names.map((n) => [n, read(`data/${n}.json`)])),
} as { meta: Json } & Record<Name, Row[]>;
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
const baseArg = args.includes('--base')
  ? args[args.indexOf('--base') + 1]
  : undefined;
const baseCommit = execFileSync('git', ['rev-parse', baseArg ?? 'HEAD'], {
  encoding: 'utf8',
}).trim();

// ------------------------------------------------- reuse of base records
const urlKey = (u: string) =>
  u
    .toLowerCase()
    .split('#')[0]
    .split('?')[0]
    .replace(/^https?:\/\/(www\.)?/, '')
    .replace(/\/$/, '');
const baseByUrl = new Map<string, Row[]>();
for (const s of base.sources)
  for (const u of new Set([s.canonicalUrl, s.evidenceUrl] as string[]))
    baseByUrl.set(urlKey(u), [...(baseByUrl.get(urlKey(u)) ?? []), s]);
function baseSourceFor(s: Json): Row | undefined {
  if (s.datasetSource && existing('sources', s.datasetSource))
    return existing('sources', s.datasetSource);
  const exact = baseByUrl.get(urlKey(s.url));
  return exact?.find((r) => r.documentId) ?? exact?.[0];
}
const reused = {
  documents: new Map<string, string>(),
  sources: new Map<string, string>(),
};
const sourceId = (key: string): string => {
  if (newSources[key]) return newSources[key].id;
  const s = packSources.get(key);
  if (!s) throw new Error('Unknown source: ' + key);
  const b = baseSourceFor(s);
  if (b) {
    reused.sources.set(key, b.id);
    return b.id;
  }
  return `source-ht-${key}`;
};
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
const conceptId = (code: string) => propositionOf(code).id as string;
/** Stance-neutral IDs where no other record of the text and proposition takes them. */
const claimIdOf = new Map<string, string>();
{
  const taken = new Set<string>();
  for (const r of pack.records as Json[]) {
    let id = r.id as string;
    const neutral = id.replace(/-(contests|context)$/, '');
    const twin = (pack.records as Json[]).some(
      (o) => o !== r && o.id.replace(/-(contests|context)$/, '') === neutral,
    );
    if (!twin) id = neutral;
    if (taken.has(id)) throw new Error('Duplicate admitted ID: ' + id);
    taken.add(id);
    claimIdOf.set(r.id, id);
  }
}

const admittedIds = new Set<string>([
  ...base.claims.map((c) => c.id),
  ...base.entities.map((e) => e.id),
  ...claimIdOf.values(),
  ...claimIdOf.keys(),
]);
const idToken = /\b[a-z][a-z0-9]*(?:-[a-z0-9]+){2,}\b/g;
function prose(text: string) {
  let out = text;
  for (const [from, to] of map.textReplacements as [string, string][])
    out = out.split(from).join(to);
  for (const [from, to] of (map.textRegexReplacements ?? []) as [
    string,
    string,
  ][])
    out = out.replace(new RegExp(from, 'g'), to);
  return out.replace(idToken, (t) =>
    admittedIds.has(t) ? 'recorded separately' : t,
  );
}
function noIds(text: string, where: string) {
  const left = (text.match(idToken) ?? []).find((t) => admittedIds.has(t));
  if (left) throw new Error(`Record ID left in ${where}: ${left}`);
  return text;
}
/** Words that would characterise texts, people or politics in Selekoa's own voice. */
const loaded =
  /\b(heterodox|speculative|fringe|reactionary|neoreaction\w*|far-right|fascis\w*|racis\w*|extremis\w*|doomers?|admits|concedes|debunks|dismisses|warns|notorious|controversial)\b/i;

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
const boundary = (d: string, end: boolean) =>
  d.length === 4
    ? `${d}-${end ? '12-31' : '01-01'}`
    : d.length === 7
      ? `${d}-${end ? '31' : '01'}`
      : d;

/** The check's blind classifications, by item number. */
const a2Rows = new Map<number, Json>(
  (crossCheck.comparison_data.a2.rows as Json[]).map((r) => [r.item, r]),
);
function checkSentence(packId: string) {
  // The brief named some records without their -contests or -context suffix.
  const item =
    checkItemOf.get(packId) ??
    checkItemOf.get(packId.replace(/-(contests|context)$/, ''));
  if (!item) return '';
  const lead = `A cross-family machine check (2026-11-01, item ${item.item})`;
  const kept = map.checkDisagreements?.[packId];
  if (kept) return `${lead} ${kept}`;
  if (item.part === 'A2') {
    const row = a2Rows.get(item.item);
    if (row?.agrees)
      return `${lead} classified the record’s passage blind and reached the same stance.`;
    if (map.claims[packId]?.predicate)
      return `${lead} read the passage as ${row?.own_stance}; the record takes that stance under the maintainer’s decision of 2026-11-01.`;
    return `${lead} classified the passage blind as ${row?.own_stance}; after comparing it with the record, the check recommended the stance recorded.`;
  }
  if (item.part === 'B-link')
    return `${lead} re-read the source and agreed that the passage names the earlier text or author.`;
  return `${lead} re-read the record’s source and agreed with its stance; its corrections were applied at admission.`;
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
    retrievalRoute: 'direct',
  };
}

const basisNote: Record<string, string> = {
  posting: 'Date of posting.',
  delivery: 'Date the talk was given.',
  publication: 'Date of publication, as the source gives it.',
};
function timeOf(t: Json, over?: Json, document?: string) {
  if (over?.time) return over.time as Json;
  const basis = t.basis as string;
  const corrected = document ? documentDates[document] : undefined;
  return {
    kind: 'event',
    date: corrected?.date ?? t.date,
    ...(basis === 'delivery' ? {} : { basis: 'publication' }),
    note: prose(
      corrected?.note ?? t.note ?? basisNote[basis] ?? basisNote.publication,
    ),
  };
}

/** A capture the check compared: the date it attests a record's wording from, if it holds every quotation. */
function captureAttestation(r: Json): Json | null {
  let at: string | null = null;
  const notes: string[] = [];
  for (const e of r.evidence as Json[]) {
    if (e.passageType !== 'quote') continue;
    const c: Json | undefined = map.captures[e.source];
    if (!c) return null;
    const covered =
      c.all ||
      (c.records as string[] | undefined)?.includes(r.id) ||
      capturePassages.get(e.source)?.has(e.passage);
    if (!covered) return null;
    if (!at || c.date > at) at = c.date;
    if (!notes.includes(c.note)) notes.push(c.note);
  }
  return at ? { date: at, note: notes.join(' ') } : null;
}
const attestationMoves: string[] = [];

/** Builds one admitted proposition record from a pack record and its map entry. */
function buildRecord(r: Json) {
  const over: Json = map.claims[r.id] ?? {};
  const id = claimIdOf.get(r.id)!;
  const predicate: string = over.predicate ?? r.predicate;
  const stance = predicate.replace('_proposition', '');
  const roles: string[] = [...(over.roles ?? r.roles)];
  const thought: Json = { roles, register: over.register ?? r.register };
  if (r.term && roles.includes('earliest-located-term')) thought.term = r.term;
  if (stance === 'bears_on') thought.missing = over.missing ?? r.missing;
  if (r.claimed) thought.claimed = r.claimed;
  let attested: Json | null = 'attested' in over ? over.attested : r.attested;
  const document = r.document as string;
  const time = timeOf(r.time, over, document);
  if (over.repostOnly)
    attested = {
      date: '2022-10-31',
      note: 'Read in the repost of 31 October 2022, which calls itself verbatim; the cross-family check compared only the definition of e/acc with the original post.',
    };
  if (map.currentWording[r.id]) {
    const s = packSources.get(r.evidence[0].source)!;
    attested = {
      date: s.retrievedAt,
      note: `${map.currentWording[r.id]} Read in the page as updated on 15 October 2026.`,
    };
  }
  const fromCapture = captureAttestation(r);
  if (
    fromCapture &&
    (!attested || fromCapture.date < attested.date) &&
    boundary(fromCapture.date, false) > boundary(time.date, true)
  ) {
    attestationMoves.push(
      `${id}: wording attested ${attested?.date ?? '(none)'} → ${fromCapture.date}`,
    );
    attested = fromCapture;
  } else if (
    fromCapture &&
    boundary(fromCapture.date, false) <= boundary(time.date, true)
  )
    attested = null;
  if (attested)
    thought.attested = {
      ...(attested.date ? { date: attested.date } : {}),
      note: noIds(prose(attested.note), id),
    };
  const engagement = over.engagement ?? r.engagement;
  if (stance === 'contests' && engagement)
    thought.engagement = {
      ...engagement,
      rationale: noIds(prose(engagement.rationale), id),
    };
  if (thought.missing) thought.missing = noIds(prose(thought.missing), id);

  let qualification = prose(over.qualification ?? r.qualification);
  if (r.hazardNote) qualification = `${qualification} ${r.hazardNote}`;
  const statement = noIds(prose(over.statement ?? r.statement), id);
  qualification = noIds(qualification, id);
  for (const text of [
    statement,
    qualification,
    time.note,
    thought.attested?.note,
    thought.missing,
    thought.engagement?.rationale,
  ])
    if (text && loaded.test(text)) throw new Error('Loaded wording: ' + id);
  noIds(String(time.note ?? ''), id);

  const evidenceIds: string[] = [];
  (r.evidence as Json[]).forEach((raw, index) => {
    const eOver: Json = over.evidence?.[String(index)] ?? {};
    const e: Json = { ...structuredClone(raw) };
    for (const k of ['passage', 'support', 'note', 'locator'])
      if (k in eOver) e[k] = eOver[k];
    if (
      index === 0 &&
      (r.evidence as Json[]).every((x) => x.support !== 'supports')
    )
      e.support = 'supports';
    if (eOver.trim && !String(raw.passage).includes(eOver.passage))
      throw new Error(
        'A trimmed quotation is not part of the matched one: ' + r.id,
      );
    if (eOver.passage && !eOver.quoteCorrection && !eOver.trim)
      throw new Error('A changed quotation without a correction: ' + r.id);
    const eid = `evidence-${id}-${evidenceIds.length + 1}`;
    let text: string;
    if (e.passageType !== 'quote')
      text = `The paraphrase is Selekoa’s, written from the text retrieved for the candidate pack; it is not a quotation and was not machine-matched.`;
    else if (eOver.quoteCorrection) {
      const fresh = admission.quotes[`${r.id}:${index}`];
      if (!fresh?.found)
        throw new Error('Corrected quotation not matched at admission: ' + id);
      text = `The quotation (${words(e.passage)} words) was corrected at admission and matched a fresh retrieval of ${date} (SHA-256 ${admission.sources[e.source].sha256}). ${eOver.reason}`;
    } else if (eOver.trim)
      text = `${packQuoteNote(r.id, index, raw).replace(/\(\d+ words\)/, `(${words(e.passage)} words)`)} ${eOver.reason}`;
    else text = packQuoteNote(r.id, index, raw);
    const note = [
      'Candidate pack passage, machine succession, scale and acceleration (research/heterodox-thought).',
      text,
      e.note ?? '',
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
    subject: documentId(document),
    predicate,
    object: { kind: 'entity', entityId: conceptId(r.proposition) },
    topic: 'ideas',
    statement,
    time,
    derivation: 'explicit',
    resolution: 'supported',
    editorialState: 'seed',
    qualification,
    evidenceIds,
    recordedAt: date,
    attributes: { thought },
  });
}

/** Builds a record the admission adds from the check (check decision 2). */
function buildNewRecord(c: Json) {
  const thought: Json = { roles: c.roles, register: c.register };
  const evidenceIds: string[] = [];
  (c.evidence as Json[]).forEach((e, index) => {
    const key = `${c.id}:${index}`;
    const eid = `evidence-${c.id}-${index + 1}`;
    const fresh = admission.quotes[key];
    if (!fresh?.found)
      throw new Error('Added quotation not matched at admission: ' + key);
    const s = admission.sources[e.source];
    const note = [
      'Added at the admission of the candidate pack on machine succession, scale and acceleration (research/heterodox-thought).',
      `The quotation (${words(e.passage)} words) matched a fresh retrieval of ${date} (SHA-256 ${s.sha256}). Matching ignored differences of whitespace, case, quotation marks, dashes and Unicode compatibility forms.`,
      e.fromCheck
        ? 'The cross-family check of 2026-11-01 proposed the record and named this passage.'
        : '',
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
  if (loaded.test(c.statement) || loaded.test(c.qualification))
    throw new Error('Loaded wording: ' + c.id);
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
for (const id of Object.keys(map.currentWording))
  if (!packRecords.has(id)) throw new Error('No pack record: ' + id);
for (const r of pack.records as Json[]) {
  if (map.hold[r.id]) continue;
  buildRecord(r);
}
for (const c of map.newClaims as Json[]) buildNewRecord(c);

// ------------------------------------------------- earliest located roles
// Open question 3 and check decisions 1–4: the role goes to the articulation
// (and, separately, the contesting record) whose wording is dated earliest;
// a relay never holds it, and a withheld role has no holder. Ties keep the
// pack's holder.
const wordingOf = (c: Row): string => {
  const t = (c.attributes as Json).thought;
  return (t.attested?.date ?? (c.time as Json).date) as string;
};
const roleMoves: string[] = [];
const byWording = (holder: Row | undefined) => (a: Row, b: Row) =>
  boundary(wordingOf(a), false).localeCompare(boundary(wordingOf(b), false)) ||
  boundary(wordingOf(a), true).localeCompare(boundary(wordingOf(b), true)) ||
  Number(b === holder) - Number(a === holder) ||
  a.id.localeCompare(b.id);
for (const [code, p] of Object.entries(
  map.propositions as Record<string, Json>,
)) {
  const records = added.claims.filter(
    (c) => (c.object as Json).entityId === p.id,
  );
  for (const predicate of ['articulates_proposition', 'contests_proposition']) {
    const group = records.filter(
      (c) =>
        c.predicate === predicate &&
        (c.attributes as Json).thought.register !== 'relay',
    );
    const all = records.filter((c) => c.predicate === predicate);
    const before = all.find((c) =>
      (c.attributes as Json).thought.roles.includes('earliest-located'),
    );
    const holder =
      predicate === 'articulates_proposition' && p.withheld
        ? undefined
        : [...group].sort(byWording(before))[0];
    for (const c of all) {
      const t = (c.attributes as Json).thought;
      const roles: string[] = t.roles.filter(
        (r: string) => r !== 'earliest-located',
      );
      if (c === holder) {
        const kept = roles.filter(
          (r) => r !== 'articulation' && r !== 'later-restatement',
        );
        t.roles = [
          'earliest-located',
          ...kept.filter((r) => r !== 'earliest-located'),
        ];
        if (
          predicate === 'contests_proposition' &&
          !t.roles.includes('contesting')
        )
          t.roles.unshift('contesting');
      } else {
        if (
          predicate === 'articulates_proposition' &&
          !roles.some((r) => ['articulation', 'most-developed'].includes(r))
        )
          roles.unshift('articulation');
        t.roles = roles;
      }
    }
    if (holder !== before)
      roleMoves.push(
        `${code} ${predicate === 'articulates_proposition' ? 'articulation' : 'contesting'}: ${before?.id ?? 'none'} → ${holder?.id ?? (p.withheld ? 'withheld' : 'none')}`,
      );
  }
}

// ------------------------------------------------- earliest located terms
const termMoves: string[] = [];
for (const [code, p] of Object.entries(
  map.propositions as Record<string, Json>,
)) {
  const terms: string[] = (pack.propositions as Json[]).find(
    (x) => x.code === code,
  )!.terms;
  const records = added.claims.filter(
    (c) => (c.object as Json).entityId === p.id,
  );
  const passages = (c: Row) =>
    (c.evidenceIds as string[]).map(
      (eid) => added.evidence.find((e) => e.id === eid)!.passage as string,
    );
  const termOf = (c: Row) =>
    terms.find((t) =>
      passages(c).some((x) => x.toLowerCase().includes(t.toLowerCase())),
    );
  const before = records.find((c) =>
    (c.attributes as Json).thought.roles.includes('earliest-located-term'),
  );
  for (const c of records) {
    const t = (c.attributes as Json).thought;
    t.roles = t.roles.filter((r: string) => r !== 'earliest-located-term');
    delete t.term;
  }
  const holder = records.filter((c) => termOf(c)).sort(byWording(before))[0];
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

// ---------------------------------------------------------------- links
// Open questions 10–11: each naming is a `cites` or `explicitly_credits`
// claim; links whose target would be a new entity only for that link are held.
const heldLinks: { id: string; target: string; reason: string }[] = [];
const persons = map.persons as Record<string, Json>;
const usedPersons = new Set<string>();
for (const l of pack.links as Json[]) {
  const id = l.id as string;
  const target: string = map.linkTargets[l.to] ?? l.to;
  if (map.holdLinks[l.to]) {
    heldLinks.push({ id, target: l.to, reason: map.holdLinks[l.to] });
    continue;
  }
  // `cites` takes a document object (src/domain/predicates.ts); a naming
  // of a person is held until a schema decision (admission record).
  const isPerson =
    Boolean(persons[target]) || existing('entities', target)?.type === 'person';
  if (l.predicate === 'cites' && isPerson) {
    heldLinks.push({ id, target, reason: map.citesPersonHold });
    continue;
  }
  if (persons[target]) usedPersons.add(target);
  const object =
    persons[target] || existing('entities', target) || map.newDocuments[target]
      ? target
      : packDocuments.has(target)
        ? documentId(target)
        : null;
  if (!object) throw new Error(`Link target without a row: ${id} → ${l.to}`);
  const evidenceIds: string[] = [];
  (l.evidence as Json[]).forEach((raw, index) => {
    const eOver: Json = map.linkEvidence[`${id}:${index}`] ?? {};
    const e: Json = {
      ...raw,
      ...(eOver.locator ? { locator: eOver.locator } : {}),
    };
    const eid = `evidence-${id}-${index + 1}`;
    const note = [
      'Candidate pack passage, machine succession, scale and acceleration (research/heterodox-thought).',
      e.passageType === 'quote'
        ? packQuoteNote(id, index, raw)
        : 'The paraphrase is Selekoa’s; it is not a quotation and was not machine-matched.',
      e.note ?? '',
      eOver.reason ?? '',
      checkSentence(id),
      'No human editorial review.',
    ]
      .filter(Boolean)
      .join(' ');
    addOnce('evidence', evidenceRow(id, eid, e, note));
    evidenceIds.push(eid);
  });
  const from = l.from as string;
  const d = packDocuments.get(from)!;
  const time = map.linkTimes[id] ?? {
    kind: 'event',
    date: dateOfDocument(from),
    ...(d.dateBasis === 'delivery' ? {} : { basis: 'publication' }),
    note:
      documentDates[from]?.note ??
      d.dateNote ??
      basisNote[d.dateBasis] ??
      basisNote.publication,
  };
  const statement = noIds(prose(l.statement), id);
  if (loaded.test(statement)) throw new Error('Loaded wording: ' + id);
  addOnce('claims', {
    id,
    subject: documentId(from),
    predicate: l.predicate,
    object: { kind: 'entity', entityId: object },
    topic: 'ideas',
    statement,
    time: { ...time, note: noIds(prose(String(time.note)), id) },
    derivation: 'explicit',
    resolution: 'supported',
    editorialState: 'seed',
    qualification: noIds(prose(l.qualification ?? map.linkQualification), id),
    evidenceIds,
    recordedAt: date,
  });
}

// ---------------------------------------------------------------- entities
const referenced = new Set<string>();
for (const c of added.claims) {
  referenced.add(c.subject as string);
  referenced.add((c.object as Json).entityId);
}
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
  const t = map.subtypes[d.subtype];
  if (!t) throw new Error('No subtype mapping: ' + d.subtype);
  return t as string;
};
const article = (s: string) => (/^[AEIOU]/i.test(s) ? 'An' : 'A');
const collectionName =
  'the collection on machine succession, scale and acceleration';
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
  const person = usedPersons.has(id) ? persons[id] : undefined;
  if (person) {
    const ids = new Set<string>();
    for (const doc of person.documents as string[]) {
      for (const s of pack.sources as Json[])
        if (s.documentId === doc) ids.add(sourceId(s.key));
      for (const [k, s] of Object.entries(newSources))
        if (s.documentId === doc) ids.add(sourceId(k));
    }
    const titles = (person.documents as string[])
      .map((doc) => {
        const d = packDocuments.get(doc) ?? map.newDocuments[doc];
        const name = d.title ?? d.name;
        const year = String(
          dateOfDocument(doc) ??
            (map.newClaims as Json[]).find((c) => c.subject === doc)?.time.date,
        ).slice(0, 4);
        return `“${name}” (${year})`;
      })
      .slice(0, 2);
    addOnce('entities', {
      id,
      name: person.name,
      sortName: person.sortName,
      type: 'person',
      subtype: 'Writer',
      aliases: [],
      description: `Credited author of texts recorded in ${collectionName}, among them ${titles.join(' and ')}.`,
      sourceIds: [...ids].sort().slice(0, 3),
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
    if (loaded.test(description)) throw new Error('Loaded wording: ' + id);
    addOnce('entities', {
      id,
      name: corrected?.name ?? d.title,
      ...((corrected?.shortName ?? d.shortName)
        ? { shortName: corrected?.shortName ?? d.shortName }
        : {}),
      type: 'document',
      subtype,
      aliases: [],
      description,
      sourceIds: sources.map((s) => sourceId(s.key)),
    });
    for (const s of sources) usedSources.add(s.key);
    continue;
  }
  const code = Object.keys(map.propositions).find(
    (k) => map.propositions[k].id === id,
  );
  if (code) {
    const p = (pack.propositions as Json[]).find((x) => x.code === code)!;
    const m = map.propositions[code];
    const ids = new Set<string>();
    for (const c of added.claims)
      if ((c.object as Json).entityId === id)
        for (const eid of c.evidenceIds as string[])
          ids.add(added.evidence.find((e) => e.id === eid)!.sourceId as string);
    addOnce('entities', {
      id,
      name: p.label,
      type: 'concept',
      subtype: 'Proposition',
      aliases: [],
      description: `A proposition about machine intelligence, recorded with one criterion so that texts can be classified against it (code ${code} in ${collectionName}). A record says what a text states, not whether the proposition is true.`,
      sourceIds: [...ids].sort().slice(0, 3),
      proposition: {
        code,
        criterion: m.criterion ?? p.criterion,
        terms: p.terms,
        ...(m.withheld
          ? {
              withheld: [
                {
                  role: 'earliest-located',
                  reason: m.withheld,
                  recordedAt: date,
                },
              ],
            }
          : {}),
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
    if (!fresh?.documentWords)
      throw new Error('A new source without a length: ' + key);
    addOnce('sources', {
      id,
      documentId: x.documentId,
      title: x.title,
      authors: x.authors,
      publisher: x.publisher,
      publicationDate: x.publicationDate,
      version: `${x.version} Retrieved at admission on ${date} (SHA-256 ${fresh.sha256}).`,
      canonicalUrl: x.url,
      evidenceUrl: x.url,
      language: 'en',
      archivedUrl: x.archivedUrl,
      archivedAt: x.archivedAt,
      documentWords: {
        count: fresh.documentWords,
        basis: `${fresh.documentWordsBasis}, in the retrieval of ${date}`,
      },
      kind: x.kind,
      accessedAt: date,
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
  const doc = packDocuments.get(s.documentId);
  const docId = doc ? documentId(s.documentId) : undefined;
  const docDateHere = doc ? dateOfDocument(doc.id) : undefined;
  const version = [
    `Retrieved for the candidate pack on ${s.retrievedAt} (SHA-256 ${s.sha256}). ${String(s.version).replace(/([^.])$/, '$1.')}`,
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
    ...(s.documentWords?.count
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
      basis: `${String(s.documentWords.basis).replace(/\.$/, '')}; counted for the candidate pack on machine succession, scale and acceleration`,
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
  // As the validator counts: every distinct quotation in full.
  const total = list.reduce((n, p) => n + words(p), 0);
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
  baseCommit: baseArg ? baseCommit : (snapshot?.baseCommit ?? baseCommit),
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
  for (const m of attestationMoves) console.log('Attestation: ' + m);
  for (const m of roleMoves) console.log('Earliest located: ' + m);
  for (const m of termMoves) console.log('Term role: ' + m);
  for (const h of heldLinks) console.log(`Held link: ${h.id} (${h.target})`);
  console.log(
    `Added ${names.map((n) => `${added[n].length} ${n}`).join(', ')}; changed ${names.map((n) => `${changed[n].size} ${n}`).join(', ')}; reused ${reused.documents.size} documents and ${reused.sources.size} sources of the base; held ${heldLinks.length} links.`,
  );
}
