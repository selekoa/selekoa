# Model cards compared: admission, part 2 (2026-11-04)

Admission record for the second part of the model-cards pack ([`research/model-cards/`](../research/model-cards/), review note [`model-cards-pack-2026-11-02.md`](model-cards-pack-2026-11-02.md); part 1 in [`model-cards-admission-1-2026-11-03.md`](model-cards-admission-1-2026-11-03.md)). Branch `model-cards-admission-2`, from `main` at `23f622b6` (release v0.26.4), with `main` merged at `f7afe16d` (#155) and `9f8dded4` (#156), both review files only, so no rebuild was needed; after the second merge `--part 2 --check` and `pnpm release 0.27.0 --check` were run again and pass. Release **v0.27.0** (minor: schema change).

- **Prepared by:** Claude (pack, same-family audit, adjudication). **Cross-family check:** OpenAI Codex, 2026-11-03, with a short second pass the same day. **Admitted by:** a Claude session.
- **Status:** every new record is a seed (`editorialState: seed`) with machine-checked evidence; no human review.
- **Mechanics:** one script, [`scripts/model-cards-admission.ts`](../scripts/model-cards-admission.ts), now with `--part 2` (`--check`, `--base <commit>`), reading the authored map [`model-cards-admission-2-map-2026-11-04.json`](model-cards-admission-2-map-2026-11-04.json) and the part-1 map for the card documents and sources. It stops on an unknown map key or pack cell, a passage its verification did not match, a quotation over its limit, a not-applicable cell the collection definition does not list (or one it lists that the pack does not have), a collection whose rows or question wording differ from the pack, and any map entry that changed no record. The before-snapshot [`model-cards-admission-2-before-2026-11-04.json`](model-cards-admission-2-before-2026-11-04.json) is first in the chain in `src/editorial/historical-views.ts`. `--part 2 --check` reproduces the stored records; `--part 1 --check` now reports a difference, as expected, because part 2 changed the data after it.
- The Codex second-pass report is copied unchanged (byte for byte) from `research/second-pass-2026-11-03/codex-report.md` on `codex/second-pass-2026-11-03` (1fd8d66) to [`research/model-cards/cross-family-second-pass-2026-11-03.md`](../research/model-cards/cross-family-second-pass-2026-11-03.md), next to the first report.

## Schema 2.30

Sixteen card-question identifiers, `MC.Q01` to `MC.Q16`, in `src/domain/model-cards.ts`, a set of their own outside the framework comparison's facets: a card is a document with an exact expression, not a framework edition. A card cell is `states_provision` (status `stated` or `partly`) or `provision_not_found`, with the new provision kind `disclosure` (card cells only), the key `model-card-q01`… and `facet.id` naming the question; it is named by the question's label and dated by a publication or revision date of the card read, or undated when the card prints none. Validation rejects another kind, key or label, parties or a computed date, the status `recorded`, a second cell per card and question, and `disclosure` or a `model-card-` key on any other record. `isComparisonCell` now means framework cells only, and card cells are not listed among a document's statements. Documented in `docs/dataset-format.md` (format version unchanged, 1.9) and `docs/ontology.md`.

## What was admitted

**305 cell records**, one per card and question for 20 cards and 16 questions, less 15 cells that do not apply: 141 stated, 57 partly, 107 not found. 410 evidence rows: 303 quotations, each a pack passage its verification matched (on 2026-11-02 and again on 2026-11-03; the CWM report's 12 quotations on 2026-11-02 only, as in part 1), and 107 search-scope records for the absences.

- **Stated and partly cells** quote the card, with page and section; the qualification gives the pack's note and, for a partly cell with a search, the search for the rest of the criterion. Passages identified by a PDF link annotation (Claude Opus 4.5, GPT-5.2-Codex, GPT-6 Luna, Gemini 4 Argon) say so in the evidence (decision 4a).
- **Not-found cells** are inferred, with the criterion, the sections read, the terms searched and every passage set aside as premises.
- **Dates:** 205 cells are dated by the card read (its version date as a revision where it has one, else its printed date); 100 cells, on the seven cards that print no date of their own, are undated (decision 8a).
- **Cross-family coverage** is in each evidence note: the item number where the cell was in the 130-item sample, and whether the check agreed. The six Q07 cells the maintainer excluded (Claude Haiku 5.5, Llama 3.3, Phi-2, Phi-4, Phi-4-mini-flash-reasoning, Grok 4.1) carry "Not cross-family checked" in their qualification.
- **Not applicable (15):** Q03–Q05 for Llama 2, Llama 3.3, Phi-2, Phi-4 and GPT-4V, which predate every framework edition of their developer in the dataset. No record; listed with the reason in the collection definition, as the framework comparison does.

**Quotation limits (12a).** Every source stays within its limit with the pack's passages, so no paraphrase was needed; the script enforces the limits. Tightest: Gemini 3 Flash (100 of 106 words) and MAI-Cyber-1.1-Flash (146 of 165), as in the pack; part 1's passages are the same and count once.

**The o1 PDF source (part 1, held).** The five AI-and-biosecurity evidence rows that quote PDF pages of the o1 card (`evidence-ab-ev-o1-card-cb-medium-result-1`, `-2`, `evidence-ab-ev-o1-card-cbrn-category-1`, `evidence-ab-ev-o1-card-non-expert-statement-1`, `evidence-ab-ev-usaisi-openai-o1-engagement-2`) move from the web-page source `source-o1-card` to the PDF source `mc-src-o1-card-pdf`. It is a pure source reassignment: the AI-and-biosecurity admission of 2026-10-30 matched each quotation in `cdn.openai.com/o1-system-card-20241205.pdf` with SHA-256 `3ba7bdbe…`, the same file the PDF source records; passage, locator, dates and claim are unchanged, and each note gains one sentence recording the move. The two older rows on the web page (`evidence-openai-o1-card-2024`, `evidence-o1-evaluates-deception-2024`) stay, since they cite the web page.

## Decisions applied

| Decision                    | Applied as                                                                                                                                                                                                                                                                            |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1a selection rule           | The "How we searched" note states the batch rule and the collection's wider rule.                                                                                                                                                                                                     |
| 2a population boundary      | Stated in the "How we searched" note.                                                                                                                                                                                                                                                 |
| 3a dates                    | Cells dated as the card prints its date; the six earlier dates on unchecked pages stay held (part 1) and the note says so.                                                                                                                                                            |
| 4a link annotations         | Evidence says "identified by link annotation"; two notes now name the edition instead of the pack's internal field.                                                                                                                                                                   |
| 5a missing editions         | No change; Claude Haiku 5.5's note says the Frontier Compliance Framework is not yet read.                                                                                                                                                                                            |
| 6a, 9a, 10a, 14a, 15a       | As in the pack; 10a also by the o1 move above.                                                                                                                                                                                                                                        |
| 8a undated cards            | Undated cells on the seven cards; Q01 "not found".                                                                                                                                                                                                                                    |
| 11a documents retrieved     | The note lists the five documents retrieved after drafting (Muse Spark Safety & Preparedness Report and o3 Operator addendum by the first check; Sora, Grok-1 and Muse Spark Open by the second pass). None is a row.                                                                 |
| 12a quotation limits        | No passage needed a paraphrase (above).                                                                                                                                                                                                                                               |
| 13a GPT-4V release decision | `mc-cell-openai-gpt-4v-q15` is "not found"; the two pack passages are recorded as set aside with the reason, and the search adds the second pass's terms. The criterion is unchanged. Settled by the second pass (section 1 of the copied report); row 13 of the review note updated. |

**Note edits.** The pack's notes are used as written, with 14 exact replacements in 13 cells (map `noteEdits`, each checked to apply): record IDs such as `rsp-v2-2`, `ms-fgf-2025` and `source-o1-card`, and the internal field name `frameworkEditionNote`, are replaced by the editions' names or dropped, because reader-facing qualifications name no record ID (`reader-text.test.ts`). The o1 Q05 and Q14 notes now say the passage is "also quoted in the dataset's AI and biosecurity records", since those rows are now on the same PDF source. No passage, locator or status changed.

## The collection, and what is held

`src/reading/model-cards.ts` defines "Model cards compared": the question, introduction, the sixteen questions and criteria verbatim from `questions.json` (every cell was classified against them; the script and a test check they are identical), the legend, four limits (the developer's account; policy level only; not a ranking; symbols not summed), the "How we searched" note (inventory and searches, boundary 2a, selection rule 1a, dates, retrieval failures, the five later retrievals under 11a, cross-family coverage) and the not-applicable reasons. Its identity and rows are in `src/reading/model-cards-frame.ts`; `src/domain/model-cards.ts` holds the identifiers, labels, `modelCardsView` and `modelCardsClaimIds`.

**Held: registration as a release collection.** Registering it (one entry in `applicationCollections`) makes every cell's claim page link to `/compare/model-cards`, and the build stops on links to unbuilt pages ("305 links in the built pages lead to no built file"). The brief says to stop rather than build a placeholder route, so the collection is not registered; it is ready to be, on the compute guide's pattern: `collectionClaimIds` already resolves it, `wholeCollections` records the whole definition once it is registered, and `model-cards.test.ts` asserts both. v0.27.0 therefore carries the schema and the 305 records but lists 15 collections, not 16. Registering it with its page, in the interface session, is a new collection and so a later minor release.

**Also held:** the six earlier publication dates on unchecked index or announcement pages (3a), the xAI and Meta framework editions (5a), the Frontier Compliance Framework (5a), archive captures for twelve cards, and the later batches under 1a.

## Changed outside `data/`

- `src/domain/model-cards.ts` (new), `src/reading/model-cards.ts` and `model-cards-frame.ts` (new), `src/domain/model-cards.test.ts` (new).
- `src/domain/schema.ts`, `framework-comparison.ts` (`isComparisonCell`), `document-history.ts` (kind label), `document-record.ts` (card cells not among statements); `src/release/collections.ts` (claim reader by ID, no definition in shared code) and `whole-collections.ts`.
- Tests: `framework-provisions.test.ts` (schema 2.30), `transactions.test.ts`, `versions.test.ts`; `review/essay-starter-gaps.md` regenerated (dataset date).
- `docs/dataset-format.md`, `docs/ontology.md`; `docs/development.md` coverage block (`pnpm docs:coverage`); `research/model-cards/README.md`; `review/model-cards-pack-2026-11-02.md` (row 13 and the part-2 link); `release/CHANGELOG.md` and `release/v0.27.0/`.
- No frozen-count spec needed changing: the cells are on card documents, which no count spec covers, and the collection is not registered.

## Checks

| Check                                    | Result                                                                               |
| ---------------------------------------- | ------------------------------------------------------------------------------------ |
| `pnpm -s validate:data`                  | Valid: 2,151 entities, 6,163 claims, 2,033 sources, 8,393 evidence                   |
| `model-cards-admission --part 2 --check` | Stored records match the pack and the map                                            |
| `pnpm check`                             | Passed at `af6727ae`: format, lint, types, 928 unit tests (90 files), build, budgets |
| `pnpm check:privacy`                     | Passed (2,137 indexed files)                                                         |
| `pnpm release 0.27.0 --check`            | Reproduces byte for byte                                                             |
| `pnpm docs:coverage`                     | Coverage block updated                                                               |
| Browser suite                            | 325 passed (25.0 min), Playwright's Chromium (see below)                             |

### Browser suite

Run once at `af6727ae` on Playwright's Chromium (cloud session; no Edge), from an untracked copy of `playwright.config.ts` without `channel: 'msedge'`, deleted afterwards and never committed. Port 4173 was free before and after: this environment has neither `ss` nor `netstat`, so the "before" check was made by the absence of a listener, and the "after" check by `curl` (no listener) and by binding the port. 325 passed, none failed (25.0 min). No spec needed a change: the cells are on card documents that no count spec covers, and the collection is not registered.

## Budgets

From `pnpm build` at `af6727ae` (gzip level 9, KB of 1,000 bytes). `dist/`: 12,175 files (budget 15,000).

| Page type         | Size     | Limit  |
| ----------------- | -------- | ------ |
| Start page        | 109.2 KB | 115 KB |
| Hub               | 232.4 KB | 295 KB |
| About & method    | 309.0 KB | 330 KB |
| Search            | 274.7 KB | 275 KB |
| Explorer          | 271.4 KB | 330 KB |
| Dossier           | 321.4 KB | 360 KB |
| Person            | 232.5 KB | 295 KB |
| Document          | 247.6 KB | 310 KB |
| Claim             | 279.9 KB | 325 KB |
| Collection        | 305.3 KB | 370 KB |
| Comparison        | 286.8 KB | 520 KB |
| Guide             | 327.0 KB | 630 KB |
| Compute guide     | 274.9 KB | 340 KB |
| Propositions      | 338.0 KB | 455 KB |
| Control timelines | 260.9 KB | 285 KB |
| By author         | 286.2 KB | 310 KB |
| By author index   | 229.5 KB | 250 KB |
| Year              | 350.8 KB | 400 KB |
| Years index       | 228.6 KB | 305 KB |

Search first went 5 KB over: `src/release/collections.ts` imported the whole definition, so the shared `collections` chunk grew from 0.6 to 6.2 KB. The fix keeps the reader text out of shared code (the frame file) and, until registration, lets shared code resolve the collection by its ID alone. What remains of the growth on Search, against a build of `main`, is 0.4 KB in the search index (the 305 new claims) and 0.4 KB in the `collections` chunk (the claim reader from `src/domain/model-cards.ts`). No limit was raised.

## What the page session needs

1. **Search has 0.3 KB of headroom.** Registering the collection adds its frame to shared code (about 0.3–0.5 KB gzip, mostly the 20 row IDs and the question) and an entry to the search page's collection filter with 305 claim IDs. Expect Search to go over; find room as the operating guide says (for instance, let the search page's collection filter load claim IDs lazily, or shorten what the frame carries). Never raise the limit.
2. Register `{ kind: 'compare', definition: modelCardsFrame }` in `applicationCollections` together with the page at `/compare/model-cards`; flip the "not yet a release collection" test; `wholeCollections` already substitutes the whole definition. Then cut a minor release (new collection).
3. `src/domain/deep-links.ts` accepts only `frontier-safety-frameworks` under `/compare/`; the page, and `?inspect=<claim>` (claim pages link with it), need a route; `openInCollection` in `src/Workspace.tsx` needs the case.
4. The table (rows: cards; columns: Q01–Q16), a keyboard list equivalent, per-question pages if wanted, and a CSV. Read cells with `modelCardsView(data, modelCards)`; `cardCellNote` strips the shared sentences (`cardStandingText`) from a qualification so the page states them once. Not-applicable cells come from `notApplicable` with their reasons. Criteria refer to other questions by number ("Q02", "Q03"), so show the numbers.
5. Card documents' own pages list the 16 cells among "other" records, in stored order; the page session may want a section for them.
6. Load the page's module and cell text lazily; keep `src/reading/model-cards.ts` out of shared code.
