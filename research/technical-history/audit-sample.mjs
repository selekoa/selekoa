// Draws the same-family audit sample from pack.json: a seeded random sample and a targeted one.
// Usage: node research/technical-history/audit-sample.mjs  -> audit-sample.json
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIR = dirname(fileURLToPath(import.meta.url));
const pack = JSON.parse(readFileSync(join(DIR, 'pack.json'), 'utf8'));
const SEED = 1029;
let x = SEED;
const rand = () => (x = (Math.imul(x, 1664525) + 1013904223) >>> 0) / 2 ** 32;

const targeted = new Map();
const add = (c, why) => {
  if (!targeted.has(c.id)) targeted.set(c.id, []);
  targeted.get(c.id).push(why);
};
for (const c of pack.claims) {
  if (c.attributes?.term?.roles?.includes('earliest-located-term'))
    add(c, 'earliest-located-term');
  if (c.derivation !== 'explicit') add(c, 'inferred');
  if ((c.evidence ?? []).every((e) => e.sourceRole === 'secondary'))
    add(c, 'secondary evidence only');
  if (c.predicate === 'states_provision' && c.section === 'timeline')
    add(c, 'timeline statement');
}
// Attributed statements: every other one, in pack order, so both sides of a disagreement are seen.
pack.claims
  .filter((c) => ['explicitly_credits', 'credits_work'].includes(c.predicate))
  .forEach((c, i) => i % 2 === 0 && add(c, 'attributed statement'));
// Timeline statements: keep at most 12, seeded.
const tl = [...targeted].filter(
  ([, w]) => w.length === 1 && w[0] === 'timeline statement',
);
for (const [id] of tl
  .map((t) => [rand(), t])
  .sort((a, b) => a[0] - b[0])
  .slice(12)
  .map((p) => p[1]))
  targeted.delete(id);
const rest = pack.claims.filter((c) => !targeted.has(c.id));
const random = rest
  .map((c) => [rand(), c.id])
  .sort((a, b) => a[0] - b[0])
  .slice(0, 25)
  .map((p) => p[1]);
// Document dates of a kind other than publication: a seeded sample of 12.
const dates = pack.documents
  .flatMap((d) =>
    d.dates.map((t, i) => ({
      document: d.id,
      index: i + 1,
      kind: t.kind,
      date: t.date,
    })),
  )
  .filter((t) => t.kind !== 'publication');
const dateSample = dates
  .map((t) => [rand(), t])
  .sort((a, b) => a[0] - b[0])
  .slice(0, 12)
  .map((p) => p[1]);
const out = {
  seed: SEED,
  method:
    'Linear congruential generator (as in build.mjs). Targeted: every earliest-located-term record, every inferred record and record on secondary evidence only, every other attributed statement in pack order, and up to 12 timeline statements (seeded). Random: 25 of the remaining records. Dates: 12 of the document dates whose kind is not publication.',
  targeted: [...targeted].map(([id, why]) => ({ id, why })),
  random,
  dates: dateSample,
};
writeFileSync(
  join(DIR, 'audit-sample.json'),
  JSON.stringify(out, null, 2) + '\n',
);
console.log(
  `targeted ${out.targeted.length}, random ${random.length}, dates ${dateSample.length}`,
);
