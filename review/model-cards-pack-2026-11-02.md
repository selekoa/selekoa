# Model cards compared: candidate pack, 2026-11-02

Review note for the candidate research pack [`research/model-cards/`](../research/model-cards/) on branch `model-cards-pack` (from `main` at v0.26.1). It serves the roadmap's first "Next collections" item, "Model cards compared". Nothing in `data/`, `src/`, the schema or any release is changed.

- **Prepared by:** Claude (four fresh-context drafting passes, one per developer group, and an integrating session). **Audited by:** a fresh-context Claude subagent (same family). **Cross-family check:** run by OpenAI Codex on 2026-11-03 against the brief [`cross-family-input-2026-11-02.md`](../research/model-cards/cross-family-input-2026-11-02.md) (report: [`cross-family-check-2026-11-02.md`](../research/model-cards/cross-family-check-2026-11-02.md)); adjudicated below.
- **Status:** candidate pack outside application data; not editorially accepted; no human review.

## What the pack records

For each compared card, sixteen questions ([`questions.json`](../research/model-cards/questions.json)), each with a criterion and the legend of Compare frameworks (stated / partly / not found / not applicable): the card's date and the release date (Q01–Q02); whether it cites the developer's framework and edition, links to it, states a determination under it and ties safeguards to that determination (Q03–Q06); dangerous-capability evaluations by domain (chemical and biological, cyber, autonomy and AI research and development, persuasion) and alignment or deception evaluations (Q07–Q11); red-teaming, named external testers and government institutes (Q12–Q14); the release decision and who made it (Q15); and stated limits of the evaluations (Q16). Every stated or partly cell quotes the card (at most 50 words) with page and section; every not-found cell records the sections read, the terms searched and the passages set aside.

Dangerous-capability evaluations are recorded at policy level only (whether run, domain, outcome category, threshold language). A card's statement is recorded as the developer's account, never as a finding.

## Selection rule

The population is every system card, model card or safety report published by Anthropic, Google DeepMind, Meta, Microsoft, OpenAI or xAI for a model released between 2023-01-01 and 2026-11-01 (image, video, audio and embedding models outside). The drafters located 185 documents, of which 39 are marked as outside the population. At sixteen questions per card the population is several times the size the operating guide allows one pack, so this pack compares a stated subset ([`scope.md`](../research/model-cards/scope.md)):

> For each developer and each calendar year from 2023 to 2026, the latest-dated card published in that year that reports its own evaluations. Where every card of a year is an addendum that refers to an earlier card for its evaluations, the latest addendum. For 2026 the year runs to the check date.

The rule is mechanical so that it does not select by perceived importance. Its result is shown below; open question 1 asks whether it is the right rule for the collection.

## Cards compared (20 rows, 320 cells)

| Developer       | Model (row)                                     | Year | Kind          | Framework edition in the dataset |
| --------------- | ----------------------------------------------- | ---- | ------------- | -------------------------------- |
| Anthropic       | Claude 2.1 (with Claude 2)                      | 2023 | model card    | —                                |
| Anthropic       | Claude 3.5 Haiku and upgraded Claude 3.5 Sonnet | 2024 | addendum      | `rsp-v2-0`                       |
| Anthropic       | Claude Opus 4.5                                 | 2025 | system card   | `rsp-v2-2` (by link annotation)  |
| Anthropic       | Claude Haiku 5.5                                | 2026 | system card   | — (RSP named without edition)    |
| Google DeepMind | Gemini 3 Flash                                  | 2025 | model card    | — (FSF named without edition)    |
| Google DeepMind | Gemini 4 Argon                                  | 2026 | model card    | `fsf-v3-1`                       |
| Meta            | Llama 2                                         | 2023 | model card    | — (predates frameworks)          |
| Meta            | Llama 3.3                                       | 2024 | model card    | — (predates frameworks)          |
| Meta            | Code World Model (CWM) Preparedness Report      | 2025 | safety report | — (Frontier AI Framework named)  |
| Meta            | Muse Spark 1.3 Evaluation Report                | 2026 | safety report | — (edition not in the dataset)   |
| Microsoft       | Phi-2                                           | 2023 | model card    | — (predates frameworks)          |
| Microsoft       | Phi-4                                           | 2024 | model card    | — (predates frameworks)          |
| Microsoft       | Phi-4-mini-flash-reasoning                      | 2025 | model card    | — (no framework named)           |
| Microsoft       | MAI-Cyber-1.1-Flash                             | 2026 | model card    | — (no framework named)           |
| OpenAI          | GPT-4V(ision)                                   | 2023 | system card   | — (predates frameworks)          |
| OpenAI          | o1 (and o1-mini)                                | 2024 | system card   | `preparedness-beta-2023`         |
| OpenAI          | GPT-5.2-Codex                                   | 2025 | addendum      | `preparedness-v2` (by link)      |
| OpenAI          | GPT-6 Luna (October 29 update)                  | 2026 | addendum      | `preparedness-v2` (by link)      |
| xAI             | Grok 4.1                                        | 2025 | model card    | — (Risk Management Framework)    |
| xAI             | Grok 4.7                                        | 2026 | model card    | `faif-2026`                      |

