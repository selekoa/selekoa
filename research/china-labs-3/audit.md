# Chinese frontier-AI institutions, third collection: fresh-context machine audit

- **Auditor:** fresh-context same-family pass (Claude).
- **Date:** 29 October 2026.
- **Record:** [audit.json](audit.json) holds the per-record findings and the sources retrieved for each.
- **Cross-family check:** this is a same-family check. It does not meet the editorial policy's cross-family requirement for admission.

## Method

The auditor read `AGENTS.md`, the editorial policy, [scope.md](scope.md) and [drafting-brief.md](drafting-brief.md). It then read the sampled records from `pack.json`, with their evidence, sources and entities. It did not read the drafting passes' `searched` notes.

Every source cited by a sampled record (56 sources) was retrieved again, one at a time and directly, into the auditor's own cache (`LG_CACHE=audit`). Each quote, or each paraphrase's anchor, was located in the retrieved text and read in context. Table rows, page numbers and wrapped filing numbers were read from `pdftotext -layout`.

Versions and dates were checked independently of the pack's notes:

- **Hugging Face commit and tree listings** for Yi-34B, Yi-1.5-34B, step3, Step-5-Preview, Hunyuan-A13B-Instruct, HunyuanVideo, Tencent-Hunyuan-Large, SenseNova-U1-8B-MoT, Aquila-7B, Intern-S1 and Hy3.
- **Earlier file revisions**, where a record makes a dated licence or history claim:
  - the Yi-34B README, scanned back for the Llama sentence;
  - the Yi-34B LICENSE before 30 May 2024;
  - the HunyuanVideo LICENSE of 2 and 4 December 2024;
  - the Tencent-Hunyuan-Large LICENSE.txt from 5 November 2024;
  - the Step-5-Preview README of 13 October 2026.
- **A blobless clone** of InternLM/InternLM, made in the scratchpad.
- **CAC lists:** the row counts were recounted. The "earliest list" statements for DeepSeek and BAAI were checked against attachments 1–7 of the CAC page; attachments 3, 5 and 6 were fetched for this purpose.

Chinese passages were read in Chinese and the machine translations compared with them.

## Coverage

78 records were audited:

- **Random sample:** 43 records, drawn with `tools.mjs sample 20 20261029`.
- **Targeted:** 35 records. These are every capital, inferred, reporting-only, legal-entity, founding and co-founding record, every developer entry in a CAC listing, and the licence records with territory exclusions, a dated licence change or an internal conflict.

Every source cited by these records was retrieved. A bounded sample does not certify the 134 unsampled records.

## Results

| Disposition   | Random | Targeted | All |
| ------------- | -----: | -------: | --: |
| ok            |     34 |       25 |  59 |
| minor         |      7 |        7 |  14 |
| material      |      2 |        3 |   5 |
| not retrieved |      0 |        0 |   0 |

Every quote was found verbatim in the cited expression. The material findings concern how passages were cut, who the subject is, ownership wording, a predicate and a date.

### Material findings

- **c3-01ai-yi-llama-statement: the ellipsis drops a negation.** The quote reads "…but are…derivatives of Llama". The README says "but are **NOT** derivatives of Llama".
  - The statement itself is correct, and the date was confirmed: the README revision of 6 February 2024 (04b45b49) is the earliest of those checked that carries the sentence.
  - Fix: quote the full sentence, "The Yi series models adopt the same model architecture as Llama but are NOT derivatives of Llama.", and note that the README sets NOT in bold.
- **c3-sensetime-investor-softbank: ownership chain overstated.** The prospectus says:
  - SVF Sense is indirectly wholly owned by SVF Holdings (UK) LLP;
  - SoftBank Vision Fund L.P. is that LLP's managing member;
  - the fund's general partner and its manager are ultimately wholly owned by SoftBank Group Corp.

  It does not say that SVF Sense is ultimately wholly owned by SoftBank Group, but the statement and the qualification say it does.
  - Fix: restate the chain as the filing gives it. Either make SoftBank Vision Fund or SVF Sense the subject, or keep `softbank-group` with an explicit qualification that the filing links SoftBank Group to the fund through its general partner and manager. Hold until the subject is settled.

- **c3-iflytek-investor-china-mobile: the subject is a different company.** The subscriber named in the report is 中国移动通信有限公司. The subject entity `china-mobile` carries 中国移动通信集团有限公司, a different legal name, and the link between the two is not stated.
  - Fix: create an entity for 中国移动通信有限公司 and make it the subject, inferring no parent link; or hold.
