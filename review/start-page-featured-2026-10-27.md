# Start page: featured question label and map link (2026-10-27)

Maintainer decisions of 2026-10-27.

## What changed

- `src/ui/Landing.tsx`: above "Who controlled OpenAI, and when? →" a small
  eyebrow label, "A question the records answer:". Below it a second featured
  link, "See it as a map: OpenAI’s direct connections →", to
  `/dossier/openai?view=map`. Both are real links (`NavLink`); a plain click
  opens the page in place. The pre-rendered start page uses the same component,
  so `dist/index.html` carries the label, both links and the `href` (checked in
  the build output). Spacing in `src/ui/reading-first.css`; the label reuses the
  existing `.eyebrow` style.
- Map address. The focused map had no address of its own: a map of one record
  wrote `/explore`, which reopens the unfocused list. Minimal support added:
  - `src/domain/addresses.ts`, `src/domain/deep-links.ts`: the dossier address
    accepts `view=map` (`/dossier/<organisation>?view=map`, optionally with
    `inspect`). Any other `view` value is an invalid link, as before.
  - `src/Workspace.tsx`: the address opens the explorer's map focused on the
    organisation with every type of record (the same filters as choosing the
    organisation in the explorer). While the map of an organisation with a
    dossier is in view and no claim is inspected, the page writes this address;
    switching between Dossier and Map replaces the history entry, since both are
    one page. An inspected claim keeps its claim address, as before (Map from a
    claim still writes `/claim/<id>`).
  - `src/ui/SiteChrome.tsx`: the start-page `dossier` action takes `view: 'map'`.
  - A built page opens at its path (`/dossier/openai`, the dossier HTML) and
    then applies `view=map` in the browser, as it already does for `inspect`.
    No new page is pre-rendered.
- Map size at this address: 95 records and 145 relationships, within the
  focused limits (150 and 225); the map is drawn, not withheld, at 1440 px and
  390 px. On a phone the map sits below the explorer's filter panel, as for every
  explorer map.
- `docs/roadmap.md` Backlog: three entries, worded as decided: (B, next in line)
  Compute, power and orbit; (C) AI and biosecurity; Kinds of AI and technical
  history.

## Tests

- `src/domain/addresses.test.ts`: the map address is written and read, with and
  without `inspect`; other views are rejected; OpenAI’s focused map is within the
  limits.
- `src/ui/links.test.ts`: the new start-page action resolves to a page.
- `tests/browser/start-featured.spec.ts`: without JavaScript, the built start
  page carries the label and both links with their addresses; at 1440 px and
  390 px the map link opens a drawn map (canvas present, no withheld notice,
  heading "OpenAI", Map pressed), the address reopens it from the built dossier
  page, and switching to Dossier writes `/dossier/openai`; no console errors.
- Accessibility: `tests/browser/reading-first.spec.ts` runs axe (WCAG 2 A/AA,
  2.1 AA) on the start page at 1440 px and 390 px in light and dark; it now covers
  the new label and link.

## Checks

`pnpm install --frozen-lockfile`, `pnpm -s check`, `pnpm -s check:privacy` and
`pnpm test:browser` (Chromium with a temporary local config without the Edge
channel line; deleted afterwards). `pnpm check`: 601 unit tests passed, build
pre-rendered 2944 pages. Privacy scan passed. Browser suite: 205 passed. A first
browser run failed one test (`evaluation-institutions.spec.ts`: Map from a claim
must keep `/claim/<id>`); the dossier-map address now yields to an inspected
claim, and the rerun passed.

Style self-check on the touched reader-facing files: no banned words, no
em-dashes. The roadmap entry keeps the em-dash of the maintainer's wording; it is
maintainer documentation, not reader-facing text.

## Open decisions

- The map shows every type of record (95). Choosing "Organisations and
  infrastructure" in its Show filter gives 14 records; the link could open that
  narrower view instead.
- On a phone the reader lands at the top of the explorer and scrolls to the map.
  Scrolling to the map on arrival is a possible follow-up.
- The map address keeps the dossier's page title ("OpenAI: institutional
  dossier"), since titles come from the path alone.
