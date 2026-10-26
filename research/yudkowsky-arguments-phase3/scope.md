# Yudkowsky's argument history, phase 3: scope

Candidate pack 2 of the research thread in [`../yudkowsky-arguments/`](../yudkowsky-arguments/README.md). It searches three bodies of text that pack 1 did not: early web pages (1998–2010 captures), the remaining SIAI/MIRI papers, and the Arbital pages created under his account. It records one author's documented arguments over time. It is not a profile of the person, an assessment of whether the arguments are correct, or a claim of first use. Nothing here is application data or editorially accepted.

## What carries over from pack 1

- **Takes and premises** are pack 1's 29 takes (T01–T30, no T23) and their premises, reused by ID. Collection code Yxx in the dataset corresponds to Txx. No take was added or reworded. Candidate new takes are listed as open in `pack.json` (`openTakes`) and are not used.
- **Relations**, as corrected after pack 1's cross-family check and the maintainer's message-level rule (2026-10-08):

| Relation       | Meaning                                                                                                                                                                                                                                                                                                                         |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `said-it`      | He states the same proposition as the take.                                                                                                                                                                                                                                                                                     |
| `answered-it`  | He argues against the take, and the same section, message or dialogue turn gives a reason against one of its premises (message-level engagement rule).                                                                                                                                                                          |
| `disagrees`    | He states the contrary conclusion, and nothing in the same section, message or turn engages a premise.                                                                                                                                                                                                                          |
| `related`      | Same topic, different claim. Later retrospectives reporting an earlier view are `related`.                                                                                                                                                                                                                                      |
| `earlier-self` | An earlier text of his holds the take, premise included, **and** a located later text of his explicitly rejects that proposition. Both are named in the qualification. A passage that holds the take without a located explicit rejection stays `said-it`, with `cardUse: context-only` when it would read as his settled view. |

- **Roles:** `earliest-located` marks a passage whose wording is attested earlier than the earliest located passage of the same stance (articulating: `said-it`, `earlier-self`; contesting: `answered-it`, `disagrees`) admitted for that take in Selekoa data (release v0.4.0, schema 2.12). It is never put on `related` passages (maintainer, 2026-10-08), and it is never a claim of first use. `later-restatement` is used as in pack 1. "Strongest" is not used.
- **Voices** and `cardUse: context-only` as in pack 1.

## Maintainer decisions (2026-10-08)

