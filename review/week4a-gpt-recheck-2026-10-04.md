# Bounded re-check of the revised week 4a assessments

Model: Codex, based on GPT-6. The precise serving-model variant is not exposed in this session.

Date: 2026-10-04. Checked input: `review/week4a-contested-for-cross-model.md` at `7143d5071e268a9fe469a24b5d26c8d9cda52c28`.

| Record                                                | Verdict for the requested re-check |
| ----------------------------------------------------- | ---------------------------------- |
| `assessed-preparedness-v2-high-deployment-mitigation` | agree                              |
| `rsp-v2-0-assessed-weakening`                         | agree                              |
| `rsp-v3-0-assessed-weakening`                         | agree                              |

## Scope and method

This checks the requested substantive corrections against my earlier report, `review/week4a-gpt-check-2026-10-04.md`: Preparedness's proposition, evidence sides, new publisher passage and qualification; and the RSP records' unresolved status, contextual evidence and fairness of qualifications. It does not certify every recommendation in the earlier report, including record-ID/supersession handling and unchanged RSP quotation locators.

I compared the regenerated packet with the stored claims and evidence, reread the relevant Preparedness paper passage, and freshly retrieved the new OpenAI passage live and archived. The RSP qualification checks use the source passages verified in the preceding pass; I did not repeat that source collection or an omission search. No dataset edits, human review decisions or promotion are part of this report.

## Preparedness v2: agree

The proposition now addresses governance permissiveness: whether leadership can deploy High-capability models without sufficiently protective safeguards. It no longer converts a criticism of governance affordances into a linguistic claim about the isolated deployment-rule sentence. Read High capability here as the framework's defined capability category for covered systems, not an unrestricted description of any capable model.

The stored placements implement the proposed correction. Evidence IDs below use the prefix `evidence-assessed-preparedness-v2-high-deployment-mitigation-`.

| Suffix               | Stored role | Assessment                                                                                                                                                                                    |
| -------------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `coggins-ceo`        | supports    | Key result #3 and its following paragraph address leadership's ability to bypass safeguard recommendations for evaluated High/Critical capabilities. The locator now includes that paragraph. |
| `openai-high`        | contradicts | The publisher explicitly states a predeployment safeguard requirement for covered High-capability systems.                                                                                    |
| `agent-card`         | contradicts | Corroborates the publisher's stated mitigation commitment; it is not independent proof that the requirement cannot be overridden.                                                             |
| `coggins-conclusion` | context     | The conclusion also concerns evaluation scope and Medium capabilities; it is broader than this deployment-governance proposition.                                                             |
| `openai`             | context     | The comparative claim about stronger requirements does not decide permissiveness.                                                                                                             |

The [pinned paper, v2](https://arxiv.org/pdf/2509.24394v2), physical p. 11, Results, Key result #3 and the following paragraph, supports the governance reading attributed to the authors. The qualification keeps their interpretation distinct from OpenAI's stated requirement, distinguishes leadership from the advisory group, records the v1 and v2 dates, and leaves the override question undecided.

### New OpenAI passage

Freshly checked against the [live announcement](https://openai.com/index/updating-our-preparedness-framework/) and the [2025-04-16 17:37:32 archive](https://web.archive.org/web/20250416173732/https://openai.com/index/updating-our-preparedness-framework/). The full recorded sentence matches word for word, including capitalization and final punctuation, in both:

> Covered systems that reach High capability must have safeguards that sufficiently minimize the associated risk of severe harm before they are deployed.

The locator is correct: the **Clarified capability levels** bullet, sentence beginning **Covered systems that reach High capability**. The qualifier **covered systems** is retained in the quote, curator note and claim qualification. It is a requirement before deployment, not a requirement for all risks or all systems, and not evidence of actual compliance. The surrounding discussion distinguishes Critical capability and assigns recommendations to the Safety Advisory Group and final decisions to leadership.

The qualification accurately says both publisher statements predate the paper and are not replies to it. It avoids declaring that leadership authority defeats the requirement, that an unsafe deployment occurred, or that the framework guarantees compliance. `Contested` is justified for this expressly attributed interpretive disagreement.

Required fixes within the requested scope: **none**.

## RSP v2.0: agree

The record now asks the proposed open question about verifiability, rather than asserting a contested weakening of safety commitments. Stored resolution is `unresolved`; all **three** attached evidence items are `context`, with zero `supports` and zero `contradicts`.

The qualification preserves SaferAI's criticism and rating reduction, attributes the description of reduced specification to SaferAI, and fairly records Anthropic's greater flexibility and retained core safeguards. It explicitly says these are not opposing assessments of verifiability and that no direct counterassessment is supplied. Anthropic's favourable framing is no longer manufactured into a contradiction.

SaferAI offers an affirmative assessment relevant to the question; contextual placement must not be read as denying that criticism exists. The revised qualification makes it visible while leaving the open question unadjudicated, as the earlier proposed unresolved treatment required. This is not evidence of a demonstrated two-sided dispute or a finding that verifiability was unchanged.

Required fixes within the requested scope: **none**.

## RSP v3.0: agree

The proposition now concerns the unsettled net effect: whether roadmap and transparency mechanisms compensate for reduced unilateral commitments in securing risk mitigation. Stored resolution is `unresolved`; all **14** attached evidence items are `context`, with zero `supports` and zero `contradicts`.

The qualification separates commitment strength from expected effectiveness. TIME's assessment of reduced constraint and Williams and Freund's narrower assessment of future security commitments remain visible, without being presented as answers to the compensation question. Existing mitigations, the authors' favourable judgement about honesty, their personal rather than institutional attribution, and the article's later update are retained.

Anthropic's favourable description remains its own position. Karnofsky's revised note now reports offsetting incentive effects and uncertainty, rather than claiming that he denies weaker commitments overall. Kaplan's motive/reversal comments and Painter's hedged concern are retained without turning them into verdicts on the net effect. The qualification does not present any of these passages as settling the new proposition.

This implements the proposed unresolved treatment without silently declaring either weaker commitments or more promising incentives to be the decisive dimension.

Required fixes within the requested scope: **none**.

## Disposition

Agreement is limited to implementation of the requested substantive corrections. It is not a new independent audit of unchanged passages, validation of implementation or compliance, or human editorial acceptance. Only this report is authorised for the commit.
