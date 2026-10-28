# Pre-rendered pages (findability phase 2, 2026-10-27)

Every page now has a real path and is built as HTML with its text present, so
search engines and tools that do not run JavaScript read what a reader sees.
Branch `prerender-pages`, from `main` at #71. No dataset record, release,
`site.config.json` or hosting setting changed. Nothing was deployed.

## Design

- **Renderer: the application's own React components.** `src/prerender/render.tsx`
  renders `<App address={path} />` with React's web-stream server API
  (`renderToReadableStream`, waiting for `allReady`) and places the markup in the
  built `index.html` (`src/prerender/page-html.ts`). One renderer means one wording:
  the editorial rules (earliest located, context-only passages, the quotation
  budget, review labels) live in the components and cannot drift between the app
  and the built pages. Separate templates were rejected for that reason.
- **Render-on-request ready.** `renderPage(path, template, baseUrl)` is a pure
  function of the bundled release data and the path. The renderer is built by a
  second Vite build (`vite build --ssr`, `ssr.target: 'webworker'`,
  `noExternal: true`, one file, `dist-ssr/render.js`, 9.5 MB, 1.5 MB gzip); it
  imports nothing from Node. Browser-only values go through `src/ui/client.ts`
  (`useSyncExternalStore` with the built value as server snapshot). A Cloudflare
  Worker could import the same bundle and call `renderPage` with the built
  `index.html` (phase 3). The bundle's size is the records (about 6 MB raw);
  Workers' script size limits would apply then.
- **Build.** `pnpm build` = data validation, typecheck, client build, renderer
  build, then `scripts/prerender.ts`, which writes every path from `pagePaths`
  (`src/prerender/pages.ts`) to `dist/<path>.html`, writes `404.html` and, with
  indexing on, `sitemap.xml`, and fails if any link in the written pages leads to
  no built file or if `dist/` exceeds 15,000 files.
- **Taking over in the browser.** The root element carries `data-path`. When it
  matches the address, `src/main.tsx` hydrates the built HTML (no flash); the
  workspace then applies the query (`?inspect=`, `?q=`). Page code loads through
  `src/ui/page-modules.tsx`: the browser loads the records and the opened page's
  code together, and a loaded component renders at once, so the whole page is
  taken over in one pass. App keeps the light theme and identical props until the
  page has been taken over, because any update into a page still being taken over
  makes React drop the built HTML and draw it afresh with a loading notice (found
  in testing: every element of the built page was replaced). The colours follow
  the reader's setting from the start through CSS and a small inline script in
  `index.html` that applies a stored choice before the first paint. A button pressed before the page has been taken over is held and pressed
  again once it has (`src/main.tsx`, released by App's `selekoa:shown` event;
  React itself dropped such clicks in testing). Search boxes are read-only and
  selects, checkboxes and radio buttons disabled until then, so typed input is
  not lost. Links work from the start: they open the built page they name.
  Other pages (not-found, the start page reached by an old
  hash, the development server) are drawn afresh.
- **Explorer list.** The explorer's list of every claim is drawn only in the
  browser. With it, the explorer and each of the 2,043 claim pages would carry the
  whole list (roughly 0.3 MB each, about 0.6 GB in all). A built claim page
  carries the explorer frame and the claim panel.
- **Client routing.** History API: a new page is `pushState`; a change of open
  claim, section or search, and the first normalisation of an address, is
  `replaceState`. `popstate` restores the page. The document title follows the
  page (`pageMeta`). Keyboard behaviour and focus handling are unchanged (the same
  handlers run).
- **Old links.** `legacyHashPath` maps `#/…` to `/…`, `#explorer` to `/explore`
  and `#/reading/<id>` to `/question/<id>`; `src/main.tsx` applies it with
  `replaceState` when a page opens and on `hashchange`. Ordinary fragments
  (`#about-method`) are untouched. An address naming no record still shows the
  notice.

## URL scheme

