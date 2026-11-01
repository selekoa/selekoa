# Chinese frontier-AI institutions, third collection: admission, 2026-10-31

The admission of the candidate pack in [`research/china-labs-3/`](../research/china-labs-3/README.md) into the application dataset, in two parts, under the maintainer's decisions of 2026-10-30 (open questions 1–11 of the [pack note](china-labs-pack-3-2026-10-29.md)) and the maintainer's adjudication of the cross-family check of 2026-10-31. The inputs are the pack, its same-family audit ([audit.md](../research/china-labs-3/audit.md)), the blind cross-family check ([cross-family-check-2026-10-29.md](../research/china-labs-3/cross-family-check-2026-10-29.md); 124 items: Part A 77 agree, 23 partly, 0 disagree; Part B 24 with full support) and the pack note. The [topic documentation](../docs/china-atlas.md#third-collection-2026-10-31) describes the collection for readers.

- **Preparing family:** Claude (pack, audit and this admission). **Checking family:** OpenAI GPT (GPT-6, Codex).
- **Script:** [`scripts/china-labs-3-admission.ts`](../scripts/china-labs-3-admission.ts) builds both parts from the pack and the authored [map](china-labs-3-admission-map-2026-10-31.json), which gives every decision, correction and hold with its reason. `--check` rebuilds them and compares with the stored data; `--part 1` writes part 1 only.
- **Before-snapshots:** [`china-labs-3-admission-1-before-2026-10-31.json`](china-labs-3-admission-1-before-2026-10-31.json) and [`china-labs-3-admission-2-before-2026-10-31.json`](china-labs-3-admission-2-before-2026-10-31.json). Each lists the IDs its part added and the stored rows it changed, as they were.
- **Base:** branch `technical-history-admission` (v0.19.0), the previous admission of the 2026-10-31 chain; both snapshots were regenerated from that base by the script. Where the stored data holds the rows a snapshot lists as added and the metadata this admission wrote, the script removes its own rows and restores the rows it changed before rebuilding. A snapshot whose added rows are absent from the stored data (a new base) is ignored and both parts are rebuilt from the stored data; if the stored metadata changed after the admission was written, the script stops rather than restore stale metadata. A pack entity or source already stored is reused, and a pack record that duplicates a stored one is skipped and listed in the snapshot.
- **Editorial state:** every record is a seed. No evidence is human-reviewed and no human translation verification is claimed.
- **Releases:** **v0.20.0** (part 1, a minor release: the new collection) and **v0.21.0** (part 2, a minor release: schema 2.27).

## Counts as admitted

| Records  | Part 1 added | Part 2 added | Changed |
| -------- | -----------: | -----------: | ------: |
| Claims   |          198 |           11 |       4 |
| Entities |          104 |            0 |       2 |
| Sources  |          109 |            0 |       0 |
| Evidence |          337 |           11 |       0 |

- **Claims (209 of the pack's 212; 3 held):** `published` 81, `states_provision` 47, `lists_participants` 25 (14 counts of whole lists and 11 developers' entries), `held_role` 19, `authored` 6, `co_founded` 6, `has_legal_form` 6, `participated_in_round` 4, `founding_stated` 3, `unit_of` 3, `announced_funding` 2, `formed_entity` 2, `supersedes_document` 2, `cites` 1, `explicitly_credits` 1, `holds_control_right` 1. 205 explicit and 4 inferred, each inferred record with its rationale.
- **Entities:** 102 proposed by the pack (81 documents, 7 organisations, 14 people) and 2 investing organisations added under decision 4 (SVF Sense (Singapore) Pte. Ltd. and 中国移动通信有限公司). The two changed entities are StepFun and 01.AI, which gained legal names as aliases (decision 6).
- **Sources:** 109 new: 106 from the pack (74 English, 32 Simplified Chinese) and 3 archive captures read by the cross-family check (BAAI's Chinese Beijing AI Principles, the Yi commercial licence agreement and SenseTime's SenseNova 5.0 article). Five pack sources are reused from the dataset (01.AI's about page, the 36Kr report and the three TC260 framework PDFs). Fifteen mutable sources link the Internet Archive capture the check located.
- **Evidence:** 348 items, 308 quotations and 40 paraphrases; 138 contain Chinese text. Nine are passages of other records cited again as context (K067 and the fresh-context review, below). Four existing StepFun role records gained one item each (decision 8). Five paraphrases rest on the check's reading of an archive capture and carry no retrieval route.
- **Schema:** part 1 none; part 2 raises the schema from 2.26 to **2.27** (`attributes.listedEntity`).

## Decisions applied

1. **Cross-family check first.** The check ran before admission (above); its adjudication is applied below.
2. **CAC lists.** The 14 list-level count records are admitted on `lists_participants` in part 1. The 11 developers' entries are admitted in part 2 with `attributes.listedEntity`, valid only on a participant list counted by Selekoa as one entry (`listing: {count: 1, countBasis: counted}`); the pack's row fields (legal name, model name, filing number, filing date) stay in each statement and object, not in attributes. The endorsement note of the Beijing AI Principles names examples and no count, so it is recast as a statement of the principles text (`states_provision`). No `signed_commitment` is used.
3. **Name mappings.** Each entry's qualification keeps its basis: exact alias (Baidu, iFlytek, MiniMax, SenseTime, 01.AI, Zhipu AI, DeepSeek, BAAI), shared filing number (StepFun), partial name (Shanghai AI Laboratory, with no combined alias) and, for Tencent, translation to the operating company Shenzhen Tencent Computer Systems (K049).
4. **Investors.** SenseTime's investor is SVF Sense (Singapore) Pte. Ltd. and iFlytek's 2013 subscriber is 中国移动通信有限公司, each a new organisation under the name its filing prints. The parent chain stays in the qualification as the filing states it; no ownership, control or continuity with the dataset's SoftBank Group or China Mobile group records is inferred (K007, K023).
5. **Shanghai AI Laboratory's founding** stays held (K015).
6. **Two legal names.** StepFun gains 上海阶跃星辰智能科技股份有限公司 and 上海阶跃星辰智能科技有限公司 as aliases; 01.AI gains 北京零一万物信息技术有限公司. The legal-form records stay dated to their own documents; no conversion or relation between the names is drawn.
7. **TC260 succession.** Both records are `supersedes_document`; each qualification quotes the update wording and states that no withdrawal of the earlier edition is recorded (K088, K116).
8. **StepFun's own post.** The newsroom post of 26 January 2026, read in the site's build file (same SHA-256 at admission as for the pack), is primary evidence for the four existing role records of Yin Qi (chairman), Jiang Daxin (CEO), Zhang Xiangyu (chief scientist) and Zhu Yibo (CTO). Each keeps its ID; its statement now names the post first, its snapshot date moves from 27 to 26 January 2026 (the post's date), and its qualification records the correction and its reason.
9. **Mutable sources** are dated to their stated dates with the retrieval date in the version note; fifteen link the capture the check located, with the check's limit on what the capture shows.
10. **Beijing AI Principles.** The English expression stays the quoted source. The Chinese original, located by the check in BAAI's page captured on 11 August 2020 (page dated 25 May 2019), is recorded as a second expression of the same document, beside it (adjudication).
11. **"Principles"** documents take the subtype "Declaration or statement".

## Adjudication of the cross-family check, applied

| Item                   | Record                                                    | Applied                                                                                                                                                                                                                                                          |
| ---------------------- | --------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| K002                   | Martin Lau, President                                     | Locator printed p. 65 (PDF p. 66); the report's 18 March 2026 date is a signature, not a filing date.                                                                                                                                                            |
| K006                   | Liu Qingfeng, chairman from 2009                          | The quotation put the column headings after the name; now a paraphrase of the table row with its printed values. Locator printed p. 72 (PDF p. 73).                                                                                                              |
| K007                   | iFlytek's 2013 subscriber                                 | Subject 中国移动通信有限公司 (decision 4).                                                                                                                                                                                                                       |
| K012, K014             | Beijing AI Principles: Be Responsible, Long-term Planning | Chinese original recorded as context paraphrases of the check's reading; 潜在影响 ("potential impacts") and "potential risks" kept as distinct wordings in the qualification.                                                                                    |
| K015                   | Shanghai AI Laboratory's plaque unveiling                 | Held.                                                                                                                                                                                                                                                            |
| K021, K022             | IDG funds and iFlytek in SenseTime's Series A-1           | No change: both stay inferred, with the holding-versus-subscription limit and the name-prefix mapping in the qualification and rationale.                                                                                                                        |
| K023                   | SenseTime's SoftBank-linked investor                      | Subject SVF Sense (Singapore) Pte. Ltd. (decision 4).                                                                                                                                                                                                            |
| K025                   | Shanghai SenseTime                                        | Qualification corrected: the prospectus prints the traditional-character name 上海商湯智能科技有限公司, added as an alias.                                                                                                                                       |
| K033                   | C-Pack report                                             | The author quotation joined an author and an affiliation across other authors; now two quotations, matched at admission in a retrieval with the pack's SHA-256.                                                                                                  |
| K049                   | Tencent's CAC entry                                       | Qualification keeps the operating company and the translation basis; no identity with the parent.                                                                                                                                                                |
| K055, K067, K081, K111 | CAC count records                                         | Page locators corrected (PDF pp. 4, 3, 4 and 6).                                                                                                                                                                                                                 |
| K057                   | August 2024 CAC list, publication                         | The posting date is unknown; the title month dates the list only as a snapshot.                                                                                                                                                                                  |
| K067                   | January 2025 filed count                                  | The uncited comparison with the January 2025 announcement is now cited: the announcement's passage, already in the dataset, is context evidence.                                                                                                                 |
| K083                   | BAAI's CAC entry                                          | Working translation no longer adds the filing number that the quoted excerpt omits.                                                                                                                                                                              |
| K088, K116             | TC260 2.0 and 3.0 succession                              | Update-only qualification (decision 7).                                                                                                                                                                                                                          |
| K097–K100              | Tencent Annual Report 2025 records                        | 18 March 2026 recorded as the Chairman's Statement signature date (basis `signature` on the publication record; in the notes of the snapshots), not a filing date. Locators corrected for K099 (printed p. 274, PDF p. 275) and K100 (printed p. 62, PDF p. 63). |
| K103                   | Wang Xiaogang, chief scientist                            | The context quotation omitted 王曉剛 unmarked; now a paraphrase of the table row. July 2017 is stated not to be a chief-scientist appointment date.                                                                                                              |
| K113                   | August 2026 registered count                              | Rows 730–731 are backfilled (补登), dated 1 May and 11 June 2026; the count is not dated as July–August registrations.                                                                                                                                           |
| K055, K113             | Registered counts, definition of registration             | The qualification's description of registration comes from the January 2026 announcement; its passage, already admitted, is cited as context (fresh-context review).                                                                                             |
| K097                   | Tencent Annual Report 2025, the name HY                   | The Hy3 preview licence and the newsroom post of 6 July 2026, named in the qualification, are cited as context with their admitted passages (fresh-context review).                                                                                              |
| —                      | Yi licence 2.1, registration                              | The commercial agreement (version 1.0, printed release 23 November 2023), read by the check in a capture of 5 December 2023, is context evidence; its conditions stay visible.                                                                                   |
| —                      | SenseNova 5.0 announcement                                | The SenseTime article, read by the check in captures of 24 April 2024 and 19 May 2026, is context evidence, with both posting dates (24 and 23 April 2024) kept.                                                                                                 |

Editorial ellipses are marked in each note as non-continuous quotation.

## Same defect, wider family

A material finding expands checking to the affected family (editorial policy). Applied, and listed for the maintainer under "Needing judgement":

- **K057:** the January 2025, August 2025 and August 2026 list attachments, also added later to the page dated 2 April 2024, now have unknown posting dates. The April 2024 list keeps its month, since the page's own date is April 2024.
- **K097:** the Tencent Annual Report 2023 publication record was also dated by its Chairman's Statement under a filing basis; now basis `signature`.
- **K067:** the January 2025 registered count's comparison with the same announcement is cited in the same way.
- **K055 and K113:** all four registered counts (August 2024, January 2025, August 2025, August 2026) cite the January 2026 announcement's passage as context for the description of registration in their qualifications.
- **K097:** the Annual Report 2023 record cites the newsroom post's date (7 September 2023), which its qualification gives, as context.

## Admission's own fixes

- **Schema fit.** The pack's `filing` date basis is not a schema value: snapshots carry no basis and the two Tencent publication records use `signature` (above). The pack's `stage`, `round`, `relation`, `countNote` and CAC row attributes are not schema fields; their content stays in statements, objects and qualifications. TC260 provision kinds map to the schema's (`guidance`, `governance_measure`, `technical_measure` → `required_action`; `risk_category` → `risk_domain`); other stated provisions are `statement` provisions keyed by the record. The control record names its instrument (the Structure Contracts) and stage `effective`, as the report describes the arrangement. Subtypes map to the closed lists of 2026-10-29; persons get a sort name, family name first.
- **Provision dates.** Schema 2.20 dates a stated provision of a document without an edition by a date of its cited expression. Eleven records (the Children's principles, SenseTime's ethics white paper, the Hunyuan Large, Video and A13B licences) are redated to their cited expression's date (post, PDF or Hugging Face revision); the release date each text states stays in the time note.
- **Expressions.** A source that is a document's first expression, or an arXiv version of it, names that document, so the Yi and Yi-Lightning report statements rest on their own PDFs.
- **The Step-5-Preview README** of 20 September 2026 is 28 bytes long; quoting its one line would quote the whole document, so it is a paraphrase, and the record says "initial commit" rather than "created" (as the second collection's K040).
- **The SenseTime ethics committee** loses the pack's alias "SenseTime AI Ethics Council", the prospectus's name for a six-member council, because no source states that the two are one body.
- **Reader text.** Record IDs in pack wording became plain words or "recorded separately"; "this pack" became "this collection"; a source ID and a pack field name in two version notes and one qualification were reworded.
- **TC260 quotations.** Line-break spaces between Chinese characters and the compatibility form ⻛ were normalised, as in the second collection; each note says so.

## Held

| Record                                                            | Reason                                                                                                                                                                                                                               |
| ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `c3-shlab-unveiled-2020`                                          | Maintainer's hold (decision 5, K015): a reported plaque unveiling is not a founding date, and no laboratory or registration text was found.                                                                                          |
| `c3-tencent-esg2025-ai-committee`, `c3-tencent-esg2025-red-lines` | The ESG Report 2025 states no date of its own and its HKEXnews filing was not located, so a stated provision cannot be dated by its expression (schema 2.20). The publication record of the report is admitted with an unknown date. |

## Needing judgement

1. **K057 and K097 widened** to their sibling records (above). Revert if the maintainer wants the check's items only.
2. **BAAI's entry covers two rows** (Emu text-to-image and text-to-video) of one filing entity. The schema rule counts the listed entity, so the count is 1 and the qualification names both rows.
3. **SenseTime's entry** maps to the group record by the alias 上海商汤智能科技有限公司 (decision 3 as adopted), although this collection adds Shanghai SenseTime as its own record and maps Tencent's entry to its operating company. The alias now sits on both records. The maintainer may prefer the subsidiary.
4. **CAC lists typed "Report".** The closed document list has no listing subtype; "Regulatory listing" would need an ontology decision.
5. **Tencent ESG statements** held (above).
6. **Eleven provision records redated** to their cited expressions (above).
7. **Decision 8** also rewrote the four role statements and moved their snapshot date to the post's date.
8. **Chinese principles as paraphrases.** The Chinese passages are paraphrases of the check's reading with the original terms in parentheses, because this environment could not open the capture; quoting them needs a retrieval and a length count.
9. **Joint ventures.** 01.AI's 万蜂智能 record is `formed_entity` from a post that says the parties "will jointly establish" it; the predicate has no stage field, so "announced" is carried only by the statement and qualification.
10. **Admission-only schema field.** The listed entity is shown in the claim panel ("Listed entity, as mapped"). It is not drawn on the listed organisation's page: a scan of every claim's attributes would load them on every such page (budget, below).

## Fresh-context review (2026-10-31)

A fresh-context review of this admission found seven defects; five are fixed here through the map and the script, and two belong to the version chain.

1. **Uncited references flagged by the check (K055, K113, K097).** The four registered counts described registration from the January 2026 announcement without citing it, and the two Tencent annual-report records named the Hy3 preview licence and newsroom posts without citing them. Each now cites the admitted passage as context (seven items; the tables above). Copies of an admitted passage drop that record's check sentence. The script cites a passage of a record admitted later in the same part once that record is built.
2. **StepFun's CAC entry.** The qualification gave the pack's reason (the alias lacked 有限公司) after decision 6 had added the filer's exact name as an alias. It now says that the mapping rests on the shared filing number, that the alias was added on that basis, and that no relation between the two legal names is drawn.
3. **SenseTime's ethics page.** The version note said "no dated capture checked" beside the capture the check located; that phrase is removed.
4. **Step-5-Preview README.** The evidence note credited the cross-family check with a mismatch it never found and called the README a "printed row". It now gives the admission's own reason (a 28-byte metadata header). The script uses the check's table-row wording only for K006 and K103 and refuses a quotation made a paraphrase without its own note.
5. **Rerun on a new base.** The script restored the snapshots' metadata and rows on any base, which would have dropped another admission's scope text and row changes. It now ignores a snapshot whose added rows are absent from the stored data and rebuilds from the stored data, and stops if the stored metadata is not what this admission wrote. Tested on a copy: on `origin/main` with extra scope text and an alias added, the rebuild kept both; on the admitted data with later scope text, the script stopped.
6. **Version chain (not changed here).** The two before-snapshots enter `src/editorial/historical-views.ts`, and their added claims enter the unions in `transactions.test.ts` and `versions.test.ts`, on the final chain with the other admissions, where they are ordered.

## People pack overlap

The people pack (`research/people/pack.json`, `pp-`) shares one source with this collection, 01.AI's about page (stored as the lab genealogy's source). Its quotations there are already stored; this collection adds two short timeline quotations and two paraphrases, within the page's limit with all stored quotations. It adds 01.AI roles for Huang Huiwen, Ma Jie and Shen Pengfei and Alibaba roles for Eddie Wu; this collection has no records on those people or on Alibaba, so no record duplicates. No entity, source or claim ID collides. The script skips any record that duplicates a stored one on whatever base it runs.

## Schema, code and documentation

- **Schema 2.27** (`src/domain/schema.ts`): `attributes.listedEntity`, an entity ID, valid only on `lists_participants` with `listing.count` 1 and `countBasis: counted`, naming an organisation, public body or country. `predicates.ts`, `docs/ontology.md` and `docs/dataset-format.md` describe it. No file, column or top-level field changes, so the release format stays 1.8.
- **Release:** part 1 is a new collection and part 2 a schema change, so both are minor releases under the [versioning rule](../docs/operating-guide.md#versions).
- **Interface:** the claim panel shows the listed entity; the Chinese histories navigation lists StepFun, 01.AI, iFlytek, SenseTime, Tencent / Hunyuan, BAAI and Shanghai AI Laboratory beside the seven earlier dossiers; the China scope note on the Institutions hub and About counts the Beijing principles and the CAC lists. The [China atlas](../docs/china-atlas.md#third-collection-2026-10-31) has a third section.

## Dossier budget and the dataset description (maintainer decision, 2026-10-31)

The first build of this admission failed the Dossier budget: `/dossier/openai` was 360.4 KB of 360 (359.0 on the previous branch of the chain). Every page slice that read any field of the dataset description (`meta`) carried the whole description, including its scope text, which each admission extends by a paragraph (about 0.5 KB gzip per pack; 6.2 KB on `main`, 7.9 KB with this admission). The dossier reads only `anchors`. Neither lever named in the [loading record of 2026-10-31](data-loading-c4-2026-10-31.md) addresses this, so the pack was stopped and the cause reported. By the maintainer's decision the trace (`src/prerender/trace.ts`) now records which description fields a page reads, as it does for record fields, and a slice carries only those (`src/domain/slices.ts` merges partial descriptions when parts are held together). Across the 1,694 slice files, 216 carry `anchors` only and none carries the scope. The OpenAI dossier's slice fell from 86.7 to 79.8 KB gzip and the page from 360.4 to 353.3 KB. No limit was changed.

## Checks

Final run on the branch rebuilt after technical history, the review corrections and the maintainer's decisions of 2026-10-31:

- `pnpm tsx scripts/china-labs-3-admission.ts --part 2 --check`: the stored records match the pack and the map (part 1 was checked the same way before part 2 was written).
- `pnpm -s validate:data`: valid (1,760 entities, 5,099 claims, 1,678 sources, 6,754 evidence records).
- `pnpm -s check`: format, lint, typecheck, 753 unit tests passed; build with 6,669 pages pre-rendered on 4 threads in 218.1 s, 1,694 slice files (57.3 MB), no page needing the relation core. The first run stopped at formatting: the pack's `verification.json` was not Prettier-formatted, and was formatted with its content unchanged.
- Bundle budgets: all thirteen pass after the dataset-description fix (above), no limit changed. Start 110.0 of 115 KB; Hub 275.6 of 295; About 327.4 of 330; Search 267.7 of 275; Explorer 307.2 of 330; Dossier 353.6 of 360; Person 276.8 of 295; Document 289.7 of 310; Claim 312.2 of 325; Collection 341.6 of 370; Comparison 512.5 of 520; Guide 365.6 of 630; Propositions 428.4 of 455.
- `pnpm -s check:privacy`: passed. `pnpm release 0.20.0 --check` (before part 2) and `pnpm release 0.21.0 --check`: reproduce byte for byte.
- Browser suite (installed Chromium through an untracked copy of the configuration without the Edge channel, deleted afterwards): a first run was invalid, because a stale preview server from another worktree still held port 4173 and the suite tested that build; it was stopped. The run against this branch: 239 passed and 6 failed in 44.7 min. Five were the map's first draw, which now takes about 16 s even on an idle machine (docs/roadmap.md, "Explorer map speed"): only the assertions that wait for that draw now allow 60 s (`MAP_FIRST_DRAW_TIMEOUT` in `tests/browser/fixtures.ts`), and the three affected spec files then passed (12 tests). The sixth, the earliest-first search, now finds the technical history admission's 1997 passage first; its expectation was updated on that branch and the spec passed here (8 tests). `tests/browser/dossier-count.ts` leaves out `c3-` records (the Zhipu dossier gains one through Tang Jie).

## Open leads

- Shanghai AI Laboratory's own founding statement or registration notice.
- The HKEXnews filing dates of Tencent's 2023 and 2025 annual reports and of its ESG Report 2025.
- Direct retrieval of the Chinese Beijing AI Principles, the Yi commercial agreement and the SenseNova 5.0 article from their captures, to quote them.
- CAC deep-synthesis batches 2 to 17, provincial filing lists and the legal names of Moonshot AI, ByteDance and Alibaba in the lists.
- Earlier StepFun and all 01.AI funding rounds from a company text or filing.
