# Chinese frontier-AI institutions, third collection: candidate pack, 2026-10-29

A record of the candidate pack prepared on branch `china-labs-3-pack` for the Chinese frontier-AI institutional history strand. The pack is in [`research/china-labs-3/`](../research/china-labs-3/README.md). Nothing in `data/`, the application, the schema or the releases changed.

- **Preparing family:** Claude, for the drafting, the merge and the same-family audit.
- **Checking family:** not yet run. Under the [operating guide](../docs/operating-guide.md#the-pipeline), the check is by a model of another family (GPT), from the brief.

## Choices

- **Institutions.** StepFun, 01.AI and Tencent (Hunyuan) were deferred in the second collection. iFlytek, SenseTime, BAAI and Shanghai AI Laboratory are added. Each has a dated documentary trail of its own: arXiv versions, Hugging Face and Git commits, exchange filings (HKEX for SenseTime and Tencent, cninfo for iFlytek), and the developer's own announcements.
- **Governance.**
  - **CAC listings.** The CAC's lists of filed generative-AI services (April 2024 to August 2026) and of deep-synthesis algorithms (two batches) are recorded as dated listings, each with its count basis. Each covered developer's entry is recorded at the earliest list found.
  - **TC260 frameworks.** The editions are already in the dataset; the pack adds twelve provisions not yet recorded and two succession records.
  - **Measures and standards** already in the dataset are linked through `existingUsed`, not redrafted.
- **Founders and leaders** already admitted from the lab genealogy are reused. StepFun's own post of 26 January 2026 states the roles that four existing records hold from reporting (question 8).

## Counts

| Group                                 | Records |
| ------------------------------------- | ------: |
| StepFun and 01.AI                     |      41 |
| iFlytek and SenseTime                 |      48 |
| Tencent / Hunyuan                     |      32 |
| BAAI and Shanghai AI Laboratory       |      44 |
| Governance: CAC listings, TC260 links |      47 |
| **Total**                             | **212** |

- **Sources:** 112.
  - 91 are fixed: 30 arXiv versions, 30 Hugging Face commits, 3 Git or Gitee commits, 14 exchange filings and 14 PDFs.
  - 21 are mutable pages.
  - 38 are in Chinese.
  - 3 are reporting outlets, each used where no primary text was found.
- **Evidence:** 334 items. 135 carry Chinese text with a working machine translation; no human translation verification is claimed.
- **Entities:** 102 proposed (81 documents, 7 organisations, 14 people) and 20 existing ones reused.
- **Records resting on reporting alone:** 2. One is StepFun's B+ round, with no investor named. The other is Shanghai AI Laboratory's plaque unveiling, which is held.
- **Held for the maintainer:** 3 (`reviewHold`).
- The full predicate breakdown and the omissions, with their reasons, are in the [pack README](../research/china-labs-3/README.md#counts).

## Checks

- **Passage matching.**
  - All 334 verbatim passages matched against the drafting retrieval.
  - 331 matched again against a fresh second retrieval. The other three are two passages from an iFlytek Gitee file whose second fetch failed, and one 28-byte README byte-identical to its first copy.
  - The quotation limits pass, including against the quotations already in the dataset from the same sources ([verification.json](../research/china-labs-3/verification.json)).
- **Same-family audit.** A fresh-context audit of 78 records, a 20% random sample (seed 20261029) plus 35 targeted records, found 5 material and 14 minor issues ([audit.md](../research/china-labs-3/audit.md)).
  - Two material issues were fixed: a quote whose ellipsis dropped "NOT", and a licence revision misdated.
  - Three are held: questions 4 and 5.
  - All 14 minor issues were applied.
  - The coordinator also rechecked every quote with an ellipsis and the licence histories of the Tencent and Yi repositories. That recheck added a dated note on the Yi licence v1.0, whose non-commercial clause was removed on 4 November 2023 before the file was relabelled Version 2.0.
  - The other 134 records are not certified by the audit.
- **Cross-family check.** Not run. The [brief](../research/china-labs-3/cross-family-input-2026-10-29.md) has 124 items.
  - It covers all 85 targeted records (capital, licence, legal-entity, role-interval, founding, listing, succession, inferred and reporting-only records) and a random 30% of the rest (39 of 127, seed 20261029).
  - Part A (100 items) is blind: a neutral question per record. Part B (24 items) is direct: provisions, authorship and citations checked against their quotes.
  - The pack's answers are in a separate [verdicts file](../research/china-labs-3/cross-family-verdicts-2026-10-29.json).
  - The brief lists 16 pages that refused this environment and asks the checker to open archive copies of them and of every mutable page, and to read the Chinese originals.
- **Repository checks.** `pnpm check:privacy` passed before each push. Prettier formatting was checked on the task-owned files.

## Retrieval failures

- **Retrieval route.** Direct only; no reader relay was used.
- **Archives and GitHub.** web.archive.org refused connections. github.com and the GitHub API refused; raw.githubusercontent.com, Hugging Face, Gitee and `git` over HTTPS worked.
- **Script-only sites.** stepfun.com, baai.ac.cn and iflytek.com serve script shells. StepFun's and BAAI's page text was read from the sites' build files, recorded as mutable pages.
- **Pages not reached:**
  - SenseTime's news pages for SenseNova 5.0 and the April 2023 launch (HTTP 404);
  - 01.AI's licence page, which serves its home page;
  - linking-ai-principles.org (expired certificate);
  - Tencent's posts API (HTTP 401).
- **Text not found.** The Chinese original of the Beijing AI Principles was not found.
- **Slow hosts.** cac.gov.cn, cninfo and Gitee reset connections often; retries succeeded, except the fresh copy of one Gitee README.

## Open questions

1. **Run the cross-family check** with the brief before any admission.
   _Recommended:_ yes, as written. Also ask the checker for the Chinese original of the Beijing AI Principles and for captures of stepfun.com and baai.ac.cn.
2. **Developer entries in CAC lists.** 11 records are a developer's entry in a CAC list (model name, filing entity, filing number, filing date), recorded as `lists_participants` from the list with `attributes.listedEntity`. Schema 2.19 defines `lists_participants` as a whole list with a count, and has no field naming one listed entity.
   A twelfth record, `c3-baai-bjp-endorsers`, uses `lists_participants` for a note that names only example endorsers and gives no count, so it fails the schema's count rule.
   _Recommended:_ admit the 14 list-level count records on the existing predicate now. Recast `c3-baai-bjp-endorsers` as a `states_provision` record of the principles text. Add a small schema field (`attributes.listedEntity`, an entity reference, valid only on `lists_participants` with a count of 1 and `countBasis: counted`) in a minor release before admitting the 11 entries. Do not use `signed_commitment`: a filing is not a commitment.
3. **Name mapping of filing entities.**
   - Seven entries map by an exact alias of the dataset entity.
   - Shanghai AI Laboratory maps by partial name: the filer is 上海人工智能创新中心（上海人工智能实验室）.
   - StepFun maps by the shared filing number, because its filer name and the dataset alias differ.
   - The Tencent entry lists the proposed `shenzhen-tencent-computer-systems`.

   _Recommended:_ admit the exact and filing-number mappings with their basis kept in each qualification. Admit the Shanghai AI Laboratory entry only with the partial-name basis shown, and add no combined alias.

4. **Investor identity** (two records, held).
   - SenseTime's prospectus names SVF Sense (Singapore) Pte. Ltd. as the investor, and links SoftBank Group to it only through the fund's general partner and manager.
   - iFlytek's 2013 subscriber was 中国移动通信有限公司, not the dataset's China Mobile group entity.

   _Recommended:_ make the investing vehicle the subject in both cases, as new organisation entities with their legal names: SVF Sense, and 中国移动通信有限公司. Keep the parent chain in the qualification as the filing states it, and infer no ownership link the filing does not state. The second collection's investor records name the investing vehicles and their stated parents ([Chinese AI histories](../docs/china-atlas.md#limits)); here neither filing states a parent link to the dataset's group entity.

5. **Shanghai AI Laboratory's founding** (one record, held). Yicai reports that its plaque was unveiled (揭牌) on 11 July 2020, and no laboratory or government text giving a founding date was found. `founding_stated` does not fit a reported ceremony.
   _Recommended:_ hold the record out of the admission. Ask the cross-family checker to look for the laboratory's own statement or a registration notice; if one is found, record that as `founding_stated`. Keep the unveiling report as context evidence on it.
6. **Two legal names on one entity.**
   - StepFun's site footer gives 上海阶跃星辰智能科技股份有限公司 (joint-stock), while the CAC list gives 上海阶跃星辰智能科技有限公司 under the same filing number.
   - The Yi licence names 北京零一万物信息技术有限公司 as licensor, while the CAC and AIIA lists name 北京零一万物科技有限公司.

   Both `has_legal_form` records are marked inferred.
   _Recommended:_ admit both legal names as aliases of the group entities. Keep each legal-form record dated to its own document, and draw no conversion or relation between the names until a filing states one.

7. **TC260 editions: `supersedes_document`.** The v2.0 and v3.0 prefaces say they were written on the basis of the earlier edition (在…基础上) and update it. They do not say the earlier edition is withdrawn, while the predicate implies replacement.
   _Recommended:_ admit them as `supersedes_document`, with the qualification quoting "updates" and stating that no withdrawal of the earlier edition is recorded. Withdrawal is not part of the predicate's definition, and the dataset already uses it for revised framework editions.
8. **Primary evidence for existing records.** StepFun's own newsroom post of 26 January 2026 states the roles of Yin Qi (chairman), Jiang Daxin (CEO), Zhang Xiangyu (chief scientist) and Zhu Yibo (CTO). The four existing `lg-cn-*-2026` records rest on 36Kr reporting.
   _Recommended:_ in the admission, add the post as primary supporting evidence to those four records, as a correction under the existing claim IDs, with the reason recorded.
9. **Mutable and script-served sources.** 21 sources are pages read only on 2026-10-29, among them StepFun's and BAAI's text read from build files, Tencent's 2026 newsroom posts and 01.AI's company page.
   _Recommended:_ admit them dated to their stated dates with the retrieval date shown, as the second collection did. Prefer an archive capture located by the checker where one exists.
10. **Beijing AI Principles in English only.** The provisions are quoted from the English text published by the lead drafter's institute, because no Chinese original was found.
    _Recommended:_ admit them with the English expression named as the source. Replace the quotations if the checker finds the Chinese original on a BAAI page or capture.
11. **Document kind "principles".** The drafting pass used a new `documentKind` value for the two Beijing principles texts. This is a pack-level field.
    _Recommended:_ map it to the dataset's existing document subtype "Declaration or statement" at admission; no schema change.

## Next step

The maintainer runs the cross-family check locally from the brief. The checker returns `cross-family-check-2026-10-29.json` and `.md` into `research/china-labs-3/`, on its own branch. A separate authorised task then applies its findings and the maintainer's decisions, and admits the pack.

## Maintainer decisions (2026-10-30)

All recommended answers to the open questions above (1–11) are adopted as written. Admission still waits for the cross-family check and its adjudication; where the check changes the basis of a recommendation, the admission task lists it for the maintainer instead of applying it.

## Adjudication of the cross-family check (maintainer, 2026-10-31)

The check (`research/china-labs-3/cross-family-check-2026-10-29.md` on `codex/china-labs-3-check`: 77 agree, 23 partly, 0 disagree) is accepted. Apply at admission: the Beijing AI Principles' Chinese original (BAAI capture of 2020-08-11) recorded beside the English expression, keeping 潜在影响 ("potential impacts") and the English "potential risks" as distinct wordings; Shanghai AI Laboratory's founding stays held; investor vehicles under the legal names the filings print (SVF Sense (Singapore) Pte. Ltd.; 中国移动通信有限公司), with no ownership or continuity inferred; CAC locator repairs (K055, K067, K081, K111), K067's uncited January 2025 reference removed or cited, K113's backfilled registrations not dated as July–August events; Tencent's 18 March 2026 signature not a filing date (K097–K100); K057 posting month not inferred; quotation repairs (K033, K103, K006, K083); the recovered Yi licence and SenseNova captures used. Anything else needing judgement is held and listed.
