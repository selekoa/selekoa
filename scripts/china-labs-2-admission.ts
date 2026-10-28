// Admits the second Chinese frontier-AI institutions collection
// (research/china-labs-2) into the dataset, using the authored map in
// review/china-labs-2-admission-map-2026-10-27.json and the maintainer's
// decisions of 2026-10-27 (review/china-labs-2-admission-2026-10-27.md).
// No schema change: every record uses an existing predicate.
//
//   pnpm tsx scripts/china-labs-2-admission.ts           write the records
//   pnpm tsx scripts/china-labs-2-admission.ts --check   compare with the stored records
//
// The script is idempotent: it first removes the rows listed as added in the
// before-snapshot (review/china-labs-2-before-2026-10-27.json) and restores
// the rows it changed, then rebuilds them. The pack is never changed.
//
// Every admitted passage matched both the drafting retrieval and a fresh
// retrieval (verification.json), or is a part of such a passage, or is a
// transcription of the AIIA image, or was read at admission from a direct
// retrieval whose SHA-256 equals the pack's; the map says which.
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { maxQuotedWords } from '../src/domain/schema';

const date = '2026-10-27';
const dir = 'research/china-labs-2';
const files = {
  pack: `${dir}/pack.json`,
  verification: `${dir}/verification.json`,
  verdicts: `${dir}/cross-family-check-verdicts-${date}.json`,
  check: `${dir}/codex-check-${date}.md`,
  map: `review/china-labs-2-admission-map-${date}.json`,
  snapshot: `review/china-labs-2-before-${date}.json`,
};
const names = ['entities', 'claims', 'sources', 'evidence'] as const;
type Name = (typeof names)[number];
type Row = Record<string, unknown> & { id: string };
type Json = Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any

const read = (path: string) => JSON.parse(readFileSync(path, 'utf8'));
const pack: Json = read(files.pack);
const verification: Json = read(files.verification);
const map: Json = read(files.map);
const check = process.argv.includes('--check');

// The cross-family check: item code per claim, and its verdict per item from
// the report's summary table.
const itemOf = new Map<string, string>(
  read(files.verdicts).items.map((x: Json) => [x.claimId, x.item]),
);
const verdictOf = new Map<string, string>();
for (const line of readFileSync(files.check, 'utf8').split('\n')) {
  const m = line.match(/^\| (K\d{3}) \| .* \| (supported|partly)\b/);
  if (m) verdictOf.set(m[1], m[2]);
}
if (verdictOf.size !== 63) throw new Error('Expected 63 cross-family verdicts');

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
const cjk = /[぀-ヿ㐀-鿿豈-﫿]/g;
const packWords = (s: string) =>
  (s.match(cjk) ?? []).length +
  s
    .replace(cjk, ' ')
    .split(/\s+/)
    .filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
const hasCjk = (s: string) => /[㐀-鿿]/.test(s);
const squash = (s: string) => s.replace(/\s+/g, '');
const routeOf: Record<string, string> = {
  direct: 'direct',
  relay: 'reader_relay',
};
const routePhrase: Record<string, string> = {
  direct: 'directly from the publisher',
  relay:
    'through the third-party reader relay r.jina.ai, which renders the publisher’s current page (direct retrieval failed); not an archive copy',
};
const machine = (text: string) =>
  `English machine translation, not verified by a person: “${text}”.`;

const packSources = new Map<string, Json>(
  pack.sources.map((s: Json) => [s.id, s]),
);
/** The dataset ID a pack source becomes. */
const sourceId = (id: string) => {
  const s = packSources.get(id);
  if (!s) throw new Error('Unknown pack source: ' + id);
  return (s.datasetSourceId as string) ?? id;
};
const knownIds = new Set<string>([
  ...pack.claims.map((c: Json) => c.id),
  ...pack.claims.flatMap((c: Json) => c.evidence.map((e: Json) => e.id)),
  ...pack.sources.map((s: Json) => s.id),
  ...names.flatMap((n) => base[n].map((r) => r.id)),
]);
/** Reader-facing text never names a record ID. */
function noIds(text: string, where: string) {
  const left = (text.match(/\b[a-z0-9]+(?:-[a-z0-9]+)+\b/g) ?? []).filter((w) =>
    knownIds.has(w),
  );
  if (left.length) throw new Error(`Record ID left in ${where}: ${left}`);
  return text;
}
const loaded =
  /\b(poach(ed|ing)?|ousted?|defect(ed|ion)?|exodus|rivals?|betray\w*|purge\w*)\b/i;

