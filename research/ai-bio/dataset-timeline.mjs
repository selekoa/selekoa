// Writes timeline-dataset.json: dated records already in Selekoa's dataset that bear on
// AI and biological risk, which the pack's timeline shows for orientation (marked ◇).
// The selection is an explicit list, so that it can be checked: the dated claims whose
// proposition concerns biological risk, plus the publication or effective date of each
// framework edition in the comparison. Records about biologically inspired timelines or
// about existential risk in general are not here; they concern another question.
// Usage: node research/ai-bio/dataset-timeline.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIR = dirname(fileURLToPath(import.meta.url));
const ROOT = join(DIR, '..', '..');
const read = (f) => JSON.parse(readFileSync(join(ROOT, 'data', f), 'utf8'));
const claims = new Map(read('claims.json').map((c) => [c.id, c]));
const entities = new Map(read('entities.json').map((e) => [e.id, e]));

// Dataset claims shown in the timeline, with the strand each belongs to.
const CLAIMS = {
  // Framework provisions on biological thresholds, safeguards and changes.
  'prov-rsp-v2-0-misuse-uplift-threshold': 'Frameworks',
  'prov-rsp-v2-1-misuse-uplift-threshold': 'Frameworks',
  'prov-rsp-v2-2-misuse-uplift-threshold': 'Frameworks',
  'prov-rsp-v3-0-misuse-uplift-threshold': 'Frameworks',
  'prov-rsp-v3-2-novel-cb-threshold': 'Frameworks',
  'prov-rsp-v3-3-novel-cb-threshold': 'Frameworks',
  'fsf-v3-1-cbrn-tcls': 'Frameworks',
  'prov-faif-2025-bio-chem-acceptance-criterion': 'Frameworks',
  'prov-faif-2026-heightened-safeguards': 'Frameworks',
  'prov-meta-faf-v1-1-high-threshold': 'Frameworks',
  'prov-meta-faf-v1-1-high-deployment-measure': 'Frameworks',
  'prov-meta-aasf-v2-0-cb-high-external-deployment-exception': 'Frameworks',
  'prov-ms-fgf-2025-cbrn-high-threshold': 'Frameworks',
  'prov-ms-fgf-2026-cbrn-high-threshold': 'Frameworks',
  // Instruments and government texts that name biological risk.
  'sb-catastrophic-risk-threshold': 'Government measures',
  'prov-eu-code-ss-specified-systemic-risks': 'Government measures',
  'fl-eu-cop-draft1-risk-types': 'Government measures',
  'fl-intl-seoul-ministerial-cbrn-risk': 'Government measures',
  'fl-us-eo14110-sec42b-threshold': 'Government measures',
  'fl-us-nist-ai-800-1-2pd-changes': 'Government measures',
  'c2-governance-tc260-asgf-v1-training-data-cbrn': 'Government measures',
  'c2-governance-tc260-asgf-v1-end-use-traceability': 'Government measures',
  'c2-governance-tc260-asgf-v2-training-data-cbrn': 'Government measures',
};
// The framework families whose editions carry a comparison cell on chemical,
// biological, radiological or nuclear weapons.
const FAMILIES = new Set([
  'anthropic-rsp',
  'deepmind-fsf',
  'openai-preparedness',
  'openai-frontier-governance',
  'xai-faif',
  'meta-frontier-ai',
  'microsoft-frontier-governance',
]);

const rows = [];
const missing = [];
for (const [id, strand] of Object.entries(CLAIMS)) {
  const c = claims.get(id);
  if (!c?.time?.date) {
    missing.push(id);
    continue;
  }
  rows.push({
    date: c.time.date,
    basis: c.time.basis,
    strand,
    claim: c.id,
    event: c.statement,
  });
}
for (const e of entities.values()) {
  const dv = e.documentVersion;
  if (!dv || !FAMILIES.has(dv.family)) continue;
  const date = dv.publishedAt ?? dv.effectiveAt;
  if (!date) continue;
  rows.push({
    date,
    basis: dv.publishedAt ? 'publication' : 'effective',
    strand: 'Frameworks',
    document: e.id,
    event: `${e.name} (framework edition in the comparison)`,
  });
}
rows.sort(
  (a, b) => a.date.localeCompare(b.date) || a.strand.localeCompare(b.strand),
);
writeFileSync(
  join(DIR, 'timeline-dataset.json'),
  JSON.stringify(rows, null, 2) + '\n',
);
console.log(`${rows.length} rows`);
if (missing.length)
  console.log(`not found in the dataset: ${missing.join(', ')}`);
