# Drafting brief: Chinese frontier-AI institutions, second collection

The specification given to each fresh-context drafting pass. Kept as the method record; the merged pack is `pack.json`. Read [scope.md](scope.md) first.

## Task

Draft candidate records for one group into `research/china-labs-2/drafts/<group>.json`. Nothing in `data/`, `src/` or the application is changed. Do not commit; the coordinator merges and commits.

Read first: `AGENTS.md` (privacy and evidence rules), `docs/editorial-policy.md` (sections "Atomic claims and sources", "Short quotation", "Interpretation"), [scope.md](scope.md). Existing records you must reuse, not duplicate: `.local/china-labs-2/existing-claims.txt` (claim ID | subject predicate object | date | statement) and `.local/china-labs-2/existing-entities.txt` (ID | type | name | description).

## What to record, per developer

In this order of priority, within a budget of about 15–30 claims per developer:

1. **Model releases**: the developer's own announcement, technical report or repository for named models, with dates. Record `published` from the developer to a document entity (the report, announcement or model card). Prefer fixed expressions: arXiv `vN`, a Git commit, a Hugging Face commit. Use the date of the cited version and say what it is (`basis: publication`); an arXiv submission date is the date of that version, not the model's release date. If the developer's announcement gives a different release date, record that separately or in the time note.
2. **Licences**: the developer's own statement of the licence for named weights or code at a pinned version (README, LICENSE file, model card at a commit). Record as `published` from the developer to a licence-document entity (`documentKind: "licence"`), and quote the operative words. A modified licence is described as the text describes itself; add no judgement of whether it is "open source".
3. **Published safety and governance statements** by the developer: frameworks, commitments, safety reports, a safety unit's announcement. What the document states, never implementation.
4. **Backers and parents as documented**: a filing's list of investors, a parent's statement that a team is part of it. `investment_announced` or `participated_in_round` only with the source's wording and stage; never a round total attributed to one investor. A prospectus is the closest source for many of these.
5. **Authorship and affiliation**: `authored` only for named people the developer credits in a report's author list where the person already has a role record or is a founder or lead (no staff directories); affiliation of the report to the developer.
6. **Founding and founders**: only where the existing genealogy records (see `existing-claims.txt`) lack them. Reuse existing records by listing them in `existingUsed`.

