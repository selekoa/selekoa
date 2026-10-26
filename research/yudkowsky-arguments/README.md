# Yudkowsky's argument history

A bounded Selekoa special investigation: which documented Eliezer Yudkowsky passages state, answer or reject common claims about advanced AI, and when. It is a candidate research pack outside application data, machine-prepared and machine-audited, with no human review.

- [scope.md](scope.md): purpose, unit of record, relations, search scope and validation checklist.
- [pack.md](pack.md): the readable pack, generated from [pack.json](pack.json).
- [audit.md](audit.md): preparation, fresh-context audit coverage, disagreements and dispositions.
- [verification.json](verification.json): per-passage quote checks against the retrieved and posting-day expressions.
- [gpt-check-brief-2026-10-15.md](gpt-check-brief-2026-10-15.md): a blind cross-family check brief for the seven adjudications that overrode or went stricter than the 2026-10-07 check, with its [verdicts file](gpt-check-verdicts-2026-10-15.json). Run 2026-10-16 ([report](gpt-check-2026-10-15.md), [JSON](gpt-check-2026-10-15.json)): one agreement, six disagreements. The maintainer accepted all six on 2026-10-17 and they were applied to the dataset ([dispositions](../../review/cross-family-dispositions-2026-10-17.md)). This pack keeps its earlier labels; the dataset holds the current ones.

Downstream uses, including the side project "The Yudgment", must keep three things separate: quotations, Selekoa paraphrases (the `context` field) and any generated text. Two further rules apply:

- Passages marked `cardUse: context-only` must never be shown on their own.
- Each record's search scope, date basis and qualification must stay visible.

A relation says what a passage argues about a take. It does not say whether the argument is right.

To check or regenerate from a local cache, see the commands in [scope.md](scope.md#reproduction). Retrieval bodies are not tracked.
