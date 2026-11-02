# Pre-launch interface batch, 2026-11-01

Branch `prelaunch-interface` from `main` at `81717f0`. Specification:
[`docs/roadmap.md`](../docs/roadmap.md), "Interface work after the admissions",
items 1–3, with the maintainer's additions of 2026-11-01 (a final paragraph for
"Why machine-first", "How this was built" in About, review-status wording,
caveat trimming on entry pages). No data change, no release, no deploy setting
change. Screenshots were taken at 390, 1280 and 1440 px and stay out of git
(maintainer decision, 2026-11-01).

## What changed

### 1. Compare frameworks

- The page takes the full width (`.cmp-layout`); prose stays at reading width.
  The table scrolls inside its own box (`.cmp-scroll`, at most the viewport
  height), so the framework header row (`position: sticky; top: 0`) and the
  question column (`left: 0`) stay in place on both axes. The box sets
  `scroll-padding-top/left` to the header and column sizes, so a focused cell
  is never hidden under them. Nothing traps focus: Tab moves through the cells
  and out of the box.
- The side panel ("Inspect any cell") is gone. A cell's record opens in a
  drawer over the right of the page only when a cell is inspected
  (`.cmp-drawer`, at most 30 rem, full width on a phone). Escape or Close shuts
  it and returns focus to the cell's button. The inline slot used on narrow
  screens elsewhere is not used on this page.
- Three layouts: **All frameworks** (the table), **Side by side** (two or three
  chosen frameworks; a fourth cannot be added, fewer than two cannot be left;
  the choice is in the address as `?frameworks=a,b`), **One question**.
- One question has its own page: `/compare/frontier-safety-frameworks/<question>`
  (for example `/d3-halt`), 18 pages, pre-rendered with their own slices
  (`/slices/compare/frontier-safety-frameworks/<question>.json`), with their own
  title and description, listed in the sitemap. The table's question names and
  an "Every question" list link to them. The earlier `?facet=D3.halt` address
  still resolves.
- **CSV download** (`/compare/frontier-safety-frameworks.csv`), written by the
  build (`scripts/comparison-csv.ts`) from `comparisonView`, the same view the
  page draws: one row per cell for every edition (22 editions × 18 questions, 396 rows),
  with framework, publisher, edition and date, question, status (the page's
  labels, now shared as `cellStatusLabels`), passage type, the quotation in
  quotation marks or the paraphrase marked "Paraphrase:", page, source URL,
  archive URL, check date, the cell note, the search notes for "not found" and
  the record link. `public/_headers` serves it as `text/csv; charset=utf-8`.
  Tests: `src/domain/comparison-csv.test.ts` (rows = cells, statuses, quoted or
  marked passages, round trip) and a browser test that the downloaded file
  holds the table's cells with the same status and first quotation.
- A landscape print style (header, controls and drawer hidden; table unboxed).
- Removed the per-page notice "A machine selected and arranged these records.
  No human review of the selection or framing is recorded."

### 2. Start page

- New introduction (roadmap item 3 text), "you" in `<strong>`, "human part" in
  `<em>`.
- "Ways in" panel directly under the search box: **Questions to read** (Who
  controlled OpenAI, and when?; Which texts argue for and against catastrophic
  risk from advanced AI?) and **Tools to use** (Compare frameworks, Browse by
  year, See a map, Explore the records). It replaces the "For example" block
  and the separate year line. The hub cards no longer repeat the two featured
  questions.
- One tool style: `ToolLink` in `src/ui/tools.tsx`, a ruled box with a slider
  mark and a sans-serif label, distinct from readings (underlined serif links).
  No square brackets. The tool list `readerTools` is the single source: a new
  tool (such as the control timelines from `control-timelines`) is one entry
  there. The same style is used for Compare frameworks and Browse by year on
  the hubs (eyebrows "Tool · comparison", "Tool · chronicle").
- Title: `text-wrap: balance`. Tested at 390, 1280, 1366, 1440 and 1920 px: no
  line holds one word.

### 3. About & method

- New opening section **Why machine-first**, the maintainer's text verbatim
  (bold sentence kept), with the 2026-11-01 final paragraph, signed "— the
  maintainer". No grammar correction was needed.
- New section **How this was built**, the maintainer's text verbatim, then a
  six-step account of the pipeline (products named, no model versions, no
  quality claims) linking `docs/operating-guide.md` in the public repository
  (`https://github.com/selekoa/selekoa/blob/main/docs/operating-guide.md`).
