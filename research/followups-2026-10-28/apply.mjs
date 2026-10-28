// Applies the maintainer's follow-up decisions of 2026-10-27 (record:
// review/followups-2026-10-28.md), once:
//
//   node research/followups-2026-10-28/apply.mjs
//
// 1. Meta Frontier AI Framework v1.1 comparison cells, from the blind
//    cross-family re-check (research/frontier-framework-comparison/
//    codex-meta-v1-1-2026-10-27.md): in the pack (pack.json, paraphrases.json)
//    and in the application data. Three findings that needed judgement were
//    decided by the maintainer on 2026-10-28 and are applied with the rest.
// 2. Katja Grace's person record and her two authorship records, on the
//    cross-family identity check (research/author-persons/
//    codex-identity-2026-10-27.md), with a new identity source.
// 3. Date provenance on three document records (A010, A057, A096).
// 4. The AI Magazine 2006 identity source, now cross-family checked.
//
// Writes the before-snapshot review/followups-before-2026-10-28.json.
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
const HELD = 'research/author-persons/admission-held-2026-10-27.json';
const SNAPSHOT = 'review/followups-before-2026-10-28.json';
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
const CHECKED = '2026-10-27';
const REPORT =
  'research/frontier-framework-comparison/codex-meta-v1-1-2026-10-27.md';
const CAPTURE = `the Internet Archive capture of 2025-02-13, which it retrieved and hashed (decoded PDF SHA-256 9fa301df…cc21; ${REPORT})`;
const ED = 'meta-faf-v1-1';
const SHORT = 'Meta FAF · v1.1';

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
function add(name, row) {
  if (data[name].some((r) => r.id === row.id))
    throw new Error(`${name} row ${row.id} exists`);
  data[name].push(row);
  added[name].push(row.id);
}

// ---------------------------------------------------------------------------
// 1. Meta Frontier AI Framework v1.1
// ---------------------------------------------------------------------------

const facets = new Map(
  pack.dimensions.flatMap((d) =>
    d.facets.map((f) => [`${d.id}.${f.id}`, { ...f, dimension: d.id }]),
  ),
);
/** The app's question labels, as the admitted cells of other editions carry them. */
const LABELS = Object.fromEntries(
  data.claims
    .filter((c) => c.attributes?.provision?.facet)
    .map((c) => [c.attributes.provision.facet.id, c.object.value]),
);
const KIND = {
  D1: 'risk_domain',
  D3: 'required_action',
  D4: 'decision_authority',
  D5: 'evaluation_timing',
  D6: 'exception',
  D7: 'reporting',
  D8: 'revision',
};
const QUOTED = ['D3', 'D4', 'D6'];
const slug = (facet) => facet.toLowerCase().replace('.', '-');
const packCell = (facet) =>
  pack.cells.find((c) => c.edition === ED && c.facet === facet);
const INSPECTED =
  'Whole edition, PDF pp. 1–21, read in the text layer of the decoded PDF of the Internet Archive capture of 2025-02-13; cover and PDF pp. 12–13 and 19 inspected visually';
const RECHECK = `Re-checked blind by a reviewer from a different model family on ${CHECKED} (codex-meta-v1-1-2026-10-27.md)`;

