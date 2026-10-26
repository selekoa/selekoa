// Node-only helpers for reading and writing release directories.
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import entities from '../../data/entities.json';
import claims from '../../data/claims.json';
import sources from '../../data/sources.json';
import evidence from '../../data/evidence.json';
import meta from '../../data/meta.json';
import {
  compareVersions,
  releaseDirectory,
  type ReleaseInput,
  type ReleaseManifest,
  type ReleaseRecords,
  type Removals,
} from './build';
import { applicationCollections } from './collections';
import { recordTypes } from './format';

export const releaseRoot = 'release';

/** The current application data and collection definitions. */
export const currentInput = (): ReleaseInput =>
  ({
    meta,
    entities,
    claims,
    sources,
    evidence,
    collections: applicationCollections,
  }) as ReleaseInput;

/** Released versions on disk, oldest first. */
export async function releasedVersions(root = releaseRoot) {
  const names = await readdir(root).catch(() => [] as string[]);
  return names
    .filter((n) => /^v\d+\.\d+\.\d+$/.test(n))
    .map((n) => n.slice(1))
    .sort(compareVersions);
}

export async function readRelease(version: string, root = releaseRoot) {
  const dir = path.join(root, releaseDirectory(version));
  const read = (name: string) => readFile(path.join(dir, name), 'utf8');
  const manifest = JSON.parse(await read('manifest.json')) as ReleaseManifest;
  const records = Object.fromEntries(
    await Promise.all(
      recordTypes.map(async (t) => [t, JSON.parse(await read(`${t}.json`))]),
    ),
  ) as ReleaseRecords;
  const files: Record<string, string> = {};
  for (const name of await readdir(dir)) files[name] = await read(name);
  return { version, dir, manifest, records, files };
}

export async function readRemovals(root = releaseRoot): Promise<Removals> {
  try {
    return JSON.parse(await readFile(path.join(root, 'removals.json'), 'utf8'));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return {};
    throw error;
  }
}

export async function writeFiles(dir: string, files: Record<string, string>) {
  await mkdir(dir, { recursive: true });
  for (const [name, text] of Object.entries(files))
    await writeFile(path.join(dir, name), text, 'utf8');
}
