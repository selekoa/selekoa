# Chinese frontier-AI institutions, third collection (candidate pack)

A candidate research pack outside application data. It covers seven developers and research institutes and one governance group:

- StepFun (阶跃星辰) and 01.AI (零一万物);
- iFlytek (科大讯飞) and SenseTime (商汤科技);
- Tencent (腾讯) and its Hunyuan (混元) models;
- the Beijing Academy of Artificial Intelligence (BAAI, 北京智源人工智能研究院) and Shanghai Artificial Intelligence Laboratory (上海人工智能实验室);
- the Cyberspace Administration of China's (CAC) listings of filed generative-AI services and deep-synthesis algorithms, and new provisions of TC260's AI Safety Governance Framework editions.

It follows the [first collection](../../docs/china-atlas.md) and the [second](../china-labs-2/README.md), and reuses the founders and leaders already admitted from the [lab genealogy](../lab-genealogy/README.md). Why these institutions, and the rules, are in [scope.md](scope.md). Omission is not a judgement of importance.

**Status.** 212 candidate records. They were machine-drafted and machine-audited by one model family (Claude), and every verbatim passage was machine-matched twice. No cross-family check has been run and no person has reviewed them. Three records are held for the maintainer (`reviewHold`). Nothing here is in `data/`. Admission needs the cross-family check ([brief](cross-family-input-2026-10-29.md)) and a separate authorised task.

## Files

- [pack.md](pack.md) is the readable pack, generated from [pack.json](pack.json). It has per-group record tables, passages with working translations and qualifications, proposed entities, sources with versions, and what each drafting pass searched.
- [scope.md](scope.md) gives the choice of institutions, the questions and the rules.
- [drafting-brief.md](drafting-brief.md) is the specification the drafting passes worked to. [drafts/](drafts/) holds the five drafts, each with a `searched` note.
- [verification.json](verification.json) matches each verbatim passage against the drafting retrieval and against a second, fresh retrieval of every source, and counts quoted words per source.
- [audit.md](audit.md) and [audit.json](audit.json) are the fresh-context same-family audit of 78 records, with the coordinator's dispositions. [audit-sample.json](audit-sample.json) is the sample.
- [cross-family-input-2026-10-29.md](cross-family-input-2026-10-29.md) is the brief for a reviewer from another model family: 124 items, Part A blind and Part B direct. The pack's answers are in the separate [verdicts file](cross-family-verdicts-2026-10-29.json), to be opened only after the blind pass.
- [tools.mjs](tools.mjs), [render.mjs](render.mjs) and [crosscheck.mjs](crosscheck.mjs) do the retrieval, checking, merging, verification, rendering and the brief. They are forked from the second collection's tools; retrieval is direct only.

```sh
node research/china-labs-3/tools.mjs merge     # drafts → pack.json
node research/china-labs-3/tools.mjs verify    # passages against the drafting cache
node research/china-labs-3/tools.mjs refetch && node research/china-labs-3/tools.mjs verify fresh
node research/china-labs-3/tools.mjs render    # pack.md
node research/china-labs-3/tools.mjs crosscheck 2026-10-29
```

Retrieval bodies stay in the ignored `.local/china-labs-3/` cache.

## Counts

| Group                                 | Records |
| ------------------------------------- | ------: |
| StepFun and 01.AI                     |      41 |
| iFlytek and SenseTime                 |      48 |
| Tencent / Hunyuan                     |      32 |
| BAAI and Shanghai AI Laboratory       |      44 |
| Governance: CAC listings, TC260 links |      47 |
| **Total**                             | **212** |

- **By predicate:**

  | Predicate               | Records |
  | ----------------------- | ------: |
  | `published`             |      81 |
  | `states_provision`      |      48 |
  | `lists_participants`    |      26 |
  | `held_role`             |      19 |
  | `authored`              |       6 |
  | `co_founded`            |       6 |
  | `has_legal_form`        |       6 |
  | `founding_stated`       |       4 |
  | `participated_in_round` |       4 |
  | `unit_of`               |       3 |
  | `announced_funding`     |       2 |
  | `formed_entity`         |       2 |
  | `supersedes_document`   |       2 |
  | `cites`                 |       1 |
  | `explicitly_credits`    |       1 |
  | `holds_control_right`   |       1 |

  No new predicate is proposed. The open questions in the review note cover one attribute and the one record no existing predicate fits.

