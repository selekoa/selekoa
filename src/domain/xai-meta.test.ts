import { createHash } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import increment from '../../review/xai-meta-increment.json';
import nextIncrement from '../../review/china-atlas-increment.json';
import order from '../../review/xai-meta-order.json';
import { preSortNameRepository as repository } from '../editorial/pre-sort-name-data';
import { preSortNameRaw } from '../editorial/pre-sort-name-data';
import { institutionalDossier } from './dossier';

describe('xAI and Meta atlas increment', () => {
  it('preserves every baseline record, including human decisions', () => {
    for (const key of ['entities', 'claims', 'sources', 'evidence'] as const) {
      const raw = preSortNameRaw(key) as {
        id: string;
      }[];
      const baseline = increment.baseline[key];
      const retained = raw.filter((r) => baseline.ids.includes(r.id));
      expect(retained).toHaveLength(baseline.count);
      expect(
        createHash('sha256').update(JSON.stringify(retained)).digest('hex'),
      ).toBe(baseline.sha256);
      expect(
        raw
          .filter(
            (r) =>
              !baseline.ids.includes(r.id) &&
              nextIncrement.baseline[key].ids.includes(r.id),
          )
          .map((r) => r.id),
      ).toEqual(increment.added[key]);
    }
    expect(repository.data.meta).toEqual({
      ...increment.baselineMeta,
      anchors: [...increment.baselineMeta.anchors, 'meta'],
    });
  });
  it('admits individually sourced seeds without duplicate dated relationships', () => {
    const ids = order.flatMap((g) => g.claimIds);
    expect([...ids].sort()).toEqual([...increment.added.claims].sort());
    expect(ids).toHaveLength(39);
    for (const id of ids) {
      const c = repository.claims.get(id)!;
      expect(c.editorialState).toBe('seed');
      for (const eid of c.evidenceIds) {
        const e = repository.evidence.get(eid)!;
        expect(e.claimId).toBe(id);
        expect(e.verification).toBe('machine_checked');
        expect(e.reviewer).toBeUndefined();
        expect(e.locator.length).toBeGreaterThan(15);
      }
      const signature = (claim: typeof c) =>
        JSON.stringify([
          claim.subject,
          claim.predicate,
          claim.object,
          claim.time.kind,
          'date' in claim.time ? claim.time.date : claim.time,
        ]);
      expect(
        repository.data.claims.filter(
          (other) => signature(other) === signature(c),
        ),
      ).toEqual([c]);
    }
  });
  it('provides five populated sections and inspectable historical paths', () => {
    for (const [id, count] of [
      ['xai', 44],
      ['meta', 22],
    ] as const) {
      const dossier = institutionalDossier(repository.data, id)!;
      expect(dossier.claims).toHaveLength(count);
      for (const groups of Object.values(dossier.sections))
        expect(groups.length).toBeGreaterThan(0);
    }
    const xai = institutionalDossier(repository.data, 'xai')!;
    expect(xai.institutionLinks.map((l) => l.entity.id)).toEqual(
      expect.arrayContaining(['x-company', 'spacex']),
    );
    expect(xai.claims.map((c) => c.id)).toEqual(
      expect.arrayContaining([
        'xm-szegedy-google',
        'xm-szegedy-batch-normalization',
        'xm-babuschkin-departure',
      ]),
    );
    const meta = institutionalDossier(repository.data, 'meta')!;
    expect(meta.institutionLinks.map((l) => l.entity.id)).toEqual(
      expect.arrayContaining(['fair', 'facebook-company']),
    );
    expect(meta.claims.map((c) => c.id)).toEqual(
      expect.arrayContaining([
        'xm-pineau-cohere',
        'xm-llama-transformer',
        'xm-llama-chinchilla',
        'xm-lecun-fair-start',
      ]),
    );
  });
  it('separates plans, reported capacity, licence scope and institutional identity', () => {
    const claim = (id: string) => repository.claims.get('xm-' + id)!;
    expect(claim('rsc-plan').attributes?.transactionStage).toBe('planned');
    expect(claim('rsc-completion').attributes?.transactionStage).toBe(
      'operational',
    );
    expect(claim('colossus-aggregate').attributes?.quantity).toMatchObject({
      bound: 'more_than',
      unit: 'H100 GPU equivalents across Colossus I and II',
    });
    expect(claim('nvidia-series-e').attributes?.amount).toBeUndefined();
    expect(claim('meta-name').attributes?.transitionScope).toBe(
      'name_announcement',
    );
    expect(claim('pineau-cohere').attributes?.role).toBe(
      'Announced incoming Chief AI Officer',
    );
    expect(claim('llama-commercial').qualification).toContain('licence terms');
  });
});
