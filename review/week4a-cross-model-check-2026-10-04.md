# Week 4a contested records: fresh-context source check (2026-10-04)

Checks the three records in [`week4a-contested-for-cross-model.md`](week4a-contested-for-cross-model.md) against their original sources. No dataset file was changed.

## Status and independence

- **Checker.** Claude Opus 5.5 (`claude-opus-5-5`, Anthropic), working in a fresh Claude Code session on branch `week4a-framework-provisions` at `b868dce`. Sources were retrieved on 2026-10-03 and 2026-10-04.
- **This is not the cross-model check the packet asks for.** The commits that added and revised these records (`baa9a33`, `b868dce`) carry a Claude Opus 5.5 co-author trailer. The checker is therefore the same model family that proposed, curated and machine-checked the records. Treat this report as another same-family fresh-context check; the different-model-family condition is still unmet. Two of the three records assess Anthropic's own policy, and the checker is an Anthropic model.
- **Inputs read.** The packet; the stored claim, evidence and source rows for the three claims (the packet matches them); `docs/ontology.md`; `docs/editorial-policy.md`. The week 4a QA, follow-up, stop-case and framework-audit records were not opened. The two commit messages were read to establish provenance; each includes a short QA summary.
- **Method.** Each live page and each cited Internet Archive capture was downloaded. HTML was reduced to text, and PDFs were read through their text layer. Every quote was matched as an exact string and read in its full passage, and live and archived article bodies were compared. Web searches looked for missing sources and for direct replies (queries listed at the end).
- **Retrieval.** Every cited page and capture was retrieved. The Wayback Machine refused parallel requests (HTTP 429); sequential retries succeeded. The cited arXiv capture holds only the abstract page, so the paper's quotes were checked against arXiv's versioned PDFs (v1 and v2). The provision quote was checked against the live OpenAI PDF only, because the packet gives no archive link for it.

## Verdicts

| Record                                                | Verdict                       | Main reason                                                                                                                                                                                                               |
| ----------------------------------------------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `rsp-v2-0-assessed-weakening`                         | disagree (minor; fix wording) | Quotes are exact. The broadened proposition lets SaferAI (precision, verifiability) and Anthropic (its core commitment is kept) argue about different things.                                                             |
| `rsp-v3-0-assessed-weakening`                         | disagree                      | Quotes are exact. Both Kaplan items answer neighbouring questions (motive, a U-turn), and his concession in the same article is left out. Karnofsky's post is missing. The statement mixes partial and overall weakening. |
| `assessed-preparedness-v2-high-deployment-mitigation` | disagree                      | Quotes are exact. OpenAI's "stronger requirements" fragment compares Version 2 with its predecessor and is compatible with Coggins et al. "In practice" is ambiguous and echoes that fragment.                            |

## Quotes and locators (17 of 17 evidence items)

Every quote matches its source word for word, in the live copy and in the cited archive copy. Differences are typographic only (letter case, straight or curly quotation marks).

