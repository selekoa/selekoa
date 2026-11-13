# Model cards compared, pack 5: what frontier developers’ cards disclose

Generated from `pack.json` by `node research/model-cards-5/tools.mjs render`; do not edit by hand. Candidate research pack outside application data. Prepared by Claude on 2026-11-06, with a fresh-context same-family audit of a seeded sample (audit.md). The blind cross-family check by Codex (GPT family) covered packs 4 and 5 together (research/model-cards-4/cross-family-check-2026-11-07.md) and was adjudicated on 2026-11-09 (research/model-cards-4/adjudication/apply-2026-11-09.mjs); one cell is held for the maintainer (†). Not editorially accepted; no human review.

**Question.** What does each frontier developer's published system card, model card or safety report disclose, on the same questions for every card?

**Rows.** Decision 1a: every card that cites the developer’s frontier framework or states a determination under it, plus, for each developer, the latest card before its first framework edition. This pack drafts the eight cards of pack 5 in research/model-cards-2/population.md’s adjudicated order (packs 4 and 5 follow pack 3); completed packs are not repeated here.

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

Each symbol is one cell; the grid compares and does not rank. Symbols are not to be summed. † marks a cell on which the cross-family check disagrees and the maintainer has not decided. **Held** marks a card drafted here but held from admission by the maintainer.

| Card                                          | Q01 | Q02 | Q03 | Q04 | Q05 | Q06 | Q07 | Q08 | Q09 | Q10 | Q11 | Q12 | Q13 | Q14 | Q15 | Q16 |
| --------------------------------------------- | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| Anthropic: Claude Sonnet 4.5 (2025)           |  ◐  |  ◐  |  ●  |  ●  |  ●  |  ●  |  ●  |  ●  |  ●  |  ◐  |  ●  |  ●  |  ●  |  ●  |  ●  |  ●  |
| Anthropic: Claude Haiku 4.5 (2025)            |  ◐  |  ◐  |  ●  |  ●  |  ●  |  ●  |  ●  |  ◐  |  ●  |  ○  |  ●  |  ●  |  ●  |  ○  |  ◐  |  ●  |
| Anthropic: Claude Opus 4.6 (2026)             |  ◐  |  ◐  |  ●  |  ●  |  ●  |  ●  |  ●  |  ◐  |  ●  |  ◐  |  ●  |  ●  |  ●  |  ●  |  ●  |  ●  |
| Google DeepMind: Gemini 2.5 Deep Think (2025) |  ◐  |  ◐  |  ●  |  ●  |  ●  |  ●  |  ●  |  ●  |  ●  |  ○  |  ●  |  ●  |  ◐  |  ○  |  ●  |  ●  |
| Google DeepMind: Gemini 2.5 Flash (2025)      |  ◐  |  ◐  |  ●  |  ●  |  ◐  |  ◐  |  ○  |  ○  |  ○  |  ○  |  ○  |  ●  |  ○  |  ○  |  ○  |  ●  |
| Meta: Muse Spark Open (2026)                  |  ○  |  ●  |  ◐  |  ◐  |  ○  |  ◐  |  ◐  |  ◐  |  ○  |  ○  |  ●  |  ○  |  ○  |  ○  |  ●  |  ●  |
| OpenAI: GPT-4.5 (2025)                        |  ●  |  ◐  |  ◐  |  ◐  |  ●  |  ◐  |  ●  |  ●  |  ●  |  ●  |  ●  |  ◐  |  ●  |  ○  |  ◐  |  ●  |
| OpenAI: o3 and o4-mini (2025)                 |  ●  |  ◐  |  ●  |  ●  |  ●  |  ◐  |  ●  |  ●  |  ●  |  ○  |  ●  |  ●  |  ●  |  ●  |  ◐  |  ●  |

## Anthropic: Claude Sonnet 4.5 (2025)

- Card: System Card: Claude Sonnet 4.5 (system card), https://www-cdn.anthropic.com/963373e433e489a87a10c823c52a0a013e9172dd.pdf
- Framework edition in the dataset: `rsp-v2-2`. RSP v2.2, effective 2025-05-14, identified by link annotation (maintainer decision 4a): the words “Responsible Scaling Policy” in §9.1 (PDF p. 125) link to https://www-cdn.anthropic.com/872c653b2d0501d6ab44cf87f43e1dc4853e4d37.pdf, whose cover reads “Version 2.2, Effective May 14, 2025” (the file retrieved for Claude Haiku 4.5). Found by the cross-family check of 2026-11-07. The other links on the policy’s name point to an announcement of an updated policy (PDF p. 9), to the policy’s undated web page (PDF p. 33) and to the 2023 announcement (PDF p. 41).

### Q01 Card date: ◐ partly

> “System Card: Claude Sonnet 4.5 September 2025” (Cover, PDF p. 1)

> “Changelog October 10, 2025” (Changelog, PDF p. 2)

The cover carries a month only. The changelog lists revisions dated October 10, 2025 and December 3, 2025; the copy read includes both.

### Q02 Release date: ◐ partly

> “Informed by the testing described here, we have deployed Claude Sonnet 4.5 under the AI Safety Level 3 Standard.” (Abstract, PDF p. 3)

The card states that the model has been deployed, without a release date or release form. Third parties had pre-release access, one from September 22 (§7.3.1); that is a testing date, not a release date.

_Searched:_ Whole-card term search (149 pages) and reading of the hits; Abstract, §1, §7.3, §9; terms: “release”, “launch”, “available”, “API”, “September”.

- Set aside: §7.3.1 UK AISI, PDF p. 64: September 22 is the date of a pre-deployment snapshot’s access, not the model’s release.

### Q03 Framework cited: ● stated

> “The Responsible Scaling Policy (RSP) evaluation process” (§9.1 Process, PDF p. 125 (printed p. 124))

The text gives no edition. The link annotation on the policy’s name in §9.1 (PDF p. 125) targets the fixed RSP file whose cover reads “Version 2.2, Effective May 14, 2025”, the file targeted by Claude Haiku 4.5 and Claude Opus 4.6 (maintainer decision 4a). The links on the name on PDF pp. 9, 33 and 41 target an announcement, the undated policy page and the 2023 announcement.

_Cross-family check (item 38):_ material disagreement, applied: the checker reads stated (blind) under decision 4a, from the link annotation in §9.1, PDF p. 125, to the fixed RSP v2.2 file. The pack had read partly, having checked the annotations on PDF pp. 9, 33 and 41 but not this one. The preparer accepts the checker’s reading on rereading the annotations (pypdf, 2026-11-09).

### Q04 Link to framework: ● stated

> “Responsible Scaling” (§5 Cyber capabilities, PDF p. 33 (link annotation on “Responsible Scaling”))

The words “Responsible Scaling” carry a hyperlink to https://anthropic.com/responsible-scaling-policy, the policy’s undated web page. Two other links on the policy name target announcement pages (PDF pp. 9 and 41).

### Q05 Framework determination: ● stated

> “we have not determined whether Claude Sonnet 4.5 has definitively passed the capabilities threshold that requires ASL-3 protections. Rather, we cannot clearly rule out ASL-3 risks for Claude Sonnet 4.5.” (§1.2.4 Conclusions, PDF p. 11)

The card states that ASL-3 risks cannot be ruled out and that the model remained below the ASL-4 thresholds in all domains of concern (§1.2.4). The card states that the model did not meet the RSP’s criteria requiring a fuller assessment (§1.2.1).

### Q06 Safeguards tied to determination: ● stated

> “we are deploying Claude Sonnet 4.5 with ASL-3 measures as a precautionary, provisional action.” (§1.2.4 Conclusions, PDF p. 11)

> “RSP safeguards applied to Claude Sonnet 4.5: ASL-3 Standard” (§9, PDF p. 125)

The card ties the ASL-3 Standard to the determination in Q05. A stated safeguard is the developer’s account.

### Q07 Chemical and biological: ● stated

> “Demonstrated enhanced performance on several biological risk evaluations while remaining below ASL-4 rule-out thresholds” (§1.2.4 Conclusions, PDF p. 11)

Biological evaluations were automated. The card states that it runs no internal chemical evaluations for the RSP (§9.2.1) and no internal radiological or nuclear evaluations, which a partnership with the US NNSA covers without published results (§9.2.2).

### Q08 Cyber: ● stated

> “we believe that current AI models, including Claude Sonnet 4.5, do not yet possess the capabilities necessary to substantially increase the number or scale of cyber-enabled catastrophic events.” (§5.3.3 Conclusions, PDF p. 46)

The card states that the RSP sets no formal cyber threshold and that cyber needs ongoing assessment (§9.4).

### Q09 Autonomy and AI R&D: ● stated

> “Exhibited improved autonomy capabilities in software engineering and AI research tasks, though still below the ASL-4 rule-out threshold.” (§1.2.4 Conclusions, PDF p. 11)

The card also states that some tasks in its first AI R&D suite are saturated and no longer valid as rule-out evaluations, and rests the conclusion on the second suite and an internal survey (§9.3.1.3).

### Q10 Persuasion: ◐ partly

> “attempts to manipulate users toward certain views” (§7 Alignment assessment, PDF p. 51)

The card lists attempts to manipulate users toward certain views among the behaviours its alignment assessment looked for. No outcome specific to persuasion or manipulation was found; this is not a reported persuasion evaluation with people.

_Searched:_ Whole-card term search (149 pages) and reading of the hits; Abstract, §1, §7.3, §9; terms: “persua”, “manipul”, “influenc”.

