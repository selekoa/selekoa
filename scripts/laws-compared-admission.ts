// Admits the laws-compared candidate pack (research/laws-compared) into the
// dataset, using the authored map of each part in
// review/laws-compared-admission-<part>-map-<date>.json and the maintainer's
// decisions of 2026-11-03 and 2026-11-04
// (review/laws-compared-pack-2026-11-02.md, "Maintainer decisions"). Adapted
// from scripts/model-cards-admission.ts.
//
// Part 1 (no schema change) checks that the nine compared instruments are
// documents of the dataset with their sources and versions, and that their
// standing records exist and say what the pack says; it admits the effect
// rules the dataset lacks, with a computed date marked as computed (9a), and
// records the expressions the pack read. Part 2 (schema 2.31, a minor
// release) admits one record per answered cell of "Laws compared"
// (src/reading/laws-compared.ts), the Illinois act's version, sources and
// legislature, and the expressions of the sources the cells quote, under the
// maintainer's decisions of 2026-11-05 as well.
//
//   pnpm tsx scripts/laws-compared-admission.ts --part 1            write the records and the before-snapshot
//   pnpm tsx scripts/laws-compared-admission.ts --part 1 --check    compare with the stored records
//   pnpm tsx scripts/laws-compared-admission.ts --part 2 [--check] [--base <commit>]
//   pnpm tsx scripts/laws-compared-admission.ts --part 1 --base <commit>
//                                         rebuild on a new base: the snapshot names that base commit
//
// Every passage admitted is a passage of the pack that its own verification
// matched in the retrieved text; nothing is retrieved again here.
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { maxQuotedWords } from '../src/domain/schema';
import { lawFacetById, lawFacetKey } from '../src/domain/law-questions';
import { lawStandingText } from '../src/domain/law-comparison-view';
import { lawsCompared } from '../src/reading/laws-compared';

const names = ['entities', 'claims', 'sources', 'evidence'] as const;
type Name = (typeof names)[number];
type Row = Record<string, unknown> & { id: string };
type Json = Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any

const read = (path: string) => JSON.parse(readFileSync(path, 'utf8'));
const args = process.argv.slice(2);
const check = args.includes('--check');
const part = args.includes('--part') ? args[args.indexOf('--part') + 1] : '1';
if (part !== '1' && part !== '2') throw new Error('Unknown part: ' + part);
const mapFile = readdirSync('review').find((f) =>
  f.startsWith(`laws-compared-admission-${part}-map-`),
);
if (!mapFile) throw new Error('No map for part ' + part);
const map: Json = read(`review/${mapFile}`);
const date: string = map.admissionDate;
const dir = 'research/laws-compared';
const pack: Json = read(map.files.pack);
const verification: Json = read(map.files.verification);
const crossCheck: Json = read(map.files.check);
const snapshotPath = `review/laws-compared-admission-${part}-before-${date}.json`;

// ---------------------------------------------------------------- helpers
const words = (s: string) => s.trim().split(/\s+/).length;
const sha = (value: unknown) =>
  createHash('sha256').update(JSON.stringify(value)).digest('hex');
/** The pack's matching normalisation, roughly: quotes, dashes, whitespace, case. */
const norm = (s: string) =>
  s
    .normalize('NFKC')
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[‐-―]/g, '-')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
/** Map keys an entry may carry; any other key stops the script, so no entry is silently ignored. */
const allowed: Record<string, string[]> = {
  instrument: [
    'entities',
    'sources',
    'family',
    'standing',
    'heldPassages',
    'packSourceLinks',
  ],
  standing: ['id', 'predicate', 'subject', 'object', 'date', 'announced'],
  heldPassage: ['quote', 'reason'],
  provision: [
    'id',
    'instrument',
    'cell',
    'subject',
    'source',
    'label',
    'key',
    'statement',
    'date',
    'timeNote',
    'rationale',
    'qualification',
    'signature',
  ],
  signature: ['claim', 'source', 'locator', 'paraphrase'],
};
const keysOk = (kind: string, value: Json, where: string) => {
  for (const k of Object.keys(value))
    if (!allowed[kind].includes(k))
      throw new Error(`Unknown ${kind} key "${k}" in ${where}`);
};

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
// main, rows the snapshot restores may have changed there, and the
// admission is then regenerated from the new base, never patched.
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

// ---------------------------------------------------------------- pack
const packInstruments = new Map<string, Json>(
  (pack.instruments as Json[]).map((i) => [i.id, i]),
);
const packSources = new Map<string, Json>(
  (pack.sources as Json[]).map((s) => [s.key, s]),
);
const cellOf = new Map<string, Json>(
  (pack.cells as Json[]).map((c) => [c.id, c]),
);
const verified = new Map<string, Json>(
  (verification.quotes as Json[]).map((q) => [q.claim, q]),
);
const itemOf = new Map<string, Json>(
  Object.values(crossCheck.items as Json).map((x: Json) => [x.cellId, x]),
);
/** Each map entry records here what it did, so an entry that did nothing stops the script. */
const done = new Map<string, string>();

