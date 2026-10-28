# Draft format

Each source group writes one `drafts/<group>.json`. `tools.mjs merge` joins the drafts into `pack.json`. All identifiers are lower-case kebab-case.

```jsonc
{
  "group": "us-federal",
  "preparedAt": "2026-10-27",
  "sources": [
    {
      "key": "eo-14110-fr", // pack source key
      "cacheKey": "eo-14110-fr", // key used with tools.mjs fetch (text checked against it)
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
      "id": "fl-us-eo14110-signed", // prefix fl- for every pack claim
      "group": "us-federal",
      "jurisdiction": "US federal",
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
      "attributes": {}, // e.g. { "commitment": { "stage": "listed", "scope": "…" } } or { "provision": { "kind": "definition | threshold | required_action | date | enforcement | exception | names_framework" } }
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
