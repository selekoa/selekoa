| Stratum           | Eligible | Drawn | Checked | Correct | Minor | Material error | Unverifiable |
| ----------------- | -------: | ----: | ------: | ------: | ----: | -------------: | -----------: |
| prominent-pages   |     3718 |    40 |      40 |      35 |     5 |              0 |            0 |
| recent-admissions |      873 |    40 |      40 |      33 |     6 |              1 |            0 |
| remainder         |      947 |    40 |      40 |      35 |     2 |              3 |            0 |

# Blind cross-family audit sample — 2026-11-02

120 of 120 claims checked. This is a bounded sample and does not certify unsampled records. Unverifiable records are not presumed correct.

Auditor: OpenAI Codex, GPT-6 family; exact serving model identifier unavailable. Baseline: `cae26ec62ce34ef3769eedba013aafee05799454`.

## Draw recorded before source checking

Seed: `selekoa-cross-family-audit-sample-2026-11-02-v1`. For each disjoint stratum, rank claim IDs by SHA-256 UTF-8(seed + newline + stratum + newline + claimId), ascending hexadecimal digest, with claim ID as a tie-breaker. Take the lowest 40 without replacement. Audit in displayed order. No redraws for retrieval failures.

Exclude underRecheck, then prominent-pages, then recent-admissions, then remainder. Overlaps go to the earlier stratum.

Prominent pages: institutionalDossier(...).claims for all 20 landingDossiers; comparisonView(...).claimIds for all selectable framework editions; controlStructure(...).claimIds for both timelines; chronicle placements or stated dates in 2023–2026, including grouped provision records and scheduled dates. Most-read is the task-defined page set; no analytics or traffic ranking was consulted. Dossier IDs and exact eligible pools are in the JSON.

Recent admissions: IDs newly added at the listed admission merges on or after 2026-10-28 (inclusive), including the comparison extension, Chinese collection 2 and Meta follow-ups; subtract prominent-page IDs. Existing claims merely corrected at a merge are not new admissions. Exact admission commits and added IDs are in the JSON.

underRecheck is stored on proposition entities, not claims. Conservatively exclude every claim whose subject or entity object is a proposition with any underRecheck entry, plus any directly flagged claim. The JSON preserves all excluded IDs.

At 40 completed checks per stratum, report Wilson 95% intervals for each verdict count (z=1.959963984540054), binomial approximation without finite-population correction. No pooled population estimate; unverifiable is a separate retrieval outcome, never presumed correct.

Open every linked evidence source. Try the cited expression, live canonical address where relevant, and the stored archive if live access fails. Record actual access and version limits. Inspect locators and surrounding passages; a string match alone is insufficient. Quotations are compared verbatim allowing layout whitespace only. Each claim covers statement, quotation, date kind/precision, announcement or commitment, earliest located role where present, and entity identity.

Mutable live copies are checked as currently served. A matching current passage does not authenticate earlier bytes; historical source-check dates are not treated as event dates. The audit checks date basis and precision, and records any expression-specific retrieval limit.

The earlier audit was opened only after the independent 120-claim checkpoint recorded below.

## Simple 95% intervals

Wilson intervals for the verdict counts in each completed 40-claim stratum. They are not a certificate of population accuracy.

| Stratum           | Correct       | Minor        | Material error | Unverifiable |
| ----------------- | ------------- | ------------ | -------------- | ------------ |
| prominent-pages   | 73.89%–94.54% | 5.46%–26.11% | 0.00%–8.76%    | 0.00%–8.76%  |
| recent-admissions | 68.05%–91.25% | 7.06%–29.07% | 0.44%–12.88%   | 0.00%–8.76%  |
| remainder         | 73.89%–94.54% | 1.38%–16.50% | 2.58%–19.86%   | 0.00%–8.76%  |

## Fixed draw and verdicts

| Number | Stratum           | Claim ID                                                                                            | Verdict        |
| -----: | ----------------- | --------------------------------------------------------------------------------------------------- | -------------- |
|      1 | prominent-pages   | kp-cites-sail-frontier-ai-risk-management-framework-v1-0-mmlu-pro-more-robust-challenging-2024      | correct        |
|      2 | prominent-pages   | lg-mx-lecun-ami-chair-2025                                                                          | minor          |
|      3 | prominent-pages   | cpo-orb-landspace-zq2e-y4-launch-stated                                                             | correct        |
|      4 | prominent-pages   | ap-eliezer-yudkowsky-lw-2025-re-recent-anthropic-safety-research                                    | correct        |
|      5 | prominent-pages   | prov-wh-2023-09-scope                                                                               | correct        |
|      6 | prominent-pages   | aib-ppl-hie-arc-innovation-investigator                                                             | correct        |
|      7 | prominent-pages   | c3-governance-cac-genai-list-2024-04-entry-stepfun                                                  | correct        |
|      8 | prominent-pages   | cmp-rsp-v2-1-d7-internal                                                                            | correct        |
|      9 | prominent-pages   | kp-cites-human-preferences-paper-superintelligence-paths-dangers-strategies-2014                    | correct        |
|     10 | prominent-pages   | ec-e05-korinek-suh-2024-scenarios-transition-agi-b                                                  | correct        |
|     11 | prominent-pages   | aib-labs-gv-iso-round-2025                                                                          | correct        |
|     12 | prominent-pages   | ab-arg-d1-sandbrink-articulates                                                                     | correct        |
|     13 | prominent-pages   | absent-fsf-v2-0-autonomy-ccl                                                                        | correct        |
|     14 | prominent-pages   | ap-eliezer-yudkowsky-lw-2026-the-talker-does-not-control-the                                        | correct        |
|     15 | prominent-pages   | cpo-ch-nvidia-openai-investment-intent                                                              | correct        |
|     16 | prominent-pages   | lg-goo-kavukcuoglu-scientific-board-2023                                                            | correct        |
|     17 | prominent-pages   | eval-i-anthropic-claude-card                                                                        | correct        |
|     18 | prominent-pages   | ab-ev-chatgpt-agent-high-capability                                                                 | correct        |
|     19 | prominent-pages   | kp-cites-llama-paper-natural-questions-benchmark-question-answering-2019                            | minor          |
|     20 | prominent-pages   | dario-openai-vp-2020                                                                                | correct        |
|     21 | prominent-pages   | c3-tencent-hunyuan-turbos-report                                                                    | correct        |
|     22 | prominent-pages   | lg-cn-tang-jie-zhipu-cofounder                                                                      | minor          |
|     23 | prominent-pages   | stargate-spending-plan-2025                                                                         | correct        |
|     24 | prominent-pages   | cn-tang-chatglm                                                                                     | correct        |
|     25 | prominent-pages   | pp-au-gautier-izacard-llama-paper                                                                   | correct        |
|     26 | prominent-pages   | cs-openai-foundation-removes-pbc-directors                                                          | correct        |
|     27 | prominent-pages   | lineage-ii-weak-cites-critique                                                                      | correct        |
|     28 | prominent-pages   | rd-r06-belrose-pope-2023-ai-easy-to-control                                                         | minor          |
|     29 | prominent-pages   | c2-bytedance-seed-20-model-card                                                                     | minor          |
|     30 | prominent-pages   | atlas-gdm-safety-response                                                                           | correct        |
|     31 | prominent-pages   | kp-shaping-chinchilla-kaplan                                                                        | correct        |
|     32 | prominent-pages   | ab-ev-gemini3-card-published                                                                        | correct        |
|     33 | prominent-pages   | prov-rsp-v2-2-may-proceed-with-safeguards                                                           | correct        |
|     34 | prominent-pages   | cmp-ms-fgf-2025-d6-discretion                                                                       | correct        |
|     35 | prominent-pages   | ab-arg-d1-brent-articulates                                                                         | correct        |
|     36 | prominent-pages   | c2-governance-sail-frmf-v1-published                                                                | correct        |
|     37 | prominent-pages   | fl-link-ms-fgf-2026-ny-raise                                                                        | correct        |
|     38 | prominent-pages   | th-fam-tllm-attention-2017-def                                                                      | correct        |
|     39 | prominent-pages   | kp-cites-gpt4-system-card-2023-ethical-social-risks-harm-from-2021                                  | correct        |
|     40 | prominent-pages   | c3-stepfun-legal-form-site                                                                          | correct        |
|     41 | recent-admissions | rd-reply-dafoe-russell-2016-yes-we-are-worried-to-etzioni-2016-experts-dont-think                   | correct        |
|     42 | recent-admissions | ht-w03-degaris-1989-what-if-ai-succeeds                                                             | correct        |
|     43 | recent-admissions | th-prob-pearl-1982-def                                                                              | correct        |
|     44 | recent-admissions | kp-states-ppo-paper-1                                                                               | correct        |
|     45 | recent-admissions | rd-r06-russell-2014-edge-myths-and-moonshine                                                        | correct        |
|     46 | recent-admissions | kp-authored-ross-girshick-rich-feature-hierarchies-accurate-object-2013                             | correct        |
|     47 | recent-admissions | ht-w04-degaris-1990-moral-dilemmas                                                                  | correct        |
|     48 | recent-admissions | rd-r16-yudkowsky-2017-alphago-zero-foom                                                             | correct        |
|     49 | recent-admissions | th-evo-koza-credits-holland                                                                         | correct        |
|     50 | recent-admissions | kp-authored-hongyu-ren-opportunities-risks-foundation-models-2021                                   | correct        |
|     51 | recent-admissions | kp-states-debate-paper-1                                                                            | correct        |
|     52 | recent-admissions | kp-cites-agrawal-gans-goldfarb-2019-ambiguous-labor-market-impact-robots-jobs-evidence-from-us-2019 | correct        |
|     53 | recent-admissions | aib-labs-nv-bionemo-announced-2022                                                                  | correct        |
|     54 | recent-admissions | kp-cites-summarize-feedback-paper-improving-language-understanding-by-generative-2018               | correct        |
|     55 | recent-admissions | aib-mod-af-casp13-contribution                                                                      | correct        |
|     56 | recent-admissions | kp-authored-quoc-le-gpipe-efficient-training-giant-neural-2018                                      | correct        |
|     57 | recent-admissions | kp-shaping-benzell-aghion                                                                           | correct        |
|     58 | recent-admissions | th-lp-credit-kowalski-1988-colmerauer                                                               | correct        |
|     59 | recent-admissions | aib-labs-iso-founding-stated                                                                        | minor          |
|     60 | recent-admissions | kp-authored-tom-henighan-scaling-laws                                                               | correct        |
|     61 | recent-admissions | rd-r02-russell-2014-edge-myths-and-moonshine                                                        | correct        |
|     62 | recent-admissions | aib-co-flagship-formed-generate-2018                                                                | correct        |
|     63 | recent-admissions | th-evo-burgin-1973                                                                                  | correct        |
|     64 | recent-admissions | th-lp-def-kowalski-1988                                                                             | correct        |
|     65 | recent-admissions | aib-co-genentech-prescient-lab-in-the-loop-2021                                                     | correct        |
|     66 | recent-admissions | kp-authored-quoc-le-natural-questions-benchmark-question-answering-2019                             | minor          |
|     67 | recent-admissions | aib-arg-p4-huang-2016                                                                               | correct        |
|     68 | recent-admissions | kp-authored-adam-roberts-palm-scaling-language-modeling-pathways-2022                               | correct        |
|     69 | recent-admissions | ht-w04-degaris-2008-artilect-war-agi                                                                | correct        |
|     70 | recent-admissions | aib-mod-esm1b-contribution                                                                          | correct        |
|     71 | recent-admissions | th-sp-name-strips-1971                                                                              | correct        |
|     72 | recent-admissions | aib-labs-dm-2018-casp13-ranking                                                                     | minor          |
|     73 | recent-admissions | th-ns-garcez-lamb-term                                                                              | minor          |
|     74 | recent-admissions | kp-authored-kaiming-he-deep-residual-learning-image-recognition-2015                                | correct        |
|     75 | recent-admissions | rd-a4-grace-2022-counterarguments                                                                   | correct        |
|     76 | recent-admissions | kp-states-frey-osborne-2013-future-of-employment-1                                                  | correct        |
|     77 | recent-admissions | kp-authored-amanda-askell-training-helpful-harmless-assistant-reinforcement-2022                    | correct        |
|     78 | recent-admissions | rd-r10a-brooks-2014-tool-not-threat                                                                 | minor          |
|     79 | recent-admissions | kp-states-lamda-language-models-dialog-applications-2022-2                                          | minor          |
|     80 | recent-admissions | rd-r06-pinker-2018-popsci-fear-robots                                                               | material error |
|     81 | remainder         | lineage-iem-credits-good                                                                            | correct        |
|     82 | remainder         | ts-a4-agi-ruin-context                                                                              | correct        |
|     83 | remainder         | ap-k-eric-drexler-drexler-1986-engines-of-creation                                                  | correct        |
|     84 | remainder         | ts-a6-sandberg-1998-contests                                                                        | correct        |
|     85 | remainder         | ap-ajay-agrawal-agrawal-gans-goldfarb-2016-simple-economics-of-machine-intelligence                 | correct        |
|     86 | remainder         | yk-y01-sl4-2002-05-03-yudkowsky-0205-3551-c                                                         | material error |
|     87 | remainder         | ap-eliezer-yudkowsky-lw-2008-above-average-ai-scientists                                            | correct        |
|     88 | remainder         | ap-eliezer-yudkowsky-extropians-1998-12-06-yudkowsky-2153                                           | correct        |
|     89 | remainder         | yk-y30-staring-into-the-singularity-b                                                               | correct        |
|     90 | remainder         | ap-eliezer-yudkowsky-sl4-2004-12-29-yudkowsky-0412-10488                                            | correct        |
|     91 | remainder         | ap-eliezer-yudkowsky-sl4-2000-09-17-yudkowsky-0009-0092                                             | correct        |
|     92 | remainder         | ap-eliezer-yudkowsky-lw-2008-fighting-a-rearguard-action-against-the                                | correct        |
|     93 | remainder         | ap-evan-hubinger-rlo-2019-deceptive-alignment                                                       | correct        |
|     94 | remainder         | ap-joar-skalse-rlo-2019-introduction                                                                | correct        |
|     95 | remainder         | ap-erik-brynjolfsson-bresnahan-brynjolfsson-hitt-1999-it-workplace-organization                     | correct        |
|     96 | remainder         | ec-m06a-furman-seamans-2018-ai-and-the-economy-a                                                    | correct        |
|     97 | remainder         | ts-a2-catai                                                                                         | correct        |
|     98 | remainder         | ap-eliezer-yudkowsky-extropians-1999-08-25-yudkowsky-2783                                           | correct        |
|     99 | remainder         | ap-eliezer-yudkowsky-extropians-1999-02-24-yudkowsky-2293                                           | correct        |
|    100 | remainder         | ap-joshua-s-gans-agrawal-gans-goldfarb-2019-economics-of-ai-introduction                            | correct        |
|    101 | remainder         | ts-b5-bostrom-1996-09-03-context                                                                    | correct        |
|    102 | remainder         | ap-eliezer-yudkowsky-sl4-2000-10-03-yudkowsky-0010-0125                                             | correct        |
|    103 | remainder         | ap-ajeya-cotra-cotra-2021-why-ai-alignment-could-be-hard                                            | correct        |
|    104 | remainder         | yk-y11-agi-ruin-2022-c                                                                              | correct        |
|    105 | remainder         | yk-y10-extropians-1998-09-18-yudkowsky-2487-c                                                       | correct        |
|    106 | remainder         | lg-new-ito-sakana-cofounder                                                                         | correct        |
|    107 | remainder         | ts-a2-hanson-2008-core-argument-contests                                                            | correct        |
|    108 | remainder         | ng-brain-lead-2011-2012                                                                             | correct        |
|    109 | remainder         | ec-m09-nilsson-1984-ai-employment-and-income-b                                                      | correct        |
|    110 | remainder         | yk-y03-lw-2008-ghosts-in-the-machine-b                                                              | correct        |
|    111 | remainder         | ap-edwin-mansfield-mansfield-1966-technological-change                                              | correct        |
|    112 | remainder         | ts-a1-shulman-2009                                                                                  | minor          |
|    113 | remainder         | ap-eliezer-yudkowsky-lw-2021-ngo-and-yudkowsky-on-alignment-difficulty                              | correct        |
|    114 | remainder         | ts-a5-cotra-2022                                                                                    | correct        |
|    115 | remainder         | ap-alan-b-krueger-krueger-1991-computers-wage-structure                                             | correct        |
|    116 | remainder         | ts-b3-drexler-1986-context                                                                          | correct        |
|    117 | remainder         | yk-y08-extropians-1999-01-06-yudkowsky-0160-c                                                       | material error |
|    118 | remainder         | ap-avi-goldfarb-agrawal-gans-goldfarb-2019-economics-of-ai-introduction                             | correct        |
|    119 | remainder         | yk-y11-sl4-2000-10-03-yudkowsky-0010-0125-c                                                         | material error |
|    120 | remainder         | ts-a6-grace-2014-treacherous-turn                                                                   | minor          |

