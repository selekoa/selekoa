# Evaluation Ontology I

Schema 2.5 adds four exploratory seeds at the base commit recorded in the [increment manifest](../review/evaluation-ontology-i-increment.json). Earlier claims, identities, evidence, inspected source expressions and human working packs remain unchanged. New inspection records preserve the earlier source checks instead of rewriting them. No existing intellectual credit was converted into an engagement.

## Implemented semantics

| Predicate                   | Direction and scope                                                                                                            | Required attributes                                                    |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------- |
| `evaluation_engagement`     | Evaluator → developer; a documented, system-specific activity. Neither certification nor independently verified effectiveness. | `activityStage`, `evaluatedSystem`, `activityScope`                    |
| `separation_announced`      | Separating team/institution → parent institution. Announcement only, without completed incorporation or staff transfer.        | `activityStage: announced`, `transitionScope: separation_announcement` |
| `name_transition_announced` | Earlier named referent → newly named referent. A historical naming announcement, preserving separate dataset IDs.              | `activityStage: announced`, `transitionScope: name_announcement`       |

The proposal’s successor-directed `spin_off_announced` would force the September account toward a successor whose name was then undecided. The implemented separation edge therefore points from ARC Evals to ARC. The separate December naming edge points from ARC Evals to METR. Neither edge means acquisition, merger, ownership transfer, legal succession or a transitive identity equivalence.

Evaluation stages are `proposed` (suggested or conditional work), `announced` (a stated forthcoming engagement) and `reported_performed` (the source reports activity has occurred, possibly still continuing). Announcing that past work occurred uses reported_performed, not announced. These are activity stages, independent of relation family and transaction stage. No completion, success or current continuity follows from reported_performed.

The narrow engagement predicate requires explicit derivation, a nonempty system description and activity scope, and supporting primary evidence with a structured publisher identity matching one endpoint. A developer report supports that developer’s account; primary status is not independent verification. Secondary-only investigation and unsupported inferred engagements are outside this predicate’s present scope. Schema validation cannot establish whether free text faithfully describes a passage; source inspection and editorial review remain necessary. Generic partnerships, framework advice, intellectual credit and model access without an evaluation activity are insufficient.

Transitions require explicit primary support, announcement-only scope and stage, and either an announcement event or an explicitly unknown date. Unsupported legal-successor predicate/scope values and completed transition stages are rejected. Free-text overclaims still require editorial checking. Source publisher IDs are optional for earlier data; the new four source inspections retain canonical/evidence URLs, publication uncertainty, version notes and check dates.

## Exemplars and source limits

| Claim ID                               | Relationship                                                                                                                          | Original passage                                                                                                                                                |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `eval-ontology-i-arc-openai`           | ARC → OpenAI; reported performed, early GPT-4 versions, preliminary autonomy evaluation. Date unknown.                                | [GPT-4 System Card](https://cdn.openai.com/papers/gpt-4-system-card.pdf), §2.9, printed pp55–56 / PDF pp15–16                                                   |
| `eval-ontology-i-arc-anthropic`        | ARC → Anthropic; reported performed, fine-tuned Claude snapshot. Start described as fall 2022; year-only lower boundary, unknown end. | [Claude 2 card](https://www-cdn.anthropic.com/bd2a28d2535bfb0494cc8e2a3bf135d2e7523226/Model-Card-Claude-2.pdf), p2, Evaluations and Red Teaming, ARC paragraph |
| `eval-ontology-i-arc-evals-separation` | ARC Evals → ARC; announcement dated September 19, 2023.                                                                               | [Spin-out announcement](https://evals.alignment.org/blog/2023-09-19-spin-out-announcement/), title, date, opening three paragraphs and later note               |
| `eval-ontology-i-arc-evals-metr-name`  | ARC Evals → METR; naming announcement dated December 4, 2023.                                                                         | [Name announcement](https://metr.org/blog/2023-12-04-metr-announcement/), title, date and opening three paragraphs                                              |

The model-card claims retain ARC as named. The Claude snapshot is not asserted to be deployed Claude 2. Both institutional pages include retrospective Christiano/AISI wording; neither inspected expression authenticates all wording at its displayed 2023 date. Incorporation, staff transfer and legal succession stay unknown. The year-only representation of fall 2022 is deliberately coarse: the time note retains the season, and the cumulative through-year filter is not an as-of or active-tenure query.

## Projections and compatibility

Engagements use the existing governance map family; separation and naming use personnel/organisation. Activity stages remain separate grouping keys and visible inspector, list and dossier details. All four edges preserve their stable IDs and direction. Generic query/dossier projections already include direct institutional claims; no transitive successor expansion is added. JSON and Markdown research packets preserve the new structured attributes and source metadata. Schema 2.0–2.4 records remain readable; older consumers must recognise schema 2.5 to consume new predicates.

## Audit and human inspection

On 2026-09-28, the proposing Codex pass retrieved all four original sources. A separately spawned Codex audit agent, `source_audit`, independently retrieved the same four URLs without receiving proposed verdicts. Auditor reported GPT-6 family; exact runtime model identifier was unavailable. Method was browser text retrieval, including extracted PDF pagination. No source-access failures were reported; PDF screenshot calls did not supply inspectable image content to that agent. Independence is a separate agent/source pass within the same task, not a different model family or independent reproduction of evaluations.

The audit corroborated the source-named actors, early-model/snapshot scope and announcement-only transitions; it flagged retrospective wording and the unspecified Claude snapshot. Those qualifications are retained in all affected claims. After completing its independent source pass, the audit agent separately compared all four implemented claims and their evidence/source records against its findings and reported no substantive discrepancy. Archived expressions, formation records, agreements and actual evaluation performance were not audited. This paragraph records coverage and disposition, not human acceptance; generated audit logs are not tracked.

The [four-claim human sample](../review/evaluation-ontology-i-spot-check.md) includes a randomly selected claim plus both developer sources and the institutional transition family. All human fields remain empty in the [new working pack](../review/evaluation-ontology-i-review.md). The mutable-source and institutional-history framing triggers require targeted human inspection; no curated narrative or legal conclusion is authorised by machine agreement.

## Deferred decisions

General research partnerships, philanthropic funding commitments, policy submissions, consortium membership, public-body endpoints/dossiers and an Event ontology are deferred: none blocks these four claims. No generic influence or affiliation edge is introduced. The remaining three candidate predicates from the original proposal are not implemented. Existing RSP advice/credit and METR report records remain as stored; there is no automatic conversion or new METR-developer edge inferred from them.

Open questions are how to represent seasonal boundaries without false precision, how to admit independently investigated engagements beyond party reports, and whether authenticated archives/formation documents will justify a later legal-identity model. Those questions do not justify claiming legal succession now. Proposed/announced engagement stages are validated with synthetic test records; this small increment does not invent factual exemplars just to populate each stage.
