// Applies the maintainer's decisions of 2026-10-29 on the dataset consistency
// audit (review/dataset-audit-2026-10-29.md; record:
// review/audit-fixes-2026-10-29.md):
//
//   node research/audit-fixes-2026-10-29/apply.mjs
//
// Every data change of the audit fixes is made here, from the dataset as
// stored at the base commit, so the script can be re-run and gives the same
// result. It writes data/*.json, the before-snapshot
// review/audit-fixes-before-2026-10-29.json and the removal reasons in
// release/removals.json.
import { execSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  ORGANISATION_BY_ID,
  DOCUMENT_BY_ID,
  QUALIFICATIONS,
  PERSON,
  organisationMap,
  publicBodyMap,
  documentMap,
} from './subtypes.mjs';

const ROOT = join(import.meta.dirname, '..', '..');
const BASE = 'be2e9e4';
const RECORDED = '2026-10-29';
const SNAPSHOT = 'review/audit-fixes-before-2026-10-29.json';
const names = ['entities', 'claims', 'sources', 'evidence'];
const atBase = (file) =>
  JSON.parse(
    execSync(`git show ${BASE}:${file}`, {
      cwd: ROOT,
      maxBuffer: 1 << 28,
    }).toString(),
  );
const writeJson = (p, v) =>
  writeFileSync(join(ROOT, p), JSON.stringify(v, null, 2) + '\n');
const data = {
  meta: atBase('data/meta.json'),
  ...Object.fromEntries(names.map((n) => [n, atBase(`data/${n}.json`)])),
};
const sha = (v) => createHash('sha256').update(JSON.stringify(v)).digest('hex');
const priorMeta = structuredClone(data.meta);
const priorSha = Object.fromEntries(
  [...names, 'meta'].map((n) => [n, sha(data[n])]),
);
const priorOrder = Object.fromEntries(
  names.map((n) => [n, data[n].map((r) => r.id)]),
);

const before = { entities: [], claims: [], sources: [], evidence: [] };
const added = { entities: [], claims: [], sources: [], evidence: [] };
const removed = { entities: [], claims: [], sources: [], evidence: [] };
const removalReasons = { entities: {}, claims: {}, sources: {}, evidence: {} };
/** What changed, by decision, for the change record. */
const log = [];
const note = (decision, text) => log.push({ decision, text });

const find = (name, id) => {
  const row = data[name].find((r) => r.id === id);
  if (!row) throw new Error(`No ${name} row ${id}`);
  return row;
};
/** Changes a stored row in place, keeping its earlier state for the snapshot. */
function change(name, id, fn) {
  const row = find(name, id);
  if (!before[name].some((r) => r.id === id) && !added[name].includes(id))
    before[name].push(structuredClone(row));
  fn(row);
  return row;
}
function remove(name, id, reason) {
  const row = find(name, id);
  const prior = before[name].find((r) => r.id === id);
  removed[name].push(prior ?? structuredClone(row));
  before[name] = before[name].filter((r) => r.id !== id);
  data[name] = data[name].filter((r) => r.id !== id);
  removalReasons[name][id] = reason;
}
function add(name, row, afterId) {
  if (data[name].some((r) => r.id === row.id))
    throw new Error(`${name} ${row.id} exists`);
  if (afterId) {
    const i = data[name].findIndex((r) => r.id === afterId);
    if (i < 0) throw new Error(`No ${name} row ${afterId}`);
    data[name].splice(i + 1, 0, row);
  } else data[name].push(row);
  added[name].push(row.id);
  return row;
}
const replaceIn = (text, from, to) => {
  if (!text.includes(from)) throw new Error(`“${from}” not in “${text}”`);
  return text.split(from).join(to);
};
const sentence = (s) => s.trim().replace(/([^.])$/, '$1.');
const appendSentence = (text, s) =>
  text.includes(s) ? text : `${sentence(text)} ${s}`;
/** Points every reference to one record ID at another. */
function repoint(kind, from, to) {
  for (const c of data.claims) {
    if (kind === 'entity') {
      if (c.subject === from) change('claims', c.id, (r) => (r.subject = to));
      if (c.object.kind === 'entity' && c.object.entityId === from)
        change('claims', c.id, (r) => (r.object.entityId = to));
    }
  }
  for (const e of data.entities) {
    if (kind === 'source') {
      if (e.sourceIds.includes(from))
        change('entities', e.id, (r) => {
          r.sourceIds = [
            ...new Set(r.sourceIds.map((s) => (s === from ? to : s))),
          ];
        });
      if (e.datedNames?.some((n) => n.sourceIds.includes(from)))
        change('entities', e.id, (r) => {
          for (const n of r.datedNames)
            n.sourceIds = [
              ...new Set(n.sourceIds.map((s) => (s === from ? to : s))),
            ];
        });
    }
    if (kind === 'entity') {
      if (e.documentVersion?.publisherId === from)
        change('entities', e.id, (r) => (r.documentVersion.publisherId = to));
      if (e.documentVersion?.family === from)
        change('entities', e.id, (r) => (r.documentVersion.family = to));
    }
  }
  for (const s of data.sources) {
    if (kind === 'entity' && s.publisherId === from)
      change('sources', s.id, (r) => (r.publisherId = to));
    if (kind === 'entity' && s.documentId === from)
      change('sources', s.id, (r) => (r.documentId = to));
  }
  for (const e of data.evidence)
    if (kind === 'source' && e.sourceId === from)
      change('evidence', e.id, (r) => (r.sourceId = to));
  // No other field may still name the old ID.
  const rest = JSON.stringify(
    names.map((n) => data[n].filter((r) => r.id !== from)),
  );
  if (rest.includes(`"${from}"`))
    throw new Error(`${from} is still referenced after repointing`);
}

// ---------------------------------------------------------------------------
// A1. Pack-internal names replaced by dataset IDs.
const TK2023 =
  'source-trammell-korinek-2023-growth-under-transformative-ai-nber';
const TK2026 =
  'source-trammell-korinek-2026-growth-under-transformative-ai-nber-revision';
