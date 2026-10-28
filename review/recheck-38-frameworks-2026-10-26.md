# Re-check of the framework comparison's "not found" cells (#38), 2026-10-26

**Status: complete for its scope (below).** Report only: no dataset record, pack cell, schema or code was changed. Corrections are proposals for a later PR after adjudication.

## Summary

| Items                                          | Count  | Absence holds | Passage found | Cannot verify |
| ---------------------------------------------- | ------ | ------------- | ------------- | ------------- |
| Anthropic RSP (v1.0, v3.0–v3.4)                | 11     | 11            | 0             | 0             |
| Google DeepMind FSF (v1.0, v2.0, v3.0, v3.1)   | 11     | 10            | 1             | 0             |
| OpenAI (Preparedness Framework beta, FGF 2026) | 3      | 2             | 1             | 0             |
| xAI FAIF (December 2025, June 2026)            | 8      | 4             | 0             | 4             |
| Meta Advanced AI Scaling Framework v2.0        | 2      | 1             | 1             | 0             |
| Microsoft FGF (2025, 2026)                     | 3      | 2             | 1             | 0             |
| **Total**                                      | **38** | **30**        | **4**         | **4**         |

Scope: every cell of `research/frontier-framework-comparison/pack.json` with status `not-found`, 38 cells in 17 editions, as merged in #38 (commit ce6db21) and unchanged since. The cross-family check (#44, `gpt-check-2026-10-15.md` and `.json`) was consulted after the blind reading for each cell.

The four cells where a passage was found are all facet-boundary cases, not missed text in the plain sense. In each, the edition has a passage that meets the facet's criterion as written, and the stored record set it aside under a narrower reading:

- **`fsf-2024.D7.external`.** The edition says it will publish substantive revisions of the Framework (PDF p. 6). The stored record files this under D8 only. The cross-family check disagreed on the same ground.
- **`ms-fgf-2026.D1.other`.** Loss of control is a separately named tracked capability, defined through "deceptive" mechanisms that undermine human control (PDF p. 4). The pack records it only under D1.autonomy. For DeepMind v3.1 and xAI December 2025, comparable misalignment or loss-of-control content is recorded under both D1.autonomy and D1.other. The cross-family check judged it partial.
- **`meta-aasf-v2-0.D6.competitor`.** Whether a model is Frontier AI, and so within the Framework, depends partly on whether it is more capable than "the most advanced models" (Appendix I, PDF p. 41). The reference class of comparable models includes "those available externally" (PDF p. 4). The stored record calls this scope, not a conditional provision. The cross-family check judged it partial.
- **`frontier-governance-2026.D6.competitor`.** The stored record left one passage "uncertain": no Model Report update is needed if the model is "similarly safe or safer (under Appendix 2.2 of the Code of Practice)" (PDF p. 18). The Code's Appendix 2.1 allows the safe reference model to be another provider's model, given enough information about it. The exemption is therefore a comparison that can be made against other developers' models. It governs report updates only.

The four xAI June 2026 cells cannot be verified. The publisher address now returns HTTP 404 with an XML `NoSuchKey` body, so the edition could not be re-read: `needs-archive-check`. The cross-family check matched its hash on 2026-10-15.

Every other edition's current publisher copy has the same SHA-256 as the pack's recorded retrieval. Every "hits not counted" entry that was re-searched matches the text layer. One stored record omits adjacent passages (`preparedness-beta-2023.D7.external`; wording only). One cross-family reason cites text that is not in the edition: it gives "historical changelog references to cyber" in RSP v3.0–v3.4, but those text layers contain no "cyber" string.

## Method

