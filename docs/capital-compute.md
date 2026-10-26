# Capital and compute methodology

This bounded increment adds **8 entities, 37 claims, 18 sources and 37 evidence records**. Research date: 2026-09-19. The complete sample is 67 entities, 140 claims (137 graph relationships and 3 literal amounts), 71 sources and 157 evidence records. Eight new referents suffice; existing corporate nodes are reused instead of manufacturing entities to meet a quota.

All 37 additions are explicit, supported research seeds with machine-checked evidence. These labels assess scoped statements, not independent implementation or human verification. Previous records and three annotated review packs are preserved, including the unresolved Daniela Amodei title disagreement.

## Scope and sources

The order manifest follows six corridors: OpenAI/Microsoft/Stargate, Anthropic/Amazon/AWS, Anthropic/Google, xAI/NVIDIA/Colossus, Google DeepMind internal compute, then OpenAI/CoreWeave. It includes historical records through April 2026, not an exhaustive or guaranteed current map. No financial totals are summed.

Primary counterparty announcements establish what was announced or reported. Amazon explicitly reported investment tranches made in September 2023 and March 2024; their later publication date does not replace the earlier transaction month. The CMA's redacted Google/Anthropic decision establishes separate shares, convertible debt and nonexclusive compute terms without public amounts. Its November decision date is distinct from December publication.

