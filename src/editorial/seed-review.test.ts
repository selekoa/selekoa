import lineage from '../../review/intellectual-lineage-increment.json';
import increment from '../../review/people-diaspora-increment.json';
const diasporaIds = new Set(increment.newClaimIds);
import { describe, expect, it } from 'vitest';
import { preCorrectionRepository as repository } from './pre-correction-data';
import { renderSeedReview, assertSafeReviewOutput } from './seed-review';
import order from '../../review/seed-order.json';
import personnelOrder from '../../review/personnel-continuity-order.json';

import capitalOrder from '../../review/capital-compute-order.json';
const capitalIds = new Set(capitalOrder.flatMap((g) => g.claimIds));
import governanceOrder from '../../review/governance-version-order.json';
const governanceIds = new Set(governanceOrder.flatMap((g) => g.claimIds));
const allOrder = [
  { title: 'Lineage additions', topic: 'ideas', claimIds: lineage.newClaimIds },
  ...order,
  ...personnelOrder,
  ...governanceOrder,
  ...capitalOrder,
  {
    title: 'Diaspora additions',
    topic: 'people',
    claimIds: increment.newClaimIds,
  },
];
const genesisIds = new Set(order.flatMap((g) => g.claimIds));
const render = (data: unknown, ordering: unknown) =>
  renderSeedReview(data, ordering, { selection: true });