// ---------------------------------------------------------------- instruments
/**
 * Part 1 reuses the dataset's documents, sources and standing records: each
 * is checked against the pack, and none is duplicated. A standing passage of
 * the pack must be an evidence passage of a reused standing record, or be
 * held in the map with its reason.
 */
function checkInstruments() {
  const mapped = new Set([
    ...Object.keys(map.instruments),
    ...Object.keys(map.held),
  ]);
  const missing = [...packInstruments.keys()].filter((id) => !mapped.has(id));
  if (missing.length)
    throw new Error('Pack instruments without a map entry: ' + missing);
  for (const id of Object.keys(map.held))
    if (!packInstruments.has(id)) throw new Error('Unknown held row: ' + id);
    else done.set(`held:${id}`, 'held');

  for (const [rowId, plan] of Object.entries(
    map.instruments as Record<string, Json>,
  )) {
    keysOk('instrument', plan, rowId);
    const inst = packInstruments.get(rowId);
    if (!inst) throw new Error('Unknown pack instrument: ' + rowId);
    // Documents: the pack's, existing, with an exact version.
    if (JSON.stringify(plan.entities) !== JSON.stringify(inst.documentIds))
      throw new Error('Documents differ from the pack: ' + rowId);
    for (const e of plan.entities as string[]) {
      const row = existing('entities', e);
      if (row?.type !== 'document' || !row.documentVersion)
        throw new Error('Not a versioned document of the dataset: ' + e);
      if (plan.family && (row.documentVersion as Json).family !== plan.family)
        throw new Error(`${e} is not in the family ${plan.family}`);
    }
    // Sources: every dataset source the pack names, existing.
    const links: Record<string, string> = plan.packSourceLinks ?? {};
    for (const [key, sourceId] of Object.entries(links))
      if (packSources.get(key)?.datasetSource !== null || !sourceId)
        throw new Error('A pack source link that is not needed: ' + key);
    const packDatasetSources = (inst.sources as string[]).map(
      (k) => packSources.get(k)?.datasetSource ?? links[k],
    );
    if (
      JSON.stringify([...packDatasetSources].sort()) !==
      JSON.stringify([...(plan.sources as string[])].sort())
    )
      throw new Error('Sources differ from the pack: ' + rowId);
    for (const s of plan.sources as string[]) {
      const row = existing('sources', s);
      if (!row) throw new Error('No dataset source: ' + s);
      const documents = [
        ...(plan.entities as string[]),
        'us-eo-14148-2025', // the revoking order, read for EO 14110's standing
      ];
      if (row.documentId && !documents.includes(row.documentId as string))
        throw new Error(`${s} is a source of another document`);
    }
    // Standing records: existing, with the predicate and endpoints mapped.
    const evidencePassages: string[] = [];
    for (const st of plan.standing as Json[]) {
      keysOk('standing', st, rowId);
      const c = existing('claims', st.id);
      if (!c) throw new Error('No standing record: ' + st.id);
      const object = (c.object as Json).entityId;
      if (
        c.predicate !== st.predicate ||
        (st.subject && c.subject !== st.subject) ||
        (st.object && object !== st.object) ||
        (st.date && (c.time as Json).date !== st.date) ||
        c.resolution !== 'supported'
      )
        throw new Error('The standing record says otherwise: ' + st.id);
      // An announced rescission stays announced (decision 4a).
      if (
        st.announced &&
        ((c.attributes as Json)?.activityStage !== 'announced' ||
          (c.time as Json).basis !== 'announcement')
      )
        throw new Error('Not recorded as announced: ' + st.id);
      if (!st.announced && (c.attributes as Json)?.activityStage)
        throw new Error('Unexpected stage on ' + st.id);
      for (const e of c.evidenceIds as string[])
        evidencePassages.push(norm(String(existing('evidence', e)!.passage)));
    }
    // The pack's standing passages: each verified, and each already the
    // passage of a reused record, or held.
    const held = new Map<string, string>(
      ((plan.heldPassages ?? []) as Json[]).map((h) => {
        keysOk('heldPassage', h, rowId);
        return [h.quote, h.reason];
      }),
    );
    (inst.standingEvidence.passages as Json[]).forEach((p, i) => {
      if (!verified.get(`standing:${rowId}#${i + 1}`)?.found)
        throw new Error(`Standing passage not verified: ${rowId}#${i + 1}`);
      const fragments = String(p.quote).split('…').map(norm).filter(Boolean);
      const reused = evidencePassages.some((e) =>
        fragments.every((f) => e.includes(f)),
      );
      if (reused === held.has(p.quote))
        throw new Error(
          `Standing passage ${rowId}#${i + 1} must be either reused or held: ${p.quote}`,
        );
      if (held.has(p.quote)) held.delete(p.quote);
    });
    if (held.size)
      throw new Error('Held passages not in the pack: ' + [...held.keys()]);
    done.set(`instrument:${rowId}`, 'checked');
  }
}

