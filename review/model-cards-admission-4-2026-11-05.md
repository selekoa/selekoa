# Model cards compared: admission, part 4 (2026-11-05)

Admission record for the third model-cards pack ([`research/model-cards-3/`](../research/model-cards-3/), review note [`model-cards-pack-3-2026-11-05.md`](model-cards-pack-3-2026-11-05.md) with its adjudication, both copied as files from `model-cards-pack-3`, not merged). Parts 1–3: [`model-cards-admission-1-2026-11-03.md`](model-cards-admission-1-2026-11-03.md), [`model-cards-admission-2-2026-11-04.md`](model-cards-admission-2-2026-11-04.md), [`model-cards-admission-3-2026-11-05.md`](model-cards-admission-3-2026-11-05.md). Release **v0.29.2** (patch: additions within an existing collection, which `pnpm release` lists as one changed collection, now at version 3; no schema change and no new collection).

- **Roles.** This pack was **prepared by Codex (GPT family)** and **checked blind by Claude** (cross-family check of 2026-11-05: 60 items; on the six admitted cards 40 cells, 24 of them answered blind, 38 agree, 1 minor, 1 material). The earlier packs had the roles the other way round. The preparing session claims no fresh-context audit of its own. **Adjudicated** on `model-cards-pack-3` with the maintainer's decisions. **Admitted by:** a Claude session. The roles are recorded in the data (every evidence note of this part) and in the collection's "How we searched".
- **Status:** every new record is a seed (`editorialState: seed`) with machine-checked evidence; no human review.
- **Chain base.** Branch `model-cards-admission-4` from `origin/main` at `40db3170` (#163, part 3, release v0.29.1). No other data branch was open (the one open pull request, #164, recorded answers only). `origin/main` was merged at `f3e6d5a3` (#164, `review/decisions/answers-2026-11-05.md` only) before the final checks; it changed nothing in `data/` or `release/`, so the snapshot, the records and v0.29.2 stand (`--part 4 --check` and `pnpm release 0.29.2 --check` rerun after the merge).
- **Mechanics:** one script, [`scripts/model-cards-admission.ts`](../scripts/model-cards-admission.ts), now with `--part 4`, reading the authored map [`model-cards-admission-4-map-2026-11-05.json`](model-cards-admission-4-map-2026-11-05.json). Part 4 runs as part 3 (cards, then further expressions, of which it has none, then cells). New in the script: the map's `held` cards must be exactly the pack's held cards, and neither they nor their cells are admitted; the third pack's check, which lists its items by part, is read as such ("agree (reconciled)" counts as agreement); an existing card may gain citations (Claude 3.7 Sonnet); a retrieval time is recorded by its day; the map sets the roles sentence, the absence note's drafting sentence and the repeated-retrieval sentence. The part-3 checks still apply, including that every map entry changed a record. The before-snapshot [`model-cards-admission-4-before-2026-11-05.json`](model-cards-admission-4-before-2026-11-05.json) is first in the chain in `src/editorial/historical-views.ts`. `--part 4 --check` reproduces the stored records.

## What was admitted

5 entities, 106 claims, 5 sources and 113 evidence rows added; no existing record changed.

**Documents (6 cards).** Five new document entities: the system card for Claude Opus 4 and Claude Sonnet 4, the Muse Spark 1.1 Evaluation Report, the o1-preview and o1-mini system card (September 2024; not the December o1 card already in the dataset), the Operator system card and the Grok 4.20 system card. Claude 3.7 Sonnet is reused, never duplicated: `claude-3-7-sonnet-system-card` and its source `source-ab-claude37-card` (AI and biosecurity admission) hold the same file the pack read (same SHA-256), so the document, source and publication record `ab-ev-claude37-card-published` are used unchanged, and only its citation and cells are added.

**Publication (5 new records),** each on a verified pack passage of the card.

**Citations of framework editions (5).** Only editions already in the dataset that the card identifies:

| Card                            | Edition                  | How the card identifies it                                                    |
| ------------------------------- | ------------------------ | ----------------------------------------------------------------------------- |
| Claude 3.7 Sonnet               | `rsp-2023`               | Reference [1], dated September 2023                                           |
| Claude Opus 4 & Claude Sonnet 4 | `rsp-v2-2`               | Link annotation (4a); the checker read the target's cover (v2.2, 14 May 2025) |
| Muse Spark 1.1                  | `meta-aasf-v2-0`         | Footnote 2's address, whose file name names version 2                         |
| o1-preview and o1-mini          | `preparedness-beta-2023` | Reference [29], the beta framework with its address                           |
| Operator                        | `preparedness-beta-2023` | Reference [3], the beta framework with its address                            |

Not linked: Grok 4.20 (its text names the FAIF, its bibliography an "xai risk management framework, 2025"; neither edition is inferred, and xAI's frameworks are not in the dataset).

**Cells (96).** 66 stated, 19 partly, 11 not found, 0 not applicable, as the adjudicated pack. 102 quotations, each a passage the pack's verification matched (2026-11-05, and again after the adjudication against a fresh retrieval with the same SHA-256; the checker's retrievals had the same SHA-256 for all six cards); 11 search-scope records for the absences. Evidence notes give the cross-family item where the cell was sampled and whether the check agreed or its finding was applied.

## Dates

As in parts 1 and 3: a card is dated as it prints its own date.

- **Printed date:** Claude Opus 4 & Claude Sonnet 4 (May 2025, month, on the cover: a printed month, not an index month, Part C), Muse Spark 1.1 (2026-07-09), o1-preview and o1-mini (2024-09-12; the file name's 20240917 is not used), Grok 4.20 (2026-04-07).
- **Operator:** printed card date 2025-01-23 (`publishedAt`, publication record); the copy read is the expression revised on 2025-03-11 (§4.7 "Updated March 11, 2025"), so `revisedAt` and the source's `versionDate` are 2025-03-11 and the cells are dated by that revision. The capture of 2025-01-23 is recorded as located, not retrieved (Part C).
- **Undated:** Claude 3.7 Sonnet prints no date. Anthropic's index month (February 2025) stays held as in part 3; the existing record's undated publication is unchanged, and its citation and cells carry no date.

## Adjudicated corrections

All are already in `pack.json` (post-adjudication); the script applies the pack as it stands.

- **Grok 4.20 Q05 (item 38, material): partly**, the checker's reading by the maintainer's decision a. The map's `cells` entry adds "Maintainer decision a of 2026-11-05." to the cell's qualification; its passage is §1.3, verified (94 of 94 pack quotations found).
- **Claude 4 Q02 (item 44, minor):** the note says the card implies API access in a jailbreak passage and states no release form or date.
- **Part C notes:** Claude 4's date kind (printed cover month), Operator's expression (revised March 11, 2025; the January date stands), Grok-1's basis wording (population only; Grok-1 is held).
- **Note edits (9 cells, map `noteEdits`, each checked to apply):** record IDs (`rsp-v2-2`, `meta-aasf-v2-0`, `preparedness-beta-2023`) replaced by edition names; "decision 4a/6a/13a" written as maintainer decisions; "the inherited population … by index month" replaced by "Anthropic's index gives the month February 2025, a page not yet checked as a source". No passage, locator or status changed by these edits.
- **Quotation limits:** every source within its limit (Claude 3.7 Sonnet 449 of 800 words with its existing quotations; the others 149–287 of 400).
- **Archive copies:** none recorded. Part D located captures for all eight cards and retrieved none; only Operator's is described, in its source's version note, and Claude 4's capture of 2025-07-17 in its source's version note.

## The collection

`src/reading/model-cards-frame.ts`: six rows inserted in the page's order (developers alphabetically, then by the card's date; an undated card by its earliest located date): Claude 3.7 Sonnet and Claude Opus 4 & Sonnet 4 after the Claude 3.5 Haiku addendum; Muse Spark 1.1 after the Muse Spark report; o1-preview and o1-mini after GPT-4o, and Operator after the December o1 card; Grok 4.20 after Grok 4.1. Frame version 2 → 3; 34 rows. `src/reading/model-cards.ts` "How we searched": a paragraph on the third batch (six of the next eight cards; PaliGemma and Grok-1 held, with the reason; Claude 3.7 Sonnet's missing date), and a paragraph on the roles: the first two batches drafted by Claude and checked by Codex, the third drafted by Codex and checked by Claude (40 of 96 cells, 24 blind; the other 56 with the drafting model's machine checks only; one status change, Grok 4.20 question 5, by the maintainer's decision). No question, criterion, legend or not-applicable entry changed.

## Maintainer answers of 2026-11-05

"pack 3: 6 cards, Grok a" (planning thread, about 09:00 Helsinki time; recorded in [`decisions/answers-2026-11-05.md`](decisions/answers-2026-11-05.md), merged with #164). Admit Claude 3.7 Sonnet, Claude Opus 4 & Claude Sonnet 4, Muse Spark 1.1, o1-preview and o1-mini, Operator and Grok 4.20; hold PaliGemma and Grok-1. Grok 4.20 Q05: partly. Applied as above.

## Held, with reasons

- **PaliGemma and Grok-1** (maintainer, 2026-11-05): read only from Internet Archive captures, which refused the checker; none of their 20 sampled cells was cross-family checked. They join a later part once a reader outside the Codex family opens the captures and checks their cells. Their cells stay in the pack, unchanged.
- **Earliest-located dates on index pages:** Claude 3.7 Sonnet (February 2025), as for Claude 3 and the Claude 3.5 Sonnet addendum.
- **Framework editions not in the dataset:** xAI's (Grok 4.20, as Grok 4).
- **Later packs 4–11** under the order in `research/model-cards-2/population.md`.

## Budget: room for six rows

The six rows took the Model cards page from 324.6 KB (v0.29.1) to **343.2 KB**, over its 330 KB limit; its slice was 106.9 KB of it. Most of that is cell text (qualifications, search records, passages), and gzip, with its 32 KB window, did not find sentences repeated from cell to cell (criteria, standing sentences, dates' notes), because a row's sixteen cells lie between two cells of one question. The shared frame offered no comparable room (the model-cards frame module is 0.6 KB; the collection's reader text is in the page's own module).

Change (commit "Slice files stored by field"): slice files are now written packed (`packSlice` in `src/domain/slices.ts`, called by `scripts/prerender.ts`): each kind's records by field, the values of one field together, and positions as differences. The browser unpacks a file when it fetches it (`unpackSlice`, `src/main.tsx`); a file that is not packed is read as it stands. Nothing is left out of a slice: cell text stays in the page's slice, and a unit test (`src/site/split.test.ts`, "slice files") checks that the model-cards, dossier and claim slices and the core come back field for field. Every page with a slice is lighter or unchanged; the start page carries the unpacking code (+0.5 KB). No limit was raised.

From `pnpm build` (gzip level 9, KB of 1,000 bytes); “After” is the final `pnpm check` build, after the `main` merge. `dist/`: 12,586 files (budget 15,000).

| Page type         | v0.29.1  | Six rows, before | After    | Limit  |
| ----------------- | -------- | ---------------- | -------- | ------ |
| Start page        | 110.1 KB | 110.1 KB         | 110.6 KB | 115 KB |
| Hub               | 232.9 KB | 232.9 KB         | 232.3 KB | 295 KB |
| About & method    | 237.9 KB | 237.9 KB         | 238.4 KB | 330 KB |
| Search            | 255.5 KB | 255.7 KB         | 256.1 KB | 275 KB |
| Explorer          | 271.9 KB | 271.9 KB         | 268.7 KB | 330 KB |
| Dossier           | 322.3 KB | 323.0 KB         | 322.6 KB | 360 KB |
| Person            | 233.0 KB | 233.1 KB         | 233.4 KB | 295 KB |
| Document          | 248.1 KB | 248.2 KB         | 246.4 KB | 310 KB |
| Claim             | 282.5 KB | 282.5 KB         | 282.6 KB | 325 KB |
| Collection        | 305.8 KB | 305.9 KB         | 295.6 KB | 370 KB |
| Comparison        | 290.2 KB | 290.5 KB         | 282.6 KB | 520 KB |
| Model cards       | 324.6 KB | 343.2 KB         | 325.8 KB | 330 KB |
| Guide             | 328.1 KB | 328.1 KB         | 326.3 KB | 630 KB |
| Compute guide     | 275.4 KB | 275.4 KB         | 272.6 KB | 340 KB |
| Propositions      | 340.6 KB | 340.6 KB         | 325.7 KB | 455 KB |
| Control timelines | 261.4 KB | 261.5 KB         | 258.2 KB | 285 KB |
| By author         | 287.1 KB | 287.2 KB         | 279.6 KB | 310 KB |
| By author index   | 230.0 KB | 230.0 KB         | 230.5 KB | 250 KB |
| Year              | 352.8 KB | 353.9 KB         | 349.6 KB | 400 KB |
| Years index       | 229.1 KB | 229.1 KB         | 229.6 KB | 305 KB |

The Model cards page is still the tightest (325.8 of 330 KB). The next pack (about eight rows) will not fit: it needs the cell text loaded after the table is drawn, or the page's slice split (operating guide § Budgets, item 4), not a higher limit.

## Changed outside `data/`

- `scripts/model-cards-admission.ts` (`--part 4`, see Mechanics); `review/model-cards-admission-4-map-2026-11-05.json`, the before-snapshot, this record; `research/model-cards-3/` and `review/model-cards-pack-3-2026-11-05.md` (copied).
- `src/reading/model-cards-frame.ts`, `src/reading/model-cards.ts`; `src/editorial/historical-views.ts` (the new snapshot first in the chain).
- `src/domain/slices.ts`, `src/main.tsx`, `scripts/prerender.ts`, `src/site/split.test.ts` (packed slice files, above).
- Tests: `src/domain/model-cards.test.ts` (reads the third pack and map, without the held cards), `transactions.test.ts`, `versions.test.ts` (part 4's claims set aside in the frozen RSP-family count: the Claude 3.7 Sonnet and Claude 4 cards cite RSP editions), `src/domain/research-path.test.ts` (part 4's claims set aside in the frozen counts), `tests/browser/model-cards.spec.ts` (the collection's own counts: 34 rows, 544 CSV cells, OpenAI 7 of 34, xAI 4, Google DeepMind 4).
- `docs/development.md` coverage block (`pnpm docs:coverage`); `release/CHANGELOG.md`, `release/v0.29.2/`.

## Checks

| Check                                    | Result                                                                                                                                                                                                                                    |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm -s validate:data`                  | Valid: 2,175 entities, 6,455 claims, 2,056 sources, 8,746 evidence                                                                                                                                                                        |
| `model-cards-admission --part 4 --check` | Stored records match the pack and the map (also after the `main` merge)                                                                                                                                                                   |
| `pnpm check`                             | Passed on the final code after the `main` merge: format, lint, types, 954 unit tests (91 files), build with budgets. The first run failed on a type assertion in `unpackSlice` (fixed) and the second on this record's formatting (fixed) |
| `pnpm check:privacy`                     | Passed (2,394 indexed files), before every push                                                                                                                                                                                           |
| `pnpm release 0.29.2 --check`            | Reproduces byte for byte (also after the `main` merge)                                                                                                                                                                                    |
| `pnpm docs:coverage`                     | Coverage block updated, then current                                                                                                                                                                                                      |
| Browser suite                            | 335 passed (27.3 min) on the final build, after the `main` merge                                                                                                                                                                          |

### Browser suite

Run once on Playwright's Chromium (cloud session; no Edge), from an untracked copy of `playwright.config.ts` without `channel: 'msedge'`, deleted afterwards and never committed. Port 4173 was free before (checked by binding it) and after: once the run ended, nothing answered on it, and a plain bind succeeded once the closed connections had expired. The run used the build of the final `pnpm check`, so it covers the packed slice files on every page. No spec failed. The model-cards spec's counts were raised to the collection's new size in advance; no selector was loosened.

## Next step

Review and pull request by the planning thread. Then the held PaliGemma and Grok-1 cells need a reader outside the Codex family who can open the captures. The next pack needs the room described in "Budget".
