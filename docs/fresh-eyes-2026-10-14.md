# Fresh eyes: first-use test, 14 October 2026

Three simulated first-time readers, each with no prior knowledge of Selekoa, tried
to answer one research question using only the app. The test used the production
preview of `main` at dataset release v0.4.0, in Chromium at desktop width (1440 px)
and phone width (390 px). Each reader ran as a separate agent with its own fresh
context, so none of them shared knowledge with the others. Colour and dark-mode
issues were out of scope.

This is a usability report and a proposal. Nothing in the app or its data was
changed. The structure decision belongs to the maintainer.

Limits of the test: the readers were simulated, not people. They read page text
and screenshots and clicked through a scripted browser, so they cannot report
how fast something felt or what their eye caught first. Their judgements of
clarity are a model's judgements. Treat the findings as a strong first pass. A
short session with one or two real readers would confirm or correct them.

## Summary

**What worked.** Once a reader reached the right collection, Selekoa did what
it promises. The policy researcher had concrete, sourced before-and-after wording
for each lab's framework one click from the start page. The journalist had a dated
Yudkowsky quote with an archive link and a ready citation in three clicks. Every
reader praised the claim panel. It gives the exact location in the source, an
archived copy, the check date, "Scope and limits", and the instruction "Cite the
original document, not Selekoa". The honest gap notices also won praise ("No match
is a gap in coverage", "Known gaps", "What Selekoa cannot answer here"). All three
understood the review status correctly: machines found and checked the records,
and almost nobody has reviewed them. All three said they would use Selekoa as a
finding aid and cite only the originals. That is the intended reading. No reader
hit a console error.

**What hurt.** The good material is reached through a start page and navigation
organised by _record format_. The formats are document history, control and
commitments, propositions, guided reading, research question and dossier. Readers
think in _topics and questions_. The connections between pages also break at the
points where a reader most needs them.

**Top 5 problems, ranked by how much they hurt a first-time reader**

1. **The start page doesn't say what's covered and what isn't.** A reader cannot
   tell from the start page whether their question is in scope. The historian of
   economic thought spent 11 clicks and 10 searches before the About page made it
   clear that economics is not covered. The start page offers ten sections with
   format labels ("PROPOSITIONS", "GUIDED READING", "RESEARCH QUESTION"). It never
   says in one line "this covers lab governance, the ideas and debates around
   advanced AI, and selected institutions and people; it does not yet cover X".
   ([01](fresh-eyes/01-start-desktop.webp), [03](fresh-eyes/03-search-economics-no-match.webp))
2. **Person and document pages are dead ends.** The page for Eliezer Yudkowsky
   says "PERSON · 2 RECORDED CLAIMS" (two authorship credits). It has no link to
   the 207-record collection of his arguments. A reader arriving from People A–Z
   would conclude there is almost nothing on him. Authors such as Robin Hanson,
   Vernor Vinge and Ray Solomonoff have no person page at all. Document pages show
   "Authors credited: no authorship record" and "Dates: no dated record" directly
   under a description that names the author and the year. This reads as a
   contradiction. ([04](fresh-eyes/04-document-page-no-authorship.webp),
   [05](fresh-eyes/05-yudkowsky-person-page.webp))