// Decision 3: a licence, a prospectus or a technical report is not a
// framework or commitment edition, so its statements are ordinary records of
// what the document states, made by its publisher.
const providers: Record<string, string> = map.providers;
// Decision 4: co-named organisations are credited by the document.
const credited = new Set(
  Object.entries(map.claims as Record<string, Json>)
    .filter(([, plan]) => plan.predicate === 'explicitly_credits')
    .map(([id]) => id),
);

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
for (const key of [
  'claims',
  'evidence',
  'shorten',
  'locators',
  'entities',
  'sources',
])
  for (const id of Object.keys(map[key] ?? {})) used.add(`${key}:${id}`);
const take = (key: string, id: string): Json | undefined => {
  used.delete(`${key}:${id}`);
  return map[key]?.[id];
};

/** The note of an admitted evidence row. */
function evidenceNote(
  c: Json,
  e: Json,
  extra: {
    split?: boolean;
    transcribed?: string;
    added?: string;
    shortened?: boolean;
  },
) {
  const s = packSources.get(e.sourceId)!;
  const verbatim: string = e.passageType === 'quote' ? e.passage : e.anchor;
  const item = itemOf.get(c.id);
  const verdict = item && verdictOf.get(item);
  const elided = e.passageType === 'quote' && /…|\.\.\./.test(e.passage);
  const route = routePhrase[s.retrieval.route];
  let checkText: string;
  if (extra.transcribed === 'commitment' || extra.transcribed === 'cover')
    checkText = `Transcription of text that appears only in the image embedded in the post (${e.items}); it is not in the page’s text layer and was not machine-matched. The drafting pass read the image visually, and the cross-family check (2026-10-27) read the image’s cover, Commitments I, II and VI and all 17 listed names and found them in agreement with the pack’s reading.${extra.transcribed === 'commitment' ? ' The same wording appears in the text reproduction of itcloudbd.com, recorded as separate evidence.' : ''}`;
  else if (extra.transcribed === 'list')
    checkText = `Transcription of a name that appears only in the image embedded in the post (the list of initial signatories); it is not in the page’s text layer and was not machine-matched. The drafting pass and the same-family audit read the list visually, and the cross-family check (2026-10-27) read all 17 names and agreed. The paraphrase is Selekoa’s; the listed name is transcribed as printed.`;
  else if (extra.transcribed === 'pdf')
    checkText = `Transcribed as printed. The passage matched the retrieved text on ${date} and again in a fresh retrieval the same day, read ${route}; in the PDF’s text layer it contains control characters (U+0001) and compatibility forms (Kangxi radicals, ⻛ for 风, ⻅ for 见), which the candidate pack marked with ellipses. The cross-family check found that those ellipses do not reproduce the printed text (K047), so the quotation was re-extracted at admission, without them and with the forms normalised, from a direct retrieval of the PDF whose SHA-256 equals the pack’s.`;
  else if (extra.added) checkText = `${extra.added}`;
  else
    checkText = `${
      e.passageType === 'quote'
        ? `The quotation (${packWords(e.passage)} words${hasCjk(e.passage) ? ', each CJK character counted as one' : ''})`
        : `The paraphrase’s verbatim anchor “${e.anchor}”`
    }${extra.split ? ', a part of a longer passage that the pack joined across separate fields of the page,' : ''} matched the retrieved text on ${date} and again in a fresh retrieval the same day. Read ${route}. Matching ignored differences of whitespace, case, quotation marks, apostrophes, dashes and Unicode compatibility forms, so the source’s typography can differ.`;
  return [
    extra.added
      ? `Added at the admission of the Chinese frontier-AI institutions, second collection (${dir}).`
      : `Candidate pack passage, Chinese frontier-AI institutions, second collection (${dir}).`,
    checkText,
    extra.split
      ? 'The pack had joined this field with others of the same page into one quotation; at admission each field became its own quotation (cross-family check, 2026-10-27).'
      : '',
    elided ? 'Elided quotation: the ellipses mark omitted words.' : '',
    extra.shortened
      ? 'Shortened at admission to keep the quotations from this source within the per-document limit; the shortened wording is part of the checked passage.'
      : '',
    e.passageType === 'paraphrase' && !extra.transcribed
      ? 'The paraphrase is Selekoa’s; only the anchor is the source’s wording.'
      : '',
    e.translation ? machine(e.translation) : '',
    s.language !== 'en' && !e.translation && hasCjk(verbatim ?? e.passage)
      ? 'No English rendering is given; no human translation review.'
      : '',
    verdict
      ? `A cross-family machine check (2026-10-27, item ${item}) re-read the record’s sources and ${verdict === 'supported' ? 'agreed with the record' : 'judged it partly supported; its corrections were applied at admission'}.`
      : '',
    'No human editorial review.',
  ]
    .filter(Boolean)
    .join(' ');
}

