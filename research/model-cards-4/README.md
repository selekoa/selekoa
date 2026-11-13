# Model cards compared, pack 4

Candidate research outside application data, prepared by **Claude** on 2026-11-06 and 2026-11-07. Nothing here is human-reviewed or admitted. The review note covering packs 4 and 5 is [`review/model-cards-packs-4-5-2026-11-07.md`](../../review/model-cards-packs-4-5-2026-11-07.md); a cross-family checker must not read it before committing and pushing its Part A answers.

The pack drafts the eight cards of pack 4 in the adjudicated [population order](../model-cards-2/population.md): Claude Opus 4.1, Gemini 2.5 Pro, Gemini 2.5 Flash-Lite, Muse Glimmer, Muse Wonder and Muse Wonder Full, o3-mini, Deep research and Grok 4.6. Pack 5 ([`../model-cards-5/`](../model-cards-5/)) drafts the next eight. Both reuse the unchanged [sixteen questions and criteria](../model-cards/questions.json), [draft format](../model-cards/drafts/FORMAT.md) and [drafting rules](../model-cards/drafts/BRIEF.md), as amended by the maintainer decisions in [`review/decisions/`](../../review/decisions/). Earlier pack folders are unchanged.

## Files

- [pack.md](pack.md), generated from [pack.json](pack.json): the overview grid and every cell's passages or search record.
- [drafts/](drafts/): cells, source registries and the bounded inventory for each developer group. Corrections are made in the drafts, never in `pack.json`.
- [verification.json](verification.json): quotation, page-locator, retrieval-hash, structural, wording and quotation-budget checks. It does not judge whether a status is right.
- [audit.md](audit.md), [audit-sample.json](audit-sample.json), [audit/](audit/): the fresh-context same-family audit (blind first) of a seeded sample of 30 cells, its findings and the fixes applied.
- `cross-family-input-2026-11-07.md` and `cross-family-verdicts-2026-11-07.json`: **one** blind brief for the cross-family check of packs 4 and 5 together, with the packs' answers sealed in the separate verdicts file. The checker writes `cross-family-check-2026-11-07.md` and `.json` here, on branch `codex/model-cards-check-4-5`.
- [`cross-family-check-2026-11-07.md`](cross-family-check-2026-11-07.md) and `.json`: the checker's report, unchanged. [adjudication/](adjudication/): the script that applies its adjudication to the drafts of both packs, and its log ([review note](../../review/model-cards-packs-4-5-2026-11-07.md), “Adjudication of the cross-family check”).
- [tools.mjs](tools.mjs), [build.mjs](build.mjs): pack 3's tools with this folder's paths. `build.mjs` also generates the combined brief from both packs.

## Reading the pack

A card is the developer's account, not independent proof of capability or safeguard effectiveness. Not found describes the recorded search, not the developer's conduct. Dangerous-capability material is recorded at policy level. The grid does not rank developers or sum their symbols.

Two copies read are later expressions than the population's earliest located one: Gemini 2.5 Flash-Lite (read: published September 26, 2025; population: July 22, 2025 from an archive capture) and Deep research (printed February 25, 2025, with a later note on one evaluation). Opus 4.1 and Grok 4.6 carry revisions; Muse Wonder carries an update note of 23 October 2026. The cells describe the expressions read.

## Reproduction

From the repository root, with curl, pdftotext and Python's `pypdf` available:

```sh
node research/model-cards-4/tools.mjs fetch <cacheKey> <url>   # sequential; waits 8 s after each response
node research/model-cards-4/tools.mjs checkcells research/model-cards-4/drafts/<group>.json
node research/model-cards-4/tools.mjs merge
node research/model-cards-4/tools.mjs verify
node research/model-cards-4/tools.mjs render
node research/model-cards-4/audit/sample.mjs
node research/model-cards-4/tools.mjs brief 2026-11-07          # reads packs 4 and 5
pnpm exec prettier --write research/model-cards-4/
```

The cache `.local/model-cards/doc/` is ignored. A fresh checkout must re-fetch each card from the address in `drafts/sources-<group>.json` and compare SHA-256 values. Link-annotation targets used to identify framework editions are recorded under `referenceRetrievals` in the source registries.

## Limits

- web.archive.org reset the connection from the preparer's environment (2026-11-06). No archive capture was read; Part D of the brief asks the checker for them.
- Framework editions identified only through PDF link annotations rest on the annotation and the retrieved target's cover; the quotation check cannot verify an annotation.
- The Claude Opus 4.6 PDF's default text layer interleaves drop capitals; quotations crossing them are matched in pdftotext's raw reading order (`textLayer` in `verification.json`).