Google DeepMind has no 2023 or 2024 row: its Gemini 1.0 and 1.5 model cards are appendices of technical reports, recorded as no card under scope.md (open question 7). xAI has no 2023 or 2024 row: the Grok-1 card could not be retrieved (HTTP 403) and no other card was located for those years.

## Cards not compared, not retrievable and missing

- **Located, not compared:** 126 in-population documents other than the 20 rows are listed with their dates and the reason in `pack.md` § "Inventory" (most are earlier cards of the same year). Of these, 17 Anthropic cards were located on the developer's index but not retrieved, because the rule did not select them.
- **Not retrievable from this environment:** OpenAI's Sora system card and the o3 Operator addendum (openai.com, HTTP 403); Meta's Muse Spark Safety & Preparedness Report (ai.meta.com, HTTP 400; an arXiv expression was located); xAI's Grok-1 card (x.ai, HTTP 403). None changes a selected row unless its date is later than the row's, which for the Meta report is open (question 11).
- **Models searched for without a card being located (22):** recorded per group with the search in the inventory files (for example GPT-4 Turbo, GPT-4o mini, GPT-4.1, o3-pro, Claude v1, Claude Instant 1.2, MAI-1-preview). These are findings of the search, not statements that no card exists.
- **Archive captures:** web.archive.org refused connections from this environment; no capture was checked. Part C of the cross-family brief asks Codex to record captures.

## Coverage per cell

Status counts per question across the 20 rows, as drafted on 2026-11-02; the adjudication below changes Q06 and Q09. They describe what the cards were found to state; they do not rank developers or cards, and should not be summed.

| Question                             | Stated | Partly | Not found | Not applicable |
| ------------------------------------ | -----: | -----: | --------: | -------------: |
| Q01 Card date                        |      9 |      4 |         7 |              0 |
| Q02 Release date                     |      8 |     11 |         1 |              0 |
| Q03 Framework cited                  |      7 |      5 |         3 |              5 |
| Q04 Link to framework                |     10 |      2 |         3 |              5 |
| Q05 Framework determination          |     10 |      1 |         4 |              5 |
| Q06 Safeguards tied to determination |      7 |     11 |         2 |              0 |
| Q07 Chemical and biological          |     11 |      2 |         7 |              0 |
| Q08 Cyber                            |     12 |      2 |         6 |              0 |
| Q09 Autonomy and AI R&D              |      8 |      2 |        10 |              0 |
| Q10 Persuasion                       |      4 |      2 |        14 |              0 |
| Q11 Alignment and deception          |      7 |      2 |        11 |              0 |
| Q12 Red-teaming                      |     12 |      2 |         6 |              0 |
| Q13 External testers                 |     10 |      2 |         8 |              0 |
| Q14 Government institute             |      3 |      0 |        17 |              0 |
| Q15 Release decision                 |      4 |      7 |         9 |              0 |
| Q16 Stated limits                    |     20 |      0 |         0 |              0 |