/** The re-check's findings, adopted under Rule B (see the record). */
const adopted = {
  'D1.cbrn': {
    status: 'stated',
    entries: [
      {
        quote:
          'Proliferation of known medium-impact biological and chemical weapons for low and moderate skill actors.',
        locator: 'PDF p. 15 (printed p. 15), §3.4.2, outcome CB 1',
        paraphrase:
          'Among its chemical and biological outcomes, the edition lists the spread of known medium-impact chemical and biological weapons to actors of low and moderate skill.',
      },
    ],
    mappingNote:
      'Chemical and biological weapons are named; the cell does not extend this to radiological or nuclear weapons.',
  },
  'D1.cyber': {
    status: 'stated',
    entries: [
      {
        quote:
          'Automated discovery and reliable exploitation of critical zero-day vulnerabilities',
        locator:
          'PDF p. 14 (printed p. 14), §3.4.1, outcome Cyber 2 (opening of the outcome)',
        paraphrase:
          'Among its cyber outcomes, the edition lists one in which critical zero-day vulnerabilities are discovered automatically and exploited reliably.',
      },
    ],
    mappingNote:
      'Cyber operations are a named domain, with outcomes and threat scenarios.',
  },
  'D1.autonomy': {
    status: 'stated',
    entries: [
      {
        quote: 'Autonomous cyber operations',
        locator:
          'PDF p. 14 (printed p. 14), §3.4.1, cyber outcomes table, enabling capabilities column',
        paraphrase:
          'In its cyber outcomes table, the edition lists autonomous cyber operations among the enabling capabilities.',
      },
    ],
    mappingNote:
      'Named as an enabling capability within the cyber domain, not as a domain with thresholds of its own. The same table names autonomous execution of multi-step tasks, and §4.2 (PDF p. 17) takes account of automated AI research and development that enhances capabilities. No autonomous replication threshold is named.',
  },
  'D1.persuasion': {
    status: 'not-found',
    notFound: {
      inspected: INSPECTED,
      searchTerms: ['persua', 'manipul', 'scam', 'groom', 'influence'],
      hitsNotCounted:
        'PDF p. 14, §3.4.1, outcome Cyber 3 and threat scenario TS.3.1: scams and grooming are grouped as cyber-enabled economic harm, not named as a persuasion or manipulation domain. PDF p. 18: influence concerns variables that affect the benefits of research. No persuasion or manipulation stems found.',
    },
  },
  'D1.other': {
    status: 'not-found',
    notFound: {
      inspected: INSPECTED,
      searchTerms: ['decep', 'misalign', 'sabot', 'oversight', 'domain'],
      hitsNotCounted:
        'PDF p. 16, §4.1: deception concerns the reliability of evaluations; no deceptive-behaviour or loss-of-control outcome or monitored domain is named. Domain hits on PDF pp. 3, 7, 8, 10, 14, 16 and 21 refer to the two named domains, expert disciplines, possible future domains not yet named, or the glossary.',
    },
  },
  'D3.safeguards': {
    status: 'stated',
    entries: [
      {
        quote:
          'Access is limited to a core research team, alongside security protections to prevent hacking or exfiltration.',
        locator:
          'PDF p. 13 (printed p. 13), §3.3 Risk thresholds, Table 1: Risk thresholds for frontier AI, High row, Measures column, security mitigations',
      },
    ],
    mappingNote:
      'The High row also requires mitigations that reduce risk to moderate levels. The Critical row limits access further, with security protections qualified by feasibility and commercial practicability (see “Other exceptions or discretion”); measures at the moderate level depend on evaluations and the release strategy.',
  },
  'D5.cadence': {
    status: 'stated',
    entries: [
      {
        quote:
          'We typically repeat evaluations as a frontier AI nears or completes training.',
        locator: 'PDF p. 18 (printed p. 18), §4.2 Evaluation and mitigation',
        paraphrase:
          'The edition says evaluations are typically run again when a frontier AI is close to finishing, or has finished, its training.',
      },
    ],
    mappingNote:
      '“Typically” is the edition’s word. Evaluations also run at an initial checkpoint (PDF p. 16), as follow-ups triggered by the capabilities found (PDF p. 17), and in the assessment before release (§2.1.2, PDF pp. 7–8).',
  },
  'D6.competitor': {
    status: 'not-found',
    notFound: {
      inspected: INSPECTED,
      searchTerms: [
        'compet',
        'race',
        'marginal',
        'other',
        'existing',
        'reference',
      ],
      hitsNotCounted:
        'No competitor, race or marginal stems. PDF p. 4: scope relative to the most advanced models, recorded as context under the scope-test rule; p. 6: external reference-class comparisons; p. 8: existing mitigations; p. 9: other frameworks; p. 12: net new and existing resources; p. 15: novel biological capabilities; p. 17: other barriers and cost constraints; p. 18: other discoveries and variables; p. 19: engagement with peers; p. 21: existing resources in the definition of uplift studies. These are scope, evaluation baselines, barriers or update inputs, not provisions that relax safeguards on what other developers do. Table 1 (p. 13): the route through other barriers tests whether a catastrophic outcome remains feasible, not other developers’ commitments.',
    },
  },
  'D6.discretion': {
    status: 'stated',
    entries: [
      {
        quote:
          'insofar as is technically feasible and commercially practicable',
        locator:
          'PDF p. 13 (printed p. 13), §3.3 Risk thresholds, Table 1: Risk thresholds for frontier AI, Critical row, Measures column, security mitigations (qualifying clause)',
      },
    ],
    mappingNote:
      'Qualifies the Critical row’s security protections against hacking and exfiltration. The edition also leaves to judgement whether further barriers justify revised threat scenarios (Table 1; §4.2, PDF p. 17) and whether to re-evaluate after a revision (§5.1, PDF p. 19). No general power to override the framework is stated.',
  },
  'D7.internal': {
    status: 'stated',
    entries: [
      {
        quote:
          'documenting mitigation strategies and residual risks across a set of applicable risk categories.',
        locator: 'PDF p. 7 (printed p. 7), §2.1.2 (risk assessment process)',
        paraphrase:
          'The edition says its risk assessment process records the strategies used to mitigate risk, and the risks that remain, for each risk category that applies.',
      },
    ],
    mappingNote:
      '§2.1.3 (PDF p. 8) passes the assessment of remaining risk to research and product teams, then to multidisciplinary review and leadership. These are internal records; no schedule of reports to a board is stated.',
  },
  // Decided by the maintainer on 2026-10-28 (the re-check proposed “stated, partly”).
  'D4.oversight': {
    status: 'not-found',
    decided: RECORDED,
    notFound: {
      inspected: INSPECTED,
      searchTerms: [
        'board',
        'trust',
        'oversight',
        'external',
        'third',
        'review',
      ],
      hitsNotCounted:
        'PDF p. 13, Table 1, footnote 7: the final assessment of uplift involves numerous experts, “including third parties where appropriate”; this is involvement in an assessment, not a role in overseeing or reviewing decisions. No board or oversight stems. Trust hits (PDF pp. 8–9, 21) concern trustworthiness or trusted release partners. External hits (PDF pp. 6–8, 10–11, 17–18, 21) concern reference models, expertise, threat modelling or the release context. Review hits (PDF pp. 5, 8) describe centralised, internal review. No board or external party is given a role in reviewing decisions.',
    },
    mappingNote:
      'The edition involves third parties “where appropriate” in the assessment of uplift (Table 1, footnote 7, PDF p. 13); this is recorded as context, not as a role in overseeing or reviewing decisions.',
  },
  'D7.external': {
    status: 'stated',
    decided: RECORDED,
    entries: [
      {
        quote:
          'We also plan to continue sharing relevant information about how we develop and evaluate our models responsibly',
        locator: 'PDF p. 9 (printed p. 9), §2.2',
        paraphrase:
          'The edition says Meta plans to go on sharing pertinent information on the responsible development and evaluation of its models.',
      },
    ],
    mappingNote:
      'Conditional wording (“plan to”). The channels named are model cards, research papers and guidance on responsible use; no deadline, recipient or mandatory incident report is stated.',
  },
  'D8.process': {
    status: 'stated',
    decided: RECORDED,
    entries: [
      {
        quote: 'We will update our Framework based on these observations.',
        locator: 'PDF p. 19 (printed p. 19), §5.1',
        paraphrase:
          'The edition says Meta will update its Framework on the basis of the observations described in that section.',
      },
    ],
    mappingNote:
      'The observations are of deployed models and the wider ecosystem; technical developments and engagement with peers and the community also inform revisions (§5.1, PDF p. 19). No approval body or interval for revisions is named.',
  },
};

