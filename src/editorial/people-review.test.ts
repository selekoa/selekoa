import lineage from '../../review/intellectual-lineage-increment.json';
import { readFile } from 'node:fs/promises';
import { format, resolveConfig } from 'prettier';
import { describe, expect, it } from 'vitest';
import { preCorrectionRepository as repository } from './pre-correction-data';
import { renderPeopleReview } from './people-review';
import order from '../../review/people-diaspora-order.json';
import increment from '../../review/people-diaspora-increment.json';

// Reproduce the historical pack against its preserved dataset, not later additions.
const historical = {
  meta: lineage.baselineMeta,
  entities: repository.data.entities.filter((r) =>
    lineage.baseline.entities.ids.includes(r.id),
  ),
  claims: repository.data.claims.filter((r) =>
    lineage.baseline.claims.ids.includes(r.id),
  ),
  sources: repository.data.sources.filter((r) =>
    lineage.baseline.sources.ids.includes(r.id),
  ),
  evidence: repository.data.evidence.filter((r) =>
    lineage.baseline.evidence.ids.includes(r.id),
  ),
};
const render = (ordering: unknown = order, manifest: unknown = increment) =>
  renderPeopleReview(historical, ordering, manifest);

describe('person-first review pack', () => {
  it('includes coverage, all exact claim details and mechanical summaries with empty human fields', () => {
    const text = render();
    expect(text).toContain('People: 28.');
    expect(text).toContain('new: 47; unchanged context: 38');
    expect(text.match(/^\*\*Career path summary/gm)).toHaveLength(28);
    expect(
      text.match(/^\*\*Increment membership:\*\* New claim/gm),
    ).toHaveLength(47);
    expect(text.match(/^\*\*Human decision:\*\*$/gm)).toHaveLength(85);
    expect(text.match(/^\*\*Notes:\*\*$/gm)).toHaveLength(85);
    const readable = text.replace(/\\([\\`*_{}[\]<>#|])/g, '$1');
    for (const id of order.flatMap((g) => g.claimIds)) {
      const c = repository.claims.get(id)!;
      expect(readable).toContain(c.statement);
      expect(readable).toContain(c.qualification);
      for (const eid of c.evidenceIds) {
        const e = repository.evidence.get(eid)!;
        expect(readable).toContain(e.passage);
        expect(readable).toContain(e.locator);
        expect(readable).toContain(
          repository.sources.get(e.sourceId)!.evidenceUrl,
        );
      }
    }
    expect(text).toContain('unresolved Daniela Amodei title disagreement');
  });
  it('reproduces the preserved blank body and keeps external audits separate', async () => {
    const path = 'review/people-diaspora-review.md';
    const before = structuredClone(repository.data);
    expect(render()).toBe(render());
    const formatted = await format(render(), {
      ...(await resolveConfig(path)),
      parser: 'markdown',
    });
    const working = await readFile(path, 'utf8');
    const marker = '<!-- people-diaspora-machine-qa-20260921 -->';
    const [body, audit] = working.split(marker);
    expect(body.trimEnd() + '\n').toBe(formatted);
    expect(working.split(marker)).toHaveLength(2);
    expect(audit).toContain('76 YES, 1 EDIT, 8 RESEARCH MORE');
    expect(audit).toContain('10–85 are one grouped approval');
    expect(audit).toContain('daniela-openai-safety-prior');
    expect(working.match(/^\*\*Human decision:\*\*$/gm)).toHaveLength(85);
    expect(working.match(/^\*\*Notes:\*\*$/gm)).toHaveLength(85);
    expect(repository.data).toEqual(before);
  });
  it('rejects mixed-person groups, missing additions and invented increment IDs', () => {
    const mixed = structuredClone(order);
    const moved = mixed[1].claimIds.pop()!;
    mixed[0].claimIds.push(moved);
    expect(() => render(mixed)).toThrow('one unmixed review group');
    const missing = structuredClone(order).map((g) => ({
      ...g,
      claimIds: g.claimIds.filter((id) => id !== increment.newClaimIds[0]),
    }));
    expect(() => render(missing)).toThrow('every increment claim');
    expect(() =>
      render(order, {
        ...increment,
        newEntityIds: [...increment.newEntityIds, 'invented'],
      }),
    ).toThrow('Invalid increment IDs');
  });
  it('rejects chronology changes and unknown dates placed first', () => {
    const changed = structuredClone(order);
    const group = changed.find((g) =>
      g.claimIds.includes('brockman-stripe-cto-prior'),
    )!;
    group.claimIds.reverse();
    expect(() => render(changed)).toThrow('chronological');
  });
});
