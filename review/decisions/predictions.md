# Decision sheet: Predictions on record

**Quick OKs: 1, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13; needs judgement: 2, 8, 14, 15.**

The pack records 53 predictions about machine intelligence from 1950 to 2026 (individual forecasts, expert surveys, a public bet, laboratories and their leaders): who predicted what, when, by what date, with what stated probability, always in the source's own words and without judging whether any came true. The decision that matters most is **1, the new kind of record**: admission needs it, and it fixes that a prediction is dated by when it was made, never by its target year. Both model families agree on it, with six small changes the check showed are needed. The judgements left are about presentation (2, 8) and scope (14, 15).

Source: review note `review/predictions-pack-2026-11-02.md` on branch `predictions-apply`, sections "Open questions, with recommendations" (numbers 1–10 below match it), "Checks and audit" (11) and "Adjudication of the cross-family check (2026-11-03)" (12–15, and the changes to 1, 4, 5, 10 and 11). Files in `research/predictions/` on the same branch.

**State.** Nothing is admitted. The cross-family check has run. A model from a different maker (OpenAI's GPT, run through Codex) checked all 53 records on 2026-11-03, first blind from the sources alone, then against the pack. It agreed on 38, found 14 minor points and no material one, and could not check 1 (de Garis, 1989: the article would not load). It also retrieved 15 groups of sources Claude could not reach and read 16 dated Metaculus captures. A Claude session then adjudicated: 10 of the minor points are applied, the other 4 corrected the checker's own blind answers, and no point is disputed between the two families. The three records whose wording was unverified are now verified and released, each labelled with the copy that was read.

"Quick: OK the recommendation" marks a mechanical, low-stakes decision whose recommendation follows from the editorial policy or from the two model families agreeing. "Needs your judgement" marks an editorial or scope judgement, or a disagreement between the checker and the preparer.

## Applied after the check (no decision needed)

- **Applied.** Simon and Newell's chess prediction is verified in a scan of the printed article (printed p. 7). Its date is now 1958, since the issue is January–February, and its "within ten years" counts from the address of 14 November 1957, not from the issue.
- **Applied.** The two OpenAI pages of 2023 are verified in archive copies of their publication days, read by the checker. This environment cannot reach those copies, so each record says whose reading it rests on.
- **Applied.** Smaller repairs: two locators (Turing, the Dartmouth proposal); the sentence that Moravec's "It" refers to, now read; the definition of human-level machine intelligence used for the 2060 survey figure (Zhang et al.); the Long Bet's detailed terms, which are on the same page; Cotra's 2020 estimate quoted as two passages instead of one with an ellipsis; Cotra's "~60% by 2050" added to the stated probabilities.
- **Confirmed by the check.** The survey figures belong to the survey reports; the Lighthill records are his report of unnamed correspondents; Cotra's 2020 estimate is a later report; no relative horizon is turned into a year; every hedge and condition is kept. The 2022 expert-survey figure is now attested by an archive copy of 4 August 2022.
- **Not checkable.** Simon (1965), Minsky (1967), Michie's poll in _Nature_ (1973) and Kurzweil's books (1999, 2005): not readable to the checker either. None is in the pack. Each stays a lead.

## The question of events near the target date

This has its own section because it decides whether the page ever places a prediction next to something that could be read as its outcome.

### 2. Should a prediction show "events on record near the target date"?

Needs your judgement: an editorial choice about how the page reads. The check did not address it.

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

Quick: OK the recommendation. Both families agree on the approach and on the changes below.

Proposed: a record "document states a prediction", with fields for form (forecast, bet, survey, platform question, reported statement), who predicted, the event as quoted, the horizon as worded, the probability as worded, conditions and hedges. "Supported" means only that the document states the prediction.

The checker found that some records do not fit the proposal unchanged. The smallest changes that fit them:

1. A predicted event may be a labelled paraphrase, with a note, where the quoted sentence refers back to it (Yudkowsky, 2000: "it seems like a reasonable upper bound" for the Singularity).
2. A statement can be marked "forecast or aim" (decision 14).
3. Where one record has several probabilities and dates, or two versions of an estimate, each probability is tied to its own date and version (Cotra's four points; Carlsmith's estimates of April 2021 and May 2022; Kurzweil's supercomputers by 2010 and personal computers by around 2020).
4. A predictor can be unnamed, with the reporting author recorded separately (Lighthill's correspondents), so authorship does not make Lighthill the predictor.
5. A horizon can count from a dated occasion, such as an address or a poll, instead of the document's date (Simon and Newell: the 1957 address, printed in 1958).
6. A dispute about what a document says (its wording, attribution or version) can be recorded as contested or unresolved. A dispute about whether a prediction came true still cannot. No record admitted without a checked quotation.

- **a.** Adopt it, with the document as the subject, and with the six changes.
- **b.** Adopt it as first proposed.
- **c.** Adapt the existing estimates field on propositions instead.

_Recommendation: a._ The changes are what the checked records need; without them, eight of the 53 records would be forced into fields that misstate them. The existing estimates field needs a proposition and has no place for horizon, bet or survey details.

- a: a new collection and page become possible; one schema release.
- b: as a, but some records lose a version, a date's anchor or who is speaking.
- c: predictions appear only where they attach to an argument.

### 3. Horizons such as "within ten years"

Quick: OK the recommendation. Both families kept every relative horizon unconverted.

- **a.** Do not compute a year in the data; a page may draw a bracket from the source date, labelled with the source's words, never a point at a computed year.
- **b.** Store source date plus ten years as a target year.

_Recommendation: a._ "In about fifty years' time" (Turing, 1950) is not the same claim as "by 2000".

- a: these predictions appear in the table and as labelled brackets.
- b: they appear as points on the chart at computed years.

### 4. Three records whose wording was not verified

Quick: OK the recommendation.

Simon and Newell (1958) and two OpenAI pages of 2023 could not be reached by Claude. The checker has now read all three: Simon and Newell in a scan of the printed article (which Claude then read too), the OpenAI pages in archive copies of their publication days. The wording matches.

- **a.** Admit them, each labelled with the copy that was read and who read it.
- **b.** Keep holding the two OpenAI records until Claude can read the archive copies itself.

_Recommendation: a._ This is what the earlier recommendation provided for: admit once the checker confirms.

- a: all three appear, with a note on the copy.
- b: the two OpenAI records wait.

### 5. Reported statements

Quick: OK the recommendation. The checker agreed with the Lighthill records.

Lighthill's report gives his unnamed correspondents' views. For the 1970 _Life_ report of Minsky, the checker found the sentence only in the magazine's search index (p. 58); the page itself would not display. A later book chapter (Grudin, revised 2012) reports that Minsky told its author he was misquoted.

- **a.** Admit Lighthill's report, labelled "reported statement". Record the _Life_ report only after the page itself is read, with Grudin's report beside it.
- **b.** Exclude reported statements.

_Recommendation: a._ The record attributes the words to the report, not to the unnamed people; a search-index excerpt is a lead, not evidence.

- a: Lighthill's report appears, labelled; _Life_ waits. b: neither appears.

### 6. Dates in section headings

Quick: OK the recommendation.

Moravec's "The Age of Robots" (1993) heads sections with dates ("The Medium Run (around 2050)") without dating sentences.

- **a.** Do not record them.
- **b.** Record each heading as a prediction.

_Recommendation: a._ A heading frames a scenario; it is not a sentence stating an event by a date.

- a: no Moravec 1993 records. b: several.

### 7. Pages read as they stand today

Quick: OK the recommendation.

Bostrom (1998), Kurzweil (2001), Brooks (2018), the 2022 expert survey page and AI 2027. The checker found an archive copy of the survey page from 4 August 2022 with the same figure, and no usable copy of the Long Bet page from 2002.

- **a.** Admit with the wording dated from the retrieval date, and ask Codex for archive copies near publication.
- **b.** Hold until archive copies are read.

_Recommendation: a._ The record shows both dates, so nothing is back-dated.

- a: these appear with "wording attested" dates. b: they wait.

### 8. The collection and its page

Needs your judgement: a design and hub choice.

"Predictions on record", under the hub "Human thought and institutions around machine intelligence". One page: a chart (source date across, printed target year up, for printed years only), the same records as a keyboard-accessible table, filters by form and decade, a CSV. No "today" line, no shading or colour for past target dates, no count by outcome. The page says it does not judge fulfilment, rank predictors or combine estimates.

- **a.** As described.
- **b.** Table only, no chart.
- **c.** Other (say what).

_Recommendation: a._ The chart shows how forecasts moved over time without marking any as passed.

- a: chart and table. b: table only.

### 9. Cotra's 2020 estimate, known only from her 2022 account

Quick: OK the recommendation. The checker agreed that the record is her 2022 report, not the 2020 estimate.

- **a.** Keep it, flagged as reported later; pair it with the 2020 report once that is read.
- **b.** Drop it until the 2020 report is read.

_Recommendation: a._

- a: shown with a "reported in 2022" flag. b: not shown yet.

### 10. Later additions

Quick: OK the recommendation.

The checker retrieved texts for: Simon and Newell's other three predictions of 1957 (a mathematical theorem, music, theories in psychology, each "within ten years"); Vinge in _Omni_, January 1983 ("likely to happen between 20 and 100 years from now"); Legg's blog posts of 2009, 2010 and 2011; the Sandberg–Bostrom survey of January 2011; and OpenAI's "AI progress and recommendations" (November 2025). Simon (1965), Minsky (1967) and Kurzweil's books stayed out of reach.

- **a.** One small supplementary pass before admission: draft records for those five, with the Metaculus figure if decision 15 says so, and send them for a short cross-family check.
- **b.** Admit the 53 now; add these later.

_Recommendation: a._ The texts are in hand and the pass is small; it avoids a second admission for five records.

- a: admission waits for one short pass. b: the first release is smaller.

### 11. Date of Kurzweil's "The Law of Accelerating Returns"

Quick: OK the recommendation.

The dataset dates it 7 March 2001; the page read says "January 2001". The pack records January 2001 and notes the dataset's date. The checker read the page and also found "January 2001"; it did not look for an archive copy.

- **a.** Correct the dataset's existing records to January 2001 in the admission task.
- **b.** Keep 7 March 2001 and note the page's month.
- **c.** Ask Codex for an archive copy first.

_Recommendation: c,_ in the pass of decision 10. Two dates disagree; an early copy can settle which the page printed at publication.

- a/b: one date shown across collections. c: unchanged until Codex reports.

### 12. The checker's order of work

Quick: OK the recommendation.

The checker committed all 53 blind answers before it opened the pack's answers. It discloses one deviation: an automatic privacy scan, started before that commit, read every tracked file (the pack's answers included) and reported only pass or fail. The checker never saw the files' contents through it. The blind answers are unchanged since the commit, and on four records they differ from the pack in ways the checker later corrected against itself, which a copy of the pack would not show.

- **a.** Accept the check as blind.
- **b.** Run a new, isolated check.

_Recommendation: a._ The deviation exposed no content to the reviewer.

- a: no further check. b: another Codex run of 53 items.

### 13. De Garis (1989)

Quick: OK the recommendation.

Neither model could load the article (a bot check, a refused copy, no archive copy found). The record's quotation matches the dataset's own checked passage from the same article, which is already admitted.

- **a.** Admit, labelled "checked against the dataset's passage; the article could not be retrieved on 2 and 3 November 2026".
- **b.** Hold until the article is read again.

_Recommendation: a._ The passage was checked when the dataset admitted it; the label says the article itself was not re-read.

- a: the record appears with the label. b: it waits.

### 14. Altman, 2035: "should be able to"

Needs your judgement: whether an aim belongs in a collection of predictions.

Altman (February 2025): "Anyone in 2035 should be able to marshall the intellectual capacity equivalent to everyone in 2025". Both models read "should" as either a forecast or an aim. The record keeps the wording and says so.

- **a.** Keep it, marked "forecast or aim" (change 2 in decision 1).
- **b.** Leave it out: the collection records forecasts only.

_Recommendation: a._ The sentence gives a date and a capability; the mark tells readers it may be an aim.

- a: one record carries the mark. b: one record fewer.

### 15. One Metaculus figure

Needs your judgement: whether a single dated figure is worth showing.

Of 16 dated archive copies of two Metaculus questions on general AI, one shows a community forecast: question 5121, copy of 5 January 2025, "When will the first general AI system be devised, tested, and publicly announced?", displayed as 2031-06-14. The others show no readable figure, and the question's title and criteria changed over time.

- **a.** Record that one figure as a platform question, with that copy's own title and a pointer to its criteria.
- **b.** No platform records until several dated figures can be read.

_Recommendation: a._ It meets the rule (a figure only from a dated copy); the record says that other copies show no readable figure.

- a: one platform point on the chart. b: no platform records.

---

Reply with, for example: 1a 2a 3a 4a 5a 6a 7a 8a 9a 10a 11c 12a 13a 14a 15a
