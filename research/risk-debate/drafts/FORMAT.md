# Draft format

Each source group writes one `drafts/<group>.json`. `tools.mjs merge` joins the drafts into `pack.json`; corrections are made in the drafts, never in `pack.json`. All identifiers are lower-case kebab-case.

```jsonc
{
  "group": "goals-and-drives", // the group's name
  "preparedAt": "2026-10-29",
  "propositions": ["R01", "R02", "R10"], // the codes this group is responsible for
  "sources": [
    {
      "key": "bostrom-2012-superintelligent-will", // pack source key; the same as the document id where one source per document
      "cacheKey": "bostrom-2012-superintelligent-will", // key used with tools.mjs fetch (quotes are checked against it)
      "datasetSource": null, // existing data/sources.json id if this is the same expression
      "documentId": "bostrom-2012-superintelligent-will",
      "title": "The Superintelligent Will: Motivation and Instrumental Rationality in Advanced Artificial Agents",
      "authors": ["Nick Bostrom"],
      "publisher": "Author's site (nickbostrom.com); published in Minds and Machines 22(2), 2012",
      "url": "https://nickbostrom.com/superintelligentwill.pdf", // the address retrieved
      "httpStatus": 200,
      "sha256": "…", // from .local/risk-debate/doc/<cacheKey>.json
      "retrievedAt": "2026-10-29",
      "language": "en",
      "documentWords": {
        "count": 7497,
        "basis": "pdftotext words of the whole PDF, counted 2026-10-29",
      },
      "version": "which expression this is (author's preprint PDF; arXiv v1; current page with an update note of …)",
      "kind": "paper | book | post | message | webpage | statement | transcript | testimony | report | letter",
    },
  ],
  "documents": [
    {
      "id": "bostrom-2012-superintelligent-will", // author family name, year, short slug; an existing dataset entity id where one exists
      "existingEntity": false, // true if the id is already in data/entities.json
      "title": "…",
      "shortName": "Bostrom, The Superintelligent Will (2012)",
      "subtype": "Paper | Book excerpt | Blog post | Essay | Signed statement | Open letter | Testimony | Lecture transcript | Interview transcript | Forum thread",
      "authors": ["Nick Bostrom"], // as printed; signatories of a statement are not listed here
      "date": "2012-05", // the date the work is dated by, at the precision the source gives
      "dateBasis": "publication | posting | signature | delivery | submission",
      "dateNote": "which source gives the date",
    },
  ],
  "records": [
    {
      "id": "rd-r01-bostrom-2012-superintelligent-will", // rd-<code>-<document id>[-contests | -context]
      "proposition": "R01",
      "document": "bostrom-2012-superintelligent-will",
      "predicate": "articulates_proposition", // or contests_proposition | bears_on_proposition
      "statement": "One neutral sentence saying what the text states, attributed to its author(s) and dated: “Bostrom's paper of 2012 states that …”.",
      "time": {
        "kind": "event",
        "date": "2012-05",
        "basis": "publication",
        "note": null,
      },
      "attested": null, // { "date": "…", "note": "…" } where the quoted wording is known only from a later copy
      "claimed": null, // { "date": "…", "note": "…" } an earlier date (talk, draft) that does not date the wording
      "roles": ["earliest-located"], // earliest-located | earliest-located-term | articulation | most-developed | contesting | context | later-restatement
      "term": null, // for earliest-located-term: the usual name the passage uses
      "register": "nonfiction", // nonfiction | fiction | satirical | relay (a report of another author's argument)
      "engagement": null, // contests only: { "kind": "engages-premise | contrary-only", "rationale": "one sentence naming the premise" }
      "missing": null, // bears_on only: the element of the criterion the passage lacks
      "comparative": null, // R08/R09 only: misuse-greater | misalignment-greater | neither
      "qualification": "What the record does not show (a statement of the author's argument, not evidence that it is true; the scope the passage limits itself to).",
      "datasetLink": null, // dataset claim id(s) on an overlapping concept that this record sits beside
      "evidence": [
        {
          "source": "bostrom-2012-superintelligent-will",
          "locator": "Section 1.2, PDF p. 3",
          "passage": "verbatim quote ≤ 50 words, or a paraphrase",
          "passageType": "quote", // quote | paraphrase
          "sourceRole": "primary", // primary | secondary
          "support": "supports", // supports | context
          "note": null,
        },
      ],
    },
  ],
  "replies": [
    // Published exchanges: a text that explicitly answers another named text or author. Becomes a candidate `cites` claim.
    {
      "id": "rd-reply-<from>-to-<to>",
      "from": "zador-lecun-2019-dont-fear-the-terminator",
      "to": "…", // pack document id or dataset entity id
      "debate": "lecun-russell-bengio-2019", // debate id, shared by every reply in one exchange
      "statement": "X's post of <date> replies to Y's <text>, which it names.",
      "qualification": "A reply is not agreement; it records that the text addresses the other.",
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
  "debates": [
    {
      "id": "lecun-russell-bengio-2019",
      "title": "Facebook thread on instrumental convergence, October 2019",
      "date": "2019-10",
      "participants": [
        "Yann LeCun",
        "Stuart Russell",
        "Yoshua Bengio",
        "Anthony Zador",
      ],
      "documents": ["…"], // pack or dataset document ids
      "note": "where the exchange is recorded, and in what copy",
    },
  ],
  "searchLog": [
    {
      "proposition": "R01",
      "searched": "what was searched: seed texts read, arXiv queries (terms, sort, first N results), sites, web searches used for discovery",
      "earliestNote": "why the earliest located text is earliest among the texts found, and what earlier texts in the dataset (before 2000 or on an overlapping concept) it sits beside",
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
}
```

## Rules

- **One record per text, proposition and stance.** Several passages of one text on the same proposition and stance are several evidence items of one record.
- **Statements are neutral.** Say what the text states, attributed and dated ("LeCun's essay of 2019 states that …"). No labels for people or groups ("doomer", "accelerationist", "sceptic", "safety community", "AI ethics camp"), unless quoting the author's own self-description, attributed. No evaluative verbs ("admits", "claims", "concedes", "debunks", "warns", "dismisses", "rightly"): use "states", "argues", "writes", "holds". No priority words ("first", "coined", "pioneering", "seminal", "landmark").
- **A stance is what the text states, with its date.** Never infer a person's view from proximity, affiliation, signature on another text or a later text. A signed statement records what the statement says; signatories are not each recorded as holding it.
- **Earliest located** means the earliest text found by the group's recorded search that meets the criterion; record the search in `searchLog`. One articulation per proposition holds `earliest-located`; at most one contesting record holds it among contesting records. Never write "first".
- **Primary texts only as evidence.** Books, papers, posts, statements, letters, testimony and transcripts published by the speaker or the host. Press reports of what someone said are not evidence for a record; use them for discovery only, and list the omission. Wikipedia never.
- **Quotations** at most 50 words, verbatim from the cached expression, checked with `tools.mjs check`. From a source of under 2,000 words, quote at most about 10% of it. From a longer one, at most 400 words or 5% (never more than 800) across all records. Paraphrases are labelled `passageType: "paraphrase"`.
- **Version and date.** Record which expression was read. A talk or interview dated by its delivery but read in a later transcript carries the delivery date as `claimed` unless the transcript is the host's dated record of the event. A post edited later carries the edit as a note.
- **Overlapping concepts.** Do not re-record a text that the dataset already records on an overlapping concept (see `dataset-overlap.json`); name it in `datasetLink` of a related record or in `searchLog`.