for (const c of data.claims) {
  const attested = c.attributes?.thought?.attested;
  if (attested?.note?.includes('source nber-w31815-2023'))
    change('claims', c.id, (r) => {
      r.attributes.thought.attested.note = replaceIn(
        r.attributes.thought.attested.note,
        'source nber-w31815-2023',
        `source ${TK2023}`,
      );
      note('A1', `\`${c.id}\`: attested-date note names \`${TK2023}\`.`);
    });
}
change('claims', 'ec-e03-gans-2023-socially-minded-governance-agi-b', (r) => {
  r.qualification = replaceIn(
    r.qualification,
    '(Gans 2018, source nber-w24352 in this pack)',
    '(Gans 2018, NBER Working Paper 24352; not a source record)',
  );
  note(
    'A1',
    '`ec-e03-gans-2023-socially-minded-governance-agi-b`: qualification names the Gans 2018 paper as NBER Working Paper 24352, not a source record.',
  );
});
change('sources', TK2023, (r) => {
  r.version = replaceIn(
    r.version,
    '(source nber-w31815)',
    `(source ${TK2026})`,
  );
});
change('sources', TK2026, (r) => {
  r.version = replaceIn(
    r.version,
    '(source nber-w31815-2023)',
    `(source ${TK2023})`,
  );
});
note(
  'A1',
  `The version notes of \`${TK2023}\` and \`${TK2026}\` name each other by dataset ID.`,
);

// ---------------------------------------------------------------------------
// A2 and C1. The US institute: description, and public_body like the UK one.
change('entities', 'us-ai-safety-institute', (r) => {
  r.type = 'public_body';
  r.description =
    'The U.S. AI Safety Institute under the name used in NIST’s April 2024 announcement, which describes it as housed at the National Institute of Standards and Technology. Its dated names record the June 2025 re-establishment as the Center for AI Standards and Innovation (CAISI), as NIST’s later editorial note dates it; reorganisation and legal continuity are not recorded. It is distinct from the UK AI Safety Institute.';
});
note(
  'A2',
  '`us-ai-safety-institute`: the description now says that its dated names record CAISI; reorganisation and legal continuity remain unrecorded.',
);
note(
  'C1',
  '`us-ai-safety-institute` retyped from `organisation` to `public_body`, like the UK institute.',
);

// ---------------------------------------------------------------------------
// A3. The unused fact sheet.
remove(
  'sources',
  'source-wh-factsheet-2024-07-26',
  'Removed on 2026-10-29 (consistency audit fix A3): no evidence used it and it identified no record.',
);
note(
  'A3',
  '`source-wh-factsheet-2024-07-26` removed: no evidence used it and it identified no record. The removal reason is in `release/removals.json`.',
);

// ---------------------------------------------------------------------------
// A4. Attributed priority words narrowed to "describes … as".
const A4 = {
  'lg-ev-cn-tang-jie-zhipu-cofounder-glm': [
    'The prospectus says that since 2018 KEG, together with Dr. Tang Jie and other scientists, pioneered cognitive-intelligence research and first developed the GLM large-model framework.',
    'The prospectus describes KEG, together with Dr. Tang Jie and other scientists, as having pioneered cognitive-intelligence research since 2018 and as having first developed the GLM large-model framework.',
  ],
  'lg-ev-mx-bansal-msl-2025': [
    "The memo lists Trapit Bansal as having pioneered RL on chain of thought and co-created OpenAI's o-series models.",
    "The memo describes Trapit Bansal as having pioneered RL on chain of thought and as a co-creator of OpenAI's o-series models.",
  ],
  'lg-ev-mx-chang-msl-2025': [
    "The memo lists Huiwen Chang as a co-creator of GPT-4o's image generation who previously invented MaskGIT and Muse at Google Research.",
    "The memo describes Huiwen Chang as a co-creator of GPT-4o's image generation who previously invented MaskGIT and Muse at Google Research.",
  ],
};
for (const [id, [from, to]] of Object.entries(A4))
  change('evidence', id, (r) => {
    r.passage = replaceIn(r.passage, from, to);
    r.note = appendSentence(
      r.note,
      'Reworded on 2026-10-29 to say “describes … as” (consistency audit fix A4); what the paraphrase reports is unchanged.',
    );
    note('A4', `\`${id}\`: paraphrase now says “describes … as”.`);
  });
change('claims', 'ec-m09-acemoglu-restrepo-2019-wrong-kind-of-ai-b', (r) => {
  r.statement = replaceIn(
    r.statement,
    'The authors note that economics (Herbert Simon) was among the disciplines that pioneered AI in the 1950s.',
    'The authors describe economics (Herbert Simon) as among the disciplines that pioneered AI in the 1950s.',
  );
  note(
    'A4',
    '`ec-m09-acemoglu-restrepo-2019-wrong-kind-of-ai-b`: statement now says “describe … as”.',
  );
});

// ---------------------------------------------------------------------------
// A7. The revision's short name.
change(
  'entities',
  'trammell-korinek-2026-growth-under-transformative-ai-nber-revision',
  (r) => {
    r.shortName =
      'Trammell and Korinek, Economic Growth under Transformative AI (2023, revised 2026)';
  },
);
note(
  'A7',
  '`trammell-korinek-2026-growth-under-transformative-ai-nber-revision`: short name “… (2023, revised 2026)”.',
);

// ---------------------------------------------------------------------------
// B1 and C6. Papers announced in a post are dated by their first public
// expression; the post's date goes in the time note. Re-read 2026-10-29: the
// posts and the arXiv version-1 pages and title pages.
const arxivNote =
  'Read on 2026-10-29 from the arXiv abstract page (version history) and the version-1 PDF title page, retrieved directly. Passage checked by an automated research assistant; no human editorial review.';
