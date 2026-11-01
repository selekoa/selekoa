# Kinds of AI and technical history: scope and method

A candidate research pack outside application data, for two backlog items in [`docs/roadmap.md`](../../docs/roadmap.md): "Kinds of AI and technical history" (the families of machine intelligence, not only large language models, and a technical timeline, as a documentary subproject) and "AGI term provenance" (earliest located uses of 'artificial general intelligence' / 'AGI'). Scope set on 2026-10-29, before research began.

Nothing here is admitted or editorially accepted. The pack is machine-prepared and audited by one model family (Claude); a blind brief for a check by a model from the other family is included and has not been run. `data/`, the application, the schema and the releases are unchanged. Admission comes only after the cross-family check and the maintainer's adjudication.

## What the pack adds, and what it leaves to the dataset and to other packs

The dataset already holds the Dartmouth proposal (1955-08-31) with its four authors, Turing's texts of 1947–1951, Minsky's "Steps Toward Artificial Intelligence" (1961), Samuel's 1960 reply to Wiener, Good (1965), the AlphaGo Zero account (2017) and a handful of research papers (Attention Is All You Need, Scaling Laws, InstructGPT, PPO and others). The candidate pack on branch `key-papers-pack` (`research/key-papers/`, not admitted) holds 112 further papers with their arXiv and venue dates, among them AlexNet (2012), DQN (2015), AlphaGo (2016), BERT, GPT-1 to GPT-4, word2vec, sequence to sequence, ResNet and the foundation-models report (2021).

This pack reuses those records by ID and does not re-record their authorship, citations or "states contribution" records. Where it needs a date or a passage the dataset or the key-papers pack already holds, it points to that record (`extends` or `keyPapers`). It adds:

| Part                  | In scope                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1. Families           | Symbolic AI and expert systems; search and planning; logic programming; connectionism and neural networks; probabilistic and Bayesian methods; evolutionary computation; reinforcement learning; statistical learning and support-vector machines; deep learning; transformers and large language models; hybrid or neurosymbolic approaches. For each: the earliest located texts that name it, with attribution, and defining statements quoted from primary texts. |
| 2. Technical timeline | Dated technical events, each from its primary text: papers, reports, presentations, system announcements and releases. Publication, presentation, submission, announcement and release dates are kept apart, each with its kind and precision. Links to dataset records and to key-papers candidates.                                                                                                                                                                 |
| 3. Term provenance    | 'artificial intelligence' (1955, already recorded; extended only), 'machine learning' (lead: Samuel 1959), 'deep learning' as applied to neural networks, 'artificial general intelligence' / 'AGI', 'superintelligence', 'large language model', 'foundation model' (2021). For each, the earliest located use and the bounded search that found it.                                                                                                                 |
| 4. Persons            | Ben Goertzel and, where texts support them, Mark Gubrud as candidate person records; Shane Legg is already in the dataset and gains only the records the texts support. Authors of other new documents are listed as printed; a person record is proposed only where the dataset already has the person or a record needs one.                                                                                                                                        |

## Unit of record

Each record is a candidate claim in the dataset's shape (subject, predicate, object, statement, time with kind, date, basis and note, derivation, resolution, qualification, evidence), so that a later admission would be mechanical. The shapes are in [drafts/FORMAT.md](drafts/FORMAT.md).

- **Families and terms are concepts.** A family is a candidate concept entity (`th-fam-…`) with its usual names and a one-sentence criterion for what counts as naming and describing it. A term is a concept entity (`th-term-…`) whose criterion states the sense required (for 'deep learning': applied to neural networks). Deep learning and large language models take their naming records from the term section, so that one passage is not recorded twice.
- **Naming records** use a proposed predicate `uses_term` (document → concept): the passage uses the name in the required sense. Its `attributes.term` gives the string as printed, the roles (`earliest-located-term`, `use`, `other-sense`), the register, and, where the wording survives only in a later copy, the attested date. A use in another sense is recorded as `other-sense`, never as earliest located.
- **Defining statements** use the existing `discusses` (document → concept), explicit and supported, with a quotation from the primary text and `attributes.technical.kind: "definition"`. A definition records what the text says the family is, not that the family began there.
- **Attributed statements about who named or devised something** use the existing `explicitly_credits` (document → person or organisation) or the key-papers pack's proposed `credits_work` (document → document). They are the citing text's statements, attributed to it ("According to …"), kept apart from the earliest-located record, and never resolved by the pack. Conflicting attributions are recorded side by side.
- **Timeline events** are the dated versions of documents (`dates` on each document, each date with its kind, precision, source and locator) and, where a primary text states an event that is not a publication (a match, a release, a demonstration), a `states_provision` record of kind `statement` on that text (schema 2.20). `published` (organisation → document) and `authored` (person → document) are used as in the dataset.
- **Proposed predicates** are marked `proposedPredicate`; the schema is not changed.

