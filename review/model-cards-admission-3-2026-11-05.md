# Model cards compared: admission, part 3 (2026-11-05)

Admission record for the second model-cards pack ([`research/model-cards-2/`](../research/model-cards-2/), review note [`model-cards-pack-2-2026-11-04.md`](model-cards-pack-2-2026-11-04.md), both copied as files from `model-cards-pack-2`, not merged). Parts 1 and 2: [`model-cards-admission-1-2026-11-03.md`](model-cards-admission-1-2026-11-03.md), [`model-cards-admission-2-2026-11-04.md`](model-cards-admission-2-2026-11-04.md). Release **v0.29.1** (patch: additions within an existing collection, which `pnpm release` lists as one changed collection, now at version 2; no schema change and no new collection, so not a minor release).

- **Prepared by:** Claude (pack, same-family audit, adjudication). **Cross-family check:** OpenAI Codex, 2026-11-04 (60 cells: 55 agree, 3 minor, 2 material). **Admitted by:** a Claude session.
- **Status:** every new record is a seed (`editorialState: seed`) with machine-checked evidence; no human review.
- **Chain base.** Branch `model-cards-admission-3` from `origin/model-cards-page` at `a3f55d9d` (release v0.29.0, which registers the collection and builds its page), with `origin/main` merged at `6184d207` (#160, laws-compared admission part 1, release v0.28.1) before any data change, and again at `78413585` (#162, the page merged) before the final checks ("Sequencing" below). The before-snapshot was generated on the first merged base; the second merge changed no data. `release/CHANGELOG.md` conflicts were resolved by re-running `pnpm release`.
- **Mechanics:** one script, [`scripts/model-cards-admission.ts`](../scripts/model-cards-admission.ts), now with `--part 3` (`--check`, `--base <commit>`), reading the authored map [`model-cards-admission-3-map-2026-11-05.json`](model-cards-admission-3-map-2026-11-05.json). Part 3 runs the card step of part 1, then the further expressions, then the cell step of part 2. Besides the checks of parts 1 and 2 (unknown map key or pack cell, passage its verification did not match, edition the pack does not link, quotation over its limit, duplicate ID, any map entry that changed no record), it stops on: an existing card whose stored expression is not the pack's (SHA-256 and `datasetSource`), a capture recorded as an archive copy that the checker did not find byte-identical, an expression whose checker retrieval did not succeed or is of another address, a pack card that is not a row of the collection, and a card that gained no cell. The before-snapshot [`model-cards-admission-3-before-2026-11-05.json`](model-cards-admission-3-before-2026-11-05.json) is first in the chain in `src/editorial/historical-views.ts`. `--part 3 --check` reproduces the stored records.

## What was admitted

7 entities, 140 claims, 9 sources and 174 evidence rows added; 1 entity changed (`fsf-v2-0` gains a source).

**Documents (8 cards).** Seven new document entities. Grok 4 is reused, never duplicated: `grok-4-model-card` and its source `source-ab-grok4-card` (AI and biosecurity admission) hold the same file the pack read (same SHA-256), so the document, source and publication record `ab-ev-grok4-card-published` are used unchanged and only the cells are added.

**P1 a (a safety report beside a model card is its own row when it cites the framework).** Applied as far as pack 2 drafted such rows: the CWM model card (`cwm-model-card`) is a row beside the first pack's CWM Preparedness Report. Not drafted in pack 2, so listed for later packs (order in `research/model-cards-2/population.md`): the Gemini 3 Pro FSF report (pack 6), the Gemini 3.7 Flash FSF report (pack 9) and the Gemini 4 Argon Safety & Security Report (pack 10, beside the first pack's Argon model card, which is unchanged).

**Publication (7 new records).** Each on a verified pack passage of the card.

**Citations of framework editions (5).** Only editions already in the dataset that the card identifies:

| Card                  | Edition                  | How the card identifies it                                          |
| --------------------- | ------------------------ | ------------------------------------------------------------------- |
| Claude 3              | `rsp-2023`               | Reference dated September 2023, and "v1.0 of our RSP"               |
| Gemini 2.0 Flash      | `fsf-v2-0`               | Link annotation (4a); checker confirmed the linked file's cover     |
| Gemini 2.0 Flash-Lite | `fsf-v2-0`               | Link annotation (4a); checker confirmed the linked file's cover     |
| Muse Spark report     | `meta-aasf-v2-0`         | Address whose file name names version 2                             |
| GPT-4o                | `preparedness-beta-2023` | Reference [4], "preparedness framework beta", 2023 (raw text order) |

