// Admits the comparison pack's cells for the admitted facets into the dataset
// (schema 2.17; see review/framework-comparison-ui-2026-10-27.md).
//
//   node research/frontier-framework-comparison/admit.mjs --budget   # quotation budget per edition
//   node research/frontier-framework-comparison/admit.mjs --write    # one-time admission
//
// One claim per edition and facet. Stated cells become states_provision
// records, "not found" cells provision_not_found records; "not applicable"
// cells get no record. A pack quotation that equals or lies within an existing
// passage of the same edition reuses that passage, so it adds no quoted words.
import { execSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = join(import.meta.dirname, '..', '..');
const readJson = (p) => JSON.parse(readFileSync(join(ROOT, p), 'utf8'));
const pack = readJson('research/frontier-framework-comparison/pack.json');
const data = {
  meta: readJson('data/meta.json'),
  entities: readJson('data/entities.json'),
  claims: readJson('data/claims.json'),
  sources: readJson('data/sources.json'),
  evidence: readJson('data/evidence.json'),
};

const ADMITTED = [
  'D3.safeguards',
  'D3.halt',
  'D4.determination',
  'D4.oversight',
  'D6.competitor',
  'D6.discretion',
];
const KIND = {
  D3: 'required_action',
  D4: 'decision_authority',
  D6: 'exception',
};
const RECORDED = '2026-10-27';
// The 20 retrievable editions were re-verified on 2026-10-27; xAI June 2026
// last on 2026-10-15. Absences were re-checked on 2026-10-26.
const CHECKED = { 'faif-2026': '2026-10-15' };
const ABSENCE_CHECKED = '2026-10-26';

const facets = new Map(
  pack.dimensions.flatMap((d) =>
    d.facets.map((f) => [`${d.id}.${f.id}`, { ...f, dimension: d.id }]),
  ),
);
const words = (s) => s.trim().split(/\s+/).length;
const norm = (s) => s.trim().replace(/\s+/g, ' ');
const loose = (s) =>
  norm(s)
    .toLowerCase()
    .replace(/[‘’“”"']/g, "'")
    .replace(/[–—]/g, '-');
const maxQuoted = (n) =>
  n < 2000
    ? Math.floor(n / 10)
    : Math.min(800, Math.max(400, Math.floor(n / 20)));

const cell = (ed, facet) =>
  pack.cells.find((c) => c.edition === ed && c.facet === facet);
const quotesOf = (sourceId) =>
  data.evidence.filter(
    (e) => e.sourceId === sourceId && e.passageType === 'quote',
  );

/** The existing evidence row whose passage equals or contains the quotation. */
function host(sourceId, quote) {
  const frags = quote.split(/\s*…\s*/).map(loose);
  const rows = quotesOf(sourceId);
  return (
    rows.find((e) => norm(e.passage) === norm(quote)) ??
    rows.find((e) => frags.every((f) => loose(e.passage).includes(f)))
  );
}

/**
 * The passage a pack entry is admitted with: a recorded (not re-checked)
 * entry keeps its dataset passage; otherwise an existing passage that equals
 * or contains the quotation, or the quotation itself.
 */
function passageFor(c, ed, entry) {
  const reused =
    c.status === 'carried-unverified'
      ? data.evidence.find((e) => e.id === entry.reusesEvidence)
      : host(ed.dataSource, entry.quote);
  if (c.status === 'carried-unverified' && !reused)
    throw new Error(`Recorded passage missing for ${entry.id}`);
  return { reused, passage: reused ? reused.passage : entry.quote };
}

/** Quoted words each edition would carry with a set of facets admitted. */
function budget(list) {
  return pack.editions.map((ed) => {
    const source = data.sources.find((s) => s.id === ed.dataSource);
    const existing = new Set(
      quotesOf(ed.dataSource).map((e) => norm(e.passage)),
    );
    const before = [...existing].reduce((n, p) => n + words(p), 0);
    for (const f of list)
      for (const entry of cell(ed.id, f)?.entries ?? [])
        existing.add(norm(passageFor(cell(ed.id, f), ed, entry).passage));
    const after = [...existing].reduce((n, p) => n + words(p), 0);
    return {
      edition: ed.id,
      limit: maxQuoted(source.documentWords.count),
      before,
      after,
    };
  });
}

if (process.argv.includes('--budget')) {
  const all = [...facets.keys()];
  const rows = budget(all);
  const admitted = budget(ADMITTED);
  console.log('edition | limit | dataset | all facets | admitted facets');
  rows.forEach((r, i) =>
    console.log(
      `${r.edition} | ${r.limit} | ${r.before} | ${r.after}${r.after > r.limit ? ' (over)' : ''} | ${admitted[i].after}${admitted[i].after > r.limit ? ' (over)' : ''}`,
    ),
  );
  process.exit(0);
}
if (!process.argv.includes('--write')) {
  console.error('Pass --budget or --write.');
  process.exit(1);
}
if (data.claims.some((c) => c.id.startsWith('cmp-')))
  throw new Error('Comparison cells are already admitted.');

const sha = (v) => createHash('sha256').update(JSON.stringify(v)).digest('hex');
const snapshotPath = 'review/framework-comparison-before-2026-10-27.json';
if (existsSync(join(ROOT, snapshotPath)))
  throw new Error(`${snapshotPath} exists`);
const baseCommit = execSync('git rev-parse --short HEAD', { cwd: ROOT })
  .toString()
  .trim();
const priorMeta = structuredClone(data.meta);
const priorSha = {
  entities: sha(data.entities),
  claims: sha(data.claims),
  sources: sha(data.sources),
  evidence: sha(data.evidence),
  meta: sha(data.meta),
};

const entity = (id) => data.entities.find((e) => e.id === id);
/** The date and basis the edition's existing provision records use. */
function timeOf(ed) {
  const existing = data.claims.find(
    (c) =>
      c.subject === ed &&
      (c.predicate === 'states_provision' ||
        c.predicate === 'provision_not_found'),
  );
  if (!existing) throw new Error(`No provision record to date ${ed}`);
  return { date: existing.time.date, basis: existing.time.basis };
}
const slug = (facet) => facet.toLowerCase().replace('.', '-');
/**
 * Pack notes name other questions by code (D6.competitor, D7). Reader-facing
 * text names them by label instead, and refers to the archive-check report in
 * the evidence note rather than by path.
 */
function readable(s) {
  if (!s) return s;
  const dims = new Map(pack.dimensions.map((d) => [d.id, d]));
  return s
    .replace(/\bD(\d)\.(\w+)\b/g, (m) => `“${facets.get(m).label}”`)
    .replace(
      /\bD(\d) (Pause, non-deployment or non-training|Determination|Internal reporting)/g,
      (m, d, start) =>
        `“${dims.get('D' + d).facets.find((f) => f.label.startsWith(start)).label}”`,
    )
    .replace(/\bD(\d)( Revision)?\b/g, (m, d) => `“${dims.get('D' + d).label}”`)
    .replace(/; see research\/archive-checks-2026-10-26\/codex-report\.md/, '');
}
const sentence = (s) =>
  s
    ? readable(s)
        .trim()
        .replace(/([^.])$/, '$1.') + ' '
    : '';
const standing =
  'What the edition states, quoted from the cited expression. It is not evidence of implementation, compliance or effectiveness, and a shared question does not make two editions’ provisions equivalent.';

const claims = [];
const evidence = [];
const notChecked = [];
for (const ed of pack.editions) {
  const doc = entity(ed.id);
  if (!doc?.documentVersion) throw new Error(`No edition entity ${ed.id}`);
  const short = doc.shortName;
  for (const facetId of ADMITTED) {
    const f = facets.get(facetId);
    const c = cell(ed.id, facetId);
    if (!c) throw new Error(`Missing cell ${ed.id} ${facetId}`);
    if (c.status === 'not-applicable') {
      notChecked.push({ edition: ed.id, facet: facetId, reason: c.reason });
      continue;
    }
    const id = `cmp-${ed.id}-${slug(facetId)}`;
    const { date, basis } = timeOf(ed.id);
    const provision = {
      kind: KIND[f.dimension],
      key: `comparison-${slug(facetId)}`,
    };
    const base = {
      id,
      subject: ed.id,
      object: { kind: 'literal', value: f.label },
      topic: 'governance',
    };
    if (c.status === 'not-found') {
      const nf = c.notFound;
      const evId = `ev-${id}`;
      claims.push({
        ...base,
        predicate: 'provision_not_found',
        statement: `No passage meeting the comparison question “${f.label}” was found in ${short} within the inspected scope.`,
        time: {
          kind: 'event',
          date,
          basis,
          note: `Absence recorded for this edition, dated by its ${basis} date.`,
        },
        derivation: 'inferred',
        inferenceRationale: `Premises: the comparison question asks for the following. ${f.criterion} The inspected scope of ${short} was: ${sentence(nf.inspected)}Method: the edition was read in full and its text layer searched case-insensitively for ${nf.searchTerms.join(', ')}. Hits examined and not counted: ${sentence(nf.hitsNotCounted)}${nf.archiveCheck ? sentence(nf.archiveCheck) : ''}The conclusion is bounded by that scope and method.`,
        resolution: 'supported',
        editorialState: 'seed',
        qualification:
          `${sentence(c.mappingNote)}A recorded absence within the stated scope: not a claim that the provision was deleted, and not a statement about practice or intent.`.trim(),
        evidenceIds: [evId],
        recordedAt: RECORDED,
        attributes: { provision: { ...provision, facet: { id: facetId } } },
      });
      evidence.push({
        id: evId,
        claimId: id,
        sourceId: ed.dataSource,
        sourceRole: 'primary',
        support: 'supports',
        locator: `${short}: ${nf.inspected}`,
        passage: `Within the inspected scope, no passage meeting the comparison question “${f.label}” was found.`,
        passageType: 'paraphrase',
        verification: 'machine_checked',
        checkedAt: ABSENCE_CHECKED,
        note: `Absence recorded by an automated research assistant on 2026-10-15 for the framework comparison, audited in a fresh context, checked by a reviewer from a different model family on 2026-10-15 and re-checked on 2026-10-26${nf.archiveCheck ? ' against an Internet Archive capture, because the publisher copy was no longer served (research/archive-checks-2026-10-26/codex-report.md)' : ''}. Human editorial review is pending.`,
      });
      continue;
    }
    if (!['stated', 'carried-unverified'].includes(c.status))
      throw new Error(`Unexpected status ${c.status}`);
    const status =
      c.status === 'carried-unverified'
        ? 'recorded'
        : c.partial
          ? 'partly'
          : 'stated';
    const evIds = [];
    c.entries.forEach((entry, i) => {
      const evId = `ev-${id}-${i + 1}`;
      evIds.push(evId);
      const checked = CHECKED[ed.id] ?? '2026-10-27';
      const { reused } = passageFor(c, ed, entry);
      const exact = reused && norm(reused.passage) === norm(entry.quote);
      const note =
        status === 'recorded'
          ? `Passage recorded in the dataset for this edition and checked by an automated research assistant on ${reused.checkedAt} against the Internet Archive capture of 2025-02-13. The comparison could not re-check it: the publisher address returned HTTP 500 and the archive could not be reached. ${sentence(entry.note)}Human editorial review is pending.`
          : reused
            ? `${exact ? 'Passage also quoted in the dataset’s existing evidence for this edition' : 'Existing dataset passage for this edition, which contains the comparison’s shorter quotation'}, first checked on ${reused.checkedAt}. The comparison’s quotation was checked by an automated research assistant on ${checked} against the publisher copy, whose SHA-256 matches the copy retrieved on ${ed.retrieval.retrievedAt}. ${sentence(entry.note)}Human editorial review is pending.`
            : `Verbatim excerpt checked by an automated research assistant on ${checked} against the publisher copy, whose SHA-256 matches the copy retrieved on ${ed.retrieval.retrievedAt}. ${sentence(entry.note)}Human editorial review is pending.`;
      evidence.push({
        id: evId,
        claimId: id,
        sourceId: ed.dataSource,
        sourceRole: 'primary',
        support: 'supports',
        locator:
          reused && (!exact || status === 'recorded')
            ? reused.locator
            : entry.locator,
        passage: reused ? reused.passage : entry.quote,
        passageType: 'quote',
        verification: 'machine_checked',
        checkedAt: status === 'recorded' ? reused.checkedAt : checked,
        note,
      });
    });
    const statusNote =
      status === 'partly'
        ? 'Stated, partly: the passage has what the question’s criterion asks for, but in a weaker form than the criterion’s own words. '
        : status === 'recorded'
          ? 'Recorded, not re-checked: the passage was recorded from the archive capture of 2025-02-13; the comparison could not retrieve the edition. '
          : '';
    claims.push({
      ...base,
      predicate: 'states_provision',
      statement: `${short} states a provision on the comparison question “${f.label}”${status === 'partly' ? ', in a weaker form than the question’s criterion' : ''}.`,
      time: {
        kind: 'event',
        date,
        basis,
        note: `Comparison cell for this edition, dated by the edition’s ${basis} date.`,
      },
      derivation: 'explicit',
      resolution: 'supported',
      editorialState: 'seed',
      qualification: `${statusNote}${sentence(c.mappingNote)}${standing}`,
      evidenceIds: evIds,
      recordedAt: RECORDED,
      attributes: {
        provision: { ...provision, facet: { id: facetId, status } },
      },
    });
  }
}

const added = {
  entities: [],
  claims: claims.map((c) => c.id),
  sources: [],
  evidence: evidence.map((e) => e.id),
};
writeFileSync(
  join(ROOT, snapshotPath),
  JSON.stringify(
    {
      description: `Records as stored at ${baseCommit} (schema 2.16, release v0.7.2) before the admission of the framework comparison's cells for six questions on 2026-10-27 (review/framework-comparison-ui-2026-10-27.md): the earlier metadata and the IDs the admission added. No stored row changed. The test-only historical view removes the added rows and restores the metadata.`,
      baseCommit,
      meta: priorMeta,
      added,
      before: { entities: [], claims: [], sources: [], evidence: [] },
      sha256: priorSha,
    },
    null,
    2,
  ) + '\n',
);
data.claims.push(...claims);
data.evidence.push(...evidence);
data.meta.schemaVersion = '2.17';
data.meta.updatedAt = RECORDED;
data.meta.scope +=
  ' Schema 2.17 adds the framework comparison, admitted on 2026-10-27 from a machine-prepared, machine-audited, cross-family-checked and adjudicated candidate pack: for six edition-neutral questions on required actions, who decides and exceptions, one record per framework edition and question, either quoting what the edition states (with “stated, partly” where a passage has what the question asks for only in a weaker form) or recording that no passage was found within a stated search. A record says what an edition states, not whether it was implemented or complied with, and a shared question does not make two provisions equivalent.';
for (const name of ['meta', 'claims', 'evidence'])
  writeFileSync(
    join(ROOT, 'data', `${name}.json`),
    JSON.stringify(data[name], null, 2) + '\n',
  );
console.log(
  `Added ${claims.length} claims and ${evidence.length} evidence rows. Not checked: ${JSON.stringify(notChecked)}`,
);
