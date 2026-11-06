# Antecedent texts: admission, 2026-11-04

Admission of the candidate pack [`research/prehistory/`](../research/prehistory/scope.md) as the collection "Antecedent texts: machine intelligence before 1965" (`#/propositions/antecedent-texts`), following the [admission plan](prehistory-admission-plan-2026-11-04.md) and the [review note](prehistory-pack-2026-11-02.md). Release **v0.28.0** (minor: a new collection). Every record is a seed; machine agreement is not human review.

- **Branch:** `prehistory-admission`, chained on `model-cards-admission-2` (not yet merged to `main`), as the heterodox, crane and lab-genealogy-2 chain was on 2026-11-01.
- **Chain base:** `origin/model-cards-admission-2` at `af6727ae` ("Release v0.27.0: model cards compared, cells (schema 2.30)"), recorded as `baseCommit` in [`prehistory-admission-before-2026-11-04.json`](prehistory-admission-before-2026-11-04.json). `origin/main` at `9f8dded4` is merged.
- **Rebuilds:** the branch was cut from `566e6fdb`; the data was first written there, then `model-cards-admission-2` cut v0.27.0 (`af6727ae`), so the data files were reset, the branch merged it and the script rebuilt the snapshot on it with `--base origin/model-cards-admission-2` (stored `baseCommit` `af6727ae`). Later moves of that branch (`9a44d391`, final `fa3958f2`) and of `main` (`9f8dded4`, PR #156) changed no file under `data/`, `release/` or `src/`, so they were merged (`c097b833`) without a rebuild; v0.28.0 was cut once and reproduces on the final merge.
- **Copied file formatted:** `research/prehistory/cross-family-check-2026-11-03.md`, byte-identical to `codex/prehistory-check-2` (`5cad926`), failed `prettier --check`; it was formatted (table padding in 8 lines, no text change) so that `pnpm check` passes.
- **Script:** [`scripts/prehistory-admission.ts`](../scripts/prehistory-admission.ts) (`--verify`, `--check`, `--base`) makes every data change from [`prehistory-admission-map-2026-11-04.json`](prehistory-admission-map-2026-11-04.json). It fails if any map entry, held record, text replacement or stored-record change changes nothing.
- **Snapshot:** first in the chain in `src/editorial/historical-views.ts` (`prePrehistoryRaw`); `transactions.test.ts` and `versions.test.ts` updated.

## Decisions applied

| Decision | Applied as                                                                                                                                                                                                                          |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1a       | U01 and U02 in the new collection. The 1965 boundary stays; the introduction says it is an editorial boundary and why Good's paper of 1965 set it (the maintainer's note of 2026-11-03).                                            |
| 2a       | Erewhon on W04 as context.                                                                                                                                                                                                          |
| 3b       | U03 (`technological-singularity`) for machine intelligence only, with no name role. Vinge 1983 is earliest located; Ulam 1958 is held (below).                                                                                      |
| 4a       | W01's earliest located contesting text: "Lucubratio Ebria" (1865-07-29), OCR-only qualification. Lanier 2000 keeps `contesting` only.                                                                                               |
| 5a       | C1 headline: Jefferson (1949-06-25, claimed 1949-06-09) replaces Weizenbaum (1966-01); Descartes (1637) as context. Weizenbaum's roles become `articulation` and the last sentence of its qualification (on earliest located) goes. |
| 6a       | Wiener's _Cybernetics_ on M06a, tier 2, `1948 · wording attested 2019`; M06a's tier-1 (Buckingham) and tier-2 (Diebold) headlines unchanged.                                                                                        |
| 7a       | The _R.U.R._ Robots count as machines throughout, labelled fiction (W01, B6, U02).                                                                                                                                                  |
| 8a       | Turing 1950 on U02 as context.                                                                                                                                                                                                      |
| 9a       | Samuel 1960 held (abstract only).                                                                                                                                                                                                   |
| 10a      | The text is recorded on the dated NPL report (1948); the typescript AMT/C/11 is the report's second source, not a separate document.                                                                                                |
| 11a      | Kolmogorov's letter on U02, `1961 · wording attested 2023`; printed theses on the library list.                                                                                                                                     |
| 12a      | U02 headline: Butler 1863 (satirical). The two dated lines (earliest located novel, Erewhon 1872; earliest located non-fiction text, Turing 1947-02-20) are in the search note's scope until the interface follow-up lands.         |
| 13a      | The texts the first check found (Butler 1863 on U02, Descartes 1637, Jefferson 1949, Hartree 1949, the NPL report of 1948) were drafted and given a second, bounded cross-family check before admission; they are admitted here.    |

