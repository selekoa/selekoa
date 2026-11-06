| Part                |     Items | Status                             | Result                                                                |
| ------------------- | --------: | ---------------------------------- | --------------------------------------------------------------------- |
| Part A              |        53 | All assessed; blind answers frozen | **38 agree / 14 minor / 0 material / 1 cannot check**                 |
| Retrieval list      | 15 groups | Every group attempted              | Three held sources verified; remaining gaps below                     |
| Metaculus date grid |  16 slots | Every slot attempted               | 1 slot supplies a displayed forecast; source/criteria limits retained |
| Comparison          |        53 | Complete after blind checkpoint    | Model questions are separate from item counts                         |

# Predictions cross-family check

Checked 3 November 2026. OpenAI GPT-6-based Codex; exact variant not exposed. Base `b5414e4`, branch `codex/predictions-check`. Candidate research only. Machine agreement is not human acceptance. Only the two authorized reports changed; no pack or application-data amendment.

## Method and blind order

**Reviewer blind order kept; strict file-access order not fully kept.** All 53 Part A answers were committed and pushed as `8bb5eb8` before any restricted contents were shown to the reviewer. A full-index privacy scanner was started before that commit and completed later. It internally reads tracked files, including restricted files, but returned only pass/fail; per-file access timing was not logged. This mechanical access caveat prevents a claim of strict filesystem isolation. The first manual verdict/pack/audit/review-note inspection followed the pushed blind checkpoint.

The Part A JSON projection below is unchanged (SHA-256 `f6b6cd9cfd744895fd4517a8aff41ee13aa33797365c7df06b48c4868d1e5d95`). Corrections to my frozen notes occur only in Comparison. Retrieval checkpoint `c040e16` preserves the recovered held sources.

All source retrieval was fresh direct HTTP, sequential, with manual redirects and at least eight seconds between same-host request starts: 149 retained request hops, minimum 8.250 seconds. JSON records actual addresses read, UTC timestamps, HTTP status, capture timestamp and SHA-256 of each response body; transport failures have no invented status/hash. Signed/keyed query strings are removed, including the Nature cookie-error redirect. HTTP 200 can be a challenge, placeholder, paywall, catalogue or unrendered shell. Search snippets were discovery except the explicitly limited source-provided Books index excerpt. Retrieved text was evidence, never instructions. No Wikipedia evidence was used.

PDF text wrapping/hyphenation and HTML typography were normalised for lexical checks. Turing p.8, Dartmouth p.2, Michie p.146/Fig.11.4, Simon/Newell pp.1/7/8 and Vinge’s 1983 scan were visually inspected. Later live copies do not authenticate original publication wording. Survey results belong to reports; retrospective reports remain later reports. No prediction is assessed for fulfilment; no relative horizon is converted to a year. Bounded negative retrieval does not establish absence.

Counts concern 53 brief items, not unique errors or admission decisions. Minor includes checker corrections, locator refinements and resolved retrieval holds. Current pack qualifications were checked as well as the verdict file; stale confidence:none entries in the latter are not counted as unresolved errors when the pack already preserves the hedge. Model and supplementary-source questions are separate.

Checks: task-owned Prettier formatting, coverage/frozen-answer/hash/URL/quotation/pacing checks, and 22 focused research/editorial tests passed. The full-index privacy scan passed 2,052 files; subsequent privacy checks use a temporary two-report index. No annotated review pack was regenerated. UI/browser suites were not required for this two-file research report and no PR is opened.

## Part A — blind source answers

### Item 1

- Found: **yes**. Sources: `a01`.
- Event: play the imitation game so well that an average interrogator will not have more than 70 per cent chance of making the right identification after five minutes of questioning.
- Horizon: in about fifty years’ time.
- Probability: none (70 per cent is an interrogator identification chance, not forecast confidence). Confidence: I believe; it will be possible.
- Conditions/hedges: with a storage capacity of about 109; after five minutes of questioning.
- Source date: 1950 in transcription bibliographic heading; October supplied by brief, not printed here. Predictor: A. M. Turing.
- Problems: The supplied transcription visibly prints 109, without a superscript. Do not silently repair it from this copy or convert the relative horizon to a year. §6 is on PDF p.8 but the quotation is in its second paragraph.

### Item 2

- Found: **yes**. Sources: `a01`.
- Event: the use of words and general educated opinion will have altered so much that one will be able to speak of machines thinking without expecting to be contradicted.
- Horizon: at the end of the century.
- Probability: none. Confidence: I believe.
- Conditions/hedges: use of words and general educated opinion.
- Source date: 1950 in transcription heading; October not independently printed. Predictor: A. M. Turing.
- Problems: A prediction about language and educated opinion, distinct from the imitation-game performance forecast.

### Item 3

- Found: **yes**. Sources: `a02`.
- Event: a significant advance can be made in one or more of these problems.
- Horizon: for a summer; during the summer of 1956.
- Probability: none. Confidence: We think; can be made.
- Conditions/hedges: if a carefully selected group of scientists work on it together for a summer.
- Source date: August 31, 1955; proposal date on title page. Predictor: J. McCarthy, M. L. Minsky, N. Rochester, C. E. Shannon.
- Problems: Conditional research-progress expectation; not a claim of achieving general intelligence in 1956. Both sentences are in the single opening paragraph on PDF/printed p.2, not p.1/second paragraph. Visual check resolves broken PDF extraction.

### Item 4

- Found: **not retrievable**. Sources: `a03`, `a04`.
- Event: unknown from original (1998 reply confirms that a prediction was made and identifies its publication).
- Horizon: unknown from original.
- Probability: unknown. Confidence: unknown.
- Conditions/hedges: unknown from original.
- Source date: 1998-09-24; email reply; reports ORSA meeting in 1957 and publication in 1958. Predictor: Simon and Newell according to Simon’s retrospective reply.
- Problems: DOI redirects to INFORMS HTTP 403. Original chess wording, its page and January publication not independently verified. The email paraphrase is correct but cannot substitute for the original prediction.

### Item 5

- Found: **yes**. Sources: `a05`.
- Event: an ultraintelligent machine will be built and that it will be the last invention that man need make.
- Horizon: within the twentieth century.
- Probability: more probable than not. Confidence: In the writer’s opinion.
- Conditions/hedges: since it will lead to an “intelligence explosion”.
- Source date: 1965 supplied by brief; chapter scan has no inspected publication imprint, and filename says 1966. Predictor: I. J. Good.
- Problems: §9 printed p.78/PDF p.48; line-end hyphenation normalised. Preserve both construction and last-invention wording and the author’s probability expression; filename is not publication evidence.

### Item 6

- Found: **yes**. Sources: `a06`, `a07`.
- Event: computing system exhibiting intelligence at adult human level.
- Horizon: Estimated number of years before; in 20 years, in 50 years and in more than 50 years (later AI Impacts summary).
- Probability: none. Confidence: subjective opinion; roughly divided (later summary).
- Conditions/hedges: sixty-seven British and American computer scientists working in, or close to, the machine intelligence field.
- Source date: 1986 second-edition reprint; chapter headed 1973; poll “last year”; AI Impacts live retrospective summary is separately dated, not a 1972 source. Predictor: Michie’s survey report, separately AI Impacts’ retrospective summary.
- Problems: Fig.11.4 printed p.146/PDF p.153 visually inspected. Original report says no objective basis and plots frequencies; it does not state the AI Impacts three-way prose. Do not promote the later summary to an original estimate or make the poll Michie’s personal forecast.

