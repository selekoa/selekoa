# AI and biosecurity, 2010–2026

Backlog item C of the [roadmap](../../docs/roadmap.md), in the Frontier AI governance spine: how frontier AI frameworks treat biological risk, what published bio-uplift evaluations state, what the rules for screening synthetic nucleic acid orders require, what governments have done where a text addresses AI and biological risk together, and which arguments about AI-enabled biological risk have been published, for and against. Record by record, it says what each document states, in its own words and versions.

It is a candidate research pack outside application data. It was machine-prepared and audited by the same model family (Claude); nothing in it is editorially accepted or human-reviewed, and the cross-family check has not been run. It changes nothing in `data/`, the application, the schema or any release. It extends the frontier framework comparison and the frameworks-to-law records (v0.11.0) without re-recording what the dataset holds.

**Hazard-safe.** Every record stays at the policy and evaluation level: that an evaluation was run, by whom, on what, by what kind of method, with the result and caveats the report itself states; what a framework or rule requires. No record carries a method, protocol, agent, acquisition route or screening criterion, and where a source holds such content the record cites only its policy-level passages and its hazard note says that technical content was excluded. 76 of the 209 records carry such a note. The rule is in [scope.md](scope.md); `tools.mjs hazards` screens every statement, qualification, note and passage for a laboratory or procedural register, and the audit treats a breach as the most important finding.

## Files

- [scope.md](scope.md): what is in and out, the unit of record and the rules (written and pushed before research began).
- [pack.md](pack.md): the readable pack. Counts, a **timeline** across the five strands, then one section per strand and document. Omissions, retrieval failures, open questions and the source table close it. Generated from `pack.json`.
- [pack.json](pack.json): candidate documents, entities, sources (address, HTTP status, SHA-256, retrieval date, word count) and 209 claims in the dataset's shape, each with evidence (passage, locator, source role, support). `timeline` holds the dated events.
- [timeline-dataset.json](timeline-dataset.json): dated records already in the dataset that bear on AI and biological risk, shown in the timeline for orientation and marked ◇. Made by [dataset-timeline.mjs](dataset-timeline.mjs) from an explicit list.
- [verification.json](verification.json): the mechanical check of every quotation, the quotation budget per source, and the register screen.
- [audit.md](audit.md), [audit-sample.json](audit-sample.json), [audit/](audit/): the same-family audit (random and targeted sample of 72 records of the 207 then merged) and how each finding was handled. The draw is made by [sample.mjs](sample.mjs).
- [cross-family-input-2026-10-28.md](cross-family-input-2026-10-28.md) and [cross-family-verdicts-2026-10-28.json](cross-family-verdicts-2026-10-28.json): the blind brief for a cross-family check (120 items), with the pack's answers in a separate file. Not yet run.
- [drafts/](drafts/): the five source-group drafts the pack is merged from (frameworks, evaluations, screening, measures, arguments), their [format](drafts/FORMAT.md) and the [brief](drafts/BRIEF.md) they were written to. Corrections are made in the drafts, never in `pack.json`.
- [tools.mjs](tools.mjs), [build.mjs](build.mjs): retrieval, search, quote checking, the register screen, merge, render and brief.

## Method

1. **Scope first.** [scope.md](scope.md) was written and pushed before research began, from what the dataset already holds and the backlog item's four parts.
2. **Drafting by strand.** Five fresh-context passes drafted the frameworks, evaluations, screening, measures and arguments records to a written [brief](drafts/BRIEF.md) and format. Each retrieved its sources by direct HTTP through `tools.mjs fetch`, checked its own quotations and its own register with `tools.mjs check` and `tools.mjs hazards`, and listed omissions, retrieval failures and open questions. No pass saw another's draft.
3. **Integration.** The integrator merged the drafts and made three changes before the audit, and applied the audit's corrections in the drafts afterwards, listed in [audit.md](audit.md#integrators-changes-before-the-audit): two candidate entities defined twice were given one definition; 25 records dated by a published card expression were moved from the snapshot time kind to an event with a publication basis, and four records resting on a page served on the check date keep the snapshot kind without a date basis, as the dataset schema has it; the date basis `revision`, which the dataset uses for two framework editions, was added to the merge's accepted bases.
4. **Mechanical verification.** Every quotation matched against the retrieved text of its own source; limits of 50 words per quotation and the policy's per-source budget, counting the dataset's existing quotations from the same expression; locators and required fields; the register screen over every statement, qualification, note and passage. 248 quotations and 59 labelled paraphrases, no problems at the last run.
5. **Same-family audit.** Two fresh-context auditors checked 72 records (34 random, 38 targeted) against the sources and tried to refute them, with the hazard-safe rule as the first question. Neither found a breach of it. 35 findings were corrected and none dropped, one was declined, and the integrator widened three of them to the record families they belong to, which turned up a mutable source neither auditor had found and a support-role defect that would have failed seven records at validation. Two records were split, so the pack went from 207 to 209. See [audit.md](audit.md).
6. **Cross-family brief.** A blind brief of 120 items for one run by a reviewer from a different model family: every status and publication event, stated evaluation result, proposition record, edition comparison, recorded absence, participant list, proposed predicate, inferred record and snapshot, plus a seeded sample of the provision records. It also asks the checker to open the archive copies this environment could not reach. No record is admitted before that check, under the editorial policy.

