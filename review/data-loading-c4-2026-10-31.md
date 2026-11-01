# Data loading, stage c4: pages without the relation core (2026-10-31)

Fifth stage of design (c) ([`docs/data-loading-design-c.md`](../docs/data-loading-design-c.md),
section 3a), branch `data-c4-core` from `main` at `7ee3888` (after pack C,
v0.15.0). No data, release, export, header or hosting setting changed.
Nothing was deployed.

## The problem

With pack C admitted every page type was within about 26 KB of its budget
(the collection page within 14 KB). Every page drawn from a slice loaded the
relation core (`virtual:records-core`, 245 KB gzip-9: a few fields of every
record), which grows with every admission. The pending packs (people, 83
claims; AI in biology, 256; key papers, 1,221) would have pushed every page
over its limit.

## What each page used (measured first)

Rendering each sample page traced with every record noting reads of its
relation fields too: every page reads the relation fields of every claim and
entity (scans such as "claims whose subject or object is X"), so the core
cannot be cut by reads alone. Drawing each page instead from only the
records whose other fields it reads, with their relation fields, passed at
once for claim pages (87 of 87 sampled), the document histories and the
hubs, and failed for dossiers (source counts over passages), person and
document pages (a lookup that assumed every collection claim is held),
collection pages (views of every collection computed at once), the explorer
(dataset-wide counts) and About & method (coverage figures). Each failure had
a specific cause, fixed below.

The hubs' slice (361 KB, every record) came only from tracing the page
description, which counts every collection; the browser reads only the
title. About & method's slice (193 KB) held every claim and passage for its
coverage figures.

## What changed

- **Slices stand alone** (`sliceOf`, `neighbourhood` in
  `src/prerender/trace.ts`; `renderSlice` and `checkSlice` in
  `src/prerender/render.tsx`). The build takes, for each page, the first
  slice that draws it as built in all three ways (built, 1440 px, 390 px):
  1. the records read, each with its relation fields and the other fields
     read, plus the other versions of each document version named;
  2. those and their neighbourhood: each claim's passages, subject and
     object, each passage's claim and source, each source's publisher and
     document;
  3. the records read without relation fields, with `core: true`: the
     browser then loads the relation core before holding the slice
     (`loadPart` in `src/ui/records.ts`).
     A page that fails all three fails the build, as before. **Today every
     page passes with form 1 or 2; no page needs the core.** The build log
     counts them.
- **Selections by relation** (`selected` in `src/domain/memo.ts`): values
  chosen by relation fields alone (the explorer's counts, a framework
  family's versions, a claim drawn only by its route, the claims the
  commitments page names) are marked, and the renderer counts them as used.
- **Dataset-wide values** from the build: totals and entity types
  (`virtual:site-facts`); About & method's coverage, release check, China
  scope and reading-page counts (`virtual:about-facts`,
  `src/domain/about-facts.ts`). The browser reads only a page's title; a
  hub's description, which counts every collection, is now computed only
  when read (`describedLater` in `src/prerender/pages.ts`), so tracing the
  hub's title reads no records. Other pages' descriptions are still built,
  and traced, with the title; they read records the page shows anyway.
- **Per-page collection views** (`viewsById` in `src/Workspace.tsx`), and
  `appearances` skips claims a page does not hold.
- **Collection index** loads with the first part (`src/main.tsx`), not on
  the start and search pages, which hold none.
- **HTML**: byte-identical to `main` on all 4,537 pages apart from
  `/assets/` tags (`scripts/page-hashes.ts`); pages no longer name the core
  among their opening scripts. Two JSX lines keep their old text split for
  this (marked in `Inspector.tsx` and `About.tsx`).
- **Budget** (`src/site/bundle-budget.ts`): the comparison, the
  frameworks-and-law guide and the largest propositions page, the largest
  pages, are measured too; a page whose slice says
  `core` is measured with the core.

## Sizes

Gzip-9 KB before the page answers input (`pnpm build`; c4 from the last
`pnpm check`, on `786c6e4`).

