# Personnel and institutional continuity

This increment adds 12 entities, 30 claims, 14 sources and 30 evidence records. It is a bounded historical corridor, not an employee directory. All additions are explicit, supported seeds with machine-checked evidence; source support is not independent verification or human acceptance.

## Corridors

- OpenAI / Anthropic: documented prior OpenAI roles and Anthropic co-founding credits for Dario Amodei, Daniela Amodei, Chris Olah, Jack Clark and Tom Brown. Dario's public departure announcement is separate from his role snapshot. The graph contains no inferred OpenAI-to-Anthropic transition edge.
- OpenAI / other labs / xAI: Musk's OpenAI board departure and xAI public launch; Igor Babuschkin's accounts of prior OpenAI and DeepMind work and xAI co-founding; Greg Yang's prior Microsoft Research role; Babuschkin and Yang on the July 2023 launch roster. These are individual relationships, not institutional succession.
- DeepMind / Brain / Google DeepMind: three DeepMind co-founder credits, Google's 2014 acquisition, Brain as an internal Google Research team, Andrew Ng's sourced 2011–2012 founding-lead interval and the distinct 2023 leadership remits of Demis Hassabis and Jeff Dean. Existing 2023 combination claims remain intact.

## Evidence and time

Contemporaneous announcements anchor departure and leadership snapshots. The 2024 Anthropic conference deck supplies individually attributed co-founding credits and prior-role titles. Its page 6 is a retrospective company presentation, not an incorporation record or proof of a complete founding roster. Source roles are relative to claims: Amazon's 2024 biography is secondary evidence for Ng's earlier Google Brain role; the xAI launch roster uses contemporaneous reporting because a stable original roster was not obtained.

Personal biographies support precisely attributed prior work where stronger dated evidence was unavailable. Their publication dates and employment boundaries remain unknown. Babuschkin's page was identity-checked against the personal website linked from his established GitHub profile, including its domain redirect. These mutable pages are less stable than dated releases and merit particular attention during human review.

The event date of an announcement is not a person's last working day. The July 2023 xAI public launch is not its incorporation date. A source's publication or access date does not become a role boundary. Only Ng's explicitly sourced 2011–2012 period is encoded as an interval; snapshots and undated prior roles retain their different meanings.

The year filter accumulates records, including ended roles. It does not calculate active employment. Undated claims remain visible and sort last in the timeline; the interface states this explicitly.

## Unresolved and deliberately omitted

- Exact start/end dates for the undated OpenAI, DeepMind and Microsoft Research roles; Dario's exact last working day.
- A dated, versioned primary record for Babuschkin's individual xAI co-founding and the complete launch roster. His undated account does not license an inferred founding date.
- A reconciled definition of Anthropic's complete founder roster across company materials. The conference panel's individual credits are recorded without claiming roster completeness.
- DeepMind's exact acquisition closing date and the legal-entity mechanics of the 2023 combination. Research-team identity, acquisition and organisational combination are represented separately.

No ideological labels, generic influence edges, inferred transitions or supporting community institutions were added.

## Review

The original 28-claim review file is preserved, including all YES decisions and both machine audits. All original claim and evidence records are unchanged. The personnel pack now preserves 29 working YES decisions and one pending EDIT on daniela-openai-safety-prior, ordered as historical roles, co-founding, departure/launch announcements and institutional changes. Both machine-audit title positions remain recorded. The underlying claims and machine-check status are unchanged.

```sh
pnpm review:seed --order review/personnel-continuity-order.json --title "personnel continuity review" --output review/personnel-continuity-review.md
```

The working pack is no longer blank. Preserve it and use another output path for regeneration; do not run the blank-pack check against the edited historical copy. These documents never import decisions automatically or promote evidence verification.
