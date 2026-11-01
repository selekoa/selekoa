# Reader tasks, 29 October 2026

The step-back usability review run as a measurable test. Twenty realistic
questions from five kinds of reader, each with an answer that the current
data holds, were scripted in a browser against the production build, timed,
rated, then partly re-run blind by a fresh-context reader. The worst problems
that are interface, navigation, labelling or findability problems were then
fixed and the whole set was run again. Data and editorial problems are listed
for the maintainer with a recommended answer each.

Dataset release v0.12.0 (main at `3d74e0d`). Earlier reviews:
[fresh eyes, 26 October](../docs/fresh-eyes-2026-10-26.md) and
[pre-rendered pages](prerender-pages-2026-10-27.md), whose open follow-ups
(claim-page headings, claim-row links) are covered here.

## Method

- **Build.** `pnpm build`, then `pnpm preview` (`http://127.0.0.1:4173`).
  The before state was copied and served unchanged on a second port for the
  whole of Part 1 and for the blind reader, so the fixes could not leak into
  the before figures.
- **Browser.** Playwright's Chromium, light theme, desktop 1440 × 900 and
  phone 390 × 844 (touch, mobile). Analytics beacons are blocked from
  localhost and were ignored; no other console error or warning occurred in
  any run, before or after.
- **Two paths per task.** _From the start page_: the shortest path a reader
  could plausibly take, clicking only what the page shows. _From a deep
  landing_: a page a search engine could plausibly send the reader to,
  opened directly. Each landing page was also fetched as plain HTML (no
  JavaScript), as a crawler or a reader with scripts off sees it.
- **Measures.** Clicks (a typed search counts as one; opening a disclosure
  counts as one), whether every part of the answer is on the final page,
  how far down the page the answer sits (px from the top), page height,
  load problems and console errors. The scripted runs and their raw output
  stay outside the repository; the figures below are copied from them.
- **Ratings.** _Found_: the answer is on the page the path ends on and
  readable there. _Found with difficulty_: it is reachable, but only by an
  extra step the page does not suggest, knowledge the page does not give,
  or a scroll of more than about 15,000 px with no way to jump. _Not found_:
  a plausible reader stops without it.
- **Misleading.** Whether the answer as shown, read alone, would lead a
  reader to a wrong conclusion.

Limits: the paths are mine and are scripted, so they record where a reader
_can_ get, not how a person would feel about it. The blind reader below is a
model, not a person.

## The task set

