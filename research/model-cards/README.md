# Model cards compared

A candidate comparison of what frontier developers' published system cards, model cards and safety reports disclose: rows are cards, columns are sixteen questions, and every answered cell quotes the card. It serves the roadmap's first "Next collections" item (`docs/roadmap.md`).

It is a candidate research pack outside application data. It was machine-prepared and audited by the same model family (Claude), then checked on a 130-item sample by a different family (OpenAI Codex, 2026-11-03) and adjudicated; nothing in it is editorially accepted or human-reviewed. It was admitted in two parts: the cards as documents (v0.26.4, [`review/model-cards-admission-1-2026-11-03.md`](../../review/model-cards-admission-1-2026-11-03.md)) and, with schema 2.30, the cells (v0.27.0, [`review/model-cards-admission-2-2026-11-04.md`](../../review/model-cards-admission-2-2026-11-04.md)). The pack's files are unchanged by the admission. The review note is [`review/model-cards-pack-2026-11-02.md`](../../review/model-cards-pack-2026-11-02.md).

## Files

- [scope.md](scope.md): question, unit of record, population, selection rule and rules, written before drafting.
- [questions.json](questions.json): the sixteen questions with criteria, the legend and the rules.
- [pack.md](pack.md): the readable pack, generated from `pack.json`: overview grid, one section per card, the inventory of every card located, sources, retrieval failures.
- [pack.json](pack.json): cards, cells, sources (address, HTTP status, SHA-256, retrieval date, word count), inventory, omissions, retrieval failures and the drafters' open questions.
- [verification.json](verification.json): the mechanical check of every quotation against the retrieved text, structural checks, wording checks and quotation budgets.
- [audit.md](audit.md), [audit-sample.json](audit-sample.json), [audit/](audit/): the same-family audit (blind first) and the fixes.
- `cross-family-input-2026-11-02.md` and `cross-family-verdicts-2026-11-02.json`: the blind brief for the cross-family check, with the pack's answers in a separate file.
- [cross-family-check-2026-11-02.md](cross-family-check-2026-11-02.md) and [`.json`](cross-family-check-2026-11-02.json): the checker's report, unchanged. [cross-family-second-pass-2026-11-03.md](cross-family-second-pass-2026-11-03.md): the checker's short second pass of 2026-11-03 (copied unchanged from `research/second-pass-2026-11-03/codex-report.md` on `codex/second-pass-2026-11-03`, commit 1fd8d66); its section 1 holds the checker's reading of item 69 (decision 13a), and section 6 retrieves the Sora, Grok-1 and Muse Spark Open cards (decision 11a). Sections 2 to 5 concern other packs. [adjudication/apply-2026-11-03.py](adjudication/apply-2026-11-03.py) applies the adjudication to the drafts; affected cells carry a `crossFamily` field. The adjudication is in the review note.
- [drafts/](drafts/): the drafting brief and format, and per group (`anthropic`, `openai`, `google-xai`, `meta-microsoft`) the inventory, source registry and cells. Corrections are made in the drafts, never in `pack.json`.
- [tools.mjs](tools.mjs), [build.mjs](build.mjs): retrieval, search, quote checking, merge, verification, rendering and the brief.

## How to read a cell

- A cell is **stated**, **partly**, **not found** or **not applicable**, as defined in `questions.json`. A not-found cell lists what was read, the terms searched and the passages set aside; it does not show that the developer did not do the thing asked about.
- A card's statement is the developer's account, not an independent finding; a stated safeguard is not evidence that it works.
- Dangerous-capability evaluations are recorded at policy level only.
- The grid compares and does not rank. Symbols are not to be summed.

## Limits and retrieval

- openai.com, x.ai, ai.meta.com and microsoft.ai HTML pages refused direct retrieval (HTTP 403 or 400); card PDFs on the developers' content hosts were retrieved directly. Four documents could not be retrieved (review note).
- web.archive.org refused connections; no archive capture was checked.
- Three cards identify their framework edition only by a PDF link annotation, which the quotation check cannot verify.
- Drafting, integration and the audit were done by one model family; agreement among them is not independent corroboration. The cross-family check covers 130 of 320 cells less six excluded items, and is itself a machine check.
- On 2026-11-03 the CWM report's recorded address answered HTTP 403 from this environment; its quotations could not be re-verified here (review note).

## Reproduction

From the repository root:

```sh
node research/model-cards/tools.mjs fetch <key> <url>        # one card at a time, into .local/model-cards/
node research/model-cards/tools.mjs checkcells research/model-cards/drafts/<group>.json
python3 -I adjudication/apply-2026-11-03.py   # from research/model-cards, once; already applied
node research/model-cards/tools.mjs merge
node research/model-cards/tools.mjs verify
node research/model-cards/tools.mjs render
node research/model-cards/tools.mjs brief 2026-11-02
npx prettier --write research/model-cards/
```

The cache lives in the ignored `.local/model-cards/` folder. A fresh checkout must re-fetch each card from the address in `drafts/sources-<group>.json` under its key, and compare SHA-256 values.
