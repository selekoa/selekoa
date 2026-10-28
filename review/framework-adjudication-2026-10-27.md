# Framework comparison: decisions for the maintainer, 2026-10-27

**Status: report only, complete.** Nothing in `research/frontier-framework-comparison/` or `data/` was changed. Each item below prepares one ruling. A later, separately authorised task applies the rulings.

## How to use this memo

Each item asks one question about one cell of the framework comparison. A cell is one edition of one framework, answering one comparison question (a "facet"). For each item you get the question, what the pack now says, what the cross-family check said, the passage that decides it, and a recommendation. Write "yes", "no" or a short ruling in the "Agree?" column of the table below.

"Follows from a rule" means the answer is already decided by a ruling you made on 2026-10-26 ([record](data-fixes-2026-10-26.md)) or by the "partly" rule in Part 1, if you adopt it. "Open" means it needs your judgement.

## Decision table

Rule B = the "partly" rule recommended in Part 1. "2026-10-26" = your rulings of that date.

| #   | Item                                 | Question                                                                   | Recommendation                                                     | Follows from                       | Agree? |
| --- | ------------------------------------ | -------------------------------------------------------------------------- | ------------------------------------------------------------------ | ---------------------------------- | ------ |
| P1  | The "partly" rule                    | Which rule decides "stated" versus "stated, partly"?                       | Rule B: "partly" only for a weaker form than the criterion's words | **Open**                           |        |
| 1   | `fsf-2024.D7.external`               | Is publishing framework revisions public reporting?                        | Keep not found; close                                              | 2026-10-26 (D7), applied           |        |
| 2   | `fsf-v3-1.D3.halt`                   | Is a deployment-only-after-acceptance gate a full pause statement?         | Stated, scope in note; same for v3.0                               | Rule B                             |        |
| 3   | `rsp-v3-4.D3.halt`                   | Do competitor-scenario delays count as a pause statement?                  | Stated, conditions in note; same for v3.0–v3.3                     | Rule B                             |        |
| 4   | `meta-aasf-v2-0.D1.persuasion`       | Does a scams scenario make persuasion a tracked domain?                    | Keep not found                                                     | Criterion as worded                |        |
| 5   | `preparedness-beta-2023.D7.external` | Is "alerting distribution partners" external reporting?                    | Keep not found; close                                              | 2026-10-26 (C8), applied           |        |
| 6   | `meta-aasf-v2-0.D6.competitor`       | Does a scope comparison with "the most advanced models" count?             | Keep not found; add one sentence on scope tests to the criterion   | 2026-10-26 (D6); sentence **open** |        |
| 7   | `ms-fgf-2026.D1.other`               | Is Microsoft's named "Loss of control" a full entry without thresholds?    | Stated                                                             | Overlap rule + Rule B              |        |
| 8   | `rsp-2023.D1.cbrn`                   | Is CBRN named as a domain of interest a full entry?                        | Stated; same for `rsp-2023.D1.cyber`                               | Criterion + Rule B                 |        |
| 9   | `rsp-v3-0.D4.oversight`              | Is a Board/LTBT approval required in one case a full oversight role?       | Stated; same for v3.1–v3.4                                         | Rule B                             |        |
| 10  | `fsf-v2-0.D8.changes`                | Do changes stated in a footnote count without a changelog?                 | Stated                                                             | Rule B                             |        |
| 11  | `ms-fgf-2026.D1.persuasion`          | Is "Harmful manipulation" named as tracked a full entry?                   | Stated                                                             | Rule B                             |        |
| 12  | `rsp-v3-4.D7.external`               | Two note errors (wrong table row; "aim to" dropped)                        | Correct the note                                                   | Factual correction                 |        |
| 13  | `meta-aasf-v2-0.D1.autonomy`         | Should the cell quote the AI R&D passage itself?                           | Add a second entry (TS.1.1 and "Autonomous AI R&D")                | No rule; low-risk fix              |        |
| 14  | `ms-fgf-2026.D2.levels`              | Does every tracked capability have four levels?                            | Correct the note: three of five                                    | Factual correction                 |        |
| 15  | `meta-aasf-v2-0.D1.other`            | Does Meta's "Loss of Control 2" (monitor sabotage) also go under D1.other? | Yes; add it, cell becomes stated                                   | **Open** (splitting a domain)      |        |
| 16  | `ms-fgf-2025/2026.D6.competitor`     | Is "marginal uplift" over open-weights models a competitor provision?      | Keep stated, partly                                                | **Open**; Rule B supports          |        |
| 17  | `ms-fgf-2026.D1.autonomy` entry 2    | Should loss of control leave D1.autonomy? Do DeepMind and xAI move?        | Remove entry 2; DeepMind v3.1 and xAI unchanged                    | Overlap rule                       |        |
| 18  | `faif-2026` D4 ×2, D6, D8            | Close the four cells that awaited an archive check?                        | Close as not found                                                 | Archive check run                  |        |

