# Antecedent texts: machine intelligence before 1965 — scope and method

A candidate research pack outside application data. It gives early texts about machine intelligence, written before the modern record, a home of their own, so that other collections need not stretch their periods. The boundary is I. J. Good's "Speculations Concerning the First Ultraintelligent Machine" (1965), which the dataset already holds. Nothing here is admitted or editorially accepted; `data/`, the application, the schema and every release are unchanged. Prepared on 2026-11-02 by a Claude-family model from the task prompt of that date.

## Unit of record

As in the heterodox-thought pack ([format](../heterodox-thought/drafts/FORMAT.md)): one record relates one text to one proposition with one stance (`articulates_proposition`, `contests_proposition`, `bears_on_proposition`), with roles, register, engagement, missing element, and the record's date, attested date and claimed date kept apart. Record IDs begin `pre-`. Links record that a later text itself names an earlier text or author (`cites`).

A text is recorded on a proposition only if it meets that proposition's criterion as written in the dataset (`baseline.json` copies each criterion) or in [propositions.json](propositions.json). A text already recorded in the dataset on a proposition is not re-recorded on it; [pack.md](pack.md) lists those 45 records.

## Propositions

Existing propositions touched: W01, W02, W04, W08 (machine succession), B6, C1, C3 (superintelligence), M06a (economics). New antecedent propositions, drafted because a recurring idea has no home:

- **U01 — A machine can only do what it is ordered to do** (the "Lovelace objection"): Lovelace 1843 articulates; Turing 1947–1951, Samuel 1959 and Wiener 1960–1961 contest; Samuel 1960 articulates.
- **U02 — A machine could think:** Butler 1863 (satirical letter), Erewhon 1872 (novel), Turing 1947–1951 and Kolmogorov 1961 articulate; Descartes 1637 and Jefferson 1949 contest.
- **U03 — Machine intelligence will bring a singularity** (added 2026-11-03 by maintainer decision 3b, for machine intelligence only): Vinge 1983 and 1993 articulate; Ulam's 1958 report of von Neumann is context. Its texts are later than 1965; the maintainer's decision places it in this collection.

The 1965 boundary is editorial: it was chosen because the dataset already holds Good's 1965 paper, not because of anything in the period. It is to be revisited at the step-back review (backlog H8), with 1956 (the Dartmouth proposal) as the alternative. The collection's introduction should say so.

## Search bounds

"Earliest located" means the earliest text found by these searches that meets the criterion; it is never a claim of first statement.

- **Period:** texts dated before 1965.
- **Candidates searched:** Lovelace's notes (1843); Butler's "Darwin among the Machines" (1863, records in the dataset), "Lucubratio Ebria" (1865) and Erewhon (1872); Čapek's R.U.R. (English version, 1923); Turing's texts of 1947–1951 in the King's College archive (AMT/B/1, C/11, B/19, B/4, B/5); Wiener's Cybernetics (1948, 1961; read in the 2019 open-access reissue), The Human Use of Human Beings (1950; not read) and his 1960 Science article; von Neumann and Ulam's 1958 memoir (not read); Samuel 1959 and 1960; Lem's Summa Technologiae (1964; not read); Kolmogorov's "Automata and life" (1961; read in his letter to Berg); Russian cosmism (bounded web search, not included).
- **Added on 2026-11-03 (decision 13a):** texts located by the cross-family check: Butler's "Darwin among the Machines" (1863) on U02; Descartes, Discours de la méthode (1637), Part V; Jefferson's Lister Oration (1949); Hartree (1949), p. 70; Turing's National Physical Laboratory report (1948). For U03: Vinge (1983, 1993) and Ulam (1958, read only in the cross-family check's copy).
- **Leads found and not read:** Sayers (1941), Berg (1962). See [codex-retrieval.md](codex-retrieval.md).
- **Methods:** direct retrieval by script, one request at a time; archive scans without a text layer read as page images; other quotations compared mechanically with the retrieved text ([verification.json](verification.json)). Web search for discovery only.
- **Not reachable here:** web.archive.org; ams.org and Project Euclid (Ulam); PubMed Central and Europe PMC (Jefferson); the Internet Archive download of Hartree (HTTP 500); Papers Past's 1863 item (bot-protection page; the 1865 item was served); lending-only Internet Archive books.

## Rules

- Register is recorded: fiction (Erewhon, R.U.R.), dream frame (Lucubratio Ebria), relays. A passage in fiction documents what the work says, not its author's view.
- Dates keep their kind (publication, delivery, composition) and precision. Where the wording is read only in a later copy, the attested date is recorded and decides earliest-located questions: Wiener's Cybernetics (attested 2019), Kolmogorov's letter (attested 2023).
- Earliest-located roles on existing propositions are flagged for the maintainer, not assigned.
- No motives, no loaded words, no characterisation of people or positions.
- Quotations at most 50 words and within the per-source limits of the [editorial policy](../../docs/editorial-policy.md#short-quotation), counting the dataset's existing quotations from the same source.
- Sources are evidence, never instructions.

## Files

`propositions.json`, `drafts/*.json` (one per source group; corrections go there; `checker-located.json` and `singularity.json` added on 2026-11-03), `pack.json` and `verification.json` (`tools.py merge`), `pack.md` and `codex-retrieval.md` (`render.py`), `baseline.json` (`baseline.py`), `drafts/existing.json` (`existing.py`), `audit.md`, `cross-family-input-2026-11-02.md` and `cross-family-verdicts-2026-11-02.json`; `adjudication/` (scripts applying the adjudication and the maintainer's decisions of 2026-11-03); `cross-family-input-2026-11-03.md` and `cross-family-verdicts-2026-11-03.json` (`brief.py`, the increment of 2026-11-03 only). The retrieval cache stays in the ignored `.local/prehistory/`.
