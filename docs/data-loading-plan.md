# Data loading plan (2026-10-30)

How the browser should load the records once the pending packs are admitted.
This is a plan. No application code, data, header or hosting setting changed.
Measured on `main` at `9e7f400` (#92): 3,043 claims, 3,957 evidence items,
905 sources, 1,073 entities, 4,019 pre-rendered pages.

## Summary

- **Recommendation: design (a), split by kind, in three stages.** Each stage
  keeps the pre-renderer, search, addresses and exports as they are and is
  shippable alone. Stage 1 moves the fields only the claim panel reads out of
  the records chunk and stops validating the dataset in the browser. Stage 2
  moves evidence passages and locators to a chunk loaded by the pages that show
  or search them. Stage 3 moves qualifications, attributes and descriptions to
  shards that each page names in its built HTML.
- **What it buys.** Record pages (dossier, person, document, claim, explorer)
  carry about 60% less data at stage 3 than today. After the pending packs they
  would carry slightly less than today, against about twice as much without the
  split. Design (a) therefore covers roughly one doubling of the corpus. Past
  that, per-page data and a static search index (design (c)) are needed. The
  plan says when, by a budget, rather than by date.
- **Stage 1 alone** cuts the records chunk by 26% raw and 16% on the wire, and
  removes 75–150 ms (desktop) of schema validation from every page that runs.
  On the phone profile, a dossier is estimated to become interactive in about
  7.6 s instead of 8.9 s. That is modest. Stage 2 is needed before the
  key-papers pack (1,221 claims) is admitted.

## Measurements

### Corrections to the brief

- The start page loads no records: 290 KB raw, 79 KB brotli (102 KB
  transferred in the run below). Every other page loads them. The start page
  also starts the full download when a pointer moves over, or focus reaches,
  any link or button (`src/App.tsx`, `prefetch`), so a keyboard reader who
  tabs once downloads about 1 MB.
- There is no stored search index. `createSearchIndex` builds it in the
  browser from the records on the first search (65–88 ms on a desktop core).
- The pack branches are named `<name>-pack`, not `research/*-pack`. Eight are
  unadmitted: `ai-bio`, `china-labs-3`, `compute-power-orbit`, `key-papers`,
  `lab-genealogy-2`, `people`, `risk-debate`, `technical-history`. Together
  they hold 2,611 candidate claims with 3,487 passages, not about 1,500 records.
- The "about 6 MB" in the roadmap was measured at 2,043 claims. The records
  chunk is now 8.66 MB raw at 3,043 claims, so it grows by about 2.6 KB per
  claim with its evidence.

### Chunks

`pnpm build` on `main`. Gzip at level 9 and brotli at quality 11, computed
locally. The live host serves the records chunk at 1,040 KB brotli and
1,168 KB gzip (checked with `curl` against selekoa.org on 2026-10-30; same
build hash). Its brotli is close to quality 5, so local quality-11 figures
understate the transfer by about a third. Only the 15 largest of 47 files are
listed; the rest are below 15 KB raw each.

| Chunk                       |      Raw |  Gzip | Brotli 11 | Loaded by                              |
| --------------------------- | -------: | ----: | --------: | -------------------------------------- |
| `records`                   | 8,664 KB | 1,162 |       785 | every page except the start page       |
| `citation-apa`              |      583 |   126 |       101 | reference exports, on demand           |
| `About`                     |      297 |    34 |        24 | About & method                         |
| `index` (entry)             |      269 |    84 |        72 | every page                             |
| `Network`                   |      174 |    43 |        37 | the map                                |
| `question-starter`          |      168 |    49 |        41 | every page except the start page       |
| `schema`                    |      129 |    36 |        32 | every page except the start page       |
| `citation-engine`           |      122 |    28 |        24 | reference exports, on demand           |
| `ReferenceActions`          |       78 |    21 |        18 | every page except the start page       |
| `Workspace`                 |       69 |    19 |        16 | every page except the start page       |
| `index` (CSS)               |       66 |    12 |        11 | every page                             |
| `lib-mjs`                   |       49 |    18 |        14 | reference exports, on demand           |
| `query`                     |       19 |     6 |         5 | every page except the start page       |
| page code (each)            |     8–17 |   3–6 |       3–6 | its page                               |
| **All 47 files**            |   10,908 | 1,712 |     1,245 |                                        |
| Start page in all           |      290 |     — |        79 |                                        |
| Any other page before input |    9,439 |     — |       985 | of which records 8,664 raw, 785 brotli |

### What the records chunk holds

The chunk is the five `data/*.json` files as one `JSON.parse` string. By kind
(minified JSON; brotli 5 approximates the live host):

| Kind     | Records |   Raw |  Gzip | Brotli 5 |
| -------- | ------: | ----: | ----: | -------: |
| Claims   |   3,043 | 3,436 |   489 |      399 |
| Evidence |   3,957 | 3,365 |   389 |      303 |
| Sources  |     905 | 1,175 |   161 |      139 |
| Entities |   1,073 |   469 |    93 |       84 |
| Meta     |       — |    13 |     5 |        4 |
| **All**  |         | 8,458 | 1,135 |      880 |

Largest fields (KB, raw / gzip / brotli 11, each field compressed alone):

| Field                      |   Raw | Gzip |  Br | Read in the browser by                |
| -------------------------- | ----: | ---: | --: | ------------------------------------- |
| evidence `note`            | 1,406 |   83 |  60 | the claim panel only                  |
| claim `qualification`      |   711 |  136 | 109 | record and reading pages, search      |
| claim `statement`          |   554 |  134 | 105 | every page, search                    |
| evidence `passage`         |   492 |  139 | 108 | claim panel, reading pages, search    |
| claim `time`               |   483 |   37 |  29 | every page                            |
| claim `attributes`         |   393 |   54 |  43 | comparisons, guides, commitments      |
| source `reuse`             |   314 |   36 |  27 | claim panel, starter exports          |
| evidence `locator`         |   249 |   48 |  37 | claim panel, reading pages, search    |
| source `version`           |   216 |   50 |  41 | the claim panel only                  |
| claim `object`             |   185 |   22 |  17 | every page                            |
| entity `description`       |   164 |   37 |  29 | record pages                          |
| source `documentWords`     |   116 |    7 |   6 | never (release build and audits only) |
| claim `inferenceRationale` |    99 |   17 |  14 | the claim panel only                  |

Built dossier and person pages carry statements and qualifications but no
passages and no notes (checked against `dossier/openai` and
`person/jan-leike`); a claim page carries both in its claim panel. Collections
(`src/reading`) are code, 12 KB. The search index is built at run time, as
above.

Possible splits, measured on today's data (KB, raw / gzip / brotli 5):

| Part                                                                                                                                         |   Raw |  Gzip | Br 5 |
| -------------------------------------------------------------------------------------------------------------------------------------------- | ----: | ----: | ---: |
| Today                                                                                                                                        | 8,458 | 1,135 |  880 |
| Stage 1 core: without notes, retrieval routes, source `version`, `reuse` (licence kept), `documentWords`, access dates, inference rationales | 6,255 |   939 |  741 |
| Stage 1 details chunk                                                                                                                        | 2,610 |   260 |  201 |
| Stage 2 core: also without passages and locators                                                                                             | 5,436 |   725 |  581 |
| Stage 2 evidence-text chunk                                                                                                                  |   998 |   222 |  198 |
| Stage 3 core: also without qualifications, attributes, entity descriptions and source links                                                  | 3,903 |   466 |  370 |

### Cost per page on a phone profile

Playwright with Chromium, cold cache, 390 × 844 viewport, CPU slowed 4× and
DevTools' "Fast 3G" network (562.5 ms round trip, 1.44 Mbit/s down,
675 kbit/s up). Served from `dist/` by a local server that maps `/x` to
`x.html` and compresses with brotli 5, close to the live host. Third-party
requests (the analytics beacon) blocked. "Interactive" is the moment the app
sets `html[data-selekoa-ready]`, when held clicks are released and controls
are enabled. "Blocking" is long-task time beyond 50 ms before then. Median of
three runs; milliseconds.

