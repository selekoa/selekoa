// Checks what each type of page downloads before it answers input against its
// limit (src/site/bundle-budget.ts), after the client build. Run by
// `pnpm build`. The build's manifest is read and then moved out of dist/, so
// it is not deployed; a second run reads the moved copy.
import {
  existsSync,
  mkdirSync,
  readFileSync,
  renameSync,
  rmSync,
} from 'node:fs';
import path from 'node:path';
import { gzipSync } from 'node:zlib';
import { pageWeights, type Manifest } from '../src/site/bundle-budget.ts';

const dist = 'dist';
const built = path.join(dist, '.vite', 'manifest.json');
const kept = path.join('dist-ssr', 'client-manifest.json');

if (existsSync(built)) {
  mkdirSync(path.dirname(kept), { recursive: true });
  renameSync(built, kept);
  rmSync(path.join(dist, '.vite'), { recursive: true, force: true });
}
if (!existsSync(kept)) throw new Error(`No client manifest; run pnpm build`);
const manifest = JSON.parse(readFileSync(kept, 'utf8')) as Manifest;

const sizes = new Map<string, number>();
const gzipSize = (file: string) => {
  let size = sizes.get(file);
  if (size === undefined) {
    size = gzipSync(readFileSync(path.join(dist, file)), { level: 9 }).length;
    sizes.set(file, size);
  }
  return size;
};

// A slice that needs the whole relation core loads it as well.
const needsCore = (file: string) =>
  file.startsWith('slices/') &&
  (JSON.parse(readFileSync(path.join(dist, file), 'utf8')) as { core?: true })
    .core === true;
const weights = pageWeights(manifest, gzipSize, undefined, needsCore);
const kb = (bytes: number) => (bytes / 1000).toFixed(1);
for (const w of weights)
  console.log(
    `${w.over ? 'OVER' : 'ok  '} ${w.type.name.padEnd(16)} ${kb(w.bytes).padStart(8)} KB of ${w.type.limitKb} KB (${w.files.length} files, ${w.type.path})`,
  );
const over = weights.filter((w) => w.over);
if (over.length) {
  console.error(
    `${over.length} page types exceed their gzip-9 budget (src/site/bundle-budget.ts).`,
  );
  process.exit(1);
}
