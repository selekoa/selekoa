# Predictions on record: admission plan, 2026-11-05

For the data session that admits the candidate pack in [`research/predictions/`](../research/predictions/README.md) (branch `predictions-pack-2`) as a new collection, "Predictions on record", under the hub "Human thought and institutions around machine intelligence". The pack has been through the pipeline's steps before admission ([operating guide](../docs/operating-guide.md), "The pipeline"): same-family audit, a cross-family check of the first 53 records (2026-11-03), adjudication, and the maintainer's answers to all fifteen decisions (1a 2a 3a 4a 5a 6a 7a 8a 9a 10a 11c 12a 13a 14a 15a). The follow-up pass of decision 10a added 12 records on 2026-11-05; their short cross-family check (`codex/predictions-check-2`, 837dad9) has reported and is adjudicated in the review note ("Adjudication of the second cross-family check (2026-11-05)"), which puts three quick items to the maintainer. The review note, [`predictions-pack-2026-11-02.md`](predictions-pack-2026-11-02.md), records each step; its "Maintainer decisions" section quotes the maintainer's words.

This plan changes nothing in `data/`, `src/`, `release/` or `tests/`. Reader-facing drafts below follow [`docs/style-guide.md`](../docs/style-guide.md); the editorial policy's precision rules override them.

**Start the admission after the maintainer has answered the three quick items** of the second adjudication (independence of the check, the 2002 Long Bet wording, the Vinge word). The recommended answers change nothing in the pack; another answer may hold a record (see "Held").

## Summary

| Item             | Plan                                                                                                                                                                                                                                       |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Schema change    | **Yes.** One new predicate, `states_prediction`, with decision 1a's six changes (schema 2.30 → 2.31).                                                                                                                                      |
| Release          | **One minor release** carrying the schema change and the records together: the next free minor version (v0.29.0 if no other data branch merges first). No release with the predicate and no records, and no records without the predicate. |
| Records to admit | All 65 in the rebuilt pack: the first 53 and the 12 of pass 2. Take the counts from `research/predictions/pack.md` at admission, not from this plan.                                                                                       |
| Records to hold  | None. The second check confirmed the 7 held pass-2 records and they are released; `verification.json` lists none under `notAdmissible`.                                                                                                    |
| Interface        | **A separate step**, after the data admission: the collection page of decision 8a (chart and table). The data admission adds the collection's definition and records only.                                                                 |
| Budgets          | Search is near its limit (`src/site/bundle-budget.ts`: 275 KB). Measure before and after; never raise a limit. See "Budgets".                                                                                                              |

## Inputs and method

- **Records:** `research/predictions/pack.json`, rebuilt with `sh research/predictions/rebuild.sh` after `tools.mjs fetchall` (and `lw-fetch.mjs` for the two LessWrong posts) has filled the ignored cache. The build must report 0 problems. Record IDs begin `pr-`; check that no dataset record uses the prefix.
- **Script:** `scripts/predictions-admission.ts`, with `--verify`, `--check` and `--base`, as the earlier admissions' scripts. One script makes every data change. Map: `review/predictions-admission-map-<date>.json`, every decision, correction, hold and field mapping with its reason. Before-snapshot `review/predictions-admission-before-<date>.json`, entered in the chain in `src/editorial/historical-views.ts` only if a stored pack or baseline hash depends on the earlier state (AGENTS.md). Update `transactions.test.ts` and `versions.test.ts`; cut the release with `pnpm release X`.
- **Verification at admission:** re-fetch the text sources and match each quotation mechanically (`tools.mjs build` does this). Sources without a text layer here carry a `checkedCopy` naming the copy and who read it; carry that into the evidence note ("read on the page image", "read by a reviewer from a different model family in the Internet Archive capture of …"), as earlier admissions did.
- **Editorial state:** every record is a seed. Machine agreement is not human review.

## The predicate `states_prediction`

