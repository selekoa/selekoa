# Frontier safety frameworks compared

What each frontier developer's safety or scaling framework says on the same eight questions, edition by edition, in the edition's own words and with their location. It is a candidate research pack outside application data, machine-prepared and machine-audited (one model family), with no human review. It answers the main gap the [fresh-eyes test](../../docs/fresh-eyes-2026-10-14.md#persona-3-policy-researcher-frameworks) found for a policy researcher.

- [pack.md](pack.md): the readable comparison, with an overview, a coverage grid and one section per question. Generated from [pack.json](pack.json).
- [scope.md](scope.md): unit of record, facets, editions in scope, retrieval, how "not found" was established, and limits.
- [audit.md](audit.md): the fresh-context audit (random 20% of stated cells, every "not found" cell, and a targeted sweep), with dispositions.
- [verification.json](verification.json): per-quotation checks against each edition, page checks, and quotation totals.
- [gpt-check-input-2026-10-15.md](gpt-check-input-2026-10-15.md): a blind brief for a cross-family check, with its separate [verdicts file](gpt-check-verdicts-2026-10-15.json). Not yet run.
- [app-proposal.md](app-proposal.md): how the comparison could appear in the app (a design proposal only).
- [tools.mjs](tools.mjs), [render.mjs](render.mjs), [crosscheck.mjs](crosscheck.mjs): retrieval, search, verification and rendering.

A cell records what an edition states. It is not evidence of implementation, compliance or effectiveness, and a shared heading does not mean two developers' provisions are equivalent. The pack does not rank developers.

## Decisions for the maintainer

1. **Compare across developers in the app at all? Decided 2026-10-15: yes in principle, "when the time is right"**, that is after the planned restructure of the site's structure. Once a comparison view is implemented, it supersedes the frameworks page's current line "This page does not compare or rank developers" (`src/reading/frontier-safety-frameworks.ts`); the page text stays as it is until then. The view compares and does not rank (see [app-proposal.md](app-proposal.md)).
2. **Quotation budget if admitted. Working approach decided 2026-10-15:** reuse the dataset's existing quotations where they cover the same facet, and admit the most important facets first. Each edition stays under 400 quoted words within this pack; added to the dataset's quotations for the same edition, most editions would exceed 400 (see `quotedWordsWithDataset` in `verification.json`), so admission is facet by facet within the current per-source limit. Whether that limit should change is discussed in the [policy review](../../docs/policy-review-2026-10-15.md); it is not changed.
3. **Facet set and ontology.** The existing provision kinds (threshold, required action, decision authority, exception) cover four of the eight dimensions. Admission would need edition-neutral facet keys (D1 risk domains, D5 evaluation timing, D7 reporting and D8 revision are new). The same edition-neutral labelling would also fix the misleading row label in the existing per-developer grid that the fresh-eyes test found.
4. **"Stated, partly."** The pack marks cells where a passage meets a criterion only in part (a domain named without a threshold or named only to exclude it; a pause that applies only in some scenarios). Is this third state worth carrying into the app, or should such cells be "stated" with a visible note?
5. **Meta Frontier AI Framework v1.1** could not be retrieved (publisher address returns HTTP 500; the Internet Archive refused connections from this environment). Its cells carry dataset passages marked "recorded, not re-checked". Re-check from a session with archive access, or leave as is.
6. **Further frameworks.** Out of scope here: Anthropic's Frontier Compliance Framework (in the dataset, edition not inspected), xAI's earlier Risk Management Framework drafts, and frameworks from developers not in the dataset (for example Amazon, NVIDIA, Cohere, G42, Naver). Add any?
7. **Run the cross-family check** (`gpt-check-input-2026-10-15.md`) before any cell, above all any "not found" cell, is used beyond exploration.
