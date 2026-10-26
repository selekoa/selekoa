# Selekoa visual system — v2

This is the current canonical visual direction. It records the maintainer-supplied lessons from the completed Lovable Visual Lab experiments; it does not claim a new independent evaluation of those prototypes. It supersedes the earlier exploratory A/B/C treatment framing. Historical briefs, screenshots and evaluation records remain useful context.

This is a design and product direction document only. It makes no change to the production application, research data, ontology, claims, review states or provenance.

## One canonical system

Drop the conceptual A/B/C split. The preferred direction derives from the former Hybrid treatment and is now simply **the Selekoa visual system**. Future visual work should improve this system, rather than preserve competing stylistic modes.

Continue to serve an intelligent lay reader first, with expert drill-down second. Progressive disclosure should make the ecosystem approachable without concealing the precise claims behind it.

## Light and Dark

Light and Dark are presentation preferences within the same system. Both use the same information hierarchy, node grammar, relation grammar, spatial logic, Inspector structure and interaction model.

Dark presentation proved especially effective for the network/map view: it improves coherence and focus. Retain the light/dark toggle. The dark character should be matte and cartographic, with restrained semantic colour, strong linework, low-glare panels, warm typography and high information density. It must not become cyberpunk or cinematic.

Light presentation should retain an editorial, paper-like quality. Theme changes should preserve meaning, selection and orientation; neither theme is a separate product or a reduced-information version.

## Core visual character

**SCIENTIFIC ATLAS × SYSTEMS DIAGRAM × NETWORK CARTOGRAPHY × EDITORIAL RESEARCH TOOL**

The map may be visually distinctive and “cool”. Anti-slop does not mean visually bland. Character can come from spatial organisation, cartographic regions, typography, controlled semantic colour, relation line grammar, meaningful transitions, focus behaviour and temporal interaction.

Continue to prohibit decorative particles, glowing neural-network aesthetics, generic AI gradients, fake telemetry, cyberpunk HUDs, constant animation, arbitrary rainbow coding and unsupported analytic implication.

Motion is useful when it explains focus, direction, filtering or time. It should be purposeful, bounded and compatible with reduced-motion preferences; the same meaning must remain available without animation. Decorative dynamism remains unwanted.

## Lessons from Lovable

### Successful directions

- Dark presentation improves coherence and focus; the light/dark toggle is worth retaining.
- Map-like navigational regions can make the network more intuitive. Label them explicitly as navigational, not analytical.
- Four anchor-lab neighbourhoods are useful orientation devices: OpenAI, Anthropic, Google DeepMind and xAI.
- Bespoke entity symbols are preferable to circles with letters or generic card/icon nodes.
- Relation families should have a stable visual grammar.
- Parallel claims need compact default rendering and fan-out on interaction. Every underlying claim must remain individually selectable.
- Focusing an entity should reorganise its actual neighbourhood while preserving spatial continuity, rather than substitute a decorative or invented neighbourhood.
- Motion can explain focus, direction, filtering and time.
- Claims and Timeline are already structurally sound and should not be needlessly reinvented.
- The Evidence Inspector remains central.

### Weak or rejected directions

- Multiple nearly identical visual “treatments” add complexity without value.
- The high-contrast black Editorial side panel was visually crude.
- Fixed hard-coded coordinates alone make the graph feel like a static diagram.
- Generic entity icons and boxes look utilitarian.
- Uniform arrows are insufficient.
- Dense maps cannot give every label equal visual priority.
- Decorative dynamism is not a substitute for useful interaction.

These lessons set the direction, not a licence to erase distinctions for visual simplicity. Compact rendering must retain a discoverable route to each claim and its evidence.

## CivLab: inspiration, not a template

Useful observations from the experiments include dark network presentation, visually coherent coloured areas, a graph that is visually strong without looking like a subway diagram, and map-like grouping that improves orientation. A future “power map” or lineage-specific view might warrant different spatial logic.

Do not copy CivLab's layout, code, branding, exact colour scheme, exact shapes or analytic assumptions. Any Selekoa region must be justified by explicit data or labelled as a navigation/focus device. Navigational anchor neighbourhoods are not inferred communities, affiliations or spheres of influence. Any future analytical spatial view needs an explicit basis and explanation.

## Entity display and people

The canonical entity grammar should distinguish organisation, person, document, infrastructure and concept. Models, public bodies and funds may receive further treatment where justified. Entity type must be readable without colour alone.

People deserve particular attention as career and institutional paths become an important use case. A possible later person entity page could bring together:

- A concise sourced biography.
- A career timeline and institutions.
- Key documents and research.
- Co-founding and departure events.
- A graph neighbourhood.
- Source provenance.

This is a future product direction, not an implementation request. Historical snapshots and departure announcements must retain their exact scope; connecting career records must not manufacture a transfer, influence or current-employment claim.

## Model entities

Do not assume models should be prominent in the default ecosystem map. Many low-information product versions could dominate it. Treat models as a potentially secondary layer.

Possible later uses include search results, entity detail, model-family pages, a focused lineage overlay, compute/training linkage, Timeline or a dedicated model view. Default-map visibility remains a separate future design decision.

## Product priority

The [current project positioning](../docs/project-positioning.md) now puts people and institutional diaspora first, followed by intellectual lineage. It supersedes the ordering recorded below; the visual principles remain applicable.

Current substantive priority should lean toward:

1. Intellectual lineage.
2. People and institutional diaspora.
3. Structured external-data imports.
4. Model lineage only where it materially explains the ecosystem.

This is a design/product priority note. It neither changes research data nor starts a new research increment or import.

## Semantic and interaction invariants

- Keep one stable claim identity per relationship. Direction follows subject to object; parallel and reciprocal claims remain distinct through compact rendering and fan-out.
- Use relation-family grammar independently of entity type, transaction stage and time. An announcement must not look like completed investment or operational capacity.
- Preserve literal/non-edge claims, amount bounds, date precision, unknown dates and the distinction between historical snapshots and validity intervals.
- Positions, regions, size and colour must not imply importance, influence, causation or affiliation without an explicit analytical basis. Missing connections do not establish absence.
- Evidence remains one click away from a selected claim. Preserve the Inspector's claim wording, qualification, passage/locator and direct source link.
- Keep derivation, resolution, source/support roles and editorial review separate. Visual polish cannot imply verification or human acceptance.
- Preserve coherent filters and selection across Map, Claims and Timeline, with accessible non-canvas routes and visible keyboard focus. “Through year” remains cumulative inclusion, not an active-at-date query.

## Canonical implementation and next use

Lovable remains an experimental design laboratory. The Codex / GitHub Selekoa project remains the canonical implementation.

When visual implementation resumes, port principles and interaction ideas selectively; do not copy Lovable code or architecture wholesale. Preserve Sigma/Graphology, or replace them only after explicit architectural review. Preserve the ontology, provenance and tests.

The [earlier visual brief](visual-language-brief.md) retains useful relation-family and fixture contracts. Its A–D relation-family labels are not competing visual treatments. The [evaluation checklist](prototype-evaluation.md) remains a way to test successive iterations of this one system, including both presentation preferences. The [current UI notes](current-ui-notes.md) and screenshots document the pre-implementation baseline.

No production redesign, code port, publication or factual change is authorised by this document.