- **Derivation:** 208 explicit and 4 inferred, each inferred record with a rationale. All 212 are supported.
- **Evidence:** 334 items, 307 quotes and 27 paraphrases. 135 carry Chinese text with a working English translation (`method: machine`, `humanVerified: false`).
- **Sources:** 112.
  - 91 are fixed: 30 arXiv versions, 30 Hugging Face commits, 3 Git or Gitee commits, 14 exchange filings and 14 PDFs.
  - 21 are mutable pages.
  - 38 are in Chinese.
  - 3 are reporting outlets: China Daily, 36Kr republishing QbitAI, and Yicai.
- **Records resting on reporting alone:** 2.
  - `c3-stepfun-b-plus-round-2026`: StepFun's B+ round of more than RMB 5 billion. No investor is named.
  - `c3-shlab-unveiled-2020`: Shanghai AI Laboratory's plaque unveiling. This record is held.
- **Entities:** 102 proposed and 20 existing reused.
  - The proposed entities are 81 documents, 7 organisations and 14 people. The new organisations include `baai`, `opengvlab`, `shenzhen-tencent-computer-systems` and two joint ventures of 01.AI.
  - The proposed people are public officers named in filings or on an organisation's own pages.
- **Existing records relied on:** 56, listed per group in `existingUsed`. Among them are the founding and role records of StepFun and 01.AI, the TC260 framework editions and their provisions, the CAC filing announcements of 2024 and 2025, the Interim Measures, the Labelling Measures and the two GB standards. None is redrafted.

## Method

- **Drafting.** Five fresh-context drafting passes of the same model family worked to the brief, one per group, in parallel. Each recorded what it searched and what refused it.
- **Merge.** The coordinator merged the drafts. It mapped the governance pass's listing counts to the schema's `attributes.listing` (`count`, `countBasis: stated | counted`), keeping the pass's description as `countNote`. It turned two 01.AI quotations into paraphrases with short anchors, so that the company page stays within the per-document quotation limit together with the quotations already in the dataset.
- **CAC listings.**
  - The CAC page of 2 April 2024 links 13 dated attachments, each a PDF list of filed (已备案) and, from August 2024, registered (已登记) services. Five of them are recorded as listing documents, from April 2024 to August 2026.
  - Rows were counted from the PDF text layer. The running numbers continue across the lists and reach 302 filed and 105 registered by January 2025, and 748 and 435 by December 2025. These are the totals the CAC states in its announcements of January 2025 (already in the dataset) and January 2026 (in this pack).
  - Each covered developer's entry is recorded once, at the earliest list in this pack's retrieval that contains it. The basis of each name mapping (exact alias, partial name or filing number) is in the record.
  - Two batches of deep-synthesis algorithm lists (June 2023 and July 2026) are recorded with their batch counts. These batch counts are not running totals.
- **Verification.**
  - `verify` matched all 334 verbatim passages against the drafting retrieval.
  - `refetch` and `verify fresh` matched 331 against a second retrieval of every source:
    - Two passages are from an iFlytek Gitee README whose second retrieval failed (connection reset three times).
    - One is a 28-byte Hugging Face README that the tool treats as a block page; it is byte-identical to the first copy.
  - One text layer changed between the two retrievals (the 36Kr page), and its quotes still match.
  - Quotation limits follow the editorial policy, with each CJK character counted as one word. The CAC listing PDFs are almost entirely table text, so their length is taken as the whole text layer, not the tool's default count of text blocks.
