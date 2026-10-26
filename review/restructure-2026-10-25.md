# Restructure: three topic hubs, one search, one status line (2026-10-25)

Implements the structure proposal in
[`docs/fresh-eyes-2026-10-14.md`](../docs/fresh-eyes-2026-10-14.md), approved
by the maintainer. Branch `restructure`; no pull request opened. Interface and
reader-facing text only: no dataset record, schema, release or
`site.config.json` switch was changed.

## Open questions for the maintainer

1. **Hub card example questions.** The proposal's wireframe used "When was the
   treacherous turn first argued?" and "Who founded Anthropic?". The first
   uses "first" (the policy says "earliest located"), and neither has a page
   that answers it directly. The cards use questions that an existing page
   answers instead (listed under "Hub card questions" below). Replace them if
   you prefer others.
2. **"Ideas & lineages" topic in the explorer.** The proposal suggests renaming
   it "Citations and authorship" or dropping it once Ideas & debates exists.
   It is unchanged here, because the topic is a dataset value shared with
   exports and search filters. Decide whether to rename the reader label only.
3. **Header status line wording.** The old line ended "Read the original
   source before you rely on a claim." The new line follows the proposal
   ("Research preview · records found and checked by machines, not yet
   reviewed by an editor · What this means →"); the instruction to read the
   original source now sits on the About page and in the opening sentence
   ("for you to verify"). Say if you want it back in the header.
4. **"Start with a question" section and the cross-lab "Compare a provision"
   view and claim-panel overlay** from the proposal's wireframes are not
   built. The task named four start-page parts, and the proposal itself says
   the comparison and the overlay need their own decisions.

## What changed

- **Header.** Five items: Governance, Ideas & debates, Institutions & people,
  Search, About & method. The wordmark opens the start page (the "Start" item
  is gone). The tagline next to the wordmark reads "A documentary history of
  machine intelligence." The "Research preview" badge is folded into the one
  status line under the header: "Research preview · records found and
  checked by machines, not yet reviewed by an editor · What this means →",
  which opens "How this was checked" on the About page.
- **Hub pages** at `#/governance`, `#/ideas` and `#/institutions`. Each holds
  the entries that used to sit on the start page, unchanged in wording:
  - Governance: the frontier safety framework histories, control structures,
    external commitments and laws, and the 2023–2026 research question.
  - Ideas & debates: the three proposition collections (superintelligence,
    Yudkowsky's arguments, economics).
  - Institutions & people: the institutional dossiers (including the Chinese
    AI histories), the Anthropic guided reading and People A–Z.
- **Start page.** The opening sentence (exact wording as approved) as the
  page heading, a large search box, a "What's covered" row of three hub cards
  with two or three example questions each, a "Not yet covered" section, and
  the computed coverage line. "How to read a claim", "What Selekoa does not
  claim", the People A–Z list and the dossier lists left the start page; the
  first two already exist on the About page, the lists are on Institutions &
  people.
- **Search with views.** The Search page has a List / Timeline / Map switch
  under the result count. Timeline and Map open the explorer limited to the
  search's matches, with a line naming the search and buttons back to the
  list or to all records. The address is `#/explore?q=…` (plus
  `&view=timeline` for the timeline). Without a search they show all records,
  as the explorer did before.
- **Header highlighting.** Collection pages light up their hub: document
  histories, control, commitments and research questions under Governance;
  proposition pages under Ideas & debates; dossiers, guided reading and person
  pages under Institutions & people; the explorer under Search.
- **Review status per record.** The Evidence Inspector's status chips now
  start with the review status in plain words: "Machine-checked, not reviewed
  by an editor" for the default, "Not editorially accepted · human-reviewed
  evidence" or "Editorially accepted" (with "· human-reviewed evidence" where
  it applies) for the exceptions. "Supported" follows it.
- **Version display.** The footer no longer shows "version 0.x, a work in
  progress"; it keeps the dataset release number, which citations need.
  Collection pages had already dropped "(version N)".
- **About page.** Under "What it does not claim", Completeness: "The topics,
  people and documents covered so far follow the maintainer's research
  interests, so the site reads in part as a research diary."
- **Title and meta.** Title unchanged ("Selekoa · A documentary history of
  machine intelligence"); the meta description now opens with the tagline.

## Old addresses

All existing addresses keep working: `#/explore` and `#explorer` (the
explorer, now under Search), `#/documents/…`, `#/control/…`,
`#/commitments/…`, `#/propositions/…`, `#/dossier/…`, `#/person/…`,
`#/document/…`, `#/claim/…`, `#/question/…`, `#/reading/…` and
`#/search?…`. No address was renamed, so no redirect was needed. The new hub
addresses are additions.

## Choices made where the proposal was open

| Point                     | Chosen                                                                              | Why                                                                                     | Rejected                                                                                        |
| ------------------------- | ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Hubs                      | New pages listing the existing entries, unchanged                                   | Simplest; no collection page moves or changes address                                   | Merging collection pages into hub pages; new hub-specific prose                                 |
| Merge Explore into Search | Explorer stays as the timeline/map view of Search, filtered to the search's matches | Gives "views of the same results" without rebuilding the explorer; old links still work | Removing the explorer; embedding map and timeline inside the Search page                        |
| What a map/timeline shows | Claims that match, claims of matching passages, and claims about matching records   | The same records the list shows, as far as they are claims                              | Applying Search's type/collection/year filters too (not carried over; the explorer has its own) |
| Start page heading        | The opening sentence is the `h1`                                                    | The task fixes the sentence; the tagline sits in the header and the title               | Tagline as `h1` with the sentence below (two competing statements)                              |
| "Start with a question"   | Not added; the hub cards carry the example questions                                | The task lists four start-page parts; avoids repeating the same links                   | A separate question list                                                                        |
| "Start" header item       | Removed; the wordmark is the way home                                               | The approved list has five items                                                        | Six items                                                                                       |
| Per-record label          | Shown in the Evidence Inspector, first in the status chips                          | That is where each claim's status is read; lists mark only exceptions as before         | A chip on every list row (repeats the header line hundreds of times)                            |
| "version N"               | Removed "version 0.x" from the footer; kept it in About's "Publication" note        | The footer repeated it on every page; About explains what the version means             | Removing the release number (needed for citation)                                               |

## Hub card questions

Each links to the page that answers it.

- Governance: "How did each developer's safety framework change between
  editions?" (document histories); "Who has controlled OpenAI, and through
  which instrument?" (OpenAI control structure); the 2023–2026 research
  question, in its own wording.
- Ideas & debates: "Which text is the earliest located for each proposition
  about superintelligence?"; "Which of his earlier views did Eliezer
  Yudkowsky later contest?"; "How did economists take up explosive growth and
  risk from AI?" (the three proposition collections).
- Institutions & people: the Anthropic guided reading's question, in its own
  wording; "What do the records show about DeepSeek?" (the first Chinese AI
  history dossier).

## Checks

All run in the cloud container on the final branch state, against the
production build (`pnpm build`, `pnpm preview`).

| Check                                           | Result                                                                                                                                                                                                                                            |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm install --frozen-lockfile`                | OK                                                                                                                                                                                                                                                |
| `pnpm -s check`                                 | Passed: format, lint, types, 507 unit tests in 58 files, build                                                                                                                                                                                    |
| `pnpm -s check:privacy`                         | Passed                                                                                                                                                                                                                                            |
| Browser suite (`pnpm test:browser`)             | 148 tests: 147 passed on the full run; the one failure expected the old header wording, was updated, and its file (with the start-page, search and header files) passed on re-run. Run with installed Chromium, not Edge (see below)              |
| Axe (WCAG 2 A/AA, 2.1 AA)                       | 0 violations on 16 page types (start, three hubs, search with and without a query, timeline and map of a search, old explorer address, About, document history, control, propositions, dossier, person, claim) × 1440 and 390 px × light and dark |
| Phone width and themes                          | No horizontal overflow on those 16 pages at 390 px or 1440 px in either theme; the theme followed the system setting on every page; all five header items wrap onto the second header row on a phone and stay on screen                           |
| Console                                         | No application errors or warnings. The only messages were headless-GPU performance notices from the map canvas ("GPU stall due to ReadPixels")                                                                                                    |
| In-app links                                    | Every button on the start page and the three hubs (270) opens a page without the "does not match any record" notice or a console error; the old addresses listed above all resolve                                                                |
| External links (`node scripts/check-links.mjs`) | 942 source URLs: 637 ok, 27 redirect, 255 blocked (bot walls, 403), 7 server error, 1 timeout, 7 client error, 8 dead domain. Unchanged by this branch (no data edited); listed below for a separate task                                         |

Browser tests: `playwright.config.ts` selects installed Edge, which this
container does not have. The suite ran with an untracked copy of the config
without the `channel` line, so it used the pre-installed Chromium. Nothing
was installed.

Tests changed because they encoded the old menu or start page (no test was
skipped or weakened):

- `reading-first`: the start-page test now expects the opening sentence, the
  title, the search box, three hub cards and "Not yet covered", and follows
  the search box to the list and then the map of the results; the header
  link is "What this means →"; People A–Z is checked on Institutions & people;
  document histories open from Governance.
- `history-navigation`: Back and Forward now run start → Governance →
  frameworks → Search → map → person page.
- `quick-wins`: five header items instead of six; "Not yet covered" is a
  heading; document histories open from Governance.
- `search`, `control`, `commitments`, `question-starter`, `propositions`,
  `record-pages`: open their pages from the hub that now holds the entry, or
  expect the new start-page heading.
- Eleven explorer specs: lookups of the explorer's left-hand list are scoped
  to its navigation ("Explore the dataset"), because the header now has a
  "Governance" item and "Institutions & people", which unscoped lookups also
  matched.
- `Inspector.test.ts`: the review chip reads "Machine-checked, not reviewed
  by an editor", and "Editorially accepted · human-reviewed evidence" for the
  exception.

### External link failures (for a separate data task)

Client errors and dead domains, all on canonical URLs of source records:

- Dead domains, historical sites: `hanson.berkeley.edu` (2 URLs),
  `singinst.org` (5 CFAI pages), `www.singinst.org/AIRisk.pdf`.
- 404: `sysopmind.com` (2), `aleph.se` singularity text, `foresight.org`
  Engines of Creation chapters (3).
- 404, current document: the xAI Frontier Artificial Intelligence Framework
  PDF of 30 June 2026 (`source-faif-2026`). The record already holds a
  Wayback copy captured 2026-07-16; only the live address returns 404.

The full result is in `review/.local/` (ignored by Git).
