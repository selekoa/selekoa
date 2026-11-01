# Data loading, stage c0: gates (2026-10-30)

First stage of design (c) ([`docs/data-loading-design-c.md`](../docs/data-loading-design-c.md)),
branch `data-c0-gates` from `main` at `1875b85` (#96). It adds the checks the
later stages must pass and records the baseline. No application code, data,
release, header or hosting setting changed. Nothing was deployed.

## What was added

| Gate               | Where                                                              | What it checks                                                                                                                                                                                                                                                                                    |
| ------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Bundle budget      | `src/site/bundle-budget.ts`, `scripts/bundle-budget.ts`            | For ten page types, the gzip-9 sum of the entry, its static imports and stylesheets, the modules the page loads before it answers input and its data files, from the Vite manifest, against a limit. Runs at the end of `pnpm build`; the manifest is moved to `dist-ssr/` so it is not deployed. |
| Hydration identity | `src/prerender/hydration.test.ts`, `src/prerender/browser-data.ts` | Renders a sample of every page type (every fixed page, hub and collection, every 40th record page and the last of each type: 134 pages) with the whole dataset and with what the browser holds at hydration (`browserData`); the HTML must be equal.                                              |
| Split completeness | `src/site/split.test.ts`                                           | The parts of the dataset the browser can load reassemble the validated dataset record by record and field by field.                                                                                                                                                                               |
| Page identity      | `scripts/page-hashes.ts`                                           | Hashes every built page without its `/assets/` script and stylesheet tags (a code change renames and regroups them) and lists pages that differ from a recorded build.                                                                                                                            |
| Load measurement   | `scripts/measure-load.ts`                                          | The phone profile of the plan, outside `pnpm check`.                                                                                                                                                                                                                                              |

`vite.config.ts` now writes the client build's manifest (`build.manifest`).

## Baseline

### Bundle budget (gzip-9, from the manifest)

| Page type      | Example                                 |      KB | Limit |
| -------------- | --------------------------------------- | ------: | ----: |
| Start page     | `/`                                     |   104.4 |   115 |
| Hub            | `/governance`                           | 1,557.3 | 1,720 |
| About & method | `/about`                                | 1,595.6 | 1,760 |
| Search         | `/search`                               | 1,563.0 | 1,720 |
| Explorer       | `/explore`                              | 1,557.3 | 1,720 |
| Dossier        | `/dossier/openai`                       | 1,560.9 | 1,720 |
| Person         | `/person/jan-leike`                     | 1,563.7 | 1,720 |
| Document       | `/document/rsp-v2-0`                    | 1,564.5 | 1,720 |
| Claim          | `/claim/dario-anthropic-2021`           | 1,557.3 | 1,720 |
| Collection     | `/documents/frontier-safety-frameworks` | 1,562.8 | 1,720 |

Limits are about 10% above today's sizes, so that admissions merged before c1
and c2 do not fail the build; each later stage lowers the limits of the pages
it lightens.

### Phone profile (`tsx scripts/measure-load.ts --runs 3`)

4× CPU, Fast 3G (562.5 ms round trip, 1.44 Mbit/s down), 390 × 844, cold
cache, brotli 5, median of three; milliseconds.

| Page                            | First paint | Interactive | Results | Blocking | Transferred | JS heap |
| ------------------------------- | ----------: | ----------: | ------: | -------: | ----------: | ------: |
| `/`                             |       1,488 |       1,888 |         |       10 |      102 KB |    3 MB |
| `/dossier/openai`               |       1,572 |      10,165 |         |      757 |    1,280 KB |   44 MB |
| `/person/jan-leike`             |       1,508 |      10,693 |         |    1,393 |    1,258 KB |   60 MB |
| `/document/rsp-v2-0`            |       1,504 |      11,157 |         |    1,868 |    1,263 KB |   46 MB |
| `/claim/dario-anthropic-2021`   |       1,460 |      10,705 |         |    1,452 |    1,250 KB |   51 MB |
| `/search#q=responsible scaling` |       1,596 |      14,491 |  14,426 |    5,112 |    1,259 KB |   85 MB |
| `/explore`                      |       1,480 |      10,143 |         |      780 |    1,250 KB |   42 MB |

The data grew since the plan's measurement (3,043 → 3,246 claims): search
becomes interactive in 14.5 s, not 12.4 s; record pages in 10–11 s, not
about 9 s. Results appear in the same pass as hydration, so "Results" can be
slightly earlier than "Interactive", which the application marks in an effect.

## Findings

- **Validation is not the identity.** The split test first compared the
  browser's records with the raw data files and failed: `datasetSchema.parse`
  trims text, and two stored records end a field in a space
  (`lineage-ii-critique-cites-concrete` and its evidence item; 1,733 records
  also come back with their keys reordered). The plan's stage 1 assumed the
  browser could skip validation because it changes nothing. Under design (c)
  every browser part is made from the validated dataset, so nothing depends on
  it; the two stored values could be trimmed in a data correction.
- The file count is 4,389 in `dist/` (limit 20,000, budget 15,000).

## Checks

- `pnpm -s check`: passed (format, lint, typecheck, unit tests, build with the
  budget step).
- `pnpm -s check:privacy`: passed.
- Browser suite (Chromium, untracked config without `channel: 'msedge'`,
  deleted afterwards): **239 passed (22.5 min)**.
- Built pages are byte-identical to `main` (raw SHA-256 of all 4,295 HTML
  files, since the code they load did not change).
- Inspection at 1440 and 390 px of search with a query, a dossier, a person
  page, a claim page and the explorer: no layout overflow; the only console
  error is the analytics beacon, which the inspection blocks.

## Next

Stage c1, the static search index (`data-c1-search`).
