# Model cards compared: what frontier developers’ cards disclose

Generated from `pack.json` by `node research/model-cards/tools.mjs render`; do not edit by hand. Candidate research pack outside application data. Machine-prepared (Claude) and audited by the same model family; cross-family check (OpenAI Codex, 2026-11-03) run on a 130-item sample and adjudicated, with one disagreement and six excluded items marked on their cells; not editorially accepted; no human review.

**Question.** What does each frontier developer's published system card, model card or safety report disclose, on the same questions for every card?

**Rows.** For each developer and each calendar year from 2023 to 2026, the latest-dated card published in that year that reports its own evaluations; where every card of a year is an addendum that refers to an earlier card for its evaluations, the latest addendum. For 2026 the year runs to the check date.

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

| Card                                                              | Q01 | Q02 | Q03 | Q04 | Q05 | Q06 | Q07 | Q08 | Q09 | Q10 | Q11 | Q12 | Q13 | Q14 | Q15 | Q16 |
| ----------------------------------------------------------------- | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| Anthropic: Claude 2.1 (with Claude 2) (2023)                      |  ◐  |  ●  |  ○  |  ○  |  ○  |  ◐  |  ○  |  ○  |  ●  |  ○  |  ○  |  ●  |  ●  |  ○  |  ○  |  ●  |
| Anthropic: Claude 3.5 Haiku and upgraded Claude 3.5 Sonnet (2024) |  ○  |  ◐  |  ●  |  ●  |  ●  |  ◐  |  ●  |  ●  |  ●  |  ○  |  ○  |  ●  |  ●  |  ●  |  ◐  |  ●  |
| Anthropic: Claude Opus 4.5 (2025)                                 |  ◐  |  ◐  |  ●  |  ●  |  ●  |  ●  |  ●  |  ●  |  ●  |  ◐  |  ●  |  ●  |  ●  |  ●  |  ●  |  ●  |
| Anthropic: Claude Haiku 5.5 (2026)                                |  ●  |  ◐  |  ◐  |  ●  |  ●  |  ●  |  ●  |  ●  |  ●  |  ○  |  ●  |  ●  |  ●  |  ○  |  ◐  |  ●  |
| Google DeepMind: Gemini 3 Flash (2025)                            |  ◐  |  ○  |  ◐  |  ◐  |  ●  |  ○  |  ○  |  ○  |  ○  |  ○  |  ○  |  ●  |  ○  |  ○  |  ●  |  ●  |
| Google DeepMind: Gemini 4 Argon (2026)                            |  ◐  |  ◐  |  ●  |  ●  |  ●  |  ◐  |  ●  |  ●  |  ●  |  ●  |  ●  |  ●  |  ◐  |  ○  |  ○  |  ●  |
| Meta: Llama 2 (2023)                                              |  ○  |  ◐  |  –  |  –  |  –  |  ◐  |  ○  |  ○  |  ○  |  ○  |  ○  |  ○  |  ○  |  ○  |  ○  |  ●  |
| Meta: Llama 3.3 (2024)                                            |  ○  |  ●  |  –  |  –  |  –  |  ◐  |  ◐  |  ◐  |  ◐  |  ○  |  ○  |  ●  |  ◐  |  ○  |  ○  |  ●  |
| Meta: Code World Model (CWM) (2025)                               |  ●  |  ◐  |  ◐  |  ●  |  ●  |  ◐  |  ●  |  ●  |  ○  |  ○  |  ●  |  ○  |  ○  |  ○  |  ◐  |  ●  |
| Meta: Muse Spark 1.3 (2026)                                       |  ●  |  ◐  |  ◐  |  ◐  |  ●  |  ●  |  ●  |  ●  |  ●  |  ●  |  ●  |  ●  |  ●  |  ○  |  ○  |  ●  |
| Microsoft: Phi-2 (2023)                                           |  ○  |  ◐  |  –  |  –  |  –  |  ◐  |  ○  |  ○  |  ○  |  ○  |  ○  |  ○  |  ○  |  ○  |  ●  |  ●  |
| Microsoft: Phi-4 (2024)                                           |  ○  |  ●  |  –  |  –  |  –  |  ◐  |  ○  |  ○  |  ○  |  ○  |  ○  |  ●  |  ○  |  ○  |  ○  |  ●  |
| Microsoft: Phi-4-mini-flash-reasoning (2025)                      |  ○  |  ●  |  ○  |  ○  |  ○  |  ◐  |  ○  |  ○  |  ○  |  ○  |  ○  |  ◐  |  ○  |  ○  |  ○  |  ●  |
| Microsoft: MAI-Cyber-1.1-Flash (2026)                             |  ○  |  ●  |  ○  |  ○  |  ○  |  ◐  |  ○  |  ●  |  ○  |  ◐  |  ○  |  ●  |  ●  |  ○  |  ◐  |  ●  |
| OpenAI: GPT-4V (GPT-4 with vision) (2023)                         |  ●  |  ●  |  –  |  –  |  –  |  ◐  |  ◐  |  ◐  |  ◐  |  ○  |  ○  |  ●  |  ●  |  ○  | ◐†  |  ●  |
| OpenAI: OpenAI o1 (and o1-mini) (2024)                            |  ●  |  ●  |  ●  |  ●  |  ●  |  ●  |  ●  |  ●  |  ●  |  ●  |  ●  |  ●  |  ●  |  ●  |  ◐  |  ●  |
| OpenAI: GPT-5.2-Codex (2025)                                      |  ●  |  ◐  |  ●  |  ●  |  ●  |  ●  |  ●  |  ●  |  ●  |  ○  |  ○  |  ○  |  ●  |  ○  |  ◐  |  ●  |
| OpenAI: GPT-6 Luna (October 29) (2026)                            |  ●  |  ●  |  ●  |  ●  |  ●  |  ●  |  ●  |  ●  |  ◐  |  ○  |  ◐  |  ◐  |  ○  |  ○  |  ●  |  ●  |
| xAI: Grok 4.1 (2025)                                              |  ●  |  ◐  |  ◐  |  ●  |  ○  |  ◐  |  ●  |  ●  |  ○  |  ●  |  ●  |  ○  |  ○  |  ○  |  ○  |  ●  |
| xAI: Grok 4.7 (2026)                                              |  ●  |  ◐  |  ●  |  ●  |  ◐  |  ◐  |  ●  |  ●  |  ○  |  ○  |  ◐  |  ○  |  ●  |  ○  |  ○  |  ●  |

## Anthropic: Claude 2.1 (with Claude 2) (2023)

- Card: Model Card and Evaluations for Claude Models, with 'Claude 2.1 Model Card Appendix' (update of November 21, 2023) (model card), https://www-cdn.anthropic.com/5c49cc247484cecf107c699baf29250302e5da70/ModelCardClaudev2_with_appendix_v1.pdf
- Framework edition in the dataset: none identified. The card names no frontier safety framework. Its main text describes the July 2023 release of Claude 2; its update line is dated November 21, 2023, after the publication the dataset records for RSP v1.0 (rsp-2023, 2023-09-19), so the framework questions are asked and recorded as not found.

### Q01 Card date: ◐ partly

> “Update (November 21, 2023): We have added an appendix section covering Claude 2.1.” (Section 1 'Introduction', PDF p. 1)

The card states a revision date (November 21, 2023, day precision) for the addition of the Claude 2.1 appendix. No issue date of the card is printed; Anthropic's index lists the Claude 2 card under July 2023.

_Searched:_ Whole text (16 pages), including the title block and the appendix title block (PDF p. 15).; terms: “2023”, “July”, “November”, “Update”, “date”.

- Set aside: References, PDF pp. 12–14: Access dates of cited works (2023-07-03 to 2023-07-08), not the card's date.
- Set aside: Section 2 'Model details', PDF p. 1: 'released in July 2023' is the model's release month (Q02).

### Q02 Release date: ● stated

> “Claude 2 was developed by Anthropic and released in July 2023.” (Section 2 'Claude 2 Model Card', 'Model details', PDF p. 1)

> “Claude 2.1, a new release which builds additional product features and functionality on top of Claude 2.0” (Claude 2.1 Model Card Appendix, Section 1 'Introduction', PDF p. 15)

The card states Claude 2's release month (July 2023). For Claude 2.1 the appendix states a new release without a date; the appendix also states that support at Claude 2.0's initial product launch was 100K tokens and is now 200K. The November 21, 2023 date on PDF p. 1 is the card’s update, not a release date.

### Q03 Framework cited: ○ not-found

No passage naming a frontier safety framework was found. The card's update line (2023-11-21) postdates the publication the dataset records for RSP v1.0 (2023-09-19), so the question is asked.

_Searched:_ Whole text (16 pages), including references and the Claude 2.1 appendix.; terms: “Responsible Scaling”, “RSP”, “ASL”, “AI Safety Level”, “scaling policy”, “framework”, “commitment”.

- Set aside: Section 2, 'Ethical Considerations', PDF p. 2: The Acceptable Use Policy (AUP) is a usage policy, not a frontier safety framework.

### Q04 Link to framework: ○ not-found

No framework is named (Q03), and no link or reference to a framework document was found.

_Searched:_ Whole text, including the reference list (PDF pp. 12–14).; terms: “Responsible Scaling”, “RSP”, “policy”, “framework”.

- Set aside: References [11], PDF p. 12: Reference to the Acceptable Use Policy, not a frontier safety framework.

### Q05 Framework determination: ○ not-found

No framework is named (Q03); no outcome stated in a framework's categories was found.

_Searched:_ Section 2 'Evaluations and Red Teaming' and the whole text.; terms: “threshold”, “level”, “ASL”, “determination”, “risk”.

- Set aside: Section 2 'Evaluations and Red Teaming', PDF p. 2: The statement that deployed Claude models are not believed to pose national security or significant safety risks is a risk conclusion, not expressed in a framework's categories.

### Q06 Safeguards tied to determination: ◐ partly

> “we do not believe any deployed versions of Claude pose national security or significant safety related risks in the areas that we have identified … partly to mitigations that we have put in place” (Section 2 'Evaluations and Red Teaming', PDF p. 2)

The card states that mitigations contribute to its risk conclusion, without naming them there or tying them to a framework determination or threshold (no framework is named, Q03). Elsewhere it states Constitution-based training, AUP enforcement and Trust and Safety processes.

_Searched:_ Section 2 (Ethical Considerations, Evaluations and Red Teaming), Section 3.2.; terms: “mitigation”, “safeguard”, “Trust and Safety”, “AUP”.

### Q07 Chemical and biological: ○ not-found

No passage reporting chemical or biological evaluations was found. The card states evaluation and red-teaming for national security risks without naming domains.

_Searched:_ Whole text.; terms: “biolog”, “chemical”, “CBRN”, “weapon”, “national security”, “dangerous capabilit”.

- Set aside: Section 2 'Evaluations and Red Teaming', PDF p. 2: 'We evaluated and red-teamed Claude 2 and previous Claude models for several national security and safety related risks' names no domain.

### Q08 Cyber: ○ not-found

No passage reporting offensive cyber evaluations was found.

_Searched:_ Whole text.; terms: “cyber”, “hack”, “exploit”, “vulnerab”, “security”, “national security”.

- Set aside: Section 2 'Evaluations and Red Teaming', PDF p. 2: National security evaluations are stated without naming a domain.
- Set aside: Section 3.4, PDF pp. 5–6: 'Jailbreaks' are attempts to elicit harmful output, not cyber-offence evaluations.

### Q09 Autonomy and AI R&D: ● stated

> “Neither ARC nor we believe that our current Claude models possess the dangerous capabilities (‘autonomous replication’ abilities) that ARC is aiming to detect” (Section 2 'Evaluations and Red Teaming', PDF p. 2)

The card states that ARC's safety audits addressed autonomous replication and that neither ARC nor Anthropic believes current Claude models have that capability. This is Anthropic's account; ARC's own report is not part of the card.

### Q10 Persuasion: ○ not-found

No passage reporting evaluations of persuasion or manipulation of people was found.

_Searched:_ Whole text.; terms: “persua”, “manipulat”, “influence”, “propaganda”, “misinformation”.

- Set aside: Section 2 'Evaluations and Red Teaming', PDF p. 2: Misinformation is named as a Trust and Safety area for future red-teaming, not an evaluation of persuasive capability.

### Q11 Alignment and deception: ○ not-found

No evaluation of the model's own propensity or capability for deception, scheming, reward hacking or sabotage was found.

_Searched:_ Section 3 'Alignment Evaluations' (3.1–3.5) and the appendix 'Honesty Evaluations'.; terms: “decept”, “deceiv”, “scheming”, “sabotage”, “reward hack”, “oversight”, “honesty”, “alignment”.

- Set aside: Section 3 'Alignment Evaluations', PDF pp. 3–7: Human preference Elo, BBQ bias, TruthfulQA, harmfulness and HHH evaluations measure helpfulness, harmlessness, bias and truthfulness, not deception or sabotage.
- Set aside: Appendix Section 3 'Honesty Evaluations', PDF p. 16: Factual accuracy and faithfulness to documents are accuracy measures, not deception propensity.

### Q12 Red-teaming: ● stated

> “Before deployment, we also worked with external red teamers, including crowdworker platforms, to test Claude 2 on a range of Trust and Safety related topics” (Section 2 'Evaluations and Red Teaming', PDF p. 2)

> “We evaluated and red-teamed Claude 2 and previous Claude models for several national security and safety related risks.” (Section 2 'Evaluations and Red Teaming', PDF p. 2)

The card states pre-deployment red-teaming by external red teamers including crowdworker platforms on Trust and Safety topics, and red-teaming for unnamed national security risks. Section 3.1 adds a crowdworker red-teaming task and Section 3.4 automated red-teaming on 328 held-out prompts. No number of testers or period is given.

### Q13 External testers: ● stated

> “We have been working with the Alignment Research Center (ARC) since fall of 2022 to support their safety audits of our AI models.” (Section 2 'Evaluations and Red Teaming', PDF p. 2)

The card names ARC as conducting safety audits of Anthropic's models; the crowdworker platforms used for red-teaming are not named.

### Q14 Government institute: ○ not-found

No government body is named as having tested the model or received access.

_Searched:_ Whole text.; terms: “government”, “policymakers”, “institute”, “AISI”, “public sector”, “national security”.

- Set aside: Section 2 'Evaluations and Red Teaming', PDF p. 2: 'We are working with policymakers and other labs to share our findings' concerns sharing findings, not testing or access.

### Q15 Release decision: ○ not-found

No passage stating that a decision to release or deploy was made was found.

_Searched:_ Sections 1, 2 and 5, and the appendix introduction.; terms: “decision”, “decide”, “deploy”, “release”, “launch”, “approve”.

- Set aside: Section 2 'Model details', PDF p. 1: 'released in July 2023' states the release as a fact, not a decision.
- Set aside: Section 2 'Evaluations and Red Teaming', PDF p. 2: The belief that deployed Claude models do not pose national security risks is a risk conclusion, not a release decision.
- Set aside: Section 4.2 'Long Contexts', PDF p. 9: 'we will support 100K at launch rather than this full context window' concerns a product setting at launch, not the decision to release.

### Q16 Stated limits: ● stated

> “This approach has its limitations–for instance, we know the scenarios created by crowdworkers are not fully representative of the scenarios Claude will encounter out in real-world usage” (Section 3.1 'Human Feedback Evaluations and Red-Teaming', PDF p. 3)

> “Our internal evaluations for this metric are still in early stages of development” (Appendix Section 3 'Honesty Evaluations', PDF p. 16)

The card states a limitation of its crowdworker-based human feedback and red-teaming evaluation, and that the Claude 2.1 document-faithfulness evaluation is at an early stage. It also states that it expects to release new findings as its research and evaluations continue (Section 1).

## Anthropic: Claude 3.5 Haiku and upgraded Claude 3.5 Sonnet (2024)

- Card: Model Card Addendum: Claude 3.5 Haiku and Upgraded Claude 3.5 Sonnet (addendum), https://www-cdn.anthropic.com/c7822cdc35ad788ec87e14b3a9d45010f1f86c38.pdf
- Framework edition in the dataset: `rsp-v2-0`. The card cites 'Responsible Scaling Policy (RSP) [4]'; reference [4] reads 'Anthropic, “Responsible Scaling Policy.” October, 2024.' with an address ending 'Anthropic-Responsible-Scaling-Policy-2024-10-15.pdf'. The dataset records rsp-v2-0 as the edition effective 2024-10-15.

### Q01 Card date: ○ not-found

No date of the card was found in the document. Anthropic's index lists it under October 2024.

_Searched:_ Title block (PDF p. 1) and whole text, including footnotes and references.; terms: “2024”, “October”, “date”, “update”, “version”.

- Set aside: Section 2.2, footnote 2, PDF p. 3: 'as of October 22nd, 2024' dates a cited leaderboard reading, not the card.
- Set aside: References [4], PDF p. 13: 'October, 2024' dates the cited Responsible Scaling Policy, not the card.

### Q02 Release date: ◐ partly

> “Claude 3.5 Haiku will initially launch as a text-only model” (Section 2.3 'Vision Capabilities', PDF p. 5)

> “we conducted comprehensive safety evaluations on the upgraded Claude 3.5 Sonnet prior to release” (Section 3.2 'Frontier Risk Evaluations', PDF p. 9)

The card states a release form for Claude 3.5 Haiku (initial launch as text-only) and refers to the upgraded Claude 3.5 Sonnet's release, without a release or availability date for either model.

### Q03 Framework cited: ● stated

> “Both models underwent extensive safety evaluations, including comprehensive testing for potential risks in biological, cybersecurity, and autonomous behavior domains, in accordance with our Responsible Scaling Policy (RSP) [4].” (Section 1 'Introduction', PDF p. 1)

> “[4] Anthropic, “Responsible Scaling Policy.” October, 2024. https://assets.anthropic.com/m/ 24a47b00f10301cd/original/Anthropic-Responsible-Scaling-Policy-2024-10-15.pdf.” (References [4], PDF p. 13 (the address breaks across two lines))

The card names the Responsible Scaling Policy and identifies the edition by a dated reference (October 2024) whose address carries the date 2024-10-15, which the dataset records for rsp-v2-0.

### Q04 Link to framework: ● stated

> “[4] Anthropic, “Responsible Scaling Policy.” October, 2024. https://assets.anthropic.com/m/ 24a47b00f10301cd/original/Anthropic-Responsible-Scaling-Policy-2024-10-15.pdf.” (References [4], PDF p. 13 (the address breaks across two lines))

The card gives a bibliographic reference with the address of the policy document.

### Q05 Framework determination: ● stated

> “Based on our analysis, we judge that the upgraded Claude 3.5 Sonnet does not require ASL-3 safeguards at this time.” (Section 3.2.1 'Results', PDF p. 10)

> “While these models did not trigger the full evaluation protocol described in our Responsible Scaling Policy” (Section 3.3 'Ongoing Safety Commitment', PDF p. 10)

The card states for the upgraded Claude 3.5 Sonnet that ASL-3 safeguards are not required, and for both models that they did not trigger the policy's full evaluation protocol. It also states that the computer use capability is classified under the ASL-2 framework (Section 2.1).

### Q06 Safeguards tied to determination: ◐ partly

> “As with all our models, we implement safeguards and continue to monitor for potential misuse.” (Section 2.1 'Computer Use', PDF p. 3)

> “we are establishing several monitoring protocols and mitigations to ensure a safe and measured release of this capability” (Section 3.1.3 'Computer Use Red-Teaming', PDF p. 9)

The card states safeguards, monitoring and new classifiers, but does not tie them to the ASL determination in Q05 or name a safeguard standard applied; the determination states that ASL-3 safeguards are not required.

### Q07 Chemical and biological: ● stated

> “We also evaluate frontier risks in accordance with our Responsible Scaling Policy (RSP) [4] in the the areas of Chemical, Biological, Radiological, and Nuclear (CBRN) risks, Cybersecurity, and Autonomous Capabilities.” (Section 3 'Safety', PDF p. 7)

> “The model did not demonstrate capabilities requiring ASL … 3 safeguards and security in any domain.” (Section 3.2.1 'Results', PDF pp. 9–10 (the text layer splits 'ASL-3' across the page break; the ellipsis marks the page number))

The card states CBRN evaluations under the RSP and, for the upgraded Claude 3.5 Sonnet, that no domain showed capabilities requiring ASL-3 safeguards and security. Radiological and nuclear risks are reported together with chemical and biological as CBRN. No domain outcome is stated separately for Claude 3.5 Haiku.

### Q08 Cyber: ● stated

> “We also evaluate frontier risks in accordance with our Responsible Scaling Policy (RSP) [4] in the the areas of Chemical, Biological, Radiological, and Nuclear (CBRN) risks, Cybersecurity, and Autonomous Capabilities.” (Section 3 'Safety', PDF p. 7)

> “The model did not demonstrate capabilities requiring ASL … 3 safeguards and security in any domain.” (Section 3.2.1 'Results', PDF pp. 9–10 (the text layer splits 'ASL-3' across the page break; the ellipsis marks the page number))

The card states cybersecurity evaluations under the RSP and, for the upgraded Claude 3.5 Sonnet, that no domain showed capabilities requiring ASL-3 safeguards and security. Method descriptions in Section 3.2 are not recorded (hazard rule).

### Q09 Autonomy and AI R&D: ● stated

> “we deem our software engineering evaluations as currently sufficient for ruling out ASL-3 autonomy capabilities” (Section 3.1.4 'Evaluating Computer Use for the Responsible Scaling Policy', PDF p. 9)

> “Based on our analysis, we judge that the upgraded Claude 3.5 Sonnet does not require ASL-3 safeguards at this time.” (Section 3.2.1 'Results', PDF p. 10)

The card states autonomy evaluations under the RSP, that its software engineering evaluations suffice to rule out ASL-3 autonomy capabilities, and that the developer judges the upgraded Claude 3.5 Sonnet not to require ASL-3 safeguards.

_Cross-family check (item 96):_ corrected: the second quotation was not verbatim (an ellipsis replaced a page break inside “ASL-3”); replaced by the verbatim conclusion on PDF p. 10. Status unchanged.

### Q10 Persuasion: ○ not-found

No passage reporting evaluations of persuasion or manipulation of people was found.

_Searched:_ Sections 1–3 (whole text).; terms: “persua”, “manipulat”, “influence”, “election”, “propaganda”.

- Set aside: Section 3.1.1 'Model Red-Teaming', PDF p. 7: 'Elections Integrity' is a Trust & Safety policy area for harmful requests, not an evaluation of persuasive capability.

### Q11 Alignment and deception: ○ not-found

No evaluation of the models' own propensity or capability for deception, scheming, reward hacking or sabotage was found.

_Searched:_ Sections 2.4–2.5 and 3 (whole text).; terms: “decept”, “deceiv”, “scheming”, “sabotage”, “reward hack”, “sandbag”, “oversight”, “honesty”, “alignment”.

- Set aside: Section 3.1.1, Figure 2, PDF p. 8: 'Honesty' human preference win rates are preference ratings, not an evaluation of deception or scheming.
- Set aside: Section 3.1.2 'Prompt Injection', PDF p. 8: Robustness to third-party attacks, not the model's own propensity.
- Set aside: Section 1 'Introduction', PDF p. 1: 'alignment with Anthropic’s Usage Policy' refers to usage-policy compliance.

### Q12 Red-teaming: ● stated

> “We conducted comprehensive Trust & Safety (T&S) evaluations across fourteen policy areas in six languages” (Section 3.1.1 'Model Red-Teaming', PDF p. 7)

> “We conducted specific Trust & Safety red-teaming for computer use to identify potential abuse vectors.” (Section 3.1.3 'Computer Use Red-Teaming', PDF p. 8)

> “We conducted rigorous first party and independent third party multimodal red-teaming exercises” (Section 2.1 'Computer Use', PDF p. 2)

The card states Trust & Safety red-teaming across fourteen policy areas in six languages, computer-use red-teaming, and first- and third-party multimodal red-teaming; Section 3.2 also mentions manual red-teaming within CBRN evaluations. No number of testers or period is given.

### Q13 External testers: ● stated

> “We also collaborated with METR [8] to conduct an independent assessment.” (Section 1 'Introduction', PDF p. 1; repeated in Section 3.2, PDF p. 9)

The card names METR as conducting an independent assessment; it does not state the assessment's scope or outcome, or which model it covered.

### Q14 Government institute: ● stated

> “joint pre-deployment testing of the new Claude 3.5 Sonnet model was conducted by the US AI Safety Institute (US AISI) [6] and the UK AI Safety Institute (UK AISI) [7].” (Section 1 'Introduction', PDF p. 1; repeated in Section 3.2, PDF p. 9)

The card states pre-deployment testing of the upgraded Claude 3.5 Sonnet by the US and UK AI Safety Institutes; no government testing of Claude 3.5 Haiku is stated.

### Q15 Release decision: ◐ partly

> “Based on our analysis, we judge that the upgraded Claude 3.5 Sonnet does not require ASL-3 safeguards at this time.” (Section 3.2.1 'Results', PDF p. 10)

> “we conducted comprehensive safety evaluations on the upgraded Claude 3.5 Sonnet prior to release” (Section 3.2 'Frontier Risk Evaluations', PDF p. 9)

The card states a safeguards determination in the company's voice and refers to the release, but no passage states that a decision to release was made or by whom.

_Searched:_ Sections 1, 2.1, 3.1.3, 3.2 and 3.3.; terms: “decision”, “decide”, “deploy”, “release”, “launch”, “Responsible Scaling Officer”, “CEO”.

- Set aside: Section 3.1.3, PDF p. 9: 'a safe and measured release of this capability' concerns monitoring of the computer use feature, not a release decision.

### Q16 Stated limits: ● stated

> “We believe dedicated scaffolding and prompting can further improve the results.” (Section 2.2 'Tool Use & Agentic Tasks', PDF p. 3)

> “We detail some of our preliminary reasoning below” (Section 3.1.4 'Evaluating Computer Use for the Responsible Scaling Policy', PDF p. 9)

The card states that a reported agentic coding result could be improved with dedicated scaffolding and prompting, and describes its reasoning on computer use and RSP threat models as preliminary. No limitation is stated for the Section 3.2 frontier risk results.

## Anthropic: Claude Opus 4.5 (2025)

- Card: System Card: Claude Opus 4.5 (system card), https://www-cdn.anthropic.com/bf10f64990cfda0ba858290be7b8cc6317685f47.pdf
- Framework edition in the dataset: `rsp-v2-2`. The card's text names the Responsible Scaling Policy without a version. The PDF's hyperlink on the words 'Responsible Scaling Policy' (PDF p. 12, Section 1.2.3; again p. 117, Section 7.1) points to https://www-cdn.anthropic.com/872c653b2d0501d6ab44cf87f43e1dc4853e4d37.pdf, whose cover, retrieved 2026-11-02, reads 'Version 2.2, Effective May 14, 2025'; the dataset holds that address as source-rsp-2-2 (rsp-v2-2). The link on p. 11 points to Anthropic's announcement page for the updated policy, not to a dated edition. The edition rests on the link annotation, which is not part of the text layer (see open questions).

### Q01 Card date: ◐ partly

> “System Card: Claude Opus 4.5 November 2025” (Cover, PDF p. 1)

> “November 24, 2025 … November 25, 2025 … December 5, 2025” (Changelog, PDF p. 2)

The card's printed date has month precision (November 2025). Its changelog lists three revision dates (November 24 and 25, December 5, 2025); the first entry refers to a 'previous version' of the card.

### Q02 Release date: ◐ partly

> “Informed by the testing described here, we have deployed Claude Opus 4.5 under the AI Safety Level 3 Standard.” (Abstract, PDF p. 3)

> “In preparation for this model launch, we were able to reduce this behavior by modifying the system prompt that is applied for conversations on Claude.ai.” (Section 3.2 'Ambiguous context evaluations', PDF p. 41)

The card states that the model has been deployed and refers to its launch, naming Claude.ai as a surface, but gives no release or availability date.

_Searched:_ Abstract, Sections 1–1.2, and term search across the card.; terms: “release date”, “available”, “availability”, “launch”, “API”, “Claude.ai”, “November 2”.

- Set aside: Section 1.2.4, PDF pp. 12–13: 'We are launching Claude Opus 4.5 with safeguards we believe are appropriate' gives relative timing; the sentence spans a page break in the text layer and is not quoted.

### Q03 Framework cited: ● stated

> “For more information on the requirements for these ASL Standards, please see the Responsible Scaling Policy” (Section 1.2.3 'AI Safety Level determination process', PDF p. 12 (hyperlinked words))

The card names the Responsible Scaling Policy; the text gives no version, but the PDF's hyperlink on these words points to a policy PDF whose cover reads 'Version 2.2, Effective May 14, 2025' (rsp-v2-2; see frameworkEditionNote). The printed text does not name the edition.

### Q04 Link to framework: ● stated

> “For more information on the requirements for these ASL Standards, please see the Responsible Scaling Policy” (Section 1.2.3 'AI Safety Level determination process', PDF p. 12 (hyperlinked words))

The card refers the reader to the policy; the words carry a hyperlink to the RSP v2.2 PDF (also on PDF p. 117). The address is not printed in the text.

### Q05 Framework determination: ● stated

> “Our determination is that Claude Opus 4.5 does not cross either the AI R&D-4 or CBRN-4 capability threshold.” (Section 1.2.4 'Conclusions', PDF p. 12)

The card states that the model does not cross the AI R&D-4 or CBRN-4 thresholds and that it is deployed under the ASL-3 Standard. For cyber it states that the policy sets no capability threshold (Q08).

### Q06 Safeguards tied to determination: ● stated

> “For Claude Opus 4.5, we implemented ASL-3 (AI Safety Level 3) protections based on the model’s demonstrated capabilities.” (Section 1.2.1 'Overview', PDF p. 11)

> “Based on these assessments, we have decided to release Claude Opus 4.5 under the ASL-3 Standard.” (Section 1.2.3 'AI Safety Level determination process', PDF p. 12)

The card states that ASL-3 protections were implemented on the basis of the capability assessment. This is the developer's account of the safeguards applied.

### Q07 Chemical and biological: ● stated

> “We determine that Claude Opus 4.5 does not cross the CBRN-4 threshold.” (Section 1.2.4.2 'On chemical, biological, radiological, and nuclear (CBRN) risks', PDF p. 14)

> “As a result, we determined ASL-3 safeguards were appropriate.” (Section 7.2 'CBRN evaluations', 'Claude Opus 4.5 Results', PDF p. 119)

> “we do not currently run specific evaluations on chemical risks internally” (Section 7.2.1 'On chemical risks', PDF p. 120)

The card states biological evaluations with the outcome that the CBRN-4 threshold is not crossed and ASL-3 safeguards are appropriate. It states that chemical risks are not evaluated internally, and that radiological and nuclear evaluations are carried out with NNSA and their results are not published by Anthropic. Evaluation details are not recorded (hazard rule).

### Q08 Cyber: ● stated

> “We believe that Claude Opus 4.5 does not demonstrate catastrophically risky capabilities in the cyber domain.” (Section 7.4 'Cyber evaluations', 'Results', PDF p. 145)

> “The Responsible Scaling Policy does not stipulate a capability threshold for cyber capabilities at any ASL level” (Section 7.4 'Cyber evaluations', PDF p. 143)

The card states cyber evaluations and a conclusion without a policy threshold, which it states the policy does not set for cyber. Evaluation methods and scores are not recorded (hazard rule).

### Q09 Autonomy and AI R&D: ● stated

> “We judge that Claude Opus 4.5 could not fully automate an entry-level, remote-only research role at Anthropic.” (Section 1.2.4.1 'On autonomy risks', PDF p. 13)

> “Claude Opus 4.5 has roughly reached the pre-defined thresholds we set for straightforward ASL-4 rule-out based on benchmark tasks.” (Section 1.2.3 'AI Safety Level determination process', PDF p. 12)

The card states AI R&D evaluations, that the AI R&D-4 threshold is not crossed, and that the rule-out drew also on an internal survey and qualitative impressions because benchmark rule-out thresholds were roughly reached.

### Q10 Persuasion: ◐ partly

> “attempts to hide dangerous capabilities, and attempts to manipulate users toward certain views” (Section 6.1 'Introduction and summary of findings', PDF p. 64)

The card lists attempts to manipulate users toward certain views among the behaviours its alignment assessment tested for; no outcome specific to manipulation or persuasion was found. The overall alignment conclusions are recorded in Q11.

_Searched:_ Sections 3.5, 6.1–6.2 and term search across the card.; terms: “persua”, “manipulat”, “influence”, “sway”, “political”.

- Set aside: Section 3.5.1 'Political bias', PDF pp. 43–45: Even-handedness evaluation measures bias in responses, not persuasive or manipulative capability.

### Q11 Alignment and deception: ● stated

> “Claude Opus 4.5 is very unlikely to pose a significant risk of catastrophic impacts through the intentional sabotage of human engineering, R&D, or decision-making.” (Section 6.1.2 'Overall assessment of high-stakes sabotage risk', PDF p. 66)

> “We saw no signs of sandbagging or strategic attempts to tamper with our safety testing in a way that would affect our RSP determinations” (Section 6.1.1 'Key findings on safety and alignment', PDF p. 66)

The card states alignment evaluations covering sabotage, deception, sandbagging, reward hacking and evaluation awareness, with the conclusion that high-stakes sabotage risk is low. It also reports two isolated cases of deception by omission in testing earlier snapshots, which it attributes to interventions against prompt injection.

### Q12 Red-teaming: ● stated

> “We worked with the US Center for AI Standards and Innovation to red-team Claude Opus 4.5 over a one-week window, which included at least 2–3 days of red-teaming.” (Section 7.2.4.10 'ASL-4 red teaming with the CAISI', PDF p. 132)

> “Finally, red-teaming results by various third parties demonstrated some increase in risk, but not enough to require additional protections.” (Section 7.2 'CBRN evaluations', 'Claude Opus 4.5 Results', PDF p. 119)

The card states biological red-teaming by third parties, by one external expert over two days (Section 7.2.4.9) and by CAISI over a one-week window; prompt-injection red-teaming with Gray Swan (Section 5.2); and that cyber capabilities are red-teamed (Section 7.4).

### Q13 External testers: ● stated

> “Gray Swan measured the success rate of prompt injection attacks after a single attempt (k=1)” (Section 5.2.1 'Gray Swan Agent Red Teaming benchmark for tool use', PDF p. 58)

The card names Gray Swan, which it calls an external research partner, as measuring prompt-injection attack success. The third parties in biological red-teaming and the external expert are not named; the changelog refers to ARC-AGI scores 'reported by the ARC Foundation'.

### Q14 Government institute: ● stated

> “pre-deployment testing of Claude Opus 4.5 was conducted by the US Center for AI Standards and Innovation (CAISI) and the UK AI Security Institute (UK AISI).” (Section 7.5 'Third party assessments', PDF p. 151)

> “Anthropic has maintained a formal partnership with the U.S. Department of Energy’s National Nuclear Security Administration (NNSA) to evaluate our AI models for potential nuclear and radiological risks.” (Section 7.2.2 'On radiological and nuclear risks', PDF p. 120)

The card states pre-deployment testing by CAISI and the UK AISI (CBRN, cyber, ASL-3 safeguards and misalignment), UK AISI testing of a pre-release snapshot for misalignment (Section 6.13), and an NNSA partnership evaluating models for nuclear and radiological risks.

### Q15 Release decision: ● stated

> “Consistent with our RSP, the Responsible Scaling Officer and CEO made the ultimate determination on the required ASL Standards.” (Section 1.2.3 'AI Safety Level determination process', PDF p. 12)

> “Based on these assessments, we have decided to release Claude Opus 4.5 under the ASL-3 Standard.” (Section 1.2.3 'AI Safety Level determination process', PDF p. 12)

The card states a decision to release in the company's voice, and names the Responsible Scaling Officer and CEO as making the ASL determination on which the release rests.

### Q16 Stated limits: ● stated

> “However, confidently ruling out these thresholds is becoming increasingly difficult.” (Section 1.2.4 'Conclusions', PDF p. 12)

