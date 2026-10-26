# Admission of the lab genealogy, 2026-10-17

The maintainer decided on 2026-10-16/17 to admit the candidate pack [`research/lab-genealogy/`](../research/lab-genealogy/README.md), by lab family and for all families, after its two cross-family checks ([C001–C032](../research/lab-genealogy/gpt-check-2026-10-16.md), [C033–C213](../research/lab-genealogy/gpt-check-2026-10-16-part2.md); 182 agree, 31 partly, 0 disagree, 0 motive flags). It was admitted the same day as schema 2.15. Machine work, not human review: every record is a machine-checked seed.

- Script: [`scripts/genealogy-admission.ts`](../scripts/genealogy-admission.ts) (`--check` compares the stored rows with the pack and the map).
- Authored map: [`genealogy-admission-map-2026-10-17.json`](genealogy-admission-map-2026-10-17.json): records held back, the disposition of every "partly" finding and its widened applications, shortened passages, subtypes the pack left out, and the updates to existing records.
- Before-snapshot: [`genealogy-admission-before-2026-10-17.json`](genealogy-admission-before-2026-10-17.json), first in the chain in `src/editorial/historical-views.ts`; the exact-view test reproduces the dataset at main `1d17923`.
- Schema 2.15 and its rules: [ontology](../docs/ontology.md#lab-genealogy-founding-dates-agreements-disbanded-units-and-stated-reasons-schema-215); release format 1.6: [dataset format](../docs/dataset-format.md).

## Decisions applied

1. **By lab family, all families.** Existing person and organisation entities are reused (72 of the pack's 308); the pack's 236 proposed entities are added. Ten existing sources are reused where the pack read the same document.
2. **Schema 2.15.** Predicates `founding_stated` (organisation → the date as the source words it), `licensing_hiring_agreement` and `unit_disbanded`; claim attribute `statedReason` (`by`, neutral `text`, `evidenceId`); `activityStage: announced` allowed on personnel and organisational records, so announced stays announced; evidence field `retrievalRoute`. Validation and tests in `src/domain/schema.ts` and `src/domain/genealogy-admission.test.ts`. Release format 1.6 adds `retrievalRoute` to the export.
3. **Reader relay and X syndication** are accepted for evidence. Every admitted passage records its route (`direct` 475, `reader_relay` 153, `x_syndication` 46), shown in the Evidence Inspector ("How it was read"), on the source's version line and as a mark on the record row.
4. **Records with no primary supporting passage** (131 admitted) are admitted and marked "Rests on reporting" on person and organisation pages and in the Inspector. The mark is derived from the evidence, never stored.
5. **Roles from undated company pages** stay as snapshots dated to the retrieval day (15 October 2026); the time note says so.
6. **The TechCrunch title naming a health reason** is kept as the source title (bibliographic data). No statement, qualification, role or note repeats the reason; the script checks this for every record citing that article.
7. Branch history: resolved before this task.
8. **Cross-family findings applied** (below); C087 and C109 admitted, C170 held back.
9. **Existing records touched by new evidence** updated (below); no history deleted and no departure inferred.

## What was admitted

| Item                                                  | Count |
| ----------------------------------------------------- | ----: |
| Pack records                                          |   477 |
| Admitted records (claims)                             |   472 |
| Held back                                             |     5 |
| Admitted passages (evidence rows; one more on Kreps)  |   673 |
| New entities (183 people, 53 organisations)           |   236 |
| New sources                                           |   209 |
| Reused sources                                        |    10 |
| Records resting on reporting                          |   131 |
| Records with stage announced                          |    75 |
| Records with a stated reason                          |    13 |
| Existing rows changed (1 claim, 1 entity, 10 sources) |    12 |

By predicate: `held_role` 273, `co_founded` 89, `departure_announced` 56, `founding_stated` 21, `unit_of` 15, `licensing_hiring_agreement` 4, `unit_disbanded` 3, `combined_into` 3, `has_legal_form` 2, `launched` 2, `name_transition_announced` 2, `acquired` 2.

By lab family (a record counts for the family of the organisation it is about; roles at universities and companies outside the named families are "prior and other"):

| Lab family                                                       | Records | On reporting | Announced | Stated reason |
| ---------------------------------------------------------------- | ------: | -----------: | --------: | ------------: |
| Google: DeepMind, Google Brain and Google DeepMind               |      65 |            9 |        12 |             1 |
| OpenAI                                                           |     102 |           15 |        27 |             6 |
| Anthropic                                                        |      42 |            2 |         8 |             5 |
| Meta: FAIR, generative AI and Meta Superintelligence Labs        |      32 |           20 |         5 |             0 |
| xAI                                                              |      28 |           20 |         3 |             0 |
| Microsoft AI and Inflection AI                                   |      14 |            0 |         4 |             0 |
| Character.AI                                                     |      10 |            5 |         3 |             0 |
| Adept and the Amazon AGI SF Lab                                  |       3 |            0 |         2 |             1 |
| Windsurf                                                         |      11 |            3 |         3 |             0 |
| Mistral AI                                                       |       7 |            0 |         0 |             0 |
| Safe Superintelligence (SSI)                                     |       1 |            0 |         0 |             0 |
| Thinking Machines Lab                                            |      12 |            7 |         1 |             0 |
| Cohere                                                           |       6 |            0 |         0 |             0 |
| AI21 Labs                                                        |       7 |            3 |         1 |             0 |
| Reka                                                             |       5 |            3 |         0 |             0 |
| Sakana AI                                                        |       7 |            0 |         0 |             0 |
| Essential AI                                                     |       4 |            0 |         0 |             0 |
| AMI Labs                                                         |       4 |            2 |         1 |             0 |
| Discovery Loop                                                   |       5 |            0 |         0 |             0 |
| Reflection AI                                                    |       3 |            3 |         0 |             0 |
| Periodic Labs                                                    |       2 |            2 |         0 |             0 |
| Physical Intelligence                                            |       2 |            0 |         0 |             0 |
| H Company                                                        |      10 |            8 |         0 |             0 |
| Poolside                                                         |       2 |            0 |         0 |             0 |
| Magic                                                            |       2 |            0 |         0 |             0 |
| Imbue                                                            |       3 |            0 |         0 |             0 |
| Apple (foundation models)                                        |       3 |            1 |         1 |             0 |
| DeepSeek / 深度求索                                              |       1 |            1 |         0 |             0 |
| Zhipu AI / 智谱                                                  |      11 |            0 |         0 |             0 |
| Moonshot AI / 月之暗面                                           |       6 |            4 |         0 |             0 |
| MiniMax                                                          |       5 |            0 |         0 |             0 |
| Baichuan Intelligence / 百川智能                                 |       2 |            0 |         0 |             0 |
| 01.AI / 零一万物                                                 |       6 |            0 |         0 |             0 |
| StepFun / 阶跃星辰                                               |       8 |            8 |         0 |             0 |
| ByteDance Seed / 字节跳动 Seed                                   |       5 |            3 |         0 |             0 |
| Tencent / 腾讯                                                   |       3 |            3 |         0 |             0 |
| Baidu / 百度                                                     |       5 |            4 |         0 |             0 |
| Shanghai Artificial Intelligence Laboratory / 上海人工智能实验室 |       1 |            0 |         0 |             0 |
| Alibaba: Qwen Team, Tongyi and Token Foundry                     |       9 |            4 |         3 |             0 |
| Prior and other organisations                                    |      18 |            1 |         1 |             0 |
| **Total**                                                        | **472** |      **131** |    **75** |        **13** |

How the pack became records:

- **IDs** are the pack's (`lg-…` claims, evidence and new sources); reused sources keep their dataset IDs.
- **Admission rule.** Every admitted passage matched both the drafting retrieval and the fresh retrieval of 2026-10-15 in `verification.json` (673 of 678). The five that did not are the held-back records.
- **Evidence notes** say what matched (the quotation, or the paraphrase's verbatim anchor, which is quoted in the note), the route, that matching normalised typography (so curly or straight quotation marks, apostrophes and compatibility forms such as ⾬/雨 can differ from the source, as the cross-family checks noted for C023, C024, C045, C108, C120, C126, C128, C129 and C203), whether the record was in the cross-family check and with what verdict, and that no human reviewed it.
- **Reader-facing text.** Pack record IDs in qualifications, time notes and role labels (57 fields) were replaced: cross-references now read "recorded separately", a source named by ID is named by its title and publisher, and pack wording ("this pack", "proposed predicate", "drafted") was rewritten. The script fails if a record ID is left.
- **`destination`** (one record, Tulloch) has no schema field; the destination stays in the statement.
- **Name announcements** (Codeium → Windsurf, xAI → @spacexai) take the dataset's announcement-only scope and an announcement-dated event.
- **Author lists.** Sources without credited authors take the publisher as the author; "et al." is dropped from two paper sources, whose version line says the list is abbreviated. Simple two-word personal names are split for citation; others are left unsplit.
- **Very short X posts.** Two posts have no text block of ten words, so no length is recorded; each carries only a paraphrase anchor of one or two words and no quotation.

## Quotation limits

Quotations and paraphrase anchors were counted per source together with the dataset's existing quotations (CJK characters counted one word each, stricter than the schema), under the policy limit: about 10% under 2,000 words, otherwise max(400, 5%), never above 800. No record was held back for the limit; nine passages were shortened instead, each to wording inside the checked passage, and their evidence notes say so:

| Source                                                                              | Passages shortened                                                                                                                |
| ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Anthropic, The Long-Term Benefit Trust (1,937 words, limit 193; 102 already quoted) | Fontaine and Cuéllar start-month quotations → paraphrases with short anchors; Shah, Bahl (×2) and Robinson (×2) anchors shortened |
| The Paper, Baidu reorganisation (873, limit 87)                                     | Jia Lei quotation → paraphrase with anchor 由贾磊负责                                                                             |
| The Paper, Alibaba reorganisation (694, limit 69)                                   | Zhou Jingren quotation → paraphrase with anchor 周靖人将担任阿里巴巴首席科学家                                                    |

The stated-reason quotations (Matheny, Bahl, Robinson) keep their full wording. The Trust page's length stays the dataset's 1,937 words, although the pack counted 2,118 on the live page; using the larger count would have raised the limit to 400, which is the maintainer's call.

## Held back

| Record                                  | Item | Reason                                                                                                                            |
| --------------------------------------- | ---- | --------------------------------------------------------------------------------------------------------------------------------- |
| `lg-deal-luan-cofounded-adept`          | C170 | Adept's launch post: the fresh retrieval of 2026-10-15 got a block page, and the cross-family check could not retrieve it either. |
| `lg-deal-vaswani-cofounded-adept`       | —    | Same source only; same rule.                                                                                                      |
| `lg-deal-parmar-cofounded-adept`        | —    | Same source only; same rule.                                                                                                      |
| `lg-deal-luan-google-prior`             | —    | Same source only; same rule.                                                                                                      |
| `lg-deal-luan-openai-engineering-prior` | —    | Same source only; same rule.                                                                                                      |

Decision 8 names C170; the four other records rest on the same post with the same failed fresh retrieval, so the same rule was applied to them (the conservative reading). Niki Parmar's entity now rests on her Essential AI sources. The other Adept records (the 2024 Amazon agreement and its stated reason) rest on Adept's 2024 update and are admitted.

**C087** (Mobile World Live on Rob Fergus) and **C109** (OpenAI on Vijaye Raji) are admitted: both their quotations matched the drafting and the fresh retrievals in `verification.json`. Their evidence notes record that the cross-family check could not retrieve the pages.

## Dispositions of the "partly" findings

| Item | Record                                          | Disposition                                                                                                                                                                                                                                                              |
| ---- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| C003 | `lg-oai-founding-stated-2015`                   | Ancillary launch date (11 December 2015) removed from the time note.                                                                                                                                                                                                     |
| C019 | `lg-new-mensch-deepmind-2022`                   | Qualification adds the 2023 copyright line of the currently served v1 PDF and that the elided quotation joins non-adjacent fragments; no title inferred. The elided quotation is kept: elision marked with ellipses is the dataset's convention (121 existing passages). |
| C021 | `lg-gc-wu-yonghui-google-deepmind-2023`         | Open interval from 2023 → year snapshot of the reported promotion.                                                                                                                                                                                                       |
| C022 | `lg-gc-zhu-wenjia-bytedance-llm-2023`           | Open interval from 2023 → year snapshot.                                                                                                                                                                                                                                 |
| C030 | `lg-new-dautume-reka-cto-2023`                  | Text locator “CTO Cyprien de Masson d'Autume”.                                                                                                                                                                                                                           |
| C031 | `lg-new-tay-reka-chief-scientist-2023`          | Text locator, also on `lg-new-tay-reka-cofounder` (same passage).                                                                                                                                                                                                        |
| C032 | `lg-new-yogatama-reka-ceo-2023`                 | Text locator “CEO Dani Yogatama”.                                                                                                                                                                                                                                        |
| C034 | `lg-gs-hendrycks-xai-adviser-2023`              | Uncited conference-page sentence removed.                                                                                                                                                                                                                                |
| C040 | `lg-oai-murati-cto-return-2023`                 | Uncited interim-CEO clause removed.                                                                                                                                                                                                                                      |
| C042 | `lg-gc-yao-shunyu-openai-2024`                  | Open interval from 2024 → year snapshot of the reported joining.                                                                                                                                                                                                         |
| C044 | `lg-oai-fidji-simo-board-2024`                  | Uncited "election" clause removed from the time note.                                                                                                                                                                                                                    |
| C049 | `lg-gs-superalignment-team-absorbed-2024`       | Event at the report date → snapshot at the report date.                                                                                                                                                                                                                  |
| C053 | `lg-gs-candela-openai-preparedness-2024`        | Obsolete passage → text locator (second paragraph); elided Engadget quotation kept, its note names the elision.                                                                                                                                                          |
| C055 | `lg-gs-madry-openai-reassigned-2024`            | Apostrophe set to the source's straight form; OpenAI statement passage → text locator “Madry will still work”.                                                                                                                                                           |
| C085 | `lg-gs-candela-preparedness-stepdown-2025`      | Naming passage → text locator.                                                                                                                                                                                                                                           |
| C087 | `lg-mx-fergus-fair-head-2025`                   | Admitted (both retrievals matched); retrieval failure of the check recorded in the notes.                                                                                                                                                                                |
| C105 | `lg-deal-chen-windsurf-departure-2025`          | Windsurf passage → text locator “We’re excited to announce”, also on the Mohan record.                                                                                                                                                                                   |
| C106 | `lg-deal-google-windsurf-agreement-2025`        | Same text locator.                                                                                                                                                                                                                                                       |
| C109 | `lg-oai-raji-cto-applications-2025`             | Admitted (both retrievals matched); the check's retrieval failure and its confirmation of title and date from OpenAI's news feed recorded in the note.                                                                                                                   |
| C115 | `lg-gc-wang-haifeng-baidu-cto-2025-11`          | “Technology Steering Committee” expansion removed; the qualification says the report names it only as TSC.                                                                                                                                                               |
| C121 | `lg-cn-yun-yeyi-minimax-coo-2025`               | Qualification narrowed to the biography cited; it no longer says the filing gives no start date. The service date in the accountant's report (printed I-37) is not added: it was not retrieved at admission.                                                             |
| C131 | `lg-mx-wu-xai-departure-2026`                   | UTC date kept; the qualification says “today” is read relative to it and the author's time zone is unknown.                                                                                                                                                              |
| C137 | `lg-gc-li-feifei-alibaba-cloud-cto-2026`        | Recorded as inferred, with premises; the statement no longer puts the title next to the name; the machine-generated page summary is noted as unused.                                                                                                                     |
| C142 | `lg-gc-sun-tianxiang-baidu-bmu-2026`            | Model-committee (BMC) membership removed from the statement (no passage cited for it).                                                                                                                                                                                   |
| C147 | `lg-gs-jain-openai-interim-safety-systems-2026` | Uncited Engadget sentence removed.                                                                                                                                                                                                                                       |
| C151 | `lg-gw-weng-openai-return-2026`                 | Second passage → text locator “According to a company spokesperson”.                                                                                                                                                                                                     |
| C170 | `lg-deal-luan-cofounded-adept`                  | Held back (see above).                                                                                                                                                                                                                                                   |
| C175 | `lg-goo-le-cofounded-discovery-loop`            | Uncited exact announcement date removed from the time note.                                                                                                                                                                                                              |
| C186 | `lg-gw-kantor-cofounded-h-company`              | Kantor passage → text locator “It has managed to raise”, on the three records quoting it.                                                                                                                                                                                |
| C201 | `lg-mx-nordeen-cofounded-xai`                   | Locator → the paragraph on Nordeen's background.                                                                                                                                                                                                                         |
| C208 | `lg-new-metz-tml-cofounder`                     | Locators corrected to paragraphs 5 and 6.                                                                                                                                                                                                                                |

**Widened applications** (the same finding applied to records outside the checked sample):

- Interval → snapshot where only a joining is documented: `lg-gc-jingren-zhou-alibaba-joined-2015` (“joined in 2015”) and `lg-gw-cloix-h-company-ceo` (“becomes CEO”, 2025). Intervals whose source states a start (“since”, “从…起”, “至今”) or both bounds are kept.
- Report-dated event → snapshot for a disbanded unit: `lg-gs-mission-alignment-team-disbanded-2026`. The AGI Readiness record stays an announcement-dated event with stage announced (a statement of a planned change).
- Locators: the same corrected locator on every record quoting the same passage (Reka, Windsurf, Obsolete, TechCrunch on H).

Not changed: the other Windsurf passages located as "Paragraph 4" (Moreno, Wang) and TechCrunch's Zoph passage ("Paragraph 2"), which the checks did not examine; the current copies may number paragraphs differently (follow-up).

## Existing records updated (decision 9)

- **Jay Kreps** (`cs-kreps-anthropic-board-2024`): the qualification now says that the board list on Anthropic's Company page retrieved on 15 October 2026 does not include him, that no departure statement was found and that none is inferred; a context passage from that page is added. The 2024 snapshot and its evidence are unchanged.
- **Ben Mann**: not an existing record. His new co-founder record (`lg-ant-mann-cofounded`) rests on the 2024 Anthropic founder slide and its qualification says that the Leadership page retrieved on 15 October 2026 does not list him among its co-founders and that no withdrawal of the credit was found.
- **Tang Jie** (`tang-jie`): the description now says that Zhipu's prospectus of 30 December 2025 describes Tang Jie as a co-founder (recorded separately) and that the earlier records infer no corporate role; the prospectus is added to the entity's sources. The existing Tsinghua and ChatGLM records are unchanged.

## App (minimum)

- New predicates have labels (`is stated to have been founded in`, `made a licensing and hiring agreement with`, `ended as a unit of`) wherever predicates are shown, and map to the people relation family.
- Record rows on person pages, institutional dossiers and shared reading rows show marks: **Announced**, **Rests on reporting**, **Read through a reader relay**, **X syndication text**.
- A stated reason appears collapsed under its record, labelled with who stated it and the source, as "not a finding about why it happened"; the Evidence Inspector shows it too, with a "Rests on reporting" note and, per passage, "How it was read".
- `src/domain/genealogy.ts` derives these marks; no React in the domain code.

## Follow-ups

- The "who went where" reading page, lab-family sections on dossiers ("People and founding") and next/previous organisation links on person pages ([app-proposal](../research/lab-genealogy/app-proposal.md)) are not built; navigation is unchanged.
- Lab families are the pack's grouping, used here for counting only; they are not stored.
- Retrieve Adept's launch post again (or an archive copy) to decide on the five held-back records.
- Recheck the paragraph locators the checks did not examine on pages whose current copies changed (Windsurf, TechCrunch on Thinking Machines).
- The Trust page's length (1,937 words in the dataset, 2,118 counted by the pack on the live page) decides its quotation limit.
- C121: add the accountant's-report service date (MiniMax prospectus, printed I-37) as its own passage if wanted.
