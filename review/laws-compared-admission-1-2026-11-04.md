# Laws compared: admission, part 1 (2026-11-04)

Admission record for the first part of the laws-compared pack ([`research/laws-compared/`](../research/laws-compared/README.md), review note [`laws-compared-pack-2026-11-02.md`](laws-compared-pack-2026-11-02.md)). Branch `laws-compared-admission-1`, from `main` at `8f002ea` (v0.28.0, antecedent texts). Release **v0.28.1** (patch: one record within existing collections; no schema change and no new collection).

- **Prepared by:** Claude (drafting, same-family audit, adjudication). **Cross-family check:** OpenAI Codex, 2026-11-02, and its second pass of 2026-11-03. **Admitted by:** a Claude session.
- **Status:** every new record is a seed (`editorialState: seed`) with machine-checked evidence; no human review.
- **Mechanics:** one script, [`scripts/laws-compared-admission.ts`](../scripts/laws-compared-admission.ts) (`--part 1`, `--check`, `--base <commit>`), reading the authored map [`laws-compared-admission-1-map-2026-11-04.json`](laws-compared-admission-1-map-2026-11-04.json). It stops on an unknown map key, a pack row without a map entry, a document that is not a versioned document of the dataset, a source list that differs from the pack's, a standing record whose predicate, endpoints, date or stage differ from the map, a pack standing passage that is neither an evidence passage of a reused record nor held with its reason, a passage the pack's verification did not match, a computed date that differs from the pack's, and a map entry that changed or checked nothing. Before-snapshot [`laws-compared-admission-1-before-2026-11-04.json`](laws-compared-admission-1-before-2026-11-04.json), first in the chain in `src/editorial/historical-views.ts`.
- The pack and its review note were copied as files from `origin/laws-compared-apply-2` (not merged; an early commit on that line carried an absolute path).

## Decisions applied

From the review note's "Maintainer decisions" and [`decisions/answers-2026-11-03.md`](decisions/answers-2026-11-03.md):

| Decision                       | Answer                                                    | In part 1                                                                                                                                                              |
| ------------------------------ | --------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1. SB 53 quotation limit       | a (2026-11-03)                                            | No SB 53 quotation added. The pack's standing passage "APPROVED 2025-09-29" is held; the approval is the existing record `sb-enactment-2025-09-29`.                    |
| 2. The Code as a row           | a (2026-11-03)                                            | The Code's standing rests on the existing records `aia-art55-code-reliance`, `prov-eu-code-ss-adherence-not-conclusive` and `omni-art56-adequacy-assessment`.          |
| 3. New York, one row           | a (2026-11-03)                                            | Already possible: both chapters are versions of one document family, `ny-raise-act`. No schema change needed for this; the script checks it.                           |
| 4. Revoked and announced texts | a (2026-11-03)                                            | Existing records reused: `fl-us-eo14110-revoked` (EO 14148, 20 January 2025) and `fl-us-bis-ai-diffusion-rescission-announced` (stage `announced`, dated 13 May 2025). |
| 5. The four "partly" rules     | a (2026-11-03)                                            | Legend rules for part 2's cells; nothing in part 1 depends on them.                                                                                                    |
| 6. EO 14110, Q06               | a (Codex second pass agreeing)                            | A cell; part 2.                                                                                                                                                        |
| 7. Illinois                    | a (2026-11-03), then "laws without Illinois" (2026-11-04) | Not admitted (see "Held").                                                                                                                                             |
| 8. Chinese rows                | a (2026-11-03)                                            | Both measures' issue records reused.                                                                                                                                   |
| 9. New York Chapter 699 effect | a (2026-11-03)                                            | The effect rule is admitted with its date marked computed; no record says that the text took effect.                                                                   |
| 10. Jurisdictions not read     | a (2026-11-03)                                            | Nothing to admit.                                                                                                                                                      |

The maintainer's words on 2026-11-04, "laws without Illinois", admit the nine instruments; Illinois follows after a Claude check of its row against the act's saved text.

## What was admitted

On existing predicates only: 1 claim and 2 evidence rows added; 1 source changed. No entity added or changed.

**The nine instruments (already in the dataset).** Every row's documents, sources and versions exist; nothing is duplicated. The script checks each against the pack:

| Row                   | Documents                                                    | Standing records reused                                                                                       |
| --------------------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| EU AI Act             | `eu-ai-act-2024`, `eu-digital-omnibus-ai-2026`               | `aia-enacted`                                                                                                 |
| Code of Practice (SS) | `gpai-code-of-practice-2025`                                 | `aia-art55-code-reliance`, `prov-eu-code-ss-adherence-not-conclusive`, `omni-art56-adequacy-assessment`       |
| California SB 53      | `california-sb-53`                                           | `sb-enactment-2025-09-29`                                                                                     |
| New York Chapter 699  | `ny-raise-act-chapter-699-2025` (family `ny-raise-act`)      | `fl-us-ny-s6953b-signed-chapter-699`, `ny-chapter96-signed`                                                   |
| New York Chapter 96   | `new-york-raise-act-chapter-96-2026` (family `ny-raise-act`) | `ny-chapter96-signed`, `ny-ch96-effective-date`                                                               |
| China, generative AI  | `cn-generative-ai-interim-measures-2023`                     | `cn-genai-measures-issued`                                                                                    |
| China, labelling      | `cn-ai-content-labelling-measures-2025`                      | `fl-cn-labelling-issued`                                                                                      |
| EO 14110              | `us-eo-14110-2023`                                           | `fl-us-eo14110-revoked`                                                                                       |
| BIS rule              | `us-bis-ai-diffusion-ifr-2025`                               | `fl-us-bis-ai-diffusion-ifr-published`, `fl-us-bis-ai-diffusion-rescission-announced` (announced, not formal) |

Every standing passage of the pack (15 for these rows) is either already the evidence passage of one of these records or held with its reason (one, SB 53). The pack's BIS press-release source had no dataset link; it is the existing source `source-us-bis-diffusion-rescission-release-2025`, whose evidence already quotes both passages.

**New record (decision 9a).** `lc-ny-ch699-effect-computed`: section 3 of the bill signed as Chapter 699 of 2025 provides that the act takes effect on the ninetieth day after it becomes law; counted from the signature of 19 December 2025, that day is **19 March 2026 (computed)**. On `states_provision` with `provision.computed: true` (schema 2.19): derivation inferred, with its premises, dated `effective` by the computed day. Evidence: the pack's quotation of section 3 (p. 5, lines 32–33, 18 words, matched on 2026-11-01, 2026-11-02 and 2026-11-04; cross-family item 29 agreed, including the computation) and a paraphrase of the bill record's signing entry, the date the count starts from. The qualification says that the date is computed, that the record is not a finding that the text took effect, and that Chapter 96 amends this section 3 (`ny-ch96-effective-date`, 1 January 2027).

**Expression recorded.** `source-ny-s6953b-2025` gains, in its version note, the pack's retrieval of 2026-11-01 (SHA-256 `b0f5563f…`), whose bytes differ from the dataset's retrieval of 2026-10-27, and the later retrievals of 2026-11-02 and 2026-11-04, which served different bytes again while every quotation matched. It is the only source part 1 quotes.

**Dates.** Kinds and precision as stored; the one new date is marked computed. No record says that Chapter 699 took effect.

## Held, with reasons

- **Illinois (`il-aisma`).** Not admitted: "laws without Illinois" (2026-11-04). Its enacted text was not read by the preparer, fourteen cells are not retrieved and the Q02 quotation is the checker's, unmatched. The existing entity `il-ai-safety-measures-act` and its signature record are unchanged.
- **The 135 cell records** of the nine rows (130 once the five not-applicable cells are listed), with their law facets, statuses and searches. They need the schema change in the review note ("Schema needs"): part 2.
- **SB 53's standing quotation** "APPROVED 2025-09-29" (1a): the approval record is cited instead.
- **The findings and exclusions** (the United Kingdom, other US federal texts, GB 45438-2025, the Cybersecurity Law amendment). They belong to the page and the collection, not to the rows' standing; `uk-si-2026-425` and the Illinois sources have no dataset source yet.
- **Expressions of the other sources the pack read.** The EU texts (read through Cellar, not EUR-Lex), SB 53 (an archive member of the bulk file, not the web page), and the two Assembly records, whose bytes changed. Part 1 quotes none of them; part 2 records each expression when its cells quote it.

## Changed outside `data/`

- `src/editorial/historical-views.ts`: `preLawsCompared1Raw` first in the chain.
- `src/domain/transactions.test.ts`, `src/domain/versions.test.ts`: the part-1 records set aside with the others.
- `tests/browser/dossier-count.ts`: the `lc-` prefix set aside.
- `docs/development.md` coverage block (`pnpm docs:coverage`); `release/CHANGELOG.md` and `release/v0.28.1/` (`pnpm release 0.28.1`).

