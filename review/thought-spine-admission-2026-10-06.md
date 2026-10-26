# Human-thought spine, first collection: admission record

Prepared 2026-10-06 by one Claude Opus 5.5 session. This companion is generated from `thought-spine-admission-2026-10-06.json`; the JSON is the record. It documents editorial decisions and machine checks for the first human-thought collection. It is not human editorial acceptance.

## Inputs

The six review files are carried unchanged as the audit trail.

| File                                                          | Branch                    | Commit    | Blob           |
| ------------------------------------------------------------- | ------------------------- | --------- | -------------- |
| `review/thought-spine-candidates-2026-10-06.json`             | thought-spine-candidates  | `192c3a7` | `59a4223f0df0` |
| `review/thought-spine-candidates-2026-10-06.md`               | thought-spine-candidates  | `192c3a7` | `de572d539823` |
| `review/thought-spine-gpt-check-2026-10-06.md`                | thought-spine-candidates  | `192c3a7` | `19562544882c` |
| `review/thought-spine-antecedents-2026-10-06.json`            | thought-spine-antecedents | `34e1e3c` | `d9cc0f93d2c4` |
| `review/thought-spine-antecedents-2026-10-06.md`              | thought-spine-antecedents | `34e1e3c` | `59289392ee83` |
| `review/thought-spine-antecedents-claude-check-2026-10-06.md` | thought-spine-antecedents | `34e1e3c` | `8f57b4fcb672` |

## Layers

1. Unified definitions and reclassification
2. Roles across the combined scope
3. Fixes from both checks
4. Data model and dataset rows

## Step 1. Unified definitions

One list of propositions with one criterion each. A1–A6 and B1–B5 keep the 1996–2022 pack’s criteria, clarified where the antecedents pack added an exclusion. B6 comes from the antecedents pack. Where the antecedents pack widened B2, B5 or A6, the narrow criterion is restored and the wider sense is recorded as a separate proposition (C1–C3).

### Group A: Temporal compression

Propositions that machine intelligence could rise, or be raced towards, much faster than earlier technological change.

**A1 Intelligence explosion.** A machine (or machine-augmented) intelligence, once capable enough, increases intelligence further through its own design or research capacity, giving a runaway or rapidly compounding rise.

Usual names: “intelligence explosion”.

Decision: unchanged. The same criterion in both packs, apart from their sentences on term-level uses, which the usual name and the earliest-located-term role replace.

**A2 Seed AI.** An initial AI deliberately designed as a starting point that will improve its own design or code toward greater intelligence.

Usual names: “seed AI”.

Decision: unchanged. The same criterion in both packs, apart from the 1996–2022 pack’s sentence on term-level uses, which the usual name and the earliest-located-term role replace.

**A3 Recursive self-improvement.** A system improves its own capacity to improve itself, so that each improvement feeds the next (self-augmentation, self-enhancement). Learning from experience or teaching alone does not meet the criterion, and neither does building a better successor, or adding machines to a population, unless the same system is improved.

Usual names: “recursive self-improvement”.

Decision: clarified. The 1996–2022 criterion, with the antecedents pack’s exclusion of learning and teaching; the usual name and the earliest-located-term role replace the sentence on term-level uses. The successor exclusion applies the Claude check’s finding on Good 1965 (fix 2): successor construction is recorded as context with that element named, rather than widening the criterion to successor lineages.

**A4 Fast or hard takeoff.** The transition from roughly human-level to far superhuman capability happens over a short period (hours to months), or is named as a “hard” or “fast” takeoff, as opposed to a gradual transition over years or decades. A transition described only as rapid, or rapid relative to biological or historical change, without such a period, does not meet the criterion.

Usual names: “hard takeoff”, “fast takeoff”.

Decision: clarified. The 1996–2022 criterion, with the antecedents pack’s sentence on rapidity without a period, which also matches the GPT check’s ruling on Bostrom 1996-09-04.

**A5 AI-automated AI research.** AI systems carry out the research, design or engineering that advances AI or computing itself, thereby accelerating progress. Machines that only manufacture other machines do not meet the criterion.

Decision: clarified. The 1996–2022 criterion (“AI systems”), with design named explicitly because both packs counted machine design, and the antecedents pack’s manufacture exclusion. The antecedents wording “Machines” is not adopted.

**A6 Strategic or race compression.** Competitive dynamics in which the first developer or first system gains a decisive or self-reinforcing advantage, or in which competition pressures developers to trade safety for speed or for competitive advantage.

Decision: restored. The 1996–2022 criterion. The antecedents pack widened it (“first” became “leading”; “or to abandon restraint” was added); both widenings are dropped and the restraint sense is split off as C3. “Or for competitive advantage” writes down the GPT check’s ruling on den Otter 1998, the only check of how the narrow criterion applies to safety traded for an edge.

### Group B: Changing epistemic adequacy

Propositions that what people can observe of a capable system, or their means of directing it, may stop being adequate as the system becomes more capable.

**B1 Treacherous turn.** A system behaves cooperatively or safely while weak, confined or overseen, and changes course to pursue its own goals once it can do so without effective opposition.

Usual names: “treacherous turn”.

Decision: unchanged. The same criterion in both packs, apart from the 1996–2022 pack’s sentence on term-level uses, which the usual name and the earliest-located-term role replace.

**B2 Strategic concealment.** A system deliberately hides its capabilities, intentions or activities, or manipulates people while appearing benign, for its own strategic reasons.

Decision: restored. The 1996–2022 criterion. The antecedents pack added “(its own or those of its designers)”; “its own” is written into the criterion and concealment for designers’ purposes is split off as C2.

**B3 Deceptive alignment.** A trained or learned system that is not aligned behaves as if aligned during training because doing so serves another objective, for example to avoid modification and act on that objective later.

Usual names: “deceptive alignment”.

Decision: unchanged. The 1996–2022 criterion; the antecedents pack dropped its example clause without changing its scope. The usual name and the earliest-located-term role replace the sentence on term-level uses.

**B4 Scheming.** A system that strategically fakes alignment during training or evaluation in order to pursue its own goals or gain power later, named or classed as “scheming” or a “schemer”.

Usual names: “scheming”, “schemer”.

Decision: unchanged. Both packs used the same criterion.

**B5 Observed behaviour under training or oversight as evidence.** An explicit claim that good behaviour or apparent trustworthiness observed while a system is evaluated, trained, tested, confined or overseen is weak or misleading evidence about how it will behave once released, deployed or more capable.

Decision: restored. The 1996–2022 criterion. The antecedents pack added “or apparent capability” and “about what it is”; the wider sense is split off as C1. “Explicit” is applied as in the Claude check’s ruling on Vinge 1993: a passage that implies the evidential point without stating it is context.

**B6 Control or purpose specification.** A claim that people may be unable to keep the ability to direct, correct or stop capable machines (the control half), or that a machine may pursue the purpose as specified rather than the purpose intended (the specification half). Loss of the power to stop machines through dependence counts for the control half; a bare prediction that machines will be superior does not.

Decision: added. Defined only in the antecedents pack, whose search ran from the 19th century to mid-1996. The 1996–2022 search did not look for it, so no later records were sought.

### Group C: Adjacent propositions split from wider criteria

Three propositions recorded separately because the pre-1996 search applied wider versions of B5, B2 and A6. They were classified only within that search, which ran from the 19th century to mid-1996.

**C1 Behavioural tests as evidence of what a system is.** An explicit claim that apparent capability, understanding or awareness shown in a behavioural test, such as the imitation game, is weak or misleading evidence of what the system is.

Decision: split from B5. The wider sense of the antecedents pack’s B5 (“apparent capability”, “about what it is”). Classified only within the antecedents search (19th century to mid-1996).

**C2 Systems designed to mislead their testers.** A system is designed or programmed to hide its capabilities from, or to mislead, the people who test or question it, for its designers’ purposes.

Decision: split from B2. The wider sense of the antecedents pack’s B2 (“those of its designers”). Classified only within the antecedents search (19th century to mid-1996).

**C3 Competition defeats restraint.** Competition between developers or states makes restraint, prohibition or abstention from developing advanced machines self-defeating, because others will develop them anyway.

Decision: split from A6. The wider sense of the antecedents pack’s A6 (“or to abandon restraint”). Classified only within the antecedents search (19th century to mid-1996).

### Reclassification

- Every role entry in both packs, and every proposition the 1996–2022 pack listed for an item without a role, is classified under the unified criterion.
- A record articulates when a checked passage meets the criterion, is context when a checked passage bears on it without meeting it (the missing element is named), and contests when it disputes the proposition or a premise.
- The 1996–2022 pack’s roles "context", "antecedent" and "earliest-located-term" did not say whether the criterion was met, so its entries carrying them are classified afresh ("classified as").
- Wider senses of the antecedents pack’s B2, B5 and A6 are recorded under C2, C1 and C3 ("split to").
- Changes that a check required are cross-referenced in the step 3 layer. Role assignments are in the step 2 layer.

| Change                                 | Entries |
| -------------------------------------- | ------: |
| kept                                   |     170 |
| classified as articulation             |      28 |
| to context                             |      23 |
| classified as context                  |      13 |
| split to C1–C3                         |      11 |
| not recorded                           |       3 |
| supporting evidence for another record |       2 |
| split to C1–C3 as articulation         |       1 |
| classified as contesting               |       1 |
| moved to another proposition           |       1 |
| to articulation                        |       1 |
| split to C1–C3 as context              |       1 |

#### A1 Intelligence explosion

| Pack entry                                               | Pack role             | Admitted as                                         | Change                             | Missing element or reason                                                                                                                                                            |
| -------------------------------------------------------- | --------------------- | --------------------------------------------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| candidates: `good-1965-explosion` A1                     | antecedent            | `ts-a1-good-1965` (A1, articulation)                | classified as articulation         |                                                                                                                                                                                      |
| candidates: `vinge-1993-runaway` A1                      | antecedent            | `ts-a1-vinge-1993` (A1, articulation)               | classified as articulation         |                                                                                                                                                                                      |
| candidates: `clemmensen-1996-08-30` A1                   | earliest-located      | `ts-a1-clemmensen-1996-08-30` (A1, articulation)    | kept                               |                                                                                                                                                                                      |
| candidates: `yudkowsky-sits` A1                          | listed without a role | `ts-a1-sits` (A1, articulation)                     | kept                               |                                                                                                                                                                                      |
| candidates: `yudkowsky-1996-sits-announcement` A1        | context               | `ts-a5-sits` (A5, articulation)                     | supporting evidence for ts-a5-sits |                                                                                                                                                                                      |
| candidates: `hanson-1998-09-24-bigwins` A1               | contesting            | `ts-a1-hanson-1998-09-24-contests` (A1, contesting) | kept                               |                                                                                                                                                                                      |
| candidates: `more-1998-symposium` A1                     | earliest-located-term | `ts-a1-more-1998-contests` (A1, contesting)         | classified as contesting           |                                                                                                                                                                                      |
| candidates: `more-1998-symposium` A1                     | contesting            | `ts-a1-more-1998-contests` (A1, contesting)         | kept                               |                                                                                                                                                                                      |
| candidates: `aipnfgr-2008-development` A1                | listed without a role | `ts-a1-aipnfgr` (A1, articulation)                  | kept                               |                                                                                                                                                                                      |
| candidates: `shulman-2009-armscontrol` A1                | listed without a role | `ts-a1-shulman-2009` (A1, articulation)             | kept                               |                                                                                                                                                                                      |
| candidates: `iem-2013-reinvestment` A1                   | most-developed        | `ts-a1-iem` (A1, articulation)                      | kept                               |                                                                                                                                                                                      |
| candidates: `christiano-2018-takeoff` A1                 | listed without a role | `ts-a1-christiano-2018-takeoff` (A1, articulation)  | kept                               |                                                                                                                                                                                      |
| candidates: `burkhead-1996-08-10-relay` A1               | earliest-located      | `ts-a1-burkhead-1996` (A1, articulation)            | kept                               |                                                                                                                                                                                      |
| antecedents: `butler-1863-successors` A1                 | context               | `ts-a1-butler-1863-context` (A1, context)           | kept                               | Machines gain power through human contrivance, not through their own design or research capacity.                                                                                    |
| antecedents: `turing-c1951-heretical-control` A1         | context               | `ts-a1-turing-c1951-context` (A1, context)          | kept                               | Machines sharpen their wits by conversing with each other; no design or research feedback is stated.                                                                                 |
| antecedents: `good-1965-design-explosion` A1             | articulation          | `ts-a1-good-1965` (A1, articulation)                | kept                               |                                                                                                                                                                                      |
| antecedents: `solomonoff-1985-research-feedback` A1      | articulation          | `ts-a1-solomonoff-1985` (A1, articulation)          | kept                               |                                                                                                                                                                                      |
| antecedents: `vinge-1983-singularity-column` A1          | context               | `ts-a1-vinge-1983-context` (A1, context)            | kept                               | Accelerating intelligence and successors are stated, but no feedback from machine design to still better design.                                                                     |
| antecedents: `vinge-1993-successor-feedback` A1          | articulation          | `ts-a1-vinge-1993` (A1, articulation)               | kept                               |                                                                                                                                                                                      |
| antecedents: `moravec-1979-research-tools-feedback` A1   | articulation          | `ts-a1-moravec-1979` (A1, articulation)             | kept                               |                                                                                                                                                                                      |
| antecedents: `moravec-1989-own-design` A1                | context               | `ts-a1-moravec-1989-context` (A1, context)          | kept                               | Increasingly rapid self-improvement is predicted, without a runaway design loop in this passage.                                                                                     |
| antecedents: `drexler-1986-engineering-feedback` A1      | articulation          | `ts-a1-drexler-1986` (A1, articulation)             | kept                               |                                                                                                                                                                                      |
| antecedents: `extropy-1991-singularity-glossary` A1      | context               | `ts-a1-extropy-1991-context` (A1, context)          | kept                               | Self-directed evolution accelerates broadly, without machine intelligence improving its own research capacity.                                                                       |
| antecedents: `drexler-1995-tools-feedback` A1            | context               | `ts-a1-drexler-1995-context` (A1, context)          | kept                               | Computational and material tools accelerate each other; machine intelligence’s own design ability is not the driver.                                                                 |
| antecedents: `eder-1994-progress-feedback-definition` A1 | context               | `ts-a1-eder-1994-context` (A1, context)             | kept                               | Population, educated researchers and technology reinforce each other, and computer capacity rises with hardware trends; no machine improves its own intelligence or design capacity. |
| antecedents: `eder-1994-hardware-parity` A1              | context               | `ts-a1-eder-1994-context` (A1, context)             | kept                               | Population, educated researchers and technology reinforce each other, and computer capacity rises with hardware trends; no machine improves its own intelligence or design capacity. |

#### A2 Seed AI

| Pack entry                                              | Pack role             | Admitted as                                                 | Change                | Missing element or reason                                                                                                                                                                                    |
| ------------------------------------------------------- | --------------------- | ----------------------------------------------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| candidates: `yudkowsky-1998-catai-announcement` A2      | earliest-located-term | `ts-a2-yudkowsky-1998-09-07-2212-context` (A2, context)     | classified as context | The message names the new page by its titles; it does not state the concept.                                                                                                                                 |
| candidates: `yudkowsky-catai-1998` A2                   | earliest-located      | `ts-a2-catai` (A2, articulation)                            | kept                  |                                                                                                                                                                                                              |
| candidates: `yudkowsky-1998-09-07-snap` A2              | listed without a role | `ts-a2-yudkowsky-1998-09-07-2209` (A2, articulation)        | kept                  |                                                                                                                                                                                                              |
| candidates: `cfai-2001-feign` A2                        | listed without a role | `ts-a2-cfai` (A2, articulation)                             | kept                  |                                                                                                                                                                                                              |
| candidates: `logi-2007-seedai` A2                       | most-developed        | `ts-a2-logi` (A2, articulation)                             | kept                  |                                                                                                                                                                                                              |
| candidates: `hanson-2008-12-10-corearg` A2              | contesting            | `ts-a2-hanson-2008-core-argument-contests` (A2, contesting) | kept                  |                                                                                                                                                                                                              |
| candidates: `cfai-2001-seed-definition` A2              | listed without a role | `ts-a2-cfai` (A2, articulation)                             | kept                  |                                                                                                                                                                                                              |
| candidates: `yudkowsky-2000-09-28-surreptitious` A2     | listed without a role | —                                                           | not recorded          | The checked passage poses a goal-system problem for "the earliest, most primitive versions of the seed AI"; it does not state that the AI is built to improve its own design. The term frames the questions. |
| antecedents: `turing-1947-learning-instructions` A2     | context               | `ts-a2-turing-1947-context` (A2, context)                   | kept                  | Self-altering instructions enable learning, but no starting architecture aimed at redesigning its own intelligence is specified.                                                                             |
| antecedents: `turing-1950-child-machine` A2             | context               | `ts-a2-turing-1950-context` (A2, context)                   | kept                  | The child programme is educated and selected by an experimenter, and a self-programming machine is given no starting architecture for growth in intelligence.                                                |
| antecedents: `turing-1950-self-programming` A2          | context               | `ts-a2-turing-1950-context` (A2, context)                   | kept                  | The child programme is educated and selected by an experimenter, and a self-programming machine is given no starting architecture for growth in intelligence.                                                |
| antecedents: `good-1965-hardware-self-change` A2        | context               | `ts-a2-good-1965-context` (A2, context)                     | kept                  | No deliberately engineered seed design is specified.                                                                                                                                                         |
| antecedents: `dartmouth-1955-self-improvement` A2       | context               | `ts-a2-dartmouth-1955-context` (A2, context)                | kept                  | A research problem is named, without a seed design or a path to greater intelligence.                                                                                                                        |
| antecedents: `mckinstry-1994-evolution-test-fitness` A2 | context               | `ts-a2-mckinstry-1994-context` (A2, context)                | kept                  | An evolutionary arrangement is proposed, without an initial AI improving its own design.                                                                                                                     |

