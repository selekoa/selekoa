// Admits the candidate pack research/prehistory into the dataset as the
// collection “Antecedent texts: machine intelligence before 1965”, using the
// authored map in review/prehistory-admission-map-2026-11-04.json, the
// maintainer’s decisions of 2026-11-03 and 2026-11-04 (review/decisions/
// answers-2026-11-03.md) and the admission plan
// (review/prehistory-admission-plan-2026-11-04.md).
//
//   pnpm tsx scripts/prehistory-admission.ts --verify   match the text sources’ quotations in a fresh retrieval
//   pnpm tsx scripts/prehistory-admission.ts            write the records and the before-snapshot
//   pnpm tsx scripts/prehistory-admission.ts --check    compare with the stored records
//   pnpm tsx scripts/prehistory-admission.ts --base <commit>
//                                         rebuild on a new base: the snapshot names that base commit
//
// `--verify` retrieves each source that has a text layer into the ignored
// cache (.local/prehistory/doc, via research/prehistory/tools.py fetch) and
// writes research/prehistory/admission-verification-2026-11-04.json; the
// admission reads that file and never the cache. Page-image sources cannot be
// matched mechanically; their records carry the pack’s reading notes.
//
// Adapted from scripts/heterodox-admission.ts (same unit of record). The
// script runs on whatever base it finds: where the stored data holds every
// row its before-snapshot lists as added, it first removes those rows and
// restores the rows it changed; otherwise it builds on the stored data as it
// is. Every map entry must change a record.
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
const map: Json = read('review/prehistory-admission-map-2026-11-04.json');
const date: string = map.admissionDate;
const pack: Json = read(map.files.pack);
const packPropositions: Json = read(map.files.propositions);
const words = (s: string) =>
  s.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;

const packSources = new Map<string, Json>(
  pack.sources.map((s: Json) => [s.key, s]),
);
const packDocuments = new Map<string, Json>(
  pack.documents.map((d: Json) => [d.id, d]),
);
const heldRecords = map.hold as Record<string, string>;
const heldLinks = map.holdLinks as Record<string, string>;
const isTextSource = (s: Json) => !s.visualOnly && !s.matchedElsewhere;

/** The pack’s normaliser (research/prehistory/tools.py norm), ported. */
function norm(s: string) {
  let t = s.normalize('NFKC').replace(/­/g, '').replace(/_/g, '');
  t = t.replace(/-\s*\n\s*/g, '');
  const fold: Record<string, string> = {
    '‘': "'",
    '’': "'",
    '“': '"',
    '”': '"',
    '—': '-',
    '–': '-',
    '\u00a0': ' ',
    ſ: 's',
  };
  t = t.replace(/[‘’“”—–\u00a0ſ]/g, (c) => fold[c]);
  t = t.replace(/\s+/g, ' ').replace(/\s+([?!;:,.])/g, '$1');
  return t.trim().toLowerCase();
}
const parts = (q: string) =>
  q
    .split(/\s*\[(?:…|\.\.\.)\]\s*|\s*…\s*/)
    .filter((p) => p.trim())
    .map(norm);

// ---------------------------------------------------------------- verify
/** Every quotation the admission takes from a source with a text layer. */
function textQuotes() {
  const out: { key: string; source: string; text: string }[] = [];
  for (const r of [...pack.records, ...pack.links] as Json[]) {
    if (heldRecords[r.id] || heldLinks[r.id]) continue;
    (r.evidence as Json[]).forEach((e, i) => {
      const s = packSources.get(e.source)!;
      if (e.passageType === 'quote' && isTextSource(s))
        out.push({
          key: `${r.id}:${i}`,
          source: e.source,
          text: e.matchText ?? e.passage,
        });
    });
  }
  for (const a of map.authored as Json[]) {
    const s = packSources.get(a.source)!;
    if (isTextSource(s))
      out.push({
        key: `authored:${a.document}`,
        source: a.source,
        text: a.passage,
      });
  }
  return out;
}

