# Model cards compared: the page, 2026-11-05

Branch `model-cards-page` from `origin/main` at `790d9bf` (v0.27.0), merged
with `origin/main` at `8f002ea` (v0.28.0, antecedent texts) before the
release, and again at `50ed58e` (v0.28.1, laws compared, part 1), after
which v0.29.0 was re-cut. Specification: the planning thread's brief of 2026-11-04, after
[`model-cards-admission-2-2026-11-04.md`](model-cards-admission-2-2026-11-04.md)
("Budgets", "What the page session needs") and
[`model-cards-pack-2026-11-02.md`](model-cards-pack-2026-11-02.md) ("How this
becomes a collection and a page"). No data record changed. Release v0.29.0
registers the collection. No deploy setting, limit or licence changed.
Screenshots were taken outside the repository and are not committed.

## What was built

- **`/compare/model-cards`.** A table on the first screen: the 20 cards as
  rows, grouped by developer (alphabetical) and in the frame's order (card
  date) within each, and the 16 questions as columns, headed with their
  numbers (`Q01`–`Q16`), since criteria cite other questions by number. Each
  cell is a button showing its status; selecting it opens a row below with
  the question, the quotations with their locators and the cell's own note
  (`cardCellNote`). A recorded absence shows what was read, the terms
  searched and the passages set aside, read from its stored reasoning
  (`cardSearchRecord`); a question that does not arise shows its reason.
  "Inspect sources and checks ↗" opens the claim in the drawer, as in
  Compare frameworks. Close returns focus to the cell.
- **Header and controls**, on the pattern of Compare frameworks: eyebrow,
  title, one scope line, the question and introduction; "All questions" /
  "One question", a developer filter, Copy link, "Download every cell as
  CSV". Collapsed "What the statuses mean" (the four legend entries and the
  shared standing sentence, stated once), "Limits of this comparison" and
  "How we searched", all from the collection definition.
- **Developer filter**, kept in the address (`?developer=openai`), checked
  by the resolver against the six developers (`cardDevelopers`, tested
  against the records).
- **List equivalent.** A collapsed "Every cell as a list, card by card"
  below the table: every card with every question's status, quotation,
  locator, note, search or reason. Native `<details>`, so it works by
  keyboard and without JavaScript.
- **Phone (390 px).** As Compare frameworks: once the page runs on a narrow
  screen it shows one question at a time; "All questions" gives the table,
  which scrolls inside its own box with the card column fixed. An open
  cell's text is as wide as the visible part of the table.
- **Question pages.** `/compare/model-cards/mc-q01` to `mc-q16`: question,
  criterion, legend, then every card's cell by developer, and links to every
  question. Built as HTML (16 pages), readable without JavaScript.
- **CSV.** `/compare/model-cards.csv`, written by the build beside the page
  (`src/domain/model-cards-csv.ts`), one row per cell (320 rows): `card_id,
developer, card, card_date, card_date_kind, release_date,
framework_edition, question_id, question, status, quotation, locator, note,
search_scope, search_terms, passages_set_aside, source_url, sha256,
date_checked, record`.
- **Links between the comparisons.** A card's row links to each framework
  edition it cites (its `cites` claims to an edition of a compared
  framework), opening Compare frameworks at that edition (`?edition=`).
  Each edition's column (and its entry on a one-question page) in Compare
  frameworks lists "Model cards citing this edition", each opening Model
  cards compared at that developer.
- **Hub.** A "Tool · comparison" entry on Governance, after Compare
  frameworks. Search lists the page among reading pages.
- **Registration.** `{ kind: 'compare', definition: modelCardsFrame }` in
  `applicationCollections`; the "not yet a release collection" test is now
  "is a release collection, registered by its frame" (and checks that
  releases record the whole definition). Deep links (`/compare/model-cards`,
  `/compare/model-cards/<question>`, `?developer=`, `?inspect=<claim>`) and
  `openInCollection` (`openCompare(…, id)`) handle it. Cell buttons carry the
  row marker (`data-claim-id`), so "Appears in" on a claim page opens the
  cell.

## Decisions taken in-branch

1. **Cells are buttons with the text in a row below, not text in the cells.**
   Sixteen columns of quotations do not fit any screen; the comparison's
   17rem columns would make the table about 300 rem wide. The row below keeps
   the card and question in view.
