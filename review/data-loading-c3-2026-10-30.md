# Data loading, stage c3: the rest (2026-10-30)

Fourth stage of design (c) ([`docs/data-loading-design-c.md`](../docs/data-loading-design-c.md)),
branch `data-c3-rest` from `data-c2-pages`. Every built page but the start
and search pages is now taken over from the relation core and a slice, and
the browser no longer has a monolithic records chunk. No data, release,
export, header or hosting setting changed. Nothing was deployed.

## What changed

- **Explorer, hubs and About & method** get slices like the record pages
  (`slicePath` in `src/domain/slices.ts`). The three hubs read the same
  records and share `/slices/hubs.json`. Every page passes the build's check
  against its slice, as before.
- **No records chunk.** The whole records in the browser are the relation
  core put together with `virtual:records-content`, every field the core
  leaves out with each record's stored field order and the dataset
  description (`contentOf` and `assemble` in `src/domain/slices.ts`). The
  browser no longer imports `src/domain/repository.ts`, the data files or the
  schema to read the records, and no longer validates them (the build does).
  The assembled dataset serialises to exactly the validated dataset's JSON
  (tested), so exports and starters, which serialise records, are unchanged.
- The explorer is drawn from the core, which is the graph the explorer, map
  and timeline read; it loads the content when a control is used, as record
  pages do.

## Sizes

| Module                    | Raw KB | Gzip-9 KB |
| ------------------------- | -----: | --------: |
| Relation core             |  2,031 |       222 |
| Content (rest of records) |  6,737 |     1,062 |
| Collection index          |    339 |        39 |
| Records chunk (c2, gone)  |  9,691 |     1,160 |

| Slice                  | Raw KB |
| ---------------------- | -----: |
| `/slices/explore.json` |     96 |
| `/slices/about.json`   |  1,520 |
| `/slices/hubs.json`    |  2,008 |

The hubs' slice is large because the hub page computes the views of every
collection it counts (document histories, commitments, comparisons) from the
records; precomputing those counts would shrink it.

## Gates

- **Hydration identity**: every page, now including the hubs, About & method
  and the explorer, is checked against its slice by the build; the unit test
  samples them too.
- **Split completeness**: the core and the content, each read back through
  JSON as the browser reads them, serialise to exactly the validated
  dataset's JSON (values and field order); `contentOf` refuses a record with
  an undefined field, which JSON would turn into `null`.
- **Bundle budget** (gzip-9 before the page answers input; limits lowered):

  | Page type      | c2, KB | c3, KB | Limit, KB |
  | -------------- | -----: | -----: | --------: |
  | Hub            |  1,561 |    807 |       890 |
  | About & method |  1,599 |    723 |       800 |
  | Explorer       |  1,561 |    498 |       550 |

  Other page types are as in c2.

## Measurements

Phone profile (`tsx scripts/measure-load.ts --runs 3`): 4× CPU, Fast 3G,
390 × 844, cold cache, brotli 5, median of three; milliseconds.

| Page                            | Interactive, c0 |     c2 |        c3 | Transferred, c2 → c3 | JS heap, c2 → c3 |
| ------------------------------- | --------------: | -----: | --------: | -------------------: | ---------------: |
| `/governance`                   |                 | 10,867 | **6,245** |       1,286 → 675 KB |       61 → 23 MB |
| `/about`                        |                 | 10,378 | **5,257** |       1,323 → 622 KB |       69 → 24 MB |
| `/explore`                      |          10,143 | 10,072 | **4,102** |       1,287 → 434 KB |       64 → 16 MB |
| `/dossier/openai`               |          10,165 |  4,207 |     4,158 |         475 → 476 KB |                  |
| `/claim/dario-anthropic-2021`   |          10,705 |  4,083 |     3,926 |         436 → 436 KB |                  |
| `/search#q=responsible scaling` |          14,491 |  3,489 |     3,401 |         480 → 481 KB |                  |
| `/`                             |           1,888 |  1,926 |     1,895 |         106 → 104 KB |                  |

Every built page now answers input in about 4–6 s on the phone profile,
against 10–14.5 s before c1. The hubs are the slowest: their slice holds
every collection's records (see Sizes).

## Build time

The Cloudflare Pages deploy of c2 took about 25 minutes from merge to live,
against a 20-minute build limit on the free plan, and the pending packs add
pages. Pre-rendering, 254 of the build's 289 s here, is now faster
(`scripts/prerender.ts`, `src/prerender/render.tsx`,
`src/prerender/trace.ts`):

- **Threads.** Pages are spread over worker threads, each with a renderer of
  its own, in batches of 16; the results come back in path order, so slice
  files are merged as before. The default is one thread per processor, at
  most eight and as many as memory allows (about 0.2 GB each, 0.5 GB
  allowed); `PRERENDER_WORKERS` sets the number. The build log names the
  number used.
