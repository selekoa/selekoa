# Anthropic guided path v1 — maintainer review sheet

**Status:** machine-proposed selection; human inspection and acceptance are not recorded. This sheet concerns selection and framing, not changes to claim or evidence states. The [18-item selection](../src/reading/anthropic-formation.ts) and [ordered rationale table](../docs/guided-research-paths.md#exact-selection-and-inclusion-decisions) define the review scope. Record the exact commit as well as manifest version when reviewing.

## Consequential decisions to inspect

- **Opening with authorship:** item 1 precedes institutional founding evidence. Do its rationale, read-alongside link and qualification adequately prevent the paper from becoming an implied founding programme?
- **Two research strands:** items 4–6 foreground large-batch/scaling alongside human feedback. Is this useful explanatory context, or does prominence imply an institutional adoption story? The records establish authorship and reported use in the named study only.
- **Departure → founding:** items 9–10 are adjacent. The explicit gap says the announcement's unnamed project is not identified as Anthropic. Does the transition still imply more than the records establish?
- **Retrospective and partial dates:** items 10–12 use year-only event dates with later sources; items 15–18 are outside the chronology. Inspect publication dates, date notes and the prominence of these limits.
- **Omission and title scope:** other founders and later personnel/reception remain in the full dossier. The selection is not a roster. Item 15 retains the source-attributed shorter title and unresolved human decision from the [existing reconciliation](audit-reconciliation-2026-09-25.md); it does not settle the full title.

These placements trigger targeted review under the [editorial policy](../docs/editorial-policy.md): consequential founding/transmission framing, retrospective or mutable sources, and existing title disagreement. Disposition for this implementation: retain an explicit machine-proposed label, original qualifications and review states; human interpretation review remains unrecorded.

## Independent maintainer spot-check sample

Check the original passages, identity, context, locator, dates, qualifications and review labels without relying on the proposing pass's verdict. The random candidate was drawn once from all 18 selected IDs using Node's `crypto.randomInt`; the others deliberately cover consequential placement and a different relation/source family. This is a proposed sample, not a completed independent audit or human check.

| Claim                                                        | Original source and locator                                                                                                                                                                                                                                                 | Check                                                                                                                     |
| ------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `lineage-mccandlish-authored-batch` — random                 | [arXiv v1](https://arxiv.org/pdf/1812.06162v1), PDF p. 1 author block                                                                                                                                                                                                       | Named co-author only; no founding date, sole invention or institutional adoption.                                         |
| `lineage-scaling-uses-batch` — method-use family             | [Scaling Laws v1](https://arxiv.org/pdf/2001.08361v1), §5.1, equations 5.4–5.5, PDF p. 13                                                                                                                                                                                   | Reported adjustment of steps/compute; not independently established implementation at Anthropic.                          |
| `dario-openai-departure-announced-2020` — narrative boundary | [OpenAI organisational update](https://openai.com/index/organizational-update/), departure paragraph and employee-announcement paragraph                                                                                                                                    | Announcement date versus final working day; no identification of the unnamed project.                                     |
| `daniela-openai-safety-prior` — existing disagreement        | [AIM123-S deck](https://d1.awsstatic.com/onedam/marketing-channels/website/aws/en_US/events/approved/reinvent-2025/reinvent/2024/slides/aim/AIM123-S_Leverage-Anthropics-Claude-models-for-AIs-evolving-landscape-sponsored-by-Anthropic.pdf#page=6), PDF p. 6, Daniela row | Exact source-attributed title; no added policy remit or employment dates. Inspect the existing reconciliation separately. |

Material sample errors should expand review to the affected source/relation family. Sample review does not substitute for inspecting the selected source paths and framing before human curation, or every relied-on claim for high-reliance use.

## Human record — leave blank until performed

- Selection commit/version:
- Reviewer (pseudonym) and date:
- Claims and original source expressions actually inspected:
- Sample outcomes and any expanded scope:
- Framing/omission assessment and limits:
- Selection decision:
- Notes:

No decisions are imported automatically. Applying factual corrections or editorial-state decisions requires a separately authorized task.
