import { describe, expect, it } from 'vitest';
import { datasetSchema } from './schema';
import { repository } from './repository';
import {
  derivationLabels,
  resolutionLabels,
  evidenceSummary,
} from './epistemics';

const copy = () => structuredClone(repository.data);
describe('independent epistemic, evidence and review dimensions', () => {
  it.each(['primary', 'secondary'] as const)(
    'allows explicit support through %s evidence without human review',
    (sourceRole) => {
      const data = copy();
      data.evidence[0].sourceRole = sourceRole;
      expect(datasetSchema.parse(data).claims[0]).toMatchObject({
        derivation: 'explicit',
        resolution: 'supported',
        editorialState: 'seed',
      });
      expect(data.evidence[0].verification).toBe('machine_checked');
    },
  );
  it('represents an unresolved claim with only context evidence', () => {
    const data = copy();
    data.claims[0].resolution = 'unresolved';
    data.claims[0].derivation = 'posed';
    data.evidence[0].support = 'context';
    expect(datasetSchema.safeParse(data).success).toBe(true);
  });
  it('never records an unresolved question as stated in a source', () => {
    const data = copy();
    data.claims[0].resolution = 'unresolved';
    data.evidence[0].support = 'context';
    expect(data.claims[0].derivation).toBe('explicit');
    expect(datasetSchema.safeParse(data).success).toBe(false);
    // Earlier schema versions stay readable as stored.
    data.meta.schemaVersion = '2.9';
    expect(datasetSchema.safeParse(data).success).toBe(true);
  });
  it('rejects a posed question recorded as supported or carrying an inference rationale', () => {
    const supported = copy();
    supported.claims[0].derivation = 'posed';
    expect(datasetSchema.safeParse(supported).success).toBe(false);
    const rationale = copy();
    rationale.claims[0].derivation = 'posed';
    rationale.claims[0].resolution = 'unresolved';
    rationale.evidence[0].support = 'context';
    rationale.claims[0].inferenceRationale = 'Synthetic premise.';
    expect(datasetSchema.safeParse(rationale).success).toBe(false);
  });
  it.each(['supports', 'contradicts'] as const)(
    'rejects an unresolved claim with %s evidence',
    (support) => {
      const data = copy();
      data.claims[0].resolution = 'unresolved';
      data.evidence[0].support = support;
      expect(datasetSchema.safeParse(data).success).toBe(false);
    },
  );
  it.each(['explicit', 'inferred'] as const)(
    'retains supporting and contradictory evidence for a contested %s claim',
    (derivation) => {
      const data = copy();
      data.claims[0].resolution = 'contested';
      data.claims[0].derivation = derivation;
      if (derivation === 'inferred')
        data.claims[0].inferenceRationale =
          'Synthetic test premise and inference; not a factual seed.';
      const counter = {
        ...data.evidence[0],
        id: 'synthetic-counterevidence',
        support: 'contradicts' as const,
        sourceRole: 'secondary' as const,
      };
      data.evidence.push(counter);
      data.claims[0].evidenceIds.push(counter.id);
      const result = datasetSchema.parse(data);
      expect(result.claims[0].evidenceIds).toHaveLength(2);
      expect(result.claims[0].editorialState).toBe('seed');
    },
  );
  it('rejects a contested claim with counterevidence but no supporting evidence', () => {
    const data = copy();
    data.claims[0].resolution = 'contested';
    data.evidence[0].support = 'contradicts';
    expect(datasetSchema.safeParse(data).success).toBe(false);
  });
  it('retains context and counterevidence after an explicitly qualified supported assessment', () => {
    const data = copy();
    const counter = {
      ...data.evidence[0],
      id: 'synthetic-counterevidence',
      support: 'contradicts' as const,
    };
    data.evidence.push(counter);
    data.claims[0].evidenceIds.push(counter.id);
    data.claims[0].qualification =
      'Synthetic adjudication explains why opposing evidence does not overturn the scoped proposition.';
    expect(datasetSchema.safeParse(data).success).toBe(true);
  });
  it('does not promote a seed when evidence receives a synthetic human check', () => {
    const data = copy();
    data.evidence[0].verification = 'human_reviewed';
    data.evidence[0].reviewer = 'synthetic-test-editor';
    expect(datasetSchema.parse(data).claims[0].editorialState).toBe('seed');
  });
  it('permits editorial acceptance of a reviewed unresolved record without inventing support', () => {
    const data = copy();
    data.claims[0].resolution = 'unresolved';
    data.claims[0].derivation = 'posed';
    data.claims[0].editorialState = 'accepted';
    data.evidence[0].support = 'context';
    data.evidence[0].verification = 'human_reviewed';
    data.evidence[0].reviewer = 'synthetic-test-editor';
    expect(datasetSchema.safeParse(data).success).toBe(true);
  });
  it('rejects a fabricated reviewer attached to a machine check', () => {
    const data = copy();
    data.evidence[0].reviewer = 'synthetic-test-editor';
    expect(datasetSchema.safeParse(data).success).toBe(false);
  });
  it('rejects legacy mixed status fields', () => {
    const data = copy();
    expect(
      datasetSchema.safeParse({
        ...data,
        claims: [
          { ...data.claims[0], status: 'documented' },
          ...data.claims.slice(1),
        ],
      }).success,
    ).toBe(false);
  });
  it('counts unique sources by evidence role without rating truth or independence', () => {
    const evidence = repository.data.evidence[0];
    const summary = evidenceSummary([
      evidence,
      { ...evidence, id: 'synthetic-duplicate' },
      {
        ...evidence,
        id: 'synthetic-secondary',
        sourceId: 'synthetic-source',
        sourceRole: 'secondary',
      },
      { ...evidence, id: 'synthetic-counter', support: 'contradicts' },
      { ...evidence, id: 'synthetic-context', support: 'context' },
    ]);
    expect(summary).toBe(
      'Supporting evidence: primary + secondary · 2 sources; Counterevidence: primary · 1 source; Context: primary · 1 source',
    );
    expect(derivationLabels.inferred).toBe('Inferred');
    expect(derivationLabels.posed).toBe('Question posed by Selekoa');
    expect(resolutionLabels.unresolved).toBe('Unresolved');
  });
});
