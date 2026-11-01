| Group | Items | Attempted | Verified | Quotation problems | Retrieval blocked | Wrong document | Saving excluded | Review pending | Not started | Capture change |
| ----- | ----: | --------: | -------: | -----------------: | ----------------: | -------------: | --------------: | -------------: | ----------: | -------------: |
| A1    |     9 |         9 |        7 |                  2 |                 0 |              0 |               0 |              0 |           0 |              0 |
| A2    |   171 |       171 |      150 |                 21 |                 0 |              0 |               0 |              0 |           0 |              7 |
| B     |   549 |       549 |      521 |                 19 |                 5 |              2 |               2 |              0 |           0 |              0 |

# Archive verification — Codex, 2026-10-28

Items retain input order. No application data changed. Save-Page-Now-returned captures with verified replays: 42. Save Page Now creation requests: 55/150 (failed or indeterminate requests conservatively reserve a slot). Captures recovered through CDX after indeterminate save responses: 8; those save responses did not confirm creation.

Method: sequential direct HTTP. Archive requests use at least 5.1 seconds; curl batches through item 365 used 15.1 seconds after a completed response. Subsequent batches use 5.1 seconds after responses. Saves wait at least 20.1 seconds after the previous save response. HTTP 429 causes a five-minute backoff. SHA-256 covers decompressed id_ document response bytes before extraction. For redirected filings, capture entry status is recorded separately from final document status; follow the archived entry link to reproduce the document. Expiring signed redirect-target query parameters are omitted. Encoding headers are checked against body signatures and decoding steps are recorded. Identity and quotation presence are checked separately. Items with no supplied quotations receive retrieval and identity checks. HTML scripts are not run; linked serialized MDX is decoded as data where identified. Structured social-post JSON is matched by exact post ID and author. HTML block whitespace, invisible word-break controls and identified external-link accessibility labels may be normalized with a per-quotation note. PDF layout spacing, soft hyphens and wrapped words are normalized; CJK radical glyphs map to displayed Hanzi, preserving punctuation. Explicit omissions match in order; differences are reported. Visible PDF pages settle text-layer discrepancies. Failed retrieval yields no quotation verdict. Capture timestamps and publication dates remain distinct. Raw HTML time elements remain observational candidates until associated with the main document. Day-only access dates use archive-UTC end of day for ordering. Public authorship and permitted professional histories remain; incidental personal descriptors and contact addresses are omitted. Capture-change counts overlap outcomes.

## 2. source-aghion-jones-jones-2017-nber-capture

Outcome: quotation-problems.

Capture used: https://web.archive.org/web/20210303021500/https://www.nber.org/system/files/working_papers/w23928/w23928.pdf (20210303021500).

- evidence-ec-g04-c: differs. Capture text: “One theme that emerges is based on Baumol’s “cost disease” insight: growth may be constrained not by what we are good at but rather by what is essential and yet hard to improve.”. PDF extraction: wrapped word hyphens, decimal spacing and spaces before punctuation normalized. Quotation punctuation differs. Proposed correction: One theme that emerges is based on Baumol’s “cost disease” insight: growth may be constrained not by what we are good at but rather by what is essential and yet hard to improve.

## 5. source-erdil-besiroglu-2023-explosive-growth-review

Outcome: quotation-problems.

Capture used: https://web.archive.org/web/20250630102426/http://arxiv.org/pdf/2309.11690v2 (20250630102426).

- evidence-ec-g04-g: differs. Capture text: “there’s still room for explosive growth if AI can automate e.g. 90% of tasks in the economy and it can do so in a period of less than 10 years.”. PDF extraction: wrapped word hyphens, decimal spacing and spaces before punctuation normalized. Quotation punctuation differs. Proposed correction: there’s still room for explosive growth if AI can automate e.g. 90% of tasks in the economy and it can do so in a period of less than 10 years.

## 17. source-agi-ruin-2022

Outcome: quotation-problems.

Capture used: https://web.archive.org/web/20220605225854/https://www.lesswrong.com/posts/uMQ3cqWDPHhjtiesc/agi-ruin-a-list-of-lethalities (20220605225854).

- evidence-ts-b3-agi-ruin: differs. Capture text: “'change your outer behavior to deliberately look more aligned and deceive the programmers, operators, and possibly any loss functions optimizing over you'. This problem is one that will appear at the superintelligent level”. Quotation punctuation differs. Proposed correction: 'change your outer behavior to deliberately look more aligned and deceive the programmers, operators, and possibly any loss functions optimizing over you'. This problem is one that will appear at the superintelligent level

## 26. source-anthropic-ltbt-2023

Outcome: quotation-problems.

Capture used: https://web.archive.org/web/20230925170803/https://www.anthropic.com/index/the-long-term-benefit-trust (20230925170803).

- lg-ev-ant-matheny-ltbt-departure-2023: not found. Capture text: “Jason Matheny: CEO of the RAND Corporation”. The complete captured text was searched. It identifies the initial trustees and contains neither the December 2023 nor January 2026 departure updates. The capture text shown is the related initial-trustee listing, not the missing departure footnote. Proposed correction: Locate and cite a later capture that contains the dated departure footnote; retain the 2023 capture for the original Trust announcement.

- lg-ev-ant-bahl-ltbt-departure-2026: not found. Capture text: “Kanika Bahl: CEO & President of Evidence Action”. The complete captured text was searched. It identifies the initial trustees and contains neither the December 2023 nor January 2026 departure updates. The capture text shown is the related initial-trustee listing, not the missing departure footnote. Proposed correction: Locate and cite a later capture that contains the dated departure footnote; retain the 2023 capture for the original Trust announcement.

- lg-ev-ant-robinson-ltbt-departure-2026: not found. Capture text: “Zach Robinson: Interim CEO of Effective Ventures US”. The complete captured text was searched. It identifies the initial trustees and contains neither the December 2023 nor January 2026 departure updates. The capture text shown is the related initial-trustee listing, not the missing departure footnote. Proposed correction: Locate and cite a later capture that contains the dated departure footnote; retain the 2023 capture for the original Trust announcement.

## 30. source-arbital-optimization-daemons

Outcome: quotation-problems.

Capture used: https://web.archive.org/web/20211204142442/https://arbital.greaterwrong.com/p/daemons/ (20211204142442).

- evidence-ts-b3-arbital-daemons-context: differs. Capture text: “Initially, these cognitive optimizers pursued goals that correlated well with natural selection’s optimization target of reproductive fitness […] such rapid capability gain occurred that a context change took place and the brains’ pursuit of their internal goals no longer correlated reliably with DNA replication.”. Explicit editorial omission marks checked as ordered verbatim fragments. Quotation punctuation differs. Proposed correction: Initially, these cognitive optimizers pursued goals that correlated well with natural selection’s optimization target of reproductive fitness […] such rapid capability gain occurred that a context change took place and the brains’ pursuit of their internal goals no longer correlated reliably with DNA replication.

- evidence-ts-a4-arbital-daemons-context: differs. Capture text: “Initially, these cognitive optimizers pursued goals that correlated well with natural selection’s optimization target of reproductive fitness […] such rapid capability gain occurred that a context change took place and the brains’ pursuit of their internal goals no longer correlated reliably with DNA replication.”. Explicit editorial omission marks checked as ordered verbatim fragments. Quotation punctuation differs. Proposed correction: Initially, these cognitive optimizers pursued goals that correlated well with natural selection’s optimization target of reproductive fitness […] such rapid capability gain occurred that a context change took place and the brains’ pursuit of their internal goals no longer correlated reliably with DNA replication.

## 35. source-butler-1863-press

Outcome: quotation-problems.

Capture used: https://web.archive.org/web/20260826113039/https://paperspast.natlib.govt.nz/newspapers/CHP18630613.2.4 (20260826113039).

- evidence-ts-a1-butler-1863-context: differs. Capture text: “we are ourselves creating our own successors; we are daily adding to the beauty and delicacy of their physical organization ; we are daily giving them greater power […] In the course of ages we shall find ourselves the inferior race.”. Difference in captured OCR spacing; the original page image was not inspected. Proposed correction: Retain wording; inspect the newspaper image before changing punctuation. The captured OCR inserts a space before the semicolon.

- evidence-ts-a4-butler-1863-context: differs. Capture text: “we are ourselves creating our own successors; we are daily adding to the beauty and delicacy of their physical organization ; we are daily giving them greater power […] In the course of ages we shall find ourselves the inferior race.”. Difference in captured OCR spacing; the original page image was not inspected. Proposed correction: Retain wording; inspect the newspaper image before changing punctuation. The captured OCR inserts a space before the semicolon.

## 56. source-christiano-2019-what-failure-looks-like

Outcome: quotation-problems.

Capture used: https://web.archive.org/web/20190608113631/https://www.alignmentforum.org/posts/HBxe6wdjxK239zajf/what-failure-looks-like (20190608113631).

- evidence-ts-a4-christiano-2019-wflf-context: differs. Capture text: “These problems are worse in worlds where progress is relatively fast, and fast takeoff can be a key risk factor, but I’m scared even if we have several years. […] I think the basic problems are still essentially the same though”. Explicit editorial omission marks checked as ordered verbatim fragments. Quotation punctuation differs. Proposed correction: These problems are worse in worlds where progress is relatively fast, and fast takeoff can be a key risk factor, but I’m scared even if we have several years. […] I think the basic problems are still essentially the same though

## 57. source-christiano-2022-where-i-agree-and-disagree

Outcome: quotation-problems.

Capture used: https://web.archive.org/web/20220619200048/https://www.lesswrong.com/posts/CoZhXrhpQxpy9xw9y/where-i-agree-and-disagree-with-eliezer (20220619200048).

- evidence-ts-b1-christiano-2022-contests: differs. Capture text: “AI systems avoid making major technical contributions, or revealing the extent of their capabilities, because they are lying in wait to cause trouble later. But […] SGD will be aggressively selecting against any AI systems who don’t do impressive-looking stuff.”. Explicit editorial omission marks checked as ordered verbatim fragments. Quotation punctuation differs. Proposed correction: AI systems avoid making major technical contributions, or revealing the extent of their capabilities, because they are lying in wait to cause trouble later. But […] SGD will be aggressively selecting against any AI systems who don’t do impressive-looking stuff.

- evidence-ts-b2-christiano-2022-contests: differs. Capture text: “AI systems avoid making major technical contributions, or revealing the extent of their capabilities, because they are lying in wait to cause trouble later. But […] SGD will be aggressively selecting against any AI systems who don’t do impressive-looking stuff.”. Explicit editorial omission marks checked as ordered verbatim fragments. Quotation punctuation differs. Proposed correction: AI systems avoid making major technical contributions, or revealing the extent of their capabilities, because they are lying in wait to cause trouble later. But […] SGD will be aggressively selecting against any AI systems who don’t do impressive-looking stuff.

- evidence-ts-a4-christiano-2022-context: differs. Capture text: “AI systems avoid making major technical contributions, or revealing the extent of their capabilities, because they are lying in wait to cause trouble later. But […] SGD will be aggressively selecting against any AI systems who don’t do impressive-looking stuff.”. Explicit editorial omission marks checked as ordered verbatim fragments. Quotation punctuation differs. Proposed correction: AI systems avoid making major technical contributions, or revealing the extent of their capabilities, because they are lying in wait to cause trouble later. But […] SGD will be aggressively selecting against any AI systems who don’t do impressive-looking stuff.

## 58. source-clancy-besiroglu-2023-great-inflection

Outcome: quotation-problems.

Capture used: https://web.archive.org/web/20231223213358/https://asteriskmag.com/issues/03/the-great-inflection-a-debate-about-ai-and-explosive-growth (20231223213358).

- evidence-ec-g01-e: differs. Capture text: “I am inclined to believe that such explosive growth is not just a possibility, but a probable outcome when we transition to an era where AI automates the vast majority of tasks currently performed by humans. To put this in numbers, I’d currently assign a 65% chance”. Quotation punctuation differs. Proposed correction: I am inclined to believe that such explosive growth is not just a possibility, but a probable outcome when we transition to an era where AI automates the vast majority of tasks currently performed by humans. To put this in numbers, I’d currently assign a 65% chance

- evidence-ec-g01-f: differs. Capture text: “I am nervous about relying heavily on economic models to project a break with historical experience, as I don’t think the models are up to the job of making strong quantitative forecasts outside the range of historical experience.”. Quotation punctuation differs. Proposed correction: I am nervous about relying heavily on economic models to project a break with historical experience, as I don’t think the models are up to the job of making strong quantitative forecasts outside the range of historical experience.

- evidence-ec-g01-f2: differs. Capture text: “I think it’s maybe a 10% to 20% chance, depending on how I’m feeling, that economic growth becomes explosive, by your definition”. Quotation punctuation differs. Proposed correction: I think it’s maybe a 10% to 20% chance, depending on how I’m feeling, that economic growth becomes explosive, by your definition

- evidence-ec-g03-f: differs. Capture text: “In this sense, economic acceleration roughly on the order we’re considering for this debate is perhaps actually something of a historical norm.”. Quotation punctuation differs. Proposed correction: In this sense, economic acceleration roughly on the order we’re considering for this debate is perhaps actually something of a historical norm.

- evidence-ec-g03-g: differs. Capture text: “I think it’s notable that none of the accelerations we’re talking about or the rapid rates of catch-up growth experienced in the Asian tigers are typically believed to be driven by a sudden influx of intelligence into the economy.”. Quotation punctuation differs. Proposed correction: I think it’s notable that none of the accelerations we’re talking about or the rapid rates of catch-up growth experienced in the Asian tigers are typically believed to be driven by a sudden influx of intelligence into the economy.

- evidence-ec-g04-k: differs. Capture text: “my best guess at why we won’t see changes as dramatic as you anticipate is because there are going to be a billion little bottlenecks that will persistently slow the rate at which AGI takes over tasks.”. Quotation punctuation differs. Proposed correction: my best guess at why we won’t see changes as dramatic as you anticipate is because there are going to be a billion little bottlenecks that will persistently slow the rate at which AGI takes over tasks.

- evidence-ec-g04-k2: differs. Capture text: “First, I don’t think each of these bottlenecks is enough, on its own, to short-circuit explosive growth. It’s their accumulation.”. Quotation punctuation differs. Proposed correction: First, I don’t think each of these bottlenecks is enough, on its own, to short-circuit explosive growth. It’s their accumulation.

- evidence-ec-g09-j: differs. Capture text: “I am inclined to believe that such explosive growth is not just a possibility, but a probable outcome when we transition to an era where AI automates the vast majority of tasks currently performed by humans. To put this in numbers, I’d currently assign a 65% chance”. Quotation punctuation differs. Proposed correction: I am inclined to believe that such explosive growth is not just a possibility, but a probable outcome when we transition to an era where AI automates the vast majority of tasks currently performed by humans. To put this in numbers, I’d currently assign a 65% chance

- evidence-ec-g09-k: differs. Capture text: “I think it’s maybe a 10% to 20% chance, depending on how I’m feeling, that economic growth becomes explosive, by your definition”. Quotation punctuation differs. Proposed correction: I think it’s maybe a 10% to 20% chance, depending on how I’m feeling, that economic growth becomes explosive, by your definition

## 61. source-coggins-pf-v2

Outcome: quotation-problems.

Capture used: https://web.archive.org/web/20251205152906/https://arxiv.org/abs/2509.24394 (20251205152906).

- evidence-assessed-preparedness-v2-high-deployment-mitigation-coggins-conclusion: not found. Capture text: “We find that this safety policy requests evaluation of a small minority of AI risks”. Neither “We conclude” nor “Key result #3” appears in the complete captured page. The text shown is from its abstract, not a replacement for the missing quotation. Proposed correction: Locate an archived full-text PDF of arXiv:2509.24394 and recheck the quotation there; the cited capture is an abstract page.

