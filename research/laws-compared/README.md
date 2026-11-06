# Laws compared

A candidate comparison of the binding government instruments that address developers of frontier or general-purpose AI models: rows are instruments, columns are fifteen questions, and every answered cell quotes the instrument's own text. It serves the roadmap's interface item "Laws compared" (`docs/roadmap.md`).

Admitted in two parts: the effect rule of New York Chapter 699 on 2026-11-04 (release 0.28.1) and every cell, with the collection and its page, on 2026-11-05 (release 0.30.0; [`review/laws-compared-admission-2-2026-11-05.md`](../../review/laws-compared-admission-2-2026-11-05.md)). The text below describes the pack as prepared.

It is a candidate research pack outside application data. It was machine-prepared and audited by the same model family (Claude), checked by another family (Codex, 2026-11-02) and adjudicated on branch `laws-compared-apply`; nothing in it is editorially accepted or human-reviewed. It changes nothing in `data/`, the application, the schema or any release. The review note is [`review/laws-compared-pack-2026-11-02.md`](../../review/laws-compared-pack-2026-11-02.md).

## Files

- [scope.md](scope.md): question, unit of record, rows and rules, written before drafting.
- [questions.json](questions.json): the fifteen questions, each with its criterion, and the legend of cell statuses. Modelled on the Compare frameworks collection (`src/reading/framework-comparison.ts`).
- [pack.md](pack.md): the readable pack, generated from `pack.json`: an overview grid, then one section per instrument with its standing and its fifteen cells, the findings (the United Kingdom; other US federal texts), the instruments not compared with reasons, and the source table.
- [pack.json](pack.json): instruments with standing evidence, sources (address, HTTP status, SHA-256, retrieval date, word count, archive capture), cells, findings, exclusions and the drafters' open questions.
- [verification.json](verification.json): the mechanical check of every quotation against the retrieved text, the structural checks, and the quotation budget per source.
- [audit.md](audit.md), [audit-sample.json](audit-sample.json), [audit/](audit/): the same-family audit and how each finding was handled.
- `cross-family-input-2026-11-02.md` and `cross-family-verdicts-2026-11-02.json`: the blind brief for the cross-family check, with the pack's answers in a separate file, kept as the checker received them (not regenerated after adjudication).
- `cross-family-input-2026-11-04.md` and `cross-family-verdicts-2026-11-04.json`: the blind brief for the Illinois row only (`build.mjs brief 2026-11-04 il-aisma`), 16 items; the report is due as `cross-family-check-2026-11-04.md` and `.json` on branch `codex/laws-compared-check-2`.
- [cross-family-check-2026-11-02.md](cross-family-check-2026-11-02.md) and [.json](cross-family-check-2026-11-02.json): the Codex report, copied unchanged from branch `codex/laws-compared-check`.
- [second-pass-codex-report-2026-11-03.md](second-pass-codex-report-2026-11-03.md) and [.json](second-pass-codex-report-2026-11-03.json): the Codex second pass, copied unchanged from branch `codex/second-pass-2026-11-03` (1fd8d66). Case 2 settles us-eo14110 Q06; case 5 retrieves the Illinois act. Other cases concern other packs.
- [illinois-2026-11-04.py](illinois-2026-11-04.py): adds the Illinois row to the drafts (run once, from this folder).
- [cross-family-check-2026-11-04.md](cross-family-check-2026-11-04.md) and [.json](cross-family-check-2026-11-04.json): the Codex report on the Illinois row, copied unchanged from branch `codex/laws-compared-check-2`.
- [cross-family-apply-2026-11-04.py](cross-family-apply-2026-11-04.py): applies the comparison of the Illinois row with that report to the drafts (run once, from this folder).
- [sources/il-pa-104-0538.txt](sources/il-pa-104-0538.txt): the saved text of the Illinois act, copied unchanged from branch `codex/held-records-2026-11-04`.
- [cross-family-apply-2026-11-02.py](cross-family-apply-2026-11-02.py): applies the adjudication to the drafts (run once, from this folder). The adjudication is recorded in the review note.
- [drafts/](drafts/): the brief, format, instrument list, source registry and the five drafts the pack is merged from (EU; California and New York; China; US federal; integrator). Corrections are made in the drafts, never in `pack.json`.
- [tools.mjs](tools.mjs), [build.mjs](build.mjs), [make-sources.mjs](make-sources.mjs): retrieval, search, quote checking, merge, verification, rendering and the brief.

