# Same-family audit, 2026-10-28

A fresh-context audit of the frameworks-to-law pack by the same model family (Claude) that drafted and merged it. It is not a cross-family check and not human review. Agreement here is not independent corroboration.

## Sample

[`audit-sample.json`](audit-sample.json) records the draw (seed 20261029, linear congruential generator) from the 184 merged records as they stood before the audit:

- **Random:** 30 records drawn from the 134 records outside the targeted class.
- **Targeted:** 34 records drawn by the same generator from the 50 records in the targeted class: inferred records, records with a proposed predicate, listings, refusals, absences from a list, framework links, absences found by search, and records resting on secondary sources.

64 records were audited (35% of the pack). The 120 records outside the sample are not certified by it.

## Method

Two auditors, each a fresh context given 32 records (statement, date and its kind, qualification, evidence with source address, locator and passage) and told to refute them. Neither saw the drafts, `pack.json`, `pack.md` or the drafting passes' notes. Each read the cached retrievals with `tools.mjs` and could re-fetch a source by direct HTTP. Each recorded per record: quote verbatim, locator, support, date and its kind, identity, overstatement, qualification and a verdict (upheld, correct, drop). Their reports are [`audit/audit-A.json`](audit/audit-A.json) and [`audit/audit-B.json`](audit/audit-B.json).

## Results

| Sample   | Upheld | Corrected | Dropped |
| -------- | -----: | --------: | ------: |
| Random   |     22 |         8 |       0 |
| Targeted |     23 |        11 |       0 |

Every quotation in the sample was found in its source. One mechanical mismatch an auditor met (RSP v3.3) came from zero-width characters in the PDF text layer, which `tools.mjs` normalises.

## Corrections applied (all 19)

| Record                                           | Finding                                                                                                                                                             | Disposition                                                                                                                                               |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `fl-eu-aia-art92-3-access`                       | Date note applied the Chapter V date; Article 92 is in Chapter IX and applies from 2 August 2026.                                                                   | Note rewritten; extended to `fl-eu-aia-art92-evaluations`.                                                                                                |
| `fl-eu-cop-final-changes-from-draft1-ssf`        | Comparison implied that updating and notifying the Framework were new; the first draft already had both. Final Code date had no evidence in the cached chapter PDF. | Statement narrowed to the two opening commitments; qualification names Sub-Measure 11.1 and Measure 20; date note cites the dataset record.               |
| `fl-eu-cop-draft1-published`                     | Quote copied a text-layer artefact ("GeneralPurpose").                                                                                                              | Quote restored to the printed "General-Purpose" (checked on the rendered page); `tools.mjs` now matches a printed line-break hyphen lost in a text layer. |
| `fl-eu-cop-draft1-light-detail`                  | Locators imprecise; expression not stated.                                                                                                                          | Locators fixed; Eerste Kamer copy named.                                                                                                                  |
| `fl-eu-cop-final-changes-from-draft1-risk-types` | Qualification said "not checked" where the final Code does treat AI R&D automation and non-discrimination elsewhere.                                                | Qualification states where they appear; the record compares headings only.                                                                                |
| `fl-eu-aia-art54-3-tasks`                        | Dropped "where applicable" for Article 55; open-source exemption not noted.                                                                                         | Restored; Article 54(6) noted.                                                                                                                            |
| `fl-uk-us-aisi-mou-signed`                       | Signature date rested on a press release; signatories not in the quoted passage.                                                                                    | Re-dated as an announcement (2 April 2024) with the stated signing date in the note; signatory sentence quoted.                                           |
| `fl-uk-aisi-renamed`                             | Date note cited a "from today" phrase that attaches to a different change; qualification referred to a paraphrase not in the evidence.                              | Note rewritten (checked against the text by the integrator); stray reference removed.                                                                     |
| `fl-us-eo14110-sec42b-threshold`                 | "Apply to" overstated: the order directs the Secretary to require compliance. Revocation not noted.                                                                 | Statement follows the order's wording; revocation noted.                                                                                                  |
| `fl-us-eo14110-sec42a-reporting`                 | Revocation not noted.                                                                                                                                               | Noted; extended to `fl-us-eo14110-def-dual-use-foundation-model` and `fl-us-eo14110-published`.                                                           |
| `fl-us-il-ai-safety-measures-act-signed-stated`  | Unsourced bill number from secondary reports in the qualification.                                                                                                  | Removed.                                                                                                                                                  |
| `fl-us-caisi-security-work-openai-anthropic`     | The UK partnership attaches to CAISI's research and evaluations, not to the working-with clause.                                                                    | Statement follows the source.                                                                                                                             |
| `fl-us-aisi-renamed-caisi`                       | NIST's note was written in or after May 2026.                                                                                                                       | Added to the qualification.                                                                                                                               |
| `fl-us-ca-sb1047-vetoed`                         | Second locator wrong.                                                                                                                                               | Fixed to p. 2.                                                                                                                                            |
| `fl-link-fgf-2026-eu-code-appendix-2-2`          | "May not update" misreads "will not consider an update necessary"; copy is undated.                                                                                 | Statement follows the source; undated copy noted.                                                                                                         |
| `fl-intl-bletchley-frontier-definition`          | Recorded as a snapshot; wording checked in the 2025-updated page.                                                                                                   | Event dated by publication; expression noted.                                                                                                             |
| `fl-intl-new-delhi-no-frontier-terms`            | The annexed text names 19 February 2026.                                                                                                                            | Dated 2026-02-19 (adoption); the document's adoption date set to the day.                                                                                 |
| `fl-cn-filings-2025-count`                       | The date is the gov.cn repost date.                                                                                                                                 | Statement and note say so.                                                                                                                                |
| `fl-uk-kings-speech-2026-no-frontier-bill`       | Rationale carried wording from the New Delhi record.                                                                                                                | Fixed.                                                                                                                                                    |

