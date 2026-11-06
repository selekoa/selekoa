// Applies the same-family audit's dispositions (audit.md) to the drafts. Run once.
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const f = join(
  dirname(fileURLToPath(import.meta.url)),
  '..',
  'drafts',
  'google-xai.json',
);
const d = JSON.parse(readFileSync(f, 'utf8'));
const c = d.cells.find((x) => x.card === 'xai-grok-4' && x.question === 'Q15');
// Audit item 20: two passages bear on the criterion's third partly case; record why they are set aside.
c.search.setAside = [
  {
    locator: "Section 1 'Introduction', PDF p. 1",
    reason:
      'States deployment and availability; availability alone is not a decision to release (decision 13a).',
  },
  {
    locator: "Section 2 'Evaluations', PDF p. 2",
    reason:
      "'we believe that Grok 4 overall presents a low risk for malicious use and loss of control' is a risk conclusion, not tied by the card to a release; no maker of a release decision is named.",
  },
  {
    locator: "Section 2.3.3 'Mitigations', PDF pp. 6–7",
    reason:
      "'we assess that Grok’s enforcement of our basic refusal policy is sufficient' is a safeguards assessment for cyber risks, not tied by the card to a release.",
  },
];
writeFileSync(f, JSON.stringify(d, null, 2) + '\n');
console.log('applied: xai-grok-4:Q15 set-asides');
