// Draws the same-family audit sample from pack.json as it stands before the audit:
// 30 random records outside the targeted class and 34 targeted records (build.mjs isTargeted),
// seed 20261029, linear congruential generator. Writes audit-sample.json. The draw depends on
// record order in pack.json; the recorded sample was drawn before the topic sort was made
// numeric (OC10 before OC2), so rerunning on the current pack gives a different draw.
// Usage: node research/compute-power-orbit/audit-sample.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { isTargeted } from './build.mjs';

const DIR = dirname(fileURLToPath(import.meta.url));
const pack = JSON.parse(readFileSync(join(DIR, 'pack.json'), 'utf8'));
let s = 20261029 >>> 0;
const r = () => (s = (s * 1664525 + 1013904223) >>> 0) / 2 ** 32;
const draw = (xs, n) =>
  xs
    .map((x) => [r(), x])
    .sort((a, b) => a[0] - b[0])
    .slice(0, n)
    .map((x) => x[1].id);
const targeted = pack.claims.filter(isTargeted);
const rest = pack.claims.filter((c) => !isTargeted(c));
const out = {
  seed: 20261029,
  method:
    'Linear congruential generator (a 1664525, c 1013904223, m 2^32) as in build.mjs; records sorted by draw value. Targeted class as build.mjs isTargeted: stated figures, stated status and stage words, signatures, press-only, inferred, contested, extensions of dataset records, contesting and earliest-located arguments.',
  population: {
    records: pack.claims.length,
    targeted: targeted.length,
    other: rest.length,
  },
  random: draw(rest, 30),
  targeted: draw(targeted, 34),
};
writeFileSync(
  join(DIR, 'audit-sample.json'),
  JSON.stringify(out, null, 2) + '\n',
);
console.log(out.population, out.random.length, out.targeted.length);