## Checks

### 1. kp-cites-sail-frontier-ai-risk-management-framework-v1-0-mmlu-pro-more-robust-challenging-2024 — correct

The framework's footnote 87 identifies the cited paper by title and arXiv 2406.01574; PDF page 47 is correct.

- [evidence-kp-cites-sail-frontier-ai-risk-management-framework-v1-0-mmlu-pro-more-robust-challenging-2024-1](https://concordia-ai.com/wp-content/uploads/2025/07/Frontier-AI-Risk-Management-Framework-v1.0-en.pdf): PDF p. 47, footnote 87. Paraphrase matches the reference. Direct curl retrieval produced the recorded source hash ce6121e723aa4334473f75abd47d831359a52621c8c453358b67df2a36f925c2; the web reader rejected its size and a Node fetch timed out.

Date: July 2025 is printed in the framework's citation line (PDF p. 4); month-only publication is appropriate. Announcement/commitment: Citation only; no agreement or adoption inferred. Earliest located: not applicable. Entity: Footnote title and identifier identify the intended benchmark.

### 2. lg-mx-lecun-ami-chair-2025 — minor

The role, attribution and Thursday-to-calendar-date conversion are supported. The quoted sentence is in the third article-body paragraph, not the second.

- [lg-ev-mx-lecun-ami-chair-2025](https://techcrunch.com/2025/12/19/yann-lecun-confirms-his-new-world-model-startup-reportedly-seeks-5b-valuation/): Article body, paragraph 3. Quotation matches verbatim; paragraph numbering is off by one.

Date: Article dated 2025-12-19; its Thursday refers to 2025-12-18. A snapshot avoids an unsupported interval. Announcement/commitment: Reporting of the post is explicitly distinguished from independent access to it. Earliest located: not applicable. Entity: The quoted post identifies AMI Labs and the executive-chair role.

Locator points to paragraph 2, whereas the quoted sentence appears in paragraph 3 of the article body. Source passage: “Yes, AMI Labs is my new startup. I’m the Executive Chairman.”. Proposed correction: Change locator to 'Article body, paragraph 3, quotation beginning Yes, AMI Labs'.

### 3. cpo-orb-landspace-zq2e-y4-launch-stated — correct

The launch provider reports ten satellites, the stated time and place, and the eight ADA Space satellites with the stated verification purposes.

- [evidence-cpo-orb-landspace-zq2e-y4-launch-stated-1](https://www.landspace.com/news-detail.html?itemid=78): Release paragraph 1. Time quotation matches verbatim.
- [evidence-cpo-orb-landspace-zq2e-y4-launch-stated-2](https://www.landspace.com/news-detail.html?itemid=78): Release paragraph 3. Purpose quotation matches verbatim.
- [evidence-cpo-orb-landspace-zq2e-y4-launch-stated-3](https://www.landspace.com/news-detail.html?itemid=78): Release paragraphs 1 and 3. The launch and satellite-number paraphrase matches; it does not add a constellation affiliation.

Date: Release dated 2026-10-14 and opening passage gives the same date and 19:40 Beijing time. Announcement basis is explicit. Announcement/commitment: The claim attributes the launch account to its provider and does not infer operational computing performance. Earliest located: not applicable. Entity: 卫星 names and numbers match the ADA Space satellite record.

### 4. ap-eliezer-yudkowsky-lw-2025-re-recent-anthropic-safety-research — correct

The live post byline credits the recorded author; title and date identify the same expression.

- [evidence-ap-eliezer-yudkowsky-lw-2025-re-recent-anthropic-safety-research](https://www.lesswrong.com/posts/oDX5vcDTEei8WuoBx/re-recent-anthropic-safety-research): Post heading and byline. The credited name matches the quote. Checked the rendered publisher byline, rather than separately querying GraphQL.

Date: Visible posting date is 2025-08-06; publication basis is appropriate. Announcement/commitment: Authorship credit only. Earliest located: not applicable. Entity: Byline and document title match the linked records.

### 5. prov-wh-2023-09-scope — correct

The scope paragraph limits model-specific commitments to a company's own more-powerful generative models.

- [evidence-prov-wh-2023-09-scope-1](https://bidenwhitehouse.archives.gov/wp-content/uploads/2023/09/Voluntary-AI-Commitments-September-2023.pdf): PDF p. 1, Scope paragraph. Quotation matches verbatim across layout line breaks. Companion fact sheet links the September PDF.

Date: PDF is linked by the White House fact sheet dated 2023-09-12; publication day is supported by that companion page. Announcement/commitment: A commitment's scope, with no implementation or compliance inference. Earliest located: not applicable. Entity: September commitments text, distinct from the July text.

### 6. aib-ppl-hie-arc-innovation-investigator — correct

The Team section gives the role in the exact quoted sentence.

- [evidence-aib-ppl-hie-arc-innovation-investigator-1](https://arcinstitute.org/labs/hielab): Team section, biography below the Innovation Investigator heading. Quotation matches verbatim. No historical capture is stored; current wording supports the role description with that temporal limit.

Date: An undated page warrants a retrieval-date snapshot, not an appointment date. Current retrieval reproduces the wording; it cannot independently authenticate 2026-10-30 bytes. Announcement/commitment: No continuing role is inferred. Earliest located: not applicable. Entity: The lab page names the person and Arc Institute explicitly.

### 7. c3-governance-cac-genai-list-2024-04-entry-stepfun — correct

Row 35 supplies the model, filing entity, number and filing date as stated. The pinned StepFun bundle carries the same filing number beside its different copyright-holder name.

- [c3-ev-governance-cac-genai-list-2024-04-entry-stepfun-1](https://www.cac.gov.cn/cms/pub/interact/downloadfile.jsp?filepath=NUtqEIwGiCjGm2Bhl20cvHaciuAb2ebr7U8X1xV5925vz0vHSSJ6sATU6DtmcGo1wYjaLSPNhSkF5EQhi7RHdlAfqphfFn00jUfFRLdBE5I=&fText=%E7%94%9F%E6%88%90%E5%BC%8F%E4%BA%BA%E5%B7%A5%E6%99%BA%E8%83%BD%E6%9C%8D%E5%8A%A1%E5%B7%B2%E5%A4%87%E6%A1%88%E4%BF%A1%E6%81%AF%EF%BC%882024%E5%B9%B44%E6%9C%88%EF%BC%89): Attachment PDF p. 2, row 35. The Chinese row quotation matches after layout whitespace normalisation. Direct retrieval: 5 pages; SHA-256 329eb680eeb7ef69002a06b5eebe423abb4ced27fa922414c1941e933f28965e. Supplement: StepFun's cited assets/index-4zBpLKmx.js contains the filing number and both footer names.

Date: April 2024 dates the list; 2023/11/24 is kept as the row's filing date. Announcement/commitment: Filing is not described as approval or safety compliance. Earliest located: The April 2024 attachment is the earliest dated generative-service list in the collection's source inventory; no global filing priority is asserted. Entity: Shared filing number supports the limited mapping; no corporate continuity is added.

### 8. cmp-rsp-v2-1-d7-internal — correct

Section 7.1 item 3 promises staff summaries with highly sensitive information redacted; the paraphrase preserves both scope and condition.

- [ev-cmp-rsp-v2-1-d7-internal-1](https://www-cdn.anthropic.com/17310f6d70ae5627f55313ed067afc1a762a4068.pdf): PDF p. 16 / printed p. 12, §7.1 item 3. Paraphrase accurately represents the opening transparency sentence.

Date: Cover states Effective March 31, 2025; the effective-date basis is correct. Announcement/commitment: The cell records what the policy promises, not staff receipt of reports. Earliest located: not applicable. Entity: Content-addressed PDF identifies RSP version 2.1.

### 9. kp-cites-human-preferences-paper-superintelligence-paths-dangers-strategies-2014 — correct

The reference list names the cited book and author; this is a citation edge only.

- [evidence-kp-cites-human-preferences-paper-superintelligence-paths-dangers-strategies-2014-1](https://arxiv.org/pdf/1706.03741v1): PDF p. 11, References, Bostrom 2014 entry. Reference-title paraphrase matches the listed book.

Date: arXiv v1 is the June 2017 expression; the claim uses its 2017-06-12 submission date. Announcement/commitment: No agreement, influence or implementation inferred. Earliest located: not applicable. Entity: Reference entry identifies the intended 2014 book.

### 10. ec-e05-korinek-suh-2024-scenarios-transition-agi-b — correct

Related Literature names the stated works and makes the quoted existential-risk connection. The claim is context, not an assertion that these views are correct.

- [evidence-ec-e05-23](https://www.nber.org/system/files/working_papers/w32255/w32255.pdf): PDF p. 7, Related Literature continuation. Quotation matches after undoing the layout hyphen in superintelligence.
- [evidence-ec-e05-24](https://www.nber.org/system/files/working_papers/w32255/w32255.pdf): PDF p. 6, Related Literature. Quoted segments match in order; the stated ellipsis replaces a dash, as the qualification explains. Direct PDF retrieval succeeded after web 403, SHA-256 346aebfaec6aa39b036860d9c19dcac6b502bb663ec78a7560b51990202e6edb.

Date: Cover states March 2024. Month precision is preserved; current PDF does not authenticate earlier bytes. Announcement/commitment: Literature-review attribution only. Earliest located: not applicable. Entity: Paper title, authors and cited works match the records.

### 11. aib-labs-gv-iso-round-2025 — correct

The opening release paragraph names GV as a participant in the stated round.

- [evidence-aib-labs-gv-iso-round-2025-1](https://storage.googleapis.com/isomorphiclabs-website-public-artifacts/ISOMORPHIC_LABS_FUNDING_31-03-25.pdf): PDF p. 1, opening paragraph. Quotation matches verbatim across layout line breaks.

Date: Release dateline is 31 March 2025; announcement basis is appropriate. Announcement/commitment: The round total is not assigned to GV and no payment is inferred. Earliest located: not applicable. Entity: GV is named distinctly from Thrive Capital and Alphabet.

### 12. ab-arg-d1-sandbrink-articulates — correct

Version 1's abstract states the attributed information-provision claim at the recorded level of generality.

- [evidence-ab-arg-d1-sandbrink-articulates-1](https://arxiv.org/pdf/2306.13952v1): PDF p. 1, Abstract. Abstract quotation matches verbatim across line breaks.
- [evidence-ab-arg-d1-sandbrink-articulates-2](https://arxiv.org/abs/2306.13952v1): arXiv submission history, v1 and v8. Both quoted history entries match; omitted times and intervening versions are marked by an ellipsis.

Date: arXiv history gives v1 on 2023-06-24 and v8 on 2023-12-23; the version restriction is correct. Announcement/commitment: An author's published argument, not an independently reproduced capability finding. Earliest located: not applicable. Entity: Author and v1 paper are correctly identified.

### 13. absent-fsf-v2-0-autonomy-ccl — correct

The inspected text distinguishes its removed standalone Autonomy domain from Cyber and ML R&D autonomy thresholds. The bounded absence concerns that standalone provision.

- [evidence-absent-fsf-v2-0-autonomy-ccl](https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/updating-the-frontier-safety-framework/Frontier%20Safety%20Framework%202.0.pdf): Whole 9-page served PDF and 8-page capture, especially Table 1 and footnote 9. Inspected both versions for the standalone Autonomy level 1 CCL. Footnote 9 explicitly says the Autonomy risk domain from v1.0 was removed. The other domain-specific autonomy entries do not contradict that scoped absence. Capture SHA-256 f82534b5f9c26a700340706d8ebac7b34bbb492354465d24226bf94eb7ddd16c.

Date: Cover date 2025-02-04 supports publication basis. Announcement/commitment: A scoped absence in a document, not a conclusion about practice. Earliest located: not applicable. Entity: Version 2.0 is identified in both copies.

### 14. ap-eliezer-yudkowsky-lw-2026-the-talker-does-not-control-the — correct

The publisher's visible byline credits the recorded author for the named post.

- [evidence-ap-eliezer-yudkowsky-lw-2026-the-talker-does-not-control-the](https://www.lesswrong.com/posts/cJX2ssssGoYqnijwi/the-talker-does-not-control-the-doer-in-current-ais): Post heading and byline. Name quotation matches. Checked visible publisher byline rather than separately querying GraphQL.

Date: Visible posting date 2026-09-13 matches the claim's publication date. Announcement/commitment: Authorship credit only. Earliest located: not applicable. Entity: Title and credited author identify the intended post.

### 15. cpo-ch-nvidia-openai-investment-intent — correct

The release states the upper bound and deployment-linked investment intention exactly as represented.

- [evidence-cpo-ch-nvidia-openai-investment-intent-1](https://nvidianews.nvidia.com/news/openai-and-nvidia-announce-strategic-partnership-to-deploy-10gw-of-nvidia-systems): Highlights, second bullet; opening release paragraph. Quotation is verbatim within the second bullet; surrounding text identifies a letter of intent.

Date: Release dated 2025-09-22; announcement basis is correct. Announcement/commitment: Letter of intent and intention are kept separate from investment payment. Earliest located: not applicable. Entity: The named companies are the parties to this announcement.

### 16. lg-goo-kavukcuoglu-scientific-board-2023 — correct

The message names a new Scientific Board led by Koray, whose full name appears immediately above.

- [lg-ev-goo-kavukcuoglu-scientific-board-2023](https://deepmind.google/blog/announcing-google-deepmind/): Hassabis message, paragraph beginning We’re also creating. Elided quote retains ordered verbatim segments; the ellipsis omits the board's purpose.

Date: Page is dated 2023-04-20; a snapshot of the announcement does not imply a continuing appointment. Announcement/commitment: The board is announced and its composition is still to be finalised. Earliest located: not applicable. Entity: Preceding paragraph resolves Koray to the recorded person.

### 17. eval-i-anthropic-claude-card — correct

Publisher-hosted PDF names Anthropic and contains the Claude 2 model-card section.

- [evidence-eval-i-anthropic-claude-card](https://www-cdn.anthropic.com/bd2a28d2535bfb0494cc8e2a3bf135d2e7523226/Model-Card-Claude-2.pdf): PDF p. 1, title, publisher and §2 heading. Paraphrase matches the report's own introduction and section heading.

Date: No separate publication date appears; unknown is appropriate and is not replaced by model release date. Announcement/commitment: Publication is kept separate from proof of the reported findings. Earliest located: not applicable. Entity: 14-page content-addressed report is the intended card.

### 18. ab-ev-chatgpt-agent-high-capability — correct

The introduction states the precautionary classification and its lack-of-definitive-evidence caveat. The assessment section supplies the lower-bound limitation.

- [evidence-ab-ev-chatgpt-agent-high-capability-1](https://cdn.openai.com/pdf/839e66fc-602c-48bf-81d3-b21eacc3459d/chatgpt_agent_system_card.pdf): PDF p. 5 / printed p. 4, introduction final paragraph. Classification quotation matches verbatim.
- [evidence-ab-ev-chatgpt-agent-high-capability-2](https://cdn.openai.com/pdf/839e66fc-602c-48bf-81d3-b21eacc3459d/chatgpt_agent_system_card.pdf): Same paragraph. Precaution quotation matches, including the source's spaced hyphens.
- [evidence-ab-ev-chatgpt-agent-high-capability-3](https://cdn.openai.com/pdf/839e66fc-602c-48bf-81d3-b21eacc3459d/chatgpt_agent_system_card.pdf): PDF p. 16 / printed p. 15, §5.1. Lower-bound quotation matches verbatim.

Date: Cover dated July 17, 2025 supports the publication date. Announcement/commitment: Developer classification and reported safeguards are not promoted into independent threshold or effectiveness findings. Earliest located: not applicable. Entity: The dated ChatGPT Agent card is the intended document.

### 19. kp-cites-llama-paper-natural-questions-benchmark-question-answering-2019 — minor

The reference is present, but the stored locator does not identify a section or entry.

- [evidence-kp-cites-llama-paper-natural-questions-benchmark-question-answering-2019-1](https://arxiv.org/html/2302.13971v1): References, Kwiatkowski et al. (2019); also §3.2. Paraphrase is supported by the reference entry.

Date: HTML header identifies arXiv v1, 27 Feb 2023; publication day matches. Announcement/commitment: Citation only; no agreement or version attribution inferred. Earliest located: not applicable. Entity: The Kwiatkowski et al. 2019 entry identifies the intended work.

The locator 'reference or mention by title' is too vague to be a passage-level locator. Source passage: “Natural questions: a benchmark for question answering research.”. Proposed correction: Set locator to 'References, Kwiatkowski et al. (2019), Natural questions entry; also §3.2 Closed-book Question Answering'.

### 20. dario-openai-vp-2020 — correct

The departure paragraph explicitly supplies the research VP title.

- [evidence-dario-openai-vp-2020](https://openai.com/index/organizational-update/): Body, paragraph beginning Today we’re announcing. Paraphrase matches the title given in the departure paragraph.

Date: Page is dated 2020-12-29; the snapshot avoids inventing the final working day. Announcement/commitment: A departure announcement is not converted into an employment interval. Earliest located: not applicable. Entity: The announcement names the intended person and organisation.

### 21. c3-tencent-hunyuan-turbos-report — correct

The report's title-page credit and abstract support the publisher, hybrid architecture and two parameter counts.

- [c3-ev-tencent-hunyuan-turbos-report](https://arxiv.org/pdf/2505.15431v1): PDF p. 1, byline. Team-name quotation matches verbatim.
- [c3-ev-tencent-hunyuan-turbos-report-2](https://arxiv.org/pdf/2505.15431v1): PDF p. 1, abstract. Activated and total parameter quotation matches verbatim.

Date: The arXiv stamp says 21 May 2025; the separate 2025-05-23 title-page date is explicitly retained as a qualification. Announcement/commitment: Posting a report does not establish a model release. Earliest located: not applicable. Entity: Team credit identifies the intended organisation and report.

### 22. lg-cn-tang-jie-zhipu-cofounder — minor

The co-founder designation is supported. The added KEG/GLM contextual account was not located in the cited business passages in either inspected copy.

- [lg-ev-cn-tang-jie-zhipu-cofounder](https://www1.hkexnews.hk/listedco/listconews/sehk/2025/1230/2025123000018_c.pdf): PDF p. 35 / printed p. 27, Definitions, 唐博士. Chinese co-founder quotation matches after layout whitespace normalisation.
- [lg-ev-cn-tang-jie-zhipu-cofounder-glm](https://www1.hkexnews.hk/listedco/listconews/sehk/2025/1230/2025123000018_c.pdf): Business discussion of KEG, PDF pp. 160, 163 and 189. The live business text describes KEG collaboration and names a different lab leader; the stored archive also supports the designation but did not yield the added cognitive-intelligence/GLM account. Archive retrieved directly: 504 pages, SHA-256 3f187aa4c0c4d09a16ad74791808719a40479e470aeaab0aa76ed13c83e5f046.

Date: The filing is dated 2025-12-30; an unknown personal role date avoids converting the retrospective designation into an interval. Announcement/commitment: Company filing attribution is preserved. Earliest located: not applicable. Entity: The Definitions entry identifies the recorded co-founder; the additional technical-history note is unnecessary to this designation.

The qualification and second evidence paraphrase add a KEG/GLM attribution not located in the cited expression. This does not change the supported co-founder fact. Source passage: “唐傑博士，我們的聯合創始人以及我們的控股股東之一”. Proposed correction: Retain the co-founder statement and Definitions quotation. Remove the KEG/GLM sentences from the qualification and withdraw or replace the second evidence paraphrase unless an exact supporting edition and passage can be supplied.

### 23. stargate-spending-plan-2025 — correct

The opening announcement states the planned amount, US infrastructure scope and four-year period.

- [evidence-stargate-spending-plan-2025](https://openai.com/index/announcing-the-stargate-project/): Opening paragraph. The paraphrase preserves the intended investment and four-year scope.

Date: Announcement dated 2025-01-21 matches. Announcement/commitment: A spending intention is not presented as secured finance or realised expenditure. Earliest located: not applicable. Entity: Stargate is the announced infrastructure venture, not a direct investment in OpenAI.

### 24. cn-tang-chatglm — correct

Footnote 1 includes the credited author in Team GLM's list.

- [evidence-cn-tang-chatglm](https://arxiv.org/html/2406.12793v1): Footnote 1, Team GLM author list. The name is present as stated; adjacent footnote explains alphabetic ordering.

Date: Version header gives 18 Jun 2024; publication date matches. Announcement/commitment: Credit does not imply employment. Earliest located: not applicable. Entity: Printed name and document agree with the intended records.

### 25. pp-au-gautier-izacard-llama-paper — correct

The byline lists the credited person among 14 authors.

- [pp-ev-au-gautier-izacard-llama-paper-1](https://arxiv.org/html/2302.13971v1): HTML byline. Name quotation matches verbatim; counted 14 credited authors.

Date: Header gives arXiv v1, 27 Feb 2023. Announcement/commitment: Co-authorship is not extended into an institutional role. Earliest located: not applicable. Entity: Printed credited name matches the person record.

### 26. cs-openai-foundation-removes-pbc-directors — correct

Section V.3 gives the removal right and the qualification preserves the separate two-thirds route. OpenAI's structure page supplies holder identity.

- [evidence-cs-openai-foundation-removes-pbc-directors-1](https://web.archive.org/web/20251029204930/https://s3.documentcloud.org/documents/26205026/openai-pbc-articles-of-incorporation.pdf): Archived charter PDF p. 24, §V.3. Live charter failed with HTTP 403 in both readers. Direct stored capture succeeded: 30 pages, SHA-256 1f6e06b80e1be6b9c4538a4b12a77198591dc824a7bd39eff714ce5986fefc5f; removal provision supports the paraphrase.
- [evidence-cs-openai-foundation-removes-pbc-directors-2](https://openai.com/our-structure/): Our Board section, paragraph on special voting rights. Live structure page explicitly says the Foundation may replace directors at any time.

Date: The stated filing date is 2025-10-28, consistent with the dated restructuring account; snapshot does not establish exercise of the right. Announcement/commitment: Textual rights and OpenAI's holder identification are distinguished from use of those rights. Earliest located: not applicable. Entity: Foundation and PBC identities remain distinct.

### 27. lineage-ii-weak-cites-critique — correct

The scalable-oversight paragraph cites Saunders et al. and the bibliography identifies the intended paper.

- [evidence-lineage-ii-weak-cites-critique](https://arxiv.org/pdf/2312.09390v1): PDF p. 5, §2 Scalable oversight; p. 25, Saunders et al. reference. The paragraph's citation and the reference entry support the paraphrase.

Date: The record uses the 2023-12-14 v1 submission date. Announcement/commitment: The comparison is not converted into a method-use or adoption edge. Earliest located: not applicable. Entity: Bibliographic title and authors identify the cited work.

### 28. rd-r06-belrose-pope-2023-ai-easy-to-control — minor

The attributed contesting argument is supported. One quotation uses straight quotation marks where the source has curly marks.

- [evidence-rd-r06-belrose-pope-2023-ai-easy-to-control-1](https://optimists.ai/2023/11/28/ai-is-easy-to-control/): Introduction, paragraph beginning But even if. Words match, but quotation marks around alignment differ.
- [evidence-rd-r06-belrose-pope-2023-ai-easy-to-control-2](https://optimists.ai/2023/11/28/ai-is-easy-to-control/): Introduction, paragraph beginning In what follows. Quotation matches verbatim.
- [evidence-rd-r06-belrose-pope-2023-ai-easy-to-control-3](https://optimists.ai/2023/11/28/ai-is-easy-to-control/): Current AI alignment methods are white box, opening paragraph. Quotation matches verbatim.

Date: Post date and URL give 2023-11-28. Announcement/commitment: An author's argument is not asserted as a finding about actual future controllability. Earliest located: not applicable. Entity: Essay title and author attribution match.

The quotation in evidence item 1 normalises the source's curly quotation marks to straight marks. Source passage: “a process called “alignment.””. Proposed correction: Use the source's curly opening and closing quotation marks around alignment in evidence-rd-r06-belrose-pope-2023-ai-easy-to-control-1; retain all other wording.

### 29. c2-bytedance-seed-20-model-card — minor

The title, team credit, arXiv date and alias caveat support the claim. The contributor quotation changes one apostrophe.

- [c2-ev-bytedance-seed-20-model-card](https://arxiv.org/pdf/2607.00248v1): PDF p. 1, title. Title quote matches.
- [c2-ev-bytedance-seed-20-model-card-stamp](https://arxiv.org/pdf/2607.00248v1): PDF p. 1, arXiv stamp. Stamp quote matches.
- [c2-ev-bytedance-seed-20-model-card-credit](https://arxiv.org/pdf/2607.00248v1): PDF p. 1, team credit. Team quote matches.
- [c2-ev-bytedance-seed-20-model-card-aliases](https://arxiv.org/pdf/2607.00248v1): PDF p. 58, §7 Contributors, introductory sentences. Source has authors’ with a curly apostrophe; the evidence uses a straight apostrophe. Direct PDF SHA-256 1449a46c4ebcdf4c6e00c863d15cdf6418ee75cfa8d1de91453cbf62d1f4a441.

Date: The v1 stamp gives 30 Jun 2026; the claim does not substitute a model release date. Announcement/commitment: Posting the card does not establish weights availability or a performance result. Earliest located: not applicable. Entity: Team credit identifies ByteDance Seed.

The contributor quotation changes the apostrophe in authors’ to a straight apostrophe. Source passage: “Some names refer to the authors’ internal aliases at the company.”. Proposed correction: Change authors' to authors’ in c2-ev-bytedance-seed-20-model-card-aliases. The fact and qualification stay the same.

### 30. atlas-gdm-safety-response — correct

The dated heading and introduction present Google DeepMind's response on safety and responsibility for the UK summit.

- [evidence-atlas-gdm-safety-response](https://deepmind.google/public-policy/ai-summit-policies/): Dated heading and introductory paragraph. Paraphrase matches the introduction.

Date: Heading gives 27 October 2023; publication timing is not implementation timing. Announcement/commitment: The claim remains a publication of self-description. Earliest located: not applicable. Entity: Page identifies Google DeepMind's response.

### 31. kp-shaping-chinchilla-kaplan — correct

The cited sentence attributes the compute-optimal conclusion and the next sentence states the differing token recommendation.

- [evidence-kp-shaping-chinchilla-kaplan-1](https://arxiv.org/pdf/2203.15556v1): PDF p. 1, §1 Introduction, paragraph 2. Quotation matches verbatim; the following sentence supports the qualified disagreement.

Date: Version 1 is dated 2022-03-29; publication basis is appropriate. Announcement/commitment: The record attributes the comparison without deciding the estimates. Earliest located: not applicable. Entity: The cited Kaplan work and citing Hoffmann paper are identified correctly.

### 32. ab-ev-gemini3-card-published — correct

The model-card preamble explicitly states the last-update month and a separate model-release month.

- [evidence-ab-ev-gemini3-card-published-1](https://storage.googleapis.com/deepmind-media/Model-Cards/Gemini-3-Pro-Model-Card.pdf): PDF p. 2, preamble. Quoted text matches across the line break between the two date labels.

Date: May 2026 is correctly a revision month; November 2025 is not treated as the card's publication date. Announcement/commitment: The claim records document publication/revision, not independent verification of evaluations. Earliest located: not applicable. Entity: Gemini 3 Pro card is the intended document.

### 33. prov-rsp-v2-2-may-proceed-with-safeguards — correct

The safeguards-decision sentence includes both conditions retained in the claim.

- [evidence-prov-rsp-v2-2-may-proceed-with-safeguards](https://www-cdn.anthropic.com/872c653b2d0501d6ab44cf87f43e1dc4853e4d37.pdf): PDF p. 14 / printed p. 10, §4.3, opening sentence. Quotation matches verbatim across layout line breaks.

Date: Cover states Effective May 14, 2025. Announcement/commitment: A conditional permission in the policy does not assert deployment or compliance. Earliest located: not applicable. Entity: Content-addressed PDF identifies RSP version 2.2.

### 34. cmp-ms-fgf-2025-d6-discretion — correct

The edition states qualitative flexibility and the benefits-risk element of a submitted deployment recommendation. The qualification keeps that element in its proper context.

- [ev-cmp-ms-fgf-2025-d6-discretion-1](https://cdn-dynmedia-1.microsoft.com/is/content/microsoftcorp/microsoft/final/en-us/microsoft-brand/documents/Microsoft-Frontier-Governance-Framework.pdf): PDF p. 6 / printed p. 5, Deeper capability assessment. Quotation is a verbatim excerpt of the second sentence.
- [ev-cmp-ms-fgf-2025-d6-discretion-2](https://cdn-dynmedia-1.microsoft.com/is/content/microsoftcorp/microsoft/final/en-us/microsoft-brand/documents/Microsoft-Frontier-Governance-Framework.pdf): PDF p. 10 / printed p. 9, Risk-informed deployment decision, point 2. Quotation matches verbatim and is one of three required recommendation elements, as qualified.

Date: Running version label and change log identify February 2025. Announcement/commitment: Textual discretion is not evidence that an exception was exercised or that implementation occurred. Earliest located: not applicable. Entity: Inspected PDF identifies Version 1, February 2025.

### 35. ab-arg-d1-brent-articulates — correct

The summary makes the attributed challenge to published safety assessments and the cover labels the paper unreviewed.

- [evidence-ab-arg-d1-brent-articulates-1](https://arxiv.org/pdf/2506.13798v1): PDF p. 4 / printed p. iv, Summary. Summary quotation matches verbatim at the argument level; technical dialogues were not reproduced.
- [evidence-ab-arg-d1-brent-articulates-2](https://arxiv.org/abs/2506.13798): arXiv submission history, v1. Quoted date entry matches.

Date: arXiv history gives 12 Jun 2025; cover gives June 2025, consistent with the qualified day precision. Announcement/commitment: The finding is attributed to this working paper and is not independently endorsed. Earliest located: not applicable. Entity: Title, author pair and working-paper number identify the intended text.

### 36. c2-governance-sail-frmf-v1-published — correct

The executive summary names the collaborating institutions and its guideline scope; front matter supplies the month.

- [c2-ev-governance-sail-frmf-v1-published-1](https://concordia-ai.com/wp-content/uploads/2025/07/Frontier-AI-Risk-Management-Framework-v1.0-en.pdf): PDF p. 2, Executive Summary. Institutional-collaboration quote matches verbatim.
- [c2-ev-governance-sail-frmf-v1-published-2](https://concordia-ai.com/wp-content/uploads/2025/07/Frontier-AI-Risk-Management-Framework-v1.0-en.pdf): PDF p. 4, How to cite this report. Citation-line quote matches verbatim across layout breaks.
- [c2-ev-governance-sail-frmf-v1-published-3](https://concordia-ai.com/wp-content/uploads/2025/07/Frontier-AI-Risk-Management-Framework-v1.0-en.pdf): PDF p. 2, Executive Summary. Guideline quote matches verbatim. Direct PDF hash matches the source's recorded ce6121e723aa4334473f75abd47d831359a52621c8c453358b67df2a36f925c2.

Date: Own citation line gives July 2025, without an invented day. Announcement/commitment: Introducing a guideline does not establish adoption or a developer commitment. Earliest located: not applicable. Entity: The document identifies the named institutions and framework version.

### 37. fl-link-ms-fgf-2026-ny-raise — correct

The assessment section names the Act and the change log supplies the update sequence, without claiming legal causation.

- [evidence-fl-link-ms-fgf-2026-ny-raise-1](https://cdn-dynmedia-1.microsoft.com/is/content/microsoftcorp/microsoft/msc/documents/presentations/CSR/Frontier-Governance-Framework-Feb-2026.pdf): PDF p. 6 / printed p. 5, leading indicator assessment. Act-title quotation matches verbatim.
- [evidence-fl-link-ms-fgf-2026-ny-raise-2](https://cdn-dynmedia-1.microsoft.com/is/content/microsoftcorp/microsoft/msc/documents/presentations/CSR/Frontier-Governance-Framework-Feb-2026.pdf): PDF p. 16 / printed p. 15, February 2026 change-log entry. Change-log quotation matches verbatim across layout breaks.

Date: The edition states February 2026; month precision is appropriate. Announcement/commitment: A stated framework response is not compliance. Earliest located: not applicable. Entity: The object is the named New York Act; no later amending chapter is substituted.

### 38. th-fam-tllm-attention-2017-def — correct

The conclusion describes replacing recurrence with multi-headed self-attention; the qualification avoids treating this as a definition of all later language models.

- [evidence-th-fam-tllm-attention-2017-def-1](https://arxiv.org/pdf/1706.03762v1): PDF p. 10, §7 Conclusion. Quotation matches verbatim across line breaks.

Date: The source expression is arXiv v1 submitted 2017-06-12; no later venue date is substituted. Announcement/commitment: Description of the authors' architecture only. Earliest located: not applicable. Entity: The cited paper and method-family record are distinguished.

### 39. kp-cites-gpt4-system-card-2023-ethical-social-risks-harm-from-2021 — correct

Reference [6] lists the intended work's title.

- [evidence-kp-cites-gpt4-system-card-2023-ethical-social-risks-harm-from-2021-1](https://cdn.openai.com/papers/gpt-4-system-card.pdf): PDF p. 31, References [6]. The title paraphrase matches the reference entry.

Date: Unknown publication date is retained for this inspected system-card expression; the cited work's date is not borrowed. Announcement/commitment: Citation alone does not establish agreement or influence. Earliest located: not applicable. Entity: Reference title identifies the intended work.

### 40. c3-stepfun-legal-form-site — correct

The pinned site bundle contains both copyright-name strings and the filing-number string as stated.

- [c3-ev-stepfun-legal-form-site](https://www.stepfun.com/assets/index-4zBpLKmx.js): Chinese legalCopyright string in cited bundle. Chinese quotation matches verbatim.
- [c3-ev-stepfun-legal-form-site-2](https://www.stepfun.com/assets/index-4zBpLKmx.js): English legalCopyright string in cited bundle. English quotation matches verbatim.
- [c3-ev-stepfun-legal-form-site-3](https://www.stepfun.com/assets/index-4zBpLKmx.js): Chinese legalRecordNumber string in cited bundle. Filing-number quotation matches verbatim. The live homepage alone is a script shell; the exact cited bundle was retrieved directly.

Date: Retrieval-date snapshot does not invent a registration date or date of renaming. Announcement/commitment: A copyright holder is not converted into a registry finding or corporate continuity claim. Earliest located: not applicable. Entity: The two Chinese legal names remain distinct, linked only by the stated filing-number basis.

### 41. rd-reply-dafoe-russell-2016-yes-we-are-worried-to-etzioni-2016-experts-dont-think — correct

The opening paragraph names and links the essay being answered; the article presents itself as a response.

- [evidence-rd-reply-dafoe-russell-2016-yes-we-are-worried-to-etzioni-2016-experts-dont-think-1](https://www.technologyreview.com/2016/11/02/156285/yes-we-are-worried-about-the-existential-risk-of-artificial-intelligence/): Opening body paragraph. Quotation matches verbatim. Web retrieval was denied by robots rules; direct HTTP succeeded. The embedded older target link returns 404, but the target's current canonical URL was retrieved and dated 20 September 2016.

Date: The replying article gives 2016-11-02. The intended linked essay's current canonical page gives 2016-09-20. Announcement/commitment: A reply is not represented as agreement. Earliest located: not applicable. Entity: Title and author identify the intended answered essay despite the article's obsolete /s/ link.

### 42. ht-w03-degaris-1989-what-if-ai-succeeds — correct

The Options passage supplies the stated third possibility and does not establish transfer or personal continuation.

- [evidence-ht-w03-degaris-1989-what-if-ai-succeeds-1](https://ojs.aaai.org/aimagazine/index.php/aimagazine/article/download/741/659): PDF p. 4 / printed p. 20, Options. Quotation matches verbatim after layout whitespace and line-wrap joining. Direct PDF succeeded where the web reader returned no text; SHA-256 bfb40a7efb65b582325b9800ab23b1f9f854898188951d992996bc3dd0827fb5.

Date: The printed issue is Summer 1989; year-only publication is appropriate. Announcement/commitment: A possibility stated by the text, not a completed technical event. Earliest located: not applicable. Entity: The named article and context proposition are correctly distinguished.

### 43. th-prob-pearl-1982-def — correct

The abstract states the distributed hierarchical update method; the introduction supplies the probabilistic assumption.

- [evidence-th-prob-pearl-1982-def-1](https://cdn.aaai.org/AAAI/1982/AAAI82-032.pdf): PDF p. 1, Abstract. Quotation matches the printed abstract; Bayes has no possessive apostrophe in this expression.
- [evidence-th-prob-pearl-1982-def-2](https://cdn.aaai.org/AAAI/1982/AAAI82-032.pdf): PDF p. 1, Introduction. Quotation matches verbatim.

Date: The AAAI 1982 proceedings expression supports year precision. Announcement/commitment: Author's description of a method only. Earliest located: not applicable. Entity: Paper and probabilistic-method family match the records.

### 44. kp-states-ppo-paper-1 — correct

The introduction makes the attributed algorithm-contribution claim and the abstract identifies PPO.

- [evidence-kp-states-ppo-paper-1-1](https://arxiv.org/pdf/1707.06347v1): PDF p. 1, §1, second paragraph. Quotation matches verbatim across layout breaks.

Date: arXiv stamp says 20 Jul 2017; version 1 and publication basis match. Announcement/commitment: Author's claimed contribution is not treated as independent performance verification. Earliest located: not applicable. Entity: PPO paper and named comparison method are correctly identified.

### 45. rd-r06-russell-2014-edge-myths-and-moonshine — correct

The response gives the alignment difficulty, the field-goal account and the proposed change; its closing optimism is preserved.

- [evidence-rd-r06-russell-2014-edge-myths-and-moonshine-1](https://www.edge.org/conversation/the-myth-of-ai): Reality Club, Of Myths And Moonshine, paragraph after numbered points. Quotation matches verbatim in live and dated capture. Capture SHA-256 2e77f2214c8eeaed27cd77f18defff833690292a245530e68cb729d37a4da609.
- [evidence-rd-r06-russell-2014-edge-myths-and-moonshine-2](https://www.edge.org/conversation/the-myth-of-ai): Same response, numbered point 1 and closing paragraphs. The paraphrase preserves the response's claims and its stated possibility of progress.

Date: Year 2014 is supported by the recorded December capture. Direct retrieval confirms the wording in the 2014-12-06 capture; absence from earlier November captures was not independently re-established in this sample. Announcement/commitment: An attributed argument with qualifications, not a prediction certified by the audit. Earliest located: not applicable. Entity: The response is the named author's contribution within the larger conversation.

### 46. kp-authored-ross-girshick-rich-feature-hierarchies-accurate-object-2013 — correct

Version 1's byline credits the recorded author.

- [evidence-kp-authored-ross-girshick-rich-feature-hierarchies-accurate-object-2013-1](https://arxiv.org/pdf/1311.2524v1): PDF p. 1, byline. Name quotation matches verbatim; v1 abstract page independently confirms submission date.

Date: arXiv v1 page gives 2013-11-11. Announcement/commitment: Credit alone does not imply sole authorship or employment. Earliest located: not applicable. Entity: Printed byline identifies the intended author and paper.

### 47. ht-w04-degaris-1990-moral-dilemmas — correct

The cited section states the scenario as the author's envisaged conflict. The record preserves the later witness and does not assign the author's labels to other people.

- [evidence-ht-w04-degaris-1990-moral-dilemmas-1](https://www.cis.umassd.edu/~ivalova/Spring08/cis412/Old/21CA-ULM.PDF): PDF p. 4 of 6, §3 A World Divided. Quotation matches verbatim including straight quotation marks; footer gives 20/03/99 12:50.

Date: Cover claims written May 1989 and appeared in a 1990 journal; print footers show 20/03/99. Claimed, publication and attested dates are separated. Announcement/commitment: A forecast is not presented as a realised event. Earliest located: not applicable. Entity: Document title and author credit identify the intended text.

### 48. rd-r16-yudkowsky-2017-alphago-zero-foom — correct

The paragraph explicitly sets the interpretation of the other author's thesis against the stated Go example.

- [evidence-rd-r16-yudkowsky-2017-alphago-zero-foom-1](https://intelligence.org/2017/10/20/alphago/): Paragraph beginning I emphasize how all the mighty human edifice. Quotation matches verbatim; the preceding sentence supplies the discarded-knowledge example.

Date: Publisher page gives 20 October 2017. Announcement/commitment: The argument and its single-domain basis remain attributed. Earliest located: not applicable. Entity: The thesis is recorded as the essay author's understanding, not substituted for the other author's own text.

### 49. th-evo-koza-credits-holland — correct

The background paragraph makes the attributed formulation credit with the fixed-length-string scope; surrounding text distinguishes other approaches.

- [evidence-th-evo-koza-credits-holland-1](http://www.genetic-programming.com/jkpdf/tr1314.pdf): PDF p. 10 / printed p. 6, Background on genetic algorithms. Quoted segment matches verbatim.
- [evidence-th-evo-koza-credits-holland-2](http://www.genetic-programming.com/jkpdf/tr1314.pdf): Same paragraph. Quoted fixed-length-string segment matches verbatim across layout breaks.

Date: Cover states June 1990; month precision is correct. Announcement/commitment: Attribution is not converted into a priority finding by this audit. Earliest located: No earliest located role is assigned. Entity: Book title and named author are explicit in the source.

### 50. kp-authored-hongyu-ren-opportunities-risks-foundation-models-2021 — correct

The byline of version 1 credits the recorded author.

- [evidence-kp-authored-hongyu-ren-opportunities-risks-foundation-models-2021-1](https://arxiv.org/pdf/2108.07258v1): PDF p. 1, byline. Name quotation matches verbatim. Direct 211-page PDF opened after web size rejection; only the byline page was needed. SHA-256 7d7de90261ec22654cd360b7925886d75321db35ab6ff9412d8893da760ffe67.

Date: Stamp and arXiv v1 page give 16 Aug 2021. Announcement/commitment: Authorship only. Earliest located: not applicable. Entity: Printed name identifies the credited author of this text.

### 51. kp-states-debate-paper-1 — correct

The abstract proposes self-play debate in response to the stated limitation of direct human judgement.

- [evidence-kp-states-debate-paper-1-1](https://arxiv.org/pdf/1805.00899v1): PDF p. 1, Abstract. Quotation matches verbatim; preceding sentence supplies the task-complexity scope.

Date: arXiv v1 page gives 2 May 2018. Announcement/commitment: A proposal is not asserted to have solved the limitation. Earliest located: not applicable. Entity: The intended debate paper is identified by title and byline.

### 52. kp-cites-agrawal-gans-goldfarb-2019-ambiguous-labor-market-impact-robots-jobs-evidence-from-us-2019 — correct

The reference list names the intended work; its 2017 working-paper date does not contradict a work-level citation to the later work record.

- [evidence-kp-cites-agrawal-gans-goldfarb-2019-ambiguous-labor-market-impact-robots-jobs-evidence-from-us-2019-1](https://www.nber.org/system/files/working_papers/w25619/w25619.pdf): PDF p. 24 / printed p. 22, References, Acemoglu and Restrepo 2017. Paraphrase matches the reference. Direct PDF succeeded after web 403; SHA-256 dbd015967a47f77a41ff8028f5cc8208c3bb0e8cb44d6b1cc9be04f7df9c2450.

Date: Cover states February 2019; month precision is correct. Announcement/commitment: Citation is not agreement or influence, and the cited revision is explicitly unspecified. Earliest located: not applicable. Entity: Title and author pair identify the intended cited work.

### 53. aib-labs-nv-bionemo-announced-2022 — correct

The dated release supplies the product purpose and expected early-access timing.

- [evidence-aib-labs-nv-bionemo-announced-2022-1](https://nvidianews.nvidia.com/news/nvidia-launches-large-language-model-cloud-services-to-advance-ai-and-digital-biology): Second body paragraph. Purpose quotation matches verbatim.
- [evidence-aib-labs-nv-bionemo-announced-2022-2](https://nvidianews.nvidia.com/news/nvidia-launches-large-language-model-cloud-services-to-advance-ai-and-digital-biology): Availability section, opening sentence. Availability quotation matches verbatim and retains expected.

Date: Page gives 20 September 2022; publication basis and announcement date coincide as qualified. Announcement/commitment: Expected availability is not converted into completed release or measured effectiveness. Earliest located: not applicable. Entity: BioNeMo is distinguished from the separately announced NeMo service.

### 54. kp-cites-summarize-feedback-paper-improving-language-understanding-by-generative-2018 — correct

Reference [44] gives the intended work title.

- [evidence-kp-cites-summarize-feedback-paper-improving-language-understanding-by-generative-2018-1](https://arxiv.org/pdf/2009.01325v1): PDF p. 13, References [44]. Reference-title paraphrase matches; line-wrap hyphenation does not change the title.

Date: The citing expression is arXiv v1, 2020-09-02; publication basis matches. Announcement/commitment: A reference does not establish influence or a cited revision. Earliest located: not applicable. Entity: Title and credited authors identify the cited work.

### 55. aib-mod-af-casp13-contribution — correct

The abstract states the neural-network contribution and the resulting system name at the recorded scope.

- [evidence-aib-mod-af-casp13-contribution-1](https://www.nature.com/articles/s41586-019-1923-7): Article Abstract. Quotation matches verbatim. Web reader failed in the publisher login redirect; direct HTTP exposed the abstract and publication metadata.
- [evidence-aib-mod-af-casp13-contribution-2](https://www.nature.com/articles/s41586-019-1923-7): Article Abstract, resulting-system sentence. Quotation matches verbatim. An unnecessary nearest-date archive fallback returned 404; the successful live publisher abstract supplies the evidence.

Date: Publisher metadata says Published: 15 January 2020. Announcement/commitment: Author-reported contribution, not independent assessment or evidence about a later redesigned system. Earliest located: not applicable. Entity: This is the 2020 CASP13 article, distinct from the later AlphaFold paper.

### 56. kp-authored-quoc-le-gpipe-efficient-training-giant-neural-2018 — correct

Version 1's byline credits the recorded author.

- [evidence-kp-authored-quoc-le-gpipe-efficient-training-giant-neural-2018-1](https://arxiv.org/pdf/1811.06965v1): PDF p. 1, byline. Name quotation matches verbatim; submission date confirmed on the v1 abstract page.

Date: arXiv v1 page gives 16 November 2018. Announcement/commitment: Authorship credit only. Earliest located: not applicable. Entity: Printed credited name matches the record.

### 57. kp-shaping-benzell-aghion — correct

The literature paragraph attributes the labour-share connection to the named co-authors and identifies the 2017 work.

- [evidence-kp-shaping-benzell-aghion-1](https://www.nber.org/system/files/working_papers/w20941/w20941.pdf): PDF p. 6 / printed p. 4, literature discussion. Quotation matches verbatim. Direct PDF succeeded after web 403; SHA-256 362172ebc8a725bfe76675a836f565736278dc12c86db96b5e67944451b0ae60.

Date: Cover reads February 2015, Revised October 2018. The claim correctly uses the revision month; the historical absence in the 2015 copy was not re-established here. Announcement/commitment: Summary of an argument is not endorsement or causal influence. Earliest located: not applicable. Entity: The named work and authors match the object record.

### 58. th-lp-credit-kowalski-1988-colmerauer — correct

The opening paragraph makes the attributed naming statement with both credited persons and the stated season.

- [evidence-th-lp-credit-kowalski-1988-colmerauer-1](https://www.doc.ic.ac.uk/~rak/papers/the%20early%20years.pdf): PDF p. 1, opening paragraph in column 1. Quotation matches verbatim after layout line-wrap joining.

Date: Printed issue footers give January 1988; month precision is correct. Announcement/commitment: An attributed retrospective account, not an adjudicated priority finding. Earliest located: No earliest located role is asserted. Entity: The source's Phillipe spelling is preserved in the quote; the statement uses the intended person's standard spelling.

### 59. aib-labs-iso-founding-stated — minor

Both releases support the founding/launch year. The Novartis evidence uses the wrong page and normalises an apostrophe.

- [evidence-aib-labs-iso-founding-stated-1](https://storage.googleapis.com/isomorphiclabs-website-public-artifacts/Isomorphic_Labs_Enters_into_a_Research_Collaboration_with_Johnson_Johnson.pdf): 2026 PDF p. 1, About Isomorphic Labs. Founding-year quotation matches verbatim.
- [evidence-aib-labs-iso-founding-stated-2](https://storage.googleapis.com/isomorphiclabs-website-public-artifacts/ISOMORPHIC_LABS_NOVARTIS_07_01_24.pdf): 2024 Novartis PDF p. 2, About Isomorphic Labs. The quoted launch sentence is on PDF p. 2 and has Alphabet’s, not Alphabet's. A separate inspection of the January 2024 Lilly release confirms the claim's plural wording.

Date: The releases are dated 2026-01-20 and 2024-01-07; the claimed founding year remains 2021, without invented month or day. Announcement/commitment: A stated founding year is not converted into legal incorporation evidence. Earliest located: not applicable. Entity: The company is identified in both releases; the companion Lilly release also repeats the 2021 wording.

The Novartis release quotation is on PDF p. 2, not p. 1, and changes the source's curly apostrophe. Source passage: “Alphabet’s DeepMind in 2021”. Proposed correction: Change evidence-aib-labs-iso-founding-stated-2's locator to 'PDF p. 2, About Isomorphic Labs' and replace Alphabet's with Alphabet’s in its quotation.

### 60. kp-authored-tom-henighan-scaling-laws — correct

The inspected version's byline credits the recorded author.

- [evidence-kp-authored-tom-henighan-scaling-laws-1](https://arxiv.org/pdf/2001.08361v1): PDF p. 1, byline. Name quotation matches verbatim; the v1 submission date is independently visible on the publisher's abstract page.

Date: arXiv v1 abstract page gives 23 January 2020. Announcement/commitment: Authorship credit only. Earliest located: not applicable. Entity: Printed author name identifies the intended author of the named paper.

### 61. rd-r02-russell-2014-edge-myths-and-moonshine — correct

Numbered point 2 states the attributed instrumental-convergence argument at the recorded scope.

- [evidence-rd-r02-russell-2014-edge-myths-and-moonshine-1](https://www.edge.org/conversation/the-myth-of-ai): Of Myths And Moonshine, numbered point 2. Quotation matches verbatim, including the spaced en dash, in live text and the dated capture already inspected for claim 45.

Date: The response is present in the 2014-12-06 capture inspected with claim 45; the claim uses year precision and separately records attestation. Announcement/commitment: An author's argument, not an observation of a built system. Earliest located: not applicable. Entity: The named response and proposition criterion match.

### 62. aib-co-flagship-formed-generate-2018 — correct

The prospectus summary explicitly gives the founding organisation and year.

- [evidence-aib-co-flagship-formed-generate-2018-1](https://www.sec.gov/Archives/edgar/data/2100782/000119312526083190/generate_bio_424b4.htm): Prospectus summary, closing sentence of management paragraph. Quotation matches verbatim; the cover date is visible in the same filing.

Date: Prospectus cover is dated 26 February 2026; 2018 is clearly the claimed founding year. Announcement/commitment: A retrospective formation statement is not evidence of ownership or control. Earliest located: not applicable. Entity: The prospectus identifies Generate and the named founding organisation.

### 63. th-evo-burgin-1973 — correct

The cited Crossref result supplies the exact title, author and journal.

- [evidence-th-evo-burgin-1973-1](https://api.crossref.org/works?query.bibliographic=evolutionary+programming&filter=until-pub-date:1980&rows=100&select=title,issued,DOI,container-title,author): Crossref query result item DOI 10.1080/01969727308545849. Exact title quotation matches the returned title field. Direct JSON retrieval succeeded after web-reader failure.

Date: The DOI item's issued date-parts are [1973, 1], matching the indexed month basis. Announcement/commitment: Indexed naming use only. Earliest located: The earliest located role is withheld; this claim does not assert it. Entity: DOI 10.1080/01969727308545849 identifies the intended article.

### 64. th-lp-def-kowalski-1988 — correct

The opening characterisation supplies the two stated elements and the surrounding paragraph calls it rough.

- [evidence-th-lp-def-kowalski-1988-1](https://www.doc.ic.ac.uk/~rak/papers/the%20early%20years.pdf): PDF p. 1, column 1. Quotation matches verbatim after joining layout line-wrap hyphens.

Date: Journal footers give January 1988. Announcement/commitment: An attributed retrospective characterisation, not a universal definition established by the audit. Earliest located: not applicable. Entity: Paper and logic-programming family match.

### 65. aib-co-genentech-prescient-lab-in-the-loop-2021 — correct

The embedded article-body passage describes the feedback flow between experimental and computational teams, matching the paraphrase.

- [evidence-aib-co-genentech-prescient-lab-in-the-loop-2021-1](https://www.gene.com/stories/making-big-moves-and-large-molecules): Embedded article body, paragraph containing lab in the loop. Visible HTML reader returned navigation only. Direct page retrieval exposes the embedded body and published_at metadata; the quoted short phrase and paraphrase are supported. SHA-256 449a3b72823dbbd05669444351a0567d199f54898501191219e1544b9088519e.

Date: Embedded published_at is 2021-11-02T07:00:00Z; the later updated_at field is not substituted. Announcement/commitment: The company's account is not evidence of effect. Earliest located: No earliest located role is claimed. Entity: The embedded article names Prescient Design and Genentech.

### 66. kp-authored-quoc-le-natural-questions-benchmark-question-answering-2019 — minor

The authorship credit is supported, but July precision is not supported by the inspected source's date information.

- [evidence-kp-authored-quoc-le-natural-questions-benchmark-question-answering-2019-1](https://aclanthology.org/Q19-1026.pdf): PDF p. 1, byline; ACL metadata and DOI date fields. Name quote matches verbatim. Supplementary date inspection found unsupported July precision, without a basis to identify an earlier public month.

Date: PDF and ACL entry support 2019. The ACL Month field is empty; publisher-deposited Crossref metadata gives November 2019 as print/issued month, not July. Announcement/commitment: Authorship only. Earliest located: not applicable. Entity: The printed byline contains the intended credited author.

The authorship record uses 2019-07, while its cited expression and ACL entry do not establish July; DOI metadata records a different print/issued month. The authorship fact is unchanged. Source passage: “2019”. Proposed correction: Reduce this record's date to 2019 pending a source for a more precise public-expression date. If using the DOI's 2019-11 print date, label that date's basis explicitly rather than calling it the earliest recorded expression.

### 67. aib-arg-p4-huang-2016 — correct

The abstract supplies the design claim and explicitly identifies physical principles as its basis; context status preserves the absence of a machine-learning element.

- [evidence-aib-arg-p4-huang-2016-1](https://www.nature.com/articles/nature19946): Abstract, closing sentence. Quotation matches verbatim. Direct publisher HTTP succeeded after the web reader's redirect failure.
- [evidence-aib-arg-p4-huang-2016-2](https://www.nature.com/articles/nature19946): Abstract, physical-principles sentence. Quotation matches verbatim. Only the abstract was used.

Date: Publisher page states Published: 14 September 2016. Announcement/commitment: The authors' stated possibility is not presented as independently achieved effectiveness. Earliest located: not applicable. Entity: The 2016 review is distinguished from later machine-learning design work.

### 68. kp-authored-adam-roberts-palm-scaling-language-modeling-pathways-2022 — correct

Version 1's byline credits the recorded author.

- [evidence-kp-authored-adam-roberts-palm-scaling-language-modeling-pathways-2022-1](https://arxiv.org/pdf/2204.02311v1): PDF p. 1, byline. Name quotation matches verbatim; the v1 abstract page confirms submission date.

Date: arXiv v1 page states 5 Apr 2022. Announcement/commitment: Authorship credit only. Earliest located: not applicable. Entity: Printed credited name matches the intended person.

### 69. ht-w04-degaris-2008-artilect-war-agi — correct

The abstract and §5 state the attributed forecast and named groups; the source's labels remain its own.

- [evidence-ht-w04-degaris-2008-artilect-war-agi-1](https://agi-conf.org/2008/artilectwar.pdf): PDF p. 1, Abstract. Quoted abstract fragment matches verbatim.
- [evidence-ht-w04-degaris-2008-artilect-war-agi-2](https://agi-conf.org/2008/artilectwar.pdf): PDF p. 5, §5. Quotation matches verbatim; the date limitation remains material to use of this record.

Date: The 2008 conference hosting is explicit and the claim preserves that the PDF itself does not establish a publication date. Announcement/commitment: Forecast is not described as a realised event. Earliest located: not applicable. Entity: Title and author identify the intended paper.

### 70. aib-mod-esm1b-contribution — correct

The abstract states the training scale and method with both quantities as recorded.

- [evidence-aib-mod-esm1b-contribution-1](https://pmc.ncbi.nlm.nih.gov/articles/PMC8053943/): PMC article, Abstract. Quotation matches verbatim. The web reader showed a browser challenge; direct HTTP returned the article and citation metadata. SHA-256 cbbdc0709bbb6d75aaab1e74a85954f97a10a36bd9cd024053bcc7f8511e42fb.

Date: PMC citation_publication_date is 2021 Apr 5, distinct from received and accepted dates. Announcement/commitment: Author-reported training scale is not an independent performance result. Earliest located: not applicable. Entity: The named article is the intended ESM expression.

### 71. th-sp-name-strips-1971 — correct

The descriptive terms explicitly include both named expressions.

- [evidence-th-sp-name-strips-1971-1](https://ijcai.org/proceedings/1971/0063.pdf): PDF p. 1 / printed p. 608, Descriptive terms. Quotation matches after layout whitespace normalisation. Direct PDF opened after web-reader failure; the text layer has unrelated OCR errors but the quoted terms are legible in extraction.

Date: The cited publisher proceedings are the 1971 expression; year precision is appropriate. Announcement/commitment: Naming use is not a priority claim. Earliest located: No earliest located role is asserted. Entity: STRIPS title and credited authors identify the intended paper.

### 72. aib-labs-dm-2018-casp13-ranking — minor

The current passage supports the developer's attributed account. The stored quotation changes its typography.

- [evidence-aib-labs-dm-2018-casp13-ranking-1](https://deepmind.google/blog/alphafold-using-ai-for-scientific-discovery/): Live post, CASP paragraph. Words match but the source has a curly apostrophe in We’re and curly quotation marks around the relayed phrase.
- [evidence-aib-labs-dm-2018-casp13-ranking-2](https://web.archive.org/web/20181203181528/https://deepmind.com/blog/alphafold/): 2018-12-03 archive capture, Authors block. Date and author paraphrase matches; directly retrieved capture SHA-256 4388697cdcfc8eea9ab737720269a37d4efadf6936df1dd3abc3ab4ed0292350.

Date: Direct 2018-12-03 capture lists Sunday, 2 December 2018 and the recorded authors; the later live-page date is not substituted. Announcement/commitment: Developer-relayed assessment language remains distinct from the organisers' own text. Earliest located: not applicable. Entity: A7D entry and dated post are correctly identified.

The quotation normalises the live source's apostrophe and quotation marks. Source passage: “We’re proud to be part”. Proposed correction: Use We’re rather than We're and the source's curly opening and closing quotation marks in evidence-aib-labs-dm-2018-casp13-ranking-1. Retain the separate historical-date qualification.

### 73. th-ns-garcez-lamb-term — minor

Title and abstract wording are present in both v1 and the cited v2, but the date is paired with the wrong version.

- [evidence-th-ns-garcez-lamb-term-1](https://arxiv.org/pdf/2012.05876v2): v2 PDF p. 1, title; supplemented by v1. Title quote matches in both inspected versions.
- [evidence-th-ns-garcez-lamb-term-2](https://arxiv.org/pdf/2012.05876v2): v2 PDF p. 1, Abstract; supplemented by v1. Quote matches in both inspected versions, so the 10 December wording can be supported by adding the v1 citation.

Date: The claim uses 2020-12-10, the v1 stamp. The sole cited expression is v2, whose stamp is 16 Dec 2020. Announcement/commitment: Use of a name and an author's historical framing only. Earliest located: No earliest located role is assigned. Entity: Both versions identify the intended paper and author pair.

The recorded submission day belongs to v1, but both evidence items cite v2 without distinguishing its 16 December revision. Source passage: “arXiv:2012.05876v2 [cs.AI] 16 Dec 2020”. Proposed correction: Cite arXiv:2012.05876v1 for the 2020-12-10 wording and submission date, since its title and abstract contain the same quoted text; alternatively distinguish the v1 submission date from the cited v2 revision date.

### 74. kp-authored-kaiming-he-deep-residual-learning-image-recognition-2015 — correct

The v1 byline credits the recorded author.

- [evidence-kp-authored-kaiming-he-deep-residual-learning-image-recognition-2015-1](https://arxiv.org/pdf/1512.03385v1): PDF p. 1, byline. Name quotation matches verbatim; v1 history confirms date.

Date: arXiv v1 history gives 10 December 2015. Announcement/commitment: Authorship only. Earliest located: not applicable. Entity: Printed name and document title match the records.

### 75. rd-a4-grace-2022-counterarguments — correct

The passage disputes the inference from a feedback loop's existence to its speed and preserves the possibility of other arguments.

- [evidence-rd-a4-grace-2022-counterarguments-1](https://aiimpacts.org/counterarguments-to-the-basic-ai-x-risk-case/): Speed of intelligence growth is ambiguous, numbered counterargument 1. Quotation matches verbatim.
- [evidence-rd-a4-grace-2022-counterarguments-2](https://aiimpacts.org/counterarguments-to-the-basic-ai-x-risk-case/): Same section, closing paragraph. Quotation matches verbatim including the caveat.

Date: Visible byline gives 31 August 2022, matching the corrected date. Announcement/commitment: An attributed counterargument is not a finding about actual future growth. Earliest located: not applicable. Entity: Post and proposition criterion match.

### 76. kp-states-frey-osborne-2013-future-of-employment-1 — correct

The abstract states the paper's research question exactly as represented.

- [evidence-kp-states-frey-osborne-2013-future-of-employment-1-1](https://oms-www.files.svdcdn.com/production/downloads/academic/The_Future_of_Employment.pdf): PDF p. 1, Abstract. Quotation matches verbatim; cover date matches the version qualification.

Date: Cover prints September 17, 2013. Announcement/commitment: Authors' description of their contribution only; no risk estimate is independently adopted. Earliest located: not applicable. Entity: Title and byline identify the intended working-paper expression.

### 77. kp-authored-amanda-askell-training-helpful-harmless-assistant-reinforcement-2022 — correct

The inspected v1 byline credits the recorded author.

- [evidence-kp-authored-amanda-askell-training-helpful-harmless-assistant-reinforcement-2022-1](https://arxiv.org/pdf/2204.05862v1): PDF p. 1, byline. Name quotation matches verbatim; v1 history confirms date.

Date: arXiv v1 history gives 12 April 2022. Announcement/commitment: Authorship only. Earliest located: not applicable. Entity: Printed name matches the intended author record.

### 78. rd-r10a-brooks-2014-tool-not-threat — minor

The Edge passages support the attributed argument, but the month comes from another expression rather than a dated Edge response.

- [evidence-rd-r10a-brooks-2014-tool-not-threat-1](https://www.edge.org/conversation/the-myth-of-ai): Edge response, third paragraph. Quotation matches verbatim in Edge.
- [evidence-rd-r10a-brooks-2014-tool-not-threat-2](https://www.edge.org/conversation/the-myth-of-ai): Same response, closing paragraph. Quotation matches Edge's spelled-out thirty; the dated repost uses 30, confirming that the expressions should remain separate.

Date: Edge gives no response date. The Robohub repost is dated 11 November 2014 and has small wording differences; that does not independently date the Edge expression. Announcement/commitment: The statement remains an attributed timescale argument, not a finding about future systems. Earliest located: not applicable. Entity: The named response is the intended author's contribution.

The claim dates an individually undated Edge response to 2014-11 using a month documented only for a separate repost. Source passage: “11 November 2014”. Proposed correction: Use year precision for the Edge expression unless a dated November capture establishes its month, and keep the Robohub repost's 2014-11-11 date separate. Cite both expressions when explaining the distinction.

### 79. kp-states-lamda-language-models-dialog-applications-2022-2 — minor

The model description and both quantities are supported. The quotation drops the hyphen in Transformer-based.

- [evidence-kp-states-lamda-language-models-dialog-applications-2022-2-1](https://arxiv.org/pdf/2201.08239v1): PDF p. 1, Abstract; arXiv v1 abstract also inspected. Direct PDF text items show Transformer- at one line's end and based on the next; the HTML abstract confirms Transformer-based. The evidence incorrectly joins this as Transformerbased.

Date: arXiv v1 history gives 20 January 2022. Announcement/commitment: The paper's own model description is not independent assessment. Earliest located: not applicable. Entity: LaMDA family and parameter/token scales match.

The quote loses the compound's hyphen when joining a PDF line break. Source passage: “LaMDA is a family of Transformer-based neural language models specialized for dialog”. Proposed correction: Replace Transformerbased with Transformer-based in evidence-kp-states-lamda-language-models-dialog-applications-2022-2-1.

### 80. rd-r06-pinker-2018-popsci-fear-robots — material error

The statement and both quoted argument passages are supported. The qualification's categorical absence claim about training is false, including within the value-alignment discussion itself.

- [evidence-rd-r06-pinker-2018-popsci-fear-robots-1](https://www.popsci.com/robot-uprising-enlightenment-now/): Value Alignment Problem discussion, sentence on conflicting goals. Both quotation sentences match verbatim. The qualification fails against the same article's explicit training example.
- [evidence-rd-r06-pinker-2018-popsci-fear-robots-2](https://www.popsci.com/robot-uprising-enlightenment-now/): Following paragraph on incremental development. Quotation matches verbatim. The surrounding discussion explicitly includes an AI trained on pictures of smiling faces, and an earlier paragraph discusses programs trained on millions of examples.

Date: Publisher byline gives 14 February 2018. Announcement/commitment: The author's argument remains attributed; no assertion about actual systems is certified. Earliest located: not applicable. Entity: Title, author and book-adaptation note identify the intended article.

The qualification says the article does not discuss systems produced by training. Its value-alignment example explicitly discusses an AI trained on a concept through pictures, so the qualification materially narrows the argument's stated scope. Source passage: “if it had been trained on the concept of happiness with pictures of smiling faces”. Proposed correction: Remove 'it does not discuss systems produced by training'. If a narrower limitation is needed, state it as an interpretation with an explicit rationale; do not claim that training is absent from the article.

### 81. lineage-iem-credits-good — correct

The report introduces the quoted argument by naming its author, separately from merely citing the paper.

- [evidence-lineage-iem-credits-good](https://intelligence.org/files/IEM.pdf): §1, printed p. 1 / PDF p. 4, introduction to quotation. Paraphrase matches the attribution and quoted-argument framing.

Date: Cover citation gives 2013 and separately says last modified September 13, 2013; year-only publication is appropriate. Announcement/commitment: Attributed intellectual credit, without priority or adoption inference. Earliest located: No earliest located role is claimed. Entity: The introductory attribution identifies the intended person.

### 82. ts-a4-agi-ruin-context — correct

Item 15 states the fast-gain possibility and simultaneous failure of previous invariants. Context status preserves the missing specified period.

- [evidence-ts-a4-agi-ruin-context](https://www.lesswrong.com/posts/uMQ3cqWDPHhjtiesc/agi-ruin-a-list-of-lethalities): §B.1, item 15, live post and posting-day capture. Quotation matches verbatim. Direct retrieval succeeded after web timeout. Capture SHA-256 5d3d9c1b0304c9299bf2f0452232ca572f83aa0da42225f88f8fb848bb7cde8c; its time is 53 minutes 2 seconds after the recorded posting time.

Date: The posting-day capture contains the recorded 2022-06-05T22:05:52 timestamp and the matching passage; the capture is dated 22:58:54. Announcement/commitment: An author's expectation is not a realised capability event. Earliest located: No earliest located role is assigned. Entity: The numbered item and post identify the intended text.

### 83. ap-k-eric-drexler-drexler-1986-engines-of-creation — correct

The web edition's copyright credit names the recorded author; its web-publication credit is separately named.

- [evidence-ap-k-eric-drexler-drexler-1986-engines-of-creation](https://web.archive.org/web/19970709104746/http://www.foresight.org:80/EOC/EOC_References.html): References section, copyright credit at its end. Name quotation matches verbatim in the direct archive retrieval; SHA-256 46562ba7c14db6a6687b0166587d6f20e47914877f5140aeda1e42af347b888f.

Date: Copyright line gives 1986; the inspected web witness is the 1997-07-09 capture, not a claim that this web page was published in 1986. Announcement/commitment: Authorship only. Earliest located: No earliest located role is claimed. Entity: Book/web-edition credit identifies the intended author.

### 84. ts-a6-sandberg-1998-contests — correct

The message questions the decisive-advantage premise and supplies the reasons described in the engagement note.

- [evidence-ts-a6-sandberg-1998-contests](http://extropians.weidai.com/extropians.2Q98/2544.html): Message paragraph beginning For example, in a world. Quotation matches verbatim, including the original grammar; surrounding unquoted text supports the recorded rationale.

Date: Sent header gives 23 Jun 1998 14:18:15 +0200, matching the sender-local publication day. Announcement/commitment: A contesting argument is not a claim about developer behaviour. Earliest located: not applicable. Entity: Reply header and unquoted paragraphs identify the intended sender and argument.

### 85. ap-ajay-agrawal-agrawal-gans-goldfarb-2016-simple-economics-of-machine-intelligence — correct

The captured byline credits the recorded person among three authors.

- [evidence-ap-ajay-agrawal-agrawal-gans-goldfarb-2016-simple-economics-of-machine-intelligence](https://web.archive.org/web/20161125124850/https://hbr.org/2016/11/the-simple-economics-of-machine-intelligence): Captured page head, byline. Name quotation matches verbatim. Direct archive retrieval SHA-256 dd6f0ef4bb18ad8db4bbcfe22cf3eb0c627994670e290e8c039f30ec1962a743.

Date: Captured page visibly gives November 17, 2016. Announcement/commitment: Authorship only. Earliest located: not applicable. Entity: Title and three-name byline identify the intended article.

### 86. yk-y01-sl4-2002-05-03-yudkowsky-0205-3551-c — material error

The resistance-to-modification passage is supported, but the final clause converts a limit on known methods into an unrestricted exclusivity assertion.

- [evidence-yk-t01-s3](http://sl4.org/archive/0205/3551.html): Message body, paragraph beginning It currently looks to me. The linked quotation is verbatim. The next paragraph says the CFAI semantics are the only way I know of, rather than the only way that would work. The generic hedge in the qualification does not preserve this specific knowledge limit.

Date: Message header gives Fri May 03 2002, 16:38:46 MDT. Announcement/commitment: The statement remains an attributed historical argument; its epistemic scope must also be preserved. Earliest located: not applicable. Entity: Header, reply link and unquoted message text identify the intended speaker and thread.

The statement says only the CFAI semantics would preserve the programmers' intended goals. The source limits that exclusivity to the methods the author knew of, so the recorded clause is stronger. Source passage: “the CFAI semantics are the only way I know of”. Proposed correction: Replace the final clause with 'and that the CFAI semantics were the only way he knew of to create an AI that would implement the goals as the programmers originally understood them'.

### 87. ap-eliezer-yudkowsky-lw-2008-above-average-ai-scientists — correct

The live publisher byline credits the recorded author.

- [evidence-ap-eliezer-yudkowsky-lw-2008-above-average-ai-scientists](https://www.lesswrong.com/posts/9HGR5qatMGoz4GhKj/above-average-ai-scientists): Post heading, date and visible byline. Name quotation matches verbatim; visible byline used instead of a separate GraphQL request.

Date: Visible date is 28 September 2008. Announcement/commitment: Authorship only. Earliest located: not applicable. Entity: Title and byline identify the intended post.

### 88. ap-eliezer-yudkowsky-extropians-1998-12-06-yudkowsky-2153 — correct

The archived message header supplies the credited sender name.

- [evidence-ap-eliezer-yudkowsky-extropians-1998-12-06-yudkowsky-2153](http://extropians.weidai.com/extropians.4Q98/2153.html): Message header, sender name. Name quotation matches verbatim; addresses were excluded from the report.

Date: Header gives Sun, 06 Dec 1998 12:13:25 -0600. Announcement/commitment: Sender credit is not extended into proof of external identity or ownership of quoted replies. Earliest located: not applicable. Entity: Subject and sender match the intended message.

### 89. yk-y30-staring-into-the-singularity-b — correct

The quoted sentence and following engineering-risk qualification support the restrained context classification rather than an assertion of a good default.

- [evidence-yk-t30-b](https://web.archive.org/web/20001204213100/http://sysopmind.com:80/singularity.html): Version 1.2.1, paragraph beginning Likewise. Quotation and following qualification match the capture; SHA-256 a2057d89c2402671fe8f61517f3ce0971ab5c70978677d21a72b5b1f26e623f4. This does not authenticate 1996 wording.

Date: Header says Created: 11/18/1996 and Updated: 08/31/2000; the record separately identifies its 2000-12-04 witness. Announcement/commitment: Historical view and its conditional risk are preserved. Earliest located: No earliest located role is asserted from the 1996 date. Entity: Version 1.2.1 heading identifies the intended expression.

### 90. ap-eliezer-yudkowsky-sl4-2004-12-29-yudkowsky-0412-10488 — correct

The message header credits the recorded sender.

- [evidence-ap-eliezer-yudkowsky-sl4-2004-12-29-yudkowsky-0412-10488](http://sl4.org/archive/0412/10488.html): Message header, sender name. Name quotation matches verbatim; no address reproduced.

Date: Header gives Wed Dec 29 2004, 16:27:43 MST. Announcement/commitment: Sender credit only; quotations from others remain separate. Earliest located: not applicable. Entity: Subject and sender identify the intended message.

### 91. ap-eliezer-yudkowsky-sl4-2000-09-17-yudkowsky-0009-0092 — correct

The message header credits the recorded sender.

- [evidence-ap-eliezer-yudkowsky-sl4-2000-09-17-yudkowsky-0009-0092](http://sl4.org/archive/0009/0092.html): Message header, sender name. Name quotation matches verbatim; no address reproduced.

Date: Header gives Sun Sep 17 2000, 10:19:16 MDT. Announcement/commitment: Sender credit only. Earliest located: not applicable. Entity: Subject and sender identify the intended message.

### 92. ap-eliezer-yudkowsky-lw-2008-fighting-a-rearguard-action-against-the — correct

The live post byline credits the recorded author.

- [evidence-ap-eliezer-yudkowsky-lw-2008-fighting-a-rearguard-action-against-the](https://www.lesswrong.com/posts/PCfaLLtuxes6Jk4S2/fighting-a-rearguard-action-against-the-truth): Post heading and visible byline. Name quotation matches verbatim; visible publisher byline used instead of querying GraphQL separately.

Date: Visible date is 24 September 2008. Announcement/commitment: Authorship only. Earliest located: not applicable. Entity: Title and byline identify the intended post.

### 93. ap-evan-hubinger-rlo-2019-deceptive-alignment — correct

The historical byline supplies the full name and five credited authors; the current alias difference is disclosed.

- [evidence-ap-evan-hubinger-rlo-2019-deceptive-alignment](https://web.archive.org/web/20190923160252/https://www.alignmentforum.org/posts/zthDPAjh9w6Ytbeks/deceptive-alignment): 2019-09-23 capture, byline below title. Name quotation matches verbatim in the direct capture. SHA-256 c1d2a819e971a39b73541bfa7eb272916cd5a306655d57f9cfc87858eed1c130.

Date: Both live and captured pages give 5 June 2019. Announcement/commitment: Co-authorship does not imply agreement with every passage. Earliest located: not applicable. Entity: The old byline resolves the current evhub display without relying on the username alone.

### 94. ap-joar-skalse-rlo-2019-introduction — correct

The visible byline includes the recorded person among five credited authors.

- [evidence-ap-joar-skalse-rlo-2019-introduction](https://www.alignmentforum.org/posts/FkgsxrGf3QxhfLWHG/risks-from-learned-optimization-introduction): Post heading and visible five-author byline. Name quotation matches verbatim; publisher's visible list supplies the credit without a separate GraphQL request.

Date: Visible page gives 31 May 2019. Announcement/commitment: Co-authorship only. Earliest located: not applicable. Entity: Byline and title identify the intended post.

### 95. ap-erik-brynjolfsson-bresnahan-brynjolfsson-hitt-1999-it-workplace-organization — correct

The scanned cover visibly credits the recorded author among three authors.

- [evidence-ap-erik-brynjolfsson-bresnahan-brynjolfsson-hitt-1999-it-workplace-organization](https://www.nber.org/system/files/working_papers/w7136/w7136.pdf): Rendered PDF cover, byline. The PDF text layer is empty on the cover, so it was rendered and visually inspected in memory. Name matches verbatim. Direct PDF SHA-256 9fb812b5d73898ed75b3fc03f073bba13cc65ca0f005f779d9e915b2634838bb.

Date: Rendered cover says May 1999. Announcement/commitment: Co-authorship only. Earliest located: not applicable. Entity: Cover title and byline identify the intended working paper.

### 96. ec-m06a-furman-seamans-2018-ai-and-the-economy-a — correct

The labour-market section states the possibility of worsening participation and inequality, preserving its modal scope.

- [evidence-ec-m06a-16](https://www.nber.org/system/files/working_papers/w24689/w24689.pdf): PDF p. 22 / printed p. 21, §4 opening sentence. Quotation matches verbatim. Direct PDF succeeded after web 403; SHA-256 b8a5fa326ed1a114552fa25b2040e90ee7dcc15ccbbc4ee27a0fba2f43b0ef63.

Date: Cover states June 2018; current-copy limitation remains visible. Announcement/commitment: A potential effect is not converted into a realised result. Earliest located: not applicable. Entity: Paper title and section identify the intended economic argument.

### 97. ts-a2-catai — correct

Both quoted segments describe self-enhancement; the attribution to a novel is kept as the page's own credit.

- [evidence-ts-a2-catai](https://web.archive.org/web/20010126204300/http://sysopmind.com:80/AI_design.temp.html): Paradigms §2 Seed AIs; Principles §1 Self-enhancement and domino enhancement. Both segments match verbatim in order, with an explicit editorial ellipsis. Capture SHA-256 0ec51ffb42b06999da9486875e59f1128e3863ba4ec219d1fc436cf0d2eba1e2. The two announcement messages were also retrieved directly.

Date: Messages 2209 and 2212 are dated 7 September 1998 and announce the text. The quoted wording is separately attested by the 2001-01-26 capture. Announcement/commitment: A proposed architecture is not an implemented system. Earliest located: No earliest located role is assigned to the original announcement date. Entity: Archived title, linked announcement and temporary-edition description identify the intended expression.

### 98. ap-eliezer-yudkowsky-extropians-1999-08-25-yudkowsky-2783 — correct

The message header supplies the credited sender name.

- [evidence-ap-eliezer-yudkowsky-extropians-1999-08-25-yudkowsky-2783](http://extropians.weidai.com/extropians.3Q99/2783.html): Message header, sender name. Name quotation matches verbatim; address omitted.

Date: Header gives Wed, 25 Aug 1999 18:18:21 -0500. Announcement/commitment: Sender credit only. Earliest located: not applicable. Entity: Subject and sender identify the intended message.

### 99. ap-eliezer-yudkowsky-extropians-1999-02-24-yudkowsky-2293 — correct

The message header supplies the credited sender name.

- [evidence-ap-eliezer-yudkowsky-extropians-1999-02-24-yudkowsky-2293](http://extropians.weidai.com/extropians.1Q99/2293.html): Message header, sender name. Name quotation matches verbatim; address omitted.

Date: Header gives Wed, 24 Feb 1999 19:53:08 -0600. Announcement/commitment: Sender credit only. Earliest located: not applicable. Entity: Subject and sender identify the intended message.

### 100. ap-joshua-s-gans-agrawal-gans-goldfarb-2019-economics-of-ai-introduction — correct

The cover's chapter-author field and chapter opening give the recorded author among three.

- [evidence-ap-joshua-s-gans-agrawal-gans-goldfarb-2019-economics-of-ai-introduction](https://www.nber.org/system/files/chapters/c14005/c14005.pdf): PDF p. 1, chapter-author field; p. 2, chapter byline. Name quotation matches verbatim in both places. Direct PDF succeeded after web 403; SHA-256 176dbcbd8a7e924d0f6d7506a9c04fb862a37a99ff3abe07670e7ba892a62839.

Date: Cover explicitly labels Publication Date: May 2019, distinct from Conference Date: September 13–14, 2017. Announcement/commitment: Co-authorship only. Earliest located: not applicable. Entity: Chapter title and author list identify the intended text.

### 101. ts-b5-bostrom-1996-09-03-context — correct

The message describes apparent decency and manipulation in deployment; it does not make the training-to-deployment claim excluded by the record.

- [evidence-ts-b5-bostrom-1996-09-03-context](http://extropians.weidai.com/extropians.96/0721.html): Message body, third substantive paragraph. Read the complete archived message. Both elided stretches preserve the surrounding argument; the quoted words match.

Date: The sent header gives 3 September 1996, 18:47:14 GMT; day precision and publication basis match. Announcement/commitment: Hypothetical machine behaviour, with no realised outcome asserted. Earliest located: No earliest located role. Entity: Nicholas Bostrom’s signature and the message context identify the cited author.

### 102. ap-eliezer-yudkowsky-sl4-2000-10-03-yudkowsky-0010-0125 — correct

The sender credit matches the archived header; the record keeps credited identity distinct from independent identity verification.

- [evidence-ap-eliezer-yudkowsky-sl4-2000-10-03-yudkowsky-0010-0125](http://sl4.org/archive/0010/0125.html): Message header, sender name. The credited name is verbatim in the header. No address reproduced.

Date: The archive header gives 3 October 2000, 22:53:59 MDT; publication-day precision matches. Announcement/commitment: Authorship credit only. Earliest located: No earliest located role. Entity: The header names Eliezer S. Yudkowsky; quoted correspondents are distinct.

### 103. ap-ajeya-cotra-cotra-2021-why-ai-alignment-could-be-hard — correct

The publisher’s byline credits Ajeya Cotra for this post.

- [evidence-ap-ajeya-cotra-cotra-2021-why-ai-alignment-could-be-hard](https://www.cold-takes.com/why-ai-alignment-could-be-hard-with-modern-deep-learning/): Page heading and author byline. The quoted name is verbatim in the visible byline.

Date: The page displays 21 September 2021; publication-day precision matches. Announcement/commitment: Authorship credit only. Earliest located: No earliest located role. Entity: Ajeya Cotra is the displayed author.

### 104. yk-y11-agi-ruin-2022-c — correct

Item 15 makes the stated capability-gain argument and develops the human-evolution analogy; the record does not claim that the prediction was realised.

- [evidence-yk-t11-e](https://www.lesswrong.com/posts/uMQ3cqWDPHhjtiesc/agi-ruin-a-list-of-lethalities): Section B.1, item 15. The quotation is verbatim; the surrounding item explains why multiple alignment assumptions might fail together. Reused the source inspection recorded for sample 82.

Date: 5 June 2022 is the posting date. The posting-day capture and current expression agree on the checked passage. Announcement/commitment: Forecast and analogy, not a completed event. Earliest located: Later restatement, not an earliest located role. Entity: The quoted item belongs to the cited Yudkowsky post and bears directly on the predecessor-system premise.

### 105. yk-y10-extropians-1998-09-18-yudkowsky-2487-c — correct

The complete reply both disowns the older scenario as a technical argument and states the positive-feedback reasoning retained in the claim.

- [evidence-yk-t10-e3](http://extropians.weidai.com/extropians.3Q98/2487.html): Paragraph beginning “The scenario above points out”. The quotation matches the author’s text; the opening concession and subsequent reasoning match the statement and qualification.

Date: The message header gives 18 September 1998, 15:51:51 -0500; publication-day precision matches. Announcement/commitment: A theoretical argument, not a realised capability. Earliest located: Later restatement, not an earliest located role. Entity: Yudkowsky’s own reply is distinguished from the quoted Hanson text.

### 106. lg-new-ito-sakana-cofounder — correct

The company page explicitly lists Ren Ito as co-founder in both its leadership entry and its About text.

- [lg-ev-new-ito-sakana-cofounder](https://sakana.ai/company-info/): Leadership, Ren Ito entry. The quoted leadership labels match after ordinary layout whitespace is joined.
- [lg-ev-new-ito-sakana-cofounder-b](https://sakana.ai/company-info/): About, company founding sentence. The founding sentence names David Ha, Ren Ito and Llion Jones; the quoted wording matches.

Date: The individual role date remains unknown. The company’s 2023 founding date is not converted into a dated personal appointment. Announcement/commitment: An institutional founder listing, not a new appointment announcement. Earliest located: No earliest located role. Entity: Ren Ito appears by name in both cited sections.

### 107. ts-a2-hanson-2008-core-argument-contests — correct

The live post and the later compilation both support the account of the scenario and Hanson’s objection to its growth rate.

- [evidence-ts-a2-hanson-2008-core-argument-contests](https://www.overcomingbias.com/2008/12/what-core-argument.html): Opening paragraph; MIRI compilation chapter 53, printed p. 397 (PDF page 408). The quoted fragments match with explicit elisions. The compilation’s date difference is independently confirmed.

Date: The live page displays 11 December 2008; chapter 53 of the compilation prints 10 December. Month precision and the unresolved-day note are appropriate. Announcement/commitment: A statement of an argument, not an observed takeover. Earliest located: No earliest located role. Entity: Hanson’s objection is kept distinct from the scenario attributed to Yudkowsky.

### 108. ng-brain-lead-2011-2012 — correct

Amazon’s appointment biography explicitly gives Ng’s Google Brain founding-lead role and the 2011–2012 interval.

- [evidence-ng-brain-lead-2011-2012](https://www.aboutamazon.com/news/company-news/dr-andrew-ng-joins-amazon-board-of-directors): Prior-experience bullet beginning “Founding Lead”. The paraphrase accurately conveys the role and both years.

Date: The two years are tenure endpoints in the prior-experience list; the 2024 publication is not treated as tenure. Announcement/commitment: The biography reports a prior role; it is not a current-role extrapolation. Earliest located: No earliest located role. Entity: The biography is for Andrew Ng and the bullet names Google Brain.

### 109. ec-m09-nilsson-1984-ai-employment-and-income-b — correct

Nilsson’s acknowledgement reports Solow’s conditional concession, and the body explicitly contrasts Simon’s and Leontief’s economic arguments.

- [evidence-ec-m09-05](https://ojs.aaai.org/aimagazine/index.php/aimagazine/article/download/433/369): PDF page 1, printed p. 5, acknowledgement footnote; body on printed pp. 7–8. The quotation matches the PDF text layer. The body names Simon and Leontief as taking opposing sides and explains both. Limit: Web reader returned 403; direct PDF retrieval succeeded. Current copy, not authenticated historical bytes.

Date: The issue is Summer 1984; year precision is supported and does not use a later retrieval date. Announcement/commitment: Reports correspondence and arguments, not verified future employment effects. Earliest located: No earliest located role. Entity: Nilsson is the SRI author; Solow’s view is reported by Nilsson rather than treated as a separately authored statement.

### 110. yk-y03-lw-2008-ghosts-in-the-machine-b — correct

The passage denies an interpreter outside the program. The record correctly treats this as context rather than an explicit claim that understanding intentions entails acting on them.

- [evidence-yk-t03-b](https://www.lesswrong.com/posts/cnYHFNBF3kZEyx24v/ghosts-in-the-machine): Paragraph beginning “There is no ghost who looks over the instructions”. Both sentences are verbatim after whitespace normalization; their surrounding paragraphs support the narrower contextual classification.

Date: The imported post displays 17 June 2008; publication-day precision matches. Announcement/commitment: A conceptual argument, not an implementation or compliance claim. Earliest located: No earliest located role. Entity: The quotation belongs to the cited Yudkowsky post.

### 111. ap-edwin-mansfield-mansfield-1966-technological-change — correct

The contribution’s title page explicitly credits Edwin Mansfield as its preparer.

- [evidence-ap-edwin-mansfield-mansfield-1966-technological-change](https://archive.org/download/ERIC_ED022857/ERIC_ED022857_djvu.txt): Contribution title page, “Prepared for the Commission by”; volume front matter. Direct retrieval of the archive’s OCR locates the exact name immediately after the contribution title and preparer label. The OCR hash matches the dataset’s recorded expression. Limit: The details reader failed and an initial direct download returned 502; a retry succeeded. Checked the OCR, not a page image. SHA-256 85b1fb59b997e8cbc0f7255076a55f68008955a2b10523b375ac0ae58628572c.

Date: The scanned volume’s front matter says February 1966, and the archive metadata agrees; month precision matches. Announcement/commitment: Authorship credit only. Earliest located: No earliest located role. Entity: The contribution title is followed by Edwin Mansfield, not merely a name mentioned elsewhere in the volume.

### 112. ts-a1-shulman-2009 — minor

The abstract and attribution are correct, but the exact publication day is not established by the conference interval.

- [evidence-ts-a1-shulman-2009](https://intelligence.org/files/ArmsControl.pdf): Abstract and cover citation line. The quotation is verbatim after joining PDF line breaks. The cover supplies a conference interval, not a day-specific publication date.

Date: The citation gives the conference as 2–4 July 2009; it does not establish publication or presentation specifically on 2 July. The served reprint is separately marked as containing minor changes. Announcement/commitment: Commentators’ projected transformation, not an observed event. Earliest located: No earliest located role. Entity: Carl Shulman is the credited author; the introductory argument is attributed to commentators.

The record turns the opening day of a conference interval into an exact publication day. Source passage: “Paper presented at the 7th European Conference on Computing and Philosophy (ECAP), Bellaterra, Spain, July 2–4.”. Proposed correction: Use 2009-07 at month precision with a note that the cited conference ran 2–4 July 2009; keep the undated modified reprint distinct from the conference expression.

### 113. ap-eliezer-yudkowsky-lw-2021-ngo-and-yudkowsky-on-alignment-difficulty — correct

The displayed author list credits both Eliezer Yudkowsky and Richard Ngo, matching the two-author credit.

- [evidence-ap-eliezer-yudkowsky-lw-2021-ngo-and-yudkowsky-on-alignment-difficulty](https://www.lesswrong.com/posts/7im8at9PmhbT4JHsW/ngo-and-yudkowsky-on-alignment-difficulty): Visible post byline, corresponding to the publisher’s author list. The credited name is verbatim. The second credited author is Richard Ngo. The visible byline was inspected rather than a separate API query.

Date: The page displays 15 November 2021; publication-day precision matches. Announcement/commitment: Co-authorship credit only. Earliest located: No earliest located role. Entity: The credited Eliezer Yudkowsky is one of the two named authors; no passage allocation is inferred.

### 114. ts-a5-cotra-2022 — correct

The final section explicitly connects AI-assisted R&D with accelerated change and greater decision pressure. The conditional need for unmistakable evidence remains qualified.

- [evidence-ts-a5-cotra-2022](https://www.lesswrong.com/posts/pRkFkzwKZ2zfa3R6H/without-specific-countermeasures-the-easiest-path-to): Final section, paragraph beginning “And as we get closer to transformative AI”. The words match the source. The excerpt stops before the subsequent qualification about possibly never generating that will; the record retains “may” and does not assert that the evidence will suffice.

Date: The page displays 18 July 2022; its embedded postedAt is 2022-07-18T19:06:14.670Z, agreeing with the recorded timestamp to the second. Announcement/commitment: A conditional scenario and deployment concern, not a realised event. Earliest located: The role is most-developed, explicitly an editorial judgement; it is not an earliest located claim. Entity: The post is credited to Ajeya Cotra; the Alex scenario is presented as hypothetical.

### 115. ap-alan-b-krueger-krueger-1991-computers-wage-structure — correct

The NBER working paper cover credits Alan B. Krueger.

- [evidence-ap-alan-b-krueger-krueger-1991-computers-wage-structure](https://www.nber.org/system/files/working_papers/w3858/w3858.pdf): PDF page 1, title and author; page 2, title and author. The name is verbatim on both inspected pages. Limit: Web reader returned 403; direct PDF retrieval succeeded.

Date: The cover says October 1991. A separate August acknowledgement date is not substituted for the publication month. Announcement/commitment: Authorship credit only. Earliest located: No earliest located role. Entity: The cover names Alan B. Krueger for this working paper.

### 116. ts-b3-drexler-1986-context — correct

The chapter note explicitly describes the possibility that a social AI could persuade people to give it additional information and ability.

- [evidence-ts-b3-drexler-1986-context](https://web.archive.org/web/19970709104746/http://www.foresight.org:80/EOC/EOC_References.html): Notes for chapter 5, note “… social AI …”. The paraphrase accurately condenses the discussion of a Turing-test passer plotting and persuading people; it adds no learned objective or training-stage imitation.

Date: The 1986 book year remains distinct from the 9 July 1997 capture in which the wording is attested. No comparison with the 1986 printing is claimed. Announcement/commitment: A hypothetical danger, not an observed event. Earliest located: No earliest located role. Entity: The passage is a Drexler chapter note in the Foresight web edition.

### 117. yk-y08-extropians-1999-01-06-yudkowsky-0160-c — material error

The quotation and date are correct, but the explicit contesting relation to advance warning, and therefore its earliest located role for Y08, are unsupported by this message.

- [evidence-yk-t08-e1](http://extropians.weidai.com/extropians.1Q99/0160.html): Complete message, especially closing paragraphs. The quotation is verbatim. The complete message supplies positive-feedback and speed arguments but does not explicitly address a recognisable warning before danger, weaker-system warning failures, or action on such a warning.

Date: The header gives 6 January 1999, 13:20:28 -0600; publication-day precision matches. Announcement/commitment: A prediction about superintelligent action, not an observed event. Earliest located: Unsupported as an earliest located contest of Y08: the message concerns action timescales after superintelligence, not an explicit claim about warnings before danger or effective response to warnings. Chronological precedence alone cannot supply the missing relation. Entity: The reply is Yudkowsky’s, with Sandberg’s quoted premises kept distinct.

The claim assigns an explicit contesting relation and an earliest located role to a passage that does not meet Y08’s warning criterion. The qualification itself acknowledges that the passage is not about warning signs or consensus as such. Source passage: “Likewise, the first SI timescale that isn't too slow to notice will be too fast to notice.”. Proposed correction: Retain the dated passage as context about the speed of superintelligent action; remove the explicit contests_proposition relation and the earliest-located role for Y08. Recheck the bounded Y08 candidate sequence before selecting any replacement headline.

### 118. ap-avi-goldfarb-agrawal-gans-goldfarb-2019-economics-of-ai-introduction — correct

The chapter credits Avi Goldfarb alongside Ajay Agrawal and Joshua Gans.

- [evidence-ap-avi-goldfarb-agrawal-gans-goldfarb-2019-economics-of-ai-introduction](https://www.nber.org/system/files/chapters/c14005/c14005.pdf): PDF title page, author list. The quoted name and three-author count match. Reused the same source inspection recorded for sample 100.

Date: The NBER chapter’s title page gives May 2019; publication-month precision matches. Announcement/commitment: Co-authorship credit only. Earliest located: No earliest located role. Entity: Avi Goldfarb is one of the three credited authors.

### 119. yk-y11-sl4-2000-10-03-yudkowsky-0010-0125-c — material error

The quoted opening expectation is accurate, but the record’s claim that the message gives no reason against gradual, visible capability gains conflicts with its later argument.

- [evidence-yk-t11-s1](http://sl4.org/archive/0010/0125.html): Opening paragraph and “Webmind’s awakening”, subsection on how fast it would wake up. The quotation is verbatim. Later in the same message, the author answers Goertzel’s observation/catch-up premise with independent self-improvement in accelerated subjective time and a transition from prehuman to transhuman capability.

Date: The header gives 3 October 2000, 22:53:59 MDT; publication-day precision matches. Announcement/commitment: A theoretical scenario, not a realised capability. Earliest located: No earliest located role is assigned to this record. Entity: The reply is Yudkowsky’s; the view it answers is quoted as Goertzel’s.

The contrary-only engagement label and its rationale overlook a reason supplied later in the same message, despite explicitly claiming to use a message-level rule. Source passage: “The AI can redesign itself radically in accelerated subjective time and walk out as a transhuman”. Proposed correction: Retain the quoted opening and the contesting relation, but change engagement.kind to engages-premise. Replace the no-engagement qualification with a located paraphrase of the later argument: independent self-improvement in accelerated subjective time could pass through the human-level stage before observation and catch-up would help. This records an argument, not its validity.

### 120. ts-a6-grace-2014-treacherous-turn — minor

The summary reports the attributed argument correctly, but the evidence string inserts a slash between separate bullets without marking it as an editorial separator.

- [evidence-ts-a6-grace-2014-treacherous-turn](https://www.lesswrong.com/posts/B39GNTsN3HocW8KFo/superintelligence-11-the-treacherous-turn): Summary, opening bullet and its opening sub-bullet. Both textual segments occur at the locator, but the slash joining them is absent from the source’s bullet layout.

Date: The page displays 25 November 2014; embedded postedAt is 2014-11-25T02:00:06.414Z, agreeing with the recorded timestamp to the second. Announcement/commitment: A reading-group summary of an argument, not an observed event. Earliest located: No earliest located role. Entity: Katja Grace is the summariser, and the argument is attributed to Bostrom’s book.

The quotation is not strictly verbatim because an unmarked slash has been inserted between two bullets. Source passage: “implies the AI is in a position to do what it wants”. Proposed correction: Quote the relevant sub-bullet alone, preserving its exact words, or represent the two source bullets as separate quoted blocks. Remove the unmarked slash; retain the attribution to the book summary.

## Targeted source-family follow-up

These checks are outside the random draw and do not enter its counts or intervals.

- rd-r10a-pinker-2018-popsci-fear-robots: The two quotations and the scoped attribution are supported in the passage on goals and design. No analogous training-absence qualification occurs in this record. The material finding remains specific to the sampled R06 qualification. [Paragraph on the primate circuit, designed AI and shmoos; date byline](https://www.popsci.com/robot-uprising-enlightenment-now/).
- yk-y24-sl4-2002-05-03-yudkowsky-0205-3551-a: The context record accurately distinguishes the source's proposed response to a project from a general claim about racing. Its paragraph is present in the full message; no unqualified exclusivity of goal-preserving methods is asserted here. [Paragraphs on propaganda and the reply on probability of a good outcome](http://sl4.org/archive/0205/3551.html).
- ap-eliezer-yudkowsky-sl4-2002-05-03-yudkowsky-0205-3551: Sender name and date are directly supported by the message header; no exclusivity assertion occurs. [Message header](http://sl4.org/archive/0205/3551.html).
- ap-eliezer-yudkowsky-extropians-1999-01-06-yudkowsky-0160: The same-source sender-credit claim matches the header. No additional Y08 role is attached to that authorship record. No replacement earliest located record was selected. [Complete message and its only other linked claim](http://extropians.weidai.com/extropians.1Q99/0160.html).
- yk-y04-sl4-2000-10-03-yudkowsky-0010-0125-c, yk-y05-sl4-2000-10-03-yudkowsky-0010-0125-c, yk-y16-sl4-2000-10-03-yudkowsky-0010-0125-c, yk-y18-sl4-2000-10-03-yudkowsky-0010-0125-c, yk-y19-sl4-2000-10-03-yudkowsky-0010-0125-c: The five additional quoted passages match the message, including marked elisions; their engagement labels do not repeat the contrary-only issue. This follow-up checks linked passages and the engagement issue only, not external historical qualifications. The authorship credit is already counted as sample 102; no extra item enters the random counts. [Complete message and five additional linked claim passages; sample 102 already covers its header credit](http://sl4.org/archive/0010/0125.html).

## Validation

Formatting checked on the two task-owned reports.

Focused historical review-generation suites passed: 16 tests in src/editorial/seed-review.test.ts and src/editorial/earliest-packet.test.ts. Initial sandbox run failed during SSR temporary-file access before any test; rerun outside the sandbox passed.

Privacy scan passed on all seven staged checkpoints through the completed independent sample (1,976 indexed files at completion). The comparison checkpoint runs it again. No annotated review pack was regenerated or overwritten.

Independent completion: all 120 fixed draws reproduced from the recorded seed and exact eligible pools; pools are disjoint, all exclusions hold, every linked evidence item has a recorded check, and every minor/material finding has a passage and proposed correction. Only the two task-owned reports differ from the baseline.

## Comparison

Independent checks were committed and pushed in `ae11fa81b1f87ce435968c8049b96c3581800ce9` before either earlier report was opened. The draw was committed in `29381de` with zero checked records. The blind verdicts and counts above are unchanged by this comparison.

The [earlier Claude-family audit](prelaunch-audit-2026-11-02.md) used baseline `4629608`; this sample uses `cae26ec`, after intervening corrections and maintainer decisions. Its random component checked 164 records, recorded 35 minor slips and 1 material error, and replaced 7 unreachable draws. It also conducted targeted page and interface audits. This sample retains its fixed 120 draws, excludes underRecheck records, and has 13 minor slips, 4 material errors and no unverifiable records. The strata, baselines, retrieval outcomes and severity schemes differ; these counts cannot rank the model families or establish a population error rate.

Only three claim IDs overlap the two random samples:

| Claim ID                       | Earlier sample | This sample | Comparison                                                                                                                                                                                                                                                                                |
| ------------------------------ | -------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| lineage-ii-weak-cites-critique | correct        | correct     | Agreement on the cited critique relation.                                                                                                                                                                                                                                                 |
| th-evo-koza-credits-holland    | correct        | correct     | Agreement on the attributed intellectual credit.                                                                                                                                                                                                                                          |
| lg-cn-tang-jie-zhipu-cofounder | correct        | minor       | Both support the co-founder designation. This check did not locate the ancillary KEG/GLM account in either cited copy. The earlier targeted PA-40 separately questioned the attribution of priority wording; the qualification has since been expanded, so the records are not unchanged. |

The findings agree in several kinds of failure. Earlier PA-02 identified an earliest located contesting role whose text addressed a different premise; sample 117 identifies that kind of criterion mismatch for Y08. Earlier PA-12 found a qualification contradicting its own evidence, and PA-13 found a dropped limit in a statement; samples 80 and 86 likewise show that accurate quoted words can sit beside an unsupported absence claim or an omitted knowledge limit. Earlier PA-03 and PA-47 distinguish publication, reprint and snapshot dates; this sample’s 66, 73 and 112 similarly require expression-specific dating or less precision. Earlier PA-37 and PA-38 concern locators and quotation notes; this sample also finds locator slips and adds strict quotation-fidelity issues involving punctuation, a hyphen and an unmarked separator. These are agreements in kind, not independent confirmations of the earlier records.

None of this sample’s four material-error IDs occurs in the earlier random sample or its finding record-ID lists. Sample 119 adds a message-level engagement problem: the opening excerpt states an expectation, but the complete message later supplies a reason against the premise. The earlier random sample’s material finding, `ht-w01-faggella-2023-worthy-successor`, was not drawn here. Its absence from this sample is not a contrary verdict.

The earlier audit’s navigation, headline rendering, omitted records and interface findings lie outside this dataset-only sample. Its unreachable-source outcomes remain historical observations; successful retrieval here does not retroactively resolve those particular draws. Neither audit certifies unsampled records, and the three overlapping IDs are too little common coverage for a general inter-family agreement claim.

The four material findings and proposed corrections remain for a separately authorised data/editorial task. No data, proposition roles, collection versions or interface code were changed here.