if (args.includes('--verify')) {
  const cache = '.local/prehistory/doc';
  const sources: Json = {};
  const quotes: Json = {};
  const fetched = new Set<string>();
  for (const q of textQuotes()) {
    const s = packSources.get(q.source)!;
    if (!fetched.has(q.source) && !args.includes('--cached')) {
      fetched.add(q.source);
      execFileSync(
        'python3',
        ['-I', 'research/prehistory/tools.py', 'fetch', s.cacheKey, s.url],
        { stdio: 'ignore' },
      );
    }
    const meta: Json | null = existsSync(`${cache}/${s.cacheKey}.json`)
      ? read(`${cache}/${s.cacheKey}.json`)
      : null;
    const text =
      meta?.httpStatus === 200 && existsSync(`${cache}/${s.cacheKey}.txt`)
        ? norm(readFileSync(`${cache}/${s.cacheKey}.txt`, 'utf8'))
        : '';
    sources[q.source] ??= {
      url: s.url.split('?')[0],
      httpStatus: meta?.httpStatus ?? null,
      sha256: meta?.sha256 ?? null,
      packSha256: s.sha256,
      sameFile: meta?.sha256 === s.sha256,
      retrievedAt: meta?.retrievedAt ?? null,
    };
    quotes[q.key] = {
      source: q.source,
      words: words(q.text),
      found: Boolean(text) && parts(q.text).every((p) => text.includes(p)),
    };
  }
  const result = {
    checkedAt: date,
    method:
      'Each quotation the admission takes from a source with a text layer was matched in a fresh retrieval with the pack’s normaliser (research/prehistory/tools.py norm, ported to the admission script): Unicode compatibility forms, curly quotes and dashes folded, hyphenated line breaks rejoined, whitespace collapsed, case folded; the parts on either side of a marked omission are matched separately. Where the pack gives a match text for an image reading, that text is matched. Page-image sources (the 1637 Discours, the PubMed Central scans of Jefferson, the Turing typescripts and the National Physical Laboratory facsimile, the Omni scan and the Science page images) have no usable text layer and are not matched here; their records carry the pack’s reading notes. Papers Past serves a different page wrapper on each request, so its file hashes differ while the article text is the same.',
    sources: Object.fromEntries(Object.entries(sources).sort()),
    quotes,
  };
  writeFileSync(map.files.admission, JSON.stringify(result, null, 2) + '\n');
  execFileSync('pnpm', ['prettier', '--write', map.files.admission], {
    stdio: 'ignore',
  });
  const missing = Object.entries(quotes).filter(([, q]) => !(q as Json).found);
  console.log(
    `${Object.keys(quotes).length} quotations from ${Object.keys(sources).length} text sources; not matched: ${missing.length}`,
  );
  for (const [k] of missing) console.log('  ' + k);
  process.exit(missing.length ? 1 : 0);
}

// ---------------------------------------------------------------- base
const snapshotPath = `review/prehistory-admission-before-${date}.json`;
const admission: Json = read(map.files.admission);
const packVerification: Json = read(map.files.verification);

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
  const before = JSON.stringify(row);
  if (!changed[n].has(id)) changed[n].set(id, structuredClone(row));
  edit(row);
  if (JSON.stringify(row) === before)
    throw new Error(`A map entry changed nothing: ${n} ${id}`);
}

/** Every map entry must be used; each use is recorded here. */
const used = new Set<string>();
const use = <T>(section: string, key: string, value: T): T => {
  if (value !== undefined) used.add(`${section}:${key}`);
  return value;
};

// --------------------------------------------------------------- wording
const allPackIds = new Set<string>([
  ...pack.records.map((r: Json) => r.id),
  ...pack.links.map((l: Json) => l.id),
]);
const idToken = /\b(?:pre|ts|ht|ec|th|ap)-[a-z0-9]+(?:-[a-z0-9]+)+\b/g;
/** Research-pack wording that must not reach a reader. */
const packWording =
  /\b(decision \d+[a-z]?|the pack|this pack|pack’s|cross-family|audit \w\d|A2\.\d|item [A-Z]\d|review note|admission plan|increment|Codex|Proposed as|As above|As the [A-Z]\d+ record)/i;
