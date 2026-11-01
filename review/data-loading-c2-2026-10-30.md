# Data loading, stage c2: per-page data (2026-10-30)

Third stage of design (c) ([`docs/data-loading-design-c.md`](../docs/data-loading-design-c.md)),
branch `data-c2-pages` from `data-c1-search`. Record pages and collections are
taken over from a slice of the records instead of the whole records chunk. No
data, release, export or hosting setting changed; `public/_headers` gains one
rule. Nothing was deployed.

## What changed

- **Relation core** (`src/domain/slices.ts`, `virtual:records-core`): every
  record with only the fields pages use to choose and order records. One
  hashed module, 2.0 MB raw, 217 KB gzip, cached across pages and deploys
  until the data changes. With it, every scan over the dataset gives the
  result it gives over the whole of it.
- **Slices** (`src/prerender/trace.ts`, `renderSlice` and `checkSlice` in
  `src/prerender/render.tsx`, `scripts/prerender.ts`): for each record page
  and collection, the build draws the page with a dataset whose records note
  the fields read (as built, and as the browser draws it once taken over at
  1440 and at 390 px), keeps the records with fields read outside the core,
  and writes them with their positions and the dataset's version. It then
  draws the page again from the core and the slice alone, in all three ways,
  and fails if anything differs; it also fails if the traced drawing differs
  from the page it writes. **All 4,294 pages pass.**
- **Shared values**: the collections each claim and person appear in and each
  document's earliest-located marks are computed once from the whole dataset
  (`virtual:collection-index`) and given to every partial dataset, in the
  renderer and the browser alike. Values computed once per dataset
  (`src/domain/memo.ts`) count their reads for every page that reuses them,
  so one traced dataset serves the whole build.
- **Files**: `slices/<kind>/<id>.json` per record page and collection, and
  claim slices packed into 128 bucket files (`slices/claims/<n>.json`) that
  serve claim pages and claim panels anywhere. 1,169 files, 26.3 MB raw.
  `dist/` has 5,946 files (budget 15,000, host limit 20,000). Rule
  `/slices/*  Cache-Control: no-cache`, as pages have.
- **Browser** (`src/ui/records.ts`, `src/ui/hold-until-records.ts`,
  `src/App.tsx`, `src/main.tsx`): a page with a slice loads the core, the
  collection index and its slice before it is taken over; `?inspect=` adds
  the claim's bucket. A claim link (click, Enter or Space) loads only the
  claim's bucket. Any other input that would change the page is held until
  the records chunk has loaded and is then given again; pointing at or
  focusing a control starts that load. A part from another version of the
  records, or one that cannot load, is replaced by the records chunk.
- **Built HTML**: pages with a slice gain one line,
  `<link rel="preload" href="/slices/…json" as="fetch" crossorigin />`
  (4,287 pages). Compared with c1, no other byte differs apart from
  `/assets/` tags.
- The build takes longer: pre-rendering 16 s → about 240–270 s on this
  machine (four drawings per page, one of them traced, plus the check).

## Slice sizes (gzip-9)

| Page                                    | Slice, KB |
| --------------------------------------- | --------: |
| `/claim/dario-anthropic-2021` (bucket)  |       0.8 |
| `/person/jan-leike`                     |       1.4 |
| `/question/anthropic-formation`         |       8.2 |
| `/person/eliezer-yudkowsky`             |      11.6 |
| `/dossier/anthropic`                    |      29.4 |
| `/dossier/openai`                       |      36.8 |
| `/documents/frontier-safety-frameworks` |      52.1 |
| `/propositions/superintelligence`       |      82.0 |
| `/compare/frontier-safety-frameworks`   |     110.5 |

(Measured before the source `documentId` moved into the core; document
slices are smaller since.)

## Gates

- **Hydration identity**: every page at build time, as above; the unit test
  checks a sample of every page type, the same pages with three other pages'
  slices held as well, and claim panels drawn from their buckets on a
  dossier, a person page and a question.
- **Split completeness**: the core holds every record's relation fields in
  order; slice records carry the dataset's values at their positions.
- **Bundle budget** (gzip-9 before the page answers input; limits lowered
  to about 10% above):

  | Page type  | c1, KB | c2, KB | Limit, KB |
  | ---------- | -----: | -----: | --------: |
  | Dossier    |  1,561 |    515 |       570 |
  | Person     |  1,564 |    482 |       530 |
  | Document   |  1,565 |    490 |       540 |
  | Claim      |  1,558 |    502 |       555 |
  | Collection |  1,563 |    523 |       575 |