Recorded in `docs/architecture.md` ("Addresses and pre-rendered pages"):
`/`, `/governance`, `/ideas`, `/institutions`, `/about`, `/search`, `/explore`,
`/documents/<id>`, `/control/<id>`, `/commitments/<id>`, `/propositions/<id>`,
`/question/<id>`, `/dossier/<organisation-id>`, `/person/<id>`,
`/document/<id>`, `/claim/<id>`. Query parameters as before (`inspect`,
`section`, `claim`, `q`, `mode`, `view`). Files: `/person/x` → `person/x.html`,
which Cloudflare Pages serves at `/person/x` with no redirect (a
`person/x/index.html` layout would redirect to `/person/x/`). The asset base is
now `/`: the build must be served from a host root.

## What is and is not pre-rendered

| Built                                                                                             |                    Count |
| ------------------------------------------------------------------------------------------------- | -----------------------: |
| Start page, 3 hubs, About & method, Search (no query), explorer (no query)                        |                        7 |
| Collections: 1 document history, 2 control structures, 1 commitments, 3 propositions, 2 questions |                        9 |
| Dossiers (every organisation)                                                                     |                      123 |
| Person pages                                                                                      |                      238 |
| Document pages                                                                                    |                      395 |
| Claim pages (every claim, superseded ones with their notice)                                      |                    2,043 |
| **Pages**                                                                                         | **2,815** (+ `404.html`) |

Not built: per-query search or explorer pages; `?inspect=`, `?section=` and
`?claim=` variants (the built page plus the query in the browser); concepts,
public bodies and infrastructure records, which have no page of their own and
open in the explorer; the explorer's full claim list.

Each page has its own `<title>`, meta description (≤ 200 characters, from the
record's stored description or statement, or the collection's question), a
canonical link (`baseUrl` + path), and `og:title`, `og:description` and `og:url`
when indexing is on. `404.html` is `noindex` with no canonical.

## Size and time (this build)

| Item                                        | Value                                                |
| ------------------------------------------- | ---------------------------------------------------- |
| Files in `dist/`                            | 2,889 (limit 20,000; budget 15,000)                  |
| Total size of `dist/`                       | 81.0 MB (33.3 MB before)                             |
| Built HTML                                  | 2,816 files, 47.4 MB raw, about 3.7 MB gzip together |
| Largest page                                | `question/frameworks-to-obligations.html`, 0.7 MB    |
| Pre-render step                             | 50–59 s                                              |
| `pnpm build` in all                         | about 1 min 40 s                                     |
| Renderer bundle (`dist-ssr/`, not deployed) | 9.5 MB                                               |

## Hosting

- `public/_headers`: `Cache-Control: no-cache` for every page, by exact rule
  (`/`, `/index.html`, `/404.html`, `/about`, `/search`, `/explore`, the hubs)
  or one splat per prefix (`/person/*` …); a unit test checks that every built
  page matches exactly one rule. 43 rules, under the limit of 100.
- `sitemap.xml` (indexing on): 2,834 URLs, every page and then `llms.txt` and
  the data files. `robots.txt` unchanged.
- `llms.txt` now says the pages are plain HTML and gives the address patterns;
  About & method is linked at `/about`.
- **Analytics.** The Cloudflare beacon (checked in its current script) wraps
  `history.pushState` and listens for `popstate` in its default single-page
  mode, and reports `origin + pathname + search`. Page changes are therefore now
  counted; `replaceState` changes (open claim, search query typed within a page)
  are not. `site.config.json` is unchanged.

## Tests added or changed

- `src/domain/addresses.test.ts`: every hash form `deep-links.ts` resolved
  (start, `#explorer`, explore with `q`/`view`, hubs, About, search with
  `q`/`mode`/`inspect`, every record and collection kind, `reading` → `question`,
  sections and claims) maps to its path and opens the same target; invalid
  hashes keep the notice; fragments are left alone; `.html`, `index.html` and
  trailing slashes normalise.
