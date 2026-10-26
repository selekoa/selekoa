# Institutional atlas integration — 2026-09-29

Integration scope: `9c570be`, based on main `6599cc2`, plus prospective editorial
policy and positioning documentation. The separate Christiano pilot is excluded.
All 120 baseline entities, 277 claims, 124 sources and 296 evidence records compare
unchanged against main, independently of the increment's preservation manifest.
The increment adds 26 entities, 40 claims, 20 sources and 40 evidence records.
The supporting coverage summary's former count of 18 sources was corrected to 20.

## Bounded fresh-context machine audit

A separate Codex agent audited the records and original passages on 2026-09-29
without the proposing pass's verdicts or its coverage report. The supplied identity
was GPT-6-based; an exact model/version was not exposed. This is context separation,
not a claim of an independent model or independent historical corroboration.

The three requested higher-risk claims were targeted. One additional claim,
`atlas-deepmind-drl-discusses`, was selected using PowerShell `Get-Random` from the
remaining 37 IDs in `review/institutional-atlas-order.json`. Actual passage-level
coverage was four of the 40 added claims; the other 36 were not independently
source-rechecked in this audit.

| Claim                              | Original evidence and locator                                                                                                                                                             | Finding                                                                                                                           |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `atlas-altman-return`              | [OpenAI announcement](https://openai.com/index/sam-altman-returns-as-ceo-openai-has-a-new-initial-board/), “Message from Sam to the company,” opening paragraph; November 29, 2023 header | Supports the announced return as CEO. Snapshot does not imply uninterrupted tenure. December 8 update is separately labelled.     |
| `atlas-openai-pbc-plan`            | [Evolving OpenAI's structure](https://openai.com/index/evolving-our-structure/), opening bullets 2–3; May 5, 2025 header                                                                  | Supports a planned LLC-to-PBC transition under nonprofit control, not completion at that date.                                    |
| `atlas-deepmind-alphafold-compute` | [Nature paper](https://www.nature.com/articles/s41586-021-03819-2), Methods → Training regimen, first paragraph; DeepMind affiliation and publication metadata                            | Supports authors' report of TPU v3 training. July 15, 2021 is publication, not training start; no procurement or ownership claim. |
| `atlas-deepmind-drl-discusses`     | [Deep Reinforcement Learning](https://deepmind.google/blog/deep-reinforcement-learning/), paragraphs beginning “This paradigm” and “Previous attempts”; June 17, 2016 header              | Supports the scoped discussion of reward-based learning and experience replay.                                                    |

No material disagreement in wording, locator or temporal qualification was found.
All four original passages were retrieved. Nature redirected through a
`cookies_not_supported` URL but returned full article text; there was no unresolved
retrieval failure. These are current publisher HTML expressions, not authenticated
historical captures. Corporate reports do not independently prove implementation
or performance.

Nature separately identifies an August 18, 2021 version of record and August 26
issue date. The stored July 15 publication date remains correct; no version-of-record
date should be inferred from it. The paper declares CC BY 4.0, while the existing
record conservatively asserts no redistribution licence. Neither observation
requires a factual or review-state change for the admitted proposition.

## Integrity and disposition

Review covered the added propositions and qualifications, possible duplicate
subject/relation/object records, reference validation, dossier navigation and
preservation of existing records. The only repeated endpoint/relation among
additions and prior claims is Altman's role at OpenAI: the existing 2015 co-chair
snapshot and new 2023 CEO-return snapshot represent distinct roles and dates.
They are not duplicate claims.

The integration uses the full unit and Edge browser suites, production build,
historical review-pack tests, blank increment-pack reproduction, research corpus
and provenance reproduction, and indexed privacy checks. Generated test logs and
browser captures remain ignored. The foundation migration comparison is a
historical genesis check, not a gate for authorised later additions.

All 40 additions remain exploratory seeds with machine-checked evidence. The
historical proposed human sample is still uncompleted; human decision and notes
fields remain blank. This machine audit neither completes that human sample nor
accepts any claim. The prospective [policy](editorial-policy.md) removes routine
human sampling as an integration condition without rewriting prior review history.
Human inspection remains required for selected human-curated interpretations and
material unresolved issues. No application data, source-integrity files, prior
decisions, historical audit reports or review packs are changed by this integration.