- evidence-assessed-preparedness-v2-high-deployment-mitigation-coggins-ceo: not found. Capture text: “allows OpenAI's CEO to deploy even more dangerous capabilities.”. Neither “We conclude” nor “Key result #3” appears in the complete captured page. The text shown is from its abstract, not a replacement for the missing quotation. Proposed correction: Locate an archived full-text PDF of arXiv:2509.24394 and recheck the quotation there; the cited capture is an abstract page.

## 62. source-corrigibility-2015-pdf

Outcome: quotation-problems.

Capture used: https://web.archive.org/web/20150322195302/https://intelligence.org/files/Corrigibility.pdf (20150322195302).

- evidence-ts-b1-corrigibility: differs. Capture text: “this deception could lead an agent to maximize […] only until it is powerful enough to avoid correction by its programmers […] Bostrom (2014) refers to this as a “treacherous turn”.”. Explicit editorial omission marks checked as ordered verbatim fragments. PDF extraction: wrapped word hyphens, decimal spacing and spaces before punctuation normalized. Quotation punctuation differs. Proposed correction: this deception could lead an agent to maximize […] only until it is powerful enough to avoid correction by its programmers […] Bostrom (2014) refers to this as a “treacherous turn”.

- evidence-ts-b2-corrigibility: differs. Capture text: “this deception could lead an agent to maximize […] only until it is powerful enough to avoid correction by its programmers […] Bostrom (2014) refers to this as a “treacherous turn”.”. Explicit editorial omission marks checked as ordered verbatim fragments. PDF extraction: wrapped word hyphens, decimal spacing and spaces before punctuation normalized. Quotation punctuation differs. Proposed correction: this deception could lead an agent to maximize […] only until it is powerful enough to avoid correction by its programmers […] Bostrom (2014) refers to this as a “treacherous turn”.

## 65. source-davidson-2021-explosive-economic-growth

Outcome: quotation-problems.

Capture used: https://web.archive.org/web/20210702003241/https://www.openphilanthropy.org/could-advanced-ai-drive-explosive-economic-growth (20210702003241).

- evidence-ec-g04-f: differs. Capture text: “I don’t think this provides a decisive reason to rule out explosive growth. Firstly, it’s possible that we will ultimately automate all essential tasks, or restructure work-flows to do without them.”. Quotation punctuation differs. Proposed correction: I don’t think this provides a decisive reason to rule out explosive growth. Firstly, it’s possible that we will ultimately automate all essential tasks, or restructure work-flows to do without them.

## 72. source-eu-code-news-2025

Outcome: quotation-problems.

Capture used: https://web.archive.org/web/20250710132112/https://digital-strategy.ec.europa.eu/en/news/general-purpose-ai-code-practice-now-available (20250710132112).

- evidence-cm-eu-code-published-1: differs. Capture text: “the European Commission has received the final version of the General-Purpose AI Code of Practice”. The captured sentence begins “Today, the European Commission”; the retained fragment begins with lower-case “the”. Proposed correction: Quote “Today, the European Commission has received the final version of the General-Purpose AI Code of Practice”, or mark the initial capital as an editorial change.

## 81. source-extropians-1996-09-03-hanson

Outcome: quotation-problems.

Capture used: https://web.archive.org/web/20150427164816/http://extropians.weidai.com/extropians.96/0731.html (20150427164816).

- evidence-ts-a4-hanson-1996-09-03-contests: differs. Capture text: “any one AI probably won't be too far ahead of any other AI”. Quotation punctuation differs. Proposed correction: any one AI probably won't be too far ahead of any other AI

- evidence-ts-a6-hanson-1996-09-03-contests: differs. Capture text: “any one AI probably won't be too far ahead of any other AI”. Quotation punctuation differs. Proposed correction: any one AI probably won't be too far ahead of any other AI

## 94. source-extropians-1998-09-24-hanson

Outcome: quotation-problems.

Capture used: https://web.archive.org/web/20150428002928/http://extropians.weidai.com/extropians.3Q98/2611.html (20150428002928).

- evidence-ts-a1-hanson-1998-09-24-contests: differs. Capture text: “We've had "positive feedback" […] for a long time. […] Neither of these considerations obviously suggests a break with history.”. Explicit editorial omission marks checked as ordered verbatim fragments. Quotation punctuation differs. Proposed correction: We've had "positive feedback" […] for a long time. […] Neither of these considerations obviously suggests a break with history.

- evidence-ts-a3-hanson-1998-09-24-context: differs. Capture text: “We've had "positive feedback" […] for a long time. […] Neither of these considerations obviously suggests a break with history.”. Explicit editorial omission marks checked as ordered verbatim fragments. Quotation punctuation differs. Proposed correction: We've had "positive feedback" […] for a long time. […] Neither of these considerations obviously suggests a break with history.

## 111. source-grace-2014-superintelligence-11

Outcome: quotation-problems.

Capture used: https://web.archive.org/web/20180612220909/https://www.lesswrong.com/posts/B39GNTsN3HocW8KFo/superintelligence-11-the-treacherous-turn (20180612220909).

- evidence-ts-a6-grace-2014-treacherous-turn: differs. Capture text: “The possibility of a first mover advantage + orthogonality thesis + convergent instrumental values suggests doom for humanity (p115-6) First mover advantage implies the AI is in a position to do what it wants”. The captured page presents a bullet and sub-bullet without a literal slash. Proposed correction: Use a line break between the bullet and sub-bullet, or explicitly identify the slash as editorial list-break notation.

## 118. source-karnofsky-2020-comment-human-trajectory

Outcome: quotation-problems.

Capture used: https://web.archive.org/web/20200623172927/https://www.openphilanthropy.org/blog/modeling-human-trajectory (20200623172927).

- evidence-ec-g03-d: differs. Capture text: “I tentatively agree with what I see as the central themes: that a sufficiently broad view of history shows accelerating growth, that this dynamic is inherently unstable, and that we therefore have little reason to “rule out” explosive growth in the coming decades.”. Quotation punctuation differs. Proposed correction: I tentatively agree with what I see as the central themes: that a sufficiently broad view of history shows accelerating growth, that this dynamic is inherently unstable, and that we therefore have little reason to “rule out” explosive growth in the coming decades.

- evidence-ec-g09-c: differs. Capture text: “I tentatively agree with what I see as the central themes: that a sufficiently broad view of history shows accelerating growth, that this dynamic is inherently unstable, and that we therefore have little reason to “rule out” explosive growth in the coming decades.”. Quotation punctuation differs. Proposed correction: I tentatively agree with what I see as the central themes: that a sufficiently broad view of history shows accelerating growth, that this dynamic is inherently unstable, and that we therefore have little reason to “rule out” explosive growth in the coming decades.

## 132. source-nordhaus-2015-cowles

Outcome: quotation-problems.

Capture used: https://web.archive.org/web/20160809230752/http://cowles.yale.edu/sites/default/files/files/pub/d20/d2021.pdf (20160809230752).

- evidence-ec-g04-b: differs. Capture text: “If the elasticity of substitution is less than one, then information capital’s share in production declines over time, and the growth in aggregate productivity tends toward the growth of the relatively fixed factor, labor.”. PDF extraction: wrapped word hyphens, decimal spacing and spaces before punctuation normalized. Quotation punctuation differs. Proposed correction: If the elasticity of substitution is less than one, then information capital’s share in production declines over time, and the growth in aggregate productivity tends toward the growth of the relatively fixed factor, labor.

## 134. source-openai-christiano-2026

Outcome: verified.

- cited: https://web.archive.org/web/20260909212746id_/https://openai.com/index/paul-christiano-joins-openai-foundation-board/ — TypeError: Z_DATA_ERROR: terminated.
- CDX-replay: https://web.archive.org/web/20260909212746id_/https://openai.com/index/paul-christiano-joins-openai-foundation-board/ — TypeError: UND_ERR_CONNECT_TIMEOUT: fetch failed.

Capture used: https://web.archive.org/web/20260910065617/https://openai.com/index/paul-christiano-joins-openai-foundation-board/ (20260910065617).

## 138. source-openai-new-initial-board-2023

Outcome: verified.

- cited: https://web.archive.org/web/20231130020514id_/https://openai.com/blog/sam-altman-returns-as-ceo-openai-has-a-new-initial-board — TypeError: UND_ERR_CONNECT_TIMEOUT: fetch failed.

Capture used: https://web.archive.org/web/20240502230447/https://openai.com/index/sam-altman-returns-as-ceo-openai-has-a-new-initial-board (20240502230447).

## 148. source-rlo-2019-deceptive-alignment

Outcome: quotation-problems.

Capture used: https://web.archive.org/web/20190923160252/https://www.alignmentforum.org/posts/zthDPAjh9w6Ytbeks/deceptive-alignment (20190923160252).

- evidence-ap-vladimir-mikulik-rlo-2019-deceptive-alignment: differs. Capture text: “Vladimir Mikulik”. The captured byline reads “Vladimir Mikulik”; “Vlad Mikulik” is absent from the captured page. Proposed correction: Quote “Vladimir Mikulik” and use the captured article’s visible byline as the locator.

## 153. source-rsp-2-2

Outcome: verified.

Capture used: https://web.archive.org/web/20250514223759/https://www-cdn.anthropic.com/872c653b2d0501d6ab44cf87f43e1dc4853e4d37.pdf (20250514223759).

PDF text-layer discrepancy: On PDF page 14 (printed page 10), the visible item 4 says “deployment and training” and “Safeguards Report”; PDF.js extraction says “deployment” and “Capability Report”. Repeated retrievals have the same SHA-256. Proposed correction: Retain the stored quotation and verify it against the rendered page. Do not substitute the extracted wording.

## 163. source-saferai-rsp-2024

Outcome: quotation-problems.

Capture used: https://web.archive.org/web/20241109111638/https://www.safer-ai.org/post/anthropics-responsible-scaling-policy-update-makes-a-step-backwards (20241109111638).

- evidence-rsp-v2-0-assessed-weakening-saferai: differs. Capture text: “This shift significantly reduces transparency and accountability, essentially asking stakeholders to accept a "trust us to handle it appropriately" approach rather than providing verifiable commitments and metrics.”. Quotation punctuation differs. Proposed correction: This shift significantly reduces transparency and accountability, essentially asking stakeholders to accept a "trust us to handle it appropriately" approach rather than providing verifiable commitments and metrics.

- evidence-rsp-v2-0-assessed-weakening-saferai-title: differs. Capture text: “Anthropic’s Responsible Scaling Policy Update Makes a Step Backwards”. Headline capitalization differs. Proposed correction: Quote the headline with its captured capitalization: “Anthropic’s Responsible Scaling Policy Update Makes a Step Backwards”.

## 167. source-sl4-2002-03-08-yudkowsky

Outcome: verified.

- cited: https://web.archive.org/web/20040915203720id_/http://sl4.org/archive/0203/3132.html — HTTP 200 — Wrong message: “Re: Uploading and sensory deprivation”; the sender is Nathan Russell. The expected sender’s name occurs only in navigation..
- identity-fallback-search: https://web.archive.org/web/20040915203720id_/http://sl4.org/archive/0203/subject.html — HTTP 302 → https://web.archive.org/web/20041011020130id_/http://sl4.org/archive/0203/subject.html.

Capture used: https://web.archive.org/web/20070505151319/http://sl4.org:80/archive/0203/3132.html (20070505151319).

Capture correction: https://web.archive.org/web/20070505151319/http://sl4.org:80/archive/0203/3132.html; archivedAt 2007-05-05. The cited 2004 capture returns a different message. The nearest later distinct capture in the queried index, from 2007, contains the intended message and both quotations.

## 168. source-solomonoff-1985-author-pdf

Outcome: quotation-problems.

Capture used: https://web.archive.org/web/20060716061705/http://world.std.com:80/%7Erjs/timesc.pdf (20060716061705).

- evidence-ts-a5-solomonoff-1985: verbatim. Capture text: “the new “artificial” computer scientists will help speed the construction of the new machines.”. Visually inspected PDF page 5; visible wording matches. The extractor omits some ligatures. The passage is on PDF page 5 (printed page 5), rather than the stated page 4. Proposed correction: Change the locator to the discussion of milestone F on PDF page 5 (printed page 5).

## 179. source-yudkowsky-2008-hard-takeoff

Outcome: quotation-problems.

Capture used: https://web.archive.org/web/20181213042057/https://www.lesswrong.com/posts/tjH8XPxAnr6JRbh7k/hard-takeoff (20181213042057).

- evidence-ts-a5-yudkowsky-2008-hard-takeoff: differs. Capture text: “Moore's Law is exponential now; it would be really odd if it stayed exponential with the improving computers doing the research.”. Quotation punctuation differs. Proposed correction: Moore's Law is exponential now; it would be really odd if it stayed exponential with the improving computers doing the research.

- evidence-ts-a4-yudkowsky-2008-hard-takeoff: differs. Capture text: “RSI is the biggest, most interesting, hardest-to-analyze, sharpest break-with-the-past contributing to the notion of a "hard takeoff" aka "AI go FOOM"”. Quotation punctuation differs. Proposed correction: RSI is the biggest, most interesting, hardest-to-analyze, sharpest break-with-the-past contributing to the notion of a "hard takeoff" aka "AI go FOOM"

## 180. source-yudkowsky-2008-recursive-self-improvement

Outcome: quotation-problems.

Capture used: https://web.archive.org/web/20190427074418/https://www.lesswrong.com/posts/JBadX7rwdcRFzGuju/recursive-self-improvement (20190427074418).

- evidence-ts-a3-yudkowsky-2008-rsi: differs. Capture text: “Recursion is the sort of thing that happens when you hand the AI the object-level problem of "redesign your own cognitive algorithms".”. Quotation punctuation differs. Proposed correction: Recursion is the sort of thing that happens when you hand the AI the object-level problem of "redesign your own cognitive algorithms".

## 181. c2-src-ernie45-github-readme

Outcome: verified.

- Save-Page-Now: https://web.archive.org/save/https://raw.githubusercontent.com/PaddlePaddle/ERNIE/a95ef9dc7ef56c8546ca2f171e8bbd1f0ee6e0fa/README.md — HTTP 302 → https://web.archive.org/web/20261028140337/https://raw.githubusercontent.com/PaddlePaddle/ERNIE/a95ef9dc7ef56c8546ca2f171e8bbd1f0ee6e0fa/README.md.
- saved-new-replay: https://web.archive.org/web/20261028140337id_/https://raw.githubusercontent.com/PaddlePaddle/ERNIE/a95ef9dc7ef56c8546ca2f171e8bbd1f0ee6e0fa/README.md — TypeError: UND_ERR_CONNECT_TIMEOUT: fetch failed.

Current page: https://raw.githubusercontent.com/PaddlePaddle/ERNIE/a95ef9dc7ef56c8546ca2f171e8bbd1f0ee6e0fa/README.md — HTTP 200. 2/2 supplied quotations verbatim.

Save Page Now reported: https://web.archive.org/web/20261028140337/https://raw.githubusercontent.com/PaddlePaddle/ERNIE/a95ef9dc7ef56c8546ca2f171e8bbd1f0ee6e0fa/README.md (20261028140337); replay-checked.

Capture used: https://web.archive.org/web/20261028140337/https://raw.githubusercontent.com/PaddlePaddle/ERNIE/a95ef9dc7ef56c8546ca2f171e8bbd1f0ee6e0fa/README.md (20261028140337).

## 189. c2-src-kimi-k3-blog

