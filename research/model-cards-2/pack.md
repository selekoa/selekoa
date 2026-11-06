# Model cards compared, pack 2: what frontier developers’ cards disclose

Generated from `pack.json` by `node research/model-cards-2/tools.mjs render`; do not edit by hand. Candidate research pack outside application data. Machine-prepared (Claude) and audited on a seeded sample by the same model family; checked by a different family (Codex, GPT family) on 60 cells on 2026-11-04 and adjudicated the same day (review note); not editorially accepted; no human review.

**Question.** What does each frontier developer's published system card, model card or safety report disclose, on the same questions for every card?

**Rows.** Decision 1a: every card that cites the developer’s frontier framework or states a determination under it, plus, for each developer, the latest card before its first framework edition. This pack drafts the eight cards that population.json orders first (round robin over the developers, earliest-dated first); the first pack’s 20 rows are not repeated here.

Each row is one card. Each column is one question, worded so that it fits every card. The questions are Selekoa’s; a card’s own terms appear only in quotation marks. A card is the developer’s own account of its model: what it states is recorded as stated, not as an independent finding.

## Legend

- ● **stated**: A passage of the card meets the question’s criterion as worded. The scope or condition is in the note.
- ◐ **partly**: A passage has what the criterion asks for in a weaker or narrower form than the criterion’s own words (for example, an evaluation referred to without its outcome, or testers described without being named). The note says which part is missing.
- ○ **not-found**: No passage meeting the criterion was found. The cell lists the sections read, the terms searched and every passage set aside, with the reason. It does not show that the developer did not do the thing asked about, or did not disclose it elsewhere.
- – **not-applicable**: The question does not arise for this card, for the reason given (for example, the card predates any framework of its developer, so no framework determination can be asked about).

## Rules

- Every stated or partly cell quotes the card itself (at most 50 words per quotation), with its page and section. Press coverage, blog posts and third-party summaries are not evidence for a cell.
- A card’s statement is the developer’s account. It is not an independent finding, and a stated safeguard is not evidence that the safeguard works. Announced stays announced.
- Dangerous-capability evaluations are recorded at policy level only: whether an evaluation was run, its domain, the stated outcome category and the threshold language. Methods, prompts, task contents, uplift details and other technical content are never recorded.
- Dates keep their kind and precision: the card’s own date, its publication, the model’s release or availability, and revisions are different events. Unknown dates stay unknown.
- No ranking, scoring or characterisation of developers or cards, and no counts that rank them. Rows are in a fixed order by developer, then date. Symbols are not to be summed.

## Questions

- **Q01 Card date.** What date does the card carry, and of what kind? _Criterion:_ A date printed on the card or its own page (publication, issue or revision date), quoted with its kind. Revision dates are listed separately. Partly if the card carries only a month or year, or only a revision date. The release date of the model is Q02.
- **Q02 Release date.** Does the card state when the model was or will be released or made available, and in what form? _Criterion:_ A passage of the card giving the model’s release, launch or availability date, or the release form (API, consumer product, open weights, limited preview), quoted. Stated if a date or a dated event is given; partly if only the form of release, or only a relative timing (for example, “at launch”), is given.
- **Q03 Framework cited.** Does the card cite the developer’s own frontier safety framework, and which edition? _Criterion:_ The card names the developer’s framework (Responsible Scaling Policy, Preparedness Framework, Frontier Safety Framework, Risk Management Framework, Frontier AI Framework, Advanced AI Scaling Framework, Frontier Governance Framework, or a successor). Stated if it names the framework and identifies the edition (version number, date or a link to a dated edition); partly if it names the framework without an edition. Not applicable if the card predates every framework edition of its developer.
- **Q04 Link to framework.** Does the card link or refer the reader to the framework document itself? _Criterion:_ A hyperlink, address or bibliographic reference to the framework document in the card. Partly if it refers to the framework as a document without an address or reference. Not applicable if Q03 is not applicable.
- **Q05 Framework determination.** Does the card state a determination under the framework: a level, threshold or category reached, not reached or not ruled out? _Criterion:_ A sentence stating the outcome for the model in the framework’s own categories (for example, a safety level applied, a capability threshold reached or not reached, a risk category assigned), quoted. Partly if the card says a determination was made without stating its outcome, or states an outcome for some tracked domains only. Not applicable if Q03 is not applicable.
- **Q06 Safeguards tied to determination.** Does the card state safeguards or mitigations that it ties to that determination? _Criterion:_ A passage naming safeguards, protections or a safeguard standard applied because of, or in line with, the determination or threshold in Q05 (for example, a deployment or security standard named in the framework). Partly if safeguards are stated without being tied to a determination or threshold. A stated safeguard is the developer’s account, not evidence that it works.
- **Q07 Chemical and biological.** Does the card report dangerous-capability evaluations for chemical or biological weapons? _Criterion:_ The card reports that evaluations in this domain were run and states their outcome category or threshold language (policy level only). Partly if evaluations are reported without any outcome or conclusion for the domain. Radiological and nuclear evaluations are noted where reported together.
- **Q08 Cyber.** Does the card report dangerous-capability evaluations for cyber offence? _Criterion:_ The card reports that evaluations of offensive cyber capability were run and states their outcome category or threshold language (policy level only). Partly if evaluations are reported without any outcome or conclusion.
- **Q09 Autonomy and AI R&D.** Does the card report dangerous-capability evaluations for autonomy, self-replication, self-improvement or AI research and development? _Criterion:_ The card reports that evaluations in any of these domains were run and states their outcome category or threshold language (policy level only). Partly if evaluations are reported without any outcome or conclusion. Agentic task benchmarks reported only as product capability do not meet it.
- **Q10 Persuasion.** Does the card report evaluations of persuasion or manipulation of people? _Criterion:_ The card reports that evaluations of persuasive or manipulative capability were run and states their outcome category or conclusion. Partly if evaluations are reported without an outcome. Not found includes a card that states the domain was removed from evaluation; the note says so.
- **Q11 Alignment and deception.** Does the card report evaluations of misalignment, deception, scheming or sabotage of oversight? _Criterion:_ The card reports evaluations of the model’s own propensity or capability for deception, scheming, reward hacking, sabotage or undermining oversight, with a stated conclusion. Partly if evaluations are reported without a conclusion. Content-safety refusal tests do not meet it.
- **Q12 Red-teaming.** Does the card report red-teaming, and with what scope? _Criterion:_ A passage reporting adversarial testing described as red-teaming (internal, external or both), quoted with its scope (domains, number or kind of testers, or period) where given. Partly if red-teaming is mentioned without any scope.
- **Q13 External testers.** Does the card name external or third-party testers or evaluators? _Criterion:_ At least one external organisation (other than a government body, which is Q14) named as having tested or evaluated the model, quoted. Partly if external testers are described but not named.
- **Q14 Government institute.** Does the card name a government body that tested the model or received pre-deployment access? _Criterion:_ A named government body (for example, the US AI Safety Institute or Center for AI Standards and Innovation, or the UK AI Safety or Security Institute) stated to have tested, evaluated or received access to the model, quoted. Partly if government testing is mentioned without naming the body.
- **Q15 Release decision.** Does the card state a release or deployment decision, and who made it? _Criterion:_ A passage stating that a decision to release, deploy or launch was made (decided, chose, deemed acceptable for deployment, determined that safeguards suffice for launch), quoted. Stated if the decision is described and its maker is identifiable: a named person, office or committee, or the developer in its own voice (“we”), which counts as the company as such. Partly if a release is stated as following from an assessment without a decision being described (“we therefore release”), if a decision is described without any maker, or if a maker is named only for a capability or safeguards determination and not for the release.
- **Q16 Stated limits.** Does the card state limits or open uncertainties about its own evaluations? _Criterion:_ A passage stating a limitation, gap or uncertainty of the evaluations reported in the card (for example, that results may underestimate capability, that elicitation was incomplete, or that a threshold could not be ruled out with confidence), quoted. Limitations of the model as a product (for example, hallucination) do not meet it.

## Overview

Each symbol is one cell; the grid compares and does not rank. Symbols are not to be summed. † marks a cell on which the cross-family check disagrees and the maintainer has not decided.

| Card                                             | Q01 | Q02 | Q03 | Q04 | Q05 | Q06 | Q07 | Q08 | Q09 | Q10 | Q11 | Q12 | Q13 | Q14 | Q15 | Q16 |
| ------------------------------------------------ | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| Anthropic: Claude 3 (Opus, Sonnet, Haiku) (2024) |  ◐  |  ◐  |  ●  |  ●  |  ●  |  ●  |  ●  |  ●  |  ●  |  ○  |  ◐  |  ●  |  ◐  |  ○  |  ◐  |  ●  |
| Anthropic: Claude 3.5 Sonnet (2024)              |  ○  |  ○  |  ◐  |  ◐  |  ●  |  ○  |  ●  |  ●  |  ●  |  ○  |  ○  |  ○  |  ●  |  ●  |  ◐  |  ●  |
| Google DeepMind: Gemini 2.0 Flash (2025)         |  ●  |  ◐  |  ●  |  ●  |  ○  |  ◐  |  ○  |  ○  |  ○  |  ○  |  ○  |  ●  |  ○  |  ○  |  ●  |  ●  |
| Google DeepMind: Gemini 2.0 Flash-Lite (2025)    |  ●  |  ○  |  ●  |  ●  |  ○  |  ◐  |  ○  |  ○  |  ○  |  ○  |  ○  |  ●  |  ○  |  ○  |  ●  |  ●  |
| Meta: Code World Model (CWM) (2025)              |  ○  |  ◐  |  ◐  |  ●  |  ◐  |  ◐  |  ○  |  ○  |  ○  |  ○  |  ○  |  ○  |  ○  |  ○  |  ◐  |  ●  |
| Meta: Muse Spark (2026)                          |  ●  |  ◐  |  ●  |  ●  |  ●  |  ●  |  ●  |  ●  |  ●  |  ●  |  ●  |  ●  |  ●  |  ○  |  ●  |  ●  |
| OpenAI: GPT-4o (2024)                            |  ●  |  ◐  |  ●  |  ●  |  ●  |  ◐  |  ●  |  ●  |  ●  |  ●  |  ●  |  ●  |  ●  |  ○  |  ◐  |  ●  |
| xAI: Grok 4 (2025)                               |  ◐  |  ◐  |  ◐  |  ◐  |  ○  |  ◐  |  ●  |  ●  |  ○  |  ◐  |  ●  |  ○  |  ◐  |  ○  |  ○  |  ●  |