change('claims', 'xm-llama-publication', (r) => {
  r.statement =
    'Meta published the LLaMA paper, whose first arXiv version is dated 27 February 2023; Meta’s announcement of 24 February 2023 introduced the work and links the paper.';
  r.time = {
    kind: 'event',
    date: '2023-02-27',
    basis: 'publication',
    note: 'Dated by the paper’s first public expression that the records hold, arXiv version 1 (27 February 2023). Meta’s announcement post is dated 24 February 2023; its “Read the paper” link now points to the arXiv record, and what it linked on 24 February is not recorded.',
  };
  r.qualification =
    'The paper is dated by its first arXiv version; the institutional announcement three days earlier is a separate expression and is given in the time note. The announcement describes controlled noncommercial research access, not unrestricted commercial availability.';
  r.evidenceIds = [...r.evidenceIds, 'evidence-xm-llama-publication-arxiv-v1'];
});
add(
  'evidence',
  {
    id: 'evidence-xm-llama-publication-arxiv-v1',
    claimId: 'xm-llama-publication',
    sourceId: 'source-xm-llama-paper',
    sourceRole: 'primary',
    support: 'supports',
    locator: 'arXiv abstract page, version history; version-1 title page.',
    passage:
      'arXiv lists version 1 as submitted on 27 February 2023, and the version-1 title page gives Meta AI as the authors’ affiliation.',
    passageType: 'paraphrase',
    verification: 'machine_checked',
    checkedAt: RECORDED,
    note: arxivNote,
  },
  'evidence-xm-llama-publication',
);
change('claims', 'atlas-deepmind-chinchilla', (r) => {
  r.statement =
    'DeepMind published Training Compute-Optimal Large Language Models, whose first arXiv version is dated 29 March 2022; DeepMind’s research account of 12 April 2022 presents the study.';
  r.time = {
    kind: 'event',
    date: '2022-03-29',
    basis: 'publication',
    note: 'Dated by the paper’s first public expression, arXiv version 1 (29 March 2022). DeepMind’s research account linking the paper is dated 12 April 2022.',
  };
  r.qualification =
    'The paper is dated by its first arXiv version; DeepMind’s later research account is a separate expression and is given in the time note. Existing comparison and citation claims are reused.';
  r.evidenceIds = [
    ...r.evidenceIds,
    'evidence-atlas-deepmind-chinchilla-arxiv-v1',
  ];
});
add(
  'evidence',
  {
    id: 'evidence-atlas-deepmind-chinchilla-arxiv-v1',
    claimId: 'atlas-deepmind-chinchilla',
    sourceId: 'source-compute-optimal-language-models-v1',
    sourceRole: 'primary',
    support: 'supports',
    locator: 'arXiv abstract page, version history; version-1 PDF, page 1.',
    passage:
      'arXiv lists version 1 as submitted on 29 March 2022; page 1 of the version-1 PDF gives the corresponding authors’ DeepMind addresses and a DeepMind copyright notice.',
    passageType: 'paraphrase',
    verification: 'machine_checked',
    checkedAt: RECORDED,
    note: arxivNote,
  },
  'evidence-atlas-deepmind-chinchilla',
);
note(
  'B1',
  '`xm-llama-publication` re-dated from 2023-02-24 (Meta’s post) to 2023-02-27 (arXiv version 1), and `atlas-deepmind-chinchilla` from 2022-04-12 (DeepMind’s account) to 2022-03-29 (arXiv version 1), by convention C6. Each gains one evidence record from its paper’s arXiv expression; the post stays as evidence and its date moves to the time note.',
);

// ---------------------------------------------------------------------------
// B2. The MIRI agenda's day: the PDF states no date.
change('claims', 'lineage-ii-yudkowsky-agenda', (r) => {
  r.time.note =
    'Year only: the agenda’s PDF states no date (re-read 2026-10-29; its embedded file metadata gives 27 July 2016, which is not a stated date). The day, 27 July 2016, is that of MIRI’s announcement, recorded separately.';
});
note(
  'B2',
  '`lineage-ii-yudkowsky-agenda` keeps the year: the PDF, re-read on 2026-10-29, states no date (only its file metadata gives 27 July 2016). Its time note now says so.',
);

// ---------------------------------------------------------------------------
// B4 and C5. Seven source records of one expression merged into the earlier ID.
const merges = [
  [
    'source-atlas-openai-leadership',
    'source-openai-leadership-transition-2023',
  ],
  ['source-atlas-openai-return', 'source-openai-new-initial-board-2023'],
  ['source-eval-i-claude2-card', 'source-eval-ontology-i-claude2-card'],
  ['source-eval-i-gpt4-card', 'source-eval-ontology-i-gpt4-card'],
  ['source-eval-i-metr-name', 'source-eval-ontology-i-metr-name'],
  ['source-eval-i-spinout', 'source-eval-ontology-i-spinout'],
  [
    'source-aghion-jones-jones-2017-nber-capture',
    'source-aghion-jones-jones-2017-nber',
  ],
];
for (const [keep, drop] of merges) {
  const k = find('sources', keep);
  const d = find('sources', drop);
  if (k.canonicalUrl.replace(/\/$/, '') !== d.canonicalUrl.replace(/\/$/, ''))
    throw new Error(`${keep} and ${drop} are not one address`);
  change('sources', keep, (r) => {
    // The later inspection's fields, where the earlier record lacks them.
    for (const f of [
      'publisherId',
      'archivedUrl',
      'archivedAt',
      'documentWords',
      'documentId',
      'authorNames',
    ])
      if (d[f] !== undefined && r[f] === undefined)
        r[f] = structuredClone(d[f]);
    if (d.authors.length > r.authors.length) r.authors = [...d.authors];
    if (r.publicationDate === null && d.publicationDate)
      r.publicationDate = d.publicationDate;
    r.accessedAt = [r.accessedAt, d.accessedAt].sort().at(-1);
    r.version = `${sentence(r.version)} Re-inspected: ${sentence(d.version)} (Merged on 2026-10-29 with the record of the re-inspection, ${drop}, by consistency audit fix B4.)`;
  });
  repoint('source', drop, keep);
  remove(
    'sources',
    drop,
    `Merged on 2026-10-29 into ${keep}, the earlier record of the same expression (consistency audit fix B4); its evidence now cites ${keep}.`,
  );
  note('B4', `\`${drop}\` merged into \`${keep}\`.`);
}

