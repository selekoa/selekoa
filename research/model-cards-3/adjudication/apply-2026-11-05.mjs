// Applies the adjudication of the cross-family check (Claude, 2026-11-05;
// research/model-cards-3/cross-family-check-2026-11-05.md and .json) with the maintainer
// decisions of 2026-11-05 ("pack 3: 6 cards, Grok a"). Every change asserts that it
// changes something, so the script runs once:
//   node research/model-cards-3/adjudication/apply-2026-11-05.mjs
// then tools.mjs merge, verify and render, and model-cards-2/population.mjs.
// The log goes to adjudication/applied-2026-11-05.json.
// Rule: the preparing family may not overrule the checker on a cell. The one material item
// (38, Grok 4.20 Q05) takes the checker's status by the maintainer's decision (a).
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIR = join(dirname(fileURLToPath(import.meta.url)), '..');
const ROOT = join(DIR, '..', '..');
const DRAFTS = join(DIR, 'drafts');
const files = readdirSync(DRAFTS)
  .filter((f) => f.endsWith('.json'))
  .sort()
  .map((f) => ({ f, d: JSON.parse(readFileSync(join(DRAFTS, f), 'utf8')) }));
const log = [];
const CHECK = 'cross-family check of 2026-11-05';
const DECIDED = 'maintainer decision of 2026-11-05';

const one = (list, test, what) => {
  const hits = list.filter(test);
  if (hits.length !== 1) throw new Error(`${what}: ${hits.length} found`);
  return hits[0];
};
const cell = (card, q) =>
  one(
    files.flatMap(({ d }) => d.cells ?? []),
    (c) => c.card === card && c.question === q,
    `${card}:${q}`,
  );
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
const inventoryCard = (title) =>
  one(
    files.flatMap(({ d }) => d.cards ?? []).filter((c) => 'selectionNote' in c),
    (c) => c.title === title,
    `inventory ${title}`,
  );
const label = (x) => x.key ?? x.id ?? x.title ?? `${x.card}:${x.question}`;
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
// Text files: each replacement must match exactly once.
const texts = new Map();
const editText = (rel, a, b, item) => {
  const p = join(ROOT, rel);
  const s = texts.get(p) ?? readFileSync(p, 'utf8');
  const n = s.split(a).length - 1;
  if (n !== 1) throw new Error(`${rel}: ${n} matches for ${a.slice(0, 60)}`);
  if (a === b) throw new Error(`no change: ${rel}`);
  texts.set(p, s.replace(a, b));
  log.push({ id: rel, field: 'text', from: a, to: b, item });
};
// A Markdown table row: replace within the one line that starts with `start`.
const editRow = (rel, start, a, b, item) => {
  const p = join(ROOT, rel);
  const s = texts.get(p) ?? readFileSync(p, 'utf8');
  const lines = s.split('\n');
  const row = one(lines, (l) => l.startsWith(start), `${rel} row ${start}`);
  if (!row.includes(a)) throw new Error(`${rel}: ${a} not in row ${start}`);
  editText(rel, row, row.replace(a, b), item);
};

// ---------- Material item 38: Grok 4.20 Q05, not found -> partly (decision a) ----------

let c = cell('xai-grok-4-20', 'Q05');
put(c, 'status', 'partly', '38');
put(
  c,
  'passages',
  [
    {
      source: 'xai-grok-4-20',
      quote:
        'We release Grok 4.20 with safeguards appropriate for its capability threshold, such as refusal training.',
      locator: '§1.3 Release process, PDF p. 2',
    },
  ],
  '38',
);
put(
  c,
  'note',
  'The card names its framework (§1) and refers to the model’s “capability threshold” without stating which threshold or outcome in the framework’s categories: a determination referred to without its outcome. The conclusions on cybersecurity and manipulation risk (§§4.2.2–4.3.2) are stated as risk views, not in the framework’s categories, and no chemical or biological outcome category is given.',
  '38',
);
put(
  c,
  'search',
  {
    ...c.search,
    setAside: c.search.setAside.filter((a) => a.locator !== '§1.3, PDF p. 2'),
  },
  '38',
);
put(
  c,
  'crossFamily',
  {
    item: '38',
    result:
      'material disagreement, decided: the checker read partly (blind), because §1.3 refers to the model’s capability threshold under the framework the card names without stating which, the criterion’s case of a determination made without stating its outcome. The pack had read not found. The maintainer decided for partly (decision a, 2026-11-05).',
  },
  '38',
);

// ---------- Minor item 44: Claude 4 Q02 note ----------

c = cell('anthropic-claude-4', 'Q02');
put(
  c,
  'note',
  'The card implies API access in a passage on a jailbreak prompting technique; it states no release form or release date. The cover’s “May 2025” is the card’s date (Q01), not a release date.',
  '44',
);
put(
  c,
  'crossFamily',
  {
    item: '44',
    result:
      'minor, applied: the passage concerns a prompting technique and implies API access only; the earlier note (“identifies consumer and API access forms”) overstated it.',
  },
  '44',
);

// ---------- Part C: Claude 4 date kind (a printed month, not an index month) ----------

