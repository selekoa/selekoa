# Current UI: design handoff notes

These are observations of the current application, not a redesign proposal. Screenshots show the full existing research sample; the separate fixture is a smaller selection.

## Strengths to preserve

- Restrained publication typography, a quiet palette and a visible research-preview explanation establish the right starting tone.
- Search, research anchors and topic navigation provide several ways into the same records.
- Map, Claims and Timeline share filtering semantics. Claims provide an accessible alternative to WebGL and expose literal records that cannot be edges.
- Directed curved edges preserve individual claims, including parallel relationships. Selection opens the evidence Inspector.
- The Inspector is structurally important: claim wording, qualifications, dates, transaction attributes, source passages/locators and links remain attached to one stable claim.
- Framework navigation distinguishes publisher, version family, predecessor/successor and content changes.
- Amount bounds, transaction stages, date uncertainty and the distinction between machine checks and human review remain visible.

## Visual weaknesses

- **Circles with letters are placeholders.** Entity types need a clearer, economical visual vocabulary without relying on colour alone.
- **Uniform arrows are insufficient.** Family, predicate and stage largely require hovering or reading the Inspector; the overview does not explain the relationships at first glance.
- Curved parallel edges remain separate technically, but dense bundles are hard to count, trace and select visually.
- Labels overlap in crowded views. Long document titles, fixed label wrapping and anchor emphasis compete for limited canvas space.
- **Layout positions are non-analytical.** The deterministic component/radial arrangement communicates no metric, influence, chronology or hierarchy. It can nonetheless look meaningful to an unprepared reader.
- The Inspector competes with the map for width on desktop. Dense claim lists and detailed source sections require substantial scrolling.

## Known usability limits

- The canvas is not a complete keyboard interface; the Claims view and search are essential alternatives.
- Edge labels are not continuously rendered. Hover and selection carry much of the interpretation burden.
- Focusing a person or lab resets topic, year and entity-type filters to show its relationships. This is current behaviour to evaluate, not a requirement to preserve blindly.
- “Through year” accumulates records, includes undated records and does not identify which relations were active at that time. A future timeline must not silently change this meaning.
- Mobile stacks navigation, explorer and Inspector. Selecting a claim scrolls to its evidence; retaining orientation and returning to the previous selection need careful evaluation.
- The present layout has not established usability or performance with hundreds or thousands of nodes. More nodes cannot simply mean more forced labels.
- No decorative motion. Camera interaction must respect reduced motion.

## Non-negotiable redesign invariants

Preserve stable claim identity, subject-to-object direction, selectable parallel claims, literal/non-edge records, explicit temporal uncertainty, amount bounds and stage distinctions. Keep organisation, person, document, infrastructure and concept identities separate. Internal use must not look like an external investment.

Keep evidence discoverable in one click from a relationship, with a direct source link inside the Inspector. Do not collapse source roles, support roles, derivation, resolution and editorial review into one confidence badge. Retain coherent filters across Map, Claims and Timeline and an accessible non-canvas route to every claim.

## Screenshots

The earlier screenshot index and its nine captures were removed on 2026-10-26: they showed an earlier interface, and screenshots are not kept in the repository.
