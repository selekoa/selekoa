# Draft format

Each source group writes one `drafts/<group>.json`. `tools.mjs merge` joins the drafts into `pack.json`. All identifiers are lower-case kebab-case.

```jsonc
{
  "group": "synthesis-screening",
  "preparedAt": "2026-10-28",
  "sources": [
    {
      "key": "ostp-framework-2024", // pack source key
      "cacheKey": "ostp-framework-2024", // key used with tools.mjs fetch (text checked against it)
      "datasetSource": null, // existing data/sources.json id if this is the same expression
      "documentId": "us-eo-14110-2023", // pack document id (or existing dataset entity id)
      "title": "…",
      "publisher": "Federal Register (National Archives)",
      "url": "https://…", // the address retrieved
      "httpStatus": 200,
      "sha256": "…", // from .local/frameworks-to-law/doc/<cacheKey>.json
      "retrievedAt": "2026-10-27",
      "language": "en",
      "documentWords": {
        "count": 21000,
        "basis": "how it was counted (body text only, not page chrome)",
      },
      "version": "which expression this is (e.g. Federal Register print of 1 November 2023)",
      "kind": "filing | report | announcement | webpage | dataset | …",
      "archive": {
        "capture": "http://web.archive.org/web/…",
        "via": "availability API",
        "checked": false,
      },
    },
  ],
  "documents": [
    {
      "id": "us-eo-14110-2023",
      "existingEntity": false, // true if the id is already in data/entities.json
      "title": "Executive Order 14110 …",
      "subtype": "Executive order",
      "publisherId": "us-white-house", // existing public_body / organisation id, or a candidate in "entities"
      "family": "us-eo-14110",
      "label": "As published in the Federal Register (1 November 2023)",
      "dates": {
        // only dates a source states; each with its kind
        "signedAt": "2023-10-30",
        "publishedAt": "2023-11-01",
        "effectiveAt": null,
        "revokedAt": "2025-01-20",
      },
      "dateNote": "which source gives each date",
      "language": "en",
    },
  ],
  "entities": [
    {
      "id": "…",
      "name": "…",
      "type": "public_body | organisation | country",
      "existing": false,
      "note": "…",
    },
  ],
  "claims": [
    {
      "id": "ab-screen-ostp-published", // prefix ab- for every pack claim
      "group": "synthesis-screening",
      "strand": "Synthesis screening", // Frameworks | Evaluations | Synthesis screening | Government measures | Arguments
      "subject": "us-white-house",
      "predicate": "enacted", // existing predicate, or a proposed one (then set proposedPredicate: true)
      "proposedPredicate": false,
      "object": { "kind": "entity", "entityId": "us-eo-14110-2023" }, // or { "kind": "literal", "value": "…" }
      "statement": "One sentence, one falsifiable proposition, scoped to what the source says.",
      "time": {
        "kind": "event",
        "date": "2023-10-30",
        "basis": "signature | publication | effective | application | entry_into_force | announcement | listing | veto | revocation",
        "note": "…",
      },
      "derivation": "explicit", // or "inferred" with "inferenceRationale"
      "resolution": "supported", // supported | contested | unresolved
      "qualification": "What the record does not show (no compliance, no application to a named company, …).",
      "extends": null, // dataset claim id this record adds to, if any
      "attributes": {}, // e.g. { "provision": { "kind": "definition | threshold | required_action | date | enforcement | exception | names_framework" } }, { "thought": { "roles": ["earliest-located"], "register": "nonfiction" } } for a proposition record, or { "evaluation": { "what": "…", "how": "…", "result": "…", "caveats": "…" } } for a stated evaluation result
      "hazardNote": null, // set where technical content in the source was excluded and only policy-level passages cited
      "evidence": [
        {
          "source": "eo-14110-fr",
          "locator": "Sec. 4.2(a)(i), p. 75 (Federal Register page)",
          "passage": "verbatim quote ≤ 50 words, or a paraphrase",
          "passageType": "quote", // quote | paraphrase
          "translation": null, // Selekoa's working English translation for non-English quotes
          "sourceRole": "primary", // primary | secondary
          "support": "supports", // supports | contradicts | context
          "note": "…",
        },
      ],
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

## Rules for this pack

- **Strands, not jurisdictions.** `strand` is one of `Frameworks`, `Evaluations`, `Synthesis screening`, `Government measures`, `Arguments`. The group is the drafting pass (`frameworks`, `evaluations`, `screening`, `measures`, `arguments`); a group may write records in more than one strand.
- **Hazard-safe register.** Record what a document states at the policy and evaluation level. Never quote or paraphrase technical content; where a source holds such content, cite only its policy-level passages and set `hazardNote` to say that technical content was excluded. `tools.mjs hazards <draft.json>` screens every statement, qualification, note and passage.
- **Evaluation results.** A record of a stated result carries `attributes.evaluation` with `what` (the stated object of measurement), `how` (the kind of method the report states), `result` (the report's own result wording) and `caveats` (the limits the report itself gives). The statement names the system version and the report; the qualification says that the result is the report's and is not generalised.
- **Propositions.** An argument record points at a candidate proposition entity (`type: concept`, `subtype: Proposition`) with a `proposition` block holding `code`, `criterion` and `terms`, and carries `attributes.thought` with `roles` and `register`. Earliest located roles state their search in the pack's "How we searched" note, not in each record.
