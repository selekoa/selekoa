# Same-family audit, 2026-10-30

A fresh-context audit of the AI in biology pack by the same model family (Claude) that drafted and merged it. It is not a cross-family check and not human review. Agreement here is not independent corroboration.

## Sample

[`audit-sample.json`](audit-sample.json) records the draw (seed 20261030, linear congruential generator in [sample.mjs](sample.mjs)) from the 256 merged records as they stood after the integrator's changes below and before the audit:

- **Random:** 32 records drawn from the 112 records outside the targeted class.
- **Targeted:** 40 records drawn by the same generator from the 144 records that use a proposed predicate (partnerships, awards), record funding, an investment, an acquisition, a founding date or a role, hold a proposition role, carry a hazard note, compare two versions, record an absence, are inferred, rest on a snapshot of a served page, or rest on a secondary source.

Two auditors (A and B) took 36 records each. Each was given only the records with their evidence and source addresses (not `pack.json`, `pack.md` or the drafts' notes), read the cached source texts, re-fetched where needed, and recorded per record: quotation verbatim, locator, support, date and kind, identity, overstatement, hazard, qualification, and a verdict (upheld, correct, drop). Their reports are [audit/audit-A.json](audit/audit-A.json) and [audit/audit-B.json](audit/audit-B.json).

## Results

| Auditor | Records | Upheld | Correct | Drop |
| ------- | ------: | -----: | ------: | ---: |
| A       |      36 |     20 |      16 |    0 |
| B       |      36 |     25 |      11 |    0 |
| Total   |      72 |     45 |      27 |    0 |

No auditor found a hazard breach (a sequence, protocol or uplift-giving detail), an email address or other personal detail, or a priority or evaluative word in Selekoa's own wording. Every record survived; 27 needed a correction. The rate (27 of 72) is high enough that the unsampled records almost certainly hold defects of the same kinds, which is why each finding was widened to the family it belongs to (below) and why the cross-family check matters.

### What the auditors found

- **Quotations damaged by text extraction.** A Recursion prospectus quote began mid-word ("technology company" from "biotechnology company"); two Recursion quotes used an ellipsis for an apostrophe the text layer had dropped, which misrepresents an omission; two XtalPi quotes showed an empty "( )" where the PDF prints a Chinese name.
- **Dates of the wrong kind or more precise than the source.** A co-founding record typed as an announcement date; a Hong Kong listing date that the source gives as expected and conditional; a preprint's version metadata read as showing an order it does not state; a Form 8-K period of report missing from an acquisition's date note.
- **Statements that claim more than the evidence.** "At publication" resting on today's version-of-record page; "the paper does not use the name Rosetta" resting on an abstract; a CASP Center statement that omitted the page's next sentence (that models from other groups would also have been effective in some cases); a shortened list in a BioMap statement; a page title read as saying "lab".
- **Identity.** The Nobel awarding body was given an id naming a committee; the press release is the Royal Swedish Academy of Sciences'. The CASP13 and CASP14 overview papers were called the assessors'; they are the organisers' overview papers, and the papers name the independent assessors separately. The XtalPi prospectus was issued under the name QuantumPharm Inc.
- **Locators and schema values.** Several wrong sections or pages; an amount scope (`investor_amount`) that the schema does not have.

### How they were handled

All 27 were corrected in the drafts (22 as proposed, 5 differently) and none was declined. [audit/dispositions.json](audit/dispositions.json) gives each finding, its disposition and the change. The five done differently: a locator moved to p. 19, not p. 18, by the text layer's page marks; a sentence added as a paraphrase because quoting it would exceed the source's budget; a co-founding record dated at the founding year a later release states, rather than as a snapshot (decision g below); and the two Gibson records quote a shorter span, since the auditor's replacement quote contains the same dropped character.

### Widening

The integrator (not the maintainer) widened findings into nine family-wide decisions and applied each across all drafts, not only to the sampled records:

| Decision                                                                                                                                                                 | Records changed |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------: |
| a. The Nobel awarding body is `aib-royal-swedish-academy-of-sciences`; Nobel statements follow the release's name order                                                  |               4 |
| b. Amount scopes only from the schema (`transaction`, `round_total`, `cumulative`); the non-schema fields `attributes.milestones` and `attributes.participation` removed |               8 |
| c. No ellipsis standing for a character the text layer dropped                                                                                                           |               3 |
| d. No empty "( )" where a PDF dropped Chinese characters; the gap is marked "(…)" with a note                                                                            |               4 |
| e. Abstract text relayed by PubMed, Europe PMC or the bioRxiv API is the authors' text (primary, relay named); bibliographic metadata from them is secondary             |              15 |
| f. `founding_stated` carries no date basis (dataset convention)                                                                                                          |               3 |
| g. `co_founded` is an event at the founding year a source states, with no basis; `unknown` where none is stated                                                          |              10 |
| h. "At publication" only where the first-published expression was read; otherwise "the article page as served on 2026-10-30"                                             |               5 |
| i. CASP overview papers are the organisers'                                                                                                                              |              13 |

Six smaller points on upheld records (locators, a hazard note's wording, a capitalisation, a quoted phrase) were also fixed and are listed in the dispositions file.

## Integrator's changes before the audit

Made by [integrate.mjs](integrate.mjs) in the drafts, after the five passes and before the sample was drawn:

1. **One id per document.** Three passes defined EvolutionaryScale's ESM3 post (`aib-doc-esm3-release-post-2024`, `aib-doc-evolutionaryscale-esm3-post-2024` → `aib-doc-esm3-release-2024`) and two the Isomorphic Labs launch page (`aib-doc-isomorphic-intro-2021` → `aib-doc-iso-launch-2021`).
2. **One source key per address.** Nine source keys that retrieved an address another pass had also retrieved were mapped to one key, so that each source's quotation budget counts every pass's quotations. That put the Isomorphic Labs launch page over its budget (127 of 77 words); three quotations of it were turned into labelled paraphrases by hand in `labs.json` and `claims.json`.
3. **Two roles re-dated.** The people pass dated two roles read from the undated CASP14 home page to 2020, because the page concerns CASP14, and recommended keeping that. The integrator re-dated them as snapshots at the retrieval date (2026-10-30), under the scope's rule that an undated page is a snapshot; the page's subject is recorded in the note. This overrides the drafting pass's recommendation, so it is listed in the review note.
4. **Two proposition records added.** The companies pass recorded company statements of drug candidates in trials; two that describe the candidate as AI-designed or AI-discovered (Exscientia's 2021 prospectus; Insilico Medicine's announcement of 8 July 2026) were linked to proposition P3 as `articulates_proposition` records using the companies pass's own evidence. No new quotation was added. The other trial statements (Generate's GB-0895, Recursion's clinical programmes) do not describe the candidate as AI-designed in the passages quoted and are not linked.
5. **Two predicates added to the merge.** `departure_announced` and `has_legal_form`, which the dataset has, were added to the merge's accepted list.

## Limits of this audit

- Same model family throughout. The audit can find defects of reading and wording; it cannot supply an independent judgement of what a source means where the family shares a reading.
- 72 of 256 records. The 184 unsampled records were touched only by the widening.
- The four records whose dates rest on an inference against a page's displayed date (the DeepMind posts of 2018 and 2021) were not resolved: neither auditor could open an Internet Archive capture from this environment. They are in the cross-family brief.
- Paraphrase-only records (the Genentech Prescient Design story, whose text sits in script data) cannot be checked mechanically. The audit read them against the script data.
