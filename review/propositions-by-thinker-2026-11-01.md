# Propositions by author (2026-11-01)

Roadmap, interface item 5 ("Propositions by thinker"). Branch
`propositions-by-thinker` from `main` at 4629608. No data change: the pages,
the CSV files and the links are computed from the stored proposition records
(`articulates_proposition`, `contests_proposition`, `bears_on_proposition`)
and the collections' frames.

## What it does

- **By proposition.** For each proposition of a collection, its texts in date
  order, each with its byline, stance (Articulates, Contests, Bears on), the
  date as stored with its basis (`2014 · published`,
  `1998 · published · wording attested 2000-08-17`), the register where it is
  not nonfiction, the tier where the collection has tiers, and a link that
  opens the record in the claim panel (`/claim/<id>` as its address).
- **By author.** For each author a text's own byline prints, A–Z, the
  propositions their texts take a stance on, with stance and date. Texts with
  no byline of their own recorded are listed apart.
- **Earliest located** appears on a row only where the record stores an
  earliest-located role (`earliest-located`, `earliest-located-tier-2`,
  `earliest-located-term`, the last with its term). Nothing is computed from
  dates.
- **CSV.** `/stances/<collection>.csv`, one row per row shown, in the page's
  order, written by the build from the same function as the page
  (`propositionStances` in `src/domain/proposition-stances.ts`). Columns:
  collection, proposition code and name, stance, earliest located, text,
  document ID, byline, byline basis, date, date basis, dates as shown,
  register, tier, record ID and record URL.
- **Links.** The tool is in `src/ui/tools.tsx` (start page "Ways in"), has an
  entry on the Ideas & debates hub, a link at the head of each propositions
  collection page, and on a person page each propositions collection under
  "Appears in" that holds the person's texts has "Their texts’ stances, by
  author →", which opens the author view at the person's byline.

## Design choice: one index and one page per collection

Two shapes were possible. One page per proposition and per person would have
meant about 120 proposition pages and about 600 byline pages, each needing a
stable slug from a printed byline (pseudonyms, initials, organisations), for
little gain: a proposition's texts are already one section of a collection.
A single page for all 1,219 records would have needed a slice of about 175 KB
of gzip on its own, over every budget.

Chosen: `/stances` (an index of the eight collections, drawn from the start
page's summary, with no records) and `/stances/<collection>` (one page per
collection, switching in the page between "By proposition" and "By author").
The by-author view is therefore per collection; a person page links to each
collection that holds the person's texts. Each collection page has its own
slice (its stance records, their texts' names and own-source bylines, the
propositions), and its code loads only when the page opens
(`PropositionStances` in `src/ui/page-modules.tsx`). The pages are built
with the proposition view; the author view is drawn in the browser.

A new address kind `stances` was added (addresses, deep links, slices, page
code, page titles, search entry for the index). In the workspace the pages
run as a mode of the existing propositions view, which keeps the added
workspace code small (the Search page shares it and is near its limit).

## Editorial rules as applied

- A stance belongs to a text. Page text: "A stance belongs to the text, not
  to its author." Rows name the text; no sentence says a person holds a view.
- No inferred stance or influence: every row is one stored record. The order
  is by date, and the page says it records no influence.
- No counts that rank people: authors are listed A–Z with no count beside a
  name. The collection header gives the collection's propositions, records
  and texts only.
- Bylines as printed: the authors of the text's own source (a source whose
  `documentId` is the text), taken first from the record's own evidence and
  otherwise from the dataset. Different printings of one name are joined by
  the site's existing author key (initials dropped) and shown as "Also
  printed as …". Where only a source about the text is recorded (a relay, a
  compiled thread), its authors are not the text's: those records are listed
  under "Texts without a recorded byline", and the CSV says `not recorded`.
  This differs from the collection pages' row labels, which fall back to the
  first source's authors.
- "Earliest located", never "first"; dates keep their stored precision and
  basis.

## Coverage per collection

Computed on this branch from the current data (they change with each
admission; not frozen in any test).

| Collection                                                                                                  | Propositions | Records | Texts | Articulates / contests / bears on | Rows marked earliest located | Authors (bylines) | With a person page | Records without a recorded byline |
| ----------------------------------------------------------------------------------------------------------- | -----------: | ------: | ----: | --------------------------------- | ---------------------------: | ----------------: | -----------------: | --------------------------------: |
| Propositions about superintelligence, 1863–2022 (`superintelligence`)                                       |           15 |     252 |   108 | 112 / 37 / 103                    |                           20 |                99 |                 39 |                                 4 |
| Arguments about catastrophic risk from advanced AI (`risk-debate`)                                          |           18 |     270 |   195 | 120 / 91 / 59                     |                           47 |               331 |                 62 |                                11 |
| Eliezer Yudkowsky’s arguments on common claims about AI, 1996–2026 (`yudkowsky-arguments`)                  |           29 |     207 |   121 | 9 / 164 / 34                      |                           34 |                 5 |                  4 |                                 2 |
| Machine succession, scale and acceleration: propositions in located texts, 1979–2026 (`machine-succession`) |           10 |     151 |    66 | 96 / 26 / 29                      |                           23 |                44 |                 10 |                                 0 |
| Economics of machine intelligence (`economics-of-machine-intelligence`)                                     |           24 |     323 |    87 | 137 / 24 / 162                    |                           47 |                78 |                 59 |                                 0 |
| Arguments about compute in orbit (`orbital-compute-arguments`)                                              |           11 |      37 |    15 | 27 / 5 / 5                        |                           11 |                27 |                  0 |                                 0 |
| Arguments about AI and biological risk (`ai-bio-arguments`)                                                 |            7 |      25 |    11 | 13 / 7 / 5                        |                            9 |                11 |                  0 |                                 0 |
| AI in science (`ai-in-science`)                                                                             |            6 |      30 |    27 | 18 / 1 / 11                       |                            6 |               105 |                  3 |                                 1 |