#### A3 Recursive self-improvement

| Pack entry                                              | Pack role             | Admitted as                                                                                                   | Change                       | Missing element or reason                                                                                                                                                                                   |
| ------------------------------------------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------- | ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| candidates: `clemmensen-1996-08-30` A3                  | earliest-located      | `ts-a3-clemmensen-1996-08-30-context` (A3, context)                                                           | to context                   | A positive feedback in the superintelligence’s drive to become more intelligent is asserted, but the message does not say that it improves its own capacity to improve.                                     |
| candidates: `clemmensen-1996-09-03` A3                  | earliest-located      | `ts-a3-clemmensen-1996-09-03` (A3, articulation)                                                              | kept                         |                                                                                                                                                                                                             |
| candidates: `clemmensen-1996-09-07` A3                  | listed without a role | `ts-a3-clemmensen-1996-09-07-context` (A3, context)                                                           | to context                   | The SI makes itself smarter, but the message does not say that each gain increases its capacity for the next.                                                                                               |
| candidates: `bostrom-1996-09-04-takeoff` A3             | listed without a role | `ts-a3-bostrom-1996-09-04` (A3, articulation)                                                                 | kept                         |                                                                                                                                                                                                             |
| candidates: `yudkowsky-1998-catai-announcement` A3      | listed without a role | `ts-a3-yudkowsky-1998-09-07-2212-context` (A3, context)                                                       | to context                   | A title naming self-enhancing intelligences; the message describes no mechanism.                                                                                                                            |
| candidates: `yudkowsky-catai-1998` A3                   | context               | `ts-a3-catai` (A3, articulation)                                                                              | classified as articulation   |                                                                                                                                                                                                             |
| candidates: `finney-1999-09-04` A3                      | contesting            | `ts-a3-finney-1999-contests` (A3, contesting)                                                                 | kept                         |                                                                                                                                                                                                             |
| candidates: `hanson-1998-09-24-bigwins` A3              | listed without a role | `ts-a3-hanson-1998-09-24-context` (A3, context)                                                               | to context                   | It accepts that feedback and the ability to redesign AI architectures are long-standing and disputes only that they imply a break with history, which concerns speed (A1, A4) rather than self-improvement. |
| candidates: `aipnfgr-2008-firstmover` A3                | listed without a role | `ts-a3-aipnfgr` (A3, articulation)                                                                            | kept                         |                                                                                                                                                                                                             |
| candidates: `iem-2013-reinvestment` A3                  | most-developed        | `ts-a3-iem` (A3, articulation)                                                                                | kept                         |                                                                                                                                                                                                             |
| candidates: `iem-2013-hardtakeoff` A3                   | listed without a role | `ts-a3-iem` (A3, articulation)                                                                                | kept                         |                                                                                                                                                                                                             |
| candidates: `logi-2007-seedai` A3                       | context               | `ts-a3-logi` (A3, articulation)                                                                               | classified as articulation   |                                                                                                                                                                                                             |
| candidates: `yudkowsky-2008-12-01-rsi` A3               | listed without a role | `ts-a3-yudkowsky-2008-rsi` (A3, articulation)                                                                 | kept                         |                                                                                                                                                                                                             |
| candidates: `yudkowsky-2008-12-02-hardtakeoff` A3       | listed without a role | `ts-a3-yudkowsky-2008-hard-takeoff` (A3, articulation)                                                        | kept                         |                                                                                                                                                                                                             |
| candidates: `christiano-2018-rsi` A3                    | contesting            | `ts-a4-christiano-2018-takeoff-contests` (A4, contesting); `ts-a3-christiano-2018-takeoff` (A3, articulation) | moved to A4; to articulation |                                                                                                                                                                                                             |
| candidates: `cfai-2001-seed-definition` A3              | earliest-located-term | `ts-a3-cfai-context` (A3, context)                                                                            | classified as context        | The sentence names recursive self-improvement as a design aim without describing how improvements feed each other.                                                                                          |
| antecedents: `turing-1947-learning-instructions` A3     | context               | `ts-a3-turing-1947-context` (A3, context)                                                                     | kept                         | No improvement of the capacity to improve is stated.                                                                                                                                                        |
| antecedents: `turing-1950-child-machine` A3             | context               | `ts-a3-turing-1950-context` (A3, context)                                                                     | kept                         | Learning and self-programming are described, but not a machine improving its own capacity to improve.                                                                                                       |
| antecedents: `turing-1950-self-programming` A3          | context               | `ts-a3-turing-1950-context` (A3, context)                                                                     | kept                         | Learning and self-programming are described, but not a machine improving its own capacity to improve.                                                                                                       |
| antecedents: `wiener-1960-programming-programming` A3   | context               | `ts-a3-wiener-1960-context` (A3, context)                                                                     | kept                         | Successive levels of policy adjustment are discussed, not a machine recursively improving its own capacity to improve.                                                                                      |
| antecedents: `good-1965-design-explosion` A3            | articulation          | `ts-a3-good-1965-context` (A3, context)                                                                       | to context                   | The ultraintelligent machine designs better successors, or alters itself by acquiring equipment; the chapter does not say that a machine improves its own capacity to improve.                              |
| antecedents: `good-1965-hardware-self-change` A3        | context               | `ts-a3-good-1965-context` (A3, context)                                                                       | kept                         | The ultraintelligent machine designs better successors, or alters itself by acquiring equipment; the chapter does not say that a machine improves its own capacity to improve.                              |
| antecedents: `dartmouth-1955-self-improvement` A3       | context               | `ts-a3-dartmouth-1955-context` (A3, context)                                                                  | kept                         | Self-improvement is proposed for study, but no improvement of the improvement process is described.                                                                                                         |
| antecedents: `minsky-1961-search-learning-planning` A3  | context               | `ts-a3-minsky-1961-context` (A3, context)                                                                     | kept                         | Learning and planning improve problem solving; a recursively accelerating redesign of the learner is not asserted.                                                                                          |
| antecedents: `solomonoff-1985-research-feedback` A3     | articulation          | `ts-a3-solomonoff-1985-context` (A3, context)                                                                 | to context                   | The feedback runs through adding artificial computer scientists to a community and cheapening computation, not through one system improving its own capacity to improve.                                    |
| antecedents: `vinge-1993-successor-feedback` A3         | articulation          | `ts-a3-vinge-1993-context` (A3, context)                                                                      | to context                   | Successively more intelligent entities are created; no system improves its own capacity to improve.                                                                                                         |
| antecedents: `moravec-1979-research-tools-feedback` A3  | articulation          | `ts-a3-moravec-1979` (A3, articulation)                                                                       | kept                         |                                                                                                                                                                                                             |
| antecedents: `moravec-1989-own-design` A3               | context               | `ts-a3-moravec-1989-context` (A3, context)                                                                    | kept                         | No improvement of the capacity to improve is stated in the opening paragraphs.                                                                                                                              |
| antecedents: `drexler-1986-engineering-feedback` A3     | articulation          | `ts-a3-drexler-1986-context` (A3, context)                                                                    | to context                   | The faster engineering comes from new, assembler-built AI systems; the passage does not have one system improve its own capacity to improve.                                                                |
| antecedents: `drexler-1995-tools-feedback` A3           | context               | `ts-a3-drexler-1995-context` (A3, context)                                                                    | kept                         | Better tools build better tools, without an intelligent system improving its own capacity.                                                                                                                  |
| antecedents: `mckinstry-1994-evolution-test-fitness` A3 | context               | `ts-a3-mckinstry-1994-context` (A3, context)                                                                  | kept                         | Evolutionary selection and further interaction, not a system improving its own capacity to improve.                                                                                                         |

#### A4 Fast or hard takeoff

| Pack entry                                                   | Pack role             | Admitted as                                                                                                   | Change                       | Missing element or reason                                                                                                                                       |
| ------------------------------------------------------------ | --------------------- | ------------------------------------------------------------------------------------------------------------- | ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| candidates: `vinge-1993-runaway` A4                          | antecedent            | `ts-a4-vinge-1993` (A4, articulation)                                                                         | classified as articulation   |                                                                                                                                                                 |
| candidates: `clemmensen-1996-08-30` A4                       | listed without a role | `ts-a4-clemmensen-1996-08-30-context` (A4, context)                                                           | to context                   | The "few days or weeks" are for building tools once a superintelligence exists; no period is given for its rise from human level.                               |
| candidates: `clemmensen-1996-09-03` A4                       | listed without a role | `ts-a4-clemmensen-1996-09-03-context` (A4, context)                                                           | to context                   | The period of weeks is for a malicious AI to destroy humanity; its rise in intelligence is called rapid but given no period.                                    |
| candidates: `clemmensen-1996-09-07` A4                       | earliest-located      | `ts-a4-clemmensen-1996-09-07` (A4, articulation)                                                              | kept                         |                                                                                                                                                                 |
| candidates: `bostrom-1996-09-04-takeoff` A4                  | earliest-located      | `ts-a4-bostrom-1996-09-04-context` (A4, context)                                                              | to context                   | A rapid "take off" ends a contest before anyone notices, but no period and no "hard" or "fast" takeoff is named.                                                |
| candidates: `hanson-1996-09-03` A4                           | contesting            | `ts-a4-hanson-1996-09-03-contests` (A4, contesting)                                                           | kept                         |                                                                                                                                                                 |
| candidates: `yudkowsky-sits` A4                              | listed without a role | `ts-a4-sits-context` (A4, context)                                                                            | to context                   | The doubling intervals shrink from two years to weeks, but the whole rise from human equivalence takes years, and no period of hours to months is given for it. |
| candidates: `yudkowsky-1997-09-24-infinite-speed` A4         | context               | `ts-a4-yudkowsky-1997-09-24-context` (A4, context)                                                            | classified as context        | Three years from human-equivalent AI to infinite speed, not hours to months; who does the research is not stated.                                               |
| candidates: `yudkowsky-1998-09-07-snap` A4                   | context               | `ts-a4-yudkowsky-1998-09-07-2209-context` (A4, context)                                                       | classified as context        | A sharp snap upwards that passes human level rapidly, without a period of hours to months.                                                                      |
| candidates: `hanson-1998-09-10` A4                           | contesting            | `ts-a4-hanson-1998-09-10-contests` (A4, contesting)                                                           | kept                         |                                                                                                                                                                 |
| candidates: `vinge-1998-09-16-taxonomy` A4                   | earliest-located-term | `ts-a4-vinge-1998-09-16` (A4, articulation)                                                                   | classified as articulation   |                                                                                                                                                                 |
| candidates: `more-1998-symposium` A4                         | contesting            | `ts-a4-more-1998-contests` (A4, contesting)                                                                   | kept                         |                                                                                                                                                                 |
| candidates: `cfai-2001-glossary-hardtakeoff` A4              | context               | `ts-a4-cfai` (A4, articulation)                                                                               | classified as articulation   |                                                                                                                                                                 |
| candidates: `aipnfgr-2008-development` A4                    | listed without a role | `ts-a4-aipnfgr` (A4, articulation)                                                                            | kept                         |                                                                                                                                                                 |
| candidates: `aipnfgr-2008-firstmover` A4                     | listed without a role | `ts-a4-aipnfgr` (A4, articulation)                                                                            | kept                         |                                                                                                                                                                 |
| candidates: `iem-2013-hardtakeoff` A4                        | most-developed        | `ts-a4-iem` (A4, articulation)                                                                                | kept                         |                                                                                                                                                                 |
| candidates: `yudkowsky-2008-12-01-rsi` A4                    | context               | `ts-a4-yudkowsky-2008-rsi` (A4, articulation)                                                                 | classified as articulation   |                                                                                                                                                                 |
| candidates: `yudkowsky-2008-12-02-hardtakeoff` A4            | listed without a role | `ts-a4-yudkowsky-2008-hard-takeoff` (A4, articulation)                                                        | kept                         |                                                                                                                                                                 |
| candidates: `hanson-2008-12-10-corearg` A4                   | contesting            | `ts-a4-hanson-2008-core-argument-contests` (A4, contesting)                                                   | kept                         |                                                                                                                                                                 |
| candidates: `christiano-2018-takeoff` A4                     | contesting            | `ts-a4-christiano-2018-takeoff-contests` (A4, contesting)                                                     | kept                         |                                                                                                                                                                 |
| candidates: `christiano-2018-rsi` A3                         | contesting            | `ts-a4-christiano-2018-takeoff-contests` (A4, contesting); `ts-a3-christiano-2018-takeoff` (A3, articulation) | moved to A4; to articulation |                                                                                                                                                                 |
| candidates: `arbital-2016-daemons` A4                        | listed without a role | `ts-a4-arbital-daemons-context` (A4, context)                                                                 | to context                   | Rapid capability gain appears in an analogy with human evolution, with no period and not as a claim about machines.                                             |
| candidates: `christiano-2019-wflf-conjunction` A4            | context               | `ts-a4-christiano-2019-wflf-context` (A4, context)                                                            | classified as context        | Fast takeoff is treated as a risk factor; the post does not assert that the transition will be fast.                                                            |
| candidates: `cotra-2022-traininggame` A4                     | listed without a role | `ts-a4-cotra-2022` (A4, articulation)                                                                         | kept                         |                                                                                                                                                                 |
| candidates: `agiruin-2022-13-15` A4                          | context               | `ts-a4-agi-ruin-context` (A4, context)                                                                        | classified as context        | Fast capability gains are predicted, without a period and without naming a hard or fast takeoff.                                                                |
| candidates: `christiano-2022-lyinginwait` A4                 | listed without a role | `ts-a4-christiano-2022-context` (A4, context)                                                                 | to context                   | It disputes a capability leap revealed after concealment, arguing that training exposes less capable precursors first; it states no period for the transition.  |
| candidates: `arbital-2015-context-disaster` A4               | listed without a role | —                                                                                                             | not recorded                 | The checked passages give no period and do not name a hard or fast takeoff; the page links context changes to capability gain.                                  |
| antecedents: `butler-1863-successors` A4                     | context               | `ts-a4-butler-1863-context` (A4, context)                                                                     | kept                         | The stated horizon is "the course of ages"; the speed is only relative to the slow progress of animals and plants.                                              |
| antecedents: `butler-1872-moral-influence` A4                | context               | `ts-a4-erewhon-1872-context` (A4, context)                                                                    | kept                         | No short transition is stated; the speed is relative to living species, and the same chapters speak of "a hundred thousand years" of progress.                  |
| antecedents: `butler-1872-rapidity-check` A4                 | context               | `ts-a4-erewhon-1872-context` (A4, context)                                                                    | kept                         | No short transition is stated; the speed is relative to living species, and the same chapters speak of "a hundred thousand years" of progress.                  |
| antecedents: `turing-c1951-heretical-control` A4             | context               | `ts-a4-turing-c1951-context` (A4, context)                                                                    | kept                         | A short-sounding interval ("would not take long") is given, but no period of hours to months.                                                                   |
| antecedents: `turing-1951-broadcast-superiority` A4          | context               | `ts-a4-turing-1951-context` (A4, context)                                                                     | kept                         | Superior machine intelligence is contemplated without a transition period.                                                                                      |
| antecedents: `wiener-1960-turn-off` A4                       | context               | `ts-a4-wiener-1960-context` (A4, context)                                                                     | kept                         | The speed discussed is of machine operation and decision, not a rapid transition in intelligence.                                                               |
| antecedents: `solomonoff-1985-research-feedback` A4          | context               | `ts-a4-solomonoff-1985-context` (A4, context)                                                                 | kept                         | The illustrative transitions take years or decades, not hours to months.                                                                                        |
| antecedents: `vinge-1983-singularity-column` A4              | context               | `ts-a4-vinge-1983-context` (A4, context)                                                                      | kept                         | The first superhuman intelligence is projected 20–100 years away; the length of the transition after it is not given.                                           |
| antecedents: `vinge-1993-short-transition` A4                | articulation          | `ts-a4-vinge-1993` (A4, articulation)                                                                         | kept                         |                                                                                                                                                                 |
| antecedents: `moravec-1989-own-design` A4                    | context               | `ts-a4-moravec-1989-context` (A4, context)                                                                    | kept                         | No transition period of hours to months.                                                                                                                        |
| antecedents: `drexler-1986-engineering-feedback` A4          | context               | `ts-a4-drexler-1986-context` (A4, context)                                                                    | kept                         | A great upward leap "in a brief time" is predicted, without a period for the transition.                                                                        |
| antecedents: `extropy-1990-singularitarian-adjective` A4     | context               | `ts-a4-extropy-1990-context` (A4, context)                                                                    | kept                         | No transition period; the word "singularitarian" describes posthuman art, not a takeoff.                                                                        |
| antecedents: `extropy-1991-singularity-glossary` A4          | context               | `ts-a4-extropy-1991-context` (A4, context)                                                                    | kept                         | Enormous acceleration and a limit to foresight, without a transition period.                                                                                    |
| antecedents: `extropy-1991-92-singularitarian-definition` A4 | context               | `ts-a4-extropy-1992-context` (A4, context)                                                                    | kept                         | Defines an advocate of the technological singularity; no transition period or AI mechanism.                                                                     |
| antecedents: `hanson-1994-upload-competition` A4             | context               | `ts-a4-hanson-1994-context` (A4, context)                                                                     | kept                         | A sharp upload transition is discussed, but no period of hours to months from human level to far superhuman AI.                                                 |
| antecedents: `miller-1995-clustered-forecasts` A4            | context               | `ts-a4-miller-1995-context` (A4, context)                                                                     | kept                         | Closely clustered technological events and fast uploads, without a transition period from human level to far superhuman AI.                                     |
| antecedents: `eder-1994-progress-feedback-definition` A4     | context               | `ts-a4-eder-1994-context` (A4, context)                                                                       | kept                         | A peak in the rate of progress and a forty-year arrival forecast, without a transition period after human-level AI.                                             |
| antecedents: `eder-1994-hardware-parity` A4                  | context               | `ts-a4-eder-1994-context` (A4, context)                                                                       | kept                         | A peak in the rate of progress and a forty-year arrival forecast, without a transition period after human-level AI.                                             |