// ---------------------------------------------------------------------------
// C3. One entity with dated names where the sources describe a renaming of
// the same body: Facebook to Meta, Codeium to Windsurf.
function mergeRenaming({
  keep,
  drop,
  claim,
  datedNames,
  aliases,
  description,
  subtype,
}) {
  const transition = find('claims', claim);
  for (const eid of transition.evidenceIds)
    remove(
      'evidence',
      eid,
      `Removed on 2026-10-29 with ${claim} (consistency audit decision C3): the renaming is recorded as dated names on ${keep}.`,
    );
  remove(
    'claims',
    claim,
    `Removed on 2026-10-29 (consistency audit decision C3): the sources describe a renaming of one body, now recorded as dated names on ${keep}; ${drop} was merged into ${keep}.`,
  );
  change('entities', keep, (r) => {
    r.datedNames = datedNames;
    r.aliases = [...new Set([...r.aliases, ...aliases])];
    r.description = description;
    if (subtype) r.subtype = subtype;
    const dropped = find('entities', drop);
    r.sourceIds = [...new Set([...r.sourceIds, ...dropped.sourceIds])];
  });
  remove(
    'entities',
    drop,
    `Merged on 2026-10-29 into ${keep} (consistency audit decision C3): the sources describe a renaming of one body, recorded as dated names on ${keep}.`,
  );
  repoint('entity', drop, keep);
  note(
    'C3',
    `\`${drop}\` merged into \`${keep}\`, which now carries dated names; the name-transition record \`${claim}\` and its evidence are removed.`,
  );
}
mergeRenaming({
  keep: 'meta',
  drop: 'facebook-company',
  claim: 'xm-meta-name',
  aliases: ['Facebook (company)'],
  datedNames: [
    {
      name: 'Facebook',
      until: '2021-10-28',
      note: 'The company’s name until the announcement of 28 October 2021, distinct from the Facebook service. The announcement says that the corporate structure is not changing.',
      sourceIds: ['source-xm-meta-name', 'source-xm-fair-paris'],
    },
    {
      name: 'Meta',
      from: '2021-10-28',
      note: 'As announced on 28 October 2021 (“Introducing Meta: A Social Technology Company”), as the company’s new brand; the date of any change of legal name is not recorded.',
      sourceIds: ['source-xm-meta-name'],
    },
  ],
  description:
    'Parent company named Meta in 2021, earlier named Facebook; its dated names record the announcement of 28 October 2021, which says that the corporate structure is not changing. FAIR is represented separately as a research unit; broader Meta AI research and product work is not automatically assigned to FAIR.',
});
mergeRenaming({
  keep: 'windsurf',
  drop: 'codeium',
  claim: 'lg-deal-codeium-renamed-windsurf-2025',
  aliases: [],
  datedNames: [
    {
      name: 'Exafunction',
      from: '2021',
      until: '2022',
      note: 'The rename announcement of 4 April 2025 says that the company first began as Exafunction in 2021 and had rebranded to Codeium by 2022.',
      sourceIds: ['lg-src-deal-windsurf-rename-2025'],
    },
    {
      name: 'Codeium',
      from: '2022',
      until: '2025-04-04',
      note: 'The company’s name from 2022, as the rename announcement dates it, until that announcement.',
      sourceIds: ['lg-src-deal-windsurf-rename-2025'],
    },
    {
      name: 'Windsurf',
      from: '2025-04-04',
      note: 'As announced on 4 April 2025 (“Today, we are proud to officially rebrand our company to Windsurf”). No filing was retrieved, and the post does not state a change of legal name.',
      sourceIds: ['lg-src-deal-windsurf-rename-2025'],
    },
  ],
  description:
    'AI coding company that began as Exafunction in 2021, was known as Codeium from 2022 and renamed itself Windsurf in April 2025, as its dated names record; Cognition announced an agreement to acquire it in July 2025.',
});

// ---------------------------------------------------------------------------
// C7. A scheduled date says so.
change('claims', 'ny-ch96-effective-date', (r) => {
  r.time.note = appendSentence(
    r.time.note,
    `The date was still to come when this record was made (${r.recordedAt}): it was scheduled at the time of recording.`,
  );
});
note(
  'C7',
  '`ny-ch96-effective-date`: the time note says that the effective date was scheduled at the time of recording.',
);

// ---------------------------------------------------------------------------
// C9. Document content recorded as what the document states (schema 2.20).
const C9 = {
  'c2-minimax-01-licence-mau': [
    'Licence request above 100 million monthly active users',
    'minimax-01-licence-mau',
  ],
  'c2-minimax-01-licence-military': [
    'No military use',
    'minimax-01-licence-military',
  ],
  'c2-minimax-01-licence-no-improve': [
    'No use to improve other large language models',
    'minimax-01-licence-no-improve',
  ],
  'c2-minimax-m3-licence-commercial': [
    'Commercial use: attribution, and authorisation above 20 million US dollars in yearly revenue',
    'minimax-m3-licence-commercial',
  ],
  'c2-minimax-prospectus-abab1': [
    'Earliest business milestone: abab1 launched in April 2022',
    'minimax-prospectus-abab1',
  ],
  'c2-minimax-prospectus-moderation': [
    'Real-time content moderation system',
    'minimax-prospectus-moderation',
  ],
  'c2-minimax-prospectus-safety-assessment': [
    'Regular model safety assessment and improvement mechanism',
    'minimax-prospectus-safety-assessment',
  ],
  'c2-moonshot-k2-licence': [
    'Code and weights under a “Modified MIT License”',
    'kimi-k2-licence-terms',
  ],
  'c2-moonshot-k2-licence-display': [
    'Display “Kimi K2” above 100 million monthly active users or 20 million US dollars in monthly revenue',
    'kimi-k2-licence-display',
  ],
  'c2-moonshot-k2-report-redteam': [
    'Red-teaming evaluations against other open-source models',
    'kimi-k2-report-redteam',
  ],
  'c2-moonshot-k3-licence': [
    '“Kimi K3 License” covers weights, configuration files and code',
    'kimi-k3-licence-scope',
  ],
  'c2-moonshot-k3-licence-maas': [
    'Separate agreement for Model-as-a-Service revenue above 20 million US dollars',
    'kimi-k3-licence-maas',
  ],
  'fl-eu-cop-draft1-light-detail': [
    'A first draft, light in detail',
    'cop-draft1-light-detail',
  ],
  'fl-eu-opinion-drafting-process': [
    'The drafting process of the Code',
    'opinion-drafting-process',
  ],
  'fl-eu-opinion-no-kpis': [
    'No key performance indicators in the Code',
    'opinion-no-kpis',
  ],
  'fl-uk-aisi-focus': [
    'Focus of the renamed AI Security Institute',
    'uk-aisi-rename-focus',
  ],
  'fl-uk-aisi-launch-chair-statement': [
    'The United Kingdom has launched the AI Safety Institute',
    'bletchley-chair-aisi-launch',
  ],
};
// Exact expressions of the licences, prospectus and report, which their
// source records had not linked to the document.
const expressionOf = {
  'c2-src-minimax-01-license': 'minimax-model-licence-2025',
  'c2-src-minimax-m3-license': 'minimax-community-licence-m3',
  'lg-src-cn-minimax-prospectus': 'minimax-prospectus-2025',
  'c2-src-kimi-k2-license': 'kimi-k2-licence',
  'c2-src-kimi-k2-pdf-v1': 'kimi-k2-report',
  'c2-src-kimi-k3-license': 'kimi-k3-licence',
};
for (const [sid, doc] of Object.entries(expressionOf))
  change('sources', sid, (r) => {
    if (r.documentId && r.documentId !== doc)
      throw new Error(`${sid} names ${r.documentId}`);
    r.documentId = doc;
  });