| Page type                                  |  c3 (`main`) |    c4 | Limit, before | Limit, c4 |
| ------------------------------------------ | -----------: | ----: | ------------: | --------: |
| Start page                                 |        107.0 | 107.0 |           115 |       115 |
| Hub `/governance`                          |        864.4 | 266.9 |           890 |       295 |
| About & method                             |        774.1 | 301.3 |           800 |       330 |
| Search                                     |        257.2 | 257.6 |           275 |       275 |
| Explorer                                   |        529.3 | 297.2 |           550 |       330 |
| Dossier `/dossier/openai`                  |        549.4 | 327.5 |           570 |       360 |
| Person `/person/jan-leike`                 |        511.7 | 267.8 |           530 |       295 |
| Document `/document/rsp-v2-0`              |        521.1 | 280.9 |           540 |       310 |
| Claim `/claim/dario-anthropic-2021`        |        533.1 | 294.0 |           555 |       325 |
| Collection `/documents/frontier-safety-…`  |        560.9 | 333.0 |           575 |       370 |
| Comparison `/compare/frontier-safety-…`    | about 629 \* | 471.0 |             — |       520 |
| Guide `/guide/frontier-frameworks-and-law` | about 733 \* | 574.2 |             — |       630 |
| Propositions `/propositions/economics-…`   | about 614 \* | 413.7 |             — |       455 |

\* Not measured on `main` (not in its budget): its slice plus the core plus
the same code.

Slice files (gzip-9 KB, all files of each kind):

| Kind          | Files | Median, c3 | Median, c4 | Largest, c3 | Largest, c4 |
| ------------- | ----: | ---------: | ---------: | ----------: | ----------: |
| Claim buckets |   128 |       21.5 |       25.7 |        35.3 |        42.5 |
| Person        |   326 |        0.8 |        1.0 |        11.6 |        16.2 |
| Document      |   577 |        1.2 |        1.6 |        10.1 |        14.3 |
| Dossier       |   175 |        8.5 |       10.0 |        41.3 |        64.0 |
| Propositions  |     5 |       83.9 |      134.0 |       102.0 |       146.6 |
| Hubs          |     1 |      361.0 |        6.9 |             |             |
| About         |     1 |      192.8 |        0.1 |             |             |
| Explorer      |     1 |       24.9 |       37.2 |             |             |

A slice grows by the relation fields it now carries; each page sheds the
245 KB core. All slices: 33.1 MB raw before, 46.5 MB now; `dist/` 6,262
files either way.

## What still grows with the dataset

On a page's first load: the claim bucket (claims ÷ 128), the collection index
(41.4 KB) and the search facets' collection lists (15.4 KB), both with
collection membership rather than with every record; the start page's
summary (9.3 KB, in the entry script); the explorer's default view
(organisations and infrastructure). A page's own slice grows only when an
admission adds records about what the page shows.

## Projection after the pending packs

Inputs: the packs' `pack.json` on `people-pack`, `ai-in-biology-pack` and
`key-papers-pack`. Claims whose subject or object is a sample page's record:
OpenAI 0, Jan Leike 2 (key papers), RSP v2.0 0, Anthropic 1 (people), Dario
Amodei 9 (key papers). Explorer default view: 33 new claims among
organisations and infrastructure, all from AI in biology (+11% on 291).
Upper bounds used: start-page summary ×1.45 (+4.2 KB, every page); claim
buckets ×1.45 with the claim count (+15.6 KB); search types and
organisations (+1 KB); explorer slice +11% (+4.1 KB); person +2 KB.

