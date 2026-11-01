# Kinds of AI and technical history

A documentary subproject for two roadmap backlog items: the families of machine intelligence, not only large language models, with a technical timeline; and the provenance of the term 'artificial general intelligence' / 'AGI', with the other terms the field is named by. Record by record, it says which located texts name and describe each family, which dated texts and events make up the technical timeline, and which text is the earliest located use of each term, in each document's own words and versions.

It is a candidate research pack outside application data. It was machine-prepared and audited by the same model family (Claude); nothing in it is editorially accepted or human-reviewed, and the cross-family check has not been run. It changes nothing in `data/`, the application, the schema or any release. It reuses the dataset's documents and persons and the key-papers candidate pack's documents (branch `key-papers-pack`, not admitted) by ID.

## Files

- [scope.md](scope.md): what is in and out, the unit of record and the rules (written first).
- [pack.md](pack.md): the readable pack, generated from `pack.json`. Counts; one section per family and per term (criterion, "How we searched", the earliest located use, naming records, defining statements, attributed statements); the timeline; other records; persons; documents; omissions; retrieval failures; the drafting passes' open questions; sources.
- [timeline.md](timeline.md) and [timeline.json](timeline.json): the technical timeline alone. Each row is one dated version of a document (with the kind of date) or one event statement.
- [pack.json](pack.json): sources (address, HTTP status, SHA-256, retrieval date, word count), documents with dates by kind, concepts and persons, and candidate claims in the dataset's shape, each with evidence.
- [verification.json](verification.json): the mechanical check of every quotation (claim evidence and document dates) and of the quotation budget per source.
- [audit.md](audit.md), [audit-sample.json](audit-sample.json), [audit/](audit/): the same-family audit and how each finding was handled.
- [cross-family-input-2026-10-29.md](cross-family-input-2026-10-29.md) and [cross-family-verdicts-2026-10-29.json](cross-family-verdicts-2026-10-29.json): the brief for a cross-family check (Part A blind, Part B direct), with the pack's answers in a separate file. Not yet run.
- [drafting-brief.md](drafting-brief.md): the prompt the five drafting passes worked from.
- [drafts/](drafts/): the five source-group drafts the pack is merged from, and their [format](drafts/FORMAT.md). Corrections are made in the drafts, never in `pack.json`.
- [tools.mjs](tools.mjs), [build.mjs](build.mjs), [audit-sample.mjs](audit-sample.mjs), [audit-fixes.mjs](audit-fixes.mjs): retrieval, search, quotation check, merge, render, brief, audit sample and the audit's dispositions.

## Method

