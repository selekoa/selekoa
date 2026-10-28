import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { repository } from '../domain/repository';
import { pagePaths } from '../prerender/pages';

// public/_headers is copied to dist/ unchanged; Cloudflare Pages reads it
// there. A rule is a path line followed by indented "Name: value" lines.
function parseHeaders(text: string) {
  const rules = new Map<string, Record<string, string>>();
  let current: Record<string, string> | undefined;
  for (const line of text.split('\n')) {
    if (!line.trim() || line.trimStart().startsWith('#')) continue;
    if (!/^\s/.test(line)) {
      current = {};
      rules.set(line.trim(), current);
      continue;
    }
    const [, name, value] = /^\s+([^:]+):\s*(.+)$/.exec(line) ?? [];
    expect(current, `header outside a rule: ${line}`).toBeDefined();
    expect(name, `malformed header line: ${line}`).toBeDefined();
    current![name] = value.trim();
  }
  return rules;
}

describe('hosting headers', () => {
  const rules = parseHeaders(readFileSync('public/_headers', 'utf8'));
  const cache = (path: string) => rules.get(path)?.['Cache-Control'];

  it('caches hashed assets for a year and revalidates the page', () => {
    expect(cache('/assets/*')).toBe('public, max-age=31536000, immutable');
    expect(cache('/')).toBe('no-cache');
    expect(cache('/index.html')).toBe('no-cache');
  });

  it('revalidates every built page, through exactly one rule', () => {
    // Cloudflare Pages matches a rule exactly, or by a trailing splat.
    const matches = (rule: string, path: string) =>
      rule.endsWith('/*')
        ? path.startsWith(rule.slice(0, -1)) && path.length > rule.length - 1
        : rule === path;
    for (const path of [...pagePaths(repository.data), '/404.html']) {
      const matching = [...rules.keys()].filter(
        (rule) => matches(rule, path) && rules.get(rule)!['Cache-Control'],
      );
      expect(matching, path).toHaveLength(1);
      expect(cache(matching[0]), path).toBe('no-cache');
    }
    expect(rules.size).toBeLessThanOrEqual(100);
  });

  it('caches dataset archives long and robots.txt and the sitemap briefly', () => {
    expect(cache('/release/*')).toMatch(/^public, max-age=\d{7,}$/);
    for (const path of ['/robots.txt', '/sitemap.xml']) {
      const age = Number(/max-age=(\d+)$/.exec(cache(path) ?? '')?.[1]);
      expect(age).toBeGreaterThan(0);
      expect(age).toBeLessThanOrEqual(86_400);
    }
  });

  it('sets no cache rule on every path and no policy that would block the analytics script', () => {
    expect(rules.get('/*')?.['Cache-Control']).toBeUndefined();
    for (const headers of rules.values())
      for (const name of Object.keys(headers))
        expect(name).not.toMatch(/content-security-policy|cross-origin/i);
  });
});
