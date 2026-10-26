import xmOrder from '../../review/xai-meta-order.json';
import week4a from '../../review/week4a-before-2026-10-03.json';
import week4b from '../../review/week4b-before-2026-10-04.json';
import week4c from '../../review/week4c-before-2026-10-04.json';
import thoughtSpine from '../../review/thought-spine-before-2026-10-06.json';
import yudkowsky from '../../review/yudkowsky-admission-before-2026-10-08.json';
import frontierGovernance from '../../review/frontier-governance-before-2026-10-10.json';
import frontierGovernance2 from '../../review/frontier-governance-2-before-2026-10-11.json';
import economics from '../../review/economics-admission-before-2026-10-14.json';
import researchDebt from '../../review/research-debt-before-2026-10-15.json';
import esoteric from '../../review/esoteric-admission-before-2026-10-16.json';
import genealogy from '../../review/genealogy-admission-before-2026-10-17.json';
import recheckCorrections from '../../review/recheck-corrections-before-2026-10-25.json';
import chinaOrder from '../../review/china-atlas-order.json';
import ontology from '../../review/evaluation-ontology-i-increment.json';
import atlasOrder from '../../review/institutional-atlas-order.json';
import evaluation from '../../review/evaluation-institutions-i-increment.json';
import capitalII from '../../review/capital-ii-increment.json';
import lineageII from '../../review/intellectual-lineage-ii-increment.json';
import lineage from '../../review/intellectual-lineage-increment.json';
import diaspora from '../../review/people-diaspora-increment.json';
import { describe, expect, it } from 'vitest';
import { MultiDirectedGraph } from 'graphology';
import { repository } from './repository';
import { datasetSchema } from './schema';
import { queryDataset, relationshipClaims } from './query';
import { addClaimEdges } from '../ui/claimEdges';
import { renderSeedReview } from '../editorial/seed-review';
import order from '../../review/capital-compute-order.json';
import seed from '../../review/seed-order.json';
import people from '../../review/personnel-continuity-order.json';
import governance from '../../review/governance-version-order.json';