- **Blind first.** For each cell, the edition's text layer was searched with this check's own terms. The search covered the facet's criterion, the edition's domain lists, governance, disclosure, update and changelog sections, and appendices. The relevant pages were read in full before the stored `notFound` record and mapping note were opened. Terms were matched case-insensitively on page text normalised for whitespace, line-break hyphenation and invisible bidi or zero-width characters.
- **Blindness was partial.** This session had not prepared, audited or cross-checked the pack. Before the non-Anthropic cells were read, it read the pack README, `scope.md` (method only) and the summary table of the cross-family check, which names three of the four cells with a passage found here (`fsf-2024.D7.external`, `meta-aasf-v2-0.D6.competitor`, `ms-fgf-2026.D1.other`). It did not read the cross-family per-cell reasons before the blind reading. The fourth finding (`frontier-governance-2026.D6.competitor`) is not in the cross-family table.
- **Sources.** Each edition was re-retrieved on 2026-10-26 by direct HTTP from its recorded publisher address, sequentially with pauses, using the pack's own `tools.mjs fetch` (text layer by pdftotext). Hashes were compared with `pack.json`. The EU General-Purpose AI Code of Practice, Safety and Security chapter, was read at code-of-practice.ai (retrieved 2026-10-26) for the incorporated Appendix 2.1 and 2.2 test only.
- **Classification.** _Absence holds_: no passage meets the criterion and the stored hits-not-counted list is accurate. _Passage found_: a passage meets the criterion as worded (quotation and locator given). _Cannot verify_: the edition could not be re-read.
- **Not done.** Rendered-page inspection of tables and images. Every finding rests on the text layer. web.archive.org is unreachable from this environment.
- This is a machine check by the preparing model family ("same-family check"). It is not a cross-family check and not editorial acceptance. A cell records what an edition states; nothing here concerns implementation or compliance.

## Disagreements to adjudicate

1. **`fsf-2024.D7.external`** (Google DeepMind, Frontier Safety Framework v1.0, 2024-05-17; stored not found). The criterion is "Disclosure the edition says it will make to the public, to governments, or to other external parties". The edition says: "We expect it to evolve substantially as our understanding of the risks and benefits of frontier models improves, and we will publish substantive revisions as appropriate." (PDF p. 6, Future work, first paragraph). The stored record sets it aside because it "concerns the Framework itself (recorded under D8 Revision)". The criterion does not exclude disclosure of the framework itself. For other editions, does the pack count promises to publish framework updates under D7.external? The pack has no stated rule either way. The stakeholder-alerting passage on the same page stays context: it is a policy under exploration.  
   Proposed: Either (a) mark the cell "stated, partly" with this quotation and the note "Publication of framework revisions only; no commitment to disclose evaluation results, determinations or mitigations; alerting stakeholder bodies is under exploration (p. 6)", or (b) add to the D7.external criterion "excluding publication of the framework itself (see D8)" and apply that rule to every edition. Maintainer decision on the facet boundary.

2. **`ms-fgf-2026.D1.other`** (Microsoft, Frontier Governance Framework, February 2026; stored not found). Blind reading: "Loss of control. A model's ability to undermine effective human control through adaptive, deceptive, or self-reinforcing mechanisms such that, when deployed, a model can no longer be reliably directed, modified, or shut down." (PDF p. 4, §2, Tracked high-risk capabilities, fourth bullet). The change log lists "Adding harmful manipulation and loss of control as tracked high-risk capabilities" (PDF p. 16, Appendix II). The D1.other criterion's examples include "deceptive behaviour, sabotage of oversight". The stored cell records loss of control only under D1.autonomy. Two other editions have content that is not separately named in this way, and the pack records it under both facets. DeepMind v3.1 misalignment is under D1.autonomy and D1.other. xAI December 2025 loss of control is under D1.autonomy, with its deception propensity under D1.other.  
   Proposed: Set a single overlap rule (for example: loss of control or misalignment defined through deception or undermining oversight goes under D1.other; autonomy, replication and AI R&D go under D1.autonomy) and apply it to every edition. Under that rule, mark this cell "stated, partly" with the quotation above and the note "Separately named tracked capability without thresholds; Appendix I says risk acceptance criteria are being researched (p. 15)". Maintainer decision.

3. **`meta-aasf-v2-0.D6.competitor`** (Meta, Advanced AI Scaling Framework v2.0, published 2026-04-08 per the pack; stored not found). The criterion is "A provision that changes what the developer will do depending on what other developers do or have". Appendix I says a model is Frontier AI, and so in scope, if it "is reasonably likely to be more capable in any of the catastrophic risk domains we set out in this Framework (e.g., Chemical & Biological, Cybersecurity, or Loss of Control) than our existing models or the most advanced models" (PDF p. 41, Appendix I, Frontier AI, first criterion). §2.1.1 says: "We compare these various factors against our own models and those available externally. This allows us to identify an estimated 'reference class' of comparable models that we use throughout development to track how our model is performing and anticipate associated risks, required assessments, and assess the applicability of available mitigation strategies." (PDF p. 4). The stored record names the first passage and sets it aside as scope. The second passage is not in its hit list. Both make what Meta does (whether the Framework applies, which assessments are anticipated) depend partly on other developers' models. Neither waives a safeguard because others lack one.  
   Proposed: Mark "stated, partly" with the p. 41 passage and the note "Comparative scope and reference-class provisions, not a waiver of safeguards conditional on other developers". Alternatively, narrow the D6.competitor criterion to provisions that relax or adjust safeguards or commitments, and keep "not found" with both passages as context. Apply the chosen rule to every edition. Maintainer decision.

