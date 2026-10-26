# How this comparison could appear in the app (design proposal only)

A proposal for the maintainer. Nothing here is implemented, and the pack is not application data. The "Frontier safety frameworks" reading page currently says "This page does not compare or rank developers" (`src/reading/frontier-safety-frameworks.ts`). Whether to compare at all is the maintainer's decision (decision 1 in [README.md](README.md)).

## The distinction the view must keep

A comparison puts provisions side by side under a shared category. A ranking orders developers or gives them a score. The proposal compares and never ranks:

- no totals, scores, colour scales, ticks or crosses, and no sorting by "how many facets are stated";
- developers in a fixed order (alphabetical, or by first edition date), never by any count;
- "Not found" is never shown as a red or empty cell. It is a link to the search record (scope, terms, hits set aside);
- every cell shows the developer's own words. A category label never stands alone as if it were the provision.

The current limits text would change from "does not compare or rank developers" to something like: "This view places what each framework says under shared headings. It does not rank developers, and a shared heading does not mean the provisions are equivalent. It shows what the documents state, not what any developer did."

## Proposed view: "Compare a question across frameworks"

On the existing frameworks page, a second section after the per-developer histories (this follows the wireframe in the fresh-eyes report):

```text
Compare a question across frameworks
[ D3 Pause, non-deployment or non-training      v ]   Editions: (•) latest  ( ) all  ( ) choose…

 Anthropic · RSP v3.4 (eff. 2026-07-08)   "…quoted words…"            §, p. 12   [Inspect]
 Google DeepMind · FSF v3.1 (2026-04-17)  "…quoted words…"            §, p. 7    [Inspect]
 Meta · AASF v2 (2026-04-08)              "…quoted words…"            §, p. 21   [Inspect]
 Microsoft · FGF Feb 2026                 Not found in the recorded search  (show search record)
 OpenAI · FGF May 2026                    "…"                          …
 xAI · FAIF June 2026                     "…"                          …

 Mapping notes (2): Anthropic v3.4 — delay applies in two of three named scenarios; …
```

- **One question at a time, rows are editions.** A 22-column grid is unreadable on a phone and invites scanning for gaps. A question picker with one row per edition reads as a list, works at phone width and has an obvious keyboard and screen-reader equivalent (a list of rows, each a heading plus quote).
- **Latest by default, all editions on request.** "All" groups rows by developer in edition order, so a researcher can see within-developer change and cross-developer difference in one place.
- **Each row links to the claim panel** with the full locator, the edition link and its archived copy, the check date and the review state. Buttons are named by edition ("Inspect RSP v3.4 quote"), fixing the fresh-eyes finding that every button read the same.
- **Mapping notes are shown under the list, not hidden.** They are where the category fits badly.
- **Status line** as elsewhere: "A machine selected and checked these passages; no editor has reviewed them."
- **Export.** The research starter for the page gains the selected question as a Markdown table with quotes, locators and search records.

## What it would take

1. A maintainer decision to allow cross-developer comparison and the revised limits wording.
2. Admission: the pack's cells would become `states_provision` and `provision_not_found` claims (most already exist for some editions) with a facet attribute that is edition-neutral. The existing provision `kind` values (threshold, required_action, decision_authority, exception) are close to D2, D3, D4 and D6 but not to D1, D5, D7 or D8, so the facet list needs an ontology decision. The fresh-eyes report's finding that one row label ("Policy changes proposed by CEO and RSO, approved by Board") overstated v1.0 is the reason facet labels here are edition-neutral; the same rule should apply to the existing per-developer grid.
3. The cross-family check of the "not found" cells and of cross-developer mapping, before any such cell is shown.
4. Quotation totals per edition re-checked against the dataset's existing quotations (reported in `verification.json`).

## What not to build

- A heat map or matrix of S/NF symbols as the main view. It is in `pack.md` for researchers who want coverage at a glance, but in the app it would read as a scorecard.
- Automatic "differences" between developers. Differences are visible by reading the rows; the app should not generate statements such as "only two developers commit to pause".