Outcome: verified.

- CDX-replay: https://web.archive.org/web/20261015122909id_/https://www.kimi.com/en/blog/kimi-k3 — TypeError: ECONNREFUSED: fetch failed.

Capture used: https://web.archive.org/web/20261013180350/https://www.kimi.com/en/blog/kimi-k3 (20261013180350).

## 190. c2-src-kimi-k3-card

Outcome: verified.

Capture used: https://web.archive.org/web/20261028223707/https://huggingface.co/moonshotai/Kimi-K3/raw/2496450e92e425c886db095102a52a6682ca3970/README.md (20261028223707); raw entry HTTP 200.

- Retrieval: CDX — TypeError: ECONNREFUSED: fetch failed; https://web.archive.org/cdx/search/cdx?url=https%3A%2F%2Fhuggingface.co%2Fmoonshotai%2FKimi-K3%2Fraw%2F2496450e92e425c886db095102a52a6682ca3970%2FREADME.md&output=json&filter=statuscode%3A200&fl=timestamp,original,mimetype,statuscode,digest

Current page: https://huggingface.co/moonshotai/Kimi-K3/raw/2496450e92e425c886db095102a52a6682ca3970/README.md — HTTP 200.

Save Page Now: replay-checked; https://web.archive.org/web/20261028223707/https://huggingface.co/moonshotai/Kimi-K3/raw/2496450e92e425c886db095102a52a6682ca3970/README.md.

## 192. c2-src-kimi-k3-report

Outcome: verified.

Capture used: https://web.archive.org/web/20261028221116/https://raw.githubusercontent.com/MoonshotAI/Kimi-K3/0797decb18ab079de86f991b87a64b81ec15a3c2/k3_tech_report.pdf (20261028221116); raw entry HTTP 200.

- Retrieval: Save-Page-Now — TimeoutError: The operation was aborted due to timeout; https://web.archive.org/save/https://raw.githubusercontent.com/MoonshotAI/Kimi-K3/0797decb18ab079de86f991b87a64b81ec15a3c2/k3_tech_report.pdf

Current page: https://raw.githubusercontent.com/MoonshotAI/Kimi-K3/0797decb18ab079de86f991b87a64b81ec15a3c2/k3_tech_report.pdf — HTTP 200.

Save Page Now: capture-found-after-timeout.

## 193. c2-src-kimi-vl-card

Outcome: verified.

Capture used: https://web.archive.org/web/20261028221200/https://huggingface.co/moonshotai/Kimi-VL-A3B-Instruct/raw/704b5c8dd92ce59334c94107efcbd8cf00b46832/README.md (20261028221200); raw entry HTTP 200.

- Retrieval: Save-Page-Now — TimeoutError: The operation was aborted due to timeout; https://web.archive.org/save/https://huggingface.co/moonshotai/Kimi-VL-A3B-Instruct/raw/704b5c8dd92ce59334c94107efcbd8cf00b46832/README.md

Current page: https://huggingface.co/moonshotai/Kimi-VL-A3B-Instruct/raw/704b5c8dd92ce59334c94107efcbd8cf00b46832/README.md — HTTP 200.

Save Page Now: capture-found-after-timeout.

## 196. c2-src-minimax-m1-license

Outcome: verified.

Capture used: https://web.archive.org/web/20261028221330/https://raw.githubusercontent.com/MiniMax-AI/MiniMax-M1/aa761a9c12a3e154440d14073c86b4fe93d105c0/LICENSE (20261028221330); raw entry HTTP 200.

- Retrieval: Save-Page-Now — TimeoutError: The operation was aborted due to timeout; https://web.archive.org/save/https://raw.githubusercontent.com/MiniMax-AI/MiniMax-M1/aa761a9c12a3e154440d14073c86b4fe93d105c0/LICENSE

Current page: https://raw.githubusercontent.com/MiniMax-AI/MiniMax-M1/aa761a9c12a3e154440d14073c86b4fe93d105c0/LICENSE — HTTP 200.

Save Page Now: capture-found-after-timeout.

## 201. c2-src-minimax-m3-card

Outcome: verified.

Capture used: https://web.archive.org/web/20261028223847/https://huggingface.co/MiniMaxAI/MiniMax-M3/raw/81b23f9add855c2eaf3d41cc38e9754897eff5f3/README.md (20261028223847); raw entry HTTP 200.

- Retrieval: CDX — TypeError: ECONNREFUSED: fetch failed; https://web.archive.org/cdx/search/cdx?url=https%3A%2F%2Fhuggingface.co%2FMiniMaxAI%2FMiniMax-M3%2Fraw%2F81b23f9add855c2eaf3d41cc38e9754897eff5f3%2FREADME.md&output=json&filter=statuscode%3A200&fl=timestamp,original,mimetype,statuscode,digest

Current page: https://huggingface.co/MiniMaxAI/MiniMax-M3/raw/81b23f9add855c2eaf3d41cc38e9754897eff5f3/README.md — HTTP 200.

Save Page Now: replay-checked; https://web.archive.org/web/20261028223847/https://huggingface.co/MiniMaxAI/MiniMax-M3/raw/81b23f9add855c2eaf3d41cc38e9754897eff5f3/README.md.

## 202. c2-src-minimax-m3-license

Outcome: verified.

- Save-Page-Now: https://web.archive.org/save/https://huggingface.co/MiniMaxAI/MiniMax-M3/raw/81b23f9add855c2eaf3d41cc38e9754897eff5f3/LICENSE — HTTP 302 → https://web.archive.org/web/20261028223920/https://huggingface.co/MiniMaxAI/MiniMax-M3/raw/81b23f9add855c2eaf3d41cc38e9754897eff5f3/LICENSE.
- saved-new-replay: https://web.archive.org/web/20261028223920id_/https://huggingface.co/MiniMaxAI/MiniMax-M3/raw/81b23f9add855c2eaf3d41cc38e9754897eff5f3/LICENSE — TypeError: UND_ERR_CONNECT_TIMEOUT: fetch failed.

Current page: https://huggingface.co/MiniMaxAI/MiniMax-M3/raw/81b23f9add855c2eaf3d41cc38e9754897eff5f3/LICENSE — HTTP 200. 4/4 supplied quotations verbatim.

Save Page Now reported: https://web.archive.org/web/20261028223920/https://huggingface.co/MiniMaxAI/MiniMax-M3/raw/81b23f9add855c2eaf3d41cc38e9754897eff5f3/LICENSE (20261028223920); replay-checked.

Capture used: https://web.archive.org/web/20261028223920/https://huggingface.co/MiniMaxAI/MiniMax-M3/raw/81b23f9add855c2eaf3d41cc38e9754897eff5f3/LICENSE (20261028223920).

## 205. c2-src-seed-coder-hf-readme-1c5af72a

Outcome: verified.

Capture used: https://web.archive.org/web/20261028224015/https://huggingface.co/ByteDance-Seed/Seed-Coder-8B-Instruct/raw/1c5af72afa21c22c9272a0b60a3a404195e88fcd/README.md (20261028224015); raw entry HTTP 200.

- Retrieval: CDX — TypeError: UND_ERR_CONNECT_TIMEOUT: fetch failed; https://web.archive.org/cdx/search/cdx?url=https%3A%2F%2Fhuggingface.co%2FByteDance-Seed%2FSeed-Coder-8B-Instruct%2Fraw%2F1c5af72afa21c22c9272a0b60a3a404195e88fcd%2FREADME.md&output=json&filter=statuscode%3A200&fl=timestamp,original,mimetype,statuscode,digest

Current page: https://huggingface.co/ByteDance-Seed/Seed-Coder-8B-Instruct/raw/1c5af72afa21c22c9272a0b60a3a404195e88fcd/README.md — HTTP 200.

Save Page Now: replay-checked; https://web.archive.org/web/20261028224015/https://huggingface.co/ByteDance-Seed/Seed-Coder-8B-Instruct/raw/1c5af72afa21c22c9272a0b60a3a404195e88fcd/README.md.

## 206. c2-src-seed-coder-hf-readme-f80ca53f

Outcome: verified.

- Save-Page-Now: https://web.archive.org/save/https://huggingface.co/ByteDance-Seed/Seed-Coder-8B-Instruct/raw/f80ca53f4789f6eb8e73e1bf633291d875dd56d1/README.md — HTTP 302 → https://web.archive.org/web/20261028221627/https://huggingface.co/ByteDance-Seed/Seed-Coder-8B-Instruct/raw/f80ca53f4789f6eb8e73e1bf633291d875dd56d1/README.md.
- saved-new-replay: https://web.archive.org/web/20261028221627id_/https://huggingface.co/ByteDance-Seed/Seed-Coder-8B-Instruct/raw/f80ca53f4789f6eb8e73e1bf633291d875dd56d1/README.md — TypeError: UND_ERR_CONNECT_TIMEOUT: fetch failed.

Current page: https://huggingface.co/ByteDance-Seed/Seed-Coder-8B-Instruct/raw/f80ca53f4789f6eb8e73e1bf633291d875dd56d1/README.md — HTTP 200. 1/1 supplied quotations verbatim.

Save Page Now reported: https://web.archive.org/web/20261028221627/https://huggingface.co/ByteDance-Seed/Seed-Coder-8B-Instruct/raw/f80ca53f4789f6eb8e73e1bf633291d875dd56d1/README.md (20261028221627); replay-checked.

Capture used: https://web.archive.org/web/20261028221627/https://huggingface.co/ByteDance-Seed/Seed-Coder-8B-Instruct/raw/f80ca53f4789f6eb8e73e1bf633291d875dd56d1/README.md (20261028221627).

## 207. c2-src-seed-doubao15pro

Outcome: verified.

- CDX-replay: https://web.archive.org/web/20260806032452id_/https://seed.bytedance.com/zh/special/doubao_1_5_pro — TypeError: ECONNREFUSED: fetch failed.
- CDX-replay: https://web.archive.org/web/20260312172643id_/https://seed.bytedance.com/zh/special/doubao_1_5_pro — TypeError: UND_ERR_CONNECT_TIMEOUT: fetch failed.
- CDX-replay: https://web.archive.org/web/20250627021301id_/https://seed.bytedance.com/zh/special/doubao_1_5_pro/ — TypeError: ECONNREFUSED: fetch failed.
- CDX-replay: https://web.archive.org/web/20250516105151id_/https://seed.bytedance.com/zh/special/doubao_1_5_pro — TypeError: ECONNREFUSED: fetch failed.

Current page: https://seed.bytedance.com/zh/special/doubao_1_5_pro — HTTP 200. 2/3 supplied quotations verbatim.

Capture used: https://web.archive.org/web/20261006200417/https://seed.bytedance.com/zh/special/doubao_1_5_pro (20261006200417).

## 208. c2-src-seed-oss-gh-license

Outcome: verified.

Capture used: https://web.archive.org/web/20261028224048/https://raw.githubusercontent.com/ByteDance-Seed/seed-oss/3dc7757688bcfe3742e0ff9e393936ec5383a22b/LICENSE (20261028224048); raw entry HTTP 200.

- Retrieval: CDX — TypeError: ECONNREFUSED: fetch failed; https://web.archive.org/cdx/search/cdx?url=https%3A%2F%2Fraw.githubusercontent.com%2FByteDance-Seed%2Fseed-oss%2F3dc7757688bcfe3742e0ff9e393936ec5383a22b%2FLICENSE&output=json&filter=statuscode%3A200&fl=timestamp,original,mimetype,statuscode,digest

Current page: https://raw.githubusercontent.com/ByteDance-Seed/seed-oss/3dc7757688bcfe3742e0ff9e393936ec5383a22b/LICENSE — HTTP 200.

Save Page Now: replay-checked; https://web.archive.org/web/20261028224048/https://raw.githubusercontent.com/ByteDance-Seed/seed-oss/3dc7757688bcfe3742e0ff9e393936ec5383a22b/LICENSE.

## 211. c2-src-tc260-asgf-v1-news

Outcome: verified.

Capture used: https://web.archive.org/web/20261028222121/https://www.tc260.org.cn/tc260/xwdt1/202409/ca4adb6f32474a57a3e504023780a638.shtml (20261028222121); raw entry HTTP 200.

- Retrieval: Save-Page-Now — TimeoutError: The operation was aborted due to timeout; https://web.archive.org/save/https://www.tc260.org.cn/tc260/xwdt1/202409/ca4adb6f32474a57a3e504023780a638.shtml

Current page: https://www.tc260.org.cn/tc260/xwdt1/202409/ca4adb6f32474a57a3e504023780a638.shtml — HTTP 200.

Save Page Now: capture-found-after-timeout.

## 212. c2-src-tc260-asgf-v1-pdf

Outcome: quotation-problems.

Current page: https://www.cac.gov.cn/rootimages/uploadimg/1727568303900999/1727568303900999.pdf — HTTP 200. 3/7 supplied quotations verbatim.

Capture used: https://web.archive.org/web/20261017172618/https://www.cac.gov.cn/rootimages/uploadimg/1727568303900999/1727568303900999.pdf (20261017172618).

- c2-ev-governance-tc260-asgf-v1-classification-grading-1: differs. Capture text: “对人工智能系统分类分级，建立风险等级测试评估体系”. CJK layout whitespace removed for comparison. Captured punctuation differs from the supplied quotation. Proposed correction: 对人工智能系统分类分级，建立风险等级测试评估体系

- c2-ev-governance-tc260-asgf-v1-end-use-traceability-1: differs. Capture text: “提高人工智能系统最终用途追溯能力，防止被用于核生化导等大规模杀伤性武器制造等高危场景”. CJK layout whitespace removed for comparison. Captured punctuation differs from the supplied quotation. Proposed correction: 提高人工智能系统最终用途追溯能力，防止被用于核生化导等大规模杀伤性武器制造等高危场景

- c2-ev-governance-tc260-asgf-v1-industry-self-discipline-1: differs. Capture text: “行业协会加强行业自律，制定提出高于监管要求、具有引领示范作用的人工智能安全自律公约”. CJK layout whitespace removed for comparison. Captured punctuation differs from the supplied quotation. Proposed correction: 行业协会加强行业自律，制定提出高于监管要求、具有引领示范作用的人工智能安全自律公约

- c2-ev-governance-tc260-asgf-v1-training-data-cbrn-1: differs. Capture text: “对训练数据进行严格筛选，确保不包含核生化导武器等高危领域敏感数据”. CJK layout whitespace removed for comparison. Captured punctuation differs from the supplied quotation. Proposed correction: 对训练数据进行严格筛选，确保不包含核生化导武器等高危领域敏感数据

## 213. c2-src-tc260-asgf-v2-pdf

Outcome: verified.

Current page: https://www.cac.gov.cn/rootimages/uploadimg/1759653474200838/1759653474200838.pdf — HTTP 200. 8/8 supplied quotations verbatim.

Capture used: https://web.archive.org/web/20260302034821/https://www.cac.gov.cn/rootimages/uploadimg/1759653474200838/1759653474200838.pdf (20260302034821).

PDF text-layer encoding: The text layer uses CJK radical code points and control characters instead of the displayed Hanzi and spacing. The selected quotation pages were checked visually; the quotations match. Proposed correction: Retain the quotations; use the visible PDF and recorded glyph normalization for checking.

## 215. c2-src-tc260-asgf-v3-pdf

Outcome: quotation-problems.

Current page: https://www.tc260.org.cn/tc260/xwdt1/202609/d513a007d04347f58e483fabaefb34b8/files/%E3%80%8A%E4%BA%BA%E5%B7%A5%E6%99%BA%E8%83%BD%E5%AE%89%E5%85%A8%E6%B2%BB%E7%90%86%E6%A1%86%E6%9E%B63.0%E3%80%8B.pdf.pdf — HTTP 200. 1/3 supplied quotations verbatim.