Not linked: the Claude 3.5 Sonnet addendum (RSP named without an edition), the CWM card (Frontier AI Framework linked at an undated address) and Grok 4 (Risk Management Framework, not in the dataset; 5a).

**Further expressions (2 sources, no quotations).** Both rest on the cross-family check's retrievals (address and SHA-256 recorded in the source):

- `mc-src-fsf-v2-0-linked-file` on `fsf-v2-0` (9a): the "Frontier Safety Framework 2.0 (1).pdf" file the Gemini 2.0 cards link to; same cover version and date as the dataset's file, different bytes.
- `mc-src-muse-spark-report-meta` on the Muse Spark report: Meta's own copy, 158 pages, printing April 14, 2026, from an Internet Archive capture of 2026-04-14 (recorded as its archive copy).

**Cells (128).** 60 stated, 27 partly, 41 not found, 0 not applicable, as the adjudicated pack. 117 quotations, each a passage the pack's verification matched (2026-11-04, and again after the adjudication against a fresh retrieval with the same SHA-256); 41 search-scope records for the absences. Evidence notes give the cross-family item where the cell was sampled and whether the check agreed or its finding was applied.

## Dates (3a, 8a)

As in part 1: a card is dated as it prints its own date; earliest-located dates on index pages that are not sources stay held.

- **Printed publication date:** Gemini 2.0 Flash-Lite (2025-04-10), Gemini 2.0 Flash (2025-04-15), GPT-4o (2024-08-08).
- **Revision only:** Claude 3, dated by the later update line of the copy read (2024-10-22, `revision`); Grok 4 unchanged (2025-08-20, "Last updated"), so its cells take the version's revision date. The script now falls back to the card's `documentVersion.revisedAt` when the source carries no date, which validation accepts.
- **Muse Spark:** `documentVersion` publishedAt 2026-04-14 (Meta's earlier expression, recorded as a source, read by the checker) and revisedAt 2026-06-12 (the arXiv copy read). The publication record and the cells are dated by the copy read (2026-06-12, `revision`), because no passage of the April copy is quoted.
- **Undated (8a):** the Claude 3.5 Sonnet addendum and the CWM card; the CWM commit date (2025-09-24) stays in the source's version note.

## Adjudicated corrections and pack changes

- **Applied as in the pack** (pack.json is post-adjudication): items 4 (Claude 3 Q11, not found → partly) and 28 (Muse Spark Q10, partly → stated), and minor items 31, 48 and 58.
- **GPT-4o Q04 (one passage replaced).** The pack's Q04 passage was the same interleaved text-layer reading of reference [4] that the checker found not quoted as printed for Q03 (item 31); the pack repaired only Q03. The Q04 cell now quotes the repaired Q03 passage (verified in pdftotext's raw reading order), with its note saying why the address is not quoted. Status unchanged (stated). Map `cells`, key `passagesFrom`, which accepts only another verified passage of the same card.
- **First-pack cells:** the adjudication lists no correction to a first-pack cell. Open question 6 kept Grok 4 Q05 not found (checker agreed, items 13, 18, 36), so Grok 4.1 Q05 is not re-read. Nothing held.
- **Note edits (13 cells, map `noteEdits`, each checked to apply):** record IDs (`rsp-2023`, `fsf-v2-0`, `meta-faf-v1-1`, `meta-aasf-v2-0`, `preparedness-beta-2023`) and the internal field `frameworkEditionNote` replaced by edition names, because reader-facing text names no record ID; "inventory" and "first-pack row" replaced by reader terms; the Claude 3 Q01 note now says the index month is held, not that the row is dated by it. No passage, locator or status changed by these edits.
- **Quotation limits (12a):** every source within its limit with the pack's passages (Grok 4 counted with its existing AI-and-biosecurity quotations); no paraphrase needed.
- **Archive copies:** recorded only where the checker found the capture byte-identical to the copy read (Claude 3.5 Sonnet addendum, both Gemini 2.0 cards). The Claude 3, GPT-4o and Grok 4 captures hold other expressions, and the CWM capture is of the rendered GitHub page; each is described in the source's version note (Grok 4's existing source is unchanged).

