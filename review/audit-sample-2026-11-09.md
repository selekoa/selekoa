# Independent blind audit, 9 November 2026

| Stratum | Sample | Correct | Minor slip | Material error | Cannot check |
| --- | ---: | ---: | ---: | ---: | ---: |
| Laws comparison | 40 | 12 | 22 | 1 | 5 |
| Predictions | 30 | 24 | 3 | 1 | 2 |
| AI and money | 40 | 38 | 0 | 2 | 0 |
| Targeted | 10 | 3 | 3 | 3 | 1 |

Base commit `d402db7cfa5f6a8763b4845030508b5a2fc22329`.

## Sample and blind order

Seed **20261109**, generator **Mulberry32**. One shared 32-bit stream. Sort each pool by ascending claim ID using code-unit order. In laws, predictions, then AI-and-money order, perform the first n forward Fisher–Yates swaps. At step i swap i with i + floor(random × (N − i)); retain the first n records in draw order. The 144 law-facet records yielded 40 draws including four Illinois cells. The 65 prediction records yielded 30 draws. The 204 AI-and-money records yielded 40 draws including nine institutional events. The ten targeted items are additional.

1. Fetched origin and branched from origin/main. Before finalising the verdicts I used the user-supplied project instructions, permitted dataset files and collection criteria, and the cited sources or explicitly identified alternate copies.
2. Drew the three seeded strata, then selected ten distinct targeted records based on the risks visible in the admitted data. I opened no file in review/ or research/ and did not open docs/backlog.md or release/CHANGELOG.md before the blind push.
3. Attempted fresh direct HTTP sequentially with at least eight seconds from the end of one request to the next on the same hostname. Used the cited capture for archive-specific records and as a fallback when live retrieval failed. Cleaned signed query parameters and used no Wikipedia evidence.
4. Validated the two reports in scratch space before writing them to review/. The blind reports are the first commit. The privacy scan and any reading of excluded repository material follow the first push.

## Reading the verdicts

- A material error changes the claim’s documentary meaning, criterion outcome, voice, or structured semantics. Minor slips preserve the substantive conclusion. Cannot check identifies a missing expression or missing evidence for a necessary check.
- I compared wording and locators in retrieved HTML and PDFs, allowing line wraps and typesetting where they preserve wording. I used fresh page-image OCR for Dartmouth, Turing and Simon–Newell, checked relevant context and documented differing expressions. A successful HTTP status can still be an access challenge or service error.
- Dates refer to the cited expression, statement or act. An as-enacted law’s approval date can be right even when the metadata date kind is wrong. Earliest-located checks assess the cited witness and its assigned role under the collection’s scope. I did not rerun the original discovery searches.
- Every sampled prediction record preserves the distinction between prediction and fulfilment. The audit assesses the documentary record only.
- California’s official bill text returned HTTP 403 and its cited capture returned HTTP 429. An indexed mirror gave partial corroboration. I did not retrieve the bulk legislative archive or treat the index as a fresh check of that expression.

## Material errors

### `lc-cell-ny-ch96-q09`

The published Q09 criterion accepts a mandatory disclosure channel. This statutory critical-safety-incident mechanism is specific to reportable risks and violations even though it offers no retaliation protection.

> The office shall establish a mechanism to be used by a frontier developer or a member of the public to report a critical safety incident