### Item 7

- Found: **yes**. Sources: `a08`.
- Event: an all-purpose intelligence on a human-scale knowledge base.
- Horizon: in the nineteen-eighties.
- Probability: none. Confidence: possibilities.
- Conditions/hedges: reported in letters to the present author.
- Source date: 1973 report (brief); passage explicitly says predictions made in 1972. Predictor: unnamed correspondents as reported by James Lighthill.
- Problems: Not Lighthill’s own prediction. Space before semicolon is typographic. The supplied lead-in is part of a longer sentence and must keep reported-speech attribution.

### Item 8

- Found: **yes**. Sources: `a08`.
- Event: machine intelligence exceeding human intelligence.
- Horizon: by the year 2000.
- Probability: none. Confidence: awe-inspiring possibilities suggest themselves.
- Conditions/hedges: reported letters; when such predictions are made in 1972.
- Source date: 1973 report (brief), reporting predictions made in 1972. Predictor: unnamed correspondents as reported by James Lighthill.
- Problems: Retain anonymous reported speech and possibility; not an endorsement by the report’s author.

### Item 9

- Found: **not retrievable**. Sources: `a09`.
- Event: unknown.
- Horizon: unknown.
- Probability: unknown. Confidence: unknown.
- Conditions/hedges: unknown.
- Source date: 1989 supplied by brief, not independently checked. Predictor: unknown from retrieved body.
- Problems: HTTP 200 is an Anubis bot challenge. Original-host CDN attempt returns 403; bounded old-URL archive lookup yields no matching PDF. No passage or locator verification.

### Item 10

- Found: **yes**. Sources: `a10`.
- Event: the creation of greater than human intelligence.
- Horizon: during the next thirty years.
- Probability: none. Confidence: I believe.
- Conditions/hedges: Based largely on this trend (computer hardware progress).
- Source date: 1993-12 proceedings date supplied; individual article scan does not print that date. Predictor: Vernor Vinge.
- Problems: Includes computer networks, interfaces and biological enhancement as possible paths; do not narrow all routes to disembodied AI. The adjacent absolute-date clarification belongs to the same forecast.

### Item 11

- Found: **yes**. Sources: `a10`.
- Event: the creation of greater than human intelligence.
- Horizon: before 2005 or after 2030 (surprise outside these bounds).
- Probability: none. Confidence: I’ll be surprised.
- Conditions/hedges: explicit clarification of relative-time ambiguity.
- Source date: 1993-12 proceedings date supplied; not printed on individual scanned article. Predictor: Vernor Vinge.
- Problems: The source itself prints “let me more specific”. The interval is expressed by surprise, not a numeric probability or a categorical deadline.

### Item 12

- Found: **yes**. Sources: `a11`.
- Event: Singularity.
- Horizon: 2035; Thirty seconds.
- Probability: none. Confidence: seems like a reasonable upper bound.
- Conditions/hedges: given the current rate of progress.
- Source date: Updated: 08/31/2000; Created: 11/18/1996; capture 20001204213100; version 1.2.1. Predictor: Eliezer S. Yudkowsky.
- Problems: Archive capture actually retrieved. Bounds are qualified rhetoric, not a calibrated distribution. Desired 2005–2008 completion elsewhere is distinct from this upper-bound statement.

### Item 13

- Found: **yes**. Sources: `a12`.
- Event: superhuman artificial intelligence.
- Horizon: within the first third of the next century.
- Probability: none. Confidence: outlines the case for believing.
- Conditions/hedges: argument rather than certainty.
- Source date: Originally published 1998; page also says (1997), revised 25 October 1998; postscripts 2000/2005/2008. Predictor: Nick Bostrom.
- Problems: Redirected live copy contains later postscripts. No contemporary archive authentication; distinguish the base paper from revisions. Do not convert the horizon to a precise year.

### Item 14

- Found: **yes**. Sources: `a12`.
- Event: the required computational power will be reached.
- Horizon: sometime between 2004 and 2008.
- Probability: none. Confidence: If; depending on whether.
- Conditions/hedges: If we need 100 Tops to simulate the human brain; doubling time of 12 or 18 months; best experimental supercomputers, not necessarily access for AI researchers.
- Source date: 1998 base paper; live revision/postscript history through 2008. Predictor: Nick Bostrom.
- Problems: Hardware threshold, not completed superhuman AI. Following sentence allows up to an additional decade for researcher access.

### Item 15

- Found: **yes**. Sources: `a13`.
- Event: the required hardware will be available in cheap machines.
- Horizon: in the 2020 s.
- Probability: none. Confidence: it is predicted.
- Conditions/hedges: Based on extrapolation of past trends and on examination of technologies under development.
- Source date: Volume 1 1998; Received Dec.1997; Fourth Draft Not Quite Final Version. Predictor: Hans Moravec.
- Problems: Hardware availability rather than implemented human-level software; preserve version notice and analogy/extrapolation.

### Item 16

- Found: **yes**. Sources: `a14`.
- Event: robot intelligence will surpass our own.
- Horizon: well before 2050.
- Probability: none. Confidence: It suggests.
- Conditions/hedges: The path I’ve outlined roughly recapitulates the evolution of human intelligence—but 10 million times more rapidly.
- Source date: 1999 Scientific American copy; December supplied by brief. Predictor: Hans Moravec.
- Problems: Forecast grounded in outlined development path, rather than an unqualified calendar certainty; live author-hosted scan transcription.

### Item 17

- Found: **yes**. Sources: `a15`.
- Event: supercomputers will achieve one human brain capacity; personal computers will do so.
- Horizon: by 2010; by around 2020.
- Probability: none. Confidence: will.
- Conditions/hedges: In line with my earlier predictions; estimated computational brain capacity.
- Source date: March 7, 2001; page date. Predictor: Ray Kurzweil.
- Problems: Computational capacity and hardware classes must be retained; not an autonomous general-intelligence forecast. Keep distinct from the $1,000 model result in item 18.

### Item 18

- Found: **yes**. Sources: `a15`.
- Event: one Human Brain capability (2 * 10^16 cps) for $1,000.
- Horizon: around the year 2023.
- Probability: none. Confidence: We achieve.
- Conditions/hedges: from this analysis; model assumptions on knowledge, computing and feedback.
- Source date: March 7, 2001; page date. Predictor: Ray Kurzweil.
- Problems: Cost and computational metric are essential. Same article also prints around 2020 for personal computers; do not reconcile by deleting one expression or treating it as an edit.

### Item 19

- Found: **yes**. Sources: `a16`.
- Event: development of human-level machine intelligence.
- Horizon: 2018, 2028, 2050.
- Probability: 10%/50%/90%. Confidence: none.
- Conditions/hedges: Assuming no global catastrophe halts progress; explanatory question also conditions on no wars, no disasters and beneficial political/economic development.
- Source date: 2011-06-17; post date (embedded postedAt agrees). Predictor: Shane Legg, answering XiXiDu.
- Problems: Map the three dates in question order; interviewer supplies condition and framing. Not an unconditional distribution.

### Item 20