// Claims and evidence.
const usedSources = new Set<string>();
const quoted = new Map<string, Set<string>>();
const quote = (packSourceId: string, verbatim: string | undefined) => {
  if (!verbatim) return;
  if (packWords(verbatim) > 50 || words(verbatim) > 50)
    throw new Error('Quote over 50 words: ' + verbatim);
  const id = sourceId(packSourceId);
  quoted.set(id, (quoted.get(id) ?? new Set()).add(verbatim));
};
const legalNames: Record<string, string> = {};
const evidenceRow = (c: Json, e: Json, note: string): Row => {
  const s = packSources.get(e.sourceId)!;
  usedSources.add(e.sourceId);
  return {
    id: e.id,
    claimId: c.id,
    sourceId: sourceId(e.sourceId),
    sourceRole: e.sourceRole,
    support: e.support,
    locator: e.locator,
    passage: e.passage,
    passageType: e.passageType,
    verification: 'machine_checked',
    checkedAt: date,
    note: noIds(note, e.id),
    retrievalRoute: routeOf[s.retrieval.route],
  };
};

for (const raw of pack.claims as Json[]) {
  const c: Json = structuredClone(raw);
  const plan: Json = take('claims', c.id) ?? {};
  for (const key of [
    'subject',
    'predicate',
    'object',
    'statement',
    'qualification',
    'time',
  ])
    if (plan[key] !== undefined) c[key] = plan[key];
  if (providers[c.id]) {
    if (c.predicate !== 'states_provision')
      throw new Error('Provider for a non-provision record: ' + c.id);
    c.object = { kind: 'entity', entityId: c.subject };
    c.subject = providers[c.id];
    c.predicate = 'published';
    delete c.attributes?.provision;
    c.time.note = c.time.note.replace(
      /^Provision as stated in /,
      'As stated in ',
    );
  }
  if (c.predicate === 'states_provision') {
    const edition = pack.entities.find((x: Json) => x.id === c.subject);
    if (!edition?.documentVersion)
      throw new Error('A provision outside a framework edition: ' + c.id);
  }
  if (c.predicate === 'published' && credited.has(c.id))
    throw new Error('A credited organisation left as publisher: ' + c.id);
  if (c.attributes?.stage) delete c.attributes.stage; // announced stays in the text
  const legal: string | undefined = c.attributes?.commitment?.listedAs;
  if (legal) {
    delete c.attributes.commitment.listedAs;
    const entity =
      existing('entities', c.subject) ??
      pack.entities.find((x: Json) => x.id === c.subject);
    const name = (entity.name as string).split(' / ')[0];
    legalNames[c.subject] = legal;
    c.qualification = [
      `The list names the legal entity ${legal}. The record maps it to the group-level entity ${name}, which carries that name as an alias; the mapping rests on the company name, and no claim is made about group structure or about which group company is bound.`,
      'A listing is the publisher’s statement, dated by the post; it is not a signature date and not evidence that the company complied with or implemented the commitments. A later total of 22 signatories is reported, but no later list was retrieved.',
      plan.extraQualification ?? '',
    ]
      .filter(Boolean)
      .join(' ');
  }
  noIds(c.statement, c.id);
  noIds(c.qualification, c.id);
  noIds(c.time.note, c.id);
  if (loaded.test(c.statement) || loaded.test(c.qualification))
    throw new Error('Loaded wording: ' + c.id);

  // Evidence, in pack order, with the map's splits and corrections.
  const evidenceIds: string[] = [];
  const push = (row: Row) => {
    addOnce('evidence', row);
    evidenceIds.push(row.id);
  };
  for (const rawEvidence of c.evidence as Json[]) {
    const e: Json = structuredClone(rawEvidence);
    for (const part of ['drafting', 'fresh'] as const) {
      const checked = (part === 'drafting' ? verification : verification.fresh)
        .passagesChecked[e.id];
      if (checked?.match !== 'match')
        throw new Error(`Passage not matched (${part}): ${e.id}`);
    }
    const ePlan: Json = take('evidence', e.id) ?? {};
    const locator = take('locators', e.id);
    if (locator) e.locator = locator;
    if (ePlan.support) e.support = ePlan.support;
    if (ePlan.locator) e.locator = ePlan.locator;
    const shortened = take('shorten', e.id);
    if (shortened) {
      if (!e.passage.includes(shortened.passage))
        throw new Error('A shortened passage must come from the pack: ' + e.id);
      e.passage = shortened.passage;
      e.locator = shortened.locator;
    }
    const tx = e.translation?.text as string | undefined;
    delete e.translation;
    if (ePlan.split) {
      for (const part of ePlan.split as Json[]) {
        if (!squash(e.passage).includes(squash(part.passage)))
          throw new Error(`Split part not in the pack passage: ${part.id}`);
        const piece = {
          ...e,
          id: part.id,
          locator: part.locator,
          passage: part.passage,
          translation: part.translation,
        };
        quote(e.sourceId, piece.passage);
        push(evidenceRow(c, piece, evidenceNote(c, piece, { split: true })));
      }
      continue;
    }
    if (ePlan.transcribedPdf) {
      // The pack's ' ... ' marked control characters, not omissions.
      const joined = e.passage
        .replace(/ \.\.\. /g, '')
        .replace(/[⻛]/g, '风')
        .replace(/[⻅]/g, '见');
      const loose = (s: string) =>
        squash(s).replace(/[，,（(）)]/g, (ch) =>
          ch === '（' ? '(' : ch === '）' ? ')' : ch === '，' ? ',' : ch,
        );
      if (!loose(ePlan.passage).includes(loose(joined)))
        throw new Error(
          'A transcription must contain the pack passage: ' + e.id,
        );
      e.passage = ePlan.passage;
      e.translation = ePlan.translation ?? tx;
      quote(e.sourceId, e.passage);
      push(evidenceRow(c, e, evidenceNote(c, e, { transcribed: 'pdf' })));
      continue;
    }
    if (ePlan.transcription || e.visualReading) {
      const kind: string = ePlan.transcription ?? 'list';
      if (kind === 'list') {
        const legalName = c.attributes?.commitment ? legalNames[c.subject] : '';
        if (!legalName || !e.passage.includes(legalName))
          throw new Error(
            'A list transcription names the listed entity: ' + e.id,
          );
        e.passage = `Transcription from the image: the list of initial signatories (首批签署《人工智能安全承诺》企业名单, 17 names, ordered by initial letter) includes ${legalName}.`;
        e.locator =
          'Embedded image, list 首批签署《人工智能安全承诺》企业名单 (transcribed from the image; not in the page’s text layer)';
        e.items = 'the list of initial signatories';
      } else {
        e.passage = ePlan.passage;
        e.locator = ePlan.locator;
        e.passageType = ePlan.passageType ?? e.passageType;
        e.items = ePlan.items;
        e.translation = ePlan.translation;
        if (e.passageType === 'quote') quote(e.sourceId, e.passage);
      }
      delete e.anchor;
      delete e.visualReading;
      push(evidenceRow(c, e, evidenceNote(c, e, { transcribed: kind })));
      continue;
    }
    if (ePlan.passage) throw new Error('Unhandled passage change: ' + e.id);
    e.translation = tx;
    quote(e.sourceId, e.passageType === 'quote' ? e.passage : e.anchor);
    push(
      evidenceRow(c, e, evidenceNote(c, e, { shortened: Boolean(shortened) })),
    );
  }
  for (const n of (map.newEvidence as Json[]).filter(
    (n) => n.claimId === c.id && !n.copyOf,
  )) {
    const e = { ...n };
    quote(e.sourceId, e.passageType === 'quote' ? e.passage : e.anchor);
    push(
      evidenceRow(
        c,
        e,
        evidenceNote(c, e, {
          added: `${n.reason}${
            n.passageType === 'paraphrase'
              ? ` The anchor “${n.anchor}” was matched in that retrieval.`
              : ''
          }`,
        }),
      ),
    );
  }

  const attributes: Json = { ...(c.attributes ?? {}) };
  if (attributes.commitment && !Object.keys(attributes.commitment).length)
    delete attributes.commitment;
  const time: Json = { kind: c.time.kind };
  for (const key of ['date', 'from', 'until', 'basis', 'note'])
    if (c.time[key] !== undefined) time[key] = c.time[key];
  // The schema's date bases: a filing is dated by its publication.
  if (time.basis === 'filing') time.basis = 'publication';
  if (time.kind === 'snapshot') delete time.basis;
  addOnce('claims', {
    id: c.id,
    subject: c.subject,
    predicate: c.predicate,
    object: c.object,
    topic: c.topic,
    statement: c.statement,
    time,
    derivation: c.derivation,
    resolution: c.resolution,
    editorialState: 'seed',
    qualification: c.qualification,
    evidenceIds,
    recordedAt: date,
    ...(Object.keys(attributes).length ? { attributes } : {}),
  });
}
// Evidence copied from another admitted passage, for a second record.
for (const n of (map.newEvidence as Json[]).filter((n) => n.copyOf)) {
  const from = added.evidence.find((e) => e.id === n.copyOf);
  const claim = added.claims.find((c) => c.id === n.claimId);
  if (!from || !claim) throw new Error('Unknown copy: ' + n.id);
  addOnce('evidence', {
    ...structuredClone(from),
    id: n.id,
    claimId: n.claimId,
    support: n.support,
    note: `${from.note} The same passage also supports this record.`,
  });
  (claim.evidenceIds as string[]).push(n.id);
}

