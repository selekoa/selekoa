// Admits the compute, power and orbit candidate pack
// (research/compute-power-orbit) into the dataset, in two parts, using the
// authored map in review/cpo-admission-map-2026-10-30.json, the maintainer's
// decisions of 2026-10-28 (review/compute-power-orbit-pack-2026-10-28.md)
// and the corrections of the cross-family check
// (research/compute-power-orbit/cross-family-check-2026-10-28.md).
//
//   pnpm tsx scripts/cpo-admission.ts --verify          match every quotation in a fresh retrieval
//   pnpm tsx scripts/cpo-admission.ts --part 1          write part 1
//   pnpm tsx scripts/cpo-admission.ts --part 1 --check  compare with the stored records
//
// `--verify` reads the ignored retrieval cache that
// `node research/compute-power-orbit/tools.mjs fetch` fills and writes
// research/compute-power-orbit/admission-verification-2026-10-30.json; the
// parts read that file and never the cache. A part is idempotent: it first
// removes the rows its before-snapshot lists as added and restores the rows
// it changed, then rebuilds them. The pack is never changed.
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { maxQuotedWords } from '../src/domain/schema';

const dir = 'research/compute-power-orbit';
const names = ['entities', 'claims', 'sources', 'evidence'] as const;
type Name = (typeof names)[number];
type Row = Record<string, unknown> & { id: string };
type Json = Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any

const read = (path: string) => JSON.parse(readFileSync(path, 'utf8'));
const args = process.argv.slice(2);
const check = args.includes('--check');
const map: Json = read('review/cpo-admission-map-2026-10-30.json');
const files = {
  pack: `${dir}/pack.json`,
  verification: `${dir}/verification.json`,
  admission: `${dir}/admission-verification-2026-10-30.json`,
  check: `${dir}/cross-family-check-2026-10-28.json`,
};
const pack: Json = read(files.pack);
const packSources = new Map<string, Json>(
  pack.sources.map((s: Json) => [s.key, s]),
);
const extraSources = new Map<string, Json>(
  (map.extraSources as Json[]).map((s) => [s.key, s]),
);
const packClaim = (id: string): Json | undefined =>
  pack.claims.find((c: Json) => c.id === id);

// The pack's stricter count: each CJK character is one word.
const cjk = /[぀-ヿ㐀-鿿豈-﫿]/g;
const packWords = (s: string) =>
  (s.match(cjk) ?? []).length +
  s
    .replace(cjk, ' ')
    .split(/\s+/)
    .filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
const hasCjk = (s: string) => /[㐀-鿿]/.test(s);

// ---------------------------------------------------------------- verify
/** Every quotation the parts admit: pack evidence and the map's additions. */
function quotations(): { key: string; source: string; passage: string }[] {
  const out: { key: string; source: string; passage: string }[] = [];
  for (const plan of Object.values(map.parts) as Json[])
    for (const id of plan.include as string[]) {
      const c = packClaim(id);
      if (!c) throw new Error('Not a pack record: ' + id);
      (c.evidence as Json[]).forEach((e, i) => {
        if (e.passageType === 'quote')
          out.push({ key: `${id}:${i}`, source: e.source, passage: e.passage });
      });
    }
  for (const n of map.newEvidence as Json[])
    if (n.passageType === 'quote')
      out.push({ key: n.id, source: n.source, passage: n.passage });
  return out;
}

