import { renderLineageReview } from '../src/editorial/lineage-review';
import { renderPeopleReview } from '../src/editorial/people-review';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { format, resolveConfig } from 'prettier';
import { repository } from '../src/domain/repository';
import { buildFollowup } from '../src/research/followup';
import { followupHumanReview } from '../src/research/followup-render';
import {
  assertSafeReviewOutput,
  renderSeedReview,
} from '../src/editorial/seed-review';

const args = process.argv.slice(2);
let output = 'review/seed-review.md';
let check = false;
let people = false;
let lineage = false;
let corpus = false;
let orderPath = 'review/seed-order.json';
let title = 'seed claim review';
let incrementPath = 'review/intellectual-lineage-increment.json';
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--check') check = true;
  else if (args[i] === '--people') people = true;
  else if (args[i] === '--lineage') lineage = true;
  else if (args[i] === '--corpus') corpus = true;
  else if (args[i] === '--output' && args[i + 1]) output = args[++i];
  else if (args[i] === '--order' && args[i + 1]) orderPath = args[++i];
  else if (args[i] === '--increment' && args[i + 1]) incrementPath = args[++i];
  else if (args[i] === '--title' && args[i + 1]) title = args[++i];
  else
    throw new Error(
      'Usage: pnpm review:seed [--check] [--people | --lineage | --corpus] [--increment review/<increment>.json] [--order review/<order>.json] [--title <title>] [--output review/<name>.md]',
    );
}
if (args.includes('--increment') && !lineage)
  throw new Error('--increment requires --lineage.');
if ([people, lineage, corpus].filter(Boolean).length > 1)
  throw new Error('Choose only one review kind.');
if (
  corpus &&
  ['--order', '--title', '--increment'].some((a) => args.includes(a))
)
  throw new Error('Corpus sample and title are fixed by its versioned input.');
if (corpus && !args.includes('--output'))
  output = 'review/conceptual-provenance-ii.md';
const root = path.resolve('review');
const target = path.resolve(output);
const relative = path.relative(root, target);
if (
  relative.startsWith('..') ||
  path.isAbsolute(relative) ||
  path.extname(target) !== '.md'
)
  throw new Error('Review output must be a Markdown file inside review/.');
const order = corpus
  ? null
  : (JSON.parse(await readFile(orderPath, 'utf8')) as unknown);
const generated = await format(
  corpus
    ? followupHumanReview(
        await buildFollowup(
          JSON.parse(
            await readFile(
              'research/collections/conceptual-provenance-ii/research.json',
              'utf8',
            ),
          ),
        ),
      )
    : lineage
      ? renderLineageReview(
          repository.data,
          order,
          JSON.parse(await readFile(incrementPath, 'utf8')),
          title,
        )
      : people
        ? renderPeopleReview(
            repository.data,
            order,
            JSON.parse(
              await readFile('review/people-diaspora-increment.json', 'utf8'),
            ),
            title,
          )
        : renderSeedReview(repository.data, order, { selection: true, title }),
  {
    ...(await resolveConfig(target)),
    parser: 'markdown',
  },
);
let existing: string | undefined;
try {
  existing = await readFile(target, 'utf8');
} catch (error) {
  if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error;
}
assertSafeReviewOutput(existing, generated);
if (check) {
  if (existing === undefined)
    throw new Error('Review pack is missing. Run pnpm review:seed.');
  console.log(
    'Review pack matches the validated seed; all generated human fields are empty.',
  );
} else if (existing === generated) {
  console.log('Review pack is unchanged; existing file preserved.');
} else {
  await mkdir(path.dirname(target), { recursive: true });
  // Exclusive creation also protects edits made after the read above.
  await writeFile(target, generated, { encoding: 'utf8', flag: 'wx' });
  console.log(
    `Created ${path.relative(process.cwd(), target)} with empty human decision and notes fields.`,
  );
}