Subject: the document (as `articulates_proposition`). Object: the predicted event as a literal. **Check first** that the predicate registry (`src/domain/predicates.ts`) and the claim schema accept a literal object; if they do not, the smallest change is a literal object for this predicate only, recorded in the schema notes.

- **Label and description** (draft): label "states a prediction"; description "The document states a prediction: an event, by a date or within a horizon, in the document's own words. The record documents what the text states and when; it says nothing about whether the event happened."
- **Time:** the claim's `time` is the source date (an event), never the target date. The target lives only in the horizon.
- **Derivation and resolution:** `explicit`. `supported` means only that the document states the prediction. `contested` or `unresolved` only for a documentary dispute about wording, attribution or version (change 6), with the dispute named; never for a dispute about the outcome. **No outcome field**, in data or in any export.
- **No admission without a checked quotation** (change 6): a record with an unverified quotation, or with a `status`, is not admitted.

### `attributes.prediction`

| Pack field                                     | Data                                                                                                                                                                                          |
| ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `form`                                         | `form`: `stated-forecast`, `public-bet`, `expert-survey`, `platform-question`, `reported-statement`                                                                                           |
| `mode`                                         | `mode`: `forecast` (default, omitted) or `forecast-or-aim` (change 2; Altman 2035, decision 14a)                                                                                              |
| `predictor`                                    | `predictor` `{kind, label, entityIds}`; kind `person`, `persons`, `organisation`, `survey`, `platform` or `unnamed` (change 4). An `unnamed` predictor carries `reporter` `{entityId, label}` |
| `event`, `eventType`, `eventNote`              | `event` `{type: 'quote' \| 'paraphrase', text, note}`; a paraphrase requires a note (change 1)                                                                                                |
| `horizon`                                      | `horizon` `{asStated, kind, years?, interval?, relation?, precision, note?}`; `years` only for absolute and quantile kinds and only years printed in `asStated`                               |
| `horizon.interval.from: 'occasion'`            | `occasion` `{date, kind, note}` (change 5): `address` (Simon and Newell, 14 November 1957), `poll` (Michie, 1972)                                                                             |
| `probability`, `confidence`                    | `probability` `{asStated}`; `confidence` `{asStated}` (verbal: "could", "we expect", "plausible"). Never a number derived from words                                                          |
| `points`                                       | `points` `[{probability?, horizon, subject?, version?, date?}]`, required when a record has more than one point (change 3)                                                                    |
| `conditions`, `hedge`                          | as worded                                                                                                                                                                                     |
| `survey`                                       | `survey` `{respondents, conducted, statistic, question?}`, as the report states them                                                                                                          |
| `parties`, `stakes`                            | `bet` `{platform, parties: [{entityId, label, position}], stakes}`                                                                                                                            |
| `capture`                                      | `capture` `{date, timestamp, url}` for a platform figure                                                                                                                                      |
| `attested`, `retrospective`, `sourceDate.note` | as in schema 2.11–2.12: `attested` `{date, note}`; `retrospective` `{estimateOf, note}`; claimed dates in the time note                                                                       |

Working fields not stored: `group` (becomes a filter facet only if the page needs it), `register` (all `nonfiction`), `pass`, `status`, `crossFamily`, `copyRead` (goes into the evidence note), `dateQuestion` (see "Points to settle"), `draft`. `qualification` is stored with research-pack wording removed (record IDs, "decision 14a", "the pack", "the checker" where a reader needs "a reviewer from a different model family"); keep every scope limit, hedge, attested date and retrieval limit.

### Validation (`pnpm check`)

The pack's own build checks carry over as schema validation: event, horizon words and probability words each inside a quoted passage of the record (or inside the quoted words of a labelled paraphrase, for a paraphrase-only source); years only where printed; relative intervals never converted; a survey's predictor is the survey; a platform figure has a dated capture; an unnamed predictor has a reporter; `points` required for several points; `contested` or `unresolved` only with a documentary dispute; banned fulfilment and priority words outside quotation marks in qualifications and notes.

## Records

