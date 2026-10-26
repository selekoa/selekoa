import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import {
  buildRelease,
  changelogIndex,
  compareVersions,
  inputFingerprint,
  parseVersion,
  releaseDirectory,
  type Removals,
} from '../src/release/build';
import {
  currentInput,
  readRelease,
  readRemovals,
  releasedVersions,
  releaseRoot,
  writeFiles,
} from '../src/release/files';

const usage =
  'Usage: pnpm release <MAJOR.MINOR.PATCH> [--date YYYY-MM-DD] | pnpm release <version> --check';
const args = process.argv.slice(2);
let requested: string | undefined;
let date = new Date().toISOString().slice(0, 10);
let check = false;
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--check') check = true;
  else if (args[i] === '--date' && args[i + 1]) date = args[++i];
  else if (!requested && !args[i].startsWith('--')) requested = args[i];
  else throw new Error(usage);
}
if (!requested) throw new Error(usage);
const version = parseVersion(requested);
const versions = await releasedVersions();
const earlier = versions.filter((v) => compareVersions(v, version) < 0);
const previousVersion = earlier.at(-1);
const previous = previousVersion ? await readRelease(previousVersion) : null;
const input = currentInput();

if (check) {
  if (!versions.includes(version)) throw new Error(`No release v${version}`);
  const released = await readRelease(version);
  if (released.manifest.inputFingerprint !== (await inputFingerprint(input)))
    throw new Error(
      `The data has changed since v${version}; it cannot be regenerated from the current data. The test suite checks it from its own records.`,
    );
  const removals: Removals = Object.fromEntries(
    Object.entries(
      JSON.parse(released.files['changes.json']).removed as Record<
        string,
        { id: string; reason: string }[]
      >,
    ).map(([t, rows]) => [
      t,
      Object.fromEntries(rows.map((r) => [r.id, r.reason])),
    ]),
  );
  const rebuilt = await buildRelease({
    input,
    version,
    date: released.manifest.releasedAt,
    previous,
    removals,
    formatVersion: released.manifest.formatVersion,
  });
  const names = new Set([
    ...Object.keys(rebuilt.files),
    ...Object.keys(released.files),
  ]);
  const differing = [...names].filter(
    (n) => rebuilt.files[n] !== released.files[n],
  );
  if (differing.length) {
    console.error(`v${version} does not reproduce: ${differing.join(', ')}`);
    process.exitCode = 1;
  } else console.log(`v${version} reproduces byte for byte from the data.`);
} else {
  if (versions.includes(version))
    throw new Error(
      `v${version} already exists; a release is never overwritten. Use --check to verify it.`,
    );
  if (versions.length && compareVersions(version, versions.at(-1)!) < 0)
    throw new Error(`v${version} is earlier than v${versions.at(-1)}`);
  const release = await buildRelease({
    input,
    version,
    date,
    previous,
    removals: await readRemovals(),
  });
  const dir = path.join(releaseRoot, releaseDirectory(version));
  await writeFiles(dir, release.files);
  const manifests = await Promise.all(
    (await releasedVersions()).map(async (v) =>
      JSON.parse(
        await readFile(
          path.join(releaseRoot, releaseDirectory(v), 'manifest.json'),
          'utf8',
        ),
      ),
    ),
  );
  await writeFile(
    path.join(releaseRoot, 'CHANGELOG.md'),
    changelogIndex(manifests),
    'utf8',
  );
  const { added, changed, removed } = release.manifest.changes;
  console.log(
    `Wrote ${dir}: ${Object.keys(release.files).length} files; ${added} added, ${changed} changed, ${removed} removed against ${previousVersion ? 'v' + previousVersion : 'no previous release'}.`,
  );
}