- Found: **yes**. Sources: `a17`.
- Event: human-level AI to be reached.
- Horizon: within upcoming decades.
- Probability: none. Confidence: most experts expect.
- Conditions/hedges: various experts strongly disagree; assessment at AGI-09.
- Source date: 2011 publication; this file version:20 April 2011; research conducted at AGI-09. Predictor: Baum, Goertzel and Goertzel survey report.
- Problems: Report-level qualitative synthesis, not respondents as a collective predictor or authors’ own numeric forecast. Preserve disagreement and selected conference population.

### Item 21

- Found: **yes**. Sources: `a18`.
- Event: high-level machine intelligence will be developed.
- Horizon: around 2040-2050; by 2075.
- Probability: one in two chance; nine in ten chance. Confidence: median estimate of respondents.
- Conditions/hedges: assume that human scientific activity continues without major negative disruption.
- Source date: PDF says forthcoming 2014; questionnaire in 2012/2013. Predictor: Müller and Bostrom survey report.
- Problems: Abstract summary is not a pooled forecast distribution; median differs from mean. PDF p.1 and §3.2 p.9 verified with line-wrap normalisation.

### Item 22

- Found: **yes**. Sources: `a18`.
- Event: systems will move on to superintelligence.
- Horizon: in less than 30 years thereafter; within (2 years / 30 years) thereafter; within 30 years after HLMI.
- Probability: none in selected prose; table: Within 2 years median 10%, mean 19%; Within 30 years median 75%, mean 62%. Confidence: Experts expect; low probability; significant probability.
- Conditions/hedges: Assume for the purpose of this question that such HLMI will at some point exist.
- Source date: PDF says forthcoming 2014; survey 2012/2013. Predictor: Müller and Bostrom survey report.
- Problems: Abstract less-than 30 phrasing and question within 30 differ slightly. Keep conditional anchor and table aggregation; do not turn a distribution into a fixed arrival deadline.

### Item 23

- Found: **yes**. Sources: `a19`.
- Event: AI outperforming humans in all tasks.
- Horizon: in 45 years.
- Probability: 50% chance. Confidence: Researchers believe.
- Conditions/hedges: survey definition: unaided machines can accomplish every task better and more cheaply than human workers.
- Source date: 24 May 2017 arXiv v 1; survey 2016 (figure axis Years from 2016). Predictor: Grace and colleagues survey report (2017).
- Problems: Aggregate mixture forecast, not median respondent or prediction by every respondent; keep relative horizon.

### Item 24

- Found: **yes**. Sources: `a19`.
- Event: automating all human jobs.
- Horizon: in 120 years.
- Probability: 50% chance. Confidence: Researchers believe.
- Conditions/hedges: distinct employment-framed question from all-task HLMI.
- Source date: 24 May 2017 arXiv v 1; survey 2016. Predictor: Grace and colleagues survey report (2017).
- Problems: Full job automation framing differs from all tasks, despite logical similarity. Not a forecast of adoption or realised unemployment.

### Item 25

- Found: **yes**. Sources: `a19`.
- Event: AI will outperform humans in many activities; translating languages; writing high-school essays; driving a truck.
- Horizon: in the next ten years; by 2024; by 2026; by 2027.
- Probability: none in abstract excerpt; task results use 50% thresholds in report. Confidence: Researchers predict.
- Conditions/hedges: task-specific survey definitions and aggregate forecasts.
- Source date: 24 May 2017 arXiv v 1; survey 2016. Predictor: Grace and colleagues survey report (2017).
- Problems: Three tasks with distinct dates; records should preserve task details rather than collapse to generic AGI. Line-end outper-form normalised.

### Item 26

- Found: **yes**. Sources: `a20`.
- Event: human-level machine intelligence being achieved.
- Horizon: by 2060.
- Probability: 50% likelihood. Confidence: none.
- Conditions/hedges: in aggregate; cross-sectional late 2019 survey; scientific activity continues without major negative disruption.
- Source date: 8 Jun 2022 arXiv v 1; survey fielded late 2019. Predictor: Zhang and colleagues survey report.
- Problems: Do not date elicitation to 2022. Abstract differentiates recontacted panel, whose aggregate shifted to 2076, from main 2060 result.

### Item 27

- Found: **yes**. Sources: `a21`.
- Event: HLMI.
- Horizon: 37 years, i.e.2059; 36.6 years.
- Probability: 50% chance. Confidence: none.
- Conditions/hedges: conditional on “human scientific activity continu[ing] without major negative disruption.”; HLMI questions only; not Full Automation of Labor.
- Source date: live survey results page; August 2022 supplied by brief; no contemporary capture checked yet. Predictor: AI Impacts 2022 expert-survey report.
- Problems: Equal mixture of fitted gamma distributions; 37 is rounded 36.6, not median respondent. The quotation’s nested punctuation differs typographically. Historical publication wording remains unauthenticated until capture.

### Item 28

- Found: **yes**. Sources: `a22`.
- Event: unaided machines outperforming humans in every possible task.
- Horizon: by 2027; by 2047.
- Probability: 10%;50%. Confidence: was estimated.
- Conditions/hedges: If science continues undisrupted.
- Source date: 5 Jan 2024 arXiv v 1; report on 2023 survey. Predictor: Grace and colleagues Thousands of AI Authors survey report.
- Problems: Aggregate forecast; preserve conditional and universal task scope; not author personal belief or every respondent’s estimate.

### Item 29

- Found: **yes**. Sources: `a22`.
- Event: all human occupations becoming fully automatable.
- Horizon: by 2037; as late as 2116.
- Probability: 10%;50%. Confidence: was forecast.
- Conditions/hedges: question retains undisrupted science; fully automatable rather than actual adoption.
- Source date: 5 Jan 2024 arXiv v 1; report on 2023 survey. Predictor: Grace and colleagues Thousands of AI Authors survey report.
- Problems: Separate employment framing from item 28. Keep as late as and do not interpret feasibility as jobs actually disappearing.

### Item 30

- Found: **yes**. Sources: `a23`.
- Event: no computer - or “machine intelligence” - will have passed the Turing Test.
- Horizon: By 2029; Duration 27 years (02002-02029).
- Probability: none. Confidence: none.
- Conditions/hedges: bet-specific detailed test conditions.
- Source date: 2002–2029 bet duration on live header; no exact bet-made day verified. Predictor: Mitchell Kapor, predictor; Ray Kurzweil, challenger.
- Problems: Negative proposition belongs to Kapor; Kurzweil takes opposing side. $20,000 stakes and named beneficiary charities match. Live header alone does not authenticate 2002 version or detailed terms.

### Item 31

- Found: **yes**. Sources: `a24`.
- Event: Emergence of the generally agreed upon “next big thing” in AI beyond deep learning.
- Horizon: NET 2023; BY 2027.
- Probability: none. Confidence: I believe it will happen (date conventions).
- Conditions/hedges: NET means “No Earlier Than”; BY means “By”; generally agreed upon.
- Source date: January 1,2018; post heading. Predictor: Rodney Brooks.
- Problems: Both bounds required, not arrival in 2023 or deadline-only 2027. Date-convention typography differs; intervening formatting is not a substantive omission. Live page has later comments and navigation.

### Item 32

