// Admits the comparison pack's cells for the twelve questions given by
// paraphrase (schema 2.18; see review/compare-more-facets-2026-10-27.md).
//
//   node research/frontier-framework-comparison/admit-paraphrases.mjs --check   # paraphrase checks only
//   node research/frontier-framework-comparison/admit-paraphrases.mjs --write   # one-time admission
//
// One claim per edition and question, as in admit.mjs, but a stated cell's
// evidence is an explicit paraphrase of each pack passage (paraphrases.json),
// with the pack's page locator, so no quoted words are added to any edition.
// "Not found" cells become provision_not_found records as before; "not
// applicable" cells get no record.
import { execSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = join(import.meta.dirname, '..', '..');
const readJson = (p) => JSON.parse(readFileSync(join(ROOT, p), 'utf8'));
const pack = readJson('research/frontier-framework-comparison/pack.json');
const drafts = readJson(
  'research/frontier-framework-comparison/paraphrases.json',
).cells;
const data = {
  meta: readJson('data/meta.json'),
  entities: readJson('data/entities.json'),
  claims: readJson('data/claims.json'),
  sources: readJson('data/sources.json'),
  evidence: readJson('data/evidence.json'),
};

const DIMENSIONS = ['D1', 'D2', 'D5', 'D7', 'D8'];
const KIND = {
  D1: 'risk_domain',
  D2: 'threshold',
  D5: 'evaluation_timing',
  D7: 'reporting',
  D8: 'revision',
};
const RECORDED = '2026-10-27';
const REREAD = '2026-10-27';
const ABSENCE_CHECKED = '2026-10-26';
// Not retrievable on 2026-10-27: paraphrased from the pack's quotation,
// checked against the publisher copy on 2026-10-15.
const NOT_REREAD = { 'faif-2026': '2026-10-15' };

const facets = new Map(
  pack.dimensions.flatMap((d) =>
    d.facets.map((f) => [`${d.id}.${f.id}`, { ...f, dimension: d.id }]),
  ),
);
const admitted = [...facets.keys()].filter((f) =>
  DIMENSIONS.includes(f.split('.')[0]),
);
const words = (s) => s.trim().split(/\s+/).length;
const cell = (ed, facet) =>
  pack.cells.find((c) => c.edition === ed && c.facet === facet);

/** Checks every paraphrase and note against the rules in the record. */
function check() {
  const problems = [];
  const normalise = (t) =>
    t
      .replace(/[\u200b-\u200f\u202a-\u202e\u2066-\u2069\ufeff]/g, '')
      .toLowerCase()
      .replace(/[‘’]/g, "'")
      .replace(/[“”]/g, '"')
      .replace(/-\n/g, '')
      .replace(/\s+/g, ' ');
  // An edition that could not be re-read is checked against the passages
  // recorded for it: the pack's quotations and the dataset's evidence.
  const recordedText = (ed) =>
    normalise(
      [
        ...pack.cells
          .filter((c) => c.edition === ed.id)
          .flatMap((c) => (c.entries ?? []).map((e) => e.quote)),
        ...data.evidence
          .filter(
            (e) => e.sourceId === ed.dataSource && e.passageType === 'quote',
          )
          .flatMap((e) => [e.passage, e.locator]),
      ].join(' | '),
    );
  const text = (ed) => {
    const p = join(
      ROOT,
      '.local/frontier-framework-comparison/doc',
      `${ed.cacheKey}.txt`,
    );
    return existsSync(p)
      ? normalise(readFileSync(p, 'utf8'))
      : recordedText(ed);
  };
  // Names of offices, bodies and document types, which a paraphrase keeps.
  const names = [
    'the CEO and the Responsible Scaling Officer',
    'Capability Reports and Safeguards Reports',
    'the Google DeepMind AGI Safety Council',
  ];
  /** Longest run of words outside quotation marks that occurs in the edition. */
  const longestRun = (s, body) => {
    let unquoted = s.replace(/[“‘'][^”’']*[”’']/g, ' | ');
    for (const name of names) unquoted = unquoted.split(name).join(' | ');
    const tokens = unquoted
      .toLowerCase()
      .replace(/[’]/g, "'")
      .split(/\s+/)
      .filter(Boolean);
    let best = '';
    for (let i = 0; i < tokens.length; i++)
      for (let j = i + best.split(' ').length + 1; j <= tokens.length; j++) {
        const run = tokens.slice(i, j);
        if (run.includes('|')) break;
        if (!body.includes(run.join(' '))) break;
        best = run.join(' ');
      }
    return best;
  };
  for (const ed of pack.editions)
    for (const facetId of admitted) {
      const c = cell(ed.id, facetId);
      const key = `${ed.id}.${facetId}`;
      if (c.status === 'not-applicable') continue;
      const d = drafts[key];
      if (!d) {
        problems.push(`${key}: no draft`);
        continue;
      }
      const body = text(ed);
      const strings = [d.note, d.hitsNotCounted].filter(Boolean);
      for (const entry of c.entries ?? []) {
        const e = d.entries?.[entry.id];
        if (!e?.paraphrase) {
          problems.push(`${entry.id}: no paraphrase`);
          continue;
        }
        if (words(e.paraphrase) > 50)
          problems.push(`${entry.id}: ${words(e.paraphrase)} words`);
        if (!/^PDF p|^p\.|^Page/i.test(e.locator) && !/p\. ?\d/.test(e.locator))
          problems.push(`${entry.id}: locator without page: ${e.locator}`);
        strings.push(e.paraphrase, e.note ?? '');
      }
      for (const s of strings) {
        for (const q of s.match(/[“][^”]*[”]/g) ?? []) {
          if (words(q) > 6) problems.push(`${key}: long quoted term ${q}`);
          // A quoted term is the edition's exact wording.
          const term = normalise(q.slice(1, -1)).replace(/[.,;:]$/, '');
          const searched = (c.notFound?.searchTerms ?? []).some((t) =>
            t.split('|').includes(term),
          );
          if (body && !searched && !body.includes(term))
            problems.push(`${key}: quoted term not in the edition ${q}`);
        }
        if (body) {
          const run = longestRun(s, body);
          if (words(run) > 5) problems.push(`${key}: copied run “${run}”`);
        }
      }
    }
  return problems;
}

if (process.argv.includes('--check')) {
  const problems = check();
  console.log(problems.join('\n') || 'No problems.');
  process.exit(problems.length ? 1 : 0);
}
if (!process.argv.includes('--write')) {
  console.error('Pass --check or --write.');
  process.exit(1);
}
if (data.claims.some((c) => /^cmp-.*-d[12578]-/.test(c.id)))
  throw new Error('Paraphrased comparison cells are already admitted.');

const sha = (v) => createHash('sha256').update(JSON.stringify(v)).digest('hex');
const snapshotPath = 'review/compare-more-facets-before-2026-10-27.json';
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
/** Reader-facing text names other questions by label, never by code. */
function readable(s) {
  if (!s) return s;
  const dims = new Map(pack.dimensions.map((d) => [d.id, d]));
  return s
    .replace(/\bD(\d)\.(\w+)\b/g, (m) => `“${facets.get(m).label}”`)
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
  'What the edition states, paraphrased from the cited expression with its page. It is not evidence of implementation, compliance or effectiveness, and a shared question does not make two editions’ provisions equivalent.';

const claims = [];
const evidence = [];
for (const ed of pack.editions) {
  const doc = entity(ed.id);
  if (!doc?.documentVersion) throw new Error(`No edition entity ${ed.id}`);
  const short = doc.shortName;
  for (const facetId of admitted) {
    const f = facets.get(facetId);
    const c = cell(ed.id, facetId);
    if (!c) throw new Error(`Missing cell ${ed.id} ${facetId}`);
    if (c.status === 'not-applicable') continue;
    const d = drafts[`${ed.id}.${facetId}`];
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
        inferenceRationale: `Premises: the comparison question asks for the following. ${readable(f.criterion)} The inspected scope of ${short} was: ${sentence(nf.inspected)}Method: the edition was read in full and its text layer searched case-insensitively for ${nf.searchTerms.join(', ')}. Hits examined and not counted: ${sentence(d.hitsNotCounted ?? nf.hitsNotCounted)}${nf.archiveCheck ? sentence(nf.archiveCheck) : ''}The conclusion is bounded by that scope and method.`,
        resolution: 'supported',
        editorialState: 'seed',
        qualification:
          `${sentence(d.note)}A recorded absence within the stated scope: not a claim that the provision was deleted, and not a statement about practice or intent.`.trim(),
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
      const e = d.entries[entry.id];
      const recorded =
        status === 'recorded'
          ? data.evidence.find((x) => x.id === entry.reusesEvidence)
          : null;
      if (status === 'recorded' && !recorded)
        throw new Error(`Recorded passage missing for ${entry.id}`);
      const notReread = NOT_REREAD[ed.id];
      const note =
        status === 'recorded'
          ? `Explicit paraphrase of a passage recorded in the dataset for this edition (${recorded.id}), which an automated research assistant checked on ${recorded.checkedAt} against the Internet Archive capture of 2025-02-13. The comparison could not re-check it: the publisher address returned HTTP 500 and the archive could not be reached. ${sentence(e.note)}Human editorial review is pending.`
          : notReread
            ? `Explicit paraphrase, written on ${RECORDED} by an automated research assistant from the comparison’s quotation of this passage, which was checked on ${notReread} against the publisher copy (SHA-256 recorded in the comparison pack). The edition could not be retrieved again on ${RECORDED}; the archive capture of 2026-07-16 has the same SHA-256 (research/archive-checks-2026-10-26/codex-report.md). Given as a paraphrase to keep the edition within the quotation limit. ${sentence(e.note)}Human editorial review is pending.`
            : `Explicit paraphrase, written on ${REREAD} by an automated research assistant after re-reading the passage in the publisher copy, whose SHA-256 matches the copy retrieved on ${ed.retrieval.retrievedAt}. The comparison quoted the passage; it is given here as a paraphrase to keep the edition within the quotation limit. ${sentence(e.note)}Human editorial review is pending.`;
      evidence.push({
        id: evId,
        claimId: id,
        sourceId: ed.dataSource,
        sourceRole: 'primary',
        support: 'supports',
        locator: status === 'recorded' ? recorded.locator : e.locator,
        passage: e.paraphrase,
        passageType: 'paraphrase',
        verification: 'machine_checked',
        checkedAt:
          status === 'recorded' ? recorded.checkedAt : (notReread ?? REREAD),
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
      qualification: `${statusNote}${sentence(d.note)}${standing}`,
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
      description: `Records as stored at ${baseCommit} (schema 2.17, release v0.8.1) before the admission of the framework comparison's cells for the twelve questions given by paraphrase on 2026-10-27 (review/compare-more-facets-2026-10-27.md): the earlier metadata and the IDs the admission added. No stored row changed. The test-only historical view removes the added rows and restores the metadata.`,
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
data.meta.schemaVersion = '2.18';
data.meta.updatedAt = RECORDED;
data.meta.scope +=
  ' Schema 2.18 adds the comparison’s twelve further questions, on risk domains, thresholds, evaluation timing, reporting and revision, from the same pack: each stated cell gives an explicit paraphrase of the edition’s passage with its page instead of a quotation, so that no edition exceeds the quotation limit.';
for (const name of ['meta', 'claims', 'evidence'])
  writeFileSync(
    join(ROOT, 'data', `${name}.json`),
    JSON.stringify(data[name], null, 2) + '\n',
  );
console.log(
  `Added ${claims.length} claims and ${evidence.length} evidence rows.`,
);
