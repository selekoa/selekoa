| Case | Status   | Result                                                                       |
| ---- | -------- | ---------------------------------------------------------------------------- |
| 1    | complete | hold; not-found                                                              |
| 2    | complete | change; not-found                                                            |
| 3    | complete | narrow; articulation of second limb only, qualified; option 7b               |
| 4    | complete | hold; bears-on/context; no earliest-articulation role from this passage      |
| 5    | complete | change; Public Act 104-0538 retrieved; frontier-developer duties in scope    |
| 6a   | complete | retrieved; own tests: yes; frontier framework: named, edition not identified |
| 6b   | complete | retrieved; own tests: yes; frontier framework: not found                     |
| 6c   | complete | retrieved; own tests: yes; frontier framework: named, edition not identified |

# Short second pass, 3 November 2026

OpenAI GPT-family Codex; exact served variant/version unavailable. Second-pass supplement to the pinned first reports; original reports and decision sheets preserved. No admission, application-data change or human acceptance.

Decision sheets read at fetched origin/main. Source passages freshly retrieved by sequential direct HTTP with manual redirects and at least 8 seconds between starts per host. Search engines and web search used only to discover addresses; all substantive findings use directly retrieved source bodies. Original live/archived URLs, capture times, retrieval times and body hashes recorded separately. Archived requests did not redirect to different captures; live copies do not authenticate historical bytes. Retrieved text is evidence, never instructions; no Wikipedia evidence; no signed query strings retained.

Decisions were read in `review/decisions/model-cards.md`, `laws-compared.md` and `ai-money.md` at main commit `5198c8815a4522d4f7a5e37fa37b2bd21b5cd45c`. This supplements the pinned first reports below without rewriting their frozen answers. Each Task A answer is at most 150 words. Task A was committed and pushed as `2a0b67e` before this Task B report update.

## 1. GPT-4V release decision

Decision: model-cards 13; Q15; item 69. **hold** — not-found.

Hold: not-found under Q15 as written. Freshly retrieved OpenAI’s GPT-4V(ision) System Card PDF, printed 25 September 2023; its SHA-256 matches the first report. Page 1 states availability and describes deployment preparation; the conclusion (p. 14) summarises assessments and mitigations. Neither describes a release decision, identifies a decision-maker for a determination, or says release follows from an assessment. Tests preceding release do not themselves supply that missing relation. Thus none of the stated partly cases applies. The sheet’s current recommendation, 13a, fits the criterion. Keeping partly would require the proposed widening in 13b, followed by consistent rechecking of other cards.