| #   | Reader             | Spine and page type                  | Question                                                                                                            | Where the answer is                                                                    |
| --- | ------------------ | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| T01 | Policy researcher  | Governance · guided reading          | What does the EU AI Act require of general-purpose AI model providers, and from when?                               | Guide, EU AI Act provisions (Art. 53–55; Chapter V applies from 2 August 2025)         |
| T02 | Journalist         | Governance · control structure       | Who controlled OpenAI in 2019?                                                                                      | `/control/openai`, 2019: OpenAI LP controlled by the board of OpenAI Nonprofit         |
| T03 | Policy researcher  | Governance · guided reading          | Which frameworks name California's SB 53?                                                                           | Guide, SB 53, "Framework editions that name it" (xAI, Microsoft, OpenAI, RSP v3.0–3.4) |
| T04 | Historian of AI    | Governance · search, versions        | When did Anthropic's RSP first include an AI R&D threshold? (earliest located)                                      | RSP v2.0 (effective 2024-10-15), comparison cell; v1.0 names autonomous replication    |
| T05 | Historian of AI    | Search                               | Where does the term "AGI" appear earliest in the record?                                                            | Evidence passage of the SL4 message of 2002-06-23                                      |
| T06 | Curious newcomer   | Institutions · "not covered"         | What does Selekoa not cover on China?                                                                               | About "Not yet covered"; guide "Not covered" (GB 45438 held; TC260 outside the guide)  |
| T07 | Journalist         | Ideas · propositions                 | Did Yudkowsky reverse his early view that superintelligence should be built as fast as possible, and when?          | Y22: "explicit reversal", 2001-08-01                                                   |
| T08 | PhD student        | Ideas · propositions, document       | Which text is the earliest located for the "intelligence explosion" proposition?                                    | A1: I. J. Good, 1965 (claimed 1962-10)                                                 |
| T09 | PhD student (econ) | Ideas · propositions, person         | Which economist's text is the earliest located in the economics collection, and when?                               | Buckingham, 1955-10-14 (tier 1)                                                        |
| T10 | Policy researcher  | Governance · comparison              | What does Google DeepMind's latest framework say about pausing development or deployment?                           | Compare frameworks, FSF v3.1, "Pause, non-deployment or non-training"                  |
| T11 | Policy researcher  | Governance · document history        | What replaced Anthropic's RSP v2.2, and when did it take effect?                                                    | v3.0, effective 2026-02-24                                                             |
| T12 | Journalist         | Governance · commitments             | Which companies said they would not sign the EU GPAI Code of Practice?                                              | Commitments page: one stated refusal, Meta (2025-07-18)                                |
| T13 | Journalist         | Institutions · Chinese dossier       | Who backed DeepSeek financially, according to the record, and is an amount stated?                                  | High-Flyer, 2023-05-25; no amount established                                          |
| T14 | Policy researcher  | Governance · control structure       | When did Anthropic's Long-Term Benefit Trust–appointed directors become a board majority?                           | Announcement of 14 April 2026 (Narasimhan)                                             |
| T15 | Historian of AI    | Institutions · person                | What roles at OpenAI does the record give Dario Amodei, with dates?                                                 | VP of Research (snapshot 2020-12-29); departure announced 2020-12-29                   |
| T16 | PhD student        | Claim page · evidence (deep landing) | For the claim that OpenAI LP was controlled by the nonprofit's board in 2019: source, place in it, checked by whom? | `/claim/cs-openai-lp-board-control-2019`                                               |
| T17 | PhD student        | Ideas · export                       | Download a research starter for Yudkowsky's arguments that lists the original sources.                              | Collection page, "Download research starter" → Markdown                                |
| T18 | Curious newcomer   | About                                | Has a person checked these records? What does "machine-checked" mean?                                               | About & method, "What the labels mean"                                                 |
| T19 | Historian of AI    | Institutions · guided reading        | Who co-founded Anthropic, according to the record, and how firm is each credit?                                     | `/question/anthropic-formation`                                                        |
| T20 | Policy researcher  | Search · document                    | When did Anthropic announce its Frontier Compliance Framework, and what did it say the framework is for?            | 19 December 2025; compliance framework for SB 53 and other requirements                |

Deep landings: T01 `/document/eu-ai-act-2024`, T02 `/dossier/openai`, T03
`/document/california-sb-53`, T04 `/document/rsp-v2-0`, T05 `/search`, T06
`/dossier/deepseek`, T07 `/person/eliezer-yudkowsky`, T08
`/document/good-1965`, T09 `/person/walter-s-buckingham`, T10
`/document/fsf-v3-1`, T11 `/document/rsp-v2-2`, T12
`/document/gpai-code-of-practice-2025`, T13 `/person/liang-wenfeng`, T14 and
T19 `/dossier/anthropic`, T15 `/person/dario-amodei`, T16 the claim page, T17
`/propositions/yudkowsky-arguments`, T18 `/claim/dario-anthropic-2021`, T20
`/document/anthropic-frontier-compliance-framework`.

## Results before the fixes

Clicks are desktop / phone (the same path on both unless noted). "Depth" is
how far down the final page the answer sits, desktop / phone.

