# Institutional dossiers — Integration I

The dossier is a reading projection of validated claims. Anthropic is the first fixture; `institutionalDossier(data, institutionId)` accepts any organisation. It introduces no claims, sources, predicates, dates or editorial decisions. Map, Claims and Timeline remain available.

## Reading architecture

An institution focus exposes **Dossier** beside the existing display modes. Overview text comes from the entity record, with its identity sources under Scope. Coverage, unique claim-linked source counts and seed counts are computed for the dossier. Seeds are labelled as not editorially accepted, separately from evidence verification. This generated projection has no recorded human narrative review and is exploratory, not a curated historical interpretation under the [editorial policy](editorial-policy.md). Five sections use progressive disclosure:

1. **Chronology:** direct institutional records plus its documented governance sequence and changes, grouped by record year. Undated records form a separate final group.
2. **People & paths:** people with an explicit role, founding or departure claim at the institution; their other role/founding/departure records supply context. Founders appear first, then names alphabetically. Each person's records retain their dates, including unknowns. The panel is not a roster or transfer model.
3. **Ideas & documents:** works authored by those people or published by the institution, with one existing documentary relation in either direction. Incoming reception retains the citing work as subject. Publisher and concept-discussion records for those citing works provide orientation without a second citation hop. “Why this document is included” opens the exact membership and authorship/publication evidence.
4. **Capital & compute:** direct capital/compute claims grouped by named counterparty or infrastructure. Amazon and AWS remain distinct. Original stages, amount/quantity bounds and scope are visible; qualifications and conditions are expandable. No aggregation or cash-flow inference is performed.
5. **Governance:** publisher-associated framework versions, publication claims, evidenced replacement relations and selected deltas. Version metadata retains publication/effective/revision distinctions; replacement direction remains newer to predecessor.

Evidence is an action on every statement, not a duplicate bibliography screen. The shared Inspector supplies the original claim, source passage/locator, time note, transaction attributes, source version and machine/human review state. Closing it returns focus to the triggering statement. Section buttons and native disclosure controls work without WebGL. Source counts are coverage counts, not independent corroboration.

Dossier selection deliberately does not use the map's topic/type/year filters. Those controls are hidden while reading the dossier and retained on return. The dossier overview states its own full coverage. Selecting a non-institution endpoint leaves dossier mode for Claims; selecting another institution derives its dossier. This does not add routing, storage or a parallel application.

## Anthropic fixture

At this integration baseline the projection selects **119 distinct claims, 50 claim-linked sources and 130 evidence records**, with **13 undated claims**. Contextual record dates span **2014-12-22–2026-07-08**; the direct institutional chronology begins in **2021**. Repeated appearances across sections retain the same ID and do not inflate counts.

- Dario and Daniela Amodei, Chris Olah, Jack Clark and Tom Brown have dated founding credits; Jared Kaplan and Sam McCandlish retain undated retrospective credits. Other selected personnel are John Schulman, Durk Kingma and Jan Leike. Separate prior-role, affiliation and departure records expose OpenAI and other institutional context without manufacturing a transition.
- Person-linked works expose scaling, policy optimisation, human feedback and oversight threads. The weak-to-strong paper enters through its explicit citation of the reward-modelling paper, whose recorded author Jan Leike has a separate Anthropic role record. This is documentary context, not an Anthropic research-programme or adoption claim. The RSP's explicit ARC credit remains separate from citation and method use.
- Amazon investment announcements and reported tranches, AWS provider priority/nonexclusivity and capacity commitments, Google financing and compute terms, Rainier, and the Google/Broadcom joint agreement show different dates and stages. No totals or dependency label are computed.
- Nine RSP editions expose the published framework sequence and bounded changes through v3.4, including terminology, thresholds, Roadmaps, Risk Reports and reviewer approval.

## Gaps the projection exposes

- Five founding credits have year-level dates; Kaplan and McCandlish have no encoded founding dates. The selection cannot assert a complete founding roster or a legal incorporation date.
- Several prior roles and departures lack boundaries. Daniela's disputed prior-title review history is not adjudicated here. Paper affiliation, employment and governance responsibilities retain their original qualifications.
- The data can connect people to works and works to explicit reception; it cannot assert that ideas travelled with those people into Anthropic. No institutional adoption bridge is added, including for weak-to-strong work.
- The chronology is a history of record events/snapshots, **not knowledge available as of that date**. Retrospective sources can document earlier events. Publication, version and check dates remain inspectable, but a defensible historical knowledge query would need more than sorting event dates.
- Capital reciprocity cannot trace specific proceeds. Amount redactions, contingent milestones, different counterparties and duplicate counterparty representations of one joint agreement prevent a meaningful aggregate exposure total.
- Commercial stock consideration and revenue-sharing representation gaps remain documented in Capital II; this UI does not invent a predicate to draw a closed loop.
- Governance documents establish a changing stated framework, not implementation or effectiveness. Missing separate publication days remain unknown.

These are dataset/query limits, not authorization for an ontology extension or another research increment.

## Visual and accessibility scope

The dossier uses publication typography, a numbered section rail, ruled chronological groups, modest density and semantic relation-family borders accompanied by text labels. Shape plus text identifies entity types in group headings. No size or layout encodes influence, importance or an analytical community. The shared light/dark palette preserves selection and content; the graph's layout and existing glyphs are otherwise retained. Full graph grammar redesign remains future work.

Native buttons and details, visible focus, evidence focus transfer/return, reduced-motion compatibility and a single-column mobile arrangement provide non-canvas access. Browser coverage exercises two or more sections, exact evidence, source access, both themes, mobile overflow and axe. Domain tests cover deterministic selection under reordered input, stable record identity, bounded expansion, uncertain dates, counterparties, versions, invalid focus and reuse with xAI's literal amount claim.

## Assessment

This improves explanation over the direct-neighbourhood map: readers can follow founding records alongside separate prior roles, see documentary context with inspectable inclusion evidence, and compare commercial and policy changes over time. It remains a documentary outline, not a complete biography or causal explanation. Dense document context still demands reading; user testing should determine whether its breadth helps orientation or should be narrowed by an explicitly curated reading selection. The projection's bounded rules and exposed gaps make that next evaluation possible without duplicating facts.