Capture used: https://web.archive.org/web/20260920144343/https://www.tc260.org.cn/tc260/xwdt1/202609/d513a007d04347f58e483fabaefb34b8/files/%E3%80%8A%E4%BA%BA%E5%B7%A5%E6%99%BA%E8%83%BD%E5%AE%89%E5%85%A8%E6%B2%BB%E7%90%86%E6%A1%86%E6%9E%B63.0%E3%80%8B.pdf.pdf (20260920144343).

- c2-ev-governance-tc260-asgf-v3-agent-risk-framework-1: differs. Capture text: “建立智能体风险管理框架，系统分析智能体的安全风险，研究提出安全风险防范措施和应对建议”. CJK layout whitespace removed for comparison. Captured punctuation differs from the supplied quotation. Proposed correction: 建立智能体风险管理框架，系统分析智能体的安全风险，研究提出安全风险防范措施和应对建议

- c2-ev-governance-tc260-asgf-v3-loss-of-control-testing-1: differs. Capture text: “开发者定期进行测试，判断模型是否可能带来潜在技术失控风险”. CJK layout whitespace removed for comparison. Captured punctuation differs from the supplied quotation. Proposed correction: 开发者定期进行测试，判断模型是否可能带来潜在技术失控风险

## 217. lg-src-ant-cuellar-2026

Outcome: verified.

- CDX-replay: https://web.archive.org/web/20260917234602id_/https://www.anthropic.com/news/tino-cuellar — TimeoutError: The operation was aborted due to timeout.

Capture used: https://web.archive.org/web/20260915005327/https://www.anthropic.com/news/tino-cuellar (20260915005327).

## 230. lg-src-cn-01ai-about

Outcome: verified.

- CDX-replay: https://web.archive.org/web/20261007110726id_/https://www.lingyiwanwu.com/about.html — TypeError: ECONNREFUSED: fetch failed.
- CDX-replay: https://web.archive.org/web/20260907142732id_/https://www.lingyiwanwu.com/about.html — TypeError: ECONNREFUSED: fetch failed.
- CDX-replay: https://web.archive.org/web/20260716205053id_/https://www.lingyiwanwu.com/about.html — TypeError: ECONNREFUSED: fetch failed.
- CDX-replay: https://web.archive.org/web/20261019183206id_/https://www.lingyiwanwu.com/about.html — TypeError: ECONNREFUSED: fetch failed.

Current page: https://www.lingyiwanwu.com/about.html — HTTP 200. 8/8 supplied quotations verbatim.

Capture used: https://web.archive.org/web/20261007110726/https://www.lingyiwanwu.com/about.html (20261007110726).

## 231. lg-src-cn-baichuan-home

Outcome: verified.

- CDX: https://web.archive.org/cdx/search/cdx?url=https%3A%2F%2Fwww.baichuan-ai.com%2F&output=json&filter=statuscode%3A200&fl=timestamp,original,mimetype,statuscode,digest — TypeError: ECONNREFUSED: fetch failed.
- archived-script-resource: https://web.archive.org/web/20261007164351id_/https://cdn.baichuan-ai.com/build/_next/static/chunks/13wbiqddj-xgw.js — HTTP 302 → https://web.archive.org/web/20261007164357id_/https://cdn.baichuan-ai.com/build/_next/static/chunks/13wbiqddj-xgw.js.

Current page: https://www.baichuan-ai.com/ — HTTP 200. 3/3 supplied quotations verbatim.

Capture used: https://web.archive.org/web/20261007164351/https://www.baichuan-ai.com/ (20261007164351).

Quotation in archived page resource: The raw captured HTML is an empty application shell. Its referenced archived script preserves all three quotations in the About text. Proposed correction: Retain the source quotation, with both the page capture and recorded script capture available for inspection.

## 232. lg-src-cn-caixin-lin-2026

Outcome: verified.

Capture used: https://web.archive.org/web/20260925104822/https://www.caixinglobal.com/2026-03-04/alibabas-ai-model-chief-resigns-102419448.html (20260925104822); raw entry HTTP 200.

- Retrieval: CDX — TypeError: ECONNREFUSED: fetch failed; https://web.archive.org/cdx/search/cdx?url=https%3A%2F%2Fwww.caixinglobal.com%2F2026-03-04%2Falibabas-ai-model-chief-resigns-102419448.html&output=json&filter=statuscode%3A200&fl=timestamp,original,mimetype,statuscode,digest

Current page: https://www.caixinglobal.com/2026-03-04/alibabas-ai-model-chief-resigns-102419448.html — HTTP 200.

## 233. lg-src-cn-cls-stepfun-2024

Outcome: verified.

Capture used: https://web.archive.org/web/20261029003530/https://caifuhao.eastmoney.com/news/20240323111419028516610 (20261029003530); raw entry HTTP 200.

- Retrieval: CDX — TypeError: ECONNREFUSED: fetch failed; https://web.archive.org/cdx/search/cdx?url=https%3A%2F%2Fcaifuhao.eastmoney.com%2Fnews%2F20240323111419028516610&output=json&filter=statuscode%3A200&fl=timestamp,original,mimetype,statuscode,digest

Current page: https://caifuhao.eastmoney.com/news/20240323111419028516610 — HTTP 200.

Save Page Now: replay-checked; https://web.archive.org/web/20261029003530/https://caifuhao.eastmoney.com/news/20240323111419028516610.

## 234. lg-src-cn-lin-junyang-x-2026

Outcome: verified.

- CDX: https://web.archive.org/cdx/search/cdx?url=https%3A%2F%2Fx.com%2FJustinLin610%2Fstatus%2F2028865835373359513&output=json&filter=statuscode%3A200&fl=timestamp,original,mimetype,statuscode,digest — TypeError: UND_ERR_CONNECT_TIMEOUT: fetch failed.
- alias-replay: https://web.archive.org/web/20260304101755id_/https://twitter.com/justinlin610/status/2028865835373359513 — HTTP 301 → https://web.archive.org/web/20260304101755id_/https://x.com/justinlin610/status/2028865835373359513.
- alias-replay-redirect: https://web.archive.org/web/20260304101755id_/https://x.com/justinlin610/status/2028865835373359513 — HTTP 302 → https://web.archive.org/web/20260304071507id_/https://x.com/JustinLin610/status/2028865835373359513.
- alias-replay: https://web.archive.org/web/20260303195123id_/https://twitter.com/JustinLin610/status/2028865835373359513 — HTTP 301 → https://web.archive.org/web/20260303195123id_/https://x.com/JustinLin610/status/2028865835373359513.
- alias-replay-redirect: https://web.archive.org/web/20260303195123id_/https://x.com/JustinLin610/status/2028865835373359513 — HTTP 302 → https://web.archive.org/web/20260303202757id_/https://x.com/JustinLin610/status/2028865835373359513.

Current page: https://x.com/JustinLin610/status/2028865835373359513 — HTTP 200. 0/0 supplied quotations verbatim.

Capture used: https://web.archive.org/web/20260303161124/https://twitter.com/JustinLin610/status/2028865835373359513 (20260303161124).

Earlier HTML error-page captures: Earlier HTML replays showed an error page. The recorded Twitter-domain raw replay contains structured data for the exact cited post ID and author. Proposed correction: Use the recorded verified structured-post capture; attached media and linked documents require separate checks.

## 237. lg-src-cn-qbitai-stepfun-2026

Outcome: verified.

- Save-Page-Now: https://web.archive.org/save/https://www.36kr.com/p/3657567182938757 — HTTP 302 → https://web.archive.org/web/20261029003800/https://www.36kr.com/p/3657567182938757.

Current page: https://www.36kr.com/p/3657567182938757 — HTTP 200. 5/5 supplied quotations verbatim.

Save Page Now reported: https://web.archive.org/web/20261029003800/https://www.36kr.com/p/3657567182938757 (20261029003800); replay-checked.

Capture used: https://web.archive.org/web/20261029003800/https://www.36kr.com/p/3657567182938757 (20261029003800).

Current-page dateline discrepancy: An earlier current-page check recorded the visible dateline 2026年01月27日 13:30 and article:published_time metadata 2026-10-29T07:16:33+08:00. A new capture was subsequently saved and its five quotations verified. Proposed correction: Preserve the visible publication dateline and machine metadata as separate observations.

## 245. lg-src-deal-cai-verma-2024

Outcome: verified.

- CDX-replay: https://web.archive.org/web/20261015210626id_/https://blog.character.ai/meet-the-team-character-ai-welcomes-sunita-verma-as-chief-technology-officer/ — TypeError: ECONNREFUSED: fetch failed.
- CDX-replay: https://web.archive.org/web/20261011131454id_/https://blog.character.ai/meet-the-team-character-ai-welcomes-sunita-verma-as-chief-technology-officer/ — TypeError: ECONNREFUSED: fetch failed.

Capture used: https://web.archive.org/web/20261015210626/https://blog.character.ai/meet-the-team-character-ai-welcomes-sunita-verma-as-chief-technology-officer/ (20261015210626).

## 257. lg-src-deal-windsurf-next-stage-2025

Outcome: verified.

Capture used: https://web.archive.org/web/20260511121317/https://windsurf.com/blog/windsurfs-next-stage (20260511121317).

Article stored in serialized page data: Raw HTML body omits the article. Its BlogArticleLayout identifies The Next Stage of Windsurf, dated July 11, 2025, with slug windsurfs-next-stage and linked MDX source record 1c. That captured record preserves all four quotations. Proposed correction: Retain the quotations and capture. Inspect the recorded serialized article source when the replay does not render its body.

## 260. lg-src-gc-alizila-zhou-2025

Outcome: verified.

Capture used: https://web.archive.org/web/20251023205955/https://www.alizila.com/jingren-zhou-recognized-as-acm-fellow-for-pioneering-contributions-to-ai-and-cloud-computing/ (20251023205955); raw entry HTTP 200.

- Retrieval: current-page — HTTP 403; https://alizila.com/?p=64628

Current page: https://alizila.com/?p=64628 — HTTP 403.
Browser check: {"checkedAt":"2026-10-29T00:23:27.993Z","title":"Just a moment...","status":"access-challenge","observedMessage":"Performing security verification","note":"The browser did not reveal the article. No challenge was solved and no page disappearance is inferred."}

## 264. lg-src-gc-cls-tencent-2026

Outcome: verified.

Capture used: https://web.archive.org/web/20261029004011/https://www.cls.cn/detail/2436439 (20261029004011); raw entry HTTP 200.

- Retrieval: Save-Page-Now — curl: (28) Operation timed out after 120008 milliseconds with 0 bytes received
  ; https://web.archive.org/save/https://www.cls.cn/detail/2436439

Current page: https://www.cls.cn/detail/2436439 — HTTP 200.

Save Page Now: capture-found-after-timeout.

## 282. lg-src-goo-essential-series-a-2023

Outcome: verified.

Capture used: https://web.archive.org/web/20261029004627/https://www.hpcwire.com/aiwire/2023/12/12/essential-ai-raises-56-5m-series-a-to-build-the-enterprise-brain/ (20261029004627); raw entry HTTP 200.

- Retrieval: current-page — HTTP 403; https://www.hpcwire.com/aiwire/2023/12/12/essential-ai-raises-56-5m-series-a-to-build-the-enterprise-brain/

Current page: https://www.hpcwire.com/aiwire/2023/12/12/essential-ai-raises-56-5m-series-a-to-build-the-enterprise-brain/ — HTTP 403.
Browser check: {"checkedAt":"2026-10-29T00:23:28.023Z","status":"article-opened","observedTitle":"AIwire - Covering Scientific & Technical AI","observedHeading":"Essential AI Raises $56.5M Series A to Build the Enterprise Brain","visibleDateline":"December 12, 2023","note":"All four quotations match the displayed article; browser HTTP status was not measured."}

Save Page Now: replay-checked; https://web.archive.org/web/20261029004627/https://www.hpcwire.com/aiwire/2023/12/12/essential-ai-raises-56-5m-series-a-to-build-the-enterprise-brain/.

## 295. lg-src-goo-x-hassabis-windsurf-2025

Outcome: verified.

- CDX-replay: https://web.archive.org/web/20250712222350id_/https://twitter.com/demishassabis/status/1943794383536652309 — HTTP 302 → https://web.archive.org/web/20250712222350id_/https://x.com/demishassabis/status/1943794383536652309.
- CDX-replay-redirect: https://web.archive.org/web/20250712222350id_/https://x.com/demishassabis/status/1943794383536652309 — HTTP 302 → https://web.archive.org/web/20250712222351id_/https://x.com/demishassabis/status/1943794383536652309.
- current-page: https://twitter.com/demishassabis/status/1943794383536652309 — HTTP 301 → https://x.com/demishassabis/status/1943794383536652309.
- social-alias-replay: https://web.archive.org/web/20250712222350id_/https://twitter.com/demishassabis/status/1943794383536652309 — HTTP 302 → https://web.archive.org/web/20250712222350id_/https://x.com/demishassabis/status/1943794383536652309.
- social-alias-replay-redirect: https://web.archive.org/web/20250712222350id_/https://x.com/demishassabis/status/1943794383536652309 — HTTP 302 → https://web.archive.org/web/20250712222351id_/https://x.com/demishassabis/status/1943794383536652309.

Current page: https://x.com/demishassabis/status/1943794383536652309 — HTTP 200. 0/0 supplied quotations verbatim.

Capture used: https://web.archive.org/web/20250711220749/https://twitter.com/demishassabis/status/1943794383536652309 (20250711220749).

Earlier HTML error-page captures: Earlier HTML replays showed an error page. The recorded Twitter-domain raw replay contains structured data for the exact cited post ID and author. Proposed correction: Use the recorded verified structured-post capture; attached media and linked documents require separate checks.

## 297. lg-src-goo-x-suleyman-2019

Outcome: verified.

- CDX-replay: https://web.archive.org/web/20250305002627id_/https://twitter.com/mustafasuleymn/status/1202635124745154562 — HTTP 302 → https://web.archive.org/web/20250305002627id_/https://x.com/mustafasuleymn/status/1202635124745154562.
- CDX-replay-redirect: https://web.archive.org/web/20250305002627id_/https://x.com/mustafasuleymn/status/1202635124745154562 — HTTP 302 → https://web.archive.org/web/20250305002628id_/https://x.com/mustafasuleymn/status/1202635124745154562.
- CDX-replay: https://web.archive.org/web/20241125091504id_/https://twitter.com/mustafasuleymn/status/1202635124745154562 — HTTP 404.

Capture used: https://web.archive.org/web/20230329150711/https://twitter.com/mustafasuleymn/status/1202635124745154562 (20230329150711).

## 303. lg-src-gs-candela-x-2025

Outcome: verified.

Current page: https://x.com/jquinonero/status/1934716214473048438 — HTTP 200. 0/0 supplied quotations verbatim.

Capture used: https://web.archive.org/web/20250616205425/https://twitter.com/jquinonero/status/1934716214473048438 (20250616205425).

Earlier HTML error-page captures: Earlier HTML replays showed an error page. The recorded Twitter-domain raw replay contains structured data for the exact cited post ID and author. Proposed correction: Use the recorded verified structured-post capture; attached media and linked documents require separate checks.

## 319. lg-src-gw-fedus-x-2025

Outcome: wrong-document.

