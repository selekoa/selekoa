// Admits the lab genealogy pack (research/lab-genealogy) into the dataset,
// using the authored map in review/genealogy-admission-map-2026-10-17.json.
// Schema 2.15 adds the predicates founding_stated, licensing_hiring_agreement
// and unit_disbanded, the claim attribute statedReason and the evidence field
// retrievalRoute (maintainer decisions of 2026-10-16/17).
//
//   pnpm tsx scripts/genealogy-admission.ts           write the records
//   pnpm tsx scripts/genealogy-admission.ts --check   compare with the stored records
//
// The script is idempotent: it first removes the rows listed as added in the
// before-snapshot (review/genealogy-admission-before-2026-10-17.json) and
// restores the rows it changed, then rebuilds them. The pack is never changed.
//
// Every admitted passage matched both the drafting retrieval and the fresh
// retrieval of 2026-10-15 (verification.json); a record resting on a passage
// that the fresh retrieval could not read is held back.
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { maxQuotedWords } from '../src/domain/schema';

const date = '2026-10-17';
const dir = 'research/lab-genealogy';
const files = {
  pack: `${dir}/pack.json`,
  verification: `${dir}/verification.json`,
  verdicts: `${dir}/gpt-check-verdicts-2026-10-16.json`,
  check1: `${dir}/gpt-check-2026-10-16.json`,
  check2: `${dir}/gpt-check-2026-10-16-part2.json`,
  map: `review/genealogy-admission-map-${date}.json`,
  snapshot: `review/genealogy-admission-before-${date}.json`,
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

// The cross-family checks: item code, claim and verdict.
const itemOf = new Map<string, string>(
  read(files.verdicts).items.map((x: Json) => [x.claimId, x.item]),
);
const verdictOf = new Map<string, string>(
  [...read(files.check1).items, ...read(files.check2).items].map((x: Json) => [
    x.id,
    x.comparison.verdict,
  ]),
);

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
const cjk = /[\u3040-\u30ff\u3400-\u9fff\uf900-\ufaff]/g;
const packWords = (s: string) => {
  const rest = s.replace(cjk, ' ').trim();
  return (s.match(cjk) ?? []).length + (rest ? words(rest) : 0);
};
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
  pack.sources.map((s: Json) => [s.id, s]),
);
/** The dataset ID a pack source becomes. */
const sourceId = (id: string) => {
  const s = packSources.get(id);
  if (!s) throw new Error('Unknown pack source: ' + id);
  return (s.datasetSourceId as string) ?? id;
};
const packClaims = new Map<string, Json>(
  pack.claims.map((c: Json) => [c.id, c]),
);
const knownIds = new Set<string>([
  ...pack.claims.map((c: Json) => c.id),
  ...pack.claims.flatMap((c: Json) => c.evidence.map((e: Json) => e.id)),
  ...pack.sources.map((s: Json) => s.id),
  ...pack.entities.map((e: Json) => e.id),
  ...names.flatMap((n) => base[n].map((r) => r.id)),
]);

/**
 * Reader-facing text without record IDs or pack wording (the reader-text
 * rule of 2026-10-15): cross-references become "recorded separately", a
 * source named by ID becomes its title.
 */
