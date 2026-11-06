# Model cards compared, pack 3

Candidate research outside application data, prepared by **Codex (GPT family)** on 2026-11-05. The independent Claude-family check ran on 2026-11-05 and is adjudicated in the [review note](../../review/model-cards-pack-3-2026-11-05.md): six cards are ready for admission; PaliGemma and Grok-1 are held. Nothing here is human-reviewed or admitted.

The pack drafts the eight cards assigned to pack 3 by the adjudicated [pack-2 population](../model-cards-2/population.md). It reuses the unchanged [sixteen questions and criteria](../model-cards/questions.json), [draft format](../model-cards/drafts/FORMAT.md) and [drafting rules](../model-cards/drafts/BRIEF.md), subject to the later maintainer decisions. The earlier one-card-per-year selection rule in that original brief is superseded by decision 1a and the pack-2 population. Pack 2 is unchanged.

## Files

- [pack.md](pack.md), generated from [pack.json](pack.json), contains the overview and the passage/search record for every cell.
- [drafts/](drafts/) contains cells, source registries and the bounded inventory for each developer group. Corrections belong in these drafts.
- [verification.json](verification.json) records quotation, page-locator, retrieval-hash, structural and quotation-budget checks. It does not establish that the chosen status is historically or interpretively correct.
- [tools.mjs](tools.mjs) and [build.mjs](build.mjs) reuse pack 2's tooling. Changes concern this pack's paths, preparation metadata, retrieval pacing, verification and Claude handoff. The criteria and quote budgets are unchanged.
- [cross-family-input-2026-11-05.md](cross-family-input-2026-11-05.md) gives the blind checker its sources, criteria and selection. [cross-family-verdicts-2026-11-05.json](cross-family-verdicts-2026-11-05.json) seals the preparing-family cells for both parts A and B.
- [Review note](../../review/model-cards-pack-3-2026-11-05.md) records scope, coverage, source qualifications and open questions. A checker must not read it before committing and pushing Part A.

## Reading the pack

A card is the developer's account, not independent proof of capability or safeguard effectiveness. Not found describes the recorded search, not the developer's conduct. Dangerous-capability material is recorded at policy level. The grid does not rank developers or sum their symbols.

PaliGemma and Grok-1 use freshly retrieved historical archive copies. Their separately retrieved live expressions are recorded in their source registries. Operator's January cover date and March API addition stay separate. Each card's earliest-located date comes from the inherited population; this pack does not repeat the full population search.

## Reproduction

From the worktree root, with curl and pdftotext available on PATH:

```sh
node research/model-cards-3/tools.mjs fetch <cacheKey> <url>
node research/model-cards-3/tools.mjs checkcells research/model-cards-3/drafts/<group>.json
node research/model-cards-3/tools.mjs merge
node research/model-cards-3/tools.mjs verify
node research/model-cards-3/tools.mjs render
node research/model-cards-3/tools.mjs brief 2026-11-05
pnpm exec prettier --write research/model-cards-3/ review/model-cards-pack-3-2026-11-05.md
pnpm check:privacy
```

Fetch sequentially. The tool waits eight seconds after each response; do not run independent fetch commands concurrently. The source registries give the cache keys and addresses, including historical-copy addresses. Bodies and rendered inspection pages stay in ignored `.local/model-cards/`. All eight card responses were HTTP 200. A changed response hash is a new expression to inspect, not a reason to overwrite the recorded hash.

The verifier rehashes the eight primary card responses, checks all quotations against their text, and checks PDF quotations on their cited pages. Source word counts exclude navigation where feasible. The English HTML cards' counts are recorded explicitly because multilingual site navigation causes the inherited `words` command to choose its CJK counting mode. The Grok-1 excerpts total 19 words, below 10% of the card body even excluding navigation.

## Claude handoff

Use branch `claude-check/model-cards-3` from `origin/model-cards-pack-3`. Part A has 40 cells: all Q03, Q05 and Q15 cells, plus 16 seeded weaker-form or negative cells. Commit and push the blind answers before opening the separate verdicts file. Part B then checks 20 other cells directly. Its preparing-family passages are sealed too, so they cannot reveal related answers during Part A. The random generator and seed 20261105 are in build.mjs.

Part C checks the inherited population/order; Part D requests archive copies near publication where available. The checker writes only `cross-family-check-2026-11-05.md` and `.json` in this folder. Both are now on this branch, unchanged; the adjudication script and its log are in [adjudication/](adjudication/).
