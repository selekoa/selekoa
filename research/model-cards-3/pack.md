# Model cards compared, pack 3: what frontier developers’ cards disclose

Generated from `pack.json` by `node research/model-cards-3/tools.mjs render`; do not edit by hand. Candidate research pack outside application data. Machine-prepared by Codex (GPT family); cross-family check by Claude (2026-11-05), adjudicated with the maintainer decisions of 2026-11-05: six cards ready for admission, PaliGemma and Grok-1 held. Not editorially accepted; no human review.

**Question.** What does each frontier developer's published system card, model card or safety report disclose, on the same questions for every card?

**Rows.** Decision 1a: every card that cites the developer’s frontier framework or states a determination under it, plus, for each developer, the latest card before its first framework edition. This pack drafts the next eight cards in research/model-cards-2/population.md’s adjudicated pack-3 order; completed packs are not repeated here.

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

| Card                                              | Q01 | Q02 | Q03 | Q04 | Q05 | Q06 | Q07 | Q08 | Q09 | Q10 | Q11 | Q12 | Q13 | Q14 | Q15 | Q16 |
| ------------------------------------------------- | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| Anthropic: Claude 3.7 Sonnet (2025)               |  ○  |  ◐  |  ●  |  ●  |  ●  |  ●  |  ●  |  ●  |  ●  |  ○  |  ●  |  ●  |  ●  |  ●  |  ◐  |  ●  |
| Anthropic: Claude Opus 4 & Claude Sonnet 4 (2025) |  ◐  |  ◐  |  ●  |  ●  |  ●  |  ●  |  ●  |  ●  |  ●  |  ◐  |  ●  |  ●  |  ●  |  ●  |  ●  |  ●  |
| Google DeepMind: PaliGemma (2024) **Held**        |  ◐  |  ◐  |  –  |  –  |  –  |  ◐  |  ○  |  ○  |  ○  |  ○  |  ○  |  ●  |  ○  |  ○  |  ○  |  ○  |
| Meta: Muse Spark 1.1 (2026)                       |  ●  |  ◐  |  ●  |  ●  |  ●  |  ●  |  ●  |  ●  |  ●  |  ◐  |  ●  |  ●  |  ●  |  ○  |  ◐  |  ●  |
| OpenAI: o1-preview and o1-mini (2024)             |  ●  |  ◐  |  ●  |  ●  |  ●  |  ◐  |  ●  |  ●  |  ●  |  ●  |  ●  |  ●  |  ●  |  ○  |  ◐  |  ●  |
| OpenAI: Operator (2025)                           |  ●  |  ●  |  ●  |  ●  |  ●  |  ◐  |  ●  |  ○  |  ●  |  ○  |  ○  |  ●  |  ●  |  ○  |  ◐  |  ●  |
| xAI: Grok-1 (2023) **Held**                       |  ○  |  ●  |  –  |  –  |  –  |  ○  |  ○  |  ○  |  ○  |  ○  |  ○  |  ○  |  ◐  |  ○  |  ○  |  ○  |
| xAI: Grok 4.20 (2026)                             |  ●  |  ◐  |  ◐  |  ●  |  ◐  |  ◐  |  ◐  |  ●  |  ○  |  ●  |  ●  |  ●  |  ◐  |  ○  |  ○  |  ●  |

## Anthropic: Claude 3.7 Sonnet (2025)

- Card: Claude 3.7 Sonnet System Card (system card), https://www-cdn.anthropic.com/9ff93dfa8f445c932415d335c88852ef47f1201e.pdf
- Framework edition in the dataset: `rsp-2023`. Reference [1] explicitly dates its cited policy September 2023; record the citation rather than infer a later edition.

### Q01 Card date: ○ not-found

The card prints no issue or revision date. The inherited population dates its earliest located publication to 2025-02 by index month; that is not a printed card date.

_Searched:_ Cover, introduction, release-decision section and references; whole-card date search; terms: “February”, “2025”, “published”, “updated”, “date”.

- Set aside: References, PDF pp. 42–43: Dates attached to cited publications do not date this card.

### Q02 Release date: ◐ partly

> “When using Claude on Claude.AI or via the API, Claude’s reasoning in extended thinking appears in a separate section before its final response.” (§1.2 Extended Thinking Mode, PDF p. 3)

The card describes consumer and API use, without a calendar release date.

_Searched:_ Introduction, §1.2 and §§1.4.2–1.4.4; whole-card date and availability search; terms: “released”, “available”, “launch”, “API”, “February”.

### Q03 Framework cited: ● stated

> “Anthropic’s Responsible Scaling Policy. https://www.anthropic.com/index/anthropics-responsible-scaling-policy, September 2023.” (Reference [1], PDF p. 42)

The bibliography identifies the cited RSP by September 2023. This records the card’s reference, without substituting a later edition.

### Q04 Link to framework: ● stated

> “https://www.anthropic.com/index/anthropics-responsible-scaling-policy” (Reference [1], PDF p. 42)

The card supplies the policy address.

### Q05 Framework determination: ● stated

> “Based on our assessments, we’ve concluded that Claude 3.7 Sonnet is released under the ASL-2 standard.” (§1.4.3 ASL Determination Process, PDF p. 6)

The card reports an ASL-2 safeguards determination.

### Q06 Safeguards tied to determination: ● stated

> “Claude 3.7 Sonnet is sufficiently far away from the ASL-3 capability thresholds such that ASL-2 safeguards remain appropriate.” (§1.4.4 ASL-2 Determination and Conclusions, PDF p. 7)

The card ties ASL-2 safeguards to its assessment against ASL-3 capability thresholds.

### Q07 Chemical and biological: ● stated

> “Altogether, we believe that Claude 3.7 Sonnet continues to be sufficiently far away from the ASL-3 capability thresholds, and therefore, we find that ASL-2 safeguards remain appropriate.” (§7.1 CBRN Evaluations, conclusion, PDF p. 24)

The card’s biological-risk conclusion is recorded at policy level. §7.1.1 states that chemical risks were not evaluated directly; §7.1.2 describes nuclear-risk work with NNSA.

### Q08 Cyber: ● stated

> “Because the model did not have wide success in medium difficulty evaluations, we did not conduct evaluations on the hardest tasks.” (§7.3 Cyber Evaluations, Results item 3, PDF p. 35)

The card reports a qualitative outcome of its offensive-cyber evaluations; no task contents or scores are recorded.

### Q09 Autonomy and AI R&D: ● stated

> “these improvements did not cross any new capability thresholds beyond those already reached by Claude 3.5 Sonnet (new).” (§7.2 Autonomy Evaluations, Results, PDF p. 29)

The card reports its autonomy/AI R&D evaluation conclusion.

### Q10 Persuasion: ○ not-found

No passage meeting the criterion was found in the recorded search.

_Searched:_ §§5.1–5.3 on faithfulness, concerning thought processes and alignment faking; §§7.1–7.4 on RSP evaluations; whole-card search; terms: “persuasion”, “persuasive”, “manipulation”, “manipulating”, “influence”.

- Set aside: §5.2, PDF pp. 18–22: Monitoring includes deception, omission and sycophancy in the model’s reasoning; it does not report an evaluation of persuasive or manipulative capability toward people.

### Q11 Alignment and deception: ● stated

> “During our evaluations we noticed that Claude 3.7 Sonnet occasionally resorts to special-casing in order to pass test cases in agentic coding environments like Claude Code.” (§6 Excessive Focus on Passing Tests, PDF p. 22)

The card reports reward-hacking behaviour observed during evaluations.

### Q12 Red-teaming: ● stated

> “Our evaluations were informed by our previous deployment and included both internal and third-party red-teaming exercises as well as automated evaluations.” (§4 Computer Use, PDF p. 12)

The stated scope is computer-use risk; internal and third-party red-teaming are reported.

### Q13 External testers: ● stated

> “Domain experts from Deloitte engaged in extended conversations with Claude” (§7.1.4, Expert Red Teaming, PDF p. 26)

