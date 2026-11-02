// Admits the lab genealogy 2 candidate pack (research/lab-genealogy-2) into
// the dataset, using the authored map in
// review/lab-genealogy-2-admission-map-2026-11-01.json, the maintainer's
// decisions of 2026-10-30 and the adjudication of 2026-10-31 of the
// cross-family check (both in review/lab-genealogy-2-pack-2026-10-29.md).
// Adapted from scripts/genealogy-admission.ts. No schema change.
//
//   pnpm tsx scripts/lab-genealogy-2-admission.ts --verify   match the admission's own passages in a fresh retrieval
//   pnpm tsx scripts/lab-genealogy-2-admission.ts            write the records and the before-snapshot
//   pnpm tsx scripts/lab-genealogy-2-admission.ts --check    compare with the stored records
//   pnpm tsx scripts/lab-genealogy-2-admission.ts --base <commit>
//                                         rebuild on a new base: the snapshot names that base commit
//
// `--verify` retrieves the new sources into the ignored .local/lg2-admission/
// cache and writes research/lab-genealogy-2/admission-verification-2026-11-01.json;
// the admission reads that file, never the cache. A passage the cross-family
// check read in an archive capture the admission could not reach is admitted
// only as a labelled paraphrase (`checkOnly`), never as a quotation.
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { maxQuotedWords } from '../src/domain/schema';

const names = ['entities', 'claims', 'sources', 'evidence'] as const;
type Name = (typeof names)[number];
type Row = Record<string, unknown> & { id: string };
type Json = Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any

const read = (path: string) => JSON.parse(readFileSync(path, 'utf8'));
const args = process.argv.slice(2);
const check = args.includes('--check');
const map: Json = read('review/lab-genealogy-2-admission-map-2026-11-01.json');
const date: string = map.admissionDate;
const dir = 'research/lab-genealogy-2';
const pack: Json = read(map.files.pack);
const snapshotPath = `review/lab-genealogy-2-admission-before-${date}.json`;
const cache = '.local/lg2-admission';

// ---------------------------------------------------------------- helpers
const words = (s: string) => s.trim().split(/\s+/).length;
const cjk = /[぀-ヿ㐀-鿿豈-﫿]/g;
/** The pack's stricter count: each CJK character is one word. */
const packWords = (s: string) => {
  const rest = s.replace(cjk, ' ').trim();
  return (s.match(cjk) ?? []).length + (rest ? words(rest) : 0);
};
const normalise = (t: string) =>
  t
    .normalize('NFKC')
    .replace(/\\n/g, ' ')
    .replace(/\\u2019/g, '’')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#39;|&apos;|&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, ' ')
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[–—]/g, '-')
    .replace(/\s+/g, ' ')
    .toLowerCase();
const sha256 = (buf: Buffer | string) =>
  createHash('sha256').update(buf).digest('hex');

const newSources = map.newSources as Record<string, Json>;
const newEvidence = map.newEvidence as Json[];