for (const [id, [label, key]] of Object.entries(C9))
  change('claims', id, (r) => {
    if (r.predicate !== 'published' || r.object.kind !== 'entity')
      throw new Error(`${id} is not a publication record`);
    const doc = r.object.entityId;
    r.subject = doc;
    r.predicate = 'states_provision';
    r.object = { kind: 'literal', value: label };
    r.attributes = {
      ...(r.attributes ?? {}),
      provision: { kind: 'statement', key },
    };
    if (r.time.kind === 'snapshot')
      r.time = {
        kind: 'event',
        date: r.time.date,
        basis: 'revision',
        note: r.time.note,
      };
    else if (r.time.basis === 'announcement')
      r.time = {
        ...r.time,
        basis: 'publication',
        note: r.time.note.replace(
          'Date of the announcement, as the source gives it.',
          'Date of publication of the release, as the source gives it.',
        ),
      };
    r.qualification = appendSentence(
      r.qualification,
      'Recorded until 2026-10-29 as a publication record of the publisher; since then, as what the document states (schema 2.20).',
    );
  });
note(
  'C9',
  `${Object.keys(C9).length} records that recorded what a document states as its publication (\`published\`, publisher → document) are now \`states_provision\` records on the document, kind \`statement\`, keeping their IDs: ${Object.keys(
    C9,
  )
    .map((i) => '`' + i + '`')
    .join(
      ', ',
    )}. Six source records now name the document they are the exact expression of. Two records dated by a GOV.UK publication now carry basis publication, not announcement, and the Kimi K3 licence records, dated by the commit that dates the licence file, basis revision.`,
);

// ---------------------------------------------------------------------------
// C10. One entity per chamber where a record dates a chamber's vote.
const chambers = [
  {
    id: 'california-state-senate',
    name: 'California State Senate',
    shortName: 'California Senate',
    description:
      'The upper chamber of the California State Legislature. Recorded where a record dates a vote of the Senate.',
    sourceIds: [
      'source-ca-sb1047-author-senate-2024',
      'source-ca-sb1047-author-final-2024',
    ],
    claims: [
      'fl-us-ca-sb1047-passed-senate',
      'fl-us-ca-sb1047-senate-final-vote',
    ],
  },
  {
    id: 'california-state-assembly',
    name: 'California State Assembly',
    shortName: 'California Assembly',
    description:
      'The lower chamber of the California State Legislature. Recorded where a record dates a vote of the Assembly.',
    sourceIds: ['source-ca-sb1047-author-assembly-2024'],
    claims: ['fl-us-ca-sb1047-passed-assembly'],
  },
  {
    id: 'new-york-state-senate',
    name: 'New York State Senate',
    shortName: 'New York Senate',
    description:
      'The upper chamber of the New York State Legislature. Recorded where a record dates a vote of the Senate.',
    sourceIds: ['source-ny-s6953-assembly-record'],
    claims: ['fl-us-ny-s6953b-passed-senate'],
  },
  {
    id: 'new-york-state-assembly',
    name: 'New York State Assembly',
    shortName: 'New York Assembly',
    description:
      'The lower chamber of the New York State Legislature. Recorded where a record dates a vote of the Assembly.',
    sourceIds: ['source-ny-s6953-assembly-record'],
    claims: ['fl-us-ny-s6953b-passed-assembly'],
  },
];
let lastChamber = 'michigan-house-of-representatives';
for (const ch of chambers) {
  add(
    'entities',
    {
      id: ch.id,
      name: ch.name,
      shortName: ch.shortName,
      type: 'public_body',
      subtype: 'Legislative chamber',
      aliases: [],
      description: ch.description,
      sourceIds: ch.sourceIds,
    },
    lastChamber,
  );
  lastChamber = ch.id;
  for (const cid of ch.claims)
    change('claims', cid, (r) => {
      if (
        !['california-legislature', 'new-york-state-legislature'].includes(
          r.subject,
        )
      )
        throw new Error(`${cid}: unexpected subject ${r.subject}`);
      r.subject = ch.id;
    });
}
note(
  'C10',
  'Four chamber entities (`california-state-senate`, `california-state-assembly`, `new-york-state-senate`, `new-york-state-assembly`) are the subjects of the five vote records; the legislature entities stay for enactment-level records.',
);

