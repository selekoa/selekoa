# Fix: blank page after a click (2026-11-05)

Branch `fix-blank-page-on-click` from `origin/main` at `2fcfdf0`. Interface
only: no `data/`, `release/` or `src/reading/` change, no header or hosting
change. Nothing deployed.

## Report

On selekoa.org a click on a link often showed a blank page; a reload then
showed the page the link named.

## How it was reproduced

Playwright (Chromium, cloud session; no Edge) against the production preview
and, read-only, against https://selekoa.org. Scripts were kept outside the
repository.

| Case (from `/dossier/openai` unless stated)                                                          | Before the fix                                                            |
| ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| Slice answers 500                                                                                    | full load of the link (already handled)                                   |
| Slice answers HTML with status 200                                                                   | full load (already handled)                                               |
| Slice of another records version                                                                     | full load (already handled)                                               |
| Packed slice malformed (`unpackSlice` throws)                                                        | full load (already handled)                                               |
| **Slice of the same records version, other fields** (what another build's code writes)               | **blank page** at the link's address; `TypeError` in the console          |
| Slice in a shape the code does not expect                                                            | page left stays, address already the link's; uncaught error               |
| Page script 404 (`ControlStructure-*.js`)                                                            | full load (already handled)                                               |
| **Start page link, workspace script 404** (`Workspace-*.js`)                                         | **blank page** at `/`                                                     |
| Slow slice, second link clicked meanwhile; rapid clicks                                              | the later link wins; no blank page                                        |
| Real deploy swap (build A loaded, files replaced by build B, link clicked; after the fix, see below) | one full load of build B's page in each case                              |
| selekoa.org, fresh tab: start page → control page, dossier → dossier, dossier → control              | correct pages, no console errors (a blank page needs a deploy in between) |

The same cases are the new browser spec `tests/browser/page-failure.spec.ts`
(deploy-swap slice, unreadable slice, gone page script, start page with gone
workspace script). Against the build of `origin/main` two of its four tests
failed with a blank page (screenshot: empty page, no header); after the fix
all four pass.

## Cause

Two paths drew nothing when the files a tab expected had changed under it
after a deploy, and React, with no error boundary, removed the whole page:

1. **Code and slices of different builds, same records.** A slice is checked
   only against the records' fingerprint (`datasetVersion`), which an
   interface-only deploy does not change (PR 162 on 2026-11-05 changed 35
   files in `src/` and none in `data/`). Slices hold only the fields the
   build's pages read (`src/prerender/trace.ts`), so an open tab's older code
   could read a newer slice that lacks fields it reads. The visit had already
   pushed the link's address, then the render threw: blank page at the right
   address, which a reload fixes, as reported. An error thrown while holding
   the parts (before the render) escaped the visit's error handler for the
   same reason, leaving the old page under the new address.
2. **The start page's links** open the workspace by rendering its lazily
   loaded script; after a deploy that script's hashed file is gone, the
   render throws, and the page goes blank (at `/`).

Hypothesis (c), a race between visits, was not borne out: a later visit
supersedes an earlier one. Hypothesis (d), caching, is not the cause:
`/slices/*` is revalidated (`no-cache`), which is exactly why an open tab
receives the new build's slices.

## Fix

- **Slices name their build.** `scripts/prerender.ts` writes the entry
  script's file name (`index-<hash>.js`, which changes with any code change)
  into every slice as `build`; `src/main.tsx` reads its own from
  `import.meta.url` and refuses, in production, a slice of another build,
  beside the existing records-version check. A refused slice makes the visit
  fall back to a full load, as before.
- **Failures load the page.** `src/ui/page-failure.ts` notes the last link to
  a page of this site the reader followed; `pageFailed` loads that link (if
  followed within 15 s) or the address in view (if it is no longer the one
  loaded), and does nothing during a page's first load, so a page loaded
  afresh cannot loop. It is used by:
  - the roots (`onUncaughtError` of `createRoot` and `hydrateRoot`): any
    render that throws after a change of page, including a dynamically
    imported script that fails (Vite's `vite:preloadError` rejects the
    import, which then throws in the render or in the visit);
  - `whenData` and `whenRecords` (`src/ui/records.ts`) and input held until
    the records load (`src/ui/hold-until-records.ts`), which previously only
    logged the failure, leaving a click that did nothing.
- **The visit catches its own drawing.** `src/ui/page-visits.ts` wraps
  holding the parts and mounting the next page in `try`; a failure there
  reloads the address already pushed.

## Tests

- Unit: `src/ui/page-failure.test.ts` (which page is loaded, once only;
  nothing during a first load; links elsewhere, to files, in new tabs and
  old clicks ignored).
- Browser: `tests/browser/page-failure.spec.ts`, four tests, each with one
  failure on the first request only.
- After the fix, a real deploy swap: build A served, page loaded, the served
  folder switched to build B (same code but one string, so a different entry
  script), link clicked. Dossier → dossier: slice refused as "from another
  build of the site", one full load. Dossier → control page and start page →
  control page: old scripts 404, one full load. Each ended on build B's page.

## Checks

- `pnpm check`: passed (format, lint, types, 92 unit-test files / 959
  tests, build within every budget; no budget raised).
- `pnpm check:privacy`: passed.
- Browser suite once, on Playwright's Chromium through an untracked copy of
  `playwright.config.ts` without `channel: 'msedge'`, deleted afterwards:
  339 passed (32.8 min). The preview it used was started from this worktree
  and served this branch's final build (entry script `index-DVCB2an8.js`, as
  in `dist/`); port 4173 was free afterwards.
- Built app opened (start page → control page, dossier → dossier, back):
  correct pages, no console errors or warnings.

## Uncertain

- Readers whose tab still runs code from before this fix are not helped
  until they reload once.
- The build identifier is the entry script's name. Vite changes it when any
  imported chunk's name changes, which covers every code change seen here;
  a change confined to CSS with the same JavaScript would keep it, but CSS
  does not read slices.
- A render error during a page's first load, or one not caused by a change
  of page, still leaves a blank page (reloading would loop); none was seen.
- When the reader is offline, the fallback now navigates to the link and the
  browser shows its own offline page, as the visit's fallback already did.