**Answers of 2026-11-04 (afternoon), "prehistory points as recommended"** (also in [`decisions/answers-2026-11-03.md`](decisions/answers-2026-11-03.md), with "laws without Illinois" for laws compared):

1. C1's criterion gains the sentence: "A text that holds that a machine would fail a behavioural test, and that the test therefore reliably tells machines from people, does not meet the criterion, even where it says that narrower performances would not show understanding." Re-read below.
2. The superintelligence and economics titles stay. Questions: superintelligence "…from 1863 to 2025, and one earlier text, of 1637, recorded on C1 as context, …"; economics "…from 1952 to 2026, and one earlier text, Wiener's _Cybernetics_ (1948, wording attested 2019), recorded on M06a, …". Search notes: a sentence in each scope, a venue in superintelligence, and the gap on searches before 1863 notes Descartes. Both records would fall before their axis, so both axes are widened: superintelligence 1630–2025 (ticks 1637, 1863, 1950, 2000, 2022; it had used the default 1860–2025), economics 1945–2026 (ticks 1948, 1966, 1984, 2000, 2015, 2024).

## C1 re-read against the clarified criterion

| Record                           | Stance       | Result                                                                                                                                                                       |
| -------------------------------- | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ts-c1-turing-1950-context`      | context      | Unchanged: a machine hiding its arithmetic in the game; it does not hold a test reliable.                                                                                    |
| `ts-c1-weizenbaum-1966`          | articulation | Unchanged stance (role change from 5a only): the illusion of being understood.                                                                                               |
| `ts-c1-michie-1968`              | articulation | Unchanged: apparent understanding is not sufficient evidence; asks for a refined test, not a reliable one.                                                                   |
| `ts-c1-rosenfelder-1991`         | articulation | Unchanged: the test is too easy because people are easy to fool.                                                                                                             |
| `ts-c1-gudeman-1991`             | articulation | Unchanged: no point in the results shows awareness.                                                                                                                          |
| `ts-c1-rosenfelder-1992`         | articulation | Unchanged: food for thought for those who think the test sufficient.                                                                                                         |
| `ts-c1-franzen-1992-contests`    | contesting   | Unchanged: defends competent testing; already not an articulation.                                                                                                           |
| `ts-c1-mccullough-1992-contests` | contesting   | Unchanged: holds that behavioural tests could distinguish humans and computers, which is the case the sentence excludes from articulation; contesting is consistent with it. |
| `ts-c1-mckinstry-1994-context`   | context      | Unchanged: a proposal for using a test as a fitness function.                                                                                                                |

No stance would change, so nothing is held for the maintainer on this point. The new records fit the sentence: Descartes holds his two tests reliable (context), Jefferson's passage says a typewriting machine's output would mislead (articulation), Turing c. 1951 says passing any range of tests would hardly be adequate proof (articulation).

## Admitted

| Item                            | Count                                                                                                                                                                                                                                  |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Proposition records             | 36: U01 10, U02 10, U03 2; on existing propositions W01 5, W02 1, W04 1, W08 1, B6 1, C1 3, C3 1, M06a 1                                                                                                                               |
| Links (`cites`)                 | 6: Hartree → Lovelace; Turing 1950 → Lovelace, → Hartree; Turing 1951 → Lovelace; Turing c. 1951 → _Erewhon_; Wiener 1961 → Samuel 1959                                                                                                |
| Authorship records (`authored`) | 3: Turing → the NPL report (1948); Wiener → _Cybernetics_ (1948) and its supplementary chapters (1961)                                                                                                                                 |
| New propositions                | 3: U01 `machines-only-do-what-they-are-ordered`, U02 `machines-could-think`, U03 `technological-singularity`                                                                                                                           |
| New documents                   | 9 (the plan's 10 without Ulam 1958)                                                                                                                                                                                                    |
| New sources                     | 9 (the plan's 10 without Ulam); 11 dataset sources reused                                                                                                                                                                              |
| Evidence items                  | 64: 61 on records and links (2 paraphrases, Vinge 1983 and Turing 1950 on U02) and 3 bylines                                                                                                                                           |
| Stored rows changed             | 2 claims (`ts-c1-weizenbaum-1966`, `ht-w01-lanier-2000-one-half-a-manifesto`), 1 entity (C1's criterion), 1 source (`source-turing-1947-amt-b-1` gains the pack's length estimate, 8,000 words, so its quotation limit can be checked) |

**Headlines (new collection).** U01: earliest located Lovelace's notes (1843); earliest located contesting Turing's lecture of 1947-02-20; earliest located use of the name Turing 1950-10 ("Lady Lovelace's objection"). U02: earliest located Butler 1863-06-13 (satirical); contesting Descartes 1637. U03: earliest located Vinge 1983-01; no contesting text.

**Verification at admission.** `--verify` re-fetched the ten sources with a text layer on 2026-11-04 and matched all 30 quotations (28 on records and links, 2 bylines) with the pack's normaliser: 0 not matched (`research/prehistory/admission-verification-2026-11-04.json`). Nine files had the hash the pack recorded; Papers Past served a different wrapper for "Lucubratio Ebria" (the article text matched). The 33 passages on page-image sources carry the pack's reading notes. The Butler 1863 passage is matched with the pack's match text (OCR "selfacting", "tho"); the record quotes the column-image reading.

**Dates.** Records on reused documents copy the time of an existing record of the same document (map `documentTimes`); for Turing's broadcast script that is the newer form (1951, with the note that the script is not dated to the broadcast day), as the plan says. Time bases outside the schema's enum (copyright, composition, report, catalogue, delivery) are omitted and kept in the note.

**Wording.** Qualifications and notes were rewritten in the map where they used research-pack wording (decision numbers, audit and item codes, "the pack", record IDs); "the cross-family check" became "a second check by a model of another family". The script fails on any such wording or record ID left in reader text.

## Held

| Held                                                                                                                                     | Reason                                                                                                                                                                                                                                                                                                                |
| ---------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pre-u01-samuel-1960`                                                                                                                    | Decision 9a: only the indexed abstract could be read (publisher HTTP 403 to both families); an abstract is not the text, and its author is unknown. Library list.                                                                                                                                                     |
| `pre-u03-ulam-1958-context`, `pre-link-vinge-1993-names-ulam-1958`, document `ulam-1958-john-von-neumann`, source `ulam-1958-bams-codex` | The plan's condition was not met: on 2026-11-04 `www.ams.org` answered HTTP 403 and `web.archive.org` reset the connection from this session, so no copy with SHA-256 `7819f7b4…` was retrieved and p. 5 was not read by the preparing family. U03 shows Vinge 1983 and 1993 only. A Codex retrieval would settle it. |
| `pre-link-wiener-1948-names-butler`, `pre-link-wiener-1960-names-butler`                                                                 | `cites` takes a document; Wiener names Butler, not a text. Same open decision as the machine-succession admission's links to persons.                                                                                                                                                                                 |
| `pre-link-turing-1948-names-sayers`                                                                                                      | Its target would be a new document only for this link, and the book was not read.                                                                                                                                                                                                                                     |
| Leads                                                                                                                                    | Added to [`thought-spine-leads.md`](thought-spine-leads.md) under "Antecedent texts", with the plan's leads, the Turing broadcast-date correction lead and the dataset's later singularity texts not read against U03.                                                                                                |