- social-alias-replay: https://web.archive.org/web/20250318172458id_/https://twitter.com/LiamFedus/status/1901740085416218672 — HTTP 302 → https://web.archive.org/web/20250318172458id_/https://x.com/LiamFedus/status/1901740085416218672.
- social-alias-replay-redirect: https://web.archive.org/web/20250318172458id_/https://x.com/LiamFedus/status/1901740085416218672 — HTTP 302 → https://web.archive.org/web/20250318172459id_/https://x.com/LiamFedus/status/1901740085416218672.
- social-alias-replay: https://web.archive.org/web/20250317205903id_/https://twitter.com/LiamFedus/status/1901740085416218672 — HTTP 302 → https://web.archive.org/web/20250318172458id_/https://twitter.com/LiamFedus/status/1901740085416218672.
- social-alias-replay-redirect: https://web.archive.org/web/20250318172458id_/https://twitter.com/LiamFedus/status/1901740085416218672 — HTTP 302 → https://web.archive.org/web/20250318172458id_/https://x.com/LiamFedus/status/1901740085416218672.
- social-alias-replay-redirect: https://web.archive.org/web/20250318172458id_/https://x.com/LiamFedus/status/1901740085416218672 — HTTP 302 → https://web.archive.org/web/20250318172459id_/https://x.com/LiamFedus/status/1901740085416218672.

Pending: x.com/Twitter is excluded from new saves.

Current page: https://x.com/LiamFedus/status/1901740085416218672 — HTTP 200. 0/0 supplied quotations verbatim.

Capture used: https://web.archive.org/web/20250321074607/https://x.com/LiamFedus/status/1901740085416218672 (20250321074607).

Captured error text: Something went wrong, but don’t fret — let’s give it another shot.Try again Some privacy related extensions may cause issues on x.com. Please disable them and try again. Proposed correction: use a working capture of the named document; retain this as a failed attempt.

Identity: wrong-document.

## 340. lg-src-mx-aldahle-departure

Outcome: verified.

- current-page: https://x.com/ahmad_al_dahle/status/2011440460821320056 — HTTP 307 → /Ahmad_Al_Dahle/status/2011440460821320056.
- social-alias-replay: https://web.archive.org/web/20260115141624id_/https://twitter.com/Ahmad_Al_Dahle/status/2011440460821320056 — HTTP 301 → https://web.archive.org/web/20260115141624id_/https://x.com/Ahmad_Al_Dahle/status/2011440460821320056.
- social-alias-replay-redirect: https://web.archive.org/web/20260115141624id_/https://x.com/Ahmad_Al_Dahle/status/2011440460821320056 — HTTP 302 → https://web.archive.org/web/20260114170640id_/https://x.com/ahmad_al_dahle/status/2011440460821320056.

Current page: https://x.com/Ahmad_Al_Dahle/status/2011440460821320056 — HTTP 200. 0/0 supplied quotations verbatim.

Capture used: https://web.archive.org/web/20260114140911/https://twitter.com/Ahmad_Al_Dahle/status/2011440460821320056 (20260114140911).

Earlier HTML error-page captures: Earlier HTML replays showed an error page. The recorded Twitter-domain raw replay contains structured data for the exact cited post ID and author. Proposed correction: Use the recorded verified structured-post capture; attached media and linked documents require separate checks.

## 342. lg-src-mx-ap-lecun-leave

Outcome: quotation-problems.

Capture used: https://web.archive.org/web/20251121072925/http://www.adaderana.lk/news.php?nid=114915 (20251121072925).

- lg-ev-mx-lecun-meta-departure-ap: differs. Capture text: “Yann LeCun said Wednesday he will be leaving his job as Meta’s chief AI scientist at the end of the year.”. Quotation punctuation differs. Proposed correction: Yann LeCun said Wednesday he will be leaving his job as Meta’s chief AI scientist at the end of the year.

## 347. lg-src-mx-cnbc-msl-four

Outcome: quotation-problems.

Capture used: https://web.archive.org/web/20261009161230/https://www.cnbc.com/2025/08/21/meta-brakes-massive-ai-talent-recruitment-spending-spree-mark-zuckerberg-tbd-superintelligence-lab.html (20261009161230).

- lg-ev-mx-tbd-lab-unit-2025: differs. Capture text: “a recent restructuring inside Meta has divided its AI efforts into four teams. That includes a team focused on building machine superintelligence, dubbed the "TBD lab,"”. Quotation punctuation differs. Proposed correction: a recent restructuring inside Meta has divided its AI efforts into four teams. That includes a team focused on building machine superintelligence, dubbed the "TBD lab,"

- lg-ev-mx-tbd-lab-unit-2025-b: differs. Capture text: “all four groups belong to "Meta Superintelligence Labs,"”. Quotation punctuation differs. Proposed correction: all four groups belong to "Meta Superintelligence Labs,"

## 350. lg-src-mx-fortune-genai-2023

Outcome: quotation-problems.

Capture used: https://web.archive.org/web/20230625141421/https://fortune.com/2023/02/27/mark-zuckerberg-chatgpt-chatbot-ai-team-meta-facebook/ (20230625141421).

- lg-ev-mx-aldahle-genai-lead-2023-group: differs. Capture text: “We’re creating a new top-level product group at Meta focused on generative AI”. Quotation punctuation differs. Proposed correction: We’re creating a new top-level product group at Meta focused on generative AI

- lg-ev-mx-meta-genai-unit-2023: differs. Capture text: “We’re creating a new top-level product group at Meta focused on generative AI”. Quotation punctuation differs. Proposed correction: We’re creating a new top-level product group at Meta focused on generative AI

## 351. lg-src-mx-friedman-meta-2025

Outcome: verified.

Current page: https://x.com/natfriedman/status/1940682802644852999 — HTTP 200. 0/0 supplied quotations verbatim.

Capture used: https://web.archive.org/web/20250703080330/https://twitter.com/natfriedman/status/1940682802644852999 (20250703080330).

Earlier HTML error-page captures: Earlier HTML replays showed an error page. The recorded Twitter-domain raw replay contains structured data for the exact cited post ID and author. Proposed correction: Use the recorded verified structured-post capture; attached media and linked documents require separate checks.

## 355. lg-src-mx-pohlen-departure

Outcome: verified.

- current-page: https://x.com/tobyphln/status/2027188868059926705 — HTTP 307 → /TobyPhln/status/2027188868059926705.
- social-alias-replay: https://web.archive.org/web/20260227170552id_/https://twitter.com/TobyPhln/status/2027188868059926705 — HTTP 301 → https://web.archive.org/web/20260227170552id_/https://x.com/TobyPhln/status/2027188868059926705.
- social-alias-replay-redirect: https://web.archive.org/web/20260227170552id_/https://x.com/TobyPhln/status/2027188868059926705 — HTTP 302 → https://web.archive.org/web/20260227041914id_/https://x.com/TobyPhln/status/2027188868059926705.

Current page: https://x.com/TobyPhln/status/2027188868059926705 — HTTP 200. 0/0 supplied quotations verbatim.

Capture used: https://web.archive.org/web/20260227010744/https://twitter.com/TobyPhln/status/2027188868059926705 (20260227010744).

Earlier HTML error-page captures: Earlier HTML replays showed an error page. The recorded Twitter-domain raw replay contains structured data for the exact cited post ID and author. Proposed correction: Use the recorded verified structured-post capture; attached media and linked documents require separate checks.

## 356. lg-src-mx-scale-next-phase

Outcome: quotation-problems.

Capture used: https://web.archive.org/web/20260924103944/https://scale.com/blog/scale-ai-announces-next-phase-of-company-evolution (20260924103944).

- lg-ev-mx-droege-scale-interim-ceo-2025: differs. Capture text: “appointed Chief Strategy Officer, Jason Droege, to serve as the Company’s Interim Chief Executive Officer”. Quotation punctuation differs. Proposed correction: appointed Chief Strategy Officer, Jason Droege, to serve as the Company’s Interim Chief Executive Officer

- lg-ev-mx-wang-joins-meta-2025: differs. Capture text: “Scale’s founder, Alexandr Wang, is joining Meta to work on Meta’s AI efforts.”. Quotation punctuation differs. Proposed correction: Scale’s founder, Alexandr Wang, is joining Meta to work on Meta’s AI efforts.

## 357. lg-src-mx-spacexai-rebrand

Outcome: no-capture-saving-excluded.

- current-page: https://x.com/SpaceXAI/status/2074214064746832060 — HTTP 307 → /SpaceXSI/status/2074214064746832060.

Pending: No usable capture found in the recorded CDX searches and aliases; X/Twitter excluded from Save Page Now.

Current page: https://x.com/SpaceXSI/status/2074214064746832060 — HTTP 200. 0/0 supplied quotations verbatim.

Identity: unverified-retrieval.

## 358. lg-src-mx-tc-lecun-ami

Outcome: quotation-problems.

Capture used: https://web.archive.org/web/20261013112828/https://techcrunch.com/2025/12/19/yann-lecun-confirms-his-new-world-model-startup-reportedly-seeks-5b-valuation/ (20261013112828).

- lg-ev-mx-lecun-ami-chair-2025: differs. Capture text: “Yes, AMI Labs is my new startup. I’m the Executive Chairman.”. Quotation punctuation differs. Proposed correction: Yes, AMI Labs is my new startup. I’m the Executive Chairman.

## 361. lg-src-mx-wang-zhao-post

Outcome: verified.

- social-alias-replay: https://web.archive.org/web/20250725230219id_/https://twitter.com/alexandr_wang/status/1948834974205182454 — HTTP 302 → https://web.archive.org/web/20250725230219id_/https://x.com/alexandr_wang/status/1948834974205182454.

Current page: https://x.com/alexandr_wang/status/1948834974205182454 — HTTP 200. 0/0 supplied quotations verbatim.

Capture used: https://web.archive.org/web/20250725195720/https://twitter.com/alexandr_wang/status/1948834974205182454 (20250725195720).

Earlier HTML error-page captures: Earlier HTML replays showed an error page. The recorded Twitter-domain raw replay contains structured data for the exact cited post ID and author. Proposed correction: Use the recorded verified structured-post capture; attached media and linked documents require separate checks.

## 362. lg-src-mx-wu-departure

Outcome: verified.

- social-alias-replay: https://web.archive.org/web/20260210102937id_/https://twitter.com/Yuhu_ai_/status/2021113745024614671 — HTTP 301 → https://web.archive.org/web/20260210102937id_/https://x.com/Yuhu_ai_/status/2021113745024614671.
- social-alias-replay-redirect: https://web.archive.org/web/20260210102937id_/https://x.com/Yuhu_ai_/status/2021113745024614671 — HTTP 302 → https://web.archive.org/web/20260210110409id_/https://x.com/Yuhu_ai_/status/2021113745024614671.

Current page: https://x.com/Yuhu_ai_/status/2021113745024614671 — HTTP 200. 0/0 supplied quotations verbatim.

Capture used: https://web.archive.org/web/20260210064721/https://twitter.com/Yuhu_ai_/status/2021113745024614671 (20260210064721).

Earlier HTML error-page captures: Earlier HTML replays showed an error page. The recorded Twitter-domain raw replay contains structured data for the exact cited post ID and author. Proposed correction: Use the recorded verified structured-post capture; attached media and linked documents require separate checks.

## 363. lg-src-mx-yang-stepback

Outcome: verified.

- current-page: https://x.com/thegregyang/status/2013652609455006006 — HTTP 307 → /TheGregYang/status/2013652609455006006.
- social-alias-replay: https://web.archive.org/web/20260125093012id_/https://twitter.com/TheGregYang/status/2013652609455006006 — HTTP 301 → https://web.archive.org/web/20260125093012id_/https://x.com/TheGregYang/status/2013652609455006006.
- social-alias-replay-redirect: https://web.archive.org/web/20260125093012id_/https://x.com/TheGregYang/status/2013652609455006006 — HTTP 302 → https://web.archive.org/web/20260120223146id_/https://x.com/TheGregYang/status/2013652609455006006.

Current page: https://x.com/TheGregYang/status/2013652609455006006 — HTTP 200. 0/0 supplied quotations verbatim.

Capture used: https://web.archive.org/web/20260120163928/https://twitter.com/TheGregYang/status/2013652609455006006 (20260120163928).

Earlier HTML error-page captures: Earlier HTML replays showed an error page. The recorded Twitter-domain raw replay contains structured data for the exact cited post ID and author. Proposed correction: Use the recorded verified structured-post capture; attached media and linked documents require separate checks.

## 365. lg-src-mx-zhao-2025

Outcome: verified.

- social-alias-replay: https://web.archive.org/web/20250729045059id_/https://twitter.com/shengjia_zhao/status/1948848412264206577 — HTTP 302 → https://web.archive.org/web/20250729045059id_/https://x.com/shengjia_zhao/status/1948848412264206577.
- social-alias-replay-redirect: https://web.archive.org/web/20250729045059id_/https://x.com/shengjia_zhao/status/1948848412264206577 — HTTP 302 → https://web.archive.org/web/20250729045100id_/https://x.com/shengjia_zhao/status/1948848412264206577.

Current page: https://x.com/shengjia_zhao/status/1948848412264206577 — HTTP 200. 0/0 supplied quotations verbatim.

Capture used: https://web.archive.org/web/20250725205043/https://twitter.com/shengjia_zhao/status/1948848412264206577 (20250725205043).

Earlier HTML error-page captures: Earlier HTML replays showed an error page. The recorded Twitter-domain raw replay contains structured data for the exact cited post ID and author. Proposed correction: Use the recorded verified structured-post capture; attached media and linked documents require separate checks.

## 366. lg-src-mx-zuck-meta-compute

Outcome: verified.

- CDX-replay: https://web.archive.org/web/20260510020026id_/https://www.threads.com/@zuck/post/DTa3-B1EbTp — curl: (61) Unrecognized content encoding type
  .

Capture used: https://web.archive.org/web/20260203201517/https://www.threads.com/@zuck/post/DTa3-B1EbTp (20260203201517).

## 367. lg-src-mx-zuck-zhao-threads

Outcome: verified.

- CDX-replay: https://web.archive.org/web/20260812012326id_/https://www.threads.com/@zuck/post/DMiwjXJSYCd — curl: (61) Unrecognized content encoding type
  .

Capture used: https://web.archive.org/web/20260726210704/https://www.threads.com/@zuck/post/DMiwjXJSYCd (20260726210704).

## 374. lg-src-new-murati-x-2026

Outcome: wrong-document.

- platform-alias-replay: https://web.archive.org/web/20260115013217id_/https://twitter.com/miramurati/status/2011577319295692801 — HTTP 301 → https://web.archive.org/web/20260115013217id_/https://x.com/miramurati/status/2011577319295692801.
- platform-alias-replay-redirect: https://web.archive.org/web/20260115013217id_/https://x.com/miramurati/status/2011577319295692801 — HTTP 302 → https://web.archive.org/web/20260115000852id_/https://x.com/miramurati/status/2011577319295692801.

Pending: x.com/Twitter is excluded from new saves.

Current page: https://x.com/miramurati/status/2011577319295692801 — HTTP 200. 0/0 supplied quotations verbatim.

Capture used: https://web.archive.org/web/20260115000852/https://x.com/miramurati/status/2011577319295692801 (20260115000852).

Captured error text: Something went wrong, but don’t fret — let’s give it another shot.Try again Firefox’s Enhanced Tracking Protection (Strict Mode) is known to cause issues on x.com Proposed correction: use a working capture of the named document; retain this as a failed attempt.

Identity: wrong-document.

## 383. lg-src-oai-abbeel-zilis-2016

Outcome: verified.

- CDX-replay: https://web.archive.org/web/20260210072406id_/https://openai.com/index/welcome-pieter-and-shivon/ — HTTP 500.

