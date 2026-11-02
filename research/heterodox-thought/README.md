# Machine intelligence in heterodox and speculative thought

A candidate research pack for the thought spine ("Human thought and institutions around machine intelligence"): propositions about machine intelligence and superintelligence as stated in texts by Hugo de Garis, Nick Land and Hans Moravec, in accelerationist and effective-accelerationist texts, and in the texts that answer them by name. For each of ten propositions (W01–W10) it records the earliest located articulation within a stated search, further articulating texts and contesting texts, each attributed, dated by kind and precision and quoted from its primary text; and, where a later text itself names an earlier text or author, a named-predecessor link.

It is outside application data. It was machine-prepared and audited by the same model family (Claude); nothing in it is editorially accepted or human-reviewed, and the cross-family check has not been run. It changes nothing in `data/`, the application, the schema or any release. Counts are in [pack.md](pack.md); they are not copied here.

## Files

- [scope.md](scope.md): what is in and out, the search bounds, the rules (written first).
- [propositions.json](propositions.json): codes W01–W10, criteria, usual names and overlaps with dataset concepts.
- [pack.md](pack.md): the readable pack, generated from `pack.json`: counts, every record with its passage, locator and qualification, the named-predecessor links, the search log, omissions (including the adjacent strands searched and not included), retrieval failures and sources.
- [pack.json](pack.json): sources (address, HTTP status, SHA-256, retrieval date, word count, version), documents, records in the dataset's proposition-record shape and links (candidate `cites` and `explicitly_credits` claims).
- [verification.json](verification.json): the mechanical check of every quotation, every per-source quotation budget and the structural and wording rules.
- [audit.md](audit.md), [audit-sample.json](audit-sample.json), [audit/](audit/): the same-family audit and how each finding was handled.
- `cross-family-input-<date>.md` and `cross-family-verdicts-<date>.json`: the brief for a cross-family check (Part A blind, Part B direct), with the pack's answers in a separate file.
- [drafts/](drafts/): the source-group drafts the pack is merged from, their [format](drafts/FORMAT.md) and the [brief](drafts/BRIEF.md) each drafting pass received. Corrections are made in the drafts by [reconcile.mjs](reconcile.mjs) (integration, logged in [reconcile-log.json](reconcile-log.json)) and `audit-fixes.mjs` (audit dispositions), never in `pack.json`.
- [tools.mjs](tools.mjs), [build.mjs](build.mjs): retrieval, quotation checking, merge, verify, render, audit sample and brief.

## Method

1. **Scope first.** [scope.md](scope.md) and the propositions were written and pushed before research began, with codes checked against those in use on every branch.
2. **Drafting by source group.** Fresh-context passes drafted de Garis, Land, Moravec, accelerationism (with the adjacent strands) and a bounded supplementary group of further articulating and contesting texts, each retrieving its sources by direct HTTP with TLS verification, checking its own quotations and recording its search per proposition.
3. **Integration.** [reconcile.mjs](reconcile.mjs) reassigned earliest-located roles across groups by the date of the wording, removed records on undated pages, kept a pseudonymous post under its signed name, and confined the hazard note to its defined use.
4. **Mechanical verification.** Every quotation matched against the retrieved text of its own source; 50 words per quotation and the policy's per-source budget; one earliest located articulation per proposition, none dated after another; roles allowed per stance; banned labels, evaluative verbs, priority words and influence words outside quotation marks.
5. **Same-family audit.** Fresh-context auditors checked a recorded sample against the sources and read every statement for neutral wording, scope discipline and inferred influence.
6. **Cross-family brief.** A blind brief for a reviewer from a different model family, asking it to open the archive captures this environment could not reach.

## Rebuild

```sh
node research/heterodox-thought/tools.mjs merge
node research/heterodox-thought/tools.mjs verify
node research/heterodox-thought/tools.mjs render
node research/heterodox-thought/tools.mjs sample
node research/heterodox-thought/tools.mjs brief 2026-10-31
```

Retrieved texts stay in the ignored cache `.local/heterodox-thought/`; `verify` needs it.
