// Draws the same-family audit sample from pack.json (seed 20261030, linear congruential generator).
// Run: node research/people/audit-sample.mjs  → research/people/audit-sample.json
import { readFileSync, writeFileSync } from 'node:fs';
const pack = JSON.parse(readFileSync('research/people/pack.json', 'utf8'));
let s = 20261030;
const r = () => (s = (s * 1664525 + 1013904223) >>> 0) / 2 ** 32;
const shuffle = (xs) =>
  xs
    .map((x) => [r(), x])
    .sort((a, b) => a[0] - b[0])
    .map((x) => x[1]);
const items = [
  ...pack.claims.map((c) => ({ id: c.id, c })),
  ...pack.persons
    .filter((p) => p.identity?.length && !p.existing)
    .map((p) => ({ id: `identity:${p.id}`, p })),
];
const targetedTest = (x) =>
  x.p
    ? x.p.aliases?.length > 0 ||
      /meta|google research|publication page/i.test(
        JSON.stringify(x.p.identity),
      )
    : x.c.proposedPredicate ||
      x.c.time.kind === 'unknown' ||
      (x.c.time.kind === 'interval' && x.c.time.until) ||
      /announce/i.test(x.c.time.basis ?? '') ||
      x.c.evidence.some((e) => e.passageType === 'paraphrase' || e.translation);
const targetedPool = items.filter(targetedTest);
const randomPool = items.filter((x) => !targetedTest(x));
const targeted = shuffle(targetedPool)
  .slice(0, 20)
  .map((x) => x.id);
const random = shuffle(randomPool)
  .slice(0, 20)
  .map((x) => x.id);
writeFileSync(
  'research/people/audit-sample.json',
  JSON.stringify(
    {
      seed: 20261030,
      frame: `${items.length} items: ${pack.claims.length} records and ${items.length - pack.claims.length} identity items of proposed persons`,
      targetedClass:
        'proposed predicates, unknown dates, closed intervals, announcements, paraphrased or translated evidence, persons with aliases or identified by a publisher page',
      targetedPool: targetedPool.length,
      randomPool: randomPool.length,
      targeted,
      random,
    },
    null,
    1,
  ) + '\n',
);
console.log(
  targetedPool.length,
  randomPool.length,
  targeted.length,
  random.length,
);
