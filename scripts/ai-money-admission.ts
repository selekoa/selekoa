// Admits the candidate pack research/ai-money as the collection “AI and
// money” (both parts of decision 13a in one release), and applies the
// maintainer's answers to the held items of the corrections of 2026-11-06,
// from the authored map review/ai-money-admission-map-2026-11-06.json.
//
//   pnpm tsx scripts/ai-money-admission.ts --verify <dir>  summarise a fresh retrieval
//   pnpm tsx scripts/ai-money-admission.ts                 write the records and the before-snapshot
//   pnpm tsx scripts/ai-money-admission.ts --check         compare with the stored records
//   pnpm tsx scripts/ai-money-admission.ts --base <commit> rebuild on a new base
//
// `--verify <dir>` reads a copy of the pack in <dir> whose ignored cache was
// rebuilt with `tools.mjs fetch` and checked with `tools.mjs verify` (so the
// committed pack files are never rewritten), and writes
// research/ai-money/admission-verification-2026-11-06.json: for each
// quotation, whether it matched in the fresh retrieval; for each source, the
// status and whether the file is the one the pack read. The admission reads
// that file, never the cache.
//
// Part 1 (the pack): proposition records with the voice of their text
// (schema 2.33), a document's views disclaimer as a context evidence row on
// each of its records, institutional events as `status_stated` (stated done
// or stated as under way) or `announced_plan` records, the authorities that
// events name as public bodies, documents, sources and the twelve
// propositions, coded J01–J12 (U01–U03 were taken by antecedent texts).
//
// Part 2 (held items): entries in the operations of
// scripts/corrections-2026-11-06.ts (set, remove, append, add,
// attachEvidence), each of which must change a record.
//
// Where the stored data holds every row the before-snapshot lists as added,
// the script first removes those rows and restores the rows it changed;
// otherwise it builds on the stored data. Every map entry must change a
// record or be used.
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { isDeepStrictEqual } from 'node:util';
import { maxQuotedWords, withinQuotationLimit } from '../src/domain/schema';

const names = ['entities', 'claims', 'sources', 'evidence'] as const;
type Name = (typeof names)[number];
type Row = Record<string, unknown> & { id: string };
type Json = Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any

const read = (path: string) => JSON.parse(readFileSync(path, 'utf8'));
const args = process.argv.slice(2);
const check = args.includes('--check');
const mapPath = 'review/ai-money-admission-map-2026-11-06.json';
const map: Json = read(mapPath);
const date: string = map.admissionDate;
const pack: Json = read(map.files.pack);
const packPropositions: Json = read(map.files.propositions);
const sha = (value: unknown) =>
  createHash('sha256').update(JSON.stringify(value)).digest('hex');

const packSources = new Map<string, Json>(
  pack.sources.map((s: Json) => [s.key, s]),
);
const packDocuments = new Map<string, Json>(
  pack.documents.map((d: Json) => [d.id, d]),
);
const isCjk = (s: string) =>
  (s.match(/[㐀-鿿]/g) ?? []).length > 0.3 * s.replace(/\s+/g, '').length;
/** Words as the pack counts them: characters for a Chinese passage. */
const words = (s: string) =>
  isCjk(s)
    ? (s.match(/[㐀-鿿]/g) ?? []).length
    : s.trim().split(/\s+/).filter(Boolean).length;