## How to read a cell

- A cell is **stated**, **partly**, **not found**, **not applicable** or **not retrieved**, as defined in `questions.json`. A cell marked **held** keeps the preparer's status while the checker disputes it; both reasons are in its `held` record. "Partly" means a weaker form than the criterion's own words (a power where it asks for a duty; a duty without a deadline); the note says which.
- Every stated or partly cell quotes the official text with its article, section or page. A not-found cell lists what was read, the search terms and the passages set aside; it does not show that the instrument, or another law, lacks the provision.
- Dates keep their kind. A computed date is marked as computed.
- A duty is what the text requires of the categories it defines. Whether a named developer falls within them, or complied, is not recorded.
- The grid compares and does not rank. Symbols are not to be summed.

## Limits and retrieval

- **Quotation budgets.** Most cells reuse quotations already in the dataset. California SB 53's budget was almost spent before this pack; its new quotes exceed the policy's limit by a few words, reported in `verification.json` and raised in the review note.
- **California.** leginfo.legislature.ca.gov refused (HTTP 403). SB 53's chaptered text was read from the Legislative Counsel's public database file (`pubinfo_2025.zip`) by byte-range retrieval of one member, the chaptered version's CAML record; its approval date is a structured field of that record.
- **EU.** EUR-Lex returned empty responses; the Official Journal texts were read through the Publications Office's repository (Cellar). The cache renders exponents flat ("1025" for 10^25).
- **New York.** The Assembly's bill record serves "??" where the section signs stand and an unreadable byte for one exponent; quotes are joined around them. The chapters as printed in the session laws were not inspected.
- **China.** Texts are gov.cn copies. The mandatory standard GB 45438-2025 was not retrieved: its catalogue page offers preview and download, but the download address returned the catalogue page.
- **US federal.** A BIS page served on 2026-11-01 carries changed terms ("SI" for "AI") in some sentences; quotes avoid them. No Federal Register rule formalising the AI diffusion rule's rescission was inspected.
- **Illinois.** The act is a row since 2026-11-04 (decision 7a). The cells are drafted from the saved text of the enacted act, [sources/il-pa-104-0538.txt](sources/il-pa-104-0538.txt), extracted from the Internet Archive capture of the official PDF by the cross-family checker's session (header: address, capture time, status, SHA-256, tool); copy the text below its header into the cache as `il-pa-104-0538.txt`. ilga.gov and web.archive.org could not be opened from the preparer's sessions, so Q10 quotes the bill status record from the cross-family checker's copy, unmatched by the preparer. The text layer gives superscripts on the line (“10 26”), and “…” in Illinois quotations stands for the running footer at a page break.
- **Internet Archive.** Capture pages could not be opened from this environment. Captures come from the availability service or from dataset sources and are marked unchecked.
- **Model families.** Drafting, integration, the audit and the adjudication were one family (Claude); the cross-family check was Codex. The adjudication applied the checker's status on every disputed cell except one, which was held and then settled as not found after the checker's second pass (`second-pass-codex-report-2026-11-03.md`, case 2).

## Reproduction

From the repository root:

```sh
node research/laws-compared/tools.mjs fetch <cacheKey> <url>       # one source at a time
node research/laws-compared/make-sources.mjs                        # -> drafts/sources.json
node research/laws-compared/tools.mjs checkcells research/laws-compared/drafts/<group>.json
node research/laws-compared/build.mjs all                           # merge, verify, render
# (with a date, `all <date>` also writes a cross-family brief; do not overwrite the 2026-11-02 one)
npx prettier --write research/laws-compared/
```

The cache lives in the ignored `.local/laws-compared/` folder. A fresh checkout must re-fetch each source from the address in `drafts/sources.json` under its key; compare SHA-256 values. SB 53's record is member `BILL_VERSION_TBL_8965.lob` of `https://downloads.leginfo.legislature.ca.gov/pubinfo_2025.zip`, saved as `ca-sb53.html`.
