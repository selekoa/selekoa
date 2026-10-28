# Frontier safety frameworks compared: scope and method

A candidate research pack outside application data. It lets a policy researcher read what each frontier developer's safety or scaling framework says on the same questions, edition by edition, with the edition's own words and their location. It answers the main gap found by the [fresh-eyes test of 2026-10-14](../../docs/fresh-eyes-2026-10-14.md#persona-3-policy-researcher-frameworks): the application shows each framework's history one developer at a time and states that it "does not compare or rank developers".

Nothing here is editorially accepted. The pack was prepared and audited by machine (one model family); a cross-family check brief is included but has not been run. It does not change `data/` or the application.

## What a cell is

```text
edition  one published edition of one framework (a column)
facet    one comparison question, worded to fit every edition (a row)
cell     edition × facet: one of
           stated              1–3 verbatim quotations (≤ 50 words each) with locator
           not found           no passage meeting the criterion within the recorded scope:
                               the sections inspected, search terms and every hit set aside
           not applicable      D8 "changes from the previous edition" for a first edition, or a facet
                               of an edition that could not be retrieved and has no dataset passage
           recorded, not re-checked
                               a passage already in Selekoa's dataset for an edition that could not
                               be retrieved in this run (Meta v1.1 only)
```

**"Stated" and "stated, partly" (Rule B, maintainer ruling of 2026-10-27, [decision record](../../review/framework-rulings-2026-10-27.md)).** A cell is "stated" when a passage meets the criterion as worded, however conditional or narrow its scope; the condition or scope goes in the mapping note. A cell is "stated, partly" only when the passage has what the criterion asks for, but in a weaker form than the criterion's own words: a domain named but excluded, or named only as possible future work; no named person or body where the criterion asks for one; an example where it asks for a general definition; a "may" where it asks for a statement that something will happen; information sent to a board where it asks for a review role. A cell is "not found" when no passage names the thing at all. "Partly" is not a score: a "stated" cell can carry conditions that matter as much, and they are in its note.

A cell records what an edition **states**. It is not evidence that a provision was implemented, complied with or effective, and the pack never says so. Selekoa does not equate documents with practice.

## Dimensions and facets

| Dimension                        | Facets                                                                                                  |
| -------------------------------- | ------------------------------------------------------------------------------------------------------- |
| D1 Risk domains covered          | CBRN weapons; cyber operations; autonomy, self-improvement or AI R&D; persuasion or manipulation; other |
| D2 Thresholds and triggers       | named levels or thresholds; how a threshold is defined                                                  |
| D3 Required actions              | safeguards required; pause, non-deployment or non-training                                              |
| D4 Who decides                   | determination of capability or safeguard adequacy; board or external oversight                          |
| D5 Evaluation cadence and timing | evaluation timing                                                                                       |
| D6 Exceptions and discretion     | provisions conditioned on other developers; other exceptions or discretion                              |
| D7 Transparency and reporting    | internal reporting; public or external reporting                                                        |
| D8 Revision                      | revision process and approval; stated changes from the previous edition                                 |

Each facet has a one-sentence criterion in `pack.json`, shown above its table in `pack.md`. Rules:

- **Normalise the category, never the wording.** Facet labels are Selekoa's; no label borrows a term from one edition (no "ASL", "CCL", "High", "Critical"). The edition's terms appear only inside quotations and notes.
- **Where a concept does not map cleanly,** the cell carries a `mappingNote` in neutral words, for example a domain named only as a research category without thresholds, or a "pause" that applies only in some scenarios.
- **Conditional wording stays conditional.** "May", "aim to" and "intend" are kept inside the quotation and never strengthened.
- **Facet boundaries (maintainer rulings of 2026-10-26, [decision record](../../review/data-fixes-2026-10-26.md)).** D1: autonomy, self-replication and AI research and development go under D1.autonomy; loss of control or misalignment defined through deception or undermining human oversight goes under D1.other. D6.competitor counts only provisions that relax, adjust or condition the developer's safeguards or commitments on what other developers do or have. Scope tests that decide whether a model is covered by the framework are recorded as context, not counted (added 2026-10-27). D7.external excludes publication of the framework itself, which is recorded under D8 Revision.
- **Describe, do not evaluate.** No ranking, scoring, or words such as "stronger", "weaker" or "loophole". A shared category does not mean two provisions are equivalent.

## Editions in scope

All editions of frontier safety or scaling frameworks already recorded in Selekoa's dataset (`documentVersion.family` in `data/entities.json`): Anthropic Responsible Scaling Policy (nine editions, v1.0–v3.4), Google DeepMind Frontier Safety Framework (four), OpenAI Preparedness Framework (two) and Frontier Governance Framework (one), xAI Frontier Artificial Intelligence Framework (two), Meta Frontier AI Framework and Advanced AI Scaling Framework (two), Microsoft Frontier Governance Framework (two). Each edition has the same identifier as its dataset entity.

Checked for missing editions on 2026-10-15:

- Anthropic's official version archive (fetched directly) lists v1.0 to v3.4 and no later version.
- Google DeepMind's frontier-safety page (fetched directly) lists versions 1.0, 2.0, 3.0 and 3.1.
- OpenAI, xAI, Meta and Microsoft index pages refused direct retrieval (HTTP 403 or 404). A web search found no later primary edition. A third-party change tracker reports editorial updates to OpenAI's Frontier Governance Framework in July and September 2026; the PDF at the recorded address has no edition date, so the copy checked may be a later expression than the May 2026 edition (see Limits). No edition was added on the tracker's word.
- Not in scope: Anthropic's Frontier Compliance Framework (recorded in the dataset as a compliance framework whose edition was not inspected), xAI's earlier Risk Management Framework drafts, and frameworks by developers not in the dataset (for example Amazon, NVIDIA, Cohere, G42, Naver). Adding them is a maintainer decision.

## Retrieval and verification

- Each edition was retrieved on 2026-10-15 directly from the publisher address recorded in the dataset, by `tools.mjs fetch` (curl, sequential). `pack.json` records the final URL, HTTP status, size and SHA-256 of each body. Text layers were made with `pdftotext`; for RSP v2.2, v3.1, v3.3 and v3.4 the default layer splits words and wraps every line in invisible bidi or zero-width characters, so the raw-mode layer (`tools.mjs retext <key> raw`) is used. Page numbers in locators are PDF pages of that layer, with printed page numbers where they differ.
- The Internet Archive refused connections from this environment throughout the run (connection reset). Archive links are those already recorded in the dataset; they were not re-fetched, and current copies were not compared byte-for-byte with captures in this run. A current copy does not authenticate earlier bytes.
- **Meta Frontier AI Framework v1.1** could not be retrieved: the publisher address returns HTTP 500 and the dataset's evidence for it is an Internet Archive capture. Its cells carry passages already in the dataset (checked there against the 2025-02-13 capture) and were marked "recorded, not re-checked". No "not found" was recorded for it. **Re-checked on 2026-10-27:** a blind cross-family re-check ([report](codex-meta-v1-1-2026-10-27.md)) retrieved and hashed the 2025-02-13 capture and read the whole edition. By the maintainer's decision of 2026-10-27 the carried cells are now "stated", ten further cells take the re-check's findings, and the three on which it proposed "stated, partly" were decided by the maintainer on 2026-10-28 (one not found, two stated); see the [follow-up record](../../review/followups-2026-10-28.md). No cell now carries "recorded, not re-checked".
- `tools.mjs verify` matches every quotation against the cached text of its own edition (normalising whitespace, quotes, dashes, Unicode compatibility forms, invisible bidi and zero-width characters, a space before punctuation left by split text runs, and line-break hyphenation; `…` joins fragments that must occur in order), checks that the PDF page in each locator is the page where the quotation occurs, checks one cell per edition and facet, and enforces the quotation limits. Results are in `verification.json`.
- **Quotation limits** ([editorial policy](../../docs/editorial-policy.md#short-quotation)): at most 50 words per quotation, at most 400 distinct quoted words per edition in this pack. `verification.json` also reports the total if the pack's quotations were added to those the dataset already holds for the same edition; an edition over 400 there would need trimming before any admission.

## How "not found" was established

A "not found" cell requires that the whole edition was read, that the text layer was searched case-insensitively for at least five terms or stems relevant to the facet, and that every hit near the criterion is listed with the reason it was set aside. The record names the edition and the pages or sections inspected. It means "not found within this scope". It is not a claim that the developer lacks the practice, nor that a provision was deleted from an earlier edition.

## Preparation and audit

- **Drafting.** Five fresh-context drafting passes (one per framework group) read each edition in full and drafted cells to a written specification, reusing passages already in the dataset where they fit. All passes were by the same model family (Claude). The preparer then merged, checked and edited the drafts for consistency of facet mapping across developers.
- **Audit.** Separate fresh-context passes of the same family audited a recorded random 20% sample of stated cells and every "not found" cell against the retrieved texts, without the drafting passes' notes. Because the sample found quotations cut so tightly that they hid conditions, a targeted sweep then audited every remaining stated cell in the six facets concerned. See [audit.md](audit.md) for coverage, results and corrections. A same-family audit is recorded as such.
- **Cross-family check.** [gpt-check-input-2026-10-15.md](gpt-check-input-2026-10-15.md) is a blind brief for a reviewer from a different model family. It has not been run. Because the pack contains negative propositions ("not found") and cross-developer framing, the [editorial policy](../../docs/editorial-policy.md#additional-review-triggers) routes it to targeted checking before any use beyond exploration.

## Limits

- Twenty-two editions from six developers, as recorded in the dataset. Other developers' frameworks, companion documents (capability reports, system cards, risk reports, noncompliance policies) and announcements were not read for the cells; a cell can only show what the framework edition itself says.
- The OpenAI Frontier Governance Framework copy checked carries no edition date and may be a later expression of the May 2026 edition.
- Quotations from long tables are shortened to the row that answers the facet; the full table must be read in the edition.
- Mapping across developers is an editorial judgement. Each mapping is visible in the cell's quotation and note, so a reader can disagree with it.

## Reproduction

From the repository root:

```sh
node research/frontier-framework-comparison/tools.mjs fetch <cacheKey> <url>   # one edition at a time
node research/frontier-framework-comparison/tools.mjs grep <cacheKey> "<regex>"
node research/frontier-framework-comparison/tools.mjs page <cacheKey> <n>
node research/frontier-framework-comparison/tools.mjs verify      # -> verification.json
node research/frontier-framework-comparison/tools.mjs render      # -> pack.md
node research/frontier-framework-comparison/tools.mjs crosscheck  # -> gpt-check-input-2026-10-15.md and verdicts
npx prettier --write research/frontier-framework-comparison/
```

The cache lives in the ignored `.local/frontier-framework-comparison/` folder. A fresh checkout must re-fetch each edition from the URL in `pack.json`; compare SHA-256 values, since current responses may differ.
