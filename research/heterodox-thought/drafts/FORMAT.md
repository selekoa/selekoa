# Draft format

Each source group writes one `drafts/<group>.json`. `tools.mjs merge` joins the drafts into `pack.json`; corrections are made in the drafts, never in `pack.json`. All identifiers are lower-case kebab-case.

```jsonc
{
  "group": "de-garis", // the group's name
  "preparedAt": "2026-10-31",
  "propositions": ["W01", "W02", "W04", "W05"], // the codes this group searched (any W code may be recorded)
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
      "sha256": "…", // from .local/heterodox-thought/doc/<cacheKey>.json
      "retrievedAt": "2026-10-31",
      "language": "en",
      "documentWords": {
        "count": 7497,
        "basis": "pdftotext words of the whole PDF, counted 2026-10-31",
      },
      "version": "which expression this is (author's preprint PDF; arXiv v1; current page with an update note of …)",
      "kind": "paper | book | post | message | webpage | statement | transcript | report | letter | interview",
    },
  ],
  "documents": [
    {
      "id": "bostrom-2012-superintelligent-will", // author family name, year, short slug; an existing dataset entity id where one exists
      "existingEntity": false, // true if the id is already in data/entities.json
      "title": "…",
      "shortName": "Bostrom, The Superintelligent Will (2012)",
      "subtype": "Paper | Book | Book chapter | Book excerpt | Blog post | Essay | Manifesto | Lecture transcript | Interview transcript | Magazine article",
      "authors": ["Nick Bostrom"], // as printed; signatories of a statement are not listed here
      "date": "2012-05", // the date the work is dated by, at the precision the source gives
      "dateBasis": "publication | posting | signature | delivery | submission",
      "dateNote": "which source gives the date",
    },
  ],
  "records": [
    {
      "id": "ht-w01-bostrom-2012-superintelligent-will", // ht-<code lower-case>-<document id>[-contests | -context]
      "proposition": "W01",
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
      "hazardNote": null, // where the text has content excluded under the hazard rule: "Other content of this text was excluded." (no description of it)
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
  "links": [
    // Named predecessors: a later text that itself names an earlier text or author. Becomes a candidate `cites`
    // claim, or `explicitly_credits` where the later text credits the earlier one as a source of its own ideas.
    // Never from proximity, shared vocabulary, reputation or a secondary source's report of influence.
    {
      "id": "ht-link-<from>-names-<to>",
      "from": "srnicek-williams-2013-accelerate-manifesto", // pack document id or dataset entity id
      "to": "land-1994-meltdown", // pack document id or dataset entity id; or a person/text not in the pack, then set toExternal
      "toExternal": null, // { "name": "Karl Marx", "kind": "person | text" } where `to` is not a pack document or dataset entity
      "predicate": "cites", // cites | explicitly_credits
      "statement": "Srnicek and Williams's manifesto of 2013 names Nick Land and his texts on acceleration.",
      "qualification": "A naming records that the later text names the earlier; it is not agreement, influence or lineage beyond what the passage states.",
      "evidence": [
        {
          "source": "…",
          "locator": "…",
          "passage": "verbatim quote ≤ 50 words that contains the name",
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
      "proposition": "W01",
      "searched": "what was searched: seed texts read, arXiv queries (terms, sort, first N results), sites, web searches used for discovery",
      "earliestNote": "why the earliest located text is earliest among the texts found by this group, and what earlier texts in the dataset or other groups it sits beside",
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
- **Statements are neutral.** Say what the text states, attributed and dated ("LeCun's essay of 2019 states that …"). No labels for people, groups, texts or positions in our own words ("dark", "extreme", "fringe", "dangerous", "visionary", "accelerationist", "Cosmist", "reactionary", "prophet"), unless quoting the author's own self-description, attributed, in quotation marks. Never describe a political position in our own words. No evaluative verbs ("admits", "claims", "concedes", "debunks", "warns", "dismisses", "rightly"): use "states", "argues", "writes", "holds". No priority words ("first", "coined", "pioneering", "seminal", "landmark").
- **A stance is what the text states, with its date.** Never infer a person's view from proximity, affiliation, signature on another text or a later text. A signed statement records what the statement says; signatories are not each recorded as holding it.
- **Earliest located** means the earliest text found by the group's recorded search that meets the criterion; record the search in `searchLog`. One articulation per proposition holds `earliest-located`; at most one contesting record holds it among contesting records. Never write "first".
- **Primary texts only as evidence.** Books, papers, posts, statements, letters, testimony and transcripts published by the speaker or the host. Press reports of what someone said are not evidence for a record; use them for discovery only, and list the omission. Wikipedia never. Secondary accounts of "influence" are context for the search log, never a link.
- **Quotations** at most 50 words, verbatim from the cached expression, checked with `tools.mjs check`. From a source of under 2,000 words, quote at most about 10% of it. From a longer one, at most 400 words or 5% (never more than 800) across all records. Paraphrases are labelled `passageType: "paraphrase"`.
- **Version and date.** Record which expression was read. A talk or interview dated by its delivery but read in a later transcript carries the delivery date as `claimed` unless the transcript is the host's dated record of the event. A post edited later carries the edit as a note.
- **Overlapping concepts.** Do not re-record a text that the dataset already records on an overlapping concept (see `dataset-overlap.json`); name it in `datasetLink` of a related record or in `searchLog`.
- **Hazard.** Never quote a passage that advocates violence against people or groups. Where a text in scope contains such passages, record only its machine-intelligence propositions and set `hazardNote`. A text's prediction or description of a conflict (for example a forecast war) is not advocacy, but quote the proposition, not graphic detail.
- **Reprints and editions.** Date a record by the expression read. Where a reprint or later edition states the original publication date, record that as `claimed` (with the note naming which page states it) unless the wording is shown to be unchanged; never infer an original date. Write "earliest located", never "first".
- **Links (named predecessors).** Only where the later text itself names the earlier text or author, with a quotation containing the name. `explicitly_credits` only where the passage credits the earlier author as a source of the later text's ideas; otherwise `cites`.