## Anthropic: Claude 3 (Opus, Sonnet, Haiku) (2024)

- Card: The Claude 3 Model Family: Opus, Sonnet, Haiku (model card), https://www-cdn.anthropic.com/c6a80a657af445f40e31afac050f3bf76d3b1404.pdf
- Framework edition in the dataset: `rsp-2023`. The card's reference [5] reads 'Anthropic, “Anthropic’s Responsible Scaling Policy.” September, 2023.' with the policy's announcement address, and Section 6.2.1 refers to 'v1.0 of our RSP'. The dataset records rsp-2023 as v1.0 of September 19, 2023. The copy read is the revision of October 22, 2024 (two update lines under the abstract); its two addenda (PDF pp. 43–63) are separate cards in the inventory and are not read for this row.

### Q01 Card date: ◐ partly

> “Update (June 20, 2024): We have added an addendum covering Claude 3.5 Sonnet.” (Abstract, PDF p. 1)

> “Update (October 22, 2024): We have added an addendum covering an upgrade to Claude 3.5 Sonnet and Claude 3.5 Haiku.” (Abstract, PDF p. 1)

The copy read prints two revision dates (June 20 and October 22, 2024) and no issue date of its own. Anthropic's index gives the month March 2024 (inventory); under decision 3a the row is dated by that earliest located publication, with the two updates as revisions.

_Searched:_ Cover and abstract (PDF p. 1), the page footers, and term search across PDF pp. 1–42.; terms: “2024”, “March”, “Update”, “published”, “dated”.

- Set aside: Figure 16 caption, PDF p. 23: 'This plot was updated on June 20, 2024' dates a figure correction, not the card.

### Q02 Release date: ◐ partly

> “Developed by Anthropic and announced in March 2024, the Claude 3 model family will be available in our consumer offerings (Claude.ai, Claude Pro) as well as enterprise solutions like the Anthropic API, Amazon Bedrock, and Google Vertex AI.” (Section 1 'Introduction', PDF p. 1)

The card gives the forms of availability (consumer products, the API and two cloud platforms) and the month of announcement, March 2024. It gives no release or availability date; an announcement month is a different event.

_Searched:_ Sections 1–2 and term search across PDF pp. 1–42.; terms: “release”, “available”, “availability”, “launch”, “announced”.

### Q03 Framework cited: ● stated

> “Anthropic, “Anthropic’s Responsible Scaling Policy.” September, 2023.” (References, [5], PDF p. 39)

> “The evaluation tasks were based on tasks defined in the appendix of v1.0 of our RSP [5]” (Section 6.2.1 'Autonomous Replication and Adaption (ARA) evaluations', PDF p. 24)

The card names the Responsible Scaling Policy and identifies the edition by its date (September 2023) and as v1.0 (rsp-2023).

### Q04 Link to framework: ● stated

> “September, 2023. https://www.anthropic.com/index/anthropics-responsible-scaling-policy.” (References, [5], PDF p. 39)

The card gives a bibliographic reference with an address. The address is Anthropic's announcement page for the policy, not the policy PDF.

### Q05 Framework determination: ● stated

> “Our results show no indicators of catastrophic risk, and therefore we classify all of our Claude 3 models as ASL-2.” (Section 6.2 'Evaluation Results', PDF p. 24)

The card assigns ASL-2 to all three Claude 3 models. It states that the evaluations were run on a lower-refusal version of Claude 3 Opus.

### Q06 Safeguards tied to determination: ● stated

> “we still take various precautionary measures at ASL-2. We harden security against opportunistic attackers for all copies of Claude 3 model weights.” (Section 6.3 'Security and Deployment Mitigations', PDF p. 26)

> “You can read a more detailed description of our ASL-2 security and deployment measures in our full policy [5].” (Section 6.3 'Security and Deployment Mitigations', PDF p. 26)

The card states security and deployment measures at ASL-2, the level assigned in Q05, including automated detection of CBRN- and cyber-related prompts. This is the developer's account of the measures.

### Q07 Chemical and biological: ● stated

> “In summary, the model did not meet our most conservative biological risk thresholds, and our expert consultants agreed.” (Section 6.2.2 'Biological Evaluations', PDF p. 25)

The card states biological evaluations (automated question sets and a human uplift trial) with the outcome that the early-indicator thresholds were not met. No chemical, radiological or nuclear evaluation is reported for Claude 3. Evaluation details are not recorded (hazard rule).

### Q08 Cyber: ● stated

> “We judged that the model did not pass the ASL-3 threshold on any of the early indicator tests.” (Section 6.2.3 'Cyber Evaluations', PDF p. 25)

The card states cyber evaluations (vulnerability discovery and exploit development) with the outcome that the ASL-3 threshold was not passed. Scores and task details are not recorded (hazard rule).

### Q09 Autonomy and AI R&D: ● stated

> “Across all the rounds, the model was clearly below our ARA ASL-3 risk threshold, having failed at least 3 out of 5 tasks” (Section 6.2.1 'Autonomous Replication and Adaption (ARA) evaluations', PDF p. 24)

The card states autonomous replication and adaptation evaluations with the outcome that the ASL-3 warning threshold was not crossed. Task contents are not recorded (hazard rule).

### Q10 Persuasion: ○ not-found

No report of an evaluation of persuasive or manipulative capability was found in the Claude 3 card (PDF pp. 1–42).

_Searched:_ Sections 5.4, 6 and 7 (PDF pp. 10–31) and term search across PDF pp. 1–42.; terms: “persua”, “manipulat”, “influence”, “sway”, “election”.

- Set aside: Section 7.2 'Elections Integrity', PDF p. 28: Describes testing of responses to election misinformation prompts, which concerns misuse, not the model's persuasive capability.

### Q11 Alignment and deception: ◐ partly

> “These tasks are selected to indicate whether the model can make meaningful progress towards accumulating resources, exploiting software security vulnerabilities, deceiving humans, and surviving autonomously in the absence of human intervention to stop the model.” (Section 6.2.1 'Autonomous Replication and Adaption (ARA) evaluations', PDF p. 24)

> “Our pre-specified warning indicator for ASL-3 was the model passing 50% or more of the tasks (described below) with at least a 10% pass rate (i.e., succeeding at one in ten attempts) – the model did not cross this threshold.” (Section 6.2.1 'Autonomous Replication and Adaption (ARA) evaluations', PDF p. 24)

The ARA evaluations are described as indicating, among other capabilities, whether the model can make progress at deceiving humans, and the card gives one combined conclusion for them: the ASL-3 warning indicator was not crossed. It gives no conclusion on deception separately, and reports no evaluation of the model’s own propensity for deception, scheming or sabotage. The same evaluations are recorded under Q09. Task contents are not recorded (hazard rule).

_Cross-family check (item 4):_ material disagreement, applied: the checker reads partly (blind), because Q11 includes capability for deception and the ARA scope includes deceiving humans, with a combined conclusion. The pack had read not found, setting the passage aside as a Q09 evaluation; the criterion makes no such exclusion. The preparer accepts the checker’s reading.

_Searched:_ Sections 5.4–5.7, 6 and 7 (PDF pp. 10–31) and term search across PDF pp. 1–42.; terms: “decept”, “deceiv”, “scheming”, “sabotage”, “oversight”, “sandbag”, “reward hack”, “honest”.

- Set aside: Section 5.7 'Factual Accuracy', PDF p. 18: An honesty benchmark of factual accuracy, not an evaluation of deception or scheming.

### Q12 Red-teaming: ● stated

> “Examples of tested topics include, but are not limited to: child safety, dangerous weapons and technology, hate speech, violent extremism, fraud, and illegal substances.” (Section 7.1.1 'Multimodal Policy Red-Teaming', PDF p. 27)

> “We conduct vulnerability testing using internal and external human testers to explore over a dozen policy categories” (Section 7 'Trust & Safety and Societal Impact Evaluations', PDF p. 26)

The card states a Trust & Safety multimodal red-team exercise, with example topics and a prompt count (378 prompts, Figure 17), and vulnerability testing by internal and external testers across over a dozen policy categories. Section 6.2 states that the RSP requires risk assessment 'primarily through automated evaluations and red teaming'.

### Q13 External testers: ◐ partly

> “We conduct vulnerability testing using internal and external human testers to explore over a dozen policy categories” (Section 7 'Trust & Safety and Societal Impact Evaluations', PDF p. 26)

The card describes external testers and, for the biological evaluations, 'expert consultants' (Section 6.2.2), without naming any organisation.

_Searched:_ Sections 6–7 and term search across PDF pp. 1–42.; terms: “external”, “third party”, “third-party”, “partner”, “consultant”, “advisor”.

- Set aside: Section 4, PDF p. 4: External experts named for the carbon-footprint analysis, not for testing the model.

### Q14 Government institute: ○ not-found

No government body is named as having tested or received access to Claude 3.

_Searched:_ Sections 1–7 and term search across PDF pp. 1–42.; terms: “government”, “Safety Institute”, “AISI”, “pre-deployment”, “access”.

- Set aside: Section 1, PDF p. 2: A general commitment to share findings with 'industry, government, and civil society', not testing of the model.
- Set aside: Section 6.1, PDF p. 23: Mentions red-teaming guidance in the US Executive Order, which is not a body testing the model.

