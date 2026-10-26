# Capital II — reciprocal capital and compute corridors

Research checked 2026-09-25. Four selected corridors add seven claims, three sources and seven evidence records, with no new entities or ontology changes. All additions are explicit, machine-checked seeds awaiting human review. The separate [seven-decision pack](../review/capital-ii-review.md), [order](../review/capital-ii-order.json) and [increment manifest](../review/capital-ii-increment.json) preserve Capital I and all earlier audits.

## What a loop establishes

A directed graph cycle establishes only that selected edges close a path. An investment announcement paired with a cloud agreement does not trace the investment proceeds. Every component needs its own source, direction, date, stage and amount scope.

| Proposition                                            | Necessary evidence                                          | Capital II treatment                                                                 |
| ------------------------------------------------------ | ----------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Graph cycle                                            | Exact directed entity-to-entity claims                      | Named historical pairs below; no cash-flow interpretation                            |
| Reciprocal commercial relationship                     | Independently documented financing and procurement roles    | Corridor analysis; reciprocity alone does not establish dependence                   |
| Contractual linkage                                    | A source expressly connects agreements or consideration     | CoreWeave's filed stock issuance and service agreement; attributed FTC findings      |
| Cash returning to an investor                          | Evidence of actual transfers and counterparties             | Not established by these claim pairs                                                 |
| Financing tied to procurement                          | Express conditions or documented linkage                    | Describe only the disclosed condition or attributed finding; never infer from a path |
| Circular funding, artificial revenue or round-tripping | Evidence supporting that specific stronger characterization | No Selekoa allegation; preserve the FTC's different, attributed terminology          |

The [FTC staff report](https://www.ftc.gov/system/files/ftc_gov/pdf/p246201_aipartnerships6breport_redacted_0.pdf), January 2025, §4.3, printed pp. 19–20, goes beyond topology: it discusses investment-linked cloud commitments and calls the pattern “circular spending.” Table 2 uses public reporting for named commitment figures; surrounding internal-document findings are partly anonymized/redacted. This supports an attributed account of linkage, not reconstruction of each contract or tracing particular dollars. Do not assign anonymized motives to a named company. The report expressly does not assess illegal conduct (cover and introduction). Neither that discussion nor Selekoa's cycles establish artificial revenue or round-tripping. No Table 2 amount is imported into application data.

## Selection and scope

Start with existing capital/compute records, not a whole-industry deal search. [Microsoft/OpenAI](research/capital-ii-microsoft-openai.md) explains changing provider rights; [Amazon/Anthropic/AWS](research/capital-ii-amazon-anthropic.md) separates capital, provider priority and conditional future commitments; [Google/Anthropic](research/capital-ii-google-anthropic.md) contrasts financing with nonexclusive supply and redacted procurement; [OpenAI/CoreWeave](research/capital-ii-coreweave-openai.md) provides filed contractual linkage, remedies and an expansion.

NVIDIA/xAI and Stargate were investigated through existing source-backed records but excluded from deep expansion: hardware use and multi-party infrastructure plans cannot supply the missing bilateral cash links. See the [research-only limitations register](research/capital-ii-limitations.md). These are bounded historical windows, not a complete account through the research date.

## Exact historical motifs

These are manually selected paths, not an exhaustive cycle search. They exclude literal/value nodes and internal-resource use. A same-date announcement is not simultaneous cash movement, and a snapshot is not an inferred validity interval.

| Structure                      | Ordered claim IDs                                                                                                             | Date and stage limits                                                                                                                      |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Microsoft → OpenAI → Microsoft | `microsoft-investment-2019`, `openai-azure-2019`                                                                              | 2019-07-22 announcements; investment and provider selection, not traced payment                                                            |
| Microsoft → OpenAI → Microsoft | `microsoft-investment-2023`, `openai-cloud-2023`                                                                              | 2023-01-23 announcements; no perpetual exclusivity inferred                                                                                |
| Google → Anthropic → Google    | `google-anthropic-convertible-debt-2024`, `anthropic-google-nonexclusive-2024`                                                | 2024-11-19 decision snapshots; recorded credit and contracted supply, not debt conversion or cash return                                   |
| Amazon → Anthropic → AWS       | `amazon-anthropic-tranche-2024`, `capital-ii-anthropic-aws-nonexclusive-2024`                                                 | March investment and September terms snapshot; a corridor, **not a closed graph cycle**; Amazon and AWS remain distinct                    |
| OpenAI → CoreWeave             | `openai-coreweave-contract-2025`, `capital-ii-openai-coreweave-termination-2025`, `capital-ii-openai-coreweave-security-2025` | March contract and March 31 terms snapshot; parallel directed edges, **not a closed cycle**. Linked stock issuance stays in research prose |

These motifs do not imply that an investment financed a particular purchase. Newer terms are not retroactively attached to older investments. Earlier claims retain their evidence and editorial status; listing them here is not a new factual reconciliation or human approval.

## Representation and money

Schema 2.4 already represents `cloud_terms` and `compute_capacity`, including stage, conditions and period. The five term claims and two capacity claims need no generic dependency predicate. The Google procurement commitment is separately reviewable from its existing non-exclusivity claim; it adds no amount. CoreWeave default security is a cloud-contract condition, not an executed financing or ownership edge.

Stock granted as commercial consideration and revenue-sharing terms have no precise existing transaction predicate. Preserve them in sourced dossiers rather than distort `invested_in` or expand the schema merely to make a loop. A later bounded ontology proposal would need issuance direction, consideration type, conditionality and valuation semantics; this increment does not add it.

Never sum a round total with a participant's contribution, a cumulative commitment with its tranches, or two counterparty edges for one joint agreement. Contract ceilings remain upper bounds conditional on service. Planned finance, expected deployment, reported operation and realised investment are different stages. No net exposure, circular amount or implied transfer is calculated.

## Future interface, not implemented

A corridor panel could list constituent claim IDs with arrows, dates, stages, provider identities and amount scope. Show exclusivity, primary-provider status and default/termination conditions separately; a timeline should expose changing terms without implying continuity between snapshots. Label closed paths as documented graph cycles, with an adjacent statement that topology does not trace funds. Keep analytical motifs distinct from source-backed claims, and require inspection of each constituent record. Do not collapse AWS into Amazon or draw value nodes as counterparties. Human-review state must remain visible independently of machine checks.

## Validation and review boundary

The increment manifest freezes baseline arrays and prior review files. The already modified Capital I working pack is excluded from a committed hash because its unrelated local audit edits are not part of this increment; it is preserved in place. Historical Lineage II generation uses the frozen pre-Capital-II dataset, so its original body and appended audits remain reproducible. Focused tests check preservation, blank fields, new record states, amount limits and the three directed cycles. Full application and Edge checks are required because application data changes.

Generate/check the new pack with `pnpm review:seed --order review/capital-ii-order.json --title "capital II — reciprocal corridors and dependency conditions" --output review/capital-ii-review.md --check`. No decisions or notes are filled and no evidence is promoted. Human review should particularly inspect Microsoft's exact exception, the CMA's redactions and scope, and the CoreWeave default/remedy wording.
