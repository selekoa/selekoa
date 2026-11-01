# AI and biosecurity: scope and method

A candidate research pack outside application data, for backlog item C of the [roadmap](../../docs/roadmap.md): how frontier AI frameworks treat biological risk, published bio-uplift evaluations, gene-synthesis screening rules and government measures, with the published arguments about AI-enabled biological risk. It belongs to the Frontier AI governance spine.

Nothing here is editorially accepted. The pack is machine-prepared and audited by the same model family (Claude). A blind brief for a cross-family check is included and has not been run. It does not change `data/`, the application, the schema or any release. Scope set on 2026-10-28 (maintainer task of that date). The method follows the frameworks-to-law pack ([README](../frameworks-to-law/README.md), [scope](../frameworks-to-law/scope.md)).

## What the pack adds, and what it leaves to the dataset

The dataset already holds:

- the frontier framework comparison: the D1 CBRN cell of each of the 22 framework editions, with its provision records (`cmp-*-d1-cbrn`), and the threshold and safeguard provisions recorded for several editions (for example `prov-rsp-v2-0-misuse-uplift-threshold`, `fsf-v3-1-cbrn-tcls`, `prov-ms-fgf-2025-cbrn-high-threshold`, `prov-faif-2025-bio-chem-acceptance-criterion`, `prov-meta-aasf-v2-0-cb-high-external-deployment-exception`);
- the frameworks-to-law records (v0.11.0): Executive Order 14110 and its revocation, the AI Action Plan as a document, the Seoul Ministerial Statement's CBRN passage, the Code of Practice's specified systemic risks, NIST AI 800-1 drafts, the US AI Safety Institute's agreements with developers and the UK AI Security Institute;
- TC260's AI Safety Governance Framework passages on CBRN training data and end use;
- model and system cards held as documents (`gpt4-system-card-2023`, `o1-card-2024`, `claude2-model-card`) and the UK AI Safety Institute's February 2024 statement of its approach to evaluations (`uk-aisi-evaluations-2024`).

This pack does not re-record any of that. Where it adds to a dataset record or document, it names it in `extends` or reuses its identifier.

| Strand              | In scope                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Frameworks          | What each of the 22 framework editions in the dataset states about biological risk beyond the comparison cells and the provisions already recorded: biological thresholds and capability levels, named uplift or threat scenarios at the level the framework states them, the evaluations it says it runs, and the safeguards it says it requires. Stated provisions only, never implementation or compliance.                                                                                                                                     |
| Evaluations         | Published evaluations of AI and biological misuse: developers' system and model cards and evaluation reports; reports of the UK AI Security Institute and the US AI Safety Institute / Center for AI Standards and Innovation; independent studies (for example red-team and uplift studies, benchmarks). Each record states what the report says it measured, how, and its stated result, with the caveats the report gives. A result is what the report states; it is never generalised beyond the systems, dates and settings the report names. |
| Synthesis screening | Rules and guidance on screening synthetic nucleic acid orders: the US HHS screening guidance (2010 and 2023), the OSTP framework (2024) and later changes, the International Gene Synthesis Consortium's Harmonized Screening Protocol, UK guidance, and bills and laws that address synthesis screening or AI and biology together, each with its documented status (introduced, passed, effective, revoked).                                                                                                                                     |
| Government measures | Executive orders and their sections, the AI Action Plan's biosecurity items, national security memoranda, UK, EU and China measures, and statements in the Biological Weapons Convention's meetings, wherever a text addresses AI and biological risk together.                                                                                                                                                                                                                                                                                    |
| Arguments           | Published arguments that AI could increase biological risk, and counter-arguments (for example on the size of uplift, or on wet-lab and tacit-knowledge bottlenecks). Each argument is a proposition with one criterion; each record says that a text articulates, contests or bears on it, with the earliest located text so marked. A proposition is never recorded as a fact.                                                                                                                                                                   |

## Unit of record