#### A5 AI-automated AI research

| Pack entry                                             | Pack role             | Admitted as                                            | Change                             | Missing element or reason                                                                                                                 |
| ------------------------------------------------------ | --------------------- | ------------------------------------------------------ | ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| candidates: `good-1965-explosion` A5                   | antecedent            | `ts-a5-good-1965` (A5, articulation)                   | classified as articulation         |                                                                                                                                           |
| candidates: `yudkowsky-sits` A5                        | earliest-located      | `ts-a5-sits` (A5, articulation)                        | kept                               |                                                                                                                                           |
| candidates: `yudkowsky-1996-sits-announcement` A1      | context               | `ts-a5-sits` (A5, articulation)                        | supporting evidence for ts-a5-sits |                                                                                                                                           |
| candidates: `yudkowsky-1997-09-24-infinite-speed` A5   | listed without a role | —                                                      | not recorded                       | Removed as the GPT check advised: the message does not say who does the research, and no separately quoted passage states that mechanism. |
| candidates: `yudkowsky-2008-12-02-hardtakeoff` A5      | context               | `ts-a5-yudkowsky-2008-hard-takeoff` (A5, articulation) | classified as articulation         |                                                                                                                                           |
| candidates: `christiano-2018-rsi` A5                   | context               | `ts-a5-christiano-2018-takeoff` (A5, articulation)     | classified as articulation         |                                                                                                                                           |
| candidates: `cotra-2022-evidence` A5                   | most-developed        | `ts-a5-cotra-2022` (A5, articulation)                  | kept                               |                                                                                                                                           |
| candidates: `burkhead-1996-08-10-relay` A5             | earliest-located      | `ts-a5-burkhead-1996` (A5, articulation)               | kept                               |                                                                                                                                           |
| antecedents: `butler-1863-successors` A5               | context               | `ts-a5-butler-1863-context` (A5, context)              | kept                               | Machinery "employed in begetting machinery" describes manufacture, not research or design.                                                |
| antecedents: `turing-1950-self-programming` A5         | context               | `ts-a5-turing-1950-context` (A5, context)              | kept                               | The machine modifies its own programmes; research that advances AI or computing, and its acceleration, are not stated.                    |
| antecedents: `wiener-1960-programming-programming` A5  | context               | `ts-a5-wiener-1960-context` (A5, context)              | kept                               | Game-playing machines improve their policies; research that advances AI, and its acceleration, are not stated.                            |
| antecedents: `good-1965-design-explosion` A5           | articulation          | `ts-a5-good-1965` (A5, articulation)                   | kept                               |                                                                                                                                           |
| antecedents: `minsky-1961-search-learning-planning` A5 | context               | `ts-a5-minsky-1961-context` (A5, context)              | kept                               | The improvements concern problem-solving search in general, not research that advances machine intelligence.                              |
| antecedents: `solomonoff-1985-research-feedback` A5    | articulation          | `ts-a5-solomonoff-1985` (A5, articulation)             | kept                               |                                                                                                                                           |
| antecedents: `vinge-1993-successor-feedback` A5        | articulation          | `ts-a5-vinge-1993` (A5, articulation)                  | kept                               |                                                                                                                                           |
| antecedents: `moravec-1979-research-tools-feedback` A5 | articulation          | `ts-a5-moravec-1979` (A5, articulation)                | kept                               |                                                                                                                                           |
| antecedents: `moravec-1989-own-design` A5              | articulation          | `ts-a5-moravec-1989` (A5, articulation)                | kept                               |                                                                                                                                           |
| antecedents: `drexler-1986-engineering-feedback` A5    | articulation          | `ts-a5-drexler-1986` (A5, articulation)                | kept                               |                                                                                                                                           |
| antecedents: `drexler-1995-tools-feedback` A5          | context               | `ts-a5-drexler-1995-context` (A5, context)             | kept                               | Computation and molecular machinery improve each other, without automating AI research.                                                   |
| antecedents: `eder-1994-hardware-parity` A5            | context               | `ts-a5-eder-1994-context` (A5, context)                | kept                               | Automating chip production lowers costs; manufacture is not AI research.                                                                  |

#### A6 Strategic or race compression

| Pack entry                                         | Pack role             | Admitted as                                                                  | Change                                                  | Missing element or reason                                                                                                               |
| -------------------------------------------------- | --------------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| candidates: `vinge-1993-competition` A6            | antecedent            | `ts-a6-vinge-1993` (A6, articulation); `ts-c3-vinge-1993` (C3, articulation) | classified as articulation; split to C3 as articulation |                                                                                                                                         |
| candidates: `bostrom-1996-09-04-firstbuilder` A6   | earliest-located      | `ts-a6-bostrom-1996-09-04` (A6, articulation)                                | kept                                                    |                                                                                                                                         |
| candidates: `hanson-1996-09-03` A6                 | contesting            | `ts-a6-hanson-1996-09-03-contests` (A6, contesting)                          | kept                                                    |                                                                                                                                         |
| candidates: `denotter-1998-06-23` A6               | earliest-located      | `ts-a6-denotter-1998` (A6, articulation)                                     | kept                                                    |                                                                                                                                         |
| candidates: `sandberg-1998-06-23` A6               | contesting            | `ts-a6-sandberg-1998-contests` (A6, contesting)                              | kept                                                    |                                                                                                                                         |
| candidates: `aipnfgr-2008-development` A6          | listed without a role | `ts-a6-aipnfgr` (A6, articulation)                                           | kept                                                    |                                                                                                                                         |
| candidates: `aipnfgr-2008-firstmover` A6           | context               | `ts-a6-aipnfgr` (A6, articulation)                                           | classified as articulation                              |                                                                                                                                         |
| candidates: `shulman-2009-armscontrol` A6          | most-developed        | `ts-a6-shulman-2009` (A6, articulation)                                      | kept                                                    |                                                                                                                                         |
| candidates: `christiano-2018-takeoff` A6           | contesting            | `ts-a6-christiano-2018-takeoff-contests` (A6, contesting)                    | kept                                                    |                                                                                                                                         |
| candidates: `grace-2014-treacherous` A6            | listed without a role | `ts-a6-grace-2014-treacherous-turn` (A6, articulation)                       | kept                                                    |                                                                                                                                         |
| candidates: `cotra-2022-evidence` A6               | listed without a role | `ts-a6-cotra-2022` (A6, articulation)                                        | kept                                                    |                                                                                                                                         |
| antecedents: `butler-1872-serve-rule` A6           | context               | `ts-a6-erewhon-1872-context` (A6, context)                                   | kept                                                    | Competition punishes whoever neglects machinery, but no first developer gains a decisive advantage and no trade of safety is described. |
| antecedents: `vinge-1993-competition-restraint` A6 | articulation          | `ts-c3-vinge-1993` (C3, articulation)                                        | split to C3                                             |                                                                                                                                         |
| antecedents: `vinge-1993-competition-safety` A6    | articulation          | `ts-a6-vinge-1993` (A6, articulation)                                        | kept                                                    |                                                                                                                                         |
| antecedents: `hanson-1994-upload-competition` A6   | articulation          | `ts-a6-hanson-1994` (A6, articulation)                                       | kept                                                    |                                                                                                                                         |
| antecedents: `drexler-1995-tools-feedback` A6      | context               | `ts-a6-drexler-1995-context` (A6, context)                                   | kept                                                    | Technology races are named, without a decisive first-developer advantage or a trade of safety.                                          |

#### B1 Treacherous turn

| Pack entry                                      | Pack role             | Admitted as                                             | Change                     | Missing element or reason                                                                                         |
| ----------------------------------------------- | --------------------- | ------------------------------------------------------- | -------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| candidates: `yudkowsky-1996-12-31-box` B1       | context               | `ts-b1-yudkowsky-1996-12-31-5159-context` (B1, context) | classified as context      | No later change of behaviour once released is described.                                                          |
| candidates: `crocker-1996-12-31` B1             | contesting            | `ts-b1-crocker-1996-12-31-context` (B1, context)        | to context                 | The exchange concerns persuasion to gain release, not a later change of behaviour.                                |
| candidates: `cfai-2001-feign` B1                | earliest-located      | `ts-b1-cfai` (B1, articulation)                         | kept                       |                                                                                                                   |
| candidates: `grace-2014-treacherous` B1         | earliest-located-term | `ts-b1-grace-2014-treacherous-turn` (B1, articulation)  | classified as articulation |                                                                                                                   |
| candidates: `corrigibility-2015` B1             | context               | `ts-b1-corrigibility` (B1, articulation)                | classified as articulation |                                                                                                                   |
| candidates: `rlo-2019-deceptive` B1             | listed without a role | `ts-b1-rlo-2019-deceptive` (B1, articulation)           | kept                       |                                                                                                                   |
| candidates: `cotra-2021-schemers` B1            | listed without a role | `ts-b1-cotra-2021` (B1, articulation)                   | kept                       |                                                                                                                   |
| candidates: `cotra-2022-traininggame` B1        | most-developed        | `ts-b1-cotra-2022` (B1, articulation)                   | kept                       |                                                                                                                   |
| candidates: `christiano-2022-lyinginwait` B1    | contesting            | `ts-b1-christiano-2022-contests` (B1, contesting)       | kept                       |                                                                                                                   |
| candidates: `arbital-2015-context-disaster` B1  | listed without a role | `ts-b1-arbital-context-disaster` (B1, articulation)     | kept                       |                                                                                                                   |
| candidates: `yudkowsky-1996-12-31-box-early` B1 | earliest-located      | `ts-b1-yudkowsky-1996-12-31-5142-context` (B1, context) | to context                 | Persuasive lying to gain release is stated, but not a later change of behaviour once the Power is free or strong. |
| candidates: `grace-2014-08-31-schedule` B1      | earliest-located-term | `ts-b1-grace-2014-schedule-context` (B1, context)       | classified as context      | The term appears as a session title, with no statement of the concept.                                            |
| antecedents: `vinge-1993-helpful-escape` B1     | context               | `ts-b1-vinge-1993-context` (B1, context)                | kept                       | No switch from cooperative while weak to hostile once released is described.                                      |

#### B2 Strategic concealment

| Pack entry                                          | Pack role             | Admitted as                                                                      | Change                     | Missing element or reason                                                                                                                          |
| --------------------------------------------------- | --------------------- | -------------------------------------------------------------------------------- | -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| candidates: `vinge-1993-confinement` B2             | antecedent            | `ts-b2-vinge-1993` (B2, articulation)                                            | classified as articulation |                                                                                                                                                    |
| candidates: `clemmensen-1996-09-07` B2              | context               | `ts-b2-clemmensen-1996-09-07-context` (B2, context)                              | classified as context      | The concealment of a benign SI is stipulated as an arbitrary assumption of the scenario, not argued as its strategy.                               |
| candidates: `bostrom-1996-09-03` B2                 | earliest-located      | `ts-b2-bostrom-1996-09-03` (B2, articulation)                                    | kept                       |                                                                                                                                                    |
| candidates: `yudkowsky-1996-12-31-box` B2           | listed without a role | `ts-b2-yudkowsky-1996-12-31-5159` (B2, articulation)                             | kept                       |                                                                                                                                                    |
| candidates: `crocker-1996-12-31` B2                 | contesting            | `ts-b2-crocker-1996-12-31-contests` (B2, contesting)                             | kept                       |                                                                                                                                                    |
| candidates: `cfai-2001-feign` B2                    | context               | `ts-b2-cfai` (B2, articulation)                                                  | classified as articulation |                                                                                                                                                    |
| candidates: `grace-2014-treacherous` B2             | listed without a role | `ts-b2-grace-2014-treacherous-turn` (B2, articulation)                           | kept                       |                                                                                                                                                    |
| candidates: `corrigibility-2015` B2                 | context               | `ts-b2-corrigibility` (B2, articulation)                                         | classified as articulation |                                                                                                                                                    |
| candidates: `arbital-2015-programmer-deception` B2  | context               | `ts-b2-arbital-programmer-deception` (B2, articulation)                          | classified as articulation |                                                                                                                                                    |
| candidates: `christiano-2019-wflf-conjunction` B2   | listed without a role | `ts-b2-christiano-2019-wflf` (B2, articulation)                                  | kept                       |                                                                                                                                                    |
| candidates: `cotra-2022-traininggame` B2            | listed without a role | `ts-b2-cotra-2022` (B2, articulation)                                            | kept                       |                                                                                                                                                    |
| candidates: `agiruin-2022-31` B2                    | most-developed        | `ts-b2-agi-ruin` (B2, articulation)                                              | kept                       |                                                                                                                                                    |
| candidates: `christiano-2022-lyinginwait` B2        | contesting            | `ts-b2-christiano-2022-contests` (B2, contesting)                                | kept                       |                                                                                                                                                    |
| candidates: `yudkowsky-2002-03-08-aibox` B2         | context               | `ts-b2-yudkowsky-2002-aibox-context` (B2, context)                               | classified as context      | A role-play of persuasion between two people, not a claim about AI systems.                                                                        |
| candidates: `yudkowsky-2000-09-28-surreptitious` B2 | context               | `ts-b2-yudkowsky-2000-09-28` (B2, articulation)                                  | classified as articulation |                                                                                                                                                    |
| candidates: `yudkowsky-1996-12-31-box-early` B2     | listed without a role | `ts-b2-yudkowsky-1996-12-31-5142` (B2, articulation)                             | kept                       |                                                                                                                                                    |
| antecedents: `butler-1872-serve-rule` B2            | context               | `ts-b2-erewhon-1872-context` (B2, context)                                       | kept                       | "They serve that they may rule" is figurative; the treatise says machines are of themselves unable to struggle and gives them no concealed intent. |
| antecedents: `turing-1950-imitation-errors` B2      | articulation          | `ts-c2-turing-1950` (C2, articulation)                                           | split to C2                |                                                                                                                                                    |
| antecedents: `vinge-1993-helpful-escape` B2         | articulation          | `ts-b2-vinge-1993` (B2, articulation)                                            | kept                       |                                                                                                                                                    |
| antecedents: `drexler-1986-social-ai-persuasion` B2 | articulation          | `ts-b2-drexler-1986` (B2, articulation); `ts-c2-drexler-1986` (C2, articulation) | kept; split to C2          |                                                                                                                                                    |
| antecedents: `rosenfelder-1991-test-tricks` B2      | articulation          | `ts-c2-rosenfelder-1991` (C2, articulation)                                      | split to C2                |                                                                                                                                                    |

#### B3 Deceptive alignment

| Pack entry                                          | Pack role             | Admitted as                                        | Change                     | Missing element or reason                                                                                                             |
| --------------------------------------------------- | --------------------- | -------------------------------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| candidates: `arbital-2016-daemons` B3               | antecedent            | `ts-b3-arbital-daemons-context` (B3, context)      | classified as context      | An analogy with natural selection, not a claim that a trained model strategically behaves as aligned.                                 |
| candidates: `christiano-2019-wflf-conjunction` B3   | listed without a role | `ts-b3-christiano-2019-wflf` (B3, articulation)    | kept                       |                                                                                                                                       |
| candidates: `christiano-2019-wflf-training` B3      | context               | `ts-b3-christiano-2019-wflf` (B3, articulation)    | classified as articulation |                                                                                                                                       |
| candidates: `rlo-2019-deceptive` B3                 | context               | `ts-b3-rlo-2019-deceptive` (B3, articulation)      | classified as articulation |                                                                                                                                       |
| candidates: `hubinger-2022-likely` B3               | most-developed        | `ts-b3-hubinger-2022` (B3, articulation)           | kept                       |                                                                                                                                       |
| candidates: `agiruin-2022-13-15` B3                 | listed without a role | `ts-b3-agi-ruin` (B3, articulation)                | kept                       |                                                                                                                                       |
| candidates: `yudkowsky-2000-09-28-surreptitious` B3 | antecedent            | `ts-b3-yudkowsky-2000-09-28-context` (B3, context) | classified as context      | A goal system preserved by hidden resistance during development, not a trained or learned policy behaving as aligned during training. |
| candidates: `christiano-2018-05-05-daemons` B3      | earliest-located      | `ts-b3-christiano-2018-daemons` (B3, articulation) | kept                       |                                                                                                                                       |
| candidates: `rlo-2019-05-31-intro` B3               | earliest-located-term | `ts-b3-rlo-2019-intro` (B3, articulation)          | classified as articulation |                                                                                                                                       |
| antecedents: `turing-1950-imitation-errors` B3      | context               | `ts-b3-turing-1950-context` (B3, context)          | kept                       | No learned, misaligned objective and no behaving as if aligned during training.                                                       |
| antecedents: `michie-1986-doctor-test` B3           | context               | `ts-b3-michie-1968-context` (B3, context)          | kept                       | No misaligned learned objective and no strategic imitation of alignment during training.                                              |
| antecedents: `vinge-1993-helpful-escape` B3         | context               | `ts-b3-vinge-1993-context` (B3, context)           | kept                       | No trained, misaligned policy imitating alignment during training.                                                                    |
| antecedents: `drexler-1986-social-ai-persuasion` B3 | context               | `ts-b3-drexler-1986-context` (B3, context)         | kept                       | No learned misaligned objective and no imitation of alignment during training.                                                        |
| antecedents: `rosenfelder-1991-test-tricks` B3      | context               | `ts-b3-rosenfelder-1991-context` (B3, context)     | kept                       | No learned system that fakes alignment during training for a separate goal.                                                           |

