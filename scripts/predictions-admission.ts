// Admits the predictions candidate pack (research/predictions) into the
// dataset as "Predictions on record" (schema 2.32), using the authored map
// review/predictions-admission-map-<date>.json and the maintainer's decisions
// (review/predictions-pack-2026-11-02.md, "Maintainer decisions", and the
// answers of 2026-11-05 to the second adjudication).
//
//   pnpm tsx scripts/predictions-admission.ts            write the records and the before-snapshot
//   pnpm tsx scripts/predictions-admission.ts --check    compare with the stored records
//   pnpm tsx scripts/predictions-admission.ts --base <commit>
//                                         rebuild on a new base: the snapshot names that base commit
//
// One `states_prediction` record per admitted pack record, on the document
// that states it; new documents and sources for the texts the dataset does
// not hold. Every passage admitted is a passage of the pack that its own
// verification matched (in the retrieved text, the dataset's passage or a
// checked copy), or a labelled paraphrase whose quoted words lie in such a
// passage. Nothing is retrieved here. Every map entry must change or check
// something, or the script stops.
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { withinQuotationLimit, maxQuotedWords } from '../src/domain/schema';
import {
  normaliseWords,
  predictionVerdictWords,
  quotedFragments,
  unquoted,
} from '../src/domain/prediction-fields';

const names = ['entities', 'claims', 'sources', 'evidence'] as const;
type Name = (typeof names)[number];
type Row = Record<string, unknown> & { id: string };
type Json = Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any

const read = (path: string) => JSON.parse(readFileSync(path, 'utf8'));
const args = process.argv.slice(2);
const check = args.includes('--check');
const mapFile = readdirSync('review').find((f) =>
  f.startsWith('predictions-admission-map-'),
);
if (!mapFile) throw new Error('No map');
const map: Json = read(`review/${mapFile}`);
const date: string = map.admissionDate;
const pack: Json = read(map.files.pack);
const verification: Json = read(map.files.verification);
const snapshotPath = `review/predictions-admission-before-${date}.json`;

// ---------------------------------------------------------------- helpers
const words = (s: string) => s.trim().split(/\s+/).length;
const sha = (value: unknown) =>
  createHash('sha256').update(JSON.stringify(value)).digest('hex');
/** Each map entry records here what it did; one that did nothing stops the script. */
const used = new Set<string>();
const use = (key: string) => used.add(key);