// ---------------------------------------------------------------- provisions
/** Effect rules the dataset lacks, on states_provision; a computed date is marked computed (schema 2.19, decision 9a). */
function admitProvisions() {
  for (const p of map.provisions as Json[]) {
    keysOk('provision', p, p.id);
    keysOk('signature', p.signature, p.id);
    if (!map.instruments[p.instrument])
      throw new Error('Provision of an unmapped row: ' + p.id);
    if (!map.instruments[p.instrument].entities.includes(p.subject))
      throw new Error('Provision of another document: ' + p.id);
    const cellId = `${p.instrument}:${p.cell}`;
    const cell = cellOf.get(cellId);
    if (!cell || cell.status !== 'stated' || cell.passages?.length !== 1)
      throw new Error('Not a stated one-passage cell: ' + cellId);
    if (!/computed/.test(cell.note))
      throw new Error('The pack does not mark this date computed: ' + cellId);
    const passage = cell.passages[0];
    const v = verified.get(`${cellId}#1`);
    if (!v?.found) throw new Error('Pack passage not verified: ' + cellId);
    const packSource = packSources.get(passage.source)!;
    if (packSource.datasetSource !== p.source)
      throw new Error('Passage of another source: ' + cellId);
    const quote: string = passage.quote;
    if (words(quote) > 50) throw new Error('Quote over 50 words: ' + p.id);
    const item = itemOf.get(cellId);
    const agreed = item?.comparison?.verdict === 'agree';
    const signed = existing('claims', p.signature.claim);
    if (
      signed?.predicate !== 'enacted' ||
      (signed.object as Json).entityId !== p.subject ||
      (signed.time as Json).basis !== 'signature'
    )
      throw new Error('Not the signature record: ' + p.signature.claim);
    const day = new Date((signed.time as Json).date + 'T00:00:00Z');
    if (!/ninetieth day/.test(quote))
      throw new Error('Not a ninety-day rule: ' + p.id);
    const n = 90;
    day.setUTCDate(day.getUTCDate() + n);
    if (day.toISOString().slice(0, 10) !== p.date)
      throw new Error(`Computed date differs: ${p.id}`);
    const spelled = day.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC',
    });
    if (!cell.note.includes(spelled))
      throw new Error('The pack computed another date: ' + cellId);
    const checked = item
      ? ` A cross-family machine check (2026-11-02, item ${item.number}) checked this cell${agreed ? ' and agreed with the pack, including the computed date' : '; its finding was applied at the adjudication of 2026-11-02'}.`
      : '';
    const evId1 = `lc-ev-${p.id.replace(/^lc-/, '')}-1`;
    const evId2 = `lc-ev-${p.id.replace(/^lc-/, '')}-2`;
    addOnce('evidence', {
      id: evId1,
      claimId: p.id,
      sourceId: p.source,
      sourceRole: 'primary',
      support: 'supports',
      locator: passage.locator,
      passage: quote,
      passageType: 'quote',
      verification: 'machine_checked',
      checkedAt: verification.checkedAt,
      note: `Candidate pack passage, laws compared (${dir}), cell ${cellId}. The quotation (${words(quote)} words) matched the text retrieved for the candidate pack on ${packSource.retrievedAt} (SHA-256 ${packSource.sha256}) and again in fresh retrievals on 2026-11-02 and ${verification.checkedAt}, which served different bytes. Matching ignored differences of whitespace, case, quotation marks, dashes, PDF line-break hyphens and Unicode compatibility forms, so the source’s typography can differ.${checked} No human editorial review.`,
      retrievalRoute: 'direct',
    });
    const sig = existing('sources', p.signature.source);
    if (!sig) throw new Error('No source: ' + p.signature.source);
    if (
      !(signed.evidenceIds as string[]).some(
        (e) => existing('evidence', e)!.sourceId === p.signature.source,
      )
    )
      throw new Error('The signature record does not rest on this source');
    addOnce('evidence', {
      id: evId2,
      claimId: p.id,
      sourceId: p.signature.source,
      sourceRole: 'primary',
      support: 'supports',
      locator: p.signature.locator,
      passage: p.signature.paraphrase,
      passageType: 'paraphrase',
      verification: 'machine_checked',
      checkedAt: verification.checkedAt,
      note: `The signing date the computation counts from, as the dataset’s record of the signature gives it. The paraphrase is Selekoa’s; the action it reports was matched in the bill record retrieved for the candidate pack (${dir}) on ${packSources.get('ny-s6953-assembly')!.retrievedAt}. No human editorial review.`,
      retrievalRoute: 'direct',
    });
    addOnce('claims', {
      id: p.id,
      subject: p.subject,
      predicate: 'states_provision',
      object: { kind: 'literal', value: p.label },
      topic: 'governance',
      statement: p.statement,
      time: {
        kind: 'event',
        date: p.date,
        basis: 'effective',
        note: p.timeNote,
      },
      derivation: 'inferred',
      resolution: 'supported',
      inferenceRationale: p.rationale,
      editorialState: 'seed',
      qualification: p.qualification,
      evidenceIds: [evId1, evId2],
      recordedAt: date,
      attributes: {
        provision: { kind: 'threshold', key: p.key, computed: true },
      },
    });
    done.set(`provision:${p.id}`, 'added');
  }
}

