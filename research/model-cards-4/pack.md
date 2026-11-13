# Model cards compared, pack 4: what frontier developers’ cards disclose

Generated from `pack.json` by `node research/model-cards-4/tools.mjs render`; do not edit by hand. Candidate research pack outside application data. Prepared by Claude on 2026-11-06, with a fresh-context same-family audit of a seeded sample (audit.md). The blind cross-family check by Codex (GPT family) covered packs 4 and 5 together (research/model-cards-4/cross-family-check-2026-11-07.md) and was adjudicated on 2026-11-09 (research/model-cards-4/adjudication/apply-2026-11-09.mjs); one cell is held for the maintainer (†). Not editorially accepted; no human review.

**Question.** What does each frontier developer's published system card, model card or safety report disclose, on the same questions for every card?

**Rows.** Decision 1a: every card that cites the developer’s frontier framework or states a determination under it, plus, for each developer, the latest card before its first framework edition. This pack drafts the eight cards of pack 4 in research/model-cards-2/population.md’s adjudicated order (packs 4 and 5 follow pack 3); completed packs are not repeated here.

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
| Anthropic: Claude Opus 4.1 (2025)             |  ◐  |  ◐  |  ◐  |  ◐  |  ●  |  ●  |  ●  |  ◐  |  ●  |  ○  |  ●  |  ○  |  ○  |  ○  |  ◐  |  ●  |
| Google DeepMind: Gemini 2.5 Pro (2025)        |  ◐  |  ◐  |  ●  |  ●  |  ●  |  ◐  |  ●  |  ●  |  ●  |  ○  |  ●  |  ●  |  ◐  |  ○  |  ●  |  ●  |
| Google DeepMind: Gemini 2.5 Flash-Lite (2025) |  ●  |  ●  |  ●  |  ●  |  ◐  |  ◐  |  ○  |  ○  |  ○  |  ○  |  ○  |  ●  |  ○  |  ○  |  ○  |  ●  |
| Meta: Muse Glimmer (2026)                     |  ○  |  ●  |  ◐  |  ◐  |  ●  |  ◐  |  ●  |  ○  |  ○  |  ○  |  ○  |  ○  |  ○  |  ○  |  ◐  |  ●  |
| Meta: Muse Wonder and Muse Wonder Full (2026) |  ◐  |  ●  |  ◐  |  ●  |  ●  |  ●  |  ●  |  ●  |  ○  |  ○  |  ●  |  ●  |  ●  |  ○  |  ●  |  ●  |
| OpenAI: o3-mini (2025)                        |  ●  |  ◐  |  ●  |  ●  |  ●  |  ●  |  ●  |  ●  |  ●  |  ●  |  ◐  |  ●  |  ●  |  ○  |  ◐  |  ●  |
| OpenAI: Deep research (2025)                  |  ●  |  ◐  |  ●  |  ●  |  ●  |  ●  |  ●  |  ●  |  ●  |  ●  |  ◐  |  ●  |  ●  |  ○  |  ◐  |  ●  |
| xAI: Grok 4.6 (2026)                          |  ●  |  ◐  |  ●  |  ●  |  ◐  |  ◐  |  ●  |  ◐  | ◐†  |  ○  |  ◐  |  ○  |  ●  |  ○  |  ○  |  ○  |

## Anthropic: Claude Opus 4.1 (2025)

- Card: System Card Addendum: Claude Opus 4.1 (addendum), https://www-cdn.anthropic.com/9fa30625273bafdf5af82c93719d7ca606485a16.pdf
- Framework edition in the dataset: none identified. The card names Anthropic’s Responsible Scaling Policy and quotes its Section 3.1, without a version, date or link to the policy. Its PDF link annotations point to the Claude 4 system card (two files), not to a policy file. No edition is recorded.

### Q01 Card date: ◐ partly

> “System Card Addendum: Claude Opus 4.1 August 2025” (Cover, PDF p. 1)

> “Changelog September 15, 2025” (Changelog, PDF p. 2)

The cover carries a month only. The changelog gives a revision dated September 15, 2025 (an update to §6.3 acknowledging partners in CBRN evaluation development).

### Q02 Release date: ◐ partly

> “This system card addendum accompanies the release of Claude Opus 4.1” (§1 Introduction, PDF p. 4)

The card ties itself to the release without a release date or form. The cover’s “August 2025” is the card’s date (Q01).

_Searched:_ §1 Introduction; whole-card search; terms: “release”, “available”, “API”, “launch”, “August”.

### Q03 Framework cited: ◐ partly

> “Claude Opus 4.1 is deployed under the AI Safety Level 3 (ASL-3) Standard under Anthropic’s Responsible Scaling Policy (RSP)” (§1.1 Responsible Scaling Policy compliance, PDF p. 4)

The card names the RSP without a version, date or link to a policy file. As context only: the dataset records RSP v2.2 (effective 2025-05-14) as the edition in force before the card’s month; the card does not say so.

_Searched:_ §1.1, §6, link annotations of every page; terms: “Responsible Scaling Policy”, “RSP”, “version”, “v2”, “policy”.

- Set aside: Link annotations, PDF pp. 4, 8, 10, 18, 23: They point to the Claude 4 system card (two files), not to a policy file.

### Q04 Link to framework: ◐ partly

> “As stated in Section 3.1 of our RSP” (§1.1, PDF p. 4)

The card refers to the RSP as a document and quotes one of its sections, without an address or bibliographic reference to it.

_Searched:_ §1.1, §6, link annotations of every page; terms: “RSP”, “Responsible Scaling Policy”, “http”, “anthropic.com”.

- Set aside: Link annotations, PDF pp. 4, 8, 10, 18, 23: They point to the Claude 4 system card, not to the policy.

### Q05 Framework determination: ● stated

> “the model is deployed under the ASL-3 Standard as a precautionary measure, and its capabilities remain below ASL-4 thresholds in all evaluated domains.” (§6 Responsible Scaling Policy (RSP) evaluations, PDF p. 18)

The card applies the ASL-3 Standard as a precaution carried over from Claude Opus 4 (§1.1) and states that the model stays below the ASL-4 thresholds. It also states that the model does not meet the RSP’s criteria for a further assessment, so that new RSP evaluations were not required (§1.1).

### Q06 Safeguards tied to determination: ● stated

> “RSP safeguards applied to Claude Opus 4.1: ASL-3 Standard” (§6, PDF p. 18)

The card names the framework’s ASL-3 Standard as the safeguards applied, in line with the determination in Q05, and refers to the Claude 4 system card for that decision (§1.1). It describes no ASL-3 measure itself. A stated safeguard is the developer’s account.

### Q07 Chemical and biological: ● stated

> “Claude Opus 4.1 showed comparable performance to Claude Opus 4 while remaining substantially below concerning thresholds.” (§6.3.1 Biological risk results summary, PDF p. 19)

The card reports automated biological evaluations (ASL-4 rule-out and additional ASL-3 evaluations) under its CBRN section; no separate chemical, radiological or nuclear results are given. It states that no human uplift trials or expert red-teaming were run for this release (§6.1).

### Q08 Cyber: ◐ partly

> “Claude Opus 4.1 showed incremental improvements on non-saturated challenges, consistent with enhanced reasoning and coding capabilities.” (§6.5.1 Cyber results summary, PDF p. 23)

The card reports a subset of cyber challenge evaluations and their results, and states that the RSP sets no formal cyber threshold; the cyber section states no conclusion in threshold or risk terms.

_Searched:_ §6.1, §6.2, §6.5; terms: “cyber”, “threshold”, “ASL-4”, “Cybench”.

- Set aside: §6 opening, PDF p. 18: “below ASL-4 thresholds in all evaluated domains” is a general summary; §6.5.1 says the RSP has no formal cyber threshold, so it is not read as a cyber conclusion.

### Q09 Autonomy and AI R&D: ● stated

> “It remained below critical thresholds in all non-saturated evals.” (§6.4.1 Autonomy results summary, PDF p. 22)

The card reports software engineering and AI research evaluations against its autonomy threat models; it did not run its second internal research suite or the internal model use survey for this release.

### Q10 Persuasion: ○ not-found

_Searched:_ Whole card (23 pages): Introduction and §1.1, §§2–6; terms: “persua”, “manipul”, “influence”, “opinion”.

- Set aside: §3.2, PDF p. 8: “manipulate” concerns prompt injection against the model, not persuasion of people by the model.

### Q11 Alignment and deception: ● stated

> “The alignment-related behaviors of the two models appeared to be very similar” (§4 Alignment and welfare assessments, PDF p. 10)

> “Claude Opus 4.1 has very similar reward hacking tendencies to Claude Opus 4.” (§5 Reward hacking, PDF p. 15)

The card reports an automated behavioural audit (including deception toward a simulated user and self-preservation), a blackmail evaluation and reward-hacking evaluations, each with a conclusion compared with Claude Opus 4.

### Q12 Red-teaming: ○ not-found

_Searched:_ Whole card (23 pages): Introduction and §1.1, §§2–6; terms: “red-team”, “red team”, “adversarial”, “jailbreak”.

- Set aside: §6.1 Evaluation approach, PDF p. 18: States that expert red-teaming sessions were not conducted for the RSP assessment; no red-teaming of this model is reported.

