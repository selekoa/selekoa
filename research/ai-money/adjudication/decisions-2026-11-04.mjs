// Applies the maintainer's decisions on the AI-and-money decision sheet
// (review/decisions/ai-money.md; answers in review/decisions/answers-2026-11-03.md, recorded
// in the review note under "Maintainer decisions") to the drafts. Every change asserts that
// it changes something. Run once, after apply-2026-11-03.mjs:
//   node research/ai-money/adjudication/decisions-2026-11-04.mjs
// then tools.mjs merge, verify and render. The log goes to adjudication/decisions-2026-11-04.json.
// Decisions that only confirm what the pack already does (1a, 2a, 3a, 4a, 8a, 9a, 12a) change
// nothing here; 6a and 7a are also enforced or rendered by build.mjs; 10a and 16a add leads.
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

const find = (kind, id) => {
  const hits = drafts.flatMap(({ d }) =>
    (d[kind] ?? []).filter((x) => x.id === id),
  );
  if (hits.length !== 1) throw new Error(`${kind} ${id}: ${hits.length} found`);
  return hits[0];
};
const put = (x, field, value, decision) => {
  if (JSON.stringify(x[field]) === JSON.stringify(value))
    throw new Error(`no change: ${x.id}.${field}`);
  log.push({ id: x.id, field, from: x[field] ?? null, to: value, decision });
  x[field] = value;
};
const swap = (x, field, a, b, decision) => {
  if (!String(x[field] ?? '').includes(a))
    throw new Error(`not found in ${x.id}.${field}: ${a.slice(0, 60)}`);
  put(x, field, x[field].replace(a, b), decision);
};

// ---------- 15a (settled by the second pass) and 6a: U07 ----------
let r = find('records', 'am-u07-frb-2025-waller-sibos');
put(r, 'id', 'am-u07-frb-2025-waller-sibos-context', '15a');
put(r, 'predicate', 'bears_on_proposition', '15a');
put(r, 'roles', ['context'], '15a');
put(
  r,
  'missing',
  'The passage names agentic AI "executing tasks on behalf of a person or company" as one way AI can improve the efficiency of payments; it does not state that AI agents initiate, negotiate or execute payments or transactions, and the next sentence concerns compliance.',
  '15a',
);
for (const e of r.evidence) {
  if (e.support === 'context') throw new Error('no change: support');
  log.push({
    id: r.id,
    field: 'evidence.support',
    from: e.support,
    to: 'context',
    decision: '15a',
  });
  e.support = 'context';
}
put(
  r,
  'crossFamily',
  {
    items: ['A1.7', 'A2.42', 'second pass 2026-11-03'],
    result:
      'decided: bears on (context), the checker’s reading, which the second pass held; settled under decision 15a. Former id am-u07-frb-2025-waller-sibos.',
  },
  '15a',
);

r = find('records', 'am-u07-bis-wp-1310');
put(r, 'roles', ['earliest-located'], '15a, 6a');
put(
  r,
  'crossFamily',
  {
    items: ['A1.7', 'A2.42'],
    result: 'earliest-located role assigned under decisions 15a and 6a.',
    headline:
      'Under decision 15a Waller (29 September 2025) is context, and under decision 6a the ECB innovation platform outcome report (September 2025), which relays workshop participants’ ideas, cannot hold the headline. The headline moves from Waller to this staff working paper (10 November 2025). It was an articulation in the checked pack and was not itself a blind item; the short check of 2026-11-04 covers the role.',
  },
  '15a, 6a',
);

r = find('records', 'am-u07-ecb-2025-de-ip-outcome-report');
put(
  r,
  'crossFamily',
  {
    items: ['B67', 'A1.7'],
    result:
      'corrected: section heading in the locator. Relay classification agreed. Under decision 6a a relay cannot hold an earliest-located role.',
  },
  '6a',
);

