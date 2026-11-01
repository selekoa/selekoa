# Draft format

Each source group writes one `drafts/<group>.json`. `tools.mjs merge` joins the drafts into `pack.json`. All identifiers are lower-case kebab-case. Claim IDs start `th-`. Corrections are made in the drafts, never in `pack.json`.

```jsonc
{
  "group": "symbolic-search-logic",
  "preparedAt": "2026-10-29",
  "sources": [
    {
      "key": "dechter-1986-aaai", // pack source key
      "cacheKey": "dechter-1986-aaai", // key used with tools.mjs fetch (quotes are checked against it)
      "datasetSource": null, // existing data/sources.json id if this is the same expression
      "documentId": "th-dechter-1986", // pack document id, dataset entity id or key-papers id
      "title": "…",
      "authorsAsPrinted": ["Rina Dechter"],
      "publisher": "AAAI (proceedings host)",
      "url": "https://…", // the address retrieved
      "httpStatus": 200,
      "sha256": "…", // from .local/technical-history/doc/<cacheKey>.json
      "retrievedAt": "2026-10-29",
      "language": "en",
      "documentWords": { "count": 4858, "basis": "PDF text layer" },
      "version": "which expression this is (proceedings PDF as hosted by AAAI; author's copy; later reprint …)",
      "kind": "paper | book | thesis | report | message | post | announcement | webpage",
      "archive": {
        "capture": "http://web.archive.org/web/…",
        "via": "availability API",
        "checked": false,
      }, // or null
    },
  ],
  "documents": [
    {
      "id": "th-dechter-1986", // th- prefix for new documents; reuse dataset or key-papers ids
      "existing": "new | dataset | key-papers",
      "title": "Learning While Searching in Constraint-Satisfaction-Problems",
      "subtype": "Research paper | Journal article | Book | Book chapter | Technical report | Research proposal | Thesis | Announcement | Blog post | Lecture or talk | Newsgroup message | Web page",
      "authorsAsPrinted": ["Rina Dechter"],
      "publisherId": null, // existing organisation id where the publisher is one, else null
      "timeline": true, // whether its dates belong in the technical timeline
      "dates": [
        // only dates a source states; each with its kind and precision
        {
          "kind": "publication | presentation | submission | announcement | release | event | claimed",
          "date": "1986", // YYYY, YYYY-MM or YYYY-MM-DD as stated
          "label": "AAAI-86 proceedings",
          "source": "dechter-1986-aaai",
          "locator": "PDF p. 1, header",
          "passage": "≤ 50 words verbatim, or a paraphrase",
          "passageType": "quote | paraphrase",
          "sourceRole": "primary | secondary",
          "note": null,
        },
      ],
      "families": ["th-fam-search-planning"], // families the document is recorded under, if any
      "note": null,
    },
  ],
  "entities": [
    // candidate concepts (families and terms) and persons; reused dataset entities with "existing": true
    {
      "id": "th-fam-symbolic-ai",
      "type": "concept | person",
      "existing": false,
      "name": "Symbolic AI and expert systems",
      "sortName": null, // persons only: "Family, Given"
      "terms": [
        "physical symbol system",
        "expert system",
        "knowledge-based system",
      ], // concepts: the usual names searched for
      "criterion": "One sentence: what a passage must do to name (and, for definitions, to describe) this family or term in the required sense.",
      "search": {
        // concepts only: "How we searched", stated once
        "venues": "…",
        "years": "…",
        "methods": "…",
        "gaps": "…",
        "failures": "…",
      },
      "corrections": [
        // headlines displaced by an earlier find, with reason and date
      ],
      "note": "…",
    },
  ],
  "claims": [
    {
      "id": "th-term-dl-dechter-1986",
      "group": "connectionism-deep-learning",
      "section": "families | timeline | terms | persons",
      "subject": "th-dechter-1986",
      "predicate": "uses_term", // existing predicate, or a proposed one (then proposedPredicate: true)
      "proposedPredicate": true,
      "object": { "kind": "entity", "entityId": "th-term-deep-learning" }, // or { "kind": "literal", "value": "…" }
      "statement": "One sentence, one falsifiable proposition, scoped to what the source says.",
      "time": {
        "kind": "event",
        "date": "1986",
        "basis": "publication | presentation | submission | announcement | release",
        "note": null,
      },
      "derivation": "explicit", // or "inferred" with "inferenceRationale"
      "resolution": "supported",
      "qualification": "What the record does not show (no coinage, no influence, the sense …).",
      "extends": null, // dataset claim id this record adds to, if any
      "attributes": {
        // uses_term: { "term": { "string": "deep learning", "sense": "meets | other-sense", "roles": ["earliest-located-term" | "use" | "other-sense"], "register": "nonfiction", "attested": null, "claimed": null } }
        // discusses: { "technical": { "kind": "definition" } }
        // explicitly_credits / credits_work: { "credit": { "contribution": "…", "attribution": "According to …", "concept": "th-fam-… or th-term-… the credit concerns" } }
        // states_provision: { "provision": { "kind": "statement" } }
      },
      "evidence": [
        {
          "source": "dechter-1986-aaai",
          "locator": "PDF p. 3, section 3",
          "passage": "verbatim quote ≤ 50 words, or a paraphrase",
          "passageType": "quote", // quote | paraphrase
          "sourceRole": "primary", // primary | secondary
          "support": "supports", // supports | contradicts | context
          "note": null,
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

## Rules for drafters

- Retrieve with `node research/technical-history/tools.mjs fetch <cacheKey> <url>`, one source at a time; search with `grep`; read pages with `page`; check your draft with `check research/technical-history/drafts/<group>.json` until it reports no problems. Copy `sha256` and `httpStatus` from `.local/technical-history/doc/<cacheKey>.json`.
- A quotation is verbatim from the retrieved text (the checker normalises quotes, dashes, hyphenation and whitespace). Mark omissions inside a quote with `…`. If the text layer is garbled, paraphrase and say so in the evidence note.
- `earliest-located-term` is held by exactly one record per concept: the earliest-dated use in the required sense among the texts your search found. Every other naming record is `use` or `other-sense`. State the search in the concept's `search` block. Never write first, coined, introduced, invented, originated, pioneered, landmark or breakthrough except inside a quotation or an attributed statement.
- A retrospective account (a memoir, a history, an interview) is secondary for the event it reports: label it, and use it as an attributed statement, not as the date of the event, unless nothing else dates it (then the date kind is `claimed`).
- Wikipedia and similar summaries are discovery aids only. Never cite them as a source.
