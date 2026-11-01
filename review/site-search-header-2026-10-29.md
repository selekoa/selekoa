# Search from anywhere, pages in search and three reader fixes (2026-10-29)

Maintainer requests of 29 October 2026, items 1–6, on branch
`site-search-header-2026-10-29` from `main` at `024a6e5`. No data record,
release, `site.config.json` or hosting setting changed. Nothing was deployed.
Follows [the reader tasks of the same day](reader-tasks-2026-10-29.md)
(problem 9 and decision 5).

## What changed

1. **Search from every page** (`src/ui/SiteChrome.tsx`). The header holds a
   search field on every page, start page included: a search form
   (`role="search"`, `aria-label` "Site") with one `type="search"` field (`aria-label` "Search
   the records") and a submit button ("Submit search", a drawn magnifier).
   With scripts, submitting opens `/search#q=…` in place and empties the
   field. Without scripts, or before the page has run, the form is a plain
   `GET /search?q=…`, which the search page already moves to the fragment
   once it runs; a click on the button before then is held and repeated, as
   for other buttons. Up to 720 px the field folds behind a magnifier icon
   (`role="button"`, `aria-expanded`, Space and Enter open it, Escape closes
   it and returns focus to the icon); the field then opens on its own row
   under the wordmark. Without scripts the icon is a link to `/search`.
2. **"Explore the records" in the header.** The menu's "Search" item is
   replaced by the field, and "Explore the records" (`/explore`) is the last
   menu item, directly before the field. It is marked as the current page on
   the explorer, including explorer views of a search. The start page has no
   link to the explorer, so the name is the one the explorer's own panel
   uses ("Explore the records", `src/ui/Inspector.tsx`) and the one this
   request gives. The menu keeps five items.
3. **Pages are searchable** (`searchablePages` in `src/prerender/pages.ts`;
   `createPageIndex` and `searchPages` in `src/domain/search.ts`). The three
   hubs, About & method, the record explorer, the guided reading on
   frameworks and law, the question starter, the Anthropic formation
   reading, both control structures, the document history, the comparison,
   the commitments page and the three propositions collections (16 pages)
   are matched on title, question and summary (introduction, scope or
   coverage) with the records' own rules: every term must match, at the
   start of a word. Titles are the pages' own (`pageMeta`). A "Pages" group
   is listed above the records, with the page kind, title, question and a
   highlighted snippet; the status line counts it ("1 page matches …", "2
   pages and 710 records match “OpenAI”: …"). With "Names and aliases only"
   or any filter, pages are not listed. Apostrophes (' ’ ‘ ‛ ‚ ′ ʼ) are now
   dropped when text is folded, for records and pages alike, so
   "anthropic's", "anthropics", "Anthropic’s" and "ANTHROPIC" match the same
   words. "anthropic's control structure" now returns
   `/control/anthropic` as its one page; before, it returned 0 results. No
   record matches it, which the status line says.
4. **Start-page examples.** The label is "For example" (was "A question the
   records answer:"); after the two links a muted line reads "Two of many
   ways in. The hubs below cover governance, ideas and institutions." The
   `<h1>` tagline is unchanged.
5. **Earliest-located mark** (`earliestMarks` in `src/domain/propositions.ts`).
   A document page lists every headline a propositions collection gives the
   text, worded from the collection's own headlines, each linking to the row
   (`/propositions/<id>?inspect=<claim>`; in place it opens the collection
   with the row's claim open, as "Where it appears" does on claim pages).
   Example, Good 1965: "Earliest located in Propositions about
   superintelligence, 1863–2022 for A1 Intelligence explosion →", "Earliest
   located use of the name “intelligence explosion” in …", and A5. Tiered
   collections say "Earliest located in tier 1 of …", "in tier 2 of …"; a
   contesting headline reads "Earliest located tier-1 text contesting M05 …
   in Economics of machine intelligence". 66 document pages carry at least
   one mark. Nothing says "first". The marks sit under the document's
   description list, before "Copy link to this page", with a thin accent rule
   at the left.
6. **Linkable comparisons.** `/compare/<id>?edition=a,b` lists the editions
   chosen in place of each framework's latest, at most one per framework, in
   column order. Choosing an edition replaces the current address; choosing
   the latest again removes it. "Copy link to this comparison" copies the
   chosen set. The built page is still the default (latest of each
   framework); an `edition` address applies once the page runs, as `facet`
   does. An unknown edition, a document outside the comparison or two
   editions of one framework open the not-found notice. Opening the
   comparison from a menu or link resets the choice.

Docs: `docs/architecture.md` (address table, the header form's `?q=`
fallback, `edition`, search over pages and apostrophes). Search page help:
the intro mentions pages; "How search works" mentions apostrophes.

## Decisions taken here, for review

- **The menu's "Search" item is gone.** With a field on every page the item
  duplicated it. The search page itself still has its own large field, so on
  `/search` the header field and the page's field are both shown; a header
  search there replaces the page's query.
- **The no-scripts form sends the terms in the query string.** A form cannot
  target a fragment. The terms then reach the host's logs, which the
  fragment design otherwise avoids; this happens only with scripts off or a
  submit before the page has run. The alternative, a plain link to
  `/search`, would drop the terms.
- **Narrow desktop.** Between 721 and 1000 px the header wraps as on phones
  (menu on a second row) but keeps the full field. Before this change the
  single-row header already overflowed by 46 px at 721 px; with the new
  link and field it would have overflowed up to 1000 px.
- Pages are not listed under filters or names-only, since they are not
  records.

## Checks

- `pnpm -s check`: format, lint, typecheck, 67 unit test files / 651 tests,
  build of 4,017 pages (dist 125.4 MB, from 120.9 MB: the header form and
  icon on every page). Passed.
- `pnpm -s check:privacy`: passed.
- New unit tests: folding of apostrophes; the page list (every path built,
  unique, hubs, control structures, comparison and guide included); the
  apostrophe query in four spellings, its snippet and field; questions and
  summaries, every term required; record search equal for `Anthropic's`,
  `Anthropic’s` and `Anthropics board`; earliest marks for Good 1965 and
  Buckingham 1955 (tier and contesting wording, the claim listed in the
  collection, no "first") and none for RSP v2.0; compare `edition`
  addresses (round trip, raw comma, two editions of one framework, a
  document outside the comparison, an empty value).
- New browser spec `tests/browser/site-search-header.spec.ts` (13 tests):
  header search on desktop by keyboard (Tab, type, Enter) and the explorer
  link with `aria-current`; the phone icon (open, focus, Escape, Space,
  search, close) with no sideways scroll; the no-scripts form
  (`/search?q=ASL-3`) and phone icon link; the `?q=` to `#q=` move; the
  Pages group and its link for the three apostrophe spellings; pages above
  claims and hidden in names-only; the start-page label and unchanged `<h1>`;
  the earliest mark at 1440 and 390 px opening its row with the claim
  pressed; no mark on RSP v2.0; a compare link that reopens the chosen
  edition and drops it again at the latest. axe (WCAG 2.1 AA) on the header
  at both widths, field open on the phone: no violations.
- Existing specs updated: unscoped `searchbox`/`search` locators now look
  inside `main` (the header adds a second one); the menu's "Search" link is
  replaced by the header's submit button or "Explore the records"; the
  start-page label.
- Full browser suite through an untracked Playwright config without
  `channel: 'msedge'` (deleted afterwards), Playwright's Chromium: 229
  passed, 1 failed (23.3 min). The failure was a spec I had updated: on a
  390 px page it pressed the header's submit button, which is folded behind
  the icon on phones, and timed out. It now follows "Explore the records";
  `quick-wins.spec.ts` then passed alone (13 tests).

## What the pages look like

Chromium, light theme, 1440 × 900 and 390 × 844 (touch), on the production
build. No sideways scroll and no console error other than the blocked
analytics beacon on any page below. Header heights: 77 px from 1001 px up
(unchanged), 87 px from 721 to 1000 px, 121 px at 390 px (two menu rows).

- **Header, desktop.** Wordmark, tagline (not on the start page), the five
  menu items ending in "Explore the records", then a 200 px field with
  "Search" as placeholder and a magnifier button in a thin border, and
  "Dark mode" at the right. Focus draws the focus ring round the whole field.
- **Header, phone.** Wordmark at left; a magnifier icon (40 × 36) and "Dark
  mode" at right; menu on two rows (Governance, Ideas & debates,
  Institutions & people / About & method, Explore the records). The icon
  opens a full-width field under the wordmark, focused, with the keyboard's
  search key; the icon shows as pressed.
- **Search.** "anthropic's control structure": the status line reads "1 page
  matches “anthropic's control structure”. No claim statement or
  qualification, evidence passage or locator, source title, name, alias or
  record ID matches it." The Pages group shows "Control structure" (small,
  muted), "Anthropic’s control structure, 2021–2026" in the serif at 16 px
  with the matched words highlighted, the question under it and "Open the
  page →". On the phone the same, full width.
- **Start page.** "For example" (small capitals) over the two serif links,
  then the muted note at body size; the hub cards follow. On the phone the
  note wraps to two lines.
- **Document page (Good 1965).** Three underlined links under the dates and
  source, set off by a 2 px accent rule; on the phone each wraps to two or
  three lines, still within the column.
- **Compare.** After choosing v1.0 of Anthropic's policy the address gains
  `?edition=rsp-2023`, the summary reads "Editions shown: your choice" and
  the table's first column shows v1.0; reloading that address shows the
  same. On the phone the editions box is folded as before, with the same
  summary.

## Open

- Whether the header field should be left out on `/search` itself.
- Below 360 px the page scrolls sideways, as it did before this change (the
  page is 360 px wide at least); 360 px and up do not.
