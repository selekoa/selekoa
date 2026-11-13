# Audit corrections and model cards, part 5 (2026-11-10)

One data release that applies the adjudicated corrections of the blind audit of 2026-11-09 and admits model-cards packs 4 and 5 (part 5 of the model-cards admission). Release **v0.33.0**. Branch `audit-corrections-and-model-cards-5` from `origin/main` at `d402db7` (v0.32.1 plus interface changes); no other data branch was open. Every record changed or added is a seed; machine agreement is not human review.

- **Answers:** "H2b; rest as recommended. go." (2026-11-10), recorded in [`decisions/answers-2026-11-10.md`](decisions/answers-2026-11-10.md): H1 a, H2 b, H3 a, H4 and H5 as recommended; packs 4–5 decisions A a and B a.
- **Inputs, copied unchanged (not merged):** from `audit-2026-11-09-adjudication`, [`audit-2026-11-09-adjudication.md`](audit-2026-11-09-adjudication.md), [`audit-2026-11-09-correction-map.json`](audit-2026-11-09-correction-map.json) (172 entries), [`audit-sample-2026-11-09.md`](audit-sample-2026-11-09.md) and `.json`, `research/citable-copies-2026-11-09/` and the two `.prettierignore` lines that keep the audit files byte for byte; from `model-cards-packs-4-5`, `research/model-cards-4/`, `research/model-cards-5/` and [`model-cards-packs-4-5-2026-11-07.md`](model-cards-packs-4-5-2026-11-07.md).
- **Roles.** Audit and citable-copies reads: Codex (GPT family, the checking family). Adjudication of the audit and of the packs' check: a Claude session (the preparing family). Packs 4 and 5: prepared by Claude, checked by Codex. This application: a Claude session. Nothing was re-read from the sources here; every change rests on the stored readings named in the inputs.

## Release version: why minor

The task expected a patch. It is a **minor** release because it needs a schema change. The correction map's P1 entries (agreed) date law cells and provision records by a version's date of issue with the kind `signature`, and answer H2 b removes the kind from the labelling notice's 22 records. Schema 2.33 allowed a law cell dated by a version's `publishedAt` only with the kind `publication`, and required every provision record to carry a kind: applied as written, the map left 79 records invalid (72 law cells, 7 provision records). Schema **2.34** lets that date carry the kind `signature` or none (`src/domain/schema.ts`; [`dataset-format.md`](../docs/dataset-format.md), [`ontology.md`](../docs/ontology.md) § Law cells). No field, file or column changes, so the release format stays 1.10. The alternative, holding P1 and H2, would have left 92 agreed or answered entries unapplied. The rows added to model cards and the collection versions raised would on their own have made a patch.

## 1. Audit corrections

**Script:** [`scripts/audit-corrections-2026-11-10.ts`](../scripts/audit-corrections-2026-11-10.ts) (`--check`, `--base`) reads the correction map and the answers map [`audit-corrections-2026-11-10-map.json`](audit-corrections-2026-11-10-map.json), which says which held entries apply and adds the entries the answers call for. Every `set` entry's `old` value must equal the stored value before it is set (or the field must be absent, for `oldAbsent`; entries marked `oldAfterEarlierEntry` are matched against the earlier entry's new value); every entry must change its record; added evidence must be listed by its claim and removed evidence by none. **Snapshot:** [`audit-corrections-2026-11-10-before-2026-11-10.json`](audit-corrections-2026-11-10-before-2026-11-10.json) (with the two removed evidence rows and the earlier evidence order), second in the chain in `src/editorial/historical-views.ts` (`preAuditCorrections1110Raw`).

**Every `old` value matched main.** No entry stopped: all 145 map entries applied (133 agreed, 3 M3-held, 3 P5-held, 6 P6-held) found their stored value as the map gives it. 27 map entries are not applied by the answers: F5 (4) and F5-consequence (1) under H1 a, and P1-held (22) under H2 b, replaced by 22 entries that remove the basis. Four entries were added that the map did not have:

- **H1 a, the checker's reading noted:** the PBoC FinTech plan's qualification gains a sentence that the audit read it as context and the maintainer kept it contesting.
- **H3 a, two fields the map missed:** Turing's predicted event (`attributes.prediction.event.text`) and record name (`object.value`) repeat the quotation; validation requires the event to lie in the quoted passage, so both follow the offprint's “per cent.” The two values were resolved from the corrected passage, which is the offprint's wording as the checker read it in the page image; “10⁹” in them is the NFKC equivalent of the transcription's “109”.
- **H3 a, evidence note:** the passage's evidence note says the transcription lacks the full stop, as option a states.

