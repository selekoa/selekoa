# Independent verification of the three week 4a assessments

Model: Codex, based on GPT-6. The precise serving-model variant is not exposed in this session.

Check date: 2026-10-04. Input: `review/week4a-contested-for-cross-model.md` at `be7a450`, fetched from `origin/week4a-framework-provisions`. Verdicts assess the records, not which policy position is correct.

| Record                                                | Verdict  | Principal issue                                                                                                  |
| ----------------------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------- |
| `rsp-v2-0-assessed-weakening`                         | disagree | Retaining the core safeguard commitment does not contradict reduced specificity/verifiability.                   |
| `rsp-v3-0-assessed-weakening`                         | disagree | Overall commitment strength, future security commitments, and expected effectiveness are different propositions. |
| `assessed-preparedness-v2-high-deployment-mitigation` | disagree | The paper's analysis of governance affordances is recast as a claim about the wording of one rule.               |

## Method and limits

I inspected all 21 evidence items, including their surroundings, in priority order: RSP v2.0, RSP v3.0, then Preparedness v2. I opened every distinct cited live URL and supplied archive. HTML quote comparisons decoded entities and collapsed layout whitespace; case and quotation-mark differences were checked separately. PDFs were fetched and read in memory using PDF.js, with physical page numbers distinguished from printed numbers. No source downloads, screenshots, audit logs, data edits or review decisions were saved.

No earlier cross-model verdict report or QA/audit file under `review/` was opened. No Git log or commit-message inspection was requested. The worktree creation command automatically printed the starting commit's subject; that incidental exposure is the only exception to complete blindness to commit messages. This is a separate source-reading pass, not execution independence from the shared tools and repository.

The web reader could not open the Wayback URLs; direct HTTP retrieval succeeded. Its TIME extraction returned unrelated sponsored material, so I verified TIME through direct live and archived retrieval. Direct retrieval of the live OpenAI announcement returned HTTP 403 during the literal-comparison pass; the web reader supplied its article text and the archive was directly accessible. The web reader's arXiv screenshot requests failed; direct PDF extraction succeeded. These tool failures did not prevent passage checks.

The supplied arXiv archive is an abstract page captured on 2025-12-05, identifying v2, revised on 2025-10-13. It does not itself contain the PDF passages. Following the corresponding archived PDF route redirected to a **2026-09-16 19:23:23** capture. That PDF is byte-identical to the pinned live v2 PDF; I do not claim to have inspected a PDF captured on 2025-12-05. I also inspected the quoted passages in v1. The live and archived agent-card PDFs are **not** byte-identical, but their cited page, quote and surrounding paragraph match.

The omission check comprised three targeted searches, one per assessment, and inspection of one additional competent source surfaced by them. It was not an exhaustive literature search. No result establishes implementation, compliance, legal enforceability or human editorial acceptance.

## `rsp-v2-0-assessed-weakening`: disagree

### Passage and locator checks