The card names Deloitte as an external evaluator; technical evaluation details are omitted.

### Q14 Government institute: ● stated

> “the U.S. AI Safety Institute (U.S. AISI) and U.K. AI Security Institute (U.K. AISI) conducted pre-deployment testing of Claude 3.7 Sonnet” (§7.4 Third Party Assessments, PDF p. 41)

The named institutes are reported to have tested the model.

### Q15 Release decision: ◐ partly

> “Consistent with our RSP, the RSO and CEO made the ultimate determination on the model’s ASL.” (§1.4.3 ASL Determination Process, PDF p. 6)

The named makers are attached to the ASL determination, rather than an expressly attributed release decision. This is the criterion’s capability/safeguards-determination case under decision 6a; availability alone does not count (13a).

_Searched:_ §§1.4.1–1.4.4 and whole-card decision search; terms: “decided”, “decision”, “release”, “determination”, “CEO”.

- Set aside: §1.4.1, PDF p. 6: The final-release verification requirement describes a process, rather than who made this release decision.

### Q16 Stated limits: ● stated

> “how the model performs on expert-level evaluations may not directly translate to real-world capabilities” (§7.1 CBRN Evaluations, Results, PDF p. 23)

The card limits interpretation of its evaluation results.

## Anthropic: Claude Opus 4 & Claude Sonnet 4 (2025)

- Card: System Card: Claude Opus 4 & Claude Sonnet 4 (system card), https://www-cdn.anthropic.com/07b2a3f9902ee19fe39a36ca638e5ae987bc64dd.pdf
- Framework edition in the dataset: `rsp-v2-2`. RSP v2.2, effective 2025-05-14, identified by the PDF hyperlink annotation on the policy name in §1.2.3, PDF p. 9; linked file retrieved fresh on 2026-11-05.

### Q01 Card date: ◐ partly

> “May 2025” (Cover, PDF p. 1)

The card’s cover carries a month, without a day or a printed revision date.

### Q02 Release date: ◐ partly

> “This style of prompting is not possible in Claude.ai and similar chat interfaces, but it is accessible to developers through our API.” (§4.1.7 Jailbreak and prefill susceptibility, PDF p. 42)

The card implies API access in a passage on a jailbreak prompting technique; it states no release form or release date. The cover’s “May 2025” is the card’s date (Q01), not a release date.

_Cross-family check (item 44):_ minor, applied: the passage concerns a prompting technique and implies API access only; the earlier note (“identifies consumer and API access forms”) overstated it.

_Searched:_ Introduction, §§1.1–1.2 and §4.1.7; whole-card date/availability search; terms: “release”, “launch”, “available”, “API”, “May 22”.

### Q03 Framework cited: ● stated

> “please see the Responsible Scaling Policy” (§1.2.3 AI Safety Level determination process, PDF p. 9 (hyperlink annotation on policy name))

The card’s hyperlink annotation targets https://www-cdn.anthropic.com/872c653b2d0501d6ab44cf87f43e1dc4853e4d37.pdf. The target’s cover prints Version 2.2, Effective May 14, 2025. Edition identified by link annotation under decision 4a; recorded as rsp-v2-2.

### Q04 Link to framework: ● stated

> “For more information on the requirements for these ASL Standards, please see the Responsible Scaling Policy” (§1.2.3, PDF p. 9)

The framework name in this passage is linked directly to the RSP v2.2 PDF. Page 8 separately links a policy-update announcement; that is not the edition evidence.

### Q05 Framework determination: ● stated

> “we have decided to release Claude Opus 4 under the ASL-3 Standard and Claude Sonnet 4 under the ASL-2 Standard.” (§1.2.3 AI Safety Level determination process, PDF p. 9)

The card applies different safeguard standards to the two models. For Opus 4 the card says ASL-3 capability could not be ruled out, rather than reporting that it definitively passed the threshold (§1.2.4).

### Q06 Safeguards tied to determination: ● stated

> “The ASL-3 safeguards we have now activated for Claude Opus 4 represent significant investments in both deployment protections and security controls” (§1.2.4 Conclusions, PDF p. 10)

The card ties the stated deployment and security controls to Opus 4’s precautionary ASL-3 deployment.

### Q07 Chemical and biological: ● stated

> “we cannot clearly rule out ASL-3 risks for Claude Opus 4 (although we have ruled out that it needs the ASL-4 Standard).” (§1.2.4 Conclusions, PDF p. 10)

The conclusion concerns CBRN capability uncertainty described in §§1.2.3–1.2.4. Sonnet 4 remains at ASL-2; this is not a claim that Opus 4 definitively passed the ASL-3 capability threshold.

### Q08 Cyber: ● stated

> “Based on the evaluation results, we believe the models do not demonstrate catastrophically risky capabilities in the cyber domain.” (§7.4 Cyber evaluations, Results, PDF p. 117)

The card’s policy-level conclusion covers both models. §7.4 states that the RSP has no formal cyber threshold at any ASL level.

### Q09 Autonomy and AI R&D: ● stated

> “Claude Opus 4 shows improvement over Claude Sonnet 3.7 in most AI research and software engineering capabilities, while remaining below the ASL-4 Autonomy threshold.” (§7.3 Autonomy evaluations, PDF p. 105)

The card concludes that Opus 4 remains below the ASL-4 autonomy threshold; the Sonnet 4 conclusion on p. 106 also says ASL-4 protections are not required.

### Q10 Persuasion: ◐ partly

> “In this assessment, we aim to detect a cluster of related phenomena including: … attempts to manipulate users toward certain views. We conducted testing continuously throughout finetuning” (§4 Alignment assessment, PDF p. 22)

The card includes user manipulation in the alignment assessment’s scope. A separate outcome for that capability was not found; this is not a reported human persuasion trial.

_Searched:_ §4 introduction, §4.1.3 and §§4.2.1–4.2.2; whole-card search; terms: “persuasion”, “persuasive”, “manipulate”, “manipulative”, “views”.

- Set aside: §4.2.1, PDF p. 48: The emotional-manipulation metric concerns an AI auditor, not a person.

### Q11 Alignment and deception: ● stated

> “None of the snapshots we tested showed significant signs of systematic deception or coherent hidden goals.” (§4 Alignment assessment, PDF p. 22)

This is the card’s aggregate conclusion for Opus 4 snapshots. The same section and §4.1.1 describe conditional self-preservation and deception findings; it is not a conclusion that such behaviour was absent.

### Q12 Red-teaming: ● stated

> “Red-teamers probed various scenarios over three days of testing” (§7.2.4.2 ASL-3 expert red teaming, PDF p. 94)

The card reports biological-risk expert red-teaming by Deloitte for both models, over three days.

### Q13 External testers: ● stated

> “we contracted with Apollo Research to assess an early snapshot for propensities and capabilities related to sabotage” (§4.1.1.4 External scenario evaluations, PDF p. 30)

The named external evaluation concerns an early Opus 4 snapshot; its findings are not attributed to the final model.

### Q14 Government institute: ● stated

> “joint pre-deployment testing of the new Claude Opus 4 model was conducted by the US AI Safety Institute (US AISI) and the UK AI Security Institute (UK AISI).” (§7.5 Third party assessments, PDF p. 122)

This passage concerns Opus 4; it does not state that the institutes also tested Sonnet 4.

### Q15 Release decision: ● stated

> “Based on these assessments, we have decided to release Claude Opus 4 under the ASL-3 Standard and Claude Sonnet 4 under the ASL-2 Standard.” (§1.2.3, PDF p. 9)

The card expressly states a release decision. The developer’s “we” identifies Anthropic as decision-maker under decision 6a; CEO/RSO roles in the preceding paragraph concern the ASL determination.

### Q16 Stated limits: ● stated

> “The absolute values of these metrics depend on our largely-arbitrary choice of auditor instructions.” (§4.2.1 Automated behavioral audits, PDF p. 48)

