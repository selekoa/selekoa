# Candidate pack 2 (phase 3): preparation and fresh-context audit

Report dated 2026-10-08. It records how `pack.json` was prepared and checked. Machine checks are not human review; no human has inspected these records. A cross-family (GPT) check is planned and has not been run.

## Retrieval

All retrieval was done on 2026-10-08 by one Claude Code session through `phase3.mjs`, sequentially, with at least 8 s between Wayback requests and 4 s between LessWrong requests, and with retries on connection resets.

- **Wayback CDX listings** (first HTTP 200 capture per URL): tezcat.com/~eliezer, sysopmind.com, yudkowsky.net, singinst.org (HTML before 2003; PDFs), intelligence.org/files. Listings are cached locally; the capture lists used are [`captures.json`](captures.json) and [`papers.json`](papers.json).
- **Early pages:** 285 captures requested; 284 retrieved (HTTP 200). Many requests needed retries after Wayback connection resets.
- **Papers:** 18 PDF captures requested; 17 retrieved. `pdf-htdraft-2011` was retrieved but excluded: it is a Robin Hanson draft.
- **Arbital:** LessWrong's `allArbitalTags` view lists 1,133 Arbital-imported pages, 310 of them created under his account; with 14 lenses of his (5 further lenses on his pages created by others were fetched and set aside), 324 documents were searched. Full revision histories were retrieved for all 329 fetched documents, with no failures.

### Retrieval failures and limits

| Item                                                             | Problem                                                                                                                                                                                                                                                                                      |
| ---------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| arbital.com, arbital.greaterwrong.com, intelligence.org, sl4.org | Denied by the environment's network policy (proxy 403). Arbital was read from LessWrong's import; MIRI PDFs from Wayback captures. SL4 was not needed.                                                                                                                                       |
| www.arbital.com                                                  | Reachable, but redirects to LessWrong's wiki; `/p/` pages timed out.                                                                                                                                                                                                                         |
| `yudkowsky.net/sing.html` (2008-11-21 capture)                   | Failed three times (transfer terminated). Not searched.                                                                                                                                                                                                                                      |
| `singinst.org/upload/mindisall-tv07.pdf` (2008-08-07)            | Failed twice (transfer terminated). Not searched.                                                                                                                                                                                                                                            |
| `singinst.org/ourresearch/presentations/singularitysummit.pdf`   | Failed in the main run, retrieved on retry and searched.                                                                                                                                                                                                                                     |
| Node's `fetch`                                                   | Ignored the environment proxy, and its direct route was refused ("Blocked by egress policy") for Wayback; the responses of the first minutes of the run were discarded and every capture was refetched through the proxy (`NODE_USE_ENV_PROXY=1`). The tool now refuses any non-200 capture. |
| tezcat.com, 1996–1998                                            | No capture before 1998-12. The 1996 tezcat.com edition of _Staring into the Singularity_ and the 1998 _Coding a Transhuman AI_ have no capture.                                                                                                                                              |
| 1999-03 to 2000-05                                               | No capture of his site from these months was found under tezcat.com, pobox.com or singinst.org.                                                                                                                                                                                              |

## Passage finding

Five fresh-context sub-agents of the same model (Claude Opus 5.5) searched the offline cache with a shared brief: one for Arbital (all takes), three for the early captures (T01–T10, T11–T20, T21–T30) and one for the papers (all takes). Each recorded its regexes and negative results per take in `searchNotes`. They proposed 19 passages. The preparer then:

- **Changed relations:** T14-w1 and T28-w2 from answered-it or said-it to related, T17-w1 to related, T28-w1 from earlier-self to said-it (as for the admitted record of the same sentence, pack 1 T28-d).
- **Removed roles** so that each take keeps at most one earliest-located passage per stance: T09-r2 (then restored, see below), T24-p1 (then restored), T28-w2, T14-w1.
- **Dropped** one source (the 2006 PDF transcript "Foundations of Order") when the audit found the same sentence in an earlier capture.
- **Fixed the verifier** after a searcher's report: it no longer joins a spaced dash across a line break, and it sums quoted words per document across all pack sources and the dataset.

## Audit

