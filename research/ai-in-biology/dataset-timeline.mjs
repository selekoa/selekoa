// Writes timeline-dataset.json: dated records already in Selekoa's dataset that bear on
// AI in biology, which the pack's timeline shows for orientation (marked ◇). The
// selection is an explicit list, so that it can be checked: the AlphaFold documents
// and the records about them, and the dated roles of the two DeepMind people the
// pack also records. Records about biologically inspired AGI timelines or about
// biological risk belong to other questions and are not here.
// Usage: node research/ai-in-biology/dataset-timeline.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIR = dirname(fileURLToPath(import.meta.url));
const ROOT = join(DIR, '..', '..');
const read = (f) => JSON.parse(readFileSync(join(ROOT, 'data', f), 'utf8'));
const claims = new Map(read('claims.json').map((c) => [c.id, c]));

// Dataset claims shown in the timeline, with the strand each belongs to.
const CLAIMS = {
  'atlas-deepmind-alphafold': 'Models and resources',
  'atlas-alphafold-structure': 'Models and resources',
  'atlas-deepmind-alphafold-compute': 'Models and resources',
  'atlas-jumper-alphafold': 'People',
  'atlas-john-jumper-deepmind': 'People',
  'atlas-jumper-gdm': 'People',
  'demis-hassabis-cofounded-deepmind-2010': 'People',
  'hassabis-deepmind-ceo-2023': 'People',
  'lg-goo-hassabis-gdm-chair-2026': 'People',
  'lg-goo-hassabis-alphabet-chief-scientist-2026': 'People',
};

const rows = [];
const missing = [];
for (const [id, strand] of Object.entries(CLAIMS)) {
  const c = claims.get(id);
  if (!c) {
    missing.push(id);
    continue;
  }
  const date = c.time?.date;
  if (!date) continue;
  rows.push({
    date,
    basis: c.time.kind === 'snapshot' ? 'snapshot' : (c.time.basis ?? 'event'),
    strand,
    claim: id,
    event: c.statement,
  });
}
rows.sort((a, b) => a.date.localeCompare(b.date));
writeFileSync(
  join(DIR, 'timeline-dataset.json'),
  JSON.stringify(rows, null, 2) + '\n',
);
console.log(
  `${rows.length} dataset rows${missing.length ? `; missing: ${missing.join(', ')}` : ''}`,
);
