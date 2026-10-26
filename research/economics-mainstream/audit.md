# Fresh-context audits and dispositions

Machine checks are not human review; no human has inspected these files. Pass 1 (the passages, timeline and census) comes first; the pass-0 audit of the scaffolding is kept below as it was recorded.

# GPT cross-family check: maintainer dispositions (2026-10-12)

## The check

- **Reviewer:** GPT-6 in Codex (exact deployment not exposed), on 2026-10-12, against the brief of 2026-10-11. Report: [gpt-check-2026-10-11.md](gpt-check-2026-10-11.md); item-level data: [gpt-check-2026-10-11.json](gpt-check-2026-10-11.json). This is the cross-family check that decision D6 requires; it is still a machine check, not human review.
- **Not fully blind.** The brief required the reviewer to read audit.md first, and audit.md names the pack's judgments on the riskiest items, so the check was not fully blind. The reviewer saved independent judgments for all 66 items (with a digest) before opening the verdicts file; the JSON keeps those first-pass judgments and every later revision.
- **Coverage:** 62 passages and 4 KAK items, each quotation re-checked against a freshly retrieved copy. The other 153 passages, the full title census and the full KAK crawl were not re-audited.
- **Result:** relation agreement 58/62; 40 passages agree and 22 disagree on at least one field; all four KAK classes agree.

## Dispositions (maintainer, 2026-10-12)

The maintainer accepted all of the reviewer's final disagreements. Each change is in `pack.json` (`auditDispositions`, dated 2026-10-12) and in the passage's qualification.