Checked [SaferAI's article](https://www.safer-ai.org/anthropics-responsible-scaling-policy-update-makes-a-step-backwards) and its [2024-11-09 archive](https://web.archive.org/web/20241109111638/https://www.safer-ai.org/post/anthropics-responsible-scaling-policy-update-makes-a-step-backwards), plus [Anthropic's announcement](https://www.anthropic.com/news/announcing-our-updated-responsible-scaling-policy) and its [2024-10-20 archive](https://web.archive.org/web/20241020211824/https://www.anthropic.com/news/announcing-our-updated-responsible-scaling-policy).

Evidence IDs below use the prefix `evidence-rsp-v2-0-assessed-weakening-`.

| Suffix          | Check                                                                                                                                              | Relationship to the present proposition                                                         |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `saferai-title` | Live headline matches exactly. Archived headline has the same words in title case.                                                                 | Supporting overall criticism, but less specific than the causal proposition.                    |
| `saferai`       | Live quote matches. Archive has identical words with straight rather than curly quotation marks. Second body paragraph, final sentence is correct. | Supports the criticism of verifiability/accountability.                                         |
| `anthropic`     | Paraphrase is faithful in both copies. It covers the first **two** body paragraphs, not just the opening paragraph.                                | Context: a retained core commitment and claimed improvements do not deny reduced verifiability. |

### Framing, attribution and status

SaferAI links its negative assessment to less precise thresholds and mitigation specifications. Anthropic maintains its central safeguard condition while describing improvements. Retaining that condition is compatible with making its details less verifiable. Calling changes improvements also need not deny weakening in a particular dimension. The qualification already admits that Anthropic does not address verifiability; placing its passage under `contradicts` overstates the disagreement.

The statement also makes the greater precision of v1.0 an unqualified premise. That is SaferAI's characterisation here, not a textual comparison established by these three evidence items. Attribution to SaferAI and Anthropic is otherwise appropriate, and the selected passages represent their positions.

No direct publisher answer to SaferAI's specific accountability criticism was found in this bounded search. The present evidence does not justify `contested` for this exact proposition. This is not a conclusion that SaferAI is right.

### Exact suggested fixes

1. Change `evidence-rsp-v2-0-assessed-weakening-anthropic.support` from `contradicts` to `context`. Change its locator to **Opening, first and second body paragraphs**.
2. Remove the qualification's assertion that both sides describe precisely the same shift. State instead: **SaferAI characterises the revision as replacing precise thresholds and mitigation specifications with qualitative descriptions; Anthropic describes greater flexibility and retained core safeguards. These passages do not establish opposing assessments of verifiability.**
3. If retaining the current proposition, obtain a passage that directly denies the claimed weakening before retaining `contested`. Do not switch to `unresolved` while leaving `supports` evidence, or relabel genuine support merely to satisfy validation. Pending such evidence, withhold this assessment record from admission/curated reliance rather than manufacture a two-sided dispute.
4. An alternative open question would be: **Did RSP v2.0's changes to threshold and mitigation specification reduce the verifiability of Anthropic's safety commitments relative to v1.0?** This changes the proposition and requires a new stable ID with `supersedes`, `resolution: unresolved`, and contextual attributed assessments only. Its qualification must explain that the packet contains criticism but no direct opposing assessment of that dimension.

## `rsp-v3-0-assessed-weakening`: disagree

### Passage and locator checks

Checked [Williams and Freund](https://www.governance.ai/analysis/anthropics-rsp-v3-0-how-it-works-whats-changed-and-some-reflections) and their [2026-03-06 archive](https://web.archive.org/web/20260306121636/https://www.governance.ai/analysis/anthropics-rsp-v3-0-how-it-works-whats-changed-and-some-reflections); [Perrigo's TIME report](https://time.com/7380854/exclusive-anthropic-drops-flagship-safety-pledge/) and its [2026-02-24 archive](https://web.archive.org/web/20260224202029/https://time.com/7380854/exclusive-anthropic-drops-flagship-safety-pledge/); [Anthropic's announcement](https://www.anthropic.com/news/responsible-scaling-policy-v3) and its [2026-02-24 archive](https://web.archive.org/web/20260224203226/https://www.anthropic.com/news/responsible-scaling-policy-v3); and [Karnofsky's post](https://www.lesswrong.com/posts/HzKuzrKfaDJvQqmjh/responsible-scaling-policy-v3) and its [2026-02-24 archive](https://web.archive.org/web/20260224202944/https://www.lesswrong.com/posts/HzKuzrKfaDJvQqmjh/responsible-scaling-policy-v3).

All 14 quotations match word for word in both live and archived text. The supplied locators identify the passages correctly; the TIME excerpts and `anthropic-realistic` intentionally stop before the sentence ends, as documented. Evidence IDs below use the prefix `evidence-rsp-v3-0-assessed-weakening-`.

| Suffix                 | Locator checked                                                                                                 | Placement assessment                                                                                |
| ---------------------- | --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `govai-future`         | What's changed, future-security item, first sentence                                                            | Narrower than a whole-policy assessment; move to context.                                           |
| `time-assessment`      | Paragraph beginning But overall, first sentence excerpt                                                         | Direct support for an overall reduction in constraints.                                             |
| `anthropic`            | Conclusion, first paragraph, second sentence                                                                    | Context: positive framing and more transparency are compatible with weaker substantive commitments. |
| `karnofsky-forcing`    | RSP v3's attempt to amplify the good and reduce the bad, final bullet of the roadmap comparison, first sentence | Context: expected incentive strength, not denial of weaker commitments overall.                     |
| `kaplan`               | Asked whether Anthropic was caving to market pressure, first sentence                                           | Context is correct. TIME's paraphrase of Kaplan, not a direct quotation from him.                   |
| `kaplan-u-turn`        | Kaplan, the Anthropic executive and co-founder, final sentence                                                  | Context is correct.                                                                                 |
| `time`                 | Paragraph beginning I like the emphasis, second sentence excerpt                                                | Context is correct; preserves the hedged concern.                                                   |
| `govai-concern`        | Reasons to be concerned, first sentence                                                                         | Context is correct.                                                                                 |
| `govai-balance`        | Summary, final bullet, first sentence; also Conclusion, final sentence                                          | Context is correct.                                                                                 |
| `govai-mitigations`    | Summary, third bullet, final sentence                                                                           | Context is correct.                                                                                 |
| `anthropic-realistic`  | Assessing our theory of change, final paragraph, second sentence excerpt                                        | Context is correct.                                                                                 |
| `anthropic-goals`      | Frontier Safety Roadmap, second paragraph, first sentence                                                       | Context is correct.                                                                                 |
| `kaplan-unilateral`    | Paragraph beginning We felt, second sentence                                                                    | Context is correct.                                                                                 |
| `karnofsky-unilateral` | Q&A, move away from implied unilateral commitments, second answer, first paragraph, second sentence             | Context is correct.                                                                                 |

### Framing, attribution and status

The whole-policy proposition is clear syntactically, but its evidence addresses different dimensions. Williams and Freund assess future security commitments specifically and favour honesty about constraints overall. Their article expressly disclaims organisational attribution. Its live version records a **2026-03-17 update**, after the supplied archive, concerning competitor-matching commitments; the four selected quotes are unchanged.

TIME's assessment addresses overall constraint. The retained contextual excerpts fairly distinguish Perrigo's reporting, Kaplan's answers and Painter's concern. Anthropic's favourable description does not assert that overall commitments remain as strong.

Karnofsky discusses whether roadmap incentives will be as powerful as the old commitments. He identifies offsetting influences, treats the net question as open, and warns that reporting requirements do not force good reports or roadmaps. His position favours the revision's expected effects; it does not deny that substantive commitments became weaker. The curator note's assertion that he disputes weaker roadmap commitments taken as a whole is stronger than the cited passage. His disclaimer and leadership of the revision are correctly reported.

The qualification's balanced detail is useful, but it cannot turn those adjacent assessments into contradictions. `Contested` is not justified for the present proposition after correcting placement.

### Missing-source check

The additional [SaferAI tracker page](https://tracker.safer-ai.org/company/anthropic/) offers relevant criticism of reduced commitments. However, it currently analyses **RSP v3.3**, the June 2026 compliance framework and later supporting documents. It cannot simply be admitted as an assessment of v3.0 versus v2.2. Locate an edition-specific historical expression before proposing it. No direct missing counterassessment of whole-policy commitment strength was identified in the bounded search.

### Exact suggested fixes

1. Change `govai-future.support` to `context` for this whole-policy proposition. Its quote should support only a separately scoped future-security assessment, if such an assessment is authorised.
2. Change `anthropic.support` and `karnofsky-forcing.support` from `contradicts` to `context`.
3. Replace the substantive sentence in the `karnofsky-forcing` curator note with: **Karnofsky expects more specific and realistic goals to improve their forcing function despite weaker consequences for missing them; he leaves the net incentive effect uncertain. This does not deny weaker commitments overall.**
4. Retain the remaining ten contextual placements and TIME's direct supporting placement. Do not retain `contested` without a source actually denying the whole-policy proposition. As with v2.0, do not create an invalid unresolved record containing support, or hide genuine support through a mechanical role change.
5. If the intended record is instead an unresolved net assessment, use a new ID and **Whether RSP v3.0's new roadmap and transparency mechanisms compensate for its reduced unilateral commitments, in the policy's overall capacity to secure risk mitigation, remains unsettled.** Attach the current positions as `context` only and explicitly distinguish commitment strength from expected effectiveness. This is a different proposition, not a silent edit of the current one. It should remain unresolved unless opposing evidence addresses that same net question.

## `assessed-preparedness-v2-high-deployment-mitigation`: disagree

### Passage and locator checks

Checked the [pinned Coggins et al. v2 abstract](https://arxiv.org/abs/2509.24394v2), [v2 PDF](https://arxiv.org/pdf/2509.24394v2), [v1 PDF](https://arxiv.org/pdf/2509.24394v1) and the [supplied abstract archive](https://web.archive.org/web/20251205152906/https://arxiv.org/abs/2509.24394), with the PDF capture limitation above; the [agent system card](https://cdn.openai.com/pdf/839e66fc-602c-48bf-81d3-b21eacc3459d/chatgpt_agent_system_card.pdf) and its [2025-07-17 archive](https://web.archive.org/web/20250717201643/https://cdn.openai.com/pdf/839e66fc-602c-48bf-81d3-b21eacc3459d/chatgpt_agent_system_card.pdf); and [OpenAI's announcement](https://openai.com/index/updating-our-preparedness-framework/) and its [2025-04-16 archive](https://web.archive.org/web/20250416173732/https://openai.com/index/updating-our-preparedness-framework/).

I also inspected the [framework itself](https://cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf), physical p. 4, printed p. 3: the separately recorded provision quotation and locator are correct.

Evidence IDs below use the prefix `evidence-assessed-preparedness-v2-high-deployment-mitigation-`.

| Suffix               | Check                                                                                            | Placement assessment                                                                                                 |
| -------------------- | ------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| `coggins-conclusion` | Exact in v2 and v1, physical/printed p. 14, Conclusions, first sentence                          | Framework-wide conclusion; context for an assessment restricted to the wording of one rule.                          |
| `coggins-ceo`        | Exact in v2 and v1, physical/printed p. 11, Results, Key result #3 heading                       | Supports a governance/discretion criticism, not a linguistic reading of the isolated High rule.                      |
| `agent-card`         | Exact in both copies, physical p. 16, printed p. 15, section 5, first paragraph, second sentence | OpenAI's stated mitigation commitment; relevant to the obligation question but not independent proof of a guarantee. |
| `openai`             | Exact live and archived excerpt; second body paragraph, first sentence                           | Current excerpt is correctly contextual: it compares requirements with the predecessor.                              |

### Framing, attribution and status

Coggins et al. analyse what governance arrangements afford, including leadership discretion and accountability. Their technical notion of a demand concerns mechanisms that cannot be worked around. Failure to guarantee conduct is different from failure to state an obligation. The packet narrows their framework-wide critique into a claim about the wording of one sentence and omits that conceptual distinction.

The authors do discuss High/Critical safeguards under Key result #3, so the deployment connection is substantive. Nevertheless, their criticism is of the governance structure around the rule. OpenAI's agent-card passage accurately reports its own position and predates the paper; the packet correctly avoids calling it a reply. The listed authors and attributions are correct. The supplied 2025-09-29 date is the initial submission date; identify 2025-10-13 separately as the v2 revision date.

### Obviously missing passage

The already-cited OpenAI announcement's **Clarified capability levels** bullet explicitly states a predeployment safeguard requirement for covered High-capability systems. That is much closer to the proposition than the comparative phrase currently extracted. Its live and archived wording agrees. This is a missing relevant passage, not a missing publisher. No direct OpenAI response to this paper was found in the bounded search.

### Exact suggested fixes

1. Replace the proposition, under a new ID with `supersedes`, with: **Preparedness Framework v2's governance arrangements permit OpenAI Leadership to deploy models with High capabilities without safeguards that sufficiently minimize their associated risks.** This captures the disputed permissiveness question rather than whether one sentence states a condition.
2. For that replacement, use `coggins-ceo` as `supports`, with the following Results paragraph included as locator context. Change `coggins-conclusion` to `context`, since its scope includes evaluation, Medium capabilities and governance across the framework.
3. Add separately identified evidence from OpenAI's **Clarified capability levels** bullet, specifically its sentence about covered High-capability systems requiring safeguards before deployment, as `contradicts`. Preserve its scope to covered systems. Keep the existing comparative `openai` excerpt as `context`; the agent-card statement can remain corroborating publisher-position evidence.
4. The replacement can be `contested` if the qualification explicitly sets the authors' reading of leadership discretion against OpenAI's stated predeployment requirement, without deciding whether override authority actually defeats that requirement. State that this is a disagreement about policy permissiveness, not a finding of deployment without safeguards, a legal ruling, or a guarantee of compliance.
5. If retaining the original wording-only proposition instead, reclassify both Coggins items as `context` and do not claim a two-sided dispute from them. Do not mark it unresolved with the agent-card item still on a side. Keep the supported textual provision separate from any open governance assessment.

## Disposition

These are proposed corrections only. No claim, evidence role, editorial state, verification state or human decision was changed. The two RSP records need a directly shared proposition or a deliberately scoped unresolved question; Preparedness can represent a genuine governance disagreement once the proposition and publisher passage are aligned. Machine disagreement here requires maintainer triage, not promotion or resolution by vote.
