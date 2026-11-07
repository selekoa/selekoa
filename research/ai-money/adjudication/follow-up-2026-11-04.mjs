// Role changes that follow from the records drafted in the follow-up pass of 2026-11-04
// (drafts/follow-up.json; maintainer decisions 5a, 11a and 18a). Every change asserts that
// it changes something. Run once, after decisions-2026-11-04.mjs:
//   node research/ai-money/adjudication/follow-up-2026-11-04.mjs
// then tools.mjs merge, verify and render. Log: adjudication/follow-up-2026-11-04.json.
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
const put = (x, field, value, why) => {
  if (JSON.stringify(x[field]) === JSON.stringify(value))
    throw new Error(`no change: ${x.id}.${field}`);
  log.push({ id: x.id, field, from: x[field] ?? null, to: value, why });
  x[field] = value;
};

// 5a: Haldane 2015 holds U06's headline; Carney 2018 becomes an articulation.
let r = find('records', 'am-u06-boe-2018-carney-future-of-work');
put(r, 'roles', ['articulation'], '5a');
put(
  r,
  'crossFamily',
  {
    items: ['A1.6', 'follow-up 2026-11-04'],
    result:
      'earliest-located role moved to Haldane, 12 November 2015 (am-u06-boe-2015-haldane-labours-share), under decision 5a; recorded as a correction. This record is unchanged otherwise.',
  },
  '5a',
);

// 11a: DNB 2019 becomes U12's earliest located institutional text (derived).
r = find('records', 'am-u12-boe-2022-dp5-22');
put(
  r,
  'crossFamily',
  {
    items: ['A1.12', 'R4', 'follow-up 2026-11-04'],
    result:
      'no longer the earliest located institutional text: DNB’s discussion paper of 2019 (am-u12-dnb-2019-ai-principles) is earlier, as the checker found. This record is unchanged otherwise.',
  },
  '11a',
);

for (const { f, d } of drafts)
  writeFileSync(join(DRAFTS, f), JSON.stringify(d, null, 2) + '\n');
writeFileSync(
  join(DIR, 'adjudication', 'follow-up-2026-11-04.json'),
  JSON.stringify(log, null, 2) + '\n',
);
console.log(`${log.length} changes`);