GBL § 1422(1), S8828 p. 5, lines 42–44. [Source](https://nyassembly.gov/leg/?default_fld=&leg_video=&bn=S8828&term=2025&Summary=Y&Actions=Y&Text=Y)

### `pr-e-legg-2010-log-normal`

The author gives a distribution mean and mode. Neither is a quantile or probability, but the record encodes both as probability points under a quantile horizon. The live dated post confirms the wording. The archived capture was unavailable.

> a log-normal distribution with a mean of 2028, and a mode of 2025

Goodbye 2010, human-level AGI paragraph. [Source](https://www.vetta.org/2010/12/goodbye-2010/)

### `am-u02-boe-2025-fsif-ai`

The report expressly presents the Financial Policy Committee’s view. The claim text names the FPC correctly, but the institutional voice label treats a committee view as the authority’s own text under the published voice rule.

> The Financial Stability in Focus sets out the Financial Policy Committee’s view on specific topics related to financial stability.

Publisher page, introductory description. [Source](https://www.bankofengland.co.uk/financial-stability-in-focus/2025/april-2025)

### `am-u12-frb-2018-brainard-ai`

The speech identifies potentially relevant existing rules as a starting point and explicitly leaves adequacy to assessment. This fits context rather than the J12 earliest articulation that existing rules broadly suffice without a separate framework.

> Our existing regulatory and supervisory guardrails are a good place to start as we assess the appropriate approach for AI processes.

Current Regulatory and Supervisory Approaches, paragraph beginning “It is incumbent on regulators”. [Source](https://www.federalreserve.gov/newsevents/speech/brainard20181113a.htm)

### `am-u12-pbc-2019-fintech-plan-contests`

The plan calls for studying and formulating rules and promoting a policy system. It does not take a position on whether existing frameworks broadly apply or whether a separate framework is required, so the passage supports context rather than earliest contesting.

> 研究制定人工智能金融应用监管规则

Part III, item (六), PDF and printed p. 14. [Source](https://www.pbc.gov.cn/zhengwugongkai/4081330/4406346/4693549/4085169/2019090617242730910.pdf)

Selection reason — Earliest contesting headline and translated policy language may conflate planned rule changes with a rejection of adequacy.

### `lc-cell-cn-genai-measures-q03`

Q03 expressly allows partly where risk-management measures are required without a written framework. Article 4(2) mandates anti-discrimination measures in model development, and Article 14 requires corrective measures including model optimisation training.

> 采取模型优化训练等措施进行整改

Articles 4(2) and 14(1). [Source](https://www.gov.cn/zhengce/zhengceku/202307/content_6891752.htm)

Selection reason — Search bounded by scope could miss regulator-facing written security assessments or model-risk measures.

### `am-event-ecb-2026-ai-research-lab`

The speaker says the lab is being established, which describes establishment in progress. The announced stage misses that status. The wording leaves the start of operations open and the disclaimer keeps the voice with Lane.

> Second, we are also establishing an AI research lab

AI at the ECB, second pillar. [Source](https://www.ecb.europa.eu/press/key/date/2026/html/ecb.sp260323_1~1e06784a89.en.html)

Selection reason — A speech with personal-view disclaimer reports a lab being established, testing both voice and the announced/under-way boundary.

## Verdict register

### Laws comparison

- `lc-cell-il-aisma-q10` — **cannot check**. Official Actions page timed out and its archive was rate-limited. The indexed approval row corroborates July 6, but I could not inspect both cited action rows. [Source](https://web.archive.org/web/20260731225100id_/https://www.ilga.gov/Legislation/BillStatus?DocNum=315&GAID=18&DocTypeID=SB&LegId=157797&SessionID=114)
- `lc-cell-cn-labelling-measures-q06` — **minor slip**. Articles 7 and 12 support document review and the translations. The March 7 notice date is labelled publication in the claim. Passage at Issuing notice 国信办通字〔2025〕2号, date line — “2025年3月7日”. [Source](https://www.gov.cn/zhengce/zhengceku/202503/content_7014286.htm)
- `lc-cell-ny-ch96-q04` — **minor slip**. § 1421 requires website publication and allows redaction. The claim labels the March 27 signature as publication. Passage at New York Assembly Actions, final entry — “03/27/2026 SIGNED CHAP.96”. [Source](https://nyassembly.gov/leg/?default_fld=&leg_video=&bn=S8828&term=2025&Summary=Y&Actions=Y&Text=Y)
- `lc-cell-eu-ai-act-q02` — **minor slip**. Article 51 supports the status and figure, but the verbatim display flattens 10²⁵ to 1025. Passage at Article 51(2), closing words — “greater than 10²⁵”. [Source](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=OJ:L_202401689)
- `lc-cell-eu-code-ss-q04` — **correct**. Measures 1.4 and 10.2 require AI Office access and conditional public disclosure by signatories. [Source](https://ec.europa.eu/newsroom/dae/redirection/document/118119)
- `lc-cell-ny-ch96-q09` — **material error**. The published Q09 criterion accepts a mandatory disclosure channel. This statutory critical-safety-incident mechanism is specific to reportable risks and violations even though it offers no retaliation protection. [Source](https://nyassembly.gov/leg/?default_fld=&leg_video=&bn=S8828&term=2025&Summary=Y&Actions=Y&Text=Y)
- `lc-cell-ca-sb53-q12` — **cannot check**. Official chaptered text and cited archive refused access, so the whole-instrument absence is unverified. [Source](https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=202520260SB53)
- `lc-cell-ny-ch96-q01` — **minor slip**. Both defined terms appear in § 1420. The claim labels the March 27 signature as publication. Passage at New York Assembly Actions, final entry — “03/27/2026 SIGNED CHAP.96”. [Source](https://nyassembly.gov/leg/?default_fld=&leg_video=&bn=S8828&term=2025&Summary=Y&Actions=Y&Text=Y)
- `lc-cell-us-eo14110-q10` — **correct**. The signature block says October 30 and the Federal Register issue is dated November 1. [Source](https://www.govinfo.gov/content/pkg/FR-2023-11-01/pdf/2023-24283.pdf)
- `lc-cell-eu-code-ss-q08` — **correct**. Commitment 7 and Measure 7.7 support the report and access triggers. [Source](https://ec.europa.eu/newsroom/dae/redirection/document/118119)
- `lc-cell-ny-ch96-q10` — **minor slip**. The Actions list confirms March 27 as signature, while claim time labels it publication. Passage at Assembly Actions, final entry — “03/27/2026 SIGNED CHAP.96”. [Source](https://nyassembly.gov/leg/?default_fld=&leg_video=&bn=S8828&term=2025&Summary=Y&Actions=Y&Text=Y)
- `lc-cell-eu-ai-act-q14` — **correct**. Articles 92 and 101 identify evaluation and enforcement powers and the Omnibus recital confirms Commission competence. [Source](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=OJ:L_202401689)
- `lc-cell-cn-labelling-measures-q05` — **minor slip**. Articles 6 and 12 address label checks and procedural submissions without imposing model-risk testing. March 7 dates the notice rather than its publication. Passage at Issuing notice 国信办通字〔2025〕2号, date line — “2025年3月7日”. [Source](https://www.gov.cn/zhengce/zhengceku/202503/content_7014286.htm)
- `lc-cell-cn-genai-measures-q10` — **minor slip**. The date line supports issuance on July 10. The claim time labels it publication rather than issuance. Passage at Order No. 15, date line — “2023年7月10日”. [Source](https://www.cac.gov.cn/2023-07/13/c_1690898327029107.htm)
- `lc-cell-cn-genai-measures-q12` — **minor slip**. Article 24 and the order give the general effective date with no distinct application provision located. July 10 is the order date rather than publication. Passage at Order No. 15, dated signature block — “2023年7月10日”. [Source](https://www.gov.cn/zhengce/zhengceku/202307/content_6891752.htm)
- `lc-cell-eu-ai-act-q05` — **correct**. Article 55(1)(a) directly requires model evaluation and adversarial testing of systemic-risk models. [Source](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=OJ:L_202401689)
- `lc-cell-us-eo14110-q05` — **correct**. Sections 4.1 and 4.2 distinguish NIST testing guidance and reporting of results from a developer duty to test. [Source](https://www.govinfo.gov/content/pkg/FR-2023-11-01/pdf/2023-24283.pdf)
- `lc-cell-ny-ch96-q13` — **minor slip**. §§ 1427–1428 support the maxima and penalty bases. March 27 is labelled publication rather than signature. Passage at New York Assembly Actions, final entry — “03/27/2026 SIGNED CHAP.96”. [Source](https://nyassembly.gov/leg/?default_fld=&leg_video=&bn=S8828&term=2025&Summary=Y&Actions=Y&Text=Y)
- `lc-cell-cn-genai-measures-q01` — **minor slip**. Articles 7 and 22 identify providers, including API providers. July 10 dates the order rather than publication. Passage at Order No. 15, dated signature block — “2023年7月10日”. [Source](https://www.gov.cn/zhengce/zhengceku/202307/content_6891752.htm)
- `lc-cell-eu-ai-act-q01` — **correct**. Articles 53 and 55 impose the duties on providers of GPAI models and systemic-risk GPAI models. [Source](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=OJ:L_202401689)
- `lc-cell-eu-ai-act-q06` — **correct**. Article 92 permits AI Office evaluation and independent experts without mandating outside testing. [Source](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=OJ:L_202401689)
- `lc-cell-eu-code-ss-q05` — **correct**. Measures 1.2 and 3.2 require evaluation and specify pre-market timing for the full process. [Source](https://ec.europa.eu/newsroom/dae/redirection/document/118119)
- `lc-cell-ca-sb53-q06` — **cannot check**. Official chaptered text and cited archive refused access, so the review duty and scope cannot be checked against that expression. [Source](https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=202520260SB53)
- `lc-cell-cn-genai-measures-q02` — **minor slip**. Article 2 supports the public-service scope without a model threshold. July 10 dates the order rather than publication. Passage at Order No. 15, dated signature block — “2023年7月10日”. [Source](https://www.cac.gov.cn/2023-07/13/c_1690898327029107.htm)
- `lc-cell-ny-ch699-q08` — **minor slip**. § 1421 requires retention of model test material and transmission of the developer protocol, so the scoped absence stands. December 19 is signature, labelled publication. Passage at New York Senate S6953B, Actions entry for signature — “SIGNED CHAP.699”. [Source](https://legislation.nysenate.gov/pdf/bills/2025/S6953B)
- `lc-cell-il-aisma-q13` — **minor slip**. Sections 18 and 25 support the maxima and triggers. July 6 dates gubernatorial approval rather than publication. Passage at Illinois General Assembly, SB 315 Actions table, indexed row — “7/06/2026 Senate Governor Approved”. [Source](https://web.archive.org/web/20260908054441/https://www.ilga.gov/Documents/Legislation/PublicActs/104/PDF/104-0538.pdf)
- `lc-cell-us-bis-ifr-q02` — **minor slip**. The 4E091 heading and notes support the threshold and exemptions. The record supplies the correct figure in its note but the threshold quote stops before it, although Q02 asks for the figure in the quote. Passage at 90 FR 4578, ECCN 4E091 heading — “10²⁶ or more ‘operations’”. [Source](https://www.govinfo.gov/content/pkg/FR-2025-01-15/pdf/2025-00636.pdf)
- `lc-cell-ca-sb53-q10` — **cannot check**. The cited CAML history and capture could not be opened. [Source](https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=202520260SB53)
- `lc-cell-cn-genai-measures-q09` — **minor slip**. Articles 15 and 18 concern public complaints and reporting without whistleblower safeguards. July 10 dates the order rather than publication. Passage at Order No. 15, dated signature block — “2023年7月10日”. [Source](https://www.gov.cn/zhengce/zhengceku/202307/content_6891752.htm)
- `lc-cell-il-aisma-q07` — **minor slip**. Section 15(c) confirms the two deadlines and recipients. July 6 dates approval rather than publication. Passage at Illinois General Assembly, SB 315 Actions table, indexed row — “7/06/2026 Senate Governor Approved”. [Source](https://web.archive.org/web/20260908054441/https://www.ilga.gov/Documents/Legislation/PublicActs/104/PDF/104-0538.pdf)
- `lc-cell-ny-ch699-q12` — **minor slip**. Bill § 3 gives the general effect rule and § 1421 sets deployment triggers. December 19 is signature, labelled publication. Passage at New York Senate S6953B, Actions entry for signature — “SIGNED CHAP.699”. [Source](https://legislation.nysenate.gov/pdf/bills/2025/S6953B)
- `lc-cell-ca-sb53-q01` — **cannot check**. Official chaptered text and cited archive refused access, so both cited definitions remain unchecked. [Source](https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=202520260SB53)
- `lc-cell-ny-ch699-q04` — **minor slip**. § 1421(1)(c)(i) supports publication and transmission, with line numbers and a line-end hyphen removed. December 19 is signature, labelled publication. Passage at New York Senate S6953B, Actions entry for signature — “SIGNED CHAP.699”. [Source](https://legislation.nysenate.gov/pdf/bills/2025/S6953B)
- `lc-cell-ny-ch96-q06` — **minor slip**. § 1422 mandates review of filings while § 1421 describes third-party use without requiring it. March 27 is signature, labelled publication. Passage at New York Assembly Actions, final entry — “03/27/2026 SIGNED CHAP.96”. [Source](https://nyassembly.gov/leg/?default_fld=&leg_video=&bn=S8828&term=2025&Summary=Y&Actions=Y&Text=Y)
- `lc-cell-eu-code-ss-q02` — **correct**. The recital imports the Act’s scope and Measure 1.2 leaves evaluation triggers to signatories. [Source](https://ec.europa.eu/newsroom/dae/redirection/document/118119)
- `lc-cell-us-bis-ifr-q13` — **correct**. Supplement 10 paragraph 19 provides VEU consequences and refers to other penalties without giving a maximum. [Source](https://www.govinfo.gov/content/pkg/FR-2025-01-15/pdf/2025-00636.pdf)
- `lc-cell-cn-genai-measures-q15` — **minor slip**. Articles 12, 16 and 17 cross-reference rules and direct future guidance without identifying a provider compliance code or standard. July 10 dates issuance rather than publication. Passage at Order No. 15, dated signature block — “2023年7月10日”. [Source](https://www.gov.cn/zhengce/zhengceku/202307/content_6891752.htm)
- `lc-cell-eu-ai-act-q09` — **correct**. Article 87 expressly applies the whistleblower directive by reference. [Source](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=OJ:L_202401689)
- `lc-cell-ny-ch699-q13` — **minor slip**. § 1422(1)(a) confirms both maxima after removing printed line numbers. December 19 is signature, labelled publication. Passage at New York Senate S6953B, Actions entry for signature — “SIGNED CHAP.699”. [Source](https://legislation.nysenate.gov/pdf/bills/2025/S6953B)
- `lc-cell-il-aisma-q08` — **minor slip**. Section 10(c) confirms the model-specific report and deployment trigger. July 6 dates approval rather than publication. Passage at Illinois General Assembly, SB 315 Actions table, indexed row — “7/06/2026 Senate Governor Approved”. [Source](https://web.archive.org/web/20260908054441/https://www.ilga.gov/Documents/Legislation/PublicActs/104/PDF/104-0538.pdf)

### Predictions

- `pr-a-lighthill-1973-correspondents-2000` — **correct**. Lighthill’s 1973 report attributes the printed 2000 horizon to unnamed correspondents and dates the underlying predictions to 1972. [Source](http://www.chilton-computing.org.uk/inf/literature/reports/lighthill_report/p001.htm)
- `pr-f-amodei-2025-country-of-geniuses` — **correct**. The April 2025 essay gives the stated 2026 or 2027 horizon and the modal wording without assigning numerical odds. [Source](https://darioamodei.com/post/the-urgency-of-interpretability)
- `pr-e-aschenbrenner-2024-agi-2027` — **correct**. The dated chapter opening gives AGI by 2027 and the qualitative plausibility in the author’s words. [Source](https://situational-awareness.ai/from-gpt-4-to-agi/)
- `pr-b-bostrom-1998-first-third` — **correct**. The author-hosted abstract gives the relative period and the case-for-believing hedge. The record qualifies when the wording was seen. [Source](https://nickbostrom.com/papers/how-long-before-superintelligence/)
- `pr-f-altman-2025-robots-2027` — **correct**. The dated Altman post says 2027 may see the stated robot capability, without numerical odds. [Source](https://blog.samaltman.com/the-gentle-singularity)
- `pr-a-lighthill-1973-correspondents-1980s` — **correct**. Lighthill reports his unnamed correspondents’ 1980s possibility and the quoted human-scale knowledge-base wording. [Source](http://www.chilton-computing.org.uk/inf/literature/reports/lighthill_report/p001.htm)
- `pr-f-amodei-2026-few-years-everything` — **correct**. The January 2026 essay states a few years under the explicit exponential-continuation condition. [Source](https://darioamodei.com/essay/the-adolescence-of-technology)
- `pr-c-espai-2022-hlmi-2059` — **correct**. The survey’s own results page prints 50%, 37 years and 2059, and states the condition on continuing scientific activity. [Source](https://wiki.aiimpacts.org/ai_timelines/predictions_of_human-level_ai_timelines/ai_timeline_surveys/2022_expert_survey_on_progress_in_ai)
- `pr-f-amodei-2024-powerful-ai-2026` — **correct**. The October 2024 essay gives 2026 as the earliest possibility and explicitly allows a much longer horizon. [Source](https://darioamodei.com/essay/machines-of-loving-grace)
- `pr-b-vinge-1993-2005-2030` — **correct**. The NTRS proceedings expression gives 2005 and 2030 as the two boundaries and identifies the event in the previous sentence. [Source](https://ntrs.nasa.gov/api/citations/19940022856/downloads/19940022856.pdf)
- `pr-e-cotra-2020-bio-anchors-as-reported-2022` — **correct**. The 2022 post reports both 2020 numbers verbatim and distinguishes the date of the estimate from the date of the restatement. [Source](https://www.lesswrong.com/posts/AfH2oPHCApdKicM4m/two-year-update-on-my-personal-ai-timelines)
- `pr-a-turing-1950-end-of-century` — **minor slip**. The words match § 6 of the cited Mind offprint. The locator refers to a different transcription and page. Passage at Mind offprint, § 6, printed p. 442, scan 10 — “Nevertheless I believe that at the end of the century”. [Source](https://mediadepot.kings.cam.ac.uk/getmedia/81/be4a3d910d5d58e3911315113c60a09f6293fa896a5e3795998fa6b4fb72b71446336e3c7c92d5e08fd0fb2762b6f663279ba799d7fd562480b4bf63c63e02b9)
- `pr-b-kurzweil-2001-1000-dollars-2023` — **correct**. The author-hosted model section gives the cost, capability and “around” horizon. January 2001 is the page’s own dating, with the later wording attestation qualified. [Source](https://www.writingsbyraykurzweil.com/the-law-of-accelerating-returns)
- `pr-c-grace-2024-every-task` — **correct**. The arXiv v1 abstract states both probability–year pairs and its uninterrupted-science condition. [Source](https://arxiv.org/pdf/2401.02843v1)
- `pr-c-grace-2017-ten-years` — **correct**. The v1 abstract gives the relative ten years and examples. Its abstract does not assign a probability to the example dates. [Source](https://arxiv.org/pdf/1705.08807v1)
- `pr-b-vinge-1993-thirty-years` — **correct**. The proceedings text prints “during the next thirty years” and the record leaves it relative. [Source](https://ntrs.nasa.gov/api/citations/19940022856/downloads/19940022856.pdf)
- `pr-f-openai-2025-more-significant-discoveries` — **cannot check**. The cited 7 November capture and direct publisher fetch were blocked. The indexed current publisher text corroborates the wording without dating the captured expression. [Source](https://web.archive.org/web/20251107162450/https://openai.com/index/ai-progress-and-recommendations/)
- `pr-a-turing-1950-imitation-game` — **minor slip**. The cited offprint prints 10⁹ and “per cent.”. The transcription flattens the exponent and points to a different page. The record’s qualification explains the exponent and correctly treats 70% as an event threshold. Passage at Mind offprint, § 6, printed p. 442, scan 10 — “with a storage capacity of about 10⁹”. [Source](https://mediadepot.kings.cam.ac.uk/getmedia/81/be4a3d910d5d58e3911315113c60a09f6293fa896a5e3795998fa6b4fb72b71446336e3c7c92d5e08fd0fb2762b6f663279ba799d7fd562480b4bf63c63e02b9)
- `pr-c-zhang-2022-hlmi-2060` — **correct**. The v1 abstract states 50% by 2060 and appendix B.1 supplies the cross-sectional definition. [Source](https://arxiv.org/pdf/2206.04132v1)
- `pr-a-dartmouth-1955-summer` — **correct**. The dated typescript and author-hosted transcription give the conditional advance and summer duration, with the 1956 study date separate. [Source](https://raysolomonoff.com/dartmouth/boxa/dart564propsmisssingps.pdf)
- `pr-e-legg-2010-log-normal` — **material error**. The author gives a distribution mean and mode. Neither is a quantile or probability, but the record encodes both as probability points under a quantile horizon. The live dated post confirms the wording. The archived capture was unavailable. [Source](https://www.vetta.org/2010/12/goodbye-2010/)
- `pr-e-cotra-2022-update` — **correct**. Cotra’s dated update states all four revised points with approximate language and keeps the earlier median separate. [Source](https://www.lesswrong.com/posts/AfH2oPHCApdKicM4m/two-year-update-on-my-personal-ai-timelines)
- `pr-f-google-deepmind-2025-by-2030` — **correct**. The dated preprint calls development by 2030 plausible under high uncertainty, in an explicitly labelled assumption. [Source](https://arxiv.org/pdf/2504.01849v1)
- `pr-c-baum-2011-agi09` — **correct**. The published assessment abstract reports a horizon of decades and describes the expert result as a majority, without an invented probability. [Source](https://sethbaum.com/ac/2011_AI-Experts.pdf)
- `pr-a-simon-newell-1958-theorem` — **correct**. Printed p. 7 gives the ten-year theorem forecast. The footnote dates Simon’s delivery and identifies the paper’s content as joint. [Source](https://cse.buffalo.edu/~rapaport/584/S07/02Feb2007Readings.pdf)
- `pr-b-degaris-1989-commonplace` — **minor slip**. The quoted words and relative horizon match the journal PDF, but the locator points to another dataset record rather than the source’s page and section. Passage at AI Magazine 10(2), printed p. 20, “As Machines Grow Smarter” — “In 20 years time, it will be commonplace to say”. [Source](https://ojs.aaai.org/aimagazine/index.php/aimagazine/article/download/741/659)
- `pr-c-grace-2024-occupations` — **correct**. The v1 abstract prints both probability–year pairs and distinguishes occupation automation from task performance. [Source](https://arxiv.org/pdf/2401.02843v1)
- `pr-f-amodei-2026-one-to-two-years` — **correct**. The January 2026 essay explicitly restates the 1–2-year possibility and says it could be further out. [Source](https://darioamodei.com/essay/the-adolescence-of-technology)
- `pr-f-openai-2023-superalignment-this-decade` — **cannot check**. The cited 5 July archive and direct publisher fetch were blocked. The indexed current publisher text corroborates the relative decade, without dating the captured expression. [Source](https://web.archive.org/web/20230705170451/https://openai.com/blog/introducing-superalignment)
- `pr-f-altman-2025-novel-insights-2026` — **correct**. Altman’s dated post prints 2026 and “will likely see” in the same forecast. [Source](https://blog.samaltman.com/the-gentle-singularity)

### AI and money

- `am-u02-boe-2022-dp5-22` — **correct**. Joint BoE/PRA and FCA discussion paper § 3.23 identifies a systemic single point of failure from third-party AI dependence. [Source](https://www.bankofengland.co.uk/prudential-regulation/publication/2022/october/artificial-intelligence)
- `am-u09-pbc-2021-fintech-plan-2022-2025` — **correct**. Item 22 requires NLP and pattern-recognition work in supervision, and the notice dates and translations distinguish a task from completed work. [Source](https://www.pbc.gov.cn/zhengwugongkai/4081330/4406346/4693549/4470403/index.html)
- `am-u09-ssm-2024-mccaul-data-to-decisions` — **correct**. McCaul’s attributed article explicitly urges supervisory use and names Athena as an application. [Source](https://www.bankingsupervision.europa.eu/press/interviews/date/2024/html/ssm.in240226~c6f7fc9251.en.html)
- `am-u03-boe-2026-bailey-mansion-house` — **correct**. Bailey’s dated speech connects frontier models’ exploit capabilities to systems security and financial stability. [Source](https://www.bankofengland.co.uk/speech/2026/july/andrew-bailey-speech-at-manison-house)
- `am-u01-boe-2017-carney-promise-fintech-context` — **correct**. Carney’s speech describes correlated algorithms without an AI-specific link in that passage, fitting context. [Source](https://www.bankofengland.co.uk/-/media/boe/files/speech/2017/the-promise-of-fintech-something-new-under-the-sun.pdf)
- `am-u02-boe-2025-fsif-ai` — **material error**. The report expressly presents the Financial Policy Committee’s view. The claim text names the FPC correctly, but the institutional voice label treats a committee view as the authority’s own text under the published voice rule. [Source](https://www.bankofengland.co.uk/financial-stability-in-focus/2025/april-2025)
- `am-u05-ecb-2024-cipollone-ai-central-bank` — **correct**. Cipollone’s dated keynote explicitly describes AI nowcasting and data classification by ECB staff. [Source](https://www.ecb.europa.eu/press/key/date/2024/html/ecb.sp240704_1~e348c05894.en.html)
- `am-u10-bis-2019-aer-ch3` — **correct**. BIS Box III.B describes the default-prediction comparison and preserves the authors’ caveat about bank models and business cycles. [Source](https://www.bis.org/publications/aer-2019/big-tech-finance-opportunities-risks)
- `am-u01-frb-2025-barr-scenarios` — **correct**. Barr’s conclusion frames GenAI herding as a possibility and footnote 1 confirms personal voice. [Source](https://www.federalreserve.gov/newsevents/speech/barr20250218a.htm)
- `am-event-hkma-2026-project-sage` — **correct**. The dated HKMA release announces the launch and confirms that it has established the expert group. [Source](https://www.hkma.gov.hk/eng/news-and-media/press-releases/2026/11/20261102-4/)
- `am-u12-fsb-2024-ai` — **correct**. The FSB conclusion says existing frameworks address many vulnerabilities and explicitly leaves open the need for additional work. [Source](https://www.fsb.org/uploads/P14112024.pdf)
- `am-u06-frb-2025-jefferson-ai` — **correct**. Jefferson explicitly links potential productivity gains to monetary policy and hedges the implication, with a personal-views disclaimer. [Source](https://www.federalreserve.gov/newsevents/speech/jefferson20251107a.htm)
- `am-u06-bis-2024-aer-ch3` — **correct**. The BIS report links AI-driven economic changes to price stability and central-bank concerns. [Source](https://www.bis.org/publications/aer-2024/artificial-intelligence-economy-implications-central-banks)
- `am-event-ecb-2026-innovation-platform-ai-payments` — **correct**. The ECB’s call schedules exploration workshops in future quarters, supporting announced work. [Source](https://www.ecb.europa.eu/press/intro/news/html/ecb.mipnews260928.en.html)
- `am-event-mas-2018-feat-principles` — **correct**. The 2020 archive capture of the 12 November 2018 MAS release confirms the opening release statement and guidance scope. [Source](https://web.archive.org/web/20200613230601/https://www.mas.gov.sg/news/media-releases/2018/mas-introduces-new-feat-principles-to-promote-responsible-use-of-ai-and-data-analytics)
- `am-u05-frb-2023-cook-genai-context` — **correct**. Cook’s conditional reservation about unexplained forecasts supports context, and the source gives her own views. [Source](https://www.federalreserve.gov/newsevents/speech/cook20230922a.htm)
- `am-u07-ecb-2025-de-ip-outcome-report` — **correct**. The ECB workshop report describes automatic payments as participants’ ideas, consistent with the explicit relay register and no earliest role. [Source](https://www.ecb.europa.eu/euro/digital_euro/timeline/profuse/shared/pdf/ecb.deprep250926_innovationplatform.en.pdf)
- `am-u04-ssm-2026-machado-ai-governance` — **correct**. Machado’s keynote connects intelligibility to control of bank models and speaks in his official capacity. [Source](https://www.bankingsupervision.europa.eu/press/speeches/date/2026/html/ssm.sp260224~6c5b64a77a.en.html)
- `am-u12-frb-2018-brainard-ai` — **material error**. The speech identifies potentially relevant existing rules as a starting point and explicitly leaves adequacy to assessment. This fits context rather than the J12 earliest articulation that existing rules broadly suffice without a separate framework. [Source](https://www.federalreserve.gov/newsevents/speech/brainard20181113a.htm)
- `am-u04-fsb-2017-ai-ml` — **correct**. The FSB conclusion links opacity to predictability and macro-level supervisory risk under stated conditions. [Source](https://www.fsb.org/uploads/P011117.pdf)
- `am-event-rb-2025-ai-policy` — **correct**. The Riksbank board decision and Swedish wording distinguish adoption on 26 May from entry into force on 1 June. [Source](https://www.riksbank.se/globalassets/media/dagordningar--protokoll/protokoll/direktionen/2025/250526/protokollsbilaga-d-beslut-ai-policy-for-sveriges-riksbank.pdf)
- `am-u02-ecb-2024-fsr-ai` — **correct**. The bylined staff feature describes supplier concentration as a conditional risk rather than an observed failure. [Source](https://www.ecb.europa.eu/press/financial-stability-publications/fsr/special/html/ecb.fsrart202405_02~58c3ce5246.en.html)
- `am-event-ecb-2024-ai-action-plan` — **correct**. Cipollone’s speech says the action plan was developed and states its aims, with no claim of implementation. [Source](https://www.ecb.europa.eu/press/key/date/2024/html/ecb.sp240704_1~e348c05894.en.html)
- `am-event-fsb-2024-ai-report-update` — **correct**. Knot’s dated speech describes an update in progress and the qualification preserves its speaker and disclaimer. [Source](https://www.fsb.org/2024/07/the-ai-adventure-how-artificial-intelligence-may-shape-the-economy-and-the-financial-system/)
- `am-u10-bcbs-2018-sound-practices-fintech` — **correct**. The Basel Committee’s own standard-setting report directly links AI and machine learning to monitoring suspicious transactions. [Source](https://www.bis.org/publications/201802-practices-sound-practices-implications-fintech-developments-banks-and-bank-supervisors.pdf)
- `am-u10-buba-2021-ml-risk-models-consultation` — **correct**. The joint institutional consultation directly describes potential risk-measurement gains, with no measured effect asserted. [Source](https://www.bundesbank.de/resource/blob/793670/61532e24c3298d8b24d4d15a34f503a8/472B63F073F071307366337C94F8C870/2021-07-15-ml-konsultationspapier-data.pdf)
- `am-u05-frb-2024-bowman-ai` — **correct**. Bowman’s own-view speech suggests an AI reliability check for policy data and retains the possibility language. [Source](https://www.federalreserve.gov/newsevents/speech/bowman20241122a.htm)
- `am-u05-ifc-2017-bulletin-44-overview` — **correct**. Tissot’s staff overview attributes the nowcasting result to Aruba presenters and carries the author-only disclaimer. [Source](https://www.bis.org/publications/ifc-bulletin-44-big-data.pdf)
- `am-event-pbc-2022-ai-algorithm-evaluation-standard` — **correct**. The Chinese reply attests issuance and evaluation dimensions. The reply’s date remains separate from the standard’s issue date. [Source](https://www.pbc.gov.cn/zhengwugongkai/4081330/4081344/4081419/4081727/2025080819055985616/index.html)
- `am-u06-nb-2026-bech-moen-speech` — **correct**. The original Norwegian and attributed English notes agree on a conditional increase in the neutral rate, and the record separates event and translation dates. [Source](https://www.norges-bank.no/contentassets/93003c5a459f4961bad556a1c444a8e2/speech_valutaseminaret2026.pdf?v=03022026122340)
- `am-u04-bcbs-2024-digitalisation` — **correct**. The Basel Committee report and footnote directly connect model opacity to assessing conceptual soundness. [Source](https://www.bis.org/publications/digitalisation-finance.pdf)
- `am-u02-fsb-2017-ai-ml` — **correct**. The FSB’s 2017 report links a few providers to systemic vulnerability and qualifies it as prospective. [Source](https://www.fsb.org/uploads/P011117.pdf)
- `am-u07-bis-wp-1310` — **correct**. The staff paper distinguishes simulation and recommendations from execution. Section 2 also describes agents executing predefined payment processes as a possibility. [Source](https://www.bis.org/publications/working-paper-1310-ai-agents-cash-management-payment-systems.pdf)
- `am-u12-buba-2022-wuermeling-brontobytes` — **correct**. Wuermeling’s speech explicitly rejects new ML-specific rules in its stated risk-model scope and gives his own view. [Source](https://www.bundesbank.de/en/press/speeches/machine-learning-in-risk-models-brontobytes-and-brontosauruses-891260)
- `am-event-eiopa-2025-ai-opinion` — **correct**. The EIOPA opinion describes the guidance it issues and the supervisory expectations it sets. [Source](https://www.eiopa.europa.eu/document/download/88342342-a17f-4f88-842f-bf62c93012d6_en)
- `am-u10-fsb-2017-ai-ml` — **correct**. FSB § 4.2 directly states the measurement benefit and distinguishes potential from testing in changing conditions. [Source](https://www.fsb.org/uploads/P011117.pdf)
- `am-event-pbc-2021-fintech-plan-2022-2025` — **correct**. The dated Chinese notice says the plan is now issued and calls for implementation, without claiming it occurred. [Source](https://www.pbc.gov.cn/zhengwugongkai/4081330/4406346/4693549/4470403/index.html)
- `am-u10-eba-2023-ml-irb` — **correct**. The EBA report’s executive summary supports potential predictive gains and the narrower IRB credit-risk setting. [Source](https://www.eba.europa.eu/sites/default/files/document_library/Publications/Reports/2023/1061483/Follow-up%20report%20on%20machine%20learning%20for%20IRB%20models.pdf)
- `am-u12-esrb-2025-asc-ai-contests` — **correct**. The committee report, with author disclaimer, explicitly entertains reforms beyond the current framework while preserving its countervailing qualification. [Source](https://www.esrb.europa.eu/pub/pdf/asc/esrb.ascreport202512_AIandsystemicrisk.en.pdf)
- `am-u01-rbi-2025-free-ai-report` — **correct**. The RBI-hosted HTML of the committee report confirms the wording in § 2.2.8 and its 13 August publication. The PDF endpoint returned a challenge page. [Source](https://www.rbi.org.in/scripts/FS_Publications.aspx?id=1306)

### Targeted

- `am-u01-boj-2017-kuroda-ai` — **correct**. Kuroda relays the original concern but adds his own conditional AI-intensification conclusion in the same paragraph. Selection reason — Earliest located overall depends on whether conditional remarks adopt or merely relay a concern. [Source](https://www.boj.or.jp/en/about/press/koen_2017/ko170413a.htm)
- `am-u06-boe-2015-haldane-labours-share` — **correct**. Haldane links AI to the Second Machine Age labour-substitution mechanism and then tests its implications for MPC projections, with scope and disclaimer preserved. Selection reason — Earliest located overall may rely on broad technology language that does not establish the AI-specific link. [Source](https://www.bankofengland.co.uk/-/media/boe/files/speech/2015/labours-share.pdf)
- `am-u05-boe-2015-one-bank-research-agenda` — **cannot check**. A fresh mirror of the Bank’s paper supports the Theme 4 paraphrase and the Bank confirms publication on 25 February. I could not inspect the cited 19 March capture to verify wording attestation for the earliest institutional role. Selection reason — Earliest institutional voice relies on an attested later capture and a paraphrase of a research agenda. [Source](https://cryptochainuni.com/wp-content/uploads/Bank-of-England-One-Bank-Research-Agenda-Discussion-Paper-Feb15.pdf)
- `am-u12-pbc-2019-fintech-plan-contests` — **material error**. The plan calls for studying and formulating rules and promoting a policy system. It does not take a position on whether existing frameworks broadly apply or whether a separate framework is required, so the passage supports context rather than earliest contesting. [Source](https://www.pbc.gov.cn/zhengwugongkai/4081330/4406346/4693549/4085169/2019090617242730910.pdf)
- `lc-cell-il-aisma-q06` — **minor slip**. Section 10(d) expressly requires an annual independent compliance audit of developer practices. July 6 dates approval rather than publication. Passage at Illinois General Assembly, SB 315 Actions table, indexed row — “7/06/2026 Senate Governor Approved”. Selection reason — Check whether an independent compliance audit actually meets the external assessment threshold. [Source](https://web.archive.org/web/20260908054441/https://www.ilga.gov/Documents/Legislation/PublicActs/104/PDF/104-0538.pdf)
- `lc-cell-cn-genai-measures-q07` — **minor slip**. Article 14 ties promptness to disposal measures and names only competent authorities. July 10 dates issuance rather than publication. Passage at Order No. 15, dated signature block — “2023年7月10日”. Selection reason — Translated reporting duty may concern illegal content and user conduct rather than defined incidents, and timing may attach to a different verb. [Source](https://www.gov.cn/zhengce/zhengceku/202307/content_6891752.htm)
- `lc-cell-cn-genai-measures-q03` — **material error**. Q03 expressly allows partly where risk-management measures are required without a written framework. Article 4(2) mandates anti-discrimination measures in model development, and Article 14 requires corrective measures including model optimisation training. [Source](https://www.gov.cn/zhengce/zhengceku/202307/content_6891752.htm)
- `lc-cell-cn-labelling-measures-q07` — **minor slip**. Articles 9 and 12 require logs and information sharing without incident notification. March 7 dates the notice rather than publication. Passage at Issuing notice 国信办通字〔2025〕2号, date line — “2025年3月7日”. Selection reason — An absence cell can overlook duties to notify authorities in cross-referenced enforcement or incident provisions. [Source](https://www.gov.cn/zhengce/zhengceku/202503/content_7014286.htm)
- `am-event-fsb-2017-ai-ml-monitoring` — **correct**. Annex G directly says that monitoring is ongoing and reports initial findings, supporting under-way status at publication. Selection reason — Under-way status could turn a forward-looking monitoring agenda into an activity already in progress. [Source](https://www.fsb.org/uploads/R270617.pdf)
- `am-event-ecb-2026-ai-research-lab` — **material error**. The speaker says the lab is being established, which describes establishment in progress. The announced stage misses that status. The wording leaves the start of operations open and the disclaimer keeps the voice with Lane. [Source](https://www.ecb.europa.eu/press/key/date/2026/html/ecb.sp260323_1~1e06784a89.en.html)
