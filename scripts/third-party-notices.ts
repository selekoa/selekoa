// pnpm notices           writes THIRD-PARTY-NOTICES.md
// pnpm notices --check   fails if the file differs from what the installed
//                        dependencies produce
import { readFile, writeFile } from 'node:fs/promises';
import { renderNotices } from '../src/site/third-party-notices.ts';

const file = 'THIRD-PARTY-NOTICES.md';
const text = renderNotices();
if (process.argv.includes('--check')) {
  const current = await readFile(file, 'utf8').catch(() => '');
  if (current !== text) {
    console.error(`${file} is out of date; run pnpm notices.`);
    process.exitCode = 1;
  } else console.log(`${file} is up to date.`);
} else {
  await writeFile(file, text, 'utf8');
  console.log(`Wrote ${file}.`);
}