function readerText(text: string): string {
  let t = text
    .replace(
      /; for his later departure see [a-z0-9-]+\./g,
      '; his later departure is recorded separately.',
    )
    .replace(
      /For the role as listed later see [a-z0-9-]+\./g,
      'The role as listed later is recorded separately.',
    )
    .replace(
      /For the organisation's stated founding year see [a-z0-9-]+\./g,
      'The organisation’s stated founding year is recorded separately.',
    )
    .replace(
      /; for the company’s establishment date see [a-z0-9-]+\./g,
      '; the company’s establishment date is recorded separately.',
    )
    .replace(
      /; see [a-z0-9-]+ for the company’s stated founding year\./g,
      '; the company’s stated founding year is recorded separately.',
    )
    .replace(
      /; see lg-cn-[a-z0-9-]+-founded-\d{4}\./g,
      '; the company’s stated founding date is recorded separately.',
    )
    .replace(
      /\. See lg-cn-[a-z0-9-]+-founded-\d{4}\./g,
      '. The company’s stated founding date is recorded separately.',
    )
    .replace(
      /; see lg-gs-candela-preparedness-stepdown-2025\./g,
      '; the earlier report of his step-down is recorded separately.',
    )
    .replace(
      /is the existing record cn-liang-deepseek\./g,
      'is recorded separately.',
    )
    .replace(
      /Read with cn-wang-zhipu \(CEO in June 2021\), it/g,
      'Read with the separate record of Wang Shaolan as CEO in June 2021, it',
    )
    .replace(/this pack does not establish/g, 'the dataset does not establish')
    .replace(/no co-founder claim is drafted/g, 'no co-founder record is made')
    .replace(
      /The record \(proposed predicate unit_disbanded\) records/g,
      'The record documents',
    )
    .replace(/recorded in this pack/g, 'recorded in this dataset')
    .replace(/ \(cache key [^)]+\)/g, '')
    // A source named by ID: its title.
    .replace(/\blg-src-[a-z0-9-]+/g, (id) => {
      const s = packSources.get(id);
      if (!s) throw new Error('Unknown source in text: ' + id);
      return `“${s.title}” (${s.publisher})`;
    })
    // A parenthesis that only names records.
    .replace(
      / \((?:existing record )?[a-z0-9]+(?:-[a-z0-9]+)+(?:, [a-z0-9]+(?:-[a-z0-9]+)+)*\)/g,
      (m) => {
        const ids = m
          .slice(2, -1)
          .replace(/^existing record /, '')
          .split(', ');
        return ids.every((id) => knownIds.has(id)) ? '' : m;
      },
    );
  const left = (t.match(/\b[a-z0-9]+(?:-[a-z0-9]+)+\b/g) ?? []).filter(
    (w) => knownIds.has(w) && !['day-to-day', 'of-the-art'].includes(w),
  );
  if (left.length) throw new Error(`Record ID left in text: ${left} in ${t}`);
  t = t.replace(/\s+([.;,])/g, '$1');
  return t;
}

/** Applies the map's exact text replacements to a row. */
function applyText(row: Json, changes: Json[] | undefined, what: string) {
  for (const change of changes ?? []) {
    const [field, sub] = (change.field as string).split('.');
    const holder = sub ? row[field] : row;
    const key = sub ?? field;
    if (typeof holder?.[key] !== 'string' || !holder[key].includes(change.from))
      throw new Error(`Text change not found in ${what} ${change.field}`);
    holder[key] = holder[key].replace(change.from, change.to);
  }
}

const loaded =
  /\b(poach(ed|ing)?|ousted?|defect(ed|ion)?|exodus|rivals?|betray\w*|purge\w*)\b/i;

// ---------------------------------------------------------------- selection
const heldBack: { id: string; item?: string; reason: string }[] = [];
const admitted: Json[] = [];
for (const raw of pack.claims as Json[]) {
  const reason: string | undefined = map.holdBack[raw.id];
  if (reason) {
    heldBack.push({ id: raw.id, item: itemOf.get(raw.id), reason });
    continue;
  }
  for (const e of raw.evidence) {
    const drafting = verification.passagesChecked[e.id]?.match;
    const fresh = verification.fresh.passagesChecked[e.id]?.match;
    if (drafting !== 'match' || fresh !== 'match')
      throw new Error(`Passage not matched twice and not held back: ${e.id}`);
  }
  admitted.push(raw);
}
for (const id of Object.keys(map.holdBack))
  if (!packClaims.has(id)) throw new Error('Unknown held-back record: ' + id);