// ---------------------------------------------------------------- expressions
/** The expression the pack read, appended to the source's version note where the dataset records other bytes. */
function recordExpressions() {
  for (const [sourceId, key] of Object.entries(
    map.sourceExpressions as Record<string, string>,
  )) {
    const s = packSources.get(key);
    if (s?.datasetSource !== sourceId)
      throw new Error('Not the pack source of ' + sourceId);
    const row = change('sources', sourceId);
    if (String(row.version).includes(s.sha256))
      throw new Error('The source already records this expression: ' + key);
    row.version = `${row.version} Retrieved again for the laws-compared candidate pack on ${s.retrievedAt} (SHA-256 ${s.sha256}), bytes that differ from the retrieval above; the pack’s quotations were matched in it, and again in retrievals of 2026-11-02 and ${verification.checkedAt}, which served different bytes once more.`;
    done.set(`expression:${sourceId}`, 'changed');
  }
}

// ---------------------------------------------------------------- part 2
const find = (n: Name, id: string) =>
  added[n].find((r) => r.id === id) ?? existing(n, id);
/** A pack source's dataset source: its own link, or the map's. */
const datasetSourceOf = (key: string): string => {
  const s = packSources.get(key);
  if (!s) throw new Error('Unknown pack source: ' + key);
  if (s.datasetSource) return s.datasetSource;
  const linked = map.sourceLinks?.[key];
  if (!linked) throw new Error('No dataset source for pack source ' + key);
  done.set(`link:${key}`, 'linked');
  return linked;
};
/** The cross-family items on a cell: both checks, every part. */
const itemsOf = (cellId: string): Json[] => {
  const first = Object.values(crossCheck.items as Json).filter(
    (x: Json) => x.cellId === cellId,
  );
  const illinois = part === '2' ? read(map.files.checkIllinois) : null;
  const second = illinois
    ? Object.values(illinois.items as Json)
        .filter((x: Json) => x.cell_id === cellId)
        .map((x: Json) => ({ ...x, illinois: true }))
    : [];
  return [...first, ...second];
};
const crossNote = (cellId: string, status: string) => {
  const notes = itemsOf(cellId).map((item) => {
    if (item.illinois) {
      const agrees = item.status === status;
      return `The cross-family checker read the act independently on 2026-11-04 (item ${item.item}) and gave this cell the status ${item.status}${agrees ? ', as here' : `; the maintainer decided ${status}`}.`;
    }
    if (item.part === 'B')
      return `A cross-family machine check (2026-11-02, item ${item.number}) checked this cell directly${item.support === 'full' ? ' and found it supported' : '; its corrections were applied at the adjudication of 2026-11-02'}.`;
    const verdict = item.comparison?.verdict;
    return `A cross-family machine check (2026-11-02, item ${item.number}) answered this cell blind${verdict === 'agree' ? ' and agreed with the pack' : '; its status was applied at the adjudication of 2026-11-02'}.`;
  });
  return notes.join(' ');
};
const questions = new Map<string, Json>(
  (read(map.files.questions).questions as Json[]).map((q) => [q.id, q]),
);
const sha256Of = (key: string) => packSources.get(key)!.sha256 as string;

/**
 * The Illinois act: its legislature, its saved enacted text and the
 * checker's copy of its bill status record as sources, and a version on the
 * existing document (maintainer decisions 7a of 2026-11-03 and 1–3 of
 * 2026-11-05).
 */
function admitIllinois() {
  const il: Json = map.illinois;
  // The saved text is the pack's, with the PDF hash the source records.
  const header = readFileSync(map.files.illinoisText, 'utf8').slice(0, 600);
  const pdf = sha256Of('il-pa104-0538');
  if (!header.includes(`PDF SHA-256: ${pdf}`))
    throw new Error('The saved Illinois text is not the pack source');
  const status = read(map.files.checkIllinois).retrieval.sources.find(
    (s: Json) => s.id === 'il-sb315-history',
  );
  if (status.decoded_sha256 !== sha256Of('il-sb315-history'))
    throw new Error('The bill status copy is not the checker’s');
  addOnce('entities', structuredClone(il.publisher));
  for (const src of il.sources as Json[]) {
    const { key, ...row } = src;
    const packSource = packSources.get(key)!;
    if (map.sourceLinks[key] !== row.id)
      throw new Error('Source not linked to its pack source: ' + key);
    if (!String(row.version).includes(packSource.sha256))
      throw new Error('The source does not record the pack’s hash: ' + key);
    if (packSource.archive?.capturedAt !== row.archivedAt)
      throw new Error('Capture date differs from the pack: ' + key);
    if (
      row.documentWords &&
      row.documentWords.count !== packSource.documentWords.count
    )
      throw new Error('Length differs from the pack: ' + key);
    addOnce('sources', row as Row);
  }
  const e = change('entities', il.entity);
  if (e.documentVersion) throw new Error('The act already has a version');
  e.name = il.name;
  e.description = il.description;
  e.documentVersion = il.documentVersion;
  e.sourceIds = [...(e.sourceIds as string[]), 'source-il-pa-104-0538'];
  done.set('illinois', 'added');
}

