# Draft format

Each source group writes one `drafts/<group>.json`. `build.mjs merge` joins the drafts into `pack.json`. Corrections are made in the drafts, never in `pack.json`. All identifiers are lower-case kebab-case. The shape follows the frameworks-to-law drafts, with persons in place of instruments.

```jsonc
{
  "group": "executives", // executives | chinese-heads | existing-roles | authors
  "preparedAt": "2026-10-29",
  "sources": [
    {
      "key": "alphabet-def14a-2026", // pack source key
      "cacheKey": "alphabet-def14a-2026", // key used with tools.mjs fetch (quotes are checked against it)
      "datasetSource": null, // existing data/sources.json id if this is the same expression
      "title": "…",
      "publisher": "Alphabet Inc. (filed with the US Securities and Exchange Commission)",
      "url": "https://…", // the address retrieved
      "httpStatus": 200,
      "sha256": "…", // from .local/people/doc/<cacheKey>.json
      "retrievedAt": "2026-10-29",
      "publicationDate": "2026-04-24", // as the source states it; null if unknown
      "language": "en",
      "documentWords": { "count": 52000, "basis": "how it was counted" },
      "version": "which expression this is (e.g. definitive proxy statement as filed)",
      "kind": "filing | announcement | webpage | report | post | profile | cv | paper",
    },
  ],
  "documents": [
    // only for new candidate documents (signed statements); dataset documents are referenced by id
    {
      "id": "pichai-2018-ai-principles",
      "title": "AI at Google: our principles",
      "subtype": "Blog post",
      "publisherId": "google",
      "publishedAt": "2018-06-07",
      "language": "en",
      "source": "pichai-2018-ai-principles", // pack source key
    },
  ],
  "persons": [
    {
      "id": "sundar-pichai",
      "existing": false, // true: an existing data/entities.json person (only new aliases or roles proposed)
      "name": "Sundar Pichai", // as printed most often
      "sortName": "Pichai, Sundar",
      "subtype": "Executive", // Researcher | Executive | Board member | Investor | Writer | Public official
      "aliases": [], // only forms a source links
      "description": "One sentence saying only what the records show.",
      "identity": [
        // for authors: the second source that identifies the person as the document's author
        {
          "source": "…",
          "locator": "…",
          "passage": "verbatim ≤ 50 words",
          "passageType": "quote",
          "note": "what the page is and how it links the person to the document",
        },
      ],
    },
  ],
  "printedNames": [
    // authors not proposed as persons
    { "form": "Jinze Bai", "document": "qwen-report", "reason": "…" },
  ],
  "claims": [
    {
      "id": "pp-pichai-alphabet-ceo-2019", // prefix pp- for every pack claim
      "group": "executives",
      "subject": "sundar-pichai",
      "predicate": "held_role", // held_role | authored | co_founded | departure_announced | …; proposedPredicate: true if none fits
      "proposedPredicate": false,
      "object": { "kind": "entity", "entityId": "alphabet" },
      "statement": "One sentence, one falsifiable proposition, scoped to what the source says.",
      "time": {
        // event { date, basis } | snapshot { date } | interval { from, until } | unknown
        "kind": "interval",
        "from": "2019-12-03",
        "note": "which source gives each boundary; what is not established",
      },
      "derivation": "explicit", // or "inferred" with "inferenceRationale"
      "resolution": "supported",
      "qualification": "What the record does not show.",
      "extends": null, // dataset claim id this record adds to, if any
      "attributes": { "role": "Chief Executive Officer" },
      "evidence": [
        {
          "source": "alphabet-8k-2019-12-03",
          "locator": "Item 5.02, first paragraph",
          "passage": "verbatim quote ≤ 50 words, or a paraphrase",
          "passageType": "quote", // quote | paraphrase
          "translation": null, // working English translation for non-English quotes, marked as Selekoa's
          "sourceRole": "primary",
          "support": "supports", // supports | contradicts | context
          "note": "…",
        },
      ],
    },
  ],
  "omissions": [{ "item": "…", "reason": "…" }],
  "retrievalFailures": [
    { "url": "…", "result": "HTTP 403 / …", "fallback": "…" },
  ],
  "openQuestions": [{ "question": "…", "recommended": "…" }],
}
```
