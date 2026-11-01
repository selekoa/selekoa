# Data loading, design (c): specification (2026-10-30)

Maintainer decision of 2026-10-30: implement design (c) of
[`data-loading-plan.md`](data-loading-plan.md) (branch `data-loading-plan`,
PR 94): a static, chunked search index and per-page data, without a Worker.
This document specifies it. It changes no data, release, export or hosting
setting. Measured on `main` at `1875b85` (#96): 3,246 claims, 4,458 evidence
items, 1,037 sources, 1,202 entities, 4,294 pre-rendered pages.

## Constraints

1. **Pure renderer.** `renderPage(path, template, baseUrl)` stays a pure
   function of the bundled release data and the path. The renderer keeps the
   whole dataset. Every file the browser fetches is a function of data and
   path, written by the build.
2. **Byte identity.** Built HTML stays byte-identical to `main` except where a
   stage lists a change. Hashed asset names in the template's script and link
   tags change with any code change; the comparison
   (`scripts/page-hashes.ts`, stage c0) replaces `/assets/<name>-<hash>.<ext>`
   with `/assets/<name>.<ext>` before hashing and compares everything else.
3. **Addresses.** `#q=`, the "Pages" search group, `?inspect=`, `?edition=`,
   `?section=`, `?claim=`, start-page links and old hash forms keep working.
4. **Unchanged:** exports, research starters, release files,
   `pnpm release --check`, reading without scripts.
5. **Hosting:** at most 20,000 files and 25 MiB per file; the 15,000-file
   budget in `scripts/prerender.ts` stays. New hashed files go under
   `/assets/` (immutable rule already present). Any unhashed file gets an
   explicit `public/_headers` rule.

## 1. Search index (stage c1)

Search must reproduce `searchRecords(createSearchIndex(data), query, filters)`
exactly: the same hits, scores, snippets, groups and order. An index that
decides matches by itself would have to copy every detail of `occurrences`
(word starts, whole words for one-letter terms, the eight-occurrence limit
that decides "whole", phrases, unspaced scripts matched anywhere). It does not
try. The index only finds **candidates**, a superset of the matches; the
existing scoring code then runs unchanged on the candidates' text.

### Candidate postings

- Words are the maximal runs of word characters (`isWordChar`) in the folded
  text of every searched field (statement, qualification, passage, locator,
  title, name, short name, alias, record ID). 12,343 distinct words, 9,943
  records today.
- Characters of unspaced scripts (Han, Hiragana, Katakana, Hangul) are also
  indexed one by one, since such a term matches anywhere.
- A posting list is the sorted record ordinals containing the word,
  delta-encoded. All postings: 1,002 KB raw, 331 KB gzip-9.
- **Chunking: sorted word ranges.** Words are sorted by code unit, and the
  sorted list is cut into files of about 8 KB gzip (about 45 files). The
  search manifest lists the first word of each file. Every word with a given
  prefix lies in one contiguous range, so a term needs one file, rarely two.
  The two-letter prefix scheme of the plan gives 1,017 files (median 61 bytes,
  largest 65 KB): too many files, uneven sizes. Kind-based chunks would make
  every query load every kind.
- **Candidates for a term.** The term is split into word runs `r1…rk`. A
  match starts at a word start, so `r1…r(k-1)` are whole words and `rk` is a
  word prefix (`r1` is a prefix when `k = 1`). A one-character term is a whole
  word. A term beginning with an unspaced character uses the postings of each
  of its unspaced characters. The candidates of the query are the
  intersection over terms. Every match is a candidate by construction; the
  test below checks it on the query set.

### Record chunks

- Each searchable record (claim, passage, source, entity) is stored once, as
  the fields `IndexedRecord` needs (type, id, claim id, field texts, years,
  sort date, status, date label, source ids, entity type) plus the trimmed
  records that `Search.tsx` reads to draw a hit: claim (statement, subject,
  derivation, resolution), evidence (passage, passage type, locator, support,
  context-only note, source), source (title, publisher, publication date,
  links the archive link reads), entity (type, subtype, name, short name,
  document version's publisher), and the subject, publisher, first source and
  citing claims each hit names. Records named by several chunks are
  repeated in each, trimmed.
- **Chunking: by subject.** Claims and their passages are ordered by the
  claim's subject, sources by publisher, entities by type; the order is cut
  into chunks of about 16 KB gzip (about 50 files). Record ordinals follow
  this order, so a chunk is an ordinal range in the manifest. Measured with
  today's records, a query touches far fewer chunks than with chunks by ID
  ("ASL-3": 5 of 43 against 14; "responsible scaling": 11 against 16).
  Common words still touch many chunks: "OpenAI" (774 hits) touches 35 of 43.
  Text of all records is 657 KB gzip; a common query loads up to most of it,
  a rare one a few chunks.
- **Filters.** `claimIds` and `entityIds` of every record (1,252 KB raw,
  181 KB gzip) are not in the chunks. The facets file holds each collection's
  claim ids and the organisation list; the organisation filter loads one small
  file per organisation (`search-org-<n>`) with the ordinals that pass, made
  from the same `entityIds`. Year filters use the years in the chunks.
- **Facets** (`search-facets`, one file): the collection list with labels and
  claim ids, the organisation list, the year list, the document names shared
  by several records and the "Pages" entries (`searchablePages(data)`). The
  search page needs only this file to draw its filters, so it becomes
  interactive without any record.

### Files and loading

Every file is a JavaScript module generated by a Vite plugin
(`scripts/search-index.ts`) as `virtual:search/<part>`, so Vite hashes it into
`/assets/`, the dev server serves it, and the immutable rule covers it. No
`_headers` change. The manifest module (`virtual:search/manifest`: word-range
boundaries, ordinal ranges, loaders) is part of the Search page's code. About
45 + 50 + 1 + one per organisation in the filter (≈ 120) files: about 220.

The browser engine (`src/domain/search-engine.ts`, pure, with an injected
loader): parse the query (`parseQuery`), load the posting files of its terms,
compute candidates, apply the filters that need no text, load the chunks of the
candidates, build their `IndexedRecord`s with `foldText`, and run
`searchRecords` on them. Loaded files are cached for the visit. The same engine
runs in Node over the built files for the identity test. The renderer and the
explorer keep `createSearchIndex` over the full dataset (the explorer's names
lookup moves with the explorer in c3).

### Search page

- `Search` receives a search source (`src/ui/search-source.ts`) instead of
  the repository and index: facets, and a promise of results per query and
  filters, read with `use`. The query and filters go through
  `useDeferredValue`, so the results in view stay while the next ones load,
  and the status says "Searching…". The hit renderer is unchanged: it reads a
  partial repository built from the loaded chunks, records in the dataset's
  order (each chunk lists where its records stand).
- The browser's source is the static index; the renderer and the tests use
  the whole dataset in memory (`src/ui/memory-search.ts`).
- On `/search` the workspace runs without the records chunk (the records
  store below holds none). Opening a claim panel from a result, or leaving
  for another page, first loads the records chunk, as every other page does
  in c1.
- Built `/search` HTML is unchanged; the hydration-identity test renders
  `/search` with no records and the facets and compares it with the full
  render.

## 2. Per-page data (stage c2)

### The relation core

Every page drawn from a slice also holds the **relation core**
(`coreFields` in `src/domain/slices.ts`): every record with only the fields
pages read to choose and order records: a claim's ID, subject, predicate,
object, topic and time; an evidence item's ID, claim and source; a source's
ID, publisher and document; an entity's ID, type, proposition and document
version. With the core held, every scan over the dataset (the explorer's
filters, a dossier's selection, a count by topic or year) gives exactly the
result it gives over the whole dataset, and a slice only adds the other
fields of the records a page shows. The core is one hashed module
(`virtual:records-core`, 2.0 MB raw, 217 KB gzip), cached by the browser
across pages and deploys until the data changes. It is also the graph the
explorer and map need in c3. From stage c4 a page no longer loads
the core: its slice carries the relation fields of the records it needs
(section 3a).

### What a slice is

A **slice** is what rendering one page reads beyond the core: the records
whose other fields the render reads, with only those fields, and each
record's position in the dataset, so that slices put together keep the
dataset's order. It is computed, not declared. The build renders each page
twice more with an **instrumented dataset** (every record a proxy that notes
the fields read): once as built (server snapshot) and once as the browser
draws it after taking it over (`useInBrowser` true; `renderSettled` in
`src/ui/client.ts`). A record is in the slice if a field outside the core was
read; it carries every such field read. `meta` is one more record.

Why computed: 18 page modules read the repository through domain functions
that scan `data.claims`; declaring each page's selection by hand would copy
their logic and drift from it. Why verified: a value that reads records only
by ID or relation, or reuses a value computed earlier, could leave records
out. The build therefore **renders every page again from the core and its
slice** (both snapshots) and fails if either differs from the full render.

Two kinds of shared value need care:

- **Dataset-wide indexes** (the collections each claim and person appears in,
  each document's earliest-located marks, the chronicle's years and dates)
  would put every collection's records into the slice of any page that names
  them. The build computes them from the
  whole dataset (`src/domain/collection-index.ts`) and gives them to any
  partial dataset, in the renderer and the browser alike. From 2026-10-31
  each slice carries only the entries of the records it holds (`indexFor`;
  `review/risk-debate-admission-2026-10-31.md`, "Budgets"), and the parts
  held give theirs together. The chronicle's years and counts by topic are
  carried whole (any page resolves a year's address with them); its
  scheduled and stated dates only for the claims the slice holds.
- **Values computed once per dataset** (`remember` in `src/domain/memo.ts`,
  `perRecords`) are computed while drawing one page and reused for others. The
  renderer notes the reads made while computing each one and counts them again
  for every page that reuses it, so a single instrumented dataset serves the
  whole build. Pre-rendering took about 250 s instead of 16 s on four
  processors; spread over threads, with reads of the core not noted and a
  page drawn once for both widths when no width query differs, it takes
  about 36 s (`review/data-loading-c3-2026-10-30.md`, "Build time").

Workspace-level values computed from every record (`years`, `latestCheck`,
topic counts) come from `virtual:site-facts` (c1).

### Layout

- **Record pages and collections**: `slices/<kind>/<id>.json`, written by
  `scripts/prerender.ts` (dossiers, people, documents, document histories,
  the comparison, control structures, commitments, guides, propositions,
  questions).
- **Claim pages and claim panels**: claim slices are packed into 128 bucket
  files by a hash of the claim ID (`slices/claims/<n>.json`), to keep the file
  count: one file per claim would add 3,246 files now and about 5,900 after
  the pending packs. A claim page, `?inspect=` and a claim opened on a page
  drawn from its slice load the bucket.
- 1,170 files, 28 MB raw in all; `dist/` grows from 4,771 files (c1) to
  5,947.
- **Map layouts** (added after c5, `review/map-prebuilt-layouts-2026-10-31.md`):
  `slices/map/dossier/<id>.json` and `slices/map/person/<id>.json`, the
  positions of the map centred on each organisation and person as its page
  draws it, keyed by the records drawn (`layoutKey` in `src/ui/layout.ts`).
  They are not slices: records stay in the page's slice or the whole
  records.
- **Headers.** Slices are not hashed (a page must find the next page's slice by
  its path), so they get one rule: `/slices/*  Cache-Control: no-cache`, as
  pages have. Pages and slices change together on a deploy.
- **First load.** The built HTML of a page with a slice preloads it
  (`<link rel="preload" as="fetch" crossorigin>`), so the fetch runs in
  parallel with the scripts; the core and index modules are named with the
  page's other opening scripts (c1). The preload link is the listed HTML
  change of c2.

### The browser repository

`src/ui/records.ts` holds one store per visit, introduced in c1: a
`Repository` whose contents are replaced when more records are held, read at
the moment of use. In c1 it holds nothing or the whole records chunk; in c2
it holds the union of the parts loaded so far (slices, buckets, the records
chunk), with fields of the same record merged. The renderer holds the whole
dataset in the same store. No module imports `repository` as a value in the
browser bundle: `Workspace.tsx` and `Network.tsx` read the store;
module-level views are computed per set of records held (`perRecords`), and
values computed while rendering depend on `useHeldRecords()`, which changes
when other records are held. Dataset-wide values the explorer shows on every
page (years, latest check, topic counts) come from `virtual:site-facts`,
computed by the build.

Records load **before** a change of page, never during a render, and the
change is then drawn at once (`flushSync`), as one made in the event itself
would be. From stage c5 a link from a page drawn from its
slice to another page with a slice opens it from that slice alone (section
3b). What a page needs is a function of its address (`dataNeeds` in
`src/domain/slices.ts`): on a page with a slice, the core, its slice and, for
`?inspect=X`, X's bucket; on the search page nothing (X's bucket for
`inspect`); on any other page, or with any other query (a section, an
edition, a bookmarked claim), the records chunk.

On a page drawn from its slice, input is held until what it needs is held
(`src/ui/hold-until-records.ts`): a claim link (clicked, or Enter or Space)
waits for the claim's bucket; any other click, Enter or Space on a control,
arrow key on a tab, radio or select, and change to a select or field waits
for the records chunk, and is then given again (a held choice is set again,
so that React reads it). Pointing at or focusing a control starts the load.
Links within the page or to other sites, the theme switch and the header's
search act at once. So a reader who only reads a page, or opens its claims,
never loads the records chunk; the first other action loads it, as every
page did before (c3 replaces it). The search page's claim panel uses the
records chunk, as in c1, since its handlers are not held.

Parts never mix builds: the core and every slice carry the dataset's
version (`datasetVersion`), and a part of another version (a tab kept open
across a deploy) is refused. A part that cannot be loaded, or is refused,
is replaced by the records chunk, before hydration as after it.

### Hydration

`App` preloads the page code (with a propositions page's collection,
whole), the core, the slice with its collection index entries and, for
`?inspect=`, the bucket before `hydrateRoot`, so the first render
reads what the build's check rendered. The build checks every page; the
unit test (`src/prerender/hydration.test.ts`) checks a sample of every page
type, the same pages with three other pages' slices held as well, and claim
panels drawn from their buckets.

## 3. The explorer and the rest (stage c3)

- **Graph chunk**: the relation core of c2 is the graph the explorer, map and
  timeline read. The explorer, the three hubs (one shared slice, since they
  read the same records) and About & method get slices like every other
  page, so every built page but the start and search pages is taken over
  from the core and its slice.
- **No monolithic records chunk.** The whole records are the core put
  together with a content module (`virtual:records-content`: every field the
  core leaves out, each record in its stored field order, with `meta`), by
  `assemble` in `src/domain/slices.ts`, without validation in the browser
  (the build has validated the data). The browser no longer imports
  `src/domain/repository.ts` or the data files (About & method still loads
  the schema module, which its coverage counts import).
- **Exports in the browser** (starters, references) read the whole records,
  as before: their buttons are held until the content has loaded, and the
  assembled records are identical to the validated dataset, field order
  included (tested), so files are byte-identical.
- Kept for later: navigation between pages drawn from slices still loads the
  whole records first (a held click); loading the next page's slice instead
  needs each change of page to name its address before it runs. Done in
  stage c5 (section 3b).

## 3a. Pages without the relation core (stage c4)

Branch `data-c4-core` from `main` (2026-10-31), after pack C (v0.15.0).
With C admitted every page type was within about 26 KB of its budget, and
the relation core, which every page loaded, grows with every record. Stage
c4 makes a page's initial load depend on the page's own records rather than
on the whole dataset. Record: `review/data-loading-c4-2026-10-31.md`.

- **A slice stands alone.** A slice holds the records the page reads beyond
  the core, as before, each now with its relation-core fields, plus the
  other versions of each document version named. When those alone draw the
  page differently, it also holds their **neighbourhood**: each claim's
  passages, subject and object; each passage's claim and source; each
  source's publisher and document (`sliceOf` and `neighbourhood` in
  `src/prerender/trace.ts`). A scan over the slice then finds, for the
  records the page names, what it finds over the whole dataset.
- **Selections by relation.** A value computed from relation fields alone
  (the explorer's counts, a claim drawn only by its route, the claims a
  collection names by ID) reads no other field of its records, so tracing
  cannot tell which records it chose. The code says so with `selected`
  (`src/domain/memo.ts`), which the renderer counts as a read.
- **Checked alone, with a fallback.** The build draws every page from its
  slice alone (both snapshots), taking the first form that draws it as
  built: the records read, then those with their neighbourhood
  (`renderSlice` in `src/prerender/render.tsx`). A page that draws
  differently with both is drawn again with the whole core; its slice then holds only the records read, as in
  c3, and says `core: true`, and the browser loads the core module before it
  holds that slice (`loadPart` in `src/ui/records.ts`). The build log counts
  such pages (none today); a page that fails both checks fails the build.
- **Dataset-wide values** move to modules the build computes: totals and
  entity types (`virtual:site-facts`), and About & method's coverage
  figures, release check, China scope and reading-page counts
  (`virtual:about-facts`, `src/domain/about-facts.ts`). The hubs' slice held
  every record only because the page's description was traced; the browser
  reads only a page's title, and a hub's description is now computed only
  when read.
- **Collection views** are computed for the page shown (`viewsById` in
  `src/Workspace.tsx`), not every collection's at once.
- **The collection index** loads with the first part held, so the start
  and search pages no longer download it. (From 2026-10-31 a slice carries
  its own entries instead.)
- **Unchanged:** the whole records (core and content) for exports, starters
  and any input on a page drawn from its slice; built HTML (byte-identical to
  `main` apart from `/assets/` tags; pages no longer name the core module
  among their opening scripts); addresses, exports and releases.

What still grows with the dataset on a page's first load: a claim bucket
(claims ÷ 128), the search facets (with collection membership), the start
page's summary, the explorer's default view (organisations and
infrastructure), and the reading definitions other than propositions
collections, which every page's shared code holds whole. A propositions
collection's text loads only with its page (2026-10-31).

## 3b. Navigation from slices (stage c5)

Branch `data-c5-navigation` from `main` (2026-10-31), after c4 (PR 106).
Maintainer decision of 2026-10-31: slice-only navigation, as the c4 design
panel recommended. Record: `review/data-loading-c5-2026-10-31.md`.

- **A link opens its page as a fresh load of its address.** On a page drawn
  from its slice, a plain click on a link (or Enter on it) whose address has
  a slice, or needs no records (search), loads only that address's parts
  (`dataNeeds`: its slice, a claim bucket for `?inspect=`, the core only if a
  slice says so) and the page's code; the page in view stays meanwhile. Then,
  in one render, the store holds those parts and nothing else
  (`partsFor` and `holdOnly` in `src/ui/records.ts`), the address is pushed,
  and App mounts the workspace afresh at the address's path
  (`src/ui/page-visits.ts`, `key` in `src/App.tsx`). The workspace takes its
  state from `locationState`, as a fresh load does, and applies the query in
  the same effect. No page is drawn from the parts of several pages.
- **Back and forward** to such an address do the same, without a new history
  entry (`restore` in `src/Workspace.tsx`), and return to where the reader
  was on that page (kept in the history entry's state). While they load, the
  page left writes no address of its own.
- **Order.** A visit gives way to a later one, and a link's visit to any
  change of address the reader made in place while it loaded. A restore
  still loading for a workspace that a link replaced gives way too.
- **Links to the page in view** open it afresh like any other link, except
  on the search page, whose link to its own list keeps the reader's order
  and filters.
- **Parts of the page left are dropped**: its slice and claim panels'
  buckets leave the store, and their fetched files are forgotten; a bucket
  still loading for a page left is not held when it arrives, and input held
  on a page left is not given again.
- **Pointing at or focusing such a link** fetches only its page's parts and
  code, without holding them. Pointing at any other control still loads the
  whole records.
- **A part of another build** (a tab kept open across a deploy) is refused
  against the build's own dataset fingerprint (`version` in
  `virtual:site-facts`); a link whose parts cannot be loaded or are refused
  becomes an ordinary page load of its address, and a step back or forward a
  reload.
- **The title** a link sets is read from the next page's slice; the build
  now also checks it against the title from the whole dataset (`checkSlice`
  in `src/prerender/render.tsx`).
- **Sections.** A link's fragment naming a section of the page (a
  proposition on its collection page, `recordPath`; How this was checked,
  from the header's "What this means →") is where the page opens, with focus
  on the section's heading; the address pushed is the page's. Those two
  links carry the fragment from c5: the only changes to built HTML.
- **A cursor that has not moved** since a page was opened beneath it
  prefetches nothing: the browser reports it as over whatever control the
  new page put there.
- **Accepted cost:** a link opens its page as a fresh load does. A bookmark
  resume, an open claim panel, chosen filters, a scroll to a collection row
  opened from a claim page and focus kept on the previous page do not carry
  over.

Where the whole records still load (each because the page or action reads
records its slice does not hold):

1. Any input other than a link on a page drawn from its slice: filters,
   tabs, selects, fields, buttons such as Close, map and timeline switches,
   exports and research starters (`src/ui/hold-until-records.ts`).
2. Links to addresses without a slice: the start page (`/`); any query other
   than `inspect` (a section, an edition, a bookmarked claim, a dossier's
   map); the explorer's search and timeline addresses (`/explore#…`).
3. Records without a page of their own, drawn as buttons rather than links
   (such as an organisation in the explorer, which becomes its focus).
4. On the search page: the claim panel and any change of page that is not a
   link (its handlers wait for the records, as in c1).
5. The start page's actions, which open the workspace with the whole records
   (`App`), as before.
6. A page taken over at its own address whose slice cannot be loaded.

Once the whole records are held, every change of page is made in place, as
before c5.

## 4. Consumers and their migration

| Consumer                                                                                 | c1                                                    | c2                                                      | c3                       |
| ---------------------------------------------------------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------- | ------------------------ |
| `Search.tsx`                                                                             | engine and facets                                     | —                                                       | —                        |
| `Workspace.tsx`                                                                          | records store and site facts, no records on `/search` | slices before each change of page                       | graph chunk              |
| Dossier, person, document, claim pages                                                   | —                                                     | slices                                                  | —                        |
| Collections (history, comparison, control, commitments, guides, propositions, questions) | —                                                     | slices                                                  | export files             |
| `Inspector.tsx` (claim panel)                                                            | —                                                     | claim buckets                                           | —                        |
| `Network.tsx` (map)                                                                      | records store                                         | —                                                       | graph chunk              |
| Explorer list, timeline, explorer lookup                                                 | —                                                     | records chunk                                           | graph chunk + buckets    |
| `ReferenceActions.tsx` exports                                                           | —                                                     | records chunk                                           | export files and buckets |
| About & method                                                                           | —                                                     | records chunk                                           | site facts               |
| Start page                                                                               | unchanged                                             | unchanged (prefetches the slice of the link pointed at) | —                        |

## 5. Stages and their gates

Branches `data-c0-gates`, `data-c1-search`, `data-c2-pages`,
`data-c3-rest`, each from the previous. Each stage runs `pnpm -s check`,
`pnpm -s check:privacy`, the full browser suite (Chromium, untracked config),
an inspection at 1440 and 390 px, the page-hash comparison against the
previous stage, and records measurements in
`review/data-loading-c<n>-2026-10-30.md`.

| Stage | Gate                                                                                                                                                                                                                            |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| c0    | The gates themselves, green on today's code: bundle budget (limits at today's sizes plus 5%), hydration identity, split completeness, page hashes, load measurement recorded.                                                   |
| c1    | Search identity on ≥ 200 queries (with filters, whole words, names mode, date order), the existing search tests, no record in the `/search` budget, `/search` interactive well under 4 s on the phone profile. HTML: no change. |
| c2    | Hydration identity of every page from its slice at build (both snapshots), a sample in the unit test, slices within budget, record pages' budget without the records chunk. HTML: `data-slice` and the preload link only.       |
| c3    | No records chunk in the browser bundle; exports and starters byte-identical to the release-built files; explorer, map and timeline tests. HTML: none beyond c2.                                                                 |

**Bundle budget** (`src/site/bundle-budget.ts`, enforced by
`scripts/bundle-budget.ts` at the end of `pnpm build`, unit-tested on a small
manifest): for each page type (start, hub, about, search, explorer, dossier,
person, document, claim, collection) the gzip-9 sum of the entry and its static
imports, the stylesheet, the dynamically imported modules the page loads before
it is interactive (`Workspace`, the page code of `page-modules.tsx`, the
records chunk while it is loaded) and the data files of a sample page (slice,
bucket, search facets). Limits sit about 5–10% above each stage's result; a
stage lowers them, and raising one is a commit of its own.

**Hydration identity** (`src/prerender/hydration.test.ts`): for a sample of
every page type, render the page with the full dataset and with what the
browser holds at hydration (`browserData(path)`: c0 the records chunk for every
page but the start page; c1 nothing for `/search`; c2 the slice), and require
equal HTML.

**Split completeness** (`src/site/split.test.ts`): the parts the browser can
load reassemble the dataset as the browser uses it. c0: the records chunk
equals the five data files. c1: every searchable record is in exactly one
record chunk with the fields the index uses; every word of every record's
fields has a posting naming it. c2: every slice record's fields equal the
dataset's; the union of all slices and buckets holds every record a page
shows.

**Load measurement** (`scripts/measure-load.ts`, outside `pnpm check`):
Playwright Chromium, cold cache, 390 × 844, CPU 4×, DevTools "Fast 3G"
(562.5 ms round trip, 1.44 Mbit/s down, 675 kbit/s up), `dist/` served with
brotli 5 and `/x` → `x.html`, third-party requests blocked, median of three.
Reports first paint, interactive (`html[data-selekoa-ready]`), first search
results, blocking time, bytes transferred and JS heap for start, dossier,
person, document, claim, search with `#q=responsible scaling`, explorer.

## 6. Risks

- **Hydration mismatch** (a field the page shows is missing from what it
  loaded): React would redraw the page with a loading notice. Caught by the
  build's full identity check, not only the sample.
- **Proxy-recorded slices miss a relation-only use** (a count of records read
  only through `subject`): caught by the same check; the fix is to read the
  value from site facts or to name the field in the recorder's exceptions.
- **The browser's union of slices** could, in principle, differ from the full
  data for a page reached by navigation (not hydration). The unit test also
  renders sampled pages from their slice merged with random other slices.
- **Navigation gains a round trip** (560 ms on the phone profile). Mitigated
  by prefetching the slice of the link pointed at or focused, as the start page
  prefetches today.
- **Common search words load most record chunks** (up to about 650 KB gzip).
  Rare words and names load a few. A word-level index that decided matches
  alone would avoid it but would have to reproduce `occurrences` exactly,
  which is the riskier change.
- **File count.** About 5,500 files after c2, about 10,000 after the pending
  packs (4,294 → about 7,300 pages). Within the budget; claim buckets keep
  claim slices from doubling the claim pages.
- **Offline**: only pages visited, and the parts they loaded, work offline.
  Today every page works offline after the first. Stated on About & method in
  c2.
- **Time.** c0 and c1 are bounded. c2 touches `Workspace.tsx` (2,600 lines);
  c3 the explorer and exports. If time runs out, the last finished stage
  ships and this document lists what is left.