// ---------------------------------------------------------------- new rows
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
/** A stored row to change, recorded once with its earlier state. */
const change = (n: Name, id: string): Json => {
  const row = existing(n, id);
  if (!row) throw new Error(`Existing ${n} row not found: ${id}`);
  if (!changed[n].has(id)) changed[n].set(id, structuredClone(row));
  return row;
};

// Claims and evidence.
const usedSources = new Set<string>();
const quoted = new Map<string, Set<string>>();
for (const raw of admitted) {
  const c: Json = structuredClone(raw);
  const plan: Json = map.claimChanges[c.id] ?? {};
  applyText(c, plan.text, c.id);
  if (plan.time) c.time = plan.time;
  for (const field of ['statement', 'qualification'])
    c[field] = readerText(c[field]);
  c.time.note = readerText(c.time.note);
  if (c.attributes?.role) c.attributes.role = readerText(c.attributes.role);
  if (loaded.test(c.statement) || loaded.test(c.qualification))
    throw new Error('Loaded wording: ' + c.id);
  // Decision 6: the TechCrunch title naming a health reason stays as
  // bibliographic data; no record citing it repeats the reason.
  if (
    c.evidence.some((e: Json) => e.sourceId === 'lg-src-gw-tc-weng-2026') &&
    /health/i.test(
      [c.statement, c.qualification, c.time.note, c.attributes?.role].join(' '),
    )
  )
    throw new Error('A private matter in the text of ' + c.id);

  const evidenceIds: string[] = [];
  for (const rawEvidence of c.evidence as Json[]) {
    const e: Json = structuredClone(rawEvidence);
    const ePlan: Json = map.evidenceChanges[e.id] ?? {};
    if (ePlan.locator) e.locator = ePlan.locator;
    if (ePlan.passage) {
      if (!e.passage.includes(ePlan.passage.from))
        throw new Error('Passage change not found: ' + e.id);
      e.passage = e.passage.replace(ePlan.passage.from, ePlan.passage.to);
    }
    // Quotation limit: a quotation shortened, or replaced by a paraphrase
    // whose anchor is part of the checked wording.
    if (ePlan.shorten) {
      const original: string = e.passageType === 'quote' ? e.passage : e.anchor;
      const part: string = ePlan.shorten.quote ?? ePlan.shorten.anchor;
      if (!original.includes(part))
        throw new Error('A shortened passage must come from the pack: ' + e.id);
      if (ePlan.shorten.quote) e.passage = part;
      else {
        e.passageType = 'paraphrase';
        e.anchor = part;
        if (ePlan.shorten.paraphrase) e.passage = ePlan.shorten.paraphrase;
      }
      e.shortened = true;
    }
    const s = packSources.get(e.sourceId)!;
    const id = sourceId(e.sourceId);
    usedSources.add(e.sourceId);
    const verbatim: string = e.passageType === 'quote' ? e.passage : e.anchor;
    if (verbatim) {
      if (packWords(verbatim) > 50 || words(verbatim) > 50)
        throw new Error('Quote over 50 words: ' + e.id);
      quoted.set(id, (quoted.get(id) ?? new Set()).add(verbatim));
    }
    const elided = e.passageType === 'quote' && /…|\.\.\./.test(e.passage);
    const item = itemOf.get(c.id);
    const verdict = item && verdictOf.get(item);
    const note = [
      `Candidate pack passage, lab genealogy (${dir}). ${
        e.passageType === 'quote'
          ? `The quotation (${words(e.passage)} words)`
          : `The paraphrase’s verbatim anchor “${e.anchor}”`
      } matched the retrieved text on 2026-10-15 and again in a fresh retrieval the same day. Read ${routePhrase[s.retrieval.route]}.`,
      'Matching ignored differences of whitespace, case, quotation marks, apostrophes, dashes and Unicode compatibility forms, so the source’s typography can differ.',
      elided ? 'Elided quotation: the ellipses mark omitted words.' : '',
      e.passageType === 'paraphrase'
        ? 'The paraphrase is Selekoa’s; only the anchor is the source’s wording.'
        : '',
      s.language !== 'en' && e.passageType === 'paraphrase'
        ? 'Paraphrase of a passage not in English; no human translation review.'
        : '',
      verdict
        ? `A cross-family machine check (2026-10-16/17) re-read the record’s sources and ${verdict === 'agree' ? 'agreed with the record' : 'judged it partly supported; its findings were applied at admission'}.`
        : '',
      e.shortened
        ? 'Shortened at admission to keep the quotations from this source within the per-document limit; the shortened wording is part of the checked passage.'
        : '',
      map.checkNotes[e.id] ?? '',
      e.note ?? '',
      'No human editorial review.',
    ]
      .filter(Boolean)
      .join(' ');
    addOnce('evidence', {
      id: e.id,
      claimId: c.id,
      sourceId: id,
      sourceRole: e.sourceRole,
      support: e.support,
      locator: e.locator,
      passage: e.passage,
      passageType: e.passageType,
      verification: 'machine_checked',
      checkedAt: e.checkedAt ?? verification.checkedAt,
      note,
      retrievalRoute: routeOf[s.retrieval.route],
    });
    evidenceIds.push(e.id);
  }

  const attributes: Json = {};
  const role = plan.attributes?.role ?? c.attributes?.role;
  if (role) attributes.role = role;
  if (c.attributes?.stage) {
    if (c.attributes.stage !== 'announced')
      throw new Error('Unknown stage: ' + c.id);
    attributes.activityStage = 'announced';
  }
  if (c.predicate === 'name_transition_announced') {
    attributes.transitionScope = 'name_announcement';
    attributes.activityStage = 'announced';
    c.time = { ...c.time, basis: 'announcement' };
  }
  if (c.statedReason) {
    if (!evidenceIds.includes(c.statedReason.evidenceId))
      throw new Error('Stated reason evidence not in record: ' + c.id);
    attributes.statedReason = {
      by: c.statedReason.by,
      text: readerText(c.statedReason.text),
      evidenceId: c.statedReason.evidenceId,
    };
  }
  const derivation = plan.derivation ?? c.derivation;
  const rationale = plan.inferenceRationale ?? c.inferenceRationale;
  const time: Json = { kind: c.time.kind };
  for (const key of ['date', 'from', 'until', 'basis', 'note'])
    if (c.time[key] !== undefined) time[key] = c.time[key];
  addOnce('claims', {
    id: c.id,
    subject: c.subject,
    predicate: c.predicate,
    object: c.object,
    topic: c.topic,
    statement: c.statement,
    time,
    derivation,
    resolution: c.resolution,
    ...(derivation === 'inferred'
      ? { inferenceRationale: readerText(rationale) }
      : {}),
    editorialState: 'seed',
    qualification: c.qualification,
    evidenceIds,
    recordedAt: date,
    ...(Object.keys(attributes).length ? { attributes } : {}),
  });
}

