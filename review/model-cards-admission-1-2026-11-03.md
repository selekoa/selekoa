# Model cards compared: admission, part 1 (2026-11-03)

Admission record for the first part of the model-cards pack ([`research/model-cards/`](../research/model-cards/), review note [`model-cards-pack-2026-11-02.md`](model-cards-pack-2026-11-02.md)). Branch `model-cards-admission-1`, from `main` at `5198c881`. Release **v0.26.4** (patch: additions within existing collections; no schema change and no new collection, so not a minor release).

- **Prepared by:** Claude (pack, same-family audit, adjudication). **Cross-family check:** OpenAI Codex, 2026-11-03. **Admitted by:** a Claude session.
- **Status:** every new record is a seed (`editorialState: seed`) with machine-checked evidence; no human review.
- **Mechanics:** one script, [`scripts/model-cards-admission.ts`](../scripts/model-cards-admission.ts) (`--part 1`, `--check`, `--base <commit>`), reading the authored map [`model-cards-admission-1-map-2026-11-03.json`](model-cards-admission-1-map-2026-11-03.json). It stops on an unknown map key, a pack passage its verification did not match, a framework edition the pack does not link, a duplicate ID, a quotation over its limit, and any map entry that changed no record. The before-snapshot [`model-cards-admission-1-before-2026-11-03.json`](model-cards-admission-1-before-2026-11-03.json) is first in the chain in `src/editorial/historical-views.ts`.
- The pack and its review note were copied as files from `model-cards-apply` (not merged). The maintainer's decisions are recorded in the review note under "Maintainer decisions (2026-11-03)".

## What was admitted

On existing predicates only (`published`, `cites`): 18 entities, 26 claims, 20 sources and 31 evidence rows added; 2 entities and 1 claim changed.

**Documents (20 cards).** 18 new document entities; two existing ones reused, never duplicated:

- `claude2-model-card` (decision 9a): the November 2023 re-issue with the Claude 2.1 appendix is a new source of the existing document (`versionDate` 2023-11-21), and a new `published` record dates the update.
- `o1-card-2024` (decision 10a): the PDF is a new source of the existing document, with its own dates (cover 2024-12-05, a section added 2024-12-19). Its cover is added as evidence to the existing publication record `openai-o1-card-2024`.

No existing entity matched the other 18 cards (`gpt4-system-card-2023` is the GPT-4 card, not GPT-4V; `claude-3-7-sonnet-system-card` is not one of the 20).

**Sources (20).** One per card, for the expression read: address, SHA-256 and retrieval date from the pack, the developer as author and publisher, `documentWords` for the quotation limit, and for eight cards the archive capture the cross-family check found by index search (not opened; bytes not authenticated).

**Publication (19 new records, 1 extended).** Each developer's publication of its card, on a verified pack passage of the card.

**Citations of framework editions (7).** Only editions already in the dataset that the card identifies:

| Card                                 | Edition                  | How the card identifies it                        |
| ------------------------------------ | ------------------------ | ------------------------------------------------- |
| Claude 3.5 Haiku and Sonnet addendum | `rsp-v2-0`               | Reference dated October 2024 with a dated address |
| Claude Opus 4.5                      | `rsp-v2-2`               | Link annotation (decision 4a)                     |
| Gemini 4 Argon                       | `fsf-v3-1`               | "April 2026" in the text and a link to v3.1       |
| OpenAI o1                            | `preparedness-beta-2023` | Reference [28], "(beta)", 2023                    |
| GPT-5.2-Codex                        | `preparedness-v2`        | Link annotation (decision 4a)                     |
| GPT-6 Luna (October 29)              | `preparedness-v2`        | Link annotation (decision 4a)                     |
| Grok 4.7                             | `faif-2026`              | Reference dated June 30, 2026                     |

The three link-annotation records say "identified by link annotation" in the evidence and the qualification, name the link target, and note that the cross-family check read and confirmed it. Each citation is dated as the citing card is dated.

## Dates (decisions 3a, 8a, 9a, 10a)

A card carries version metadata (`documentVersion`) only where it prints a date of its own, keeping kind and precision:

