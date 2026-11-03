# Decision sheet: Predictions on record

The pack records 53 predictions about machine intelligence from 1950 to 2026 (individual forecasts, expert surveys, a public bet, laboratories and their leaders): who predicted what, when, by what date, with what stated probability, always in the source's own words and without judging whether any came true. The decision that matters most is **1, the new kind of record**: admission needs it, and it fixes that a prediction is dated by when it was made, never by its target year.

Source: review note `review/predictions-pack-2026-11-02.md` on branch `predictions-pack`, sections "Open questions, with recommendations" (numbers 1–10 below match it) and "Checks and audit" (11). Files in `research/predictions/` on the same branch.

**State.** Nothing is admitted. The cross-family check has not yet run: that is a check by a model from a different maker (GPT, through Codex) of what Claude drafted. It runs after these answers, with the retrieval of sources that could not be reached here.

## The question of events near the target date

This has its own section because it decides whether the page ever places a prediction next to something that could be read as its outcome.

### 2. Should a prediction show "events on record near the target date"?

The task that produced the pack asked whether a prediction could list dataset records of the predicted event near its target date. The drafting session searched the dataset for the predicted events' own words (for example "world chess champion", "Turing test", "join the workforce", "country of geniuses", "superintelligence"). It found no dated record of any predicted event happening; every match was another text discussing the term. So the section would have to choose which records "match" a prediction, and that choice is itself a judgement of whether the prediction came true, which the collection says it does not make (review note § Open questions, 2; § Rules applied).

- **a.** Do not build it. A prediction with a printed target year may link to the dataset's browse-by-year page for that year, labelled "What the dataset records for 2029" (for example), as a neutral link, never placed beside the prediction as an outcome.
- **b.** Build it, restricted: only records whose statement repeats the predicted event's key phrase word for word, shown collapsed under "Events on record near the target date (no judgement of fulfilment is made)", with every pairing confirmed by the cross-family check.
- **c.** Neither: no section and no year link.

_Recommendation: a._ No matching event records exist, so b would show pairings chosen by editors; the year link gives context without pairing.

- a: a small link to the year's page; nothing set beside the prediction.
- b: some predictions show a collapsed list of records; each pairing is an editorial choice the reader may take as a verdict.
- c: the prediction stands alone.

## Other decisions

### 1. A new kind of record for predictions

Proposed: a record "document states a prediction", with fields for form (forecast, bet, survey, platform question, reported statement), who predicted, the event as quoted, the horizon as worded, the probability as worded, conditions and hedges. "Supported" means only that the document states the prediction.

- **a.** Adopt it, with the document as the subject (the person reached through authorship).
- **b.** Adapt the existing estimates field on propositions instead.

_Recommendation: a._ The existing field needs a proposition and has no place for horizon, bet or survey details.

- a: a new collection and page become possible; one schema release.
- b: predictions appear only where they attach to an argument.

### 3. Horizons such as "within ten years"

- **a.** Do not compute a year in the data; a page may draw a bracket from the source date, labelled with the source's words, never a point at a computed year.
- **b.** Store source date plus ten years as a target year.

_Recommendation: a._ "In about fifty years' time" (Turing, 1950) is not the same claim as "by 2000".

- a: these predictions appear in the table and as labelled brackets.
- b: they appear as points on the chart at computed years.

### 4. Three records whose wording is not yet verified

Simon and Newell (1958) and two OpenAI pages of 2023 could not be reached here.

- **a.** Hold until Codex confirms the wording; admit only then.
- **b.** Admit now, marked unverified.

_Recommendation: a._

- a: these three are missing at first.
- b: they appear with an "unverified" label.

### 5. Reported statements

Lighthill's report gives his unnamed correspondents' views.

- **a.** Admit as Lighthill's report, labelled "reported statement"; treat the 1970 _Life_ report of Minsky the same way if Codex finds it, with any later statement by Minsky about the quotation.
- **b.** Exclude reported statements.

_Recommendation: a._ The record attributes the words to the report, not to the unnamed people.

- a: Lighthill's report appears, labelled. b: it does not.

### 6. Dates in section headings

Moravec's "The Age of Robots" (1993) heads sections with dates ("The Medium Run (around 2050)") without dating sentences.

- **a.** Do not record them.
- **b.** Record each heading as a prediction.

_Recommendation: a._ A heading frames a scenario; it is not a sentence stating an event by a date.

- a: no Moravec 1993 records. b: several.

### 7. Pages read as they stand today

Bostrom (1998), Kurzweil (2001), Brooks (2018), the 2022 expert survey page and AI 2027.

- **a.** Admit with the wording dated from the retrieval date, and ask Codex for archive copies near publication.
- **b.** Hold until archive copies are read.

_Recommendation: a._ The record shows both dates, so nothing is back-dated.

- a: these appear with "wording attested" dates. b: they wait.

### 8. The collection and its page

"Predictions on record", under the hub "Human thought and institutions around machine intelligence". One page: a chart (source date across, printed target year up, for printed years only), the same records as a keyboard-accessible table, filters by form and decade, a CSV. No "today" line, no shading or colour for past target dates, no count by outcome. The page says it does not judge fulfilment, rank predictors or combine estimates.

- **a.** As described.
- **b.** Table only, no chart.
- **c.** Other (say what).

_Recommendation: a._ The chart shows how forecasts moved over time without marking any as passed.

- a: chart and table. b: table only.

### 9. Cotra's 2020 estimate, known only from her 2022 account

- **a.** Keep it, flagged as reported later; pair it with the 2020 report once that is read.
- **b.** Drop it until the 2020 report is read.

_Recommendation: a._

- a: shown with a "reported in 2022" flag. b: not shown yet.

### 10. Later additions

Metaculus figures (only from dated archive copies), Kurzweil's 1999 and 2005 dates, Legg's blog posts, Simon (1965), Minsky (1967) and the Sandberg–Bostrom survey.

- **a.** One Codex batch with the cross-family check, then a small supplementary pass before admission.
- **b.** Admit without them; add later.

_Recommendation: a._

- a: admission waits for one batch. b: the first release is smaller.

### 11. Date of Kurzweil's "The Law of Accelerating Returns"

The dataset dates it 7 March 2001; the page read says "January 2001". The pack records January 2001 and notes the dataset's date.

- **a.** Correct the dataset's existing records to January 2001 in the admission task.
- **b.** Keep 7 March 2001 and note the page's month.
- **c.** Ask Codex for an archive copy first.

_Recommendation: c._ Two dates disagree; an early copy can settle which the page printed at publication.

- a/b: one date shown across collections. c: unchanged until Codex reports.

---

Reply with, for example: 1a 2a 3a 4a 5a 6a 7a 8a 9a 10a 11c