### Q13 External testers: ○ not-found

_Searched:_ Whole card (23 pages): Introduction and §1.1, §§2–6; changelog; terms: “external”, “third party”, “partner”, “developed by”.

- Set aside: §§6.3.1.1–6.3.1.2, PDF pp. 19–21: Faculty Science, SecureBio, Deloitte Consulting and Signature Science are named as having developed evaluations; the card does not say they tested this model.
- Set aside: §6.6 Third party assessments, PDF p. 23: Refers to third-party assessments of Claude Opus 4 and to collaboration with external partners in general, not to testers of Claude Opus 4.1.

### Q14 Government institute: ○ not-found

_Searched:_ Whole card (23 pages): Introduction and §1.1, §§2–6; terms: “government”, “AI Safety Institute”, “AISI”, “CAISI”, “pre-deployment”.

- Set aside: §6.6 Third party assessments, PDF p. 23: States that no new pre-deployment evaluations with external government partners were conducted for this release; no body is named.

### Q15 Release decision: ◐ partly

> “deployed under the AI Safety Level 3 (ASL-3) Standard under Anthropic’s Responsible Scaling Policy (RSP) as a precautionary measure. See the Claude 4 system card for more details on this decision.” (§1.1, PDF p. 4)

The decision the card refers to is the ASL-3 safeguards decision made for Claude Opus 4. The card describes no decision to release Claude Opus 4.1 and names no maker for one.

_Searched:_ §1, §1.1, §6, §6.7; terms: “decid”, “decision”, “release”, “deploy”.

### Q16 Stated limits: ● stated

> “a slight increase in indications that the model suspected that it was being evaluated—which is itself concerning, because this might reduce the validity of our assessments” (§4.1, PDF p. 12)

The card also states that the RSP assessment was automated only, without human uplift trials or expert red-teaming (§6.1), and that absolute audit scores should not be relied upon (Figure 4.1.A).

## Google DeepMind: Gemini 2.5 Pro (2025)

- Card: Gemini 2.5 Pro Model Card (model card), https://storage.googleapis.com/deepmind-media/Model-Cards/Gemini-2-5-Pro-Model-Card.pdf
- Framework edition in the dataset: `fsf-v2-0`. The card’s text states that the FSF was released in May 2024 and updated in February 2025 (PDF p. 10). FSF v2.0 (4 February 2025): the words “Frontier Safety Framework” carry link annotations to two addresses of the FSF 2.0 PDF (“Frontier Safety Framework 2.0 (1).pdf” and “Frontier Safety Framework 2.0.pdf”), both retrieved on 2026-11-06 with covers reading “4th February 2025 … Version 2.0” (identified by link annotation, maintainer decision 4a).

### Q01 Card date: ◐ partly

> “Model card updated June 27, 2025” (Cover, PDF p. 1)

> “Last updated: June 27, 2025” (Opening, PDF p. 2)

The card prints a revision date only. It covers three versions (Experimental 03-25, Preview 05-06 and GA); no first publication date is printed. The population dates the row by this revision date, the earliest located.

### Q02 Release date: ◐ partly

> “to reflect that Gemini 2.5 Pro’s deployment status is now “general availability.”” (Model Information, PDF p. 2)

The card states the release form (general availability) and names the earlier Experimental (03-25) and Preview (05-06) versions by their date codes, without a release date.

_Searched:_ Whole card (21 pages): Model Information, Evaluation, Ethics and Safety, Frontier Safety sections; terms: “release”, “available”, “launch”, “general availability”, “2025”.

- Set aside: Model Information, PDF p. 2: The version labels “03-25” and “05-06” are model identifiers; the card does not state them as release dates.

### Q03 Framework cited: ● stated

> “Google DeepMind released its Frontier Safety Framework (FSF) in May 2024 and updated it in February 2025.” (Frontier Safety Critical Capability Evaluations, PDF p. 10)

The card dates the edition it follows (updated February 2025), and its link annotations on the framework’s name target the FSF Version 2.0 file of 4 February 2025.

### Q04 Link to framework: ● stated

> “In addition, we perform testing following the guidelines in Google DeepMind’s Frontier Safety Framework (FSF)” (Evaluation Approach, PDF p. 8 (link annotation on the framework name))

The framework name links to the FSF 2.0 PDF (also on PDF p. 10).

### Q05 Framework determination: ● stated

> “Across all areas covered by the Frontier Safety Framework, Critical Capability Levels (CCLs) have not been reached.” (Table 1 caption, PDF p. 12)

The direct evaluation across all framework domains is of Gemini 2.5 Pro Experimental (03-25). For Preview (05-06) and GA, the card relies on those results and repeats a subset of evaluations: the Cyber Uplift Level 1 evaluations for Preview, and the “most essential” evaluations for GA, whose deceptive-alignment evaluations were not yet completed (PDF p. 11). The evaluations reached the alert threshold for Cyber Uplift Level 1, which is not the CCL (PDF pp. 10–11).

_Cross-family check (item 14):_ minor, applied: the note now says which variant the direct all-domain evaluation covers and how the Preview and GA evidence was added. Status agrees.

### Q06 Safeguards tied to determination: ◐ partly

> “Consistent with the Framework, we are putting in place a response plan, which includes testing models more frequently and accelerating mitigations.” (CCL Evaluation Results, PDF p. 11)

The card ties a response plan to the Cyber Uplift Level 1 alert threshold but names no safeguard in it. Its general mitigations list (PDF p. 10) is not tied to a determination.

_Searched:_ Whole card (21 pages): Model Information, Evaluation, Ethics and Safety, Frontier Safety sections; terms: “mitigation”, “safeguard”, “security”, “response plan”.

- Set aside: Risks and Mitigations, PDF p. 10: General mitigations across training and deployment, not tied to a framework determination.

### Q07 Chemical and biological: ● stated

> “It does not reach our alert thresholds for CBRN Uplift Level 1.” (CBRN, Update for Gemini 2.5 Pro GA, PDF p. 13)

The CBRN Uplift Level 1 CCL is stated as not reached (Table 1). Internal open-ended assessments do not cover chemical information risk; the card says its external testers include chemistry, without reporting their results.

### Q08 Cyber: ● stated

> “We find that the model does not reach the Cyber Uplift Level 1 CCL.” (Update for Gemini 2.5 Pro Preview (05-06), PDF p. 11)

The card states that the alert threshold for Cyber Uplift Level 1 was reached, so models may reach the CCL in the foreseeable future, and that Cyber Autonomy Level 1 is not reached.

### Q09 Autonomy and AI R&D: ● stated

> “CCL reached? No. Gemini 2.5 Pro Preview is still far from matching human performance on RE-Bench” (Machine Learning R&D Autonomy Level 1, PDF p. 17)

The card states that the Machine Learning R&D Autonomy Level 1 CCL is not reached and the Uplift Level 1 CCL is “likely” not reached, on an inability argument from RE-Bench (PDF p. 17).

### Q10 Persuasion: ○ not-found

_Searched:_ Whole card (21 pages): Model Information, Evaluation, Ethics and Safety, Frontier Safety sections; terms: “persua”, “manipul”, “influenc”.

### Q11 Alignment and deception: ● stated

> “The model does not perform competently enough on both stealth and situational awareness challenges.” (Deceptive Alignment, PDF p. 19)

The Instrumental Reasoning Level 1 and 2 CCLs are stated as not reached for the Experimental version; for the GA version the card says these evaluations were not completed (PDF p. 20).

### Q12 Red-teaming: ● stated

> “Human red teaming conducted by specialist teams across the policies and desiderata” (Evaluation Approach, PDF p. 7)

Scope: specialist teams, across safety policies and desiderata, alongside automated red teaming. No number of testers or period is given.

### Q13 External testers: ◐ partly

> “We perform CBRN evaluations internally and via third party external testers.” (CBRN, Overview, PDF p. 12)

External testers are described but not named; the card presents results from internal evaluations only. The external providers of benchmarks and challenges are not described as testers of the model.

_Cross-family check (item 67):_ minor, applied: “reports internal evaluations only” becomes “presents results from internal evaluations only”, since the card says external testers evaluated CBRN.

_Searched:_ Whole card (21 pages): Model Information, Evaluation, Ethics and Safety, Frontier Safety sections; terms: “external”, “third party”, “vendor”, “partner”.

- Set aside: Cybersecurity, PDF p. 15: Challenges from an external vendor are a benchmark source, not a tester of the model.

### Q14 Government institute: ○ not-found

_Cross-family check (item 68):_ minor, applied: the footnote naming the UK AI Safety Institute is recorded as set aside. Status agrees.

_Searched:_ Whole card (21 pages): Model Information, Evaluation, Ethics and Safety, Frontier Safety sections; terms: “government”, “AI Safety Institute”, “AISI”, “CAISI”.

- Set aside: Cybersecurity, Overview, footnote 8, PDF p. 15: Names the UK AI Safety Institute’s evaluation framework Inspect, with which the open-sourced CTF suite can be run; it does not say the institute tested or received the model.

### Q15 Release decision: ● stated

> “The RSC also reviewed data on the model’s performance via assurance evaluations and made release decisions.” (Evaluation Approach, PDF p. 8)

