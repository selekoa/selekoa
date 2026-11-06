// Admits the model-cards candidate pack (research/model-cards) into the
// dataset, using the authored map of each part in
// review/model-cards-admission-<part>-map-<date>.json and the maintainer's
// decisions of 2026-11-03 (review/model-cards-pack-2026-11-02.md,
// "Maintainer decisions"). Adapted from scripts/lab-genealogy-2-admission.ts.
//
// Part 1 (no schema change) admits the compared cards as documents, their
// sources, their publication by the developer and their citations of
// framework editions already in the dataset. Part 2 (schema 2.30, a minor
// release) admits their cell records. Part 3 admits the second pack
// (research/model-cards-2): its cards as documents and their cells in one
// run, under the same rules, with the maintainer's answers of 2026-11-04.
// Part 4 admits the third pack (research/model-cards-3, prepared by Codex and
// checked by Claude) in the same way, without the cards the maintainer held
// (map "held"), with the answers of 2026-11-05.
//
//   pnpm tsx scripts/model-cards-admission.ts --part 1            write the records and the before-snapshot
//   pnpm tsx scripts/model-cards-admission.ts --part 1 --check    compare with the stored records
//   pnpm tsx scripts/model-cards-admission.ts --part 1 --base <commit>
//                                         rebuild on a new base: the snapshot names that base commit
//
// Every passage admitted is a passage of the pack that its own verification
// matched in the retrieved card; nothing is retrieved again here.
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { maxQuotedWords } from '../src/domain/schema';
import {
  cardFacetById,
  cardFacetKey,
  cardFacetKind,
} from '../src/domain/model-cards';
import { cardStandingText } from '../src/domain/model-cards-view';
import { modelCards } from '../src/reading/model-cards';

const names = ['entities', 'claims', 'sources', 'evidence'] as const;
type Name = (typeof names)[number];
type Row = Record<string, unknown> & { id: string };
type Json = Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any

const read = (path: string) => JSON.parse(readFileSync(path, 'utf8'));
const args = process.argv.slice(2);
const check = args.includes('--check');
const part = args.includes('--part') ? args[args.indexOf('--part') + 1] : '1';
if (!['1', '2', '3', '4'].includes(part))
  throw new Error('Unknown part: ' + part);
const mapFile = readdirSync('review').find((f) =>
  f.startsWith(`model-cards-admission-${part}-map-`),
);
if (!mapFile) throw new Error('No map for part ' + part);
const map: Json = read(`review/${mapFile}`);
const date: string = map.admissionDate;
const dir: string = map.files.dir ?? 'research/model-cards';
// The cross-family check and its adjudication: 2026-11-03 for the first pack.
const checkDate: string = map.crossFamily?.date ?? '2026-11-03';
const adjudicatedOn: string = map.crossFamily?.adjudicatedOn ?? '2026-11-03';
const decidedOn: string = map.decidedOn ?? '2026-11-03';
const pack: Json = read(map.files.pack);
const verification: Json = read(map.files.verification);
const crossCheck: Json = read(map.files.check);
const snapshotPath = `review/model-cards-admission-${part}-before-${date}.json`;

// ---------------------------------------------------------------- helpers
const words = (s: string) => s.trim().split(/\s+/).length;
const sha = (value: unknown) =>
  createHash('sha256').update(JSON.stringify(value)).digest('hex');