// ---------------------------------------------------------------- base
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
// main, rows it restores may have changed there, and the admission is then
// regenerated from the new base, never patched.
if (snapshot) {
  const stale = names.filter(
    (n) =>
      sha(
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
const baseArg = args.includes('--base')
  ? args[args.indexOf('--base') + 1]
  : undefined;
const baseCommit = execFileSync('git', ['rev-parse', baseArg ?? 'HEAD'], {
  encoding: 'utf8',
}).trim();

// The prefix is the pack's; no stored record may use it.
for (const n of names)
  for (const r of base[n])
    if (/^(pr-|source-pr-|evidence-pr-)/.test(r.id))
      throw new Error(
        `A stored record already uses the pack's prefix: ${r.id}`,
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

// ---------------------------------------------------------------- text
const replacements = map.replacements as [string, string][];
const replacementHits = new Map<number, number>();
/** The pack's research wording replaced by reader wording, in order. */
const reword = (s: string) =>
  replacements.reduce((t, [from, to], i) => {
    if (!t.includes(from)) return t;
    replacementHits.set(i, (replacementHits.get(i) ?? 0) + 1);
    return t.split(from).join(to);
  }, s);
/** Research-pack wording that must not reach a record. */
const packWording =
  /\bpr-[a-f]-|\bdecision \d|\bpack\b|checker|\bCodex\b|\bsession\b|\bpass 2\b|review note|this environment|preparing environment/i;
const finalText = (s: string, where: string) => {
  if (packWording.test(s))
    throw new Error(
      `Research-pack wording left in ${where}: ${s.match(packWording)![0]} in "${s}"`,
    );
  if (predictionVerdictWords.test(unquoted(s)))
    throw new Error(`Verdict wording in ${where}: ${s}`);
  return s;
};

// ---------------------------------------------------------------- pack
const packSources = new Map<string, Json>(
  (pack.sources as Json[]).map((s) => [s.key, s]),
);
const verified = new Map<string, Json>();
for (const q of verification.perQuote as Json[])
  if (!verified.has(`${q.record} ${q.evidence}`))
    verified.set(`${q.record} ${q.evidence}`, q);
if (verification.problems?.length || verification.notAdmissible?.length)
  throw new Error(
    'The pack verification lists problems or records not admissible',
  );
const heldIds = new Set(Object.keys(map.held));
const records = (pack.records as Json[]).filter((r) => {
  if (heldIds.has(r.id)) {
    use(`held:${r.id}`);
    return false;
  }
  return true;
});
for (const id of heldIds)
  if (!(pack.records as Json[]).some((r) => r.id === id))
    throw new Error('Unknown held record: ' + id);
for (const id of Object.keys(map.records))
  if (!records.some((r) => r.id === id))
    throw new Error('A map record that is not admitted: ' + id);

// ---------------------------------------------------------------- sources and documents
type SourcePlan = {
  use?: string;
  new?: string;
  kind?: string;
  document?: string;
  subject?: string;
  title?: string;
  readCopy?: string;
  alongside?: string;
  documentWords?: { count: number; basis: string };
};
const sourcePlans = map.sources as Record<string, SourcePlan>;
for (const key of packSources.keys())
  if (!sourcePlans[key])
    throw new Error('A pack source without a map entry: ' + key);
const sourceIdOf = (key: string) => {
  const plan = sourcePlans[key];
  if (!plan) throw new Error('Unknown pack source: ' + key);
  return (plan.use ?? plan.new)!;
};
/** The document a record on this source is about. */
const subjectOf = (key: string): string => {
  const plan = sourcePlans[key];
  if (plan.subject) return plan.subject;
  if (plan.document) return plan.document;
  const row = existing('sources', plan.use!);
  if (!row?.documentId)
    throw new Error(`No document for the pack source ${key}`);
  return row.documentId as string;
};
const isDate = (s: string) => /^\d{4}(-\d{2}(-\d{2})?)?$/.test(s);
const waybackDate = (url: string) => {
  const m = /^https:\/\/web\.archive\.org\/web\/(\d{4})(\d{2})(\d{2})/.exec(
    url,
  );
  return m ? `${m[1]}-${m[2]}-${m[3]}` : undefined;
};

function admitSources() {
  for (const [key, plan] of Object.entries(sourcePlans)) {
    const s = packSources.get(key);
    if (!s) throw new Error('A map source the pack does not have: ' + key);
    if (plan.use) {
      const row = existing('sources', plan.use);
      if (!row) throw new Error('Not a dataset source: ' + plan.use);
      if (s.datasetSource && s.datasetSource !== plan.use)
        throw new Error(`${key}: the pack names ${s.datasetSource}`);
      if (
        plan.subject &&
        existing('entities', plan.subject)?.type !== 'document'
      )
        throw new Error('Not a document: ' + plan.subject);
      if (plan.documentWords) {
        if (row.documentWords)
          throw new Error(`${plan.use} already records its length`);
        change('sources', plan.use).documentWords = plan.documentWords;
      }
      use(`source:${key}`);
      continue;
    }
    if (!plan.new || !plan.kind)
      throw new Error('A new source needs id and kind: ' + key);
    if (s.datasetSource && !plan.alongside?.startsWith(s.datasetSource + ' '))
      throw new Error(`${key} is held by the dataset as ${s.datasetSource}`);
    const copy = s.checkedCopy as Json | undefined;
    const archived = copy?.url?.startsWith('https://web.archive.org/')
      ? copy.url
      : undefined;
    const retrieval = s.retrieval as Json | undefined;
    const length = plan.documentWords ?? s.documentWords;
    const versionParts = [
      reword(s.version as string),
      retrieval?.sha256
        ? `Retrieved ${retrieval.retrievedAt} (HTTP ${retrieval.httpStatus}, SHA-256 ${retrieval.sha256}).`
        : '',
      s.date?.note ? reword(s.date.note) : '',
    ].filter(Boolean);
    const row: Row = {
      id: plan.new,
      ...(plan.document ? { documentId: plan.document } : {}),
      title: plan.title ?? s.title,
      authors: s.authors,
      publisher: s.publisher,
      publicationDate:
        s.date?.kind === 'captured' || !isDate(s.date?.value ?? '')
          ? null
          : s.date.value,
      version: finalText(versionParts.join(' '), `source ${key}`),
      canonicalUrl: s.url,
      evidenceUrl: archived ?? retrieval?.finalUrl ?? s.url,
      language: 'en',
      ...(archived
        ? { archivedUrl: archived, archivedAt: waybackDate(archived) }
        : {}),
      ...(length ? { documentWords: length } : {}),
      kind: plan.kind,
      accessedAt: retrieval?.retrievedAt ?? date,
      reuse: {
        attribution: `${(s.authors as string[]).join(', ')}, “${s.title}”, ${s.date?.value ?? 'undated'}.`,
        licence: 'No open redistribution licence asserted',
        note: 'Bibliographic metadata, editorial paraphrases and short attributed quotations (at most 50 words each). Recheck terms before wider redistribution.',
      },
    };
    addOnce('sources', row);
    use(`source:${key}`);
  }
}

function admitDocuments() {
  const documents = map.documents as Record<string, Json>;
  for (const [id, d] of Object.entries(documents)) {
    const sources = Object.entries(sourcePlans)
      .filter(([, p]) => p.new && p.document === id)
      .map(([, p]) => p.new!);
    if (!sources.length)
      throw new Error('A map document without a source: ' + id);
    const row = existing('entities', id);
    if (row) throw new Error('The dataset already has the document ' + id);
    addOnce('entities', {
      id,
      name: d.name,
      shortName: d.shortName,
      type: 'document',
      subtype: d.subtype,
      aliases: [],
      description: d.description,
      sourceIds: sources,
    });
    use(`document:${id}`);
  }
  // A new source of an existing document joins its sources.
  for (const p of Object.values(sourcePlans))
    if (p.new && p.document && !documents[p.document]) {
      const doc = change('entities', p.document);
      if (doc.type !== 'document')
        throw new Error('Not a document: ' + p.document);
      doc.sourceIds = [...(doc.sourceIds as string[]), p.new];
    }
}

// ---------------------------------------------------------------- records
const setPath = (obj: Json, path: string, value: unknown) => {
  const parts = path.split('.');
  let o = obj;
  for (const p of parts.slice(0, -1)) o = o[p] ??= {};
  o[parts.at(-1)!] = value;
};
const dateKindNote: Record<string, string> = {
  published: 'Publication date of the text.',
  posted: 'Date of the post.',
  'survey-report':
    'Date of the survey report; when the survey was conducted is in the record’s survey details.',
  'dated-typescript': 'Date of the typescript.',
  'bet-made': 'Year the bet was made.',
  captured: 'Date of the copy the figure is read from.',
};
const dateBasis: Record<string, string> = {
  published: 'publication',
  posted: 'publication',
  'survey-report': 'publication',
};
const quote = (s: string) => `“${s.replace(/[“]/g, '‘').replace(/[”]/g, '’')}”`;

function statement(r: Json, doc: Json): string {
  const event =
    r.eventType === 'paraphrase' ? `${r.event} (paraphrased)` : quote(r.event);
  const by = r.predictor.name;
  const when = r.sourceDate.date;
  const title = quote(doc.name as string);
  const horizon = `horizon as stated: ${r.horizon.asStated}`;
  const lead: Record<string, string> = {
    'stated-forecast': `${title} (${when}) states a prediction by ${by}: ${event}; ${horizon}.`,
    'public-bet': `${title} (${when}) records a public bet, ${by}: ${event}; ${horizon}.`,
    'expert-survey': `${title} (${when}) reports a survey result (${by}): ${event}; ${horizon}.`,
    'platform-question': `A copy of ${when} of ${((doc.shortName ?? doc.name) as string).replace(/ \(capture of [^)]*\)$/, '')} displays the platform’s community prediction for the question ${event}; ${horizon}.`,
    'reported-statement': `${title} (${when}) reports predictions by ${by}: ${event}; ${horizon}.`,
  };
  const text =
    lead[r.form] +
    (r.mode === 'forecast-or-aim'
      ? ' The sentence can be read as a forecast or as an aim.'
      : '') +
    ' The record says nothing about whether the event happened.';
  if (text.length > 800) throw new Error('Statement too long: ' + r.id);
  return text;
}

/** Who read a passage in a checked copy, from the pack's verification method. */
const readers = (method: string) => {
  const inner = method
    .replace(/^checked copy \(/, '')
    .replace(/\)(, .*)?$/, '');
  return inner.split('; ').map((part) => {
    const [who, ...rest] = part.split(', ');
    const when = rest.at(-1);
    if (who === 'cross-family checker')
      return `by a reviewer from a different model family on ${when}`;
    if (who === 'preparing session')
      return `on the page image by the automated research assistant that prepared the record on ${when}`;
    if (who === 'adjudicating session')
      return `on the page image by an automated research assistant of the preparing model family on ${when}`;
    throw new Error('Unknown reader: ' + part);
  });
};

function evidenceNote(
  r: Json,
  e: Json,
  index: number,
  plan: SourcePlan,
  paraphrased: string | undefined,
  mainSource: string,
): string {
  const q = verified.get(`${r.id} ${index}`);
  const s = packSources.get(e.source)!;
  const retrieval = s.retrieval as Json | undefined;
  let how: string;
  const method: string = q?.method ?? '';
  if (method.startsWith('retrieved-text') && plan.readCopy)
    how = `Matched by machine${method.includes('(') ? ` (${method.slice(method.indexOf('(') + 1, -1)})` : ''}.`;
  else if (method.startsWith('retrieved-text'))
    how = `Matched by machine in a retrieval of ${retrieval?.retrievedAt} (SHA-256 ${retrieval?.sha256})${method.includes('(') ? `; ${method.slice(method.indexOf('(') + 1, -1)}` : ''}.`;
  else if (method === 'dataset-passage')
    how = 'Checked against the dataset’s checked passage from the same source.';
  else if (method.startsWith('checked copy'))
    how = `Read ${readers(method).join(' and ')}${method.includes('words quoted in a paraphrase') ? '; the paraphrase’s quoted words are as read' : ''}.`;
  else if (e.passageType === 'paraphrase' && retrieval?.sha256)
    how = `Paraphrase of the text retrieved on ${retrieval.retrievedAt} (SHA-256 ${retrieval.sha256}).`;
  else throw new Error(`Unverified passage: ${r.id} ${index}`);
  if (paraphrased)
    how = `Paraphrase, with the record’s words in quotation marks, of a passage ${how[0].toLowerCase()}${how.slice(1)} ${paraphrased}`;
  const parts = [
    how,
    plan.readCopy ?? '',
    r.copyRead && e.source === mainSource
      ? `Copy read: ${reword(r.copyRead)}`
      : '',
    'Machine-checked; no human editorial review.',
  ];
  return parts.filter(Boolean).join(' ');
}

function admitRecords() {
  for (const raw of records) {
    const r: Json = structuredClone(raw);
    const plan: Json = map.records[r.id] ?? {};
    if (map.records[r.id]) use(`record:${r.id}`);
    // Research wording out.
    for (const f of ['qualification', 'eventNote', 'hedge', 'conditions'])
      if (typeof r[f] === 'string') r[f] = reword(r[f]);
    for (const f of [
      'sourceDate',
      'attested',
      'retrospective',
      'capture',
      'occasion',
    ])
      if (r[f]?.note) r[f].note = reword(r[f].note);
    r.horizon.precision = reword(r.horizon.precision);
    // Map edits.
    for (const [field, from, to] of (plan.edits ?? []) as [
      string,
      string,
      string,
    ][]) {
      if (typeof r[field] !== 'string' || !r[field].includes(from))
        throw new Error(`Edit does not apply: ${r.id} ${field} "${from}"`);
      r[field] = r[field].replace(from, to);
    }
    for (const [path, value] of Object.entries(plan.set ?? {})) {
      if (
        path === 'eventNote' ||
        path === 'hedge' ||
        path === 'conditions' ||
        path === 'survey' ||
        path === 'probability' ||
        path.startsWith('horizon.')
      )
        setPath(r, path, value);
      else throw new Error(`Unknown set path ${path} on ${r.id}`);
    }
    const evidence: Json[] = (r.evidence as Json[]).map((e, i) => ({
      ...e,
      index: i + 1,
    }));
    // Paraphrases: the quoted words must lie in the passage they replace, or
    // in a checked transcription of the same copy.
    for (const [idx, text] of Object.entries(plan.paraphrase ?? {}) as [
      string,
      string,
    ][]) {
      const e = evidence[Number(idx) - 1];
      if (!e) throw new Error(`No passage ${idx} on ${r.id}`);
      const s = packSources.get(e.source)!;
      const checked = [
        ...evidence
          .filter((x) => x.source === e.source)
          .map((x) => x.passage as string),
        ...((s.checkedCopy?.passages ?? []) as Json[]).map(
          (p) => p.passage as string,
        ),
      ].map(normaliseWords);
      for (const f of quotedFragments(text))
        if (!checked.some((c) => c.includes(normaliseWords(f))))
          throw new Error(
            `A paraphrase quotes words not in the checked text: ${r.id} "${f}"`,
          );
      e.passage = text;
      e.passageType = 'paraphrase';
      e.paraphrasedReason = plan.reason;
      if (!plan.reason)
        throw new Error('A paraphrase without a reason: ' + r.id);
    }
    const dropped = new Set<string>(plan.drop ?? []);
    for (const d of dropped)
      if (!evidence[Number(d) - 1])
        throw new Error(`No passage ${d} on ${r.id}`);
    const kept = evidence.filter((e) => !dropped.has(String(e.index)));
    // Every remaining quotation verified by the pack; at most 50 words.
    for (const e of kept) {
      if (e.passageType === 'quote') {
        const q = verified.get(`${r.id} ${e.index}`);
        if (!q?.found)
          throw new Error(`Unverified quotation: ${r.id} ${e.index}`);
        if (words(e.passage) > 50)
          throw new Error(`Over 50 words: ${r.id} ${e.index}`);
      }
    }
    const firstSource = kept[0].source as string;
    const subject = subjectOf(firstSource);
    const doc =
      added.entities.find((x) => x.id === subject) ??
      existing('entities', subject);
    if (doc?.type !== 'document') throw new Error('Not a document: ' + subject);
    const evidenceIds: string[] = [];
    kept.forEach((e, i) => {
      const id = `evidence-${r.id}-${i + 1}`;
      evidenceIds.push(id);
      const sp = sourcePlans[e.source];
      const support = plan.evidenceSupport?.[String(e.index)] ?? 'supports';
      addOnce('evidence', {
        id,
        claimId: r.id,
        sourceId: sourceIdOf(e.source),
        sourceRole: e.sourceRole,
        support,
        locator: e.locator,
        passage: e.passage,
        passageType: e.passageType,
        verification: 'machine_checked',
        checkedAt: e.checkedAt,
        note: finalText(
          evidenceNote(r, e, e.index, sp, e.paraphrasedReason, firstSource),
          `${id} note`,
        ),
        ...(verified
          .get(`${r.id} ${e.index}`)
          ?.method?.startsWith('retrieved-text')
          ? { retrievalRoute: 'direct' }
          : {}),
      });
    });
    for (const k of Object.keys(plan.evidenceSupport ?? {}))
      if (!evidence[Number(k) - 1])
        throw new Error(`No passage ${k} on ${r.id}`);
    const h = r.horizon;
    const predictorIds: string[] =
      map.predictors?.[r.id] ??
      (r.predictor.entityId ? [r.predictor.entityId] : []);
    if (map.predictors?.[r.id]) use(`predictor:${r.id}`);
    for (const e of predictorIds)
      if (!existing('entities', e)) throw new Error('Not a record: ' + e);
    const betPlan = map.bets?.[r.id];
    if (betPlan) use(`bet:${r.id}`);
    const prediction: Json = {
      form: r.form,
      ...(r.mode ? { mode: r.mode } : {}),
      predictor: {
        kind: r.predictor.kind,
        label: r.predictor.name,
        ...(predictorIds.length ? { entityIds: predictorIds } : {}),
        ...(r.predictor.reporter
          ? { reporter: { label: r.predictor.reporter.name } }
          : {}),
      },
      event: {
        type: r.eventType === 'paraphrase' ? 'paraphrase' : 'quote',
        text: r.event,
        ...(r.eventNote ? { note: r.eventNote } : {}),
      },
      horizon: {
        asStated: h.asStated,
        ...(h.words ? { words: h.words } : {}),
        kind: h.kind,
        ...(h.years ? { years: h.years } : {}),
        ...(h.interval ? { interval: h.interval } : {}),
        ...(h.relation ? { relation: h.relation } : {}),
        precision: h.precision,
        ...(h.note ? { note: reword(h.note) } : {}),
      },
      ...(r.occasion ? { occasion: r.occasion } : {}),
      ...(r.probability
        ? {
            probability: {
              asStated: r.probability.asStated,
              words: r.probability.words,
            },
          }
        : {}),
      ...(r.confidence
        ? {
            confidence: {
              asStated: r.confidence.asStated,
              words: r.confidence.words,
            },
          }
        : {}),
      ...(r.points
        ? {
            points: (r.points as Json[]).map((p) => ({
              ...(p.probability ? { probability: p.probability } : {}),
              horizon: p.horizon,
              ...(p.subject ? { subject: p.subject } : {}),
              ...(p.version ? { version: p.version } : {}),
              ...(p.date ? { date: p.date } : {}),
            })),
          }
        : {}),
      ...(r.conditions ? { conditions: r.conditions } : {}),
      ...(r.hedge ? { hedge: r.hedge } : {}),
      ...(r.survey ? { survey: r.survey } : {}),
      ...(r.form === 'public-bet'
        ? {
            bet: {
              platform:
                betPlan?.platform ??
                (() => {
                  throw new Error('A bet without a platform: ' + r.id);
                })(),
              parties: (r.parties as Json[]).map((p) => ({
                label: p.name,
                position: p.position,
              })),
              stakes: r.stakes,
            },
          }
        : {}),
      ...(r.capture
        ? {
            capture: {
              date: r.capture.date,
              timestamp: r.capture.timestamp,
              url: packSources.get(firstSource)!.checkedCopy.url,
              note: r.capture.note,
            },
          }
        : {}),
      ...(r.attested ? { attested: r.attested } : {}),
      ...(r.retrospective ? { retrospective: r.retrospective } : {}),
    };
    const sd = r.sourceDate;
    const timeNote = [dateKindNote[sd.kind], sd.note].filter(Boolean).join(' ');
    if (!dateKindNote[sd.kind])
      throw new Error('Unknown date kind: ' + sd.kind);
    const claim: Row = {
      id: r.id,
      subject,
      predicate: 'states_prediction',
      object: { kind: 'literal', value: r.event },
      topic: 'ideas',
      statement: finalText(statement(r, doc), `${r.id} statement`),
      time: {
        kind: 'event',
        date: sd.date,
        ...(dateBasis[sd.kind] ? { basis: dateBasis[sd.kind] } : {}),
        note: finalText(timeNote, `${r.id} time note`),
      },
      derivation: 'explicit',
      resolution: 'supported',
      editorialState: 'seed',
      qualification: finalText(r.qualification, `${r.id} qualification`),
      evidenceIds,
      recordedAt: date,
      attributes: { prediction },
    };
    for (const t of [
      r.eventNote,
      r.hedge,
      r.conditions,
      r.attested?.note,
      r.retrospective?.note,
      r.capture?.note,
      r.occasion?.note,
      h.precision,
    ])
      if (t) finalText(t, r.id);
    addOnce('claims', claim);
  }
}

admitSources();
admitDocuments();
admitRecords();

// ---------------------------------------------------------------- map coverage
for (const key of Object.keys(sourcePlans))
  if (!used.has(`source:${key}`))
    throw new Error('A map source that did nothing: ' + key);
for (const key of Object.keys(map.documents))
  if (!used.has(`document:${key}`))
    throw new Error('A map document that did nothing: ' + key);
for (const key of Object.keys(map.predictors ?? {}))
  if (!used.has(`predictor:${key}`))
    throw new Error('A map predictor entry that did nothing: ' + key);
for (const key of Object.keys(map.bets ?? {}))
  if (!used.has(`bet:${key}`))
    throw new Error('A map bet entry that did nothing: ' + key);
const unusedReplacements = replacements.filter(
  (_, i) => !replacementHits.get(i),
);
if (unusedReplacements.length)
  throw new Error(
    'Replacements that changed nothing:\n' +
      unusedReplacements.map(([from]) => from).join('\n'),
  );
if (added.claims.length + heldIds.size !== (pack.records as Json[]).length)
  throw new Error('Admitted and held records do not cover the pack');

// ---------------------------------------------------------------- limits
const overLimit: string[] = [];
const quotedSources = new Set(
  added.evidence
    .filter((e) => e.passageType === 'quote')
    .map((e) => e.sourceId as string),
);
const limits: Record<string, string> = {};
for (const id of quotedSources) {
  const row =
    (added.sources.find((r) => r.id === id) as Json | undefined) ??
    (changed.sources.has(id)
      ? existing('sources', id)
      : existing('sources', id));
  const length = (row?.documentWords as Json)?.count as number | undefined;
  const all: string[] = [];
  for (const e of [...base.evidence, ...added.evidence])
    if (e.sourceId === id && e.passageType === 'quote')
      all.push(e.passage as string);
  const total = [
    ...new Set(all.map((p) => p.trim().replace(/\s+/g, ' '))),
  ].reduce((n, p) => n + words(p), 0);
  limits[id] = `${total} of ${length ? maxQuotedWords(length) : '?'}`;
  if (!length || !withinQuotationLimit(length, all))
    overLimit.push(
      `${id}: ${total} quoted words, limit ${length ? maxQuotedWords(length) : '?'}`,
    );
}
if (overLimit.length)
  throw new Error('Over the quotation limit:\n' + overLimit.join('\n'));

// ---------------------------------------------------------------- output
const meta = {
  ...base.meta,
  schemaVersion: '2.32',
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
  console.log(
    `Added ${names.map((n) => `${added[n].length} ${n}`).join(', ')}; changed ${names.map((n) => `${changed[n].size} ${n}`).join(', ')}.`,
  );
  console.log('Quoted words by source (this admission and earlier):');
  for (const [id, l] of Object.entries(limits).sort())
    console.log(`  ${id}: ${l}`);
}