| Page                                   | First paint |             Interactive | Blocking | Transferred | JS heap |
| -------------------------------------- | ----------: | ----------------------: | -------: | ----------: | ------: |
| Start `/`                              |       1,428 |                   1,843 |       10 |      102 KB |   10 MB |
| Dossier `/dossier/openai`              |       1,492 |                   8,933 |      711 |    1,154 KB |   58 MB |
| Claim `/claim/dario-anthropic-2021`    |       1,452 |                   9,310 |    1,085 |    1,126 KB |   48 MB |
| Search `/search#q=responsible scaling` |       1,540 | 12,411 (results 12,483) |    4,045 |    1,134 KB |   82 MB |
| Explorer `/explore`                    |       1,460 |                   8,969 |      714 |    1,126 KB |   54 MB |

Unthrottled, the same pages became interactive in 71, 567, 499, 1,171 and
399 ms. The text of every built page is readable from first paint; the wait is
for input. On the phone profile about 6.2 s of a dossier's 8.9 s is the
transfer of 1.1 MB at 180 KB/s. The rest is round trips and 0.7 s of
script. Search adds 3.3 s of script: schema validation, building the index,
the query and drawing the results.

Script cost in Node on one desktop core (three runs): `JSON.parse` of the five
files 28 ms; `datasetSchema.parse` 75–153 ms; `createSearchIndex` 65–88 ms.
The schema has no defaults or transforms, so its parse only validates and
strips unknown keys; `pnpm validate:data` already does the validation at
build time.