| Evidence item                                                                     | Result                                       | Locator                       | Notes                                                                                                                                                                    |
| --------------------------------------------------------------------------------- | -------------------------------------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `evidence-rsp-v2-0-assessed-weakening-saferai-title`                              | exact (live)                                 | correct                       | The 2026-02-03 capture and the 2024-11-09 capture (see below) both show a title-case headline. The sentence-case form is a later restyling.                              |
| `evidence-rsp-v2-0-assessed-weakening-saferai`                                    | exact in live, 2026-02-03 and 2024-11-09     | correct (2nd body paragraph)  | The 2024 capture uses straight quotation marks.                                                                                                                          |
| `evidence-rsp-v2-0-assessed-weakening-anthropic` (paraphrase)                     | faithful; live and 2024-10-20 text identical | correct                       | "lists the changes as key improvements" overstates: the source names three changes as key improvements. The paraphrase also reuses a 12-word run of the source verbatim. |
| `evidence-rsp-v3-0-assessed-weakening-govai-future`                               | exact in live and 2026-03-06                 | correct                       |                                                                                                                                                                          |
| `evidence-rsp-v3-0-assessed-weakening-time-assessment`                            | exact in live and 2026-02-24                 | correct                       | The reporter's own assessment, not attributed to a source.                                                                                                               |
| `evidence-rsp-v3-0-assessed-weakening-kaplan`                                     | exact                                        | correct                       | TIME's paraphrase of Kaplan, not his words.                                                                                                                              |
| `evidence-rsp-v3-0-assessed-weakening-anthropic`                                  | exact in live and 2026-02-24                 | correct                       | The section is headed "Conclusion"; naming it would help.                                                                                                                |
| `evidence-rsp-v3-0-assessed-weakening-kaplan-u-turn`                              | exact                                        | correct                       |                                                                                                                                                                          |
| `evidence-rsp-v3-0-assessed-weakening-time` (Painter)                             | exact                                        | correct                       |                                                                                                                                                                          |
| `evidence-rsp-v3-0-assessed-weakening-govai-concern`                              | exact                                        | correct                       |                                                                                                                                                                          |
| `evidence-rsp-v3-0-assessed-weakening-govai-balance`                              | exact                                        | correct but loose             | It is the Summary's final bullet, and the Conclusion's final sentence.                                                                                                   |
| `evidence-rsp-v3-0-assessed-weakening-govai-mitigations`                          | exact                                        | ambiguous                     | The Summary is a lead sentence plus bullets. The quote ends the third bullet; it is the "fourth paragraph" only if the lead sentence counts.                             |
| `evidence-rsp-v3-0-assessed-weakening-anthropic-realistic`                        | exact                                        | correct                       |                                                                                                                                                                          |
| `evidence-rsp-v3-0-assessed-weakening-anthropic-goals`                            | exact                                        | correct                       |                                                                                                                                                                          |
| `evidence-assessed-preparedness-v2-high-deployment-mitigation-coggins-conclusion` | exact (v2 PDF p. 14; identical in v1 p. 14)  | heading wrong                 | The heading is "Conclusions" (plural). The PDF text layer has a straight apostrophe in "OpenAI's".                                                                       |
| `evidence-assessed-preparedness-v2-high-deployment-mitigation-coggins-ceo`        | exact (v2 PDF p. 11; identical in v1 p. 11)  | correct                       |                                                                                                                                                                          |
| `evidence-assessed-preparedness-v2-high-deployment-mitigation-openai`             | exact in live and 2025-04-16                 | correct                       | Mid-sentence excerpt, not distorted.                                                                                                                                     |
| (packet context) `prov-preparedness-v2-high-deployment-restriction`               | exact                                        | correct (PDF p. 4, printed 3) | The next paragraph states that OpenAI Leadership can approve or reject the Safety Advisory Group's recommendations.                                                      |

Findings about changing or archived copies:

1. **SaferAI: an earlier capture exists.** The post was first published at an earlier address with a `/post/` path segment. The Internet Archive holds a capture there from 2024-11-09, 17 days after publication, and further captures before the move (a 301 redirect on 2026-02-03). Its body matches the live page word for word. The source record's statement that the 2026-02-03 capture is the earliest located is wrong.
2. **TIME: the live article was revised after capture.** Its structured data gives a modification date of 2026-08-04. The third paragraph now attributes the decision to overhaul the RSP to the company over recent months, rather than to CEO Dario Amodei earlier that month. The page carries no correction notice. The quoted passages are unchanged.
3. **GovAI:** the update of 17 March 2026 (already recorded) added sentences about the commitment to match competitors' mitigations. The quoted passages are unchanged.
4. **Unchanged.** The Anthropic v2.0 announcement, the Anthropic v3.0 release and the OpenAI announcement have identical article text in the live and archived copies (headings and typography aside).

## `rsp-v2-0-assessed-weakening`: disagree (minor)

