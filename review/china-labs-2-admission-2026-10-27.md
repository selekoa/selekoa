# Chinese frontier-AI institutions, second collection: admission, 2026-10-27

The admission of the candidate pack in [`research/china-labs-2/`](../research/china-labs-2/README.md) into the application dataset, under the maintainer's decisions of 2026-10-27. The pack, its same-family audit ([audit.md](../research/china-labs-2/audit.md)), the blind cross-family check ([codex-check-2026-10-27.md](../research/china-labs-2/codex-check-2026-10-27.md); 63 items: 54 supported, 9 partly, 0 not supported) and the pack note ([china-labs-pack-2-2026-10-27.md](china-labs-pack-2-2026-10-27.md)) are the inputs. The [topic documentation](../docs/china-atlas.md#second-collection-2026-10-27) describes the collection for readers.

- **Script:** [`scripts/china-labs-2-admission.ts`](../scripts/china-labs-2-admission.ts) builds the records from the pack and the authored [map](china-labs-2-admission-map-2026-10-27.json). `--check` rebuilds them and compares with the stored data.
- **Before-snapshot:** [`china-labs-2-before-2026-10-27.json`](china-labs-2-before-2026-10-27.json), first in the chain in `src/editorial/historical-views.ts`. It lists the added IDs and the eight existing entities that gained an alias, as they were.
- **Schema:** unchanged (2.18 after the merge below; 2.17 when first built). Every record uses an existing predicate.
- **Editorial state:** every record is a seed. No evidence is human-reviewed and no human translation verification is claimed.

## Counts as admitted

| Records  | Added | Changed |
| -------- | ----: | ------: |
| Claims   |   118 |       0 |
| Entities |    71 |       8 |
| Sources  |    61 |       0 |
| Evidence |   220 |       0 |

- **Claims by predicate:** `published` 63, `states_provision` 17, `signed_commitment` 17, `authored` 10, `participated_in_round` 6, `explicitly_credits` 3, `cites` 1, `unit_of` 1.
- **Entities:** 53 documents, 17 organisations and 1 public body (TC260). The eight changed entities are existing organisations that gained a listed legal name as an alias (decision 5).
- **Sources:** 61 new (48 English, 13 Simplified Chinese). Four pack sources were already in the dataset and are reused: Baidu's 2025 Form 20-F, the MiniMax prospectus, the Seed Alignment & Preparedness announcement and the Seed-OSS model card.
- **Evidence:** the pack's 189 items, 25 further items from splitting joined quotations, and 6 items added at admission. 196 are quotations and 24 paraphrases; 73 contain Chinese text.

## Decisions applied

1. **Admit, with every correction.** All 118 pack records are admitted. The cross-family corrections are listed below, together with the six same-family fixes, which were already in the pack and are kept (one of them, a locator, is superseded by K057).
2. **AIIA commitments (image only): admitted as a transcription.** The commitments and the signatory list exist only as an image in CAICT's WeChat post. The three provision records now quote a transcription of the image as their primary evidence, in place of the pack's paraphrase. The 17 signatory records and the cover record keep a paraphrase that transcribes the listed name or cover. Every such evidence note says that the text is a transcription of an image, not in the page's text layer and not machine-matched, and which passes read the image. The machine-matched text reproduction on itcloudbd.com stays as separate secondary evidence. The post's recorded length now includes the image's Chinese text (a lower bound; see the source record), so that the transcriptions count against the quotation limit. The People's Daily Online copy omits 红队 (red-team) in Commitment II; this is said in the qualifications of the commitments record and of the Commitment II record and in the document's description, and that copy remains context evidence only.
3. **Licence, prospectus and report statements are not provisions.** Ten pack records used `states_provision` on documents that are not framework or commitment editions: three MiniMax-01 licence terms, the Kimi K2 display term, the Kimi K2 report's red-teaming section, three MiniMax prospectus statements, the MiniMax M3 commercial terms and the Kimi K3 Model-as-a-Service term. Each is now a `published` record from the document's publisher (MiniMax or Moonshot AI) to the document, worded as what the document states, as the first collection recorded licence statements. Their provision attributes were removed. The provision format is kept for the TC260 framework versions, the AIIA commitments and the Shanghai AI Laboratory framework (17 records).
4. **Co-named organisations: credited, not published.** Peng Cheng Laboratory, CNCERT/CC and Concordia AI are recorded with `explicitly_credits` from the document to the organisation: the ERNIE 3.0 Titan paper's author affiliation, the framework 2.0's cover and preface, and the Shanghai AI Laboratory framework's citation line and executive summary. The relation's object must be a person or an organisation, so CNCERT/CC, which the pack typed as a public body, is typed as an organisation (subtype: cybersecurity emergency response centre); the entity description says that the type is cataloguing and asserts no legal status. This avoided a schema change. The CAC news item's statement that CNCERT/CC led the preparation is context evidence on that record, attributed to CAC.
5. **Signatory legal entities.** Each of the 17 records keeps the group-level entity. The listed legal name is an alias of that entity (for the eight existing entities, a recorded change) and is stated in the record's qualification, with the limits of the mapping. No legal-entity records were created. The pack's `listedAs` attribute, which the schema does not have, was dropped.
6. **Language.** Chinese passages stay in Chinese. Each evidence note that renders Chinese in English labels it "English machine translation, not verified by a person"; where no rendering exists (a listed name), the note says so. Chinese sources keep their original title, with the English title marked as a machine translation in the version note.