// Entities proposed by the pack, and legal names as aliases (decision 5).
for (const raw of pack.entities as Json[]) {
  const plan: Json = take('entities', raw.id) ?? {};
  const legal = legalNames[raw.id];
  if (raw.existing) {
    if (!existing('entities', raw.id))
      throw new Error('Existing entity not found: ' + raw.id);
    if (legal) {
      const row = existing('entities', raw.id)!;
      if (!(row.aliases as string[]).includes(legal))
        change('entities', raw.id).aliases = [
          ...(row.aliases as string[]),
          legal,
        ];
    }
    continue;
  }
  const referenced = added.claims.some(
    (c) => c.subject === raw.id || (c.object as Json).entityId === raw.id,
  );
  if (!referenced)
    throw new Error('Proposed entity without a record: ' + raw.id);
  const sourceIds = (raw.sourceIds as string[]).filter((s) =>
    usedSources.has(s),
  );
  if (!sourceIds.length) throw new Error('No admitted source for ' + raw.id);
  const subtype = plan.subtype ?? raw.subtype;
  if (!subtype) throw new Error('No subtype for ' + raw.id);
  const aliases = [...(raw.aliases ?? [])];
  if (legal && !aliases.includes(legal)) aliases.push(legal);
  addOnce('entities', {
    id: raw.id,
    name: plan.name ?? raw.name,
    ...(raw.shortName ? { shortName: raw.shortName } : {}),
    type: plan.type ?? raw.type,
    subtype,
    aliases,
    description: noIds(plan.description ?? raw.description, raw.id),
    sourceIds: [...new Set(sourceIds.map(sourceId))],
    ...(raw.documentVersion ? { documentVersion: raw.documentVersion } : {}),
  });
}

