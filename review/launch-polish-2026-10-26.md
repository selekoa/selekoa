# Launch polish, 2026-10-26

Maintainer decisions of 2026-10-26: a machine-first header status line, and
maps drawn only when they can be read. No dataset records changed.

## What changed

### 1. Header status line

- `src/ui/SiteChrome.tsx`: the header line now reads "Records found and
  checked by machines, not reviewed by an editor · What this means →".
  "Research preview" and "yet" are gone from the header. The footer
  ("Selekoa · research preview") and About's Publication note keep
  "research preview".
- Searched all reader-facing text in `src/` (UI, About, Inspector,
  `src/reading` definitions, export headings in `src/domain`, `index.html`
  noscript) for the "not yet reviewed / not yet checked by an editor"
  framing. The header was the only instance. The remaining "yet"
  occurrences concern coverage ("Not yet covered", "No records in this
  section yet", "No authorship claim recorded yet") or licensing ("not yet
  licensed for reuse"), not editorial review, and stay.
- `tests/browser/reading-first.spec.ts` updated to the new wording.

### 2. Maps only where they can be read

- **No whole-dataset map.** With no search query, no topic and no focused
  record ("All records" / "All topics"), the explorer's Map view shows the
  claims list with the line "The map is drawn for a search, a topic or an
  institution. Search or choose one to see its map."
- **Size cap.** `mapLimits` in `src/domain/query.ts`: at most **100 records
  and 150 relationships** (relationships = claims whose object is a record).
  Above either limit the list is shown with "N records and M relationships
  match, too many for a readable map. Narrow the search or the filters, or
  choose an institution, to see its map." The person page applies the same
  rule (no person currently exceeds it; the largest has 9 records).
- **Dossiers.** Institution dossiers already had a 1-hop neighbourhood map:
  the dossier opens inside the explorer, whose Dossier / Map / Claims /
  Timeline switch draws the institution's direct connections with the same
  `Network` component and `queryDataset` focus pattern as the person page.
  No new component was needed; the cap applies there too.
- **Search.** The List / Timeline / Map switch on Search is unchanged.
- **Label.** The explorer topic "Overview" is now "All topics". Addresses
  are unchanged: `#/explore`, `#explorer` and `#/explore?q=…` resolve as
  before.
- Map legend: "The core institutions anchor the overview" became "… anchor
  the layout". About & method (Keyboard use) states the rule and the limits,
  read from `mapLimits`.
- **Timeline for all records stays.** It is a dated text list, not a
  drawing; at all records it is long but each row reads on its own, and
  the Through year filter shortens it.

## Threshold and why

Measured with `queryDataset` on the current data (records / relationships):

| Case                                  | Size      | At 1440 px              |
| ------------------------------------- | --------- | ----------------------- |
| All topics, default type filter       | 94 / 122  | withheld (unnarrowed)   |
| All topics, all types                 | 500 / 988 | withheld (unnarrowed)   |
| Topic: People                         | 281 / 479 | solid mass              |
| Topic: Governance                     | 165 / 281 | solid mass              |
| Search "OpenAI"                       | 143 / 237 | solid core, labels lost |
| Search "Anthropic"                    | 73 / 162  | dense core, edges lost  |
| Search "safety"                       | 98 / 119  | dense, readable on zoom |
| Topic: Ideas & lineages               | 94 / 123  | dense, readable on zoom |
| Focus: OpenAI (largest neighbourhood) | 94 / 144  | star, labels legible    |
| Search "Microsoft"                    | 27 / 39   | clear                   |

The suggested starting point (150 / 300) still drew "OpenAI" search
(143 / 237), which was unreadable. The relationship count is the better
signal: "Anthropic" search has only 73 records but 162 relationships and
its core was a knot. 100 / 150 keeps every institution's direct-connection
map (OpenAI's star at 94 / 144 is the largest and still legible) and the
mid-sized topic and search maps that zoom resolves, and withholds the sets
that were solid masses.

Open risk: OpenAI's neighbourhood sits just under both limits. Corpus growth
will soon push it over, and its dossier map will then show the list.

## Screenshots, described

Not committed. Taken with Chromium against the production preview.

- Header at 1440 px: one muted line under the navigation, "Records found and
  checked by machines, not reviewed by an editor · What this means →", the
  link underlined in accent green. At 390 px it wraps to two lines.
- Explorer without filter, 390 px dark: rail with "All topics" selected,
  heading "All topics", Map pressed, then a left-ruled note "The map is
  drawn for a search, a topic or an institution…" above the claims list.
  No canvas.
- Search "Anthropic" → Map, 1440 px: note "73 records and 162 relationships
  match, too many for a readable map…", then the claims list.
- Search "Microsoft" → Map, 1440 px: 27-record map, labels for OpenAI,
  Microsoft AI, Anthropic, Amazon and people legible.
- METR dossier → Map, 1440 px: star of 8 records around METR, every label
  legible; the inspector lists the 7 relationships.
- Paul Christiano person page, Map tab: small star, unchanged.

## Checks

- `pnpm install --frozen-lockfile`: ok.
- `pnpm -s check` (format, lint, typecheck, 516 unit tests, build): passed.
- `pnpm -s check:privacy`: passed.
- `pnpm test:browser` with an untracked local config (Chromium, no Edge
  `channel`): first run 144 passed, 4 failed. All four asserted the
  whole-dataset map or a search map now over the cap (cartography overview,
  explorer "map renders", reading-first Search → Map for "Anthropic",
  evaluation-institutions Map from a bare claim link). Updated to assert the
  list fallback and to draw a narrowed map instead. Final run on the
  pushed code: 148 passed.
- Axe scan, 390 px and 1440 px, light and dark, on the start page, Search
  "Anthropic" (list), Search → Map drawn ("Microsoft") and withheld
  ("Anthropic"), explorer without filter, METR dossier and its map, Paul
  Christiano person page and its map: 0 violations, no horizontal scroll,
  no console errors.
- New unit tests in `src/domain/query.test.ts`: the whole dataset is not
  drawn, at least one core institution's neighbourhood is, and both limits
  apply.

## Open questions

1. OpenAI's neighbourhood is at 94 / 144. When it passes the cap, should a
   focused (star) map get a higher limit than an unfocused one? Star layouts
   stayed legible at sizes where unfocused layouts did not.
2. A claim link (`#/claim/…`) opens the explorer with no narrowing, so its
   Map button shows the list. Should Map from a claim focus the claim's
   subject instead?
3. On a search map the heading reads "All topics". A heading naming the
   search ("Search: Anthropic") may read better.