## Cross-family corrections

| Item | Record                                           | Correction                                                                                                                                                                                                                                                                 |
| ---- | ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| K001 | `c2-baidu-ernie-2-report`                        | Title and arXiv stamp are two quotations.                                                                                                                                                                                                                                  |
| K027 | `c2-minimax-01-report`                           | Submission line, title and author entry are three quotations.                                                                                                                                                                                                              |
| K034 | `c2-bytedance-seed-15-vl-report`                 | Title, credit and stamp are three quotations. The time note records the arXiv stamp date (11 May 2025, submission of version 1) and the internal date printed in the same PDF ("Date: June 13, 2025"), each with its kind; the internal date is added as context evidence. |
| K040 | `c2-moonshot-k2-readme`                          | "Created on 11 July" is now "the repository's initial commit dated 11 July 2025"; the time note gives GitHub's creation time of 3 July 2025 as a different kind of date.                                                                                                   |
| K044 | `c2-moonshot-k2-report-redteam`                  | The qualification now states the report's procedure: multiple rounds of human review, with the same reviewer for all cases in a test set, to minimise subjectivity. Re-read at admission.                                                                                  |
| K047 | `c2-governance-tc260-asgf-v2-training-data-cbrn` | The quotation reproduces the printed text, without the pack's ellipses.                                                                                                                                                                                                    |
| K057 | `c2-minimax-prospectus-safety-assessment`        | Locator: printed p. 279 (PDF p. 289), immediately before "Our R&D Team".                                                                                                                                                                                                   |
| K061 | `c2-moonshot-k3-licence`                         | A snapshot of the LICENSE file at the 27 July 2026 commit, which defines the software to include weights and code; the commit does not date an initial release. The definition is added as a quotation.                                                                    |
| K062 | `c2-moonshot-k3-licence-maas`                    | The statement restores the licensee-or-affiliate operator and the aggregate revenue of the licensee and its affiliates; the qualification gives the defined-business exclusions and the Section 4 exemptions.                                                              |

A material finding expands checking to the affected family of records (editorial policy). The same corrections were therefore applied wherever the same defect occurred:

- **Joined fields.** 29 pack evidence items joined separate fields of a page (title, credit, arXiv stamp, header lines, metadata fields, a licence heading and its copyright line, a prospectus table's month cell and its text, a cover's name and date). Each field is now its own quotation, with its own locator; every part is contained in the passage the pack matched twice.
- **Ellipses for control characters.** All six quotations from the framework 2.0 PDF had the same extraction convention as K047. They were re-extracted at admission from a direct retrieval of the PDF with the pack's SHA-256, without the ellipses and with the compatibility forms normalised (风, 见).
- **Commit dates as release dates.** The Kimi K3 model card and the MiniMax M3 licence records are reworded like K061: a commit dates the inspected file, not a release. The Kimi K2 licence record names the initial commit, like K040.
- **K048.** The MiniMax M2 record now gives the initial Apache 2.0 commit as 25 October 2025, 21:28 UTC (26 October in UTC+8), as the cross-family check found.

## Admission's own fixes

