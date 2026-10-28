# Frameworks to law, part 1: admission, 2026-10-28

Part 1 of the admission of the candidate pack in [`research/frameworks-to-law/`](../research/frameworks-to-law/README.md): the EU and China records and the links from framework editions back to the laws and commitments they name. It follows the maintainer's decisions of 2026-10-28, which adopt the recommended answers of the [pack report](frameworks-to-law-pack-2026-10-28.md) and every correction of the [cross-family check](../research/frameworks-to-law/cross-family-check-2026-10-28.md). The inputs are the pack, its same-family [audit](../research/frameworks-to-law/audit.md) and the check, whose report and JSON this branch brings in from `codex/frameworks-to-law-check`, which itself contains the pack branch.

- **Script:** [`scripts/frameworks-to-law-admission.ts`](../scripts/frameworks-to-law-admission.ts) builds the records from the pack and the authored [map](frameworks-to-law-admission-map-2026-10-28.json): `--part 1` writes them, and `--part 1 --check` rebuilds them and compares them with the stored data.
- **Before-snapshot:** [`frameworks-to-law-1-before-2026-10-28.json`](frameworks-to-law-1-before-2026-10-28.json), first in the chain in `src/editorial/historical-views.ts`. It lists the added IDs and the two changed rows as they were.
- **Fresh retrieval at admission:** every quotation was matched again in a direct retrieval of its source on 2026-10-28 ([`admission-verification-2026-10-28.json`](../research/frameworks-to-law/admission-verification-2026-10-28.json)). All sources returned the pack's SHA-256 except the two standards-catalogue entries, which are dynamic pages; their date fields are unchanged.
- **Schema:** unchanged (2.18). Every record uses an existing predicate.
- **Editorial state:** every record is a seed. No evidence is human-reviewed and no human translation is claimed.

## Counts as admitted

| Records  | Added | Changed |
| -------- | ----: | ------: |
| Claims   |    66 |       1 |
| Entities |    11 |       0 |
| Sources  |    12 |       1 |
| Evidence |   121 |       0 |