- **Relations to bears-on (4):** M01-04 (Nourse's newness is technological, in feedback control), M02-17 (the conclusion accepts substitution in prediction tasks), M05-18 (a capital share tending to one does not mean machines do every task more cheaply; workers stay well-paid), M09-11 (about Singularity writing in macroeconomics, after a discussion of Simon). Their earliest-located and contesting roles were removed.
- **Engagement (6):** M05-03, M05-09, M05-11 and M05-12 engage the premise; M05-04 and M05-07 state only the contrary. Each rationale now leads with the reviewer's reason. A search of the whole pack found no other explicit/implicit value; M01-04's was removed with its relation.
- **Context only (13):** M02-17, M03-01, M05-12, M05-14, M06a-06, M07-02, M07-04, M09-08, M09-27, M09-28, M05-28, M05-42 and M09-30, each with the reviewer's reason as the required context.
- **Locators (5):** M05-29 now cites the AEA article page's HTML abstract, not PDF p. 1. Tightened from the reviewer's page-image checks: Mansfield M01-09 to p. II-99; Leontief–Duchin M02-04 to p. 4.1, M02-06 to p. 4.19 and M06a-07 to p. 1.18. The Leontief–Duchin pages were confirmed on a fresh ERIC scan, not on the OCR text the pack cites.
- **Attribution:** M01-07 is Sporn's signed comment, joined by Haggerty, not Commission consensus. The chairman's introduction (M02-02, M05-10) is expressly outside the official report. M05-42 is a Simon quotation relayed by Nordhaus (now voice "reported"). For Leontief 1952 (M05-00, timeline), only the publisher's standfirst was retrieved; the byline does not make it Leontief's wording.

## Tier calls (maintainer, 2026-10-12)

Rule: tier 1 is scholarly work by economists in any venue, with standing judged at the time of writing, plus the core economics venues; tier 2 is texts by non-economists and short-form commentary. Earliest located is computed within tier 1; the tier-2 earliest is shown separately.

- 1955 economist testimony (Buckingham, Nourse): tier 1 (unchanged; no longer borderline).
- 1966 Commission main report (`commission1966-vol1`): tier 2, was tier 1. Economist-written appendices: tier 1 (Mansfield and Newhouse unchanged; Lynn stays tier 2 as a non-economist).
- ETLA Brief 22: tier 1 (unchanged).
- Triple Revolution memorandum (L17): tier 2 (unchanged).
- KAK texts: tier 1, as a core venue for the Finnish strand. The KAK earliest-in-crawl items do not change.
- Hanson–Yudkowsky 2008 blog debate: tier 2. It is not in this pack, so it holds no role here.

## Earliest located, recomputed across the whole pack

All 215 passages were considered, not only the 62 in the packet, per proposition and relation, within tier 1 and among passages in the author's own voice.

| Proposition | Relation    | Before (tier 1)               | After (tier 1)                                  |
| ----------- | ----------- | ----------------------------- | ----------------------------------------------- |
| M01         | articulates | M01-02 (Buckingham, 1955)     | unchanged                                       |
| M01         | contests    | M01-04 (Nourse, 1955)         | none in tier 1                                  |
| M02         | contests    | M02-17 (Agrawal et al., 2019) | none in tier 1                                  |
| M05         | articulates | M05-18 (Nordhaus, 2015-09)    | M05-20 (Acemoglu and Restrepo, wording 2017-06) |
| M05         | contests    | M05-03 (Buckingham, 1955)     | unchanged                                       |
| M09         | articulates | M09-11 (Nordhaus, 2015-09)    | M09-27 (Agrawal, Gans and Goldfarb, 2019-05)    |

No other tier-1 role moved (M02, M03, M04, M06a, M06b, M07 and M08 articulations unchanged). The Commission's move to tier 2 moved no tier-1 role: its passages held none.

- **M05.** The remaining tier-1 articulations are the four model scenarios M05-20 (NBER w22252, May 2016, wording attested from the June 2017 revision), M05-22 (2017-10), M05-24 (2017-12) and M05-29 (2018-06). The all-tasks criterion still applies; the reviewer judged that all four meet it as conditional models, and D3 lets a model scenario hold the role while it stays flagged and context-only. Earliest located is decided by the date of the checked wording, and the May 2016 wording was not checked, so M05-20 is dated June 2017. It still precedes M05-22. This confirms the reviewer's finding.
- **M09.** M09-27 and M09-30 share a source and date; M09-27 comes first in the text (p. 1). It is a 2019 self-description by the volume editors and is context-only: it does not erase the earlier record (timeline.md, 1952–2015).
- **Tier 2, shown separately** (new role `earliest-located-tier-2`): M01 contest M01-10 (Nilsson 1984); M05 articulation M05-14 (Nilsson 1984); M05 contest M05-11 (Commission, February 1966; M05-12 shares the source and date but comes later, on p. 9; Armer's M05-07 is dated only to 1966, in a condensation that postdates the report); M06a articulation M06a-04 and M06b articulation M06b-05 (Commission, February 1966).
- **Tooling.** `verify` now checks, for each proposition, relation and tier, that exactly one own-voice passage holds the role and none in the group is dated earlier; before, only tier-1 articulations were checked. A deliberately broken copy (role moved to a later passage, two tier-2 holders, a role on a bears-on passage) produced the three expected problems. `render` shows contest and tier-2 roles.

## Open, recorded and not chased

- Whether the journal version of Acemoglu (2025) changes the M08 figures: OUP returned HTTP 403 to the reviewer. The working-paper figures were confirmed.
- What "robots" means in the 1931 JPE review "Robots or Men?" (L19): HTTP 403. Crossref confirms only title, author, date and pages.
- Simon's 1965 original is unread; the pack has it only as relayed by Nordhaus and Armer.
- Follow-up leads: Simon 1965 (L01, existing) and Kai Husso's chapter on AI diffusion in the 1992 ETLA volume (L21, new, provisional tier 1), both in library-list.md.
- Maintainer follow-up, 2026-10-12: the chairman's introduction stays tier 2 with the report; Husso (L21) stays provisional tier 1 until his standing is checked. No role moves.

## Checks

- **Cache rebuilt** on 2026-10-12 in a fresh container with `tools.mjs fetch` from the URLs recorded in `pack.json`: every source returned HTTP 200 directly, including the Internet Archive OCR hosts that had failed for the reviewer.
- `tools.mjs verify`: 215 passages, 0 problems, with the extended earliest-located and engagement checks. `verification.json` is byte-identical to the previous run (no quotation changed).
- `tools.mjs render` regenerated `pack.md`.
- `pnpm check` (format, lint, typecheck, 438 tests, build) and `pnpm check:privacy` passed.
- No new same-family audit was run: this pass applies dispositions the maintainer accepted; it does not make new research judgments beyond recomputing roles under the stated rules.

# Maintainer decisions D1–D7 (2026-10-11)

## What changed

- **Tiers (D2).** Every source (49) and lead (20) re-tiered under the rule of 2026-10-11, each with a one-line `tierBasis`.
  - Sources: Leontief 1952 moved from tier 2 to tier 1. No other source changed. Newhouse stays tier 1 on an established record as an economist (Harvard Kennedy School faculty page, retrieved 2026-10-11: B.A. and Ph.D. in economics, Harvard).
  - Leads: Leontief 1982 (L04) moved to tier 1 and Einzig (L06) to tier 2. Keynes 1930 (L18) is tier 1. Two census title records cited in the timeline became leads L19 (JPE 1931) and L20 (REStud 1969).
- **Earliest located, recomputed.** No proposition-level role moved: no re-tiered source holds an articulating or contesting passage. `verify` confirms one tier-1 earliest-located articulation per proposition, with none dated earlier. At timeline level, the earliest retrieved tier-1 text on machines and employment is now Leontief (September 1952). It is known only from a standfirst that may be editorial wording. Buckingham (14 October 1955) remains the earliest tier-1 text with the author's own checked wording.
- **References (D1).** Full APA 7 references were added in `pack.json` (`notRetrieved` on 21 sources; every lead), `pack.md` and timeline.md. They cover every original or version not retrieved.
- **Model scenarios (D3).** M05-18, M05-20, M05-22, M05-24 and M05-29 now carry the flag "model scenario" and stay context-only. `verify` now fails a model scenario that is not context-only, and a source or lead without a tier basis. M05's earliest-located role (M05-18, Nordhaus 2015) now rests on a model scenario; this is stated in its qualification.
- **Library list (D4):** library-list.md, 44 entries covering 45 works, plus the optional KAK note (D5).
- **Cross-family brief (D6).** A parallel session pushed a packet the same morning (37 passages and 4 KAK items), before D1–D3 were applied. The two generators were merged into one `crosscheck` command, and the dated packet was regenerated.
  - Order: earliest-located roles first, then timeline-cited passages, then the earlier groups.
  - The new rules are stated: tier rule, D1, D3.
  - Added: the tier basis per source, and timeline and tier questions.
  - Result: 62 passages and 4 KAK items.

## Checks

- **Cache rebuilt.** The fresh checkout had no cache, so every source was re-fetched with `tools.mjs fetch` from the recorded URLs on 2026-10-11.
  - 30 files are byte-identical to the 2026-10-09 retrievals (SHA-256): every PDF and Internet Archive OCR text. One NBER PDF needed a second request after a partial transfer.
  - 11 HTML pages have the same byte length but a different hash (9 AEA abstract pages, the Scientific American page, the ETLA page), which suggests per-request tokens. Their quotations still match.
- **Quote verification** re-run on the rebuilt cache after the merge: 215 passages, 0 problems.
- **DOIs.** Every DOI-bearing reference was checked against Crossref by the preparer. A fresh-context auditor then re-checked them independently (36 DOIs).
- **Fresh-context audit.** One sub-agent of the same model family (Claude Opus 5.5) audited every tier, reference, the timeline's earliest-located statements and the M05 flags. It does not meet the cross-family requirement. Findings and dispositions:
  - Material: the timeline called the 1931 JPE review the earliest tier-1 record, but Keynes (1930, L18) is now tier 1 and earlier. Fixed: Keynes is named as the earliest tier-1 lead (not retrieved), and the Leontief 1952 claim is limited to retrieved texts.
  - Material: `verify` could not run mid-merge. Fixed by resolving the merge and re-running it (0 problems).
  - Minor, fixed:
    - "NBER volumes" in the tier text, narrowed to the Economics of AI volume;
    - the Commission report's tier basis now says most members were not economists (listed as borderline in README);
    - open page ranges harmonised as "[end page not in Crossref]";
    - library-list no longer implies Crossref confirmed Leontief 1983's end page;
    - the timeline names the leads that changed tier.
  - Minor, kept: Keynes's pages and Hoggatt's end page stay unverified, and are not supplied from memory. M05-23, M05-30 and M05-32 are conditional results marked bears-on, so they do not take the D3 flag, which applies to scenarios counted under M05. L15 keeps two books in one lead.
- `pnpm check` (format, lint, typecheck, 438 tests, build) and `pnpm check:privacy` passed.

## Open

Listed in README under "Open for the maintainer": congressional testimony as tier 1, the Commission report, ETLA Brief 22, M05's scenario-based earliest-located role, per-text tiers for KAK, and the Triple Revolution memorandum. The cross-family check has not run. (All decided or run on 2026-10-12; see above.)

# Pass 1 (2026-10-09, afternoon): passages, timeline and census

## Preparation

- **Retrieval:** one Claude Code session (Claude Opus 5.5) retrieved the texts in `pack.json` on 2026-10-09 after the network policy was opened, using `tools.mjs`. Failures are listed in `pack.md`.
- **Passage finding:** four fresh-context sub-agents of the same model, each given a group of texts and the propositions, worked against the shared cache. They produced 208 passages. The preparer added five more (Bresnahan, Brynjolfsson and Hitt 1999; Nordhaus's relay of Simon 1965; the Leontief 1952 standfirst).
- **Quote check:** `tools.mjs verify` checks every quotation against its cached text: word limits, per-source caps and the earliest-located rules. Seven quotations span a paragraph break in the text layer and were checked by hand (`manualLocatorChecks` in `pack.json`). Result: 213 passages, 0 problems.
- **Bug found during preparation:** the first version of `fetch` passed plain-text Internet Archive OCR files through an HTML stripper. That dropped text between stray `<` and `>` characters, for example all of Buckingham's prepared statement. A passage-finding agent reported it. The tool was fixed and the five affected caches were regenerated from the raw downloads before any check recorded here.

## Audit

- **Auditors:** three fresh-context sub-agents (A1, A2, A3), all Claude Opus 5.5. This is the **same model family** as the preparer, so the audit does not meet the editorial policy's cross-family requirement.
- **What the auditors saw:** each passage's quotation, locator, proposition (statement and criterion), source metadata and speaker. They did not see the preparer's relation, context or qualification. They worked against the same cache.
- **Coverage:** 125 of the 211 passages that existed when the audit started.
  - 88 targeted: every earliest-located role, every context-only passage, every M05 and M08 articulation or contest, every M01 and M09 articulation or contest, every passage from an Internet Archive OCR text (1955 hearings, 1966 Commission, 1984 Leontief–Duchin) and the Leontief 1952 standfirst.
  - 37 random: 30% of the rest, chosen with mulberry32, seed 20261009. The selection is in the preparer's scratch notes and can be reproduced from the seed.
  - Not audited: 86 random-pool passages, and the three passages added after the audit started (M09-35, M05-41, M05-42, Nordhaus relaying Simon).
- **A3 also checked every timeline row** against the cited passages and the census.

| Check                           | A1 (42) | A2 (42) | A3 (41) |
| ------------------------------- | ------- | ------- | ------- |
| Quotation matches cache         | 42      | 42      | 41      |
| Locator wrong                   | 2       | 5       | 2       |
| Voice reported or rejected view | 7       | 5       | 7       |
| Misleading if shown alone       | 26      | 31      | 25      |

Across the three, the auditors' relation differed from the preparer's on 25 passages.

## Dispositions

The full list (104 entries) is in `pack.json` under `auditDispositions`.

- **Relations lowered to bears-on (13), auditor reading adopted.** The quoted words do not meet the criterion even where the paper does:
  - M01-03, M01-06, M01-09 and M01-12 (descriptions, an agnostic statement, a general definition and a research question);
  - M01-07 (a members' comment);
  - M02-13 and M02-21 (automation in general; AI not named);
  - M03-02 (J-curve mechanism without AI named);
  - M05-13 (an objection Nilsson relays);
  - M06a-25 (industrialisation of poorer countries);
  - M06b-02 (a general call for policy);
  - M09-09 (a gap claim) and M09-24 (a renewed debate).
- **Source split.** The Commission passage on automation as "a logical extension" of earlier progress is a comment by two non-economist members (Sporn, joined by Haggerty). It moved to its own tier-2 source, `commission1966-sporn`. The timeline's Commission row now cites the Commission's own wording (M01-06).
- **Removed (1).** M05-08 was a reworded condensation (Bowen and Mangum, 1966) of the report sentence kept as M05-11.
- **Locators corrected (9).** In the Leontief–Duchin OCR the microfiche frame and page number come before each page's text, so five locators were one page late (M01-11, M09-07, M02-05, M05-15, M06b-08). Two Commission running heads were misread (M06b-05, M06b-06). Two locators named a PDF page for an HTML abstract page (M01-20, M02-13).
- **Context-only (66).** Every passage that an auditor judged misleading when shown alone and for which the auditor named the missing context now carries `contextOnly`, with the auditor's wording. Most are model scenarios, hedged or truncated sentences, and views a text reports in order to answer them.
- **Voice.** Passages that an auditor judged to be a reported or rejected view now carry `voice`. Such passages cannot hold earliest located.
- **Qualifications added:**
  - Scenario status (M06a-07);
  - the exclusion of future break-throughs (M09-07);
  - TFP rather than GDP, the 0.89% alternative and the unchecked journal version (M08-04, M08-05);
  - the Prentice-Hall condensation's unmarked deletions (Armer, M05-05 to M05-07);
  - Bright's non-economist status (M06a-05);
  - "first" attributed to the NBER editors (M09-28);
  - the sentence after Nordhaus's scenario (M05-18);
  - Stevenson's next-page qualification (M05-36);
  - the continuation of Mansfield's sentence (M09-04);
  - Cowen's sub-topic (M09-32);
  - Simon's 1965 analysis preceding Nordhaus's "remarkably little writing" (M09-11).
- **Source notes.** Chapter drafting by other Institute members (Leontief–Duchin); the v1 PDF date and the unretrieved 2024 Science version (Eloundou et al.).
- **Timeline (A3, 13 findings).** All were addressed:
  - the Commission attribution (high);
  - Mansfield's "economists and others" (medium);
  - the Nilsson row's citations (medium);
  - census wording, scenario status, the standfirst's possible editorial authorship and the dropped "could" (low).

### Kept disagreements

- **M05-18 (Nordhaus) and the other model results for M05** (M05-20, M05-22, M05-24, M05-29). A2 read Nordhaus's capital-share-to-one case as bears-on, because it is a scenario that his own tests reject. They stay articulates, because the M05 criterion says "states **or models** the possibility". Each carries its conditions and is context-only.
- **Raises not adopted.** Auditors read M03-08, M09-28, M05-38, M09-32, M07-07 and M02-20 as articulates, and M01-15, M01-17, M06b-04, M05-31 and M05-32 as contests. They stay bears-on, either because the passage relays another text (M03-08, M02-20, M07-07) or because it addresses only part of the criterion.
- **M06b-02 and M06b-03 (Nourse).** A1 read both as general policy talk. M06b-03 stays articulates: it states that firms should not shift the costs of progress onto workers.

## Timeline and census

- Every quoted fragment in `timeline.md` traces to a verified passage or a Crossref title; this was checked by script.
- The census counts titles only. Its records and per-year counts are in `pack.json` and reproduce from the cached Crossref responses (SHA-256 recorded).
- Gaps: no AER or JEL records before 1999 and no AER Papers & Proceedings before 2018 in Crossref under their ISSNs.

## Kansantaloudellinen aikakauskirja list

- **Classification:** three fresh-context sub-agents (same model family) classified the term hits in the crawled text layers and OAI records: 1960–1999, then the 1950s and 1990–2009, then 2010–2026. The preparer merged their lists into 247 texts and re-checked all 240 quotations by script (0 failures).
- **Audit:** one further fresh-context sub-agent (same family) audited 35 texts. These were all 19 subject-AI and subject-automation texts, plus 16 others chosen at random (Python random, seed 20261009). It was not given the preparer's class or summary.
- **Findings:**
  - all checked quotations matched;
  - three bibliographic errors: a title misread from OCR (Pohjola 4/1991), a page range two pages too long (Santamäki 2/1984) and missing signatories (the 1979 annual report);
  - two type corrections;
  - three quotations that state a view the author reports or rejects (Kukkonen 3/1979, Hetemäki 1/1994, Kiander 3/1997);
  - eight attribution caveats;
  - five class disagreements.
- **Dispositions:**
  - The bibliographic and type errors are corrected. The Pohjola title is marked for a check against the page image.
  - The Kukkonen and Kiander quotations are replaced by the auditor's own-voice sentences, re-checked by script. The Hetemäki quotation is removed.
  - The attribution caveats are added to the summaries.
  - Three thesis-list items move to passing.
- **Kept disagreements:**
  - Pohjola's 1989 lecture stays subject-automation; the auditor read it as passing. Its argument on what computers can and cannot replace is central.
  - Maczulskij and Kauhanen (3/2016) stay subject-automation; the auditor read it as passing. Routine-task displacement is the paper's subject.
- **Coverage:** 212 of 247 texts were not audited beyond the script check of their quotations.

## For the cross-family (GPT) check

Packet prepared on 2026-10-11 (run on 2026-10-12; dispositions above): `gpt-check-input-2026-10-11.md` and `gpt-check-verdicts-2026-10-11.json`, generated by `tools.mjs crosscheck 2026-10-11`. It covers all items below and, since the D1–D7 pass the same day, every earliest-located role and every passage the timeline cites (62 passages and 4 KAK items, no sampling). The preparing session had no access to a model from another family; a same-family check would not meet the policy.

These passages most need a check by a model from a different family:

1. **M05, all articulations and contests.** Whether model results (Nordhaus, Acemoglu and Restrepo, Aghion, Jones and Jones, Korinek and Stiglitz) meet "states or models the possibility", and whether the 1955–1966 contests engage the premise or only state the contrary.
2. **M01-02, M01-04 and M01-05 (Buckingham, Nourse).** These are the earliest-located records for and against M01. Nourse holds both stances in one statement.
3. **M09.** Whether the 1950s–60s record (hearings, Commission, Simon as relayed) and the 2015–2019 self-descriptions (Nordhaus, Sachs and Kotlikoff, the NBER introduction) are fairly represented, and whether M09-11's earliest-located role should stand, given its Singularity scope.
4. **M08-04 to M08-06.** The figures, horizon and conditions against the NBER text.
5. **Commission and condensation voice.** M05-11, M05-12, M01-06 and M06b-05 (report text) against the members' comments and the chairman's introduction.
6. **Nilsson (tier 2).** M01-10, M05-14 and M06a-06, and the second-hand Solow report M09-05.
7. **The KAK classification** in `kak.md`, especially the earliest-located items (Paukkunen 2/1963; Hautamäki, Mäkelin and Vepsäläinen 2/1988) and the class of Loikkanen 3/1994 and Tanskanen 2/2020.

# Pass 0 (2026-10-09, morning): scaffolding audit

## What was audited

The pack holds no passages and no timeline entries, because no source text could be retrieved (see `pack.md`). The audit therefore covered the scaffolding: the nine propositions, the sixteen leads, the KAK and ETLA lead list, the timeline candidates, the reader-facing text and `tools.mjs`.

- **Auditor:** one fresh-context sub-agent, Claude Opus 5.5, the **same model family** as the preparer. It does not satisfy the cross-family requirement that the editorial policy sets for contested and assessment records.
- **Inputs:** the editorial policy, the style guide and every file in this folder at commit `c743961`. It did not see the preparer's working notes.
- **Method:** reading; six spot-check web searches of its own (K01, K03, K04, K09, L03–L04, L14–L15; summaries are not evidence); offline runs of `verify` and `render`. It edited no files. `render` reproduced `pack.md` byte for byte after formatting.
- **Coverage:** all files. Passages and timeline entries: none exist.

## Pass 0 findings and dispositions

| #     | Finding                                                                                                                                | Severity | Disposition                                                                                                                                                                                                        |
| ----- | -------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1     | `searchCaveat` said only titles and URLs were relied on, but issue numbers, pages and content notes come from search summaries.        | material | Fixed: the caveat now says summary-reported details are recorded as leads, marked as reported, and none is evidence.                                                                                               |
| 2     | L04 ("the author is a roboticist") and L10 ("authors largely from an AI company") stated unverified facts.                             | minor    | Fixed: "reported"; L10's affiliation moved to "to verify".                                                                                                                                                         |
| 3     | kak.md asserted that older KAK volumes exist as scanned PDFs.                                                                          | minor    | Fixed: "may exist only as".                                                                                                                                                                                        |
| 4     | README D2 stated borderline venues as facts.                                                                                           | minor    | Fixed: "as reported in the leads (unverified)".                                                                                                                                                                    |
| 5     | README linked a missing `audit.md`.                                                                                                    | minor    | Fixed by this file.                                                                                                                                                                                                |
| 6     | "landmark" in scope.md; M09's criterion garbled with "first".                                                                          | minor    | Fixed: "texts named in the brief"; M09 now reads "the earliest located tier-1 texts, within the searched scope".                                                                                                   |
| 7     | M01 stated a field-level claim with a single-text criterion; "about 2015" differed from "before 2015".                                 | material | Fixed: M01 is text-level; the field-level reading moves to M09; the 2015 cutoff is noted as the brief's working boundary.                                                                                          |
| 8     | M02's "mainly" built a dominance judgement into the proposition.                                                                       | material | Fixed: "AI's economic effect is the automation of tasks previously performed by labour."                                                                                                                           |
| 9     | M03 joins two claims; L10 bears on neither.                                                                                            | minor    | Kept as a conjunction, now stated in a note with how partial texts are recorded (bears-on, with the missing element); L10 removed.                                                                                 |
| 10    | M04's "best understood" was evaluative.                                                                                                | minor    | Fixed: "AI's economic function is to lower the cost of prediction."                                                                                                                                                |
| 11    | M05: "including new ones" missing from the criterion; "no remaining comparative advantage" is conceptually wrong.                      | material | Fixed: statement and criterion now say machines perform every task, including later ones, at lower cost than human labour.                                                                                         |
| 12    | M06 joined a harm claim and a policy argument, with loaded wording.                                                                    | material | Fixed: split into M06a (effect on labour share, wages or employment) and M06b (argument for compensating policy).                                                                                                  |
| 13    | M08's "modest" had no threshold and the horizon was unanchored.                                                                        | minor    | Fixed: M08 records the estimate and horizon from the text's date, neutral as to size; flagged as a material quantitative claim.                                                                                    |
| 14    | M09's leads include tier-2 texts though M09 is assessed from tier 1.                                                                   | minor    | Fixed: tier-2 leads marked as context for M09.                                                                                                                                                                     |
| 16    | Auditor's search reported K01 as 3/2025, journal.fi article 164054, supporting S8 over S1.                                             | minor    | Recorded in kak.md; the conflict stays open until the PDF is read.                                                                                                                                                 |
| 17    | K04 (Hyytinen editorial, reported 2018) not found by an exact-title search; possibly conflated with K01.                               | material | Recorded in kak.md as unconfirmed; the summary sentence now says 2020–2025 (2018 if K04 exists).                                                                                                                   |
| 18    | K03 (Tanskanen 2/2020) not found by an exact-title search.                                                                             | minor    | Recorded in kak.md as unconfirmed.                                                                                                                                                                                 |
| 19–22 | K09, L03, L04, L15 consistent with the auditor's searches; L14 and L02 not confirmed.                                                  | none     | No change.                                                                                                                                                                                                         |
| 23    | `fetch` refuses redirects, mismatched Wayback captures and Wayback 200s without Memento-Datetime.                                      | none     | No change.                                                                                                                                                                                                         |
| 24    | `verify` compared mixed-precision dates as strings ("2017" before "2017-03").                                                          | material | Fixed: dates are compared at the coarser precision; overlap is not "definitely before". Tested on a synthetic case.                                                                                                |
| 25    | Undated later copies not checked; crash on a missing date.                                                                             | minor    | Fixed: an attested value of `null` cannot hold earliest located; a missing or malformed date is a problem, not a crash.                                                                                            |
| 26    | Earliest-located roles outside tier-1 articulations not flagged.                                                                       | minor    | Fixed and tested.                                                                                                                                                                                                  |
| 27    | `tier === 1` silently skipped a string "1".                                                                                            | material | Fixed: each source's tier must be 1, 2 or "outside". Tested.                                                                                                                                                       |
| 28    | The whole-text fallback accepted fragments across paragraphs without a problem.                                                        | material | Fixed: reported as a problem requiring a locator check by hand. Tested.                                                                                                                                            |
| 29    | Normalisation joined genuine hyphenated compounds at line breaks.                                                                      | minor    | Fixed: both forms are tried. Tested.                                                                                                                                                                               |
| 30    | Smaller gaps: overlapping quotes in the cap count, "..." not split, `\|` not escaped, headers not kept, run date in verification.json. | minor    | Fixed except overlapping quotes, which stay a manual check at merge.                                                                                                                                               |
| 31    | kak.md used a not-A-it-is-B contrast.                                                                                                  | minor    | Fixed.                                                                                                                                                                                                             |
| 33    | Verified records in the economics-growth pack (Nordhaus 2015, Aghion, Jones and Jones 2017, Acemoglu 2024) were not reused.            | material | Partly fixed: added as leads L17 and L18 and L11's origin, citing that pack's dates. Its passages are not reused: that branch is unmerged and under a separate check, and its passages answer growth propositions. |
| 34    | Few searches targeted pre-2015 tier-1 economics.                                                                                       | minor    | Not fixed: web search summaries cannot establish what the AER or QJE published; the planned table-of-contents search does.                                                                                         |
| 35    | `verify` did not check internal consistency.                                                                                           | minor    | Fixed for lead and passage proposition codes and source tiers. S-IDs cited in kak.md are not checked by the tool.                                                                                                  |
| 36    | The "earliest located use of the usual name" role was absent.                                                                          | minor    | Fixed in scope.md: no proposition has a usual name yet, so the role does not apply.                                                                                                                                |

## Pass 0 notes for the cross-family check

No passage exists to cross-check. When the pack is filled, these items most need a different-family check:

1. Every M05 record: whether a passage states full substitution or assumes new labour-intensive tasks. This is the proposition most open to misreading.
2. Every M09 judgement and every timeline entry that says "earliest located" for a venue or decade.
3. Every M08 figure and horizon (material quantitative claims).
4. K01's issue number and K04's existence, against the KAK archive itself.
5. M01 records before 2015, where the line between "ordinary technical change" and a distinct category is interpretive.

## Re-check corrections (2026-10-25)

The maintainer's adjudication of the same-family and cross-family re-checks of the admitted records was applied on 2026-10-25; see [`review/recheck-corrections-2026-10-25.md`](../../review/recheck-corrections-2026-10-25.md). The pack files above are unchanged and record the state at admission.