For the governance group: who published which version of a framework or commitment, when (`published` or `enacted`; `supersedes_document` where the publisher says a version replaces another); a bounded selection of provisions (`states_provision`, at most about 6 per edition, quoted from the cited edition); listed signatories (`signed_commitment` with `attributes.commitment.stage` = `listed` when the evidence is a published list, dated by the list's publication, never as a signature date); and any developer document that explicitly links itself to a commitment (`references_commitment`, quote from the linking document).

## Rules

1. **One claim, one proposition**, each with evidence from a source you retrieved with the tool below and read. Never write a quote from memory or a search snippet: copy it from `tools.mjs text`/`grep` output.
2. **Closest primary source first**: the developer's paper, repository, announcement or filing; a public body's own text. Reputable reporting (Caixin, 36Kr, LatePost, Jiemian, The Paper, Reuters, Bloomberg, FT and similar) only when no primary text can be retrieved: then `sourceClass: "reporting"`, `sourceRole: "secondary"`, and the qualification says it rests on reporting. **Wikipedia, Baidu Baike, Wikidata, Crunchbase, LinkedIn and similar summaries are never evidence** (discovery only).
3. **Chinese originals.** Chinese sources keep `language: "zh-Hans"` (or `zh-Hant`), the original title in `originalTitle` and an English `title`. Quote the Chinese original verbatim. Every evidence item whose passage or anchor contains Chinese carries `"translation": { "text": "<English rendering>", "method": "machine", "humanVerified": false }`. Never claim human translation verification. Where a term is ambiguous (开源, 承诺, 出资), say in the qualification how it is rendered and narrowed.
4. **Versions.** Every source carries `version`: `{ "kind": "arxiv" | "git-commit" | "hf-commit" | "filing" | "pdf" | "mutable-page", "id": "<arXiv v1 / full commit hash / filing ref / file name>", "note": "<what this version is>" }`. Mutable pages (`mutable-page`) are read as they stood on retrieval; say so in the time note when a date depends on them. Pin GitHub files by commit: find the commit with `git ls-remote https://github.com/<org>/<repo>` and fetch `https://raw.githubusercontent.com/<org>/<repo>/<commit>/<path>`; for a historical version, a shallow clone with history in a scratch directory outside the repository (`git clone --filter=blob:none --no-checkout`) and `git log --format='%H %cs' -- <path>`. Hugging Face: `https://huggingface.co/api/models/<org>/<model>/commits/main` lists commits; fetch `https://huggingface.co/<org>/<model>/raw/<commit>/README.md`. github.com web pages and the GitHub API are refused from this environment; raw.githubusercontent.com and git work. web.archive.org refuses connections (HTTP 403): cite no capture.
5. **Record what a document says or that an event happened, never why.** No motives, no loaded words (poached, rival, state-backed, national champion, breakthrough, state-of-the-art, regime, propaganda), no ideological labels. Never infer state direction, influence or affiliation from funding, location, alliance membership or co-signature. "Chinese AI" is never an actor. Never write "first", "pioneered" or "coined"; where order matters write "earliest located in this pack's searches" and only with that scope. Performance and benchmark claims are out of scope.
6. **Living people: public professional roles and public authorship only.** No e-mail addresses, even inside quoted author blocks; no private life, wealth or compensation.
7. **Dates keep precision and kind.** `time.kind`: `event` (with `basis`: publication, announcement, revision, signature, effective, filing), `snapshot` (a state shown on a dated document), `interval` (bounds exactly as stated), `unknown`. Always a `note`. Unknown stays unknown.
8. **Announced is not realised.** A planned release, an agreed investment or an announced commitment stays at that stage (`attributes.stage` where relevant).
9. **Quotation limits.** Each quote at most 50 words (each Chinese character counts as one word); prefer 8–30. Per source: about 10% of a document under 2,000 words; otherwise 400 words or 5%, whichever is larger, at most 800. Short posts: `passageType: "paraphrase"` with a neutral English paraphrase in `passage` and a short verbatim `anchor` inside the limit.
10. **Reuse.** Reuse existing entity IDs exactly (`{ "id": "moonshot-ai", "existing": true }`). Do not duplicate an existing claim; list it in `existingUsed`. Where `data/sources.json` already holds the same document, set `datasetSourceId`.

## Retrieval

```sh
node research/china-labs-2/tools.mjs fetch <cacheKey> <url> [direct|relay|auto]
node research/china-labs-2/tools.mjs text <cacheKey> [from] [len]
node research/china-labs-2/tools.mjs grep <cacheKey> '<regex>'
node research/china-labs-2/tools.mjs words <cacheKey>
node research/china-labs-2/tools.mjs check research/china-labs-2/drafts/<group>.json
```

Prefer arXiv PDFs (`https://arxiv.org/pdf/<id>v1`) for author lists and affiliations, and abstract pages (`https://arxiv.org/abs/<id>v1`) for submission dates. Run fetches sequentially; the tool paces requests per host. Cache keys: `<group>-<short-slug>`, lowercase. Check that the retrieved text is the document, not a block page or empty JavaScript shell; if so, try `relay`, then record the retrieval failure and look for another expression.

## Draft format

```json
{
  "group": "moonshot",
  "searched": "One paragraph: what was searched (queries, sites, years), what could not be retrieved and why.",
  "existingUsed": ["lg-cn-moonshot-founded-2023"],
  "entities": [
    { "id": "moonshot-ai", "existing": true },
    {
      "id": "kimi-k2-report",
      "type": "document",
      "documentKind": "technical-report",
      "name": "Kimi K2: Open Agentic Intelligence",
      "subtype": "Technical report",
      "aliases": [],
      "description": "One neutral sentence: what the document is and which version is cited.",
      "sourceIds": ["c2-src-kimi-k2-arxiv-v1"]
    }
  ],
  "sources": [
    {
      "id": "c2-src-kimi-k2-arxiv-v1",
      "cacheKey": "moonshot-k2-arxiv-v1",
      "title": "Kimi K2: Open Agentic Intelligence",
      "originalTitle": null,
      "authors": ["Kimi Team"],
      "publisher": "arXiv",
      "publicationDate": "2025-07-28",
      "kind": "paper",
      "url": "https://arxiv.org/pdf/2507.20534v1",
      "route": "direct",
      "language": "en",
      "sourceClass": "primary",
      "version": {
        "kind": "arxiv",
        "id": "2507.20534v1",
        "note": "Version 1 as submitted; later versions not inspected."
      }
    }
  ],
  "claims": [
    {
      "id": "c2-moonshot-k2-report",
      "subject": "moonshot-ai",
      "predicate": "published",
      "object": { "kind": "entity", "entityId": "kimi-k2-report" },
      "topic": "ideas",
      "statement": "Moonshot AI's Kimi Team posted the Kimi K2 technical report to arXiv on 28 July 2025 (version 1).",
      "time": {
        "kind": "event",
        "date": "2025-07-28",
        "basis": "publication",
        "note": "Submission date of arXiv version 1; not the model's release date."
      },
      "derivation": "explicit",
      "resolution": "supported",
      "qualification": "What the record does not establish (performance, the release date of weights, sole authorship).",
      "evidence": [
        {
          "id": "c2-ev-moonshot-k2-report",
          "sourceId": "c2-src-kimi-k2-arxiv-v1",
          "sourceRole": "primary",
          "support": "supports",
          "locator": "Title page",
          "passageType": "quote",
          "passage": "verbatim text",
          "translation": null
        }
      ]
    }
  ]
}
```

IDs: claims `c2-<group>-<slug>`, evidence `c2-ev-<group>-<slug>`, sources `c2-src-<slug>`, new entities plain kebab-case not clashing with `existing-entities.txt`. Topics: `ideas` for reports and model releases, `governance` for licences, safety statements, frameworks and commitments, `institutions` for parents and units, `capital` for investments, `people` for roles and founding credits.

Run `check` until it reports no problems. Finish with a short report: claims drafted, sources, retrieval failures, doubtful identities, what was left out and why.