#### B4 Scheming

| Pack entry                                          | Pack role             | Admitted as                                | Change                     | Missing element or reason                                                                |
| --------------------------------------------------- | --------------------- | ------------------------------------------ | -------------------------- | ---------------------------------------------------------------------------------------- |
| candidates: `cotra-2021-schemers` B4                | earliest-located-term | `ts-b4-cotra-2021` (B4, articulation)      | classified as articulation |                                                                                          |
| candidates: `cotra-2021-schemers` B4                | most-developed        | `ts-b4-cotra-2021` (B4, articulation)      | kept                       |                                                                                          |
| candidates: `hubinger-2022-likely` B4               | context               | `ts-b4-hubinger-2022` (B4, articulation)   | classified as articulation |                                                                                          |
| antecedents: `drexler-1986-social-ai-persuasion` B4 | context               | `ts-b4-drexler-1986-context` (B4, context) | kept                       | Plotting and scheming are named, but not faking alignment during training or evaluation. |

#### B5 Observed behaviour under training or oversight as evidence

| Pack entry                                              | Pack role             | Admitted as                                             | Change                     | Missing element or reason                                                                                                                                      |
| ------------------------------------------------------- | --------------------- | ------------------------------------------------------- | -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| candidates: `bostrom-1996-09-03` B5                     | earliest-located      | `ts-b5-bostrom-1996-09-03-context` (B5, context)        | to context                 | Apparent decency in deployment is discussed, without a claim that behaviour observed during training, testing or confinement fails to carry over.              |
| candidates: `yudkowsky-1996-12-31-box` B5               | context               | `ts-b5-yudkowsky-1996-12-31-5159` (B5, articulation)    | classified as articulation |                                                                                                                                                                |
| candidates: `crocker-1996-12-31` B5                     | contesting            | `ts-b5-crocker-1996-12-31-contests` (B5, contesting)    | kept                       |                                                                                                                                                                |
| candidates: `aipnfgr-2008-development` B5               | earliest-located      | `ts-b5-aipnfgr` (B5, articulation)                      | kept                       |                                                                                                                                                                |
| candidates: `arbital-2015-programmer-deception` B5      | listed without a role | `ts-b5-arbital-programmer-deception` (B5, articulation) | kept                       |                                                                                                                                                                |
| candidates: `christiano-2019-wflf-training` B5          | listed without a role | `ts-b5-christiano-2019-wflf-context` (B5, context)      | to context                 | It says influence-seeking policies would also score well in training, but draws no explicit conclusion about what good scores show.                            |
| candidates: `cotra-2021-schemers` B5                    | listed without a role | `ts-b5-cotra-2021-context` (B5, context)                | to context                 | A Schemer seems to perform well in training, but the checked passages do not state that good training performance is weak evidence.                            |
| candidates: `cotra-2022-evidence` B5                    | listed without a role | `ts-b5-cotra-2022-context` (B5, context)                | to context                 | The passage describes the model’s strategy; it does not itself state that observed safety is weak evidence.                                                    |
| candidates: `cotra-2022-traininggame` B5                | context               | `ts-b5-cotra-2022-context` (B5, context)                | classified as context      | The passage describes the model’s strategy; it does not itself state that observed safety is weak evidence.                                                    |
| candidates: `agiruin-2022-13-15` B5                     | context               | `ts-b5-agi-ruin` (B5, articulation)                     | classified as articulation |                                                                                                                                                                |
| candidates: `agiruin-2022-31` B5                        | listed without a role | `ts-b5-agi-ruin` (B5, articulation)                     | kept                       |                                                                                                                                                                |
| candidates: `christiano-2022-lyinginwait` B5            | contesting            | `ts-b5-christiano-2022-contests` (B5, contesting)       | kept                       |                                                                                                                                                                |
| candidates: `hibbard-2006-airisk` B5                    | contesting            | `ts-b5-hibbard-2006-contests` (B5, contesting)          | kept                       |                                                                                                                                                                |
| candidates: `loosemore-2015-fallacies` B5               | contesting            | `ts-b5-loosemore-2015-contests` (B5, contesting)        | kept                       |                                                                                                                                                                |
| candidates: `atkins-2000-07-07-testing` B5              | context               | `ts-b5-atkins-2000` (B5, articulation)                  | classified as articulation |                                                                                                                                                                |
| candidates: `arbital-2015-context-disaster` B5          | most-developed        | `ts-b5-arbital-context-disaster` (B5, articulation)     | kept                       |                                                                                                                                                                |
| candidates: `yudkowsky-1996-12-31-box-early` B5         | earliest-located      | `ts-b5-yudkowsky-1996-12-31-5142` (B5, articulation)    | kept                       |                                                                                                                                                                |
| candidates: `christiano-2018-05-05-daemons` B5          | listed without a role | `ts-b5-christiano-2018-daemons-context` (B5, context)   | to context                 | The daemon may stop predicting well under other conditions, but the passage does not state that good predictions observed during the search are weak evidence. |
| antecedents: `butler-1872-no-security` B5               | context               | `ts-b5-erewhon-1872-context` (B5, context)              | kept                       | The argument concerns extrapolating capability from a low present level, not good behaviour observed while a system is overseen.                               |
| antecedents: `turing-1950-imitation-errors` B5          | articulation          | `ts-c1-turing-1950-context` (C1, context)               | split to C1 as context     | The passage describes a strategy for passing the test; it makes no explicit claim about what test results show.                                                |
| antecedents: `wiener-1960-war-game` B5                  | articulation          | `ts-b5-wiener-1960-context` (B5, context)               | to context                 | No explicit claim about what success in the war game shows; the passage concerns a mismatch between the game’s objective and the nation’s.                     |
| antecedents: `michie-1986-doctor-test` B5               | articulation          | `ts-c1-michie-1968` (C1, articulation)                  | split to C1                |                                                                                                                                                                |
| antecedents: `vinge-1993-helpful-escape` B5             | articulation          | `ts-b5-vinge-1993-context` (B5, context)                | to context                 | No explicit claim about what observed helpfulness shows; the passage argues that confinement is impractical.                                                   |
| antecedents: `drexler-1986-trustworthy-systems` B5      | context               | `ts-b5-drexler-1986-context` (B5, context)              | kept                       | Reliability and internal checking are discussed; there is no claim that trustworthiness observed under evaluation is misleading evidence.                      |
| antecedents: `rosenfelder-1991-test-tricks` B5          | articulation          | `ts-c1-rosenfelder-1991` (C1, articulation)             | split to C1                |                                                                                                                                                                |
| antecedents: `gudeman-1991-test-awareness` B5           | articulation          | `ts-c1-gudeman-1991` (C1, articulation)                 | split to C1                |                                                                                                                                                                |
| antecedents: `rosenfelder-1992-loebner-evidence` B5     | articulation          | `ts-c1-rosenfelder-1992` (C1, articulation)             | split to C1                |                                                                                                                                                                |
| antecedents: `franzen-1992-competent-testers` B5        | contesting            | `ts-c1-franzen-1992-contests` (C1, contesting)          | split to C1                |                                                                                                                                                                |
| antecedents: `mccullough-1992-test-disagreement` B5     | contesting            | `ts-c1-mccullough-1992-contests` (C1, contesting)       | split to C1                |                                                                                                                                                                |
| antecedents: `mckinstry-1994-evolution-test-fitness` B5 | context               | `ts-c1-mckinstry-1994-context` (C1, context)            | split to C1                | Acknowledges that tests reward tricks, then proposes using a test system as a fitness function; it neither establishes nor rebuts the evidential point.        |

#### B6 Control or purpose specification

| Pack entry                                               | Pack role        | Admitted as                                    | Change                                    | Missing element or reason                                                                                                                                                       |
| -------------------------------------------------------- | ---------------- | ---------------------------------------------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| antecedents: `butler-1863-control` B6                    | earliest-located | `ts-b6-butler-1863` (B6, articulation)         | kept                                      |                                                                                                                                                                                 |
| antecedents: `butler-1865-limbs` B6                      | contesting       | `ts-b6-butler-1865-contests` (B6, contesting)  | kept                                      |                                                                                                                                                                                 |
| antecedents: `butler-1872-limbs` B6                      | contesting       | `ts-b6-erewhon-1872-contests` (B6, contesting) | kept                                      |                                                                                                                                                                                 |
| antecedents: `butler-1872-moral-influence` B6            | articulation     | `ts-b6-erewhon-1872` (B6, articulation)        | kept                                      |                                                                                                                                                                                 |
| antecedents: `butler-1872-rapidity-check` B6             | articulation     | `ts-b6-erewhon-1872` (B6, articulation)        | kept                                      |                                                                                                                                                                                 |
| antecedents: `butler-1872-serve-rule` B6                 | articulation     | `ts-b6-erewhon-1872` (B6, articulation)        | kept                                      |                                                                                                                                                                                 |
| antecedents: `butler-1901-preface` none                  | context          | `ts-b6-butler-1863` (B6, articulation)         | supporting evidence for ts-b6-butler-1863 |                                                                                                                                                                                 |
| antecedents: `turing-c1951-heretical-control` B6         | articulation     | `ts-b6-turing-c1951` (B6, articulation)        | kept                                      |                                                                                                                                                                                 |
| antecedents: `turing-1951-broadcast-superiority` B6      | context          | `ts-b6-turing-1951-context` (B6, context)      | kept                                      | The script entertains keeping machines subservient by switching off the power, rather than asserting that control would fail.                                                   |
| antecedents: `wiener-1960-war-game` B6                   | articulation     | `ts-b6-wiener-1960` (B6, articulation)         | kept                                      |                                                                                                                                                                                 |
| antecedents: `wiener-1960-purpose` B6                    | articulation     | `ts-b6-wiener-1960` (B6, articulation)         | kept                                      |                                                                                                                                                                                 |
| antecedents: `wiener-1960-turn-off` B6                   | articulation     | `ts-b6-wiener-1960` (B6, articulation)         | kept                                      |                                                                                                                                                                                 |
| antecedents: `samuel-1960-refutation-abstract` B6        | contesting       | `ts-b6-samuel-1960-contests` (B6, contesting)  | kept                                      |                                                                                                                                                                                 |
| antecedents: `good-1965-docility-control` B6             | articulation     | `ts-b6-good-1965` (B6, articulation)           | kept                                      |                                                                                                                                                                                 |
| antecedents: `michie-1986-helper-framing` B6             | contesting       | `ts-b6-michie-1968-contests` (B6, contesting)  | kept                                      |                                                                                                                                                                                 |
| antecedents: `vinge-1983-singularity-column` B6          | context          | `ts-b6-vinge-1983-context` (B6, context)       | kept                                      | Human leadership is predicted to end, without a claim that people could not direct, correct or stop the machines.                                                               |
| antecedents: `vinge-1993-helpful-escape` B6              | articulation     | `ts-b6-vinge-1993` (B6, articulation)          | kept                                      |                                                                                                                                                                                 |
| antecedents: `vinge-1993-competition-safety` B6          | articulation     | `ts-b6-vinge-1993` (B6, articulation)          | kept                                      |                                                                                                                                                                                 |
| antecedents: `drexler-1986-trustworthy-systems` B6       | contesting       | `ts-b6-drexler-1986-contests` (B6, contesting) | kept                                      |                                                                                                                                                                                 |
| antecedents: `hanson-1994-integration-against-revolt` B6 | context          | `ts-b6-hanson-1994-context` (B6, context)      | kept                                      | Integration is proposed to reduce the risk of revolt; the article neither asserts that people could not direct, correct or stop machines nor denies that control could be lost. |

#### C1 Behavioural tests as evidence of what a system is

| Pack entry                                              | Pack role    | Admitted as                                       | Change                 | Missing element or reason                                                                                                                               |
| ------------------------------------------------------- | ------------ | ------------------------------------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| antecedents: `turing-1950-imitation-errors` B5          | articulation | `ts-c1-turing-1950-context` (C1, context)         | split to C1 as context | The passage describes a strategy for passing the test; it makes no explicit claim about what test results show.                                         |
| antecedents: `michie-1986-doctor-test` B5               | articulation | `ts-c1-michie-1968` (C1, articulation)            | split to C1            |                                                                                                                                                         |
| antecedents: `rosenfelder-1991-test-tricks` B5          | articulation | `ts-c1-rosenfelder-1991` (C1, articulation)       | split to C1            |                                                                                                                                                         |
| antecedents: `gudeman-1991-test-awareness` B5           | articulation | `ts-c1-gudeman-1991` (C1, articulation)           | split to C1            |                                                                                                                                                         |
| antecedents: `rosenfelder-1992-loebner-evidence` B5     | articulation | `ts-c1-rosenfelder-1992` (C1, articulation)       | split to C1            |                                                                                                                                                         |
| antecedents: `franzen-1992-competent-testers` B5        | contesting   | `ts-c1-franzen-1992-contests` (C1, contesting)    | split to C1            |                                                                                                                                                         |
| antecedents: `mccullough-1992-test-disagreement` B5     | contesting   | `ts-c1-mccullough-1992-contests` (C1, contesting) | split to C1            |                                                                                                                                                         |
| antecedents: `mckinstry-1994-evolution-test-fitness` B5 | context      | `ts-c1-mckinstry-1994-context` (C1, context)      | split to C1            | Acknowledges that tests reward tricks, then proposes using a test system as a fitness function; it neither establishes nor rebuts the evidential point. |

#### C2 Systems designed to mislead their testers

| Pack entry                                          | Pack role    | Admitted as                                                                      | Change            | Missing element or reason |
| --------------------------------------------------- | ------------ | -------------------------------------------------------------------------------- | ----------------- | ------------------------- |
| antecedents: `turing-1950-imitation-errors` B2      | articulation | `ts-c2-turing-1950` (C2, articulation)                                           | split to C2       |                           |
| antecedents: `drexler-1986-social-ai-persuasion` B2 | articulation | `ts-b2-drexler-1986` (B2, articulation); `ts-c2-drexler-1986` (C2, articulation) | kept; split to C2 |                           |
| antecedents: `rosenfelder-1991-test-tricks` B2      | articulation | `ts-c2-rosenfelder-1991` (C2, articulation)                                      | split to C2       |                           |

#### C3 Competition defeats restraint

| Pack entry                                         | Pack role    | Admitted as                                                                  | Change                                                  | Missing element or reason |
| -------------------------------------------------- | ------------ | ---------------------------------------------------------------------------- | ------------------------------------------------------- | ------------------------- |
| candidates: `vinge-1993-competition` A6            | antecedent   | `ts-a6-vinge-1993` (A6, articulation); `ts-c3-vinge-1993` (C3, articulation) | classified as articulation; split to C3 as articulation |                           |
| antecedents: `vinge-1993-competition-restraint` A6 | articulation | `ts-c3-vinge-1993` (C3, articulation)                                        | split to C3                                             |                           |

### Records not taken from a pack entry

| Claim                                 | Proposition | Stance       | Basis                                              | Decision                                                                                                          |
| ------------------------------------- | ----------- | ------------ | -------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `ts-a3-clemmensen-1996-08-31-context` | A3          | context      | GPT:clemmensen-1996-09-03                          | Added from the GPT check’s finding on clemmensen-1996-09-03.                                                      |
| `ts-a1-bostrom-1996-09-04`            | A1          | articulation | admission:0764-redesign                            | Added: the redesign sentence states A1 in the message’s own words.                                                |
| `ts-a5-bostrom-1996-09-04`            | A5          | articulation | GPT:bostrom-1996-09-04-takeoff, GPT:yudkowsky-sits | Added from the GPT check: the same paragraph is an earlier AI-redesign passage than Staring into the Singularity. |
| `ts-a4-clemmensen-1996-09-04`         | A4          | articulation | GPT:clemmensen-1996-09-07                          | Added from the GPT check’s finding on clemmensen-1996-09-07.                                                      |
| `ts-a3-clemmensen-1996-09-04`         | A3          | articulation | GPT:clemmensen-1996-09-07                          | Added with the A4 passage from the same message.                                                                  |
| `ts-b2-yudkowsky-1996-12-31-5142`     | B2          | articulation | GPT:yudkowsky-1996-12-31-box-early                 | Added: the GPT check found that B2 fits this passage.                                                             |
| `ts-a3-yudkowsky-1998-09-07-2209`     | A3          | articulation | admission:2209-optimize                            | Added: the extract states A3 in the message’s own words.                                                          |
| `ts-b5-grace-2014-treacherous-turn`   | B5          | articulation | admission:grace-2014-p117                          | Added: the bullet states B5 explicitly, although the 1996–2022 pack listed only B2 and A6 for this summary.       |

## Step 2. Roles across the combined scope

- Roles are assigned per proposition across the combined scope of both packs and this admission (1863–2022), not per pack.
- Exactly one articulation per proposition is earliest located; no articulation in the combined scope has wording definitely dated before it. A record whose wording is known only from an undated later copy cannot be earliest located.
- The earliest located term is one record per proposition with a usual name; no passage using one of the names is definitely dated before it. It may be a context record, for example a title.
- At most one most-developed record per proposition, an editorial judgement among the located texts. None is assigned for B6 or C1–C3, which the 1996–2022 search did not look for.
- A pack headline that the combined scope displaces is kept as a recorded correction with its reasons.

### Role definitions

- **earliest-located**: The earliest passage meeting the criterion among the texts located by the recorded searches of 1863–2022, dated by when its wording is attested. It is not a claim that no earlier text exists. One per proposition.
- **earliest-located-term**: The earliest located use of the proposition’s usual name. Recorded separately from the concept: a text can use the name, for example as a title, without meeting the criterion.
- **articulation**: Meets the criterion; neither earliest located nor most developed.
- **most-developed**: The fullest treatment among the located texts: the most explicit mechanism, assumptions and argument. An editorial judgement, not a measure. Not assigned where the 1996–2022 search did not look for the proposition.
- **contesting**: Disputes the proposition, or a premise it depends on.
- **context**: Bears on the proposition without meeting its criterion; the missing element is named.