- **Browser** (`tests/browser/per-page-data.spec.ts`, new): a dossier is
  taken over from its slice without the records chunk and opens a claim from
  its bucket; a claim opened by Space waits for its bucket; navigation loads
  the records first; a tab chosen by arrow key and a comparison edition chosen
  before the records load apply once they have; a page whose slice fails to
  load is drawn from the records.

## Review

A fresh-context adversarial review of the first version found, and this
stage fixes: keyboard activation (Space on claim links, arrow keys on tabs)
and the comparison's selects acting on partial data before the records
loaded; `/search?inspect=` holding partial data while its panel's handlers
are not held (it uses the records chunk again, as in c1); no version tying
slices to the core (a tab open across a deploy could have mixed records); a
failed slice load leaving the page blank; the hold catching links that need
no data (within the page, to other sites, the header's search toggle); the
build not comparing the traced drawing with the page it writes; addresses
ending in `.html` choosing the wrong slice. Copy-link buttons still wait for
the records (they need none; minor).

A later fix (found while finishing stage c3): the unit test of claim panels
drawn from buckets ran, unnoticed, in the built mode rather than as the
browser draws the page once taken over, because tracing switched that mode
off. Tracing now sets the mode for each drawing and restores it. Run as
intended, the test showed that the workspace's own controls were drawn
disabled until the records loaded; they now answer at once and their input
is held instead (`src/ui/hold-until-records.ts`), as for every other control.

Found while finishing stage c3, and fixed here too: held input was given
again as soon as each input's own needs had loaded, so a claim clicked after
a held filter click could open first (its bucket loads sooner) and then be
closed by the filter; and a held claim link was dropped if the list had been
drawn again meanwhile. Held input now replays in the order it came, and a
claim link is found again by its address. Also: links to files rather than
pages (`/data/…`, downloads) are no longer held.

Also found while testing: Playwright reuses any server already listening on
port 4173, so a preview server left running from another worktree answered
one run of this stage's browser suite with the previous stage's build. That
run was discarded; the results below come from a run with no other server.

## Measurements

Phone profile (`tsx scripts/measure-load.ts --runs 3`): 4× CPU, Fast 3G,
390 × 844, cold cache, brotli 5, median of three; milliseconds.

| Page                            | Interactive, c0 |     c1 |        c2 | Transferred, c1 → c2 | JS heap, c1 → c2 |
| ------------------------------- | --------------: | -----: | --------: | -------------------: | ---------------: |
| `/dossier/openai`               |          10,165 |  9,865 | **4,207** |       1,281 → 475 KB |       44 → 18 MB |
| `/person/jan-leike`             |          10,693 |        | **4,316** |       1,259 → 422 KB |       48 → 17 MB |
| `/document/rsp-v2-0`            |          11,157 |        | **4,373** |       1,264 → 432 KB |       60 → 17 MB |
| `/claim/dario-anthropic-2021`   |          10,705 | 10,325 | **4,083** |       1,251 → 436 KB |       67 → 16 MB |
| `/search#q=responsible scaling` |          14,491 |  3,273 |     3,489 |         444 → 480 KB |       11 → 13 MB |
| `/explore`                      |          10,143 |        |    10,072 |     1,251 → 1,287 KB |       45 → 64 MB |
| `/`                             |           1,888 |  1,873 |     1,926 |         102 → 106 KB |                  |

Blocking time on record pages fell from 760–1,870 ms to 30–150 ms. The
explorer still loads the records chunk (stage c3). Search results for the
measured query appeared at 7.1 s.

## Checks

- `pnpm -s check`: passed (699 unit tests; build with every page checked
  against its slice, and the budget).
- `pnpm -s check:privacy`: passed.
- Browser suite (Chromium, untracked config without `channel: 'msedge'`,
  deleted afterwards): **245 passed (18.2 min)**, the 239 earlier specs and
  6 new ones. Earlier runs failed on: a slice requested for an address with
  no built page (now the whole records serve any page not taken over at its
  own address); an address lost while the records loaded (the address to
  open is kept); copy buttons held past the browser's copy permission (link
  copies act at once).
- Page comparison with c1: 4,295 pages; the only difference apart from
  `/assets/` tags is the slice preload line on 4,287 pages.
- Inspection at 1440 and 390 px (search, dossier, person, claim, explorer):
  as in c1, no overflow, no console error but the blocked analytics beacon.

## Open questions

1. Build time: pre-rendering now takes about 4–4.5 minutes here (16 s
   before). Spreading pages over worker threads would cut it; not done.
2. A reader on a page drawn from its slice who clicks anything but a claim
   waits for the records chunk (about 6 s on the phone profile) unless
   pointing or focusing started it earlier. c3 makes the explorer and hubs
   lighter but keeps this behaviour.
3. Copy-link buttons are told apart from reference copies by their label
   ("link"); a label change would make them wait for the records again.
