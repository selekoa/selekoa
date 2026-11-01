# Draft format

Each strand writes one `drafts/<strand>.json`. `tools.mjs merge` joins the drafts into `pack.json`. All identifiers are lower-case kebab-case. Corrections are made in the drafts, never in `pack.json`.

```jsonc
{
  "group": "data-centres", // data-centres | power | chips | orbital
  "preparedAt": "2026-10-28",
  "sources": [
    {
      "key": "dc-stargate-milam-2025", // pack source key; prefix dc- | pw- | ch- | orb-
      "cacheKey": "dc-stargate-milam-2025", // key used with tools.mjs fetch (text checked against it)
      "datasetSource": null, // existing data/sources.json id if this is the same expression
      "title": "…",
      "publisher": "Oracle",
      "url": "https://…", // the address retrieved
      "httpStatus": 200,
      "sha256": "…", // from .local/compute-power-orbit/doc/<cacheKey>.json
      "retrievedAt": "2026-10-28",
      "language": "en",
      "documentWords": { "count": 900, "basis": "how it was counted" },
      "publishedAt": "2025-09-23", // as the source states it; null if undated
      "version": "which expression this is (e.g. page as served on 2026-10-28; dateline 23 September 2025)",
      "kind": "announcement | filing | regulator record | government text | paper | report | webpage | press report",
      "sourceRole": "primary | secondary", // relative to the records it supports
      "archive": {
        "capture": "http://web.archive.org/web/…",
        "via": "availability API",
        "checked": false,
      },
    },
  ],
  "documents": [
    // Only documents that are themselves subjects or objects of records (laws, orders,
    // regulator decisions, papers that state arguments, filings). Announcements are sources.
    {
      "id": "us-eo-14318-2025",
      "existingEntity": false,
      "title": "…",
      "subtype": "Executive order | Regulator order | Paper | White paper | Filing | Policy plan | …",
      "publisherId": "us-white-house",
      "label": "As published in the Federal Register (28 July 2025)",
      "dates": { "signedAt": "2025-07-23", "publishedAt": "2025-07-28" },
      "dateNote": "which source gives each date",
      "language": "en",
    },
  ],
  "entities": [
    // Candidate organisations, public bodies, sites (type "infrastructure"), propositions
    // (type "concept", orbital strand only). Reuse data/entities.json ids where they exist.
    {
      "id": "stargate-milam-county",
      "name": "Stargate site, Milam County, Texas",
      "type": "organisation | public_body | infrastructure | concept",
      "subtype": "Data-centre site | Data-centre campus | Spacecraft | Constellation | Orbital-compute proposition | …",
      "existing": false,
      "note": "What the referent is and is not (e.g. a site, distinct from the venture announcing it).",
      // concepts only:
      "proposition": { "code": "OC1", "criterion": "…", "terms": ["…"] },
    },
  ],
  "claims": [
    {
      "id": "cpo-dc-stargate-milam-announced", // prefix cpo-<strand code>- for every claim
      "group": "data-centres",
      "strand": "Data-centre projects", // Data-centre projects | Power | Chip supply | Orbital compute
      "region": "US", // US | EU | UK | China | Gulf | Other | International | Orbit
      "topicKey": "stargate", // groups records under one heading in pack.md (project, deal or argument)
      "topicLabel": "Stargate sites", // heading text for that topicKey (same text on every record of the key)
      "subject": "openai",
      "predicate": "announced_site", // existing predicate, or a proposed one (then proposedPredicate: true)
      "proposedPredicate": true,
      "object": { "kind": "entity", "entityId": "stargate-milam-county" }, // or { "kind": "literal", "value": "…" }
      "statement": "One sentence, one falsifiable proposition, scoped to what the source says.",
      "timelineLabel": "Short event label for the timeline (optional)",
      "time": {
        "kind": "event", // event | snapshot | unknown
        "date": "2025-09-23",
        "basis": "announcement", // see Bases below
        "note": "…",
      },
      "derivation": "explicit", // or "inferred" with "inferenceRationale"
      "resolution": "supported", // supported | contested | unresolved
      "pressOnly": false, // true when the record rests only on press reporting
      "qualification": "What the record does not show (no construction, no operation, no power delivered, no payment …).",
      "extends": null, // dataset claim id this record adds to, if any
      "attributes": {
        // Use only what applies:
        "quantity": {
          "value": 1.2,
          "unit": "GW (as worded: 'over 1.2 GW of capacity')",
          "bound": "more_than",
          "measures": "IT capacity | facility power | grid connection | generation | chips | not stated",
        },
        "statedDates": [
          {
            "kind": "target_operation | construction_start_stated | operational_stated | delivery_target | launch_target",
            "date": "2026",
            "precision": "year",
            "statedBy": "openai",
          },
        ],
        "transactionType": "compute_capacity", // dataset enum where it fits
        "transactionStage": "announced", // dataset enum: announced | planned | committed | contracted | invested | closed | paid | purchased | delivered | deployed | operational | completed | undisclosed; or "letter_of_intent" (proposed)
        "amount": {
          "value": 0,
          "currency": "USD",
          "bound": "up_to",
          "scope": "transaction",
        },
        "power": {
          "technology": "nuclear | gas | solar | wind | geothermal | grid | mixed | not stated",
          "mechanism": "ppa | restart | smr_development | supply | interconnection | onsite_generation | other",
        },
        "supply": {
          "product": "GPUs | accelerators | systems | foundry | memory",
          "units": "as worded",
        },
        "provision": {
          "kind": "definition | threshold | required_action | date | eligibility | names_ai_compute",
        },
        "thought": { "roles": ["earliest-located"], "register": "nonfiction" }, // orbital argument records only
      },
      "evidence": [
        {
          "source": "dc-stargate-milam-2025",
          "locator": "paragraph 3 | PDF p. 4 | Sec. 2(b)",
          "passage": "verbatim quote ≤ 50 words, or a paraphrase starting 'Paraphrase:'",
          "passageType": "quote", // quote | paraphrase
          "translation": null, // Selekoa's working English translation for non-English quotes
          "sourceRole": "primary", // primary | secondary
          "support": "supports", // supports | contradicts | context
          "note": null,
        },
      ],
      "briefQuestion": "Optional: a neutral question for the blind cross-family brief that does not reveal the answer.",
    },
  ],
  "omissions": [{ "item": "…", "reason": "…" }],
  "retrievalFailures": [
    {
      "url": "…",
      "result": "HTTP 403 / connection reset / …",
      "fallback": "what was used instead, or none",
    },
  ],
  "openQuestions": [{ "question": "…", "recommended": "…" }],
}
```

