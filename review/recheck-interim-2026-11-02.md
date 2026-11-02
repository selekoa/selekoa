# Interim withdrawal of re-checked headlines, 2026-11-02

The maintainer's instruction of 2026-11-02: withdraw, as #135 did, every
earliest located role that the cross-family re-check
([`earliest-located-recheck-2026-11-02.md`](earliest-located-recheck-2026-11-02.md),
Codex, 178 roles) marks `move` or `undecidable` and that #135 had not already
withdrawn. Branch `recheck-interim` from `main` at e3a52a0 (v0.24.0).

- **Withdrawn:** 53 roles (48 `move`, 5 `undecidable`) on 43 propositions. Of
  the re-check's 64 `move` and 6 `undecidable` verdicts, the other 17 concern
  roles #135 had already withdrawn.
- **Kept:** `stands` (105), `different sense` (2) and `lead outside dataset`
  (1) roles are unchanged.
- **How:** `proposition.underRecheck` gains the headline with a reason drawn
  from the report (role number, verdict, the report's reason) and
  `recordedAt` 2026-11-02; the record keeps its other roles, and a record left
  with no role becomes `articulation` (a record needs a main role), as #135
  did for W03. No role is assigned elsewhere. The page shows "Under re-check
  (2026-11-02)".
- **Changes:** [`recheck-interim-2026-11-02.json`](recheck-interim-2026-11-02.json),
  applied by [`scripts/apply-recheck.ts`](../scripts/apply-recheck.ts)
  (`--check` compares with the stored data). Before-snapshot
  [`recheck-interim-before-2026-11-02.json`](recheck-interim-before-2026-11-02.json),
  first in the chain in `src/editorial/historical-views.ts`.
- **Correction notes:** one per withdrawn role in its collection's
  corrections ("Headlines replaced"), dated 2026-11-02: risk debate (18),
  Yudkowsky's arguments (11), machine succession (10), AI and biosecurity (5),
  economics (4), compute in orbit (3), superintelligence (2). The seven
  collections' versions rise by one.
- **Release:** dataset **v0.24.1**, a patch release (corrections within
  existing collections; schema 2.28 unchanged).
- **Editorial state:** every record stays a seed. The re-check's proposed
  targets are named in the correction notes as its reasons, not applied;
  adjudication follows on branch `recheck-apply`.

## Withdrawn roles

| Re-check role | Proposition                                                                        | Headline withdrawn                     | Record that held it                                                | Roles before → after                      | Verdict     |
| ------------: | ---------------------------------------------------------------------------------- | -------------------------------------- | ------------------------------------------------------------------ | ----------------------------------------- | ----------- |
|            34 | C1 Behavioural tests as evidence of what a system is                               | Earliest located                       | `ts-c1-michie-1968`                                                | earliest-located → articulation           | move        |
|            39 | A3 Recursive self-improvement                                                      | Earliest located                       | `ts-a3-clemmensen-1996-09-03`                                      | earliest-located → articulation           | move        |
|            45 | R01 Orthogonality of intelligence and goals                                        | Earliest located text that contests it | `rd-r01-goertzel-2015-superintelligence-fears`                     | earliest-located, contesting → contesting | move        |
|            47 | R02 Instrumental convergence                                                       | Earliest located                       | `rd-r02-omohundro-2007-nature-self-improving`                      | earliest-located → articulation           | move        |
|            48 | R02 Instrumental convergence                                                       | Earliest located text that contests it | `rd-r02-pinker-2014-edge-myth-of-ai`                               | earliest-located, contesting → contesting | move        |
|            51 | R06 Difficulty of alignment                                                        | Earliest located text that contests it | `rd-r06-davis-2014-ethical-guidelines-superintelligence`           | contesting, earliest-located → contesting | move        |
|            53 | R08 Existential risk from misalignment or loss of control                          | Earliest located                       | `rd-r08-bostrom-2002-existential-risks`                            | earliest-located → articulation           | move        |
|            54 | R08 Existential risk from misalignment or loss of control                          | Earliest located text that contests it | `rd-r08-pinker-2014-edge-myth-of-ai`                               | earliest-located, contesting → contesting | move        |
|            55 | R09 Catastrophic risk from misuse                                                  | Earliest located                       | `rd-r09-bostrom-2002-existential-risks`                            | earliest-located → articulation           | move        |
|            57 | R10a Intelligence brings benevolence or no drive to dominate                       | Earliest located text that contests it | `rd-r10a-omohundro-2008-basic-ai-drives`                           | earliest-located, contesting → contesting | move        |
|            58 | R10b Advanced AI can be kept under control by design                               | Earliest located                       | `rd-r10b-kelly-2014-edge-myth-of-ai`                               | earliest-located → articulation           | move        |
|            60 | R11 Risk claims are speculative or unfalsifiable                                   | Earliest located text that contests it | `rd-r11-russell-2014-edge-myths-and-moonshine`                     | earliest-located, contesting → contesting | move        |
|            65 | R15 Open models reduce risk                                                        | Earliest located                       | `rd-r15-goertzel-pitt-2012-open-source-agi`                        | earliest-located → articulation           | undecidable |
|            66 | R15 Open models reduce risk                                                        | Earliest located text that contests it | `rd-r15-alexander-2015-should-ai-be-open`                          | contesting, earliest-located → contesting | undecidable |
|            67 | R16 Takeoff will be gradual                                                        | Earliest located                       | `rd-r16-brooks-2017-seven-deadly-sins`                             | earliest-located → articulation           | move        |
|            68 | R17 Economic incentives will produce safety                                        | Earliest located text that contests it | `rd-r17-armstrong-2013-racing`                                     | contesting, earliest-located → contesting | move        |
|            69 | R17 Economic incentives will produce safety                                        | Earliest located                       | `rd-r17-hanson-2023-reasonable-ai-fears`                           | earliest-located → articulation           | move        |
|            70 | R07 Risk of extinction or comparable catastrophe                                   | Earliest located                       | `rd-r07-joy-2000-why-the-future`                                   | earliest-located → articulation           | move        |
|            72 | R10a Intelligence brings benevolence or no drive to dominate                       | Earliest located                       | `rd-r10a-goertzel-2004-positive-transcension`                      | earliest-located → articulation           | move        |
|            75 | R10b Advanced AI can be kept under control by design                               | Earliest located text that contests it | `rd-r10b-corrigibility-2015`                                       | contesting, earliest-located → contesting | move        |
|            80 | Y04 A short instruction such as making everyone happy                              | Earliest located text that contests it | `yk-y04-extropians-1998-12-06-yudkowsky-2153-c`                    | contesting, earliest-located → contesting | move        |
|            81 | Y05 Training on human feedback instils human values                                | Earliest located text that contests it | `yk-y05-extropians-1999-08-04-yudkowsky-1587-c`                    | contesting, earliest-located → contesting | move        |
|            87 | Y11 A slow takeoff will leave time to adjust                                       | Earliest located text that contests it | `yk-y11-extropians-1998-09-08-yudkowsky-2235-c`                    | contesting, earliest-located → contesting | move        |
|            88 | Y12 Safety evaluations would catch a dangerous system                              | Earliest located text that contests it | `yk-y12-creating-friendly-ai-2001-c`                               | contesting, earliest-located → contesting | move        |
|            89 | Y13 AGI is decades away, so the problem can wait                                   | Earliest located text that contests it | `yk-y13-ai-positive-negative-factor-global-risk-c`                 | contesting, earliest-located → contesting | move        |
|            94 | Y18 A superintelligence would leave Earth alone                                    | Earliest located text that contests it | `yk-y18-extropians-1999-08-25-yudkowsky-2783-c`                    | contesting, earliest-located → contesting | move        |
|           102 | Y25 Interpretability will let us read its mind                                     | Earliest located text that contests it | `yk-y25-sl4-2003-05-22-yudkowsky-0305-6783-c`                      | contesting, earliest-located → contesting | move        |
|           104 | Y27 Run experiments and see what happens                                           | Earliest located text that contests it | `yk-y27-sl4-2000-09-17-yudkowsky-0009-0092-c`                      | contesting, earliest-located → contesting | move        |
|           105 | Y28 The developers know what they are doing                                        | Earliest located                       | `yk-y28-creating-friendly-ai-2001-a`                               | earliest-located → articulation           | move        |
|           106 | Y28 The developers know what they are doing                                        | Earliest located text that contests it | `yk-y28-sl4-2001-08-01-yudkowsky-0108-2031-c`                      | contesting, earliest-located → contesting | move        |
|           108 | Y30 It will probably turn out fine                                                 | Earliest located text that contests it | `yk-y30-sl4-2000-11-13-yudkowsky-0011-0181-c`                      | contesting, earliest-located → contesting | move        |
|           110 | W01 Machines succeed humans as the leading intelligence                            | Earliest located                       | `ht-w01-degaris-1989-what-if-ai-succeeds`                          | earliest-located → articulation           | move        |
|           112 | W02 Succession by machines would be acceptable or desirable                        | Earliest located                       | `ht-w02-minsky-1994-will-robots-inherit-the-earth`                 | earliest-located → articulation           | undecidable |
|           113 | W02 Succession by machines would be acceptable or desirable                        | Earliest located text that contests it | `ht-w02-joy-2000-why-the-future-doesnt-need-us`                    | earliest-located, contesting → contesting | move        |
|           119 | W05 Superiority by many orders of magnitude                                        | Earliest located                       | `ht-w05-kurzweil-2001-law-of-accelerating-returns`                 | earliest-located → articulation           | move        |
|           121 | W07 The growth of intelligence as its own end                                      | Earliest located text that contests it | `ht-w07-alexander-2014-meditations-on-moloch`                      | earliest-located, contesting → contesting | move        |
|           122 | W08 Accelerate rather than restrain                                                | Earliest located text that contests it | `ht-w08-joy-2000-why-the-future-doesnt-need-us`                    | earliest-located, contesting → contesting | move        |
|           123 | W08 Accelerate rather than restrain                                                | Earliest located                       | `ht-w08-eacc-2022-effective-accelerationism-repost`                | earliest-located → articulation           | move        |
|           124 | W09 Machine intelligence as a physical or cosmic process                           | Earliest located text that contests it | `ht-w09-allen-greaves-2011-singularity-isnt-near`                  | earliest-located, contesting → contesting | move        |
|           125 | W09 Machine intelligence as a physical or cosmic process                           | Earliest located                       | `ht-w09-moravec-1989-after-life`                                   | earliest-located → articulation           | move        |
|           126 | W10 Machine intelligence spreads beyond Earth                                      | Earliest located                       | `ht-w10-degaris-1989-what-if-ai-succeeds`                          | earliest-located → articulation           | undecidable |
|           132 | G04 Essential unautomated tasks bottleneck growth                                  | Earliest located                       | `ec-g04-nordhaus-2015-economic-singularity-a`                      | earliest-located → articulation           | move        |
|           139 | M02 AI as the automation of tasks                                                  | Earliest located                       | `ec-m02-frey-osborne-2013-future-of-employment-a`                  | earliest-located → articulation           | move        |
|           143 | M05 Machines cheaper than labour at every task                                     | Earliest located                       | `ec-m05-acemoglu-restrepo-2016-race-between-machine-and-man-a`     | earliest-located → articulation           | move        |
|           148 | M09 Recent entry of machine intelligence into mainstream economics                 | Earliest located                       | `ec-m09-agrawal-gans-goldfarb-2019-economics-of-ai-introduction-a` | earliest-located → articulation           | move        |
|           160 | O6 Heat rejection as a constraint on orbital compute                               | Earliest located                       | `cpo-orb-oc6-suncatcher-blog-2025`                                 | earliest-located → articulation           | move        |
|           162 | O10 Ground links as a limit on orbital compute                                     | Earliest located                       | `cpo-orb-oc10-suncatcher-blog-2025`                                | earliest-located → articulation           | undecidable |
|           165 | O11 Harm to the sky and debris risk from orbital data centres                      | Earliest located                       | `cpo-orb-oc11-aili-2025`                                           | earliest-located → articulation           | move        |
|           166 | D1 Currently available AI systems increase an actor's biological-misuse capability | Earliest located                       | `ab-arg-d1-soice-articulates`                                      | earliest-located → articulation           | move        |
|           169 | D5 Synthesis-order screening is a control point for AI-related biological risk     | Earliest located                       | `ab-arg-d5-sandbrink-articulates`                                  | earliest-located → articulation           | move        |
|           170 | D6 Public release of model weights increases biological misuse risk                | Earliest located                       | `ab-arg-d6-seger-articulates`                                      | earliest-located → articulation           | move        |
|           173 | D3 Published evaluations do not establish real-world biological risk               | Earliest located                       | `ab-arg-d3-peppin-articulates`                                     | earliest-located → articulation           | move        |
|           174 | D7 Assessment must cover actors who already hold relevant skills                   | Earliest located                       | `ab-arg-d7-brent-articulates`                                      | earliest-located → articulation           | move        |
