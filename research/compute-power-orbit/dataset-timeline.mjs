// Writes timeline-dataset.json: dated compute, capital and export-control records already in
// Selekoa's dataset, which the pack's timeline shows for orientation and which drafts extend
// rather than duplicate.
// Usage: node research/compute-power-orbit/dataset-timeline.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIR = dirname(fileURLToPath(import.meta.url));
const ROOT = join(DIR, '..', '..');
const read = (f) => JSON.parse(readFileSync(join(ROOT, 'data', f), 'utf8'));
const claims = read('claims.json');
// Export-control records admitted in v0.11.0 (frameworks to law).
const BIS = /^fl-us-bis-/;
// Records outside the compute topic that the orbital strand depends on.
const EXTRA = new Set(['xm-spacex-acquisition']);
// Capital records with no bearing on compute (rounds of other firms, acquisitions, grants).
const OTHER_CAPITAL =
  /^(c2-minimax|lg-|eval-i-|xm-x-acquisition|cn-zhipu|cn-high-flyer|google-acquired-deepmind)/;
const STRAND = (c) =>
  BIS.test(c.id)
    ? 'Chip supply'
    : ['uses_hardware_from'].includes(c.predicate)
      ? 'Chip supply'
      : 'Data-centre projects';
const rows = claims
  .filter(
    (c) =>
      c.time?.date &&
      (c.topic === 'compute' ||
        EXTRA.has(c.id) ||
        BIS.test(c.id) ||
        (c.topic === 'capital' && !OTHER_CAPITAL.test(c.id))) &&
      !['states_provision'].includes(c.predicate),
  )
  .map((c) => ({
    date: c.time.date,
    basis: c.time.basis ?? c.time.kind,
    strand: STRAND(c),
    claim: c.id,
    predicate: c.predicate,
    subject: c.subject,
    object: c.object?.entityId ?? c.object?.value,
    event: c.statement,
  }))
  .sort(
    (a, b) => a.date.localeCompare(b.date) || a.claim.localeCompare(b.claim),
  );
writeFileSync(
  join(DIR, 'timeline-dataset.json'),
  JSON.stringify(rows, null, 2) + '\n',
);
console.log(rows.length);