- **Auditors:** two fresh-context sub-agents (A1, A2), Claude Opus 5.5. This is the **same model family** as the preparer and the searchers, so it does not satisfy the cross-family requirement for contested records.
- **What they saw:** take, premises, the admitted earliest dates, source key, locator, quotation and stated dates; not the preparer's relation, role, voice, context, qualification or card use.
- **Coverage:** all 18 passages (A1: 9, A2: 9). No sampling was needed.

| Check                                     | A1 (9) | A2 (9) |
| ----------------------------------------- | ------ | ------ |
| Quotation matches cache                   | 9      | 9      |
| Locator accurate                          | 7      | 6      |
| Stated attested date is the earliest copy | 9      | 8      |
| Relation agrees with the final pack       | 6      | 7      |
| Fit good                                  | 6      | 3      |
| Fit misleading                            | 1      | 1      |

### Disagreements and dispositions

- **T03-w1 (A1: misleading splice).** The quotation joined two sentences with an ellipsis, so "since" seemed to justify obedience. Replaced by one contiguous sentence; the condition is now in the qualification. Relation said-it and the articulating role kept; context-only.
- **T09-r1 / T09-r2 (A1: r1 weak, hypothetical "arguendo").** r1 changed to related; the earliest-located role moved to r2 (2016-06-10), which states the point as an assertion. A1 still rated r1 answered-it; the preparer's stricter reading stands.
- **T14-w1 (A1: answered-it, eligible).** Kept as related: a design footnote, not an argument against learning from failures in general. Unresolved; if answered-it, it would become the earliest contesting passage for T14 (2000-08-17 against 2000-09-05).
- **T17-w1 (A1: answered-it on P2, weak).** Kept as related and context-only; the quoted words state only a conclusion about delaying the Singularity as a whole.
- **T17-w2 (A1: locator wrong; needs his later position).** Locator corrected; qualification and context-only flag now point to his 2023 call for an enforced halt.
- **T24-p1 (A2: earlier copy).** The same sentence is in the singinst.org edited transcript captured 2004-05-07, which names him as the speaker. The passage now cites that capture and holds the earliest contesting role for T24; T24-w4 (2004-06-23) lost it.
- **T24-w1, T24-w2, T28-w2 (A2: locators wrong).** Corrected (section 3.2.4 is "Leadership strategy"; paragraphs named by their true openings).
- **T24-w1, T24-w2, T24-w3, T24-p2, T28-w2 (A2: mislead alone).** All marked context-only, with reasons.
- **T24-p2 (A2: answered-it).** Kept as related: the talk argues that a builder's intent does not fix what a smarter system optimises, but never addresses who builds first.
- **T30-w1 (A2: related, retrospective).** **Unresolved.** The preparer keeps answered-it with the earliest contesting role (2000-08-17 against 2000-11-13), because the paragraph gives a reason against T30-P1; A2 reads it as agnostic and retrospective. Marked context-only and flagged for the cross-family check.
- **T09-r2 and T24-r1 locators (A1).** Corrected.
- **Source titles (A1, A2).** The tripled pre-release title and the raw-URL title were fixed.

### Relation agreement

13 of 18 final relations match the auditor's own. The five that differ are T09-r1, T14-w1, T17-w1 and T24-p2 (preparer stricter, related) and T30-w1 (preparer less strict).

## Limits

- **Same-family checks only.** The searchers, the preparer and the auditors are all Claude Opus 5.5. A GPT cross-check is to follow; T30-w1 and T14-w1 should be in it, as should every earliest-located role.
- **Captures attest dates; they do not authenticate authorship of every sentence.** The April 2001 `CaTAI/friendly/` pages carry only an SIAI footer; their contents page (captured 2001-04-21) says "Written by Eliezer S. Yudkowsky". Unsigned SIAI pages (intro, FAQ, "What is Friendly AI?") were not used.
- **Only the first capture of each URL was fetched.** A later capture with different wording would not have been seen; an earlier copy under another URL may have been missed where no CDX query covered it.
- **Arbital through LessWrong.** Revision dates and editors are as imported by LessWrong in 2025; they were not compared with Arbital's own records, which are not reachable from this environment.
- **Search notes** quote further passages that no quotation limit has counted; like pack 1's, they are working notes, not for publication.

## Corrections after cross-family check (2026-10-08)

