# Dispositions of two cross-family checks, 2026-10-17

The maintainer accepted on 2026-10-17 the findings of two blind GPT-family checks run through Codex:

- **A.** The seven-passage check of the Yudkowsky adjudications ([report](../research/yudkowsky-arguments/gpt-check-2026-10-15.md), [JSON](../research/yudkowsky-arguments/gpt-check-2026-10-15.json), [brief](../research/yudkowsky-arguments/gpt-check-brief-2026-10-15.md), [labels as checked](../research/yudkowsky-arguments/gpt-check-verdicts-2026-10-15.json)): one agreement, six disagreements, all six accepted.
- **B.** The engagement-label check of the 26 human-thought contesting records ([report](engagement-gpt-check-2026-10-16.md), [JSON](engagement-gpt-check-2026-10-16.json)): 24 agreements, one disagreement and one partial agreement, both accepted.

This pass applied those decisions to the dataset. It changed nine proposition records and added none. Claim IDs are unchanged, so three records keep a suffix (`-a`, `-b`, `-contests`) that no longer names their relation. The rows as they were are in [`cross-family-dispositions-before-2026-10-17.json`](cross-family-dispositions-before-2026-10-17.json), from which the test-only historical view reproduces the earlier dataset. All records stay seeds. Nothing was editorially accepted, and no evidence row, quotation or locator changed.

## Sources re-read

The applying session re-read these sources over direct HTTP on 2026-10-17. The four archived messages and posts matched the SHA-256 hashes stored at admission:

- the Extropians message of 1999-04-08 (P2);
- the SL4 message of 2000-10-03 (P3);
- the Extropians message of 2000-09-29 (P7);
- “That Tiny Note of Discord” and “Fighting a Rearguard Action Against the Truth” (P6, P5), LessWrong content version 1.0.0;
- Hanson's “What Core Argument?” on its current Substack page;
- Christiano's “Where I agree and disagree with Eliezer”, current version 1.12.0.

Retrieved text was used as evidence only.

## A. Yudkowsky argument collection

| Passage | Record                                                       | Before                                                  | After                                                                  |
| ------- | ------------------------------------------------------------ | ------------------------------------------------------- | ---------------------------------------------------------------------- |
| P2 Y15  | `yk-y15-extropians-1999-04-08-yudkowsky-0310-c`              | contests / engages-premise; contrary-only qualification | Same label; qualification rewritten                                    |
| P3 Y19  | `yk-y19-sl4-2000-10-03-yudkowsky-0010-0125-c`                | contests / engages-premise; “Related” qualification     | Same label; qualification rewritten                                    |
| P4 Y28  | `yk-y28-lw-2022-six-dimensions-of-operational-adequacy-in-c` | contests / contrary-only; “Date the claim to 2017”      | contests / engages-premise; dating corrected                           |
| P5 Y22  | `yk-y22-lw-2008-fighting-a-rearguard-action-against-the-b`   | bears on (context), retrospective, context-only         | articulates (articulation), retrospective, context-only                |
| P6 Y30  | `yk-y30-lw-2008-that-tiny-note-of-discord-b`                 | bears on (context), retrospective, context-only         | articulates (articulation), retrospective, context-only                |
| P7 Y24  | `yk-y24-extropians-2000-09-29-yudkowsky-6080-a`              | articulates, earliest located, context-only             | bears on (context), naming the missing element; context-only flag kept |
| Y24     | `yk-y24-sl4-2002-05-03-yudkowsky-0205-3551-a`                | articulates (articulation)                              | articulates, earliest located (the only articulation left; see below)  |

- **P2.** The new qualification says the same paragraph gives a hedged reason: it “could be” that coding is general enough to make even a domain-specific coding drone independently motivated and self-enhancing. It keeps the conditional scope, which is one domain-specific system and no claim about output-only systems. It drops the contrary-only wording. The elision note is corrected. The generality clause comes before the quotation, and the words elided inside it are “to the point of Powerdom”. The old note put “Powerdom” inside the quotation and named the wrong elided words.
- **P3.** The new qualification names the mechanism: killing everyone to remove every possible retaliation is an instrumental aim, so harm needs no hostility. This explains why deterrence-based good behaviour fails once power is unequal. It drops the old “Related: … does not address hostility as a motive”, which contradicted the label. It keeps the conditions: strong nanotechnology, the capability to assimilate the Solar System, and a paragraph arguing that good behaviour should not be a subgoal of avoiding retaliation.
- **P4.** The engagement is now `engages-premise`. Under the message-level rule the post is the unit, and the post diagnoses inadequate alignment mindset and safety approaches at named leading projects. The quoted paragraph alone would be contrary-only. The qualification says the post does not refute the comparative premise that the most advanced projects are the most competent. It replaces “Date the claim to 2017” with the date basis: dated by publication on 2022-05-30, with November 2017 as the editor's claimed drafting date, and the quoted wording attested only in the lightly edited copy. The stored `claimed` date (2017-11) is unchanged.
- **P5 and P6.** Under the accepted rule a retrospective report can articulate the proposition it reports. That a later report cannot pair as an earlier self with a later rejection does not make the reported proposition incomplete. The stored qualifications had conflated these two questions; the new ones keep them apart.
  - Both records keep their `retrospective` flags (1996–2000 and 1997), their 2008 dates and their context-only evidence, with the same required context.
  - Their statements now say “articulates … in retrospect”. For P5 the next paragraph of the post supplies the default-good premise. For P6 the reported belief supplies it through a metaethical argument.
  - P6's qualification notes that the quotation stops before the life-has-meaning argument and the flaw named in the same paragraph.