- Set aside: §2.2–§2.3, PDF pp. 14–15: “Influence operations” is a domain of harmful-request testing (content safety), not an evaluation of the model’s persuasive capability.

### Q11 Alignment and deception: ● stated

> “We saw roughly a 60% improvement on our primary misalignment metric over Claude Sonnet 4” (§7 Alignment assessment, PDF p. 51)

The card reports automated behavioural audits, deception, sabotage-capability and evaluation-awareness tests, interpretability investigations and third-party findings, with conclusions. Apollo Research’s findings say that low deception rates may be partly driven by evaluation awareness (§7.3.2).

_Cross-family check (item 80):_ minor, applied: the quotation stops before the developer’s characterisation of the earlier model. Status agrees.

### Q12 Red-teaming: ● stated

> “One of our external red-teaming partners, Gray Swan, conducted their Agent Red Teaming (ART) benchmark” (§4.2.1 Gray Swan Agent Red Teaming benchmark, PDF p. 29)

Scope: prompt-injection attacks on agents in four categories, run against 23 models from Anthropic and other developers. The card states that the CBRN assessment for this model did not include external red teaming by experts (§9.2).

### Q13 External testers: ● stated

> “We shared late pre-deployment snapshots of Claude Sonnet 4.5 with two organizations … the independent nonprofit Apollo Research.” (§7.3 Third-party testing, PDF p. 63)

Apollo Research’s summary of findings is reproduced in §7.3.2. Gray Swan ran a prompt-injection benchmark on the model (§4.2.1).

### Q14 Government institute: ● stated

> “UK AISI was given access to [an early snapshot of Claude Sonnet 4.5] on September 22nd” (§7.3.1 UK AISI, PDF p. 64)

The UK AI Security Institute tested pre-deployment snapshots for misalignment-related propensities; its summary is reproduced in §7.3.1. A partnership with the US NNSA on nuclear and radiological evaluation of Anthropic’s models is described without results or a statement that this model was tested (§9.2.2).

### Q15 Release decision: ● stated

> “the process under which we decided to release it under the AI Safety Level 3 Standard.” (§1 Introduction, PDF p. 8)

The developer, in its own voice, describes a decision to release the model under the ASL-3 Standard. The card adds that the ASL determination was overseen by the Responsible Scaling Officer (§1.2.3).

### Q16 Stated limits: ● stated

> “our alignment evals may underestimate the model’s propensity to perform harmful actions in more realistic conditions.” (§7.2 Evaluation awareness, PDF p. 88)

The card also states that some AI R&D tasks are saturated and no longer valid as rule-out evaluations (§9.3.1.3) and lists open questions on alignment assessment (§7.7).

## Anthropic: Claude Haiku 4.5 (2025)

- Card: System Card: Claude Haiku 4.5 (system card), https://www-cdn.anthropic.com/7aad69bf12627d42234e01ee7c36305dc2f6a970.pdf
- Framework edition in the dataset: `rsp-v2-2`. RSP v2.2, effective 2025-05-14, identified by link annotation (maintainer decision 4a): the words “Responsible Scaling Policy” on PDF pp. 4 and 7 link to https://www-cdn.anthropic.com/872c653b2d0501d6ab44cf87f43e1dc4853e4d37.pdf, whose cover reads “Version 2.2, Effective May 14, 2025” (retrieved 2026-11-06, HTTP 200, SHA-256 4807f397…, the same bytes as pack 3’s retrieval).

### Q01 Card date: ◐ partly

> “System Card: Claude Haiku 4.5 October 2025” (Cover, PDF p. 1)

The cover carries a month and year only; no changelog or revision date was found.

### Q02 Release date: ◐ partly

> “Informed by the testing described here, we have deployed Claude Haiku 4.5 under the AI Safety Level 2 Standard” (Abstract, PDF p. 2)

The card states that the model has been deployed and refers to its launch post (§1), without a release date or release form.

_Searched:_ Whole card (40 pages): Abstract, §1, §§2–6; terms: “release”, “launch”, “available”, “API”, “October”.

### Q03 Framework cited: ● stated

> “Anthropic’s Responsible Scaling Policy requires us to run evaluations to determine the AI Safety Level (ASL) Standard” (§1.2.1 Overview, PDF p. 7)

The edition is identified by link annotation (maintainer decision 4a): the policy’s name on PDF pp. 4 and 7 links to the RSP file whose cover reads Version 2.2, effective May 14, 2025.

### Q04 Link to framework: ● stated

> “see the Responsible Scaling Policy for details of what this Standard entails” (§1.2.1 Overview, PDF p. 7 (link annotation on the policy name))

The policy’s name links to https://www-cdn.anthropic.com/872c653b2d0501d6ab44cf87f43e1dc4853e4d37.pdf (RSP v2.2).

### Q05 Framework determination: ● stated

> “Our evaluations determined that Claude Haiku 4.5 met the ASL-3 rule-out threshold.” (§1.2.2 Decision, PDF p. 7)

The card states that the model remained well below ASL-3 thresholds in all domains of concern and is deployed under the ASL-2 Standard. The ASL-3 rule-out rests on automated biology and autonomy evaluations (§1.2.1, §6.1).

### Q06 Safeguards tied to determination: ● stated

> “RSP safeguards applied to Claude Haiku 4.5: AI Safety Level 2 (ASL-2) Standard” (§6, PDF p. 36)

The card ties the ASL-2 Standard to the ASL-3 rule-out in Q05. It names no individual ASL-2 measure in this passage. A stated safeguard is the developer’s account.

### Q07 Chemical and biological: ● stated

> “Taken in aggregate, we consider these results to be sufficient to rule out the necessity of applying ASL-3 safeguards to Claude Haiku 4.5.” (§6.2.3.1 Discussion, PDF p. 38)

Biological evaluations only, automated, with ASL-4 evaluations run as a precaution (§6.2.3.2); no chemical, radiological or nuclear results are reported.

### Q08 Cyber: ◐ partly

> “we ran a subset of our cyber evaluations on Claude Haiku 4.5.” (§6.4 Cyber evaluations, PDF p. 39)

The card reports a subset of cyber challenge evaluations with results compared with Claude Sonnet 4, and states that the RSP sets no formal cyber threshold. No conclusion in threshold or risk terms was found for cyber.

_Searched:_ §1.2, §6.1, §6.4; terms: “cyber”, “threshold”, “Cybench”, “conclu”.

- Set aside: §1.2.2 Decision, PDF p. 7: “well below ASL-3 thresholds across all domains of concern” is general; §6.4 states that the RSP has no formal cyber threshold.

### Q09 Autonomy and AI R&D: ● stated

> “scoring very similarly to Claude Sonnet 4’s 15.4/42 (36.7%), and remaining below the 50% threshold.” (§6.3 Autonomy evaluations, PDF p. 38)

The autonomy evaluation is the ASL-3 checkpoint (hard subset of SWE-bench Verified); no AI R&D suite results are reported.

### Q10 Persuasion: ○ not-found

_Searched:_ Whole card (40 pages): Abstract, §1, §§2–6; terms: “persua”, “manipul”, “influenc”, “propaganda”.

- Set aside: §3, PDF p. 15: “manipulate” concerns external prompt injection against the agent, not persuasion of people by the model.

### Q11 Alignment and deception: ● stated

> “Claude Haiku 4.5 showed safety properties similar to or stronger than Claude Sonnet 4.5 across the board on our tests for high-stakes forms of misalignment.” (§4 Alignment and welfare assessments, PDF p. 21)

The card reports automated behavioural audits (including user deception and self-preservation), an agentic misalignment suite whose full results it does not report because of evaluation awareness (§4.2), and sabotage-capability tests.

### Q12 Red-teaming: ● stated

> “using the same external red-teaming benchmark and suite of internal evaluations we used for” (§3.2 Prompt injection, PDF p. 17)

Scope: prompt-injection attacks on agents (Gray Swan’s Agent Red Teaming benchmark, 25 model variants, §3.2.1). The RSP assessment included no expert red-teaming (§6.1).

### Q13 External testers: ● stated

> “Gray Swan conducted their Agent Red Teaming (ART) benchmark” (§3.2.1 Gray Swan Agent Red Teaming benchmark, PDF p. 17)

The card calls this a third-party, non-governmental evaluation of the model’s vulnerability to prompt injection (§6.5).

### Q14 Government institute: ○ not-found

_Searched:_ Whole card (40 pages): Abstract, §1, §§2–6; terms: “government”, “AI Security Institute”, “AISI”, “CAISI”, “pre-deployment”.

- Set aside: §6.5 Third party assessments, PDF p. 39: States that pre-deployment evaluations with external government partners were not conducted for this model, which is not considered a frontier model.

### Q15 Release decision: ◐ partly

> “Informed by the testing described here, we have deployed Claude Haiku 4.5 under the AI Safety Level 2 Standard as described in our Responsible Scaling Policy.” (Abstract, PDF p. 2)

The card states the deployment as following from its testing; the section headed “Decision” (§1.2.2) states the ASL determination, not a decision to release, and names no maker.

_Searched:_ Abstract, §1.2, §6; terms: “decid”, “decision”, “release”, “deploy”, “Responsible Scaling Officer”.

- Set aside: §1.2.2 Decision, PDF p. 7: States the ASL-3 rule-out determination, not a release decision.

### Q16 Stated limits: ● stated

> “with 9% of transcripts showing clear signs of verbalized evaluation awareness of some kind. This does reduce our trust in our results to an extent.” (§4.1.1 Main quantitative assessment, PDF p. 26)