// The pack: edition record and cells.
const edition = pack.editions.find((e) => e.id === ED);
edition.checked = `Not retrieved in the 2026-10-15 run (publisher address HTTP 500; Internet Archive unreachable). ${RECHECK}: the raw replay of the 2025-02-13 capture was retrieved (HTTP 200, application/pdf; decoded PDF 14,652,734 bytes, SHA-256 9fa301dfb67bf8d392abda13a2466358ffde756f14a9d55e4fe2d95f7cfecc21), all 21 pages read, and all eight carried quotations matched on their recorded pages.`;
edition.inspected = `${INSPECTED}, by the cross-family re-check of ${CHECKED}. Cells applied on ${RECORDED} by the maintainer’s decisions of 2026-10-27 and 2026-10-28.`;
edition.notes =
  'Cells carried from the dataset were confirmed by the re-check; the other cells are its findings, quoted and located by the re-check, with the comparison’s mapping notes. Three findings that differed from the stored status in a way that needed judgement (D4.oversight, D7.external, D8.process) were decided by the maintainer on 2026-10-28; see review/followups-2026-10-28.md.';
for (const facet of [
  'D2.levels',
  'D2.definition',
  'D3.halt',
  'D4.determination',
]) {
  const c = packCell(facet);
  if (c.status !== 'carried-unverified')
    throw new Error(`${facet} not carried`);
  c.status = 'stated';
  c.recheck = `${RECHECK}: the carried quotations match the 2025-02-13 capture on their recorded pages.`;
}
// D2: the re-check notes that the carried fragments omit Table 1's conditions;
// the pack now quotes the recorded passages in full, and the general definition.
const recorded = (id) => data.evidence.find((e) => e.id === id).passage;
const def = packCell('D2.definition');
def.entries[0].quote = recorded('evidence-prov-meta-faf-v1-1-high-threshold');
def.entries[1].quote = recorded(
  'evidence-prov-meta-faf-v1-1-critical-threshold',
);
def.entries.push({
  id: `${ED}.D2.definition.3`,
  quote:
    'Our high and moderate risk thresholds are defined in terms of the level of uplift a frontier AI provides towards realising a threat scenario.',
  locator: 'PDF p. 12 (printed p. 12), §3.3 Risk thresholds',
  reusesEvidence: null,
  source: REPORT,
});
def.mappingNote =
  'The Critical row is defined by uniquely enabling a threat scenario whose risk cannot be mitigated in the proposed deployment context; the High and Moderate rows by the level of uplift (PDF p. 12).';