if (args.includes('--verify')) {
  // The pack's own matcher (an untyped research tool).
  const toolsPath = '../research/compute-power-orbit/tools.mjs';
  const tools: Json = await import(toolsPath);
  const cache = '.local/compute-power-orbit/doc';
  const sources: Json = {};
  const quotes: Json = {};
  for (const q of quotations()) {
    const cacheKey =
      packSources.get(q.source)?.cacheKey ?? extraSources.get(q.source)?.key;
    if (!cacheKey) throw new Error('Unknown source: ' + q.source);
    const metaPath = `${cache}/${cacheKey}.json`;
    const meta: Json | null = existsSync(metaPath) ? read(metaPath) : null;
    const text =
      meta && meta.httpStatus === 200 ? tools.cachedText(cacheKey) : null;
    sources[q.source] ??= meta
      ? {
          url: meta.finalUrl,
          httpStatus: meta.httpStatus,
          sha256: meta.sha256,
          retrievedAt: meta.retrievedAt.slice(0, 10),
          samePackBytes:
            meta.sha256 === packSources.get(q.source)?.sha256 || undefined,
        }
      : { httpStatus: null };
    quotes[q.key] = {
      source: q.source,
      found: text ? tools.quoteFound(q.passage, text) === true : false,
      ...(text ? {} : { reason: 'not retrieved at admission' }),
    };
  }
  const result = {
    checkedAt: map.admissionDate,
    method:
      'Each quotation was matched in a fresh direct retrieval with the pack’s matcher (research/compute-power-orbit/tools.mjs quoteFound), which ignores differences of whitespace, case, quotation marks, dashes, PDF line-break hyphens and Unicode compatibility forms. A source that refused or returned no text is listed with its status, and its quotations rest on the pack’s match and on the cross-family check.',
    sources: Object.fromEntries(Object.entries(sources).sort()),
    quotes,
  };
  writeFileSync(files.admission, JSON.stringify(result, null, 2) + '\n');
  execFileSync('pnpm', ['prettier', '--write', files.admission], {
    stdio: 'ignore',
  });
  const missing = Object.entries(quotes).filter(([, q]) => !(q as Json).found);
  console.log(
    `${Object.keys(quotes).length} quotations; not matched at admission: ${missing.length}`,
  );
  for (const [k, q] of missing)
    console.log('  ' + k + ' ' + (q as Json).source);
  process.exit(0);
}

// ---------------------------------------------------------------- part
const part = args[args.indexOf('--part') + 1];
const plan: Json = map.parts[part];
if (!plan) throw new Error('Usage: --verify | --part 1|2 [--check]');
const date: string = map.admissionDate;
const snapshotPath = `review/cpo-admission-${part}-before-2026-10-30.json`;
const verification: Json = read(files.verification);
const admission: Json = read(files.admission);
const crossCheck: Json = read(files.check);
const checkOf = new Map<string, Json>(
  Object.values(crossCheck.items as Json).map((item: Json) => [
    item.recordId,
    item,
  ]),
);

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

