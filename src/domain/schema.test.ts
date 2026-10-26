import { describe, expect, it } from 'vitest';
import { datasetSchema, historicalDate, type Dataset } from './schema';
import { repository, createRepository } from './repository';

const copy = () => structuredClone(repository.data);
describe('dataset integrity and evidence gates', () => {
  it('validates the real research sample', () => {
    expect(() => createRepository(repository.data)).not.toThrow();
    expect(repository.data.claims.every((c) => c.evidenceIds.length > 0)).toBe(
      true,
    );
  });
  const mutations: [string, (data: Dataset) => void][] = [
    [
      'duplicate stable IDs',
      (d) => {
        d.entities[1].id = d.entities[0].id;
      },
    ],
    [
      'dangling entity',
      (d) => {
        d.claims[0].subject = 'missing-person';
      },
    ],
    [
      'wrong predicate subject type',
      (d) => {
        d.claims[0].subject = 'openai';
      },
    ],
    [
      'wrong predicate object type',
      (d) => {
        d.claims[0].object = { kind: 'entity', entityId: 'ij-good' };
      },
    ],
    [
      'dangling source',
      (d) => {
        d.evidence[0].sourceId = 'missing-source';
      },
    ],
    [
      'mismatched evidence backlink',
      (d) => {
        d.evidence[0].claimId = d.claims[1].id;
      },
    ],
    [
      'empty support',
      (d) => {
        d.evidence[0].support = 'context';
      },
    ],
    [
      'inference without rationale',
      (d) => {
        d.claims[0].derivation = 'inferred';
      },
    ],
    [
      'explicit claim carrying inference rationale',
      (d) => {
        d.claims[0].inferenceRationale = 'Synthetic rationale';
      },
    ],
    [
      'unsubstantiated dispute',
      (d) => {
        d.claims[0].resolution = 'contested';
      },
    ],
    [
      'fabricated human approval',
      (d) => {
        d.claims[0].editorialState = 'accepted';
      },
    ],
    [
      'human review without a reviewer',
      (d) => {
        d.evidence[0].verification = 'human_reviewed';
      },
    ],
    [
      'unsafe source URL',
      (d) => {
        d.sources[0].evidenceUrl = 'javascript:alert(1)';
      },
    ],
    [
      'reversed validity interval',
      (d) => {
        d.claims[0].time = {
          kind: 'interval',
          from: '2024',
          until: '2023',
          note: 'Synthetic test interval',
        };
      },
    ],
    [
      'unknown interval with no boundaries',
      (d) => {
        d.claims[0].time = {
          kind: 'interval',
          note: 'Synthetic test interval',
        };
      },
    ],
    [
      'orphan evidence',
      (d) => {
        d.evidence.push({ ...d.evidence[0], id: 'orphan-evidence' });
      },
    ],
    [
      'unreferenced evidence',
      (d) => {
        d.claims[0].evidenceIds = ['missing-evidence'];
      },
    ],
    [
      'round total on investor contribution',
      (d) => {
        const c = d.claims.find(
          (c) => c.predicate === 'participated_in_round',
        )!;
        c.attributes = {
          transactionStage: 'announced',
          amount: {
            value: 6e9,
            currency: 'USD',
            bound: 'exact',
            scope: 'round_total',
          },
        };
      },
    ],
    [
      'amount with no transaction stage',
      (d) => {
        const c = d.claims.find((c) => c.attributes?.amount)!;
        delete c.attributes!.transactionStage;
      },
    ],
  ];
  it.each(mutations)('rejects %s', (_, mutate) => {
    const d = copy();
    mutate(d);
    expect(datasetSchema.safeParse(d).success).toBe(false);
  });
  it('permits real editorial acceptance only with attributed human review', () => {
    const d = copy();
    d.claims[0].editorialState = 'accepted';
    d.evidence[0].verification = 'human_reviewed';
    d.evidence[0].reviewer = 'synthetic-test-editor';
    expect(datasetSchema.safeParse(d).success).toBe(true);
  });
  it('preserves all claims between the same endpoints', () => {
    const records = repository.data.claims.filter(
      (c) =>
        (c.subject === 'microsoft' &&
          c.object.kind === 'entity' &&
          c.object.entityId === 'openai') ||
        (c.subject === 'openai' &&
          c.object.kind === 'entity' &&
          c.object.entityId === 'microsoft'),
    );
    expect(records.map((c) => c.predicate).sort()).toEqual([
      'cloud_terms',
      'cloud_terms',
      'cloud_terms',
      'cloud_terms',
      'cloud_terms',
      'compute_capacity',
      'investment_announced',
      'investment_announced',
      'selected_cloud_provider',
      'selected_cloud_provider',
    ]);
  });
});
describe('calendar precision', () => {
  it.each([
    ['2023-02', '2023', true],
    ['2023', '2023-02', true],
    ['2024-02-29', '2024-02', true],
    ['2024-03-01', '2024-02', false],
    ['2024-03', '2024-02', false],
  ] as const)(
    'checks interval %s to %s without inventing precision',
    (from, until, valid) => {
      const data = copy();
      data.claims[0].time = {
        kind: 'interval',
        from,
        until,
        note: 'Synthetic mixed-precision test',
      };
      expect(datasetSchema.safeParse(data).success).toBe(valid);
    },
  );

  it.each(['1965', '2024-02', '2024-02-29'])(
    'accepts %s without inventing precision',
    (date) => expect(historicalDate.parse(date)).toBe(date),
  );
  it.each(['2023-02-29', '2024-13', '2024-04-31', '24-01-01'])(
    'rejects %s',
    (date) => expect(historicalDate.safeParse(date).success).toBe(false),
  );
});
