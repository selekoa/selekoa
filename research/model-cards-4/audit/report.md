# Model cards pack 4: same-family audit

The auditor's report, saved by the preparing session from the auditor's reply (its tool refused to write report files). Wording unchanged except formatting.

**Auditor.** A fresh-context Claude subagent, the same model family as the preparer. It is a check on reading and recording, not independent corroboration. The cross-family check is separate.

**Date.** 2026-11-07.

## Inputs

Supplied: `research/model-cards/questions.json` (questions, criteria, legend, rules); `audit-sample.json` (30 items, seed 20261104); `drafts/sources-*.json`; `review/decisions/answers-2026-11-03.md` and `review/decisions/model-cards.md` (maintainer readings 4a, 6a, 8a and 13a on Q15); the cached card texts, read with `tools.mjs text | page | grep`.

Withheld until the blind answers were written: `pack.json`, `pack.md`, `verification.json`, `audit/pack-answers.json`, the other `drafts/*.json`, `research/model-cards-5/`, `review/` (apart from the two decision files) and the cross-family files. The preparing session's scratch files were not opened.

**Blind order kept.** `audit/blind-answers.json` was written before `audit/pack-answers.json` was opened. The blind file is left as written, including two page errors described under Limits.

## Result

| Verdict  | Count |
| -------- | ----: |
| agree    |    28 |
| partly   |     2 |
| disagree |     0 |
| material |     0 |

The blind status matches the pack's status on all 30 items. All 21 pack quotations are verbatim in the cached texts (whitespace and line-break hyphenation normalised) and within 50 words. Every pack locator was checked with `tools.mjs page` or `grep` and is correct.

The notes use no evaluative or loaded words, present card statements as the developer's account, and keep date kinds separate: item 24 treats "final model checkpoint as of Jan 31, 2025" as a checkpoint date, not a release date. None of the 30 items identifies a framework edition, so there was no edition reading to check.

### Partly findings (not material)

- **10 `openai-o3-mini:Q14` and 29 `openai-deep-research:Q14`.** Both are "not found", and the auditor agrees. In each card, the searched term "U.S." finds a passage saying that a comprehensive nuclear evaluation "will require collaboration with the U.S. Department of Energy" (o3-mini §5.5, PDF pp. 18–19; deep research §3.4.5, PDF p. 22). The passage names the department as a needed future collaborator, not as a tester. The search records list no set-aside passage, although the legend asks for every passage set aside. Fix: add the passage to each record as set aside, with that reason.

### Borderline readings where the auditor and pack agree

Recorded so that the cross-family check can test them:

- **Item 2, Flash-Lite Q05 (stated).** The outcome, "unlikely to reach critical capability levels", comes from evaluations of Gemini 2.5 Pro Preview, not of Flash-Lite. The pack's note says so.
- **Item 4, Muse Glimmer Q05 (stated).** The card says the model falls outside the Advanced AI Scaling Framework's "Frontier AI" definition. It gives the designations "as a matter of prudence", and two of the three are inferred from Muse Spark 1.0.
- **Items 12 and 17, Muse Glimmer Q11 and Q08 (not found).** The cyber and loss-of-control designations are inferred from another model. The card reports no evaluation of Muse Glimmer in either domain.
- **Item 23, Muse Wonder Q09 (not found).** The card's Loss of Control evaluations (MASK, Agentic Misalignment) are read as propensity tests that belong under Q11, not as autonomy or AI R&D tests.

## Limits

- The audit covers 30 of the pack's cells. It does not cover the other cells, the inventory or the selection of cards.
- The auditor shares the preparer's model family, so it can share the preparer's blind spots, for example in reading the borderline items above.
- The auditor did not retrieve any web or archive copies. All text comes from the cached cards, so a cache error would affect the preparer and the auditor alike.
- The blind file gives the Muse Wonder locators as PDF p. 6 (item 5) and p. 9 (item 23 set-aside), from the auditor's own count of form feeds. `tools.mjs page` shows PDF pp. 7 and 10, the pages the pack gives.
- In `findings.json`, `quoteVerbatim: "yes"` on a not-found item means there was no quotation to check.
