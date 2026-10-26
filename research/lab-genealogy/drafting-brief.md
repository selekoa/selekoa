# Drafting brief: lab genealogy

The specification given to each fresh-context drafting pass. Kept as the method record; the merged pack is `pack.json`.

## Task

Draft candidate records for one group of frontier AI labs into `research/lab-genealogy/drafts/<group>.json`: the documented "who went where" history from 2010 to 2026. Founding events and founders first; then leadership and governance changes (CEOs, presidents, chief scientists, CTOs, heads of safety or alignment; board events; structural changes; licensing-and-hiring deals); then notable moves of individuals with a documented public role. Nothing in `data/` or the application is changed.

Read first: `AGENTS.md` (privacy and evidence rules), `docs/editorial-policy.md` (sections "Atomic claims and sources", "Short quotation", "Interpretation"). Existing records you must reuse, not duplicate: `.local/lab-genealogy/existing-claims.txt` (claim ID | subject predicate object | date | statement) and `.local/lab-genealogy/existing-entities.txt`.

## Rules

1. **One claim, one proposition**, each with evidence from a source you retrieved with the tool below and read. Never write a quote from memory or from a search snippet: copy it from `tools.mjs text`/`grep` output.
2. **Closest primary source first**: the company's own announcement, a filing, the organisation's official page or biography, or the person's own public statement (their post, blog, published note). Reputable reporting (Reuters, AP, Bloomberg, FT, NYT, WSJ, The Information, The Verge, TechCrunch, CNBC, Caixin, 36Kr, LatePost and similar) only when no primary source can be retrieved; then `sourceClass: "reporting"` and `sourceRole: "secondary"`, and say in the qualification that it is reporting. **Wikipedia, Wikidata, Crunchbase, LinkedIn, Baidu Baike, Grokipedia and other tertiary or profile summaries are never evidence** (use them only to discover primary sources).
3. **Record that a move or event happened, never why.** A reason, motive or circumstance enters only when the person or organisation states it in a primary source you cite; then the claim carries `statedReason` (who stated it, a neutral paraphrase, the evidence ID) and the statement attributes it ("X stated that …"). No inferred motives. Never use: poached, defected, exodus, lured, raid, talent war, ousted, rival, fled, clash, rift, coup, star, or ideological labels (doomer, accelerationist, EA). Write "joined", "left", "announced", "was appointed", "was removed as CEO by the board" only where the source says so.
4. **Living people: public professional roles only.** No private life, family, health, wealth, residence, compensation of individuals, legal disputes beyond an organisation's own governance documents.
5. **Dates keep their precision** and their kind. An announcement date is not a start or last working day. A biography's year range is an interval at year precision. Unknown stays unknown. Do not extrapolate a role to the present: a snapshot is the date of the document that shows it.
6. **Announced is not realised.** A join "will join", a deal "agreed", a restructuring "planned" stays announced (`attributes.stage: "announced"`).
7. **Quotation limits.** Each quote at most 50 words; prefer 8–30. Per source, total quoted words at most 400, and at most 10% of a document under 2,000 words. For a short post (for example a 40-word X post the limit is 4 words) use `passageType: "paraphrase"` with a neutral paraphrase in `passage` and a short verbatim `anchor` fragment (counts toward the limit) that the checker can find in the text. The anchor must be inside the limit.
8. **Founder rosters.** Record each founder as one `co_founded` claim per person, citing a source that names that person as founder or co-founder. Keep the source's wording ("co-founder", "founding member", "founding team"). A later retrospective credit is fine but is not a founding date: then `time.kind: "unknown"` unless a source gives the founding date for that person, or use the organisation-level `founding_stated` claim for the date.
9. **Identity.** Be sure the person is the person named (same name, same field). For Chinese names give the Chinese form in `aliases` and use the source's original-language wording in quotes when the source is Chinese (keep `language: "zh"` on the source).
10. **Reuse.** If an existing claim already records the same proposition, do not duplicate it; list it in `relatedExisting` of a neighbouring claim or in the draft's top-level `existingUsed` list. Reuse existing entity IDs exactly. A new entity gets minimal fields.
11. **Scope.** Frontier or prominent foundation-model labs and their founders, top executives and research or safety leads. Do not build a staff directory: a researcher who is not a founder, executive, team lead, board member or the subject of an announced move by the lab is out of scope.

## Retrieval

```sh
node research/lab-genealogy/tools.mjs fetch <cacheKey> <url> [direct|relay|x|auto]
node research/lab-genealogy/tools.mjs text <cacheKey> [from] [len]
node research/lab-genealogy/tools.mjs grep <cacheKey> '<regex>'
node research/lab-genealogy/tools.mjs words <cacheKey>
node research/lab-genealogy/tools.mjs check research/lab-genealogy/drafts/<group>.json
```

`auto` (default) tries the publisher directly and falls back to a reader relay (`r.jina.ai`) when the publisher refuses (openai.com, x.ai and some others refuse direct retrieval). `x` reads an X post through X's syndication endpoint (text only; notes posted as images cannot be machine-checked: do not quote them). The Internet Archive is unreachable from this environment; do not cite captures you did not retrieve. The tool paces requests per host; run fetches sequentially. Cache keys: `<group>-<short-slug>`, lowercase. Check that the retrieved text is the article (not a block page or empty shell) with `text`; if a relay result is a CAPTCHA or error, record the retrieval failure and look for another source.

## Draft format

