import { readFile, writeFile } from 'node:fs/promises';
import { format, resolveConfig } from 'prettier';
import { createRepository } from '../src/domain/repository';
import {
  assessmentPackets,
  renderAssessmentPacket,
} from '../src/editorial/assessment-packet';

// Regenerates the latest cross-model packet of contested and assessment
// records (week 4c) from the dataset view of its time. Earlier packets are
// reproduced by unit tests the same way.
// --check reports whether the stored packet matches the records.
const args = process.argv.slice(2);
const packet = assessmentPackets.week4c;
let output = packet.path;
let check = false;
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--check') check = true;
  else if (args[i] === '--output' && args[i + 1]) output = args[++i];
  else
    throw new Error(
      'Usage: pnpm review:assessments [--check] [--output review/<name>.md]',
    );
}

const options = (await resolveConfig(output)) ?? {};
const body = await format(
  renderAssessmentPacket(createRepository(packet.view).data, packet),
  {
    ...options,
    parser: 'markdown',
  },
);
if (check) {
  const stored = await readFile(output, 'utf8').catch(() => '');
  if (stored !== body) {
    console.error(`${output} is out of date; run pnpm review:assessments.`);
    process.exitCode = 1;
  } else console.log(`${output} matches the stored records.`);
} else {
  await writeFile(output, body);
  console.log(`Wrote ${output}.`);
}