Gemini training evidence uses the pinned [arXiv v1 report](https://arxiv.org/abs/2312.11805v1), section 3, and the [Google launch article](https://blog.google/innovation-and-ai/technology/ai/google-gemini-ai/). The mutable DeepMind PDF had later revisions, so its current wording was not backdated. Google's resource allocation is internal and the 4,096-chip quantity is per TPUv4 SuperPod, never the fleet total.

## Schema 2.3

Six predicates supplement the existing vocabulary: invested_in, extended_credit_to, compute_capacity, cloud_terms, plans_infrastructure_spend and plans_capacity. Investment announcements, realised investment, round participation and round totals remain separate. compute_capacity runs from customer to named counterparty and requires its stage to distinguish a plan from a contract.

New records carry transactionType, transactionStage and relationshipContext. Generic investment is used when the cited announcement does not identify the instrument; equity is not inferred. Internal infrastructure use cannot carry an external financial amount. Legacy fields and records remain readable and unchanged.

| Stage       | Meaning                                                                                                                     |
| ----------- | --------------------------------------------------------------------------------------------------------------------------- |
| announced   | Publicly announced transaction; no closing or payment inference                                                             |
| planned     | Intended future spending, capacity or use                                                                                   |
| committed   | Reported commitment; not necessarily a signed contract or delivery                                                          |
| contracted  | Reported agreement or contract; no payment or fulfilment inference                                                          |
| invested    | Source reports an investment made                                                                                           |
| closed      | Source explicitly reports financing closed; exact closing day may remain unknown                                            |
| paid        | Explicit disbursement, when a source establishes it                                                                         |
| purchased   | Explicit procurement, without implying delivery                                                                             |
| delivered   | Equipment reported delivered; installation or full operation is not assumed                                                 |
| deployed    | Hardware or infrastructure reported put into service                                                                        |
| operational | Workloads or operation reported at the scoped snapshot                                                                      |
| completed   | Legacy/general completed transaction; for the CMA notes, extension of financing, not conversion or cash-disbursement timing |
| undisclosed | Stage is not established                                                                                                    |

No paid or purchased claim was justified by this selection. Source interest and verification limits remain in the evidence and qualifications even for realised stages.

Amounts retain currency, bound and transaction/round_total/cumulative scope. more_than and less_than preserve strict bounds alongside exact, up_to, at_least and approximate. Quantities on typed transactions require a bound and a descriptive unit. period records expected timing separately from the historical announcement/snapshot; it does not move a planned claim into the future timeline. conditions retains milestone contingencies and shared-contract cautions.

Validation rejects realised investment with an announcement stage, realised stages on investment-announcement records, operational plans, missing transaction stages/context/quantity bounds, round totals assigned to entity counterparties, inconsistent funding literals, and external financial amounts on internal resource records. It does not automatically prove that the source supports an amount or stage.

## Research audit and unresolved boundaries

- Announced is not paid: the 2024 and 2026 Amazon announcements retain announcement stages. The two initial reported tranches remain separate from later commitments; no cumulative double counting.
- Contracted is not spent: Azure's incremental $250 billion and CoreWeave's upper-bound $11.9 billion are contracts, not cash transfers or delivered capacity.
- Planned is not deployed: the December 2024 Colossus expansion plan remains alongside the July 2025 workload snapshot. Anthropic's TPU plan is separate from its April 2026 signed agreement.
- Provider is not owner: Abilene, Rainier and Colossus records do not infer legal ownership. The rack-delivery relation records NVIDIA equipment delivered by Oracle, not a direct NVIDIA purchase.
- A round is not one investor: Series C's $6 billion is a literal total; NVIDIA participation has no assigned amount. No valuation or ownership percentage is derived.
- Stargate is an announced venture distinct from OpenAI and Abilene. The $500 billion plan is not secured equity. SoftBank/OpenAI/Oracle funding roles do not establish contributions to one another. MGX is not exhaustively modeled.
- Google Cloud and Azure are service brands represented through Google and Microsoft. AWS retains its existing identity separate from Amazon. The CMA uses Google as a group shorthand; the legal subscription vehicle remains unresolved. No legal identities are silently merged.
- The April 2026 Google/Broadcom records describe two counterparties to **one joint agreement**. They are not independent capacity commitments to sum. The responsibility split, exact GW quantity and price remain unspecified.
- The July 2025 Oracle announcement states 4.5 GW; [the September update](https://openai.com/index/five-new-stargate-sites/) describes that development agreement as up to 4.5 GW. This increment retains the July wording and date, not an unqualified present capacity figure.
- Redacted Google investment amounts, convertible-note conversion/disbursement, Stargate legal formation/contribution details, full datacenter ownership, current exclusivity and realised delivery against future commitments remain unverified. Broader xAI debt financing was investigated but excluded: the contemporaneous report was not successfully fetched and the bank's primary passage was not independently inspected.
- Newer SpaceXAI branding on x.ai does not rewrite xAI's historical issuer identity. Corporate restructuring and present legal-counterparty resolution require separate research.

No existing claim was duplicated or substantively edited. No performance publicity, motives, financial dependence, artificial revenue or circular-funding proposition was added. Cycle detection is deferred: the graph retains directed typed claims and their IDs, but this increment makes no analytical cycle finding.

## Review

The corridor manifest may mix Capital and Compute claims intentionally. Existing manifests retain topic constraints; omitted group topic permits cross-topic corridor review. Each claim has explicit type, stage, amount and quantity fields, dates, qualification, evidence roles, locator and source links. All Human decision and Notes fields are blank.

```sh
pnpm review:seed --order review/capital-compute-order.json --title "capital and compute review" --output review/.local/capital-compute-blank.md
pnpm review:seed --order review/capital-compute-order.json --title "capital and compute review" --output review/.local/capital-compute-blank.md --check
```

`review/capital-compute-review.md` is the annotated working pack and preserves two machine audits; the commands above write and check a separate, ignored blank reference instead of overwriting it. Prior packs remain historical working copies; do not regenerate them against the enlarged dataset.

Audit B's 13 RESEARCH MORE items were re-checked against their primary sources on 2026-10-15; all 13 are supported and remain machine-checked seeds. The record is [`review/capital-compute-research-more-2026-10-15.md`](../review/capital-compute-research-more-2026-10-15.md).

## Visual grammar requirements, not implemented styling

1. Capital and service commitments need distinct relation families even with reciprocal endpoints.
2. Stage and date must remain legible independently of relation family.
3. Parallel terms and dated updates need individual selection and readable claim wording.
4. Literal totals and per-unit hardware configurations must not look like entity ownership or aggregate exposure.
5. Internal resource use and multi-party contracts need scope cues before any future flow or cycle visualization.
