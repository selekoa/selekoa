# Compute guide: follow-ups (2026-10-31)

Follow-ups to the compute guide (`/guide/ai-compute-2023-2026`, [first record](guide-compute-buildout-2026-10-31.md), PR 108). The maintainer accepted them on 2026-10-31, as relayed by the review thread. Branch `guide-compute-followups` from `main` at `e8797aa`. No data record, schema or release changes.

## Decisions applied

1. **Title** kept: “AI compute: data centres, power, chips and rules, 2023–2026”. The question now names computing in orbit, since the page covers it: “Which data-centre sites, power agreements, chip supply agreements, government measures, export-control rules and plans for computing in orbit do the records document from 2023 to 2026, with what figures, at what stage and dated by what?” (wording to approve).
2. **Sixth section, “Compute in orbit: plans and filings”** (25 records, tag “Orbit”):
   - Plans announced (11): ASCEND's aim, Axiom's nodes, Starcloud's 5 GW plan and Starcloud-2, Suncatcher and its prototypes, SpaceX's constellation, the Three-Body constellation, NVIDIA's Space-1 module, SpaceXAI's Starmind and Cowboy Space's Stampede.
   - Launches and status as stated (7): the Three-Body composition and capacity, the Starcloud-1, Axiom and LandSpace launch statements, Axiom's two ARCs and Starcloud-1's training.
   - Applications to the US Federal Communications Commission (4): the SpaceX, Starcloud and Blue Origin filings and the FCC's acceptance of SpaceX's application. A filing is dated by the filing date as the regulator lists it, labelled “filing”.
   - Studies and papers published (3): the ASCEND results, the Lumen white paper and the Suncatcher paper. These publication records are not among the arguments collection's records (checked against `propositionsView`).
   - The section's note says that a plan or a filing is not a launch and a launch is not operation. Its first lines link to “Arguments about compute in orbit”, which are not repeated; the separate “Compute in orbit” link section is gone.
   - **One pack record left out:** Thales Alenia Space's announcement of 14 November 2022 that the Commission chose it for ASCEND is dated before the page's period. It is listed under “Not covered”, with its record link, so the title's years stay true.
   - A fifth orientation passage covers orbit. The “Not covered” item on orbital records was replaced by the 2022 item.
   - Counts as built: 165 records in 6 sections, 104 dated by an announcement, 4 snapshots; 87 figures (60 quantities, 27 amounts; 28 power figures “not stated”); 59 stated dates. Definition version 2.
3. **“Stated as in production”** kept for NVIDIA's Blackwell record.
4. **Research starter** (Markdown, JSON and the bibliography file), [`src/domain/compute-buildout-starter.ts`](../src/domain/compute-buildout-starter.ts), downloaded from the page header. It holds the timeline, the stated dates, every record by section with its kind, stage and figures, the records with their evidence, “Not covered” and the shared closing sections.
   - **No-sum rule:** each figure is one line under its record, with value, bound, measure and scope, as on the page. Its key limits say that “none is added up, converted or compared”. A unit test checks that the starter's own text (record statements, wording and figure lines removed) contains no “total”, “in all”, “combined”, “altogether” or “sum”, and no trend or cause word. The first draft of the limit said “the starter gives no total”, and the test failed on it; the limit was reworded.
   - The browser test checks that both downloads equal the domain export byte for byte.
   - The download button lives in the page's own code (`StarterDownload` is now exported from `ReferenceActions.tsx`), so the starter's code loads only on this page.
5. **Release registration: left to the admissions chain's last release.** `people-admission` (open) already takes v0.15.1 against v0.15.0, and five more admissions follow it. A release cut here would take a version the chain may need, and registering without a release would make `pnpm release 0.15.0 --check` fail, since claim pages' “appears in” lists and the search facets would change. Prepared instead:
   - `collectionClaimIds` in `src/release/collections.ts` resolves a compute guide to `computeBuildoutView(...).claimIds`. A unit test checks that it equals the page's records.
   - Registering is one line in `applicationCollections`: `...computeGuides.map((definition) => ({ kind: 'guide' as const, definition }))`, added after `guides`. A comment marks the place. The release that adds it is a minor one (a collection is added), and its `compute-buildout.test.ts` assertion “is not yet a release collection” must be inverted in the same commit.
   - Cost of the preparation: the release reader is in the shared bundle, so every page type grew about 1.7 KB (gzip); all remain within budget (largest margin used: Search 266.9 of 275 KB).

## Checks

- `pnpm -s check`: passed (format, lint, typecheck, 80 unit-test files with 733 tests, build with 4,537 pages pre-rendered, 0 pages needing the relation core, every page type within its budget; compute guide 318.3 of 340 KB).
- `pnpm -s check:privacy`: passed before each push.
- Unit tests: `compute-buildout.test.ts` now has 9 tests: every non-argument record of the pack placed once (165), the 2022 record under “Not covered”, the release reader resolving the guide to its records, and the starter listing every figure and summing none.
- Browser tests: `compute-buildout.spec.ts` now has 5 tests: 165 timeline rows, six sections and starter downloads equal to the domain export.
- Full browser suite through an untracked Playwright configuration without `channel: 'msedge'` (deleted afterwards), with no other server on port 4173: 269 of 270 passed. The failure is `slice-navigation.spec.ts` “a page opened beneath a cursor that has not moved loads nothing more”. It times out hovering `locator('summary, button').first()`, which at 390 px resolves to the header's hidden search submit button. The same test fails the same way on a clean build of `main` at `e8797aa` in a separate worktree (since removed), so it predates this branch. It may pass under Edge; it was not changed here.
- Inspection at 1440 and 390 px: the orbit section with its link to the arguments, and the starter disclosure; no horizontal scroll, no console errors (the analytics beacon blocked).

## Open questions

1. **Question wording** above.
2. **Earlier compute records** wait for a selection rule, as decided.
3. **`slice-navigation.spec.ts` on Chromium** (above): the test's hover target should probably be scoped to `main`. Not changed here.
4. **Bundle cost of the preparation.** If 1.7 KB per page is unwanted before registration, the dispatch can move into the release commit itself.
