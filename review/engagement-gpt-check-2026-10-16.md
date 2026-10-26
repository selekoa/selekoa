# Blind engagement cross-check, 2026-10-16

**Result: 24 agree, 1 partly, 1 disagree** across all 26 human-thought contesting records. Blind labels: 23 `engages-premise`, 3 `contrary-only`; stored labels: 24 and 2. The [record-level JSON](engagement-gpt-check-2026-10-16.json) preserves each criterion, premise, reason or absence of one, source access, stored rationale and comparison. No dataset changes are proposed for automatic application.

## Method and limits

Codex, GPT-6 family; the session does not expose an exact deployment identifier or snapshot. Base: `d76440bd93745701976916ba565827bda6ddc2c6`. This is the requested GPT-family check of the prior preparing pass; machine checking is not human acceptance.

Read only “How to work” and “Rules” from the supplied brief. Extracted the 26 `ts-*` / `contests_proposition` records through an explicit field projection that omitted engagement, with proposition criteria and linked sources. Saved all blind judgments before reading any stored engagement field or the backfill report. The other two prohibited files were never opened. No other audit verdicts were supplied. Statements and qualifications remained visible as requested, so this was label-blind, not free of all earlier interpretation.

The supplied priority list has eight IDs; all eight were judged first. Blind results were frozen at 2026-10-16T20:05:38.571Z, SHA-256 `040e9f93627591de54284ff6b5c1c40f7ab978d106c7754f295ab75f25ced0d1`; none was revised after comparison. Quoted reasons contain at most 50 words each; typography/whitespace is reflowed for readability.

Direct HTTP, sequentially; all repeated-host requests were separated by at least eight seconds after the preceding response. All 21 distinct linked source URLs were retrieved successfully (the two CMU sources share one archive); the Erewhon OCR required one additional request. The initial Extropians request was blocked by the sandbox and succeeded after approved access. No unresolved retrieval failures. Raw retrievals and working files remain ignored.

Read complete messages, More’s whole comment, Michie’s whole chapter and the relevant posts, separating quoted opponents from authors. The 1865 Press article was read in the recorded capture’s OCR; the Erewhon reply in the 1872 scan’s OCR, not the revised text. No image comparison for those two. For Drexler, the blind reading covered the chapter introduction and trustworthiness argument through ethical vetoes/redundancy, plus the linked note; the remaining chapter and section tail were read after comparison without revising the judgment. This is a limit on a strict whole-chapter blind pass.

Samuel remains abstract-only, with wording authorship unestablished. Michie was checked in the 1986 reprint. More’s wording was checked in the 2000 capture. Later posts were checked as currently served: Loosemore version 1.0.0; Christiano 2022 version 1.12.0. No claim that current Christiano wording reproduces its first version. These limits qualify coverage, not whether a poor argument counts as a reason.

## Findings requiring disposition

- **Disagree — `ts-a2-hanson-2008-core-argument-contests`:** blind `contrary-only`, stored `engages-premise`. Hanson gives reasons against roughly sixty doublings in a week. A2 requires an initial AI designed to improve its own design/code; it has no week-long or world-domination requirement. His reasons engage A4, not that generic A2 premise. Reconsider the contesting relation too; no record was changed.
- **Partly — `ts-b5-christiano-2022-contests`:** same `engages-premise` label, different qualified basis. Studying deception in advance does not itself rebut weak behavioural evidence. The whole current post does argue for continuous training instead of a drastic capability transfer, which narrowly engages a B5 failure mechanism. It also accepts wider limits on behavioural evidence. Prefer that explicit rationale and verify its first-version presence before applying a correction.
- **Agree on the other 24 labels.** Samuel’s no-will/input argument can engage control while failing against specification. Hibbard and Loosemore attack a concrete development-to-catastrophe mechanism without addressing every form of deception. Crocker gives checkability as a reason despite its limited scope. Argument quality was not used to deny engagement.

| Priority record                   | Blind label     | Comparison |
| --------------------------------- | --------------- | ---------- |
| ts-a4-hanson-1996-09-03-contests  | contrary-only   | agree      |
| ts-a6-hanson-1996-09-03-contests  | engages-premise | agree      |
| ts-b6-michie-1968-contests        | contrary-only   | agree      |
| ts-c1-franzen-1992-contests       | engages-premise | agree      |
| ts-b6-samuel-1960-contests        | engages-premise | agree      |
| ts-b5-christiano-2022-contests    | engages-premise | partly     |
| ts-b5-crocker-1996-12-31-contests | engages-premise | agree      |
| ts-b5-hibbard-2006-contests       | engages-premise | agree      |

## Validation and next step

Report coverage, unique IDs, verbatim quote presence (ignoring typography/whitespace), the 50-word limit and retrieval pacing passed. The 3 focused suites for propositions, seed review and earliest packets passed (31 tests). Task-owned formatting passed. The staged privacy scan passed for 619 indexed files; the final diff check passed. Only the two requested reports are task outputs. Maintainer disposition remains open for the A2 disagreement and B5 rationale/version qualification. No PR, admission or editorial promotion.
