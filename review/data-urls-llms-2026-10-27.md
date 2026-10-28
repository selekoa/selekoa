# Stable data URLs and llms.txt (2026-10-27)

Phase 1 of making Selekoa readable without JavaScript: the records themselves
at fixed addresses. Branch `data-urls-llms`, from `main` at #68. No dataset
record, release, `site.config.json` or hosting setting changed. Nothing was
deployed.

## What changed

- **`/data/`.** The build (`scripts/site-config.ts`, `publishedDataFiles`)
  copies the newest `release/vX.Y.Z/` directory to `dist/data/`: `manifest.json`
  and every file the manifest lists (JSON, CSV, `sources.csl.json`,
  `README.md`, `CHANGELOG.md`, `changes.json`, `CITATION.cff`), read as bytes
  and emitted unchanged. `LICENSE-DATA.txt` and `LICENSING.md` from the
  repository root sit beside them, as in the dataset archive; the release
  README names them. The dev server serves the same paths.
- **Versioned copies: not built.** Copying every release file by file would add
  about 80 MB to each build for data the ZIP archives already carry. The
  versioned route is `release/selekoa-dataset-vX.Y.Z.zip`; llms.txt and
  `docs/dataset-format.md` say so, and that `/data/` always holds the latest
  release (version in `data/manifest.json`).
- **`/llms.txt`.** Generated from `site.config.json` and the release manifest
  (`src/site/machine-readable.ts`): the start-page tagline as summary, the
  start-page sentence, limits (claims record what sources state; machine-checked,
  most not reviewed by an editor; selective coverage; texts are not evidence of
  implementation; CC BY 4.0 with quotations excluded, linked to the licence
  files), links to the data files, the ZIP, the release README's citation
  guidance, About & method (`#/about`, marked as needing JavaScript), the
  published contact, and an "Optional" section with changes, changelog,
  citation file and CSV views. Absolute links from `baseUrl`; relative links
  and no contact before launch. No `llms-full.txt`: the records are the full
  text, and a prose dump would duplicate several megabytes.
- **Sitemap and robots.** With indexing on, `sitemap.xml` lists the start page,
  `llms.txt` and the 18 data files (`sitemapXml(config, files)`). `robots.txt`
  is unchanged and already allows `/`.
- **Headers (`public/_headers`).** `/data/*` and `/llms.txt`: `Cache-Control:
public, max-age=86400` and `Access-Control-Allow-Origin: *`, so browser-based
  tools can fetch public files that involve no cookies or credentials. Each data
  file has its own `Content-Type` rule (`application/json`, `text/csv` or
  `text/plain`, all `charset=utf-8`), because Cloudflare joins the values of a
  header set by two matching rules. `/llms.txt` gets `text/plain; charset=utf-8`.
  26 rules in total, under the host's 100-rule limit.
- **About & method.** The dataset entry names `data/` and `data/claims.json`
  and links `llms.txt`.
- **Docs.** `docs/launch-readiness.md` ("Static hosting") and
  `docs/dataset-format.md` describe the addresses.
- `scripts/release-zip.ts` takes its licence file list from the shared
  `dataLicenceFiles`, so the archive and `/data/` cannot drift.

## Sizes

| Item                   | Size                                            |
| ---------------------- | ----------------------------------------------- |
| `dist/data/` (v0.7.2)  | 12.7 MB, 18 files; largest `claims.json` 2.8 MB |
| `dist/llms.txt`        | 4.5 KB                                          |
| `dist/` before / after | 20.6 MB / 33.3 MB                               |

Every file is far below the host's 25 MB per-file limit. Text compression
applies as for other text responses.

## Tests

- `src/site/machine-readable.test.ts` runs the plugin's `generateBundle` hook:
  every release file under `data/` is byte-identical to the latest release and
  matches its manifest SHA-256; the licence files match the repository; nothing
  else is under `data/`; the sitemap lists `llms.txt` and every data file when
  indexing is on. llms.txt: layout, required links (data files, ZIP, About &
  method, citation guidance, contact), limit and licence statements, relative
  links and no placeholder contact before launch. Headers: cache and CORS rules,
  and exactly one correct `Content-Type` rule for each published data file.
- `tests/browser/explorer.spec.ts` follows the About page's `data/claims.json`
  link (bytes equal the release file) and `llms.txt` link on the preview build.

## Checks

- `pnpm install --frozen-lockfile`: up to date.
- `pnpm -s check`: passed (format, lint, typecheck, unit tests, build). The
  build's records-chunk size warning predates this change.
- `pnpm -s check:privacy`: passed.
- Build output: `cmp` of every `dist/data/` file against `release/v0.7.2/` and
  the licence files: identical. `dist/_headers` equals `public/_headers`.
- `pnpm test:browser` (Chromium at `/opt/pw-browsers`, untracked config copy
  without the Edge `channel` line, deleted afterwards): 160 passed (16.1 min),
  including the new About-page checks of `data/claims.json` and `llms.txt`.

## Open decisions

- Whether to copy earlier releases to `/data/vX.Y.Z/` later (about 80 MB per
  build) or keep the ZIPs as the versioned route.
- Cloudflare's header behaviour (explicit `Content-Type` overriding its own,
  CORS) is checked here only against the documented `_headers` rules; confirm
  with `curl -I https://selekoa.org/data/claims.json` after the merge deploys.
- Phase 2: pre-rendered pages.