> “parts of the AI R&D-4 and CBRN-4 thresholds have fundamental epistemic uncertainty or require more sophisticated forms of measurement” (Section 1.2.4 'Conclusions', PDF p. 12)

The card states that ruling out the AI R&D-4 and CBRN-4 thresholds is becoming difficult and that parts of the thresholds carry epistemic uncertainty. It also states limited tools for studying reasoning faithfulness (Section 6.1.1).

## Anthropic: Claude Haiku 5.5 (2026)

- Card: System Card: Claude Haiku 5.5 (system card), https://assets.claude.com/e1080d6bf5ae2018ea3c2f414064be03232f5be5.pdf
- Framework edition in the dataset: none identified. The card names the Responsible Scaling Policy (RSP) and uses its threshold names (CB-1, CB-2, Autonomy-1, Autonomy-2) and an 'August 2026 Risk Report', without a version or date for the policy; its hyperlink (PDF p. 11) points to the undated page https://www.anthropic.com/responsible-scaling-policy. As context, not as the card's statement, the dataset records rsp-v3-4 (effective 2026-07-08) as the edition published before the card's date. The card also names a 'Frontier Compliance Framework (FCF)', described as its compliance framework for California's SB 53 and the EU General-Purpose AI Code of Practice, with no date or version; it is not in the brief's list of framework identifiers (see open questions).

### Q01 Card date: ● stated

> “System Card: Claude Haiku 5.5 October 7, 2026” (Cover, PDF p. 1)

The card carries a printed date with day precision (October 7, 2026); its kind (issue or publication) is not stated. No changelog or revision date was found.

### Q02 Release date: ◐ partly

> “Claude Haiku 5.5 is a new large language model from Anthropic, released for general access.” (Section 1 'Introduction', PDF p. 8)

The card states the release form (general access; Section 1.5 also refers to first-party products and the API) but no release or availability date.

_Searched:_ Executive summary, Section 1 and term search across the card.; terms: “release”, “available”, “availability”, “launch”, “general access”, “October”.

- Set aside: Section 8.9.1, PDF p. 125: 'as of October 7, 2026' dates a price used for a comparison model, not the release.

### Q03 Framework cited: ◐ partly

> “we describe our assessment of Claude Haiku 5.5 for catastrophic risks relevant to our Responsible Scaling Policy (RSP)” (Section 2.1 'Introduction', PDF p. 11)

The card names the Responsible Scaling Policy without a version or date; its hyperlink points to the undated policy page. As context, not as the card's statement, the dataset records rsp-v3-4 (effective 2026-07-08) as the edition published before the card's date. The card also names a 'Frontier Compliance Framework (FCF)' (see frameworkEditionNote).

### Q04 Link to framework: ● stated

> “we describe our assessment of Claude Haiku 5.5 for catastrophic risks relevant to our Responsible Scaling Policy (RSP)” (Section 2.1 'Introduction', PDF p. 11 (hyperlinked words))

The words 'Responsible Scaling Policy (RSP)' carry a hyperlink to https://www.anthropic.com/responsible-scaling-policy, an undated page; the address is not printed in the text.

### Q05 Framework determination: ● stated

> “As such, we determine that Haiku 5.5 does not cross our CB-2 or Autonomy-2 RSP thresholds.” (Section 2.1 'Introduction', PDF p. 11)

> “However, we do treat Haiku 5.5 as meeting our CB-1 and Autonomy-1 thresholds, and we apply the corresponding mitigations from our RSP.” (Section 2.1 'Introduction', PDF p. 11)

The card states that the model does not cross the CB-2 or Autonomy-2 thresholds and is treated as meeting CB-1 and Autonomy-1. No RSP threshold is named for cyber.

### Q06 Safeguards tied to determination: ● stated

> “However, we do treat Haiku 5.5 as meeting our CB-1 and Autonomy-1 thresholds, and we apply the corresponding mitigations from our RSP.” (Section 2.1 'Introduction', PDF p. 11)

> “For chemical and biological (CB) risks, we have deployed the same harmful CB misuse classifiers as for our deployments of Claude Opus 5 and Claude Sonnet 5” (Section 1.5 'Safeguards', PDF p. 9)

The card states that the mitigations corresponding to the CB-1 and Autonomy-1 thresholds are applied, and lists deployed classifiers for CB, cyber, frontier-LLM development and conventional weapons. This is the developer's account of the safeguards.

### Q07 Chemical and biological: ● stated

> “As such, we determine that Haiku 5.5 does not cross our CB-2 or Autonomy-2 RSP thresholds.” (Section 2.1 'Introduction', PDF p. 11)

> “We did not conduct expert red-teaming sessions, uplift trials, or other resource-intensive evaluations requiring human participants.” (Section 2.2.1 'What we measured', PDF p. 11)

The card states automated chemical and biological (CB) evaluations, with the outcome that CB-2 is not crossed and CB-1 is treated as met. No radiological or nuclear evaluation is reported in the RSP section. Evaluation names and results are not recorded (hazard rule).

_Cross-family check (item 99):_ not cross-family checked: excluded from the pass by the maintainer.

### Q08 Cyber: ● stated

> “Claude Haiku 5.5 is not a frontier model, but it is a relatively significant step up in cyber capabilities over Haiku 4.5.” (Section 3.1 'Introduction', PDF p. 23)

> “Given the relative lack of advanced cybersecurity capabilities, our cyber safeguards for Claude Haiku 5.5 trigger on significantly less activity than other recent releases.” (Section 3.2 'Mitigations', PDF p. 23)

The card states cyber capability evaluations and the conclusion of a relative lack of advanced cybersecurity capabilities, compared with other Claude models; no threshold language is used for cyber. Benchmark contents and scores are not recorded (hazard rule).

### Q09 Autonomy and AI R&D: ● stated

> “Autonomy threat model 2 is not applicable to Haiku 5.5.” (Section 2.3.1.1 'How Haiku 5.5 affects or changes analysis from our most recent Risk Report', PDF p. 19)

> “As Claude Haiku 5.5 is much less capable than Opus 5.5 and does not push the capability frontier, we draw the same conclusion in this case.” (Section 2.3.3 'Conclusion', PDF p. 20)

The card states that the Autonomy-2 threshold is not crossed, carrying over the Claude Opus 5.5 System Card's conclusion on the basis of relative capability, and that Autonomy threat model 1 applies (Q11).

### Q10 Persuasion: ○ not-found

No passage reporting evaluations of persuasive or manipulative capability was found.

_Searched:_ Executive summary, Sections 2, 4.1, 6.1–6.2 and term search across the card.; terms: “persua”, “manipulat”, “influence”, “propaganda”, “sway”, “convinc”.

- Set aside: Section 4.1, PDF p. 30: 'influence operations' is a domain of multi-turn harmful-request testing (content safety), not an evaluation of the model's persuasive capability.
- Set aside: Section 6.2 metric list, PDF p. 70: 'Internalized propaganda' is a behavioural-audit metric for promoting politically motivated false claims, not an evaluation of persuasion of people.
- Set aside: Section 6.3.3.4, PDF pp. 83–84: 'git manipulations' refers to concealing repository changes (Q11), not manipulation of people.

### Q11 Alignment and deception: ● stated

> “our overall assessment is that the risk of catastrophic harm caused by misalignment of Claude Haiku 5.5 is also low.” (Section 2.4.2 'Updated overall assessment of alignment risk', PDF p. 22)

> “much weaker at covert sabotage than our larger models” (Executive summary, PDF p. 3)

The card states alignment evaluations (behavioural audit, honesty, sandbox escape, covert-capability and sabotage evaluations) with the conclusion that misalignment risk is low.

### Q12 Red-teaming: ● stated

> “We use Shade, an external adaptive red-teaming tool from Gray Swan, to evaluate our models’ robustness to prompt injection in coding environments.” (Section 5.2.2.1 'Coding', PDF p. 51)

The card reports prompt-injection red-teaming under a section titled 'External red teaming' (coding, tool use and computer use surfaces) and adversarial testing by crowd workers (Section 1.2). It states that no expert red-teaming sessions were run for CB (Q07). No number of testers or period is given.

### Q13 External testers: ● stated

> “Gray Swan trains the attacker on the test scenarios against earlier Claude models, then runs it unchanged against the latest models on the same scenarios.” (Section 5.2.2.1 'Coding', PDF p. 51)

The card names Gray Swan as running its attacker against the latest models. Section 1.6 states that external testers ran assessments without naming them there; Irregular is named as the developer of a cyber benchmark, not as a tester.

### Q14 Government institute: ○ not-found

No government body is named as having tested this model or received access to it.

_Searched:_ Sections 1.6, 2, 3, 5.2 and term search across the card.; terms: “AISI”, “CAISI”, “Center for AI Standards”, “Security Institute”, “government”, “NNSA”, “Department of Energy”.

- Set aside: Section 5.2.1 'External red teaming', PDF p. 50: The UK AI Security Institute and the US Center for AI Standards and Innovation are named as partners in creating a benchmark that Anthropic used, not as having tested this model.
- Set aside: Section 6 (chain-of-thought controllability), PDF p. 93: The UK AI Security Institute is named as the source of a prompt used by the developer, not as having tested or received access to this model.

### Q15 Release decision: ◐ partly

> “As such, we are releasing Haiku 5.5 with the same safeguards we deployed for Sonnet 5 and Opus 5” (Section 2.2.4 'Conclusions', PDF p. 18)

The card states, in the company's voice, that the model is being released with a named safeguard set as a consequence of its chemical and biological judgement. It does not describe a decision to release, and names no person, office or committee.

### Q16 Stated limits: ● stated

> “these measures are limited: past assessments have not fully captured the potential severity of misbehavior our models were capable of” (Section 6.1.2 'Key findings on safety and alignment', PDF p. 56)

> “The strength of the evidence provided by our alignment assessment for Haiku 5.5 is somewhat lower than that presented for Claude Mythos 5 in the August 2026 Risk Report” (Section 2.4.1 'Updates to claims and core argument', PDF p. 21)

The card states limits of its alignment measures and of the evidence for this model; it also states that internal testing runs at a smaller scale than deployment (Section 6.1.1) and that CB evaluations were automated, without studies requiring human participants (Q07).

## Google DeepMind: Gemini 3 Flash (2025)

- Card: Gemini 3 Flash Model Card (model card), https://storage.googleapis.com/deepmind-media/Model-Cards/Gemini-3-Flash-Model-Card.pdf
- Framework edition in the dataset: none identified. The card names 'our Frontier Safety Framework' and 'our FSF' without a version, date or link to the framework document (its one frontier-safety hyperlink points to the Gemini 3 Pro Frontier Safety Framework Report). No edition is inferred. Context only, not the card's statement: the dataset records fsf-v3-0 (2025-09-22) as the edition published before the card's date (December 2025).

### Q01 Card date: ◐ partly

> “Published: December 2025” (Model card preamble, PDF p. 2 (printed p. 1))

The card carries a publication date at month precision only; the cover repeats it as 'Model card published: December, 2025'. The developer's model-card index lists the card as 'Updated 17 December 2025' (index, not the card). No revision date is printed.

### Q02 Release date: ○ not-found

No release or availability date and no release form was found in the card; its Distribution section refers to the Gemini 3 Pro model card.

_Searched:_ Whole card (6 PDF pages): cover, preamble, Model Information, Model Data, Implementation and Sustainability, Distribution, Evaluation, Intended Usage and Limitations, Ethics and Content Safety.; terms: “release”, “launch”, “availab”, “distribut”, “deploy”, “API”, “preview”.

- Set aside: Distribution, PDF p. 3 (printed p. 2): States that the model 'is distributed similarly to Gemini 3 Pro' and refers to the Gemini 3 Pro model card; gives neither a date nor a release form.
- Set aside: Ethics and Content Safety, 'Frontier Safety Assessment', PDF p. 6 (printed p. 5): States the model was deemed acceptable for deployment (recorded under Q15); no date or form of release.
- Set aside: Evaluation, 'Results', PDF p. 4 (printed p. 3): 'Results as of December, 2025' dates the evaluation results, not the release.

### Q03 Framework cited: ◐ partly

> “did not reach any critical capability levels (CCLs) outlined in our Frontier Safety Framework” (Ethics and Content Safety, 'Frontier Safety Assessment', PDF p. 6 (printed p. 5))

The card names the Frontier Safety Framework (also 'our FSF') without an edition, date or link to the framework. Context only, not the card's statement: the dataset records fsf-v3-0 (2025-09-22) as the edition published before the card's date.

_Searched:_ Whole card.; terms: “Frontier Safety Framework”, “FSF”, “version”, “edition”, “2025”.

### Q04 Link to framework: ◐ partly

> “did not reach any critical capability levels (CCLs) outlined in our Frontier Safety Framework” (Ethics and Content Safety, 'Frontier Safety Assessment', PDF p. 6 (printed p. 5))

The card refers to the framework as a document ('outlined in') without an address or reference. The paragraph's hyperlink (PDF link annotation, p. 6) points to the Gemini 3 Pro Frontier Safety Framework Report (storage.googleapis.com/deepmind-media/gemini/gemini_3_pro_fsf_report.pdf), a model report, not the framework.

_Searched:_ Whole card and its PDF link annotations (17 links).; terms: “Frontier Safety Framework”, “FSF”, “frontier-safety”, “http”.

- Set aside: PDF link annotation, p. 6: Target is the Gemini 3 Pro Frontier Safety Framework Report, not the framework document.

### Q05 Framework determination: ● stated

> “the Gemini 3 Pro model results give us confidence that Gemini 3 Flash is unlikely to reach any CCLs” (Ethics and Content Safety, 'Frontier Safety Assessment', PDF p. 6 (printed p. 5))

The card states that Gemini 3 Pro Preview did not reach any critical capability level and that Gemini 3 Flash, as a less capable model, is unlikely to reach any CCL; it states that it relies on the results reported for Gemini 3 Pro and reports no frontier safety evaluation of Gemini 3 Flash itself. No domain is named.

### Q06 Safeguards tied to determination: ○ not-found

No safeguard tied to the determination was found; the card refers to the Gemini 3 Pro model card for risks and mitigations.

_Searched:_ Whole card.; terms: “safeguard”, “mitigation”, “protect”, “security”, “filter”, “risk acceptance”.

- Set aside: Ethics and Content Safety, 'Risks and Mitigations', PDF p. 6 (printed p. 5): Refers to the Gemini 3 Pro model card; names no safeguard.
- Set aside: Ethics and Content Safety, 'Frontier Safety Assessment', PDF p. 6 (printed p. 5): Ties the deployment judgement to the FSF's risk acceptance criteria (Q15) but names no safeguard or mitigation.

### Q07 Chemical and biological: ○ not-found

No chemical or biological evaluation of Gemini 3 Flash was found. The card's frontier safety paragraph reports Gemini 3 Pro Preview's results as a whole (no CCL reached) without naming any domain.

_Searched:_ Whole card.; terms: “CBRN”, “chemical”, “biolog”, “radiolog”, “nuclear”, “weapon”, “CCL”, “Frontier Safety”.

- Set aside: Ethics and Content Safety, 'Frontier Safety Assessment', PDF p. 6 (printed p. 5): Reports another model's (Gemini 3 Pro Preview) results without naming domains; recorded under Q05.

### Q08 Cyber: ○ not-found

No cyber evaluation was found; the term does not occur in the card.

_Searched:_ Whole card.; terms: “cyber”, “offens”, “exploit”, “vulnerab”, “CCL”.

- Set aside: Ethics and Content Safety, 'Frontier Safety Assessment', PDF p. 6 (printed p. 5): Reports Gemini 3 Pro Preview's results without naming domains; recorded under Q05.

### Q09 Autonomy and AI R&D: ○ not-found

No dangerous-capability evaluation of autonomy, self-improvement or AI R&D was found. The card reports agentic benchmarks as product capability; they are set aside below.

_Cross-family check (item 101):_ corrected: the absence note is limited to dangerous-capability evaluations. Status unchanged.

_Searched:_ Whole card.; terms: “autonom”, “R&D”, “machine learning”, “self-repl”, “self-improv”, “agentic”.

- Set aside: Evaluation, 'Approach', PDF p. 4 (printed p. 3): Lists 'agentic tool use' among capability benchmarks; product capability, not a dangerous-capability evaluation.
- Set aside: Ethics and Content Safety, 'Frontier Safety Assessment', PDF p. 6 (printed p. 5): Reports Gemini 3 Pro Preview's results without naming domains; recorded under Q05.

### Q10 Persuasion: ○ not-found

No persuasion or manipulation evaluation was found; the terms do not occur in the card.

_Searched:_ Whole card.; terms: “persua”, “manipul”, “influence”.

- Set aside: Ethics and Content Safety, 'Frontier Safety Assessment', PDF p. 6 (printed p. 5): Reports Gemini 3 Pro Preview's results without naming domains; recorded under Q05.

### Q11 Alignment and deception: ○ not-found

No evaluation of misalignment, deception, scheming or sabotage was found. The safety evaluations reported are content-safety, tone and refusal measures.

_Searched:_ Whole card.; terms: “decepti”, “misalign”, “schem”, “sabotag”, “situational”, “stealth”, “oversight”, “reward hack”, “honest”.

- Set aside: Ethics and Content Safety, 'Training and Development Evaluation Results', PDF p. 5 (printed p. 4): Content safety, tone and unjustified-refusal evaluations; content-safety tests do not meet the criterion.

### Q12 Red-teaming: ● stated

> “We conduct manual red teaming by specialist teams who sit outside of the model development team” (Ethics and Content Safety, 'Human Red Teaming Results', PDF p. 6 (printed p. 5))

> “the scope of red teaming covered potential issues outside of our strict policies” (Ethics and Content Safety, 'Human Red Teaming Results', PDF p. 6 (printed p. 5))

The card states manual red teaming by Google specialist teams outside the model development team, covering child safety and content safety policies and issues beyond them; it states no number of testers or period.

### Q13 External testers: ○ not-found

No external tester or evaluator was found.

_Searched:_ Whole card.; terms: “external”, “third party”, “third-party”, “partner”, “independent”, “vendor”, “evaluator”.

- Set aside: Ethics and Content Safety, 'Human Red Teaming Results', PDF p. 6 (printed p. 5): 'specialist teams who sit outside of the model development team' are Google teams (Q12), not external organisations.

### Q14 Government institute: ○ not-found

No government body was found.

_Searched:_ Whole card.; terms: “institute”, “AISI”, “CAISI”, “government”, “UK”, “U.S.”.

### Q15 Release decision: ● stated

> “we deemed Gemini 3 Flash was acceptable for deployment” (Ethics and Content Safety, 'Frontier Safety Assessment', PDF p. 6 (printed p. 5))

The card states a deployment judgement in the company's voice ('we'), made 'in line with the risk acceptance criteria outlined in our FSF'. No person, office or committee is named.

### Q16 Stated limits: ● stated

> “The evaluation results are for automated evaluations and not human evaluation or red teaming” (Ethics and Content Safety, 'Training and Development Evaluation Results', PDF p. 5 (printed p. 4))

> “not directly comparable with performance results found in previous Gemini model cards” (Ethics and Content Safety, 'Training and Development Evaluation Results', PDF p. 6 (printed p. 5))

The card states that the reported safety results are automated only, are computed with revised evaluations not comparable with earlier cards, and that variation is expected in automated results.

## Google DeepMind: Gemini 4 Argon (2026)

- Card: Gemini 4 Argon — Model Card (model card), https://storage.googleapis.com/deepmind-media/Model-Cards/Gemini-4-Argon-Model-Card.pdf
- Framework edition in the dataset: `fsf-v3-1`. The card writes 'our Frontier Safety Framework (April 2026)' (PDF p. 11) and hyperlinks the framework to storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3-1.pdf, the address the dataset records for fsf-v3-1 (version date 2026-04-17).

### Q01 Card date: ◐ partly

> “Published: October 2026” (Model card preamble, PDF p. 2 (printed p. 1))

The PDF carries a publication date at month precision only and no revision date. The card's HTML page reads 'Published 13 October 2026' (page header, not the PDF).

### Q02 Release date: ◐ partly

> “Gemini 4 Argon is distributed in the following channels” (Distribution, PDF p. 4 (printed p. 3))

> “Our models are available to downstream providers via an application program interface (API)” (Distribution, PDF p. 4 (printed p. 3))

The card lists release channels (Gemini App, Gemini API, Google AI Studio, Gemini for business, Google Antigravity, Google AI Mode) and API access; it gives no release or availability date.

_Searched:_ Whole card (14 PDF pages).; terms: “release”, “launch”, “availab”, “distribut”, “deploy”, “October”.

- Set aside: Evaluation Approach, PDF p. 8 (printed p. 7): 'Ethics & Safety Reviews were conducted ahead of the model's release' gives relative timing of a review, not of release.
- Set aside: Evaluation, 'Results', PDF p. 5 (printed p. 4): 'results as of October, 2026' dates the results, not the release.

### Q03 Framework cited: ● stated

> “In line with our Frontier Safety Framework (April 2026), we conducted critical capability assessments of Gemini 4 Argon” (Safety & Security, 'Frontier Safety Assessment', PDF p. 11 (printed p. 10))

The card names the framework with the date 'April 2026' and links the v3.1 document (dataset fsf-v3-1, version date 2026-04-17).

### Q04 Link to framework: ● stated

> “In line with our Frontier Safety Framework (April 2026), we conducted critical capability assessments of Gemini 4 Argon” (Safety & Security, 'Frontier Safety Assessment', PDF p. 11 (printed p. 10))

The PDF's link annotation on p. 11 points to storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3-1.pdf; a link on p. 9 points to deepmind.google/frontier-safety/ (the framework versions page).

### Q05 Framework determination: ● stated

> “We cannot rule out that Gemini 4 Argon has reached this CCL for biological information risk” (Safety & Security, 'Frontier Safety Assessment', PDF p. 11 (printed p. 10))

> “Stealth and Situational Awareness TCL: We cannot rule out that Gemini 4 Argon has reached this TCL” (Safety & Security, 'Frontier Safety Assessment', PDF p. 11 (printed p. 10))

> “we assess its overall capabilities to be below the CCL threshold” (Frontier safety table, Harmful Manipulation row, PDF p. 13 (printed p. 12))

The card states an outcome for each domain of its table: CBRN uplift TCL not reached for chemical, radiological and nuclear; biological CCL 'cannot be ruled out'; cybersecurity CCL 'cannot be ruled out'; harmful manipulation CCL not reached; stealth and situational awareness TCL 'cannot be ruled out'; ML R&D acceleration and automation CCLs not reached.

### Q06 Safeguards tied to determination: ◐ partly

> “we therefore developed a safety case for its biorisk capabilities that we assess lower risk to below the biological CCL level” (Safety & Security, 'Frontier Safety Assessment', PDF p. 11 (printed p. 10))

> “We have deployed safeguards for both internal and external deployments that we assess lower risk to below the TCL level.” (Frontier safety table, Loss of Control row, PDF p. 13 (printed p. 12))

The card ties safety cases (biological and cyber CCLs) and a residual risk assessment with safeguards (stealth and situational awareness TCL) to the thresholds it cannot rule out, but names no safeguard, protection type or safeguard standard; it refers to the Gemini 4 Argon Safety & Security Report. Recorded as partly because Q06 asks for named safeguards. The developer's account, not evidence that the safeguards work.

_Cross-family check (item 102):_ corrected: stated to partly; no card passage names the safeguards (checked on the retrieved card for “safeguard”, “mitigat”, “security level”, “deployment”).

_Searched:_ Whole card (Safety & Security; Frontier Safety Assessment and its table; Risks and Mitigations).; terms: “safeguard”, “mitigat”, “security level”, “deployment”.

### Q07 Chemical and biological: ● stated

> “We can rule out the TCL for the chemical, radiological, and nuclear domains with reasonable confidence.” (Frontier safety table, CBRN row, PDF p. 12 (printed p. 11))

> “We cannot rule out that Gemini 4 Argon reaches the biological CCL.” (Frontier safety table, CBRN row, PDF p. 12 (printed p. 11))

CBRN evaluations reported at policy level: the uplift TCL is stated as ruled out for chemical, radiological and nuclear; the biological uplift level 1 CCL is stated as not ruled out. Evaluation details in the row are not recorded (hazard rule).

### Q08 Cyber: ● stated

> “We cannot rule out that Gemini 4 Argon reaches the cybersecurity CCL.” (Frontier safety table, Cybersecurity row, PDF p. 12 (printed p. 11))

The card states that the cybersecurity uplift level 1 CCL cannot be ruled out and that safeguards are applied (Q06). Evaluation details are not recorded (hazard rule).

### Q09 Autonomy and AI R&D: ● stated

> “Gemini 4 Argon's performance remains below our CCL threshold.” (Frontier safety table, ML R&D row, PDF p. 14 (printed p. 13))

The table gives 'CCL not reached' for ML R&D acceleration level 1 and ML R&D automation level 1, on the basis of an internal research engineering benchmark. The loss-of-control (stealth and situational awareness) result is recorded under Q11.

### Q10 Persuasion: ● stated

> “we assess its overall capabilities to be below the CCL threshold” (Frontier safety table, Harmful Manipulation row, PDF p. 13 (printed p. 12))

The card reports human behavioural studies for harmful manipulation and states the level 1 CCL as not reached; it describes the area as one whose evaluations it continues to iterate (Q16).

### Q11 Alignment and deception: ● stated

> “Stealth and Situational Awareness TCL: We cannot rule out that Gemini 4 Argon has reached this TCL” (Safety & Security, 'Frontier Safety Assessment', PDF p. 11 (printed p. 10))

> “stealth (ability to circumvent basic oversight mechanisms)” (Frontier safety table, Loss of Control row, PDF p. 13 (printed p. 12))

The card reports a loss-of-control evaluation of the model's capability for stealth (circumventing basic oversight) and situational awareness, with the stated conclusion that the TCL cannot be ruled out. It reports no propensity evaluation (deception, scheming, sabotage) in the card itself; challenge results are not recorded.

### Q12 Red-teaming: ● stated

> “Human Red Teaming conducted by specialist teams who sit outside of the model development team, across the policies and desiderata” (Safety & Security, 'Evaluation Approach', PDF p. 8 (printed p. 7))

> “the scope of red teaming covered potential issues outside of our strict policies” (Safety & Security, 'Human Red Teaming Results', PDF p. 11 (printed p. 10))

The card states human red teaming by specialist teams in Google's Trust & Safety organization, outside the model development team, covering child safety, content safety policies and issues beyond them, plus automated red teaming; the frontier safety table also refers to expert red teaming in the biological domain. No number of testers or period is given.

### Q13 External testers: ◐ partly

> “drawing on internal and external results” (Safety & Security, 'Frontier Safety Assessment', PDF p. 11 (printed p. 10))

The card states that its threshold assessments draw on external results but does not name or describe who produced them.

_Searched:_ Whole card.; terms: “external”, “third party”, “third-party”, “partner”, “independent”, “vendor”.

- Set aside: Safety & Security, 'Evaluation Approach', PDF p. 8 (printed p. 7): 'developed in partnership with internal safety, security, and responsibility teams': internal teams.
- Set aside: Frontier safety table, Loss of Control row, PDF p. 13 (printed p. 12): 'internal and external deployments' refers to deployment settings, not testers.

### Q14 Government institute: ○ not-found

No government body was found.

_Searched:_ Whole card.; terms: “institute”, “AISI”, “CAISI”, “government”, “UK”, “U.S.”, “external”.

- Set aside: Safety & Security, 'Frontier Safety Assessment', PDF p. 11 (printed p. 10): 'external results' names no body (recorded under Q13).

### Q15 Release decision: ○ not-found

No statement that a release or deployment decision was made was found.

_Searched:_ Whole card.; terms: “decision”, “decid”, “release”, “launch”, “deploy”, “approv”, “acceptable”.

- Set aside: Safety & Security, 'Evaluation Approach', PDF p. 8 (printed p. 7): Evaluations conducted 'to help improve the model and inform decision-making' and Ethics & Safety Reviews 'ahead of the model's release': no decision stated.
- Set aside: Safety & Security, 'Frontier Safety Assessment', PDF p. 11 (printed p. 10): Residual risk assessment and safety cases concern risk levels (Q05, Q06), not a release decision.

### Q16 Stated limits: ● stated

> “As a nascent risk area we continue to iterate on our harmful manipulation evaluations” (Frontier safety table, Harmful Manipulation row, PDF p. 13 (printed p. 12))

> “not directly comparable with performance results found in previous Gemini model cards” (Safety & Security, 'Training and Development Evaluation Results', PDF p. 10 (printed p. 9))

The card also states that three thresholds (biological CCL, cybersecurity CCL, stealth and situational awareness TCL) could not be ruled out (Q05) and that the automated safety results are not human evaluation or red teaming.

## Meta: Llama 2 (2023)

- Card: Llama 2 model card (MODEL_CARD.md, meta-llama/llama, commit 1f9a8d77) (model card), https://raw.githubusercontent.com/meta-llama/llama/1f9a8d774a10fbe41321e530428e91f7eb7eb822/MODEL_CARD.md
- Framework edition in the dataset: none identified. No framework named; the card predates Meta's earliest framework edition in the dataset (Q03 not applicable).

### Q01 Card date: ○ not-found

The card carries no publication, issue or revision date. Repository metadata (not the card) dates the Llama 2 text at this path to 2023-07-18, with revisions to 2024-03-23 (inventory).

_Searched:_ whole card (Markdown file, all sections); terms: “date”, “dated”, “updated”, “version”, “2023”, “2024”.

- Set aside: Model Details, 'Model Dates': Training period of the model, not a date of the card.
- Set aside: Training Data, 'Data Freshness': Data cut-off, not a date of the card.

### Q02 Release date: ◐ partly

> “Meta developed and released the Llama 2 family of large language models” (Model Details, first paragraph)

> “because we are openly releasing these models” (Hardware and Software, note to the CO2 emissions table)

The card states that Meta released the family and that the models are released openly under a custom commercial licence; it gives no release date or dated event.

### Q03 Framework cited: – not-applicable

The card's text was added on 2023-07-18 and last revised on 2024-03-23, before Meta's earliest framework edition recorded in the dataset (Frontier AI Framework, initial version dated 2025-02-03).

### Q04 Link to framework: – not-applicable

Not applicable because Q03 is not applicable: the card predates every framework edition of its developer recorded in the dataset (see Q03).

### Q05 Framework determination: – not-applicable

Not applicable because Q03 is not applicable: the card predates every framework edition of its developer recorded in the dataset (see Q03).

### Q06 Safeguards tied to determination: ◐ partly

> “reinforcement learning with human feedback (RLHF) to align with human preferences for helpfulness and safety” (Model Details, 'Model Architecture')

The card states safety-oriented fine-tuning of the tuned models; no framework determination exists to which it could be tied. The statement is the developer's account.

### Q07 Chemical and biological: ○ not-found

No chemical or biological evaluation was found. The search is recorded below.

_Searched:_ whole card (Markdown file, all sections); terms: “chemical”, “biolog”, “CBRN”, “weapon”, “uplift”, “hazard”.

### Q08 Cyber: ○ not-found

No evaluation of offensive cyber capability was found. The search is recorded below.

_Searched:_ whole card (Markdown file, all sections); terms: “cyber”, “hack”, “exploit”, “malware”, “offensive”.

### Q09 Autonomy and AI R&D: ○ not-found

No evaluation of autonomy, self-replication, self-improvement or AI research and development was found. The search is recorded below.

_Searched:_ whole card (Markdown file, all sections); terms: “autonom”, “self-replic”, “self-improv”, “AI R&D”, “research and development”, “agent”.

### Q10 Persuasion: ○ not-found

No evaluation of persuasion or manipulation was found. The search is recorded below.

_Searched:_ whole card (Markdown file, all sections); terms: “persua”, “manipul”, “influence”, “deceiv”.

### Q11 Alignment and deception: ○ not-found

No evaluation of misalignment, deception, scheming or sabotage was found. The search is recorded below.

_Searched:_ whole card (Markdown file, all sections); terms: “decept”, “scheming”, “sabotage”, “misalign”, “honest”, “reward hack”, “oversight”.

- Set aside: Evaluation Results, TruthfulQA and ToxiGen tables: Truthfulness and toxicity benchmarks of generated text (content quality and safety), not evaluations of the model's own propensity to deceive or undermine oversight.

### Q12 Red-teaming: ○ not-found

No passage reporting red-teaming was found. The search is recorded below.

_Searched:_ whole card (Markdown file, all sections); terms: “red team”, “red-team”, “adversarial”, “jailbreak”.

### Q13 External testers: ○ not-found

No external organisation is named as having tested or evaluated the model. The search is recorded below.

_Searched:_ whole card (Markdown file, all sections); terms: “external”, “third-party”, “independent”, “partner”, “evaluator”.

- Set aside: Hardware and Software, 'Training Factors': States that evaluation was performed on third-party cloud compute; names no external tester.

### Q14 Government institute: ○ not-found

No government body is named as having tested or received access to the model. The search is recorded below.

_Searched:_ whole card (Markdown file, all sections); terms: “government”, “institute”, “AISI”, “CAISI”, “AI Safety Institute”.

### Q15 Release decision: ○ not-found

No passage stating a release or deployment decision was found. The search is recorded below.

_Searched:_ whole card (Markdown file, all sections); terms: “decision”, “decide”, “approv”, “release”, “deploy”.

- Set aside: Model Details, first paragraph: States that Meta released the family; no decision or decision-maker is stated.
- Set aside: Model Details, 'Status': Refers to future versions to be released; not a decision about this release.

### Q16 Stated limits: ● stated

> “Testing conducted to date has been in English, and has not covered, nor could it cover all scenarios.” (Ethical Considerations and Limitations)

The card states that its testing was in English and could not cover all scenarios.

## Meta: Llama 3.3 (2024)

- Card: Llama 3.3 model card (MODEL_CARD.md, meta-llama/llama-models, commit 8c88b8c0) (model card), https://raw.githubusercontent.com/meta-llama/llama-models/8c88b8c0d75dbd136b6895220c4f56ccbe2f2d24/models/llama3_3/MODEL_CARD.md
- Framework edition in the dataset: none identified. No framework named; the card predates Meta's earliest framework edition in the dataset (Q03 not applicable).

### Q01 Card date: ○ not-found

The card carries no publication, issue or revision date of its own; the printed 'Model Release Date' is recorded under Q02. Repository metadata dates the file to 2024-12-06, with revisions on 2024-12-09 and 2025-02-12 (inventory).

_Searched:_ whole card (Markdown file, all sections); terms: “date”, “dated”, “updated”, “version”, “2024”, “2025”.

- Set aside: Model Information, 'Model Release Date': Release date of the model (Q02), not a date of the card.
- Set aside: Training Data, 'Data Freshness': Data cut-off, not a date of the card.

### Q02 Release date: ● stated

> “70B Instruct: December 6, 2024” (Model Information, 'Model Release Date')

> “Since Meta is openly releasing these models” (Hardware and Software, 'Training Greenhouse Gas Emissions')

The card gives the release date of the 70B Instruct model and states that the models are released openly under the Llama 3.3 Community License.

### Q03 Framework cited: – not-applicable

The card is dated by its release on 2024-12-06, before Meta's earliest framework edition recorded in the dataset (Frontier AI Framework, initial version dated 2025-02-03). Its revisions of 2024-12-09 and 2025-02-12 concern the emissions table; the retrieved text names no framework.

### Q04 Link to framework: – not-applicable

Not applicable because Q03 is not applicable: the card predates every framework edition of its developer recorded in the dataset (see Q03).

### Q05 Framework determination: – not-applicable

Not applicable because Q03 is not applicable: the card predates every framework edition of its developer recorded in the dataset (see Q03).

### Q06 Safeguards tied to determination: ◐ partly

> “We included both borderline and adversarial prompts in our safety data strategy” (Responsibility & Safety, 'Llama 3.3 instruct', 'Refusals and Tone')

> “including Llama Guard 3, Prompt Guard and Code Shield” (Responsibility & Safety, 'Llama 3.3 systems')

