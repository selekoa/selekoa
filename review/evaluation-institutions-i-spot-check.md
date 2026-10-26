# Evaluation Institutions I — human spot-check plan

Prepared 2026-09-27. **No human inspection or acceptance is recorded.** This is a proposed sample, not a completed review. All new claims remain seeds, not editorially accepted. Use the [generated working pack](evaluation-institutions-i-review.md) for complete statements and source passages. Applying returned decisions requires a separate task.

## Selection

One machine draw used Node's cryptographic `randomInt(19)` on the initial ordered increment and returned zero-based index **8**, `eval-i-anthropic-claude-card`. Subsequent audit reconciliation preserves that claim. This is random selection, not independent human checking. Four targeted additions cover another relation family, financial scope, mutable-source chronology and government attribution.

| Claim                           | Reason                                      | Original inspection                                                                                                                                                                |
| ------------------------------- | ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `eval-i-anthropic-claude-card`  | Random draw                                 | Claude 2 card title and section 2; distinguish model release date from unknown PDF publication date.                                                                               |
| `eval-i-arc-incubation`         | Institutional chronology and mutable source | September spin-out article paragraph 1; inspect retrospective edits and avoid dating incorporation from the headline.                                                              |
| `eval-i-o1-method`              | Different source/relation family            | o1-preview report, Details of Evaluation Procedure > Descriptions of task suites, item 1; compare the linked GPT-4o report. Does the text establish test-suite reuse specifically? |
| `eval-i-funding-credit`         | Quantitative and funding trigger            | Canary announcement paragraph 2; distinguish joint total, METR allocation and actual payment.                                                                                      |
| `eval-i-uk-metr-demonstrations` | Government attribution and dates            | UK AISI February report, autonomous-agent demonstration subsection; distinguish November 2023 event from February 2024 publication and later METR naming.                          |

Independently inspect identity, passage context, locator, date, qualification and review labels without relying on machine verdicts. Material errors expand review across the affected source or relation family. Before a guided reading is treated as curated, inspect EI-N1, EI-N4, EI-N6 and EI-N9 in [the research note](../docs/evaluation-institutions-i.md), including omissions and narrative framing.

**Human reviewer:**

**Inspection date:**

**Sample outcome:**

## Machine audit and disposition

A separate Codex sub-agent, `evaluation_source_audit`, inspected original sources without the proposing conversation or verdicts, then inspected the exact 19-claim draft, its sources/entities and predicate definitions. It reported GPT-6 family; exact serving model/version was unavailable. This establishes a separate agent/context pass, not a different model provider, independent execution infrastructure or human review. Raw tool output and generated audit logs are not tracked.

The audit required removal of the partnership-as-credit edge, narrowing methodological reuse to the explicitly reused test suite, retaining an unknown public-posting date for the BIS comment, and marking the interviewer's role description as secondary evidence. These corrections were applied. A follow-up pass supported the replacement government-demonstration credit and verified the corrections. It additionally corrected a section-heading locator and distinguished interview publication from recording date. The auditor did not independently verify the random-number draw. Existing ARC Evals/RSP records remain unchanged.

The independent source pass also checked public-institute announcements and parliamentary criticism/response. It flagged retrospective edits to the 2023 METR pages and the danger of converting agreements into completed evaluations. Necessary claim sources were accessible; government docket retrieval for the BIS comment failed in both passes. No historical snapshots, incorporation records, payments, confidential contracts or evaluation runs were independently verified. The transcript was not compared with its recording. Machine agreement does not establish completeness, certainty or human acceptance.

## Maintainer triage

| Trigger                            | Records/findings                                                                   | Disposition                                                                                                                       |
| ---------------------------------- | ---------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Mutable sources and chronology     | `eval-i-arc-incubation`, `eval-i-barnes-arc`, `eval-i-christiano-arc`; EI-N1/EI-N4 | Revision uncertainty retained; no METR board-role claim, incorporation day or current appointment. Human framing check requested. |
| Predicate disagreement             | Removed draft `eval-i-uk-credit-arc`; EI-N10                                       | Edge not admitted; partnership remains outside graph.                                                                             |
| Scope of methodological use        | `eval-i-o1-method`                                                                 | Narrowed to explicitly identical test suite and exact numbered-item locator.                                                      |
| Date and source-role ambiguity     | `eval-i-metr-bis-publication`, `eval-i-barnes-metr`                                | Unknown posting date; role evidence marked secondary.                                                                             |
| Funding quantities/terms           | `eval-i-funding-credit`; EI-N7                                                     | Joint amount and intended METR share separated; no payment or individual donor allocation inferred. Included in human sample.     |
| Conditional criticism and response | EI-N9                                                                              | Both positions preserved; named refusals and universal access failure unestablished.                                              |

These are review requests and scoped machine dispositions, not human editorial decisions.

## Supplied-audit closeout

The user supplied separate historical [Claude](evaluation-institutions-i-claude-audit.md) and [Grok](evaluation-institutions-i-grok-audit.md) reports. See the [closeout disposition](../docs/evaluation-institutions-i.md#audit-closeout) for their disagreement on 08 and 16 and the limits of known provenance. These machine reports do not complete any human inspection. The five selections and all human fields above remain unchanged and pending. Use the [new blank closeout pack](evaluation-institutions-i-closeout-review.md) for current text; the original pack remains a historical artifact.
