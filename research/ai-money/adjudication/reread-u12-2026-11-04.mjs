// Decision 18a: re-reading of the U12 contesting records not settled by the cross-family
// check (IMF 2021, RBI FREE-AI Committee 2025, Breeden 2026), with the rule that a call for
// guidance or adaptation in specific areas does not, alone, contest broad coverage.
// Every change asserts that it changes something. Run once, after follow-up-2026-11-04.mjs:
//   node research/ai-money/adjudication/reread-u12-2026-11-04.mjs
// Log: adjudication/reread-u12-2026-11-04.json.
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIR = join(dirname(fileURLToPath(import.meta.url)), '..');
const DRAFTS = join(DIR, 'drafts');
const drafts = readdirSync(DRAFTS)
  .filter((f) => f.endsWith('.json'))
  .sort()
  .map((f) => ({ f, d: JSON.parse(readFileSync(join(DRAFTS, f), 'utf8')) }));
const log = [];
const find = (id) => {
  const hits = drafts.flatMap(({ d }) =>
    (d.records ?? []).filter((x) => x.id === id),
  );
  if (hits.length !== 1) throw new Error(`${id}: ${hits.length} found`);
  return hits[0];
};
const put = (x, field, value) => {
  if (JSON.stringify(x[field]) === JSON.stringify(value))
    throw new Error(`no change: ${x.id}.${field}`);
  log.push({ id: x.id, field, from: x[field] ?? null, to: value, why: '18a' });
  x[field] = value;
};
const toContext = (x, newId, missing) => {
  put(x, 'id', newId);
  put(x, 'predicate', 'bears_on_proposition');
  put(x, 'roles', ['context']);
  put(x, 'engagement', null);
  put(x, 'missing', missing);
  for (const e of x.evidence)
    if (e.support !== 'context') {
      log.push({
        id: newId,
        field: 'evidence.support',
        from: e.support,
        to: 'context',
        why: '18a',
      });
      e.support = 'context';
    }
};

// IMF Departmental Paper, 22 October 2021.
let r = find('am-u12-imf-2021-dp-ai-finance-contests');
const imfOld = r.id;
toContext(
  r,
  'am-u12-imf-2021-dp-ai-finance-context',
  'The paper calls for clear minimum standards and guidelines, guidance on explainability and an expanded cybersecurity perimeter, and states that regulatory gaps could matter if technological advances outpace existing regulations; it reports that some jurisdictions found existing regulations sufficient and that regulators focus on governance and risk management “by way of new regulations or existing ones”. It does not state that existing frameworks broadly fail to cover AI or that a separate framework is needed.',
);
put(
  r,
  'qualification',
  'A staff paper attributed to its authors. Re-read under decision 18a: calls for standards and guidance in specific areas, which do not alone contest broad coverage; the paper states no view on whether existing frameworks broadly cover AI.',
);
put(r, 'crossFamily', {
  items: ['decision 18a', 'follow-up 2026-11-04'],
  result: `re-read: contests to bears on (context). Former id ${imfOld}. Not checked by the other family before; in the short check of 2026-11-04.`,
});

// Breeden, Bank of England, 30 June 2026.
r = find('am-u12-boe-2026-breeden-agents-of-change-contests');
const brOld = r.id;
toContext(
  r,
  'am-u12-boe-2026-breeden-agents-of-change-context',
  'The speaker states that existing frameworks were not built to contemplate autonomous agents and that more sophisticated governance and accountability frameworks “may be needed”, framed as a question to keep asking about agents; she does not state that existing frameworks fail to cover AI broadly or that a separate AI framework is needed.',
);
put(
  r,
  'statement',
  'In a speech published on 30 June 2026, Sarah Breeden, Deputy Governor for Financial Stability at the Bank of England, said that, as AI capabilities increase, “we must keep asking” whether existing, technology-agnostic regulatory frameworks remain sufficient, that they were not built to contemplate autonomous agents, and that more sophisticated governance and accountability frameworks may be needed.',
);
put(
  r,
  'qualification',
  'Re-read under decision 18a: a question and a possible adaptation for autonomous agents, not a contest of broad coverage. She does not propose specific AI-specific rules. Compare her speech of 31 October 2024 (am-u12-boe-2024-breeden-engaging-machine).',
);
put(r, 'crossFamily', {
  items: ['decision 18a', 'follow-up 2026-11-04'],
  result: `re-read: contests to bears on (context). Former id ${brOld}. Not checked by the other family before; in the short check of 2026-11-04.`,
});

// RBI FREE-AI Committee report, August 2025: stance kept, ground narrowed.
r = find('am-u12-rbi-2025-free-ai-report-contests');
put(r, 'engagement', {
  kind: 'engages-premise',
  rationale:
    'Beyond incremental additions to existing regulations in named areas (which alone would not contest U12 under decision 18a), the committee recommends a dedicated framework for responsible and ethical AI adoption, including a dedicated institutional framework to issue financial-sector-specific standards, which disputes that AI needs no separate framework.',
});
put(
  r,
  'statement',
  'The report of the FREE-AI Committee placed on the Reserve Bank of India’s website in August 2025 states that existing regulations need to incorporate certain incremental AI aspects to be comprehensive, and sets as its objective a framework for responsible and ethical AI adoption, recommending a dedicated institutional framework in the financial sector to issue financial sector–specific standards, audit benchmarks and guidance.',
);
put(
  r,
  'qualification',
  'A partial contest: the report also recommends guiding regulated entities on how existing regulations apply to AI. Re-read under decision 18a: the incremental additions in named areas alone would not contest broad coverage; the stance rests on the recommended dedicated framework. The committee’s text, not stated by the RBI to be its policy.',
);
r.evidence.push(
  {
    source: 'rbi-2025-free-ai-report',
    locator: 'Chapter 4, paragraph 4.1.5, PDF p. 44',
    passage:
      'The Committee’s overarching objective is therefore to establish a forward-looking and balanced framework for responsible and ethical AI adoption.',
    passageType: 'quote',
    sourceRole: 'primary',
    support: 'supports',
    note: null,
  },
  {
    source: 'rbi-2025-free-ai-report',
    locator: 'Chapter 4, paragraph 4.4.33, PDF p. 59',
    passage:
      'the creation of a dedicated institutional framework within the financial sector is needed to continuously assess AI-related risks, support cross-sectoral coordination, issue financial sector–specific standards, audit benchmarks, and guidance to promote responsible innovation.',
    passageType: 'quote',
    sourceRole: 'primary',
    support: 'supports',
    note: null,
  },
);
log.push({
  id: r.id,
  field: 'evidence',
  from: null,
  to: 'two passages added (PDF pp. 44, 59)',
  why: '18a',
});
put(r, 'crossFamily', {
  items: ['decision 18a', 'follow-up 2026-11-04'],
  result:
    're-read: stance kept (contests), ground narrowed to the recommended dedicated framework; two passages added. Not checked by the other family before; in the short check of 2026-11-04.',
});

for (const { f, d } of drafts)
  writeFileSync(join(DRAFTS, f), JSON.stringify(d, null, 2) + '\n');
writeFileSync(
  join(DIR, 'adjudication', 'reread-u12-2026-11-04.json'),
  JSON.stringify(log, null, 2) + '\n',
);
console.log(`${log.length} changes`);
