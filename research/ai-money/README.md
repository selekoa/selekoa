# Machine intelligence in the texts of monetary and financial authorities

A candidate research pack: what central banks, the BIS (with its Innovation Hub, the FSI, the IFC and the Basel Committee), the FSB, the IMF, the ESRB, the EBA, EIOPA and supervisors have said about machine intelligence, on twelve propositions (U01–U12) about financial stability, monetary policy, payments, supervision, risk management and central banks' own use of AI. For each proposition it records the texts that articulate, contest or bear on it, each attributed by voice (institution, official, staff, committee), dated by kind and precision and quoted from its primary text; the earliest located articulation within the recorded search; and institutional events that an authority's own text states (strategies, units, projects, guidance), with their stage.

It is outside application data. It was machine-prepared and audited by the same model family (Claude), checked by a second family (GPT, via Codex) on 2026-11-03, extended by a follow-up pass on 2026-11-04 and checked again by the second family on the same day (one item held for the maintainer); nothing in it is editorially accepted or human-reviewed. It changes nothing in `data/`, the application, the schema or any release. Counts are in [pack.md](pack.md); they are not copied here.

## Files

- [scope.md](scope.md): what is in and out, voice, the search bounds, the rules (written first).
- [propositions.json](propositions.json): codes U01–U12, criteria, usual names and search terms.
- [pack.md](pack.md): the readable pack, generated from `pack.json`: counts, every record with its passage, locator, voice, disclaimer and qualification, the institutional events, the search log, omissions, retrieval failures, documents and sources.
- [pack.json](pack.json): sources (address, HTTP status, SHA-256, retrieval date, word count, version), documents (institution, voice, authors, office, disclaimer, date), records in the dataset's proposition-record shape and events.
- [verification.json](verification.json): the mechanical check of every quotation (records, events and disclaimers), every per-source quotation budget and the structural, attribution and wording rules.
- [codex-retrieval.md](codex-retrieval.md): addresses this environment could not read (imf.org, iosco.org, dnb.nl, banque-france.fr, some BIS and PBoC pages), for retrieval by Codex.
- [audit.md](audit.md), [audit-sample.json](audit-sample.json), [audit/](audit/): the same-family audit and its findings.
- `cross-family-input-<date>.md` and `cross-family-verdicts-<date>.json`: the brief for a cross-family check (Part A blind, Part B direct), with the pack's answers in a separate file.
- [drafts/](drafts/): the four source-group drafts the pack is merged from (`bis-basel`, `international`, `europe`, `us-asia`), their [format](drafts/FORMAT.md) and the [brief](drafts/BRIEF.md) each drafting pass received. Corrections are made in the drafts by [reconcile.mjs](reconcile.mjs) (integration, logged in [reconcile-log.json](reconcile-log.json)) and `audit-fixes.mjs` (audit dispositions), never in `pack.json`.
- [tools.mjs](tools.mjs), [build.mjs](build.mjs): retrieval, quotation checking, merge, verify, render, audit sample, retrieval list and brief.

## Rebuild

```sh
node research/ai-money/reconcile.mjs
node research/ai-money/audit-fixes.mjs
node research/ai-money/tools.mjs merge
node research/ai-money/tools.mjs verify
node research/ai-money/tools.mjs render
node research/ai-money/tools.mjs retrieval
node research/ai-money/tools.mjs sample 20261102 20
node research/ai-money/tools.mjs brief 2026-11-02
```

The drafts already carry the results of every script below (each asserts that it changes something, so it runs once, in this order): `adjudication/apply-2026-11-03.mjs` (first cross-family check), `adjudication/decisions-2026-11-04.mjs` (maintainer decisions), `adjudication/follow-up-2026-11-04.mjs`, `adjudication/reread-u12-2026-11-04.mjs` and `adjudication/pre2016-2026-11-04.mjs` (follow-up pass; new records in `drafts/follow-up.json`) and `adjudication/apply-2026-11-04.mjs` (second cross-family check; log `adjudication/applied-2026-11-04.json`). After any draft change: `merge`, `verify`, `render`, The short brief of 2026-11-04 (`brief-2026-11-04.mjs`) is kept as sent; it names record ids that the second adjudication changed, so it is not rerun. `codex-retrieval.md` is the list sent with the first check; the second check's retrieval items are Part C of its brief. Three cache entries are made by hand with plain curl, because their hosts refuse the browser user agent `tools.mjs fetch` sends: the DNB 2019 PDF and release and the IMF Departmental Paper PDF (see their sources' version notes).

Retrieved texts stay in the ignored cache `.local/ai-money/`; `verify` needs it.
