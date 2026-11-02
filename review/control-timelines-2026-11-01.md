# Control timelines side by side (2026-11-01)

Roadmap, interface item 4. Branch `control-timelines` from `main` at
`81717f0`. One pre-rendered page, `/control/side-by-side`, that places the
board, ownership and control records of OpenAI, Anthropic, Google DeepMind
and xAI on one year axis. Built only from stored records. No data, release,
export, header or hosting setting changed. Nothing was deployed.

## What the page shows

- **Header.** Title "Control timelines side by side", the question, an
  introduction, the shared status line, "Download the records shown (CSV)"
  and "Copy link to this page".
- **How to read the marks.** A legend: status by fill and line (announced,
  planned or agreed: dashed outline; in effect or completed: solid fill;
  dated record: light fill, grey edge) and precision by shape (dot: a day;
  narrow bar: the month; wide band: the year). It states that proximity on
  the axis connects nothing and why no line is drawn between rows.
- **The axis** (wider than 940 px). One row per organisation, in a fixed
  order, under one year scale (2014–2026, from the earliest to the latest
  record shown). Each mark is a link to its claim (`/claim/<id>`) that opens
  the claim panel: statement, evidence passage (quotation or marked
  paraphrase), source, archive copy and check date. Marks of the same row
  that would overlap are stacked in sub-rows. Every run of empty years in a
  row reads "No control record in this period". The organisation's name
  links to its dossier.
- **Year by year** (940 px and below, the width at which the claim panel
  opens in place). One section per year; in it, each organisation with
  records lists them (date as stored, "year only" or "month only", the
  date's kind, the record's kind, its stage, the statement), then one line:
  "No control record in this period: OpenAI, Anthropic, xAI." No sideways
  scroll. The claim panel opens below the item.
- **Undated records.** Listed apart, never placed on the axis. None of the
  records shown is undated today; the section says so.
- **Where each row comes from.** For OpenAI and Anthropic, a link to the
  control-structure page; for Google DeepMind and xAI, the selection note.
  Then the page's limits.

## Design choices

1. **Address and plumbing.** The page is a `control` page with the reserved
   ID `side-by-side` (`src/reading/control-timelines.ts`,
   `src/reading/control-timelines-page.ts`), so it reuses the control
   pages' address checks, slice path (`/slices/control/side-by-side.json`),
   view and claim panel. Its code is its own (`pageCodeById`,
   `src/ui/ControlTimelines.tsx`). It is in the sitemap (from `pagePaths`)
   and in the search page's list of pages.
2. **Rows.** OpenAI and Anthropic take the entries of their control-structure
   pages (`controlEntries`, split out of `controlStructure` without change of
   behaviour), less provisions and assessments: a provision is the content
   of a governing document dated by it, and an assessment is a later reading,
   not a change. Google DeepMind and xAI have no control-structure page;
   their stored records of the same kinds are named in the definition (three
   and four records). The domain refuses a named record whose predicate is
   not a control-structure kind.
3. **Board rows.** The control-structure pages admitted a role as a board
   role when its text mentioned a board. Two OpenAI staff departures passed
   that test only through their sourcing note ("title from 'OpenAI Board
   Forms Safety and Security Committee'"): `lg-oai-schulman-departure-2024`,
   `lg-oai-weng-departure-2024`. Fixed on this branch by maintainer decision
   (below): the role is tested without its parenthesised note. The fix is in
   `controlEntries`, so the OpenAI control page, its research-starter export,
   the released collection and the timelines all leave the two records out.
4. **Status.** Read only from stored fields
   (`timelineStatus` in `src/domain/control-timelines.ts`): a control stage
   (planned, announced, agreed in principle → announced; effective → in
   effect); else an announced activity stage, an announcement date basis, or
   a predicate that is an announcement by definition (`combined_into`,
   `name_transition_announced`, `departure_announced`) → announced; else an
   effective date basis, or a completed acquisition or conversion as the
   record states it (`acquired`, `converted_into` without an announcement
   basis) → completed; anything else → "Dated record". Most board records
   are snapshots of announcements without a stage; they stay "Dated record"
   rather than being promoted to "announced" by reading their notes.
5. **Dates.** Placed at the stored date and precision: a year is a band over
   the year, a month a bar over the month, a day a dot. An interval with both
   ends would be a bar from start to end; an interval with one end is placed
   at that end and labelled "from …, end not recorded" or "until …, start
   not recorded" (`cs-christiano-anthropic-ltbt-trustee`, placed at
   2024-04). No stored field marks a date as approximate; the one record
   whose note says "early 2014" (`google-acquired-deepmind-2014`) is stored
   to the year and drawn as the 2014 band.