2. **A `cards` view inside the existing `compare` view.** The workspace holds
   which comparison is open (`compareId`); drawer, Escape, scroll return and
   navigation state are shared with Compare frameworks rather than copied.
3. **No `model` column in the CSV.** The data has no model field separate
   from the card; the `card` column holds the card's name. `release_date`
   holds the Q02 cell's quotation, since release dates are recorded only as
   quoted passages; `card_date` follows the card's record (printed and
   revision dates, or the date its cells carry) and `card_date_kind` the
   record's label or date note. "No printed date" never falls back to a
   commit date.
4. **Edition links pass `?edition=` even for the latest edition**, so that
   the link needs no knowledge of which edition is latest on the card's
   page (which its slice may not hold).
5. **Shared code carries only identifiers.** The page's title, question and
   address are in `src/reading/model-cards-page.ts` (the control-timelines
   pattern); question labels and developers in
   `src/domain/model-card-facets.ts`; everything the page reads in
   `src/domain/model-cards-view.ts`, loaded with the page and with Compare
   frameworks. `src/reading/model-cards.ts` (reader text) loads only on the
   page's routes.
6. **Statuses have equal visual weight.** Absences and "Does not apply" are
   in the muted text colour; no colour codes a status as better or worse.

## Open interface choices for the maintainer

1. **Start page.** The page is on the Governance hub only, not in the start
   page's "Ways in" tools (`readerTools`), to keep the start page as it is.
   Recommendation: add it when the next batch of cards is admitted.
   _Quick: OK the recommendation._
2. **Links from an edition to its cards** open the model-cards table filtered
   to the developer, not the card's own row. A row anchor would need the
   address to carry a card. Recommendation: keep. _Quick: OK the
   recommendation._
3. **Short status words in cells** ("Partly", "Not found") with the full
   names in the legend, the accessible names and the opened cell.
   Recommendation: keep. _Quick: OK the recommendation._
4. **"Not cross-family checked" cells** (six, chemical and biological) carry
   that mark only in their notes, as stored. A visible mark in the table
   would be a second status axis. _Needs your judgement._

## Budgets

KB of gzip-9 (1 KB = 1,000 bytes), from `scripts/bundle-budget.ts` in
`pnpm build`. Before: `main` at `8f002ea` (v0.28.0, the figures of
[`prehistory-admission-2026-11-04.md`](prehistory-admission-2026-11-04.md)).
After: this branch at `59d8ef2` (identical to `d916327` except Claim 280.4, Comparison 289.7, Guide 328.0, Propositions 340.5, Year 351.6 and Years index 229.0, from v0.28.1's records). No limit was raised; one page type was added.

| Page type         | Limit | Before | After |
| ----------------- | ----- | ------ | ----- |
| Start page        | 115   | 109.3  | 110.1 |
| Hub               | 295   | 231.5  | 232.9 |
| About & method    | 330   | 317.7  | 237.9 |
| **Search**        | 275   | 274.7  | 255.4 |
| Explorer          | 330   | 270.5  | 271.9 |
| Dossier           | 360   | 320.5  | 321.9 |
| Person            | 295   | 231.6  | 233.0 |
| Document          | 310   | 246.7  | 248.1 |
| Claim             | 325   | 279.0  | 280.5 |
| Collection        | 370   | 304.3  | 305.8 |
| Comparison        | 520   | 285.9  | 289.8 |
| Model cards (new) | 330   | –      | 299.6 |
| Guide             | 630   | 326.1  | 327.7 |
| Compute guide     | 340   | 273.9  | 275.3 |
| Propositions      | 455   | 339.1  | 340.6 |
| Control timelines | 285   | 260.0  | 261.4 |
| By author         | 310   | 285.7  | 287.1 |
| By author index   | 250   | 228.6  | 230.0 |
| Year              | 400   | 349.9  | 351.7 |
| Years index       | 305   | 227.6  | 229.1 |

`dist/`: 12,301 files (budget 15,000); 8,388 pages pre-rendered.

**What was moved.**

- **Search (backlog I8, collection membership).** The search page's facets
  carried every collection's claim IDs (2,632 IDs, 20.4 KB gzip of the 45 KB
  `virtual:search-index` module) only to label a result "In <collection>".
  The filter itself already loaded its own file when used. Each index chunk
  now stores the collections of the claims it shows (`memberOf`, positions in
  the filter's list), so labels arrive with the results; the facets keep each
  collection's ID, label and title. Search's initial weight no longer grows
  with each collection's claims. The identity tests (index against memory,
  every fixed query) pass unchanged.
