# Chinese frontier-AI institutions, second collection: candidate pack, 2026-10-27

A record of the candidate pack prepared on branch `china-labs-pack-2` under the maintainer's decision of 2026-10-27. The decision deepens the Chinese frontier-AI institutional history strand with a second bounded collection, prepared for a blind cross-family check before any admission. The pack is in [`research/china-labs-2/`](../research/china-labs-2/README.md). Nothing in `data/`, the application, the schema or the releases changed.

## Choices

- **Institutions.** Moonshot AI, MiniMax, Baidu (ERNIE; deferred in the first collection) and ByteDance Seed. Each has a developer-published, dated documentary trail: fixed arXiv versions, Git and Hugging Face commits, and filings. That trail supports release, licence and authorship records without resting on reporting.
- **Governance texts.** Three groups of text, each recorded as what the document states. The first is the AI Safety Governance Framework (人工智能安全治理框架) of TC260 (全国网络安全标准化技术委员会), in versions 1.0 (2024-09-09), 2.0 (2025-09-15) and 3.0 (2026-09-14). Version 3.0 was found during drafting and was not in the target list. The second is the AI Industry Alliance's AI safety commitments (人工智能安全承诺, December 2024) with its 17 listed initial signatories. The third is Shanghai AI Laboratory's Frontier AI Risk Management Framework v1.0 (July 2025, with Concordia AI).
- **Deferred.** StepFun, 01.AI and Tencent Hunyuan were deferred to keep depth within the selected institutions. Omission is not a judgement of importance.
- **Founders and leaders** of these companies are already admitted from the lab genealogy. The pack reuses them and lists the claims it relies on (`existingUsed`). It adds what they lacked: releases, licences, authorship, documented investors and published safety and governance statements.

## Counts

| Group            | Records |
| ---------------- | ------: |
| Moonshot AI      |      22 |
| MiniMax          |      25 |
| Baidu / ERNIE    |      16 |
| ByteDance Seed   |      13 |
| Governance texts |      42 |
| **Total**        | **118** |

- **Records by predicate:** `published` 56, `states_provision` 27, `signed_commitment` 17, `authored` 10, `participated_in_round` 6, `cites` 1, `unit_of` 1. No new predicate is proposed.
- **Evidence:** 189 items (163 quotes and 26 paraphrases). 72 carry Chinese text with a machine-translation rendering. No human translation verification is claimed.
- **Sources:** 65. 51 are fixed (19 arXiv versions, 14 Hugging Face commits, 11 Git commits, 3 filings, 4 PDFs) and 14 are mutable pages. 14 are in Chinese and 2 are reporting outlets, each used beside a primary text.
- **Entities:** 71 proposed (53 documents, 16 organisations, 2 public bodies) and 16 existing ones reused.
- **Records resting on reporting alone:** none.

## Checks

- **Passage matching.** All 189 verbatim passages matched against the drafting retrieval and again against a fresh second retrieval of every source ([verification.json](../research/china-labs-2/verification.json)). The quotation limits pass. 21 evidence items are visual readings of an image (the AIIA text and list), so they are not machine-matched. Each of those records also cites a machine-matched reporting reproduction.
- **Same-family audit.** A fresh-context audit of 51 records: a 20% random sample (seed 20261027) and 27 targeted records. It found 0 material and 6 minor issues, and all six were applied ([audit.md](../research/china-labs-2/audit.md)). The other 67 records are not certified by it.
- **Coordinator removals.** The coordinator removed three drafted authorship records before merging, because identity rested on name and timing alone (Junjie Yan ×2, Wu Yonghui).
- **Cross-family check.** Not run. The [brief](../research/china-labs-2/cross-family-check-input-2026-10-27.md) has 63 items. 39 are targeted: every licence record, every capital record and every record whose primary text is an image. The other 24 are a random 30% of the rest (seed 20261027). The pack-side answers are in a separate verdicts file, to be opened only after the blind pass. Mutable pages are flagged, and the checker is asked to look for Internet Archive captures, which this environment could not reach.
- **Repository checks.** `pnpm check:privacy` passed before each push. Prettier formatting was checked on the task-owned files.

## Retrieval failures

- **Internet Archive:** refused connections (HTTP 403). No capture was checked.
- **GitHub:** the github.com web pages and the API were refused. raw.githubusercontent.com and `git` worked.
- **SEC:** refused direct retrieval. The two Baidu 20-F filings were read through the reader relay.
- **Baidu:** the ERNIE 4.5 technical report on yiyan.baidu.com timed out, and the relay returned an application shell. No Chinese-language Baidu original was found for the ERNIE Bot launch. ir.baidu.com returned 404 at the guessed URL.
- **MiniMax and ByteDance Seed:** MiniMax news pages for MiniMax-01 and M1 returned 404. The minimax.io and minimaxi.com indexes and the seed.bytedance.com blog index are JavaScript shells.
- **TC260:** the 2024 page for framework 1.0 now redirects to the committee's home page, so the CAC-hosted PDF was used.
- **Chinese reporting:** Sina returned 403. The aihub disclosure page returned 404.

## Open questions

1. **Run the cross-family check** with the brief before any admission.
2. **Image-only primary text.** The AIIA commitments and signatory list are published only as an image. Admit records whose primary evidence is a visual reading plus a reporting reproduction? Or hold them until a text expression is found? People's Daily Online's reproduction omits 红队 (red-team) in commitment II and is attached as context.
3. **`states_provision` outside frameworks.** 27 provision records include licence terms (MiniMax, Kimi K2 and K3, MiniMax M3), statements in the MiniMax prospectus, a section of the Kimi K2 report and the image-only AIIA commitments. Schema 2.8 defines provisions for framework, commitment and statute editions with a supporting primary quote. Should licences and prospectus statements map to provisions, to a new predicate, or stay as qualifications on the `published` records? The AIIA provisions would fail the primary-quote rule as they stand.
4. **Affiliation encoded as `published`.** Peng Cheng Laboratory (ERNIE 3.0 Titan), CNCERT/CC (framework 2.0 cover) and Concordia AI (Shanghai AI Laboratory framework) are recorded as `published` from co-naming or affiliation. Should they map to `published`, to `authored`-style affiliation, or to qualifications only?
5. **Signatory identity.** The AIIA list names legal entities such as 深圳市腾讯计算机系统有限公司 and 北京火山引擎科技有限公司. The pack maps each one to a group-level entity by name. Should the mapping use group entities with the legal name kept in the statement, or separate legal-entity records?
6. **Mutable and 2026 sources.** Some records rest on pages read only on 2026-10-27: the Kimi K3 post, the MiniMax M2 and M3 announcements, the Doubao 1.5 Pro page, the Seed Alignment & Preparedness announcement and the TC260 news pages. Admit them dated to their stated dates with the retrieval date shown, as the genealogy did?
7. **ERNIE 3.0 Titan date.** The arXiv v1 is dated 2021-12-23, and Baidu's 20-F dates the release to 2022. Both are kept in one record, unreconciled.
8. **Seed-Coder licence.** The model card's metadata said apache-2.0 until 2025-05-06 and the card later says MIT. The record keeps both states. Should a dated licence change be its own record?

## Next step

The maintainer runs the cross-family check locally from the brief and returns `cross-family-check-2026-10-27.json` and `.md` into `research/china-labs-2/`. A separate authorised task would then apply its findings and decide admission.