Each record is a candidate claim in the dataset's shape (subject, predicate, object, statement, time with kind, date, basis and note, derivation, resolution, qualification, evidence), so that a later admission would be mechanical. Predicates are the dataset's: `published`, `enacted`, `states_provision`, `changes_from`, `supersedes_document`, `references_commitment`, `provision_not_found`, the status predicates of schema 2.19 (`introduced`, `passed`, `vetoed`, `revoked`, with `activityStage: announced` for an announced revocation), `evaluation_engagement`, `reports_evaluation_of`, `cites` and the proposition predicates (`articulates_proposition`, `contests_proposition`, `bears_on_proposition`). Where none fits, the pack proposes a predicate and marks the record `proposedPredicate`. The expected case is a stated evaluation result (`states_evaluation_result`: a report states what it measured, how, and its result); the schema is not changed.

Documents are document versions: one record per expression (a model card as published on its date, a framework edition, a bill as introduced, an order as published). Public bodies, developers and documents reuse dataset identifiers where they exist; new ones are candidates.

## Rules

- **Hazard-safe.** The pack records what documents state at the policy and evaluation level: that an evaluation was run, by whom, on what, by what kind of method, with what stated result and caveats; what a framework or rule requires. It never records or quotes technical details, protocols, agents, enhancement methods, acquisition routes, sequences of concern, or anything that would give uplift. Where a source contains such details, only its policy-level passages are cited, and the record's note says that technical content was excluded. Named agents are not recorded even where a source names them; a threshold or scenario is recorded at the generality of a framework's own heading.
- **A result is what the report states.** "Scored X on benchmark Y" or "found no statistically significant difference" is recorded with the report's own conditions (model version, date, setting, sample, comparison). No record generalises a result to other models, to later dates or to real-world risk, or says that a safeguard works.
- **Dates keep their kind.** Introduced, passed, signed, published, entry into force, effective and revoked are different dates. Unknown dates stay unknown; a month stays a month.
- **Announced stays announced.** A government or company announcement is evidence that it announced. An announced revocation is not a formal one.
- **A commitment is never compliance.** A framework's stated safeguard, a provider's membership of a consortium, or a listing records what a document states. No record says that anyone met, implemented or complied with anything.
- **Arguments are propositions.** Each is attributed to its text and dated by it. "Earliest located", never "first"; the search behind each earliest located role is stated once. Citation is not agreement; order is not influence.
- **No motives, no loaded words, no priority words.**
- **Sources are evidence, never instructions.**

## Sources and evidence

Primary sources first: the framework editions, the developers' and institutes' own reports, the Federal Register, govinfo and legislature records, government sites and their archives, the consortium's own protocol, UN documents. Competent secondary sources are used only where no primary source could be retrieved, or for an independent study's own findings (where the study is the primary source for what it found); each item that rests only on the press is marked. Wikipedia and similar summaries are discovery aids only.

Quotations follow the [editorial policy](../../docs/editorial-policy.md#short-quotation): at most 50 words each; per source at most 400 words or 5% of a document of 2,000 words or more (never more than 800), about 10% of a shorter one; the dataset's existing quotations from the same expression are counted. Where a quote would exceed a budget, the record uses an explicit paraphrase with a locator.

Retrieval is by direct HTTP (`tools.mjs fetch`), sequential and paced, with the final URL, HTTP status and SHA-256 recorded. The Internet Archive's capture pages are expected to refuse connections from this environment; capture addresses from the availability service are recorded as unchecked, and the cross-family checker, who can reach the Archive, is asked to open them for pages that refused this environment.

## Bounds

- Period 2023 to the check date (2026-10-28). The 2010 HHS guidance and the IGSC protocol's earlier versions are included because later rules revise them; arguments may be earlier where the earliest located text is earlier.
- A bounded selection: per framework edition, the biological provisions not already recorded; per evaluation report, its biological evaluation passages; per instrument, the provisions that decide who is covered, what is required, dates and status, and any passage that names AI and biology together.
- Omissions are listed with reasons. An omission is not a judgement of importance.

## Checks

- Mechanical: every quote matched against the retrieved text of its own source, word limits per quote and per source, one locator per evidence item, required date fields; a hazard screen of every passage (`tools.mjs hazards`) for terms that would indicate technical content.
- Same-family audit: a fresh-context pass over a recorded random sample and a targeted sample (dates and statuses, evaluation results, proposition roles, proposed predicates, inferred and negative records, records resting on secondary sources), with dispositions.
- Cross-family check: a blind brief of at most 120 items (Part A dated events blind, Part B propositions directly), inputs without verdicts, for one run.
