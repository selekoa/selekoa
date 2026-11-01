# Same-family audit, 2026-10-28

A fresh-context audit of the compute, power and orbit pack, run by the same model family (Claude) that drafted and merged it. It is neither a cross-family check nor human review, and agreement here is not independent corroboration.

## Sample

[`audit-sample.json`](audit-sample.json) records the draw (seed 20261029, linear congruential generator, [`audit-sample.mjs`](audit-sample.mjs)). It was drawn from the 200 merged records as they stood before the audit:

- **Random:** 30 records from the 73 outside the targeted class.
- **Targeted:** 34 records drawn by the same generator from the 127 in the targeted class. The class covers stated figures, stated status and stage words, signatures, press-only records, records that extend dataset records, contesting arguments and earliest-located arguments (`isTargeted` in `build.mjs`).

64 records were audited, 32% of the pack. By strand: orbital compute 20, chip supply 16, data-centre projects 15, power 13. The sample does not certify the 136 records outside it; the widened family checks below cover all 200 for five kinds of fault.

## Method

Two auditors each received 32 records in a fresh context, with the instruction to refute them. Each record came with its statement, date and date kind, figures and stated dates, qualification, and evidence (source address, cache key, locator and passage). Neither auditor saw the drafts, `pack.json`, `pack.md` or the drafting passes' notes. Both read the cached retrievals with `tools.mjs` and could re-fetch a source by direct HTTP. For each record they assessed the quotation, locator, support, date and its kind, identity, figures (value, unit, bound, basis), overstatement and qualification, and gave a verdict: upheld, correct or drop. Their reports are [`audit/audit-A.json`](audit/audit-A.json) and [`audit/audit-B.json`](audit/audit-B.json).

A third fresh-context pass verified each finding against the source before applying it in the drafts. It then widened the checks to the affected families across every record. Its record of what it did is [`audit/dispositions.json`](audit/dispositions.json).

## Results

| Sample   | Upheld | Corrected | Dropped |
| -------- | -----: | --------: | ------: |
| Random   |     14 |        16 |       0 |
| Targeted |     12 |        22 |       0 |

Every quotation in the sample was found verbatim in its source. No sampled record turned an announcement into a signed contract, construction or operation. None summed figures across sources or gave one party a project's full amount. The corrections concern **support and attribution**, not invented facts:

| Finding                                                                                                                                                                                                          | Disposition                                                                                                                                                                                                                                                                                                                                                                 |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| An element of the statement is not carried by the quoted passage, e.g. AWS's 2026 groundbreaking, xAI's purchased building at Southaven, the Kepler link of Axiom's nodes, the Xingsuan-02 launch vehicle        | A quotation added or extended, or a labelled paraphrase where a source's quotation budget was spent; otherwise the statement narrowed.                                                                                                                                                                                                                                      |
| A joint release attributed to one company: AMD–OpenAI warrant, AMD–HUMAIN, OpenAI–Broadcom term sheet, NVIDIA–Anthropic amounts                                                                                  | Statements name both parties. The NVIDIA–Anthropic record now quotes the full "respectively" sentence, so the $10 billion and $5 billion are not read as a joint amount.                                                                                                                                                                                                    |
| Wording that overstates: "each" 100,000 chips per EU gigafactory; "dated" for an FCC filing date; "draft" for the Energy Secretary's proposal; a reporter's schedule given as the Shelby County department's     | Wording follows the source.                                                                                                                                                                                                                                                                                                                                                 |
| A qualification that is wrong or lacks evidence: Cowboy Space's "no capacity stated" (the page says "a 1-megawatt data center"); "appealed" where the report says "intend to sue"; the MOFCOM 61/2025 suspension | Rewritten, with evidence added (MOFCOM announcement 70/2025 is cited for the suspension).                                                                                                                                                                                                                                                                                   |
| A bound or stage coded wrongly: Amazon Pennsylvania "at least" coded as "more than"; X-energy–AEP "agreement to explore" coded as a letter of intent                                                             | Coded `at_least`; stage `announced` with the source's own wording kept.                                                                                                                                                                                                                                                                                                     |
| A date resting on page metadata, or a weekday mismatch in a press report                                                                                                                                         | Each date note now says so. The Shelby County report's "Thursday" against its 2 July 2025 (a Wednesday) dateline is recorded as unresolved.                                                                                                                                                                                                                                 |
| Locators imprecise or wrong                                                                                                                                                                                      | Fixed. One finding was rejected after checking: the BIS rule of January 2026 opens its DATES paragraph on PDF p. 2 (91 FR 1685), as the record says, not on 91 FR 1684.                                                                                                                                                                                                     |
| A completion target, and its later revision, missing (Crusoe Abilene, mid-2026 then end-2026)                                                                                                                    | Both kept as stated targets, each attributed and dated by its statement.                                                                                                                                                                                                                                                                                                    |
| Earliest-located role of the Lumen Orbit white paper (OC1–OC4, OC7)                                                                                                                                              | Upheld within the pack's search, but weak: almost nothing published before 2024 was searched. Every earliest-located qualification states the search's bounds (texts on orbital compute, 2019–2026), and OC7's now adds that the pre-2024 literature on radiation in space electronics was not searched. The cross-family brief asks the checker to look for earlier texts. |