// Entities proposed by the pack. Their sources must be admitted ones.
for (const raw of pack.entities as Json[]) {
  if (raw.existing) {
    if (!existing('entities', raw.id))
      throw new Error('Existing entity not found: ' + raw.id);
    continue;
  }
  const kept = (raw.sourceIds as string[]).filter((s) => usedSources.has(s));
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
  // Where the pack's sources for an entity were all held back, the sources
  // of its admitted records identify it.
  if (!kept.length)
    for (const c of added.claims.filter(
      (c) => c.subject === raw.id || (c.object as Json).entityId === raw.id,
    ))
      for (const e of added.evidence.filter((e) => e.claimId === c.id))
        if (kept.length < 2 && !kept.includes(e.sourceId as string))
          kept.push(e.sourceId as string);
  if (!kept.length) throw new Error('No admitted source for ' + raw.id);
  const subtype = raw.subtype ?? map.entitySubtypes[raw.id];
  if (!subtype) throw new Error('No subtype for ' + raw.id);
  addOnce('entities', {
    id: raw.id,
    name: raw.name,
    ...(raw.sortName ? { sortName: raw.sortName } : {}),
    type: raw.type,
    subtype,
    aliases: raw.aliases ?? [],
    description: readerText(raw.description),
    sourceIds: [
      ...new Set(kept.map((k) => (packSources.has(k) ? sourceId(k) : k))),
    ],
  });
}

