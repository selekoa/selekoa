# People pack: admission, 2026-10-31

Admission of the candidate pack in [`research/people/`](../research/people/README.md): dated roles and founding credits of company heads, the authorship of the texts they signed, roles of persons the dataset already held, and authors of single dataset texts. It follows the maintainer's decisions of 2026-10-30, which adopt every recommended answer of the [pack report](people-pack-2026-10-29.md), and the maintainer's adjudication of the [cross-family check](../research/people/cross-family-check-2026-10-29.md) of the same day (103 agree, 13 partly), which accepts the check. This branch brings in the pack branch `people-pack` and the check's branch `codex/people-check` by merge.

- **Script:** [`scripts/people-admission.ts`](../scripts/people-admission.ts) builds every record from the pack and the authored [map](people-admission-map-2026-10-31.json). Run without arguments it writes the records; `--check` rebuilds them and compares them with the stored data.
- **Before-snapshot:** [`people-admission-before-2026-10-31.json`](people-admission-before-2026-10-31.json), first in the chain in `src/editorial/historical-views.ts`. Base: `main` at 754ce57 (v0.15.0). The admission changes one existing row (below).
- **Schema:** unchanged (2.22). Every admitted record uses an existing predicate.
- **Editorial state:** every record is a seed with machine-checked evidence. No evidence is human-reviewed and no human translation is claimed.

## Counts as admitted

| Records  | Added | Changed |
| -------- | ----: | ------: |
| Claims   |    76 |       0 |
| Entities |    43 |       1 |
| Sources  |    44 |       0 |
| Evidence |    89 |       0 |

- **Claims:** 76 of the pack's 83: `held_role` 35, `authored` 36, `co_founded` 5. All explicit and supported. Topic `people` for roles, founding credits and the executives' six signed texts (46); `ideas` for the 30 authorship records of dataset texts, as the author-person admission did.
- **Entities:** 37 persons (7 executives: Sundar Pichai, Satya Nadella, Jensen Huang, Masayoshi Son, Lawrence J. Ellison, John L. Hennessy and Eddie Yongming Wu; 30 authors, subtype `Writer`) and 6 documents (the signed texts). Mark Zuckerberg's subtype changes from Researcher to Executive (decision 4).
- **Sources:** 42 from the pack and the two name-bridge pages the check located (below). The pack's Alibaba Form 20-F is the dataset's existing source for the same filing at the same address and is reused.
- **Evidence:** 71 quotations and 18 paraphrases.

## Decisions applied (maintainer, 2026-10-30)

1. **`states_position`:** the seven statement records are held for a schema decision in a later minor release. The six authorship records and their documents are admitted on existing predicates.
2. **Open intervals:** a role with a start and no end is admitted, with the note naming the latest document that states the role. The interface never shows “present”. Applied in the interface on 2026-11-01 under the maintainer's wording of 2026-10-31: `open-ended roles read "from <date> (stated in <document>, <date>)", never "present"`. The rule (`timeLabel` and `roleStatedIn` in `src/domain/query.ts`): a `held_role` record whose time is an interval with a start and no end reads `from <start> (stated in <document>, <date>)`. The document is the latest-dated source among those whose evidence supports the record (context and contradicting evidence do not count); it is named by its document record where it has one, else by the source title, and dated by its publication date, else its version date. Where no supporting source carries a date, the record reads `from <start> (end not recorded)`. Nadella's Microsoft CEO record reads “from 2014-02-04 (stated in Microsoft Corporation 2026 Proxy Statement (Schedule 14A, definitive), 2026-10-21)”. Intervals with an end, and every record other than a role, read as before (“2011 → 2012”, “2021 → End unknown”). The reading applies wherever the interface, search results, citations and the Markdown research starters show a record's date; review packs keep the stored reading, and the release files do not show it. The person page still explains that an open interval is not evidence that the role continues, and the About page explains the reading.
3. **Names as printed:** Jensen Huang (NVIDIA's executive page) and Lawrence J. Ellison (the filing's form), with “Jen-Hsun Huang” and “Larry Ellison” as aliases, on the bridges below.
4. **Mark Zuckerberg:** subtype Executive.
5. **Publisher pages as identity sources:** accepted for the thirteen authors who rest on them.
6. **Personal pages:** a homepage or CV headed with the person's name and listing the document by title counts as the person's own statement.
7. **The FSF announcement:** Allan Dafoe stays held; splitting the announcement post is a later correction.
8. **As-of snapshots:** an undated page is dated by the earliest retrieval with identical bytes (01.AI, 15 October 2026), otherwise by this pass's retrieval (Imbue, Poolside's byline block).
9. **–11.** Chinese heads, Writer roles and pen names: later passes; nothing admitted here.

## Adjudication of the check, as applied

