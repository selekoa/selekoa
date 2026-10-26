import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { format } from 'prettier';
import { canonicalJson } from '../src/domain/references';
import {
  captureSnapshot,
  paths,
  upstreamCommit,
} from '../src/research/upstream';
import {
  buildCollection,
  collectionJson,
  selectionSchema,
} from '../src/research/collection';
import {
  starterMarkdown,
  inventoryMarkdown,
  crosswalkMarkdown,
} from '../src/research/render';

const root = fileURLToPath(new URL('..', import.meta.url));
const directory = resolve(root, 'research/collections/conceptual-provenance-i');
const args = process.argv.slice(2);
const flags = new Set(['--check', '--capture', '--upstream']);
for (let i = 0; i < args.length; i++) {
  if (!flags.has(args[i])) throw new Error('Unknown argument: ' + args[i]);
  if (args[i] === '--upstream') {
    if (!args[++i] || args[i].startsWith('--'))
      throw new Error('--upstream requires a read-only repository path');
  }
}
const check = args.includes('--check');
const capture = args.includes('--capture');
if (capture && check) throw new Error('Use --capture or --check, not both');
const selection = selectionSchema.parse(
  JSON.parse(await readFile(resolve(directory, 'selection.json'), 'utf8')),
);
const upstreamIndex = args.indexOf('--upstream');
let snapshot: unknown;
if (upstreamIndex >= 0) {
  const upstream = resolve(args[upstreamIndex + 1]);
  const git = (...gitArgs: string[]) =>
    execFileSync(
      'git',
      [
        '-c',
        'safe.directory=' + upstream.replaceAll('\\', '/'),
        '-C',
        upstream,
        ...gitArgs,
      ],
      { maxBuffer: 8 * 1024 * 1024 },
    );
  // Always read the immutable commit, never the upstream working tree or HEAD.
  const files = Object.values(paths).map((path) => {
    const bytes = git('show', upstreamCommit + ':' + path);
    return {
      path,
      content: bytes.toString('utf8'),
      sha256: 'sha256:' + createHash('sha256').update(bytes).digest('hex'),
      gitBlob: git('rev-parse', upstreamCommit + ':' + path)
        .toString('utf8')
        .trim(),
    };
  });
  snapshot = await captureSnapshot(
    files,
    selection.records.map((r) => r.upstreamId),
  );
  if (capture) {
    // Never overwrite an existing frozen input, even if an upstream checkout changes.
    await writeFile(
      resolve(directory, 'upstream.json'),
      JSON.stringify(snapshot, null, 2) + '\n',
      { flag: 'wx' },
    );
  } else {
    const frozen = JSON.parse(
      await readFile(resolve(directory, 'upstream.json'), 'utf8'),
    );
    if (canonicalJson(snapshot) !== canonicalJson(frozen))
      throw new Error(
        'Frozen snapshot differs from pinned upstream projection',
      );
  }
} else {
  if (capture) throw new Error('--capture requires --upstream');
  snapshot = JSON.parse(
    await readFile(resolve(directory, 'upstream.json'), 'utf8'),
  );
}
const collection = await buildCollection(snapshot, selection);
const artifacts = {
  'collection.json': collectionJson(collection),
  'starter.md': starterMarkdown(collection),
  'inventory.md': inventoryMarkdown(collection),
  'crosswalk.md': crosswalkMarkdown(collection),
};
await mkdir(directory, { recursive: true });
for (const [name, rendered] of Object.entries(artifacts)) {
  const content = await format(rendered, {
    parser: name.endsWith('.json') ? 'json' : 'markdown',
  });
  const target = resolve(directory, name);
  if (check) {
    if ((await readFile(target, 'utf8')) !== content)
      throw new Error('Outdated generated artifact: ' + name);
  } else await writeFile(target, content);
}
console.log(
  `Research corpus ${check ? 'verified' : 'generated'}: ${collection.records.length} propositions, ${collection.evidence.length} evidence records, ${collection.sources.length} source expressions. No graph or human-review changes.`,
);