### Growth with the pending packs

| Pack                  | Claims | Passages | Sources | New entities and documents (upper bound) |
| --------------------- | -----: | -------: | ------: | ---------------------------------------: |
| `ai-bio`              |    209 |      307 |      88 |                                      103 |
| `china-labs-3`        |    212 |      334 |     112 |                                      122 |
| `compute-power-orbit` |    201 |      474 |     124 |                                      140 |
| `key-papers`          |  1,221 |    1,221 |     112 |                                      250 |
| `lab-genealogy-2`     |    280 |      406 |     128 |                                      198 |
| `people`              |     83 |       98 |      65 |                                       44 |
| `risk-debate`         |    210 |      381 |     140 |                                      161 |
| `technical-history`   |    195 |      266 |     129 |                                      132 |
| **All eight**         |  2,611 |    3,487 |     898 |                                    1,150 |

Counts are from each branch's `research/<pack>/pack.json`. Entity counts
include reused documents and overstate. Scaling each kind by today's bytes per
record, admitting all eight would give:

| Part           | Today, br 5 | After the packs, br 5 | After, raw |
| -------------- | ----------: | --------------------: | ---------: |
| Records, whole |      880 KB |              1,764 KB |    16.0 MB |
| Stage 1 core   |         741 |                 1,486 |       11.8 |
| Stage 2 core   |         581 |                 1,163 |       10.3 |
| Stage 3 core   |         370 |             about 740 |  about 7.7 |

`key-papers` records are short (one quotation each), so the whole is more
likely 14–16 MB raw than above. Without a split, a dossier on the phone
profile would take about 15 s to become interactive and search about 20 s.
The records chunk would stay under Cloudflare Pages' 25 MiB file limit, but a
further doubling would not. Built pages would grow by about 2,611 claim pages
and a few hundred person, document and dossier pages, to about 7,300 files in
`dist/` (budget 15,000 in `scripts/prerender.ts`, limit 20,000). The page
renderer (`dist-ssr/render.js`, 12.7 MB today) would reach about 20 MB, which
matters for a Worker in phase 3, not for the static build.

## Constraints every design must keep