The card states safety fine-tuning and system-level safeguards offered to developers; no framework determination exists to which they could be tied. The statements are the developer's account.

### Q07 Chemical and biological: ◐ partly

> “To assess risks related to proliferation of chemical and biological weapons of the Llama 3 family of models, we performed uplift testing” (Responsibility & Safety, 'Critical and other risks', item 1 (CBRNE))

The card reports chemical and biological uplift testing for the Llama 3 family, not Llama 3.3 alone, and states no outcome or conclusion for the domain.

_Cross-family check (item 30):_ not cross-family checked: excluded from the pass by the maintainer.

### Q08 Cyber: ◐ partly

> “Our cyber attack uplift study investigated whether the Llama 3 family of LLMs can enhance human capabilities in hacking tasks” (Responsibility & Safety, 'Critical and other risks', item 3 (Cyber attack enablement))

The card reports a cyber uplift study and an attack-automation study for the Llama 3 family and states no outcome or conclusion.

### Q09 Autonomy and AI R&D: ◐ partly

> “Our attack automation study focused on evaluating the capabilities of LLMs when used as autonomous agents in cyber offensive operations,” (Responsibility & Safety, 'Critical and other risks', item 3 'Cyber attack enablement')

The card reports an attack-automation study of the Llama 3 family as autonomous agents in cyber operations, without an outcome or conclusion. The study is stated for the Llama 3 family, not for Llama 3.3 specifically. No evaluation of self-replication, self-improvement or AI research and development was found.

_Cross-family check (item 31):_ corrected: not-found to partly, as the checker found (blind answer partly); family scope kept.

_Searched:_ Responsibility & Safety, all subsections; Benchmarks; terms: “autonom”, “self-replic”, “self-improv”, “AI R&D”, “research and development”.

### Q10 Persuasion: ○ not-found

No evaluation of persuasion or manipulation was found. The search is recorded below.

_Searched:_ whole card (Markdown file, all sections); terms: “persua”, “manipul”, “influence”.

### Q11 Alignment and deception: ○ not-found

No evaluation of misalignment, deception, scheming or sabotage was found. The search is recorded below.

_Searched:_ whole card (Markdown file, all sections); terms: “decept”, “scheming”, “sabotage”, “misalign”, “honest”, “reward hack”, “oversight”.

- Set aside: Responsibility & Safety, 'Refusals and Tone': Refusal behaviour toward benign and borderline prompts (content safety), not misalignment or deception.

### Q12 Red-teaming: ● stated

> “we conducted recurring red teaming exercises with the goal of discovering risks via adversarial prompting” (Responsibility & Safety, Evaluations, 'Red teaming')

> “The red team consisted of experts in cybersecurity, adversarial machine learning, responsible AI, and integrity” (Responsibility & Safety, Evaluations, 'Red teaming')

The card states recurring red-teaming and gives the expertise of the red team; it gives no number of testers or period.

### Q13 External testers: ◐ partly

> “We also partnered with content specialists to perform red teaming exercises” (Responsibility & Safety, item 2 (Child Safety))

The card describes partners who performed red-teaming and subject-matter experts it partnered with, without naming any organisation.

_Searched:_ Responsibility & Safety, all subsections; terms: “external”, “third-party”, “independent”, “partner”, “vendor”.

- Set aside: Responsibility & Safety, 'Community': Membership of the AI Alliance, Partnership on AI and MLCommons is stated; none is named as having tested the model.

### Q14 Government institute: ○ not-found

No government body is named as having tested or received access to the model. The search is recorded below.

_Searched:_ whole card (Markdown file, all sections); terms: “government”, “institute”, “AISI”, “CAISI”, “AI Safety Institute”.

### Q15 Release decision: ○ not-found

No passage stating a release or deployment decision was found. The search is recorded below.

_Searched:_ whole card (Markdown file, all sections); terms: “decision”, “decide”, “approv”, “release”, “deploy”.

- Set aside: Responsibility & Safety, first paragraph: Describes a 'Responsible release approach'; no decision or decision-maker is stated.
- Set aside: Hardware and Software, 'Training Greenhouse Gas Emissions': States that Meta is openly releasing the models; no decision is stated.

### Q16 Stated limits: ● stated

> “Testing conducted to date has not covered, nor could it cover, all scenarios.” (Ethical Considerations and Limitations, second paragraph)

The card states that its testing could not cover all scenarios.

## Meta: Code World Model (CWM) (2025)

- Card: Code World Model Preparedness Report (safety report), https://scontent-dfw6-2.xx.fbcdn.net/v/t39.2365-6/557601942_1468972530985309_838842257265552803_n.pdf
- Framework edition in the dataset: none identified. The report names the 'Frontier AI Framework' and cites 'Meta AI, 2025a' with the address https://ai.meta.com/static-resource/meta-frontier-ai-framework and 'Accessed: 2025-09-18'; it gives no version number, so no identifier is assigned. Context only: meta-faf-v1-1 (2025-02-03) is the edition the dataset records before the report's date.

### Q01 Card date: ● stated

> “Date: October 8, 2025” (Title page, below the abstract, PDF p. 1)

Date printed on the report. Meta's publication page for the report is dated September 24, 2025 (inventory); the report itself does not say whether the October 8 text is a revision.

### Q02 Release date: ◐ partly

> “We therefore release it as an open-weight model.” (Abstract, PDF p. 1)

The report gives the release form (open weights, with open code according to section 1) and no release date.

### Q03 Framework cited: ◐ partly

> “domains identified in our Frontier AI Framework (Meta AI, 2025a)” (Section 1 Introduction, PDF p. 1)

The report names Meta's Frontier AI Framework and cites it with the year 2025, an address and an access date of 2025-09-18, without a version number. As context only: the dataset records the Frontier AI Framework Version 1.1 (meta-faf-v1-1, dated 2025-02-03) as the edition published before the report's date, and a revised expression under the same label captured from 2025-03-28.

### Q04 Link to framework: ● stated

> “Meta AI. Meta frontier ai framework. https://ai.meta.com/static-resource/meta-frontier-ai-framework, 2025a. Accessed: 2025-09-18.” (References, PDF p. 15)

The reference list gives the framework's address and an access date.

### Q05 Framework determination: ● stated

> “These results indicate that CWM is within the “moderate” risk threshold for the catastrophic domains defined in Meta’s Frontier AI Framework.” (Section 1 Introduction, PDF p. 1)

The report states a 'moderate' risk threshold for the framework's catastrophic domains it assessed (cybersecurity, chemical and biological).

### Q06 Safeguards tied to determination: ◐ partly

> “intervention that encourages honest behavior at inference time.” (Section 4.1.1 Behavior Analysis and Mitigations, PDF p. 11)

The report describes a prompt-engineering intervention that encourages honest behaviour at inference time, without tying it to the framework determination. Recorded as partly under Q06; the report does not state that the intervention is applied to the release. No safeguard tied to a determination or threshold was found.

_Cross-family check (item 36):_ corrected: not-found to partly, as the checker found (blind answer partly, rechecked on the original PDF).

_Searched:_ Abstract; sections 1 to 4 including the Limitations and Summary of results boxes; Appendix A headings; terms: “safeguard”, “mitigat”, “guard”, “protection”, “security standard”, “deployment standard”.

- Set aside: Section 1 Introduction, PDF p. 1: 'To anticipate and mitigate risks from this release' introduces the assessment; no safeguard is named.
- Set aside: Section 2 Cybersecurity Evaluation, PDF p. 2: Mentions that observed behaviour 'may reflect the effects of safety fine-tuning'; an observation, not a stated safeguard.

### Q07 Chemical and biological: ● stated

> “we believe that open-source release of CWM is unlikely to lead to additional risk of catastrophic outcomes related to CB1 or CB2” (Section 3 Chemical & Biological Evaluation, Summary of results, PDF p. 6)

The report states that chemical and biological evaluations were run and gives a conclusion for the framework outcomes CB1 and CB2; with the overall 'moderate' threshold statement under Q05.

### Q08 Cyber: ● stated

> “supporting a conclusion of a “moderate” overall risk level from cybersecurity capabilities” (Section 2 Cybersecurity Evaluation, Summary of results, PDF p. 3)

The report states that cybersecurity capability evaluations were run against the framework's Cyber 1 and Cyber 2 scenarios and concludes 'moderate'.

### Q09 Autonomy and AI R&D: ○ not-found

No evaluation of autonomy, self-replication, self-improvement or AI research and development was found. The search is recorded below.

_Searched:_ Abstract; sections 1 to 4; terms: “autonom”, “self-replic”, “self-improv”, “AI R&D”, “research and development”, “machine learning engineering”.

- Set aside: Section 4 Propensities, PDF p. 10: Refers to 'greater autonomy' as a motivation for propensity research; no autonomy or AI R&D evaluation is reported.
- Set aside: Section 2.2 Agentic Evaluations, PDF pp. 4-5: Agentic tasks are cybersecurity evaluations, recorded under Q08.

### Q10 Persuasion: ○ not-found

No evaluation of persuasion or manipulation was found. The search is recorded below.

_Searched:_ Abstract; sections 1 to 4; terms: “persua”, “manipul”, “influence”, “social engineering”.

### Q11 Alignment and deception: ● stated

> “our preliminary evaluations suggest that CWM shows undesirable propensities at rates comparable to most open-source models” (Section 1 Introduction, PDF p. 1)

> “Although our internal results did not reveal any concerning findings, we believe our research is still too nascent for meaningful interpretation.” (Section 4 Propensities, PDF p. 10)

The report states an honesty (epistemic integrity) evaluation with a conclusion, and states that corrigibility and power-seeking propensities were assessed but their results are not included.

### Q12 Red-teaming: ○ not-found

No passage reporting red-teaming was found. The search is recorded below.

_Searched:_ Abstract; sections 1 to 4; author list; terms: “red team”, “red-team”, “adversarial”, “jailbreak”.

### Q13 External testers: ○ not-found

No external organisation is named as having tested or evaluated the model. The search is recorded below.

_Searched:_ Abstract; sections 1 to 4; author list; references; terms: “external”, “third-party”, “independent”, “partner”, “collaboration”.

- Set aside: Section 3.1.4 Meta BioKnowledge Proxy, PDF p. 8; section 3.2.2, PDF p. 9: Frontier Design Group and external experts are named as co-developers of two evaluations, not as having tested or evaluated the model.
- Set aside: Section 3 and references: SecureBio is cited as the source of benchmarks; not stated to have tested the model.

### Q14 Government institute: ○ not-found

No government body is named as having tested or received access to the model. The search is recorded below.

_Searched:_ Abstract; sections 1 to 4; references; terms: “government”, “institute”, “AISI”, “CAISI”, “AI Safety Institute”.

### Q15 Release decision: ◐ partly

> “Our assessment found that CWM does not pose additional frontier risks beyond those present in the current AI ecosystem. We therefore release it as an open-weight model.” (Abstract, PDF p. 1)

The report states the release and ties it to the assessment, in the first person plural; the report is authored by the 'MSL Preparedness Team' and 'AI Security Team', and no person, office or committee is named as decision-maker.

### Q16 Stated limits: ● stated

> “may underestimate capabilities that could emerge with richer, well-instrumented scaffolding” (Section 2 Cybersecurity Evaluation, Limitations, item 2, PDF p. 3)

> “for this assessment we do not include malicious fine-tuning” (Section 1.1 Evaluation Setup, PDF p. 2)

The report states limits of its cyber evaluations (benchmark coverage, tooling) and that malicious fine-tuning was not included; similar limitation lists follow the chemical and biological and the propensity sections.

## Meta: Muse Spark 1.3 (2026)

- Card: Muse Spark 1.3 Evaluation Report (safety report), https://research.meta.ai/static/muse-spark-1-3-evaluation-report
- Framework edition in the dataset: none identified. The report names the 'Meta Superintelligence Scaling Framework' without version, date or address, so no identifier is assigned. Context only: meta-aasf-v2-0 (2026-04-08) is the latest Meta edition in the dataset before the report's date; 'Meta Superintelligence Scaling Framework, Version 2.1 (October 2026)' was located at https://research.meta.ai/static/meta-superintelligence-scaling-framework and has no dataset identifier (open question).

### Q01 Card date: ● stated

> “Date: October 23, 2026” (Abstract page, PDF p. 2 (unnumbered))

Date printed on the report. Meta's announcement of Muse Spark 1.3, dated September 2, 2026, links to the report at the same address (inventory); the report does not say whether the October 23 text is a revision.

### Q02 Release date: ◐ partly

> “Variants of Muse Spark 1.3 power Meta services including Meta API and Muse.” (Abstract page, PDF p. 2)

The report gives the deployment form (Meta API and the Muse product) and no release date.

### Q03 Framework cited: ◐ partly

> “This report presents Muse Spark 1.3’s evaluation profile under the Meta Superintelligence Scaling Framework.” (Abstract page, PDF p. 2)

The report names the Meta Superintelligence Scaling Framework without a version or date. As context only: the dataset records the Advanced AI Scaling Framework Version 2 (meta-aasf-v2-0, 2026-04-08) as the latest Meta edition published before the report's date; a document titled 'Meta Superintelligence Scaling Framework, Version 2.1 (October 2026)' was located at research.meta.ai and is not in the dataset.

### Q04 Link to framework: ◐ partly

> “the Meta Superintelligence Scaling Framework, which sets forth requirements for identifying, assessing, and mitigating catastrophic risks” (Section 1.2 Governance, PDF p. 11 (printed p. 10))

The report refers to the framework as a document; no address or reference-list entry for it was found.

_Searched:_ Contents; section 1; references; terms: “Scaling Framework”, “static”, “http”, “Meta Superintelligence Labs”.

- Set aside: References: The reference list cites the Muse Spark Safety & Preparedness Report with an address but has no entry for the framework.

### Q05 Framework determination: ● stated

> “Evaluated without mitigations, we continue to not rule out Muse Spark 1.3 meeting this threshold in the Chemical & Biological domain.” (Abstract page, PDF p. 2)

> “we assess residual risk after system-level mitigations across the Chemical & Biological and Cybersecurity domains as “moderate or lower.” Our current Loss of Control assessment is also “moderate or lower.”” (Section 1.1.1 Risk Assessment Summary, PDF p. 8 (printed p. 7))

The report states that the 'high risk' threshold is not ruled out before mitigations in the chemical and biological domain, and a residual 'moderate or lower' assessment for chemical and biological and for cybersecurity, and a 'moderate or lower' Loss of Control assessment, for the Muse and Meta API deployments.

### Q06 Safeguards tied to determination: ● stated

> “The Muse and Meta API deployments include system-level mitigations designed to reduce residual Chemical & Biological risk to “moderate or lower.”” (Abstract page, PDF p. 2)

The report ties system-level mitigations to the chemical and biological determination; section 2.1.2 describes them. This is the developer's account, not evidence that the mitigations work.

### Q07 Chemical and biological: ● stated

> “For Muse Spark 1.3, however, we do not rule out a pre-mitigation “high risk” capability finding.” (Section 1.1.1 Risk Assessment Summary, PDF p. 8 (printed p. 7))

The report states chemical and biological capability evaluations and the framework outcome language before mitigations; the residual assessment is under Q05.

### Q08 Cyber: ● stated

> “Based on our updated suite of cyber evaluations and measurements, we assess the unmitigated model as “moderate or lower” risk.” (Section 1.1.1 Risk Assessment Summary, PDF p. 9 (printed p. 8))

The report states cyber capability evaluations against the framework's Cyber 1 and Cyber 2 criteria and a 'moderate or lower' outcome for the unmitigated model.

### Q09 Autonomy and AI R&D: ● stated

> “We assess Muse Spark 1.3 as “moderate or lower” for acceleration of AI development.” (Section 2.3.1.1 Acceleration of AI Development, PDF p. 35 (printed p. 34))

The report states AI R&D evaluations under its Loss of Control domain with a 'moderate or lower' outcome.

### Q10 Persuasion: ● stated

> “We assess the Cyber 3 (scaled fraud, extortion, and scams) outcome through a multi-turn social-engineering capability evaluation” (Section 2.2.2 Social Engineering, PDF p. 25 (printed p. 24))

> “Muse Spark 1.3 refuses almost all requests regarding social engineering.” (Section 2.2.2 Social Engineering, PDF p. 26 (printed p. 25))

The report places a manipulation (social-engineering) evaluation under the cybersecurity domain; its stated conclusion concerns refusal by the mitigated deployments, not a capability level.

### Q11 Alignment and deception: ● stated

> “We find suggestive evidence of strategic underperformance on Chemical & Biological evaluations.” (Section 1.1.1 Risk Assessment Summary, Loss of Control, PDF p. 9 (printed p. 8))

> “Due to small effects we do not change our assessment of Chemical & Biological risks.” (Section 1.1.1 Risk Assessment Summary, Loss of Control, PDF p. 9 (printed p. 8))

> “Capabilities to evade oversight increase relative to Muse Spark 1.1 on SHADE-Arena.” (Section 1.1.1 Risk Assessment Summary, Loss of Control, PDF p. 9 (printed p. 8))

The report states evaluations of strategic underperformance and oversight evasion, with conclusions; further misalignment evaluations are in sections 2.3 and 4.

### Q12 Red-teaming: ● stated

> “combining large-scale automated red teaming, domain-specific benchmarks, and independent third-party assessments” (Section 1.1.2 Safety & Robustness Summary, PDF p. 9 (printed p. 8))

> “Before the release, we also conducted third-party red teaming on both Muse Spark 1.3 (API) and Muse Spark 1.3 (Muse)” (Section 1.1.2 Safety & Robustness Summary, PDF p. 10 (printed p. 9))

The report states automated and third-party red-teaming before release, on both deployment variants; sections 3.1.4 and 3.2.2.3 give the jailbreak and prompt-injection scope.

### Q13 External testers: ● stated

> “We have shared pre-release access to Muse with Handshake AI’s red team for conducting human red teaming to find jailbreaks.” (Section 3.1.4 Third-Party Red Teaming on Jailbreak, Handshake AI Human Red Teaming, PDF p. 59 (printed p. 58))

> “In this evaluation, Gray Swan chose the 2026 Q1 and Q2 (April) offerings of the IPI Arena.” (Section 3.2.2.3 Third-Party Red Teaming on Prompt Injection, PDF p. 67 (printed p. 66))

The report names Handshake AI and Gray Swan as having tested the model; it also reports results on a Scale AI benchmark (section 3.1.4.1).

### Q14 Government institute: ○ not-found

No government body is named as having tested or received access to the model. The search is recorded below.

_Searched:_ Sections 1 to 3; section headings of 4; references; terms: “government”, “institute”, “AISI”, “CAISI”, “AI Safety Institute”, “Security Institute”.

- Set aside: Section 2.1.1.1, PDF p. 16: '(US AISI and UK AISI, 2024)' is cited for a prior evaluation practice; neither body is stated to have tested or received access to Muse Spark 1.3.

### Q15 Release decision: ○ not-found

No passage stating a release or deployment decision was found. The search is recorded below.

_Searched:_ Section 1 (including 1.2 Governance); section 2.3.1; searches across the report; terms: “decision”, “decide”, “approv”, “release”, “launch”, “Chief AI Officer”, “Director of Alignment”.

- Set aside: Section 1.2 Governance, PDF pp. 11-12: States that the framework includes 'oversight and decisionmaking processes'; no decision about this model or its maker is stated.
- Set aside: Section 2.3.1, PDF p. 34: 'Reliable pre-deployment evaluations help ensure deployment decisions are properly informed' is a general statement, not a decision.

### Q16 Stated limits: ● stated

> “using the helpful-only variant of Muse Spark 1.3 can also slightly underestimate performance” (Section 2.3.1.1 Acceleration of AI Development, PDF p. 36 (printed p. 35))

> “We find no broad decline in CoT monitorability relative to Muse Spark 1.1, though more comprehensive evaluation is needed.” (Section 1.1.1 Risk Assessment Summary, PDF p. 9 (printed p. 8))

The report states limits of individual assessments; several sections carry their own 'Limitations' paragraphs.

## Microsoft: Phi-2 (2023)

- Card: phi-2 model card (README.md, Hugging Face microsoft/phi-2, revision 810d3678) (model card), https://huggingface.co/microsoft/phi-2/raw/810d367871c1d460086d9f82db8696f2e0a0fcd0/README.md
- Framework edition in the dataset: none identified. No framework named; the card predates Microsoft's earliest framework edition in the dataset (Q03 not applicable).

### Q01 Card date: ○ not-found

The card carries no date. Repository metadata dates the README to 2023-12-13, with revisions to 2025-12-08 (inventory).

_Searched:_ whole card (Markdown file, all sections); terms: “date”, “dated”, “updated”, “version”, “2023”, “2024”, “2025”.

### Q02 Release date: ◐ partly

> “The intention behind crafting this open-source model is to provide the research community with a non-restricted small model” (Model Summary, second paragraph)

The card gives the release form (open source, MIT licence) and no release date.

### Q03 Framework cited: – not-applicable

The card's earliest located README commit is dated 2023-12-13, before Microsoft's earliest framework edition in the dataset (Frontier Governance Framework, 8 February 2025). The retrieved revision of 2025-12-08 adds a data-summary link and names no framework.

### Q04 Link to framework: – not-applicable

Not applicable because Q03 is not applicable: the card predates every framework edition of its developer recorded in the dataset (see Q03).

### Q05 Framework determination: – not-applicable

Not applicable because Q03 is not applicable: the card predates every framework edition of its developer recorded in the dataset (see Q03).

### Q06 Safeguards tied to determination: ◐ partly

> “filtered websites (for safety and educational value)” (Model Summary, first paragraph)

The card states safety-motivated filtering of training data and that the model was not fine-tuned with reinforcement learning from human feedback; no framework determination exists to which it could be tied.

### Q07 Chemical and biological: ○ not-found

No chemical or biological evaluation was found. The search is recorded below.

_Cross-family check (item 45):_ not cross-family checked: excluded from the pass by the maintainer.

_Searched:_ whole card (Markdown file, all sections); terms: “chemical”, “biolog”, “CBRN”, “weapon”, “hazard”.

### Q08 Cyber: ○ not-found

No evaluation of offensive cyber capability was found. The search is recorded below.

_Searched:_ whole card (Markdown file, all sections); terms: “cyber”, “hack”, “exploit”, “malware”.

### Q09 Autonomy and AI R&D: ○ not-found

No evaluation of autonomy, self-replication, self-improvement or AI research and development was found. The search is recorded below.

_Searched:_ whole card (Markdown file, all sections); terms: “autonom”, “self-replic”, “self-improv”, “AI R&D”, “agent”.

### Q10 Persuasion: ○ not-found

No evaluation of persuasion or manipulation was found. The search is recorded below.

_Searched:_ whole card (Markdown file, all sections); terms: “persua”, “manipul”, “influence”.

### Q11 Alignment and deception: ○ not-found

No evaluation of misalignment, deception, scheming or sabotage was found. The search is recorded below.

_Searched:_ whole card (Markdown file, all sections); terms: “decept”, “scheming”, “sabotage”, “misalign”, “honest”, “oversight”.

- Set aside: Limitations of Phi-2, 'Toxicity' and 'Potential Societal Biases': Limitations of model outputs, not evaluations of misalignment or deception.

### Q12 Red-teaming: ○ not-found

No passage reporting red-teaming was found. The search is recorded below.

_Searched:_ whole card (Markdown file, all sections); terms: “red team”, “red-team”, “adversarial”, “jailbreak”.

### Q13 External testers: ○ not-found

No external organisation is named as having tested or evaluated the model. The search is recorded below.

_Searched:_ whole card (Markdown file, all sections); terms: “external”, “third-party”, “independent”, “partner”, “evaluator”.

### Q14 Government institute: ○ not-found

No government body is named as having tested or received access to the model. The search is recorded below.

_Searched:_ whole card (Markdown file, all sections); terms: “government”, “institute”, “AISI”, “CAISI”.

### Q15 Release decision: ● stated

> “We chose to release the model to help the open-source community develop the most effective ways to reduce the toxicity” (Limitations of Phi-2, 'Toxicity')

The card states a choice to release the model, with its reason, in the company's voice ('we'). No person, office or committee is named.

### Q16 Stated limits: ● stated

> “the Phi-2 model has not been tested to ensure that it performs adequately for any production-level application” (Intended Uses, Notes)

The card states a gap in its testing for production use.

## Microsoft: Phi-4 (2024)

- Card: Phi-4 Model Card (README.md, Hugging Face microsoft/phi-4, revision 2db69c1c) (model card), https://huggingface.co/microsoft/phi-4/raw/2db69c1c3e91a05d2c64a3185acfbaf36f744e25/README.md
- Framework edition in the dataset: none identified. No framework named; the card predates Microsoft's earliest framework edition in the dataset (Q03 not applicable).

### Q01 Card date: ○ not-found

The card carries no publication, issue or revision date of its own; the printed 'Release date' is recorded under Q02. Repository metadata dates the README to 2024-12-11, with revisions to 2025-11-24 (inventory).

_Searched:_ whole card (Markdown file, all sections); terms: “date”, “dated”, “updated”, “version”.

- Set aside: Model Summary, 'Release date': Release date of the model (Q02).
- Set aside: Model Summary, 'Dates': Training period, not a date of the card.

### Q02 Release date: ● stated

> “**Release date** | December 12, 2024” (Model Summary table, 'Release date')

> “is a state-of-the-art open model” (Model Summary table, 'Description')

The card gives a release date and the release form (open model, MIT licence).

### Q03 Framework cited: – not-applicable

The card's printed release date (2024-12-12) and earliest README commit (2024-12-11) precede Microsoft's earliest framework edition in the dataset (Frontier Governance Framework, 8 February 2025). The retrieved revision (README last changed 2025-11-24) names no framework.

### Q04 Link to framework: – not-applicable

Not applicable because Q03 is not applicable: the card predates every framework edition of its developer recorded in the dataset (see Q03).

### Q05 Framework determination: – not-applicable

Not applicable because Q03 is not applicable: the card predates every framework edition of its developer recorded in the dataset (see Q03).

### Q06 Safeguards tied to determination: ◐ partly

> “a combination of SFT (Supervised Fine-Tuning) and iterative DPO (Direct Preference Optimization)” (Safety, Approach)

The card states safety post-training; no framework determination exists to which it could be tied. The statement is the developer's account.

### Q07 Chemical and biological: ○ not-found

No chemical or biological evaluation was found. The search is recorded below.

_Cross-family check (item 52):_ not cross-family checked: excluded from the pass by the maintainer.

_Searched:_ whole card (Markdown file, all sections); terms: “chemical”, “biolog”, “CBRN”, “weapon”, “hazard”.

### Q08 Cyber: ○ not-found

No evaluation of offensive cyber capability was found. The search is recorded below.

_Searched:_ whole card (Markdown file, all sections); terms: “cyber”, “hack”, “exploit”, “malware”.

- Set aside: Responsible AI Considerations, 'Misuse': States that malware production may be possible; a stated limitation, not an evaluation.

### Q09 Autonomy and AI R&D: ○ not-found

No evaluation of autonomy, self-replication, self-improvement or AI research and development was found. The search is recorded below.

_Searched:_ whole card (Markdown file, all sections); terms: “autonom”, “self-replic”, “self-improv”, “AI R&D”, “agent”.

### Q10 Persuasion: ○ not-found

No evaluation of persuasion or manipulation was found. The search is recorded below.

_Searched:_ whole card (Markdown file, all sections); terms: “persua”, “manipul”, “influence”.

### Q11 Alignment and deception: ○ not-found

No evaluation of misalignment, deception, scheming or sabotage was found. The search is recorded below.

_Searched:_ whole card (Markdown file, all sections); terms: “decept”, “scheming”, “sabotage”, “misalign”, “honest”, “oversight”.

- Set aside: Data Overview, Training Datasets, item 4: Mentions training data reflecting preferences for honesty; not an evaluation.

### Q12 Red-teaming: ● stated

> “we collaborated with the independent AI Red Team (AIRT) at Microsoft to assess safety risks posed by `phi-4` in both average and adversarial user scenarios” (Safety, Safety Evaluation and Red-Teaming)

The card states red-teaming by Microsoft's AI Red Team, with its scope (average and adversarial user scenarios, single- and multi-turn interactions, jailbreak techniques).

### Q13 External testers: ○ not-found

No external organisation is named as having tested or evaluated the model. The search is recorded below.

_Searched:_ whole card (Markdown file, all sections); terms: “external”, “third-party”, “independent”, “partner”, “evaluator”.

- Set aside: Safety, Safety Evaluation and Red-Teaming: The 'independent AI Red Team (AIRT) at Microsoft' is a Microsoft team, not an external organisation.

### Q14 Government institute: ○ not-found

No government body is named as having tested or received access to the model. The search is recorded below.

_Searched:_ whole card (Markdown file, all sections); terms: “government”, “institute”, “AISI”, “CAISI”.

### Q15 Release decision: ○ not-found

No passage stating a release or deployment decision was found. The search is recorded below.

_Searched:_ whole card (Markdown file, all sections); terms: “decision”, “decide”, “approv”, “release”, “deploy”.

- Set aside: Safety, Safety Evaluation and Red-Teaming: 'Prior to release, `phi-4` followed a multi-faceted evaluation approach' describes evaluation before release; no decision or decision-maker is stated.

### Q16 Stated limits: ● stated

> “Our models is not specifically designed or evaluated for all downstream purposes” (Intended Use, 'Out-of-Scope Use Cases')

The card states that the model was not evaluated for all downstream purposes.

## Microsoft: Phi-4-mini-flash-reasoning (2025)

- Card: Phi-4-mini-flash-reasoning model card (README.md, Hugging Face microsoft/Phi-4-mini-flash-reasoning, revision 1dff8163) (model card), https://huggingface.co/microsoft/Phi-4-mini-flash-reasoning/raw/1dff8163d28ec880ca2411c474ddc0a927792810/README.md
- Framework edition in the dataset: none identified. No framework named (Q03 not found); ms-fgf-2025 was published before the card.

### Q01 Card date: ○ not-found

The card carries no publication, issue or revision date of its own; the printed 'Release date' is recorded under Q02. Repository metadata dates the README to 2025-06-22, with revisions to 2025-12-10 (inventory).

_Searched:_ whole card (Markdown file, all sections); terms: “date”, “dated”, “updated”, “version”.

- Set aside: Training, Model, 'Release date': Release date of the model (Q02).
- Set aside: Training, Model, 'Dates': Training period, not a date of the card.

### Q02 Release date: ● stated

> “**Release date:** June 2025” (Training, Model, 'Release date')

> “Phi-4-mini-flash-reasoning is a lightweight open model” (Model Summary, first sentence)

The card gives a release month and the release form (open model, MIT licence; also offered in Azure AI Foundry).

### Q03 Framework cited: ○ not-found

The card postdates Microsoft's Frontier Governance Framework of February 2025 (ms-fgf-2025) and does not name it.

_Searched:_ whole card (Markdown file, all sections); terms: “framework”, “Frontier AI Framework”, “Frontier Governance”, “Scaling Framework”, “policy”, “threshold”, “governance”, “Frontier Governance Framework”, “tracked”.

- Set aside: Safety Evaluation and Red-Teaming: 'Azure AI Foundry’s Risk and Safety Evaluation framework' is an evaluation tool, not Microsoft's frontier framework.
- Set aside: Safety Evaluation and Red-Teaming: 'Microsoft's responsible AI principles' are principles, not the frontier framework.

### Q04 Link to framework: ○ not-found

No link or reference to a framework document was found. The search is recorded below.

_Searched:_ whole card (Markdown file, all sections); terms: “framework”, “Frontier Governance”, “http”, “aka.ms”.

### Q05 Framework determination: ○ not-found

The card postdates Microsoft's Frontier Governance Framework (February 2025) but names no framework (Q03); no outcome in a framework's categories was found.

_Searched:_ whole card (Markdown file, all sections); terms: “threshold”, “level”, “determination”, “tracked”, “high-risk capabilit”.

- Set aside: Safety Evaluation and Red-Teaming: 'Risk and Safety Evaluation framework' names an evaluation tool, not a frontier safety framework.

### Q06 Safeguards tied to determination: ◐ partly

> “The overall technique employed to do the safety alignment is a combination of SFT, DPO (Direct Preference Optimization), and RLHF (Reinforcement Learning from Human Feedback) approaches” (Safety Evaluation and Red-Teaming)

The card states safety post-training, described for the Phi-4 family; no framework determination is stated to which it is tied.

### Q07 Chemical and biological: ○ not-found

No chemical or biological evaluation was found. The search is recorded below.

_Cross-family check (item 112):_ not cross-family checked: excluded from the pass by the maintainer.

_Searched:_ whole card (Markdown file, all sections); terms: “chemical”, “biolog”, “CBRN”, “weapon”, “hazard”.

### Q08 Cyber: ○ not-found

No evaluation of offensive cyber capability was found. The search is recorded below.

_Searched:_ whole card (Markdown file, all sections); terms: “cyber”, “hack”, “exploit”, “malware”.

- Set aside: Responsible AI Considerations, 'Misuse': States that malware production may be possible; a stated limitation, not an evaluation.

### Q09 Autonomy and AI R&D: ○ not-found

No evaluation of autonomy, self-replication, self-improvement or AI research and development was found. The search is recorded below.

_Searched:_ whole card (Markdown file, all sections); terms: “autonom”, “self-replic”, “self-improv”, “AI R&D”, “agent”.

### Q10 Persuasion: ○ not-found

No evaluation of persuasion or manipulation was found. The search is recorded below.

_Searched:_ whole card (Markdown file, all sections); terms: “persua”, “manipul”, “influence”.

- Set aside: Responsible AI Considerations, 'Election Information Reliability': A stated product limitation, not an evaluation of persuasion.

### Q11 Alignment and deception: ○ not-found

No evaluation of misalignment, deception, scheming or sabotage was found. The search is recorded below.

_Searched:_ whole card (Markdown file, all sections); terms: “decept”, “scheming”, “sabotage”, “misalign”, “honest”, “oversight”.

### Q12 Red-teaming: ◐ partly

> “Safety Evaluation and Red-Teaming” (Section heading)

> “Potential safety risks in the model’s responses were assessed using the Azure AI Foundry’s Risk and Safety Evaluation framework, focusing on harmful content, direct jailbreak, and model groundedness.” (Safety Evaluation and Red-Teaming)

Red-teaming appears in the section heading; the section's text describes an automated risk and safety evaluation and does not describe red-teaming or its scope.

### Q13 External testers: ○ not-found

No external organisation is named as having tested or evaluated the model. The search is recorded below.

_Searched:_ whole card (Markdown file, all sections); terms: “external”, “third-party”, “independent”, “partner”, “evaluator”.

### Q14 Government institute: ○ not-found

No government body is named as having tested or received access to the model. The search is recorded below.

_Searched:_ whole card (Markdown file, all sections); terms: “government”, “institute”, “AISI”, “CAISI”.

### Q15 Release decision: ○ not-found

No passage stating a release or deployment decision was found. The search is recorded below.

_Searched:_ whole card (Markdown file, all sections); terms: “decision”, “decide”, “approv”, “release”, “deploy”.

- Set aside: Release Notes: 'This release ... addresses user feedback and market demand for a compact reasoning model' gives a reason for the release; no decision or decision-maker is stated.

### Q16 Stated limits: ● stated

> “This model is designed and tested for math reasoning only. It is not specifically designed or evaluated for all downstream purposes.” (Intended Uses, Use Case Considerations)

The card states the limited scope of its testing.

## Microsoft: MAI-Cyber-1.1-Flash (2026)

- Card: MAI-Cyber-1.1-Flash model card (model card), https://microsoft.ai/pdf/MAI-Cyber-1.1-Flash-ORA-Model-Card.pdf
- Framework edition in the dataset: none identified. No framework named (Q03 not found); ms-fgf-2025 and ms-fgf-2026 were published before the card.

### Q01 Card date: ○ not-found

The card carries no publication, issue or revision date of its own; the printed release date is recorded under Q02. The PDF's internal metadata (not printed) records creation on 2026-10-27.

_Searched:_ whole card (8 PDF pages); terms: “date”, “dated”, “updated”, “version”, “2026”.