// ---------------------------------------------------------------------------
// C1 and C2. Closed subtype lists; qualifications move to descriptions.
const subtypeChanges = [];
function retype(e, to) {
  if (!to) throw new Error(`No subtype for ${e.id} (“${e.subtype}”)`);
  if (to === e.subtype) return;
  const from = e.subtype;
  change('entities', e.id, (r) => {
    r.subtype = to;
    const q = QUALIFICATIONS[from];
    if (q) r.description = appendSentence(r.description, q);
  });
  subtypeChanges.push({ id: e.id, type: e.type, from, to });
}
for (const e of data.entities) {
  if (e.type === 'organisation')
    retype(e, ORGANISATION_BY_ID[e.id] ?? organisationMap[e.subtype]);
  else if (e.type === 'public_body')
    retype(
      e,
      e.id.startsWith('country-')
        ? e.subtype
        : (publicBodyMap[e.subtype] ??
            (e.subtype === 'Legislative chamber' ? e.subtype : undefined)),
    );
  else if (e.type === 'document')
    retype(e, DOCUMENT_BY_ID[e.id] ?? documentMap[e.subtype]);
}
// Persons: one neutral subtype, chosen from the person's own recorded roles.
const rolesOf = new Map();
for (const c of data.claims) {
  const r = c.attributes?.role;
  if (!rolesOf.has(c.subject))
    rolesOf.set(c.subject, { roles: [], predicates: new Set() });
  const entry = rolesOf.get(c.subject);
  entry.predicates.add(c.predicate);
  if (r && ['held_role', 'departure_announced'].includes(c.predicate))
    entry.roles.push(r);
}
const EXECUTIVE =
  /\b(ceo|chief executive|president|chief [a-z ]*officer|cto|coo|cfo|vice president|vp|executive|general manager|managing director|chair(man|woman)? of (the )?(board|google deepmind)|head of (?!research)|leads? meta|leader of the (product|group)|director of ai|director, scale)/i;
const BOARD = /\b(board|trustee|director)\b/i;
const RESEARCH =
  /\b(research|scientist|engineer|professor|intern|author|technical staff|launch[- ]team member|founding member|team member|interpretability|alignment|optimization|preparedness|safety)\b/i;
const PUBLIC =
  /\b(senator|governor|minister|secretary of|commissioner|member of parliament|congress)/i;
const PERSON_BY_ID = {
  // Persons whose recorded roles name no title the rules above read, decided
  // from the roles and descriptions the records give (co-founders, heads of
  // departments, trustees, founding members of a research organisation).
  'elon-musk': 'Executive',
  'charles-kantor': 'Executive',
  'eiso-kant': 'Executive',
  'eric-steinberger': 'Executive',
  'huang-huiwen': 'Executive',
  'ivan-zhang': 'Executive',
  'jia-lei': 'Executive',
  'jony-ive': 'Executive',
  'josh-albrecht': 'Executive',
  'kanjun-qiu': 'Executive',
  'ma-jie': 'Executive',
  'sebastian-de-ro': 'Executive',
  'shen-pengfei': 'Executive',
  'sun-tianxiang': 'Executive',
  'wu-tian': 'Executive',
  'zhu-wenjia': 'Executive',
  'xu-bin': 'Executive',
  'yin-qi': 'Executive',
  'mustafa-suleyman': 'Executive',
  'jason-warner': 'Executive',
  'nat-friedman': 'Executive',
  // Researchers whose later leadership titles the rules above would read first.
  'miles-brundage': 'Researcher',
  'jan-leike': 'Researcher',
  'john-schulman': 'Researcher',
  'wojciech-zaremba': 'Researcher',
  'andrej-karpathy': 'Researcher',
  'andrew-tulloch': 'Researcher',
  'chelsea-finn': 'Researcher',
  'dan-hendrycks': 'Researcher',
  'daniel-kokotajlo': 'Researcher',
  'ekin-dogus-cubuk': 'Researcher',
  'julien-perolat': 'Researcher',
  'karl-tuyls': 'Researcher',
  'laurent-sifre': 'Researcher',
  'luke-metz': 'Researcher',
  'oriol-vinyals': 'Researcher',
  'pamela-vagata': 'Researcher',
  'trevor-blackwell': 'Researcher',
  'vicki-cheung': 'Researcher',
  'quoc-le': 'Researcher',
  'sanjay-ghemawat': 'Researcher',
  'jiao-binxing': 'Researcher',
  'neil-buddy-shah': 'Board member',
  'paul-nakasone': 'Board member',
  'shivon-zilis': 'Board member',
};
const personRows = [];
for (const e of data.entities) {
  if (e.type !== 'person') continue;
  let to;
  const { roles = [], predicates = new Set() } = rolesOf.get(e.id) ?? {};
  const s = e.subtype;
  if (PERSON_BY_ID[e.id]) to = PERSON_BY_ID[e.id];
  else if (s === 'Author') to = 'Writer';
  else if (
    [
      'Researcher',
      'Research engineer',
      'Engineer',
      'Evaluation researcher',
      'Policy researcher',
      'Philosopher',
      'Author and researcher',
      'Researcher and co-founder',
      'Researcher and company founder',
    ].includes(s)
  )
    to = 'Researcher';
  else if (
    [
      'Executive',
      'Company leader',
      'Researcher and executive',
      'Research and product executive',
    ].includes(s)
  )
    to = 'Executive';
  else if (s === 'Board member') to = 'Board member';
  else if (
    ['Institutional actor', 'Researcher / institutional actor'].includes(s)
  ) {
    if (roles.some((r) => EXECUTIVE.test(r))) to = 'Executive';
    else if (
      roles.length &&
      roles.every((r) => BOARD.test(r) && !RESEARCH.test(r))
    )
      to = 'Board member';
    else if (roles.some((r) => PUBLIC.test(r))) to = 'Public official';
    else if (roles.some((r) => RESEARCH.test(r)) || predicates.has('authored'))
      to = 'Researcher';
    else if (s === 'Researcher / institutional actor') to = 'Researcher';
  }
  if (!PERSON.includes(to)) {
    personRows.push({
      id: e.id,
      s,
      roles,
      predicates: [...predicates],
      description: e.description,
    });
    continue;
  }
  retype(e, to);
}
if (personRows.length) {
  console.error(JSON.stringify(personRows, null, 1));
  throw new Error(`${personRows.length} persons without a subtype`);
}
// A qualification in a name moves to the description, which already says it.
change('entities', 'european-parliament-and-council', (r) => {
  r.name = replaceIn(r.name, ' (as legislators)', '');
});
note(
  'C2',
  `${subtypeChanges.length} entity subtypes normalised to the closed lists recorded in docs/ontology.md (organisations ${subtypeChanges.filter((c) => c.type === 'organisation').length}, public bodies ${subtypeChanges.filter((c) => c.type === 'public_body').length}, documents ${subtypeChanges.filter((c) => c.type === 'document').length}, persons ${subtypeChanges.filter((c) => c.type === 'person').length}); qualifications that subtypes carried moved to descriptions.`,
);

