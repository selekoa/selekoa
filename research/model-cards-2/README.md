# Model cards compared, pack 2

The second candidate pack of the model-cards collection. It applies the collection's rule (decision 1a) to the first pack's inventories, and drafts the first eight cards of the resulting order. The rows, questions, criteria and legend are the first pack's ([`research/model-cards/`](../model-cards/)): sixteen questions per card, every answered cell quoting the card. The review note is `review/model-cards-pack-2-2026-11-04.md`.

It is a candidate research pack outside application data. One model family (Claude) prepared it, and a fresh-context session of the same family audited it on a seeded sample. A model of another family (Codex, GPT family) checked 60 cells and the population on 2026-11-04 ([report](cross-family-check-2026-11-04.md)); the adjudication is in the review note and [adjudication/](adjudication/). Nothing in it is editorially accepted or human-reviewed. It changes nothing in `data/`, `src/`, `release/` or `tests/`, and nothing in `research/model-cards/`.

## Files

- [population.md](population.md), [population.json](population.json), [population.mjs](population.mjs): every card under the rule, which are first-pack rows, which are pending, what is outside and why, and the order of packs 2–10.
- [pack.md](pack.md): the readable pack, generated from [pack.json](pack.json): overview grid and one section per card.
- [verification.json](verification.json): the mechanical check of every quotation against the retrieved text, structural checks, wording checks and quotation budgets.
- [audit.md](audit.md), [audit-sample.json](audit-sample.json), [audit/](audit/): the same-family audit (blind first), its findings and the fixes.
- `cross-family-input-2026-11-04.md` and `cross-family-verdicts-2026-11-04.json`: the blind brief for the cross-family check, with the pack's answers in a separate file (kept as sent).
- [cross-family-check-2026-11-04.md](cross-family-check-2026-11-04.md) and `.json`: the checker's report, copied unchanged from `codex/model-cards-check-2` (4ebd6d6).
- [adjudication/](adjudication/): `apply-2026-11-04.mjs`, which applies the adjudication to the drafts and asserts that each change alters a value, and its log `applied-2026-11-04.json`.
- [drafts/](drafts/): per group (`anthropic`, `openai`, `google-xai`, `meta-microsoft`), the source registry and cells. Corrections are made in the drafts, never in `pack.json`.
- [tools.mjs](tools.mjs), [build.mjs](build.mjs): copies of the first pack's tools. The paths point here, the question set is read from `research/model-cards/questions.json`, and the brief and its Part C are adapted to the population.

## How to read a cell

Cells are read as in the first pack ([README](../model-cards/README.md)). A not-found cell lists what was read and searched; it does not show that the developer did not do the thing asked about. A card's statement is the developer's account. Dangerous-capability evaluations are recorded at policy level only. The grid does not rank.

## Reproduction

From the repository root:

```sh
node research/model-cards/tools.mjs fetch <key> <url>     # one card at a time, into .local/model-cards/doc/
node research/model-cards-2/population.mjs
node research/model-cards-2/tools.mjs checkcells research/model-cards-2/drafts/<group>.json
node research/model-cards-2/tools.mjs merge
node research/model-cards-2/tools.mjs verify
node research/model-cards-2/tools.mjs render
node research/model-cards-2/audit/sample.mjs
node research/model-cards-2/tools.mjs brief 2026-11-04
node research/model-cards-2/adjudication/apply-2026-11-04.mjs   # once; then merge, verify, render
pnpm exec prettier --write research/model-cards-2/
```

Both packs share the ignored cache `.local/model-cards/doc/`. A fresh checkout must re-fetch each card from the address in `drafts/sources-<group>.json` and compare SHA-256 values.

## Limits

- web.archive.org refused connections from the preparer's environment. openai.com and x.ai HTML pages answered HTTP 403, and ai.meta.com answered HTTP 400. The archive captures and those documents were retrieved by the cross-family checker only; the sources' `archive` fields and the dates taken from them rest on its retrieval and hashes, not on a second reading here.
- The Gemini 2.0 cards identify their framework edition only through a PDF link annotation, which the quotation check cannot verify.
- GPT-4o's reference [4] is interleaved in the default PDF text layer; its quotation is verified against pdftotext's raw reading order (`textLayer` in `verification.json`).
- The Muse Spark report is read from arXiv 2606.12429v1, not from Meta's address.
- The "cites" test in `population.md` is a term search followed by reading the hits. A card that cites its framework under another name would be missed.