// Sources. A pack source already in the dataset is reused; it gains a
// recorded length where it had none and the pack quotes it.
const simpleName = /^[A-Z][a-z’'-]+ [A-Z][a-z’'-]+$/;
for (const packId of [...packSources.keys()].filter((id) =>
  usedSources.has(id),
)) {
  const s = packSources.get(packId)!;
  const id = sourceId(packId);
  const words = s.documentWords.count && {
    count: s.documentWords.count,
    basis: `${s.documentWords.basis.replace(/\.$/, '')}; counted for the lab genealogy pack on ${s.retrieval.retrievedAt}.`,
  };
  if (s.datasetSourceId) {
    const row = existing('sources', id);
    if (!row) throw new Error('Existing source not found: ' + id);
    if (row.canonicalUrl !== s.url && row.evidenceUrl !== s.url) {
      const same = (u: string) => u.replace(/\/(pdf|html|abs)\//, '/');
      if (same(row.canonicalUrl as string) !== same(s.url))
        throw new Error('Existing source is another document: ' + id);
    }
    if (!row.documentWords && quoted.has(id))
      change('sources', id).documentWords = words;
    continue;
  }
  // "et al." is not a name: the first credited authors are kept, and the
  // version says that the list is abbreviated.
  const abbreviated = (s.authors ?? []).includes('et al.');
  const credited = (s.authors ?? []).filter((a: string) => a !== 'et al.');
  const authors: string[] = credited.length ? credited : [s.publisher];
  const authorNames = authors.every(
    (a) => a === s.publisher || simpleName.test(a),
  )
    ? authors.map((a) =>
        a === s.publisher
          ? { literal: a }
          : { family: a.split(' ')[1], given: a.split(' ')[0] },
      )
    : undefined;
  const route = routePhrase[s.retrieval.route];
  const version = [
    `${s.publicationDate ? 'Dated' : 'Undated'} ${s.kind === 'post' ? 'post' : s.kind === 'paper' || s.kind === 'filing' ? 'document' : 'page'}, retrieved on ${s.retrieval.retrievedAt} (SHA-256 ${s.retrieval.sha256}) ${route}.`,
    s.publicationDate
      ? ''
      : 'Its wording can change; earlier wording is not authenticated.',
    s.note ? readerText(s.note) : '',
    abbreviated
      ? 'The author list gives the first credited authors only; see the document for the full list.'
      : '',
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
    ...(words ? { documentWords: words } : {}),
    kind: s.kind,
    accessedAt: s.retrieval.retrievedAt,
    reuse: {
      attribution: `${authors.join(', ')}, “${s.title}”${s.publicationDate ? `, ${s.publicationDate}` : ''}.`,
      licence: 'No open redistribution licence asserted',
      note: 'Bibliographic metadata, editorial paraphrases and short attributed quotations (at most 50 words each). Recheck terms before wider redistribution.',
    },
  });
}

