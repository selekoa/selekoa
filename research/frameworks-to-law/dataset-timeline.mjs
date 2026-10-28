// Writes timeline-dataset.json: dated events already in Selekoa's dataset that the pack's
// timeline shows for orientation (issue and enactment of commitment texts and laws, and
// publication or effective dates of the developers' framework editions).
// Usage: node research/frameworks-to-law/dataset-timeline.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIR = dirname(fileURLToPath(import.meta.url));
const ROOT = join(DIR, '..', '..');
const read = (f) => JSON.parse(readFileSync(join(ROOT, 'data', f), 'utf8'));
const claims = read('claims.json');
const entities = new Map(read('entities.json').map((e) => [e.id, e]));
const INSTRUMENTS = new Set([
  'wh-voluntary-ai-commitments-2023-07',
  'wh-voluntary-ai-commitments-2023-09',
  'frontier-ai-safety-commitments-2024',
  'gpai-code-of-practice-2025',
  'eu-ai-act-2024',
  'eu-digital-omnibus-ai-2026',
  'eu-gpai-guidelines-2025',
  'eu-gpai-guidelines-communication-2025',
  'eu-gpai-training-summary-template-2025',
  'eu-draft-implementing-regulation-gpai-proceedings-2026',
  'california-sb-53',
  'new-york-raise-act',
  'new-york-raise-act-chapter-96-2026',
  'cn-generative-ai-interim-measures-2023',
]);
const JUR = (id) =>
  /^eu-|gpai/.test(id)
    ? 'EU'
    : /california|new-york/.test(id)
      ? 'US states'
      : /^wh-/.test(id)
        ? 'US federal'
        : /^cn-/.test(id)
          ? 'China'
          : id === 'frontier-ai-safety-commitments-2024'
            ? 'International'
            : 'Framework editions';
// Provisions that state a date: shown at the date they state, with its kind.
const DATE_PROVISIONS = {
  'aia-art113-chapter-v-date': ['2025-08-02', 'application'],
  'aia-art113-general-date': ['2026-08-02', 'application'],
  'omni-entry-into-force': ['2026-07-27', 'entry_into_force'],
  'ny-ch96-effective-date': ['2027-01-01', 'effective'],
};
const rows = [];
for (const c of claims) {
  const o = c.object?.entityId;
  if (!c.time?.date) continue;
  if (['enacted', 'published'].includes(c.predicate) && INSTRUMENTS.has(o))
    rows.push({
      date: c.time.date,
      basis: c.time.basis,
      jurisdiction: JUR(o),
      claim: c.id,
      event: `${entities.get(o).name}: ${c.predicate === 'enacted' ? 'enacted or adopted' : 'issued or published'}`,
    });
  if (DATE_PROVISIONS[c.id])
    rows.push({
      date: DATE_PROVISIONS[c.id][0],
      basis: DATE_PROVISIONS[c.id][1],
      jurisdiction: JUR(c.subject),
      claim: c.id,
      event: c.statement,
    });
}
for (const e of entities.values()) {
  const dv = e.documentVersion;
  if (dv?.effectiveAt && INSTRUMENTS.has(e.id))
    rows.push({
      date: dv.effectiveAt,
      basis: 'effective',
      jurisdiction: JUR(e.id),
      document: e.id,
      event: `${e.name}: effective (document record)`,
    });
  if (
    !dv ||
    ![
      'anthropic-rsp',
      'deepmind-fsf',
      'openai-preparedness',
      'openai-frontier-governance',
      'xai-faif',
      'meta-frontier-ai',
      'microsoft-frontier-governance',
    ].includes(dv.family)
  )
    continue;
  const date = dv.publishedAt ?? dv.effectiveAt;
  if (date)
    rows.push({
      date,
      basis: dv.publishedAt ? 'publication' : 'effective',
      jurisdiction: 'Framework editions',
      document: e.id,
      event: `${e.name}`,
    });
}
rows.sort((a, b) => a.date.localeCompare(b.date));
writeFileSync(
  join(DIR, 'timeline-dataset.json'),
  JSON.stringify(rows, null, 2) + '\n',
);
console.log(rows.length);