### To admit

- The first 53 records, as decided: decision 4a (Simon and Newell's chess prediction and the two OpenAI pages of 2023, labelled with the copy read and who read it), 5a (Lighthill's two records as reported statements, predictor `unnamed`, reporter Lighthill), 7a (live pages with `attested` from 2026-11-02, or from an earlier capture where the second check transcribed the quoted words from it: Bostrom's hardware sentence 2000-12-10, Brooks 2018-01-02, AI 2027 2025-04-03, Kurzweil's brain-capacity sentence 2001-08-04), 9a (Cotra 2020 as `retrospective`), 13a (de Garis, "checked against the dataset's passage; the article could not be retrieved on 2 and 3 November 2026"), 14a (Altman 2035, `forecast-or-aim`).
- Pass 2, read on the page image here and by the checker: `pr-a-simon-newell-1958-theorem`, `-music`, `-psychology`; `pr-b-vinge-1983-twenty-to-hundred-years` (the one word the families read differently is not quoted) and `pr-b-vinge-1983-next-twenty-years`.
- Pass 2, read by the checker in captures on 2026-11-03 and again on 2026-11-05: `pr-e-legg-2009-mode-2025`, `pr-e-legg-2010-log-normal` (`retrospective`, a restatement of the 2009 estimate), `pr-e-legg-2011-log-normal`, `pr-c-fhi-2011-hlmi`, `pr-f-openai-2025-very-small-discoveries`, `pr-f-openai-2025-more-significant-discoveries`, `pr-d-metaculus-5121-capture-2025-01-05` (decision 15a; the page session may still switch to 15b). Their evidence notes say "read by a reviewer from a different model family in the Internet Archive capture of …".

### Held

| Held                             | Reason                                                                                                                                                                                                                                                  |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| None, on the recommended answers | If the maintainer answers 1b (another isolated check), hold the seven records released on 2026-11-05 until it reports; on 3b, hold `pr-b-vinge-1983-twenty-to-hundred-years` until the word is read. Answer 2b adds a record and a short check instead. |
| Not records (leads)              | Simon (1965), Minsky (1967), Michie in _Nature_ (1973), Kurzweil's books (1999, 2005): not readable to either family. _Life_ (1970): only after the page is read, with Grudin's report beside it (5a). Moravec 1993 headings: not recorded (6a).        |

## Entities, documents and sources

- **Persons to add** (predictors not yet in the dataset): Hugo de Garis, Joseph Carlsmith, Ray Kurzweil, Rodney Brooks; and, where the admission names them as authors or bet parties, Herbert A. Simon, Allen Newell, Mitchell Kapor, James Lighthill (as reporter), Seth Baum, Vincent C. Müller, Anders Sandberg. Check each against `data/entities.json` first (the pack names the ones it found).
- **Organisations:** Metaculus (for the platform record, if admitted), Long Now Foundation (Long Bets), AI Impacts and the Future of Humanity Institute, only where a record names them.
- **Documents and sources:** about 30 of the pack's 48 sources have no dataset source; reuse the 17 that do. A platform figure's source is the capture (document: the question page at that date). Each source carries its version line and retrieval route from `pack.json`.

## The collection

**Definition** (`src/reading/predictions.ts`, listed on the thought hub). Draft text, to be edited to the style guide at admission:

- **Title:** Predictions on record
- **Question:** What did people and institutions predict about machine intelligence, and when, by what date and with what stated probability?
- **Scope note:** Dated predictions from 1950 to 2026: forecasts in papers, essays and posts; expert surveys; a public bet; a forecasting platform's figure on one day; and reported statements. Each record gives the source's own words for the event, the horizon and any probability, dated by when the prediction was made.
- **What the collection does not do:** It does not say whether any prediction came true, rank predictors or combine estimates. A horizon such as "within ten years" is not turned into a year. A survey's figure belongs to the survey report; a later report of an earlier estimate is marked as such.
- **Search note:** the pack's search log (`drafts/omissions.json`), as the other collections' search notes.

