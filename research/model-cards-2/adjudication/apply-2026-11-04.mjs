// Applies the adjudication of the cross-family check (Codex, 2026-11-04;
// research/model-cards-2/cross-family-check-2026-11-04.md and .json) to the drafts. Every
// change asserts that it changes something, so the script runs once:
//   node research/model-cards-2/adjudication/apply-2026-11-04.mjs
// then tools.mjs merge, verify and render. The log goes to adjudication/applied-2026-11-04.json.
// Rule: the preparing family may not overrule the checker on a cell; it applies the checker's
// status or holds the cell with both readings. Both material items (4, 28) are applied with
// the checker's status, which the preparer accepts on rereading; nothing is held.
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIR = join(dirname(fileURLToPath(import.meta.url)), '..');
const DRAFTS = join(DIR, 'drafts');
const files = readdirSync(DRAFTS)
  .filter((f) => f.endsWith('.json'))
  .sort()
  .map((f) => ({ f, d: JSON.parse(readFileSync(join(DRAFTS, f), 'utf8')) }));
const log = [];
const CHECK = 'cross-family check of 2026-11-04';

const cell = (card, q) => {
  const hits = files.flatMap(({ d }) =>
    (d.cells ?? []).filter((c) => c.card === card && c.question === q),
  );
  if (hits.length !== 1) throw new Error(`${card}:${q}: ${hits.length} found`);
  return hits[0];
};
const one = (list, test, label) => {
  const hits = list.filter(test);
  if (hits.length !== 1) throw new Error(`${label}: ${hits.length} found`);
  return hits[0];
};
const card = (id) =>
  one(
    files.flatMap(({ d }) => d.cards ?? []),
    (c) => c.id === id,
    `card ${id}`,
  );
const source = (key) =>
  one(
    files.flatMap(({ d }) => (Array.isArray(d) ? d : [])),
    (s) => s.key === key,
    `source ${key}`,
  );
const label = (x) => x.key ?? x.id ?? `${x.card}:${x.question}`;
const put = (x, field, value, item) => {
  if (JSON.stringify(x[field]) === JSON.stringify(value))
    throw new Error(`no change: ${label(x)}.${field}`);
  log.push({ id: label(x), field, from: x[field] ?? null, to: value, item });
  x[field] = value;
};
const swap = (x, field, a, b, item) => {
  if (!String(x[field] ?? '').includes(a))
    throw new Error(`not found in ${label(x)}.${field}: ${a.slice(0, 60)}`);
  put(x, field, x[field].replace(a, b), item);
};

// ---------- Material items: the checker's status, accepted on rereading ----------

// Item 4: Claude 3 Q11, not found -> partly.
let c = cell('anthropic-claude-3', 'Q11');
put(c, 'status', 'partly', '4');
put(
  c,
  'passages',
  [
    {
      source: 'anthropic-claude-3',
      locator:
        "Section 6.2.1 'Autonomous Replication and Adaption (ARA) evaluations', PDF p. 24",
      quote:
        'These tasks are selected to indicate whether the model can make meaningful progress towards accumulating resources, exploiting software security vulnerabilities, deceiving humans, and surviving autonomously in the absence of human intervention to stop the model.',
    },
    {
      source: 'anthropic-claude-3',
      locator:
        "Section 6.2.1 'Autonomous Replication and Adaption (ARA) evaluations', PDF p. 24",
      quote:
        'Our pre-specified warning indicator for ASL-3 was the model passing 50% or more of the tasks (described below) with at least a 10% pass rate (i.e., succeeding at one in ten attempts) – the model did not cross this threshold.',
    },
  ],
  '4',
);
put(
  c,
  'note',
  'The ARA evaluations are described as indicating, among other capabilities, whether the model can make progress at deceiving humans, and the card gives one combined conclusion for them: the ASL-3 warning indicator was not crossed. It gives no conclusion on deception separately, and reports no evaluation of the model’s own propensity for deception, scheming or sabotage. The same evaluations are recorded under Q09. Task contents are not recorded (hazard rule).',
  '4',
);
put(
  c,
  'search',
  {
    ...c.search,
    setAside: c.search.setAside.filter(
      (a) => !a.locator.startsWith('Section 6.2.1'),
    ),
  },
  '4',
);
put(
  c,
  'crossFamily',
  {
    item: '4',
    result:
      'material disagreement, applied: the checker reads partly (blind), because Q11 includes capability for deception and the ARA scope includes deceiving humans, with a combined conclusion. The pack had read not found, setting the passage aside as a Q09 evaluation; the criterion makes no such exclusion. The preparer accepts the checker’s reading.',
  },
  '4',
);