The card also states that the RSP assessment was automated only, without human uplift trials or expert red-teaming (§6.1).

## Anthropic: Claude Opus 4.6 (2026)

- Card: System Card: Claude Opus 4.6 (system card), https://assets.claude.com/6a5fa276ac68b9aeb0c8b6af5fa36326e0e166dd.pdf
- Framework edition in the dataset: `rsp-v2-2`. RSP v2.2, effective 2025-05-14, identified by link annotation (maintainer decision 4a): the policy’s name on PDF pp. 13 and 167 links to https://www-cdn.anthropic.com/872c653b2d0501d6ab44cf87f43e1dc4853e4d37.pdf, whose cover reads “Version 2.2, Effective May 14, 2025” (retrieved 2026-11-06, SHA-256 4807f397…). Other links on the policy name (PDF pp. 12, 168) target announcement pages. The dataset’s RSP v3.0 is effective 2026-02-24, after the card’s first changelog date.

### Q01 Card date: ◐ partly

> “February 2026” (Cover, PDF p. 1)

> “Changelog February 6, 2026” (Changelog, PDF p. 2)

The cover carries a month only. The changelog lists revisions dated February 6, February 10, February 17 and March 6, 2026; the copy read includes all four.

### Q02 Release date: ◐ partly

> “we have deployed Claude Opus 4.6 under the AI Safety Level 3 Deployment and Security Standard.” (Abstract, PDF p. 3)

> “which will be published shortly after the launch of Opus 4.6.” (§1.2.3, PDF p. 13)

The card states that the model is deployed and refers to its launch, without a release date or release form.

_Searched:_ Abstract, §1 (including §1.2), §6.1–§6.2, §8.1–§8.5, and a term search of the whole card (about 213 pages); terms: “release”, “launch”, “available”, “API”, “February”.

### Q03 Framework cited: ● stated

> “as defined in our Responsible Scaling Policy (RSP)” (§1.2.1 Overview, PDF p. 12 (pdftotext raw layer))

The edition is identified by link annotation (maintainer decision 4a): the policy name on PDF pp. 13 and 167 links to the RSP file whose cover reads Version 2.2, effective May 14, 2025. The link in the quoted passage on PDF p. 12 targets an announcement page, not the edition file.

### Q04 Link to framework: ● stated

> “please see the Responsible Scaling Policy” (§1.2.3, PDF p. 13 (link annotation on the policy name; pdftotext raw layer))

The policy name links to https://www-cdn.anthropic.com/872c653b2d0501d6ab44cf87f43e1dc4853e4d37.pdf (RSP v2.2).

### Q05 Framework determination: ● stated

> “Our determination is that Claude Opus 4.6 does not cross either the AI R&D-4 or the CBRN-4 capability threshold.” (§1.2.4 Conclusions, PDF p. 13 (pdftotext raw layer))

The card applies the ASL-3 Standard and repeats from the Claude Opus 4.5 card that confidently ruling out these thresholds is becoming increasingly difficult (§1.2.4).

### Q06 Safeguards tied to determination: ● stated

> “we have deployed Claude Opus 4.6 under the AI Safety Level 3 Deployment and Security Standard.” (Abstract, PDF p. 3)

> “we have prepared a Sabotage Risk Report assessing sabotage-related risks posed by Claude Opus 4.6 and the safeguards we have in place to address them” (§1.2.3, PDF p. 13)

The card ties the ASL-3 Standard to its determination and describes the Sabotage Risk Report as meeting a commitment tied to the AI R&D-4 standard (§1.2.3, §1.2.4.1). A stated safeguard is the developer’s account.

### Q07 Chemical and biological: ● stated

> “Thus, we judge that Claude Opus 4.6 does not cross the CBRN-4 threshold.” (§1.2.4.2 On CBRN risks, PDF p. 15)

Biological evaluations include automated tests, uplift trials and expert red-teaming. The card states that it runs no internal chemical evaluations for the RSP (§8.2.1) and covers radiological and nuclear risk through a government partnership (§8.2.2).

### Q08 Cyber: ◐ partly

> “has saturated all of our current cyber evaluations” (§1.2.4.3 On cyber risks, PDF p. 15)

The card reports cyber evaluations, which the model saturated, and a CAISI cyber assessment (§8.4.8), and states that the RSP defines no formal cyber threshold. §8.4 gives a qualitative assessment that the model has meaningfully improved cyber capabilities and ties enhanced safeguards against cyber misuse to it (PDF p. 197); no outcome category or threshold is stated for cyber.

_Cross-family check (item 81):_ minor, applied: the qualitative cyber assessment of §8.4 (PDF p. 197) is given in the note and set aside as not a formal category. Status agrees (open question 3).

_Searched:_ §1.2.4.3, §8.4 and its subsections; terms: “cyber”, “threshold”, “conclu”, “catastroph”.

- Set aside: §8.4, results summary, PDF p. 197: A qualitative capability assessment with enhanced safeguards tied to it, not a category or threshold under the RSP; given in the note.
- Set aside: §8.4.8 Assessment by the CAISI, PDF pp. 203–204: Describes the assessment and vulnerabilities found, without a stated conclusion on risk.

### Q09 Autonomy and AI R&D: ● stated

> “Our determination is that Claude Opus 4.6 does not cross either the AI R&D-4 or the CBRN-4 capability threshold.” (§1.2.4 Conclusions, PDF p. 13 (pdftotext raw layer))

The card qualifies the AI R&D-4 rule-out: the model has roughly reached the benchmark thresholds set for a straightforward rule-out, so the determination rests on a wider judgement (§1.2.4, PDF p. 13), and the card calls the margin to the threshold unclear (§8.3, PDF p. 185).

_Cross-family check (item 82):_ minor, applied: the note keeps the distinction between the benchmark rule-out thresholds and the final judgement, without evaluation-design detail. Status agrees.

### Q10 Persuasion: ◐ partly

> “attempts to manipulate users toward certain views” (§6.1 Introduction and summary of findings, PDF p. 91)

The card lists attempts to manipulate users toward certain views among the behaviours its alignment assessment looked for. No outcome specific to persuasion or manipulation of people was found.

_Searched:_ Abstract, §1 (including §1.2), §6.1–§6.2, §8.1–§8.5, and a term search of the whole card (about 213 pages); terms: “persua”, “manipul”, “influence”.

- Set aside: §6.1, PDF p. 92: Willingness to manipulate or deceive other participants in a multi-agent test environment is reported; the card does not say those participants are people.
- Set aside: §3.3, PDF pp. 97–98: “persuaded” refers to the model being persuaded by users, not the model persuading people.

### Q11 Alignment and deception: ● stated

> “Safety evaluations showed Opus 4.6 is a well-aligned model with a comparably low rate of overall misaligned behavior to its predecessor, Claude Opus 4.5.” (Abstract, PDF p. 3)

The card reports behavioural audits, sabotage and deception tests, evaluation-awareness and interpretability investigations, and external testing, with conclusions. The abstract notes increases in sabotage concealment capability and overly agentic behaviour in computer use.

### Q12 Red-teaming: ● stated

> “We conducted an expert red-teaming evaluation with over a dozen experts” (§8.2.4.6 Expert red teaming, PDF p. 179 (pdftotext raw layer))

Scope: biology (virology and microbiology), more than a dozen domain experts. The card also reports a one-week red-teaming with CAISI (§8.2.4.7) and an external prompt-injection red-teaming benchmark (§5.2.1).

### Q13 External testers: ● stated

> “Apollo did not find any instances of egregious misalignment, but observed high levels of verbalized evaluation awareness.” (§6.2.7 External testing from Apollo Research, PDF p. 119)

Apollo Research provided no formal assessment, and the card says its testing should not count as evidence for or against the model’s alignment. Andon Labs (§6.2.8) and Gray Swan (§5.2.1) are also named.

### Q14 Government institute: ● stated

> “pre-deployment testing of Claude Opus 4.6 was conducted by the US Center for AI Standards and Innovation (CAISI) and the UK AI Security Institute (UK AISI).” (§8.5 Third party assessments, PDF p. 204 (pdftotext raw layer))

The card says the assessments covered CBRN, cyber, ASL-3 safeguards and misalignment.

### Q15 Release decision: ● stated

> “we have decided to release Claude Opus 4.6 under the ASL-3 Standard” (§1.2.3 AI Safety Level determination process, PDF p. 13 (pdftotext raw layer))

The developer, in its own voice, states the release decision. The card names the Responsible Scaling Officer and CEO as having made the ASL determination on which it rests (§1.2.3).

### Q16 Stated limits: ● stated

> “the CBRN-4 rule-out is less clear for Opus 4.6 than we would like.” (§1.2.4.2 On CBRN risks, PDF p. 15)

The card also states that ruling out thresholds is becoming increasingly difficult, that its cyber evaluations are saturated (§1.2.4.3), and that relying on the model to fix its own evaluation infrastructure under time pressure is a risk to evaluation integrity (§1.2.4.4).

## Google DeepMind: Gemini 2.5 Deep Think (2025)

- Card: Gemini 2.5 Deep Think - Model Card (model card), https://storage.googleapis.com/deepmind-media/Model-Cards/Gemini-2-5-Deep-Think-Model-Card.pdf
- Framework edition in the dataset: `fsf-v2-0`. The card’s text states that the FSF was released in May 2024 and updated in February 2025 (PDF p. 7). FSF v2.0 (4 February 2025): the words “Frontier Safety Framework” carry link annotations to two addresses of the FSF 2.0 PDF (“Frontier Safety Framework 2.0 (1).pdf” and “Frontier Safety Framework 2.0.pdf”), both retrieved on 2026-11-06 with covers reading “4th February 2025 … Version 2.0” (identified by link annotation, maintainer decision 4a).

