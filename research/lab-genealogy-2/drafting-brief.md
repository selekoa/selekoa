# Drafting brief: lab genealogy 2, 2023–2026

The specification given to each fresh-context drafting pass. It extends the first pack's [drafting brief](../lab-genealogy/drafting-brief.md), whose rules, draft format and "conventions added after the editorial consistency pass" all apply; read that file in full first. This file says only what differs.

## Task

Draft candidate records for one group into `research/lab-genealogy-2/drafts/<group>.json`, for the years 2023–2026, within [scope.md](scope.md). Nothing in `data/` or the application is changed. Do not commit; the coordinator merges and commits.

Read first: `AGENTS.md`, `docs/editorial-policy.md` (sections "Atomic claims and sources", "Short quotation", "Interpretation"), [scope.md](scope.md), the first pack's [drafting brief](../lab-genealogy/drafting-brief.md).

## Do not duplicate

- `.local/lab-genealogy-2/existing-claims.txt`: every personnel, founding, organisational and funding-adjacent record in the dataset (`id | subject predicate object | time | role | statement`). Search it (`grep -i`) for every person and organisation before drafting. If the proposition is there, do not draft it; list the existing ID in `existingUsed`. A new record on the same person and organisation at a different date, with a different role, or with a stronger primary source for a proposition the dataset holds only from reporting, is allowed; for the last case set `duplicateCheck` to one sentence on the difference.
- `.local/lab-genealogy-2/existing-entities.txt`: reuse entity IDs exactly (`{ "id": "...", "existing": true }`).
- `.local/lab-genealogy-2/people-pack-claims.txt`: records drafted by the parallel people pack (parent-company executives; some Poolside, Magic, Imbue, 01.AI and Anthropic-board people). Do not draft those roles. If a record of yours concerns one of those people, add `"relatedCandidate": "<people-pack record id>"`.

## IDs

Claim IDs `lg2-<group>-<slug>`, evidence `lg2-ev-<group>-<slug>`, sources `lg2-src-<slug>`, cache keys `<group>-<slug>`. New entity IDs: lowercase slugs, checked against the entity inventory first.

## Funding rounds

Use the dataset's capital predicates, `topic: "capital"`:

```json
{
  "id": "lg2-nl-reflection-round-2025-10",
  "subject": "reflection-ai",
  "predicate": "announced_funding",
  "object": { "kind": "literal", "value": 2000000000, "unit": "USD" },
  "topic": "capital",
  "time": {
    "kind": "event",
    "date": "2025-10-09",
    "note": "Announcement date; not a closing date unless the source says closed."
  },
  "attributes": {
    "transactionType": "funding_round",
    "transactionStage": "announced",
    "relationshipContext": "external",
    "amount": {
      "value": 2000000000,
      "currency": "USD",
      "bound": "exact",
      "scope": "round_total"
    },
    "period": "round name as worded, if any"
  }
}
```

- `announced_funding`: the round total, exactly as stated (`bound`: `exact`, `approximate`, `more_than`, `up_to`…; currency as stated; EUR stays EUR). `transactionStage`: `announced`, or `closed` only where the source says the round closed or was completed.
- `participated_in_round`: one record per named investor (investor → company), no `amount`; `attributes.period` names the round; where the source says the investor led, say "led" in the statement and `attributes.role` ("lead investor"). Never attribute the round total, or a share of it, to one investor unless the source states that investor's own amount (then `scope: "transaction"`).
- `investment_announced`: a single named investor's announced investment outside a round (for example Meta in Scale AI), stage `announced`.
- Valuations are not recorded.

## Moves

- A move between labs is two records where the sources support both: the departure (`departure_announced`, event at the announcement date, `attributes.role` the role left) and the new role (`held_role`, snapshot at the announcement date, `attributes.stage: "announced"` if prospective). Never infer one from the other.
- A departure stays announced (`attributes.stage: "announced"` and the qualification says so) until a source states it as effective ("today is my last day", "has left", "no longer").
- Never infer the reason. Never extend a role to the present.

## Deals

`licensing_hiring_agreement` (subject: the licensee and hirer; object: the company) only where a party, a regulator or reporting describes both a licence and hiring. An acquisition only where a party says acquisition (`acquired`). Investments separately as capital records. Who was hired: separate `held_role` records for named people.

## Retrieval

As in the first brief, with the tools of this pack:

```sh
node research/lab-genealogy-2/tools.mjs fetch <cacheKey> <url> [direct|relay|x|auto]
node research/lab-genealogy-2/tools.mjs text <cacheKey> [from] [len]
node research/lab-genealogy-2/tools.mjs grep <cacheKey> '<regex>'
node research/lab-genealogy-2/tools.mjs check research/lab-genealogy-2/drafts/<group>.json
```

Run fetches one at a time (the tool paces per host; several passes run at once). Use web search only to discover addresses; never quote a search snippet. The Internet Archive is unreachable; record pages that refused you in `retrievalFailures` with the address, so the cross-family checker can open an archive copy.

## Draft additions

Besides the first brief's fields, each draft has:

- `omitted`: `[{ "item": "...", "reason": "..." }]` for people, moves, rounds or deals considered and left out (out of scope, already in the dataset, no retrievable source, identity doubt, private matter).
- `retrievalFailures`: `[{ "url": "...", "what": "...", "result": "HTTP 403 / block page / empty shell" }]`.

Run `check` until it reports no problems. Finish with a short report: claims drafted, sources, retrieval failures, doubtful identities, omissions.
