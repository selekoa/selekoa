# Spines aligned with hubs (2026-10-27)

Maintainer decision of 2026-10-27: one internal research spine per reader-facing
hub. Hub names in the menu are unchanged; each hub page gains a subtitle naming its
spine.

| Hub                   | Spine and hub page subtitle                                |
| --------------------- | ---------------------------------------------------------- |
| Governance            | Frontier AI governance                                     |
| Ideas & debates       | Human thought and institutions around machine intelligence |
| Institutions & people | The institutional history of machine intelligence          |

## What changed

- `src/ui/Hub.tsx`: `hubSubtitles` and a subtitle line under each hub page title.
  The Ideas & debates page adds one line: "Institutions here are the forums,
  journals, mailing lists and organisations where the debates took place." The
  pre-rendered pages use the same component, so `dist/governance.html`,
  `dist/ideas.html` and `dist/institutions.html` carry the subtitles (checked in
  the build output). Styles in `src/ui/reading-first.css`.
- The Institutions & people page is otherwise unchanged: the "Chinese AI
  histories" dossier group stays, with no priority label for readers.
- `docs/project-positioning.md`: the three spines restated with the names above,
  each mapped to its hub; Chinese frontier-AI institutional history recorded as a
  priority strand inside the institutional spine. Existing content kept.
- `AGENTS.md`: the spine sentence uses the same names; nothing else changed.
- `docs/roadmap.md`: new Backlog entry for AGI term provenance (earliest located
  uses; Gubrud 1997, Goertzel and Pennachin 2007, Goertzel's account of Shane
  Legg; person records for Goertzel and Legg).
- Tests: `src/prerender/render.test.ts` asserts the pre-rendered subtitles and the
  Ideas line; `tests/browser/hubs.spec.ts` checks each hub page opened from the
  menu and loaded directly, the Ideas line only on that page, no "priority" text,
  and an axe scan. No existing test encoded the hub page lede, so none needed
  updating.

No data, dataset, site configuration or deployment changes.

## Checks

- `pnpm install --frozen-lockfile`: passed.
- `pnpm check`: format, lint, typecheck and build passed. Unit tests: 587 of 588
  passed in the full parallel run (twice); the one failure was
  `src/domain/appearances.test.ts` (untouched by this change) hitting its 60 s
  timeout under load. Run alone it passed (4/4, 67 s).
- `pnpm check:privacy`: passed.
- `pnpm test:browser`: run with installed Chromium through an untracked copy of
  `playwright.config.ts` without the Edge `channel` line, deleted afterwards.
  194 of 194 passed, including the new hub subtitle test. The hub pages were
  also inspected visually at 1280 px and 390 px.