Q04 has more stated cells than Q03 because a card can link to the framework document without identifying its edition.

## Checks

- **Quotations:** 303 of 303 found verbatim in the retrieved text of their cards ([`verification.json`](../research/model-cards/verification.json)); every quote at most 50 words; every card within its quotation budget. The tightest are Gemini 3 Flash (100 of 106 words) and MAI-Cyber-1.1-Flash (146 of 165).
- **Structure:** one cell per card and question; passages for every stated and partly cell; search terms for every not-found cell; a reason for every not-applicable cell; framework identifiers present in `data/entities.json`; no evaluative words from the list in `build.mjs` in notes. Uses of "only", "first" and "claims" are listed in `verification.json` and were read: all are descriptive ("month precision only", "first-party", "context only").
- **Same-family audit** ([`audit.md`](../research/model-cards/audit.md)): 60 cells (every Q05 cell, 10 negative findings, 30 random), blind first; 58 agree, 2 partly, 0 disagree, 0 material. Its non-material fixes were applied, and two patterns it found were widened to the whole pack (notes on every not-found cell; the basis of every not-applicable Q04 and Q05 cell).
- **Integrator change:** Q15 was read differently by the groups. Its criterion now says that the developer's "we" counts as the company as such, and that a release stated as following from an assessment, without a decision being described, is partly. Two cells changed: Claude Haiku 5.5 (stated to partly) and Phi-2 (partly to stated).
- `pnpm check:privacy`: passed. Prettier and ESLint on the pack's files: clean.

## Open questions, with recommendations

1. **Row rule for the collection.** The yearly rule selects some small or specialised models (Phi-2, Phi-4-mini-flash-reasoning, MAI-Cyber-1.1-Flash, the GPT-5.2-Codex addendum, Gemini 3 Flash) and leaves out most cards issued under a framework. The roadmap item asks for "each frontier model release". **Recommendation:** keep these 20 rows as pack I, and set the collection's rule to "every card in the population that cites the developer's frontier framework or states a determination under it, plus, for each developer, the latest card before its earliest framework edition". Draft the remaining framework-era cards in packs of about eight cards each.
2. **Population boundary.** The groups included Gemma, Gemini Robotics and Phi models, and image-input models (GPT-4V); excluded image-generation models, safety classifiers (Llama Guard, Prompt Guard), GUI-grounding models and research checkpoints; and excluded GPT-Rosalind-6, whose card states it uses the same weights as GPT-6 Astra. **Recommendation:** confirm as drafted and write the boundary into scope.md; under rule 1 most of these questions fall away.
3. **Which date orders cards.** Drafters used the date printed on the expression retrieved. This puts Gemini 3 Pro (released November 2025, "Last Updated: May 2026") in 2026, dates Gemma cards by 2025 revisions, and makes the Muse Spark 1.3 Evaluation Report (printed October 23, 2026; linked from a September 2026 announcement) Meta's 2026 row rather than the Muse Spark Open card (published 2026-10-15). **Recommendation:** for the collection, date each card by its earliest located publication, treat later revisions as versions of the same row, and show both dates. Under the yearly rule this would swap Meta's 2026 row; under rule 1 it changes no membership.
4. **Framework editions identified by link annotation.** Claude Opus 4.5, GPT-5.2-Codex and GPT-6 Luna name their framework without an edition in visible text; the edition is the target of a PDF hyperlink. The quotation check cannot verify a link. **Recommendation:** accept, record "identified by link annotation" in the evidence locator, and have Codex confirm the targets (brief item 5).
5. **Framework editions missing from the dataset.** xAI's Risk Management Framework (cited by Grok 4.1; the RMF served at data.x.ai prints "Last updated: August 20, 2025"), Meta's Superintelligence Scaling Framework v2.1 (October 2026) and Anthropic's "Frontier Compliance Framework" (named by Claude Haiku 5.5 for SB 53 and the EU code of practice). **Recommendation:** add the xAI RMF and Meta v2.1 editions to the Compare frameworks families in a separate data task; hold the Frontier Compliance Framework until it is read, since it may be a compliance document rather than an RSP edition.
6. **Release decision (Q15).** Confirm the reading applied at integration ("we" is the company as such; "we therefore release" without a described decision is partly). **Recommendation:** confirm.
7. **Google DeepMind's 2023 and 2024 cards.** The developer's model-card index links "View model card" to appendices of the Gemini 1.0 and 1.5 technical reports. **Recommendation:** count an appendix that the developer's own index labels as the model card; this adds Google DeepMind rows for 2023 and 2024 in the next pack.
8. **Repository cards and Q01.** Markdown cards on GitHub and Hugging Face print no date; commit dates were recorded in the inventory but not counted as the card's date. **Recommendation:** confirm.
9. **The 2023 Anthropic row** is the November 2023 re-issue of the Claude 2 card with its Claude 2.1 appendix, a later expression of the dataset source `source-eval-i-claude2-card`; because it postdates RSP v1.0, Q03–Q05 are not found rather than not applicable. **Recommendation:** keep, and at admission record it as a later expression of the existing source.
10. **o1: web page and PDF.** The dataset source `source-o1-card` is the web page; the pack cites the PDF, which marks a section added on 2024-12-19. Budgets were counted against the dataset source. **Recommendation:** register the PDF as its own expression at admission.
11. **Unretrieved documents.** The Muse Spark Safety & Preparedness Report, Sora and o3 Operator cards and the Grok-1 card. **Recommendation:** add them to the next Codex retrieval brief with the archive captures; none blocks the cross-family check.
12. **Quotation budgets.** Gemini 3 Flash and MAI-Cyber-1.1-Flash are near their limits. **Recommendation:** at admission, paraphrase any further passage from these two cards rather than quote.