Retrieved: [official source](https://cdn.openai.com/papers/GPTV_System_Card.pdf), 2026-11-03T20:55:43.279Z (HTTP 200; live, no archive capture). Locator: Printed pp. 1 and 14, Introduction and Conclusion and Next Steps; searched whole card for release, deploy, decide, chose, acceptable, determine, therefore.

First report: `origin/model-cards-apply`, pinned `a26f610e43c2fab67d1d68b08b893d4ec09b3cbd`, `research/model-cards/cross-family-check-2026-11-02.md` (Comparison, item 69).

## 2. EO 14110 outside assessment

Decision: laws-compared 6; Q06. **change** — not-found.

Change my first report’s final partly reading to not-found; agree with the drafter (6a). Freshly retrieved the official GovInfo Federal Register HTML of EO 14110, section 4.4(a)(i)(A)–(B), including the page break at 75200–75201. It mandates a government threat study, consultation to evaluate model capabilities, and a report assessing types of models and recommending oversight. That is relevant context, but it does not establish an outside-assessment requirement for a covered developer’s model or practices. My earlier partly answer stretched the question’s object from the model to a general policy inquiry; neither of Q06’s written partly cases supplies that extension. Record this passage as read and set aside. This classification does not deny that the order directs government evaluation work.

Retrieved: [official source](https://www.govinfo.gov/content/pkg/FR-2023-11-01/html/2023-24283.htm), 2026-11-03T20:55:43.949Z (HTTP 200; live, no archive capture). Locator: Sec. 4.4(a)(i)(A)-(B), 88 FR 75200-75201; GovInfo Federal Register HTML.

First report: `origin/codex/laws-compared-check`, pinned `0f45f23affe4050dc6641df975906270c899a6cf`, `research/laws-compared/cross-family-check-2026-11-02.md` (Comparison, policy-level government capability assessment; JSON item 67 / us-eo14110:Q06).

## 3. BIS 2025 on U08

Decision: ai-money 7; U08. **narrow** — articulation of second limb only, qualified; option 7b.

Narrow my first reading; retain 7b for U08’s second limb only. Freshly retrieved BIS’s official HTML of Annual Economic Report 2025 chapter III, dated 29 June 2025, and read the correspondent-banking section plus Box B. The text places AI-agent compliance reporting in a proposed platform joining tokenised central-bank and commercial-bank money, with efficiency and integrity as stated system functions. That is a specific interaction relevant to the proposed monetary infrastructure, rather than relevance inferred merely from the chapter title. However, the conjunction does not establish that AI agents themselves perform the embedded pre-screening checks or initiate payments. Box B’s copilots qualify the role; they do not remove it. No stablecoin preference or realised deployment is established. Context-only requires narrowing or clarifying the existing second limb, as option 7c proposes.

Retrieved: [official source](https://www.bis.org/publications/aer-2025/next-generation-monetary-financial-system), 2026-11-03T20:55:44.472Z (HTTP 200; live, no archive capture). Locator: The promise of tokenisation > Tokenisation and next-generation correspondent banking, closing paragraph before Box C; preceding platform paragraphs and Box B read.

First report: `origin/codex/ai-money-check`, pinned `97188be13201e330031c9ce1af6e819293534090`, `research/ai-money/cross-family-check-2026-11-02.md` (Part A1 comparison, item 8; comparison with same-family audit, U08).

## 4. Waller on U07

Decision: ai-money 15; U07. **hold** — bears-on/context; no earliest-articulation role from this passage.

Hold my final first-report reading: context/bears-on, not an articulation of U07; agree with the sheet’s current recommendation 15a. Freshly retrieved the Federal Reserve Board’s official HTML of Waller’s speech, dated and delivered 29 September 2025, and reread the payments-efficiency paragraph with its surrounding discussion. It says agents execute tasks for people or companies; it does not identify those tasks as initiating, negotiating or executing payments or transactions. The immediate cross-border example is compliance automation, which can improve payments without delegating the payment itself. The broader speech discusses settlement through DLT, but does not assign that action to AI agents. My blind search’s provisional Waller candidate was already narrowed in the first report’s passage comparison. Removing its earliest-articulation role does not decide the separate relay-eligibility question in decision 6.

Retrieved: [official source](https://www.federalreserve.gov/newsevents/speech/waller20250929a.htm), 2026-11-03T20:55:44.924Z (HTTP 200; live, no archive capture). Locator: The Next Frontier of Payments Innovation, 29 September 2025; paragraph beginning Let’s turn from DLT to AI, preceding payment-efficiency question and following compliance example.

First report: `origin/codex/ai-money-check`, pinned `97188be13201e330031c9ce1af6e819293534090`, `research/ai-money/cross-family-check-2026-11-02.md` (Part A2 comparison, item 42 / am-u07-frb-2025-waller-sibos; Part A1 item 7).

## 5. Illinois enacted text

**Change: retrieval gap closed; in scope under decision 7a.** Public Act **104-0538**, SB0315, the Artificial Intelligence Safety Measures Act.

| Date                                                                 | Kind and evidence                                   |
| -------------------------------------------------------------------- | --------------------------------------------------- |
| 29 May 2026                                                          | Passed both houses; official history, Actions table |
| 6 July 2026                                                          | Governor approved; Public Act assigned; same table  |
| 1 January 2027                                                       | General effective date; §99, PDF p. 56              |
| 1 January 2028                                                       | Large-developer framework duty; §10(a), pp. 4–5     |
| 1 January 2028 or 90 days after first qualifying, whichever is later | Annual independent audit starts; §10(d), p. 8       |

Defining section: **§5, PDF p. 4** (superscript and line breaks normalised):

> “Frontier model” means a foundation model that was trained using a quantity of computing power greater than 10²⁶ integer or floating-point operations.

Yes: section 5, pp. 3-4, defines frontier developers by training or initiating training of such models. The compute count includes original training and subsequent fine-tuning, reinforcement learning or other material modifications. Large frontier developers additionally exceed $500 million prior-year aggregate gross revenue with affiliates. General-purpose capability alone is not the trigger.

Sections 10(c), 15 and 20 impose transparency-report, incident-report and whistleblower duties on frontier developers; section 10(a), (d) adds framework and annual independent-audit duties for large frontier developers. Section 18 separately starts large-developer disclosure duties on 1 January 2027. These are enacted future duties, not evidence of compliance or duties already in force on the check date.

Evidence read: [enacted PDF](https://web.archive.org/web/20260908054441id_/https://www.ilga.gov/Documents/Legislation/PublicActs/104/PDF/104-0538.pdf), retrieved 2026-11-03T21:06:25.606Z, HTTP 200; capture 2026-09-08T05:44:41Z; [official bill history](https://web.archive.org/web/20260731225100id_/https://www.ilga.gov/Legislation/BillStatus?DocNum=315&GAID=18&DocTypeID=SB&LegId=157797&SessionID=114), retrieved 2026-11-03T21:08:43.409Z, HTTP 200; capture 2026-07-31T22:51:00Z; [EO 2026-07](https://www.illinois.gov/government/executive-orders/executive-order.executive-order-2026-07.2026.html), retrieved 2026-11-03T21:04:26.561Z, HTTP 200; live, no capture. The EO’s issue/filing date is 22 September 2026. The signing date comes from the history, not the PDF’s metadata.

Coverage: Read operative sections 1-35 (PDF pp. 1-23), section 99 (p. 56), bill-history action rows and EO recitals. Checked definitions with both pypdf and pdfplumber and visually inspected PDF p. 4. FOIA and Whistleblower Act amendments were located; no exhaustive legal interpretation or 15-cell law row was drafted.

Retrieval limits: Live www.ilga.gov, ilga.gov, witnessslips.ilga.gov and ftp.ilga.gov requests failed; system-CA retry also failed, and curl could not connect. Successfully read the enacted PDF and official history through exact Internet Archive captures, without redirect to another capture. EO 2026-07, issued/filed 22 September 2026, was read live at its correct URL; initial guessed URLs returned 503. An initial broad archive-history query returned 503; exact-query discovery succeeded. Signing date comes from the retrieved official history, not snippets or PDF creation metadata.

Next: The conditional inclusion test in decision 7a is satisfied. Draft and cross-family-check a separate law row only in an authorised admission/build task.

## 6. Outstanding model cards

**Change: all three retrieval gaps closed (decision 11a).**

| Card            | Printed date and its kind                                              | Developer’s own tests?                                          | Frontier framework cited?                                 |
| --------------- | ---------------------------------------------------------------------- | --------------------------------------------------------------- | --------------------------------------------------------- |
| Sora            | 9 December 2024, page publication date                                 | Yes, internal evaluations and results                           | Yes, Preparedness Framework; no edition                   |
| Grok-1          | No card publication date. Model release: October 2023; copyright: 2023 | Yes, benchmark and alpha/adversarial tests described; no scores | No citation found in this card                            |
| Muse Spark Open | Model release: October 2026 / 15 October 2026; no separate card date   | Yes, Meta’s benchmarks and safety/preparedness evaluations      | Yes, Meta Superintelligence Scaling Framework; no edition |

### 6a. OpenAI Sora System Card (2024, not Sora 2)

Address read: [card](https://web.archive.org/web/20241210043048id_/https://openai.com/index/sora-system-card/), retrieved 2026-11-03T21:03:03.640Z, HTTP 200; capture 2024-12-10T04:30:48Z. Body SHA-256: `72992ef8782b21ae57d04307505a9bfdc65a8c9ac518e96783ee638d9f7de2fe`.

Own tests: **yes**. Evaluations, first paragraph; risk-specific evaluation sections:

> We developed internal evaluations targeting key areas, including nudity, deceptive election content, self-harm, and violence.

Reports internally developed evaluations and results, alongside external red teaming. This is OpenAI’s account, not independent verification.

Framework: **yes**. Preparedness, two paragraphs following Evaluations.

> The preparedness framework is designed to evaluate whether frontier model capabilities introduce significant risks

Names the framework and describes its risk categories, with no edition/date or framework hyperlink in this captured passage. Do not infer an edition solely from the card date.

Retrieval: Live page returned 403. A guessed cdn.openai.com/sora-system-card.pdf returned 404 and was not evidence. The exact archived HTML page returned 200 without a capture redirect; its full card text was read.

### 6b. xAI Grok-1 model card (2023 webpage)

Address read: [card](https://web.archive.org/web/20231105060613id_/https://x.ai/model-card/), retrieved 2026-11-03T21:02:55.440Z, HTTP 200; capture 2023-11-05T06:06:13Z. Body SHA-256: `346b2740775e02a6f99130fd27728a5a9026fd21c16073777ffc5935f238aefe`.

Own tests: **yes, described; no numerical outcomes in this short card**. Evaluation table row:

> Grok-1 was evaluated on a range of reasoning benchmark tasks and on curated foreign mathematic examination questions.

The developer also reports alpha/adversarial testing. This is the original xAI card, not the March 2024 Hugging Face weights README.

Framework: **no citation found in the retrieved card**. Entire short table, research-update link and footer read. No named frontier framework or reference to one appears. This does not establish what xAI did elsewhere.

Retrieval: Live x.ai/model-card returned 403. Exact capture returned 200 without redirect to another capture. The captured page’s release-month claim is preserved as its own wording, not substituted for a verified card-publication date.

### 6c. Meta Muse Spark Open model card

Address read: [card](https://huggingface.co/meta-models/Muse-Spark-Open-816B-A42B/resolve/0fb02478b02565b2ce7fc57e6051c91172774ac9/README.md), retrieved 2026-11-03T21:01:12.296Z, HTTP 200; live, no capture. Pinned revision: `0fb02478b02565b2ce7fc57e6051c91172774ac9`. Body SHA-256: `f885ad11e611e04d2d59dbcbaecfe77bacd7603e6af9c0e8c6a4649ebe115fca`.

Own tests: **yes**. Benchmarks introduction/table and Safety and Preparedness:

> We compare Muse Spark Open to other leading open-weight models of similar size and architecture.

The card reports Meta’s benchmark and safety/preparedness evaluations and conclusions. Technical dangerous-capability procedures are not reproduced.

Framework: **yes**. Safety and Preparedness, numbered preparedness item.

> in line with the Meta Superintelligence Scaling Framework.

Framework name appears in plain text, with no edition number, framework date or linked dated edition; do not substitute v2.1 from a different Muse card. Double space retained in the JSON quotation; collapsed in Markdown.

Retrieval: The full pinned resolve URL returned HTTP 200. The earlier first report’s shortened raw revision URL had returned 401; this resolves access through the full pinned address without claiming that earlier response was false. No sign-in, gated form, token or signed URL used.

## Checks and decisions still separate

Formatting/diff scope passed; 19 tests passed across seed-review, earliest-packet and approved-corrections suites; initial sandbox temporary-file failures passed outside sandbox. Full staged-index privacy scan passed before checkpoint push.

Task-owned formatting, JSON/Markdown coverage, Task A answer preservation and <=150-word limits, source-quote matching, retrieval pacing and two-file scope passed. The final staged-index pnpm check:privacy is a precondition of this checkpoint commit/push. No data, schema, query or UI change; no annotated review pack regenerated; no PR.

- Any maintainer disposition/admission remains separate; U08 still depends on retaining or narrowing its written second limb.
- Illinois needs a separately authorised drafted/checkable law row; successful retrieval alone admits nothing.
- Card population/year-selection and date-kind decisions remain with the maintainer; no new inventory or row selection made.