// Reader-facing text never names a record ID; a pointer to another record
// becomes "recorded separately" (as in earlier admissions).
const recordId = /\b(?:cpo|fl|oc\d+)-[a-z0-9]+(?:-[a-z0-9]+)*/;
const claimIds = new Set<string>(
  read('data/claims.json').map((c: Row) => c.id),
);
const prose = (text: string) =>
  text
    .replace(/\(([a-z0-9]+(?:-[a-z0-9]+)+)\)/g, (m, id) =>
      claimIds.has(id) ? '(recorded separately)' : m,
    )
    .replace(
      /\((?:see )?(?:the dataset's record |dataset record )?(?:cpo|fl)-[a-z0-9-]+(?:,? (?:and )?(?:cpo|fl)-[a-z0-9-]+)*\)/g,
      '(recorded separately)',
    )
    .replace(
      /\b(?:see |the dataset's record of [^(]*?\()?(?:cpo|fl)-[a-z0-9-]+\)?/g,
      'recorded separately',
    );
function noIds(text: string, where: string) {
  const left = text.match(recordId);
  if (left) throw new Error(`Record ID left in ${where}: ${left[0]}`);
  return text;
}
const loaded =
  /\b(poach(ed|ing)?|ousted?|defect(ed|ion)?|exodus|rivals?|betray\w*|purge\w*|landmark|pioneer\w*|race)\b/i;
const machine = (text: string) =>
  `English machine translation, not verified by a person: “${text.replace(/^Selekoa working translation: /, '')}”.`;

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
const usedSources = new Set<string>();
const sourceId = (key: string) => {
  const x = extraSources.get(key);
  if (x) return x.id as string;
  if (!packSources.has(key)) throw new Error('Unknown pack source: ' + key);
  return (map.sources[key]?.id as string) ?? `source-cpo-${key}`;
};

function checkSentence(id: string) {
  const item = checkOf.get(id);
  if (!item) return '';
  if (item.part === 'A')
    return `A cross-family machine check (2026-10-29/30, item ${item.number}) answered the record’s question blind from fresh retrievals and ${item.comparison === 'agree' ? 'agreed with the record' : 'agreed in part; its corrections were applied at admission'}.`;
  return `A cross-family machine check (2026-10-29/30, item ${item.number}) re-read the record’s sources and found ${item.support === 'full' ? 'full support' : 'partial support; its corrections were applied at admission'}.`;
}

function quoteNote(key: string, e: Json) {
  const fresh = admission.quotes[key];
  const packCheck = (verification.quotes as Json[]).find(
    (q) => `${q.claim}:${q.evidence - 1}` === key,
  );
  if (!packCheck?.found)
    throw new Error('Quotation not matched by the pack: ' + key);
  const retrieval = admission.sources[e.source];
  const again = fresh?.found
    ? ` and again at admission on ${date}, in a fresh retrieval ${retrieval.samePackBytes ? 'whose SHA-256 equals the pack’s' : `(SHA-256 ${retrieval.sha256}; the bytes differ from the pack’s retrieval)`}`
    : `; at admission the source ${retrieval?.httpStatus ? `answered HTTP ${retrieval.httpStatus}` : 'could not be retrieved'}, so the match rests on the pack’s retrieval and the cross-family check`;
  return `The quotation (${packWords(e.passage)} words${hasCjk(e.passage) ? ', each CJK character counted as one' : ''}) matched the text retrieved for the candidate pack on 2026-10-28${again}. Matching ignored differences of whitespace, case, quotation marks, dashes and Unicode compatibility forms, so the source’s typography can differ.`;
}

// Quotations per dataset source, for the limit check below.
const quoted = new Map<string, Set<string>>();
const quote = (source: string, passage: string) => {
  if (packWords(passage) > 50)
    throw new Error('Quote over 50 words: ' + passage);
  quoted.set(source, (quoted.get(source) ?? new Set()).add(passage));
};

function evidenceRow(claimId: string, eid: string, e: Json, note: string): Row {
  usedSources.add(e.source);
  const sid = sourceId(e.source);
  if (e.passageType === 'quote') quote(sid, e.passage);
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
        : noIds(prose(e.passage.replace(/^Paraphrase: /, '')), eid),
    passageType: e.passageType,
    verification: 'machine_checked',
    checkedAt: date,
    note: noIds(note, eid),
    retrievalRoute: 'direct',
  };
}

// ---------------------------------------------------------------- documents
const docOf = (id: string): Json | undefined =>
  map.documents[id] ?? existing('entities', id);
const bases = [
  'publication',
  'effective',
  'revision',
  'announcement',
  'signature',
];
const genericNote: Record<string, string> = {
  publication: 'Date of publication, as the source gives it.',
  announcement: 'Date of the announcement, as the source gives it.',
  signature: 'Date of signature, as the source gives it.',
  effective: 'Date of effect, as the source gives it.',
  revision: 'Date of the revision, as the source gives it.',
};

// ---------------------------------------------------------------- part 2
const validDate = /^\d{4}(-\d{2}(-\d{2})?)?$/;
const transactionPredicates: Record<string, string> = {
  plans_capacity: 'compute_capacity',
  plans_infrastructure_spend: 'infrastructure_spend',
  compute_capacity: 'compute_capacity',
  cloud_terms: 'cloud_services',
  invested_in: 'equity_investment',
  investment_announced: 'equity_investment',
};
/** Decisions 1–5 and 11: the pack's attributes in schema 2.21's fields. */
function normaliseAttributes(c: Json, a: Json, over: Json) {
  const q = a.quantity;
  if (q) {
    if (typeof q.measures === 'string' && !map.measures.includes(q.measures))
      q.measures =
        over.measures ??
        (/\bW\b|W\b|watt|MWe/i.test(q.unit)
          ? ((map.measureRules as [string, string][]).find(([re]) =>
              new RegExp(re, 'i').test(q.measures),
            )?.[1] ?? 'not_stated')
          : /GPU|chip/i.test(q.unit)
            ? 'chips'
            : undefined);
    if (over.measures) q.measures = over.measures;
    if (q.measures === undefined) delete q.measures;
    if (over.range) q.range = over.range;
  }
  if (a.statedDates) {
    a.statedDates = (a.statedDates as Json[]).map((d, i) => {
      const fix: Json = over.statedDates?.[i] ?? {};
      const kind = map.statedDateKindMap[d.kind] ?? d.kind;
      let date: string | undefined = d.date;
      let wording: string | undefined;
      const extra = String(d.precision ?? '')
        .replace(
          /^(year range|year|month|day|quarter|half-year|decade|before year|by end of year)\s*/,
          '',
        )
        .replace(/\(as worded\)/, '')
        .replace(/^\((.*)\)$/, '$1')
        .trim();
      const part = String(date).match(/^(\d{4})-(Q\d|H1|H2|mid)$/);
      if (part) date = part[1];
      if (part)
        wording =
          part[2] === 'H1'
            ? `first half of ${part[1]}`
            : part[2] === 'H2'
              ? `second half of ${part[1]}`
              : part[2] === 'mid'
                ? `mid-${part[1]}`
                : `${part[2]} ${part[1]}`;
      else if (!validDate.test(String(date))) {
        wording = [String(date), extra].filter(Boolean).join(', ');
        date = /^\d{4}-(H\d|Q\d|mid)$/.test(String(date))
          ? String(date).slice(0, 4)
          : undefined;
      } else if (extra)
        wording = /^(end of|by end|as early as|by|before|early|late)$/.test(
          extra,
        )
          ? `${extra.replace('by end', 'by the end of')} ${date}`
          : extra;
      if ('date' in fix) date = fix.date ?? undefined;
      if (fix.wording) wording = fix.wording;
      return {
        kind,
        ...(date ? { date } : {}),
        ...(wording ? { wording } : {}),
        statedBy: fix.statedBy ?? d.statedBy,
        ...((fix.note ?? d.note) ? { note: fix.note ?? d.note } : {}),
      };
    });
  }
  // Decision 11: stated spending for a site is a project's, for a state,
  // region or fund a programme's; an investment in a company stays a
  // transaction.
  if (
    a.amount?.scopeNote &&
    !transactionPredicates[c.predicate]?.includes('equity')
  )
    a.amount.scope =
      over.scope ??
      (c.predicate === 'government_award'
        ? 'transaction'
        : c.object.kind === 'entity' &&
            pack.entities.some(
              (e: Json) =>
                e.id === c.object.entityId &&
                e.type === 'infrastructure' &&
                !/programme|zone/i.test(e.subtype),
            )
          ? 'project'
          : 'programme');
  if (a.amount && !a.transactionStage && !a.awardStage)
    a.transactionStage = 'announced';
  if (a.condition) {
    a.conditions = a.condition;
    delete a.condition;
  }
  delete a.capacityAsWorded;
  const type = transactionPredicates[c.predicate];
  if (type) {
    a.transactionType =
      map.transactionTypeMap[a.transactionType] ?? a.transactionType ?? type;
    a.relationshipContext ??= 'external';
    if (c.predicate.startsWith('plans_')) a.transactionStage = 'planned';
    a.transactionStage ??= 'announced';
  } else delete a.transactionType;
  if (
    a.awardStage &&
    !['preliminary', 'final', 'disbursed'].includes(a.awardStage)
  ) {
    a.stageWording ??= a.awardStage;
    delete a.awardStage;
  }
  if (
    c.predicate === 'government_award' &&
    ['preliminary', 'final'].includes(a.transactionStage)
  ) {
    a.awardStage = a.transactionStage;
    delete a.transactionStage;
  }
}

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
  ])
    if (over[key] !== undefined) c[key] = over[key];
  // Decision 4: merged and folded predicate names.
  const folded = !over.predicate && map.predicateMap?.[c.predicate];
  if (folded) c.predicate = folded;
  if (
    c.proposedPredicate &&
    !(plan.adoptedPredicates ?? []).includes(c.predicate) &&
    !(folded && !map.predicateMap[folded] && !(folded in map.predicateMap))
  )
    throw new Error('A proposed predicate without a decision: ' + id);
  if (over.qualificationAppend)
    c.qualification = `${c.qualification} ${over.qualificationAppend}`;

  // Attributes: the pack's, then the map's, without the pack's own fields.
  const attributes: Json = over.replaceAttributes
    ? {}
    : structuredClone(c.attributes ?? {});
  for (const [k, v] of Object.entries(over.attributes ?? {}))
    if (v === null) delete attributes[k];
    else attributes[k] = v;
  if (plan.schemaVersion) normaliseAttributes(c, attributes, over);
  if (attributes.provision) {
    const p = attributes.provision;
    p.kind = over.kind ?? map.kindMap[p.kind] ?? p.kind;
    p.key ??= id.replace(/^cpo-/, '');
  }
  if (attributes.thought) {
    const t = attributes.thought;
    t.roles = over.roles ?? t.roles.map((r: string) => map.roleMap[r] ?? r);
    if (c.predicate === 'articulates_proposition')
      t.roles = t.roles.filter((r: string) => r !== 'contesting');
    if (
      !t.roles.some((r: string) =>
        ['earliest-located', 'articulation', 'contesting', 'context'].includes(
          r,
        ),
      )
    )
      t.roles.unshift(
        c.predicate === 'articulates_proposition'
          ? 'articulation'
          : 'contesting',
      );
    t.roles = [...new Set(t.roles)];
    for (const k of ['missing', 'qualifier', 'attested', 'engagement'])
      if (over[k]) t[k] = over[k];
  }

  // Time: the schema's bases; a provision is dated by one of its edition's
  // own dates, with the pack's date in the note.
  const time: Json = { kind: c.time.kind };
  for (const key of ['date', 'from', 'until', 'basis', 'note'])
    if (c.time[key] !== undefined && c.time[key] !== null)
      time[key] = c.time[key];
  Object.assign(time, over.time ?? {});
  if (time.basis && !bases.includes(time.basis)) {
    const mapped = map.basisMap[time.basis];
    if (mapped === undefined)
      throw new Error(`Unknown basis ${time.basis}: ${id}`);
    time.note = [time.note, map.basisNotes[time.basis]]
      .filter(Boolean)
      .join(' ');
    if (mapped) time.basis = mapped;
    else delete time.basis;
  }
  if (attributes.provision && !over.time) {
    const version: Json = docOf(c.subject)?.documentVersion;
    if (!version) throw new Error('A provision without an edition: ' + id);
    const dates = [version.publishedAt, version.effectiveAt].filter(Boolean);
    if (
      !dates.includes(time.date) ||
      !['publication', 'effective'].includes(time.basis)
    ) {
      const d = dates.includes(time.date) ? time.date : version.publishedAt;
      const basis =
        d === version.effectiveAt && d !== version.publishedAt
          ? 'effective'
          : 'publication';
      time.note = `Provision as the text states it, dated by its ${basis === 'effective' ? 'date of effect' : 'date of publication'}, ${d}. ${version.dateNote}`;
      time.date = d;
      time.basis = basis;
    }
  }
  if (attributes.thought && time.basis !== 'publication')
    time.basis = 'publication';
  time.note ??=
    genericNote[time.basis as string] ?? 'Date as the source gives it.';
  time.note = noIds(prose(time.note), id);

  const statement = noIds(prose(c.statement), id);
  const qualification = noIds(prose(c.qualification), id);
  if (loaded.test(statement) || loaded.test(qualification))
    throw new Error('Loaded wording: ' + id);

  // Evidence, in pack order, with the map's corrections; then additions.
  const evidenceIds: string[] = [];
  (c.evidence as Json[]).forEach((rawEvidence, index) => {
    const key = `${raw.id}:${index}`;
    const eOver: Json = map.evidence[key] ?? {};
    if (eOver.drop) return;
    const e: Json = { ...structuredClone(rawEvidence), ...(eOver.set ?? {}) };
    if (eOver.set?.passage && e.passageType === 'quote')
      throw new Error('A changed quotation: ' + key);
    // A quotation shortened to a part of the matched passage, to keep
    // within 50 words with each CJK character counted as one.
    if (eOver.shorten) {
      if (!e.passage.includes(eOver.shorten))
        throw new Error(
          'A shortened quotation must come from the pack: ' + key,
        );
      e.passage = eOver.shorten;
      e.translation = eOver.translation;
    }
    const eid = `evidence-${id}-${evidenceIds.length + 1}`;
    const text =
      e.passageType === 'quote'
        ? quoteNote(key, e)
        : `The paraphrase is Selekoa’s, written from the text retrieved for the candidate pack on 2026-10-28; it is not a quotation and was not machine-matched.${(crossCheck.paraphraseChecks as Json[]).some((p) => p.recordId === raw.id && p.evidenceIndex === index && p.faithful === 'yes') ? ' The cross-family check found it faithful.' : ''}`;
    const note = [
      `Candidate pack passage, compute, power and orbit (${dir}).`,
      text,
      eOver.note ?? e.note ?? '',
      eOver.shorten
        ? (eOver.shortenNote ??
          'Shortened at admission to keep the quotation within 50 words, each CJK character counted as one; the shortened wording is part of the matched passage.')
        : '',
      e.translation ? machine(e.translation) : '',
      hasCjk(e.passage) && !e.translation && e.passageType === 'quote'
        ? 'No English rendering is given; no human translation review.'
        : '',
      checkSentence(raw.id),
      'No human editorial review.',
    ]
      .filter(Boolean)
      .join(' ');
    addOnce('evidence', evidenceRow(id, eid, e, note));
    evidenceIds.push(eid);
  });
  addNewEvidence(id, evidenceIds);

  if (attributes.thought)
    assignTerm(id, attributes.thought, c.object.entityId, evidenceIds);
  addOnce('claims', {
    id,
    subject: c.subject,
    predicate: c.predicate,
    object: c.object,
    topic:
      over.topic ??
      (plan.schemaVersion ? map.predicateTopics?.[c.predicate] : undefined) ??
      map.topics[raw.group ?? 'new'] ??
      'governance',
    statement,
    time,
    derivation: c.derivation,
    resolution: c.resolution,
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
    if (n.passageType === 'quote' && !admission.quotes[n.id]?.found)
      throw new Error('Added quotation not matched at admission: ' + n.id);
    const retrieval = admission.sources[n.source];
    const note = [
      `Added at the admission of the compute, power and orbit pack (${dir}).`,
      n.reason,
      n.translation ? machine(n.translation) : '',
      n.passageType === 'quote'
        ? `The quotation (${packWords(n.passage)} words) matched a direct retrieval of ${date} (SHA-256 ${retrieval.sha256}). Matching ignored differences of whitespace, case, quotation marks, dashes and Unicode compatibility forms.`
        : 'The paraphrase is Selekoa’s; it is not a quotation and was not machine-matched.',
      'No human editorial review.',
    ]
      .filter(Boolean)
      .join(' ');
    // Numbered after the record's pack evidence; `n.id` keys the match.
    const rowId = `evidence-${claimId}-${evidenceIds.length + 1}`;
    addOnce('evidence', evidenceRow(claimId, rowId, n, note));
    evidenceIds.push(rowId);
  }
}

