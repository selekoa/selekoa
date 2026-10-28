# Reader fixes, 2026-10-26

Maintainer decisions of 2026-10-26 on the reader test
(`docs/fresh-eyes-2026-10-26.md`): five interface fixes. No dataset records
changed.

## What changed

### 1. Search Timeline and Map cover every claim the List shows

- Cause: the explorer's timeline and map of a search took their claims from
  `queryDataset`, which leaves out proposition records (Ideas & debates). A
  search for an author of those texts found almost nothing there. A search
  address opened directly (`#/explore?q=…`) also started with the record-type
  filter on "Organisations and infrastructure", which dropped people and
  documents.
- `src/domain/search.ts`: `searchClaims(index, query)` returns the claims the
  result list shows as claims or through their passages (`listed`), and the
  records it lists by name (`matched`).
- `src/domain/query.ts`: a `propositions` filter flag keeps proposition
  records. Only a search's timeline and map set it; the explorer's topics and
  institution maps are unchanged.
- `src/Workspace.tsx`: the timeline and map of a search show every listed
  claim, plus, as before, the claims about a record the list matches by name.
  The search banner now says how the two relate, for example: "Claims found by
  the search for “Yudkowsky”: 276. They include all 173 claims behind the
  list’s claims and evidence passages. 103 claims are about a person,
  organisation, document or other record the list matches by name." If the
  explorer's filters hide some listed claims, it says how many. A directly
  opened search address starts with all record types.
- The map draws proposition records as relationships (text → proposition),
  using the existing intellectual line style. A claim about a value (an amount
  or quoted provision) has no second record and cannot be drawn: the map
  caption now says "The map cannot draw N claims about a value … The Timeline
  and the list show them." The caps are unchanged (unfocused 100 records / 150
  relationships, focused 150 / 225); above them the list stands in with the
  existing message.

Measured on the local production build (List claim count → Timeline):

| Search    | List: claims | Timeline: claims (listed + about a matching record) | Map                |
| --------- | ------------ | --------------------------------------------------- | ------------------ |
| Yudkowsky | 169          | 276 (173 + 103)                                     | over the cap, list |
| Hanson    | 61           | 61 (61 + 0)                                         | drawn              |
| Acemoglu  | 45           | 47 (47 + 0)                                         | drawn              |
| Anthropic | 178          | 236 (188 + 48)                                      | over the cap, list |

"Listed" is larger than the List's claim count because claims reached only
through a matching evidence passage are included.

Choice: the timeline keeps the claims about a matching record (as before)
rather than shrinking to the List's claims only. The banner states the split,
which removes the unexplained difference the reader saw for "Anthropic".

### 2. Real links

