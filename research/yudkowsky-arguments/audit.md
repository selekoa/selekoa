# Candidate pack 1: preparation and fresh-context audit

Report dated 2026-10-06. It records how `pack.json` was prepared and checked. Machine checks are not human review; no human has inspected these records.

## Preparation

- **Retrieval:** a single Claude Code session (Claude Opus 5.5) retrieved the corpus described in [scope.md](scope.md) on 2026-10-06 through `scripts/yudkowsky-arguments.mjs`. There were 22 paged LessWrong GraphQL requests for 1,076 posts, 17 posting-day version requests and 16 direct document fetches. No request failed. The posting-day version of one post ("Re: recent Anthropic safety research", 2025) is unavailable from the API.
- **Passage finding:** four fresh-context sub-agents of the same model, each given 7–8 takes, worked offline against the cache. Each self-checked its quotations. Merging produced 29 takes and 126 passages.
- **Merge corrections:**
  - Six passages from "AGI Ruin" were removed to keep that source within the 400-word quotation cap.
  - One quotation from "Irretrievability" (2026) was shortened to wording present in both the posting-day and current versions.
  - One quotation from "The Sun is big…" (2024) was replaced because its wording was absent from the posting-day version.
  - A May 2024 note in a 2007 post was given its own wording date.

## Audit

- **Auditors:** three fresh-context sub-agents (A1, A2, A3), all Claude Opus 5.5. This is the **same model family** as the preparer, so it does not satisfy the cross-family requirement that the editorial policy sets for contested and assessment records.
- **What the auditors saw:** each take, premise, source reference, locator and quotation, but not the preparer's relation, roles, voice, context or qualification. They worked offline against the same cache.
- **Coverage, first pass (A1, A2):** 69 of the 120 passages that followed merge corrections.
  - 49 were targeted: every earlier-self, retrospective, dialogue, fiction and co-authored passage, early reprints, the 1 April post, and table cells.
  - 20 were chosen at random from the rest (mulberry32, seed 20261006).
- **Coverage, second pass (A3):** the remaining 51 passages, after the first pass showed that the preparer often recorded "answered-it" where the passage only states a contrary conclusion.
- **Result:** every retained passage was audited once. No retrieval failures were reported apart from the unavailable posting-day version noted above.

| Check                      | A1 (35) | A2 (34) | A3 (51) |
| -------------------------- | ------- | ------- | ------- |
| Quotation matches cache    | 35      | 33      | 51      |
| Relation agrees with draft | 21      | 24      | 48      |
| Fit weak                   | 9       | 8       | 8       |
| Fit misleading             | 0       | 1       | 0       |
| Date problem               | 9       | 5       | 5       |
| Locator inaccurate         | 1       | 1       | 0       |

## Dispositions

- **Removed (4):**
  - T16-c: the quotation was a section heading.
  - T18-a: it did not engage the take; the same quotation remains under T19.
  - T21-d: off-premise.
  - T27-e: misleading beside the take, and its crosspost wording is unconfirmed.
- **Relations changed (27):** the auditors' relation differed from the draft on 27 passages.
  - 25 auditor readings were adopted. T21-d was removed instead, and T20-c kept `related` with a qualification, because in context it reassures rather than answers.
  - Two further changes (T17-b, T17-f) followed weak-fit notes; see below.
  - Most changes were from `answered-it` to `disagrees` or `related`.
  - T22-b and T30-c became `earlier-self`.
  - T11-e and T29-c became `answered-it`.
  - T17-b and T17-f became `related`: they present a worldwide ban as necessary, not as sufficient.
- **Dates corrected or qualified:**
  - **Wording dates** (`expressionDate`):
    - the 2024 note in a 2007 post
    - a 2017 document published in 2022
    - an early-September 2021 conversation
    - a 2018 summary written two months before publication
    - an X post two days before its LessWrong crosspost
  - **Qualifications added:**
    - transcript dates for the 2021–2023 dialogues
    - the 1 April framing of "Death With Dignity"
    - later revision of the Arbital pages and of the 2002 AI-box page
- **Quotations corrected:**
  - T30-b was shortened so that a dropped conditional no longer changes the meaning; the conditional is quoted in its qualification.
  - T12-b now marks its elided opening qualifier.
  - T26-d marks that it stops mid-sentence.
  - T26-a's ellipsis is explained as a page break.