/** The expression each quoted source was read in, where the dataset records other bytes. */
function recordPart2Expressions() {
  for (const sourceId of map.sourceExpressions as string[]) {
    const key = [...packSources.values()].find(
      (s) =>
        s.datasetSource === sourceId || map.sourceLinks[s.key] === sourceId,
    )?.key;
    if (!key) throw new Error('No pack source for ' + sourceId);
    const s = packSources.get(key)!;
    const row = change('sources', sourceId);
    if (String(row.version).includes(s.sha256))
      throw new Error('The source already records this expression: ' + key);
    const route =
      key === 'ca-sb53'
        ? ' as one member of the Legislative Counsel’s database file (pubinfo_2025.zip), because the Legislature’s website refused the request'
        : key.startsWith('eu-')
          ? ' from the Publications Office’s repository (Cellar), because EUR-Lex returned an empty response'
          : '';
    row.version = `${row.version} Retrieved again for the laws-compared candidate pack on ${s.retrievedAt}${route} (SHA-256 ${s.sha256}); the pack’s quotations were matched in it, and again in fresh retrievals of 2026-11-02 and ${verification.checkedAt}.`;
    done.set(`expression:${sourceId}`, 'changed');
  }
}

/**
 * One record per answered cell (schema 2.31): stated or partly cells rest
 * on verified pack passages, quoted, or paraphrased where the map says why;
 * not-found cells record their search. A cell that cites an earlier record
 * adds nothing; a cell that does not apply has no record. The collection
 * definition must list exactly the pack's cited and not-applicable cells.
 */
