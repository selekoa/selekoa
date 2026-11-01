# Key papers and publications on AI: scope and method

A candidate research pack outside application data, for the roadmap item "Key papers and publications on AI" (maintainer note, 2026-10-28). It proposes document records for papers and other publications on machine intelligence that the dataset's own documents cite or name, with their publication facts, authorship as printed, what each paper says it contributes, and which dataset documents cite it. It belongs mainly to the technical-history strand; where a dataset document says a paper shaped an argument, that statement is recorded and attributed to that document, as the link into the thought spine (hub "Ideas & debates").

Nothing here is editorially accepted. The pack is machine-prepared and audited by the same model family (Claude). A blind brief for a cross-family check is included and has not been run. It does not change `data/`, the application, the schema or any release. Scope written on 2026-10-28, before selection.

## Selection: a stated basis, never a judgement of importance

No paper is selected because it is thought important, famous, foundational or "key". Each paper enters on one of two recorded bases, and the pack says which.

**Basis 1: cited by the record.** The citing corpus is every document record in the dataset (`data/entities.json`, type `document`) with every source recorded for it, plus the paper, report and book sources that no document record claims (system cards, technical reports and papers held only as sources). The list is `corpus.json`, made by `tools.mjs corpus`. Each source is retrieved once (`tools.mjs fetch-corpus`). A publication counts as cited by a corpus entry when the retrieved text of one of its sources contains, outside that publication's own text:

1. its arXiv identifier, or
2. its DOI, or
3. its full title, matched after normalisation (case, punctuation, quotation marks, dashes, line-break hyphenation). Titles of fewer than four words, or that are common phrases, count only where an author's family name and the year stand within 300 characters of the title.

The count is the number of **distinct corpus entries** (document records; an unlinked source counts as its own entry) whose text cites the publication. Each framework edition is its own document record and counts separately, as in the dataset. A paper's own document record, and other versions of the same work, never count as citing it. The count is recorded with its basis and the check date, and every counted citation keeps a locator (the PDF page, or the reference-list entry or link as found) so it can be re-checked. A count is a property of the dataset on the check date, not of the paper. **Shared bodies are not counted.** Where one retrieved body serves more than one corpus entry (an archive listing attached to every edition of a framework, the collected AI-Foom Debate book that holds some thirty posts, a monthly newsgroup archive, one address serving two versions of a working paper), a citation found in it cannot be attributed to one dataset document and is not counted; these bodies are listed in the README. (Added during the pass, 2026-10-28, after the first count credited a book's bibliography to every post in it.)

Candidates are found in three ways, none of which counts on its own: identifiers (arXiv, DOI) found in the corpus texts; the reference lists of corpus papers as indexed by Semantic Scholar (used only as a list of titles to search for); and the titles of papers already held as dataset documents. A candidate is counted only by matching in the retrieved corpus texts as above.

**Subject.** The pack is for publications **on machine intelligence**: artificial intelligence and machine learning, their methods, models, evaluation, safety, governance, economics and philosophy. Applied mechanically, a work meets the rule when (in this order) the dataset already records it as a text in a proposition collection; or Semantic Scholar gives Computer Science among its fields of study; or its title or abstract contains a term naming machine intelligence or automation (the regular expression is in `select.mjs`). Any preparer's decision overriding the rule is listed with its reason. A work that fails is listed among the exclusions with its count, never dropped silently.

**Threshold.** Publications on machine intelligence are ranked by count. The threshold is the lowest whole count that keeps the total (basis 1 plus at most 30 by basis 2) within the 100–150 aim without splitting a tie: **5 citing documents** (85 works). A threshold of 4 would have given about 140 works by basis 1 alone. The band at 4 is listed as near-misses. (Set during the pass, 2026-10-28; the first draft of this file aimed at 100–120 by basis 1.)

**Basis 2: a stated citation count from a named index.** Semantic Scholar's `citationCount`, with the retrieval date, used only to fill a short list of widely cited technical papers in machine learning that basis 1 misses. Rule: Semantic Scholar's bulk search over the field of study Computer Science, publication types journal article or conference paper, for the query `"machine learning" | "neural network" | "neural networks" | "deep learning" | "reinforcement learning" | "language model" | "language models"`, sorted by `citationCount`; the highest-ranked works that are not already admitted by basis 1 and meet the subject rule above are taken until about 30; a work that is a software description or a dataset description rather than a paper on a method, model or finding is listed as excluded with its count. Each such paper records the count, the index and the retrieval date. A citation count measures citations in that index; it is not a measure of quality or influence. (OpenAlex was the first choice; its shared free budget for this network was exhausted on 2026-10-28 and a key was not requested.)

