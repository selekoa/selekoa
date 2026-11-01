# Data loading, stage c5: navigation from slices (2026-10-31)

Sixth stage of design (c) ([`docs/data-loading-design-c.md`](../docs/data-loading-design-c.md),
section 3b), branch `data-c5-navigation` from `main` at `754ce57` (after
c4, PR 106). No data, release, export, header or hosting setting changed.
Nothing was deployed.

## The problem

After c4 a page drawn from its slice answered a click on a link by loading
the whole records (relation core and content, about 1.1 MB transferred on the
phone profile) and only then drawing the next page in place; pointing at any
control started that load. The c4 design panel recommended loading only the
next page's slice instead, drawing the page exactly as a fresh load of its
address would.

## Maintainer decisions (2026-10-31)

1. Slice-only navigation as recommended, with its cost accepted: a link
   opens its page as a fresh load does, so a bookmark resume, an open claim
   panel and chosen filters do not carry over. Hovering or focusing a link
   prefetches only that page's slice. The whole-records path stays only
   where a page needs it, listed below.
2. Fix the existing bug: on a claim page drawn from its slice, the link to
   the claim's organisation drew the explorer instead of the dossier.

## What changed

- **Links open pages from their slices** (`src/ui/page-visits.ts`). On a
  page drawn from its slice, a plain click on a link (or Enter on it) whose
  address has a slice, or needs no records (search), fetches only what that
  address needs (`dataNeeds`) and the page's code; the page in view stays
  meanwhile. Then, in one render, the store holds those parts and nothing
  else, the address is pushed and App mounts the workspace afresh at the
  address's path. The workspace's state comes from `locationState` and the
  same opening effect a fresh load runs. No page is drawn from a union of
  page slices.
- **Back and forward** to such an address do the same without a new
  history entry (`restore` in `src/Workspace.tsx`).
- **The store** (`src/ui/records.ts`): `partsFor` fetches a page's parts
  without holding them and returns the step that holds only them
  (`holdOnly`); `prefetchParts` fetches without holding. Files are fetched
  once (`fetchOnce`). Holding only the next page drops the page left's slice
  and claim buckets and forgets their files; a bucket still loading for a
  page left is not held when it arrives (a visit counter), and input held on
  a page left is not given again (`pagesOpened` in
  `src/ui/hold-until-records.ts`).
- **Prefetch**: pointing at or focusing such a link fetches only its page's
  parts and code. Other controls still prefetch the whole records.
- **Search page**: its links to pages with a slice open those pages from
  their slices (`holdUntilRecords({ linksOnly: true })`); its other changes
  of page still wait for the records, as before.
- **Versions**: a part is refused unless its dataset fingerprint is the
  build's own (`version`, new in `virtual:site-facts`, checked in
  `src/main.tsx`). Before c5 a part was checked only against the other parts
  held; with the store holding one page's parts, a slice from a newer deploy
  would otherwise be drawn with this build's collection index. A link whose
  parts fail or are refused becomes an ordinary page load; a step back or
  forward, a reload.
- **Title check at build**: `checkSlice` (`src/prerender/render.tsx`) also
  requires the title read from the slice to equal the title read from the
  whole dataset; the browser sets the next page's title from its slice.
- **Bug fix**: the view a selected record opens is now a pure function
  (`entityView` in `src/ui/views.ts`) and opens an organisation's dossier
  from a claim's own page too. On a page drawn from its slice the
  organisation link now opens by its address, so it reaches the dossier
  either way.
- **Links to a proposition** (`recordPath` in `src/ui/record-path.ts`) now
  carry the proposition's section as a fragment
  (`/propositions/superintelligence#proposition-a4`). Before, the link's
  handler scrolled to the proposition and focused its heading, which its
  address did not say; opened from a slice, the page would have opened at
  the top. The page is opened at the address without the fragment, then
  scrolled to the section with focus on its heading; without scripts the
  browser scrolls to it. The header's "What this means →" link likewise
  now names How this was checked (`/about#about-method`), which its handler
  opened (found by the review below).
- **A cursor that has not moved** since a page was opened beneath it
  prefetches nothing (`pointerResting` in `src/ui/page-visits.ts`). Found in
  the 390 px inspection: after a link, Chromium reported the resting mouse
  as over the "Download research starter" disclosure the new page put
  beneath it, which loaded the whole records (1.1 MB) without the reader
  pointing at anything. Touch has no hover, so the phone measurements below
  were not affected; on a desktop it would have undone much of the gain.
- **Measurement**: `tsx scripts/measure-load.ts --clicks` measures changes of
  page made in the page (below).

## Built HTML