### Q15 Release decision: ◐ partly

> “Our results show no indicators of catastrophic risk, and therefore we classify all of our Claude 3 models as ASL-2.” (Section 6.2 'Evaluation Results', PDF p. 24)

> “we incrementally roll out access to our products to ensure their safety and reliability” (Section 2.7 'Release Decisions and Maintenance', PDF p. 3)

The card states a capability determination in the company's voice and, under a heading on release decisions, general release practices. No passage describes a decision to release Claude 3 or names who made one.

_Searched:_ Sections 2.7 and 6 and term search across PDF pp. 1–42.; terms: “decide”, “decision”, “release”, “deploy”, “launch”, “chose”, “approve”.

- Set aside: Section 1, PDF p. 1: States availability of the models, which alone is not a release decision (decision 13a).

### Q16 Stated limits: ● stated

> “we are aware that these results do not comprehensively rule out risk.” (Section 6.4 'RSP areas for improvement', PDF p. 26)

> “Opus performed worse, suggesting that we may have under-elicited the model’s capabilities.” (Section 6.2.2 'Biological Evaluations', PDF p. 25)

The card states that its results do not rule out risk, that elicitation could be improved on ARA and CBRN tasks, and that the biological evaluations may have under-elicited capability. Section 6.2 adds that 'evaluations are a hard scientific problem'.

## Anthropic: Claude 3.5 Sonnet (2024)

- Card: Claude 3.5 Sonnet Model Card Addendum (addendum), https://www-cdn.anthropic.com/fed9cc193a14b84131812372d8d5857f8f304c52/Model_Card_Claude_3_Addendum.pdf
- Framework edition in the dataset: none identified. The addendum names the Responsible Scaling Policy without a version, date or reference to the policy. As context only: the dataset records rsp-2023 (v1.0, 2023-09-19) as the edition published before the addendum's index month (June 2024); rsp-v2-0 is effective from 2024-10-15.

### Q01 Card date: ○ not-found

The addendum prints no date. Anthropic's index gives June 2024 (inventory), and the Claude 3 card's update line dates the addendum's addition to that card to June 20, 2024; both are outside this document.

_Searched:_ Whole text (8 PDF pages).; terms: “2024”, “June”, “Update”, “published”, “dated”.

- Set aside: References, PDF pp. 7–8: Dates in references date the cited works, not the addendum.

### Q02 Release date: ○ not-found

No release or availability date or form of release was found in the addendum.

_Searched:_ Whole text.; terms: “release”, “available”, “availability”, “launch”, “API”, “Claude.ai”.

- Set aside: Section 3 'Safety', Introduction, PDF p. 6: 'regular safety testing prior to releasing frontier models' states a practice, not this model's release.

### Q03 Framework cited: ◐ partly

> “it does not trigger the 4x effective compute threshold at which we will run the full evaluation protocol described in our Responsible Scaling Policy (RSP).” (Section 3 'Safety', Introduction, PDF p. 6)

The addendum names the Responsible Scaling Policy without an edition. As context only: the dataset records rsp-2023 (v1.0) as the edition published before June 2024.

### Q04 Link to framework: ◐ partly

> “the full evaluation protocol described in our Responsible Scaling Policy (RSP).” (Section 3 'Safety', Introduction, PDF p. 6)

The addendum refers to the policy as a document that describes an evaluation protocol, without an address or reference. Its reference [23] is the RSP evaluations report for Claude 3 Opus, not the policy.

_Searched:_ Section 3 and the references.; terms: “Responsible Scaling Policy”, “RSP”, “https”.

- Set aside: References, [23], PDF p. 8: 'Responsible Scaling Policy Evaluations Report – Claude 3 Opus' is an evaluation report, not the framework document.

### Q05 Framework determination: ● stated

> “Based on our assessments, we classify Claude 3.5 Sonnet as an AI Safety Level 2 (ASL-2) model, indicating that it does not pose risk of catastrophic harm.” (Section 3 'Safety', Introduction, PDF p. 6)

The addendum assigns ASL-2. It also states that the model did not trigger the compute threshold for the policy's full evaluation protocol, and that evaluations were run regardless.

### Q06 Safeguards tied to determination: ○ not-found

No safeguard or mitigation tied to the ASL-2 classification was found. The addendum states that, had preset thresholds been exceeded, a council would have decided on more evaluation or protections (Q15); that conditional is not a safeguard applied.

_Searched:_ Section 3 'Safety' (PDF p. 6).; terms: “safeguard”, “mitigation”, “protection”, “security”, “ASL-2”.

- Set aside: Section 3, 'Safety Evaluations Overview', PDF p. 6: 'an increase in safety and security protections' is a conditional outcome of a council that was not convened.

### Q07 Chemical and biological: ● stated

> “Claude 3.5 Sonnet did not exceed our safety thresholds in these evaluations and we classify it at ASL-2.” (Section 3, 'Safety Evaluations Results', PDF p. 6)

The addendum states CBRN evaluations (knowledge tests and a measure of uplift to non-experts) and one outcome for all three domains: the thresholds of concern were not exceeded. It does not state a CBRN-specific result. Evaluation details are not recorded (hazard rule).

### Q08 Cyber: ● stated

> “Claude 3.5 Sonnet did not exceed our safety thresholds in these evaluations and we classify it at ASL-2.” (Section 3, 'Safety Evaluations Results', PDF p. 6)

The addendum states capture-the-flag cyber evaluations and the shared outcome that the thresholds of concern were not exceeded. Task details are not recorded (hazard rule).

### Q09 Autonomy and AI R&D: ● stated

> “Claude 3.5 Sonnet did not exceed our safety thresholds in these evaluations and we classify it at ASL-2.” (Section 3, 'Safety Evaluations Results', PDF p. 6)

The addendum states autonomy evaluations (software-engineering tasks) and the shared outcome. It also states that METR explored the model's autonomy-relevant capabilities, without giving METR's result.

### Q10 Persuasion: ○ not-found

No evaluation of persuasive or manipulative capability was found.

_Searched:_ Whole text.; terms: “persua”, “manipulat”, “influence”.

### Q11 Alignment and deception: ○ not-found

No evaluation of deception, scheming, sabotage or undermining oversight was found.

_Searched:_ Whole text.; terms: “decept”, “scheming”, “sabotage”, “oversight”, “honest”.

- Set aside: Section 2, Figure 3, PDF p. 5: 'Honesty' is a human-preference win-rate task, not an evaluation of deception or scheming.

### Q12 Red-teaming: ○ not-found

No adversarial testing described as red-teaming was found.

_Searched:_ Whole text.; terms: “red team”, “red-team”, “adversarial”, “jailbreak”.

- Set aside: Section 2, Figure 3, PDF p. 5: 'adversarial scenarios' are human-preference evaluations of harmlessness, not described as red-teaming.

### Q13 External testers: ● stated

> “Additionally, METR [28] did an initial exploration of the model’s autonomy-relevant capabilities.” (Section 3, 'Safety Evaluations Overview', PDF p. 6)

The addendum names METR as having explored the model's autonomy-relevant capabilities. It gives no result of that exploration.

### Q14 Government institute: ● stated

> “The UK AISI also conducted pre-deployment testing of a near-final model, and shared their results with the US AI Safety Institute” (Section 3, 'Safety Evaluations Overview', PDF p. 6)

The addendum names the UK AI Safety Institute as having tested a near-final model before deployment and states that it shared its results with the US AI Safety Institute. It does not state that the US institute tested the model.

### Q15 Release decision: ◐ partly

> “Based on our assessments, we classify Claude 3.5 Sonnet as an AI Safety Level 2 (ASL-2) model” (Section 3 'Safety', Introduction, PDF p. 6)

> “we planned to convene a council consisting of our Responsible Scaling Officer, evaluations leads, and external subject matter experts” (Section 3, 'Safety Evaluations Overview', PDF p. 6)

The addendum states a capability classification in the company's voice and names a council that would have decided on further evaluation or protections had thresholds been exceeded. No passage describes a decision to release the model or names who made one.

_Searched:_ Section 3.; terms: “decide”, “decision”, “release”, “deploy”, “launch”.

### Q16 Stated limits: ● stated

> “Note that it is possible that the results underestimate the capability of an equivalent Helpful-only model, because alignment training may cause it to hedge concerning answers.” (Section 3, 'Safety Evaluations Overview', PDF p. 6)

The addendum states that safety training can lead capability evaluations to underestimate underlying capability, and that its results may do so. It also states that much remains to be learned about evaluation science and cadence.

## Google DeepMind: Gemini 2.0 Flash (2025)

- Card: Gemini 2.0 Flash Model Card (model card), https://storage.googleapis.com/deepmind-media/Model-Cards/Gemini-2-0-Flash-Model-Card.pdf
- Framework edition in the dataset: `fsf-v2-0`. The PDF's hyperlink on these words (PDF link annotation) points to storage.googleapis.com/deepmind-media/DeepMind.com/Blog/updating-the-frontier-safety-framework/Frontier%20Safety%20Framework%202.0%20(1).pdf, whose cover, retrieved 2026-11-04, reads "4th February 2025" and "Version 2.0" (fsf-v2-0). The dataset source for fsf-v2-0 is a file of the same name without "(1)"; the two files differ in bytes. The printed text names no edition; the edition rests on the link annotation (decision 4a).

### Q01 Card date: ● stated

> “Model card published April 15, 2025” (Header, PDF p. 1)

The card prints its publication date, April 15, 2025. No revision date is printed.

### Q02 Release date: ◐ partly

> “Image outputs are experimental as of the publishing date of this model card.” ('Model Information', 'Outputs', PDF p. 2)

The card states that image output is experimental at the card's publication date, and names the Multimodal Live API among the model's features (PDF p. 5). It gives no release or availability date.

_Searched:_ Whole card (6 pages).; terms: “release”, “available”, “availability”, “launch”, “experimental”, “GA”, “API”.