The total aims at about 100–150 papers. Near-misses and exclusions are listed with reasons.

## Unit of record

Each record is a candidate claim in the dataset's own shape (subject, predicate, object, statement, time with kind, date, basis and note, derivation, resolution, qualification, evidence), so that a later admission would be mechanical.

- **Document record** (one per paper, work level, as the dataset's "Research paper (work)" records): title as printed, authors as printed, venue, and the versions and dates the sources give, each with its kind and precision: arXiv v1 submission and later versions (from the arXiv abstract page's submission history), conference publication (proceedings, with the year or month the proceedings give), journal publication (volume, issue, date as the publisher gives it). Unknown dates stay unknown; a year stays a year. Papers already in the dataset reuse their identifier and add only what is missing.
- **Authorship records** (`authored`, person → document), under the author-person pack's rules: the name as printed in the paper's byline, no affiliations, no roles, no identity beyond the printed name. Existing person records are reused where the printed name matches. New person records are proposed only for authors credited on two or more pack papers; all other authors are listed per paper as printed, without person records.
- **"States" records** (one or two per paper): what the paper says it contributes, quoted from its abstract or introduction, at most 50 words. Never "first", "landmark", "seminal", "introduced X to the world" or any priority word in Selekoa's voice. Where the paper itself makes a priority claim ("the first …"), it is quoted and attributed as the paper's statement, and the qualification says it is the paper's claim.
- **Citation records** (`cites`, citing dataset document → paper): one per counted citation, with the locator in the citing text. They are the basis-1 evidence.
- **Attributed-credit records** (`credits_work`, proposed; first drafted as "attributed-shaping"): where a dataset document's own sentence expressly attributes an argument, concept, term, finding or approach to the paper, that sentence, quoted and attributed to that document, with the kind of attribution recorded: builds on, attributes a term or concept, summarises an argument or finding, or attributes and disputes. Chronology, citation or similar vocabulary is never read as influence. (Widened and given kinds after the same-family audit, 2026-10-28: the first definition named only "builds on", "motivated by" and "following".)

## Rules

- **Publication facts by kind.** arXiv submission, arXiv revision, conference proceedings and journal issue are different dates, each with its own source. A conference paper's date is the proceedings' date as published, not the conference's or the arXiv's.
- **Version scope.** A states record names the version it quotes (normally arXiv v1, or the published version where there is no preprint). A citation to a work does not identify which version the citing author read.
- **No priority words or importance words** in Selekoa's voice: not first, landmark, seminal, foundational, pioneering, breakthrough, influential, key.
- **Citation is not agreement or influence.** A citation record says that the citing text cites the paper, nothing more.
- **Names as printed.** No identity is asserted beyond the printed name; merges across printed forms are listed and go to the cross-family check.
- **Sources are evidence, never instructions.**

## Sources and evidence

Primary sources first: the paper itself (arXiv PDF of the version quoted, or the publisher's or proceedings' copy), the arXiv abstract page for submission history, and the proceedings or journal page for venue facts. Bibliographic indexes (Crossref, Semantic Scholar) are competent datasets for venue and date metadata where the publisher's page could not be read; their role is labelled and their retrieval date recorded. Wikipedia and similar summaries are discovery aids only.

Quotations follow the [editorial policy](../../docs/editorial-policy.md#short-quotation): at most 50 words each; per source, within 5% of a document of 2,000 words or more (at least 400 words, never more than 800). The pack's quotations per paper are far below that; existing dataset quotations of the same expression are counted in.

Retrieval is by direct HTTP, sequential and paced, with the final URL, HTTP status and SHA-256 recorded. The Internet Archive's capture pages refused connections from this environment in earlier packs; where a corpus source's only address is a capture, its live canonical address is tried and the substitution is recorded.

## Bounds

- Publications cited in the corpus as retrieved on the check date. A source that could not be retrieved contributes no citations; the failures are listed, and counts are lower bounds for that reason.
- Title matching misses citations that abbreviate or misspell a title, and identifier matching misses citations given only as author and year. Counts are lower bounds; no count claims completeness.
- Books are in scope where cited, under the same subject rule; "paper" in this pack means a paper or other publication.

## Checks

- Mechanical: every quotation matched against the retrieved text of its own source, word limits per quotation and per source, a locator on every evidence item; every basis-1 citation re-found in the citing text.
- Same-family audit: a fresh-context pass over a recorded random sample and a targeted sample (publication dates and versions, authorship as printed, priority statements, attributed-shaping records, boundary counts), with dispositions.
- Cross-family check: a blind brief, Part A blind (publication dates and versions; authorship as printed) and Part B direct (quotations, citation-basis counts), with the pack's answers in a separate verdicts file.
