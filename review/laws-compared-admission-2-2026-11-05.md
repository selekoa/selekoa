# Laws compared: admission, part 2 (2026-11-05)

Admission record for the second part of the laws-compared pack ([`research/laws-compared/`](../research/laws-compared/README.md), review note [`laws-compared-pack-2026-11-02.md`](laws-compared-pack-2026-11-02.md); part 1 in [`laws-compared-admission-1-2026-11-04.md`](laws-compared-admission-1-2026-11-04.md)). Branch `laws-compared-admission-2`, from `main` at `2fcfdf0c` (v0.29.2). Release **v0.30.0** (minor: schema change and a new collection). `main` did not move during the work, so no rebuild was needed.

- **Prepared by:** Claude (drafting, same-family audit, adjudication). **Cross-family check:** OpenAI Codex, 2026-11-02, its second pass of 2026-11-03, and its blind reading of the Illinois act of 2026-11-04. **Admitted by:** a Claude session.
- **Status:** every new record is a seed (`editorialState: seed`) with machine-checked evidence; no human review.
- **Mechanics:** one script, [`scripts/laws-compared-admission.ts`](../scripts/laws-compared-admission.ts), now with `--part 2` (`--check`, `--base <commit>`), reading the authored map [`laws-compared-admission-2-map-2026-11-05.json`](laws-compared-admission-2-map-2026-11-05.json). It stops on: a pack row the map does not list, or a collection whose texts are not the pack's rows; a collection question or criterion that differs from `questions.json`, or a label that differs from the pack's; a held cell without a decision, or a decision on a cell that is not held; a passage its verification did not match (only the two Illinois Q10 rows from the checker's copy pass unmatched, and only as labelled paraphrases); a quotation or paraphrase over 50 words; a reused passage that is not on the earlier record it names; a cited record that is not the cell's rule; a not-applicable or cited cell the collection definition does not list, or one it lists that the pack does not have; a text without 15 cells; a source over its quotation limit; a text edit that does not apply; and any map entry that changed or checked nothing. Before-snapshot [`laws-compared-admission-2-before-2026-11-05.json`](laws-compared-admission-2-before-2026-11-05.json), first in the chain in `src/editorial/historical-views.ts`. `--part 2 --check` reproduces the stored records.
- The pack's research files and review note were copied as files from `origin/laws-compared-illinois` (not merged; an early commit on that line carried an absolute path), in the branch's first commit.

## Decisions applied

From [`decisions/laws-compared.md`](decisions/laws-compared.md), [`decisions/answers-2026-11-03.md`](decisions/answers-2026-11-03.md) and [`decisions/answers-2026-11-05.md`](decisions/answers-2026-11-05.md):

| Decision                       | Answer                      | Applied as                                                                                                                                                                                                                                                                                                                                                |
| ------------------------------ | --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1. SB 53 quotation limit       | a                           | SB 53 Q05 and Q06 rest on paraphrases with their sections, and Q10 on a paraphrase of the record's approval field (the dataset's record of the enactment quotes the printed line). Each cell is marked `paraphrased`. SB 53 stays at 393 of 400 quoted words. The same rule was applied where other sources reached their limit (see "Quotation limits"). |
| 2. The Code as a column        | a                           | Directly after the AI Act, headed "Compliance route, not binding"; its standing note says it is never counted among the laws.                                                                                                                                                                                                                             |
| 3. New York, one column        | a                           | One column, "New York RAISE Act", family `ny-raise-act`, the amended text (Chapter 96) by default; a version switch (`?edition=ny-raise-act-chapter-699-2025`) shows the text as signed. The header says the amended duties take effect on 1 January 2027.                                                                                                |
| 4. Revoked and announced texts | a                           | The last group, "Revoked, or rescission announced": EO 14110 ("Revoked by Executive Order 14148 (2025-01-20)") and the BIS rule ("Rescission announced on 2025-05-13; no formal rescission rule inspected"), each with its standing records linked.                                                                                                       |
| 5. The four "partly" rules     | a                           | In the legend, verbatim from `questions.json` (`partlyRules`); BIS Q03's note names the fourth rule.                                                                                                                                                                                                                                                      |
| 6. EO 14110 Q06                | a (second pass agreeing)    | Not found; Sec. 4.4(a)(i), including (A), is listed as read and set aside.                                                                                                                                                                                                                                                                                |
| 7. Illinois                    | a, then 2026-11-05 below    | A column, from the saved enacted text.                                                                                                                                                                                                                                                                                                                    |
| 8. Chinese columns             | a                           | Kept; Q01 quotes the defined party; the introduction and the group note say these measures address service providers.                                                                                                                                                                                                                                     |
| 9. New York Chapter 699 effect | a                           | Chapter 699's Q11 cites the part-1 record of the effect rule with its date marked computed; the page shows "Computed date". No record says that the text took effect.                                                                                                                                                                                     |
| 10. Jurisdictions not read     | a                           | "How we searched" lists Korea, Japan, China's deep-synthesis and recommendation provisions and Colorado SB 24-205 as not yet read; a later pack starts with Korea.                                                                                                                                                                                        |
| Illinois 1 (Q05)               | a (2026-11-05)              | Partly, as for SB 53's identical wording; the checker's reading (stated) is in the cell's note and its evidence note.                                                                                                                                                                                                                                     |
| Illinois 2 (Q02 exponent)      | a (2026-11-05)              | The quotation keeps "10 26" as the text layer gives it; the note gives the figure and the checker's "10²⁶".                                                                                                                                                                                                                                               |
| Illinois 3 (Q10 from the copy) | as recommended (2026-11-05) | The record could not be opened here either (web.archive.org reset the connection; ilga.gov failed certificate verification). Q10 rests on the checker's copy, as a source labelled as that copy, given in two paraphrases: the record's length is unknown, so its quotation limit cannot be computed, and the preparer never matched the rows.            |