- **c3-tencent-video-licence-territory: the licence history is misdated.** The record dates the exclusion of the EU, UK and South Korea to 3 December 2024, the release date in the heading.
  - The LICENSE first uploaded on 2 December 2024 (5687e9af) excluded the EU only. The UK and South Korea were added on 4 December 2024 (a4ed25a9).
  - The cited revision, 6204ad6a, is identical to the 4 December text.
  - Fix: set the time to event 2024-12-04, basis revision, with a note that gives both states. Add the 2 December state to the qualification.
- **c3-shlab-unveiled-2020: the predicate does not fit.** Yicai reports a plaque-unveiling (揭牌), and the record itself says this is not a date of establishment, yet it is filed under `founding_stated`. It rests on reporting only, sits on a founding question and has no `time.basis`.
  - Fix: hold. Either recast it outside `founding_stated` and raise the missing predicate in the review note, or keep it out until the laboratory's own statement or a filing gives a founding date.

### Minor findings

- **c3-governance-cac-genai-list-2024-04-entry-tencent: listed entity conflicts with the pack's own records.** `listedEntity` is `tencent`, matched through the alias 深圳市腾讯计算机系统有限公司. This pack's own Tencent records say that alias names Tencent Computer, and they create `shenzhen-tencent-computer-systems` for it.
  - Fix: point `listedEntity` at `shenzhen-tencent-computer-systems`, or say in the qualification that the alias names Tencent Computer.
  - Fix: replace "the name match given in this pack's brief" with the alias as actually recorded.
- **c3-governance-cac-genai-list-2024-04-entry-shanghai-ai-lab: not an exact-name match.** The filer is 上海人工智能创新中心（上海人工智能实验室）. The laboratory's name appears only in parentheses.
  - Fix: state that the mapping is by partial name.
  - Fix: add no combined alias without a document that states the relation.
- **c3-governance-cac-genai-list-2024-04-entry-stepfun: not an exact-name match.** The dataset alias 上海阶跃星辰智能科技 has no legal-form suffix.
  - Fix: give the documentary basis instead. The same filing number, Shanghai-JieYue-20231106, appears in StepFun's own site footer (c3-stepfun-legal-form-site).
- **c3-governance-cac-genai-list-2025-01-count-registered: unsourced comparison.** The record compares its count with "the 105 registrations in 2024 that the CAC's January 2025 announcement states". The pack holds no such source.
  - Fix: drop the clause, or cite the announcement.
  - Fix: cite c3-src-cac-genai-filings-2025-announcement as context evidence for the description of registration taken from the January 2026 announcement.
- **c3-iflytek-spark-v4-2024: a gloss in the qualification.** "Export restrictions" is the drafter's term. The document says 美国极限施压 ("US maximum pressure").
  - Fix: use the document's term.
- **c3-iflytek-wu-xiaoru-president-2026: the time note implies a start date.** The note implies that his presidency began on 9 January 2026.
  - Fix: say the interval is the seventh board's term, and that earlier tenure as president was not checked.
- **c3-sensetime-sensenova-u1-card: attribution stated as fact.** The statement says "SenseTime's SenseNova team", but the card does not name SenseTime.
  - Fix: write "The sensenova Hugging Face account published…" and keep the attribution in the qualification.
  - Optionally, cite the annual report's sentence on the NEO architecture as closer context.
- **c3-sensetime-wang-xiaogang-chief-scientist: page number.** "p. 69" is the PDF page.
  - Fix: printed p. 68 (PDF p. 69).
- **c3-sensetime-founding-2014: page number.** "p. 198" is wrong.
  - Fix: printed p. 199.
- **c3-sensetime-investor-idg: mapping and derivation.** The fund names are matched to IDG Capital by prefix, and the prospectus never names IDG Capital. The Series A-1 attribution rests on a holding, yet the record is marked explicit; the parallel iFlytek record is marked inferred.
  - Fix: state the mapping basis, or create an entity for the funds.
  - Fix: either mark the A-1 attribution inferred, or reword the period as a holding at the prospectus date.
- **c3-tencent-video-licence: an open note can now be closed.** The note says the December revisions "were not compared".
  - Fix: record the comparison. The 2 December text excluded the EU only, the 4 December update added the UK and South Korea, and the head revision is identical to the 4 December text.
