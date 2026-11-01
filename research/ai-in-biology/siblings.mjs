// Records the identifiers of the sibling candidate packs this pack links to, at
// pinned commits, so that a reference to a sibling candidate (a document, entity
// or claim id) can be checked without merging the branches.
// Usage (repository root): node research/ai-in-biology/siblings.mjs
import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIR = dirname(fileURLToPath(import.meta.url));
const PACKS = [
  { pack: 'ai-bio', branch: 'ai-bio-pack', path: 'research/ai-bio/pack.json' },
  {
    pack: 'key-papers',
    branch: 'key-papers-pack',
    path: 'research/key-papers/pack.json',
  },
  {
    pack: 'technical-history',
    branch: 'technical-history-pack',
    path: 'research/technical-history/pack.json',
  },
];
const git = (...a) =>
  execFileSync('git', a, { encoding: 'utf8', maxBuffer: 1 << 28 });
const out = [];
for (const p of PACKS) {
  const commit = git('rev-parse', `origin/${p.branch}`).trim();
  const pack = JSON.parse(git('show', `${commit}:${p.path}`));
  const ids = (xs) =>
    (xs ?? [])
      .map((x) => x.id)
      .filter(Boolean)
      .sort();
  out.push({
    ...p,
    commit,
    documents: ids(pack.documents),
    entities: ids(pack.entities),
    claims: ids(pack.claims),
  });
}
writeFileSync(
  join(DIR, 'sibling-ids.json'),
  JSON.stringify(out, null, 1) + '\n',
);
console.log(
  out
    .map(
      (p) =>
        `${p.pack}@${p.commit.slice(0, 8)}: ${p.documents.length} documents, ${p.entities.length} entities, ${p.claims.length} claims`,
    )
    .join('\n'),
);