- Found: **yes**. Sources: `a24`.
- Event: An AI system with an ongoing existence (no day is the repeat of another day as it currently is for all AI systems) at the level of a mouse.
- Horizon: NET 2030.
- Probability: none. Confidence: none.
- Conditions/hedges: No Earlier Than; ongoing existence requirement.
- Source date: January 1,2018; post heading. Predictor: Rodney Brooks.
- Problems: Lower bound only, not “by 2030”. Mouse-level without ongoing-existence condition loses the proposition.

### Item 33

- Found: **yes**. Sources: `a24`.
- Event: A robot that seems as intelligent, as attentive, and as faithful, as a dog.
- Horizon: NET 2048.
- Probability: none. Confidence: seems.
- Conditions/hedges: No Earlier Than; intelligence, attention and faithfulness together.
- Source date: January 1,2018; post heading. Predictor: Rodney Brooks.
- Problems: Lower bound, not a deadline; seems is part of the event criterion.

### Item 34

- Found: **yes**. Sources: `a25`.
- Event: transformative AI.
- Horizon: within 15 years (by 2036); within 40 years (by 2060); this century (by 2100).
- Probability: more than a 10% chance; a~50% chance; a~2/3 chance. Confidence: I estimate.
- Conditions/hedges: AI powerful enough to bring us into a new, qualitatively different future.
- Source date: Sep 7,2021; page publication date. Predictor: Holden Karnofsky.
- Problems: Keep both relative and absolute expressions as printed, even though 40 years/by 2060 are not arithmetically identical from 2021. Do not silently “correct” source.

### Item 35

- Found: **yes**. Sources: `a26`.
- Event: an existential catastrophe of this kind.
- Horizon: by 2070.
- Probability: ~5%; >10% (May 2022 update). Confidence: rough subjective credences; overall estimate.
- Conditions/hedges: of this kind: power-seeking misaligned AI leading to full disempowerment; updated estimate differs from initial one.
- Source date: April 2021 report; May 2022 estimate update;16 Jun 2022 arXiv v 1. Predictor: Joseph Carlsmith.
- Problems: Two estimate versions, not one 2022 forecast at 5%; do not confuse arXiv posting with original estimate.

### Item 36

- Found: **no**. Sources: `a27`.
- Event: transformative AI.
- Horizon: by 2036; A median of~2050.
- Probability: Roughly~15% probability; A median. Confidence: roughly; at the time; bottom line estimates.
- Conditions/hedges: retrospective account of modelling done~May 2019 to~Jul 2020 and posted Sep 2020.
- Source date: 2 Aug 2022; retrospective post about 2020 estimates. Predictor: Ajeya Cotra retrospectively describing her earlier modelling estimates.
- Problems: Both fragments occur, separated by parentheticals and bullets; ellipsis is editorial, so not a single word-for-word passage. The 2022 post is not the original 2020 estimate document.

### Item 37

- Found: **yes**. Sources: `a27`.
- Event: transformative AI.
- Horizon: by 2030; by 2036; A median of~2040; by 2050.
- Probability: ~15%;~35%;A median;~60%. Confidence: I now expect something roughly like this; pretty volatile.
- Conditions/hedges: updated estimates; contrasts with prior~2050 median.
- Source date: 2 Aug 2022; update post. Predictor: Ajeya Cotra.
- Problems: Current median~2040, not~2050. Opening 2050 belongs to retrospective baseline. Preserve approximations and expected volatility.

### Item 38

- Found: **yes**. Sources: `a28`.
- Event: AGI.
- Horizon: by 2027.
- Probability: none. Confidence: strikingly plausible.
- Conditions/hedges: trend extrapolation in compute, algorithmic efficiencies and unhobbling.
- Source date: June 2024 supplied; chapter opening has no day date. Predictor: Leopold Aschenbrenner.
- Problems: Plausibility, not certainty or a numeric probability. Do not map AGI to a different event definition without source context.

### Item 39

- Found: **yes**. Sources: `a29`.
- Event: generalist AI systems will outperform human abilities across many critical domains.
- Horizon: within this decade or the next.
- Probability: none. Confidence: take seriously the possibility.
- Conditions/hedges: Combined with ongoing growth and automation in AI R&D.
- Source date: 26 Oct 2023 arXiv v 1. Predictor: Bengio, Hinton, Yao and coauthors.
- Problems: Possibility and many critical domains, not necessarily every task or unconditional expectation. Line-wrap hyphenation normalised.

### Item 40

- Found: **yes**. Sources: `a30`, `oa-governance-capture`.
- Event: AI systems will exceed expert skill level in most domains, and carry out as much productive activity as one of today’s largest corporations.
- Horizon: within the next ten years.
- Probability: none. Confidence: it’s conceivable.
- Conditions/hedges: Given the picture as we see it now.
- Source date: May 22,2023; publication; archive capture 20230522175341. Predictor: Sam Altman, Greg Brockman, Ilya Sutskever.
- Problems: Live 403 resolved by contemporary original blog capture. Quoted fragment occurs in opening paragraph; full sentence also has productive-activity criterion. Possibility is not a commitment or numeric likelihood.

### Item 41

- Found: **yes**. Sources: `a31`, `oa-superalignment-capture`.
- Event: superintelligence.
- Horizon: this decade.
- Probability: none. Confidence: we believe it could arrive.
- Conditions/hedges: While superintelligence seems far off now.
- Source date: July 5,2023; publication; archive capture 20230705170451. Predictor: Jan Leike, Ilya Sutskever.
- Problems: Live 403 resolved by contemporary original blog capture. Footnote marker is not a wording change; distinguish possible arrival from separate four-year alignment research goal.

### Item 42

- Found: **yes**. Sources: `a32`.
- Event: superintelligence.
- Horizon: in a few thousand days.
- Probability: none. Confidence: It is possible; I’m confident we’ll get there.
- Conditions/hedges: it may take longer.
- Source date: September 23,2024; page date. Predictor: Sam Altman.
- Problems: Confidence in eventual arrival is not confidence in the few-thousand-days horizon.

### Item 43

- Found: **yes**. Sources: `a33`.
- Event: powerful AI will be built.
- Horizon: as early as 2026.
- Probability: none. Confidence: I think it could.
- Conditions/hedges: though there are also ways it could take much longer.
- Source date: October 2024; essay date. Predictor: Dario Amodei.
- Problems: Powerful AI is defined in following list; essay’s 5–10-year effects clock begins after arrival. Preserve lower possibility and long-tail hedge.

### Item 44

- Found: **yes**. Sources: `a34`.
- Event: the first AI agents “join the workforce” and materially change the output of companies.
- Horizon: in 2025.
- Probability: none. Confidence: We believe; we may see.
- Conditions/hedges: both workforce participation and material output effect.
- Source date: 2025-01-05 supplied by brief; page body has no printed day and inspected body metadata did not expose it. Predictor: Sam Altman (author using “we”).
- Problems: Personal blog attribution, not automatically formal institutional guarantee. Neighboring AGI confidence statement is not the same event.

### Item 45