## How to read a record

- A record states what one document says, dated by the kind of date its source gives: publication, effective, revision, introduction, enactment, supersession, or the retrieval date where a served page states none (then the record is a snapshot, not an event).
- **A stated result is the report's.** It carries the report's system version, date, setting, sample and comparison, and the caveats the report itself gives. It is never generalised to other systems, later dates or real-world risk, and no record says that a safeguard works. A null or negative result is not evidence that no uplift exists.
- **A provision is what the text requires** of the categories it defines; whether a named developer or provider falls within them is not recorded. A framework's stated safeguard is not compliance.
- **An argument is a proposition.** Each proposition carries one criterion; a record says that a text articulates, contests or bears on it, in the text's register, dated by the text. It is never evidence that the proposition is true. "Earliest located" means the earliest text the recorded search found; the search is stated in the pack's "How we searched" note.
- **Absence** is bounded by the expression read, the date and the search terms in the record's rationale.
- **Proposed predicate.** 24 records of a stated evaluation result use `states_evaluation_result`, which the schema does not have; they are marked `proposedPredicate` and the schema is unchanged. See the open questions.
- Records that extend a dataset record name it in `extends` (25 do).

## Limits and retrieval

- **Bounded selection.** Selected provisions per framework edition and instrument, selected results per report, selected texts per proposition. Omissions are listed with reasons in `pack.md` (47 of them); an omission is not a judgement of importance.
- **Over the aim.** The task asked for about 150 records; the five passes returned 207, and two audit splits made 209, each over its own aim. Nothing was pruned, because each pass's cuts would have removed a distinct passage rather than a restatement; the drafts name the records to drop first if the maintainer wants a smaller pack. See the open questions in the [report](../../review/ai-bio-pack-2026-10-28.md).
- **Internet Archive.** Capture pages refused connections from this environment throughout. Capture addresses come from the Archive's availability service where it answered and are marked unchecked; no current copy has been compared with a capture. A current copy does not authenticate earlier bytes. The cross-family brief asks the checker to open them.
- **Three framework editions carry no record.** Meta's Advanced AI Scaling Framework v2 (every `ai.meta.com` address returned HTTP 400), Meta's Frontier AI Framework v1.1 (the archive capture reset the connection) and xAI's June 2026 framework (HTTP 404; `x.ai` refused) could not be retrieved on 2026-10-28. Nothing is recorded from memory, and the dataset's existing records for those editions stand on earlier checks.
- **PDF text layers.** Seven retrieved PDFs have text layers that displace characters or interleave table columns, so passages from them are recorded as explicit paraphrases with locators, each saying so. A search that fails in those files is not evidence of absence, and no record relies on one.
- **Publishers that refused.** `openai.com` returned HTTP 403, while `cdn.openai.com` served the system cards; OpenAI's own biological-risk posts are not recorded. `congress.gov` returned 403, so bills rest on govinfo's BILLS and BILLSTATUS packages; no full-text bill search was reachable, so bills were found by testing candidate packages and keeping those whose official title matched. EUR-Lex returned HTTP 202 with an empty body, so the AI Act was retrieved from the Publications Office repository, as in the frameworks-to-law pack. The UN's digital library search also returned 202, so BWC documents were found by enumerating symbols. A guessed `gov.cn` path for China's July 2025 global AI governance action plan returned 404, so whether it names biological risk is unresolved. Three further publishers (NTI, a journal's reader page, a Europe PMC service) refused or failed.
- **Quotation headroom.** Two framework sources have almost no quotation budget left after the dataset's existing quotations (one word and four words), so three records rest on paraphrase for that reason alone. Retiring an existing dataset quotation would be a maintainer decision.
- **Dates that disagree.** Two documents carry two dates (a preprint's stamp against its front matter; a BWC working paper's own date against the meeting list), and one quoted framework text misdates an executive order. Each is recorded as the source has it, with the discrepancy in the qualification, and none is resolved.
- **Same model family.** All drafting, integration and audit passes were one model family. Agreement among them is not independent corroboration.

## Reproduction

From the repository root:

```sh
node research/ai-bio/tools.mjs fetch <cacheKey> <url>     # one source at a time; AB_UA overrides the user agent
node research/ai-bio/tools.mjs grep <cacheKey> "<regex>"
node research/ai-bio/tools.mjs check research/ai-bio/drafts/<group>.json
node research/ai-bio/tools.mjs hazards research/ai-bio/drafts/<group>.json
node research/ai-bio/dataset-timeline.mjs                  # -> timeline-dataset.json
node research/ai-bio/tools.mjs merge                       # drafts -> pack.json
node research/ai-bio/tools.mjs verify                      # -> verification.json
node research/ai-bio/tools.mjs render                      # -> pack.md
node research/ai-bio/sample.mjs                            # -> audit-sample.json and the auditors' inputs
node research/ai-bio/tools.mjs brief 2026-10-28            # -> cross-family input and verdicts
npx prettier --write research/ai-bio/
```

The cache lives in the ignored `.local/ai-bio/` folder. A fresh checkout must re-fetch each source from the address in `pack.json` under its `cacheKey`; compare SHA-256 values, since current responses may differ.