- **Audit.**
  - One fresh-context audit pass of the same family checked 78 records against its own fresh retrievals and Hugging Face histories: a 20% random sample (seed 20261029) and 35 targeted records.
  - It found 5 material and 14 minor issues. All were applied, or held where a decision belongs to the maintainer ([dispositions](audit.md#dispositions-coordinator-29-october-2026)).
  - The coordinator then rechecked every quote with an ellipsis and the licence histories of the Tencent and Yi repositories.
  - A bounded sample does not certify the other 134 records.

## Limits and retrieval failures

- **Retrieval route.** Retrieval was direct only. No reader relay or other fetching service was used to get past a refusal.
- **Archives and GitHub.** The Internet Archive refused connections from this environment, so no capture was checked, and the earlier wording of mutable pages is not authenticated. github.com and the GitHub API refused; pinned files were read from raw.githubusercontent.com, Hugging Face and Gitee. The brief lists every refusal and asks the checker to open archive copies.
- **Script-only sites.** stepfun.com, baai.ac.cn and iflytek.com serve script shells. StepFun's and BAAI's page text was read from the sites' build files, which are content-hashed and recorded as mutable pages. iFlytek's Spark announcements were taken from its exchange filings on cninfo.
- **Not retrieved:**
  - SenseTime's SenseNova 5.0 and April 2023 launch news pages (HTTP 404);
  - 01.AI's commercial licence page, which serves the home page;
  - the Chinese original of the Beijing AI Principles (人工智能北京共识), not found, so its provisions are quoted from the English text published by the lead drafter's institute;
  - linking-ai-principles.org (expired certificate);
  - the article body of a chinanews.com.cn report;
  - Tencent's posts API (HTTP 401).
- **Page numbers.** HKEX filings mix printed and PDF page numbers in their locators; only the two sampled cases were corrected.
- **Left out, with reasons:**
  - **Funding.** No company text or filing was found for 01.AI's rounds or StepFun's earlier rounds, and reporting without named investors was not drafted beyond one record. SenseTime's cornerstone investors are left out because their agreements were conditional on the offering, and its round amounts and valuations are left out entirely. The Taobao China Holding stake is not tied to Alibaba in the passage read.
  - **Safety frameworks.** No standalone safety framework was located for StepFun, 01.AI, iFlytek or Tencent on the pages searched. 01.AI's RAISE is recorded only as its two reports describe it.
  - **Models.** Many later or smaller releases are omitted for budget: StepFun's audio, video and edge models; Yi-VL and Yi-9B; Spark V3.0, V3.5 and X1 as separate announcements; SenseNova-SI; HunyuanVideo and Hunyuan3D 2.0 as reports, whose title pages name only a team; Wu Dao 1.0 and 3.0; Emu3.5; and later InternLM models.
  - **People.** Some people are not recorded because they are not dataset entities: SenseTime co-founders Lin Dahua, Ma Kun and Xu Chiheng; Heung-Yeung Shum, who is in StepFun author lists; and Yin Qi's other chairmanship. Authorship is recorded only where the person is a dataset entity and the report credits them unambiguously.
  - **Legal names.** The legal names of Moonshot AI, ByteDance and Alibaba in the CAC lists are not mapped, because no dataset record ties those names to the entities. Provincial filing lists, deep-synthesis batches 2 to 17 and the CAC's algorithm-filing system were not searched.
  - **IDAIS.** BAAI's hosting of the International Dialogues on AI Safety is not recorded, because hosting is not authorship.
- **What a document states is not what happened.**
  - A licence text is not a judgement on "open source".
  - A filing listing is not approval of a model's safety, performance or compliance, and absence from a list is not recorded.
  - A framework or principles text is not evidence of implementation.
  - A filing statement is the issuer's own account.
  - A technical report does not validate performance.
- **Each organisation is named separately.** No state direction, influence, ideology or affiliation is inferred from funding, location, founding sponsors, a regulator's list or co-signature. BAAI's account of its founding sponsors is quoted in its own words only.

## Questions for the maintainer

See the [review note](../../review/china-labs-pack-3-2026-10-29.md#open-questions).