// ---------------------------------------------------------------------------
// C11. Publisher links where the printed publisher is the institution whose
// expression it is and the name identifies one entity (for "OpenAI", the
// openai entity unless the source is a legal filing). Hosting platforms are
// never linked.
const HOSTS = new Set(['x-company']);
const fold = (s) =>
  s
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/\([^)]*\)/g, ' ')
    .replace(/&/g, ' and ')
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .replace(
      /\b(the|inc|llc|l l c|ltd|lp|l p|pbc|co|corp|corporation|company|group|holdings)\b/g,
      ' ',
    )
    .replace(/\s+/g, ' ')
    .trim();
const institutionByName = new Map();
for (const e of data.entities)
  if (['organisation', 'public_body'].includes(e.type))
    for (const n of [
      e.name,
      e.shortName,
      ...e.aliases,
      ...(e.datedNames ?? []).map((d) => d.name),
    ].filter(Boolean)) {
      const k = fold(n);
      institutionByName.set(
        k,
        (institutionByName.get(k) ?? new Set()).add(e.id),
      );
    }
const linkRows = [];
const unlinkable = [];
for (const s of data.sources) {
  if (s.publisherId) continue;
  const ids = institutionByName.get(fold(s.publisher));
  if (!ids) continue;
  let id;
  if (ids.size === 1) id = [...ids][0];
  else if (ids.has('openai') && fold(s.publisher) === 'openai') id = 'openai';
  if (!id || HOSTS.has(id)) {
    unlinkable.push({ id: s.id, publisher: s.publisher, ids: [...ids] });
    continue;
  }
  // A legal filing names its filer, not the brand.
  if (
    id === 'openai' &&
    /filing|certificate|form 990|court/i.test(`${s.kind} ${s.title}`)
  ) {
    unlinkable.push({
      id: s.id,
      publisher: s.publisher,
      ids: [...ids],
      why: 'legal filing',
    });
    continue;
  }
  change('sources', s.id, (r) => (r.publisherId = id));
  linkRows.push({ id: s.id, publisher: s.publisher, publisherId: id });
}
note(
  'C11',
  `${linkRows.length} sources gain a publisher link where the printed publisher names one institution whose expression it is; ${unlinkable.length} printed publishers that match a dataset entity stay unlinked (a hosting platform, X, or a legal filing).`,
);

// ---------------------------------------------------------------------------
// A6. One printed form per linked publisher; the hosting route in version.
const PRINTED = {
  anthropic: 'Anthropic',
  'california-legislature': 'California State Legislature',
  'governor-of-california': 'Office of the Governor of California',
  'us-white-house': 'The White House',
  dsit: 'Department for Science, Innovation and Technology',
  'european-commission': 'European Commission',
  'new-york-state-legislature': 'New York State Legislature',
  oecd: 'OECD',
  'uk-prime-ministers-office': "Prime Minister's Office, 10 Downing Street",
  'us-bureau-of-industry-and-security':
    'Bureau of Industry and Security, U.S. Department of Commerce',
  'us-ai-safety-institute': 'National Institute of Standards and Technology',
  // Publishers linked by C11 below whose sources print them several ways.
  google: 'Google',
  baidu: 'Baidu',
  minimax: 'MiniMax',
  tc260: '全国网络安全标准化技术委员会',
  windsurf: 'Windsurf',
  xai: 'xAI',
  meta: 'Meta',
};
// A printed form that is one of the publisher's dated names stays: it is the
// name the publisher bore when the expression appeared.
const datedName = (id, name) =>
  find('entities', id).datedNames?.some((n) => n.name === name);
const publisherRows = [];
for (const s of data.sources) {
  const printed = PRINTED[s.publisherId];
  if (
    !printed ||
    s.publisher === printed ||
    datedName(s.publisherId, s.publisher)
  )
    continue;
  change('sources', s.id, (r) => {
    publisherRows.push({ id: r.id, from: r.publisher, to: printed });
    r.version = `${sentence(r.version)} Publisher as printed on the inspected expression: ${r.publisher}.`;
    r.publisher = printed;
  });
}
note(
  'A6',
  `${publisherRows.length} sources linked to the eleven publishers, or to seven publishers linked by C11 whose sources printed them several ways, now print one form of the publisher's name; the form printed on the expression, with its hosting route, moved to the version note. A printed form that is one of the publisher's dated names (Facebook, for Meta) stays.`,
);

// ---------------------------------------------------------------------------
// A5. Identical statements name what separates them: the records of the
// audit's identical-statement groups.
const identical = new Set(
  JSON.parse(
    readFileSync(join(ROOT, 'review/dataset-audit-2026-10-29.json'), 'utf8'),
  )
    .findings.filter((f) => f.code === 'identical-statement')
    .flatMap((f) => f.ids),
);
const docOf = (id) => find('entities', id);
for (const c of data.claims) {
  if (!identical.has(c.id) || c.predicate !== 'authored') continue;
  const doc = docOf(c.object.entityId);
  const id = doc.id;
  let to;
  if (
    /^(extropians|sl4)-/.test(id) &&
    /^The mailing-list message “/.test(c.statement)
  ) {
    const n = doc.shortName?.match(/\((\d+)\)$/)?.[1];
    to = c.statement.replace(
      /^The mailing-list message “(.*)” \((\d{4}-\d\d-\d\d)\) is (sent|signed)/,
      (_, title, date, verb) =>
        `The ${id.startsWith('sl4') ? 'SL4' : 'Extropians'} message “${title}” of ${date}${n ? `, archive message ${n},` : ''} is ${verb}`,
    );
  } else if (
    [
      'agrawal-gans-goldfarb-2019-ambiguous-labor-market-impact',
      'agrawal-gans-goldfarb-2019-ambiguous-labor-market-impact-jep',
      'acemoglu-restrepo-2019-automation-and-new-tasks',
      'acemoglu-restrepo-2019-automation-and-new-tasks-jep',
    ].includes(id)
  ) {
    to = `The ${id.endsWith('-jep') ? 'Journal of Economic Perspectives article' : 'NBER working paper'} ${c.statement}`;
  } else if (
    id === 'trammell-korinek-2023-growth-under-transformative-ai-nber'
  ) {
    to = `The October 2023 NBER working paper ${c.statement}`;
  } else if (
    id === 'trammell-korinek-2026-growth-under-transformative-ai-nber-revision'
  ) {
    to = `The April 2026 revision of the NBER working paper ${c.statement}`;
  }
  if (to && to !== c.statement)
    change('claims', c.id, (r) => (r.statement = to));
}
const A5 = {
  'lg-gs-candela-openai-preparedness-2024': [
    '',
    ' This record is Joaquin Quiñonero Candela’s part of that statement.',
  ],
  'lg-gs-weng-openai-preparedness-2024': [
    '',
    ' This record is Lilian Weng’s part of that statement.',
  ],
  'lg-gw-cubuk-cofounded-periodic-labs': [
    '',
    ' This record is Ekin Dogus Cubuk’s co-founding.',
  ],
  'lg-gw-fedus-cofounded-periodic-labs': [
    '',
    ' This record is Liam Fedus’s co-founding.',
  ],
};
for (const [id, [, tail]] of Object.entries(A5))
  change(
    'claims',
    id,
    (r) => (r.statement = appendSentence(r.statement, tail.trim())),
  );