const publisherOf: Record<string, string> = {
  Anthropic: 'anthropic',
  'Google DeepMind': 'google-deepmind',
  Meta: 'meta',
  Microsoft: 'microsoft',
  OpenAI: 'openai',
  xAI: 'xai',
};
/** Map keys a card entry may carry; any other key stops the script, so no entry is silently ignored. */
const allowed: Record<string, string[]> = {
  card: [
    'entity',
    'existing',
    'reuse',
    'name',
    'subtype',
    'description',
    'family',
    'version',
    'source',
    'published',
    'existingPublished',
    'cites',
  ],
  version: ['label', 'publishedAt', 'revisedAt', 'dateNote'],
  source: [
    'id',
    'publicationDate',
    'versionDate',
    'versionNote',
    'canonicalUrl',
    'archived',
  ],
  published: ['id', 'statement', 'time', 'qualification', 'passages'],
  existingPublished: ['id', 'passages', 'reason'],
  expression: [
    'id',
    'documentId',
    'title',
    'publicationDate',
    'canonicalUrl',
    'evidenceUrl',
    'archived',
    'retrieval',
    'version',
    'accessedAt',
  ],
  cites: ['id', 'edition', 'statement', 'qualification', 'passages'],
  passage: ['cell', 'index', 'link'],
  cellOverride: ['decision', 'status', 'note', 'search', 'passagesFrom'],
  search: ['read', 'terms', 'setAside'],
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
const packCards = new Map<string, Json>(
  (pack.cards as Json[]).map((c) => [c.id, c]),
);
// A retrieval time is recorded by its day (the third pack gives the time).
const packSources = new Map<string, Json>(
  (pack.sources as Json[]).map((s) => [
    s.key,
    { ...s, retrievedAt: String(s.retrievedAt).slice(0, 10) },
  ]),
);
const cellOf = new Map<string, Json>(
  (pack.cells as Json[]).map((c) => [`${c.card}:${c.question}`, c]),
);
const perQuote = new Map<string, Json>(
  (verification.perQuote as Json[]).map((q) => [`${q.claim}#${q.evidence}`, q]),
);
// The third pack's check lists its items by part, with the outcome in
// "comparison" (Part A) or "result" (Part B); "agree (reconciled)" is an
// agreement reached at comparison.
const itemOf = new Map<string, Json>(
  crossCheck.items
    ? Object.values(crossCheck.items as Json).map((x: Json) => [x.cellId, x])
    : [...(crossCheck.partA as Json[]), ...(crossCheck.partB as Json[])].map(
        (x: Json) => [
          x.cell,
          {
            number: x.item,
            cellId: x.cell,
            outcome: String(x.comparison ?? x.result).startsWith('agree')
              ? 'agree'
              : String(x.comparison ?? x.result),
          },
        ],
      ),
);
// Cards the maintainer held (part 4): exactly the pack's held cards; they
// and their cells are not admitted.
const held = new Set<string>(map.held ?? []);
for (const c of pack.cards as Json[])
  if (Boolean(c.held) !== held.has(c.id))
    throw new Error('Held cards differ from the pack: ' + c.id);
for (const id of held)
  if (!packCards.has(id)) throw new Error('Unknown held card: ' + id);
// The three link targets the cross-family check read and confirmed (review
// note, "Applied after the check"; decision sheet item 4).
const linkConfirmed = new Set<string>(
  map.linkConfirmed ?? [
    'anthropic-claude-opus-4-5',
    'openai-gpt-5-2-codex',
    'openai-gpt-6-luna-october-29',
  ],
);
const quoted = new Map<string, Set<string>>();
// Part 2 reads the cards as part 1 admitted them; part 3 admits its own.
const map1: Json =
  part !== '2'
    ? map
    : read(
        `review/${readdirSync('review').find((f) => f.startsWith('model-cards-admission-1-map-'))}`,
      );
const earlierMatch: Json = map1.earlierMatch ?? {};

/** One evidence row from a verified pack passage. */
function evidenceRow(
  id: string,
  claimId: string,
  cardId: string,
  sourceId: string,
  p: Json,
  extra = '',
): Row {
  keysOk('passage', p, id);
  const cell = cellOf.get(`${cardId}:${p.cell}`);
  if (!cell) throw new Error(`No pack cell ${cardId}:${p.cell}`);
  const passage = (cell.passages ?? [])[p.index - 1];
  if (!passage?.quote)
    throw new Error(`No passage ${p.index} in ${cardId}:${p.cell}`);
  const quote: string = passage.quote;
  if (words(quote) > 50) throw new Error('Quote over 50 words: ' + id);
  const v = perQuote.get(`${cardId}:${p.cell}#${p.index}`);
  const earlier = earlierMatch[cardId];
  const problem = (verification.problems as string[]).some((x) =>
    x.startsWith(`${cardId}:${p.cell} ev${p.index}: no cached text`),
  );
  if (!v?.found && !(earlier && problem))
    throw new Error(
      `Pack passage not verified: ${cardId}:${p.cell}#${p.index}`,
    );
  quoted.set(sourceId, (quoted.get(sourceId) ?? new Set()).add(quote));
  const s = packSources.get(packCards.get(cardId)!.source)!;
  const item = itemOf.get(`${cardId}:${p.cell}`);
  const verdict = item?.comparison?.verdict ?? item?.outcome;
  const matched = v?.found
    ? `The quotation (${words(quote)} words) matched the card’s text retrieved for the candidate pack on ${s.retrievedAt} (SHA-256 ${s.sha256}) ${map.matchedAgain ?? 'and again on 2026-11-03 in a fresh retrieval with the same SHA-256'}.${v.textLayer ? ` It was matched in the raw reading order of the PDF text (${v.textLayer}), because the default text layer interleaves the printed lines.` : ''}`
    : `The quotation (${words(quote)} words) matched the card’s text retrieved for the candidate pack on ${earlier.date} (SHA-256 ${s.sha256}). ${earlier.reason}`;
  const note = [
    `Candidate pack passage, model cards compared (${dir}).`,
    matched,
    'Matching ignored differences of whitespace, case, quotation marks, dashes, PDF line-break hyphens and Unicode compatibility forms, so the source’s typography can differ.',
    /…/.test(quote)
      ? 'Abridged quotation: the ellipsis marks omitted words, so it is not one continuous string.'
      : '',
    p.link
      ? `Edition identified by link annotation: the hyperlink on these words points to ${p.link}. The quotation check cannot verify a link; the drafting pass read its target on ${map.linkReadOn ?? '2026-11-02'}${linkConfirmed.has(cardId) ? `, and the cross-family check of ${checkDate} read and confirmed it` : ''} (maintainer decision 4a of 2026-11-03).`
      : '',
    item
      ? item.status === 'excluded'
        ? `The maintainer excluded this passage’s cell from the cross-family machine check of ${checkDate} (item ${item.number}).`
        : `A cross-family machine check (${checkDate}, item ${item.number}) checked this passage’s cell${verdict === 'agree' ? ' and agreed with the pack' : `; its finding was applied at the adjudication of ${adjudicatedOn}`}.`
      : '',
    extra,
    map.roles ?? '',
    'No human editorial review.',
  ]
    .filter(Boolean)
    .join(' ');
  return {
    id,
    claimId,
    sourceId,
    sourceRole: 'primary',
    support: 'supports',
    locator: passage.locator,
    passage: quote,
    passageType: 'quote',
    verification: 'machine_checked',
    checkedAt: v?.found ? (map.checkedAt ?? '2026-11-03') : earlier.date,
    note,
    retrievalRoute: 'direct',
  };
}

/** Citations of framework editions already in the dataset. */
function admitCites(
  cardId: string,
  entityId: string,
  sourceId: string,
  cardTime: Json,
  plan: Json,
) {
  const card = packCards.get(cardId)!;
  for (const c of (plan.cites ?? []) as Json[]) {
    keysOk('cites', c, cardId);
    const edition = existing('entities', c.edition);
    if (!edition?.documentVersion)
      throw new Error('Not a framework edition in the dataset: ' + c.edition);
    if (!(card.frameworkEditions as string[]).includes(c.edition))
      throw new Error(`The pack does not link ${cardId} to ${c.edition}`);
    const ids = (c.passages as Json[]).map((p, i) => {
      const id = `mc-ev-${c.id.replace(/^mc-/, '')}-${i + 1}`;
      addOnce('evidence', evidenceRow(id, c.id, cardId, sourceId, p));
      return id;
    });
    const time: Json =
      cardTime.kind === 'event'
        ? {
            kind: 'event',
            date: cardTime.date,
            ...(cardTime.basis ? { basis: cardTime.basis } : {}),
            note: 'Dated as the citing card is dated; not the date of the cited edition.',
          }
        : {
            kind: 'unknown',
            note: 'The citing card prints no date of its own.',
          };
    addOnce('claims', {
      id: c.id,
      subject: entityId,
      predicate: 'cites',
      object: { kind: 'entity', entityId: c.edition },
      topic: 'governance',
      statement: c.statement,
      time,
      derivation: 'explicit',
      resolution: 'supported',
      editorialState: 'seed',
      qualification: c.qualification,
      evidenceIds: ids,
      recordedAt: date,
    });
  }
}

function admitCards() {
  // ---------------------------------------------------------------- cards
  const reuseNote =
    'Bibliographic metadata, editorial paraphrases and short attributed quotations (at most 50 words each). Recheck terms before wider redistribution.';
  const done: string[] = [];
  for (const [cardId, plan] of Object.entries(
    map.cards as Record<string, Json>,
  )) {
    keysOk('card', plan, cardId);
    const card = packCards.get(cardId);
    if (!card) throw new Error('Unknown pack card: ' + cardId);
    const s = packSources.get(card.source);
    if (!s) throw new Error('No pack source for ' + cardId);
    const publisherId = publisherOf[card.developer];
    if (!publisherId || !existing('entities', publisherId))
      throw new Error('Unknown developer: ' + card.developer);
    const entityId: string = plan.entity;

    // A card already in the dataset with the very expression read: its
    // document, source and publication record are used unchanged; only its
    // cells are added (part 3).
    if (plan.existing) {
      const row = existing('sources', plan.source.id);
      if (
        existing('entities', entityId)?.type !== 'document' ||
        row?.documentId !== entityId ||
        !String(row.version).includes(s.sha256) ||
        s.datasetSource !== row.id
      )
        throw new Error('Not the existing expression read: ' + cardId);
      const pub = existing('claims', plan.existingPublished.id);
      if (
        pub?.predicate !== 'published' ||
        (pub.object as Json).entityId !== entityId ||
        plan.existingPublished.passages.length
      )
        throw new Error('Not the card’s publication record: ' + cardId);
      // Its citations of framework editions, if the map gives any (part 4).
      admitCites(cardId, entityId, plan.source.id, pub.time as Json, plan);
      done.push(cardId);
      continue;
    }

    // Source: the expression read.
    const src: Json = plan.source;
    keysOk('source', src, cardId);
    const earlier = earlierMatch[cardId];
    const version = [
      `Retrieved for the candidate pack on ${s.retrievedAt} (SHA-256 ${s.sha256}) directly from the publisher’s host${s.finalUrl && s.finalUrl !== s.url ? `; the request redirected to ${s.finalUrl}` : ''}.`,
      earlier
        ? earlier.sourceNote
        : (map.retrievedAgain ??
          'Retrieved again on 2026-11-03 with the same SHA-256.'),
      s.version ?? '',
      src.versionNote ?? '',
      src.archived?.note
        ? src.archived.note
        : src.archived
          ? 'The archive capture was found by an index search of the Internet Archive on 2026-11-03; it was not opened, and its bytes are not authenticated.'
          : '',
    ]
      .filter(Boolean)
      .join(' ');
    // "pack": the capture the cross-family check retrieved and found to hold
    // the same bytes as the copy read (part 3).
    if (src.archived === 'pack') {
      const capture = String(s.archive?.capture ?? '');
      const m = capture.match(
        /^https:\/\/web\.archive\.org\/web\/(\d{4})(\d\d)(\d\d)\d*id_\/(.+)$/,
      );
      if (
        !m ||
        m[4] !== s.url ||
        !/the same bytes as the copy read/.test(s.archive.note)
      )
        throw new Error('No capture of the same bytes for ' + cardId);
      src.archived = {
        url: capture.replace(/id_\//, '/'),
        at: `${m[1]}-${m[2]}-${m[3]}`,
        note: s.archive.note,
      };
    }
    if (
      src.archived &&
      !['url,at', 'url,at,note'].includes(Object.keys(src.archived).join())
    )
      throw new Error('Archive entry needs url and at: ' + cardId);
    addOnce('sources', {
      id: src.id,
      documentId: entityId,
      title: s.title,
      authors: [card.developer],
      authorNames: [{ literal: card.developer }],
      publisher: card.developer,
      publisherId,
      publicationDate: src.publicationDate,
      ...(src.versionDate ? { versionDate: src.versionDate } : {}),
      version,
      canonicalUrl: src.canonicalUrl ?? s.url,
      evidenceUrl: s.url,
      language: 'en',
      ...(src.archived
        ? { archivedUrl: src.archived.url, archivedAt: src.archived.at }
        : {}),
      documentWords: {
        count: s.documentWords.count,
        basis: `${String(s.documentWords.basis).replace(/\.$/, '')}; counted for the model-cards pack.`,
      },
      kind: 'report',
      accessedAt: s.retrievedAt,
      reuse: {
        attribution: `${card.developer}, “${s.title}”${src.publicationDate ? `, ${src.publicationDate}` : ''}.`,
        licence: 'No open redistribution licence asserted',
        note: reuseNote,
      },
    });

    // Document: new, or an existing record that gains the expression.
    if (plan.reuse) {
      const row = change('entities', entityId);
      if (row.type !== 'document')
        throw new Error('Reused entity is not a document: ' + entityId);
      row.sourceIds = [...(row.sourceIds as string[]), src.id];
    } else {
      if (plan.version) keysOk('version', plan.version, cardId);
      const v: Json | undefined = plan.version;
      if (v && !(v.publishedAt || v.revisedAt))
        throw new Error('A version needs a date: ' + cardId);
      addOnce('entities', {
        id: entityId,
        name: plan.name,
        type: 'document',
        subtype: plan.subtype,
        aliases: [],
        description: plan.description,
        sourceIds: [src.id],
        ...(v
          ? {
              documentVersion: {
                family: plan.family,
                label: v.label,
                publisherId,
                ...(v.publishedAt ? { publishedAt: v.publishedAt } : {}),
                ...(v.revisedAt ? { revisedAt: v.revisedAt } : {}),
                dateNote: v.dateNote,
              },
            }
          : {}),
      });
    }

    // Publication by the developer.
    let cardTime: Json;
    if (plan.published) {
      const pub: Json = plan.published;
      keysOk('published', pub, cardId);
      const ids = (pub.passages as Json[]).map((p, i) => {
        const id = `mc-ev-${pub.id.replace(/^mc-/, '')}-${i + 1}`;
        addOnce('evidence', evidenceRow(id, pub.id, cardId, src.id, p));
        return id;
      });
      addOnce('claims', {
        id: pub.id,
        subject: publisherId,
        predicate: 'published',
        object: { kind: 'entity', entityId },
        topic: 'governance',
        statement: pub.statement,
        time: pub.time,
        derivation: 'explicit',
        resolution: 'supported',
        editorialState: 'seed',
        qualification: pub.qualification,
        evidenceIds: ids,
        recordedAt: date,
      });
      cardTime = pub.time;
    } else if (plan.existingPublished) {
      const ex: Json = plan.existingPublished;
      keysOk('existingPublished', ex, cardId);
      const row = change('claims', ex.id);
      if (
        row.predicate !== 'published' ||
        row.subject !== publisherId ||
        (row.object as Json).entityId !== entityId
      )
        throw new Error('Not the card’s publication record: ' + ex.id);
      const ids = (ex.passages as Json[]).map((p, i) => {
        const id = `mc-ev-${ex.id}-pdf-${i + 1}`;
        addOnce(
          'evidence',
          evidenceRow(
            id,
            ex.id,
            cardId,
            src.id,
            p,
            `Added to this existing record at the model-cards admission of ${date}: ${ex.reason}`,
          ),
        );
        return id;
      });
      row.evidenceIds = [...(row.evidenceIds as string[]), ...ids];
      cardTime = row.time as Json;
    } else throw new Error('No publication record for ' + cardId);

    admitCites(cardId, entityId, src.id, cardTime, plan);
    done.push(cardId);
  }

  // Every map entry changed a record (operating guide, recurring pitfalls).
  const missingCards = [...packCards.keys()].filter(
    (id) => !done.includes(id) && !held.has(id),
  );
  if (missingCards.length)
    throw new Error(
      'Pack cards without a map entry: ' + missingCards.join(', '),
    );
  for (const [cardId, plan] of Object.entries(
    map.cards as Record<string, Json>,
  )) {
    if (plan.existing) {
      // Its cells are its records (admitCells), with any citation here.
      if (
        ((plan.cites ?? []) as Json[]).some(
          (c) => !added.claims.some((r) => r.id === c.id),
        )
      )
        throw new Error('A map entry changed no record: ' + cardId);
      continue;
    }
    const touched = [
      added.sources.some((r) => r.id === plan.source.id),
      plan.reuse
        ? changed.entities.has(plan.entity)
        : added.entities.some((r) => r.id === plan.entity),
      plan.published
        ? added.claims.some((r) => r.id === plan.published.id)
        : changed.claims.has(plan.existingPublished.id),
      ...((plan.cites ?? []) as Json[]).map((c) =>
        added.claims.some((r) => r.id === c.id),
      ),
    ];
    if (touched.includes(false))
      throw new Error('A map entry changed no record: ' + cardId);
  }
}
// ---------------------------------------------------------------- expressions (part 3)
/**
 * Further expressions of documents (decision 9a of pack 2, and Meta's own
 * copy of the Muse Spark report): sources that the cross-family check
 * retrieved, recorded with its retrieval's address and SHA-256. No passage
 * is quoted from them.
 */
function admitExpressions() {
  const retrievals = new Map<string, Json>(
    (crossCheck.retrievals as Json[]).map((r) => [r.id, r]),
  );
  for (const x of (map.expressions ?? []) as Json[]) {
    keysOk('expression', x, x.id);
    const doc =
      added.entities.find((e) => e.id === x.documentId) ??
      existing('entities', x.documentId);
    if (doc?.type !== 'document')
      throw new Error('Not a document: ' + x.documentId);
    const r = retrievals.get(x.retrieval);
    if (!r || r.httpStatus !== 200 || !r.sha256)
      throw new Error('No successful retrieval ' + x.retrieval);
    const capture = String(r.url).match(
      /^https:\/\/web\.archive\.org\/web\/(\d{4})(\d\d)(\d\d)\d*id_\/(.+)$/,
    );
    if ((capture ? capture[4] : r.url) !== x.evidenceUrl)
      throw new Error('The retrieval is not of this address: ' + x.id);
    const publisherId = (doc.documentVersion as Json | undefined)?.publisherId;
    const publisher = existing('entities', publisherId)?.name as string;
    if (!publisher) throw new Error('No publisher for ' + x.documentId);
    addOnce('sources', {
      id: x.id,
      documentId: x.documentId,
      title: x.title,
      authors: [publisher],
      authorNames: [{ literal: publisher }],
      publisher,
      publisherId,
      publicationDate: x.publicationDate,
      version: `${x.version} Retrieved by the cross-family check of ${checkDate}${capture ? ` from an Internet Archive capture of ${capture[1]}-${capture[2]}-${capture[3]}` : ' directly'} (SHA-256 ${r.sha256}); not read for quotation in the candidate pack, and no passage is quoted from it.`,
      canonicalUrl: x.canonicalUrl ?? x.evidenceUrl,
      evidenceUrl: x.evidenceUrl,
      language: 'en',
      ...(capture
        ? {
            archivedUrl: r.url.replace(/id_\//, '/'),
            archivedAt: `${capture[1]}-${capture[2]}-${capture[3]}`,
          }
        : {}),
      kind: 'report',
      accessedAt: x.accessedAt,
      reuse: {
        attribution: `${publisher}, “${x.title}”${x.publicationDate ? `, ${x.publicationDate}` : ''}.`,
        licence: 'No open redistribution licence asserted',
        note: 'Bibliographic metadata only; no passage is quoted from this expression.',
      },
    });
    const row = added.entities.find((e) => e.id === x.documentId)
      ? (added.entities.find((e) => e.id === x.documentId) as Json)
      : change('entities', x.documentId);
    row.sourceIds = [...(row.sourceIds as string[]), x.id];
  }
}

// ---------------------------------------------------------------- cells (parts 2 and 3)
/**
 * One record per card and question (schema 2.30): stated or partly cells
 * quote verified pack passages; not-found cells record their search. Cells
 * that do not apply have no record; the collection definition lists them,
 * and this checks that it lists exactly the pack's.
 */
function admitCells() {
  const questions = new Map<string, Json>(
    (read(map.files.questions).questions as Json[]).map((q) => [q.id, q]),
  );
  const overrides: Record<string, Json> = map.cells ?? {};
  for (const cellId of Object.keys(map.noteEdits ?? {}))
    if (!cellOf.has(cellId)) throw new Error('Unknown pack cell: ' + cellId);
  for (const [cellId, o] of Object.entries(overrides)) {
    keysOk('cellOverride', o, cellId);
    keysOk('search', o.search ?? {}, cellId);
    if (!cellOf.has(cellId)) throw new Error('Unknown pack cell: ' + cellId);
  }
  const unmarked = new Set<string>(map.notCrossFamilyChecked ?? []);
  const packCardIds = [...packCards.keys()].filter((id) => !held.has(id));
  const packEntities = packCardIds.map((id) => map1.cards[id].entity);
  const notApplicable = new Set(
    modelCards.notApplicable
      .filter((n) => packEntities.includes(n.cardId))
      .flatMap((n) => n.facetIds.map((f) => `${n.cardId} ${f}`)),
  );
  if (part === '2') {
    if (JSON.stringify(packEntities) !== JSON.stringify(modelCards.cards))
      throw new Error(
        'The collection’s rows are not the pack’s cards in order',
      );
  } else {
    // Part 3: the pack's cards are rows of the collection, and the rows are
    // still grouped by developer.
    const missing = packEntities.filter((e) => !modelCards.cards.includes(e));
    if (missing.length)
      throw new Error('Not rows of the collection: ' + missing.join(', '));
  }
  const find = (n: Name, id: string) =>
    added[n].find((r) => r.id === id) ?? existing(n, id);
  const applied = new Set<string>();
  for (const packCell of pack.cells as Json[]) {
    if (held.has(packCell.card)) continue;
    const cellId = `${packCell.card}:${packCell.question}`;
    const o = overrides[cellId];
    const cell: Json = o ? { ...packCell, ...o } : { ...packCell };
    if (o) applied.add(cellId);
    // Exact replacements in a cell's note, each of which must apply.
    for (const [from, to] of (map.noteEdits?.[cellId] ?? []) as string[][]) {
      if (!cell.note.includes(from))
        throw new Error(`Note edit does not apply: ${cellId}: ${from}`);
      cell.note = cell.note.replace(from, to);
      applied.add(cellId);
    }
    const plan = map1.cards[cell.card];
    const entityId: string = plan.entity;
    const sourceId: string = plan.source.id;
    const facetId = 'MC.' + cell.question;
    const facet = cardFacetById(facetId);
    const q = questions.get(cell.question);
    if (!facet || !q) throw new Error('Unknown question: ' + cell.question);
    if (
      modelCards.questions[facet.id].criterion !== q.criterion ||
      modelCards.questions[facet.id].question !== q.question
    )
      throw new Error(
        'The collection’s question differs from the pack: ' + q.id,
      );
    if (cell.status === 'not-applicable') {
      if (!notApplicable.delete(`${entityId} ${facetId}`))
        throw new Error('Not listed as not applicable: ' + cellId);
      continue;
    }
    const card = find('entities', entityId);
    if (!card) throw new Error('No card document: ' + entityId);
    const id = `mc-cell-${cell.card}-${cell.question.toLowerCase()}`;
    const src = find('sources', sourceId)!;
    const time: Json = src.versionDate
      ? {
          kind: 'event',
          date: src.versionDate,
          basis:
            src.versionDate === src.publicationDate
              ? 'publication'
              : 'revision',
          note: `Dated as the card read is dated: ${src.versionDate === src.publicationDate ? 'its printed date' : 'the date of its revision'}, as the source records it.`,
        }
      : src.publicationDate
        ? {
            kind: 'event',
            date: src.publicationDate,
            basis: 'publication',
            note: 'Dated as the card read is dated: its printed date, as the source records it.',
          }
        : (card.documentVersion as Json | undefined)?.revisedAt
          ? {
              kind: 'event',
              date: (card.documentVersion as Json).revisedAt,
              basis: 'revision',
              note: 'Dated as the card read is dated: the date of its revision, as the card’s version records it.',
            }
          : {
              kind: 'unknown',
              note: 'The card prints no date of its own, so its cells carry no date.',
            };
    const item = itemOf.get(cellId);
    const marked = unmarked.delete(cellId);
    if (
      marked !==
      String(cell.crossFamily?.result ?? '').startsWith(
        'not cross-family checked',
      )
    )
      throw new Error(
        'Cross-family exclusion does not match the pack: ' + cellId,
      );
    const exclusion = marked
      ? 'Not cross-family checked: the maintainer excluded this cell on chemical and biological evaluations from the cross-family check of 2026-11-03.'
      : '';
    const decision = o?.decision
      ? `Maintainer decision ${o.decision} of ${decidedOn}.`
      : '';
    const attributes = (status?: string) => ({
      provision: {
        kind: cardFacetKind,
        key: cardFacetKey(facetId),
        facet: { id: facetId, ...(status ? { status } : {}) },
      },
    });
    const search: Json | undefined = cell.search;
    const setAside = (search?.setAside ?? []) as Json[];
    const searchText = search
      ? `${String(search.read).replace(/([^.])$/, '$1.')} Terms searched: ${(search.terms as string[]).map((t) => `“${t}”`).join(', ')}.${setAside.length ? ' Passages read and not counted: ' + setAside.map((x) => `${x.locator}: ${x.reason}`).join(' ') : ''}`
      : '';
    if (cell.status === 'stated' || cell.status === 'partly') {
      // A passage part 1 identified by its link annotation keeps that note.
      const links = new Map<string, string>(
        ((plan.cites ?? []) as Json[]).flatMap((c) =>
          (c.passages as Json[])
            .filter((x) => x.link)
            .map((x) => [
              cellOf.get(`${cell.card}:${x.cell}`)!.passages[x.index - 1].quote,
              x.link,
            ]),
        ),
      );
      // A passage of another cell of the same card, verified there, may
      // stand in for a passage the check found not quoted as printed.
      const from = (o?.passagesFrom ??
        (cell.passages as Json[]).map((_: Json, i: number) => ({
          cell: cell.question,
          index: i + 1,
        }))) as Json[];
      const ids = from.map((ref, i) => {
        const passage = cellOf.get(`${cell.card}:${ref.cell}`)!.passages[
          ref.index - 1
        ];
        const evId = `mc-ev-cell-${cell.card}-${cell.question.toLowerCase()}-${i + 1}`;
        addOnce(
          'evidence',
          evidenceRow(evId, id, cell.card, sourceId, {
            cell: ref.cell,
            index: ref.index,
            ...(links.has(passage.quote)
              ? { link: links.get(passage.quote) }
              : {}),
          }),
        );
        return evId;
      });
      if (!ids.length)
        throw new Error('A stated cell without passages: ' + cellId);
      addOnce('claims', {
        id,
        subject: entityId,
        predicate: 'states_provision',
        object: { kind: 'literal', value: facet.label },
        topic: 'governance',
        statement:
          cell.status === 'stated'
            ? `${card.name} states what the model-card question “${facet.label}” asks.`
            : `${card.name} states in part what the model-card question “${facet.label}” asks.`,
        time,
        derivation: 'explicit',
        resolution: 'supported',
        editorialState: 'seed',
        qualification: [
          cell.note,
          search && cell.status === 'partly'
            ? `Search for the rest of the criterion: ${searchText}`
            : '',
          exclusion,
          decision,
          cell.status === 'partly' ? cardStandingText.partly : '',
          cardStandingText.stated,
        ]
          .filter(Boolean)
          .join(' '),
        evidenceIds: ids,
        recordedAt: date,
        attributes: attributes(cell.status),
      });
    } else if (cell.status === 'not-found') {
      if (!search?.read || !(search.terms as string[])?.length)
        throw new Error('A recorded absence without its search: ' + cellId);
      const evId = `mc-ev-cell-${cell.card}-${cell.question.toLowerCase()}`;
      const checked = item
        ? ` A cross-family machine check (${checkDate}, item ${item.number}) checked this cell${o?.decision ? '; after its second pass of 2026-11-03 the cell follows the checker’s reading' : (item.comparison?.verdict ?? item.outcome) === 'agree' ? ' and agreed with the pack' : `; its finding was applied at the adjudication of ${adjudicatedOn}`}.`
        : '';
      addOnce('evidence', {
        id: evId,
        claimId: id,
        sourceId,
        sourceRole: 'primary',
        support: 'supports',
        locator: `${card.name}: ${search.read}`,
        passage: `Within the inspected scope, no passage meeting the model-card question “${facet.label}” was found.`,
        passageType: 'paraphrase',
        verification: 'machine_checked',
        checkedAt: item ? checkDate : pack.checkDate,
        note: `Absence recorded for the model-cards candidate pack (${dir}) on ${pack.checkDate} ${map.absenceBy ?? 'by an automated research assistant and audited in a fresh context by the same model family'}.${checked} No human editorial review.`,
        retrievalRoute: 'direct',
      });
      addOnce('claims', {
        id,
        subject: entityId,
        predicate: 'provision_not_found',
        object: { kind: 'literal', value: facet.label },
        topic: 'governance',
        statement: `No passage meeting the model-card question “${facet.label}” was found in ${card.name} within the inspected scope.`,
        time,
        derivation: 'inferred',
        inferenceRationale: `Premises: the model-card question asks for the following. ${q.criterion} The inspected scope of ${card.name} was: ${searchText} The conclusion is bounded by that scope and method.`,
        resolution: 'supported',
        editorialState: 'seed',
        qualification: [cell.note, exclusion, decision, cardStandingText.absent]
          .filter(Boolean)
          .join(' '),
        evidenceIds: [evId],
        recordedAt: date,
        attributes: attributes(),
      });
    } else throw new Error(`Unknown status ${cell.status}: ${cellId}`);
  }
  // Every card's entry added its cells.
  for (const e of packEntities)
    if (
      !added.claims.some((c) => c.subject === e && c.id.startsWith('mc-cell-'))
    )
      throw new Error('A card without cells: ' + e);
  // Every map entry changed a record.
  const unapplied = [
    ...Object.keys(overrides),
    ...Object.keys(map.noteEdits ?? {}),
  ].filter((k) => !applied.has(k));
  if (unapplied.length || unmarked.size || notApplicable.size)
    throw new Error(
      'Map entries that changed no record: ' +
        [...unapplied, ...unmarked, ...notApplicable].join(', '),
    );

  // The o1 evidence quoting PDF pages moves to the PDF source, unchanged.
  const move: Json | undefined = map.moveEvidence;
  if (move) {
    const v: Json = read(move.verification);
    const pdf = packSources.get(packCards.get('openai-o1')!.source)!;
    if (v.sources[move.verificationSource]?.sha256 !== pdf.sha256)
      throw new Error('The verified file is not the PDF source’s file');
    if (
      existing('sources', move.to)?.documentId !==
      existing('sources', move.from)?.documentId
    )
      throw new Error('The two sources are not expressions of one document');
    for (const evId of move.ids as string[]) {
      const row = change('evidence', evId);
      if (row.sourceId !== move.from)
        throw new Error('Not on the web-page source: ' + evId);
      const claimEv = evId.replace(/^evidence-/, '').replace(/-(\d+)$/, '');
      const n = Number(evId.match(/-(\d+)$/)![1]);
      const q = v.quotes[`${claimEv}:${n - 1}`];
      if (!q || q.source !== move.verificationSource || !q.found)
        throw new Error('Not matched in the PDF file: ' + evId);
      row.sourceId = move.to;
      row.note = `${row.note} Moved on ${date} from the card’s web-page source (${move.from}) to its PDF source (${move.to}): ${move.reason}`;
      quoted.set(
        move.to,
        (quoted.get(move.to) ?? new Set()).add(row.passage as string),
      );
    }
  }
}

if (part === '1') admitCards();
else if (part === '2') admitCells();
else {
  admitCards();
  admitExpressions();
  admitCells();
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
  updatedAt: date > base.meta.updatedAt ? date : base.meta.updatedAt,
  scope: `${base.meta.scope} ${map.scope}`,
  ...(map.schemaVersion ? { schemaVersion: map.schemaVersion } : {}),
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
}
