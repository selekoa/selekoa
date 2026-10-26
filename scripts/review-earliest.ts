import { readFile, writeFile } from 'node:fs/promises';
import { format, resolveConfig } from 'prettier';
import { createRepository } from '../src/domain/repository';
import {
  earliestPacketPath,
  renderEarliestPacket,
} from '../src/editorial/earliest-packet';
import { preEarliestFixesRaw } from '../src/editorial/historical-views';
import { superintelligencePropositions } from '../src/reading/human-thought';

// Regenerates the cross-model packet of earliest-located records for the
// human-thought collection from the dataset view it was checked against,
// before that check's corrections. --check reports whether the stored packet
// matches it.
const args = process.argv.slice(2);
let output = earliestPacketPath;
let check = false;
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--check') check = true;
  else if (args[i] === '--output' && args[i + 1]) output = args[++i];
  else
    throw new Error(
      'Usage: pnpm review:earliest [--check] [--output review/<name>.md]',
    );
}

const options = (await resolveConfig(output)) ?? {};
const body = await format(
  renderEarliestPacket(
    createRepository(preEarliestFixesRaw).data,
    superintelligencePropositions,
  ),
  { ...options, parser: 'markdown' },
);
if (check) {
  const stored = await readFile(output, 'utf8').catch(() => '');
  if (stored !== body) {
    console.error(`${output} does not reproduce; run pnpm review:earliest.`);
    process.exitCode = 1;
  } else console.log(`${output} matches the stored records.`);
} else {
  await writeFile(output, body);
  console.log(`Wrote ${output}.`);
}