1. **Scope first.** [scope.md](scope.md) was written and pushed before research began.
2. **Drafting by source group.** Five fresh-context passes drafted, to [drafting-brief.md](drafting-brief.md) and the [format](drafts/FORMAT.md): (A) symbolic AI and expert systems, search and planning, logic programming; (B) connectionism and neural networks, deep learning; (C) transformers and large language models, systems and releases, 'large language model' and 'foundation model'; (D) probabilistic and Bayesian methods, evolutionary computation, reinforcement learning, statistical learning and support-vector machines, hybrid and neurosymbolic approaches, 'machine learning'; (E) 'artificial general intelligence' / 'AGI', 'superintelligence', 'artificial intelligence', and the persons the texts support. Each retrieved its sources by direct HTTP through `tools.mjs fetch`, checked its own quotations with `tools.mjs check`, stated each concept's search once, and listed omissions, retrieval failures and open questions.
3. **Integration.** The integrator merged the drafts, checked identifiers against the dataset and the key-papers pack, joined documents reused by two groups, and reworked records before the audit (listed in [audit.md](audit.md#integrators-changes-before-the-audit)).
4. **Mechanical verification.** Every quotation matched against the retrieved text of its own source; at most 50 words per quotation; the policy's per-source budget, counting the dataset's existing quotations from the same expression; one locator per evidence item; exactly one earliest-located-term record per concept, with no use in the required sense dated definitely before it; no priority words in the pack's own sentences.
5. **Same-family audit.** Two fresh-context auditors checked a seeded random and a targeted sample (100 items) against the sources and tried to refute them; 24 fixes were applied to the drafts by [audit-fixes.mjs](audit-fixes.mjs). See [audit.md](audit.md).
6. **Cross-family brief.** A brief for one run by a reviewer from the other model family, with Part A blind: the earliest-located search for every family and term (for 'AGI', before 1997, with Internet Archive copies opened) and a sample of dates. No record is admitted before that check.

## How to read a record

- **Earliest located, never first.** The earliest-located use of a name is the earliest text that the concept's recorded search found and that uses the name in the sense its criterion requires. It is not a claim that no earlier use exists, and it is not a claim of coinage. A use in another sense ('deep learning' in constraint-satisfaction search, 1986; 'foundation model' in contact mechanics) is recorded as other-sense.
- **Attributed statements** ("According to …") record what a text says about who named or devised something. They are kept apart from the earliest-located records, side by side where texts disagree (backpropagation; 'deep learning'; 'knowledge engineering'; the name 'Prolog'), and never resolved.
- **Dates keep their kind.** Submission (arXiv; a journal's "received" date), presentation, publication, announcement, release, event and claimed (a date known only from a later account, or from a reference list) are kept apart. A year stays a year.
- **Defining statements** quote what a text says a family is; they do not say that the family began there.
- **Proposed predicates.** `uses_term` (document → concept: a naming record) and `credits_work` (document → document: an attributed statement about another work, as proposed by the key-papers pack) are not in the schema. The others (`discusses`, `explicitly_credits`, `authored`, `published`, `states_provision`, `uses_method_from`, `cites`) are.
- **Order is not influence.** The timeline and the sequence of naming records establish no transmission.

## Limits and retrieval

- **Internet Archive.** Capture pages refused connections from this environment throughout, and the availability service answered HTTP 429 for most of the session. No capture has been compared with a current copy. Where the only copy read is a current one (the Foresight Archives' copy of Gubrud 1997, Bostrom's page, McCarthy's retyped papers), the record says so.
- **Full-text search before the web.** Google Books (quota), OpenAlex (budget), Semantic Scholar (429), scholar.archive.org (429) and Usenet archives did not answer. Searches before about 1995 rest on Crossref titles and deposited abstracts, the ACL Anthology bibliography, arXiv, IJCAI and AAAI proceedings indexes, and the texts retrieved. The cross-family brief asks the checker to search the collections the preparer could not.
- **Paywalls and refusals.** ACM Digital Library, ScienceDirect, Wiley, Springer and Sciendo refused most requests; openai.com and help.openai.com refused (so ChatGPT's release is dated only as claimed, from a later reference); pnas.org, image-net.org, iro.umontreal.ca, jmc.stanford.edu and vetta.org refused or failed. Copies on author, course or repository sites were used where they exist, each with a version note. The full list is in `pack.md`.
- **Scans.** Several texts (the Dartmouth facsimile, Rosenblatt 1957, Widrow and Hoff 1960, the 1986 backpropagation letter, LeCun et al. 1989, RAND P-868 and P-1584, the A\* paper, Kowalski 1974, Pearl's 1985 reports, Watkins 1989) have no text layer; their pages were read as images and every record resting on them is a labelled paraphrase.
- **Withheld headlines.** After the audit, eight earliest-located roles are withheld because the earliest lead is known only from an index title, a citation or an undated current copy ('AGI', 'machine learning' and six families); each names the leads that would decide it. One headline was corrected ('large language model': Hu, Turin and Brown 1996). See [audit.md](audit.md#rule-adopted-for-earliest-located-roles) and the review note.
- **Same model family.** All drafting, integration and audit passes were one model family. Agreement among them is not independent corroboration.

## Reproduction

From the repository root:

```sh
node research/technical-history/tools.mjs fetch <cacheKey> <url>     # one source at a time; TH_UA overrides the user agent
node research/technical-history/tools.mjs grep <cacheKey> "<regex>"
node research/technical-history/tools.mjs check research/technical-history/drafts/<group>.json
node research/technical-history/audit-fixes.mjs                       # audit dispositions -> drafts (idempotent)
node research/technical-history/tools.mjs merge                       # drafts -> pack.json
node research/technical-history/tools.mjs verify                      # -> verification.json
node research/technical-history/tools.mjs render                      # -> pack.md, timeline.md, timeline.json
node research/technical-history/audit-sample.mjs                      # -> audit-sample.json
node research/technical-history/tools.mjs brief 2026-10-29            # -> cross-family input and verdicts
npx prettier --write research/technical-history/
```

The cache lives in the ignored `.local/technical-history/` folder. A fresh checkout must re-fetch each source from the address in `pack.json` under its `cacheKey`; compare SHA-256 values, since current responses may differ. `merge` reads the key-papers pack from `origin/key-papers-pack` to check reused IDs; without that branch it skips the check.