| Page type    |    c4 | Three packs | Limit | Scenario B |
| ------------ | ----: | ----------: | ----: | ---------: |
| Start page   | 107.0 |       111.2 |   115 |      111.2 |
| Hub          | 266.9 |       271.1 |   295 |      292.6 |
| About        | 301.3 |       305.5 |   330 |      327.0 |
| Search       | 257.6 |       262.8 |   275 |      272.8 |
| Explorer     | 297.2 |       305.5 |   330 |      327.0 |
| Dossier      | 327.5 |       331.7 |   360 |      353.2 |
| Person       | 267.8 |       274.0 |   295 |  **295.5** |
| Document     | 280.9 |       285.1 |   310 |      306.6 |
| Claim        | 294.0 |       313.8 |   325 |  **335.3** |
| Collection   | 333.0 |       337.2 |   370 |      358.7 |
| Comparison   | 471.0 |       475.2 |   520 |      496.7 |
| Guide        | 574.2 |       578.4 |   630 |      599.9 |
| Propositions | 413.7 |       417.9 |   455 |      439.4 |

**Every page type fits after the three named packs.** Scenario B adds a
collection holding all 1,221 key-papers claims (collection index about
+21.5 KB, search facets about +10 KB): the claim and person pages would
exceed their limits. Nothing in the key-papers pack proposes such a
collection today. What would fix it: give each slice only the collection
index entries of its own claims (the index is the last dataset-wide module
every sliced page loads), or pack claim slices into 256 buckets (about
−17 KB on claim pages, 128 more files). All eight pending packs (2,611
claims, ×1.76) would put the claim page at about 327 KB, just over its
limit; 256 buckets would cover that too.

## Build time

On this machine (4 processors): `pnpm build` 155 s on `main` (one run, the
first build of the session), 104–121 s on c4; pre-rendering 75.5 s on
`main`, 51–61 s on c4 (61.4 s in the last check; 63.0 s in the build that
forced the core on one page). Checking a page from a slice without the core
is cheaper than overlaying the core, though a page whose first slice fails
is checked twice. The main thread's memory stays at about 0.2 GB
(`PRERENDER_MEMORY=1` prints it). The deploy is far from Cloudflare's
20-minute limit.

## Measurements

Phone profile (`tsx scripts/measure-load.ts --runs 3`): 4× CPU, Fast 3G,
390 × 844, cold cache, brotli 5, median of three; milliseconds. "Before" is
`main` at `7ee3888`, measured on the same machine in this session; "after"
is the build of `78e1ca7`, with the start page and search measured again
after `786c6e4` (the collection index loads with the first part).

| Page                                    | Interactive, before |     after | Transferred, before → after | JS heap, before → after |
| --------------------------------------- | ------------------: | --------: | --------------------------: | ----------------------: |
| `/governance`                           |               7,781 | **3,475** |                723 → 251 KB |               26 → 5 MB |
| `/about`                                |               5,947 | **3,804** |                665 → 285 KB |               21 → 6 MB |
| `/explore`                              |               4,452 |     4,124 |                460 → 279 KB |               18 → 6 MB |
| `/dossier/openai`                       |               4,588 |     4,205 |                507 → 334 KB |               20 → 9 MB |
| `/person/jan-leike`                     |               4,576 | **3,953** |                447 → 255 KB |               17 → 5 MB |
| `/document/rsp-v2-0`                    |               4,710 |     4,134 |                459 → 270 KB |               18 → 6 MB |
| `/claim/dario-anthropic-2021`           |               4,093 | **3,611** |                462 → 274 KB |               18 → 5 MB |
| `/documents/frontier-safety-frameworks` |               4,940 |     4,476 |                521 → 342 KB |              22 → 10 MB |
| `/compare/frontier-safety-frameworks`   |                     |     5,199 |                      445 KB |                    8 MB |
| `/guide/frontier-frameworks-and-law`    |                     |     6,585 |                      551 KB |                   15 MB |
| `/search#q=responsible scaling`         |               3,681 |     3,702 |                491 → 456 KB |              13 → 12 MB |
| `/`                                     |               2,058 |     2,126 |                106 → 104 KB |                4 → 3 MB |

First paint is unchanged (1.5–2.0 s; 2.4 s on the guide). Search results
appear at 7.5 s, as before. The guide is now the slowest page; its slice is
the largest (see "What is left").

## Gates and checks

