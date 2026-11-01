| Scope           | Answered | Total |
| --------------- | -------: | ----: |
| Part A (blind)  |       90 |    90 |
| Part B (direct) |       97 |    97 |
| All items       |      187 |   187 |

# Key papers: independent cross-family check

Model: GPT-6 (Codex; exact build identifier unavailable). Date: 2026-10-30.

Branch: codex/key-papers-check. Base: origin/key-papers-pack at d90c35c.

Blind boundary: commit f588e84 contains all 90 Part A answers and zero Part B answers. It was pushed before any comparison file was read. All 187 independent answers were saved before opening cross-family-verdicts-2026-10-28.json and audit.md; the review note was read afterwards. pack.json and pack.md were not opened.

Independent source retrieval. Dates retain their kind and source precision. No arXiv record located is a bounded search result, not proof of absence. Printed-name agreement is not sufficient evidence to merge people. Only authorship and printed names are recorded; no affiliations, roles or contact information.

The input uses the headings How to answer and Priorities. Its item instructions and the user's additional rules governed this check.

Dates below retain the source's kind and precision, including raw Crossref date-parts. The maintainer's adopted admission rule uses year precision for Crossref-only venue dates; finer deposited fields are not independently established release days. Publisher/proceedings dates and presentation dates remain separate.

The requested scope is complete as 187 answered items. Source gaps remain explicitly qualified; this is not a claim that every venue, personal identity or historical edition has been resolved.

## Findings and coverage

- **Two byline omissions:** A084 adds the printed name Bo Wen to RoFormer v1; A087 adds Kamile Lukosuite to Constitutional AI v1. Both were independently transcribed before comparison and then visually confirmed on the original PDF pages. Neither finding authorizes merging a normalized index name.
- **One threshold qualification:** B081 has five literal name matches, but one is the LLaMA paper's own title/arXiv header. Four other listed documents cite it. Its five-citing-document basis is not established by this list. The other 33 threshold items have five other-document citations each.
- **Version-sensitive credits:** B010–B011 are absent from the inspected February 2015 copy captured in June 2018 and present in the copy labelled Revised October 2018 captured on 2019-05-11. October 2018 is a printed revision label; May 2019 is the earliest located positive capture inspected. This corroborates the audit's revision qualification. B015 remains wording from an undated MIRI reprint marked as changed.
- **Authorship wording:** B001–B002 omit Corrigibility coauthor Stuart Armstrong from their named author list, although the attributions themselves are supported.
- **Coverage:** 48 date questions; 27 printed-name groups; 15 complete bylines; all 26 credits; all 34 quotations, including the four priority claims; 37 count questions comprising 221 listed document–paper pairs at 62 requested citing-document addresses. Every listed pair has a citation/name check; 220 are from other documents.
- **Date additions:** documented venue/reprint additions include Nordhaus's 2021 journal article, Dropout's June 2014 journal publication, MathVista at ICLR 2024, Adam and the adversarial-example paper at ICLR 2015, GPT-3 at NeurIPS 2020, Grad-CAM at ICCV 2017, the translation paper at ICLR 2015, word2vec's ICLR 2013 workshop poster, MMLU-Pro at NeurIPS 2024, Self-Consistency at ICLR 2023, and AlexNet's separate 2017 CACM reprint. The item entries preserve the exact kinds and limits.

| Verdict          | Items |
| ---------------- | ----: |
| supported        |   167 |
| partly supported |    20 |
| not supported    |     0 |
| could not check  |     0 |

A verdict concerns the bounded question and copy inspected. A partly supported item contains verified facts plus a stated gap or qualification; it is not an unqualified rejection of the pack. No record is human-reviewed or admitted by this check.

## Retrieval failures and limits

OpenReview's GCN forum, API and final PDF returned verification/HTTP 403; A031 remains a venue gap. IEEE's article page required a robot check; A022 retains Crossref's year without inferring a publication month. A007 and A009 lack an inspected proceedings/publisher record despite author-source leads. No conference/journal version was located for A015, A028, A038, A042, A045 or A047; that is not proof that none exists.

Nature's direct article retrieval was blocked by its identity/client challenge. B029's complete relevant abstract was inspected through the official publisher search result. For B061 and B070, the AlphaFold references were checked in Europe PMC's full-text archive after verifying the same DOI; references 52 and 46 identify the exact works. Concordia's large PDF timed out initially and exceeded the web tool's rendering limit; a longer direct download and inspection of PDF p. 46 confirmed its GPQA reference. NBER's chapter-specific page returned 403 for A003; its working-paper page explicitly identifies the 2019 published chapter. MathVista's official proceedings PDF exceeded the web rendering limit; its indexed official proceedings extract supplied the conference-year evidence. The source-copy and fallback routes are recorded per item.

All required Wayback requests succeeded directly, sequentially with pacing. No browser fallback was needed. Good's 1965/1966 imprint conflict, Hanson's manuscript dating, an unprinted AI RMF version label and the May 2026 framework edition date remain qualified. Unversioned live copies do not establish when wording was added.

## Checks and checkpoint record

Checkpoints were committed and pushed at 20, 40, 60 and 80 items, with an additional blind-boundary commit at 90, then at 100, 120, 140, 160 and 180 items. The final checkpoint contains 187 items and the comparison. The 90-item blind snapshot is f588e84.

Validation: input/report IDs and kinds, per-item evidence/reasons, complete count-document coverage, JSON parsing and report coverage are checked mechanically. Task-owned formatting and git diff whitespace checks run before handoff; the repository privacy scanner runs against the staged reports before each commit. Focused editorial regression: src/editorial/seed-review.test.ts, 15 tests passed. No data, schema, application, pack, existing review work or code was edited; no PR is opened.

## Comparison

### Against the verdicts file

| Group               | Comparison                                                                                                                                                                                                                                                    |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| arXiv histories     | All 86 displayed submission dates across 25 items agree, version by version.                                                                                                                                                                                  |
| Printed-name groups | All 27 ordered lists of printed forms agree. This does not establish a unique person across papers.                                                                                                                                                           |
| Complete bylines    | 13 agree exactly; A084 and A087 have the omissions described above.                                                                                                                                                                                           |
| Quotations          | All 34 sampled passages and attributed statements are supported, allowing stated PDF layout normalization. The four priority claims remain the papers' own statements.                                                                                        |
| Credits             | The content attributions are supported with the recorded qualifications. B009 and B026 are explicitly labelled paraphrases, so the verdicts file's generic verbatim label is inapplicable.                                                                    |
| Counts              | All 221 literal citation/name matches are confirmed. B081 differs as a claim about five citing documents: only four are other-document citations.                                                                                                             |
| Publication dates   | Verified publication years are compatible with the corresponding coarse venue facts; the report adds publication kinds, venue versions and source precision. Dataset-specific draft/snapshot dates were not automatically accepted or exhaustively rechecked. |

A comparison object on every JSON item states its agreement, addition, disagreement or remaining limit. No preparer answer was used as independent evidence.

### Against audit.md

The source checks agree with removing index-only venue years, keeping SSRN separate from venue publication, preserving the 2012 AlexNet proceedings and 2017 reprint as distinct versions, attributing priority language, retaining genuine summaries/rebuttals as their stated kinds, and qualifying later-copy wording. Direct Wayback inspection corroborates the B010–B011 concern; the MIRI reprint warning corroborates B015. GCN's venue remains blocked as in the audit. Good's competing 1965/1966 dates remain unresolved rather than being silently harmonized.

The LLaMA header match and the two literal byline omissions survive the reported audit dispositions. They are additional issues for adjudication. Matching a printed name remains insufficient to resolve common-name identity or merge different printed forms; the audit's plausibility judgment is not an identifying source. A follow-up prompted by the audit's precision warning independently read Autor's published journal PDF: it says Summer 2015, whereas Crossref deposits 2015-08-01. The deposited day is retained only as metadata, not as an established release day; the pre-comparison answer remains recoverable in f588e84.

### Maintainer decisions and next step

The review note's appended 2026-10-28 decision adopts recommendations 1–10 and requires adjudication where this check changes their basis. Do not reopen those general decisions. Before a separately authorized admission task: adjudicate B081's self-document match; correct the two author-literal omissions without inferring person merges; include all four Corrigibility authors or use an appropriate shortened citation; preserve the later-copy dates and remaining source gaps. Every attributed summary was checked as a report of what the citing document says, not as proof of causal influence. No admission or decision field was changed.

## Item reports

The JSON contains the complete structured answers and a comparison for every item.

### A001 — dates

**supported** — The located work is a book; the publisher-linked Oxford listing dates the hardback to 2014-07-03.

Work: Superintelligence: Paths, Dangers, Strategies.

arXiv: not located.

- book publication: Oxford University Press; 2014-07-03 (day).