Totals: 171 entries; added 6 evidence rows; changed 109 claims, 8 evidence rows, 3 sources and 1 entity; removed 2 evidence rows (the absence evidence of New York Chapter 96 Q09 and China generative AI Q03, replaced by passages).

### By collection and pattern

| Collection                          | Records | Entries | What changed                                                                                                                                                                                                                                                                                                                                                                                                                |
| ----------------------------------- | ------: | ------: | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Laws compared                       |      82 |      96 | F1: New York Chapter 96 Q09 stated (paraphrase; the office's mechanism for reporting critical safety incidents). F6: China generative AI measures Q03 partly, with three quotations. M1, M2: AI Act Q02 “10²⁵” and BIS Q02 “10²⁶ or more ‘operations’”. P1: 58 cells dated as `signature` (New York Chapter 96 15, Chapter 699 14, Illinois 15, China generative AI 14). H2 b: 14 labelling-measures cells without a basis. |
| Frameworks and law                  |      20 |      20 | P1: 9 provision records and 3 other records of the generative AI measures (issue, scope, security assessment) as `signature`. H2 b: 8 labelling-notice records without a basis.                                                                                                                                                                                                                                             |
| Predictions                         |       9 |      25 | F2, P5: Legg 2010 and 2011, horizon absolute, the mean and mode in a horizon note, no probability or points. P5-held (H4): Legg 2009 keeps its quantile region; mode and expected value as points without probability. M3, M3-held, H3 a: Turing's two records cite printed p. 442 (scan 10); “10⁹” and “per cent.”. M4: de Garis cites p. 20.                                                                              |
| AI and money                        |      10 |      22 | F3: both FSiF records in the committee's voice, each with the page's sentence as context. F4: Brainard (2018) re-filed as context; Proudman (2019) holds J12's earliest located headline. F7, P6-held (H5): ECB lab, BoE AI Consortium and Aurora's new phase as `status_stated`. H1 a: PBoC note.                                                                                                                          |
| Citable copies (W02, B1, W10, Good) |       8 |       8 | C1–C4: the source, evidence and record notes of Moravec 1989, Bostrom 2014, the Analog re-check reason and Good 1965.                                                                                                                                                                                                                                                                                                       |

Records are counted once per collection, 129 in all (121 changed, 6 added and 2 removed rows).

**Collection pages.** AI and money version 3: the J12 correction note (Brainard to Proudman, recorded 2026-11-10, reason F4); the three events listed as under way; a sentence in "How we searched" on the audit and its corrections. Laws compared version 2: a sentence in "How we searched" on the corrected cells; China generative AI Q04's not-applicable reason says Q03 finds risk measures but no written document. Predictions version 2: a sentence in "How we searched". The laws-compared counts and columns follow the cells.

### Held items as answered

| Item | Answer         | Applied                                                                                                       |
| ---- | -------------- | ------------------------------------------------------------------------------------------------------------- |
| H1   | a              | PBoC FinTech plan (2019) stays contesting and earliest located contesting on J12; F5 not applied; note added. |
| H2   | b              | 22 labelling-notice records: basis removed, time notes kept; CSV date kind blank. Needs schema 2.34.          |
| H3   | a              | Turing: “per cent.” as the offprint prints it, in passage, statement, event and name; notes say so.           |
| H4   | as recommended | Legg 2009: quantile for the credibility region; mode and expected value without probability, in the note.     |
| H5   | as recommended | BoE AI Consortium (2024), Aurora's new phase (2025): stated as being launched; listed as under way.           |

Not changed, as the adjudication records: the eight cannot-check items, the Illinois Q02 “10 26” (decision of 2026-11-05) and the five texts' `documentVersion.publishedAt`.

## 2. Model cards, part 5

**Script:** [`scripts/model-cards-admission.ts`](../scripts/model-cards-admission.ts) `--part 5`, reading the authored map [`model-cards-admission-5-map-2026-11-10.json`](model-cards-admission-5-map-2026-11-10.json). New in the script: it reads two packs as one (their cards, sources, cells and verified quotations), the check's items keyed by cell with a severity, a card dated only by its version's printed date (Claude Sonnet 4.5), the map's `findingText`, `emptyNote` and `corrections` (each checked against its old value). The part-3 and part-4 checks still apply, including that every map entry changed a record. **Snapshot:** [`model-cards-admission-5-before-2026-11-10.json`](model-cards-admission-5-before-2026-11-10.json), first in the chain (`preModelCards5Raw`). `--part 5 --check` reproduces the stored records.

Added 15 entities, 282 claims, 15 sources and 309 evidence rows; changed 1 claim (decision B).

### The sixteen cards

| Card                             | Document                                     | Dated                                       | Edition cited                                  |
| -------------------------------- | -------------------------------------------- | ------------------------------------------- | ---------------------------------------------- |
| Claude Opus 4.1 (addendum)       | `claude-opus-4-1-system-card-addendum` (new) | August 2025, revised 2025-09-15             | none (RSP named, no edition)                   |
| Claude Sonnet 4.5                | `claude-sonnet-4-5-system-card` (existing)   | September 2025 (record unchanged)           | `rsp-v2-2`, link annotation in §9.1 (4a)       |
| Claude Haiku 4.5                 | `claude-haiku-4-5-system-card` (new)         | October 2025                                | `rsp-v2-2`, link annotation (4a)               |
| Claude Opus 4.6                  | `claude-opus-4-6-system-card` (new)          | February 2026, revised 2026-03-06           | `rsp-v2-2`, link annotation, PDF p. 13 (4a)    |
| Gemini 2.5 Pro                   | `gemini-2-5-pro-model-card` (new)            | updated 2025-06-27 (revision only)          | `fsf-v2-0`, month in text and link annotation  |
| Gemini 2.5 Flash-Lite            | `gemini-2-5-flash-lite-model-card` (new)     | expression of 2025-09-26 (earlier: July)    | `fsf-v2-0`, link annotation (4a)               |
| Gemini 2.5 Deep Think            | `gemini-2-5-deep-think-model-card` (new)     | 2025-08-01 (“published/updated”)            | `fsf-v2-0`, month in text and link annotation  |
| Gemini 2.5 Flash                 | `gemini-2-5-flash-model-card` (new)          | expression of December 2025 (earlier: Aug.) | `fsf-v2-0`, link annotation (4a)               |
| Muse Glimmer                     | `muse-glimmer-model-card` (new)              | no date of its own                          | none (framework named without edition)         |
| Muse Wonder and Muse Wonder Full | `muse-wonder-model-card` (new)               | expression with update note of 2026-10-23   | none (Superintelligence Scaling Framework, 5a) |
| Muse Spark Open                  | `muse-spark-open-model-card` (new)           | no date of its own                          | none (Superintelligence Scaling Framework, 5a) |
| o3-mini                          | `o3-mini-system-card` (new)                  | 2025-01-31                                  | `preparedness-beta-2023`, reference [20]       |
| Deep research                    | `deep-research-system-card` (new)            | 2025-02-25 (copy read has a July 2025 note) | `preparedness-beta-2023`, reference [3]        |
| GPT-4.5                          | `gpt-4-5-system-card` (new)                  | 2025-02-27                                  | none (framework named without edition)         |
| o3 and o4-mini                   | `o3-o4-mini-system-card` (new)               | 2025-04-16                                  | `preparedness-v2`, “Version 2” in text         |
| Grok 4.6                         | `grok-4-6-model-card` (new)                  | 2026-08-12, revised 2026-08-17              | `faif-2026`, reference 29                      |

**Dates.** A card is dated as it prints its own date (decision 3a); where the copy read is a later expression than the earliest located, it keeps its own date and the version's note names the earlier one. Gemini 2.5 Flash-Lite and Flash were read in later expressions; their earlier captures (July and August 2025), read by Codex on 2026-11-04, are not sources here, so the documents carry the dates of the expressions read as revisions. Gemini 2.5 Pro prints an update date only. Deep research's July note prints no year, so no revision date is recorded. The Hugging Face READMEs of Muse Glimmer and Muse Spark Open print no card date (decision 8a). Claude Sonnet 4.5's document, source and publication record are used unchanged (the same SHA-256); its cells are dated September 2025, its version's printed month.

**Cells (256).** 141 stated, 62 partly, 53 not found, as the adjudicated packs. 226 quotations, each a passage the packs' verification matched (2026-11-06, and again on 2026-11-09 against a fresh retrieval with the same SHA-256). Evidence notes give the cross-family item where the cell was sampled (88 items) and whether the check agreed or its finding was adjudicated on 2026-11-09. 36 recorded absences that the packs left without a note take the sentence the third pack used, “No passage meeting the criterion was found in the recorded search.” (map `emptyNote`). Six Q01 notes were edited to drop pack-internal wording (“the population”, “the inventory”), naming the reading instead (map `noteEdits`).

**Decisions.** A a: Grok 4.6 Q09 partly, with the earlier-checkpoint scope in its note and “Maintainer decision A of 2026-11-10.” B a: Gemini 3 Flash Q05 (admitted on 2026-11-04) re-read as partly: its statement, status and qualification change, and the qualification says why and that the 2026-11-03 check had read it stated. The edition of Claude Sonnet 4.5 is recorded by link annotation (`rsp-v2-2`, 4a), and the Meta Superintelligence Scaling Framework gets no identifier (5a).

**Quotation limits.** Every source within its limit: Claude Sonnet 4.5 278 of 800 words with its existing quotations; the others 94–270 of 400 to 800.

**The collection.** `src/reading/model-cards-frame.ts`: sixteen rows in the page's order (developers alphabetically, then by the card's earliest located date): Opus 4.1, Sonnet 4.5 and Haiku 4.5 after Claude Opus 4 & Sonnet 4, Opus 4.6 after Opus 4.5; the four Gemini 2.5 cards after Gemini 2.0 Flash; Muse Glimmer, Muse Wonder and Muse Spark Open before Muse Spark 1.3; o3-mini, deep research, GPT-4.5 and o3 and o4-mini after Operator; Grok 4.6 after Grok 4.20. Frame version 3 → 4; 50 rows. "How we searched" gains a paragraph on the batch and one on its cross-family check (Claude prepared, Codex checked: 64 cells blind, 24 direct, 168 not cross-family checked; five status changes; Grok 4.6 Q09 and Gemini 3 Flash Q05 by the maintainer's decisions); the paragraph on documents retrieved later now counts Muse Spark Open as a row.

## Changed outside `data/`

- Scripts and maps: `scripts/audit-corrections-2026-11-10.ts`, `review/audit-corrections-2026-11-10-map.json`; `scripts/model-cards-admission.ts` (part 5), `review/model-cards-admission-5-map-2026-11-10.json`; the two snapshots; this record; `review/decisions/answers-2026-11-10.md`.
- Schema 2.34: `src/domain/schema.ts`, `docs/dataset-format.md`, `docs/ontology.md`.
- Collections: `src/reading/ai-and-money.ts`, `proposition-frames.ts` (AI and money version 3), `laws-compared.ts`, `laws-compared-frame.ts` (version 2), `predictions.ts`, `predictions-frame.ts` (version 2), `model-cards.ts`, `model-cards-frame.ts` (version 4).
- `src/editorial/historical-views.ts` (both snapshots first in the chain).
- Tests: `transactions.test.ts`, `versions.test.ts` (both snapshots' claims set aside; part 5's RSP citations in the frozen RSP-family count), `research-path.test.ts`, `model-cards.test.ts` (packs 4 and 5; decision B), `law-comparison.test.ts` (F1 and F6 statuses; New York Chapter 96 Q09 paraphrased).
- `src/ui/FrameworkComparison.tsx` (an edition's citing cards by count beyond two); browser specs `ai-and-money`, `model-cards`, `explorer`.
- `release/removals.json` (the two replaced evidence rows); `review/essay-starter-gaps.md` (regenerated); `src/domain/framework-provisions.test.ts` (schema 2.34).
- `docs/backlog.md` (D29 added; no existing line was completed by this release); `docs/development.md` coverage block (`pnpm docs:coverage`); `release/CHANGELOG.md`, `release/v0.33.0/`.

## Checks

| Check                                    | Result                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `audit-corrections-2026-11-10 --check`   | Stored records match the maps (run before part 5 was applied; afterwards the stored data includes part 5's rows, so only the chain test reproduces its snapshot)                                                                                                                                                                                                                                                         |
| `model-cards-admission --part 5 --check` | Stored records match the pack and the map (also after the final build)                                                                                                                                                                                                                                                                                                                                                   |
| `pnpm -s validate:data`                  | Valid: 2,353 entities, 7,170 claims, 2,228 sources, 9,842 evidence                                                                                                                                                                                                                                                                                                                                                       |
| `pnpm check`                             | Passed on the final code: format, lint, types, 1,005 unit tests (94 files), build with budgets. Earlier full runs failed on five tests, all fixed: two released evidence rows without a removal reason (`release/removals.json`), `review/essay-starter-gaps.md` not regenerated (`pnpm question:gaps`), the schema version frozen in `framework-provisions.test.ts`, and the coverage block before `pnpm docs:coverage` |
| `pnpm check:privacy`                     | Passed before every push (2,710 indexed files at the release)                                                                                                                                                                                                                                                                                                                                                            |
| `pnpm release 0.33.0 --check`            | Reproduces byte for byte (also after the final build)                                                                                                                                                                                                                                                                                                                                                                    |
| `pnpm docs:coverage`                     | Coverage block updated at the release, then current                                                                                                                                                                                                                                                                                                                                                                      |
| Browser suite                            | 367 passed (21.7 min) on the final build, on Playwright's Chromium through an untracked copy of `playwright.config.ts` without the Edge channel, deleted afterwards; port 4173 free before and after. The first run (363 passed, 4 failed) is described below                                                                                                                                                            |

**First browser run.** Four failures: two counts frozen before this release (`ai-and-money.spec.ts`, now six events stated as under way; `model-cards.spec.ts`, now eight Google DeepMind rows); the About heading list in `explorer.spec.ts`, which lacked “Where else to look” added on `main` by #174 (it fails on `main` too); and `framework-comparison.spec.ts` at 1280×800, where the new citations (o3 and o4-mini, Grok 4.6) lengthened two column headings and pushed the first question 30 px below the screen. The fix is in the interface, not the spec: an edition cited by more than two model cards now names their count (“Cited by 3 model cards”, one link to the developer's cards) instead of every title (`src/ui/FrameworkComparison.tsx`). The spec's threshold is unchanged. This is an interface change in a data branch, small and forced by the data; say if you prefer another form.

## Budgets

From `pnpm build` (`scripts/bundle-budget.ts`, gzip level 9, KB of 1,000 bytes), in the final `pnpm check`. “v0.32.1” is the last recorded measurement (`recheck-and-reads-2026-11-07.md`, Budgets), before the interface changes merged since. No limit was raised; every page type is within its limit. The Model cards page loads its cells' text after the table (`cellTextPath`, already on `main`), so sixteen more rows took it from 262.5 KB to 269.7 KB of 330 KB. `dist/`: 13,704 files (budget 15,000); 9,531 pages pre-rendered.

| Page type         | v0.32.1  | This branch | Limit  |
| ----------------- | -------- | ----------- | ------ |
| Start page        | 112.3 KB | 112.5 KB    | 115 KB |
| Hub               | 237.1 KB | 237.3 KB    | 295 KB |
| About & method    | 243.2 KB | 244.1 KB    | 330 KB |
| Search            | 262.2 KB | 262.6 KB    | 275 KB |
| Explorer          | 276.6 KB | 276.8 KB    | 330 KB |
| Dossier           | 327.8 KB | 329.0 KB    | 360 KB |
| Person            | 238.2 KB | 238.5 KB    | 295 KB |
| Document          | 251.2 KB | 251.4 KB    | 310 KB |
| Claim             | 289.0 KB | 290.8 KB    | 325 KB |
| Collection        | 300.4 KB | 300.6 KB    | 370 KB |
| Comparison        | 287.5 KB | 288.0 KB    | 520 KB |
| Model cards       | 262.5 KB | 269.7 KB    | 330 KB |
| Laws compared     | 294.9 KB | 295.7 KB    | 320 KB |
| Predictions       | 252.4 KB | 252.8 KB    | 275 KB |
| Guide             | 335.1 KB | 335.3 KB    | 630 KB |
| Compute guide     | 277.9 KB | 278.1 KB    | 340 KB |
| Propositions      | 331.2 KB | 331.4 KB    | 455 KB |
| Control timelines | 263.0 KB | 263.2 KB    | 285 KB |
| By author         | 284.2 KB | 284.4 KB    | 310 KB |
| By author index   | 235.3 KB | 235.5 KB    | 250 KB |
| Year              | 366.4 KB | 370.8 KB    | 400 KB |
| Years index       | 234.4 KB | 234.6 KB    | 305 KB |

## For the maintainer

- **Schema 2.34 and a minor release** (above): the P1 and H2 b dates needed it. If you prefer to hold P1 and H2 instead, the release can be cut again as a patch without them.
- **One interface change** in this data branch: Compare frameworks names an edition's citing model cards by count when there are more than two (Checks, first browser run).
- Carried, unchanged: the eight cannot-check items and the Michie, Vinge and Analog reads (next Codex brief with library access); PaliGemma and Grok-1 (pack 3 holds).

## Next step

Review and pull request by the planning thread; merge on the maintainer's word.