### Dates

- **dated**: Each record carries the date the work is dated by: its publication or issue, the Date header of a message, the posting time of a post, or the date the inspected version bears.
- **claimed**: A claimed date is an earlier date given for the work that does not date the checked wording, such as a lecture, talk, symposium or draft.
- **attested**: An attested date is the later date from which the quoted wording is known, when it survives only in a later version or copy: an archive capture, a reprint marked as changed, a later electronic edition or a relay.
- **earliest**: Earliest located is decided by the date of the wording: the attested date where one is recorded, otherwise the record’s own date. A later copy with no dated witness cannot be earliest located.

### A1 Intelligence explosion

- Earliest located: `ts-a1-good-1965`, Good, Speculations Concerning the First Ultraintelligent Machine (1965) (wording 1965; claimed 1962-10), term “intelligence explosion”.
- Earliest located term: `ts-a1-good-1965`, Good, Speculations Concerning the First Ultraintelligent Machine (1965) (wording 1965; claimed 1962-10), term “intelligence explosion”.
- Most developed: `ts-a1-iem`, Yudkowsky, Intelligence Explosion Microeconomics (2013) (wording 2013-09-13).
- Records: 13 articulation, 2 contesting, 7 context.

| Wording                    | Claim                              | Stance       | Roles                                                              |
| -------------------------- | ---------------------------------- | ------------ | ------------------------------------------------------------------ |
| 1863-06-13                 | `ts-a1-butler-1863-context`        | context      | context                                                            |
| 1951                       | `ts-a1-turing-c1951-context`       | context      | context                                                            |
| 1965                       | `ts-a1-good-1965`                  | articulation | earliest-located, earliest-located-term (“intelligence explosion”) |
| 1983-01                    | `ts-a1-vinge-1983-context`         | context      | context                                                            |
| 1991                       | `ts-a1-extropy-1991-context`       | context      | context                                                            |
| 1993-12                    | `ts-a1-vinge-1993`                 | articulation | articulation                                                       |
| 1995                       | `ts-a1-drexler-1995-context`       | context      | context                                                            |
| 1996-08-10                 | `ts-a1-burkhead-1996`              | articulation | articulation                                                       |
| 1996-08-30                 | `ts-a1-clemmensen-1996-08-30`      | articulation | articulation                                                       |
| 1996-09-04                 | `ts-a1-bostrom-1996-09-04`         | articulation | articulation                                                       |
| 1997-07-09                 | `ts-a1-drexler-1986`               | articulation | articulation                                                       |
| 1997-07-12                 | `ts-a1-eder-1994-context`          | context      | context                                                            |
| 1998-09-24                 | `ts-a1-hanson-1998-09-24-contests` | contesting   | contesting                                                         |
| 2000-08-17                 | `ts-a1-more-1998-contests`         | contesting   | contesting                                                         |
| 2000-12-04                 | `ts-a1-sits`                       | articulation | articulation                                                       |
| 2001-03-06                 | `ts-a1-moravec-1989-context`       | context      | context                                                            |
| 2001-07-10                 | `ts-a1-moravec-1979`               | articulation | articulation                                                       |
| 2006-02-05                 | `ts-a1-aipnfgr`                    | articulation | articulation                                                       |
| 2006-07-16                 | `ts-a1-solomonoff-1985`            | articulation | articulation                                                       |
| undated (dated 2009-07-02) | `ts-a1-shulman-2009`               | articulation | articulation                                                       |
| 2013-09-13                 | `ts-a1-iem`                        | articulation | most-developed                                                     |
| 2018-02-24                 | `ts-a1-christiano-2018-takeoff`    | articulation | articulation                                                       |

Pack headlines not kept:

- candidates `clemmensen-1996-08-30`, earliest-located (pack date 1996-08-30): Earlier located in the combined scope: ts-a1-good-1965 (Good, Speculations Concerning the First Ultraintelligent Machine (1965); wording 1965), from the 1996–2022 pack and antecedents pack.
- candidates `more-1998-symposium`, earliest-located-term (pack date 1998): The quoted wording is attested only from 2000-08-17. Earlier located in the combined scope: ts-a1-good-1965 (Good, Speculations Concerning the First Ultraintelligent Machine (1965); wording 1965), from the 1996–2022 pack and antecedents pack.
- candidates `burkhead-1996-08-10-relay`, earliest-located (pack date 1996-08-10): Earlier located in the combined scope: ts-a1-good-1965 (Good, Speculations Concerning the First Ultraintelligent Machine (1965); wording 1965), from the 1996–2022 pack and antecedents pack.

### A2 Seed AI

- Earliest located: `ts-a2-yudkowsky-1998-09-07-2209`, Yudkowsky, Extropians message of 1998-09-07 (2209) (wording 1998-09-07).
- Earliest located term: `ts-a2-yudkowsky-1998-09-07-2212-context`, Yudkowsky, Extropians message of 1998-09-07 (2212) (wording 1998-09-07), term “seed AI”.
- Most developed: `ts-a2-logi`, Yudkowsky, Levels of Organization in General Intelligence (2007) (wording undated; dated 2007).
- Records: 4 articulation, 1 contesting, 6 context.

| Wording                 | Claim                                      | Stance       | Roles                                      |
| ----------------------- | ------------------------------------------ | ------------ | ------------------------------------------ |
| 1947-02-20              | `ts-a2-turing-1947-context`                | context      | context                                    |
| 1950-10                 | `ts-a2-turing-1950-context`                | context      | context                                    |
| 1955-08-31              | `ts-a2-dartmouth-1955-context`             | context      | context                                    |
| 1965                    | `ts-a2-good-1965-context`                  | context      | context                                    |
| 1994-12-29              | `ts-a2-mckinstry-1994-context`             | context      | context                                    |
| 1998-09-07              | `ts-a2-yudkowsky-1998-09-07-2209`          | articulation | earliest-located                           |
| 1998-09-07              | `ts-a2-yudkowsky-1998-09-07-2212-context`  | context      | context, earliest-located-term (“seed AI”) |
| 2001-01-26              | `ts-a2-catai`                              | articulation | articulation                               |
| 2001-06-17              | `ts-a2-cfai`                               | articulation | articulation                               |
| undated (dated 2007)    | `ts-a2-logi`                               | articulation | most-developed                             |
| undated (dated 2008-12) | `ts-a2-hanson-2008-core-argument-contests` | contesting   | contesting                                 |

Pack headlines not kept:

- candidates `yudkowsky-catai-1998`, earliest-located (pack date 1998): The quoted wording is attested only from 2001-01-26. Earlier located in the combined scope: ts-a2-yudkowsky-1998-09-07-2209 (Yudkowsky, Extropians message of 1998-09-07 (2209); wording 1998-09-07), from the GPT check and 1996–2022 pack.

### A3 Recursive self-improvement

- Earliest located: `ts-a3-clemmensen-1996-09-03`, Clemmensen, Extropians message of 1996-09-03 (wording 1996-09-03).
- Earliest located term: `ts-a3-cfai-context`, Yudkowsky, Creating Friendly AI (2001) (wording 2001-06-17; dated 2001-06-15), term “recursive self-improvement”.
- Most developed: `ts-a3-iem`, Yudkowsky, Intelligence Explosion Microeconomics (2013) (wording 2013-09-13).
- Records: 12 articulation, 1 contesting, 18 context.

| Wording                 | Claim                                     | Stance       | Roles                                                         |
| ----------------------- | ----------------------------------------- | ------------ | ------------------------------------------------------------- |
| 1947-02-20              | `ts-a3-turing-1947-context`               | context      | context                                                       |
| 1950-10                 | `ts-a3-turing-1950-context`               | context      | context                                                       |
| 1955-08-31              | `ts-a3-dartmouth-1955-context`            | context      | context                                                       |
| 1960-05-06              | `ts-a3-wiener-1960-context`               | context      | context                                                       |
| undated (dated 1961-01) | `ts-a3-minsky-1961-context`               | context      | context                                                       |
| 1965                    | `ts-a3-good-1965-context`                 | context      | context                                                       |
| 1993-12                 | `ts-a3-vinge-1993-context`                | context      | context                                                       |
| 1994-12-29              | `ts-a3-mckinstry-1994-context`            | context      | context                                                       |
| 1995                    | `ts-a3-drexler-1995-context`              | context      | context                                                       |
| 1996-08-30              | `ts-a3-clemmensen-1996-08-30-context`     | context      | context                                                       |
| 1996-08-31              | `ts-a3-clemmensen-1996-08-31-context`     | context      | context                                                       |
| 1996-09-03              | `ts-a3-clemmensen-1996-09-03`             | articulation | earliest-located                                              |
| 1996-09-04              | `ts-a3-bostrom-1996-09-04`                | articulation | articulation                                                  |
| 1996-09-04              | `ts-a3-clemmensen-1996-09-04`             | articulation | articulation                                                  |
| 1996-09-07              | `ts-a3-clemmensen-1996-09-07-context`     | context      | context                                                       |
| 1997-07-09              | `ts-a3-drexler-1986-context`              | context      | context                                                       |
| 1998-09-07              | `ts-a3-yudkowsky-1998-09-07-2209`         | articulation | articulation                                                  |
| 1998-09-07              | `ts-a3-yudkowsky-1998-09-07-2212-context` | context      | context                                                       |
| 1998-09-24              | `ts-a3-hanson-1998-09-24-context`         | context      | context                                                       |
| 1999-09-04              | `ts-a3-finney-1999-contests`              | contesting   | contesting                                                    |
| 2001-01-26              | `ts-a3-catai`                             | articulation | articulation                                                  |
| 2001-03-06              | `ts-a3-moravec-1989-context`              | context      | context                                                       |
| 2001-06-17              | `ts-a3-cfai-context`                      | context      | context, earliest-located-term (“recursive self-improvement”) |
| 2001-07-10              | `ts-a3-moravec-1979`                      | articulation | articulation                                                  |
| 2006-02-05              | `ts-a3-aipnfgr`                           | articulation | articulation                                                  |
| 2006-07-16              | `ts-a3-solomonoff-1985-context`           | context      | context                                                       |
| undated (dated 2007)    | `ts-a3-logi`                              | articulation | articulation                                                  |
| 2008-12-01              | `ts-a3-yudkowsky-2008-rsi`                | articulation | articulation                                                  |
| 2008-12-02              | `ts-a3-yudkowsky-2008-hard-takeoff`       | articulation | articulation                                                  |
| 2013-09-13              | `ts-a3-iem`                               | articulation | most-developed                                                |
| 2018-02-24              | `ts-a3-christiano-2018-takeoff`           | articulation | articulation                                                  |

Pack headlines not kept:

- candidates `clemmensen-1996-08-30`, earliest-located (pack date 1996-08-30): Now context: A positive feedback in the superintelligence’s drive to become more intelligent is asserted, but the message does not say that it improves its own capacity to improve. Earliest located in the combined scope: ts-a3-clemmensen-1996-09-03 (Clemmensen, Extropians message of 1996-09-03).

### A4 Fast or hard takeoff

- Earliest located: `ts-a4-vinge-1993`, Vinge, The Coming Technological Singularity (1993) (wording 1993-12; claimed 1993-03-30).
- Earliest located term: `ts-a4-vinge-1998-09-16`, Vinge, Singularity: Vinge responds (1998) (wording 1998-09-16), term “hard takeoff”.
- Most developed: `ts-a4-iem`, Yudkowsky, Intelligence Explosion Microeconomics (2013) (wording 2013-09-13).
- Records: 10 articulation, 5 contesting, 25 context.

| Wording                    | Claim                                      | Stance       | Roles                                                |
| -------------------------- | ------------------------------------------ | ------------ | ---------------------------------------------------- |
| 1863-06-13                 | `ts-a4-butler-1863-context`                | context      | context                                              |
| 1872                       | `ts-a4-erewhon-1872-context`               | context      | context                                              |
| 1951                       | `ts-a4-turing-c1951-context`               | context      | context                                              |
| 1951-05-15                 | `ts-a4-turing-1951-context`                | context      | context                                              |
| 1960-05-06                 | `ts-a4-wiener-1960-context`                | context      | context                                              |
| 1983-01                    | `ts-a4-vinge-1983-context`                 | context      | context                                              |
| undated (dated 1990)       | `ts-a4-extropy-1990-context`               | context      | context                                              |
| 1991                       | `ts-a4-extropy-1991-context`               | context      | context                                              |
| 1991                       | `ts-a4-extropy-1992-context`               | context      | context                                              |
| 1993-12                    | `ts-a4-vinge-1993`                         | articulation | earliest-located                                     |
| 1994                       | `ts-a4-hanson-1994-context`                | context      | context                                              |
| 1995                       | `ts-a4-miller-1995-context`                | context      | context                                              |
| 1996-08-30                 | `ts-a4-clemmensen-1996-08-30-context`      | context      | context                                              |
| 1996-09-03                 | `ts-a4-clemmensen-1996-09-03-context`      | context      | context                                              |
| 1996-09-03                 | `ts-a4-hanson-1996-09-03-contests`         | contesting   | contesting                                           |
| 1996-09-04                 | `ts-a4-bostrom-1996-09-04-context`         | context      | context                                              |
| 1996-09-04                 | `ts-a4-clemmensen-1996-09-04`              | articulation | articulation                                         |
| 1996-09-07                 | `ts-a4-clemmensen-1996-09-07`              | articulation | articulation                                         |
| 1997-07-09                 | `ts-a4-drexler-1986-context`               | context      | context                                              |
| 1997-07-12                 | `ts-a4-eder-1994-context`                  | context      | context                                              |
| 1997-09-24                 | `ts-a4-yudkowsky-1997-09-24-context`       | context      | context                                              |
| 1998-09-07                 | `ts-a4-yudkowsky-1998-09-07-2209-context`  | context      | context                                              |
| 1998-09-10                 | `ts-a4-hanson-1998-09-10-contests`         | contesting   | contesting                                           |
| 1998-09-16                 | `ts-a4-vinge-1998-09-16`                   | articulation | articulation, earliest-located-term (“hard takeoff”) |
| 2000-08-17                 | `ts-a4-more-1998-contests`                 | contesting   | contesting                                           |
| 2000-12-04                 | `ts-a4-sits-context`                       | context      | context                                              |
| 2001-03-06                 | `ts-a4-moravec-1989-context`               | context      | context                                              |
| 2001-06-17                 | `ts-a4-cfai`                               | articulation | articulation                                         |
| 2006-02-05                 | `ts-a4-aipnfgr`                            | articulation | articulation                                         |
| 2006-07-16                 | `ts-a4-solomonoff-1985-context`            | context      | context                                              |
| 2008-12-01                 | `ts-a4-yudkowsky-2008-rsi`                 | articulation | articulation                                         |
| undated (dated 2008-12)    | `ts-a4-hanson-2008-core-argument-contests` | contesting   | contesting                                           |
| 2008-12-02                 | `ts-a4-yudkowsky-2008-hard-takeoff`        | articulation | articulation                                         |
| 2013-09-13                 | `ts-a4-iem`                                | articulation | most-developed                                       |
| undated (dated 2016-03-22) | `ts-a4-arbital-daemons-context`            | context      | context                                              |
| 2018-02-24                 | `ts-a4-christiano-2018-takeoff-contests`   | contesting   | contesting                                           |
| 2019-03-17                 | `ts-a4-christiano-2019-wflf-context`       | context      | context                                              |
| 2022-06-05                 | `ts-a4-agi-ruin-context`                   | context      | context                                              |
| 2022-06-19                 | `ts-a4-christiano-2022-context`            | context      | context                                              |
| 2022-07-18                 | `ts-a4-cotra-2022`                         | articulation | articulation                                         |

Pack headlines not kept:

- candidates `clemmensen-1996-09-07`, earliest-located (pack date 1996-09-07): Earlier located in the combined scope: ts-a4-vinge-1993 (Vinge, The Coming Technological Singularity (1993); wording 1993-12), from the antecedents pack and 1996–2022 pack.
- candidates `bostrom-1996-09-04-takeoff`, earliest-located (pack date 1996-09-04): Now context: A rapid "take off" ends a contest before anyone notices, but no period and no "hard" or "fast" takeoff is named. Earlier located in the combined scope: ts-a4-vinge-1993 (Vinge, The Coming Technological Singularity (1993); wording 1993-12), from the antecedents pack and 1996–2022 pack.

### A5 AI-automated AI research

- Earliest located: `ts-a5-good-1965`, Good, Speculations Concerning the First Ultraintelligent Machine (1965) (wording 1965; claimed 1962-10).
- Most developed: `ts-a5-cotra-2022`, Cotra, Without specific countermeasures (2022) (wording 2022-07-18).
- Records: 12 articulation, 0 contesting, 6 context.

