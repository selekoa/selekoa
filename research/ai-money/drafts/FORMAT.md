# Draft format

Each source group writes one `drafts/<group>.json`. `tools.mjs merge` joins the drafts into `pack.json`; corrections are made in the drafts, never in `pack.json`. All identifiers are lower-case kebab-case.

```jsonc
{
  "group": "bis-basel", // the group's name
  "preparedAt": "2026-11-02",
  "propositions": ["U01", "U02"], // the codes this group searched (any U code may be recorded)
  "sources": [
    {
      "key": "bis-2024-aer-ch3", // pack source key; the same as the document id where one source per document
      "cacheKey": "bis-2024-aer-ch3", // key used with tools.mjs fetch (quotes are checked against it)
      "documentId": "bis-2024-aer-ch3",
      "title": "Artificial intelligence and the economy: implications for central banks",
      "publisher": "Bank for International Settlements",
      "url": "https://www.bis.org/publ/arpdf/ar2024e3.htm", // the address retrieved; strip query strings
      "httpStatus": 200,
      "sha256": "…", // from .local/ai-money/doc/<cacheKey>.json
      "retrievedAt": "2026-11-02",
      "language": "en",
      "documentWords": {
        "count": 16733,
        "basis": "words of the cached page text, counted 2026-11-02",
      },
      "version": "which expression this is (BIS HTML chapter as served on 2026-11-02; PDF of the speech as delivered; …)",
      "kind": "report | speech | paper | bulletin | consultation | guidance | statement | webpage | strategy | transcript | testimony",
    },
  ],
  "documents": [
    {
      "id": "bis-2024-aer-ch3", // institution short code, year, short slug
      "title": "…",
      "shortName": "BIS, Annual Economic Report 2024, chapter III",
      "subtype": "Annual report chapter | Report | Speech | Remarks | Testimony | Working paper | Bulletin | Consultation paper | Guidance | Supervisory statement | Strategy | Project page | Press release",
      "institution": "Bank for International Settlements", // the publishing body, as named in the text
      "voice": "institution", // institution | official | staff | committee (see scope.md; committee added at integration)
      "authors": [], // persons as printed: the speaker of a speech, the authors of a staff paper; [] for an institutional text
      "speakerRole": null, // official voice only: the office as the text gives it ("Member of the Executive Board of the ECB")
      "occasion": null, // speeches: the event as the text gives it
      "disclaimer": null, // where the text has one: { "source": "<source key>", "locator": "…", "passage": "verbatim, ≤ 50 words" }
      "date": "2024-06-23", // the date the work is dated by, at the precision the source gives
      "dateBasis": "publication | delivery | signature | posting | submission",
      "dateNote": "which source gives the date",
    },
  ],
  "records": [
    {
      "id": "am-u01-bis-2024-aer-ch3", // am-<code lower-case>-<document id>[-contests | -context]
      "proposition": "U01",
      "document": "bis-2024-aer-ch3",
      "predicate": "articulates_proposition", // or contests_proposition | bears_on_proposition
      "statement": "One neutral sentence saying what the text states, attributed by voice and dated: “The BIS Annual Economic Report 2024 (chapter III) states that …” / “In a speech of 12 March 2025, Governor X of the Federal Reserve Board said that …”.",
      "time": {
        "kind": "event",
        "date": "2024-06-23",
        "basis": "publication",
        "note": null,
      },
      "attested": null, // { "date": "…", "note": "…" } where the quoted wording is known only from a later copy
      "claimed": null, // { "date": "…", "note": "…" } an earlier date that does not date the wording
      "roles": ["articulation"], // earliest-located | articulation | most-developed | contesting | context | later-restatement | earliest-located-term
      "term": null, // for earliest-located-term: the usual name the passage uses
      "register": "nonfiction", // nonfiction | relay (a report of another body's or person's view)
      "engagement": null, // contests only: { "kind": "engages-premise | contrary-only", "rationale": "one sentence naming the premise" }
      "missing": null, // bears_on only: the element of the criterion the passage lacks
      "qualification": "What the record does not show: a statement of what the text says, not evidence that the risk has materialised or that the institution has adopted a policy; the scope the passage limits itself to.",
      "evidence": [
        {
          "source": "bis-2024-aer-ch3",
          "locator": "Section 'AI and financial stability', paragraph 3 (HTML; PDF p. 102 where known)",
          "passage": "verbatim quote ≤ 50 words, or a paraphrase",
          "passageType": "quote", // quote | paraphrase
          "sourceRole": "primary",
          "support": "supports", // supports | context
          "note": null,
        },
      ],
    },
  ],
  "events": [
    // Institutional events an authority's own text states.
    {
      "id": "am-event-bisih-2023-project-aurora", // am-event-<institution>-<year>-<slug>
      "kind": "strategy-adopted | unit-established | project-launched | project-concluded | guidance-issued | other",
      "institution": "BIS Innovation Hub",
      "subject": "Project Aurora", // the project, unit, strategy or guidance
      "candidatePredicate": "launched", // unit_of | launched | published | announced_plan
      "stage": "announced", // announced (the text announces or plans it) | under-way (the text states the work as in progress at its date; decision 17a) | stated-done (the text states it happened)
      "statement": "The BIS Innovation Hub's project page states that Project Aurora …",
      "time": {
        "kind": "event",
        "date": "2023-05",
        "basis": "publication",
        "note": "the date of the text; the event's own date where the text gives it goes in eventDate",
      },
      "eventDate": null, // the date the text gives for the event itself, at its precision, or null
      "document": "bisih-project-aurora-page", // a document defined in this draft
      "qualification": "Announced stays announced; the record says what the text states, not that the project operates or achieved its aims.",
      "evidence": [
        {
          "source": "…",
          "locator": "…",
          "passage": "…",
          "passageType": "quote",
          "sourceRole": "primary",
          "support": "supports",
          "note": null,
        },
      ],
    },
  ],
  "searchLog": [
    {
      "proposition": "U01",
      "searched": "what was searched: publication searches (site, query, filters, date run), speech indexes, documents read",
      "earliestNote": "why the earliest located text is earliest among the texts this group found",
    },
  ],
  "omissions": [{ "item": "…", "reason": "…" }],
  "retrievalFailures": [
    {
      "url": "…",
      "result": "HTTP 403 / …",
      "fallback": "what was used instead, or none",
    },
  ],
  "openQuestions": [{ "question": "…", "recommended": "…" }],
  // Texts located outside the named bodies or not read (decisions 10a, 16a): never records.
  "leads": [{ "proposition": "U09", "item": "…", "reason": "…" }],
}
```