Input: the cross-family check in [gpt-check-2026-10-09.md](gpt-check-2026-10-09.md) (OpenAI GPT through Codex, not blinded, all 18 passages: 10 agree, 5 disagree, 3 cannot verify; run on 2026-10-08 although the filenames carry 2026-10-09). It and the earlier sections of this report are unchanged. Every adjudication below re-read the surrounding source text in a fresh retrieval. The corrector is a Claude Code session of the same model family as the preparer, so these are the preparer side's dispositions of a cross-family check, recorded for the maintainer, not an independent resolution.

Relations before → after: answered-it 8 → 7; related 8 → 8; said-it 2 → 2. Passages 18 → 17 (T12-w1 withdrawn). Earliest-located roles 7 → 5. Context-only passages 11 → 13 (T09-r1, T14-w1).

### Adjudication of every disagreement and cannot-verify

8 items: 7 accepted, 1 accepted with a different remedy (T12-w1: withdrawn rather than left unverified). None rejected.

| ID     | GPT finding                                                      | Decision               | Applied                                                                             | Reason                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ------ | ---------------------------------------------------------------- | ---------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| T09-r1 | related kept; add context-only                                   | Accepted               | Context-only added                                                                  | The quotation begins inside the proposal he attributes to "somebody", and the bullet is listed among "hypothetical examples that would, if they happened, constitute cases of failed safety". Shown alone, the proposer's claim reads as his.                                                                                                                                                                            |
| T09-r2 | answered-it → related; remove earliest-located                   | Accepted               | related; role removed                                                               | The section is about AIs that imitate a human doing consequentialism. T09-P1 is about next-token prediction; linking the two needs a step (prediction of human text = imitation of humans) that the section does not take, and his later writing treats prediction and imitation as different tasks. The preparer's own qualification already said it was not about next-token prediction.                               |
| T12-w1 | cannot verify; do not certify the April attestation              | Accepted, other remedy | Passage withdrawn; recorded in T12 `open`                                           | Ten further requests for capture 20010428192009 (three URL forms, raw and replay) all redirect to a 2021 HTTP 404. The next copy the pack named, FAI.html (20010505024645), returned HTTP 404 twelve times. The earliest retrievable copy is the admitted 2001-06-17 one, so the passage would only duplicate the admitted record.                                                                                       |
| T14-w1 | related → answered-it; earliest contesting; context-only         | Accepted               | answered-it; earliest-located (2000-08-17 against 2000-09-05); context-only         | Re-read footnote 107: "A true nonrecoverable error in the goal system … may make the AI stop wanting to correct errors", and "The 'safe goal system' requirement is in fact a Singularity precaution." That is a reason against T14-P1 for one class of failure. The preparer's ground (a design footnote, not a reply to anyone) is not required by the message-level rule. Scope kept in the qualification.            |
| T24-w1 | cannot verify; recorded July capture redirects to August         | Accepted               | Re-dated 2000-07-11 → 2000-08-17; source changed to the monolithic Plan             | The recorded capture redirects on every route to 20000829065223. The preparation run's body hash (8a7eb65f…) equals the 2000-08-29 capture's, so that run was itself served the August copy and recorded the requested timestamp: the July date was never shown. The monolithic Plan captured 2000-08-17 holds the same wording (Appendix A.2) and is the earliest retrievable copy. No role was held; none is affected. |
| T24-w4 | cannot verify; recorded June capture redirects to August         | Accepted               | Re-dated 2004-06-23 → 2004-08-14; source URL and hash updated                       | Ten requests for 20040623153032 redirect to 20040814174713. The preparation-run hash (ae5132e3…) differs from the August body, so the June copy may have been served then, but it cannot be shown now. Quotation, guideline 5 and the May 2004 byline are in the August capture. No role was held.                                                                                                                       |
| T24-p2 | related → answered-it                                            | Accepted               | answered-it; context-only kept; no role                                             | Re-read PDF pp. 10–13. T24-P1 is the builder-control premise; the same section argues the builder cannot keep control through intent, observation or patches as the system gets smarter. The preparer required rivals to be named, which the relation does not require (T12 and T13 passages were accepted on premise engagement alone). No role: attested 2018.                                                         |
| T30-w1 | answered-it → related; voice retrospective; remove role; locator | Accepted               | related; retrospective; role removed; locator corrected; earlier-self use withdrawn | Re-read the section. The quoted words report a revision of his own earlier reading of "ethical". The paragraph before says "I don't have the vaguest idea" whether superintelligences value humans, and the paragraphs after expect logical goals to win out. He does not argue that the default outcome is bad. Under the retrospective rule it is related. The admitted 2000-11-13 contest stays earliest.             |