- `src/prerender/render.test.ts`: page list completeness, title/description for
  every page, file layout, a person page (every claim statement present), a
  sample of 22 claim pages (statement, qualification, record ID, editorial status,
  every evidence source title), dossier/document/collection pages, no `#/` links,
  the not-found page.
- `src/site/*.test.ts`: headers per page, sitemap with pages, llms.txt patterns.
- `tests/browser/prerender.spec.ts`: with JavaScript disabled, a person, dossier,
  document and claim page carry their text, title and canonical; a claim page
  shows its evidence source, link and review state; every link on four pages
  returns a built page or file; axe on the built HTML alone (application code
  blocked), light and dark; hydration keeps the built heading element and the page
  answers input; a built page with `?inspect=` and `/search?q=` apply the query;
  navigation changes path and title and Back works; 16 old hash forms redirect;
  a hash followed from an open page redirects; axe and overflow at 390/1440 px,
  light and dark, on the four record pages, with no console errors.
- Existing browser specs: `goto('/#/…')` replaced by paths and URL assertions by
  path forms; a few specs still navigate by setting `location.hash`, which now
  exercises the redirect. `tests/browser/fixtures.ts`: `goto` and `reload` wait
  for `html[data-selekoa-ready]`, set once the page runs, unless a test passes
  `waitUntil`; a test that presses a button before then is covered separately.

## Check results

- `pnpm install --frozen-lockfile`: up to date.
- `pnpm -s check`: passed (format, lint, typecheck, 63 unit test files with 585
  tests, build with pre-rendering). The records-chunk size warning predates this
  change.
- `pnpm -s check:privacy`: passed. `dist/` holds no local path or personal
  address; the only address in the built pages is the published contact (an
  `@deepmind.com` domain fragment in one evidence check note is not an address),
  and the only other match is a third-party package's author field in the
  bundled code, as before.
- `pnpm test:browser` (Chromium at `/opt/pw-browsers`, untracked config copy
  without the Edge `channel` line, deleted afterwards): **193 passed (20.6 min)**.
  Earlier runs on this branch failed where specs acted on a built page before it
  ran; that led to the held clicks, read-only controls and the fixture's
  ready-wait described above.
- Without JavaScript: plain HTTP fetches of `/person/eliezer-yudkowsky`,
  `/dossier/openai`, `/document/rsp-v2-0`, `/claim/dario-anthropic-2021` and
  `/propositions/superintelligence` from the preview server return each page's
  title, canonical address and text; the browser spec does the same with
  scripts disabled.
- Hydration: on the person, dossier, document, claim, About, Search, question,
  history and start pages every built element is still in the document after the
  page runs (light at 1440 px and dark at 390 px), with no console errors.

## Open questions

1. **Search terms in the address.** A search's query was in the fragment and
   never left the browser; now `/search?q=…` reaches the host (logs) and the
   analytics beacon on a page load. The About page's privacy text remains accurate
   but does not mention it. Keep, or move the query to the fragment
   (`/search#q=…`)?
2. **Claim pages' main heading** is the explorer's ("Explore the documentary
   record"), and dossiers live in the explorer frame too, as in the app. A
   dedicated claim page with the statement as `<h1>` would read better for search
   results; that is an interface change for a separate decision.
3. **Record pages do not link to claim pages.** Claim rows are toggle buttons
   that open the claim panel in place; crawlers reach claim pages through the
   sitemap. Making each row's "Inspect claim & evidence" a link to `/claim/<id>`
   would change the rows' semantics and many tests.
4. **Sub-path hosting is no longer supported** (absolute asset base). Fine for
   selekoa.org; matters only for trial deployments.
5. **Confirm on the live host** after merge: `/person/jan-leike` served without a
   redirect, `/nope` answered by `404.html` with status 404, `Cache-Control:
no-cache` on pages, and page views counted per path.
6. Topic documents under `docs/` still give `#/…` examples; they redirect and
   were left as written. README and the hosting documents use paths.
