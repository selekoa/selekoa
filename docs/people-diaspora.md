# People and institutional diaspora I

## Scope and preservation

The review selection covers 28 people: 15 existing people and 13 additions. The increment adds 47 claims, 18 entities (13 people and five supporting organisations), 14 sources and 47 evidence records. The review pack contains 85 claims: 47 additions and 38 unchanged context claims, including four institutional-continuity records. Context inclusion does not mean a new evidence check or replace earlier review work.

The supporting organisations are Stripe, Tesla, Safe Superintelligence Inc., Thinking Machines Lab and the University of Toronto. They explain selected paths; they do not begin a general lab or university catalogue. No predicate or schema extension was needed. New claims use held_role, co_founded and departure_announced. Every addition remains seed / machine_checked; no human verification is implied.

The increment manifest records additions and fingerprints of the original collections at its baseline commit. Tests compare the retained records with these fingerprints, including their review states. Existing review packs, the Daniela Amodei title disagreement, and unrelated capital-audit work are preserved.

## Corridors and evidence limits

The selection strengthens OpenAI/Anthropic research and governance continuity, Google Brain/DeepMind career paths, OpenAI/SSI, and xAI's predecessor-institution paths. Existing acquisition, unit and combination claims keep DeepMind, Google Brain and Google DeepMind distinct. Career chronology creates no corporate-descent, transfer, friendship or influence claim.

Sources include dated organisation announcements, the first version of the Scaling Laws paper (author-affiliation layout inspected), professional biographies and a CV (month-level role table inspected). Reuters reporting supplies SSI founding attribution and existing Ars reporting supplies xAI launch-team membership where historical primary material was unavailable. Source roles remain explicit. Mutable pages do not independently authenticate historical versions.

## Ambiguities for review

- Exact departure days are often absent. The July 2025 SSI announcement and its stated June 29 separation date remain distinct; announcement time is not the effective date.
- Kingma's combined Google Brain / DeepMind 2018–2024 entry does not allocate dates between separate institutions. The Google Brain role remains undated.
- Schulman's Anthropic and Thinking Machines roles, Leike's undated biography, Levy's stale Stanford biography and Ba's academic title do not establish current employment or exact appointment dates.
- McCandlish's 2024 CTO and 2025 Chief Architect snapshots do not establish the precise transition date. Kaplan's Responsible Scaling Officer assignment is prospective as announced, not proof of implementation.
- Founding member and co-founder wording is preserved; neither establishes legal incorporation status. Retrospective Anthropic co-founder attributions here do not supply a founding date.
- Kaplan's paper lists both Johns Hopkins and OpenAI affiliations. Author affiliation is not proof of an employment contract or exclusive affiliation.
- Internship, research, board, advisory and executive roles must not be collapsed. Biographical year ranges retain their original precision.
- The existing Daniela Amodei title disagreement remains unresolved in its original review pack; inclusion here does not adjudicate it.
- Public organisational names identify the documented referents; no unverified legal-entity equivalence is asserted.

## Recorded external machine audits

The working pack now preserves the two audits supplied on 2026-09-21: Claude reports 76 YES, one EDIT and eight RESEARCH MORE; Grok (qa-pass-20260921p) reports 85 YES, with individual notes only for 01–09 and grouped approval for 10–85. Attribution is supplied by the user. Source inspection and execution independence are auditor claims, not authenticated by this recording pass.

Claim 16 retains the Daniela Amodei title disagreement. Claims 42, 43, 62, 70, 73 and 76–78 retain Claude's source-verification gaps. Grok's grouped YES does not reconcile them. The audit-recording pass performed no fresh source reconciliation or factual edits and left application records, human fields and verification states unchanged. Subsequent reconciliation and authorized changes are documented below. These audits cover the 85-claim people pack only; the separate lineage audits are recorded in its own working pack.

## Review reproduction

The original annotated pack is historical. The [authorized corrections](../review/approved-corrections-2026-09-25.md) retain Levy's Research intern title with newly linked, specifically human-reviewed résumé evidence and accept Babuschkin's first-person attribution after an explicit YES and source inspection. Other passages and claims are not promoted by those decisions.

Check the preserved generated body with `pnpm exec vitest run src/editorial/people-review.test.ts`. The test reconstructs the historical dataset from the correction ledger. Do not regenerate the full people order from current data: it now includes an accepted claim, which the seed generator deliberately refuses. Use a separate seed-only selection and new output path for current working material.

The generator gives a mechanical chronological listing for each person, sorting unknown dates last. Partial dates cannot establish an order within their uncertainty. Each claim retains wording, qualifications, evidence, locator and source link, with empty human fields. It refuses to overwrite any differing existing pack. Previous packs are historical working documents, not regeneration targets for this increment.

## Later product work

The structural default map suppresses people; discovery currently depends on People, search or focus. Expanded people neighbourhoods can be dense and layout positions remain non-analytical. Preserve every individual claim; later focus, progressive disclosure, filtering and label priority should address density. No production UI redesign is included.

See [positioning](project-positioning.md), [future person profiles](person-profiles.md) and the eight [intellectual leads, now assessed in the lineage increment](../research/intellectual-lineage-leads.md). Leads remain outside application data.