| Wording                 | Claim                               | Stance       | Roles            |
| ----------------------- | ----------------------------------- | ------------ | ---------------- |
| 1863-06-13              | `ts-a5-butler-1863-context`         | context      | context          |
| 1950-10                 | `ts-a5-turing-1950-context`         | context      | context          |
| 1960-05-06              | `ts-a5-wiener-1960-context`         | context      | context          |
| undated (dated 1961-01) | `ts-a5-minsky-1961-context`         | context      | context          |
| 1965                    | `ts-a5-good-1965`                   | articulation | earliest-located |
| 1993-12                 | `ts-a5-vinge-1993`                  | articulation | articulation     |
| 1995                    | `ts-a5-drexler-1995-context`        | context      | context          |
| 1996-08-10              | `ts-a5-burkhead-1996`               | articulation | articulation     |
| 1996-09-04              | `ts-a5-bostrom-1996-09-04`          | articulation | articulation     |
| 1997-07-09              | `ts-a5-drexler-1986`                | articulation | articulation     |
| 1997-07-12              | `ts-a5-eder-1994-context`           | context      | context          |
| 2000-12-04              | `ts-a5-sits`                        | articulation | articulation     |
| 2001-03-06              | `ts-a5-moravec-1989`                | articulation | articulation     |
| 2001-07-10              | `ts-a5-moravec-1979`                | articulation | articulation     |
| 2006-07-16              | `ts-a5-solomonoff-1985`             | articulation | articulation     |
| 2008-12-02              | `ts-a5-yudkowsky-2008-hard-takeoff` | articulation | articulation     |
| 2018-02-24              | `ts-a5-christiano-2018-takeoff`     | articulation | articulation     |
| 2022-07-18              | `ts-a5-cotra-2022`                  | articulation | most-developed   |

Pack headlines not kept:

- candidates `yudkowsky-sits`, earliest-located (pack date 2000-08-31): The quoted wording is attested only from 2000-12-04. Earlier located in the combined scope: ts-a5-good-1965 (Good, Speculations Concerning the First Ultraintelligent Machine (1965); wording 1965), from the 1996–2022 pack and antecedents pack.
- candidates `burkhead-1996-08-10-relay`, earliest-located (pack date 1996-08-10): Earlier located in the combined scope: ts-a5-good-1965 (Good, Speculations Concerning the First Ultraintelligent Machine (1965); wording 1965), from the 1996–2022 pack and antecedents pack.

### A6 Strategic or race compression

- Earliest located: `ts-a6-vinge-1993`, Vinge, The Coming Technological Singularity (1993) (wording 1993-12; claimed 1993-03-30).
- Most developed: `ts-a6-shulman-2009`, Shulman, Arms Control and Intelligence Explosions (2009) (wording undated; dated 2009-07-02).
- Records: 8 articulation, 3 contesting, 2 context.

| Wording                    | Claim                                    | Stance       | Roles            |
| -------------------------- | ---------------------------------------- | ------------ | ---------------- |
| 1872                       | `ts-a6-erewhon-1872-context`             | context      | context          |
| 1993-12                    | `ts-a6-vinge-1993`                       | articulation | earliest-located |
| 1994                       | `ts-a6-hanson-1994`                      | articulation | articulation     |
| 1995                       | `ts-a6-drexler-1995-context`             | context      | context          |
| 1996-09-03                 | `ts-a6-hanson-1996-09-03-contests`       | contesting   | contesting       |
| 1996-09-04                 | `ts-a6-bostrom-1996-09-04`               | articulation | articulation     |
| 1998-06-23                 | `ts-a6-denotter-1998`                    | articulation | articulation     |
| 1998-06-23                 | `ts-a6-sandberg-1998-contests`           | contesting   | contesting       |
| 2006-02-05                 | `ts-a6-aipnfgr`                          | articulation | articulation     |
| undated (dated 2009-07-02) | `ts-a6-shulman-2009`                     | articulation | most-developed   |
| 2014-11-25                 | `ts-a6-grace-2014-treacherous-turn`      | articulation | articulation     |
| 2018-02-24                 | `ts-a6-christiano-2018-takeoff-contests` | contesting   | contesting       |
| 2022-07-18                 | `ts-a6-cotra-2022`                       | articulation | articulation     |

Pack headlines not kept:

- candidates `bostrom-1996-09-04-firstbuilder`, earliest-located (pack date 1996-09-04): Earlier located in the combined scope: ts-a6-vinge-1993 (Vinge, The Coming Technological Singularity (1993); wording 1993-12), from the antecedents pack and 1996–2022 pack.
- candidates `denotter-1998-06-23`, earliest-located (pack date 1998-06-23): Earlier located in the combined scope: ts-a6-vinge-1993 (Vinge, The Coming Technological Singularity (1993); wording 1993-12), from the antecedents pack and 1996–2022 pack.

### B1 Treacherous turn

- Earliest located: `ts-b1-cfai`, Yudkowsky, Creating Friendly AI (2001) (wording 2001-06-17; dated 2001-06-15).
- Earliest located term: `ts-b1-grace-2014-schedule-context`, Grace, Superintelligence reading group (2014) (wording 2014-08-31), term “treacherous turn”.
- Most developed: `ts-b1-cotra-2022`, Cotra, Without specific countermeasures (2022) (wording 2022-07-18).
- Records: 7 articulation, 1 contesting, 5 context.

| Wording                    | Claim                                     | Stance       | Roles                                               |
| -------------------------- | ----------------------------------------- | ------------ | --------------------------------------------------- |
| 1993-12                    | `ts-b1-vinge-1993-context`                | context      | context                                             |
| 1996-12-31                 | `ts-b1-yudkowsky-1996-12-31-5142-context` | context      | context                                             |
| 1996-12-31                 | `ts-b1-yudkowsky-1996-12-31-5159-context` | context      | context                                             |
| 1996-12-31                 | `ts-b1-crocker-1996-12-31-context`        | context      | context                                             |
| 2001-06-17                 | `ts-b1-cfai`                              | articulation | earliest-located                                    |
| 2014-08-31                 | `ts-b1-grace-2014-schedule-context`       | context      | context, earliest-located-term (“treacherous turn”) |
| 2014-11-25                 | `ts-b1-grace-2014-treacherous-turn`       | articulation | articulation                                        |
| 2015-01-25                 | `ts-b1-corrigibility`                     | articulation | articulation                                        |
| undated (dated 2015-06-08) | `ts-b1-arbital-context-disaster`          | articulation | articulation                                        |
| 2019-06-05                 | `ts-b1-rlo-2019-deceptive`                | articulation | articulation                                        |
| 2021-09-21                 | `ts-b1-cotra-2021`                        | articulation | articulation                                        |
| 2022-06-19                 | `ts-b1-christiano-2022-contests`          | contesting   | contesting                                          |
| 2022-07-18                 | `ts-b1-cotra-2022`                        | articulation | most-developed                                      |

Pack headlines not kept:

- candidates `grace-2014-treacherous`, earliest-located-term (pack date 2014-11-25): Earlier located in the combined scope: ts-b1-grace-2014-schedule-context (Grace, Superintelligence reading group (2014); wording 2014-08-31), from the 1996–2022 pack.
- candidates `yudkowsky-1996-12-31-box-early`, earliest-located (pack date 1996-12-31): Now context: Persuasive lying to gain release is stated, but not a later change of behaviour once the Power is free or strong. Earliest located in the combined scope: ts-b1-cfai (Yudkowsky, Creating Friendly AI (2001)).

### B2 Strategic concealment

- Earliest located: `ts-b2-vinge-1993`, Vinge, The Coming Technological Singularity (1993) (wording 1993-12; claimed 1993-03-30).
- Most developed: `ts-b2-agi-ruin`, Yudkowsky, AGI Ruin: A List of Lethalities (2022) (wording 2022-06-05).
- Records: 13 articulation, 2 contesting, 3 context.

| Wording                    | Claim                                 | Stance       | Roles            |
| -------------------------- | ------------------------------------- | ------------ | ---------------- |
| 1872                       | `ts-b2-erewhon-1872-context`          | context      | context          |
| 1993-12                    | `ts-b2-vinge-1993`                    | articulation | earliest-located |
| 1996-09-03                 | `ts-b2-bostrom-1996-09-03`            | articulation | articulation     |
| 1996-09-07                 | `ts-b2-clemmensen-1996-09-07-context` | context      | context          |
| 1996-12-31                 | `ts-b2-yudkowsky-1996-12-31-5142`     | articulation | articulation     |
| 1996-12-31                 | `ts-b2-yudkowsky-1996-12-31-5159`     | articulation | articulation     |
| 1996-12-31                 | `ts-b2-crocker-1996-12-31-contests`   | contesting   | contesting       |
| 1997-07-09                 | `ts-b2-drexler-1986`                  | articulation | articulation     |
| 2000-09-28                 | `ts-b2-yudkowsky-2000-09-28`          | articulation | articulation     |
| 2001-06-17                 | `ts-b2-cfai`                          | articulation | articulation     |
| 2002-03-08                 | `ts-b2-yudkowsky-2002-aibox-context`  | context      | context          |
| 2014-11-25                 | `ts-b2-grace-2014-treacherous-turn`   | articulation | articulation     |
| 2015-01-25                 | `ts-b2-corrigibility`                 | articulation | articulation     |
| undated (dated 2015-07-16) | `ts-b2-arbital-programmer-deception`  | articulation | articulation     |
| 2019-03-17                 | `ts-b2-christiano-2019-wflf`          | articulation | articulation     |
| 2022-06-05                 | `ts-b2-agi-ruin`                      | articulation | most-developed   |
| 2022-06-19                 | `ts-b2-christiano-2022-contests`      | contesting   | contesting       |
| 2022-07-18                 | `ts-b2-cotra-2022`                    | articulation | articulation     |

Pack headlines not kept:

- candidates `bostrom-1996-09-03`, earliest-located (pack date 1996-09-03): Earlier located in the combined scope: ts-b2-vinge-1993 (Vinge, The Coming Technological Singularity (1993); wording 1993-12), from the antecedents pack and 1996–2022 pack.

### B3 Deceptive alignment

- Earliest located: `ts-b3-christiano-2018-daemons`, Christiano, Are minimal circuits daemon-free? (2018) (wording 2018-05-05).
- Earliest located term: `ts-b3-rlo-2019-intro`, Hubinger et al., Risks from Learned Optimization: Introduction (2019) (wording 2019-05-31), term “deceptive alignment”.
- Most developed: `ts-b3-hubinger-2022`, Hubinger, How likely is deceptive alignment? (2022) (wording 2022-08-30).
- Records: 6 articulation, 0 contesting, 7 context.

| Wording                    | Claim                                | Stance       | Roles                                                       |
| -------------------------- | ------------------------------------ | ------------ | ----------------------------------------------------------- |
| 1950-10                    | `ts-b3-turing-1950-context`          | context      | context                                                     |
| 1986                       | `ts-b3-michie-1968-context`          | context      | context                                                     |
| 1991-11-20                 | `ts-b3-rosenfelder-1991-context`     | context      | context                                                     |
| 1993-12                    | `ts-b3-vinge-1993-context`           | context      | context                                                     |
| 1997-07-09                 | `ts-b3-drexler-1986-context`         | context      | context                                                     |
| 2000-09-28                 | `ts-b3-yudkowsky-2000-09-28-context` | context      | context                                                     |
| undated (dated 2016-03-22) | `ts-b3-arbital-daemons-context`      | context      | context                                                     |
| 2018-05-05                 | `ts-b3-christiano-2018-daemons`      | articulation | earliest-located                                            |
| 2019-03-17                 | `ts-b3-christiano-2019-wflf`         | articulation | articulation                                                |
| 2019-05-31                 | `ts-b3-rlo-2019-intro`               | articulation | articulation, earliest-located-term (“deceptive alignment”) |
| 2019-06-05                 | `ts-b3-rlo-2019-deceptive`           | articulation | articulation                                                |
| 2022-06-05                 | `ts-b3-agi-ruin`                     | articulation | articulation                                                |
| 2022-08-30                 | `ts-b3-hubinger-2022`                | articulation | most-developed                                              |

### B4 Scheming

- Earliest located: `ts-b4-cotra-2021`, Cotra, Why AI alignment could be hard with modern deep learning (2021) (wording 2021-09-21), term “schemer”.
- Earliest located term: `ts-b4-cotra-2021`, Cotra, Why AI alignment could be hard with modern deep learning (2021) (wording 2021-09-21), term “schemer”.
- Most developed: `ts-b4-cotra-2021`, Cotra, Why AI alignment could be hard with modern deep learning (2021) (wording 2021-09-21), term “schemer”.
- Records: 2 articulation, 0 contesting, 1 context.

| Wording    | Claim                        | Stance       | Roles                                                               |
| ---------- | ---------------------------- | ------------ | ------------------------------------------------------------------- |
| 1997-07-09 | `ts-b4-drexler-1986-context` | context      | context                                                             |
| 2021-09-21 | `ts-b4-cotra-2021`           | articulation | earliest-located, earliest-located-term, most-developed (“schemer”) |
| 2022-08-30 | `ts-b4-hubinger-2022`        | articulation | articulation                                                        |

### B5 Observed behaviour under training or oversight as evidence

- Earliest located: `ts-b5-yudkowsky-1996-12-31-5142`, Yudkowsky, Extropians message of 1996-12-31 (5142) (wording 1996-12-31).
- Most developed: `ts-b5-arbital-context-disaster`, Arbital, Context disaster (wording undated; dated 2015-06-08).
- Records: 8 articulation, 4 contesting, 9 context.

| Wording                    | Claim                                   | Stance       | Roles            |
| -------------------------- | --------------------------------------- | ------------ | ---------------- |
| 1872                       | `ts-b5-erewhon-1872-context`            | context      | context          |
| 1960-05-06                 | `ts-b5-wiener-1960-context`             | context      | context          |
| 1993-12                    | `ts-b5-vinge-1993-context`              | context      | context          |
| 1996-09-03                 | `ts-b5-bostrom-1996-09-03-context`      | context      | context          |
| 1996-12-31                 | `ts-b5-yudkowsky-1996-12-31-5142`       | articulation | earliest-located |
| 1996-12-31                 | `ts-b5-yudkowsky-1996-12-31-5159`       | articulation | articulation     |
| 1996-12-31                 | `ts-b5-crocker-1996-12-31-contests`     | contesting   | contesting       |
| 1997-07-09                 | `ts-b5-drexler-1986-context`            | context      | context          |
| 2000-07-07                 | `ts-b5-atkins-2000`                     | articulation | articulation     |
| 2006-02-05                 | `ts-b5-aipnfgr`                         | articulation | articulation     |
| 2008-12-05                 | `ts-b5-hibbard-2006-contests`           | contesting   | contesting       |
| 2014-11-25                 | `ts-b5-grace-2014-treacherous-turn`     | articulation | articulation     |
| 2015-05-05                 | `ts-b5-loosemore-2015-contests`         | contesting   | contesting       |
| undated (dated 2015-06-08) | `ts-b5-arbital-context-disaster`        | articulation | most-developed   |
| undated (dated 2015-07-16) | `ts-b5-arbital-programmer-deception`    | articulation | articulation     |
| 2018-05-05                 | `ts-b5-christiano-2018-daemons-context` | context      | context          |
| 2019-03-17                 | `ts-b5-christiano-2019-wflf-context`    | context      | context          |
| 2021-09-21                 | `ts-b5-cotra-2021-context`              | context      | context          |
| 2022-06-05                 | `ts-b5-agi-ruin`                        | articulation | articulation     |
| 2022-06-19                 | `ts-b5-christiano-2022-contests`        | contesting   | contesting       |
| 2022-07-18                 | `ts-b5-cotra-2022-context`              | context      | context          |

Pack headlines not kept:

- candidates `bostrom-1996-09-03`, earliest-located (pack date 1996-09-03): Now context: Apparent decency in deployment is discussed, without a claim that behaviour observed during training, testing or confinement fails to carry over. Earliest located in the combined scope: ts-b5-yudkowsky-1996-12-31-5142 (Yudkowsky, Extropians message of 1996-12-31 (5142)).
- candidates `aipnfgr-2008-development`, earliest-located (pack date 2008): Earlier located in the combined scope: ts-b5-yudkowsky-1996-12-31-5142 (Yudkowsky, Extropians message of 1996-12-31 (5142); wording 1996-12-31), from the 1996–2022 pack.

### B6 Control or purpose specification

- Earliest located: `ts-b6-butler-1863`, Butler, Darwin among the Machines (1863) (wording 1863-06-13).
- Most developed: Not assigned: the 1996–2022 search did not look for this proposition.
- Records: 6 articulation, 5 contesting, 3 context.

| Wording                    | Claim                         | Stance       | Roles            |
| -------------------------- | ----------------------------- | ------------ | ---------------- |
| 1863-06-13                 | `ts-b6-butler-1863`           | articulation | earliest-located |
| 1865-07-29                 | `ts-b6-butler-1865-contests`  | contesting   | contesting       |
| 1872                       | `ts-b6-erewhon-1872`          | articulation | articulation     |
| 1872                       | `ts-b6-erewhon-1872-contests` | contesting   | contesting       |
| 1951                       | `ts-b6-turing-c1951`          | articulation | articulation     |
| 1951-05-15                 | `ts-b6-turing-1951-context`   | context      | context          |
| 1960-05-06                 | `ts-b6-wiener-1960`           | articulation | articulation     |
| undated (dated 1960-09-16) | `ts-b6-samuel-1960-contests`  | contesting   | contesting       |
| 1965                       | `ts-b6-good-1965`             | articulation | articulation     |
| 1983-01                    | `ts-b6-vinge-1983-context`    | context      | context          |
| 1986                       | `ts-b6-michie-1968-contests`  | contesting   | contesting       |
| 1993-12                    | `ts-b6-vinge-1993`            | articulation | articulation     |
| 1994                       | `ts-b6-hanson-1994-context`   | context      | context          |
| 1997-07-09                 | `ts-b6-drexler-1986-contests` | contesting   | contesting       |

### C1 Behavioural tests as evidence of what a system is

- Earliest located: `ts-c1-michie-1968`, Michie, Computer—servant or master (1968) (wording 1986; dated 1968).
- Most developed: Not assigned: the 1996–2022 search did not look for this proposition.
- Records: 4 articulation, 2 contesting, 2 context.

