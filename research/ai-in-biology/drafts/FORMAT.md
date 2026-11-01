# Draft format

Each source group writes one `drafts/<group>.json`. `tools.mjs merge` joins the drafts into `pack.json`. Corrections are made in the drafts, never in `pack.json`. All identifiers are lower-case kebab-case.

```jsonc
{
  "group": "models",
  "preparedAt": "2026-10-30",
  "sources": [
    {
      "key": "af3-nature-2024", // pack source key
      "cacheKey": "af3-nature-2024", // key used with tools.mjs fetch (text checked against it)
      "datasetSource": null, // existing data/sources.json id if this is the same expression
      "documentId": "aib-doc-af3-2024", // pack document id (or existing dataset / sibling id)
      "title": "…",
      "publisher": "Nature",
      "url": "https://…", // the address retrieved
      "httpStatus": 200,
      "sha256": "…", // from .local/ai-in-biology/doc/<cacheKey>.json
      "retrievedAt": "2026-10-30",
      "language": "en",
      "documentWords": {
        "count": 21000,
        "basis": "how it was counted (body text only, not page chrome)",
      },
      "version": "which expression this is (e.g. Nature article page, version of record, as served on 2026-10-30)",
      "kind": "paper | preprint | press release | webpage | filing | prospectus | dataset | …",
      "archive": {
        "capture": "http://web.archive.org/web/…",
        "via": "availability API",
        "checked": false,
      },
    },
  ],
  "documents": [
    {
      "id": "aib-doc-af3-2024",
      "existingEntity": false, // true if in data/entities.json; "sibling:<pack>" if a sibling candidate
      "title": "Accurate structure prediction of biomolecular interactions with AlphaFold 3",
      "subtype": "Journal article" // Journal article | Preprint | Press release | Web page | Filing | Prospectus | Dataset release | Conference paper,
      "publisherId": null, // the issuing organisation for a press release or page; null for a journal article
      "authorsAsPrinted": ["Josh Abramson", "Jonas Adler", "…"], // names only, never addresses
      "family": "alphafold",
      "label": "journal, volume, pages, as published online (date)",
      "dates": {
        // only dates a source states; each with its kind
        "postedAt": null, // preprint posted (with version)
        "submittedAt": "YYYY-MM-DD", // received by the journal
        "acceptedAt": "YYYY-MM-DD",
        "publishedAt": "YYYY-MM-DD", // online publication
        "issueAt": "YYYY-MM-DD",
        "announcedAt": null, // press release or blog post
        "releasedAt": null, // a database, model weights or code release, as stated
        "servedAt": null, // a page that states no date of its own: the retrieval date (snapshot)
      },
      "dateNote": "which source gives each date",
      "language": "en",
    },
  ],
  "entities": [
    {
      "id": "…",
      "name": "…",
      "type": "organisation | person | model | concept | public_body | country", "subtype": "…", "sortName": "Family, Given (persons only)",
      "existing": false,
      "note": "…",
    },
  ],
  "claims": [
    {
      "id": "aib-mod-af3-published", // prefix aib-<group>- for every pack claim
      "group": "models",
      "strand": "Models and resources", // Institutions | Models and resources | People | Claims about AI and biology
      "subject": "aib-doc-af3-2024",
      "predicate": "states_provision", // existing predicate, or a proposed one (then set proposedPredicate: true)
      "proposedPredicate": false,
      "object": { "kind": "literal", "value": "short label of the stated contribution" }, // or { "kind": "entity", "entityId": "…" }
      "statement": "One sentence, one falsifiable proposition, scoped to what the source says, attributed (\"Abramson et al. (Nature, D Month YYYY) state that…\").",
      "time": {
        "kind": "event", // event | snapshot | interval | unknown
        "date": "YYYY-MM-DD",
        "basis": "publication", // publication | announcement | effective | revision | signature (event only; omit for a snapshot)
        "note": "…",
      },
      "derivation": "explicit", // or "inferred" with "inferenceRationale"
      "resolution": "supported", // supported | contested | unresolved
      "qualification": "What the record does not show (the authors' own report, not an independent result; no priority; …).",
      "extends": null, // dataset claim id this record adds to, if any
      "siblingLinks": [], // sibling candidate ids (documents, entities, claims) this record relates to
      "attributes": {}, // { "provision": { "kind": "statement" } } for what a document states; { "role": "Chief Executive Officer" } for held_role; { "activityStage": "announced" } for partnership_announced; { "transactionStage": "announced", "amount": { "value": 1, "currency": "USD", "bound": "exact | up_to | at_least", "scope": "round_total | milestone_up_to | upfront" } } for funding; { "thought": { "roles": ["earliest-located"], "register": "nonfiction" } } for a proposition record
      "hazardNote": null, // set where technical content in the source was excluded and only high-level passages cited
      "evidence": [
        {
          "source": "af3-nature-2024",
          "locator": "abstract",
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
  "notes": "free text for the integrator",
}
```

## Rules for this pack

- **Strands and groups.** `strand` is one of `Institutions`, `Models and resources`, `People`, `Claims about AI and biology`. The group is the drafting pass (`labs`, `companies`, `models`, `people`, `claims`); a group may write records in more than one strand, but keeps its own id prefix (`aib-labs-`, `aib-co-`, `aib-mod-`, `aib-ppl-`, `aib-arg-`).
- **Candidate ids.** New documents `aib-doc-…`, new organisations and other entities `aib-…` (for example `aib-isomorphic-labs`, `aib-david-baker`, `aib-model-esm3`). Reuse dataset ids exactly (`deepmind`, `google-deepmind`, `demis-hassabis`, `john-jumper`, `alphafold-paper`, `alphafold-account`, `protein-structure-prediction`, `nvidia`, `microsoft-research`, `microsoft`, `google`, `alphabet`). Before creating an entity, search `data/entities.json` and `sibling-ids.json` by substring. If two passes might both need the same entity (for example a person who is both an author and a company leader), the `entities` entries must be identical; the integrator reconciles.
- **Dates.** A document's dates go in `dates` by kind; a record's `time` carries the one date its proposition is dated by. A page that states no date is a `snapshot` at the retrieval date, with no basis. A role stated by a dated announcement is a `snapshot` at that date (as in the dataset's `held_role` records), not an interval. A founding stated as a year is a year.
- **Statements.** What a paper, page, press release or filing states is `states_provision` with `attributes.provision.kind: "statement"` and a literal object (a short label). The statement attributes it ("X states that…").
- **Funding and partnerships.** `announced_funding` for a round total (literal amount, `attributes.amount.scope: "round_total"`), `participated_in_round` for named participants without an amount, `investment_announced` for a named investor's announced investment; `partnership_announced` (proposed) for a stated collaboration, with `attributes.activityStage: "announced"` and the stated terms (upfront, milestones "up to") in the statement as stated.
- **Propositions.** A claim record points at a candidate proposition entity (`type: concept`, `subtype: Proposition`) with a `proposition` block holding `code` (`P1`, `P2`, …), `criterion` and `terms`, and carries `attributes.thought` with `roles` and `register`. Earliest located roles state their search in the top-level `howWeSearched` field of the draft, not in each record.
- **Hazard-safe register.** `tools.mjs hazards <draft.json>` screens every statement, qualification, note and passage for a laboratory or procedural register, and every statement and qualification for priority words outside quotation marks.
