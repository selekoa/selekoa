# Compare frameworks: the table on the first screen, 2026-11-01

Branch `compare-first-screen` from `main` at `e7f372c`. Specification: the
maintainer's task of 2026-11-01, following
[`prelaunch-interface-2026-11-01.md`](prelaunch-interface-2026-11-01.md),
section 1. No data change, no release, no deploy setting change. Screenshots
were taken locally at 390, 1280 and 1440 px and stay out of git.

## Problem

On `/compare/frontier-safety-frameworks` at 1440×900 the table began about
1,280 px down the page, below the introduction, the status legend and the
edition pickers. The first screen held no table.

## What changed

- **Header.** Eyebrow, title, then the scope sentence directly under the title,
  then one short paragraph: the page's question and the two-sentence
  introduction (what a row and a column are).
- **One row of controls.** The three views, "Choose editions (N chosen)",
  Copy link and "Download every cell as CSV" sit on one row (wrapping on a
  phone). N counts the editions chosen in place of a framework's latest, as
  in the address.
- **Edition pickers.** Behind the "Choose editions" button (`aria-expanded`,
  `aria-controls`), directly below the row of controls. Collapsed by default;
  opened when the address chooses editions (`?edition=`), on the table and on
  a question's own page. Before the page runs, the button is disabled, as the
  pickers already were.
- **Status legend.** A collapsed `<details>` "What the statuses mean", directly
  above the table (or, on a one-question page, directly above the list of
  frameworks), beside the collapsed "Limits of this comparison". Each status
  label in a cell carries its legend wording as a `title`, so pointer users
  see it on hover.
- **One-question pages** (`/compare/frontier-safety-frameworks/<question>`) get
  the same header, controls and collapsed legend.
- Print hides the controls and the collapsed legend and limits, as before for
  the controls.

## Moved or shortened text (before → after)

No caveat was deleted. Wording is unchanged unless shown.

1. Introduction, sentences 3–6 → moved into "What the statuses mean" (new
   field `reading` in `src/reading/framework-comparison.ts`; the site search
   indexes it with the introduction):
   - "A cell gives what that edition says on the question, with the page, or
     records that no passage was found in a stated search."
   - "Six questions give the edition’s own words; the other twelve give
     Selekoa’s paraphrase, marked as such."
   - "The questions are Selekoa’s."
   - "An edition’s own terms, such as “ASL” or “Critical Capability Level”,
     appear only in quotation marks."