## Corrections in other collections

- **Superintelligence (frame v5).** C1 correction entry ("earlier text found on 2026-11-04", Jefferson; Weizenbaum replaced; Descartes context), question clause, scope sentence, an "Antecedent texts, 1637 to 1951" venue, the gap on searches before 1863 notes Descartes, the fiction gap names _R.U.R._ on B6, axis widened; related links to U01, U02 and U03.
- **Machine succession (frame v8).** W01 contesting correction entry (Lanier replaced by "Lucubratio Ebria"); scope and the venue note on texts between 1863 and 1979 updated, with a sentence on the antecedent-texts searches; related links to U02 and U03.
- **Economics (frame v7).** Question clause, scope sentence for Wiener's _Cybernetics_, axis widened; related links to U02 (from E02) and U03 (from G02).
- **Yudkowsky's arguments.** Related link from Y15 to U01.

## Interface follow-up (not done here)

Decision 12a's two dated lines under U02's headline need an optional per-proposition list of headline notes in `PropositionsText`; until then the search note's scope carries them.

## Checks

All on the final branch state (`c5ef472c` and the record commits after it), after the last merges of `model-cards-admission-2` (`fa3958f2`) and `main` (`9f8dded4`).

| Gate                                                | Result                                                                                                                                                                                                                        |
| --------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm tsx scripts/prehistory-admission.ts --verify` | 30 quotations from 10 text sources matched in a fresh retrieval of 2026-11-04; 0 not matched                                                                                                                                  |
| `pnpm tsx scripts/prehistory-admission.ts --check`  | "Stored records match the pack and the map."                                                                                                                                                                                  |
| `pnpm -s validate:data`                             | Valid: 2,163 entities, 6,208 claims, 2,042 sources, 8,457 evidence records                                                                                                                                                    |
| `pnpm check`                                        | Passed: format, lint, types, 936 unit tests in 90 files, build with budgets (all page types within their limits; 8,371 pages pre-rendered, 12,260 files in `dist/`)                                                           |
| `pnpm check:privacy`                                | Passed (2,215 indexed files)                                                                                                                                                                                                  |
| `pnpm release 0.28.0 --check`                       | "v0.28.0 reproduces byte for byte from the data." (131 added, 8 changed, 0 removed against v0.27.0; 16 collections)                                                                                                           |
| `pnpm docs:coverage`                                | Coverage block in `docs/development.md` regenerated and committed with the release                                                                                                                                            |
| Browser suite                                       | 325 passed in 21.6 min, on Playwright's Chromium (Playwright 1.63.0) through an untracked copy of `playwright.config.ts` without `channel: 'msedge'`, deleted afterwards and never committed; port 4173 free before and after |

Unit tests changed by scope, not by loosening: the stored earliest-located packet now reproduces from the superintelligence collection without this admission's venue and gap additions; the release-collection test picks the superintelligence collection by ID (the new collection is first); the French-language source list gains the 1637 Descartes source; the 1965 query sets aside this admission's records; the split test compares frames with groups less their descriptions. `tests/browser/dossier-count.ts` sets aside the `pre-` prefix; no browser spec needed another change.

## Budgets

| Page type         | Limit | With the collection, before the fix | Final     |
| ----------------- | ----- | ----------------------------------- | --------- |
| Start page        | 115   | 109.3                               | 109.3     |
| Hub               | 295   | 232.9                               | 231.5     |
| About & method    | 330   | 319.2                               | 317.7     |
| **Search**        | 275   | **276.2 (over)**                    | **274.7** |
| Explorer          | 330   | 272.0                               | 270.5     |
| Dossier           | 360   | 322.0                               | 320.5     |
| Person            | 295   | 233.1                               | 231.6     |
| Document          | 310   | 248.2                               | 246.7     |
| Claim             | 325   | 280.5                               | 279.0     |
| Collection        | 370   | 305.8                               | 304.3     |
| Comparison        | 520   | 287.4                               | 285.9     |
| Guide             | 630   | 327.5                               | 326.1     |
| Compute guide     | 340   | 275.4                               | 273.9     |
| Propositions      | 455   | 340.0                               | 339.1     |
| Control timelines | 285   | 261.5                               | 260.0     |
| By author         | 310   | 287.2                               | 285.7     |
| By author index   | 250   | 230.1                               | 228.6     |
| Year              | 400   | 351.4                               | 349.9     |
| Years index       | 305   | 229.1                               | 227.6     |

KB of gzip-9 (1 KB = 1,000 bytes), from `scripts/bundle-budget.ts` in `pnpm build`. No limit was raised.

**Finding room.** On v0.27.0 Search was at 274.7 of 275 KB (as the planning thread reported from that branch). The admission put it 1.2 KB over: the shared `proposition-frames` chunk grew by the new frame and the two question clauses, and the search manifest by the new records. Following the operating guide ("keep page-specific text out of shared code"), the groups' descriptions, which only a collection's own page shows, moved out of the frames that every page holds: `PropositionsFrame` now carries groups without `description`, each whole collection adds them with `describeGroups` (`src/reading/describe-groups.ts`), and the propositions page reads them from the whole collection it loads. Every page type fell by about 1.5 KB; Search is back at 274.7 of 275, the headroom it had before the admission (0.3 KB). Releases record whole collections, so v0.28.0 is unchanged (`pnpm release 0.28.0 --check`). The file budget: 12,260 files in `dist/` of 15,000.
