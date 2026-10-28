# Compare frameworks: the other twelve questions, as paraphrases (2026-10-27)

**Status: built on branch `compare-more-facets`, with main after PR #75 merged in; not merged to main, not deployed.** Release v0.9.0 (dataset schema 2.18) is written under `release/` but not tagged or published.

## Decision

Maintainer decision of 2026-10-27: only six comparison questions (D3, D4, D6) fit under the per-document quotation limit ([design record](framework-comparison-ui-2026-10-27.md#1-the-constraint-the-quotation-limit)). The other twelve (D1 risk domains, D2 thresholds, D5 evaluation timing, D7 reporting, D8 revision) are admitted as explicit paraphrases with page locators, not quotations, and the quotation limit stays as it is. The pack was cross-family checked (2026-10-15) and adjudicated (2026-10-15, 2026-10-26, and Rule B on 2026-10-27), which meets the admission rule for its cell statuses.

The pack has eighteen questions, not seventeen as the design record and the task brief counted: six were admitted first, so twelve remained.

## What was added

248 cells, one claim per edition and question, with the pack's statuses unchanged:

| Status                                   | Cells |
| ---------------------------------------- | ----: |
| Stated                                   |   190 |
| Stated, partly (Rule B)                  |    34 |
| Recorded, not re-checked (Meta v1.1, D2) |     2 |
| Not found within the recorded search     |    22 |
| **Total**                                |   248 |

301 evidence rows: 279 paraphrases (one per pack passage) and 22 search records for the absences. Per question: 21 cells each for D1 (five questions), D5, D7 (two) and D8 revision process; 22 for each D2 question (Meta v1.1 has recorded passages for both); 15 for D8 stated changes.

**Cells left out (no record), as in the pack:**

- _Stated changes from the previous edition_ for the seven first editions (RSP v1.0, FSF v1.0, Preparedness Framework beta, OpenAI Frontier Governance Framework, xAI FAIF December 2025, Meta Frontier AI Framework v1.1, Microsoft FGF 2025): the question does not apply. The page shows "Does not apply" with the reason, from the collection definition (`notApplicable`).
- Meta Frontier AI Framework v1.1, nine further cells (D1 ×5, D5, D7 ×2, D8 revision process): the edition could not be retrieved and no passage was recorded earlier. The page shows "Not checked", as for its four earlier cells.

No cell was left out for any other reason.

## How the paraphrases were made

- **Editions re-read.** The 20 retrievable editions were fetched again from the publisher addresses on 2026-10-27; every SHA-256 matches `pack.json`. Each passage was re-read on its PDF page before paraphrasing. Evidence `checkedAt` is 2026-10-27.
- **xAI FAIF June 2026** was not re-fetched: the publisher address no longer serves it, and the Internet Archive refused connections from this environment. Its 16 paraphrases were written from the pack's quotations, checked on 2026-10-15 against the publisher copy whose SHA-256 the [archive check](../research/archive-checks-2026-10-26/codex-report.md) matched in the 2026-07-16 capture. Evidence `checkedAt` stays 2026-10-15 and the note says so.
- **Meta Frontier AI Framework v1.1.** The two D2 cells paraphrase passages already recorded in the dataset from the 2025-02-13 capture; they stay "Recorded, not re-checked", with the recorded locator and check date.
- **Rules** (applied to paraphrases and to the rewritten notes): state only what the passage states; keep the passage's modal force and tense; no motive, evaluation, implementation or compliance language; conditions and scope in the note (Rule B); at most 50 words; quotation marks only around an edition's exact term of at most six words; no other run of more than five words copied from the edition, except three names of offices, bodies or document types. The pack's notes quoted clauses of the editions; those clauses were rewritten as paraphrase, so the notes add no quotations beyond short terms.
- **Drafting** by five fresh-context passes, one per framework group, all one model family. Results are in `research/frontier-framework-comparison/paraphrases.json`.
- **Mechanical checks.** `node research/frontier-framework-comparison/admit-paraphrases.mjs --check` checks length, page locator, copied runs against the edition text layer (for the two editions not re-read, against their recorded passages), and that every quoted term occurs in the edition. It caught a wrong row title in RSP v3.3 and v3.4 (the drafts had used v3.1's title; the title was confirmed on the rendered page) and quoted search terms; both resolved.
- **Audit.** Fresh-context audits of the same model family read every paraphrase and every rewritten note against the edition: first a recorded sample (random 20% of four groups plus every "partly" and not-re-read cell, 83 items; a random 25% of the DeepMind group plus its "partly" cells, 14 items), then every remaining item (204, including all search records). Of 301 items, 69 were sent back. Most were drift in modal force or qualifiers ("may" rendered "could", "can" rendered "may", "reasonably foreseeable" shortened, a plan stated as present practice), some dropped scope (a row's limit to weapons beyond past catastrophes), a few added an order or relation the passage does not state, and the rest were copied runs or inexact quoted terms. All were corrected and re-checked mechanically. No status was disputed. No cross-family check of the paraphrases was run; the statuses rest on the earlier cross-family check and adjudication.

**Pack corrections found while re-reading** (notes only, no status change): RSP v1.0 says "biological risks", not "bioweapons risks" (D1.cbrn note), and calls the misinformation work complementary to the commitments (D1.persuasion search record); OpenAI FGF's severity definition is on PDF p. 5, not p. 6 (D2.definition note); Preparedness Framework v2 §4.3 lists public acknowledgement as a condition for a marginal-risk adjustment, not as a requirement (D7.external note); Microsoft FGF 2026's D7.external sentence continues beyond the pack's quotation, and the paraphrase covers the whole sentence; FSF v3.1's footnote 4 exception for low-risk deployments was added to the D5 note; three RSP v3.x D1.other locators now cite the row itself on PDF p. 7 (recorded in `paraphrases.json` as `locatorCorrected`).

## Data model (schema 2.18)

- Each comparison dimension states `passages: 'quote' | 'paraphrase'` (`src/domain/framework-comparison.ts`). A stated cell of a paraphrased question needs supporting primary paraphrases of at most 50 words from the edition and carries no quotation; validation rejects a quote on it. Quoted questions keep the quotation rule.
- New `attributes.provision.kind` values `risk_domain`, `evaluation_timing`, `reporting` and `revision`, used only by comparison cells; D2 uses `threshold`. This enumeration addition is a schema change, so the release is minor (v0.9.0) under [`docs/dataset-format.md`](../docs/dataset-format.md#versions), not the patch the task anticipated. Mapping D5, D7 and D8 onto existing kinds would have kept a patch but mislabelled them.
- Qualification: status sentence, the cell's note, and the standing sentence "What the edition states, paraphrased from the cited expression with its page …". Evidence note: how and when the paraphrase was written and checked, and "Human editorial review is pending."
- The quoted words per edition are unchanged (`admit.mjs --budget`: the dataset column equals the admitted-six column).

## Page

`/compare/frontier-safety-frameworks` now has 17 questions in eight dimensions, D1 to D8 in order. A paraphrased cell shows "Paraphrase:" before Selekoa's wording, in body type with a dotted rule rather than as a quotation, then the page locator. A new status, "Does not apply", covers first editions on stated changes. The introduction, limits, legend and Governance hub entry say which questions quote and which paraphrase. The pre-rendered page carries the same table.

## History and release

- Before-snapshot `review/compare-more-facets-before-2026-10-27.json`, first in the chain in `src/editorial/historical-views.ts`; the historical-views test reproduces the schema 2.17 dataset exactly.
- Release v0.9.0: 549 added (248 claims, 301 evidence), 1 changed (the comparison collection). `pnpm release 0.9.0 --check` reproduces it byte for byte.

### Merge of main after PR #75 (2026-10-27)

Main merged PR #75 (author person records, release v0.8.1) after this branch was built. `origin/main` was merged in (no rebase) and everything generated was regenerated, not hand-merged:

- **Data.** `data/claims.json`, `evidence.json` and `meta.json` were taken from main and the admission re-run on them (`admit-paraphrases.mjs --write`). The 248 claims and 301 evidence rows it wrote are identical, field for field, to those first admitted; the 2.18 scope sentence follows #75's. Entities and sources are main's.
- **Before-snapshot.** `review/compare-more-facets-before-2026-10-27.json` was rewritten by the same run against the post-#75 dataset: its `meta`, hashes and base (`ceb84c5`, release v0.8.1) now describe main after #75; the added IDs are unchanged. In `src/editorial/historical-views.ts` it stays first in the chain, followed by #75's snapshot (now also listed in `historicalViews`, exact) and the rest.
- **Release.** v0.9.0 was regenerated with `pnpm release 0.9.0` against v0.8.1: still 549 added and 1 changed; the totals include #75's records. `release/CHANGELOG.md` lists v0.9.0, then v0.8.1. The README coverage block was regenerated with `pnpm docs:coverage`.
- **Tests.** The claim-set tests in `src/domain/transactions.test.ts` and `versions.test.ts` list both increments' added claims.
- **Checks after the merge.** `pnpm install --frozen-lockfile`; `pnpm check` (604 unit tests); `pnpm check:privacy`; `pnpm release 0.9.0 --check` (byte for byte); the full browser suite in Chromium against the production preview, 203 of 203 passed, with no count changes needed.

## Checks

`pnpm install --frozen-lockfile`; `admit-paraphrases.mjs --check` (no problems); `pnpm check` (599 unit tests, 1 skipped); `pnpm check:privacy`; `pnpm release 0.9.0 --check`; the full browser suite in Chromium against the production preview: 203 tests, 201 passed on the first run; the two failures were the governance timeline counts, which rise by the added cells (Anthropic 169 → 276, xAI 28 → 51), updated and re-run green. New browser tests: paraphrased cells are labelled and never shown as quotations, the inspector shows the paraphrase note, a first edition shows "Does not apply", and the built page carries the paraphrased rows. The app page was also inspected at 1440 and 390 px; the only console errors were the analytics beacon, which the tests stub.

## Open decisions for the maintainer

1. **Minor, not patch.** v0.9.0 because of the four new provision kinds. Say if you prefer another mapping.
2. **Cross-family check of the paraphrases.** Not run; same-family drafting and audit only. The audit's correction rate (69 of 301 items) suggests one before any use beyond exploration, as the policy's escalation for a large machine-written increment.
3. **Meta v1.1 and xAI June 2026** remain unchecked against a fresh copy (archive unreachable from this environment).