- `src/ui/NavLink.tsx`: `NavLink` renders `<a href="#/…">`. A plain left
  click opens the page in place through the existing handler, which keeps the
  page's focus and scroll handling; a click with a modifier key or the middle
  button is left to the browser (new tab, new window, copy link).
  `RecordLink` asks a `RecordHref` context for a record's address: person and
  document pages, an organisation's dossier, a proposition's collection page.
  Where a record has no address of its own (it opens as the explorer's focus),
  it stays a button.
- `src/domain/link-hash.ts`: `referenceHash` moved here from `deep-links.ts`
  (re-exported) so the start page builds addresses without loading records.
  `startHref` in `SiteChrome.tsx` maps start-page actions to addresses.
- Converted: the wordmark, primary navigation, "What this means →", footer
  "About & method"; start-page and hub cards, examples and entries; People A–Z;
  "Appears in"; "Document page →" and other record links under rows; claim
  panel endpoints, publisher, version and predecessor/successor links;
  "Related" links between control, commitments and question pages; "Read the
  full document history"; "Open the guided reading →", "Full dossier",
  "Resume the … reading"; Search's List / Timeline / Map switch and its
  "Person page →" / dossier links; "Back to the list of results"; the
  explorer's "Document histories" and Chinese AI histories entries and its
  name-lookup "Person page →" links.
- Kept as buttons: actions that change the current view without a page of
  their own (explorer topics, core-institution focus, Dossier / Map / Claims /
  Timeline switch, "Institution map ↗", "See … connections in the explorer →",
  Inspect / claim rows, Close, copy and download actions, tabs, theme).
- Styling: `a:where(.nav-link)` inherits colour and drops the underline, so
  each link keeps the look of the control it replaced; selectors that styled
  `button` in the header, view switch, side rail, claim endpoints and path
  exits now also cover `a`. Focus styles are the existing `a:focus-visible`
  outline. Selected states use `aria-current="page"` on links.

### 3. Phone claim panel

- At widths up to 940 px the claim panel opens directly below the tapped
  record: after its list item, explorer row or table row. In a table (the
  provisions grid, the commitments matrix, control timelines) it opens in a
  full-width row below the tapped row; the panel is sticky on the left edge,
  so it stays in view while the table scrolls sideways.
- "Close" removes the panel, returns focus to the tapped record and scrolls
  it to the middle of the screen.
- A link followed inside the panel keeps the panel where it is, and Close
  still returns to the original record. The trigger is the focused control,
  or the last clicked control where a browser does not focus a tapped button.
- Not inline: a claim opened from the map canvas or a deep link
  (`?inspect=`), and anything above 940 px. These keep the side-column or
  page-foot placement.
- The panel stays an `aside` named "Evidence inspector" in both placements,
  so screen-reader users find it the same way. axe's WCAG rules pass with the
  panel open inline; the best-practice rule on nested complementary landmarks
  is not in the WCAG set.

### 4. Person pages lead with what concerns the person

- `src/domain/appearances.ts`: `appearanceTotals` counts distinct records on
  the person's texts and distinct records naming them across collections.
- The header line now reads, for Yudkowsky: "Person · 260 records on texts by
  this author · 2 recorded claims about this person · appears in 3
  collections". People who are not authors keep "Person · N recorded claims
  about this person · appears in N collections".

### 5. "2027 · all records"

- Cause: a genuine record, `ny-ch96-effective-date`, an effective date of
  2027-01-01 that the amended New York section states. The data stays as it
  is.
- The year filter now reads "2027 · all records, including scheduled dates",
  the explorer's side rail adds "Dates after the latest check are scheduled
  dates", and the start page's coverage line adds "Dates after the latest
  check are scheduled dates stated in the sources." Each appears only while
  the latest dated record is later than the latest source check.

## Checks

- `pnpm install --frozen-lockfile`
- `pnpm -s check`: passed (format, lint, typecheck, 521 unit tests in 59
  files, build).
- `pnpm -s check:privacy`: passed.
- `pnpm test:browser`, run with Chromium through an untracked config without
  the Edge `channel` line, against the production build: 157 passed (148
  existing, 9 new), with the beacon removed from the served copy (see the note
  below).
- New tests: `src/ui/links.test.ts` (every start, hub and "Appears in" address
  resolves; link versus button rendering), `searchClaims` in
  `src/domain/search.test.ts`, `appearanceTotals` in
  `src/domain/appearances.test.ts`, and `tests/browser/reader-fixes.spec.ts`
  (search coverage, year label, real links with new-tab and keyboard use,
  person header, phone panel placement and return, axe at 390 and 1440 px in
  light and dark on start, a hub, Search List / Timeline / Map for
  "Yudkowsky", a person page, a dossier and a collection page, with console
  checks).
- Existing browser tests that looked up converted controls as buttons now look
  them up as links.
- `tests/browser/explorer.spec.ts` ("About & method states coverage…") still
  expected the pre-launch contact placeholder and the `noindex` robots tag,
  and failed on `main` since the launch configuration (#58, #62). It now reads
  `site.config.json`: with a contact set it expects that address and no other,
  and with indexing on it expects no robots tag. Without them it checks the
  placeholder and `noindex` as before.
- Inspected the app at 390 and 1440 px: start page, Institutions hub, search
  and its timeline, person page, dossier, and the inline panel on the
  propositions, frameworks, commitments, control and search pages. No console
  errors.

### Test environment note

On current `main` the production build includes the Cloudflare Web Analytics
beacon (#62). Served from `127.0.0.1`, the beacon's reporting request fails
CORS and logs console errors, so every browser test that asserts a clean
console fails (98 of 148 here before any change). For these runs the beacon
tag was removed from the served copy of the build only; the source and the
deployed build are unchanged. A maintainer running `pnpm test:browser` against
an unmodified build will see the same failures until the tests or the local
build leave the beacon out. Decision for the maintainer: build without the
beacon for local previews, or have the console checks ignore it.

## Reader-test findings still open

Data (handled in a separate session):

- The "Stabilization" author string on the 1955 hearings record.
- The Summers person page date line ("Source published 2023-11-29 · Source
  publication date unknown").
- Person records for authors in the proposition collections (Hanson,
  Bostrom, Leontief, Nordhaus, Acemoglu, Buckingham and others), and their
  listing in People A–Z.

Interface and editorial, not in this change:

- Linking the author's name on a document page to the person page (the
  second half of ranked fix 5). It needs a rule for matching a printed author
  name to a person record.
- "Texts by other writers that bear on this" between collections (fix 6).
- Codes and process wording in claim text and panels (fix 8).
- Search spelling variants, doubled quote marks in the banner, interleaving
  publishers (fix 9).
- Frameworks page link to its research question and abbreviation expansion;
  a plainer "Not found" panel (fix 10).
- The Search List's filters (record type, collection, organisation, years,
  whole words) are not carried to the Timeline and Map, which use the search
  text only.
- Decisions: a cross-lab "Compare a provision" view, and a smaller starter
  for very large collections.
