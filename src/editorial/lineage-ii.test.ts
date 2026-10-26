import capitalII from '../../review/capital-ii-increment.json';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { format, resolveConfig } from 'prettier';
import { preFrameworkEvidenceRaw } from './pre-framework-evidence-data';
import increment from '../../review/intellectual-lineage-ii-increment.json';
import order from '../../review/intellectual-lineage-ii-order.json';
import {
  preSortNameRepository as repository,
  withoutSortName,
} from './pre-sort-name-data';
import { renderLineageReview } from './lineage-review';

const hash = (text: string) => createHash('sha256').update(text).digest('hex');
const { entities, claims, sources, evidence } = preFrameworkEvidenceRaw;
const raw = {
  entities: entities.map(withoutSortName),
  claims,
  sources,
  evidence,
};
describe('intellectual lineage II preservation and review boundaries', () => {
  it('preserves the corrected baseline and earlier working packs exactly', () => {
    for (const key of ['entities', 'claims', 'sources', 'evidence'] as const) {
      const before = raw[key].filter((r) =>
        increment.baseline[key].ids.includes(r.id),
      );
      expect(before).toHaveLength(increment.baseline[key].count);
      expect(hash(JSON.stringify(before))).toBe(increment.baseline[key].sha256);
    }
    for (const [path, expected] of Object.entries(
      increment.preservedReviewFiles,
    )) {
      expect(
        hash(readFileSync(path, 'utf8').replace(/\r\n/g, '\n')),
        path,
      ).toBe(expected);
    }
  });

  it('keeps all additions explicit seeds, with exact source locators and no inferred adoption', () => {
    const added = repository.data.claims.filter((c) =>
      increment.newClaimIds.includes(c.id),
    );
    expect(added).toHaveLength(21);
    expect(order.flatMap((g) => g.claimIds)).toEqual(increment.newClaimIds);
    expect(added.some((c) => c.predicate === 'uses_method_from')).toBe(false);
    for (const c of added) {
      expect(c).toMatchObject({
        editorialState: 'seed',
        derivation: 'explicit',
        resolution: 'supported',
      });
      expect(c.qualification.length).toBeGreaterThan(30);
      for (const id of c.evidenceIds) {
        const e = repository.evidence.get(id)!;
        expect(e.verification).toBe('machine_checked');
        expect(e.reviewer).toBeUndefined();
        expect(e.locator.length).toBeGreaterThan(10);
        expect(e.passage.length).toBeGreaterThan(15);
      }
    }
    for (const id of increment.newSourceIds) {
      const s = repository.sources.get(id)!;
      if (s.publisher === 'arXiv') {
        expect(s.evidenceUrl).toMatch(/v1$/);
        expect(s.versionDate).toBe(s.publicationDate);
      }
    }
    expect(
      repository.claims.get('lineage-ii-reward-cites-amplification')
        ?.qualification,
    ).toContain('not a report of implementing');
    expect(
      repository.claims.get('lineage-ii-reward-cites-miri-agenda')
        ?.qualification,
    ).toContain('not adoption');
    expect(
      repository.claims.get('lineage-ii-weak-cites-debate')?.qualification,
    ).toContain('contrasts improving supervision');
    const forbiddenTargets = ['good-1965', 'iem-2013', 'scaling-laws'];
    expect(
      added.some(
        (c) =>
          c.object.kind === 'entity' &&
          forbiddenTargets.includes(c.object.entityId),
      ),
    ).toBe(false);
  });

  it('reproduces the separate pack with every human field blank', async () => {
    const path = 'review/intellectual-lineage-ii-review.md';
    const generated = await format(
      renderLineageReview(
        {
          ...repository.data,
          meta: capitalII.baselineMeta,
          ...Object.fromEntries(
            Object.entries(raw).map(([key, records]) => [
              key,
              records.filter((r) =>
                capitalII.baseline[key as keyof typeof raw].ids.includes(r.id),
              ),
            ]),
          ),
        },
        order,
        increment,
        'intellectual lineage II — oversight and documented reception',
      ),
      { ...(await resolveConfig(path)), parser: 'markdown' },
    );
    const working = readFileSync(path, 'utf8').replace(/\r\n/g, '\n');
    const parts = working.split(
      '<!-- intellectual-lineage-ii-machine-qa-20260925 -->',
    );
    expect(parts).toHaveLength(2);
    expect(parts[0].trimEnd() + '\n').toBe(generated);
    const [grok, claude] = parts[1]
      .split('### Audit A — supplied Grok text')[1]
      .split('### Audit B — supplied Claude text');
    const ids = order.flatMap((group) => group.claimIds);
    expect(
      [...grok.matchAll(/\*\*(\d{2}) · ([\w-]+) — YES\*\*/g)].map((m) => [
        m[1],
        m[2],
      ]),
    ).toEqual(ids.map((id, i) => [String(i + 1).padStart(2, '0'), id]));
    expect(
      [...claude.matchAll(/\*\*(\d{2})\*\* YES ·/g)].map((m) => m[1]),
    ).toEqual(ids.map((_, i) => String(i + 1).padStart(2, '0')));
    expect(
      [
        ...parts[1].matchAll(
          /\| (\d{2})\s*\| `([\w-]+)`\s*\| YES\s*\| YES\s*\|/g,
        ),
      ].map((m) => [m[1], m[2]]),
    ).toEqual(ids.map((id, i) => [String(i + 1).padStart(2, '0'), id]));
    expect(grok).toContain(
      'Citation chains (amplification ↔ debate ↔ reward ↔ critique ↔ weak-to-strong)',
    );
    expect(claude).toContain(
      'SUMMARY: YES: 21 · EDIT: 0 · RESEARCH MORE: 0 · REJECT: 0',
    );
    expect(working.match(/^\*\*Human decision:\*\*$/gm)).toHaveLength(21);
    expect(working.match(/^\*\*Notes:\*\*$/gm)).toHaveLength(21);
    expect(generated.match(/^\*\*Human decision:\*\*$/gm)).toHaveLength(21);
    expect(generated.match(/^\*\*Notes:\*\*$/gm)).toHaveLength(21);
    expect(() =>
      renderLineageReview(repository.data, order.slice(0, 2), increment),
    ).toThrow('every increment claim');
  });
});