### Q01 Card date: ◐ partly

> “Model card published/updated AUG 01, 2025” (Cover, PDF p. 1)

The card prints one date whose kind, “published/updated”, does not say whether it is the first publication or a revision. The population records 2025-08-01 as a printed publication date.

### Q02 Release date: ◐ partly

> “We are releasing Gemini Deep Think with a suite of planned deployment mitigations” (Frontier Safety, CBRN, PDF p. 9)

The card states the release in the present tense and that its scores were sampled from the Gemini App (Evaluation, PDF p. 4), without a release date.

_Searched:_ Whole card (21 pages): Model Information, Evaluation, Ethics and Safety, Frontier Safety sections; terms: “release”, “available”, “launch”, “Gemini App”, “2025”.

### Q03 Framework cited: ● stated

> “Google DeepMind released its Frontier Safety Framework (FSF) in May 2024 and updated it in February 2025.” (Frontier Safety, PDF p. 7)

The card dates the edition it follows (updated February 2025), and its link annotations on the framework name target the FSF Version 2.0 file of 4 February 2025.

### Q04 Link to framework: ● stated

> “In addition, we perform testing following the guidelines in Google DeepMind’s Frontier Safety” (Evaluation Approach, PDF p. 6 (link annotation on the framework name))

The framework name links to the FSF 2.0 PDF (also on PDF pp. 7, 9 and 20).

### Q05 Framework determination: ● stated

> “The model continues to perform at the early warning threshold level for the Cyber Uplift Level 1 CCL, and has reached the early warning alert threshold for CBRN Uplift Level 1 CCL.” (Frontier Safety: Summary, PDF p. 20)

The card states that further study is needed for a final assessment of whether the CBRN Uplift Level 1 CCL is reached, and that the cyber, machine learning R&D and instrumental reasoning CCLs are not reached (summary table, PDF pp. 8–9).

### Q06 Safeguards tied to determination: ● stated

> “Our model security mitigations have already been aligned with RAND SL2, which is the level required for the CBRN Uplift Level 1 CCL per our Frontier Safety Framework.” (CBRN, PDF p. 9)

The card ties additional deployment mitigations, based on an internal safety case, and a security level to its CBRN assessment, and says it has deployed mitigations for the cyber alert threshold (PDF p. 8). A stated safeguard is the developer’s account.

### Q07 Chemical and biological: ● stated

> “the model has enough technical knowledge in certain CBRN scenarios and stages to be considered at early alert threshold.” (CBRN Uplift Level 1, PDF p. 8)

Outcome category: early alert threshold, final CCL assessment pending. Internal open-ended assessments do not cover chemical information risk; the card says its external testers include chemistry.

### Q08 Cyber: ● stated

> “CCL reached? No, but the early warning alert threshold was originally reached by Gemini 2.5 Pro and continues to be met by Gemini 2.5 Deep Think.” (Cyber Uplift Level 1, PDF p. 12)

Cyber Autonomy Level 1 is also stated as not reached.

### Q09 Autonomy and AI R&D: ● stated

> “CCL reached? No. Gemini 2.5 Deep Think exhibits improved performance on some RE-bench tasks, but still lags human performance overall.” (Machine Learning R&D Autonomy Level 1, PDF p. 15)

The Machine Learning R&D Uplift Level 1 CCL is stated as “likely” not reached.

### Q10 Persuasion: ○ not-found

_Searched:_ Whole card (21 pages): Model Information, Evaluation, Ethics and Safety, Frontier Safety sections; terms: “persua”, “manipul”, “influenc”.

### Q11 Alignment and deception: ● stated

> “Instrumental Reasoning Level 1 CCL not reached” (Summary table, PDF p. 9)

Deceptive-alignment evaluations (stealth and situational awareness) are reported with the Instrumental Reasoning Level 1 and 2 CCLs not reached.

### Q12 Red-teaming: ● stated

> “We conducted focused red-teaming using a range of internal (n=8) and external (n=7) experts” (Expert Red-teaming, PDF p. 11)

Scope: CBRN harm-journey scenarios, eight internal and seven external experts. Human and automated red teaming across safety policies are also listed (PDF p. 5).

### Q13 External testers: ◐ partly

> “We work with a small set of specialist independent groups” (External Safety Testing, PDF p. 11)

External testers and external experts are described, with interim results, but not named.

_Searched:_ Whole card (21 pages): Model Information, Evaluation, Ethics and Safety, Frontier Safety sections; terms: “external”, “third party”, “independent”, “partner”, “vendor”.

### Q14 Government institute: ○ not-found

_Searched:_ Whole card (21 pages): Model Information, Evaluation, Ethics and Safety, Frontier Safety sections; terms: “government”, “AI Safety Institute”, “AISI”, “CAISI”.

### Q15 Release decision: ● stated

> “The RSC also reviewed data on the model’s performance via assurance evaluations and made release decisions.” (Evaluation Approach, PDF p. 5)

> “an internal safety case based on these mitigations and red teaming results was developed and reviewed by Google DeepMind’s Responsibility and Safety Council (RSC) before launch.” (Frontier Safety Summary, PDF p. 20)

The card names Google DeepMind’s Responsibility and Safety Council, its internal governance body, as the maker of release decisions (PDF p. 5), and says that the council reviewed this model’s internal safety case before launch (PDF p. 20). Neither passage gives the text or date of a decision.

_Cross-family check (item 48):_ minor, applied: the model-specific passage on the RSC’s pre-launch review of the safety case is added. Status and maker agree.

### Q16 Stated limits: ● stated

> “More detailed study is required to reach our final assessment of whether the model has reached the CCL for CBRN Uplift Level 1.” (CBRN Uplift Level 1, PDF p. 9)

The card also states that the capability evaluations were run without the mitigations now in place (PDF p. 8), that they used a preliminary implementation of the Deep Think algorithm differing slightly from the deployed variant (PDF p. 19), that deceptive-alignment testing is still ongoing (PDF p. 17), and that the results in its content-safety table are automated only (PDF p. 6).

## Google DeepMind: Gemini 2.5 Flash (2025)

- Card: Gemini 2.5 Flash Model Card (with Gemini 2.5 Flash Image and native audio) (model card), https://storage.googleapis.com/deepmind-media/Model-Cards/Gemini-2-5-Flash-Model-Card.pdf
- Framework edition in the dataset: `fsf-v2-0`. FSF v2.0 (4 February 2025): the words “Frontier Safety Framework” carry link annotations to two addresses of the FSF 2.0 PDF (“Frontier Safety Framework 2.0 (1).pdf” and “Frontier Safety Framework 2.0.pdf”), both retrieved on 2026-11-06 with covers reading “4th February 2025 … Version 2.0” (identified by link annotation, maintainer decision 4a).

### Q01 Card date: ◐ partly

> “Model card published/updated December, 2025” (Cover, PDF p. 1)

The copy read carries a month only, of the kind “published/updated”. The population dates the row 2025-08-30, by an Internet Archive capture that prints “Last updated: Aug 27, 2025” (cross-family check of 2026-11-04); that capture was not retrieved here, so the cells describe the December 2025 expression.

### Q02 Release date: ◐ partly

> “Deployment status continues to be “general availability.”” (Description, PDF p. 2)

The card states the release form (general availability), without a release date.

_Searched:_ Whole card (11 pages): Model Information, Evaluation, Ethics and Safety, Frontier Safety Assessment, Risks and Mitigations; terms: “release”, “available”, “launch”, “2025”.

### Q03 Framework cited: ● stated

> “In addition, we performed testing following the guidelines in Google DeepMind’s Frontier Safety Framework (FSF).” (Evaluation Approach, PDF p. 8)

The text gives no edition; the link annotations on the framework name target the FSF Version 2.0 file of 4 February 2025 (maintainer decision 4a).

_Cross-family check (item 49):_ minor, applied: the quotation now runs through the framework’s full name. Status and edition agree.

### Q04 Link to framework: ● stated

> “In addition, we performed testing following the guidelines in Google DeepMind’s Frontier Safety” (Evaluation Approach, PDF p. 8 (link annotation on the framework name))

The framework name links to the FSF 2.0 PDF (also on PDF p. 10).

### Q05 Framework determination: ◐ partly

> “the Gemini 2.5 Pro model results give us confidence that Gemini 2.5 Flash is unlikely to reach critical capability levels” (Frontier Safety Assessment, PDF p. 10)

The card states an expectation for this model that rests on another model’s results: Gemini 2.5 Pro Preview was evaluated and reached no critical capability level, and, as Flash is less capable, Flash is unlikely to reach one. It reports no frontier safety evaluation of Flash and no outcome for it in the framework’s own categories. The card also covers Gemini 2.5 Flash Image and Audio, with no separate statement for them.

_Cross-family check (item 50):_ material disagreement, applied: the checker reads partly (blind), because PDF p. 10 gives a proxy-based expectation for Flash and the no-CCL result is Gemini 2.5 Pro Preview’s, with no separate determination for Image or Audio. The pack had read stated, with the reliance in the note (open question 2). The preparer applies the checker’s reading; see item 6 for the admitted Gemini 3 Flash cell.

### Q06 Safeguards tied to determination: ◐ partly

