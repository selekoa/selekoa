# Guided reading: frontier AI safety frameworks, edition by edition (2026-10-29)

A second guided reading on the governance spine, at `/guide/frontier-frameworks-by-edition`. It reads the framework comparison (`/compare/frontier-safety-frameworks`, collection version 3) edition by edition: what each edition's cell records on each of the 18 comparison questions, and where the recorded cells of consecutive editions differ. No data record, schema or release changes; every status, difference and earliest located edition is computed from the comparison's cells, the editions' document records and their version records.

- **Definition:** [`src/reading/framework-changes.ts`](../src/reading/framework-changes.ts), registered in [`src/reading/guides.ts`](../src/reading/guides.ts) as `editionGuides`.
- **Projection:** [`src/domain/framework-changes.ts`](../src/domain/framework-changes.ts), pure, with tests in `framework-changes.test.ts`.
- **Page:** [`src/ui/FrameworkChanges.tsx`](../src/ui/FrameworkChanges.tsx) and `framework-changes.css`.
- **Export:** a research starter (Markdown and JSON, with a bibliography file), [`src/domain/framework-changes-starter.ts`](../src/domain/framework-changes-starter.ts).
- **Editorial state:** machine-proposed selection and framing. No human review of the selection or framing is recorded, and the page says so.

## What the page shows

In page order, as built on 2026-10-29 against the data on `main` (commit `024a6e5`):

1. **Header.** Eyebrow "Guided reading · 22 framework editions · 7 frameworks · 18 questions", title, question, the machine-selection notice, the research-starter download, a copy-link control, and links to the comparison, the document histories and the frameworks-and-law guide. A table of contents follows.
2. **What the page covers.** One computed sentence of bounds (22 editions of 7 frameworks, dated 2023-09-19 to 2026-07-08, 18 questions in 8 groups, six quoted and twelve paraphrased), three authored paragraphs on how to read a difference, and a legend of the statuses that occur (Stated, Stated partly, Not found in the recorded search, Does not apply), worded as on the comparison page.
3. **Limits of this page** (collapsed): four limits.
4. **One section per framework**, in the comparison's fixed order (developers alphabetically, then framework name; OpenAI's two frameworks as two sections):
   - **Editions.** Each edition with its ordering date and the date's kind (effective, revised or published, as on the comparison page), the document record's date note, links to the dated record, the "replaces" record, the exact text and the archived copy; collapsed, the edition's own "Stated changes from the previous edition" cell and the changes from the earlier edition that Selekoa records (`changes_from`), as record rows.
   - **Status by question and edition.** A table, one row per question grouped by the eight dimensions, one column per edition. Each cell opens its record. "≠" and a rule mark a status that differs from the previous edition's; screen readers hear "status differs from the previous edition".
   - **Between consecutive editions, question by question.** For each question: every step where the status differs, with both cells as record links ("v2.2: stated → v3.0: stated, partly"); the steps with the same status and a different recorded passage; the steps with the same status and passage, or no passage in either; the step from a first edition to which the question does not apply. Collapsed, the passages edition by edition, each with its locator and record link, noting "same recorded passage as v2.0" where the passage text is identical. A link opens the question in the comparison (`?facet=`).
5. **Across developers: earliest located.** A table, one row per question, one column per framework: the earliest compared edition whose cell records a passage (stated or stated partly), with its date and status, "earliest compared edition" where the framework's first applicable edition already records it, and, where that cell is "stated, partly", the earliest "stated" cell. A dash means no compared edition records a passage.
6. **Not covered.** Four groups: outside the page's bounds (practice and compliance, provisions outside the 18 questions, OpenAI's two frameworks as separate sequences, recorded assessments of changes, reasons for a difference), editions read from archive copies (Meta v1.1, xAI June 2026, with computed counts: 17 of 17 and 5 of 18 cells rest on evidence read in an Internet Archive capture), held or unchecked cells (computed from the comparison definition: none), and retrieval limits (the twelve paraphrased questions).

As computed on 2026-10-29: 270 steps between consecutive editions across all questions. 32 differ in status, 135 have the same status and a different recorded passage, 97 the same status and passage (or no passage in either), and 6 start from a first edition to which "Stated changes from the previous edition" does not apply. These counts are not shown on the page; they are here for review only.

## Design choices

- **Statuses and passages only.** A step's difference is computed from the two cells' statuses, then from the exact text of their recorded passages. The page never compares meanings and never says which edition is stricter. A step from "stated" to "not found" is shown as two statuses, with the legend's sentence that "not found" does not show deletion.
- **Assessments left out.** Two `changes_from` records on RSP v2.0 and v3.0 have change basis `assessment` (both unresolved questions posed by Selekoa). They are not listed under the editions, because the brief rules out assessment; "Not covered" names them and links them, and they stay on the document histories page.
- **Tables plus a list.** The status table gives the overview; the question-by-question list is its text equivalent, with every step stated in words. Both tables scroll inside their frame with the question column fixed, as on the comparison page. No chart: a chart of statuses over time would suggest a trend.
- **Progressive disclosure.** Passages, stated changes and recorded changes are in closed `details` elements. They are in the built HTML, so the page reads without scripts.
- **Status chips told apart by words.** Border style (solid, dashed, dotted, none) repeats the status for scanning; colour carries nothing.
- **Same address kind.** `/guide/<id>`, pre-rendered and in the sitemap; `public/_headers` already covers `/guide/*`. The phone layout opens the inspector directly below the table row or list item, as on the other reading pages.
- **Not a release collection.** The definition is not added to `applicationCollections`, so the release input and `pnpm release 0.12.0 --check` are unchanged. A claim page's "appears in" list therefore does not name this page. See open question 2.
- **Page weight.** The built page is about 800 KB of HTML (75 KB gzipped), close to the frameworks-and-law guide (78 KB gzipped). Most of it is the 389 passages in closed `details`.