packCell('D2.levels').mappingNote =
  'Table 1 has three rows, Critical, High and Moderate, with measure labels ‘Stop development’, ‘Do not release’ and ‘Release’; quotes for the High and Critical rows are in D2.definition.';
for (const [facet, f] of Object.entries(adopted)) {
  const c = packCell(facet);
  if (c.status !== 'not-applicable' || c.entries.length)
    throw new Error(`${facet} is not an empty cell`);
  delete c.reason;
  c.status = f.status;
  c.entries = (f.entries ?? []).map((e, i) => ({
    id: `${ED}.${facet}.${i + 1}`,
    quote: e.quote,
    locator: e.locator,
    reusesEvidence: null,
    source: REPORT,
  }));
  if (f.notFound) c.notFound = f.notFound;
  if (f.mappingNote) c.mappingNote = f.mappingNote;
  c.recheck = f.decided
    ? `${RECHECK}, which proposed “stated, partly”; applied on ${RECORDED} as “${f.status.replace('-', ' ')}” by the maintainer’s decision of ${f.decided}.`
    : `${RECHECK}; applied on ${RECORDED} by the maintainer’s decision of 2026-10-27.`;
}
packCell('D8.changes').reason =
  'First edition in this framework sequence (“This is the first iteration of our Frontier AI Framework”, Introduction, PDF p. 5, confirmed by the re-check of 2026-10-27).';

// Paraphrase drafts for the paraphrased questions.
const D2_NOTES = {
  'D2.levels':
    'Table 1 has three rows, Critical, High and Moderate, with the measure labels ‘Stop development’, ‘Do not release’ and ‘Release’; the High and Critical rows are recorded under D2.definition.',
  'D2.definition':
    'The Critical row turns on uniquely enabling a threat scenario, the High and Moderate rows on the level of uplift.',
};
for (const facet of ['D2.levels', 'D2.definition'])
  drafts.cells[`${ED}.${facet}`].note = D2_NOTES[facet];
const defDraft = drafts.cells[`${ED}.D2.definition`].entries;
defDraft[`${ED}.D2.definition.1`].paraphrase =
  'In the High row of the risk-threshold table, under “Do not release”, the edition says the model gives significant uplift towards carrying out a threat scenario, but does not enable any identified scenario that could potentially suffice for a catastrophic outcome.';
defDraft[`${ED}.D2.definition.2`].paraphrase =
  'In the Critical row of Table 1, under “Stop development”, the edition says the model would uniquely enable carrying out at least one identified threat scenario that could potentially suffice for a catastrophic outcome, and that this risk is not one that can be mitigated in the deployment context proposed.';
defDraft[`${ED}.D2.definition.3`] = {
  paraphrase:
    'The edition says its high and moderate thresholds are defined by how much uplift a frontier AI gives towards realising a threat scenario.',
  locator: 'PDF p. 12 (printed p. 12), §3.3 Risk thresholds',
  note: null,
  reread: false,
};
for (const [facet, f] of Object.entries(adopted)) {
  if (QUOTED.includes(facet.split('.')[0])) continue;
  const key = `${ED}.${facet}`;
  if (drafts.cells[key]) throw new Error(`Draft ${key} exists`);
  drafts.cells[key] =
    f.status === 'not-found'
      ? { note: null, hitsNotCounted: f.notFound.hitsNotCounted }
      : {
          note: f.mappingNote ?? null,
          entries: Object.fromEntries(
            f.entries.map((e, i) => [
              `${key}.${i + 1}`,
              {
                paraphrase: e.paraphrase,
                locator: e.locator,
                note: null,
                reread: false,
              },
            ]),
          ),
        };
}

// Reader-facing text names other questions by label, never by code.
const readable = (s) => s.replace(/\bD(\d)\.(\w+)\b/g, (m) => `“${LABELS[m]}”`);
const sentence = (s) =>
  s
    ? readable(s)
        .trim()
        .replace(/([^.])$/, '$1.') + ' '
    : '';