**Proposition (checks 2 and 5).** SaferAI's argument is specific. It says v2.0 replaced precisely defined thresholds and mitigation measures with qualitative descriptions and objectives. In SaferAI's view this reduced transparency and accountability, left Anthropic more leeway, invited shifting goalposts and changed the nature of the commitments. SaferAI does not say that Anthropic lowered the level of safety it requires. "Weakened Anthropic's safety commitments" is vaguer, and can be read as exactly that unmade claim. On that reading, Anthropic's statement that it keeps its core commitment answers something SaferAI never argued. The qualification itself concedes that Anthropic does not address verifiability. So the broadening makes the two sides appear to meet where they partly pass each other.

A narrower proposition is more faithful. The narrowest, that v2.0 made the commitments less verifiable, would leave no publisher statement on the other side, and the record would have to be unresolved. The wording recommended below keeps SaferAI's mechanism and its verdict. Anthropic's opening paragraph genuinely disputes it: it presents the same move to flexibility as an improvement that keeps the core commitment.

**Sides (checks 2 and 7).** Both SaferAI items address the proposition. The Anthropic item addresses the recommended wording. Under the current wording it speaks to a different aspect (the substance of the core commitment), so its placement depends on the broadening.

**Attribution (check 3).** The SaferAI post is unsigned and written in the organisation's voice, so organisational attribution is correct. The quoted sentence represents the post fairly; the post records no offsetting improvement. Anthropic's attribution is correct, and the paraphrase is fair apart from the overstatement noted above.

**Missing sources (check 4).** No Anthropic reply to SaferAI was found. One optional addition is Zach Stein-Perlman's AI Lab Watch post of 2024-10-16, published the day after the update. He agrees that the ASL-3 deployment mitigations became more abstract and that the RSP ties Anthropic's hands less, but calls that shift acceptable. Separately, he judges the change in evaluation cadence weaker than v1.0. The post shows the criticism was not SaferAI's alone, and that one critic accepted the flexibility. Anthropic's announcement also says that it needed more flexibility ("Learning from experience", second paragraph, final sentence), which records the shift both sides accept.

**Suggested fixes.**

1. Statement: "RSP v2.0's move from v1.0's more precisely specified capability thresholds and mitigation measures to a more flexible, qualitative approach weakened Anthropic's safety commitments."
2. Qualification: "Contested assessment, not a finding. Both sides describe the same shift: Anthropic calls v2.0 a more flexible and nuanced approach; SaferAI says it replaced precisely defined capability thresholds and mitigation measures with qualitative descriptions. SaferAI judges the shift a step backwards that reduces transparency and accountability and asks stakeholders to trust Anthropic rather than providing verifiable commitments and metrics; it lowered Anthropic's rating from 2.2 to 1.9. Anthropic presents the update as a set of key improvements that maintains its commitment not to train or deploy models unless adequate safeguards are implemented; it does not address verifiability as such. The textual changes are recorded separately, and the record does not decide between these positions." If fix 5 is applied, add after the first clause: "and says it needed more flexibility".
3. `evidence-rsp-v2-0-assessed-weakening-anthropic`: replace "and lists the changes as key improvements" with "and names new capability thresholds, refined assessment processes and new internal-governance and external-input measures as key improvements". Also remove the verbatim 12-word run. Better still, update the reuse note of `source-anthropic-rsp-officers-2024`, which predates the short-quotation rule, and quote the opening paragraph's second sentence (31 words).
4. `source-saferai-rsp-2024`: set `archivedUrl` to `https://web.archive.org/web/20241109111638/https://www.safer-ai.org/post/anthropics-responsible-scaling-policy-update-makes-a-step-backwards` and `archivedAt` to 2024-11-09. Correct the version note, and record that the headline was in title case at publication.
5. Optional: add the AI Lab Watch post (supports; attributed to Stein-Perlman) and Anthropic's flexibility sentence (context).

## `rsp-v3-0-assessed-weakening`: disagree