- **Card use:** nine passages are `context-only`. These are earlier views that must not be shown without their later rejection, and quotations that overstate firmness or read as endorsement when shown alone.
- **Locators corrected:** T01-a and T03-b.

## Phase 2a: SL4 (2026-10-07)

- **Retrieval:** every message listed under his name in the 142 monthly author indexes of the SL4 archive, 1,876 messages, all HTTP 200. Bodies are cached with SHA-256 hashes, and the scope note records the method.
- **Passage finding:** three fresh-context sub-agents (Claude Opus 5.5) searched the bodies offline with quoted lines removed. They proposed 72 passages that predate the pack's earliest located ones for most takes.
- **Before the audit:**
  - One heading-only quotation was removed.
  - Three earlier-view candidates were held as `related`.
  - Quotations from short messages were shortened or removed to respect the ~10% cap for documents under 2,000 words. Four were removed in total.
  - Verification now excludes quoted (`>`) lines, so a quotation can match only his own text.
- **Audit:** two fresh-context sub-agents (A4, A5; Claude Opus 5.5, same family) audited all 67 remaining SL4 passages without the preparer's labels.
  - All 67 quotations match his unquoted text.
  - Relations agreed on 42 of 67.
  - None was misleading; 23 were weak fits.
- **Dispositions:**
  - **Removed (3):** T13-s4 (a 2004 recollection whose pairing would misrepresent him), and T08-s2 and T08-s3 (items from a list of possible failure modes, not predictions).
  - **Relations changed (23):** mostly to `disagrees`.
  - **New earlier-self cases:**
    - T08-s1: 2000, rejected in 2006.
    - T14-s3: the 2001 plan to "work out the FAI part as we go along", rejected in 2005.
    - T24-s2 and T24-s3: in 2002 he endorsed SIAI building its seed AI first and "beat them to the punch", rejected in 2023 (T24-a).
  - **T25-s1** (2000, on reading a recorded goal architecture) is recorded as `said-it` with a qualification, not as an earlier self, because the architecture differs from the one his 2022 view addresses.
  - The earlier-self definition now states that the later text must explicitly reject the take, and that the qualification records whether it refers back to the earlier view.
  - **Restored context:** two quotations were rebuilt to restore a dropped condition (T13-s3, T28-s1), and qualifications now supply missing referents, conditions and same-message context.
- **Card use:** 15 passages are now `context-only`.

## Phase 2b: Extropians, and the message quotation cap (2026-10-07)

- **Retrieval:** every message listed under his name in the Extropians author indexes, 3,012 messages (1996-11 to 2003-09), all HTTP 200.
  - The index parser handles three Hypermail layouts.
  - 147 subjects lost in one layout are taken from each message's own title.
- **Passage finding:** three fresh-context sub-agents proposed 50 passages. Most date from 1996–2000, and several are new earlier-self cases.
- **Quotation cap correction (affects the SL4 commit too):**
  - The SL4 commit computed each message's length on a different basis from admitted message sources.
  - Lengths now follow that precedent: the message body including quoted lines, without archive headers, navigation or signature.
  - Against the corrected lengths, 28 quotations from 23 short messages exceeded the ~10% cap. A fresh-context sub-agent proposed meaning-preserving shortenings: 26 were shortened and 2 dropped (T15-s2, T18-s3), with paraphrases kept as search-note leads.
  - Two phase-1 messages cited as stand-alone documents now point to their archive records, which also merged a duplicate citation of one 1996 message. T06-b was shortened as a result.
- **Audit:** two fresh-context sub-agents (A6, A7; Claude Opus 5.5, same family) audited all 50 Extropians passages and the 16 shortened SL4 and phase-1 quotations, without the preparer's labels.
  - All 66 quotations are his own words. The auditors checked by hand the 1996 messages that mark quotation with `<...>` or forward a private exchange.
  - Relations agreed on 51 of 66.
  - 12 were misleading and 22 weak fits.