| Item                | Record                            | Applied                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ------------------- | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 10                  | Nadella, Microsoft board chair    | Adjudication 1. The record is an event dated by the announcement of 16 June 2021 (basis `announcement`), not an interval: the 8-K gives neither an election nor an effective date. The check read “Effective June 16” in an archive capture of Microsoft's 2021 proxy statement; at admission the SEC refused (HTTP 403) and the archive reset the connection, so no effective date is recorded (held below). The 2026 proxy's signature stays as context: the title on 21 October 2026. |
| 76                  | Nadella, 2025 shareholder letter  | Adjudication 2. The “no date” note is removed. The letter's closing signature prints 15 October 2025; the record and the document are dated by it, and the passage is a second evidence item. Matched again at admission in a fresh retrieval whose SHA-256 equals the pack's.                                                                                                                                                                                                           |
| 71, 72              | Jensen Huang, Lawrence J. Ellison | Adjudication 3. Each alias now rests on one text that prints both forms: the Stanford Technology Ventures Program profile (heading “Jensen Huang”, biography opening “Jen-Hsun Huang co-founded NVIDIA”) and Apple's release of 20 September 2002 (title “Larry Ellison Resigns as Apple Director”, opening “Lawrence J. Ellison”). Both were retrieved again at admission and the wording confirmed; each is an identity source of the person record.                                   |
| 32, 38, 40          | 01.AI: 黄蕙雯, 马杰, 沈鹏飞       | Adjudication 4 (the check as worded). Each statement gives the printed Chinese form, with the dataset's transliteration in parentheses, and the qualification says the page prints the name in Chinese characters only. The existing person records already carry the Chinese forms as aliases.                                                                                                                                                                                          |
| 5, 8, 9, 35, 36, 85 | Retrieval limits                  | No change. The check could not open the Alphabet 2019 and Microsoft 2021 8-Ks or the Microsoft 2026 proxy, and found Imbue's and SoftBank's current pages in different bytes from the pack's, without a substantive difference. Item 85 is a held statement record.                                                                                                                                                                                                                      |

## Admission's own changes

- **Attributes the schema does not have.** The pack's `authorPosition` (for example “2 of 14”) is dropped; the statement already says how many authors the text credits. The pack's `extends` pointer is dropped; the records it names stay as they are.
- **Labelled paraphrases.** In 17 authorship records the quoted name comes from a dataset source that records no document length, against which a quotation cannot be checked. As in the author-person admission, each becomes a labelled paraphrase that still gives the printed form (“Credited as “…” (…)”), and its note says why. No source row was changed.
- **One quotation widened.** The pack's quotation for Giannandrea's Apple role is the opening of a sentence the dataset already quotes from the same release; the whole sentence is used, so the release's quotation counts once.
- **Document records.** “Shareholder letter” maps to the closed subtype `Letter`. The Microsoft post of 17 November 2023 records its update of 21 November as a revision date. SoftBank's chairman's message is undated and has no version metadata. The Hennessy letter's source is the Alphabet 2026 proxy statement, which also supports role records, so that source names no document.
- **Source kinds.** Profiles and web pages are recorded as `post`, CVs as `report`.

## Fresh-context review (2026-10-31)

A fresh-context adversarial review of this branch (three reviewers by dimension, each finding verified by a second agent) confirmed four faults, all fixed in the map before release:

- **Check item 42 (Ziebarth):** the CV source kept the pack's temporary download address, which had expired (HTTP 410). It now carries the stable link from his homepage that the check found; retrieved again at admission, it returns the pack's bytes (same SHA-256).
- **Announcement dates:** the statements of Nadella's 2014 appointments and Pichai's 2019 appointment now say what the filing dates, the company's announcement, rather than dating the board's act by it. Pichai's statement no longer names the board's approval, which the quoted passage elides.
- **The check sentence** in the evidence notes said “what followed from it was applied at admission” for every partly-agreeing item. Items 5, 8, 9, 35 and 36 were retrieval limits that changed nothing, and now say so.
- **Decision 2's interface reading** was listed as applied; it was then held, and was applied on 2026-11-01 (decision 2 above).

One finding was not accepted: that the Alphabet 8-K quotation joins two sentences with an ellipsis. Elided quotations are the dataset's convention (107 earlier quotations use one), the pack's matcher matched both parts, and the statement now claims nothing the elided words carry.

## Corrections after the decisions of 2026-10-31

- **Nadella's Microsoft director record:** its time note named the 2026 proxy statement as the latest document stating the role, but its only evidence is the 8-K of 4 February 2014. Under decision 2's reading the label names the latest supporting document, so the note now names only the 8-K and the qualification states no end; the record reads “from 2014-02-04 (stated in Microsoft Corporation Current Report on Form 8-K (4 February 2014), 2014-02-04)”. v0.15.1 was cut again with this change before any merge.

## Held

| Held                                                                                                                       | Why                                                                                                                                                                     |
| -------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Seven `states_position` records (Pichai 2018, Nadella 2023 ×2, Nadella 2025 capacity, Zuckerberg 2025, Son, Hennessy 2026) | Decision 1: proposed predicate, for a schema decision in a later minor release.                                                                                         |
| An effective start for Nadella's chair                                                                                     | The 2021 proxy capture the check read could not be retrieved at admission. **Maintainer decision, 2026-10-31:** keep the announcement date and hold the effective date. |
| Allan Dafoe, 164 printed names, Chinese heads, pen names                                                                   | As the pack and decisions 7, 9 and 11 leave them.                                                                                                                       |