| #   | From the start page: path                                                | Clicks | Depth (px)      | Rating                | Deep landing (JS)                     | Deep landing (no JS)        | Misleads read alone? |
| --- | ------------------------------------------------------------------------ | ------ | --------------- | --------------------- | ------------------------------------- | --------------------------- | -------------------- |
| T01 | Guide question → contents "European Union" → open "What the text states" | 3      | 13,600 / 20,500 | Found with difficulty | Found                                 | Found                       | Yes, see below       |
| T02 | "Who controlled OpenAI, and when?"                                       | 1      | 2,900 / 4,400   | Found                 | Not found (no link to control page)   | Not found                   | No                   |
| T03 | Guide question → contents "United States: states"                        | 2      | 7,900 / 12,400  | Found                 | Found with difficulty (label)         | Found with difficulty       | Mildly, on landing   |
| T04 | Search → "AI R&D"                                                        | 2      | 4,300 / 5,300   | Found with difficulty | Found with difficulty (panel only)    | Not found                   | Yes, see below       |
| T05 | Search → "AGI"                                                           | 2      | 900 / 800       | Found with difficulty | (same as start)                       | Not found (search needs JS) | Yes, see below       |
| T06 | "What is not covered →"                                                  | 1      | 1,900 / 2,900   | Found with difficulty | Not found                             | Not found                   | Yes, see below       |
| T07 | Ideas question → contents "Y22"                                          | 2      | 39,600 / 57,300 | Found                 | Found with difficulty (no jump)       | Found (no jump)             | No                   |
| T08 | Ideas question                                                           | 1      | 1,800 / 2,900   | Found                 | Found with difficulty (no "earliest") | Found with difficulty       | No                   |
| T09 | Ideas question                                                           | 1      | 19,200 / 30,300 | Found with difficulty | Found                                 | Found                       | No                   |
| T10 | Governance question                                                      | 1      | 1,800 / 2,400   | Found                 | Found                                 | Found                       | No                   |
| T11 | Governance → "Read the document histories"                               | 2      | 800 / 1,000     | Found                 | Found                                 | Found                       | No                   |
| T12 | Governance → "Read external commitments and obligations"                 | 2      | 11,500 / 15,800 | Found                 | Found                                 | Found                       | No                   |
| T13 | "What do the records show about DeepSeek?"                               | 1      | 1,000 / 1,700   | Found                 | Found                                 | Found                       | Mildly (relation)    |
| T14 | Governance → "Anthropic's control structure, 2021–2026"                  | 2      | 6,300 / 9,300   | Found                 | Found with difficulty (folded year)   | Found with difficulty       | No                   |
| T15 | Institutions & people → People A–Z "Dario Amodei"                        | 2      | 700 / 900       | Found                 | Found                                 | Found                       | No                   |
| T16 | "Who controlled OpenAI…" → inspect the 2019 control record               | 2      | 700 / 1,100     | Found                 | Found with difficulty (phone)         | Found (wrong heading)       | No                   |
| T17 | Ideas question → "Download research starter" → "Download Markdown"       | 3      | 700 / 1,000     | Found                 | Found                                 | n/a (download needs JS)     | No                   |
| T18 | "What this means →" in the header                                        | 1      | 3,600 / 5,600   | Found                 | Found (1 click)                       | Found (link works)          | No                   |
| T19 | Institutions question                                                    | 1      | 1,500 / 2,100   | Found                 | Found                                 | Found                       | No                   |
| T20 | Search → "Frontier Compliance Framework"                                 | 2      | 900 / 800       | Found                 | Found                                 | Found                       | No                   |

From the start page: 15 found, 5 found with difficulty, 0 not found. From
a deep landing (JS): 12 found, 6 found with difficulty, 2 not found.
Without JavaScript, not one pre-rendered page linked to a claim page: every
"Inspect claim & evidence" control is a button that does nothing until the
page runs, so a crawler or a reader with scripts off reached a claim's
evidence only through the sitemap.

## Per-task findings (before)

**T01 EU AI Act.** The guide's contents list is a set of buttons: the EU
section cannot be linked to, and without scripts the list does nothing. The
36 provisions are folded under "What the text states". The duties are clear
(Art. 53(1)(a)–(d); Art. 55 for systemic risk). The date is not: the first
dated row reads "General date of application: 2 August 2026" (filed as a
"Threshold or trigger"), and the date that applies to these providers
appears only as an "Exception" row, "Chapters III (Section 4), V, VII and
XII and Article 78 apply from 2 August 2025", which a reader must know is
the chapter on general-purpose models. The timeline shows the Act only at
2024-08-01 (entry into force). Read alone, the section invites "from 2026"
or "from August 2024". The Commission guidelines further down state "obligations
apply from 2 August 2025" in plain words.

**T02 OpenAI in 2019.** The start page's featured question answers it on
the first screen of the control page, with "Announced" (the March 2019
post) and "Effective" (Form 990 snapshot) kept apart. From the OpenAI
dossier there is no link to the control page, and the dossier's 2019 year
shows the LP announcement but not the control right. Its main heading is
"Explore the documentary record".