- **Dispositions:**
  - **Removed (11):** every misleading item except T04-e3 and T17-s1, plus one slogan that did not engage the take. Reasons are in each take's search notes. Many relied on 1996–1999 reasoning he later abandoned (convergent objective morality, accepting any Singularity), so the quotation alone would invert his argument.
  - **T04-e3:** kept as an earlier view, rejected in "Magical Categories" (2008).
  - **T17-s1:** kept as context-only, because its 2001 reasons run against his 2023 position.
  - **Relations changed (10).**
  - **Context-only:** passages whose argument rests on later-abandoned reasoning are now `context-only` with a qualification, as are all earlier-self passages.
- **Card use:** 32 passages are `context-only`.

## Limits

- Same-family machine audit only. A cross-family check (for example GPT through Codex) has not been run.
- Relations are judgements about argumentative engagement. The auditors disagreed with the draft on 27 of 120 passages, so remaining labels are not certain.
- "Earliest located" holds only within the search scope. Comments, Twitter/X, interviews and Extropians traffic before 1996-07-25 are not searched; SL4 and Extropians dates are Hypermail archive dates in the archive's time zone.
- MIRI PDFs are later reprints, and the Arbital and yudkowsky.net pages show later revision. None of their wording is authenticated for the year shown.
- Raw audit outputs stay in the session scratchpad and are not tracked; this report summarises them.

## Corrections after cross-family check (2026-10-07)

Input: the different-family check in [gpt-check-2026-10-07.md](gpt-check-2026-10-07.md) (OpenAI GPT-6 family through Codex, not blinded, 94 sampled and 13 comparison passages, 29 disagreements plus one cannot-verify). It and the earlier sections of this report are unchanged. Every adjudication below re-read the surrounding source text; the corrector was the Claude Code session that prepared the pack, so these are the preparer's dispositions of a cross-family check, recorded for the maintainer, not an independent resolution.

Relations before → after: answered-it 126 → 147; disagrees 52 → 24; earlier-self 21 → 6; related 17 → 35; said-it 1 → 4. Passages 217 → 216.

### Adjudication of every disagreement

31 items: 26 accepted, 3 rejected in whole or part, 2 partly accepted. Where a GPT point is rejected, the reason says what the excerpt-level reading missed.