### Q03 Framework cited: ● stated

> “Frontier Safety Framework evaluations according to Google DeepMind’s Frontier Safety Framework (FSF)” ('Ethics and Safety', 'Evaluation Approach', PDF p. 5 (hyperlinked words))

The card names the Frontier Safety Framework; the text gives no version, but the hyperlink on these words points to a framework PDF whose cover reads "Version 2.0" and "4th February 2025" (fsf-v2-0; see frameworkEditionNote).

### Q04 Link to framework: ● stated

> “Frontier Safety Framework evaluations according to Google DeepMind’s Frontier Safety Framework (FSF)” ('Ethics and Safety', 'Evaluation Approach', PDF p. 5 (hyperlinked words))

The words carry a hyperlink to the Frontier Safety Framework 2.0 PDF. The address is not printed in the text.

### Q05 Framework determination: ○ not-found

The card lists Frontier Safety Framework evaluations among its evaluation types but states no outcome and does not say that a determination was made.

_Searched:_ 'Ethics and Safety' (PDF pp. 5–7) and term search across the card.; terms: “Frontier Safety”, “FSF”, “critical capability”, “CCL”, “threshold”, “alert”.

- Set aside: 'Ethics and Safety', 'Evaluation Approach', PDF p. 5: Names FSF evaluations as an evaluation type, without a result.
- Set aside: 'Ethics and Safety', 'Assurance Evaluations Results', PDF p. 6: Content-policy violation rates, not a framework determination.

### Q06 Safeguards tied to determination: ◐ partly

> “Mitigations include, but are not limited to:” ('Ethics and Safety', 'Risks and Mitigations', PDF p. 7)

> “product-level mitigations such as safety filtering.” ('Ethics and Safety', 'Risks and Mitigations', PDF p. 7)

The card lists mitigations (dataset filtering, conditional pre-training, fine-tuning, reinforcement learning from feedback, safety policies, product-level filtering) without tying any of them to a framework determination. This is the developer's account of the mitigations.

_Searched:_ 'Ethics and Safety'.; terms: “mitigation”, “safeguard”, “Frontier Safety”, “security”.

### Q07 Chemical and biological: ○ not-found

No chemical or biological evaluation is reported.

_Searched:_ Whole card.; terms: “CBRN”, “chemical”, “biolog”, “weapon”, “dangerous capabilit”.

- Set aside: 'Ethics and Safety', 'Evaluation Approach', PDF p. 5: FSF evaluations are listed without any domain or outcome.

### Q08 Cyber: ○ not-found

No cyber-offence evaluation is reported.

_Searched:_ Whole card.; terms: “cyber”, “exploit”, “vulnerab”, “CTF”, “security”.

- Set aside: 'Ethics and Safety', 'Evaluation Approach', PDF p. 5: 'security and safety-focused evaluations' in automated red teaming are not described as cyber-offence capability evaluations.

### Q09 Autonomy and AI R&D: ○ not-found

No evaluation of autonomy, self-replication, self-improvement or AI research and development is reported.

_Searched:_ Whole card.; terms: “autonom”, “self-”, “replicat”, “R&D”, “machine learning research”, “agentic”.

- Set aside: 'Model Information', PDF p. 2: 'agentic systems' describes the model family's purpose, not an evaluation.

### Q10 Persuasion: ○ not-found

No evaluation of persuasion or manipulation is reported.

_Searched:_ Whole card.; terms: “persua”, “manipulat”, “influence”, “deceiv”.

### Q11 Alignment and deception: ○ not-found

No evaluation of deception, scheming, sabotage or undermining oversight is reported.

_Searched:_ Whole card.; terms: “decept”, “scheming”, “sabotage”, “oversight”, “misalign”, “instrumental”.

### Q12 Red-teaming: ● stated

> “Human red teaming conducted by specialist teams across the policies and desiderata;” ('Ethics and Safety', 'Evaluation Approach', PDF p. 5)

> “Automated red teaming to dynamically evaluate Gemini at scale, complementing human efforts and static evaluations for both security and safety-focused evaluations;” ('Ethics and Safety', 'Evaluation Approach', PDF p. 5)

The card states human red teaming by specialist teams across policies and desiderata, and automated red teaming for security and safety. It gives no number of testers or period, and reports no red-teaming results.

### Q13 External testers: ○ not-found

No external organisation is named, and no testers are described as external.

_Searched:_ Whole card.; terms: “external”, “third party”, “third-party”, “partner”, “outside”.

- Set aside: 'Ethics and Safety', 'Evaluation Approach', PDF p. 5: Assurance evaluations are 'conducted by evaluators who sit outside of the model development team', who are not described as outside Google DeepMind.

### Q14 Government institute: ○ not-found

No government body is named as having tested or received access to the model.

_Searched:_ Whole card.; terms: “government”, “Safety Institute”, “AISI”, “CAISI”, “pre-deployment”.

### Q15 Release decision: ● stated

> “The RSC also reviewed data on the model’s performance via assurance evaluations and made release decisions.” ('Ethics and Safety', 'Evaluation Approach', PDF pp. 5–6)

The card states that Google DeepMind's Responsibility and Safety Council, which it calls Google DeepMind's governance body, reviewed assurance-evaluation data and made release decisions. The passage uses the plural and does not describe the decision for this model specifically.

### Q16 Stated limits: ● stated

> “The evaluation results are for automated evaluations and not human evaluation or red-teaming” ('Ethics and Safety', 'Training and Development Evaluation Results', PDF p. 6)

The card states that the results in its training and development evaluation table are automated evaluations, not human evaluation or red-teaming, given relative to Gemini 1.5 Pro 002. The limit is stated for that table; it does not describe the card’s other safety findings or its stated human red-teaming.

_Cross-family check (item 48):_ minor, applied: the note now limits the automated-only statement to the training and development results table.

## Google DeepMind: Gemini 2.0 Flash-Lite (2025)

- Card: Gemini 2.0 Flash-Lite Model Card (model card), https://storage.googleapis.com/deepmind-media/Model-Cards/Gemini-2-0-Flash-Lite-Model-Card.pdf
- Framework edition in the dataset: `fsf-v2-0`. The PDF's hyperlink on these words (PDF link annotation) points to storage.googleapis.com/deepmind-media/DeepMind.com/Blog/updating-the-frontier-safety-framework/Frontier%20Safety%20Framework%202.0%20(1).pdf, whose cover, retrieved 2026-11-04, reads "4th February 2025" and "Version 2.0" (fsf-v2-0). The dataset source for fsf-v2-0 is a file of the same name without "(1)"; the two files differ in bytes. The printed text names no edition; the edition rests on the link annotation (decision 4a).

### Q01 Card date: ● stated

> “Model card published April 10, 2025” (Header, PDF p. 1)

The card prints its publication date, April 10, 2025. No revision date is printed.

### Q02 Release date: ○ not-found

No release or availability date and no release form was found in the card.

_Searched:_ Whole card (6 pages).; terms: “release”, “available”, “availability”, “launch”, “preview”, “GA”, “API”.

- Set aside: 'Evaluation', results table, PDF p. 3: Column labels '(Public Preview)' and '(GA)' appear in the table header, but the text layer does not show which model each label belongs to.
- Set aside: 'Intended Usage and Limitations', PDF p. 5: 'More information is available on AI Studio Gemini API documentation and Vertex AI documentation' refers to documentation, not to the model's release.

### Q03 Framework cited: ● stated

> “Frontier Safety Framework evaluations according to Google DeepMind’s Frontier Safety Framework (FSF)” ('Ethics and Safety', 'Evaluation Approach', PDF p. 5 (hyperlinked words))

The card names the Frontier Safety Framework; the text gives no version, but the hyperlink on these words points to a framework PDF whose cover reads "Version 2.0" and "4th February 2025" (fsf-v2-0; see frameworkEditionNote).

### Q04 Link to framework: ● stated

> “Frontier Safety Framework evaluations according to Google DeepMind’s Frontier Safety Framework (FSF)” ('Ethics and Safety', 'Evaluation Approach', PDF p. 5 (hyperlinked words))

The words carry a hyperlink to the Frontier Safety Framework 2.0 PDF. The address is not printed in the text.

### Q05 Framework determination: ○ not-found

The card lists Frontier Safety Framework evaluations among its evaluation types but states no outcome and does not say that a determination was made.

_Searched:_ 'Ethics and Safety' (PDF pp. 5–7) and term search across the card.; terms: “Frontier Safety”, “FSF”, “critical capability”, “CCL”, “threshold”, “alert”.

- Set aside: 'Ethics and Safety', 'Evaluation Approach', PDF p. 5: Names FSF evaluations as an evaluation type, without a result.
- Set aside: 'Ethics and Safety', 'Assurance Evaluations Results', PDF p. 6: Content-policy violation rates, not a framework determination.

### Q06 Safeguards tied to determination: ◐ partly

> “Mitigations include, but are not limited to:” ('Ethics and Safety', 'Risks and Mitigations', PDF p. 7)

> “product-level mitigations such as safety filtering.” ('Ethics and Safety', 'Risks and Mitigations', PDF p. 7)

The card lists mitigations (dataset filtering, conditional pre-training, fine-tuning, reinforcement learning from feedback, safety policies, product-level filtering) without tying any of them to a framework determination. This is the developer's account of the mitigations.

_Searched:_ 'Ethics and Safety'.; terms: “mitigation”, “safeguard”, “Frontier Safety”, “security”.

### Q07 Chemical and biological: ○ not-found

No chemical or biological evaluation is reported.

_Searched:_ Whole card.; terms: “CBRN”, “chemical”, “biolog”, “weapon”, “dangerous capabilit”.

- Set aside: 'Ethics and Safety', 'Evaluation Approach', PDF p. 5: FSF evaluations are listed without any domain or outcome.

### Q08 Cyber: ○ not-found