## Release

Dataset release **v0.15.1**, a patch: no schema change, no new collection and no collection definition changed (docs/dataset-format.md, versions).

## Tests changed

- `transactions.test.ts` and `versions.test.ts` exclude the admitted claims from their earlier counts through the before-snapshot.
- Decision 2's interface reading (2026-11-01): `query.test.ts` tests the open-role reading (Nadella's CEO record, an undated source, document and version-date fallbacks, context evidence left out) and that no record reads “present”; the other `timeLabel` tests pass the records the label reads.

## Checks

- `pnpm tsx scripts/people-admission.ts --check`: the stored records match the pack and the map.
- `pnpm -s validate:data`: valid (1,310 entities, 3,513 claims, 1,137 sources, 4,830 evidence records).
- `pnpm -s audit:consistency`: no finding of medium severity or above touches an admitted record (two found on the first run, a duplicate Alibaba 20-F source and a document version without its revision date, were fixed in the map).
- `pnpm -s check`: format, lint, typecheck and unit tests: 716 passed and 1 failed, `search-index.test.ts` “gives the same results with each filter”, which timed out at 60 s while five other threads ran tests on the same machine; the file passed alone (8 of 8, 106 s). Build: 4,655 pages pre-rendered on 4 threads in 105.2 s, 1,266 slice files (47.4 MB), no page needing the relation core; `pnpm build` 189 s.
- Bundle budgets: all thirteen pass, no limit changed. Start 107.9 of 115 KB; Hub 267.9 of 295; About 303.2 of 330; Search 258.4 of 275; Explorer 298.3 of 330; Dossier 328.6 of 360; Person 268.8 of 295; Document 281.8 of 310; Claim 294.9 of 325; Collection 333.9 of 370; Comparison 474.9 of 520; Guide 582.4 of 630; Propositions 414.6 of 455.
- `pnpm -s check:privacy`: passed. `pnpm release 0.15.1 --check`: reproduces byte for byte.
- Browser suite: not run on this branch. It changes no interface; the suite runs on the last branch of the chain.

## Budget fixes ported from later branches (maintainer decision, 2026-11-01)

The maintainer decided on 2026-11-01 to move three budget fixes made on later branches of the chain down to this branch ("Move fixes to people"), so that every branch passes its own budgets after main's merge. Each is its own commit, ported from the named branch; every page is drawn as before.

- **The frameworks-and-law guide without every passage** (from `key-papers-admission`, 14ec97b and 026d66e): the guide takes the latest check date from the build's site facts instead of reading every evidence record's check date, and its signatory count marks the records it counts as selected by relation.
- **Only the dataset-description fields a page reads in its slice** (from `china-labs-3-admission`, a4fe7ea): the trace records which fields of the description a page reads, and its slice carries only those; merged parts combine them. Every slice that read any field had carried the whole description, whose scope text grows with each admission.
- **Load only what a page shows** (from `risk-debate-admission`, f5e60e4, as adapted to main by the merge 19085a0, with the row-opening fix 5f71530): each slice carries the collection index entries of its own records (with the chronicle's years whole and its dates for the claims held), instead of every page loading the whole index; every page holds small frames of the propositions collections, and a collection's whole text loads only with its own page; the comparison reads only the claims about the editions it shows, and a propositions page only its own collection's records; opening a collection row waits for that page's code and text. Adapted to this branch's five propositions collections: the frames, loaders and modules list superintelligence, Yudkowsky, economics, orbital compute and AI and biological risk; a later branch adds its own collection's frame when it merges.

Built HTML: all 4,807 pages identical before and after the three ports apart from `/assets/` tags (`scripts/page-hashes.ts`). `pnpm release 0.15.1 --check` reproduces byte for byte. Sizes are gzip-9 KB, as `pnpm build` measures them; no limit changed.

| Page type     | Before | After | Limit |
| ------------- | -----: | ----: | ----: |
| Start page    |  110.2 | 110.7 |   115 |
| Hub           |  283.2 | 229.4 |   295 |
| About         |  318.7 | 263.5 |   330 |
| Search        |  273.7 | 259.8 |   275 |
| Explorer      |  313.7 | 253.3 |   330 |
| Dossier       |  344.0 | 284.8 |   360 |
| Person        |  284.2 | 228.9 |   295 |
| Document      |  297.2 | 244.0 |   310 |
| Claim         |  310.3 | 255.8 |   325 |
| Collection    |  349.3 | 302.3 |   370 |
| Comparison    |  490.3 | 282.4 |   520 |
| Guide         |  597.8 | 321.6 |   630 |
| Compute guide |  326.0 | 271.8 |   340 |
| Propositions  |  422.7 | 331.2 |   455 |
| Year          |  365.2 | 317.4 |   400 |
| Years index   |  280.8 | 225.6 |   305 |

Checks after the ports: `pnpm -s check` passed (format, lint, typecheck, 775 unit tests, build: 4,806 pages pre-rendered, 1,417 slice files, 52.5 MB, no page needing the relation core; every budget passes); `pnpm -s check:privacy` passed. Browser suite: not run here.