/** Straight quotation marks to typographic ones. */
const smart = (s: string) =>
  s
    .replace(/(^|[\s(“[—–-])'/g, '$1‘')
    .replace(/'/g, '’')
    .replace(/(^|[\s(‘[—–-])"/g, '$1“')
    .replace(/"/g, '”');
function prose(text: string, where: string) {
  let out = text;
  for (const [from, to] of map.textReplacements as [string, string][])
    out = out.split(from).join(to);
  out = smart(out);
  const id = (out.match(idToken) ?? []).find(
    (t) =>
      allPackIds.has(t) ||
      existing('claims', t) ||
      added.claims.some((c) => c.id === t),
  );
  if (id) throw new Error(`Record ID left in ${where}: ${id}`);
  const left = out.match(packWording);
  if (left) throw new Error(`Research-pack wording in ${where}: ${left[0]}`);
  return out;
}

// --------------------------------------------------------- IDs and dates
const conceptId = (code: string): string => {
  const id = map.propositions[code];
  if (!id) throw new Error('No proposition mapping: ' + code);
  return id;
};
const newDocuments = map.newDocuments as Record<string, Json>;
const documentRow = (id: string) =>
  existing('entities', id) ?? (newDocuments[id] ? { id } : undefined);

function timeOf(document: string): Json {
  const from = map.documentTimes[document] as string | undefined;
  if (from) {
    used.add(`documentTimes:${document}`);
    const c = existing('claims', from);
    if (!c || c.subject !== document)
      throw new Error(`No dated record of ${document}: ${from}`);
    return structuredClone(c.time as Json);
  }
  const t = map.newTimes[document];
  if (!t) throw new Error('No time for document ' + document);
  used.add(`newTimes:${document}`);
  return structuredClone(t);
}

// ---------------------------------------------------------- evidence
const usedSources = new Set<string>();
const quoted = new Map<string, Set<string>>();
const sourceId = (key: string): string => {
  const s = packSources.get(key);
  if (!s) throw new Error('Unknown source: ' + key);
  if (s.datasetSource) {
    if (!existing('sources', s.datasetSource))
      throw new Error('No dataset source: ' + s.datasetSource);
    return s.datasetSource;
  }
  if (!map.newSources[key]) throw new Error('No new-source mapping: ' + key);
  return `source-pre-${key}`;
};

const lead = 'Candidate pack passage, antecedent texts (research/prehistory).';
function matchNote(recordId: string, index: number, e: Json) {
  const s = packSources.get(e.source)!;
  if (e.passageType !== 'quote')
    return 'The paraphrase is Selekoa’s, written from the text read for the candidate pack; it is not a quotation and was not machine-matched.';
  if (isTextSource(s)) {
    const fresh = admission.quotes[`${recordId}:${index}`];
    const at = admission.sources[e.source];
    if (!fresh?.found)
      throw new Error(
        `Quotation not matched at admission: ${recordId}:${index}`,
      );
    return `The quotation (${words(e.passage)} words) matched a fresh retrieval of ${date}${at.sameFile ? ` (SHA-256 ${String(at.sha256).slice(0, 12)}…, the file the candidate pack read)` : ''}. Matching ignored differences of whitespace, case, quotation marks, dashes, line-break hyphens and Unicode compatibility forms, so the source’s typography can differ.`;
  }
  const v = (packVerification.results as Json[]).find(
    (x) => x.record === recordId && x.item === index,
  );
  if (v?.match !== 'page-image-read')
    throw new Error(
      `Page-image passage without a reading: ${recordId}:${index}`,
    );
  return `Read on the page image for the candidate pack; it could not be matched mechanically. ${s.visualOnly}`;
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
        : prose(e.passage.replace(/^Paraphrase:\s*/, ''), eid),
    passageType: e.passageType,
    verification: 'machine_checked',
    checkedAt: date,
    note: prose(note, eid),
    retrievalRoute: 'direct',
  };
}

function evidenceOf(r: Json): string[] {
  const ids: string[] = [];
  const noSupport = (r.evidence as Json[]).every(
    (e) => e.support !== 'supports',
  );
  (r.evidence as Json[]).forEach((raw, index) => {
    // A record's own passage supports what the record says, also where the
    // pack marks a context record's passages as context only.
    const e = index === 0 && noSupport ? { ...raw, support: 'supports' } : raw;
    const eid = `evidence-${r.id}-${index + 1}`;
    const own = use(
      'evidenceNotes',
      `${r.id}:${index}`,
      map.evidenceNotes[`${r.id}:${index}`] as string | undefined,
    );
    const note = [
      lead,
      matchNote(r.id, index, e),
      // The reading note already says the passage was read on the image.
      (own ?? e.note ?? '').replace(
        isTextSource(packSources.get(e.source)!)
          ? /^$/
          : /^Read (?:here )?on the (?:PubMed Central )?page image(?: \(2026-11-04\))?[.;]?\s*/,
        '',
      ),
      'No human editorial review.',
    ]
      .filter(Boolean)
      .join(' ');
    addOnce('evidence', evidenceRow(r.id, eid, e, note));
    ids.push(eid);
  });
  return ids;
}

// ---------------------------------------------------------------- records
for (const id of Object.keys(heldRecords))
  if (!pack.records.some((r: Json) => r.id === id))
    throw new Error('Held record not in the pack: ' + id);
for (const id of Object.keys(heldLinks))
  if (!pack.links.some((r: Json) => r.id === id))
    throw new Error('Held link not in the pack: ' + id);

for (const r of pack.records as Json[]) {
  if (heldRecords[r.id]) {
    used.add(`hold:${r.id}`);
    continue;
  }
  const document = r.document as string;
  if (!documentRow(document)) throw new Error('No document row: ' + document);
  const stance = (r.predicate as string).replace('_proposition', '');
  const roles: string[] = use('roles', r.id, map.roles[r.id]) ?? [...r.roles];
  if (stance === 'contests' && !roles.includes('contesting'))
    throw new Error('A contesting record without the contesting role: ' + r.id);
  const thought: Json = { roles, register: r.register };
  if (roles.includes('earliest-located-term')) {
    if (!r.term) throw new Error('A term role without its term: ' + r.id);
    thought.term = r.term;
  }
  const missing = use('missing', r.id, map.missing[r.id]) ?? r.missing;
  if (stance === 'bears_on') {
    if (!missing)
      throw new Error('A context record without “missing”: ' + r.id);
    thought.missing = prose(missing, r.id);
  }
  const claimed = map.claimed[document];
  if (claimed) {
    used.add(`claimed:${document}`);
    thought.claimed = claimed;
  } else if (r.claimed) throw new Error('Unmapped claimed date: ' + r.id);
  const attested = map.attested[document];
  if (attested) {
    used.add(`attested:${document}`);
    thought.attested = attested;
  } else if (r.attested) throw new Error('Unmapped attested date: ' + r.id);
  if (stance === 'contests' && r.engagement)
    thought.engagement = {
      kind: r.engagement.kind,
      rationale: prose(r.engagement.rationale, r.id),
    };
  const tier = use('tier', r.id, map.tier[r.id]);
  if (tier) thought.tier = tier;
  else if (r.tier) throw new Error('Unmapped tier: ' + r.id);

  const qualification = prose(
    use('qualifications', r.id, map.qualifications[r.id]) ?? r.qualification,
    r.id,
  );
  const evidenceIds = evidenceOf(r);
  addOnce('claims', {
    id: r.id,
    subject: document,
    predicate: r.predicate,
    object: { kind: 'entity', entityId: conceptId(r.proposition) },
    topic: 'ideas',
    statement: prose(r.statement, r.id),
    time: timeOf(document),
    derivation: 'explicit',
    resolution: 'supported',
    editorialState: 'seed',
    qualification,
    evidenceIds,
    recordedAt: date,
    attributes: { thought },
  });
}

// ---------------------------------------------------------------- links
for (const l of pack.links as Json[]) {
  if (heldLinks[l.id]) {
    used.add(`holdLinks:${l.id}`);
    continue;
  }
  if (
    !l.to ||
    !documentRow(l.to) ||
    existing('entities', l.to)?.type === 'person'
  )
    throw new Error(`A link without a document target: ${l.id}`);
  if (!documentRow(l.from)) throw new Error('No document row: ' + l.from);
  const evidenceIds = evidenceOf(l);
  addOnce('claims', {
    id: l.id,
    subject: l.from,
    predicate: l.predicate,
    object: { kind: 'entity', entityId: l.to },
    topic: 'ideas',
    statement: prose(l.statement, l.id),
    time: timeOf(l.from),
    derivation: 'explicit',
    resolution: 'supported',
    editorialState: 'seed',
    qualification: prose(
      use('qualifications', l.id, map.qualifications[l.id]) ?? l.qualification,
      l.id,
    ),
    evidenceIds,
    recordedAt: date,
  });
}

// --------------------------------------------------------- authorship
for (const a of map.authored as Json[]) {
  if (existing('entities', a.person)?.type !== 'person')
    throw new Error('No person entity: ' + a.person);
  const id = `pre-ap-${a.person}-${a.document}`;
  const eid = `evidence-${id}`;
  const s = packSources.get(a.source)!;
  const t = timeOf(a.document);
  let reading: string;
  if (isTextSource(s)) {
    const fresh = admission.quotes[`authored:${a.document}`];
    if (!fresh?.found) throw new Error('Byline not matched: ' + a.document);
    reading = `The byline matched a fresh retrieval of ${date}.`;
  } else
    reading = `Read on the page image of the title sheet for the candidate pack. ${s.visualOnly}`;
  addOnce(
    'evidence',
    evidenceRow(
      id,
      eid,
      {
        source: a.source,
        locator: a.locator,
        passage: a.passage,
        passageType: 'quote',
      },
      `${lead} ${reading} No human editorial review.`,
    ),
  );
  addOnce('claims', {
    id,
    subject: a.person,
    predicate: 'authored',
    object: { kind: 'entity', entityId: a.document },
    topic: 'ideas',
    statement: `“${a.title}” (${t.date}) credits ${a.credit} as its author.`,
    time: {
      kind: 'event',
      date: t.date,
      ...(t.basis ? { basis: t.basis } : {}),
      note: 'Date of the text as recorded on its document; authorship is credited in the inspected expression.',
    },
    derivation: 'explicit',
    resolution: 'supported',
    editorialState: 'seed',
    qualification:
      'Credited authorship of this expression; it says nothing about priority for the ideas discussed.',
    evidenceIds: [eid],
    recordedAt: date,
  });
}

// ---------------------------------------------------------- documents
for (const [id, d] of Object.entries(newDocuments)) {
  used.add(`newDocuments:${id}`);
  const p = packDocuments.get(id);
  if (!p || p.existingEntity) throw new Error('Not a new pack document: ' + id);
  if (
    !added.claims.some(
      (c) => c.subject === id || (c.object as Json).entityId === id,
    )
  )
    throw new Error('A new document without a record: ' + id);
  for (const k of d.sources as string[]) usedSources.add(k);
  addOnce('entities', {
    id,
    name: smart(p.title),
    shortName: smart(p.shortName),
    type: 'document',
    subtype: d.subtype,
    aliases: [],
    description: prose(d.description, id),
    sourceIds: (d.sources as string[]).map(sourceId),
  });
}
for (const c of added.claims)
  for (const id of [c.subject as string, (c.object as Json).entityId])
    if (
      !existing('entities', id) &&
      !added.entities.some((e) => e.id === id) &&
      !Object.values(map.propositions).includes(id)
    )
      throw new Error('A record names an entity without a row: ' + id);

// --------------------------------------------------------- propositions
for (const code of map.newPropositions as string[]) {
  const p = (packPropositions.propositions as Json[]).find(
    (x) => x.code === code,
  );
  if (!p || p.id !== conceptId(code))
    throw new Error('Proposition mismatch: ' + code);
  const ids = new Set<string>();
  for (const c of added.claims)
    if ((c.object as Json).entityId === p.id)
      for (const eid of c.evidenceIds as string[])
        ids.add(added.evidence.find((e) => e.id === eid)!.sourceId as string);
  if (!ids.size) throw new Error('A proposition without records: ' + code);
  addOnce('entities', {
    id: p.id,
    name: p.label,
    type: 'concept',
    subtype: 'Proposition',
    aliases: [],
    description: `A proposition about machine intelligence, recorded with one criterion so that texts can be classified against it (code ${code} in ${map.collectionName}). A record says what a text states, not whether the proposition is true.`,
    sourceIds: [...ids].sort().slice(0, 3),
    proposition: {
      code,
      criterion: smart(p.criterion),
      terms: p.terms,
    },
  });
}

// ------------------------------------------- changes to stored records
for (const [id, ch] of Object.entries(map.changes as Record<string, Json>)) {
  used.add(`changes:${id}`);
  changeRow('claims', id, (row) => {
    const thought = (row.attributes as Json).thought;
    if (ch.roles) thought.roles = ch.roles;
    if (ch.dropSentence) {
      const q = row.qualification as string;
      if (!q.endsWith(ch.dropSentence))
        throw new Error('Sentence to drop not found: ' + id);
      row.qualification = q.slice(0, -ch.dropSentence.length);
    }
  });
}
for (const [id, sentence] of Object.entries(
  map.criterionAdditions as Record<string, string>,
)) {
  used.add(`criterionAdditions:${id}`);
  changeRow('entities', id, (row) => {
    const p = row.proposition as Json;
    if (p.criterion.includes(sentence)) return;
    p.criterion = `${p.criterion} ${sentence}`;
  });
}

// ---------------------------------------------------------------- sources
const reuseNote =
  'Bibliographic metadata, editorial paraphrases and short attributed quotations (at most 50 words each). Recheck terms before wider redistribution.';
for (const key of [...usedSources].sort()) {
  const id = sourceId(key);
  if (existing('sources', id)) continue;
  const s = packSources.get(key)!;
  const x: Json = map.newSources[key];
  used.add(`newSources:${key}`);
  const documentId: string = x.documentId ?? s.documentId;
  if (!added.entities.some((e) => e.id === documentId))
    throw new Error('A new source without its document: ' + key);
  const at = admission.sources[key];
  const retrieval =
    isTextSource(s) && at
      ? `Retrieved for the candidate pack on ${s.retrievedAt} (SHA-256 ${s.sha256}) and again at admission on ${date}${at.sameFile ? ' (same file)' : ` (SHA-256 ${at.sha256})`}.`
      : `Retrieved for the candidate pack on ${s.retrievedAt} (SHA-256 ${s.sha256}).`;
  const version = [retrieval, s.version, x.versionNote ?? '']
    .filter(Boolean)
    .join(' ');
  const url = String(s.url).split('?')[0];
  const docDate = String(timeOf(documentId).date);
  addOnce('sources', {
    id,
    documentId,
    title: smart(s.title),
    authors: (s.authors as string[]).map(smart),
    publisher: smart(s.publisher),
    publicationDate: docDate,
    version: prose(version, id),
    canonicalUrl: x.canonicalUrl ?? s.catalogueUrl ?? s.scanUrl ?? url,
    evidenceUrl: url,
    language: s.language,
    documentWords: {
      count: s.documentWords.count,
      basis: prose(String(s.documentWords.basis), id),
    },
    kind: x.kind,
    accessedAt: isTextSource(s) ? date : s.retrievedAt,
    reuse: {
      attribution: smart(
        `${(s.authors as string[]).join(', ')}, “${s.title}”, ${docDate}.`,
      ),
      licence: x.licence ?? 'No open redistribution licence asserted',
      note: reuseNote,
    },
  });
}

// A base source that had no length gains the pack's count, so that the
// quotation limit can be checked; nothing else about it changes.
for (const key of usedSources) {
  const s = packSources.get(key)!;
  const id = sourceId(key);
  const row = existing('sources', id);
  if (!row || row.documentWords || !quoted.has(id)) continue;
  if (!s.documentWords?.count)
    throw new Error('No length for the quoted source ' + key);
  changeRow('sources', id, (r) => {
    r.documentWords = {
      count: s.documentWords.count,
      basis: prose(
        `${String(s.documentWords.basis).replace(/\.$/, '')}; counted for the candidate pack of antecedent texts.`,
        id,
      ),
    };
  });
}

// ---------------------------------------------------------------- limits
const normQ = (p: string) =>
  p
    .toLowerCase()
    .replace(/[‘’'“”"]/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
const overLimit: string[] = [];
const limits: string[] = [];
for (const id of quoted.keys()) {
  const row = added.sources.find((s) => s.id === id) ?? existing('sources', id);
  const length = (row?.documentWords as Json)?.count;
  const all = new Set<string>([...quoted.get(id)!].map(normQ));
  for (const e of base.evidence)
    if (e.sourceId === id && e.passageType === 'quote')
      all.add(normQ(e.passage as string));
  const total = [...all].reduce((n, p) => n + words(p), 0);
  const limit = length ? maxQuotedWords(length) : undefined;
  limits.push(`${id}: ${total} of ${limit ?? '?'}`);
  if (!limit || total > limit)
    overLimit.push(`${id}: ${total} quoted words, limit ${limit ?? '?'}`);
}
if (overLimit.length)
  throw new Error('Over the quotation limit:\n' + overLimit.join('\n'));

// ------------------------------------------------- every entry was used
const entries = [
  ...Object.keys(map.hold).map((k) => `hold:${k}`),
  ...Object.keys(map.holdLinks).map((k) => `holdLinks:${k}`),
  ...Object.keys(map.documentTimes).map((k) => `documentTimes:${k}`),
  ...Object.keys(map.newTimes).map((k) => `newTimes:${k}`),
  ...Object.keys(map.claimed).map((k) => `claimed:${k}`),
  ...Object.keys(map.attested).map((k) => `attested:${k}`),
  ...Object.keys(map.tier).map((k) => `tier:${k}`),
  ...Object.keys(map.roles).map((k) => `roles:${k}`),
  ...Object.keys(map.qualifications).map((k) => `qualifications:${k}`),
  ...Object.keys(map.missing).map((k) => `missing:${k}`),
  ...Object.keys(map.evidenceNotes).map((k) => `evidenceNotes:${k}`),
  ...Object.keys(map.changes).map((k) => `changes:${k}`),
  ...Object.keys(map.criterionAdditions).map((k) => `criterionAdditions:${k}`),
  ...Object.keys(map.newSources).map((k) => `newSources:${k}`),
  ...Object.keys(map.newDocuments).map((k) => `newDocuments:${k}`),
];
const unused = entries.filter((e) => !used.has(e));
if (unused.length)
  throw new Error('Map entries that changed nothing:\n' + unused.join('\n'));
for (const [from] of map.textReplacements as [string, string][])
  if (
    !JSON.stringify([...pack.records, ...pack.links, ...pack.sources]).includes(
      from,
    )
  )
    throw new Error('A text replacement that matches nothing: ' + from);

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
  for (const l of limits) console.log('Quoted: ' + l);
  for (const id of Object.keys(heldRecords)) console.log('Held record: ' + id);
  for (const id of Object.keys(heldLinks)) console.log('Held link: ' + id);
  console.log(
    `Added ${names.map((n) => `${added[n].length} ${n}`).join(', ')}; changed ${names.map((n) => `${changed[n].size} ${n}`).join(', ')}; base ${baseCommit.slice(0, 8)}.`,
  );
}