The card names Google DeepMind’s Responsibility and Safety Council, its internal governance body, as the maker of release decisions. The passage does not describe a particular decision for this model or date one.

### Q16 Stated limits: ● stated

> “represents a small subset of the tasks comprising the full AI R&D pipeline.” (Machine Learning R&D, PDF p. 17)

> “The evaluation results are for automated evaluations and not human evaluation or red teaming” (Training and Development Evaluation Results, PDF p. 8)

The card also states that the GA version’s deceptive-alignment evaluations were not completed (PDF p. 20).

## Google DeepMind: Gemini 2.5 Flash-Lite (2025)

- Card: Gemini 2.5 Flash-Lite - Model Card (model card), https://storage.googleapis.com/deepmind-media/Model-Cards/Gemini-2-5-Flash-Lite-Model-Card.pdf
- Framework edition in the dataset: `fsf-v2-0`. FSF v2.0 (4 February 2025): the words “Frontier Safety Framework” carry link annotations to two addresses of the FSF 2.0 PDF (“Frontier Safety Framework 2.0 (1).pdf” and “Frontier Safety Framework 2.0.pdf”), both retrieved on 2026-11-06 with covers reading “4th February 2025 … Version 2.0” (identified by link annotation, maintainer decision 4a).

### Q01 Card date: ● stated

> “Published: September 26, 2025” (Opening, PDF p. 2)

The copy read prints a publication date of 26 September 2025 (the cover reads “published/updated SEP 26, 2025”). The population dates the row 2025-07-22, from an Internet Archive capture of 2025-07-31 that prints “Published: July 22, 2025” (cross-family check of 2026-11-04); that capture was not retrieved here, so the cells describe the September expression.

### Q02 Release date: ● stated

> “As of September 25, 2025, there is a preview version offered alongside 2.5 Flash-Lite” (Description, PDF p. 2)

The dated availability concerns the Preview (09-2025) version. No release date of Gemini 2.5 Flash-Lite itself was found; the card’s methods mention the AI Studio API.

### Q03 Framework cited: ● stated

> “In addition, we perform testing following the guidelines in Google DeepMind’s Frontier Safety Framework (FSF).” (Evaluation Approach, PDF p. 7)

The text gives no edition; the link annotations on the framework name target the FSF Version 2.0 file of 4 February 2025 (maintainer decision 4a).

_Cross-family check (item 5):_ minor, applied: the quotation now runs through the framework’s full name. Status and edition agree.

### Q04 Link to framework: ● stated

> “In addition, we perform testing following the guidelines in Google DeepMind’s Frontier Safety” (Evaluation Approach, PDF p. 7 (link annotation on the framework name))

The framework name links to the FSF 2.0 PDF (also on PDF p. 8).

### Q05 Framework determination: ◐ partly

> “the Gemini 2.5 Pro model results give us confidence that Gemini 2.5 Flash-Lite is unlikely to reach critical capability levels” (Frontier Safety Assessment, PDF p. 8)

The card states an expectation for this model that rests on another model’s results: Gemini 2.5 Pro Preview was evaluated and reached no critical capability level, and, as Flash-Lite is less capable, Flash-Lite is unlikely to reach one. It reports no frontier safety evaluation of Flash-Lite and no outcome for it in the framework’s own categories.

_Cross-family check (item 6):_ material disagreement, applied: the checker reads partly (blind), because PDF p. 8 gives a proxy-based expectation for Flash-Lite and the no-CCL result is Gemini 2.5 Pro Preview’s. The pack had read stated, with the reliance in the note, as for Gemini 3 Flash in the first pack (open question 2). The preparer applies the checker’s reading; the admitted Gemini 3 Flash cell, which reads the same wording as stated, goes to the maintainer.

### Q06 Safeguards tied to determination: ◐ partly

> “Mitigations include, but are not limited to:” (Risks and Mitigations, PDF p. 9)

> “product-level mitigations such as safety filtering” (Risks and Mitigations, PDF p. 9)

The card lists mitigations across training and deployment (dataset filtering, conditional pre-training, fine-tuning, reinforcement learning, safety policies and product-level safety filtering) without tying any of them to the frontier safety assessment.

_Cross-family check (item 7):_ minor, applied: a named mitigation from the same list is quoted beside the list’s introduction. Status agrees.

_Searched:_ Whole card (9 pages): Model Information, Evaluation, Ethics and Safety, Frontier Safety Assessment, Risks and Mitigations; terms: “mitigation”, “safeguard”, “security”.

### Q07 Chemical and biological: ○ not-found

No chemical or biological evaluation of Gemini 2.5 Flash-Lite was found.

_Searched:_ Whole card (9 pages): Model Information, Evaluation, Ethics and Safety, Frontier Safety Assessment, Risks and Mitigations; terms: “CBRN”, “chemical”, “biolog”, “CCL”.

- Set aside: Frontier Safety Assessment, PDF p. 8: The card relies on the frontier safety evaluations reported for Gemini 2.5 Pro Preview and states no domain result for this model.

### Q08 Cyber: ○ not-found

No cyber evaluation of Gemini 2.5 Flash-Lite was found.

_Searched:_ Whole card (9 pages): Model Information, Evaluation, Ethics and Safety, Frontier Safety Assessment, Risks and Mitigations; terms: “cyber”, “CCL”, “alert threshold”.

- Set aside: Frontier Safety Assessment, PDF p. 8: The card relies on the frontier safety evaluations reported for Gemini 2.5 Pro Preview and states no domain result for this model.

### Q09 Autonomy and AI R&D: ○ not-found

No autonomy or machine learning R&D evaluation of Gemini 2.5 Flash-Lite was found.

_Searched:_ Whole card (9 pages): Model Information, Evaluation, Ethics and Safety, Frontier Safety Assessment, Risks and Mitigations; terms: “autonom”, “R&D”, “self-”, “CCL”.

- Set aside: Frontier Safety Assessment, PDF p. 8: The card relies on the frontier safety evaluations reported for Gemini 2.5 Pro Preview and states no domain result for this model.

### Q10 Persuasion: ○ not-found

_Searched:_ Whole card (9 pages): Model Information, Evaluation, Ethics and Safety, Frontier Safety Assessment, Risks and Mitigations; terms: “persua”, “manipul”, “influenc”.

### Q11 Alignment and deception: ○ not-found

No deceptive-alignment or misalignment evaluation of Gemini 2.5 Flash-Lite was found.

_Searched:_ Whole card (9 pages): Model Information, Evaluation, Ethics and Safety, Frontier Safety Assessment, Risks and Mitigations; terms: “deceptive”, “alignment”, “instrumental reasoning”, “stealth”, “situational awareness”.

- Set aside: Frontier Safety Assessment, PDF p. 8: The card relies on the frontier safety evaluations reported for Gemini 2.5 Pro Preview and states no domain result for this model.

### Q12 Red-teaming: ● stated

> “Human Red Teaming conducted by specialist teams across the policies and desiderata” (Evaluation Approach, PDF p. 6)

Scope: specialist teams, across safety policies and desiderata, alongside automated red teaming; the card also mentions expert red teamers. No number of testers or period is given.

### Q13 External testers: ○ not-found

_Searched:_ Whole card (9 pages): Model Information, Evaluation, Ethics and Safety, Frontier Safety Assessment, Risks and Mitigations; terms: “external”, “third party”, “independent”, “partner”.

- Set aside: Evaluation Approach, PDF p. 6: Assurance evaluators are described as independent of the model development team, not as external to Google.

### Q14 Government institute: ○ not-found

_Searched:_ Whole card (9 pages): Model Information, Evaluation, Ethics and Safety, Frontier Safety Assessment, Risks and Mitigations; terms: “government”, “AI Safety Institute”, “AISI”, “CAISI”.

### Q15 Release decision: ○ not-found

_Searched:_ Whole card (9 pages): Model Information, Evaluation, Ethics and Safety, Frontier Safety Assessment, Risks and Mitigations; terms: “release”, “decision”, “deploy”, “launch”, “RSC”.

- Set aside: Evaluation Approach, PDF p. 6: Ethics and safety reviews before release are stated, not a decision to release.
- Set aside: Assurance Evaluations Results, PDF p. 8: Assurance evaluations are said to guide decisions on model releases in general; no decision for this model and no maker are stated.

### Q16 Stated limits: ● stated

> “The evaluation results are for automated evaluations and not human evaluation or red teaming” (Training and Development Evaluation Results, PDF p. 7)

The card also states that its results are computed with revised evaluations not comparable with earlier cards.

## Meta: Muse Glimmer (2026)

- Card: Muse Glimmer Model Card (README.md, Hugging Face meta-models/Muse-Glimmer-30B, revision cec94fcf) (model card), https://huggingface.co/meta-models/Muse-Glimmer-30B/raw/cec94fcfd6512f2cfe708138c32533b346ea4f69/README.md
- Framework edition in the dataset: none identified. The card names Meta’s Advanced AI Scaling Framework (AAISF) without a version, date or address. As context only, the dataset records the Advanced AI Scaling Framework v2.0 (2026-04-08) as an edition published before the card; the card does not say so.

### Q01 Card date: ○ not-found

No date of the card itself was found; the date printed is the model’s release month (Q02). Under maintainer decision 8a, repository dates stay in the background record: the population cites repository creation on 2026-08-09, and the inventory notes that the README was last modified on 2026-10-22.