// The earliest located use of a proposition's usual name: the earliest
// record whose evidence uses one of its terms (validation requires one).
const termUses: {
  claimId: string;
  propositionId: string;
  term: string;
  date: string;
}[] = [];
function assignTerm(
  claimId: string,
  thought: Json,
  propositionId: string,
  evidenceIds: string[],
) {
  const concept = map.entities[propositionId];
  const passages = evidenceIds.map((eid) =>
    (added.evidence.find((e) => e.id === eid)?.passage as string).toLowerCase(),
  );
  const term = (concept?.proposition?.terms ?? []).find((t: string) =>
    passages.some((p) => p.includes(t.toLowerCase())),
  );
  if (term)
    termUses.push({
      claimId,
      propositionId,
      term,
      date: thought.attested?.date ?? '',
    });
}

// ---------------------------------------------------------------- claims
const include: string[] = plan.include;
for (const id of include) {
  const raw = packClaim(id)!;
  if ((plan.hold ?? {})[id]) continue;
  buildClaim(raw, map.claims[id] ?? {});
}
for (const n of (map.newClaims as Json[]).filter((n) => n.part === part)) {
  buildClaim(
    { ...n, evidence: [], group: n.group ?? 'new', time: n.time },
    { id: n.id, topic: n.topic },
  );
}
for (const id of Object.keys(map.claims))
  if (
    !include.includes(id) &&
    !Object.values(map.parts).some((p) => (p as Json).include.includes(id))
  )
    throw new Error('A map entry for a record in no part: ' + id);

