import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { collectNotices, renderNotices } from './third-party-notices';

describe('third-party notices', () => {
  it('match the installed runtime dependencies (run pnpm notices to update)', () => {
    expect(readFileSync('THIRD-PARTY-NOTICES.md', 'utf8')).toBe(
      renderNotices(),
    );
  });

  it('list every direct runtime dependency with a licence we accept', () => {
    const names = collectNotices().map((n) => n.name);
    const pkg = JSON.parse(readFileSync('package.json', 'utf8')) as {
      dependencies: Record<string, string>;
    };
    for (const dependency of Object.keys(pkg.dependencies))
      expect(names).toContain(dependency);
  });

  it('keeps the citeproc-js CPAL choice and the notice the licence asks for', () => {
    const text = renderNotices();
    expect(text).toContain('Notice under CPAL section 3.6');
    expect(text).toContain('Licence: CPAL-1.0 (the package declares');
    expect(text).toContain('Creative Commons Attribution-ShareAlike 3.0');
  });
});
