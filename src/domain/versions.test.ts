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
import { repository } from './repository';
import { datasetSchema } from './schema';
import { dateOf, queryDataset, timeLabel } from './query';
import {
  frameworkVersions,
  versionNeighbours,
  versionDescription,
} from './versions';
import { renderSeedReview } from '../editorial/seed-review';
import order from '../../review/governance-version-order.json';
import capitalOrder from '../../review/capital-compute-order.json';
import seedOrder from '../../review/seed-order.json';
import personnelOrder from '../../review/personnel-continuity-order.json';

const data = repository.data;
const ids = order.flatMap((g) => g.claimIds);
const newClaims = data.claims.filter((c) => ids.includes(c.id));
describe('governance version history', () => {
  it('preserves initial identities and groups exact versions without duplicating releases', () => {
    const rsp = frameworkVersions(data, 'anthropic-rsp');
    expect(rsp.map((e) => e.documentVersion!.label)).toEqual([
      'v1.0',
      'v2.0',
      'v2.1',
      'v2.2',
      'v3.0',
      'v3.1',
      'v3.2',
      'v3.3',
      'v3.4',
    ]);
    expect(rsp[0].id).toBe('rsp-2023');
    expect(frameworkVersions(data, 'deepmind-fsf').map((e) => e.id)).toEqual([
      'fsf-2024',
      'fsf-v2-0',
      'fsf-v3-0',
      'fsf-v3-1',
    ]);
    expect(frameworkVersions(data, 'openai-preparedness')).toHaveLength(2);
    expect(frameworkVersions(data, 'xai-faif')).toHaveLength(2);
    const changed = structuredClone(data);
    changed.entities.push({ ...rsp[0], id: 'duplicate-initial-version' });
    expect(datasetSchema.safeParse(changed).success).toBe(false);
  });
  it('points replacements backward while keeping distinct changes on the same pair', () => {
    const neighbours = versionNeighbours(data.claims, 'rsp-v3-0');
    expect(neighbours.predecessors.map((c) => c.id)).toEqual([
      'supersedes-rsp-3-0',
    ]);
    expect(neighbours.successors.map((c) => c.subject)).toEqual(['rsp-v3-1']);
    const pair = data.claims.filter(
      (c) =>
        c.subject === 'rsp-v3-0' &&
        c.object.kind === 'entity' &&
        c.object.entityId === 'rsp-v2-2',
    );
    expect(pair.map((c) => c.id).sort()).toEqual([
      'provchange-rsp-v3-0-ceo-rso-decision-board-ltbt-informed',
      'provchange-rsp-v3-0-misuse-uplift-threshold',
      'rsp-v3-0-assessed-weakening',
      'rsp-v3-company-industry-split',
      'rsp-v3-risk-reports',
      'rsp-v3-roadmaps',
      'supersedes-rsp-3-0',
    ]);
    const focused = queryDataset(data, {
      topic: 'all',
      entityType: 'all',
      throughYear: 2026,
      focusId: 'rsp-v3-0',
    });
    expect(pair.every((c) => focused.claims.includes(c))).toBe(true);
  });
  it('rejects cycles and reversed chronology', () => {
    for (const kind of ['cycle', 'reverse']) {
      const changed = structuredClone(data);
      const c = changed.claims.find((c) => c.id === 'supersedes-rsp-2-0')!;
      c.subject = kind === 'cycle' ? 'rsp-v2-0' : 'rsp-v2-1';
      c.object = {
        kind: 'entity',
        entityId: kind === 'cycle' ? 'rsp-v3-4' : 'rsp-v2-2',
      };
      const result = datasetSchema.safeParse(changed);
      expect(result.success).toBe(false);
      if (!result.success)
        expect(
          result.error.issues.some((i) =>
            i.message.includes(kind === 'cycle' ? 'cycle' : 'later version'),
          ),
        ).toBe(true);
    }
  });
  it('preserves separate publication, effective and revision dates', () => {
    const rsp = repository.entities.get('rsp-v3-4')!;
    expect(rsp.documentVersion?.publishedAt).toBeUndefined();
    expect(rsp.documentVersion?.effectiveAt).toBe('2026-07-08');
    expect(timeLabel(repository.claims.get('issued-rsp-3-4')!)).toBe(
      '2026-07-08 · effective',
    );
    expect(
      repository.entities.get('faif-2025')?.documentVersion?.revisedAt,
    ).toBe('2025-12-30');
    const changed = structuredClone(data);
    changed.entities.find(
      (e) => e.id === 'rsp-v3-4',
    )!.documentVersion!.publishedAt = '2026-07-01';
    const parsed = datasetSchema
      .parse(changed)
      .entities.find((e) => e.id === 'rsp-v3-4')!;
    expect(versionDescription(parsed)).toContain(
      'Published 2026-07-01 · Effective 2026-07-08',
    );
    expect(
      repository.sources.get('source-faif-2025')?.publicationDate,
    ).toBeNull();
  });
  it('requires exact evidence from both compared versions and an inference rationale', () => {
    const id = 'faif-2026-compliance-sentence';
    const c = repository.claims.get(id)!;
    expect(c.derivation).toBe('inferred');
    expect(c.attributes?.changeBasis).toBe('document_comparison');
    for (const side of ['later', 'earlier', 'rationale', 'explicit'] as const) {
      const changed = structuredClone(data);
      const claim = changed.claims.find((c) => c.id === id)!;
      if (side === 'rationale') delete claim.inferenceRationale;
      else if (side === 'explicit') claim.derivation = 'explicit';
      else {
        const source = changed.sources.find(
          (s) => s.id === 'source-faif-' + (side === 'later' ? '2026' : '2025'),
        )!;
        delete source.documentId;
      }
      expect(datasetSchema.safeParse(changed).success).toBe(false);
    }
  });
  it('does not turn recency or a family reference into supersession', () => {
    expect(
      data.claims.filter(
        (c) =>
          c.predicate === 'supersedes_document' &&
          c.subject.startsWith('faif-'),
      ),
    ).toEqual([]);
    expect(
      data.claims
        .filter(
          (c) =>
            c.subject === 'frontier-governance-2026' &&
            c.object.kind === 'entity' &&
            // Week 4b's quoted link to California SB 53 is not a version relation.
            c.predicate !== 'references_commitment',
        )
        .map((c) => c.predicate),
    ).toEqual(['applies_framework']);
    expect(repository.claims.get('fgf-applies-preparedness')?.object).toEqual({
      kind: 'entity',
      entityId: 'openai-preparedness',
    });
    expect(repository.entities.get('openai-preparedness')?.subtype).toBe(
      'Framework family',
    );
    const changed = structuredClone(data);
    changed.claims.find((c) => c.id === 'fgf-applies-preparedness')!.object = {
      kind: 'entity',
      entityId: 'intelligence-explosion',
    };
    expect(datasetSchema.safeParse(changed).success).toBe(false);
  });
  it('rejects inconsistent family identities and cross-family version replacements', () => {
    for (const mode of ['publisher', 'family', 'relation']) {
      const changed = structuredClone(data);
      if (mode === 'publisher')
        changed.entities.find(
          (e) => e.id === 'rsp-v2-0',
        )!.documentVersion!.publisherId = 'openai';
      if (mode === 'family')
        changed.entities.find(
          (e) => e.id === 'rsp-v2-0',
        )!.documentVersion!.family = 'openai';
      if (mode === 'relation')
        changed.claims.find((c) => c.id === 'supersedes-rsp-2-0')!.object = {
          kind: 'entity',
          entityId: 'fsf-2024',
        };
      expect(datasetSchema.safeParse(changed).success).toBe(false);
    }
  });
  it('filters framework history cumulatively without dropping parallel claims or family references', () => {
    const filters = {
      topic: 'governance',
      entityType: 'all',
      throughYear: 2026,
      focusId: null,
      frameworkFamily: 'anthropic-rsp',
    } as const;
    // Counts before week 4a stay fixed; its provision records are additions.
    const added = new Set([
      ...week4a.added.claims,
      ...week4b.added.claims,
      ...week4c.added.claims,
      ...thoughtSpine.added.claims,
      ...yudkowsky.added.claims,
      ...frontierGovernance.added.claims,
      ...frontierGovernance2.added.claims,
      ...economics.added.claims,
    ]);
    const prior = (claims: typeof data.claims) =>
      claims.filter((c) => !added.has(c.id));
    const result = queryDataset(data, filters);
    expect(prior(result.claims)).toHaveLength(26);
    expect(
      prior(result.claims).filter((c) => c.subject === 'rsp-v3-0'),
    ).toHaveLength(4);
    expect(result.claims.some((c) => c.predicate === 'states_provision')).toBe(
      true,
    );
    const earlier = queryDataset(data, { ...filters, throughYear: 2024 });
    expect(prior(earlier.claims)).toHaveLength(4);
    expect(earlier.claims.every((c) => (dateOf(c) ?? '') < '2025')).toBe(true);
    const pf = queryDataset(data, {
      ...filters,
      frameworkFamily: 'openai-preparedness',
    });
    expect(pf.claims.some((c) => c.id === 'fgf-applies-preparedness')).toBe(
      true,
    );
  });
  it('contains exactly the new machine-checked seeds and generates empty human fields', () => {
    expect(ids).toHaveLength(45);
    const oldIds = [...seedOrder, ...personnelOrder, ...capitalOrder].flatMap(
      (g) => g.claimIds,
    );
    expect(
      new Set([
        ...ids,
        ...oldIds,
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
    expect(newClaims.every((c) => c.editorialState === 'seed')).toBe(true);
    expect(
      data.evidence
        .filter((e) => ids.includes(e.claimId))
        .every((e) => e.verification === 'machine_checked' && !e.reviewer),
    ).toBe(true);
    const review = renderSeedReview(data, order, {
      selection: true,
      title: 'governance version review',
    });
    expect(review.match(/^\*\*Human decision:\*\*$/gm)).toHaveLength(45);
    expect(review.match(/^\*\*Notes:\*\*$/gm)).toHaveLength(45);
    expect(review.match(/^### \d\d · /gm)).toHaveLength(45);
    expect(review).toContain('INFERRED DOCUMENT COMPARISON');
    expect(review).toContain('Document predecessor / successor');
    for (const id of oldIds) expect(review).not.toContain('`' + id + '`');
    expect(review).toBe(
      renderSeedReview(data, order, {
        selection: true,
        title: 'governance version review',
      }),
    );
  });
});