- **ERNIE (2019) stamp.** The pack's locator named the arXiv stamp, but its passage did not contain it. The stamp was read from a direct retrieval of the version 1 PDF with the pack's SHA-256 and added as evidence.
- **Schema fit.** The pack's date basis `filing` is not a schema value; filings are dated with basis `publication` and say "filing date" in the note. Snapshot times carry no basis. The pack's `stage: announced` on two announcement records is not allowed on `published`; "announced, not realised" stays in their statements and time notes.
- **Reader text.** Record IDs in pack wording ("the existing record …") were replaced by "recorded separately".
- **Archive captures.** The cross-family check located Internet Archive captures for six mutable sources: the two Baidu press releases, the CAICT post, the itcloudbd and People's Daily reproductions, and the CAC release notice of framework 2.0. Their sources now link them, with the capture date. The MiniMax M3 capture is at a different host name and is not linked.
- **Verification at admission.** Every PDF and licence re-read at admission (ERNIE, ERNIE 2.0, ERNIE 3.0 Titan, ERNIE 5.0, Seed-Thinking-v1.5, Seed1.5-VL, Seed-Coder, Seed-X, Seed1.8, Seed2.0, Kimi K2 report, framework 2.0, Kimi K3 LICENSE) had the SHA-256 recorded in the pack.

## Release

Dataset release **v0.10.0**, a minor release. Under [docs/dataset-format.md](../docs/dataset-format.md#versions), a new collection raises the minor version and small additions within an existing collection are a patch. The Chinese AI histories are documented as bounded collections ([china-atlas.md](../docs/china-atlas.md)), and this second collection adds 118 claims for four further institutions and three governance texts; it is not a small addition to the first. There is no schema change and no new release-format collection definition.

## Merge with main, 2026-10-27

The branch was first built on main at `c215ab0` (schema 2.17) and released as v0.9.0. Main then merged the author-person admission (#75, v0.8.1) and the paraphrased comparison questions (#76, schema 2.18, v0.9.0), each with its own before-snapshot. The branch merged `origin/main` at `1f92cd5` and was regenerated, not hand-merged:

- **Data:** main's data files, then `scripts/china-labs-2-admission.ts` re-run on them. The added IDs and the eight changed entities are the same as before; the records pass the quotation-limit check against main's evidence.
- **Before-snapshot:** rebuilt against main's data: its metadata and SHA-256 hashes are those of the post-#76 dataset, its base commit is `1f92cd5`. It stays first in the historical-views chain, before main's comparison and author-person snapshots.
- **Release:** this branch's earlier v0.9.0 was dropped; main's v0.9.0 is kept byte for byte. The admission is released as **v0.10.0** (470 added, 8 changed against main's v0.9.0), and the release changelog lists v0.8.1, v0.9.0 and v0.10.0. The README coverage block was regenerated with `pnpm docs:coverage`.
- **Tests:** the dossier-count helper and the transaction and version tests exclude both the `ap-` and the `c2-` records.

## Checks

- `pnpm tsx scripts/china-labs-2-admission.ts --check`: the stored records match the pack and the map.
- `pnpm check` (format, lint, typecheck, unit tests, build with pre-rendered pages), `pnpm check:privacy`, `pnpm test:browser` and `pnpm release 0.10.0 --check` (after the merge; `pnpm release 0.9.0 --check` refuses by design because the data has changed since v0.9.0, which the test suite checks from its own records); results are in the hand-off report of this branch.
- Pre-rendered pages exist for the new organisations and documents, among them `/dossier/moonshot-ai`, `/dossier/minimax`, `/dossier/baidu` and `/dossier/bytedance-seed`.

## Open leads

- **Commitments collection.** The AIIA AI Safety Commitments could join the external commitments collection, which would show their signatories beside the Seoul, White House and EU texts. That changes a collection definition and was not part of this admission.
- **Framework history.** The three TC260 framework versions could form a document history. The frontier safety frameworks collection is for developers' own frameworks, so they were not added to it.
- **Deferred institutions.** StepFun, 01.AI and Tencent Hunyuan; the July 2025 Chinese AI safety commitment framework; the later batch of AIIA signatories; the Chinese edition of the Shanghai AI Laboratory framework.
- **Unreconciled dates.** ERNIE 3.0 Titan's arXiv date (December 2021) and the 20-F's release year (2022) stay in one record, unreconciled. The Seed-Coder licence metadata change (apache-2.0 to mit on 6 May 2025) stays in one record.
- **Retrieval gaps.** The ERNIE 4.5 technical report on yiyan.baidu.com, a Chinese-language Baidu original of the ERNIE Bot launch, and contemporaneous captures of the 2026 pages.