for (const c of data.claims) {
  const m = c.statement.match(
    /^Frontier Governance Framework \((February 202[56])\) states/,
  );
  if (identical.has(c.id) && m)
    change('claims', c.id, (r) => {
      r.statement = r.statement.replace(
        m[0],
        `The ${m[1]} edition of the Frontier Governance Framework states`,
      );
    });
}
const PROPOSITION_GROUPS = [
  [
    'ts-a1-bostrom-1996-09-04',
    'ts-a3-bostrom-1996-09-04',
    'ts-a5-bostrom-1996-09-04',
  ],
  [
    'ts-a1-drexler-1995-context',
    'ts-a3-drexler-1995-context',
    'ts-a5-drexler-1995-context',
    'ts-a6-drexler-1995-context',
  ],
  ['ts-a1-more-1998-contests', 'ts-a4-more-1998-contests'],
  ['ts-a2-catai', 'ts-a3-catai'],
  ['ts-a4-hanson-1996-09-03-contests', 'ts-a6-hanson-1996-09-03-contests'],
  ['ts-b1-christiano-2022-contests', 'ts-b2-christiano-2022-contests'],
  ['ts-b1-corrigibility', 'ts-b2-corrigibility'],
  ['ts-b2-crocker-1996-12-31-contests', 'ts-b5-crocker-1996-12-31-contests'],
];
const stance = {
  articulates_proposition: 'Recorded as articulating',
  contests_proposition: 'Recorded as contesting',
  bears_on_proposition: 'Recorded as bearing on',
};
for (const id of PROPOSITION_GROUPS.flat())
  change('claims', id, (r) => {
    const p = find('entities', r.object.entityId);
    r.statement = appendSentence(
      r.statement,
      `${stance[r.predicate]} the proposition “${p.name}”.`,
    );
  });
note(
  'A5',
  'Statements that read alike now name what separates them: the message and its archive number, the working paper or the journal article, the 2023 version or the 2026 revision, the framework edition, the person whose part of a shared report the record is, or the proposition a passage is recorded against. No proposition changed.',
);

// ---------------------------------------------------------------------------
// B6 and C5. The working papers and journal articles stay separate works.
for (const [id, wp] of [
  [
    'acemoglu-restrepo-2019-automation-and-new-tasks-jep',
    'NBER Working Paper 25684',
  ],
  [
    'agrawal-gans-goldfarb-2019-ambiguous-labor-market-impact-jep',
    'NBER Working Paper 25619',
  ],
])
  change('entities', id, (r) => {
    r.description = appendSentence(
      r.description,
      `The journal version of ${wp}, recorded as a separate work: only the journal's abstract page was retrieved, so the two texts' wording has not been compared in full.`,
    );
  });
note(
  'B6',
  'No merge of the two working-paper and journal-article pairs: only the journals’ abstract pages could be retrieved (re-tried 2026-10-29). The journal records’ descriptions now say that they are the journal versions of the working papers and why they stay separate.',
);

// ---------------------------------------------------------------------------
// Metadata, snapshot and removal reasons.
for (const n of names)
  for (const id of added[n]) before[n] = before[n].filter((r) => r.id !== id);
const baseCommit = BASE;
const order = Object.fromEntries(
  names.map((n) => [n, removed[n].length ? priorOrder[n] : null]),
);
writeJson(SNAPSHOT, {
  description: `Records as stored at ${baseCommit} (schema 2.19, release v0.11.0) before the audit fixes of ${RECORDED} (review/audit-fixes-2026-10-29.md): the earlier metadata, the IDs the fixes added, the rows they changed and the rows they removed, as they were, and the earlier row order. The test-only historical view restores them.`,
  baseCommit,
  meta: priorMeta,
  added,
  before,
  removed,
  order,
  sha256: priorSha,
});
data.meta.schemaVersion = '2.20';
data.meta.updatedAt = RECORDED;
data.meta.scope += ` On ${RECORDED}, by the maintainer’s decisions of that day on a whole-dataset consistency audit, records were corrected without changing what any proposition states: entity subtypes follow closed lists, two renamings are recorded as dated names on one entity, legislative votes name their chamber, seven duplicate source records were merged, two paper publications are dated by the paper’s first public expression, and publisher names and links were made consistent. Schema 2.20 records what a document with an exact expression states, such as a licence term or a prospectus statement, as a statement of that document rather than as its publication. All records remain seeds.`;
for (const n of ['meta', ...names]) writeJson(`data/${n}.json`, data[n]);
const removalsPath = 'release/removals.json';
const removals = JSON.parse(readFileSync(join(ROOT, removalsPath), 'utf8'));
for (const n of names)
  if (Object.keys(removalReasons[n]).length)
    removals[n] = { ...(removals[n] ?? {}), ...removalReasons[n] };
writeJson(removalsPath, removals);
writeJson('.local/audit-fixes-2026-10-29.json', {
  log,
  subtypeChanges,
  publisherRows,
  linkRows,
  unlinkable,
});
console.log(
  `Added ${names.map((n) => `${added[n].length} ${n}`).join(', ')}; changed ${names.map((n) => `${before[n].length} ${n}`).join(', ')}; removed ${names.map((n) => `${removed[n].length} ${n}`).join(', ')}.`,
);