| ID     | GPT finding                           | Decision                                 | Applied                                                        | Reason                                                                                                                                                                                                                                                 |
| ------ | ------------------------------------- | ---------------------------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| T02-c  | earlier-self → related                | accept                                   | related                                                        | The essay frames it as a comparative probability and "a long, long way from certainty", not the assurance in P2.                                                                                                                                       |
| T02-d  | qualification obsolete                | accept                                   | qualification corrected                                        | T02-e3 (1999) and T02-s1 (2000) are earlier retrospective rejections; the earliest claim was stale.                                                                                                                                                    |
| T04-e3 | earlier-self → related                | accept                                   | related                                                        | Denies a perverse means ("munching on the humans"), not that "make humans happy" is an adequate specification.                                                                                                                                         |
| T08-s1 | earlier-self → related                | accept                                   | related                                                        | Understanding motivations before danger ≠ warning signs in weaker systems; the 2006 rejection targets a neighbouring claim.                                                                                                                            |
| T11-s2 | disagrees → answered-it               | accept                                   | answered-it                                                    | The same paragraph argues that faster-than-neural thinking removes the human timescale the slow-takeoff scenario assumes.                                                                                                                              |
| T13-d  | qualification overclaims              | accept                                   | qualification rewritten; context-only                          | The qualification said the line "plainly states his view"; fiction voice does not license that.                                                                                                                                                        |
| T13-s1 | disagrees → related                   | accept                                   | related                                                        | Answers "no FAI work can be done in advance" (Goertzel), not the timeline premise or "no need to act now" because of timelines.                                                                                                                        |
| T13-s2 | disagrees → related                   | accept                                   | related                                                        | Withdraws a belief about advance knowledge of Friendly AI, not a timeline-based reason for waiting.                                                                                                                                                    |
| T14-s3 | earlier-self → related                | accept                                   | related                                                        | Parallel development ≠ recovering from powerful-AI failures (T14-P1); the 2005 rejection is implicit.                                                                                                                                                  |
| T15-d  | answered-it → related                 | reject                                   | answered-it kept; premise moved to T15-P1                      | GPT read the excerpt alone; the turn replies to Ngo's plan-only proposal ("Suppose you get exactly what you ask for…") and argues plan output is consequentialist, which rebuts P1 directly.                                                           |
| T15-e2 | disagrees → related                   | reject (relation); accept (elision note) | answered-it (after the disagrees re-examination below)         | His stated belief that even a domain-specific "coding drone" would be independently motivated is the contrary of "a tool doesn't want anything" for exactly the tool case; GPT treated it as one design among many. The elision description was wrong. |
| T17-e2 | disagrees → answered-it               | accept                                   | answered-it                                                    | Gives reasons (cheap computing, profit, someone else will) against partial prevention.                                                                                                                                                                 |
| T18-e2 | earlier-self → related                | accept                                   | related                                                        | Benevolent upgrading ≠ leaving Earth alone; the 1998 rejection concerns survival, not the resource-share claim.                                                                                                                                        |
| T19-e2 | earlier-self → related                | accept                                   | related                                                        | Threat-plus-meaninglessness ≠ hostility; also the elided "without even making backups" changes the claim.                                                                                                                                              |
| T19-s1 | answered-it → disagrees               | accept                                   | disagrees                                                      | Asserts that indifference very probably means extermination and endorses Leitl, with no argument in this message.                                                                                                                                      |
| T19-s3 | disagrees → related                   | reject                                   | answered-it (after the disagrees re-examination below)         | The mechanism — killing everyone "simply" to avoid retaliation — is harm without hostility, the contrary of T19-P1; GPT focused on the deterrence framing and missed that the conclusion is about motive.                                              |
| T20-e1 | disagrees → answered-it               | accept                                   | answered-it                                                    | Argues AIs lack social emotions such as resentment and names the real worry, directly engaging the hate/rebellion premise.                                                                                                                             |
| T20-e2 | earlier-self → related                | accept                                   | related                                                        | He dismisses fear as xenophobic while conceding risk; no explicit later rejection of that claim.                                                                                                                                                       |
| T21-e  | cannot verify                         | accept                                   | expression date marked unverified; hedged label kept           | Current wording and hedged contrary reading verify; the X original and posting-day version are unavailable.                                                                                                                                            |
| T21-e1 | disagrees → answered-it               | accept                                   | answered-it; stale prose removed                               | The paragraph gives the missing-emotions reason why upbringing cannot produce humanlike motives.                                                                                                                                                       |
| T22-b  | earlier-self kept; needs context-only | accept flag; reject earlier-self         | related; context-only                                          | GPT passed the pairing, but a 2008 report is not an earlier text holding the take (rule a); the genuine earlier texts are T22-a, T22-e1, T22-e2.                                                                                                       |
| T30-c  | earlier-self kept; needs context-only | accept flag; reject earlier-self         | related; context-only                                          | Same reasoning as T22-b: the genuine earlier text is T30-e1; this passage is the later report.                                                                                                                                                         |
| T24-e2 | earlier-self → related                | partial                                  | said-it                                                        | Agree the earlier-self pairing fails (b); but "try to _be_ the first" as his only lever holds T24-P2, the same as T24-s3, so said-it rather than related.                                                                                              |
| T24-s2 | earlier-self → related                | accept                                   | related                                                        | He would not mind Novamente winning if it understood Friendliness: the builder does not control the outcome (contrary to P1).                                                                                                                          |
| T24-s3 | earlier-self → said-it                | accept                                   | said-it; stale prose removed                                   | "Beat them to the punch" endorses racing a self-serving project; the 2023 national-arms-race remark is not an explicit retraction of it.                                                                                                               |
| T26-e2 | answered-it → related                 | accept                                   | related                                                        | A passing list item; the bodiless-AI argument is inferred, not made.                                                                                                                                                                                   |
| T28-c  | disagrees → related                   | partial                                  | disagrees kept; premise moved to T28-P1; date basis corrected  | Agree it does not refute the ranking in P2 and that 2017 wording is unattested; but "zero projects they can join" is contrary to P1 (a credible safety plan exists).                                                                                   |
| T28-d  | earlier-self → said-it                | accept                                   | said-it                                                        | Holds P2 exactly; neither the entry-bar retrospective nor "zero projects" explicitly retracts the ranking.                                                                                                                                             |
| T28-e1 | earlier-self → related                | accept                                   | related; quotation replaced to keep the Friendliness condition | Conditional trust of Friendliness-aware builders ≠ "the labs know what they're doing"; the old elision hid the condition.                                                                                                                              |
| T30-b  | earlier-self → related                | accept                                   | related                                                        | "Not inevitably bad" ≠ "default good", and the next sentence concedes engineering risk.                                                                                                                                                                |
| T30-e  | needs context-only                    | accept                                   | context-only                                                   | The April 1 framing must travel with the quotation.                                                                                                                                                                                                    |