swap(
  inventoryCard('System Card: Claude Opus 4 & Claude Sonnet 4'),
  'selectionNote',
  'earliest located 2025-05 (index month)',
  'earliest located 2025-05 (printed cover month, “May 2025”)',
  'Part C',
);
editRow(
  'research/model-cards-2/population.md',
  '| System Card: Claude Opus 4 & Claude Sonnet 4',
  '| index month ',
  '| printed cover month ("May 2025"; cross-family check of 2026-11-05) ',
  'Part C',
);
editText(
  'research/model-cards-2/population.mjs',
  `    'System Card: Claude Opus 4 & Claude Sonnet 4',
    '2025-05',
    'index month',`,
  `    'System Card: Claude Opus 4 & Claude Sonnet 4',
    '2025-05',
    'printed cover month ("May 2025"; cross-family check of 2026-11-05)',`,
  'Part C',
);
editRow(
  'review/model-cards-pack-3-2026-11-05.md',
  '| Anthropic       | System Card: Claude Opus 4 & Claude Sonnet 4',
  '2025-05, index month',
  '2025-05, printed cover month',
  'Part C',
);

// ---------- Part C: Operator expression ----------

c = cell('openai-operator', 'Q01');
put(
  c,
  'note',
  `${c.note} The file read is that revised expression (also created 2025-03-11, by its PDF metadata, in the ${CHECK}); the printed card date of January 23, 2025 stands. An archive capture of 2025-01-23, which would hold the January expression, is located but not retrieved.`,
  'Part C',
);
put(
  source('openai-operator'),
  'archive',
  {
    capture: null,
    located:
      'https://web.archive.org/web/20250123194555/https://cdn.openai.com/operator_system_card.pdf',
    note: `Capture of 2025-01-23 (the printed card date, before the March 11, 2025 update) located through the archive.org availability API in the ${CHECK}; not retrieved and not hashed, because web.archive.org refused the checker.`,
  },
  'Part C',
);

// ---------- Part C: Grok-1 basis wording ----------

editText(
  'research/model-cards-2/population.mjs',
  "'latest card before the Risk Management Framework (2025-08-20); not retrieved here (x.ai HTTP 403, web.archive.org refused)'",
  "'latest card before the Risk Management Framework (2025-08-20); the capture of 2023-11-05 retrieved for pack 3 (2026-11-05)'",
  'Part C',
);
editText(
  'research/model-cards-2/population.md',
  'latest card before the Risk Management Framework (2025-08-20); not retrieved here (x.ai HTTP 403, web.archive.org refused)',
  'latest card before the Risk Management Framework (2025-08-20); the capture of 2023-11-05 retrieved for pack 3 (2026-11-05)',
  'Part C',
);

// ---------- Scope: six cards admitted, PaliGemma and Grok-1 held ----------

const HELD_REASON =
  'Maintainer decision of 2026-11-05: read only from an archive capture, and none of its sampled cells was cross-family checked because web.archive.org refused the checker. Admitted with a later pack once a reader outside the Codex family can open the capture.';
put(card('google-paligemma'), 'held', HELD_REASON, 'scope');
put(card('xai-grok-1'), 'held', HELD_REASON, 'scope');
editText(
  'research/model-cards-2/population.mjs',
  'const HELD = {};',
  `const HELD = {
  'PaliGemma (1) model card':
    'drafted in pack 3; held from its admission (${DECIDED}) until a reader outside the Codex family can open the archive capture',
  'Grok-1 model card (x.ai/model-card)':
    'drafted in pack 3; held from its admission (${DECIDED}) until a reader outside the Codex family can open the archive capture',
};`,
  'scope',
);
editRow(
  'research/model-cards-2/population.md',
  '|  3   | Claude 3.7 Sonnet;',
  'PaliGemma;',
  'PaliGemma (held);',
  'scope',
);
editRow(
  'research/model-cards-2/population.md',
  '|  3   | Claude 3.7 Sonnet;',
  'Grok-1;',
  'Grok-1 (held);',
  'scope',
);
editText(
  'research/model-cards-2/population.md',
  'Microsoft has no card left under the rule, so it is skipped (open question P3).',
  'Microsoft has no card left under the rule, so it is skipped (open question P3). PaliGemma and Grok-1, drafted in pack 3, are held from its admission (maintainer decision of 2026-11-05) until a reader outside the Codex family can open their archive captures; they keep their place in the order and are admitted with a later pack.',
  'scope',
);
editRow(
  'research/model-cards-2/population.md',
  '| PaliGemma (1) model card',
  '|  3   |',
  '| 3, held |',
  'scope',
);
editRow(
  'research/model-cards-2/population.md',
  '| Grok-1 model card (x.ai/model-card)',
  '|  3   |',
  '| 3, held |',
  'scope',
);

for (const { f, d } of files)
  writeFileSync(join(DRAFTS, f), JSON.stringify(d, null, 2) + '\n');
for (const [p, s] of texts) writeFileSync(p, s);
writeFileSync(
  join(DIR, 'adjudication', 'applied-2026-11-05.json'),
  JSON.stringify(
    {
      generated:
        'node research/model-cards-3/adjudication/apply-2026-11-05.mjs',
      check: 'research/model-cards-3/cross-family-check-2026-11-05.json',
      decisions:
        'review/model-cards-pack-3-2026-11-05.md, Maintainer decisions',
      changes: log.length,
      log,
    },
    null,
    2,
  ) + '\n',
);
console.log(`applied ${log.length} changes`);