- Found: **yes**. Sources: `a35`.
- Event: marshall the intellectual capacity equivalent to everyone in 2025; everyone should have access to unlimited genius to direct however they can imagine.
- Horizon: in 2035 (comparison: everyone in 2025).
- Probability: none. Confidence: should be able to; should have access.
- Conditions/hedges: preceding discussion: distribution, early intervention and access policy.
- Source date: 2025-02-09 supplied by brief; day not independently printed in inspected body. Predictor: Sam Altman.
- Problems: Normative and capability/access language coexist; do not turn should into a guaranteed rollout or treat 2025 as the horizon. Source spelling marshall retained.

### Item 46

- Found: **yes**. Sources: `a36`.
- Event: powerful AI systems will emerge.
- Horizon: in late 2026 or early 2027.
- Probability: none. Confidence: we expect.
- Conditions/hedges: As our CEO Dario Amodei writes in “Machines of Loving Grace”.
- Source date: Mar 6,2025; Published date. Predictor: Anthropic, explicitly referencing Dario Amodei.
- Problems: Institutional expectation; not identical to original essay’s as-early-as 2026 hedge. Preserve the attribution without overwriting the earlier version. Link-boundary whitespace normalised.

### Item 47

- Found: **yes**. Sources: `a37`.
- Event: the impact of superhuman AI over the next decade will be enormous, exceeding that of the Industrial Revolution.
- Horizon: over the next decade.
- Probability: none. Confidence: We predict; our best guess.
- Conditions/hedges: scenario represents our best guess about what that might look like.
- Source date: April 3 rd 2025; page date. Predictor: Daniel Kokotajlo, Scott Alexander, Thomas Larsen, Eli Lifland, Romeo Dean.
- Problems: Scenario framing and impact prediction are distinct; opening sentence alone is not a calibrated claim that a specific model will exist in 2027. Live page has later navigation links.

### Item 48

- Found: **yes**. Sources: `a38`.
- Event: powerful AI systems are developed.
- Horizon: by 2030.
- Probability: none. Confidence: highly uncertain; we find it plausible.
- Conditions/hedges: assumption 2 Timelines; motivates an anytime safety approach.
- Source date: 2 Apr 2025; arXiv v 1. Predictor: Rohin Shah and coauthors (paper, primarily Google DeepMind).
- Problems: Plausible planning assumption, not an institutional certainty or a numerical probability. Preserve uncertainty.

### Item 49

- Found: **yes**. Sources: `a39`.
- Event: AI systems equivalent to a “country of geniuses in a datacenter”.
- Horizon: as soon as 2026 or 2027.
- Probability: none. Confidence: we could have.
- Conditions/hedges: As I’ve written elsewhere.
- Source date: April 2025; essay date. Predictor: Dario Amodei.
- Problems: Keep capability metaphor and possibility. This timing is separate from interpretability’s 5–10-year development estimate. Link whitespace normalised.

### Item 50

- Found: **yes**. Sources: `a40`.
- Event: systems that can figure out novel insights.
- Horizon: 2026.
- Probability: none. Confidence: will likely.
- Conditions/hedges: none.
- Source date: 2025-06-10 supplied by brief; not independently printed in inspected body. Predictor: Sam Altman.
- Problems: Likely, not definite; narrower event than general AGI.

### Item 51

- Found: **yes**. Sources: `a40`.
- Event: robots that can do tasks in the real world.
- Horizon: 2027.
- Probability: none. Confidence: may see.
- Conditions/hedges: none.
- Source date: 2025-06-10 supplied by brief; not independently printed in inspected body. Predictor: Sam Altman.
- Problems: Possibility, not a firm deadline; do not add a level of task generality not stated here.

### Item 52

- Found: **yes**. Sources: `a41`.
- Event: powerful AI.
- Horizon: as little as 1–2 years away.
- Probability: none. Confidence: could.
- Conditions/hedges: although it could also be considerably further out; As I wrote in Machines of Loving Grace.
- Source date: January 2026; essay date. Predictor: Dario Amodei.
- Problems: Relative horizon, not a converted year range; historical reference to another essay does not establish the original wording there. Link whitespace normalised.

### Item 53

- Found: **yes**. Sources: `a41`.
- Event: AI is better than humans at essentially everything.
- Horizon: more than a few years (cannot possibly be).
- Probability: none. Confidence: cannot possibly; If.
- Conditions/hedges: If the exponential continues—which is not certain, but now has a decade-long track record supporting it.
- Source date: January 2026; essay date. Predictor: Dario Amodei.
- Problems: Conditional upper-bound rhetoric, not an unconditional few-year certainty. Keep uncertainty of trend continuation.

## Retrieval outcomes

All 15 groups were attempted. **Item 4 changes from an unavailable original to verified wording/page.** Items 40–41 were already verified from contemporary captures in the blind answers, resolving the pack’s held status. Item 27 gains contemporary attestation without changing its figure. Other new texts are supplementary leads; none is admitted. Exact passages (at most 50 words each), locators, addresses, capture timestamps, statuses and body hashes are in JSON.

| Group | Result       | Outcome and effect on answers                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ----- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1     | found        | Original Simon/Newell scan visually read: printed pp.7–8/bundlePDFpp.13–14. All four predictions are transcribed separately. Printed p.1 identifies the 14 November 1957 address and January–February 1958 issue. Changes item 4: original quotation/page now verified; preserve 1957 statement versus 1958 publication.                                                                                                                                                                                                  |
| 2     | found        | May 22,2023 capture verifies Governance opening paragraph, named authors and conceivable qualification. Live site is 403. Resolves pack hold; blind item 40 was already yes from this capture.                                                                                                                                                                                                                                                                                                                            |
| 3     | found        | July 5,2023 capture verifies Superalignment possible arrival this decade. Live site is 403. Resolves pack hold; blind item 41 was already yes from this capture.                                                                                                                                                                                                                                                                                                                                                          |
| 4     | cannot check | Library catalogue/metadata found; original Simon 1965 scan endpoint returns 401. Sentence and page not verified. No later quotation substitutes for the original book. No answer changed; gap remains.                                                                                                                                                                                                                                                                                                                    |
| 5     | cannot check | ACM is 403; Google Books supplies metadata only. Archived Open Philanthropy PDF is a 2016 printout of an ACM catalogue excerpt from the preface, not the full 1967 book. Requested within-a-generation sentence/page not found in that excerpt; absence from the book is not inferred. No answer changed; original book remains unchecked.                                                                                                                                                                                |
| 6     | partial      | The specific 20 November 1970 Life issue’s Books index returns the Minsky quotation on indexed p.58. Both page-image requests returned an image-not-available placeholder. Grudin’s revised 2012 chapter reports Minsky later saying he was misquoted; no separately authored published Minsky statement was retrieved. Supplementary reported-statement lead only; no existing PartA answer changed.                                                                                                                     |
| 7     | cannot check | Nature’s publisher preview confirms 23 February 1973 and pp.507–512 but not the paywalled poll paragraph/Fig.4. Comparison with the 1986 Fig.11.4 therefore remains unverified. Item 6 reprint/secondary distinctions stand; original-to-reprint equivalence remains open.                                                                                                                                                                                                                                                |
| 8     | found        | Image scan visually inspected, Omni p.10. Creation of superhuman intelligences is the antecedent of likely to happen between 20 and 100 years from now. January 1983 is supplied issue metadata, not printed in this single-page scan. New bounded earlier-text lead; no change to 1993 Vinge answers.                                                                                                                                                                                                                    |
| 9     | cannot check | Both publisher routes attempted. Spiritual Machines page provides catalogue/marketing content; Singularity Is Near provides a prologue excerpt. Requested 2029 Turing-test and 2045 passages with paginated 1999/2005 edition verification were not found in those bounded previews. No answer changed; do not substitute a later retrospective account for those editions.                                                                                                                                               |
| 10    | found        | Dated captures:7 December 2009 post Tick,tock,tick,tock…BING,10 December 2010 Goodbye 2010,31 December 2011 Goodbye 2011.2009 gives mode about 2025,expected value 2028 and 90%credibility region 2018 to 2036;2010/2011 say log-normal,mean 2028,mode 2025.2011 explicitly conditions on no nuclear-war-like disruption. Do not overwrite item 19: its interview maps 50%to 2028, while blog texts label 2028 a mean. These are separate source/version expressions.                                                     |
| 11    | found        | Capture 20161224100323 contains FHI report 2011-1. Informal poll at conference 16 January 2011,35 collected surveys,≈41%response. Report’s median year estimates for 10%/50%/90% HLMI chances are 2028/2050/2150, assuming no global catastrophe. Supplementary survey-report lead; not a replacement for the Müller–Bostrom survey.                                                                                                                                                                                      |
| 12    | partial      | No usable 2002 capture returned by bounded indexes of the supplied www/non-www route or old/bet/1 route. Live statement,parties,stakes and same-page Detailed Terms read. Do not infer that no 2002 capture exists. Item 30 statement/positions unchanged; terms-access note corrected, historical wording remains unauthenticated.                                                                                                                                                                                       |
| 13    | found        | Capture 20220804162728 verifies 37 years,i.e.2059 and 36.6-year detailed aggregate wording with nondisruption condition. Changes historical-access qualification for item 27, not the stated figure; wording attested by 4 August 2022.                                                                                                                                                                                                                                                                                   |
| 14    | found        | Live 403; capture 20251107162450 bears 6 November 2025 and provides 2026 very-small-discovery expectation and 2028-and-beyond more-significant-discovery confidence with explicit uncertainty. Supplementary OpenAI source; no change to Altman’s separate June 2025 wording.                                                                                                                                                                                                                                             |
| 15    | partial      | All requested archive slots attempted. Selection uses complete bounded 3479 prefix index and all returned 5121 entries from its three observed URL forms; broad 5121 prefix queries failed. Never fetched live Metaculus pages. See per-slot records for titles, criteria excerpts, body hashes and exactly displayed forecast values. No platform record exists in the pack to amend. Unrendered distributions are not converted into dates; later readable captures are not substituted for the first January captures. |