## The collection

`src/reading/model-cards-frame.ts`: eight rows inserted in the page's order (developers alphabetically, then by the card's date; an undated card by its earliest located date): Claude 3 and the Claude 3.5 Sonnet addendum after Claude 2; both Gemini 2.0 cards before Gemini 3 Flash; the CWM card before the CWM Preparedness Report and the Muse Spark report before Muse Spark 1.3; GPT-4o after GPT-4V; Grok 4 before Grok 4.1. Frame version 1 → 2. `src/reading/model-cards.ts` "How we searched": the batch rule and P1 a, a paragraph on the second batch and its search for "cites", the Muse Spark dating, the second batch's retrieval failures, the Muse Spark report now a row, and the second cross-family check. No question, criterion, legend or not-applicable entry changed.

## Maintainer answers of 2026-11-05 (page choices)

Relayed by the planning thread ("page choices as recommended") and recorded in [`decisions/answers-2026-11-05.md`](decisions/answers-2026-11-05.md). Choices 1–3 (no start-page tool yet; edition links filter by developer; short status words) need no change here. Choice 4a: no visible mark in the table; the collection's "How we searched" now names the six cells not cross-family checked (Q07 for Claude Haiku 5.5, Llama 3.3, Phi-2, Phi-4, Phi-4-mini-flash-reasoning and Grok 4.1) and gives the maintainer's reason in two sentences. The cells' qualifications are unchanged. This changes released collection text, so it is part of v0.29.1.

## Held, with reasons