The card limits interpretation of its automated behavioural audit metrics.

## Google DeepMind: PaliGemma (2024), held

**Held from admission.** Maintainer decision of 2026-11-05: read only from an archive capture, and none of its sampled cells was cross-family checked because web.archive.org refused the checker. Admitted with a later pack once a reader outside the Codex family can open the capture.

- Card: PaliGemma model card (model card), https://web.archive.org/web/20240515003852id_/https://ai.google.dev/gemma/docs/paligemma/model-card
- Framework edition in the dataset: none identified. Pre-FSF-v1.0 expression, archive capture 2024-05-15; later live revision kept distinct.

### Q01 Card date: ◐ partly

> “Last updated 2024-05-13 UTC.” (Page footer in the 2024-05-15 archive capture)

The archived card prints a revision date, without an issue date. The wording was available by the capture of 2024-05-15; this does not establish its earliest publication. The separately retrieved live page prints a revision date of 2025-02-25.

### Q02 Release date: ◐ partly

> “In creating an open model, we have carefully considered the following:” (Usage and limitations > Ethical considerations and risks)

The card describes an open model and links its Kaggle resources. No model release date is printed.

_Searched:_ Model information, resource links, Implementation information and Usage and limitations; whole-card release/date search; terms: “release”, “available”, “launch”, “May”, “2024”.

### Q03 Framework cited: – not-applicable

The copy read is the capture of 2024-05-15, before Google DeepMind’s FSF v1.0 of 2024-05-17. No framework determination is asked of this pre-framework expression. The 2025 live revision is not used to establish the historical wording.

### Q04 Link to framework: – not-applicable

The copy read is the capture of 2024-05-15, before Google DeepMind’s FSF v1.0 of 2024-05-17. No framework determination is asked of this pre-framework expression. The 2025 live revision is not used to establish the historical wording.

### Q05 Framework determination: – not-applicable

The copy read is the capture of 2024-05-15, before Google DeepMind’s FSF v1.0 of 2024-05-17. No framework determination is asked of this pre-framework expression. The 2025 live revision is not used to establish the historical wording.

### Q06 Safeguards tied to determination: ◐ partly

> “Text safety filtering: We identify and filter out images that are paired with unsafe text.” (Model data > Data responsibility filtering)

The card states a training-data safeguard, without a tie to a frontier-framework determination.

_Searched:_ Data responsibility filtering; Ethics and safety; Risks identified and mitigations; terms: “filter”, “safeguard”, “threshold”, “framework”.

### Q07 Chemical and biological: ○ not-found

No passage meeting the criterion was found in the recorded search.

_Searched:_ Whole archived card, including Ethics and safety > Evaluation approach and Evaluation results; terms: “chemical”, “biological”, “CBRN”, “weapons”, “nuclear”.

- Set aside: Ethics and safety > Evaluation results: The thresholds here concern content policies, rather than dangerous chemical or biological capabilities.

### Q08 Cyber: ○ not-found

No passage meeting the criterion was found in the recorded search.

_Searched:_ Whole archived card, including all Evaluation information and Ethics and safety; terms: “cyber”, “offensive”, “attack”, “security”.

- Set aside: Ethics and safety > Evaluation results: “Identity Attack” is a content-toxicity metric, not offensive-cyber evaluation.

### Q09 Autonomy and AI R&D: ○ not-found

No passage meeting the criterion was found in the recorded search.

_Searched:_ Whole archived card, including Benchmark results, Ethics and safety and Intended usage; terms: “autonomy”, “autonomous”, “self-replication”, “self-improvement”, “AI research”, “R&D”.

- Set aside: Usage and limitations > Vision-language research: A research use case for the model is not an evaluation of autonomous AI R&D capability.

### Q10 Persuasion: ○ not-found

No passage meeting the criterion was found in the recorded search.

_Searched:_ Whole archived card, including Ethics and safety and Ethical considerations and risks; terms: “persuasion”, “persuasive”, “manipulation”, “manipulate”, “influence”.

- Set aside: Ethical considerations and risks > Misinformation and Misuse: A misuse risk is described without a persuasion evaluation.

### Q11 Alignment and deception: ○ not-found

No passage meeting the criterion was found in the recorded search.

_Searched:_ Whole archived card, including Ethics and safety, Evaluation information and Limitations; terms: “alignment”, “deception”, “scheming”, “sabotage”, “reward hacking”, “oversight”.

- Set aside: Ethics and safety > Evaluation approach: Content-safety and representational-harm tests do not evaluate the model’s own deception or sabotage of oversight.

### Q12 Red-teaming: ● stated

> “Our evaluation methods include structured evaluations and internal red-teaming testing of relevant content policies.” (Ethics and safety > Evaluation approach)

The card reports internal red-teaming scoped to content policies.

### Q13 External testers: ○ not-found

No passage meeting the criterion was found in the recorded search.

_Searched:_ Whole archived card; Model information, Implementation information, Evaluation information and Ethics and safety; terms: “external”, “third-party”, “testers”, “evaluators”, “evaluated”, “partners”.

- Set aside: Ethics and safety > Evaluation approach: The named FairFace dataset is a benchmark resource; it does not identify an external organisation that tested the model.

### Q14 Government institute: ○ not-found

No passage meeting the criterion was found in the recorded search.

_Searched:_ Whole archived card, particularly Ethics and safety; terms: “government”, “institute”, “AISI”, “NIST”, “pre-deployment”, “access”.

### Q15 Release decision: ○ not-found

No passage meeting the criterion was found in the recorded search.

_Searched:_ Whole archived card; Ethics and safety > Evaluation results, Implementation information, and Usage and limitations; terms: “decided”, “decision”, “deemed”, “acceptable”, “release”, “deployment”, “determined”.

- Set aside: Ethics and safety > Evaluation results: Results “within acceptable thresholds for meeting internal policies” describe evaluation outcomes, without stating a release decision or who made it.
- Set aside: Implementation information > Software: A statement that fine-tune and inference code are released is availability, not a described decision under decisions 6a and 13a.

### Q16 Stated limits: ○ not-found

No passage meeting the criterion was found in the recorded search.

_Searched:_ Evaluation information, Ethics and safety, Usage and limitations; whole archived card; terms: “limitation”, “gap”, “uncertain”, “underestimate”, “evaluation”, “coverage”.

- Set aside: Usage and limitations > Limitations: The passages concern model/product limitations, including zero-shot performance and hallucination, rather than gaps or uncertainty in the evaluations.

## Meta: Muse Spark 1.1 (2026)

- Card: Muse Spark 1.1 Evaluation Report (safety report), https://research.meta.ai/static/muse-spark-1-1-evaluation-report
- Framework edition in the dataset: `meta-aasf-v2-0`. Edition identified by the printed v2 framework URL in footnote 2, PDF p. 6.

### Q01 Card date: ● stated

> “Date: July 9, 2026” (Opening report summary, PDF p. 2 (unnumbered))

The report prints a day-precision date. No separate revision date is printed in the copy read.

### Q02 Release date: ◐ partly

> “Muse Spark 1.1 is also released to external developers through an application programming interface (API)” (§1 Introduction, PDF p. 6, printed p. 5)

The report states API release and describes the model powering Meta AI. Its report date does not by itself date the release.

_Searched:_ Opening summary and §§1–1.2; whole-report release/date search; terms: “released”, “available”, “launch”, “July 9”, “date”.

### Q03 Framework cited: ● stated

> “Meta’s Advanced AI Scaling Framework” (§1 Introduction, footnote 2, PDF p. 6, printed p. 5)

Footnote 2 supplies https://ai.meta.com/static-resource/Meta_Advanced-AI-Scaling-Framework-v2. The v2 address identifies the edition, recorded as meta-aasf-v2-0; no later framework is substituted.

### Q04 Link to framework: ● stated

> “https://ai.meta.com/static-resource/Meta_Advanced-AI-Scaling-Framework-v2” (§1, footnote 2, PDF p. 6, printed p. 5)