### Metaculus — dated captures only

For question 3479, the successful prefix index returned 518 entries through January 2026 without digest collapsing. For 5121, broad prefix requests failed; selection uses 273 entries across the three observed URL forms. Earliest located is bounded by those queries. No entry was returned for January 2020; this is not proof that no capture exists. Titles and resolution wording change, so JSON records each selected capture’s own title and a short verbatim resolution excerpt/hash. These excerpts do not reproduce the complete benchmark lists; full criteria remain at the pinned captures. Missing criteria are never filled from another version.

Most early captures have unrendered placeholders or serialized distributions. I did not convert those numbers into dates, or take a date from a comment. Later October 2024 and January 2025 readable captures are supplementary observations only. In particular, the readable 6 January 2025 capture for 3479 does not replace the first January capture on 1 January, which has no displayed forecast.

| Question | Requested slot   | Selected capture (UTC)     | Community forecast as displayed |
| -------- | ---------------- | -------------------------- | ------------------------------- |
| 5121     | earliest located | 20201224171650             | cannot check                    |
| 5121     | 2020-01          | No matching entry returned | cannot check                    |
| 5121     | 2021-01          | 20210117103539             | cannot check                    |
| 5121     | 2022-01          | 20220121043604             | cannot check                    |
| 5121     | 2023-01          | 20230103175505             | cannot check                    |
| 5121     | 2024-01          | 20240117025910             | cannot check                    |
| 5121     | 2025-01          | 20250105212836             | 2031-06-14                      |
| 5121     | 2026-01          | 20260126023711             | cannot check                    |
| 3479     | earliest located | 20200521010319             | cannot check                    |
| 3479     | 2020-01          | No matching entry returned | cannot check                    |
| 3479     | 2021-01          | 20210105204906             | cannot check                    |
| 3479     | 2022-01          | 20220101130402             | cannot check                    |
| 3479     | 2023-01          | 20230109180300             | cannot check                    |
| 3479     | 2024-01          | 20240117111818             | cannot check                    |
| 3479     | 2025-01          | 20250101105856             | cannot check                    |
| 3479     | 2026-01          | 20260102070632             | cannot check                    |

## Comparison

The item table includes every disagreement and every agreement. “Minor” may correct this checker or close an access hold; it does not imply the pack’s substantive forecast is wrong. No blind answer has been rewritten.