### Earlier-self pairings

Test: (a) the earlier text itself holds the take's proposition, premise included; (b) a located later Yudkowsky text explicitly rejects that proposition. A later retrospective that reports the earlier view is evidence of it but is not an earlier text, so T22-b and T30-c are now `related`. Pairings that failed either test were relabelled `related` or, where the earlier text holds the premise but no explicit retraction was located, `said-it`; no take was widened to fit.

**6 of 21 survive.**

| ID     | Outcome            | Basis                                                                                                                                                     |
| ------ | ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| T02-c  | relabelled related | The essay frames it as a comparative probability and "a long, long way from certainty", not the assurance in P2.                                          |
| T02-e1 | kept               | Holds T02-P1 ("The Powers will be ethical"); explicitly rejected in T02-e3 (1999) and T02-s1 (2000), which refer back to the 1996 view.                   |
| T02-e2 | kept               | Holds T02-P2 (they will "deduce the Meaning of Life"); explicitly rejected in T02-s1 (2000) and T02-e (2008).                                             |
| T04-e3 | relabelled related | Denies a perverse means ("munching on the humans"), not that "make humans happy" is an adequate specification.                                            |
| T08-s1 | relabelled related | Understanding motivations before danger ≠ warning signs in weaker systems; the 2006 rejection targets a neighbouring claim.                               |
| T14-s3 | relabelled related | Parallel development ≠ recovering from powerful-AI failures (T14-P1); the 2005 rejection is implicit.                                                     |
| T18-e2 | relabelled related | Benevolent upgrading ≠ leaving Earth alone; the 1998 rejection concerns survival, not the resource-share claim.                                           |
| T19-e2 | relabelled related | Threat-plus-meaninglessness ≠ hostility; also the elided "without even making backups" changes the claim.                                                 |
| T20-e2 | relabelled related | He dismisses fear as xenophobic while conceding risk; no explicit later rejection of that claim.                                                          |
| T22-a  | kept               | Holds T22-P1; explicitly rejected in T22-c (2008: the case "to continue forward at full speed") and T22-s2 (2001).                                        |
| T22-b  | relabelled related | GPT passed the pairing, but a 2008 report is not an earlier text holding the take (rule a); the genuine earlier texts are T22-a, T22-e1, T22-e2.          |
| T22-e1 | kept               | The 1996 announcement of the same slogan; same rejections as T22-a.                                                                                       |
| T22-e2 | kept               | Holds T22-P1 ("the minimum-time path … is the maximum-probability path"); same rejections as T22-a.                                                       |
| T24-s2 | relabelled related | He would not mind Novamente winning if it understood Friendliness: the builder does not control the outcome (contrary to P1).                             |
| T24-s3 | relabelled said-it | "Beat them to the punch" endorses racing a self-serving project; the 2023 national-arms-race remark is not an explicit retraction of it.                  |
| T24-e2 | relabelled said-it | Agree the earlier-self pairing fails (b); but "try to _be_ the first" as his only lever holds T24-P2, the same as T24-s3, so said-it rather than related. |
| T28-d  | relabelled said-it | Holds P2 exactly; neither the entry-bar retrospective nor "zero projects" explicitly retracts the ranking.                                                |
| T28-e1 | relabelled related | Conditional trust of Friendliness-aware builders ≠ "the labs know what they're doing"; the old elision hid the condition.                                 |
| T30-b  | relabelled related | "Not inevitably bad" ≠ "default good", and the next sentence concedes engineering risk.                                                                   |
| T30-c  | relabelled related | Same reasoning as T22-b: the genuine earlier text is T30-e1; this passage is the later report.                                                            |
| T30-e1 | kept               | Holds T30-P1 (certainty that the Powers will be ethical); explicitly rejected in T30-s1 (2000), which refers back.                                        |

### Re-examination of all 52 `disagrees`

