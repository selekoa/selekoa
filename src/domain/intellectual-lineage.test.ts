import { createHash } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import increment from '../../review/intellectual-lineage-increment.json';
import { preSortNameRepository as repository } from '../editorial/pre-sort-name-data';
import { preCorrectionData } from '../editorial/pre-correction-data';
const { entities, claims, sources, evidence } = preCorrectionData;
import { datasetSchema, claimSchema } from './schema';
import { predicates } from './predicates';

const added = repository.data.claims.filter((c) =>
  increment.newClaimIds.includes(c.id),
);
describe('intellectual lineage documentary boundaries', () => {
  it('preserves every baseline record and review state exactly', () => {
    for (const [key, rows, newIds] of [
      ['entities', entities, increment.newEntityIds],
      ['claims', claims, increment.newClaimIds],
      ['sources', sources, increment.newSourceIds],
      ['evidence', evidence, increment.newEvidenceIds],
    ] as const) {
      const original = rows.filter((r) =>
        increment.baseline[key].ids.includes(r.id),
      );
      expect(original).toHaveLength(increment.baseline[key].count);
      expect(
        createHash('sha256').update(JSON.stringify(original)).digest('hex'),
      ).toBe(increment.baseline[key].sha256);
      expect(rows.filter((r) => newIds.includes(r.id))).toHaveLength(
        newIds.length,
      );
      expect(rows).toHaveLength(original.length + newIds.length);
    }
  });
  it('keeps unproven similarities outside data and never promotes verification', () => {
    expect(added).toHaveLength(39);
    for (const c of added) {
      expect(c.derivation).toBe('explicit');
      expect(c.resolution).toBe('supported');
      expect(c.editorialState).toBe('seed');
      for (const id of c.evidenceIds) {
        const e = repository.evidence.get(id)!;
        expect(e.verification).toBe('machine_checked');
        expect(e.reviewer).toBeUndefined();
        expect(e.locator.trim()).not.toBe('');
        expect(e.passage.trim()).not.toBe('');
      }
    }
    const earlier = new Set([
      'good-1965',
      'iem-2013',
      'ij-good',
      'chalmers-singularity',
    ]);
    const modern = new Set([
      'superalignment-announcement',
      'rsp-2023',
      'rsp-v2-0',
    ]);
    expect(
      repository.data.claims.some(
        (c) =>
          c.object.kind === 'entity' &&
          ((earlier.has(c.subject) && modern.has(c.object.entityId)) ||
            (modern.has(c.subject) && earlier.has(c.object.entityId))),
      ),
    ).toBe(false);
  });
  it('rejects generic influence and retains citation, credit and discussion as different assertions', () => {
    for (const predicate of [
      'influenced_by',
      'inspired_by',
      'related_to',
      'intellectual_descendant_of',
      'similar_to',
    ]) {
      expect(predicates).not.toHaveProperty(predicate);
      expect(claimSchema.safeParse({ ...added[0], predicate }).success).toBe(
        false,
      );
    }
    expect(repository.claims.get('lineage-chalmers-cites-good')).toMatchObject({
      predicate: 'cites',
      object: { entityId: 'good-1965' },
    });
    expect(
      repository.claims.get('lineage-chalmers-credits-good'),
    ).toMatchObject({
      predicate: 'explicitly_credits',
      object: { entityId: 'ij-good' },
    });
    expect(
      repository.claims.get('lineage-superalignment-discusses-rlhf'),
    ).toMatchObject({ predicate: 'discusses', object: { entityId: 'rlhf' } });
    expect(
      repository.claims.get('lineage-superalignment-discusses-rlhf')?.attributes
        ?.method,
    ).toBeUndefined();
  });
  it('accepts reported use but rejects inferred, unsourced and incorrectly scoped substitutes', () => {
    expect(datasetSchema.safeParse(repository.data).success).toBe(true);
    for (const mutation of [
      'inferred',
      'missing-method',
      'wrong-endpoint',
      'secondary',
      'wrong-document',
      'blank-locator',
      'discussion',
    ]) {
      const data = structuredClone(repository.data);
      const c = data.claims.find((c) => c.id === 'lineage-instruct-uses-ppo')!;
      const e = data.evidence.find((e) => e.id === c.evidenceIds[0])!;
      if (mutation === 'inferred') {
        c.derivation = 'inferred';
        c.inferenceRationale = 'Similarity of algorithms, not a use statement.';
      }
      if (mutation === 'missing-method') delete c.attributes?.method;
      if (mutation === 'wrong-endpoint')
        c.object = { kind: 'entity', entityId: 'john-schulman' };
      if (mutation === 'secondary') e.sourceRole = 'secondary';
      if (mutation === 'wrong-document') e.sourceId = 'source-iem';
      if (mutation === 'blank-locator') e.locator = ' ';
      if (mutation === 'discussion') {
        c.predicate = 'discusses';
        c.object = { kind: 'entity', entityId: 'rlhf' };
      }
      expect(datasetSchema.safeParse(data).success, mutation).toBe(false);
    }
  });
  it('retains year precision, exact inspected versions and one identity per concept/work', () => {
    expect(
      repository.claims.get('lineage-chalmers-cites-good')?.time,
    ).toMatchObject({ date: '2010' });
    expect(
      repository.claims.get('lineage-iem-cites-chalmers')?.time,
    ).toMatchObject({ date: '2013' });
    expect(repository.sources.get('source-iem')?.versionDate).toBe(
      '2013-09-13',
    );
    expect(
      repository.sources.get('source-chalmers-singularity')?.versionDate,
    ).toBeUndefined();
    for (const id of increment.newSourceIds) {
      const s = repository.sources.get(id)!;
      if (s.publisher === 'arXiv') {
        expect(s.evidenceUrl).toMatch(/v1$/);
        expect(s.versionDate).toBe(s.publicationDate);
        expect(s.documentId).toBeDefined();
      }
    }
    expect(
      added.some((c) =>
        ['supersedes_document', 'changes_from'].includes(c.predicate),
      ),
    ).toBe(false);
    const conceptNames = repository.data.entities
      .filter((e) => e.type === 'concept')
      .flatMap((e) =>
        [e.name, ...e.aliases].map((n) => n.trim().toLowerCase()),
      );
    expect(new Set(conceptNames).size).toBe(conceptNames.length);
    const workIds = repository.data.entities.flatMap((e) =>
      e.externalIds?.arxiv ? [e.externalIds.arxiv] : [],
    );
    expect(new Set(workIds).size).toBe(workIds.length);
    expect(
      repository.claims.get('risks-discusses-deception-2021')?.time,
    ).toMatchObject({ date: '2021-12-01' });
  });
});