Other GPT points adopted: T24-w2 locator now says the quotation is in 3.2.4 before 3.2.4.1. GPT's other verdicts (10 agree) were not re-adjudicated.

### Retrieval in this pass

The preparation cache was not available, so every cited Wayback source was re-fetched on 2026-10-08 (21:45–22:11 UTC), sequentially with at least 10 s between requests, without following redirects, and with retries. Arbital revision histories of the three cited pages were re-fetched from LessWrong.

- Seven cited captures came back byte-identical to the preparation run (same SHA-256): the policy page, the 2003 speech, Singularity Analysis, the monolithic Plan, Singularitarian Principles, the TMOL FAQ and the 2016 PDF. The CaTAI contents page that carries "Written by Eliezer S. Yudkowsky" was retrieved at its exact timestamp (SHA-256 273cba62…, as in the GPT check).
- Three recorded captures could not be retrieved: seed.html 20010428192009 (10 requests, all 302 to 20210418212110), collective-volition.html 20040623153032 (10, all 302 to 20040814174713), crns.html 20000711052247 (10 redirects to 20000829065223, 2 connection errors). FAI.html 20010505024645 returned HTTP 404 (11 requests, 1 connection error).
- The CDX index still lists all three captures as HTTP 200. Wayback serves the nearest capture instead when it cannot load the recorded one.

**Cause found in the tool.** `phase3.mjs wb` followed redirects and stored the body under the requested key; it recorded the served timestamp only in the ignored local metadata. For crns.html this dated a 2000-08-29 body as 2000-07-11. `wb` now refuses any response whose served capture differs from the requested one. Captures fetched in the preparation run and used only in search notes (not cited) were not re-checked; their dates carry the same risk.

### Earliest-located roles

Recomputed after the dispositions, per take and stance, against the admitted earliest dates (v0.4.0).

| Take | Before this pass (pack)          | After this pass                  | Admitted earliest it is compared with                     |
| ---- | -------------------------------- | -------------------------------- | --------------------------------------------------------- |
| T03  | T03-w1, articulating, 2001-01-25 | T03-w1, articulating, 2001-01-25 | no admitted articulating (contesting 2000-12-10)          |
| T09  | T09-r2, contesting, 2016-06-10   | none                             | contesting 2022-02-28 stays earliest                      |
| T12  | T12-w1, contesting, 2001-04-28   | none (passage withdrawn)         | contesting 2001-06-15, attested 2001-06-17, stays         |
| T13  | T13-w1, contesting, 2001-04-29   | T13-w1, contesting, 2001-04-29   | contesting 2006-02-05                                     |
| T14  | none                             | T14-w1, contesting, 2000-08-17   | contesting 2000-09-05                                     |
| T24  | T24-p1, contesting, 2004-05-07   | T24-p1, contesting, 2004-05-07   | contesting 2007-11-24 (articulating 2000-09-29 unchanged) |
| T28  | T28-w1, articulating, 2001-04-29 | T28-w1, articulating, 2001-04-29 | articulating 2001-06-15, attested 2001-06-17              |
| T30  | T30-w1, contesting, 2000-08-17   | none                             | contesting 2000-11-13 stays earliest                      |

T28-w1 is an earlier copy of an admitted sentence: under the maintainer's decision it re-dates the admitted record at admission and keeps both dates. T12 would have done the same, but no earlier copy can now be shown.

### Not resolved

- All eight dispositions agree with GPT, so no item is left where the two families differ. Relations remain judgements; T14-w1 and T24-p2 rest on the message-level rule applied to a footnote and to a talk section.
- The June 2004 Collective Volition and April 2001 seed.html captures may become retrievable again; if so, a re-check could restore those dates (no role depends on the June date).
- Uncited captures in the search notes were fetched with the redirect-following tool and were not re-checked.