```json
{
  "group": "openai",
  "searched": "One paragraph: what was searched (queries, sites, years), what could not be retrieved and why.",
  "existingUsed": ["existing-claim-id"],
  "entities": [
    { "id": "mira-murati", "existing": true },
    {
      "id": "karen-simonyan",
      "type": "person",
      "name": "Karén Simonyan",
      "sortName": "Simonyan, Karén",
      "subtype": "Institutional actor",
      "aliases": [],
      "description": "One neutral sentence naming the documented roles that bring the person into the pack.",
      "sourceIds": ["lg-src-ms-suleyman-2024"]
    }
  ],
  "sources": [
    {
      "id": "lg-src-ms-suleyman-2024",
      "cacheKey": "msft-suleyman-2024",
      "title": "Mustafa Suleyman, DeepMind and Inflection Co-founder, joins Microsoft to lead Copilot",
      "authors": ["Satya Nadella"],
      "publisher": "Microsoft",
      "publicationDate": "2024-03-19",
      "kind": "announcement",
      "url": "https://blogs.microsoft.com/blog/2024/03/19/...",
      "route": "direct",
      "language": "en",
      "sourceClass": "primary",
      "datasetSourceId": "only if data/sources.json already holds this same document"
    }
  ],
  "events": [
    {
      "id": "ev-2024-03-microsoft-ai",
      "date": "2024-03-19",
      "title": "Microsoft forms Microsoft AI; Suleyman and Simonyan join from Inflection",
      "labs": ["microsoft", "inflection-ai"]
    }
  ],
  "claims": [
    {
      "id": "lg-simonyan-microsoft-ai-chief-scientist-2024",
      "event": "ev-2024-03-microsoft-ai",
      "subject": "karen-simonyan",
      "predicate": "held_role",
      "object": { "kind": "entity", "entityId": "microsoft" },
      "topic": "people",
      "statement": "Microsoft announced on 19 March 2024 that Karén Simonyan was joining Microsoft AI as Chief Scientist.",
      "time": {
        "kind": "snapshot",
        "date": "2024-03-19",
        "note": "Announcement date; not a start date."
      },
      "attributes": {
        "role": "Chief Scientist, Microsoft AI",
        "stage": "announced"
      },
      "derivation": "explicit",
      "resolution": "supported",
      "qualification": "An announced appointment; the record does not establish a start date or a continuing role.",
      "relatedExisting": [],
      "evidence": [
        {
          "id": "lg-ev-simonyan-microsoft-ai-chief-scientist-2024",
          "sourceId": "lg-src-ms-suleyman-2024",
          "sourceRole": "primary",
          "support": "supports",
          "locator": "Paragraph 4",
          "passageType": "quote",
          "passage": "Karén is joining this group as Chief Scientist, reporting to Mustafa."
        }
      ]
    }
  ]
}
```

Fields:

- `predicate`: `held_role` (person → organisation; `attributes.role` = the title as worded; optional `attributes.stage` `announced` for a prospective appointment), `co_founded` (person → organisation), `departure_announced` (person → organisation; event date = announcement; `attributes.role` = the role left), `launched` (person → organisation, a public launch), `acquired`, `unit_of`, `combined_into`, `formed_entity`, `converted_into`, `name_transition_announced`, `separation_announced` (organisation → organisation), `has_legal_form` (organisation → literal), `holds_control_right` (organisation → organisation). Proposed by this pack: `founding_stated` (organisation → literal: the founding date or year as a source states it; `time.kind: "event"` with that date) and `licensing_hiring_agreement` (organisation → organisation: an announced agreement under which the subject licenses the object's technology and hires some of its staff; not an acquisition).
- `topic`: `people` for roles, founding and moves; `institutions` for founding dates, acquisitions, units; `governance` for boards, control and legal form; `capital` only where money is the proposition.
- `time.kind`: `event` (founding, launch, acquisition, departure announcement), `snapshot` (a role shown on a dated document), `interval` (`from`/`until` exactly as a source states; either may be absent), `unknown`. Always a `note`.
- `derivation`: `explicit`. Use `inferred` only with `inferenceRationale` (premises and reasoning); avoid it.
- `resolution`: `supported`; `contested` only when two sources disagree on the same proposition (keep both, one `contradicts`).
- `qualification`: what the record does not establish (start date, end, legal incorporation, completeness of a roster, current role, implementation).
- `statedReason` (optional): `{ "by": "<entity id>", "text": "neutral paraphrase of the stated reason", "evidenceId": "<evidence id of this claim>" }`.
- `locator`: paragraph, section heading, page or post; precise enough to find the passage.

Run `check` until it reports no problems. Commit nothing; the coordinator merges and commits. Finish with a short report: claims drafted, sources, retrieval failures, doubtful identities, anything left out and why.

## Conventions added after the editorial consistency pass

Applied to all drafts by the consistency pass and given to the gap-filling passes:

- One proposition per record. An appointment and a later step-down are two records (a role and a `departure_announced`).
- Statements read "<owner> announced on <D Month YYYY> that …" or "<document> lists …"; dates are written "19 March 2024"; a statement carries no detail its passages do not carry.
- A role read from an undated current page is a snapshot dated to the retrieval date, with the time note "Role as shown on the page when retrieved on <date>; the page is undated."
- A record resting on reporting says so in its qualification ("The record rests on reporting") and names what the report relays (a memo, a LinkedIn post, an X post).
- No expressions of feeling or praise in statements or paraphrases ("excited", "grateful", "visionary"); company boilerplate may remain inside a verbatim quote.
- No personal e-mail addresses, even inside quoted paper text.
- A reason a person gives for leaving that concerns their private life is left out entirely; only professional reasons stated by the person or organisation are attributed.
