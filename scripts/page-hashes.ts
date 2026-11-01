// Hashes every built page without its script and stylesheet tags for
// /assets/, so that two builds can be compared page by page: a code change
// renames and regroups the scripts every page loads, which is not a change of
// the page. Everything else (the rendered markup, title, description,
// canonical link, inline script) is compared as written.
//   tsx scripts/page-hashes.ts write <file>    record dist/'s pages
//   tsx scripts/page-hashes.ts compare <file>  list pages that differ
// See docs/data-loading-design-c.md ("Constraints").
import { createHash } from 'node:crypto';
import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const dist = 'dist';

/** The page without the tags that load hashed files from /assets/. */
export const withoutAssetHashes = (html: string) =>
  html.replace(
    /\s*<(?:script|link)\b[^>]*\b(?:src|href)="\/assets\/[^"]+"[^>]*>(?:<\/script>)?/g,
    '',
  );

function pages(dir = dist): string[] {
  return readdirSync(dir).flatMap((name) => {
    const file = path.join(dir, name);
    if (statSync(file).isDirectory()) return pages(file);
    return name.endsWith('.html') ? [file] : [];
  });
}

function hashes() {
  return Object.fromEntries(
    pages()
      .sort()
      .map((file) => [
        path.relative(dist, file).split(path.sep).join('/'),
        createHash('sha256')
          .update(withoutAssetHashes(readFileSync(file, 'utf8')))
          .digest('hex'),
      ]),
  );
}

const [command, file] = process.argv.slice(2);
if (command === 'write' && file) {
  const current = hashes();
  writeFileSync(file, JSON.stringify(current, null, 1) + '\n');
  console.log(`${Object.keys(current).length} pages recorded in ${file}`);
} else if (command === 'compare' && file) {
  const before = JSON.parse(readFileSync(file, 'utf8')) as Record<
    string,
    string
  >;
  const after = hashes();
  const changed = Object.keys(after).filter(
    (p) => p in before && before[p] !== after[p],
  );
  const added = Object.keys(after).filter((p) => !(p in before));
  const removed = Object.keys(before).filter((p) => !(p in after));
  console.log(
    `${Object.keys(after).length} pages: ${changed.length} changed, ${added.length} added, ${removed.length} removed`,
  );
  for (const [label, list] of [
    ['changed', changed],
    ['added', added],
    ['removed', removed],
  ] as const)
    for (const p of list.slice(0, 20)) process.stdout.write(`${label}: ${p}\n`);
  if (changed.length || added.length || removed.length) process.exitCode = 1;
} else {
  console.error('Usage: tsx scripts/page-hashes.ts write|compare <file>');
  process.exitCode = 2;
}