The report prints a reference to the framework document.

### Q05 Framework determination: ● stated

> “residual risk across the Chemical & Biological, Cybersecurity, and Loss of Control domains is “moderate or lower” following mitigations.” (§1.1.1 Risk Assessment Summary, PDF p. 8, printed p. 7)

The report gives residual-risk categories for all three domains. Its opening summary says high-risk capability cannot be ruled out for unmitigated CB and cyber; §§1.2 and 2.1 call unmitigated CB high risk. These are kept distinct from residual risk.

### Q06 Safeguards tied to determination: ● stated

> “Our determination that the deployment of Muse Spark 1.1, if left unmitigated, could substantially contribute to catastrophic outcomes related to Chemical & Biological risks requires us to design, implement, and validate mitigations” (§2.1 Chemical & Biological Risks, Mitigations and Safeguards, PDF p. 12, printed p. 11)

> “we implement a multi-layered mitigation strategy designed to consistently reject user inputs” (§2.1 Chemical & Biological Risks, Mitigations and Safeguards, PDF p. 12, printed p. 11)

The report ties a multi-layer mitigation strategy to the unmitigated-risk determination. The same paragraph names refusal mechanisms and monitoring of persistent malicious use. This records Meta’s account of safeguards.

### Q07 Chemical and biological: ● stated

> “We therefore retain the “high risk” determination for the unmitigated model under Outcomes CB-1 and CB-2.” (§2.1 Chemical & Biological Risks, Summary of Results, PDF p. 12, printed p. 11)

The report says the model was reevaluated and retains the unmitigated high-risk determination. Its opening summary uses “cannot rule out” high-risk capability instead. The residual-risk conclusion after mitigations is moderate or lower.

### Q08 Cyber: ● stated

> “Our evaluations cannot rule out a “high risk” designation for the unmitigated model in the Cybersecurity domain under our Advanced AI Scaling Framework.” (§2.2 Cybersecurity, Capability Assessment and Summary of Results, PDF p. 19, printed p. 18)

The report adopts that designation conservatively, and states moderate-or-lower residual risk after mitigations.

### Q09 Autonomy and AI R&D: ● stated

> “Muse Spark 1.1 still lacks sufficient autonomy to sustain automated AI R&D” (§2.3.1.1 Acceleration of AI Development, Results, PDF p. 41, printed p. 40)

The report records AI R&D capability evaluations within its loss-of-control assessment and states this conclusion.

### Q10 Persuasion: ◐ partly

> “We assess the Cyber 3 (scaled fraud, extortion, and scams) outcome through a multi-turn social-engineering capability evaluation” (§2.2.2 Social Engineering, PDF p. 27, printed p. 26)

The report gives benchmark scores in Figure 12, without a social-engineering-specific outcome category or narrative conclusion. The victim is simulated; no human persuasion result is recorded.

_Searched:_ §2.2.2 and Figure 12 (PDF pp. 27–28), §2.2 summary, §4.2; whole-report search; terms: “social engineering”, “convince”, “persuasion”, “manipulat”.

- Set aside: §2.2 summary, PDF p. 19: The high-risk cyber conclusion covers the aggregate cyber assessment, rather than a stated social-engineering-specific conclusion.
- Set aside: §4.2, PDF pp. 68–70: Emotional manipulation is judged in automated alignment scenarios; it is not a measurement of persuasion of human subjects.

### Q11 Alignment and deception: ● stated

> “The presence of the reasoning therefore has no measurable effect on whether the model actually complies.” (§4.1.5 Scheming, Alignment Faking results, PDF p. 65, printed p. 64)

The report distinguishes alignment-faking reasoning from the observed compliance gap. This conclusion is scoped to the reported evaluation, without implying an absence of scheming in other settings.

### Q12 Red-teaming: ● stated

> “GraySwan additionally ran prompt-injection attacks using their private Agent Red Teaming (ART) benchmark” (§3.2.2.3 Third-Party Red Teaming: GraySwan ART, PDF p. 56, printed p. 55)

The report describes external red-teaming before launch, scoped to agent prompt-injection risk.

### Q13 External testers: ● stated

> “Scale AI runs the private split of FORTRESS and we include the results in Figure 26.” (§3.1.3.1 FORTRESS, PDF p. 50, printed p. 49)

The report names Scale AI as an external evaluator of jailbreak robustness.

### Q14 Government institute: ○ not-found

No named government body was found as testing or receiving access to Muse Spark 1.1.

_Searched:_ §§1–1.4, §§2–4 third-party evaluation references and bibliography; whole-report search; terms: “government”, “AISI”, “Safety Institute”, “Security Institute”, “CAISI”, “NIST”, “pre-deployment access”.

- Set aside: Bibliography, PDF p. 110, printed p. 109: The US/UK AISI citation concerns OpenAI o1, not this model.

### Q15 Release decision: ◐ partly

> “we therefore release Muse Spark 1.1.” (Opening summary, PDF p. 2 (unnumbered))

The release is stated as following from the mitigation assessment, the criterion’s “we therefore release” case under decision 6a. The governance section names no release decision-maker. Report authors are not automatically decision-makers.

_Searched:_ Opening summary, §1 Introduction and §1.2 Governance; whole-report decision search; terms: “decision”, “decided”, “release”, “deploy”, “approved”, “committee”, “sign-off”.

- Set aside: §1 Introduction, PDF p. 6, printed p. 5: A governance process leading to a deployment decision is mentioned, without identifying who made it.

### Q16 Stated limits: ● stated

> “Because examples were adversarially curated or generated, this evaluation does not measure how frequently sycophancy occurs in average user conversations” (§4.1.4 Sycophancy, PDF p. 63, printed p. 62)

The report limits interpretation of the sycophancy evaluation as a measure of deployment frequency.

## OpenAI: o1-preview and o1-mini (2024)

- Card: OpenAI o1 System Card (o1-preview and o1-mini) (system card), https://cdn.openai.com/o1-system-card-20240917.pdf
- Framework edition in the dataset: `preparedness-beta-2023`. The card’s bibliography explicitly names and links the 2023 beta framework.

### Q01 Card date: ● stated

> “Sept 12, 2024” (Title and date, PDF p. 1)

The card prints a day-precision date. The filename’s 20240917 string is not substituted for the printed date.

### Q02 Release date: ◐ partly

> “our ChatGPT implementation of these models also displays a summarized version of the model’s chain-of-thought to the user.” (§2 Model data and training, PDF p. 2)

The card identifies a ChatGPT implementation, without a calendar release date. Testers’ API access in §3.3 is not treated as general release.

_Searched:_ §§1–3, §4 introductory launch references and §6 conclusion; whole-card search; terms: “release”, “launch”, “available”, “September”, “ChatGPT”, “API”.

### Q03 Framework cited: ● stated

> “Openai preparedness framework (beta).” (Reference [29], PDF p. 42)

The bibliography names the beta framework and dates it 2023; it links the beta PDF. Recorded as preparedness-beta-2023.

### Q04 Link to framework: ● stated

> “https://cdn.openai.com/ openai-preparedness-framework-beta.pdf” (Reference [29], PDF p. 42)

The card supplies the beta framework address; the PDF line break splits the printed URL.

### Q05 Framework determination: ● stated

> “the Safety Advisory Group [29] classified both o1-preview and o1-mini pre-mitigation models as overall medium risk, including medium risk for persuasion and CBRN, and low risk for model autonomy and cybersecurity.” (§4 Preparedness Framework Evaluations, PDF p. 13)

The card reports all four categories and overall medium risk. The following sentence says the Safety Advisory Group rated post-mitigation risk levels the same, as a precaution.

### Q06 Safeguards tied to determination: ◐ partly

> “o1 inherits our earlier safety mitigations of training in refusal behavior for harmful requests and using moderation models for the most egregious content” (§3.1 Safety Evaluations, PDF p. 2)

