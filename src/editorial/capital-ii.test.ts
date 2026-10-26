import evaluation from '../../review/evaluation-institutions-i-increment.json';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { format, resolveConfig } from 'prettier';
import { describe, expect, it } from 'vitest';
import { preFrameworkEvidenceRaw } from './pre-framework-evidence-data';
import increment from '../../review/capital-ii-increment.json';
import order from '../../review/capital-ii-order.json';
import {
  preSortNameRepository as repository,
  withoutSortName,
} from './pre-sort-name-data';
import { renderSeedReview } from './seed-review';

const hash = (s: string) => createHash('sha256').update(s).digest('hex');
const { entities, claims, sources, evidence } = preFrameworkEvidenceRaw;
const raw = {
  entities: entities.map(withoutSortName),
  claims,
  sources,
  evidence,
};
describe('Capital II editorial and transaction boundaries', () => {
  it('preserves every baseline record and prior committed review artifact', () => {
    for (const key of ['entities', 'claims', 'sources', 'evidence'] as const) {
      const before = raw[key].filter((r) =>
        increment.baseline[key].ids.includes(r.id),
      );
      expect(before).toHaveLength(increment.baseline[key].count);
      expect(hash(JSON.stringify(before))).toBe(increment.baseline[key].sha256);
    }
    for (const [path, expected] of Object.entries(
      increment.preservedReviewFiles,
    ))
      expect(
        hash(readFileSync(path, 'utf8').replace(/\r\n/g, '\n')),
        path,
      ).toBe(expected);
  });

  it('keeps new contracts as seeds with machine evidence and narrow amounts', () => {
    expect(order.flatMap((g) => g.claimIds)).toEqual(increment.newClaimIds);
    expect(increment.newClaimIds).toHaveLength(7);
    expect(increment.newEntityIds).toEqual([]);
    for (const id of increment.newClaimIds) {
      const c = repository.claims.get(id)!;
      expect(c).toMatchObject({
        editorialState: 'seed',
        derivation: 'explicit',
        resolution: 'supported',
        attributes: {
          transactionStage: 'contracted',
          relationshipContext: 'external',
        },
      });
      expect(['cloud_terms', 'compute_capacity']).toContain(c.predicate);
      for (const eid of c.evidenceIds) {
        const e = repository.evidence.get(eid)!;
        expect(e.verification).toBe('machine_checked');
        expect(e.reviewer).toBeUndefined();
        expect(e.locator.length).toBeGreaterThan(20);
      }
    }
    expect(
      repository.claims.get('capital-ii-anthropic-google-commitment-2024')!
        .attributes!.amount,
    ).toBeUndefined();
    expect(
      repository.claims.get('capital-ii-openai-coreweave-expansion-2025')!
        .attributes,
    ).toMatchObject({
      amount: { value: 4e9, bound: 'up_to', scope: 'transaction' },
      conditions:
        'Satisfaction of delivery and availability-of-service requirements.',
    });
    expect(
      repository.claims.get('capital-ii-openai-azure-first-2026')!
        .qualification,
    ).toContain('cannot and chooses not');
  });

  it('checks the exact historical directed cycles without including value or internal-resource edges', () => {
    for (const ids of [
      ['microsoft-investment-2019', 'openai-azure-2019'],
      ['microsoft-investment-2023', 'openai-cloud-2023'],
      [
        'google-anthropic-convertible-debt-2024',
        'anthropic-google-nonexclusive-2024',
      ],
    ]) {
      const pair = ids.map((id) => repository.claims.get(id)!);
      for (const [i, c] of pair.entries()) {
        expect(c.object.kind).toBe('entity');
        if (c.object.kind === 'entity')
          expect(c.object.entityId).toBe(pair[1 - i].subject);
        expect(c.attributes?.relationshipContext).not.toBe('internal');
      }
      expect(pair[0].time).toHaveProperty(
        'date',
        (pair[1].time as { date: string }).date,
      );
    }
    const aws = repository.claims.get(
      'capital-ii-anthropic-aws-nonexclusive-2024',
    )!;
    expect(aws.object).toEqual({ kind: 'entity', entityId: 'aws' });
    expect(
      repository.claims.get('amazon-anthropic-tranche-2024')!.subject,
    ).toBe('amazon');
  });

  it('reproduces the separate pack with seven blank human decisions and notes', async () => {
    const path = 'review/capital-ii-review.md';
    const generated = await format(
      renderSeedReview(
        {
          meta: evaluation.baselineMeta,
          entities: entities
            .map(withoutSortName)
            .filter((r) => evaluation.baseline.entities.ids.includes(r.id)),
          claims: claims.filter((r) =>
            evaluation.baseline.claims.ids.includes(r.id),
          ),
          sources: sources.filter((r) =>
            evaluation.baseline.sources.ids.includes(r.id),
          ),
          evidence: evidence.filter((r) =>
            evaluation.baseline.evidence.ids.includes(r.id),
          ),
        },
        order,
        {
          selection: true,
          title: 'capital II — reciprocal corridors and dependency conditions',
        },
      ),
      { ...(await resolveConfig(path)), parser: 'markdown' },
    );
    const actual = readFileSync(path, 'utf8').replace(/\r\n/g, '\n');
    expect(actual).toBe(generated);
    expect(actual.match(/\*\*Human decision:\*\*\s*\n/g)).toHaveLength(7);
    expect(actual.match(/\*\*Notes:\*\*\s*\n/g)).toHaveLength(7);
  });
});
