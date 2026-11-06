# Same-family audit: model cards compared

- **Auditor:** a fresh-context Claude subagent of the preparing session, 2026-11-02. Same model family as the drafters and the integrator (Claude); its agreement is not independent corroboration and does not satisfy the cross-family requirement.
- **Inputs:** `questions.json`, `audit-sample.json` (the items), the source registries `drafts/sources-*.json`, and the cached card texts read through `tools.mjs grep | page | text`. Not supplied before its blind answers: `pack.json`, `pack.md`, `verification.json`, the draft cell files and the cross-family files.
- **Method:** blind first. The auditor answered all 60 items from the card texts under each criterion (`audit/blind-answers.json`), then opened the pack's answers for those items (`audit/pack-answers.json`) and compared (`audit/findings.json`). It reports that it kept this order.
- **Sample (60 of 320 cells; `audit-sample.json`, seed 20261102):** every framework-determination cell (Q05, 20 cells); 10 of the not-found cells on Q07–Q14 (negative findings); 30 of the remaining cells at random.
- **Checks:** status under the criterion; quotation verbatim at the locator, at most 50 words, on the stated PDF page; note supported as worded; date kinds; framework edition; wording (no evaluative words, no developer account presented as a finding, no implication that a safeguard works); the hazard rule.

## Result

| Verdict  | Items |
| -------- | ----: |
| agree    |    58 |
| partly   |     2 |
| disagree |     0 |
| material |     0 |

All 57 quotations in the sampled cells were found verbatim on their stated pages. No sampled cell breaks the hazard rule. No retrieval failures.

The two partly items keep the pack's status with a clarified note:

- `openai-gpt-6-luna-october-29:Q12` (blind: stated; pack: partly). The card describes an automated red-teaming agent used in adversarial training and automated prompt-injection evaluations; it does not describe adversarial testing of this model as red-teaming. Partly kept; note reworded.
- `anthropic-claude-2-1:Q02` (blind: partly; pack: stated). The row also covers Claude 2, whose release month the card states. Stated kept; the note now says the November 21, 2023 date is the card's update, not a release date.

## Fixes applied

All by `audit/apply-fixes.py`, in the drafts, then merged, verified and rendered again (303 of 303 quotations found, no structural problems):

- Notes reworded (items 10, 18, 36, 41, 46): Muse Spark 1.3 Q05 no longer calls the Loss of Control assessment "residual"; GPT-6 Luna Q05 keeps the card's "treated as High"; Grok 4.7 Q16 drops an operational practice from the list of stated limits; Grok 4.1 Q10 no longer describes the persuasion evaluation's design (policy level only).
- Passages set aside added (items 13, 22, 26, 59): a named government institute that supplied a prompt but is not stated to have tested Haiku 5.5; an evaluation tool called a "framework"; a product limitation on election information; Grok 4.7's availability channels.
- **Widened beyond the sample:** the audit found not-found cells without a note (12 of its items) and not-applicable cells whose note did not give the basis (items 8, 11, 12). Every not-found cell in the pack now carries a note (54 cells), and every not-applicable Q04 and Q05 cell states that the card predates every framework edition of its developer in the dataset (8 cells).

## Limits

- Same family: the drafters, integrator and auditor are all Claude. The 58 of 60 agreement is not evidence of correctness; the cross-family check (`cross-family-input-2026-11-02.md`) is still to run.
- The sample does not certify the 260 unsampled cells.
- The auditor read the cached texts the drafters retrieved; it did not retrieve the cards again, and no archive capture was checked.
