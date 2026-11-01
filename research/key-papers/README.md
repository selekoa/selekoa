# Key papers and publications on AI

A candidate research pack for the roadmap item "Key papers and publications on AI" (maintainer note, 2026-10-28): papers and other publications on machine intelligence that the dataset's own documents cite, with their publication facts and versions, authorship as printed, what each paper says it contributes, which dataset documents cite it, and, where a dataset document says so, how a paper shaped an argument. It belongs mainly to the technical-history strand; the attributed-credit records are its links into the thought spine (hub "Ideas & debates").

**Status.** Candidate research pack outside application data. Machine-prepared and audited by the same model family (Claude); not editorially accepted; no human review. The cross-family check has not been run. `data/`, the application, the schema and the releases are unchanged.

## Files

- [scope.md](scope.md): selection bases, unit of record and rules, written before selection and amended where the pass changed a rule (each amendment dated).
- [pack.md](pack.md): the readable pack, generated from `pack.json`: the basis tables, then every paper by year (versions and dates by kind, authors as printed, what it states, who cites it, attributed credit, authorship records), proposed persons, near-misses, exclusions, basis-2 works passed over and retrieval failures.
- [pack.json](pack.json): documents (with versions and sources), proposed and reused persons, candidate claims in the dataset's shape (`states_contribution`, `authored`, `cites`, `credits_work`), near-misses, exclusions, shared bodies and retrieval failures.
- [selection.json](selection.json): the selection with every counted citation (citing document, source, how matched, PDF page).
- [facts.json](facts.json): per paper, the arXiv submission history, the bibliographic records read (Semantic Scholar, Crossref), the text read and where each credited name is printed.
- [corpus.json](corpus.json): the citing corpus (every dataset document record with its sources, plus unlinked paper and report sources).
- [verification.json](verification.json): the mechanical check of every quotation, citation and printed name, and the quotation budget per source.
- [audit.md](audit.md), [audit-sample.json](audit-sample.json), [audit/](audit/): the same-family audit and its dispositions.
- [cross-family-input-2026-10-28.md](cross-family-input-2026-10-28.md) and [cross-family-verdicts-2026-10-28.json](cross-family-verdicts-2026-10-28.json): the brief for the cross-family check (Part A blind, Part B direct) and the pack's answers, kept apart.
- [drafts/](drafts/): the "states" drafts (four groups) and the attributed-credit draft, with their [format](drafts/FORMAT.md). Corrections are made in the drafts; `pack.json` is rebuilt from them.
- Scripts: [tools.mjs](tools.mjs) (retrieval, matching), [refs.mjs](refs.mjs) (identifiers, discovery, counting), [rank.mjs](rank.mjs), [select.mjs](select.mjs), [papers.mjs](papers.mjs) (paper retrieval, facts, drafting helpers), [curation.mjs](curation.mjs) (the preparer's corrections to index metadata, each with its reason), [shaping.mjs](shaping.mjs), [build.mjs](build.mjs), [verify.mjs](verify.mjs), [render.mjs](render.mjs), [brief.mjs](brief.mjs).

## Method

1. **Corpus.** `tools.mjs corpus` lists 521 corpus entries (494 document records and 27 unlinked paper, report and book sources) with 567 distinct sources; `fetch-corpus` retrieved 507 of them on 2026-10-28.
2. **Discovery.** `refs.mjs ids` collects arXiv identifiers and DOIs in the corpus texts; `resolve` adds arXiv metadata, Semantic Scholar records for DOIs, the Semantic Scholar reference lists of 46 corpus papers (titles to search for, never counts) and the dataset's own paper records: 2,406 candidates.
3. **Counting.** `refs.mjs count` matches every candidate in every corpus text by arXiv identifier, DOI or full title (titles of four words or fewer only with an author's family name or issuing body nearby, and three words or fewer also with the year; not inside an encyclopedia link), excluding the work's own text. A citation counts only in a retrieved body held by one corpus entry; 18 shared bodies were left out. `rank.mjs` merges keys that are one work and counts an unlinked copy of a dataset document with that document.
4. **Selection.** `select.mjs`: basis 1 at 5 or more citing documents and the subject rule (82 works after the audit's recount); basis 2 from Semantic Scholar's citation ranking for machine-learning papers, up to 30 works basis 1 misses (30). Near-misses (the band at 4) and exclusions are listed.
5. **Papers.** `papers.mjs fetch` retrieved each paper's arXiv abstract page and v1 PDF (or the text address in `curation.mjs`), one Semantic Scholar batch record and Crossref records for DOIs; `facts` reads the submission history and where each credited name is printed on the first page.
6. **Drafting.** Four fresh-context passes drafted the "states" records from the abstracts and introductions; one pass reviewed 106 candidate passages for attributed credit and drafted 30 records; the integrator kept 28, the audit gave each a kind of attribution, and 26 concern papers still selected. Each pass checked its own quotations with `papers.mjs check`.
7. **Build and checks.** `build.mjs` assembles `pack.json`; `verify.mjs` re-checks every quotation, citation and printed name and the per-source quotation budgets (counting the dataset's existing quotations of the same expression).
8. **Audit and brief.** A same-family audit of a seeded random and a targeted sample ([audit.md](audit.md)); then the cross-family brief.

## How to read a record

- **Counts are lower bounds and properties of the dataset.** A count says how many dataset documents' retrieved texts cite the work on 2026-10-28. It misses citations given only as author and year, abbreviated titles, unretrieved sources and shared bodies. It is not a measure of importance.
- **Basis 2 counts are the index's.** A Semantic Scholar citation count, with its date; the index's merges and errors are its own (two records were set aside as index anomalies).
- **Dates keep their kind.** arXiv submission dates are from arXiv's history (UTC, day precision). Venue publications come from Crossref (publisher-deposited, kept at year precision) or from a proceedings page the preparer read; Semantic Scholar's venue entries were removed after the audit found most of the sampled ones wrong. Many conference papers therefore show arXiv versions only.
- **Names as printed.** Authors are the names printed in the byline of the version read, with their diacritics; nothing about affiliation or role is recorded. Collective bylines ("OpenAI", "DeepSeek-AI") are recorded as such, without individual authorship records.
- **"States" records** quote what a paper says it contributes. A quoted priority claim ("the first …") is the paper's statement and is marked as such.
- **Citation is not influence.** A `cites` record says only that the citing text cites the work. An attributed-credit record (`credits_work`) says that the citing text attributes an argument, concept or approach to the work, in its own words; it is the citing text's claim.

## Limits

- **Retrieval.** web.archive.org refused connections throughout; sources known only from captures were not read. openai.com, the Open Philanthropy (now Coefficient Giving) site, Meta's framework pages, sec.gov and several government sites refused. Three paper texts could not be read (Superintelligence, Algorithms for Inverse Reinforcement Learning, Random Forests), and one PDF has no usable text layer (Gradient-based learning applied to document recognition). See `pack.md`.
- **Index metadata.** Venue facts rest on Crossref, not on proceedings pages; a title match gave one dataset paper another paper's index record, which was caught and discarded (`facts.json`, `indexMismatch`). Further index errors are possible and are the first priority of the cross-family check.
- **Identity.** Persons are merged only on identical printed names across pack papers; common names may join different people. Variant printed forms are listed, not merged.
- **OpenAlex** was the first choice of index; its shared free budget for this network was exhausted on 2026-10-28 and no key was requested.
- **Same model family.** All drafting, integration and audit passes were one model family. Agreement among them is not independent corroboration.

## Reproduction

From the repository root (the cache lives in the ignored `.local/key-papers/`):

```sh
node research/key-papers/tools.mjs corpus
node research/key-papers/tools.mjs fetch-corpus            # add --retry for failures
node research/key-papers/refs.mjs ids && node research/key-papers/refs.mjs resolve && node research/key-papers/refs.mjs count
node research/key-papers/rank.mjs && node research/key-papers/select.mjs
node research/key-papers/papers.mjs fetch && node research/key-papers/papers.mjs facts
node research/key-papers/shaping.mjs --all-studied        # candidate passages for attributed credit
node research/key-papers/build.mjs && node research/key-papers/verify.mjs && node research/key-papers/render.mjs
node research/key-papers/brief.mjs
npx prettier --write research/key-papers/
```

A fresh run retrieves current copies; compare SHA-256 values in `facts.json` and `pack.json`, since responses may differ.
