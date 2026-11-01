// Integrator's changes before the audit, applied to the drafts (corrections are made
// in the drafts, never in pack.json). Each change is listed in audit.md. Idempotent.
// Usage (repository root): node research/ai-in-biology/integrate.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIR = join(dirname(fileURLToPath(import.meta.url)), 'drafts');
const GROUPS = ['labs', 'companies', 'models', 'people', 'claims'];
const drafts = Object.fromEntries(
  GROUPS.map((g) => [
    g,
    JSON.parse(readFileSync(join(DIR, `${g}.json`), 'utf8')),
  ]),
);

// 1. One document id per expression, where two or three passes defined the same page.
const DOCS = {
  'aib-doc-esm3-release-post-2024': 'aib-doc-esm3-release-2024',
  'aib-doc-evolutionaryscale-esm3-post-2024': 'aib-doc-esm3-release-2024',
  'aib-doc-isomorphic-intro-2021': 'aib-doc-iso-launch-2021',
};
// 2. One source key per address, so that the quotation budget counts every pass's quotes.
const SOURCES = {
  'evolutionaryscale-esm3-post-2024': 'esm3-release-post',
  'labs-esm-launch': 'esm3-release-post',
  'isomorphic-intro-2021': 'labs-iso-launch',
  'people-rfdiffusion-nature': 'watson-2023-nature',
  'people-alphamissense-pubmed': 'alphamissense-record',
  'people-rosettafold-pmc': 'rosettafold-paper',
  'people-esm1b-pmc': 'esm1b-paper',
  'people-esm2-pubmed': 'esm2-record',
  'people-esm3-pubmed': 'esm3-record',
};
const mapId = (x) => DOCS[x] ?? x;
let changes = 0;
for (const [, d] of Object.entries(drafts)) {
  const before = JSON.stringify(d);
  d.documents = (d.documents ?? []).filter((x) => !DOCS[x.id]);
  d.sources = (d.sources ?? [])
    .filter((s) => !SOURCES[s.key])
    .map((s) => ({ ...s, documentId: mapId(s.documentId) }));
  for (const c of d.claims ?? []) {
    c.subject = mapId(c.subject);
    if (c.object?.kind === 'entity')
      c.object.entityId = mapId(c.object.entityId);
    for (const e of c.evidence ?? []) e.source = SOURCES[e.source] ?? e.source;
  }
  if (JSON.stringify(d) !== before) changes++;
}
// The canonical sources must be defined somewhere; a key used only by a dropped
// duplicate is re-homed into the draft that cites it.
const allKeys = new Set(
  Object.values(drafts).flatMap((d) => d.sources.map((s) => s.key)),
);
for (const k of new Set(Object.values(SOURCES)))
  if (!allKeys.has(k))
    throw new Error(`canonical source ${k} is not defined in any draft`);

// 3. Roles read from an undated page are snapshots at the retrieval date (scope.md, "Dates").
for (const c of drafts.people.claims)
  if (
    [
      'aib-ppl-baker-casp14-advisory-board',
      'aib-ppl-moult-casp-chair',
    ].includes(c.id) &&
    c.time.date === '2020'
  ) {
    c.time = {
      kind: 'snapshot',
      date: '2026-10-30',
      note: 'The CASP14 home page states no date; the listing is read as served on 2026-10-30. The page concerns the CASP14 experiment (2020), but no date of the listing itself is stated, so none is inferred.',
    };
    changes++;
  }

// 4. Proposition P3: link the companies' own statements that name an AI-designed or
// AI-discovered candidate in a trial, using their sources (no new quotation).
const co = new Map(drafts.companies.claims.map((c) => [c.id, c]));
const P3 = 'aib-prop-ai-drug-candidate-in-trials';
const add = (id, from, subject, statement, date, evIdx, qualifier) => {
  if (drafts.claims.claims.some((c) => c.id === id)) return;
  const src = co.get(from);
  drafts.claims.claims.push({
    id,
    group: 'claims',
    strand: 'Claims about AI and biology',
    subject,
    predicate: 'articulates_proposition',
    proposedPredicate: false,
    object: { kind: 'entity', entityId: P3 },
    statement,
    time: {
      kind: 'event',
      date,
      basis: src.time.basis ?? 'publication',
      note: src.time.note ?? null,
    },
    derivation: 'explicit',
    resolution: 'supported',
    qualification:
      'The record documents what this text states, in its register; it is not evidence that the proposition is true and implies no influence on or from any other text. The company’s own statement; no clinical-trial registry entry was retrieved. Added by the integrator from the companies pass’s evidence (record ' +
      from +
      ').',
    extends: null,
    siblingLinks: [],
    attributes: {
      thought: { roles: ['articulation'], register: 'nonfiction', qualifier },
    },
    hazardNote: null,
    evidence: evIdx.map((i) => ({ ...src.evidence[i] })),
  });
  changes++;
};
add(
  'aib-arg-p3-exscientia-2021',
  'aib-co-exscientia-phase1-2021',
  co.get('aib-co-exscientia-phase1-2021').subject,
  'Exscientia’s IPO prospectus (30 September 2021) states that it began a Phase 1 trial of EXS21546 in December 2020 and that it “originated the first three AI-designed precision drug candidates to enter human clinical trials”.',
  co.get('aib-co-exscientia-phase1-2021').time.date,
  [0, 2],
  'A prospectus statement by the issuer; the priority wording is the company’s and is quoted, not adopted.',
);
add(
  'aib-arg-p3-insilico-2026',
  'aib-co-insilico-rentosertib-phase3-initiation-2026',
  co.get('aib-co-insilico-rentosertib-phase3-initiation-2026').subject,
  'Insilico Medicine’s announcement of 8 July 2026 states that rentosertib, which it says was discovered and developed with the support of its generative AI platform, had entered a Phase III clinical trial.',
  co.get('aib-co-insilico-rentosertib-phase3-initiation-2026').time.date,
  [0, 1],
  'A company announcement to the Hong Kong exchange; the phase is as stated.',
);

for (const [g, d] of Object.entries(drafts))
  writeFileSync(join(DIR, `${g}.json`), JSON.stringify(d, null, 2) + '\n');
console.log(`integration: ${changes} changes applied`);
