# Arguments about catastrophic risk from advanced AI, 2000–2026

A candidate research pack for the thought spine ("Human thought and institutions around machine intelligence"): the published arguments that advanced AI could pose catastrophic or existential risk, and the published counterarguments, proposition by proposition. For each of eighteen propositions it records the earliest located articulation within a stated search, further articulating texts and contesting texts, each attributed and quoted from its primary text, and the published exchanges in which one text answers another. The spine's propositions collections lean on the Yudkowsky corpus; this pack records documented disagreement on both sides in proportion.

It is outside application data. It was machine-prepared and audited by the same model family (Claude); nothing in it is editorially accepted or human-reviewed, and the cross-family check has not been run. It changes nothing in `data/`, the application, the schema or any release. Counts are in [pack.md](pack.md); they are not copied here.

## Files

- [scope.md](scope.md): what is in and out, the search bounds, the unit of record and the rules (written first).
- [propositions.json](propositions.json): codes R01–R17 (R10 split into R10a and R10b), criteria, usual names, pairs and overlaps with dataset concepts.
- [dataset-overlap.json](dataset-overlap.json), made by [dataset-overlap.mjs](dataset-overlap.mjs): the dataset's records, dated 2000 or later, on concepts that overlap the pack's propositions. They are linked, not re-recorded.
- [pack.md](pack.md): the readable pack, generated from `pack.json`. Counts and balance; per proposition the criterion, the dataset's overlapping records, the earliest located texts and every record with its passage, locator and qualification; published exchanges; the search log; omissions, retrieval failures, open questions and sources.
- [pack.json](pack.json): sources (address, HTTP status, SHA-256, retrieval date, word count, version), documents, records in the dataset's proposition-record shape, replies (candidate `cites` claims) and debates.
- [verification.json](verification.json): the mechanical check of every quotation, every per-source quotation budget and the structural rules.
- [audit.md](audit.md), [audit-sample.json](audit-sample.json), [audit/](audit/): the same-family audit (two fresh-context auditors, 120 items), the balance and neutral-wording checks, and how each finding was handled.
- `cross-family-input-2026-10-29.md` and `cross-family-verdicts-2026-10-29.json`: the brief for a cross-family check (Part A blind, Part B direct), with the pack's answers in a separate file. Not yet run.
- [drafts/](drafts/): the five source-group drafts and the debates draft the pack is merged from, their [format](drafts/FORMAT.md) and the [brief](drafts/BRIEF.md) each drafting pass received. Corrections are made in the drafts by [reconcile.mjs](reconcile.mjs) (integrator's changes) and [audit-fixes.mjs](audit-fixes.mjs) (audit dispositions), never in `pack.json`.
- [tools.mjs](tools.mjs), [build.mjs](build.mjs): retrieval, search, quotation checking, merge, verify, render, audit sample and brief.

## Method

1. **Scope first.** [scope.md](scope.md) and the propositions were written and pushed before research began, with codes checked against those in use.
2. **Drafting by source group.** Five fresh-context passes drafted goals and drives (R01, R02, R10), misalignment (R03, R04, R06, R14), takeoff (R05, R13, R16), catastrophe and priorities (R07–R09, R11, R12) and openness and incentives (R15, R17) to a written [brief](drafts/BRIEF.md), each retrieving its sources by direct HTTP, checking its own quotations and recording its search per proposition. The integrator recorded the 2019 Facebook thread on instrumental convergence (LeCun, Russell, Bengio, Zador), which one pass could not retrieve, from the LessWrong copy through its API.
3. **Integration.** The integrator unified shared sources, corrected roles that broke the rules and reclassified records that did not meet a criterion as worded ([reconcile.mjs](reconcile.mjs); listed in [audit.md](audit.md)).
4. **Mechanical verification.** Every quotation matched against the retrieved text of its own source; 50 words per quotation and the policy's per-source budget, counting the dataset's quotations of the same expression; one earliest located articulation per proposition, none dated after another articulation; roles allowed per stance; banned labels, evaluative verbs and priority words.
5. **Same-family audit.** Two fresh-context auditors checked 120 items against the sources and tried to refute them, and read every statement for wording and the whole pack for balance. Findings were applied or held by [audit-fixes.mjs](audit-fixes.mjs), with dispositions in [audit/dispositions.json](audit/dispositions.json).
6. **Cross-family brief.** A blind brief for a reviewer from a different model family. No record is admitted before that check, under the editorial policy.

## How to read a record

- A record relates one text to one proposition. It articulates the proposition (a passage meets the criterion as worded), contests it (a passage disputes it or a premise it depends on; the engagement says whether it gives a reason or states the contrary only) or bears on it (it comes close; the missing element is named).
- **A stance is the text's, on its date.** A record says what one text states; it does not say what its author holds at another date. A signed statement records what the statement says, not each signatory's view. No person is labelled.
- **Position** (risk side or counter side) describes which way a passage argues on one proposition, for the balance count. It does not classify the author: one author can have records on both sides.
- **Earliest located** means the earliest text the recorded search found, never a first statement. Where the dataset holds earlier texts on an overlapping concept, or before 2000, they are named under the proposition.
- **Order is not influence.** Texts on one proposition are not thereby linked. A reply records only that one text explicitly answers another.

## Limits and retrieval

- **Bounded search.** Seed authors on both sides, arXiv title and abstract searches, signed statements, and texts the seed texts answer. Web search was used for discovery only. The search log in `pack.md` records what was read per proposition.
- **LessWrong and the Alignment Forum** refused direct page retrieval (HTTP 403) from this environment during drafting; posts there are under-represented, which thins the counter side of R03, R04 and R06 in particular (posts by Pope, Belrose, Barnett and others). The Internet Archive refused connections; no capture was compared.
- **Not retrieved:** "On the Dangers of Stochastic Parrots" (ACM and author copies refused), Chollet's 2017 essay on Medium, Davidson's 2023 takeoff report, LeCun's 2023 Senate testimony, the Senate Judiciary written testimony of Russell, Amodei and Marcus (the printed hearing record on govinfo was used), and the full text of Crawford and Calo (Nature, 2016).
- **Books** not accessible in full text (Bostrom 2014, Russell 2019, _AI Snake Oil_, _Enlightenment Now_, _If Anyone Builds It, Everyone Dies_) are absent except through author-posted excerpts.
- **Posts on X**, interviews written up by journalists and video without transcripts are outside the scope; much of the published pushback on extinction risk (R07) and much of the LeCun–Bengio exchange of 2023–2024 is in those forms.
- **Mutable pages.** Most web texts were read in their current copies; where a page states a later modification, the record says so.
- **Same model family.** All drafting, integration and audit passes were one model family. Agreement among them is not independent corroboration.

## Reproduction

From the repository root:

```sh
node research/risk-debate/tools.mjs fetch <cacheKey> <url>   # one source at a time; RD_UA overrides the user agent
node research/risk-debate/tools.mjs grep <cacheKey> "<regex>"
node research/risk-debate/tools.mjs check research/risk-debate/drafts/<group>.json
node research/risk-debate/dataset-overlap.mjs                # -> dataset-overlap.json
node research/risk-debate/reconcile.mjs                      # integrator's changes to the drafts
node research/risk-debate/audit-fixes.mjs                    # audit dispositions applied to the drafts
node research/risk-debate/tools.mjs merge                    # drafts -> pack.json
node research/risk-debate/tools.mjs verify                   # -> verification.json
node research/risk-debate/tools.mjs render                   # -> pack.md
# audit-sample.json was drawn once, before the audit corrections, by `tools.mjs sample 20261029 30`;
# re-running it on the corrected pack draws a different sample, so do not overwrite it.
node research/risk-debate/tools.mjs brief 2026-10-29         # -> cross-family input and verdicts
npx prettier --write research/risk-debate/
```

The cache lives in the ignored `.local/risk-debate/` folder. A fresh checkout must re-fetch each source from the address in `pack.json` under its `cacheKey` and compare SHA-256 values, since current responses may differ. The 2019 thread was retrieved from the LessWrong GraphQL API (post `WxW6Gc6f2z3mzmqKs`, field `contents.html`); its cache entry holds that HTML.
