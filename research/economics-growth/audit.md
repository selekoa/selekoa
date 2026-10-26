# Candidate pack 1: preparation and fresh-context audit

Report dated 2026-10-08. It records how `pack.json` was prepared, checked and corrected. Machine checks are not human review; no human has inspected these records.

## Preparation

- **Retrieval:** one Claude Code session retrieved every text from Wayback Machine captures on 2026-10-08, sequentially, through `tools.mjs fetch` (curl). Direct requests to publisher hosts were refused by the environment's network policy. Wayback was intermittently unavailable (connection resets, the CDX index "temporarily offline"); `fetch` retried with back-off. Failures and substitutions are listed in `pack.json` under `retrievalFailures`.
- **Passage finding and classification:** the same session, offline against the cache, by targeted searches and reading of the surrounding sections (see [scope.md](scope.md#search-scope)).
- **Mechanical checks:** `tools.mjs verify` matches every quotation against the checked expression and against every other cached version of the source; enforces the 50-word, 400-word and ~10% caps; and checks that each earliest-located role sits on the text with the earliest attested date for its proposition and relation. A fabricated quotation was run through `verify` as a negative control and failed as expected.

## Audit

- **Auditors:** three fresh-context sub-agents of the same model as the preparer (Claude Opus 5.5). This is a **same-family** audit; it does not meet the editorial policy's cross-family requirement for contesting records.
- **Blind auditors A and B:** each received half of the 59 first-pass passages (A: 30, B: 29), with the propositions, criteria, source, locator, quotation and speaker, but not the preparer's relation, roles, engagement, conditions, context or qualification. Each re-read the cached text around every quotation and classified it independently. Coverage: 59 of 59 passages.
- **Targeted auditor C:** saw the full pack and checked dates, versions, earliest-located roles, conditions, context-only flags, quotation caps, labels and attribution, and searched all twelve cached texts for passages earlier than each earliest-located holder.

### Agreement on the first pass

- **Quotations:** all 59 occur verbatim in the checked expression (A, B, C, and `verify`). B flagged G04-g as starting mid-sentence without a marker.
- **Locators:** seven were wrong or imprecise (G01-a, G03-d, G04-a, G04-c, G06-a, G09-b, G09-d).
- **Relations:** the blind auditors' relation matched the preparer's on 51 of 59 passages. The eight differences were G02-e, G03-c, G04-e, G04-i, G05-b, G06-b, G06-c and G09-b; their dispositions are below. Engagement matched on every contesting passage the auditors classified as contesting.
- **Labels and priority words:** none found. Every dialogue turn is attributed to the right speaker.
- **Caps:** all met. The Asterisk debate was at 390 of 400 words before the correction pass and is under 400 after it.

## Findings and dispositions

Changes are applied in the current `pack.json` (correction pass, 2026-10-08). "Kept" means the preparer's record stands and the disagreement is recorded here.

| Item               | Finding                                                                                                                     | Disposition                                                                                                                                                         |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| G01-a (A)          | Wrong paragraph; the quotation dropped "These models also suggest that" and was cut before "to meet labor demand"           | Fixed: split into G01-a and G01-a2, full sentences, locator corrected                                                                                               |
| G03, G09 (C01–C02) | Hanson's "Economic Growth Given Machine Intelligence" projects a doubling time of one to two years around 2025 from history | Added as G03-0 and G09-0; earliest located for both moves from the December 2000 paper to this text (attested 2000-08-19)                                           |
| G05 (C03)          | Nordhaus 2015 answers the physical-limits objection; not recorded                                                           | Added G05-n (contests, engages premise); earliest-located contesting role moves from Davidson to Nordhaus                                                           |
| G04-h (A, C04)     | Clancy corrects the quoted step in his next paragraph                                                                       | Replaced with his conclusion ("Either you greatly speed up the pace of automation…"); G04-i removed as redundant                                                    |
| G09-g (C05)        | Clancy's 10–20% answers a conditional 65% filed under G01                                                                   | Moved to G01 as G01-f2, a second passage of Clancy's contesting record                                                                                              |
| G04-e (B, C06)     | Hanson's human-only jobs still give a 27-month doubling time: a contest, not bears-on                                       | Reclassified as contests, contrary-only, context-only; it now holds the earliest-located contesting role for G04                                                    |
| Dates (C07)        | Hanson's paper was dated "2000" from PDF metadata only                                                                      | Date set to undated; metadata and the Berkeley address added to the basis; claimed 1998 kept; maintainer decision on undated files recorded in the project document |
| Dates (C08)        | First-version dates handled inconsistently                                                                                  | Trammell–Korinek dated 2021-02-04 (claimed 2020-10); Erdil–Besiroglu dated 2023-10-01 (v2; claimed 2023-09-20). Earliest located unaffected                         |
| Dates (C09)        | The author's vita gives "Extropy Online, Oct. 1998" for the Vinge comment; capture claims overstated                        | Date set to 1998-10 with the vita as basis; "no earlier capture" reworded to "none retrieved; CDX unavailable"                                                      |
| Scope (C10)        | Hanson's "Is a Singularity Just Around the Corner?" (1998), cited in the comment, missing from the not-retrieved list       | Added to scope.md                                                                                                                                                   |
| G04-g (B, C11)     | Quotation began mid-sentence and read as a flat claim; condition ρ = −2 missing                                             | Quotation shortened to a whole clause; the opening "even if…" clause and ρ = −2 recorded in conditions                                                              |
| G07 (C12, B)       | Search note wrongly said nothing bears against G07; Nordhaus states it for unskilled labour; a better Hanson 1994 sentence  | Search note corrected; G07-d (Nordhaus, context-only) and G07-a2 added                                                                                              |
| G02-e (A)          | Quotation stopped before Davidson's conclusion                                                                              | G02-e2 added with the conclusion                                                                                                                                    |
| G08-b (B, C15)     | 1.1% is a ten-year level effect and can be misread as annual growth                                                         | Context-only flag added                                                                                                                                             |
| G03-d (B, C19)     | Wrong paragraph; "commissioned" overstates the comment                                                                      | Locator corrected; context reworded to "asked Roodman to evaluate Hanson's work"                                                                                    |
| Locators (B)       | G04-a, G04-c, G06-a, G09-b, G09-d                                                                                           | Corrected                                                                                                                                                           |
| C21                | Project document called Good a phase 1 author and cited a missing audit.md                                                  | Fixed                                                                                                                                                               |
| C22                | Further relevant passages seen and not recorded                                                                             | Named in scope.md as seen and not recorded                                                                                                                          |
| C23                | Conditions incomplete on G02-f; G09-b could read as a forecast                                                              | Conditions and qualification added                                                                                                                                  |

### Disagreements kept

- **G03-c (Roodman), A: bears-on.** Roodman weighs "explosion" against "implosion". Kept as articulates with a context-only flag: the criterion asks whether a transition is plausible, and the passage says the future "might be one of explosion".
- **G03-e, G09-c, A: "not rule out" is weaker than "plausible".** Kept; the criterion is about plausibility, and both passages argue against ruling the outcome out. Medium confidence.
- **G06-b, A: a count of tests is not a verdict.** Kept as the second passage of a record whose first passage (the abstract) gives the verdict.
- **G01-b, B: fits only by analogy; suggests "the growth of output is unbounded" instead.** Kept: information capital substituting for labour is the paper's mechanism, and the conditions say so.
- **G01-h, B: belongs under G07.** Kept as bears-on G01; it concerns population and per-copy wealth, and G07-a2 now covers wages.
- **G05-d, A: overlaps G04.** Kept; recorded as an open decision on the G04/G05 boundary.
- **G05-f, A: a burden-of-proof argument.** Kept as engages-premise: the turn gives reasons (parallel experiments, incentives against regulation), not only the burden.
- **G09-h, B: "100 years or more" is borderline for a century window.** Kept as contests, contrary-only.
- **G05-b (Trammell and Korinek), B: articulates.** Kept as bears-on: the passage says limits bind after growth "resembles these benchmarks for some time", not that they prevent explosive growth.
- **G06-c (Davidson), B: articulates.** Kept as bears-on: Davidson accepts the objection's finding but does not examine the data; the record names that gap.
- **G09-b (Hanson 2000), B: bears-on.** Kept as the second passage of an articulating record; its qualification now says it reports a model result and is not itself a forecast.
- **G05-c, C16: context-only flag redundant.** Kept; the flag is conservative.
- **C13 and C14 (recommendations on G04/G05 and the G09 threshold).** Not applied; they change propositions and belong to the maintainer (project document, open decisions 11 and 12).

## After correction

- 9 propositions, 65 passages, 13 authored records from 12 documents.
- Relations: articulates 41, contests 16 (engages premise 14, contrary-only 2), bears-on 8. Twelve passages are context-only.
- `verify`: all quotations match; caps kept; earliest-located roles consistent with attested dates.
- The correction pass was not re-audited by a fresh agent. The added passages (G01-a2, G01-f2, G02-e2, G03-0, G04-h, G05-n, G07-a2, G07-d, G09-0) have had only the preparer's check and `verify`.

## Passages that most need a cross-family (GPT) check

Ordered by how much a wrong call would change the pack.

1. **G03-0 and G09-0** (Hanson, undated paper): they decide earliest located for G03 and G09. Is a self-cited projection an articulation, and is a 2000 capture of an undated file an acceptable attested date?
2. **G04-e** (Hanson): contests, contrary-only, and earliest-located contesting record for G04. Is a model result under fixed shares a contest of a Baumol proposition?
3. **G05-n** (Nordhaus): earliest-located contesting record for G05; "at least in theory" may be too weak for a contest.
4. **G01-f and G01-f2** (Clancy): the only contests of G01, and the relocation of the 10–20% estimate.
5. **G09-h** (Nordhaus): contests G09 as contrary-only; horizon mismatch (100+ years against "about a century").
6. **G03-c** (Roodman) and **G03-g** (Clancy): the explosion/implosion framing and Clancy's concession.
7. **G02-b and G02-a** (Aghion, Jones and Jones): one text recorded as both articulating and contesting G02.
8. **G04-g** (Erdil and Besiroglu): conditions carry a clause cut from the quotation.
9. **G05-d, G05-e and G05-f** (Asterisk): G04/G05 boundary and the engagement call.
10. **G07-d** (Nordhaus): a polar case recorded as articulating while the main model contradicts the proposition.

## Corrections after cross-family check (2026-10-10)

Input: the different-family check in [gpt-check-2026-10-09.md](gpt-check-2026-10-09.md) (GPT family through Codex, not blind, 49 of 65 passages checked substantively, 10 disagreements, no cannot-verify items) and the maintainer's decisions of 2026-10-09, recorded in the [project document](../../docs/projects/economics-of-machine-intelligence.md#maintainer-decisions-2026-10-09). The check files and the earlier sections of this report are unchanged. The corrector is the Claude Code session family that prepared the pack, so these are the preparer's dispositions of a cross-family check, recorded for the maintainer; they are not an independent resolution.

**Retrieval in this pass.** The Wayback Machine reset every connection from this environment on 2026-10-10. Current copies were fetched instead. Eight of the twenty recorded expressions are byte-identical at their current URLs (same SHA-256): Hanson's two papers, both NBER and Stanford copies of Aghion, Jones and Jones, Nordhaus's NBER paper, arXiv v2 and v3 and Acemoglu's MIT paper. The current Asterisk page, Hanson's two web pages and the current GPI file (a 2023-02-03 revision of Trammell and Korinek) differ in bytes; quotations were matched in them and the results record which copy was used. Nordhaus's Cowles file (the checked expression) was not re-fetched; his passages match the byte-identical NBER copy. The Open Philanthropy pages (Davidson; Roodman with Karnofsky's comment) now redirect to coefficientgiving.org, which refused every request (HTTP 403), so 11 passages from those three sources were not re-checked in this pass. They were verified on 2026-10-08 and in the cross-family check against the recorded captures. Each source now lists its current copies in `pack.json`.

### Adjudication of every disagreement

10 items: 8 accepted, 2 partly accepted (G05-d, G05-e). None was rejected; each was re-read in the source except where noted.

| ID    | GPT finding                                                                      | Decision | Applied                                                                                      | Reason                                                                                                                                                                                                                                               |
| ----- | -------------------------------------------------------------------------------- | -------- | -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| G02-h | Qualification wrong: the 2021 text already gives φ = −2.1                        | accept   | qualification corrected                                                                      | The 2023 GPI revision has the same sentence ("estimates ϕ = −2.1") right after the quotation. The 2021 capture could not be re-read here; the correction rests on GPT's reading of it and the matching later text.                                   |
| G03-g | contests → bears-on; the turn grants history-based plausibility                  | accept   | bears-on; engagement and earliest contesting role removed                                    | The next sentence says past acceleration "is a good reason to think there is some chance it could happen again". G03 does not require an intelligence-driven mechanism, so doubting that mechanism does not contest it.                              |
| G04-g | Conditions omit the infinite-input approximation and reallocation of fixed input | accept   | conditions completed; context-only                                                           | Section 2.3 derives the boost by approximating input to automated tasks as infinite and reallocating a fixed input stock; finite AI input reduces it.                                                                                                |
| G04-j | Conditions omit timing and substitution; 25% is not a general threshold          | accept   | conditions added; context-only                                                               | The same turn ties the argument to automation "on the order of decades" rather than "a century" and to substitution not being unusually hard; 25% is illustrative.                                                                                   |
| G05-d | articulates → bears-on; slows AGI's takeover of tasks                            | partial  | moved to G04 as articulates (G04-k)                                                          | Agree it does not articulate G05: its own conclusion is that bottlenecks "persistently slow the rate at which AGI takes over tasks". Under the settled boundary that is a G04 claim, which it meets; bears-on G05 would lose that.                   |
| G05-e | articulates → bears-on; mixed adoption argument                                  | partial  | moved to G04 as articulates (G04-k2)                                                         | Same turn logic: easily automated sectors "become cheap and no longer count for much of GDP" while others are held back, a sectoral composition argument of the G04 kind.                                                                            |
| G06-a | articulates → bears-on under the literal no-sign criterion                       | accept   | bears-on; earliest role removed                                                              | Nordhaus reports two of seven tests positive and concludes "not near". "No sign yet" is not what he says. Rewording G06 is the maintainer's call (open decision 3).                                                                                  |
| G06-b | articulates → bears-on (the count includes positive signs)                       | accept   | bears-on                                                                                     | Same reason as G06-a; the passage itself names the two positive tests.                                                                                                                                                                               |
| G06-c | bears-on → articulates                                                           | accept   | articulates; context-only for the two-decade limit                                           | G06 asks what the text states on the basis of data, not that the author ran tests; Davidson states the absence of signs. Not re-read in this pass (host unreachable); the quotation and its next sentence are recorded from the 2026-10-08 check.    |
| G09-h | contests → bears-on; 100+ years overlaps "about a century", no probability       | accept   | contests removed; under the new G09 criterion it is Nordhaus's estimate record (articulates) | Correct under the old criterion. The maintainer's G09 decision replaces the threshold with each text's own estimate, so the passage now records Nordhaus's estimate: growth above 20% a year "100 years or more" away by extrapolation of two tests. |

The check's item notes also gave Erdil and Besiroglu's v2 definition exactly ("annual real gross world product (GWP) exceeding 130% of its maximum value over all previous years"); G09-f had "roughly a tenfold increase in growth rates". Re-read in v2 and corrected.

### Maintainer decisions applied

- **Source tiers.** Every source now has `tier` (1 or 2) with a basis. Rule: venue form decides first (a blog post or comment, magazine essay or magazine debate is tier 2 whoever wrote it; a core economics venue is tier 1); otherwise a scholarly text is tier 1 when an author is shown to be an economist by an economics appointment, address or affiliation in or contemporary with the checked text. Tier 1: Hanson's two working papers (economics address; Department of Economics, George Mason University), Nordhaus, Aghion–Jones–Jones, Trammell–Korinek, Acemoglu. Tier 2: Hanson 1994 (Extropy essay) and 1998 (symposium comment), Roodman (blog), Karnofsky (blog comment), Davidson (foundation report), the Asterisk debate (magazine; Clancy is introduced as an economist, but the venue decides), and Erdil–Besiroglu (arXiv preprint; stated affiliations Epoch and MIT FutureTech, no economics appointment stated). Erdil–Besiroglu is the borderline case.
- **Earliest located by tier.** `earliest-located` is now computed within tier 1; `earliest-located-tier-2` is computed separately among tier-2 texts and is shown alongside, never instead. `verify` checks both. Ties on the attested date are broken by passage order (Roodman's post precedes Karnofsky's comment on it).
- **Dates.** Hanson's undated "Economic Growth Given Machine Intelligence" is now dated 2000-08-19 by its capture, marked as attested; the claimed 1998 is kept separately. Each source records its versions (working paper, revision, journal) with dates, and the attested date of the checked wording still decides earliest located.
- **Published versions.** Each source has an APA citation of the published version, or of the checked version where none was located (Crossref searched 2026-10-10). New finding: Trammell and Korinek's paper appears in the Annual Review of Economics 18 (Crossref issue date 2026-08-07); its wording was not retrieved. Acemoglu's paper is in Economic Policy 40(121), online 2024-08-06.
- **G04/G05 boundary.** Test: would the constraint still bind if every task were automated? If not, because it works by keeping tasks in human hands or by slowing their automation (including regulation of AI training or deployment), it is G04. If so (physical limits, resources, natural and experimental time, regulation of other activities, demand for human-provided goods), it is G05. A passage is classified by the mechanism its own conclusion names. Both criteria were reworded accordingly. Moves: G05-d → G04-k and G05-e → G04-k2 (Clancy: bottlenecks slow AGI's takeover of tasks); G05-h → G04-g2 (Erdil and Besiroglu: regulation of AI training and deployment). Kept in G05: G05-a, G05-b, G05-n, G05-f (resource bottlenecks), G05-g (resource constraints) and G05-c (Davidson's list, which also names regulation and human adjustment; uncertain, because the page could not be re-read).
- **G09 estimate records.** The proposition is now "Explosive growth estimates within a stated horizon": each record states the holder, the estimate as worded, the horizon, the text's definition and the conditions, with no common threshold. Records: Hanson (undated, attested 2000: median transition to a one-to-two-year doubling time around 2025, from historical trends); Hanson (2000: a doubling time of about two weeks "within the next century", conditional on the modes model); Nordhaus (2015: growth above 20% a year "100 years or more" away, by extrapolation); Karnofsky (2020: little reason to rule out explosive growth "in the coming decades"); Davidson (2021: "plausible but far from certain" by 2100, above 10%, 15–60% on different days; >30% annual GWP growth); Erdil and Besiroglu (2023: about even odds by 2100; GWP above 130% of its previous maximum); Besiroglu (2023: 65%, later 25–75%, conditional on AI that automates most tasks); Clancy (2023: 10–20% on the same condition). The two Asterisk records reuse the G01 quotations and count once towards the quotation limit. Acemoglu stays bears-on.

### Changes to earliest-located roles

| Proposition | Relation    | Before (one role, all texts)         | Tier 1 after                         | Tier 2 after                        |
| ----------- | ----------- | ------------------------------------ | ------------------------------------ | ----------------------------------- |
| G01         | articulates | Hanson, machine intelligence (G01-a) | unchanged                            | Erdil–Besiroglu (G01-d)             |
| G01         | contests    | Clancy (G01-f)                       | none                                 | Clancy (G01-f)                      |
| G02         | articulates | Aghion–Jones–Jones (G02-a)           | unchanged                            | Davidson (G02-e)                    |
| G02         | contests    | Hanson, Vinge comment (G02-c)        | Aghion–Jones–Jones (G02-b)           | Hanson, Vinge comment (G02-c)       |
| G03         | articulates | Hanson, machine intelligence (G03-0) | unchanged                            | Roodman (G03-c)                     |
| G03         | contests    | Clancy (G03-g)                       | none (G03-g is now bears-on)         | none                                |
| G04         | articulates | Nordhaus (G04-a)                     | unchanged                            | Clancy (G04-h)                      |
| G04         | contests    | Hanson, machine intelligence (G04-e) | unchanged                            | Davidson (G04-f)                    |
| G05         | articulates | Aghion–Jones–Jones (G05-a)           | unchanged                            | none (Clancy's record moved to G04) |
| G05         | contests    | Nordhaus (G05-n)                     | unchanged                            | Davidson (G05-c)                    |
| G06         | articulates | Nordhaus (G06-a)                     | none (Nordhaus is now bears-on)      | Davidson (G06-c)                    |
| G07         | articulates | Hanson, uploads (G07-a)              | Hanson, machine intelligence (G07-b) | Hanson, uploads (G07-a)             |
| G08         | articulates | Acemoglu (G08-a)                     | unchanged                            | none                                |
| G09         | articulates | Hanson, machine intelligence (G09-0) | unchanged                            | Karnofsky (G09-c)                   |
| G09         | contests    | Nordhaus (G09-h)                     | none (estimate records only)         | none                                |

Two effects to note. G06 has no tier-1 articulating record under its literal wording, although its only formal tests are by an economist. And in tier 2, Erdil and Besiroglu (attested 2023-10-01) precede the Asterisk debate for G01 because the debate, dated June 2023, is attested only from a December 2023 capture.

### After correction

- 9 propositions, 67 passages, 13 authored records from 12 documents.
- Relations: articulates 43, contests 14 (engages premise 13, contrary-only 1), bears-on 10. Sixteen passages are context-only.
- `verify`: every quotation that could be matched (56 of 67) matches its checked expression or a current copy; 11 passages from Davidson, Roodman and Karnofsky were not re-checked (see above); caps kept; tiered earliest-located roles consistent with attested dates; every G09 holder has an estimate.
- Not re-audited by a fresh agent. The new G09-j and G09-k records reuse checked quotations; the reworded G04, G05 and G09 criteria have had only the preparer's check.

## Re-tiering under the 2026-10-11 rule

Input: the maintainer's tier rule of 2026-10-11, recorded in the [project document](../../docs/projects/economics-of-machine-intelligence.md#maintainer-decision-2026-10-11-one-tier-rule). It supersedes the venue-first rule applied on 2026-10-10: the author decides, not the venue, and only short-form commentary (blog comments, forum replies, magazine or online debates) stays tier 2 when an economist wrote it. Every source was re-tiered with a one-line basis in `pack.json`. Prepared by the same Claude Code session family; not re-audited by a fresh agent.

**Tier changes (2).**

- **Hanson, "If Uploads Come First" (1994): 2 → 1.** A magazine essay, scholarly in form (abstract, notes, references), by an author with an established record as an economist. Judgement: in 1994 he held no economics degree or appointment and none is shown on the page; recorded as open decision 6 in the project document.
- **Roodman, "Modeling the Human Trajectory" (2020): 2 → 1.** A long essay presenting his own model, not short-form commentary; established record from articles in economics journals (The World Bank Economic Review 2007, Oxford Review of Economic Policy 2015; Crossref, searched 2026-10-11). His technical paper would be tier 1 but was not retrieved.

**Borderlines settled, tier unchanged.** Erdil and Besiroglu (2023), tier 2: neither author is shown to be an economist (Epoch, MIT FutureTech) and arXiv is not a core economics venue. Karnofsky's comment (2020), tier 2: a blog comment by a non-economist. Davidson (2021), tier 2: no economics appointment, degree, address or affiliation shown and no established record; under the new rule the foundation venue no longer decides, the author does. Asterisk debate (2023), tier 2: Clancy is introduced as an economist, but no turn is itself a substantive scholarly argument (each answers the previous turn and sketches others' models, with no model of its own); Besiroglu is introduced as a research scientist. Hanson's 1998 comment on Vinge, tier 2: short-form commentary in an open discussion, with no model and no references beyond two links. The other six sources stay tier 1 with reworded bases.

**Earliest-located roles that moved (2).**

| Proposition | Relation    | Tier | Before                                                    | After                                           |
| ----------- | ----------- | ---- | --------------------------------------------------------- | ----------------------------------------------- |
| G07         | articulates | 1    | Hanson, machine intelligence (G07-b, attested 2000-08-19) | Hanson, uploads (G07-a, attested 1998-02-20)    |
| G07         | articulates | 2    | Hanson, uploads (G07-a)                                   | none (no tier-2 text articulates G07)           |
| G03         | articulates | 2    | Roodman (G03-c)                                           | Karnofsky's comment (G03-d, same page and date) |

Roodman's G03-c enters tier 1 but holds no role: Hanson's undated working paper (attested 2000-08-19) is earlier. No other role changed.

**Quotation re-check.** The ignored cache was empty in this session, so all twenty recorded captures were retrieved again from the Wayback Machine on 2026-10-11 (sequential, 8 seconds apart). Eighteen are byte-identical to the recorded SHA-256; the Asterisk capture (the checked expression of the debate) and the 2022 capture of Davidson's report differ in bytes. `verify` matches all 67 quotations against their checked expressions, including the 11 Davidson, Roodman and Karnofsky passages that could not be re-checked on 2026-10-10; caps kept; tiered roles consistent with attested dates.

## Standing judged at the time of writing (2026-10-12)

Input: the maintainer's decision of 2026-10-12, recorded in the [project document](../../docs/projects/economics-of-machine-intelligence.md#maintainer-decision-2026-10-12-standing-judged-at-the-time-of-writing) (settles open decision 6): an author's standing as an economist is judged when the text was written. Prepared by the same Claude Code session family; not re-audited by a fresh agent.

- **Hanson, "If Uploads Come First" (1994): 1 → 2.** In 1994 he held no economics degree or appointment, and none is shown on the page. No other source changes tier.
- **G07, articulates:** tier-1 earliest returns to Hanson, machine intelligence (G07-b, attested 2000-08-19); tier-2 earliest is Hanson, uploads (G07-a, attested 1998-02-20). G01-h (bears-on) holds no role. No other role changed.
- **Quotation re-check.** The Wayback Machine reset every connection from this environment, so the twelve recorded current copies were fetched instead; all twelve are byte-identical to their recorded SHA-256, and eight of them to a recorded capture. `verify` matches 56 of 67 quotations against a checked expression or a current copy; the 11 Davidson, Roodman and Karnofsky passages were not re-checked (no current copy is recorded for those pages). No problems; caps kept; tiered roles consistent with attested dates. No quotation changed, so `verification.json` keeps the full 2026-10-11 run.

## Re-check corrections (2026-10-25)

The maintainer's adjudication of the same-family and cross-family re-checks of the admitted records was applied on 2026-10-25; see [`review/recheck-corrections-2026-10-25.md`](../../review/recheck-corrections-2026-10-25.md). The pack files above are unchanged and record the state at admission.