## Bases (`time.basis`)

`announcement`, `publication`, `signature`, `filing`, `approval` (a regulator's or authority's decision), `adoption`, `issuance`, `effective`, `entry_into_force`, `revocation`, `operational_stated` (a party states something is operating, dated by the statement), `launch_stated` (an operator states a launch took place, dated by the launch it states), `completion_stated`. A snapshot (a web page as served on the check date) uses `kind: "snapshot"` and no basis.

## Shared proposed predicates

Use these names so the strands align; propose another only if none fits, and list it in `openQuestions`.

| Predicate              | Subject → object                         | Meaning                                                                                                                  |
| ---------------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `announced_site`       | organisation → infrastructure            | A party announces a data-centre site or campus. Not construction, operation or ownership.                                |
| `site_status_stated`   | infrastructure → literal                 | A party states a site's status on a date (construction began, partly operational, operational, paused, cancelled).       |
| `power_agreement`      | organisation → organisation              | A stated power purchase, supply, restart or development agreement for data centres; stage in `transactionStage`.         |
| `supply_agreement`     | organisation → organisation              | A stated chip, system or foundry supply or deployment agreement; stage in `transactionStage`.                            |
| `granted_equity_right` | organisation → organisation              | A party grants another a warrant or option over its shares, as stated.                                                   |
| `government_award`     | public_body → organisation               | A government states an award, grant, loan or equity stake to a company; stage as stated (preliminary, final, completed). |
| `announced_plan`       | organisation → literal or infrastructure | A party announces a plan (e.g. an orbital compute constellation). A plan is never an achievement.                        |
| `launch_stated`        | organisation → infrastructure            | An operator states that a spacecraft carrying compute was launched.                                                      |
| `filed_application`    | organisation → document                  | A party files an application with a regulator (e.g. a licence application); the filing is not a grant.                   |

Existing predicates to prefer where they fit: `compute_capacity`, `cloud_terms`, `plans_capacity`, `plans_infrastructure_spend`, `uses_infrastructure`, `uses_hardware_from`, `investment_announced`, `invested_in`, `published`, `enacted`, `states_provision` (a law, order or plan states a provision), `revoked`, `articulates_proposition`, `contests_proposition`, `bears_on_proposition` (subject a document, object a concept).