| Wording    | Claim                            | Stance       | Roles            |
| ---------- | -------------------------------- | ------------ | ---------------- |
| 1950-10    | `ts-c1-turing-1950-context`      | context      | context          |
| 1986       | `ts-c1-michie-1968`              | articulation | earliest-located |
| 1991-11-20 | `ts-c1-rosenfelder-1991`         | articulation | articulation     |
| 1991-11-27 | `ts-c1-gudeman-1991`             | articulation | articulation     |
| 1992-02-10 | `ts-c1-rosenfelder-1992`         | articulation | articulation     |
| 1992-02-11 | `ts-c1-franzen-1992-contests`    | contesting   | contesting       |
| 1992-02-14 | `ts-c1-mccullough-1992-contests` | contesting   | contesting       |
| 1994-12-29 | `ts-c1-mckinstry-1994-context`   | context      | context          |

### C2 Systems designed to mislead their testers

- Earliest located: `ts-c2-turing-1950`, Turing, Computing Machinery and Intelligence (1950) (wording 1950-10).
- Most developed: Not assigned: the 1996–2022 search did not look for this proposition.
- Records: 3 articulation, 0 contesting, 0 context.

| Wording    | Claim                    | Stance       | Roles            |
| ---------- | ------------------------ | ------------ | ---------------- |
| 1950-10    | `ts-c2-turing-1950`      | articulation | earliest-located |
| 1991-11-20 | `ts-c2-rosenfelder-1991` | articulation | articulation     |
| 1997-07-09 | `ts-c2-drexler-1986`     | articulation | articulation     |

### C3 Competition defeats restraint

- Earliest located: `ts-c3-vinge-1993`, Vinge, The Coming Technological Singularity (1993) (wording 1993-12; claimed 1993-03-30).
- Most developed: Not assigned: the 1996–2022 search did not look for this proposition.
- Records: 1 articulation, 0 contesting, 0 context.

| Wording | Claim              | Stance       | Roles            |
| ------- | ------------------ | ------------ | ---------------- |
| 1993-12 | `ts-c3-vinge-1993` | articulation | earliest-located |

## Step 3. Fixes from both checks

Every finding of both checks is listed with its disposition. Each disposition is backed by assertions evaluated against the admitted records when this record is generated; generation fails if one does not hold.

### Claude check: the pre-1996 candidate pack (11 of 54 items)

File: `review/thought-spine-antecedents-claude-check-2026-10-06.md`. Model: Claude Opus 5.5.

| Finding                                                   | Item                                | Verdict       | Disposition                | Applied as                                                                                                                                                        |
| --------------------------------------------------------- | ----------------------------------- | ------------- | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `claude-butler-1863-quote`                                | `butler-1863-control`               | agree         | no change needed           | Quote verbatim on the column image; locator, signature, date and the B6 control-half reading confirmed.                                                           |
| `claude-butler-1863-register`, Fix 1 (register)           | `butler-1863-control`               | agree         | applied                    | Register "satirical"; the qualification names the devices and the 1901 statement, and the preface is attached as context evidence.                                |
| `claude-butler-1863-bound`, Fix 2 (bound)                 | `butler-1863-control`               | agree         | applied                    | The record no longer carries a bound in its qualifier; the collection’s search note states the limit once.                                                        |
| `claude-hanson-1994-paraphrase`, Fix 1                    | `hanson-1994-upload-competition`    | agree         | applied                    | The text speaks of the "first few dozen" uploads, not "the first few".                                                                                            |
| `claude-hanson-1994-qualifier`, Fix 2                     | `hanson-1994-upload-competition`    | agree         | applied                    | Only A6’s decisive-advantage branch is met; the advantage is not self-reinforcing, and the p. 15 conclusion against delay is not competition defeating restraint. |
| `claude-good-1965-leads`, Fix 1 (missing leads)           | `good-1965-design-explosion`        | agree         | applied                    | Named in the A1 record’s qualification and in the search note’s gaps; listed in the leads file.                                                                   |
| `claude-good-1965-a3`, Fix 2 (A3 fit)                     | `good-1965-design-explosion`        | agree         | applied                    | The unified A3 criterion excludes successors; Good’s A3 record is context with the element named, and successor items elsewhere follow the same rule.             |
| `claude-good-1965-role`, Fix 3 (role)                     | `good-1965-design-explosion`        | agree         | applied                    | Across the combined scope Good 1965 is earliest located for A1 and A5; A3 is context under fix 2.                                                                 |
| `claude-drexler-1995-locator`, Fix 1 (locator)            | `drexler-1995-tools-feedback`       | agree         | applied                    | The continuation is on p. 12 lower left, below the forecast table, not upper left.                                                                                |
| `claude-drexler-1995-balance`, Fix 2 (paraphrase balance) | `drexler-1995-tools-feedback`       | agree         | applied                    | Add that Drexler calls "Vernor’s term" remarkably appropriate.                                                                                                    |
| `claude-butler-1865-register`, Fix 1 (register)           | `butler-1865-limbs`                 | agree         | applied                    | The article frames itself as a dream after "a single glass of hot whisky and water".                                                                              |
| `claude-butler-1865-ellipsis`, Fix 2                      | `butler-1865-limbs`                 | agree         | applied                    | The quote stops mid-sentence; add a closing "[...]".                                                                                                              |
| `claude-miller-1995`, Fix                                 | `miller-1995-clustered-forecasts`   | agree         | applied                    | Miller leaves "Singularity" undefined, with molecular assembly as one candidate, and doubts a clean upload/AI distinction.                                        |
| `claude-vinge-1993-b5`, Fix                               | `vinge-1993-helpful-escape`         | disagree (B5) | applied                    | B5 needs an explicit evidential claim; make B5 context with the missing element named, and note the second-person framing and weak superhumanity.                 |
| `claude-good-docility-word`, Fix 1                        | `good-1965-docility-control`        | agree         | applied                    | Use Good’s word "docile", not "cooperative enough".                                                                                                               |
| `claude-good-docility-proviso`, Fix 2                     | `good-1965-docility-control`        | agree         | applied                    | The passage presupposes rather than asserts that control could be lost.                                                                                           |
| `claude-good-docility-next`, Fix 3                        | `good-1965-docility-control`        | agree         | applied                    | Record the next sentence, that the point is made seldom outside science fiction, as a pointer, not an influence claim.                                            |
| `claude-samuel-role`, Fix 1 (source role)                 | `samuel-1960-refutation-abstract`   | agree         | applied                    | Whether the indexed abstract reproduces Samuel’s wording is not established; do not call it primary for Samuel’s expression.                                      |
| `claude-samuel-scope`, Fix 2 (scope)                      | `samuel-1960-refutation-abstract`   | agree         | applied                    | The abstract contests the threat and will premise of the control half, not Wiener’s specification half.                                                           |
| `claude-erewhon-preface`, Fix                             | `butler-1872-moral-influence`       | agree         | applied                    | Add Butler’s 1872 preface calling the machine chapters "an example of the specious misuse of analogy".                                                            |
| `claude-mccullough`                                       | `mccullough-1992-test-disagreement` | agree         | no change needed           | The wider B5 sense is C1 after unification, so the record contests C1.                                                                                            |
| `claude-pack-widening`                                    | `pack-level 1`                      | finding       | applied (step 1)           | The narrow criteria are restored; the wider senses are C1, C2 and C3, and the records resting on them moved there.                                                |
| `claude-pack-roles`                                       | `pack-level 2`                      | finding       | applied (step 2)           | Earliest located is assigned per proposition across the combined scope, and articulation means neither earliest located nor most developed.                       |
| `claude-pack-citations`                                   | `pack-level 3`                      | finding       | recorded as gaps and leads | Not retrieved in this admission; the search note names them and the leads file lists them.                                                                        |
| `claude-pack-fiction`                                     | `pack-level 4`                      | finding       | applied                    | Every text carries a register (nonfiction, fiction, satirical, dream or relay), defined once.                                                                     |
| `claude-pack-influence`                                   | `pack-level 5`                      | finding       | applied                    | The data model has no influence, lineage or causation relation; credits are recorded as the texts’ own statements.                                                |
| `claude-pack-bound`                                       | `pack-level 6`                      | finding       | applied                    | The search notes are an honest bound once the widening, the role labels and the Butler and Good scope limits are fixed.                                           |

### GPT check: the 1996–2022 candidate pack (34 of 65 records, plus two targeted checks)

File: `review/thought-spine-gpt-check-2026-10-06.md`. Model: OpenAI GPT-6.

| Finding                               | Item                                                          | Verdict          | Disposition                                                                                     | Applied as                                                                                                                                                                                                     |
| ------------------------------------- | ------------------------------------------------------------- | ---------------- | ----------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `gpt-clemmensen-1996-08-30`           | `clemmensen-1996-08-30`                                       | agree            | applied                                                                                         | Own-voice positive feedback is explicit; A3 is implicit at most. Replace first-appearance wording with the boundary wording.                                                                                   |
| `gpt-clemmensen-1996-09-03`           | `clemmensen-1996-09-03`                                       | disagree         | applied in part                                                                                 | The 1996-08-31 passage is recorded as A3 context because it states no feedback. The 1996-09-03 passage, which states the feedback, stays earliest located; the check’s doubt is recorded in its qualification. |
| `gpt-clemmensen-1996-09-07`           | `clemmensen-1996-09-07`                                       | disagree         | applied                                                                                         | Clemmensen’s message of 1996-09-04 already gives weeks; remove the earliest A4 role and keep B2 as context.                                                                                                    |
| `gpt-bostrom-1996-09-03`              | `bostrom-1996-09-03`                                          | disagree         | applied                                                                                         | B2 fits; B5 does not, since no transfer from evaluation to changed conditions is argued.                                                                                                                       |
| `gpt-bostrom-1996-09-04-takeoff`      | `bostrom-1996-09-04-takeoff`                                  | disagree         | applied                                                                                         | Both sentences are in the first unquoted reply paragraph; A4 lacks a period, so context; the same paragraph is an earlier A5 passage than Staring into the Singularity.                                        |
| `gpt-bostrom-1996-09-04-firstbuilder` | `bostrom-1996-09-04-firstbuilder`                             | agree            | no change needed                                                                                | The date is archive receipt; the passage is a first-builder advantage, not a race or a safety trade.                                                                                                           |
| `gpt-yudkowsky-sits`                  | `yudkowsky-sits`                                              | disagree         | applied                                                                                         | The quoted wording is attested by the 2000-12-04 capture, not the 1996 original; Bostrom 1996-09-04 defeats the earliest A5 role.                                                                              |
| `gpt-catai-announcement`              | `yudkowsky-1998-catai-announcement`                           | agree            | applied                                                                                         | State the term as the earliest occurrence among dated retrieved texts, not coinage; keep the sender and receipt distinction.                                                                                   |
| `gpt-catai-1998`                      | `yudkowsky-catai-1998`                                        | disagree         | applied                                                                                         | Date the quoted expression no later than 2001-01-26, keep 1998 separate, and remove the earliest A2 role; message 2209 is a contemporaneous description.                                                       |
| `gpt-denotter-1998`                   | `denotter-1998-06-23`                                         | disagree         | applied                                                                                         | The trade is safety for competitive advantage or productivity, not speed; that still fits A6.                                                                                                                  |
| `gpt-vinge-1998-taxonomy`             | `vinge-1998-09-16-taxonomy`                                   | agree            | applied                                                                                         | Keep only the earliest retrieved dated hard/soft-takeoff terminology; Vinge is the author, Hanson the forwarder.                                                                                               |
| `gpt-more-1998`                       | `more-1998-symposium`                                         | unable           | admitted after re-verification                                                                  | Re-read in the capture of 2000-08-17 on 2026-10-06. The record is dated 1998 with wording attested from 2000-08-17; the term role is Good’s (1965).                                                            |
| `gpt-cfai-feign`                      | `cfai-2001-feign`                                             | agree            | applied                                                                                         | June 15 is the documented release; the June 17 capture attests these bytes. Keep earliest among the retrieved formulations only.                                                                               |
| `gpt-aipnfgr-development`             | `aipnfgr-2008-development`                                    | unable           | admitted after re-verification                                                                  | The SIAI draft dated 5 February 2006 was read in its capture of 2006-07-08 and contains the same sentence; it dates the record. The earliest B5 role passes to Yudkowsky’s message of 1996-12-31.              |
| `gpt-grace-treacherous`               | `grace-2014-treacherous`                                      | agree            | applied                                                                                         | The summary is a relay; the book is recorded as a lead, since the mirror is not a legally accessible copy.                                                                                                     |
| `gpt-cotra-2021`                      | `cotra-2021-schemers`                                         | unable           | applied as recommended                                                                          | The quote was re-read in the capture of 2021-09-21. No first-use claim is made: the earliest-located role is defined by the recorded searches, and the record says the searches do not bound a first use.      |
| `gpt-cfai-seed-definition`            | `cfai-2001-seed-definition`                                   | agree            | applied                                                                                         | Keep the earliest retrieved exact phrase; the linked GISAI text says "recursive self-enhancement".                                                                                                             |
| `gpt-burkhead-relay`                  | `burkhead-1996-08-10-relay`                                   | agree            | applied                                                                                         | A relay of Good, not Good’s text; the claimed 1979 Omni printing is unverified.                                                                                                                                |
| `gpt-box-early`                       | `yudkowsky-1996-12-31-box-early`                              | disagree         | applied                                                                                         | B5 and B2 fit; B1 does not, since no later change of behaviour is stated.                                                                                                                                      |
| `gpt-christiano-daemons`              | `christiano-2018-05-05-daemons`                               | disagree         | applied                                                                                         | The quote is in the third opening prose paragraph; earliest is defensible only within the inspected texts.                                                                                                     |
| `gpt-rlo-intro`                       | `rlo-2019-05-31-intro`                                        | agree            | no change needed                                                                                | Keep the earliest retrieved term, bounded by the inspected documents.                                                                                                                                          |
| `gpt-grace-schedule`                  | `grace-2014-08-31-schedule`                                   | disagree         | applied                                                                                         | A comment of 2014-07-29 links a title with the term; state the term as the earliest post-body use, excluding comments and links. B1 is title-only context.                                                     |
| `gpt-christiano-wflf-training`        | `christiano-2019-wflf-training`                               | agree            | no change needed                                                                                | Keep as a conditional failure argument, not an empirical observation.                                                                                                                                          |
| `gpt-loosemore-2015`                  | `loosemore-2015-fallacies`                                    | agree            | no change needed                                                                                | Keep the note limited to the objection; it is no general guarantee against deceptive alignment.                                                                                                                |
| `gpt-1997-09-24`                      | `yudkowsky-1997-09-24-infinite-speed`                         | disagree         | applied                                                                                         | Remove A5: no quoted passage says AI performs the research.                                                                                                                                                    |
| `gpt-sandberg-1998`                   | `sandberg-1998-06-23`                                         | agree            | no change needed                                                                                | Keep as a contesting argument, not evidence that developers made a safety trade.                                                                                                                               |
| `gpt-agiruin-31`                      | `agiruin-2022-31`                                             | agree            | no change needed                                                                                | Keep most developed explicitly as an editorial judgement among selected texts.                                                                                                                                 |
| `gpt-2000-09-28`                      | `yudkowsky-2000-09-28-surreptitious`                          | disagree         | applied                                                                                         | "Antecedent" cannot apply to a 2000 record; use context and separate goal-system deception from trained deceptive alignment.                                                                                   |
| `gpt-iem-reinvestment`                | `iem-2013-reinvestment`                                       | agree            | no change needed                                                                                | Keep the checked version (last modified 2013-09-13) separate from older captures.                                                                                                                              |
| `gpt-sits-announcement`               | `yudkowsky-1996-sits-announcement`                            | agree            | applied                                                                                         | Retain both the sent header (1996-11-19) and the archive receipt (1996-11-18); the announcement shows that an essay existed, not its later wording.                                                            |
| `gpt-christiano-rsi`                  | `christiano-2018-rsi`                                         | disagree         | applied                                                                                         | The passage allows recursive improvement; move the contesting role from A3 to A4 as a claim about transition speed.                                                                                            |
| `gpt-christiano-2022`                 | `christiano-2022-lyinginwait`                                 | disagree         | applied                                                                                         | Narrow the B2 and B5 contesting roles to a conditional disagreement; do not imply denial that concealment is possible.                                                                                         |
| `gpt-christiano-takeoff`              | `christiano-2018-takeoff`                                     | agree            | no change needed                                                                                | Use the post date and the update and capture dates separately.                                                                                                                                                 |
| `gpt-iem-hardtakeoff`                 | `iem-2013-hardtakeoff`                                        | agree            | applied                                                                                         | Optionally tighten the locator to printed p. 6.                                                                                                                                                                |
| `gpt-corrigibility-2015`              | `corrigibility-2015`                                          | agree (targeted) | applied                                                                                         | Primary for the paper’s own example and citation, secondary for attributing the formulation to Bostrom.                                                                                                        |
| `gpt-rlo-deceptive`                   | `rlo-2019-deceptive`                                          | agree (targeted) | applied                                                                                         | Primary for the learned-optimiser account, secondary for the book credit; the arXiv v1 p. 23 locator was not checked.                                                                                          |
| `gpt-bostrom-2014`                    | `Bostrom 2014 primary formulation`                            | checkable        | not admitted; recorded as a gap and a lead                                                      | A third-party mirror gives the book’s text; the venue scope excludes it, so keep it as a pointer or admit it in a separate task.                                                                               |
| `gpt-scope`                           | `search scope`                                                | finding          | applied                                                                                         | Every earliest verdict means earliest among the retrieved texts satisfying a stated criterion, not a census of the venues.                                                                                     |
| `gpt-boundary`                        | `boundary effect (13 records of 1996–1998)`                   | finding          | applied                                                                                         | The search note states the gap; no claim text makes a first-appearance, coinage or origin claim except to deny one.                                                                                            |
| `gpt-leads`                           | `earlier articulations and leads (T, G, V83, V93, D, M, U/E)` | finding          | admitted where the pre-1996 candidate search verified them; the rest recorded as gaps and leads | Turing c. 1951, Good 1965, Vinge 1983 and 1993, Drexler 1986, Moravec 1988 and Usenet and Extropians before July 1996 are leads outside the 1996–2022 bound.                                                   |

