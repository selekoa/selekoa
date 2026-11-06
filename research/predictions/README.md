# A dated record of predictions about machine intelligence

A candidate research pack: dated predictions about machine intelligence, from Turing (1950) and the Dartmouth proposal (1955) to laboratory statements of 2025–2026. Each record gives the predictor, the source date and its kind, the predicted event in the source's words, the target date or horizon as stated (with its kind and precision), any stated probability, hedges and conditions, and the form: a stated forecast, a public bet, an expert survey's published result, a forecasting-platform figure from a dated capture, or a reported statement.

Admitted with its collection and page on 2026-11-05 (release 0.31.0; [`review/predictions-admission-2026-11-05.md`](../../review/predictions-admission-2026-11-05.md)). The text below describes the pack as prepared.

It is outside application data. It was machine-prepared (Claude family), audited by the same family and checked by a second family (Codex, 2026-11-03); the adjudication of that check is in [adjudication/](adjudication/) and the review note. Nothing in it is editorially accepted. It changes nothing in `data/`, the application, the schema or any release. Counts are in [pack.md](pack.md); they are not copied here.

No record says whether a prediction came true. The pack has no outcome field.

## Files

- [scope.md](scope.md): what counts as a prediction, the four forms, coverage and rules (written before research).
- [pack.md](pack.md): the readable pack, generated from `pack.json`: counts, every record with its passages and locators, the search log and omissions, and the sources with retrieval details.
- [pack.json](pack.json): sources (address, HTTP status, SHA-256, retrieval date, word count, version, dataset source where the dataset already holds the text) and records.
- [verification.json](verification.json): the mechanical check: every quotation matched against the retrieved text of its source (or, where the source could not be retrieved here, against the dataset's own checked passage, labelled as such); quotation lengths and per-source budgets, counting what the dataset already quotes; the structural rules below; and banned wording outside quotation marks.
- [codex-retrieval.md](codex-retrieval.md): items that need retrieval from hosts this environment cannot reach (archive captures, openai.com, paywalled journals, platform captures).
- [audit.md](audit.md), [audit-sample.json](audit-sample.json), [audit/](audit/): the same-family audit and how each finding was handled.
- `cross-family-check-2026-11-02.md` and `.json`: the Codex report, unchanged. [adjudication/](adjudication/): `apply-2026-11-03.mjs` applies the agreed corrections to the drafts and marks each changed record with `crossFamily`; `applied-2026-11-03.json` is its log. `cross-family-check-2026-11-05.md` and `.json` are the second check (pass-2 records and archive copies), unchanged; `apply-2026-11-05.mjs` applies its adjudication (log `applied-2026-11-05.json`). Records whose source has no text layer here carry a `checkedCopy` on the source: the copy read and the passages transcribed from it, by the checker or visually by the adjudicating session.
- `cross-family-input-<date>.md` and `cross-family-verdicts-<date>.json`: the brief for a blind cross-family check, with the pack's answers in a separate file.
- [followup/](followup/): pass 2 (decision 10a): `records-2026-11-05.mjs` adds the follow-up sources and records (`drafts/records-pass2.json`, each record `pass: 2`); `brief-retrieval-2026-11-05.md` is the retrieval part of the pass-2 brief, written by `tools.mjs brief 2026-11-05 --pass 2`.
- [drafts/](drafts/): `sources.src.mjs` and `records.src.mjs` generate the source register and the records by group; `omissions.json` is the search log. Corrections are made there, never in `pack.json`.
- [audit-fixes.mjs](audit-fixes.mjs): the audit dispositions, applied to the generated drafts by record ID.
- [tools.mjs](tools.mjs), [build.mjs](build.mjs), [lw-fetch.mjs](lw-fetch.mjs): retrieval, quotation matching, build, audit sample and brief.

## Structural rules checked by `build`

- The predicted event, the horizon's own words and the probability's own words each lie inside a quoted passage of the record (unless the event is marked as a paraphrase).
- A horizon carries calendar years only when its kind is absolute or quantile and only years printed in its stated words. Relative horizons keep their amount and unit and are never converted; period and vague horizons carry no year.
- A survey's predictor is the survey; a platform figure's predictor is the platform.
- No banned wording outside quotation marks in the pack's own fields: fulfilment words, right or wrong, priority words, motives.

## Rebuild

`sh research/predictions/rebuild.sh` runs the steps below in order (after `fetchall` has filled the cache).

```sh
node research/predictions/drafts/sources.src.mjs
node research/predictions/drafts/records.src.mjs
node research/predictions/audit-fixes.mjs      # apply the audit dispositions
node research/predictions/adjudication/apply-2026-11-03.mjs   # apply the cross-family adjudication
node research/predictions/adjudication/decisions-2026-11-04.mjs   # apply the maintainer's decisions
node research/predictions/followup/records-2026-11-05.mjs   # add the follow-up records (pass 2)
node research/predictions/adjudication/apply-2026-11-05.mjs   # apply the second check's adjudication
node research/predictions/tools.mjs fetchall   # retrieve sources not yet cached
node research/predictions/tools.mjs build
node research/predictions/tools.mjs sample
node research/predictions/tools.mjs brief 2026-11-02
```

Retrieved texts stay in the ignored cache `.local/predictions/`; `build` needs it. LessWrong posts are retrieved with `lw-fetch.mjs <key> <postId>` because the HTML pages return HTTP 403 here.