- **Hydration identity**: every page is drawn from the slice it ships, in
  all three ways, by the build; the unit test samples every page type, pages
  with three other slices held, claim panels from their buckets over pages
  drawn without the core, and (new) every page of a whole claim bucket and of
  the shared hub file drawn from the merged file.
- **Split completeness** (`src/site/split.test.ts`): slice records carry the
  dataset's values and every relation field; the neighbourhood holds each
  claim's passages, subject and object and each passage's claim and source;
  the core and content still assemble to the dataset.
- **Search identity**: unchanged code; the existing tests pass.
- **Fallback exercised once**: with one claim forced to need the core (a
  temporary patch, not committed), the build named it, all 31 pages of its
  bucket named the core among their opening scripts, no other page did, and
  the budget failed the build (Claim 538.8 KB of 325).
- `pnpm -s check`: passed (715 unit tests; build with every page checked),
  last on `786c6e4`.
- `pnpm -s check:privacy`: passed.
- Browser suite (Chromium, untracked config without `channel: 'msedge'`,
  deleted afterwards; no other server on port 4173): **245 passed
  (29.8 min)** on the build of `f6be47b`, and **245 passed (31.7 min)** on
  the build of `78e1ca7` (later commits change only budget limits and the
  record, except `786c6e4`, after which the search, per-page-data,
  pre-render, history-navigation and hub specs passed again: 67 tests).
- Inspection at 1440 and 390 px (hubs, About, explorer, dossier, person,
  document, claim, document history, comparison, guide, question,
  commitments): no horizontal overflow, no page redrawn in the browser, each
  page fetching only the collection index and its own slice; the only
  console error is the blocked analytics beacon. A claim link on a person
  page fetched only the claim's bucket.

## Review

A fresh-context adversarial review of the first three commits found no
fault in what the build checks, and five weaknesses in the fallback path and
in states the build does not check. All are fixed (`78e1ca7`):

1. A part whose core failed to load was never tried again (the slice stayed
   refused for the visit). It is now retried; tested with stub files.
2. The budget did not count the core for an example page that falls back.
   It does now; tested.
3. A page sharing a file (a claim bucket, the hubs) with a page that needs
   the core did not name the core among its opening scripts. It does now;
   exercised by the forced fallback above.
4. Merged files were not checked as the browser fetches them: the hydration
   test now draws every page of a claim bucket and of the hub file from the
   merged file.
5. Nothing exercised the fallback machinery: unit tests now do.

It checked and ruled out: `selected` leaking between pages traced in one
thread, `viewsById` reusing values across sets of records, the hub
description in the browser, the About facts against the old figures, and
unions of slices (a scan right on a page's slice stays right on any larger
part of the dataset; no rendered path negates over the set it scans).

## What is left

- **Navigation between pages drawn from slices** still loads the whole
  records (core and content, about 1.4 MB gzip) on a held click, and
  pointing at any control prefetches them. A design panel (three designs,
  three judges) recommends: a link to a page with a slice loads only that
  slice and draws the page **exactly as a fresh load of its address** (the
  store holds only that page's parts, React state from the same function a
  fresh load uses, page content remounted), so no page is ever drawn from a
  union of page slices; claim buckets fetched for a page left behind are
  dropped; the build also checks that the title drawn from the slice equals
  the full title. About 200 lines over seven files, with vitest and
  Playwright tests comparing in-app navigation with a fresh load.
  **Maintainer decision needed:** in slice mode a link would then open the
  page as a fresh load does: a bookmark resume and an open claim panel are
  not carried over, and filters reset. The panel also found that on a claim
  page drawn from its slice, the link to the claim's organisation draws the
  explorer instead of the dossier (`selectEntity` leaves the claim view);
  that is an existing bug, not fixed here.
- **Per-page collection index** (see the projection): the remaining lever if
  a large collection is admitted.
- **Claim buckets**: 256 instead of 128 if all eight packs are admitted.
- **The frameworks-and-law guide**, the largest page (574 KB), uses the
  neighbourhood form (2) and reads a field of every passage, so its slice
  (301 KB) holds every passage's relation fields. A site fact could replace
  that read.