- **c3-stepfun-b-plus-round-2026: wrong date basis.** `time.basis` is "announcement", but the date is the publication of a press report.
  - Fix: set it to "publication".
- **c3-01ai-q-ai-jv: a second date is missing.** The post's dateline is "Astana, 29 June 2026".
  - Fix: add that date to the time note beside the post's creation time of 30 June.
- **c3-stepfun-step5-licence: licence-tag history simplified.** The qualification says the licence replaced the apache-2.0 tag.
  - In fact the tag was removed at 266207ef (13 Oct, 07:14 UTC).
  - The licence files were added at 08:15.
  - `license: other` was set at 555dba45 (08:36).
  - Fix: give the three steps.

## Retrieval failures

- **cninfo, iFlytek board announcement** (`static.cninfo.com.cn/finalpage/2026-01-10/1224927456.PDF`): the first connection failed. The tool retried and got HTTP 200, so nothing was lost.
- **Internet Archive:** not attempted, because it refuses this environment. As a result, the wording of mutable pages is read only as served on 29 October 2026. No capture authenticates it. These are the BJP English text, the BAAI hub post and site bundle, the StepFun site bundle, the 01.AI pages, the Tencent newsroom, Yicai and 36Kr.

## Patterns worth a targeted recheck beyond the sample

- **Licence files revised soon after upload.** The HunyuanVideo LICENSE changed its territory two days after upload, but kept the same release date in its heading. The Yi-34B LICENSE was added on 1 November 2023, and commits titled as LICENSE updates followed on 1, 2 and 4 November, including "Update LICENSE version" on 4 November, before the v2.1 text of 23 November. Recheck every licence record dated by a release date printed in the text against the file's commit history: the A13B and Hy3-preview editions, the other HunyuanVideo provisions, and the Yi v1.0 and v2.1 records.
- **Ellipses in quotes.** Check every quote that elides words, especially across Markdown emphasis, for a dropped negation or qualifier.
- **Ownership chains in the SenseTime prospectus.** Recheck the other `participated_in_round` records drawn from "Information relating to our principal Pre-IPO Investors" for "ultimately owned" wording that the filing gives only for a general partner or manager.
- **Group entity used for a subsidiary.** China Mobile and Tencent Computer show the pattern. Recheck records whose subject or `listedEntity` is a group entity while the source names a subsidiary or operating company.
- **CAC entries.** Seven sampled entries give their basis as "the name match given in this pack's brief", which drafting-brief.md does not contain. Replace it in every entry with the actual basis: the exact alias on the dataset entity, or the partial match and supporting document. The served April 2024 PDF carries a creation date of 2 August 2024 in its metadata, so its bytes may be a later re-export; the listing stays dated by its title.
- **Page locators in HKEX filings.** Printed and PDF page numbers are used inconsistently. Normalise every locator to printed pages, or state which numbering is used.
- **Two legal names on one entity.** c3-01ai-legal-form-licensor (北京零一万物信息技术有限公司) and the CAC alias (北京零一万物科技有限公司) attach two differently named companies to `zero-one-ai`. StepFun's site footer (股份有限公司) and its CAC filer (有限公司) do the same for `stepfun`. Both records are marked inferred and qualified. Whether `has_legal_form` should hold such a name is a mapping decision for the maintainer.
- **`supersedes_document` for TC260 editions.** The texts say that each edition updates its predecessor, not that it replaces it. The brief allows "updates", but the predicate definition says "replacement". This is for the maintainer to decide.

## Limits

- **Same-family check.** The auditor belongs to the same model family as the drafting passes.
- **Machine agreement only.** Agreement on 59 records is machine agreement, not human review.
- **Translations.** The machine translations were compared with the Chinese originals by the same model family. No human verification of any translation is claimed.

## Dispositions (coordinator, 29 October 2026)

The coordinator applied the audit's findings to the drafts, re-merged, and ran `verify` against both caches. Three records are held for the maintainer: each carries a `reviewHold` note in `pack.json` and stays in the cross-family brief.

