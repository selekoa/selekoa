// Admits the AI and biosecurity candidate pack (research/ai-bio) into the
// dataset, in two parts, using the authored map in
// review/ai-bio-admission-map-2026-10-30.json, the maintainer's decisions of
// 2026-10-28 (review/ai-bio-pack-2026-10-28.md) and the corrections of the
// cross-family check (research/ai-bio/cross-family-check-2026-10-28.md).
//
//   pnpm tsx scripts/ai-bio-admission.ts --verify          match every quotation in a fresh retrieval
//   pnpm tsx scripts/ai-bio-admission.ts --part 1          write part 1
//   pnpm tsx scripts/ai-bio-admission.ts --part 1 --check  compare with the stored records
//
// `--verify` reads the ignored retrieval cache that
// `node research/ai-bio/tools.mjs fetch` fills and writes
// research/ai-bio/admission-verification-2026-10-30.json; the parts read that
// file and never the cache. A part is idempotent: it first removes the rows
// its before-snapshot lists as added and restores the rows it changed, then
// rebuilds them. The pack is never changed.
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { maxQuotedWords } from '../src/domain/schema';

const dir = 'research/ai-bio';
const names = ['entities', 'claims', 'sources', 'evidence'] as const;
type Name = (typeof names)[number];
type Row = Record<string, unknown> & { id: string };
type Json = Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any

const read = (path: string) => JSON.parse(readFileSync(path, 'utf8'));
const args = process.argv.slice(2);
const check = args.includes('--check');
const map: Json = read('review/ai-bio-admission-map-2026-10-30.json');
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

const words = (s: string) =>
  s.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;