Capture used: https://web.archive.org/web/20260210060957/https://openai.com/index/welcome-pieter-and-shivon/ (20260210060957).

## 384. lg-src-oai-board-2024

Outcome: verified.

- CDX-replay: https://web.archive.org/web/20261012142727id_/https://openai.com/index/openai-announces-new-members-to-board-of-directors/ — HTTP 403.

Capture used: https://web.archive.org/web/20261009031107/https://openai.com/index/openai-announces-new-members-to-board-of-directors/ (20261009031107).

## 386. lg-src-oai-cfo-cpo-2024

Outcome: verified.

- CDX-replay: https://web.archive.org/web/20260821030204id_/https://openai.com/index/openai-welcomes-cfo-cpo — HTTP 302 → https://web.archive.org/web/20260813113535id_/https://openai.com/index/openai-welcomes-cfo-cpo/.
- CDX-replay-redirect: https://web.archive.org/web/20260813113535id_/https://openai.com/index/openai-welcomes-cfo-cpo/ — HTTP 403.
- CDX-replay: https://web.archive.org/web/20260813113535id_/https://openai.com/index/openai-welcomes-cfo-cpo/ — HTTP 403.

Capture used: https://web.archive.org/web/20260722181320/https://openai.com/index/openai-welcomes-cfo-cpo/ (20260722181320).

## 387. lg-src-oai-dresser-2025

Outcome: verified.

- CDX-replay: https://web.archive.org/web/20260915081921id_/https://openai.com/index/openai-appoints-denise-dresser/ — curl: (61) Error while processing content unencoding: incorrect header check
  .
- CDX-replay: https://web.archive.org/web/20260914153901id_/https://openai.com/index/openai-appoints-denise-dresser/ — curl: (61) Error while processing content unencoding: incorrect header check
  .

Capture used: https://web.archive.org/web/20260915081921/https://openai.com/index/openai-appoints-denise-dresser/ (20260915081921).

## 388. lg-src-oai-foundation-2026

Outcome: verified.

- CDX-replay: https://web.archive.org/web/20260925130606id_/https://openai.com/index/update-on-the-openai-foundation/ — HTTP 500.
- CDX-replay: https://web.archive.org/web/20260925125820id_/https://openai.com/index/update-on-the-openai-foundation — HTTP 302 → https://web.archive.org/web/20260925130606id_/https://openai.com/index/update-on-the-openai-foundation/.

Capture used: https://web.archive.org/web/20260925130606/https://openai.com/index/update-on-the-openai-foundation/ (20260925130606).

## 389. lg-src-oai-hurd-2021

Outcome: verified.

Capture used: https://web.archive.org/web/20260913004552/https://openai.com/index/will-hurd-joins/ (20260913004552); raw entry HTTP 200.

- Retrieval: current-page — HTTP 403; https://openai.com/index/will-hurd-joins/

Current page: https://openai.com/index/will-hurd-joins/ — HTTP 403.

## 390. lg-src-oai-io-2025

Outcome: verified.

Capture used: https://web.archive.org/web/20261013224515/https://openai.com/sam-and-jony/ (20261013224515); raw entry HTTP 200.

- Retrieval: current-page — HTTP 403; https://openai.com/sam-and-jony/

Current page: https://openai.com/sam-and-jony/ — HTTP 403.

## 399. lg-src-oai-nakasone-2024

Outcome: verified.

- CDX-replay: https://web.archive.org/web/20261012182248id_/https://openai.com/index/openai-appoints-retired-us-army-general/ — HTTP 403.
- CDX-replay: https://web.archive.org/web/20260924121552id_/https://openai.com/index/openai-appoints-retired-us-army-general/ — HTTP 403.

Capture used: https://web.archive.org/web/20260921085122/https://openai.com/index/openai-appoints-retired-us-army-general/ (20260921085122).

## 400. lg-src-oai-ogunlesi-2025

Outcome: verified.

- CDX-replay: https://web.archive.org/web/20260908021348id_/https://openai.com/index/adebayo-ogunlesi-joins-openais-board-of-directors/ — HTTP 403.
- CDX-replay: https://web.archive.org/web/20260410233600id_/https://openai.com/index/adebayo-ogunlesi-joins-openais-board-of-directors — HTTP 302 → https://web.archive.org/web/20260410233600id_/https://openai.com/index/adebayo-ogunlesi-joins-openais-board-of-directors/.

Capture used: https://web.archive.org/web/20260410233600/https://openai.com/index/adebayo-ogunlesi-joins-openais-board-of-directors/ (20260410233600).

## 401. lg-src-oai-preparedness-2023

Outcome: verified.

- CDX-replay: https://web.archive.org/web/20261013192153id_/https://openai.com/index/frontier-risk-and-preparedness/ — HTTP 403.

Capture used: https://web.archive.org/web/20261005031411/https://openai.com/index/frontier-risk-and-preparedness/ (20261005031411).

## 407. lg-src-oai-simo-2025

Outcome: verified.

- CDX-replay: https://web.archive.org/web/20261012125306id_/https://openai.com/index/leadership-expansion-with-fidji-simo/ — HTTP 403.
- CDX-replay: https://web.archive.org/web/20260925005041id_/https://openai.com/index/leadership-expansion-with-fidji-simo/ — HTTP 403.
- CDX-replay: https://web.archive.org/web/20260809214843id_/https://openai.com/index/leadership-expansion-with-fidji-simo — HTTP 302 → https://web.archive.org/web/20260809214843id_/https://openai.com/index/leadership-expansion-with-fidji-simo/.

Capture used: https://web.archive.org/web/20260809214843/https://openai.com/index/leadership-expansion-with-fidji-simo/ (20260809214843).

## 409. lg-src-oai-ssc-2024

Outcome: verified.

- CDX-replay: https://web.archive.org/web/20261012083640id_/https://openai.com/index/openai-board-forms-safety-and-security-committee/ — HTTP 403.
- CDX-replay: https://web.archive.org/web/20260920170635id_/https://openai.com/index/openai-board-forms-safety-and-security-committee/ — HTTP 403.

Capture used: https://web.archive.org/web/20260713143403/https://openai.com/index/openai-board-forms-safety-and-security-committee/ (20260713143403).

## 427. source-anthropic-coi-2023-03-31

Outcome: verified.

Capture used: https://web.archive.org/web/20261029125140/https://drive.usercontent.google.com/download?id=1i8Itsv7v7t32lQgzNRqiiO9j5HqSMUVj&export=download&authuser=0 (20261029125140); raw entry HTTP 200.

- Retrieval: CDX-document-download — curl: (28) Failed to connect to web.archive.org:443 after 21110 ms: Could not connect to server
  ; https://web.archive.org/cdx/search/cdx?url=https%3A%2F%2Fdrive.usercontent.google.com%2Fdownload%3Fid%3D1i8Itsv7v7t32lQgzNRqiiO9j5HqSMUVj%26export%3Ddownload%26authuser%3D0&output=json&fl=timestamp,original,mimetype,statuscode,digest
- Retrieval: current-document-download — curl: (6) Could not resolve host: drive.usercontent.google.com
  ; https://drive.usercontent.google.com/download?id=1i8Itsv7v7t32lQgzNRqiiO9j5HqSMUVj&export=download&authuser=0

Current page: https://drive.google.com/file/d/1i8Itsv7v7t32lQgzNRqiiO9j5HqSMUVj/view — HTTP 200.

Save Page Now: replay-checked; https://web.archive.org/web/20261029125140/https://drive.usercontent.google.com/download?id=1i8Itsv7v7t32lQgzNRqiiO9j5HqSMUVj&export=download&authuser=0.

## 428. source-anthropic-coi-2023-09-21

Outcome: verified.

Capture used: https://web.archive.org/web/20261029125309/https://drive.usercontent.google.com/download?id=1keKQ1bSWMICL9VbYa2llQRXO0tBc0YKd&export=download&authuser=0 (20261029125309); raw entry HTTP 200.

- Retrieval: CDX-document-download — curl: (6) Could not resolve host: web.archive.org
  ; https://web.archive.org/cdx/search/cdx?url=https%3A%2F%2Fdrive.google.com%2Fuc%3Fexport%3Ddownload%26id%3D1keKQ1bSWMICL9VbYa2llQRXO0tBc0YKd&output=json&fl=timestamp,original,mimetype,statuscode,digest
- Retrieval: CDX-document-download — curl: (6) Could not resolve host: web.archive.org
  ; https://web.archive.org/cdx/search/cdx?url=https%3A%2F%2Fdrive.usercontent.google.com%2Fdownload%3Fid%3D1keKQ1bSWMICL9VbYa2llQRXO0tBc0YKd%26export%3Ddownload%26authuser%3D0&output=json&fl=timestamp,original,mimetype,statuscode,digest
- Retrieval: current-document-download — curl: (6) Could not resolve host: drive.usercontent.google.com
  ; https://drive.usercontent.google.com/download?id=1keKQ1bSWMICL9VbYa2llQRXO0tBc0YKd&export=download&authuser=0
- Retrieval: Save-Page-Now — curl: (56) Recv failure: Connection was reset
  ; https://web.archive.org/save/https://drive.usercontent.google.com/download?id=1keKQ1bSWMICL9VbYa2llQRXO0tBc0YKd&export=download&authuser=0

Current page: https://drive.google.com/file/d/1keKQ1bSWMICL9VbYa2llQRXO0tBc0YKd/view — HTTP 200.

Save Page Now: capture-found-after-timeout.

## 429. source-anthropic-coi-2024-01-29

Outcome: verified.

Capture used: https://web.archive.org/web/20261029125604/https://drive.usercontent.google.com/download?id=1TDPOkwshy__4eRVofr5LDyD_osoKusve&export=download (20261029125604); raw entry HTTP 200.

- Retrieval: CDX-document-download — curl: (6) Could not resolve host: web.archive.org
  ; https://web.archive.org/cdx/search/cdx?url=https%3A%2F%2Fdrive.google.com%2Fuc%3Fexport%3Ddownload%26id%3D1TDPOkwshy__4eRVofr5LDyD_osoKusve&output=json&fl=timestamp,original,mimetype,statuscode,digest
- Retrieval: CDX-document-download — curl: (6) Could not resolve host: web.archive.org
  ; https://web.archive.org/cdx/search/cdx?url=https%3A%2F%2Fdrive.usercontent.google.com%2Fdownload%3Fid%3D1TDPOkwshy__4eRVofr5LDyD_osoKusve%26export%3Ddownload%26authuser%3D0&output=json&fl=timestamp,original,mimetype,statuscode,digest
- Retrieval: current-document-download — curl: (6) Could not resolve host: drive.usercontent.google.com
  ; https://drive.usercontent.google.com/download?id=1TDPOkwshy__4eRVofr5LDyD_osoKusve&export=download&authuser=0
- Retrieval: current-PDF-visual-check — curl: (28) Operation timed out after 60001 milliseconds with 0 bytes received
  ; https://drive.usercontent.google.com/download?id=1TDPOkwshy__4eRVofr5LDyD_osoKusve&export=download&authuser=0

Current page: https://drive.google.com/file/d/1TDPOkwshy__4eRVofr5LDyD_osoKusve/view — HTTP 200.

Save Page Now: replay-checked; https://web.archive.org/web/20261029125604/https://drive.usercontent.google.com/download?id=1TDPOkwshy__4eRVofr5LDyD_osoKusve&export=download.

## 430. source-anthropic-coi-2025-07-03

Outcome: verified.

Capture used: https://web.archive.org/web/20261029125714/https://drive.usercontent.google.com/download?id=1yeFKDaHN-3o7Zruvd-72De1H1K20Crsh&export=download (20261029125714); raw entry HTTP 200.

- Retrieval: CDX-document-download — curl: (6) Could not resolve host: web.archive.org
  ; https://web.archive.org/cdx/search/cdx?url=https%3A%2F%2Fdrive.google.com%2Fuc%3Fexport%3Ddownload%26id%3D1yeFKDaHN-3o7Zruvd-72De1H1K20Crsh&output=json&fl=timestamp,original,mimetype,statuscode,digest
- Retrieval: CDX-document-download — curl: (6) Could not resolve host: web.archive.org
  ; https://web.archive.org/cdx/search/cdx?url=https%3A%2F%2Fdrive.usercontent.google.com%2Fdownload%3Fid%3D1yeFKDaHN-3o7Zruvd-72De1H1K20Crsh%26export%3Ddownload%26authuser%3D0&output=json&fl=timestamp,original,mimetype,statuscode,digest
- Retrieval: current-document-download — curl: (6) Could not resolve host: drive.usercontent.google.com
  ; https://drive.usercontent.google.com/download?id=1yeFKDaHN-3o7Zruvd-72De1H1K20Crsh&export=download&authuser=0
- Retrieval: Save-Page-Now — curl: (28) Operation timed out after 892041 milliseconds with 0 bytes received
  ; https://web.archive.org/save/https://drive.usercontent.google.com/download?id=1yeFKDaHN-3o7Zruvd-72De1H1K20Crsh&export=download

Current page: https://drive.google.com/file/d/1yeFKDaHN-3o7Zruvd-72De1H1K20Crsh/view — HTTP 200.

Save Page Now: capture-found-after-timeout.

## 438. source-arbital-context-disaster

Outcome: quotation-problems.

Capture used: https://web.archive.org/web/20260617092956/https://arbital.greaterwrong.com/p/context_disaster/ (20260617092956).

- evidence-ts-b5-arbital-context-disaster: differs. Capture text: “One frequently suggested strategy for aligning a sufficiently advanced AI is to observe […] whether the AI appears to be acting nicely while it’s not yet smarter than the programmers. Early testing obviously can’t provide a statistical guarantee of the AI’s future behavior.”. Explicit editorial omission marks checked as ordered verbatim fragments. Quotation punctuation differs. Proposed correction: One frequently suggested strategy for aligning a sufficiently advanced AI is to observe […] whether the AI appears to be acting nicely while it’s not yet smarter than the programmers. Early testing obviously can’t provide a statistical guarantee of the AI’s future behavior.

## 441. source-atlas-alphafold-account

Outcome: verified.

Capture used: https://web.archive.org/web/20260927151337/https://deepmind.google/blog/alphafold-a-solution-to-a-50-year-old-grand-challenge-in-biology/ (20260927151337); raw entry HTTP 200.

- Retrieval: CDX — curl: (28) Operation timed out after 6102669 milliseconds with 0 bytes received
  ; https://web.archive.org/cdx/search/cdx?url=https%3A%2F%2Fdeepmind.google%2Fblog%2Falphafold-a-solution-to-a-50-year-old-grand-challenge-in-biology%2F&output=json&fl=timestamp,original,mimetype,statuscode,digest
- Retrieval: current-page — curl: (6) Could not resolve host: deepmind.google
  ; https://deepmind.google/blog/alphafold-a-solution-to-a-50-year-old-grand-challenge-in-biology/

Current page: https://deepmind.google/blog/alphafold-a-solution-to-a-50-year-old-grand-challenge-in-biology/ — HTTP unavailable.

## 442. source-atlas-alphafold-paper

Outcome: verified.

Capture used: https://web.archive.org/web/20260923202227/https://www.nature.com/articles/s41586-021-03819-2 (20260923202227); raw entry HTTP 200.

- Retrieval: CDX — curl: (6) Could not resolve host: web.archive.org
  ; https://web.archive.org/cdx/search/cdx?url=https%3A%2F%2Fwww.nature.com%2Farticles%2Fs41586-021-03819-2&output=json&fl=timestamp,original,mimetype,statuscode,digest

## 444. source-atlas-charter

Outcome: verified.