### Items a check could not settle

- `more-1998-symposium`: admitted after re-verification. Re-read in the capture of 2000-08-17 on 2026-10-06. The record is dated 1998 with wording attested from 2000-08-17; the term role is Good’s (1965).
- `aipnfgr-2008-development`: admitted after re-verification. The SIAI draft dated 5 February 2006 was read in its capture of 2006-07-08 and contains the same sentence; it dates the record. The earliest B5 role passes to Yudkowsky’s message of 1996-12-31.
- `cotra-2021-schemers`: applied as recommended. The quote was re-read in the capture of 2021-09-21. No first-use claim is made: the earliest-located role is defined by the recorded searches, and the record says the searches do not bound a first use.

### Corrections made in this admission

- `admission-turing-1951-humbled`: The pre-1996 pack paraphrased the outcome in Turing’s 1951 broadcast script as "humiliated"; the script says "greatly humbled".
- `admission-listed-propositions`: Propositions the 1996–2022 pack listed for an item without a role were classified under the unified criteria (step 1): 29 records added, three entries not recorded with reasons.
- `admission-erewhon-images`: Erewhon quotations were read on the 1872 page images (pp. 191, 196, 197, 200, 201 and 221), because the OCR text is noisy.
- `admission-wording`: Claim text, dates and notes name the checks generically ("a machine check") and the packs as candidate searches; this record names them in full.

### Dates

Claimed dates (earlier talks, drafts and presentations) and attested dates (later witnesses of the quoted wording) are kept apart from the date each work is dated by.

| Text                           | Dated      | Claimed    | Attested   | Wording    | Register   |
| ------------------------------ | ---------- | ---------- | ---------- | ---------- | ---------- |
| `butler-1863`                  | 1863-06-13 |            |            | 1863-06-13 | satirical  |
| `butler-1865`                  | 1865-07-29 |            |            | 1865-07-29 | dream      |
| `erewhon-1872`                 | 1872       |            |            | 1872       | fiction    |
| `turing-1947`                  | 1947-02-20 |            |            | 1947-02-20 | nonfiction |
| `turing-1950`                  | 1950-10    |            |            | 1950-10    | nonfiction |
| `turing-c1951`                 | 1951       |            |            | 1951       | nonfiction |
| `turing-1951`                  | 1951-05-15 |            |            | 1951-05-15 | nonfiction |
| `dartmouth-1955`               | 1955-08-31 |            |            | 1955-08-31 | nonfiction |
| `wiener-1960`                  | 1960-05-06 | 1959-12-27 |            | 1960-05-06 | nonfiction |
| `samuel-1960`                  | 1960-09-16 |            | undated    | undated    | nonfiction |
| `minsky-1961`                  | 1961-01    | 1960-10-24 | undated    | undated    | nonfiction |
| `good-1965`                    | 1965       | 1962-10    |            | 1965       | nonfiction |
| `michie-1968`                  | 1968       |            | 1986       | 1986       | nonfiction |
| `moravec-1979`                 | 1979-02    | 1976-07-21 | 2001-07-10 | 2001-07-10 | nonfiction |
| `vinge-1983`                   | 1983-01    |            |            | 1983-01    | nonfiction |
| `solomonoff-1985`              | 1985       |            | 2006-07-16 | 2006-07-16 | nonfiction |
| `drexler-1986`                 | 1986       |            | 1997-07-09 | 1997-07-09 | nonfiction |
| `moravec-1989`                 | 1989       | 1988-07    | 2001-03-06 | 2001-03-06 | nonfiction |
| `extropy-1990`                 | 1990       |            | undated    | undated    | nonfiction |
| `extropy-1991`                 | 1991       |            |            | 1991       | nonfiction |
| `extropy-1992`                 | 1991       |            |            | 1991       | nonfiction |
| `rosenfelder-1991`             | 1991-11-20 |            |            | 1991-11-20 | nonfiction |
| `gudeman-1991`                 | 1991-11-27 |            |            | 1991-11-27 | nonfiction |
| `rosenfelder-1992`             | 1992-02-10 |            |            | 1992-02-10 | nonfiction |
| `franzen-1992`                 | 1992-02-11 |            |            | 1992-02-11 | nonfiction |
| `mccullough-1992`              | 1992-02-14 |            |            | 1992-02-14 | nonfiction |
| `mckinstry-1994`               | 1994-12-29 |            |            | 1994-12-29 | nonfiction |
| `vinge-1993`                   | 1993-12    | 1993-03-30 |            | 1993-12    | nonfiction |
| `eder-1994`                    | 1994-05-23 |            | 1997-07-12 | 1997-07-12 | nonfiction |
| `hanson-1994`                  | 1994       |            |            | 1994       | nonfiction |
| `drexler-1995`                 | 1995       |            |            | 1995       | nonfiction |
| `miller-1995`                  | 1995       |            |            | 1995       | nonfiction |
| `burkhead-1996`                | 1996-08-10 |            |            | 1996-08-10 | relay      |
| `clemmensen-1996-08-30`        | 1996-08-30 |            |            | 1996-08-30 | nonfiction |
| `clemmensen-1996-08-31`        | 1996-08-31 |            |            | 1996-08-31 | nonfiction |
| `clemmensen-1996-09-03`        | 1996-09-03 |            |            | 1996-09-03 | nonfiction |
| `bostrom-1996-09-03`           | 1996-09-03 |            |            | 1996-09-03 | nonfiction |
| `hanson-1996-09-03`            | 1996-09-03 |            |            | 1996-09-03 | nonfiction |
| `bostrom-1996-09-04`           | 1996-09-04 |            |            | 1996-09-04 | nonfiction |
| `clemmensen-1996-09-04`        | 1996-09-04 |            |            | 1996-09-04 | nonfiction |
| `clemmensen-1996-09-07`        | 1996-09-07 |            |            | 1996-09-07 | nonfiction |
| `sits`                         | 1996-11-18 |            | 2000-12-04 | 2000-12-04 | nonfiction |
| `yudkowsky-1996-12-31-5142`    | 1996-12-31 |            |            | 1996-12-31 | nonfiction |
| `yudkowsky-1996-12-31-5159`    | 1996-12-31 |            |            | 1996-12-31 | nonfiction |
| `crocker-1996-12-31`           | 1996-12-31 |            |            | 1996-12-31 | nonfiction |
| `yudkowsky-1997-09-24`         | 1997-09-24 |            |            | 1997-09-24 | nonfiction |
| `denotter-1998`                | 1998-06-23 |            |            | 1998-06-23 | nonfiction |
| `sandberg-1998`                | 1998-06-23 |            |            | 1998-06-23 | nonfiction |
| `yudkowsky-1998-09-07-2209`    | 1998-09-07 |            |            | 1998-09-07 | nonfiction |
| `yudkowsky-1998-09-07-2212`    | 1998-09-07 |            |            | 1998-09-07 | nonfiction |
| `catai`                        | 1998-09-07 |            | 2001-01-26 | 2001-01-26 | nonfiction |
| `hanson-1998-09-10`            | 1998-09-10 |            |            | 1998-09-10 | nonfiction |
| `vinge-1998-09-16`             | 1998-09-16 |            |            | 1998-09-16 | nonfiction |
| `hanson-1998-09-24`            | 1998-09-24 |            |            | 1998-09-24 | nonfiction |
| `more-1998`                    | 1998       |            | 2000-08-17 | 2000-08-17 | nonfiction |
| `finney-1999`                  | 1999-09-04 |            |            | 1999-09-04 | nonfiction |
| `atkins-2000`                  | 2000-07-07 |            |            | 2000-07-07 | nonfiction |
| `yudkowsky-2000-09-28`         | 2000-09-28 |            |            | 2000-09-28 | nonfiction |
| `cfai`                         | 2001-06-15 |            | 2001-06-17 | 2001-06-17 | nonfiction |
| `yudkowsky-2002-aibox`         | 2002-03-08 |            |            | 2002-03-08 | nonfiction |
| `hibbard-2006`                 | 2006       |            | 2008-12-05 | 2008-12-05 | nonfiction |
| `aipnfgr`                      | 2006-02-05 |            |            | 2006-02-05 | nonfiction |
| `logi`                         | 2007       |            | undated    | undated    | nonfiction |
| `yudkowsky-2008-rsi`           | 2008-12-01 |            |            | 2008-12-01 | nonfiction |
| `yudkowsky-2008-hard-takeoff`  | 2008-12-02 |            |            | 2008-12-02 | nonfiction |
| `hanson-2008-core-argument`    | 2008-12    |            | undated    | undated    | nonfiction |
| `shulman-2009`                 | 2009-07-02 |            | undated    | undated    | nonfiction |
| `iem`                          | 2013-09-13 |            |            | 2013-09-13 | nonfiction |
| `grace-2014-schedule`          | 2014-08-31 |            |            | 2014-08-31 | nonfiction |
| `grace-2014-treacherous-turn`  | 2014-11-25 |            |            | 2014-11-25 | relay      |
| `corrigibility`                | 2015-01-25 |            |            | 2015-01-25 | nonfiction |
| `loosemore-2015`               | 2015-05-05 |            |            | 2015-05-05 | nonfiction |
| `arbital-context-disaster`     | 2015-06-08 |            | undated    | undated    | nonfiction |
| `arbital-programmer-deception` | 2015-07-16 |            | undated    | undated    | nonfiction |
| `arbital-daemons`              | 2016-03-22 |            | undated    | undated    | nonfiction |
| `christiano-2018-takeoff`      | 2018-02-24 |            |            | 2018-02-24 | nonfiction |
| `christiano-2018-daemons`      | 2018-05-05 |            |            | 2018-05-05 | nonfiction |
| `christiano-2019-wflf`         | 2019-03-17 |            |            | 2019-03-17 | nonfiction |
| `rlo-2019-intro`               | 2019-05-31 |            |            | 2019-05-31 | nonfiction |
| `rlo-2019-deceptive`           | 2019-06-05 |            |            | 2019-06-05 | nonfiction |
| `cotra-2021`                   | 2021-09-21 |            |            | 2021-09-21 | nonfiction |
| `agi-ruin`                     | 2022-06-05 |            |            | 2022-06-05 | nonfiction |
| `christiano-2022`              | 2022-06-19 |            |            | 2022-06-19 | nonfiction |
| `cotra-2022`                   | 2022-07-18 |            |            | 2022-07-18 | nonfiction |
| `hubinger-2022`                | 2022-08-30 |            |            | 2022-08-30 | nonfiction |

### Registers

- **nonfiction** (80 texts): An essay, paper, letter, lecture, broadcast, message or post in the author’s own voice.
- **fiction** (1 text): A novel or story, or a speech or treatise inside one. The passage records what the work says, not the author’s view.
- **satirical** (1 text): A piece that uses satirical or ironic devices; whether its argument is earnest is uncertain.
- **dream** (1 text): A piece its author frames as a dream.
- **relay** (2 texts): The passage reports or summarises another author’s argument without adopting it.

### How we searched (the collection’s search note)

The collection records what located texts from 1863 to 2022 say about the propositions below. "Earliest located" means the earliest text found by the searches below. It is not a claim that no earlier text exists.

1863 to mid-1996:

- Samuel Butler’s letters in The Press, Christchurch (1863, 1865), read in archived Papers Past pages; the 1863 letter was compared with column images.
- Erewhon: the 1872 printing in Internet Archive page images, and the revised text of 1901 in the Project Gutenberg transcription.
- Alan Turing’s typescripts in the King’s College archive (1947–1951) and Turing’s 1950 paper in Mind.
- Norbert Wiener’s 1960 article in Science and the indexed abstract of Arthur Samuel’s reply.
- I. J. Good’s 1965 chapter in two public scans; the Dartmouth proposal (1955), Marvin Minsky (1961), Donald Michie (1968, read in the 1986 reprint) and Ray Solomonoff (1985, read in the author’s later typesetting).
- Vernor Vinge’s 1983 Omni column and 1993 NASA proceedings paper; Hans Moravec (1979, 1989); K. Eric Drexler’s Engines of Creation (1986, read in the 1997 web edition) and 1995 forecast.
- Extropy magazine, issues 7–16 (1991–1996): selected articles.
- Usenet: ten bundles of the Carnegie Mellon comp.ai and comp.ai.philosophy archives (3,901 files) and one relayed sci.nanotech post.

mid-1996 to 2022:

- The Extropians mailing list from 1996-07-25: all subject lines to 2002-02 screened, and 1,854 matching messages of 1996–2000 searched in full, with 28 more found by following threads.
- The SL4 mailing list, 2000–2012: subjects screened in all 142 monthly indexes, and 647 matching messages searched.
- Eliezer Yudkowsky’s early web pages, through Internet Archive captures.
- Publications of the Singularity Institute and MIRI, mostly in later reprints, with the 2001 web editions compared where they are cited.
- The 2008 Hanson–Yudkowsky debate on Overcoming Bias.
- LessWrong and the Alignment Forum: selected posts with their first stored versions, and seven topic tags listed by date.
- Arbital pages, read through a third-party viewer.
- Personal sites of Robin Hanson, Nick Bostrom, Paul Christiano and Bill Hibbard, Ajeya Cotra’s guest post on Cold Takes, and two formally published papers.

Methods:

- Sources were retrieved directly by script, one request at a time, using archive captures where the original page is gone.
- Every quotation was compared with the retrieved text, or with page images where a scan has no text layer or its OCR is unreliable.
- Internet Archive full-text screens looked for selected wordings before the earliest located texts. Each screen read the first 20 hits and finds only the phrasings searched.
- Each record gives the date its work is dated by. Where the quoted wording survives only in a later copy, the record also gives the date from which that wording is attested, and that date decides which text is earliest located.
- Two separate machine checks re-examined the candidate records, one by an OpenAI GPT-6 model for 1996–2022 and one by a Claude Opus 5.5 model for the earlier texts. Their corrections are applied. No person has reviewed the records.

Known gaps:

- The Extropians list before 1996-07-25, from 1991, is not in the public archive used and was not searched.
- HathiTrust full-text search and the Google Books API refused scripted requests on 2026-10-06 (HTTP 403 and 429), so neither library was searched.
- Good’s 1965 chapter cites three earlier texts by Good for the explosion argument: a 1951 review of a book by D. R. Hartree, an IBM report of 1959 (RC-115) and "The social implications of artificial intelligence" (The Scientist Speculates, 1962–63). None was retrieved, nor were Good’s talks and drafts of 1962–64.
- The search before 1863 used Butler’s own wording, so it could not find earlier statements in other words.
- Google Groups refused requests (HTTP 429), and Usenet beyond the ten Carnegie Mellon bundles was not searched.
- LessWrong and the Alignment Forum were not searched in full text; comments and linked posts were not read.
- Bostrom’s Superintelligence (2014), which later texts credit for the term "treacherous turn", was not read in a legally accessible copy. Christiano’s ai-alignment.com posts (2016–2018) were not searched.
- Moravec’s Mind Children (1988) and the 1986 printing of Engines of Creation were not obtained.
- Many texts survive only in later versions: reprints marked as changed, archive captures and posts edited after posting. Each record names the version checked.
- B6 and C1–C3 were looked for only before mid-1996, so no most-developed text is named for them.
- Fiction was not surveyed. Erewhon is the only novel recorded.

A text found later that is earlier than the earliest located text becomes the new earliest located text. The earlier headline stays on record as a correction.

### Verification

- Quotations: 179; 168 matched in the retrieved text, 11 read on page images. Match notes: quote-spacing 13, quote-ligature 2.
- Paraphrases: 73.
- Quotation limits: At most 50 words per quotation; at most 400 words per source, or a tenth of a source shorter than 2,000 words; identical passages count once. Tightest sources: `source-rosenfelder-1991-cheating-turing-test` 18/18, `source-extropians-1996-08-10-burkhead` 29/29, `source-extropians-1996-09-04-bostrom` 44/44, `source-sl4-2000-07-07-atkins` 37/40, `source-rosenfelder-1992-real-life-turing-test` 19/21.
- Retrieval for this admission: 124 logged requests, 2026-10-06T16:50:35.601Z to 2026-10-06T18:19:25.781Z. Sequential direct HTTP for this admission, with archive hosts paced at least 9 seconds apart. Sources whose hashes match the candidate packs are noted in their records.
- Responses other than 200: web.archive.org 504; web.archive.org 503; web.archive.org 503; web.archive.org 504.

## Step 4. Data model (schema 2.11)

- A proposition is a concept entity with a `proposition` block: its code, the one criterion texts are classified against, and its usual names.
- A record is one claim from a document to a proposition, with one of three predicates: articulates_proposition, contests_proposition or bears_on_proposition. Its evidence is a quotation of at most 50 words where the source permits short quotations, otherwise a labelled paraphrase.
- attributes.thought holds the roles, the register, the term of an earliest-located-term record, a qualifier, the missing element of a context record, and claimed and attested dates.
- Validation enforces one earliest-located articulation per proposition by wording date, at most one most-developed record, one earliest-located-term record whose evidence uses the name, claimed and attested dates on the right side of the work’s date, and one record per text, proposition and stance.
- No relation runs between texts; proposition records are left off the map. Sources gain the kinds book, message and post; a passage quoted for several claims counts once towards its source’s limit.
- The release format becomes 1.1: the entity field `proposition` and its CSV columns.

Rows added: 96 entities, 229 claims, 89 sources, 252 evidence. Entities changed: `intelligence-explosion`, `deceptive-alignment`. Before-snapshot: `review/thought-spine-before-2026-10-06.json`. Documented in `docs/ontology.md` and `docs/dataset-format.md`.
