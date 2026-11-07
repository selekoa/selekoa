// Role changes after the pass before 2016 of 2026-11-04 (decision 11a(a); records in
// drafts/follow-up.json): ECB WP 352 (2004) takes U05's earliest-located role, BCBS WP 4 (2000)
// takes U09's. Every change asserts that it changes something. Run once, after
// reread-u12-2026-11-04.mjs; log: adjudication/pre2016-2026-11-04.json.
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
  log.push({
    id: x.id,
    field,
    from: x[field] ?? null,
    to: value,
    why: '11a(a)',
  });
  x[field] = value;
};

let r = find('am-u05-boe-2017-swp674-ml-central-banks');
put(r, 'roles', ['articulation']);
put(r, 'crossFamily', {
  items: ['A1.5', 'follow-up 2026-11-04'],
  result:
    'earliest-located role moved to ECB Working Paper No. 352, April 2004 (am-u05-ecb-wp-352), found in the pass before 2016; recorded as a correction. The CNB paper of 2005 stays a lead (decision 16a).',
});
r = find('am-u09-fsb-2017-fintech-fs');
put(r, 'roles', ['articulation', 'earliest-located-term']);
put(r, 'crossFamily', {
  items: ['A1.9', 'follow-up 2026-11-04'],
  result:
    'earliest-located role moved to BCBS Working Paper No. 4, December 2000 (am-u09-bcbs-2000-wp4-early-warning), found in the pass before 2016; recorded as a correction. This report stays the earliest located institutional text and the earliest located use of “SupTech”. Bauguess (SEC) stays a lead (decision 10a).',
});

for (const { f, d } of drafts)
  writeFileSync(join(DRAFTS, f), JSON.stringify(d, null, 2) + '\n');
writeFileSync(
  join(DIR, 'adjudication', 'pre2016-2026-11-04.json'),
  JSON.stringify(log, null, 2) + '\n',
);
console.log(`${log.length} changes`);