const standing = {
  quote:
    'What the edition states, quoted from the cited expression. It is not evidence of implementation, compliance or effectiveness, and a shared question does not make two editions’ provisions equivalent.',
  paraphrase:
    'What the edition states, paraphrased from the cited expression with its page. It is not evidence of implementation, compliance or effectiveness, and a shared question does not make two editions’ provisions equivalent.',
};
const RECORDED_SENTENCE =
  'Recorded, not re-checked: the passage was recorded from the archive capture of 2025-02-13; the comparison could not retrieve the edition. ';

// Carried cells: confirmed, so the "recorded, not re-checked" label goes.
for (const facet of [
  'D3.halt',
  'D4.determination',
  'D2.levels',
  'D2.definition',
]) {
  const id = `cmp-${ED}-${slug(facet)}`;
  const quoted = QUOTED.includes(facet.split('.')[0]);
  change('claims', id, (c) => {
    if (!c.qualification.startsWith(RECORDED_SENTENCE))
      throw new Error(`${id}: unexpected qualification`);
    c.attributes.provision.facet.status = 'stated';
    const note = D2_NOTES[facet] ? sentence(D2_NOTES[facet]) : '';
    c.qualification = quoted
      ? c.qualification.slice(RECORDED_SENTENCE.length)
      : `${note}${standing.paraphrase}`;
  });
  const claim = data.claims.find((c) => c.id === id);
  for (const evId of claim.evidenceIds)
    change('evidence', evId, (e) => {
      e.checkedAt = CHECKED;
      const source = quoted
        ? 'Passage recorded in the dataset for this edition'
        : `Explicit paraphrase of a passage recorded in the dataset for this edition (${/\(([^)]+)\)/.exec(e.note)[1]})`;
      e.note = `${source}, checked by an automated research assistant on 2026-10-03 against the Internet Archive capture of 2025-02-13, and matched against the same capture on ${CHECKED} by a reviewer from a different model family, which retrieved and hashed it (decoded PDF SHA-256 9fa301df…cc21; ${REPORT}). ${quoted ? '' : facet === 'D2.definition' ? `Paraphrase revised on ${RECORDED} to give the row’s full conditions, which the re-check found missing from the comparison’s shortened quotation. ` : ''}Human editorial review is pending.`;
    });
}
for (const [i, evId] of [
  `ev-cmp-${ED}-d2-definition-1`,
  `ev-cmp-${ED}-d2-definition-2`,
].entries())
  change('evidence', evId, (e) => {
    e.passage = defDraft[`${ED}.D2.definition.${i + 1}`].paraphrase;
  });
const defClaim = data.claims.find((c) => c.id === `cmp-${ED}-d2-definition`);
const defEv = `ev-cmp-${ED}-d2-definition-3`;
add('evidence', {
  id: defEv,
  claimId: defClaim.id,
  sourceId: edition.dataSource,
  sourceRole: 'primary',
  support: 'supports',
  locator: defDraft[`${ED}.D2.definition.3`].locator,
  passage: defDraft[`${ED}.D2.definition.3`].paraphrase,
  passageType: 'paraphrase',
  verification: 'machine_checked',
  checkedAt: CHECKED,
  note: `Explicit paraphrase, written on ${RECORDED} by an automated research assistant from the passage that a reviewer from a different model family quoted and located on ${CHECKED} in ${CAPTURE}. The edition could not be retrieved again for the paraphrase. Human editorial review is pending.`,
});
change('claims', defClaim.id, (c) => c.evidenceIds.push(defEv));