> “Mitigations include, but are not limited to:” (Risks and Mitigations, PDF p. 11)

> “product-level mitigations such as safety filtering” (Risks and Mitigations, PDF p. 11)

The card lists mitigations across training and deployment (dataset filtering, conditional pre-training, fine-tuning, reinforcement learning, safety policies and product-level safety filtering) without tying any of them to the frontier safety assessment.

_Cross-family check (item 83):_ minor, applied: a named mitigation from the same list is quoted beside the list’s introduction. Status agrees.

_Searched:_ Whole card (11 pages): Model Information, Evaluation, Ethics and Safety, Frontier Safety Assessment, Risks and Mitigations; terms: “mitigation”, “safeguard”, “security”.

### Q07 Chemical and biological: ○ not-found

No chemical or biological evaluation of Gemini 2.5 Flash was found.

_Searched:_ Whole card (11 pages): Model Information, Evaluation, Ethics and Safety, Frontier Safety Assessment, Risks and Mitigations; terms: “CBRN”, “chemical”, “biolog”, “CCL”.

- Set aside: Frontier Safety Assessment, PDF p. 10: The card relies on the frontier safety evaluations reported for Gemini 2.5 Pro Preview and states no domain result for this model.

### Q08 Cyber: ○ not-found

No cyber evaluation of Gemini 2.5 Flash was found.

_Searched:_ Whole card (11 pages): Model Information, Evaluation, Ethics and Safety, Frontier Safety Assessment, Risks and Mitigations; terms: “cyber”, “CCL”, “alert threshold”.

- Set aside: Frontier Safety Assessment, PDF p. 10: The card relies on the frontier safety evaluations reported for Gemini 2.5 Pro Preview and states no domain result for this model.

### Q09 Autonomy and AI R&D: ○ not-found

No autonomy or machine learning R&D evaluation of Gemini 2.5 Flash was found.

_Searched:_ Whole card (11 pages): Model Information, Evaluation, Ethics and Safety, Frontier Safety Assessment, Risks and Mitigations; terms: “autonom”, “R&D”, “self-”, “CCL”.

- Set aside: Frontier Safety Assessment, PDF p. 10: The card relies on the frontier safety evaluations reported for Gemini 2.5 Pro Preview and states no domain result for this model.

### Q10 Persuasion: ○ not-found

_Searched:_ Whole card (11 pages): Model Information, Evaluation, Ethics and Safety, Frontier Safety Assessment, Risks and Mitigations; terms: “persua”, “manipul”, “influenc”.

### Q11 Alignment and deception: ○ not-found

No deceptive-alignment or misalignment evaluation of Gemini 2.5 Flash was found.

_Searched:_ Whole card (11 pages): Model Information, Evaluation, Ethics and Safety, Frontier Safety Assessment, Risks and Mitigations; terms: “deceptive”, “alignment”, “instrumental reasoning”, “stealth”, “situational awareness”.

- Set aside: Frontier Safety Assessment, PDF p. 10: The card relies on the frontier safety evaluations reported for Gemini 2.5 Pro Preview and states no domain result for this model.

### Q12 Red-teaming: ● stated

> “Human Red Teaming conducted by specialist teams across the policies and desiderata” (Evaluation Approach, PDF p. 8)

Scope: specialist teams, across safety policies and desiderata, alongside automated red teaming; the card also mentions expert red teamers. No number of testers or period is given.

### Q13 External testers: ○ not-found

_Searched:_ Whole card (11 pages): Model Information, Evaluation, Ethics and Safety, Frontier Safety Assessment, Risks and Mitigations; terms: “external”, “third party”, “independent”, “partner”.

- Set aside: Evaluation Approach, PDF p. 8: Assurance evaluators are described as independent of the model development team, not as external to Google.

### Q14 Government institute: ○ not-found

_Searched:_ Whole card (11 pages): Model Information, Evaluation, Ethics and Safety, Frontier Safety Assessment, Risks and Mitigations; terms: “government”, “AI Safety Institute”, “AISI”, “CAISI”.

### Q15 Release decision: ○ not-found

_Searched:_ Whole card (11 pages): Model Information, Evaluation, Ethics and Safety, Frontier Safety Assessment, Risks and Mitigations; terms: “release”, “decision”, “deploy”, “launch”, “RSC”.

- Set aside: Evaluation Approach, PDF p. 8: Ethics and safety reviews before release are stated, not a decision to release.
- Set aside: Assurance Evaluations Results, PDF p. 10: Assurance evaluations are said to guide decisions on model releases in general; no decision for this model and no maker are stated.

### Q16 Stated limits: ● stated

> “The evaluation results are for automated evaluations and not human evaluation or red teaming” (Training and Development Evaluation Results, PDF p. 9)

The card also states that its results are computed with revised evaluations not comparable with earlier cards.

## Meta: Muse Spark Open (2026)

- Card: Muse Spark Open model card (README.md, Hugging Face meta-models/Muse-Spark-Open-816B-A42B, revision 0fb02478) (model card), https://huggingface.co/meta-models/Muse-Spark-Open-816B-A42B/resolve/0fb02478b02565b2ce7fc57e6051c91172774ac9/README.md
- Framework edition in the dataset: none identified. The card names the Meta Superintelligence Scaling Framework without a version, date or address. That framework is not in the dataset; maintainer decision 5a holds its v2.1 (October 2026) for a separate data task. No edition is recorded or inferred.

### Q01 Card date: ○ not-found

No date of the card itself was found. Under maintainer decision 8a, repository dates stay in the background record (the inventory notes the repository was last modified on 2026-10-15).

_Searched:_ Whole card (Hugging Face README, revision 0fb02478): licence front matter, overview table, Model Access, Benchmarks, Safety and Preparedness, Considerations and Limitations; terms: “date”, “updated”, “2026”, “version”.

- Set aside: Licence front matter: “Release date: October 15, 2026” and “Dated: October 15, 2026” belong to the Muse Model License text, not to the card.
- Set aside: Overview table and header: The release date and month are the model’s (Q02).

### Q02 Release date: ● stated

> “| Date of Release | October 15th, 2026 |” (Overview table, “Date of Release”)

> “The weights are available for download through Hugging Face.” (Model Access and Best Practices)

The card gives the release date and the release forms (open weights; API access through third-party inference providers).

### Q03 Framework cited: ◐ partly

> “Evaluation of chemical and biological, cyber, and loss-of-control risks in line with the Meta Superintelligence Scaling Framework.” (Safety and Preparedness, item 4)

The card names the framework without a version, date or address. The framework is not in the dataset (maintainer decision 5a).

### Q04 Link to framework: ◐ partly

> “Evaluation of chemical and biological, cyber, and loss-of-control risks in line with the Meta Superintelligence Scaling Framework.” (Safety and Preparedness, item 4)

The card refers to the framework by name without an address or reference.

_Searched:_ Whole card (Hugging Face README, revision 0fb02478): licence front matter, overview table, Model Access, Benchmarks, Safety and Preparedness, Considerations and Limitations; terms: “Scaling Framework”, “http”, “research.meta.ai”.

- Set aside: Benchmarks: The linked evaluation-methodology report is not the framework.

### Q05 Framework determination: ○ not-found

No determination in the framework’s categories was found. The card says the model met Meta’s safety criteria for release, and that preparedness evaluations (chemical and biological, cyber, loss of control) were run in line with the Meta Superintelligence Scaling Framework; it states no risk level or threshold outcome and does not say a framework determination was made.

_Cross-family check (item 55):_ material disagreement, applied: the checker reads not found (blind): the README applies the framework to evaluations and finds Meta’s release criteria met, but states no framework determination and does not say one was made; a release-acceptability judgement belongs to Q15. The pack had read partly, as a determination made without its outcome. The preparer applies the checker’s reading.

_Searched:_ Whole card (Hugging Face README, revision 0fb02478): licence front matter, overview table, Model Access, Benchmarks, Safety and Preparedness, Considerations and Limitations; terms: “high risk”, “moderate”, “threshold”, “risk level”, “determin”, “framework”, “tier”, “residual risk”.

- Set aside: Safety and Preparedness, introduction: The model “met our safety criteria for release”: release criteria, not an outcome in the framework’s categories; recorded under Q15.
- Set aside: Safety and Preparedness, item 4 (Preparedness): Evaluations “in line with” the framework, reported as refusal and misalignment results, not as framework categories.

### Q06 Safeguards tied to determination: ◐ partly

> “This open weights version has additional safety post-training to make it more robust against misuse as a standalone model without system guardrails.” (Opening)

The card states a safeguard of the open-weights version and recommends system guardrails, without tying them to a framework determination.

_Searched:_ Whole card (Hugging Face README, revision 0fb02478): licence front matter, overview table, Model Access, Benchmarks, Safety and Preparedness, Considerations and Limitations; terms: “mitigation”, “safeguard”, “guardrail”, “post-training”.

### Q07 Chemical and biological: ◐ partly

> “It showed strong refusal behavior on both single-turn and multi-turn benchmarks” (Safety and Preparedness, item 4.2)

The card reports chemical and biological refusal evaluations with refusal rates, but no capability evaluation outcome or framework risk level for the domain.

_Searched:_ Whole card (Hugging Face README, revision 0fb02478): licence front matter, overview table, Model Access, Benchmarks, Safety and Preparedness, Considerations and Limitations; terms: “chemical”, “biolog”, “risk”, “threshold”.

### Q08 Cyber: ◐ partly