_Searched:_ Whole card (Hugging Face README, revision cec94fcf): front matter, overview, benchmarks, Trust and Safety, Preparedness, Train-Time Mitigations, Intended Use, Considerations and Limitations; terms: “date”, “updated”, “2026”, “version”.

- Set aside: Header: “Model Release Date: August 2026” is the release date (Q02), not a date of the card.

### Q02 Release date: ● stated

> “**Model Release Date:** August 2026” (Header)

> “All artifacts are released under Apache 2.0” (Released Artifacts)

The card gives the release month and the release form (artifacts under an open licence, for local deployment).

### Q03 Framework cited: ◐ partly

> “Muse Glimmer does not fall under the definition of “Frontier AI” in Meta’s Advanced AI Scaling Framework (AAISF), since it is generally less capable than Muse Spark.” (Preparedness)

The card names the framework without a version, date or address. As context only: the dataset records the Advanced AI Scaling Framework v2.0 (2026-04-08) as published before the card.

### Q04 Link to framework: ◐ partly

> “Muse Glimmer does not fall under the definition of “Frontier AI” in Meta’s Advanced AI Scaling Framework (AAISF), since it is generally less capable than Muse Spark.” (Preparedness)

The card refers to the framework as a document containing a definition, without an address or reference.

_Searched:_ Whole card (Hugging Face README, revision cec94fcf): front matter, overview, benchmarks, Trust and Safety, Preparedness, Train-Time Mitigations, Intended Use, Considerations and Limitations; terms: “Scaling Framework”, “AAISF”, “http”, “ai.meta.com”.

### Q05 Framework determination: ● stated

> “Muse Glimmer does not fall under the definition of “Frontier AI” in Meta’s Advanced AI Scaling Framework (AAISF), since it is generally less capable than Muse Spark.” (Preparedness)

> “Chem/Bio: Moderate or lower risk;” (Preparedness)

The card states that the model is outside the framework’s definition of frontier AI and, “as a matter of prudence”, gives risk designations of moderate or lower in three domains; the cyber and loss-of-control designations are inferred from Muse Spark 1.0.

### Q06 Safeguards tied to determination: ◐ partly

> “Safety SFT:** Curated examples demonstrating correct safety behavior” (Train-Time Mitigations)

The card lists train-time mitigations (safety fine-tuning, safety reinforcement learning, information-flow training) and recommends system guardrails, without tying them to the risk designations.

_Searched:_ Whole card (Hugging Face README, revision cec94fcf): front matter, overview, benchmarks, Trust and Safety, Preparedness, Train-Time Mitigations, Intended Use, Considerations and Limitations; terms: “mitigation”, “safeguard”, “guardrail”.

### Q07 Chemical and biological: ● stated

> “here, our evaluation rated its risk rating at moderate or lower as well.” (Preparedness)

The card reports chemical and biological knowledge and wet-lab benchmarks and a bottleneck-focused suite, with the designation “moderate or lower”. Scores are not recorded (hazard rule).

### Q08 Cyber: ○ not-found

No cyber evaluation of Muse Glimmer was found.

_Searched:_ Whole card (Hugging Face README, revision cec94fcf): front matter, overview, benchmarks, Trust and Safety, Preparedness, Train-Time Mitigations, Intended Use, Considerations and Limitations; terms: “cyber”, “CTF”, “evaluat”.

- Set aside: Preparedness: The cyber designation (“Moderate or lower risk (inferred)”) is inferred from Muse Spark 1.0’s designation; the card reports no cyber evaluation of this model.

### Q09 Autonomy and AI R&D: ○ not-found

No autonomy or AI R&D evaluation of Muse Glimmer was found.

_Searched:_ Whole card (Hugging Face README, revision cec94fcf): front matter, overview, benchmarks, Trust and Safety, Preparedness, Train-Time Mitigations, Intended Use, Considerations and Limitations; terms: “autonom”, “loss of control”, “R&D”, “self-”.

- Set aside: Preparedness: The loss-of-control designation is inferred from Muse Spark 1.0’s designation, without an evaluation of this model.

### Q10 Persuasion: ○ not-found

_Searched:_ Whole card (Hugging Face README, revision cec94fcf): front matter, overview, benchmarks, Trust and Safety, Preparedness, Train-Time Mitigations, Intended Use, Considerations and Limitations; terms: “persua”, “manipul”, “influenc”.

### Q11 Alignment and deception: ○ not-found

No misalignment or deception evaluation of Muse Glimmer was found.

_Searched:_ Whole card (Hugging Face README, revision cec94fcf): front matter, overview, benchmarks, Trust and Safety, Preparedness, Train-Time Mitigations, Intended Use, Considerations and Limitations; terms: “deceptive”, “misalign”, “scheming”, “sabotage”, “loss of control”.

- Set aside: Preparedness: The loss-of-control designation is inferred from Muse Spark 1.0, without an evaluation of this model.

### Q12 Red-teaming: ○ not-found

_Searched:_ Whole card (Hugging Face README, revision cec94fcf): front matter, overview, benchmarks, Trust and Safety, Preparedness, Train-Time Mitigations, Intended Use, Considerations and Limitations; terms: “red team”, “red-team”, “adversarial”.

- Set aside: Trust and Safety, Evaluations: Dedicated adversarial evaluation datasets are described, not testing described as red-teaming.

### Q13 External testers: ○ not-found

_Searched:_ Whole card (Hugging Face README, revision cec94fcf): front matter, overview, benchmarks, Trust and Safety, Preparedness, Train-Time Mitigations, Intended Use, Considerations and Limitations; terms: “external”, “third part”, “vendor”, “partner”.

- Set aside: Model overview table, Training Data: External vendor networks are named for training-data curation, not for testing.

### Q14 Government institute: ○ not-found

_Searched:_ Whole card (Hugging Face README, revision cec94fcf): front matter, overview, benchmarks, Trust and Safety, Preparedness, Train-Time Mitigations, Intended Use, Considerations and Limitations; terms: “government”, “AI Safety Institute”, “AISI”, “CAISI”.

### Q15 Release decision: ◐ partly

> “our Preparedness Team assessed Muse Glimmer’s risk profile and determined that it would receive the following designations” (Preparedness)

A maker (the Preparedness Team) is named for the risk designations only; the card states no decision to release and no maker of one.

_Searched:_ Whole card (Hugging Face README, revision cec94fcf): front matter, overview, benchmarks, Trust and Safety, Preparedness, Train-Time Mitigations, Intended Use, Considerations and Limitations; terms: “decision”, “decid”, “release”, “deploy”.

- Set aside: Preparedness: The card says the results suggest the model is unlikely to materially enable new threats upon release; that is an assessment, not a release decision.

### Q16 Stated limits: ● stated

> “Testing conducted to date has not, and could not, cover all scenarios.” (Considerations and Limitations)

The card also states that two of its three risk designations are inferred from Muse Spark 1.0 rather than evaluated (Preparedness).

## Meta: Muse Wonder and Muse Wonder Full (2026)

