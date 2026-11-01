# Same-family audit, 2026-10-28

A fresh-context audit of the AI and biosecurity pack by the same model family (Claude) that drafted and merged it. It is not a cross-family check and not human review. Agreement here is not independent corroboration.

## Sample

[`audit-sample.json`](audit-sample.json) records the draw (seed 20261028, linear congruential generator in [sample.mjs](sample.mjs)) from the 207 merged records as they stood before the audit:

- **Random:** 34 records drawn from the 143 records outside the targeted class.
- **Targeted:** 38 records drawn by the same generator from the 64 records in the targeted class: inferred, posed, contested or unresolved records, proposed predicates, stated evaluation results, proposition records, edition comparisons, recorded absences, participant lists, snapshots of served pages, and records resting on a secondary source.

72 records were audited (35% of the pack as it then stood). The 135 records outside the sample are not certified by it. The sample is not redrawn after the corrections; the pack now holds 209 records, and every sampled identifier is still in it.

## Method

Two auditors, each a fresh context given 36 records (statement, date and its kind, derivation and rationale, resolution, qualification, attributes, hazard note, and evidence with source address, locator and passage) and told to refute them. Neither saw the drafts, `pack.json`, `pack.md`, `verification.json`, the sample or the drafting passes' notes. Each read the cached retrievals with `tools.mjs` and could re-fetch a source by direct HTTP under a new cache key. Each recorded per record: quotation, locator, support, date and its kind, identity, overstatement, **hazard**, qualification and a verdict (upheld, correct, drop). Their reports are [`audit/audit-A.json`](audit/audit-A.json) and [`audit/audit-B.json`](audit/audit-B.json).

The hazard-safe rule was the first question put to both auditors: does the record or its passage carry a method, protocol, agent, acquisition route or anything else that would give uplift?

## Results

| Sample    | Upheld | Corrected | Dropped |
| --------- | -----: | --------: | ------: |
| Auditor A |     20 |        16 |       0 |
| Auditor B |     17 |        19 |       0 |

**No breach of the hazard-safe rule was found**, by either auditor, in any record, statement, qualification, note, attribute or passage. Both screened every field against the pack's register stems and against their own wider lists, and then read each cited passage in its context in the source. Both reported the rule being applied rather than asserted: between them they named eight sources that hold plainly excludable technical content beside a cited passage, in each of which the record quotes none of it and its hazard note declares the exclusion. One record keeps two register flags (`ab-ev-vct-benchmark-measures`): the flagged words are a benchmark's own published statement of what it measures, needed to identify it, and the record's hazard note says the paper's body was not read.

Every quotation in the sample was found verbatim in the source named, and every page and section locator opened, including four pairs where a PDF page differs from its printed folio. Both auditors checked dates they expected to be wrong and found them right, including two documents that carry two dates and three records that use the unknown time kind rather than guess.

## Corrections applied

35 findings were applied in the drafts, never in `pack.json`; each draft carries an `auditCorrections` array with the record, the auditor, the finding and the disposition. One finding was declined, and the integrator widened three findings to the record families they belong to, as the editorial policy requires. The pack went from 207 to 209 records, because two records that bundled two provisions were split.

### What the corrections changed

- **Conditions and scope words restored** where a statement dropped what its own source carries: a preprint's condition on when access would widen; the super-intelligence scope words on a NIST centre page; "and deployment" and an open-ended list in a national security memorandum; the two co-ordinate reasons of a framework change log, where one had read as the reason.
- **Overstatements narrowed to the text**: a bill's permissive "may include" no longer reads as a duty; an executive order's direction to develop "a plan for developing" evaluation tools no longer reads as a direction to implement them; an Annex's purpose (designating a model as having systemic risk) replaces a reframing; a call on other states no longer reads as a required action; a stated result follows the bullet actually cited rather than a stronger sentence elsewhere in the same document.
- **Uncited sentences cited.** Four statements rested in part on a sentence no evidence item carried. Each sentence was verified and added as its own evidence item with its locator, within the per-source quotation budget.
- **A proposition record's stance downgraded.** `ab-arg-b2-batalis-articulates` was recorded as articulating the proposition that the physical step, not information, is the limiting barrier. The cited passages state that the information barrier is low and that feasibility depends on both information and hands-on success, and rank neither. The record is now `bears_on_proposition` with the missing element named. That proposition now has no articulating text in the pack and so no earliest-located articulation, which the schema allows; the earliest located text on it is the contesting one, which is earlier in any case. The record keeps its identifier, which names a stance it no longer holds; renaming it is an open question for admission.
- **Two records split**, where one edge carried both an instrument's standing and its addressees.
- **Locators and headings fixed exactly**: a Federal Register folio, a paragraph number, a section title, a PDF page against its printed folio, a numbered-item range, and a page whose quoted heading is a screen-reader heading rather than the visible one.
- **Two false clauses removed.** A record said that the gene-synthesis consortium's member directory gives no category labels and that associate members cannot be distinguished. The page is a tab list with two labelled categories; the record now carries both labels and their counts, and the organisation typology moved to the qualification as a reading of the entries' own descriptions. No member is named.
- **The expression checked recorded** for every mutable source: a served page that states a later update date, and a PDF that states in a footnote that a section was added after the date on its face.
- **Qualifications completed** where a document's own hedging was missing: a safeguard activation described by its publisher as precautionary and provisional, with the capability threshold not yet determined.

