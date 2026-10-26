import lineage from '../../review/intellectual-lineage-increment.json';
import { createHash } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import increment from '../../review/people-diaspora-increment.json';
import { preSortNameRepository as repository } from '../editorial/pre-sort-name-data';
import {
  preCorrectionData,
  preCorrectionRepository,
} from '../editorial/pre-correction-data';
const { entities, claims, sources, evidence } = preCorrectionData;

const addedClaims = preCorrectionRepository.data.claims.filter((c) =>
  increment.newClaimIds.includes(c.id),
);
const claim = (id: string) => repository.claims.get(id)!;

describe('people diaspora research boundaries', () => {
  it('preserves every original record, including all prior review states', () => {
    for (const [key, rows, newIds] of [
      ['entities', entities, increment.newEntityIds],
      ['claims', claims, increment.newClaimIds],
      ['sources', sources, increment.newSourceIds],
      ['evidence', evidence, increment.newEvidenceIds],
    ] as const) {
      const original = rows.filter(
        (r) =>
          lineage.baseline[key].ids.includes(r.id) && !newIds.includes(r.id),
      );
      expect(original).toHaveLength(increment.baseline[key].count);
      expect(
        createHash('sha256').update(JSON.stringify(original)).digest('hex'),
      ).toBe(increment.baseline[key].sha256);
      expect(new Set(rows.map((r) => r.id)).size).toBe(rows.length);
      expect(new Set(newIds).size).toBe(newIds.length);
      expect(newIds.every((id) => rows.some((r) => r.id === id))).toBe(true);
    }
  });
  it('retains resolvable evidence and endpoints with no human promotion or invented transfers', () => {
    expect(addedClaims).toHaveLength(47);
    for (const c of addedClaims) {
      expect(['held_role', 'co_founded', 'departure_announced']).toContain(
        c.predicate,
      );
      expect(c.editorialState).toBe('seed');
      expect(repository.entities.get(c.subject)?.type).toBe('person');
      expect(c.object.kind).toBe('entity');
      if (c.object.kind === 'entity')
        expect(repository.entities.has(c.object.entityId)).toBe(true);
      expect(c.evidenceIds.length).toBeGreaterThan(0);
      for (const id of c.evidenceIds) {
        const e = preCorrectionData.evidence.find((e) => e.id === id)!;
        expect(e.claimId).toBe(c.id);
        expect(e.verification).toBe('machine_checked');
        expect('reviewer' in e).toBe(false);
        expect(repository.sources.has(e.sourceId)).toBe(true);
        expect(e.locator.length).toBeGreaterThan(0);
        expect(e.passage.length).toBeGreaterThan(0);
      }
    }
  });
  it('retains month/year precision and keeps snapshots distinct from tenures', () => {
    expect(claim('zhang-brain-student-2019').time).toMatchObject({
      kind: 'interval',
      from: '2019-02',
      until: '2019-05',
    });
    expect(claim('zhang-brain-intern-2019').time).toMatchObject({
      kind: 'interval',
      from: '2019-06',
      until: '2019-11',
    });
    expect(claim('zhang-deepmind-intern-2021').time).toMatchObject({
      kind: 'interval',
      from: '2021-05',
      until: '2021-10',
    });
    expect(claim('kingma-openai-research-2015-2018').time).toMatchObject({
      kind: 'interval',
      from: '2015',
      until: '2018',
    });
    expect(claim('kingma-brain-research-prior').time.kind).toBe('unknown');
    expect(claim('kingma-anthropic-research-from-2024').time).toMatchObject({
      kind: 'interval',
      from: '2024',
    });
    expect(
      claim('kingma-anthropic-research-from-2024').time,
    ).not.toHaveProperty('until');
    expect(claim('karpathy-brain-intern-2011').time).toMatchObject({
      kind: 'snapshot',
      date: '2011',
    });
    expect(claim('kaplan-anthropic-cso-2024').time).toMatchObject({
      kind: 'snapshot',
      date: '2024-10-15',
    });
    expect(
      claim('jared-kaplan-openai-affiliation-2020').qualification,
    ).toContain('not establish employee/contractor');
  });
  it('keeps announcement dates distinct from effective departures', () => {
    const gross = claim('gross-ssi-departure-announced-2025');
    expect(gross.time).toMatchObject({
      kind: 'event',
      date: '2025-07-03',
      basis: 'announcement',
    });
    expect(gross.time.note).toContain('June 29, 2025');
    const sutskever = claim('sutskever-openai-departure-announced-2024');
    expect(sutskever.time).toMatchObject({
      kind: 'event',
      date: '2024-05-14',
      basis: 'announcement',
    });
    expect(sutskever.time.note).toContain(
      'does not establish a final working day',
    );
  });
});
