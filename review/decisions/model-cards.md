# Decision sheet: Model cards compared

The pack compares what 20 published system cards, model cards and safety reports (Anthropic, Google DeepMind, Meta, Microsoft, OpenAI, xAI, 2023–2026) say on sixteen questions, such as dangerous-capability testing, outside testers and the release decision; every answer quotes the card or records the search. The decision that matters most is **1, which cards become rows**: it decides whether the collection covers every card issued under a developer's safety framework or one card per developer per year.

Source: review note `review/model-cards-pack-2026-11-02.md` on branch `model-cards-pack`, section "Open questions, with recommendations" (numbers below match it). Files in `research/model-cards/` on the same branch.

**State.** Nothing is admitted. The cross-family check has not yet run: that is a check by a model from a different maker (here GPT, run through Codex) of what Claude drafted. It runs after these answers and before anything enters the dataset.

## Decisions

### 1. Which cards become rows

The current rule takes, for each developer and year, the latest card that reports its own tests. This picks some small or specialised models (Phi-2, Phi-4-mini-flash-reasoning, MAI-Cyber-1.1-Flash, Gemini 3 Flash, the GPT-5.2-Codex addendum) and leaves out most cards issued under a framework. The roadmap item asks for "each frontier model release".

- **a.** Keep these 20 rows as the first pack. Set the collection's rule to: every card that cites the developer's frontier framework or states a determination under it, plus, for each developer, the latest card before its first framework edition. Draft the rest in packs of about eight.
- **b.** Keep the one-card-per-developer-per-year rule as the collection's rule.
- **c.** Another rule (say which).

_Recommendation: a._ It matches "each frontier model release" and still selects mechanically, not by perceived importance.

- a: readers see every framework-era card, in batches; the table grows over several releases.
- b: readers see 20 rows now, with small models standing for some years.
- c: depends on the rule.

### 2. Where the population ends

Drafters included Gemma, Gemini Robotics, Phi and image-input models (GPT-4V). They left out image-generation models, safety classifiers (Llama Guard, Prompt Guard), screen-reading models, research checkpoints, and GPT-Rosalind-6 (its card says it uses GPT-6 Astra's weights).

- **a.** Confirm as drafted and write the boundary into the scope document.
- **b.** Change it (say which kinds go in or out).

_Recommendation: a._ Under decision 1a most of these cases no longer arise.

- a: the "How we searched" note states the boundary.
- b: rows may be added or removed.

### 3. Which date orders a card

Drafters used the date printed on the copy they read. So Gemini 3 Pro (released November 2025, "Last Updated: May 2026") counts as 2026, and Meta's 2026 row is a report printed 23 October 2026 rather than the Muse Spark Open card of 15 October 2026.

- **a.** Date each card by its earliest located publication, treat later revisions as versions of the same row, and show both dates.
- **b.** Keep the date printed on the copy read.

_Recommendation: a._ A revision date otherwise moves a card into a later year.

- a: each row shows first publication and latest revision; under 1b, Meta's 2026 row changes.
- b: rows carry one date, which may be a revision date.

### 4. Framework editions found only through a link

Claude Opus 4.5, GPT-5.2-Codex and GPT-6 Luna name their framework without an edition in the visible text; the edition is the target of a link in the PDF. The quotation check cannot verify a link.

- **a.** Accept, say "identified by link annotation" in the evidence, and have Codex confirm the link targets.
- **b.** Record the framework as named without an edition.

_Recommendation: a._ The link is part of the card; saying how the edition was found keeps it inspectable.

- a: these three rows link to a specific framework edition.
- b: these rows show no edition.

### 5. Framework editions missing from the dataset

Three cards cite editions the dataset lacks: xAI's Risk Management Framework (dated 20 August 2025), Meta's Superintelligence Scaling Framework v2.1 (October 2026), and Anthropic's "Frontier Compliance Framework".

- **a.** Add the xAI and Meta editions to Compare frameworks in a separate data task; hold the Anthropic document until it is read, since it may be a compliance document rather than a new edition.
- **b.** Add all three.
- **c.** Add none for now.

_Recommendation: a._ Only documents that have been read should become framework editions.

- a: two more editions appear in Compare frameworks and the cards link to them.
- b: three appear, one not yet read.
- c: these rows show the framework without an edition link.

### 6. Who made the release decision (question 15)

The drafting session applied one reading across all cards: a developer's "we" counts as the company; "we therefore release" without a described decision counts as "partly".

- **a.** Confirm.
- **b.** Change the reading (say how).

_Recommendation: a._ It was applied consistently and changed only two cells.

- a: no change.
- b: some question-15 cells change.

### 7. Google DeepMind's 2023 and 2024 cards

Google DeepMind's own model-card index labels appendices of the Gemini 1.0 and 1.5 technical reports as the model cards.

- **a.** Count an appendix that the developer's own index calls the model card.
- **b.** Do not count appendices; Google DeepMind has no row for 2023–2024.

_Recommendation: a._ It follows the developer's own label.

- a: two Google DeepMind rows are added in the next pack.
- b: the table starts Google DeepMind in 2025.

### 8. Cards on GitHub or Hugging Face with no printed date

These print no date. Commit dates were recorded but not counted as the card's date.

- **a.** Confirm: the card-date cell is "not found"; commit dates stay in the background record.
- **b.** Use the commit date as the card date.

_Recommendation: a._ A commit date dates a file change, not the card's publication.

- a: these rows show "not found" for card date.
- b: these rows show a date, marked as a commit date.

### 9. The 2023 Anthropic row

It is the November 2023 re-issue of the Claude 2 card with a Claude 2.1 appendix, a later version of a source the dataset already holds. Because it postdates Anthropic's first framework, the framework questions are "not found" rather than "not applicable".

- **a.** Keep it, and record it as a later version of the existing source.
- **b.** Replace it with the original Claude 2 card.

_Recommendation: a._ It is the latest 2023 card and the version that was read.

- a: no change to the table.
- b: the 2023 framework cells become "not applicable".

### 10. o1: web page and PDF

The dataset holds the o1 card as a web page; the pack cites the PDF, which marks a section added on 19 December 2024.

- **a.** Register the PDF as its own version of the card when admitting.
- **b.** Cite the web page only.

_Recommendation: a._ The quotes come from the PDF.

- a: the o1 row cites the PDF with its own date.
- b: some o1 quotes may need re-checking against the web page.

### 11. Documents that could not be retrieved

Meta's Muse Spark Safety & Preparedness Report, OpenAI's Sora and o3 Operator cards, and xAI's Grok-1 card.

- **a.** Add them to the next Codex retrieval list; they do not hold up the cross-family check.
- **b.** Leave them out.

_Recommendation: a._ The Meta report could change Meta's 2026 row.

- a: possibly one changed row and an xAI 2023 row later.
- b: the "How we searched" note lists them as not retrieved.

### 12. Quotation limits for two cards

Gemini 3 Flash and MAI-Cyber-1.1-Flash are close to the number of words Selekoa quotes from one source.

- **a.** When admitting, paraphrase any further passage from these two cards.
- **b.** Raise the limit for them.

_Recommendation: a._ It keeps the general rule.

- a: later cells for these cards show a paraphrase with its locator.
- b: needs a change to the editorial policy.

---

Reply with, for example: 1a 2a 3a 4a 5a 6a 7a 8a 9a 10a 11a 12a