// New cells.
const time = {
  kind: 'event',
  date: '2025-02-03',
  basis: 'publication',
};
for (const [facetId, f] of Object.entries(adopted)) {
  const facet = facets.get(facetId);
  const label = LABELS[facetId];
  const quoted = QUOTED.includes(facet.dimension);
  const id = `cmp-${ED}-${slug(facetId)}`;
  const provision = {
    kind: KIND[facet.dimension],
    key: `comparison-${slug(facetId)}`,
  };
  const base = {
    id,
    subject: ED,
    object: { kind: 'literal', value: label },
    topic: 'governance',
  };
  if (f.status === 'not-found') {
    const nf = f.notFound;
    const evId = `ev-${id}`;
    add('claims', {
      ...base,
      predicate: 'provision_not_found',
      statement: `No passage meeting the comparison question “${label}” was found in ${SHORT} within the inspected scope.`,
      time: {
        ...time,
        note: 'Absence recorded for this edition, dated by its publication date.',
      },
      derivation: 'inferred',
      inferenceRationale: `Premises: the comparison question asks for the following. ${readable(facet.criterion)} The inspected scope of ${SHORT} was: ${sentence(nf.inspected)}Method: the edition was read in full and its text layer searched case-insensitively for ${nf.searchTerms.join(', ')}. Hits examined and not counted: ${sentence(nf.hitsNotCounted)}The conclusion is bounded by that scope and method.`,
      resolution: 'supported',
      editorialState: 'seed',
      qualification: `${sentence(f.mappingNote)}A recorded absence within the stated scope: not a claim that the provision was deleted, and not a statement about practice or intent.`,
      evidenceIds: [evId],
      recordedAt: RECORDED,
      attributes: { provision: { ...provision, facet: { id: facetId } } },
    });
    add('evidence', {
      id: evId,
      claimId: id,
      sourceId: edition.dataSource,
      sourceRole: 'primary',
      support: 'supports',
      locator: `${SHORT}: ${nf.inspected}`,
      passage: `Within the inspected scope, no passage meeting the comparison question “${label}” was found.`,
      passageType: 'paraphrase',
      verification: 'machine_checked',
      checkedAt: CHECKED,
      note: f.decided
        ? `Absence recorded on ${RECORDED} by the maintainer’s decision of ${f.decided}, on the reading of a reviewer from a different model family on ${CHECKED}, which read the whole edition in ${CAPTURE} before opening the comparison’s stored cells. The reviewer proposed “stated, partly” on Table 1, footnote 7 (PDF p. 13); the decision records that passage as context. One reading; no second reviewer. Human editorial review is pending.`
        : `Absence recorded by a reviewer from a different model family on ${CHECKED}, which read the whole edition in ${CAPTURE} before opening the comparison’s stored cells. One reading; no second reviewer. Human editorial review is pending.`,
    });
    continue;
  }
  const evIds = f.entries.map((e, i) => {
    const evId = `ev-${id}-${i + 1}`;
    add('evidence', {
      id: evId,
      claimId: id,
      sourceId: edition.dataSource,
      sourceRole: 'primary',
      support: 'supports',
      locator: e.locator,
      passage: quoted ? e.quote : e.paraphrase,
      passageType: quoted ? 'quote' : 'paraphrase',
      verification: 'machine_checked',
      checkedAt: CHECKED,
      note: quoted
        ? `Verbatim excerpt as quoted and located by a reviewer from a different model family on ${CHECKED} in ${CAPTURE}. Human editorial review is pending.`
        : `Explicit paraphrase, written on ${RECORDED} by an automated research assistant from the passage that a reviewer from a different model family quoted and located on ${CHECKED} in ${CAPTURE}. The edition could not be retrieved again for the paraphrase. Human editorial review is pending.`,
    });
    return evId;
  });
  add('claims', {
    ...base,
    predicate: 'states_provision',
    statement: `${SHORT} states a provision on the comparison question “${label}”.`,
    time: {
      ...time,
      note: 'Comparison cell for this edition, dated by the edition’s publication date.',
    },
    derivation: 'explicit',
    resolution: 'supported',
    editorialState: 'seed',
    qualification: `${sentence(f.mappingNote)}${quoted ? standing.quote : standing.paraphrase}`,
    evidenceIds: evIds,
    recordedAt: RECORDED,
    attributes: {
      provision: { ...provision, facet: { id: facetId, status: 'stated' } },
    },
  });
}

// ---------------------------------------------------------------------------
// 2. Katja Grace
// ---------------------------------------------------------------------------