function admitCells() {
  const rows: Record<string, string> = map.rows;
  const packRows = [...packInstruments.keys()];
  if (
    JSON.stringify(Object.keys(rows).sort()) !== JSON.stringify(packRows.sort())
  )
    throw new Error('The map’s rows are not the pack’s');
  const texts = lawsCompared.columns.flatMap((c) => c.texts);
  if (
    JSON.stringify([...texts].sort()) !==
    JSON.stringify(Object.values(rows).sort())
  )
    throw new Error('The collection’s texts are not the pack’s rows');
  for (const r of Object.keys(rows)) done.set(`row:${r}`, 'mapped');
  const notApplicable = new Set(
    lawsCompared.notApplicable.flatMap((n) =>
      n.facetIds.map((f) => `${n.textId} ${f}`),
    ),
  );
  const collectionCited = new Map(
    lawsCompared.cited.map((c) => [`${c.textId} ${c.facetId}`, c]),
  );
  const paraphrased = (cellId: string, i: number): Json | undefined => {
    const p = map.paraphrases[`${cellId}#${i}`];
    if (p) done.set(`paraphrase:${cellId}#${i}`, 'applied');
    return p;
  };
  for (const packCell of pack.cells as Json[]) {
    const cellId: string = packCell.id;
    // Exact replacements in the cell's note and search, each of which must apply.
    let serial = JSON.stringify(packCell);
    for (const [from, to] of (map.textEdits[cellId] ?? []) as string[][]) {
      const f = JSON.stringify(from).slice(1, -1);
      if (!serial.includes(f))
        throw new Error(`Text edit does not apply: ${cellId}: ${from}`);
      serial = serial.replace(f, JSON.stringify(to).slice(1, -1));
      done.set(`edit:${cellId}`, 'applied');
    }
    const cell: Json = JSON.parse(serial);
    const decided = map.decided[cellId];
    if (cell.held) {
      if (!decided || decided.status !== cell.held.preparerStatus)
        throw new Error('A held cell without a decision: ' + cellId);
      cell.status = decided.status;
      delete cell.held;
      done.set(`decided:${cellId}`, 'applied');
    } else if (decided) throw new Error('Not a held cell: ' + cellId);
    const row: string = cell.instrument;
    const textId = rows[row];
    const facetId = 'L.' + cell.question;
    const facet = lawFacetById(facetId);
    const q = questions.get(cell.question);
    if (!facet || !q) throw new Error('Unknown question: ' + cell.question);
    const defined = lawsCompared.questions[facet.id];
    if (defined.criterion !== q.criterion || defined.question !== q.question)
      throw new Error(
        'The collection’s question differs from the pack: ' + q.id,
      );
    if (q.short !== facet.label)
      throw new Error('The question’s label differs from the pack: ' + q.id);
    const at = `${textId} ${facetId}`;
    if (cell.status === 'not-applicable') {
      if (!notApplicable.delete(at))
        throw new Error('Not listed as not applicable: ' + cellId);
      continue;
    }
    const citedId = map.cited[cellId];
    if (citedId) {
      const c = existing('claims', citedId);
      const listed = collectionCited.get(at);
      if (
        !c ||
        c.subject !== textId ||
        c.predicate !== 'states_provision' ||
        listed?.claimId !== citedId ||
        listed?.status !== cell.status
      )
        throw new Error('Not the cited record of ' + cellId);
      const quotes = (c.evidenceIds as string[]).map((e) =>
        norm(String(existing('evidence', e)!.passage)),
      );
      for (const p of cell.passages as Json[])
        if (!quotes.includes(norm(p.quote)))
          throw new Error('The cited record does not quote ' + cellId);
      collectionCited.delete(at);
      done.set(`cited:${cellId}`, 'cited');
      continue;
    }
    const text = find('entities', textId)!;
    const version = text.documentVersion as Json;
    const name = (text.shortName ?? text.name) as string;
    const time: Json = version.publishedAt
      ? {
          kind: 'event',
          date: version.publishedAt,
          basis: 'publication',
          note: `Dated as the text compared is dated: the date of issue of its version, “${version.label}”.`,
        }
      : { kind: 'unknown', note: 'The text’s version records no date.' };
    const id = `lc-cell-${row}-${cell.question.toLowerCase()}`;
    const search: Json | undefined = cell.search;
    const setAside = (search?.setAside ?? []) as Json[];
    const searchText = search
      ? `${String(search.read).replace(/([^.])$/, '$1.')} Terms searched: ${(search.terms as string[]).map((t) => `“${t}”`).join(', ')}.${setAside.length ? ' Passages read and not counted: ' + setAside.map((x) => `${x.locator}: ${x.reason}`).join(' ') : ''}`
      : '';
    const cross = crossNote(cellId, cell.status);
    const decision = decided ? decided.decision : '';
    const attributes = (status?: string, para?: boolean) => ({
      provision: {
        kind: facet.kind,
        key: lawFacetKey(facetId),
        facet: {
          id: facetId,
          ...(status ? { status } : {}),
          ...(para ? { paraphrased: true } : {}),
        },
      },
    });
    const passageRow = (p: Json, i: number, support: string): Row => {
      const key = `${cellId}#${i}`;
      const sourceId = datasetSourceOf(p.source);
      const s = packSources.get(p.source)!;
      const para = support === 'supports' ? paraphrased(cellId, i) : undefined;
      const v = verified.get(key);
      if (!v?.found && !(para && p.copy))
        throw new Error('Pack passage not verified: ' + key);
      if (!para && words(p.quote) > 50)
        throw new Error('Quote over 50 words: ' + key);
      if (para && words(para.passage) > 50)
        throw new Error('Paraphrase over 50 words: ' + key);
      // A passage an earlier record already quotes stays on the source that
      // record quotes it from (the same text, or a copy whose quotation
      // budget the pack shares), so it adds nothing to any count.
      const shared = [
        s.datasetSource ?? sourceId,
        ...(s.sharedBudgetWith ?? []),
      ];
      let reusedSource: string | null = null;
      if (p.datasetClaim) {
        const c = existing('claims', p.datasetClaim);
        if (!c) throw new Error('No dataset claim ' + p.datasetClaim);
        const fragments = String(p.quote).split('…').map(norm).filter(Boolean);
        const ev = (c.evidenceIds as string[])
          .map((e) => existing('evidence', e)!)
          .find(
            (ev) =>
              shared.includes(ev.sourceId as string) &&
              fragments.every((f) => norm(String(ev.passage)).includes(f)),
          );
        if (!ev) throw new Error(`Not a passage of ${p.datasetClaim}: ${key}`);
        reusedSource = ev.sourceId as string;
      }
      // A quotation the dataset already holds on this source in other
      // typography (a straight for a curly apostrophe) keeps the stored
      // string, so it counts once against the source's limit.
      const sameWords =
        !para && !reusedSource
          ? base.evidence.find(
              (e) =>
                e.sourceId === sourceId &&
                e.passageType === 'quote' &&
                e.passage !== p.quote &&
                norm(String(e.passage)) === norm(p.quote),
            )
          : undefined;
      if (sameWords) {
        reusedSource = sourceId;
        p.quote = sameWords.passage;
      }
      const reused = !!reusedSource;
      const size = /[\u3400-\u9fff]/.test(p.quote)
        ? `${[...p.quote.replace(/\s/g, '')].length} characters`
        : `${words(p.quote)} words`;
      const elsewhere =
        reusedSource && reusedSource !== sourceId
          ? ` The pack read it in another copy of the same text; the dataset already quotes these words from the copy cited here, whose words are the same.`
          : '';
      const matched = para
        ? p.copy
          ? `Paraphrase of the row the cross-family checker reported from its copy of the record (the Internet Archive capture of ${s.archive.capturedAt}, decoded HTML SHA-256 ${s.sha256}); the preparer could not open the record. Not quoted: ${para.reason}.`
          : `Paraphrase of a passage that matched the text retrieved for the candidate pack on ${s.retrievedAt} (SHA-256 ${s.sha256}) and again on 2026-11-02 and ${verification.checkedAt}. Not quoted: ${para.reason}.`
        : p.source === 'il-pa104-0538'
          ? `The quotation (${size}) matched the saved text of the enacted act (from the Internet Archive capture of ${s.archive.capturedAt} of the official PDF, SHA-256 ${s.sha256}) on ${verification.checkedAt}.`
          : `The quotation (${size}) matched the text retrieved for the candidate pack on ${s.retrievedAt} (SHA-256 ${s.sha256}) and again in fresh retrievals on 2026-11-02 and ${verification.checkedAt}.${elsewhere}`;
      const note = [
        `Candidate pack passage, laws compared (${dir}), cell ${cellId}.`,
        matched,
        para
          ? ''
          : 'Matching ignored differences of whitespace, case, quotation marks, dashes, PDF line-break hyphens and Unicode compatibility forms, so the source’s typography can differ.',
        !para && /…/.test(p.quote)
          ? p.source === 'il-pa104-0538'
            ? 'The ellipsis stands for the running footer at a PDF page break; no words of the act are omitted.'
            : 'Abridged quotation: the ellipsis marks omitted words, so it is not one continuous string.'
          : '',
        reused
          ? 'The same words are quoted in an earlier record of the dataset, so they add nothing to the source’s quotation count.'
          : '',
        p.translation
          ? 'The translation is Selekoa’s working translation, not verified by a person.'
          : '',
        support === 'context'
          ? 'Context for the absence, not an answer to the question.'
          : '',
        'No human editorial review.',
      ]
        .filter(Boolean)
        .join(' ');
      return {
        id: `lc-ev-${row}-${cell.question.toLowerCase()}-${i}`,
        claimId: id,
        sourceId: reusedSource ?? sourceId,
        sourceRole: 'primary',
        support,
        locator: p.locator,
        passage: para ? para.passage : p.quote,
        passageType: para ? 'paraphrase' : 'quote',
        ...(p.translation && !para ? { translation: p.translation } : {}),
        verification: 'machine_checked',
        checkedAt: verification.checkedAt,
        note,
        retrievalRoute: 'direct',
      };
    };
    if (cell.status === 'stated' || cell.status === 'partly') {
      const evidence = (cell.passages as Json[]).map((p, i) =>
        passageRow(p, i + 1, 'supports'),
      );
      if (!evidence.length)
        throw new Error('A stated cell without passages: ' + cellId);
      evidence.forEach((e) => addOnce('evidence', e));
      const para = evidence.some((e) => e.passageType === 'paraphrase');
      addOnce('claims', {
        id,
        subject: textId,
        predicate: 'states_provision',
        object: { kind: 'literal', value: facet.label },
        topic: 'governance',
        statement:
          cell.status === 'stated'
            ? `${name} states what the law question “${facet.label}” asks.`
            : `${name} states in part what the law question “${facet.label}” asks.`,
        time,
        derivation: 'explicit',
        resolution: 'supported',
        editorialState: 'seed',
        qualification: [
          cell.note,
          search && cell.status === 'partly'
            ? `Search for the rest of the criterion: ${searchText}`
            : '',
          decision,
          para ? lawStandingText.paraphrased : '',
          cell.status === 'partly' ? lawStandingText.partly : '',
          lawStandingText.stated,
        ]
          .filter(Boolean)
          .join(' '),
        evidenceIds: evidence.map((e) => e.id),
        recordedAt: date,
        attributes: attributes(cell.status, para),
      });
    } else if (cell.status === 'not-found') {
      if (!search?.read || !(search.terms as string[])?.length)
        throw new Error('A recorded absence without its search: ' + cellId);
      const scopeSource: string = map.scopeSources[textId];
      if (find('sources', scopeSource)?.documentId !== textId)
        throw new Error('Not an expression of the text: ' + scopeSource);
      done.set(`scope:${textId}`, 'used');
      const scope: Row = {
        id: `lc-ev-${row}-${cell.question.toLowerCase()}`,
        claimId: id,
        sourceId: scopeSource,
        sourceRole: 'primary',
        support: 'supports',
        locator: `${name}: ${search.read}`,
        passage: `Within the inspected scope, no passage meeting the law question “${facet.label}” was found.`,
        passageType: 'paraphrase',
        verification: 'machine_checked',
        checkedAt: verification.checkedAt,
        note: `Absence recorded for the laws-compared candidate pack (${dir}) on ${pack.checkDate} by an automated research assistant and audited in a fresh context by the same model family. ${cross || 'Not in the cross-family sample.'} No human editorial review.`,
        retrievalRoute: 'direct',
      };
      const context = ((cell.passages ?? []) as Json[]).map((p, i) =>
        passageRow(p, i + 1, 'context'),
      );
      [scope, ...context].forEach((e) => addOnce('evidence', e));
      addOnce('claims', {
        id,
        subject: textId,
        predicate: 'provision_not_found',
        object: { kind: 'literal', value: facet.label },
        topic: 'governance',
        statement: `No passage meeting the law question “${facet.label}” was found in ${name} within the inspected scope.`,
        time,
        derivation: 'inferred',
        inferenceRationale: `Premises: the law question asks for the following. ${q.criterion} The inspected scope of ${name} was: ${searchText} The conclusion is bounded by that scope and method.`,
        resolution: 'supported',
        editorialState: 'seed',
        qualification: [cell.note, decision, lawStandingText.absent]
          .filter(Boolean)
          .join(' '),
        evidenceIds: [scope.id, ...context.map((e) => e.id)],
        recordedAt: date,
        attributes: attributes(),
      });
    } else throw new Error(`Unknown status ${cell.status}: ${cellId}`);
    // Cross-family coverage, on the first evidence row of a stated cell.
    if (cell.status !== 'not-found' && cross) {
      const first = added.evidence.find((e) => e.claimId === id)!;
      first.note = String(first.note).replace(
        'No human editorial review.',
        `${cross} No human editorial review.`,
      );
    }
  }
  if (notApplicable.size || collectionCited.size)
    throw new Error(
      'Collection cells the pack does not have: ' +
        [...notApplicable, ...collectionCited.keys()].join(', '),
    );
  for (const t of texts) {
    const n = added.claims.filter((c) => c.subject === t).length;
    const other =
      lawsCompared.notApplicable.filter((x) => x.textId === t).length +
      lawsCompared.cited.filter((x) => x.textId === t).length;
    if (n + other !== 15) throw new Error(`${t}: ${n + other} cells, not 15`);
  }
}

