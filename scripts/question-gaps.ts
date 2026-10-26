import { readFile, writeFile } from 'node:fs/promises';
import { repository } from '../src/domain/repository';
import { questionGapsMarkdown } from '../src/domain/question-starter-export';
import { selfGovernance } from '../src/reading/self-governance';

// Writes the question page's gap list as candidate research tasks.
// --check reports whether the stored file matches; a unit test does the same.
const args = process.argv.slice(2);
const check = args.includes('--check');
if (args.some((a) => a !== '--check'))
  throw new Error('Usage: pnpm question:gaps [--check]');

const path = 'review/essay-starter-gaps.md';
const stored = await readFile(path, 'utf8').catch(() => '');
const updated = questionGapsMarkdown(repository.data, selfGovernance);
if (check) {
  if (stored !== updated) {
    console.error(`${path} is out of date; run pnpm question:gaps.`);
    process.exitCode = 1;
  } else console.log(`${path} matches the stored records.`);
} else if (stored !== updated) {
  await writeFile(path, updated);
  console.log(`Wrote ${path}.`);
} else console.log(`${path} is current.`);