The card names refusal training and moderation. §6 ties unspecified commensurate safeguards to overall medium risk, without explicitly identifying these named safeguards as consequences of that determination.

_Searched:_ §3.1, §4 framework introduction and §6 conclusion; terms: “safeguards”, “mitigations”, “commensurate”, “medium risk”, “moderation”.

### Q07 Chemical and biological: ● stated

> “Score for both o1-preview and o1-mini: Medium” (§4.3 Biological Threat Creation, PDF p. 17)

The card reports biological evaluations and this domain category. Chemical contextual evaluations are also mentioned, without treating this as a separate chemical-risk determination.

### Q08 Cyber: ● stated

> “Neither o1-preview nor o1-mini sufficiently advance real-world vulnerability exploitation capabilities to indicate medium risk.” (§4.2 Cybersecurity, Summary, PDF p. 14)

The card reports a low cyber-risk category for both models.

### Q09 Autonomy and AI R&D: ● stated

> “Neither o1-preview nor o1-mini advance self-exfiltration, self-improvement, or resource acquisition capabilities sufficiently to indicate medium risk.” (§4.5 Model Autonomy, Summary, PDF p. 27)

The card reports a low autonomy-risk category for both models.

### Q10 Persuasion: ● stated

> “they do not outperform top human writers and do not reach our high risk threshold.” (§4.4 Persuasion, Summary, PDF p. 21)

The card rates both models medium in persuasion, reporting human-level written persuasion. This is the developer’s stated conclusion of its evaluations.

### Q11 Alignment and deception: ● stated

> “Apollo Research believes that o1-preview has the basic capabilities needed to do simple in-context scheming” (§3.3.1 Apollo Research, PDF p. 11)

The card attributes the conclusion to Apollo and limits it to o1-preview. The paragraph says current evaluations do not definitively rule out catastrophic-harm scheming.

### Q12 Red-teaming: ● stated

> “Red teamers had access to various snapshots of the model at different stages of training and mitigation maturity starting in early August through mid-September 2024.” (§3.3 External Red Teaming, PDF p. 9)

The card reports external red-teaming spanning the stated period and model snapshots, rather than a single final-model test.

### Q13 External testers: ● stated

> “Apollo Research, an evaluation organization focusing on risks from deceptively aligned AI systems, evaluated capabilities of ‘scheming’ in o1 models.” (§3.3.1 Apollo Research, PDF p. 10)

The card names Apollo as an external evaluator.

### Q14 Government institute: ○ not-found

No passage meeting the criterion was found in the recorded search.

_Searched:_ §3.3 and its evaluator subsections, §4 government/laboratory references, acknowledgements and bibliography; whole-card search; terms: “government”, “AISI”, “Safety Institute”, “Security Institute”, “Los Alamos”, “pre-deployment”, “NIST”.

- Set aside: §3.3.1 Table 5, PDF p. 11: UK AISI’s Theory of Mind is an evaluation resource used by Apollo; it does not state government testing or access to these models.
- Set aside: §4.3.5, PDF p. 20: Work developing wet-lab evaluations with Los Alamos National Laboratory is described, without saying that it tested these models or received access.

### Q15 Release decision: ◐ partly

> “The Safety Advisory Group also rated the post-mitigation risk levels the same as the pre-mitigation risk levels, to err on the side of caution.” (§4 Preparedness Framework Evaluations, PDF p. 13)

The named maker is attached to a risk determination, not to the release decision. This meets the criterion’s determination-maker case under 6a. Deployment statements in §6 do not independently establish a decision under 13a.

_Searched:_ §§3–4 and §6; whole-card decision search; terms: “decided”, “decision”, “release”, “launch”, “Safety Advisory Group”, “deploy”.

### Q16 Stated limits: ● stated

> “current evals aren’t designed to definitively rule this out.” (§3.3.1 Apollo Research, PDF p. 11)

The limitation concerns the preceding statement that Apollo subjectively believes o1-preview cannot engage in scheming leading to catastrophic harms; it is not a demonstrated rule-out.

## OpenAI: Operator (2025)

- Card: Operator System Card (system card), https://cdn.openai.com/operator_system_card.pdf
- Framework edition in the dataset: `preparedness-beta-2023`. The card’s bibliography explicitly names and links the 2023 beta framework.

### Q01 Card date: ● stated

> “January 23, 2025” (Title and date, PDF p. 1)

> “Updated March 11, 2025:” (§4.7 API Availability, PDF p. 12)

The cover prints the card date. A separate revision/addition is marked “Updated March 11, 2025” in §4.7 (PDF p. 12); the file read therefore contains later wording. The file read is that revised expression (also created 2025-03-11, by its PDF metadata, in the cross-family check of 2026-11-05); the printed card date of January 23, 2025 stands. An archive capture of 2025-01-23, which would hold the January expression, is located but not retrieved.

### Q02 Release date: ● stated

> “Updated March 11, 2025: Launching the Computer-Using Agent (CUA) model in the API” (§4.7 API Availability, PDF p. 12)

The dated addition describes the API launch as computer-use-preview to selected developers. The initial Operator research preview is separately described on p. 3 without a calendar release date.

### Q03 Framework cited: ● stated

> “Openai preparedness framework (beta).” (Reference [3], PDF p. 16)

The card identifies the beta edition in its bibliography and supplies its PDF address.

### Q04 Link to framework: ● stated

> “https://cdn.openai.com/ openai-preparedness-framework-beta.pdf” (Reference [3], PDF p. 16)

The card links the framework itself; the printed URL wraps after the host.

### Q05 Framework determination: ● stated

> “found the pre-mitigation Operator model to be “Low” risk in both categories, consistent with the GPT-4o model.” (§3.3 Frontier Risk Assessment, PDF p. 3)

“Both categories” here are CBRN and model autonomy, which were newly evaluated for computer use. Persuasion medium and cyber low are explicitly inherited from GPT-4o, not newly evaluated Operator results.

### Q06 Safeguards tied to determination: ◐ partly

> “we implemented safeguards across the whole deployment context: model training, system-level checks, product design choices, and ongoing policy enforcement.” (§4 Risk Mitigation, PDF p. 5)

The card states deployment safeguards tied to its task, mistake and prompt-injection risk classes, without tying them to the framework category determination.

_Searched:_ §3.3 and §§4–4.7; terms: “safeguards”, “mitigations”, “Low”, “determination”, “framework”.

### Q07 Chemical and biological: ● stated

> “The two evaluations in our framework that computer-use could plausibly impact are biorisk tooling for CBRN and autonomous replication for model autonomy.” (§3.3 Frontier Risk Assessment, PDF p. 3)

> “found the pre-mitigation Operator model to be “Low” risk in both categories” (§3.3 Frontier Risk Assessment, PDF p. 3)

The next sentence says these evaluations were adapted for computer use and found the pre-mitigation model low risk in both. Policy-level risk classification is quoted in Q05.

### Q08 Cyber: ○ not-found

No new Operator offensive-cyber evaluation was found. The inherited GPT-4o category is recorded in Q05’s note.

_Searched:_ Whole card, particularly §3.3 and §§4–4.7; terms: “cybersecurity”, “cyber”, “offensive”, “evaluation”, “inherits”.

- Set aside: §3.3, PDF p. 3: The cyber low-risk category is inherited from GPT-4o; it is not a report of offensive-cyber evaluation run on Operator.

### Q09 Autonomy and AI R&D: ● stated

> “Operator is qualified as a "Low" risk level in line with GPT-4o as detailed in OpenAI’s Preparedness Framework” (§3.3.2 Model autonomy, PDF p. 4)

The card reports autonomous-replication/resource-acquisition evaluation and a low-risk conclusion. No technical task contents or performance figures are recorded.

### Q10 Persuasion: ○ not-found

No passage meeting the criterion was found in the recorded search.

_Searched:_ Whole card, particularly §3.3 and policy/mitigation sections; terms: “persuasion”, “persuasive”, “manipulation”, “social engineering”, “deception”.