// Quotation limits per source, counting quotations and paraphrase anchors,
// with the dataset's existing quotations from the same source.
const overLimit: string[] = [];
for (const [id, passages] of quoted) {
  const row = added.sources.find((s) => s.id === id) ?? existing('sources', id);
  const length = (row?.documentWords as Json)?.count;
  const all = new Set(passages);
  for (const e of base.evidence)
    if (e.sourceId === id && e.passageType === 'quote')
      all.add(e.passage as string);
  // A fragment inside another quoted passage counts once.
  const norm = (p: string) =>
    p
      .toLowerCase()
      .replace(/[‘’'“”"]/g, "'")
      .replace(/\s+/g, ' ')
      .trim();
  const list = [...all].map(norm);
  const total = list
    .filter((p, i) => !list.some((q, j) => j !== i && q !== p && q.includes(p)))
    .filter((p, i, a) => a.indexOf(p) === i)
    .reduce((n, p) => n + packWords(p), 0);
  // A post too short for the length count (no text block of ten words)
  // carries only a paraphrase anchor of a few words, never a quotation.
  const anchorsOnly = ![...passages].some((p) =>
    added.evidence.some(
      (e) => e.sourceId === id && e.passageType === 'quote' && e.passage === p,
    ),
  );
  if (!length && anchorsOnly && total <= 5) continue;
  if (!length || total > maxQuotedWords(length))
    overLimit.push(
      `${id}: ${total} quoted words, limit ${length ? maxQuotedWords(length) : '?'}`,
    );
}
if (overLimit.length)
  throw new Error('Over the quotation limit:\n' + overLimit.join('\n'));

// ---------------------------------------------------------------- existing
for (const [id, plan] of Object.entries(map.existing.claims) as [
  string,
  Json,
][]) {
  const row = change('claims', id);
  applyText(row, plan.text, id);
  if (plan.evidence) {
    const from = added.evidence.find(
      (e) => e.id === plan.evidence.fromPackEvidence,
    );
    if (!from) throw new Error('Pack evidence not admitted: ' + id);
    const ev = {
      ...structuredClone(from),
      id: plan.evidence.id,
      claimId: id,
      support: plan.evidence.support,
      passage: plan.evidence.passage,
      note: `${from.note} Added to this existing record at the lab genealogy admission of ${date} (maintainer decision 9); the absence of a name from a current page is not a statement of departure.`,
    };
    addOnce('evidence', ev);
    row.evidenceIds = [...(row.evidenceIds as string[]), ev.id];
  }
}
for (const [id, plan] of Object.entries(map.existing.entities) as [
  string,
  Json,
][]) {
  const row = change('entities', id);
  applyText(row, plan.text, id);
  for (const s of plan.addSources ?? []) {
    if (!existing('sources', s) && !added.sources.some((r) => r.id === s))
      throw new Error('Unknown source: ' + s);
    if (!(row.sourceIds as string[]).includes(s))
      row.sourceIds = [...(row.sourceIds as string[]), s];
  }
}

// ---------------------------------------------------------------- output
const meta = {
  ...base.meta,
  schemaVersion: '2.15',
  updatedAt: date,
  scope:
    base.meta.scope +
    ' Schema 2.15 adds the lab genealogy, admitted on 2026-10-17 from a machine-prepared, machine-audited and cross-family-checked candidate pack: dated records of who founded, led, joined and left frontier AI labs from 2010 to 2026, with organisations’ stated founding dates, licensing-and-hiring agreements and disbanded units; a reason is recorded only where the person or organisation concerned stated it, many records rest on reporting, and coverage is selective.',
};
const result = {
  meta,
  ...Object.fromEntries(names.map((n) => [n, [...base[n], ...added[n]]])),
} as unknown as { meta: Json } & Record<Name, Row[]>;

const newSnapshot = {
  description:
    'Records as stored at main 1d17923 (schema 2.14) before the admission of the lab genealogy pack on 2026-10-17 (schema 2.15): the earlier metadata, the IDs the admission added and the stored rows it changed, as they were. Changed rows: the Kreps board record (qualification and one added context passage), the tang-jie entity (description and one source) and reused sources that gained a recorded length. The test-only historical view removes the added rows and restores the earlier metadata and rows; review/genealogy-admission-2026-10-17.md records the admission.',
  baseCommit: '1d17923',
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
    `Added ${names.map((n) => `${added[n].length} ${n}`).join(', ')}; changed ${names.map((n) => `${changed[n].size} ${n}`).join(', ')}; held back ${heldBack.length}.`,
  );
  console.log(JSON.stringify(heldBack, null, 2));
}
