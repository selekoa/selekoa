# Selekoa: visual language brief

> Direction update: the A/B/C treatment exploration has concluded. [The Selekoa visual system — v2](visual-language-v2.md) is the current direction: one system with Light and Dark presentation preferences. This historical brief retains useful semantic and fixture contracts; its A–D relation families are not stylistic modes.

Selekoa is a source-backed map of the frontier AI ecosystem: people, institutions, capital, compute, governance documents and documented intellectual connections. It helps a reader follow a specific relationship to the assertion and evidence behind it. It is a bounded research sample, not a complete map or a ranking of influence.

Design for an intelligent lay reader first, with expert drill-down second. The intended character is **scientific/network figure × editorial research tool**: legible, precise, calm and recognisably about research.

## Visual principles

- **Anti-slop:** every mark, colour and interaction must explain data or support a task. No decorative motion, glow, particles, gradients, ornamental networks, fake indicators or command-centre styling. Typography, spacing and meaningful legends should do most of the work.
- **Progressive disclosure:** start with understandable anchors and a few relationship families; reveal exact predicates, time, transaction stage and evidence as the reader focuses. Do not require ontology knowledge before the first useful interaction.
- **Analytical honesty:** proximity, circle size, visual centrality and clustering must not imply influence, importance, money, ideological affiliation or causal connection without an explicit analytic basis. Current layout positions have no analytic meaning. A missing edge is not evidence of absence.
- **One claim, one selectable relationship:** preserve stable claim IDs. Distinct claims between the same entities remain individually selectable, including multiple claims with the same predicate and date. Summaries may show a count, but must expand into all underlying claims.
- **Direction matters:** arrows run from subject to object. Distinguish investment into a lab from the lab's purchase of compute from an investor. Replacement arrows run from the newer document to its predecessor.
- **Independent encodings:** relation family, entity type, time, transaction stage and epistemic status answer different questions. Do not use “planned” as a relation family or make an announcement look operational.
- **Evidence one click away:** selecting an edge or claim row opens its evidence Inspector. Preserve source title, passage/locator, qualification and direct source link in the eventual application. Do not bury evidence behind a second discovery workflow.
- **Accessible alternatives:** provide complete keyboard-accessible Claims and Timeline views, readable focus states, adequate contrast, reduced-motion support and non-colour cues.

## Provisional visual families

These are display candidates, not ontology changes. All **28 predicates currently used by claims** are listed below. Keep their precise meanings even if they share a visual treatment.

| Candidate family           | Existing predicates                                                                                                                                       |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A. People / organisational | `held_role`, `co_founded`, `departure_announced`, `launched`, `acquired`, `unit_of`, `combined_into`                                                      |
| B. Document / intellectual | `published`, `authored`, `supersedes_document`, `changes_from`, `applies_framework`, `cites`, `explicitly_credits`, `discusses`, `reports_evaluation_of`  |
| C. Capital                 | `investment_announced`, `invested_in`, `extended_credit_to`, `participated_in_round`, `announced_funding`                                                 |
| D. Compute / commercial    | `selected_cloud_provider`, `cloud_terms`, `compute_capacity`, `uses_infrastructure`, `uses_hardware_from`, `plans_capacity`, `plans_infrastructure_spend` |

Boundaries that resist clean grouping:

- `acquired` connects institutional continuity and capital transactions; `unit_of` is internal structure, not proof of an investment.
- `plans_infrastructure_spend` expresses capital intent for compute. It is assigned to D in the fixture for experimentation; its dataset topic is capital. Its literal amount must not become a fabricated node.
- `published` and `authored` establish document responsibility; citation and credit describe intellectual connections. Family B may need two treatments when dense.
- `supersedes_document` is replacement; `changes_from` is a scoped content delta; `applies_framework` is application and can point to a framework concept. None is interchangeable.
- `reports_evaluation_of` links a document to the evaluated organisation, so its endpoints do not resemble a citation chain.
- `uses_hardware_from` and `uses_infrastructure` describe use; neither alone establishes procurement, ownership or an external commercial transaction.
- `announced_funding` can be a literal round total. Participation never attributes that total to one investor.
- A departure announcement is `departure_announced`, not a generic “departed” fact or an inferred last working day.

## Fixture contract

[prototype-fixture.json](prototype-fixture.json) contains **33 entities and 63 claims** selected from the existing repository snapshot. It includes seven people, all four anchor labs, four infrastructure entities, document versions and a concept. It is visual test material only, not a replacement dataset or an editorially approved export.

Entity fields are limited to ID, type and name. Claims retain exact existing IDs, endpoints, predicate and statement (as `displayLabel`), plus structured time and relevant public transaction attributes. `relationFamilyCandidate` is a tentative presentation mapping. An absent target denotes a literal claim, whose value/unit remain under `literal`. Do not draw it as an entity-to-entity edge.

`time.kind` distinguishes events, snapshots, intervals and unknown time. Preserve date precision, date basis and missing boundaries. “Through year” is cumulative inclusion, not a reconstruction of active relationships. `stage` is an independent transaction descriptor. Amounts retain currency, bound and scope; quantities retain unit and bound. Do not add overlapping or cumulative amounts or interpret “up to” as realised.

The fixture deliberately omits review decisions, audit text, reviewer identities, internal notes and evidence payloads. No review or confidence status is implied by these omissions. Do not invent quotes or citations in a prototype. Use claim IDs as the future evidence integration contract and the Inspector screenshots as the current evidence presentation reference. Production evidence must remain linked to the full underlying claim, including its qualifications.

## Representative tasks

| Task                                                          | Fixture records that exercise it                                                  |
| ------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| Follow personnel continuity without inventing a transfer edge | Dario Amodei / OpenAI / Anthropic; Chris Olah / Google Brain / OpenAI / Anthropic |
| Understand institutional change without merging identities    | DeepMind and Google Brain → Google DeepMind; Google Research membership           |
| Select replacement and content-change claims separately       | RSP 2023 → v2.0 → v2.1 → v2.2 → v3.0; multiple v3.0 deltas                        |
| Separate money, cloud terms and capacity                      | Microsoft / OpenAI; Amazon / Anthropic / AWS; Anthropic / Google                  |
| Compare planned and operational capacity                      | xAI / Colossus; planned AWS training versus deployed Project Rainier              |
| Retain internal relationships and literal claims              | Gemini training fleet; xAI round total; Stargate spending plan                    |

The fixture is intentionally too small to establish performance at scale. Evaluate larger synthetic stress data separately, clearly labelled as synthetic and kept outside research data. This package does not authorise publication, application redesign or factual changes.