// ---------------------------------------------------------------- verify
if (args.includes('--verify')) {
  mkdirSync(cache, { recursive: true });
  // Up to three attempts, ten seconds apart: some hosts reset the
  // connection through the session's proxy now and then.
  const fetchTo = (url: string, file: string): string => {
    for (let attempt = 1; ; attempt++)
      try {
        return execFileSync(
          'curl',
          ['-sSL', '-m', '180', '-o', file, '-w', '%{http_code}', url],
          { encoding: 'utf8' },
        );
      } catch (error) {
        if (attempt === 3) throw error;
        execFileSync('sleep', ['10']);
      }
  };
  const texts: Record<string, string> = {};
  const sources: Json = {};
  const targets: [string, string][] = [
    ...Object.entries(newSources)
      .filter(([, s]) => !s.checkOnly)
      .map(([id, s]) => [id, s.fetch ?? s.url] as [string, string]),
    ...(Object.entries(map.fetchPackSources) as [string, string][]),
  ];
  // The admission's first retrieval of the same day (scratch tool run before
  // this script), used where a later request is refused: LinkedIn answers
  // HTTP 404 to repeated requests from one address.
  const earlier = new Map<string, Json>(
    existsSync(`${cache}/fetch-results.json`)
      ? (read(`${cache}/fetch-results.json`) as Json[])
          .filter((r) => r.http === '200' && r.found)
          .map((r) => [r.url, r])
      : [],
  );
  for (const [id, url] of targets) {
    let file = `${cache}/${id}`;
    let status = fetchTo(url, file);
    const page = newSources[id]?.url ?? url;
    const first = earlier.get(page);
    const usable = (f: string) =>
      !/<title>LinkedIn<\/title>|Sign Up \| LinkedIn/.test(
        readFileSync(f, 'utf8'),
      );
    let route = 'fresh';
    if ((status !== '200' || !usable(file)) && first) {
      file = first.file;
      status = first.http;
      route = 'earlier retrieval of the same day';
    }
    const buf = readFileSync(file);
    let text = buf.toString('utf8');
    if (buf.subarray(0, 4).toString() === '%PDF') {
      execFileSync('pdftotext', [file, `${file}.txt`]);
      text = readFileSync(`${file}.txt`, 'utf8');
    }
    texts[id] = normalise(text);
    // Sina Finance: the article body, between its id="artibody" and the
    // end-of-text comment.
    const article = text.includes('id="artibody"')
      ? text.slice(text.indexOf('id="artibody"')).split('<!-- 正文 end')[0]
      : undefined;
    const body =
      article ??
      text.match(/"articleBody":"(.*?)","/)?.[1] ??
      text.match(/og:description" content="([^"]*)"/)?.[1] ??
      (text.trim().startsWith('{') ? (JSON.parse(text).text ?? '') : '');
    sources[id] = {
      url,
      retrieval: route,
      httpStatus: Number(status),
      sha256: sha256(buf),
      retrievedAt: date,
      // A post's length: the words of its body (LinkedIn's articleBody, or
      // the text X's syndication endpoint returns); a document's: its text.
      ...(newSources[id]
        ? {
            documentWords: packWords(
              (body || text).replace(/\\n/g, ' ').replace(/<[^>]+>/g, ' '),
            ),
          }
        : {}),
    };
    execFileSync('sleep', ['3']);
  }
  const passages: Json = {};
  for (const e of newEvidence) {
    if (e.checkOnly || e.visual) continue;
    const wording: string = e.passageType === 'quote' ? e.passage : e.anchor;
    passages[e.id] = {
      source: e.sourceId,
      words: packWords(wording),
      found: (texts[e.sourceId] ?? '').includes(normalise(wording)),
    };
  }
  const result = {
    checkedAt: date,
    method:
      'Each new quotation, and each new paraphrase’s verbatim anchor, was matched in a fresh retrieval of its source after normalising whitespace, case, quotation marks, apostrophes, dashes, HTML tags and entities. LinkedIn posts were read in the public post page (its articleBody); posts on X through X’s syndication endpoint, which truncates long notes. Passages the cross-family check read in archive captures are not listed: the Internet Archive refused the admission, and those passages are admitted only as labelled paraphrases.',
    sources,
    passages,
  };
  writeFileSync(map.files.admission, JSON.stringify(result, null, 2) + '\n');
  execFileSync('pnpm', ['prettier', '--write', map.files.admission], {
    stdio: 'ignore',
  });
  const missing = Object.entries(passages).filter(
    ([, p]) => !(p as Json).found,
  );
  console.log(
    `${Object.keys(passages).length} passages; not matched: ${missing.map(([k]) => k).join(', ') || 'none'}`,
  );
  process.exit(missing.length ? 1 : 0);
}

// ---------------------------------------------------------------- base
const verification: Json = read(map.files.verification);
const admission: Json = read(map.files.admission);
const crossCheck: Json = read(map.files.check);
const itemOf = new Map<string, Json>(
  Object.values(crossCheck.items as Json)
    .filter((x: Json) => x.recordId && /^L/.test(x.item))
    .map((x: Json) => [x.recordId, x]),
);
const stored = {
  meta: read('data/meta.json'),
  ...Object.fromEntries(names.map((n) => [n, read(`data/${n}.json`)])),
} as { meta: Json } & Record<Name, Row[]>;
const storedSnapshot: Json | null = existsSync(snapshotPath)
  ? read(snapshotPath)
  : null;
const snapshot: Json | null =
  storedSnapshot &&
  names.every((n) =>
    ((storedSnapshot.added?.[n] ?? []) as string[]).every((id) =>
      stored[n].some((r) => r.id === id),
    ),
  ) &&
  names.some((n) => (storedSnapshot.added?.[n] ?? []).length)
    ? storedSnapshot
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
// A snapshot that applies must describe the stored data: after a merge of
// main, rows the snapshot restores may have changed there, and the
// admission is then regenerated from the new base, never patched.
if (snapshot) {
  const shaOf = (value: unknown) =>
    createHash('sha256').update(JSON.stringify(value)).digest('hex');
  const stale = names.filter(
    (n) =>
      shaOf(
        stored[n]
          .filter(
            (r) => !((snapshot.added[n] ?? []) as string[]).includes(r.id),
          )
          .map(
            (r) =>
              (snapshot.before[n] as Row[]).find((b) => b.id === r.id) ?? r,
          ),
      ) !== snapshot.sha256[n],
  );
  if (stale.length)
    throw new Error(
      `The stored data no longer matches the snapshot's base (${stale.join(', ')}); regenerate from the new base.`,
    );
}
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

const routeOf: Record<string, string> = {
  direct: 'direct',
  relay: 'reader_relay',
  x: 'x_syndication',
};
const routePhrase: Record<string, string> = {
  direct: 'directly from the publisher',
  relay:
    'through the third-party reader relay r.jina.ai, which renders the publisher’s current page (the publisher refused direct retrieval); not an archive copy',
  x: 'through X’s own syndication endpoint for the post’s text, which truncates long notes',
};
const packSources = new Map<string, Json>(
  (pack.sources as Json[]).map((s) => [s.id, s]),
);
const sourceId = (id: string) => {
  if (newSources[id]) return id;
  const s = packSources.get(id);
  if (!s) throw new Error('Unknown pack source: ' + id);
  return (s.datasetSourceId as string) ?? id;
};
const sourceOf = (id: string): Json => newSources[id] ?? packSources.get(id)!;
const packClaims = new Map<string, Json>(
  (pack.claims as Json[]).map((c) => [c.id, c]),
);
const knownIds = new Set<string>([
  ...packClaims.keys(),
  ...(pack.claims as Json[]).flatMap((c) => c.evidence.map((e: Json) => e.id)),
  ...packSources.keys(),
  ...(pack.entities as Json[]).map((e) => e.id),
  ...names.flatMap((n) => base[n].map((r) => r.id)),
]);
/** Reader-facing text without record IDs or pack wording. */
function readerText(text: string): string {
  const t = text
    .replace(/the pack’s lab scope/g, 'the scope of these records')
    .replace(
      /Open question for the maintainer: the departure is reported, not announced by the person or the company, and is kept under departure_announced pending a decision on that predicate\./g,
      'The departure is reported; no announcement by the person or the company was found (maintainer decision of 2026-10-30).',
    )
    .replace(
      'is held for the maintainer (no leave predicate exists)',
      'is not recorded (no predicate records a leave; maintainer decision of 2026-10-30)',
    )
    // Series names that read like internal codes (reader-text test).
    .replace(
      'in which sub-round (B5-1, B5-2 or B5-3) each subscription was made',
      'in which of the three sub-rounds of Series B5 each subscription was made',
    )
    .replace(
      'in the three named financings (B6-3, B6-3+ and B6-4)',
      'in the three Series B6 financings the prospectus names together',
    )
    .replace(
      / \(the Chair role is the existing record [a-z0-9-]+\)/g,
      ' (the Chair role is recorded separately)',
    )
    .replace(
      / \(see lg2-eu-ineffable-incorporated-2025\)/g,
      ' (recorded separately)',
    )
    .replace(
      /The dataset already holds this page as source-ssi-leadership-2025, scoped to the 3 July 2025 message; the coordinator decides whether to merge, and the quotation count then covers both\./g,
      'The dataset also holds this page as a separate source record, scoped to the message of 3 July 2025; the two are not merged.',
    )
    .replace(/this pack/g, 'these records')
    .replace(/\blg2?-src-[a-z0-9-]+/g, (id) => {
      const s = packSources.get(id);
      if (!s) throw new Error('Unknown source in text: ' + id);
      return `“${s.title}” (${s.publisher})`;
    })
    .replace(
      / \((?:existing record |see )?[a-z0-9]+(?:-[a-z0-9]+)+(?:, [a-z0-9]+(?:-[a-z0-9]+)+)*\)/g,
      (m) => {
        const ids = m
          .slice(2, -1)
          .replace(/^(existing record|see) /, '')
          .split(', ');
        return ids.every((id) => knownIds.has(id)) ? '' : m;
      },
    );
  const left = (t.match(/\b[a-z0-9]+(?:-[a-z0-9]+)+\b/g) ?? []).filter(
    (w) => knownIds.has(w) && !['day-to-day', 'of-the-art'].includes(w),
  );
  if (left.length) throw new Error(`Record ID left in text: ${left} in ${t}`);
  return t.replace(/\s+([.;,])/g, '$1');
}
const loaded =
  /\b(poach(ed|ing)?|ousted?|defect(ed|ion)?|exodus|rivals?|betray\w*|purge\w*|talent war)\b/i;

// ---------------------------------------------------------------- selection
const heldBack: { id: string; item?: string; reason: string }[] = [];
const admitted: Json[] = [];
for (const raw of pack.claims as Json[]) {
  const reason: string | undefined = map.holdBack[raw.id];
  if (reason) {
    heldBack.push({ id: raw.id, item: itemOf.get(raw.id)?.item, reason });
    continue;
  }
  admitted.push(raw);
}
for (const id of [
  ...Object.keys(map.holdBack),
  ...Object.keys(map.claimChanges),
])
  if (!packClaims.has(id)) throw new Error('Unknown pack record: ' + id);

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
const usedSources = new Set<string>();
const quoted = new Map<string, Set<string>>();

/** One evidence row, from a pack passage or one the admission adds. */
function evidenceRow(claimId: string, e: Json, fresh: boolean): Row {
  const s = sourceOf(e.sourceId);
  const id = sourceId(e.sourceId);
  usedSources.add(e.sourceId);
  const verbatim: string | undefined =
    e.passageType === 'quote' ? e.passage : e.anchor;
  if (verbatim) {
    if (packWords(verbatim) > 50)
      throw new Error('Quote over 50 words: ' + e.id);
    quoted.set(id, (quoted.get(id) ?? new Set()).add(verbatim));
  }
  let matched: string;
  if (!fresh) {
    const drafting = verification.passagesChecked[e.id]?.match;
    const again = verification.fresh.passagesChecked[e.id]?.match;
    if (drafting !== 'match' || again !== 'match')
      throw new Error('Pack passage not matched twice: ' + e.id);
    matched = `${e.passageType === 'quote' ? `The quotation (${packWords(e.passage)} words)` : `The paraphrase’s verbatim anchor “${e.anchor}”`} matched the retrieved text on 2026-10-29 and again in a fresh retrieval. Read ${routePhrase[s.retrieval.route]}.`;
  } else if (e.checkOnly || e.visual) matched = '';
  else {
    const v = admission.passages[e.id];
    if (!v?.found) throw new Error('Admission passage not matched: ' + e.id);
    matched = `${e.passageType === 'quote' ? `The quotation (${packWords(e.passage)} words)` : `The paraphrase’s verbatim anchor “${e.anchor}”`} matched a fresh retrieval of ${date} (SHA-256 ${admission.sources[e.sourceId].sha256}).`;
  }
  const elided = /…|\.\.\./.test(
    e.passageType === 'quote' ? e.passage : (e.anchor ?? ''),
  );
  const item = itemOf.get(claimId);
  const note = [
    fresh
      ? `Added at the admission of the lab genealogy 2 pack (${dir}) from a text the cross-family check of 2026-10-31 located.`
      : `Candidate pack passage, lab genealogy 2 (${dir}).`,
    matched,
    matched
      ? 'Matching ignored differences of whitespace, case, quotation marks, apostrophes, dashes and Unicode compatibility forms, so the source’s typography can differ.'
      : '',
    elided
      ? `Abridged ${e.passageType === 'quote' ? 'quotation' : 'anchor'}: the ellipses mark omitted words, so it is not one continuous string.`
      : '',
    e.passageType === 'paraphrase'
      ? `The paraphrase is Selekoa’s${e.anchor ? '; only the anchor is the source’s wording' : ''}.`
      : '',
    (s.language ?? 'en') !== 'en' && e.passageType === 'paraphrase'
      ? 'Paraphrase of a passage not in English; no human translation review.'
      : '',
    item && !fresh
      ? `A cross-family machine check (2026-10-31, item ${item.item}) re-read the record’s sources.`
      : '',
    map.evidenceChanges[e.id]?.reason ?? '',
    e.note ? readerText(e.note) : '',
    'No human editorial review.',
  ]
    .filter(Boolean)
    .join(' ');
  return {
    id: e.id,
    claimId,
    sourceId: id,
    sourceRole: e.sourceRole,
    support: e.support,
    locator: e.locator,
    passage: e.passage,
    passageType: e.passageType,
    verification: 'machine_checked',
    checkedAt: e.checkOnly
      ? '2026-10-31'
      : fresh
        ? date
        : (e.checkedAt ?? verification.checkedAt),
    note,
    // A passage read only by the check carries no retrieval route of the
    // admission; the image of Tworek's note came directly from X's media host.
    ...(e.checkOnly
      ? {}
      : {
          retrievalRoute: e.visual
            ? 'direct'
            : routeOf[s.retrieval?.route ?? s.route ?? 'direct'],
        }),
  };
}

const primaryOf = (id: string) => {
  const s = sourceOf(id);
  return s.sourceClass === 'primary' || Boolean(newSources[id]);
};
for (const raw of admitted) {
  const c: Json = structuredClone(raw);
  const plan: Json = map.claimChanges[c.id] ?? {};
  for (const key of ['statement', 'qualification', 'time', 'predicate'])
    if (plan[key] !== undefined) c[key] = plan[key];
  const attributes: Json = { ...(c.attributes ?? {}) };
  for (const [k, v] of Object.entries((plan.attributes ?? {}) as Json))
    if (v === null) delete attributes[k];
    else attributes[k] = v;
  if ('statedReason' in plan) c.statedReason = plan.statedReason;

  const evidenceIds: string[] = [];
  const sources: string[] = [];
  for (const rawEvidence of c.evidence as Json[]) {
    if ((plan.dropEvidence ?? []).includes(rawEvidence.id)) continue;
    const e: Json = structuredClone(rawEvidence);
    const ePlan: Json = map.evidenceChanges[e.id] ?? {};
    if (ePlan.locator) e.locator = ePlan.locator;
    addOnce('evidence', evidenceRow(c.id, e, false));
    evidenceIds.push(e.id);
    if (e.support === 'supports') sources.push(e.sourceId);
  }
  for (const e of newEvidence.filter((x) => x.claimId === c.id)) {
    addOnce('evidence', evidenceRow(c.id, e, true));
    evidenceIds.unshift(e.id);
    if (e.support === 'supports') sources.push(e.sourceId);
  }

  // Maintainer decision of 2026-10-30: a record without a primary
  // supporting passage is labelled as resting on reporting.
  let qualification: string = readerText(
    plan.qualificationAppend
      ? `${c.qualification} ${plan.qualificationAppend}`
      : c.qualification,
  );
  if (!sources.some(primaryOf) && !/\brests on\b/i.test(qualification))
    qualification = `The record rests on reporting. ${qualification}`;

  if (attributes.stage) {
    if (attributes.stage !== 'announced')
      throw new Error('Unknown stage: ' + c.id);
    attributes.activityStage = 'announced';
    delete attributes.stage;
  }
  if (attributes.role) attributes.role = readerText(attributes.role);
  if (c.statedReason) {
    if (!evidenceIds.includes(c.statedReason.evidenceId))
      throw new Error('Stated reason evidence not in record: ' + c.id);
    attributes.statedReason = {
      by: c.statedReason.by,
      text: readerText(c.statedReason.text),
      evidenceId: c.statedReason.evidenceId,
    };
  }
  const statement = readerText(c.statement);
  const time: Json = { kind: c.time.kind };
  for (const key of ['date', 'from', 'until', 'basis', 'note'])
    if (c.time[key] !== undefined) time[key] = c.time[key];
  if (time.note) time.note = readerText(time.note);
  for (const t of [statement, qualification, time.note ?? ''])
    if (loaded.test(t)) throw new Error('Loaded wording: ' + c.id);
  addOnce('claims', {
    id: c.id,
    subject: c.subject,
    predicate: c.predicate,
    object: c.object,
    topic: c.topic,
    statement,
    time,
    derivation: c.derivation,
    resolution: c.resolution,
    ...(c.derivation === 'inferred'
      ? { inferenceRationale: readerText(c.inferenceRationale) }
      : {}),
    editorialState: 'seed',
    qualification,
    evidenceIds,
    recordedAt: date,
    ...(Object.keys(attributes).length ? { attributes } : {}),
  });
}

// ---------------------------------------------------------------- entities
const reusedEntities: string[] = [];
const subtypeFor = (e: Json): string => {
  if (e.subtype) return e.subtype;
  const fixed = map.entitySubtypes[e.id];
  if (fixed) return fixed;
  const d = String(e.description);
  if (/^(Meta|Infrastructure group|Group within|AI hub)/.test(d))
    return 'Research unit';
  if (
    /venture|investment|investor|sovereign|trading firm|investment manager|investment bank|financial company/i.test(
      d.split(/[,;(]/)[0],
    )
  )
    return 'Investor';
  if (/AI|robotics|research laborator|lab\b/i.test(d.split(/[,;]/)[0]))
    return 'AI company';
  if (/semiconductor|software|technology|consumer-electronics|chip/i.test(d))
    return 'Technology company';
  return 'Company';
};
for (const raw of pack.entities as Json[]) {
  if (raw.existing) {
    if (!existing('entities', raw.id))
      throw new Error('Existing entity not found: ' + raw.id);
    continue;
  }
  // Admitted since the pack was drafted (a later admission on main).
  if (existing('entities', raw.id)) {
    reusedEntities.push(raw.id);
    continue;
  }
  const used = added.claims.some(
    (c) =>
      c.subject === raw.id ||
      (c.object as Json).entityId === raw.id ||
      (c.attributes as Json)?.statedReason?.by === raw.id,
  );
  if (!used) {
    heldBack.push({
      id: raw.id,
      reason: 'Proposed entity without an admitted record.',
    });
    continue;
  }
  // Identity sources: those of the entity's own admitted records only.
  const own = new Set<string>();
  for (const c of added.claims)
    if (
      c.subject === raw.id ||
      (c.object as Json).entityId === raw.id ||
      (c.attributes as Json)?.statedReason?.by === raw.id
    )
      for (const e of added.evidence.filter((e) => e.claimId === c.id))
        own.add(e.sourceId as string);
  const kept = (raw.sourceIds as string[]).filter((s) =>
    own.has(packSources.has(s) || newSources[s] ? sourceId(s) : s),
  );
  if (!kept.length)
    for (const c of added.claims.filter(
      (c) => c.subject === raw.id || (c.object as Json).entityId === raw.id,
    ))
      for (const e of added.evidence.filter((e) => e.claimId === c.id))
        if (kept.length < 2 && !kept.includes(e.sourceId as string))
          kept.push(e.sourceId as string);
  if (!kept.length) throw new Error('No admitted source for ' + raw.id);
  addOnce('entities', {
    id: raw.id,
    name: raw.name,
    ...(raw.sortName ? { sortName: raw.sortName } : {}),
    type: raw.type,
    subtype: subtypeFor(raw),
    aliases: raw.aliases ?? [],
    description: readerText(
      map.entityDescriptions?.[raw.id] ?? raw.description,
    ),
    sourceIds: [
      ...new Set(kept.map((k) => (packSources.has(k) ? sourceId(k) : k))),
    ],
  });
}

// ---------------------------------------------------------------- existing
for (const plan of map.existing as Json[]) {
  const row = change('claims', plan.claimId);
  if (
    plan.qualificationAppend &&
    !String(row.qualification).includes(plan.qualificationAppend)
  )
    row.qualification = `${row.qualification} ${plan.qualificationAppend}`;
  const e: Json = { ...plan.evidence };
  const ev = evidenceRow(plan.claimId, e, false);
  ev.note = `${ev.note} Added to this existing record at the lab genealogy 2 admission of ${date}: ${plan.reason}`;
  addOnce('evidence', ev);
  row.evidenceIds = [...(row.evidenceIds as string[]), ev.id];
}

// ---------------------------------------------------------------- sources
const simpleName = /^[A-Z][a-z’'-]+ [A-Z][a-z’'-]+$/;
const reuseNote =
  'Bibliographic metadata, editorial paraphrases and short attributed quotations (at most 50 words each). Recheck terms before wider redistribution.';
for (const key of [...usedSources]) {
  const id = sourceId(key);
  const x = newSources[key];
  if (x) {
    const fresh = admission.sources[key];
    if (!x.checkOnly && !fresh) throw new Error('Not retrieved: ' + key);
    addOnce('sources', {
      id,
      title: x.title,
      authors: x.authors,
      publisher: x.publisher,
      publicationDate: x.publicationDate,
      version: x.checkOnly
        ? `Read by the cross-family check of 2026-10-31 in the archive capture of ${x.archivedAt}; the page now answers HTTP 404, and the Internet Archive refused the admission's retrieval, so no passage of it is quoted.`
        : `Retrieved at admission on ${date} (SHA-256 ${fresh.sha256}) ${routePhrase[x.route ?? 'direct']}. Its wording can change; earlier wording is not authenticated.`,
      canonicalUrl: x.url,
      evidenceUrl: x.url,
      language: x.language ?? 'en',
      ...(x.archivedUrl
        ? { archivedUrl: x.archivedUrl, archivedAt: x.archivedAt }
        : {}),
      ...(fresh?.documentWords
        ? {
            documentWords: {
              count: fresh.documentWords,
              basis: `Words of the post or page text in the retrieval of ${date}`,
            },
          }
        : {}),
      kind: x.kind,
      accessedAt: x.checkOnly ? '2026-10-31' : date,
      reuse: {
        attribution: `${x.authors.join(', ')}, “${x.title}”, ${x.publicationDate}.`,
        licence: 'No open redistribution licence asserted',
        note: reuseNote,
      },
    });
    continue;
  }
  const s = packSources.get(key)!;
  const length = s.documentWords?.count && {
    count: s.documentWords.count,
    basis: `${String(s.documentWords.basis).replace(/\.$/, '')}; counted for the lab genealogy 2 pack on ${s.retrieval.retrievedAt}.`,
  };
  if (s.datasetSourceId) {
    const row = existing('sources', id);
    if (!row) throw new Error('Existing source not found: ' + id);
    if (!row.documentWords && quoted.has(id) && length)
      change('sources', id).documentWords = length;
    continue;
  }
  if (existing('sources', id) || added.sources.some((r) => r.id === id))
    continue;
  const credited = (s.authors ?? []).filter((a: string) => a !== 'et al.');
  const authors: string[] = credited.length ? credited : [s.publisher];
  const authorNames = authors.every(
    (a) => a === s.publisher || (simpleName.test(a) && !/\bStaff$/.test(a)),
  )
    ? authors.map((a) =>
        a === s.publisher
          ? { literal: a }
          : { family: a.split(' ')[1], given: a.split(' ')[0] },
      )
    : undefined;
  const version = [
    `${s.publicationDate ? 'Dated' : 'Undated'} ${s.kind === 'post' ? 'post' : s.kind === 'paper' || s.kind === 'filing' ? 'document' : 'page'}, retrieved on ${s.retrieval.retrievedAt} (SHA-256 ${s.retrieval.sha256}) ${routePhrase[s.retrieval.route]}.`,
    s.publicationDate
      ? ''
      : 'Its wording can change; earlier wording is not authenticated.',
    s.note ? readerText(s.note) : '',
  ]
    .filter(Boolean)
    .join(' ');
  addOnce('sources', {
    id,
    title: s.title,
    authors,
    ...(authorNames ? { authorNames } : {}),
    publisher: s.publisher,
    publicationDate: s.publicationDate,
    version,
    canonicalUrl: s.url,
    evidenceUrl: s.url,
    language: s.language,
    ...(length ? { documentWords: length } : {}),
    kind: s.kind,
    accessedAt: s.retrieval.retrievedAt,
    reuse: {
      attribution: `${authors.join(', ')}, “${s.title}”${s.publicationDate ? `, ${s.publicationDate}` : ''}.`,
      licence: 'No open redistribution licence asserted',
      note: reuseNote,
    },
  });
}

// ---------------------------------------------------------------- limits
const overLimit: string[] = [];
for (const [id, passages] of quoted) {
  const row = added.sources.find((s) => s.id === id) ?? existing('sources', id);
  const length = (row?.documentWords as Json)?.count;
  const all = new Set(passages);
  for (const e of base.evidence)
    if (e.sourceId === id && e.passageType === 'quote')
      all.add(e.passage as string);
  const list = [...all];
  const total = list.reduce((n, p) => n + packWords(p), 0);
  if (!length && total <= 5) continue;
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
  writeFileSync(
    `review/lab-genealogy-2-admission-held-${date}.json`,
    JSON.stringify(heldBack, null, 2) + '\n',
  );
  console.log(
    `Added ${names.map((n) => `${added[n].length} ${n}`).join(', ')}; changed ${names.map((n) => `${changed[n].size} ${n}`).join(', ')}; held back ${heldBack.length}; reused entities: ${reusedEntities.join(', ') || 'none'}.`,
  );
}