// ---------------------------------------------------------------- verify
if (args.includes('--verify')) {
  const dir = args[args.indexOf('--verify') + 1];
  const fresh: Json = read(`${dir}/research/ai-money/verification.json`);
  const sources: Json = {};
  for (const s of pack.sources as Json[]) {
    const metaPath = `${dir}/.local/ai-money/doc/${s.cacheKey}.json`;
    const meta: Json | null = existsSync(metaPath) ? read(metaPath) : null;
    sources[s.key] = {
      httpStatus: meta?.httpStatus ?? null,
      sha256: meta?.sha256 ?? null,
      sameFile: meta?.sha256 === s.sha256,
      retrievedAt: meta?.retrievedAt?.slice(0, 10) ?? null,
    };
  }
  const quotes: Json = {};
  for (const q of fresh.quotes as Json[])
    quotes[`${q.claim}:${q.evidence}`] = { source: q.source, found: q.found };
  const result = {
    checkedAt: date,
    method:
      'Every source of the pack was retrieved again on the admission date with research/ai-money/tools.mjs fetch, into a copy of the pack outside the repository, and every quotation (records, events and document disclaimers) was matched again with tools.mjs verify: Unicode compatibility forms, quotation marks, dashes, PDF line-break hyphens and whitespace normalised, case folded; for Chinese passages whitespace dropped; fragments joined by an ellipsis matched in order. Web pages are served with new markup on each request, so their file hashes differ while the text matches.',
    sources,
    quotes,
  };
  writeFileSync(map.files.admission, JSON.stringify(result, null, 2) + '\n');
  execFileSync('pnpm', ['prettier', '--write', map.files.admission], {
    stdio: 'ignore',
  });
  const missing = Object.entries(quotes).filter(([, q]) => !(q as Json).found);
  console.log(
    `${Object.keys(quotes).length} quotations; not matched: ${missing.length}; sources with the same file: ${Object.values(sources).filter((s) => (s as Json).sameFile).length} of ${pack.sources.length}`,
  );
  for (const [k] of missing) console.log('  ' + k);
  process.exit(0);
}
const admission: Json = read(map.files.admission);

// ---------------------------------------------------------------- base
const snapshotPath = `review/ai-money-admission-before-${date}.json`;
const stored = {
  meta: read('data/meta.json'),
  ...Object.fromEntries(names.map((n) => [n, read(`data/${n}.json`)])),
} as { meta: Json } & Record<Name, Row[]>;
const storedSnapshot: Json | null = existsSync(snapshotPath)
  ? read(snapshotPath)
  : null;
const snapshotApplies = (s: Json) =>
  names.every((n) => {
    const ids = new Set(stored[n].map((r) => r.id));
    return ((s.added?.[n] ?? []) as string[]).every((id) => ids.has(id));
  });
const snapshot =
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
if (snapshot && names.some((n) => sha(base[n]) !== snapshot.sha256[n]))
  throw new Error(
    `${snapshotPath} does not describe the stored data. To rebuild on a new base, restore the base data and delete the snapshot first.`,
  );
const baseArg = args.includes('--base')
  ? args[args.indexOf('--base') + 1]
  : undefined;
const baseCommit = execFileSync('git', ['rev-parse', baseArg ?? 'HEAD'], {
  encoding: 'utf8',
}).trim();
const index = Object.fromEntries(
  names.map((n) => [n, new Map(base[n].map((r) => [r.id, r]))]),
) as Record<Name, Map<string, Row>>;
const existing = (n: Name, id: string) => index[n].get(id);

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
const findAdded = (n: Name, id: string) => added[n].find((r) => r.id === id);
const addOnce = (n: Name, row: Row) => {
  if (findAdded(n, row.id) || existing(n, row.id))
    throw new Error(`Duplicate ${n} id: ${row.id}`);
  added[n].push(row);
};

/** Every map entry must be used; each use is recorded here. */
const used = new Set<string>();
function take<T>(section: string, key: string): T | undefined {
  const value = map[section]?.[key];
  if (value !== undefined) used.add(`${section}:${key}`);
  return value;
}

