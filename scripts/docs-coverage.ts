import { readFile, writeFile } from 'node:fs/promises';
import { repository } from '../src/domain/repository';
import {
  coverage,
  coverageMarkdown,
  withCoverage,
} from '../src/domain/coverage';

// Writes the README's current-coverage block from the stored records.
// --check reports whether the stored block matches; a unit test does the same.
const args = process.argv.slice(2);
const check = args.includes('--check');
if (args.some((a) => a !== '--check'))
  throw new Error('Usage: pnpm docs:coverage [--check]');

const path = 'README.md';
const stored = await readFile(path, 'utf8');
const updated = withCoverage(
  stored,
  coverageMarkdown(coverage(repository.data)),
);
if (check) {
  if (stored !== updated) {
    console.error(`${path} coverage is out of date; run pnpm docs:coverage.`);
    process.exitCode = 1;
  } else console.log(`${path} coverage matches the stored records.`);
} else if (stored !== updated) {
  await writeFile(path, updated);
  console.log(`Updated the coverage block in ${path}.`);
} else console.log(`${path} coverage is current.`);