**T03 SB 53.** The guide lists the eight framework editions that name SB 53,
with the kind of link ("States that it complies with this text"). On SB 53's
own document page the same records sit under "Other recorded relations" with
the heading "explicitly links itself to" above "xAI's Frontier Artificial
Intelligence Framework … states that the FAIF complies with…": read
quickly, SB 53 links itself to xAI.

**T04 AI R&D threshold.** Search for "AI R&D" puts the RSP v2.0 comparison
passage ("The edition's Autonomous AI R&D Capability Threshold…",
2024-10-15) first among evidence passages, but nothing says that no earlier
Anthropic edition has one; the reader must check v1.0 (whose "autonomy" cell
is autonomous replication). The document-history grid tracks "Automated
R&D threshold" only from v3.0, with dashes before it, and the v2.1
changelog row says v2.1 "separates AI R&D thresholds". A reader of the grid
alone would answer v3.0 (2026), which is wrong. The v2.0 document page
lists the comparison question as "RSP · v2.0 states a provision on the
comparison question 'Autonomy, self-improvement or AI research and
development'", which says that it states something but not what.

**T05 AGI.** Search answers quickly, but the list is ordered by match
quality, then date, and the page says nothing about order. Here the
earliest passage happened to rank first. A claim from 2000-07-09 matches
"AGI" only because its qualification quotes a 2006 message, so a date-sorted
claim list would mislead in the other direction. There is no way to sort by
date. Without scripts the search page is an empty form.