const data = repository.data;
const ids = order.flatMap((g) => g.claimIds);
const claim = (id: string) => repository.claims.get(id)!;
const attrs = (id: string) => claim(id).attributes!;
describe('capital and compute transaction semantics', () => {
  it('separates announced upper bounds, realised tranches and future conditions', () => {
    expect(attrs('amazon-investment-2023')).toMatchObject({
      transactionStage: 'announced',
      amount: { value: 4e9, bound: 'up_to' },
    });
    expect(attrs('amazon-anthropic-initial-2023')).toMatchObject({
      transactionStage: 'invested',
      amount: { value: 1.25e9, scope: 'transaction' },
    });
    expect(attrs('amazon-anthropic-tranche-2024')).toMatchObject({
      transactionStage: 'invested',
      amount: { value: 2.75e9 },
    });
    expect(attrs('amazon-anthropic-new-2024')).toMatchObject({
      transactionStage: 'announced',
      amount: { value: 4e9, scope: 'transaction' },
    });
    expect(attrs('amazon-anthropic-conditional-2026')).toMatchObject({
      transactionStage: 'announced',
      amount: { value: 20e9, bound: 'up_to' },
    });
    expect(attrs('amazon-anthropic-conditional-2026').conditions).toContain(
      'milestones',
    );
    expect(attrs('anthropic-aws-commitment-2026')).toMatchObject({
      transactionStage: 'committed',
      amount: { bound: 'more_than' },
      quantity: { bound: 'up_to' },
    });
  });
  it('rejects promotion of plans and announcements to realised investment or deployment', () => {
    for (const id of [
      'amazon-anthropic-tranche-2024',
      'amazon-anthropic-conditional-2026',
      'xai-colossus-expansion-plan-2024',
    ]) {
      const copy = structuredClone(data);
      const c = copy.claims.find((c) => c.id === id)!;
      c.attributes!.transactionStage =
        id === 'amazon-anthropic-tranche-2024' ? 'announced' : 'operational';
      expect(datasetSchema.safeParse(copy).success).toBe(false);
    }
    expect(attrs('xai-colossus-expansion-plan-2024').transactionStage).toBe(
      'planned',
    );
    expect(attrs('xai-colossus-grok4-2025').transactionStage).toBe(
      'operational',
    );
    expect(attrs('openai-coreweave-contract-2025')).toMatchObject({
      transactionStage: 'contracted',
      amount: { bound: 'up_to', value: 11.9e9 },
    });
  });
  it('keeps a closed round total separate from an investor contribution and graph nodes', () => {
    expect(attrs('xai-series-c-total-2024')).toMatchObject({
      transactionStage: 'closed',
      amount: { value: 6e9, scope: 'round_total' },
    });
    expect(attrs('nvidia-xai-series-c-2024').amount).toBeUndefined();
    const copy = structuredClone(data);
    copy.claims.find(
      (c) => c.id === 'nvidia-xai-series-c-2024',
    )!.attributes!.amount = attrs('xai-series-c-total-2024').amount;
    expect(datasetSchema.safeParse(copy).success).toBe(false);
    const other = structuredClone(data);
    other.claims.find((c) => c.id === 'xai-series-c-total-2024')!.object = {
      kind: 'literal',
      value: 7e9,
      unit: 'USD',
    };
    expect(datasetSchema.safeParse(other).success).toBe(false);
    expect(relationshipClaims(data.claims).map((c) => c.id)).not.toContain(
      'xai-series-c-total-2024',
    );
    expect(relationshipClaims(data.claims).map((c) => c.id)).not.toContain(
      'stargate-spending-plan-2025',
    );
  });
  it('retains multiple cloud providers and dated changes instead of replacing history', () => {
    const result = queryDataset(data, {
      topic: 'compute',
      entityType: 'all',
      throughYear: 2024,
      focusId: 'anthropic',
    });
    expect(result.claims.map((c) => c.id)).toEqual(
      expect.arrayContaining([
        'anthropic-cloud-2023',
        'anthropic-google-cloud-2023',
        'anthropic-google-nonexclusive-2024',
      ]),
    );
    const earlier = queryDataset(data, {
      topic: 'compute',
      entityType: 'all',
      throughYear: 2024,
      focusId: 'openai',
    });
    expect(earlier.claims.map((c) => c.id)).toContain('openai-cloud-2023');
    expect(earlier.claims.map((c) => c.id)).not.toContain(
      'openai-azure-rofr-jan-2025',
    );
    const later = queryDataset(data, {
      topic: 'compute',
      entityType: 'all',
      throughYear: 2025,
      focusId: 'openai',
    });
    expect(later.claims.map((c) => c.id)).toEqual(
      expect.arrayContaining([
        'openai-cloud-2023',
        'openai-azure-rofr-jan-2025',
        'openai-azure-rofr-oct-2025',
        'openai-azure-api-jan-2025',
      ]),
    );
    expect(ids.map(claim).every((c) => !c.supersedes)).toBe(true);
  });
  it('keeps same-counterparty capital, terms and service contracts as independent graph edges', () => {
    const g = new MultiDirectedGraph();
    for (const e of data.entities) g.addNode(e.id);
    addClaimEdges(g, data.claims);
    const pair = relationshipClaims(data.claims).filter(
      (c) =>
        [c.subject, c.object.entityId].sort().join(':') === 'microsoft:openai',
    );
    expect(pair.length).toBe(10);
    expect(new Set(pair.map((c) => c.predicate)).size).toBe(4);
    for (const c of pair) expect(g.hasEdge(c.id)).toBe(true);
    expect(g.size).toBe(relationshipClaims(data.claims).length);
  });
  it('keeps internal resources and equipment configuration separate from external purchases', () => {
    for (const id of [
      'deepmind-gemini-internal-compute-2023',
      'gemini-training-tpu-v4-2023',
    ]) {
      expect(attrs(id).relationshipContext).toBe('internal');
      expect(attrs(id).amount).toBeUndefined();
      const copy = structuredClone(data);
      copy.claims.find((c) => c.id === id)!.attributes!.amount = {
        value: 1,
        currency: 'USD',
        bound: 'exact',
        scope: 'transaction',
      };
      expect(datasetSchema.safeParse(copy).success).toBe(false);
    }
    expect(attrs('gemini-training-tpu-v4-2023').quantity?.unit).toContain(
      'per SuperPod',
    );
    expect(attrs('anthropic-google-capacity-2026').conditions).toBe(
      attrs('anthropic-broadcom-capacity-2026').conditions,
    );
  });
  it('requires explicit stage, context and bounds on newly typed records', () => {
    for (const field of [
      'transactionStage',
      'relationshipContext',
      'quantity',
    ] as const) {
      const copy = structuredClone(data);
      const a = copy.claims.find(
        (c) => c.id === 'rainier-trainium2-2025',
      )!.attributes!;
      if (field === 'quantity') delete a.quantity!.bound;
      else delete a[field];
      expect(datasetSchema.safeParse(copy).success).toBe(false);
    }
  });
  it('selects exactly this increment and preserves blank human-review fields', () => {
    expect(ids).toHaveLength(37);
    const previous = [...seed, ...people, ...governance].flatMap(
      (g) => g.claimIds,
    );
    expect(ids.filter((id) => previous.includes(id))).toEqual([]);
    expect(
      new Set([
        ...ids,
        ...previous,
        ...diaspora.newClaimIds,
        ...lineage.newClaimIds,
        ...lineageII.newClaimIds,
        ...capitalII.newClaimIds,
        ...evaluation.added.claims,
        ...ontology.added.claims,
        ...atlasOrder.flatMap((g) => g.claimIds),
        ...xmOrder.flatMap((g) => g.claimIds),
        ...chinaOrder.flatMap((g) => g.claimIds),
        ...week4a.added.claims,
        ...week4b.added.claims,
        ...week4c.added.claims,
        ...thoughtSpine.added.claims,
        ...yudkowsky.added.claims,
        ...frontierGovernance.added.claims,
        ...frontierGovernance2.added.claims,
        ...economics.added.claims,
        ...researchDebt.added.claims,
        ...esoteric.added.claims,
        ...genealogy.added.claims,
        ...recheckCorrections.added.claims,
      ]).size,
    ).toBe(data.claims.length);
    for (const id of ids) {
      expect(claim(id).editorialState).toBe('seed');
      for (const eid of claim(id).evidenceIds)
        expect(repository.evidence.get(eid)).toMatchObject({
          verification: 'machine_checked',
        });
    }
    expect(
      data.evidence
        .filter((e) => ids.includes(e.claimId))
        .every((e) => !e.reviewer),
    ).toBe(true);
    const review = renderSeedReview(data, order, {
      selection: true,
      title: 'capital and compute review',
    });
    expect(review.match(/^### \d\d · /gm)).toHaveLength(37);
    expect(review.match(/^\*\*Human decision:\*\*$/gm)).toHaveLength(37);
    expect(review.match(/^\*\*Notes:\*\*$/gm)).toHaveLength(37);
    expect(review).toContain('Transaction stage');
    expect(review).toContain('Quantity / bound / unit');
    for (const id of previous) expect(review).not.toContain('`' + id + '`');
    expect(review).toBe(
      renderSeedReview(data, order, {
        selection: true,
        title: 'capital and compute review',
      }),
    );
  });
});