- CDX-replay: https://web.archive.org/web/20260922050554id_/https://openai.com/charter — HTTP 302 → https://web.archive.org/web/20260920163724id_/https://openai.com/charter/.
- CDX-replay-redirect: https://web.archive.org/web/20260920163724id_/https://openai.com/charter/ — HTTP 403.
- CDX-replay: https://web.archive.org/web/20260920163724id_/https://openai.com/charter/ — HTTP 403.

Capture used: https://web.archive.org/web/20260917204605/https://openai.com/charter/ (20260917204605).

## 452. source-atlas-openai-leadership

Outcome: verified.

- CDX-replay: https://web.archive.org/web/20260917113843id_/https://openai.com/index/openai-announces-leadership-transition/ — HTTP 403.

Capture used: https://web.archive.org/web/20260914085842/https://openai.com/index/openai-announces-leadership-transition/ (20260914085842).

## 456. source-atlas-openai-scaling

Outcome: verified.

- CDX-replay: https://web.archive.org/web/20260909215914id_/https://openai.com/index/scaling-laws-for-neural-language-models/ — HTTP 403.

Capture used: https://web.archive.org/web/20260818014836/https://openai.com/index/scaling-laws-for-neural-language-models/ (20260818014836).

## 461. source-ca-gov-11546-8

Outcome: archive-retrieval-blocked.

Current named page verified in browser. Save Page Now returned HTTP 520 without a capture URL; final CDX recovery search returned zero captures. No repeated save requested.

- Retrieval: current-page — HTTP 403; https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=GOV&sectionNum=11546.8.
- Retrieval: Save-Page-Now — HTTP 520; https://web.archive.org/save/https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=GOV&sectionNum=11546.8.

Identity: {"status":"unverified-retrieval","expectedTitle":"California Government Code § 11546.8 (codified text with history note)","observedTitle":null}

- evidence-sb-calcompute-conditional-operation-2 (History note at the end of § 11546.8): unverified-retrieval. Proposed correction: None proposed until the captured passage can be inspected.

Current page: https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=GOV&sectionNum=11546.8. — HTTP 403.
Browser check: {"checkedAt":"2026-10-29T16:49:04.469Z","httpStatus":null,"mode":"browser-DOM","namedSectionConfirmed":true,"quotationVerbatim":true}

- Current evidence-sb-calcompute-conditional-operation-2: verbatim. Current text: “Conditionally operative as prescribed by its own provisions.”. History note read in rendered official section page. Direct HTTP previously returned 403; browser HTTP status not exposed.

Save Page Now: creation-response-unresolved.

## 490. source-eu-gpai-guidelines-2025

Outcome: quotation-problems.

Capture used: https://web.archive.org/web/20261009015109/https://ec.europa.eu/newsroom/dae/redirection/document/118340 (20261009015109).

- evidence-eugl-non-binding-2: differs. Capture text: “these guidelines set out the Commission’s interpretation and application of the AI Act, on which it will base its enforcement action”. Quotation wording or punctuation differs. PDF layout spacing and wrapped word hyphens normalized. Proposed correction: these guidelines set out the Commission’s interpretation and application of the AI Act, on which it will base its enforcement action

## 493. source-eu-have-your-say-16472

Outcome: verified.

Capture used: https://web.archive.org/web/20261029164441/https://ec.europa.eu/info/law/better-regulation/brpapi/groupInitiatives/16472 (20261029164441); raw entry HTTP 200.

- Retrieval: Save-Page-Now — HTTP 523; https://web.archive.org/save/https://ec.europa.eu/info/law/better-regulation/brpapi/groupInitiatives/16472

Current page: https://ec.europa.eu/info/law/better-regulation/brpapi/groupInitiatives/16472 — HTTP 200.

Save Page Now: capture-found-after-timeout.

## 495. source-eu-training-summary-template-2025

Outcome: quotation-problems.

- CDX-replay: https://web.archive.org/web/20251001182035id_/http://ec.europa.eu/newsroom/dae/redirection/document/118480 — HTTP 302 → https://web.archive.org/web/20250803201115id_/https://ec.europa.eu/newsroom/dae/redirection/document/118480.

Current page: https://ec.europa.eu/newsroom/dae/redirection/document/118480 — HTTP 200. 2/3 supplied quotations verbatim.

Capture used: https://web.archive.org/web/20261002200707/https://ec.europa.eu/newsroom/dae/redirection/document/118480 (20261002200707).

- evidence-eutm-top-domain-names-2: differs. Capture text: “Small and medium-sized enterprises (SMEs), including start-ups, should disclose top 5% of all domain names or 1 000 internet domain names, whichever is lower.”. Checked on PDF page 12 (printed page 11), Template Section 2.3. Digit-grouping space retained as printed. Proposed correction: Small and medium-sized enterprises (SMEs), including start-ups, should disclose top 5% of all domain names or 1 000 internet domain names, whichever is lower.

## 512. source-extropians-1996-08-31-clemmensen

Outcome: quotation-problems.

Capture used: https://web.archive.org/web/20240625145456/http://extropians.weidai.com/extropians.96/0624.html (20240625145456).

- evidence-ts-a3-clemmensen-1996-08-31-context: differs. Capture text: “it's likely to start as some type of human-computer collaboration and augment itself from that base.”. Quotation wording or punctuation differs. Proposed correction: it's likely to start as some type of human-computer collaboration and augment itself from that base.

## 513. source-extropians-1996-09-04-clemmensen

Outcome: quotation-problems.

Capture used: https://web.archive.org/web/20240425065925/http://extropians.weidai.com/extropians.96/0790.html (20240425065925).

- evidence-ts-a3-clemmensen-1996-09-04: differs. Capture text: “I'd start by augmenting the computer part of myself to increase my intelligence. I'd then use my increased intelligence to”. Quotation wording or punctuation differs. Proposed correction: I'd start by augmenting the computer part of myself to increase my intelligence. I'd then use my increased intelligence to

## 518. source-extropians-1996-12-08-yudkowsky-3761

Outcome: verified.

Capture used: https://web.archive.org/web/20220701114034/https://extropians.weidai.com/extropians.96/3761.html (20220701114034); raw entry HTTP 200.

- Retrieval: CDX — curl: (6) Could not resolve host: web.archive.org
  ; https://web.archive.org/cdx/search/cdx?url=http%3A%2F%2Fextropians.weidai.com%2Fextropians.96%2F3761.html&output=json&fl=timestamp,original,mimetype,statuscode,digest

Current page: http://extropians.weidai.com/extropians.96/3761.html — HTTP 200.

## 549. source-extropy-15-scan

Outcome: verified.

- CDX-replay: https://web.archive.org/web/20260529011820id_/https://diyhpl.us/~bryan/irc/extropians/extropy-magazine/Extropy-15.pdf — HTTP 418.

Current page: https://diyhpl.us/~bryan/irc/extropians/extropy-magazine/Extropy-15.pdf — HTTP 200. 0/0 supplied quotations verbatim.

Capture used: https://web.archive.org/web/20260416172120/https://diyhpl.us/~bryan/irc/extropians/extropy-magazine/Extropy-15.pdf (20260416172120).

## 554. source-good

Outcome: archive-retrieval-blocked.

Save Page Now returned a capture URL and timestamp, but both raw replay attempts returned HTTP 403. Current PDF identity and supplied quotations are checked; archived document identity, hash and quotations remain unverified.

Capture used: https://web.archive.org/web/20261030051429/https://gwern.net/doc/ai/1966-good.pdf (20261030051429); raw entry HTTP 403.

- Retrieval: CDX — HTTP 403; https://web.archive.org/cdx/search/cdx?url=https%3A%2F%2Fgwern.net%2Fdoc%2Fai%2F1966-good.pdf&output=json&fl=timestamp,original,mimetype,statuscode,digest
- Retrieval: CDX-retry — HTTP 403; https://web.archive.org/cdx/search/cdx?url=https%3A%2F%2Fgwern.net%2Fdoc%2Fai%2F1966-good.pdf&output=json&fl=timestamp,original,mimetype,statuscode,digest
- Retrieval: CDX-timemap-retry — HTTP 403; https://web.archive.org/web/timemap/json?url=https%3A%2F%2Fgwern.net%2Fdoc%2Fai%2F1966-good.pdf
- Retrieval: CDX-protocol-independent-retry — HTTP 403; https://web.archive.org/cdx/search/cdx?url=gwern.net%2Fdoc%2Fai%2F1966-good.pdf&output=json&fl=timestamp,original,mimetype,statuscode,digest
- Retrieval: saved-document-replay — HTTP 403; https://web.archive.org/web/20261030051429id_/https://gwern.net/doc/ai/1966-good.pdf
- Retrieval: saved-document-replay-retry — HTTP 403; https://web.archive.org/web/20261030051429id_/https://gwern.net/doc/ai/1966-good.pdf
- Retrieval: blocked-replay-diagnostic — HTTP 403; https://web.archive.org/web/20261030051429id_/https://gwern.net/doc/ai/1966-good.pdf

Identity: {"status":"unverified-retrieval","expectedTitle":"Speculations Concerning the First Ultraintelligent Machine","observedTitle":null}

{"type":"new-capture-replay-failed","detail":"New raw replay returns HTTP 403; error-response hash recorded separately from unavailable document hash.","proposedCorrection":"Do not apply this archivedUrl as verified until the raw document replay opens and its content is checked."}

- evidence-good-discusses-explosion-1965 (Section 2, printed page 33 (scan page 3)): unverified-retrieval. New capture URL returned, but raw document replay is HTTP 403. Current PDF quotation is separately verified. Proposed correction: None proposed until the captured passage can be inspected.

Current page: https://gwern.net/doc/ai/1966-good.pdf — HTTP 200.

Save Page Now: created-replay-unavailable; https://web.archive.org/web/20261030051429/https://gwern.net/doc/ai/1966-good.pdf.

## 559. source-hanson-2008-ai-go-foom-miri-2013

Outcome: quotation-problems.

Capture used: https://web.archive.org/web/20260929131419/https://intelligence.org/files/AIFoomDebate.pdf (20260929131419).

- evidence-ec-e01-08: differs. Capture text: “The growth rate of its “intelligence” may be slow when it is dumb, but gets faster as it gets smarter.”. Quotation wording or punctuation differs. PDF layout spacing and wrapped word hyphens normalized. Proposed correction: The growth rate of its “intelligence” may be slow when it is dumb, but gets faster as it gets smarter.

## 561. source-hanson-2008-emulations-go-foom-miri-2013

Outcome: verified.

- CDX-replay: https://web.archive.org/web/20260324083532id_/https://intelligence.org/files/AIFoomDebate.pdf — HTTP 403.

Current page: https://intelligence.org/files/AIFoomDebate.pdf — HTTP 200. 2/2 supplied quotations verbatim.

Capture used: https://web.archive.org/web/20260929131419/https://intelligence.org/files/AIFoomDebate.pdf (20260929131419).

## 562. source-hanson-2008-friendliness-factors-miri-2013

Outcome: quotation-problems.

- CDX-replay: https://web.archive.org/web/20260324083532id_/https://intelligence.org/files/AIFoomDebate.pdf — HTTP 403.

Current page: https://intelligence.org/files/AIFoomDebate.pdf — HTTP 200. 1/2 supplied quotations verbatim.

Capture used: https://web.archive.org/web/20260929131419/https://intelligence.org/files/AIFoomDebate.pdf (20260929131419).

- evidence-ec-e04-01: differs. Capture text: “If you worry that one competitor will severely dominate all others in the next really big innovation, forcing you to worry about its “friendliness,” you should want to promote factors that reduce success variance.”. Quotation wording or punctuation differs. PDF layout spacing and wrapped word hyphens normalized. Proposed correction: If you worry that one competitor will severely dominate all others in the next really big innovation, forcing you to worry about its “friendliness,” you should want to promote factors that reduce success variance.

## 563. source-hanson-2008-friendly-projects-vs-products-miri-2013

Outcome: verified.

- CDX-replay: https://web.archive.org/web/20260324083532id_/https://intelligence.org/files/AIFoomDebate.pdf — HTTP 403.

Capture used: https://web.archive.org/web/20260929131419/https://intelligence.org/files/AIFoomDebate.pdf (20260929131419).

## 564. source-hanson-2008-setting-the-stage-miri-2013

Outcome: quotation-problems.

Capture used: https://web.archive.org/web/20260929131419/https://intelligence.org/files/AIFoomDebate.pdf (20260929131419).

- evidence-ec-e01-09: differs. Capture text: “a single hand-coded version will suddenly and without warning change from nearly powerless to overwhelmingly powerful; I’d put it as less than 1%”. Quotation wording or punctuation differs. PDF layout spacing and wrapped word hyphens normalized. Proposed correction: a single hand-coded version will suddenly and without warning change from nearly powerless to overwhelmingly powerful; I’d put it as less than 1%

## 576. source-levy-cv

Outcome: quotation-problems.

- current-page: https://cs.stanford.edu/~danilevy/pdf/cv_dl.pdf — curl: (28) Failed to connect to cs.stanford.edu:443 after 21084 ms: Could not connect to server
  .

Current page: https://cs.stanford.edu/~danilevy/pdf/cv_dl.pdf — curl: (28) Failed to connect to cs.stanford.edu:443 after 21084 ms: Could not connect to server
. 0/1 supplied quotations verbatim.

Capture used: https://web.archive.org/web/20250321053813/https://cs.stanford.edu/~danilevy/pdf/cv_dl.pdf (20250321053813).

- evidence-levy-brain-intern-2017-cv: differs. Capture text: “Google Brain, Mountain View. Research Intern. Summer 2017”. PDF page 1 table row visually checked. Employer and role end with periods; the separate date field Summer 2017 has no final period. Fields joined in reading order. Proposed correction: Google Brain, Mountain View. Research Intern. Summer 2017

## 614. source-michie-1986-on-machine-intelligence

Outcome: archive-retrieval-blocked.

Save Page Now returned a capture URL and timestamp, but both raw replay attempts returned HTTP 403. Current PDF identity and supplied quotations are checked; archived document identity, hash and quotations remain unverified.

Capture used: https://web.archive.org/web/20261030051457/https://gwern.net/doc/ai/1986-michie-onmachineintelligence.pdf (20261030051457); raw entry HTTP 403.

- Retrieval: CDX — HTTP 403; https://web.archive.org/cdx/search/cdx?url=https%3A%2F%2Fgwern.net%2Fdoc%2Fai%2F1986-michie-onmachineintelligence.pdf&output=json&fl=timestamp,original,mimetype,statuscode,digest
- Retrieval: CDX-protocol-independent-retry — HTTP 403; https://web.archive.org/cdx/search/cdx?url=gwern.net%2Fdoc%2Fai%2F1986-michie-onmachineintelligence.pdf&output=json&fl=timestamp,original,mimetype,statuscode,digest
- Retrieval: saved-document-replay — HTTP 403; https://web.archive.org/web/20261030051457id_/https://gwern.net/doc/ai/1986-michie-onmachineintelligence.pdf
- Retrieval: saved-document-replay-retry — HTTP 403; https://web.archive.org/web/20261030051457id_/https://gwern.net/doc/ai/1986-michie-onmachineintelligence.pdf

Identity: {"status":"unverified-retrieval","expectedTitle":"On Machine Intelligence, second edition (chapter 20, \"Computer—servant or master\")","observedTitle":null}

{"type":"new-capture-replay-failed","detail":"New raw replay returns HTTP 403; error-response hash recorded separately from unavailable document hash.","proposedCorrection":"Do not apply this archivedUrl as verified until the raw document replay opens and its content is checked."}

Current page: https://gwern.net/doc/ai/1986-michie-onmachineintelligence.pdf — HTTP 200.

