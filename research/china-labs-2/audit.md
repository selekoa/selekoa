# Chinese frontier-AI institutions, second collection: fresh-context machine audit

- **Auditor:** fresh-context machine audit, same model family as the drafting passes.
- **Date:** 27 October 2026.
- **Record:** [audit.json](audit.json) holds the per-record findings and the sources retrieved for each.
- **Cross-family check:** this is a same-family check. It does not meet the editorial policy's cross-family requirement for admission.

## Method

The auditor read the editorial policy, [scope.md](scope.md), [drafting-brief.md](drafting-brief.md) and, from `pack.json`, the audited claims with their evidence, sources and object entities. It did not read the drafts' `searched` notes or any coordinator commentary.

Every cited source was retrieved again, one at a time, into the auditor's own cache (`LG_CACHE=audit`), and each quoted passage was located in the retrieved text. Chinese PDF text layers were normalised (NFKC) for matching.

Commit and revision dates were checked independently of the pack's notes:

- Git histories of MoonshotAI/Kimi-K2 and Kimi-k1.5, MiniMax-AI/MiniMax-01 and MiniMax-M2, and ByteDance-Seed/seed-oss, from blobless clones.
- Hugging Face commit and file-tree listings for Kimi-K2-Thinking, Kimi-K3, MiniMax-M3, Seed-OSS-36B-Instruct, Seed-Coder-8B-Instruct and ERNIE-4.5-300B-A47B-PT.

The AIIA commitment text and signatory list exist only as an image in CAICT's WeChat post. The auditor downloaded the image and viewed it in slices, reading the cover, Commitment II and the 17-name list. The other commitments were not checked visually.

## Coverage

51 records were audited:

- **Random sample:** 24 records, a 20% sample with seed 20261027, reproduced with `tools.mjs sample 20 20261027`.
- **Targeted:** 27 records. These are the MiniMax capital and prospectus records, licences, Hugging Face and Git revisions, mutable or 2026 pages, institutional relations, the 20-F filing and the image-only AIIA texts.

Every source cited by these records was retrieved.

## Results

| Verdict  | Count |
| -------- | ----: |
| ok       |    45 |
| minor    |     6 |
| material |     0 |

### Minor findings

- **c2-bytedance-seed-oss-licence: wrong date in a note.** The time note and the source's version note say the LICENSE "entered the Git repository on 21 August 2025" in commit 26e45ea4.
  - In fact the file, with the identical blob, is already present in the initial commit 79f8ca3 of 20 August 2025.
  - Commit 26e45ea ("add license") changes only `inference/vllm_output_parser.py`.
  - Fix: correct both notes.
- **c2-minimax-01-licence-military: locator names a heading that does not exist.** The locator "Prohibited uses, item 2" names no heading in the file.
  - The list has no heading. It follows Section 8 and opens "You agree you will not use, or allow others to use, MiniMaxText01 or MiniMaxVL01 to:".
  - Fix: change the locator to describe that position.
- **c2-minimax-prospectus-safety-assessment: imprecise locator.** "Business, content safety" names no heading in the filing.
  - The passage is in Business, p. 277, at the end of the AI safety and alignment measures.
  - Fix: change the locator to that position.
- **c2-minimax-m2-licence-oct: earlier licence omitted.** The repository's initial commit of 26 October 2025 carried the Apache License 2.0. The MIT text replaced it on 27 October 2025.
  - The record presents the 27 October MIT text as the start of the file's history.
  - Fix: add the 26 October state to the qualification, or record it separately.
- **c2-minimax-m3-licence: licence scope narrowed.** The statement says the licence "grants permission … for non-commercial purposes".
  - Condition 2 sets terms for commercial use: an attribution display, a notice, and prior written authorisation above 20 million US dollars of yearly revenue.
  - A reader could take the record to mean that commercial use is excluded.
  - The same LICENSE is also present at the initial commit of 12 June 2026.
  - Fix: qualify the scope and add the earlier commit to the time note.
- **c2-baidu-ernie-45-licence: wrong version note and repository name.** The source note calls revision 049f3d9b the "latest commit on main at retrieval".
  - In fact 27 later commits exist, to 26 November 2025. The licence wording is unchanged at the current main branch.
  - The statement names the card "ERNIE-4.5-300B-A47B", but the repository is `baidu/ERNIE-4.5-300B-A47B-PT`.
  - Fix: correct the version note and name the repository.

### Observations (no change required)

- c2-baidu-ernie-3-titan-pcl and c2-governance-tc260-asgf-v2-cncert-named use `published` to record author affiliation and cover co-naming. Both qualifications say so, but the maintainer may prefer a predicate that does not suggest publisher status.
- c2-minimax-01-licence cites a commit of 15 January 2025. The same LICENSE is already present at the initial commit of 14 January 2025.
- c2-moonshot-k3-licence: the licence also has a Model-as-a-Service condition, which the record does not mention. The record makes no claim against it.

## Retrieval failures

- **Baidu Form 20-F (SEC):** direct retrieval returned HTTP 403, so the auditor read the filing through the r.jina.ai relay (a text layer, not the original bytes). The EDGAR filing index was not retrieved, so the filing date rests on the 20-F's signature date of 15 March 2024.
- **Internet Archive:** web.archive.org refuses connections from this environment (HTTP 403), so it was not attempted. As a result, the earlier wording of mutable pages is not authenticated.

## Limits

- **Same-family check.** The auditor belongs to the same model family as the drafting passes.
- **Bounded sample.** Agreement on 45 records is machine agreement, not human review. The sample does not certify the 67 unsampled records.
- **Related records not checked.** None of the findings is material, but two concern licence history:
  - the M2 initial Apache 2.0 licence;
  - the M3 commercial-use terms.

  Related records that use the same sources were not checked. These are the MiniMax-M1 and MiniMax-M2 model cards, and the other Kimi and Seed licence records.

- **Translations.** The machine translations were compared with the Chinese originals by the same model family. No human verification of any translation is claimed.

## Dispositions (coordinator, 2026-10-27)

All six minor findings were applied in the drafts before the final merge:

- `c2-bytedance-seed-oss-licence`: the time note and source note now say that the LICENSE file is present, unchanged, from the initial commit of 20 August 2025.
- `c2-minimax-01-licence-military`: the locator now reads "LICENSE, unheaded list of prohibited uses following Section 8, item 2".
- `c2-minimax-prospectus-safety-assessment`: the locator now reads "Business, AI safety and alignment measures, p. 277".
- `c2-minimax-m2-licence-oct`: the qualification now records the Apache 2.0 text of the initial commit of 26 October 2025.
- `c2-minimax-m3-licence`: the statement now says that the grant covers non-commercial purposes and that the conditions set terms for commercial use. The qualification names the separate commercial-use record and the initial commit of 12 June 2026.
- `c2-baidu-ernie-45-licence`: the statement names the `ERNIE-4.5-300B-A47B-PT` repository. The notes no longer call revision 049f3d9b the latest, and they say that later revisions keep the licence wording.

The auditor's observations on how affiliations are encoded (Peng Cheng Laboratory, CNCERT/CC, Concordia AI as `published`) are open mapping questions for admission. They are listed in the review note.