2. Introduction, sentences 1–2 ("Each row is one question, worded so that it
   fits every framework. Each column is one framework, showing its latest
   edition unless you choose another.") → kept as the introduction, in the
   same paragraph as the page's question.
3. The page's question ("What does each developer’s safety framework say on
   the same questions, edition by edition?"), set as a large deck → the first
   sentence of the introduction paragraph, in body size.
4. "A status records what an edition states. It does not show implementation,
   compliance or effectiveness, and a shared row does not make two provisions
   equivalent." → moved from below the introduction to directly under the
   title; visible, not collapsed. One line at 1440 px, two at 1280 px.
5. "Select “Inspect sources and checks” in a cell to open its record in a
   panel; Escape closes it. Each question links to a page of its own." → moved
   from below the edition pickers into "What the statuses mean".
6. Legend heading "What the statuses mean" (an `<h2>` with the list open) →
   the summary of a collapsed `<details>`; the six status definitions are
   unchanged and also appear as each status label's `title`.
7. Edition pickers' summary "Editions shown: the latest of each framework" /
   "Editions shown: your choice" → button "Choose editions (0 chosen)" /
   "Choose editions (1 chosen)" etc. The fieldset legend "Edition shown for
   each framework" and the "(latest)" mark in each option are unchanged; each
   column header still names its edition and date.
8. "Limits of this comparison" → unchanged text, moved from above the controls
   to beside the legend, directly above the table.

## First screen (production preview, Chromium)

Measured with `getBoundingClientRect` on the built pages.

| Viewport | Page                         | First screen holds                                                                                                                                                                                                                                                                                                       |
| -------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1440×900 | table                        | Site header; eyebrow; title; scope sentence on one line; question and introduction (two lines); controls row (292–327 px); legend and limits summaries; table header (391–548 px); "Risk domains covered"; the first question row from 580 px, about 320 px of it (status labels and first paraphrases of five columns). |
| 1280×800 | table                        | The same, scope sentence on two lines; table header 391–548 px; first question row from 580 px, about 220 px of it visible.                                                                                                                                                                                              |
| 1280×800 | table, `?edition=rsp-2023`   | Pickers open below the controls; table header 577–734 px; first row starts below the fold (766 px).                                                                                                                                                                                                                      |
| 1280×800 | question page `/d3-halt`     | Header, controls, question picker, question title and criterion, legend and limits summaries; the list of frameworks starts at 522 px.                                                                                                                                                                                   |
| 390×844  | table address (phone layout) | Site header (two rows); eyebrow; title; scope sentence (four lines); introduction (four lines); controls (459–549 px, views on one line, the three links on two); the question picker and question title; the list of frameworks starts at 816 px — within the first screen.                                             |
| 390×844  | question page `/d3-halt`     | As above; the list of frameworks starts at 785 px.                                                                                                                                                                                                                                                                       |

Before (task statement): the table began at about 1,280 px at 1440×900.

## Accessibility

- Focus order follows the visual order: views → "Choose editions" → Copy link
  → CSV → (pickers, when open) → "What the statuses mean" → "Limits of this
  comparison" → table.
- `<details>` summaries open with Enter or Space; the editions button with
  Enter or Space (browser test).
- Axe (WCAG 2.1 AA) runs on the table and the one-question layout at 1440 and
  390 px, light and dark, with the legend, limits and pickers open.

## Tests

- `tests/browser/framework-comparison.spec.ts`: the legend starts collapsed and
  opens by keyboard; status labels carry their legend wording as `title`
  (built page too); the editions button reads "(0 chosen)", then "(1 chosen)"
  after a choice; new tests that the table header and the start of the first
  question row lie inside the first viewport at 1280×800 and 1440×900, with
  scope, Copy link and CSV in view and legend and pickers collapsed; and that
  an address with chosen editions opens the editions control, on the table and
  on a question page, which also toggles by keyboard.
- `tests/browser/site-search-header.spec.ts`, `tests/browser/per-page-data.spec.ts`:
  open the editions control before choosing; the old "your choice" summary
  assertion becomes the button's count.

## Budgets

Comparison page 289.8 KB of 520 KB (was 288.8 KB); no limit changed. The
per-page slice design is unchanged.

## Open decisions for the maintainer

- The status explanation is a `title` attribute: it shows on pointer hover, and
  screen readers usually read it as a description, but a keyboard user cannot
  open it as a tooltip. A focusable tooltip would add one Tab stop per cell
  (126 in the table). The keyboard route is the legend directly above the
  table. Keep, or add a keyboard tooltip?
- The page's question now sits in body size in the introduction paragraph,
  rather than as a large deck, to save about 60 px. Keep?

## Gates

- `pnpm validate:data`: valid (no data change).
- `pnpm check` (format, lint, typecheck, 833 unit tests passed and 1 skipped,
  build and budgets): passed.
- `pnpm check:privacy`: passed.
- Full browser suite (local config without the `msedge` channel, Chromium,
  deleted afterwards): 318 passed, 1 failed — "the browser takes over the built
  comparison in place" looked for an edition picker that is now hidden until
  opened. The test now opens "Choose editions" first; the comparison spec file
  then passed in full (12 tests). Port 4173 left free.
- Phone, "All frameworks" chosen at 390×844: the table header lies at
  636–793 px, inside the first screen.