- **How the collections are chosen** (under "What Selekoa is"), the roadmap
  text, with the suggestions address read from `site.config.json` through
  `virtual:site`. The footer shows the same address ("Corrections and
  suggestions: …"), also from `virtual:site`; neither is hard-coded.
- "How this was checked": "Human review" becomes "The maintainer's part" with
  the plain disclosure. "What the labels mean": "Not reviewed by an editor"
  becomes "Machine-checked"; "Editorially accepted" notes it is a few early
  records and no longer part of the process; the evidence label becomes
  "Machine-checked evidence".

### 4. Review status

Banner: "Records found and checked by machines, not reviewed by an editor ·
What this means →" → "Found and cross-checked by machines · How this works →",
linking `/about#about-built`. Footer: "Exploratory records, checked by
machines." → "Found and cross-checked by machines." `editorialState` and the
collections' `editorialStatus` are unchanged.

Grep of `src/ui`, `src/reading`, `src/domain`, `src/site` and `src/Workspace.tsx`
for "human review", "reviewed by an editor", "machine-proposed", "editorial
acceptance", "human-accepted" (and "No person has reviewed", "not editorially
accepted", "not human-reviewed"), with every reader-facing change:

| Where                                                                                                                                                                           | Before                                                                                                                       | After                                                                                                                           |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `SiteChrome.tsx` banner                                                                                                                                                         | Records found and checked by machines, not reviewed by an editor · What this means →                                         | Found and cross-checked by machines · How this works →                                                                          |
| `SiteChrome.tsx` footer                                                                                                                                                         | Exploratory records, checked by machines.                                                                                    | Found and cross-checked by machines. + contact                                                                                  |
| `Commitments`, `FrameworkChanges`, `DocumentHistory`, `Propositions`, `ComputeBuildout`, `QuestionStarter`, `FrameworksLaw`, `ControlStructure`, `FrameworkComparison` (`.tsx`) | A machine selected and arranged these records. No human review of the selection or framing is recorded.                      | removed                                                                                                                         |
| `Dossier.tsx` guided-reading card                                                                                                                                               | Selected by machine · no human review of the framing recorded                                                                | removed                                                                                                                         |
| `Dossier.tsx` counts                                                                                                                                                            | N claims · M sources · N not editorially accepted. The counts …                                                              | N claims · M sources. The counts …                                                                                              |
| `ResearchPath.tsx`                                                                                                                                                              | Written by machine · not human-reviewed or editorially accepted.                                                             | Written by machine.                                                                                                             |
| `ResearchPath.tsx` details                                                                                                                                                      | … wrote the text. No human review of the selection, source paths or framing is recorded. Each supporting record …            | … wrote the text. Each supporting record …                                                                                      |
| `PersonPage.tsx`                                                                                                                                                                | … infers no moves between roles. No human review of the selection is recorded.                                               | … infers no moves between roles.                                                                                                |
| `Workspace.tsx` reading-path aside                                                                                                                                              | … wrote the connecting text. No human review of the selection or framing is recorded.                                        | … wrote the connecting text.                                                                                                    |
| `Workspace.tsx` dossier guide                                                                                                                                                   | … groups records automatically. No human review of the selection or framing is recorded. Each claim shows …                  | … groups records automatically. Each claim shows …                                                                              |
| `ReviewMarkers.tsx` status line                                                                                                                                                 | Machine-checked, not reviewed by an editor / Not editorially accepted · human-reviewed evidence                              | Machine-checked / Machine-checked · human-reviewed evidence                                                                     |
| `Inspector.tsx` "Status and meaning"                                                                                                                                            | Not reviewed by an editor (or Not editorially accepted). An exploratory record that no editor has accepted. …                | Machine-checked. Machines found this record and checked it against its sources; no person accepted it individually. …           |
| `ReviewNotice.tsx`                                                                                                                                                              | "Not editorially accepted" describes a claim's recorded status. It does not mean that no person has read a linked passage. … | first two sentences removed; "A machine check is not a person's review, and neither makes a claim certain." kept                |
| `src/reading/*` limits (technical-history, economics ×2, superintelligence ×2, ai-bio-arguments ×2, yudkowsky ×2, risk-debate ×2, ai-in-science ×2, orbital-compute ×2)         | … No person has reviewed them. / … No person has reviewed the records.                                                       | sentence removed; the audit history before it kept                                                                              |
| `reading/compute-buildout.ts`, `reading/framework-comparison.ts`, `reading/framework-changes.ts`                                                                                | … No editor has reviewed the records[, the selection or the framing].                                                        | sentence removed                                                                                                                |
| `reading/yudkowsky-arguments.ts`                                                                                                                                                | Their criteria and premises have had no human review, and changing them would change the records.                            | Changing their criteria or premises would change the records.                                                                   |
| `reading/chronicle.ts`                                                                                                                                                          | The page is generated from the records, with no selection or framing by an editor.                                           | The page lists the records by fixed rules, without selection or framing.                                                        |
| `domain/starter.ts` key limit (all research starters)                                                                                                                           | A machine proposed the selection, the order and any connecting text. No human review … is recorded.                          | A machine proposed the selection, the order and any connecting text.                                                            |
| `domain/*-starter.ts`, `question-starter-export.ts`, `governance-starters.ts`, `propositions-starter.ts` `interpretationStatus`                                                 | machine-proposed; not human-reviewed or editorially accepted                                                                 | machine-proposed                                                                                                                |
| `domain/starter.ts` person export                                                                                                                                               | machine-computed projection …; not human-reviewed or editorially accepted                                                    | machine-computed projection of stored claims                                                                                    |
| `domain/references.ts` packet                                                                                                                                                   | machine-authored; not human-reviewed or editorially accepted; "… No human review … and it is not editorially accepted."      | machine-authored; "The reading's text is machine-written interpretation."                                                       |
| `domain/review-status.ts` (exports)                                                                                                                                             | N of M claims are exploratory records that are not editorially accepted (editorial state: seed).                             | N of M claims carry the default editorial state, seed: found and checked by machines and not accepted individually by a person. |
| `site/machine-readable.ts` (`llms.txt`)                                                                                                                                         | machine-first starting point …; "Most claims have not been reviewed by an editor (`editorialState: seed`)"                   | the new introduction; the plain disclosure; question pages and CSV listed; suggestions to the contact                           |

Kept, deliberately: "machine-proposed" as the `editorialStatus` value and in
the opening line of Markdown research starters ("A machine-proposed starting
point for independent checking. It is not a finding."), which describes the
export rather than a review stage; About's exception list (editorially
accepted claims, human-reviewed evidence), which reports stored states; the
claim citation's "not … a human review"; schema messages.

Docs: `docs/editorial-policy.md` (review states paragraph, decision of
2026-11-01; "work selected for editorial acceptance" dropped from the triggers),
`docs/style-guide.md` (seed, accepted and machine-proposed rows; tool and
caveat conventions), `llms.txt` (above). Earlier review notes are unchanged.

### 5. Caveats trimmed on entry pages (before → after)

| Page and section                | Before                                                                                                                                                            | After                                                                                                                                                               |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Start, coverage line            | "… Dates after the latest check are scheduled dates stated in the sources. Coverage is selective and uneven."                                                     | last sentence cut: "Coverage is selective." stays in "Not yet covered" directly above                                                                               |
| Start, "For example"            | "Two of many ways in. The hubs below cover governance, ideas and institutions."                                                                                   | block replaced by "Ways in"                                                                                                                                         |
| Start, year line                | "Browse by year → Every dated record, one page per year."                                                                                                         | in "Ways in" as a tool                                                                                                                                              |
| Compare frameworks, lede        | scope line + machine-selection notice                                                                                                                             | scope line only; limits stay one click away ("Limits of this comparison")                                                                                           |
| Compare frameworks, side panel  | "Inspect any cell … A cell records what an edition states. It does not show what any developer did."                                                              | panel removed; the scope line in the lede says the same                                                                                                             |
| Browse by year (index), header  | lede "… grouped by topic. The counts are of records, not of events." + "Selective: what the records hold, not a history of any year."                             | lede without the counts sentence; one line "Selective: …"; disclosure "What this shows and does not show" with the counts sentence and the uneven-coverage sentence |
| About, "What it does not claim" | "… a gap in coverage. The topics, people and documents covered so far follow the maintainer's research interests, so the site reads in part as a research diary." | the second sentence moved into "How the collections are chosen" (its meaning is in the maintainer's text)                                                           |

The hubs and the explorer already carried at most one caveat line per
section; they are unchanged apart from the machine-selection notices above.
Record, claim and evidence pages keep every qualification (the claim panel's
status text was reworded under section 4, keeping "no person accepted it
individually").

## Accuracy of "How this was built"

| Sentence                                                                                             | Finding                                                                                                                                                                                                          | Proposed correction                                                                                                        |
| ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| "Every claim quotes its primary source."                                                             | 2,219 of 7,201 evidence records are paraphrases (12 of the 18 comparison questions, every recorded absence), 317 are secondary sources, and inferred claims rest on premises.                                    | "Every claim links to the passage it rests on, quoted or marked as a paraphrase."                                          |
| "The dataset is released in versions that anyone can rebuild from the data and check byte for byte." | `pnpm release X --check` reproduces only the latest release (operating guide, "Versions").                                                                                                                       | "The latest dataset release can be rebuilt from the public source and checked byte for byte."                              |
| "AI agents (Anthropic's Claude Code) drafted the research and the code."                             | Archive retrieval was done by Codex (operating guide, "Roles"); November roles plan Codex for packs.                                                                                                             | "AI agents, mostly Anthropic's Claude Code, drafted the research and the code."                                            |
| "… (OpenAI's Codex) then checked each batch blind …"                                                 | The cross-family check before every admission is policy from 2026-10-15 (editorial policy); earlier increments (September to mid-October) had same-family fresh-context audits and only some GPT or Grok checks. | "Since mid-October 2026, a large language model from a different company (OpenAI's Codex) has checked each batch blind: …" |

The pipeline paragraph added below the text is written in the present tense
("a model from the other company answers…") and describes the current rule.

**Maintainer decision, 2026-11-01:** the four corrections are adopted. The
first paragraph of "How this was built" now reads, as the maintainer gave it,
with one further wording change from the maintainer ("OpenAI's Codex has
checked" in place of "a large language model from a different company
(OpenAI's Codex) has checked"): "Every claim links to the passage it rests on,
quoted word for word or marked as a paraphrase. The latest dataset release can
be rebuilt from the public source and checked byte for byte. AI agents, mostly
Anthropic's Claude Code, drafted the research and the code. Since mid-October
2026, OpenAI's Codex has checked each batch blind: it gives its own answers
before it sees the drafter's, and the disagreements are settled and recorded
before anything is admitted. In the first weeks, drafts were also read by chat
assistants (Claude and xAI's Grok) acting as adversarial auditors. The
editorial rules are enforced by tests: a page that breaks them fails the build.
No person reads every record before publication. The maintainer sets the
rules, reviews every batch of changes and decides what is admitted."

## Budgets (gzip-9, `pnpm build`)

| Page           | Before (`81717f0`) | After    | Limit |
| -------------- | ------------------ | -------- | ----- |
| Start page     | 112.8 KB           | 113.5 KB | 115   |
| Search         | 271.7 KB           | 272.2 KB | 275   |
| Propositions   | 336.4 KB           | 336.8 KB | 455   |
| Comparison     | 287.2 KB           | 288.8 KB | 520   |
| About & method | 285.7 KB           | 287.7 KB | 330   |
| Compute guide  | 276.5 KB           | 286.0 KB | 340   |

Every other page moved by under 1 KB. The Ways in panel renders from the
pre-rendered HTML and the existing landing summary; no data import was added,
and the start page's CSS dropped the "For example" and year-line rules. No
limit was raised. Pages: 7,265 → 7,283 (18 question pages); slice files
2,029 → 2,047.

## Tests

- New: `src/domain/comparison-csv.test.ts`; `tests/browser/prelaunch-interface.spec.ts`
  (fixed header and column, page-width table, Tab out of the table, drawer with
  Escape and focus return; question page with its own slice, links and old
  address; side by side; CSV against the table; Ways in; introduction markup;
  title at five widths; banner and About; footer and About contact; 390 px
  scroll only inside the table and drawer).
- Updated for the new wording: unit tests (`framework-comparison`, `Inspector`,
  `references`, `machine-readable`) and the browser specs that asserted the
  removed labels, banner and start-page blocks.
- Gates run on this branch: `pnpm validate:data` (valid: 1,928 entities,
  5,360 claims, 1,821 sources, 7,201 evidence records), `pnpm check:privacy`
  (passed), `pnpm check` (format, lint, typecheck, 812 unit tests passed and 1
  skipped, build with every budget within its limit). Full browser suite with a
  local Playwright config using Playwright's Chromium instead of the `msedge`
  channel (deleted afterwards): 302 passed and 4 failed on the first run, all
  four on wording or addresses this batch changed (About headings, the
  question-page address, the removed notice, the banner's target from the
  start page); after the fixes the seven affected spec files (77 tests,
  including the new spec) pass.

## Merge of control timelines (2026-11-01)

`origin/control-timelines` was merged at its commit `c54ebc2` (the OpenAI
board-role fix, OpenAI control collection v2, dataset release 0.22.1, all from
the parallel session), with `--no-ff` and no rebase. The merge was clean.
After it:

- **Tool list.** "Control timelines side by side" (`/control/side-by-side`,
  "OpenAI, Anthropic, Google DeepMind and xAI on one time axis") is one entry
  in `readerTools` (`src/ui/tools.tsx`). The start page's "Ways in" panel and
  the Governance hub's control list show it as a tool link; the title and
  address come from `src/reading/control-timelines-page.ts`.
- **Notice.** The timelines page's `SelectionStatus` notice ("A machine
  selected and arranged these records. No human review of the selection or
  framing is recorded.") is removed with its component, as on the other
  collection pages.
- **Search budget: cause and trim.** Merged as it stood, Search was 275.4 KB,
  over its 275 KB limit, and every page that loads the workspace had grown by
  about 3 KB (Hub +2.9, Claim +3.0). The page entry itself (the search index
  text) cost 0.2 KB. The rest was code: `Workspace.tsx`, `deep-links.ts` and
  `prerender/pages.ts` (which the workspace imports for the document title)
  imported the timelines domain module and the full page definition, so the
  computation and every sentence of the page loaded with the shared code. The
  page now computes its records in its own lazily loaded module
  (`ControlTimelines.tsx`), and the shared code imports only the page's ID,
  title, question and organisation list from `control-timelines-page.ts`
  (a unit test keeps them equal to the definition). Search is 273.1 KB after
  the merge, the trim and the review fixes; no limit was raised.

| Page              | This branch before the merge | Merged, untrimmed | Merged and trimmed | Limit |
| ----------------- | ---------------------------- | ----------------- | ------------------ | ----- |
| Start page        | 113.5 KB                     | 113.7 KB          | 113.7 KB           | 115   |
| Search            | 272.2 KB                     | 275.4 KB (over)   | 273.1 KB           | 275   |
| Hub               | 234.7 KB                     | 237.6 KB          | 235.3 KB           | 295   |
| Claim             | 272.0 KB                     | 275.0 KB          | 272.7 KB           | 325   |
| Control timelines | –                            | 260.5 KB          | 260.1 KB           | 285   |

## Review of the combined branch

A read-only review (three reviewers by dimension: addresses and state, merge
integration, reader-facing text; each finding checked by a separate skeptic)
confirmed three defects, all in this batch's comparison code, and fixed:

1. A question link clicked from side by side kept `?frameworks=` and wrote
   `/compare/<id>/<question>?frameworks=…`, an address the resolver rejects.
   Opening a question now clears the side-by-side choice.
2. The one-question layout was kept in component state, so Back from a
   question page left the question on screen at the table's address. The
   layout now follows the address; only a phone's choice of the table is kept
   locally.
3. The drawer's Escape handler, listening on the document, also caught Escape
   in the header search field (closing the drawer and blocking the field's
   own clearing). Escape in a field outside the drawer is now left to the
   field.

Each has a browser test in `tests/browser/prelaunch-interface.spec.ts`. The
text review found no mismatch with the maintainer's wording. One refuted
finding: the timelines page's `useMemo` keyed on the fixed `repository`
object computes once per mount; the page mounts only once its records are
held, so the output is unchanged.

## Gates after the merge (2026-11-01)

On the merged branch with the trim and the review fixes: `pnpm validate:data`
(1,928 entities, 5,360 claims, 1,821 sources, 7,201 evidence records),
`pnpm check:privacy` (passed), `pnpm check` (format, lint, typecheck, 833 unit
tests passed and 1 skipped, build with every budget within its limit; Start
113.7 of 115 KB, Search 273.1 of 275 KB, Control timelines 260.1 of 285 KB).
Full browser suite (local config with Playwright's Chromium in place of the
`msedge` channel, deleted afterwards): 315 passed and 1 failed. The failure was
a test locator ("Side by side" also matched the new "Copy link to these
frameworks side by side" button); with exact locators the spec file passes
(17 tests). No limit was raised.

## Maintainer decisions on the open questions (2026-11-01)

1. The four corrections to "How this was built" are adopted (above).
2. The public repository's default branch is `main`; the operating-guide link
   stays.
3. Side by side is in the address: `?frameworks=a,b` (two or three framework
   IDs in column order). It reopens the layout, Copy link gives it, and "All
   frameworks" clears it. An address with one framework, more than three, a
   repeat, an unknown ID or a question page opens no page.
4. Links to the comparison or the years inside reading pages keep the
   reading-link style.
5. Screenshots stay out of git (`*.png` is ignored; none was committed).