// Item 28: Muse Spark Q10, partly -> stated.
c = cell('meta-muse-spark', 'Q10');
put(c, 'status', 'stated', '28');
put(
  c,
  'passages',
  [
    ...c.passages,
    {
      source: 'meta-muse-spark-arxiv',
      locator: "Section 2.2.2.3 'Social Engineering Capabilities', PDF p. 48",
      quote:
        'we do not find the capabilities of the model (without system level guardrails) to be sufficiently high to trigger a determination of high risk according to our Advanced AI Scaling Framework',
    },
  ],
  '28',
);
put(
  c,
  'note',
  'The report states a multi-turn social-engineering capability evaluation (an attacker model trying to convince a simulated victim), with composite scores against open models (Figure 20), as part of the cyber domain, and concludes that the capability is not high enough to trigger a high-risk determination under its framework. The victims are simulated: no result with human subjects is reported. Methods are not recorded (hazard rule).',
  '28',
);
put(
  c,
  'crossFamily',
  {
    item: '28',
    result:
      'material disagreement, applied: the checker reads stated (blind), because section 2.2.2.3 gives a conclusion for the social-engineering evaluation (PDF p. 48), and Q10 asks for a conclusion, not a risk category specific to persuasion. The pack had read partly. The preparer accepts the checker’s reading, keeping the simulated-victim and cyber-domain limits.',
  },
  '28',
);

// ---------- Minor items ----------

// Item 31: GPT-4o Q03, the reference quotation was transcribed from an interleaved text layer.
c = cell('openai-gpt-4o', 'Q03');
const ref = one(
  c.passages,
  (p) => p.locator.startsWith('References, [4]'),
  'GPT-4o Q03 reference',
);
put(ref, 'quote', 'OpenAI, “Openai preparedness framework beta,” 2023.', '31');
put(
  c,
  'crossFamily',
  {
    item: '31',
    result:
      'minor, applied: the reference quotation is repaired. The default PDF text layer interleaves the address with the title; the printed reference reads as now quoted (checked by the checker visually, and here against pdftotext’s raw reading order). Identification as the 2023 beta is unchanged.',
  },
  '31',
);

// Item 48: Gemini 2.0 Flash Q16, the automated-only limit applies to one table.
c = cell('google-deepmind-gemini-2-0-flash', 'Q16');
put(
  c,
  'note',
  'The card states that the results in its training and development evaluation table are automated evaluations, not human evaluation or red-teaming, given relative to Gemini 1.5 Pro 002. The limit is stated for that table; it does not describe the card’s other safety findings or its stated human red-teaming.',
  '48',
);
put(
  c,
  'crossFamily',
  {
    item: '48',
    result:
      'minor, applied: the note now limits the automated-only statement to the training and development results table.',
  },
  '48',
);

// Item 58: Muse Spark Q12, the scope of the human red team.
c = cell('meta-muse-spark', 'Q12');
put(
  c,
  'passages',
  [
    ...c.passages,
    {
      source: 'meta-muse-spark-arxiv',
      locator: "Section 3.1.3.2 'Human Red Teaming', PDF p. 82",
      quote:
        'HandshakeAI prioritized four categories: (1) sex-related crimes, (2) violent crimes, (3) non-violent crimes, and (4) self-harm and suicide.',
    },
    {
      source: 'meta-muse-spark-arxiv',
      locator: "Section 3.1.3.2 'Human Red Teaming', PDF p. 82",
      quote:
        'HandshakeAI reported approximately 149 hours of red-teaming effort',
    },
  ],
  '58',
);
put(
  c,
  'note',
  'The report states third-party human red teaming of jailbreak robustness with pre-release access, with its scope: four prioritised content-policy categories and approximately 149 hours of effort (hours of effort, not a testing period). It also reports large-scale automated red teaming (Section 3.1). No number of testers is given in the passage read. The “32” after HandshakeAI in the first quotation is a footnote marker.',
  '58',
);
put(
  c,
  'crossFamily',
  {
    item: '58',
    result:
      'minor, applied: the scope given in the same paragraph (four prioritised categories, about 149 hours of effort) is added.',
  },
  '58',
);

