import { describe, expect, it } from 'vitest';
import order from '../../review/institutional-atlas-order.json';
import { preSortNameRepository as repository } from '../editorial/pre-sort-name-data';
import { preSortNameRaw } from '../editorial/pre-sort-name-data';
import { createHash } from 'node:crypto';
import increment from '../../review/institutional-atlas-increment.json';
import nextIncrement from '../../review/xai-meta-increment.json';

const ids = order.flatMap((g) => g.claimIds);
describe('institutional atlas increment', () => {
  it('preserves every pre-existing record and accounts for every addition', () => {
    for (const key of ['entities', 'claims', 'sources', 'evidence'] as const) {
      const baseline = increment.baseline[key];
      const raw = preSortNameRaw(key) as {
        id: string;
      }[];
      const retained = raw.filter((r) => baseline.ids.includes(r.id));
      expect(retained).toHaveLength(baseline.count);
      expect(
        createHash('sha256').update(JSON.stringify(retained)).digest('hex'),
      ).toBe(baseline.sha256);
      expect(
        repository.data[key]
          .filter(
            (r) =>
              !baseline.ids.includes(r.id) &&
              nextIncrement.baseline[key].ids.includes(r.id),
          )
          .map((r) => r.id),
      ).toEqual(increment.added[key]);
    }
  });
  it('admits only individually evidenced seeds and no duplicate dated relationships', () => {
    expect(ids).toHaveLength(40);
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) {
      const claim = repository.claims.get(id)!;
      expect(claim.editorialState).toBe('seed');
      for (const eid of claim.evidenceIds) {
        const evidence = repository.evidence.get(eid)!;
        expect(evidence.claimId).toBe(id);
        expect(evidence.verification).toBe('machine_checked');
        expect(evidence.reviewer).toBeUndefined();
      }
      const signature = (c: typeof claim) =>
        JSON.stringify([
          c.subject,
          c.predicate,
          c.object,
          c.time.kind,
          'date' in c.time ? c.time.date : c.time,
        ]);
      expect(
        repository.data.claims.filter((c) => signature(c) === signature(claim)),
      ).toEqual([claim]);
    }
  });
  it('retains announcement, snapshot, version-date and source-date limits', () => {
    expect(
      repository.claims.get('atlas-openai-pbc-plan')!.qualification,
    ).toContain('not a completed conversion');
    expect(repository.claims.get('atlas-altman-return')!.time).toMatchObject({
      kind: 'snapshot',
      date: '2023-11-29',
    });
    expect(
      repository.claims.get('atlas-gdm-gemini-report')!.time,
    ).toMatchObject({ date: '2023-12-06' });
    expect(repository.claims.get('atlas-openai-charter')!.time.kind).toBe(
      'unknown',
    );
    expect(
      repository.sources.get('source-atlas-charter')!.publicationDate,
    ).toBeNull();
    expect(
      repository.claims.get('atlas-deepmind-alphafold-compute')!.attributes,
    ).toMatchObject({
      relationshipContext: 'internal',
      transactionType: 'infrastructure_use',
    });
  });
});