- **Claims:** 32 EU, 26 China, 8 links back. By predicate: `states_provision` 44, `published` 10, `references_commitment` 8, `changes_from` 2, `enacted` 2. Two are inferred (the two comparisons of the Code's initial draft with the final Code); the rest are explicit.
- **Changed claim:** the link of OpenAI's May 2026 Frontier Governance Framework to the EU Code of Practice. It gained the provision-level reference to Appendix 2.2 as a second evidence item (decision 7).
- **Entities:** eight documents and three public bodies. The documents are the Code's initial draft, the Commission's Opinion on the Code, the Labelling Measures, GB 45438-2025, GB/T 45654-2025, the Cybersecurity Law amendment decision and the two CAC filing announcements. The public bodies are SAMR and SAC as one publishing pair, the NPC Standing Committee and the office of the President of the PRC.
- **Sources:** 12 new. Ten are Simplified Chinese government texts. The other two are the Commission's PDF of the initial draft and its library page.
  - Seven dataset sources are reused: the AI Act, the Digital Omnibus, the Commission's Opinion, the final Code's Safety and Security chapter, and three framework editions.
  - The Opinion's source is the one changed source: it gained its document.
- **Evidence:** 75 quotations and 46 paraphrases; 24 quotations are in Chinese.
  - 107 items are the pack's.
  - 13 were added at admission: 9 short quotations where the schema requires one, 2 context items, the Commission page's date and one paraphrase that completes a shortened quotation.
  - One pack item became the second evidence item of the changed link.

## Decisions applied

- **Decision 5, the Code's initial draft:** the records cite the Commission's own PDF (newsroom document 109946, SHA-256 `e7522e16…`), retrieved at admission. Every quotation from it was matched in that file.
  - It is dated 14 November 2024 by the Commission's library page. The cross-family check read that page; the admission's own request was refused (HTTP 403), so the date rests on the check's reading, and the evidence item says so.
  - The Dutch Senate's copy, which the pack read, is recorded in the source's version note with its address and SHA-256. The check found its extracted text identical on all 36 pages.
  - The draft is a version of the Code family, published by the Commission, so the two comparisons with the final Code are version comparisons within one family. The pack's collective author, the working-group chairs, is named in statements and qualifications; no entity was created for them.
- **Decision 6, the AI Act:** the AI Act and Digital Omnibus records cite the existing sources `source-eu-ai-act-2024` and `source-eu-digital-omnibus-ai-2026`. Each evidence note names the Publications Office's Cellar repository as the route by which the same Official Journal expression was read; EUR-Lex returned empty responses.
- **Decision 7, provision-level links:** OpenAI's reference to "Appendix 2.2 of the Code of Practice" is a second evidence item on the existing link to the Code. The link's statement now names the appendix.
  - The item is a paraphrase, not the pack's eight-word quotation: the edition's quotation limit has room for only one of the two, and the new link to the AI Act needs a quotation.
- **Decision 10, order:** this part admits no record that needs a schema change and none with a country subject.
- **Decision 4 is moved to part 2.** The AI Act's entry into force on 1 August 2024 is to be admitted as an inferred record with its rule quoted. The schema allows a provision record only as explicit, so the record waits for part 2's schema change.

## Cross-family corrections

| Item     | Record                        | Correction                                                                                                                                                                                                                                                                                |
| -------- | ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 24       | Initial draft published       | Dated 14 November 2024 (was November 2024, inferred), now explicit. The publisher is the Commission and the Commission's file is the source; the feedback deadline keeps its time, 12:00 CET.                                                                                             |
| 32       | AI Act Art. 53(1)(b)          | The qualification states the Article 53(2) free and open-source exception, with its condition that the exception does not cover models with systemic risk. The check's quotation of Article 53(2) is added as context evidence.                                                           |
| 35       | AI Act Art. 92(3)             | The qualification gives the purposes in Article 92(1) and the request conditions in Article 92(4).                                                                                                                                                                                        |
| 38       | Initial draft, Measure 7      | The qualification adds that the draft relates the Framework's comprehensiveness to the expected severity of systemic risks.                                                                                                                                                               |
| 41       | Opinion, drafting process     | Locators: paragraph (5) on PDF p. 2 (printed p. 1), continuing onto PDF p. 3; the working groups in paragraph (6), PDF p. 3.                                                                                                                                                              |
| 73       | Labelling Measures issued     | 7 March 2025 is the notice's issue (document) date. No signing event is shown. The date basis is the document's date of issue, as for the 2023 Interim Measures already in the dataset, and the note says that no signature is recorded.                                                  |
| 106, 107 | Labelling Measures provisions | The same correction for every provision of the Measures. The pack's `signature` basis became the document's date of issue for these and for the Interim Measures provisions, following the dataset's existing records of the Interim Measures.                                            |
| 118      | FGF link to the AI Act        | The undated PDF cannot date the link. The link is dated by OpenAI's release announcement, which states 28 May 2026; the dataset's reading of that announcement is added as context evidence. The time notes of this link and of the changed link to the Code say that the PDF is undated. |
| 119      | FGF Appendix 2.2              | As 118, on the changed link.                                                                                                                                                                                                                                                              |
| —        | All part 1 records            | Our prose says "initial draft" and "opening paragraph"; quotations keep the source's "first".                                                                                                                                                                                             |

Items 25 and 26 (the two comparisons) agreed; their qualifications already say that the final Code keeps AI research automation and non-discrimination elsewhere, and that updating and notification appear in the initial draft. The other part 1 items found full support.

## Admission's own changes

- **Provision kinds.** The schema has no provision kinds `definition`, `date`, `enforcement` or `names_framework`. They become the kinds the dataset already uses for such provisions:
  - definition and date: threshold or trigger;
  - enforcement: who decides;
  - names a framework: required action.
  - Some records take a kind of their own: the draft's risk types are a threshold or trigger, as the final Code's specified systemic risks are; the Opinion's assessments are who decides; Article 55(1)'s chapeau is a required action; and the new Article 20 of the Cybersecurity Law is a required action of the state. The kinds the comparison questions use (risk domain, revision and others) are kept for comparison cells, as the ontology says.
- **Statements that are not provisions.** The Opinion's account of the drafting process and its statement that the Code has no key performance indicators, and the initial draft's description of itself as light in detail, are `published` records made by the Commission and worded as what the document states. This follows the precedent of the second Chinese collection.
- **Date bases the schema does not have.**
  - The Opinion's adoption date is its date of signature ("Done at Brussels, 1.8.2025").
  - The NPC Standing Committee's adoption of the Cybersecurity Law amendment has no basis; the note says it is the adoption date.
  - The document dates of the Chinese measures are their dates of issue.
- **Quotations required by the schema.** Nine provisions or links were given only by paraphrase in the pack, and the schema requires a quotation from the edition. Short quotations were added at admission from the fresh retrievals:
  - AI Act Arts. 52(4) and 54(3)(b);
  - the Opinion's paragraph (57), already quoted in the dataset;
  - Interim Measures Arts. 7(2), 12 and 21;
  - Labelling Measures Arts. 2 and 3;
  - the FGF's scope sentence.
- **Quotations shortened.**
  - The new Article 20 of the Cybersecurity Law is 77 Chinese characters, over 50 words when each character counts as one word. It is quoted to its second clause, and the rest is paraphrased.
  - Presidential Order No. 61 (119 characters) is quoted as 现予公布 only, within 10% of its length.
- **The Interim Measures' second posting.** The pack read the Measures on gov.cn, not on the CAC's site, which the dataset cites. It is recorded as its own source of the same document, and its quotations count against one limit together with the CAC posting.
- **Reader text.** Record IDs in the pack's wording became "recorded separately". The test-facing qualifications of the RSP v3.1–v3.4 links use the dataset's wording for SB 53 links.
- **Research tools.** Four lint errors in the pack's `build.mjs` and `tools.mjs` were fixed: an unused import, an unused parameter and literal invisible characters in a regular expression, which are now escapes. Their output is unchanged.

## Held

| Record                                 | Why                                                                                                                                                                                                                                |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GB 45438-2025 scope                    | A provision record must quote the edition itself. The standard's text was not retrieved; the record rests on SAMR's news description of it. Held until the standard's text is read. The standard's publication record is admitted. |
| AI Act entry into force, 1 August 2024 | Moved to part 2, which makes the schema change it needs (decision 4).                                                                                                                                                              |

No record was held for a difference between the pack and the check needing judgement: in part 1 every difference had an adopted correction.

## Release

Dataset release **v0.10.3**, a patch. Under [docs/dataset-format.md](../docs/dataset-format.md#versions), a schema change or a new collection raises the minor version, and corrections and small additions within existing collections are a patch. Part 1 changes no schema, defines no collection and changes no collection definition.

- Its EU and China records extend documents the dataset already covers: the AI Act, the Code of Practice and the Interim Measures. They add five related governance texts.
- Its links extend the external commitments collection, whose membership is computed from its five texts.

It is not a small addition in size (66 claims), but the rule turns on schema and collections. If the maintainer reads a body of new governance texts as a new collection, the release would be v0.11.0 and part 2 v0.12.0.

This part was first released as v0.10.2 on the earlier main. Main then released the paraphrase corrections as v0.10.2, so main was merged into this branch (no admitted record of this part changed), the before-snapshot was regenerated by the admission script from the new base (`baseCommit` 9667cbb) and stays first in the chain of historical views, and this part was re-released as v0.10.3.

`pnpm release 0.10.3` compared with v0.10.2: 210 added and 4 changed (the link record, the Opinion's source, and the external commitments and frontier safety frameworks collections, whose records changed).

## Tests changed

- `transactions.test.ts`, `versions.test.ts` and `research-path.test.ts` exclude this part's added claims from their earlier counts.
- `commitments.test.ts` expects eight SB 53 links (RSP v3.1–v3.4 added). The edition histories now also show links to laws outside the collection (the AI Act, the RAISE Act), so the test compares only the links whose object is in the collection.
- `external-commitments.test.ts` expects the Preparedness Framework (Beta)'s link to the July 2023 White House commitments.
- `framework-evidence.test.ts` lists the ten new Simplified Chinese sources.
- Browser: `tests/browser/dossier-count.ts` excludes `fl-` records from the earlier dossier counts, and `governance.spec.ts` expects 280 records in the RSP family timeline (four links added).

## Checks

- `pnpm tsx scripts/frameworks-to-law-admission.ts --part 1 --check`: the stored records match the pack and the map.
- `pnpm -s validate:data`: valid.
- `pnpm -s check`, run step by step: format, lint, typecheck, unit tests (620 passed) and build, with 3,869 pages pre-rendered.
- `pnpm -s check:privacy`: passed.
- `pnpm release 0.10.3 --check`: reproduces byte for byte.
- `pnpm docs:coverage` and `pnpm question:gaps` regenerated the README coverage block and `review/essay-starter-gaps.md`.
- Browser tests, through an untracked copy of the Playwright configuration with the installed Chromium instead of Edge (not committed):
  - Full suite: 201 of 206 passed. The five failures were expectations this part changes: Anthropic and OpenAI dossier counts (two specs each), the RSP family timeline count, and the About page's release number, because the build had run before the release was written.
  - After the fix (`dossier-count.ts` excludes `fl-` records, as it does `c2-`; the timeline expects 280 with the four RSP links) and a rebuild, the four affected spec files passed: 21 tests.
  - After the last data change (the two provision kinds noted above), the governance, About, commitments and record-page spec files passed again: 30 tests.

After merging main (paraphrase corrections) and re-releasing as v0.10.3:

- `pnpm tsx scripts/frameworks-to-law-admission.ts --part 1 --check`: the stored records match the pack and the map.
- `pnpm -s validate:data`: valid (1,020 entities, 2,930 claims, 856 sources, 3,785 evidence records).
- `pnpm -s check`, run step by step: format, lint, typecheck, unit tests (622 passed) and build, with 3,869 pages pre-rendered.
- `pnpm -s check:privacy`: passed.
- `pnpm release 0.10.3 --check`: reproduces byte for byte.
- Browser tests, through an untracked copy of the Playwright configuration with the installed Chromium instead of Edge (deleted afterwards): 206 of 206 passed.

## Open for the maintainer

1. **Version.** Patch, by the reading above; say if a new body of governance texts should count as a collection.
2. **Commission page date.** The initial draft's date rests on the cross-family check's reading of the Commission's library page, which refused this admission's requests.
3. **GB 45438-2025 scope** is held until the standard's text is retrieved.
4. **Unchecked archive captures.** The pack's Internet Archive capture addresses for the Chinese and EU pages came from the availability service and were not opened, so no `archivedUrl` was recorded for these sources.