Compared with `main` page by page without `/assets/` tags
(`scripts/page-hashes.ts`, then each changed page compared with those two
links' fragments removed): all 4,537 pages differ only
in two links. The header's "What this means →" link names
`/about#about-method` on every page, and 2,478 links to a proposition on
1,135 pages name its section (`#proposition-…`). Nothing else differs.

## Review

A fresh-context adversarial review (four lenses: store and ordering,
equivalence with a fresh load, reader-facing behaviour and history, tests
and claims; each finding then checked by a separate skeptic told to refute
it) reported ten findings; nine were confirmed and are fixed, with tests:

1. A link whose slice was slow could land after a change the reader had
   made in place meanwhile (a held click given once the records arrived),
   replacing it and dropping the records. A link's visit now gives way to
   any change of address made since the click.
2. A restore still loading in a workspace that a link had replaced could
   rewrite the address of the page opened. The workspace's cleanup now
   cancels it.
3. A step back or forward could be lost when the page being left wrote its
   own address while the next page loaded (records arriving re-render it).
   The page in view now writes no address while a step back or forward
   loads.
4. A step back to a page opened from its slice landed at the top or at a
   position cut short by the page left. The position is kept in the history
   entry's state and restored.
5. and 6. The search page's link to its own list remounted the page and
   reset the reader's order, filters and names-only mode. That link is no
   longer a change of page there, and its address carries the mode.
6. The header's "What this means →" link opened About & method at the top
   instead of How this was checked. It now names the section (above).
7. The test for a resting cursor hovered a hidden, exempt button and could
   not pass; it now hovers a control in the page.
8. This record said the "after" measurements were of code later changed
   only in tests and documents; later commits changed code. The
   measurements were taken again on the final build (below).

Not confirmed: that the back-and-forward coverage is thinner than stated.
One browser step crosses a document boundary on purpose, and the record now
says so.

## Where the whole records still load

1. Any input other than a link on a page drawn from its slice: filters,
   tabs, selects, fields, buttons such as Close, map and timeline switches,
   exports and research starters.
2. Links to addresses without a slice: the start page (`/`); any query
   other than `inspect` (a section, an edition, a bookmarked claim, a
   dossier's map); the explorer's search and timeline addresses
   (`/explore#…`).
3. Records without a page of their own, drawn as buttons (such as an
   organisation in the explorer, which becomes its focus).
4. On the search page: the claim panel and changes of page that are not
   links.
5. The start page's actions, which open the workspace with the whole
   records, as before.
6. A page taken over at its own address whose slice cannot be loaded.

Once the whole records are held, every change of page is made in place, as
before c5.

## Measurements

Phone profile, `tsx scripts/measure-load.ts --clicks --runs 3`: 4× CPU, Fast
3G, 390 × 844, median of three, on this machine (4 processors). Each run
loads the first page cold, waits until the network has been quiet for two
seconds, then taps the link. "Drawn" is the time from the tap until the next
page's address is set and its content is in the page (the claim panel's
heading; the person page's and guide's main heading). "Transferred" is every
byte from the tap until the network has been quiet for two seconds, so it
includes prefetching started by the tap. "Before" is the build of `main` at
`754ce57`; "after" the build of `e86c5ac`, this branch's final code. Both
were measured one after the other on an otherwise idle machine, after all
fixes; an earlier pair, taken at `31dcbfc` before the review, agreed within
5%.

| Change of page                                                          | Drawn, before | Drawn, after | Transferred, before → after |
| ----------------------------------------------------------------------- | ------------: | -----------: | --------------------------: |
| Dossier → claim (`/dossier/openai`, its first claim link)               |           965 |          924 |                  18 → 18 KB |
| Claim → person (`/claim/dario-anthropic-2021` → `/person/dario-amodei`) |        10,875 |      **793** |                1,111 → 8 KB |
| Hub → guide (`/governance` → `/guide/frontier-frameworks-and-law`)      |         8,439 |    **3,036** |              1,113 → 247 KB |

Runs: before 905/982/965, 11,389/10,665/10,875, 8,461/8,439/8,302; after
924/924/954, 793/777/796, 3,056/3,028/3,036.

- **Dossier → claim: no gain.** A claim link opens the claim's panel in
  place, and in c4 it already loaded only the claim's bucket. The
  difference is within run-to-run noise. A claim's own page opens from a
  dossier only in a new tab, which is a fresh load.
- **Claim → person: about 14 times faster, with about 140 times fewer
  bytes.** It loads the person's slice and page code instead of the whole
  records.
- **Hub → guide: about 2.8 times faster, with about 4.5 times fewer bytes.**
  The guide's slice is the largest (see c4, "What is left"), and its 247 KB
  dominate the time.
- **The cost moves rather than disappearing for readers who then use a
  control.** The first filter, tab or select on the opened page loads the
  whole records (about 1.1 MB), as on a fresh load of that page. A reader who
  only follows links and opens claims never loads them.

First loads are unchanged apart from code. Each page type's budget sum grew
by 1.0–1.2 KB gzip (the navigation code), and no limit was raised.

## Gates and checks

- **Hydration identity** for every built page: the build draws each page
  from its slice in all three ways, as in c4, and now also checks the
  page's title from the slice. Pre-rendering: 4,536 pages, 1,223 slice
  files, no page needing the relation core.
- **Split completeness** and **search identity**: unchanged code paths; the
  existing tests pass.
- **Budgets**: every page type within its unchanged limit (closest: Search
  258.6 of 275 KB).
- **Build time**: `pnpm build` 94 s on the final code (pre-rendering 41 s),
  on this machine.
- **New unit tests**: `src/ui/records-visits.test.ts` (stub files: after a
  link the store equals a fresh load's for a page, a page with `?inspect=`
  and search; a bucket for a page left is never held; fetched files of the
  page left are dropped; prefetch holds nothing and fetches once; pages that
  need the records and parts of different versions are refused);
  `src/prerender/hydration.test.ts` ("opens pages by links and by back and
  forward…": a walk through one page of every type with a slice and the
  search page and back, each step from a page holding its slice and a claim
  bucket, comparing the store with a fresh load's and the drawing at 1440 and
  390 px with the drawing from the whole dataset; it fails when the store
  keeps the page left's parts); `src/ui/views.test.ts` (the bug).
- **New browser tests** (`tests/browser/slice-navigation.spec.ts`): 14 links
  covering every page type with a slice and the search page, each compared
  with a fresh load of the same address (title and every element, attribute,
  style, form value and text, ignoring only React's generated IDs and
  server comments), each fetching only the next page's slice and never the
  whole records; back and forward over four pages; a page opened by a link
  holding nothing of the page left (an open claim panel closes, only the
  next slice is fetched); pointing at a link fetching only its slice; the
  organisation link on a claim page opening the dossier, drawn as a fresh
  load; a link to the start page still loading the whole records; and, from
  the review, a slow link giving way to a later change, a step back
  restoring the reader's place, the search page's List link keeping the
  order chosen, "What this means →" opening How this was checked, and a
  resting cursor prefetching nothing until it moves. In the back-and-forward
  test one step crosses a document boundary on purpose (the claim page is
  reached by its address); the steps between pages drawn from slices are
  the others. The c2 test "any other change of page loads the records
  first" now asserts the new behaviour, and the frameworks-and-law test
  waits for its filter click, which is now held until the records load, as
  on a fresh load of the guide.
- `pnpm -s check`: see "Checks run" below.
- `pnpm -s check:privacy`: see below.

## Checks run

- `pnpm -s check`: passed on the final code (79 files, 724 unit tests; build
  with every page checked, budgets within limits).
- `pnpm -s check:privacy`: passed before each push.
- Browser suite (Chromium, an untracked config without `channel: 'msedge'`,
  deleted afterwards; no other server on port 4173): **269 passed
  (25.0 min)** on the final code (`e86c5ac`; the later commits
  change only this record and the design document). Earlier runs on the same
  branch: 261 passed and 3 failed (the frameworks-and-law timing, and two
  proposition links that opened their page at the top; both fixed, see
  "What changed"); then 264 passed.
- Inspection at 1440 and 390 px of ten links (hub to guide and to
  comparison, claim to person and to its organisation's dossier, hub to
  dossier, person to document, hub to propositions, claim panel to a
  proposition, search to document, document to explorer): each opened at
  the top with focus on its content (the proposition at its heading), no
  horizontal overflow, no console error, and only the next page's slice
  fetched, never the whole records.
- Built HTML compared with `main`: see "Built HTML".

## After the merge (2026-10-31)

PR 107 was merged with the branch at `999aadf`, before the review's fixes
(`e86c5ac`) and the final record. On `main` the browser test "a page opened
beneath a cursor that has not moved loads nothing more" then failed (timed
out): its first version hovered `summary, button`, whose first match is the
header's search button, hidden at 390 px and exempt from prefetching. The
test was wrong, not the behaviour; this was finding 8 of the review, already
fixed in `e86c5ac` (it hovers a control in the page). The three unmerged
commits reach `main` through branch `fix-slice-nav-cursor-test`, cherry-picked
onto `main` after PR 109; the hashes above are those on `data-c5-navigation`.
The checks of that branch are recorded in its commit and pull request.

## Decisions

- The two HTML changes (section fragments on proposition links and on
  "What this means →") follow from the decision that a link opens its
  address as a fresh load does. **Maintainer decision (2026-10-31):
  accepted.**
- Possible follow-ups, not done: let a link to the start page open without
  the whole records (the start page needs only its summary); move the root
  element's `data-path` with the page (read only at boot today, so
  harmless).