- **Printed publication date:** Claude Haiku 5.5, Gemini 3 Flash, Gemini 4 Argon, GPT-4V, GPT-5.2-Codex, GPT-6 Luna, Grok 4.1 (`publishedAt`).
- **Publication and revision, both shown:** Claude Opus 4.5 (cover 2025-11, changelog to 2025-12-05) and Grok 4.7 (2026-09-21, "Revision: 2026-09-21"). On the reused cards the two dates sit on the sources: o1 PDF 2024-12-05 and 2024-12-19, and the Claude 2 re-issue 2023-11-21.
- **Printed date of a later expression:** the CWM Preparedness Report (2025-10-08) and Muse Spark 1.3 (2026-10-23) are dated as `revisedAt`, with the `revision` basis. Both reports print a bare "Date:", and an earlier page links each one, so the copy read may be a revision. The first publication date is held (below).
- **No date of the card (8a):** Llama 2, Llama 3.3, Phi-2, Phi-4, Phi-4-mini-flash-reasoning, MAI-Cyber-1.1-Flash and the Claude 3.5 addendum have no version metadata, and their publication records have an unknown date. Commit dates stay in the sources' version notes.

## Quotation limits (12a)

Every quotation is a passage of the pack, quoted exactly. Part 1 quotes a few words from each card, well within the limits. Validation enforces the limits. The pack's budgets for Gemini 3 Flash (100 of 106 words) and MAI-Cyber-1.1-Flash (146 of 165) still apply to part 2. The words part 1 quotes from them, "Published: December 2025" and one Q13 sentence, are passages the pack already counted, so part 2 can reuse them without adding words.

## Passages and verification

All 31 evidence rows quote passages that the pack's verification matched in the retrieved card on 2026-11-02, and again on 2026-11-03 against a fresh retrieval with the same SHA-256. The one exception is the CWM report (one passage, its date line). On 2026-11-03 its recorded address answered HTTP 403, so the second verification had no cached text. The passage matched on 2026-11-02, and the cross-family check retrieved the original file again with the same SHA-256. The evidence note says so. Nothing was retrieved again and no passage was rewritten. Where a passage's cell was in the cross-family sample, the evidence names the item.

## Held, with reasons

- **The 320 cell records**, and with them release dates (Q02), determinations, safeguards and the other questions. They need card-facet identifiers outside the framework comparison's set: a schema change, so part 2 (a minor release).
- **Earliest-publication dates located outside the cards (3a).** The Claude 2 card (Anthropic's index, July 2023), the Claude 3.5 addendum (index, October 2024), the CWM report (Meta's publication page, 2025-09-24), Muse Spark 1.3 (Meta's announcement of 2026-09-02, which links the same address), Gemini 4 Argon (page header, 13 October 2026) and Gemini 3 Flash (index, 17 December 2025). These rest on index, publication or announcement pages that are not sources in the pack, and none of their passages was verified. Each card is dated as it prints its own date until those pages are retrieved and checked.
- **Framework links not made.** Claude Haiku 5.5 names the RSP without an edition, and also names the Frontier Compliance Framework (5a: held until read). Gemini 3 Flash names the FSF without an edition. The CWM report cites the Frontier AI Framework without a version. Muse Spark 1.3 cites Superintelligence Scaling Framework v2.1 and Grok 4.1 the Risk Management Framework of 2025-08-20; neither edition is in the dataset (5a: a separate data task).
- **Decision 13** (GPT-4V, question 15, item 69). Not decided; it goes to a Codex second pass. Part 1 admits no question-15 record, so nothing here depends on it.
- **Existing o1 evidence.** The AI-and-biosecurity records on the o1 card quote PDF pages but are attached to the web-page source `source-o1-card`. Moving them to the new PDF source would change existing evidence, which is beyond this part. Listed for part 2 or a correction.
- **Archive captures** for twelve cards: the check found none within 31 days of the target date, so none is recorded.

## Changed outside `data/`

- **Map layout (`src/ui/layout.ts`).** The family map's succession layout now leaves out a document of another family (or of none) that cites a family edition, the way it already leaves out a commitment text that an edition links itself to. Without this, the RSP family map lost its sequence once cards cited RSP v2.0 and v2.2. The test `src/ui/mapGrammar.test.ts` is unchanged and passes.
- **Frozen counts.** Scoped to leave out the `mc-` records, never by loosening a selector: `dossier.test.ts`, `query.test.ts`, `research-path.test.ts`, `versions.test.ts`, `transactions.test.ts`, and `tests/browser/dossier-count.ts`, which sets the `mc-` prefix aside.
- `docs/development.md` coverage block (regenerated by `pnpm docs:coverage`); `release/CHANGELOG.md` and `release/v0.26.4/` (by `pnpm release 0.26.4`).

## Checks

| Check                           | Result                                                                 |
| ------------------------------- | ---------------------------------------------------------------------- |
| `pnpm -s validate:data`         | Valid: 2,151 entities, 5,858 claims, 2,033 sources, 7,983 evidence     |
| `model-cards-admission --check` | Stored records match the pack and the map                              |
| `pnpm check`                    | Passed: format, lint, types, 920 unit tests (89 files), build, budgets |
| `pnpm check:privacy`            | Passed                                                                 |
| `pnpm release 0.26.4 --check`   | Reproduces byte for byte                                               |
| `pnpm docs:coverage`            | Coverage block updated                                                 |
| Browser suite                   | 322 passed, 3 failed on frozen counts; scoped and rerun: 8 passed      |

### Browser suite

Run once on Playwright's Chromium (cloud session; no Edge), from an untracked copy of `playwright.config.ts` without `channel: 'msedge'`, deleted afterwards and never committed. Port 4173 was free before and after. First full run: 322 passed, 3 failed (25.5 min). All three were frozen counts that now included `mc-` records: `cartography.spec.ts:215` (Anthropic's claims list, 68 for 64), `governance.spec.ts:3` (RSP family timeline) and `governance.spec.ts:107` (xAI family timeline, which gained the Grok 4.7 citation). Each expectation's scope now leaves out `mc-` records, as for earlier admissions; no selector was loosened. Rerun of the two spec files: 8 passed.