## Checks extended beyond the sample

Material findings widened checking to the affected families (editorial policy, machine-first workflow):

- **Dates of application of AI Act provisions.** All 19 AI Act records were re-read for the chapter their note applies. Besides Article 92, Article 3(63) is in Chapter I, which in the 2024 text applies from 2 February 2025; its note now says so. Annex XIII's note says it is applied through Article 51.
- **Revoked executive order.** Every Executive Order 14110 record now states the revocation.
- **Dates resting on announcements.** All records dated by signature, adoption or passage were listed against their sources. Executive orders are dated from the Federal Register print of the order; the UK–Anthropic memorandum from its own signature block; the SB 1047 votes from the author's office (labelled, open question); New York from the Assembly's bill record. Only the UK–US memorandum rested on a release alone, and it is now an announcement.
- **Inferred comparisons.** Both New York comparisons were re-read against both bill texts; the frontier-model rationale now records that "compute cost" does not occur in the S8828 text.

## Integrator's changes before the audit

Recorded here because the audit sample was drawn after them:

- New Delhi endorser counts and HAIP first-round counts were proposed as contested. The passages give counts at different dates or with different cut-offs and units, so they do not oppose one proposition (editorial policy, Interpretation). New Delhi counts are dated listing records; the HAIP counts are context on the record for the OECD paper's list.
- Two string-search records were proposed as `states_provision`. They are absences, now `provision_not_found` with an inference rationale, as the dataset records absences in framework editions.
- A White House fact sheet of 29 September 2026 (an order on the terms "Super Intelligence" and "SI") was proposed as a record. It places no duty on developers; it is kept as a source caveat in the README.

## Limits

- Same model family throughout; the cross-family brief is the required next check before any admission.
- Two auditors, one pass each; no second-pass reconciliation was run after corrections.
- Pages that refused the auditors (HTTP 403): the Commission's first-draft and final-Code pages, two Hansard pages of 12 February 2025 and two Commerce statements of June 2025.
