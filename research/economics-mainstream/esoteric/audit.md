# Esoteric strand: audits, the GPT check and dispositions

Machine checks are not human review; no human has inspected these records. The correction pass of 2026-10-15 comes first; the preparation and same-family audit of 2026-10-11 are kept below as recorded.

# Maintainer decisions applied: E05 boundary (2026-10-15)

The maintainer decided the E05 boundary on 2026-10-15. The sections below are kept as recorded; where they say E05 is pending, this section supersedes them.

- **Boundary: option A.** A passage articulates E05 only if it explicitly says something about the state of economics on the topic (new, neglected, speculative, on the agenda, beyond economists' existing tools). Economists' engagement itself is recorded under E01–E04 and in the timeline. E05's criterion in `pack.json` now says so; the earlier wording is kept as `criterionBefore`.
- **Sub-question: Hanson's "machine intelligence" is not AGI for E05**, consistent with E02 and the E02/M05 boundary. E05-02's "very little research seems to have been done" therefore does not become E05's earliest located; it stays with the parent pack's M09.
- **The nine deferred passages stay bears-on.** GPT's raises are rejected under the decided criterion. Each qualification now ends with the reason, and `auditDispositions` has one entry per passage:

| Passage | Reason it does not articulate E05 under option A                                                                  |
| ------- | ----------------------------------------------------------------------------------------------------------------- |
| E05-01  | Sets a standard for singularity advocates; nothing about the state of economics.                                  |
| E05-02  | Its neglect statement is about machine intelligence that does human jobs, not counted as AGI for E05.             |
| E05-03  | As E05-02: a call for scrutiny of machine intelligence as labour.                                                 |
| E05-04  | Describes Hanson's own method.                                                                                    |
| E05-06  | Says which field should frame the question, not what economics has done.                                          |
| E05-10  | Names and assesses a hypothesis; no statement about the field.                                                    |
| E05-17  | Novelty relative to the author's earlier paper, not to the field.                                                 |
| E05-25  | Sets the singularity aside in one paper.                                                                          |
| E05-27  | "Often outside of economics" describes a cited review's coverage. The closest case; no role depends on it (2025). |

- **Earliest located, recomputed (tier 1 and tier 2): no change.** E05 tier 1 stays E05-07 (Nordhaus, September 2015; E05-08 shares its date and source). No tier-2 passage articulates or contests E05, so E05 has no tier-2 holder. No other proposition is affected. Had the sub-question been answered yes, E05-02 (attested 2000-08-19) would have taken the tier-1 role.
- **Checks.** `tools.mjs verify` (with `PACK_DIR`): 119 passages, 0 problems; it also checks that each earliest-located role is held by the earliest own-voice articulation or contest in its tier. Quotations were not changed by this decision.

# GPT cross-family check: correction pass (2026-10-15)

## The check

- **Reviewer:** GPT-6 in Codex (exact build not exposed), run on 2026-10-15 against the brief of 2026-10-14. Report: [gpt-check-2026-10-14.md](gpt-check-2026-10-14.md); item-level data: [gpt-check-2026-10-14.json](gpt-check-2026-10-14.json). It is the cross-family check required before admission; it is still a machine check, not human review.
- **Blind, per the brief.** The reviewer saved a judgement for all 119 passages and sealed them (2026-10-15T07:01:37Z, SHA-256 in the report) before opening the verdicts, then the pack, scope, timeline and audit. The brief itself disclosed tiers, earliest-located claims and the audit's target groups, so the check was blind to the pack's verdicts, not to every preparer decision.
- **Result:** all 119 quotations match. Relation agreement 97/119; **22 relation disagreements**. 59 passages disagree on at least one field.

## How the disagreements were adjudicated

A Claude Code session (Claude, the preparer's model family) re-read the cited passages in freshly retrieved copies on 2026-10-15 and decided each disagreement on the evidence. The maintainer's tier decisions of 2026-10-11/12 were applied. The E05 boundary was not decided: it is a definition question, set out below for the maintainer. Each change is in `pack.json` (`auditDispositions` dated 2026-10-15, `decisions["2026-10-15"]`) and in the passage's qualification.

### The 22 relation disagreements: 9 accepted, 4 rejected, 9 deferred

| Passage | Pack → GPT             | Disposition | Reason                                                                                                                                                                    |
| ------- | ---------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| E01-09  | contests → bears-on    | accepted    | Hanson's "less than 1%" is for one hand-coded system going suddenly from powerless to dominant; E01 does not require locality or suddenness. His loop critique is E01-10. |
| E01-11  | contests → bears-on    | accepted    | Doubts one team's architectural innovation causing a takeover within weeks; the post accepts future superintelligences.                                                   |
| E01-21  | contests → bears-on    | accepted    | Gans's AI still activates research-specialist AIs (sec. 9); only power-accumulating successors are avoided. The pack's own qualification already said so.                 |
| E02-08  | bears-on → articulates | accepted    | The reported worry names a superintelligence. Reported passages articulate elsewhere (E02-04, E02-06, E02-07); voice, not relation, keeps them out of earliest located.   |
| E02-10  | bears-on → articulates | accepted    | "An intelligence smarter than humans", reported; same reasoning as E02-08.                                                                                                |
| E05-09  | bears-on → articulates | accepted    | Puts singularities and superintelligence on an economics research agenda, which the E05 criterion names. Holds under either E05 reading.                                  |
| E05-13  | bears-on → articulates | accepted    | An explicit statement that economists' principal–agent tools are inadequate for superintelligence control: a statement about the state of economics on the topic.         |
| E05-19  | bears-on → articulates | accepted    | The profession's inattention to AI-driven growth singularities is the same topic as Nordhaus's E05-08, which articulates. Keeping one and not the other was inconsistent. |
| E05-29  | articulates → bears-on | accepted    | The abstract calls for an economics of transformative AI in general and never names superintelligence, AGI, the singularity or existential risk. Context-only added.      |
| E01-12  | bears-on → contests    | rejected    | The quoted words are Hanson's concession; the doubt is in the next sentence, and it concerns foom (the sense of E01-09, E01-11).                                          |
| E01-30  | bears-on → articulates | rejected    | The AI-improving-AI sentence is the preceding one (E01-29, articulates). These words state only the hypothesis's prediction for economic conditions.                      |
| E03-02  | bears-on → articulates | rejected    | About emulations, which the strand keeps outside designed AI (kept disagreements of 2026-10-11; now stated in scope.md).                                                  |
| E03-04  | bears-on → articulates | rejected    | The reported doom scenario is not economic analysis, and the authors set it aside by assumption. Mention and exclusion do not "treat" the risk.                           |
| E05-01  | bears-on → articulates | deferred    | E05 boundary (below). GPT would also give it E05's tier-1 earliest located.                                                                                               |
| E05-02  | bears-on → articulates | deferred    | E05 boundary; also whether Hanson's "machine intelligence" counts as AGI for E05.                                                                                         |
| E05-03  | bears-on → articulates | deferred    | As E05-02. Locator corrected to p. 12 (from GPT's check).                                                                                                                 |
| E05-04  | bears-on → articulates | deferred    | E05 boundary. GPT would give it E05's tier-2 earliest located.                                                                                                            |
| E05-06  | bears-on → articulates | deferred    | E05 boundary.                                                                                                                                                             |
| E05-10  | bears-on → articulates | deferred    | E05 boundary. Tier moved to 1 (KAK) and context-only added regardless.                                                                                                    |
| E05-17  | bears-on → articulates | deferred    | E05 boundary; the novelty claim is relative to Jones (2016), not to the field.                                                                                            |
| E05-25  | bears-on → articulates | deferred    | E05 boundary. Context-only added regardless (starts inside one of four effects).                                                                                          |
| E05-27  | bears-on → articulates | deferred    | E05 boundary; "often outside of economics" is a remark in a citation.                                                                                                     |

Engagement labels follow the relations: E01-09, E01-11 and E01-21 lose `engages-premise` and the `contesting` role. No contest gained an engagement label, because the one proposed new contest (E01-12) was rejected.

### Other fields

- **Context only, accepted (19)** where the quoted words lack an antecedent or subject, start or stop mid-sentence, omit the scope of a reported consensus, or drop a qualification that follows: E02-11 (holds E02's earliest located), E01-10, E04-03, E01-27, E02-06, E03-10, E05-11, E01-29, E03-15, E05-12, E05-16, E05-20, E05-28, E05-32, E05-07, E03-14, E05-25, E05-10, E01-24. E05-29's is listed with its relation.
- **Context only, rejected (18)** where the condition, hedge or attribution is already in the quoted words, or the request is for useful background: E04-04, E01-31, E03-05, E04-13, E05-24, E01-17, E01-19, E02-01, E02-05, E02-07, E01-26, E02-17, E03-20, E03-17, E05-21, E05-31, E05-27; and E02-03 keeps its existing flag (GPT would remove it; the audit's reason still holds).
- **Flags:** E01-24 gains "model scenario" (abstract-level summary of formal models).
- **Voice:** E02-05 is the authors' own observation that a debate exists (reported → own); relation unchanged.
- **Qualifications corrected:** E05-07 (it does not establish that economics had no prior analysis), E01-07 (a conditional critique, not a denial), E03-14 (a negative externality, and the 2018 paper is in this pack), E05-18 (not a census; "not primarily by choice" is in the main text, not footnote 38), E05-28 (July 2026 revision attestation).
- **Locator:** E05-03 is on p. 12, not p. 11 (GPT's page check; web.archive.org was not reachable here to re-check).
- **Tier source:** Hanson 1998's tier basis no longer claims an economics PhD (below).

### "AI Go Foom": 20 November 2008

The compilation heads the post "10 November 2008". The original Overcoming Bias page (retrieved 2026-10-15, recorded in `foom-2013.postDateChecks`) shows "Nov 20, 2008", and its `datePublished` is 2008-11-20T03:00:00Z. The compilation's date cannot be right: the post quotes "Setting the Stage" (18 November 2008), and the compilation places it between posts of 20 and 21 November. E01-08's locator, `postDate` and qualification now give 20 November. The timestamp is UTC and may fall on the evening of 19 November in US time; the 2008 page itself was not retrieved. The 10 November date appeared only in E01-08 and in this audit's 2026-10-11 section (kept as recorded, below).

## Tiers (maintainer decisions of 2026-10-11/12, applied)

- **Hyytinen, KAK 4/2017: tier 2 → 1.** KAK is a core venue for the Finnish strand (decision of 2026-10-12), and the core-venue clause is tier 1 regardless of form. Nor is the editorial clearly outside scholarly work: it is signed by the journal's editor, identified in the issue as a professor of economics ("taloustieteen professori"), and cites Brynjolfsson and McAfee, Nordhaus (2015) and Aghion, Jones and Jones (2017) with a reference list. Its date is now issue 4/2017 at year precision: the upload path suggests December but does not establish it. E01-19 and E05-10 are tier 1; neither holds a role.
- **Hanson 1998, standing at the time of writing.** Unlike 1994 (the economics-growth pack moved "If Uploads Come First" to tier 2: no economics degree or appointment), by 1998 Hanson had economist standing: the archived January 1999 homepage and vita show an economics address, economics teaching in 1995–96 and economics publications before 1998, with a 1997 PhD whose field the vita does not name. These pages were checked by the GPT review; web.archive.org refused connections in this pass, so they were not re-read. The journal article (`hanson-1998-singularity`) stays tier 1 and its basis no longer says "economics PhD". The symposium comment stays tier 2 by form (a short-form online comment), not by standing; the working paper stays tier 1. The 2008–2013 debate stays tier 2 (decision of 2026-10-12).

## Earliest located, recomputed

Within tier 1, per proposition and relation, own voice, by the date of the checked wording: **no tier-1 role moved.** The tier-2 earliest is now assigned separately (role `earliest-located-tier-2`), as `verify` requires since the decision of 2026-10-12.

| Proposition | Tier 1 articulation | Tier 1 contest | Tier 2 articulation                 | Tier 2 contest                                 |
| ----------- | ------------------- | -------------- | ----------------------------------- | ---------------------------------------------- |
| E01         | E01-16 (2017-10)    | E01-18         | E01-13 (Yudkowsky, 1 December 2008) | E01-05 (Hanson symposium, attested 2000-11-17) |
| E02         | E02-11 (2023-11-29) | none           | E02-03 (Hanson, 3 July 2011)        | none                                           |
| E03         | E03-03 (2015-09)    | none           | none                                | none                                           |
| E04         | E04-10 (2023-11)    | none           | E04-01 (Hanson, 16 November 2008)   | none                                           |
| E05         | E05-07 (2015-09)    | none           | none                                | none                                           |

- **E01, tier 2.** With E01-09 and E01-11 lowered, the tier-2 contests are E01-05 and E01-10; E01-05 is earlier. The only own-voice tier-2 articulation is Yudkowsky's E01-13; Hanson's E01-04 and E01-08 are reported.
- **E04, tier 2.** E04-01, -03, -04 and -05 share the compilation's 2013 date; by post date E04-01 (16 November 2008) is first.
- **E05** stays with Nordhaus (E05-07) pending the boundary decision. If the maintainer takes option B below, it moves to Hanson 1998 (E05-01, attested 1999-01-28) and the tier-2 role goes to E05-04 (18 November 2008).
- E05-07 is now context-only and its qualification no longer says economics had no prior analysis.

## Decision note: the E05 boundary

E05 reads "Economics has engaged with, or neglected, superintelligence, AGI and the singularity". Its criterion: "Not a criterion for a single passage. Assessed from the dated record and from texts' explicit statements that the topic is new, neglected, speculative or now on the agenda of economics." The pack has read "articulates" as an explicit statement about economics (the second half). GPT reads it as also covering any documented economic engagement (the first half). The evidence does not settle this; it is a definition.

- **Option A (current, recommended): articulates = an explicit statement about the state of economics on the topic** (new, neglected, speculative, on the agenda, tools inadequate). Engagement itself stays visible through E01–E04 and the timeline (the "dated record"). E05-01, -02, -03, -04, -06, -10, -17, -25 and -27 stay bears-on; E05's earliest located stays E05-07 (Nordhaus 2015). This matches the parent pack's M09, whose earliest located is a self-description (M09-27) read with the dated record. Its weakness is that the 2015 role can be misread as "economics first engaged in 2015"; E05-07's new context-only flag and qualification, and the timeline from 1998, guard against that.
- **Option B (GPT): articulates also = an economist's substantive engagement with the topic.** The nine deferred passages become articulations; E05's tier-1 earliest moves to Hanson 1998 (E05-01, attested 1999-01-28) and a tier-2 role goes to E05-04 (2008). E05 then largely duplicates E01–E04 and its articulations mix self-descriptions of the field with ordinary contributions.
- **Option C: split E05** into E05a (documented economic engagement; earliest Hanson 1998) and E05b (explicit statements about the field's engagement or neglect; earliest Nordhaus 2015). It keeps both questions visible but adds a proposition and re-sorts 33 passages.

A second, smaller question applies under A: whether Hanson's "machine intelligence" (machines that can do human jobs) counts as "AGI" for E05. If yes, E05-02's statement that "very little research seems to have been done" is an explicit neglect statement and becomes E05's earliest located (attested 2000-08-19). Recommendation: no, consistent with the E02/M05 boundary (doing all jobs is not cognitive superiority), so it stays with the parent pack's M09.

## Checks

- Sources re-retrieved on 2026-10-15 with `tools.mjs fetch` from the recorded URLs: every NBER, AEA, MIRI and KAK source returned HTTP 200. The PDFs (NBER, MIRI, KAK) are byte-identical to the recorded SHA-256 values; the six HTML pages (AEA and the five NBER abstract pages) differ by 36–182 bytes of page furniture, and every quotation from them still matches. **web.archive.org refused every connection** (connection reset, the session's network policy), so the four Wayback sources (Hanson's three 1998–2000 texts and the October 2023 Trammell–Korinek capture) were not re-read.
- `verify` (with `PACK_DIR`): 119 passages, 0 problems. 98 quotations match the fresh copies and one (E05-33) spans a text-layer break, checked by hand earlier; the 20 passages from the Wayback sources show "no-cache". Those were last verified on 2026-10-11 by the preparer and on 2026-10-15 by the GPT check, whose capture bodies matched the recorded SHA-256 values.
- `pnpm check` passed (format, lint, typecheck, 54 test files: 472 passed, 1 skipped; build). `pnpm check:privacy` passed. Nothing was admitted into `data/`; the test that the esoteric pack admits nothing still passes.

# Preparation and same-family audit (2026-10-11)

Report dated 2026-10-11. Machine checks are not human review; no human has inspected these records.

## Preparation

- **Retrieval:** one Claude Code session (Claude Opus 5.5) retrieved the sources listed in `pack.json` on 2026-10-11. On that day the Wayback Machine answered again: Hanson's 1998 texts and the October 2023 version of Trammell and Korinek come from dated captures, and the capture timestamps were checked by the tool. The five newest NBER PDFs returned HTTP 403, so their abstract pages were used.
- **Passage finding:**
  - Two fresh-context sub-agents of the same model found 111 passages.
  - The preparer added eight from the October 2023 Trammell and Korinek version, after finding that none of the 2026 revision's quoted wording occurs in it.
  - `tools.mjs verify` (with `PACK_DIR`) checks every quotation: 119 passages, 0 problems. One footnote that spans a text-layer line break was checked by hand.

## Audit

- **Auditors:** two fresh-context sub-agents (A1, A2), Claude Opus 5.5, the **same model family** as the preparer. This does not meet the cross-family requirement.
- **What the auditors saw:** quotation, locator, proposition and source metadata. They did not see the preparer's relation, voice, context or qualification.
- **Coverage:** 85 of 119 passages.
  - 73 targeted: every earliest-located role, reported voice, E01 articulation and contest, Hanson–Yudkowsky passage, abstract-page passage, KAK passage, Hanson symposium passage, model scenario and contest.
  - 12 at random from the rest (mulberry32, seed 20261011).
- **A2 also reviewed scope.md.**
- **Results:**
  - All 85 quotations match.
  - A2 confirmed that every Trammell and Korinek quotation is attributed to the right version (2023 or 2026).
  - Five locators lacked a page or were one page off.

## Dispositions

The full list (60 entries) is in `pack.json` under `auditDispositions`.

**Relations lowered to bears-on (12).** The quoted words do not meet the criterion, or fall on the growth side of the scope boundary:

- E01-06, E01-12, E01-15, E01-20 and E01-27;
- E02-08 and E02-10 (reported warnings);
- E03-04 (a reported footnote);
- E04-06 and E04-08 (a counterfactual, and the question of halting AI);
- E05-19 ("these possibilities" are growth singularities);
- E05-30 (an abstract list).

**Voice.**

- Korinek and Stiglitz's "broad agreement" that AGI would soon become super-intelligent (E02-06) is marked reported.
- Further reported views flagged by the auditors are marked.
- Reported passages cannot hold earliest located.

**Context-only (27).** Added where an auditor named the missing context. The two most serious cases:

- Hanson summarising Yudkowsky's argument in order to rebut it (E01-08).
- Hanson's concession followed by "seems unlikely to generate foom" (E01-12).

**Dates.**

- Four Hanson–Yudkowsky passages come from 2011 and 2013 posts and now carry their post date. Every compiled post now carries its own date.
- The compilation's date for "AI Go Foom" (10 November 2008) is out of sequence and is flagged.
- Andrews and Farboodi carry their July 2026 revision date.
- The 2026 Trammell and Korinek record now points to the separately retrieved 2023 version.

**Qualifications.**

- The conditions of every quantitative claim, as checked by A2:
  - 1-in-3 under log utility;
  - 2.6% with γ = 3, an immediate singularity and a one-time risk;
  - at least 1% of GDP in most scenarios;
  - 8.1% as a Monte Carlo mean with a median of about 6.4%;
  - racing only above a critical market size.
- Nordhaus's dropped conditions (E01-15, E03-03).
- The 2026 replacement of the 2023 statement that existential risk was absent from economics (E05-18).

**Tiers.**

- Hyytinen's 2017 editorial moves to tier 2 (short-form).
- Hanson's 2008 IEEE Spectrum article (lead EL5) moves to tier 1 (an economist's magazine article).

**Scope.** E01's acceleration requirement, the tier rule including economists' magazine articles, the handling of non-economist origins, and the second Wayback capture are now stated.

**Kept disagreements (raises not adopted).** These stay bears-on because they concern growth, emulations or one subtopic rather than the proposition as defined:

- Auditors read E03-02, E05-04, E05-05, E05-06, E05-09, E05-10 and E05-25 as articulating.
- An auditor read E03-02 as contesting.

## Earliest located after the dispositions (tier 1)

| Proposition                         | Articulating                                                             | Contesting                                                    |
| ----------------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------- |
| E01 AI improving AI                 | Aghion, Jones and Jones, October 2017 (model scenario, E01-16)           | Aghion, Jones and Jones, October 2017 ("fishing out", E01-18) |
| E02 Beyond human cognition          | Trammell and Korinek, October 2023 version, attested 2023-11-29 (E02-11) | none                                                          |
| E03 Existential risk in economics   | Nordhaus, September 2015 (E03-03, conditional)                           | none                                                          |
| E04 Developer incentives and safety | Gans, November 2023 (E04-10)                                             | none                                                          |
| E05 Engagement or neglect           | Nordhaus, September 2015 (E05-07)                                        | none                                                          |

Tier 2 texts are earlier: Hanson's 1998 symposium comment contests E01, and the 2008 debate contests E01 and discusses E04. If the maintainer moves them to tier 1, they become the earliest located contests.

## For the cross-family (GPT) check

Not yet prepared for this strand. (Prepared on 2026-10-14 and run on 2026-10-15; see the correction pass above.) The passages most in need of it:

- every earliest-located record in the table above;
- E05-18 and its 2026 replacement;
- the Hanson–Yudkowsky passages (voice and post dates);
- Jones's quantitative claims (E03-10 to E03-19);
- the E02 boundary (Restrepo, Korinek and Suh, Jones).