- Set aside: §3.3, PDF p. 3: The persuasion medium-risk category is inherited from GPT-4o, rather than established by a reported Operator evaluation.
- Set aside: §4.1, PDF p. 6: Policy prohibitions on deception and manipulation do not report a persuasion evaluation.

### Q11 Alignment and deception: ○ not-found

No passage meeting the criterion was found in the recorded search.

_Searched:_ Whole card, including §§3.3, 4.1–4.7 and 5; terms: “deception”, “scheming”, “sabotage”, “reward hacking”, “misalignment”, “oversight”.

- Set aside: §4.2, PDF pp. 8–9: Testing model mistakes on user tasks measures errors, not deception or sabotage of oversight.
- Set aside: §4.1, PDF pp. 6–7: Refusal tests for harmful user requests do not evaluate the model’s own deception.
- Set aside: §4.6, PDF pp. 10–12: Prompt-injection testing concerns compliance with adversarial website instructions, rather than the model pursuing covert goals.

### Q12 Red-teaming: ● stated

> “OpenAI engaged a cohort of vetted external red teamers located across twenty countries and fluent in two dozen languages” (§3.2 Red Teaming, PDF p. 2)

The card describes external testing of capabilities and safeguards, preceded by an internal Safety, Security and Product exercise.

### Q13 External testers: ● stated

> “Red Teaming Organizations ScaleAI, Lysios LLC” (§6 Acknowledgements, PDF p. 15)

The card names the two external organisations in its red-teaming acknowledgements.

### Q14 Government institute: ○ not-found

No passage meeting the criterion was found in the recorded search.

_Searched:_ Whole card, including §§3.2–3.3, §4.7 and acknowledgements; terms: “government”, “institute”, “AISI”, “CAISI”, “NIST”, “pre-deployment access”.

### Q15 Release decision: ◐ partly

> “Accordingly, Operator is initially being deployed as a research preview to a limited group of users” (§3.2 Red Teaming, PDF p. 3)

The deployment statement follows the red-teaming findings and additional mitigations (“Accordingly”). It meets 6a’s assessment-followed-by-release case, without describing a decision or naming its maker. Availability alone and the preparation statement in §4 are set aside under 13a.

_Searched:_ §§3.1–3.3, §4 opening, §4.7 and §5.2; whole-card decision search; terms: “decision”, “decided”, “deploy”, “release”, “accordingly”, “deemed”.

- Set aside: §4, PDF p. 5: “We prepared Operator for deployment” describes preparation, not a release decision.
- Set aside: §4.4, PDF p. 10: The stated decision to refuse high-risk tasks is a safeguard decision, not a deployment decision.

### Q16 Stated limits: ● stated

> “their findings may not fully capture the worst-case real-world risks” (§3.2 Red Teaming, PDF p. 3)

The card ties this limitation to the constraint that external testers avoid causing real-world harm.

## xAI: Grok-1 (2023), held

**Held from admission.** Maintainer decision of 2026-11-05: read only from an archive capture, and none of its sampled cells was cross-family checked because web.archive.org refused the checker. Admitted with a later pack once a reader outside the Codex family can open the capture.

- Card: Grok-1 model card (model card), https://web.archive.org/web/20231105060613id_/https://x.ai/model-card/
- Framework edition in the dataset: none identified. Pre-framework historical expression, available by the archive capture of 2023-11-05.

### Q01 Card date: ○ not-found

The archived card prints no issue or revision date. Its wording is available by the 2023-11-05 capture; that capture date is not a printed card date.

_Searched:_ Whole archived card, including title, Model details, Evaluation and footer; terms: “date”, “published”, “updated”, “2023”, “Oct”, “Nov”.

- Set aside: Model details: Oct 2023 dates the model release, not the card.
- Set aside: Footer: The copyright year is not a card publication date.

### Q02 Release date: ● stated

> “is released in Oct 2023.” (Model details, archive capture 2023-11-05)

The historical card states a month-precision model release date. The separately retrieved live page says Nov 2023; the two expressions are not combined.

### Q03 Framework cited: – not-applicable

The copy read is the capture of 2023-11-05, before xAI’s 2025 framework editions. This pre-framework expression cannot state a determination under a framework not yet issued.

### Q04 Link to framework: – not-applicable

The copy read is the capture of 2023-11-05, before xAI’s 2025 framework editions. This pre-framework expression cannot state a determination under a framework not yet issued.

### Q05 Framework determination: – not-applicable

The copy read is the capture of 2023-11-05, before xAI’s 2025 framework editions. This pre-framework expression cannot state a determination under a framework not yet issued.

### Q06 Safeguards tied to determination: ○ not-found

No passage meeting the criterion was found in the recorded search.

_Searched:_ Whole archived card, particularly Model details and Limitations; terms: “safeguard”, “mitigation”, “safety”, “filter”, “refusal”, “review”, “human feedback”.

- Set aside: Limitations: Human review is recommended to users, rather than reported as an applied safeguard.
- Set aside: Model details: Human-feedback fine-tuning is described without identifying a safety mitigation.

### Q07 Chemical and biological: ○ not-found

No passage meeting the criterion was found in the recorded search.

_Searched:_ Whole archived card, including Evaluation; terms: “chemical”, “biological”, “CBRN”, “weapon”, “nuclear”.

### Q08 Cyber: ○ not-found

No passage meeting the criterion was found in the recorded search.

_Searched:_ Whole archived card, including Evaluation; terms: “cyber”, “offensive”, “security”, “attack”.

### Q09 Autonomy and AI R&D: ○ not-found

No passage meeting the criterion was found in the recorded search.

_Searched:_ Whole archived card, including Evaluation and Limitations; terms: “autonomy”, “autonomous”, “self-replication”, “self-improvement”, “R&D”, “research”.

- Set aside: Intended uses: Coding assistance is listed as an intended use, not as an autonomy or AI R&D risk evaluation.

### Q10 Persuasion: ○ not-found

No passage meeting the criterion was found in the recorded search.

_Searched:_ Whole archived card, including Evaluation; terms: “persuasion”, “persuasive”, “manipulation”, “social engineering”.

### Q11 Alignment and deception: ○ not-found

No passage meeting the criterion was found in the recorded search.

_Searched:_ Whole archived card, including Evaluation and Limitations; terms: “deception”, “scheming”, “sabotage”, “alignment”, “reward hacking”.

- Set aside: Limitations: Hallucination is a product limitation, rather than an evaluation of the model’s own deception.

### Q12 Red-teaming: ○ not-found

No passage meeting the criterion was found in the recorded search.

_Searched:_ Whole archived card, particularly Evaluation; terms: “red team”, “red-team”, “adversarial”, “testing”.

- Set aside: Evaluation: Adversarial testing with early alpha testers is reported, without describing it as red-teaming as Q12 requires.

### Q13 External testers: ◐ partly

> “engaged with early alpha testers to evaluate an version of Grok-1 including adversarial testing.” (Evaluation, archive capture 2023-11-05)

The card describes early alpha testers, without naming an external organisation. The original grammatical form is retained.

_Searched:_ Whole archived card, particularly Evaluation; terms: “testers”, “external”, “third-party”, “organization”, “organisation”.

### Q14 Government institute: ○ not-found

No passage meeting the criterion was found in the recorded search.

_Searched:_ Whole archived card; terms: “government”, “institute”, “AISI”, “NIST”, “pre-deployment”, “access”.

### Q15 Release decision: ○ not-found

No passage meeting the criterion was found in the recorded search.

_Searched:_ Whole archived card, particularly Model details and Evaluation; terms: “decision”, “decided”, “chose”, “release”, “deploy”, “acceptable”.

- Set aside: Model details: The model-release statement supplies availability, without a described decision under 13a.
- Set aside: Evaluation: Expansion of early access to closed beta is a release-form statement, without describing a release decision.

### Q16 Stated limits: ○ not-found

No passage meeting the criterion was found in the recorded search.