// Sources. A pack source already in the dataset is reused.
for (const packId of [...packSources.keys()].filter((id) =>
  usedSources.has(id),
)) {
  const s = packSources.get(packId)!;
  const id = sourceId(packId);
  const plan: Json = take('sources', packId) ?? {};
  if (s.datasetSourceId) {
    const row = existing('sources', id);
    if (!row) throw new Error('Existing source not found: ' + id);
    if (row.canonicalUrl !== s.url) throw new Error('Another document: ' + id);
    if (Object.keys(plan).length) throw new Error('Plan for a reused source');
    continue;
  }
  if (plan.archivedUrl && !(plan.archivedUrl as string).endsWith('/' + s.url))
    throw new Error('Archive copy of another address: ' + packId);
  const original: string | undefined = s.originalTitle ?? undefined;
  const english = original && original !== s.title ? s.title : undefined;
  const etAl = (a: string) => /^et al\b/.test(a);
  const credited = (s.authors ?? []).filter((a: string) => !etAl(a));
  const abbreviated = (s.authors ?? []).some(etAl);
  const authors: string[] = credited.length ? credited : [s.publisher];
  const version = [
    `${s.publicationDate ? 'Dated' : 'Undated'} ${s.kind === 'paper' || s.kind === 'filing' || s.kind === 'report' ? 'document' : s.kind === 'post' ? 'post' : 'page'}, retrieved on ${s.retrieval.retrievedAt} (SHA-256 ${s.retrieval.sha256}) ${routePhrase[s.retrieval.route]}.`,
    s.version?.id ? `Version: ${s.version.id}.` : '',
    noIds(plan.versionNote ?? s.version?.note ?? '', packId),
    s.version?.kind === 'mutable-page'
      ? 'Its wording can change; earlier wording is not authenticated.'
      : '',
    plan.archivedUrl
      ? `The cross-family check (${date}) located the Internet Archive capture linked here; a capture shows only what the archive retrieved that day.`
      : '',
    english ? `English title (machine translation): “${english}”.` : '',
    abbreviated
      ? 'The author list gives the first credited authors only; see the document for the full list.'
      : '',
    s.sourceClass === 'reporting'
      ? 'A reporting outlet, cited beside the primary text.'
      : '',
  ]
    .filter(Boolean)
    .join(' ');
  const documentWords = plan.documentWords ?? {
    count: s.documentWords.count,
    basis: `${s.documentWords.basis.replace(/\.$/, '')}${s.language === 'en' ? '' : ', each CJK character counted as one word'}; counted for the candidate pack on ${s.retrieval.retrievedAt}.`,
  };
  const title = original ?? s.title;
  addOnce('sources', {
    id,
    ...(plan.documentId ? { documentId: plan.documentId } : {}),
    title,
    authors,
    publisher: s.publisher,
    publicationDate: s.publicationDate,
    version,
    canonicalUrl: s.url,
    evidenceUrl: s.url,
    language: s.language,
    ...(plan.archivedUrl
      ? { archivedUrl: plan.archivedUrl, archivedAt: plan.archivedAt }
      : {}),
    documentWords,
    kind: s.kind,
    accessedAt: s.retrieval.retrievedAt,
    reuse: {
      attribution: `${authors.join(', ')}, “${title}”${s.publicationDate ? `, ${s.publicationDate}` : ''}.`,
      licence: 'No open redistribution licence asserted',
      note: 'Bibliographic metadata, editorial paraphrases and short attributed quotations (at most 50 words each). Recheck terms before wider redistribution.',
    },
  });
}
const left = [...used];
if (left.length) throw new Error('Unused map entries: ' + left.join(', '));