4. **`frontier-governance-2026.D6.competitor`** (OpenAI, Frontier Governance Framework, May 2026 edition, 2026-05-28 per the pack, undated copy; stored not found, one passage marked "uncertain"). Passage: "no update necessary if (1) the model's capabilities have not materially changed since the last update, (2) we plan to release a more capable model in less than a month, or (3) if the model is considered similarly safe or safer (under Appendix 2.2 of the Code of Practice)" (PDF p. 18, §4, Model Report updates). The incorporated test compares the model with a "safe reference model". Code of Practice, Safety and Security chapter, Appendix 2.1, point 2: "Such visibility is assumed for all models developed by the Signatory itself and for all models for which the Signatory has access to all information that would be necessary for the Signatory to complete the full systemic risk assessment and mitigation process … including the model parameters" (code-of-practice.ai, Safety and Security, Appendix 2.1, retrieved 2026-10-26; that copy's version was not checked against the FGF's date). The reference model can therefore be another developer's model, and the comparison can decide whether OpenAI updates a Model Report. The FGF itself does not say whose models it compares against.  
   Proposed: Resolve the stored "uncertain". Either mark "stated, partly" with the p. 18 quotation and the note "Exemption from Model Report updates by reference to the EU Code of Practice's similarly-safe-or-safer test, whose safe reference model may be another provider's model (Code, Appendix 2.1); governs reporting only, not safeguards", or keep "not found" and add that note as context. Maintainer decision; consistent with item 3.

## Could not be verified

- `faif-2026.D4.determination`, `faif-2026.D4.oversight`, `faif-2026.D6.competitor`, `faif-2026.D8.changes` (xAI FAIF, effective 2026-06-30). The recorded publisher address returned HTTP 404 with an XML `NoSuchKey` body on 2026-10-26. Two guessed xAI addresses returned 404, and the x.ai pages returned 403. A web search found no current publisher copy. One secondary tracker describes the edition (nine pages, effective 30 June 2026). That is not used as evidence. `needs-archive-check`. The stored records agree with the cross-family check, which retrieved the edition on 2026-10-15 with a matching hash.

## Other observations

- **Cross-family reason, RSP v3.0–v3.4 D1.cyber.** The cross-family check's reason for all five cells cites "Historical changelog references to cyber". None of the five text layers contains the string "cyber" (checked with pdftotext in default and raw modes). The pack's own records say there are no hits. The verdict (absence holds) is unaffected. If that reason is quoted anywhere, it should be corrected or checked against rendered pages.
- **`preparedness-beta-2023.D7.external`: hit list incomplete.** The absence of a disclosure commitment holds. The record omits two adjacent passages that a reader comparing editions would want: "alerting distribution partners" among possible mitigations (PDF p. 14, Mitigations, first paragraph), and "Scorecard evaluations (and corresponding mitigations) will be audited by qualified, independent third-parties to ensure accurate reporting of results" (PDF p. 25, Accountability, Audits). Neither is a disclosure to the public or governments. The cross-family check also noted the first passage.  
  Proposed: Add both to `hitsNotCounted` with the reason "conditional mitigation option / third-party audit, not a disclosure commitment".
- **`meta-aasf-v2-0.D1.persuasion`.** The absence of a separately named persuasion or manipulation domain holds. Cyber 3's scam scenario covers "automation of victim targeting, messaging, scam content/personality generation, grooming" (PDF p. 19, Cyber 3, TS.3.1). The stored record already notes this, and the cross-family check judged the cell partial. Consistent with item 3 and the open "stated, partly" decision in the pack README (decision 4).

## Per-item findings

Each entry gives the cell, the stored status, this check's classification and a note. "Re-search" names the terms this check used beyond the stored list. Where no quotation is given, no passage meeting the criterion was found.

### Anthropic Responsible Scaling Policy