_Searched:_ Whole archived card, particularly Evaluation and Limitations; terms: “limitation”, “uncertain”, “gap”, “evaluation”, “underestimate”.

- Set aside: Limitations: Human-review, knowledge-cutoff and hallucination warnings concern the model as a product, rather than limitations of its evaluations.

## xAI: Grok 4.20 (2026)

- Card: Grok 4.20 System Card (system card), https://data.x.ai/2026-04-07-grok-4-20-model-card.pdf
- Framework edition in the dataset: none identified. FAIF named in text; [xAI, 2025] bibliography says RMF, without an edition-specific address. The edition remains unidentified.

### Q01 Card date: ● stated

> “April 7, 2026” (Title and date, PDF p. 1)

The card prints a day-precision date, without a separate revision date in the copy read.

### Q02 Release date: ◐ partly

> “As of writing, Grok 4.20 is publicly available through our consumer web and mobile apps.” (§1.3 Release process, PDF p. 2)

The card gives release form and relative timing, without a calendar model-release date.

_Searched:_ §§1.1–1.3 and whole-card date/availability search; terms: “available”, “release”, “launch”, “April”, “date”.

### Q03 Framework cited: ◐ partly

> “our Frontier Artificial Intelligence Framework (FAIF) [xAI, 2025]” (§1 Introduction, PDF p. 1)

The text names FAIF, but its bibliography labels [xAI, 2025] “xai risk management framework” without an edition-specific date or address. Because the names differ and the year fits multiple 2025 documents, no edition is inferred.

_Searched:_ §1, bibliography and all PDF link annotations; terms: “FAIF”, “Frontier Artificial Intelligence Framework”, “risk management”, “2025”, “version”.

- Set aside: Bibliography, PDF p. 8: The year 2025 with the RMF label does not distinguish the August RMF from December FAIF.

### Q04 Link to framework: ● stated

> “xAI. xai risk management framework, 2025.” (Bibliography, PDF p. 8)

The introduction points to this bibliographic entry as its framework reference. It provides no URL and uses the RMF title rather than the introduction’s FAIF name.

### Q05 Framework determination: ◐ partly

> “We release Grok 4.20 with safeguards appropriate for its capability threshold, such as refusal training.” (§1.3 Release process, PDF p. 2)

The card names its framework (§1) and refers to the model’s “capability threshold” without stating which threshold or outcome in the framework’s categories: a determination referred to without its outcome. The conclusions on cybersecurity and manipulation risk (§§4.2.2–4.3.2) are stated as risk views, not in the framework’s categories, and no chemical or biological outcome category is given.

_Cross-family check (item 38):_ material disagreement, decided: the checker read partly (blind), because §1.3 refers to the model’s capability threshold under the framework the card names without stating which, the criterion’s case of a determination made without stating its outcome. The pack had read not found. The maintainer decided for partly (decision a, 2026-11-05).

_Searched:_ Whole card, especially §§1.3, 3.3 and 4.1–4.3 and bibliography; terms: “threshold”, “capability threshold”, “level”, “category”, “FAIF”, “risk”, “determination”.

- Set aside: §§4.2.2–4.3.2, PDF pp. 6–7: Conclusions about cybersecurity and manipulation risks do not state outcomes in the framework’s own categories.

### Q06 Safeguards tied to determination: ◐ partly

> “We release Grok 4.20 with safeguards appropriate for its capability threshold, such as refusal training.” (§1.3 Release process, PDF p. 2)

The card names refusal training, but does not identify a reached/not-reached framework threshold or a determination to which it is tied.

_Searched:_ §1.3, §§2.1–2.3, §3.1 and §4.1.2; terms: “safeguards”, “threshold”, “refusal training”, “filter”.

### Q07 Chemical and biological: ◐ partly

> “We assess Grok 4.20’s dual-use capabilities, i.e., its ability to enable harm.” (§4 Dual-Use Capability Assessment, PDF p. 5)

§§4–4.1 report chemical and biological evaluations and benchmark results, without a domain outcome category or threshold determination. Technical benchmark contents and scores are not recorded.

_Searched:_ §4 introduction and §§4.1–4.1.2; terms: “CBRN”, “chemical”, “biological”, “threshold”, “risk”, “Results”.

### Q08 Cyber: ● stated

> “we do not believe that it substantially increases cybersecurity risk.” (§4.2.2 Results, PDF p. 6)

The card states this conclusion after its offensive-cyber capability evaluation. It is not a framework category determination.

### Q09 Autonomy and AI R&D: ○ not-found

No passage meeting the criterion was found in the recorded search.

_Searched:_ Whole card, particularly §§3.2–3.3 and §4; terms: “autonomy”, “autonomous”, “self-replication”, “self-improvement”, “AI R&D”, “self-modify”.

- Set aside: §3.3, PDF p. 5: Open-ended introspective statements about self-modification or propagation are not capability evaluations of autonomy.
- Set aside: §4.2, PDF p. 6: Agentic cyber evaluation does not independently establish self-replication, self-improvement or AI R&D evaluation.

### Q10 Persuasion: ● stated

> “we do not believe that it poses significant risks due to advanced persuasion capabilities.” (§4.3.2 Results, PDF p. 7)

The card gives this conclusion for a manipulation benchmark with another model as defender. It does not report persuasion effects on human participants.

### Q11 Alignment and deception: ● stated

> “Grok 4.20 occasionally acts against operator interests when given extensive affordances and confronted with evidence of egregious harm” (§3.3 Results, PDF p. 5)

The card reports this conditional sabotage-audit finding. It is not a claim about the frequency of such behaviour in ordinary use.

### Q12 Red-teaming: ● stated

> “testing, including coverage testing and red-teaming of the refusal boundary. Testing included a variety of domains, with a focus on catastrophic risk.” (§2.2 Evaluations > Third-party assessment, PDF p. 2)

The card reports third-party red-teaming of an early checkpoint, scoped to the refusal boundary and catastrophic risk.

### Q13 External testers: ◐ partly

> “we provided third-party evaluators access to an early snapshot of Grok 4.20 for testing of our refusal policy.” (§1.3 Release process, PDF p. 2)

The external evaluators are described without organisation names; the snapshot is early, rather than necessarily the final deployed model.

_Searched:_ §1.3, §§2.2 and 3.2 and bibliography; terms: “third-party”, “external”, “evaluators”, “testing”.

### Q14 Government institute: ○ not-found

No passage meeting the criterion was found in the recorded search.

_Searched:_ Whole card, including release process, third-party assessment, alignment audit and bibliography; terms: “government”, “institute”, “AISI”, “CAISI”, “NIST”, “pre-deployment access”.

### Q15 Release decision: ○ not-found

No passage meeting the criterion was found in the recorded search.

_Searched:_ Whole card, especially §1.3 Release process and §§4.1–4.3 results; terms: “decision”, “decided”, “chose”, “acceptable”, “determined”, “release”, “deploy”.

- Set aside: §1.3, PDF p. 2: “We release” with appropriate safeguards and availability as of writing do not expressly describe a decision or say release follows from an assessment under the partly criterion. Decisions 6a and 13a do not count availability or preparation alone.

### Q16 Stated limits: ● stated

> “However, this does not rule out unverbalized awareness.” (§3.3 Results, PDF p. 5)

The stated limitation concerns the preceding evaluation-awareness result.

## Inventory of cards located

The eight cards selected for pack 3. The full inherited inventory and adjudicated population remain in research/model-cards-2/; they were not re-inventoried here.

### Group anthropic

_Searched:_ Pack-3 selection inherited from research/model-cards-2/population.md (adjudicated 2026-11-04). These two cards retrieved fresh by direct HTTP on 2026-11-05; no repeat of the full developer inventory.