Save Page Now: created-replay-unavailable; https://web.archive.org/web/20261030051457/https://gwern.net/doc/ai/1986-michie-onmachineintelligence.pdf.

## 629. source-ny-s8828-assembly-record

Outcome: no-capture-current-differs.

Pending: No indexed capture at the supplied URL. Current bill text matches six quotations after line-number removal; two repeated summary quotations differ at section symbols. Save rule requires every quotation to be verbatim.

Current page: https://nyassembly.gov/leg/?default_fld=&leg_video=&bn=S8828&term=2025&Summary=Y&Actions=Y&Text=Y — HTTP 200. 6/8 supplied quotations verbatim.

Identity: unverified-retrieval.

- Current page evidence-ny-chapter96-signed-3: differs. Current text: “Rpld & add Art 44-B ??1420 - 1429, Gen Bus L; amd ?3, Chap of 2025 (as proposed in S.6953-B & A.6453-B)”. Current official summary displays question marks where the supplied quotation has section symbols. Literal current summary recorded; no new save requested because not every quotation is verbatim. Proposed correction: Rpld & add Art 44-B ??1420 - 1429, Gen Bus L; amd ?3, Chap of 2025 (as proposed in S.6953-B & A.6453-B)

- Current page evidence-ny-raise-signing-announced-5: differs. Current text: “Rpld & add Art 44-B ??1420 - 1429, Gen Bus L; amd ?3, Chap of 2025 (as proposed in S.6953-B & A.6453-B)”. Current official summary displays question marks where the supplied quotation has section symbols. Literal current summary recorded; no new save requested because not every quotation is verbatim. Proposed correction: Rpld & add Art 44-B ??1420 - 1429, Gen Bus L; amd ?3, Chap of 2025 (as proposed in S.6953-B & A.6453-B)

- evidence-ny-chapter96-signed-1: unverified-retrieval. Proposed correction: None proposed until the document can be inspected.

- evidence-ny-chapter96-signed-3: unverified-retrieval. Proposed correction: None proposed until the document can be inspected.

- evidence-ny-chapter96-signed-4: unverified-retrieval. Proposed correction: None proposed until the document can be inspected.

- evidence-ny-ch96-framework-duty-1: unverified-retrieval. Proposed correction: None proposed until the document can be inspected.

- evidence-ny-ch96-incident-reporting-1: unverified-retrieval. Proposed correction: None proposed until the document can be inspected.

- evidence-ny-ch96-civil-penalty-1: unverified-retrieval. Proposed correction: None proposed until the document can be inspected.

- evidence-ny-ch96-effective-date-1: unverified-retrieval. Proposed correction: None proposed until the document can be inspected.

- evidence-ny-raise-signing-announced-5: unverified-retrieval. Proposed correction: None proposed until the document can be inspected.

## 630. source-o1-card

Outcome: verified.

- CDX-replay: https://web.archive.org/web/20260917110331id_/https://openai.com/index/openai-o1-system-card/ — HTTP 403.

Capture used: https://web.archive.org/web/20260906142900/https://openai.com/index/openai-o1-system-card/ (20260906142900).

## 632. source-openai-990-2019-schedule-r

Outcome: verified.

Capture used: https://web.archive.org/web/20250303135109/https://projects.propublica.org/nonprofits/full_text/202003219349325305/IRS990ScheduleR (20250303135109); raw entry HTTP 302; document HTTP 200.

- Retrieval: stable-queryless-filing-replay — HTTP 404; https://web.archive.org/web/20250303135109id_/https://pp-990-rendered.s3.us-east-1.amazonaws.com/202003219349325305_IRS990ScheduleR_0.html

{"type":"redirect-reproduction","detail":"Working archived source entry returns HTTP 302, followed by HTTP 200 for the archived IRS document. Queryless target URL alone returned HTTP 404; expiring signed parameters are omitted.","proposedCorrection":"Use the recorded capture entry URL and follow its archived redirect; do not use the queryless target URL by itself."}

## 633. source-openai-990-2024

Outcome: verified.

Capture used: https://web.archive.org/web/20260328001411/https://projects.propublica.org/nonprofits/full_text/202513219349328476/IRS990 (20260328001411); raw entry HTTP 302; document HTTP 200.

- Retrieval: stable-queryless-filing-replay — HTTP 404; https://web.archive.org/web/20260328001411id_/https://pp-990-rendered.s3.us-east-1.amazonaws.com/202513219349328476_IRS990_0.html

{"type":"redirect-reproduction","detail":"Working archived source entry returns HTTP 302, followed by HTTP 200 for the archived IRS document. Queryless target URL alone returned HTTP 404; expiring signed parameters are omitted.","proposedCorrection":"Use the recorded capture entry URL and follow its archived redirect; do not use the queryless target URL by itself."}

Current page: https://pp-990-rendered.s3.us-east-1.amazonaws.com/202513219349328476_IRS990_0.html — HTTP 200.

## 634. source-openai-990-2024-schedule-o

Outcome: verified.

Capture used: https://web.archive.org/web/20260328001411/https://projects.propublica.org/nonprofits/full_text/202513219349328476/IRS990ScheduleO (20260328001411); raw entry HTTP 302; document HTTP 200.

- Retrieval: stable-queryless-filing-replay — HTTP 404; https://web.archive.org/web/20260328001412id_/https://pp-990-rendered.s3.us-east-1.amazonaws.com/202513219349328476_IRS990ScheduleO_0.html

{"type":"redirect-reproduction","detail":"Working archived source entry returns HTTP 302, followed by HTTP 200 for the archived IRS document. Queryless target URL alone returned HTTP 404; expiring signed parameters are omitted.","proposedCorrection":"Use the recorded capture entry URL and follow its archived redirect; do not use the queryless target URL by itself."}

## 635. source-openai-990-2024-schedule-r

Outcome: verified.

Capture used: https://web.archive.org/web/20260328001411/https://projects.propublica.org/nonprofits/full_text/202513219349328476/IRS990ScheduleR (20260328001411); raw entry HTTP 302; document HTTP 200.

- Retrieval: stable-queryless-filing-replay — HTTP 404; https://web.archive.org/web/20260328001412id_/https://pp-990-rendered.s3.us-east-1.amazonaws.com/202513219349328476_IRS990ScheduleR_0.html

{"type":"redirect-reproduction","detail":"Working archived source entry returns HTTP 302, followed by HTTP 200 for the archived IRS document. Queryless target URL alone returned HTTP 404; expiring signed parameters are omitted.","proposedCorrection":"Use the recorded capture entry URL and follow its archived redirect; do not use the queryless target URL by itself."}

## 637. source-openai-launch

Outcome: verified.

- CDX-replay: https://web.archive.org/web/20260917113839id_/https://openai.com/index/introducing-openai/ — HTTP 403.

Capture used: https://web.archive.org/web/20260917013950/https://openai.com/index/introducing-openai/ (20260917013950).

## 639. source-openai-superalignment-2023

Outcome: verified.

- CDX-replay: https://web.archive.org/web/20260917110323id_/https://openai.com/index/introducing-superalignment/ — HTTP 403.
- CDX-replay: https://web.archive.org/web/20260910163449id_/https://openai.com/index/introducing-superalignment/ — HTTP 403.
- CDX-replay: https://web.archive.org/web/20260901030523id_/https://www.openai.com/index/introducing-superalignment/ — HTTP 302 → https://web.archive.org/web/20260828191032id_/https://openai.com/index/introducing-superalignment/.

Capture used: https://web.archive.org/web/20260828191032/https://openai.com/index/introducing-superalignment/ (20260828191032).

## 644. source-rosenfelder-1992-real-life-turing-test

Outcome: quotation-problems.

Current page: https://www.cs.cmu.edu/Groups/AI/util/pubs/news/comp.ai.philosophy/92_feb.tgz — HTTP 200. 0/2 supplied quotations verbatim.

Capture used: https://web.archive.org/web/20160920073818/https://www.cs.cmu.edu/Groups/AI/util/pubs/news/comp.ai.philosophy/92_feb.tgz (20160920073818).

- evidence-ap-mark-rosenfelder-rosenfelder-1992-real-life-turing-test: not-found. The captured message sender header contains a contact address only, with no display name. Address omitted from this report. Proposed correction: Remove the name quotation from the sender-header locator, or cite a separately visible author attribution.

## 695. source-superalignment-announcement

Outcome: verified.

- CDX-replay: https://web.archive.org/web/20260920163733id_/https://openai.com/index/introducing-superalignment/ — HTTP 403.
- CDX-replay: https://web.archive.org/web/20260917110323id_/https://openai.com/index/introducing-superalignment/ — HTTP 403.
- CDX-replay: https://web.archive.org/web/20260910163449id_/https://openai.com/index/introducing-superalignment/ — HTTP 403.
- CDX-replay: https://web.archive.org/web/20260901030523id_/https://www.openai.com/index/introducing-superalignment/ — HTTP 302 → https://web.archive.org/web/20260828191032id_/https://openai.com/index/introducing-superalignment/.

Capture used: https://web.archive.org/web/20260828191032/https://openai.com/index/introducing-superalignment/ (20260828191032).

## 701. source-vinge-1983-omni-scan

Outcome: archive-retrieval-blocked.

Save Page Now returned a capture URL and timestamp, but both raw replay attempts returned HTTP 403. Current PDF identity and supplied quotations are checked; archived document identity, hash and quotations remain unverified.

Capture used: https://web.archive.org/web/20261030051526/https://gwern.net/doc/transhumanism/1983-vinge.pdf (20261030051526); raw entry HTTP 403.

- Retrieval: CDX — HTTP 403; https://web.archive.org/cdx/search/cdx?url=https%3A%2F%2Fgwern.net%2Fdoc%2Ftranshumanism%2F1983-vinge.pdf&output=json&fl=timestamp,original,mimetype,statuscode,digest
- Retrieval: CDX-protocol-independent-retry — HTTP 403; https://web.archive.org/cdx/search/cdx?url=gwern.net%2Fdoc%2Ftranshumanism%2F1983-vinge.pdf&output=json&fl=timestamp,original,mimetype,statuscode,digest
- Retrieval: saved-document-replay — HTTP 403; https://web.archive.org/web/20261030051526id_/https://gwern.net/doc/transhumanism/1983-vinge.pdf
- Retrieval: saved-document-replay-retry — HTTP 403; https://web.archive.org/web/20261030051526id_/https://gwern.net/doc/transhumanism/1983-vinge.pdf

Identity: {"status":"unverified-retrieval","expectedTitle":"First Word (Omni, January 1983, p. 10)","observedTitle":null}

{"type":"new-capture-replay-failed","detail":"New raw replay returns HTTP 403; error-response hash recorded separately from unavailable document hash.","proposedCorrection":"Do not apply this archivedUrl as verified until the raw document replay opens and its content is checked."}

Current page: https://gwern.net/doc/transhumanism/1983-vinge.pdf — HTTP 200.

Save Page Now: created-replay-unavailable; https://web.archive.org/web/20261030051526/https://gwern.net/doc/transhumanism/1983-vinge.pdf.

## 702. source-weak-strong-announcement

Outcome: verified.

- CDX-replay: https://web.archive.org/web/20260917133047id_/https://openai.com/index/weak-to-strong-generalization/ — HTTP 403.

Capture used: https://web.archive.org/web/20260917090610/https://openai.com/index/weak-to-strong-generalization/ (20260917090610).

## 706. source-xai-launch-2023

Outcome: verified.

- CDX-replay: https://web.archive.org/web/20260629151214id_/https://www.axios.com/2023/07/12/elon-musk-ai-xai-chatgpt — HTTP 403.
- CDX-replay: https://web.archive.org/web/20260629012527id_/https://www.axios.com/2023/07/12/elon-musk-ai-xai-chatgpt — HTTP 403.

Capture used: https://web.archive.org/web/20260309000905/https://www.axios.com/2023/07/12/elon-musk-ai-xai-chatgpt (20260309000905).

## 710. source-xm-babuschkin-departure

Outcome: archive-retrieval-blocked.

Current named page verified in browser. Save Page Now returned HTTP 520 without a capture URL; final CDX recovery search returned zero captures. No repeated save requested.

- Retrieval: current-page — HTTP 403; https://www.investing.com/news/stock-market-news/xai-cofounder-babuschkin-departs-to-launch-ai-safety-investment-firm-4190463
- Retrieval: Save-Page-Now — HTTP 520; https://web.archive.org/save/https://www.investing.com/news/stock-market-news/xai-cofounder-babuschkin-departs-to-launch-ai-safety-investment-firm-4190463

Identity: {"status":"unverified-retrieval","expectedTitle":"xAI co-founder Babuschkin departs to launch AI safety investment firm","observedTitle":null}

Current page: https://www.investing.com/news/stock-market-news/xai-cofounder-babuschkin-departs-to-launch-ai-safety-investment-firm-4190463 — HTTP 403.
Browser check: {"checkedAt":"2026-10-30T05:12:33.241Z","namedDocumentConfirmed":true,"observedTitle":"XAI co-founder Babuschkin departs to launch AI safety investment firm By Reuters","canonicalUrl":"https://www.investing.com/news/stock-market-news/xai-cofounder-babuschkin-departs-to-launch-ai-safety-investment-firm-4190463","publicationDateObserved":"13 August 2025","httpStatus":null,"scope":"Visible browser article and public authorship checked; no quotations supplied. Browser HTTP status unavailable; direct 403 retained separately."}

Save Page Now: creation-response-unresolved.

## 719. source-xm-pineau-cohere

Outcome: verified.

- CDX-replay: https://web.archive.org/web/20260716061224id_/https://cohere.com/blog/august-2025-funding-round — HTTP 500.
- CDX-replay: https://web.archive.org/web/20260716061221id_/https://cohere.com/blog/august-2025-funding-round — HTTP 500.

Capture used: https://web.archive.org/web/20260207100027/https://cohere.com/blog/august-2025-funding-round (20260207100027).

## 726. source-xm-x-acquisition

Outcome: no-capture-saving-excluded.

No capture indexed at supplied URL. Current named article opens in browser, but exceeds permitted personal-data scope for saving.

- Retrieval: current-page — HTTP 403; https://ca.investing.com/news/stock-market-news/musks-xai-buys-musks-x-social-media-platform-for-33-billion-3929163

Identity: {"status":"unverified-retrieval","expectedTitle":"Musk’s social media firm X bought by his AI company, valued at $33 billion","observedTitle":null}

Current page: https://ca.investing.com/news/stock-market-news/musks-xai-buys-musks-x-social-media-platform-for-33-billion-3929163 — HTTP 403.
Browser check: {"checkedAt":"2026-10-30T05:12:33.358Z","namedDocumentConfirmed":true,"observedTitle":"Musk’s social media firm X bought by his AI company, valued at $33 billion By Reuters","canonicalUrl":"https://ca.investing.com/news/stock-market-news/musks-xai-buys-musks-x-social-media-platform-for-33-billion-3929163","publicationDateObserved":"28 March 2025","httpStatus":null,"scope":"Visible browser article and public authorship checked; no quotations supplied. Browser HTTP status unavailable; direct 403 retained separately."}

## 728. source-yudkowsky-2008-recursive-self-improvement-miri-2013

Outcome: quotation-problems.

Capture used: https://web.archive.org/web/20260929131419/https://intelligence.org/files/AIFoomDebate.pdf (20260929131419).

- evidence-ec-e01-13: differs. Capture text: “we are likely to see a fast, local increase in capability—“AI go FOOM.””. Quotation wording or punctuation differs. PDF layout spacing and wrapped word hyphens normalized. Proposed correction: we are likely to see a fast, local increase in capability—“AI go FOOM.”