- Card: Muse Wonder Model Card (model card), https://research.meta.ai/static/muse-wonder-model-card
- Framework edition in the dataset: none identified. The card names the Meta Superintelligence Scaling Framework and prints its address (https://research.meta.ai/static/meta-superintelligence-scaling-framework), which carries no version. That framework is not in the dataset; maintainer decision 5a holds its v2.1 (October 2026) for a separate data task. No edition is recorded or inferred. In the cross-family check of 2026-11-07, the printed address served a PDF printing version 2.1, October 2026 (changelog: v2.1, 2 October 2026), byte-identical to its capture of 2026-10-13; this is what the address served, not an edition the card names, so Q03 stays partly.

### Q01 Card date: ◐ partly

> “Updated ExploitGym Evaluations (23 October 2026)” (§4 Cyber Capability Evaluations, note, PDF p. 7)

The card carries no date of its own other than this update note on one evaluation (a revision date). Its “Date of Release” is the model’s (Q02).

### Q02 Release date: ● stated

> “Date of Release October 12, 2026” (§1 The models, PDF p. 1)

The card gives the release date. Its terms of use name the Meta Model API (§6).

### Q03 Framework cited: ◐ partly

> “Consistent with the Meta Superintelligence Scaling Framework (https://research.meta.ai/static/meta-superintelligence-scaling-framework)” (§5 Trust and Safety, PDF p. 11)

The card names the framework and prints an address without a version. The framework is not in the dataset (maintainer decision 5a); no edition is inferred.

### Q04 Link to framework: ● stated

> “Consistent with the Meta Superintelligence Scaling Framework (https://research.meta.ai/static/meta-superintelligence-scaling-framework)” (§5 Trust and Safety, PDF p. 11)

The card prints the framework’s address. The address names no version; what it serves now was not retrieved.

### Q05 Framework determination: ● stated

> “Without mitigations, we do not rule out the model reaching this threshold in the Chemical & Biological domain.” (§4 Risk assessments, PDF p. 7)

> “we reach the same “moderate or lower” level across all domains, which supports our decision to deploy.” (§4 Risk assessments, PDF p. 7)

The card states that the high-risk threshold is not ruled out for the unmitigated model in the chemical and biological domain, “moderate or lower” for cybersecurity and loss of control before mitigations, and “moderate or lower” in all domains with mitigations. Results are from Muse Wonder Full.

### Q06 Safeguards tied to determination: ● stated

> “Because of that, we apply mitigations designed for this domain, including safety post-training and system-level classifiers.” (§4 Risk assessments, PDF p. 7)

The card ties these mitigations to the chemical and biological determination, and names a weight-security programme (§5). A stated safeguard is the developer’s account.

### Q07 Chemical and biological: ● stated

> “Without mitigations, we do not rule out the model reaching this threshold in the Chemical & Biological domain.” (§4 Risk assessments, PDF p. 7)

Outcome category: high-risk threshold not ruled out without mitigations; “moderate or lower” with them. The card reports proxy capability and refusal evaluations; scores are not recorded (hazard rule).

### Q08 Cyber: ● stated

> “Our evaluations put the unmitigated model at “moderate or lower” for both Cybersecurity and Loss of Control before applying our mitigations.” (§4 Risk assessments, PDF p. 7)

An update of 23 October 2026 to one cyber evaluation states that it does not change the “moderate or lower” threshold.

### Q09 Autonomy and AI R&D: ○ not-found

No autonomy, self-replication or AI R&D evaluation was found. The loss-of-control domain is evaluated with an honesty benchmark and an agentic misalignment benchmark (Q11).

_Searched:_ Whole card (12 pages): §§1–6 and the appendix; terms: “autonom”, “R&D”, “self-”, “replicat”, “loss of control”.

- Set aside: §4 Loss of Control Evaluations, PDF p. 10: The two evaluations named measure honesty under pressure and harmful actions to avoid replacement; they are not autonomy or AI R&D capability evaluations.

### Q10 Persuasion: ○ not-found

_Searched:_ Whole card (12 pages): §§1–6 and the appendix; terms: “persua”, “manipul”, “influenc”.

### Q11 Alignment and deception: ● stated

> “We evaluate Muse Wonder on two evaluations for this domain.” (§4 Loss of Control Evaluations, PDF p. 10)

> “Our evaluations put the unmitigated model at “moderate or lower” for both Cybersecurity and Loss of Control before applying our mitigations.” (§4 Risk assessments, PDF p. 7)

The loss-of-control evaluations are MASK (honesty under pressure) and Agentic Misalignment (harmful actions to avoid replacement or shutdown); the domain conclusion is “moderate or lower”.

### Q12 Red-teaming: ● stated

> “we ran extensive evaluations, including red-teaming, across the Framework's catastrophic risk domains of Cybersecurity, Chemical & Biological, and Loss of Control.” (§5 Trust and Safety, PDF p. 11)

Scope: the framework’s three catastrophic-risk domains. No number of testers or period is given.

### Q13 External testers: ● stated

> “The scorecard uses Datacurve’s third-party results for Muse Wonder, Muse Wonder Full, and Claude Opus 5.5” (§3 Capabilities evaluations, DeepSWE, PDF p. 6)

Datacurve, Artificial Analysis and other result sources are named for capability benchmarks. No external safety tester is named; third parties are said to have helped develop and license risk-evaluation benchmarks, and outside experts to have taken part in threat modelling (§5).

### Q14 Government institute: ○ not-found

_Searched:_ Whole card (12 pages): §§1–6 and the appendix; terms: “government”, “AI Safety Institute”, “AISI”, “CAISI”.

- Set aside: §5 Trust and Safety, PDF p. 11: Unnamed government entities are said to have given input that informed evaluations and requirements; they are not said to have tested the model or received access.

### Q15 Release decision: ● stated

> “Our internal governance process reviewed that assessment before we reached a deployment decision.” (§5 Trust and Safety, PDF p. 11)

The developer, in its own voice, states a deployment decision after an internal governance review; no person, office or committee is named.

### Q16 Stated limits: ● stated

> “Testing conducted to date has not covered, and could not cover, all scenarios.” (§6 Considerations and Limitations, PDF p. 11)

The card’s opening says it describes “the limits of that testing” (PDF p. 1).

## OpenAI: o3-mini (2025)

- Card: OpenAI o3-mini System Card (system card), https://cdn.openai.com/o3-mini-system-card-feb10.pdf
- Framework edition in the dataset: `preparedness-beta-2023`. Reference [20] (PDF p. 36) cites “Openai preparedness framework (beta)”, 2023, with the address of the beta PDF; the card’s “[20]” citation follows the Safety Advisory Group’s classification (§5, PDF p. 7).

### Q01 Card date: ● stated

> “OpenAI o3-mini System Card OpenAI January 31, 2025” (Title block, PDF p. 1)

The card prints a day-precision date with its title; no revision date was found. The file name of the address (“feb10”) is not a printed date.

### Q02 Release date: ◐ partly

> “the deployment of OpenAI o3-mini in the API allows developers to specify a custom developer message” (§4.2 Jailbreaks through custom developer messages, PDF p. 5)

The card names API deployment as a release form, without a release date. Its statement that the post-mitigation model was the final checkpoint as of 31 January 2025 (§5, PDF p. 8) dates a checkpoint, not a release.

_Searched:_ Whole card (36 pages): §§1–7, appendix and references; terms: “release”, “launch”, “available”, “API”, “ChatGPT”, “January”.

- Set aside: §5, PDF p. 8: “the final model checkpoint as of Jan 31, 2025” dates the evaluated checkpoint, not a release.

### Q03 Framework cited: ● stated

> “Openai preparedness framework (beta).” (Reference [20], PDF p. 36)

The card names the Preparedness Framework and cites the beta edition in its bibliography, with its address.

### Q04 Link to framework: ● stated

> “openai-preparedness-framework-beta.pdf, 2023. Accessed: 2024-09-11.” (Reference [20], PDF p. 36)

The reference gives the beta PDF’s address at cdn.openai.com, wrapped across lines in the text layer.

### Q05 Framework determination: ● stated

> “recommended classifying the OpenAI o3-mini (Pre-Mitigation) model as Medium risk overall. It scores Medium risk for Persuasion, CBRN (chemical, biological, radiological, nuclear), and Model Autonomy, and Low risk for Cybersecurity.” (§1 Introduction, PDF p. 1)

The Safety Advisory Group’s recommended classification; the card adds that the post-mitigation levels were rated the same as the pre-mitigation levels (§5, PDF p. 7).

### Q06 Safeguards tied to determination: ● stated

> “Heightened monitoring and detection efforts for CBRN and persuasion risks given their Medium risk levels.” (§5.2 Mitigations, PDF p. 9)

The card ties strengthened mitigations to the Medium designations for CBRN, persuasion and model autonomy, and lists new mitigations for cybersecurity. A stated safeguard is the developer’s account.

### Q07 Chemical and biological: ● stated

> “Our evaluations found that o3-mini can help experts with the operational planning of reproducing a known biological threat, which meets our medium risk threshold.” (§5.4 Chemical and Biological Threat Creation, PDF p. 11)

Outcome category: Medium. The card also reports radiological and nuclear evaluations (§5.5). Evaluation details are not recorded (hazard rule).

### Q08 Cyber: ● stated

> “o3-mini does not sufficiently advance real-world vulnerability exploitation capabilities to indicate medium risk.” (§5.3 Cybersecurity, PDF p. 9)

Outcome category: Low.

### Q09 Autonomy and AI R&D: ● stated

> “which elevates it to Medium.” (§5.7 Model Autonomy, PDF p. 25)

Outcome category: Medium, on the strength of software-engineering performance; the card says the model still performs poorly on evaluations of real-world ML research relevant to self-improvement, which a High classification would require (§1).

### Q10 Persuasion: ● stated

> “o3-mini does not outperform top human writers and does not reach our high risk threshold.” (§5.6 Persuasion, PDF p. 21)

Outcome category: Medium. The card reports human-level written persuasion.

### Q11 Alignment and deception: ◐ partly

> “MakeMeSay is an automated contextual evaluation designed to measure models’ deception capabilities” (§5.6.4 MakeMeSay, PDF p. 24)

The card reports a deception-capability evaluation within the persuasion category, against a model simulating a human, without a conclusion specific to deception. No evaluation of scheming, sabotage or undermining oversight was found.

_Searched:_ Whole card (36 pages): §§1–7, appendix and references; terms: “scheming”, “decept”, “sabotage”, “oversight”, “Apollo”, “alignment”.

### Q12 Red-teaming: ● stated

> “Pairwise red teaming was performed against an earlier variant, o3-mini-near-final-checkpoint.” (§4.3.1 Pairwise safety comparison, PDF p. 6)

> “OpenAI collaborated with Gray Swan to make the o3-mini-near-final-checkpoint model available for jailbreaking in the Gray Swan Arena.” (§4.3.2 Jailbreak Arena, PDF p. 7)

Scope: external red teaming of a near-final checkpoint (pairwise comparison with GPT-4o and o1, with web browsing and code execution) and a public jailbreak arena from 4 January 2025 focused on illicit advice and other harms.

### Q13 External testers: ● stated

> “OpenAI collaborated with Gray Swan to make the o3-mini-near-final-checkpoint model available for jailbreaking in the Gray Swan Arena.” (§4.3.2 Jailbreak Arena, PDF p. 7)

Gray Swan ran the jailbreak arena. Scale is named for human-sourced jailbreak data (§4.1.2).

### Q14 Government institute: ○ not-found

_Searched:_ Whole card (36 pages): §§1–7, appendix and references; terms: “government”, “AI Safety Institute”, “AISI”, “CAISI”, “U.S.”, “UK”.

- Set aside: §5.5 Radiological and Nuclear Threat Creation, PDF p. 19: Says a fuller nuclear evaluation “will require collaboration with the U.S. Department of Energy”: a future collaborator, not a body stated to have tested the model.

### Q15 Release decision: ◐ partly

> “SAG also rated the post-mitigation risk levels the same as the pre-mitigation risk levels, to err on the side of caution.” (§5, PDF p. 7)

The named maker (the Safety Advisory Group) is attached to the risk classification, not to a release decision. The card’s conclusion refers to “our deployment of these models” without describing a decision (§7). Maintainer decision 6a.

_Searched:_ Whole card (36 pages): §§1–7, appendix and references; terms: “decision”, “decid”, “deploy”, “launch”, “release”.

- Set aside: §7 Conclusion, PDF p. 32: “Our deployment of these models reflects our belief …” gives a reason for deployment, not a described decision.

### Q16 Stated limits: ● stated

> “our evaluations should still be seen as a lower bound for potential risks.” (§5.1 Preparedness evaluations as a lower bound, PDF p. 8)

The card adds that confidence intervals can underestimate uncertainty for small datasets (§5, PDF p. 8).

## OpenAI: Deep research (2025)

- Card: Deep Research System Card (system card), https://cdn.openai.com/deep-research-system-card.pdf
- Framework edition in the dataset: `preparedness-beta-2023`. Reference [3] (PDF p. 35) cites “Openai preparedness framework beta”, 2023, with the address of the beta PDF; the card cites [3] at the Safety Advisory Group’s classification (§3.4, PDF p. 11). A table on PDF p. 3 lists tracked categories with High and Critical capability thresholds and safeguard guidelines without naming an edition; no edition is inferred from it.

### Q01 Card date: ● stated

> “Deep Research System Card OpenAI∗ February 25, 2025” (Title block, PDF p. 1)

> “SWE-Lancer Note (Monday, July 28th)” (§3.4.7, SWE-Lancer note, PDF p. 33)

The card prints a day-precision date. The copy read also carries a later note on one evaluation, headed “Monday, July 28th” and referring to an update of July 17, 2025, so it is a revised expression of the February card.

### Q02 Release date: ◐ partly

> “Before launching deep research and making it available to our Pro users, we conducted rigorous safety testing, Preparedness evaluations and governance reviews.” (§1 Introduction, PDF p. 1)

The card names the release form (availability to ChatGPT Pro users), without a release date.

_Searched:_ Whole card (36 pages): §§1–4, acknowledgements and references; terms: “release”, “launch”, “available”, “Pro”, “February”.

### Q03 Framework cited: ● stated

> “Openai preparedness framework beta,” (Reference [3], PDF p. 35)

The card names the Preparedness Framework and cites the beta edition (2023) in its bibliography, with its address.

### Q04 Link to framework: ● stated

> “openai-preparedness-framework-beta.pdf. https://cdn.openai.com/” (Reference [3], PDF p. 35)

The reference gives the beta PDF’s address, split across lines in the text layer.

### Q05 Framework determination: ● stated

> “the Safety Advisory Group [3] classified the deep research model as overall medium risk, including medium risk for cybersecurity, persuasion, CBRN, model autonomy.” (§3.4 Preparedness Framework Evaluations, PDF p. 11)

The card states Medium in all four tracked categories.

### Q06 Safeguards tied to determination: ● stated

> “given the Medium post-mitigation risk designations across all four risk areas evaluated, we have strengthened” (§3.4.2 Preparedness Mitigations, PDF p. 12)

> “Additional monitoring and targeted investigations of suspected abuses relating to Influence Operations, extremism, and improper political activities to address persuasion risks.” (§3.4.2, PDF p. 13)

The card ties strengthened mitigations to the Medium designations and lists them. A stated safeguard is the developer’s account.

### Q07 Chemical and biological: ● stated

> “which meets our medium risk threshold.” (§3.4.4 Chemical and Biological Threat Creation, PDF p. 17)

Outcome category: Medium. The summary’s finding is help to experts with operational planning; the card adds that several biology evaluations indicate models on the cusp of helping novices. Details are not recorded (hazard rule).

### Q08 Cyber: ● stated

> “Deep research sufficiently advances real-world vulnerability exploitation capabilities to indicate Medium risk.” (§3.4.3 Cybersecurity, PDF p. 13)

Outcome category: Medium; the card says no tested model meets the High threshold.

### Q09 Autonomy and AI R&D: ● stated

> “which elevates it to Medium risk level.” (§3.4.7 Model Autonomy, PDF p. 27)

Outcome category: Medium, on the strength of software-engineering performance.

### Q10 Persuasion: ● stated

> “Score for deep research: Medium” (§3.4.6 Persuasion, PDF p. 24)

Outcome category: Medium. The card says it is reconsidering how to assess real-world persuasion risks.

### Q11 Alignment and deception: ◐ partly

> “MakeMeSay is an automated contextual evaluation designed to measure models’ deception capabilities” (§3.4.6 Persuasion, MakeMeSay, PDF p. 26)

The card reports a deception-capability evaluation within the persuasion category, against a model simulating a human, without a conclusion specific to deception. No evaluation of scheming, sabotage or undermining oversight was found.

_Searched:_ Whole card (36 pages): §§1–4, acknowledgements and references; terms: “scheming”, “decept”, “sabotage”, “oversight”, “Apollo”, “alignment”.

### Q12 Red-teaming: ● stated

> “OpenAI worked with groups of external red teamers to assess key risks associated with the capabilities of deep research.” (§3.1 External red teaming methodology, PDF p. 2)

Scope: personal information and privacy, disallowed content, regulated advice, risky advice, prompt injections and jailbreaks; a targeted red-teaming campaign on risky advice is also reported (§3.3).

### Q13 External testers: ● stated

> “Red teaming organization: Lysios LLC” (Acknowledgements, PDF p. 35)

The card names Lysios LLC as a red-teaming organisation; individual red teamers are also listed.

### Q14 Government institute: ○ not-found

_Searched:_ Whole card (36 pages): §§1–4, acknowledgements and references; terms: “government”, “AI Safety Institute”, “AISI”, “CAISI”, “U.S.”, “UK”.

- Set aside: §3.4.5 Radiological and Nuclear Threat Creation, PDF p. 22: Says a fuller nuclear evaluation “will require collaboration with the U.S. Department of Energy”: a future collaborator, not a body stated to have tested the model.

### Q15 Release decision: ◐ partly

> “Before launching deep research and making it available to our Pro users, we conducted rigorous safety testing, Preparedness evaluations and governance reviews.” (§1 Introduction, PDF p. 1)

The launch is stated as following safety testing and governance reviews, without a decision being described; the Safety Advisory Group is named only for the risk classification (§3.4). Maintainer decision 6a.

_Searched:_ Whole card (36 pages): §§1–4, acknowledgements and references; terms: “decision”, “decid”, “deploy”, “launch”, “release”.

### Q16 Stated limits: ● stated

> “our Preparedness evaluations should still be seen as a lower bound for potential capabilities.” (§3.4, Preparedness evaluations as a lower bound, PDF p. 11)

The card also states that browsing can contaminate evaluation results and make them harder to interpret (§3.4.1).

## xAI: Grok 4.6 (2026)

- Card: Model Card: Grok 4.6 (model card), https://media.x.ai/v1/website/card-4p6-4cd2dc57.pdf
- Framework edition in the dataset: `faif-2026`. Reference 29 (PDF p. 42) cites “xAI Frontier Artificial Intelligence Framework (FAIF). xAI, June 30, 2026.” with the address of a file named for 30 June 2026; the dataset records the June 2026 edition (effective 2026-06-30) as faif-2026. In the cross-family check of 2026-11-07, the linked file answered HTTP 404 and its captures HTTP 429; a publisher file of the same dated name with a different suffix prints an effective date of June 30, 2026 and no version number on its first page. The card’s dated citation supports Q03.

### Q01 Card date: ● stated

> “Model Card: Grok 4.6 August 12, 2026 Revision: 2026-08-17” (Cover, PDF p. 1)

The cover prints the card date (August 12, 2026) and a revision date (2026-08-17); the changelog lists the revision’s changes (PDF p. 2). The copy read is the revised expression.

### Q02 Release date: ◐ partly

> “It is available for use through the following channels:” (§1.1 Overview, PDF p. 7)

> “SpaceXAI API: Available from the console at console.x.ai” (§1.1 Overview, PDF p. 7)

The card names release forms (API, coding agent, Cursor, office add-ins, model gateways) and says consumer surfaces will follow at a later date, without a release date.

_Searched:_ Whole card (42 pages): changelog, §§1–12 and references; terms: “release”, “launch”, “available”, “August”.

### Q03 Framework cited: ● stated

> “xAI Frontier Artificial Intelligence Framework (FAIF). xAI, June 30, 2026.” (Reference 29, PDF p. 42)

The reference dates the edition (June 30, 2026), which the dataset records as the FAIF June 2026 edition.

### Q04 Link to framework: ● stated

> “website/xai-frontier-artificial-intelligence-framework-30-june-2026-99c40684.pdf” (Reference 29, PDF p. 42)

The reference gives the framework’s address at media.x.ai, wrapped across lines in the text layer.

### Q05 Framework determination: ◐ partly

> “Grok 4.6 scores below the FAIF safety thresholds on dual-use knowledge, indicating limited actionable uplift for an already-trained actor.” (§8 Biological and chemical capabilities and safeguards, PDF p. 32)

The card states a framework outcome for the biological and chemical evaluations only; no FAIF threshold outcome was found for cyber or other domains.

_Searched:_ Whole card (42 pages): changelog, §§1–12 and references; terms: “FAIF”, “threshold”, “framework”.

- Set aside: §7 Cyber capabilities and safeguards, PDF p. 29: Describes capability gains without a framework threshold outcome.

### Q06 Safeguards tied to determination: ◐ partly

> “Refusals are enforced by a layered, defense-in-depth stack” (§10 General output safety, PDF p. 36)

The card describes refusal policy, system prompts, runtime input and topical filters and cyber-specific safeguards, without tying them to a framework threshold outcome. A stated safeguard is the developer’s account.

_Searched:_ Whole card (42 pages): changelog, §§1–12 and references; terms: “safeguard”, “mitigation”, “filter”, “threshold”.

### Q07 Chemical and biological: ● stated

> “Grok 4.6 scores below the FAIF safety thresholds on dual-use knowledge, indicating limited actionable uplift for an already-trained actor.” (§8, PDF p. 32)

The biological and chemical suites are described as safety-threshold evaluations under the FAIF. Scores are not recorded (hazard rule).

### Q08 Cyber: ◐ partly

> “Grok 4.6 shows some cybersecurity-relevant capability gains over Grok 4.5, concentrated in cyber-defense and vulnerability-mitigation tasks rather than end-to-end offensive use.” (§7 Cyber capabilities and safeguards, PDF p. 29)

The card reports offensive-cyber capability evaluations, run without production safeguards, and characterises the gains, without an outcome category or threshold language. Third-party evaluators are said to have corroborated the results.

_Searched:_ Whole card (42 pages): changelog, §§1–12 and references; terms: “cyber”, “threshold”, “risk”, “FAIF”.

### Q09 Autonomy and AI R&D: ◐ partly

> “As a test of autonomous AI-development acceleration, an earlier Grok 4.6 checkpoint was tasked with speeding up its own chat inference” (§5 R&D enablement, PDF p. 24)

The card reports AI R&D tasks, including this test of AI-development acceleration on an earlier checkpoint, without an outcome category, threshold or risk conclusion; it frames them as capability to be quantified.

_Cross-family check (item 32):_ material disagreement, held for the maintainer: the checker’s recorded status is not found (blind), while its comparison says the pack’s partly is better supported for the earlier-checkpoint evaluation in §5 if that scope is kept explicit. The cell keeps the pack’s status until the maintainer decides. Recommendation: partly.

- pack (Claude): partly: §5 (PDF p. 24) reports a test of autonomous AI-development acceleration on an earlier Grok 4.6 checkpoint, without an outcome category, threshold or risk conclusion.
- checker (Codex): not-found (blind): the research-capability benchmarks are product capability, and the framework-linked threshold in §8 concerns biology and chemistry. On comparison: the §5 earlier-checkpoint test “supports partly if labeled as an earlier-checkpoint evaluation with no frontier risk outcome”.
- Criterion: The card reports that evaluations in any of these domains were run and states their outcome category or threshold language (policy level only). Partly if evaluations are reported without any outcome or conclusion. Agentic task benchmarks reported only as product capability do not meet it.

_Searched:_ Whole card (42 pages): changelog, §§1–12 and references; terms: “autonom”, “R&D”, “self-”, “threshold”.

### Q10 Persuasion: ○ not-found

_Searched:_ Whole card (42 pages): changelog, §§1–12 and references; terms: “persua”, “manipul”, “influenc”.

### Q11 Alignment and deception: ◐ partly

> “we test whether Grok 4.6 faithfully reports its beliefs when pressured to lie, as a proxy for the model’s tendency to assert misleading information.” (§12.1 MASK-Rectified, PDF p. 38)

The card reports honesty-under-pressure and sycophancy results with figures, without a stated conclusion. No evaluation of scheming, sabotage or undermining oversight was found.

_Searched:_ Whole card (42 pages): changelog, §§1–12 and references; terms: “decept”, “scheming”, “sabotage”, “oversight”, “misalign”.

### Q12 Red-teaming: ○ not-found

_Cross-family check (item 77):_ minor, applied: the set-aside locators gave printed page numbers as PDF pages; they now give the physical pages (31 and 35). Status agrees.

_Searched:_ Whole card (42 pages): changelog, §§1–12 and references; terms: “red team”, “red-team”, “adversarial”.

- Set aside: §7.4 HackerBench, PDF p. 31: “red-teaming tasks” are a task type in an internal cyber benchmark, not adversarial testing of the model described as red-teaming.
- Set aside: §9.1 Jailbreaks, PDF p. 35: Jailbreak stress tests of the refusal safeguards are not described as red-teaming.

### Q13 External testers: ● stated

> “Results reported are taken from evaluations conducted by Datacurve.” (§2.4 DeepSWE v1.1, PDF p. 12)

Cursor, Mercor, Cognition, Datacurve, Abundant AI and Harbor are named as having run capability benchmarks. The external safety evaluators of the cyber configuration are described but not named (§7, PDF p. 29).

### Q14 Government institute: ○ not-found

_Searched:_ Whole card (42 pages): changelog, §§1–12 and references; terms: “government”, “AI Safety Institute”, “AISI”, “CAISI”.

### Q15 Release decision: ○ not-found

_Searched:_ Whole card (42 pages): changelog, §§1–12 and references; terms: “decision”, “decid”, “release”, “deploy”, “launch”.

- Set aside: §7.4, PDF p. 30: “release-tracked safeguards” names a safeguard configuration, not a release decision.

### Q16 Stated limits: ○ not-found

_Searched:_ Whole card (42 pages): changelog, §§1–12 and references; terms: “limitation”, “underestimat”, “lower bound”, “not rule out”, “uncertain”.

- Set aside: §7, PDF p. 29: States that capability tests run without production safeguards; a description of method, not a stated limit of the evaluations.

## Inventory of cards located

The eight cards selected for pack 4. The full inherited inventory and adjudicated population remain in research/model-cards-2/; they were not re-inventoried here.

### Group anthropic

_Searched:_ Pack-4 selection inherited from research/model-cards-2/population.md (adjudicated 2026-11-04; packs 4 and 5 follow pack 3). Each card retrieved fresh by direct HTTP on 2026-11-06, sequentially, at least 8 s apart; the full developer inventory was not repeated. None of these cards is admitted or held (review/model-cards-admission-4-2026-11-05.md; src/reading/model-cards-frame.ts).

| Developer | Model           | Card                                                                                                                | Kind     | Card date                                                      | Retrieved                  | Compared | Note                                                                                                                             |
| --------- | --------------- | ------------------------------------------------------------------------------------------------------------------- | -------- | -------------------------------------------------------------- | -------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Anthropic | Claude Opus 4.1 | [System Card Addendum: Claude Opus 4.1](https://www-cdn.anthropic.com/9fa30625273bafdf5af82c93719d7ca606485a16.pdf) | addendum | 2025-08 (printed cover month); revision 2025-09-15 (changelog) | yes (HTTP 200, 2026-11-06) | yes      | Pack 4 in the population order; earliest located 2025-08 (Anthropic index month, population.md); the cover prints the same month |

### Group google

_Searched:_ Pack-4 selection inherited from research/model-cards-2/population.md (adjudicated 2026-11-04; packs 4 and 5 follow pack 3). Each card retrieved fresh by direct HTTP on 2026-11-06, sequentially, at least 8 s apart; the full developer inventory was not repeated. None of these cards is admitted or held (review/model-cards-admission-4-2026-11-05.md; src/reading/model-cards-frame.ts).

| Developer       | Model                 | Card                                                                                                                                 | Kind       | Card date                                                                                                              | Retrieved                  | Compared | Note                                                                                                                                |
| --------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ---------- | ---------------------------------------------------------------------------------------------------------------------- | -------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Google DeepMind | Gemini 2.5 Pro        | [Gemini 2.5 Pro Model Card](https://storage.googleapis.com/deepmind-media/Model-Cards/Gemini-2-5-Pro-Model-Card.pdf)                 | model card | 2025-06-27 (printed revision date: “Model card updated June 27, 2025”)                                                 | yes (HTTP 200, 2026-11-06) | yes      | Pack 4 in the population order; earliest located 2025-06-27 (printed revision date, no earlier date located)                        |
| Google DeepMind | Gemini 2.5 Flash-Lite | [Gemini 2.5 Flash-Lite - Model Card](https://storage.googleapis.com/deepmind-media/Model-Cards/Gemini-2-5-Flash-Lite-Model-Card.pdf) | model card | 2025-09-26 (printed “Published: September 26, 2025”, copy read); population: 2025-07-22 from the capture of 2025-07-31 | yes (HTTP 200, 2026-11-06) | yes      | Pack 4 in the population order; earliest located 2025-07-22 (cross-family check of 2026-11-04); the copy read is a later expression |

### Group meta

_Searched:_ Pack-4 selection inherited from research/model-cards-2/population.md (adjudicated 2026-11-04; packs 4 and 5 follow pack 3). Each card retrieved fresh by direct HTTP on 2026-11-06, sequentially, at least 8 s apart; the full developer inventory was not repeated. None of these cards is admitted or held (review/model-cards-admission-4-2026-11-05.md; src/reading/model-cards-frame.ts).

| Developer | Model                            | Card                                                                                                                                                                                                            | Kind       | Card date                                                             | Retrieved                  | Compared | Note                                                                                                                        |
| --------- | -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | --------------------------------------------------------------------- | -------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------- |
| Meta      | Muse Glimmer                     | [Muse Glimmer Model Card (README.md, Hugging Face meta-models/Muse-Glimmer-30B, revision cec94fcf)](https://huggingface.co/meta-models/Muse-Glimmer-30B/raw/cec94fcfd6512f2cfe708138c32533b346ea4f69/README.md) | model card | no card date printed (decision 8a); “Model Release Date: August 2026” | yes (HTTP 200, 2026-11-06) | yes      | Pack 4 in the population order; earliest located 2026-08-10 (Meta’s announcement, inventory); repository created 2026-08-09 |
| Meta      | Muse Wonder and Muse Wonder Full | [Muse Wonder Model Card](https://research.meta.ai/static/muse-wonder-model-card)                                                                                                                                | model card | no card date; release date 2026-10-12 printed; update note 2026-10-23 | yes (HTTP 200, 2026-11-06) | yes      | Pack 4 in the population order; earliest located 2026-10-12 (printed release date)                                          |

### Group openai

_Searched:_ Pack-4 selection inherited from research/model-cards-2/population.md (adjudicated 2026-11-04; packs 4 and 5 follow pack 3). Each card retrieved fresh by direct HTTP on 2026-11-06, sequentially, at least 8 s apart; the full developer inventory was not repeated. None of these cards is admitted or held (review/model-cards-admission-4-2026-11-05.md; src/reading/model-cards-frame.ts).

| Developer | Model         | Card                                                                               | Kind        | Card date                                                                                        | Retrieved                  | Compared | Note                                                                       |
| --------- | ------------- | ---------------------------------------------------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------ | -------------------------- | -------- | -------------------------------------------------------------------------- |
| OpenAI    | o3-mini       | [OpenAI o3-mini System Card](https://cdn.openai.com/o3-mini-system-card-feb10.pdf) | system card | 2025-01-31 (printed)                                                                             | yes (HTTP 200, 2026-11-06) | yes      | Pack 4 in the population order; earliest located 2025-01-31 (printed date) |
| OpenAI    | Deep research | [Deep Research System Card](https://cdn.openai.com/deep-research-system-card.pdf)  | system card | 2025-02-25 (printed); the copy read carries a later note referring to an update of July 17, 2025 | yes (HTTP 200, 2026-11-06) | yes      | Pack 4 in the population order; earliest located 2025-02-25 (printed date) |

### Group xai

_Searched:_ Pack-4 selection inherited from research/model-cards-2/population.md (adjudicated 2026-11-04; packs 4 and 5 follow pack 3). Each card retrieved fresh by direct HTTP on 2026-11-06, sequentially, at least 8 s apart; the full developer inventory was not repeated. None of these cards is admitted or held (review/model-cards-admission-4-2026-11-05.md; src/reading/model-cards-frame.ts).

| Developer | Model    | Card                                                                        | Kind       | Card date                                           | Retrieved                  | Compared | Note                                                                       |
| --------- | -------- | --------------------------------------------------------------------------- | ---------- | --------------------------------------------------- | -------------------------- | -------- | -------------------------------------------------------------------------- |
| xAI       | Grok 4.6 | [Model Card: Grok 4.6](https://media.x.ai/v1/website/card-4p6-4cd2dc57.pdf) | model card | 2026-08-12 (printed); revision 2026-08-17 (printed) | yes (HTTP 200, 2026-11-06) | yes      | Pack 4 in the population order; earliest located 2026-08-12 (printed date) |

## Sources

| Key                                   | Card                                                                                              | Address                                                                                                    | HTTP | SHA-256             | Retrieved                | Words | Archive                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ------------------------------------- | ------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ---- | ------------------- | ------------------------ | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| anthropic-claude-opus-4-1             | System Card Addendum: Claude Opus 4.1                                                             | https://www-cdn.anthropic.com/9fa30625273bafdf5af82c93719d7ca606485a16.pdf                                 | 200  | `b2b5beba3ed386a5…` | 2026-11-06T20:08:52.053Z | 5256  | https://web.archive.org/web/20260126205516id_/https://www-cdn.anthropic.com/9fa30625273bafdf5af82c93719d7ca606485a16.pdf                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| gdm-gemini-2-5-flash-lite             | Gemini 2.5 Flash-Lite - Model Card                                                                | https://storage.googleapis.com/deepmind-media/Model-Cards/Gemini-2-5-Flash-Lite-Model-Card.pdf             | 200  | `3fd8835ea1b38974…` | 2026-11-06T20:09:32.753Z | 2246  | Not read here (web.archive.org reset the connection on 2026-11-06). In the cross-family check of 2026-11-07: the capture of 2025-07-31 (“Published: July 22, 2025”, recorded by the check of 2026-11-04) answered HTTP 429 on replay, so the sampled cells were not compared with the July expression.                                                                                                                                                                                                                                                                                                                   |
| gdm-gemini-2-5-pro                    | Gemini 2.5 Pro Model Card                                                                         | https://storage.googleapis.com/deepmind-media/Model-Cards/Gemini-2-5-Pro-Model-Card.pdf                    | 200  | `247f1ba6fc665333…` | 2026-11-06T20:09:00.570Z | 7146  | Not read here (web.archive.org reset the connection on 2026-11-06). In the cross-family check of 2026-11-07: the nearest indexed capture (2025-10-07) answered HTTP 429 on replay.                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| meta-muse-glimmer                     | Muse Glimmer Model Card (README.md, Hugging Face meta-models/Muse-Glimmer-30B, revision cec94fcf) | https://huggingface.co/meta-models/Muse-Glimmer-30B/raw/cec94fcfd6512f2cfe708138c32533b346ea4f69/README.md | 200  | `2ba646dcbe5b3b97…` | 2026-11-06T20:09:49.592Z | 2618  | Not read here (web.archive.org reset the connection on 2026-11-06). In the cross-family check of 2026-11-07: no capture of the pinned address; the repository page’s capture of 2026-08-11 answered HTTP 429. The checker read two earlier README revisions from the publisher’s history: 5f5a77e8 (committed 2026-08-09 22:52 UTC), whose section is headed “Catastrophic risk”, so the locators for Q03, Q05 and Q15 differ while the deciding language is the same; and f84ecc3a (2026-08-10 08:15 UTC), whose Trust and Safety text is the same as the copy read. Commit times do not fix first public availability. |
| meta-muse-wonder-and-muse-wonder-full | Muse Wonder Model Card                                                                            | https://research.meta.ai/static/muse-wonder-model-card                                                     | 200  | `09be1bc9870954c4…` | 2026-11-06T20:09:58.085Z | 2814  | https://web.archive.org/web/20261013013207id_/https://research.meta.ai/static/muse-wonder-model-card                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| openai-deep-research                  | Deep Research System Card                                                                         | https://cdn.openai.com/deep-research-system-card.pdf                                                       | 200  | `6662a84c7fdffc19…` | 2026-11-06T20:09:41.399Z | 11737 | Not read here (web.archive.org reset the connection on 2026-11-06). In the cross-family check of 2026-11-07: the capture of 2025-02-25 answered HTTP 429 on replay and the publisher’s card page HTTP 403, so the sampled cells were not compared with the February expression. The copy read keeps the printed date of February 25, 2025; its July 2025 note and PDF creation date are separate events.                                                                                                                                                                                                                 |
| openai-o3-mini                        | OpenAI o3-mini System Card                                                                        | https://cdn.openai.com/o3-mini-system-card-feb10.pdf                                                       | 200  | `420c260d935429e3…` | 2026-11-06T20:09:09.374Z | 12106 | Not read here (web.archive.org reset the connection on 2026-11-06). In the cross-family check of 2026-11-07: the availability lookup returned no capture of this address; the address without the “-feb10” suffix answered HTTP 404.                                                                                                                                                                                                                                                                                                                                                                                     |
| xai-grok-4-6                          | Model Card: Grok 4.6                                                                              | https://media.x.ai/v1/website/card-4p6-4cd2dc57.pdf                                                        | 200  | `1fbb3ab6d7c57272…` | 2026-11-06T20:09:17.819Z | 7782  | Not read here (web.archive.org reset the connection on 2026-11-06). In the cross-family check of 2026-11-07: the availability lookup returned no capture near 2026-08-12; no expression before the revision of 2026-08-17 was located.                                                                                                                                                                                                                                                                                                                                                                                   |
