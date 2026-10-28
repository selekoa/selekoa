// Applies the maintainer's decision of 2026-10-28 on the blind cross-family
// check of the framework comparison's paraphrases (record:
// review/paraphrase-corrections-2026-10-28.md), once:
//
//   node research/paraphrase-corrections-2026-10-28/apply.mjs
//
// The check (research/frontier-framework-comparison/
// codex-paraphrases-2026-10-28.md) read all 287 paraphrases against fresh
// copies of their editions and found 24 that leave out a condition, scope
// limit or threshold of their passage, and three whose locator names only
// part of it. Each is corrected in the pack (paraphrases.json, pack.json) and
// in its evidence record. No cell status changes; no claim changes.
//
// Writes the before-snapshot review/paraphrase-corrections-before-2026-10-28.json.
import { execSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = join(import.meta.dirname, '..', '..');
const readJson = (p) => JSON.parse(readFileSync(join(ROOT, p), 'utf8'));
const writeJson = (p, v) =>
  writeFileSync(join(ROOT, p), JSON.stringify(v, null, 2) + '\n');
const PACK = 'research/frontier-framework-comparison/pack.json';
const DRAFTS = 'research/frontier-framework-comparison/paraphrases.json';
const SNAPSHOT = 'review/paraphrase-corrections-before-2026-10-28.json';
const REPORT =
  'research/frontier-framework-comparison/codex-paraphrases-2026-10-28.md';
const pack = readJson(PACK);
const drafts = readJson(DRAFTS);
const data = {
  meta: readJson('data/meta.json'),
  entities: readJson('data/entities.json'),
  claims: readJson('data/claims.json'),
  sources: readJson('data/sources.json'),
  evidence: readJson('data/evidence.json'),
};
if (existsSync(join(ROOT, SNAPSHOT))) throw new Error(`${SNAPSHOT} exists`);

const RECORDED = '2026-10-28';
const CHECK = `a blind check of all 287 comparison paraphrases by a reviewer from a different model family on ${RECORDED} (${REPORT})`;

/**
 * Editions this session could not retrieve on 2026-10-28; their corrections
 * are written from the passage as the check quoted it from its own copy.
 */
const NOT_RETRIEVED = {
  'meta-faf-v1-1': {
    copy: 'the Internet Archive capture of 2025-02-13, whose decoded PDF SHA-256 (9fa301df…cc21) matches the one recorded in the comparison pack',
    failure:
      'the Internet Archive reset the connection and the publisher address returned HTTP 500',
  },
  'faif-2026': {
    copy: 'the Internet Archive capture of 2026-07-16, whose SHA-256 matches the publisher copy recorded in the comparison pack',
    failure:
      'the Internet Archive reset the connection and the publisher address returned HTTP 404',
  },
};

const RSP_V2_CADENCE = (page) => ({
  locator: `${page}, §3.1 Preliminary Assessment, definition of “notably more capable” and numbered items 1–2`,
  why: 'its locator named only item 1, while the six-month alternative is item 2',
  locatorOnly: true,
});
const RSP_V2_RD5 = {
  paraphrase:
    'The edition defines AI R&D-4 as fully automating an entry-level, remote-only Anthropic researcher’s work, and AI R&D-5 as dramatically accelerating effective scaling: an observed or projected one-year rise in effective training compute, for the most capable model in the world, equal to two years of average progress, early 2018–early 2024.',
  locator:
    "PDF p. 20 (printed p. 16), Appendix C Detailed Capability Thresholds, 'Autonomous AI Research and Development', entry 'AI R&D-4' (first sentence) and entry 'AI R&D-5' (first and second sentences)",
  why: 'it left out the second sentence of AI R&D-5, which defines dramatic acceleration as a one-year rise in effective training compute equal to two years of the average rate of early 2018 to early 2024',
};
const RSP_V3_DOMAINS = {
  paraphrase:
    'The “Automated R&D in key domains” row of the threshold table concerns AI systems capable of fully automating, or dramatically speeding up, the work of large teams of leading human researchers in domains where rapid progress could threaten international security or quickly disrupt the global balance of power.',
  note: 'The examples given are energy, robotics, weapons development and AI.',
  why: 'it left out the restriction to domains where fast progress could threaten international security or the global balance of power',
};
const RSP_V3_SUBSTITUTE = {
  paraphrase:
    'Under the Automated R&D row, the edition will consider the threshold met if Anthropic determines that its models could fully replace all of its Research Scientists and Research Engineers at competitive cost, which it glosses as within a factor of five.',
  locator:
    "PDF pp. 8–9, §1, threshold table, row 'Automated R&D in key domains', left column, paragraph beginning 'We will consider this threshold', condition (1)",
  note: 'This is condition (1). Alternative condition (2) is “dramatic acceleration”: observing or expecting “double the rate of progress” in aggregate AI capabilities relative to the rate expected without major AI contributions to AI R&D, where the doubling is plausibly attributable in large part to automated research or engineering.',
  why: 'it left out the gloss of competitive cost as within a factor of five, and its locator stopped before the continuation on PDF p. 9',
};
const MS_PUBLIC = {
  paraphrase:
    'The edition says Microsoft will share publicly information on the model’s capabilities and limitations, on relevant evaluations and on its risk classification, while taking care to protect commercially sensitive information and to minimise information hazards capable of creating safety and security risks.',
  why: 'it left out the care to minimise information hazards and to protect commercially sensitive information, which qualifies the same sentence',
};

/** The corrections, from the check's findings and the edition texts. */
const corrections = {
  'meta-faf-v1-1.D1.cyber.1': {
    paraphrase:
      'Among its cyber outcomes, the edition lists one in which critical zero-day vulnerabilities in widely used current software that follows security best practices are discovered automatically and exploited reliably before defenders are able to find and patch them.',
    locator: 'PDF p. 14 (printed p. 14), §3.4.1, outcome Cyber 2',
    why: 'it left out the software the outcome concerns (current, popular software that follows security best practices) and its timing (before defenders can find and patch the vulnerabilities)',
  },
  'meta-faf-v1-1.D7.internal.1': {
    paraphrase:
      'The edition says its risk assessment process records the strategies used to mitigate risk, and the risks that remain, across a set of risk categories that apply.',
    why: 'it said the records cover each risk category that applies, where the passage says they cover a set of applicable risk categories',
  },
  'rsp-2023.D1.autonomy.1': {
    paraphrase:
      'The edition names “Autonomous replication in the lab” as an ASL-3 capability: a model showing early signs of being able to replicate itself autonomously, defined by an aggregate success rate of 50% across the tasks in its appendix on autonomy evaluations.',
    note: 'The next paragraph says the appendix concerns acting autonomously with no human stepping in to stop the model.',
    why: 'it left out the definition of early signs as a 50% aggregate success rate on the appendix tasks',
  },
  'rsp-v2-0.D5.cadence.1': RSP_V2_CADENCE('PDF p. 9 (printed p. 5)'),
  'rsp-v2-1.D5.cadence.1': RSP_V2_CADENCE('PDF p. 10 (printed p. 6)'),
  'rsp-v2-2.D5.cadence.1': RSP_V2_CADENCE('PDF p. 10 (printed p. 6)'),
  'rsp-v2-1.D1.autonomy.1': RSP_V2_RD5,
  'rsp-v2-1.D2.levels.2': RSP_V2_RD5,
  'rsp-v2-2.D1.autonomy.1': RSP_V2_RD5,
  'rsp-v2-2.D2.levels.2': RSP_V2_RD5,
  'rsp-v3-1.D1.autonomy.1': RSP_V3_DOMAINS,
  'rsp-v3-3.D1.autonomy.1': RSP_V3_DOMAINS,
  'rsp-v3-4.D1.autonomy.1': RSP_V3_DOMAINS,
  'rsp-v3-1.D2.definition.2': RSP_V3_SUBSTITUTE,
  'rsp-v3-2.D2.definition.2': RSP_V3_SUBSTITUTE,
  'rsp-v3-3.D2.definition.2': {
    paraphrase:
      'Anthropic would count scenario (2) as met where it observes or expects aggregate AI progress at double the rate expected without major AI contributions to AI R&D, and the doubling is plausibly “substantially attributable” to R&D automation, such that continuing the trend could bring further acceleration.',
    locator:
      "PDF pp. 9–10, §1, threshold table, row 'Automated R&D in key domains', left column, paragraph beginning 'We would consider scenario (2)', conditions (a) and (b)",
    note: 'Scenario (2) is “dramatic acceleration”; a footnote defines “double the rate of progress” as a year’s progress equal to two baseline years. Scenario (1) is that models could fully replace, at competitive cost (within a factor of five), all Research Scientists and Research Engineers.',
    why: 'it gave condition (a) as if sufficient alone, leaving out condition (b), that the doubling plausibly be substantially attributable to automated research or engineering such that the trend could bring further acceleration',
  },
  'rsp-v3-4.D2.definition.2': {
    paraphrase:
      'Anthropic would count scenario (2) as met where it observes or expects aggregate AI progress at double both the expected rate and the fastest “extended progress” rate without major AI contributions to AI R&D, and the doubling is plausibly “substantially attributable” to R&D automation, such that further acceleration seems likely.',
    locator:
      "PDF pp. 9–10, §1, threshold table, row 'Automated R&D in key domains', left column, paragraph beginning 'We would consider scenario (2)', conditions (a) and (b), and footnote 9",
    note: 'Scenario (2) is “dramatic acceleration”. Footnote 9 sets extended progress as progress across three or more model generations. Scenario (1) is that models could fully replace, at competitive cost (within a factor of five), all Research Scientists and Research Engineers.',
    why: 'it gave condition (a) as if sufficient alone, leaving out condition (b), that the doubling plausibly be substantially attributable to automated research or engineering such that continued progress seems likely to bring further acceleration',
  },
  'fsf-v2-0.D7.external.1': {
    paraphrase:
      'The edition says that if Google DeepMind assesses a model as having reached a CCL presenting a material, unmitigated risk to public safety overall, it aims to give information to appropriate government authorities where doing so will help the development of safe AI.',
    note: 'The section adds that disclosure to other external organisations may also be considered (PDF p. 8).',
    why: 'it left out the condition that sharing will facilitate the development of safe AI',
  },
  'fsf-v3-0.D7.external.1': {
    paraphrase:
      'The edition says that if Google DeepMind assesses a model as having reached a CCL presenting a material, unmitigated risk to public safety overall, it aims to give relevant information to appropriate government authorities where doing so will help the safety of frontier AI.',
    note: 'The section adds that disclosure to other external organisations may also be considered.',
    why: 'it left out the condition that sharing will facilitate the safety of frontier AI',
  },
  'fsf-v3-1.D5.cadence.1': {
    paraphrase:
      'Google DeepMind conducts a critical capability assessment before a new frontier AI model’s first external deployment; under footnote 4, one may be skipped for a low-risk external deployment if the appropriate governance function finds its residual risk acceptable, even at a reached T/CCL (with a safety case at a CCL).',
    locator:
      'PDF p. 5 (printed p. 5), §1.3.2 Inherent Risk Assessment, first paragraph, second sentence, and footnote 4',
    note: 'The footnote’s example of a low-risk external deployment is release to a few trusted testers.',
    why: 'it left out footnote 4, attached to the same sentence, under which the assessment may not be conducted for low-risk external deployments',
  },
  'preparedness-beta-2023.D7.internal.1': {
    paraphrase:
      'The edition lists among the Preparedness team’s responsibilities a monthly report to the SAG, Leadership and the Board of Directors that synthesises its work and any possible protective actions; the SAG Chair, OpenAI Leadership or the Board may adjust that cadence as needed.',
    note: null,
    why: 'it left out that the SAG Chair, OpenAI Leadership and/or the Board can adjust the monthly cadence as needed',
  },
  'frontier-governance-2026.D7.internal.1': {
    paraphrase:
      'The edition says OpenAI documents a justification of why a model’s systemic risks are acceptable, which includes the reasonably foreseeable conditions under which that justification may stop holding, informed by recommendations from its Safety Advisory Group and outside experts, “as available and appropriate”.',
    note: 'The passage does not say whether “as available and appropriate” qualifies the Safety Advisory Group’s recommendations, the external experts’ or both; the paraphrase leaves that open.',
    why: 'it attached the qualifier “as available and appropriate” to the external experts alone, where the passage places it after the whole clause; the correction keeps the passage’s ambiguity and does not resolve it',
  },
  'frontier-governance-2026.D7.external.1': {
    paraphrase:
      'The edition says that, for models within the Framework’s scope, OpenAI also publishes details of the assessments in system cards or other reports when a model launches.',
    locator:
      'PDF p. 18 (printed p. 16), §4 Model reporting, first paragraph, first and second sentences',
    why: 'it left out the boundary set by the preceding sentence, which limits the assessments to models in scope of the Framework',
  },
  'frontier-governance-2026.D8.process.2': {
    paraphrase:
      'The edition says a Framework Assessment will be completed by OpenAI at least every 12 months, counted from when the EU Code of Practice and the TFAIA took effect.',
    note: 'The same sentence also bases the assessment on factors that OpenAI’s legal function considers, for example legal changes or changes in model capabilities.',
    why: 'it left out that the 12 months run from the effective dates of the TFAIA and the EU Code of Practice',
  },
  'faif-2026.D1.persuasion.2': {
    paraphrase:
      'The edition refers to risks that models with high manipulative capabilities could be misused in a way that could reasonably cause large-scale harm.',
    why: 'it left out that the misuse is misuse that could reasonably result in large-scale harm',
  },
  'ms-fgf-2025.D7.external.1': MS_PUBLIC,
  'ms-fgf-2026.D7.external.1': MS_PUBLIC,
};
if (Object.keys(corrections).length !== 27)
  throw new Error('Expected 27 corrections');

const sha = (v) => createHash('sha256').update(JSON.stringify(v)).digest('hex');
const baseCommit = execSync('git rev-parse --short HEAD', { cwd: ROOT })
  .toString()
  .trim();
const priorMeta = structuredClone(data.meta);
const priorSha = Object.fromEntries(
  ['entities', 'claims', 'sources', 'evidence', 'meta'].map((n) => [
    n,
    sha(data[n]),
  ]),
);
const before = { entities: [], claims: [], sources: [], evidence: [] };
const added = { entities: [], claims: [], sources: [], evidence: [] };
/** Changes a stored row in place, keeping its earlier state for the snapshot. */
function change(name, id, fn) {
  const row = data[name].find((r) => r.id === id);
  if (!row) throw new Error(`No ${name} row ${id}`);
  if (!before[name].some((r) => r.id === id))
    before[name].push(structuredClone(row));
  fn(row);
}

const sentence = (s) => (s ? s.trim().replace(/([^.])$/, '$1.') + ' ' : '');
const slug = (facet) => facet.toLowerCase().replace('.', '-');
const rows = [];
for (const [entryId, fix] of Object.entries(corrections)) {
  const [ed, dim, facetId, n] = entryId.split('.');
  const facet = `${dim}.${facetId}`;
  const cell = pack.cells.find((c) => c.edition === ed && c.facet === facet);
  const entry = cell?.entries.find((e) => e.id === entryId);
  if (!entry) throw new Error(`No pack entry ${entryId}`);
  if (!['stated'].includes(cell.status))
    throw new Error(`${entryId}: unexpected status ${cell.status}`);
  const draft = drafts.cells[`${ed}.${facet}`].entries[entryId];
  const old = { paraphrase: draft.paraphrase, locator: draft.locator };
  const kind = fix.locatorOnly ? 'locator wrong' : 'drift';
  if (fix.paraphrase) draft.paraphrase = fix.paraphrase;
  if (fix.locator) {
    draft.locator = fix.locator;
    draft.locatorCorrected = `Corrected on ${RECORDED} after the cross-family paraphrase check: ${fix.why.replace(/^its locator/, 'the earlier locator')}.`;
  }
  if ('note' in fix) draft.note = fix.note;
  const record = `Cross-family paraphrase check of ${RECORDED} (codex-paraphrases-2026-10-28.md): ${kind}; ${fix.why.replace(/^it /, 'the paraphrase ')}. Corrected on ${RECORDED} by the maintainer’s decision of that day; the cell’s status is unchanged.`;
  draft.paraphraseCheck = record;
  entry.paraphraseCheck = record;

  const evId = `ev-cmp-${ed}-${slug(facet)}-${n}`;
  change('evidence', evId, (e) => {
    if (e.passage !== old.paraphrase || e.locator !== old.locator)
      throw new Error(`${evId}: evidence differs from the draft`);
    e.passage = draft.paraphrase;
    e.locator = draft.locator;
    e.checkedAt = RECORDED;
    const failed = NOT_RETRIEVED[ed];
    const what = fix.locatorOnly
      ? `found that ${fix.why}; the locator was corrected and the paraphrase is unchanged`
      : `found that ${fix.why}`;
    const basis = failed
      ? `The correction was written from the passage as that check quoted it from ${failed.copy}: the edition could not be retrieved for the correction (${failed.failure}).`
      : 'The correction was written from the passage as re-read in the publisher copy retrieved on 2026-10-28, whose SHA-256 matches the copy retrieved on 2026-10-15.';
    e.note = `Explicit paraphrase by an automated research assistant, corrected on ${RECORDED} after ${CHECK}, which ${what}. ${basis} Given as a paraphrase to keep the edition within the quotation limit. ${sentence(draft.note)}Human editorial review is pending.`;
  });
  rows.push({ id: entryId, kind, old, now: draft, why: fix.why });
}

// No claim, status or other row changes.
for (const c of data.claims)
  for (const e of before.evidence)
    if (c.evidenceIds.includes(e.id) && !c.attributes?.provision?.facet)
      throw new Error(`${e.id} belongs to a non-comparison claim`);
for (const row of before.evidence)
  if (sha(row) === sha(data.evidence.find((r) => r.id === row.id)))
    throw new Error(`evidence ${row.id} unchanged`);

writeJson(SNAPSHOT, {
  description: `Records as stored at ${baseCommit} (schema 2.18, release v0.10.1) before the paraphrase corrections of ${RECORDED} (review/paraphrase-corrections-2026-10-28.md): the earlier metadata and the 27 comparison evidence records whose paraphrase or locator was corrected after the cross-family paraphrase check, as they were. Nothing was added. The test-only historical view restores the rest.`,
  baseCommit,
  meta: priorMeta,
  added,
  before,
  sha256: priorSha,
});
data.meta.updatedAt = RECORDED;
data.meta.scope += ` On ${RECORDED}, by the maintainer’s decision of that day, a blind cross-family check of all 287 framework-comparison paraphrases led to 27 corrections: 24 paraphrases now give the condition, scope limit or threshold their passage states, and three locators name the whole passage. No comparison cell changed status. All records remain seeds.`;
for (const name of ['meta', 'evidence'])
  writeJson(`data/${name}.json`, data[name]);
writeJson(PACK, pack);
writeJson(DRAFTS, drafts);

// The record's table, for review/paraphrase-corrections-2026-10-28.md.
const cellText = (s) => s.replace(/\|/g, '\\|');
writeFileSync(
  join(ROOT, '.local', 'paraphrase-corrections-table.md'),
  [
    '| Entry | Finding | Old paraphrase (locator) | New paraphrase (locator) | Why |',
    '| --- | --- | --- | --- | --- |',
    ...rows.map(
      (r) =>
        `| \`${r.id}\` | ${r.kind} | ${cellText(r.old.paraphrase)} (${cellText(r.old.locator)}) | ${r.kind === 'locator wrong' ? 'Unchanged' : cellText(r.now.paraphrase)} (${r.now.locator === r.old.locator ? 'unchanged' : cellText(r.now.locator)}) | ${cellText(r.why.replace(/^it /, 'The old paraphrase ').replace(/^its locator/, 'The old locator'))}. |`,
    ),
    '',
  ].join('\n'),
);
console.log(
  `Changed ${before.evidence.length} evidence rows; added nothing; table written to .local.`,
);