## Wording for the maintainer to approve

1. **Title:** "Frontier AI safety frameworks, edition by edition, 2023–2026". The working title "How frontier AI safety frameworks changed, 2023–2026" was not used: "changed" invites reading a difference between cells as a change in the developer's practice, and "how" promises an account the page does not give. Alternatives: "Frontier AI safety frameworks across their editions, 2023–2026"; "Reading the frameworks edition by edition, 2023–2026".
2. **Question:** "What did each edition of each developer's safety framework state on the comparison's questions, and where do the recorded cells of consecutive editions differ?"
3. **Step wording.** "v2.2 → v3.0: status differs." followed by both cells; "Same status, different recorded passage: …"; "Same status and same recorded passage, or no passage in either: …"; "…: the question does not apply to v1.0, the first compared edition." The brief's form "the v2.0 edition states X; v1.0 did not" was not used: "did not" reads a recorded absence as a fact about the edition, which the comparison's own legend rules out.
4. **"Earliest located"** heading "Across developers: earliest located", with "earliest located in the compared editions" in its note, per the style guide's rule on earliest texts.
5. **Hub entry.** The governance hub lists the page after "Frontier AI frameworks and law", as "Guided reading", with the action "Read the frameworks edition by edition →". No start-page example question was added.
6. **Not-covered texts**, in particular the archive-copy wording for Meta v1.1 and xAI June 2026, drawn from the evidence notes and `review/compare-more-facets-2026-10-27.md`.

## Open questions

1. **Edition links into the comparison.** The parallel `site-search-header-2026-10-29` branch was not on `origin` when this was built, so the page links to the comparison by question (`?facet=`) only. If it adds an edition parameter, each edition row and each status cell could open the comparison at that edition; a follow-up of a few lines.
2. **Release.** Registering the definition as a release collection (`applicationCollections`, kind `guide`) would make the next release a minor one, as for the frameworks-and-law guide in v0.12.0. Until then the research-starter export carries the definition and its fingerprint.
3. **Passage differences.** 135 steps differ only in recorded passage. Many are a new locator or a re-worded paraphrase of the same sentence; the page says so in its limits and does not separate them. A finer classification (same quotation, different page) would need a recorded judgement per step and is not proposed.
4. **Start page.** Whether the start page's governance card should gain an example question for this page.
5. **Deploy.** The page is public once this branch is merged to `main`.

## Inspection of the built page

Production build served by `vite preview`, inspected in headless Chromium at 1440×1000 and 390×844. Screenshots were taken in the session's scratch space and are not committed.

- **Desktop.** The header, table of contents and orientation read as on the frameworks-and-law guide, with the reading guide in the right column. The Anthropic section lists nine editions with dates and kinds; the status table shows 18 rows under eight uppercase group headings and nine edition columns, scrolling sideways inside its frame with the question column fixed; "≠" marks appear at, for example, Persuasion or manipulation (v1.0 → v2.0, v2.2 → v3.0) and Who decides (v1.0 → v2.0). The question list for "Pause, non-deployment or non-training" shows two lines of steps; opened, it shows nine editions' quotations with locators and "same recorded passage as v2.0" on v2.1. The earliest-located table shows edition and date per framework, with dashes for, among others, xAI on both "Who decides" questions.
- **First pass findings, fixed before the checks below.** The shared `commit-table` fixed layout made status chips overlap in the nine-column table and wrapped dates mid-string in the earliest table; both tables now size columns to their content. Visually hidden labels in table cells widened the phone page to 544 px; the frames now clip them, as the comparison page does.
- **Phone.** No horizontal scroll at 390 px. The status table scrolls inside its frame; selecting a cell opens the Evidence Inspector in a full-width row directly below it. "Not covered" reads in one column.
- **Console.** No errors.

## Checks

- `pnpm -s check`: passed (format, lint, typecheck, 68 unit-test files with 651 tests, build with 4,018 pages pre-rendered; the page is in `sitemap.xml`).
- `pnpm -s check:privacy`: passed before the push.
- Unit tests: `src/domain/framework-changes.test.ts` (8 tests: address, pre-rendering and title; not a release collection; every edition on every question, matching the comparison's cells; steps computed only from the two cells; earliest located; archive editions and no held cell; no trend, cause or assessment words in the authored text or the rendered page's own text, with record passages, notes and record rows removed; the starter export).
- Browser tests: `tests/browser/framework-changes.spec.ts` (4 tests: reached from the governance hub, sections, edition order, status table, steps, passages, keyboard inspection, the earliest table, not covered, no trend words in the page's own text, every internal link resolving to a built page, an axe scan and no console errors; a question opening in the comparison at its `?facet=`; the phone layout with the inline inspector and no horizontal overflow; the page pre-rendered without JavaScript, with its tables, passages and sitemap entry). Run through an untracked Playwright configuration without `channel: 'msedge'`, deleted afterwards. Full suite against the production preview: 221 of 221 passed, the four new tests among them.