**T06 China gaps.** "What is not covered →" gives the general gaps
(frameworks followed, capabilities, chip export controls, most developers).
Nothing China-specific. The China-specific limits are scattered: the guide's
"Not covered" (GB 45438's scope held; TC260's framework and Chinese
developers' own frameworks are outside that page), the "Chinese AI
histories" set of seven dossiers on the Institutions hub. A newcomer could
reasonably conclude that China is covered like the US labs. The DeepSeek
dossier, as a landing page, says nothing about scope beyond its own records.

**T07 Yudkowsky.** Clear and well qualified ("records an explicit
reversal"). The contents list jumps to Y22; without it the answer is 40,000
px down on a desktop and 57,000 px on a phone. From his person page,
"Appears in" leads to the collection, but the reader lands at the top.

**T08 Good 1965.** The collection headlines the earliest located text with
the "How we searched" scope. Good's document page lists the same records
under "Articulates" but does not say that the collection names it earliest
located; the reader must follow "Appears in".

**T09 Buckingham.** Answer present and qualified by tier, but 19,000 px down
(30,000 on a phone); the reader must know to use the contents list or find
in page. Buckingham's person page answers it at once.

**T10–T12.** Found as asked. The commitments page puts the GPAI Code's
"stated refusals (1)" at 11,500 px; the contents list (buttons) jumps there.

**T13 DeepSeek.** "Liang Wenfeng publicly identified High-Flyer as one of
DeepSeek's financial backers", with "No amount, instrument, equity share…
is established" folded under "Qualification and date notes". The route line
reads "High-Flyer → announced investment in → DeepSeek": the relation label
is stronger than the statement.

**T14 LTBT majority.** Found on the control page. From the Anthropic dossier
the 2026 board record is in a folded year and there is no link to the
control page.

**T15, T17–T20.** Found as asked. T17's Markdown starter downloads at once
and begins with the original sources.

**T16 claim landing.** The claim page's main heading is "Explore the
documentary record". On a phone the page opens with the explorer's name
search, topics, institutions, year filter and record list; the claim itself
starts about 2,100 px down. Without scripts the text is all there (statement,
qualification, locator, source, review state).

## Blind reader

A separate agent with a fresh context, given only the address of the
frozen before-build and five of the tasks (T01, T04, T05, T06, T16), worked
them blind at both widths. It did not see this note or the scripted paths.

| #   | Its path                                                             | Its rating            | Mine                  | Agreement                                      |
| --- | -------------------------------------------------------------------- | --------------------- | --------------------- | ---------------------------------------------- |
| T01 | Governance → frameworks and law → EU AI Act document page (3 clicks) | Found with difficulty | Found with difficulty | Same; same misleading 2 August 2026 row        |
| T04 | Document histories → saw the grid say v3.0 → search → compare (4–5)  | Found with difficulty | Found with difficulty | Same; it was misled by the grid first          |
| T05 | Start-page search "AGI" (1)                                          | Found                 | Found with difficulty | It assumed date order; the list is not in it   |
| T06 | "What is not covered →", then the guide's China section (4+)         | Found with difficulty | Found with difficulty | Same; "no single China statement"              |
| T16 | Claim page, scripts off then on                                      | Found                 | Found with difficulty | Same facts; it noted the explorer chrome first |

Its answers were correct in all five, including v2.0 (2024-10-15) for T04
and 2 August 2025 for T01. It ranked the RSP grid (T04) and the EU AI Act's
provision order (T01) as the problems that hurt most, then the missing China
statement, page length on the phone, and the claim page's explorer frame.
Two things it saw that the scripted runs did not: the compare page's edition
selector does not change the address, so a chosen comparison cannot be
linked; and, on a claim panel, "Supporting evidence: primary · 1 source"
above three passages from that one source reads at first as a mismatch.
Its one disagreement with me is instructive: it took the search list for
date order because the first result was the oldest. That is the
misreading the rating anticipated.

## Problems, ranked by the number of tasks they affect

1. **Claim controls have no address** (11 tasks: T01, T03, T04, T10–T14,
   T16, T19, T20). Every answer that needs its evidence passage is reached
   through a button. No pre-rendered page links to a claim page, a reader
   cannot open a claim in a new tab, and a crawler cannot follow a record
   to its evidence. Interface.
2. **The page heading is the explorer's on claim and dossier pages**, and a
   claim page on a phone starts with the explorer (6 tasks: T02, T06, T14,
   T16, T18, T19). Interface.
3. **Long pages whose contents lists cannot be linked to or used without
   scripts** (5 tasks: T01, T03, T07, T09, T12). Navigation.
4. **Record pages describe a relation without its content or direction**:
   comparison cells as "states a provision on the comparison question …",
   and relations recorded from another document under that document's verb
   (2 tasks: T03, T04). Labelling.
5. **Dossiers do not link to the institution's control-structure page** (2
   tasks: T02, T14). Navigation.
6. **Search cannot list results by date and does not say how it orders
   them** (2 tasks: T04, T05). Findability.
7. **Answers that need knowledge the page does not give**: "Chapter V" not
   glossed and no 2 August 2025 on the timeline (T01); AI R&D tracked in the
   grid only from v3.0 (T04); the "announced investment in" label (T13).
   Data and editorial.
8. **No China scope note** (T06). Editorial.
9. **Document pages do not say when a collection names the document
   earliest located** (T08). Interface; not fixed here.

Fixes for 1 to 6 follow below. 7 and 8 are listed under "Decisions for the
maintainer".

## Fixes

1. **Claim controls are links** (problem 1). Every row and inspect control
   that opens one claim (`ClaimLink`, `src/ui/NavLink.tsx`) is now an
   `<a href="/claim/<id>">` with the role of a toggle button: a plain click,
   Enter or Space opens the claim panel in place as before and reports
   `aria-pressed`; a middle click or a modified click opens the claim page;
   a page read without scripts follows the link. A click before the page
   runs is held and repeated, as for buttons. This is the follow-up from the
   pre-rendering review ("record pages do not link to claim pages").
2. **A claim page of its own** (problem 2). `/claim/<id>` now opens a
   reading page (`src/ui/ClaimPage.tsx`): the statement as `<h1>`, its date,
   derivation and resolution above it, "What it connects" with links to the
   records, "Where it appears" with a link to each collection that holds it
   (which opens there with the claim open at its row), and a way into the
   explorer. The claim panel sits beside it, below it on a phone, without
   repeating the statement. Selecting a claim inside the explorer still
   keeps the explorer.
3. **A dossier's name is its page heading** (problem 2). On a dossier or a
   record's direct connections the explorer heading is the `<h1>`; the
   explorer's own title stays, unchanged in look, as text.
4. **Contents lists are fragment links** (problem 3) on the guided reading,
   commitments, question and propositions pages (`SectionLink`). A plain
   click still moves focus to the heading without changing the address; the
   link can be copied, and works without scripts.
5. **Record pages say what and from whom** (problem 4). A document page's
   comparison questions show each cell's quote or paraphrase with its
   place, and a relation recorded from another document reads from that
   document ("xAI Frontier Artificial Intelligence Framework — December 2025
   edition explicitly links itself to this document").
6. **Dossiers link to control structures** (problem 5): "OpenAI's control
   structure, 2015–2026: who held which control right, and when →", and
   the same for Anthropic.
7. **Search can order by date** (problem 6): "Order: Closest matches first /
   Earliest first". The help line says which order is in use, and for date
   order: "Evidence passages hold the sources' own words; a claim can match
   on Selekoa's wording alone. The earliest result is the earliest in these
   records, not a first use."
8. The CPU-bound atlas layout test in `src/ui/mapGrammar.test.ts` has a
   90-second timeout with a comment (it lays out the whole dataset four
   times; about 20 s in full parallel runs).

Not changed: problem 9 (document pages do not show an "earliest located"
mark from a collection) needs a small design decision on where the mark
goes; it is listed under next steps.

## Results after the fixes

Same paths, same build steps, same widths. All before figures are from the
frozen before-build.

| #   | Start: before → after                         | Deep landing (JS): before → after             | No JS: claim links on the landing page | Notes after                                                     |
| --- | --------------------------------------------- | --------------------------------------------- | -------------------------------------- | --------------------------------------------------------------- |
| T01 | Found with difficulty → Found with difficulty | Found → Found                                 | 0 → 39                                 | Contents link works; the date problem is data (decision 1)      |
| T02 | Found → Found                                 | Not found → Found (1 click)                   | 0 → 159                                | Dossier links to the control page; `<h1>` OpenAI                |
| T03 | Found → Found                                 | Found with difficulty → Found                 | 0 → 28                                 | Relation reads from the framework                               |
| T04 | Found with difficulty → Found with difficulty | Found with difficulty → Found with difficulty | 0 → 42                                 | v2.0 page now shows the threshold; "earliest" still needs v1.0  |
| T05 | Found with difficulty → Found                 | Same as start                                 | n/a                                    | "Earliest first" and what it shows                              |
| T06 | Found with difficulty → Found with difficulty | Not found → Not found                         | 0 → 8                                  | Editorial (decision 2)                                          |
| T07 | Found → Found                                 | Found with difficulty → Found with difficulty | 0 → 132                                | Page length unchanged                                           |
| T08 | Found → Found                                 | Found with difficulty → Found with difficulty | 0 → 11                                 | Problem 9, not fixed                                            |
| T09 | Found with difficulty → Found with difficulty | Found → Found                                 | 0 → 1                                  | Page length unchanged                                           |
| T10 | Found → Found                                 | Found → Found                                 | 0 → 36                                 |                                                                 |
| T11 | Found → Found                                 | Found → Found                                 | 0 → 39                                 |                                                                 |
| T12 | Found → Found                                 | Found → Found                                 | 0 → 31                                 |                                                                 |
| T13 | Found → Found                                 | Found → Found                                 | 0 → 7                                  | Relation label is data (decision 4)                             |
| T14 | Found → Found                                 | Found with difficulty → Found (1 click)       | 0 → 128                                | Dossier links to the control page                               |
| T15 | Found → Found                                 | Found → Found                                 | 0 → 14                                 |                                                                 |
| T16 | Found → Found                                 | Found with difficulty → Found                 | claim page (none needed)               | `<h1>` is the statement; on a phone the claim is the first text |
| T17 | Found → Found                                 | Found → Found                                 | 0 → 278                                |                                                                 |
| T18 | Found → Found                                 | Found → Found                                 | claim page                             |                                                                 |
| T19 | Found → Found                                 | Found → Found                                 | 0 → 128                                |                                                                 |
| T20 | Found → Found                                 | Found → Found                                 | 0 → 3                                  |                                                                 |

**Totals.** From the start page: 15 found and 5 with difficulty before; 16
and 4 after. From a deep landing: 12 found, 6 with difficulty and 2 not
found before; 16, 3 and 1 after. Without scripts, every record page now
links to its claims: none did before. Click counts on the start paths are
unchanged; the gains are on landing pages, where readers from a search
engine arrive. On the claim page at 390 px the claim's statement is now the
first text under the header; before, it began about 2,100 px down. The
remaining "with difficulty" ratings are T01, T04 and T06 (data and
editorial decisions below), T07 and T09 (very long collection pages) and
T08 (problem 9).

No console errors in any after run. Two after runs (T09 desktop, T10 phone)
caught the page still showing "Loading the page…" after 1.2 s while the unit
suite was running on the same machine; both passed when re-run alone.

## What the changed pages look like

Inspected in Chromium at 1440 and 390 px, light theme, on the after-build;
no horizontal scroll and no console error on any of them.

- **Claim page, desktop.** The eyebrow "Claim · 2019-03-11 · announcement ·
  Stated in source · Supported", the statement as a serif heading at section
  size, a one-line note on the panel, then "What it connects" and "Where it
  appears" as small labelled sections; the panel is docked on the right as
  on other reading pages, its statement visually hidden.
- **Claim page, phone.** The heading starts directly under the site status
  line; the two short sections follow, then the panel. The page opens at
  the top (it used to scroll to the panel).
- **OpenAI dossier.** Looks as before; the dossier's name is now the `<h1>`
  and the control-structure link sits above "Institutional dossier".
- **RSP v2.0 document page.** Each comparison question now carries its
  paraphrase in the serif excerpt style of provision rows, with its page
  and section in small muted type.
- **SB 53 document page.** The relation headings read "xAI Frontier
  Artificial Intelligence Framework — December 2025 edition explicitly links
  itself to this document" and so on.
- **Search, phone.** "Order" sits beside "Whole words only"; the help line
  grows by two sentences in date order.
- **Guided reading, phone.** The contents list looks the same; the items are
  links.

## Decisions for the maintainer

1. **EU AI Act: the date the general-purpose model duties apply** (T01).
   The section lists "General date of application: 2 August 2026" as a
   threshold and the 2 August 2025 date only as an "Exception" naming
   "Chapter V"; the timeline has no 2025-08-02 entry. _Recommended:_ add a
   dated record (Art. 113(b)) to the timeline, "Chapter V (general-purpose
   AI models) applies from 2025-08-02", gloss "Chapter V" in that
   provision's label, and file the general application date as a date
   rather than a threshold.
2. **A China scope note** (T06). _Recommended:_ one paragraph under
   "Chinese AI histories" on the Institutions hub and in About's "Not yet
   covered": the seven dossiers and three governance texts are what is
   covered; Chinese developers' own frameworks are on their document pages
   only; TC260's framework is outside the frameworks-and-law page; GB 45438's
   scope is held; export controls are not covered. Editorial text, so a
   maintainer decision.
3. **The RSP grid's AI R&D row** (T04). The tracked provision starts at v3.0;
   v2.0–v2.2 have an "Autonomous AI R&D" threshold that the grid shows as a
   dash. _Recommended:_ key the v2.0–v2.2 thresholds to the same provision
   (as the policy-change row already does across renamed wordings) in a
   data patch with a cross-family check, or add a row note until then.
4. **"announced investment in" for a stated financial backer** (T13).
   _Recommended:_ keep the predicate but have the record's route show
   "named as a financial backer of" where the statement says only that, or
   accept the current label with its qualification; a data decision.
5. **Comparison links.** The compare page's edition selector does not
   change the address (blind reader). _Recommended:_ add `?edition=` to the
   compare address in a later interface change.

## Next steps

- Problem 9: show "Earliest located in <collection>" on a document page's
  rows where a collection headlines the document.
- The very long collection pages (T07, T09: 50,000–83,000 px on a phone).
  The contents links help; collapsing each proposition's records by default
  on phones would help more and needs a design decision.

## Checks

- `pnpm -s check` (format, lint, typecheck, 67 unit test files / 643 tests,
  build of 4,017 pages): passed.
- `pnpm -s check:privacy`: passed.
- New browser spec `tests/browser/reader-tasks.spec.ts` (8 tests: claim page
  at both widths, claim links with and without scripts, Space on a claim
  link, section links, dossier heading and control link, search date
  order): passed. Six existing specs updated for the new headings, the
  claim page and the link rows.
- Full browser suite through an untracked Playwright config without the
  Edge channel (deleted afterwards). First full run: 203 passed, 14 failed.
  The failures came from the change to links: further controls for a claim
  (a "Records:" link, a dossier's connection evidence) had gained the row
  marker `data-claim-id`, so specs found two elements for one claim; two
  rows had lost their own `data-*` attributes; search focused only buttons
  on Enter. After the fix those seven spec files passed (49 tests). Final
  full run: 217 passed (19.1 min).
