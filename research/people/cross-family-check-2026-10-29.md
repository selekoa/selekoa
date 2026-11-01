| Scope             | Checked |   Agree | Partly |
| ----------------- | ------: | ------: | -----: |
| Role and founding |      40 |      31 |      9 |
| Identity          |      33 |      31 |      2 |
| Statements        |       7 |       6 |      1 |
| Authorship        |      36 |      35 |      1 |
| **Total**         | **116** | **103** | **13** |

# People pack cross-family check, 30 October 2026

GPT-family, GPT-6-based Codex; exact serving version was not exposed. All 73 own Part A answers were committed and pushed in `d5ca38c` before the verdicts or audit were opened. All 116 own answers were written before comparison. The pack, drafts, review note and separate audit-A/B reports remained unopened. The JSON preserves the blind answers and records comparisons separately.

Part B has seven statements and 36 authorships: six company-text attributions and 30 paper credits. The prefix `pp-st` is not itself a category. Every numbered item has an answer; “partly” includes retrieval limits and evidence repairs, not just factual disagreement.

## Comparison

- **10 — Nadella chair date kind.** The interval starts on what its own note calls only an announcement date. Add effective-date evidence or retain an announcement event. A supplementary [Microsoft 2021 proxy capture](https://web.archive.org/web/20260826083929id_/https://www.sec.gov/Archives/edgar/data/789019/000119312521298757/d189481ddef14a.htm), timestamp **20260826083929**, explicitly says “Effective June 16” in its 2021 Board Leadership account. It supports an effective start of **16 June 2021**. The listed 2026 proxy remains unverified here.
- **76 — false no-date qualification.** The verdict says Nadella’s shareholder letter has no exact date. Its [closing signature](https://www.microsoft.com/investor/reports/ar25/index.html) prints **15 October 2025**. The retrieved SHA-256 exactly matches the preparer’s, so changed bytes do not explain this. The byline and supplied year remain correct; replace the no-date note.
- **71–72 — name bridges.** The listed NVIDIA and Oracle pairs print the forms correctly but concede they do not explicitly equate them. Matching titles across texts falls short of the requested rule. Stanford’s [Huang profile](https://stvp.stanford.edu/people/jensen-huang) has a Jensen Huang heading and a Jen-Hsun Huang biography. Apple’s [2002 Ellison release](https://www.apple.com/newsroom/2002/09/20Larry-Ellison-Resigns-as-Apple-Director/) uses Larry Ellison in the title and identifies that director as Lawrence J. Ellison in the opening. These supply same-text bridges.
- **32, 38, 40 — printed Chinese forms.** The page prints **黄蕙雯**, **马杰**, **沈鹏飞**, with the checked roles/responsibilities. It does not print or explicitly link the supplied Latin forms. Preserve the originals and mark transliterations as such; do not treat them as source-printed aliases.

The remaining qualified items concern access or historical expressions: **5, 8, 9, 35, 36, 85**, plus earlier-retrieval qualifications on **32, 38, 40**. No unsupported alias was silently merged.

## Comparison with audit.md

The audit’s main date distinctions hold: joining versus tenure; announced versus effective roles; document-limited open intervals; Oracle appointment versus filing dates; undated founding credits; and live bylines versus historical role evidence. Its institutional-page caveats correctly limit those pages to printed credits, not employment or independent biography. Hennessy’s statements remain the board’s own account.

**Corrections to this checker:** my blind answer 25 overread the 1999 context as a start; the pack’s snapshot is preferable. My blind answers 29 and 33 incorrectly dated mutable bylines to the post’s 2023 date; the audit correctly uses retrieval snapshots. My initial objection to 86 came from flattened text: actual HTML confirms the third-from-end prose paragraph, so that objection is withdrawn. These corrections sit beside the preserved answers in JSON.

The audit sampled an earlier 118-item frame; this report checks the final 116-item brief. It does not certify the withdrawn Dafoe item or other earlier-frame items. Audit agreement is not independent corroboration or human acceptance.

## Retrieval and verification limits

All 63 listed source URLs were attempted fresh by direct HTTP. Requests were sequential with at least eight seconds between starts per host; refused pages used paced archive indexes and captures. The JSON records URLs, timestamps, hashes, failures and locators. Different raw bytes are reported without assuming a substantive change.

- The listed Alphabet 2019 8-K, Microsoft 2021 8-K and Microsoft 2026 proxy returned SEC 403; exact and scheme-independent archive queries located no captures. The Alphabet proxy confirms December 2019, but this check does not authenticate the exact day/immediate-effect sentence or Microsoft’s stated 2026 confirmations.
- Ziebarth’s temporary CV URL returned 410. The stable link from his own homepage delivered the exact preparer-hash PDF. Nature returned a challenge with HTTP 200; AlphaFold was checked in [capture 20261021215512](https://web.archive.org/web/20261021215512id_/https://www.nature.com/articles/s41586-021-03819-2).
- A 30 October retrieval does not by itself establish an exact 15/29 October expression. For 85, the words match both [capture 20261016163942](https://web.archive.org/web/20261016163942id_/https://group.softbank/en/philosophy/message) and today’s page; the exact 29 October expression remains unverified. This is a provenance limit, not contradictory wording.

## Checks and next step

Report coverage, structure, quotation lengths, task-file formatting, focused editorial/review-generation tests and staged privacy checks passed. Only the two requested reports are changed. No data, pack, code or human review was altered. No PR was opened.

Maintainer disposition is needed for the date-kind, no-date and alias-evidence repairs. Admission or data corrections require a separate task.