All 1,219 stored stance records appear in at least one collection page; none
is left out. "With a person page" counts bylines whose key matches the name
of a person in the people index (aliases are not in that index).

## Budgets

Gzip-9, from `pnpm build` on this branch.

| Page type                  | Before | After | Limit |
| -------------------------- | -----: | ----: | ----: |
| Start page                 |  108.9 | 109.2 |   115 |
| Search                     |  272.3 | 272.9 |   275 |
| Person                     |  230.7 | 231.4 |   295 |
| Propositions               |  333.4 | 334.2 |   455 |
| By author (new; economics) |      — | 283.5 |   310 |
| By author index (new)      |      — | 228.4 |   250 |

No limit was raised; the two new entries are set about 10% above their
measured size, as the file's rule says. The largest collection slice is
economics (about 57 KB gzip): the stance records carry their whole
`attributes` field, which the shared propositions view reads.

Two build findings, recorded for the next change near the budgets:

- Importing `src/ui/tools.tsx` (the `ToolLink` style) from the lazily loaded
  propositions page split the entry chunk into seven more files and put the
  Search page 0.6 KB over its limit. The collection page therefore links to
  the tool with a plain text link, not the ruled tool style.
- Importing `virtual:landing-summary` into the new page module did the same;
  the summary is passed from the workspace as a prop instead.

## Shared code touched

- `src/ui/hold-until-records.ts`: on a page drawn from its slice, every
  button click is held until the whole records load. The view switch needs
  only the slice, so a control marked `data-in-page` now acts at once (found
  in the browser: on a cold load the switch waited for the whole records).
- `src/ui/AppearsIn.tsx`: the stances link, with the person's byline keys in
  the fragment (`#authors=…`), because a link from a slice-drawn page opens
  its page afresh from the address alone.
- `public/_headers`: `/stances` and `/stances/*` revalidate as other pages
  (the headers test requires a rule for every built page).
- `tests/browser/reader-fixes.spec.ts` allows `/stances/` among the "Appears
  in" link targets; `prelaunch-interface.spec.ts` expects six tools.

## Checks

- `pnpm validate:data`: valid (no data change).
- `pnpm check` (format, lint, typecheck, unit tests, build with budgets):
  passed; after the last change, format, lint, typecheck, unit tests
  (891 passed, 1 skipped) and the build were run again and passed.
- `pnpm check:privacy`: passed.
- Unit tests: `src/domain/proposition-stances.test.ts` (each collection: same
  records as the collection page, each row from its stored record, earliest
  located only from stored roles, bylines from own sources, A–Z order, CSV
  equal to the rows; addresses, slices and page code).
- Browser tests: `tests/browser/propositions-by-thinker.spec.ts` (both views,
  every row resolves to a stored stance record with the shown stance, date
  and proposition; 390 px with no sideways scroll; CSV equals the rows shown;
  links from the hub, the index, the collection page and a person page;
  accessibility scan). `prelaunch-interface.spec.ts` now expects six tools in
  "Ways in". The full suite (325 tests) passed with a local configuration
  without the `msedge` channel, kept outside the repository and deleted
  afterwards; port 4173 was left free.
- Screenshots at 390, 1280 and 1440 px of the index, a collection page in
  both views and with a record open were inspected locally and are not
  committed. The console shows no errors besides the analytics beacon, which
  the local preview cannot reach.

## Open questions

1. **Name.** The page is titled "Propositions by author", not "by thinker":
   bylines include organisations and pseudonyms, and "thinker" characterises.
   Recommended: keep "author".
2. **Bylines from a source about the text.** 21 records (the 2019
   instrumental-convergence thread comments, Miller 1995, Intelligence
   Explosion Microeconomics, the AlphaFold account, some Good 1965 records)
   have no own-source byline on their evidence; Good 1965 falls back to its
   own source elsewhere in the dataset, the rest are listed without a byline.
   Recommended: a later data task adds own sources (or authorship records)
   for these texts; until then the page does not name an author it cannot
   show.
3. **Person-page link without a matching byline.** "Appears in" counts a
   person's texts by the collection rows' labels, which can fall back to a
   source about the text. Where no own-source byline matches the person, the
   link opens the author view at its top. Recommended: accept.
4. **CSV content type.** `/stances/*.csv` has no `Content-Type` rule in
   `public/_headers` (as the control timelines' CSV). Recommended: add one
   rule per file if readers report encoding problems in spreadsheet programs.
5. **Collection-page link style.** A plain link instead of the ruled tool
   style, for the budget reason above. Recommended: accept, or move
   `ToolLink` to a module of its own in a later budget pass.
