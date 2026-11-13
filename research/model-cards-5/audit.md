# Same-family audit: model cards compared, pack 5

- **Auditor:** a fresh-context Claude subagent of the preparing session, 2026-11-07. Same model family as the preparer: its agreement is not independent corroboration and does not meet the cross-family requirement.
- **Inputs:** supplied `research/model-cards/questions.json`, [`audit-sample.json`](audit-sample.json), the source registries `drafts/sources-*.json`, the decision files `review/decisions/model-cards.md` and `answers-2026-11-03.md`, and the cached card texts read through `tools.mjs`. Withheld until the blind answers were written: `pack.json`, `pack.md`, `verification.json`, the draft cell files, [`audit/pack-answers.json`](audit/pack-answers.json), the other pack and the cross-family files.
- **Method:** blind first. The auditor answered all 30 items from the card texts ([`audit/blind-answers.json`](audit/blind-answers.json)), then opened the pack's answers and compared ([`audit/findings.json`](audit/findings.json), [`audit/report.md`](audit/report.md)). It reports that it kept this order.
- **Sample:** 30 of 128 cells from [`audit/sample.mjs`](audit/sample.mjs), seed 20261105: every Q05 cell (8); 6 not-found cells on Q07–Q14; 16 of the remaining cells at random.

## Result

| Verdict  | Items |
| -------- | ----: |
| agree    |    29 |
| partly   |     1 |
| disagree |     0 |
| material |     0 |

## Dispositions

The fixes were made in the drafts; the pack was merged, verified and rendered again.

- **Item 20, Gemini 2.5 Deep Think Q16 (partly): applied.** The note now limits the automated-only statement to the content-safety table (PDF p. 6) and adds the two limits the card states: a preliminary implementation of the Deep Think algorithm (PDF p. 19) and ongoing deceptive-alignment testing (PDF p. 17).
- **Item 4, Deep Think Q05 (minor locator): applied.** The note cites the summary table at PDF pp. 8–9.
- **Optional notes: applied** for item 7 (GPT-4.5 Q05: the conclusion calls the medium ratings pre-mitigation, §6, PDF p. 26), item 16 (Opus 4.6 Q03: the link in the quoted p. 12 passage targets an announcement page) and item 23 (Haiku 4.5 Q01: “month and year only”). **Not applied:** item 26 (Sonnet 4.5 Q07). The §1.2.4 passage is already quoted in the dataset for this source, so reusing it adds no words to the quotation budget; the §9.2 results passage is no more specific at policy level.
- **Borderline readings both passes share** (Gemini 2.5 Flash Q05 and Q12; Muse Spark Open Q05): no change. Both Q05 cells are in the cross-family brief's blind Part A.

## Limits

- Same family: the preparer and the auditor are both Claude.
- The sample does not certify the 98 cells outside it.
- The auditor read the cached texts the preparer retrieved; no archive capture was read.
- The auditor's report was returned as text and saved by the preparing session as `audit/report.md`.
