# Laws compared: scope

Written before drafting, 2026-11-01. A candidate research pack for the roadmap's interface item "Laws compared" (`docs/roadmap.md`, interface item 6): laws as rows, questions as columns, every cell quoting the law. Nothing here changes `data/`, the application, the schema or a release.

## Question

What does each binding government instrument that addresses developers of frontier or general-purpose AI models say on the same fifteen questions: who is covered and by what threshold; which duties apply (safety framework, its publication, risk evaluation, outside assessment, incident reporting, model information, whistleblower protection); the dates of adoption, entry into force and application; penalties; the enforcer; and the instrument's relation to developers' own frameworks and to codes of practice? The questions and their criteria are in [questions.json](questions.json).

## Unit of record

One cell per instrument × question. A cell is `stated`, `partly`, `not-found`, `not-applicable` or `not-retrieved`. Stated and partly cells quote the instrument's official text with its article, section or page. Not-found cells record the sections read, the terms searched and the passages set aside. The criteria follow the Compare frameworks collection (`src/reading/framework-comparison.ts`).

## Instruments

Start from the instruments the dataset already records on the frameworks-and-law page (`src/reading/frameworks-and-law.ts`), keep those that are binding and place duties on developers or providers of frontier or general-purpose models, and record every other instrument on that page as excluded, with the reason. Add others only if they are binding and address frontier developers; record each candidate considered and not added.

Rows (fixed order: jurisdiction, then date):

1. EU AI Act (Regulation (EU) 2024/1689), general-purpose AI provisions, read with the amending Regulation (EU) 2026/1744 where it touches them.
2. General-Purpose AI Code of Practice, Safety and Security chapter: included as the Act's stated means of compliance, marked as not binding in itself.
3. California SB 53 (Chapter 138, Statutes of 2025).
4. New York RAISE Act as signed (Chapter 699 of 2025).
5. New York RAISE Act as amended (Chapter 96 of 2026).
6. China: Interim Measures for generative AI services (2023).
7. China: Measures for labelling AI-generated synthetic content (2025).
8. US federal: Executive Order 14110, section 4.2 (2023; revoked 2025), as a historical row.
9. US federal: BIS Framework for AI Diffusion (interim final rule, 2025; rescission announced).

The United Kingdom has no row: the pack records, with its sources, that no binding instrument addressing frontier developers was located.

## Rules

- Official published text only, with its locator. Law-firm and press explainers are leads, never evidence, and are not cited.
- Dates keep kind and precision. Enactment, signature, entry into force and application are different events. Announced stays announced. Proposed and vetoed bills are recorded as such, never as law.
- A requirement is never evidence that a developer complied, or that a named developer falls within a category.
- No motives, no loaded words; no instrument is characterised.
- Each source records an official archive capture where the Internet Archive's availability service lists one, marked unchecked, or says that none is listed.
- Biological and chemical provisions are recorded at policy level only.
- Quotation: each quote at most 50 words (Chinese 100 characters); per-source budgets under the editorial policy, counting the dataset's existing quotes from the same expression. Dataset quotes are reused verbatim where they meet a criterion. Where a budget is already spent, the overrun is reported in `verification.json` and raised for the maintainer, not hidden.

## Method

1. Retrieval by direct HTTP into the ignored `.local/laws-compared/` cache (`tools.mjs fetch`); SHA-256 and status recorded in `drafts/sources.json` (`make-sources.mjs`).
2. Four fresh-context drafting passes by source group (EU; California and New York; China; US federal) to [drafts/BRIEF.md](drafts/BRIEF.md) and [drafts/FORMAT.md](drafts/FORMAT.md). The integrator drafts instrument standing, exclusions and the UK finding.
3. Mechanical check of every quotation against the retrieved text and of the budgets (`verification.json`).
4. Same-family fresh-context audit of at least 40 cells, random and targeted (`audit.md`).
5. Blind cross-family brief with the drafter's verdicts in a separate file.