## Schema 2.31

- **Law questions.** `L.Q01`–`L.Q15` with labels and provision kinds in `src/domain/law-questions.ts`, keys `comparison-law-q01`…; they cannot collide with the framework comparison's facets or the card questions (a test checks both). Kinds: `threshold` (Q02), `required_action` (Q03, Q05, Q06, Q08, Q09), `reporting` (Q07), `date` (Q10–Q12), `decision_authority` (Q14), `statement` (Q01, Q04, Q13, Q15); no new kind.
- **Law cells.** `states_provision` (status `stated` or `partly`) or `provision_not_found` on a versioned instrument text, named by the question's label, dated by a date of the text's version, one per text and question. Passages may come from any source the text is read with (the Digital Omnibus, the Assembly record, the BIS press release). A cell resting on a paraphrase carries `facet.paraphrased: true`, and only then.
- **Translations.** Evidence gains `translation`: Selekoa's working English translation beside a quotation in another language (26 Chinese quotations). Release **format 1.10** adds the field and its CSV column; earlier formats still reproduce.
- **Columns, groups, standing, cited cells, not applicable** are in the collection definition (`src/domain/law-comparison.ts`, `src/reading/laws-compared*.ts`).
- Law cells stay out of document histories, the frameworks-and-law page, commitments and question starters. Documented in `docs/dataset-format.md` and `docs/ontology.md`.

## What was admitted

**144 cell records** (84 stated, 28 partly, 32 not found) and 227 evidence rows: 186 quotations (26 with a translation, 1 as context for an absence), 9 paraphrases of verified passages or of the checker's copy, and 32 search-scope records. With the cited Chapter 699 Q11 record (stated) and five not-applicable cells, the ten texts have 150 cells, as in the pack (85 stated, 28 partly, 32 not found, 5 not applicable).

