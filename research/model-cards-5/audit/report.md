# Model cards pack 5: same-family audit

The auditor's report, saved by the preparing session from the auditor's reply (its tool refused to write report files). Wording unchanged except formatting.

**Auditor.** A fresh-context Claude subagent, run on 2026-11-07. It is the same model family as the preparer, so this audit is not independent corroboration. It checks reading, quotation and locators, not the blind spots the two passes share.

**Inputs supplied.** `research/model-cards/questions.json` (questions, criteria, legend, rules); `audit-sample.json` (30 items, seed 20261105); `drafts/sources-*.json` (card addresses, hashes, link-target retrievals); maintainer readings in `review/decisions/model-cards.md` and `review/decisions/answers-2026-11-03.md` (4a, 6a, 8a, 13a); the cached card texts (read with `tools.mjs`, and with pdftotext `-raw` for Claude Opus 4.6); and the PDF link annotations.

**Inputs withheld until the blind answers were written.** `pack.json`, `pack.md`, `verification.json`, `audit/pack-answers.json`, other drafts, earlier model-card packs, review notes and cross-family files. The blind order was kept: `blind-answers.json` was written, and its quotations checked against the card texts, before `pack-answers.json` was opened. No pack file other than `pack-answers.json` was opened at any point.

**Result.** 30 items: 29 agree, 1 partly, 0 disagree; 0 material. Every status matches the blind reading. Every pack quotation matched verbatim (whitespace normalised) on the page its locator gives.

## Findings other than plain agreement

- **20, Gemini 2.5 Deep Think Q16 (partly, not material).** The note says "the safety results reported are automated only (PDF p. 6)". PDF p. 6 says only that the content-safety results in that one table are automated. The card reports expert red teaming and external testing elsewhere. Suggested: limit the clause to that table. The note could also add two limits the card states: tests ran on a preliminary implementation (PDF p. 19), and deceptive-alignment testing is still ongoing (PDF p. 17).
- **4, Gemini 2.5 Deep Think Q05 (agree, minor locator).** The note cites the CCL table at PDF p. 9. The table starts on p. 8 and continues on p. 9.
- **Optional notes, all agree.**
  - 7: GPT-4.5 calls the same ratings post-mitigation in §4.1 and pre-mitigation in its Conclusion.
  - 16: the link in the quoted p. 12 passage goes to the RSP announcement page. The link to the dated v2.2 file is on pp. 13 and 167, which the note already names.
  - 23: "month only" should read "month and year only".
  - 26: the §9.2 results passage on PDF p. 128 would be a closer locator.

**Borderline readings both passes share.**

- 5, Gemini 2.5 Flash Q05: stated, though the outcome is inferred from Gemini 2.5 Pro Preview results and hedged.
- 6, Muse Spark Open Q05: partly, close to not-found.
- 22, Gemini 2.5 Flash Q12: stated, though the scope given is only general.

Agreement within one model family does not settle them.

**Notes.**

- **Attribution.** Notes attribute statements to the card or to the named third party (Apollo Research, METR, Pattern Labs, Gray Swan).
- **Wording.** No evaluative or loaded words appear outside quoted card text.
- **Dates.** Date kinds are kept: the Haiku 4.5 cover month is the card date.
- **Framework editions.** Identified correctly: RSP v2.2 by link annotation for Opus 4.6 (decision 4a), and Preparedness Framework Version 2 by text and link for o3 and o4-mini.

**Limits.**

- Only the 30 sampled cells were checked. The sample was drawn mechanically (seed 20261105), with targeted groups.
- Only the cached copies were re-read: no archived captures and no other editions.
- The framework files were not re-read; their edition and date come from `sources-*.json`.
- The audit does not check whether a later RSP edition was in force when Opus 4.6 was published.
- Dangerous-capability material was recorded at policy level only.
- For not-found items, "quoteVerbatim" and "locatorRight" refer to the locators of the passages set aside.