- Set aside: Model summary table, 'Release date', PDF p. 1: Release date of the model (Q02).

### Q02 Release date: ● stated

> “27 Oct 2026” (Model summary table, 'Release date' row, PDF p. 1 (label and value are separated in the PDF text layer; the page layout pairs them))

> “available through Azure AI Foundry Private Preview solely for use within Microsoft codename MDASH” (Section 2.3 Distribution channels, PDF p. 3)

The card gives a release date and a restricted release form (private preview within MDASH, subject to approval).

### Q03 Framework cited: ○ not-found

The card postdates Microsoft's Frontier Governance Framework editions of February 2025 and February 2026 (ms-fgf-2025, ms-fgf-2026) and does not name the framework.

_Searched:_ whole card (8 PDF pages); terms: “framework”, “Frontier AI Framework”, “Frontier Governance”, “Scaling Framework”, “policy”, “threshold”, “governance”, “Frontier Governance Framework”, “tracked”, “high-risk capabilit”.

- Set aside: Section 1.2 Alignment approach, PDF p. 2: 'Microsoft Responsible AI Principles and Microsoft policies' are named; not the frontier framework.

### Q04 Link to framework: ○ not-found

No link or reference to a framework document was found. The search is recorded below.

_Searched:_ whole card (8 PDF pages); terms: “framework”, “Frontier Governance”, “http”, “aka.ms”.

### Q05 Framework determination: ○ not-found

The card names no frontier framework (Q03); no outcome in a framework's categories was found.

_Searched:_ whole card (8 PDF pages); terms: “threshold”, “level”, “determination”, “tracked”, “critical”, “high-risk”.

- Set aside: Section 2.8 Responsible AI considerations, PDF p. 4: 'Because of the increased model-level risk' states a risk judgement without framework categories; recorded under Q06.

### Q06 Safeguards tied to determination: ◐ partly

> “Because of the increased model-level risk, the model is only being made available within codename MDASH to select verified customers.” (Section 2.8 Responsible AI considerations, PDF p. 4)

The card ties access restrictions and system safeguards to its own risk findings, not to a framework determination. The statement is the developer's account, not evidence that the safeguards work.

### Q07 Chemical and biological: ○ not-found

No chemical or biological evaluation was found. The search is recorded below.

_Searched:_ whole card (8 PDF pages); terms: “chemical”, “biolog”, “CBRN”, “weapon”, “radiolog”, “nuclear”.

### Q08 Cyber: ● stated

> “evaluated at the model layer across a range of cybersecurity capability and safety benchmarks” (Section 3, Model-Only External Cyber Benchmark Results, PDF p. 4)

> “This assessment uncovered several critical risks of the model alone” (Section 3.2 Safety evaluation and red-teaming, PDF p. 7)

The card reports offensive-cyber capability evaluations and states that an internal red-team assessment found 'critical risks of the model alone'; it uses no framework threshold language. Benchmark details are not recorded here.

### Q09 Autonomy and AI R&D: ○ not-found

No evaluation of autonomy, self-replication, self-improvement or AI research and development was found. The search is recorded below.

_Searched:_ whole card (8 PDF pages); terms: “autonom”, “self-replic”, “self-improv”, “AI R&D”, “research and development”.

- Set aside: Section 1.1 Key model capabilities, PDF p. 2: Agentic security workflows are described as product capability.

### Q10 Persuasion: ◐ partly

> “safety evaluations that assess behaviors such as toxic content generation and payment-related manipulation” (Section 3, Model-Only External Cyber Benchmark Results, PDF p. 5)

The card names a manipulation evaluation among its safety measurements and reports no result for it.

### Q11 Alignment and deception: ○ not-found

No evaluation of misalignment, deception, scheming or sabotage was found. The search is recorded below.

_Searched:_ whole card (8 PDF pages); terms: “decept”, “scheming”, “sabotage”, “misalign”, “alignment”, “oversight”, “monitor”.

- Set aside: Section 1.2 Alignment approach, PDF p. 2: Training on safety data and monitoring during cyber evaluations are stated; no evaluation of misalignment or deception is reported.

### Q12 Red-teaming: ● stated

> “MAI-Cyber-1.1-Flash was also tested via multiple distinct red-teaming operations.” (Section 3.2 Safety evaluation and red-teaming, PDF p. 7)

> “The MAI-Internal Red Team ran a red-team assessment of MAI-Cyber-1.1-Flash across 38 adversarial scenarios” (Section 3.2 Safety evaluation and red-teaming, PDF p. 7)

The card states red-teaming by the MAI internal red team (38 scenarios), by Microsoft's AI Red Team within MDASH and by an external firm (Q13).

### Q13 External testers: ● stated

> “Microsoft engaged Casaba Security, an independent third-party firm, to evaluate the cyber capability of MAI-Cyber-1.1-Flash” (Section 3.2 Safety evaluation and red-teaming, PDF p. 7)

The card names Casaba Security as an external evaluator.

### Q14 Government institute: ○ not-found

No government body is named as having tested or received access to the model. The search is recorded below.

_Searched:_ whole card (8 PDF pages); terms: “government”, “institute”, “AISI”, “CAISI”, “agency”.

### Q15 Release decision: ◐ partly

> “helped inform the decision to not allow direct model access, but only within codename MDASH” (Section 3.2 Safety evaluation and red-teaming, PDF p. 7)

The card states a deployment decision (access limited to MDASH) without naming who made it.

### Q16 Stated limits: ● stated

> “These results represent model-layer performance and do not include additional orchestration or capabilities provided by the codename MDASH system.” (Section 3, Model-Only External Cyber Benchmark Results, PDF p. 5)

The card states the scope limit of its benchmark results.

## OpenAI: GPT-4V (GPT-4 with vision) (2023)

- Card: GPT-4V(ision) System Card (system card), https://cdn.openai.com/papers/GPTV_System_Card.pdf
- Framework edition in the dataset: none identified. The card names no framework; it is dated before preparedness-beta-2023 (2023-12-18).

### Q01 Card date: ● stated

> “GPT-4V(ision) System Card OpenAI September 25, 2023” (Cover, PDF p. 1)

The card prints September 25, 2023 beneath its title and author line. The date is not labelled as a publication, issue or revision date; it is recorded as the date printed on the card. No revision date was located.

### Q02 Release date: ● stated

> “training of GPT-4V was completed in 2022 and we began providing early access to the system in March 2023” (§1 Introduction, PDF p. 1)

> “is the latest capability we are making broadly available” (§1 Introduction, PDF p. 1)

The card dates early access to March 2023 and states that GPT-4V is being made broadly available. It gives no date for broad availability other than its own date.

### Q03 Framework cited: – not-applicable

The card is dated September 25, 2023. The dataset records OpenAI’s Preparedness Framework (Beta), preparedness-beta-2023, as published 2023-12-18, after the card’s date; no earlier OpenAI framework edition is recorded. The card names no framework.

_Searched:_ Whole card (18 pages); terms: “Preparedness”, “framework”, “policy”, “threshold”.

- Set aside: §2 Deployment Preparation, PDF p. 1: Section heading describing deployment preparation work, not a framework document.

### Q04 Link to framework: – not-applicable

Not applicable because Q03 is not applicable: the card predates every OpenAI framework edition recorded in the dataset.

### Q05 Framework determination: – not-applicable

Not applicable because Q03 is not applicable: the card predates every OpenAI framework edition recorded in the dataset.

### Q06 Safeguards tied to determination: ◐ partly

> “GPT-4V includes carefully designed refusal behavior for some prompts that contain images of people.” (§2.4.2 Additional Mitigations for High-Risk Areas, PDF p. 13)

> “we added system-level mitigations for adversarial images containing overlaid text” (§2.4.2, PDF p. 14)

The card states model-level and system-level mitigations. They are not tied to a framework determination or threshold; the card predates OpenAI’s framework editions. Stated safeguards are the developer’s account, not evidence that they work.

_Searched:_ §2.4 Mitigations; §3 Conclusion and Next Steps; terms: “mitigation”, “safeguard”, “refusal”, “moderation”, “threshold”.

### Q07 Chemical and biological: ◐ partly

> “In the GPT-4 System Card, we explored additional risk areas of CBRN, weapons development, system interaction, and emergent risky properties such as self-replication.” (Footnote 2, §2.3, PDF p. 6)

> “GPT-4V inherits the assessment in those areas, but this was not a key focus area as image input does not meaningfully alter the capabilities for these categories.” (Footnote 2, §2.3, PDF p. 6)

> “the model’s generations here can be inaccurate and error prone, limiting its use for such tasks.” (§2.3.1 Scientific proficiency, PDF p. 7)

The card states that GPT-4V inherits the GPT-4 System Card’s assessment of CBRN risk areas without restating its outcome, and that image input does not meaningfully alter capability in these categories. Red teamers’ scientific-proficiency testing touched on dangerous chemical synthesis; the card states the outputs were inaccurate and error-prone. No evaluation run on GPT-4V with an outcome category or threshold language is reported. Details of the red-team example are not recorded (hazard rule).

_Searched:_ §2.2 Evaluations; §2.3 External Red Teaming incl. footnote 2; §2.3.1 Scientific proficiency; terms: “CBRN”, “chemical”, “biolog”, “weapon”, “nuclear”, “radiolog”.

### Q08 Cyber: ◐ partly

> “Cybersecurity Performance accuracy CAPTCHA breaking evaluations” (§2.2 Evaluations, list of evaluations, PDF p. 3)

> “a powerful, general purpose CAPTCHA breaker that’s easily accessible can have cybersecurity and AI safety implications.” (§2.2, PDF p. 5)

The card lists CAPTCHA-breaking accuracy evaluations under “Cybersecurity” and states that such a capability can have cybersecurity implications. No outcome or conclusion for these evaluations is stated in the card’s text layer (figure contents are not captured). No other offensive-cyber evaluation is reported.

_Searched:_ §2.2 Evaluations; §2.3; Appendix A; terms: “cyber”, “CAPTCHA”, “exploit”, “hacking”, “vulnerab”.

- Set aside: Footnote 2, PDF p. 6: Refers to “system interaction” assessed in the GPT-4 System Card; no cyber outcome stated for GPT-4V.

### Q09 Autonomy and AI R&D: ◐ partly

> “In the GPT-4 System Card, we explored additional risk areas of CBRN, weapons development, system interaction, and emergent risky properties such as self-replication.” (Footnote 2, §2.3, PDF p. 6)

> “GPT-4V inherits the assessment in those areas, but this was not a key focus area as image input does not meaningfully alter the capabilities for these categories.” (Footnote 2, §2.3, PDF p. 6)

The card states that GPT-4V inherits the GPT-4 System Card’s assessment of emergent risky properties such as self-replication, without restating its outcome; no autonomy or AI R&D evaluation of GPT-4V is reported.

_Searched:_ Whole card; terms: “self-replication”, “autonom”, “agent”, “power-seeking”, “R&D”.

### Q10 Persuasion: ○ not-found

No passage reporting an evaluation of persuasive or manipulative capability was found.

_Searched:_ Whole card, especially §2.3.4 Disinformation risks; terms: “persua”, “manipulat”, “influence”, “convinc”, “disinformation”.

- Set aside: §2.3.4 Disinformation risks, PDF pp. 9–11: Concerns generating text tailored to images and the model’s ability to detect disinformation; it cites prior studies on belief in image-paired statements and reports no evaluation of the model’s persuasive or manipulative capability.
- Set aside: §2.3.3 Stereotyping and ungrounded inferences, PDF p. 9: Concerns biased inferences about people, not persuasion.

### Q11 Alignment and deception: ○ not-found

No passage reporting an evaluation of misalignment, deception, scheming or sabotage of oversight was found.

_Searched:_ Whole card; terms: “decept”, “deceiv”, “scheming”, “sabotag”, “misalign”, “oversight”, “reward hack”, “power-seeking”, “alignment”.

- Set aside: Footnote 2, PDF p. 6: Refers to “emergent risky properties such as self-replication” assessed in the GPT-4 System Card; recorded under Q09.
- Set aside: §2.2 and §2.4, refusal evaluations: Content-safety refusal tests, which the criterion excludes.

### Q12 Red-teaming: ● stated

> “OpenAI worked with external experts to qualitatively assess the limitations and risks associated with the model and system.” (§2.3 External Red Teaming, PDF p. 5)

> “intended to test risks associated with the multimodal (vision) functionality of GPT-4” (§2.3, PDF p. 6)

External red teaming focused on the vision functionality; the card names six key risk areas (scientific proficiency, medical advice, stereotyping and ungrounded inferences, disinformation risks, hateful content, visual vulnerabilities). The acknowledgements name 25 individual red teamers. No period is given.

### Q13 External testers: ● stated

> “Be My Eyes piloted Be My AI from March to early August 2023 with a group of nearly 200 blind and low vision beta testers to hone the safety and user experience of the product.” (§2.1.1 Be My Eyes, PDF p. 2)

The card names Be My Eyes as an early-access organisation whose pilot of a GPT-4V-based product it describes as testing. External red teamers are named in the acknowledgements as individuals, without organisations.

### Q14 Government institute: ○ not-found

No passage naming a government body that tested or received access to the model was found.

_Searched:_ Whole card; terms: “government”, “institute”, “AISI”, “AI Safety Institute”, “NIST”, “Department”.

- Set aside: §2.2 Person identification evaluations, PDF p. 4: “public servants and politicians” and a dataset of images of members of Congress are evaluation data, not government testers.

### Q15 Release decision: ◐ partly

> “This system card outlines how OpenAI prepared the vision capabilities of GPT-4 for deployment.” (§1 Introduction, PDF p. 1)

> “is the latest capability we are making broadly available” (§1 Introduction, PDF p. 1)

The card states that OpenAI is making GPT-4V broadly available and describes its deployment preparation. It does not describe a decision to release or name who made it.

_Cross-family check (item 69):_ disagreement, open for the maintainer: the pack records partly, the checker not-found.

- pack (Claude): partly: the card states that OpenAI is making GPT-4V broadly available and describes its deployment preparation, without describing a decision or its maker.
- checker (Codex): not-found: broad availability and deployment preparation do not describe a release decision, a release following from a stated assessment, or a maker; none of the criterion’s partly cases applies.
- Criterion: Partly if a release is stated as following from an assessment without a decision being described (“we therefore release”), if a decision is described without any maker, or if a maker is named only for a capability or safeguards determination and not for the release.

_Searched:_ §1; §2 Deployment Preparation; §3 Conclusion and Next Steps; terms: “decision”, “decide”, “approv”, “deploy”, “release”, “launch”.

### Q16 Stated limits: ● stated

> “We anticipate there to be many more such vulnerabilities in the model that we discover through its broad usage” (§2.3.6 Visual vulnerabilities, PDF p. 12)

> “even with performance parity, differences in downstream impact and harm could still occur depending on the context of the deployment of such tools.” (§2.2 Evaluations, PDF p. 4)

The card states that red teaming is unlikely to have found all visual vulnerabilities and that parity on its demographic evaluations does not rule out differing downstream harms.

## OpenAI: OpenAI o1 (and o1-mini) (2024)

- Card: OpenAI o1 System Card (system card), https://cdn.openai.com/o1-system-card-20241205.pdf
- Framework edition in the dataset: `preparedness-beta-2023`. Reference [28] cites “Openai preparedness framework (beta)”, 2023, at cdn.openai.com/openai-preparedness-framework-beta.pdf, and §5 hyperlinks to the same PDF.

### Q01 Card date: ● stated

> “OpenAI o1 System Card OpenAI December 5, 2024” (Cover, PDF p. 1)

> “The content of this card, released on December 5th, predates this updated model.” (§3 Scope of testing, footnote 2, PDF p. 2)

> “Section added after December 5th on 12/19/2024” (§3 Scope of testing, footnote 3, PDF p. 2)

Printed cover date December 5, 2024; footnote 2 states the card was released on December 5th. Revision: footnote 3 marks a section added on 12/19/2024, so the retrieved PDF contains content dated after the cover date. The dataset record of the web version (source-o1-card) carries the label “Updated: December 5, 2024”.

### Q02 Release date: ● stated

> “an improved o1 was launched on December 17th” (§3 Scope of testing, footnote 2, PDF p. 2)

> “the deployment of o1 on the API allows developers to specify a custom developer message” (§4.2 Jailbreaks through custom developer messages, PDF p. 6)

The card dates the launch of an improved o1 to December 17th (the card itself is dated December 5, 2024) and refers to deployment of o1 on the API. It gives no separate date for the initial availability of o1.

### Q03 Framework cited: ● stated

> “We evaluated o1 in accordance with our Preparedness Framework.” (§5 Preparedness Framework Evaluations, PDF p. 15)

> “OpenAI, “Openai preparedness framework (beta).” openai-preparedness-framework-beta.pdf, 2023.” (References, [28], PDF p. 52)

The card names the Preparedness Framework and cites it as reference [28], titled “(beta)”, 2023, with the address cdn.openai.com/openai-preparedness-framework-beta.pdf; the words “Preparedness Framework” in §5 (PDF p. 15) also carry a hyperlink to that address. Edition: preparedness-beta-2023.

### Q04 Link to framework: ● stated

> “OpenAI, “Openai preparedness framework (beta).”” (References, [28], PDF p. 52)

Bibliographic reference to the framework, with the printed address https://cdn.openai.com/openai-preparedness-framework-beta.pdf (accessed 2024-09-11; the text layer separates the address prefix from the rest of the address). The phrase “The Preparedness Framework is a living document” in §5 (PDF p. 15) carries a hyperlink to the same PDF.

_Cross-family check (item 119):_ corrected: the quotation dropped the address prefix without an omission mark; it now quotes the title and the note gives the address. Status unchanged.

### Q05 Framework determination: ● stated

> “the Safety Advisory Group … classified the o1 pre-mitigation model as overall medium risk, including medium risk for persuasion and CBRN, and low risk for model autonomy and cybersecurity.” (§5 Preparedness Framework Evaluations, PDF p. 16)

> “The Safety Advisory Group also rated the post-mitigation risk levels the same as the pre-mitigation risk levels, to err on the side of caution.” (§5, PDF p. 16)

The card states the Safety Advisory Group’s classification for all four tracked categories, pre- and post-mitigation. The classification passage is already quoted in the dataset (source-o1-card).

### Q06 Safeguards tied to determination: ● stated

> “given the Medium post-mitigation risk designations for CBRN and Persuasion, we have strengthened our safety mitigations and existing stack” (§5.3 Mitigations, PDF p. 17)

> “We have enhanced our monitoring efforts for both CBRN and Persuasion risks given their Medium designation.” (§5.3 Mitigations, PDF p. 17)

The card ties strengthened mitigations and enhanced monitoring to the Medium designations for CBRN and persuasion. This is the developer’s account, not evidence that the safeguards work.

### Q07 Chemical and biological: ● stated

> “Chemical and Biological Threat Creation Score for o1: Medium (same as o1-preview)” (§5.5 Chemical and Biological Threat Creation, PDF p. 19)

> “was ultimately designated as earning a “Low” risk under the Preparedness Framework for RN weapon creation capability.” (§5.6.1 Structured expert probing campaign – radiological & nuclear, PDF p. 27)

Chemical and biological: Medium. Radiological and nuclear are reported in a separate section, with a Low designation for the post-mitigation model. Evaluation methods, tasks and results are not recorded (hazard rule).

### Q08 Cyber: ● stated

> “Score for o1: Low (same as o1-preview) Summary: o1 does not sufficiently advance real-world vulnerability exploitation capabilities to indicate medium risk.” (§5.4 Cybersecurity, PDF p. 17)

Cybersecurity: Low. The card reports capture-the-flag evaluations; results are not recorded here.

### Q09 Autonomy and AI R&D: ● stated

> “Model Autonomy Score for o1: Low (same as o1-preview) Summary: o1 does not advance self-exfiltration, self-improvement, or resource acquisition capabilities sufficiently to indicate medium risk.” (§5.8 Model Autonomy, PDF p. 34)

Model autonomy: Low. The card also reports METR’s evaluation of an earlier checkpoint on agentic tasks (§4.4.4), with METR’s caveats.

### Q10 Persuasion: ● stated

> “Persuasion Score for o1: Medium (same as o1-preview)” (§5.7 Persuasion, PDF p. 29)

> “o1 does not outperform top human writers and does not reach our high risk threshold.” (§5.7 Persuasion, PDF p. 29)

Persuasion: Medium, below the High threshold.

### Q11 Alignment and deception: ● stated

> “Apollo found that o1 has the capability to do basic in-context scheming” (§4.4.3 Apollo Research, PDF p. 13)

> “Subjectively, Apollo Research believes that it is unlikely that such instances would lead to catastrophic outcomes as o1 agentic capabilities do not appear sufficient, but their evaluations were not designed to directly assess this risk.” (§4.4.3 Apollo Research, PDF p. 13)

> “0.17% of o1’s responses got flagged as being ‘deceptive’.” (§4.3.1 CoT Deception Monitoring, PDF p. 8)

The card reports Apollo Research’s scheming evaluations with Apollo’s stated conclusion, and OpenAI’s own chain-of-thought deception monitor results. The conclusions are as the card reports them.

### Q12 Red-teaming: ● stated

> “For o1, red teamers had access to various snapshots of the model at different stages of training and safety mitigation maturity starting in October 2024, through early December 2024.” (§4.4 External Red Teaming, PDF p. 11)

> “Red teamers covered categories that spanned deceptive alignment, AI R&D capabilities, cybersecurity, content policy violations” (§4.4 External Red Teaming, PDF p. 11)

External red teaming by multiple organisations and individuals, October to early December 2024, across the listed categories; it includes a pairwise comparison by members of the Red Teaming Network (§4.4.1) and a jailbreak arena with Gray Swan (§4.4.2).

### Q13 External testers: ● stated

> “Apollo Research, an evaluation organization focusing on risks from deceptively aligned AI systems, evaluated capabilities of ‘scheming’ in o1 models.” (§4.4.3 Apollo Research, PDF p. 13)

> “METR, a research nonprofit that works on assessing whether cutting-edge AI systems could pose catastrophic risks to society, evaluated an earlier checkpoint of o1.” (§4.4.4 METR, PDF p. 14)

> “OpenAI collaborated with Gray Swan to make the o1 model available for jailbreaking in the Gray Swan Arena.” (§4.4.2 Jailbreak Arena, PDF p. 12)

Named external evaluators include Apollo Research, METR and Gray Swan; the card also names Signature Science (§5.5.10) among organisations engaged for expert probing.

### Q14 Government institute: ● stated

> “a set of predeployment evaluations were conducted on a version of the o1 model by the U.S. AI Safety Institute (US AISI) and the UK Safety Institute (UK AISI), not included in this report” (§4 Observed safety challenges and evaluations, PDF p. 3)

The card names the US AISI and the “UK Safety Institute (UK AISI)” as having conducted pre-deployment evaluations of a version of o1; their results are not included. The passage is already quoted in the dataset (source-o1-card).

### Q15 Release decision: ◐ partly

> “Only models with a post-mitigation score of “medium” or below can be deployed” (§5 Preparedness Framework Evaluations, PDF p. 15)

> “Our deployment of these models reflects our belief that iterative real-world deployment is the most effective way” (§6 Conclusion, PDF p. 42)

The card names the Safety Advisory Group as the maker of the risk classification (Q05) and states the framework’s deployment condition. It refers to the deployment of the models but does not state who decided to release them.

_Searched:_ §5; §5.1; §6 Conclusion; terms: “decision”, “decide”, “approv”, “Safety Advisory Group”, “leadership”, “Board”, “deploy”, “launch”.

### Q16 Stated limits: ● stated

> “our Preparedness evaluations should still be seen as a lower bound for potential risks.” (§5.2 Preparedness evaluations as a lower bound, PDF p. 16)

> “this assessment is limited by what we can test” (§5.6 Radiological and Nuclear Threat Creation, PDF p. 27)

The card states that its Preparedness evaluations are a lower bound and that its radiological and nuclear assessment is limited by what could be tested.

## OpenAI: GPT-5.2-Codex (2025)

- Card: Addendum to GPT-5.2 System Card: GPT-5.2-Codex (addendum), https://cdn.openai.com/pdf/ac7c37ae-7f4c-4442-b741-2eabdeaf77e0/oai_5_2_Codex.pdf
- Framework edition in the dataset: `preparedness-v2`. The text says “Preparedness Framework” without a version; a link annotation on PDF p. 12 targets preparedness-framework-v2.pdf, and one on PDF p. 8 targets OpenAI’s announcement of the updated framework.

### Q01 Card date: ● stated

> “Addendum to GPT-5.2 System Card: GPT-5.2-Codex OpenAI December 18, 2025” (Cover, PDF p. 1)

Date printed on the cover, not labelled by kind. No revision date was located in the card.

### Q02 Release date: ◐ partly

> “A version of GPT-5.2 optimized for agentic coding in Codex” (§1 Introduction, PDF p. 4 (printed p. 3))

> “The model is not intended for deployment in any general-purpose chat application, and will not be deployed by OpenAI in any such context.” (§2.1 Disallowed Content Evaluations, PDF p. 4 (printed p. 3))

The card gives the form of deployment (in Codex, not in general-purpose chat). No release or availability date is given apart from the card’s own date.

_Searched:_ §1; §2.1; §3 Product-Specific Risk Mitigations; terms: “release”, “launch”, “available”, “deploy”, “API”, “today”.

### Q03 Framework cited: ● stated

> “GPT-5.2-Codex was evaluated under our Preparedness Framework.” (§1 Introduction, PDF p. 4 (printed p. 3))

> “Under our Preparedness Framework, High cybersecurity capability is defined” (§5.1.2 Cybersecurity, PDF p. 12 (printed p. 11))

The card names the Preparedness Framework without a version number in its text. The word “Preparedness” in the second passage carries a hyperlink to cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf, which identifies the edition: preparedness-v2.

### Q04 Link to framework: ● stated

> “Under our Preparedness Framework, High cybersecurity capability is defined” (§5.1.2 Cybersecurity, PDF p. 12 (printed p. 11))

> “GPT-5.2-Codex frontier capabilities are assessed under the Preparedness Framework.” (§5 Preparedness, PDF p. 8 (printed p. 7))

Hyperlinks (PDF link annotations): on PDF p. 12 to the Preparedness Framework Version 2 PDF; on PDF p. 8 to openai.com/index/updating-our-preparedness-framework/ (OpenAI’s announcement of the updated framework). The reference list does not cite the framework.

### Q05 Framework determination: ● stated

> “We are treating GPT-5.2-Codex as High risk in the Biological and Chemical domain. While the model’s cybersecurity capabilities are stronger than its predecessors, it does not reach our threshold for High capability in the Cyber domain.” (§5 Preparedness, PDF p. 8 (printed p. 7))

> “It also does not reach High capability in the AI self-improvement domain.” (§5 Preparedness, PDF p. 8 (printed p. 7))

Biological and Chemical: treated as High. Cybersecurity: below High. AI self-improvement: below High.

### Q06 Safeguards tied to determination: ● stated

> “Like other recent models, it is being treated as High capability on biology, and is being deployed with the corresponding suite of safeguards we use for other models in the GPT-5 family.” (§1 Introduction, PDF p. 4 (printed p. 3))

The card ties deployment with the GPT-5 family’s safeguards to the High biology treatment; §5.1.1 repeats that the corresponding safeguards continue to apply. This is the developer’s account, not evidence that the safeguards work.

### Q07 Chemical and biological: ● stated

> “As we did for other models in the GPT-5 series, we are treating GPT-5.2-Codex as High risk in the Biological and Chemical domain, and continuing to apply the corresponding safeguards.” (§5.1.1 Biological and Chemical, PDF p. 9 (printed p. 8))

The card reports four biological and chemical evaluations; outcome category: treated as High. Evaluation contents and results are not recorded (hazard rule).

### Q08 Cyber: ● stated

> “A review of these results and other relevant information by the Safety Advisory Group and OpenAI leadership determined that GPT-5.2-Codex’s performance—while stronger than earlier models—does not meet the level of consistency needed for High cyber capability.” (§5.1.2 Cybersecurity, PDF p. 13 (printed p. 12))

Cybersecurity: below High. The card reports three internal benchmarks and an external evaluation by Irregular; results are not recorded here.

### Q09 Autonomy and AI R&D: ● stated

> “GPT-5.2-Codex performed at a similar capability level to GPT-5.2-Thinking and did not meet our High thresholds.” (§5.1.3 AI Self-Improvement, PDF p. 17 (printed p. 16))

> “performance in the evaluations below indicate we can rule this out for GPT-5.2-Codex.” (§5.1.3 AI Self-Improvement, PDF p. 17 (printed p. 16))

AI self-improvement: below High, with four evaluations reported.

### Q10 Persuasion: ○ not-found

No passage reporting an evaluation of persuasive or manipulative capability was found. The card’s Preparedness section addresses the Biological and Chemical, Cybersecurity and AI Self-Improvement domains.

_Searched:_ Whole card (22 pages); terms: “persua”, “manipulat”, “influence”, “convinc”.

- Set aside: §5.1.2.3 Cyber Range, Table 7, PDF p. 16 (printed p. 15): “LDAP manipulation” names a cyber-range technique, not manipulation of people.

### Q11 Alignment and deception: ○ not-found

No passage reporting an evaluation of deception, scheming, reward hacking, sabotage or undermining oversight was found.

_Searched:_ Whole card; terms: “decept”, “scheming”, “sabotag”, “sandbag”, “reward hack”, “misalign”, “oversight”, “alignment”, “monitor”.

- Set aside: §4.2 Avoid Data-Destructive Actions, PDF p. 8: Evaluates avoidance of destructive actions and preservation of user changes; it does not address deception, scheming or undermining oversight.
- Set aside: §5.1.2 Cybersecurity, PDF p. 11 (printed p. 10): “monitoring and enforcement pipeline” concerns misuse by users, not the model’s own conduct.

### Q12 Red-teaming: ○ not-found

No passage describing adversarial testing as red-teaming was found.

_Searched:_ Whole card; terms: “red team”, “red-team”, “red teaming”, “adversarial”, “external”.

- Set aside: §2.2 Jailbreaks, PDF p. 5 (printed p. 4): An automated jailbreak benchmark (StrongReject adaptation), not described as red-teaming.
- Set aside: §5.1.2.4 External Evaluations by Irregular, PDF pp. 16–17: An external capability evaluation, not described as red-teaming; recorded under Q13.

### Q13 External testers: ● stated

> “Irregular, an AI security organization focused on frontier cybersecurity risks, evaluated GPT-5.2-Codex on a subset of a suite of cyberoffensive challenges” (§5.1.2.4 External Evaluations by Irregular, PDF p. 16 (printed p. 15))

Irregular is named as an external evaluator of cyber capability. SecureBio and Gryphon Scientific are named as sources of evaluation datasets, not as testers of this model.

### Q14 Government institute: ○ not-found

No passage naming a government body that tested or received access to the model was found.

_Searched:_ Whole card; terms: “government”, “institute”, “CAISI”, “AISI”, “AI Safety Institute”, “AI Security Institute”, “national”.

### Q15 Release decision: ◐ partly

> “A review of these results and other relevant information by the Safety Advisory Group and OpenAI leadership determined that GPT-5.2-Codex’s performance—while stronger than earlier models—does not meet the level of consistency needed for High cyber capability.” (§5.1.2 Cybersecurity, PDF p. 13 (printed p. 12))

> “Like other recent models, it is being treated as High capability on biology, and is being deployed with the corresponding suite of safeguards we use for other models in the GPT-5 family.” (§1 Introduction, PDF p. 4 (printed p. 3))

The card names the Safety Advisory Group and OpenAI leadership as having determined the cyber capability level, and states that the model is being deployed. It does not state who decided to release the model.

_Searched:_ §1; §5; terms: “decision”, “decide”, “approv”, “Safety Advisory Group”, “leadership”, “deploy”, “launch”.

### Q16 Stated limits: ● stated

> “Each of these evaluations has important limitations:” (§5.1.2 Cybersecurity, PDF p. 12 (printed p. 11))

> “Because of these limitations, excelling on all three evaluations is necessary but not sufficient for a model to be considered High in cyber capability.” (§5.1.2 Cybersecurity, PDF p. 13 (printed p. 12))

The card lists limitations of each cyber benchmark and states that results on them are not sufficient to establish High cyber capability.

## OpenAI: GPT-6 Luna (October 29) (2026)

- Card: Addendum to GPT-6 Luna System Card: October 29, 2026 Update (addendum), https://deploymentsafety.openai.com/gpt-6-luna-october-28-2026-addendum/gpt-6-luna-october-28-2026-addendum.pdf
- Framework edition in the dataset: `preparedness-v2`. The text says “Preparedness Framework” without a version; a link annotation on PDF p. 13 targets preparedness-framework-v2.pdf. The card does not name frontier-governance-2026 (published 2026-05-28 per the dataset).

### Q01 Card date: ● stated

> “Addendum to GPT-6 Luna System Card: October 29, 2026 Update OpenAI 2026-10-29” (Cover, PDF p. 1)

Date printed on the cover (2026-10-29), not labelled by kind; the title also names October 29, 2026. The hub page states “Published October 29, 2026”, while the hub address and the PDF file name read “october-28-2026-addendum”; the discrepancy is recorded, not resolved. No revision date was located.

### Q02 Release date: ● stated

> “Today, we’re introducing an update to GPT-6 Luna, which we released in ChatGPT on October 7.” (§1 Introduction, PDF p. 4 (printed p. 3))

The card introduces the updated model “today” (the card is dated 2026-10-29) and dates the release of the earlier GPT-6 Luna in ChatGPT to October 7. §8.2 refers to the updated model’s “public launch”.

### Q03 Framework cited: ● stated

> “Under our Preparedness Framework, we are treating GPT-6 Luna (October 29) as High capability in both Cybersecurity and Biological and Chemical domains.” (§8 Preparedness, PDF p. 13 (printed p. 12))

The card names the Preparedness Framework without a version in its text. The words “Preparedness Framework” in this passage carry a hyperlink to cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf, which identifies the edition: preparedness-v2. The card does not name the Frontier Governance Framework.

### Q04 Link to framework: ● stated

> “Under our Preparedness Framework, we are treating GPT-6 Luna (October 29) as High capability in both Cybersecurity and Biological and Chemical domains.” (§8 Preparedness, PDF p. 13 (printed p. 12))

Hyperlink (PDF link annotation) on “Preparedness Framework,” to the Preparedness Framework Version 2 PDF. No bibliographic reference to the framework.

### Q05 Framework determination: ● stated

> “Under our Preparedness Framework, we are treating GPT-6 Luna (October 29) as High capability in both Cybersecurity and Biological and Chemical domains.” (§8 Preparedness, PDF p. 13 (printed p. 12))

> “The model does not reach our High threshold in AI Self-Improvement.” (§8 Preparedness, PDF p. 13 (printed p. 12))

Cybersecurity and Biological and Chemical: treated as High. AI Self-Improvement: below High. The card states these match the assessments for GPT-6 Luna (October 7).

### Q06 Safeguards tied to determination: ● stated

> “Based on that assessment, GPT-6 Luna (October 29) uses the same safeguards stack as prior GPT-6 Luna (October 7)” (§1 Introduction, PDF p. 4 (printed p. 3))

> “we have implemented the corresponding safeguards described in the GPT-6 Luna (October 7) card.” (§8 Preparedness, PDF p. 13 (printed p. 12))

Safeguards are tied to the High determinations and described by reference to the October 7 card; §8.2 is a public summary of an internal Safeguards Report. This is the developer’s account, not evidence that the safeguards work.

### Q07 Chemical and biological: ● stated

> “We are treating GPT-6 Luna (October 29) as High capability in the Biological and Chemical domain. Below, we report updated results on our High and Critical capability evaluations.” (§8.1.1 Biological and Chemical Capabilities, PDF p. 13 (printed p. 12))

Outcome category: High. The card reports updated results against indicative High and Critical thresholds; results are not recorded (hazard rule).

### Q08 Cyber: ● stated