## Budgets

From `pnpm build` on this branch (gzip level 9, KB of 1,000 bytes). `dist/`: 11,852 files (budget 15,000).

| Page type         | Size     | Limit  |
| ----------------- | -------- | ------ |
| Start page        | 109.2 KB | 115 KB |
| Hub               | 232.0 KB | 295 KB |
| About & method    | 299.2 KB | 330 KB |
| Search            | 273.9 KB | 275 KB |
| Explorer          | 271.0 KB | 330 KB |
| Dossier           | 321.0 KB | 360 KB |
| Person            | 232.1 KB | 295 KB |
| Document          | 247.2 KB | 310 KB |
| Claim             | 277.5 KB | 325 KB |
| Collection        | 304.8 KB | 370 KB |
| Comparison        | 286.4 KB | 520 KB |
| Guide             | 326.6 KB | 630 KB |
| Compute guide     | 274.4 KB | 340 KB |
| Propositions      | 337.6 KB | 455 KB |
| Control timelines | 260.5 KB | 285 KB |
| By author         | 285.8 KB | 310 KB |
| By author index   | 229.1 KB | 250 KB |
| Year              | 348.8 KB | 400 KB |
| Years index       | 228.1 KB | 305 KB |

Search has 1.1 KB of headroom. Part 2's page and its cell text must load lazily and stay out of the shared search index (operating guide § Budgets).

## What part 2 needs

1. A schema change for card facets: sixteen question identifiers outside the framework comparison's set, the legend (stated / partly / not found / not applicable), and validation of one cell per card and question. Then a minor release.
2. The 320 cell records from `pack.json`, keyed to the document entities admitted here (map `cards.*.entity`). Paraphrase any further Gemini 3 Flash and MAI-Cyber-1.1-Flash passage (12a). Reuse the passages part 1 quotes, so they count once.
3. The GPT-4V Q15 cell under whatever the Codex second pass and the maintainer decide (13).
4. `src/reading/model-cards.ts`, the page (table, filter, list equivalent, sixteen question pages), the CSV, and the links between framework editions and cards. Search's budget is nearly full.
5. Before or alongside part 2: retrieve the index, publication and announcement pages held above, so 3a can date the six cards by their earliest located publication. Retrieve the xAI RMF and Meta SSF v2.1 editions (5a), and the cards on the retrieval list (11a).
6. Extend `scripts/model-cards-admission.ts` with `--part 2` and a part-2 map. Its before-snapshot goes first in the chain.
