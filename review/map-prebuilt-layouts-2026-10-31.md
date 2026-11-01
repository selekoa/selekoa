# Map layouts stored by the build (2026-10-31)

Branch `map-prebuilt-layouts` from `main` at `f56a2d6` (after #109),
rebased onto `9b69a70` (after #110, `fix-slice-nav-cursor-test`). No
data, release, export, header or hosting setting changed. Nothing was
deployed.

## The problem

Every relationship map (a dossier's map, a search or topic map in the
explorer, a person's map tab) first laid out the whole dataset on the main
thread (`atlas` in `src/ui/Network.tsx`), as a reference for the positions
of the records it drew. With 1,250 entities that is about 160 million pair
steps, growing with the square of the dataset; on the phone profile the page
stopped answering for about 23 s after it had become usable. Two map browser
specs timed out under load for this reason.

The explorer's default view draws no map: since 2026-10-26 the whole dataset
is never drawn ("The map is drawn for a search, a topic or an institution").
The cost came from the reference layout, not from any map a reader saw.

## What changed

- **A layout is a function of the records drawn alone**
  (`networkLayout` in `src/ui/layout.ts`). The whole-dataset reference is
  gone. A centred map pins its focus at the origin; a map without a focus
  pins the four landmarks at their fixed places, as before. Seeds stay
  hashed from IDs and the iteration count stays fixed, so a layout is
  independent of input order (the existing test in
  `src/ui/mapGrammar.test.ts`, reversed records and claims, still holds).
  Consequence: a stored map, or an unseeded one (a search or topic map),
  whose records are unchanged has the same positions in every release,
  whatever is added elsewhere (tested for Anthropic's map when a record
  joined to OpenAI is added). A narrower map centred on a record (another
  year, another record type) is seeded by that record's full map, so it
  also moves when the full map changes.
- **The build stores the map centred on each organisation and person**
  (`mapLayouts` in `src/prerender/render.tsx`, written by
  `scripts/prerender.ts`): `slices/map/dossier/<id>.json` and
  `slices/map/person/<id>.json`, the records chosen as the dossier's map
  and the person's map tab choose them. 501 files, 99 KB in all, the largest
  (OpenAI) 6.7 KB raw, about 2 KB transferred. Each layout is keyed by what
  it is a function of (`layoutKey`: the records, the pairs their claims join,
  landmarks, focus, document sequence and a layout version). Positions are
  rounded to a tenth of a unit.
- **The browser draws a stored layout when the key matches**
  (`placeRecords` in `src/ui/map-layout.ts`). Any other map (a search, a
  topic, a dossier map with another year or record type) is laid out in a
  Web Worker (`src/ui/layout-worker.ts`); when it is centred on an
  organisation or person, their stored layout seeds it, so records keep
  their bearings when filters change. One layout at a time goes to the
  worker; one no map still wants (the filters changed again) is dropped
  before it starts. If the worker cannot be built, its file fails to load
  (a deploy while a tab is open) or it gives no answer within 15 s, the
  layouts are computed in the page instead, one per task. Until positions
  arrive, the map says so and the lists below it serve. The map element
  says where its positions came from (`data-layout`: `stored`, `worker` or
  `page`; `data-layout-seed`: the stored layout that seeded it).
- **Prefetch.** An address that opens a dossier's map fetches the map code
  and the stored layout with the page's own code and data; a search map's
  address fetches the map code and starts the worker (`prefetchMap` in
  `src/App.tsx`). Nothing waits for them.
- **Keyboard list of records.** Below the map, "Records in this view · N"
  lists every record drawn, by name, type and short name where it differs
  (so records of the same name stay apart), the centre marked; selecting one
  does what selecting its symbol does. If that takes the map away (another
  page, a map too large to draw), focus moves to the page's main region.
  "Connections in this view" already listed every line. The legends are
  unchanged.
- **Measurement**: `tsx scripts/measure-load.ts --map` measures pages that
  open with a map: when the page answers, when the map is first drawn, and
  long tasks between the two (and for 0.5 s after).
- Docs: `docs/architecture.md` (layout paragraph) and
  `docs/data-loading-design-c.md` (files under `slices/map/`).

## Measurements

Phone profile, `tsx scripts/measure-load.ts --map --runs 3`: 4× CPU, Fast
3G, 390 × 844, cold cache, median of three, on this machine (4 processors).
"Interactive" is when the page answers input; "after" is the map drawn less
interactive; "blocking" is long-task time (beyond 50 ms each) from
interactive until 0.5 s after the map is drawn. Before: `main` at `f56a2d6`.

| Page                               | Interactive, before → after | Map drawn, before → after | Map after interactive, before → after | Blocking, before → after |
| ---------------------------------- | --------------------------: | ------------------------: | ------------------------------------: | -----------------------: |
| `/dossier/openai?view=map`         |             11,067 → 11,345 |           34,754 → 11,682 |                          23,687 → 342 |             22,950 → 229 |
| `/dossier/anthropic?view=map`      |             10,939 → 11,111 |           35,452 → 11,430 |                          24,718 → 330 |             23,837 → 238 |
| `/explore#q=preparedness&view=map` |             11,429 → 11,865 |           35,907 → 12,125 |                          24,646 → 266 |             23,786 → 173 |

Runs, before (interactive/drawn): 11,067/34,754, 11,647/36,991,
10,994/34,360; 10,939/34,230, 10,966/36,132, 10,734/35,452; 11,260/35,907,
11,429/34,132, 11,494/36,842. After (on the rebased branch): 11,267/11,609,
11,345/11,682, 11,392/11,741; 11,100/11,430, 11,111/11,418, 11,222/11,554;
11,815/12,083, 11,865/12,125, 11,954/12,220. "Interactive" moves by up to
0.4 s between builds and runs; it is set by the whole records (below), not
by the map.

- **Every measured map is drawn within 0.35 s of the page answering**,
  against about 24 s, and the page no longer stops answering once usable
  (about 0.2 s of long tasks, against about 23 s). The target of about 1 s
  is met.
- **Search map**: laid out in the worker; 0.27 s after the page answers.
- The explorer's default view (`/explore`) draws no map, before or after;
  its first load is unchanged.
- An intermediate build without the prefetch drew dossier maps 1.6 s after
  interactive: the map code (45 KB) and the stored layout were fetched one
  after the other, after the page answered.
- **What remains**: a dossier map's address still loads the whole records
  (about 1.1 MB on the phone profile) before the page answers, as before,
  since `?view=map` is a query without a slice (stage c5, "Where the whole
  records still load"). That sets "interactive" at about 11 s. See open
  question 2.
- **Build**: `pnpm build` 100–104 s here (main: 114 s, the first build of the session,
  with cold caches); pre-rendering 43–47 s, the layouts adding about 3 s
  across four threads. Their cost grows with the size of each
  neighbourhood, capped by the map limits (150 records), not with the
  dataset.

## Gates and checks

- `pnpm -s check`: format, lint, typecheck, 81 test files / 737 tests,
  build with budgets, hydration identity and slice checks. Every page type
  within its limit; the opening scripts grow by 0.3–0.4 KB gzip (the
  prefetch in `App.tsx`; `main` at `9b69a70` built the same way: Start page
  108.6 → 109.0 KB, Explorer 306.0 → 306.3, Dossier 336.3 → 336.6). The map
  code, the worker and the layouts load only with a map. No limit was
  raised.
- New unit tests (`src/ui/map-layout.test.ts`): keys are independent of
  order and duplicates and change with a record, a pair or the focus;
  adding a record joined to OpenAI changes OpenAI's key and leaves
  Anthropic's key and positions unchanged; stored positions round-trip
  within 0.05; the stored dossier and person layouts carry the key of the
  records those pages draw; without a worker a layout is computed in the
  page, and a queued layout no longer wanted is dropped while the others
  complete. `src/domain/query.test.ts`:
  a centred map pins its focus at the origin (was: at its atlas position).
- New browser tests (`tests/browser/map-layouts.spec.ts`): OpenAI's
  and Anthropic's dossier maps are drawn from their stored layout at 1440
  and 390 px, with every record in the keyboard list; Anthropic's map
  reached from the explorer's landmark is drawn from the same stored
  layout, each record at the same bearing from the centre; a dossier map for
  an earlier year is laid out in a worker (a worker starts) seeded by the
  stored layout (its key); a search map is laid out in a worker, unseeded;
  with the worker's file answering 404 a search map is still drawn, in the
  page; choosing OpenAI from Sam Altman's records list by keyboard leaves
  focus on the dossier's main region (it fell to the document body before
  the fix); a person's map tab is drawn from its stored layout. `cartography.spec.ts`: the
  connections summary is named, now that the map has two lists.
- Browser suite: see "Checks run".
- `pnpm -s check:privacy`: passed.
- Inspection at 1440 and 390 px, light and dark: OpenAI's dossier map,
  the "preparedness" search map, Sam Altman's map tab. No console errors
  but the analytics beacon (blocked from 127.0.0.1). The star layouts read as
  before at 1440 px. At 390 px OpenAI's star (94 records) remains a mass of
  symbols with lines hidden beneath them, as recorded on 2026-10-26
  (`review/map-followup-2026-10-26.md`); the records list is the readable
  form there.

## Checks run

- `pnpm -s check` on `470ddcf` (before the fresh-context review): passed (81 files, 737 tests; build
  with pre-rendering 42 s, 4,537 pages, 1,224 slice files, 6,770 files in
  `dist/`).
- Browser suite, through an untracked Playwright config without
  `channel: 'msedge'` (Playwright's Chromium; deleted afterwards), no other
  server on port 4173: before the rebase 275 passed, 1 failed:
  `slice-navigation.spec.ts` "a page opened beneath a cursor that has not
  moved loads nothing more", the test #110 fixed on `main`. After the rebase
  and the last code change: `slice-navigation`, `map-layouts`,
  `cartography`, `start-featured`, `record-pages` and `explorer` specs, 60
  passed. `start-featured.spec.ts` (OpenAI's map from the start page and
  at its address, twice each) took 6.4 s at 1440 px and 4.2 s at 390 px in
  the full run, which ran at full CPU load throughout; on `main` each map
  in it waits for the whole-dataset layout. Which two specs timed out
  under load before was not recorded; these were the likely ones.
- `pnpm -s check:privacy`: passed.
- Measurements above: rebased branch, final code but the move of
  `mapLayoutPath` into `src/domain/slices.ts` (bundle placement only).

## Fresh-context review

After the checks above, a review workflow (five reviewers by dimension:
keying, asynchrony, build and SSR, reader text and accessibility, tests and
measurement; each finding then put to three verifiers asked to refute it)
returned 12 findings, none refuted, 8 distinct after merging duplicates. All
were fixed on this branch:

1. A worker that failed to load or threw left every computed map on
   "Placing the records" for the rest of the visit (found by four reviewers
   independently). Now an error, or no answer within 15 s, moves layout into
   the page; a failed layout shows a notice.
2. Superseded layouts queued in the worker. Now one runs at a time and
   unwanted ones are dropped before they start.
3. Choosing a record from the new list could leave focus on nothing.
4. Records of the same name were indistinguishable in the list.
5. The WebGL notice and the placing notice could overlap.
6. The stability test compared a layout with itself; the stability claim
   overreached for seeded maps. Test replaced, claim narrowed (above).
7. The worker tests checked neither the worker nor the seed.
8. This note described an OpenAI browser test that did not exist; it now
   does.

A second workflow (three reviewers on the fix commit, three verifiers
each) confirmed four further findings, rejected four, and all four were
fixed:

1. A layout whose map changed while the stored layouts were still loading
   was queued anyway and computed ahead of the one wanted (the abort came
   before the layout reached the queue). Now refused at that point; unit
   test with a held fetch.
2. Records with the same name, type and short name (two editions of
   Acemoglu and Restrepo 2019 on Daron Acemoglu's map) still read alike;
   such rows now add the record ID.
3. The worker-failure browser test did not reach a layout already sent to
   the worker. Added: Anthropic's dossier map for 2023 with the worker's
   file answering 404 is computed in the page.
4. This note credited checks to code they had not covered; corrected
   below.

Checks after the fixes:

- Full browser suite on `339e6f6` (first fix commit): 284 passed, none
  failed (23.6 min).
- `pnpm -s check` on the final commit: passed (81 files, 740 tests;
  budgets as above: Start page 109.0 KB, Explorer 306.4, Dossier 336.7).
- After the final commit: `map-layouts`, `cartography`, `record-pages`
  and `start-featured` specs, 32 passed.
- Inspection of the records list on Daron Acemoglu's map at 1440 and 390
  px, light and dark: the two like rows carry their IDs, text wraps, no
  console errors. The failure and placing notices were checked by the
  browser tests, not by eye.
- `pnpm -s check:privacy`: passed.
- Measurements were taken before these fixes; the fixes change only the
  worker queue, failure paths and the list, not the stored-layout path the
  measured dossier maps take. The search map's worker path now queues one
  layout at a time, which was already the case for a single layout.

## Design choices

1. **Self-contained layouts instead of an atlas reference.** The atlas gave
   every map the bearings of one whole-dataset layout, but that layout moved
   with every admission, so no map's positions survived a release. The brief
   asks for positions stable where records are unchanged; only a layout
   computed from the drawn records alone gives that. Bearings are kept
   within one record's maps instead: the stored layout of the focus seeds
   narrower maps of it. Those narrower maps therefore follow the focus's
   full map from release to release.
2. **Stored beside the slices, not inside them.** A layout is not a
   record: the slice machinery (tracing, hydration identity, `mergeSlices`)
   stays untouched, and a map reached without slices (after the whole
   records load, from the explorer) finds its layout by the focus alone.
   `/slices/*` already has the no-cache rule, so no header changed.
3. **Keyed, not assumed.** The browser uses a stored layout only when the
   key of what it draws matches; any difference (another filter, a file of
   another build) falls back to the worker, never to wrong positions.
4. **No overview of the whole dataset.** The brief asks for "a prebuilt
   overview layout" for the explorer's default view. That view draws no map
   by the decision of 2026-10-26 (`mapLimits`), so nothing was built for it;
   see open question 1.

## Open questions

1. **An overview map for the explorer's default view?** Today it shows
   "The map is drawn for a search, a topic or an institution". Drawing all
   1,250 records was judged unreadable. An overview would need a smaller,
   principled selection (for example the four landmarks and the
   organisations with dossiers joined to them), and a selection by
   connection count would read as importance, which the legend disclaims.
   Recommended: keep the default as it is.
2. **A slice for a dossier's map.** `/dossier/<id>?view=map` still loads the
   whole records (about 1.1 MB) before it answers. A traced slice for that
   address (as stage c4 does for pages) would cut this to the map's
   records; it touches `dataNeeds` and navigation from slices. Recommended
   as a separate task.
3. **Phone-width stars.** At 390 px a star of 90 or more records is legible
   only by zooming. Options: open such a map zoomed on its centre, or draw
   smaller symbols at narrow widths. Not changed here.
4. **Pending packs.** No admission branch had merged by the end of this
   work (key papers: `key-papers-pack` only). After key papers is admitted
   the whole-dataset cost no longer arises; the remaining cost is per
   neighbourhood. Measure the dossier maps again then.