const IDENTITY = 'source-grace-2020-atari-early';
const IDENTITY_REPORT = 'research/author-persons/codex-identity-2026-10-27.md';
add('sources', {
  id: IDENTITY,
  title: 'Atari early',
  authors: ['Katja Grace'],
  authorNames: [{ family: 'Grace', given: 'Katja' }],
  publisher: 'LessWrong',
  publicationDate: '2020-04-02',
  version: `Current post page read through a web retrieval tool on ${CHECKED} by a reviewer from a different model family (${IDENTITY_REPORT}); no archive capture used. The post header credits the account “KatjaGrace”, linked to /users/katjagrace, and the final author line of the body reads “By Katja Grace”. The date on which that line was added is not established. Used only to identify the account “KatjaGrace” by the name Katja Grace.`,
  canonicalUrl: 'https://www.lesswrong.com/posts/ygb6ryKcScJxhmwQo/atari-early',
  evidenceUrl: 'https://www.lesswrong.com/posts/ygb6ryKcScJxhmwQo/atari-early',
  language: 'en',
  kind: 'post',
  accessedAt: CHECKED,
  reuse: {
    attribution: 'Katja Grace, “Atari early”, LessWrong, 2020-04-02.',
    licence: 'No open redistribution licence asserted',
    note: 'Bibliographic metadata only; no passage is quoted. Recheck terms before wider redistribution.',
  },
});
const authorPack = readJson('research/author-persons/pack.json');
const grace = authorPack.candidates.find((c) => c.entity.id === 'katja-grace');
add('entities', {
  ...structuredClone(grace.entity),
  aliases: ['KatjaGrace'],
  sourceIds: [...grace.entity.sourceIds, IDENTITY],
});
const POSTS = {
  'ap-katja-grace-grace-2014-superintelligence-reading-group': 'A091',
  'ap-katja-grace-grace-2014-superintelligence-11': 'A037',
};
for (const [claimId] of Object.entries(POSTS)) {
  const cl = grace.claims.find((c) => c.id === claimId);
  const title = cl.context.documentName;
  const evId = `evidence-${claimId}`;
  add('claims', {
    id: cl.id,
    subject: cl.subject,
    predicate: cl.predicate,
    object: cl.object,
    topic: cl.topic,
    statement: `“${title}” (${cl.time.date}) credits the username “KatjaGrace” as its author.`,
    time: cl.time,
    derivation: cl.derivation,
    resolution: cl.resolution,
    editorialState: cl.editorialState,
    qualification:
      'Credited under the username “KatjaGrace”. The account’s post “Atari early” (LessWrong, 2020-04-02) carries the same username byline and, in its body, the author line “By Katja Grace”, which identifies the account. It says nothing about priority for the ideas discussed.',
    evidenceIds: [evId],
    recordedAt: RECORDED,
  });
  add('evidence', {
    id: evId,
    claimId,
    sourceId: cl.evidence[0].sourceId,
    sourceRole: 'primary',
    support: 'supports',
    locator:
      '“by” line beneath the title (username), linked to the account page /users/katjagrace',
    passage: 'KatjaGrace',
    passageType: 'quote',
    verification: 'machine_checked',
    checkedAt: CHECKED,
    note: `Passage and locator as inspected by a reviewer from a different model family on ${CHECKED} in the current post page, whose author link was followed (${IDENTITY_REPORT}); the preparer had restated the source record’s author list in place of the username. Human editorial review is pending.`,
    retrievalRoute: 'direct',
  });
}
const held = readJson(HELD).filter(
  (h) =>
    h.personId !== 'katja-grace' && !Object.keys(POSTS).includes(h.claimId),
);
writeJson(HELD, held);

// ---------------------------------------------------------------------------
// 3. Document dates (A010, A057, A096)
// ---------------------------------------------------------------------------

const AUTHORED_NOTE = (s) =>
  `${s} Authorship is credited in the inspected expression.`;
// A010: Bostrom, Extropians message.
change('entities', 'extropians-1996-09-04-bostrom', (e) => {
  e.description =
    'A message by Nick Bostrom to the Extropians mailing list in the thread "Thinking about the future...", dated 1996-09-04 by the archive’s receipt line; the archive’s garbled sent header ends “04 Sep 95”.';
});
change('sources', 'source-extropians-1996-09-04-bostrom', (s) => {
  s.version +=
    ' Date: the archive’s receipt line reads “Wed Sep  4 10:09:44 1996 MST” and the message is filed in the archive’s 1996 volume, which give the record’s date; the sent header is garbled and ends “04 Sep 95”, which nothing else in the message supports (receipt line re-read in a direct retrieval on 2026-10-27).';
});
change('claims', 'ap-nick-bostrom-extropians-1996-09-04-bostrom', (c) => {
  c.time.note = AUTHORED_NOTE(
    'Date of the archive’s receipt line, 4 September 1996; the garbled sent header ends “04 Sep 95”.',
  );
});
change(
  'evidence',
  'evidence-ap-nick-bostrom-extropians-1996-09-04-bostrom',
  (e) => {
    e.note = e.note.replace(
      'The visible header reads “04 Sep 95”, unlike the 1996 date of the record; the check did not resolve this.',
      'The garbled sent header ends “04 Sep 95”; the record’s 1996 date is the archive’s receipt line (see the source record).',
    );
  },
);
// A057: Moravec, Genetic takeover.
change('entities', 'moravec-1989-genetic-takeover', (e) => {
  e.description =
    'Hans Moravec’s chapter in Artificial Life (Santa Fe Institute Studies in the Sciences of Complexity VI, 1989), pp. 167–200. The year 1989 is the printed chapter’s, from the author’s publication list; the text is read in the author’s file, whose header dates it July 1988.';
});
change('sources', 'source-moravec-1989-takeover-file', (s) => {
  s.versionDate = '1988-07';
  s.version +=
    ' Date: the file’s header gives “July 1988” (the file and the capture alike); the publication date, 1989, is the year of the printed chapter in the author’s publication list. No 1989 printing was inspected.';
});
change('claims', 'ap-hans-moravec-moravec-1989-genetic-takeover', (c) => {
  c.time.note = AUTHORED_NOTE(
    'Year of the printed chapter, as given in the author’s publication list; the inspected file is dated July 1988.',
  );
});
change(
  'evidence',
  'evidence-ap-hans-moravec-moravec-1989-genetic-takeover',
  (e) => {
    e.note = e.note.replace(
      'Both headers date the text July 1988; the record keeps the date of its document record.',
      'Both headers date the text July 1988; the record’s 1989 is the printed chapter’s year (see the source record).',
    );
  },
);
// A096: Moravec, Analog.
change('entities', 'moravec-1979-todays-computers', (e) => {
  e.description =
    'Hans Moravec’s essay published in Analog 99 (2), February 1979, pp. 59–84; the issue date is from the author’s publication list. It is read in the author’s HTML copy, which prints “July 21, 1976” and “this version 1978”.';
});
change('sources', 'source-moravec-1979-analog-html', (s) => {
  s.versionDate = '1978';
  s.version +=
    ' Date: the page prints “July 21, 1976” and “this version 1978” (the page and the capture alike); the publication date, February 1979, is the issue of Analog (99, no. 2) in the author’s publication list. The printed issue was not inspected.';
});
change('claims', 'ap-hans-moravec-moravec-1979-todays-computers', (c) => {
  c.time.note = AUTHORED_NOTE(
    'Issue of Analog (99, no. 2) given in the author’s publication list; the inspected copy prints “July 21, 1976” and “this version 1978”.',
  );
});
change(
  'evidence',
  'evidence-ap-hans-moravec-moravec-1979-todays-computers',
  (e) => {
    e.note = e.note.replace(
      'The page prints “July 21, 1976” and “this version 1978”; it does not itself establish the February 1979 date of the record.',
      'The page prints “July 21, 1976” and “this version 1978”; the record’s February 1979 is the Analog issue (see the source record).',
    );
  },
);