- [Oxford Martin School book listing](https://www.oxfordmartin.ox.ac.uk/publications/superintelligence-paths-dangers-strategies) — live page retrieved 2026-10-30; Date and hardback ISBN listing

Limits: The book date is not a conference/journal date. The search does not establish that no other edition or arXiv record exists.

Comparison — adds or refines sourced dates: No venue fact in the answer file is contradicted; this report adds only the explicitly sourced publication or presentation facts it located. Dataset-specific draft/snapshot dates are outside the verified venue comparison.

### A002 — dates

**supported** — The linked technical paper was released with the dated GPT-2 announcement.

Work: Language Models are Unsupervised Multitask Learners.

arXiv: not located.

- technical paper release: OpenAI; 2019-02-14 (day).

- [https://openai.com/index/better-language-models/](https://openai.com/index/better-language-models/) — live page retrieved 2026-10-30; Announcement date and linked technical paper
- [https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf](https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf) — live page retrieved 2026-10-30; Title, PDF p. 1

Limits: No arXiv record located in the title search; this does not prove absence.

Comparison — adds or refines sourced dates: No venue fact in the answer file is contradicted; this report adds only the explicitly sourced publication or presentation facts it located. Dataset-specific draft/snapshot dates are outside the verified venue comparison.

### A003 — dates

**supported** — NBER distinguishes the October 2017 working paper from the 2019 edited-volume publication.

Work: Artificial Intelligence and Economic Growth.

arXiv: not located.

- working paper: NBER Working Paper 23928; 2017-10 (month).
- book chapter: The Economics of Artificial Intelligence: An Agenda; 2019 (year).

- [https://www.nber.org/papers/w23928](https://www.nber.org/papers/w23928) — live page retrieved 2026-10-30; Issue Date; Published Versions

Limits: No arXiv record located in the title search; this does not prove absence. The chapter-specific NBER address /chapters/c14015 returned HTTP 403; the working-paper record explicitly identifies its published version.

Comparison — adds or refines sourced dates: No venue fact in the answer file is contradicted; this report adds only the explicitly sourced publication or presentation facts it located. Dataset-specific draft/snapshot dates are outside the verified venue comparison.

### A004 — dates

**supported** — Oxford dates the chapter to 2008-07-03; it is a book chapter, not a journal article.

Work: Artificial Intelligence as a Positive and Negative Factor in Global Risk.

arXiv: not located.

- book chapter publication: Global Catastrophic Risks, pp. 308–345; 2008-07-03 (day).

- [https://academic.oup.com/book/40615/chapter-abstract/348239228?login=false](https://academic.oup.com/book/40615/chapter-abstract/348239228?login=false) — live page retrieved 2026-10-30; Chapter heading, pages and Published date

Limits: No arXiv record located in the title search; this does not prove absence.

Comparison — adds or refines sourced dates: The independently checked publication facts preserve compatible venue years while distinguishing source precision and date kind. Dataset-specific draft/snapshot dates are outside the verified venue comparison.

### A005 — dates

**supported** — The paper is linked from a dated research release; no conference/journal publication was located.

Work: Improving Language Understanding by Generative Pre-Training.

arXiv: not located.

- technical paper release: OpenAI; 2018-06-11 (day).

- [https://openai.com/index/language-unsupervised/](https://openai.com/index/language-unsupervised/) — live page retrieved 2026-10-30; Dated release and paper link

Limits: No arXiv record located in the title search; this does not prove absence.

Comparison — adds or refines sourced dates: No venue fact in the answer file is contradicted; this report adds only the explicitly sourced publication or presentation facts it located. Dataset-specific draft/snapshot dates are outside the verified venue comparison.

### A006 — dates

**supported** — Crossref identifies a NIST report published online on 2023-01-26; it is not a conference or journal article.

Work: Artificial Intelligence Risk Management Framework (AI RMF 1.0).

arXiv: not located.

- report online publication: NIST AI 100-1; 2023-01-26 (day).

- [https://api.crossref.org/works/10.6028%2Fnist.ai.100-1](https://api.crossref.org/works/10.6028%2Fnist.ai.100-1) — retrieved 2026-10-30; message.type and published-online.date-parts

Limits: No arXiv record located; absence is not established.

Comparison — adds or refines sourced dates: The independently checked publication facts preserve compatible venue years while distinguishing source precision and date kind. Dataset-specific draft/snapshot dates are outside the verified venue comparison.

### A007 — dates

**partly supported** — The author's page identifies the AGI proceedings and a February 2008 publication, separately from the 2007 post date and 2008 revision.

Work: The Basic AI Drives.

arXiv: not located.

- conference proceedings publication (author-reported): Artificial General Intelligence 2008; Frontiers in Artificial Intelligence and Applications 171; 2008-02 (month).
- author page date: ; 2007-11-30 (day).
- manuscript revision: ; 2008-01-25 (day).

- [https://selfawaresystems.com/2007/11/30/paper-on-the-basic-ai-drives/](https://selfawaresystems.com/2007/11/30/paper-on-the-basic-ai-drives/) — retrieved 2026-10-30; Opening publication note

Limits: The author reports the proceedings date; the proceedings publisher's own record has not yet been inspected. The page's 2007 date cannot date later-added wording. No arXiv record located.

Comparison — compatible facts; scope unresolved: No venue fact in the answer file is contradicted; this report adds only the explicitly sourced publication or presentation facts it located. The item limitations remain; an unlocated venue is not a verified absence.

### A008 — dates

**supported** — The journal PDF labels the issue Summer 2015; Crossref separately deposits 2015-08-01, which is not verified as a release day.

Work: Why Are There Still So Many Jobs? The History and Future of Workplace Automation.

arXiv: not located.

- Crossref deposited print-date field: Journal of Economic Perspectives, volume 29, issue 3, pp. 3–30; 2015-08-01 (day). The deposited day is not an independently established publication day.
- journal issue publication: Journal of Economic Perspectives, volume 29, issue 3, pp. 3–30; 2015 (year). The printed journal identifies a season, not an exact month or day.

- [https://api.crossref.org/works/10.1257%2Fjep.29.3.3](https://api.crossref.org/works/10.1257%2Fjep.29.3.3) — retrieved 2026-10-30; message.published-print.date-parts and bibliographic fields
- [https://economics.mit.edu/sites/default/files/inline-files/Why%20Are%20there%20Still%20So%20Many%20Jobs_0.pdf](https://economics.mit.edu/sites/default/files/inline-files/Why%20Are%20there%20Still%20So%20Many%20Jobs_0.pdf) — Published journal PDF, author-hosted copy retrieved 2026-10-30; PDF p. 1, journal issue header

Limits: No arXiv record located; absence is not established.

Follow-up after the blind checkpoint: After the audit precision warning was read, the published journal PDF was independently retrieved. The original Crossref-only answer is preserved in blind commit f588e84.

Comparison — adds or refines sourced dates: The pack year 2015 agrees. The published PDF says Summer 2015; raw Crossref 2015-08-01 must not be promoted to an established release day. This qualification was added by the documented post-blind follow-up.

### A009 — dates

**partly supported** — The author's hosted PDF confirms the work, but the publication year has not yet been verified against proceedings or Crossref.

Work: Algorithms for Inverse Reinforcement Learning.

arXiv: not located.

Venue candidate only: Proceedings of the 17th International Conference on Machine Learning 2000.

- [https://ai.stanford.edu/~ang/papers/icml00-irl.pdf](https://ai.stanford.edu/~ang/papers/icml00-irl.pdf) — retrieved 2026-10-30; PDF title and text

Limits: Discovery indexes identify ICML 2000; one ML Anthology record attaches an unrelated veterinary DOI, so it is not admitted as venue evidence.

Comparison — compatible facts; scope unresolved: No venue fact in the answer file is contradicted; this report adds only the explicitly sourced publication or presentation facts it located. The item limitations remain; an unlocated venue is not a verified absence.

### A010 — dates

**supported** — The 2015 working paper has a located January 2021 journal publication.

Work: Are We Approaching an Economic Singularity? Information Technology and the Future of Economic Growth.

arXiv: not located.

- working paper issue: NBER Working Paper 21547; 2015-09 (month).
- journal issue publication: American Economic Journal: Macroeconomics, volume 13, issue 1, pp. 299–332; 2021-01 (month).

- [https://www.nber.org/papers/w21547](https://www.nber.org/papers/w21547) — retrieved 2026-10-30; Issue Date; Published Versions
- [https://pubs.aeaweb.org/doi/10.1257/mac.20170105](https://pubs.aeaweb.org/doi/10.1257/mac.20170105) — retrieved 2026-10-30; Journal issue heading

Limits: No arXiv record located; absence is not established.

Comparison — adds or refines sourced dates: No venue fact in the answer file is contradicted; this report adds only the explicitly sourced publication or presentation facts it located. Dataset-specific draft/snapshot dates are outside the verified venue comparison.

### A011 — dates

**supported** — The original NIPS 2012 proceedings and a later CACM publication are separately verified.

Work: ImageNet classification with deep convolutional neural networks.

arXiv: not located.

- conference proceedings publication: Advances in Neural Information Processing Systems, volume 25; 2012 (year).
- journal online publication: Communications of the ACM, volume 60, issue 6; 2017-05-24 (day).
- journal issue: Communications of the ACM, volume 60, issue 6; 2017-06 (month).

- [https://proceedings.neurips.cc/paper/2012/hash/c399862d3b9d6b76c8436e924a68c45b-Abstract.html](https://proceedings.neurips.cc/paper/2012/hash/c399862d3b9d6b76c8436e924a68c45b-Abstract.html) — retrieved 2026-10-30; Proceedings heading
- [https://doi.org/10.1145/3065386](https://doi.org/10.1145/3065386) — live publisher record retrieved 2026-10-30; Publication History and Published In
- [https://api.crossref.org/works/10.1145%2F3065386](https://api.crossref.org/works/10.1145%2F3065386) — Crossref retrieved 2026-10-30; published-online.date-parts

Limits: No arXiv record located; no claim of exhaustive publication coverage.

Comparison — adds or refines sourced dates: The independently checked publication facts preserve compatible venue years while distinguishing source precision and date kind. Dataset-specific draft/snapshot dates are outside the verified venue comparison.

### A012 — dates

**supported** — The journal PDF specifies Published 7/2019, more precisely than the Anthology's year-only page.

Work: Natural Questions: A Benchmark for Question Answering Research.

arXiv: not located.

- journal publication: Transactions of the Association for Computational Linguistics, volume 7, pp. 453–466 (PDF; Anthology lists 452–466); 2019-07 (month).

- [https://aclanthology.org/Q19-1026.pdf](https://aclanthology.org/Q19-1026.pdf) — retrieved 2026-10-30; PDF p. 1 / printed p. 453, publication footer
- [https://aclanthology.org/Q19-1026/](https://aclanthology.org/Q19-1026/) — retrieved 2026-10-30; Volume, year and page range

Limits: No arXiv record located; absence is not established.

Comparison — adds or refines sourced dates: The independently checked publication facts preserve compatible venue years while distinguishing source precision and date kind. Dataset-specific draft/snapshot dates are outside the verified venue comparison.

### A013 — dates

**supported** — The DOI metadata identifies June 2020 journal publication, not a 2019 issue.

Work: Robots and Jobs: Evidence from US Labor Markets.

arXiv: not located.

- journal print publication: Journal of Political Economy, volume 128, issue 6, pp. 2188–2244; 2020-06 (month).

- [https://api.crossref.org/works/10.1086%2F705716](https://api.crossref.org/works/10.1086%2F705716) — retrieved 2026-10-30; message.published-print.date-parts and bibliographic fields

Limits: No arXiv record located; absence is not established.

Comparison — adds or refines sourced dates: The independently checked publication facts preserve compatible venue years while distinguishing source precision and date kind. Dataset-specific draft/snapshot dates are outside the verified venue comparison.

### A014 — dates

**supported** — NBER explicitly links the earlier title to the 2018 AER publication.

Work: The Race Between Machine and Man: Implications of Technology for Growth, Factor Shares and Employment.

arXiv: not located.

- working paper issue: NBER Working Paper 22252; 2016-05 (month).
- working paper revision: NBER Working Paper 22252; 2017-06 (month).
- Crossref deposited print-date field: American Economic Review, volume 108, issue 6, pp. 1488–1542; 2018-06-01 (day). Use year precision under the adopted Crossref-only admission rule; this day is not independently established.

- [https://www.nber.org/papers/w22252](https://www.nber.org/papers/w22252) — retrieved 2026-10-30; Issue Date, Revision Date, Published Versions
- [https://api.crossref.org/works/10.1257%2Faer.20160696](https://api.crossref.org/works/10.1257%2Faer.20160696) — retrieved 2026-10-30; message.published-print.date-parts

Limits: No arXiv record located; absence is not established.

Comparison — adds or refines sourced dates: No venue fact in the answer file is contradicted; this report adds only the explicitly sourced publication or presentation facts it located. Dataset-specific draft/snapshot dates are outside the verified venue comparison.

### A015 — dates

**partly supported** — The author-hosted manuscript is undated on its title page; the author's bibliography assigns it 1998, without a located journal/proceedings publication.

Work: Economic Growth Given Machine Intelligence.

arXiv: not located.

- author bibliography year: Unspecified manuscript; not a verified journal/proceedings publication; 1998 (year).

- [https://hanson.gmu.edu/aigrow.pdf](https://hanson.gmu.edu/aigrow.pdf) — retrieved 2026-10-30; PDF p. 1
- [https://mason.gmu.edu/~rhanson/vita.html](https://mason.gmu.edu/~rhanson/vita.html) — retrieved 2026-10-30; Economic Growth Given Machine Intelligence entry

Limits: Frequently indexed as 2001, but no journal/proceedings source was located. Do not assign a JAIR publication from the manuscript's typesetting. The 1998 bibliography date does not date the current PDF version. No arXiv record located.

Comparison — compatible facts; scope unresolved: The answer file has no date entries. The author bibliography supplies 1998, while the review table uses 2000; the undated current manuscript does not resolve the edition date. No journal publication is established.

### A016 — dates

**supported** — Crossref separates online publication on 2015-02-25 from the 2015-02-26 print issue.

Work: Human-level control through deep reinforcement learning.

arXiv: not located.

- journal online publication: Nature, volume 518, issue 7540, pp. 529–533; 2015-02-25 (day).
- journal print publication: Nature, volume 518, issue 7540, pp. 529–533; 2015-02-26 (day).

- [https://api.crossref.org/works/10.1038%2Fnature14236](https://api.crossref.org/works/10.1038%2Fnature14236) — retrieved 2026-10-30; message.published-online and published-print

Limits: No arXiv version of this exact Nature article located; the related Playing Atari with Deep Reinforcement Learning paper must not be substituted.

Comparison — adds or refines sourced dates: The independently checked publication facts preserve compatible venue years while distinguishing source precision and date kind. Dataset-specific draft/snapshot dates are outside the verified venue comparison.

### A017 — dates

**supported** — Crossref separates online publication on 2016-01-27 from the 2016-01-28 print issue.

Work: Mastering the game of Go with deep neural networks and tree search.

arXiv: not located.

- journal online publication: Nature, volume 529, issue 7587, pp. 484–489; 2016-01-27 (day).
- journal print publication: Nature, volume 529, issue 7587, pp. 484–489; 2016-01-28 (day).

- [https://api.crossref.org/works/10.1038%2Fnature16961](https://api.crossref.org/works/10.1038%2Fnature16961) — retrieved 2026-10-30; message.published-online and published-print

Limits: No arXiv record located; absence is not established.

Comparison — adds or refines sourced dates: The independently checked publication facts preserve compatible venue years while distinguishing source precision and date kind. Dataset-specific draft/snapshot dates are outside the verified venue comparison.

### A018 — dates

**partly supported** — The current publisher page and Crossref give 1966; the widely used 1965 year remains a source conflict requiring the original volume's imprint.

Work: Speculations Concerning the First Ultraintelligent Machine.

arXiv: not located.

- book chapter publication (current publisher metadata): Advances in Computers, volume 6, pp. 31–88; 1966 (year).

- [https://api.crossref.org/works/10.1016%2Fs0065-2458(08)60418-0](<https://api.crossref.org/works/10.1016%2Fs0065-2458(08)60418-0>) — retrieved 2026-10-30; message.published-print
- [https://www.sciencedirect.com/science/article/pii/S0065245808604180?via=ihub](https://www.sciencedirect.com/science/article/pii/S0065245808604180?via=ihub) — retrieved 2026-10-30; Volume and Date

Limits: 1965 occurs in discovery records; neither the current publisher's 1966 metadata nor secondary repetition alone resolves the original imprint year. Original volume front matter not inspected. No arXiv record located.

Comparison — compatible facts; scope unresolved: Both accounts retain the 1965/1966 source conflict: the answer file gives a dataset-source 1965 date and Crossref 1966; this check verifies the current publisher/Crossref 1966 metadata without resolving the original imprint.

### A019 — dates

**partly supported** — Crossref supplies the January 2017 journal issue; the DOI's 2016 string is not itself a publication date.

Work: The Future of Employment: How Susceptible Are Jobs to Computerisation?.

arXiv: not located.

- journal print publication: Technological Forecasting and Social Change, volume 114, pp. 254–280; 2017-01 (month).

- [https://api.crossref.org/works/10.1016%2Fj.techfore.2016.08.019](https://api.crossref.org/works/10.1016%2Fj.techfore.2016.08.019) — retrieved 2026-10-30; message.published-print and bibliographic fields

Limits: Crossref did not expose an online-publication date. The publisher's online history and earlier working-paper dates remain unverified. No arXiv record located.

Comparison — compatible facts; scope unresolved: The independently checked publication facts preserve compatible venue years while distinguishing source precision and date kind. The item limitations remain; an unlocated venue is not a verified absence.

### A020 — dates

**supported** — Crossref supplies the 2018 AER publication; NBER identifies the earlier title and working-paper chronology.

Work: The Race between Man and Machine: Implications of Technology for Growth, Factor Shares, and Employment.

arXiv: not located.

- Crossref deposited print-date field: American Economic Review, volume 108, issue 6, pp. 1488–1542; 2018-06-01 (day). Use year precision under the adopted Crossref-only admission rule; this day is not independently established.
- working paper issue: NBER Working Paper 22252; 2016-05 (month).
- working paper revision: NBER Working Paper 22252; 2017-06 (month).

- [https://api.crossref.org/works/10.1257%2Faer.20160696](https://api.crossref.org/works/10.1257%2Faer.20160696) — retrieved 2026-10-30; message.published-print
- [https://www.nber.org/papers/w22252](https://www.nber.org/papers/w22252) — retrieved 2026-10-30; Earlier title, dates and Published Versions

Limits: No arXiv record located; absence is not established.

Comparison — adds or refines sourced dates: The independently checked publication facts preserve compatible venue years while distinguishing source precision and date kind. Dataset-specific draft/snapshot dates are outside the verified venue comparison.

### A021 — dates

**supported** — Crossref gives October 2001 for Machine Learning 45(1), pages 5–32.

Work: Random Forests.

arXiv: not located.

- journal print publication: Machine Learning, volume 45, issue 1, pp. 5–32; 2001-10 (month).

- [https://api.crossref.org/works/10.1023%2Fa%3A1010933404324](https://api.crossref.org/works/10.1023%2Fa%3A1010933404324) — retrieved 2026-10-30; message.published-print
- [https://link.springer.com/article/10.1023/A:1010933404324](https://link.springer.com/article/10.1023/A:1010933404324) — retrieved 2026-10-30; Publisher article record

Limits: No arXiv record located; absence is not established.

Comparison — adds or refines sourced dates: The independently checked publication facts preserve compatible venue years while distinguishing source precision and date kind. Dataset-specific draft/snapshot dates are outside the verified venue comparison.

### A022 — dates

**partly supported** — Crossref confirms Proceedings of the IEEE 86(11), 2278–2324, 1998; the publisher page was blocked by a robot check.

Work: Gradient-based learning applied to document recognition.

arXiv: not located.

- journal print publication (Crossref): Proceedings of the IEEE, volume 86, issue 11, pp. 2278–2324; 1998 (year).

- [https://api.crossref.org/works/10.1109%2F5.726791](https://api.crossref.org/works/10.1109%2F5.726791) — retrieved 2026-10-30; message.published-print and issue metadata

Limits: No arXiv record located; absence is not established.

Retrieval failures: https://ieeexplore.ieee.org/document/726791: JavaScript robot verification; publication month not inspected.

Comparison — compatible facts; scope unresolved: The independently checked publication facts preserve compatible venue years while distinguishing source precision and date kind. The item limitations remain; an unlocated venue is not a verified absence.

### A023 — dates

**supported** — The JMLR PDF explicitly marks publication in June 2014.

Work: Dropout: a simple way to prevent neural networks from overfitting.

arXiv: not located.

- journal publication: Journal of Machine Learning Research, volume 15, pp. 1929–1958; 2014-06 (month).

- [https://jmlr.org/papers/volume15/srivastava14a/srivastava14a.pdf](https://jmlr.org/papers/volume15/srivastava14a/srivastava14a.pdf) — retrieved 2026-10-30; PDF p. 1, Published 6/14
- [https://jmlr.org/papers/v15/srivastava14a.html](https://jmlr.org/papers/v15/srivastava14a.html) — retrieved 2026-10-30; Journal citation

Limits: No arXiv version of this exact journal paper located. The earlier Improving neural networks by preventing co-adaptation of feature detectors is not silently substituted.

Comparison — adds or refines sourced dates: No venue fact in the answer file is contradicted; this report adds only the explicitly sourced publication or presentation facts it located. Dataset-specific draft/snapshot dates are outside the verified venue comparison.

### A024 — dates

**supported** — arXiv submission history and the separately identified venue chronology were checked independently.

arXiv submissions (day precision): v1 2023-10-03; v2 2023-10-25; v3 2024-01-21.

- conference proceedings publication: ICLR 2024; 2024 (year).

- [https://arxiv.org/abs/2310.02255](https://arxiv.org/abs/2310.02255) — retrieved 2026-10-30; Submission history (all displayed versions)
- [https://proceedings.iclr.cc/paper_files/paper/2024/file/663bce02a0050c4a11f1eb8a7f1429d3-Paper-Conference.pdf](https://proceedings.iclr.cc/paper_files/paper/2024/file/663bce02a0050c4a11f1eb8a7f1429d3-Paper-Conference.pdf) — retrieved 2026-10-30; Title page: Published as a conference paper at ICLR 2024

Limits: Search-indexed official proceedings PDF inspected; direct web rendering rejected its 15,862,101-byte size.

Comparison — adds or refines sourced dates: All 3 listed arXiv dates agree. No venue fact in the answer file is contradicted; this report adds only the explicitly sourced publication or presentation facts it located. Dataset-specific draft/snapshot dates are outside the verified venue comparison.

### A025 — dates

**supported** — arXiv submission history and the separately identified venue chronology were checked independently.

arXiv submissions (day precision): v1 2018-10-11; v2 2019-05-24.

- conference proceedings publication: NAACL-HLT 2019, Volume 1 (Long and Short Papers), pp. 4171–4186; 2019-06 (month).

- [https://arxiv.org/abs/1810.04805](https://arxiv.org/abs/1810.04805) — retrieved 2026-10-30; Submission history (all displayed versions)
- [https://aclanthology.org/N19-1423/](https://aclanthology.org/N19-1423/) — retrieved 2026-10-30; Volume, month, year

Comparison — adds or refines sourced dates: All 2 listed arXiv dates agree. The independently checked publication facts preserve compatible venue years while distinguishing source precision and date kind. Dataset-specific draft/snapshot dates are outside the verified venue comparison.

### A026 — dates

**supported** — arXiv submission history and the separately identified venue chronology were checked independently.

arXiv submissions (day precision): v1 2017-05-09; v2 2017-05-13.

- conference proceedings publication: ACL 2017, Volume 1: Long Papers, pp. 1601–1611; 2017-07 (month).

- [https://arxiv.org/abs/1705.03551](https://arxiv.org/abs/1705.03551) — retrieved 2026-10-30; Submission history (all displayed versions)
- [https://aclanthology.org/P17-1147/](https://aclanthology.org/P17-1147/) — retrieved 2026-10-30; Volume, month, year

Comparison — adds or refines sourced dates: All 2 listed arXiv dates agree. The independently checked publication facts preserve compatible venue years while distinguishing source precision and date kind. Dataset-specific draft/snapshot dates are outside the verified venue comparison.

### A027 — dates

**supported** — arXiv submission history and the separately identified venue chronology were checked independently.

arXiv submissions (day precision): v1 2019-11-26.

- conference proceedings online publication: Proceedings of the AAAI Conference on Artificial Intelligence, volume 34, issue 05, pp. 7432–7439; 2020-04-03 (day).

- [https://arxiv.org/abs/1911.11641](https://arxiv.org/abs/1911.11641) — retrieved 2026-10-30; Submission history (all displayed versions)
- [https://api.crossref.org/works/10.1609%2Faaai.v34i05.6239](https://api.crossref.org/works/10.1609%2Faaai.v34i05.6239) — retrieved 2026-10-30; published-online and bibliographic fields

Comparison — adds or refines sourced dates: All 1 listed arXiv dates agree. The independently checked publication facts preserve compatible venue years while distinguishing source precision and date kind. Dataset-specific draft/snapshot dates are outside the verified venue comparison.

### A028 — dates

**partly supported** — arXiv submission history is verified; no venue publication is asserted without the required source.

arXiv submissions (day precision): v1 2021-10-27; v2 2021-11-18.

- [https://arxiv.org/abs/2110.14168](https://arxiv.org/abs/2110.14168) — retrieved 2026-10-30; Submission history (all displayed versions)

Limits: No conference or journal version located in the targeted title search; the arXiv preprint is verified.

Comparison — compatible facts; scope unresolved: All 2 listed arXiv dates agree. No venue fact in the answer file is contradicted; this report adds only the explicitly sourced publication or presentation facts it located. The item limitations remain; an unlocated venue is not a verified absence.

### A029 — dates

**supported** — The official ICLR 2015 program lists Adam; all nine displayed arXiv submission dates are separately recorded.

arXiv submissions (day precision): v1 2014-12-22; v2 2015-01-17; v3 2015-02-27; v4 2015-03-03; v5 2015-04-23; v6 2015-06-23; v7 2015-07-20; v8 2015-07-23; v9 2017-01-30.

- conference presentation / official program: ICLR 2015; 2015 (year).

- [https://arxiv.org/abs/1412.6980](https://arxiv.org/abs/1412.6980) — retrieved 2026-10-30; Submission history (all displayed versions)
- [https://blog.iclr.cc/2025/04/14/announcing-the-test-of-time-award-winners-from-iclr-2015/](https://blog.iclr.cc/2025/04/14/announcing-the-test-of-time-award-winners-from-iclr-2015/) — retrieved 2026-10-30; Organizer identifies papers published at ICLR 2015; Adam title
- [https://iclr.cc/archive/www/2015.html](https://iclr.cc/archive/www/2015.html) — retrieved 2026-10-30; Conference poster program, Adam title entry

Comparison — adds or refines sourced dates: All 9 listed arXiv dates agree. No venue fact in the answer file is contradicted; this report adds only the explicitly sourced publication or presentation facts it located. Dataset-specific draft/snapshot dates are outside the verified venue comparison.

### A030 — dates

**supported** — arXiv submission history and the separately identified venue chronology were checked independently.

arXiv submissions (day precision): v1 2020-05-28; v2 2020-06-01; v3 2020-06-05; v4 2020-07-22.

- conference proceedings publication: Advances in Neural Information Processing Systems, volume 33; 2020 (year).

- [https://arxiv.org/abs/2005.14165](https://arxiv.org/abs/2005.14165) — retrieved 2026-10-30; Submission history (all displayed versions)
- [https://proceedings.neurips.cc/paper_files/paper/2020/hash/1457c0d6bfcb4967418bfb8ac142f64a-Abstract.html](https://proceedings.neurips.cc/paper_files/paper/2020/hash/1457c0d6bfcb4967418bfb8ac142f64a-Abstract.html) — retrieved 2026-10-30; Proceedings heading

Comparison — adds or refines sourced dates: All 4 listed arXiv dates agree. No venue fact in the answer file is contradicted; this report adds only the explicitly sourced publication or presentation facts it located. Dataset-specific draft/snapshot dates are outside the verified venue comparison.

### A031 — dates

**partly supported** — arXiv submission history is verified; no venue publication is asserted without the required source.

arXiv submissions (day precision): v1 2016-09-09; v2 2016-10-24; v3 2016-11-03; v4 2017-02-22.

- [https://arxiv.org/abs/1609.02907](https://arxiv.org/abs/1609.02907) — retrieved 2026-10-30; Submission history (all displayed versions)

Limits: OpenReview forum SJU4ayYgl returned browser verification. ICLR 2017 is a venue candidate, not independently verified from the required venue page in this check.

Retrieval failures: https://openreview.net/forum?id=SJU4ayYgl: Browser verification; https://api.openreview.net/notes?id=SJU4ayYgl: HTTP 403; https://openreview.net/pdf?id=SJU4ayYgl: HTTP 403

Comparison — compatible facts; scope unresolved: All 4 listed arXiv dates agree. No venue fact in the answer file is contradicted; this report adds only the explicitly sourced publication or presentation facts it located. The item limitations remain; an unlocated venue is not a verified absence.

### A032 — dates

**supported** — arXiv submission history and the separately identified venue chronology were checked independently.

arXiv submissions (day precision): v1 2016-10-07; v2 2016-12-30; v3 2017-03-21; v4 2019-12-03.

- conference proceedings publication: 2017 IEEE International Conference on Computer Vision (ICCV), pp. 618–626; 2017-10 (month).
- journal online publication: International Journal of Computer Vision, volume 128, issue 2, pp. 336–359; 2019-10-11 (day).
- journal print publication: International Journal of Computer Vision, volume 128, issue 2; 2020-02 (month).

- [https://arxiv.org/abs/1610.02391](https://arxiv.org/abs/1610.02391) — retrieved 2026-10-30; Submission history (all displayed versions)
- [https://api.crossref.org/works/10.1109%2FICCV.2017.74](https://api.crossref.org/works/10.1109%2FICCV.2017.74) — retrieved 2026-10-30; published-print
- [https://api.crossref.org/works/10.1007%2Fs11263-019-01228-7](https://api.crossref.org/works/10.1007%2Fs11263-019-01228-7) — retrieved 2026-10-30; published-online and published-print

Comparison — adds or refines sourced dates: All 4 listed arXiv dates agree. The independently checked publication facts preserve compatible venue years while distinguishing source precision and date kind. Dataset-specific draft/snapshot dates are outside the verified venue comparison.

### A033 — dates

**supported** — arXiv submission history and the separately identified venue chronology were checked independently.

arXiv submissions (day precision): v1 2015-02-06.

- conference proceedings publication: 2015 IEEE International Conference on Computer Vision (ICCV), pp. 1026–1034; 2015-12 (month).

- [https://arxiv.org/abs/1502.01852](https://arxiv.org/abs/1502.01852) — retrieved 2026-10-30; Submission history (all displayed versions)
- [https://api.crossref.org/works/10.1109%2Ficcv.2015.123](https://api.crossref.org/works/10.1109%2Ficcv.2015.123) — retrieved 2026-10-30; published-print

Comparison — adds or refines sourced dates: All 1 listed arXiv dates agree. The independently checked publication facts preserve compatible venue years while distinguishing source precision and date kind. Dataset-specific draft/snapshot dates are outside the verified venue comparison.

### A034 — dates

**supported** — arXiv submission history and the separately identified venue chronology were checked independently.

arXiv submissions (day precision): v1 2025-01-24; v2 2025-02-06; v3 2025-02-12; v4 2025-02-19; v5 2025-02-21; v6 2025-04-11; v7 2025-04-19; v8 2025-09-12; v9 2025-09-25; v10 2026-02-20; v11 2026-07-28; v12 2026-10-19.

- journal online publication: Nature, volume 649, issue 8099, pp. 1139–1146; 2026-01-28 (day).
- journal print publication: Nature, volume 649, issue 8099; 2026-01-29 (day).

- [https://arxiv.org/abs/2501.14249](https://arxiv.org/abs/2501.14249) — retrieved 2026-10-30; Submission history (all displayed versions)
- [https://api.crossref.org/works/10.1038%2Fs41586-025-09962-4](https://api.crossref.org/works/10.1038%2Fs41586-025-09962-4) — retrieved 2026-10-30; Title, published-online and published-print

Limits: The DOI title differs from the arXiv title. The supplied DOI and arXiv cross-link identify the related version; do not date it from the DOI's 025 string.

Comparison — adds or refines sourced dates: All 12 listed arXiv dates agree. The independently checked publication facts preserve compatible venue years while distinguishing source precision and date kind. Dataset-specific draft/snapshot dates are outside the verified venue comparison.

### A035 — dates

**supported** — The official ICLR 2015 program lists this paper; its arXiv chronology is separately verified.

arXiv submissions (day precision): v1 2014-12-20; v2 2015-02-25; v3 2015-03-20.

- conference presentation: ICLR 2015; 2015 (year).

- [https://arxiv.org/abs/1412.6572](https://arxiv.org/abs/1412.6572) — retrieved 2026-10-30; Submission history (all displayed versions)
- [https://iclr.cc/archive/www/2015.html](https://iclr.cc/archive/www/2015.html) — retrieved 2026-10-30; Conference poster program, title entry

Limits: The conference year is verified; no proceedings release day is asserted.

Comparison — adds or refines sourced dates: All 3 listed arXiv dates agree. No venue fact in the answer file is contradicted; this report adds only the explicitly sourced publication or presentation facts it located. Dataset-specific draft/snapshot dates are outside the verified venue comparison.

### A036 — dates

**supported** — arXiv submission history and the separately identified venue chronology were checked independently.

arXiv submissions (day precision): v1 2014-09-01; v2 2014-09-04; v3 2014-10-07; v4 2014-12-19; v5 2015-03-22; v6 2015-04-24; v7 2016-05-19.

- conference presentation (official slide archive): ICLR 2015; 2015 (year).

- [https://arxiv.org/abs/1409.0473](https://arxiv.org/abs/1409.0473) — retrieved 2026-10-30; Submission history (all displayed versions)
- [https://iclr.cc/archive/www/lib/exe/fetch.php%3Fmedia%3Diclr2015%3Abahdanau-iclr2015.pdf](https://iclr.cc/archive/www/lib/exe/fetch.php%3Fmedia%3Diclr2015%3Abahdanau-iclr2015.pdf) — retrieved 2026-10-30; Conference-hosted title slide

Limits: Official conference material confirms the venue/year; no distinct proceedings release day located.

Comparison — adds or refines sourced dates: All 7 listed arXiv dates agree. No venue fact in the answer file is contradicted; this report adds only the explicitly sourced publication or presentation facts it located. Dataset-specific draft/snapshot dates are outside the verified venue comparison.

### A037 — dates

**supported** — arXiv submission history and the separately identified venue chronology were checked independently.

arXiv submissions (day precision): v1 2021-09-08; v2 2022-05-08.

- conference proceedings publication: ACL 2022, Volume 1: Long Papers, pp. 3214–3252; 2022-05 (month).

- [https://arxiv.org/abs/2109.07958](https://arxiv.org/abs/2109.07958) — retrieved 2026-10-30; Submission history (all displayed versions)
- [https://aclanthology.org/2022.acl-long.229/](https://aclanthology.org/2022.acl-long.229/) — retrieved 2026-10-30; Volume, month, year

Comparison — adds or refines sourced dates: All 2 listed arXiv dates agree. The independently checked publication facts preserve compatible venue years while distinguishing source precision and date kind. Dataset-specific draft/snapshot dates are outside the verified venue comparison.

### A038 — dates

**partly supported** — arXiv submission history is verified; no venue publication is asserted without the required source.

arXiv submissions (day precision): v1 2023-07-18; v2 2023-07-19.

- [https://arxiv.org/abs/2307.09288](https://arxiv.org/abs/2307.09288) — retrieved 2026-10-30; Submission history (all displayed versions)

Limits: No conference or journal version located; verified preprint dates do not imply venue publication.

Comparison — compatible facts; scope unresolved: All 2 listed arXiv dates agree. No venue fact in the answer file is contradicted; this report adds only the explicitly sourced publication or presentation facts it located. The item limitations remain; an unlocated venue is not a verified absence.

### A039 — dates

**supported** — The official ICLR 2013 program lists the paper in the workshop poster session; arXiv submission dates remain separate.

arXiv submissions (day precision): v1 2013-01-16; v2 2013-03-07; v3 2013-09-07.

- conference workshop poster presentation: ICLR 2013, Poster session II; 2013-05-03 (day).

- [https://arxiv.org/abs/1301.3781](https://arxiv.org/abs/1301.3781) — retrieved 2026-10-30; Submission history (all displayed versions)
- [https://iclr.cc/archive/2013/program-details/program.html](https://iclr.cc/archive/2013/program-details/program.html) — Official program retrieved 2026-10-30; Poster session II (Friday May 3), title entry

Limits: The day is a presentation date; no distinct proceedings publication day is asserted.

Comparison — adds or refines sourced dates: All 3 listed arXiv dates agree. No venue fact in the answer file is contradicted; this report adds only the explicitly sourced publication or presentation facts it located. Dataset-specific draft/snapshot dates are outside the verified venue comparison.

### A040 — dates

**supported** — arXiv submission history and the separately identified venue chronology were checked independently.

arXiv submissions (day precision): v1 2018-02-15; v2 2018-03-22.

- conference proceedings publication: NAACL-HLT 2018, Volume 1 (Long Papers), pp. 2227–2237; 2018-06 (month).

- [https://arxiv.org/abs/1802.05365](https://arxiv.org/abs/1802.05365) — retrieved 2026-10-30; Submission history (all displayed versions)
- [https://aclanthology.org/N18-1202/](https://aclanthology.org/N18-1202/) — retrieved 2026-10-30; Volume, month, year

Comparison — adds or refines sourced dates: All 2 listed arXiv dates agree. The independently checked publication facts preserve compatible venue years while distinguishing source precision and date kind. Dataset-specific draft/snapshot dates are outside the verified venue comparison.

### A041 — dates

**supported** — All displayed arXiv submission dates and the separate venue chronology were checked.

arXiv submissions (day precision): v1 2019-05-19.

- conference proceedings publication: ACL 2019, pp. 4791–4800; 2019-07 (month).

- [https://arxiv.org/abs/1905.07830](https://arxiv.org/abs/1905.07830) — retrieved 2026-10-30; Submission history (all displayed versions)
- [https://aclanthology.org/P19-1472/](https://aclanthology.org/P19-1472/) — retrieved 2026-10-30; Volume, month, year

Comparison — adds or refines sourced dates: All 1 listed arXiv dates agree. The independently checked publication facts preserve compatible venue years while distinguishing source precision and date kind. Dataset-specific draft/snapshot dates are outside the verified venue comparison.

### A042 — dates

**partly supported** — All displayed arXiv submission dates are verified; no conference or journal version was located.

arXiv submissions (day precision): v1 2023-03-15; v2 2023-03-16; v3 2023-03-27; v4 2023-12-19; v5 2024-03-01; v6 2024-03-04.

- [https://arxiv.org/abs/2303.08774](https://arxiv.org/abs/2303.08774) — retrieved 2026-10-30; Submission history (all displayed versions)

Limits: No conference or journal version located; the technical report's arXiv dates are separate from any product release.

Comparison — compatible facts; scope unresolved: All 6 listed arXiv dates agree. No venue fact in the answer file is contradicted; this report adds only the explicitly sourced publication or presentation facts it located. The item limitations remain; an unlocated venue is not a verified absence.

### A043 — dates

**supported** — All displayed arXiv submission dates and the separate venue chronology were checked.

arXiv submissions (day precision): v1 2024-06-03; v2 2024-06-04; v3 2024-06-05; v4 2024-06-23; v5 2024-10-07; v6 2024-11-06.

- conference proceedings publication: Advances in Neural Information Processing Systems, Datasets and Benchmarks Track, volume 37; 2024 (year).

- [https://arxiv.org/abs/2406.01574](https://arxiv.org/abs/2406.01574) — retrieved 2026-10-30; Submission history (all displayed versions)
- [https://proceedings.neurips.cc/paper_files/paper/2024/hash/ad236edc564f3e3156e1b2feafb99a24-Abstract-Datasets_and_Benchmarks_Track.html](https://proceedings.neurips.cc/paper_files/paper/2024/hash/ad236edc564f3e3156e1b2feafb99a24-Abstract-Datasets_and_Benchmarks_Track.html) — retrieved 2026-10-30; Proceedings heading

Comparison — adds or refines sourced dates: All 6 listed arXiv dates agree. No venue fact in the answer file is contradicted; this report adds only the explicitly sourced publication or presentation facts it located. Dataset-specific draft/snapshot dates are outside the verified venue comparison.

### A044 — dates

**supported** — All displayed arXiv submission dates and the separate venue chronology were checked.

arXiv submissions (day precision): v1 2014-09-17.

- conference proceedings publication: 2015 IEEE Conference on Computer Vision and Pattern Recognition (CVPR), pp. 1–9; 2015-06 (month).

- [https://arxiv.org/abs/1409.4842](https://arxiv.org/abs/1409.4842) — retrieved 2026-10-30; Submission history (all displayed versions)
- [https://api.crossref.org/works/10.1109%2Fcvpr.2015.7298594](https://api.crossref.org/works/10.1109%2Fcvpr.2015.7298594) — retrieved 2026-10-30; published-print; event dates kept separate

Comparison — adds or refines sourced dates: All 1 listed arXiv dates agree. The independently checked publication facts preserve compatible venue years while distinguishing source precision and date kind. Dataset-specific draft/snapshot dates are outside the verified venue comparison.

### A045 — dates

**partly supported** — All displayed arXiv submission dates are verified; no conference or journal version was located.

arXiv submissions (day precision): v1 2023-11-14.

- [https://arxiv.org/abs/2311.07911](https://arxiv.org/abs/2311.07911) — retrieved 2026-10-30; Submission history (all displayed versions)
- [https://github.com/google-research/google-research/blob/master/instruction_following_eval/README.md](https://github.com/google-research/google-research/blob/master/instruction_following_eval/README.md) — retrieved 2026-10-30; Reference calls it an arXiv preprint

Limits: No conference or journal version located.

Comparison — compatible facts; scope unresolved: All 1 listed arXiv dates agree. No venue fact in the answer file is contradicted; this report adds only the explicitly sourced publication or presentation facts it located. The item limitations remain; an unlocated venue is not a verified absence.

### A046 — dates

**supported** — All displayed arXiv submission dates and the separate venue chronology were checked.

arXiv submissions (day precision): v1 2025-01-22; v2 2026-01-04.

- journal online publication: Nature, volume 645, issue 8081, pp. 633–638; 2025-09-17 (day).
- journal print publication: Nature, volume 645, issue 8081; 2025-09-18 (day).

- [https://arxiv.org/abs/2501.12948](https://arxiv.org/abs/2501.12948) — retrieved 2026-10-30; Submission history (all displayed versions)
- [https://api.crossref.org/works/10.1038%2Fs41586-025-09422-z](https://api.crossref.org/works/10.1038%2Fs41586-025-09422-z) — retrieved 2026-10-30; Title; published-online and published-print

Comparison — adds or refines sourced dates: All 2 listed arXiv dates agree. The independently checked publication facts preserve compatible venue years while distinguishing source precision and date kind. Dataset-specific draft/snapshot dates are outside the verified venue comparison.

### A047 — dates

**partly supported** — All displayed arXiv submission dates are verified; no conference or journal version was located.

arXiv submissions (day precision): v1 2018-05-02; v2 2018-10-22.

- [https://arxiv.org/abs/1805.00899](https://arxiv.org/abs/1805.00899) — retrieved 2026-10-30; Submission history (all displayed versions)

Limits: No conference or journal version located; checked arXiv versions are preprints.

Comparison — compatible facts; scope unresolved: All 2 listed arXiv dates agree. No venue fact in the answer file is contradicted; this report adds only the explicitly sourced publication or presentation facts it located. The item limitations remain; an unlocated venue is not a verified absence.

### A048 — dates

**supported** — All displayed arXiv submission dates and the separate venue chronology were checked.

arXiv submissions (day precision): v1 2022-03-21; v2 2022-04-06; v3 2022-10-04; v4 2023-03-07.

- conference publication: ICLR 2023; 2023 (year).

- [https://arxiv.org/abs/2203.11171](https://arxiv.org/abs/2203.11171) — retrieved 2026-10-30; Submission history (all displayed versions)
- [https://iclr.cc/Downloads/2023](https://iclr.cc/Downloads/2023) — retrieved 2026-10-30; Official conference paper list
- [https://openreview.net/pdf?id=1PL1NIMMrw](https://openreview.net/pdf?id=1PL1NIMMrw) — retrieved 2026-10-30; PDF title page: Published as a conference paper at ICLR 2023

Comparison — adds or refines sourced dates: All 4 listed arXiv dates agree. No venue fact in the answer file is contradicted; this report adds only the explicitly sourced publication or presentation facts it located. Dataset-specific draft/snapshot dates are outside the verified venue comparison.

### A049 — authorship

**partly supported** — The specified v1 bylines print different name forms; identity is not resolved by the bylines.

Printed forms in input-paper order: Tom B. Brown / Tom B Brown / Tom B. Brown.

Unresolved. Byline name agreement alone does not identify a person across papers; retain separate assertions until an identifying source is inspected.

- [https://arxiv.org/pdf/2005.14165v1](https://arxiv.org/pdf/2005.14165v1) — v1 PDF independently retrieved 2026-10-30; PDF p. 1, printed byline
- [https://arxiv.org/pdf/1706.03741v1](https://arxiv.org/pdf/1706.03741v1) — v1 PDF independently retrieved 2026-10-30; PDF p. 1, printed byline
- [https://arxiv.org/pdf/2001.08361v1](https://arxiv.org/pdf/2001.08361v1) — v1 PDF independently retrieved 2026-10-30; PDF p. 1, printed byline

Limits: Names transcribed without contribution markers. No affiliations, roles or contact details are used as identity evidence.

Comparison — agrees on printed forms; identity unresolved: The ordered printed forms match exactly. A proposed person ID is not independent evidence identifying one person across the papers; no merge follows from this check.

### A050 — authorship

**partly supported** — The specified v1 bylines print different name forms; identity is not resolved by the bylines.

Printed forms in input-paper order: Sheer El-Showk / Sheer El Showk.

Unresolved. Byline name agreement alone does not identify a person across papers; retain separate assertions until an identifying source is inspected.

- [https://arxiv.org/pdf/2204.05862v1](https://arxiv.org/pdf/2204.05862v1) — v1 PDF independently retrieved 2026-10-30; PDF p. 1, printed byline
- [https://arxiv.org/pdf/2212.08073v1](https://arxiv.org/pdf/2212.08073v1) — v1 PDF independently retrieved 2026-10-30; PDF p. 1, printed byline

Limits: Names transcribed without contribution markers. No affiliations, roles or contact details are used as identity evidence.

Comparison — agrees on printed forms; identity unresolved: The ordered printed forms match exactly. A proposed person ID is not independent evidence identifying one person across the papers; no merge follows from this check.

### A051 — authorship

**supported** — The specified v1 bylines print the same name; this verifies the name match, not personal identity.

Printed forms in input-paper order: Nicholas Joseph / Nicholas Joseph / Nicholas Joseph.

Unresolved. Byline name agreement alone does not identify a person across papers; retain separate assertions until an identifying source is inspected.

- [https://arxiv.org/pdf/2107.03374v1](https://arxiv.org/pdf/2107.03374v1) — v1 PDF independently retrieved 2026-10-30; PDF p. 1, printed byline
- [https://arxiv.org/pdf/2204.05862v1](https://arxiv.org/pdf/2204.05862v1) — v1 PDF independently retrieved 2026-10-30; PDF p. 1, printed byline
- [https://arxiv.org/pdf/2212.08073v1](https://arxiv.org/pdf/2212.08073v1) — v1 PDF independently retrieved 2026-10-30; PDF p. 1, printed byline

Limits: Names transcribed without contribution markers. No affiliations, roles or contact details are used as identity evidence.

Comparison — agrees on printed forms; identity unresolved: The ordered printed forms match exactly. A proposed person ID is not independent evidence identifying one person across the papers; no merge follows from this check.

### A052 — authorship

**supported** — The specified v1 bylines print the same name; this verifies the name match, not personal identity.

Printed forms in input-paper order: Tom Hennigan / Tom Hennigan.

Unresolved. Byline name agreement alone does not identify a person across papers; retain separate assertions until an identifying source is inspected.

- [https://arxiv.org/pdf/2203.15556v1](https://arxiv.org/pdf/2203.15556v1) — v1 PDF independently retrieved 2026-10-30; PDF p. 1, printed byline
- [https://arxiv.org/pdf/2112.11446v1](https://arxiv.org/pdf/2112.11446v1) — v1 PDF independently retrieved 2026-10-30; PDF p. 1, printed byline

Limits: Names transcribed without contribution markers. No affiliations, roles or contact details are used as identity evidence.

Comparison — agrees on printed forms; identity unresolved: The ordered printed forms match exactly. A proposed person ID is not independent evidence identifying one person across the papers; no merge follows from this check.

### A053 — authorship

**supported** — The specified v1 bylines print the same name; this verifies the name match, not personal identity.

Printed forms in input-paper order: Kaiming He / Kaiming He / Kaiming He.

Unresolved. Byline name agreement alone does not identify a person across papers; retain separate assertions until an identifying source is inspected.

- [https://arxiv.org/pdf/1512.03385v1](https://arxiv.org/pdf/1512.03385v1) — v1 PDF independently retrieved 2026-10-30; PDF p. 1, printed byline
- [https://arxiv.org/pdf/1506.01497v1](https://arxiv.org/pdf/1506.01497v1) — v1 PDF independently retrieved 2026-10-30; PDF p. 1, printed byline
- [https://arxiv.org/pdf/1502.01852v1](https://arxiv.org/pdf/1502.01852v1) — v1 PDF independently retrieved 2026-10-30; PDF p. 1, printed byline

Limits: Names transcribed without contribution markers. No affiliations, roles or contact details are used as identity evidence.

Comparison — agrees on printed forms; identity unresolved: The ordered printed forms match exactly. A proposed person ID is not independent evidence identifying one person across the papers; no merge follows from this check.

### A054 — authorship

**supported** — The specified v1 bylines print the same name; this verifies the name match, not personal identity.

Printed forms in input-paper order: Yonatan Bisk / Yonatan Bisk.

Unresolved. Byline name agreement alone does not identify a person across papers; retain separate assertions until an identifying source is inspected.

- [https://arxiv.org/pdf/1905.07830v1](https://arxiv.org/pdf/1905.07830v1) — v1 PDF independently retrieved 2026-10-30; PDF p. 1, printed byline
- [https://arxiv.org/pdf/1911.11641v1](https://arxiv.org/pdf/1911.11641v1) — v1 PDF independently retrieved 2026-10-30; PDF p. 1, printed byline

Limits: Names transcribed without contribution markers. No affiliations, roles or contact details are used as identity evidence.

Comparison — agrees on printed forms; identity unresolved: The ordered printed forms match exactly. A proposed person ID is not independent evidence identifying one person across the papers; no merge follows from this check.

### A055 — authorship

**supported** — The specified v1 bylines print the same name; this verifies the name match, not personal identity.

Printed forms in input-paper order: Danny Hernandez / Danny Hernandez.

Unresolved. Byline name agreement alone does not identify a person across papers; retain separate assertions until an identifying source is inspected.

- [https://arxiv.org/pdf/2204.05862v1](https://arxiv.org/pdf/2204.05862v1) — v1 PDF independently retrieved 2026-10-30; PDF p. 1, printed byline
- [https://arxiv.org/pdf/2212.08073v1](https://arxiv.org/pdf/2212.08073v1) — v1 PDF independently retrieved 2026-10-30; PDF p. 1, printed byline

Limits: Names transcribed without contribution markers. No affiliations, roles or contact details are used as identity evidence.

Comparison — agrees on printed forms; identity unresolved: The ordered printed forms match exactly. A proposed person ID is not independent evidence identifying one person across the papers; no merge follows from this check.

### A056 — authorship

**supported** — The specified v1 bylines print the same name; this verifies the name match, not personal identity.

Printed forms in input-paper order: James Bradbury / James Bradbury.

Unresolved. Byline name agreement alone does not identify a person across papers; retain separate assertions until an identifying source is inspected.

- [https://arxiv.org/pdf/2204.02311v1](https://arxiv.org/pdf/2204.02311v1) — v1 PDF independently retrieved 2026-10-30; PDF p. 1, printed byline
- [https://arxiv.org/pdf/2112.11446v1](https://arxiv.org/pdf/2112.11446v1) — v1 PDF independently retrieved 2026-10-30; PDF p. 1, printed byline

Limits: Names transcribed without contribution markers. No affiliations, roles or contact details are used as identity evidence.

Comparison — agrees on printed forms; identity unresolved: The ordered printed forms match exactly. A proposed person ID is not independent evidence identifying one person across the papers; no merge follows from this check.

### A057 — authorship

**supported** — The specified v1 bylines print the same name; this verifies the name match, not personal identity.

Printed forms in input-paper order: Ed Chi / Ed Chi.

Unresolved. Byline name agreement alone does not identify a person across papers; retain separate assertions until an identifying source is inspected.

- [https://arxiv.org/pdf/2201.11903v1](https://arxiv.org/pdf/2201.11903v1) — v1 PDF independently retrieved 2026-10-30; PDF p. 1, printed byline
- [https://arxiv.org/pdf/2201.08239v1](https://arxiv.org/pdf/2201.08239v1) — v1 PDF independently retrieved 2026-10-30; PDF p. 1, printed byline

Limits: Names transcribed without contribution markers. No affiliations, roles or contact details are used as identity evidence.

Comparison — agrees on printed forms; identity unresolved: The ordered printed forms match exactly. A proposed person ID is not independent evidence identifying one person across the papers; no merge follows from this check.

### A058 — authorship

**supported** — The specified v1 bylines print the same name; this verifies the name match, not personal identity.

Printed forms in input-paper order: Katherine Lee / Katherine Lee.

Unresolved. Byline name agreement alone does not identify a person across papers; retain separate assertions until an identifying source is inspected.

- [https://arxiv.org/pdf/1910.10683v1](https://arxiv.org/pdf/1910.10683v1) — v1 PDF independently retrieved 2026-10-30; PDF p. 1, printed byline
- [https://arxiv.org/pdf/2204.02311v1](https://arxiv.org/pdf/2204.02311v1) — v1 PDF independently retrieved 2026-10-30; PDF p. 1, printed byline

Limits: Names transcribed without contribution markers. No affiliations, roles or contact details are used as identity evidence.

Comparison — agrees on printed forms; identity unresolved: The ordered printed forms match exactly. A proposed person ID is not independent evidence identifying one person across the papers; no merge follows from this check.

### A059 — authorship

**supported** — The specified v1 bylines print the same name; this verifies the name match, not personal identity.

Printed forms in input-paper order: Aurelien Rodriguez / Aurelien Rodriguez.

Unresolved. Byline name agreement alone does not identify a person across papers; retain separate assertions until an identifying source is inspected.

- [https://arxiv.org/pdf/2307.09288v1](https://arxiv.org/pdf/2307.09288v1) — v1 PDF independently retrieved 2026-10-30; PDF p. 1, printed byline
- [https://arxiv.org/pdf/2302.13971v1](https://arxiv.org/pdf/2302.13971v1) — v1 PDF independently retrieved 2026-10-30; PDF p. 1, printed byline

Limits: Names transcribed without contribution markers. No affiliations, roles or contact details are used as identity evidence.

Comparison — agrees on printed forms; identity unresolved: The ordered printed forms match exactly. A proposed person ID is not independent evidence identifying one person across the papers; no merge follows from this check.

### A060 — authorship

**supported** — The specified v1 bylines print the same name; this verifies the name match, not personal identity.

Printed forms in input-paper order: Thibaut Lavril / Thibaut Lavril.

Unresolved. Byline name agreement alone does not identify a person across papers; retain separate assertions until an identifying source is inspected.

- [https://arxiv.org/pdf/2307.09288v1](https://arxiv.org/pdf/2307.09288v1) — v1 PDF independently retrieved 2026-10-30; PDF p. 1, printed byline
- [https://arxiv.org/pdf/2302.13971v1](https://arxiv.org/pdf/2302.13971v1) — v1 PDF independently retrieved 2026-10-30; PDF p. 1, printed byline

Limits: Names transcribed without contribution markers. No affiliations, roles or contact details are used as identity evidence.

Comparison — agrees on printed forms; identity unresolved: The ordered printed forms match exactly. A proposed person ID is not independent evidence identifying one person across the papers; no merge follows from this check.

### A061 — authorship

**supported** — The specified v1 bylines print the same name; this verifies the name match, not personal identity.

Printed forms in input-paper order: Xiangyu Zhang / Xiangyu Zhang.

Unresolved. Byline name agreement alone does not identify a person across papers; retain separate assertions until an identifying source is inspected.

- [https://arxiv.org/pdf/1512.03385v1](https://arxiv.org/pdf/1512.03385v1) — v1 PDF independently retrieved 2026-10-30; PDF p. 1, printed byline
- [https://arxiv.org/pdf/1502.01852v1](https://arxiv.org/pdf/1502.01852v1) — v1 PDF independently retrieved 2026-10-30; PDF p. 1, printed byline

Limits: Names transcribed without contribution markers. No affiliations, roles or contact details are used as identity evidence.

Comparison — agrees on printed forms; identity unresolved: The ordered printed forms match exactly. A proposed person ID is not independent evidence identifying one person across the papers; no merge follows from this check.

### A062 — authorship

**supported** — The specified v1 bylines print the same name; this verifies the name match, not personal identity.

Printed forms in input-paper order: Naman Goyal / Naman Goyal / Naman Goyal.

Unresolved. Byline name agreement alone does not identify a person across papers; retain separate assertions until an identifying source is inspected.

- [https://arxiv.org/pdf/2307.09288v1](https://arxiv.org/pdf/2307.09288v1) — v1 PDF independently retrieved 2026-10-30; PDF p. 1, printed byline
- [https://arxiv.org/pdf/2302.13971v1](https://arxiv.org/pdf/2302.13971v1) — v1 PDF independently retrieved 2026-10-30; PDF p. 1, printed byline
- [https://arxiv.org/pdf/1907.11692v1](https://arxiv.org/pdf/1907.11692v1) — v1 PDF independently retrieved 2026-10-30; PDF p. 1, printed byline

Limits: Names transcribed without contribution markers. No affiliations, roles or contact details are used as identity evidence.

Comparison — agrees on printed forms; identity unresolved: The ordered printed forms match exactly. A proposed person ID is not independent evidence identifying one person across the papers; no merge follows from this check.

### A063 — authorship

**supported** — The specified v1 bylines print the same name; this verifies the name match, not personal identity.

Printed forms in input-paper order: Tom Henighan / Tom Henighan / Tom Henighan / Tom Henighan.

Unresolved. Byline name agreement alone does not identify a person across papers; retain separate assertions until an identifying source is inspected.

- [https://arxiv.org/pdf/2005.14165v1](https://arxiv.org/pdf/2005.14165v1) — v1 PDF independently retrieved 2026-10-30; PDF p. 1, printed byline
- [https://arxiv.org/pdf/2001.08361v1](https://arxiv.org/pdf/2001.08361v1) — v1 PDF independently retrieved 2026-10-30; PDF p. 1, printed byline
- [https://arxiv.org/pdf/2204.05862v1](https://arxiv.org/pdf/2204.05862v1) — v1 PDF independently retrieved 2026-10-30; PDF p. 1, printed byline
- [https://arxiv.org/pdf/2212.08073v1](https://arxiv.org/pdf/2212.08073v1) — v1 PDF independently retrieved 2026-10-30; PDF p. 1, printed byline

Limits: Names transcribed without contribution markers. No affiliations, roles or contact details are used as identity evidence.

Comparison — agrees on printed forms; identity unresolved: The ordered printed forms match exactly. A proposed person ID is not independent evidence identifying one person across the papers; no merge follows from this check.

### A064 — authorship

**supported** — The specified v1 bylines print the same name; this verifies the name match, not personal identity.

Printed forms in input-paper order: Adam Roberts / Adam Roberts / Adam Roberts.

Unresolved. Byline name agreement alone does not identify a person across papers; retain separate assertions until an identifying source is inspected.

- [https://arxiv.org/pdf/1910.10683v1](https://arxiv.org/pdf/1910.10683v1) — v1 PDF independently retrieved 2026-10-30; PDF p. 1, printed byline
- [https://arxiv.org/pdf/2201.08239v1](https://arxiv.org/pdf/2201.08239v1) — v1 PDF independently retrieved 2026-10-30; PDF p. 1, printed byline
- [https://arxiv.org/pdf/2204.02311v1](https://arxiv.org/pdf/2204.02311v1) — v1 PDF independently retrieved 2026-10-30; PDF p. 1, printed byline

Limits: Names transcribed without contribution markers. No affiliations, roles or contact details are used as identity evidence.

Comparison — agrees on printed forms; identity unresolved: The ordered printed forms match exactly. A proposed person ID is not independent evidence identifying one person across the papers; no merge follows from this check.

### A065 — authorship

**supported** — The specified v1 bylines print the same name; this verifies the name match, not personal identity.

Printed forms in input-paper order: Jian Sun / Jian Sun / Jian Sun.

Unresolved. Byline name agreement alone does not identify a person across papers; retain separate assertions until an identifying source is inspected.

- [https://arxiv.org/pdf/1512.03385v1](https://arxiv.org/pdf/1512.03385v1) — v1 PDF independently retrieved 2026-10-30; PDF p. 1, printed byline
- [https://arxiv.org/pdf/1506.01497v1](https://arxiv.org/pdf/1506.01497v1) — v1 PDF independently retrieved 2026-10-30; PDF p. 1, printed byline
- [https://arxiv.org/pdf/1502.01852v1](https://arxiv.org/pdf/1502.01852v1) — v1 PDF independently retrieved 2026-10-30; PDF p. 1, printed byline

Limits: Names transcribed without contribution markers. No affiliations, roles or contact details are used as identity evidence.

Comparison — agrees on printed forms; identity unresolved: The ordered printed forms match exactly. A proposed person ID is not independent evidence identifying one person across the papers; no merge follows from this check.

### A066 — authorship

**supported** — The specified v1 bylines print the same name; this verifies the name match, not personal identity.

Printed forms in input-paper order: Saurav Kadavath / Saurav Kadavath / Saurav Kadavath.

Unresolved. Byline name agreement alone does not identify a person across papers; retain separate assertions until an identifying source is inspected.

- [https://arxiv.org/pdf/2103.03874v1](https://arxiv.org/pdf/2103.03874v1) — v1 PDF independently retrieved 2026-10-30; PDF p. 1, printed byline
- [https://arxiv.org/pdf/2204.05862v1](https://arxiv.org/pdf/2204.05862v1) — v1 PDF independently retrieved 2026-10-30; PDF p. 1, printed byline
- [https://arxiv.org/pdf/2212.08073v1](https://arxiv.org/pdf/2212.08073v1) — v1 PDF independently retrieved 2026-10-30; PDF p. 1, printed byline

Limits: Names transcribed without contribution markers. No affiliations, roles or contact details are used as identity evidence.

Comparison — agrees on printed forms; identity unresolved: The ordered printed forms match exactly. A proposed person ID is not independent evidence identifying one person across the papers; no merge follows from this check.

### A067 — authorship

**supported** — The specified v1 bylines print the same name; this verifies the name match, not personal identity.

Printed forms in input-paper order: Ronan Le Bras / Ronan Le Bras.

Unresolved. Byline name agreement alone does not identify a person across papers; retain separate assertions until an identifying source is inspected.

- [https://arxiv.org/pdf/1907.10641v1](https://arxiv.org/pdf/1907.10641v1) — v1 PDF independently retrieved 2026-10-30; PDF p. 1, printed byline
- [https://arxiv.org/pdf/1911.11641v1](https://arxiv.org/pdf/1911.11641v1) — v1 PDF independently retrieved 2026-10-30; PDF p. 1, printed byline

Limits: Names transcribed without contribution markers. No affiliations, roles or contact details are used as identity evidence.

Comparison — agrees on printed forms; identity unresolved: The ordered printed forms match exactly. A proposed person ID is not independent evidence identifying one person across the papers; no merge follows from this check.

### A068 — authorship

**supported** — The specified v1 bylines print the same name; this verifies the name match, not personal identity.

Printed forms in input-paper order: Dumitru Erhan / Dumitru Erhan.

Unresolved. Byline name agreement alone does not identify a person across papers; retain separate assertions until an identifying source is inspected.

- [https://arxiv.org/pdf/1409.4842v1](https://arxiv.org/pdf/1409.4842v1) — v1 PDF independently retrieved 2026-10-30; PDF p. 1, printed byline
- [https://arxiv.org/pdf/1512.02325v1](https://arxiv.org/pdf/1512.02325v1) — v1 PDF independently retrieved 2026-10-30; PDF p. 1, printed byline

Limits: Names transcribed without contribution markers. No affiliations, roles or contact details are used as identity evidence.

Comparison — agrees on printed forms; identity unresolved: The ordered printed forms match exactly. A proposed person ID is not independent evidence identifying one person across the papers; no merge follows from this check.

### A069 — authorship

**supported** — The specified v1 bylines print the same name; this verifies the name match, not personal identity.

Printed forms in input-paper order: Dehao Chen / Dehao Chen / Dehao Chen.

Unresolved. Byline name agreement alone does not identify a person across papers; retain separate assertions until an identifying source is inspected.

- [https://arxiv.org/pdf/1811.06965v1](https://arxiv.org/pdf/1811.06965v1) — v1 PDF independently retrieved 2026-10-30; PDF p. 1, printed byline
- [https://arxiv.org/pdf/2006.16668v1](https://arxiv.org/pdf/2006.16668v1) — v1 PDF independently retrieved 2026-10-30; PDF p. 1, printed byline
- [https://arxiv.org/pdf/2201.08239v1](https://arxiv.org/pdf/2201.08239v1) — v1 PDF independently retrieved 2026-10-30; PDF p. 1, printed byline

Limits: Names transcribed without contribution markers. No affiliations, roles or contact details are used as identity evidence.

Comparison — agrees on printed forms; identity unresolved: The ordered printed forms match exactly. A proposed person ID is not independent evidence identifying one person across the papers; no merge follows from this check.

### A070 — authorship

**supported** — The specified v1 bylines print the same name; this verifies the name match, not personal identity.

Printed forms in input-paper order: Carlos Guestrin / Carlos Guestrin.

Unresolved. Byline name agreement alone does not identify a person across papers; retain separate assertions until an identifying source is inspected.

- [https://arxiv.org/pdf/1603.02754v1](https://arxiv.org/pdf/1603.02754v1) — v1 PDF independently retrieved 2026-10-30; PDF p. 1, printed byline
- [https://arxiv.org/pdf/1602.04938v1](https://arxiv.org/pdf/1602.04938v1) — v1 PDF independently retrieved 2026-10-30; PDF p. 1, printed byline

Limits: Names transcribed without contribution markers. No affiliations, roles or contact details are used as identity evidence.

Comparison — agrees on printed forms; identity unresolved: The ordered printed forms match exactly. A proposed person ID is not independent evidence identifying one person across the papers; no merge follows from this check.

### A071 — authorship

**supported** — The specified v1 bylines print the same name; this verifies the name match, not personal identity.

Printed forms in input-paper order: Sebastian Gehrmann / Sebastian Gehrmann.

Unresolved. Byline name agreement alone does not identify a person across papers; retain separate assertions until an identifying source is inspected.

- [https://arxiv.org/pdf/2210.09261v1](https://arxiv.org/pdf/2210.09261v1) — v1 PDF independently retrieved 2026-10-30; PDF p. 1, printed byline
- [https://arxiv.org/pdf/2204.02311v1](https://arxiv.org/pdf/2204.02311v1) — v1 PDF independently retrieved 2026-10-30; PDF p. 1, printed byline

Limits: Names transcribed without contribution markers. No affiliations, roles or contact details are used as identity evidence.

Comparison — agrees on printed forms; identity unresolved: The ordered printed forms match exactly. A proposed person ID is not independent evidence identifying one person across the papers; no merge follows from this check.

### A072 — authorship

**supported** — The specified v1 bylines print the same name; this verifies the name match, not personal identity.

Printed forms in input-paper order: Rewon Child / Rewon Child / Rewon Child / Rewon Child.

Unresolved. Byline name agreement alone does not identify a person across papers; retain separate assertions until an identifying source is inspected.

- [https://arxiv.org/pdf/2005.14165v1](https://arxiv.org/pdf/2005.14165v1) — v1 PDF independently retrieved 2026-10-30; PDF p. 1, printed byline
- [https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf](https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf) — Technical-paper PDF retrieved 2026-10-30; PDF p. 1, byline
- [https://arxiv.org/pdf/2001.08361v1](https://arxiv.org/pdf/2001.08361v1) — v1 PDF independently retrieved 2026-10-30; PDF p. 1, printed byline
- [https://arxiv.org/pdf/2204.02311v1](https://arxiv.org/pdf/2204.02311v1) — v1 PDF independently retrieved 2026-10-30; PDF p. 1, printed byline

Limits: Names transcribed without contribution markers. No affiliations, roles or contact details are used as identity evidence.

Comparison — agrees on printed forms; identity unresolved: The ordered printed forms match exactly. A proposed person ID is not independent evidence identifying one person across the papers; no merge follows from this check.

### A073 — authorship

**supported** — The specified v1 bylines print the same name; this verifies the name match, not personal identity.

Printed forms in input-paper order: Yoshua Bengio / Yoshua Bengio / Yoshua Bengio.

Unresolved. Byline name agreement alone does not identify a person across papers; retain separate assertions until an identifying source is inspected.

- [https://arxiv.org/pdf/1409.0473v1](https://arxiv.org/pdf/1409.0473v1) — v1 PDF independently retrieved 2026-10-30; PDF p. 1, printed byline
- [https://arxiv.org/pdf/1710.10903v1](https://arxiv.org/pdf/1710.10903v1) — v1 PDF independently retrieved 2026-10-30; PDF p. 1, printed byline
- [https://arxiv.org/pdf/1406.1078v1](https://arxiv.org/pdf/1406.1078v1) — v1 PDF independently retrieved 2026-10-30; PDF p. 1, printed byline

Limits: Names transcribed without contribution markers. No affiliations, roles or contact details are used as identity evidence.

Comparison — agrees on printed forms; identity unresolved: The ordered printed forms match exactly. A proposed person ID is not independent evidence identifying one person across the papers; no merge follows from this check.

### A074 — authorship

**supported** — The specified v1 bylines print the same name; this verifies the name match, not personal identity.

Printed forms in input-paper order: Xavier Martinet / Xavier Martinet.

Unresolved. Byline name agreement alone does not identify a person across papers; retain separate assertions until an identifying source is inspected.

- [https://arxiv.org/pdf/2307.09288v1](https://arxiv.org/pdf/2307.09288v1) — v1 PDF independently retrieved 2026-10-30; PDF p. 1, printed byline
- [https://arxiv.org/pdf/2302.13971v1](https://arxiv.org/pdf/2302.13971v1) — v1 PDF independently retrieved 2026-10-30; PDF p. 1, printed byline

Limits: Names transcribed without contribution markers. No affiliations, roles or contact details are used as identity evidence.

Comparison — agrees on printed forms; identity unresolved: The ordered printed forms match exactly. A proposed person ID is not independent evidence identifying one person across the papers; no merge follows from this check.

### A075 — authorship

**supported** — The specified v1 bylines print the same name; this verifies the name match, not personal identity.

Printed forms in input-paper order: Mohammad Bavarian / Mohammad Bavarian.

Unresolved. Byline name agreement alone does not identify a person across papers; retain separate assertions until an identifying source is inspected.

- [https://arxiv.org/pdf/2107.03374v1](https://arxiv.org/pdf/2107.03374v1) — v1 PDF independently retrieved 2026-10-30; PDF p. 1, printed byline
- [https://arxiv.org/pdf/2110.14168v1](https://arxiv.org/pdf/2110.14168v1) — v1 PDF independently retrieved 2026-10-30; PDF p. 1, printed byline

Limits: Names transcribed without contribution markers. No affiliations, roles or contact details are used as identity evidence.

Comparison — agrees on printed forms; identity unresolved: The ordered printed forms match exactly. A proposed person ID is not independent evidence identifying one person across the papers; no merge follows from this check.

### A076 — byline

**supported** — Authors transcribed from the specified PDF byline in printed order; contribution markers omitted.

Alec Radford; Jeffrey Wu; Rewon Child; David Luan; Dario Amodei; Ilya Sutskever.

- [https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf](https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf) — Specified PDF independently retrieved 2026-10-30; PDF p. 1, byline

Comparison — agrees: The complete ordered byline matches the independent PDF transcription.

### A077 — byline

**supported** — Authors transcribed from the specified PDF byline in printed order; contribution markers omitted.

Tom B. Brown; Benjamin Mann; Nick Ryder; Melanie Subbiah; Jared Kaplan; Prafulla Dhariwal; Arvind Neelakantan; Pranav Shyam; Girish Sastry; Amanda Askell; Sandhini Agarwal; Ariel Herbert-Voss; Gretchen Krueger; Tom Henighan; Rewon Child; Aditya Ramesh; Daniel M. Ziegler; Jeffrey Wu; Clemens Winter; Christopher Hesse; Mark Chen; Eric Sigler; Mateusz Litwin; Scott Gray; Benjamin Chess; Jack Clark; Christopher Berner; Sam McCandlish; Alec Radford; Ilya Sutskever; Dario Amodei.

- [https://arxiv.org/pdf/2005.14165v1](https://arxiv.org/pdf/2005.14165v1) — arXiv v1 PDF independently retrieved 2026-10-30; PDF p. 1, byline

Comparison — agrees: The complete ordered byline matches the independent PDF transcription.

### A078 — byline

**supported** — Authors transcribed from the specified PDF byline in printed order; contribution markers omitted.

Chelsea Finn; Sergey Levine; Pieter Abbeel.

- [https://arxiv.org/pdf/1603.00448v1](https://arxiv.org/pdf/1603.00448v1) — arXiv v1 PDF independently retrieved 2026-10-30; PDF p. 1, byline

Comparison — agrees: The complete ordered byline matches the independent PDF transcription.

### A079 — byline

**supported** — Authors transcribed from the specified PDF byline in printed order; contribution markers omitted.

John Schulman; Filip Wolski; Prafulla Dhariwal; Alec Radford; Oleg Klimov.

- [https://arxiv.org/pdf/1707.06347v1](https://arxiv.org/pdf/1707.06347v1) — arXiv v1 PDF independently retrieved 2026-10-30; PDF p. 1, byline

Comparison — agrees: The complete ordered byline matches the independent PDF transcription.

### A080 — byline

**supported** — Authors transcribed from the specified PDF byline in printed order; contribution markers omitted.

Tom Kwiatkowski; Jennimaria Palomaki; Olivia Redfield; Michael Collins; Ankur Parikh; Chris Alberti; Danielle Epstein; Illia Polosukhin; Jacob Devlin; Kenton Lee; Kristina Toutanova; Llion Jones; Matthew Kelcey; Ming-Wei Chang; Andrew M. Dai; Jakob Uszkoreit; Quoc Le; Slav Petrov.

- [https://aclanthology.org/Q19-1026.pdf](https://aclanthology.org/Q19-1026.pdf) — Specified PDF independently retrieved 2026-10-30; PDF p. 1, byline

Limits: Search-result extraction displayed inconsistent forms for Illia Polosukhin and Llion Jones; the directly retrieved PDF text confirms the forms recorded here.

Comparison — agrees: The complete ordered byline matches the independent PDF transcription.

### A081 — byline

**supported** — Authors transcribed from the specified PDF byline in printed order; contribution markers omitted.

Rico Sennrich; Barry Haddow; Alexandra Birch.

- [https://arxiv.org/pdf/1508.07909v1](https://arxiv.org/pdf/1508.07909v1) — arXiv v1 PDF independently retrieved 2026-10-30; PDF p. 1, byline

Comparison — agrees: The complete ordered byline matches the independent PDF transcription.

### A082 — byline

**supported** — Authors transcribed from the specified PDF byline in printed order; contribution markers omitted.

Dan Hendrycks; Collin Burns; Steven Basart; Andy Zou; Mantas Mazeika; Dawn Song; Jacob Steinhardt.

- [https://arxiv.org/pdf/2009.03300v1](https://arxiv.org/pdf/2009.03300v1) — arXiv v1 PDF independently retrieved 2026-10-30; PDF p. 1, byline

Comparison — agrees: The complete ordered byline matches the independent PDF transcription.

### A083 — byline

**supported** — Authors transcribed from the specified PDF byline in printed order; contribution markers omitted.

Nitish Srivastava; Geoffrey Hinton; Alex Krizhevsky; Ilya Sutskever; Ruslan Salakhutdinov.

- [https://jmlr.org/papers/volume15/srivastava14a/srivastava14a.pdf](https://jmlr.org/papers/volume15/srivastava14a/srivastava14a.pdf) — Specified PDF independently retrieved 2026-10-30; PDF p. 1, byline

Comparison — agrees: The complete ordered byline matches the independent PDF transcription.

### A084 — byline

**supported** — Authors transcribed from the specified PDF byline in printed order; contribution markers omitted.

Jianlin Su; Yu Lu; Shengfeng Pan; Bo Wen; Yunfeng Liu.

- [https://arxiv.org/pdf/2104.09864v1](https://arxiv.org/pdf/2104.09864v1) — arXiv v1 PDF independently retrieved 2026-10-30; PDF p. 1, byline; The original PDF page was also rendered and visually checked after comparison; the independent printed-name answer was already in the blind checkpoint.

Limits: This is the five-name v1 byline; later versions must not replace it.

Comparison — differs: The v1 PDF prints Bo Wen between Shengfeng Pan and Yunfeng Liu; the pack omits that author and flags Wen Bo as unmatched. No identity merge with the index form is established.

### A085 — byline

**supported** — Authors transcribed from the specified PDF byline in printed order; contribution markers omitted.

Long Ouyang; Jeff Wu; Xu Jiang; Diogo Almeida; Carroll L. Wainwright; Pamela Mishkin; Chong Zhang; Sandhini Agarwal; Katarina Slama; Alex Ray; John Schulman; Jacob Hilton; Fraser Kelton; Luke Miller; Maddie Simens; Amanda Askell; Peter Welinder; Paul Christiano; Jan Leike; Ryan Lowe.

- [https://arxiv.org/pdf/2203.02155v1](https://arxiv.org/pdf/2203.02155v1) — arXiv v1 PDF independently retrieved 2026-10-30; PDF p. 1, byline

Comparison — agrees: The complete ordered byline matches the independent PDF transcription.

### A086 — byline

**supported** — Authors transcribed from the specified PDF byline in printed order; contribution markers omitted.

Tomas Mikolov; Kai Chen; Greg Corrado; Jeffrey Dean.

- [https://arxiv.org/pdf/1301.3781v1](https://arxiv.org/pdf/1301.3781v1) — arXiv v1 PDF independently retrieved 2026-10-30; PDF p. 1, byline

Comparison — agrees: The complete ordered byline matches the independent PDF transcription.

### A087 — byline

**supported** — Authors transcribed from the specified PDF byline in printed order; contribution markers omitted.

Yuntao Bai; Saurav Kadavath; Sandipan Kundu; Amanda Askell; Jackson Kernion; Andy Jones; Anna Chen; Anna Goldie; Azalia Mirhoseini; Cameron McKinnon; Carol Chen; Catherine Olsson; Christopher Olah; Danny Hernandez; Dawn Drain; Deep Ganguli; Dustin Li; Eli Tran-Johnson; Ethan Perez; Jamie Kerr; Jared Mueller; Jeffrey Ladish; Joshua Landau; Kamal Ndousse; Kamile Lukosuite; Liane Lovitt; Michael Sellitto; Nelson Elhage; Nicholas Schiefer; Noemi Mercado; Nova DasSarma; Robert Lasenby; Robin Larson; Sam Ringer; Scott Johnston; Shauna Kravec; Sheer El Showk; Stanislav Fort; Tamera Lanham; Timothy Telleen-Lawton; Tom Conerly; Tom Henighan; Tristan Hume; Samuel R. Bowman; Zac Hatfield-Dodds; Ben Mann; Dario Amodei; Nicholas Joseph; Sam McCandlish; Tom Brown; Jared Kaplan.

- [https://arxiv.org/pdf/2212.08073v1](https://arxiv.org/pdf/2212.08073v1) — arXiv v1 PDF independently retrieved 2026-10-30; PDF p. 1, byline; The original PDF page was also rendered and visually checked after comparison; the independent printed-name answer was already in the blind checkpoint.

Comparison — differs: The v1 PDF prints Kamile Lukosuite after Kamal Ndousse; the pack omits that literal form while flagging the accented index form. No identity merge is established.

### A088 — byline

**supported** — Authors transcribed from the specified PDF byline in printed order; contribution markers omitted.

Peter Clark; Isaac Cowhey; Oren Etzioni; Tushar Khot; Ashish Sabharwal; Carissa Schoenick; Oyvind Tafjord.

- [https://arxiv.org/pdf/1803.05457v1](https://arxiv.org/pdf/1803.05457v1) — arXiv v1 PDF independently retrieved 2026-10-30; PDF p. 1, byline

Comparison — agrees: The complete ordered byline matches the independent PDF transcription.

### A089 — byline

**supported** — Authors transcribed from the specified PDF byline in printed order; contribution markers omitted.

Dan Hendrycks; Collin Burns; Saurav Kadavath; Akul Arora; Steven Basart; Eric Tang; Dawn Song; Jacob Steinhardt.

- [https://arxiv.org/pdf/2103.03874v1](https://arxiv.org/pdf/2103.03874v1) — arXiv v1 PDF independently retrieved 2026-10-30; PDF p. 1, byline

Comparison — agrees: The complete ordered byline matches the independent PDF transcription.

### A090 — byline

**supported** — Authors transcribed from the specified PDF byline in printed order; contribution markers omitted.

Ashish Vaswani; Noam Shazeer; Niki Parmar; Jakob Uszkoreit; Llion Jones; Aidan N. Gomez; Łukasz Kaiser; Illia Polosukhin.

- [https://arxiv.org/pdf/1706.03762v1](https://arxiv.org/pdf/1706.03762v1) — arXiv v1 PDF independently retrieved 2026-10-30; PDF p. 1, byline

Comparison — agrees: The complete ordered byline matches the independent PDF transcription.

### B001 — attribution

**partly supported** — The footnote expressly credits Bostrom and the reference entry names Superintelligence; the statement omits coauthor Stuart Armstrong.

Passage: yes. Target work: Superintelligence: Paths, Dangers, Strategies.

- [https://intelligence.org/files/Corrigibility.pdf](https://intelligence.org/files/Corrigibility.pdf) — retrieved 2026-10-30; PDF p. 1, footnote 2; References, Bostrom 2014 entry

Comparison — qualified agreement: The attribution and reference entry agree, but the abbreviated author list omits Stuart Armstrong.

### B002 — attribution

**partly supported** — The introduction expressly credits Omohundro and the reference entry names The Basic AI Drives; the statement omits coauthor Stuart Armstrong.

Passage: yes after joining the line-broken goal-content integrity. Target work: The Basic AI Drives.

- [https://intelligence.org/files/Corrigibility.pdf](https://intelligence.org/files/Corrigibility.pdf) — retrieved 2026-10-30; PDF p. 1, introduction; References, Omohundro 2008 entry

Comparison — qualified agreement: The attribution and reference entry agree, but the abbreviated author list omits Stuart Armstrong.

### B003 — attribution

**supported** — The passage and Bostrom reference are present; the surrounding text distinguishes the editors' attribution from their account of Francois's comment.

Passage: yes after layout normalization. Target work: Superintelligence: Paths, Dangers, Strategies.

- [https://www.nber.org/system/files/chapters/c14005/c14005.pdf](https://www.nber.org/system/files/chapters/c14005/c14005.pdf) — retrieved 2026-10-30; PDF p. 10 / printed p. 9; References, Bostrom 2014 entry

Comparison — agrees: The named passage and target work support the statement as an attribution or attributed summary; no causal influence is inferred.

### B004 — attribution

**supported** — Gans quotes the control-problem definition with Bostrom (2014), p. 128, and identifies the book in References.

Passage: yes after joining line breaks; the source has an unusual closing-style opening quotation mark. Target work: Superintelligence: Paths, Dangers, Strategies.

- [https://www.nber.org/system/files/working_papers/w24352/w24352.pdf](https://www.nber.org/system/files/working_papers/w24352/w24352.pdf) — retrieved 2026-10-30; PDF p. 3, introduction; References, Bostrom 2014 entry

Comparison — agrees: The named passage and target work support the statement as an attribution or attributed summary; no causal influence is inferred.

### B005 — attribution

**supported** — The opening explicitly attributes the concerns to Bostrom while calling them controversial; References identifies the book.

Passage: yes after joining the line-broken controversial. Target work: Superintelligence: Paths, Dangers, Strategies.

- [https://www.nber.org/system/files/working_papers/w31924/w31924.pdf](https://www.nber.org/system/files/working_papers/w31924/w31924.pdf) — retrieved 2026-10-30; PDF p. 3, introduction; References, Bostrom 2014 entry

Comparison — agrees: The named passage and target work support the statement as an attribution or attributed summary; no causal influence is inferred.

### B006 — attribution

**supported** — The scenario explicitly cites Omohundro for instrumental basic drives and the reference entry identifies the named paper.

Passage: yes after layout normalization. Target work: The Basic AI Drives.

- [https://www.nber.org/system/files/working_papers/w24174/w24174.pdf](https://www.nber.org/system/files/working_papers/w24174/w24174.pdf) — retrieved 2026-10-30; PDF p. 36, second scenario; References, Omohundro 2008 entry

Comparison — agrees: The named passage and target work support the statement as an attribution or attributed summary; no causal influence is inferred.

### B007 — attribution

**supported** — The footnote attributes the 47% warning to Frey and Osborne (2017); its reference entry names the employment paper.

Passage: yes after normalizing PDF spacing around the AI-related hyphen. Target work: The Future of Employment: How Susceptible Are Jobs to Computerisation?.

- [https://www.nber.org/system/files/working_papers/w24174/w24174.pdf](https://www.nber.org/system/files/working_papers/w24174/w24174.pdf) — retrieved 2026-10-30; PDF p. 3, footnote 2; References, Frey and Osborne 2017 entry

Comparison — agrees: The named passage and target work support the statement as an attribution or attributed summary; no causal influence is inferred.

### B008 — attribution

**supported** — Loosemore names Omohundro's paper in the passage and then disputes the efficiency argument.

Passage: yes. Target work: The Basic AI Drives.

- [https://www.lesswrong.com/posts/hjGe3Er6Km4W6rWZv/debunking-fallacies-in-the-theory-of-ai-motivation](https://www.lesswrong.com/posts/hjGe3Er6Km4W6rWZv/debunking-fallacies-in-the-theory-of-ai-motivation) — retrieved 2026-10-30; Section Omohundro's Basic AI Drives, opening paragraph and following criticism

Comparison — agrees: The named passage and target work support the statement as an attribution or attributed summary; no causal influence is inferred.

### B009 — attribution

**supported** — The live page supports the explicitly labelled paraphrase and names Yudkowsky's draft chapter; it is not a verbatim quotation.

Passage: explicit paraphrase. Target work: Artificial Intelligence as a Positive and Negative Factor in Global Risk.

- [https://www.ssec.wisc.edu/~billh/g/AIRisk_Reply.html](https://www.ssec.wisc.edu/~billh/g/AIRisk_Reply.html) — retrieved 2026-10-30; Heading, year and opening paragraph

Comparison — qualified agreement: The labelled paraphrase is fair; the generic verbatim answer is inapplicable. The source concerns a draft, not an independently verified published-chapter passage.

### B010 — attribution

**partly supported** — The quotation and Autor reference are verified in the October 2018 revision; they are absent from the inspected original 2015 copy.

Passage: yes in the October 2018 revision. Target work: Why Are There Still So Many Jobs? The History and Future of Workplace Automation.

Date the wording to the October 2018 revision, not the original February 2015 paper.

- [https://www.nber.org/system/files/working_papers/w20941/w20941.pdf](https://www.nber.org/system/files/working_papers/w20941/w20941.pdf) — retrieved 2026-10-30; Title page; PDF p. 7; References, Autor 2015 entry
- [https://web.archive.org/web/20180602064521id_/http://www.nber.org/papers/w20941.pdf](https://web.archive.org/web/20180602064521id_/http://www.nber.org/papers/w20941.pdf) — Wayback capture 20180602064521; final URL matched the requested capture; Title page and whole-document text search
- [https://web.archive.org/web/20190511044007id_/https://www.nber.org/papers/w20941.pdf](https://web.archive.org/web/20190511044007id_/https://www.nber.org/papers/w20941.pdf) — Wayback capture 20190511044007; final URL matched the requested capture; Title page; PDF p. 7

Limits: These are the earliest located captures inspected in this bounded archive search; no assertion of earliest composition. The positive capture date and the PDF revision label are different date kinds; the checked capture does not independently prove composition in October 2018.

Comparison — qualified agreement: The quotation is present in the later revision. Direct archive checks independently corroborate audit.md revision qualification; the generic verdict string alone omits that temporal condition.

### B011 — attribution

**partly supported** — Both the attribution and cited paper are verified in the October 2018 revision; the inspected original copy lacks this passage.

Passage: yes after layout normalization. Target work: Artificial Intelligence and Economic Growth.

The wording is supported for the October 2018 revision, not the February 2015 original.

- [https://www.nber.org/system/files/working_papers/w20941/w20941.pdf](https://www.nber.org/system/files/working_papers/w20941/w20941.pdf) — retrieved 2026-10-30; Title page; PDF p. 6; References, Aghion, Jones and Jones entry

Limits: Both archived PDFs were retrieved directly and their final URLs matched the requested timestamps. The earliest located later copy inspected is the May 2019 capture, labelled Revised October 2018. The positive capture date and the PDF revision label are different date kinds; the checked capture does not independently prove composition in October 2018.

Comparison — qualified agreement: The quotation is present in the later revision. Direct archive checks independently corroborate audit.md revision qualification; the generic verdict string alone omits that temporal condition.

### B012 — attribution

**supported** — Clancy explicitly credits the three authors for the model he sketches; endnote 3 identifies their exact chapter.

Passage: yes after layout normalization. Target work: Artificial Intelligence and Economic Growth.

- [https://asteriskmag.com/issues/03/the-great-inflection-a-debate-about-ai-and-explosive-growth](https://asteriskmag.com/issues/03/the-great-inflection-a-debate-about-ai-and-explosive-growth) — retrieved 2026-10-30; Clancy's reply, verbal model sketch; endnote 3

Comparison — agrees: The named passage and target work support the statement as an attribution or attributed summary; no causal influence is inferred.

### B013 — attribution

**supported** — The discussion attributes the failed tests to Nordhaus (2015), and the reference entry identifies the NBER working paper.

Passage: yes after layout normalization. Target work: Are We Approaching an Economic Singularity? Information Technology and the Future of Economic Growth.

- [https://www.nber.org/system/files/working_papers/w24001/w24001.pdf](https://www.nber.org/system/files/working_papers/w24001/w24001.pdf) — retrieved 2026-10-30; PDF p. 8; References, Nordhaus 2015 entry

Comparison — agrees: The named passage and target work support the statement as an attribution or attributed summary; no causal influence is inferred.

### B014 — attribution

**supported** — The specified v1 passage cites OpenAI 2023b; its reference entry identifies the technical report rather than the system card.

Passage: yes after layout normalization. Target work: GPT-4 Technical Report.

- [https://arxiv.org/pdf/2303.10130v1](https://arxiv.org/pdf/2303.10130v1) — retrieved 2026-10-30; PDF p. 9, section 3.4.2; References, OpenAI 2023a and 2023b entries

Comparison — agrees: The named passage and target work support the statement as an attribution or attributed summary; no causal influence is inferred.

### B015 — attribution

**supported** — The reprint explicitly credits Good for the expression and its References names the chapter.

Passage: yes after layout normalization. Target work: Speculations Concerning the First Ultraintelligent Machine.

- [https://intelligence.org/files/AIPosNegFactor.pdf](https://intelligence.org/files/AIPosNegFactor.pdf) — retrieved 2026-10-30; PDF p. 19, section 8; References, Good 1965 entry

Limits: This verifies the reprint's wording. It does not establish that the unchanged passage appears in the original 2008 book printing. The cited 1965 year remains the citing document's year, separate from A018's publisher-metadata conflict.

Comparison — qualified agreement: The attribution agrees for the changed, undated MIRI reprint, consistent with the audit warning; the original book wording was not checked.

### B016 — attribution

**supported** — Nordhaus expressly credits Good and quotes the invention argument; the reference entry identifies the named chapter.

Passage: yes after layout normalization. Target work: Speculations Concerning the First Ultraintelligent Machine.

- [https://www.nber.org/system/files/working_papers/w21547/w21547.pdf](https://www.nber.org/system/files/working_papers/w21547/w21547.pdf) — retrieved 2026-10-30; PDF p. 8, section II; References, Good 1965 entry

Comparison — agrees: The named passage and target work support the statement as an attribution or attributed summary; no causal influence is inferred.

### B017 — attribution

**supported** — The cited method and percentage are attributed to Frey and Osborne and the reference entry matches the employment paper.

Passage: yes after layout normalization. Target work: The Future of Employment: How Susceptible Are Jobs to Computerisation?.

- [https://www.nber.org/system/files/working_papers/w24689/w24689.pdf](https://www.nber.org/system/files/working_papers/w24689/w24689.pdf) — retrieved 2026-10-30; PDF p. 15, section 2.3; continuation on p. 16; References, Frey and Osborne 2017 entry

Comparison — agrees: The named passage and target work support the statement as an attribution or attributed summary; no causal influence is inferred.

### B018 — attribution

**supported** — The introduction explicitly connects its objective-specification discussion to dangers described in Bostrom's book.

Passage: yes after normalizing the italic span's extra space before its comma. Target work: Superintelligence: Paths, Dangers, Strategies.

- [https://intelligence.org/files/AlignmentMachineLearning.pdf](https://intelligence.org/files/AlignmentMachineLearning.pdf) — retrieved 2026-10-30; PDF p. 2, introduction; References, Bostrom 2014 entry

Comparison — agrees: The named passage and target work support the statement as an attribution or attributed summary; no causal influence is inferred.

### B019 — attribution

**supported** — Leike et al. explicitly credit Irving et al. for the complexity analogy and their reference identifies AI safety via debate.

Passage: yes after layout normalization. Target work: AI safety via debate.

- [https://arxiv.org/pdf/1811.07871v1](https://arxiv.org/pdf/1811.07871v1) — retrieved 2026-10-30; PDF p. 9, section 3.2; References, Irving, Christiano and Amodei 2018 entry

Comparison — agrees: The named passage and target work support the statement as an attribution or attributed summary; no causal influence is inferred.

### B020 — attribution

**supported** — The introduction expressly says it builds on earlier taxonomies; the citation group and reference list include Concrete Problems in AI Safety.

Passage: yes after layout normalization. Target work: Concrete Problems in AI Safety.

- [https://arxiv.org/pdf/1811.07871v1](https://arxiv.org/pdf/1811.07871v1) — retrieved 2026-10-30; PDF p. 1, introduction, with continuation on p. 2; References, Amodei et al. 2016 entry

Comparison — agrees: The named passage and target work support the statement as an attribution or attributed summary; no causal influence is inferred.

### B021 — attribution

**supported** — The related-work passage credits Christiano et al. alongside Ibarz et al., and References identifies the preferences paper.

Passage: yes after layout normalization. Target work: Deep reinforcement learning from human preferences.

- [https://arxiv.org/pdf/2203.02155v1](https://arxiv.org/pdf/2203.02155v1) — retrieved 2026-10-30; PDF p. 4, related work; References, Christiano et al. 2017 entry

Comparison — agrees: The named passage and target work support the statement as an attribution or attributed summary; no causal influence is inferred.

### B022 — attribution

**supported** — The quoted conclusion is expressly attributed to Kaplan et al.; the next sentence preserves agreement on stopping early and disagreement on token allocation.

Passage: yes after layout normalization. Target work: Scaling Laws for Neural Language Models.

- [https://arxiv.org/pdf/2203.15556v1](https://arxiv.org/pdf/2203.15556v1) — retrieved 2026-10-30; PDF p. 1, introduction; References, Kaplan et al. 2020 entry

Comparison — agrees: The named passage and target work support the statement as an attribution or attributed summary; no causal influence is inferred.

### B023 — attribution

**supported** — The quoted finding is attributed to Rae et al.; the reference on PDF p. 19 identifies the Gopher paper.

Passage: yes after layout normalization. Target work: Scaling Language Models: Methods, Analysis & Insights from Training Gopher.

- [https://arxiv.org/pdf/2203.15556v1](https://arxiv.org/pdf/2203.15556v1) — retrieved 2026-10-30; PDF p. 14, section 4.2.7; References, PDF p. 19

Comparison — agrees: The named passage and target work support the statement as an attribution or attributed summary; no causal influence is inferred.

### B024 — attribution

**supported** — Section 10.1(b)(iv) expressly says the practices are derived from the two named frameworks.

Passage: yes after layout normalization. Target work: NIST AI Risk Management Framework.

- [https://www.govinfo.gov/content/pkg/FR-2023-11-01/pdf/2023-24283.pdf](https://www.govinfo.gov/content/pkg/FR-2023-11-01/pdf/2023-24283.pdf) — retrieved 2026-10-30; PDF p. 28 / Federal Register p. 75218, section 10.1(b)(iv)

Comparison — agrees: The named passage and target work support the statement as an attribution or attributed summary; no causal influence is inferred.

### B025 — attribution

**supported** — The introduction says it builds on the AI RMF; endnote 3 identifies NIST's framework resource.

Passage: wording matches; superscript 3 and printed line numbers are layout, not prose. Target work: NIST AI Risk Management Framework.

- [https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.800-1.ipd.pdf](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.800-1.ipd.pdf) — retrieved 2026-10-30; PDF p. 5, introduction, lines 16–17; endnote 3 on PDF p. 25

Comparison — agrees: The named passage and target work support the statement as an attribution or attributed summary; no causal influence is inferred.

### B026 — attribution

**partly supported** — The expressly labelled paraphrase matches the PDF's standards paragraph; the document names the NIST AI RMF without an explicit 1.0 version label.

Passage: explicit paraphrase. Target work: NIST AI Risk Management Framework.

The supplied UUID PDF was read; a May 2026 edition date was not independently established from its text.

- [https://cdn.openai.com/pdf/e37d949b-8c9f-4d76-b99e-4272f4631a7e/openai-frontier-governance-framework.pdf](https://cdn.openai.com/pdf/e37d949b-8c9f-4d76-b99e-4272f4631a7e/openai-frontier-governance-framework.pdf) — retrieved 2026-10-30; PDF p. 4 / printed p. 02, concluding introduction paragraph

Limits: The content attribution is supported; preserve uncertainty about the supplied edition date and the unprinted AI RMF version.

Comparison — qualified agreement: The labelled paraphrase is fair; the generic verbatim answer is inapplicable. The May 2026 edition date and a 1.0 version label were not established from the PDF text.

### B027 — quotation

**supported** — The exact size/comparison passage is present; the statement attributes the comparison to the paper.

Passage: yes after PDF layout normalization.

- [https://arxiv.org/pdf/2005.14165v1](https://arxiv.org/pdf/2005.14165v1) — retrieved 2026-10-30; PDF p. 1, abstract

Comparison — agrees: The specified passage is present after the stated layout normalization; the project statement is a fair attributed account, including any qualified priority claim.

### B028 — quotation

**supported** — The abstract contains the quoted priority language; the statement expressly attributes it to the paper.

Passage: yes after PDF layout normalization.

- [https://arxiv.org/pdf/2305.08322v1](https://arxiv.org/pdf/2305.08322v1) — retrieved 2026-10-30; PDF p. 1, abstract

Comparison — agrees: The specified passage is present after the stated layout normalization; the project statement is a fair attributed account, including any qualified priority claim.

### B029 — quotation

**supported** — The publisher abstract contains the passage; the project statement attributes its priority claim to the paper.

Passage: yes in the publisher abstract as retrieved through its official search result.

- [https://doi.org/10.1038/nature14236](https://doi.org/10.1038/nature14236) — retrieved 2026-10-30; Publisher abstract, official indexed page retrieved 2026-10-30

Retrieval failures: https://www.nature.com/articles/nature14236: Cookie/identity redirect. The complete relevant official publisher abstract was inspected through the publisher search result.

Comparison — agrees: The specified passage is present after the stated layout normalization; the project statement is a fair attributed account, including any qualified priority claim.

### B030 — quotation

**supported** — The v1 abstract contains the quotation and the statement preserves its knowledge qualifier, dataset context and cited performance figure.

Passage: yes after PDF layout normalization.

- [https://arxiv.org/pdf/1502.01852v1](https://arxiv.org/pdf/1502.01852v1) — retrieved 2026-10-30; PDF p. 1, abstract

Comparison — agrees: The specified passage is present after the stated layout normalization; the project statement is a fair attributed account, including any qualified priority claim.

### B031 — quotation

**supported** — The introduction describes XGBoost as a scalable tree-boosting system. The attributed statement is fair.

Passage: yes after PDF layout normalization.

- [https://arxiv.org/pdf/1603.02754v1](https://arxiv.org/pdf/1603.02754v1) — retrieved 2026-10-30; arXiv v1, PDF p. 1, §1 Introduction, para. 3

Comparison — agrees: The specified passage is present after the stated layout normalization; the project statement is a fair attributed account, including any qualified priority claim.

### B032 — quotation

**supported** — The abstract introduces physical commonsense reasoning and the PIQA dataset. The attributed statement is fair.

Passage: yes after PDF layout normalization.

- [https://arxiv.org/pdf/1911.11641v1](https://arxiv.org/pdf/1911.11641v1) — retrieved 2026-10-30; arXiv v1, PDF p. 1, abstract

Comparison — agrees: The specified passage is present after the stated layout normalization; the project statement is a fair attributed account, including any qualified priority claim.

### B033 — quotation

**supported** — The March 2017 NBER copy's abstract states the 1990–2007 US labor-market study. The attributed statement is fair.

Passage: yes after PDF layout normalization.

- [https://www.nber.org/system/files/working_papers/w23285/w23285.pdf](https://www.nber.org/system/files/working_papers/w23285/w23285.pdf) — retrieved 2026-10-30; NBER Working Paper 23285 (March 2017), PDF p. 2, abstract

Comparison — agrees: The specified passage is present after the stated layout normalization; the project statement is a fair attributed account, including any qualified priority claim.

### B034 — quotation

**supported** — The introductory RoBERTa passage and its attributed training-recipe account match v1. The attributed statement is fair.

Passage: yes after PDF layout normalization.

- [https://arxiv.org/pdf/1907.11692v1](https://arxiv.org/pdf/1907.11692v1) — retrieved 2026-10-30; arXiv v1, PDF p. 1, §1 Introduction, para. 2

Comparison — agrees: The specified passage is present after the stated layout normalization; the project statement is a fair attributed account, including any qualified priority claim.

### B035 — quotation

**supported** — The abstract outlines reward modeling as a research direction; no demonstrated solution is asserted. The attributed statement is fair.

Passage: yes after PDF layout normalization.

- [https://arxiv.org/pdf/1811.07871v1](https://arxiv.org/pdf/1811.07871v1) — retrieved 2026-10-30; arXiv v1, PDF p. 1, abstract

Limits: Normalize the typographic space before the colon after reward modeling.

Comparison — agrees: The specified passage is present after the stated layout normalization; the project statement is a fair attributed account, including any qualified priority claim.

### B036 — quotation

**supported** — The abstract describes randomly dropping units and connections during training. The attributed statement is fair.

Passage: yes after PDF layout normalization.

- [https://jmlr.org/papers/volume15/srivastava14a/srivastava14a.pdf](https://jmlr.org/papers/volume15/srivastava14a/srivastava14a.pdf) — retrieved 2026-10-30; PDF p. 1, abstract

Comparison — agrees: The specified passage is present after the stated layout normalization; the project statement is a fair attributed account, including any qualified priority claim.

### B037 — quotation

**supported** — The abstract defines internal covariate shift and addresses it by normalizing layer inputs. The attributed statement is fair.

Passage: yes after PDF layout normalization.

- [https://arxiv.org/pdf/1502.03167v1](https://arxiv.org/pdf/1502.03167v1) — retrieved 2026-10-30; arXiv v1, PDF p. 1, abstract

Limits: Italic spans and line wrapping introduce extraction spaces; the words match.

Comparison — agrees: The specified passage is present after the stated layout normalization; the project statement is a fair attributed account, including any qualified priority claim.

### B038 — quotation

**supported** — The abstract reports equal scaling of model size and token count from the training study. The attributed statement is fair.

Passage: yes after PDF layout normalization.

- [https://arxiv.org/pdf/2203.15556v1](https://arxiv.org/pdf/2203.15556v1) — retrieved 2026-10-30; arXiv v1, PDF p. 1, abstract

Limits: Join the line-broken compute-optimal and retain the printed hyphen.

Comparison — agrees: The specified passage is present after the stated layout normalization; the project statement is a fair attributed account, including any qualified priority claim.

### B039 — quotation

**supported** — The abstract proposes PReLU as a generalization of the rectified unit. The attributed statement is fair.

Passage: yes after PDF layout normalization.

- [https://arxiv.org/pdf/1502.01852v1](https://arxiv.org/pdf/1502.01852v1) — retrieved 2026-10-30; arXiv v1, PDF p. 1, abstract

Comparison — agrees: The specified passage is present after the stated layout normalization; the project statement is a fair attributed account, including any qualified priority claim.

### B040 — quotation

**supported** — The abstract names the 244M–137B models, Python benchmarks, and two evaluation regimes. The attributed statement is fair.

Passage: yes after PDF layout normalization.

- [https://arxiv.org/pdf/2108.07732v1](https://arxiv.org/pdf/2108.07732v1) — retrieved 2026-10-30; arXiv v1, PDF p. 1, abstract

Comparison — agrees: The specified passage is present after the stated layout normalization; the project statement is a fair attributed account, including any qualified priority claim.

### B041 — quotation

**supported** — The abstract introduces CMMLU and its subject scope; comprehensiveness stays attributed. The attributed statement is fair.

Passage: yes after PDF layout normalization.

- [https://arxiv.org/pdf/2306.09212v1](https://arxiv.org/pdf/2306.09212v1) — retrieved 2026-10-30; arXiv v1, PDF p. 1, abstract

Comparison — agrees: The specified passage is present after the stated layout normalization; the project statement is a fair attributed account, including any qualified priority claim.

### B042 — quotation

**supported** — The abstract defines the 23-task BBH suite and studies chain-of-thought prompting on it. The attributed statement is fair.

Passage: yes after PDF layout normalization.

- [https://arxiv.org/pdf/2210.09261v1](https://arxiv.org/pdf/2210.09261v1) — retrieved 2026-10-30; arXiv v1, PDF p. 1, abstract

Limits: Normalize small-cap/italic spacing around BBH.

Comparison — agrees: The specified passage is present after the stated layout normalization; the project statement is a fair attributed account, including any qualified priority claim.

### B043 — quotation

**supported** — The preceding abstract sentence identifies the three MoE problems addressed by the method. The attributed statement is fair.

Passage: yes after PDF layout normalization.

- [https://arxiv.org/pdf/2101.03961v1](https://arxiv.org/pdf/2101.03961v1) — retrieved 2026-10-30; arXiv v1, PDF p. 1, abstract

Comparison — agrees: The specified passage is present after the stated layout normalization; the project statement is a fair attributed account, including any qualified priority claim.

### B044 — quotation

**supported** — The abstract states the empirical scaling-law study and its cross-entropy measure. The attributed statement is fair.

Passage: yes after PDF layout normalization.

- [https://arxiv.org/pdf/2001.08361v1](https://arxiv.org/pdf/2001.08361v1) — retrieved 2026-10-30; arXiv v1, PDF p. 1, abstract

Comparison — agrees: The specified passage is present after the stated layout normalization; the project statement is a fair attributed account, including any qualified priority claim.

### B045 — quotation

**supported** — The research-community release is the authors' statement, preserved as such. The attributed statement is fair.

Passage: yes after PDF layout normalization.

- [https://arxiv.org/pdf/2302.13971v1](https://arxiv.org/pdf/2302.13971v1) — retrieved 2026-10-30; arXiv v1, PDF p. 1, abstract

Limits: A statement of release is not an independent check of actual access or licence terms.

Comparison — agrees: The specified passage is present after the stated layout normalization; the project statement is a fair attributed account, including any qualified priority claim.

### B046 — quotation

**supported** — The specified v1 advocates local data and aggregated updates and names Federated Learning. The attributed statement is fair.

Passage: yes after PDF layout normalization.

- [https://arxiv.org/pdf/1602.05629v1](https://arxiv.org/pdf/1602.05629v1) — retrieved 2026-10-30; arXiv v1 (titled "Federated Learning of Deep Networks using Model Averaging"), PDF p. 1, abstract

Limits: The v1 title is Federated Learning of Deep Networks using Model Averaging; a later title is not substituted.

Comparison — agrees: The specified passage is present after the stated layout normalization; the project statement is a fair attributed account, including any qualified priority claim.

### B047 — quotation

**supported** — The abstract describes reasoning-focused questions and four-to-ten answer choices. The attributed statement is fair.

Passage: yes after PDF layout normalization.

- [https://arxiv.org/pdf/2406.01574v1](https://arxiv.org/pdf/2406.01574v1) — retrieved 2026-10-30; arXiv v1, PDF p. 1, abstract

Comparison — agrees: The specified passage is present after the stated layout normalization; the project statement is a fair attributed account, including any qualified priority claim.

### B048 — quotation

**supported** — The abstract proposes scaling depth, width and resolution with a compound coefficient. The attributed statement is fair.

Passage: yes after PDF layout normalization.

- [https://arxiv.org/pdf/1905.11946v1](https://arxiv.org/pdf/1905.11946v1) — retrieved 2026-10-30; arXiv v1, PDF p. 1, abstract

Limits: Normalize the italic-span space before the full stop.

Comparison — agrees: The specified passage is present after the stated layout normalization; the project statement is a fair attributed account, including any qualified priority claim.

### B049 — quotation

**supported** — The abstract introduces visual localization for CNN predictions and names Grad-CAM. The attributed statement is fair.

Passage: yes after PDF layout normalization.

- [https://arxiv.org/pdf/1610.02391v1](https://arxiv.org/pdf/1610.02391v1) — retrieved 2026-10-30; arXiv v1, PDF p. 1, abstract

Limits: Normalize the italic-span space before the full stop.

Comparison — agrees: The specified passage is present after the stated layout normalization; the project statement is a fair attributed account, including any qualified priority claim.

### B050 — quotation

**supported** — The v1 introduces WinoGrande and attributes its intended robustness to the authors. The attributed statement is fair.

Passage: yes after PDF layout normalization.

- [https://arxiv.org/pdf/1907.10641v1](https://arxiv.org/pdf/1907.10641v1) — retrieved 2026-10-30; arXiv v1, PDF p. 1, abstract

Limits: Small-cap WinoGrande appears spaced in extraction; the difference is typographic.

Comparison — agrees: The specified passage is present after the stated layout normalization; the project statement is a fair attributed account, including any qualified priority claim.

### B051 — quotation

**supported** — The v1 abstract presents self-consistency as an ensemble strategy and attributes the accuracy claim to its authors.

Passage: yes after PDF layout normalization.

- [https://arxiv.org/pdf/2203.11171v1](https://arxiv.org/pdf/2203.11171v1) — retrieved 2026-10-30; arXiv v1, PDF p. 1, abstract

Limits: PDF typography introduces extraction spaces around emphasized words, punctuation or the dash; the printed wording matches.

Comparison — agrees: The specified passage is present after the stated layout normalization; the project statement is a fair attributed account, including any qualified priority claim.

### B052 — quotation

**supported** — The v1 abstract states robustness to unbalanced/non-IID distributions as the authors' result.

Passage: yes after PDF layout normalization.

- [https://arxiv.org/pdf/1602.05629v1](https://arxiv.org/pdf/1602.05629v1) — retrieved 2026-10-30; arXiv v1 (titled "Federated Learning of Deep Networks using Model Averaging"), PDF p. 1, abstract

Limits: The checked v1 bears the earlier Federated Learning of Deep Networks using Model Averaging title.

Comparison — agrees: The specified passage is present after the stated layout normalization; the project statement is a fair attributed account, including any qualified priority claim.

### B053 — quotation

**supported** — The quoted method-generation sentence is present and the statement preserves attribution.

Passage: yes after PDF layout normalization.

- [https://arxiv.org/pdf/1412.6572v1](https://arxiv.org/pdf/1412.6572v1) — retrieved 2026-10-30; arXiv v1, PDF p. 1, abstract

Comparison — agrees: The specified passage is present after the stated layout normalization; the project statement is a fair attributed account, including any qualified priority claim.

### B054 — quotation

**supported** — The abstract proposes ASPP for multiple-scale segmentation, as the statement reports.

Passage: yes after PDF layout normalization.

- [https://arxiv.org/pdf/1606.00915v1](https://arxiv.org/pdf/1606.00915v1) — retrieved 2026-10-30; arXiv v1, PDF p. 1, abstract

Limits: PDF typography introduces extraction spaces around emphasized words, punctuation or the dash; the printed wording matches.

Comparison — agrees: The specified passage is present after the stated layout normalization; the project statement is a fair attributed account, including any qualified priority claim.

### B055 — quotation

**supported** — The abstract describes the Transformer with no recurrence/convolutions; the statement is a fair account of its architecture claim.

Passage: yes after PDF layout normalization.

- [https://arxiv.org/pdf/1706.03762v1](https://arxiv.org/pdf/1706.03762v1) — retrieved 2026-10-30; arXiv v1, PDF p. 1, abstract

Comparison — agrees: The specified passage is present after the stated layout normalization; the project statement is a fair attributed account, including any qualified priority claim.

### B056 — quotation

**supported** — The abstract proposes the two named algorithms, as the statement reports.

Passage: yes after PDF layout normalization.

- [https://arxiv.org/pdf/1603.02754v1](https://arxiv.org/pdf/1603.02754v1) — retrieved 2026-10-30; arXiv v1, PDF p. 1, abstract

Comparison — agrees: The specified passage is present after the stated layout normalization; the project statement is a fair attributed account, including any qualified priority claim.

### B057 — quotation

**supported** — The introduction identifies the fixed-vector bottleneck and the joint alignment/translation extension.

Passage: yes after PDF layout normalization.

- [https://arxiv.org/pdf/1409.0473v1](https://arxiv.org/pdf/1409.0473v1) — retrieved 2026-10-30; arXiv v1, PDF p. 1, §1 Introduction, para. 4

Comparison — agrees: The specified passage is present after the stated layout normalization; the project statement is a fair attributed account, including any qualified priority claim.

### B058 — quotation

**supported** — The abstract proposes a test for text-model multitask accuracy, as the statement reports.

Passage: yes after PDF layout normalization.

- [https://arxiv.org/pdf/2009.03300v1](https://arxiv.org/pdf/2009.03300v1) — retrieved 2026-10-30; arXiv v1, PDF p. 1, abstract

Comparison — agrees: The specified passage is present after the stated layout normalization; the project statement is a fair attributed account, including any qualified priority claim.

### B059 — quotation

**supported** — The abstract introduces SHAP and per-prediction feature importance, as the statement reports.

Passage: yes after PDF layout normalization.

- [https://arxiv.org/pdf/1705.07874v1](https://arxiv.org/pdf/1705.07874v1) — retrieved 2026-10-30; arXiv v1, PDF p. 1, abstract

Comparison — agrees: The specified passage is present after the stated layout normalization; the project statement is a fair attributed account, including any qualified priority claim.

### B060 — quotation

**supported** — The v1 abstract describes generated chains of thought and reports reasoning gains for sufficiently large models.

Passage: yes after PDF layout normalization.

- [https://arxiv.org/pdf/2201.11903v1](https://arxiv.org/pdf/2201.11903v1) — retrieved 2026-10-30; arXiv v1, PDF p. 1, abstract

Limits: PDF typography introduces extraction spaces around emphasized words, punctuation or the dash; the printed wording matches.

Comparison — agrees: The specified passage is present after the stated layout normalization; the project statement is a fair attributed account, including any qualified priority claim.

### B061 — count

**supported** — Each of the 18 listed documents contains a citation or named reference to this exact work.

Listed documents checked: 18. Literal citation/name matches: 18. Citations by other documents: 18.

- [Scaling Laws for Neural Language Models](https://arxiv.org/pdf/2001.08361v1) — arXiv v1; PDF p. 30, reference/mention for Attention Is All You Need
- [Training Compute-Optimal Large Language Models](https://arxiv.org/pdf/2203.15556v1) — arXiv v1; PDF p. 20, reference/mention for Attention Is All You Need
- [Learning to summarize from human feedback](https://arxiv.org/pdf/2009.01325v1) — arXiv v1; PDF p. 13, reference/mention for Attention Is All You Need
- [Supervising strong learners by amplifying weak experts](https://arxiv.org/pdf/1810.08575v1) — arXiv v1; PDF p. 9, reference/mention for Attention Is All You Need
- [Self-critiquing models for assisting human evaluators](https://arxiv.org/pdf/2206.05802v1) — arXiv v1; PDF p. 23, reference/mention for Attention Is All You Need
- [Highly accurate protein structure prediction with AlphaFold (2021)](https://www.ebi.ac.uk/europepmc/webservices/rest/PMC8371605/fullTextXML) — Copy independently retrieved 2026-10-30; References, 52
- [LLaMA (2023 paper)](https://arxiv.org/html/2302.13971v1) — arXiv v1; References, entry matching Attention Is All You Need
- [DeepSeek-V3 Technical Report](https://arxiv.org/html/2412.19437v1) — arXiv v1; References, entry matching Attention Is All You Need
- [Qwen Technical Report](https://arxiv.org/html/2309.16609v1) — arXiv v1; References, entry matching Attention Is All You Need
- [ChatGLM research history and techniques](https://arxiv.org/html/2406.12793v1) — arXiv v1; References, entry matching Attention Is All You Need
- [ERNIE 2.0: A Continual Pre-training Framework for Language Understanding](https://arxiv.org/pdf/1907.12412v1) — arXiv v1; PDF p. 10, reference/mention for Attention Is All You Need
- [ERNIE: Enhanced Representation through Knowledge Integration](https://arxiv.org/pdf/1904.09223v1) — arXiv v1; PDF p. 7, reference/mention for Attention Is All You Need
- [ERNIE 3.0 Titan: Exploring Larger-scale Knowledge Enhanced Pre-training for Language Understanding and Generation](https://arxiv.org/pdf/2112.12731v1) — arXiv v1; PDF p. 27, reference/mention for Attention Is All You Need
- [Kimi K2: Open Agentic Intelligence](https://arxiv.org/pdf/2507.20534v1) — arXiv v1; PDF p. 23, reference/mention for Attention Is All You Need
- [Kimi K3: Open Frontier Intelligence](https://raw.githubusercontent.com/MoonshotAI/Kimi-K3/0797decb18ab079de86f991b87a64b81ec15a3c2/k3_tech_report.pdf) — Copy independently retrieved 2026-10-30; PDF p. 39, reference/mention for Attention Is All You Need
- [Seed-X: Building Strong Multilingual Translation LLM with 7B Parameters](https://arxiv.org/pdf/2507.13618v1) — arXiv v1; PDF p. 14, reference/mention for Attention Is All You Need
- [Gemini: A Family of Highly Capable Multimodal Models](https://arxiv.org/pdf/2312.11805v1) — arXiv v1; PDF p. 33, reference/mention for Attention Is All You Need
- [Learning and Evaluating General Linguistic Intelligence (arXiv:1901.11373v1)](https://arxiv.org/pdf/1901.11373v1) — arXiv v1; PDF p. 14, reference/mention for Attention Is All You Need

Limits: Coverage is the supplied document list, not an exhaustive citation search. Unversioned live-copy wording is not automatically backdated to the document original.

Comparison — agrees: Each listed document was checked in its own text or visible citation link, with the target work identified. The count agrees on the supplied list.

### B062 — count

**supported** — Each of the 17 listed documents contains a citation or named reference to this exact work.

Listed documents checked: 17. Literal citation/name matches: 17. Citations by other documents: 17.

- [Training Compute-Optimal Large Language Models](https://arxiv.org/pdf/2203.15556v1) — arXiv v1; PDF p. 17, reference/mention for Language Models are Few-Shot Learners
- [Learning to summarize from human feedback](https://arxiv.org/pdf/2009.01325v1) — arXiv v1; PDF p. 11, reference/mention for Language Models are Few-Shot Learners
- [Training language models to follow instructions with human feedback](https://arxiv.org/pdf/2203.02155v1) — arXiv v1; PDF p. 22, reference/mention for Language Models are Few-Shot Learners
- [Self-critiquing models for assisting human evaluators](https://arxiv.org/pdf/2206.05802v1) — arXiv v1; PDF p. 20, reference/mention for Language Models are Few-Shot Learners
- [Weak-to-Strong Generalization: Eliciting Strong Capabilities With Weak Supervision](https://arxiv.org/pdf/2312.09390v1) — arXiv v1; PDF p. 20, reference/mention for Language Models are Few-Shot Learners
- [GPT-4 System Card](https://cdn.openai.com/papers/gpt-4-system-card.pdf) — Copy independently retrieved 2026-10-30; PDF p. 31, reference/mention for Language Models are Few-Shot Learners
- [LLaMA (2023 paper)](https://arxiv.org/html/2302.13971v1) — arXiv v1; References, entry matching Language Models are Few-Shot Learners
- [Qwen Technical Report](https://arxiv.org/html/2309.16609v1) — arXiv v1; References, entry matching Language Models are Few-Shot Learners
- [ChatGLM research history and techniques](https://arxiv.org/html/2406.12793v1) — arXiv v1; References, entry matching Language Models are Few-Shot Learners
- [Why AI alignment could be hard with modern deep learning](https://www.cold-takes.com/why-ai-alignment-could-be-hard-with-modern-deep-learning/) — Copy independently retrieved 2026-10-30; Body text, visible link to https://arxiv.org/abs/2005.14165
- [Without specific countermeasures, the easiest path to transformative AI likely leads to AI takeover](https://www.lesswrong.com/posts/pRkFkzwKZ2zfa3R6H/without-specific-countermeasures-the-easiest-path-to) — Copy independently retrieved 2026-10-30; Body text, visible link to https://arxiv.org/abs/2005.14165
- [GPTs are GPTs: An Early Look at the Labor Market Impact Potential of Large Language Models](https://arxiv.org/pdf/2303.10130v1) — arXiv v1; PDF p. 32, reference/mention for Language Models are Few-Shot Learners
- [ERNIE 3.0: Large-scale Knowledge Enhanced Pre-training for Language Understanding and Generation](https://arxiv.org/pdf/2107.02137v1) — arXiv v1; PDF p. 17, reference/mention for Language Models are Few-Shot Learners
- [ERNIE 3.0 Titan: Exploring Larger-scale Knowledge Enhanced Pre-training for Language Understanding and Generation](https://arxiv.org/pdf/2112.12731v1) — arXiv v1; PDF p. 23, reference/mention for Language Models are Few-Shot Learners
- [Seed-Thinking-v1.5: Advancing Superb Reasoning Models with Reinforcement Learning](https://arxiv.org/pdf/2504.13914v1) — arXiv v1; PDF p. 14, reference/mention for Language Models are Few-Shot Learners
- [Gemini: A Family of Highly Capable Multimodal Models](https://arxiv.org/pdf/2312.11805v1) — arXiv v1; PDF p. 25, reference/mention for Language Models are Few-Shot Learners
- [Evaluating Large Language Models Trained on Code (arXiv:2107.03374v1)](https://arxiv.org/pdf/2107.03374v1) — arXiv v1; PDF p. 15, reference/mention for Language Models are Few-Shot Learners

Limits: Coverage is the supplied document list, not an exhaustive citation search. Unversioned live-copy wording is not automatically backdated to the document original.

Comparison — agrees: Each listed document was checked in its own text or visible citation link, with the target work identified. The count agrees on the supplied list.

### B063 — count

**supported** — Each of the 16 listed documents contains a citation or named reference to this exact work.

Listed documents checked: 16. Literal citation/name matches: 16. Citations by other documents: 16.

- [Training language models to follow instructions with human feedback](https://arxiv.org/pdf/2203.02155v1) — arXiv v1; PDF p. 22, reference/mention for Evaluating Large Language Models Trained on Code
- [Self-critiquing models for assisting human evaluators](https://arxiv.org/pdf/2206.05802v1) — arXiv v1; PDF p. 21, reference/mention for Evaluating Large Language Models Trained on Code
- [GPT-4 System Card](https://cdn.openai.com/papers/gpt-4-system-card.pdf) — Copy independently retrieved 2026-10-30; PDF p. 31, reference/mention for Evaluating Large Language Models Trained on Code
- [Claude 2 model card](https://www-cdn.anthropic.com/bd2a28d2535bfb0494cc8e2a3bf135d2e7523226/Model-Card-Claude-2.pdf) — Copy independently retrieved 2026-10-30; PDF p. 13, reference/mention for Evaluating Large Language Models Trained on Code
- [Gemini — Google DeepMind research introduction (2023)](https://blog.google/innovation-and-ai/technology/ai/google-gemini-ai/) — Copy independently retrieved 2026-10-30; Body text, visible link to https://arxiv.org/abs/2107.03374
- [LLaMA (2023 paper)](https://arxiv.org/html/2302.13971v1) — arXiv v1; References, entry matching Evaluating Large Language Models Trained on Code
- [DeepSeek-V3 Technical Report](https://arxiv.org/html/2412.19437v1) — arXiv v1; References, entry matching Evaluating Large Language Models Trained on Code
- [DeepSeek-R1 research report](https://arxiv.org/html/2501.12948v1) — arXiv v1; References, entry matching Evaluating Large Language Models Trained on Code
- [Qwen Technical Report](https://arxiv.org/html/2309.16609v1) — arXiv v1; References, entry matching Evaluating Large Language Models Trained on Code
- [ChatGLM research history and techniques](https://arxiv.org/html/2406.12793v1) — arXiv v1; References, entry matching Evaluating Large Language Models Trained on Code
- [Meta Advanced AI Scaling Framework — Version 2](https://ai.meta.com/static-resource/Meta_Advanced-AI-Scaling-Framework-v2) — Copy independently retrieved 2026-10-30; PDF p. 28, reference/mention for Evaluating Large Language Models Trained on Code
- [GPTs are GPTs: An Early Look at the Labor Market Impact Potential of Large Language Models](https://arxiv.org/pdf/2303.10130v1) — arXiv v1; PDF p. 32, reference/mention for Evaluating Large Language Models Trained on Code
- [ERNIE 5.0 Technical Report](https://arxiv.org/pdf/2602.04705v1) — arXiv v1; PDF p. 29, reference/mention for Evaluating Large Language Models Trained on Code
- [Kimi K2: Open Agentic Intelligence](https://arxiv.org/pdf/2507.20534v1) — arXiv v1; PDF p. 21, reference/mention for Evaluating Large Language Models Trained on Code
- [Seed-Coder: Let the Code Model Curate Data for Itself](https://arxiv.org/pdf/2506.03524v1) — arXiv v1; PDF p. 35, reference/mention for Evaluating Large Language Models Trained on Code
- [Gemini: A Family of Highly Capable Multimodal Models](https://arxiv.org/pdf/2312.11805v1) — arXiv v1; PDF p. 25, reference/mention for Evaluating Large Language Models Trained on Code

Limits: Coverage is the supplied document list, not an exhaustive citation search. Unversioned live-copy wording is not automatically backdated to the document original.

Comparison — agrees: Each listed document was checked in its own text or visible citation link, with the target work identified. The count agrees on the supplied list.

### B064 — count

**supported** — Each of the 5 listed documents contains a citation or named reference to this exact work.

Listed documents checked: 5. Literal citation/name matches: 5. Citations by other documents: 5.

- [Training Compute-Optimal Large Language Models](https://arxiv.org/pdf/2203.15556v1) — arXiv v1; PDF p. 20, reference/mention for WinoGrande: An Adversarial Winograd Schema Challenge at Scale
- [LLaMA (2023 paper)](https://arxiv.org/html/2302.13971v1) — arXiv v1; References, entry matching WinoGrande: An Adversarial Winograd Schema Challenge at Scale
- [DeepSeek-V3 Technical Report](https://arxiv.org/html/2412.19437v1) — arXiv v1; References, entry matching WinoGrande: An Adversarial Winograd Schema Challenge at Scale
- [ERNIE 5.0 Technical Report](https://arxiv.org/pdf/2602.04705v1) — arXiv v1; PDF p. 34, reference/mention for WinoGrande: An Adversarial Winograd Schema Challenge at Scale
- [Kimi K2: Open Agentic Intelligence](https://arxiv.org/pdf/2507.20534v1) — arXiv v1; PDF p. 23, reference/mention for WinoGrande: An Adversarial Winograd Schema Challenge at Scale

Limits: Coverage is the supplied document list, not an exhaustive citation search. Unversioned live-copy wording is not automatically backdated to the document original.

Comparison — agrees: Each listed document was checked in its own text or visible citation link, with the target work identified. The count agrees on the supplied list.

### B065 — count

**supported** — Each of the 5 listed documents contains a citation or named reference to this exact work.

Listed documents checked: 5. Literal citation/name matches: 5. Citations by other documents: 5.

- [Training Compute-Optimal Large Language Models](https://arxiv.org/pdf/2203.15556v1) — arXiv v1; PDF p. 17, reference/mention for BoolQ: Exploring the Surprising Difficulty of Natural Yes/No Questions
- [Weak-to-Strong Generalization: Eliciting Strong Capabilities With Weak Supervision](https://arxiv.org/pdf/2312.09390v1) — arXiv v1; PDF p. 21, reference/mention for BoolQ: Exploring the Surprising Difficulty of Natural Yes/No Questions
- [LLaMA (2023 paper)](https://arxiv.org/html/2302.13971v1) — arXiv v1; References, entry matching BoolQ: Exploring the Surprising Difficulty of Natural Yes/No Questions
- [Qwen Technical Report](https://arxiv.org/html/2309.16609v1) — arXiv v1; References, entry matching BoolQ: Exploring the Surprising Difficulty of Natural Yes/No Questions
- [Gemini: A Family of Highly Capable Multimodal Models](https://arxiv.org/pdf/2312.11805v1) — arXiv v1; PDF p. 26, reference/mention for BoolQ: Exploring the Surprising Difficulty of Natural Yes/No Questions

Limits: Coverage is the supplied document list, not an exhaustive citation search. Unversioned live-copy wording is not automatically backdated to the document original.

Comparison — agrees: Each listed document was checked in its own text or visible citation link, with the target work identified. The count agrees on the supplied list.

### B066 — count

**supported** — Each of the 5 listed documents contains a citation or named reference to this exact work.

Listed documents checked: 5. Literal citation/name matches: 5. Citations by other documents: 5.

- [DeepSeek-V3 Technical Report](https://arxiv.org/html/2412.19437v1) — arXiv v1; References, entry matching C-Eval: A Multi-Level Multi-Discipline Chinese Evaluation Suite for Foundation Models
- [DeepSeek-R1 research report](https://arxiv.org/html/2501.12948v1) — arXiv v1; References, entry matching C-Eval: A Multi-Level Multi-Discipline Chinese Evaluation Suite for Foundation Models
- [Qwen Technical Report](https://arxiv.org/html/2309.16609v1) — arXiv v1; References, entry matching C-Eval: A Multi-Level Multi-Discipline Chinese Evaluation Suite for Foundation Models
- [ERNIE 5.0 Technical Report](https://arxiv.org/pdf/2602.04705v1) — arXiv v1; PDF p. 31, reference/mention for C-Eval: A Multi-Level Multi-Discipline Chinese Evaluation Suite for Foundation Models
- [Kimi K2: Open Agentic Intelligence](https://arxiv.org/pdf/2507.20534v1) — arXiv v1; PDF p. 22, reference/mention for C-Eval: A Multi-Level Multi-Discipline Chinese Evaluation Suite for Foundation Models

Limits: Coverage is the supplied document list, not an exhaustive citation search. Unversioned live-copy wording is not automatically backdated to the document original.

Comparison — agrees: Each listed document was checked in its own text or visible citation link, with the target work identified. The count agrees on the supplied list.

### B067 — count

**supported** — Each of the 5 listed documents contains a citation or named reference to this exact work.

Listed documents checked: 5. Literal citation/name matches: 5. Citations by other documents: 5.

- [Self-critiquing models for assisting human evaluators](https://arxiv.org/pdf/2206.05802v1) — arXiv v1; PDF p. 23, reference/mention for Chain-of-Thought Prompting Elicits Reasoning in Large Language Models
- [Qwen Technical Report](https://arxiv.org/html/2309.16609v1) — arXiv v1; References, entry matching Chain-of-Thought Prompting Elicits Reasoning in Large Language Models
- [ChatGLM research history and techniques](https://arxiv.org/html/2406.12793v1) — arXiv v1; References, entry matching Chain-of-Thought Prompting Elicits Reasoning in Large Language Models
- [Seed-Thinking-v1.5: Advancing Superb Reasoning Models with Reinforcement Learning](https://arxiv.org/pdf/2504.13914v1) — arXiv v1; PDF p. 14, reference/mention for Chain-of-Thought Prompting Elicits Reasoning in Large Language Models
- [Gemini: A Family of Highly Capable Multimodal Models](https://arxiv.org/pdf/2312.11805v1) — arXiv v1; PDF p. 33, reference/mention for Chain-of-Thought Prompting Elicits Reasoning in Large Language Models

Limits: Coverage is the supplied document list, not an exhaustive citation search. Unversioned live-copy wording is not automatically backdated to the document original.

Comparison — agrees: Each listed document was checked in its own text or visible citation link, with the target work identified. The count agrees on the supplied list.

### B068 — count

**supported** — Each of the 5 listed documents contains a citation or named reference to this exact work.

Listed documents checked: 5. Literal citation/name matches: 5. Citations by other documents: 5.

- [DeepSeek-V3 Technical Report](https://arxiv.org/html/2412.19437v1) — arXiv v1; References, entry matching CMMLU: Measuring massive multitask language understanding in Chinese
- [DeepSeek-R1 research report](https://arxiv.org/html/2501.12948v1) — arXiv v1; References, entry matching CMMLU: Measuring massive multitask language understanding in Chinese
- [Qwen Technical Report](https://arxiv.org/html/2309.16609v1) — arXiv v1; References, entry matching CMMLU: Measuring massive multitask language understanding in Chinese
- [ERNIE 5.0 Technical Report](https://arxiv.org/pdf/2602.04705v1) — arXiv v1; PDF p. 32, reference/mention for CMMLU: Measuring massive multitask language understanding in Chinese
- [Kimi K2: Open Agentic Intelligence](https://arxiv.org/pdf/2507.20534v1) — arXiv v1; PDF p. 22, reference/mention for CMMLU: Measuring massive multitask language understanding in Chinese

Limits: Coverage is the supplied document list, not an exhaustive citation search. Unversioned live-copy wording is not automatically backdated to the document original.

Comparison — agrees: Each listed document was checked in its own text or visible citation link, with the target work identified. The count agrees on the supplied list.

### B069 — count

**supported** — Each of the 5 listed documents contains a citation or named reference to this exact work.

Listed documents checked: 5. Literal citation/name matches: 5. Citations by other documents: 5.

- [Training Compute-Optimal Large Language Models](https://arxiv.org/pdf/2203.15556v1) — arXiv v1; PDF p. 19, reference/mention for Decoupled Weight Decay Regularization
- [LLaMA (2023 paper)](https://arxiv.org/html/2302.13971v1) — arXiv v1; References, entry matching Decoupled Weight Decay Regularization
- [DeepSeek-V3 Technical Report](https://arxiv.org/html/2412.19437v1) — arXiv v1; References, entry matching Decoupled Weight Decay Regularization
- [Qwen Technical Report](https://arxiv.org/html/2309.16609v1) — arXiv v1; References, entry matching Decoupled Weight Decay Regularization
- [Kimi K2: Open Agentic Intelligence](https://arxiv.org/pdf/2507.20534v1) — arXiv v1; PDF p. 22, reference/mention for Decoupled Weight Decay Regularization

Limits: Coverage is the supplied document list, not an exhaustive citation search. Unversioned live-copy wording is not automatically backdated to the document original.

Comparison — agrees: Each listed document was checked in its own text or visible citation link, with the target work identified. The count agrees on the supplied list.

### B070 — count

**supported** — Each of the 5 listed documents contains a citation or named reference to this exact work.

Listed documents checked: 5. Literal citation/name matches: 5. Citations by other documents: 5.

- [An Empirical Model of Large-Batch Training](https://arxiv.org/pdf/1812.06162v1) — arXiv v1; PDF p. 33, reference/mention for Deep Residual Learning for Image Recognition
- [Weak-to-Strong Generalization: Eliciting Strong Capabilities With Weak Supervision](https://arxiv.org/pdf/2312.09390v1) — arXiv v1; PDF p. 21, reference/mention for Deep Residual Learning for Image Recognition
- [Alignment for Advanced Machine Learning Systems](https://intelligence.org/files/AlignmentMachineLearning.pdf) — Copy independently retrieved 2026-10-30; PDF p. 22, reference/mention for Deep Residual Learning for Image Recognition
- [Highly accurate protein structure prediction with AlphaFold (2021)](https://www.ebi.ac.uk/europepmc/webservices/rest/PMC8371605/fullTextXML) — Copy independently retrieved 2026-10-30; References, 46
- [Kimi K3: Open Frontier Intelligence](https://raw.githubusercontent.com/MoonshotAI/Kimi-K3/0797decb18ab079de86f991b87a64b81ec15a3c2/k3_tech_report.pdf) — Copy independently retrieved 2026-10-30; PDF p. 36, reference/mention for Deep Residual Learning for Image Recognition

Limits: Coverage is the supplied document list, not an exhaustive citation search. Unversioned live-copy wording is not automatically backdated to the document original.

Comparison — agrees: Each listed document was checked in its own text or visible citation link, with the target work identified. The count agrees on the supplied list.

### B071 — count

**supported** — Each of the 5 listed documents contains a citation or named reference to this exact work.

Listed documents checked: 5. Literal citation/name matches: 5. Citations by other documents: 5.

- [Intelligence Explosion Microeconomics](https://intelligence.org/files/IEM.pdf) — Copy independently retrieved 2026-10-30; PDF p. 93, reference/mention for Economic Growth Given Machine Intelligence
- [Arms Control and Intelligence Explosions](https://intelligence.org/files/ArmsControl.pdf) — Copy independently retrieved 2026-10-30; PDF p. 6, reference/mention for Economic Growth Given Machine Intelligence
- [Long-Term Growth As A Sequence of Exponential Modes](https://mason.gmu.edu/~rhanson/longgrow.pdf) — Copy independently retrieved 2026-10-30; PDF p. 20, reference/mention for Economic Growth Given Machine Intelligence
- [Economic Growth under Transformative AI: A guide to the vast range of possibilities for output growth, wages, and the labor share](https://www.globalprioritiesinstitute.org/wp-content/uploads/Philip-Trammell-and-Anton-Korinek_economic-growth-under-transformative-ai.pdf) — Copy independently retrieved 2026-10-30; PDF p. 69, reference/mention for Economic Growth Given Machine Intelligence
- [The Future of Employment: How Susceptible Are Jobs to Computerisation?](https://oms-www.files.svdcdn.com/production/downloads/academic/The_Future_of_Employment.pdf) — Copy independently retrieved 2026-10-30; PDF p. 51, reference/mention for Economic Growth Given Machine Intelligence

Limits: Coverage is the supplied document list, not an exhaustive citation search. Unversioned live-copy wording is not automatically backdated to the document original.

Comparison — agrees: Each listed document was checked in its own text or visible citation link, with the target work identified. The count agrees on the supplied list.

### B072 — count

**supported** — Each of the 5 listed documents contains a citation or named reference to this exact work.

Listed documents checked: 5. Literal citation/name matches: 5. Citations by other documents: 5.

- [Training Compute-Optimal Large Language Models](https://arxiv.org/pdf/2203.15556v1) — arXiv v1; PDF p. 20, reference/mention for Ethical and social risks of harm from Language Models
- [Training language models to follow instructions with human feedback](https://arxiv.org/pdf/2203.02155v1) — arXiv v1; PDF p. 25, reference/mention for Ethical and social risks of harm from Language Models
- [GPT-4 System Card](https://cdn.openai.com/papers/gpt-4-system-card.pdf) — Copy independently retrieved 2026-10-30; PDF p. 31, reference/mention for Ethical and social risks of harm from Language Models
- [GPTs are GPTs: An Early Look at the Labor Market Impact Potential of Large Language Models](https://arxiv.org/pdf/2303.10130v1) — arXiv v1; PDF p. 35, reference/mention for Ethical and social risks of harm from Language Models
- [Gemini: A Family of Highly Capable Multimodal Models](https://arxiv.org/pdf/2312.11805v1) — arXiv v1; PDF p. 33, reference/mention for Ethical and social risks of harm from Language Models

Limits: Coverage is the supplied document list, not an exhaustive citation search. Unversioned live-copy wording is not automatically backdated to the document original.

Comparison — agrees: Each listed document was checked in its own text or visible citation link, with the target work identified. The count agrees on the supplied list.

### B073 — count

**supported** — Each of the 5 listed documents contains a citation or named reference to this exact work.

Listed documents checked: 5. Literal citation/name matches: 5. Citations by other documents: 5.

- [Scaling Laws for Neural Language Models](https://arxiv.org/pdf/2001.08361v1) — arXiv v1; PDF p. 29, reference/mention for GPipe: Efficient Training of Giant Neural Networks using Pipeline Parallelism
- [ERNIE 3.0 Titan: Exploring Larger-scale Knowledge Enhanced Pre-training for Language Understanding and Generation](https://arxiv.org/pdf/2112.12731v1) — arXiv v1; PDF p. 25, reference/mention for GPipe: Efficient Training of Giant Neural Networks using Pipeline Parallelism
- [ERNIE 5.0 Technical Report](https://arxiv.org/pdf/2602.04705v1) — arXiv v1; PDF p. 31, reference/mention for GPipe: Efficient Training of Giant Neural Networks using Pipeline Parallelism
- [Kimi K2: Open Agentic Intelligence](https://arxiv.org/pdf/2507.20534v1) — arXiv v1; PDF p. 22, reference/mention for GPipe: Efficient Training of Giant Neural Networks using Pipeline Parallelism
- [Kimi K3: Open Frontier Intelligence](https://raw.githubusercontent.com/MoonshotAI/Kimi-K3/0797decb18ab079de86f991b87a64b81ec15a3c2/k3_tech_report.pdf) — Copy independently retrieved 2026-10-30; PDF p. 36, reference/mention for GPipe: Efficient Training of Giant Neural Networks using Pipeline Parallelism

Limits: Coverage is the supplied document list, not an exhaustive citation search. Unversioned live-copy wording is not automatically backdated to the document original.

Comparison — agrees: Each listed document was checked in its own text or visible citation link, with the target work identified. The count agrees on the supplied list.

### B074 — count

**supported** — Each of the 5 listed documents contains a citation or named reference to this exact work.

Listed documents checked: 5. Literal citation/name matches: 5. Citations by other documents: 5.

- [DeepSeek-V3 Technical Report](https://arxiv.org/html/2412.19437v1) — arXiv v1; References, entry matching 2311.12022
- [DeepSeek-R1 research report](https://arxiv.org/html/2501.12948v1) — arXiv v1; References, entry matching 2311.12022
- [ChatGLM research history and techniques](https://arxiv.org/html/2406.12793v1) — arXiv v1; References, entry matching 2311.12022
- [Frontier AI Risk Management Framework (v1.0)](https://concordia-ai.com/wp-content/uploads/2025/07/Frontier-AI-Risk-Management-Framework-v1.0-en.pdf) — Copy independently retrieved 2026-10-30; PDF p. 46, reference/mention for GPQA: A Graduate-Level Google-Proof Q&amp;A Benchmark
- [NIST AI 800-1 (second public draft): Managing Misuse Risk for Dual-Use Foundation Models](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.800-1.ipd2.pdf) — Copy independently retrieved 2026-10-30; PDF p. 66, reference/mention for GPQA: A Graduate-Level Google-Proof Q&amp;A Benchmark

Limits: Coverage is the supplied document list, not an exhaustive citation search. Unversioned live-copy wording is not automatically backdated to the document original.

Comparison — agrees: Each listed document was checked in its own text or visible citation link, with the target work identified. The count agrees on the supplied list.

### B075 — count

**supported** — Each of the 5 listed documents contains a citation or named reference to this exact work.

Listed documents checked: 5. Literal citation/name matches: 5. Citations by other documents: 5.

- [DeepSeek-V3 Technical Report](https://arxiv.org/html/2412.19437v1) — arXiv v1; References, entry matching GShard: Scaling Giant Models with Conditional Computation and Automatic Sharding
- [Qwen Technical Report](https://arxiv.org/html/2309.16609v1) — arXiv v1; References, entry matching GShard: Scaling Giant Models with Conditional Computation and Automatic Sharding
- [ERNIE 5.0 Technical Report](https://arxiv.org/pdf/2602.04705v1) — arXiv v1; PDF p. 32, reference/mention for GShard: Scaling Giant Models with Conditional Computation and Automatic Sharding
- [Kimi K2: Open Agentic Intelligence](https://arxiv.org/pdf/2507.20534v1) — arXiv v1; PDF p. 22, reference/mention for GShard: Scaling Giant Models with Conditional Computation and Automatic Sharding
- [Kimi K3: Open Frontier Intelligence](https://raw.githubusercontent.com/MoonshotAI/Kimi-K3/0797decb18ab079de86f991b87a64b81ec15a3c2/k3_tech_report.pdf) — Copy independently retrieved 2026-10-30; PDF p. 37, reference/mention for GShard: Scaling Giant Models with Conditional Computation and Automatic Sharding

Limits: Coverage is the supplied document list, not an exhaustive citation search. Unversioned live-copy wording is not automatically backdated to the document original.

Comparison — agrees: Each listed document was checked in its own text or visible citation link, with the target work identified. The count agrees on the supplied list.

### B076 — count

**supported** — Each of the 5 listed documents contains a citation or named reference to this exact work.

Listed documents checked: 5. Literal citation/name matches: 5. Citations by other documents: 5.

- [Deep reinforcement learning from human preferences](https://arxiv.org/pdf/1706.03741v1) — arXiv v1; PDF p. 11, reference/mention for Guided Cost Learning: Deep Inverse Optimal Control via Policy Optimization
- [Supervising strong learners by amplifying weak experts](https://arxiv.org/pdf/1810.08575v1) — arXiv v1; PDF p. 9, reference/mention for Guided Cost Learning: Deep Inverse Optimal Control via Policy Optimization
- [Scalable agent alignment via reward modeling: a research direction](https://arxiv.org/pdf/1811.07871v1) — arXiv v1; PDF p. 24, reference/mention for Guided Cost Learning: Deep Inverse Optimal Control via Policy Optimization
- [Concrete Problems in AI Safety](https://arxiv.org/pdf/1606.06565v1) — arXiv v1; PDF p. 24, reference/mention for Guided Cost Learning: Deep Inverse Optimal Control via Policy Optimization
- [Alignment for Advanced Machine Learning Systems](https://intelligence.org/files/AlignmentMachineLearning.pdf) — Copy independently retrieved 2026-10-30; PDF p. 21, reference/mention for Guided Cost Learning: Deep Inverse Optimal Control via Policy Optimization

Limits: Coverage is the supplied document list, not an exhaustive citation search. Unversioned live-copy wording is not automatically backdated to the document original.

Comparison — agrees: Each listed document was checked in its own text or visible citation link, with the target work identified. The count agrees on the supplied list.

### B077 — count

**supported** — Each of the 5 listed documents contains a citation or named reference to this exact work.

Listed documents checked: 5. Literal citation/name matches: 5. Citations by other documents: 5.

- [Proximal Policy Optimization Algorithms](https://arxiv.org/pdf/1707.06347v1) — arXiv v1; PDF p. 9, reference/mention for Human-level control through deep reinforcement learning
- [Deep reinforcement learning from human preferences](https://arxiv.org/pdf/1706.03741v1) — arXiv v1; PDF p. 12, reference/mention for Human-level control through deep reinforcement learning
- [Scalable agent alignment via reward modeling: a research direction](https://arxiv.org/pdf/1811.07871v1) — arXiv v1; PDF p. 27, reference/mention for Human-level control through deep reinforcement learning
- [Concrete Problems in AI Safety](https://arxiv.org/pdf/1606.06565v1) — arXiv v1; PDF p. 26, reference/mention for Human-level control through deep reinforcement learning
- [Alignment for Advanced Machine Learning Systems](https://intelligence.org/files/AlignmentMachineLearning.pdf) — Copy independently retrieved 2026-10-30; PDF p. 23, reference/mention for Human-level control through deep reinforcement learning

Limits: Coverage is the supplied document list, not an exhaustive citation search. Unversioned live-copy wording is not automatically backdated to the document original.

Comparison — agrees: Each listed document was checked in its own text or visible citation link, with the target work identified. The count agrees on the supplied list.

### B078 — count

**supported** — Each of the 5 listed documents contains a citation or named reference to this exact work.

Listed documents checked: 5. Literal citation/name matches: 5. Citations by other documents: 5.

- [ERNIE 5.0 Technical Report](https://arxiv.org/pdf/2602.04705v1) — arXiv v1; PDF p. 33, reference/mention for Humanity's Last Exam
- [Kimi K2: Open Agentic Intelligence](https://arxiv.org/pdf/2507.20534v1) — arXiv v1; PDF p. 23, reference/mention for Humanity's Last Exam
- [Kimi K3: Open Frontier Intelligence](https://raw.githubusercontent.com/MoonshotAI/Kimi-K3/0797decb18ab079de86f991b87a64b81ec15a3c2/k3_tech_report.pdf) — Copy independently retrieved 2026-10-30; PDF p. 38, reference/mention for Humanity's Last Exam
- [Seed1.8 Model Card: Towards Generalized Real-World Agency](https://arxiv.org/pdf/2603.20633v1) — arXiv v1; PDF p. 24, reference/mention for Humanity's Last Exam
- [Seed2.0 Model Card: Towards Intelligence Frontier for Real-World Complexity](https://arxiv.org/pdf/2607.00248v1) — arXiv v1; PDF p. 53, reference/mention for Humanity's Last Exam

Limits: Coverage is the supplied document list, not an exhaustive citation search. Unversioned live-copy wording is not automatically backdated to the document original.

Comparison — agrees: Each listed document was checked in its own text or visible citation link, with the target work identified. The count agrees on the supplied list.

### B079 — count

**supported** — Each of the 5 listed documents contains a citation or named reference to this exact work.

Listed documents checked: 5. Literal citation/name matches: 5. Citations by other documents: 5.

- [DeepSeek-V3 Technical Report](https://arxiv.org/html/2412.19437v1) — arXiv v1; References, entry matching Instruction-Following Evaluation for Large Language Models
- [DeepSeek-R1 research report](https://arxiv.org/html/2501.12948v1) — arXiv v1; References, entry matching Instruction-Following Evaluation for Large Language Models
- [ChatGLM research history and techniques](https://arxiv.org/html/2406.12793v1) — arXiv v1; References, entry matching Instruction-Following Evaluation for Large Language Models
- [ERNIE 5.0 Technical Report](https://arxiv.org/pdf/2602.04705v1) — arXiv v1; PDF p. 36, reference/mention for Instruction-Following Evaluation for Large Language Models
- [Kimi K2: Open Agentic Intelligence](https://arxiv.org/pdf/2507.20534v1) — arXiv v1; PDF p. 24, reference/mention for Instruction-Following Evaluation for Large Language Models

Limits: Coverage is the supplied document list, not an exhaustive citation search. Unversioned live-copy wording is not automatically backdated to the document original.

Comparison — agrees: Each listed document was checked in its own text or visible citation link, with the target work identified. The count agrees on the supplied list.

### B080 — count

**supported** — Each of the 5 listed documents contains a citation or named reference to this exact work.

Listed documents checked: 5. Literal citation/name matches: 5. Citations by other documents: 5.

- [Training Compute-Optimal Large Language Models](https://arxiv.org/pdf/2203.15556v1) — arXiv v1; PDF p. 20, reference/mention for LaMDA: Language Models for Dialog Applications
- [Training language models to follow instructions with human feedback](https://arxiv.org/pdf/2203.02155v1) — arXiv v1; PDF p. 25, reference/mention for LaMDA: Language Models for Dialog Applications
- [LLaMA (2023 paper)](https://arxiv.org/html/2302.13971v1) — arXiv v1; References, entry matching LaMDA: Language Models for Dialog Applications
- [Qwen Technical Report](https://arxiv.org/html/2309.16609v1) — arXiv v1; References, entry matching LaMDA: Language Models for Dialog Applications
- [GPTs are GPTs: An Early Look at the Labor Market Impact Potential of Large Language Models](https://arxiv.org/pdf/2303.10130v1) — arXiv v1; PDF p. 35, reference/mention for LaMDA: Language Models for Dialog Applications

Limits: Coverage is the supplied document list, not an exhaustive citation search. Unversioned live-copy wording is not automatically backdated to the document original.

Comparison — agrees: Each listed document was checked in its own text or visible citation link, with the target work identified. The count agrees on the supplied list.

### B081 — count

**partly supported** — All five documents literally name the work, but LLaMA itself contributes only its own title/arXiv header; four other documents cite it.

Listed documents checked: 5. Literal citation/name matches: 5. Citations by other documents: 4. The five-document citation threshold is not established.

- [LLaMA (2023 paper)](https://arxiv.org/html/2302.13971v1) — arXiv v1; Document title and arXiv header; this is the same paper, not a bibliographic citation by another document.
- [DeepSeek-V3 Technical Report](https://arxiv.org/html/2412.19437v1) — arXiv v1; References, entry matching LLaMA: Open and Efficient Foundation Language Models
- [Qwen Technical Report](https://arxiv.org/html/2309.16609v1) — arXiv v1; References, entry matching LLaMA: Open and Efficient Foundation Language Models
- [ChatGLM research history and techniques](https://arxiv.org/html/2406.12793v1) — arXiv v1; References, entry matching LLaMA: Open and Efficient Foundation Language Models
- [Gemini: A Family of Highly Capable Multimodal Models](https://arxiv.org/pdf/2312.11805v1) — arXiv v1; PDF p. 32, reference/mention for LLaMA: Open and Efficient Foundation Language Models

Limits: Coverage is the supplied document list, not an exhaustive citation search. Unversioned live-copy wording is not automatically backdated to the document original. The input asks for citations or names: five literal name matches are confirmed. The separate claim of five citing documents is not supported when the paper own header is excluded. This makes the five-document citation threshold fail on the checked list.

Comparison — differs on citation basis; literal names agree: Five literal name matches include the target paper's own header. Only four other listed documents cite LLaMA, so five citing documents and the threshold are not established.

### B082 — count

**supported** — Each of the 5 listed documents contains a citation or named reference to this exact work.

Listed documents checked: 5. Literal citation/name matches: 5. Citations by other documents: 5.

- [Deep reinforcement learning from human preferences](https://arxiv.org/pdf/1706.03741v1) — arXiv v1; PDF p. 12, reference/mention for Mastering the game of Go with deep neural networks and tree search
- [AI safety via debate](https://arxiv.org/pdf/1805.00899v1) — arXiv v1; PDF p. 23, reference/mention for Mastering the game of Go with deep neural networks and tree search
- [Scalable agent alignment via reward modeling: a research direction](https://arxiv.org/pdf/1811.07871v1) — arXiv v1; PDF p. 29, reference/mention for Mastering the game of Go with deep neural networks and tree search
- [Concrete Problems in AI Safety](https://arxiv.org/pdf/1606.06565v1) — arXiv v1; PDF p. 28, reference/mention for Mastering the game of Go with deep neural networks and tree search
- [Alignment for Advanced Machine Learning Systems](https://intelligence.org/files/AlignmentMachineLearning.pdf) — Copy independently retrieved 2026-10-30; PDF p. 24, reference/mention for Mastering the game of Go with deep neural networks and tree search

Limits: Coverage is the supplied document list, not an exhaustive citation search. Unversioned live-copy wording is not automatically backdated to the document original.

Comparison — agrees: Each listed document was checked in its own text or visible citation link, with the target work identified. The count agrees on the supplied list.

### B083 — count

**supported** — Each of the 5 listed documents contains a citation or named reference to this exact work.

Listed documents checked: 5. Literal citation/name matches: 5. Citations by other documents: 5.

- [ERNIE 5.0 Technical Report](https://arxiv.org/pdf/2602.04705v1) — arXiv v1; PDF p. 32, reference/mention for MathVista: Evaluating Mathematical Reasoning of Foundation Models in Visual Contexts
- [Seed1.5-VL Technical Report](https://arxiv.org/pdf/2505.07062v1) — arXiv v1; PDF p. 37, reference/mention for MathVista: Evaluating Mathematical Reasoning of Foundation Models in Visual Contexts
- [Seed1.8 Model Card: Towards Generalized Real-World Agency](https://arxiv.org/pdf/2603.20633v1) — arXiv v1; PDF p. 24, reference/mention for MathVista: Evaluating Mathematical Reasoning of Foundation Models in Visual Contexts
- [Seed2.0 Model Card: Towards Intelligence Frontier for Real-World Complexity](https://arxiv.org/pdf/2607.00248v1) — arXiv v1; PDF p. 52, reference/mention for MathVista: Evaluating Mathematical Reasoning of Foundation Models in Visual Contexts
- [Gemini: A Family of Highly Capable Multimodal Models](https://arxiv.org/pdf/2312.11805v1) — arXiv v1; PDF p. 29, reference/mention for MathVista: Evaluating Mathematical Reasoning of Foundation Models in Visual Contexts

Limits: Coverage is the supplied document list, not an exhaustive citation search. Unversioned live-copy wording is not automatically backdated to the document original.

Comparison — agrees: Each listed document was checked in its own text or visible citation link, with the target work identified. The count agrees on the supplied list.

### B084 — count

**supported** — Each of the 5 listed documents contains a citation or named reference to this exact work.

Listed documents checked: 5. Literal citation/name matches: 5. Citations by other documents: 5.

- [Self-critiquing models for assisting human evaluators](https://arxiv.org/pdf/2206.05802v1) — arXiv v1; PDF p. 21, reference/mention for PaLM: Scaling Language Modeling with Pathways
- [LLaMA (2023 paper)](https://arxiv.org/html/2302.13971v1) — arXiv v1; References, entry matching PaLM: Scaling Language Modeling with Pathways
- [Qwen Technical Report](https://arxiv.org/html/2309.16609v1) — arXiv v1; References, entry matching PaLM: Scaling Language Modeling with Pathways
- [ChatGLM research history and techniques](https://arxiv.org/html/2406.12793v1) — arXiv v1; References, entry matching PaLM: Scaling Language Modeling with Pathways
- [Gemini: A Family of Highly Capable Multimodal Models](https://arxiv.org/pdf/2312.11805v1) — arXiv v1; PDF p. 26, reference/mention for PaLM: Scaling Language Modeling with Pathways

Limits: Coverage is the supplied document list, not an exhaustive citation search. Unversioned live-copy wording is not automatically backdated to the document original.

Comparison — agrees: Each listed document was checked in its own text or visible citation link, with the target work identified. The count agrees on the supplied list.

### B085 — count

**supported** — Each of the 5 listed documents contains a citation or named reference to this exact work.

Listed documents checked: 5. Literal citation/name matches: 5. Citations by other documents: 5.

- [Training Compute-Optimal Large Language Models](https://arxiv.org/pdf/2203.15556v1) — arXiv v1; PDF p. 16, reference/mention for PIQA: Reasoning about Physical Commonsense in Natural Language
- [Weak-to-Strong Generalization: Eliciting Strong Capabilities With Weak Supervision](https://arxiv.org/pdf/2312.09390v1) — arXiv v1; PDF p. 20, reference/mention for PIQA: Reasoning about Physical Commonsense in Natural Language
- [LLaMA (2023 paper)](https://arxiv.org/html/2302.13971v1) — arXiv v1; References, entry matching PIQA: Reasoning about Physical Commonsense in Natural Language
- [DeepSeek-V3 Technical Report](https://arxiv.org/html/2412.19437v1) — arXiv v1; References, entry matching PIQA: Reasoning about Physical Commonsense in Natural Language
- [Qwen Technical Report](https://arxiv.org/html/2309.16609v1) — arXiv v1; References, entry matching PIQA: Reasoning about Physical Commonsense in Natural Language

Limits: Coverage is the supplied document list, not an exhaustive citation search. Unversioned live-copy wording is not automatically backdated to the document original.

Comparison — agrees: Each listed document was checked in its own text or visible citation link, with the target work identified. The count agrees on the supplied list.

### B086 — count

**supported** — Each of the 5 listed documents contains a citation or named reference to this exact work.

Listed documents checked: 5. Literal citation/name matches: 5. Citations by other documents: 5.

- [Training Compute-Optimal Large Language Models](https://arxiv.org/pdf/2203.15556v1) — arXiv v1; PDF p. 18, reference/mention for RACE: Large-scale ReAding Comprehension Dataset From Examinations
- [Self-critiquing models for assisting human evaluators](https://arxiv.org/pdf/2206.05802v1) — arXiv v1; PDF p. 22, reference/mention for RACE: Large-scale ReAding Comprehension Dataset From Examinations
- [Claude 2 model card](https://www-cdn.anthropic.com/bd2a28d2535bfb0494cc8e2a3bf135d2e7523226/Model-Card-Claude-2.pdf) — Copy independently retrieved 2026-10-30; PDF p. 13, reference/mention for RACE: Large-scale ReAding Comprehension Dataset From Examinations
- [LLaMA (2023 paper)](https://arxiv.org/html/2302.13971v1) — arXiv v1; References, entry matching RACE: Large-scale ReAding Comprehension Dataset From Examinations
- [DeepSeek-V3 Technical Report](https://arxiv.org/html/2412.19437v1) — arXiv v1; References, entry matching RACE: Large-scale ReAding Comprehension Dataset From Examinations

Limits: Coverage is the supplied document list, not an exhaustive citation search. Unversioned live-copy wording is not automatically backdated to the document original.

Comparison — agrees: Each listed document was checked in its own text or visible citation link, with the target work identified. The count agrees on the supplied list.

### B087 — count

**supported** — Each of the 5 listed documents contains a citation or named reference to this exact work.

Listed documents checked: 5. Literal citation/name matches: 5. Citations by other documents: 5.

- [Scaling Laws for Neural Language Models](https://arxiv.org/pdf/2001.08361v1) — arXiv v1; PDF p. 29, reference/mention for RoBERTa: A Robustly Optimized BERT Pretraining Approach
- [Qwen Technical Report](https://arxiv.org/html/2309.16609v1) — arXiv v1; References, entry matching RoBERTa: A Robustly Optimized BERT Pretraining Approach
- [ERNIE 3.0: Large-scale Knowledge Enhanced Pre-training for Language Understanding and Generation](https://arxiv.org/pdf/2107.02137v1) — arXiv v1; PDF p. 22, reference/mention for RoBERTa: A Robustly Optimized BERT Pretraining Approach
- [ERNIE 3.0 Titan: Exploring Larger-scale Knowledge Enhanced Pre-training for Language Understanding and Generation](https://arxiv.org/pdf/2112.12731v1) — arXiv v1; PDF p. 28, reference/mention for RoBERTa: A Robustly Optimized BERT Pretraining Approach
- [Evaluating Large Language Models Trained on Code (arXiv:2107.03374v1)](https://arxiv.org/pdf/2107.03374v1) — arXiv v1; PDF p. 17, reference/mention for RoBERTa: A Robustly Optimized BERT Pretraining Approach

Limits: Coverage is the supplied document list, not an exhaustive citation search. Unversioned live-copy wording is not automatically backdated to the document original.

Comparison — agrees: Each listed document was checked in its own text or visible citation link, with the target work identified. The count agrees on the supplied list.

### B088 — count

**supported** — Each of the 5 listed documents contains a citation or named reference to this exact work.

Listed documents checked: 5. Literal citation/name matches: 5. Citations by other documents: 5.

- [LLaMA (2023 paper)](https://arxiv.org/html/2302.13971v1) — arXiv v1; References, entry matching RoFormer: Enhanced Transformer with Rotary Position Embedding
- [DeepSeek-V3 Technical Report](https://arxiv.org/html/2412.19437v1) — arXiv v1; References, entry matching RoFormer: Enhanced Transformer with Rotary Position Embedding
- [Qwen Technical Report](https://arxiv.org/html/2309.16609v1) — arXiv v1; References, entry matching RoFormer: Enhanced Transformer with Rotary Position Embedding
- [ChatGLM research history and techniques](https://arxiv.org/html/2406.12793v1) — arXiv v1; References, entry matching RoFormer: Enhanced Transformer with Rotary Position Embedding
- [Seed-X: Building Strong Multilingual Translation LLM with 7B Parameters](https://arxiv.org/pdf/2507.13618v1) — arXiv v1; PDF p. 17, reference/mention for RoFormer: Enhanced Transformer with Rotary Position Embedding

Limits: Coverage is the supplied document list, not an exhaustive citation search. Unversioned live-copy wording is not automatically backdated to the document original.

Comparison — agrees: Each listed document was checked in its own text or visible citation link, with the target work identified. The count agrees on the supplied list.

### B089 — count

**supported** — Each of the 5 listed documents contains a citation or named reference to this exact work.

Listed documents checked: 5. Literal citation/name matches: 5. Citations by other documents: 5.

- [Learning to summarize from human feedback](https://arxiv.org/pdf/2009.01325v1) — arXiv v1; PDF p. 12, reference/mention for Scalable agent alignment via reward modeling: a research direction
- [Training language models to follow instructions with human feedback](https://arxiv.org/pdf/2203.02155v1) — arXiv v1; PDF p. 23, reference/mention for Scalable agent alignment via reward modeling: a research direction
- [Self-critiquing models for assisting human evaluators](https://arxiv.org/pdf/2206.05802v1) — arXiv v1; PDF p. 21, reference/mention for Scalable agent alignment via reward modeling: a research direction
- [Weak-to-Strong Generalization: Eliciting Strong Capabilities With Weak Supervision](https://arxiv.org/pdf/2312.09390v1) — arXiv v1; PDF p. 23, reference/mention for Scalable agent alignment via reward modeling: a research direction
- [Without specific countermeasures, the easiest path to transformative AI likely leads to AI takeover](https://www.lesswrong.com/posts/pRkFkzwKZ2zfa3R6H/without-specific-countermeasures-the-easiest-path-to) — Copy independently retrieved 2026-10-30; Body text, visible link to https://arxiv.org/abs/1811.07871

Limits: Coverage is the supplied document list, not an exhaustive citation search. Unversioned live-copy wording is not automatically backdated to the document original.

Comparison — agrees: Each listed document was checked in its own text or visible citation link, with the target work identified. The count agrees on the supplied list.

### B090 — count

**supported** — Each of the 5 listed documents contains a citation or named reference to this exact work.

Listed documents checked: 5. Literal citation/name matches: 5. Citations by other documents: 5.

- [Training Compute-Optimal Large Language Models](https://arxiv.org/pdf/2203.15556v1) — arXiv v1; PDF p. 19, reference/mention for Scaling Language Models: Methods, Analysis & Insights from Training Gopher
- [Training language models to follow instructions with human feedback](https://arxiv.org/pdf/2203.02155v1) — arXiv v1; PDF p. 24, reference/mention for Scaling Language Models: Methods, Analysis & Insights from Training Gopher
- [LLaMA (2023 paper)](https://arxiv.org/html/2302.13971v1) — arXiv v1; References, entry matching Scaling Language Models: Methods, Analysis & Insights from Training Gopher
- [Qwen Technical Report](https://arxiv.org/html/2309.16609v1) — arXiv v1; References, entry matching Scaling Language Models: Methods, Analysis & Insights from Training Gopher
- [Gemini: A Family of Highly Capable Multimodal Models](https://arxiv.org/pdf/2312.11805v1) — arXiv v1; PDF p. 31, reference/mention for Scaling Language Models: Methods, Analysis & Insights from Training Gopher

Limits: Coverage is the supplied document list, not an exhaustive citation search. Unversioned live-copy wording is not automatically backdated to the document original.

Comparison — agrees: Each listed document was checked in its own text or visible citation link, with the target work identified. The count agrees on the supplied list.

### B091 — count

**supported** — Each of the 5 listed documents contains a citation or named reference to this exact work.

Listed documents checked: 5. Literal citation/name matches: 5. Citations by other documents: 5.

- [Self-critiquing models for assisting human evaluators](https://arxiv.org/pdf/2206.05802v1) — arXiv v1; PDF p. 23, reference/mention for Self-Consistency Improves Chain of Thought Reasoning in Language Models
- [LLaMA (2023 paper)](https://arxiv.org/html/2302.13971v1) — arXiv v1; References, entry matching Self-Consistency Improves Chain of Thought Reasoning in Language Models
- [DeepSeek-R1 research report](https://arxiv.org/html/2501.12948v1) — arXiv v1; References, entry matching Self-Consistency Improves Chain of Thought Reasoning in Language Models
- [Qwen Technical Report](https://arxiv.org/html/2309.16609v1) — arXiv v1; References, entry matching Self-Consistency Improves Chain of Thought Reasoning in Language Models
- [Gemini: A Family of Highly Capable Multimodal Models](https://arxiv.org/pdf/2312.11805v1) — arXiv v1; PDF p. 33, reference/mention for Self-Consistency Improves Chain of Thought Reasoning in Language Models

Limits: Coverage is the supplied document list, not an exhaustive citation search. Unversioned live-copy wording is not automatically backdated to the document original.

Comparison — agrees: Each listed document was checked in its own text or visible citation link, with the target work identified. The count agrees on the supplied list.

### B092 — count

**supported** — Each of the 5 listed documents contains a citation or named reference to this exact work.

Listed documents checked: 5. Literal citation/name matches: 5. Citations by other documents: 5.

- [Intelligence Explosion Microeconomics](https://intelligence.org/files/IEM.pdf) — Copy independently retrieved 2026-10-30; PDF p. 93, reference/mention for Speculations Concerning the First Ultraintelligent Machine
- [The Singularity: A Philosophical Analysis](https://consc.net/papers/singularity.pdf) — Copy independently retrieved 2026-10-30; PDF p. 55, reference/mention for Speculations Concerning the First Ultraintelligent Machine
- [Artificial Intelligence as a Positive and Negative Factor in Global Risk](https://intelligence.org/files/AIPosNegFactor.pdf) — Copy independently retrieved 2026-10-30; PDF p. 45, reference/mention for Speculations Concerning the First Ultraintelligent Machine
- [Are We Approaching an Economic Singularity? Information Technology and the Future of Economic Growth](https://www.nber.org/system/files/working_papers/w21547/w21547.pdf) — Copy independently retrieved 2026-10-30; PDF p. 47, reference/mention for Speculations Concerning the First Ultraintelligent Machine
- [Self-Regulating Artificial General Intelligence](https://www.nber.org/system/files/working_papers/w24352/w24352.pdf) — Copy independently retrieved 2026-10-30; PDF p. 16, reference/mention for Speculations Concerning the First Ultraintelligent Machine

Limits: Coverage is the supplied document list, not an exhaustive citation search. Unversioned live-copy wording is not automatically backdated to the document original.

Comparison — agrees: Each listed document was checked in its own text or visible citation link, with the target work identified. The count agrees on the supplied list.

### B093 — count

**supported** — Each of the 5 listed documents contains a citation or named reference to this exact work.

Listed documents checked: 5. Literal citation/name matches: 5. Citations by other documents: 5.

- [Learning to summarize from human feedback](https://arxiv.org/pdf/2009.01325v1) — arXiv v1; PDF p. 11, reference/mention for Supervising strong learners by amplifying weak experts
- [Training language models to follow instructions with human feedback](https://arxiv.org/pdf/2203.02155v1) — arXiv v1; PDF p. 22, reference/mention for Supervising strong learners by amplifying weak experts
- [Scalable agent alignment via reward modeling: a research direction](https://arxiv.org/pdf/1811.07871v1) — arXiv v1; PDF p. 24, reference/mention for Supervising strong learners by amplifying weak experts
- [Self-critiquing models for assisting human evaluators](https://arxiv.org/pdf/2206.05802v1) — arXiv v1; PDF p. 21, reference/mention for Supervising strong learners by amplifying weak experts
- [Weak-to-Strong Generalization: Eliciting Strong Capabilities With Weak Supervision](https://arxiv.org/pdf/2312.09390v1) — arXiv v1; PDF p. 20, reference/mention for Supervising strong learners by amplifying weak experts

Limits: Coverage is the supplied document list, not an exhaustive citation search. Unversioned live-copy wording is not automatically backdated to the document original.

Comparison — agrees: Each listed document was checked in its own text or visible citation link, with the target work identified. The count agrees on the supplied list.

### B094 — count

**supported** — Each of the 5 listed documents contains a citation or named reference to this exact work.

Listed documents checked: 5. Literal citation/name matches: 5. Citations by other documents: 5.

- [Weak-to-Strong Generalization: Eliciting Strong Capabilities With Weak Supervision](https://arxiv.org/pdf/2312.09390v1) — arXiv v1; PDF p. 24, reference/mention for The Alignment Problem from a Deep Learning Perspective
- [GPT-4 System Card](https://cdn.openai.com/papers/gpt-4-system-card.pdf) — Copy independently retrieved 2026-10-30; PDF p. 35, reference/mention for The Alignment Problem from a Deep Learning Perspective
- [The A.I. Dilemma: Growth versus Existential Risk](https://www.nber.org/system/files/working_papers/w31837/w31837.pdf) — Copy independently retrieved 2026-10-30; PDF p. 23, reference/mention for The Alignment Problem from a Deep Learning Perspective
- [How Much Should We Spend to Reduce A.I.'s Existential Risk?](https://www.nber.org/system/files/working_papers/w33602/w33602.pdf) — Copy independently retrieved 2026-10-30; PDF p. 22, reference/mention for The Alignment Problem from a Deep Learning Perspective
- [The California Report on Frontier AI Policy](https://www.gov.ca.gov/wp-content/uploads/2025/06/June-17-2025-%E2%80%93-The-California-Report-on-Frontier-AI-Policy.pdf) — Copy independently retrieved 2026-10-30; PDF p. 49, reference/mention for The Alignment Problem from a Deep Learning Perspective

Limits: Coverage is the supplied document list, not an exhaustive citation search. Unversioned live-copy wording is not automatically backdated to the document original.

Comparison — agrees: Each listed document was checked in its own text or visible citation link, with the target work identified. The count agrees on the supplied list.

### B095 — count

**supported** — Each of the 5 listed documents contains a citation or named reference to this exact work.

Listed documents checked: 5. Literal citation/name matches: 5. Citations by other documents: 5.

- [Concrete Problems in AI Safety](https://arxiv.org/pdf/1606.06565v1) — arXiv v1; PDF p. 24, reference/mention for The Future of Employment: How Susceptible Are Jobs to Computerisation?
- [Robots Are Us: Some Economics of Human Replacement](https://www.nber.org/system/files/working_papers/w20941/w20941.pdf) — Live NBER copy, title page labels Revised October 2018; PDF p. 31, reference/mention for The Future of Employment: How Susceptible Are Jobs to Computerisation?
- [Artificial Intelligence and Its Implications for Income Distribution and Unemployment](https://www.nber.org/system/files/working_papers/w24174/w24174.pdf) — Copy independently retrieved 2026-10-30; PDF p. 42, reference/mention for The Future of Employment: How Susceptible Are Jobs to Computerisation?
- [AI and the Economy](https://www.nber.org/system/files/working_papers/w24689/w24689.pdf) — Copy independently retrieved 2026-10-30; PDF p. 31, reference/mention for The Future of Employment: How Susceptible Are Jobs to Computerisation?
- [GPTs are GPTs: An Early Look at the Labor Market Impact Potential of Large Language Models](https://arxiv.org/pdf/2303.10130v1) — arXiv v1; PDF p. 33, reference/mention for The Future of Employment: How Susceptible Are Jobs to Computerisation?

Limits: Coverage is the supplied document list, not an exhaustive citation search. Unversioned live-copy wording is not automatically backdated to the document original.

Comparison — agrees: Each listed document was checked in its own text or visible citation link, with the target work identified. The count agrees on the supplied list.

### B096 — count

**supported** — Each of the 5 listed documents contains a citation or named reference to this exact work.

Listed documents checked: 5. Literal citation/name matches: 5. Citations by other documents: 5.

- [Economic Growth under Transformative AI: A guide to the vast range of possibilities for output growth, wages, and the labor share](https://www.globalprioritiesinstitute.org/wp-content/uploads/Philip-Trammell-and-Anton-Korinek_economic-growth-under-transformative-ai.pdf) — Copy independently retrieved 2026-10-30; PDF p. 67, reference/mention for The Race between Man and Machine: Implications of Technology for Growth, Factor Shares, and Employment
- [The Simple Macroeconomics of AI](https://economics.mit.edu/sites/default/files/2024-04/The%20Simple%20Macroeconomics%20of%20AI.pdf) — Copy independently retrieved 2026-10-30; PDF p. 47, reference/mention for The Race between Man and Machine: Implications of Technology for Growth, Factor Shares, and Employment
- [Robots Are Us: Some Economics of Human Replacement](https://www.nber.org/system/files/working_papers/w20941/w20941.pdf) — Live NBER copy, title page labels Revised October 2018; PDF p. 30, reference/mention for The Race between Man and Machine: Implications of Technology for Growth, Factor Shares, and Employment
- [The Wrong Kind of AI? Artificial Intelligence and the Future of Labor Demand](https://www.nber.org/system/files/working_papers/w25682/w25682.pdf) — Copy independently retrieved 2026-10-30; PDF p. 13, reference/mention for The Race between Man and Machine: Implications of Technology for Growth, Factor Shares, and Employment
- [GPTs are GPTs: An Early Look at the Labor Market Impact Potential of Large Language Models](https://arxiv.org/pdf/2303.10130v1) — arXiv v1; PDF p. 31, reference/mention for The Race between Man and Machine: Implications of Technology for Growth, Factor Shares, and Employment

Limits: Coverage is the supplied document list, not an exhaustive citation search. Unversioned live-copy wording is not automatically backdated to the document original.

Comparison — agrees: Each listed document was checked in its own text or visible citation link, with the target work identified. The count agrees on the supplied list.

### B097 — count

**supported** — Each of the 5 listed documents contains a citation or named reference to this exact work.

Listed documents checked: 5. Literal citation/name matches: 5. Citations by other documents: 5.

- [Training Compute-Optimal Large Language Models](https://arxiv.org/pdf/2203.15556v1) — arXiv v1; PDF p. 19, reference/mention for TruthfulQA: Measuring How Models Mimic Human Falsehoods
- [Training language models to follow instructions with human feedback](https://arxiv.org/pdf/2203.02155v1) — arXiv v1; PDF p. 23, reference/mention for TruthfulQA: Measuring How Models Mimic Human Falsehoods
- [GPT-4 System Card](https://cdn.openai.com/papers/gpt-4-system-card.pdf) — Copy independently retrieved 2026-10-30; PDF p. 33, reference/mention for TruthfulQA: Measuring How Models Mimic Human Falsehoods
- [Claude 2 model card](https://www-cdn.anthropic.com/bd2a28d2535bfb0494cc8e2a3bf135d2e7523226/Model-Card-Claude-2.pdf) — Copy independently retrieved 2026-10-30; PDF p. 13, reference/mention for TruthfulQA: Measuring How Models Mimic Human Falsehoods
- [LLaMA (2023 paper)](https://arxiv.org/html/2302.13971v1) — arXiv v1; References, entry matching TruthfulQA: Measuring How Models Mimic Human Falsehoods

Limits: Coverage is the supplied document list, not an exhaustive citation search. Unversioned live-copy wording is not automatically backdated to the document original.

Comparison — agrees: Each listed document was checked in its own text or visible citation link, with the target work identified. The count agrees on the supplied list.
