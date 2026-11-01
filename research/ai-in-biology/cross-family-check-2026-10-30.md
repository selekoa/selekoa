| Check                  | Result                                                                                       |
| ---------------------- | -------------------------------------------------------------------------------------------- |
| Sample coverage        | 120 / 120 records                                                                            |
| Part A                 | 59; 54 agree, 2 disagree, 3 partly                                                           |
| Part B                 | 61; 10 records carry a qualification or correction flag                                      |
| Blind-stage checkpoint | All Part A committed and pushed in 36c1628 before comparison                                 |
| Process limits         | Initial proposition-reading order breached; supplementary archive batches briefly overlapped |
| Scope                  | Candidate research only; no admission or human acceptance                                    |

# AI in biology: cross-family check, 2026-10-30

The companion [JSON report](cross-family-check-2026-10-30.json) contains all item answers, passages, dates and kinds, locators, hashes, failed retrievals and supplemental findings. The brief duplicates item numbers across parts: keys therefore combine part and displayed number, with record ID and original pack item retained.

## Findings

- Original-period DeepMind captures attest 2 December 2018 and 22 July 2021; the served pages display later dates. The 2020 expectation wording is also present in its near-release capture.
- Publisher expressions show AlphaMissense online on 19 September 2023, print 22 September, and Lyu online on 16 May 2024, print 21 June. Preserve the conflicting relay metadata.
- Earlier located P2 and P3 texts narrow the pack’s claims: Bray (1990) and Berg’s company announcement (2013). P4/P5 earlier candidates remain qualified.
- P6 main text was read via an author-uploaded web relay and corroborates the rate statement with small-sample, selection and commercial-discontinuation caveats; no causal AI benefit is established.
- Isomorphic’s original article displays November 2021, not a day. ESM3’s original announcement date and high-level wording are corroborated, but its current Tom Sercu byline was not found in the near-release capture.
- Roche’s 2021 annual report states the Prescient Design acquisition. BioMap’s current leadership page was rendered; its founding and Sanofi announcement were located separately.
- Q21 follow-ups found EvolutionaryScale seed-financing evidence, a historical Kohli role and both DoveTree updates. Complete EvolutionaryScale founding particulars and a current Kohli title remain unresolved.

## Corrections and decisions

| Issue                      | Records / decision                                                                                                            |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Publication-date kind      | B:75–77 (AlphaMissense), B:113 (Lyu): distinguish publisher online and print dates; retain relay disagreement.                |
| Earlier located bounds     | A:55/P2 and A:56/P3 need revised search bounds. A:57/P4 and A:58/P5 require criterion adjudication before any headline.       |
| P2 relation                | B:119: factual summary supported; prefer a qualified challenge to tested models over a categorical contradiction of broad P2. |
| Original expression        | A:16: Isomorphic day unconfirmed; A:35: ESM3 current byline not backdated.                                                    |
| Quotation / locator detail | B:35 composite passage; B:40, 43, 47 punctuation differences; B:111 sentence-number locator. See JSON for exact scope.        |

## Comparison

All 59 Part A answers were committed and pushed in 36c1628 before the verdicts, pack, audit or review note was opened. Final classifications are 54 agree, 2 disagree and 3 partly. P1 matches the pack; P2 has the earlier located Bray (1990) text and P3 the earlier located Berg (2013) announcement. P4 has qualified 1994 and post-comparison 2018 candidates; P5 has the earlier symbolic-AI candidate Searls (1988). Neither qualified candidate warrants an unqualified earliest-located headline. P6’s main text corroborates the rate statement through an author-uploaded relay, with sampling and historical-comparison limits. The remaining partial comparison concerns the ESM3 announcement’s later/current byline.

Against audit.md: the earlier same-family audit checked 72 of 256 records and corrected 27; its widened corrections remain intact. This check covers the supplied 120 targeted items, not a fresh representative sample of all 256. It adds original-period DeepMind evidence, narrower Isomorphic day precision, publisher/metadata date disagreements for AlphaMissense and Lyu, and a scope objection to the categorical contests-P2 relation. The earlier audit’s CASP context and snapshot qualifications are present and should be preserved. No hazard breach was identified in these 120 high-level records; this is neither a technical safety audit nor human editorial acceptance.

The Q21 gaps are partly resolved: EvolutionaryScale’s seed round and two dated co-founder attributions; BioMap’s stated 2020 founding and announced Sanofi terms; Kohli’s 2022 DeepMind title; and both later DoveTree filings. A complete EvolutionaryScale founding date/roster and a current Kohli appointment remain unresolved. Roche’s annual report quote supports acquisition without inventing a closing day. Admission, proposition-scope decisions and corrections belong to a separately authorised task.

## Method and limits

The initial whole-brief read displayed the Sources list, archive fallbacks and some Part B items before P1–P6 answers. The user also named Jayatunga (2024) and Ahlmann-Eltze (2025). Proposition searches are therefore partially blind. The verdicts, pack, timeline, audit and review note remained unopened until all 59 Part A answers were committed and pushed in 36c1628. Later evidence is explicitly marked post-comparison.

Fresh direct HTTP via curl was the default; source batches were sequential and paced at least 8 seconds per host. Search was used for discovery. Exact-source web-reader or rendered-browser fallbacks, archive expressions and retrieval failures are identified. Two supplemental archive batches briefly overlapped; global 8-second spacing cannot be certified for that overlap. The original-order and pacing deviations are process limits, not editorial acceptance. Only policy, institutional, publication and claim-level content is retained; no operational methods, protocols or sequences.

Science publisher captures were opened for AlphaMissense, ESM-2, ESM3, RoseTTAFold, Evo and Lyu. Some captures expose only abstracts and author information. RoseTTAFold’s main-body quotations remain unverified in a publisher body; its cited manuscript and publisher abstract use different wording. Jayatunga’s main text was inspected through a web relay; its original PDF and supplementary tables were not retrieved fresh. Archived BioMap and Virtual Cell Challenge pages remained HTML shells; BioMap’s current leadership page was rendered and inspected. Exact-URL archive negatives do not establish global absence.

Model: OpenAI GPT-6; Exact serving model identifier unavailable.

## Checks

The two focused editorial suites passed all 16 tests after a sandbox temporary-module failure. Report coverage, ID mapping, required fields, quote limits, formatting and staged privacy are checked before the final commit. Only the two requested reports are changed; no PR.
