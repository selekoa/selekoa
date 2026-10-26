# Intellectual lineage I — documented transmission

Four bounded lineages add 14 entities (12 documents, one concept and one person), 39 claims, 11 sources and 39 evidence records. The review pack includes five unchanged historical context claims. All additions remain explicit / supported / seed, with machine_checked evidence. Supported describes the exact proposition, not endorsement or absence of counterevidence. No existing application record is changed; metadata advances to schema 2.4 and the new check date.

## Evidentiary grammar

| Category                         | Representation and threshold                                                                                             | What it cannot establish                                                                 |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------- |
| Explicit citation                | `cites`: a document explicitly references a work; record the passage and bibliographic identity                          | Agreement, use, intellectual priority or causal influence                                |
| Explicit credit                  | `explicitly_credits`: an express attribution to a person or organisation, with the contribution stated                   | Earliest invention; endpoints do not include documents or concepts                       |
| Discussion                       | `discusses`: explicit engagement with a defined concept                                                                  | Adoption, approval, rejection of every use or transmission                               |
| Documented use                   | New `uses_method_from`: a document reports using an identified method or architecture from another work in its own study | Independent replication, effectiveness, organisation-wide adoption or a future plan      |
| Reformulation                    | Retain the source's stated changes and rationale in a scoped citation qualification and dossier                          | A generic `extends` edge or a claim that all of the earlier method was adopted           |
| Disagreement / rejection         | Attribute the specific objection in the proposition/qualification of a citation or concept-discussion claim              | Editorial endorsement of the objection or rejection of an entire research programme      |
| Similarity / possible antecedent | Research-only unresolved register, with search scope and missing evidence                                                | An application lineage edge, even when chronology or personnel makes the story plausible |

The existing registry is deliberately narrower than some conceptual categories: `discusses` targets concepts and `explicitly_credits` targets actors. Do not expand endpoints to fit an attractive diagram. No generic influence, inspiration, intellectual-descent, adoption, reformulation or rejection predicate is introduced.

`uses_method_from` earns its place through repeated explicit reporting: Transformer training uses Adam; Human Preferences uses TRPO for robotics; summarisation and InstructGPT use PPO. Citation cannot faithfully encode those propositions. Validation requires document endpoints, explicit derivation, a nonempty `attributes.method`, and supporting primary evidence belonging to the reporting document. The method field is prohibited on other predicates. These structural checks cannot determine whether prose really reports use; the passage still needs editorial inspection. Tests reject missing method, inferred use, secondary-only support, wrong-document support and invalid endpoints. A citation or critical discussion without a report of use is a negative example.

## Documents and time

Research-paper nodes identify works, keyed by arXiv ID where available. Sources identify inspected expressions: all newly recorded arXiv sources are pinned to v1, with first submission and version date separately stored. Citations generally identify the work, not a revision read by the citing author. Do not convert a work-level citation into a version-specific reception claim. Existing Scaling Laws source metadata is reused unchanged; new evidence checks are dated separately.

The Chalmers copy has author-hosted PDF pagination and a first-page footnote identifying its 2010 journal publication. Its revision date is unknown. IEM retains publication year 2013 and modification date 2013-09-13. Good retains the existing 1965 bibliographic qualification; the mirror filename is not a date. The Superalignment page is dated 2023-07-05 but mutable: the retrieved expression does not independently authenticate its exact 2023 content. These limits are visible in the review pack.

No paper citation creates a `supersedes_document` or `changes_from` relation. Those predicates retain their publisher/framework version semantics. The existing v3 learned-optimisation record is not backdated or replaced. RLHF is the only new concept, defined as a feedback-trained reward model plus policy optimisation, not every kind of human supervision. Its label is not an earliest-use claim.

## Selection and preservation

- Scaling: explicit methodological references, followed by a critical citation in compute-optimal training. This is not a single settled scaling law.
- Policy optimisation: separate authorship, citation and reported optimiser use. PPO's relationship to TRPO is not inferred from Schulman's career.
- Human feedback: explicit links among preference learning, summarisation and instruction following, alongside attributed supervision limits. Shared RLHF discussion alone is not a Superalignment-to-InstructGPT transmission edge.
- Historical reception: Good, Chalmers and MIRI are connected by explicit citation and credit. A frontier-lab continuation remains unresolved.

All eight initial leads, including deferred ones, are retained in the [lead register](../research/intellectual-lineage-leads.md). The [unresolved register](../research/intellectual-lineage-unresolved.md) is research state and never imported by the application. Co-authorship and the existing diaspora claims supply context only. No UI redesign or dedicated lineage view is implemented.

The increment manifest freezes baseline IDs and content hashes. Tests compare every retained entity, claim, source and evidence record, including review states. Earlier working packs remain untouched. Their inclusion as context in a new blank pack neither rechecks their evidence nor erases prior decisions. No decision is imported or inferred.

## Recorded external machine audits

The working pack preserves the Claude and Grok audits supplied on 2026-09-21 and recorded on 2026-09-25. Claude reports 43 YES and one EDIT; Grok reports 44 YES, with entries 08–34 approved as a group. Model attribution and source-inspection claims are supplied reports, not independently authenticated by this recording pass.

Claude's objection to entry 08 concerns the Adam byline: “Diederik P. Kingma” versus the claim's “Durk Kingma”. It remains an unapplied proposal. Grok's grouped approval does not address that wording individually; its arXiv/PPO/Adam/Attention description also does not fit the Superalignment webpage and Chalmers paper in entries 31–34. Both audits are recorded without claiming that every passage was checked twice. Application data, human decisions and verification states remain unchanged.

The subsequent [authorized corrections](../review/approved-corrections-2026-09-25.md) apply the Kingma and Ba byline wording and the expanded Superalignment argument. Those claims remain seeds with machine-checked evidence. The original audit pack and objections remain a historical record; the editorial test reproduces its pre-correction body. Use a new output path when generating a current-data reference after corrections.

## Reproduce the review

Preserve the annotated working pack. Generate or check a separate blank reference:

```sh
pnpm review:seed --lineage --order review/intellectual-lineage-order.json --title "intellectual lineage I — documented transmission" --output review/.local/intellectual-lineage-blank.md
pnpm review:seed --lineage --order review/intellectual-lineage-order.json --title "intellectual lineage I — documented transmission" --output review/.local/intellectual-lineage-blank.md --check
```

The generator derives mechanical links and all claim/evidence fields from the validated data. Human decision and Notes remain empty. It refuses every differing existing working copy; use a different output path if a human has edited the pack.

## Product implication

A future view should show the person path alongside the document path, with different relation labels and no inferred join. Readers need date precision, work/version distinctions, one-click claims and evidence, and a way to isolate one lineage. An optional research-only similarity layer would require a visibly separate treatment and an explicit user choice; it must not look like established transmission. Publication, event, revision and evidence-check dates must remain distinguishable. Preserve a keyboard-accessible list equivalent and the current evidence inspector.

[BehaviorGraph, AI History Project, Symfield AI Lineage Network and Epoch AI](adjacent-projects.md) remain relevant adjacent work. This increment develops Selekoa's documentary granularity and links to existing institutional context; it makes no superiority or uniqueness claim and imports none of their datasets.