| Developer | Model                           | Card                                                                                                                       | Kind        | Card date                     | Retrieved | Compared | Note                                                                                                 |
| --------- | ------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | ----------- | ----------------------------- | --------- | -------- | ---------------------------------------------------------------------------------------------------- |
| Anthropic | Claude 3.7 Sonnet               | [Claude 3.7 Sonnet System Card](https://www-cdn.anthropic.com/9ff93dfa8f445c932415d335c88852ef47f1201e.pdf)                | system card | unknown                       | yes       | yes      | Pack 3 in the inherited population order; earliest located 2025-02 (index month)                     |
| Anthropic | Claude Opus 4 & Claude Sonnet 4 | [System Card: Claude Opus 4 & Claude Sonnet 4](https://www-cdn.anthropic.com/07b2a3f9902ee19fe39a36ca638e5ae987bc64dd.pdf) | system card | 2025-05 (printed cover month) | yes       | yes      | Pack 3 in the inherited population order; earliest located 2025-05 (printed cover month, “May 2025”) |

### Group google

_Searched:_ Pack-3 place inherited from the adjudicated population in research/model-cards-2/population.md. Live page and May 2024 archive copy retrieved fresh on 2026-11-05. No full inventory repeated.

| Developer       | Model     | Card                                                                          | Kind       | Card date                                                                         | Retrieved | Compared | Note                                                                                                      |
| --------------- | --------- | ----------------------------------------------------------------------------- | ---------- | --------------------------------------------------------------------------------- | --------- | -------- | --------------------------------------------------------------------------------------------------------- |
| Google DeepMind | PaliGemma | [PaliGemma model card](https://ai.google.dev/gemma/docs/paligemma/model-card) | model card | 2024-05-13 (revision printed in the 2024-05-15 capture); live revision 2025-02-25 | yes       | yes      | Latest pre-framework row under pack-2 P2; available by 2024-05-15, not a proved initial publication date. |

### Group meta

_Searched:_ Pack-3 place inherited from research/model-cards-2/population.md. Report freshly retrieved from Meta on 2026-11-05; full developer inventory not repeated.

| Developer | Model          | Card                                                                                                 | Kind          | Card date                        | Retrieved | Compared | Note                                         |
| --------- | -------------- | ---------------------------------------------------------------------------------------------------- | ------------- | -------------------------------- | --------- | -------- | -------------------------------------------- |
| Meta      | Muse Spark 1.1 | [Muse Spark 1.1 Evaluation Report](https://research.meta.ai/static/muse-spark-1-1-evaluation-report) | safety report | 2026-07-09 (printed report date) | yes       | yes      | Pack 3 under the inherited population order. |

### Group openai

_Searched:_ Pack-3 places inherited from research/model-cards-2/population.md; both PDFs retrieved fresh by sequential direct HTTP on 2026-11-05. Full inventory not repeated.

| Developer | Model                  | Card                                                                                                 | Kind        | Card date                                                   | Retrieved | Compared | Note                                                                        |
| --------- | ---------------------- | ---------------------------------------------------------------------------------------------------- | ----------- | ----------------------------------------------------------- | --------- | -------- | --------------------------------------------------------------------------- |
| OpenAI    | o1-preview and o1-mini | [OpenAI o1 System Card (o1-preview and o1-mini)](https://cdn.openai.com/o1-system-card-20240917.pdf) | system card | 2024-09-12 (printed cover)                                  | yes       | yes      | Pack 3 in inherited population order; later expression dates kept separate. |
| OpenAI    | Operator               | [Operator System Card](https://cdn.openai.com/operator_system_card.pdf)                              | system card | 2025-01-23 (printed cover); 2025-03-11 (dated API addition) | yes       | yes      | Pack 3 in inherited population order; later expression dates kept separate. |

### Group xai

_Searched:_ Pack-3 places inherited from research/model-cards-2/population.md; Grok-1 live and archived expressions and Grok 4.20 retrieved fresh by sequential direct HTTP on 2026-11-05. Full inventory not repeated.

| Developer | Model     | Card                                                                           | Kind        | Card date                  | Retrieved | Compared | Note                                                                           |
| --------- | --------- | ------------------------------------------------------------------------------ | ----------- | -------------------------- | --------- | -------- | ------------------------------------------------------------------------------ |
| xAI       | Grok-1    | [Grok-1 model card](https://x.ai/model-card/)                                  | model card  | unknown                    | yes       | yes      | Pre-framework row, available by the 2023-11-05 capture. No printed issue date. |
| xAI       | Grok 4.20 | [Grok 4.20 System Card](https://data.x.ai/2026-04-07-grok-4-20-model-card.pdf) | system card | 2026-04-07 (printed cover) | yes       | yes      | Pack 3 in inherited population order.                                          |

## Sources

| Key                         | Card                                           | Address                                                                                             | HTTP | SHA-256             | Retrieved                | Words | Archive                                                                                                                                                                                                                                              |
| --------------------------- | ---------------------------------------------- | --------------------------------------------------------------------------------------------------- | ---- | ------------------- | ------------------------ | ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| anthropic-claude-3-7-sonnet | Claude 3.7 Sonnet System Card                  | https://www-cdn.anthropic.com/9ff93dfa8f445c932415d335c88852ef47f1201e.pdf                          | 200  | `82947a46fc2d1b9a…` | 2026-11-05T05:35:45.737Z | 17468 | Not retrieved in this preparation; earlier population dating is inherited from pack 2. Cross-family archive check requested.                                                                                                                         |
| anthropic-claude-4          | System Card: Claude Opus 4 & Claude Sonnet 4   | https://www-cdn.anthropic.com/07b2a3f9902ee19fe39a36ca638e5ae987bc64dd.pdf                          | 200  | `c358464289e24283…` | 2026-11-05T05:35:55.915Z | 33700 | Not retrieved in this preparation; earlier population dating is inherited from pack 2. Cross-family archive check requested.                                                                                                                         |
| google-paligemma            | PaliGemma model card                           | https://web.archive.org/web/20240515003852id_/https://ai.google.dev/gemma/docs/paligemma/model-card | 200  | `60e19b742dbd568f…` | 2026-11-05T05:42:06.984Z | 1854  | https://web.archive.org/web/20240515003852id_/https://ai.google.dev/gemma/docs/paligemma/model-card                                                                                                                                                  |
| meta-muse-spark-1-1         | Muse Spark 1.1 Evaluation Report               | https://research.meta.ai/static/muse-spark-1-1-evaluation-report                                    | 200  | `cd25634e0c8a3960…` | 2026-11-05T05:45:33.859Z | 41087 | No capture retrieved in preparation; fresh cross-family capture check requested.                                                                                                                                                                     |
| openai-o1-september         | OpenAI o1 System Card (o1-preview and o1-mini) | https://cdn.openai.com/o1-system-card-20240917.pdf                                                  | 200  | `badc23682ab6717e…` | 2026-11-05T05:50:06.680Z | 15156 | No capture retrieved in preparation; cross-family archive check requested.                                                                                                                                                                           |
| openai-operator             | Operator System Card                           | https://cdn.openai.com/operator_system_card.pdf                                                     | 200  | `72c5d16df18fe90a…` | 2026-11-05T05:50:15.518Z | 5290  | Capture of 2025-01-23 (the printed card date, before the March 11, 2025 update) located through the archive.org availability API in the cross-family check of 2026-11-05; not retrieved and not hashed, because web.archive.org refused the checker. |
| xai-grok-1                  | Grok-1 model card                              | https://web.archive.org/web/20231105060613id_/https://x.ai/model-card/                              | 200  | `346b2740775e02a6…` | 2026-11-05T05:51:32.103Z | 249   | https://web.archive.org/web/20231105060613id_/https://x.ai/model-card/                                                                                                                                                                               |
| xai-grok-4-20               | Grok 4.20 System Card                          | https://data.x.ai/2026-04-07-grok-4-20-model-card.pdf                                               | 200  | `ea72c27a6b04949d…` | 2026-11-05T05:51:40.807Z | 3346  | No capture retrieved in preparation; cross-family archive check requested.                                                                                                                                                                           |