Every passage labelled `disagrees` before this pass was re-read (two fresh-context Claude sub-agents, D1 and D2, proposed classifications against a written criterion without seeing the GPT check; the corrector decided each). Criterion: `answered-it` when the passage, with its paragraph or the message or turn it belongs to, gives a reason against a premise of the take; `disagrees` when it states the contrary without such a reason or its reasoning addresses another question; `related` when it is not contrary at all.

Outcome for the 52: 23 answered-it, 23 disagrees, 5 related, 1 removed. Changes made in the GPT adjudication above are included in these counts.

| ID     | From      | To          | Premise change | Reason                                                                                                                                                                                           |
| ------ | --------- | ----------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| T01-d  | disagrees | answered-it |                | Same sentence gives the reason against recognising the moment: thresholds "may not be obvious" and "we definitely can't calculate in advance what happens when".                                 |
| T01-s1 | disagrees | answered-it |                | Caps the message's argument that a superintelligence's capabilities cannot be ruled out, so an added constraint can be circumvented (T01-P1, "a correction mechanism can simply be added").      |
| T01-s4 | disagrees | related     |                | A conditional failure scenario inside his own controlled-ascent design, listed as a possible reason FAI might fail; not a claim about recognising danger.                                        |
| T02-d  | disagrees | disagrees   | T02-P2         | Premise corrected: the "philosophical blunder about how morality worked" concerns P2; still no argument in the paragraph.                                                                        |
| T05-s1 | disagrees | answered-it |                | The paragraph argues the real supergoal may become the reward register itself, citing Eurisko: a reason against reward producing internalised values.                                            |
| T08-a  | disagrees | answered-it |                | Same sentence gives the reason: past technological revolutions "did not telegraph themselves".                                                                                                   |
| T08-e  | disagrees | answered-it |                | The paragraph explains why a detected sign will not lead to action (no known fix; management incentives).                                                                                        |
| T09-a  | disagrees | answered-it |                | The quotation is itself an argument: AGI-complete prediction of science text requires gradient descent to find something that does science internally.                                           |
| T10-e3 | disagrees | answered-it |                | Replying to Hanson, gives an inductive reason: progress becomes a function of how far you have gone, and positive-feedback fields swing to extremes.                                             |
| T12-a  | disagrees | answered-it |                | Gives the strategic reason: a failed-Friendliness AI is at odds with its programmers, so feigning is its best strategy until it is strong enough.                                                |
| T13-s3 | disagrees | related     |                | About when Friendliness work must start within a project (developmental stage), not about calendar timelines.                                                                                    |
| T14-s1 | disagrees | answered-it |                | The message argues a superintelligence's capabilities cannot be bounded or constrained after the fact, the reason there is no second try (T14-P1).                                               |
| T15-e2 | disagrees | answered-it |                | The elided clause gives a hedged reason: coding is "such a general task" that a coding drone would be independently motivated.                                                                   |
| T16-d  | disagrees | answered-it |                | The paragraph and its boredom and experience-machine examples argue that losing one dimension of value nulls the future, against a compact specification.                                        |
| T17-s2 | disagrees | answered-it |                | The paragraph gives the reason: as computing cheapens, covert or distributed seed-AI work becomes feasible, so relinquishment fails eventually.                                                  |
| T17-e1 | disagrees | disagrees   | T17-P3         | Premise corrected to T17-P3 (whether law or a halt can prevent it); "we can't stop it" is asserted, not argued.                                                                                  |
| T17-e2 | disagrees | answered-it | T17-P3         | Premise corrected to T17-P3; the sentence gives reasons (cheap computing, profits, many builders) that prevention is impossible.                                                                 |
| T19-s2 | disagrees | answered-it |                | Explains the non-hostile mechanism: an unfriendly AI's decision criterion "makes no internal mention of human life".                                                                             |
| T19-s3 | disagrees | answered-it |                | The paragraph reasons that an AI whose good behaviour is instrumental could avoid retaliation "simply by killing everyone" because "an SI does not need other entities": harm without hostility. |
| T22-s2 | disagrees | answered-it |                | The message argues intelligence can be brute-forced while Friendliness needs incompressible human input, so a non-Friendliness-aware AI is a disaster, not good by default.                      |
| T27-b  | disagrees | related     |                | A row in a table of deliberately conservative design assumptions, not a claim that trial and error fails.                                                                                        |
| T27-s1 | disagrees | answered-it |                | The message argues a superintelligence cannot be constrained after the fact, the reason trial and error at the frontier fails.                                                                   |
| T28-b  | disagrees | answered-it |                | The paragraph supports the claim with evidence from his 2006 literature search (only brief nontechnical papers; textbooks omit Friendly AI).                                                     |
| T28-s1 | disagrees | answered-it |                | Paragraph reason: brute force can produce intelligence without understanding while Friendliness needs input, so the most advanced project need not be the competent one.                         |
| T30-a  | disagrees | answered-it |                | Same paragraph: survival "would require precision and preparation and new scientific insights", absent under current circumstances.                                                              |
| T27-e2 | disagrees | removed     |                | Misleading beside the take: "research" means control-mechanism research, and the next sentence endorses recovery from programmer mistakes.                                                       |