| Record                                                                 | Finding                                                  | Disposition                                                                                                                                                                                                                        |
| ---------------------------------------------------------------------- | -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| c3-01ai-yi-llama-statement                                             | ellipsis dropped NOT                                     | Fixed: the full sentence is quoted with its Markdown bold, and an evidence note says so.                                                                                                                                           |
| c3-sensetime-investor-softbank                                         | ownership chain overstated                               | Restated as the filing gives it (SVF Sense → SVF Holdings (UK) LLP; SoftBank Group ultimately owns the general partner and the manager). **Held** on the subject (SoftBank Group, the fund or SVF Sense): review note, question 4. |
| c3-iflytek-investor-china-mobile                                       | subscriber is a different legal entity                   | Qualification corrected. **Held** until 中国移动通信有限公司 has its own entity or the link is documented: question 4.                                                                                                             |
| c3-tencent-video-licence-territory                                     | exclusion misdated                                       | Fixed: event 2024-12-04, basis revision; both states in the note and qualification.                                                                                                                                                |
| c3-shlab-unveiled-2020                                                 | plaque unveiling under `founding_stated`, reporting only | `time.basis` set to publication. **Held**: question 5.                                                                                                                                                                             |
| Seven CAC entries                                                      | "the name match given in this pack's brief"              | Replaced in each record with the real basis: exact alias, partial name (Shanghai AI Laboratory) or filing number (StepFun). The Tencent entry now lists `shenzhen-tencent-computer-systems`.                                       |
| c3-governance-cac-genai-list-2025-01-count-registered                  | unsourced comparison                                     | Comparison removed from the count note; the qualification refers to the dataset record fl-cn-filings-2025-count instead.                                                                                                           |
| c3-iflytek-spark-v4-2024                                               | gloss "export restrictions"                              | Replaced with the announcement's own term, 极限施压 ("maximum pressure").                                                                                                                                                          |
| c3-iflytek-wu-xiaoru-president-2026                                    | interval implied a start                                 | Time note limits the interval to this board's term.                                                                                                                                                                                |
| c3-sensetime-sensenova-u1-card                                         | card does not name SenseTime                             | Statement names the `sensenova` account; the attribution stays in the qualification.                                                                                                                                               |
| c3-sensetime-wang-xiaogang-chief-scientist, c3-sensetime-founding-2014 | page locators                                            | Corrected.                                                                                                                                                                                                                         |
| c3-sensetime-investor-idg                                              | mapping and derivation                                   | Marked inferred, with a rationale; the qualification states the name-prefix mapping.                                                                                                                                               |
| c3-tencent-video-licence                                               | "not compared"                                           | The note gives the 2 and 4 December 2024 states.                                                                                                                                                                                   |
| c3-stepfun-b-plus-round-2026                                           | date basis                                               | Basis set to publication.                                                                                                                                                                                                          |
| c3-01ai-q-ai-jv                                                        | dateline missing                                         | Dateline added to the time note.                                                                                                                                                                                                   |
| c3-stepfun-step5-licence                                               | tag history simplified                                   | Replaced with the commit sequence of 13 October 2026.                                                                                                                                                                              |

### Rechecks beyond the sample

- **Quotes with ellipses** (24 evidence items): a script compared the text each ellipsis omits in the cached source. No other dropped negation or qualifier was found. Two Tencent role quotes omit only the person's age. The SenseTime principles quote joins seven headings across pp. 15–18, as its locator says.
- **Licences dated by their heading.** These were checked against blobless clones of the Hugging Face repositories:
  - **Hunyuan-A13B LICENSE:** unchanged, apart from whitespace and line endings, since 25 June 2025. The time note now says so.
  - **Hy3-preview LICENSE:** a single commit of 23 April 2026.
  - **Tencent-Hunyuan-Large LICENSE.txt:** last changed on 5 November 2024.
  - **Yi-34B LICENSE:** after the cited commit of 1 November 2023, the non-commercial sentence was removed on 4 November 2023 while the file still read Version 1.0 (18156fa); the file was relabelled Version 2.0 later that day (c8651b5). The four v1.0 records now say so.
- **Other SenseTime investor records:** the iFlytek record uses no "ultimately owned" wording, and it was already marked inferred.
- **HKEX page numbers:** printed and PDF page numbers are mixed across the filings. Only the two sampled locators were corrected; the README lists this as a known limit.
- **Not acted on, for the maintainer:**
  - two legal names on one entity (`zero-one-ai`, `stepfun`): question 6;
  - `supersedes_document` for TC260 editions that say they "update" the earlier ones: question 7.