- `rsp-2023.D1.persuasion` (v1.0, 2023-09-19): stored not found: **absence holds**. Terms: persua, manipulat, influenc, deceiv/decept, misinform/disinform, election, propaganda. Only hit: "misinformation" (PDF p. 1), listed among harms handled by "other areas of AI safety", complementary to the policy. Matches the stored list. Cross-family: agree.
- `rsp-v3-0.D1.cyber` (v3.0, 2026-02-24): stored not found: **absence holds**. Terms: cyber, hack, vulnerab, exploit, attack, intrusion, malware, critical infrastructure. No "cyber" in the text layer. "attackers" (PDF pp. 6, 8) and "scaled attacks and distillation attacks" (PDF p. 18, changelog) concern Anthropic's own security. The Automated R&D row's example domains are "energy, robotics, weapons development" (PDF p. 8). Matches the stored list.
- `rsp-v3-0.D1.persuasion`: stored not found: **absence holds**. "Evidence that AI models lack the propensity to deceive, manipulate, or sabotage users" (PDF p. 7) is evidence listed under high-stakes sabotage mitigations. "possibility of manipulation by AI systems" (PDF p. 9) concerns evidence used in risk assessment. Neither names a persuasion domain. Matches the stored record, which already flags the user-manipulation propensity as adjacent.
- `rsp-v3-1.D1.cyber`: stored not found: **absence holds**. Same text and hits as v3.0 (pp. 6, 8, 14, 18). No "cyber".
- `rsp-v3-1.D1.persuasion`: stored not found: **absence holds**. Same passages as v3.0 (pp. 7, 9).
- `rsp-v3-2.D1.cyber`: stored not found: **absence holds**. No "cyber". Hits as v3.1 (pp. 6, 8, 14, 19).
- `rsp-v3-2.D1.persuasion`: stored not found: **absence holds**. Same passages (pp. 7, 9). The extra "approve our selection of external reviewers" hit (the pattern "election" inside "selection") is irrelevant.
- `rsp-v3-3.D1.cyber`: stored not found: **absence holds**. No "cyber".
- `rsp-v3-3.D1.persuasion`: stored not found: **absence holds**. Same passages as v3.2, with the "manipulate users), but to a greater degree" sentence at PDF p. 9, as stored.
- `rsp-v3-4.D1.cyber`: stored not found: **absence holds**. No "cyber".
- `rsp-v3-4.D1.persuasion`: stored not found: **absence holds**. Same passages as v3.3.

### Google DeepMind Frontier Safety Framework

- `fsf-2024.D1.persuasion` (v1.0, 2024-05-17): stored not found: **absence holds**. No hit for any persuasion term. The domains are "Autonomy, Biosecurity, Cybersecurity, and Machine Learning R&D" (PDF p. 1). Future work lists misaligned AI, not persuasion (PDF p. 6).
- `fsf-2024.D4.determination`: stored not found: **absence holds**. "we will formulate a response plan" (PDF p. 2) names no person or body. "additional risks flagged by the review" (PDF p. 2) names no reviewer.
- `fsf-2024.D4.oversight`: stored not found: **absence holds**. "We will also explore how to appropriately involve independent third parties in our risk assessment and mitigation processes" (PDF p. 6) is an intention to explore. The stored record and mapping note are correct.
- `fsf-2024.D6.competitor`: stored not found: **absence holds**. "industry" hits are mitigation levels (PDF pp. 3–4). No conditional provision.
- `fsf-2024.D7.internal`: stored not found: **absence holds**. Logging is a security or deployment measure. No reporting requirement.
- `fsf-2024.D7.external`: stored not found: **passage found**. See Disagreement 1.
- `fsf-v2-0.D1.persuasion` (v2.0, 2025-02-04): stored not found: **absence holds**. Only "deceptive alignment" hits (PDF pp. 1–3, 6–8), defined as AI systems undermining human control (PDF p. 6).
- `fsf-v2-0.D4.oversight`: stored not found: **absence holds**. Response plans are "reviewed and approved by appropriate corporate governance bodies such as the Google DeepMind AGI Safety Council, Google DeepMind Responsibility and Safety Council, and/or Google Trust & Compliance Council" (PDF p. 7, Governance). These are internal councils, not a board or external party. External experts and evaluators are inputs (PDF p. 3).
- `fsf-v3-0.D4.oversight` (v3.0, 2025-09-22): stored not found: **absence holds**. No board, council or trust hits. "appropriate governance function" (PDF p. 9) and "appropriate corporate governance bodies" (PDF p. 16) are internal. External experts and evaluations are inputs (PDF pp. 5–6).
- `fsf-v3-0.D8.changes`: stored not found: **absence holds**. §5.3 "Past Updates and Changes" lists only "Version 2.0 (4 February 2025)" and "Version 1.0 (17 May 2024)" (PDF p. 16). No footnote or introduction describes changes. Re-search: previous version, earlier version, formerly, replac, no longer, revis, Version 2.
- `fsf-v3-1.D4.oversight` (v3.1, 2026-04-17): stored not found: **absence holds**. "This includes legal, compliance, and safety reviews with escalation procedures to ensure appropriate oversight." (PDF p. 16, §4.1) describes internal reviews. No board or external party.