Kept as `disagrees` after re-reading: T01-s3, T02-d (premise corrected), T02-s3, T02-e3, T04-a, T07-e, T08-s6, T08-e1, T10-a, T10-e1, T11-a, T11-c, T11-s1, T15-s1, T16-s3, T17-e1 (premise corrected), T20-s2, T21-c, T21-e, T22-d, T28-a, T28-c, T30-e. Proposals not adopted: D1 proposed `answered-it` for T11-s1 (reason only in a later section of the message), T13-s1 and T13-s2 (they answer "nothing can be done in advance", not a timeline reason; consistent with the GPT adjudication), and `earlier-self` for T02-e3 (the quoted words reject P1; the conditional P2 survives only in unquoted text, now noted and flagged context-only).

### Other corrections

- Context-only added to T13-d (staged-dialogue line; qualification rewritten so it no longer claims the line states the author's view), T22-b, T30-c and T30-e (April 1 framing), and to passages whose relation became `related` or `said-it` from an earlier view. Context-only passages: 32 → 40.
- T28-e1: the quotation now contains the Friendliness condition the earlier elision removed ("… devoted considerable time and effort to Friendliness …").
- T21-e: hedged `disagrees` kept; its 2025-08-04 expression date is marked unverified (decoded from an X status ID; the original was not retrieved).
- T28-c: wording dated to the 2017 draft only as the editor's claim; attested in the 2022 copy.
- Stale prose removed from T02-d, T21-e1 and T24-s3; the T15-e2 elision note corrected.
- Earliest-located roles recomputed per take and relation group after the relabelling.

Not resolved: relations remain judgements, and this pass is the preparer's adjudication. Where the corrector rejected a GPT finding (T15-d, T15-e2, T19-s3, parts of T24-e2 and T28-c) or adopted a stricter view than GPT (T22-b, T30-c), a maintainer or a further independent check should decide if the label matters for use.

## Disposition of the blind cross-family check (2026-10-17)

The blind GPT-family check of the seven adjudications above ran on 2026-10-16 ([report](gpt-check-2026-10-15.md)). The maintainer accepted all six disagreements on 2026-10-17, and they were applied to the admitted records, not to this pack ([dispositions](../../review/cross-family-dispositions-2026-10-17.md)):

| ID     | Check finding                                     | Applied to the dataset                                                                |
| ------ | ------------------------------------------------- | ------------------------------------------------------------------------------------- |
| T15-d  | agree                                             | no change                                                                             |
| T15-e2 | keep answered-it; qualification stale             | qualification rewritten; elision corrected (“to the point of Powerdom”)               |
| T19-s3 | keep answered-it; qualification contradicts label | qualification rewritten around the instrumental motive                                |
| T28-c  | answered-it at post level                         | engagement engages-premise; dating instruction corrected                              |
| T22-b  | said-it, retrospective, context-only              | articulates, retrospective, context-only; cannot be earliest located                  |
| T30-c  | said-it, retrospective, context-only              | articulates, retrospective, context-only; cannot be earliest located                  |
| T24-e2 | related                                           | bears on, naming the missing premise; earliest located for Y24 moved to T24-s3 (2002) |

The four leads the check found are listed as candidates in the dispositions record; none was added. Labels in `pack.json` and `pack.md` are unchanged.

On 2026-10-17 the maintainer had the same test applied to T24-s3. The message does not state that the builder controls the outcome or that racing improves it, so the record now bears on Y24, and Y24 has no articulation and no earliest located record ([follow-up](../../review/y24-followup-2026-10-17.md)).
