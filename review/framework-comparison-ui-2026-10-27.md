# Framework comparison in the app: design and mapping (2026-10-27)

**Status: built on branch `framework-comparison-ui`; not merged, not deployed.** Release v0.8.0 (dataset schema 2.17) is written under `release/` but not tagged or published. The maintainer's tentative decision of 2026-10-27: build a side-by-side comparison of frontier AI safety frameworks in the app, with facets as rows, developers or editions as columns, and the statuses "stated", "stated, partly" and "not found", each cell opening its passages, locator, note and source. The candidate pack `research/frontier-framework-comparison/` was cross-family checked (2026-10-15) and adjudicated (2026-10-15, 2026-10-26 and 2026-10-27, Rule B), which meets the admission rule for its cells.

This record states how the pack becomes application data, what was admitted and what was not, and how the page works. It was written before the data and the page were built.

## 1. The constraint: the quotation limit

The editorial policy limits quoted words per source document across the whole dataset: from a document of 2,000 words or more, 400 words or 5% of it, whichever is larger, and never more than 800 ([short quotation](../docs/editorial-policy.md#short-quotation)). A passage quoted for several claims counts once. Validation counts distinct passage strings for each source.

Every framework edition already carries quoted provisions in the dataset. Adding all of the pack's passages would take 15 of the 22 editions over their limit (computed with the validator's counting on 2026-10-27; an existing passage that already contains a pack passage is reused and costs nothing):

Quoted words per edition (limit; in the dataset before admission; with every pack question; with the six admitted questions), from `node research/frontier-framework-comparison/admit.mjs --budget`:

| Edition                  | Limit | Before | All questions | Admitted six |
| ------------------------ | ----: | -----: | ------------: | -----------: |
| rsp-2023                 |   526 |    346 |           523 |          414 |
| rsp-v2-0                 |   474 |    300 |    537 (over) |          388 |
| rsp-v2-1                 |   487 |    300 |    548 (over) |          388 |
| rsp-v2-2                 |   480 |    257 |    528 (over) |          345 |
| rsp-v3-0                 |   400 |    309 |    510 (over) |          370 |
| rsp-v3-1                 |   400 |    158 |    433 (over) |          280 |
| rsp-v3-2                 |   415 |    248 |    491 (over) |          370 |
| rsp-v3-3                 |   410 |    220 |    511 (over) |          342 |
| rsp-v3-4                 |   437 |    263 |    536 (over) |          383 |
| fsf-2024                 |   400 |    140 |           339 |          175 |
| fsf-v2-0                 |   400 |    259 |    429 (over) |          299 |
| fsf-v3-0                 |   400 |    298 |    510 (over) |          365 |
| fsf-v3-1                 |   401 |    284 |    562 (over) |          368 |
| preparedness-beta-2023   |   400 |    172 |    409 (over) |          232 |
| preparedness-v2          |   513 |    220 |           489 |          294 |
| frontier-governance-2026 |   400 |    302 |    562 (over) |          389 |
| faif-2025                |   400 |    169 |    406 (over) |          231 |
| faif-2026                |   400 |    151 |           397 |          194 |
| meta-faf-v1-1            |   400 |    261 |           261 |          261 |
| meta-aasf-v2-0           |   678 |    271 |           570 |          298 |
| ms-fgf-2025              |   400 |    204 |    411 (over) |          262 |
| ms-fgf-2026              |   400 |    323 |    582 (over) |          361 |

The quotation limit is policy and is not changed here. README decision 2 of the pack (2026-10-15) already set the working approach: reuse existing quotations where they cover the same facet, and admit the most important facets first, facet by facet, within the per-source limit.

**What fits.** Admitting whole facets (a complete row for every edition, so the comparison never has a gap that comes only from the quotation limit), at most six of the seventeen facets fit every edition. One set of six fills three whole dimensions:

| Dimension                    | Facets admitted                                                                | Existing provision kind |
| ---------------------------- | ------------------------------------------------------------------------------ | ----------------------- |
| D3 Required actions          | Safeguards required; Pause, non-deployment or non-training                     | `required_action`       |
| D4 Who decides               | Determination of capability or safeguard adequacy; Board or external oversight | `decision_authority`    |
| D6 Exceptions and discretion | Provisions conditioned on other developers; Other exceptions or discretion     | `exception`             |

These are admitted. After admission the fullest editions are OpenAI FGF May 2026 (389 of 400 words), FSF v3.1 (368 of 401) and RSP v3.0 (370 of 400). Other orders were tried: D3, D4 and D6 with D7 internal reporting also fits (seven facets), and D2 named levels fits only in place of D6 other exceptions. The choice of three whole dimensions, which match three of the four existing provision kinds, is the preparer's; the maintainer may prefer another set (open decision 1).

**Not admitted:** D1 risk domains (five facets), D2 thresholds (two), D5 evaluation timing, D7 reporting (two) and D8 revision (two). They stay in the research pack. The page says so and links nowhere into the pack, because the pack is not application data.

## 2. Data model (schema 2.17)

One comparison cell (one edition, one facet) is one claim. The existing provision predicates are reused:

| Pack status                                       | Record                                                                                                                                                                                                          |
| ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| stated                                            | `states_provision`, explicit, supported, with `attributes.provision.facet = { id, status: "stated" }`                                                                                                           |
| stated, partly (Rule B)                           | the same, with `status: "partly"`                                                                                                                                                                               |
| recorded, not re-checked (Meta v1.1 only)         | the same, with `status: "recorded"`: the passage is an existing dataset passage checked against the archive capture of 2025-02-13; the comparison could not re-check it because the edition was not retrievable |
| not found                                         | `provision_not_found`, inferred, with `attributes.provision.facet = { id }`; the premises are the pack's search record (sections inspected, search terms, every hit set aside and why, and any archive check)   |
| not applicable (Meta v1.1, edition not retrieved) | no record. The page shows "Not checked" with the reason, from the collection definition                                                                                                                         |

The schema change is one optional nested field, `attributes.provision.facet`:

- `id`: one of the admitted facet identifiers (`D3.safeguards`, `D3.halt`, `D4.determination`, `D4.oversight`, `D6.competitor`, `D6.discretion`). The facet list, labels and criteria live in `src/domain/framework-comparison.ts`; validation rejects an unknown facet and a facet whose dimension does not match the provision kind (D3 → `required_action`, D4 → `decision_authority`, D6 → `exception`).
- `status`: `stated`, `partly` or `recorded` on a stated cell; absent on a recorded absence.
- Validation also requires at most one cell per edition and facet, and that a facet record is about an exact framework edition (already required for provisions).

The provision `key` of a cell is the facet's edition-neutral key (`comparison-d3-halt`). It lines the cell up across every family, which is what the comparison does; ordinary provision keys stay family-scoped. Because changes and assessments match keys within one edition pair or edition, a shared key does not create a change or assessment link. Validation rejects a `changes_from` or `provision_assessed` record that names a comparison key.

**Why one claim per cell rather than tagging existing provision claims.** A cell carries a status and a mapping note that belong to the cell as a whole (Rule B decides "partly" for the cell, not for each passage). Tagging the 236 existing provision claims would put the same note on several claims and change existing records. The cell claim instead reuses existing passages: where the pack reuses an existing evidence passage, or where an existing passage of the same edition contains the pack's quotation, the cell's evidence carries the existing passage word for word with its locator, so it costs nothing against the limit. Existing provision claims are unchanged. A passage that both records quote appears in both, as before (a passage quoted for several claims counts once).

**Cell claims are kept out of the per-edition provision lists** on the document-history page and out of the question starters (they filter on `facet`), so a passage is not listed twice under two different labels. They appear on the comparison page, in search, in a "Comparison questions" section of each edition's document page, in "Appears in" and in the claim panel. The map draws no literal claims, as before.

### Field mapping

| Claim field          | Value                                                                                                                                                                                                                                                                       |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                 | `cmp-<edition>-<dimension>-<facet>`, for example `cmp-rsp-v3-4-d3-halt`                                                                                                                                                                                                     |
| `subject`            | the edition entity (same identifier as in the pack)                                                                                                                                                                                                                         |
| `object`             | literal: the facet label (Selekoa's edition-neutral wording)                                                                                                                                                                                                                |
| `statement`          | templated: "<edition> states a provision on the comparison question “<label>”." For "partly": "… in a weaker form than the question’s criterion." For an absence: "No passage meeting the comparison question “<label>” was found in <edition> within the inspected scope." |
| `time`               | event, dated by the edition date the edition's existing provision claims use, with the same basis                                                                                                                                                                           |
| `derivation`         | explicit (stated cells); inferred (absences)                                                                                                                                                                                                                                |
| `resolution`         | supported                                                                                                                                                                                                                                                                   |
| `editorialState`     | seed                                                                                                                                                                                                                                                                        |
| `qualification`      | the facet criterion, then the pack's mapping note (Rule B status reason where "partly"), then the standing sentence: what the edition states, not implementation, compliance or effectiveness; a shared question does not make two provisions equivalent                    |
| `inferenceRationale` | absences only: the pack's inspected scope, search terms, hits set aside and archive check                                                                                                                                                                                   |
| `recordedAt`         | 2026-10-27                                                                                                                                                                                                                                                                  |

| Evidence field | Value                                                                                                                                                                                                                                             |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`           | `ev-cmp-<edition>-<dimension>-<facet>-<n>`                                                                                                                                                                                                        |
| `sourceId`     | the edition's existing source record (`dataSource` in the pack)                                                                                                                                                                                   |
| `passage`      | the pack quotation, or the existing dataset passage that contains it                                                                                                                                                                              |
| `locator`      | the pack locator, or the existing passage's locator                                                                                                                                                                                               |
| `checkedAt`    | 2026-10-27 for the 20 editions re-verified on that date; 2026-10-15 for xAI June 2026 (not retrievable on 2026-10-27; its four absences were confirmed against an archive capture on 2026-10-26); the existing passage's date where one is reused |
| `note`         | the pack entry note, the check statement and "Human editorial review is pending."                                                                                                                                                                 |
| absence        | one paraphrase evidence item: locator = inspected scope; passage "Within the inspected scope, no passage meeting the comparison question … was found."; note = method                                                                             |

## 3. Release and history

A schema change is a minor release: dataset schema 2.17, release v0.8.0 (format 1.6 carries the nested value unchanged). The before-snapshot `review/framework-comparison-before-2026-10-27.json` lists the added IDs and the earlier metadata; no existing row changes. One entry is added to the chain in `src/editorial/historical-views.ts`.

## 4. The page

- **Address and entry point.** A new page, "Compare frameworks", at `/compare/frontier-safety-frameworks`, with optional `facet` and `inspect` parameters (first built at a hash address; ported to a path in section 7). The Governance hub gains one entry; the document-history page links to it.
- **Rows and columns.** Rows are the six facets, grouped by dimension, each with its criterion. Columns are the seven frameworks in a fixed order (by developer name, then framework name), never by any count. Each column shows the latest edition by default, with an edition picker per framework. Meta's two editions and OpenAI's two frameworks are separate columns because they are separate frameworks; Meta's rename is one family.
- **Cells.** A cell shows its status in words, the passages (quoted), the page locator and a button that opens the claim in the claim panel, with the source and archive links. An absence shows "Not found within the recorded search" and opens the search record. No colour scale, ticks, crosses, totals or sorting. Status text uses the same neutral style for every status.
- **Phone.** On narrow screens the page shows one facet at a time (a facet picker), with frameworks stacked as rows. On wide screens the full table, with a sticky first column. Both are real tables or lists with headers, so a screen reader reads them in order. The picker is a native `select`.
- **Legend.** The status legend uses Rule B's wording. The page states once that statuses record what an edition states, never implementation or compliance, and that a shared row does not mean provisions are equivalent. The frameworks page's line "This page does not compare or rank developers" is replaced by a line that points to the comparison and keeps the no-ranking statement (README decision 1).
- **Context-only passages.** None of the admitted passages is marked context-only. The page would show such a passage only with its context, as elsewhere.

## 5. Open decisions for the maintainer

1. **Which facets.** Decided 2026-10-27: the other twelve are admitted as explicit paraphrases (schema 2.18, [record](compare-more-facets-2026-10-27.md)). As first built: six are admitted under the current quotation limit (D3, D4 and D6). D7 internal reporting would also fit; any further facet needs either a change to the per-document limit or trimming of existing quotations. The pack's union figures (`quotedWordsWithDataset`) and this record's table show the size of the gap.
2. **Meta v1.1.** Two cells rely on passages recorded from the 2025-02-13 archive capture and are labelled "recorded, not re-checked"; four are "not checked". A re-check from a session with archive access would settle them.
3. ~~Merge order with the pre-rendering branch.~~ Resolved: merged and ported (section 7).

## 6. What was built and checked (2026-10-27)

- **Data.** 128 cells (96 stated, 15 stated partly, 2 recorded not re-checked, 15 not found; 4 Meta Version 1.1 cells not checked and not stored) and 175 evidence rows, made by `admit.mjs --write`. Every edition stays within its quotation limit (table above). Internal question codes in the pack's notes (for example "D6.competitor") are replaced by the question labels in the stored text, and the archive-check report is cited in the evidence note rather than the reasoning.
- **Schema 2.17**, documented in `docs/ontology.md` and `docs/dataset-format.md`; validation as in section 2. Two older tests that summed quoted words without counting a repeated passage once were aligned with the policy and the validator.
- **History.** Before-snapshot `review/framework-comparison-before-2026-10-27.json` and one chain entry in `src/editorial/historical-views.ts`; the historical-views test reproduces the earlier dataset exactly.
- **Release** v0.8.0: 128 claims, 175 evidence and one collection (`compare/frontier-safety-frameworks`) added; the document-history collection changed (its limits line). `pnpm release 0.8.0 --check` reproduces it.
- **Page.** `src/ui/FrameworkComparison.tsx` with `framework-comparison.css`, one Workspace view, one route kind (`compare`), a Governance hub entry and example question, a link from the document histories, and "Appears in" on edition pages. The frameworks page's line "This page does not compare or rank developers" now points to the comparison and keeps the no-ranking statement.
- **Checks.** `pnpm check` (551 unit tests), `pnpm check:privacy`, `pnpm release 0.8.0 --check`, and the full browser suite in Chromium (166 tests; two governance timeline counts updated for the added cells).
- **Tests.** Unit: `src/domain/framework-comparison.test.ts` (coverage of every edition and question, pack statuses and quotations preserved, validation rules, address). Browser: `tests/browser/framework-comparison.spec.ts` (hub entry, table, edition picker, keyboard opening of a cell, one-question layout from a link, absences and unchecked cells, uniform status styling, axe at 390 and 1440 px in light and dark).

Not built: a Markdown export of the comparison (the app proposal's research-starter export). It would follow the document-history starter and is a separate step.

## 7. Port to real paths and pre-rendered pages (2026-10-27)

`main` merged real paths and pre-rendered pages (#72) after this branch was built. The branch merges `main` (no rebase) and ports the comparison:

- **Address.** `/compare/frontier-safety-frameworks`, with `?facet=<question>` and `?inspect=<claim>` (`src/domain/addresses.ts`, resolved in `src/domain/deep-links.ts`), recorded in the address table in `docs/architecture.md`. The hash form was never live, so no redirect is added beyond the generic one for earlier hash addresses.
- **Pre-rendered.** The path is in `pagePaths` (`src/prerender/pages.ts`), so the build writes `dist/compare/frontier-safety-frameworks.html` and lists it in the sitemap. Title "Compare frontier safety frameworks · Selekoa"; description the collection's question. The built HTML is the wide table rendered by the same component: legend, limits, the "records what an edition states" line, every developer and latest edition, 42 cells with their statuses, quotations within the quote budget, notes, locators and edition and archive links. Checked in `dist/`: 42 `<td>` cells, 50 quotations, 14 external source links.
- **Taking over in the browser.** The phone layout and the folded edition picker now come from `useMediaQuery` (`src/ui/client.ts`) rather than a direct `matchMedia` read at first render, so the built table is hydrated in place and a phone then switches to one question at a time; a `?facet=` address applies after take-over, as other queries do. Pickers are disabled until the page runs. Page code is registered in `src/ui/page-modules.tsx` for preloading.
- **Entry points.** The Governance hub entry and the document-history link are real links to the path. `public/_headers` gains `/compare/*` (revalidate, as for other pages); `llms.txt` names the `compare/<id>` pattern.
- **Release.** v0.8.0 remains the next version after `main`'s latest (v0.7.2); `main` changed no data, and `pnpm release 0.8.0 --check` reproduces byte for byte. The before-snapshot stays first in the historical-views chain.
- **Unchanged behaviour.** Edition picker, phone layout, Rule B legend wording, the "records what an edition states, not implementation" statement.
- **Checks after the port.** `pnpm install --frozen-lockfile`; `pnpm check` (597 unit tests, build pre-renders 2,944 pages); `pnpm check:privacy`; `pnpm release 0.8.0 --check`; the full browser suite in Chromium against the production preview (201 tests, including new tests that the built comparison carries its table, statuses, passages and source links without JavaScript, that the Governance entry is a real link, and that the browser takes over the built table in place without errors).
