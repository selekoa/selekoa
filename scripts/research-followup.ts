import { readFile, writeFile } from 'node:fs/promises';
import { format } from 'prettier';
import { buildFollowup } from '../src/research/followup';
import { followupArtifacts } from '../src/research/followup-render';

const args = process.argv.slice(2);
if (args.some((a) => a !== '--check'))
  throw new Error('Usage: pnpm research:provenance [--check]');
const root = new URL(
  '../research/collections/conceptual-provenance-ii/',
  import.meta.url,
);
const c = await buildFollowup(
  JSON.parse(await readFile(new URL('research.json', root), 'utf8')),
);
for (const [name, raw] of Object.entries(followupArtifacts(c))) {
  const body = await format(raw, {
    parser: name.endsWith('.json') ? 'json' : 'markdown',
  });
  const path = new URL(name, root);
  if (args.includes('--check')) {
    if ((await readFile(path, 'utf8')) !== body)
      throw new Error('Outdated research artifact: ' + name);
  } else await writeFile(path, body);
}
console.log(
  `Conceptual provenance II: ${c.findings.length} findings, ${c.evidence.length} evidence records, ${c.sources.length} access records; no admission or human review changes.`,
);
