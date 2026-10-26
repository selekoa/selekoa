import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { repository } from './repository';
import { coverage, coverageMarkdown, withCoverage } from './coverage';

const readme = readFileSync(
  new URL('../../README.md', import.meta.url),
  'utf8',
);

describe('generated coverage', () => {
  it('keeps the README block in step with the stored records', () => {
    // Run `pnpm docs:coverage` after a data change.
    const block = coverageMarkdown(coverage(repository.data));
    expect(withCoverage(readme, block)).toBe(readme);
  });

  it('counts every claim once by derivation and by resolution', () => {
    const c = coverage(repository.data);
    const sum = (r: Record<string, number>) =>
      Object.values(r).reduce((a, b) => a + b, 0);
    expect(sum(c.derivation)).toBe(c.claims);
    expect(sum(c.resolution)).toBe(c.claims);
    expect(c.relationships + c.values).toBe(c.claims);
    expect(c.seed + c.accepted).toBe(c.claims);
  });

  it('leaves current counts out of the roadmap and control documentation', () => {
    const c = coverage(repository.data);
    for (const doc of ['docs/roadmap.md', 'docs/control-commitments.md']) {
      const text = readFileSync(
        new URL(`../../${doc}`, import.meta.url),
        'utf8',
      );
      for (const count of [c.claims, c.sources, c.evidence])
        expect(text, doc).not.toMatch(
          new RegExp(
            `\b${count.toLocaleString('en-US')} (claims|sources|evidence)`,
          ),
        );
    }
  });
});