- **Earliest-located dates on index pages:** Claude 3 (Anthropic's index, March 2024; an archive capture of 2024-03-04 holds the original expression, with no quoted date) and the Claude 3.5 Sonnet addendum (index, June 2024). As in part 1, until the pages are retrieved and verified.
- **Framework editions not in the dataset (5a):** xAI's Risk Management Framework (Grok 4).
- **Rows under P1 a not drafted in pack 2:** the three Google DeepMind safety reports above.
- **Later packs 3–11** under the order in `population.md` (pack 3: Claude 3.7 Sonnet; Claude Opus 4 & Sonnet 4; PaliGemma; Muse Spark 1.1; o1-preview and o1-mini; Operator; Grok-1; Grok 4.20).
- **Nothing else.** No first-pack cell correction was listed, and no cell is held.

## Sequencing: v0.29.0 and the rebuild

The page branch first cut v0.29.0 (2026-11-04) against v0.28.0, before `main`'s v0.28.1 existed. Once `main` was merged here, v0.29.0 no longer reproduced from its own records against its predecessor v0.28.1, and the release test found v0.28.1's three laws-compared records dropped without a listed removal (two failures in the first `pnpm check`). This branch re-cut v0.29.0 on the merged base in a temporary worktree (`2dde8f95`, `--date 2026-11-04`) and re-cut v0.29.1 on it.

Before the final checks, `origin/main` had moved: the page branch had made the same re-cut itself (v0.29.0 dated 2026-11-05) and been merged (#162, `78413585`), with #161 and the answers of 2026-11-05 (review files only). `origin/main` was merged at that point. The only conflicts were in `release/` (the re-cut's date): `main`'s v0.29.0 was taken unchanged (no difference from `origin/main` remains under `release/v0.29.0/`), and v0.29.1 was cut again on it (`pnpm release 0.29.1`; "Against v0.29.0: 330 added, 2 changed"). `main` changed nothing in `data/`, so the before-snapshot did not need regenerating: `--part 3 --check` still reproduces the stored records, and the snapshot's base hashes still match. Chain base: `origin/main` at `78413585`. Release version: v0.29.1, still the next free version.

## Changed outside `data/`

- `scripts/model-cards-admission.ts` (`--part 3`, see Mechanics); `review/model-cards-admission-3-map-2026-11-05.json`, the before-snapshot, this record.
- `src/reading/model-cards-frame.ts`, `src/reading/model-cards.ts`; `src/editorial/historical-views.ts`: the new snapshot first in the chain, and `revert` now shares unchanged rows with the newer view instead of deep-copying every row at every step. With one more step, `framework-provisions.test.ts` ran out of heap (2.2 GB in this container; it passes on `main`), alone and in the full run. Restored and removed rows are still copies of the snapshot's; the views are read-only, and the ten test files that read them pass. No limit was raised.
- Tests: `src/domain/model-cards.test.ts` (reads both packs and maps; row set and claim-ID set compared, as rows now interleave the packs), `transactions.test.ts`, `versions.test.ts` (part 3's claims set aside in the frozen RSP-family count: the Claude 3 card cites RSP v1.0), `tests/browser/model-cards.spec.ts` (the collection's own counts: 28 rows, 448 CSV cells, OpenAI 5 of 28, xAI 3, Google DeepMind 4).
- `src/domain/research-path.test.ts` (part 3's claims set aside in the frozen OpenAI and founding-attribution counts; the GPT-4o card and its cells are OpenAI's records).
- `review/essay-starter-gaps.md` regenerated (`pnpm question:gaps`, dataset date).
- `docs/development.md` coverage block (`pnpm docs:coverage`); `release/CHANGELOG.md`, and `release/v0.29.1/` (`release/v0.29.0/` as on `main`).

## Checks

| Check                                    | Result                                                                                                                                                                                                                                                                                        |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm -s validate:data`                  | Valid: 2,170 entities, 6,349 claims, 2,051 sources, 8,633 evidence                                                                                                                                                                                                                            |
| `model-cards-admission --part 3 --check` | Stored records match the pack and the map (also after the second `main` merge)                                                                                                                                                                                                                |
| `pnpm check`                             | Passed in its stages on the final code: format, lint, types, 950 unit tests (91 files); build with budgets after the second `main` merge, and again after the choice-4a text. The first full runs failed on the v0.29.0 base (fixed by the re-cut) and on heap (fixed in `revert`), see above |
| `pnpm check:privacy`                     | Passed (2,347 indexed files)                                                                                                                                                                                                                                                                  |
| `pnpm release 0.29.1 --check`            | Reproduces byte for byte (after the final re-cut)                                                                                                                                                                                                                                             |
| `pnpm docs:coverage`                     | Coverage block updated, then current                                                                                                                                                                                                                                                          |
| Browser suite                            | 335 passed (40.0 min) on the final base before the choice-4a text; after it, `model-cards.spec.ts` rerun on a fresh build: 10 passed                                                                                                                                                          |

### Browser suite

Run once on Playwright's Chromium (cloud session; no Edge), from an untracked copy of `playwright.config.ts` without `channel: 'msedge'`, deleted afterwards and never committed. Port 4173 was free before and after (checked by binding it). The full run was on the build after the second `main` merge. The only later change was the collection's "How we searched" text and the v0.29.1 re-cut, so only the model-cards spec was rerun, on a fresh build. No spec failed. The model-cards spec's counts were raised to the collection's new size in advance (above); no selector was loosened.

## Budgets

From `pnpm build` on the final base (after the second `main` merge; gzip level 9, KB of 1,000 bytes). `dist/`: 12,465 files (budget 15,000). No limit was raised.

| Page type         | Size     | Limit  |
| ----------------- | -------- | ------ |
| Start page        | 110.1 KB | 115 KB |
| Hub               | 232.9 KB | 295 KB |
| About & method    | 237.9 KB | 330 KB |
| Search            | 255.5 KB | 275 KB |
| Explorer          | 271.9 KB | 330 KB |
| Dossier           | 322.3 KB | 360 KB |
| Person            | 233.0 KB | 295 KB |
| Document          | 248.1 KB | 310 KB |
| Claim             | 282.5 KB | 325 KB |
| Collection        | 305.8 KB | 370 KB |
| Comparison        | 290.2 KB | 520 KB |
| Model cards       | 324.6 KB | 330 KB |
| Guide             | 328.1 KB | 630 KB |
| Compute guide     | 275.4 KB | 340 KB |
| Propositions      | 340.6 KB | 455 KB |
| Control timelines | 261.4 KB | 285 KB |
| By author         | 287.1 KB | 310 KB |
| By author index   | 230.0 KB | 250 KB |
| Year              | 352.8 KB | 400 KB |
| Years index       | 229.1 KB | 305 KB |

The Model cards page is the tightest (324.6 of 330 KB after the choice-4a text; 324.5 before). Its limit was set at v0.29.0 about 10% above its first weight (so about 300 KB for twenty rows); the eight new rows add their cells to the page's data slice. Later packs will need room there (operating guide § Budgets: load the cell text lazily, or split the page's slice), not a higher limit.