// --------------------------------------------------------------- wording
const codes = map.codes as Record<string, string>;
const allPackIds = new Set<string>([
  ...pack.records.map((r: Json) => r.id),
  ...pack.events.map((e: Json) => e.id),
]);
/** Research-pack wording that must not reach a reader. */
const packWording =
  /\b(decisions? \d+[a-z]?|the pack|this pack|pack’s|pack's|in the pack|cross-family|checker|Codex|preparer|drafter|this environment|candidate predicate|follow-up pass|adjudicat\w*|[AB]\d\.\d+|B\d\d\b|C\d\d\b)/i;
/** Straight quotation marks to typographic ones. */
const smart = (s: string) =>
  s
    .replace(/(^|[\s(“[—–-])'/g, '$1‘')
    .replace(/'/g, '’')
    .replace(/(^|[\s(‘[—–-])"/g, '$1“')
    .replace(/"/g, '”');
const replacements = map.textReplacements as [string, string][];
const replaced = new Set<string>();
function prose(text: string, where: string) {
  let out = text;
  for (const [from, to] of replacements)
    if (out.includes(from)) {
      replaced.add(from);
      out = out.split(from).join(to);
    }
  out = smart(out).replace(
    /\bU(0[1-9]|1[0-2])\b/g,
    (code) => codes[code] ?? code,
  );
  out = out.replace(/\s+/g, ' ').trim();
  const id = (out.match(/\bam-[a-z0-9]+(?:-[a-z0-9]+)+\b/g) ?? []).find((t) =>
    allPackIds.has(t),
  );
  if (id) throw new Error(`Record ID left in ${where}: ${id}`);
  const left = out.match(packWording);
  if (left) throw new Error(`Research-pack wording in ${where}: ${left[0]}`);
  return out;
}

// --------------------------------------------------------- IDs and dates
const conceptId = (code: string): string => {
  const p = (packPropositions.propositions as Json[]).find(
    (x) => x.code === code,
  );
  if (!p) throw new Error('No proposition: ' + code);
  return p.id;
};
const timeBases = new Set([
  'publication',
  'effective',
  'revision',
  'announcement',
  'signature',
]);
const basisNotes: Record<string, string> = {
  publication: 'Date of publication, as the text gives it.',
  delivery: 'Date the speech or remarks were delivered, as the text gives it.',
  signature: 'Date the text was signed, as the text gives it.',
  posting: 'Date the page was posted or last updated, as the page gives it.',
};
function timeOf(t: Json, where: string, extra?: string): Json {
  const note = [t.note ?? basisNotes[t.basis] ?? 'Date of the text.', extra]
    .filter(Boolean)
    .join(' ');
  return {
    kind: 'event',
    date: t.date,
    ...(timeBases.has(t.basis) ? { basis: t.basis } : {}),
    note: prose(note, where),
  };
}

// ---------------------------------------------------------- evidence
const quoted = new Map<string, Set<string>>();
const usedSources = new Set<string>();
const sourceId = (key: string) => {
  if (!packSources.has(key)) throw new Error('Unknown source: ' + key);
  return `source-am-${key}`;
};
const lead = 'Candidate pack passage, AI and money (research/ai-money).';
function matchNote(claim: string, index: number, e: Json) {
  if (e.passageType !== 'quote')
    return 'The paraphrase is Selekoa’s, written from the text read for the candidate pack; it is not a quotation and was not machine-matched.';
  const fresh = admission.quotes[`${claim}:${index + 1}`];
  if (!fresh?.found)
    throw new Error(`Quotation not matched at admission: ${claim}:${index}`);
  const at = admission.sources[e.source];
  return `The quotation (${words(e.passage)} ${isCjk(e.passage) ? 'characters' : 'words'}) matched a fresh retrieval of ${date}${at?.sameFile ? ' (the same file the candidate pack read)' : ''}. Matching ignored differences of whitespace, case, quotation marks, dashes, line-break hyphens and Unicode compatibility forms.`;
}
/** A translation or English paraphrase the pack kept in a note. */
function translationOf(note: string | null | undefined) {
  const m = note?.match(/^(?:English paraphrase|Translation):\s*(.+)$/s);
  return m ? m[1].trim() : undefined;
}
function evidenceRow(
  claimId: string,
  eid: string,
  e: Json,
  note: string,
  support: string,
): Row {
  const sid = sourceId(e.source);
  usedSources.add(e.source);
  const s = packSources.get(e.source)!;
  const translation =
    e.passageType === 'quote' && s.language !== 'en'
      ? translationOf(e.note)
      : undefined;
  if (e.passageType === 'quote') {
    if (words(e.passage) > (isCjk(e.passage) ? 100 : 50))
      throw new Error('Quote over the limit: ' + eid);
    quoted.set(e.source, (quoted.get(e.source) ?? new Set()).add(e.passage));
  }
  return {
    id: eid,
    claimId,
    sourceId: sid,
    sourceRole: e.sourceRole ?? 'primary',
    support,
    locator: prose(e.locator, eid),
    passage:
      e.passageType === 'quote'
        ? e.passage
        : prose(e.passage.replace(/^Paraphrase:\s*/, ''), eid),
    passageType: e.passageType,
    verification: 'machine_checked',
    checkedAt: date,
    note: prose(note, eid),
    retrievalRoute: 'direct',
    ...(translation ? { translation: smart(translation) } : {}),
  };
}
function evidenceOf(r: Json, document: Json | null): string[] {
  const ids: string[] = [];
  const noSupport = (r.evidence as Json[]).every(
    (e) => e.support !== 'supports',
  );
  (r.evidence as Json[]).forEach((e, index) => {
    // A record's own passage supports what the record says, also where the
    // pack marks a context record's passages as context only.
    const support = index === 0 && noSupport ? 'supports' : e.support;
    const eid = `evidence-${r.id}-${index + 1}`;
    const own = take<string>('evidenceNotes', `${r.id}:${index}`);
    const kept =
      own ??
      (translationOf(e.note) && packSources.get(e.source)!.language !== 'en'
        ? ''
        : (e.note ?? ''));
    const note = [
      lead,
      matchNote(r.id, index, e),
      kept,
      'No human editorial review.',
    ]
      .filter(Boolean)
      .join(' ');
    addOnce('evidence', evidenceRow(r.id, eid, e, note, support));
    ids.push(eid);
  });
  // The text's statement of whose views it gives, beside each of its records.
  const d = document?.disclaimer;
  if (d) {
    const eid = `evidence-${r.id}-disclaimer`;
    const fresh = admission.quotes[`${document!.id} disclaimer:1`];
    if (!fresh?.found)
      throw new Error('Disclaimer not matched at admission: ' + document!.id);
    addOnce(
      'evidence',
      evidenceRow(
        r.id,
        eid,
        { ...d, passageType: 'quote', sourceRole: 'primary' },
        `${lead} The text’s own statement of whose views it gives, shown beside the record; it is context, not support. The quotation matched a fresh retrieval of ${date}. No human editorial review.`,
        'context',
      ),
    );
    ids.push(eid);
  }
  return ids;
}

// ---------------------------------------------------------------- records
const heldRecords = map.hold as Record<string, string>;
for (const id of Object.keys(heldRecords))
  if (!allPackIds.has(id))
    throw new Error('Held record not in the pack: ' + id);

for (const r of pack.records as Json[]) {
  if (heldRecords[r.id]) {
    used.add(`hold:${r.id}`);
    continue;
  }
  const document = packDocuments.get(r.document);
  if (!document) throw new Error('No pack document: ' + r.document);
  const stance = (r.predicate as string).replace('_proposition', '');
  const roles: string[] = [...r.roles];
  if (stance === 'contests' && !roles.includes('contesting'))
    roles.unshift('contesting');
  // A later restatement is also an articulation of what it restates.
  if (
    stance === 'articulates' &&
    !roles.some((x) =>
      ['earliest-located', 'articulation', 'most-developed'].includes(x),
    )
  )
    roles.unshift('articulation');
  const thought: Json = { roles, register: r.register };
  if (roles.includes('earliest-located-term')) {
    if (!r.term) throw new Error('A term role without its term: ' + r.id);
    thought.term = r.term;
  }
  if (stance === 'bears_on') {
    const missing = take<string>('missing', r.id) ?? r.missing;
    if (!missing)
      throw new Error('A context record without “missing”: ' + r.id);
    thought.missing = prose(missing, r.id);
  }
  if (r.claimed || r.attested)
    throw new Error('Claimed or attested dates are not mapped: ' + r.id);
  if (stance === 'contests' && r.engagement)
    thought.engagement = {
      kind: r.engagement.kind,
      rationale: prose(r.engagement.rationale, r.id),
    };
  thought.voice = document.voice;
  addOnce('claims', {
    id: r.id,
    subject: r.document,
    predicate: r.predicate,
    object: { kind: 'entity', entityId: conceptId(r.proposition) },
    topic: 'ideas',
    statement: prose(take<string>('statements', r.id) ?? r.statement, r.id),
    time: timeOf(r.time, r.id),
    derivation: 'explicit',
    resolution: 'supported',
    editorialState: 'seed',
    qualification: prose(
      take<string>('qualifications', r.id) ?? r.qualification,
      r.id,
    ),
    evidenceIds: evidenceOf(r, document),
    recordedAt: date,
    attributes: { thought },
  });
}

// ---------------------------------------------------------------- events
const bodies = map.publicBodies as Record<string, Json>;
for (const e of pack.events as Json[]) {
  if (heldRecords[e.id]) {
    used.add(`hold:${e.id}`);
    continue;
  }
  const m = take<Json>('events', e.id);
  if (!m) throw new Error('An event without a map entry: ' + e.id);
  if (!bodies[m.subject]) throw new Error('Unknown body: ' + m.subject);
  if ((m.predicate === 'announced_plan') !== (m.stage === 'announced'))
    throw new Error('Announced stays announced: ' + e.id);
  if (
    m.stage !== (e.stage === 'stated-done' ? 'stated-done' : e.stage) ||
    (m.stage === 'under-way') !== /stated as under way$/.test(m.object)
  )
    throw new Error('Stage mismatch: ' + e.id);
  const eventDate = e.eventDate
    ? `The text dates the event itself ${e.eventDate === e.time.date ? 'to the same day' : `to ${e.eventDate}`}.`
    : undefined;
  addOnce('claims', {
    id: e.id,
    subject: m.subject,
    predicate: m.predicate,
    object: { kind: 'literal', value: smart(m.object) },
    topic: 'institutions',
    statement: prose(take<string>('statements', e.id) ?? e.statement, e.id),
    time: timeOf(e.time, e.id, eventDate),
    derivation: 'explicit',
    resolution: 'supported',
    editorialState: 'seed',
    qualification: prose(
      take<string>('qualifications', e.id) ?? e.qualification,
      e.id,
    ),
    evidenceIds: evidenceOf(e, null),
    recordedAt: date,
  });
}

// ---------------------------------------------------------- public bodies
for (const [id, b] of Object.entries(bodies)) {
  used.add(`publicBodies:${id}`);
  if (!added.claims.some((c) => c.subject === id))
    throw new Error('A public body without an event: ' + id);
  for (const k of b.sources as string[]) usedSources.add(k);
  addOnce('entities', {
    id,
    name: b.name,
    ...(b.shortName ? { shortName: b.shortName } : {}),
    type: 'public_body',
    subtype: b.subtype,
    aliases: b.aliases,
    description: b.description,
    sourceIds: (b.sources as string[]).map(sourceId),
  });
}

// ---------------------------------------------------------- documents
const voiceWords: Record<string, (d: Json) => string> = {
  institution: (d) =>
    `${d.subtype} published by the ${d.institution.replace(/^the /, '')} as its own text.`,
  official: (d) =>
    `${d.subtype} by ${d.authors.join(', ')}${d.speakerRole ? `, ${d.speakerRole}` : ''}. A speech or remarks are the speaker’s, not the ${d.institution}’s policy unless its own text says so.`,
  staff: (d) =>
    `${d.subtype} by ${d.authors.join(', ')}, published by the ${d.institution}. A staff paper is its authors’ text.`,
  committee: (d) =>
    `${d.subtype} of a committee, published by the ${d.institution}. A committee report is the committee’s text, not the authority’s policy unless the authority says so.`,
};
const docSources = new Map<string, string[]>();
for (const s of pack.sources as Json[])
  docSources.set(s.documentId, [
    ...(docSources.get(s.documentId) ?? []),
    s.key,
  ]);
for (const d of pack.documents as Json[]) {
  if (
    !added.claims.some(
      (c) =>
        c.subject === d.id ||
        (c.evidenceIds as string[]).some((eid) =>
          docSources
            .get(d.id)
            ?.some((k) => findAdded('evidence', eid)?.sourceId === sourceId(k)),
        ),
    )
  )
    throw new Error('A document without a record: ' + d.id);
  const keys = docSources.get(d.id) ?? [];
  for (const k of keys) usedSources.add(k);
  addOnce('entities', {
    id: d.id,
    name: smart(d.title),
    shortName: smart(d.shortName),
    type: 'document',
    subtype: d.subtype,
    aliases: [],
    description: prose(
      `${voiceWords[d.voice](d)} Dated ${d.date}.${d.occasion ? ` Occasion: ${d.occasion}.` : ''}`.replace(
        /\.\./g,
        '.',
      ),
      d.id,
    ),
    sourceIds: keys.map(sourceId),
  });
}

// ---------------------------------------------------------- propositions
const groupOf = new Map<string, string>();
for (const g of pack.groups as Json[])
  for (const c of g.codes as string[]) groupOf.set(c, g.label);
for (const p of packPropositions.propositions as Json[]) {
  const ids = new Set<string>();
  for (const c of added.claims)
    if ((c.object as Json).entityId === p.id)
      for (const eid of c.evidenceIds as string[])
        ids.add(findAdded('evidence', eid)!.sourceId as string);
  if (!ids.size) throw new Error('A proposition without records: ' + p.code);
  addOnce('entities', {
    id: p.id,
    name: smart(p.label),
    type: 'concept',
    subtype: 'Proposition',
    aliases: [],
    description: `A proposition about machine intelligence in money and finance, recorded with one criterion so that texts can be classified against it (code ${codes[p.code]} in ${map.collectionName}). A record says what a text states, not whether the proposition is true.`,
    sourceIds: [...ids].sort().slice(0, 3),
    proposition: {
      code: codes[p.code],
      criterion: smart(p.criterion),
      terms: p.terms,
    },
  });
}

// ---------------------------------------------------------------- sources
const kinds = map.sourceKinds as Record<string, string>;
for (const key of [...usedSources].sort()) {
  const s = packSources.get(key)!;
  // A supporting page that is no document's own expression (a landing
  // page giving a paper's date) has no document and is the publisher's.
  const d: Json = packDocuments.get(s.documentId) ?? {
    voice: 'institution',
    institution: s.publisher,
    date: null,
  };
  const own = packDocuments.has(s.documentId);
  const at = admission.sources[key];
  if (at?.httpStatus !== 200 && !at)
    throw new Error('No admission retrieval for ' + key);
  const fresh =
    at?.httpStatus === 200
      ? ` Retrieved again at admission on ${date}${at.sameFile ? ' (same file)' : ` (SHA-256 ${at.sha256}; web pages are served with new markup on each request)`}.`
      : ` At admission on ${date} the address answered HTTP ${at?.httpStatus ?? 'nothing'}; the quotations rest on the copy the pack read.`;
  const authors: string[] =
    d.voice === 'official' || d.voice === 'staff' || d.voice === 'committee'
      ? d.authors.length
        ? d.authors
        : [d.institution]
      : [d.institution];
  if (!kinds[s.kind]) throw new Error('No source kind for ' + s.kind);
  const url = String(s.url).split('?')[0];
  addOnce('sources', {
    id: sourceId(key),
    ...(own ? { documentId: s.documentId } : {}),
    title: smart(s.title),
    authors: authors.map(smart),
    publisher: smart(s.publisher),
    publicationDate: d.date,
    version: prose(
      `Retrieved for the candidate pack on ${s.retrievedAt} (SHA-256 ${s.sha256}).${fresh} ${s.version}`,
      key,
    ),
    canonicalUrl: url,
    evidenceUrl: url,
    language: s.language,
    documentWords: {
      count: s.documentWords.count,
      basis: prose(String(s.documentWords.basis), key),
    },
    kind: kinds[s.kind],
    accessedAt: at?.httpStatus === 200 ? date : s.retrievedAt,
    reuse: {
      attribution: smart(
        `${authors.join(', ')}, “${s.title}”${d.date ? `, ${d.date}` : ''}.`,
      ),
      licence: 'No open redistribution licence asserted',
      note: 'Bibliographic metadata, editorial paraphrases and short attributed quotations (at most 50 words each). Recheck terms before wider redistribution.',
    },
  });
}

// ---------------------------------------------------------------- limits
const normQ = (p: string) =>
  p
    .toLowerCase()
    .replace(/[‘’'“”"]/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
const limits: string[] = [];
const over: string[] = [];
for (const [key, set] of quoted) {
  const s = packSources.get(key)!;
  const all = new Set([...set].map(normQ));
  const total = [...all].reduce((n, p) => n + words(p), 0);
  const limit = maxQuotedWords(s.documentWords.count);
  limits.push(`${key}: ${total} of ${limit}`);
  // The dataset's rule, with its one-sentence allowance for short texts.
  if (!withinQuotationLimit(s.documentWords.count, [...set]))
    over.push(`${key}: ${total} of ${limit}`);
}
if (over.length)
  throw new Error('Over the quotation limit:\n' + over.join('\n'));

// ------------------------------------------------------------ held items
// The maintainer's answers to the held items of the corrections of
// 2026-11-06, in the operations of scripts/corrections-2026-11-06.ts.
type Entry = {
  key: string;
  input: string;
  op: 'set' | 'remove' | 'append' | 'add' | 'attachEvidence';
  table: Name;
  id?: string;
  path?: string;
  old?: unknown;
  new?: unknown;
  text?: string;
  row?: Row;
  evidenceId?: string;
  position?: 'first' | 'last';
};
const held = map.heldItems as { inputs: Json; entries: Entry[] };
const segments = (path: string) => path.split('.');
const at = (row: Json, path: string) =>
  segments(path).reduce<Json | undefined>(
    (v, k) => (v === undefined ? undefined : v[k]),
    row,
  );
const parentOf = (row: Json, path: string) =>
  segments(path)
    .slice(0, -1)
    .reduce<Json>((v, k) => (v[k] ??= {}), row);
const last = (path: string) => segments(path).at(-1)!;
function edit(e: Entry, apply: (row: Json) => void) {
  const row = (existing(e.table, e.id!) ?? findAdded(e.table, e.id!)) as
    Json | undefined;
  if (!row) throw new Error(`${e.key}: no ${e.table} row ${e.id}`);
  const before = JSON.stringify(row);
  if (existing(e.table, e.id!) && !changed[e.table].has(e.id!))
    changed[e.table].set(e.id!, structuredClone(row) as Row);
  apply(row);
  if (JSON.stringify(row) === before)
    throw new Error(`${e.key}: the entry changed nothing`);
}
function oldMatches(e: Entry, row: Json) {
  const current = at(row, e.path!);
  const expected = e.old === null && current === undefined ? undefined : e.old;
  if (!isDeepStrictEqual(current, expected))
    throw new Error(
      `${e.key}: ${e.table}/${e.id} ${e.path} is not the entry's old value`,
    );
}
for (const e of held.entries) {
  if (!held.inputs[e.input])
    throw new Error(`${e.key}: unknown input ${e.input}`);
  switch (e.op) {
    case 'add':
      addOnce(e.table, structuredClone(e.row!));
      break;
    case 'set':
      edit(e, (row) => {
        oldMatches(e, row);
        parentOf(row, e.path!)[last(e.path!)] = structuredClone(e.new);
      });
      break;
    case 'remove':
      edit(e, (row) => {
        oldMatches(e, row);
        delete parentOf(row, e.path!)[last(e.path!)];
      });
      break;
    case 'append':
      edit(e, (row) => {
        const current: unknown = at(row, e.path!);
        if (typeof current !== 'string')
          throw new Error(`${e.key}: ${e.path} is not text`);
        if (current.includes(e.text!))
          throw new Error(`${e.key}: the text is already there`);
        parentOf(row, e.path!)[last(e.path!)] =
          `${current.trimEnd()} ${e.text}`;
      });
      break;
    case 'attachEvidence':
      edit(e, (row) => {
        const ids = row.evidenceIds as string[];
        if (ids.includes(e.evidenceId!))
          throw new Error(`${e.key}: already attached`);
        const ev = findAdded('evidence', e.evidenceId!);
        if (!ev || ev.claimId !== e.id)
          throw new Error(`${e.key}: no added evidence of this claim`);
        if (e.position === 'first') ids.unshift(e.evidenceId!);
        else ids.push(e.evidenceId!);
      });
      break;
    default:
      throw new Error(`${e.key}: unknown operation`);
  }
}
// Every added evidence row belongs to a claim that lists it.
for (const ev of added.evidence) {
  const claim = (existing('claims', ev.claimId as string) ??
    findAdded('claims', ev.claimId as string)) as Json | undefined;
  if (!claim?.evidenceIds.includes(ev.id))
    throw new Error(`Added evidence not listed by its claim: ${ev.id}`);
}

// ------------------------------------------------- every entry was used
const sections = [
  'hold',
  'events',
  'publicBodies',
  'qualifications',
  'statements',
  'missing',
  'evidenceNotes',
];
const unused = sections.flatMap((s) =>
  Object.keys(map[s] ?? {})
    .map((k) => `${s}:${k}`)
    .filter((k) => !used.has(k)),
);
for (const [from] of replacements)
  if (!replaced.has(from)) unused.push(`textReplacements:${from}`);
if (unused.length)
  throw new Error('Map entries that changed nothing:\n' + unused.join('\n'));

// A rerun must not undo a later edit to a changed row.
if (snapshot && !check)
  for (const n of names)
    for (const id of changed[n].keys()) {
      const now = stored[n].find((r) => r.id === id);
      const mine = index[n].get(id);
      if (JSON.stringify(mine) !== JSON.stringify(now))
        throw new Error(
          `${n}/${id} differs from the changed row; a later edit would be lost. Compare with --check.`,
        );
    }

// ---------------------------------------------------------------- output
const meta = {
  ...base.meta,
  schemaVersion: '2.33',
  updatedAt: date > base.meta.updatedAt ? date : base.meta.updatedAt,
  scope: `${base.meta.scope} ${map.scope}`,
};
const result = Object.fromEntries(
  names.map((n) => [n, [...base[n], ...added[n]]]),
) as Record<Name, Row[]>;
const newSnapshot = {
  description: map.snapshotDescription,
  baseCommit:
    storedSnapshot && !baseArg ? storedSnapshot.baseCommit : baseCommit,
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
  'data/meta.json': meta,
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
  if (args.includes('--limits'))
    for (const l of limits) console.log('Quoted: ' + l);
  console.log(
    `Added ${names.map((n) => `${added[n].length} ${n}`).join(', ')}; changed ${names.map((n) => `${changed[n].size} ${n}`).join(', ')}; ${held.entries.length} held-item entries; base ${baseCommit.slice(0, 8)}.`,
  );
}