No cyber-offence evaluation is reported.

_Searched:_ Whole card.; terms: “cyber”, “exploit”, “vulnerab”, “CTF”, “security”.

- Set aside: 'Ethics and Safety', 'Evaluation Approach', PDF p. 5: 'security and safety-focused evaluations' in automated red teaming are not described as cyber-offence capability evaluations.

### Q09 Autonomy and AI R&D: ○ not-found

No evaluation of autonomy, self-replication, self-improvement or AI research and development is reported.

_Searched:_ Whole card.; terms: “autonom”, “self-”, “replicat”, “R&D”, “machine learning research”, “agentic”.

- Set aside: 'Model Information', PDF p. 2: 'agentic systems' describes the model family's purpose, not an evaluation.

### Q10 Persuasion: ○ not-found

No evaluation of persuasion or manipulation is reported.

_Searched:_ Whole card.; terms: “persua”, “manipulat”, “influence”, “deceiv”.

### Q11 Alignment and deception: ○ not-found

No evaluation of deception, scheming, sabotage or undermining oversight is reported.

_Searched:_ Whole card.; terms: “decept”, “scheming”, “sabotage”, “oversight”, “misalign”, “instrumental”.

### Q12 Red-teaming: ● stated

> “Human red teaming conducted by specialist teams across the policies and desiderata;” ('Ethics and Safety', 'Evaluation Approach', PDF p. 5)

> “Automated red teaming to dynamically evaluate Gemini at scale, complementing human efforts and static evaluations for both security and safety-focused evaluations;” ('Ethics and Safety', 'Evaluation Approach', PDF p. 5)

The card states human red teaming by specialist teams across policies and desiderata, and automated red teaming for security and safety. It gives no number of testers or period, and reports no red-teaming results.

### Q13 External testers: ○ not-found

No external organisation is named, and no testers are described as external.

_Searched:_ Whole card.; terms: “external”, “third party”, “third-party”, “partner”, “outside”.

- Set aside: 'Ethics and Safety', 'Evaluation Approach', PDF p. 5: Assurance evaluations are 'conducted by evaluators who sit outside of the model development team', who are not described as outside Google DeepMind.

### Q14 Government institute: ○ not-found

No government body is named as having tested or received access to the model.

_Searched:_ Whole card.; terms: “government”, “Safety Institute”, “AISI”, “CAISI”, “pre-deployment”.

### Q15 Release decision: ● stated

> “RSC also reviewed data on the model’s performance via assurance evaluations and made release decisions.” ('Ethics and Safety', 'Evaluation Approach', PDF pp. 5–6)

The card states that Google DeepMind's Responsibility and Safety Council, which it calls Google DeepMind's governance body, reviewed assurance-evaluation data and made release decisions. The passage uses the plural and does not describe the decision for this model specifically.

### Q16 Stated limits: ● stated

> “The evaluation results are for automated evaluations and not human evaluation or red-teaming” ('Ethics and Safety', 'Training and Development Evaluation Results', PDF p. 6)

The card states that the reported safety results are automated evaluations only, given relative to Gemini 1.5 Pro 002.

## Meta: Code World Model (CWM) (2025)

- Card: Model Card for Code World Model (MODEL_CARD.md) (model card), https://raw.githubusercontent.com/facebookresearch/cwm/7930e0298bf32aae28cc0e35e18a54c772603364/MODEL_CARD.md
- Framework edition in the dataset: none identified. The card names Meta's Frontier AI Framework and links it at the undated address ai.meta.com/static-resource/meta-frontier-ai-framework, without a version. As context only: the dataset records meta-faf-v1-1 (2025-02-03) as the edition published before the card's earliest located date (2025-09-24).

### Q01 Card date: ○ not-found

The card prints no date. The commit adding it ('CWM release', 2025-09-24) is repository metadata and stays in the background record (decision 8a).

_Searched:_ Whole card (repository MODEL_CARD.md at the pinned commit).; terms: “2025”, “date”, “release”, “published”, “updated”.

### Q02 Release date: ◐ partly

> “We explicitly release CWM as a research model under a noncommercial research license” ('Risks and Limitations')

The card gives the release form (a research model under a noncommercial licence, with post-trained, SFT and pre-trained weights on Hugging Face) and no release date.

### Q03 Framework cited: ◐ partly

