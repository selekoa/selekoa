# Same-family audit: model cards compared, pack 2

- **Auditor:** a fresh-context Claude subagent of the preparing session, 2026-11-04. It is the same model family as the drafter. Its agreement is not independent corroboration and does not meet the cross-family requirement.
- **Inputs:**
  - Supplied: `research/model-cards/questions.json`, [`audit-sample.json`](audit-sample.json), the source registries `drafts/sources-*.json`, and the cached card texts, read through `tools.mjs`.
  - Withheld until the blind answers were written: `pack.json`, `pack.md`, `verification.json`, the draft cell files, `population.md` and the cross-family files.
- **Method:** blind first.
  1. The auditor answered all 30 items from the card texts ([`audit/blind-answers.json`](audit/blind-answers.json)).
  2. Only then did it open the pack's answers ([`audit/pack-answers.json`](audit/pack-answers.json)) and compare ([`audit/findings.json`](audit/findings.json), [`audit/report.md`](audit/report.md)).
  3. It reports that it kept this order.
- **Sample:** 30 of 128 cells, from [`audit/sample.mjs`](audit/sample.mjs) with seed 20261104:
  - every Q05 cell (8);
  - 6 not-found cells on Q07–Q14;
  - 16 of the remaining cells at random.
- **Checks:**
  - status under the criterion;
  - quotation verbatim at the locator;
  - note supported as worded;
  - date kinds;
  - framework edition;
  - wording;
  - the hazard rule.

## Result

| Verdict  | Items |
| -------- | ----: |
| agree    |    28 |
| partly   |     1 |
| disagree |     1 |
| material |     0 |

All quotations in the sampled cells were verbatim at their stated pages. No sampled cell breaks the hazard rule.

## Dispositions

- **Item 20, `xai-grok-4:Q15` (partly): applied.** [`audit/apply-fixes.mjs`](audit/apply-fixes.mjs) adds the two passages the auditor named as set aside, with reasons:
  - the p. 2 "low risk" conclusion;
  - the pp. 6–7 safeguards assessment.

  The availability set-aside now gives the rule in words ("availability alone is not a decision to release"). The status stays not found.

- **Item 8, `xai-grok-4:Q05` (disagree): not applied; the pack keeps not found.** The criterion asks for "the outcome for the model in the framework's own categories". The card names the RMF's two risk categories but no level or threshold of the framework. The first pack reads Grok 4.1's equivalent sentence as not found, so changing this cell alone would read two xAI cards differently. The p. 2 sentence is already a set-aside passage with its reason. The cell is in the cross-family brief's blind Part A. The review note carries the question as a quick item: if the checker reads it as partly, Grok 4.1 Q05 is read again with it.
- **Items 3 and 4, Gemini 2.0 Q05 (agree, flagged):** no change. The same reading question is in the cross-family brief's blind Part A.

After the fix: merged, verified and rendered again (`verification.json`).

## Limits

- Same family: the drafter and the auditor are both Claude.
- The sample does not certify the 98 cells outside it.
- The auditor read the cached texts the drafter retrieved. No archive capture was checked.