## Checks

| Check                                      | Result                                                                                                                                                                                                                                                                                                                                          |
| ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm -s validate:data`                    | Valid: 2,163 entities, 6,209 claims, 2,042 sources, 8,459 evidence                                                                                                                                                                                                                                                                              |
| `laws-compared-admission --part 1 --check` | Stored records match the pack and the map                                                                                                                                                                                                                                                                                                       |
| `pnpm check`                               | Passed: format, lint, types, 938 unit tests (90 files), build, budgets. Two earlier runs failed and were fixed: an unused import in the copied `research/laws-compared/make-sources.mjs` (lint), and record IDs in the new record's reader-facing text (`reader-text.test.ts`); the records and the release were then regenerated from the base |
| `pnpm check:privacy`                       | Passed                                                                                                                                                                                                                                                                                                                                          |
| `pnpm release 0.28.1 --check`              | Reproduces byte for byte                                                                                                                                                                                                                                                                                                                        |
| `pnpm docs:coverage`                       | Coverage block updated, then current                                                                                                                                                                                                                                                                                                            |
| Browser suite                              | 325 passed (26.2 min), no failure, so no frozen-count spec needed changing beyond the `lc-` prefix                                                                                                                                                                                                                                              |
| `git merge-tree` / `main`                  | `origin/main` still at `8f002ea` at the end; `model-cards-page` not merged, so no rebuild                                                                                                                                                                                                                                                       |

### Browser suite

Run once on Playwright's Chromium (cloud session; no Edge), from an untracked copy of `playwright.config.ts` without `channel: 'msedge'`, deleted afterwards and never committed. Port 4173 was free before and after.

## Budgets

From `pnpm build` on this branch (gzip level 9, KB of 1,000 bytes). `dist/`: 12,262 files (budget 15,000). No limit was raised.

| Page type         | Size     | Limit  |
| ----------------- | -------- | ------ |
| Start page        | 109.3 KB | 115 KB |
| Hub               | 231.5 KB | 295 KB |
| About & method    | 326.8 KB | 330 KB |
| Search            | 274.7 KB | 275 KB |
| Explorer          | 270.5 KB | 330 KB |
| Dossier           | 320.5 KB | 360 KB |
| Person            | 231.6 KB | 295 KB |
| Document          | 246.7 KB | 310 KB |
| Claim             | 279.0 KB | 325 KB |
| Collection        | 304.3 KB | 370 KB |
| Comparison        | 285.9 KB | 520 KB |
| Guide             | 326.4 KB | 630 KB |
| Compute guide     | 273.9 KB | 340 KB |
| Propositions      | 339.1 KB | 455 KB |
| Control timelines | 260.0 KB | 285 KB |
| By author         | 285.7 KB | 310 KB |
| By author index   | 228.6 KB | 250 KB |
| Year              | 349.9 KB | 400 KB |
| Years index       | 227.6 KB | 305 KB |

Search is unchanged at 274.7 of 275 KB: the one new record adds nothing measurable to the shared index. Part 2's cell text must stay out of it (operating guide § Budgets).

## What part 2 needs

1. The schema change (review note, "Schema needs"): law question set `L.Q01`–`L.Q15` beside the D-facets, provision kinds (`statement` for Q01, Q04, Q13 and Q15), instrument columns with a document family per row (New York's chapters already share `ny-raise-act`), groups and standing claim IDs per column, the per-cell paraphrase for SB 53 Q05 and Q06 (1a), and not-applicable lists. A minor release.
2. One claim per cell, keyed to the documents listed above, reusing admitted quotations and evidence where the pack marks `datasetClaim`. New York Chapter 699 Q11 cites `lc-ny-ch699-effect-computed` instead of a second record of the same rule.
3. The expressions of the EU, SB 53 and Assembly sources recorded as part 1 recorded the S6953-B print, before their cells quote them.
4. `src/reading/law-comparison.ts`, the page (lazy-loaded), one-question pages, list equivalent and CSV. Search is at its limit; keep cell text out of the shared index.
5. Illinois as a separate step after the Claude check of its row against the act's saved text and the cross-family comparison, then its own admission.
6. Extend `scripts/laws-compared-admission.ts` with `--part 2` and a part-2 map; its before-snapshot goes first in the chain.