// ---------- Part D: Meta's copies of the Muse Spark report ----------
c = cell('meta-muse-spark', 'Q01');
put(
  c,
  'note',
  `${c.note} Meta’s own copies were retrieved in the ${CHECK} (not here: ai.meta.com answered HTTP 400 and web.archive.org refused connections): an Internet Archive capture of 2026-04-14 holds an earlier 158-page expression that prints April 14, 2026, and the live copy prints May 26, 2026. Under 3a the row is dated by that earliest located copy, 2026-04-14; the arXiv copy read here is a later expression. The arXiv stamp of 14 May is the submission date, corroborated by the repository history.`,
  'Part D',
);
const muse = card('meta-muse-spark');
swap(
  muse,
  'frameworkEditionNote',
  "Meta's own address for the report answered HTTP 400 here and is on the retrieval list.",
  `Meta's own address for the report answered HTTP 400 here; the ${CHECK} retrieved Meta's copies (an earlier 158-page expression in a capture of 2026-04-14, and the live copy printing May 26, 2026), which differ from the arXiv copy in bytes and text (see Q01).`,
  'Part D',
);

// ---------- Part C: archive captures of the eight cards (actually retrieved by the checker) ----------
const W = 'https://web.archive.org/web/';
const captures = {
  'anthropic-claude-3': [
    `${W}20240304141611id_/https://www-cdn.anthropic.com/de8ba9b01c9ab7cbabf5c33b80b7bbc618857627/Model_Card_Claude_3.pdf`,
    'Capture of 2024-03-04 at the original address, retrieved in the cross-family check of 2026-11-04: the original 42-page expression. The copy read here is the revision of 2024-10-22, which appends the two addenda (decision 7).',
  ],
  'anthropic-claude-3-5-sonnet': [
    `${W}20240620192452id_/https://www-cdn.anthropic.com/fed9cc193a14b84131812372d8d5857f8f304c52/Model_Card_Claude_3_Addendum.pdf`,
    'Capture of 2024-06-20, retrieved in the cross-family check of 2026-11-04: the same bytes as the copy read here.',
  ],
  'gdm-gemini-2-0-flash': [
    `${W}20260320233550id_/https://storage.googleapis.com/deepmind-media/Model-Cards/Gemini-2-0-Flash-Model-Card.pdf`,
    'Capture of 2026-03-20, retrieved in the cross-family check of 2026-11-04: the same bytes as the copy read here. No capture within 31 days of the printed April 2025 date was returned; this does not show that none exists.',
  ],
  'gdm-gemini-2-0-flash-lite': [
    `${W}20260321020414id_/https://storage.googleapis.com/deepmind-media/Model-Cards/Gemini-2-0-Flash-Lite-Model-Card.pdf`,
    'Capture of 2026-03-21, retrieved in the cross-family check of 2026-11-04: the same bytes as the copy read here. No capture within 31 days of the printed April 2025 date was returned; this does not show that none exists.',
  ],
  'meta-code-world-model': [
    `${W}20250925125509id_/https://github.com/facebookresearch/cwm/blob/main/MODEL_CARD.md`,
    'Capture of 2025-09-25 of the rendered GitHub page, retrieved in the cross-family check of 2026-11-04; the copy read here is the pinned raw file.',
  ],
  'meta-muse-spark-arxiv': [
    `${W}20260414233054id_/https://ai.meta.com/static-resource/muse-spark-safety-and-preparedness-report/`,
    'Capture of 2026-04-14 of Meta’s address, retrieved in the cross-family check of 2026-11-04: an earlier 158-page expression printing April 14, 2026. The arXiv copy read here is a later, distinct expression (see the Q01 note).',
  ],
  'openai-gpt-4o': [
    `${W}20240808204740id_/https://cdn.openai.com/gpt-4o-system-card.pdf`,
    'Capture of 2024-08-08, retrieved in the cross-family check of 2026-11-04: an earlier 32-page expression whose bytes differ from the current copy read here.',
  ],
  'xai-grok-4': [
    `${W}20250822000303id_/https://data.x.ai/2025-08-20-grok-4-model-card.pdf`,
    'Capture of 2025-08-22, retrieved in the cross-family check of 2026-11-04: its bytes differ from the copy read here.',
  ],
};
for (const [key, [capture, note]] of Object.entries(captures))
  put(source(key), 'archive', { capture, note }, 'Part C');

for (const { f, d } of files)
  writeFileSync(join(DRAFTS, f), JSON.stringify(d, null, 2) + '\n');
writeFileSync(
  join(DIR, 'adjudication', 'applied-2026-11-04.json'),
  JSON.stringify(
    {
      generated:
        'node research/model-cards-2/adjudication/apply-2026-11-04.mjs',
      check: 'research/model-cards-2/cross-family-check-2026-11-04.json',
      changes: log.length,
      log,
    },
    null,
    2,
  ) + '\n',
);
console.log(`applied ${log.length} changes`);