## How this becomes a collection and a page

- **Records.** Each card becomes a document entity (several already exist, for example `o1-card-2024`, `gpt4-system-card-2023`, `claude-3-7-sonnet-system-card`) with its source, card date and release date as separate dated fields, and, where the card names one, a link to its framework edition entity. Each cell becomes one claim on a card facet, as Compare frameworks records one claim per edition and facet (`attributes.provision.facet`), with not-found cells carrying their search and not-applicable cells their reason.
- **Schema.** Card facets are new facet identifiers outside the framework comparison's set, and cards are not framework editions, so the admission likely needs a schema change. Following the operating guide: first the card documents, sources and their links to framework editions on existing predicates; then the schema change, the cell claims and the collection, as a minor release.
- **Reading definition.** A `src/reading/model-cards.ts` collection on the pattern of `src/reading/framework-comparison.ts`: title "Model cards compared", the legend above, the limits (the developer's account; policy level only; not a ranking; symbols not summed), the "How we searched" note (the inventory, the selection rule and retrieval failures).
- **Page.** A table on the first screen, with cards as rows (developers alphabetical, then card date) and the sixteen questions as columns, a developer filter, and each cell opening its quote, locator and note; a keyboard-accessible list equivalent. One page per question (sixteen pages) listing every card's cell with its quotation. A link from each card's row to its framework edition in Compare frameworks, and from each framework edition to the cards that cite it.
- **CSV.** One row per cell: card id, developer, model, card date (with kind), release date (with kind), framework edition id, question id, status, quotation, locator, note, search terms, source address, SHA-256 and check date.
- **Budgets.** Load the page module lazily and keep card text in the page's slice (operating guide § Budgets); seventeen new pages are well within the file budget.

## Adjudication of the cross-family check (2026-11-03)

Adjudicated by a Claude session (the drafting family) on branch `model-cards-apply`. The rule applied: the drafting family may not overrule the checker on a cell. Where the checker's finding is agreed it is applied; where it is not, both readings go to the maintainer. The changes are made in the drafts by [`adjudication/apply-2026-11-03.py`](../research/model-cards/adjudication/apply-2026-11-03.py), and `pack.json`, `pack.md` and `verification.json` were rebuilt with the pack's own tools (`merge`, `verify`, `render`). Each affected cell carries a `crossFamily` field naming its item and result; `pack.md` prints it under the cell.

**Scope of the check.** 130 items: Part A (90 cells, answered blind and committed in `fdfa5cc` before the pack's answers were opened) and Part B (40 of the pack's cells checked directly). Six items were excluded by the maintainer. The other 190 cells were not cross-family checked, and the check certifies nothing about them. It is a machine check of the developers' accounts, not human review and not evidence that any safeguard works.

### Agreed corrections, applied

| Item | Cell                         | Change                                                                                                                                                                                                                                                                                                                                                          |
| ---- | ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 96   | Claude 3.5 Haiku/Sonnet, Q09 | Transcription repair. The second quotation replaced a page break inside “ASL-3” with an ellipsis. The text layer drops the hyphen and inserts the page number, so the sentence cannot be checked mechanically; it is replaced by the verbatim conclusion on PDF p. 10 (“…does not require ASL-3 safeguards at this time.”). Note adjusted. Status stays stated. |
| 119  | o1, Q04                      | Transcription repair. The quotation joined the reference without its address prefix; it now quotes the title only, and the note gives the printed address. Status stays stated.                                                                                                                                                                                 |
| 101  | Gemini 3 Flash, Q09          | The absence note is limited to dangerous-capability evaluations; the agentic product benchmarks stay set aside. Status stays not found.                                                                                                                                                                                                                         |
| 102  | Gemini 4 Argon, Q06          | Stated becomes **partly**. The retrieved card was searched again (“safeguard”, “mitigat”, “security level”, “deployment”); no passage names a safeguard type or standard, so no qualifying passage exists. The developer's residual-risk wording is kept.                                                                                                       |
| 130  | Grok 4.7, Q16                | The clause on ongoing monitoring of residual jailbreak failures is removed from the note: it is an operational practice, not a limit of the evaluations. This also corrects the same-family audit's fix 36, which reworded the clause instead of removing it.                                                                                                   |
| 31   | Llama 3.3, Q09               | Not found becomes **partly**, with the attack-automation passage quoted. The note keeps the family scope: the study is stated for the Llama 3 family, not Llama 3.3 alone, and gives no outcome.                                                                                                                                                                |
| 36   | CWM Preparedness Report, Q06 | Not found becomes **partly**, quoting the honesty intervention in §4.1.1 (PDF p. 11). The note says the report does not tie it to the determination or state that it applies to the release.                                                                                                                                                                    |

Effect on the coverage table: Q06 becomes 6 stated, 13 partly, 1 not found; Q09 becomes 8 stated, 3 partly, 9 not found. No other question changes. The same-family audit's Luna Q12 distinction was supported by the checker; no change.

### Disagreement for the maintainer: item 69, GPT-4V Q15

The pack records **partly**; the checker records **not found**. The cell keeps the pack's status, marked † in the overview grid, until the maintainer decides; both readings are printed under the cell in `pack.md`.

- **Pack (Claude):** partly. The card states that OpenAI “is making [GPT-4V] broadly available” and describes how it “prepared the vision capabilities of GPT-4 for deployment”; it describes no decision and names no maker.
- **Checker (Codex):** not found. Broad availability and deployment preparation do not describe a release decision, a release following from a stated assessment, or a maker; none of the partly cases applies.
- **Criterion (Q15):** “Partly if a release is stated as following from an assessment without a decision being described (“we therefore release”), if a decision is described without any maker, or if a maker is named only for a capability or safeguards determination and not for the release.”

The pack's own note concedes that no decision is described, and the card does not state that the release follows from the assessment. Read as written, the criterion supports the checker.

### Excluded items, not cross-family checked

Items 30 (Llama 3.3), 45 (Phi-2), 52 (Phi-4), 99 (Claude Haiku 5.5), 112 (Phi-4-mini-flash-reasoning) and 126 (Grok 4.1), all Q07 (chemical and biological). Left as drafted; each cell is marked “not cross-family checked: excluded from the pass by the maintainer”.

### Inventory findings: decisions for the maintainer

The selection was not re-run. Each finding is a decision; the row effects below are for the current yearly rule (open question 1, option b). Under rule 1a (every framework-era card) most of them change membership of a later pack rather than these 20 rows.

1. **Gemini 1.0 and 1.5 appendix cards.** Google DeepMind's index labels appendices of the Gemini 1.0 and 1.5 technical reports, and Gemini Robotics 1.5's report, as model cards; the inventory recorded no card. The Gemini 1.5 card is present in a December 2024 capture. The Gemini 1.0 card section is absent from the December 2023 capture, so it was added later and cannot date a 2023 row. Options: (a) count index-labelled appendix cards, dated by the earliest capture showing them, and re-run Google DeepMind's 2023 and 2024 selection in the next pack; (b) do not count appendices. **Recommendation: a** (this refines open question 7). Rows: a Google DeepMind 2024 row is likely (Gemini 1.5, unless a later 2024 card such as a Gemma card is selected); no 2023 row from Gemini 1.0. Gemini Robotics 1.5 (September 2025) is earlier than Gemini 3 Flash and changes no row; Gemini Robotics-ER 1.5 also needs a population decision (open question 2).
2. **Microsoft Fara-7B.** Its own card reports evaluations and a release date of November 24, 2025, confirmed by Microsoft's announcement. The drafters left Fara out as a research model outside Phi and MAI, but `scope.md` has no such family limit. Options: (a) include it, so Fara-7B, later than Phi-4-mini-flash-reasoning, becomes Microsoft's 2025 row (16 new cells; Fara1.5 repositories inventoried as leads); (b) write a Phi/MAI-only limit for Microsoft into `scope.md`; no row change. **Recommendation: a.** The selection is meant to be mechanical, and the exclusion was never written into the scope.
3. **Muse Spark 1.3 versions.** Meta's September 2, 2026 announcement links the same report URL whose current PDF prints October 23, 2026, so the expression read is a revision. The Muse Spark Open card (October 15, 2026) returned HTTP 401 to the checker. Options: (a) date by first publication (open question 3a), so Muse Spark Open becomes Meta's 2026 row once its card is retrieved, and Muse Spark 1.3 is listed with both dates; (b) keep the printed revision date and the current row. **Recommendation: a**, as for open question 3. The Muse Spark Safety & Preparedness Report, now retrieved (arXiv v1, May 14, 2026), is earlier and changes no row.
4. **Argon tie-breaker.** The Gemini 4 Argon model card and its Safety & Security Report share the month of publication, and the rule gives no tie-breaker. Options: (a) on a same-date tie between documents for one model, take the one the developer labels model card or system card, and list the companion report in the inventory; (b) take the safety report; (c) one row citing both documents. **Recommendation: a.** It is mechanical and keeps one document per row. Rows: none under a; under b or c, Google DeepMind's 2026 cells are redrafted against the report.
5. **o3 Operator report.** Now retrieved; it prints May 23, 2025. Options: (a) record it in the inventory as retrieved, with its date; (b) leave it as not retrievable. **Recommendation: a.** Rows: none, because GPT-5.2-Codex (December 2025) remains OpenAI's 2025 row.

### Checks on this adjudication

- All 20 sources were re-fetched into the ignored cache. Nineteen match the recorded SHA-256 values. The CWM Preparedness Report's recorded address now answers HTTP 403, and Meta's publication page answers HTTP 400 here. `verification.json` therefore lists the 13 CWM quotations as “no cached text”; it does not report them as wrong. The 12 unchanged CWM quotations were found verbatim on 2026-11-02. The checker found item 36's new quotation in the original PDF (matching SHA-256). Here it was confirmed only in the arXiv v2 expression (2605.00932, different bytes). All 292 other quotations, including the new ones for items 31, 96 and 119, were found verbatim.
- `pnpm check:privacy` passed; Prettier on the pack's files and the review note: clean; ESLint on `build.mjs`: clean.

## Maintainer decisions (2026-11-03)

Recorded from [`review/decisions/answers-2026-11-03.md`](decisions/answers-2026-11-03.md) on `main`, answering the decision sheet [`review/decisions/model-cards.md`](decisions/model-cards.md). The maintainer approved the recommendation, as written in the sheet, on each decision below: 2a to 15a (except 13) at about 20:00 Helsinki time ("OK to all your 'easy' suggestions"), and 1a at about 20:20 ("all as recommended").

| Decision                                    | Answer | What it means                                                                                                                                                                                                                                                                                             |
| ------------------------------------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1. Which cards become rows                  | 1a     | Keep these 20 rows as the first pack. The collection's rule: every card that cites the developer's frontier framework or states a determination under it, plus, for each developer, the latest card before its first framework edition. Draft the rest in packs of about eight.                           |
| 2. Where the population ends                | 2a     | Confirm as drafted, count Gemini Robotics-ER 1.5 in, and write the boundary into the scope document.                                                                                                                                                                                                      |
| 3. Which date orders a card                 | 3a     | Date each card by its earliest located publication, treat later revisions as versions of the same row, and show both dates.                                                                                                                                                                               |
| 4. Framework editions found only by a link  | 4a     | Accept, and say "identified by link annotation" in the evidence.                                                                                                                                                                                                                                          |
| 5. Framework editions missing from the data | 5a     | Add the xAI and Meta editions to Compare frameworks in a separate data task; hold the Anthropic Frontier Compliance Framework until it is read.                                                                                                                                                           |
| 6. Who made the release decision (Q15)      | 6a     | Confirm the reading applied at integration.                                                                                                                                                                                                                                                               |
| 7. Google DeepMind's 2023 and 2024 cards    | 7a     | Count an appendix that the developer's own index calls the model card, dated by the earliest archived copy that contains it; re-run Google DeepMind's 2023 and 2024 selection in the next pack.                                                                                                           |
| 8. Repository cards with no printed date    | 8a     | The card-date cell is "not found"; commit dates stay in the background record.                                                                                                                                                                                                                            |
| 9. The 2023 Anthropic row                   | 9a     | Keep it, and record it as a later version of the existing source.                                                                                                                                                                                                                                         |
| 10. o1: web page and PDF                    | 10a    | Register the PDF as its own version of the card when admitting.                                                                                                                                                                                                                                           |
| 11. Documents not yet retrieved             | 11a    | Record the two retrieved documents in the inventory with their dates; add the Sora card, the Grok-1 card and the Muse Spark Open card to the next retrieval list.                                                                                                                                         |
| 12. Quotation limits for two cards          | 12a    | When admitting, paraphrase any further passage from Gemini 3 Flash and MAI-Cyber-1.1-Flash.                                                                                                                                                                                                               |
| 13. GPT-4V's release decision (item 69)     | 13a    | Not found, the checker's reading; the criterion stays as written. Settled without a maintainer decision when the Codex second pass of 2026-11-03 held the checker's reading (`research/model-cards/cross-family-second-pass-2026-11-03.md`; `review/decisions/answers-2026-11-03.md`). Applied in part 2. |
| 14. Microsoft's Fara-7B                     | 14a    | Include it. Under 1a, Fara-7B enters a later pack only if its card cites Microsoft's framework.                                                                                                                                                                                                           |
| 15. Two Gemini 4 Argon documents, one month | 15a    | On a same-date tie, take the document the developer calls the model card or system card, and list the other in the inventory.                                                                                                                                                                             |

The admission runs in two parts. Part 1 (no schema change) is recorded in [`model-cards-admission-1-2026-11-03.md`](model-cards-admission-1-2026-11-03.md). Part 2 (the schema change, the cell records and the collection, a minor release) is recorded in [`model-cards-admission-2-2026-11-04.md`](model-cards-admission-2-2026-11-04.md).

## Next step

The maintainer answers the decision sheet (`review/decisions/model-cards.md` on its own branch): the open questions above, item 69 and the inventory decisions in the adjudication section. No admission task before then.