// ---------- 7a: U08 ----------
r = find('records', 'am-u08-bis-2025-aer-ch3');
put(
  r,
  'crossFamily',
  {
    items: ['A1.8', 'second pass 2026-11-03'],
    result:
      'decided: bears on (context), the preparer’s reading (decision 7a, 2026-11-04). U08 shows “no located text meets the criterion”.',
    headline:
      'Decision 7a: no located text meets the criterion. The checker’s narrower reading is noted: in its second pass it reads this passage as stating U08’s second part, qualified that it concerns compliance and states no need for stablecoins, which would make it the earliest located text.',
    readings: {
      checker:
        'second pass (option b): AI agents embedded in payment instructions and compliance reporting on a tokenised correspondent-banking platform, in a chapter on the next-generation monetary system, state the second part of the criterion, with a qualification; no need for stablecoins is stated.',
      preparer:
        'bears on: the agents do compliance work on a tokenised platform; the passage does not say that this interaction matters for the monetary system.',
      decided: '7a (preparer’s reading)',
    },
  },
  '7a',
);

// ---------- 17a: events stated as under way ----------
const OLD17 =
  'The text states the work as under way at its date; the stage "announced" is the pack’s coarse label for work not stated as done (cross-family check; stage vocabulary held for the maintainer).';
const NEW17 =
  'The text states the work as under way at its date (stage "stated as under way", decision 17a); at admission it is a dated statement of status, never a completed event.';
for (const id of [
  'am-event-fsb-2017-ai-ml-monitoring',
  'am-event-fsb-2024-ai-report-update',
  'am-event-fsb-2026-frontier-ai-cyber-work',
]) {
  const e = find('events', id);
  put(e, 'stage', 'under-way', '17a');
  swap(e, 'qualification', OLD17, NEW17, '17a');
  if (id === 'am-event-fsb-2024-ai-report-update')
    swap(
      e,
      'qualification',
      'the record states the update as announced.',
      'the record states the update as under way.',
      '17a',
    );
  if (id === 'am-event-fsb-2026-frontier-ai-cyber-work')
    swap(
      e,
      'qualification',
      'Announced stays announced; the record states work under exploration',
      'The record states work under exploration',
      '17a',
    );
  put(
    e,
    'crossFamily',
    {
      ...e.crossFamily,
      result: e.crossFamily.result.replace(
        'the stage vocabulary (announced or a stated-ongoing stage) is held for the maintainer.',
        'stage "stated as under way" under decision 17a.',
      ),
    },
    '17a',
  );
}

// ---------- 10a and 16a: the SEC and CNB texts stay leads ----------
r = find('records', 'am-u09-fsb-2017-fintech-fs');
put(
  r,
  'crossFamily',
  {
    items: ['A1.9'],
    result:
      'decided: the earliest-located role stays (decision 10a: securities regulators only through IOSCO and the authorities already in scope).',
    headline:
      'Decision 10a. Bauguess (SEC), speeches of 21 October 2016 and 21 June 2017, located by the checker, precede this record; the SEC is outside the scope, so they are leads in the search log, not records. This report is the earliest located text within the scope’s bodies.',
  },
  '10a',
);
r = find('records', 'am-u05-boe-2017-swp674-ml-central-banks');
put(
  r,
  'crossFamily',
  {
    items: ['A1.5'],
    result:
      'decided: the earliest-located role stays (decision 16a: the named bodies only).',
    headline:
      'Decision 16a. Czech National Bank Working Paper 11/2005 (December 2005, staff), located by the checker on its official abstract, precedes this record; the CNB is outside the named bodies, so it is a lead in the search log, not a record. A Bank of Canada working paper of January 1999 is a lead only.',
  },
  '16a',
);

for (const { f, d } of drafts)
  writeFileSync(join(DRAFTS, f), JSON.stringify(d, null, 2) + '\n');
writeFileSync(
  join(DIR, 'adjudication', 'decisions-2026-11-04.json'),
  JSON.stringify(log, null, 2) + '\n',
);
console.log(`${log.length} changes`);