## Rules

- **One record per text, proposition and stance.** Several passages of one text on the same proposition and stance are several evidence items of one record.
- **Voice and attribution.** An `institution` text is the institution's. An `official` text (speech, remarks, testimony) is the speaker's, with the speaker's office as published; where the text says the views are the speaker's own, the disclaimer is recorded verbatim on the document, and the statement says "said in a speech" and never "the [institution] holds". A `staff` text is its authors', with the series and its disclaimer. Never write that an institution holds what an official or staff paper says, unless the institution's own text says so.
- **Statements are neutral.** "The FSB report of 2017 states that …"; "In a speech of 2018, Lael Brainard, then a member of the Board of Governors of the Federal Reserve System, said that …". Use "states", "writes", "said", "argues", "holds". No evaluative verbs ("admits", "claims", "concedes", "warns", "dismisses", "acknowledges", "highlights", "stresses"), no priority words ("first", "pioneering", "landmark"), no motives, no characterisation of any person or institution ("hawkish", "cautious", "leading", "prominent").
- **Earliest located** means the earliest text found by the group's recorded search that meets the criterion; record the search in `searchLog`. Within the group, one articulation per proposition holds `earliest-located`; the integrator reconciles across groups. Never write "first".
- **Primary texts only as evidence.** The authorities' own published texts. Press reports are leads only. Wikipedia never.
- **Quotations** at most 50 words, verbatim from the cached expression, checked with `tools.mjs check`. From a source under 2,000 words, at most about 10% of it; from a longer one, at most 400 words or 5% (never more than 800) across all records and the disclaimer.
- **Locators** give page (PDF page and printed page where they differ) and section heading, or for HTML the section heading and paragraph.
- **Dates** keep their kind (`delivery` for a speech, `publication` for a report) and precision. A speech published days after delivery is dated by delivery where the text states the delivery date. Never infer a date.
- **Announced stays announced.** An event is `announced` unless the text states the thing happened.
- **Do not stretch criteria.** If a text comes close, record `bears_on_proposition` with `missing`, or leave it out and say why in `omissions`.
