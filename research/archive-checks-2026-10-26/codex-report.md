# Archive checks, 2026-10-26

| Item | Verdict   | Finding                                                                                   |
| ---- | --------- | ----------------------------------------------------------------------------------------- |
| 1    | Confirmed | June 2026 edition; effective 2026-06-30; archived bytes match the recorded SHA-256.       |
| 2    | Not found | Risk acceptance is assigned to xAI, without a named decision office or body.              |
| 3    | Not found | No board or external oversight role over the relevant decisions is specified.             |
| 4    | Not found | No competitor-conditioned safeguard or commitment provision under the narrowed criterion. |
| 5    | Not found | Future revision language does not state changes from a predecessor.                       |
| 6    | Supported | Same-day capture explicitly says the additional capacity is in the U.S.                   |
| 7    | Supported | Partial operation and early training/inference workloads are stated.                      |
| 8    | Supported | July 22 dateline resolves last month to June 2025, at month precision.                    |
| 9    | Supported | Quotation matches an explicitly extreme hypothetical scenario.                            |
| 10   | Supported | Quotation matches; journal issue, author date and attestation stay separate.              |
| 11   | Supported | Both HBR quotations match; publication 2016-11-17.                                        |
| 12   | Supported | Signed launch post supports Luan co-founding; launch date is not incorporation date.      |
| 13   | Supported | Vaswani is explicitly called a cofounder.                                                 |
| 14   | Supported | Parmar is explicitly called a cofounder.                                                  |
| 15   | Supported | Luan describes prior Google giant-model leadership; tenure dates unstated.                |
| 16   | Supported | Luan describes prior engineering leadership at OpenAI; tenure dates unstated.             |

Checker: Codex, GPT-6 family; source-based machine check, not human editorial acceptance. Only this report is changed. No inference about implementation or compliance is made.

## Method and blind-check limits

Direct HTTP archive retrieval, predominantly sequential; the initial failed Davidson and Hanson raw-replay requests overlapped while awaiting completion. PDF text extracted with pypdf; cover rendered and inspected. Whitespace is normalised in quotations. Each item is saved before moving to the next. Judgements precede opening the stored cell/claim verdicts and comparison reports, except for the exposure described here: extracting edition metadata from `research/frontier-framework-comparison/pack.json` also displayed the edition-level `inspected` and `notes` fields before items 1–5 were written. Those fields included the effective date, section map, and a statement that there was no change log. This compromises strict blindness for item 5 and supplies context for items 1–4. No cell verdicts were displayed in that operation. The facet criteria and `scope.md` were also read as instructed. The supplied brief itself disclosed target quotations and dates for several other items.

## 1. June 2026 xAI edition and hash

**Verdict: confirmed.** The first page carries the title and “Effective Date: 30 June 2026”. This is an effective date, not an inferred publication date.

