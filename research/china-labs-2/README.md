# Chinese frontier-AI institutions, second collection (candidate pack)

A candidate research pack outside application data. It covers four developers, Moonshot AI (月之暗面), MiniMax (稀宇科技), Baidu (百度) with its ERNIE (文心) models, and ByteDance Seed (字节跳动 Seed), plus Chinese AI governance texts that connect to the dataset's Governance coverage. It follows the [first bounded collection](../../docs/china-atlas.md) (DeepSeek, Alibaba/Qwen, Zhipu) and reuses the founders and leaders already admitted from the [lab genealogy](../lab-genealogy/README.md). Why these institutions, and what was deferred, is in [scope.md](scope.md). Omission is not a judgement of importance.

**Status.** 118 candidate records. They were machine-drafted and machine-audited by one model family, and every passage was machine-matched twice. No cross-family check has been run and no person has reviewed them. Nothing here is in `data/`. Admission needs the cross-family check ([brief](cross-family-check-input-2026-10-27.md)) and a separate authorised task.

## Files

- [pack.md](pack.md): the readable pack, generated from [pack.json](pack.json). It contains per-group record tables, passages with machine translations and qualifications, proposed entities, sources with versions, and what each drafting pass searched.
- [scope.md](scope.md): the choice of institutions, the questions and the rules.
- [drafting-brief.md](drafting-brief.md): the specification the drafting passes worked to. [drafts/](drafts/) holds the five drafts, each with a `searched` note.
- [verification.json](verification.json): each verbatim passage matched against the drafting retrieval and against a second, fresh retrieval of every source, with quoted words per source.
- [audit.md](audit.md) and [audit.json](audit.json): the fresh-context same-family audit of 51 records.
- [cross-family-check-input-2026-10-27.md](cross-family-check-input-2026-10-27.md): a blind brief for a reviewer from another model family (63 items). Its pack-side answers are in the separate [verdicts file](cross-family-check-verdicts-2026-10-27.json).
- [tools.mjs](tools.mjs), [render.mjs](render.mjs), [crosscheck.mjs](crosscheck.mjs): retrieval, checking, merging, verification, rendering and the brief. They are forked from the lab genealogy's tools.

```sh
node research/china-labs-2/tools.mjs merge     # drafts → pack.json
node research/china-labs-2/tools.mjs verify    # passages against the drafting cache
node research/china-labs-2/tools.mjs refetch && node research/china-labs-2/tools.mjs verify fresh
node research/china-labs-2/tools.mjs render    # pack.md
node research/china-labs-2/tools.mjs crosscheck 2026-10-27
```

Retrieval bodies stay in the ignored `.local/china-labs-2/` cache.

## Method

- **Drafting.** Three fresh-context drafting passes of the same model family worked to the brief: Moonshot AI and MiniMax; Baidu and ByteDance Seed; governance texts. Each pass recorded what it searched and what it could not retrieve. The coordinator merged the drafts and removed three drafted records before merging. Each linked a listed author to an existing person (Junjie Yan on two MiniMax reports, Wu Yonghui on Seed-Thinking-v1.5) on the strength of name and timing alone, and the same name "Junjie Yan" also appears in Moonshot AI author lists.
- **Records.** The records use the dataset's claim shape and only existing predicates: `published` (56), `states_provision` (27), `signed_commitment` (17), `authored` (10), `participated_in_round` (6), `cites` (1) and `unit_of` (1). Model releases are `published` records from the developer to a document entity: a report, an announcement, a model card or a licence text. The pack proposes 71 entities (53 documents, 16 organisations, 2 public bodies) and reuses 16 existing ones. It also lists the existing claims it relies on per group (`existingUsed`).
- **Sources.** There are 65 sources: 19 arXiv versions, 14 Hugging Face commits, 11 Git commits, 3 filings, 4 PDFs and 14 mutable pages. 14 are Chinese (`zh-Hans`) and 2 are reporting outlets, used only alongside the primary text. Fixed versions are cited by version or commit hash. Mutable pages are read as they stood when retrieved on 2026-10-27. Two SEC filings were read through the reader relay after direct retrieval was refused.
- **Chinese originals.** Chinese passages are quoted in the original, with the original title and language tag. Each of the 72 evidence items with Chinese text carries an English rendering marked `method: machine`, `humanVerified: false`. No human translation verification is claimed.
- **Verification.** `verify` matched all 189 verbatim passages (quotes, or the anchors of paraphrases) against the drafting retrieval. `refetch` and `verify fresh` matched them all again against a second retrieval of every source. One reporting page's text layer changed between the two retrievals, and its quotes still match. Quotation limits follow the editorial policy, with each CJK character counted as one word.
- **Image-only text.** The AI Industry Alliance's safety commitments and their signatory list exist only as images in the publisher's post. 21 evidence items are visual readings of that image, marked `visualReading`. Their anchors locate the post, not the passage, so they are not machine-matched. Each such record also cites a text reproduction by a reporting outlet, which was machine-matched. The audit read the image independently.
- **Audit.** One fresh-context audit pass of the same family checked 51 records against its own fresh retrievals and Git and Hugging Face histories: a 20% random sample (seed 20261027, `tools.mjs sample 20 20261027`) and 27 targeted records (capital, licences, filings, 2026 pages, institutional relations, image-only text). It found 0 material and 6 minor issues: two locators, two commit-history notes, one licence-scope narrowing and one repository name. All six were applied ([audit.md](audit.md)). A bounded sample does not certify the other 67 records.

## Limits and retrieval failures

- The Internet Archive refused connections from this environment (HTTP 403). No archive capture was checked, and the earlier wording of mutable pages is not authenticated. The cross-family brief asks the checker to look for captures.
- The github.com web pages and GitHub API were refused. Pinned files were read from raw.githubusercontent.com, and commit dates were read with `git`. A commit date is not necessarily the date a repository became public.
- Not retrieved: the ERNIE 4.5 technical report on yiyan.baidu.com (timeout; the relay returned an application shell); a Chinese-language Baidu original for the ERNIE Bot launch (Baidu's English press release was used); MiniMax news pages for MiniMax-01 and M1 (404); the seed.bytedance.com blog index (JavaScript shell); the original 2024 TC260 page for framework 1.0 (it now redirects; the CAC-hosted PDF was used); the later batch of AI safety commitment signatories (no list found).
- Coverage is bounded. Left out were Moonshot AI's investors (no filing), MiniMax's cornerstone investors (conditional on the offering), ERNIE 3.5 and 4.0, later Kimi and MiniMax models, the July 2025 commitment framework, and the Chinese edition of the Shanghai AI Laboratory framework. No Moonshot AI, MiniMax, Zhipu or 01.AI frontier safety framework was located.
- What a document states is not what happened. A licence text is not a judgement on "open source". A framework or commitment is not evidence of implementation. A listing is not a signature date. A prospectus statement is the issuer's own account. A technical report does not validate performance.
- Records name each organisation separately. No state direction, influence, ideology or affiliation is inferred from funding, location, alliance membership or co-signature.

## Questions for the maintainer

See the [review note](../../review/china-labs-pack-2-2026-10-27.md#open-questions).