## Interface step (separate, after the data admission)

Decision 8a's page, with 2a, 3a and 15a. A separate task on its own branch, after the admission release:

- **Chart:** source date across, printed target year up, for absolute and quantile horizons only; one mark per printed year (a record's `points` joined by a thin line); shapes by form. Relative horizons as labelled brackets from the source date (3a), never a point at a computed year. No "today" line, no diagonal or shading that marks past target dates, no colour for "passed", no count by outcome.
- **Table:** the same records, keyboard-accessible (predictor, source date, event in quotation marks, horizon as stated, probability, form), sortable by source date or target; period, vague and figure horizons in the table only. Filters by form and decade. CSV export with the same columns.
- **Year link (2a):** a printed target year may link to the dataset's page for that year, labelled "What the dataset records for 2029" (for example), never placed beside the prediction.
- **Marks:** "forecast or aim" (14a); "reported later" (9a); "reported statement" (5a); "wording attested from …" (7a).
- **Platform figure (15a):** the page session decides whether one Metaculus point looks out of place and, if so, switches to 15b (no platform records); it records which in its review note.
- **Checks:** `pnpm test:browser` and the console; a list equivalent to the chart; reduced motion respected.

## Budgets

- **Search** (`/search`, 275 KB in `src/site/bundle-budget.ts`) is near its limit (handover of 2026-11-02). The new records enter the search index (`virtual:search-index`). Measure with the bundle-budget script on the base and after admission. Check first whether the model-cards page work has freed room. If the index goes over, find the room in the change (shorter indexed fields for prediction records, or index the event and predictor only); never raise the limit.
- **Start page** (115 KB): the hub card for the collection must not add to the start page's own bundle.
- **The collection page:** draw from its own slice, load lazily, keep its code out of shared modules; add a budget entry about 10% above its first measurement (as for the kinds-of-AI page).

## Points settled by the second check

1. **The Kurzweil date (decision 11c).** No copy read prints a date: the August 2001 capture prints neither "January 2001" nor 7 March 2001, and the April 2001 index entry redirects to it. So, as this plan provided, the two Kurzweil records keep the page's "January 2001" with the dataset's 2001-03-07 in the note, and the dataset's existing records stay unchanged.
2. **Archive copies for live pages (7a).** Applied in the pack (see "To admit"). Bostrom's abstract and Kurzweil's "$1,000 … 2023" sentence keep 2026-11-02, because the check did not transcribe them from the early copies. Long Bet 1 keeps 2026-11-02: the 2002 capture words the bet differently, and the record's qualification gives that wording.
3. **The Vinge 1983 sentence.** Both families agree on every quoted word; they differ on one word ("our" or "the") that the record does not quote. Both records are admitted on the recommended answer.

## Fields added by the second adjudication

- `confidence` on the four Simon and Newell records ("I am willing to make the following predictions"); `conditions` on three of them gives the stated basis, labelled "not a condition".
- `retrospective` on `pr-e-legg-2010-log-normal`; `survey.question` on `pr-c-fhi-2011-hlmi`. Both fields are already in the mapping above.
- `checkedCopy` passages may now carry two readers' transcriptions of one copy; the evidence note names whose reading the record rests on.

## Checks for the admission

`pnpm check`, `pnpm check:privacy`, the editorial tests, `pnpm review:seed --check` against a blank pack, and the bundle-budget script; `pnpm test:browser` once before the pull request. The interface step runs `pnpm test:browser` again and inspects the page and console.

## Next step

1. The maintainer's answers to the three quick items in the review note ("Adjudication of the second cross-family check (2026-11-05)", "For the maintainer").
2. The schema change (`states_prediction`, schema 2.30 → 2.31 or the next free schema version) and the admission of the records, together as one minor release, in its turn among the data branches waiting to merge. Start the admission branch from `origin/main` at that time and take the version numbers from it.
3. The collection page of decision 8a as a separate interface step after that release.