6. **No relations, no ranking.** Nothing is drawn between rows; a unit test
   checks that no record shown names another row's organisation. The page
   gives no per-organisation counts.
7. **Record panel.** Wider than 940 px it opens as a fixed panel at the right
   edge, so the axis keeps the page width; at 940 px and below it opens in
   place below the item, as on the other reading pages. Close returns focus
   to the mark.
8. **Status line.** No shared status component existed on `main`, and the
   branch `prelaunch-interface` was not on the remote. The page uses a new
   `SelectionStatus` component (`src/ui/SelectionStatus.tsx`) that carries
   the other collection pages' current text unchanged, so the
   `prelaunch-interface` work can replace or remove it in one place.
9. **CSV.** Written by the build to `/control/side-by-side.csv` from the same
   view the page draws (`pageFiles` in `src/prerender/render.tsx`), linked
   with `download`. Being a file link, it loads no records. Columns:
   organisation, date (an interval as `from/until`), date_precision,
   date_kind, kind, status, stage, statement, record_id, source_url (the
   canonical URLs of the record's supporting sources, separated by " ; ").
   One row per record shown, in the page's order.
10. **Links.** The governance hub's "Control and commitments" list, the two
    control-structure pages ("Related"), and the dossiers of the four
    organisations. The start page and the "Ways in" panel are not touched.
    The hub imports only the page's ID and title
    (`control-timelines-page.ts`): a first version imported the definition
    and put its whole text in the start page's entry script.

## Coverage per organisation and period

Records placed on the axis, by the year their mark starts. Computed from the
page's view on this branch; not shown on the page.

| Organisation    | 2014–2018 | 2019–2020 | 2021–2022 | 2023 | 2024 | 2025 | 2026 | Announced | In effect | Dated record | Year | Month | Day |
| --------------- | --------: | --------: | --------: | ---: | ---: | ---: | ---: | --------: | --------: | -----------: | ---: | ----: | --: |
| OpenAI          |         3 |        13 |         2 |    9 |    9 |   10 |    7 |         8 |         8 |           37 |    5 |     0 |  48 |
| Anthropic       |         0 |         0 |         2 |    8 |    5 |    5 |    9 |         5 |         4 |           20 |    0 |     6 |  23 |
| Google DeepMind |         1 |         0 |         0 |    2 |    0 |    0 |    0 |         2 |         1 |            0 |    1 |     0 |   2 |
| xAI             |         0 |         0 |         0 |    0 |    0 |    1 |    3 |         4 |         0 |            0 |    0 |     0 |   4 |

Empty periods shown as gaps: OpenAI 2014, 2016–2017, 2020, 2022; Anthropic
2014–2020, 2022; Google DeepMind 2015–2022, 2024–2026; xAI 2014–2024. The
gaps for years before an organisation existed are shown like any other; the
page does not infer founding dates.

The uneven depth is a fact about the dataset, not about the organisations.
OpenAI's and Anthropic's rows come from control-structure research packs
(tax filings, certificates, board announcements). Google DeepMind's and
xAI's rows hold only records admitted for other collections: neither has a
board, trust or control-right record, and the 2023 records describe Google
DeepMind as a combined unit.

## Budgets

Gzip-9 KB before the page answers input (`pnpm build`).

| Page type         | This branch | Limit |
| ----------------- | ----------: | ----: |
| Control timelines |       259.8 |   285 |
| Start page        |       113.0 |   115 |
| Search            |       274.7 |   275 |

The new page type's limit is about 10% above its first measurement
(259.7 KB). Its slice is 28.6 KB gzip-9 and stands alone: a first version
read the control pages' open-question records only by ID, the slice lacked
them, and the build fell back to the relation core; `controlEntries` fixed
that. No limit was raised. The Search page is close to its limit
(274.7 of 275 KB); the page entry for this page adds a few hundred bytes to
the search index. Any further page entry may push Search over (maintainer
decision 5).

## Screenshots

Taken with Chromium against the production preview at 390, 1280 and 1440 px
(full page) and at 1280 and 1440 px with the record panel open on
`xm-spacex-acquisition`. Kept outside the repository: `AGENTS.md` forbids
committing screenshots. What they show:

- 1440 and 1280 px: legend, four rows on the 2014–2026 scale, OpenAI's row
  stacked up to 13 sub-rows at 2019-03-11 (the eight board members listed in
  the OpenAI LP announcement and the records of the same day), the 2014
  DeepMind acquisition as a band across 2014, gap notes in each empty run.
- 390 px: years stacked from 2014, each organisation's records under the
  year, one gap line per year, no sideways scroll.

## Checks run

- `pnpm -s validate:data`: valid (1,928 entities, 5,360 claims, 1,821
  sources, 7,201 evidence records), as part of the build.
- `pnpm -s check`: passed on the final code (87 files, 826 unit tests;
  build with every page checked from its slice, 7,266 pages, no page needing
  the relation core; every budget within its limit).
- `pnpm -s check:privacy`: passed before each push.
- Browser suite (Chromium, an untracked config without `channel: 'msedge'`,
  deleted afterwards; nothing else on port 4173): **299 passed (32.9 min)**
  on the final code, including the seven new tests in
  `tests/browser/control-timelines.spec.ts` (axis and precision, record
  panel, 390 px layout, CSV against the drawn marks with every mark resolved
  to a stored claim page, links from the hub, control pages and four
  dossiers, axe at 1440 and 390 px).
- Inspection at 390, 1280 and 1440 px: no horizontal overflow, no console
  error. Two fixes came from it: the record panel covered the mark that
  opened it (the page now yields the panel's width), and the year rules
  were hidden under the gap shading.
- Not measured: Start and Search on `main`. The start page's only change is
  the hub's link (ID and title); Search gains one page entry.

## Maintainer decisions (2026-11-01)

1. Google DeepMind and xAI rows: kept as they are.
2. Funding rounds and equity stakes: kept out.
3. OpenAI control page's board-role test: fixed on this branch, with a test,
   and what it changes updated (below).
4. Announced board appointments stored as snapshots: left as stored.
5. Search budget (274.7 of 275 KB): the interface session handles it when
   combining branches.
6. Start page and "Ways in": noted; the planning thread adds this tool there.

## The board-role fix and release 0.22.1

- `src/domain/control-structures.ts`: from a collection's version 2, a role
  is tested without its parenthesised sourcing note. Version 1 keeps the old
  test, because every released dataset up to v0.22.0 stores the OpenAI
  collection's definition at version 1 and rebuilds its claim list with the
  current code; without the version rule all past releases would stop
  reproducing.
- `src/reading/control-structures.ts`: the OpenAI collection is version 2.
  Anthropic's stays at version 1; the rule removes nothing from it.
- Effect, compared record by record: the OpenAI control page goes from 62 to
  60 records (the two staff departures); Anthropic's is unchanged (32). The
  OpenAI research starter (Markdown and JSON) no longer lists the two
  records. The timelines show the same records as before, now taken from the
  page itself without a filter of their own.
- **Release v0.22.1** (`pnpm release 0.22.1`, dated 2026-11-01): 0 records
  added, changed or removed; one collection changed, `control/openai`
  (version 2, two claims fewer). No data file changed. `pnpm release 0.22.1
--check` reproduces, and the release tests rebuild every earlier release
  byte for byte.
- Tests: `control-records.test.ts` ("reads a staff role whose sourcing note
  names a board as no board role": the two records are absent from the page
  and the starter, board roles with a parenthesised note stay, version 1
  still reads the whole text); `control-timelines.test.ts` now requires the
  OpenAI and Anthropic rows to hold exactly their pages' records, less
  provisions and assessments.
- Checks after the fix: `pnpm -s check` passed (87 files, 829 unit tests;
  build and budgets unchanged); `pnpm -s check:privacy` passed; browser
  suite (Chromium, local config deleted afterwards; port 4173 free):
  **299 passed (29.3 min)**.
