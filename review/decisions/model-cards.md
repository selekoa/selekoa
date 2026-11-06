# Decision sheet: Model cards compared

The pack compares what 20 published system cards, model cards and safety reports (Anthropic, Google DeepMind, Meta, Microsoft, OpenAI, xAI, 2023–2026) say on sixteen questions, such as dangerous-capability testing, outside testers and the release decision. Every answer quotes the card or records the search. The decision that matters most is **1, which cards become rows**. It decides whether the collection covers every card issued under a developer's safety framework or one card per developer per year, and it governs how much decisions 7, 14 and 15 matter.

Source: review note `review/model-cards-pack-2026-11-02.md` on branch `model-cards-apply`, sections "Open questions, with recommendations" (numbers 1–12 below match it) and "Adjudication of the cross-family check (2026-11-03)" (decisions 13–15). The pack's files are in `research/model-cards/` on the same branch.

**State.** Nothing is admitted. The cross-family check has run. A model from a different maker (OpenAI's GPT, run through Codex) checked 130 items on 2026-11-03: 90 cells answered blind, then compared, and 40 of the pack's cells checked directly. Six chemical and biological items were excluded, and the other 190 cells were not cross-family checked. A Claude session then adjudicated the findings: the corrections below are applied, one disagreement is left to you (decision 13), and the inventory findings are folded into decisions 3, 7, 11, 14 and 15.

## Applied after the check (no decision needed)

- **Applied.** Two quotations repaired so they are verbatim: Claude 3.5 Haiku/Sonnet autonomy (item 96) and o1 framework link (item 119).
- **Applied.** Gemini 3 Flash autonomy (item 101): the "not found" note now says it concerns dangerous-capability tests only; the card's product benchmarks are noted separately.
- **Applied.** Gemini 4 Argon safeguards (item 102): "stated" becomes "partly", because no passage names a safeguard.
- **Applied.** Grok 4.7 limits (item 130): ongoing monitoring is no longer listed as a limit of the tests.
- **Applied.** Llama 3.3 autonomy (item 31): "not found" becomes "partly". The card reports a test of the Llama 3 family as autonomous cyber agents, with no outcome.
- **Applied.** CWM safeguards (item 36): "not found" becomes "partly". The report describes an honesty intervention without tying it to the framework determination.
- **Left as drafted.** The six excluded items (30, 45, 52, 99, 112, 126) are marked "not cross-family checked".
- **Confirmed by the check.** The framework-edition link targets for Claude Opus 4.5, GPT-5.2-Codex and GPT-6 Luna (see decision 4), and archive captures for 8 of the 20 cards.

## Decisions

### 1. Which cards become rows

The current rule takes, for each developer and year, the latest card that reports its own tests. This picks some small or specialised models (Phi-2, Phi-4-mini-flash-reasoning, MAI-Cyber-1.1-Flash, Gemini 3 Flash, the GPT-5.2-Codex addendum) and leaves out most cards issued under a framework. The roadmap item asks for "each frontier model release".

- **a.** Keep these 20 rows as the first pack. Set the collection's rule to: every card that cites the developer's frontier framework or states a determination under it, plus, for each developer, the latest card before its first framework edition. Draft the rest in packs of about eight.
- **b.** Keep the one-card-per-developer-per-year rule as the collection's rule.
- **c.** Another rule (say which).

_Recommendation: a._ It matches "each frontier model release" and still selects mechanically, not by perceived importance.

- a: readers see every framework-era card, in batches; the table grows over several releases. Decisions 7, 14 and 15 then affect later packs rather than these 20 rows.
- b: readers see 20 rows now, with small models standing for some years. Decisions 3, 7, 14 and 15 may each change a row.
- c: depends on the rule.

### 2. Where the population ends

Drafters included Gemma, Gemini Robotics, Phi and image-input models (GPT-4V). They left out image-generation models, safety classifiers (Llama Guard, Prompt Guard), screen-reading models, research checkpoints, and GPT-Rosalind-6 (its card says it uses GPT-6 Astra's weights). The check adds one case: Gemini Robotics-ER 1.5, which outputs text, has a card labelled by Google DeepMind's index.

- **a.** Confirm as drafted, count Gemini Robotics-ER 1.5 in (it is a text-output model), and write the boundary into the scope document.
- **b.** Change it (say which kinds go in or out).

_Recommendation: a._ Under decision 1a most of these cases no longer arise.

- a: the "How we searched" note states the boundary.
- b: rows may be added or removed.

### 3. Which date orders a card

Drafters used the date printed on the copy they read. So Gemini 3 Pro (released November 2025, "Last Updated: May 2026") counts as 2026. The check found that Meta's announcement of Muse Spark 1.3 on 2 September 2026 links the same report that now prints 23 October 2026, so the copy read is a revision.

- **a.** Date each card by its earliest located publication, treat later revisions as versions of the same row, and show both dates.
- **b.** Keep the date printed on the copy read.

_Recommendation: a._ A revision date otherwise moves a card into a later year or ahead of a newer card.

- a: each row shows first publication and latest revision. Under 1b, Meta's 2026 row becomes the Muse Spark Open card (15 October 2026), which still has to be retrieved (it answered HTTP 401 to the checker).
- b: rows carry one date, which may be a revision date; Meta's 2026 row stays.

### 4. Framework editions found only through a link

Claude Opus 4.5, GPT-5.2-Codex and GPT-6 Luna name their framework without an edition in the visible text; the edition is the target of a link in the PDF. The cross-family check read the link targets and confirmed them: RSP version 2.2 for Opus 4.5, Preparedness Framework version 2 for the two OpenAI cards.

- **a.** Accept, and say "identified by link annotation" in the evidence.
- **b.** Record the framework as named without an edition.

_Recommendation: a._ The link is part of the card, and a second model family has now read it.

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

The drafting session applied one reading across all cards: a developer's "we" counts as the company; "we therefore release" without a described decision counts as "partly". The check agreed on every question-15 cell it checked except GPT-4V (decision 13).

- **a.** Confirm.
- **b.** Change the reading (say how).

_Recommendation: a._ It was applied consistently, and in the cells it checked the check found no other case where it misleads.

- a: no change.
- b: some question-15 cells change.

### 7. Google DeepMind's 2023 and 2024 cards

Google DeepMind's own model-card index labels appendices of the Gemini 1.0 and 1.5 technical reports as the model cards. The check found the Gemini 1.5 card in a December 2024 archived copy. The Gemini 1.0 card section is missing from the December 2023 copy: it was added later and cannot date a 2023 card.

- **a.** Count an appendix that the developer's own index calls the model card, dated by the earliest archived copy that contains it, and re-run Google DeepMind's 2023 and 2024 selection in the next pack.
- **b.** Do not count appendices; Google DeepMind has no row for 2023–2024.

_Recommendation: a._ It follows the developer's own label without backdating a later addition.

- a: likely a Google DeepMind 2024 row (Gemini 1.5, unless a later 2024 card is selected); no 2023 row.
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

### 11. Documents not yet retrieved

The check retrieved two of the four: Meta's Muse Spark Safety & Preparedness Report (arXiv, May 2026) and OpenAI's o3 Operator addendum (printed 23 May 2025). Neither changes a row, because each is earlier than the card already chosen for its year. Still not retrieved: OpenAI's Sora card, xAI's Grok-1 card, and now the Muse Spark Open card (HTTP 401).

- **a.** Record the two retrieved documents in the inventory with their dates, and add the remaining three to the next retrieval list.
- **b.** Leave the remaining three out.

_Recommendation: a._ The Muse Spark Open card is needed if 3a and 1b are chosen.

- a: the inventory shows the two new dates; possibly one changed Meta row and an xAI 2023 row later.
- b: the "How we searched" note lists them as not retrieved.

### 12. Quotation limits for two cards

Gemini 3 Flash and MAI-Cyber-1.1-Flash are close to the number of words Selekoa quotes from one source.

- **a.** When admitting, paraphrase any further passage from these two cards.
- **b.** Raise the limit for them.

_Recommendation: a._ It keeps the general rule.

- a: later cells for these cards show a paraphrase with its locator.
- b: needs a change to the editorial policy.

### 13. GPT-4V's release decision (cross-family disagreement, item 69)

The card says how OpenAI "prepared the vision capabilities of GPT-4 for deployment" and that GPT-4V "is the latest capability we are making broadly available". It describes no decision. The pack reads this as "partly"; the checker reads it as "not found". The drafting family may not overrule the checker, so the cell stays "partly", marked †, until you decide. The criterion's partly cases are: a release "stated as following from an assessment without a decision being described ("we therefore release")", a decision described without any maker, or a maker named only for a capability or safeguards determination.

- **a.** Not found (the checker's reading). Availability and deployment preparation are none of the criterion's partly cases.
- **b.** Partly (the pack's reading), and widen the criterion so that a stated release with described deployment preparation counts as "partly".

_Recommendation: a._ The card does not say the release follows from an assessment, and the pack's own note says no decision is described. Read as written, the criterion supports the checker.

- a: one question-15 cell changes to "not found"; the criterion stays as it is.
- b: no cell changes now, but the wider criterion may move other "not found" question-15 cells to "partly" on re-reading.

### 14. Microsoft's Fara-7B

Fara-7B's own card reports its own evaluations and a release date of 24 November 2025, which Microsoft's announcement confirms. The drafters left Fara out as a research model outside the Phi and MAI families, but the scope document has no such limit.

- **a.** Include it. Fara-7B, being later, replaces Phi-4-mini-flash-reasoning as Microsoft's 2025 row, and the Fara 1.5 repositories go on the next search list.
- **b.** Write a "Phi and MAI only" limit for Microsoft into the scope document.

_Recommendation: a._ The selection is meant to be mechanical, and the family limit was never part of the written scope.

- a: under 1b, Microsoft's 2025 row changes (16 new cells to draft and check); under 1a, Fara-7B enters a later pack only if its card cites Microsoft's framework.
- b: no row change; the "How we searched" note states the limit.

### 15. Two Gemini 4 Argon documents in the same month

The Gemini 4 Argon model card and its Safety & Security Report were published in the same month, and the rule has no way to choose between them.

- **a.** When two documents for one model share the latest date, take the one the developer calls the model card or system card, and list the other in the inventory.
- **b.** Take the safety report.
- **c.** One row citing both documents.

_Recommendation: a._ It is mechanical and keeps one document per row.

- a: no change to the table.
- b or c: Google DeepMind's 2026 cells are redrafted against the report and checked again.

---

Reply with, for example: 1a 2a 3a 4a 5a 6a 7a 8a 9a 10a 11a 12a 13a 14a 15a
