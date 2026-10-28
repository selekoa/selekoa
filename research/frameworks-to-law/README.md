# Frameworks to law, 2023–2026

The legal layer of the Frontier AI governance spine: a documentary history of how frontier AI developers' voluntary safety frameworks met binding and quasi-binding obligations between 2023 and 2026. Record by record, it says who committed to what and when, and what each instrument requires of developers of frontier or general-purpose models, in each document's own words and versions.

It is a candidate research pack outside application data. It was machine-prepared and audited by the same model family (Claude); nothing in it is editorially accepted or human-reviewed, and the cross-family check has not been run. It changes nothing in `data/`, the application, the schema or any release. It extends the research question "frameworks to obligations" (`/question/frameworks-to-obligations`) and the commitments page (`/commitments/external-commitments`) without re-recording what the dataset holds.

## Files

- [scope.md](scope.md): what is in and out, the unit of record and the rules (written first).
- [pack.md](pack.md): the readable pack. Counts, a **timeline** across jurisdictions, then one section per jurisdiction and document: issue and status, versions and changes, who signed or declined, what the text states, and documents that name the instrument. Omissions, retrieval failures, open questions and the source table close it. Generated from `pack.json`.
- [pack.json](pack.json): candidate documents (document versions with their dates by kind), entities, sources (address, HTTP status, SHA-256, retrieval date, word count) and claims in the dataset's shape, each with evidence (passage, locator, source role, support). `timeline` holds the dated events.
- [timeline-dataset.json](timeline-dataset.json): dated events already in the dataset (instruments and framework editions), shown in the timeline for orientation and marked ◇. Made by [dataset-timeline.mjs](dataset-timeline.mjs).
- [verification.json](verification.json): the mechanical check of every quotation and of the quotation budget per source.
- [audit.md](audit.md), [audit-sample.json](audit-sample.json), [audit/](audit/): the same-family audit (random and targeted sample of 64 records) and how each finding was handled.
- [cross-family-input-2026-10-28.md](cross-family-input-2026-10-28.md) and [cross-family-verdicts-2026-10-28.json](cross-family-verdicts-2026-10-28.json): the blind brief for a cross-family check (120 items), with the pack's answers in a separate file. Not yet run.
- [drafts/](drafts/): the four source-group drafts the pack is merged from (international and UK; EU and China; US; framework links back) and their [format](drafts/FORMAT.md). Corrections are made in the drafts, never in `pack.json`.
- [tools.mjs](tools.mjs), [build.mjs](build.mjs): retrieval, search, quote checking, merge, render and brief.

## Method