3. **Related material isn't connected across collections.** The journalist asked
   where others contested Yudkowsky. The Yudkowsky collection is scoped to his own
   writing, and it says so. But Christiano's "Where I agree and disagree with
   Eliezer" (2022) and Hanson's "What Core Argument?" (2008) are both in the data.
   The page even names those debates in describing his replies ("the Hanson–Yudkowsky
   FOOM debate", "Paul Christiano's 'Takeoff Speeds' essay"), but it does not link
   the other side's texts. They were found only by searching for a
   critic's name the reader already knew. The proposition link inside the claim
   panel opens the explorer showing "0 relationships" and "No claims match these
   filters". ([08](fresh-eyes/08-explorer-dead-end.webp))
4. **Internal codes and jargon in reader-facing text.** Readers met "P1",
   "T02-e1", "extropians.3Q99-1451", "code B5 in the human-thought collection",
   "(prov-rsp-v2-2-no-train-deploy-without-safeguards)", "Seed", "version 5" (of
   what?), "articulates" and "Register". Several of these appear in the "Scope and
   limits" and "Reasoning and premises" text, right where the key qualification
   sits. ([07](fresh-eyes/07-claim-panel-internal-codes.webp),
   [13](fresh-eyes/13-not-found-record-ids.webp))
5. **The phone experience hides navigation and buries content.** At 390 px the
   header tabs scroll sideways, and "Search" and "About & method" are off-screen
   with only a clipped letter as a hint. The claim panel opens at the very bottom
   of pages up to 75,000 px tall; "Close ×" does return to the right place. Search
   filters push results about one screen down. The provisions grid shows two
   edition columns with no sign that it scrolls.
   ([02](fresh-eyes/02-start-phone-nav-clipped.webp),
   [14](fresh-eyes/14-provisions-grid-phone.webp),
   [15](fresh-eyes/15-claim-panel-phone.webp))

Close behind these: no cross-lab comparison of frameworks (excluded by design, but
it is what the policy researcher came for); search prefix matching ("critic"
matches "criticality", "labor" matches "laboratory"); visually identical
duplicate search results; and "Explore records" versus "Search", which no reader
could tell apart.

## Persona 1: historian of economic thought

**Question.** When did economics as a field start taking machine intelligence
seriously, and who were the earliest economists to write about it?

**Context.** The economics research packs (`research/economics-growth`,
`research/economics-mainstream`) are candidate packs outside application data.
They are not in the app, so the app was not expected to answer this question. The
test measures how quickly and honestly the app made that clear.

**Path (desktop).**

1. Start page (0 clicks). The reader took it for an archive of AI labs and their
   governance. "Built for researchers, journalists and historians" gave some hope.
   Nothing above the fold mentions economics.
2. Search (1 click): "economics" found nothing, with the note "No match is a gap
   in coverage". "economist" found 4 records, all from one 2008 Hanson post, with
   the two claims shown as identical twins. "economic" found 8 records from
   Extropians and SL4 mailing lists, Vinge 1993 and Cotra 2022. "Hanson" found 40
   records, but Robin Hanson has no person page and is missing from People A–Z.
3. Opened the claim on Hanson's 1994 Extropy article "If Uploads Come First"
   (2 clicks). The reader rated the claim panel highly: printed and PDF page
   locator, a paraphrase marked as such, scope and limits, and the check date.
4. "Read the propositions →" (4 clicks). Found Solomonoff 1985, More 1998 and
   Yudkowsky 2013 ("Intelligence Explosion Microeconomics"). The "Known gaps" list
   naming failed retrievals was called excellent.
5. Searched "Keynes", "Herbert Simon" and "unemployment": nothing. "Summers"
   found only his 2023 OpenAI board seat.
6. "Explore records" → "Ideas & lineages" (7 clicks). This is a network map of
   paper authorship and citations, not intellectual history. "Capital" turned out
   to mean lab funding, not the economic concept.
7. About & method (9 clicks). "Coverage centres on Anthropic, OpenAI, DeepMind…,
   with earlier material on MIRI and the history of AI alignment research." This
   settled that economics is out of scope. The reader gave up at about 11 clicks.

**Answer reached: none.** No economics coverage, and no one is identified as an
economist. The nearest lead was Hanson 1994, recognised only because the reader
already knew who Hanson is. The app was honest about the gap at every step, but
only About & method said so directly.

**Friction.**

- Out of scope with no signpost on the start page; the reader found out only on
  About & method. ([03](fresh-eyes/03-search-economics-no-match.webp))
- Authors are not people in the record, so "economists" cannot be found in any
  structured way, and an author's discipline is never stated.
- The Hanson document page names him in the description, then says "Authors
  credited: no authorship record" and "Dates: no dated record". The source line
  says "published 1994". ([04](fresh-eyes/04-document-page-no-authorship.webp))
- Duplicate-looking results in search, and prefix noise ("labor" matches
  "laboratory", "Labor Code").
- The explorer's sidebar says "Selected records 1965–2027", while About says 1863.
  The two figures appear to cover different sets (the explorer counts what its map
  shows), but nothing says so.
- The search form lists every dropdown option, including about 80 organisations,
  above the results. On the phone that is roughly 700 px of filters.

**Review status, in the reader's words.** "A machine found each record and
compared it with its source passage; almost no person has checked any of it." The
reader noticed that "Seed · not editorially accepted" appears only inside the
collapsed "Status and meaning" section at the bottom of the claim panel
([09](fresh-eyes/09-seed-status-hidden-phone.webp)). The reader also said the green
"SUPPORTED" badge next to "machine-checked" reads at first glance as more
authoritative than it is.

**Would come back?** "Not for the history of economic thought. It is an archive of
AI labs and the futurist and alignment milieu, and it says so only once you dig.
If it gave authors proper person records with their disciplines, its sourcing
would make it a useful finding aid."

## Persona 2: journalist (Yudkowsky)

**Question.** How have Eliezer Yudkowsky's views on AI risk changed over time, and
where have others contested them?

**Path (desktop).**

1. Start page (0 clicks). The card "Eliezer Yudkowsky's arguments on common claims
   about AI, 1996–2026" is the fourth card, below the fold. The reader found it on
   the first scroll.
2. "Read his arguments, claim by claim →" (1 click). There was a brief "Loading
   the records…" blank, then 29 propositions.
3. Scrolled to "Y02 Sufficient intelligence brings good values". This is the
   change-over-time story: the 1996 "Interim purpose" articulates the view, the
   1999 "Re: IA vs. AI…" contests it ("Looking back"), and later texts from 2000,
   2001 and 2008 are listed under "Later texts by the same author that contest it".
   ([06](fresh-eyes/06-yudkowsky-y02-self-revision.webp))
4. "Inspect claim & evidence" (2 clicks), then "Cite the original source" (3
   clicks). Copy APA, BibTeX, RIS and CSL-JSON, with "Cite the original document,
   not Selekoa." **First usable answer at 3 clicks.**
   ([10](fresh-eyes/10-cite-original-source.webp))
5. Searched "Yudkowsky critic" (6 clicks): 8 irrelevant "criticality" claims.
6. Searched "Christiano" (7 clicks), the name of a critic the reader already knew.
   Found "Where I agree and disagree with Eliezer" (2022-06-19), with a quote,
   section locator and archive link. **The contesting voice, at 8 clicks.**
7. Clicked the proposition name in the claim panel (9 clicks). The explorer showed
   "0 relationships" and "No claims match these filters". Dead end.
   ([08](fresh-eyes/08-explorer-dead-end.webp))
8. Start → "Eliezer Yudkowsky" in People A–Z (11 clicks). The page reads "PERSON ·
   2 RECORDED CLAIMS" and has no link to the 207-record collection.
   ([05](fresh-eyes/05-yudkowsky-person-page.webp))
9. Christiano's document page shows "Authors credited: no authorship record"
   under a description of "Paul Christiano's post". The "Treacherous turn" link
   led to the 1863–2022 propositions page, where several authors appear side by
   side with Christiano marked as contesting. About & method was reached at 15
   clicks.

**Answer reached: partial, strong on the first half.** The change over time is
well documented for Y02 in his own retrospective words, enough to write a
paragraph. Others contesting him are almost absent from the Yudkowsky page, which
says "The collection records passages from Yudkowsky's own writing only". One real
critic was found, by name search. The orientation check confirmed that Hanson's
2008 "What Core Argument?", which rejects Yudkowsky's fast-growth scenario, is
also in the data. It was not reachable from his page.

**Friction.**

- No route from Yudkowsky's page or person page to texts that contest him.
- The person page is a dead end (see above).
- The proposition link in the panel leads to an empty explorer.
- Internal codes in "Scope and limits" ("T02-e1", "extropians.3Q99-1451", "the
  message-level rule"). ([07](fresh-eyes/07-claim-panel-internal-codes.webp))
- The source excerpt has no closing quote mark, so the reader could not tell
  where it ends. The most quotable line (2000: "I used to have the extremely
  convenient belief that Friendly AI would happen completely on automatic…") sat
  in the "Read it with this context" box.
- The review notice repeats on every page and "becomes wallpaper".

**Review status, in the reader's words.** "A machine found the passage, confirmed
the quote matches the archived source and wrote the summary; no human editor has
approved it. A well-organised lead sheet." The reader would quote Yudkowsky's own
words after checking the archive, but would not cite Selekoa's paraphrase or its
"contests" labels as fact.

**Would come back?** "Yes, to find his old mailing-list posts with dates and
archive links, which would take me days. But I'd need another source for the
critics: this site mostly shows him arguing with his younger self."

## Persona 3: policy researcher (frameworks)

**Question.** How did Anthropic's, OpenAI's and Google DeepMind's safety and
scaling frameworks change between versions?

**Path (desktop).**

1. Start page (0 clicks). The second card, "Frontier safety frameworks", is above
   the fold and matches the question exactly.
2. "Read the document histories →" (1 click). A timeline of editions for all seven
   frameworks; each edition has "Recorded changes from vX". **First usable answer
   at 1 click.** ([11](fresh-eyes/11-framework-edition-timeline.webp))
3. "Provisions across editions" (2 clicks): a grid of provisions by edition
   ("Stated", "Not found", "–"). ([12](fresh-eyes/12-provisions-grid-clipped.webp))
4. Jumped to Google DeepMind and scrolled to OpenAI Preparedness (3 clicks). Read
   "Limits of this history": "This page does not compare or rank developers."
5. Inspected claims and a "Not found" cell (5–7 clicks). The panel gives the
   inspected page ranges and the search terms, which the reader called "better
   than most think-tank work". ([13](fresh-eyes/13-not-found-record-ids.webp))
6. "Download research starter" → "Download Markdown" (8–10 clicks). The menu
   explained what the file contains before the click.
7. Read the research question "Frameworks, commitments and legal obligations,
   2023–2026" (11–13 clicks). Searched "CBRN" (14 clicks) and got 9 claims across
   Anthropic, Microsoft, GDM and xAI, the closest thing to a cross-lab slice.

**Answer reached: partial.** It is complete one lab at a time: dated editions,
what replaced what, and concrete wording changes. Examples: Anthropic RSP v3.0
drops "Commitment not to train or deploy without adequate safeguards" ("Not
found" from v3.0). GDM FSF v3.1 changes "updated at least once a year" to
"reviewed at least once a year". OpenAI Preparedness Version 2 removes the "low"
and "medium" levels. There is no cross-lab view. The reader noticed that the
provision categories (threshold or trigger, required action, who decides,
exception) are shared across frameworks, so a combined grid looks feasible.
Coverage is uneven: Anthropic has many more editions and tracked provisions than
OpenAI Preparedness.

**Friction.**

- No side-by-side comparison across labs. The reader had to build one by
  scrolling a page of about 22,000 px.
- **A grid row label overstates an edition. This needs an editorial check, not
  just a design fix.** The Anthropic row "Policy changes proposed by CEO and RSO,
  approved by Board" shows "Stated" for v1.0. The v1.0 record
  (`prov-rsp-2023-policy-change-approval`) says only that the board approves after
  consulting the Long-Term Benefit Trust, and the v2.0 change record says v1.0
  named no proposer. The row takes its label from the v2.0 wording, but it also
  holds v1.0's cell. A reader skimming the grid would be misled. Every row
  probably needs a label that fits all its editions, such as "Who approves policy
  changes".
- The grid is cut off at the right edge on desktop and on the phone, with no cue
  that it scrolls. "–" in the middle of runs means "nothing recorded", which is
  honest but tiring. ([12](fresh-eyes/12-provisions-grid-clipped.webp),
  [14](fresh-eyes/14-provisions-grid-phone.webp))
- Record IDs and a stray double full stop ("19)..") appear in the "Reasoning and
  premises" text. ([13](fresh-eyes/13-not-found-record-ids.webp))
- Search results read "Frontier Governance Framework (February 2025) states…"
  with no publisher. Microsoft and OpenAI both have a framework of that name.
- Every button reads "Inspect claim & evidence ↗", so none can be told apart by
  name, including by screen readers. The reader twice opened the wrong one.
- The grid is closed again after navigating away and back.

**Review status, in the reader's words.** "Software found and compared these
passages, and almost nobody has checked them." The reader would not cite Selekoa
in a brief, only the original edition at the location given, after reading it.
The grid-label issue above shows why.

**Would come back?** "Yes, as a finding aid: it is the fastest route I know to
sourced before-and-after wording for each lab's framework revisions. For a
cross-lab brief I'd still build the table myself."

## Structure proposal

### Diagnosis

The maintainer's "a tad all over the place" has a specific cause. Pages are
grouped and labelled by what kind of record view they are. A reader sees cards
labelled DOCUMENT HISTORY, CONTROL AND COMMITMENTS, PROPOSITIONS (twice), GUIDED
READING, RESEARCH QUESTION, INSTITUTIONAL DOSSIERS, ALL RECORDS and PEOPLE. The
header shows a different, partial set: Document histories, Control & commitments,
Explore records, Search, About & method. Ideas, people and questions have no
header entry. Readers come with a topic or a name. The page asks them to pick a
format first.

The corpus already falls into three areas, matching the research spines in
`project-positioning.md`. The proposal makes those three areas the structure and
keeps the formats as what sits inside them.

### Proposal: three topic hubs, one search, one status line

**Header navigation (five items):**

| Proposed                  | Replaces                                      | Contains                                                                                                                           |
| ------------------------- | --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| **Governance**            | Document histories; Control & commitments     | Safety framework histories, control structures (OpenAI, Anthropic), external commitments and laws, the 2023–2026 research question |
| **Ideas & debates**       | Propositions cards on Start; parts of Explore | Propositions about superintelligence, Yudkowsky's arguments, and future collections such as economics                              |
| **Institutions & people** | Dossiers and People A–Z on Start              | Institutional dossiers, Chinese AI histories, People A–Z, the Anthropic guided reading                                             |
| **Search**                | Search; Explore records                       | One search box. Results show as a list by default, with "Timeline" and "Map" as views of the same results                          |
| **About & method**        | (same)                                        | Method, labels, coverage, citing, corrections                                                                                      |

Name changes and why:

- "Document histories" and "Control & commitments" merge into **Governance**:
  readers know the word, and both sections answer governance questions.
- "Propositions" becomes **Ideas & debates**. "Propositions" was opaque to all
  three readers, and "debates" signals that disagreement is recorded.
- "Explore records" merges into **Search**. No reader could tell the two apart.
  The map is a view of results, not a destination.
- Topic tabs in the explorer: keep "Capital", but explain it on first use as
  "Funding and investment in the labs". Rename "Ideas & lineages" to "Citations
  and authorship" (that is what the map shows), or drop it from the explorer once
  Ideas & debates exists.

**Start page leads with** (top to bottom):

1. One sentence on what Selekoa is, then a large search box.
2. **What's covered, and what isn't yet**: three short hub cards (Governance,
   Ideas & debates, Institutions & people), each with two or three example
   questions it can answer. Under them, one line: "Not yet covered: for example
   economics, ...". This fixes problem 1.
3. One compact status line (see below).
4. "Start with a question": the two or three best entry points as plain
   questions. Examples: "How did lab safety frameworks change?", "How did
   Yudkowsky's views change?", "Who controls OpenAI?"
5. Footer: coverage figures (computed, as now) and links to About.

**Demote from the start page:** the full People A–Z list (moves to Institutions &
people, with a link), the dossier name lists, "How to read a claim" and "What
Selekoa does not claim". The last two move to About & method, with a single "How
to read a record →" link next to the status line. That would bring the start page
down from about 3,200 px of ten sections to about two screens.

**Cut:** the repeated "Machine-first research" box on every inner page (see
below), the visible collection version numbers ("version 5"), and codes such as
"code B5 in the human-thought collection" from reader-facing text.

### Where the review status goes

Every reader understood the review status correctly. The problem is delivery: the
same paragraph appears on every page until it "becomes wallpaper", while the
plain-language state of an individual claim is hidden in a collapsed section. The
proposal reverses that.

- **Site-wide:** one persistent line in the header, replacing the "Research
  preview" button: _"Research preview · records found and checked by machines,
  not yet reviewed by an editor · What this means →"_. Remove the boxed notice
  from inner pages.
- **Per claim:** a visible status chip in plain words next to the evidence badge.
  For example: _"Machine-checked 2026-10-07 · Not reviewed by an editor"_. Replace
  "Seed" with that phrase everywhere a reader sees it. Keep "Supported" but
  place it after the review chip, so the reading order is "machine-checked, not
  reviewed, evidence supports the claim as scoped".
- **Per collection:** keep the one-line "A machine selected and arranged these
  records. No human review of the selection is recorded." Drop "(version N)" from
  that sentence, or explain it.

### What each change fixes

| Change                                                                            | Fixes                                                                                                             |
| --------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Start page leads with search plus "covered / not yet covered"                     | Problem 1 (the economic historian took 11 clicks to learn the question was out of scope)                          |
| Three topic hubs in the header                                                    | Format-first labels; "Propositions" and "Control & commitments" were opaque; ideas and people had no header entry |
| Merge Explore into Search; map and timeline as views                              | "Explore records vs Search" confusion; the empty-explorer dead end becomes an ordinary empty result               |
| Person and document pages list "Appears in" collections                           | Problem 2 (Yudkowsky page with no link to his 207 records)                                                        |
| Collection pages carry "Contested by other writers" links where the data has them | Problem 3 (Christiano and Hanson not reachable from his page)                                                     |
| Status line in the header plus a plain per-claim chip                             | Notice fatigue; "Seed" jargon; "Supported" read as authority                                                      |
| Phone header shows all five items (fewer, shorter items fit)                      | Problem 5 (Search and About off-screen)                                                                           |

### Wireframe: start page

```text
+--------------------------------------------------------------------------+
| selekoa.   Governance  Ideas & debates  Institutions & people   Search   |
|            About & method                                                |
| Research preview · found and checked by machines, not yet reviewed by    |
| an editor · What this means ->                                           |
+--------------------------------------------------------------------------+
|                                                                          |
|  A documentary history of machine intelligence.                          |
|  Every statement links to the source passage it rests on.                |
|                                                                          |
|  [ Search people, labs, documents, ideas ...                     ][Go]   |
|                                                                          |
|  WHAT'S COVERED                                                          |
|  +--------------------+ +--------------------+ +----------------------+  |
|  | Governance         | | Ideas & debates    | | Institutions & people|  |
|  | Safety frameworks, | | Propositions about | | Lab dossiers, Chinese|  |
|  | edition by edition;| | superintelligence; | | AI histories,        |  |
|  | who controls the   | | Yudkowsky's        | | People A-Z           |  |
|  | labs; commitments  | | arguments, 1996-   | |                      |  |
|  | and laws           | |                    | |                      |  |
|  | > How did the RSP  | | > When was the     | | > Who founded        |  |
|  |   change?          | |   treacherous turn | |   Anthropic?         |  |
|  |                    | |   first argued?    | |                      |  |
|  +--------------------+ +--------------------+ +----------------------+  |
|  Not yet covered: for example economics of AI, model benchmarks.         |
|  Coverage is selective. What's in the record ->                          |
|                                                                          |
|  START WITH A QUESTION                                                   |
|  > How did lab safety frameworks change between versions?                |
|  > How did Yudkowsky's views on AI risk change?                          |
|  > Who holds control rights over OpenAI, and since when?                 |
|                                                                          |
+--------------------------------------------------------------------------+
| Coverage (computed) · dataset release · How to cite · Corrections        |
+--------------------------------------------------------------------------+
```

### Wireframe: inner collection page (desktop; phone stacks the columns)

```text
+--------------------------------------------------------------------------+
| header as above (one status line, no boxed notice)                       |
+--------------------------------------------------------------------------+
| Governance > Safety frameworks                                           |
|                                                                          |
| How did each lab's safety framework change between editions?             |
| Covers: 7 frameworks from 6 developers. Not covered: implementation,     |
| compliance. A machine selected these records; no editor has reviewed     |
| the selection.                                                           |
| [Download research starter]  [Copy link]                                 |
|                                                                          |
| +-----------+----------------------------------------------------------+ |
| | ON THIS   |  Edition timeline (all labs)                             | |
| | PAGE      |  -----------------------------------------------------   | |
| | Timeline  |  Compare a provision across labs: [Threshold or trigger] | |
| | Compare   |    Anthropic RSP  | GDM FSF   | OpenAI Prep.             | |
| | Anthropic |    v3.0 Stated    | v3.0 ...  | v2 ...                   | |
| | GDM       |  -----------------------------------------------------   | |
| | OpenAI    |  Anthropic · Responsible Scaling Policy                  | |
| | xAI ...   |   v2.0 -> v2.1  Recorded changes ...                     | |
| |           |   [Inspect: "Pause training until ASL-3..."]             | |
| | RELATED   |                                                          | |
| | Who       |                                                          | |
| | controls  |                                                          | |
| | Anthropic |                                                          | |
| | Commit-   |                                                          | |
| | ments     |                                                          | |
| +-----------+----------------------------------------------------------+ |
|                                                                          |
|  Claim panel opens as an overlay from the right (a bottom sheet on       |
|  phone) instead of an always-reserved empty column:                      |
|  +----------------------------------------------+                        |
|  | Claim and evidence                  Close x  |                        |
|  | Machine-checked 2026-10-04 · Not reviewed by |                        |
|  | an editor · Evidence supports the claim      |                        |
|  | Statement ... "quoted passage ..."           |                        |
|  | Location: §4.3, p. 12 · Archived copy        |                        |
|  | Cite the original source v                   |                        |
|  +----------------------------------------------+                        |
+--------------------------------------------------------------------------+
```

Two points in this wireframe go beyond navigation and need their own decisions:

- **A cross-lab "Compare a provision" view.** The current page states "This page
  does not compare or rank developers." A side-by-side view of recorded
  provisions by category is a comparison but not a ranking. It would need the
  same "Stated / Not found / nothing recorded" honesty as the per-lab grid and an
  editorial decision that it does not imply equivalence between differently
  worded provisions.
- **The claim panel as an overlay.** On desktop, the right-hand column ("Inspect
  any record") is reserved and mostly empty until a claim is opened. On phone, the
  panel appears at the bottom of very long pages. An overlay or bottom sheet
  solves both.

## Quick wins (independent of the structure decision)

Interface and wording only, unless marked otherwise.

1. **Phone header:** make all items reachable: wrap onto two lines, add a scroll
   cue, or put Search as an icon beside the logo.
2. **Person pages:** add "Appears in" links to the collections that cite the
   person's texts (Yudkowsky → his 207-record collection).
3. **Document pages:** when no authorship or date claim exists, write "No
   authorship claim recorded yet (the description above names the author)", not
   a bare "no authorship record". The same applies to dates.
4. **Proposition link in the claim panel:** open the proposition's place on its
   collection page, not the explorer. If the explorer stays, explain an empty
   result.
5. **Search:** show the collection name on each result so duplicate-looking
   claims can be told apart. Put "A term matches the beginning of a word" under
   the box, and offer a whole-word option. Collapse the filters, on the phone
   at least.
6. **Distinct button names:** "Inspect claim & evidence" should carry the claim
   name in its accessible label. This fixes wrong-target clicks and screen-reader
   use.
7. **Provisions grid:** add a sticky first column and a visible scroll cue, and
   remember whether it was open.
8. **Search result titles:** prefix the publisher when two documents share a
   title ("Microsoft · Frontier Governance Framework").
9. **Quotations:** close every excerpt with a quote mark, or mark a truncated
   ending with an ellipsis.
10. **Wording:** replace "Seed" with "not reviewed by an editor"; drop "(version
    N)" from collection notices; explain "Register" on first use.
11. **Start page:** add one "Not yet covered" line under the intro, even before
    any restructure.
12. **Editorial check (data, needs separate authorisation):** row labels in the
    provisions grid that are taken from one edition's wording
    (`rsp-policy-change-approval` shows a v2.0 label over a v1.0 cell). Internal
    IDs ("T02-e1", "prov-…", "code B5", "extropians.3Q99-1451") and the stray
    "19).." inside qualification and reasoning text are data records, so
    removing them is an editorial task under the editorial policy.

## Method notes

- Build: `pnpm build`, then `pnpm preview` on localhost. Each reader drove its own
  persistent Chromium session through a small helper script that is not tracked.
  The helper returned the visible page text and controls and took screenshots.
- Readers were told to use only the app: no repository files, no web search.
  Click counts are as each reader logged them.
- Full step logs and all screenshots (about 70) are kept in `review/.local/`
  (untracked). The 15 shown here were compressed and saved in
  [`docs/fresh-eyes/`](fresh-eyes/).
- Before writing, the orientation pass confirmed the most consequential findings
  directly: the Yudkowsky person page, the duplicate search results, the presence
  of Hanson 2008 in the data, and the grid row-label mismatch.

### Screenshots

| File                                                 | Shows                                                                             |
| ---------------------------------------------------- | --------------------------------------------------------------------------------- |
| [01](fresh-eyes/01-start-desktop.webp)               | Desktop start page above the fold                                                 |
| [02](fresh-eyes/02-start-phone-nav-clipped.webp)     | Phone start page; Search and About clipped off the header                         |
| [03](fresh-eyes/03-search-economics-no-match.webp)   | "economics" finds nothing; the gap-in-coverage note                               |
| [04](fresh-eyes/04-document-page-no-authorship.webp) | Hanson 1994 page: description names the author, fields say "no authorship record" |
| [05](fresh-eyes/05-yudkowsky-person-page.webp)       | Yudkowsky person page: 2 claims, no link to his collection                        |
| [06](fresh-eyes/06-yudkowsky-y02-self-revision.webp) | Y02: his 1996 view and later self-revisions                                       |
| [07](fresh-eyes/07-claim-panel-internal-codes.webp)  | Claim panel with internal codes in "Scope and limits"                             |
| [08](fresh-eyes/08-explorer-dead-end.webp)           | Proposition link opens an empty explorer                                          |
| [09](fresh-eyes/09-seed-status-hidden-phone.webp)    | "Seed · not editorially accepted" inside a collapsed section                      |
| [10](fresh-eyes/10-cite-original-source.webp)        | "Cite the original source": APA, BibTeX, RIS, CSL-JSON                            |
| [11](fresh-eyes/11-framework-edition-timeline.webp)  | Edition timeline across seven frameworks                                          |
| [12](fresh-eyes/12-provisions-grid-clipped.webp)     | Provisions grid cut off at the right edge on desktop                              |
| [13](fresh-eyes/13-not-found-record-ids.webp)        | "Not found" record: inspected scope, with record IDs in the text                  |
| [14](fresh-eyes/14-provisions-grid-phone.webp)       | Phone: grid shows two edition columns, no scroll cue                              |
| [15](fresh-eyes/15-claim-panel-phone.webp)           | Phone claim panel, opened at the bottom of the page                               |