// Terms: the earliest user of each term holds the role.
const byProposition = new Map<string, typeof termUses>();
for (const u of termUses)
  byProposition.set(u.propositionId, [
    ...(byProposition.get(u.propositionId) ?? []),
    u,
  ]);
for (const [, uses] of byProposition) {
  const dated = uses.map((u) => {
    const claim = added.claims.find((c) => c.id === u.claimId)! as Json;
    return { ...u, at: u.date || claim.time.date, claim };
  });
  dated.sort((a, b) => (a.at < b.at ? -1 : a.at > b.at ? 1 : 0));
  const first = dated[0].claim;
  first.attributes.thought.roles = [
    ...first.attributes.thought.roles,
    'earliest-located-term',
  ];
  first.attributes.thought.term = dated[0].term;
}

// ---------------------------------------------------------------- entities
const referenced = new Set<string>();
for (const c of added.claims) {
  referenced.add(c.subject as string);
  if ((c.object as Json).kind === 'entity')
    referenced.add((c.object as Json).entityId);
}
for (const [id, d] of Object.entries(map.documents as Record<string, Json>)) {
  if (!referenced.has(id) || existing('entities', id)) continue;
  if (d.documentVersion) referenced.add(d.documentVersion.publisherId);
  addOnce('entities', {
    id,
    name: d.name,
    ...(d.shortName ? { shortName: d.shortName } : {}),
    type: 'document',
    subtype: d.subtype,
    aliases: d.aliases ?? [],
    description: noIds(d.description, id),
    sourceIds: (d.sources as string[]).map(sourceId),
    ...(d.documentVersion ? { documentVersion: d.documentVersion } : {}),
  });
  for (const k of d.sources as string[]) usedSources.add(k);
}
for (const k of usedSources) {
  const pid = map.sources[k]?.publisherId ?? extraSources.get(k)?.publisherId;
  if (pid) referenced.add(pid);
}
for (const [id, d] of Object.entries(map.entities as Record<string, Json>)) {
  if (!referenced.has(id) || existing('entities', id)) continue;
  addOnce('entities', {
    id,
    name: d.name,
    ...(d.shortName ? { shortName: d.shortName } : {}),
    type: d.type,
    subtype: d.subtype,
    aliases: d.aliases ?? [],
    description: noIds(d.description, id),
    sourceIds: (d.sources as string[]).map(sourceId),
    ...(d.proposition ? { proposition: d.proposition } : {}),
  });
  for (const k of d.sources as string[]) usedSources.add(k);
}
// Entities and documents the map does not author come from the pack, with
// closed subtypes, stated locations and operators (decision 1).
for (const id of [...referenced].sort()) {
  if (existing('entities', id) || added.entities.some((e) => e.id === id))
    continue;
  const e: Json | undefined = pack.entities.find((x: Json) => x.id === id);
  const d: Json | undefined = pack.documents.find((x: Json) => x.id === id);
  if (!e && !d) continue;
  const over: Json = map.entityOverrides?.[id] ?? {};
  const sourceIds = [
    ...new Set(
      added.claims
        .filter((c) => c.subject === id || (c.object as Json).entityId === id)
        .flatMap((c) => c.evidenceIds as string[])
        .map(
          (eid) => added.evidence.find((x) => x.id === eid)!.sourceId as string,
        ),
    ),
  ].slice(0, 3);
  const type = e ? e.type : 'document';
  const rawSubtype = e ? e.subtype : d!.subtype;
  addOnce('entities', {
    id,
    name: over.name ?? (e ? e.name : d!.title),
    ...(over.shortName ? { shortName: over.shortName } : {}),
    type,
    subtype:
      over.subtype ??
      map.subtypeMap[`${type}:${rawSubtype ?? ''}`] ??
      map.subtypeMap[`${type}:`] ??
      rawSubtype,
    aliases: over.aliases ?? e?.aliases ?? [],
    ...(map.locations?.[id] ? { location: map.locations[id] } : {}),
    ...(map.operators?.[id] ? { operator: map.operators[id] } : {}),
    description: noIds(
      prose(
        over.description ??
          (e
            ? String(e.note).replace(/^Candidate\.\s*/, '')
            : `${d!.label}. ${d!.dateNote}`),
      ),
      id,
    ),
    sourceIds: over.sourceIds ?? sourceIds,
    ...(over.documentVersion ? { documentVersion: over.documentVersion } : {}),
  });
}
for (const id of referenced)
  if (!existing('entities', id) && !added.entities.some((e) => e.id === id))
    throw new Error('Entity without a row: ' + id);