- Evidence: “xAI Frontier Artificial Intelligence Framework”; “Effective Date: 30 June 2026”. Locator: PDF p. 1, title block; visually inspected.
- Capture: [2026-07-16 00:34:29 UTC](https://web.archive.org/web/20260716003429/https://media.x.ai/v1/website/xai-frontier-artificial-intelligence-framework-30-june-2026-99c40684.pdf). Raw retrieval used the same timestamp with `id_` replay.
- Retrieved body: 203,142 bytes; SHA-256 `2c3c6313bd2fb6eeffcafedb38013c34d92c53331ddedbfa331821c75055df53`, exactly equal to the edition's recorded publisher-copy hash in `pack.json`.
- Proposed correction: none to edition identity or effective date; the archive supplies a reproducible copy when the publisher URL fails.

## 2. faif-2026.D4.determination

**Verdict: not found.** The criterion requires a named person, office or body making or approving the determination. The edition attributes risk acceptance to xAI but names no responsible office or decision body.

- Evidence (near hit, not a qualifying provision): “The final decision also reflects an overall judgment based on all the available evidence, including how robust and reliable the evaluation methods were.” Locator: PDF p. 6, §2.3 Systemic risk acceptance determination.
- Capture: [2026-07-16 00:34:29 UTC](https://web.archive.org/web/20260716003429/https://media.x.ai/v1/website/xai-frontier-artificial-intelligence-framework-30-june-2026-99c40684.pdf).
- Scope and exclusions: Whole edition, pp. 1–9. Searched decision, determin, approv, chief, officer, committee, governance. Risk-identification determinations (pp. 2–3) and risk acceptance (pp. 5–6) name xAI/we only. Designated risk owners (p. 8) monitor and mitigate incidents, not approve threshold/adequacy/deployment decisions. Generic governance and legal/compliance reviews (p. 9) name no decision office.
- Proposed correction: Retain or use not found under the office/body criterion; explain that organisational self-attribution is present. If the facet is intended to include the developer itself, clarify that criterion before recoding.

## 3. faif-2026.D4.oversight

**Verdict: not found.** No board, trust, board committee or external party is given oversight or review of threshold, safeguard-adequacy or deployment decisions.

- Evidence (near hit, not a qualifying provision): “xAI’s internal governance practices include managing risks across the lifecycle of our models and ongoing legal and compliance reviews” Locator: PDF p. 9, §4 Governance.
- Capture: [2026-07-16 00:34:29 UTC](https://web.archive.org/web/20260716003429/https://media.x.ai/v1/website/xai-frontier-artificial-intelligence-framework-30-june-2026-99c40684.pdf).
- Scope and exclusions: Whole edition, pp. 1–9. Searched board, oversight, external, review, committee, trust, authorit. Model oversight (p. 4) concerns model behaviour. Expert interviews/panels (p. 5) and expert red-teaming (p. 6) supply assessment inputs, not oversight of decisions. SOC 2 Type II evaluations (p. 7) support security standards, not a specified review role over these decisions. Trusted parties/government agencies (p. 6) are possible access recipients. Third-party feedback (p. 8) and required incident reports to authorities (p. 9) do not assign decision oversight. Internal compliance reviews (p. 9) do not identify a board/external reviewer.
- Proposed correction: Use not found, scoped to the facet; do not infer absence of actual oversight.

## 4. faif-2026.D6.competitor

**Verdict: not found.** Under the user's narrowed 2026-10-26 criterion, no provision conditions xAI's safeguards or commitments on other developers' conduct or capabilities.

- Evidence (near hit, not a qualifying provision): “To prevent the unauthorized proliferation of advanced AI systems, we also implement security measures against the large-scale extraction and distillation of reasoning traces” Locator: PDF p. 8, §2.4 Security mitigations.
- Capture: [2026-07-16 00:34:29 UTC](https://web.archive.org/web/20260716003429/https://media.x.ai/v1/website/xai-frontier-artificial-intelligence-framework-30-june-2026-99c40684.pdf).
- Scope and exclusions: Whole edition, pp. 1–9. Searched competitor, developer, race, marginal, other, adjust, condition. Benchmark comparison (pp. 4–5) is evaluation method selection. Market analysis (p. 5) gathers risk information. Access differentiated by user type (p. 6) is not a condition on rival developers. The reasoning-trace passage and DeepSeek-R1 citation (p. 8) explain anti-extraction protections, not relaxation or conditional commitments. General changes to safety approach (p. 7) are not conditioned on competitors.
- Proposed correction: Retain/use not found under the narrowed criterion; do not count the DeepSeek citation as a competitor clause.

## 5. faif-2026.D8.changes

**Verdict: not found.** The edition discusses future revision but does not state changes from a predecessor.

- Evidence (near hit, not a qualifying provision): “We will review this Framework periodically, and expect significant changes as the capabilities of our models expand.” Locator: PDF p. 2, §1 Introduction.
- Capture: [2026-07-16 00:34:29 UTC](https://web.archive.org/web/20260716003429/https://media.x.ai/v1/website/xai-frontier-artificial-intelligence-framework-30-june-2026-99c40684.pdf).
- Scope and exclusions: Whole edition, pp. 1–9. Searched previous, prior, change, revis, update, version, changelog. Periodic future changes (p. 2), model updates/evaluation triggers (pp. 2, 5), updating control architectures (p. 3), future safety-method improvements (p. 7), and incident-driven changes (p. 8) are not retrospective edition changes. No predecessor comparison or changelog located. Blindness limitation: edition notes stating no change log had already been displayed.
- Proposed correction: Retain/use not found; do not substitute an analyst's comparison of editions for the edition's own statement.

## 6. openai-oracle-capacity-2025

**Verdict: supported.** The same-day capture explicitly includes the U.S. location. The shorter quotation supplied in the brief omits relevant words but the full sentence supports them.

- Evidence: “Oracle and OpenAI have entered an agreement to develop 4.5 gigawatts of additional Stargate data center capacity in the U.S.” Locator: first article paragraph, below the July 22, 2025 dateline.
- Capture: [2025-07-22 11:51:19 UTC](https://web.archive.org/web/20250722115119/https://openai.com/index/stargate-advances-with-partnership-with-oracle/), the earliest same-day successful HTML capture returned by the bounded CDX search (July 22–August 1; daily collapse). No claim to the absolute earliest capture across URL variants.
- Date/status: announcement dated 2025-07-22 of an agreement to develop capacity; not completed or operational capacity.
- Proposed correction: extend the evidence quotation through “in the U.S.” and attach this capture; retain announced/agreement wording.

## 7. openai-abilene-use-2025

**Verdict: supported.** The captured announcement states both partial operation and early workloads.

- Evidence: “Meanwhile, construction of Stargate I in Abilene is progressing and parts of the facility are now up and running.” Also: “we recently began running early training and inference workloads”. Locator: article paragraph beginning “Meanwhile”.
- Capture: [2025-07-22 11:51:19 UTC](https://web.archive.org/web/20250722115119/https://openai.com/index/stargate-advances-with-partnership-with-oracle/).
- Date/status: OpenAI's account of operations as of the announcement date, 2025-07-22; “recently” does not establish a precise workload start date. It does not establish completion of the whole facility.
- Proposed correction: none to those propositions; preserve partial-facility scope and attribute the operational statement to OpenAI.

## 8. abilene-nvidia-gb200-2025

**Verdict: supported.** The page's own dateline is July 22, 2025; “last month” consequently resolves to June 2025 at month precision.

- Evidence: “July 22, 2025”; “Oracle began delivering the first Nvidia GB200 racks last month”. Locator: article dateline and paragraph beginning “Meanwhile”.
- Capture: [2025-07-22 11:51:19 UTC](https://web.archive.org/web/20250722115119/https://openai.com/index/stargate-advances-with-partnership-with-oracle/).
- Date/status: delivery commencement is inferred as 2025-06 from relative wording, distinct from publication (2025-07-22) and archive attestation (2025-07-22). No day is established and delivery of all racks is not stated.
- Proposed correction: retain month precision and an explicit relative-date derivation; do not supply a June day or treat this as a completed delivery.

## 9. ec-g01-davidson-2021-explosive-economic-growth-a

**Verdict: supported; conditional model scenario.** The passage concerns an explicitly extreme toy scenario, not an observed technological capability or an unconditional prediction.

- Evidence: “In this (extreme!) fiction, AI robots can perfectly substitute for all human labor.” Locator: “Advanced AI could drive explosive growth” → “AI robots as a form of labor”, opening paragraph. The preceding sentence posits robots able to do any human labour task at lower cost; the following discussion makes labour accumulable through investment.
- Capture: [2021-07-02 00:32:41 UTC](https://web.archive.org/web/20210702003241/https://www.openphilanthropy.org/could-advanced-ai-drive-explosive-economic-growth).
- Retrieval: raw replay looped; standard HTTP replay retrieved the article successfully. The attempted in-app replay timed out. The earlier progress message reporting retrieval failure was superseded by the successful standard replay.
- Proposed correction: none to the quotation; preserve the extreme hypothetical and substitution assumptions. This verifies this passage, not every model or conclusion in the report.
- Afterwards opened: only the stored evidence passage and locator in data/evidence.json, without its note or verification fields; quotation matches after whitespace normalisation.

## 10. ec-g03-hanson-1998-is-a-singularity-just-around-the-corner-a

**Verdict: supported, with distinct date kinds.** The conclusion offers a qualified historical-trend extrapolation, while the paper also specifies demanding conditions on a technology that would accelerate the transition.

- Evidence: “Historical trends on growth rates suggest that we are slowly moving up the capital supply curve toward the high growth mode, and may reach it in roughly a century and a half.” Locator: “Conclusion”, first paragraph.
- Date evidence: “Journal of Transhumanism 2, June 1998.” at the head; “Robin Hanson. March 30, 1998” at the foot.
- Capture: [1999-01-28 00:18:13 UTC](https://web.archive.org/web/19990128001813/http://hanson.berkeley.edu/fastgrow.html).
- Retrieval: raw replay returned 404; standard replay retrieved the complete text.
- Date interpretation: journal issue/publication is 1998-06 at month precision; author date is 1998-03-30; this copy attests the quoted wording on 1999-01-28. Neither earlier label proves those exact bytes were publicly available then. Do not merge the three dates.
- Proposed correction: none to the quotation; retain “suggest” and “may”, and preserve the issue date, author date and attested date separately.
- Afterwards opened: only the stored evidence passage and locator in data/evidence.json, without note or verification; quotation matches after whitespace normalisation.

## 11. ec-m04-agrawal-gans-goldfarb-2016-simple-economics-of-machine-intelligence-a

**Verdict: supported; both quotations match.** The article frames machine intelligence economically as cheaper prediction and argues that complementary judgment gains value.

- Evidence 1: “Machine intelligence is, in its essence, a prediction technology, so the economic shift will center around a drop in the cost of prediction.” Locator: opening section, paragraph beginning “Today we are seeing similar hype”.
- Evidence 2: “Using the language of economics, judgment is a complement to prediction and therefore when the cost of prediction falls demand for judgment rises.” Locator: “Judgment will become more valuable”, paragraph beginning “As machine intelligence improves”.
- Date evidence: “November 17, 2016”, article dateline; publication date 2016-11-17, distinct from capture attestation.
- Capture: [2016-11-25 12:48:50 UTC](https://web.archive.org/web/20161125124850/https://hbr.org/2016/11/the-simple-economics-of-machine-intelligence).
- Context: the authors acknowledge that some judgment tasks can be reframed as predictions; this is their economic argument, not independent proof of a universal employment outcome.
- Proposed correction: none to these quotations or publication date.
- Afterwards opened: only stored evidence passages and locators in data/evidence.json; no notes or verdicts were opened before this judgement.

## 12. lg-deal-luan-cofounded-adept

**Verdict: supported** for the relation specified in the request. Luan's co-founding relation is supported by his signed launch post calling Vaswani and Parmar his cofounders and describing the team's launch.

- Evidence: “my cofounders Ashish Vaswani and Niki Parmar”; “That’s why we’re starting Adept”. Locator: byline David Luan; second body paragraph and paragraph beginning “True general intelligence”.
- Capture: [2022-04-26 16:02:16 UTC](https://web.archive.org/web/20220426160216/https://www.adept.ai/post/introducing-adept); article dateline April 26, 2022. Original title: “Introducing Adept AI Labs”.
- Date kind and precision: Co-founding existed by the dated launch post, 2022-04-26. This is day-precise publication/announcement evidence, not proof of the legal founding date. A 2022 founding year is consistent, but should be distinguished from an exact incorporation date.
- Proposed correction: Keep co-founded; qualify any 2022-04-26 event date as the announcement date, not legal foundation.
- Blind judgement recorded before opening candidate wording or admission notes. Exact record/date-field comparison follows separately.

## 13. lg-deal-vaswani-cofounded-adept

**Verdict: supported** for the relation specified in the request. The author explicitly calls Ashish Vaswani a cofounder.

- Evidence: “my cofounders Ashish Vaswani and Niki Parmar”. Locator: second body paragraph.
- Capture: [2022-04-26 16:02:16 UTC](https://web.archive.org/web/20220426160216/https://www.adept.ai/post/introducing-adept); article dateline April 26, 2022. Original title: “Introducing Adept AI Labs”.
- Date kind and precision: Relation attested by launch/publication on 2022-04-26; the post does not separately date when co-founding occurred.
- Proposed correction: Keep co-founded; retain announcement/snapshot dating or year precision without inventing an exact founding day.
- Blind judgement recorded before opening candidate wording or admission notes. Exact record/date-field comparison follows separately.

## 14. lg-deal-parmar-cofounded-adept

**Verdict: supported** for the relation specified in the request. The author explicitly calls Niki Parmar a cofounder.

- Evidence: “my cofounders Ashish Vaswani and Niki Parmar”. Locator: second body paragraph.
- Capture: [2022-04-26 16:02:16 UTC](https://web.archive.org/web/20220426160216/https://www.adept.ai/post/introducing-adept); article dateline April 26, 2022. Original title: “Introducing Adept AI Labs”.
- Date kind and precision: Relation attested by launch/publication on 2022-04-26; no distinct co-founding event day is given.
- Proposed correction: Keep co-founded with the launch-date qualification; do not infer an incorporation day.
- Blind judgement recorded before opening candidate wording or admission notes. Exact record/date-field comparison follows separately.

## 15. lg-deal-luan-google-prior

**Verdict: supported** for the relation specified in the request. Luan states that he joined Google to lead its giant-model efforts, before describing the Adept launch.

- Evidence: “when I joined Google to lead Google’s giant model efforts”. Locator: paragraph beginning “These breakthroughs”.
- Capture: [2022-04-26 16:02:16 UTC](https://web.archive.org/web/20220426160216/https://www.adept.ai/post/introducing-adept); article dateline April 26, 2022. Original title: “Introducing Adept AI Labs”.
- Date kind and precision: Prior role, retrospectively reported on 2022-04-26. No Google start/end year or day is stated. The sequence and past tense support prior employment/leadership, not current employment.
- Proposed correction: Keep prior Google role in this wording; leave its actual tenure dates unknown. Do not promote the article date to a Google employment date.
- Blind judgement recorded before opening candidate wording or admission notes. Exact record/date-field comparison follows separately.

## 16. lg-deal-luan-openai-engineering-prior

**Verdict: supported** for the relation specified in the request. Luan explicitly states that he led Engineering at OpenAI.

- Evidence: “When I led Engineering at OpenAI, we scaled up the Transformer into GPT-2 and GPT-3”. Locator: paragraph beginning “The Transformer”.
- Capture: [2022-04-26 16:02:16 UTC](https://web.archive.org/web/20220426160216/https://www.adept.ai/post/introducing-adept); article dateline April 26, 2022. Original title: “Introducing Adept AI Labs”.
- Date kind and precision: Prior engineering leadership, retrospectively reported on 2022-04-26; no precise appointment or departure date is supplied. Mentioning GPT model names does not establish tenure endpoints.
- Proposed correction: Keep prior engineering leadership; do not replace this with an unsupported formal title or infer exact tenure dates.
- Blind judgement recorded before opening candidate wording or admission notes. Exact record/date-field comparison follows separately.

## Comparison

Opened after the source judgements were saved and pushed in `e33bc7b`:

- Current `data/claims.json` and `data/evidence.json`: the six target OpenAI/economics records, including qualifications, date fields, verification and notes. Source URL-only fields had been read earlier for discovery. Economics evidence quotations/locators had also been displayed after reading the originals, before writing the corresponding judgements; notes/verdicts were withheld.
- `research/frontier-framework-comparison/pack.json`: the four target cells, their `notFound` rationales, and adjacent D6.discretion/D8.process cells. Edition metadata exposure before judgement is disclosed above.
- `research/lab-genealogy/pack.json`: the five candidate records, source metadata and launch event. Earlier discovery extracted only Adept URLs.
- `review/genealogy-admission-2026-10-17.md`, including its held-back table; `review/recheck-corrections-2026-10-25.md`, including economics rulings 2, 3 and 5 and the archive follow-up.
- On `origin/recheck-38-42`, pinned at `5066b25d0059fbacc36f08483906b2b8150914c9`: `review/recheck-38-frameworks-2026-10-26.md` and `review/recheck-42-capital-compute-2026-10-26.md`, especially their retrieval limits and target-item entries. These files were read through Git, without switching branches. Other findings in those reports are outside this check.

| Item | Comparison with stored records and reports                                                                                                                                                                                                                                           | Disposition proposed                                                                                                                                                                                    |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Agree with the pack's edition identity, effective date and hash. The framework recheck could not retrieve it because the publisher returned 404. Archive bytes match the previously recorded publisher copy.                                                                         | This report resolves that retrieval gap for the specified edition; preserve the older report as historical evidence of its failed retrieval.                                                            |
| 2    | Agree with `D4.determination` not found and its exclusions: xAI/we is generic attribution; no named decision office or body. The framework recheck's cannot-verify status was an access limit, not a contrary finding.                                                               | Retain the cell; add this archive check in a separately authorised update if wanted.                                                                                                                    |
| 3    | Agree with `D4.oversight` not found. Incident reporting, external research and model oversight do not assign oversight of the relevant decisions to a board or external party.                                                                                                       | Retain the cell; access gap resolved here.                                                                                                                                                              |
| 4    | Agree with `D6.competitor` not found under the user's narrowed criterion. Security against reasoning-trace extraction is not a condition on safeguards based on another developer's conduct. The pack's current criterion is broader than the instruction supplied for this run.     | Retain this result under the narrowed criterion; persist and apply that criterion consistently only in a separately authorised task. No ruling on the recheck's Meta/OpenAI boundary cases here.        |
| 5    | Agree with `D8.changes` not found: future reviews and improvements do not state changes from a predecessor. Strict blindness is compromised by the previously displayed edition note, so this is corroboration, not a fully blind result.                                            | Retain the cell; archive access gap resolved here, with the stated blindness limit.                                                                                                                     |
| 6    | Agree with the claim and its contracted/agreement stage. The capital recheck correctly flagged that its stored excerpt omitted US and that neither earlier pass authenticated the dated text. The same-day capture includes the missing geographic words.                            | Extend the quotation through “in the U.S.” and record the capture in a later evidence update. No factual claim correction needed.                                                                       |
| 7    | Agree with the snapshot, statement, qualification and two-fragment excerpt. The source says parts are operating and workloads recently began, not that all planned capacity is operational.                                                                                          | The capital recheck's archive request is satisfied; preserve its historical access limit and add this later verification separately.                                                                    |
| 8    | Agree with the July 22 snapshot and delivery-start statement. The archive dateline confirms the basis for June 2025. The stored period preserves June without a day; this check makes the relative-date derivation explicit.                                                         | Archive request satisfied. If updating the evidence, state that June is derived from last month, not a separately supplied delivery date. Do not change the snapshot to a June event day.               |
| 9    | Agree with the conditional G01 articulation, stored context-only requirement and correction ruling 2. The archive also displays Published June 25, 2021, matching publication 2021-06-25; the quoted wording is attested 2021-07-02.                                                 | The requested archive follow-up is complete for this passage. Retain the model-scenario qualifier. This check does not independently establish economist tier or an exhaustive earliest-located search. |
| 10   | Agree with G03's statement, conditional premise and correction ruling 3: June 1998 issue, March 30 author date, January 28, 1999 attestation. The paper's conditional extrapolation does not identify AI as the cause of the projected growth.                                       | Archive follow-up complete for the passage/dates; retain all date kinds and hedges. Economist standing and the collection-wide earliest-located search were not re-audited here.                        |
| 11   | Agree with M04, both evidence rows, their context and correction ruling 5. Both passages, including the judgment sentence previously not quoted by the cross-family check, match the dated capture. Publication 2016-11-17 and attestation 2016-11-25 remain distinct.               | Archive follow-up complete for both passages. No quotation/date correction. No new search-based priority claim.                                                                                         |
| 12   | Agree with the candidate's exact attributed wording, `co_founded`, unknown founding date and qualification that it does not establish an exclusive three-person founder list or Luan's formal title. The admission report held it back for a block page, not contradictory evidence. | Source-access objection resolved by this capture. Eligible for a separately authorised admission decision, with founding time still unknown.                                                            |
| 13   | Agree with the candidate's attributed Vaswani cofounder credit and unknown founding date. The post gives no tenure endpoint or evidence about a 2024 move.                                                                                                                           | Same retrieval gap resolved; no automatic admission or inference about later employment.                                                                                                                |
| 14   | Agree with the candidate's attributed Parmar cofounder credit and unknown founding date. The post does not establish her formal title or how long she stayed.                                                                                                                        | Same retrieval gap resolved; retain qualifications and require separate admission authorisation.                                                                                                        |
| 15   | Agree with the candidate's Google giant-model leadership wording, `held_role`, retrospective attribution and unknown role dates. The candidate already avoids a fabricated formal title.                                                                                             | Same retrieval gap resolved; retain unknown tenure, with a separate admission decision.                                                                                                                 |
| 16   | Agree with the candidate's Engineering leadership wording and GPT-2/GPT-3 context, without turning it into a formal VP title or dated tenure.                                                                                                                                        | Same retrieval gap resolved; retain unknown tenure, with a separate admission decision.                                                                                                                 |

For items 12–16, the candidate source names the later `/blog/introducing-adept` address and the shorter title Introducing Adept; the captured original is titled Introducing Adept AI Labs at `/post/introducing-adept`. The anchors and quotations match this original expression. Candidate paragraph numbers depend on the later expression's layout: use the quoted passage plus paragraph opening supplied above as the archive locator. No byte-equivalence with the pack's 2026 reader-relay retrieval is claimed. The candidate event is expressly a launch announcement on 2022-04-26, while all five claim times are unknown; that distinction is correct. The admission report's earlier conservative hold was justified by its access limits and is preserved.

## Checks and remaining decisions

Only this report is tracked as a task change. Task-file Prettier check and indexed-file privacy scan passed at each pushed checkpoint; the focused editorial suites `seed-review.test.ts` and `approved-corrections.test.ts` passed (18 tests), including review-generation reproduction. Initial sandbox runs failed on pnpm store registration and temporary module loading; reruns outside the sandbox passed. No data, schema, code or annotated review pack was edited; no PR was opened.

All 16 items have source-based findings; no target remains unverifiable for lack of the requested source. The four negative framework findings are bounded to this edition and criteria. Strict blindness was not achieved for the edition-level notes exposure described above. No result constitutes human editorial acceptance or independent proof that announced activity happened.

Maintainer decisions: whether to admit the five held-back Adept candidates and whether to authorise evidence/provenance updates for the existing records and framework pack. This report does neither. Next step: use these findings in that separately scoped task.

Housekeeping observation: the shared checkout has an unrelated untracked `.claude/` directory and numerous older worktrees. They were preserved; branch merge status and cleanup were not audited in this source-check task.