### The integrator's widening

The editorial policy requires a material error to widen checking to the affected source or relation family. Three findings were widened beyond the sampled records:

1. **Mutable sources** (from auditor B's finding on one page). Every one of the 20 sources in the evaluations draft was checked against its cached retrieval for an update, revision or supersession statement. Four are mutable with a stated later expression; nine records and three source entries gained the treatment, among them a system-card PDF whose own footnote says a section was added after the date it states — which neither auditor had found. The negative results are recorded too.
2. **Schema fit** (from auditor A's finding that three date bases and two provision kinds are not in the dataset's enums). Every record in every draft was checked. Eleven unsampled records were corrected to the dataset's own precedents: a stated date of effect or application is a `threshold` provision, as the dataset records it; a provision that decides what an instrument covers is a `threshold`; a passage naming the risk an instrument addresses is a `risk_domain`; a requirement is a `required_action`; a provision of a bill as introduced is dated by the publication of the introduced print; and a legislative status record carries no date basis at all, as the dataset's own status records do not. The gap between the pack's needs and the schema's enums is an open question, not a correction.
3. **Evidence support roles on proposition records** (found by the correction pass, not by either auditor). The arguments draft read the support role against the proposition, so contesting records carried only `contradicts` and the context record only `context`. A proposition record's own proposition is that the text takes that stance, and all 888 proposition records in the dataset use `supports`; seven records would have failed validation. Twelve evidence items on eleven records were set to `supports`, with the reason recorded on the one that had read most naturally the other way.

### The one declined finding

`ab-fw-rsp-v3-2-novel-cb-threat-pathway-sharing` rests on a paraphrase, where the schema requires a stated provision to carry a short verbatim quotation. The auditor judged the sentence to fit both budgets; it does not. The source has 22 words of headroom against the editorial policy's per-source limit, because the dataset already quotes 393 words of that edition, and the sentence is 26 words as the pack quotes it elsewhere. The record keeps its paraphrase, and the gap is an open question with two routes: an elided quotation of the outer limbs, or a maintainer decision to retire an existing dataset quotation from that edition.

## What the auditors found that is not a correction

- **Three admission blockers that are maintainer decisions, not errors.** The proposed predicate `states_evaluation_result` and its attributes are not in the schema (24 records). `evaluation_engagement` admits only organisation subjects, while the UK institute is typed `public_body` in the dataset, so two records cannot be admitted as structured; the dataset is already inconsistent here, since the US institute is typed `organisation`. The schema has no provision kind for a stated date or for an instrument's standing, so the pack uses the nearest kinds the dataset itself uses and says so in each qualification.
- **Modelling questions** put deliberately rather than resolved: whether a national statement issued as a meeting working paper is well modelled as a provision record; whether a developer's capability determination is a stated result or a provision of its framework; whether two expressions of one system card are one source or two.
- **Dates carried by a document entry rather than by a cited passage.** Several records took the day of a document from the dataset's own edition record or from a publisher's listing page rather than from the cited document. Auditor B checked every one and found none wrong; the records now cite the listing page or say in the date note where the day comes from.
- **One report of a defect in the dataset's own predicate table** (the `passed` predicate carrying another predicate's description) was checked against `src/domain/predicates.ts` and is not there; the auditor misread. Nothing in `src/` was changed.

## Limits

A bounded sample does not certify the records outside it. Both auditors are the same model family as the preparers, so their agreement is not independent corroboration, and neither saw the sources through a route the preparers could not use: the Internet Archive refused this environment throughout, so no capture was opened at any stage. The cross-family check in [`cross-family-input-2026-10-28.md`](cross-family-input-2026-10-28.md) carries every record class the auditors found weakest, and asks the checker to open those captures.