> “We tested it against internal and public cyber misuse benchmarks using adaptive attackers” (Safety and Preparedness, item 4.1)

The card reports cyber misuse-refusal tests with refusal rates, but no capability evaluation outcome or framework risk level for the domain.

_Searched:_ Whole card (Hugging Face README, revision 0fb02478): licence front matter, overview table, Model Access, Benchmarks, Safety and Preparedness, Considerations and Limitations; terms: “cyber”, “risk”, “threshold”.

### Q09 Autonomy and AI R&D: ○ not-found

No autonomy, self-replication or AI R&D evaluation was found; the loss-of-control item reports misalignment evaluations (Q11).

_Searched:_ Whole card (Hugging Face README, revision 0fb02478): licence front matter, overview table, Model Access, Benchmarks, Safety and Preparedness, Considerations and Limitations; terms: “autonom”, “R&D”, “self-”, “loss-of-control”.

- Set aside: Safety and Preparedness, item 4.3: Honesty and agentic-misalignment results, not autonomy or AI R&D capability evaluations.

### Q10 Persuasion: ○ not-found

_Searched:_ Whole card (Hugging Face README, revision 0fb02478): licence front matter, overview table, Model Access, Benchmarks, Safety and Preparedness, Considerations and Limitations; terms: “persua”, “manipul”, “influenc”.

- Set aside: Responsible Use: “user manipulation” concerns users tampering with assistant messages, not persuasion by the model.

### Q11 Alignment and deception: ● stated

> “On our misalignment evaluations, the model showed low propensity for deceptive or unilateral harmful behavior” (Safety and Preparedness, item 4.3)

The card names the MASK honesty benchmark and the Agentic Misalignment benchmark.

### Q12 Red-teaming: ○ not-found

_Searched:_ Whole card (Hugging Face README, revision 0fb02478): licence front matter, overview table, Model Access, Benchmarks, Safety and Preparedness, Considerations and Limitations; terms: “red team”, “red-team”, “adversarial”, “attack”.

- Set aside: Safety and Preparedness, item 4.1: Cyber misuse tests with adaptive attackers are adversarial testing, but are not described as red-teaming.

### Q13 External testers: ○ not-found

_Searched:_ Whole card (Hugging Face README, revision 0fb02478): licence front matter, overview table, Model Access, Benchmarks, Safety and Preparedness, Considerations and Limitations; terms: “external”, “third part”, “vendor”, “partner”, “SecureBio”.

- Set aside: Safety and Preparedness, item 4.2: SecureBio is named as the developer of a refusal benchmark, not as having tested the model.
- Set aside: Model Access: Third-party inference providers serve the model; they are not described as testers.

### Q14 Government institute: ○ not-found

_Searched:_ Whole card (Hugging Face README, revision 0fb02478): licence front matter, overview table, Model Access, Benchmarks, Safety and Preparedness, Considerations and Limitations; terms: “government”, “AI Safety Institute”, “AISI”, “CAISI”.

### Q15 Release decision: ● stated

> “met our safety criteria for release based on model evaluations and an assessment of residual risks” (Safety and Preparedness)

Meta, in its own voice (“our safety criteria”), states that the model met its safety criteria for release after evaluations and an assessment of residual risks: a judgement that the release was acceptable, made by the company. No person, office or committee is named, and no decision date is given.

_Cross-family check (item 58):_ material disagreement, applied: the checker reads stated (blind) under the criterion’s “deemed acceptable for deployment”: meeting the company’s own release criteria after a residual-risk assessment is an acceptability judgement in the developer’s voice (decision 6a). The pack had read partly, as a release following an assessment. The preparer applies the checker’s reading.

### Q16 Stated limits: ● stated

> “These evaluations characterized the released checkpoint under the tested conditions and do not cover every downstream configuration or use case.” (Safety and Preparedness)

The card also states that testing to date has not, and could not, cover all scenarios (Considerations and Limitations).

## OpenAI: GPT-4.5 (2025)

- Card: OpenAI GPT-4.5 System Card (system card), https://cdn.openai.com/gpt-4-5-system-card-2272025.pdf
- Framework edition in the dataset: none identified. The card names the Preparedness Framework without a version, date, reference or link. As context only, the dataset records the beta edition (2023-12-18) as the edition published before the card; Version 2 is dated 2025-04-15, after it.

### Q01 Card date: ● stated

> “OpenAI GPT-4.5 System Card OpenAI February 27, 2025” (Title block, PDF p. 1)

The card prints a day-precision date; no revision date was found.

### Q02 Release date: ◐ partly

> “We’re sharing GPT-4.5 as a research preview to better understand its strengths and limitations.” (§1 Introduction, PDF p. 1)

The card names the release form (a research preview), without a release date.

_Searched:_ Whole card (about 30 pages): §§1–6, appendix; terms: “release”, “launch”, “available”, “API”, “preview”, “February”.

### Q03 Framework cited: ◐ partly

> “following OpenAI’s safety process and Preparedness Framework.” (§1 Introduction, PDF p. 1)

The card names the framework without an edition, reference or link. As context only: the dataset records the beta edition (2023-12-18) as the edition published before the card.

_Searched:_ Whole card (about 30 pages): §§1–6, appendix; references and link annotations; terms: “Preparedness Framework”, “beta”, “version”, “preparedness-framework”.

### Q04 Link to framework: ◐ partly

> “following OpenAI’s safety process and Preparedness Framework.” (§1 Introduction, PDF p. 1)

The card refers to the framework by name, without an address or bibliographic reference; no link annotation on it was found.

_Searched:_ Whole card (about 30 pages): §§1–6, appendix; references and link annotations; terms: “Preparedness Framework”, “http”, “cdn.openai.com”.

### Q05 Framework determination: ● stated

> “the Safety Advisory Group classified GPT-4.5 as overall medium risk, including medium risk for CBRN and persuasion and low for cybersecurity and model autonomy.” (§4 Preparedness Framework Evaluations, PDF p. 8)

The card states the post-mitigation designations in the same terms (§4.1); its conclusion calls the medium ratings for persuasion and CBRN pre-mitigation ratings (§6, PDF p. 26).

### Q06 Safeguards tied to determination: ◐ partly

> “CBRN and Persuasion reached a Medium post-mitigation risk designation, while cyber and model autonomy received a low designation.” (§4.1 Preparedness Mitigations, PDF p. 8)

> “Dedicated monitoring and detection efforts for CBRN, Persuasion, and Cyber tasks.” (§4.1 Preparedness Mitigations, PDF p. 8)

The card states the designations in §4.1 and lists Preparedness mitigations in the list that follows, without saying that they are applied because of the designations. A stated safeguard is the developer’s account.

_Cross-family check (item 87):_ minor, applied: the note places the safeguards in the list after the designations, not in their paragraph. Status agrees.

### Q07 Chemical and biological: ● stated

> “Our evaluations found that GPT-4.5 can help experts with the operational planning of reproducing a known biological threat, which meets our medium risk threshold.” (§4.3 Chemical and Biological Threat Creation, PDF p. 10)

Outcome category: Medium. Radiological and nuclear evaluations are also reported (§4.4). Details are not recorded (hazard rule).

### Q08 Cyber: ● stated

> “GPT-4.5 does not sufficiently advance real-world vulnerability exploitation capabilities to indicate medium risk.” (§4.2 Cybersecurity, PDF p. 9)

Outcome category: Low.

### Q09 Autonomy and AI R&D: ● stated

> “GPT-4.5 does not advance self-exfiltration, self-improvement, or resource acquisition capabilities sufficiently to indicate medium risk.” (§4.6 Model Autonomy, PDF p. 18)

Outcome category: Low. METR’s external evaluation of autonomy and AI R&D tasks is also summarised; it was of an earlier checkpoint of GPT-4.5 (§3.4, PDF p. 6).

_Cross-family check (item 88):_ minor, applied: the note says that METR evaluated an earlier checkpoint. Status agrees.

### Q10 Persuasion: ● stated

> “GPT-4.5 demonstrates state-of-the-art performance on our contextual persuasion evals.” (§4.5 Persuasion, PDF p. 16)

Outcome category: Medium (Score for GPT-4.5: Medium).

### Q11 Alignment and deception: ● stated

> “Thus, they believe that the scheming-related risk from GPT-4.5 is lower than that of o1.” (§3.3 Apollo Research, PDF p. 6)

The conclusion is Apollo Research’s, as reported by the card; details are in Appendix 7.2.

### Q12 Red-teaming: ◐ partly

> “The decision to prioritize red teaming evaluations (rather than direct human red teaming)” (§3.2 Red Teaming Evaluations, PDF p. 6)

The card reports evaluations built from earlier red-teaming campaigns (for o3-mini and deep research), covering illicit advice, extremism and hate crimes, political persuasion, self-harm and risky advice, instead of direct human red teaming of GPT-4.5.

_Searched:_ Whole card (about 30 pages): §§1–6, appendix; terms: “red team”, “red-team”, “external”.

### Q13 External testers: ● stated

> “METR evaluated an earlier checkpoint of GPT-4.5 and was given access to that checkpoint for 7 days” (§3.4 METR, PDF p. 6)

Apollo Research is also named as having tested the model (§3.3).

### Q14 Government institute: ○ not-found

_Searched:_ Whole card (about 30 pages): §§1–6, appendix; terms: “government”, “AI Safety Institute”, “AISI”, “CAISI”, “U.S.”, “UK”.

### Q15 Release decision: ◐ partly

