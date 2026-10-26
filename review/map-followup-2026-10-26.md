# Map follow-up, 2026-10-26

Maintainer decisions of 2026-10-26 on the three open questions in
`review/launch-polish-2026-10-26.md`: a higher limit for focused maps, Map
from a claim focuses the claim's subject, and a search map's heading names
the search. No dataset records changed.

## What changed

### 1. Focused maps get a higher limit

- `mapLimits` in `src/domain/query.ts` now has two limits:
  `unfocused` (search and topic maps) stays **100 records / 150
  relationships**; `focused` (a map centred on one record: dossier or
  institution focus, person page, Map from a claim) is **150 records / 225
  relationships**.
- `mapReadable(view, focused)` takes the case explicitly. The explorer
  passes `focused` when a record is in focus; the person page always
  passes it.
- About & method (Keyboard use) states both limits, read from `mapLimits`.

### 2. Map from a claim focuses the claim's subject

- A claim link (`#/claim/…`) still opens the claims list with the claim in
  the inspector. Pressing Map with nothing else narrowing the view now
  focuses the claim's subject (all record types, as when a record is
  selected), draws its direct connections, and keeps the claim selected,
  so its line is marked (`is-selected`, the existing Network highlight).
  The address stays `#/claim/…`.
- The same applies to a claim selected in the unnarrowed list, since the
  case is identical: Map would otherwise show "The map is drawn for a
  search…".
- Reloading a `#/claim/…` address opens the list again, as before; the
  focus is not stored in the address.

### 3. Search map heading names the search

- On the explorer for a search (`#/explore?q=…`, Map or Timeline), the
  heading reads "Search: Anthropic" instead of "All topics". A focused
  record or guided reading still takes the heading, as before. The eyebrow
  "Search results" is unchanged.

## Focused limit and why

Real stars, measured with `queryDataset` (all record types, all years, as
the dossier map and person page draw them):

| Focus                                  | Records / relationships |
| -------------------------------------- | ----------------------- |
| OpenAI (largest)                       | 94 / 144                |
| Anthropic                              | 52 / 90                 |
| OpenAI, Inc.                           | 29 / 38                 |
| xAI                                    | 27 / 53                 |
| Google DeepMind                        | 31 / 37                 |
| John Schulman (largest person)         | 6 / 11                  |
| Paul Christiano (most records, people) | 9 / 8                   |

No real star exceeds OpenAI's, so larger stars were inspected by growing
OpenAI's real neighbourhood with further real records, each joined to
OpenAI by one or two relationships (an untracked local harness rendering
the production `Network` component; not committed):

| Star         | Size      | At 1440 px                                                   |
| ------------ | --------- | ------------------------------------------------------------ |
| OpenAI, real | 94 / 144  | clear star; outer ring labelled; core dense with count marks |
| OpenAI + 26  | 120 / 183 | star holds; outer labels legible; core denser                |
| OpenAI + 56  | 150 / 228 | star holds; outer ring labelled; inner ring needs zoom       |
| OpenAI + 106 | 200 / 303 | disc filled; the star shape and most labels are lost         |

At 390 px every star of this size, OpenAI's real one included, is a symbol
mass whose labels appear on zoom. That was already true under the 100 / 150
rule; the decision rests on the 1440 px reading.

150 / 225 is the largest size at which the star kept its shape and its
labelled outer ring (1.5 × the unfocused limit). Unfocused maps of
similar size were unreadable on 2026-10-26 ("OpenAI" search at 143 / 237,
"Anthropic" search at 73 / 162), so the higher limit applies only to stars. OpenAI's dossier map now
has headroom of 56 records and 81 relationships.

## Checks

- `pnpm install --frozen-lockfile`: ok.
- `pnpm -s check` (format, lint, typecheck, 516 unit tests, build): passed.
- `pnpm -s check:privacy`: passed.
- `pnpm test:browser` (untracked local config: Chromium, no Edge
  `channel`): 148 passed on the first run.
- Axe (wcag2a, wcag2aa, wcag21aa) at 390 and 1440 px, light and dark, on the
  OpenAI dossier map, the map of claim `eval-i-arc-incubation`, and the
  search map for "Microsoft": 0 violations in all 12 scans, no
  horizontal scroll, no console errors.
- Unit tests in `src/domain/query.test.ts`: every core institution's
  neighbourhood is drawn as a focused map; both limits apply, and the
  focused limit is the higher one.
- Browser tests: `evaluation-institutions` now presses Map on a claim link
  and asserts the subject's map with the claim's line selected and the
  claim address kept; `reading-first` asserts "Search: Anthropic".

## Screenshots, described

Not committed. Chromium against the production preview.

- Claim `eval-i-arc-incubation` → Map, 1440 px light: eyebrow "Direct
  connections", heading "ARC Evals", 5 records around ARC Evals; the
  incubation line to Alignment Research Center drawn heavier than the
  others; the inspector still shows the claim; address `#/claim/…`.
- OpenAI dossier → Map, 1440 px: the 94 / 144 star, drawn as before.
- `#/explore?q=Microsoft`, 390 px dark: eyebrow "Search results", heading
  "Search: Microsoft", Map pressed.

## Open questions

1. Map from a claim focuses only the subject. A claim whose object is the
   better-known record (for example a person's role at OpenAI) draws the
   person's small star, not OpenAI's. That matches the decision; say if the
   object should be offered too.
2. The focus that Map adds to a claim link is not in the address, so a
   reload returns to the list. Storing it would need a new address form.
3. Under "Search: …" the line below the heading is still the All topics
   note ("Choose an institution to see its records and dossier, or choose
   a topic."). It reads acceptably but could be a search-specific line.