- **Unsigned SIAI pages are excluded** unless authorship evidence is found for the page (a byline, a signed contents page for the section, or an equivalent attribution in a capture). The pre-release `CaTAI/friendly/` pages qualify through their contents page (captured 2001-04-21: "Written by Eliezer S. Yudkowsky"); the SIAI introduction, FAQ and "What is Friendly AI?" pages do not, and stay unused.
- **Earlier copies of already-admitted sentences (T12, T28)** are not new records. At admission they re-date the existing admitted records, which keep both dates: the admitted date and the earlier attested capture.
- **T30-w1 and T14-w1** are settled by the adjudication in [audit.md](audit.md#corrections-after-cross-family-check-2026-10-08), not left open for the maintainer.

## Goal and selection

For each take, the search looked for:

1. passages whose wording is attested earlier than the admitted earliest located passage of the same stance, or of a stance for which no earliest located passage is admitted; and
2. texts that address the gaps pack 1 lists as open (T17: a fixed but longer pause; T24-P1: the control point argued at length).

Passages that are neither are not added, even where they are apt. Each take's `searchNotes` records the patterns searched, what was found and what was seen but not used, and says so when nothing was found.

## Dating

- **A page's date is not a sentence's date.** A Wayback capture attests its wording on the capture date. A page's own "created" or "last updated" line, a copyright year or a version number is recorded as the claimed date; the capture timestamp is the attested date and decides earliest-located order.
- **Later reprints.** MIRI-hosted PDFs are later reprints. Their wording is dated by the earliest capture that holds it (an earlier SIAI-hosted PDF or HTML edition) where one was compared, and is otherwise undated for the original year.
- **Arbital.** The pages are read from LessWrong's 2025 import of Arbital, which keeps every Arbital-era revision with its date and editor. A quotation is dated by the earliest revision whose text holds it, and that revision must be by him. LessWrong edits after the import are not used.

## Search scope

- **Early web pages (Wayback, direct HTTP, sequential, ≥ 8 s between requests, retries on resets):**
  - tezcat.com/~eliezer: every URL with an HTTP 200 capture (7 pages, December 1998 to February 1999).
  - singinst.org, every HTML page captured before 2003 that holds a text of his (2000-06 onwards), excluding mailing-list archives, preview and mirror copies, donation and navigation pages; the GISAI, LOGI, CaTAI and Friendly AI page trees; the 2001 pre-release Creating Friendly AI pages under `CaTAI/friendly/`.
  - sysopmind.com: every page first captured before 2002 (2000-12 onwards), excluding the SL4 archive copy and directory listings.
  - yudkowsky.net: the 2007–2009 singularity pages, the "obsolete" pages and the reply to Hibbard.
  - Each capture is the earliest HTTP 200 capture of its URL in the CDX index (`collapse=urlkey`). Later captures were not compared unless a passage's qualification says so.
- **SIAI/MIRI papers:** the earliest captured copies of _Levels of Organization in General Intelligence_ (2004 PDF and 2002 HTML), "Complex Value Systems are Required to Realize Valuable Futures" (2011), _Timeless Decision Theory_ (2010), "Cognitive Biases Potentially Affecting Judgment of Global Risks" (2006 draft), "AI Alignment: Why It's Hard, and Where to Start" (2016 talk, MIRI PDF), "Tiling Agents for Self-Modifying AI" (2013, with Marcello Herreshoff), "The Ethics of Artificial Intelligence" (with Nick Bostrom), "Reducing Long-Term Catastrophic Risks from Artificial Intelligence" (2010), _The Hanson-Yudkowsky AI-Foom Debate_ (2013 ebook), and four SIAI presentation PDFs of 2006. intelligence.org itself is not reachable from this environment, so MIRI PDFs were read from Wayback captures.
- **Arbital:** every Arbital-imported page and lens on LessWrong whose creator is his account, with full revision histories (LessWrong GraphQL, `allArbitalTags` view and `revisionsOnDocument`).
- **Not searched:** comments (on any venue), Twitter/X, podcasts and interviews, books, fiction, and SL4/Extropians beyond pack 1's phase 2. The 1996 tezcat.com version of _Staring into the Singularity_ has no capture.

Retrieval failures are recorded in `audit.md`.

## Validation (each passage)

1. **Quote match:** the quotation (≤ 50 words) occurs verbatim, after whitespace, quote and dash normalisation, in the cached capture or, for Arbital, in the last Arbital-era revision; `phase3.mjs verify` also finds the earliest revision holding it and checks that its editor is him.
2. **Caps:** at most 400 quoted words per document, about 10% for documents under 2,000 words, counting quotations of the same document already in `data/evidence.json` (all sources sharing its `documentId`).
3. **Voice, date, context, rights, audit:** as in pack 1's [scope](../yudkowsky-arguments/scope.md#validation-checklist-each-passage).

## Reproduction

```sh
NODE_USE_ENV_PROXY=1 node research/yudkowsky-arguments-phase3/phase3.mjs wb-list <list.json>
node research/yudkowsky-arguments-phase3/phase3.mjs arbital-index
node research/yudkowsky-arguments-phase3/phase3.mjs arbital-revs
node research/yudkowsky-arguments-phase3/phase3.mjs grep "<regex>" [--cache wb|arb] [--before YYYY]
node research/yudkowsky-arguments-phase3/phase3.mjs verify
node research/yudkowsky-arguments-phase3/phase3.mjs render
```

The capture lists are `captures.json` and `papers.json` in this folder. Retrieval bodies stay in the ignored `.local/yudkowsky-arguments-phase3/` cache with their SHA-256 hashes.