describe('human review pack', () => {
  it('selects exactly the 30 personnel increment claims with blank decisions and inspectable sources', () => {
    const ids = personnelOrder.flatMap((g) => g.claimIds);
    expect(ids).toHaveLength(30);
    expect([...ids].sort()).toEqual(
      repository.data.claims
        .filter(
          (c) =>
            !genesisIds.has(c.id) &&
            !governanceIds.has(c.id) &&
            !capitalIds.has(c.id) &&
            !diasporaIds.has(c.id) &&
            !lineage.newClaimIds.includes(c.id),
        )
        .map((c) => c.id)
        .sort(),
    );
    const text = renderSeedReview(repository.data, personnelOrder, {
      selection: true,
      title: 'personnel continuity review',
    });
    expect(
      text.match(/^### \d\d · `([^`]+)`/gm)?.map((h) => h.split('`')[1]),
    ).toEqual(ids);
    expect(text.match(/^\*\*Human decision:\*\*$/gm)).toHaveLength(30);
    expect(text.match(/^\*\*Notes:\*\*$/gm)).toHaveLength(30);
    expect(text.match(/^#### Evidence /gm)).toHaveLength(30);
    expect(text).toContain('Unknown; not inferred from access date');
    for (const id of genesisIds) expect(text).not.toContain('`' + id + '`');
    for (const evidence of repository.data.evidence.filter((e) =>
      ids.includes(e.claimId),
    )) {
      const source = repository.sources.get(evidence.sourceId)!;
      for (const url of [source.canonicalUrl, source.evidenceUrl]) {
        expect(new URL(url).protocol).toMatch(/^https?:$/);
        expect(new URL(url).pathname).not.toMatch(/^\/search\/?$/);
        expect(text).toContain(url);
      }
      expect(evidence.verification).toBe('machine_checked');
    }
  });
  it('rejects unknown, duplicate, accepted and incorrectly grouped selections', () => {
    for (const kind of ['unknown', 'duplicate', 'accepted', 'wrong group']) {
      const data = structuredClone(repository.data);
      const selected = structuredClone(personnelOrder);
      if (kind === 'unknown') selected[0].claimIds[0] = 'unknown-claim';
      if (kind === 'duplicate')
        selected[0].claimIds.push(selected[0].claimIds[0]);
      if (kind === 'wrong group') selected[0].topic = 'compute';
      if (kind === 'accepted') {
        const claim = data.claims.find(
          (c) => c.id === selected[0].claimIds[0],
        )!;
        claim.editorialState = 'accepted';
        const evidence = data.evidence.find(
          (e) => e.id === claim.evidenceIds[0],
        )!;
        evidence.verification = 'human_reviewed';
        evidence.reviewer = 'synthetic-test-editor';
      }
      expect(() => render(data, selected)).toThrow();
    }
  });
  it('is deterministic and leaves every human field empty', () => {
    const before = structuredClone(repository.data);
    const text = render(repository.data, order);
    expect(text).toBe(render(repository.data, order));
    expect(text.match(/^\*\*Human decision:\*\*$/gm)).toHaveLength(28);
    expect(text.match(/^\*\*Notes:\*\*$/gm)).toHaveLength(28);
    expect(text.match(/^### \d\d · /gm)).toHaveLength(28);
    expect(text.match(/^#### Evidence /gm)).toHaveLength(29);
    expect(repository.data).toEqual(before);
  });
  it('includes all exact statements, qualifications, evidence IDs, passages and URLs', () => {
    const text = render(repository.data, order);
    // Undo Markdown escaping solely for comparing rendered factual text.
    const readable = text.replace(/\\([\\`*_{}[\]<>#|])/g, '$1');
    for (const claim of repository.data.claims.filter((c) =>
      genesisIds.has(c.id),
    )) {
      expect(readable).toContain(claim.statement);
      expect(readable).toContain(claim.qualification);
      expect(readable).toContain(claim.time.note);
    }
    const evidenceRecords = repository.data.evidence.filter((e) =>
      genesisIds.has(e.claimId),
    );
    for (const evidence of evidenceRecords) {
      expect(readable).toContain(evidence.id);
      expect(readable).toContain(evidence.passage);
      expect(readable).toContain(evidence.locator);
      expect(readable).toContain(evidence.checkedAt);
    }
    for (const source of repository.data.sources.filter((s) =>
      evidenceRecords.some((e) => e.sourceId === s.id),
    )) {
      expect(readable).toContain(source.canonicalUrl);
      expect(readable).toContain(source.evidenceUrl);
      expect(readable).toContain(source.version);
    }
    expect(text).toContain('Exact source excerpt');
    expect(text).toContain('Paraphrase (not a quotation)');
    expect(readable).toContain('6000000000 USD [literal; no graph edge]');
    expect(text).toContain('2021-12-01');
  });
  it('keeps numbering when the data array is reordered', () => {
    const data = structuredClone(repository.data);
    data.claims.reverse();
    const headings = (text: string) => text.match(/^### .+$/gm);
    expect(headings(render(data, order))).toEqual(
      headings(render(repository.data, order)),
    );
  });
  it.each(['missing', 'duplicate', 'wrong group', 'unknown'] as const)(
    'rejects %s review ordering',
    (kind) => {
      const changed = structuredClone(allOrder);
      if (kind === 'missing') changed[0].claimIds.pop();
      if (kind === 'duplicate')
        changed[0].claimIds.push(changed[0].claimIds[0]);
      if (kind === 'wrong group')
        changed[0] = { ...changed[0], ...{ topic: 'compute' } };
      if (kind === 'unknown') changed[0].claimIds[0] = 'unknown-claim';
      expect(() => renderSeedReview(repository.data, changed)).toThrow();
    },
  );
  it('validates the dataset before generating anything', () => {
    const data = structuredClone(repository.data);
    data.claims[0].evidenceIds = ['missing-evidence'];
    expect(() => render(data, order)).toThrow();
  });
  it.each(['YES', 'EDIT', 'RESEARCH MORE', 'REJECT'])(
    'preserves a working copy with a %s decision',
    (decision) => {
      const text = render(repository.data, order);
      const edited = text.replace(
        '**Human decision:**\n',
        `**Human decision:** ${decision}\n`,
      );
      expect(() => assertSafeReviewOutput(edited, text)).toThrow(
        /Nothing was overwritten/,
      );
    },
  );
  it('protects notes, factual edits and unknown formatting changes too', () => {
    const text = render(repository.data, order);
    for (const edited of [
      text.replace('**Notes:**\n', '**Notes:** Check the date.\n'),
      text + '\n',
      text.replace('co-chair', 'chair'),
    ])
      expect(() => assertSafeReviewOutput(edited, text)).toThrow();
    expect(() => assertSafeReviewOutput(text, text)).not.toThrow();
    expect(() => assertSafeReviewOutput(undefined, text)).not.toThrow();
  });
});
