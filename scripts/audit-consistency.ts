import { writeFile } from 'node:fs/promises';
import { format, resolveConfig } from 'prettier';
import { repository } from '../src/domain/repository';
import { wholeCollections } from '../src/release/whole-collections';
import { questionStarters } from '../src/reading/self-governance';
import { controlTimelines } from '../src/reading/control-timelines';
import { auditDataset } from '../src/editorial/consistency-audit';

// Report-only consistency audit. Prints a summary by check; with
// --json <path>, also writes every finding. Always exits 0: findings are
// leads for an editor, and nothing in data/ changes.
const args = process.argv.slice(2);
const at = args.indexOf('--json');
const output = at >= 0 ? args[at + 1] : undefined;
if ((at >= 0 && !output) || args.length !== (at >= 0 ? 2 : 0))
  throw new Error('Usage: pnpm audit:consistency [--json <path>]');

const report = auditDataset(repository.data, [
  ...wholeCollections.map((c) => ({
    kind: c.kind,
    id: c.definition.id,
    definition: c.definition,
  })),
  ...questionStarters.map((definition) => ({
    kind: 'question-starter',
    id: definition.id,
    definition,
  })),
  // The control timelines page reads its records by ID, like a collection.
  {
    kind: 'control-timelines',
    id: 'side-by-side',
    definition: controlTimelines,
  },
]);
for (const s of report.summary)
  console.log(
    `${s.check.padEnd(12)} ${String(s.findings).padStart(5)}  high ${s.bySeverity.high}, medium ${s.bySeverity.medium}, low ${s.bySeverity.low}, info ${s.bySeverity.info}`,
  );
if (output) {
  const options = (await resolveConfig(output)) ?? {};
  await writeFile(
    output,
    await format(JSON.stringify(report), { ...options, filepath: output }),
  );
  console.log(`Wrote ${report.findings.length} findings to ${output}.`);
}