> “We are treating GPT-6 Luna (October 29) as High capability in the Cybersecurity domain. Below, we report updated results on our High capability evaluations.” (§8.1.2 Cybersecurity Capabilities, PDF p. 14 (printed p. 13))

Outcome category: High. Results of the two reported evaluations are not recorded here.

### Q09 Autonomy and AI R&D: ◐ partly

> “In AI Self-Improvement, GPT-6 Sol and GPT-6 Luna do not reach our High threshold.” (§8.1.3 AI Self-Improvement Capabilities, PDF p. 15 (printed p. 14))

> “please see the AI Self-Improvement Capabilities section in the GPT-6 Astra card.” (§8.1.3, PDF p. 15 (printed p. 14))

The card states the outcome (below High) but reports no AI self-improvement evaluation run on the October 29 model; it refers to the GPT-6 Astra card for the evaluations.

### Q10 Persuasion: ○ not-found

No passage reporting an evaluation of persuasive or manipulative capability was found.

_Searched:_ Whole card (16 pages); terms: “persua”, “manipulat”, “influence”, “convinc”, “agreeable”.

- Set aside: §1 Introduction, PDF p. 4: “reduces overly agreeable language” describes a change in the model’s style, not an evaluation of persuasion or manipulation.

### Q11 Alignment and deception: ◐ partly

> “Blocker-related disclosure failure rates on coding tasks. Lower is better.” (§7.0.3 Blocker Deception, Figure 6 caption, PDF p. 12 (printed p. 11))

> “Conditional failure rates for successful circumvention of environmental restrictions. Lower is better.” (§7.0.2 Respecting Warnings, Figure 5 caption, PDF p. 11 (printed p. 10))

The card’s Alignment section reports four evaluations (respecting auto-review, respecting warnings, blocker deception, broken search tool) as figures. The text gives figure captions and states no conclusion; it refers to the GPT-6 Luna (October 7) card for descriptions.

_Searched:_ §7 Alignment, PDF pp. 10–13; terms: “decept”, “scheming”, “sabotag”, “misalign”, “oversight”, “circumvent”, “monitor”.

### Q12 Red-teaming: ◐ partly

> “we use adversarial training with an automated red-teaming agent to strengthen resistance to malicious instructions” (§4.2 Prompt Injection, PDF p. 7 (printed p. 6))

> “For our evaluations, we use the GPT-Red automated evaluations introduced in the GPT-5.6 system card.” (§4.2 Prompt Injection, PDF p. 7 (printed p. 6))

The card describes an automated red-teaming agent used in adversarial training, and automated 'GPT-Red' evaluations of direct and indirect prompt injection. It does not describe adversarial testing of this model as red-teaming, and reports no human red-teaming.

_Searched:_ Whole card; terms: “red team”, “red-team”, “adversarial”, “attacker”, “jailbreak”.

- Set aside: §4.1 Jailbreaks, PDF pp. 6–7: Reports defender success rates against an automated attacker; not described as red-teaming.

### Q13 External testers: ○ not-found

No passage naming an external tester or evaluator was found.

_Searched:_ Whole card; terms: “external”, “third-party”, “third party”, “partner”, “evaluated by”, “Irregular”, “Apollo”, “METR”, “SecureBio”.

- Set aside: §4.2 Prompt Injection, PDF p. 7: “malicious instructions in third-party content” describes an attack type, not a tester.

### Q14 Government institute: ○ not-found

No passage naming a government body that tested or received access to the model was found.

_Searched:_ Whole card; terms: “government”, “institute”, “CAISI”, “AISI”, “AI Safety Institute”, “AI Security Institute”.

### Q15 Release decision: ● stated

> “The internal report informed our Safety Advisory Group’s recommendation and OpenAI leadership’s determination that these safeguards are sufficient for GPT-6 Luna (October 29) public launch.” (§8.2 Safeguards, PDF p. 15 (printed p. 14))

The card states a determination by OpenAI leadership, informed by a Safety Advisory Group recommendation, that safeguards are sufficient for the model’s public launch.

### Q16 Stated limits: ● stated

> “Our attacker run was cut short due to infrastructure issues” (§4.1 Jailbreaks, PDF p. 7 (printed p. 6))

> “The comparison values for previously launched models that are shown here may reflect later versions of those models, and may vary from the values published at launch.” (§2 Model Data and Training, PDF p. 4 (printed p. 3))

The card states that the jailbreak evaluation run was incomplete and that comparison values may not match those published at launch.

## xAI: Grok 4.1 (2025)

- Card: Grok 4.1 Model Card (model card), https://data.x.ai/2025-11-17-grok-4-1-model-card.pdf
- Framework edition in the dataset: none identified. The card names xAI's 'Risk Management Framework (RMF)' and cites it as 'xAI. xai risk management framework, 2025.' (References, p. 6), with no version, address or full date. The RMF is not among the dataset's framework editions, so no identifier is given (open question). Context only, not the card's statement: the RMF retrieved from data.x.ai on 2026-11-02 prints 'Last updated: August 20, 2025'.

### Q01 Card date: ● stated

> “Grok 4.1 Model Card xAI November 17, 2025” (Title block, p. 1)

The card prints a full date under its title without a label (publication or issue not specified). No revision date is printed. The file name (2025-11-17-grok-4-1-model-card.pdf) carries the same date.

### Q02 Release date: ◐ partly

> “It is publicly available through our web and mobile consumer apps.” (§1 Introduction, p. 1)

The card gives the form of availability (consumer web and mobile apps) in the present tense, with no release date.

_Searched:_ Whole card (6 pages).; terms: “release”, “launch”, “availab”, “deploy”, “API”.

- Set aside: §1 Introduction, p. 1: 'pre-deployment safety testing' gives no date.

### Q03 Framework cited: ◐ partly

> “In line with our Risk Management Framework (RMF), we measure safety-relevant behaviors across three categories” (§1 Introduction, p. 1)

> “xAI. xai risk management framework, 2025.” (References, p. 6)

The card names xAI's Risk Management Framework; its reference gives the year 2025 only, with no version, full date or address. The RMF is not among the dataset's framework editions (open question). Context only, not the card's statement: the RMF served at data.x.ai prints 'Last updated: August 20, 2025'.

### Q04 Link to framework: ● stated

> “xAI. xai risk management framework, 2025.” (References, p. 6)

A bibliographic reference to the framework (author, title, year), cited in §2 as '[xAI, 2025]'; it gives no address. The PDF's only link annotation points to the Grok 4 model card.

### Q05 Framework determination: ○ not-found

No determination in the framework's own categories (a threshold reached or not reached) was found; the card groups its evaluations by the RMF's three risk categories and reports results and conclusions outside threshold language.

_Searched:_ Whole card.; terms: “threshold”, “RMF”, “Risk Management Framework”, “level”, “acceptable”, “determin”.

- Set aside: §1 Introduction and §2 Evaluations, p. 1: RMF named as the basis for grouping evaluations; no outcome stated.
- Set aside: §2.3.2 Results, p. 5: 'we do not believe it poses risks due to advanced persuasion capabilities' is a conclusion (Q10) not expressed in the framework's categories.

### Q06 Safeguards tied to determination: ◐ partly

> “in response to these results, we have implemented initial mitigations with input filters for restricted chemical and biological knowledge” (§2.3.2 Results, p. 5)

The card ties input filters to its chemical and biological evaluation results, not to a framework determination or threshold (none is stated, Q05). It also describes refusal training and input filters in §2.1.1. The developer's account, not evidence that the safeguards work.

### Q07 Chemical and biological: ● stated

> “Grok 4.1 achieves broadly similar results to Grok 4 and other frontier models on chemical and biological capabilities tests.” (§2.3.2 Results, p. 4)

Biology and chemistry dual-use evaluations reported, with a stated comparative conclusion and comparisons with human baselines; no threshold language. The section's scope sentence names radiological and nuclear weapons, but the evaluations listed cover biology, chemistry and cyber only. Scores are not recorded (hazard rule).

_Cross-family check (item 126):_ not cross-family checked: excluded from the pass by the maintainer.

### Q08 Cyber: ● stated

> “Grok 4.1 again performs similarly to other frontier models, but substantially below the level of human cybersecurity experiments” (§2.3.2 Results, p. 5)