// ---------------------------------------------------------------- verify
/** Every quotation the parts admit: pack evidence and the map's additions. */
function quotations(): { key: string; source: string; passage: string }[] {
  const out: { key: string; source: string; passage: string }[] = [];
  for (const plan of Object.values(map.parts) as Json[])
    for (const id of plan.include as string[]) {
      if ((plan.hold ?? {})[id]) continue;
      const c = packClaim(id);
      if (!c) throw new Error('Not a pack record: ' + id);
      (c.evidence as Json[]).forEach((e, i) => {
        if (map.evidence[`${id}:${i}`]?.drop) return;
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
  const toolsPath = '../research/ai-bio/tools.mjs';
  const tools: Json = await import(toolsPath);
  const cache = '.local/ai-bio/doc';
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
      'Each quotation was matched in a fresh direct retrieval with the pack’s matcher (research/ai-bio/tools.mjs quoteFound), which ignores differences of whitespace, case, quotation marks, dashes, PDF line-break hyphens and Unicode compatibility forms. A source that refused or returned no text is listed with its status, and its quotations rest on the pack’s match and on the cross-family check.',
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
const snapshotPath = `review/ai-bio-admission-${part}-before-2026-10-30.json`;
const verification: Json = read(files.verification);
const admission: Json = read(files.admission);
const crossCheck: Json = read(files.check);
const checkOf = new Map<string, Json>(
  Object.values(crossCheck.items as Json).map((item: Json) => [
    item.recordId,
    item,
  ]),
);
const widenedOf = new Map<string, Json>(
  (crossCheck.widenedChecks.sourceFamilyRecords as Json[]).map((r) => [
    r.recordId,
    r,
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
// Only a record this part admits, or one the dataset already holds, may be
// pointed at as "recorded separately"; a pointer to a held record or to a
// record of the other part is an error, not a silent substitution.
const admittedIds = new Set<string>([
  ...base.claims.map((c) => c.id),
  ...(plan.include as string[]).filter((id) => !(plan.hold ?? {})[id]),
  ...(map.newClaims as Json[]).filter((n) => n.part === part).map((n) => n.id),
]);
const packIds = new Set<string>(pack.claims.map((c: Json) => c.id));
const idToken = /\b[a-z][a-z0-9]*(?:-[a-z0-9]+)+\b/g;
const tidy: [RegExp, string][] = [
  [/\(see recorded separately\)/g, '(recorded separately)'],
  [
    /\((?:the dataset's record |dataset record |recorded in the dataset, )?recorded separately\)/g,
    '(recorded separately)',
  ],
  [/the dataset's record of recorded separately/g, 'a record kept separately'],
  [/recorded separately(?:,| and) recorded separately/g, 'recorded separately'],
];
/** Reader-facing text never names a record ID (as in earlier admissions). */
function prose(text: string) {
  let out = text.replace(idToken, (t) =>
    admittedIds.has(t) ? 'recorded separately' : t,
  );
  for (let pass = 0; pass < 4; pass++)
    for (const [re, to] of tidy) out = out.replace(re, to);
  return out;
}
function noIds(text: string, where: string) {
  const left = (text.match(idToken) ?? []).find(
    (t) => admittedIds.has(t) || packIds.has(t),
  );
  if (left) throw new Error(`Record ID left in ${where}: ${left}`);
  return text;
}
const loaded =
  /\b(poach(ed|ing)?|ousted?|defect(ed|ion)?|exodus|rivals?|betray\w*|purge\w*|landmark|pioneer\w*|race)\b/i;

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
const sourceId = (key: string) => {
  const x = extraSources.get(key);
  if (x) return x.id as string;
  const s = packSources.get(key);
  if (!s) throw new Error('Unknown pack source: ' + key);
  return (
    (s.datasetSource as string) ??
    map.sources[key]?.id ??
    // The pack's own cache keys carry its prefix; a source ID keeps one.
    `source-ab-${key.replace(/^ab-/, '')}`
  );
};

function checkSentence(id: string) {
  const item = checkOf.get(id);
  const widened = widenedOf.get(id);
  if (item)
    return item.part === 'A'
      ? `A cross-family machine check (2026-10-30, item ${item.number}) answered the record’s question blind from fresh retrievals and ${item.comparison === 'agree' ? 'agreed with the record' : 'agreed in part; its corrections were applied at admission'}.`
      : `A cross-family machine check (2026-10-30, item ${item.number}) re-read the record’s sources and found ${item.evidenceSupports === 'full' ? 'full support' : 'partial support; its corrections were applied at admission'}.`;
  if (widened)
    return `A cross-family machine check (2026-10-30) re-read this record outside its brief, with the other records resting on the same source, and ${widened.comparison === 'agree' ? 'found the cited proposition supported' : 'agreed in part; its corrections were applied at admission'}.`;
  return '';
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
  return `The quotation (${words(e.passage)} words) matched the text retrieved for the candidate pack on 2026-10-28${again}. Matching ignored differences of whitespace, case, quotation marks, dashes and Unicode compatibility forms, so the source’s typography can differ.`;
}

// Quotations per dataset source, for the limit check below.
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

// ---------------------------------------------------------------- documents
const docOf = (id: string): Json | undefined =>
  map.documents[id]
    ? { documentVersion: map.documents[id].documentVersion }
    : existing('entities', id);
const genericNote: Record<string, string> = {
  publication: 'Date of publication, as the source gives it.',
  announcement: 'Date of the announcement, as the source gives it.',
  signature: 'Date of signature, as the source gives it.',
  effective: 'Date of effect, as the source gives it.',
  revision: 'Date of the revision, as the source gives it.',
};
const basisWord: Record<string, string> = {
  publication: 'date of publication',
  effective: 'date of effect',
  revision: 'date of revision',
};
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
/** A date in the prose of a note, as a reader reads it. */
const inWords = (d: string) => {
  const [y, m, day] = d.split('-');
  if (!m) return y;
  const month = months[Number(m) - 1];
  return day ? `${Number(day)} ${month} ${y}` : `${month} ${y}`;
};

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
  if (
    c.proposedPredicate &&
    !(plan.adoptedPredicates ?? []).includes(c.predicate)
  )
    throw new Error('A proposed predicate without a decision: ' + id);
  if (over.qualificationAppend)
    c.qualification = `${c.qualification} ${over.qualificationAppend}`;

  // Attributes: the pack's, then the map's.
  const attributes: Json = structuredClone(c.attributes ?? {});
  for (const [k, v] of Object.entries(over.attributes ?? {}))
    if (v === null) delete attributes[k];
    else attributes[k] = v;
  if (attributes.thought) {
    const t = attributes.thought;
    if (over.roles) t.roles = over.roles;
    if (over.missing) t.missing = over.missing;
    // A context record, and only a context record, names what is missing.
    if (!t.roles.includes('context')) delete t.missing;
    // A contesting engagement belongs only to a contesting record.
    if (c.predicate !== 'contests_proposition') delete t.engagement;
  }
  if (attributes.provision) {
    const p = attributes.provision;
    p.kind = over.kind ?? p.kind;
    // The schema's provision keys are lower-case slugs.
    p.key = (p.key ?? id.replace(/^ab-/, ''))
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  // Time: the schema's bases; a provision is dated by one of its edition's
  // own dates, with the date the pack gives in the note.
  const time: Json = { kind: c.time.kind };
  for (const key of ['date', 'from', 'until', 'basis', 'note'])
    if (c.time[key] !== undefined && c.time[key] !== null)
      time[key] = c.time[key];
  Object.assign(time, over.time ?? {});
  // Schema 2.22 (cross-family check, items 22, 24, 39 and 44): a record of a
  // card that states only a last-updated date carries the revision basis, not
  // publication. The basis follows the document's own dates.
  const dated: string | undefined =
    plan.deriveDocumentBasis && !over.time && time.kind === 'event'
      ? c.predicate === 'states_evaluation_result'
        ? c.subject
        : c.predicate === 'published' && c.object.kind === 'entity'
          ? c.object.entityId
          : undefined
      : undefined;
  if (dated) {
    const v: Json | undefined = docOf(dated)?.documentVersion;
    const byBasis: Record<string, string | undefined> = {
      publication: v?.publishedAt,
      effective: v?.effectiveAt,
      revision: v?.revisedAt,
    };
    if (v && byBasis[time.basis as string] !== time.date) {
      const basis = (['revision', 'effective', 'publication'] as const).find(
        (b) => byBasis[b] === time.date,
      );
      if (basis) time.basis = basis;
    }
  }
  if (attributes.provision && !over.time) {
    const version: Json | undefined = docOf(c.subject)?.documentVersion;
    if (!version) throw new Error('A provision without an edition: ' + id);
    const byBasis: Record<string, string | undefined> = {
      publication: version.publishedAt,
      effective: version.effectiveAt,
      revision: version.revisedAt,
    };
    const forced: string | undefined = map.editionBasis?.[c.subject];
    const keeps = !forced && time.basis && byBasis[time.basis] === time.date;
    if (!keeps) {
      const basis =
        forced ??
        (['revision', 'effective', 'publication'] as const).find(
          (b) => byBasis[b] === time.date,
        ) ??
        (version.revisedAt
          ? 'revision'
          : version.effectiveAt
            ? 'effective'
            : 'publication');
      const d = byBasis[basis];
      if (!d) throw new Error('No edition date for ' + id);
      time.date = d;
      time.basis = basis;
      time.note = `Provision as the text states it, dated by its ${basisWord[basis]}, ${inWords(d)}. ${version.dateNote}`;
    }
  }
  time.note ??=
    genericNote[time.basis as string] ?? 'Date as the source gives it.';
  time.note = noIds(prose(time.note), id);

  const statement = noIds(prose(c.statement), id);
  const hazard = c.hazardNote ? ` ${prose(c.hazardNote)}` : '';
  const qualification = noIds(prose(c.qualification) + hazard, id);
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
    const eid = `evidence-${id}-${evidenceIds.length + 1}`;
    const text =
      e.passageType === 'quote'
        ? quoteNote(key, e)
        : `The paraphrase is Selekoa’s, written from the text retrieved for the candidate pack on 2026-10-28; it is not a quotation and was not machine-matched.`;
    const note = [
      `Candidate pack passage, AI and biosecurity (${dir}).`,
      text,
      eOver.note ?? e.note ?? '',
      checkSentence(raw.id),
      'No human editorial review.',
    ]
      .filter(Boolean)
      .join(' ');
    addOnce('evidence', evidenceRow(id, eid, e, note));
    evidenceIds.push(eid);
  });
  addNewEvidence(id, evidenceIds);
  if (!evidenceIds.length) throw new Error('A record without evidence: ' + id);

  addOnce('claims', {
    id,
    subject: c.subject,
    predicate: c.predicate,
    object: c.object,
    topic: over.topic ?? map.topics[raw.group ?? 'new'] ?? 'governance',
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
    if (n.passageType === 'quote' && !admission.quotes[n.id]?.found)
      throw new Error('Added quotation not matched at admission: ' + n.id);
    const retrieval = admission.sources[n.source];
    const note = [
      `Added at the admission of the AI and biosecurity pack (${dir}).`,
      n.reason,
      n.passageType === 'quote'
        ? `The quotation (${words(n.passage)} words) matched a direct retrieval of ${date} (SHA-256 ${retrieval.sha256}). Matching ignored differences of whitespace, case, quotation marks, dashes and Unicode compatibility forms.`
        : /paraphrase/.test(n.reason ?? '')
          ? ''
          : 'The paraphrase is Selekoa’s; it is not a quotation and was not machine-matched.',
      'No human editorial review.',
    ]
      .filter(Boolean)
      .join(' ');
    const rowId = `evidence-${claimId}-${evidenceIds.length + 1}`;
    addOnce('evidence', evidenceRow(claimId, rowId, n, note));
    evidenceIds.push(rowId);
  }
}

// ---------------------------------------------------------------- claims
const include: string[] = plan.include;
for (const id of include) {
  if ((plan.hold ?? {})[id]) continue;
  const raw = packClaim(id);
  if (!raw) throw new Error('Not a pack record: ' + id);
  buildClaim(raw, map.claims[id] ?? {});
}
for (const n of (map.newClaims as Json[]).filter((n) => n.part === part))
  buildClaim(
    { ...n, evidence: n.evidence ?? [], group: n.group ?? 'new' },
    { id: n.id, topic: n.topic },
  );
for (const id of Object.keys(map.claims))
  if (!Object.values(map.parts).some((p) => (p as Json).include.includes(id)))
    throw new Error('A map entry for a record in no part: ' + id);

// --------------------------------------------------- edits to stored rows
for (const [id, edit] of Object.entries(
  (plan.storedClaimEdits ?? {}) as Record<string, Json>,
))
  changeRow('claims', id, (row) => {
    if (edit.qualification) row.qualification = edit.qualification;
    if (edit.qualificationAppend)
      row.qualification = `${row.qualification} ${edit.qualificationAppend}`;
    if (edit.kind) {
      const a = row.attributes as Json | undefined;
      if (!a?.provision) throw new Error(`No provision to re-kind: ${id}`);
      a.provision.kind = edit.kind;
    }
  });

for (const [id, edit] of Object.entries(
  (plan.storedSourceEdits ?? {}) as Record<string, Json>,
))
  changeRow('sources', id, (row) => {
    for (const [k, v] of Object.entries(edit)) row[k] = v;
  });

// ---------------------------------------------------------------- entities
const referenced = new Set<string>();
for (const c of added.claims) {
  referenced.add(c.subject as string);
  if ((c.object as Json).kind === 'entity')
    referenced.add((c.object as Json).entityId);
}
for (const [id, d] of Object.entries(map.documents as Record<string, Json>)) {
  if (!referenced.has(id) || existing('entities', id)) continue;
  // A version needs at least one of its own dates; a document whose
  // expression states none is admitted without version metadata.
  const v: Json | undefined = d.documentVersion;
  if (v && !(v.publishedAt || v.effectiveAt || v.revisedAt))
    delete d.documentVersion;
  if (d.documentVersion) referenced.add(d.documentVersion.publisherId);
  addOnce('entities', {
    id,
    name: d.name,
    ...(d.shortName ? { shortName: d.shortName } : {}),
    type: 'document',
    subtype: d.subtype,
    aliases: d.aliases ?? [],
    description: noIds(prose(d.description), id),
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
  if (!referenced.has(id) || existing('entities', id) || d.existing) continue;
  addOnce('entities', {
    id,
    name: d.name,
    ...(d.shortName ? { shortName: d.shortName } : {}),
    type: d.type,
    subtype: d.subtype,
    aliases: d.aliases ?? [],
    description: noIds(prose(d.description), id),
    sourceIds: (d.sources as string[]).map(sourceId),
    ...(d.proposition ? { proposition: d.proposition } : {}),
  });
  for (const k of d.sources as string[]) usedSources.add(k);
}
for (const id of referenced)
  if (!existing('entities', id) && !added.entities.some((e) => e.id === id))
    throw new Error('Entity without a row: ' + id);

// ---------------------------------------------------------------- sources
const documentOf = (key: string) =>
  packSources.get(key)?.documentId ??
  Object.entries(map.documents as Record<string, Json>).find(([, d]) =>
    (d.sources as string[]).includes(key),
  )?.[0];
for (const key of [...packSources.keys(), ...extraSources.keys()].filter((k) =>
  usedSources.has(k),
)) {
  const id = sourceId(key);
  if (existing('sources', id) || added.sources.some((s) => s.id === id))
    continue;
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
  // A source names its document only where that document is in the dataset;
  // the expressions of documents this part holds back carry no identity.
  const candidate = 'documentId' in p ? p.documentId : documentOf(key);
  const documentId =
    candidate &&
    (existing('entities', candidate) ||
      added.entities.some((e) => e.id === candidate))
      ? candidate
      : undefined;
  // A source is the expression of its document, so the document's publisher
  // identifies it where that entity is in the dataset.
  const docPublisher = documentId
    ? (map.documents[documentId]?.documentVersion?.publisherId ??
      (existing('entities', documentId) as Json | undefined)?.documentVersion
        ?.publisherId ??
      pack.documents.find((d: Json) => d.id === documentId)?.publisherId)
    : undefined;
  const publisherId =
    p.publisherId ??
    (docPublisher &&
    (existing('entities', docPublisher) ||
      added.entities.some((e) => e.id === docPublisher))
      ? docPublisher
      : undefined);
  addOnce('sources', {
    id,
    ...(documentId ? { documentId } : {}),
    title,
    authors,
    ...(p.authorNames ? { authorNames: p.authorNames } : {}),
    publisher: p.publisher ?? s.publisher,
    ...(publisherId ? { publisherId } : {}),
    publicationDate,
    version: noIds(prose(version), id),
    ...(p.versionDate ? { versionDate: p.versionDate } : {}),
    canonicalUrl: p.url ?? s.url,
    evidenceUrl: p.evidenceUrl ?? p.url ?? s.url,
    language: s.language === 'zh' ? 'zh-Hans' : s.language,
    ...(p.archivedUrl
      ? { archivedUrl: p.archivedUrl, archivedAt: p.archivedAt }
      : {}),
    ...((x?.documentWords ?? s.documentWords)
      ? {
          documentWords: x
            ? x.documentWords
            : {
                count: s.documentWords.count,
                basis: `${s.documentWords.basis.replace(/\.$/, '')}; counted for the candidate pack`,
              },
        }
      : {}),
    kind: p.kind ?? map.sourceKindMap[s.kind],
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