> “in line with Meta’s [Frontier AI Framework](https://ai.meta.com/static-resource/meta-frontier-ai-framework).” ('Risks and Limitations')

The card names the Frontier AI Framework and links an undated address, without an edition. As context only: the dataset records meta-faf-v1-1 (2025-02-03) as the edition published before the card's date.

### Q04 Link to framework: ● stated

> “in line with Meta’s [Frontier AI Framework](https://ai.meta.com/static-resource/meta-frontier-ai-framework).” ('Risks and Limitations')

The card links the framework document at its address.

### Q05 Framework determination: ◐ partly

> “Our evaluation concludes that CWM does not significantly increase the risk of enabling threat scenarios compared to existing open source models in the ecosystem.” ('Risks and Limitations')

The card states the conclusion of an assessment made in line with the framework, comparing the model with existing open-source models. It does not state the outcome in the framework's own categories; it refers to the CWM Preparedness Report (a first-pack row) for the results.

### Q06 Safeguards tied to determination: ◐ partly

> “We make available [system level protections](https://www.llama.com/llama-protections/) – like Llama Guard, Prompt Guard and Code Shield” ('Risks and Limitations')

The card names system-level protections that it makes available to users, and states that they alone are unlikely to suffice for production use. It does not tie them to the framework assessment. This is the developer's account.

_Searched:_ 'Risks and Limitations'.; terms: “safeguard”, “mitigation”, “protection”, “Frontier AI Framework”.

### Q07 Chemical and biological: ○ not-found

The card reports no chemical or biological evaluation; it refers to the CWM Preparedness Report for the assessment's results.

_Searched:_ Whole card.; terms: “chemical”, “biolog”, “CBRN”, “weapon”, “catastrophic”.

- Set aside: 'Risks and Limitations': 'an assessment of CWM’s capabilities across a range of potential threats' names no domain and gives no domain result.

### Q08 Cyber: ○ not-found

The card reports no cyber-offence evaluation; it refers to the CWM Preparedness Report.

_Searched:_ Whole card.; terms: “cyber”, “exploit”, “vulnerab”, “security”.

- Set aside: 'Evaluation': SWE-bench and coding benchmarks are product benchmarks.

### Q09 Autonomy and AI R&D: ○ not-found

No evaluation of autonomy, self-replication, self-improvement or AI research and development was found.

_Searched:_ Whole card.; terms: “autonom”, “self-”, “replicat”, “R&D”, “agentic”.

- Set aside: 'Evaluation': SWE-bench Verified is reported as product capability; agentic task benchmarks of this kind do not meet the criterion.

### Q10 Persuasion: ○ not-found

No evaluation of persuasion or manipulation was found.

_Searched:_ Whole card.; terms: “persua”, “manipulat”, “influence”.

### Q11 Alignment and deception: ○ not-found

No evaluation of deception, scheming, sabotage or undermining oversight was found.

_Searched:_ Whole card.; terms: “decept”, “honest”, “scheming”, “sabotage”, “propensit”, “oversight”.

### Q12 Red-teaming: ○ not-found

No testing described as red-teaming was found.

_Searched:_ Whole card.; terms: “red team”, “red-team”, “adversarial”.

### Q13 External testers: ○ not-found

No external tester is named or described.

_Searched:_ Whole card.; terms: “external”, “third party”, “third-party”, “partner”.

### Q14 Government institute: ○ not-found

No government body is named.

_Searched:_ Whole card.; terms: “government”, “Safety Institute”, “AISI”, “CAISI”.

### Q15 Release decision: ◐ partly

> “To ensure responsible release, we have conducted an assessment of CWM’s capabilities across a range of potential threats” ('Risks and Limitations')

The card states the release and an assessment conducted for it, in the first person plural. It does not describe a decision to release or name who made one.

_Searched:_ 'Risks and Limitations'.; terms: “decide”, “decision”, “release”, “approve”.

### Q16 Stated limits: ● stated

> “Although we have performed some limited evaluations, we have not conducted a full range of possible evaluations for these models.” ('Risks and Limitations')

The card states that its evaluations are limited, that performance in production and real-world use has not been evaluated, and that the model has not been fully evaluated for content risks.

## Meta: Muse Spark (2026)

- Card: Muse Spark Safety & Preparedness Report (arXiv 2606.12429v1) (safety report), https://arxiv.org/pdf/2606.12429v1
- Framework edition in the dataset: `meta-aasf-v2-0`. The report names Meta's Advanced AI Scaling Framework; footnote 2 (PDF p. 6) gives the address ai.meta.com/static-resource/Meta_Advanced-AI-Scaling-Framework-v2, whose file name names version 2. The dataset records meta-aasf-v2-0 (Advanced AI Scaling Framework Version 2, 2026-04-08). The copy read is arXiv 2606.12429v1; Meta's own address for the report answered HTTP 400 here; the cross-family check of 2026-11-04 retrieved Meta's copies (an earlier 158-page expression in a capture of 2026-04-14, and the live copy printing May 26, 2026), which differ from the arXiv copy in bytes and text (see Q01).

### Q01 Card date: ● stated

> “Date: June 12, 2026” (Abstract page, PDF p. 2)

The report prints the date June 12, 2026, without a kind. arXiv's margin stamp on PDF p. 1 reads '14 May 2026', which does not agree with the printed date or with the identifier 2606.12429; both are recorded as read, and neither is the card's own statement of publication. Meta’s own copies were retrieved in the cross-family check of 2026-11-04 (not here: ai.meta.com answered HTTP 400 and web.archive.org refused connections): an Internet Archive capture of 2026-04-14 holds an earlier 158-page expression that prints April 14, 2026, and the live copy prints May 26, 2026. Under 3a the row is dated by that earliest located copy, 2026-04-14; the arXiv copy read here is a later expression. The arXiv stamp of 14 May is the submission date, corroborated by the repository history.

### Q02 Release date: ◐ partly

> “We therefore release Muse Spark as the underlying model of Meta AI.” (Abstract, PDF p. 2)

> “early checkpoints of Muse Spark were initially deployed to a small, percentage-limited subset of product users prior to broad availability.” (Section 1.2 'Governance', PDF p. 14)

The report gives the release form (the model underlying Meta AI) and a sequence of controlled deployments before broad availability. It gives no release or availability date.

_Searched:_ Abstract, Sections 1–1.3 and term search across the report.; terms: “release”, “launch”, “available”, “availability”, “April”, “2026”.

### Q03 Framework cited: ● stated

> “https://ai.meta.com/static-resource/Meta_Advanced-AI-Scaling-Framework-v2” (Section 1 'Introduction', footnote 2, PDF p. 6)

> “Muse Spark was developed and evaluated under Meta’s Advanced AI Scaling Framework” (Section 1.2 'Governance', PDF p. 14)

The report names the Advanced AI Scaling Framework and gives an address whose file name names version 2 (meta-aasf-v2-0). The text gives no version number of its own.

### Q04 Link to framework: ● stated

> “https://ai.meta.com/static-resource/Meta_Advanced-AI-Scaling-Framework-v2” (Section 1 'Introduction', footnote 2, PDF p. 6)

The report gives the framework's address in a footnote.

### Q05 Framework determination: ● stated

> “we determined the model, prior to applying mitigations, falls under the “high risk” threshold under the Advanced AI Scaling Framework” (Section 1.2 'Governance', PDF p. 14)

> “However, after applying mitigations, the residual risk of the model is that of “moderate or lower risk.”” (Section 1.2 'Governance', PDF p. 14)

The report states a 'high risk' determination before mitigations, for the chemical and biological category, and a residual 'moderate or lower risk' after mitigations. It states 'moderate or lower' for cybersecurity and loss of control (Q08, Q09).

### Q06 Safeguards tied to determination: ● stated

> “In response to the “high risk” determination, we have defined, implemented, and validated a set of mitigations to reduce the residual risk of public deployment to “moderate or lower.”” (Section 1.1.1, 'Chemical & Biological risks', PDF p. 9)

The report ties mitigations (refusal mechanisms, detection of persistent malicious use and monitoring) to the 'high risk' determination, and states that deployment is conditional on them under the framework. It also states cyber-misuse monitoring as a compensating control. This is the developer's account, not evidence that the mitigations work.

### Q07 Chemical and biological: ● stated

> “assess that the model has “high risk” for Chemical and/or Biological risks.” (Section 1.1.1, 'Chemical & Biological risks', PDF p. 9)

The report states chemical and biological evaluations (dual-use knowledge, agentic scientific tasks and high-risk bottlenecks) with the outcome 'high risk' before mitigations and 'moderate or lower' residual risk after them. Evaluation details are not recorded (hazard rule).

### Q08 Cyber: ● stated

> “We assess cybersecurity risk as “moderate or lower” with respect to the threat scenarios outlined in Meta’s Advanced AI Scaling Framework.” (Section 1.1.1, 'Cybersecurity risks', PDF p. 9)

The report states knowledge, capture-the-flag, real-world and social-engineering cyber evaluations with the framework outcome 'moderate or lower'. Scores are not recorded (hazard rule).

### Q09 Autonomy and AI R&D: ● stated

> “We assess loss of control risk as “moderate or lower”.” (Section 1.1.1, 'Loss of Control risks', PDF p. 9)

> “Its autonomous technical capabilities—spanning software engineering, ML engineering, and end-to-end research—remain too constrained” (Section 1.1.1, 'Loss of Control risks', PDF p. 10)

The report states loss-of-control evaluations, including acceleration of AI development, with the outcome 'moderate or lower' and the conclusion that autonomous research capabilities remain constrained.

### Q10 Persuasion: ● stated

> “we have included results from an evaluation developed by Charlemagne Labs that specifically measures social engineering capabilities in multi-turn settings.” (Section 2.2.2.3 'Social Engineering Capabilities', PDF p. 47)

> “we do not find the capabilities of the model (without system level guardrails) to be sufficiently high to trigger a determination of high risk according to our Advanced AI Scaling Framework” (Section 2.2.2.3 'Social Engineering Capabilities', PDF p. 48)

The report states a multi-turn social-engineering capability evaluation (an attacker model trying to convince a simulated victim), with composite scores against open models (Figure 20), as part of the cyber domain, and concludes that the capability is not high enough to trigger a high-risk determination under its framework. The victims are simulated: no result with human subjects is reported. Methods are not recorded (hazard rule).

_Cross-family check (item 28):_ material disagreement, applied: the checker reads stated (blind), because section 2.2.2.3 gives a conclusion for the social-engineering evaluation (PDF p. 48), and Q10 asks for a conclusion, not a risk category specific to persuasion. The pack had read partly. The preparer accepts the checker’s reading, keeping the simulated-victim and cyber-domain limits.

### Q11 Alignment and deception: ● stated

> “The model demonstrates contained deception and exhibits some propensities toward agentic misalignment in controlled settings, such as self-preservation and resistance to discontinuation.” (Section 1.1.1, 'Loss of Control risks', PDF p. 10)

> “These behaviors remain within acceptable thresholds but warrant monitoring for loss of control risks.” (Section 1.1.1, 'Loss of Control risks', PDF p. 10)

The report states evaluations of deception, agentic misalignment, sandbagging, monitor evasion and alignment faking, with the conclusion quoted. It reports Apollo Research's finding of high evaluation awareness and its own follow-up (Section 4.1.11).

### Q12 Red-teaming: ● stated

> “A third-party human red team from HandshakeAI32 was granted pre-release access to a few versions of Muse Spark and Meta AI Thinking to manually evaluate robustness against jailbreak attacks.” (Section 3.1.3.2 'Human Red Teaming', PDF p. 82)

> “HandshakeAI prioritized four categories: (1) sex-related crimes, (2) violent crimes, (3) non-violent crimes, and (4) self-harm and suicide.” (Section 3.1.3.2 'Human Red Teaming', PDF p. 82)

> “HandshakeAI reported approximately 149 hours of red-teaming effort” (Section 3.1.3.2 'Human Red Teaming', PDF p. 82)

The report states third-party human red teaming of jailbreak robustness with pre-release access, with its scope: four prioritised content-policy categories and approximately 149 hours of effort (hours of effort, not a testing period). It also reports large-scale automated red teaming (Section 3.1). No number of testers is given in the passage read. The “32” after HandshakeAI in the first quotation is a footnote marker.

_Cross-family check (item 58):_ minor, applied: the scope given in the same paragraph (four prioritised categories, about 149 hours of effort) is added.

### Q13 External testers: ● stated

> “Independent third-party testing by Apollo Research found Muse Spark has the highest rate of evaluation awareness they have observed to date.” (Abstract, PDF p. 2)

The report names Apollo Research (evaluation awareness), HandshakeAI (human red teaming, Q12) and Charlemagne Labs (social engineering, Q10), and names Deloitte, Faculty, Frontier Design and SecureBio as engaged in the chemical and biological assessment (Section 2.1).

### Q14 Government institute: ○ not-found

No government body is named as having tested or received access to Muse Spark.

_Searched:_ Abstract, Sections 1–2.2 and term search across the report.; terms: “government”, “Safety Institute”, “AISI”, “CAISI”, “Security Institute”, “pre-deployment access”.

- Set aside: Section 2.2.2.1, PDF p. 41: Names UK AISI and CAISI as users of a benchmark in their own testing, not as testing this model.

### Q15 Release decision: ● stated

> “We then describe the governance process that led to the decision to deploy Muse Spark under Meta’s Advanced AI Scaling Framework2” (Section 1 'Introduction', PDF p. 6)

> “Key decision-makers for Muse Spark’s risk threshold determinations were the Chief AI Officer and Director of Alignment and Risk” (Section 1.2 'Governance', PDF p. 14)

The report refers to 'the decision to deploy' and 'our launch decision' in the company's voice, and names the Chief AI Officer and the Director of Alignment and Risk as the decision-makers for the risk-threshold determinations. It does not name a maker of the deployment decision other than the company.

### Q16 Stated limits: ● stated

> “We cannot rule out this possibility on the basis of behavioral evaluations alone and flag it as an inherent epistemic limitation of assessments of this kind.” (Section 1.1.1, footnote 11, PDF p. 10)

The report states that a model capable of strategic behaviour could make its evaluations appear credible, and that this cannot be ruled out by behavioural evaluations. It also states that some baseline assessments give only a lower bound on performance and that evaluation awareness qualifies some results.

## OpenAI: GPT-4o (2024)

- Card: GPT-4o System Card (system card), https://cdn.openai.com/gpt-4o-system-card.pdf
- Framework edition in the dataset: `preparedness-beta-2023`. The card's reference [4] names the beta Preparedness Framework of 2023 and its file name 'openai-preparedness-framework-beta.pdf' on cdn.openai.com (the text layer interleaves the address with the title). The dataset records preparedness-beta-2023 as published on 2023-12-18.

### Q01 Card date: ● stated

> “GPT-4o System Card OpenAI∗ August 8, 2024” (Title page, PDF p. 1)

The card prints the date August 8, 2024 under its title. No revision date is printed.

### Q02 Release date: ◐ partly

> “Following the text output only deployment of GPT-4o, we worked with independent third party labs, METR and Apollo Research” (Section 4 'Third party assessments', PDF p. 18)

> “At the time of writing, external red teaming of the GPT-4o API is ongoing.” (Section 3.1 'External red teaming', PDF p. 3)

The card refers to a text-output-only deployment, to the API and to advanced voice mode in the iOS app used in red teaming (Phase 4), as relative timing and forms. It gives no release or availability date.

_Searched:_ Sections 1–3.1 and 4 and term search across the card.; terms: “release”, “available”, “availability”, “launch”, “deploy”, “May 13”, “2024”.

### Q03 Framework cited: ● stated

> “We evaluated GPT-4o in accordance with our Preparedness Framework[4].” (Section 3.4 'Preparedness Framework Evaluations', PDF p. 12)

> “OpenAI, “Openai preparedness framework beta,” 2023.” (References, [4], PDF p. 29)

The card names the Preparedness Framework and identifies the edition in reference [4] as the beta of 2023 (preparedness-beta-2023).

_Cross-family check (item 31):_ minor, applied: the reference quotation is repaired. The default PDF text layer interleaves the address with the title; the printed reference reads as now quoted (checked by the checker visually, and here against pdftotext’s raw reading order). Identification as the 2023 beta is unchanged.

### Q04 Link to framework: ● stated

> “Openai preparedness framework openai-preparedness-framework-beta.pdf. beta,” 2023. https://cdn.openai.com/” (References, [4], PDF p. 29)

The card gives a bibliographic reference to the framework with an address on cdn.openai.com and the file name of the beta framework. In the text layer the address and the file name are separated by the title.

### Q05 Framework determination: ● stated

> “the Safety Advisory Group recommended classifying GPT-4o before mitigations as borderline medium risk for persuasion, and low risk in all others.” (Section 3.4 'Preparedness Framework Evaluations', PDF p. 13)

> “Therefore, the overall risk score for GPT-4o is classified as medium.” (Section 3.4 'Preparedness Framework Evaluations', PDF p. 13)

The card states a pre-mitigation classification in the framework's categories (persuasion borderline medium; cybersecurity, CBRN and model autonomy low) and an overall medium score, on the Safety Advisory Group's recommendation.

### Q06 Safeguards tied to determination: ◐ partly

> “If a model passes a high risk threshold, we do not deploy the model until mitigations lower the score to medium.” (Section 3.4 'Preparedness Framework Evaluations', PDF p. 12)

> “integrated classifiers for blocking specific generations as a part of the deployed system” (Section 3.3 'Observed safety challenges, evaluations and mitigations', PDF p. 5)

The card states the framework's deployment condition and, for the voice risks in Section 3.3, mitigations such as post-training and output classifiers. It does not tie any mitigation to the medium classification in Q05. This is the developer's account of the mitigations.

_Searched:_ Sections 3.3–3.8 and 6 and term search across the card.; terms: “mitigation”, “post-mitigation”, “safeguard”, “medium”, “high risk”.

### Q07 Chemical and biological: ● stated

> “Biological Threats Score: Low GPT-4o does not advance biological threat creation capabilities sufficient to meet our medium risk threshold.” (Section 3.6 'Biological threats', Preparedness Scorecard, PDF p. 14)

The card states biological threat evaluations with a low score under the framework. The framework category is CBRN; no separate chemical, radiological or nuclear result is reported. Evaluation details are not recorded (hazard rule).

### Q08 Cyber: ● stated

> “GPT-4o does not advance real world vulnerability exploitation capabilities sufficient to meet our medium risk threshold.” (Section 3.5 'Cybersecurity', Preparedness Scorecard, PDF p. 13)

The card states capture-the-flag evaluations with a low cybersecurity score. Task-level results are not recorded (hazard rule).

### Q09 Autonomy and AI R&D: ● stated

> “GPT-4o does not advance self-exfiltration, self-improvement, or resource acquisition capabilities sufficient to meet our medium risk threshold.” (Section 3.8 'Model autonomy', Preparedness Scorecard, PDF p. 17)

The card states model-autonomy evaluations with a low score. Section 4.1 adds METR's assessment of autonomous capabilities, which the card reports as finding no significant increase over GPT-4.

### Q10 Persuasion: ● stated

> “Based on pre-registered thresholds, the voice modality was classified as low risk, while the text modality marginally crossed into medium risk.” (Section 3.7 'Persuasion', PDF p. 16)

The card states persuasion evaluations of text and voice, with a medium score for text and low for voice.

### Q11 Alignment and deception: ● stated

> “Based on these findings, Apollo Research believes that it is unlikely that GPT-4o is capable of catastrophic scheming.” (Section 4.2 'Apollo Research assessment', PDF p. 19)

The card reports Apollo Research's evaluation of capabilities related to scheming (self-knowledge, theory of mind, self-reasoning, alignment faking), with Apollo's conclusion. It concerns capability, not propensity.

### Q12 Red-teaming: ● stated

> “OpenAI worked with more than 100 external red teamers2 , speaking a total of 45 different languages, and representing geographic backgrounds of 29 different countries.” (Section 3.1 'External red teaming', PDF p. 3)

> “starting in early March and continuing through late June 2024.” (Section 3.1 'External red teaming', PDF p. 3)

The card states external red teaming in four phases, with the number of testers, languages and countries, the period, and the categories covered (disallowed content, mis/disinformation, bias and others).

### Q13 External testers: ● stated

> “we worked with independent third party labs, METR and Apollo Research to add an additional layer of validation for key risks from general autonomous capabilities.” (Section 4 'Third party assessments', PDF p. 18)

The card names METR and Apollo Research as having assessed the model after its text-output deployment. Section 3.6 names Gryphon Scientific as having helped design the biological questions and rubrics, not as having tested the model.

### Q14 Government institute: ○ not-found

No government body is named as having tested or received access to GPT-4o.

_Searched:_ Sections 3–6 and term search across the card.; terms: “government”, “Safety Institute”, “AISI”, “national security”, “pre-deployment access”.

- Set aside: Section 4.2, Table 6, PDF p. 19: 'UK AISI’s Theory of Mind' names a task used by Apollo Research, not testing of the model by the institute.
- Set aside: Section 1, PDF p. 1: Refers to voluntary commitments to the White House, not testing.

### Q15 Release decision: ◐ partly

> “the Safety Advisory Group recommended classifying GPT-4o before mitigations as borderline medium risk for persuasion, and low risk in all others.” (Section 3.4 'Preparedness Framework Evaluations', PDF p. 13)

> “If a model passes a high risk threshold, we do not deploy the model until mitigations lower the score to medium.” (Section 3.4 'Preparedness Framework Evaluations', PDF p. 12)

The card names the Safety Advisory Group for the risk classification and states the framework's deployment condition. It refers to the model's deployment but does not describe a decision to release it or name who made one.

_Searched:_ Sections 2–4 and 6 and term search across the card.; terms: “decide”, “decision”, “deploy”, “launch”, “release”, “approve”, “leadership”.

- Set aside: Section 3, PDF p. 2: 'Deployment preparation was carried out via …' describes preparation, which alone is not a release decision (decision 13a).

### Q16 Stated limits: ● stated

> “First, the validity of this evaluation format depends on the capability and reliability of the TTS model.” (Section 3.2 'Evaluation methodology', 'Limitations of the evaluation methodology', PDF p. 4)

The card states limits of its audio evaluation method, which converts text evaluations to speech: some inputs are unsuitable for conversion and the conversion may be lossy.

## xAI: Grok 4 (2025)

- Card: Grok 4 Model Card (model card), https://data.x.ai/2025-08-20-grok-4-model-card.pdf
- Framework edition in the dataset: none identified. The card names xAI's Risk Management Framework (RMF) without a version, date, reference or link (the PDF's link annotations point to references and a system-prompt repository). The RMF is not among the dataset's framework editions (decision 5a: to be added in a separate data task). As context only: the first pack records an RMF served at data.x.ai printing 'Last updated: August 20, 2025', the date the card also prints.

### Q01 Card date: ◐ partly

> “Grok 4 Model Card xAI Last updated: August 20, 2025” (Cover, PDF p. 1)

The card prints only a last-updated date (August 20, 2025), not a publication date. The file name carries the same date.

_Searched:_ Cover and term search across the card.; terms: “2025”, “published”, “updated”, “July”.

### Q02 Release date: ◐ partly

> “xAI deploys Grok 4 in both the consumer-facing applications (Grok 4 Web) and through an enterprise use-focused API (Grok 4 API).” (Section 1 'Introduction', PDF p. 1)

> “We report evaluations for Grok 4 API and Grok 4 Web now available to our customers, including in the EU.” (Section 1 'Introduction', PDF p. 1)

The card gives the forms of availability (consumer applications and an API, including in the EU), in the present tense, with no release date.

_Searched:_ Sections 1 and 3 and term search across the card.; terms: “release”, “launch”, “available”, “July”, “deploy”.

### Q03 Framework cited: ◐ partly

> “Following our Risk Management Framework (RMF), we aim to reduce the risk of severe, large-scale harms to people, property, and society from AI.” (Section 1 'Introduction', PDF p. 1)

The card names xAI's Risk Management Framework without an edition. The RMF is not among the dataset's framework editions (5a); see frameworkEditionNote.

### Q04 Link to framework: ◐ partly

> “we filter for detailed information or substantial assistance regarding the critical steps identified in Section 2 of our RMF.” (Section 2.3.3 'Mitigations', PDF p. 6)

The card refers to a section of the framework as a document, without an address or bibliographic reference. The reference list does not include the RMF.

_Searched:_ Whole card, references and link annotations.; terms: “RMF”, “Risk Management Framework”, “https”, “xAI.”.

### Q05 Framework determination: ○ not-found

No outcome in the framework's own categories (a threshold reached, not reached or not ruled out) was found. The card organises its evaluations by the RMF's two risk categories and states an overall conclusion outside threshold language.

_Searched:_ Sections 1–2 and term search across the card.; terms: “threshold”, “RMF”, “risk level”, “critical”, “category”.

- Set aside: Section 2 'Evaluations', PDF p. 2: 'we believe that Grok 4 overall presents a low risk for malicious use and loss of control' is a conclusion after mitigations; the card does not present it as a level or threshold of the framework.

### Q06 Safeguards tied to determination: ◐ partly

> “Due to Grok 4’s strong dual-use biological capabilities, we have deployed narrow, topically-focused filters across all product surfaces as an additional safeguard against bioweapons-related abuse.” (Section 2.3.3 'Mitigations', PDF p. 6)

The card ties biological and chemical filters to its capability results and to steps identified in the RMF, not to a framework determination (none is stated, Q05). It also states a refusal policy, a system prompt and input filters (Section 2.1.3). This is the developer's account of the safeguards.

### Q07 Chemical and biological: ● stated

> “The area of highest concern is Grok 4's expert-level biology capabilities, which significantly exceed human expert baselines.” (Section 2 'Evaluations', PDF p. 2)

> “We do not evaluate radiological or nuclear capabilities.” (Section 2 'Evaluations', PDF p. 2)

The card states biology and chemistry dual-use knowledge evaluations, with the conclusion that biology is the area of highest concern and with a separate finding on chemistry knowledge; it states that radiological and nuclear capabilities are not evaluated. No threshold language. Scores are not recorded (hazard rule).

### Q08 Cyber: ● stated

> “third-party testing shows that Grok 4’s end-to-end offensive cyber capabilities remain below the level of a human professional.” (Section 2 'Evaluations', PDF p. 2)

The card states cyber knowledge and agentic capture-the-flag evaluations and a conclusion relative to human professionals, attributed to third-party testing. No threshold language. Scores are not recorded (hazard rule).

### Q09 Autonomy and AI R&D: ○ not-found

No evaluation of autonomy, self-replication, self-improvement or AI research and development was found. The card's loss-of-control category is assessed through propensities (Q11).

_Searched:_ Whole card.; terms: “autonom”, “self-”, “replicat”, “exfiltrat”, “R&D”, “research”.

- Set aside: Section 1 'Introduction', PDF p. 1: A rogue AI exfiltrating its weights is given as an example risk scenario, not as an evaluation.

### Q10 Persuasion: ◐ partly

> “We measure persuasion with OpenAI’s MakeMeSay evaluation, where an attacker model attempts to manipulate a defender model to say a codeword” (Section 2.3.1 'Evaluations', PDF p. 6)

The card reports a persuasion evaluation and a win rate in Table 3, with no stated conclusion about persuasive capability.

_Searched:_ Sections 2.2–2.3.; terms: “persua”, “manipulat”, “MakeMeSay”, “influence”.

- Set aside: Section 2.2, PDF p. 4: The 'Manipulation' row of Table 2 reports sycophancy, recorded under Q11.

### Q11 Alignment and deception: ● stated

> “We find that our system prompt mitigation makes the model less willing to contradict its beliefs, thus lowering the lying rate.” (Section 2.2.2 'Results', PDF p. 5)

The card reports deception (lying under pressure), sycophancy and political-bias evaluations as 'concerning propensities', with the conclusion quoted. No scheming, sabotage or oversight evaluation was found.

### Q12 Red-teaming: ○ not-found

No testing described as red-teaming was found. The card reports adversarial robustness evaluations (jailbreaks, prompt injection) without calling them red-teaming.

_Searched:_ Whole card.; terms: “red team”, “red-team”, “adversarial”, “jailbreak”.

- Set aside: Section 2.1.1 'Evaluations', PDF p. 2: Jailbreak attacks on a query set are an evaluation setting, not described as red-teaming.

### Q13 External testers: ◐ partly

> “third-party testing shows that Grok 4’s end-to-end offensive cyber capabilities remain below the level of a human professional.” (Section 2 'Evaluations', PDF p. 2)

The card refers to third-party cyber testing without naming the third party.

_Searched:_ Whole card.; terms: “third-party”, “third party”, “external”, “partner”.

- Set aside: Section 3.1 'Data and Training', PDF p. 7: 'data produced by third-parties for xAI' concerns training data, not testing.

### Q14 Government institute: ○ not-found

No government body is named as having tested or received access to Grok 4.

_Searched:_ Whole card.; terms: “government”, “AISI”, “Safety Institute”, “CAISI”, “DoE”, “DoD”.

- Set aside: Section 2.3.1 'Evaluations', PDF p. 6: 'the open-source Inspect evaluation framework developed by the UK AISI' names a tool, not testing by the institute.
- Set aside: Section 2.3.3 'Mitigations', PDF p. 7: DoE and DoD are named as restricting nuclear information, not as testing the model.

### Q15 Release decision: ○ not-found

No statement that a release or deployment decision was made was found.

_Searched:_ Whole card.; terms: “decide”, “decision”, “release”, “launch”, “deploy”, “approve”.

- Set aside: Section 1 'Introduction', PDF p. 1: States deployment and availability; availability alone is not a decision to release (decision 13a).
- Set aside: Section 2 'Evaluations', PDF p. 2: 'we believe that Grok 4 overall presents a low risk for malicious use and loss of control' is a risk conclusion, not tied by the card to a release; no maker of a release decision is named.
- Set aside: Section 2.3.3 'Mitigations', PDF pp. 6–7: 'we assess that Grok’s enforcement of our basic refusal policy is sufficient' is a safeguards assessment for cyber risks, not tied by the card to a release.

### Q16 Stated limits: ● stated

> “Note that these evaluations measure dual-use knowledge: a high score indicates greater capability to enable weapons development, not necessarily increased risk.” (Section 2.3.2 'Results', PDF p. 6)

> “For all datasets, we only assess performance on text-only questions.” (Section 2.3.1 'Evaluations', PDF p. 5)

The card states that its dual-use evaluations measure knowledge rather than risk, and that only text-only questions are assessed.

## Inventory of cards located

Every card located for the six developers, 2023-01-01 to 2026-11-01, with whether it was retrieved and whether this pack compares it.

## Sources

| Key                         | Card                                                         | Address                                                                                                       | HTTP | SHA-256             | Retrieved  | Words | Archive                                                                                                                                               |
| --------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------- | ---- | ------------------- | ---------- | ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| anthropic-claude-3          | The Claude 3 Model Family: Opus, Sonnet, Haiku               | https://www-cdn.anthropic.com/c6a80a657af445f40e31afac050f3bf76d3b1404.pdf                                    | 200  | `88ae851f53c3034d…` | 2026-11-04 | 22014 | https://web.archive.org/web/20240304141611id_/https://www-cdn.anthropic.com/de8ba9b01c9ab7cbabf5c33b80b7bbc618857627/Model_Card_Claude_3.pdf          |
| anthropic-claude-3-5-sonnet | Claude 3.5 Sonnet Model Card Addendum                        | https://www-cdn.anthropic.com/fed9cc193a14b84131812372d8d5857f8f304c52/Model_Card_Claude_3_Addendum.pdf       | 200  | `ac396c7f155dcbfb…` | 2026-11-04 | 2938  | https://web.archive.org/web/20240620192452id_/https://www-cdn.anthropic.com/fed9cc193a14b84131812372d8d5857f8f304c52/Model_Card_Claude_3_Addendum.pdf |
| gdm-gemini-2-0-flash        | Gemini 2.0 Flash Model Card                                  | https://storage.googleapis.com/deepmind-media/Model-Cards/Gemini-2-0-Flash-Model-Card.pdf                     | 200  | `b1575ae4e9dcbc6a…` | 2026-11-04 | 1521  | https://web.archive.org/web/20260320233550id_/https://storage.googleapis.com/deepmind-media/Model-Cards/Gemini-2-0-Flash-Model-Card.pdf               |
| gdm-gemini-2-0-flash-lite   | Gemini 2.0 Flash-Lite Model Card                             | https://storage.googleapis.com/deepmind-media/Model-Cards/Gemini-2-0-Flash-Lite-Model-Card.pdf                | 200  | `fafcad388912b410…` | 2026-11-04 | 1501  | https://web.archive.org/web/20260321020414id_/https://storage.googleapis.com/deepmind-media/Model-Cards/Gemini-2-0-Flash-Lite-Model-Card.pdf          |
| meta-code-world-model       | Model Card for Code World Model (MODEL_CARD.md)              | https://raw.githubusercontent.com/facebookresearch/cwm/7930e0298bf32aae28cc0e35e18a54c772603364/MODEL_CARD.md | 200  | `3dd8737fc9483de6…` | 2026-11-04 | 1452  | https://web.archive.org/web/20250925125509id_/https://github.com/facebookresearch/cwm/blob/main/MODEL_CARD.md                                         |
| meta-muse-spark-arxiv       | Muse Spark Safety & Preparedness Report (arXiv 2606.12429v1) | https://arxiv.org/pdf/2606.12429v1                                                                            | 200  | `977d071052e3f5dc…` | 2026-11-04 | 61566 | https://web.archive.org/web/20260414233054id_/https://ai.meta.com/static-resource/muse-spark-safety-and-preparedness-report/                          |
| openai-gpt-4o               | GPT-4o System Card                                           | https://cdn.openai.com/gpt-4o-system-card.pdf                                                                 | 200  | `e2579ecb185cbc13…` | 2026-11-04 | 11640 | https://web.archive.org/web/20240808204740id_/https://cdn.openai.com/gpt-4o-system-card.pdf                                                           |
| xai-grok-4                  | Grok 4 Model Card                                            | https://data.x.ai/2025-08-20-grok-4-model-card.pdf                                                            | 200  | `54068c0d9570d94d…` | 2026-11-04 | 3508  | https://web.archive.org/web/20250822000303id_/https://data.x.ai/2025-08-20-grok-4-model-card.pdf                                                      |

## Passages seen and not used

- anthropic: anthropic-claude-3: the addenda for Claude 3.5 Sonnet (June 2024) and for the upgraded Claude 3.5 Sonnet and Claude 3.5 Haiku (October 2024), bound into the copy read (PDF pp. 43–63), are separate cards and were not read for this row.