1. **Hydration identity.** A built page is taken over only if the browser's
   first render produces the same markup (`docs/architecture.md`, "Taking over
   in the browser"). Every field a built page shows must be in the browser
   before `hydrateRoot`, or React discards the built HTML. Page code already
   preloads before hydration (`src/ui/page-modules.tsx`); data must do the
   same.
2. **Pure renderer.** `renderPage(path, template, baseUrl)` stays a pure
   function of the bundled release data and the path. The renderer keeps the
   whole dataset; only the browser's copy is split. Anything a page needs to
   fetch is derived from data and path, and may be written into the built page.
3. **Search stays in the browser.** Terms stay in the fragment (`#q=`) and
   never reach the host. The "Pages" group (`searchablePages`) comes from code
   and a little data and must stay available on the search page.
4. **Exports and starters** need the full records for their selection,
   including passages limited by reuse notes (`src/domain/starter.ts`).
5. **No-scripts reading** is served by the built HTML and is unaffected by any
   browser split. Offline use today works after the first page because the
   records are all present; a split must say what a later page does offline.
6. **Hosting.** Hashed files under `/assets/` already have
   `Cache-Control: public, max-age=31536000, immutable`; `public/_headers` has
   45 rules (limit 100). Cloudflare Pages allows 20,000 files per deployment
   and 25 MiB per file.

## Designs

### (a) Split by kind

A core with ids, names, types, dates, statements and relations loads first.
Text read by fewer pages loads as separate hashed JSON or JS under `/assets/`.
In full (stage 3) there are three tiers:

- **Core** (370 KB br 5 today): claims without qualification and attributes;
  evidence as ids, source, role, support, passage type and verification;
  sources as id, title, publisher, kind and dates; entities without
  descriptions.
- **Evidence text** (198 KB): passages and locators, one chunk.
- **Details**: notes, source versions, reuse terms and links, qualifications,
  attributes, inference rationales and descriptions, in 64 shards keyed by a
  hash of the claim's subject (sources and entities with their own shards).
  Bucketing by subject keeps a median page to one shard; the OpenAI dossier
  touches 45 of 64, the Yudkowsky person page one. Hashing by claim id would
  scatter every large page across most shards.

**What loads where.** Start page: as today. Dossier, person, document, claim,
hubs and explorer: core, their page code, and the detail shards named in the
built page (`data-shards` on the root element, written by the renderer). Claim
page and `?inspect=`: also the claim's evidence text and shard. Reading pages
(comparisons, guides, propositions, guided readings, document pages): core and
evidence text. Search: core and evidence text. Map: core only.

**Search.** Unchanged in behaviour. The search page loads the core and the
evidence-text chunk before it is taken over, and builds the index as today.
At stage 3 it also needs qualifications, so it loads the qualification column
(about 110 KB br) as one more chunk instead of all detail shards. `#q=` stays
in the fragment. "Pages" are computed from code and the core and appear
together with the record groups, as now.

**Pre-rendering.** The renderer imports the full dataset as now. It writes the
shard list into each page; that list is a function of data and path, so
rendering stays pure. Built HTML is unchanged apart from that attribute.

**Exports and starters.** The download buttons load the evidence text and the
details of the selection, then build the file as today. The release archives
and `/data/` files are unaffected.

**Offline and no scripts.** No-scripts reading is unchanged. Offline, a page
whose shards were not fetched cannot open a claim panel; it should say so and
link to the built claim page, which carries the panel's text.

**Caching and limits.** Every new file is content-hashed under `/assets/`, so
the existing immutable rule covers it and no `_headers` rule is added. A data
change invalidates only the files whose bytes changed (with subject-keyed
shards, those of the subjects touched). Files: +1 (stage 1), +1 (stage 2),
about +100 (stage 3). No file approaches 25 MiB.

**Risks.**

- Hydration mismatch on a page whose built HTML shows a field that was not
  preloaded. Caught by the hydration-identity test below; visible as a page
  that redraws with a loading notice.
- 18 UI modules read the global `repository` synchronously. Detail fields must
  go behind a hook (`useClaimDetails`, using the tracked-promise pattern of
  `page-modules.tsx`, which returns at once when loaded). A browser-side type
  `CoreDataset` (`Omit` of the moved fields) makes the compiler list every
  read that needs the hook.
- Skipping `datasetSchema.parse` in the browser relies on the build having
  validated the same files. A unit test that the parse output deep-equals the
  input (nothing stripped) keeps that true.
- Large dossiers fetch many shards at once; on a 560 ms round trip that is one
  round trip in parallel over HTTP/2, but should be measured.

**Tests to change or add.** Bundle budget test; hydration-identity test;
`render.test.ts` checks of the shard attribute; a browser spec that opens a
claim panel from a dossier and from `?inspect=`, and one that downloads a
starter; the existing `prerender.spec.ts` hydration checks extended to reading
pages and search; offline-panel notice.

**Effort.** Stage 1: 1–2 sessions. Stage 2: 1–2. Stage 3: 2–3. In all 4–7.

**What a reader notices.** Record pages answer sooner. Opening the first claim
panel on a page may show a brief loading line (one small file, then cached).
Search is about as fast as today until the corpus grows further. Nothing
changes without scripts.

### (b) Split by collection or hub, with a shared core

Each hub (governance, ideas, institutions) or collection gets a chunk of its
claims and evidence; a shared core carries entities and the claims in no
collection.

- **What loads where.** Hub and collection pages: core and their chunk.
  Dossiers, person, document and claim pages, explorer, map and search: core
  and every chunk, because their claims cross collections and most claims are
  in none. Those are 4,000 of the 4,019 pages.
- **Search** needs all chunks; no change from today in cost.
- **Pre-rendering, exports, offline**: as (a), with the chunk list per page.
- **Caching and limits**: a few files; claims in several collections are
  duplicated or assigned to the core, which then grows back.
- **Risks.** Collection membership is defined in code (`src/reading`), not in
  the data, so the split depends on reading definitions and moves when they
  change. It infers nothing, but it is the wrong axis for record pages.
- **Effort.** 3–4 sessions. **Reader notices**: faster hub and collection
  pages only.

Rejected: it helps 15 pages and none of the pages readers arrive at from
search engines.

### (c) Phase 3 early: static search index and per-page JSON, no Worker

Each built page also gets its data slice: the records its render reads. The
browser hydrates from the slice and fetches the next page's slice on
navigation. Search uses a static index; the Worker stays deferred.

- **What loads where.** Each page: its slice (dossier of OpenAI: its claims,
  their evidence and sources, names of the entities they mention; typically
  10–100 KB). Explorer and map: a relation core much like (a)'s. Search: the
  index shards the query touches, then the slices or snippets of the hits.
- **Search.** An inverted index over the folded words of every searched field
  (11,219 distinct words, 8,978 records) is 1,547 KB raw, 326 KB brotli 11 in
  one file. Split by the first two letters of a word it is 932 files (median
  76 bytes, largest 15 KB); a two-term query loads two or three. Prefix
  matching works within a shard. Snippets need the matched text, so either the
  shards also carry text (several times larger) or results are fetched per
  hit. Filters (collection, organisation, years) need a record table of about
  40 KB. `search.ts` would be rewritten around fetched postings; `#q=` and the
  "Pages" group (a small index of its own) can stay as they are.
- **Pre-rendering.** The slice must be exactly what the render reads. Options:
  have each page module declare its selection as a pure function (a large
  refactor of 18 modules), or record field reads during `renderPage` with a
  tracking dataset (clever, fragile: a full scan reads every claim's subject).
  Either keeps rendering pure.
- **Exports**: fetch the selection's slices, as (a).
- **Offline**: only visited pages work; navigation offline fails.
- **Caching and limits.** One JSON file per page doubles the files: about
  8,000 today, 14,600 after the packs, at the 15,000 budget. Embedding the
  slice in the HTML avoids new files but grows the deploy and every page's
  transfer. Index shards add about 930 files. Slices must be content-hashed or
  served `no-cache` with new `_headers` rules.
- **Risks.** The largest change to how the app holds data: every page module
  moves from the global repository to props or fetched slices; navigation gains
  a round trip; search ranking and filters must reproduce today's results
  exactly (`search.test.ts` gives the reference).
- **Effort.** 8–12 sessions, and it holds pack admissions for that time.
- **What a reader notices.** Every page answers about as fast as the start
  page, whatever the corpus size. Each navigation waits for a small fetch.
  Search results come in two steps (matches, then snippets) unless snippets
  are in the index.

## Recommendation and rollout

Design (a), in three stages, then (c)'s parts as budgets require. (a) keeps
one data model in the browser and moves fields, not architecture; (c) is the
durable answer, but it costs two to three times as much and would hold the
packs. (a) covers the pending packs; the budget test below says when (c) is
due, which on present growth is the next doubling after them (about 12,000
claims).

**Stage 1. Claim-panel details out; no validation in the browser.**

- Build: a Vite plugin (beside `scripts/landing-summary.ts`) supplies two
  virtual modules from `data/*.json`: the core and the details (notes,
  retrieval routes, source `version`, `reuse` except the licence,
  `documentWords`, access and archive dates, inference rationales). The
  details are one lazily imported chunk; Vite hashes it into `/assets/`.
  `documentWords` is dropped from the browser altogether (never read there).
- Browser repository: Maps built from the core without `datasetSchema.parse`.
  The renderer, `validate:data`, release build and tests keep the full,
  validated dataset.
- Inspector and the starter and reference exports read details through a hook
  that suspends until the details chunk has loaded. `preloadPage` adds the
  details for `/claim/…` and for any address with `?inspect=`, so those pages
  hydrate in one pass.
- Expected: records chunk 8.66 → 6.4 MB raw, live transfer about 1,040 →
  875 KB; one-off 260 KB gzip on the first claim panel; schema validation
  removed (about 0.3–0.6 s at 4× CPU). Dossier interactive on the phone
  profile: about 7.6 s (estimate from the measured transfer rate).
- Checks: bundle budget, hydration identity for claim pages and `?inspect=`,
  parse-is-identity, existing unit and browser suites.

**Stage 2. Evidence text to its own chunk.** Passages and locators load with
the claim panel, the reading pages, document pages, search and exports
(`preloadPage` by prefix). Records chunk about 5.6 MB raw, about 690 KB live.
Dossier about 6.5 s. Required before `key-papers` (1,221 claims, 1,221
passages) is admitted.

**Stage 3. Detail shards named by each page.** Qualifications, attributes,
entity descriptions and source links move to subject-keyed shards; the
renderer writes each page's shard list; search loads the qualification
column. Core about 3.9 MB raw, about 440 KB live; dossier about 5 s. After the
eight packs the core returns to about today's size (about 870 KB live).

**Later, by budget, not by date** (the roadmap's phase 3): a static, chunked
search index when the search page exceeds its budget; per-page slices when
record pages exceed theirs; the Worker only when the file or build-time
triggers fire.

Sequencing with the packs: stage 1, then the small packs (`people`, `ai-bio`,
`technical-history`, `compute-power-orbit`) may proceed; stage 2 before
`key-papers`; stage 3 before the last two or three. Each admission runs the
budget test, so a pack that breaks it waits for the next stage or a recorded
decision to raise the budget.

The time estimates come from a linear model of today's measurements (base
1.8 s, plus transfer at 180 KB/s, plus script) and must be re-measured at each
stage.

## Checks that keep it honest

1. **Bundle budget test** (`src/site/bundle-budget.test.ts`, run after
   `vite build` with `build.manifest: true`): for each page type (start,
   dossier, claim, search, explorer, a reading page) sum the gzip-9 size of
   the entry, the statically reachable chunks and the page's preloads. Fail
   above the set limit. Gzip at a fixed level is deterministic; brotli on the
   host is not under our control. Today a record page is about 1,410 KB gzip
   (records 1,162, code 232, styles 12, page code 3–6) and the start page about
   100 KB. Proposed limits, about 10% above each stage's expected result:
   start 120 KB; record pages 1,300 KB after stage 1, 1,100 KB after stage 2,
   800 KB after stage 3; search and reading pages 1,350 KB from stage 2.
   Raising a limit is a commit of its own with a line in the roadmap.
2. **Hydration identity** (`src/prerender/hydration.test.ts`): for a sample of
   every page type, render once with the full dataset and once with what the
   browser would hold at hydration (core plus the page's preloads); the HTML
   must be identical.
3. **Parse is identity**: `datasetSchema.parse(raw)` deep-equals `raw` for the
   current data, so skipping it in the browser hides nothing.
4. **Split completeness**: core plus every detail part reassembles each record
   exactly; no field is lost or duplicated.
5. **Load measurement** (`scripts/measure-load.ts`, outside `pnpm check`
   because timings vary): the phone-profile run used here, recorded at each
   dataset release next to the phase-3 trigger check.
6. Existing: `scripts/prerender.ts` file budget (15,000), the `_headers`
   coverage test, the unit and browser suites.

## Decisions for the maintainer

1. Accept design (a) with the staged rollout, and (c)'s parts only when the
   budget test calls for them? Or go straight to (c), holding the packs for
   8–12 sessions?
2. Pack order against the stages, as proposed above, or hold all packs until
   stage 2?
3. The budget limits, and whether exceeding one blocks an admission or only
   needs a recorded decision.
4. A brief loading line on the first claim panel per visit, in exchange for
   faster pages. Acceptable?
5. Whether the start page should keep prefetching the records when focus or a
   pointer reaches any link (helps the next page, costs 1 MB to a reader who
   only tabs through it), or prefetch only the core after stage 1.

## Method

Built with `pnpm build` on Linux (Node 22). Sizes from Node's `zlib`. Field
sizes compress each field's values alone, so they show relative weight and do
not sum to the total. The throttled runs used Playwright's Chromium with CDP
CPU and network emulation; the scripts were run from a scratch directory and
are not tracked. Stage 1 adds the measurement script to `scripts/`. Pack
counts are from `research/<pack>/pack.json` on each pack branch as of
2026-10-30.
