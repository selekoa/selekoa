# Data loading, stage c1: static search index (2026-10-30)

Second stage of design (c) ([`docs/data-loading-design-c.md`](../docs/data-loading-design-c.md)),
branch `data-c1-search` from `data-c0-gates`. Search reads a static, chunked
index the build writes, and the search page runs without the records chunk.
No data, release, export, header or hosting setting changed. Nothing was
deployed.

## What changed

- **Index files** (`src/domain/search-index.ts`, written by the Vite plugin
  `scripts/search-index.ts` as hashed modules under `/assets/`):

  | Part                                                                      | Files | Raw KB | Gzip-9 KB | Largest, gzip KB |
  | ------------------------------------------------------------------------- | ----: | -----: | --------: | ---------------: |
  | Postings (sorted word ranges)                                             |    34 |  1,044 |       370 |             14.7 |
  | Record chunks (by subject; text, result fields and the records they show) |   165 |  9,135 |     1,652 |             16.9 |
  | Collection filter                                                         |    11 |     13 |         3 |              0.4 |
  | Organisation filter                                                       |   169 |     23 |        18 |              0.4 |
  | Manifest and facets (`virtual:search-index`)                              |     1 |    130 |        30 |                  |

  A query loads the postings files of its terms (one per term, rarely two),
  then the chunks of its candidates. The scoring of `searchRecords` runs
  unchanged on the candidates, so results are those of search over the whole
  dataset by construction; the tests below check it.

- **Search page** (`src/ui/Search.tsx`): reads a search source
  (`src/ui/search-source.ts`) instead of the repository and index. Query and
  filters are deferred, so results in view stay while the next load, and the
  status says "Searching…"; if the index cannot load, the status says so and
  the query is tried again next time. Facets (filters' choices, collections,
  shared document names, the "Pages" entries) come from `src/ui/search-facets.ts`.
  Record links in results read the results' own records (`src/ui/record-path.ts`).
- **Records store** (`src/ui/records.ts`): the workspace reads the records from
  a store that is empty on the search page and holds the records chunk
  elsewhere. Module-level views are computed per set of records; values the
  explorer shows on every page (years, latest check, topic counts) come from
  `virtual:site-facts`. A change of page from the search page waits for the
  records and the next page's code, then is drawn at once (`flushSync`), so
  focus handling is unchanged.
- **Preloading**: each built page names the scripts it opens with
  (`<link rel="modulepreload">`, from the client manifest), so they download
  with the entry script rather than after it. This is the only change to
  built HTML; the page comparison leaves `/assets/` tags out, and finds all
  4,295 pages otherwise unchanged.
- The search engine and the index load only on the search page; the start
  page's entry is unchanged in size (104.8 KB gzip).

## Gates

- **Search identity**, `src/domain/search-index.test.ts`: 309 queries (every
  query of the search tests, words of every field and script, prefixes,
  phrases, record IDs, apostrophes, hyphens, initials, digits, Chinese names
  and their parts, queries that match nothing), each compared with
  `searchRecords` over the whole dataset (`toEqual` on terms, groups, hits,
  scores, snippets and order); a third of them again with each of ten filter
  sets (names mode, names mode in an organisation, whole words, date order,
  passages only, a year range, an organisation, three collections).
- **Rendered identity**, `src/ui/search-source.test.ts`: the search page's
  markup for every query in both modes, drawn from the index and from the
  whole dataset, is identical; facets are identical; filtered searches agree.
- **Hydration identity**: `/search` rendered with no records held equals the
  full render (with the sampled pages of every other type).
- **Split completeness**: every searchable record is stored once with its
  searched text; each record is in the postings of its words; every shown
  record's fields equal the dataset's.
- **Bundle budget**: Search 249.6 KB gzip before it answers input (limit
  lowered from 1,720 to 275 KB); other pages unchanged.

## Measurements

Phone profile (`tsx scripts/measure-load.ts --runs 3`): 4× CPU, Fast 3G,
390 × 844, cold cache, brotli 5, median of three; milliseconds.

| Page                            | Interactive, c0 | Interactive, c1 | Results, c0 | Results, c1 | Transferred, c0 → c1 |
| ------------------------------- | --------------: | --------------: | ----------: | ----------: | -------------------: |
| `/search#q=responsible scaling` |          14,491 |       **3,273** |      14,426 |   **6,824** |       1,259 → 444 KB |
| `/`                             |           1,888 |           1,873 |             |             |         102 → 102 KB |
| `/dossier/openai`               |          10,165 |           9,865 |             |             |     1,280 → 1,281 KB |
| `/claim/dario-anthropic-2021`   |          10,705 |          10,325 |             |             |     1,250 → 1,251 KB |

Search blocking time fell from 5,112 to 136 ms and its JS heap from 85 to
11 MB. Before the preload links, search was interactive at 4.1 s; record
pages were 0.3–0.5 s slower than c0, which the links remove. "Responsible
scaling" (95 hits) loads 11 record chunks.

## Review

A fresh-context adversarial review of the first version found, and this
stage fixes:

1. `/search#q=…&inspect=<claim>` (the form search writes) did not load the
   records, so the inspected claim showed "does not match any record". Fixed
   (`needsRecords` reads the fragment); tested.
2. Record links in results drew as buttons on the search page. Fixed; the
   rendered-identity test now covers the links.
3. A failed load of the records or the index was never retried and could take
   down the page. Fixed: failures are retried on the next request; search
   shows a message.
4. The engine skipped collection and organisation filters in names mode,
   unlike `searchRecords`; it now applies them, and refuses an organisation
   with no filter file instead of answering wrongly. Search never sends one.
5. Words next to a character outside the Basic Multilingual Plane were
   indexed by code point while search reads boundaries by UTF-16 unit. Now
   read the same way; no current record has such a letter.
6. The dev server did not rebuild the index after a data change on Windows
   paths. Fixed.

A later review (stage c3) found that the development server could not build
the index: it evaluated the application's modules with the project's
configuration, which bundles every dependency for a worker. The index is now
always built by a Vite server of its own, as in the build; search works in
`pnpm dev` (checked in Chromium).

Not changed: a back navigation from the search page to a record page while
the records load, followed by typing, can push a new search entry (minor;
noted for c2).

## Checks

- `pnpm -s check`: passed (694 unit tests; build with budget).
- `pnpm -s check:privacy`: passed.
- Browser suite (Chromium, untracked config without `channel: 'msedge'`,
  deleted afterwards): **239 passed (20.0 min)**. A first run failed two
  specs: one read the result count before results had loaded (the spec now
  waits), and opening a person page from search lost focus because the
  change was drawn after the focus moved (fixed with `flushSync`).
- Two specs changed: `quick-wins.spec.ts` waits for search results before
  reading the count (results now load after the page is taken over); no
  assertion was weakened.
- Page comparison against `main`: 4,295 pages, 0 changed apart from
  `/assets/` tags.
- Inspection at 1440 and 390 px (search with a query, dossier, person, claim,
  explorer): results as before, no overflow; the only console error is the
  blocked analytics beacon.

## Next

Stage c2, per-page data (`data-c2-pages`).