// ---------------------------------------------------------------- sources
const documentOf = (key: string) =>
  Object.entries(map.documents as Record<string, Json>).find(([, d]) =>
    (d.sources as string[]).includes(key),
  )?.[0];
const kindMap: Record<string, string> = map.sourceKindMap;
for (const key of [...packSources.keys(), ...extraSources.keys()].filter((k) =>
  usedSources.has(k),
)) {
  const id = sourceId(key);
  if (existing('sources', id)) continue;
  const x = extraSources.get(key);
  const s: Json = x ?? packSources.get(key)!;
  const p: Json = { ...(map.sources[key] ?? {}), ...(x ?? {}) };
  const retrieval = admission.sources[key];
  const title: string = p.title ?? s.title;
  const authors: string[] = p.authors ?? [p.publisher ?? s.publisher];
  const publicationDate: string | null =
    'publicationDate' in p ? p.publicationDate : (s.publishedAt ?? null);
  const fresh =
    retrieval?.httpStatus === 200
      ? `Retrieved again at admission on ${date} (SHA-256 ${retrieval.sha256}${retrieval.samePackBytes ? ', the same bytes' : ''}).`
      : retrieval
        ? `At admission on ${date} the address answered ${retrieval.httpStatus ? `HTTP ${retrieval.httpStatus}` : 'nothing'}.`
        : '';
  const version = [
    x
      ? x.version
      : `Retrieved for the candidate pack on ${s.retrievedAt} (SHA-256 ${s.sha256}). ${s.version}`,
    x ? '' : fresh,
    p.versionNote ?? '',
    ['announcement', 'webpage'].includes(s.kind)
      ? 'Its wording can change; earlier wording is not authenticated.'
      : '',
  ]
    .filter(Boolean)
    .join(' ');
  const documentId = 'documentId' in p ? p.documentId : documentOf(key);
  addOnce('sources', {
    id,
    ...(documentId ? { documentId } : {}),
    title,
    authors,
    ...(p.authorNames ? { authorNames: p.authorNames } : {}),
    publisher: p.publisher ?? s.publisher,
    ...(p.publisherId ? { publisherId: p.publisherId } : {}),
    publicationDate,
    version: noIds(prose(version), id),
    canonicalUrl: p.url ?? s.url,
    evidenceUrl: p.url ?? s.url,
    // The dataset's canonical tag marks the script (zh-Hans).
    language: s.language === 'zh' ? 'zh-Hans' : s.language,
    ...(p.archivedUrl
      ? { archivedUrl: p.archivedUrl, archivedAt: p.archivedAt }
      : {}),
    documentWords: x
      ? x.documentWords
      : {
          count: s.documentWords.count,
          basis: `${s.documentWords.basis.replace(/\.$/, '')}${s.language === 'en' ? '' : ' (each CJK character counted as one word)'}; counted for the candidate pack`,
        },
    kind: p.kind ?? kindMap[s.kind],
    accessedAt: x ? x.accessedAt : s.retrievedAt,
    reuse: {
      attribution: `${authors.join(', ')}, “${title}”${publicationDate ? `, ${publicationDate}` : ''}.`,
      licence: 'No open redistribution licence asserted',
      note: 'Bibliographic metadata, editorial paraphrases and short attributed quotations (at most 50 words each). Recheck terms before wider redistribution.',
    },
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
  [snapshotPath]: newSnapshot,
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
  execFileSync('pnpm', ['prettier', '--write', ...Object.keys(outputs)], {
    stdio: 'ignore',
  });
  console.log(
    `Added ${names.map((n) => `${added[n].length} ${n}`).join(', ')}; changed ${names.map((n) => `${changed[n].size} ${n}`).join(', ')}.`,
  );
}