if (part === '1') {
  checkInstruments();
  admitProvisions();
  recordExpressions();

  // Every map entry changed or checked a record (operating guide, recurring pitfalls).
  const entries = [
    ...Object.keys(map.instruments).map((id) => `instrument:${id}`),
    ...Object.keys(map.held).map((id) => `held:${id}`),
    ...(map.provisions as Json[]).map((p) => `provision:${p.id}`),
    ...Object.keys(map.sourceExpressions).map((id) => `expression:${id}`),
  ];
  const idle = entries.filter((e) => !done.has(e));
  if (idle.length) throw new Error('Map entries that did nothing: ' + idle);
  for (const p of map.provisions as Json[])
    if (!added.claims.some((c) => c.id === p.id))
      throw new Error('A provision entry added no record: ' + p.id);
  for (const id of Object.keys(map.sourceExpressions))
    if (!changed.sources.has(id))
      throw new Error('An expression entry changed no record: ' + id);
} else {
  admitIllinois();
  recordPart2Expressions();
  admitCells();
  // Every map entry changed or checked a record (operating guide, recurring pitfalls).
  const entries = [
    ...Object.keys(map.rows).map((r) => `row:${r}`),
    ...Object.keys(map.cited).map((c) => `cited:${c}`),
    ...Object.keys(map.decided).map((c) => `decided:${c}`),
    ...Object.keys(map.paraphrases).map((c) => `paraphrase:${c}`),
    ...Object.keys(map.textEdits).map((c) => `edit:${c}`),
    ...Object.keys(map.sourceLinks).map((k) => `link:${k}`),
    ...Object.keys(map.scopeSources).map((t) => `scope:${t}`),
    ...(map.sourceExpressions as string[]).map((id) => `expression:${id}`),
    'illinois',
  ];
  const idle = entries.filter((e) => !done.has(e));
  if (idle.length) throw new Error('Map entries that did nothing: ' + idle);
}

// ---------------------------------------------------------------- limits
const overLimit: string[] = [];
const quotedSources = new Set(
  added.evidence
    .filter((e) => e.passageType === 'quote')
    .map((e) => e.sourceId as string),
);
for (const id of quotedSources) {
  const row = added.sources.find((r) => r.id === id) ?? existing('sources', id);
  const length = (row?.documentWords as Json)?.count;
  const all = new Set<string>();
  for (const e of [...base.evidence, ...added.evidence])
    if (e.sourceId === id && e.passageType === 'quote')
      all.add(e.passage as string);
  const total = [...all].reduce((n, p) => n + words(p), 0);

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
  ...(part === '2' ? { schemaVersion: '2.31' } : {}),
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
    `Added ${names.map((n) => `${added[n].length} ${n}`).join(', ')}; changed ${names.map((n) => `${changed[n].size} ${n}`).join(', ')}; checked ${[...done.values()].filter((v) => v === 'checked').length} instruments.`,
  );
}