**Summary.** 18 items plus the rule. Eight follow from rulings, criteria or checks already in place (1, 4, 5, 6 status, 12, 14, 17, 18). Seven follow from Rule B if you adopt it (2, 3, 7, 8, 9, 10, 11). Open: the rule itself, item 15 (whether to split a publisher's domain by its named outcomes), item 16 (marginal uplift), the scope-test sentence in item 6, and the quotation addition in item 13 (low risk).

## Part 1. The "partly" rule

**The question.** The pack has three states for a cell: "stated", "stated, partly" and "not found". The cross-family check found that "partly" is used for several different reasons (a condition, a limited scope, a domain named without a threshold, an example instead of a general definition, a change stated in passing), and that the check brief's own example ("a domain named but given no threshold") conflicts with criteria such as D1.cbrn, which asks only that a domain be named _or_ given a threshold.

**Three workable rules.**

- **Rule A. Two states only.** A cell is "stated" when a passage meets the criterion as worded, or "not found". Conditions, scope limits and missing thresholds go in the note. _Example:_ RSP v2.0 names persuasion only to exclude it from its commitments (`rsp-v2-0.D1.persuasion`). Under A this becomes "not found", with the passage kept as a hit set aside.
- **Rule B. "Partly" for one reason only.** A cell is "stated" when a passage meets the criterion as worded, however conditional or narrow its scope; the condition or scope goes in the note. A cell is "partly" only when the passage has the thing the criterion asks for, but in a weaker form than the criterion's own words: a domain named but excluded, or only as possible future work; no named person or body where the criterion asks for one; an example where it asks for a general definition; a "may" where it asks for a statement that something will happen; information sent to a board where it asks for a review role. A cell is "not found" when no passage names the thing at all. _Example:_ DeepMind FSF v3.1 says external deployment takes place "only after" a governance function finds the residual risk acceptable (`fsf-v3-1.D3.halt`). That meets the criterion for a deployment gate, limited in scope, so under B it becomes "stated" with the scope in the note.
- **Rule C. Keep "partly" and add a reason tag.** No status changes. Each of the 77 "partly" cells gets one of six tags (conditional, limited scope, named but not tracked, no threshold, incomplete, information only), shown next to the status. _Example:_ `rsp-2023.D1.cbrn` stays "partly" with the tag "no threshold". This keeps the conflict with the D1.cbrn criterion.

**Recommendation: Rule B.** It keeps a third state where it carries real information (the edition mentions the thing but holds back from it), and it stops the third state from acting as a hidden score for conditional or narrow provisions. The cross-family check's main objection is answered. Rule A loses the distinction between "never mentioned" and "mentioned and excluded". Rule C keeps the inconsistency the check found and adds 77 tags to maintain.

**Consequences of Rule B.** 28 of the 77 "partly" cells would become "stated"; 49 stay "partly"; none becomes "not found". Each must be re-read when the rule is applied; the list is from the stored passages and notes.

| Facet         | Cells that would become "stated"                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D1 domains    | `rsp-2023.D1.cbrn`, `rsp-2023.D1.cyber`, `rsp-v2-0.D1.cyber`, `rsp-v2-1.D1.cyber`, `rsp-v2-2.D1.cyber` (named "Ongoing Assessment"), `faif-2025.D1.cyber`, `ms-fgf-2026.D1.persuasion`, `ms-fgf-2026.D1.other`, `meta-aasf-v2-0.D1.other`, `preparedness-v2.D1.other` (the D1.other criterion admits research and monitored-only domains), `frontier-governance-2026.D1.persuasion` (probable: named as one of the "key risk categories", approach "exploratory") |
| D2 definition | `rsp-2023.D2.definition` (the edition has a general definition; the quotation gives half of it)                                                                                                                                                                                                                                                                                                                                                                   |
| D3 pause      | `rsp-v2-0`, `rsp-v2-1`, `rsp-v2-2` (training pauses in the pretraining case), `rsp-v3-0` to `rsp-v3-4` (delays in two competitor scenarios), `fsf-v3-0`, `fsf-v3-1` (deployment gates) — 10 cells                                                                                                                                                                                                                                                                 |
| D4 oversight  | `rsp-v3-0` to `rsp-v3-4` (Board and LTBT approval required when marginal risk analysis plays a major role) — 5 cells                                                                                                                                                                                                                                                                                                                                              |
| D8 changes    | `fsf-v2-0.D8.changes` (a footnote states a change from v1.0)                                                                                                                                                                                                                                                                                                                                                                                                      |

Stay "partly" under B, for example: the persuasion exclusions (RSP v2.0–v2.2, Preparedness v2), domains named only as future work (FSF v1.0, RSP v2.x D1.other), no named decision-maker (`rsp-2023`, `frontier-governance-2026` D4.determination), the board information roles (`rsp-2023`, `rsp-v2-x`, Meta, Microsoft D4.oversight), per-row examples instead of a general definition (D2.definition), Risk Report publication instead of evaluation timing (RSP v3.x D5.cadence), and the xAI December 2025 "may" pause (`faif-2025.D3.halt`).

If you adopt B, items 2, 3, 7, 8, 9, 10 and 11 below follow from it.

## Part 2. The 14 cross-family disagreements

Method: each edition was retrieved again on 2026-10-27 from the publisher address recorded in the pack, with the pack's own tool; every SHA-256 matched the pack. Each passage was read on its page before the stored cell was opened. Blindness was partial: to identify the 14 items, this session read the cross-family summary table, which gives a one-line reason per item. It did not read the per-cell reasons in the check's JSON before reading the passages. This is a machine check by the preparing model family ("same-family"), not editorial acceptance.

### 1. `fsf-2024.D7.external` — Google DeepMind FSF v1.0 (May 2024)

- **Question.** Does a promise to publish revisions of the framework count as public reporting?
- **Pack:** not found. **Cross-family check:** disagree, it counts.
- **Passage.** "we will publish substantive revisions as appropriate" (PDF p. 6, Future work). The same page: "We are exploring internal policies around alerting relevant stakeholder bodies when, for example, evaluation thresholds are met".
- **Reading.** The first passage is publication of the framework itself. The second describes a policy under exploration, not a disclosure the edition says it will make.
- **Recommendation.** Keep "not found". Close the item.
- **Follows from a rule:** yes. Your 2026-10-26 D7.external ruling excludes publication of the framework itself, and it has already been applied to this cell.

### 2. `fsf-v3-1.D3.halt` — Google DeepMind FSF v3.1

- **Question.** Is a deployment gate ("only after" an acceptance decision) a full non-deployment statement, or only partly one?
- **Pack:** stated, partly. **Cross-family check:** disagree, fully stated.
- **Passage.** "external deployments of a model take place only after the appropriate governance function determines the residual risk to be acceptable (including a safety case where a CCL has been reached)" (PDF p. 10, §2.1.2 step 2). p. 14 extends the gate to "high-risk internal deployments".
- **Reading.** This is an operative non-deployment condition. Its limits are scope: it covers external and high-risk internal deployment, and p. 7 says the misuse acceptance criterion is "required only for external deployment, not internal deployment or further development". No passage pauses development.
- **Recommendation.** "Stated", with the scope limits kept in the note. The same applies to `fsf-v3-0.D3.halt`.
- **Follows from a rule:** yes, from Rule B. Not from a 2026-10-26 rule.

### 3. `rsp-v3-4.D3.halt` — Anthropic RSP v3.4

- **Question.** Do delay commitments that apply only in competitor scenarios count as a pause statement?
- **Pack:** stated, partly. **Cross-family check:** disagree, fully stated.
- **Passage.** "We will require a strong argument that catastrophic risk is contained … We will delay AI development and deployment as needed to achieve this, until and unless we no longer believe we have a significant lead." (PDF p. 17, Appendix A, row "Anthropic in the lead"). The introduction says Anthropic "would strongly consider pausing" in other cases.
- **Reading.** A delay until required safeguards (here, a strong argument) exist is what the criterion asks for. It applies only in two named scenarios; outside them the wording is "strongly consider", which is weaker. The dataset records that the earlier general commitment not to train or deploy without safeguards is absent from this edition; the note must keep that.
- **Recommendation.** "Stated", with the scenario conditions and the "strongly consider" wording in the note. Apply the same to RSP v3.0–v3.3.
- **Follows from a rule:** yes, from Rule B.

### 4. `meta-aasf-v2-0.D1.persuasion` — Meta Advanced AI Scaling Framework v2.0

- **Question.** Does a scams-and-fraud scenario that lists "grooming" and "messaging" as enabling capabilities make persuasion a tracked domain?
- **Pack:** not found. **Cross-family check:** partly.
- **Passage.** "Cyber 3: Large-scale casualties or significant financial loss to individuals or organizations via scaled long form fraud, extortion, and scams." Threat scenario TS.3.1 is "enabled by automation of victim targeting, messaging, scam content/personality generation, grooming" (PDF p. 19, Cybersecurity table).
- **Reading.** The domain is cybersecurity, measured by casualties or financial loss. Persuasion and manipulation are not named; the edition has no match for "persua" or "manipul". The stored record already lists Cyber 3 as a passage set aside.
- **Recommendation.** Keep "not found". The note already points a reader to Cyber 3; no change needed.
- **Follows from a rule:** yes, from the criterion as worded (it asks that persuasion or manipulation be named). Under Rule B "partly" needs the thing named; here it is not.

### 5. `preparedness-beta-2023.D7.external` — OpenAI Preparedness Framework (Beta), December 2023

- **Question.** Does "alerting distribution partners", listed as a possible mitigation, count as external reporting?
- **Pack:** not found. **Cross-family check:** partly (an adjacent passage was omitted).
- **Passage.** "these mitigations might span increasing compartmentalization, restricting deployment to trusted users, implementing refusals, redacting training data, or alerting distribution partners." (PDF p. 14, Mitigations, first paragraph).
- **Reading.** One option in a list of possible mitigations ("might"), not a disclosure the edition says it will make.
- **Recommendation.** Keep "not found". Close the item.
- **Follows from a rule:** yes. Your 2026-10-26 ruling (C8) added this passage and the p. 25 audit passage as context; that has been applied.

### 6. `meta-aasf-v2-0.D6.competitor` — Meta Advanced AI Scaling Framework v2.0

- **Question.** Does a scope test that compares a model with "the most advanced models" condition Meta's commitments on what other developers have?
- **Pack:** not found. **Cross-family check:** partly; distinguish a scope test from a waiver of safeguards, or exclude it in the criterion.
- **Passage.** A model counts as Frontier AI if it "is reasonably likely to be more capable in any of the catastrophic risk domains … than our existing models or the most advanced models" (PDF p. 41, Appendix I). §2.1.1 compares a planned model "against our own models and those available externally" to set a "reference class" (PDF p. 4).
- **Reading.** Both decide which models the framework covers and which assessments it plans. Neither relaxes or adjusts a safeguard. The p. 41 comparison is one of two alternative criteria for scope; the other is training compute of at least 10^26 operations. Read literally, "conditions … commitments" could still catch a scope test, because coverage decides whether any commitment applies.
- **Recommendation.** Keep "not found" (already applied, with both passages in the note). To stop the question recurring, add one sentence to the D6.competitor criterion: "Scope tests that decide whether a model is covered by the framework are recorded as context, not counted."
- **Follows from a rule:** yes for the status (your D6.competitor ruling, applied). The added sentence is a small open decision.

### 7. `ms-fgf-2026.D1.other` — Microsoft Frontier Governance Framework, February 2026

- **Question.** Is Microsoft's separately named "Loss of control" capability a full D1.other entry, or only partly one because it has no threshold?
- **Pack:** stated, partly (changed from not found on 2026-10-26). **Cross-family check:** partly; it needed a cross-reference and an overlap rule.
- **Passage.** Under "Tracked high-risk capabilities": "Loss of control. A model's ability to undermine effective human control through adaptive, deceptive, or self-reinforcing mechanisms such that, when deployed, a model can no longer be reliably directed, modified, or shut down." (PDF p. 4, printed p. 3). Appendix I: "We are researching approaches to evaluating models for loss of control risk … and setting appropriate risk acceptance criteria for this tracked high-risk capability." (PDF p. 15, printed p. 14).
- **Reading.** The edition names it as tracked, in those words. The D1 criteria ask that a domain be named as tracked; they do not ask for a threshold. The lack of thresholds is a fact for the note.
- **Recommendation.** "Stated", keeping the note on the missing thresholds. The cross-family request is met by your overlap rule.
- **Follows from a rule:** yes. The placement follows from your D1 overlap rule (defined through "deceptive" mechanisms that undermine control). The "stated" status follows from Rule B. Whether the shorter copy under D1.autonomy stays is item 17.

### 8. `rsp-2023.D1.cbrn` — Anthropic RSP v1.0 (September 2023)

- **Question.** Does naming CBRN as a "domain of interest" for threat models and evaluations, without a CBRN-specific threshold, meet the criterion fully?
- **Pack:** stated, partly. **Cross-family check:** disagree, fully stated.
- **Passage.** "Our ongoing project is focused on defining three factors sequentially for each domain of interest (CBRN and cyber risks)" (PDF p. 20, appendix "ASL-3 Evaluations for Misuse Risks"). The ASL-3 red-teaming commitment adds: "Misuse domains should at a minimum include causes of extreme CBRN risks, and cybersecurity." (PDF p. 8).
- **Reading.** The criterion is met if the edition names CBRN "as a domain it tracks **or** sets a threshold for". CBRN is named as a domain for evaluation and for required red-teaming. The ASL-3 misuse threshold itself is worded for all domains, which belongs in the note.
- **Recommendation.** "Stated", keeping the note. Apply the same to `rsp-2023.D1.cyber` (same passages).
- **Follows from a rule:** yes, from the criterion as worded and Rule B.

### 9. `rsp-v3-0.D4.oversight` — Anthropic RSP v3.0

- **Question.** Does a Board and LTBT approval that is required only in one case give them a full oversight role?
- **Pack:** stated, partly. **Cross-family check:** disagree, fully stated.
- **Passage.** "In the event that marginal risk analysis (see previous section) plays a major role in a decision to move forward, explicit approval of the Risk Report by the Board and LTBT (rather than just the CEO and RSO) will be required." (PDF p. 12, §3.4 item 5).
- **Reading.** An approval role over a decision to move forward is a role "in overseeing or reviewing those decisions". The criterion does not ask that the role cover every decision. In the other cases the Board and LTBT are informed after approval (item 4), which belongs in the note.
- **Recommendation.** "Stated", with the condition in the note. Apply the same to RSP v3.1–v3.4 after checking that each keeps item 5.
- **Follows from a rule:** yes, from Rule B.

### 10. `fsf-v2-0.D8.changes` — Google DeepMind FSF v2.0 (February 2025)

- **Question.** Do changes stated in a footnote and in passing count, when the edition has no consolidated changelog?
- **Pack:** stated, partly. **Cross-family check:** disagree, fully stated.
- **Passage.** "Note that we have removed the Autonomy risk domain, which was included in Frontier Safety Framework version 1.0. Most of the advanced risk that was captured by this CCL is now covered by our misalignment section." (PDF p. 5, Table 1, footnote 9). Also "we have updated our CCLs and underlying threat models from version 1.0" (PDF p. 8).
- **Reading.** The criterion asks for "the edition's own statement (changelog, introduction or summary) of what changed". A footnote stating a removal is such a statement. The "Updates and changes" page (PDF p. 9) lists only v1.0 and a corrected link; that is a fact for the note, not a reason for "partly".
- **Recommendation.** "Stated", keeping the note and the qualification that most autonomy risk moved into the misalignment section.
- **Follows from a rule:** yes, from Rule B.

### 11. `ms-fgf-2026.D1.persuasion` — Microsoft Frontier Governance Framework, February 2026

- **Question.** Is "Harmful manipulation", named as a tracked capability but without thresholds, a full persuasion entry?
- **Pack:** stated, partly. **Cross-family check:** disagree, fully stated (compare xAI, whose named domain is fully stated).
- **Passage.** "Harmful manipulation. A model's ability to strategically distort human behavior or beliefs at scale." (PDF p. 4, printed p. 3, under "Tracked high-risk capabilities"). Appendix I: "We are researching approaches to evaluating models for manipulation risk in a pre-deployment context and setting appropriate risk acceptance criteria for this tracked high-risk capability." (PDF p. 15).
- **Reading.** The edition names manipulation as tracked, which is what the criterion asks. The absent thresholds are a fact for the note, as in item 7.
- **Recommendation.** "Stated", keeping the note on thresholds and the prohibition on manipulative use of Microsoft's services (PDF p. 15).
- **Follows from a rule:** yes, from Rule B.

### 12. `rsp-v3-4.D7.external` — Anthropic RSP v3.4 (note errors)

- **Question.** Two facts in the note: which table row says threat content will be shared with policymakers, and is a justification for redactions promised or aimed at?
- **Pack:** stated; the note attributes policymaker sharing to the "misaligned AI systems in high-stakes settings" row and says redactions are disclosed "with a brief, possibly very high-level justification". **Cross-family check:** partly; note error.
- **Passage.** In the row "Novel chemical/biological weapons production", company column: "we will identify the most concerning specific threat pathways, create policy recommendations for early detection and response for such threats, and share this content with policymakers." (PDF p. 7). §3.5: "disclose the existence of each redaction made in the public version of the report and aim to give a brief justification for such redactions" (PDF p. 14).
- **Reading.** The check is right on both points. The misaligned-AI row (PDF pp. 7–8) has no policymaker sharing. The justification is an aim; the disclosure of each redaction is a commitment.
- **Recommendation.** Correct the note: name the chemical and biological weapons row, and write "and aim to give a brief justification". Status stays "stated". Check the same row and sentence in RSP v3.0–v3.3 when applying.
- **Follows from a rule:** yes, from the editorial policy (conditional wording is kept). A factual correction, not a judgement.

### 13. `meta-aasf-v2-0.D1.autonomy` — Meta Advanced AI Scaling Framework v2.0

- **Question.** The quoted passage only names "Loss of Control". Should the cell quote the autonomy and AI R&D content itself?
- **Pack:** stated, with the AI R&D content in the note only. **Cross-family check:** partly; add the direct evidence from pp. 22–24.
- **Passage.** Loss of Control 1, threat scenario TS.1.1: "AI development accelerates such that new capabilities and behaviors emerge faster than the organization's evaluation processes." Enabling capability: "Autonomous AI R&D: Ability to autonomously and consistently complete tasks which are representative of the work of a researcher to progress AI development." (PDF pp. 22–23, Loss of Control table).
- **Reading.** These passages are what places the cell under D1.autonomy. The p. 1 sentence alone ("Chemical & Biological, Cybersecurity, and Loss of Control") does not show it. Meta frames them as enabling capabilities of a control-failure outcome, not as a domain of their own; the note says so.
- **Recommendation.** Add the TS.1.1 and "Autonomous AI R&D" passages as a second entry (about 40 words; the edition would stay under the 400-word pack limit, at about 357). Status stays "stated".
- **Follows from a rule:** no rule decides it; it is a quotation-sufficiency fix. Low risk.

### 14. `ms-fgf-2026.D2.levels` — Microsoft Frontier Governance Framework, February 2026 (note overstatement)

- **Question.** Does every tracked capability have the four-level table, as the note says?
- **Pack:** stated; the note says "Each tracked capability is scored on these four risk levels, defined per capability in Appendix I". **Cross-family check:** partly; note overstatement.
- **Passage.** Appendix I has Low/Medium/High/Critical tables for "CBRN weapons" (PDF p. 12), "Offensive cyberoperations" (PDF p. 13) and "Advanced autonomy" (PDF p. 14). For loss of control and harmful manipulation it says only: "We are researching approaches to evaluating models for … risk in a pre-deployment context and setting appropriate risk acceptance criteria" (PDF p. 15).
- **Reading.** The check is right. Three of the five tracked capabilities have level definitions.
- **Recommendation.** Correct the note: levels are defined for CBRN, offensive cyberoperations and advanced autonomy (PDF pp. 12–14); for loss of control and harmful manipulation Appendix I states that evaluation approaches and risk acceptance criteria are being researched (PDF p. 15). Status stays "stated". The February 2025 edition tracks only those three capabilities, each with a table (PDF pp. 11–13), so its note is not affected.
- **Follows from a rule:** yes; a factual correction against the edition.

## Part 3. Cells left borderline on 2026-10-26

### 15. `meta-aasf-v2-0.D1.other` — Meta's Loss of Control domain

- **Question.** Under the overlap rule, does any part of Meta's Loss of Control domain also belong under D1.other (deception or undermining oversight)?
- **Pack:** D1.other is "stated, partly" with physical autonomy only (an emerging outcome, PDF p. 36). Loss of Control is under D1.autonomy. **Cross-family check:** said control-mechanism failures are "not reducible to autonomy alone" (no per-cell verdict on D1.other).
- **Passage.** The domain is defined through "failures of critical control mechanisms—that is, technical and organizational measures which enable us to direct, modify, contain, or shut down AI" (PDF p. 22). Outcome "Loss of Control 2: Loss of ability to monitor AI behavior during operation", threat scenario "TS.2.1* AI disables or corrupts monitors to reduce oversight and accomplish its objectives." (PDF p. 23). TS.1.2 lists "Selective evaluation-adaptive behavior" (PDF p. 23).
- **Reading.** The definition is an outcome (failed controls), so the overlap rule does not place the whole domain. Its two named outcomes split: Loss of Control 1 rests on autonomous AI R&D (D1.autonomy, item 13); Loss of Control 2 is defined as AI undermining oversight, which is what the rule sends to D1.other. This is the same treatment as DeepMind v3.1's combined domain, recorded under both rows.
- **Recommendation.** Add Loss of Control 2 (TS.2.1) as an entry under `meta-aasf-v2-0.D1.other`, keep physical autonomy as a second entry, and make the cell "stated" (Loss of Control is one of the three areas the framework "currently focuses on", PDF p. 1, not an emerging outcome). Note in both cells that Meta names one domain.
- **Follows from a rule:** partly. The rule settles where "undermining oversight" goes; whether to split one publisher domain by its named outcomes is **open**.

### 16. `ms-fgf-2025.D6.competitor` and `ms-fgf-2026.D6.competitor` — Microsoft's "marginal uplift"

- **Question.** Does a risk assessment that "considers" uplift over open-weights models condition Microsoft's safeguards on what other developers have?
- **Pack:** both "stated, partly". **Cross-family check:** agreed with "partly" after comparison (its blind reading was "stated").
- **Passage.** "This holistic risk assessment also considers the marginal capability uplift a model may provide over and above currently available tools and information, including currently available open-weights models." (PDF p. 7, both editions). The assessment results "then inform" the risk level (2025) or "may also inform" it (2026).
- **Reading.** The risk level decides whether "further review and mitigations" are required, so what is available elsewhere can affect safeguards. It is one input among several, it does not name other developers, and it states no change to safeguards. DeepMind v3.1, by contrast, ties other models' weaker mitigations directly to deployment acceptance (PDF p. 7, "the marginal risk added by our external deployment is likely low") and is "stated". Meta's comparison only decides scope (item 6) and is "not found".
- **Recommendation.** Keep "stated, partly" for both editions. Under Rule B this is the case of an input to a determination where the criterion asks for a provision that adjusts safeguards. Keep the 2025 "then inform" and 2026 "may also inform" difference in the notes.
- **Follows from a rule:** no; **open**, with a recommendation. Rule B supports the "partly" reading.

### 17. `ms-fgf-2026.D1.autonomy` entry 2 — Microsoft's loss of control under both D1 rows

- **Question.** Should the loss-of-control passage leave D1.autonomy now that it is recorded under D1.other, and would that force moves in DeepMind v3.1 and xAI December 2025?
- **Pack:** recorded under both rows (`ms-fgf-2026.D1.autonomy.2` and `ms-fgf-2026.D1.other.1`), citing the DeepMind and xAI precedent.
- **Passage.** Microsoft names "Advanced autonomy. A model's ability to complete expert-level tasks autonomously, including AI research and development." and, as a separate bullet, "Loss of control. A model's ability to undermine effective human control through adaptive, deceptive, or self-reinforcing mechanisms" (PDF p. 4).
- **Reading.** Microsoft has two separate named capabilities. The overlap rule sends each to one row: advanced autonomy to D1.autonomy, loss of control (defined through deceptive mechanisms) to D1.other. The precedents are different cases:
  - **DeepMind FSF v3.1.** One sentence names one combined domain, "machine learning R&D and misalignment" (PDF p. 5, §1.3.1), and is quoted under both rows. Each row takes one half of a single publisher domain. The rule is met; no move needed.
  - **xAI FAIF December 2025.** Different passages: D1.autonomy quotes the category "loss of control" (PDF p. 1), which the edition approaches through replication or shutdown-prevention scenarios using cyber capabilities (PDF p. 2); D1.other quotes the MASK dishonesty criterion (PDF p. 7). The edition does not define loss of control through deception; it measures deception as a propensity that "might exacerbate" it. No move needed. (D1.autonomy stays "partly" under Rule B, as the category is not named through autonomy capabilities.)
  - **xAI FAIF June 2026** (not re-read: archive only). The stored definition, "risks from humans losing the ability to reliably direct, modify, or shut down a model" (PDF p. 1), is an outcome. It stays under D1.autonomy as on 2026-10-26.
- **Recommendation.** Remove entry `ms-fgf-2026.D1.autonomy.2`; keep the cross-reference in the D1.autonomy note. D1.autonomy stays "stated" on entry 1. No change to DeepMind v3.1 or either xAI edition.
- **Follows from a rule:** yes, from the D1 overlap rule. The 2026-10-26 record kept both entries only because of the precedent, which on reading does not apply.

## Part 4. Other items still marked open

### 18. xAI FAIF June 2026: `faif-2026.D4.determination`, `D4.oversight`, `D6.competitor`, `D8.changes`

- **Question.** Can the four "not found" cells that awaited an archive check be closed?
- **Pack:** all four "not found"; README decision 8 says they await an archive check. **Archive check of 2026-10-26** ([report](../research/archive-checks-2026-10-26/codex-report.md), cross-family): edition confirmed ("Effective Date: 30 June 2026", bytes match the recorded SHA-256); all four "not found" confirmed. D4.determination: "The edition attributes risk acceptance to xAI but names no responsible office or decision body." D6.competitor checked against your narrowed criterion. D8.changes: no changelog; that report notes its blindness for this cell was compromised by the edition notes.
- **Not re-read here.** web.archive.org is not reachable from this environment.
- **Recommendation.** Close all four as "not found". In the applying task, add the archive capture (2026-07-16) to each cell's record and update README decision 8.
- **Follows from a rule:** yes; the check you asked for has been run.

### Not covered by this memo

README decisions 5 (re-check Meta Frontier AI Framework v1.1 from an archive) and 6 (add further frameworks, such as xAI's February 2025 Risk Management Framework draft found by the cross-family check) remain open. They are scope decisions, not cell disagreements.