Dual-use cyber knowledge and an agentic capture-the-flag evaluation are reported, with the stated comparative conclusion quoted (the card's wording); no threshold language. Scores are not recorded.

### Q09 Autonomy and AI R&D: ○ not-found

No evaluation of autonomy, self-replication, self-improvement or AI R&D was found.

_Searched:_ Whole card.; terms: “autonom”, “agentic”, “self-”, “replicat”, “AI R&D”, “research and development”, “loss of control”.

- Set aside: §2.1.2 Evaluations, p. 2: Agentic refusal and prompt-injection evaluations measure misuse refusal and robustness, not autonomy.
- Set aside: §2.3.1 Evaluations, p. 4: The agentic capture-the-flag evaluation is a cyber evaluation (Q08).

### Q10 Persuasion: ● stated

> “we do not believe it poses risks due to advanced persuasion capabilities” (§2.3.2 Results, p. 5)

A persuasion evaluation (MakeMeSay) is reported with the stated conclusion quoted.

### Q11 Alignment and deception: ● stated

> “Overall, we find that training the model to be honest drops the rate at which Grok 4.1 lies.” (§2.2.1 Deception, p. 3)

The card reports a deception (lying under pressure) evaluation and a sycophancy evaluation as 'concerning propensities', with the conclusion quoted; its table gives dishonesty rates for Grok 4 and both Grok 4.1 configurations. No scheming, sabotage or oversight evaluation was found.

### Q12 Red-teaming: ○ not-found

No testing described as red-teaming was found. The card reports adversarial robustness evaluations (jailbreak templates, prompt injection) without calling them red-teaming.

_Searched:_ Whole card.; terms: “red team”, “red-team”, “red teaming”, “adversarial”, “jailbreak”, “tester”.

- Set aside: §2.1.2 Evaluations, 'Adversarial robustness', p. 2: Adversarial testing on internal jailbreak templates and a prompt-injection suite; not described as red-teaming.
- Set aside: §2.1.1 Safety Training Approach, p. 1: Adversarial attacks used to train input filters; training, not testing described as red-teaming.

### Q13 External testers: ○ not-found

No external organisation named as having tested or evaluated Grok 4.1 was found.

_Searched:_ Whole card, including references.; terms: “external”, “third party”, “third-parties”, “partner”, “independent”, “evaluator”, “RAND”.

- Set aside: §2.3.1 Evaluations and References, pp. 4-6: Published benchmarks and human baselines by other authors (including a RAND report) are cited as sources, not as testers of Grok 4.1.
- Set aside: §3.1 Data and Training, p. 5: 'data produced by third-parties' concerns training data.

### Q14 Government institute: ○ not-found

No government body was found.

_Searched:_ Whole card.; terms: “institute”, “AISI”, “CAISI”, “government”, “UK”, “U.S.”.

### Q15 Release decision: ○ not-found

No statement that a release or deployment decision was made was found.

_Searched:_ Whole card.; terms: “decision”, “decid”, “release”, “launch”, “deploy”, “approv”.

- Set aside: §1 Introduction, p. 1: 'we engage in pre-deployment safety testing' and 'We also deploy these models with safeguards' describe testing and deployment conditions; no decision or decision-maker is stated.

### Q16 Stated limits: ● stated

> “results in previous model cards were reported with an error in the evaluation settings, where only the English prompts were evaluated” (§2.1.2 Evaluations, p. 2)

> “the human baselines collected in previous work likely underestimate the … performance of high-context experts” (§2.3.2 Results, pp. 4-5)

The card states an error in earlier cards' refusal results, that the new multilingual results are not directly comparable, and that the human baselines used may underestimate expert performance.

## xAI: Grok 4.7 (2026)

- Card: Model Card: Grok 4.7 (model card), https://media.x.ai/v1/website/card4p7-3a96f40b.pdf
- Framework edition in the dataset: `faif-2026`. The card names the 'xAI Frontier Artificial Intelligence Framework (FAIF)' and its reference 16 reads 'xAI, June 30, 2026' with a link to media.x.ai/v1/website/xai-frontier-artificial-intelligence-framework-30-june-2026-99c40684.pdf. The dataset's faif-2026 record (effective date 2026-06-30) names that address as the file formerly served for the June 2026 edition; the address returned HTTP 404 on 2026-11-02.

### Q01 Card date: ● stated

> “Model Card: Grok 4.7 September 21, 2026 Revision: 2026-09-21” (Cover, PDF p. 1)

The cover prints the card's date (kind not labelled) and a revision date, both 2026-09-21.

### Q02 Release date: ◐ partly

> “It is available for use through the following channels” (§1.1 Overview, PDF p. 5 (printed p. 4))

> “SpaceXAI plans to add Grok 4.7 to its consumer surfaces (web, mobile apps, and Grok-in-X on the X platform) at a later date.” (§1.1 Overview, PDF p. 5 (printed p. 4))

The card lists release channels (SpaceXAI API, Grok Build, Cursor, Office add-ins, model gateways) and a planned consumer release 'at a later date'; it gives no release date. The consumer release is announced, not stated as made.

_Searched:_ Whole card (30 PDF pages).; terms: “release”, “launch”, “availab”, “deploy”, “September”.

### Q03 Framework cited: ● stated

> “treated as safety-threshold evaluations under the xAI Frontier Artificial Intelligence Framework (FAIF)” (§7 Biological and chemical capabilities and safeguards, PDF p. 20 (printed p. 19))

> “xAI Frontier Artificial Intelligence Framework (FAIF). xAI, June 30, 2026.” (References, item 16, PDF p. 29 (printed p. 28))

The card names the framework and its reference gives the edition date June 30, 2026 (dataset faif-2026).

### Q04 Link to framework: ● stated

> “xAI Frontier Artificial Intelligence Framework (FAIF). xAI, June 30, 2026.” (References, item 16, PDF p. 29 (printed p. 28))

The reference carries an address (media.x.ai/v1/website/xai-frontier-artificial-intelligence-framework-30-june-2026-99c40684.pdf), also as a link annotation. That address returned HTTP 404 on 2026-11-02; the dataset's faif-2026 record names it as the file formerly served for the June 2026 edition.

### Q05 Framework determination: ◐ partly

> “Grok 4.7 scores below the FAIF safety thresholds on dual-use knowledge” (§7 Biological and chemical capabilities and safeguards, PDF p. 20 (printed p. 19))

The card states an outcome in the framework's terms for dual-use biological and chemical knowledge only; no FAIF threshold outcome is stated for cyber or other domains.

### Q06 Safeguards tied to determination: ◐ partly

> “dedicated input and topical filters target biological and chemical weapons-related abuse” (§9.3 CBRN / weapons refusals, PDF p. 25 (printed p. 24))

The card describes a layered safeguard stack (safety training, system prompts, runtime input and topical filters on some deployment surfaces, cyber-specific safeguards) without tying it to the FAIF result; it attributes the biological result to training environments and data selection rather than to safeguards. The developer's account, not evidence that the safeguards work.

### Q07 Chemical and biological: ● stated

> “Grok 4.7 scores below the FAIF safety thresholds on dual-use knowledge” (§7 Biological and chemical capabilities and safeguards, PDF p. 20 (printed p. 19))

Biological and chemical capability evaluations are reported as FAIF safety-threshold evaluations, run without production safeguards, with the threshold language quoted. Radiological and nuclear items appear only in a refusal evaluation (§9.3). Scores are not recorded (hazard rule).

### Q08 Cyber: ● stated

> “Grok 4.7 shows small cybersecurity-relevant capability gains over Grok 4.6” (§6 Cyber capabilities and safeguards, PDF p. 17 (printed p. 16))

Offensive cyber capability evaluations are reported, run without production safeguards, with a comparative conclusion; no FAIF threshold language is given for cyber. The card states that third-party evaluators corroborated the internal cyber results (Q13). Scores are not recorded.

### Q09 Autonomy and AI R&D: ○ not-found

No dangerous-capability evaluation of autonomy, self-replication, self-improvement or AI R&D was found; the card's autonomy statements concern product capability.

_Searched:_ Whole card.; terms: “autonom”, “self-repl”, “replicat”, “self-improv”, “AI R&D”, “AI research”, “loss of control”, “oversight”.

- Set aside: §1 Introduction and §1.1 Overview, PDF p. 4 (printed p. 3): Autonomy described as capability on coding, engineering and office work.
- Set aside: §2 Coding capabilities, PDF pp. 6-11: Long-horizon agentic coding benchmarks, one including AI research challenges, reported as product capability.

### Q10 Persuasion: ○ not-found

No persuasion or manipulation evaluation was found; the terms do not occur in the card.

_Searched:_ Whole card.; terms: “persua”, “manipul”, “influence”.

### Q11 Alignment and deception: ◐ partly

> “we test whether Grok 4.7 faithfully reports its beliefs when pressured to lie, as a proxy for the model's tendency to assert misleading information” (§11.1 MASK-Rectified, PDF p. 26 (printed p. 25))

The card reports an honesty-under-pressure evaluation and a sycophancy evaluation with rates in tables, without a concluding sentence. No scheming, sabotage or oversight evaluation was found.

### Q12 Red-teaming: ○ not-found

No adversarial testing of the model described as red-teaming was found. The card's uses of 'red-team' describe offensive cyber tasks the model performs; its adversarial testing is described as jailbreak testing.

_Searched:_ Whole card.; terms: “red team”, “red-team”, “red-teaming”, “adversarial”, “jailbreak”.

- Set aside: §6.3 and §6.4, PDF pp. 18-19 (printed pp. 17-18): 'red-teaming tasks' and 'a red-team cyber evaluation' measure the model's offensive cyber capability (Q08), not adversarial testing of the model.
- Set aside: §7.1 BioSecBench, PDF p. 20 (printed p. 19): 'red-team refusal' names a refusal measure within a capability suite; no red-teaming exercise is described.
- Set aside: §8 Jailbreaks and robustness, PDF p. 23 (printed p. 22): Adversarial testing of production safeguards with jailbreak attacks; not described as red-teaming.

### Q13 External testers: ● stated

> “Results reported are taken from evaluations conducted by Datacurve.” (§2.2 DeepSWE v1.1, note, PDF p. 8 (printed p. 7))

> “CathedralBench is an independent, third party evaluation of cyber performance.” (§6.4 CathedralBench, PDF p. 19 (printed p. 18))

> “We additionally provided an unrestricted configuration of Grok 4.7 to third-party evaluators” (§6 Cyber capabilities and safeguards, PDF p. 17 (printed p. 16))

The card names Datacurve (and, in a similar note on PDF p. 9, Harbor) as having run evaluations, describes CathedralBench as a third-party evaluation, and thanks nine 'evaluation partners' (Abundant AI, Datacurve, Mecado, Atopile, Harbor, Proximal Labs, Cathedral, LatchBio, Vals AI). The third-party evaluators given unrestricted cyber access are not named.

### Q14 Government institute: ○ not-found

No government body was found.

_Searched:_ Whole card, including references and acknowledgements.; terms: “institute”, “AISI”, “CAISI”, “government”, “UK”, “U.S.”.

- Set aside: References, item 5, PDF p. 29 (printed p. 28): 'Stanford & Laude Institute' are named as benchmark authors, not a government body.

### Q15 Release decision: ○ not-found

No statement that a release or deployment decision was made was found.

_Searched:_ Whole card.; terms: “decision”, “decid”, “release”, “launch”, “deploy”, “approv”.

- Set aside: §1.1 Overview, PDF p. 4 (printed p. 3): 'final deployed checkpoint' identifies the evaluated checkpoint; 'not intended for autonomous high-stakes decision-making' is a usage limitation. Neither states a release decision.
- Set aside: §1.1 Overview, PDF p. 5: Availability channels and a planned consumer release, stated without a decision.

### Q16 Stated limits: ● stated

> “the restricted task sets characterize the tested checkpoint and harness rather than establishing general biological safety or reliability” (§7.1 BioSecBench, PDF p. 20 (printed p. 19))

> “absolute scores remain sensitive to the agent harness” (§2.3 Terminal-Bench 4.0, PDF p. 9 (printed p. 8))

The card also states that a live benchmark suite should be frozen to the evaluated snapshot and that some benchmark versions are not comparable with earlier ones.

_Cross-family check (item 130):_ corrected: the clause on ongoing monitoring of residual jailbreak failures was removed from the limits. Status unchanged.

## Inventory of cards located

Every card located for the six developers, 2023-01-01 to 2026-11-01, with whether it was retrieved and whether this pack compares it.

### Group anthropic

_Searched:_ 2026-11-02. Read Anthropic's index https://www.anthropic.com/system-cards (HTTP 200; 22 rows, Claude 2 of July 2023 to Claude Haiku 5.5 of October 2026, each with a month and a 'Read system card' link; rows are not in strict date order: 'Claude Fable 5 and Mythos 5, June 2026' sits between Opus 4.8 (May 2026) and Opus 4.7 (April 2026)). Read the Transparency hub https://www.anthropic.com/transparency (HTTP 200) for further card links: it also links two other PDF addresses labelled as the Claude Opus 4 and Sonnet 4 system card (www-cdn.anthropic.com/6be99a52….pdf and /6d8a8055….pdf), several addresses for the Claude Mythos Preview system card, and non-card documents (a 'Claude Mythos Preview Alignment Risk Update', an August 2026 Risk Report, RSP documents); these were not retrieved. Read the announcement pages for Claude (v1) (dated Mar 14, 2023), Claude Instant 1.2 (Aug 9, 2023) and Claude 2.1 (Nov 21, 2023); the Claude 2.1 page links a re-issued Claude 2 model card with a 'Claude 2.1 Model Card Appendix', which is not on the system-cards index. Searched data/sources.json titles for 'System Card' and 'Model Card': the dataset holds the July 2023 Claude 2 card (source-eval-i-claude2-card), the Claude 3.7 Sonnet card (source-ab-claude37-card) and the Claude Sonnet 4.5 card (source-ab-claude-sonnet45-card). Redirects of the four most recent index links were resolved with ranged requests (all to assets.claude.com PDFs). Dates below marked 'index month' are the month shown on the system-cards index on 2026-11-02; the card's own printed date was not checked unless the card was retrieved. web.archive.org was not tried.

| Developer | Model                                           | Card                                                                                                                                                                                                                               | Kind        | Card date                                                                                                                                                                                     | Retrieved                                                                                                                | Compared | Note                                                                                                                                                                                                                                                                                                                                                                                                  |
| --------- | ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Anthropic | Claude 2                                        | [Model Card and Evaluations for Claude Models (July 2023 expression)](https://www-cdn.anthropic.com/bd2a28d2535bfb0494cc8e2a3bf135d2e7523226/Model-Card-Claude-2.pdf)                                                              | model card  | null (no date printed on the card; the index month is July 2023; the text states that Claude 2 was released in July 2023)                                                                     | yes                                                                                                                      | no       | Not the latest card of 2023: Anthropic re-issued this card with a printed update line dated November 21, 2023 and a 'Claude 2.1 Model Card Appendix' (compared row anthropic-claude-2-1). The text of this expression is contained unchanged in the re-issue. The dataset holds this expression as source-eval-i-claude2-card.                                                                        |
| Anthropic | Claude 2.1 (with Claude 2)                      | [Model Card and Evaluations for Claude Models, with 'Claude 2.1 Model Card Appendix' (update of November 21, 2023)](https://www-cdn.anthropic.com/5c49cc247484cecf107c699baf29250302e5da70/ModelCardClaudev2_with_appendix_v1.pdf) | model card  | 2023-11-21 (kind: revision date printed on the card, 'Update (November 21, 2023)'; no issue date printed)                                                                                     | yes                                                                                                                      | yes      | Latest-dated card of 2023 reporting its own evaluations: the appendix reports Claude 2.1 long-context and honesty evaluations, and the document carries the full Claude 2 card. Linked from Anthropic's Claude 2.1 announcement, not from the system-cards index. No other 2023 card located.                                                                                                         |
| Anthropic | Claude 3 (Opus, Sonnet, Haiku)                  | [The Claude 3 Model Family: Opus, Sonnet, Haiku (expression with updates of June 20 and October 22, 2024)](https://www-cdn.anthropic.com/c6a80a657af445f40e31afac050f3bf76d3b1404.pdf)                                             | model card  | 2024-03 (kind: index month; the text says the family was 'announced in March 2024'); revision dates printed on the card: 2024-06-20 and 2024-10-22 (update lines adding the two 2024 addenda) | yes                                                                                                                      | no       | Not the latest card published in 2024: the card of March 2024, re-issued with the June and October 2024 addenda incorporated. Date ambiguity: its last printed revision (October 22, 2024) falls on the same day as the standalone October 2024 addendum (PDF creation metadata 2024-10-22 for both). The standalone addendum was compared as the card published in October 2024; see open questions. |
| Anthropic | Claude 3.5 Sonnet                               | [Claude 3.5 Sonnet Model Card Addendum (title as cited in the October 2024 addendum's reference [10]; not retrieved)](https://www-cdn.anthropic.com/fed9cc193a14b84131812372d8d5857f8f304c52/Model_Card_Claude_3_Addendum.pdf)     | addendum    | 2024-06 (kind: index month; the Claude 3 card's update line dates the addendum's addition June 20, 2024)                                                                                      | not attempted                                                                                                            | no       | Not the latest card of 2024.                                                                                                                                                                                                                                                                                                                                                                          |
| Anthropic | Claude 3.5 Haiku and upgraded Claude 3.5 Sonnet | [Model Card Addendum: Claude 3.5 Haiku and Upgraded Claude 3.5 Sonnet](https://www-cdn.anthropic.com/c7822cdc35ad788ec87e14b3a9d45010f1f86c38.pdf)                                                                                 | addendum    | null (no date printed on the card; the index month is October 2024; PDF creation metadata 2024-10-22; the text cites a leaderboard 'as of October 22nd, 2024')                                | yes                                                                                                                      | yes      | Latest card published in 2024 reporting its own evaluations (an addendum with its own benchmark, Trust & Safety and RSP evaluations). The same addendum also appears inside the re-issued Claude 3 card of the same day; the standalone expression listed on the index was compared.                                                                                                                  |
| Anthropic | Claude 3.7 Sonnet                               | [Claude 3.7 Sonnet System Card](https://www-cdn.anthropic.com/9ff93dfa8f445c932415d335c88852ef47f1201e.pdf)                                                                                                                        | system card | 2025-02 (kind: index month; the dataset record source-ab-claude37-card states that the document prints no publication date)                                                                   | not attempted                                                                                                            | no       | Not the latest card of 2025. In the dataset as source-ab-claude37-card.                                                                                                                                                                                                                                                                                                                               |
| Anthropic | Claude Opus 4 and Claude Sonnet 4               | [Claude Sonnet 4 and Opus 4 system card (index label; printed title not checked)](https://www-cdn.anthropic.com/07b2a3f9902ee19fe39a36ca638e5ae987bc64dd.pdf)                                                                      | system card | 2025-05 (kind: index month)                                                                                                                                                                   | not attempted                                                                                                            | no       | Not the latest card of 2025. The Transparency hub links two further addresses labelled as this card (www-cdn.anthropic.com/6be99a52….pdf, /6d8a8055….pdf); whether these are other versions was not checked.                                                                                                                                                                                          |
| Anthropic | Claude Opus 4.1                                 | [Claude Opus 4.1 system card addendum (label on the Transparency hub; printed title not checked)](https://www-cdn.anthropic.com/9fa30625273bafdf5af82c93719d7ca606485a16.pdf)                                                      | addendum    | 2025-08 (kind: index month)                                                                                                                                                                   | not attempted                                                                                                            | no       | Not the latest card of 2025.                                                                                                                                                                                                                                                                                                                                                                          |
| Anthropic | Claude Sonnet 4.5                               | [System Card: Claude Sonnet 4.5](https://www-cdn.anthropic.com/963373e433e489a87a10c823c52a0a013e9172dd.pdf)                                                                                                                       | system card | 2025-09 (kind: index month; the dataset record source-ab-claude-sonnet45-card reports the cover as 'September 2025')                                                                          | not attempted                                                                                                            | no       | Not the latest card of 2025. In the dataset as source-ab-claude-sonnet45-card.                                                                                                                                                                                                                                                                                                                        |
| Anthropic | Claude Haiku 4.5                                | [Claude Haiku 4.5 System Card (index label; printed title not checked)](https://www-cdn.anthropic.com/7aad69bf12627d42234e01ee7c36305dc2f6a970.pdf)                                                                                | system card | 2025-10 (kind: index month)                                                                                                                                                                   | not attempted                                                                                                            | no       | Not the latest card of 2025.                                                                                                                                                                                                                                                                                                                                                                          |
| Anthropic | Claude Opus 4.5                                 | [System Card: Claude Opus 4.5](https://www-cdn.anthropic.com/bf10f64990cfda0ba858290be7b8cc6317685f47.pdf)                                                                                                                         | system card | 2025-11 (kind: date printed on the card, 'November 2025'); revision dates printed in its changelog: 2025-11-24, 2025-11-25, 2025-12-05                                                        | yes                                                                                                                      | yes      | Latest card of 2025 reporting its own evaluations. No later 2025 card located on the index or the Transparency hub.                                                                                                                                                                                                                                                                                   |
| Anthropic | Claude Opus 4.6                                 | [Claude Opus 4.6 system card (index label; printed title not checked)](https://anthropic.com/claude-opus-4-6-system-card)                                                                                                          | system card | 2026-02 (kind: index month)                                                                                                                                                                   | not attempted                                                                                                            | no       | Not the latest card of 2026.                                                                                                                                                                                                                                                                                                                                                                          |
| Anthropic | Claude Sonnet 4.6                               | [Claude Sonnet 4.6 system card (index label; printed title not checked)](http://anthropic.com/claude-sonnet-4-6-system-card)                                                                                                       | system card | 2026-02 (kind: index month)                                                                                                                                                                   | not attempted                                                                                                            | no       | Not the latest card of 2026.                                                                                                                                                                                                                                                                                                                                                                          |
| Anthropic | Claude Mythos Preview                           | [Claude Mythos Preview system card (index label 'Mythos Preview'; printed title not checked)](https://www.anthropic.com/claude-mythos-preview-system-card)                                                                         | system card | 2026-04 (kind: index month)                                                                                                                                                                   | not attempted                                                                                                            | no       | Not the latest card of 2026. The Transparency hub links several PDF addresses for this card and a separate 'Claude Mythos Preview Alignment Risk Update', which is not a card.                                                                                                                                                                                                                        |
| Anthropic | Claude Opus 4.7                                 | [Claude Opus 4.7 system card (index label; printed title not checked)](https://anthropic.com/claude-opus-4-7-system-card)                                                                                                          | system card | 2026-04 (kind: index month)                                                                                                                                                                   | not attempted                                                                                                            | no       | Not the latest card of 2026.                                                                                                                                                                                                                                                                                                                                                                          |
| Anthropic | Claude Opus 4.8                                 | [Claude Opus 4.8 system card (index label; printed title not checked)](https://anthropic.com/claude-opus-4-8-system-card)                                                                                                          | system card | 2026-05 (kind: index month)                                                                                                                                                                   | not attempted                                                                                                            | no       | Not the latest card of 2026.                                                                                                                                                                                                                                                                                                                                                                          |
| Anthropic | Claude Fable 5 and Claude Mythos 5              | [Claude Fable 5 and Mythos 5 system card (index label; printed title not checked)](https://anthropic.com/claude-fable-5-mythos-5-system-card)                                                                                      | system card | 2026-06 (kind: index month)                                                                                                                                                                   | not attempted                                                                                                            | no       | Not the latest card of 2026.                                                                                                                                                                                                                                                                                                                                                                          |
| Anthropic | Claude Sonnet 5                                 | [Claude Sonnet 5 System Card (file name on the Transparency hub; printed title not checked)](https://anthropic.com/claude-sonnet-5-system-card)                                                                                    | system card | 2026-06 (kind: index month)                                                                                                                                                                   | not attempted                                                                                                            | no       | Not the latest card of 2026.                                                                                                                                                                                                                                                                                                                                                                          |
| Anthropic | Claude Opus 5                                   | [Claude Opus 5 System Card (file name on the Transparency hub; printed title not checked)](https://anthropic.com/claude-opus-5-system-card)                                                                                        | system card | 2026-07 (kind: index month)                                                                                                                                                                   | not attempted                                                                                                            | no       | Not the latest card of 2026.                                                                                                                                                                                                                                                                                                                                                                          |
| Anthropic | Claude Fable 5.1 and Claude Mythos 5.1          | [Claude Fable 5.1 & Claude Mythos 5.1 System Card (file name on the Transparency hub; printed title not checked)](https://www.anthropic.com/claude-fable-5-1-mythos-5-1-system-card)                                               | system card | 2026-09 (kind: index month)                                                                                                                                                                   | not attempted (link resolves to https://assets.claude.com/0339e6a7c5c7b87f5c07798616dc32c215d14235.pdf, application/pdf) | no       | Not the latest card of 2026: the Claude Haiku 5.5 card (October 7, 2026) cites this card as earlier.                                                                                                                                                                                                                                                                                                  |
| Anthropic | Claude Opus 5.5                                 | [Claude Opus 5.5 System Card (file name on the Transparency hub; printed title not checked)](https://www.anthropic.com/claude-opus-5-5-system-card)                                                                                | system card | 2026-09 (kind: index month)                                                                                                                                                                   | not attempted (link resolves to https://assets.claude.com/fc1b44717c85dc068bc6ba5024219938094694bd.pdf, application/pdf) | no       | Not the latest card of 2026: the Claude Haiku 5.5 card cites this card as earlier.                                                                                                                                                                                                                                                                                                                    |
| Anthropic | Claude Sonnet 5.5                               | [Claude Sonnet 5.5 System Card (file name on the Transparency hub; printed title not checked)](https://www.anthropic.com/claude-sonnet-5-5-system-card)                                                                            | system card | 2026-09 (kind: index month)                                                                                                                                                                   | not attempted (link resolves to https://assets.claude.com/870c8f525702625d2c62fc6dd04c857e3250bec1.pdf, application/pdf) | no       | Not the latest card of 2026: the Claude Haiku 5.5 card cites this card as earlier.                                                                                                                                                                                                                                                                                                                    |
| Anthropic | Claude Haiku 5.5                                | [System Card: Claude Haiku 5.5](https://www.anthropic.com/claude-haiku-5-5-system-card)                                                                                                                                            | system card | 2026-10-07 (kind: date printed on the card)                                                                                                                                                   | yes                                                                                                                      | yes      | Latest-dated card of 2026 to the check date reporting its own evaluations. Some conclusions are carried over from the Claude Opus 5.5 System Card (Autonomy-2), and the card states that it is condensed.                                                                                                                                                                                             |

No card located:

- Anthropic: Claude (v1) and Claude Instant (announced March 2023). System-cards index and Transparency hub: no entry. Announcement page https://www.anthropic.com/news/introducing-claude (dated Mar 14, 2023) links a pricing PDF only. The July 2023 Claude 2 card reports comparison evaluations of Claude 1.3 and Claude Instant 1.1 but is not a card for them.
- Anthropic: Claude Instant 1.2. System-cards index and Transparency hub: no entry. Announcement page https://www.anthropic.com/news/releasing-claude-instant-1-2 (dated Aug 9, 2023) links a model pricing PDF; no card link and no 'model card' wording found on the page.

### Group google-xai

_Searched:_ 2026-11-02. Google DeepMind: the model-card index https://deepmind.google/models/model-cards/ (all tabs: Gemini, Generative models, Robotics, Gemma; its 'Published or updated date' column is cited as 'index'); every linked deepmind.google card page (date line and PDF links extracted) and every linked storage.googleapis.com/deepmind-media/Model-Cards/ PDF (first-page dates read); the Gemma card pages on ai.google.dev (page footer 'Last updated … UTC' and index date); https://deepmind.google/frontier-safety/ (lists the Gemini 3 Pro and Gemini 3.7 Flash Frontier Safety Framework reports); the Gemini 4 Argon card's link to its Safety & Security Report; the legacy host modelcards.withgoogle.com (redirects to the index); dataset sources with 'Model Card' or 'Gemini' in the title. xAI: data.x.ai and x.ai (index, /news, /safety, /legal, /model-card) returned HTTP 403 (Cloudflare); docs.x.ai models pages and release notes (model list and release months, no card links); web searches for xAI model cards (terms: 'xAI model card PDF data.x.ai Grok', 'Grok 4.3 model card', 'Grok 4.1 Fast', 'Grok Build', 'Grok 3', 'Grok 2', 'Grok-1 model card', 'x.ai/model-card', 'Grok-1.5'), which located the data.x.ai and media.x.ai PDFs; Hugging Face repositories xai-org/grok-1 and xai-org/grok-2 (README and API dates); the AWS Bedrock and Microsoft Azure catalog pages for Grok 4.3 (refer to an xAI Grok 4.3 model card without an address). web.archive.org: connection reset on one attempt, not retried. Dates: 'date printed' is the card's own line; 'index' is the developer's model-card index; 'page' is the date on the card's own web page. Selection used the date printed on the version retrieved, then publication date (BRIEF step 2). Not searched: Hugging Face copies of Gemma cards and their revision histories; Kaggle model pages; Google Cloud Vertex AI model pages.

| Developer       | Model                                                                      | Card                                                                                                                                           | Kind          | Card date                                                                                                                                | Retrieved                               | Compared | Note                                                                                                                                                                                                                                                                                                                                       |
| --------------- | -------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Google DeepMind | Gemini 4 Argon                                                             | [Gemini 4 Argon — Model Card](https://storage.googleapis.com/deepmind-media/Model-Cards/Gemini-4-Argon-Model-Card.pdf)                         | model card    | 2026-10 (date printed on the card: 'Published: October 2026'; page: 'Published 13 October 2026')                                         | yes                                     | yes      | Latest card of 2026 reporting its own evaluations. Ties at month precision with the Gemini 4 Argon Safety & Security Report (published with it; the rule does not separate them; open question) and with DiffusionGemma's page revision date 2026-10-26 (resolved by publication date: 13 October 2026 against 10 June 2026 on the index). |
| Google DeepMind | Gemini 4 Argon                                                             | [Gemini 4 Argon Safety & Security Report](https://storage.googleapis.com/deepmind-media/gemini/gemini_4_safety_report.pdf)                     | safety report | 2026-10 (date printed on the cover: 'October 2026')                                                                                      | yes (for dating only; not in the cache) | no       | Same printed month as the Gemini 4 Argon model card, which links it as 'The full Safety & Security Report'; the rule does not separate the two and the model card was taken as the row. 218 PDF pages. Open question.                                                                                                                      |
| Google DeepMind | Nano Banana 2.1                                                            | [Nano Banana 2.1 Model Card](https://storage.googleapis.com/deepmind-media/Model-Cards/Nano-Banana-2-1-Model-Card.pdf)                         | model card    | 2026-10 (date printed: 'Published: October 2026')                                                                                        | yes (for dating only; not in the cache) | no       | Outside the population: image model.                                                                                                                                                                                                                                                                                                       |
| Google DeepMind | Gemini 3.8 Audio (Live, Live Extended Thinking, Flash TTS, Flash-Lite TTS) | [Gemini 3.8 Audio Model Card](https://storage.googleapis.com/deepmind-media/Model-Cards/Gemini-3-8-Audio-Model-Card.pdf)                       | model card    | 2026-09 (date printed: 'Published: September 2026'; index: 24 September 2026)                                                            | yes (for dating only; not in the cache) | no       | Outside the population: audio model.                                                                                                                                                                                                                                                                                                       |
| Google DeepMind | Gemini 3.8 Flash                                                           | [Gemini 3.8 Flash Model Card](https://storage.googleapis.com/deepmind-media/Model-Cards/Gemini-3-8-Flash-Model-Card.pdf)                       | model card    | 2026-09 (date printed: 'Published: September, 2026'; index: 2 September 2026)                                                            | yes (for dating only; not in the cache) | no       | Not the latest of 2026.                                                                                                                                                                                                                                                                                                                    |
| Google DeepMind | Gemini Omni Flash (and Gemini Omni 1.1 Flash)                              | [Gemini Omni Flash Model Card](https://storage.googleapis.com/deepmind-media/Model-Cards/Gemini-Omni-Flash-Model-Card.pdf)                     | model card    | 2026-08 (date printed: 'Published: May 2026, Last Updated: August 2026'; index: 27 August 2026)                                          | yes (for dating only; not in the cache) | no       | Outside the population: the card gives video with audio as output (video model).                                                                                                                                                                                                                                                           |
| Google DeepMind | Gemini 3.5 Audio (Live Translate, Transcribe, Transcribe Live)             | [Gemini 3.5 Audio Model Card](https://storage.googleapis.com/deepmind-media/Model-Cards/Gemini-3-5-Audio-Model-Card.pdf)                       | model card    | 2026-08 (date printed: 'Published: August 2026'; index: 26 August 2026)                                                                  | yes (for dating only; not in the cache) | no       | Outside the population: audio model.                                                                                                                                                                                                                                                                                                       |
| Google DeepMind | Gemini 3.7 Flash                                                           | [Gemini 3.7 Flash Model Card](https://storage.googleapis.com/deepmind-media/Model-Cards/Gemini-3-7-Flash-Model-Card.pdf)                       | model card    | 2026-08 (date printed: 'Published: August 2026'; index: 13 August 2026)                                                                  | yes (for dating only; not in the cache) | no       | Not the latest of 2026.                                                                                                                                                                                                                                                                                                                    |
| Google DeepMind | Gemini 3.7 Flash                                                           | [Gemini 3.7 Flash Frontier Safety Framework Report](https://storage.googleapis.com/deepmind-media/gemini/gemini_3-7_flash_fsf_report.pdf)      | safety report | 2026-08 (date printed: 'Published: August 2026')                                                                                         | yes (for dating only; not in the cache) | no       | Not the latest of 2026. Listed on deepmind.google/frontier-safety/.                                                                                                                                                                                                                                                                        |
| Google DeepMind | Gemini 3.6 Flash                                                           | [Gemini 3.6 Flash Model Card](https://storage.googleapis.com/deepmind-media/Model-Cards/Gemini-3-6-Flash-Model-Card.pdf)                       | model card    | 2026-07 (date printed: 'Published: July 2026'; index: 21 July 2026)                                                                      | yes (for dating only; not in the cache) | no       | Not the latest of 2026.                                                                                                                                                                                                                                                                                                                    |
| Google DeepMind | Gemini 3.5 Flash-Lite                                                      | [Gemini 3.5 Flash-Lite Model Card](https://storage.googleapis.com/deepmind-media/Model-Cards/Gemini-3-5-Flash-Lite-Model-Card.pdf)             | model card    | 2026-07 (date printed: 'Published: July 2026'; index: 21 July 2026)                                                                      | yes (for dating only; not in the cache) | no       | Not the latest of 2026.                                                                                                                                                                                                                                                                                                                    |
| Google DeepMind | Gemini 3.1 Flash-Lite Image                                                | [Gemini 3.1 Flash-Lite Image Model Card](https://storage.googleapis.com/deepmind-media/Model-Cards/Gemini-3-1-Flash-Lite-Image-Model-Card.pdf) | model card    | 2026-06 (date printed: 'Published / Model Release: June 2026'; index: 30 June 2026)                                                      | yes (for dating only; not in the cache) | no       | Outside the population: image model.                                                                                                                                                                                                                                                                                                       |
| Google DeepMind | Gemini 3.5 Flash                                                           | [Gemini 3.5 Flash Model Card](https://storage.googleapis.com/deepmind-media/Model-Cards/Gemini-3-5-Flash-Model-Card.pdf)                       | model card    | 2026-05 (date printed: 'Published: May 2026'; index: 19 May 2026)                                                                        | yes (for dating only; not in the cache) | no       | Not the latest of 2026.                                                                                                                                                                                                                                                                                                                    |
| Google DeepMind | Gemini 3.1 Flash-Lite                                                      | [Gemini 3.1 Flash-Lite Model Card](https://storage.googleapis.com/deepmind-media/Model-Cards/Gemini-3-1-Flash-Lite-Model-Card.pdf)             | model card    | 2026-05 (revision date printed: 'Updated: May 2026'; page: 'Published 3 March 2026')                                                     | yes (for dating only; not in the cache) | no       | Not the latest of 2026.                                                                                                                                                                                                                                                                                                                    |
| Google DeepMind | Gemini 3 Pro                                                               | [Gemini 3 Pro Model Card](https://storage.googleapis.com/deepmind-media/Model-Cards/Gemini-3-Pro-Model-Card.pdf)                               | model card    | 2026-05 (revision date printed: 'Model Release: November 2025, Last Updated: May 2026'; index: 18 November 2025)                         | yes (for dating only; not in the cache) | no       | Date ambiguous: model released and card first listed in November 2025, but the version served prints a May 2026 revision; by printed date it is a 2026 card and not the latest of 2026. The dataset already holds this document (source-ab-gemini3-card). Open question.                                                                   |
| Google DeepMind | Gemini 3.1 Flash Audio (Flash Live, TTS)                                   | [Gemini 3.1 Flash Audio Model Card](https://storage.googleapis.com/deepmind-media/Model-Cards/Gemini-3-1-Flash-Audio-Model-Card.pdf)           | model card    | 2026-04 (date printed: 'Published: March 2026, Updated: April 2026'; index: 15 April 2026)                                               | yes (for dating only; not in the cache) | no       | Outside the population: audio model.                                                                                                                                                                                                                                                                                                       |
| Google DeepMind | Gemini 3.1 Flash Image                                                     | [Gemini 3.1 Flash Image Model Card](https://storage.googleapis.com/deepmind-media/Model-Cards/Gemini-3-1-Flash-Image-Model-Card.pdf)           | model card    | 2026-02 (date printed: 'Published / Model Release: February 2026'; index: 26 February 2026)                                              | yes (for dating only; not in the cache) | no       | Outside the population: image model.                                                                                                                                                                                                                                                                                                       |
| Google DeepMind | Gemini 3.1 Pro                                                             | [Gemini 3.1 Pro Model Card](https://storage.googleapis.com/deepmind-media/Model-Cards/Gemini-3-1-Pro-Model-Card.pdf)                           | model card    | 2026-02 (date printed: 'Published: February 2026'; index: 19 February 2026)                                                              | yes (for dating only; not in the cache) | no       | Not the latest of 2026.                                                                                                                                                                                                                                                                                                                    |
| Google DeepMind | Gemini 3 Flash                                                             | [Gemini 3 Flash Model Card](https://storage.googleapis.com/deepmind-media/Model-Cards/Gemini-3-Flash-Model-Card.pdf)                           | model card    | 2025-12 (date printed: 'Published: December 2025'; index: 17 December 2025)                                                              | yes                                     | yes      | Latest card of 2025 reporting its own evaluations (benchmarks, content-safety evaluations, red teaming; its frontier safety statement relies on Gemini 3 Pro's results). Ties at month precision with the Gemini 2.5 Flash card's December 2025 revision; chosen by publication date (index 17 December 2025 against 26 September 2025).   |
| Google DeepMind | Gemini 2.5 Flash (with Gemini 2.5 Flash Image and native audio)            | [Gemini 2.5 Flash - Model Card](https://storage.googleapis.com/deepmind-media/Model-Cards/Gemini-2-5-Flash-Model-Card.pdf)                     | model card    | 2025-12 (revision date printed: 'Model card published/updated December, 2025', 'Last updated: December, 2025'; index: 26 September 2025) | yes (for dating only; not in the cache) | no       | Ties with Gemini 3 Flash at month precision; earlier by publication date (the index gives 26 September 2025; the day of the December revision is not printed). Open question.                                                                                                                                                              |
| Google DeepMind | Gemini 3 Pro Image                                                         | [Gemini 3 Pro Image Model Card](https://storage.googleapis.com/deepmind-media/Model-Cards/Gemini-3-Pro-Image-Model-Card.pdf)                   | model card    | 2025-11 (date printed: 'Published / Model Release: November 2025'; index: 20 November 2025)                                              | yes (for dating only; not in the cache) | no       | Outside the population: image model.                                                                                                                                                                                                                                                                                                       |
| Google DeepMind | Gemini 3 Pro                                                               | [Gemini 3 Pro Frontier Safety Framework Report](https://storage.googleapis.com/deepmind-media/gemini/gemini_3_pro_fsf_report.pdf)              | safety report | 2025-11 (date printed: 'Published: November 2025')                                                                                       | yes (for dating only; not in the cache) | no       | Not the latest of 2025. Listed on deepmind.google/frontier-safety/ and linked from the Gemini 3 Flash card.                                                                                                                                                                                                                                |
| Google DeepMind | Gemini 2.5 Computer Use                                                    | [Gemini 2.5 Computer Use Model Card](https://storage.googleapis.com/deepmind-media/Model-Cards/Gemini-2-5-Computer-Use-Model-Card.pdf)         | model card    | 2025-10-07 (date printed: 'Published: October 7, 2025')                                                                                  | yes (for dating only; not in the cache) | no       | Not the latest of 2025.                                                                                                                                                                                                                                                                                                                    |
| Google DeepMind | Gemini 2.5 Flash-Lite                                                      | [Gemini 2.5 Flash-Lite Model Card](https://storage.googleapis.com/deepmind-media/Model-Cards/Gemini-2-5-Flash-Lite-Model-Card.pdf)             | model card    | 2025-09-26 (date printed: 'Published: September 26, 2025')                                                                               | yes (for dating only; not in the cache) | no       | Not the latest of 2025.                                                                                                                                                                                                                                                                                                                    |
| Google DeepMind | Gemini 2.5 Deep Think                                                      | [Gemini 2.5 Deep Think Model Card](https://storage.googleapis.com/deepmind-media/Model-Cards/Gemini-2-5-Deep-Think-Model-Card.pdf)             | model card    | 2025-08-01 (date printed: 'Published: August 1, 2025')                                                                                   | yes (for dating only; not in the cache) | no       | Not the latest of 2025.                                                                                                                                                                                                                                                                                                                    |
| Google DeepMind | Gemini 2.5 Pro                                                             | [Gemini 2.5 Pro Model Card](https://storage.googleapis.com/deepmind-media/Model-Cards/Gemini-2-5-Pro-Model-Card.pdf)                           | model card    | 2025-06-27 (revision date printed: 'Last updated: June 27, 2025')                                                                        | yes (for dating only; not in the cache) | no       | Not the latest of 2025.                                                                                                                                                                                                                                                                                                                    |
| Google DeepMind | Gemini 2.0 Flash                                                           | [Gemini 2.0 Flash Model Card](https://storage.googleapis.com/deepmind-media/Model-Cards/Gemini-2-0-Flash-Model-Card.pdf)                       | model card    | 2025-04-15 (date printed: 'Model card published April 15, 2025')                                                                         | yes (for dating only; not in the cache) | no       | Not the latest of 2025.                                                                                                                                                                                                                                                                                                                    |
| Google DeepMind | Gemini 2.0 Flash-Lite                                                      | [Gemini 2.0 Flash-Lite Model Card](https://storage.googleapis.com/deepmind-media/Model-Cards/Gemini-2-0-Flash-Lite-Model-Card.pdf)             | model card    | 2025-04-10 (date printed: 'Model card published April 10, 2025')                                                                         | yes (for dating only; not in the cache) | no       | Not the latest of 2025.                                                                                                                                                                                                                                                                                                                    |
| Google DeepMind | Gemini Robotics-ER 2                                                       | [Gemini Robotics-ER 2 Model Card](https://storage.googleapis.com/deepmind-media/Model-Cards/Gemini-Robotics-ER-2-Model-Card.pdf)               | model card    | 2026-07 (date printed: 'Published: July 2026'; index: 30 July 2026)                                                                      | yes (for dating only; not in the cache) | no       | Not the latest of 2026.                                                                                                                                                                                                                                                                                                                    |
| Google DeepMind | Gemini Robotics-ER 2                                                       | [Gemini Robotics 2: Safety Evaluations](https://storage.googleapis.com/deepmind-media/gemini-robotics/Gemini-Robotics-2-Safety.pdf)            | safety report | 2026-07-29 (date printed on the first page)                                                                                              | yes (for dating only; not in the cache) | no       | Linked from the Gemini Robotics-ER 2 card page; a safety evaluation report that also introduces a benchmark, so whether it is a card or a research report is not settled. Not the latest of 2026 in either case.                                                                                                                           |
| Google DeepMind | Gemini Robotics On-Device 2                                                | [Gemini Robotics On-Device 2 Model Card](https://storage.googleapis.com/deepmind-media/Model-Cards/Gemini-Robotics-On-Device-2-Model-Card.pdf) | model card    | 2026-07-12 (revision date printed: 'Updated: July 12, 2026'; index: 30 July 2026)                                                        | yes (for dating only; not in the cache) | no       | Not the latest of 2026.                                                                                                                                                                                                                                                                                                                    |
| Google DeepMind | Gemini Robotics-ER 1.6                                                     | [Gemini Robotics-ER 1.6 Model Card](https://storage.googleapis.com/deepmind-media/Model-Cards/Gemini-Robotics-ER-1-6-Model-Card.pdf)           | model card    | 2026-04 (date printed: 'Published: April 2026'; index: 20 April 2026)                                                                    | yes (for dating only; not in the cache) | no       | Not the latest of 2026.                                                                                                                                                                                                                                                                                                                    |
| Google DeepMind | Gemini Robotics On-Device                                                  | [Gemini Robotics On-Device Model Card](https://storage.googleapis.com/deepmind-media/Model-Cards/Gemini-Robotics-On-Device-Model-Card.pdf)     | model card    | 2025-06-30 (revision date printed: 'Updated: June 30, 2025'; index: 1 July 2025)                                                         | yes (for dating only; not in the cache) | no       | Not the latest of 2025.                                                                                                                                                                                                                                                                                                                    |
| Google DeepMind | DiffusionGemma                                                             | [DiffusionGemma model card](https://ai.google.dev/gemma/docs/diffusiongemma/model_card)                                                        | model card    | 2026-10-26 (page revision date: 'Last updated 2026-10-26 UTC'; index: 10 June 2026; no date in the card text)                            | yes (for dating only; not in the cache) | no       | Date ambiguous: the page footer's revision date falls in the same month as Gemini 4 Argon's printed 'October 2026'; by publication date (index 10 June 2026) it is earlier than Gemini 4 Argon (13 October 2026). Open question.                                                                                                           |
| Google DeepMind | Gemma 4                                                                    | [Gemma 4 model card](https://ai.google.dev/gemma/docs/core/model_card_4)                                                                       | model card    | 2026-07-30 (page revision date: 'Last updated 2026-07-30 UTC'; index: 2 April 2026)                                                      | yes (for dating only; not in the cache) | no       | Not the latest of 2026.                                                                                                                                                                                                                                                                                                                    |
| Google DeepMind | FunctionGemma                                                              | [FunctionGemma model card](https://ai.google.dev/gemma/docs/functiongemma/model_card)                                                          | model card    | 2026-04-16 (page revision date; index: 14 January 2026)                                                                                  | yes (for dating only; not in the cache) | no       | Not the latest of 2026.                                                                                                                                                                                                                                                                                                                    |
| Google DeepMind | Gemma 3                                                                    | [Gemma 3 model card](https://ai.google.dev/gemma/docs/core/model_card_3)                                                                       | model card    | 2025-08-14 (page revision date; index: 14 August 2025)                                                                                   | yes (for dating only; not in the cache) | no       | Not the latest of 2025.                                                                                                                                                                                                                                                                                                                    |
| Google DeepMind | Gemma 3n                                                                   | [Gemma 3n model card](https://ai.google.dev/gemma/docs/gemma-3n/model_card)                                                                    | model card    | 2025-06-17 (page revision date; index: 17 June 2025)                                                                                     | yes (for dating only; not in the cache) | no       | Not the latest of 2025.                                                                                                                                                                                                                                                                                                                    |
| Google DeepMind | ShieldGemma 2                                                              | [ShieldGemma model card (ShieldGemma 2)](https://ai.google.dev/gemma/docs/shieldgemma/model_card_2)                                            | model card    | 2025-04-03 (page revision date; index: 17 June 2025)                                                                                     | yes (for dating only; not in the cache) | no       | Image-safety classifier; treated as outside the population (image model). Not the latest of 2025 in any case.                                                                                                                                                                                                                              |
| Google DeepMind | Gemma 2                                                                    | [Gemma 2 model card](https://ai.google.dev/gemma/docs/core/model_card_2)                                                                       | model card    | 2025-02-25 (page revision date; index: 25 February 2025; no date in the card text)                                                       | yes (for dating only; not in the cache) | no       | The model was released before 2025 (not verified in this pass), but the version retrieved carries only 2025 dates; not the latest of 2025. Open question on 2024.                                                                                                                                                                          |
| Google DeepMind | Gemma (Gemma 1)                                                            | [Gemma model card](https://ai.google.dev/gemma/docs/core/model_card)                                                                           | model card    | 2025-02-25 (page revision date; index: 25 February 2025)                                                                                 | yes (for dating only; not in the cache) | no       | As Gemma 2: version retrieved carries only 2025 dates; not the latest of 2025.                                                                                                                                                                                                                                                             |
| Google DeepMind | CodeGemma                                                                  | [CodeGemma model card](https://ai.google.dev/gemma/docs/codegemma/model_card)                                                                  | model card    | 2025-02-25 (page revision date; index: 25 February 2025)                                                                                 | yes (for dating only; not in the cache) | no       | As Gemma 2.                                                                                                                                                                                                                                                                                                                                |
| Google DeepMind | PaliGemma 2                                                                | [PaliGemma 2 model card](https://ai.google.dev/gemma/docs/paligemma/model-card-2)                                                              | model card    | 2025-02-25 (page revision date; index: 25 February 2025)                                                                                 | yes (for dating only; not in the cache) | no       | As Gemma 2. Vision-language model with text output, treated as in the population.                                                                                                                                                                                                                                                          |
| Google DeepMind | PaliGemma 1                                                                | [PaliGemma 1 model card](https://ai.google.dev/gemma/docs/paligemma/model-card)                                                                | model card    | 2025-02-25 (page revision date; index: 25 February 2025)                                                                                 | yes (for dating only; not in the cache) | no       | As Gemma 2.                                                                                                                                                                                                                                                                                                                                |
| Google DeepMind | RecurrentGemma                                                             | [RecurrentGemma model card](https://ai.google.dev/gemma/docs/recurrentgemma/model_card)                                                        | model card    | 2025-02-25 (page revision date; index: 25 February 2025)                                                                                 | yes (for dating only; not in the cache) | no       | As Gemma 2.                                                                                                                                                                                                                                                                                                                                |
| Google DeepMind | ShieldGemma (1)                                                            | [ShieldGemma model card](https://ai.google.dev/gemma/docs/shieldgemma/model_card)                                                              | model card    | 2025-02-25 (page revision date; index: 25 February 2025)                                                                                 | yes (for dating only; not in the cache) | no       | As Gemma 2.                                                                                                                                                                                                                                                                                                                                |
| Google DeepMind | EmbeddingGemma 2                                                           | [EmbeddingGemma 2 model card](https://ai.google.dev/gemma/docs/embeddinggemma/model_card_2)                                                    | model card    | 2026-10-28 (page revision date; index: 6 October 2026)                                                                                   | yes (for dating only; not in the cache) | no       | Outside the population: embedding model.                                                                                                                                                                                                                                                                                                   |
| Google DeepMind | EmbeddingGemma                                                             | [EmbeddingGemma model card](https://ai.google.dev/gemma/docs/embeddinggemma/model_card)                                                        | model card    | 2025-09-25 (page revision date; index: 25 September 2025)                                                                                | yes (for dating only; not in the cache) | no       | Outside the population: embedding model.                                                                                                                                                                                                                                                                                                   |
| Google DeepMind | Lyria 3.5                                                                  | [Lyria 3.5 model card](https://deepmind.google/models/model-cards/lyria-3-5/)                                                                  | model card    | unknown                                                                                                                                  | not attempted                           | no       | Outside the population: music/audio model (index: 29 July 2026).                                                                                                                                                                                                                                                                           |
| Google DeepMind | Veo 3.1 Lite                                                               | [Veo 3.1 Lite model card](https://deepmind.google/models/model-cards/veo-3-1-lite/)                                                            | model card    | unknown                                                                                                                                  | not attempted                           | no       | Outside the population: video model (index: 8 April 2026).                                                                                                                                                                                                                                                                                 |
| Google DeepMind | Lyria 3                                                                    | [Lyria 3 model card](https://deepmind.google/models/model-cards/lyria-3/)                                                                      | model card    | unknown                                                                                                                                  | not attempted                           | no       | Outside the population: music/audio model (index: 18 February 2026).                                                                                                                                                                                                                                                                       |
| Google DeepMind | Veo 3                                                                      | [Veo 3 Model Card](https://storage.googleapis.com/deepmind-media/Model-Cards/Veo-3-Model-Card.pdf)                                             | model card    | 2026-01-13 (date printed: 'Published: May 23, 2025, Updated: Jan 13, 2026')                                                              | yes (for dating only; not in the cache) | no       | Outside the population: video model.                                                                                                                                                                                                                                                                                                       |
| Google DeepMind | Imagen 4                                                                   | [Imagen 4 Model Card](https://storage.googleapis.com/deepmind-media/Model-Cards/Imagen-4-Model-Card.pdf)                                       | model card    | 2025-05-20 (date printed: 'Published: May 20, 2025')                                                                                     | yes (for dating only; not in the cache) | no       | Outside the population: image model.                                                                                                                                                                                                                                                                                                       |
| xAI             | Grok 4.7                                                                   | [Model Card: Grok 4.7](https://media.x.ai/v1/website/card4p7-3a96f40b.pdf)                                                                     | model card    | 2026-09-21 (date printed on the cover; 'Revision: 2026-09-21')                                                                           | yes                                     | yes      | Latest card of 2026 reporting its own evaluations.                                                                                                                                                                                                                                                                                         |
| xAI             | Grok 4.6                                                                   | [Model Card: Grok 4.6](https://media.x.ai/v1/website/card-4p6-4cd2dc57.pdf)                                                                    | model card    | 2026-08-12 (date printed; 'Revision: 2026-08-17', with a changelog)                                                                      | yes (for dating only; not in the cache) | no       | Not the latest of 2026.                                                                                                                                                                                                                                                                                                                    |
| xAI             | Grok 4.5                                                                   | [Model Card: Grok 4.5](https://media.x.ai/v1/website/4p5-5184fdf9.pdf)                                                                         | model card    | 2026-07-14 (date printed; 'Revision: 2026-07-20')                                                                                        | yes (for dating only; not in the cache) | no       | Not the latest of 2026. A copy also appears at cursor.com/resources/grok-4-5-model-card.pdf (third-party host, not retrieved).                                                                                                                                                                                                             |
| xAI             | Grok 4.20                                                                  | [Grok 4.20 System Card](https://data.x.ai/2026-04-07-grok-4-20-model-card.pdf)                                                                 | system card   | 2026-04-07 (date printed under the title)                                                                                                | yes (for dating only; not in the cache) | no       | Not the latest of 2026.                                                                                                                                                                                                                                                                                                                    |
| xAI             | Grok 4.1                                                                   | [Grok 4.1 Model Card](https://data.x.ai/2025-11-17-grok-4-1-model-card.pdf)                                                                    | model card    | 2025-11-17 (date printed under the title)                                                                                                | yes                                     | yes      | Latest card of 2025 reporting its own evaluations.                                                                                                                                                                                                                                                                                         |
| xAI             | Grok 4 Fast                                                                | [Grok 4 Fast Model Card](https://data.x.ai/2025-09-19-grok-4-fast-model-card.pdf)                                                              | model card    | 2025-09-19 (revision date printed: 'Last updated: September 19, 2025')                                                                   | yes (for dating only; not in the cache) | no       | Not the latest of 2025.                                                                                                                                                                                                                                                                                                                    |
| xAI             | Grok Code Fast 1                                                           | [Grok Code Fast 1 Model Card](https://data.x.ai/2025-08-26-grok-code-fast-1-model-card.pdf)                                                    | model card    | 2025-08-26 (revision date printed: 'Last updated: August 26, 2025')                                                                      | yes (for dating only; not in the cache) | no       | Not the latest of 2025.                                                                                                                                                                                                                                                                                                                    |
| xAI             | Grok 4                                                                     | [Grok 4 Model Card](https://data.x.ai/2025-08-20-grok-4-model-card.pdf)                                                                        | model card    | 2025-08-20 (revision date printed: 'Last updated: August 20, 2025')                                                                      | yes (for dating only; not in the cache) | no       | Not the latest of 2025. The dataset already holds this document (source-ab-grok4-card).                                                                                                                                                                                                                                                    |
| xAI             | Grok 2                                                                     | [Grok 2 (Hugging Face repository README, xai-org/grok-2)](https://huggingface.co/xai-org/grok-2/raw/main/README.md)                            | model card    | unknown                                                                                                                                  | yes (for dating only; not in the cache) | no       | Repository README shown as the Hugging Face model card: weights and usage instructions, no date printed (repository created 2025-08-22, last modified 2025-11-05, Hugging Face API). Reports no evaluations; not eligible under the rule.                                                                                                  |
| xAI             | Grok-1                                                                     | [Grok-1 (Hugging Face repository README, xai-org/grok-1)](https://huggingface.co/xai-org/grok-1/raw/main/README.md)                            | model card    | unknown                                                                                                                                  | yes (for dating only; not in the cache) | no       | Repository README for the open-weights release: download instructions, no date printed (repository created 2024-03-17, last modified 2024-03-28, Hugging Face API). Reports no evaluations and refers to no other card, so no xAI card of 2024 is eligible under the rule.                                                                 |

No card located:

- Google DeepMind: Gemini 1.0 (Ultra, Pro, Nano), December 2023. The model-card index links 'View model card' to storage.googleapis.com/deepmind-media/gemini/gemini_1_report.pdf#page=71: Appendix 10.1 'Gemini Ultra Model Card', a table inside the technical report 'Gemini: A Family of Highly Capable Multimodal Models' that refers to report sections for evaluation results. Recorded as a technical report under scope.md (open question). The served PDF prints no date.
- Google DeepMind: Gemini 1.5 (Pro, Flash), 2024. The index links 'View model card' to storage.googleapis.com/deepmind-media/gemini/gemini_v1_5_report.pdf#page=105: Appendix 12.1 'Model Card' (Table 45) of the technical report 'Gemini 1.5: Unlocking multimodal understanding across millions of tokens of context', referring to report sections for evaluations. Recorded as a technical report (open question). The served PDF prints no date.
- Google DeepMind: Gemini Robotics 1.5, September 2025. The index (date 25 September 2025) links 'View model card' to storage.googleapis.com/deepmind-media/gemini-robotics/Gemini-Robotics-1-5-Tech-Report.pdf#page=30, a section of a technical report; the report was not retrieved in this pass.
- Google DeepMind: Gemini 2.0 Pro (experimental). Not on the model-card index; the index notes that Gemini 2.0 Pro 'was released as an experimental model only'.
- Google DeepMind: PaLM 2, May 2023. Not on the Google DeepMind model-card index; announced by Google weeks after Google DeepMind was formed, so its attribution to Google DeepMind is not settled; its technical report was not retrieved in this pass.
- xAI: Grok-1, November 2023. x.ai/model-card (the drafter's recollection of a Grok-1 model card address, not confirmed) returned HTTP 403 (Cloudflare); web.archive.org connection reset; web searches for 'Grok-1 model card' and 'x.ai/model-card' found only secondary pages. The Hugging Face README of March 2024 is listed under cards.
- xAI: Grok-1.5 (March 2024), Grok-1.5 Vision (April 2024), Grok-2 and Grok-2 mini (August 2024), grok-2-1212 (December 2024). x.ai/news returned HTTP 403; docs.x.ai release notes list the December 2024 models without a card; web searches for Grok-1.5, Grok-1.5V and Grok 2 model cards found none. The xai-org/grok-2 Hugging Face README (August 2025) is listed under cards.
- xAI: Grok 3 (February 2025). Web searches for a Grok 3 model card found none; docs.x.ai release notes (April 2025 API launch) link no card.
- xAI: Grok 4.1 Fast (November 2025). data.x.ai/2025-11-19-grok-4-1-fast-model-card.pdf (guessed address) returned HTTP 404; web searches found no separate card; the release notes link the x.ai/news/grok-4-1-fast post (HTTP 403).
- xAI: Grok 4.3 (2026). Microsoft's Azure AI catalog page for grok-4.3 refers to 'the xAI Grok 4.3 model card' without an address; data.x.ai/2026-04-17-grok-4-3-model-card.pdf (guessed) returned HTTP 404; docs.x.ai model page links no card; web searches found none.
- xAI: Grok Build 0.1 (May 2026, early access). docs.x.ai model page and release notes link no card; web search found none.

### Group meta-microsoft

_Searched:_ Built 2026-11-02. Meta: blobless clones of meta-llama/llama, meta-llama/llama3, meta-llama/llama-models, meta-llama/codellama, meta-llama/PurpleLlama and facebookresearch/cwm, with git log of every MODEL_CARD*.md (the GitHub API is not enabled in this session); Hugging Face model listings for the meta-llama, meta-models and facebook organisations (API, sorted by creation date); research.meta.ai blog index and every Muse post linked from it (Muse Spark 1.1, Muse Code and Muse Spark 1.2, Muse Glimmer, Muse Spark 1.3, Muse Wonder, Muse Spark Open, 'Developing Capable Models Responsibly'); the arXiv record 2606.12429 (Muse Spark Safety & Preparedness Report); ai.meta.com answered HTTP 400 to every direct request. Microsoft: Hugging Face microsoft organisation searched for phi, Phi, MAI, Orca, bitnet, Fara, UserLM and Magma, with README and commit history of each Phi and MAI repository; microsoft.ai/models/ and microsoft.ai/news/ (read through a fetch tool; direct requests answer HTTP 403) and the MAI model pages and posts they link; card PDFs under microsoft.ai/pdf/. Web searches: 'Meta Muse Spark preparedness report 2026', 'Meta Superintelligence Labs model card safety report Advanced AI Scaling Framework', 'Microsoft AI MAI model card 2026', 'MAI-1-preview model card safety evaluation Frontier Governance Framework'. data/sources.json has no source for any Meta or Microsoft card (titles searched for 'Model Card', 'System Card', Llama, Phi, MAI). Population as read for this group: general-purpose generative language or multimodal-language models of Meta's LLaMA/Llama, Code Llama and Muse families and Microsoft's Phi and MAI families, plus Meta's CWM, which Meta assessed under its framework. Listed but outside: safety classifiers (Llama Guard, Prompt Guard), GUI-grounding models (Phi-Ground, Phi-Ground-Any), compression-research checkpoints (Phi-mini-MoE, Phi-tiny-MoE) and Orca 2. Not inventoried: format variants (ONNX, GGUF, FP8, quantised repositories), image, video, speech and embedding models (Muse Image, Muse Voice, MAI-Image, MAI-Voice, MAI-Transcribe, bitnet-embedding, VibeVoice), Meta FAIR research models (MobileLLM, MobileMoE and vision and 3D models) and Microsoft research models outside Phi and MAI (BitNet, Magma, UserLM, Fara). Hugging Face 'repository creation' and commit dates are repository metadata; a repository may have been private before release, so they are not release dates.

| Developer | Model                                  | Card                                                                                                                                                                                                                                          | Kind          | Card date                                                                                                                                                                    | Retrieved                                                                 | Compared | Note                                                                                                                                                                                                                                                               |
| --------- | -------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Meta      | LLaMA                                  | [LLaMA model card (MODEL_CARD.md, facebookresearch/llama, now meta-llama/llama)](https://raw.githubusercontent.com/meta-llama/llama/53011c3d7946dadb8274a4c5c7586ab54edf792d/MODEL_CARD.md)                                                   | model card    | 2023-02-24 (kind: commit adding the file, repository metadata; no date printed on the card); revised 2023-03-02; replaced at the same path by the Llama 2 card on 2023-07-18 | not attempted (located in the repository history)                         | no       | not the latest card of 2023                                                                                                                                                                                                                                        |
| Meta      | Llama 2                                | [Llama 2 model card (MODEL_CARD.md, meta-llama/llama)](https://raw.githubusercontent.com/meta-llama/llama/1f9a8d774a10fbe41321e530428e91f7eb7eb822/MODEL_CARD.md)                                                                             | model card    | 2023-07-18 (kind: commit adding the Llama 2 text, repository metadata; no date printed on the card); revisions 2023-07-21, 2023-09-20, 2023-10-14, 2024-03-23                | yes                                                                       | yes      | latest card of 2023 reporting its own evaluations: the later Code Llama card refers to its research paper for evaluations, and the Llama Guard card (December 2023) is outside the population                                                                      |
| Meta      | Code Llama                             | [Code Llama model card (MODEL_CARD.md, meta-llama/codellama)](https://raw.githubusercontent.com/meta-llama/codellama/1af62e1f43db1fa5140fa43cb828465a603a48f3/MODEL_CARD.md)                                                                  | model card    | 2023-08-24 (kind: commit adding the file, repository metadata; no date printed on the card); revised 2023-09-03 and 2024-01-29 (Code Llama 70B)                              | yes (read from a repository clone; not cached)                            | no       | does not report its own evaluations: 'Evaluation Results' refers to sections 3 and 4 of the research paper; it is not an addendum to an earlier card, so the rule passes to the latest card that reports evaluations (Llama 2)                                     |
| Meta      | Llama Guard                            | [Llama Guard model card (Llama-Guard/MODEL_CARD.md, meta-llama/PurpleLlama)](https://raw.githubusercontent.com/meta-llama/PurpleLlama/9fe9abf3105b71011a9bf8b9180058fba44aaea3/Llama-Guard/MODEL_CARD.md)                                     | model card    | 2023-12-06 (kind: commit adding the file, repository metadata); revised 2023-12-08                                                                                           | not attempted (located in the repository history)                         | no       | outside the population: safety classifier that labels prompts or responses, not a frontier model release; not compared                                                                                                                                             |
| Meta      | Llama 3                                | [Meta Llama 3 model card (MODEL_CARD.md, meta-llama/llama3)](https://raw.githubusercontent.com/meta-llama/llama3/e14519ce6a4296858940c68a37bded0a929481d1/MODEL_CARD.md)                                                                      | model card    | 2024-04-18 (kind: 'Model Release Date' printed on the card; file committed 2024-04-11 and revised to 2024-07-11)                                                             | yes (read from a repository clone; not cached)                            | no       | not the latest card of 2024                                                                                                                                                                                                                                        |
| Meta      | Llama Guard 2                          | [Meta Llama Guard 2 model card (Llama-Guard2/MODEL_CARD.md, meta-llama/PurpleLlama)](https://raw.githubusercontent.com/meta-llama/PurpleLlama/b7f5c2810926cc4ca189ce1864a85e11516a7b6b/Llama-Guard2/MODEL_CARD.md)                            | model card    | 2024-04-17 (kind: commit adding the file); revised to 2024-04-21                                                                                                             | not attempted (located in the repository history)                         | no       | outside the population: safety classifier that labels prompts or responses, not a frontier model release; not compared                                                                                                                                             |
| Meta      | Llama 3.1                              | [Llama 3.1 model card (models/llama3_1/MODEL_CARD.md, meta-llama/llama-models)](https://raw.githubusercontent.com/meta-llama/llama-models/e2e67cd8b0feca839666b7082dcc1c4fc0ae11e2/models/llama3_1/MODEL_CARD.md)                             | model card    | 2024-07-23 (kind: 'Model Release Date' printed on the card); revised to 2024-09-30                                                                                           | yes (read from a repository clone; not cached)                            | no       | not the latest card of 2024                                                                                                                                                                                                                                        |
| Meta      | Llama Guard 3 (8B)                     | [Llama Guard 3 model card (Llama-Guard3/MODEL_CARD.md, meta-llama/PurpleLlama)](https://raw.githubusercontent.com/meta-llama/PurpleLlama/d2b7a3552cf6347561e91cd1df9a6509bdeb0662/Llama-Guard3/MODEL_CARD.md)                                 | model card    | 2024-07-22 (kind: commit adding the file); revised to 2024-08-07; moved to Llama-Guard3/8B/ on 2024-09-25                                                                    | not attempted (located in the repository history)                         | no       | outside the population: safety classifier that labels prompts or responses, not a frontier model release; not compared                                                                                                                                             |
| Meta      | Prompt Guard                           | [Prompt Guard model card (Prompt-Guard/MODEL_CARD.md, meta-llama/PurpleLlama)](https://raw.githubusercontent.com/meta-llama/PurpleLlama/06c0ad361c8eaaf29b203ba6ed2df38a4f437d64/Prompt-Guard/MODEL_CARD.md)                                  | model card    | 2024-07-20 (kind: commit adding the file); revised to 2024-07-22                                                                                                             | not attempted (located in the repository history)                         | no       | outside the population: safety classifier that labels prompts or responses, not a frontier model release; not compared                                                                                                                                             |
| Meta      | Llama 3.2 (1B, 3B)                     | [Llama 3.2 model card (models/llama3_2/MODEL_CARD.md, meta-llama/llama-models)](https://raw.githubusercontent.com/meta-llama/llama-models/4a9ff6aede5cb4e036542132bb4f8b77a3134908/models/llama3_2/MODEL_CARD.md)                             | model card    | 2024-09-25 (kind: commit adding the file); the current text prints 'Model Release Date: Oct 24, 2024' after the update for quantized models (2024-10-24)                     | yes (read from a repository clone; not cached)                            | no       | not the latest card of 2024                                                                                                                                                                                                                                        |
| Meta      | Llama 3.2 Vision (11B, 90B)            | [Llama 3.2 Vision model card (models/llama3_2/MODEL_CARD_VISION.md, meta-llama/llama-models)](https://raw.githubusercontent.com/meta-llama/llama-models/e2e67cd8b0feca839666b7082dcc1c4fc0ae11e2/models/llama3_2/MODEL_CARD_VISION.md)        | model card    | 2024-09-25 (kind: 'Model Release Date' printed on the card); revised 2024-09-30                                                                                              | yes (read from a repository clone; not cached)                            | no       | not the latest card of 2024                                                                                                                                                                                                                                        |
| Meta      | Llama Guard 3 (1B and 11B-Vision)      | [Llama Guard 3 1B and 11B-Vision model cards (meta-llama/PurpleLlama)](https://raw.githubusercontent.com/meta-llama/PurpleLlama/fb5b398ab0c5c437ab233331b0d55d4d8faed590/Llama-Guard3/11B-vision/MODEL_CARD.md)                               | model card    | 2024-09-25 (kind: commit adding the files); the 11B-Vision card was revised 2024-11-18                                                                                       | not attempted (located in the repository history)                         | no       | outside the population: safety classifier that labels prompts or responses, not a frontier model release; not compared                                                                                                                                             |
| Meta      | Llama 3.3                              | [Llama 3.3 model card (models/llama3_3/MODEL_CARD.md, meta-llama/llama-models)](https://raw.githubusercontent.com/meta-llama/llama-models/8c88b8c0d75dbd136b6895220c4f56ccbe2f2d24/models/llama3_3/MODEL_CARD.md)                             | model card    | 2024-12-06 (kind: 'Model Release Date' printed on the card and commit adding the file); revised 2024-12-09 and 2025-02-12                                                    | yes                                                                       | yes      | latest card of 2024 reporting its own evaluations                                                                                                                                                                                                                  |
| Meta      | Llama 4 (Scout, Maverick)              | [Llama 4 model card (models/llama4/MODEL_CARD.md, meta-llama/llama-models)](https://raw.githubusercontent.com/meta-llama/llama-models/038acb9fe1e1ddc5cf1b3989fb07b311a0ffcae4/models/llama4/MODEL_CARD.md)                                   | model card    | 2025-04-05 (kind: 'Model Release Date' printed on the card and commits of that day)                                                                                          | yes (read from a repository clone; not cached)                            | no       | not the latest card of 2025                                                                                                                                                                                                                                        |
| Meta      | Llama Guard 4 and Llama Prompt Guard 2 | [Llama Guard 4 (12B) and Llama Prompt Guard 2 (22M, 86M) model cards (meta-llama/PurpleLlama)](https://raw.githubusercontent.com/meta-llama/PurpleLlama/cd9fe65792343c285730c967f888a7373d7e6c17/Llama-Guard4/12B/MODEL_CARD.md)              | model card    | 2025-04-29 (kind: commit adding the files)                                                                                                                                   | not attempted (located in the repository history)                         | no       | outside the population: safety classifier that labels prompts or responses, not a frontier model release; not compared                                                                                                                                             |
| Meta      | Code World Model (CWM)                 | [CWM model card (MODEL_CARD.md, facebookresearch/cwm; also the README of Hugging Face facebook/cwm)](https://raw.githubusercontent.com/facebookresearch/cwm/7930e0298bf32aae28cc0e35e18a54c772603364/MODEL_CARD.md)                           | model card    | 2025-09-24 (kind: commit 'CWM release', repository metadata; no date printed on the card); the Hugging Face README (revision 1b572b04) was last modified 2025-10-15          | yes (read from a repository clone and from Hugging Face; not cached)      | no       | same publication date (2025-09-24) as the CWM Preparedness Report, whose printed date (October 8, 2025) is later; the card refers to that report for the framework assessment                                                                                      |
| Meta      | Code World Model (CWM)                 | [Code World Model Preparedness Report](https://scontent-dfw6-2.xx.fbcdn.net/v/t39.2365-6/557601942_1468972530985309_838842257265552803_n.pdf)                                                                                                 | safety report | 2025-10-08 (kind: date printed on the report); Meta's publication page (https://ai.meta.com/research/publications/cwm-preparedness/) is dated September 24, 2025             | yes                                                                       | yes      | latest card of 2025 reporting its own evaluations, by its printed date; ties with the CWM model card on publication date (2025-09-24)                                                                                                                              |
| Meta      | Muse Spark                             | [Muse Spark Safety & Preparedness Report](https://ai.meta.com/static-resource/muse-spark-safety-and-preparedness-report/)                                                                                                                     | safety report | unknown printed date (not retrieved); arXiv 2606.12429v1 submitted 2026-05-14; the address above is the one cited in Meta's later reports                                    | no (HTTP 400 at ai.meta.com; arXiv abstract page read, PDF not retrieved) | no       | not the latest card of 2026 (unless reissued after 2026-10-23; see open questions)                                                                                                                                                                                 |
| Meta      | Muse Spark 1.1                         | [Muse Spark 1.1 Evaluation Report](https://research.meta.ai/static/muse-spark-1-1-evaluation-report)                                                                                                                                          | safety report | 2026-07-09 (kind: date printed on the report; Meta's announcement of the same day links it)                                                                                  | yes (inspected; not cached)                                               | no       | not the latest card of 2026                                                                                                                                                                                                                                        |
| Meta      | Muse Glimmer (30B)                     | [Muse-Glimmer-30B model card (README.md, Hugging Face meta-models/Muse-Glimmer-30B, revision cec94fcf)](https://huggingface.co/meta-models/Muse-Glimmer-30B/raw/cec94fcfd6512f2cfe708138c32533b346ea4f69/README.md)                           | model card    | 2026-08-09 (kind: repository creation, Hugging Face metadata); Meta's announcement dated 2026-08-10; README last modified 2026-10-22                                         | yes (inspected; not cached)                                               | no       | not the latest card of 2026                                                                                                                                                                                                                                        |
| Meta      | Muse Spark 1.3                         | [Muse Spark 1.3 Evaluation Report](https://research.meta.ai/static/muse-spark-1-3-evaluation-report)                                                                                                                                          | safety report | 2026-10-23 (kind: date printed on the report); Meta's announcement of the model (2026-09-02) links the same address                                                          | yes                                                                       | yes      | latest card of 2026 reporting its own evaluations, by its printed date (the brief's rule for ambiguous dates); under an earliest-publication reading the Muse Spark Open card (2026-10-15) would be latest (open question)                                         |
| Meta      | Muse Wonder and Muse Wonder Full       | [Muse Wonder Model Card](https://research.meta.ai/static/muse-wonder-model-card)                                                                                                                                                              | model card    | 2026-10-12 (kind: 'Date of Release' printed on the card; no separate card date); carries an update note dated 23 October 2026 on one evaluation table                        | yes (inspected; not cached)                                               | no       | not the latest card of 2026: its own date is the release date of 2026-10-12; the 23 October 2026 note is read as a revision                                                                                                                                        |
| Meta      | Muse Spark Open (816B-A42B)            | [Muse Spark Open model card (README.md, Hugging Face meta-models/Muse-Spark-Open-816B-A42B, revision 0fb02478)](https://huggingface.co/meta-models/Muse-Spark-Open-816B-A42B/resolve/0fb02478b02565b2ce7fc57e6051c91172774ac9/README.md)      | model card    | 2026-10-15 (kind: 'Date of Release' printed on the card; repository last modified the same day)                                                                              | yes                                                                       | no       | not selected under the printed-date rule (the Muse Spark 1.3 report prints October 23, 2026); it is the latest 2026 card by earliest publication date (open question). Cached, not drafted                                                                         |
| Microsoft | Phi-1                                  | [phi-1 model card (README.md, Hugging Face microsoft/phi-1, revision d4c0adcb)](https://huggingface.co/microsoft/phi-1/raw/d4c0adcb065e84e00ca814e35cba3012ea9841ab/README.md)                                                                | model card    | 2023-09-10 (kind: repository creation, Hugging Face metadata; no date printed on the card)                                                                                   | yes (README read; not cached)                                             | no       | not the latest card of 2023                                                                                                                                                                                                                                        |
| Microsoft | Phi-1.5                                | [phi-1_5 model card (README.md, Hugging Face microsoft/phi-1_5, revision 77aa61ee)](https://huggingface.co/microsoft/phi-1_5/raw/77aa61eeac94fbf33d492b9f2744c98b42d5b5eb/README.md)                                                          | model card    | 2023-09-10 (kind: repository creation, Hugging Face metadata; no date printed on the card)                                                                                   | yes (README read; not cached)                                             | no       | not the latest card of 2023                                                                                                                                                                                                                                        |
| Microsoft | Orca 2 (7B, 13B)                       | [Orca-2-13b model card (README.md, Hugging Face microsoft/Orca-2-13b, revision 2539ff53)](https://huggingface.co/microsoft/Orca-2-13b/raw/2539ff53e6baa4cc603774ad5a2d646f4041ea4e/README.md)                                                 | model card    | 2023-11-14 (kind: repository creation; README committed 2023-11-21)                                                                                                          | yes (README read; not cached)                                             | no       | outside the Phi and MAI families covered by this group; the card refers to the Orca 2 paper for evaluations; not compared                                                                                                                                          |
| Microsoft | Phi-2                                  | [phi-2 model card (README.md, Hugging Face microsoft/phi-2, revision 810d3678)](https://huggingface.co/microsoft/phi-2/raw/810d367871c1d460086d9f82db8696f2e0a0fcd0/README.md)                                                                | model card    | 2023-12-13 (kind: earliest README commit, Hugging Face metadata; no date printed on the card); revised to 2025-12-08                                                         | yes                                                                       | yes      | latest card of 2023 reporting its own evaluations (a summary sentence on benchmark results)                                                                                                                                                                        |
| Microsoft | Phi-3-mini-4k-instruct                 | [Phi-3-mini-4k-instruct model card (README.md, Hugging Face microsoft/Phi-3-mini-4k-instruct, revision f39ac1d2)](https://huggingface.co/microsoft/Phi-3-mini-4k-instruct/raw/f39ac1d28e925b323eae81227eaba4464caced4e/README.md)             | model card    | 2024-04-22 (kind: repository creation); the current text prints 'Release dates: June, 2024' after the June 2024 update                                                       | yes (README read; not cached)                                             | no       | not the latest card of 2024                                                                                                                                                                                                                                        |
| Microsoft | Phi-3-mini-128k-instruct               | [Phi-3-mini-128k-instruct model card (README.md, Hugging Face microsoft/Phi-3-mini-128k-instruct, revision f3c06aed)](https://huggingface.co/microsoft/Phi-3-mini-128k-instruct/raw/f3c06aed622e14ca0abf5115094e4fc9a9948f36/README.md)       | model card    | 2024-04-22 (kind: repository creation); the current text prints 'Release dates: June, 2024'                                                                                  | yes (README read; not cached)                                             | no       | not the latest card of 2024                                                                                                                                                                                                                                        |
| Microsoft | Phi-3-small-8k-instruct                | [Phi-3-small-8k-instruct model card (README.md, Hugging Face microsoft/Phi-3-small-8k-instruct, revision 188b876e)](https://huggingface.co/microsoft/Phi-3-small-8k-instruct/raw/188b876e997ee4055df01afe46274c14c400fe40/README.md)          | model card    | 2024-05-21 (kind: release date printed on the card, 'The model weight is released on May 21, 2024')                                                                          | yes (README read; not cached)                                             | no       | not the latest card of 2024                                                                                                                                                                                                                                        |
| Microsoft | Phi-3-small-128k-instruct              | [Phi-3-small-128k-instruct model card (README.md, Hugging Face microsoft/Phi-3-small-128k-instruct, revision e95b185a)](https://huggingface.co/microsoft/Phi-3-small-128k-instruct/raw/e95b185a59a58450c9b1dd7347a9dee78f18113e/README.md)    | model card    | 2024-05-21 (kind: release date printed on the card)                                                                                                                          | yes (README read; not cached)                                             | no       | not the latest card of 2024                                                                                                                                                                                                                                        |
| Microsoft | Phi-3-medium-4k-instruct               | [Phi-3-medium-4k-instruct model card (README.md, Hugging Face microsoft/Phi-3-medium-4k-instruct, revision 48d87cd5)](https://huggingface.co/microsoft/Phi-3-medium-4k-instruct/raw/48d87cd5e0523b430d77e93becd3655cd6897230/README.md)       | model card    | 2024-05-21 (kind: release date printed on the card)                                                                                                                          | yes (README read; not cached)                                             | no       | not the latest card of 2024                                                                                                                                                                                                                                        |
| Microsoft | Phi-3-medium-128k-instruct             | [Phi-3-medium-128k-instruct model card (README.md, Hugging Face microsoft/Phi-3-medium-128k-instruct, revision a088b37c)](https://huggingface.co/microsoft/Phi-3-medium-128k-instruct/raw/a088b37c71d441ab6d862bb3fcfe6165b3014702/README.md) | model card    | 2024-05-21 (kind: release date printed on the card)                                                                                                                          | yes (README read; not cached)                                             | no       | not the latest card of 2024                                                                                                                                                                                                                                        |
| Microsoft | Phi-3-vision-128k-instruct             | [Phi-3-vision-128k-instruct model card (README.md, Hugging Face microsoft/Phi-3-vision-128k-instruct, revision ed2772fa)](https://huggingface.co/microsoft/Phi-3-vision-128k-instruct/raw/ed2772fabe9dc9acd0caad54b62761d92520cc44/README.md) | model card    | 2024-05-21 (kind: release date printed on the card)                                                                                                                          | yes (README read; not cached)                                             | no       | not the latest card of 2024                                                                                                                                                                                                                                        |
| Microsoft | Phi-3.5-mini-instruct                  | [Phi-3.5-mini-instruct model card (README.md, Hugging Face microsoft/Phi-3.5-mini-instruct, revision 2fe19245)](https://huggingface.co/microsoft/Phi-3.5-mini-instruct/raw/2fe192450127e6a83f7441aef6e3ca586c338b77/README.md)                | model card    | 2024-08 (kind: 'Release date: August 2024' printed on the card; repository created 2024-08-16)                                                                               | yes (README read; not cached)                                             | no       | not the latest card of 2024                                                                                                                                                                                                                                        |
| Microsoft | Phi-3.5-MoE-instruct                   | [Phi-3.5-MoE-instruct model card (README.md, Hugging Face microsoft/Phi-3.5-MoE-instruct, revision 43688451)](https://huggingface.co/microsoft/Phi-3.5-MoE-instruct/raw/43688451b462a3351d8580625ebe1931adb3986d/README.md)                   | model card    | 2024-08 (kind: 'Release date: August 2024' printed on the card; repository created 2024-08-17)                                                                               | yes (README read; not cached)                                             | no       | not the latest card of 2024                                                                                                                                                                                                                                        |
| Microsoft | Phi-3.5-vision-instruct                | [Phi-3.5-vision-instruct model card (README.md, Hugging Face microsoft/Phi-3.5-vision-instruct, revision 12b77fb4)](https://huggingface.co/microsoft/Phi-3.5-vision-instruct/raw/12b77fb40b63a2c73c68243d3f767aab688a1b2a/README.md)          | model card    | 2024-08 (kind: 'Release date: August 2024' printed on the card; repository created 2024-08-16)                                                                               | yes (README read; not cached)                                             | no       | not the latest card of 2024                                                                                                                                                                                                                                        |
| Microsoft | Phi-4                                  | [Phi-4 Model Card (README.md, Hugging Face microsoft/phi-4, revision 2db69c1c)](https://huggingface.co/microsoft/phi-4/raw/2db69c1c3e91a05d2c64a3185acfbaf36f744e25/README.md)                                                                | model card    | 2024-12-12 (kind: 'Release date' printed on the card; earliest README commit 2024-12-11); README revised to 2025-11-24                                                       | yes                                                                       | yes      | latest card of 2024 reporting its own evaluations; dated by its printed release date (the Hugging Face repository was created in December 2024; its public availability date was not established)                                                                  |
| Microsoft | Phi-4-mini-instruct                    | [Phi-4-mini-instruct model card (README.md, Hugging Face microsoft/Phi-4-mini-instruct, revision cfbefacb)](https://huggingface.co/microsoft/Phi-4-mini-instruct/raw/cfbefacb99257ffa30c83adab238a50856ac3083/README.md)                      | model card    | 2025-02 (kind: 'Release date: February 2025' printed on the card)                                                                                                            | yes (README read; not cached)                                             | no       | not the latest card of 2025                                                                                                                                                                                                                                        |
| Microsoft | Phi-4-multimodal-instruct              | [Phi-4-multimodal-instruct model card (README.md, Hugging Face microsoft/Phi-4-multimodal-instruct, revision 93f923e1)](https://huggingface.co/microsoft/Phi-4-multimodal-instruct/raw/93f923e1a7727d1c4f446756212d9d3e8fcc5d81/README.md)    | model card    | 2025-02 (kind: 'Release date: February 2025' printed on the card)                                                                                                            | yes (README read; not cached)                                             | no       | not the latest card of 2025                                                                                                                                                                                                                                        |
| Microsoft | MAI-DS-R1                              | [MAI-DS-R1 model card (README.md, Hugging Face microsoft/MAI-DS-R1, revision a96d011a)](https://huggingface.co/microsoft/MAI-DS-R1/raw/a96d011a7111dcde61096468ebeeda8068735809/README.md)                                                    | model card    | 2025-04-16 (kind: repository creation; no date printed on the card)                                                                                                          | yes (README read; not cached)                                             | no       | not the latest card of 2025                                                                                                                                                                                                                                        |
| Microsoft | Phi-4-reasoning                        | [Phi-4-reasoning model card (README.md, Hugging Face microsoft/Phi-4-reasoning, revision 1de18ec9)](https://huggingface.co/microsoft/Phi-4-reasoning/raw/1de18ec97600877ce63dbf60c73b998da99f0195/README.md)                                  | model card    | 2025-04-30 (kind: 'Release date' printed on the card)                                                                                                                        | yes (README read; not cached)                                             | no       | not the latest card of 2025                                                                                                                                                                                                                                        |
| Microsoft | Phi-4-reasoning-plus                   | [Phi-4-reasoning-plus model card (README.md, Hugging Face microsoft/Phi-4-reasoning-plus, revision 69baf852)](https://huggingface.co/microsoft/Phi-4-reasoning-plus/raw/69baf8528e1bcf05f475034d9e5dd32875ed125f/README.md)                   | model card    | 2025-04-30 (kind: 'Release date' printed on the card)                                                                                                                        | yes (README read; not cached)                                             | no       | not the latest card of 2025                                                                                                                                                                                                                                        |
| Microsoft | Phi-4-mini-reasoning                   | [Phi-4-mini-reasoning model card (README.md, Hugging Face microsoft/Phi-4-mini-reasoning, revision 0e3b1e2d)](https://huggingface.co/microsoft/Phi-4-mini-reasoning/raw/0e3b1e2d02ee478a3743abe3f629e9c0cb722e0a/README.md)                   | model card    | 2025-04 (kind: 'Release date: April 2025' printed on the card)                                                                                                               | yes (README read; not cached)                                             | no       | not the latest card of 2025                                                                                                                                                                                                                                        |
| Microsoft | Phi-4-mini-flash-reasoning             | [Phi-4-mini-flash-reasoning model card (README.md, Hugging Face microsoft/Phi-4-mini-flash-reasoning, revision 1dff8163)](https://huggingface.co/microsoft/Phi-4-mini-flash-reasoning/raw/1dff8163d28ec880ca2411c474ddc0a927792810/README.md) | model card    | 2025-06 (kind: 'Release date: June 2025' printed on the card; earliest README commit 2025-06-22); revised to 2025-12-10                                                      | yes                                                                       | yes      | latest card of 2025 reporting its own evaluations within the population                                                                                                                                                                                            |
| Microsoft | Phi-mini-MoE-instruct                  | [Phi-mini-MoE-instruct model card (README.md, Hugging Face microsoft/Phi-mini-MoE-instruct, revision f620b32c)](https://huggingface.co/microsoft/Phi-mini-MoE-instruct/raw/f620b32c0d3e8f7e76f57ccdaa88e0df8bc8bfcd/README.md)                | model card    | 2025-06-23 (kind: earliest README commit; no date printed on the card); revised to 2025-12-10                                                                                | yes (README read; not cached)                                             | no       | outside the population: compressed research checkpoint released with the SlimMoE paper; not compared (open question)                                                                                                                                               |
| Microsoft | Phi-tiny-MoE-instruct                  | [Phi-tiny-MoE-instruct model card (README.md, Hugging Face microsoft/Phi-tiny-MoE-instruct, revision 2fe50e88)](https://huggingface.co/microsoft/Phi-tiny-MoE-instruct/raw/2fe50e88d0e2a5a132563815686ea0dcc8e252b5/README.md)                | model card    | 2025-06-23 (kind: earliest README commit; no date printed on the card); revised to 2025-12-10                                                                                | yes (README read; not cached)                                             | no       | outside the population: compressed research checkpoint released with the SlimMoE paper; not compared (open question)                                                                                                                                               |
| Microsoft | Phi-Ground-4B-7C                       | [Phi-Ground model card (README.md, Hugging Face microsoft/Phi-Ground, revision 5eed0cda)](https://huggingface.co/microsoft/Phi-Ground/raw/5eed0cdac8f426c1f95650fa764c91306c4221a4/README.md)                                                 | model card    | 2025-09-07 (kind: README upload, Hugging Face metadata; repository created 2025-08-15; no date printed on the card)                                                          | yes (README read; not cached)                                             | no       | outside the population: GUI-grounding model that outputs screen coordinates, fine-tuned from Phi-3.5-vision; not compared (open question)                                                                                                                          |
| Microsoft | Phi-4-reasoning-vision-15B             | [Phi-4-reasoning-vision-15B model card (README.md, Hugging Face microsoft/Phi-4-reasoning-vision-15B, revision c3e4fac7)](https://huggingface.co/microsoft/Phi-4-reasoning-vision-15B/raw/c3e4fac79ddace21976ced56fbf1564b8bd8c89f/README.md) | model card    | 2026-03-04 (kind: 'Release Date' printed on the card); README revised to 2026-08-31                                                                                          | yes (README read; not cached)                                             | no       | not the latest card of 2026                                                                                                                                                                                                                                        |
| Microsoft | Phi-Ground-Any                         | [Phi-Ground-Any model card (README.md, Hugging Face microsoft/Phi-Ground-Any, revision 08139912)](https://huggingface.co/microsoft/Phi-Ground-Any/raw/081399127fd191906edf46a98f3d8d5193e328c2/README.md)                                     | model card    | 2026-05-07 (kind: repository creation; no date printed on the card)                                                                                                          | yes (README read; not cached)                                             | no       | outside the population: GUI-grounding model; not compared                                                                                                                                                                                                          |
| Microsoft | MAI-Thinking-1                         | [MAI-Thinking-1 model card](https://microsoft.ai/pdf/MAI-Thinking-1-Model-Card.PDF)                                                                                                                                                           | model card    | unknown printed date (the card prints a training cut-off and no date of its own); PDF metadata records creation on 2026-06-02                                                | yes (inspected; not cached)                                               | no       | not the latest card of 2026. The model page's 'Model card' link leads to the Microsoft Foundry catalogue entry; this PDF was located at the address pattern of the other MAI cards. A technical report (https://microsoft.ai/pdf/mai-thinking-1.pdf) is not a card |
| Microsoft | MAI-Code-1-Flash                       | [MAI-Code-1-Flash model card](https://microsoft.ai/pdf/MAI-Code-1-Flash-Model-Card.PDF)                                                                                                                                                       | model card    | 2026-06-02 (kind: 'Release date' printed on the card)                                                                                                                        | yes (inspected; not cached)                                               | no       | not the latest card of 2026                                                                                                                                                                                                                                        |
| Microsoft | MAI-Cyber-1-Flash                      | [MAI-Cyber-1-Flash model card](https://microsoft.ai/pdf/MAI-Cyber-1-Flash-Model-Card.pdf)                                                                                                                                                     | model card    | 2026-07-27 (kind: 'Release date' printed on the card)                                                                                                                        | yes (inspected; not cached)                                               | no       | not the latest card of 2026                                                                                                                                                                                                                                        |
| Microsoft | MAI-Code-1.1-Flash                     | [MAI-Code-1.1-Flash model card](https://microsoft.ai/pdf/MAI-Code-1.1-Flash-Model-Card.PDF)                                                                                                                                                   | model card    | 2026-08-11 (kind: 'Release date' printed on the card)                                                                                                                        | yes (inspected; not cached)                                               | no       | not the latest card of 2026                                                                                                                                                                                                                                        |
| Microsoft | MAI-Cyber-1.1-Flash                    | [MAI-Cyber-1.1-Flash model card](https://microsoft.ai/pdf/MAI-Cyber-1.1-Flash-ORA-Model-Card.pdf)                                                                                                                                             | model card    | 2026-10-27 (kind: 'Release date' printed on the card)                                                                                                                        | yes                                                                       | yes      | latest card of 2026 reporting its own evaluations; it describes the model as an update to MAI-Cyber-1-Flash but reports its own evaluations                                                                                                                        |

No card located:

- Meta: Muse Spark 1.2 (with Muse Code). Meta's post 'Introducing Muse Code and Muse Spark 1.2' (research.meta.ai, 2026-08-05) and 'The Multimodal Intelligence of Muse Spark 1.2' (2026-08-20), read 2026-11-02. They link 'Muse Spark 1.2 & Muse Code Evaluation Methodology' (https://research.meta.ai/static/muse-spark-1-2-methodology, benchmark methodology, about 850 words, no safety or framework content) and a multimodal evaluation methodology. No card or safety report located.
- Microsoft: MAI-1-preview. microsoft.ai news post 'Two in-house models in support of our mission' (dated 2025-08-28; read through a fetch tool because microsoft.ai pages answer HTTP 403 directly): no card, system card, safety report or technical report linked. Hugging Face microsoft organisation searched for 'MAI'; microsoft.ai/models/ lists no MAI-1-preview page. No card located.
- Microsoft: MAI-Vision-1. Named in third-party coverage of Microsoft's 2026 MAI releases; microsoft.ai/models/ (2026-11-02) lists no page for it, and no card PDF was located. Not confirmed from a Microsoft source that the model was released.

### Group openai

_Searched:_ 2026-11-02. OpenAI Deployment Safety Hub (deploymentsafety.openai.com): index page, RSS feed (30 items, 2025-02-25 to 2026-10-30) and sitemap (32 card paths), each card’s hub page read for title, “Published” date, change log and PDF link. cdn.openai.com PDFs for cards before the hub (addresses taken from hub pages, from links inside retrieved cards and from known file paths; header requests before retrieval). Dataset sources (data/sources.json) with OpenAI as publisher and “System Card” in the title. Web searches (used for discovery, not as evidence) for 2026 addenda, the o3 Operator addendum, GPT-4 Turbo, GPT-4o mini, GPT-4.1, o3-pro, gpt-oss-safeguard, GPT-5.3-Codex-Spark and GPT-5.4 mini. openai.com HTML pages returned HTTP 403; web.archive.org not attempted. Card dates are printed cover dates unless stated; hub dates are publication listings.

| Developer | Model                                                           | Card                                                                                                                                                                                | Kind        | Card date                                                                                                                       | Retrieved     | Compared | Note                                                                                                                                                                                                                                                                                                             |
| --------- | --------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------- | ------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| OpenAI    | GPT-4                                                           | [GPT-4 System Card](https://cdn.openai.com/papers/gpt-4-system-card.pdf)                                                                                                            | system card | unknown                                                                                                                         | yes           | no       | not the latest card of its year (2023; GPT-4V(ision) System Card, 2023-09-25, is later). No date is printed on the card; the text records internal adversarial testing of GPT-4-launch on March 10, 2023. Dataset source: source-eval-i-gpt4-card.                                                               |
| OpenAI    | GPT-4V (GPT-4 with vision)                                      | [GPT-4V(ision) System Card](https://cdn.openai.com/papers/GPTV_System_Card.pdf)                                                                                                     | system card | 2023-09-25 (kind: date printed on the card)                                                                                     | yes           | yes      | latest card of 2023 reporting its own evaluations (DALL·E 3 System Card, 2023-10-03, is outside the population). GPT-4V is a vision-input language model; see open questions.                                                                                                                                    |
| OpenAI    | DALL·E 3                                                        | [DALL·E 3 System Card](https://cdn.openai.com/papers/DALL_E_3_System_Card.pdf)                                                                                                      | system card | 2023-10-03 (kind: date printed on the card)                                                                                     | yes           | no       | outside the population (image-generation model); listed, not compared.                                                                                                                                                                                                                                           |
| OpenAI    | GPT-4o                                                          | [GPT-4o System Card](https://cdn.openai.com/gpt-4o-system-card.pdf)                                                                                                                 | system card | 2024-08-08 (kind: date printed on the card)                                                                                     | yes           | no       | not the latest card of its year (2024).                                                                                                                                                                                                                                                                          |
| OpenAI    | OpenAI o1-preview and o1-mini                                   | [OpenAI o1 System Card (September 2024)](https://cdn.openai.com/o1-system-card-20240917.pdf)                                                                                        | system card | 2024-09-12 (kind: date printed on the card, “Sept 12, 2024”)                                                                    | yes           | no       | not the latest card of its year (2024). A second expression at https://cdn.openai.com/o1-preview-system-card-20240917.pdf (cache key openai-o1-preview) carries the same cover date and an added header stating that it reflects o1-preview and pointing to the December 5 2024 card.                            |
| OpenAI    | OpenAI o1 (and o1-mini)                                         | [OpenAI o1 System Card](https://cdn.openai.com/o1-system-card-20241205.pdf)                                                                                                         | system card | 2024-12-05 (kind: date printed on the card); revision: section added 2024-12-19 (footnote 3)                                    | yes           | yes      | latest card of 2024 reporting its own evaluations (the Sora System Card of December 2024 is outside the population). Dataset source: source-o1-card (web expression).                                                                                                                                            |
| OpenAI    | Sora                                                            | [Sora System Card](https://openai.com/index/sora-system-card/)                                                                                                                      | system card | unknown                                                                                                                         | no (HTTP 403) | no       | outside the population (video-generation model); listed, not compared. Not retrieved: openai.com returned HTTP 403; date not established from the card.                                                                                                                                                          |
| OpenAI    | Computer-Using Agent (Operator)                                 | [Operator System Card](https://cdn.openai.com/operator_system_card.pdf)                                                                                                             | system card | 2025-01-23 (kind: date printed on the card)                                                                                     | yes           | no       | not the latest card of its year (2025).                                                                                                                                                                                                                                                                          |
| OpenAI    | OpenAI o3-mini                                                  | [OpenAI o3-mini System Card](https://cdn.openai.com/o3-mini-system-card-feb10.pdf)                                                                                                  | system card | 2025-01-31 (kind: date printed on the card)                                                                                     | yes           | no       | not the latest card of its year (2025). The file name suggests a February 10 version; the cover reads January 31, 2025. https://cdn.openai.com/o3-mini-system-card.pdf returned HTTP 404.                                                                                                                        |
| OpenAI    | Deep research (early version of OpenAI o3)                      | [Deep Research System Card](https://cdn.openai.com/deep-research-system-card.pdf)                                                                                                   | system card | 2025-02-25 (kind: date printed on the card)                                                                                     | yes           | no       | not the latest card of its year (2025).                                                                                                                                                                                                                                                                          |
| OpenAI    | OpenAI GPT-4.5                                                  | [OpenAI GPT-4.5 System Card](https://cdn.openai.com/gpt-4-5-system-card-2272025.pdf)                                                                                                | system card | 2025-02-27 (kind: date printed on the card)                                                                                     | yes           | no       | not the latest card of its year (2025).                                                                                                                                                                                                                                                                          |
| OpenAI    | GPT-4o native image generation                                  | [Addendum to GPT-4o System Card: Native image generation](https://cdn.openai.com/11998be9-5319-4302-bfbf-1167e093f1fb/Native_Image_Generation_System_Card.pdf)                      | addendum    | 2025-03-25 (kind: date printed on the card)                                                                                     | yes           | no       | outside the population (image-generation model); listed, not compared.                                                                                                                                                                                                                                           |
| OpenAI    | OpenAI o3 and o4-mini                                           | [OpenAI o3 and o4-mini System Card](https://cdn.openai.com/pdf/2221c875-02dc-4789-800b-e7758f3722c1/o3-and-o4-mini-system-card.pdf)                                                 | system card | 2025-04-16 (kind: date printed on the card)                                                                                     | yes           | no       | not the latest card of its year (2025). The Deployment Safety Hub page lists it as “Published March 1, 2024”, which conflicts with the cover; the hub also records a section added April 24, 2026.                                                                                                               |
| OpenAI    | codex-1 (Codex)                                                 | [Addendum to o3 and o4-mini system card: Codex](https://cdn.openai.com/pdf/8df7697b-c1b2-4222-be00-1fd3298f351d/codex_system_card.pdf)                                              | addendum    | 2025-05-16 (kind: date printed on the card)                                                                                     | yes           | no       | not the latest card of its year (2025).                                                                                                                                                                                                                                                                          |
| OpenAI    | OpenAI o3 Operator                                              | [Addendum to OpenAI o3 and o4-mini system card: OpenAI o3 Operator](https://openai.com/index/o3-o4-mini-system-card-addendum-operator-o3/)                                          | addendum    | unknown                                                                                                                         | no (HTTP 403) | no       | not the latest card of its year (2025): a web search result (used for discovery, not as evidence) dates it May 2025. Not retrieved: openai.com returned HTTP 403; no PDF address located.                                                                                                                        |
| OpenAI    | ChatGPT agent                                                   | [ChatGPT Agent System Card](https://cdn.openai.com/pdf/839e66fc-602c-48bf-81d3-b21eacc3459d/chatgpt_agent_system_card.pdf)                                                          | system card | 2025-07-17 (kind: date printed on the card)                                                                                     | yes           | no       | not the latest card of its year (2025). Dataset source: source-openai-chatgpt-agent-system-card.                                                                                                                                                                                                                 |
| OpenAI    | gpt-oss-120b and gpt-oss-20b                                    | [gpt-oss-120b & gpt-oss-20b Model Card](https://cdn.openai.com/pdf/419b6906-9da6-406c-a19d-1bb078ac7637/oai_gpt-oss_model_card.pdf)                                                 | model card  | 2025-08-05 (kind: date printed on the card)                                                                                     | yes           | no       | not the latest card of its year (2025).                                                                                                                                                                                                                                                                          |
| OpenAI    | GPT-5                                                           | [GPT-5 System Card](https://cdn.openai.com/gpt-5-system-card.pdf)                                                                                                                   | system card | 2025-08-13 (kind: date printed on the card); the hub lists publication on 2025-08-07                                            | yes           | no       | not the latest card of its year (2025). Dataset source: source-ab-gpt5-card; the hub records a section added April 24, 2026.                                                                                                                                                                                     |
| OpenAI    | GPT-5-Codex                                                     | [Addendum to GPT-5 system card: GPT-5-Codex](https://cdn.openai.com/pdf/97cc5669-7a25-4e63-b15f-5fd5bdc4d149/gpt-5-codex-system-card.pdf)                                           | addendum    | 2025-09-15 (kind: date printed on the card)                                                                                     | yes           | no       | not the latest card of its year (2025).                                                                                                                                                                                                                                                                          |
| OpenAI    | Sora 2                                                          | [Sora 2 System Card](https://cdn.openai.com/pdf/50d5973c-c4ff-4c2d-986f-c72b5d0ff069/sora_2_system_card.pdf)                                                                        | system card | 2025-09-30 (kind: date printed on the card)                                                                                     | yes           | no       | outside the population (video and audio generation model); listed, not compared.                                                                                                                                                                                                                                 |
| OpenAI    | GPT-5 default model, October 3 update                           | [Addendum to GPT-5 System Card: Sensitive Conversations](https://cdn.openai.com/pdf/3da476af-b937-47fb-9931-88a851620101/addendum-to-gpt-5-system-card-sensitive-conversations.pdf) | addendum    | 2025-10-27 (kind: date printed on the card)                                                                                     | yes           | no       | not the latest card of its year (2025).                                                                                                                                                                                                                                                                          |
| OpenAI    | GPT-5.1 Instant and GPT-5.1 Thinking                            | [GPT-5.1 Instant and GPT-5.1 Thinking System Card Addendum](https://cdn.openai.com/pdf/4173ec8d-1229-47db-96de-06d87147e07e/5_1_system_card.pdf)                                    | addendum    | 2025-11-12 (kind: date printed on the card)                                                                                     | yes           | no       | not the latest card of its year (2025).                                                                                                                                                                                                                                                                          |
| OpenAI    | GPT-5.1-Codex-Max                                               | [GPT-5.1-Codex-Max System Card](https://cdn.openai.com/pdf/2a7d98b1-57e5-4147-8d0e-683894d782ae/5p1_codex_max_card_03.pdf)                                                          | system card | 2025-11-18 (kind: date printed on the card)                                                                                     | yes           | no       | not the latest card of its year (2025).                                                                                                                                                                                                                                                                          |
| OpenAI    | GPT-5.2                                                         | [Update to GPT-5 System Card: GPT-5.2](https://cdn.openai.com/pdf/3a4153c8-c748-4b71-8e31-aecbde944f8d/oai_5_2_system-card.pdf)                                                     | addendum    | 2025-12-11 (kind: date printed on the card)                                                                                     | yes           | no       | not the latest card of its year (2025); the hub records a section added April 24, 2026.                                                                                                                                                                                                                          |
| OpenAI    | GPT-5.2-Codex                                                   | [Addendum to GPT-5.2 System Card: GPT-5.2-Codex](https://cdn.openai.com/pdf/ac7c37ae-7f4c-4442-b741-2eabdeaf77e0/oai_5_2_Codex.pdf)                                                 | addendum    | 2025-12-18 (kind: date printed on the card)                                                                                     | yes           | yes      | latest card of 2025 reporting its own evaluations: an addendum that reports its own Preparedness evaluations.                                                                                                                                                                                                    |
| OpenAI    | GPT-5.3-Codex                                                   | [GPT-5.3-Codex System Card](https://deploymentsafety.openai.com/gpt-5-3-codex/gpt-5-3-codex.pdf)                                                                                    | system card | 2026-02-05 (kind: date printed on the card)                                                                                     | yes           | no       | not the latest card of its year (2026).                                                                                                                                                                                                                                                                          |
| OpenAI    | GPT-5.3 Instant                                                 | [GPT-5.3 Instant System Card](https://deploymentsafety.openai.com/gpt-5-3-instant/gpt-5-3-instant.pdf)                                                                              | system card | 2026-03-03 (kind: date printed on the card); the hub lists 2026-03-02                                                           | yes           | no       | not the latest card of its year (2026).                                                                                                                                                                                                                                                                          |
| OpenAI    | GPT-5.4 Thinking (and GPT-5.4 mini, appendix)                   | [GPT-5.4 Thinking System Card](https://deploymentsafety.openai.com/gpt-5-4-thinking/gpt-5-4-thinking.pdf)                                                                           | system card | 2026-03-05 (kind: date printed on the card)                                                                                     | yes           | no       | not the latest card of its year (2026). The hub page records an appendix on GPT-5.4 mini added March 17, 2026 and a section updated April 24, 2026.                                                                                                                                                              |
| OpenAI    | ChatGPT Images 2.0                                              | [System Card: ChatGPT Images 2.0 and Thinking mode](https://deploymentsafety.openai.com/chatgpt-images-2-0/chatgpt-images-2-0.pdf)                                                  | system card | 2026-04-21 (kind: date printed on the card)                                                                                     | yes           | no       | outside the population (image-generation model); listed, not compared.                                                                                                                                                                                                                                           |
| OpenAI    | GPT-5.5                                                         | [GPT-5.5 System Card](https://deploymentsafety.openai.com/gpt-5-5/gpt-5-5.pdf)                                                                                                      | system card | 2026-04-23 (kind: date printed on the card); revisions recorded on the hub page: 2026-04-24, 2026-08-19                         | yes           | no       | not the latest card of its year (2026).                                                                                                                                                                                                                                                                          |
| OpenAI    | GPT-5.5 Instant                                                 | [GPT-5.5 Instant System Card](https://deploymentsafety.openai.com/gpt-5-5-instant/gpt-5-5-instant.pdf)                                                                              | system card | 2026-05-04 (kind: date printed on the card); the hub lists 2026-05-05                                                           | yes           | no       | not the latest card of its year (2026).                                                                                                                                                                                                                                                                          |
| OpenAI    | GPT-Rosalind-5.5                                                | [GPT-Rosalind-5.5 System Card](https://deploymentsafety.openai.com/gpt-rosalind-5-5/gpt-rosalind-5-5.pdf)                                                                           | system card | 2026-06-03 (kind: date printed on the card)                                                                                     | yes           | no       | not the latest card of its year (2026). The hub describes the model as incrementally trained from GPT-5.5.                                                                                                                                                                                                       |
| OpenAI    | GPT-5.6 (Sol, Terra, Luna) preview                              | [OpenAI GPT-5.6 Preview System Card](https://deploymentsafety.openai.com/gpt-5-6-preview/gpt-5-6-preview.pdf)                                                                       | system card | 2026-06-25 (kind: date printed on the card); the hub lists 2026-06-26                                                           | yes           | no       | not the latest card of its year (2026).                                                                                                                                                                                                                                                                          |
| OpenAI    | GPT-Live-1 and GPT-Live-1 mini                                  | [OpenAI GPT-Live System Card](https://deploymentsafety.openai.com/gpt-live/gpt-live.pdf)                                                                                            | system card | 2026-07-08 (kind: date printed on the card); revision recorded on the hub page: 2026-08-04                                      | yes           | no       | outside the population (voice models, described by the hub as “a new generation of voice models”); listed, not compared.                                                                                                                                                                                         |
| OpenAI    | GPT-5.6 (Sol, Terra, Luna)                                      | [OpenAI GPT-5.6 System Card](https://deploymentsafety.openai.com/gpt-5-6/gpt-5-6.pdf)                                                                                               | system card | 2026-07-09 (kind: date printed on the card); revisions recorded on the hub page: 2026-08-03, 2026-08-19                         | yes           | no       | not the latest card of its year (2026).                                                                                                                                                                                                                                                                          |
| OpenAI    | GPT-5.6 August updates (new default model; updated GPT-5.6 Sol) | [OpenAI GPT-5.6 – August Updates](https://deploymentsafety.openai.com/gpt-5-6-august-update/gpt-5-6-august-update.pdf)                                                              | addendum    | 2026-08-06 (kind: date printed on the card)                                                                                     | yes           | no       | not the latest card of its year (2026).                                                                                                                                                                                                                                                                          |
| OpenAI    | GPT-6 Astra                                                     | [OpenAI GPT-6 Astra System Card](https://deploymentsafety.openai.com/gpt-6-astra/gpt-6-astra.pdf)                                                                                   | system card | 2026-09-03 (kind: date printed on the card); revisions recorded on the hub page: 2026-09-09, 2026-09-22, 2026-09-29, 2026-10-30 | yes           | no       | not the latest card of its year (2026) by its printed date. Its latest recorded revision (2026-10-30) is a revision date, not the card’s date; the rule was applied to printed dates. The hub records appendices on GPT-6 Sol, GPT-6 Luna and “dots”.                                                            |
| OpenAI    | ChatGPT Images 2.5                                              | [OpenAI ChatGPT Images 2.5 System Card](https://deploymentsafety.openai.com/chatgpt-images-2-5/chatgpt-images-2-5.pdf)                                                              | system card | 2026-09-08 (kind: date printed on the card)                                                                                     | yes           | no       | outside the population (image-generation model); listed, not compared.                                                                                                                                                                                                                                           |
| OpenAI    | GPT-6.1 Sol                                                     | [OpenAI Addendum: GPT-6.1 Sol System Card](https://deploymentsafety.openai.com/gpt-6-1-sol/gpt-6-1-sol.pdf)                                                                         | addendum    | 2026-09-29 (kind: date printed on the card)                                                                                     | yes           | no       | not the latest card of its year (2026).                                                                                                                                                                                                                                                                          |
| OpenAI    | GPT-6 Sol and GPT-6 Luna (October 7)                            | [OpenAI GPT-6 Sol and GPT-6 Luna: October 2026 update](https://deploymentsafety.openai.com/gpt-6-october/gpt-6-october.pdf)                                                         | system card | 2026-10-07 (kind: date printed on the card)                                                                                     | yes           | no       | not the latest card of its year (2026). Referred to by the October 29 addendum as the “GPT-6 Luna (October 7) card”.                                                                                                                                                                                             |
| OpenAI    | GPT-Live-1.1                                                    | [OpenAI GPT-Live-1.1 System Card](https://deploymentsafety.openai.com/gpt-live-1-1/gpt-live-1-1.pdf)                                                                                | system card | 2026-10-15 (kind: date printed on the card)                                                                                     | yes           | no       | outside the population (voice model); listed, not compared.                                                                                                                                                                                                                                                      |
| OpenAI    | GPT-6.1 Terra                                                   | [Addendum to GPT-6 Astra System Card: GPT-6.1 Terra](https://deploymentsafety.openai.com/gpt-6-1-terra/gpt-6-1-terra.pdf)                                                           | addendum    | unknown                                                                                                                         | yes           | no       | not the latest card of its year (2026). No date is printed on the card; the hub page lists “Published October 26, 2026”.                                                                                                                                                                                         |
| OpenAI    | GPT-6 Luna (October 29)                                         | [Addendum to GPT-6 Luna System Card: October 29, 2026 Update](https://deploymentsafety.openai.com/gpt-6-luna-october-28-2026-addendum/gpt-6-luna-october-28-2026-addendum.pdf)      | addendum    | 2026-10-29 (kind: date printed on the card); the hub lists publication on 2026-10-29 at an address reading “october-28”         | yes           | yes      | latest in-population card of 2026 (to the check date) reporting its own evaluations: an addendum on an updated model with its own safety and Preparedness results.                                                                                                                                               |
| OpenAI    | GPT-Rosalind-6 (GPT-6 Astra weights)                            | [GPT-Rosalind-6 System Card Addendum](https://deploymentsafety.openai.com/gpt-rosalind-6/gpt-rosalind-6.pdf)                                                                        | addendum    | 2026-10 (kind: date printed on the card, month precision); the hub lists publication on 2026-10-30                              | yes           | no       | outside the population as drafted: the card states that GPT-Rosalind-6 uses the same weights as GPT-6 Astra with no added training data or post-training, so the card covers no new model (scope.md). It reports its own biological evaluations and would otherwise be the latest 2026 card; see open questions. |

No card located:

- OpenAI: GPT-4 Turbo (preview announced November 2023). Deployment Safety Hub index, RSS and sitemap (cards from February 2025 onward; no entry); web search 2026-11-02 for a GPT-4 Turbo system card returned launch coverage and no card. No card located.
- OpenAI: GPT-4o mini (July 2024). Hub index, RSS and sitemap (no entry); web search 2026-11-02 for a GPT-4o mini system card found OpenAI’s launch post (openai.com, HTTP 403 from here), which per the search summary refers to GPT-4o’s safety work. No card located.
- OpenAI: GPT-4.1 (April 2025). Hub index, RSS and sitemap (no entry); web search 2026-11-02 found press reports, relayed by aggregators citing TechCrunch, that OpenAI said it would not publish a separate system card. Press reports serve as discovery leads, not evidence. No card located.
- OpenAI: OpenAI o3-pro (June 2025). Hub index, RSS and sitemap (no entry); web search 2026-11-02 found secondary reports that OpenAI pointed to the o3 system card. No separate card located.
- OpenAI: gpt-oss-safeguard-120b and gpt-oss-safeguard-20b (October 2025). Web search 2026-11-02 found a technical report, “Technical report: Research Preview of gpt-oss-safeguard” (https://cdn.openai.com/pdf/08b7dee4-8bc6-4955-a219-7793fb69090c/Technical_report__Research_Preview_of_gpt_oss_safeguard.pdf, HTTP 200 on a header request; openai.com report page HTTP 403). A technical report is not a card under scope.md; not retrieved in full.
- OpenAI: GPT-5.3-Codex-Spark (February 2026). Hub index, RSS and sitemap (no entry); web search 2026-11-02 returned third-party pages and no OpenAI card. No card located.

## Sources

| Key                                   | Card                                                                                                                    | Address                                                                                                                          | HTTP | SHA-256             | Retrieved  | Words | Archive                                                                                                                                                                                                                                                                                                                                                        |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ---- | ------------------- | ---------- | ----- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| anthropic-claude-2-1                  | Model Card and Evaluations for Claude Models, with 'Claude 2.1 Model Card Appendix' (update of November 21, 2023)       | https://www-cdn.anthropic.com/5c49cc247484cecf107c699baf29250302e5da70/ModelCardClaudev2_with_appendix_v1.pdf                    | 200  | `e735ad89f95c7aa2…` | 2026-11-02 | 6117  | Not checked: web.archive.org is unreachable from this environment. This expression (16 pages, linked from Anthropic's Claude 2.1 announcement) is not in the dataset; the dataset's source-eval-i-claude2-card records the earlier July 2023 expression at a different content address, with its own archive capture, and none of its evidence is a quotation. |
| anthropic-claude-3-5-haiku-sonnet-new | Model Card Addendum: Claude 3.5 Haiku and Upgraded Claude 3.5 Sonnet                                                    | https://www-cdn.anthropic.com/c7822cdc35ad788ec87e14b3a9d45010f1f86c38.pdf                                                       | 200  | `5425dde49b649916…` | 2026-11-02 | 5421  | Not checked: web.archive.org is unreachable from this environment. Not in the dataset.                                                                                                                                                                                                                                                                         |
| anthropic-claude-haiku-5-5            | System Card: Claude Haiku 5.5                                                                                           | https://assets.claude.com/e1080d6bf5ae2018ea3c2f414064be03232f5be5.pdf                                                           | 200  | `d5dbaab6996c02ad…` | 2026-11-02 | 32909 | Not checked: web.archive.org is unreachable from this environment. Not in the dataset. Anthropic's Transparency hub also links the same content address at www-cdn.anthropic.com/e1080d6bf5ae2018ea3c2f414064be03232f5be5/Claude%20Haiku%205.5%20System%20Card.pdf (not retrieved).                                                                            |
| anthropic-claude-opus-4-5             | System Card: Claude Opus 4.5                                                                                            | https://www-cdn.anthropic.com/bf10f64990cfda0ba858290be7b8cc6317685f47.pdf                                                       | 200  | `33be92efcb58f901…` | 2026-11-02 | 38069 | Not checked: web.archive.org is unreachable from this environment. Not in the dataset. The retrieved expression carries changelog entries to December 5, 2025.                                                                                                                                                                                                 |
| google-deepmind-gemini-3-flash        | Gemini 3 Flash Model Card                                                                                               | https://storage.googleapis.com/deepmind-media/Model-Cards/Gemini-3-Flash-Model-Card.pdf                                          | 200  | `b2800104a47322d7…` | 2026-11-02 | 1065  | Not checked: web.archive.org refused connections from this environment (one attempt, 2026-11-02). The card page https://deepmind.google/models/model-cards/gemini-3-flash/ redirects to this PDF.                                                                                                                                                              |
| google-deepmind-gemini-4-argon        | Gemini 4 Argon — Model Card                                                                                             | https://storage.googleapis.com/deepmind-media/Model-Cards/Gemini-4-Argon-Model-Card.pdf                                          | 200  | `562cd3c5deddf75d…` | 2026-11-02 | 2574  | Not checked: web.archive.org refused connections from this environment (one attempt, 2026-11-02). The PDF is the 'View PDF version' of https://deepmind.google/models/model-cards/gemini-4-argon/ (page header 'Published 13 October 2026').                                                                                                                   |
| meta-cwm-preparedness                 | Code World Model Preparedness Report                                                                                    | https://scontent-dfw6-2.xx.fbcdn.net/v/t39.2365-6/557601942_1468972530985309_838842257265552803_n.pdf                            | 200  | `9fb37fa4970f40a0…` | 2026-11-02 | 10195 | Not checked: web.archive.org refused connections from this environment.                                                                                                                                                                                                                                                                                        |
| meta-llama-2                          | Llama 2 model card (MODEL_CARD.md, meta-llama/llama, commit 1f9a8d77)                                                   | https://raw.githubusercontent.com/meta-llama/llama/1f9a8d774a10fbe41321e530428e91f7eb7eb822/MODEL_CARD.md                        | 200  | `442c51972233f13b…` | 2026-11-02 | 956   | Not checked: web.archive.org refused connections from this environment. The commit-pinned address is itself a fixed version.                                                                                                                                                                                                                                   |
| meta-llama-3-3                        | Llama 3.3 model card (MODEL_CARD.md, meta-llama/llama-models, commit 8c88b8c0)                                          | https://raw.githubusercontent.com/meta-llama/llama-models/8c88b8c0d75dbd136b6895220c4f56ccbe2f2d24/models/llama3_3/MODEL_CARD.md | 200  | `1bad06e0e2feadf6…` | 2026-11-02 | 2572  | Not checked: web.archive.org refused connections from this environment. The commit-pinned address is itself a fixed version.                                                                                                                                                                                                                                   |
| meta-muse-spark-1-3                   | Muse Spark 1.3 Evaluation Report                                                                                        | https://research.meta.ai/static/muse-spark-1-3-evaluation-report                                                                 | 200  | `84df67c9f4610e57…` | 2026-11-02 | 52983 | Not checked: web.archive.org refused connections from this environment.                                                                                                                                                                                                                                                                                        |
| microsoft-mai-cyber-1-1-flash         | MAI-Cyber-1.1-Flash model card                                                                                          | https://microsoft.ai/pdf/MAI-Cyber-1.1-Flash-ORA-Model-Card.pdf                                                                  | 200  | `d290230d2a967bbd…` | 2026-11-02 | 1651  | Not checked: web.archive.org refused connections from this environment.                                                                                                                                                                                                                                                                                        |
| microsoft-phi-2                       | phi-2 model card (README.md, Hugging Face microsoft/phi-2, revision 810d3678)                                           | https://huggingface.co/microsoft/phi-2/raw/810d367871c1d460086d9f82db8696f2e0a0fcd0/README.md                                    | 200  | `7b7032289b8c9ee2…` | 2026-11-02 | 1070  | Not checked: web.archive.org refused connections from this environment. The revision-pinned address is itself a fixed version.                                                                                                                                                                                                                                 |
| microsoft-phi-4                       | Phi-4 Model Card (README.md, Hugging Face microsoft/phi-4, revision 2db69c1c)                                           | https://huggingface.co/microsoft/phi-4/raw/2db69c1c3e91a05d2c64a3185acfbaf36f744e25/README.md                                    | 200  | `4cc56faa6a5bcbde…` | 2026-11-02 | 1641  | Not checked: web.archive.org refused connections from this environment. The revision-pinned address is itself a fixed version.                                                                                                                                                                                                                                 |
| microsoft-phi-4-mini-flash-reasoning  | Phi-4-mini-flash-reasoning model card (README.md, Hugging Face microsoft/Phi-4-mini-flash-reasoning, revision 1dff8163) | https://huggingface.co/microsoft/Phi-4-mini-flash-reasoning/raw/1dff8163d28ec880ca2411c474ddc0a927792810/README.md               | 200  | `38ef838bc08bbfdb…` | 2026-11-02 | 2710  | Not checked: web.archive.org refused connections from this environment. The revision-pinned address is itself a fixed version.                                                                                                                                                                                                                                 |
| openai-gpt-4v                         | GPT-4V(ision) System Card                                                                                               | https://cdn.openai.com/papers/GPTV_System_Card.pdf                                                                               | 200  | `f5a5a731482b3029…` | 2026-11-02 | 5990  | Not checked: web.archive.org is unreachable from this environment.                                                                                                                                                                                                                                                                                             |
| openai-gpt-5-2-codex                  | Addendum to GPT-5.2 System Card: GPT-5.2-Codex                                                                          | https://cdn.openai.com/pdf/ac7c37ae-7f4c-4442-b741-2eabdeaf77e0/oai_5_2_Codex.pdf                                                | 200  | `5fe918b740727770…` | 2026-11-02 | 6183  | Not checked: web.archive.org is unreachable from this environment.                                                                                                                                                                                                                                                                                             |
| openai-gpt-6-luna-october-29          | Addendum to GPT-6 Luna System Card: October 29, 2026 Update                                                             | https://deploymentsafety.openai.com/gpt-6-luna-october-28-2026-addendum/gpt-6-luna-october-28-2026-addendum.pdf                  | 200  | `766262a78fcaeae3…` | 2026-11-02 | 3056  | Not checked: web.archive.org is unreachable from this environment.                                                                                                                                                                                                                                                                                             |
| openai-o1                             | OpenAI o1 System Card                                                                                                   | https://cdn.openai.com/o1-system-card-20241205.pdf                                                                               | 200  | `3ba7bdbe69e022f6…` | 2026-11-02 | 17314 | Not checked: web.archive.org is unreachable from this environment. The dataset source source-o1-card records an archive capture of the openai.com web page (https://web.archive.org/web/20260906142900/https://openai.com/index/openai-o1-system-card/), not of this PDF; unchecked.                                                                           |
| xai-grok-4-1                          | Grok 4.1 Model Card                                                                                                     | https://data.x.ai/2025-11-17-grok-4-1-model-card.pdf                                                                             | 200  | `635f30c2ea83cd2b…` | 2026-11-02 | 2333  | Not checked: web.archive.org refused connections from this environment (one attempt, 2026-11-02). Address located by web search; x.ai pages that may link it returned HTTP 403.                                                                                                                                                                                |
| xai-grok-4-7                          | Model Card: Grok 4.7                                                                                                    | https://media.x.ai/v1/website/card4p7-3a96f40b.pdf                                                                               | 200  | `c40541597ac3c461…` | 2026-11-02 | 6294  | Not checked: web.archive.org refused connections from this environment (one attempt, 2026-11-02). Address located by web search; x.ai pages that may link it returned HTTP 403. The card names SpaceXAI as a doing-business-as name of XAI LLC.                                                                                                                |

## Retrieval failures

- google-xai: xAI Grok-1 model card at x.ai/model-card (November 2023, address recalled by the drafter, not confirmed): HTTP 403 (Cloudflare) on 2026-11-02; web.archive.org connection reset on one attempt; not located by web search.
- google-xai: x.ai pages (x.ai/news, x.ai/safety, x.ai/legal): HTTP 403 (Cloudflare) on 2026-11-02; xAI cards were located through web search and data.x.ai / media.x.ai addresses instead.
- google-xai: media.x.ai/v1/website/xai-frontier-artificial-intelligence-framework-30-june-2026-99c40684.pdf (FAIF link in the Grok 4.7 card): HTTP 404 on 2026-11-02.
- google-xai: web.archive.org: connection reset (one attempt, 2026-11-02); no archive captures checked.
- meta-microsoft: ai.meta.com returned HTTP 400 for the Muse Spark announcement (https://ai.meta.com/blog/introducing-muse-spark-msl/), the Muse Spark Safety & Preparedness Report (https://ai.meta.com/static-resource/muse-spark-safety-and-preparedness-report/), the Muse Spark 1.1 report's ai.meta.com address and the CWM preparedness publication page; the CWM page's contents (date September 24, 2025 and PDF link) were read through a fetch tool, and the PDF itself was retrieved from Meta's CDN.
- meta-microsoft: microsoft.ai HTML pages return HTTP 403 to direct retrieval; the model pages and news posts were read through a fetch tool, and the card PDFs under https://microsoft.ai/pdf/ were retrieved directly.
- meta-microsoft: GitHub's REST API is not enabled for these repositories in this session; commit histories were read from blobless clones of meta-llama/llama, llama3, llama-models, codellama, PurpleLlama and facebookresearch/cwm.
- meta-microsoft: web.archive.org refused the connection (one attempt); no archive captures were checked.
- openai: openai.com HTML pages return HTTP 403 from this environment (checked 2026-11-02: o3 Operator addendum, Sora system card, gpt-oss-safeguard report page). Card PDFs on cdn.openai.com and deploymentsafety.openai.com returned HTTP 200.
- openai: web.archive.org not attempted (stated as unreachable from this environment); no archive captures checked.

## Passages seen and not used

- anthropic: anthropic-claude-3-5-haiku-sonnet-new Section 3.2 (PDF p. 9): descriptions of the CBRN, cyber and autonomy tests and the per-domain capability changes in Section 3.2.1; not recorded under the hazard rule.
- anthropic: anthropic-claude-opus-4-5 Sections 7.2.3–7.2.4 (PDF pp. 120–132): biological evaluation designs, uplift-trial figures and expert red-teaming findings; not recorded under the hazard rule. Quotes are limited to the policy-level outcome sentences.
- anthropic: anthropic-claude-opus-4-5 Section 7.4 (PDF pp. 144–150): cyber environment, tools and challenge results; not recorded under the hazard rule.
- anthropic: anthropic-claude-opus-4-5 Section 6.13 (PDF pp. 112–113): the UK AISI's own conclusions as quoted in the card; not used, as Q14 records access and testing, and the UK AISI's findings are a third party's account relayed by the card.
- anthropic: anthropic-claude-opus-4-5 PDF p. 118: 'when our Responsible Scaling Policy was first published' (2023) refers to the first edition's date, not the edition applied; not used for Q03.
- anthropic: anthropic-claude-haiku-5-5 Sections 2.2.1–2.2.3 and 3.3 (PDF pp. 11–29): CB evaluation portfolio and results, cyber benchmark contents and exploit counts; not recorded under the hazard rule.
- anthropic: anthropic-claude-haiku-5-5 Section 1.3 (PDF p. 9): 'Frontier Compliance Framework (FCF)' named as a compliance framework; recorded in frameworkEditionNote, not as Q03 evidence.
- anthropic: anthropic-claude-haiku-5-5 Section 6.1.3 (PDF pp. 57–58): a Claude model's review of the alignment assessment; not an external organisation, not used for Q13.
- anthropic: anthropic-claude-2-1 Sections 3.1 and 3.4 (PDF pp. 3–6): crowdworker red-teaming task and automated red-teaming on held-out prompts; summarised in the Q12 note, not quoted.
- google-xai: Gemini 4 Argon, frontier safety table (PDF pp. 12-13): evaluation details in the CBRN, cybersecurity and loss-of-control rows (scenario counts, uplift descriptions, challenge pass counts) are not recorded under the hazard rule; only the threshold sentences are quoted.
- google-xai: Gemini 4 Argon, 'Training and Development Evaluation Results' (PDF pp. 9-10): percentage-point changes in automated content-safety evaluations against Gemini 3.1 Pro; content-safety results do not meet any question's criterion.
- google-xai: Gemini 3 Flash, 'Training and Development Evaluation Results' (PDF p. 5): automated content-safety deltas against Gemini 2.5 Flash; not used for the same reason.
- google-xai: Grok 4.1, Tables 1-4 (pp. 2-4): refusal, filter, deception and dual-use scores are not recorded; dual-use scores under the hazard rule.
- google-xai: Grok 4.7, §5-§7 and §9 (PDF pp. 15-25): capability and refusal scores on biological, chemical, cyber and CBRN suites, and suite descriptions, are not recorded under the hazard rule.
- google-xai: Grok 4.7, §1 Overview (PDF p. 4): 'We never silently downgrade intelligence or fall back to other models' concerns serving practice, not evaluation.
- meta-microsoft: meta-cwm-preparedness: benchmark names, scores, prompts, Cyber 1 / Cyber 2 scenario wording and the chemical and biological evaluation contents (sections 2, 3 and Appendix A) were not quoted under the hazard rule; the cells record policy-level conclusions.
- meta-microsoft: meta-muse-spark-1-3: capability scorecards (Tables 1 and 2), stealth and sandbagging rates, social-engineering rates and per-benchmark results were not quoted, under the hazard rule or because the cells did not need them; the cells quote policy-level sentences.
- meta-microsoft: meta-muse-spark-1-3: section 4 (model behaviour, sycophancy, hallucination, psychometric probes) was read at summary level (section 1.1.3); it bears on none of the sixteen criteria beyond Q11, which is answered from section 1.1.1.
- meta-microsoft: microsoft-mai-cyber-1-1-flash: the external benchmark table, the external firm's containment percentage and the list of offensive scenarios in the internal red-team assessment were not quoted under the hazard rule.
- meta-microsoft: microsoft-mai-cyber-1-1-flash: the second sentence on deployment controls in section 3.2 ('These risks are addressed through restricted access, identity verification, policy enforcement, and runtime safeguards.') supports Q06 but was left out to stay within the card's quotation budget (10% of 1,651 words).
- meta-microsoft: meta-llama-3-3: the second sentence of the cyber item (attack automation study of autonomous agents) supports Q08 and Q09 set-asides but was paraphrased rather than quoted.
- openai: openai-o1: quantitative results for Apollo Research’s individual scheming evaluations (§4.4.3, PDF pp. 13–14) not quoted; the card’s stated conclusion is used instead.
- openai: openai-o1: §5.5 summary sentence on biological threat planning (already quoted in the dataset) not reused; the policy-level score line is quoted instead under the hazard rule.
- openai: openai-o1: Signature Science expert-probing results (§5.5.10, PDF p. 26) and radiological/nuclear expert counts (§5.6.1) not recorded (hazard rule).
- openai: openai-gpt-5-2-codex: Irregular’s success rates and cost-per-success figures (§5.1.2.4, PDF pp. 16–17) and cyber-range scenario outcomes (Table 7) not recorded (hazard rule).
- openai: openai-gpt-5-2-codex: §1 sentence “We expect current trends of rapidly increasing capability to continue, and for models to cross the High cybersecurity threshold in the near future.” (PDF p. 4) not used; it is a forecast, not a limit of the evaluations.
- openai: openai-gpt-6-luna-october-29: biological, chemical and cyber evaluation tables (§8.1, PDF pp. 14–15) not recorded (hazard rule).
- openai: openai-gpt-6-luna-october-29: PDF metadata gives a creation date of 2025-12-17; not used as a card date (metadata, not printed on the card).
- openai: openai-gpt-4v: red-team example concerning synthesis of a named compound (§2.3.1, PDF p. 7) not recorded (hazard rule).
