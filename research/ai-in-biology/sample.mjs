// Draws the same-family audit sample from pack.json and writes audit-sample.json,
// then writes one input file per auditor into the ignored .local/ai-in-biology/ folder.
// It is run once, on the pack as merged before the audit; audit-sample.json records
// that draw, and re-running it after the corrections would draw a different sample
// from a different pack. `packRecords` says how many records the pack then held.
// Usage: node research/ai-in-biology/sample.mjs
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIR = dirname(fileURLToPath(import.meta.url));
const ROOT = join(DIR, '..', '..');
const pack = JSON.parse(readFileSync(join(DIR, 'pack.json'), 'utf8'));
const SEED = 20261030;
const RANDOM = 32;
const TARGETED = 40;

// A linear congruential generator, so the draw can be reproduced.
function rng(seed) {
  let s = seed >>> 0;
  return () => (s = (s * 1664525 + 1013904223) >>> 0) / 2 ** 32;
}
const r = rng(SEED);
const shuffle = (xs) =>
  xs
    .map((x) => [r(), x])
    .sort((a, b) => a[0] - b[0])
    .map((x) => x[1]);

// The targeted class: records whose failure would matter most, or whose form the
// editorial policy singles out.
const isTargeted = (c) =>
  c.derivation !== 'explicit' ||
  c.resolution !== 'supported' ||
  c.proposedPredicate ||
  c.predicate === 'provision_not_found' ||
  c.predicate === 'changes_from' ||
  [
    'announced_funding',
    'investment_announced',
    'participated_in_round',
    'acquired',
    'founding_stated',
    'held_role',
  ].includes(c.predicate) ||
  Boolean(c.attributes?.thought) ||
  Boolean(c.attributes?.amount) ||
  Boolean(c.hazardNote) ||
  c.time?.kind === 'snapshot' ||
  c.evidence.some((e) => e.sourceRole === 'secondary');

const targeted = pack.claims.filter(isTargeted);
const rest = pack.claims.filter((c) => !isTargeted(c));
const randomDraw = shuffle(rest).slice(0, RANDOM);
const targetedDraw = shuffle(targeted).slice(0, TARGETED);
const sample = {
  seed: SEED,
  packRecords: pack.claims.length,
  method: `Random: ${RANDOM} records drawn by a seeded linear congruential generator (sample.mjs) from the ${rest.length} records outside the targeted class. Targeted: the ${targeted.length} records that are inferred, posed, contested or unresolved, use a proposed predicate (partnerships, awards), record funding, an investment, an acquisition, a founding date or a role, hold a proposition role, carry a hazard note, compare two editions, record an absence, rest on a snapshot of a served page, or rest on a secondary source; ${TARGETED} of them drawn by the same generator.`,
  random: randomDraw.map((c) => c.id),
  targeted: targetedDraw.map((c) => c.id),
};
writeFileSync(
  join(DIR, 'audit-sample.json'),
  JSON.stringify(sample, null, 2) + '\n',
);

// Auditor inputs: the records without the preparer's drafts, notes or verdicts.
const srcByKey = new Map(pack.sources.map((s) => [s.key, s]));
const docById = new Map(pack.documents.map((d) => [d.id, d]));
const item = (c) => ({
  id: c.id,
  strand: c.strand,
  subject: c.subject,
  subjectTitle: docById.get(c.subject)?.title ?? null,
  predicate: c.predicate,
  proposedPredicate: Boolean(c.proposedPredicate),
  object: c.object,
  statement: c.statement,
  time: c.time,
  derivation: c.derivation,
  inferenceRationale: c.inferenceRationale ?? null,
  resolution: c.resolution,
  qualification: c.qualification,
  attributes: c.attributes ?? {},
  hazardNote: c.hazardNote ?? null,
  evidence: c.evidence.map((e) => ({
    source: e.source,
    cacheKey: srcByKey.get(e.source)?.cacheKey ?? null,
    sourceTitle: srcByKey.get(e.source)?.title ?? null,
    url: srcByKey.get(e.source)?.url ?? null,
    retrievedAt: srcByKey.get(e.source)?.retrievedAt ?? null,
    locator: e.locator,
    passage: e.passage,
    passageType: e.passageType,
    translation: e.translation ?? null,
    sourceRole: e.sourceRole,
    support: e.support,
  })),
});
const all = [...randomDraw.map(item), ...targetedDraw.map(item)];
const half = Math.ceil(all.length / 2);
const out = join(ROOT, '.local', 'ai-in-biology');
mkdirSync(out, { recursive: true });
for (const [i, part] of [all.slice(0, half), all.slice(half)].entries())
  writeFileSync(
    join(out, `audit-input-${'AB'[i]}.json`),
    JSON.stringify(part, null, 2) + '\n',
  );
console.log(
  `sample: ${randomDraw.length} random of ${rest.length}, ${targetedDraw.length} targeted of ${targeted.length}; inputs A ${half} and B ${all.length - half} records in .local/ai-in-biology/`,
);
