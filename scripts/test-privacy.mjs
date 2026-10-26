import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve, join, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

// Synthetic paths are assembled so the real repository's privacy scan does not
// confuse deliberately hostile test inputs with disclosed maintainer paths.
const unix = (root) => ['', root, 'synthetic-user', 'notes.txt'].join('/');
const windows = ['C:', 'Users', 'synthetic-user', 'notes.txt'].join('\\');
const scanner = fileURLToPath(new URL('./check-privacy.mjs', import.meta.url));
const cases = [
  ['Unix home', unix('home'), 1],
  ['macOS home', unix('Users'), 1],
  ['Windows profile', windows, 1],
  ['Windows forward slashes', windows.replaceAll('\\', '/'), 1],
  ['quoted Unix path', JSON.stringify(unix('home')), 1],
  ['quoted Windows path', '"' + windows + '"', 1],
  ['JSON-escaped Windows path', JSON.stringify(windows), 1],
  ['Markdown Unix link', '[notes](' + unix('home') + ')', 1],
  ['Markdown Windows link', '[notes](' + windows + ')', 1],
  ['file URL Unix home', 'file://' + unix('home'), 1],
  ['file URL macOS home', 'file://' + unix('Users'), 1],
  ['public news URL', 'https://example.org/news/home/123/article', 0],
  [
    'public news Markdown link',
    '[article](https://example.org/news/home/123/article)',
    0,
  ],
  ['project role address', 'Contact: maintainer@selekoa.org', 0],
  [
    'other address on the project domain',
    ['someone', 'selekoa.org'].join('@'),
    1,
  ],
];

test('privacy scanner checks the Git index against private paths and public URLs', async (t) => {
  const base = resolve(tmpdir());
  const dir = mkdtempSync(join(base, 'selekoa-privacy-test-'));
  const git = (...args) =>
    execFileSync(
      'git',
      ['-c', `safe.directory=${dir.replaceAll('\\', '/')}`, ...args],
      { cwd: dir, stdio: 'pipe' },
    );
  try {
    git('init', '--quiet');
    for (const [name, content, status] of cases) {
      await t.test(name, () => {
        writeFileSync(join(dir, 'fixture.md'), content);
        git('add', 'fixture.md');
        // A clean working file must not hide private content already staged.
        writeFileSync(join(dir, 'fixture.md'), 'Working tree placeholder');
        const result = spawnSync(process.execPath, [scanner], {
          cwd: dir,
          encoding: 'utf8',
          env: { ...process.env, SELEKOA_PRIVATE_TERMS: '' },
        });
        assert.equal(result.status, status, result.stderr || result.stdout);
      });
    }
  } finally {
    const target = resolve(dir);
    assert(target.startsWith(base + sep) && target !== base);
    rmSync(target, { recursive: true, force: true });
  }
});