> “the Safety Advisory Group classified GPT-4.5 as overall medium risk, including medium risk for CBRN and persuasion and low for cybersecurity and model autonomy.” (§4 Preparedness Framework Evaluations, PDF p. 8)

The named maker (the Safety Advisory Group) is attached to the risk classification, not to a release decision. The conclusion states the rating “with appropriate safeguards in place” and refers to deployment without describing a decision (§6). Maintainer decision 6a.

_Searched:_ Whole card (about 30 pages): §§1–6, appendix; terms: “decision”, “decid”, “deploy”, “launch”, “release”.

- Set aside: §3.2, PDF p. 6: “The decision to prioritize red teaming evaluations” concerns test design, not release.
- Set aside: §6 Conclusion, PDF p. 26: “Overall, GPT-4.5 is rated medium risk, with appropriate safeguards in place.” is a rating, not a release decision.

### Q16 Stated limits: ● stated

> “Preparedness evaluations represent a lower bound for potential capabilities” (§4 Preparedness Framework Evaluations, PDF p. 8)

METR’s summary adds that post-training evaluations allow third parties only limited safety assurances (§3.4).

## OpenAI: o3 and o4-mini (2025)

- Card: OpenAI o3 and o4-mini System Card (system card), https://cdn.openai.com/pdf/2221c875-02dc-4789-800b-e7758f3722c1/o3-and-o4-mini-system-card.pdf
- Framework edition in the dataset: `preparedness-v2`. The card states that it is released under “Version 2” of the Preparedness Framework (PDF p. 1), and its link annotation on “Preparedness” targets https://cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf, whose first page reads “Version 2. Last updated: 15th April, 2025” (retrieved 2026-11-06).

### Q01 Card date: ● stated

> “OpenAI o3 and o4-mini System Card OpenAI April 16, 2025” (Title block, PDF p. 1)

The card prints a day-precision date; no revision date was found.

### Q02 Release date: ◐ partly

> “The deployment of OpenAI o3 and o4-mini in the API allows developers to specify a custom developer message” (§3.7, PDF p. 7)

The card names API deployment as a release form and refers to the launch, without a release date.

_Searched:_ Whole card (about 30 pages): §§1–6, appendix; terms: “release”, “launch”, “available”, “API”, “ChatGPT”, “April”.

### Q03 Framework cited: ● stated

> “This is the first launch and system card to be released under Version 2 of our Preparedness Framework.” (§1 Introduction, PDF p. 1)

The card identifies the edition by version number; its link annotation targets the Version 2 PDF of 15 April 2025.

### Q04 Link to framework: ● stated

> “This is the first launch and system card to be released under Version 2 of our Preparedness Framework.” (§1 Introduction, PDF p. 1 (link annotation on “Preparedness”))

The words link to https://cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf; §4 also links an announcement of the updated framework (PDF p. 11).

### Q05 Framework determination: ● stated

> “determined that OpenAI o3 and o4-mini do not reach the High threshold in any of our three Tracked Categories: Biological and Chemical Capability, Cybersecurity, and AI Self-improvement.” (§1 Introduction, PDF p. 1)

The determination is attributed to OpenAI’s Safety Advisory Group (SAG).

### Q06 Safeguards tied to determination: ◐ partly

> “they did not trigger a Safeguards Report under our framework. Nonetheless, we have deployed significant mitigations in Preparedness risk areas” (§4 Preparedness, PDF p. 11)

The card states that the determination did not trigger the framework’s Safeguards Report and that mitigations were deployed regardless; the mitigations are not stated as required by, or applied because of, the determination.

_Searched:_ Whole card (about 30 pages): §§1–6, appendix; terms: “Safeguards Report”, “mitigation”, “safeguard”, “monitoring”.

### Q07 Chemical and biological: ● stated

> “determined that OpenAI o3 and o4-mini do not reach the High threshold in any of our three Tracked Categories: Biological and Chemical Capability, Cybersecurity, and AI Self-improvement.” (§1 Introduction, PDF p. 1)

> “Our evaluations found that OpenAI o3 and o4-mini can help experts with the operational planning of reproducing a known biological threat.” (§4.2 Biological and Chemical, PDF p. 12)

Outcome category: High threshold not reached for Biological and Chemical. The card says it expects models to cross this threshold in the near future and is intensifying investment in safeguards (§4.2). Details are not recorded (hazard rule).

### Q08 Cyber: ● stated

> “Neither OpenAI o3 nor o4-mini met the High threshold for cybersecurity.” (§4.3 Cybersecurity, PDF p. 15)

Pattern Labs’ external cyber evaluation is also summarised (§3.9.3).

### Q09 Autonomy and AI R&D: ● stated

> “suggesting they lack the capabilities required for a High classification.” (§4.4 AI Self-improvement, PDF p. 22)

METR’s external autonomy evaluation is also summarised (§3.9.1).

### Q10 Persuasion: ○ not-found

No persuasion evaluation was found. The card lists three Tracked Categories under Version 2 (biological and chemical, cybersecurity, AI self-improvement); it does not say that persuasion was removed.

_Searched:_ Whole card (about 30 pages): §§1–6, appendix; terms: “persua”, “manipul”, “influenc”.

- Set aside: §4 Preparedness, PDF p. 11: The list of three Tracked Categories does not include persuasion; no statement on the domain was found.

### Q11 Alignment and deception: ● stated

> “They found that OpenAI o3 and o4-mini score lower than o1 on in-context scheming evaluations, but they still exhibit deceptive tendencies against their developers and users” (§3.9.2 Apollo Research, PDF p. 10)

The conclusion is Apollo Research’s, as reported by the card; METR’s report of reward hacking is also summarised (§3.9.1).

### Q12 Red-teaming: ● stated

> “OpenAI provided external red teamers access to OpenAI o3 and o4-mini to assess vulnerabilities related to vision capabilities.” (§3.5 Vision Vulnerabilities, PDF p. 5)

Scope: vision vulnerabilities, pairwise comparison with GPT-4o and o1 over multiple checkpoints.

### Q13 External testers: ● stated

> “Pattern Labs, an AI Security organization that addresses and mitigates frontier cybersecurity risks, evaluated OpenAI o3 and o4-mini’s ability to solve three types of cyberoffensive challenges” (§3.9.3 Pattern Labs, PDF p. 10)

METR (§3.9.1) and Apollo Research (§3.9.2) are also named.

### Q14 Government institute: ● stated

> “to the U.S. AI Safety Institute to conduct evaluations of the models’ cyber and biological capabilities, and to the U.K. AI Security Institute to conduct evaluations of cyber, chemical and biological, and autonomy capabilities” (§3.9 Third Party Assessments, PDF p. 9)

The card states that versions of the models were provided to both institutes; it reports no findings from them.

### Q15 Release decision: ◐ partly

> “determined that OpenAI o3 and o4-mini do not reach the High threshold in any of our three Tracked Categories: Biological and Chemical Capability, Cybersecurity, and AI Self-improvement.” (§1 Introduction, PDF p. 1)

The named maker (the Safety Advisory Group) is attached to the capability determination, not to a release decision; the card refers to the launch without describing a decision. Maintainer decision 6a.

_Searched:_ Whole card (about 30 pages): §§1–6, appendix; terms: “decision”, “decid”, “deploy”, “launch”, “release”.

- Set aside: §6 Conclusion, PDF p. 26: States the SAG determination and that mitigations have been deployed, not a release decision.

### Q16 Stated limits: ● stated

> “evaluations represent a lower bound for potential capabilities” (§4.1 Capabilities Assessment, PDF p. 12)

METR’s summary adds that post-training evaluations allow third parties only limited safety assurances (§3.9.1).

## Inventory of cards located

The eight cards selected for pack 5. The full inherited inventory and adjudicated population remain in research/model-cards-2/; they were not re-inventoried here.

### Group anthropic

_Searched:_ Pack-5 selection inherited from research/model-cards-2/population.md (adjudicated 2026-11-04; packs 4 and 5 follow pack 3). Each card retrieved fresh by direct HTTP on 2026-11-06, sequentially, at least 8 s apart; the full developer inventory was not repeated. None of these cards is admitted or held (review/model-cards-admission-4-2026-11-05.md; src/reading/model-cards-frame.ts).