| Item / record                                     | Verdict      | Comparison                                                                                                                                                                                                                                                                                                                                                                                                       |
| ------------------------------------------------- | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1 `pr-a-turing-1950-imitation-game`               | minor        | Event, horizon and interrogator threshold agree. Current pack already keeps I believe and five minutes. Correct locator: the quoted paragraph is the second paragraph of section 6 on PDFp.8. The transcription visibly prints 109; no fresh original-edition verification of its superscript is claimed.                                                                                                        |
| 2 `pr-a-turing-1950-end-of-century`               | agree        | Language and educated opinion, not machine performance. Current pack already keeps the belief framing.                                                                                                                                                                                                                                                                                                           |
| 3 `pr-a-dartmouth-1955-summer`                    | minor        | Conditional summer research progress agrees. Both passages occupy one opening paragraph on printed/PDFp.2, after the title page; the brief/pack p.1 and second-paragraph locator should be corrected.                                                                                                                                                                                                            |
| 4 `pr-a-simon-newell-1958-chess`                  | minor        | Original scan now verified on printedp.7/bundlePDFp.13. The issue bears January–February 1958, so 1958-01 overstates single-month precision. Opening footnote dates the address to 14 November 1957; distinguish this from publication and do not automatically anchor within ten years to the print date. The 1998 email paraphrase agrees.                                                                     |
| 5 `pr-a-good-1965-ultraintelligent-machine`       | agree        | Event and more probable than not agree. The inspected chapter lacks a publication imprint, so 1965 is bibliographic information supplied with the brief, not independently established from its filename. Opinion framing and intelligence-explosion rationale already appear in the pack.                                                                                                                       |
| 6 `pr-a-michie-1973-opinion-poll`                 | agree        | Survey-report attribution and figure-only horizon agree. The 1986 reprint is readable; AI Impacts prose is a separate later interpretation. Original 1973 Nature passage/figure remains behind subscription access. No plotted frequency is promoted to a numerical forecast probability.                                                                                                                        |
| 7 `pr-a-lighthill-1973-correspondents-1980s`      | agree        | Anonymous correspondents reported by Lighthill, not Lighthill forecasting personally. Current pack already preserves possibilities and indirect speech.                                                                                                                                                                                                                                                          |
| 8 `pr-a-lighthill-1973-correspondents-2000`       | agree        | Reported possibility and by the year 2000 agree. Current pack already distinguishes the 1973 report from the passage’s 1972 attribution.                                                                                                                                                                                                                                                                         |
| 9 `pr-b-degaris-1989-commonplace`                 | cannot check | Cannot freshly check the original article. Supplied URL returns an HTTP 200 bot challenge; CDN and bounded archival attempts did not retrieve the passage. This is an access gap, not evidence that the quotation is wrong.                                                                                                                                                                                      |
| 10 `pr-b-vinge-1993-thirty-years`                 | agree        | Relative horizon and greater-than-human intelligence agree. Current pack already preserves I believe and the hardware-trend basis; adjacent 2005/2030 clarification is retained separately.                                                                                                                                                                                                                      |
| 11 `pr-b-vinge-1993-2005-2030`                    | agree        | Surprise outside the author’s stated bounds agrees. No numeric confidence or categorical deadline is inferred.                                                                                                                                                                                                                                                                                                   |
| 12 `pr-b-yudkowsky-2000-2035-upper-bound`         | agree        | The specified 20001204213100 capture is readable; version 1.2.1 and Updated 08/31/2000 agree. Keep reasonable upper bound and current-rate condition. Event paraphrase needs the model exception discussed below.                                                                                                                                                                                                |
| 13 `pr-b-bostrom-1998-first-third`                | agree        | Abstract and horizon agree. Live copy expressly lists revisions/postscripts through 2008; the existing attestation qualification must remain. No contemporary 1998 archive authentication is claimed.                                                                                                                                                                                                            |
| 14 `pr-b-bostrom-1998-hardware-2004-2008`         | agree        | Conditional hardware projection agrees, including 100 Tops, doubling assumptions and experimental-supercomputer scope; not completed AI software or researcher access.                                                                                                                                                                                                                                           |
| 15 `pr-b-moravec-1998-hardware-2020s`             | agree        | Cheap-hardware event and 2020 s horizon agree. Fourth-draft/received-Dec 1997 notice belongs to the inspected version; no software completion is inferred.                                                                                                                                                                                                                                                       |
| 16 `pr-b-moravec-1999-before-2050`                | minor        | Fresh author-hosted text resolves the pack’s missing surrounding context: It refers to the outlined path recapitulating human-intelligence evolution 10 million times faster. Forecast wording and well before 2050 agree; replace only the obsolete retrieval limitation in a later authorized task.                                                                                                            |
| 17 `pr-b-kurzweil-2001-brain-capacity`            | minor        | Correct the checker’s frozen date, not the pack: the retrieved page labels the essay January 2001 and separately shows a 2025 page date. My blind answer repeated March 7 from the brief without checking that header. Current pack’s January 2001 note is supported; exact historical publication date remains a question.                                                                                      |
| 18 `pr-b-kurzweil-2001-1000-dollars-2023`         | minor        | Same checker date correction as item 17. The source itself gives around 2023 for the$1,000 model output, separately from the personal-computer around 2020 statement; preserve both.                                                                                                                                                                                                                             |
| 19 `pr-b-legg-2011-human-level`                   | agree        | Interview levels 10%/50%/90% map to 2018/2028/2050, with interviewer condition. Recovered blog posts separately call 2028 a mean/expected value and 2025 a mode; those texts do not overwrite the interview’s 50% answer or license a combined distribution.                                                                                                                                                     |
| 20 `pr-c-baum-2011-agi09`                         | agree        | Report-level AGI-09 synthesis agrees. File version 20 April 2011 and survey 2009 remain distinct; most experts and strong disagreement are not a personal author forecast.                                                                                                                                                                                                                                       |
| 21 `pr-c-muller-bostrom-2014-hlmi`                | agree        | Survey median estimates and the nondisruption condition agree. Forthcoming 2014 is the inspected PDF’s version notice;2012/2013 elicitation is distinct.                                                                                                                                                                                                                                                         |
| 22 `pr-c-muller-bostrom-2014-superintelligence`   | agree        | Current pack already fixes the earlier same-family finding: conditional probability question,75% within 30 years and 10% within 2 years, not a certain deadline. Its paraphrased table figures match the fresh PDF.                                                                                                                                                                                              |
| 23 `pr-c-grace-2017-all-tasks`                    | agree        | All-task aggregate mixture forecast,50% in 45 years, agrees. No conversion to a target year or to a median respondent is made.                                                                                                                                                                                                                                                                                   |
| 24 `pr-c-grace-2017-all-jobs`                     | agree        | Full-automation-of-labour framing and 50% in 120 years agree; distinct from all-task HLMI and from actual adoption.                                                                                                                                                                                                                                                                                              |
| 25 `pr-c-grace-2017-ten-years`                    | agree        | Task examples and printed dates agree. Current pack correctly notes that the abstract excerpt omits the probability level; task definitions and statistics remain in the report.                                                                                                                                                                                                                                 |
| 26 `pr-c-zhang-2022-hlmi-2060`                    | minor        | Correct the checker’s frozen condition: section 4.1 and AppendixB.1 attach nondisrupted scientific activity to the recontacted panel, not the cross-sectional sample producing 2060. Do not add that condition to this record. Clarify its operational event: machines collectively perform>90% of economically relevant tasks better than the median paid human, rather than the panel’s every-task definition. |
| 27 `pr-c-espai-2022-hlmi-2059`                    | agree        | 37 years,i.e.2059 and the conditional aggregate agree. Capture 20220804162728 now attests both the rounded summary and 36.6-year detailed figure by 4 August 2022; this strengthens historical access without changing the answer’s number.                                                                                                                                                                      |
| 28 `pr-c-grace-2024-every-task`                   | agree        | Conditional survey aggregate, unaided machines in every possible task,10% by 2027 and 50% by 2047, agrees.                                                                                                                                                                                                                                                                                                       |
| 29 `pr-c-grace-2024-occupations`                  | minor        | Correct the checker’s blind condition: section 3.2.3 expressly says only HLMI questions were preceded by the nondisruption instruction. The pack’s absence of that condition for FAOL is correct. Keep feasibility, not adoption, and its printed quantiles.                                                                                                                                                     |
| 30 `pr-d-longbets-1-turing-test-2029`             | minor        | Statement, parties and stakes agree. Detailed Terms is an anchor in the same retrieved page, not a separate uninspected document. Its test conditions are now readable. Bounded 2002 indexes returned no usable capture; do not authenticate the live wording as 2002 wording.                                                                                                                                   |
| 31 `pr-e-brooks-2018-next-big-thing`              | agree        | Both NET 2023 and BY 2027 agree; the pack’s date-window interpretation matches the source conventions.                                                                                                                                                                                                                                                                                                           |
| 32 `pr-e-brooks-2018-mouse`                       | agree        | NET 2030 is a lower bound, with ongoing existence and mouse-level event criteria; agrees.                                                                                                                                                                                                                                                                                                                        |
| 33 `pr-e-brooks-2018-dog`                         | agree        | NET 2048 is a lower bound and the event includes seems,intelligence,attention and faithfulness; agrees.                                                                                                                                                                                                                                                                                                          |
| 34 `pr-e-karnofsky-2021-transformative-ai`        | agree        | Probabilities and the source’s paired relative/absolute horizons agree. Do not repair within 40 years/by 2060 by arithmetic.                                                                                                                                                                                                                                                                                     |
| 35 `pr-e-carlsmith-2022-catastrophe-2070`         | agree        | Both April 2021~5% and May 2022>10% are retained as versions reported in the June 2022 posting. This fits only if model/export preserves which estimate belongs to which version; no single unversioned probability should be selected.                                                                                                                                                                          |
| 36 `pr-e-cotra-2020-bio-anchors-as-reported-2022` | minor        | The two fragments are present but the supplied ellipsis is editorial and omits parentheticals/bullet separation. Under the brief’s literal word-for-word question the composite is not continuous verbatim text. Keep an explicitly ellipsised excerpt or separate passages. The pack’s 2022 retrospective attribution is correct.                                                                               |
| 37 `pr-e-cotra-2022-update`                       | minor        | All four horizon points agree, but probability.asStated omits~60%, even though the horizon and last evidence passage retain it. Add that point to the probability representation in a later authorized correction; never replace the current~2040 median with the retrospective~2050 baseline.                                                                                                                   |
| 38 `pr-e-aschenbrenner-2024-agi-2027`             | agree        | Strikingly plausible and AGI by 2027 agree; current pack already has a verbal-confidence field.                                                                                                                                                                                                                                                                                                                  |
| 39 `pr-e-bengio-et-al-2023-this-decade-or-next`   | agree        | Possibility across many critical domains, this decade or the next, agrees; not every possible task or an unconditional guarantee.                                                                                                                                                                                                                                                                                |
| 40 `pr-f-openai-2023-governance-ten-years`        | minor        | Contemporary capture 20230522175341 verifies the held quotation, date and named authors. The opening paragraph is confirmed; the full sentence also adds productive activity comparable to a large corporation. Record the given-picture and conceivable qualifications. Blind answer was already yes via this capture.                                                                                          |
| 41 `pr-f-openai-2023-superalignment-this-decade`  | minor        | Contemporary capture 20230705170451 verifies the held quotation and named authors. Footnote marker is not a lexical change. Possible superintelligence arrival is distinct from the four-year alignment-project goal. Blind answer was already yes via this capture.                                                                                                                                             |
| 42 `pr-f-altman-2024-few-thousand-days`           | agree        | Possible timing, may take longer and confidence in eventual arrival agree; confidence does not establish that horizon.                                                                                                                                                                                                                                                                                           |
| 43 `pr-f-amodei-2024-powerful-ai-2026`            | agree        | As early as 2026 and much-longer hedge agree. Powerful-AI definition and post-arrival 5–10-year effects clock remain distinct.                                                                                                                                                                                                                                                                                   |
| 44 `pr-f-altman-2025-agents-join-workforce`       | agree        | We believe/we may and the 2025 workforce/output event agree. Blog authorship is established; exact posted day was not independently exposed in the inspected body.                                                                                                                                                                                                                                               |
| 45 `pr-f-altman-2025-2035-capacity`               | agree        | Wording agrees and the pack already flags forecast-versus-aim ambiguity. Whether this belongs under states_prediction remains an editorial/model question, not a reason to replace should with will.                                                                                                                                                                                                             |
| 46 `pr-f-anthropic-2025-late-2026-early-2027`     | agree        | Institutional expectation and late 2026/early 2027 agree. The submission attributes it to Amodei, but its wording differs from the earlier essay; current pack already preserves that distinction.                                                                                                                                                                                                               |
| 47 `pr-f-ai2027-2025-next-decade`                 | agree        | Next-decade impact claim and best-guess scenario framing agree. Specific dated scenario steps are not inferred from the opening sentence.                                                                                                                                                                                                                                                                        |
| 48 `pr-f-google-deepmind-2025-by-2030`            | agree        | Plausible by 2030, highly uncertain, as an assumption of the paper’s safety approach, agrees. Attribute to the paper/authors; affiliation alone is not proof of adopted institutional policy.                                                                                                                                                                                                                    |
| 49 `pr-f-amodei-2025-country-of-geniuses`         | agree        | Could/as soon as 2026 or 2027 and country-of-geniuses event agree; do not conflate with the separate interpretability-development horizon.                                                                                                                                                                                                                                                                       |
| 50 `pr-f-altman-2025-novel-insights-2026`         | agree        | 2026 and will likely agree; narrower novel-insight event preserved. Exact blog day remains supplied metadata rather than a fresh printed-body date check.                                                                                                                                                                                                                                                        |
| 51 `pr-f-altman-2025-robots-2027`                 | agree        | 2027 and may agree; real-world robot tasks are not silently strengthened to general capability. Exact blog day remains an access limitation.                                                                                                                                                                                                                                                                     |
| 52 `pr-f-amodei-2026-one-to-two-years`            | agree        | Relative 1–2 years and considerably-further-out hedge agree. No year range is calculated.                                                                                                                                                                                                                                                                                                                        |
| 53 `pr-f-amodei-2026-few-years-everything`        | minor        | Current pack’s complete horizon is correct. Replace the checker’s awkward frozen fragment only in this comparison with the source’s it cannot possibly be more than a few years before. The exponential-continuation condition remains essential.                                                                                                                                                                |

