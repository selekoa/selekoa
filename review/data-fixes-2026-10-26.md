# Data fixes of 2026-10-26: decision record

**Status: applied on branch `data-fixes-2026-10-26`; not merged.** The maintainer adjudicated on 2026-10-26 two findings of the reader test ([`docs/fresh-eyes-2026-10-26.md`](https://github.com/futurelightcone/selekoa-dev/blob/fresh-eyes-live/docs/fresh-eyes-2026-10-26.md), on branch `fresh-eyes-live`), the same-family re-check of the capital and compute verifications ([`recheck-42-capital-compute-2026-10-26.md`](recheck-42-capital-compute-2026-10-26.md)) and the same-family re-check of the framework comparison's "not found" cells ([`recheck-38-frameworks-2026-10-26.md`](recheck-38-frameworks-2026-10-26.md)). This record lists each ruling, what was applied or not applied and why, and every record and cell changed.

**No ruling was skipped as wrong against the source.** One ruling (A2) turned out to concern the interface, not the data, and is recorded below for the UI session, as the ruling allows. Two cells next to the rulings were considered and left unchanged as borderline; they are listed under C6 for the maintainer.

All dataset records remain seeds. Dataset release **v0.7.1** (patch: corrections to existing records, none added, schema unchanged at 2.16). Nothing was published, deployed or tagged.

## A. Reader test

### A1. "Stabilization" as author of the 1955 hearings: applied

The title page of the hearings volume (Internet Archive item `congress-automation-and-technological-change`, OCR text retrieved 2026-10-26) reads: "Automation and Technological Change. Hearings before the Subcommittee on Economic Stabilization of the Joint Committee on the Economic Report, Congress of the United States, Eighty-fourth Congress, first session … October 14, 15, 17, 18, 24, 25, 26, 27, and 28, 1955". The wrong credit came from the economics admission script, which took the last word of the corporate author as a surname.

| Record                                                    | Field     | Before                                                       | After                                                                                                                               |
| --------------------------------------------------------- | --------- | ------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| entity `automation-hearings-1955-other-witnesses`         | shortName | Stabilization, Automation and Technological Change (1955)    | Subcommittee on Economic Stabilization, Automation and Technological Change (1955)                                                  |
| claim `ec-m05-automation-hearings-1955-other-witnesses-b` | statement | begins "Stabilization, “Automation and Technological Change" | begins "Subcommittee on Economic Stabilization of the Joint Committee on the Economic Report, “Automation and Technological Change" |
| claim `ec-m09-automation-hearings-1955-other-witnesses-b` | statement | as above                                                     | as above                                                                                                                            |

Not changed: the source record's `authors` ("Joint Committee on the Economic Report, Subcommittee on Economic Stabilization") and its citation strings. They name the subcommittee correctly in catalogue order, and citation export reads them. The four witness-statement sources and entities credit their witnesses and were already right.

### A1a. "Progress" as author of the 1966 National Commission volumes: applied (follow-up ruling of 2026-10-26)

After this record first listed it as open, the maintainer ruled that the same last-word error in the 1966 National Commission records be fixed too. Title pages (ERIC copies on the Internet Archive, OCR text retrieved 2026-10-26): Volume I is the "Report of the National Commission on Technology, Automation, and Economic Progress", February 1966 (ED 023 803). Appendix Volume II, The Employment Impact of Technological Change, is "Studies prepared for the National Commission on Technology, Automation, and Economic Progress", February 1966 (ED 022 857). Its source record already credits the Commission as author, and that credit is kept.

- Entities `technology-and-the-american-economy-1966` and `employment-impact-of-technological-change-1966`: shortName began "Progress, "; now begins "National Commission on Technology, Automation, and Economic Progress, ".
- Eight claim statements: began "Progress, “"; now begin "National Commission on Technology, Automation, and Economic Progress, “". Claims `ec-m01-technology-and-the-american-economy-1966-b`, `ec-m02-technology-and-the-american-economy-1966-b`, `ec-m05-technology-and-the-american-economy-1966-b`, `ec-m05-technology-and-the-american-economy-1966-c`, `ec-m06a-technology-and-the-american-economy-1966-a`, `ec-m06a-employment-impact-of-technological-change-1966-b`, `ec-m06b-technology-and-the-american-economy-1966-a`, `ec-m06b-technology-and-the-american-economy-1966-b`.

A search of every entity short name whose first word matches the last word of one of its source's authors found no other corporate author; the remaining matches are personal surnames, as intended.

### A2. Larry Summers' date line: no data change; UI wording for the UI session

The claim `cs-summers-initial-board-2023` has two evidence records. The supporting one cites OpenAI's announcement of 2023-11-29 (`source-openai-new-initial-board-2023`, publication date 2023-11-29). The context one cites OpenAI's undated "Our structure" page (`source-openai-our-structure`, publication date unknown, read in the capture of 2025-10-29). Both dates are correct: the page carries no date, and unknown dates stay unknown.

The contradiction is in `src/ui/PersonPage.tsx` (`PathRow`): it prints one "Source published …" or "Source publication date unknown" phrase per cited source, joined by " · ", without naming the source or its role. Two sources produce "Source published 2023-11-29 · Source publication date unknown". **For the UI session:** name the source each date belongs to, or show only supporting evidence on the row and leave context sources to the claim panel. No data change.

## B. Capital and compute (#42)

### B3. `anthropic-rainier-2025`: applied

Qualification extended. Before: "Company-reported deployed workload infrastructure; not independent performance validation or Anthropic ownership." After: the same, followed by "The cited passage states the cluster’s launch and purpose; it does not state Anthropic’s use at this date. Amazon’s 2026-04-20 page states active use (later snapshot)." Stage `deployed` and the 2025-10-30 snapshot kept.

No later snapshot was added. The ruling allows one only if the 2026-04-20 passage stating active use ("Anthropic is now actively using it to train and deploy Claude models") is already an admitted evidence record. It is not: the evidence of claims 21–23 quotes other paragraphs of that page, and no evidence record contains the passage.

### B4. Claim 23 locator: applied

Evidence `evidence-anthropic-aws-commitment-2026` (claim `anthropic-aws-commitment-2026`). Locator before: "Paragraph beginning “Expanding on this success”". After: "Summary bullet on 5 GW of Trainium chips, and paragraph beginning “Expanding on this success”". The quotation, check date and note are unchanged. The optional period wording in the report was not ruled on and was not changed.

Not touched, as ruled: the Stargate claims 11–13.

## C. Framework comparison (#38)

All changes are in the candidate pack `research/frontier-framework-comparison/` (outside application data): `pack.json`, the regenerated `pack.md`, `verification.json` (Microsoft February 2026 entries only), `scope.md` (facet boundaries) and the README (decision 8). The five editions read for these changes were re-retrieved from their publisher addresses on 2026-10-26 with the pack's own tool; each has the SHA-256 recorded in the pack (Google DeepMind FSF v1.0, OpenAI Preparedness Framework beta, OpenAI FGF 2026, Meta AASF v2.0, Microsoft FGF February 2026). Not touched, as ruled: the four xAI FAIF June 2026 cells (archive check pending).

### C5. D7.external boundary: applied

Criterion now ends "…to other external parties, excluding publication of the framework itself (recorded under D8 Revision)."

Applied to every edition. No counted D7.external entry in any edition is publication of the framework itself, so no status changed. Cells changed:

- `fsf-2024.D7.external`: stays not found. The hits-not-counted text now says the p. 6 passage "we will publish substantive revisions as appropriate" was considered and is excluded by the criterion (it is already counted under `fsf-2024.D8.process`).
- `frontier-governance-2026.D7.external`: stays stated. Its mapping note mentioned the §7.1 changelogs (PDF p. 21) as further disclosure; it now says that, as publication of the framework itself, this is recorded under D8 Revision.

### C6. D1 overlap rule: applied

Added to both criteria. D1.autonomy: "Overlap rule: autonomy, self-replication and AI research and development are recorded here; loss of control or misalignment defined through deception or undermining human oversight is recorded under D1.other." D1.other: the same rule, from its side.

Cells changed:

- `ms-fgf-2026.D1.other`: not found → **stated, partly**. Quotation: "Loss of control. A model’s ability to undermine effective human control through adaptive, deceptive, or self-reinforcing mechanisms such that, when deployed, a model can no longer be reliably directed, modified, or shut down." (PDF p. 4 (printed p. 3), §2, "Tracked high-risk capabilities", fourth bullet; 33 words; verified against the retrieved copy). Note: "Separately named tracked capability without thresholds; Appendix I says risk acceptance criteria are being researched (p. 15)."
- `ms-fgf-2026.D1.autonomy`: stays stated, with its two entries. Its mapping note adds that, under the overlap rule, loss of control is also recorded under D1.other. The shorter loss-of-control quotation was kept there rather than moved, following the ruling's precedent that DeepMind v3.1 and xAI December 2025 record such content under both facets. If the rule should instead assign it to D1.other only, entry `ms-fgf-2026.D1.autonomy.2` would be removed.

Re-checked against the rule and left unchanged: every other edition's D1.autonomy and D1.other cell. Anthropic RSP v1.0–v3.4, DeepMind v1.0–v3.1, OpenAI Preparedness beta and v2, Microsoft February 2025 and xAI December 2025 already place autonomy, replication and AI R&D under D1.autonomy and misalignment, sabotage, deception or undermining safeguards under D1.other. Two cells are borderline and were not changed, because the rule does not clearly require it:

- `meta-aasf-v2-0.D1.other` (stated, partly: physical autonomy). Meta's Loss of Control domain is defined as "failures of critical control mechanisms—that is, technical and organizational measures which enable us to direct, modify, contain, or shut down AI" (PDF p. 22). Its threat scenarios include evaluation-adaptive behaviour and "AI disables or corrupts monitors to reduce oversight" (PDF pp. 22–23). The definition rests on failures of controls, not on deception or undermining oversight as such; the domain stays under D1.autonomy. Maintainer's call whether it also belongs under D1.other.
- `faif-2026.D1.autonomy` and `faif-2026.D1.other` (xAI, June 2026). Loss of control is defined as "risks from humans losing the ability to reliably direct, modify, or shut down a model" (PDF p. 1): an outcome, not a definition through deception or undermining oversight. The edition could not be re-read (publisher address 404), so no new passage could be checked. Unchanged.
- `frontier-governance-2026.D1.other` already records misalignment and deception as sources of loss-of-control risk (stated, partly). Unchanged.

### C7. D6.competitor narrowed: applied

Criterion before: "A provision that changes what the developer will do depending on what other developers do or have (often called a “race” or “marginal risk” clause)." After: "A provision that relaxes, adjusts or conditions the developer’s safeguards or commitments on what other developers do or have (often called a “race” or “marginal risk” clause)."

Cells changed:

- `meta-aasf-v2-0.D6.competitor`: stays not found. Mapping note now begins "Comparative scope and reference-class provisions, not a waiver of safeguards conditional on other developers" and names both passages as context: Appendix I's comparison with "the most advanced models" (PDF p. 41) and §2.1.1's comparison "against our own models and those available externally" to identify a "reference class" (PDF p. 4). The p. 4 passage was added to the hits not counted; the closing sentence uses the narrowed criterion.
- `frontier-governance-2026.D6.competitor`: the stored "uncertain" is resolved as **not found**. The p. 18 hit now reads "it governs report updates only, not safeguards, so it is not counted". Added context note: "Exemption from Model Report updates by reference to the EU Code of Practice's similarly-safe-or-safer test, whose safe reference model may be another provider's model (Code, Appendix 2.1); governs reporting only, not safeguards."

Re-checked against the narrowed criterion and left unchanged: Anthropic RSP v1.0 (stated, partly; possible loosening of restrictions if another actor scales recklessly), v2.0–v2.2 (possible lowering of Required Safeguards), v3.0–v3.4 (commitments set against competitors' risk-reduction posture); DeepMind v2.0, v3.0 and v3.1 (adoption of protocols or security levels adjusted by reference to other models); OpenAI Preparedness v2 (adjusted safeguards under marginal risk); and the not-found cells of DeepMind v1.0, Preparedness beta and xAI December 2025. Each stated cell relaxes, adjusts or conditions safeguards or commitments, so the narrower criterion still holds. Microsoft February 2025 and February 2026 (stated, partly: marginal capability uplift against open-weights models informs the risk determination) are nearest to the boundary. The determination decides which safeguards apply, so the partial reading stands; maintainer's call if it should follow Meta to not found.

### C8. `preparedness-beta-2023.D7.external`: applied

Stays not found. Two adjacent passages were added to the hits not counted as context: "alerting distribution partners" (PDF p. 14, Mitigations, first paragraph), a conditional mitigation option, and "Scorecard evaluations (and corresponding mitigations) will be audited by qualified, independent third-parties to ensure accurate reporting of results" (PDF p. 25, Accountability, Audits), a third-party audit. Neither is a disclosure commitment. Both were matched in the retrieved text layer.

### Pack totals

37 not-found cells (was 38) and 335 stated cells (was 334). Microsoft February 2026 quotes 368 words in the pack (cap 400); with the dataset's quotations, 580 distinct words if admitted (was 558).

## Procedure

- Before-snapshot `review/data-fixes-before-2026-10-26.json` (base `e176620`): earlier metadata, no added IDs, the 15 changed rows as they were, and hashes of the earlier dataset. First in the chain in `src/editorial/historical-views.ts`; the historical-views test reproduces every earlier dataset.
- `data/meta.json`: updated date 2026-10-26 and one sentence added to the scope. Schema stays 2.16.
- Regenerated: README coverage block (`pnpm docs:coverage`), `review/essay-starter-gaps.md` (`pnpm question:gaps`), `pack.md` (`tools.mjs render`). Review packs were not regenerated; the annotated packs are untouched.
- `verification.json`: `tools.mjs verify` needs every edition cached, and the xAI June 2026 copy cannot be retrieved. Only the Microsoft February 2026 entries were taken from a fresh run (new quotation matched on PDF p. 4; totals); every other entry is as stored.
- Release v0.7.1 by `pnpm release 0.7.1 --date 2026-10-26`: 0 added, 15 changed (3 entities, 11 claims, 1 evidence), 0 removed against v0.7.0. It was regenerated after the follow-up ruling (A1a); it had not been merged or published. `pnpm release 0.7.1 --check` reproduces it byte for byte. No ZIP, no tag.

## Checks

Run on this branch after the last data change (commit `1416a28`):

- `pnpm install --frozen-lockfile`: clean.
- `pnpm -s check` (format, lint, typecheck, 58 test files with 518 tests, build): passed. It includes the historical-views test, which reproduces every earlier dataset from the snapshot chain.
- `pnpm -s check:privacy`: passed.
- `pnpm release 0.7.1 --check`: reproduces byte for byte.
- `pnpm test:browser`, using Chromium at `/opt/pw-browsers` through an untracked config without the Edge `channel` line: 57 passed. **Caveat:** against the default production build, 27 tests failed for a reason outside this branch. Since #62 the preview build loads the Cloudflare Web Analytics beacon, and its requests from `http://127.0.0.1:4173` fail CORS, which the tests' no-console-errors assertions catch. Every failure inspected was that console error. The passing run used a trial build with analytics off through `SELEKOA_SITE_CONFIG` (a scratch copy of `site.config.json` with `analytics.provider` set to `none`); `site.config.json` itself is unchanged. The browser suite needs to ignore or block the beacon in preview. That is a separate decision, not part of this branch.