// ---------------------------------------------------------------------------
// 4. AI Magazine 2006 identity source
// ---------------------------------------------------------------------------

change('sources', 'source-aimag-2006-dartmouth-proposal', (s) => {
  s.version += ` Cross-family checked on ${CHECKED} (${IDENTITY_REPORT}): supports. The publisher’s PDF (Wiley, DOI 10.1609/aimag.v27i4.1904), PDF page 1 of 3, printed p. 12, prints “John McCarthy, Marvin L. Minsky, Nathaniel Rochester, and Claude E. Shannon” beneath the title; printed p. 14 repeats the four names under “The Proposers”. The middle initials are not expanded. Wiley gives 1 December 2006 where this record gives the AAAI record’s 2006-12-15; not adjudicated.`;
});

// Every changed row must differ; every evidence id must resolve.
for (const name of Object.keys(before))
  for (const row of before[name])
    if (sha(row) === sha(data[name].find((r) => r.id === row.id)))
      throw new Error(`${name} ${row.id} unchanged`);

writeJson(SNAPSHOT, {
  description: `Records as stored at ${baseCommit} (schema 2.18, release v0.10.0) before the follow-ups of ${RECORDED} (review/followups-2026-10-28.md): the earlier metadata, the IDs added (Meta Frontier AI Framework v1.1 comparison cells, Katja Grace and her two authorship records, one identity source) and the rows changed (the four confirmed Meta cells and their evidence, three document records’ date provenance, the AI Magazine identity source), as they were. The test-only historical view removes the added rows and restores the rest.`,
  baseCommit,
  meta: priorMeta,
  added,
  before,
  sha256: priorSha,
});
data.meta.updatedAt = RECORDED;
data.meta.scope += ` On ${RECORDED}, by the maintainer’s decisions of 2026-10-27, a blind cross-family re-check of Meta’s Frontier AI Framework v1.1 against the archive capture of 2025-02-13 confirmed its four comparison cells recorded earlier and supplied thirteen further cells, three of them by decisions of 2026-10-28. Katja Grace’s two authorship records were admitted on an identifying source checked by the same reviewer family, and three document records now say which source gives which date. All records remain seeds.`;
for (const name of ['meta', 'entities', 'claims', 'sources', 'evidence'])
  writeJson(`data/${name}.json`, data[name]);
writeJson(PACK, pack);
writeJson(DRAFTS, drafts);
console.log(
  `Added ${Object.entries(added)
    .map(([n, ids]) => `${ids.length} ${n}`)
    .join(', ')}; changed ${Object.entries(before)
    .map(([n, rows]) => `${rows.length} ${n}`)
    .join(', ')}.`,
);
