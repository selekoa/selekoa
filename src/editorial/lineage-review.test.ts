import { readFile } from 'node:fs/promises';
import { format, resolveConfig } from 'prettier';
import { describe, expect, it } from 'vitest';
import { preCorrectionRepository as repository } from './pre-correction-data';
import increment from '../../review/intellectual-lineage-increment.json';
import order from '../../review/intellectual-lineage-order.json';
import { renderLineageReview } from './lineage-review';
import { assertSafeReviewOutput } from './seed-review';

describe('lineage working pack', () => {
  it('preserves the generated body and protects the annotated working pack', async () => {
    const raw = renderLineageReview(repository.data, order, increment);
    expect(raw).toBe(renderLineageReview(repository.data, order, increment));
    expect(raw.match(/^\*\*Mechanical documentary links:/gm)).toHaveLength(4);
    expect(raw.match(/^\*\*Human decision:\*\*$/gm)).toHaveLength(44);
    expect(raw.match(/^\*\*Notes:\*\*$/gm)).toHaveLength(44);
    expect(raw).toContain('lineage-chalmers-credits-good');
    expect(raw).toContain('uses_method_from');
    const path = 'review/intellectual-lineage-review.md';
    const rendered = await format(raw, {
      ...(await resolveConfig(path)),
      parser: 'markdown',
    });
    const working = await readFile(path, 'utf8');
    const parts = working.split(
      '<!-- intellectual-lineage-machine-qa-20260925 -->',
    );
    expect(parts).toHaveLength(2);
    expect(parts[0].trimEnd() + '\n').toBe(rendered);
    expect(parts[1]).toContain('43 YES, 1 EDIT');
    expect(parts[1]).toContain('08–34 are one grouped approval');
    expect(parts[1]).toContain('08 — lineage-kingma-adam');
    expect(working.match(/^\*\*Human decision:\*\*$/gm)).toHaveLength(44);
    expect(working.match(/^\*\*Notes:\*\*$/gm)).toHaveLength(44);
    expect(() => assertSafeReviewOutput(working, rendered)).toThrow(/Preserve/);
    expect(() =>
      assertSafeReviewOutput(
        rendered.replace('**Human decision:**', '**Human decision:** YES'),
        rendered,
      ),
    ).toThrow(/Preserve/);
  });
  it('rejects missing, duplicate and unknown review/increment identities', () => {
    expect(() =>
      renderLineageReview(repository.data, order.slice(1), increment),
    ).toThrow(/every increment/);
    expect(() =>
      renderLineageReview(repository.data, [...order, order[0]], increment),
    ).toThrow(/exactly once/);
    expect(() =>
      renderLineageReview(repository.data, order, {
        ...increment,
        newSourceIds: ['missing'],
      }),
    ).toThrow(/Invalid increment/);
  });
});
