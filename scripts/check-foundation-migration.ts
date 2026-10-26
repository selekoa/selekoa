import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { repository } from '../src/domain/repository';
import { relationshipClaims } from '../src/domain/query';
import type { Claim, Dataset } from '../src/domain/schema';

// Immutable genesis reference. This checks this migration, not future editorial changes.
const baseline = '03ca36dd0fbc5107199bddeae796f5c93c4e23ee';
const before = Object.fromEntries(
  ['meta', 'entities', 'claims', 'sources', 'evidence'].map((name) => [
    name,
    JSON.parse(
      execFileSync(
        'git',
        [
          '-c',
          `safe.directory=${process.cwd().replaceAll('\\', '/')}`,
          'show',
          `${baseline}:data/${name}.json`,
        ],
        { encoding: 'utf8' },
      ),
    ),
  ]),
) as Omit<Dataset, 'claims'> & {
  claims: (Omit<Claim, 'derivation' | 'resolution' | 'inferenceRationale'> & {
    status: string;
  })[];
};
const after = repository.data;
assert.equal(before.claims.length, 28);
assert.equal(after.claims.length, 28);
for (const collection of ['entities', 'sources', 'evidence'] as const)
  assert.deepEqual(
    after[collection],
    before[collection],
    `${collection} changed`,
  );
assert.deepEqual(after.meta, { ...before.meta, schemaVersion: '2.0' });
after.claims.forEach((claim, index) => {
  const { status, ...original } = before.claims[index];
  assert.equal(
    status,
    'documented',
    'Unexpected genesis state; no inferred migration',
  );
  const { derivation, resolution, inferenceRationale, ...preserved } = claim;
  assert.equal(derivation, 'explicit');
  assert.equal(resolution, 'supported');
  assert.equal(inferenceRationale, undefined);
  assert.deepEqual(
    preserved,
    original,
    `Substantive record changed: ${claim.id}`,
  );
  assert.equal(claim.editorialState, 'seed');
});
assert.ok(
  after.evidence.every(
    (e) => e.verification === 'machine_checked' && !e.reviewer,
  ),
);
const edges = relationshipClaims(after.claims);
assert.equal(edges.length, 27);
assert.equal(new Set(edges.map((c) => c.id)).size, 27);
assert.deepEqual(
  edges.map((c) => c.id),
  before.claims.filter((c) => c.object.kind === 'entity').map((c) => c.id),
);
assert.deepEqual(
  after.claims.filter((c) => c.object.kind === 'literal').map((c) => c.id),
  ['xai-round-total-2024'],
);
console.log(
  'Migration intact: 28 claims; 30 entities, 14 sources and 29 evidence records unchanged; 27 relationship IDs and 1 literal claim preserved. Statements, qualifications, predicates, temporal data and evidence links unchanged. All records remain seed / machine_checked.',
);