### OpenAI

- `preparedness-beta-2023.D6.competitor` (Preparedness Framework beta, 2023-12-18): stored not found: **absence holds**. The p. 3 encouragement of "others in the industry to adopt similar approaches" conditions nothing. "baseline" hits are OpenAI's own safety baselines and human baselines (PDF pp. 2, 14, 16, 20, 26).
- `preparedness-beta-2023.D7.external`: stored not found: **absence holds**; hit list incomplete (see Other observations).
- `frontier-governance-2026.D6.competitor` (Frontier Governance Framework, May 2026 copy): stored not found: **passage found (partial, by incorporation)**. See Disagreement 4. Other hits are as stored: "industry best practices" (PDF p. 4), "industry bodies" (PDF p. 5), "insights from other deployed models" (PDF p. 7), "other incidents affecting the industry" (PDF p. 22).

### xAI Frontier Artificial Intelligence Framework

- `faif-2025.D1.persuasion` (2025-12-31): stored not found: **absence holds**. Deception and sycophancy are propensities that "might exacerbate loss of control risks" (PDF p. 2). "Genetic manipulation of animal-infecting pathogens" (PDF p. 5) and "attempted manipulation and adversarial attacks" (PDF p. 6) are not manipulation of people. "Public Understanding" (PDF p. 8) describes truth-seeking tools under exploration.
- `faif-2025.D4.determination`: stored not found: **absence holds**. "Risk owners" (PDF p. 9, §4) are assigned mitigation, audits and incident monitoring. "We will also balance various factors when making deployment decisions" (PDF p. 10, §5) names no decision-maker.
- `faif-2025.D4.oversight`: stored not found: **absence holds**. "public transparency and third-party review" (PDF p. 8) introduces possible publications. External red teams or government agencies may receive unredacted versions. Neither gives a review role over decisions.
- `faif-2025.D6.competitor`: stored not found: **absence holds**. "industry peers" (PDF pp. 2, 7) concerns collaboration and shared difficulty. The benefit-versus-risk release example (PDF p. 10) is discretion, not a competitor condition.
- `faif-2026.D4.determination` (effective 2026-06-30): **cannot verify** (`needs-archive-check`).
- `faif-2026.D4.oversight`: **cannot verify** (`needs-archive-check`).
- `faif-2026.D6.competitor`: **cannot verify** (`needs-archive-check`).
- `faif-2026.D8.changes`: **cannot verify** (`needs-archive-check`).

### Meta

- `meta-aasf-v2-0.D1.persuasion` (Advanced AI Scaling Framework v2.0): stored not found: **absence holds** (adjacent passage; see Other observations). No hit for "persua" or "manipulat". "tendency toward deception" (PDF p. 35) is a loss-of-control propensity.
- `meta-aasf-v2-0.D6.competitor`: stored not found: **passage found (partial)**. See Disagreement 3.

### Microsoft Frontier Governance Framework

- `ms-fgf-2025.D1.persuasion` (Version 1, February 2025): stored not found: **absence holds**. The only hit is "low-level spoofing, phishing, or social engineering attacks" in the Offensive cyberoperations Medium row (PDF p. 13, Appendix I).
- `ms-fgf-2025.D1.other`: stored not found: **absence holds**. The tracked list has three entries: CBRN weapons, Offensive cyberoperations and Advanced autonomy (PDF p. 4, §2). "We continue to study a range of potential capability-related risks" (same page) names none.
- `ms-fgf-2026.D1.other` (February 2026): stored not found: **passage found**. See Disagreement 2.