- **Fewer drawings.** The traced drawing is compared with the page as written
  rather than with a third drawing; a page that answers no width query
  differently at 1440 and 390 px is drawn once for both (every page but
  search and the comparison; `widthQueries` in `src/ui/client.ts`, tested).
- **Cheaper tracing.** Reads of the relation core put nothing in a slice and
  are no longer noted; each record keeps its noted fields for the current
  trace; a slice's records are picked by position rather than by scanning
  the dataset.

Measured on this machine (4 processors), on the same commit's client build:

| Pre-rendering       |  Before |   After |
| ------------------- | ------: | ------: |
| 1 thread            | 254.4 s | 121.1 s |
| 2 threads           |         |  65.2 s |
| 4 threads (default) |         |  35.7 s |
| `pnpm build`, whole |   289 s |    67 s |

At each thread count every page (4,295 with the not-found page) hashes the
same as before apart from `/assets/` tags, and the slice files and sitemap
are byte-identical. Claim pages (3,246) take about 23 ms each on one thread;
each hub about 2.5–3 s. Cloudflare does not publish the build machine's
processor count; on one processor pre-rendering would take about 2 minutes,
and the log of the next deploy will show the count and the time.

## Review

A fresh-context adversarial review found, and this stage fixes:

1. **The development server could not build the index modules** (search
   since c1; the records too in c3): it evaluated the application's modules
   with the project's configuration, which bundles dependencies for a worker.
   The modules are now built by a Vite server of their own, as in the build;
   fixed on `data-c1-search` and carried into c2 and c3. Search and record
   pages work in `pnpm dev` (checked in Chromium).
2. Data edits during development did not rebuild the core and content
   modules: they now watch the data files.
3. The equality test did not pass through JSON (an undefined field would
   become `null`): it now does, and `contentOf` refuses undefined fields.
4. Stale configuration and text: the `records` code-splitting group is gone;
   the chunk-size warning limit is 8 MB (the content module is 6.7 MB raw);
   the design document no longer claims About & method drops the schema module
   (its coverage counts import it); the hub, About and explorer budgets are
   lowered.
5. Links to files (`/data/…`, downloads) were held until the records loaded.
   They are not held now.

A second fresh-context review, of the faster pre-rendering (threads, tracing,
the width rule), found two faults, both fixed: the default thread count had no
upper bound although each thread holds a renderer, so a host with many
processors and little memory could run out of it; and `PRERENDER_WORKERS=0`
or a value that is not a number fell back to every processor, while the log
named the setting rather than the count used. It found nothing wrong with the
tracing or the width rule.

Found while testing, and fixed here and on `data-c2-pages`: held input was
replayed out of order (a claim opened from its bucket before an earlier held
filter click, which then closed it), and a held claim link was dropped when
the list had been drawn again; the workspace's own controls were drawn
disabled until the records loaded, which stalled tests that type into them.
Two specs changed: `search.spec.ts` (the records are now the content module,
not the records chunk; the start page still loads neither) and
`per-page-data.spec.ts` (the same).

## Checks

- `pnpm -s check`: passed (702 unit tests; build with every page checked
  against its slice, and the budget).
- `pnpm -s check:privacy`: passed.
- Browser suite (Chromium, untracked config without `channel: 'msedge'`,
  deleted afterwards): **245 passed (16.7 min)**.
- Page comparison with c2: of 4,295 pages, the five newly given slices (the
  three hubs, About & method, the explorer) gain the slice preload line;
  nothing else differs apart from `/assets/` tags.
- Inspection at 1440 and 390 px (search, dossier, person, claim, explorer): as
  before, no overflow; the only console error is the blocked analytics
  beacon.
- `pnpm dev`: search and a person page load (Chromium).
- After the faster pre-rendering: `pnpm -s check` passed (703 unit tests);
  `pnpm -s check:privacy` passed; browser suite **245 passed (16.8 min)**;
  page, slice and sitemap comparison with the build before it identical at
  one, two and four threads.

## What is left

- **Navigation between pages drawn from slices** still loads the whole
  records first (a held click). Loading only the next page's slice needs each
  change of page to name its address before it runs; the address-driven
  changes (links) could do so first.
- **Hub slices** hold every collection's records because the hub page counts
  them from the records; precomputed counts (as `virtual:site-facts` does for
  the explorer) would shrink them.
- **Build time**: pre-rendering takes 36 s here on four threads (16 s before
  c2, 254 s before this change; see Build time). The next deploy's log gives
  Cloudflare's figure. Tracing still costs about twice an untraced drawing.
- **Copy-link buttons** are told apart from reference copies by their label.
- The two stored records with a trailing space (stage c0 record) are
  unchanged; a data correction could trim them.