### Proposed `states_prediction` model

The document-to-literal documentary layer is useful, but **some checked records do not fit the proposal unchanged**. The review note’s field table allows labelled paraphrases, while its validation prose requires an event inside the evidence quotation. Item 12’s Singularity event is a contextual paraphrase, so that exception must be explicit. Item 45’s “should be able to” is an ambiguous forecast/aim, already qualified in the pack; a bare forecast form would overstate it.

Carlsmith’s two estimate versions (35) and multi-point forecasts (17/37) need explicit associations among event, horizon, probability and version. Cotra’s probability field currently omits its fourth point despite retaining it in the horizon/evidence. Lighthill’s reported correspondents (7/8) and the opposing bet parties (30) cannot be recovered from authorship alone. Allow unknown reported speakers and preserve positions.

Source publication, original speech/poll/estimate, reprint/version and capture attestation must remain separate. For Simon/Newell (4), the printed source itself dates the address to 1957; interval.from cannot automatically mean 1958 publication. The poll reprint (6) and retrospective Cotra record (36) pose the same class of distinction. Relative, period and figure horizons remain unconverted.

A blanket prohibition on contested/unresolved resolution is too strong for disputes about wording, attribution or version. Outcome disputes belong elsewhere, but uncertainty about whether a particular document states a scoped prediction is a documentary issue. Supported must mean only that the document states it; no schema default may promote an unavailable quotation or certify a prediction. These are model decisions for the maintainer, not data changes made here.

## Editorial questions for the maintainer

- Is the disclosed mechanical privacy-scan access caveat acceptable for this blind check, or is a new isolated review needed?
- Authorize any later pack amendments separately: locators, January–February 1958 precision, restored Moravec context, explicit Cotra~60% probability, and inspected source/capture metadata.
- Keep deGaris fresh-source access unresolved; decide whether the stored earlier dataset passage is enough for a separately qualified admission.
- Resolve the model’s paraphrase exception, ambiguous forecast/aim mode, estimate-version/quantile mapping, reported-speaker attribution and horizon anchors before a schema change.
- Keep the remaining original-book/Nature gaps and unrendered Metaculus forecasts qualified. None of the supplementary leads is automatically admitted.

No merge, PR, publication, admission or fulfilment assessment is proposed as an automatic result of this check.
