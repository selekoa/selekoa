# Lab genealogy 2: founders, moves and licensing-and-hiring deals, 2023–2026

A candidate research pack outside application data. It extends the admitted [lab genealogy](../lab-genealogy/README.md) for 2023 to 2026: labs and companies founded by people from frontier labs (with founders as stated and funding rounds as stated), moves between frontier labs, and acqui-hire or licensing-plus-hiring arrangements. Nothing in it is admitted, editorially accepted or human-reviewed. It changes nothing in `data/`, the application, the schema or any release. It proposes no new predicate; funding rounds use the dataset's capital predicates.

Prepared on 2026-10-29 by one model family (Claude): seven drafting passes, an integrator, three fresh-context auditors and a correction pass. The cross-family check has not been run. Review note: [`review/lab-genealogy-2-pack-2026-10-29.md`](../../review/lab-genealogy-2-pack-2026-10-29.md).

## Files

- [scope.md](scope.md): what is in and out, the unit of record and the rules (written first).
- [drafting-brief.md](drafting-brief.md): what the drafting passes worked to, on top of the first pack's brief.
- [drafts/](drafts/): the seven drafts: `nl` (new US labs), `eu` (Mistral, Inflection, Microsoft AI, European labs), `oa` (OpenAI and Anthropic moves), `gm` (Google DeepMind and Meta), `xa` (xAI, Apple, Amazon), `dl` (deals), `cn` (Chinese labs). Each carries `searched`, `omitted` and `retrievalFailures`.
- [scripts/](scripts/): the generators that wrote the pre-audit drafts; [corrections.mjs](corrections.mjs) applies the audit corrections to the drafts afterwards.
- [integration.json](integration.json): duplicates and held records left out at merge, with reasons.
- [pack.json](pack.json) and [pack.md](pack.md): the merged pack and its readable form: lab-by-lab tables (founding, structure and deals, leadership, other roles, departures, funding), a timeline, "who went where" paths, stated reasons, searches, omissions, retrieval failures, existing records used, held records, evidence proposed for existing records, entities and sources.
- [verification.json](verification.json): every passage matched against the drafting retrieval and a fresh retrieval; quoted words per source, with the dataset's own quotations where the source is shared.
- [audit.md](audit.md), [audit-sample.json](audit-sample.json), [audit/](audit/): the same-family audit and the disposition of every finding.
- [cross-family-input-2026-10-29.md](cross-family-input-2026-10-29.md) and [cross-family-verdicts-2026-10-29.json](cross-family-verdicts-2026-10-29.json): the brief for the cross-family check (Part A blind, Part B direct, Part C proposed evidence) and the pack's answers, kept apart.
- [tools.mjs](tools.mjs), [render.mjs](render.mjs), [crosscheck.mjs](crosscheck.mjs): retrieval, checks, merge, verification, rendering and the brief, adapted from the first pack.

## Reproduction

From the repository root:

```sh
node research/lab-genealogy-2/corrections.mjs          # audit corrections, applied to the drafts
node research/lab-genealogy-2/tools.mjs check research/lab-genealogy-2/drafts/<group>.json
node research/lab-genealogy-2/tools.mjs merge          # drafts + integration.json -> pack.json
node research/lab-genealogy-2/tools.mjs verify         # passages against the drafting cache
node research/lab-genealogy-2/tools.mjs refetch && node research/lab-genealogy-2/tools.mjs verify fresh
node research/lab-genealogy-2/tools.mjs render         # pack.md
node research/lab-genealogy-2/tools.mjs crosscheck 2026-10-29
```

Retrieval bodies stay in the ignored `.local/lab-genealogy-2/` cache. See `pack.md` for the coverage counts.

## Limits

- **Reporting.** About 45% of the records have no primary supporting passage; most are moves at Google DeepMind and Meta, the Chinese labs, and deals whose parties published nothing retrievable. Each says so in its qualification.
- **Retrieval.** The Internet Archive refused connections throughout. The reader relay (`r.jina.ai`) refused this environment for part of the run (HTTP 401), so some publishers were read directly or not at all. X's syndication endpoint truncates long notes; no record rests on text beyond what was returned.
- **Selection.** Founders, executives, unit leads and announced moves only; investors named in a round are recorded where the round's own text names them. An omission is not a judgement of importance; omissions are listed with reasons in `pack.md`.