1. **Scope first.** [scope.md](scope.md) was written and pushed before research began, from the dataset's existing records and the gaps named on the research-question page.
2. **Drafting by source group.** Three fresh-context passes drafted international and UK, EU and China, and US records to a written brief and format. Each retrieved its sources by direct HTTP through `tools.mjs fetch`, checked its own quotations with `tools.mjs check`, and listed omissions, retrieval failures and open questions. The integrator drafted the links back from the 22 framework editions in the dataset (21 retrieved; same SHA-256 as on 2026-10-15 except where noted).
3. **Integration.** The integrator merged the drafts, checked identifiers against the dataset, verified three unexpected US sources against their retrieved copies, and reworked records that broke the editorial policy before the audit (listed in [audit.md](audit.md#integrators-changes-before-the-audit)).
4. **Mechanical verification.** Every quotation matched against the retrieved text of its own source; limits of 50 words per quotation (100 characters for Chinese) and the policy's per-source budget, counting the dataset's existing quotations from the same expression; locators and required fields. 206 quotations, no problems at the last run.
5. **Same-family audit.** Two fresh-context auditors checked 64 records (30 random, 34 targeted) against the sources and tried to refute them. 19 were corrected, none dropped; checks were then widened to the affected record families. See [audit.md](audit.md).
6. **Cross-family brief.** A blind brief of 120 items for one run by a reviewer from a different model family: every status event, listing, refusal, framework link, proposed predicate and inferred record, plus a seeded sample of the provision records. No record is admitted before that check, under the editorial policy.

## How to read a record

- A record states what one document says, dated by the kind of date its source gives: introduction, passage, signature, adoption, publication, entry into force, date of application, effective date, announcement, listing, veto or revocation. A month stays a month; an unknown date stays unknown.
- **Announced stays announced.** An agreement known only from a press release is dated by the announcement.
- **A commitment is never compliance.** Signatures, listings, endorsements and a framework's reference to a text record what a document states.
- **A provision is what the text requires** of the categories it defines; whether a named developer falls within them is not recorded.
- **Absence** from a list is recorded only against that list on that date; a "not found" record is bounded by the scope and search terms in its rationale.
- **Proposed predicates.** Where the dataset has no fitting predicate (revocation, veto, passage, introduction, participant lists, renaming, announced agreements), the record is marked `proposedPredicate` and the schema is unchanged. See the open questions.
- Records that extend a dataset record name it in `extends`.

## Limits and retrieval

- **Bounded selection.** Selected provisions per instrument, chosen for who is covered, duties of frontier or general-purpose model developers, dates, enforcement and any reference to frameworks or codes. Omissions are listed with reasons in `pack.md`; an omission is not a judgement of importance.
- **Internet Archive.** Capture pages refused connections from this environment throughout. Capture addresses come from the Archive's availability service and are marked unchecked; no current copy has been compared with a capture. A current copy does not authenticate earlier bytes.
- **Mutable government pages.** A White House fact sheet of 29 September 2026 describes an executive order directing executive-branch agencies to use "Super Intelligence" and "SI" in place of "Artificial Intelligence" and "AI" in non-statutory documents. NIST and BIS pages served on 2026-10-27 show the changed terms in some passages. Quotations were taken from unaffected passages, but a page served after that date may not be the text as first released; the quoted NIST and BIS passages should be checked against near-release captures.
- **EU.** EUR-Lex returned HTTP 202 with an empty body on every attempt; the AI Act text was retrieved from the Publications Office repository (Cellar) and matches the dataset's word count. The Commission's digital-strategy pages refused (HTTP 403), so the signatory list by chapter, the second and third Code drafts and the AI Board's assessment are not recorded. The first Code draft is the Dutch Senate's copy.
- **US.** congress.gov, leginfo (California), commerce.gov and the New York Senate site refused; the New York Open Legislation API needs a key; ilga.gov failed certificate verification. SB 1047's votes rest on the author's office's releases; the Illinois AI Safety Measures Act rests on a later executive order of the Governor.
- **UK.** Hansard refused; no government statement on the Paris statement is recorded. Word counts of GOV.UK pages are approximate (page text less site chrome).
- **China.** cac.gov.cn and npc.gov.cn refused; texts are from gov.cn copies, which were not compared word for word with the CAC's own postings. The two national standards are recorded from their catalogue entries only. TC260's framework, the AI Industry Alliance commitments and Chinese developers' frameworks are in another pack and are not duplicated.
- **Links back.** Only the 22 framework editions in the dataset were read for references, plus Anthropic's SB 53 announcement. xAI's June 2026 framework returned HTTP 404 and Meta's v1.1 HTTP 400 on 2026-10-27; their existing dataset links stand on earlier checks. Developers' separate compliance documents (for example Anthropic's Frontier Compliance Framework, on a script-rendered portal) were not read.
- **Same model family.** All drafting, integration and audit passes were one model family. Agreement among them is not independent corroboration.

## Reproduction

From the repository root:

```sh
node research/frameworks-to-law/tools.mjs fetch <cacheKey> <url>     # one source at a time; FL_UA overrides the user agent
node research/frameworks-to-law/tools.mjs grep <cacheKey> "<regex>"
node research/frameworks-to-law/tools.mjs check research/frameworks-to-law/drafts/<group>.json
node research/frameworks-to-law/dataset-timeline.mjs                  # -> timeline-dataset.json
node research/frameworks-to-law/tools.mjs merge                       # drafts -> pack.json
node research/frameworks-to-law/tools.mjs verify                      # -> verification.json
node research/frameworks-to-law/tools.mjs render                      # -> pack.md
node research/frameworks-to-law/tools.mjs brief 2026-10-28            # -> cross-family input and verdicts
npx prettier --write research/frameworks-to-law/
```

The cache lives in the ignored `.local/frameworks-to-law/` folder. A fresh checkout must re-fetch each source from the address in `pack.json` under its `cacheKey`; compare SHA-256 values, since current responses may differ.