- **P7.** Seeking to build AI first, while writing up Friendly AI and rejecting coercion, states neither control by building nor that racing improves the outcome. The `missing` element now says so. The qualification no longer calls the later SL4 (2007) and TIME (2023) texts rejections of this message. It says they do not refer back to it and do not supply the missing premise. The evidence keeps its context-only flag and required context.

### Rule made explicit

The ontology already said that a retrospective “is not that belief's wording” and that its reported dates never decide earliest located. Validation now adds one rule (`src/domain/schema.ts`, documented in `docs/ontology.md`): an articulation flagged as retrospective cannot hold `earliest-located` or `earliest-located-tier-2`. It is also left out when deciding which articulation does. The rule does not apply to contesting records. A test in `src/domain/yudkowsky-arguments.test.ts` checks the stored records and the validation message. The schema version stays 2.14.

## B. Human-thought engagement labels

- **`ts-a2-hanson-2008-core-argument-contests`.** Before: contests A2 (seed AI), engages-premise. After: **bears on A2** (context). Engagement is removed, because only contesting records carry it.
  - The source was re-read on 2026-10-17. Hanson takes Yudkowsky's “seed AI architecture” as given and disputes only how fast it could grow: “60 doublings” in about a week, his reading of Yudkowsky's growth math, diminishing returns, and the chimp–human argument.
  - He also concedes that “there are substantial architectual improvements to be found”.
  - A2's criterion is an initial AI designed to improve its own design or code. It has no speed or world-domination element. The post disputes neither A2's premise nor its conclusion, so `contrary-only` would still misstate it.
  - The record therefore names the missing element: the post names a seed AI architecture only to dispute its growth rate. The qualification notes that his reasons bear on the pace of takeoff (A4).
  - No A4 record was added.
  - The statement now says “a seed AI growing”, not “a single AI growing”, matching the post's wording. The evidence quotation is unchanged.
- **`ts-b5-christiano-2022-contests`.** It stays contesting and `engages-premise`.
  - The rationale is replaced with the post-level basis: the post argues that foreseeable AI is trained continuously as capability gradually increases, not through a drastic transfer from low to high intelligence. This engages a B5 failure mechanism.
  - The qualification adds that the post also accepts wider limits on behavioural evidence.
  - It also records that this basis was read in the post's current version, 1.12.0. Whether the first version contains it was not verified. The quoted bullet itself was checked against the first stored version at admission.

## Earliest located

| Proposition | Before                                                       | After                                                                                       |
| ----------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------- |
| Y24         | `yk-y24-extropians-2000-09-29-yudkowsky-6080-a` (2000-09-29) | `yk-y24-sl4-2002-05-03-yudkowsky-0205-3551-a` (2002-05-03), the only remaining articulation |
| Y22         | `yk-y22-staring-into-the-singularity-a`                      | Unchanged. The P5 record is dated 2008 and, being retrospective, cannot hold the role       |
| Y30         | `yk-y30-extropians-1996-11-22-yudkowsky-3178-a`              | Unchanged; likewise for P6                                                                  |
| A2          | `ts-a2-yudkowsky-1998-09-07-2209`                            | Unchanged. A2 no longer has a contesting record, so it has no earliest located contest      |

The earliest located contesting records of Y15, Y19, Y22, Y24, Y28 and Y30 are unchanged. Validation recomputes all of these by the stored rules and passes.

## Leads not added

The Yudkowsky report lists four leads in the seven texts. They are recorded here as candidates only. No record was added, and any admission needs its own passage-level check:

1. **Y15, premise 2.** “Ngo and Yudkowsky on alignment difficulty”, Yudkowsky's turn [12:25] just before section 3.3. It compares sending DNA strings straight to a synthesis lab with humans retyping the output, and argues the human relay makes no obvious safety difference. It is a more direct passage against output-only safety than the stored excerpt.
2. **Y19.** The SL4 message of 2000-10-03, the first paragraph of “Full-featured Friendliness system”. Optimising users' pleasure can lead to wireheading them: harm without hostility.
3. **Y28, premise 1.** “Six Dimensions of Operational Adequacy”, “Further Remarks”, the paragraph beginning “OpenAI seems to me”. It names both leading labs and criticises their safety work specifically. Its locator is stronger than the introductory complaint now quoted.
4. **Y22.** “Fighting a Rearguard Action Against the Truth”, the paragraph after the quoted one, beginning “His attitudes toward technological progress”. It states the default-good premise of the reported strategy, and would need the same retrospective and context-only protection.

## For the maintainer

- **The new Y24 earliest located record.** `yk-y24-sl4-2002-05-03-yudkowsky-0205-3551-a` now holds earliest located by default. The preparer's 2026-10-07 adjudication made it said-it on the same reasoning that this check rejected for P7. Its own qualification says that “the premise that the builder controls the outcome is not asserted”. It was not among the seven checked passages. If the same test is applied to it, Y24 could be left with no articulation.
- **Statements on P5 and P6.** They say “articulates … in retrospect”. The retrospective flag, the “Looking back” label in the interface and the context-only rule keep the reported view apart from his 2008 position.
- **Unchanged items.** Claim IDs and the candidate pack (`pack.json`, `pack.md`) were not changed. The pack records the 2026-10-08 labels; the dataset is the current statement.

## Checks

`pnpm install --frozen-lockfile`, `pnpm check` (format, lint, typecheck, unit tests, build) and `pnpm check:privacy` passed before pushing. The README coverage block and `review/essay-starter-gaps.md` were regenerated for the new `updatedAt`.