- **About & method.** `src/ui/release-info.ts` bundled every release's whole
  manifest (each with the dataset's 27,000-character scope) to show the
  latest's version, dates and counts; each release added about 10 KB, and
  after v0.29.0 About stood at 328.0 of 330. The build now serves the latest
  release's summary as `virtual:latest-release`; About's own chunk fell from
  102.9 to 11.6 KB.
- **Shared code.** Registration adds the frame (`model-cards-frame`, 0.5 KB, on
  every workspace page). The start page's entry gains 0.8 KB (question labels,
  the page's title and question, the hub entry and the address rules). A first
  build put the whole domain module in shared code (+1.8 KB on every page,
  including the start page); splitting it as in decision 5 removed that.
- **Comparison** (+3.9 KB): the edition-to-cards links read the cards' names
  and `cites` claims in its slice, and load `model-cards-view`.

## Checks

| Gate                          | Result                                                                                                                                                                                                                                                                                                                       |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm check`                  | Passed at `59d8ef2` (after the second merge and the re-cut): format, lint, types, 948 unit tests (91 files), build with budgets (all within limits; 8,389 pages, 12,303 files); first passed at `d916327` with 946 tests                                                                                                     |
| `pnpm check:privacy`          | Passed (2,296 indexed files)                                                                                                                                                                                                                                                                                                 |
| `pnpm -s validate:data`       | Valid: 2,163 entities, 6,209 claims, 2,042 sources, 8,459 evidence records                                                                                                                                                                                                                                                   |
| `pnpm release 0.29.0 --check` | "v0.29.0 reproduces byte for byte from the data." Against v0.28.1: 1 added (collection `compare/model-cards`), 0 changed, 0 removed; 17 collections. First cut against v0.28.0; after v0.28.1 merged, the `release/CHANGELOG.md` conflict was resolved by taking `main`'s file and re-running `pnpm release`, not by editing |
| `pnpm docs:coverage`          | "docs/development.md coverage is current." (no record changed)                                                                                                                                                                                                                                                               |
| Browser suite                 | 335 passed, 0 failed, twice: at `d916327` (23.1 min) and at `59d8ef2` after the second merge (22.6 min); Playwright's Chromium 1.63.0                                                                                                                                                                                        |
| App and console               | Built app at 1440 and 390 px (model cards table with a cell open, a question page, Compare frameworks, About, Search with a query): no console errors, analytics stubbed as in the specs                                                                                                                                     |

Unit tests added: `src/domain/model-cards.test.ts` (registration, developers,
absence searches, edition links, card dates), `src/domain/model-cards-csv.test.ts`.
`src/prerender/hydration.test.ts` walks `/compare/model-cards` as well.
Browser spec added: `tests/browser/model-cards.spec.ts` (hub link and table,
a cell opening and closing with drawer and Escape, absence search and
not-applicable reason, developer filter in the address, the list
equivalent by keyboard, a question page and the question navigation, the CSV
link and its 320 rows, card-to-edition and edition-to-card links, 1440 and
390 px with axe, and the built pages without JavaScript).

Two problems found by the checks and fixed: a view cached in a `WeakMap`
did not replay its reads into later pages' slices (now `remember`,
`src/domain/memo.ts`), and the `cites` claims, chosen by relation fields
only, never entered Compare frameworks' slice (now marked with `selected`).

### Browser

Run at `d916327`, after the first merge of `main` and the release, and again at `59d8ef2` after the merge of v0.28.1 and the re-cut, on Playwright's Chromium (cloud session; no Edge), from an untracked copy of `playwright.config.ts` without `channel: 'msedge'`, deleted afterwards and never committed. Port 4173 was free before and after (checked by `curl`; no listener). Each run: 335 passed, none failed (23.1 and 22.6 min): the 325 of v0.28.0 and the 10 new specs of `tests/browser/model-cards.spec.ts`. No existing spec needed a change. The app was opened in the same browser on a separate preview port (4180, stopped afterwards); screenshots at 1440 and 390 px were saved outside the repository.