- **Stated and partly cells** use the pack's passages and notes. Notes were edited only where they named record IDs, pack files or the hold (13 exact replacements in 11 cells, map `textEdits`). A passage that an earlier record already quotes keeps that record's source and string, so it adds nothing to a quotation count; where the pack read a second copy of the same text (the Chinese measures' gov.cn copy), the evidence says so.
- **Not-found cells** are inferred, with the criterion, the sections read, the terms searched and every passage set aside as premises. EO 14110 Q11 also carries Executive Order 14148's revocation as context.
- **Not applicable (5):** Q04 for the AI Act, both Chinese measures, EO 14110 and the BIS rule, listed with reasons in the collection definition.
- **Cross-family coverage** is in each cell's first evidence note: the item, and whether the check agreed or its status was applied.
- **Illinois.** The existing document `il-ai-safety-measures-act` gains a version (family `il-public-act-104-0538`, approved 2026-07-06 according to the checker's copy, effective 2027-01-01 by Section 99), a fuller name and description, and two sources: `source-il-pa-104-0538` (the enacted text read in the saved copy, SHA-256 of the PDF recorded, labelled as the checker's session's extraction from the Internet Archive capture of 2026-09-08) and `source-il-sb315-bill-status` (labelled as the checker's copy). New entity: `illinois-general-assembly`. Its standing record is the existing `fl-us-il-ai-safety-measures-act-signed-stated` (Executive Order 2026-07).
- **Expressions recorded.** Seven sources gain, in their version note, the pack's retrieval and its SHA-256: the AI Act and the Digital Omnibus (read through Cellar), the Code's Safety and Security chapter, SB 53 (the database-file member), both New York Assembly records and the BIS press release. The S6953-B print was recorded in part 1; the other quoted sources already recorded the same bytes.

### Quotation limits

The pack's budgets counted a quotation contained in a longer admitted one as reused; the dataset counts every distinct string. Four sources then went over, and decision 1a's rule was applied to the fewest passages that bring each within its limit: AI Act Q09 (5 words), Chapter 96 Q13 and Q14 (14 words) and the BIS release's Q14 passage (15 words) are paraphrased, and their cells marked. The BIS release passage on the announced rescission matched an admitted quotation in other typography and keeps the admitted string. Tightest after admission: the AI Act 799 of 800, SB 53 393 of 400, Chapter 96 396 of 400, the S6953 Assembly record 15 of 15, Illinois 492 of 525.

## The collection and the page

"Laws compared" (`/compare/laws-compared`, kind `compare`, version 1) is registered as a release collection (v0.30.0 lists 18). Shared code reads its frame (`src/reading/laws-compared-frame.ts`); the reader text (`src/reading/laws-compared.ts`) loads only with the page; releases record it whole.

- **Table on the first screen:** questions as rows, instruments as columns, as the pack's page plan says, in four groups (European Union; United States: states; China; Revoked, or rescission announced). Each header names the instrument, its text (New York), its standing in words and links to its standing records. A cell opens below its row: status, passages with locators, "Paraphrase:" where paraphrased, "Working translation:" for Chinese quotations, the search for an absence, the reason where the question does not apply, a computed date marked as such, the note and the record.
- **Legend** with the four "partly" rules; **limits** (six); **How we searched** (inclusion rule, the United Kingdom and other US federal texts, the not-yet-read list of 10a, Illinois's retrieval, the routes to official copies, and the two families' roles).
- **One page per question** (`/compare/laws-compared/l-q01`…), listing every text, New York's two included; **list equivalent** of the table, text by text (both New York texts), keyboard-operable and present without JavaScript; **CSV** at `/compare/laws-compared.csv`, one row per text and question (150), with the framework comparison's columns plus `instrument_standing`, `translation` and `date_kind`.
- **390 px:** one question at a time, as on the other comparisons; the table scrolls in its own box.
- **Links in:** the governance hub (a tool entry after Model cards compared), Compare frameworks ("How laws treat the same questions"), and the frameworks-and-law page's related links.
- Reader text checked against `docs/style-guide.md` (banned words, em-dashes, internal terms): no match in the new reader-facing text.

## Changed outside `data/`

- New: `src/domain/law-questions.ts`, `law-comparison.ts`, `law-comparison-view.ts`, `law-comparison-csv.ts`, `law-comparison.test.ts`; `src/reading/laws-compared.ts`, `laws-compared-frame.ts`, `laws-compared-page.ts`; `src/ui/LawsCompared.tsx`, `laws-compared.css`; `tests/browser/laws-compared.spec.ts`.
- Schema and readers: `src/domain/schema.ts`; law cells kept out of `document-history.ts`, `frameworks-law.ts`, `commitments.ts`, `question-starter.ts`.
- Release: `src/release/format.ts` and `build.ts` (format 1.10), `collections.ts`, `whole-collections.ts`.
- Routing and pages: `src/domain/deep-links.ts`, `src/prerender/pages.ts`, `src/Workspace.tsx`, `src/ui/page-files.ts`, `page-modules.tsx`, `tools.tsx`, `Hub.tsx`, `FrameworkComparison.tsx`, `FrameworksLaw.tsx`, `scripts/comparison-csv.ts`, `src/site/machine-readable.ts`, `src/site/bundle-budget.ts` (a new page type, see "Budgets"), `src/prerender/hydration.test.ts`.
- Tests: `src/domain/transactions.test.ts`, `versions.test.ts` (part-2 records set aside); `src/editorial/historical-views.ts`.
- Docs: `docs/dataset-format.md`, `docs/ontology.md`, `docs/development.md` (coverage block, `pnpm docs:coverage`); `release/CHANGELOG.md`, `release/v0.30.0/`.
- `research/laws-compared/make-sources.mjs`: the unused import part 1 removed, which the copy brought back.
- No frozen-count browser spec needed a change: IDs use the `lc-` prefix that part 1 set aside in `tests/browser/dossier-count.ts`.

## Budgets

From `pnpm build` (gzip level 9, KB of 1,000 bytes). "Before" is the last measurement on `main` (`review/model-cards-admission-4-2026-11-05.md`, "After"); "After" is this branch's final `pnpm check` build.

| Page type         | Before (main) | After    | Limit  |
| ----------------- | ------------- | -------- | ------ |
| Start page        | 110.6 KB      | 111.2 KB | 115 KB |
| Hub               | 232.3 KB      | 234.1 KB | 295 KB |
| About & method    | 238.4 KB      | 240.2 KB | 330 KB |
| Search            | 256.1 KB      | 258.2 KB | 275 KB |
| Explorer          | 268.7 KB      | 270.5 KB | 330 KB |
| Dossier           | 322.6 KB      | 324.4 KB | 360 KB |
| Person            | 233.4 KB      | 235.3 KB | 295 KB |
| Document          | 246.4 KB      | 248.2 KB | 310 KB |
| Claim             | 282.6 KB      | 286.8 KB | 325 KB |
| Collection        | 295.6 KB      | 297.4 KB | 370 KB |
| Comparison        | 282.6 KB      | 284.6 KB | 520 KB |
| Model cards       | 325.8 KB      | 327.7 KB | 330 KB |
| Laws compared     | new           | 292.0 KB | 320 KB |
| Guide             | 326.3 KB      | 331.5 KB | 630 KB |
| Compute guide     | 272.6 KB      | 274.5 KB | 340 KB |
| Propositions      | 325.7 KB      | 327.6 KB | 455 KB |
| Control timelines | 258.2 KB      | 260.1 KB | 285 KB |
| By author         | 279.6 KB      | 281.4 KB | 310 KB |
| By author index   | 230.5 KB      | 232.3 KB | 250 KB |
| Year              | 349.6 KB      | 352.8 KB | 400 KB |
| Years index       | 229.6 KB      | 231.4 KB | 305 KB |

`dist/`: 12,775 files (budget 15,000). Every page is within its limit and no limit was raised. The largest growth against `main` is on the Guide (+5.2 KB) and Claim (+4.2 KB) pages, both well within their limits; it was not traced further. The start page grew by 0.6 KB (the law questions' identifiers and the page's address constants, which the hubs and the address resolver need), Search by 2.1 KB.

The new page type "Laws compared" was measured at 291.9 KB on its first build and given a limit of 320 KB, about 10% above, as "Model cards" was at v0.29.0; no existing limit was raised. The page first needed the whole relation core (the view looked up texts and standing records by fields the slice did not hold); it now carries IDs only, and no page needs the core. Cell text stays in the page's slice; the reader text loads with the page's own module.

## Checks

| Check                                          | Result                                                                                                                                                                                                                                                                                                                                                                       |
| ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm -s validate:data`                        | Valid: 2,176 entities, 6,599 claims, 2,058 sources, 8,973 evidence                                                                                                                                                                                                                                                                                                           |
| `laws-compared-admission --part 2 --check`     | Stored records match the pack and the map                                                                                                                                                                                                                                                                                                                                    |
| `pnpm check`                                   | Passed at `c26a5109`: format, lint, types, 966 unit tests (92 files), build, budgets. An earlier run failed on four unit tests that froze schema 2.30, quoted every provision from its own edition (law cells may quote a source they are read with) and used "whistleblower" as a rare search word; each was scoped as described in "Changed outside `data/`", not loosened |
| `pnpm check:privacy`                           | Passed (2,428 indexed files)                                                                                                                                                                                                                                                                                                                                                 |
| `pnpm release 0.30.0 --check`                  | Reproduces byte for byte                                                                                                                                                                                                                                                                                                                                                     |
| `pnpm docs:coverage`                           | Coverage block updated, then current                                                                                                                                                                                                                                                                                                                                         |
| Browser suite                                  | 346 passed, 0 failed (27.2 min), Playwright's Chromium, at `c26a5109` (see below)                                                                                                                                                                                                                                                                                            |
| New spec `tests/browser/laws-compared.spec.ts` | 11 passed: table and groups from the governance hub, cell (quotation, paraphrase, translation, search, reason, drawer), New York version switch in the address, legend and How we searched, list equivalent by keyboard, question pages, CSV (150 rows), links from Compare frameworks and the frameworks-and-law page, 1440 and 390 px with axe, without JavaScript         |
| Built app, 1440 and 390 px                     | Opened `/compare/laws-compared`, a question page and the 2025 New York text; no horizontal scroll; the console showed only the analytics beacon's cross-origin errors on the local preview, no page error. Screenshots kept outside the repository                                                                                                                           |
| `main`                                         | Still at `2fcfdf0c`; no merge or rebuild needed                                                                                                                                                                                                                                                                                                                              |

### Browser suite

Run on Playwright's Chromium (cloud session; no Edge), from an untracked copy of `playwright.config.ts` without `channel: 'msedge'`, deleted afterwards and never committed. Port 4173 was free before and after (no listener). A first full run (345 passed, 1 failed) used a `dist/` built before the release was cut, so About & method named v0.29.2; after `pnpm check` rebuilt it, the full run passed.

## Open interface choices

1. **Paraphrase on three more sources.** Decision 1a named SB 53; the same rule was applied to four passages on the AI Act, Chapter 96 and the BIS release that would otherwise pass those sources' limits. _Recommendation:_ keep; the alternative is dropping other quotations elsewhere in the dataset. **Quick: OK the recommendation.**
2. **New York on the question pages and in the list.** Both texts are listed (ten entries); the table shows one with the switch. _Recommendation:_ keep, so a question page answers for both texts. **Quick: OK the recommendation.**
3. **Start page.** The page is on the governance hub, Compare frameworks and the frameworks-and-law page, not in the start page's "Ways in" panel (as with Model cards compared). _Recommendation:_ leave the start page as it is. **Quick: OK the recommendation.**
4. **Budget for the new page type** (320 KB, about 10% above its first weight). **Quick: OK the recommendation.**
5. **Illinois approval date.** The version's date of issue (2026-07-06) and every Illinois cell's date rest on the checker's copy of the bill status record. A session that can open the capture could replace the copy with a matched quotation. **Needs your judgement** only if the copy is not acceptable as the version date; otherwise quick.