37 findings were applied (6 of them differently from the auditor's proposal, mostly because a quotation would have exceeded the source's budget) and 1 rejected. Per-record detail is in [`audit/dispositions.json`](audit/dispositions.json).

## Checks extended beyond the sample

The material findings widened checking to every record in the four drafts (editorial policy, machine-first workflow):

| Family                                                                                 | Records checked | Changed |
| -------------------------------------------------------------------------------------- | --------------: | ------: |
| Statement elements not carried by any evidence passage                                 |             200 |      51 |
| Joint releases attributed to one party                                                 |             200 |       9 |
| Quantity and amount bounds against the quoted wording                                  |      88 figures |       1 |
| Dates resting on page metadata, or on a third party's report of a regulator's decision |             200 |       6 |
| Qualifications asserting facts without evidence in the record                          |             200 |      20 |

Most changes in the first family add an attributed paraphrase where a statement named a party, place or condition that the quotation did not carry. This raised the pack's paraphrases from 24 to 94. Paraphrases cannot be matched mechanically, so the integrator checked a seeded sample of 8 of the 70 new paraphrases against the retrieved text (seed 20261030). All 8 were faithful, including the EO 14318 definition of a qualifying project, the Xingsuan-02 launch sentence and the Google–TVA site counties. The cross-family brief asks the checker to treat paraphrases as claims to verify.

## Integrator's changes before the audit

- **Merge.** Bounds and amount scopes were mapped to the dataset's enumerations ("about" to `approximate`, "at most" to `up_to`; descriptive scopes kept as `scopeNote`). Two launch-price thresholds in orbital arguments were moved from `amount` to the proposition schema's `thought.estimates`, since they are stated conditions, not transactions. A capacity worded without a number (Google's "gigawatt-scale" Visakhapatnam campus) is kept as wording, not as a quantity. Meta's "1–4 GW" request for proposals is coded `up_to` 4 GW with the range in the unit wording, since the schema has no range (open question).
- **Bounds.** The four drafts held 222 records. 22 detail records (later phases, sub-provisions, a duplicate figure) were dropped to keep the pack near 200. Each is listed among the omissions, and references to them in other records' qualifications were rewritten.
- **Date bases.** Three records dated "approval" rested on a party's statement of a decision: Entergy on the Louisiana commission's approval, NIST's release of the TSMC award, and the FCC public notice. They were re-dated as an announcement, an announcement and an issuance respectively, with notes.
- **Wording.** The automatic check for priority and evaluative words flagged about 40 uses of "first". All were ordinals of a party's own phase, building, quarter or meeting ("the first two buildings", "first quarter of fiscal 2026"), not priority claims; the check now passes such ordinals. "Groundbreaking" appears only for the event of breaking ground.

## Integrator's changes after the audit

- **Links to the dataset's BIS records.** The foundry due-diligence rule's qualification said that neither rule's text tied it to the AI diffusion rule, but its preamble calls that rule "a rule related to this IFR". The qualification now quotes the passage, and the record extends `fl-us-bis-ai-diffusion-ifr-published`. A new provision record (`cpo-ch-bis-uae-2026-diffusion-enforcement`) quotes the July 2026 UAE rule's statement that BIS enforces the worldwide licence requirement only for Country Groups D:1, D:4 and D:5, consistent with the May 2025 guidance. It extends `fl-us-bis-ai-diffusion-rescission-announced` and brings the pack to 201 records. Neither record was in the audit sample.
