# Design tokens

All colours, and the shared type, spacing and radius values, are CSS custom
properties in [`src/tokens.css`](../src/tokens.css). It is the only file
under `src/` that may contain a literal colour. A unit test
(`src/ui/design-tokens.test.ts`, run by `pnpm check`) fails if any other
stylesheet uses a hex value, a colour function or a named colour, if a colour
token lacks a dark value, or if a stylesheet refers to a token that does not
exist.

## How the themes work

Each colour token holds both values: `--color-text: light-dark(#27342f, #d6dbd4)`.
The browser picks one from the page's `color-scheme`. By default the page
follows the reader's system setting. The app sets `data-selekoa-theme` on
`<html>`, and the header toggle changes it, which fixes the scheme. The attribute is the app's own, so a host page that wraps the app
and sets `data-theme` does not affect it. `body` and `#root` set their own
`color-scheme`, background and text colour, so a host stylesheet that gives
`body` a background cannot leave light text on a light page. The toggle's
choice, and nothing else, is kept in `localStorage` (key `selekoa-theme`) for
later visits. Until the reader presses it, the page follows the system
setting; where storage is unavailable, the choice lasts for the visit. There are no per-selector dark-mode rules; a page written with
tokens is right in both themes.

The dark palette has its own values: four surface levels a few steps apart, off-white text at 9 to 13:1 rather than pure white on near-black,
muted text at 4.8:1 or more on every surface, and accents lightened and desaturated so they do not glow.

## Tokens

Colour:

| Token                                                             | Use                                              |
| ----------------------------------------------------------------- | ------------------------------------------------ |
| `--color-page`                                                    | page background                                  |
| `--color-surface`                                                 | header, explorer panels                          |
| `--color-raised`                                                  | cards, the Inspector, inputs, notices            |
| `--color-sunken`, `--color-sunken-soft`                           | boxed notes, filters, limits, qualifications     |
| `--color-hover`, `--color-selected`                               | row and button states                            |
| `--color-text`, `--color-text-subtle`                             | body text, secondary strong text                 |
| `--color-text-muted`                                              | notes, metadata, labels                          |
| `--color-on-accent`                                               | text on a filled family colour                   |
| `--color-border`, `--color-border-strong`                         | hairlines; input and control outlines            |
| `--color-rule`                                                    | decorative left rules and underlines             |
| `--color-accent`                                                  | links, current page, selection                   |
| `--color-brand`, `--color-brand-text`                             | wordmark dot, comparison label                   |
| `--color-focus`                                                   | keyboard focus ring                              |
| `--color-status-*`                                                | supported and stated-in-source labels            |
| `--color-caution-*`                                               | contested and unresolved labels, dispute notes   |
| `--color-inferred-*`                                              | inferred and posed labels                        |
| `--color-assessment-*`                                            | assessment basis label                           |
| `--color-quote-text`, `--color-quote-rule`                        | source passages                                  |
| `--color-match`                                                   | search match highlight                           |
| `--color-people`, `-ideas`, `-capital`, `-compute`, `-governance` | record families in the map, legends and dossiers |
| `--color-shadow`, `--color-backdrop`                              | shadows, dialog backdrop                         |

Type: `--font-sans`, `--font-serif`; sizes `--text-3xs` (9px) to `--text-lg`
(16px); headings `--heading-display` (40px, start page), `--heading-page`
(36px, page titles), `--heading-section` (26px, section headings),
`--heading-sub` (22px, entries, editions, years) and `--heading-minor` (20px).

Spacing `--space-1` to `--space-8` (4, 8, 12, 16, 24, 32, 40, 48 px) and radii
`--radius-sm`, `--radius-md`, `--radius-lg` (2, 3, 4 px).

## Adding a page without breaking dark mode

1. Use tokens for every colour, including borders, shadows, SVG fills and
   inline styles. If no token fits, add one to `src/tokens.css` with both a
   light and a dark value and check its contrast against every surface it can
   sit on (4.5:1 for text).
2. Do not write `[data-selekoa-theme='dark']` rules or `prefers-color-scheme` queries
   in page stylesheets.
3. Reuse the shared patterns: the header's `.site-status` line is the only
   dataset-wide review notice (pages add none of their own), the sunken box
   (`--color-sunken`, 1px `--color-border`) for limits and filters, the
   heading sizes above for page, section and entry headings, and accent
   underlined links.
4. Run `pnpm check`, then look at the page in both themes at 1440px and 390px.
   The browser suite's axe scans cover both themes for most page types.

Colours drawn by Sigma into WebGL cannot read CSS variables. The map draws its
visible marks as SVG with tokens instead, and its WebGL edges are transparent.