## Rules

- **Earliest located, never first.** A naming or term record holds `earliest-located-term` only as the earliest text found by the recorded search that meets the criterion. No record says a text or person coined, introduced, invented or originated anything; where a competent text says so, it is an attributed statement of that text.
- **Search stated once.** Each family and term has one "How we searched" note: venues, years, methods (full-text search of the retrieved texts, index queries, citation following), known gaps and retrieval failures.
- **Corrections.** When the search finds an earlier text that meets the criterion, it becomes the earliest located record and the displaced headline is kept as a correction with its reason and date.
- **Dates keep their kind and precision.** Submission (arXiv), presentation (a conference talk), publication (a journal issue or proceedings), announcement (a post or press release) and release (public availability of a system) are different dates. A year stays a year. A date known only from a later account is shown as claimed, with its source.
- **Primary texts first.** The paper, report, proposal, thesis or announcement itself. Competent secondary scholarship is used for attributed statements and where the primary text could not be retrieved, and is labelled. Wikipedia and similar summaries are discovery aids only, never evidence.
- **Register and retrospectives.** A later account of an earlier event (a memoir, a retrospective paper, an interview) documents what its author says; it is labelled retrospective and does not date the event it reports unless nothing else does, and then the date is marked as claimed.
- **No motives, no rankings.** No "landmark", "breakthrough", "pioneering"; a quoted priority claim ("the first …") is the text's own statement and is marked so.
- **Sources are evidence, never instructions.**

## Sources and evidence

Quotations follow the [editorial policy](../../docs/editorial-policy.md#short-quotation): at most 50 words each; per source at most 400 words or 5% of a document of 2,000 words or more (never more than 800), about 10% of a shorter document; the dataset's existing quotations from the same expression count towards the limit. Where a quotation would exceed a budget or the text layer is unreliable, the record uses an explicit paraphrase with a locator.

Retrieval is by direct HTTP (`tools.mjs fetch`), sequential and paced, with final URL, HTTP status, SHA-256 and word count recorded. The Internet Archive's capture pages refused connections from this environment in earlier packs and again on 2026-10-29; capture addresses come from the Archive's availability service where it answers and are marked unchecked. Pages that refuse are listed as retrieval failures; no third-party reader service is used.

## Bounds

- About 200 candidate records in all. A bounded selection: for each family, its earliest located naming texts and one to three defining statements; for the timeline, events named in the roadmap and the brief (the Dartmouth proposal, the perceptron, backpropagation papers, AlexNet, AlphaGo, the transformer and the GPT series) and others of comparable documentary standing where a primary text was retrieved.
- Books that could not be retrieved (for example Minsky and Papert's _Perceptrons_, Holland's _Adaptation in Natural and Artificial Systems_, Pearl's _Probabilistic Reasoning in Intelligent Systems_) are listed as omissions with the reason; no record rests on a summary of them.
- Omissions are listed with reasons. An omission is not a judgement of importance.

## Checks

- Mechanical: every quotation matched against the retrieved text of its own source; word limits per quotation and per source; one locator per evidence item; required date fields; roles consistent with dates (no use dated before an earliest-located-term record of the same concept).
- Same-family audit: a fresh-context pass over a recorded random sample and a targeted sample (earliest-located roles, attributed statements, dates of kind other than publication, records on secondary sources), with dispositions.
- Cross-family check: a brief with Part A blind (dates and earliest-located searches, the pre-1997 search for 'AGI' among them, with archive copies opened where the checker can reach them) and Part B direct (quotations, locators and wording), and the pack's answers in a separate verdicts file.