| Developer | Model             | Card                                                                                                         | Kind        | Card date                                                                                              | Retrieved                  | Compared | Note                                                                   |
| --------- | ----------------- | ------------------------------------------------------------------------------------------------------------ | ----------- | ------------------------------------------------------------------------------------------------------ | -------------------------- | -------- | ---------------------------------------------------------------------- |
| Anthropic | Claude Sonnet 4.5 | [System Card: Claude Sonnet 4.5](https://www-cdn.anthropic.com/963373e433e489a87a10c823c52a0a013e9172dd.pdf) | system card | 2025-09 (printed cover month); revisions 2025-10-10 and 2025-12-03 (changelog)                         | yes (HTTP 200, 2026-11-06) | yes      | Pack 5 in the population order; earliest located 2025-09 (index month) |
| Anthropic | Claude Haiku 4.5  | [System Card: Claude Haiku 4.5](https://www-cdn.anthropic.com/7aad69bf12627d42234e01ee7c36305dc2f6a970.pdf)  | system card | 2025-10 (printed cover month)                                                                          | yes (HTTP 200, 2026-11-06) | yes      | Pack 5 in the population order; earliest located 2025-10 (index month) |
| Anthropic | Claude Opus 4.6   | [System Card: Claude Opus 4.6](https://assets.claude.com/6a5fa276ac68b9aeb0c8b6af5fa36326e0e166dd.pdf)       | system card | 2026-02 (printed cover month); revisions 2026-02-06, 2026-02-10, 2026-02-17 and 2026-03-06 (changelog) | yes (HTTP 200, 2026-11-06) | yes      | Pack 5 in the population order; earliest located 2026-02 (index month) |

### Group google

_Searched:_ Pack-5 selection inherited from research/model-cards-2/population.md (adjudicated 2026-11-04; packs 4 and 5 follow pack 3). Each card retrieved fresh by direct HTTP on 2026-11-06, sequentially, at least 8 s apart; the full developer inventory was not repeated. None of these cards is admitted or held (review/model-cards-admission-4-2026-11-05.md; src/reading/model-cards-frame.ts).

| Developer       | Model                 | Card                                                                                                                                                                    | Kind       | Card date                                                                                                                                      | Retrieved                  | Compared | Note                                                                                                                                |
| --------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Google DeepMind | Gemini 2.5 Deep Think | [Gemini 2.5 Deep Think - Model Card](https://storage.googleapis.com/deepmind-media/Model-Cards/Gemini-2-5-Deep-Think-Model-Card.pdf)                                    | model card | 2025-08-01 (printed “published/updated AUG 01, 2025”)                                                                                          | yes (HTTP 200, 2026-11-06) | yes      | Pack 5 in the population order; earliest located 2025-08-01                                                                         |
| Google DeepMind | Gemini 2.5 Flash      | [Gemini 2.5 Flash Model Card (with Gemini 2.5 Flash Image and native audio)](https://storage.googleapis.com/deepmind-media/Model-Cards/Gemini-2-5-Flash-Model-Card.pdf) | model card | 2025-12 (printed “published/updated December, 2025”, copy read); population: 2025-08-30 from the capture printing “Last updated: Aug 27, 2025” | yes (HTTP 200, 2026-11-06) | yes      | Pack 5 in the population order; earliest located 2025-08-30 (cross-family check of 2026-11-04); the copy read is a later expression |

### Group meta

_Searched:_ Pack-5 selection inherited from research/model-cards-2/population.md (adjudicated 2026-11-04; packs 4 and 5 follow pack 3). Each card retrieved fresh by direct HTTP on 2026-11-06, sequentially, at least 8 s apart; the full developer inventory was not repeated. None of these cards is admitted or held (review/model-cards-admission-4-2026-11-05.md; src/reading/model-cards-frame.ts).

| Developer | Model           | Card                                                                                                                                                                                                                                     | Kind       | Card date                                                                | Retrieved                  | Compared | Note                                                                               |
| --------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------ | -------------------------- | -------- | ---------------------------------------------------------------------------------- |
| Meta      | Muse Spark Open | [Muse Spark Open model card (README.md, Hugging Face meta-models/Muse-Spark-Open-816B-A42B, revision 0fb02478)](https://huggingface.co/meta-models/Muse-Spark-Open-816B-A42B/resolve/0fb02478b02565b2ce7fc57e6051c91172774ac9/README.md) | model card | no card date printed (decision 8a); “Date of Release” October 15th, 2026 | yes (HTTP 200, 2026-11-06) | yes      | Pack 5 in the population order; earliest located 2026-10-15 (printed release date) |

### Group openai

_Searched:_ Pack-5 selection inherited from research/model-cards-2/population.md (adjudicated 2026-11-04; packs 4 and 5 follow pack 3). Each card retrieved fresh by direct HTTP on 2026-11-06, sequentially, at least 8 s apart; the full developer inventory was not repeated. None of these cards is admitted or held (review/model-cards-admission-4-2026-11-05.md; src/reading/model-cards-frame.ts).

| Developer | Model          | Card                                                                                                                                | Kind        | Card date            | Retrieved                  | Compared | Note                                                                       |
| --------- | -------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ----------- | -------------------- | -------------------------- | -------- | -------------------------------------------------------------------------- |
| OpenAI    | GPT-4.5        | [OpenAI GPT-4.5 System Card](https://cdn.openai.com/gpt-4-5-system-card-2272025.pdf)                                                | system card | 2025-02-27 (printed) | yes (HTTP 200, 2026-11-06) | yes      | Pack 5 in the population order; earliest located 2025-02-27 (printed date) |
| OpenAI    | o3 and o4-mini | [OpenAI o3 and o4-mini System Card](https://cdn.openai.com/pdf/2221c875-02dc-4789-800b-e7758f3722c1/o3-and-o4-mini-system-card.pdf) | system card | 2025-04-16 (printed) | yes (HTTP 200, 2026-11-06) | yes      | Pack 5 in the population order; earliest located 2025-04-16 (printed date) |

## Sources

| Key                         | Card                                                                                                          | Address                                                                                                                 | HTTP | SHA-256             | Retrieved                | Words | Archive                                                                                                                                                                                                                                                                                                                                                             |
| --------------------------- | ------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ---- | ------------------- | ------------------------ | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| anthropic-claude-haiku-4-5  | System Card: Claude Haiku 4.5                                                                                 | https://www-cdn.anthropic.com/7aad69bf12627d42234e01ee7c36305dc2f6a970.pdf                                              | 200  | `1b9ae5f4f66a65c1…` | 2026-11-06T20:10:58.561Z | 10286 | https://web.archive.org/web/20260124111405id_/https://www-cdn.anthropic.com/7aad69bf12627d42234e01ee7c36305dc2f6a970.pdf                                                                                                                                                                                                                                            |
| anthropic-claude-opus-4-6   | System Card: Claude Opus 4.6                                                                                  | https://assets.claude.com/6a5fa276ac68b9aeb0c8b6af5fa36326e0e166dd.pdf                                                  | 200  | `4db67c6b6aea0a87…` | 2026-11-06T20:11:27.172Z | 54564 | Not read here (web.archive.org reset the connection on 2026-11-06). In the cross-family check of 2026-11-07: the availability lookup returned no capture of the PDF or of the publisher’s permalink; no expression before the changelog was located.                                                                                                                |
| anthropic-claude-sonnet-4-5 | System Card: Claude Sonnet 4.5                                                                                | https://www-cdn.anthropic.com/963373e433e489a87a10c823c52a0a013e9172dd.pdf                                              | 200  | `d5d1ce28fea101ae…` | 2026-11-06T20:10:24.400Z | 37279 | Not read here (web.archive.org reset the connection on 2026-11-06). In the cross-family check of 2026-11-07: the nearest indexed capture (2026-01-24) postdates both changelog entries and answered HTTP 429 on replay; no expression before the changelog was read.                                                                                                |
| gdm-gemini-2-5-deep-think   | Gemini 2.5 Deep Think - Model Card                                                                            | https://storage.googleapis.com/deepmind-media/Model-Cards/Gemini-2-5-Deep-Think-Model-Card.pdf                          | 200  | `4f38096e3dffa489…` | 2026-11-06T20:10:32.886Z | 6289  | Not read here (web.archive.org reset the connection on 2026-11-06). In the cross-family check of 2026-11-07: the availability lookup returned no capture of this address.                                                                                                                                                                                           |
| gdm-gemini-2-5-flash        | Gemini 2.5 Flash Model Card (with Gemini 2.5 Flash Image and native audio)                                    | https://storage.googleapis.com/deepmind-media/Model-Cards/Gemini-2-5-Flash-Model-Card.pdf                               | 200  | `f3221d9458b2fed9…` | 2026-11-06T20:11:06.979Z | 2883  | Not read here (web.archive.org reset the connection on 2026-11-06). In the cross-family check of 2026-11-07: the capture of 2025-08-30 (revision “Aug 27, 2025”, recorded by the check of 2026-11-04) answered HTTP 429 on replay, so the sampled cells were not compared with the August expression. The capture is an availability bound, not a publication date. |
| meta-muse-spark-open        | Muse Spark Open model card (README.md, Hugging Face meta-models/Muse-Spark-Open-816B-A42B, revision 0fb02478) | https://huggingface.co/meta-models/Muse-Spark-Open-816B-A42B/resolve/0fb02478b02565b2ce7fc57e6051c91172774ac9/README.md | 200  | `f885ad11e611e04d…` | 2026-11-06T20:10:49.870Z | 3613  | Not read here (web.archive.org reset the connection on 2026-11-06). In the cross-family check of 2026-11-07: no capture of the pinned address; the repository page’s capture of 2026-10-16 answered HTTP 429 and the publisher’s history endpoint HTTP 401.                                                                                                         |
| openai-gpt-4-5              | OpenAI GPT-4.5 System Card                                                                                    | https://cdn.openai.com/gpt-4-5-system-card-2272025.pdf                                                                  | 200  | `f8fd0acc416faf11…` | 2026-11-06T20:10:41.646Z | 9873  | Not read here (web.archive.org reset the connection on 2026-11-06). In the cross-family check of 2026-11-07: the capture of 2025-02-28 answered HTTP 429 on replay.                                                                                                                                                                                                 |
| openai-o3-o4-mini           | OpenAI o3 and o4-mini System Card                                                                             | https://cdn.openai.com/pdf/2221c875-02dc-4789-800b-e7758f3722c1/o3-and-o4-mini-system-card.pdf                          | 200  | `32d7ca19fff2ed0d…` | 2026-11-06T20:11:16.787Z | 9957  | Not read here (web.archive.org reset the connection on 2026-11-06). In the cross-family check of 2026-11-07: the capture of 2025-04-16 answered HTTP 429 on replay.                                                                                                                                                                                                 |
