import { createHash } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import increment from '../../review/china-atlas-increment.json';
import order from '../../review/china-atlas-order.json';
import { preSortNameRepository as repository } from '../editorial/pre-sort-name-data';
import { preSortNameRaw } from '../editorial/pre-sort-name-data';
import { institutionalDossier } from './dossier';

describe('bounded Chinese AI histories', () => {
  it('preserves all baseline records, metadata and human decisions', () => {
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
        raw.filter((r) => !baseline.ids.includes(r.id)).map((r) => r.id),
      ).toEqual(increment.added[key]);
    }
    expect(repository.data.meta).toEqual(increment.baselineMeta);
  });
  it('keeps each new relationship independently evidenced and unaccepted', () => {
    const ids = order.flatMap((g) => g.claimIds);
    expect([...ids].sort()).toEqual([...increment.added.claims].sort());
    expect(ids).toHaveLength(36);
    for (const id of ids) {
      const c = repository.claims.get(id)!;
      expect(c.editorialState).toBe('seed');
      for (const eid of c.evidenceIds) {
        const e = repository.evidence.get(eid)!;
        expect(e.claimId).toBe(id);
        expect(e.verification).toBe('machine_checked');
        expect(e.reviewer).toBeUndefined();
        expect(e.locator.length).toBeGreaterThan(15);
        expect(repository.sources.get(e.sourceId)!.version).toContain(
          'Source language:',
        );
      }
      const signature = (r: typeof c) =>
        JSON.stringify([
          r.subject,
          r.predicate,
          r.object,
          r.time.kind,
          'date' in r.time ? r.time.date : r.time,
        ]);
      expect(
        repository.data.claims.filter((r) => signature(r) === signature(c)),
      ).toEqual([c]);
    }
  });
  it('populates all five sections without inventing a collection relationship', () => {
    for (const [id, count] of [
      ['deepseek', 10],
      ['alibaba-group', 11],
      ['zhipu', 9],
    ] as const) {
      const dossier = institutionalDossier(repository.data, id)!;
      expect(dossier.claims).toHaveLength(count);
      for (const groups of Object.values(dossier.sections))
        expect(groups.length).toBeGreaterThan(0);
    }
    const alibaba = institutionalDossier(repository.data, 'alibaba-group')!;
    expect(alibaba.institutionLinks.map((l) => l.entity.id)).toEqual(
      expect.arrayContaining(['qwen-team', 'alibaba-cloud-intelligence']),
    );
    const qwen = institutionalDossier(repository.data, 'qwen-team')!;
    expect(qwen.claims.map((c) => c.id)).toContain('cn-r1-qwen');
    expect(repository.entities.has('chinese-ai')).toBe(false);
    expect(
      repository.data.claims.some(
        (c) => c.subject === 'zhipu' && c.predicate === 'unit_of',
      ),
    ).toBe(false);
  });
  it('retains transaction, translation and version limits', () => {
    const c = (id: string) => repository.claims.get('cn-' + id)!;
    expect(c('alibaba-budget').attributes?.transactionStage).toBe('planned');
    expect(c('alibaba-budget').qualification).toContain('at least');
    expect(c('zhipu-convertible').attributes).toMatchObject({
      transactionType: 'convertible_debt',
      transactionStage: 'contracted',
      amount: { value: 400000000, currency: 'CNY' },
    });
    expect(c('deepseek-h800').attributes?.quantity?.value).toBe(2048);
    expect(c('zhipu-profile').time.kind).toBe('unknown');
    expect(c('deepseek-r1-license').qualification).toContain('Model Agreement');
    expect(c('r1-qwen').object).toEqual({
      kind: 'entity',
      entityId: 'qwen25-announcement',
    });
  });
});