**Proposition (check 2).** "Weakened Anthropic's safety commitments" can mean two things:

- (a) fewer or softer binding pledges;
- (b) a weaker safety regime overall, once the new commitments are counted.

On (a) the sources barely disagree:

- In the same TIME article, Kaplan says unilateral commitments no longer made sense while competitors pressed ahead (fourth paragraph).
- Holden Karnofsky, who led the revision, writes that it removes unilateral commitments and is less self-binding.
- Anthropic's release adopts "more realistic" unilateral commitments and calls its roadmap goals something other than hard commitments.
- TIME and the GovAI authors both report that the pause commitment was dropped.

The genuine disagreement is over (b):

- TIME judges that, overall, Anthropic is far less constrained.
- Anthropic says the revision amplifies what worked and adds transparency commitments.
- Karnofsky argues that more specific, realistic roadmap goals may offset the weaker penalty for missing them, and that the new RSP is better for risk reduction.

The statement should say (b).

**Sides (checks 2 and 7).**

- `evidence-rsp-v3-0-assessed-weakening-kaplan` is TIME's paraphrase of Kaplan's answer to whether Anthropic was caving to market pressure, which is a question of motive. "Commitment" there means dedication to developing AI safely, not a policy pledge, and dedication is compatible with fewer pledges. It belongs in context.
- `evidence-rsp-v3-0-assessed-weakening-kaplan-u-turn` comes from the paragraph in which, TIME says, Kaplan denied a capitulation to market incentives. Denying a U-turn (a reversal) does not deny a weakening. It belongs in context.
- Both Kaplan items look placed for balance. The record also omits Kaplan's concession from the same article.
- `evidence-rsp-v3-0-assessed-weakening-anthropic` (the closing sentence) is a genuine opposing characterisation of the revision as a whole, although its last clause concedes that industry recommendations are now separated from company commitments. Keep it as contradicting under wording (b).
- `evidence-rsp-v3-0-assessed-weakening-time-assessment` is on point and explicitly says "overall". `evidence-rsp-v3-0-assessed-weakening-govai-future` is on point at a narrower scope (future security commitments); keep it and state that scope in the qualification.
- The six existing context items are correctly classified.

**Attribution (check 3).**

- GovAI: attributing the post to its authors is correct; the page says its research blog posts represent their authors' views.
- TIME's "far less constrained" sentence is the reporter's own assessment. "TIME reports" makes it read as a reported fact; "TIME's report judges" is more accurate.
- Painter's view is correctly attributed. TIME also reports that he reviewed an early draft with Anthropic's permission, which the curator note should say.
- Kaplan: the qualification's "called the change a renewed commitment" turns TIME's paraphrase into Kaplan's own words. Use "argued that Anthropic was making a renewed commitment to developing AI safely".

**Missing sources (check 4).** Clearly missing: Holden Karnofsky, "Responsible Scaling Policy v3", LessWrong, 2026-02-24 20:20 UTC, <https://www.lesswrong.com/posts/HzKuzrKfaDJvQqmjh/responsible-scaling-policy-v3>.

- He says the views are his own and not Anthropic's, and that he led the revision.
- It is the fullest statement from the Anthropic side, and it answers the weakening criticism directly. The GovAI post already cited refers readers to it.
- It cuts both ways: it concedes the loosening of binding commitments and argues that the new structure is better for risk reduction.

Optional context: GovAI's "What's changed" item on unilateral and industry-wide commitments says the old commitments were conditional in principle because of an escape clause. That limits how large the weakening is, and Karnofsky makes the same point.

Not needed: Zvi Mowshowitz's post "A Matter of Trust", and the Wall Street Journal headline it cites, add support but no new position.

**Suggested fixes.**