// Quotation limits per source: quotations and paraphrase anchors, with the
// dataset's existing quotations from the same source, each CJK character
// counted as one word.
const norm = (p: string) =>
  p
    .toLowerCase()
    .replace(/[‘’'“”"]/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
const overLimit: string[] = [];
for (const [id, passages] of quoted) {
  const row = added.sources.find((s) => s.id === id) ?? existing('sources', id);
  const length = (row?.documentWords as Json)?.count;
  const all = new Set([...passages].map(norm));
  for (const e of base.evidence)
    if (e.sourceId === id && e.passageType === 'quote')
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
  updatedAt: date,
  scope:
    base.meta.scope +
    ' On 2026-10-27 a second collection of Chinese frontier-AI institutional histories was admitted from a machine-prepared, machine-audited and cross-family-checked candidate pack, with the maintainer’s decisions of that date: model releases, licences, technical-report authorship and documented investors of Moonshot AI, MiniMax, Baidu (ERNIE) and ByteDance Seed, and what three Chinese AI governance texts state — the AI Safety Governance Framework of TC260 (versions 1.0 to 3.0), the AI Industry Alliance’s AI Safety Commitments with their 17 initially listed companies, and Shanghai AI Laboratory’s Frontier AI Risk Management Framework. Chinese passages are quoted in Chinese with machine translations; a listing is not a signature or compliance, and a framework or licence states terms, not implementation. All records remain seeds.',
};
const result = {
  meta,
  ...Object.fromEntries(names.map((n) => [n, [...base[n], ...added[n]]])),
} as unknown as { meta: Json } & Record<Name, Row[]>;

const newSnapshot = {
  description:
    'Records as stored before the admission of the second Chinese frontier-AI institutions collection on 2026-10-27 (schema 2.18, no schema change; review/china-labs-2-admission-2026-10-27.md): the earlier metadata, the IDs the admission added and the stored rows it changed, as they were. Changed rows: existing organisations that gained a signatory’s listed legal name as an alias. The test-only historical view removes the added rows and restores the earlier metadata and rows.',
  baseCommit: '1f92cd5',
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