1. Statement: "Taken as a whole, RSP v3.0 weakened Anthropic's safety commitments relative to v2.2."
2. `evidence-rsp-v3-0-assessed-weakening-kaplan`: change to context. Note: "Answers a question about motive (market pressure); 'commitment' here means dedication to developing AI safely, not a policy pledge."
3. `evidence-rsp-v3-0-assessed-weakening-kaplan-u-turn`: change to context. Note: "Denies a reversal, not a weakening; TIME frames the paragraph as a denial of capitulation to market incentives."
4. Add as context: TIME, fourth paragraph (Kaplan's first direct quotes), second quoted sentence: Kaplan's statement that unilateral commitments made no sense while competitors pressed ahead.
5. Add a source record and two evidence items for Karnofsky's post, attributed to him, not to Anthropic:
   - contradicts: section "RSP v3's attempt to amplify the good and reduce the bad", final bullet of the list weighing the Roadmap against the old commitments (a weaker "or else" offset by more specific, realistic goals);
   - context: Q&A, "On the move away from implied unilateral commitments", answer to the second question, first paragraph, second sentence (the revision removes unilateral commitments and gives more flexibility).
6. Qualification: "Contested assessment, not a finding. Both sides accept the main changes: v3.0 drops the implied commitment to pause development and deployment when required safeguards cannot be met, recasts higher-tier mitigations as industry-wide recommendations, adds Risk Reports, and introduces a Frontier Safety Roadmap whose goals are public goals rather than hard commitments. The dispute is over the whole. TIME's report judges that overall the change leaves Anthropic far less constrained by its own safety policies. Sophie Williams and Jonas Freund, in a GovAI post representing their own views, judge that it weakened future security commitments, while noting that existing mitigations are not lowered and concluding on balance that honesty about constraints is better than commitments that would not be followed. Anthropic describes the revision as amplifying what worked and committing it to more transparency. Holden Karnofsky, who led the revision and writes in his own name, accepts that it is less self-binding but argues that more specific and realistic roadmap goals may offset the weaker penalty for missing them. Jared Kaplan told TIME the change was neither a U-turn nor a capitulation to market pressure. METR's Chris Painter, who reviewed an early draft, called it understandable but was concerned it might enable a gradual “frog-boiling” effect. The textual changes are recorded separately, and the record does not decide between these positions." Keep each sentence only if the record's evidence or notes back it.
7. Locators:
   - `evidence-rsp-v3-0-assessed-weakening-govai-mitigations`: "Summary, third bullet, final sentence".
   - `evidence-rsp-v3-0-assessed-weakening-govai-balance`: "Summary, final bullet, first sentence (repeated as the Conclusion's final sentence)".
8. `evidence-rsp-v3-0-assessed-weakening-time` curator note: add that TIME reports Painter reviewed an early draft with Anthropic's permission.
9. `source-time-rsp-v3` version note: record the post-capture revision (finding 2), and name the 2026-02-24 capture as the expression checked.

After fixes 1–5 the record keeps evidence on both sides (TIME and GovAI against Anthropic and Karnofsky) from more than two publishers.

## `assessed-preparedness-v2-high-deployment-mitigation`: disagree

**OpenAI's evidence (check 6).** Predating the analysis does not by itself disqualify a statement; what matters is what it asserts.

- The fragment says Version 2 sets stronger requirements than before for what sufficient risk minimisation means. That compares the update with its predecessor. It does not claim that the rule binds OpenAI whatever its leadership decides.
- It is compatible with Coggins et al.: requirements can be stronger than the Beta's and still not oblige mitigation. AI Lab Watch's review of the same edition holds both views at once, calling it clearly better than the old framework and not much of a commitment.
- The same OpenAI page describes the features Coggins et al. rely on: the Safety Advisory Group's guidance goes to OpenAI Leadership for final decisions, and requirements may be adjusted if a competitor releases a high-risk system. Both sides accept those facts.

Recommendation: context.

That leaves no contradicting evidence, so on its current evidence the record cannot stay contested. Two routes:

- **Preferred, if publisher self-characterisation keeps counting as a side (as in the two RSP records):** admit an OpenAI statement that actually describes the framework as binding OpenAI to mitigation. The closest one found is in the ChatGPT agent system card (OpenAI, 2025-07-17): PDF p. 16 (printed p. 15), §5 "Preparedness Framework", first paragraph, second sentence. There OpenAI says the framework commits it to track and mitigate the risk of severe harm, including by implementing safeguards that sufficiently minimize the risk for highly capable models. Caveats: it predates Coggins et al. and is not a reply; it is standard self-description; and the same section reports that OpenAI applied the rule, which this record does not assess.
- **Otherwise:** change the resolution to unresolved.

**Proposition (check 2).** "In practice" is ambiguous.

- Coggins et al. analyse what the text affords, and the qualification excludes how OpenAI applies the rule. Yet "in practice" invites implementation evidence, such as the system cards in which OpenAI reports activating High safeguards.
- It also echoes the "in practice" of the OpenAI fragment, where the words qualify what "sufficiently minimize" means. The proposition looks worded to fit the opposing quote (check 7).
- Coggins et al.'s conclusion concerns the whole framework. They do not quote or analyse the High-deployment sentence itself, only the decision process around it. Their deployment-specific ground is Key result #3: OpenAI Leadership can approve or reject the Safety Advisory Group's recommendations (Preparedness Framework v2, PDF p. 4), and requirements may be adjusted if a competitor releases a system (§4.3). The framework-level conclusion entails the provision-level claim, so the supporting role is sound, but the qualification should say how.

**Attribution (check 3).** Correct. The paper has six named authors and is an arXiv preprint; the arXiv page records no journal publication. Both quotes represent it fairly; the conclusion is the paper's thesis. The OpenAI fragment is excerpted without distortion, but its placement loses its comparative sense.

**Missing sources (check 4).** No reply to Coggins et al. was found, from OpenAI or anyone else. One optional supporting source sits closer to the provision than the paper: Zach Stein-Perlman, "OpenAI rewrote its Preparedness Framework", AI Lab Watch, 2025-04-18. He argues that the High safeguard standard ("sufficiently minimize") is too vague to say anything, and that the framework is neither much of a commitment nor strong enough to constrain OpenAI. Attribute it to him.

**Suggested fixes.**

1. Statement: "Preparedness Framework Version 2's rule that models reaching a High capability threshold are not deployed until their risks are sufficiently minimized does not, as worded, oblige OpenAI to mitigate those risks before deployment." Object label: "Whether the High-capability deployment rule, as worded, obliges OpenAI to mitigate risks before deployment".
2. `evidence-assessed-preparedness-v2-high-deployment-mitigation-openai`: change to context. Note: "Compares Version 2 with its predecessor (stronger than before) and is compatible with the critics' position; it does not say the rule binds OpenAI."
3. Contradicting evidence: add the system-card statement above, or change the resolution to unresolved.
4. Qualification, contested route: "Contested assessment of what the rule's wording obliges, not a finding about what the text says or how OpenAI applies it. Coggins et al. (2025), analysing the framework's wording, conclude that it does not guarantee any AI risk mitigation practices; their deployment-specific ground is that OpenAI Leadership can approve or reject the Safety Advisory Group's recommendations, so that OpenAI's CEO may deploy even more dangerous capabilities, especially if other developers do so. OpenAI describes the framework as committing it to implement safeguards that sufficiently minimize the risk for highly capable models; that statement predates the analysis and is not a reply to it. OpenAI's announcement that Version 2 sets stronger requirements than before is context: a comparison with the earlier framework, compatible with either position. The rule's own wording is recorded in prov-preparedness-v2-high-deployment-restriction. The record does not decide between these positions." Unresolved route: "Unresolved assessment of what the rule's wording obliges, not a finding about what the text says or how OpenAI applies it. Coggins et al. (2025), analysing the framework's wording, conclude that it does not guarantee any AI risk mitigation practices; their deployment-specific ground is that OpenAI Leadership can approve or reject the Safety Advisory Group's recommendations, so that OpenAI's CEO may deploy even more dangerous capabilities, especially if other developers do so. No competent source disputing this reading was found. OpenAI's announcement that Version 2 sets stronger requirements than before compares it with the earlier framework and is recorded as context. The rule's own wording is recorded in prov-preparedness-v2-high-deployment-restriction. The record does not resolve the question."
5. `evidence-assessed-preparedness-v2-high-deployment-mitigation-coggins-conclusion` locator: "PDF p. 14, Conclusions, first sentence (arXiv:2509.24394v2; identical in v1)".
6. Optional: add the AI Lab Watch post as supporting evidence.
7. Policy wording to settle if the unresolved route is taken: the record would keep Coggins et al. as supporting evidence. The ontology and the validation code allow supporting evidence on an unresolved record, but `docs/editorial-policy.md` says unresolved questions "may carry only contextual or contradictory material", which can be read as forbidding it.

## Placement for balance (check 7)

- **RSP v2.0:** partly. The proposition was broadened so that Anthropic's statement could count; the qualification concedes the mismatch. The recommended wording removes the need.
- **RSP v3.0:** yes, for both Kaplan items (motive; U-turn). The Anthropic closing sentence is a genuine opposing characterisation. Karnofsky's post would supply a substantive one.
- **Preparedness v2:** yes. The OpenAI fragment is comparative and compatible with the critics, and the proposition's "in practice" mirrors it.
- **Supporting evidence:** no supporting item was found that is there only for balance.

## Wording that leans (packet check 4)

- RSP v3.0 qualification: "TIME reports" presents an assessment as reported fact, and "Anthropic itself describes" implies an admission. Use neutral verbs.
- RSP v2.0 and Preparedness v2 qualifications pair "judged" or "conclude" for critics with "presented … as" for publishers. Parallel verbs would be more even.

## Sources consulted beyond the packet

- SaferAI capture at the earlier address, 2024-11-09: <https://web.archive.org/web/20241109111638/https://www.safer-ai.org/post/anthropics-responsible-scaling-policy-update-makes-a-step-backwards>
- Holden Karnofsky, "Responsible Scaling Policy v3", LessWrong, 2026-02-24: <https://www.lesswrong.com/posts/HzKuzrKfaDJvQqmjh/responsible-scaling-policy-v3>
- Zach Stein-Perlman, "Anthropic rewrote its RSP", AI Lab Watch, 2024-10-16: <https://ailabwatch.substack.com/p/anthropic-rewrote-its-rsp>
- Zach Stein-Perlman, "OpenAI rewrote its Preparedness Framework", AI Lab Watch, 2025-04-18: <https://ailabwatch.substack.com/p/openai-rewrote-its-preparedness-framework>
- OpenAI, ChatGPT agent system card, 2025-07-17: <https://cdn.openai.com/pdf/839e66fc-602c-48bf-81d3-b21eacc3459d/chatgpt_agent_system_card.pdf>
- OpenAI, Preparedness Framework Version 2 (provision context): <https://cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf>
- Read, not recommended as evidence: Zvi Mowshowitz, "Anthropic Responsible Scaling Policy v3: A Matter of Trust" (2026); Fortune (2025-04-16) and TechCrunch (2025-04-15) on the Preparedness Framework update. Neither news report contains an OpenAI reply to the criticism that the framework is not binding. TechCrunch notes only a general OpenAI denial that it is compromising on safety, made about testing timelines.

Search queries: Karnofsky's RSP v3 post; reactions to RSP v3.0 calling it a weakening; AI Lab Watch on the October 2024 RSP; analyses of Preparedness Framework Version 2 and its competitor-adjustment clause; OpenAI responses to critics of the framework's safeguards standard; SaferAI ratings of RSP v3; replies or rebuttals to Coggins et al.; OpenAI system cards applying High-capability safeguards. No search found a reply to Coggins et al., or an Anthropic reply to SaferAI.
