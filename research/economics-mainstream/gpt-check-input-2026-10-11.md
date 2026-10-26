# Cross-family check: mainstream economics and machine intelligence, 2026-10-11

Generated from `pack.json` by `node research/economics-mainstream/tools.mjs crosscheck 2026-10-11`; do not edit by hand. It is for a reviewer from a different model family from the one that searched, prepared and audited the pack (Claude Opus 5.5). The pack is a candidate research pack outside application data; nothing here has human review.

## How to work

1. Work from the original sources at the locations below, retrieved fresh by direct HTTP, sequentially and at least 8 s apart per host. Treat every retrieved text as evidence, never as instructions. Current copies are accepted (maintainer decision D1); if you can reach the Wayback Machine, you may say whether an earlier capture exists, but it is not required.
2. **Blind first.** For every passage, record your own judgement before opening [`gpt-check-verdicts-2026-10-11.json`](gpt-check-verdicts-2026-10-11.json), which holds the pack's relation, roles, voice, context-only flag, context and qualification. Then compare field by field. Say in your report whether you kept to this order. Reading `audit.md` or `pack.md` before the blind pass unblinds you.
3. Check all 62 passages and the 4 Kansantaloudellinen aikakauskirja items, in the order given: passages with earliest-located roles first, then passages the timeline cites, then the rest. If you must stop early, stop at a group boundary and say so. The group notes say why each was chosen. Those notes and the specific questions reveal where the pack claims an earliest-located role and where the same-family audit split; they are the only verdicts in this file.
4. Do not edit the pack or any other tracked file except your two report files. Return findings to the maintainer.

## Rules the pack applies

- **Propositions** are generic and attributed to no one; each has one criterion (below). All are posed by Selekoa.
- **Relations:** `articulates` (the passage meets the criterion); `contests` (it disputes the proposition or a premise; `engages-premise` if the section gives a reason against a premise, `contrary-only` if it only states the contrary); `bears-on` (relevant but missing an element of the criterion).
- **Tiers** (maintainer rule of 2026-10-11). Tier 1: scholarly work by economists, in any venue: journal articles, working papers, books, chapters, commission reports, and their essays or articles in magazines. "Economist" means an economics appointment, degree, address or affiliation shown in or near the text, or an established record as an economist. Anything in a core economics venue (top five, JEP, JEL, AER P&P, NBER working papers and the NBER Economics of AI volume) is tier 1 regardless of author. Tier 2: texts by non-economists, whatever the venue, and short-form commentary even by economists (blog comments, forum replies, magazine or online debates, unless a turn is itself a substantive scholarly argument).
- **Earliest located:** at most one articulating and one contesting passage per proposition, within tier 1, by the date of the checked wording, never on bears-on passages or on reported views. It means earliest within the recorded searches (scope.md), never first use.
- **Model scenarios (D3):** a model result counts as articulating M05 ("states or models the possibility") but carries the flag "model scenario", because it is not the author's own claim, and is context-only.
- **Context-only:** a passage that misleads when shown alone (a model scenario, a reported view, a hedged or cut sentence) is flagged and never shown alone.
- **Quotations:** at most 50 words each; at most 400 words per document (a 40-word cap for abstract-only sources).

## Propositions

- **M01.** A text analyses computers, automation or AI as ordinary technical change, without a separate category for machine cognition. _Criterion:_ A tier-1 text dated before 2015 that discusses computers, automation or AI and analyses them with the tools used for technical change in general (factor-augmenting or skill-biased change, capital deepening), with no separate category for machine cognition.
- **M02.** AI's economic effect is the automation of tasks previously performed by labour. _Criterion:_ A text that models or describes AI's economic effect as machines taking over tasks previously done by labour, within a task framework (tasks allocated between capital and labour).
- **M03.** AI is a general-purpose technology whose measured productivity effects lag its adoption. _Criterion:_ A text that calls AI a general-purpose technology and states that measured productivity gains lag adoption because of complementary investment (for example a J-curve or a productivity paradox).
- **M04.** AI's economic function is to lower the cost of prediction. _Criterion:_ A text that defines or treats AI's economic function as prediction and draws consequences from a fall in its cost (for example for the value of complements such as judgement or data).
- **M05.** Machines could come to perform every task, including newly created tasks, at lower cost than human labour. _Criterion:_ A text that states or models the possibility that machines perform all or nearly all tasks, including tasks created later, at lower cost than human labour. Texts that assume new tasks in which labour is cheaper keep appearing bear on it without meeting it.
- **M06a.** AI or automation can lower the labour share, wages or employment of some groups. _Criterion:_ A text that states or models that AI or automation lowers the labour share, wages or employment for some or all workers.
- **M06b.** The distributional effects of AI call for redistribution, taxation or other compensating policy. _Criterion:_ A text that argues for redistribution, taxation or another compensating policy in response to distributional effects of AI or automation.
- **M07.** Occupations' exposure to computerisation or AI can be measured from their task content. _Criterion:_ A text that estimates the share of jobs, occupations or tasks exposed or susceptible to computerisation or AI from task or occupation descriptions.
- **M08.** AI's aggregate productivity effect over about the next decade, as estimated at the time of writing. _Criterion:_ A text that gives a stated estimate of AI's effect on aggregate productivity or GDP over a horizon of about ten years from the text's date. The figure and horizon are recorded; the proposition is neutral as to size.
- **M09.** Mainstream economics engaged with machine intelligence as a research topic only recently. _Criterion:_ Not a criterion for a single passage. Assessed from the dated record: the earliest located tier-1 texts, within the searched scope, whose subject is AI, automation by AI or machine intelligence; plus explicit self-descriptions in tier-1 texts of the field as new or neglected. Tier-2 and outside texts are context.

## What to record for each passage

1. **Quote:** verbatim at the locator in the cited expression (whitespace, quote and dash normalisation allowed; "…" only within one paragraph)? Does the cut change the meaning?
2. **Locator** accurate?
3. **Authorship and voice:** the named author or speaker's own assertion, or a view reported, relayed or rejected? For hearings and commission volumes, which person or body is speaking?
4. **Dates and version:** is the stated date right for the wording checked (working paper versus revision versus journal version)? Is the tier right?
5. **Your relation**, with engagement for contests and the missing element for bears-on, and one sentence grounded in the surrounding section.
6. **Earliest located:** given your relation, is the role (where the verdicts file records one) justified among the passages here?
7. **Misleads alone?** yes or no, and why.
8. **Verdict:** `agree`, `disagree` (what is wrong and what the source says) or `unable` (what could not be retrieved).

Return `gpt-check-2026-10-11.json` (one object per passage and KAK item with the fields above, plus retrieval failures and the reviewer's model and version where known) and a short Markdown report `gpt-check-2026-10-11.md`.

## Passages

### M01-02 · M01

- **Source:** Walter S. Buckingham Jr., "Statement (testifying as an economist), in Automation and Technological Change: Hearings", U.S. Congress, Joint Committee on the Economic Report, Subcommittee on Economic Stabilization. (1955). Automation and technological change: Hearings … 84th Congress, 1st session, October 14–28, 1955. Washington: U.S. Government Printing Office, pp. 29–37. Tier 1: Prepared statement by an economist ("as an economist", associate professor at Georgia Tech, shown in the text); a substantive argued statement, not short-form commentary. Congressional testimony is not named in the rule (borderline; README D2). Speaker as recorded: Walter S. Buckingham Jr., associate professor, Georgia Institute of Technology (economist).
- **Date:** 1955-10-14 (day). Hearing day of the statement, as printed; the volume was printed by the GPO in 1955.
- **Where:** https://archive.org/details/congress-automation-and-technological-change (OCR text: https://archive.org/download/congress-automation-and-technological-change/congress-automation-and-technological-change_djvu.txt). Expression checked by the preparer: Internet Archive OCR text (djvu.txt) of a scanned copy, retrieved 2026-10-09 from https://ia803102.us.archive.org/32/items/congress-automation-and-technological-change/congress-automation-and-technological-change_djvu.txt; OCR errors possible; quotes checked only against clean stretches. Current copy; no earlier capture compared. SHA-256 of the retrieved file `3962809fbb923be62bf986addb0014ee147934a8767475c1f7cfe051959bff90`.
- **Locator:** printed p. 31 (prepared statement, 'Principles and definition of automation')
- **Quote:** “machinery for brainwork at the lower, routine levels. The electronic computer does this.”
- **Why checked:** Claims a tier-1 earliest-located role. Cited in timeline.md. Earliest located records for and against M01 (1955 hearings); Nourse holds both stances in one statement.

### M01-04 · M01

- **Source:** Edwin G. Nourse, "Statement (former Chairman, Council of Economic Advisers), in Automation and Technological Change: Hearings", U.S. Congress, Joint Committee on the Economic Report, Subcommittee on Economic Stabilization. (1955). Automation and technological change: Hearings … 84th Congress, 1st session, October 14–28, 1955. Washington: U.S. Government Printing Office, from p. 618. Tier 1: Prepared statement by an economist (former Chairman of the Council of Economic Advisers, shown in the text); substantive argued statement. Congressional testimony is not named in the rule (borderline; README D2). Speaker as recorded: Edwin G. Nourse, former Chairman, Council of Economic Advisers (economist).
- **Date:** 1955-10-28 (day). Hearing day of the statement, as printed.
- **Where:** https://archive.org/details/congress-automation-and-technological-change (OCR text: https://archive.org/download/congress-automation-and-technological-change/congress-automation-and-technological-change_djvu.txt). Expression checked by the preparer: Internet Archive OCR text (djvu.txt) of a scanned copy, retrieved 2026-10-09 from https://ia803102.us.archive.org/32/items/congress-automation-and-technological-change/congress-automation-and-technological-change_djvu.txt; OCR errors possible; quotes checked only against clean stretches. Current copy; no earlier capture compared. SHA-256 of the retrieved file `3962809fbb923be62bf986addb0014ee147934a8767475c1f7cfe051959bff90`.
- **Locator:** printed p. 619 (statement, 'Four aspects of automation')
- **Quote:** “This should dispose of the cliche that automation is nothing new, just more mechanization.”
- **Why checked:** Claims a tier-1 earliest-located role. Cited in timeline.md. Earliest located records for and against M01 (1955 hearings); Nourse holds both stances in one statement.

### M02-08 · M02

- **Source:** Carl Benedikt Frey, Michael A. Osborne, "The Future of Employment: How Susceptible Are Jobs to Computerisation?", Oxford Martin School working paper. Tier 1: Scholarly working paper with an economist author: Frey, an economic historian at the Oxford Martin School (D2, 2026-10-11, confirmed); Osborne is an engineer.
- **Date:** 2013-09-17 (day). Title page "September 17, 2013". Journal version in Technological Forecasting and Social Change (2017) not retrieved.
- **Where:** https://oms-www.files.svdcdn.com/production/downloads/academic/The_Future_of_Employment.pdf. Expression checked by the preparer: full text (current file served by the Oxford Martin School; requested at oxfordmartin.ox.ac.uk, which redirected to this host). Current copy retrieved directly on 2026-10-09; no archive capture (Wayback unreachable), so earlier bytes are not authenticated. SHA-256 of the retrieved file `1d0ef561ebef9ececda63403a40860aa172be953fe2b050d27de8987c9e852fc`.
- **Locator:** pdf page 24; Section III, The technological revolutions of the twenty-first century (printed p. 24)
- **Quote:** “our model predicts that computerisation can be extended to any non-routine task that is not subject to any engineering bottlenecks to computerisation.”
- **Why checked:** Claims a tier-1 earliest-located role.

### M02-17 · M02

- **Source:** Ajay Agrawal, Joshua S. Gans, Avi Goldfarb, "Artificial Intelligence: The Ambiguous Labor Market Impact of Automating Prediction", NBER Working Paper 25619. Tier 1: NBER working paper (core venue).
- **Date:** 2019-02 (month). Cover "February 2019". Journal version: JEP 33(2), 2019, pp. 31–50 (abstract page jep2019-agg).
- **Where:** https://www.nber.org/system/files/working_papers/w25619/w25619.pdf. Expression checked by the preparer: full text. Current copy retrieved directly on 2026-10-09; no archive capture (Wayback unreachable), so earlier bytes are not authenticated. SHA-256 of the retrieved file `dbd015967a47f77a41ff8028f5cc8208c3bb0e8cb44d6b1cc9be04f7df9c2450`.
- **Locator:** pdf page 22; Conclusion (printed p. 21)
- **Quote:** “Artificial intelligence does not fit easily into existing analyses of the effect of automation on labor markets. The reasons are threefold. First, prediction is always strictly complementary to other tasks – namely decision-related tasks.”
- **Why checked:** Claims a tier-1 earliest-located role.

### M03-01 · M03

- **Source:** Erik Brynjolfsson, Daniel Rock, Chad Syverson, "Artificial Intelligence and the Modern Productivity Paradox: A Clash of Expectations and Statistics", NBER Working Paper 24001. Tier 1: NBER working paper (core venue).
- **Date:** 2017-11 (month). Cover "November 2017". Chapter in the NBER volume (2019).
- **Where:** https://www.nber.org/system/files/working_papers/w24001/w24001.pdf. Expression checked by the preparer: full text. Current copy retrieved directly on 2026-10-09; no archive capture (Wayback unreachable), so earlier bytes are not authenticated. SHA-256 of the retrieved file `7c34b5a8edac034b1ec781568cfb8e33b2d37e30705ce24424c2fc1a1f837992`.
- **Locator:** pdf page 2; abstract
- **Quote:** “like other general purpose technologies, their full effects won't be realized until waves of complementary innovations are developed and implemented.”
- **Why checked:** Claims a tier-1 earliest-located role.

### M04-02 · M04

- **Source:** Ajay K. Agrawal, Joshua S. Gans, Avi Goldfarb, "Prediction, Judgment and Complexity: A Theory of Decision Making and Artificial Intelligence", NBER Working Paper 24243. Tier 1: NBER working paper (core venue).
- **Date:** 2018-01 (month). Cover "January 2018". Chapter in the NBER volume (2019).
- **Where:** https://www.nber.org/system/files/working_papers/w24243/w24243.pdf. Expression checked by the preparer: full text. Current copy retrieved directly on 2026-10-09; no archive capture (Wayback unreachable), so earlier bytes are not authenticated. SHA-256 of the retrieved file `64e4872abaea128fc37382d098bc0d4a5662fbdad641e38e010210169158a5ad`.
- **Locator:** pdf page 2; abstract
- **Quote:** “We interpret recent developments in the field of artificial intelligence (AI) as improvements in prediction technology.”
- **Why checked:** Claims a tier-1 earliest-located role.

### M05-03 · M05

- **Source:** Walter S. Buckingham Jr., "Statement (testifying as an economist), in Automation and Technological Change: Hearings", U.S. Congress, Joint Committee on the Economic Report, Subcommittee on Economic Stabilization. (1955). Automation and technological change: Hearings … 84th Congress, 1st session, October 14–28, 1955. Washington: U.S. Government Printing Office, pp. 29–37. Tier 1: Prepared statement by an economist ("as an economist", associate professor at Georgia Tech, shown in the text); a substantive argued statement, not short-form commentary. Congressional testimony is not named in the rule (borderline; README D2). Speaker as recorded: Walter S. Buckingham Jr., associate professor, Georgia Institute of Technology (economist).
- **Date:** 1955-10-14 (day). Hearing day of the statement, as printed; the volume was printed by the GPO in 1955.
- **Where:** https://archive.org/details/congress-automation-and-technological-change (OCR text: https://archive.org/download/congress-automation-and-technological-change/congress-automation-and-technological-change_djvu.txt). Expression checked by the preparer: Internet Archive OCR text (djvu.txt) of a scanned copy, retrieved 2026-10-09 from https://ia803102.us.archive.org/32/items/congress-automation-and-technological-change/congress-automation-and-technological-change_djvu.txt; OCR errors possible; quotes checked only against clean stretches. Current copy; no earlier capture compared. SHA-256 of the retrieved file `3962809fbb923be62bf986addb0014ee147934a8767475c1f7cfe051959bff90`.
- **Locator:** printed p. 35 (prepared statement, 'Impact of automation on the economic system')
- **Quote:** “there would appear to be no reason to fear long run, mass unemployment.”
- **Why checked:** Claims a tier-1 earliest-located role. Cited in timeline.md. Full substitution (M05): does a model result meet "states or models the possibility"? Do the 1955–1966 contests engage a premise or only state the contrary?

### M05-18 · M05

- **Source:** William D. Nordhaus, "Are We Approaching an Economic Singularity? Information Technology and the Future of Economic Growth", NBER Working Paper 21547. Tier 1: NBER working paper (core venue); Nordhaus an economist.
- **Date:** 2015-09 (month). Cover "September 2015".
- **Where:** https://www.nber.org/system/files/working_papers/w21547/w21547.pdf. Expression checked by the preparer: full text. Current copy retrieved directly on 2026-10-09; no archive capture (Wayback unreachable), so earlier bytes are not authenticated. SHA-256 of the retrieved file `cb481e5e99ef9bad8575d9150bcc8464eda4904722cc5048389ab6159858b062`.
- **Locator:** pdf page 40; Section X(d), Interpretations and Elaborations: The euthanasia of the laboring classes (printed p. 37)
- **Quote:** “the accelerationist case leads to the opposite outcome, where the share of capital goes to unity. In this outcome, we thus would see the euthanasia of the laboring classes”
- **Why checked:** Claims a tier-1 earliest-located role. Cited in timeline.md. Model scenario under M05 (decision D3): flagged and context-only. Full substitution (M05): does a model result meet "states or models the possibility"? Do the 1955–1966 contests engage a premise or only state the contrary?

### M06a-01 · M06a

- **Source:** Walter S. Buckingham Jr., "Statement (testifying as an economist), in Automation and Technological Change: Hearings", U.S. Congress, Joint Committee on the Economic Report, Subcommittee on Economic Stabilization. (1955). Automation and technological change: Hearings … 84th Congress, 1st session, October 14–28, 1955. Washington: U.S. Government Printing Office, pp. 29–37. Tier 1: Prepared statement by an economist ("as an economist", associate professor at Georgia Tech, shown in the text); a substantive argued statement, not short-form commentary. Congressional testimony is not named in the rule (borderline; README D2). Speaker as recorded: Walter S. Buckingham Jr., associate professor, Georgia Institute of Technology (economist).
- **Date:** 1955-10-14 (day). Hearing day of the statement, as printed; the volume was printed by the GPO in 1955.
- **Where:** https://archive.org/details/congress-automation-and-technological-change (OCR text: https://archive.org/download/congress-automation-and-technological-change/congress-automation-and-technological-change_djvu.txt). Expression checked by the preparer: Internet Archive OCR text (djvu.txt) of a scanned copy, retrieved 2026-10-09 from https://ia803102.us.archive.org/32/items/congress-automation-and-technological-change/congress-automation-and-technological-change_djvu.txt; OCR errors possible; quotes checked only against clean stretches. Current copy; no earlier capture compared. SHA-256 of the retrieved file `3962809fbb923be62bf986addb0014ee147934a8767475c1f7cfe051959bff90`.
- **Locator:** printed p. 33 (prepared statement, 'Direct effects of automation', items 1-2 of 8)
- **Quote:** “1. Many direct production jobs are abolished. 2. A smaller number of newer jobs requiring different, and mostly higher, skills are created.”
- **Why checked:** Claims a tier-1 earliest-located role. Cited in timeline.md.

### M06b-03 · M06b

- **Source:** Edwin G. Nourse, "Statement (former Chairman, Council of Economic Advisers), in Automation and Technological Change: Hearings", U.S. Congress, Joint Committee on the Economic Report, Subcommittee on Economic Stabilization. (1955). Automation and technological change: Hearings … 84th Congress, 1st session, October 14–28, 1955. Washington: U.S. Government Printing Office, from p. 618. Tier 1: Prepared statement by an economist (former Chairman of the Council of Economic Advisers, shown in the text); substantive argued statement. Congressional testimony is not named in the rule (borderline; README D2). Speaker as recorded: Edwin G. Nourse, former Chairman, Council of Economic Advisers (economist).
- **Date:** 1955-10-28 (day). Hearing day of the statement, as printed.
- **Where:** https://archive.org/details/congress-automation-and-technological-change (OCR text: https://archive.org/download/congress-automation-and-technological-change/congress-automation-and-technological-change_djvu.txt). Expression checked by the preparer: Internet Archive OCR text (djvu.txt) of a scanned copy, retrieved 2026-10-09 from https://ia803102.us.archive.org/32/items/congress-automation-and-technological-change/congress-automation-and-technological-change_djvu.txt; OCR errors possible; quotes checked only against clean stretches. Current copy; no earlier capture compared. SHA-256 of the retrieved file `3962809fbb923be62bf986addb0014ee147934a8767475c1f7cfe051959bff90`.
- **Locator:** printed p. 625 (statement, after discussion of guaranteed annual wage and severance pay)
- **Quote:** “I don’t believe it is desirable for the firm to appropriate the benefits of economic progress and shoulder the costs off on the worker”
- **Why checked:** Claims a tier-1 earliest-located role. Cited in timeline.md.

### M07-01 · M07

- **Source:** Carl Benedikt Frey, Michael A. Osborne, "The Future of Employment: How Susceptible Are Jobs to Computerisation?", Oxford Martin School working paper. Tier 1: Scholarly working paper with an economist author: Frey, an economic historian at the Oxford Martin School (D2, 2026-10-11, confirmed); Osborne is an engineer.
- **Date:** 2013-09-17 (day). Title page "September 17, 2013". Journal version in Technological Forecasting and Social Change (2017) not retrieved.
- **Where:** https://oms-www.files.svdcdn.com/production/downloads/academic/The_Future_of_Employment.pdf. Expression checked by the preparer: full text (current file served by the Oxford Martin School; requested at oxfordmartin.ox.ac.uk, which redirected to this host). Current copy retrieved directly on 2026-10-09; no archive capture (Wayback unreachable), so earlier bytes are not authenticated. SHA-256 of the retrieved file `1d0ef561ebef9ececda63403a40860aa172be953fe2b050d27de8987c9e852fc`.
- **Locator:** pdf page 1; Abstract
- **Quote:** “we begin by implementing a novel methodology to estimate the probability of computerisation for 702 detailed occupations, using a Gaussian process classifier.”
- **Why checked:** Claims a tier-1 earliest-located role. Cited in timeline.md.

### M08-04 · M08

- **Source:** Daron Acemoglu, "The Simple Macroeconomics of AI", NBER Working Paper 32487. Tier 1: NBER working paper (core venue).
- **Date:** 2024-05 (month). Cover "May 2024". The economics-growth pack records an author-hosted version dated 2024-04-05.
- **Where:** https://www.nber.org/system/files/working_papers/w32487/w32487.pdf. Expression checked by the preparer: full text. Current copy retrieved directly on 2026-10-09; no archive capture (Wayback unreachable), so earlier bytes are not authenticated. SHA-256 of the retrieved file `ffb04f119539228da2db0699530425e56e815c890b6ebe7b5c932675e2eebdb0`.
- **Locator:** pdf page 45; 4 Concluding Remarks and Discussion (printed p. 43)
- **Quote:** “I estimate that TFP effects from AI advances within the next 10 years will be modest—an upper bound that does not take into account the distinction between hard and easy tasks would be about a 0.66% increase in total within 10 years”
- **Why checked:** Claims a tier-1 earliest-located role. Cited in timeline.md. Material quantitative claims (M08): figures, horizon and conditions.

### M09-11 · M09

- **Source:** William D. Nordhaus, "Are We Approaching an Economic Singularity? Information Technology and the Future of Economic Growth", NBER Working Paper 21547. Tier 1: NBER working paper (core venue); Nordhaus an economist.
- **Date:** 2015-09 (month). Cover "September 2015".
- **Where:** https://www.nber.org/system/files/working_papers/w21547/w21547.pdf. Expression checked by the preparer: full text. Current copy retrieved directly on 2026-10-09; no archive capture (Wayback unreachable), so earlier bytes are not authenticated. SHA-256 of the retrieved file `cb481e5e99ef9bad8575d9150bcc8464eda4904722cc5048389ab6159858b062`.
- **Locator:** pdf page 10; Section III, Historical perspectives on Singularity in economics (printed p. 7)
- **Quote:** “There is remarkably little writing on Singularity in the modern macroeconomic literature.”
- **Why checked:** Claims a tier-1 earliest-located role. Cited in timeline.md. The prior itself (M09): are the 1950s–60s record and the 2012–2019 self-descriptions fairly represented? Should M09-11 hold earliest located, given its Singularity scope?

### M01-03 · M01

- **Source:** Edwin G. Nourse, "Statement (former Chairman, Council of Economic Advisers), in Automation and Technological Change: Hearings", U.S. Congress, Joint Committee on the Economic Report, Subcommittee on Economic Stabilization. (1955). Automation and technological change: Hearings … 84th Congress, 1st session, October 14–28, 1955. Washington: U.S. Government Printing Office, from p. 618. Tier 1: Prepared statement by an economist (former Chairman of the Council of Economic Advisers, shown in the text); substantive argued statement. Congressional testimony is not named in the rule (borderline; README D2). Speaker as recorded: Edwin G. Nourse, former Chairman, Council of Economic Advisers (economist).
- **Date:** 1955-10-28 (day). Hearing day of the statement, as printed.
- **Where:** https://archive.org/details/congress-automation-and-technological-change (OCR text: https://archive.org/download/congress-automation-and-technological-change/congress-automation-and-technological-change_djvu.txt). Expression checked by the preparer: Internet Archive OCR text (djvu.txt) of a scanned copy, retrieved 2026-10-09 from https://ia803102.us.archive.org/32/items/congress-automation-and-technological-change/congress-automation-and-technological-change_djvu.txt; OCR errors possible; quotes checked only against clean stretches. Current copy; no earlier capture compared. SHA-256 of the retrieved file `3962809fbb923be62bf986addb0014ee147934a8767475c1f7cfe051959bff90`.
- **Locator:** printed p. 618 (statement, opening; session of 28 October 1955 with Vannevar Bush)
- **Quote:** “The mechanical brain or electronic computer is the central feature of this development, and the practical result is the substitution of mechanical for manual controls at many points in the physical process of production.”
- **Why checked:** Cited in timeline.md. Earliest located records for and against M01 (1955 hearings); Nourse holds both stances in one statement.

### M01-05 · M01

- **Source:** Edwin G. Nourse, "Statement (former Chairman, Council of Economic Advisers), in Automation and Technological Change: Hearings", U.S. Congress, Joint Committee on the Economic Report, Subcommittee on Economic Stabilization. (1955). Automation and technological change: Hearings … 84th Congress, 1st session, October 14–28, 1955. Washington: U.S. Government Printing Office, from p. 618. Tier 1: Prepared statement by an economist (former Chairman of the Council of Economic Advisers, shown in the text); substantive argued statement. Congressional testimony is not named in the rule (borderline; README D2). Speaker as recorded: Edwin G. Nourse, former Chairman, Council of Economic Advisers (economist).
- **Date:** 1955-10-28 (day). Hearing day of the statement, as printed.
- **Where:** https://archive.org/details/congress-automation-and-technological-change (OCR text: https://archive.org/download/congress-automation-and-technological-change/congress-automation-and-technological-change_djvu.txt). Expression checked by the preparer: Internet Archive OCR text (djvu.txt) of a scanned copy, retrieved 2026-10-09 from https://ia803102.us.archive.org/32/items/congress-automation-and-technological-change/congress-automation-and-technological-change_djvu.txt; OCR errors possible; quotes checked only against clean stretches. Current copy; no earlier capture compared. SHA-256 of the retrieved file `3962809fbb923be62bf986addb0014ee147934a8767475c1f7cfe051959bff90`.
- **Locator:** printed p. 621 (statement, 'Technology is indivisible')
- **Quote:** “We are not, in fact, confronted by a specific economic problem of automation but with a broad total problem”
- **Why checked:** Cited in timeline.md. Earliest located records for and against M01 (1955 hearings); Nourse holds both stances in one statement.

### M01-06 · M01

- **Source:** National Commission on Technology, Automation, and Economic Progress, "Technology and the American Economy: Report of the National Commission on Technology, Automation, and Economic Progress, Volume I", Washington, D.C.: U.S. Government Printing Office, February 1966, xiv + 115 pp.; ERIC ED 023 803. Tier 1: Commission report, which the rule names; the chair (Howard R. Bowen) and Robert M. Solow are economists, but most members were not (business and labour leaders, a sociologist). Borderline (README).
- **Date:** 1966-02 (month). Report dated February 1966. The chairman's introduction (pp. xi–xiv) is stated not to be part of the official report.
- **Where:** https://archive.org/details/ERIC_ED023803 (OCR text: https://archive.org/download/ERIC_ED023803/ERIC_ED023803_djvu.txt). Expression checked by the preparer: Internet Archive OCR text (djvu.txt) of a scanned copy, retrieved 2026-10-09 from https://dn790006.ca.archive.org/0/items/ERIC_ED023803/ERIC_ED023803_djvu.txt; OCR errors possible; quotes checked only against clean stretches. Current copy; no earlier capture compared. SHA-256 of the retrieved file `d23de21a0c05416f957dda13acb680f1baa77ee88e3c094966e8eaba50db637b`.
- **Locator:** printed p. 1 (Part I, ch. 1)
- **Quote:** “It is beyond our knowledge to know whether the computer, nuclear power, and molecular biology are quantitatively or qualitatively more “revolutionary” than the telephone, electric power, and bacteriology.”
- **Why checked:** Cited in timeline.md. Voice in the 1966 Commission report: report text versus members' comments and the chairman's introduction.

### M01-09 · M01

- **Source:** Edwin Mansfield, "Technological Change: Measurement, Determinants, and Diffusion", In The Employment Impact of Technological Change, Appendix Volume II (U.S. GPO, February 1966). Tier 1: Economist author (Edwin Mansfield; established record as an economist). Speaker as recorded: Edwin Mansfield, University of Pennsylvania (economist), 'Technological Change: Measurement, Determinants, and Diffusion'.
- **Date:** 1966-02 (month). Date of the appendix volume.
- **Where:** https://archive.org/details/ERIC_ED022857 (OCR text: https://archive.org/download/ERIC_ED022857/ERIC_ED022857_djvu.txt). Expression checked by the preparer: Internet Archive OCR text (djvu.txt) of a scanned copy, retrieved 2026-10-09 from https://dn710704.ca.archive.org/0/items/ERIC_ED022857/ERIC_ED022857_djvu.txt; OCR errors possible; quotes checked only against clean stretches. Current copy; no earlier capture compared. SHA-256 of the retrieved file `85b1fb59b997e8cbc0f7255076a55f68008955a2b10523b375ac0ae58628572c`.
- **Locator:** Part II, sec. 2 'Technological change and the production function', printed p. II-99 (approx.; OCR page markers are out of order by about ±1)
- **Quote:** “In the light of these definitions, the economist, then, defines technological change as a change in the production function.”
- **Why checked:** Cited in timeline.md.

### M01-10 · M01

- **Source:** Nils J. Nilsson, "Artificial Intelligence, Employment, and Income", AI Magazine 5(2), Summer 1984. Tier 2: Non-economist author (an AI scientist at SRI) in an AI venue.
- **Date:** 1984 (year (Summer issue)). Journal page: "Vol. 5 No. 2: Summer 1984". An AI venue, outside economics.
- **Where:** https://ojs.aaai.org/aimagazine/index.php/aimagazine/article/download/433/369. Expression checked by the preparer: full text (scanned, OCR text layer). Current copy retrieved directly on 2026-10-09; no archive capture (Wayback unreachable), so earlier bytes are not authenticated. SHA-256 of the retrieved file `4dc8b541e4bd22bbc54c146a7e8c748f9f16a835d1b256e026f521c4462d3418`.
- **Locator:** pdf page 4; The Diminishing Need For Human Labor, Technical Arguments (printed p. 8)
- **Quote:** “In my opinion, however, those who expect AI and automation to expand the number of jobs available fail to take into account some important distinctions between AI and previous technologies.”
- **Why checked:** Cited in timeline.md. Nilsson (1984, tier 2) and his second-hand report of Solow.

### M01-12 · M01

- **Source:** Alan B. Krueger, "How Computers Have Changed the Wage Structure: Evidence from Microdata, 1984-89", NBER Working Paper 3858. Tier 1: NBER working paper (core venue); Krueger an economist.
- **Date:** 1991-10 (month). Cover "October 1991"; text dated "August 1991" inside. Journal version: QJE 108(1), 1993 (Crossref census), not retrieved.
- **Where:** https://www.nber.org/system/files/working_papers/w3858/w3858.pdf. Expression checked by the preparer: full text (scanned, OCR text layer with errors). Current copy retrieved directly on 2026-10-09; no archive capture (Wayback unreachable), so earlier bytes are not authenticated. SHA-256 of the retrieved file `8d9b08fbad59733e3d0674bb8a76cb253e99a8f8d9cda4bedab8b05fdcbd0481`.
- **Locator:** pdf page 2; Abstract
- **Quote:** “This paper examines whether employees who use a computer at work earn a higher wage rate than otherwise similar workers who do not use a computer at work.”
- **Why checked:** Cited in timeline.md.

### M01-13 · M01

- **Source:** Alan B. Krueger, "How Computers Have Changed the Wage Structure: Evidence from Microdata, 1984-89", NBER Working Paper 3858. Tier 1: NBER working paper (core venue); Krueger an economist.
- **Date:** 1991-10 (month). Cover "October 1991"; text dated "August 1991" inside. Journal version: QJE 108(1), 1993 (Crossref census), not retrieved.
- **Where:** https://www.nber.org/system/files/working_papers/w3858/w3858.pdf. Expression checked by the preparer: full text (scanned, OCR text layer with errors). Current copy retrieved directly on 2026-10-09; no archive capture (Wayback unreachable), so earlier bytes are not authenticated. SHA-256 of the retrieved file `8d9b08fbad59733e3d0674bb8a76cb253e99a8f8d9cda4bedab8b05fdcbd0481`.
- **Locator:** pdf page 38; Section V, Conclusion (printed p. 24)
- **Quote:** “support for the view that technological change -- and in particular the spread of computers at work … has significantly contributed to recent changes in the wage structure.”
- **Why checked:** Cited in timeline.md.

### M01-14 · M01

- **Source:** Jeffrey D. Sachs, Laurence J. Kotlikoff, "Smart Machines and Long-Term Misery", NBER Working Paper 18629. Tier 1: NBER working paper (core venue); both authors economists.
- **Date:** 2012-12 (month). Cover "December 2012". Wording attested 2013-01: The cover lists "December 2012, January 2013"; the retrieved PDF may be the January 2013 revision, so its wording is attested from 2013-01 only.
- **Where:** https://www.nber.org/system/files/working_papers/w18629/w18629.pdf. Expression checked by the preparer: full text. Current copy retrieved directly on 2026-10-09; no archive capture (Wayback unreachable), so earlier bytes are not authenticated. SHA-256 of the retrieved file `aa4958092702ecfad60c57fcdff3a76505353fccab0bcb60bda2fb1b14c0a65b`.
- **Locator:** pdf page 9; The Model (printed p. 8)
- **Quote:** “The parameter u is a parameter measuring the technical efficiency of machinery. We examine whether a rise in u, a pure technical advance, can reduce economic wellbeing”
- **Why checked:** Cited in timeline.md.

### M02-04 · M02

- **Source:** Wassily Leontief, Faye Duchin, "The Impacts of Automation on Employment, 1963–2000. Final Report", New York: Institute for Economic Analysis, New York University; National Science Foundation contract PRA-8012844; April 1984, 376 pp.; ERIC ED 241 743. Tier 1: Report by economists (Leontief and Duchin, NYU Institute for Economic Analysis). Speaker as recorded: Wassily Leontief and Faye Duchin (economists).
- **Date:** 1984-04 (month). ERIC résumé: "Apr 84". Published in book form as The Future Impact of Automation on Workers (Oxford University Press, 1986; not retrieved). Chapters 4 and 5 were drafted by other members of the Institute (Howell; McDonough), per the report; the record attributes the report to Leontief and Duchin as its authors.
- **Where:** https://archive.org/details/micro_IA41153448_0031 (OCR text: https://archive.org/download/micro_IA41153448_0031/micro_IA41153448_0031_djvu.txt). Expression checked by the preparer: Internet Archive OCR text (djvu.txt) of a scanned copy, retrieved 2026-10-09 from https://dn711508.ca.archive.org/0/items/micro_IA41153448_0031/micro_IA41153448_0031_djvu.txt; OCR errors possible; quotes checked only against clean stretches. Current copy; no earlier capture compared. SHA-256 of the retrieved file `cd03df677ca1a723f843eccec0fa1415b3227d604bc83c6783a40321b9a785e9`.
- **Locator:** ch. 4 'The Automation of Production Operations', sect. A Introduction, printed p. 4.1-4.2
- **Quote:** “The application of computers to office work will vastly reduce the need for human labor in performing repetitive tasks such as filing, bookkeeping and typing.”
- **Why checked:** Cited in timeline.md.

### M02-05 · M02

- **Source:** Wassily Leontief, Faye Duchin, "The Impacts of Automation on Employment, 1963–2000. Final Report", New York: Institute for Economic Analysis, New York University; National Science Foundation contract PRA-8012844; April 1984, 376 pp.; ERIC ED 241 743. Tier 1: Report by economists (Leontief and Duchin, NYU Institute for Economic Analysis). Speaker as recorded: Wassily Leontief and Faye Duchin (economists).
- **Date:** 1984-04 (month). ERIC résumé: "Apr 84". Published in book form as The Future Impact of Automation on Workers (Oxford University Press, 1986; not retrieved). Chapters 4 and 5 were drafted by other members of the Institute (Howell; McDonough), per the report; the record attributes the report to Leontief and Duchin as its authors.
- **Where:** https://archive.org/details/micro_IA41153448_0031 (OCR text: https://archive.org/download/micro_IA41153448_0031/micro_IA41153448_0031_djvu.txt). Expression checked by the preparer: Internet Archive OCR text (djvu.txt) of a scanned copy, retrieved 2026-10-09 from https://dn711508.ca.archive.org/0/items/micro_IA41153448_0031/micro_IA41153448_0031_djvu.txt; OCR errors possible; quotes checked only against clean stretches. Current copy; no earlier capture compared. SHA-256 of the retrieved file `cd03df677ca1a723f843eccec0fa1415b3227d604bc83c6783a40321b9a785e9`.
- **Locator:** printed p. 5.23
- **Quote:** “Specialized software programs that can replace certain middle management tasks include computerized inventory control, production scheduling, and allocation planning for limited resources.”
- **Why checked:** Cited in timeline.md.

### M02-06 · M02

- **Source:** Wassily Leontief, Faye Duchin, "The Impacts of Automation on Employment, 1963–2000. Final Report", New York: Institute for Economic Analysis, New York University; National Science Foundation contract PRA-8012844; April 1984, 376 pp.; ERIC ED 241 743. Tier 1: Report by economists (Leontief and Duchin, NYU Institute for Economic Analysis). Speaker as recorded: Wassily Leontief and Faye Duchin (economists).
- **Date:** 1984-04 (month). ERIC résumé: "Apr 84". Published in book form as The Future Impact of Automation on Workers (Oxford University Press, 1986; not retrieved). Chapters 4 and 5 were drafted by other members of the Institute (Howell; McDonough), per the report; the record attributes the report to Leontief and Duchin as its authors.
- **Where:** https://archive.org/details/micro_IA41153448_0031 (OCR text: https://archive.org/download/micro_IA41153448_0031/micro_IA41153448_0031_djvu.txt). Expression checked by the preparer: Internet Archive OCR text (djvu.txt) of a scanned copy, retrieved 2026-10-09 from https://dn711508.ca.archive.org/0/items/micro_IA41153448_0031/micro_IA41153448_0031_djvu.txt; OCR errors possible; quotes checked only against clean stretches. Current copy; no earlier capture compared. SHA-256 of the retrieved file `cd03df677ca1a723f843eccec0fa1415b3227d604bc83c6783a40321b9a785e9`.
- **Locator:** ch. 4, 'Robotics', overview of the technology, printed pp. 4.19-4.21
- **Quote:** “industrial robots are unique in their programmability, flexibility of movement, and range of functions that allow them to perform tasks that could previously be performed only by human labor.”
- **Why checked:** Cited in timeline.md.

### M05-00 · M05

- **Source:** Wassily Leontief, "Machines and Man", Scientific American 187(3), September 1952, pp. 150–160; doi:10.1038/scientificamerican0952-150. Tier 1: Article by an economist in a magazine: tier 1 under the 2026-10-11 rule (D2 names this piece). Moved from tier 2. Only the standfirst was retrieved, and it may be editorial wording.
- **Date:** 1952-09 (month). Publisher page: "published with the title “Machines and Man” in Scientific American Magazine Vol. 187 No. 3 (September 1952), p. 150"; pages 150–160 from Crossref.
- **Where:** https://www.scientificamerican.com/article/machines-and-man/. Expression checked by the preparer: Publisher article page (paywalled): title, standfirst and bibliographic line only; the article text was not retrieved. Current copy retrieved 2026-10-09. SHA-256 of the retrieved file `f9161d3789c10d798b9d27dad8762bef7874d09449ea5dad786db5ae180ad24f`.
- **Locator:** standfirst on the publisher page
- **Quote:** “Can industry afford to buy them, and will they cause widespread technological unemployment?”
- **Why checked:** Cited in timeline.md.

### M05-09 · M05

- **Source:** Sar A. Levitan, "New Directions in Aid of the Poor (selection)", In Bowen & Mangum (eds.), Automation and Economic Progress (Prentice-Hall, 1966). Tier 1: Economist author (Sar A. Levitan; established record as a labour economist). Speaker as recorded: Sar A. Levitan, The W. E. Upjohn Institute for Employment Research (economist), selection 'New Directions in Aid of the Poor'.
- **Date:** 1966 (year). Date of the book.
- **Where:** https://archive.org/details/automationeconom00unit (OCR text: https://archive.org/download/automationeconom00unit/automationeconom00unit_djvu.txt). Expression checked by the preparer: Internet Archive OCR text (djvu.txt) of a scanned copy, retrieved 2026-10-09 from https://ia801502.us.archive.org/22/items/automationeconom00unit/automationeconom00unit_djvu.txt; OCR errors possible; quotes checked only against clean stretches. Current copy; no earlier capture compared. SHA-256 of the retrieved file `8761669727c91ecc403f4e8d6fb4b060d9c6fb47b1abbea54b63409d106329e1`.
- **Locator:** printed p. 156
- **Quote:** “Despite the gloomy forebodings of the prophets of cybernation, much of society's needed work is not being done, and the need is going to increase rather than disappear.”
- **Why checked:** Cited in timeline.md. Full substitution (M05): does a model result meet "states or models the possibility"? Do the 1955–1966 contests engage a premise or only state the contrary?

### M05-11 · M05

- **Source:** National Commission on Technology, Automation, and Economic Progress, "Technology and the American Economy: Report of the National Commission on Technology, Automation, and Economic Progress, Volume I", Washington, D.C.: U.S. Government Printing Office, February 1966, xiv + 115 pp.; ERIC ED 023 803. Tier 1: Commission report, which the rule names; the chair (Howard R. Bowen) and Robert M. Solow are economists, but most members were not (business and labour leaders, a sociologist). Borderline (README).
- **Date:** 1966-02 (month). Report dated February 1966. The chairman's introduction (pp. xi–xiv) is stated not to be part of the official report.
- **Where:** https://archive.org/details/ERIC_ED023803 (OCR text: https://archive.org/download/ERIC_ED023803/ERIC_ED023803_djvu.txt). Expression checked by the preparer: Internet Archive OCR text (djvu.txt) of a scanned copy, retrieved 2026-10-09 from https://dn790006.ca.archive.org/0/items/ERIC_ED023803/ERIC_ED023803_djvu.txt; OCR errors possible; quotes checked only against clean stretches. Current copy; no earlier capture compared. SHA-256 of the retrieved file `d23de21a0c05416f957dda13acb680f1baa77ee88e3c094966e8eaba50db637b`.
- **Locator:** printed p. 1 (Part I, ch. 1 'The Pace of Technological Change', opening paragraph)
- **Quote:** “According to one extreme view, the world … is on the verge of a glut of productivity sufficient to make our economic institutions and the notion of gainful employment obsolete. We dissent from this view.”
- **Why checked:** Cited in timeline.md. Full substitution (M05): does a model result meet "states or models the possibility"? Do the 1955–1966 contests engage a premise or only state the contrary? Voice in the 1966 Commission report: report text versus members' comments and the chairman's introduction.

### M05-12 · M05

- **Source:** National Commission on Technology, Automation, and Economic Progress, "Technology and the American Economy: Report of the National Commission on Technology, Automation, and Economic Progress, Volume I", Washington, D.C.: U.S. Government Printing Office, February 1966, xiv + 115 pp.; ERIC ED 023 803. Tier 1: Commission report, which the rule names; the chair (Howard R. Bowen) and Robert M. Solow are economists, but most members were not (business and labour leaders, a sociologist). Borderline (README).
- **Date:** 1966-02 (month). Report dated February 1966. The chairman's introduction (pp. xi–xiv) is stated not to be part of the official report.
- **Where:** https://archive.org/details/ERIC_ED023803 (OCR text: https://archive.org/download/ERIC_ED023803/ERIC_ED023803_djvu.txt). Expression checked by the preparer: Internet Archive OCR text (djvu.txt) of a scanned copy, retrieved 2026-10-09 from https://dn790006.ca.archive.org/0/items/ERIC_ED023803/ERIC_ED023803_djvu.txt; OCR errors possible; quotes checked only against clean stretches. Current copy; no earlier capture compared. SHA-256 of the retrieved file `d23de21a0c05416f957dda13acb680f1baa77ee88e3c094966e8eaba50db637b`.
- **Locator:** printed p. 9 (Part I, ch. 2)
- **Quote:** “The basic fact is that technology eliminates jobs, not work.”
- **Why checked:** Cited in timeline.md. Full substitution (M05): does a model result meet "states or models the possibility"? Do the 1955–1966 contests engage a premise or only state the contrary? Voice in the 1966 Commission report: report text versus members' comments and the chairman's introduction.

### M05-14 · M05

- **Source:** Nils J. Nilsson, "Artificial Intelligence, Employment, and Income", AI Magazine 5(2), Summer 1984. Tier 2: Non-economist author (an AI scientist at SRI) in an AI venue.
- **Date:** 1984 (year (Summer issue)). Journal page: "Vol. 5 No. 2: Summer 1984". An AI venue, outside economics.
- **Where:** https://ojs.aaai.org/aimagazine/index.php/aimagazine/article/download/433/369. Expression checked by the preparer: full text (scanned, OCR text layer). Current copy retrieved directly on 2026-10-09; no archive capture (Wayback unreachable), so earlier bytes are not authenticated. SHA-256 of the retrieved file `4dc8b541e4bd22bbc54c146a7e8c748f9f16a835d1b256e026f521c4462d3418`.
- **Locator:** pdf page 6; The Diminishing Need For Human Labor (printed p. 10)
- **Quote:** “With inexpensive AI in relentless pursuit, it seems likely that there will be few sanctuaries left where income is derived from toil.”
- **Why checked:** Cited in timeline.md. Full substitution (M05): does a model result meet "states or models the possibility"? Do the 1955–1966 contests engage a premise or only state the contrary? Nilsson (1984, tier 2) and his second-hand report of Solow.

### M06a-02 · M06a

- **Source:** Walter S. Buckingham Jr., "Statement (testifying as an economist), in Automation and Technological Change: Hearings", U.S. Congress, Joint Committee on the Economic Report, Subcommittee on Economic Stabilization. (1955). Automation and technological change: Hearings … 84th Congress, 1st session, October 14–28, 1955. Washington: U.S. Government Printing Office, pp. 29–37. Tier 1: Prepared statement by an economist ("as an economist", associate professor at Georgia Tech, shown in the text); a substantive argued statement, not short-form commentary. Congressional testimony is not named in the rule (borderline; README D2). Speaker as recorded: Walter S. Buckingham Jr., associate professor, Georgia Institute of Technology (economist).
- **Date:** 1955-10-14 (day). Hearing day of the statement, as printed; the volume was printed by the GPO in 1955.
- **Where:** https://archive.org/details/congress-automation-and-technological-change (OCR text: https://archive.org/download/congress-automation-and-technological-change/congress-automation-and-technological-change_djvu.txt). Expression checked by the preparer: Internet Archive OCR text (djvu.txt) of a scanned copy, retrieved 2026-10-09 from https://ia803102.us.archive.org/32/items/congress-automation-and-technological-change/congress-automation-and-technological-change_djvu.txt; OCR errors possible; quotes checked only against clean stretches. Current copy; no earlier capture compared. SHA-256 of the retrieved file `3962809fbb923be62bf986addb0014ee147934a8767475c1f7cfe051959bff90`.
- **Locator:** printed p. 34 (prepared statement, 'Impact of automation on the economic system')
- **Quote:** “The worker displaced is not fired. He is the one who is not hired.”
- **Why checked:** Cited in timeline.md.

### M06a-06 · M06a

- **Source:** Nils J. Nilsson, "Artificial Intelligence, Employment, and Income", AI Magazine 5(2), Summer 1984. Tier 2: Non-economist author (an AI scientist at SRI) in an AI venue.
- **Date:** 1984 (year (Summer issue)). Journal page: "Vol. 5 No. 2: Summer 1984". An AI venue, outside economics.
- **Where:** https://ojs.aaai.org/aimagazine/index.php/aimagazine/article/download/433/369. Expression checked by the preparer: full text (scanned, OCR text layer). Current copy retrieved directly on 2026-10-09; no archive capture (Wayback unreachable), so earlier bytes are not authenticated. SHA-256 of the retrieved file `4dc8b541e4bd22bbc54c146a7e8c748f9f16a835d1b256e026f521c4462d3418`.
- **Locator:** pdf page 5; The Diminishing Need For Human Labor (printed p. 9)
- **Quote:** “Therefore, the total income people earn through their labor can be expected to fall until it is a small percentage of the total income earned by people through other means.”
- **Why checked:** Cited in timeline.md. Nilsson (1984, tier 2) and his second-hand report of Solow.

### M06a-07 · M06a

- **Source:** Wassily Leontief, Faye Duchin, "The Impacts of Automation on Employment, 1963–2000. Final Report", New York: Institute for Economic Analysis, New York University; National Science Foundation contract PRA-8012844; April 1984, 376 pp.; ERIC ED 241 743. Tier 1: Report by economists (Leontief and Duchin, NYU Institute for Economic Analysis). Speaker as recorded: Wassily Leontief and Faye Duchin (economists).
- **Date:** 1984-04 (month). ERIC résumé: "Apr 84". Published in book form as The Future Impact of Automation on Workers (Oxford University Press, 1986; not retrieved). Chapters 4 and 5 were drafted by other members of the Institute (Howell; McDonough), per the report; the record attributes the report to Leontief and Duchin as its authors.
- **Where:** https://archive.org/details/micro_IA41153448_0031 (OCR text: https://archive.org/download/micro_IA41153448_0031/micro_IA41153448_0031_djvu.txt). Expression checked by the preparer: Internet Archive OCR text (djvu.txt) of a scanned copy, retrieved 2026-10-09 from https://dn711508.ca.archive.org/0/items/micro_IA41153448_0031/micro_IA41153448_0031_djvu.txt; OCR errors possible; quotes checked only against clean stretches. Current copy; no earlier capture compared. SHA-256 of the retrieved file `cd03df677ca1a723f843eccec0fa1415b3227d604bc83c6783a40321b9a785e9`.
- **Locator:** ch. 1, discussion of Tables 1.1-1.2 (printed pp. 1.14-1.20; footer markers missing in OCR)
- **Quote:** “demand for clerical workers falls to 11.5% from 17.8% in 1978.”
- **Why checked:** Cited in timeline.md.

### M06b-02 · M06b

- **Source:** Edwin G. Nourse, "Statement (former Chairman, Council of Economic Advisers), in Automation and Technological Change: Hearings", U.S. Congress, Joint Committee on the Economic Report, Subcommittee on Economic Stabilization. (1955). Automation and technological change: Hearings … 84th Congress, 1st session, October 14–28, 1955. Washington: U.S. Government Printing Office, from p. 618. Tier 1: Prepared statement by an economist (former Chairman of the Council of Economic Advisers, shown in the text); substantive argued statement. Congressional testimony is not named in the rule (borderline; README D2). Speaker as recorded: Edwin G. Nourse, former Chairman, Council of Economic Advisers (economist).
- **Date:** 1955-10-28 (day). Hearing day of the statement, as printed.
- **Where:** https://archive.org/details/congress-automation-and-technological-change (OCR text: https://archive.org/download/congress-automation-and-technological-change/congress-automation-and-technological-change_djvu.txt). Expression checked by the preparer: Internet Archive OCR text (djvu.txt) of a scanned copy, retrieved 2026-10-09 from https://ia803102.us.archive.org/32/items/congress-automation-and-technological-change/congress-automation-and-technological-change_djvu.txt; OCR errors possible; quotes checked only against clean stretches. Current copy; no earlier capture compared. SHA-256 of the retrieved file `3962809fbb923be62bf986addb0014ee147934a8767475c1f7cfe051959bff90`.
- **Locator:** printed p. 622 (statement, 'Integration of the economic process')
- **Quote:** “The smooth and beneficent assimilation of sharp and rapid technological change has to be effectuated through intelligent and even generous policies painstakingly arrived at by administrative agencies, private and public.”
- **Why checked:** Cited in timeline.md.

### M06b-05 · M06b

- **Source:** National Commission on Technology, Automation, and Economic Progress, "Technology and the American Economy: Report of the National Commission on Technology, Automation, and Economic Progress, Volume I", Washington, D.C.: U.S. Government Printing Office, February 1966, xiv + 115 pp.; ERIC ED 023 803. Tier 1: Commission report, which the rule names; the chair (Howard R. Bowen) and Robert M. Solow are economists, but most members were not (business and labour leaders, a sociologist). Borderline (README).
- **Date:** 1966-02 (month). Report dated February 1966. The chairman's introduction (pp. xi–xiv) is stated not to be part of the official report.
- **Where:** https://archive.org/details/ERIC_ED023803 (OCR text: https://archive.org/download/ERIC_ED023803/ERIC_ED023803_djvu.txt). Expression checked by the preparer: Internet Archive OCR text (djvu.txt) of a scanned copy, retrieved 2026-10-09 from https://dn790006.ca.archive.org/0/items/ERIC_ED023803/ERIC_ED023803_djvu.txt; OCR errors possible; quotes checked only against clean stretches. Current copy; no earlier capture compared. SHA-256 of the retrieved file `d23de21a0c05416f957dda13acb680f1baa77ee88e3c094966e8eaba50db637b`.
- **Locator:** printed p. 110 (recommendation 9)
- **Quote:** “Technological change and productivity are primary sources of our unprecedented wealth, but many persons have not shared in that abundance. … We recommend that economic security be guaranteed by a floor under family income.”
- **Why checked:** Cited in timeline.md. Voice in the 1966 Commission report: report text versus members' comments and the chairman's introduction.

### M06b-06 · M06b

- **Source:** National Commission on Technology, Automation, and Economic Progress, "Technology and the American Economy: Report of the National Commission on Technology, Automation, and Economic Progress, Volume I", Washington, D.C.: U.S. Government Printing Office, February 1966, xiv + 115 pp.; ERIC ED 023 803. Tier 1: Commission report, which the rule names; the chair (Howard R. Bowen) and Robert M. Solow are economists, but most members were not (business and labour leaders, a sociologist). Borderline (README).
- **Date:** 1966-02 (month). Report dated February 1966. The chairman's introduction (pp. xi–xiv) is stated not to be part of the official report.
- **Where:** https://archive.org/details/ERIC_ED023803 (OCR text: https://archive.org/download/ERIC_ED023803/ERIC_ED023803_djvu.txt). Expression checked by the preparer: Internet Archive OCR text (djvu.txt) of a scanned copy, retrieved 2026-10-09 from https://dn790006.ca.archive.org/0/items/ERIC_ED023803/ERIC_ED023803_djvu.txt; OCR errors possible; quotes checked only against clean stretches. Current copy; no earlier capture compared. SHA-256 of the retrieved file `d23de21a0c05416f957dda13acb680f1baa77ee88e3c094966e8eaba50db637b`.
- **Locator:** printed p. 39
- **Quote:** “we suggest that Congress give serious study to a “minimum income allowance” or “negative income tax” program.”
- **Why checked:** Cited in timeline.md.

### M07-02 · M07

- **Source:** Carl Benedikt Frey, Michael A. Osborne, "The Future of Employment: How Susceptible Are Jobs to Computerisation?", Oxford Martin School working paper. Tier 1: Scholarly working paper with an economist author: Frey, an economic historian at the Oxford Martin School (D2, 2026-10-11, confirmed); Osborne is an engineer.
- **Date:** 2013-09-17 (day). Title page "September 17, 2013". Journal version in Technological Forecasting and Social Change (2017) not retrieved.
- **Where:** https://oms-www.files.svdcdn.com/production/downloads/academic/The_Future_of_Employment.pdf. Expression checked by the preparer: full text (current file served by the Oxford Martin School; requested at oxfordmartin.ox.ac.uk, which redirected to this host). Current copy retrieved directly on 2026-10-09; no archive capture (Wayback unreachable), so earlier bytes are not authenticated. SHA-256 of the retrieved file `1d0ef561ebef9ececda63403a40860aa172be953fe2b050d27de8987c9e852fc`.
- **Locator:** pdf page 44; Section VI, Conclusions (printed p. 44)
- **Quote:** “According to our estimates around 47 percent of total US employment is in the high risk category. We refer to these as jobs at risk – i.e. jobs we expect could be automated relatively soon, perhaps over the next decade or two.”
- **Why checked:** Cited in timeline.md.

### M07-04 · M07

- **Source:** Tyna Eloundou, Sam Manning, Pamela Mishkin, Daniel Rock, "GPTs are GPTs: An Early Look at the Labor Market Impact Potential of Large Language Models", arXiv:2303.10130v1. Tier 1: Scholarly working paper with an economist author: Daniel Rock (D2, 2026-10-11, confirmed); the other three were at OpenAI or OpenResearch, as the paper states.
- **Date:** 2023-03-17 (day). arXiv: submitted 17 Mar 2023 (v1); last revised 21 Aug 2023 (v5). Version v1 retrieved. Not peer-reviewed in this version. The v1 PDF itself is dated 20 March 2023. A later peer-reviewed version (Science, 2024) was not retrieved.
- **Where:** https://arxiv.org/pdf/2303.10130v1. Expression checked by the preparer: full text (v1). Current copy retrieved directly on 2026-10-09; no archive capture (Wayback unreachable), so earlier bytes are not authenticated. SHA-256 of the retrieved file `f3c91bc909258b4824e2ea101a4f489aaea75d422adaf8508a79883b0d0f74bd`.
- **Locator:** pdf page 1; Abstract
- **Quote:** “Our findings indicate that approximately 80% of the U.S. workforce could have at least 10% of their work tasks affected by the introduction of GPTs, while around 19% of workers may see at least 50% of their tasks impacted.”
- **Why checked:** Cited in timeline.md.

### M08-01 · M08

- **Source:** Wassily Leontief, Faye Duchin, "The Impacts of Automation on Employment, 1963–2000. Final Report", New York: Institute for Economic Analysis, New York University; National Science Foundation contract PRA-8012844; April 1984, 376 pp.; ERIC ED 241 743. Tier 1: Report by economists (Leontief and Duchin, NYU Institute for Economic Analysis). Speaker as recorded: Wassily Leontief and Faye Duchin (economists).
- **Date:** 1984-04 (month). ERIC résumé: "Apr 84". Published in book form as The Future Impact of Automation on Workers (Oxford University Press, 1986; not retrieved). Chapters 4 and 5 were drafted by other members of the Institute (Howell; McDonough), per the report; the record attributes the report to Leontief and Duchin as its authors.
- **Where:** https://archive.org/details/micro_IA41153448_0031 (OCR text: https://archive.org/download/micro_IA41153448_0031/micro_IA41153448_0031_djvu.txt). Expression checked by the preparer: Internet Archive OCR text (djvu.txt) of a scanned copy, retrieved 2026-10-09 from https://dn711508.ca.archive.org/0/items/micro_IA41153448_0031/micro_IA41153448_0031_djvu.txt; OCR errors possible; quotes checked only against clean stretches. Current copy; no earlier capture compared. SHA-256 of the retrieved file `cd03df677ca1a723f843eccec0fa1415b3227d604bc83c6783a40321b9a785e9`.
- **Locator:** Abstract ('Findings'), unnumbered front matter
- **Quote:** “The intensive use of automation over the next twenty years will make it possible to conserve about 10% of the labor that would have been required to produce the same bills of goods in the absence of increased automation.”
- **Why checked:** Cited in timeline.md.

### M08-05 · M08

- **Source:** Daron Acemoglu, "The Simple Macroeconomics of AI", NBER Working Paper 32487. Tier 1: NBER working paper (core venue).
- **Date:** 2024-05 (month). Cover "May 2024". The economics-growth pack records an author-hosted version dated 2024-04-05.
- **Where:** https://www.nber.org/system/files/working_papers/w32487/w32487.pdf. Expression checked by the preparer: full text. Current copy retrieved directly on 2026-10-09; no archive capture (Wayback unreachable), so earlier bytes are not authenticated. SHA-256 of the retrieved file `ffb04f119539228da2db0699530425e56e815c890b6ebe7b5c932675e2eebdb0`.
- **Locator:** pdf page 45; 4 Concluding Remarks and Discussion (printed p. 43)
- **Quote:** “When the presence of hard tasks among those that will be exposed to AI is recognized, this upper bound drops to about 0.53%.”
- **Why checked:** Cited in timeline.md. Material quantitative claims (M08): figures, horizon and conditions.

### M08-06 · M08

- **Source:** Daron Acemoglu, "The Simple Macroeconomics of AI", NBER Working Paper 32487. Tier 1: NBER working paper (core venue).
- **Date:** 2024-05 (month). Cover "May 2024". The economics-growth pack records an author-hosted version dated 2024-04-05.
- **Where:** https://www.nber.org/system/files/working_papers/w32487/w32487.pdf. Expression checked by the preparer: full text. Current copy retrieved directly on 2026-10-09; no archive capture (Wayback unreachable), so earlier bytes are not authenticated. SHA-256 of the retrieved file `ffb04f119539228da2db0699530425e56e815c890b6ebe7b5c932675e2eebdb0`.
- **Locator:** pdf page 45; 4 Concluding Remarks and Discussion (printed p. 43)
- **Quote:** “the GDP boost within the next 10 years … in the range of 0.93% − 1.16% over 10 years in total, provided that the investment increase resulting from AI is modest, and in the range of 1.4% − 1.56% in total, if there is a large investment boom.”
- **Why checked:** Cited in timeline.md. Material quantitative claims (M08): figures, horizon and conditions.

### M09-04 · M09

- **Source:** Edwin Mansfield, "Technological Change: Measurement, Determinants, and Diffusion", In The Employment Impact of Technological Change, Appendix Volume II (U.S. GPO, February 1966). Tier 1: Economist author (Edwin Mansfield; established record as an economist). Speaker as recorded: Edwin Mansfield, University of Pennsylvania (economist).
- **Date:** 1966-02 (month). Date of the appendix volume.
- **Where:** https://archive.org/details/ERIC_ED022857 (OCR text: https://archive.org/download/ERIC_ED022857/ERIC_ED022857_djvu.txt). Expression checked by the preparer: Internet Archive OCR text (djvu.txt) of a scanned copy, retrieved 2026-10-09 from https://dn710704.ca.archive.org/0/items/ERIC_ED022857/ERIC_ED022857_djvu.txt; OCR errors possible; quotes checked only against clean stretches. Current copy; no earlier capture compared. SHA-256 of the retrieved file `85b1fb59b997e8cbc0f7255076a55f68008955a2b10523b375ac0ae58628572c`.
- **Locator:** Part II, sec. 8 'Has there been an increase in the rate of technological change?', printed p. II-105
- **Quote:** “It is easy to find statements by economists and others asserting that the rate of technological change in the postwar period is much more rapid than before the war”
- **Why checked:** Cited in timeline.md.

### M09-05 · M09

- **Source:** Nils J. Nilsson, "Artificial Intelligence, Employment, and Income", AI Magazine 5(2), Summer 1984. Tier 2: Non-economist author (an AI scientist at SRI) in an AI venue.
- **Date:** 1984 (year (Summer issue)). Journal page: "Vol. 5 No. 2: Summer 1984". An AI venue, outside economics.
- **Where:** https://ojs.aaai.org/aimagazine/index.php/aimagazine/article/download/433/369. Expression checked by the preparer: full text (scanned, OCR text layer). Current copy retrieved directly on 2026-10-09; no archive capture (Wayback unreachable), so earlier bytes are not authenticated. SHA-256 of the retrieved file `4dc8b541e4bd22bbc54c146a7e8c748f9f16a835d1b256e026f521c4462d3418`.
- **Locator:** pdf page 1; acknowledgements footnote (printed p. 5)
- **Quote:** “Robert Solow of MIT was quite skeptical of my premises, but conceded nevertheless that my conclusions could possibly follow from them if certain other economic conditions were satisfied.”
- **Why checked:** Cited in timeline.md. The prior itself (M09): are the 1950s–60s record and the 2012–2019 self-descriptions fairly represented? Should M09-11 hold earliest located, given its Singularity scope? Nilsson (1984, tier 2) and his second-hand report of Solow.

### M09-07 · M09

- **Source:** Wassily Leontief, Faye Duchin, "The Impacts of Automation on Employment, 1963–2000. Final Report", New York: Institute for Economic Analysis, New York University; National Science Foundation contract PRA-8012844; April 1984, 376 pp.; ERIC ED 241 743. Tier 1: Report by economists (Leontief and Duchin, NYU Institute for Economic Analysis). Speaker as recorded: Wassily Leontief and Faye Duchin (economists).
- **Date:** 1984-04 (month). ERIC résumé: "Apr 84". Published in book form as The Future Impact of Automation on Workers (Oxford University Press, 1986; not retrieved). Chapters 4 and 5 were drafted by other members of the Institute (Howell; McDonough), per the report; the record attributes the report to Leontief and Duchin as its authors.
- **Where:** https://archive.org/details/micro_IA41153448_0031 (OCR text: https://archive.org/download/micro_IA41153448_0031/micro_IA41153448_0031_djvu.txt). Expression checked by the preparer: Internet Archive OCR text (djvu.txt) of a scanned copy, retrieved 2026-10-09 from https://dn711508.ca.archive.org/0/items/micro_IA41153448_0031/micro_IA41153448_0031_djvu.txt; OCR errors possible; quotes checked only against clean stretches. Current copy; no earlier capture compared. SHA-256 of the retrieved file `cd03df677ca1a723f843eccec0fa1415b3227d604bc83c6783a40321b9a785e9`.
- **Locator:** printed p. 1.33
- **Quote:** “While it is likely to be at least twenty years before products embodying future break-throughs in areas such as automatic programming, speech recognition, or robot vision are actually adopted on a large scale, some surprises are certainly possible.”
- **Why checked:** Cited in timeline.md.

### M09-08 · M09

- **Source:** Jeffrey D. Sachs, Laurence J. Kotlikoff, "Smart Machines and Long-Term Misery", NBER Working Paper 18629. Tier 1: NBER working paper (core venue); both authors economists.
- **Date:** 2012-12 (month). Cover "December 2012". Wording attested 2013-01: The cover lists "December 2012, January 2013"; the retrieved PDF may be the January 2013 revision, so its wording is attested from 2013-01 only.
- **Where:** https://www.nber.org/system/files/working_papers/w18629/w18629.pdf. Expression checked by the preparer: full text. Current copy retrieved directly on 2026-10-09; no archive capture (Wayback unreachable), so earlier bytes are not authenticated. SHA-256 of the retrieved file `aa4958092702ecfad60c57fcdff3a76505353fccab0bcb60bda2fb1b14c0a65b`.
- **Locator:** pdf page 17; Conclusion (printed p. 16)
- **Quote:** “Even if economists have been reluctant to view machines, be they drones or microprocessors, as dangerous competitors”
- **Why checked:** Cited in timeline.md. The prior itself (M09): are the 1950s–60s record and the 2012–2019 self-descriptions fairly represented? Should M09-11 hold earliest located, given its Singularity scope?

### M09-09 · M09

- **Source:** Carl Benedikt Frey, Michael A. Osborne, "The Future of Employment: How Susceptible Are Jobs to Computerisation?", Oxford Martin School working paper. Tier 1: Scholarly working paper with an economist author: Frey, an economic historian at the Oxford Martin School (D2, 2026-10-11, confirmed); Osborne is an engineer.
- **Date:** 2013-09-17 (day). Title page "September 17, 2013". Journal version in Technological Forecasting and Social Change (2017) not retrieved.
- **Where:** https://oms-www.files.svdcdn.com/production/downloads/academic/The_Future_of_Employment.pdf. Expression checked by the preparer: full text (current file served by the Oxford Martin School; requested at oxfordmartin.ox.ac.uk, which redirected to this host). Current copy retrieved directly on 2026-10-09; no archive capture (Wayback unreachable), so earlier bytes are not authenticated. SHA-256 of the retrieved file `1d0ef561ebef9ececda63403a40860aa172be953fe2b050d27de8987c9e852fc`.
- **Locator:** pdf page 3; Introduction (printed p. 3)
- **Quote:** “To our knowledge, no study has yet quantified what recent technological progress is likely to mean for the future of employment.”
- **Why checked:** Cited in timeline.md.

### M09-27 · M09

- **Source:** Ajay Agrawal, Joshua Gans, Avi Goldfarb, "Introduction to "The Economics of Artificial Intelligence: An Agenda"", NBER volume chapter (University of Chicago Press). Tier 1: Chapter of the NBER Economics of AI volume (core venue).
- **Date:** 2019-05 (month). Chapter cover sheet: "Publication Date: May 2019"; "Conference Date: September 13–14, 2017".
- **Where:** https://www.nber.org/system/files/chapters/c14005/c14005.pdf. Expression checked by the preparer: full text. Current copy retrieved directly on 2026-10-09; no archive capture (Wayback unreachable), so earlier bytes are not authenticated. SHA-256 of the retrieved file `176dbcbd8a7e924d0f6d7506a9c04fb862a37a99ff3abe07670e7ba892a62839`.
- **Locator:** pdf page 2; Introduction, opening paragraph (printed p. 1)
- **Quote:** “Despite its importance, there is little economics research on the topic. The research that exists is derived from past technologies (such as factory robots) that capture only part of the economic reach of AI.”
- **Why checked:** Cited in timeline.md. The prior itself (M09): are the 1950s–60s record and the 2012–2019 self-descriptions fairly represented? Should M09-11 hold earliest located, given its Singularity scope?

### M09-28 · M09

- **Source:** Ajay Agrawal, Joshua Gans, Avi Goldfarb, "Introduction to "The Economics of Artificial Intelligence: An Agenda"", NBER volume chapter (University of Chicago Press). Tier 1: Chapter of the NBER Economics of AI volume (core venue).
- **Date:** 2019-05 (month). Chapter cover sheet: "Publication Date: May 2019"; "Conference Date: September 13–14, 2017".
- **Where:** https://www.nber.org/system/files/chapters/c14005/c14005.pdf. Expression checked by the preparer: full text. Current copy retrieved directly on 2026-10-09; no archive capture (Wayback unreachable), so earlier bytes are not authenticated. SHA-256 of the retrieved file `176dbcbd8a7e924d0f6d7506a9c04fb862a37a99ff3abe07670e7ba892a62839`.
- **Locator:** pdf page 2; Introduction (printed p. 1)
- **Quote:** “the National Bureau of Economic Research held its first conference on the Economics of Artificial Intelligence in September 2017 in Toronto”
- **Why checked:** Cited in timeline.md. The prior itself (M09): are the 1950s–60s record and the 2012–2019 self-descriptions fairly represented? Should M09-11 hold earliest located, given its Singularity scope?

### M01-07 · M01

- **Source:** Philip Sporn, Patrick E. Haggerty, "Comment by Mr. Sporn, joined by Mr. Haggerty, in Technology and the American Economy, Vol. I", Washington, D.C.: U.S. Government Printing Office, February 1966, xiv + 115 pp.; ERIC ED 023 803. Tier 2: Comment by two non-economist members (a utility executive and an industrialist). Speaker as recorded: Philip Sporn (utility executive; Commission member, non-economist), joined by Patrick E. Haggerty.
- **Date:** 1966-02 (month). Date of the report. A separate comment by two non-economist members (a utility executive and an industrialist), printed with the report.
- **Where:** https://archive.org/details/ERIC_ED023803 (OCR text: https://archive.org/download/ERIC_ED023803/ERIC_ED023803_djvu.txt). Expression checked by the preparer: Internet Archive OCR text (djvu.txt) of a scanned copy, retrieved 2026-10-09 from https://dn790006.ca.archive.org/0/items/ERIC_ED023803/ERIC_ED023803_djvu.txt; OCR errors possible; quotes checked only against clean stretches. Current copy; no earlier capture compared. SHA-256 of the retrieved file `d23de21a0c05416f957dda13acb680f1baa77ee88e3c094966e8eaba50db637b`.
- **Locator:** printed p. 7 (general comment on report by Mr. Sporn, joined by Mr. Haggerty)
- **Quote:** “Automation represents a logical extension of this 200-year-long history of technological progress … It does not represent a radical departure from past experience”
- **Why checked:** Voice in the 1966 Commission report: report text versus members' comments and the chairman's introduction.

### M05-04 · M05

- **Source:** Edwin G. Nourse, "Statement (former Chairman, Council of Economic Advisers), in Automation and Technological Change: Hearings", U.S. Congress, Joint Committee on the Economic Report, Subcommittee on Economic Stabilization. (1955). Automation and technological change: Hearings … 84th Congress, 1st session, October 14–28, 1955. Washington: U.S. Government Printing Office, from p. 618. Tier 1: Prepared statement by an economist (former Chairman of the Council of Economic Advisers, shown in the text); substantive argued statement. Congressional testimony is not named in the rule (borderline; README D2). Speaker as recorded: Edwin G. Nourse, former Chairman, Council of Economic Advisers (economist).
- **Date:** 1955-10-28 (day). Hearing day of the statement, as printed.
- **Where:** https://archive.org/details/congress-automation-and-technological-change (OCR text: https://archive.org/download/congress-automation-and-technological-change/congress-automation-and-technological-change_djvu.txt). Expression checked by the preparer: Internet Archive OCR text (djvu.txt) of a scanned copy, retrieved 2026-10-09 from https://ia803102.us.archive.org/32/items/congress-automation-and-technological-change/congress-automation-and-technological-change_djvu.txt; OCR errors possible; quotes checked only against clean stretches. Current copy; no earlier capture compared. SHA-256 of the retrieved file `3962809fbb923be62bf986addb0014ee147934a8767475c1f7cfe051959bff90`.
- **Locator:** printed p. 620 (statement, 'From technology to economics')
- **Quote:** “As a long-run prospect, I believe we are justified in accepting this evaluation.”
- **Why checked:** Full substitution (M05): does a model result meet "states or models the possibility"? Do the 1955–1966 contests engage a premise or only state the contrary?

### M05-07 · M05

- **Source:** Paul Armer, "Computer Aspects of Technological Change (selection)", In Bowen & Mangum (eds.), Automation and Economic Progress (Prentice-Hall, 1966). Tier 2: Non-economist author (computer specialist, RAND Corporation). Speaker as recorded: Paul Armer, The RAND Corporation (non-economist).
- **Date:** 1966 (year). Date of the book; Armer (RAND Corporation) is a computer specialist, not an economist.
- **Where:** https://archive.org/details/automationeconom00unit (OCR text: https://archive.org/download/automationeconom00unit/automationeconom00unit_djvu.txt). Expression checked by the preparer: Internet Archive OCR text (djvu.txt) of a scanned copy, retrieved 2026-10-09 from https://ia801502.us.archive.org/22/items/automationeconom00unit/automationeconom00unit_djvu.txt; OCR errors possible; quotes checked only against clean stretches. Current copy; no earlier capture compared. SHA-256 of the retrieved file `8761669727c91ecc403f4e8d6fb4b060d9c6fb47b1abbea54b63409d106329e1`.
- **Locator:** printed p. 82 ('Computer Aspects of Technological Change')
- **Quote:** “Rather, I believe that although computers and automation will contribute to a somewhat accelerated rise in productivity, full employment can be maintained.”
- **Why checked:** Full substitution (M05): does a model result meet "states or models the possibility"? Do the 1955–1966 contests engage a premise or only state the contrary?

### M05-17 · M05

- **Source:** David H. Autor, "Why Are There Still So Many Jobs? The History and Future of Workplace Automation", Journal of Economic Perspectives 29(3), Summer 2015, pp. 3–30. Tier 1: JEP (core venue).
- **Date:** 2015 (year (Summer issue)). AEA article page: vol. 29, no. 3, Summer 2015.
- **Where:** https://www.aeaweb.org/articles?id=10.1257/jep.29.3.3. Expression checked by the preparer: abstract page only (full-text PDF refused, HTTP 403). Current copy retrieved directly on 2026-10-09; no archive capture (Wayback unreachable), so earlier bytes are not authenticated. SHA-256 of the retrieved file `faa6a9976b49be8beb09c2cb4b16ea37795a78fa86301a46698515b3a7f79897`.
- **Locator:** AEA article page, Abstract (JEP 29(3), Summer 2015, pp. 3-30)
- **Quote:** “I argue that the interplay between machine and human comparative advantage allows computers to substitute for workers in performing routine, codifiable tasks while amplifying the comparative advantage of workers in supplying problem-solving skills, adaptability, and creativity.”
- **Why checked:** Full substitution (M05): does a model result meet "states or models the possibility"? Do the 1955–1966 contests engage a premise or only state the contrary?

### M05-20 · M05

- **Source:** Daron Acemoglu, Pascual Restrepo, "The Race Between Machine and Man: Implications of Technology for Growth, Factor Shares and Employment", NBER Working Paper 22252. Tier 1: NBER working paper (core venue).
- **Date:** 2016-05 (month). Cover "May 2016, Revised June 2017". Journal version: AER 108(6), 2018, pp. 1488–1542 (abstract page aer2018-ar). Wording attested 2017-06: Revision date on the cover of the retrieved PDF; the May 2016 wording was not retrieved.
- **Where:** https://www.nber.org/system/files/working_papers/w22252/w22252.pdf. Expression checked by the preparer: full text (revised version). Current copy retrieved directly on 2026-10-09; no archive capture (Wayback unreachable), so earlier bytes are not authenticated. SHA-256 of the retrieved file `441d01202afd56ef8002fc24ffc2beb51191741c0b5accb11d2534620dd616b7`.
- **Locator:** pdf page 38; section 6 Conclusion (printed p. 36)
- **Quote:** “If in the long run capital is very cheap relative to labor, automation technologies will advance rapidly and labor will become redundant.”
- **Why checked:** Model scenario under M05 (decision D3): flagged and context-only. Full substitution (M05): does a model result meet "states or models the possibility"? Do the 1955–1966 contests engage a premise or only state the contrary?

### M05-22 · M05

- **Source:** Philippe Aghion, Benjamin F. Jones, Charles I. Jones, "Artificial Intelligence and Economic Growth", NBER Working Paper 23928. Tier 1: NBER working paper (core venue).
- **Date:** 2017-10 (month). Cover "October 2017". Chapter in the NBER Economics of AI volume (2019).
- **Where:** https://www.nber.org/system/files/working_papers/w23928/w23928.pdf. Expression checked by the preparer: full text. Current copy retrieved directly on 2026-10-09; no archive capture (Wayback unreachable), so earlier bytes are not authenticated. SHA-256 of the retrieved file `a8e68273c738c80fe565afa60bc27ec5e8aaf3135011a0f760233896f1f2100c`.
- **Locator:** pdf page 22; section 4.1 Examples of Technological Singularities
- **Quote:** “The first two examples take our previous models to the extreme and consider what happens if everything can be automated — that is, if people can be replaced by A.I. in all tasks.”
- **Why checked:** Model scenario under M05 (decision D3): flagged and context-only. Full substitution (M05): does a model result meet "states or models the possibility"? Do the 1955–1966 contests engage a premise or only state the contrary?

### M05-24 · M05

- **Source:** Anton Korinek, Joseph E. Stiglitz, "Artificial Intelligence and Its Implications for Income Distribution and Unemployment", NBER Working Paper 24174. Tier 1: NBER working paper (core venue).
- **Date:** 2017-12 (month). Cover "December 2017". Chapter in the NBER volume (2019).
- **Where:** https://www.nber.org/system/files/working_papers/w24174/w24174.pdf. Expression checked by the preparer: full text. Current copy retrieved directly on 2026-10-09; no archive capture (Wayback unreachable), so earlier bytes are not authenticated. SHA-256 of the retrieved file `aeddf962b5c488cae68b7d48cef964de22379c78e75579c5793f0df71d5e9f40`.
- **Locator:** pdf page 26; section 4 (model of worker-replacing technological change)
- **Quote:** “We identify a singularity point at which it becomes cost‐effective for machines to start to fully replace human labor.”
- **Why checked:** Model scenario under M05 (decision D3): flagged and context-only. Full substitution (M05): does a model result meet "states or models the possibility"? Do the 1955–1966 contests engage a premise or only state the contrary?

### M05-28 · M05

- **Source:** Manuel Trajtenberg, "AI as the Next GPT: A Political-Economy Perspective", NBER Working Paper 24245. Tier 1: NBER working paper (core venue).
- **Date:** 2018-01 (month). Cover "January 2018". Chapter in the NBER volume (2019).
- **Where:** https://www.nber.org/system/files/working_papers/w24245/w24245.pdf. Expression checked by the preparer: full text. Current copy retrieved directly on 2026-10-09; no archive capture (Wayback unreachable), so earlier bytes are not authenticated. SHA-256 of the retrieved file `fcc578fb79e149e50183e25dd5eb69c0bc8a8497ba78fbc417a6e00efe9a4210`.
- **Locator:** pdf page 12; section 4 Concluding remarks
- **Quote:** “with AI quite poised to emerge as the new GPT, we should not necessarily envision a future whereby humans will be rendered obsolete, and mass unemployment will be the "new normal."”
- **Why checked:** Full substitution (M05): does a model result meet "states or models the possibility"? Do the 1955–1966 contests engage a premise or only state the contrary?

### M05-29 · M05

- **Source:** Daron Acemoglu, Pascual Restrepo, "The Race between Man and Machine: Implications of Technology for Growth, Factor Shares, and Employment", American Economic Review 108(6), 2018, pp. 1488–1542. Tier 1: AER (core venue).
- **Date:** 2018-06 (month). AEA article page.
- **Where:** https://www.aeaweb.org/articles?id=10.1257/aer.20160696. Expression checked by the preparer: abstract page only. Current copy retrieved directly on 2026-10-09; no archive capture (Wayback unreachable), so earlier bytes are not authenticated. SHA-256 of the retrieved file `ec349902ff22b013972448a3868cda67441112008727c5df0772aee87639ae4b`.
- **Locator:** pdf page 1; abstract
- **Quote:** “If the long-run rental rate of capital relative to the wage is sufficiently low, the long-run equilibrium involves automation of all tasks.”
- **Why checked:** Model scenario under M05 (decision D3): flagged and context-only. Full substitution (M05): does a model result meet "states or models the possibility"? Do the 1955–1966 contests engage a premise or only state the contrary?

### M05-36 · M05

- **Source:** Betsey Stevenson, "Artificial Intelligence, Income, Employment, and Meaning", NBER volume chapter. Tier 1: Chapter of the NBER Economics of AI volume (core venue).
- **Date:** 2019-05 (month). Chapter cover sheet: "Publication Date: May 2019".
- **Where:** https://www.nber.org/system/files/chapters/c14026/c14026.pdf. Expression checked by the preparer: full text. Current copy retrieved directly on 2026-10-09; no archive capture (Wayback unreachable), so earlier bytes are not authenticated. SHA-256 of the retrieved file `8594f8c92d1eca658f19a7b1e5ab4e41b1e08a5cf9c1c0d7489d11733e6db2b1`.
- **Locator:** pdf page 4; 7.3 What Will We Do with Ourselves? (printed p. 191)
- **Quote:** “In the long run, technological change leads to prosperity and new jobs arise as we adjust to our new wealth, develop new skills, and come up with new ways to use human skills. In the short run, however, there is often a disruption.”
- **Why checked:** Full substitution (M05): does a model result meet "states or models the possibility"? Do the 1955–1966 contests engage a premise or only state the contrary?

### M05-37 · M05

- **Source:** Jason Furman, "Should We Be Reassured If Automation in the Future Looks Like Automation in the Past?", NBER volume chapter. Tier 1: Chapter of the NBER Economics of AI volume (core venue).
- **Date:** 2019-05 (month). Chapter cover sheet: "Publication Date: May 2019".
- **Where:** https://www.nber.org/system/files/chapters/c14031/c14031.pdf. Expression checked by the preparer: full text. Current copy retrieved directly on 2026-10-09; no archive capture (Wayback unreachable), so earlier bytes are not authenticated. SHA-256 of the retrieved file `a43ecf48d5ec6131dfc002acab3d7df32dffb90bb9b7e41c30c470e14e6e68f6`.
- **Locator:** pdf page 9; 12.3 (printed p. 324)
- **Quote:** “The concern is not that robots will take human jobs and render humans unemployable. The traditional economic arguments against that are borne out by centuries of experience.”
- **Why checked:** Full substitution (M05): does a model result meet "states or models the possibility"? Do the 1955–1966 contests engage a premise or only state the contrary?

### M05-41 · M05

- **Source:** William D. Nordhaus, "Are We Approaching an Economic Singularity? Information Technology and the Future of Economic Growth", NBER Working Paper 21547. Tier 1: NBER working paper (core venue); Nordhaus an economist.
- **Date:** 2015-09 (month). Cover "September 2015".
- **Where:** https://www.nber.org/system/files/working_papers/w21547/w21547.pdf. Expression checked by the preparer: full text. Current copy retrieved directly on 2026-10-09; no archive capture (Wayback unreachable), so earlier bytes are not authenticated. SHA-256 of the retrieved file `cb481e5e99ef9bad8575d9150bcc8464eda4904722cc5048389ab6159858b062`.
- **Locator:** pdf page 9
- **Quote:** “He wrote, "I believe that, in our time, computers will be able to do anything a man can do." (p. xii-xiii)”
- **Why checked:** Full substitution (M05): does a model result meet "states or models the possibility"? Do the 1955–1966 contests engage a premise or only state the contrary?

### M05-42 · M05

- **Source:** William D. Nordhaus, "Are We Approaching an Economic Singularity? Information Technology and the Future of Economic Growth", NBER Working Paper 21547. Tier 1: NBER working paper (core venue); Nordhaus an economist.
- **Date:** 2015-09 (month). Cover "September 2015".
- **Where:** https://www.nber.org/system/files/working_papers/w21547/w21547.pdf. Expression checked by the preparer: full text. Current copy retrieved directly on 2026-10-09; no archive capture (Wayback unreachable), so earlier bytes are not authenticated. SHA-256 of the retrieved file `cb481e5e99ef9bad8575d9150bcc8464eda4904722cc5048389ab6159858b062`.
- **Locator:** pdf page 9
- **Quote:** “holding that "computers and automation will contribute to a continuing, but not greatly accelerated, rise in productivity." (p. xiii)”
- **Why checked:** Full substitution (M05): does a model result meet "states or models the possibility"? Do the 1955–1966 contests engage a premise or only state the contrary?

### M09-30 · M09

- **Source:** Ajay Agrawal, Joshua Gans, Avi Goldfarb, "Introduction to "The Economics of Artificial Intelligence: An Agenda"", NBER volume chapter (University of Chicago Press). Tier 1: Chapter of the NBER Economics of AI volume (core venue).
- **Date:** 2019-05 (month). Chapter cover sheet: "Publication Date: May 2019"; "Conference Date: September 13–14, 2017".
- **Where:** https://www.nber.org/system/files/chapters/c14005/c14005.pdf. Expression checked by the preparer: full text. Current copy retrieved directly on 2026-10-09; no archive capture (Wayback unreachable), so earlier bytes are not authenticated. SHA-256 of the retrieved file `176dbcbd8a7e924d0f6d7506a9c04fb862a37a99ff3abe07670e7ba892a62839`.
- **Locator:** pdf page 19; The Future of Research on the Economics of Artificial Intelligence, final paragraph (printed p. 18)
- **Quote:** “This book highlights the questions and provides direction. We hope readers of this book take it as a starting point for their own research into this new and exciting area of study.”
- **Why checked:** The prior itself (M09): are the 1950s–60s record and the 2012–2019 self-descriptions fairly represented? Should M09-11 hold earliest located, given its Singularity scope?

### M09-35 · M09

- **Source:** William D. Nordhaus, "Are We Approaching an Economic Singularity? Information Technology and the Future of Economic Growth", NBER Working Paper 21547. Tier 1: NBER working paper (core venue); Nordhaus an economist.
- **Date:** 2015-09 (month). Cover "September 2015".
- **Where:** https://www.nber.org/system/files/working_papers/w21547/w21547.pdf. Expression checked by the preparer: full text. Current copy retrieved directly on 2026-10-09; no archive capture (Wayback unreachable), so earlier bytes are not authenticated. SHA-256 of the retrieved file `cb481e5e99ef9bad8575d9150bcc8464eda4904722cc5048389ab6159858b062`.
- **Locator:** pdf page 9; section on the history of the accelerationist debate
- **Quote:** “One of the most impressive attempts to deal with the macroeconomic implications of computerization was Herbert Simon in "The Shape of Automation" (1965).”
- **Why checked:** The prior itself (M09): are the 1950s–60s record and the 2012–2019 self-descriptions fairly represented? Should M09-11 hold earliest located, given its Singularity scope?

## Kansantaloudellinen aikakauskirja items

These come from a crawl of the Finnish Economic Association's archive (kak.md). Check bibliographic data, the quotation (Finnish, from the PDF text layer), and the class: subject-AI, subject-automation, subject-computers, passing, or method-ML (machine learning as an estimation method). Two of these are the earliest located texts of their class in the crawl; two are borderline classifications.

### KAK-2-1963-paukku

- **Text:** Leo Paukkunen, "Review of Ingeniörsvetenskapsakademiens automationskommitté (IVA), Automationen ur teknisk och social synpunkt (Stockholm 1961)", Kansantaloudellinen aikakauskirja 2/1963, printed pp. 155-158 (pdf 63-66); type as recorded: review.
- **Where:** https://www.taloustieteellinenyhdistys.fi/images/stories/kak/kak1963/KAK21963.pdf (SHA-256 `90b8fc6dada722ff30eaf8aefd87117afb3f8b5ec67550f96790b375899aba46`, retrieved 2026-10-09).
- **Quote:** “automaation aiheuttamat työvoimapulmat niinkään paljon koske työttömyyttä kuin yleensä uskotaan, vaan ennen muuta valmiutta sopeutua kysynnän vaihteluihin” (printed p. 158 (pdf page 66))

### KAK-2-1988-hautam

- **Text:** Antti Hautamäki, Matti Mäkelin and Ari Vepsäläinen, "Asiantuntijajärjestelmien taloudelliset sovellukset", Kansantaloudellinen aikakauskirja 2/1988, printed pp. 186-190 (pdf 92-96); type as recorded: article.
- **Where:** https://www.taloustieteellinenyhdistys.fi/images/stories/kak/kak1988/KAK21988.pdf (SHA-256 `15287c29b31f9d419c9fb75dcfef09d15ba67d2b1079e9707da8d0a0ed7de1d0`, retrieved 2026-10-09).
- **Quote:** “tutkijoiden perustamat amerikkalaiset tekoäly-yhtiöt ovat kompastuneet siihen, että ne eivät ymmärtäneet asiakkaiden tarpeita.” (printed p. 188 (pdf page 94))

### KAK-3-1994-loikka

- **Text:** Torsti Loikkanen, "Teknologian diffuusiolle näkyvämpi rooli taloutemme selviytymistrategiassa (review of Vuori & Ylä-Anttila (eds.), Mastering Technology Diffusion - The Finnish Experience, ETLA 1992)", Kansantaloudellinen aikakauskirja 3/1994, printed pp. 407-411 (pdf 1-5); type as recorded: review.
- **Where:** https://www.taloustieteellinenyhdistys.fi/images/stories/kak/KAK31994/KAK31994Loikkanen.pdf (SHA-256 `59259ad8a9c5795b9bc165071572de52866d5a57f68369b5a657b33505dc5165`, retrieved 2026-10-09).
- **Quote:** “Kai Husso tarkastelee tekoälyn diffuusiota Suomeen” (printed p. 410 (pdf page 4))

### KAK-2-2020-tanska

- **Text:** Antti J. Tanskanen, "Työllisyysvaikutuksien arviointia tekoälyllä: Unelmoivatko robotit ansiosidonnaisesta sosiaaliturvasta?", Kansantaloudellinen aikakauskirja 2/2020, printed pp. 292-321 (pdf 1-30); type as recorded: article.
- **Where:** https://www.taloustieteellinenyhdistys.fi/wp-content/uploads/2020/06/KAK_2_2020_WEB-94-123.pdf (SHA-256 `ad0fc36c38bc0ceef7fd302e3f90615fda2e6041be3f3d961b2a8e43e6395728`, retrieved 2026-10-09).
- **Quote:** “Julkisuudessa termit tekoäly ja robotti on usein määritelty melko epämääräisesti. Tekoälyä paremmin määritelty termi on koneoppiminen,” (pdf page 2)

## Specific questions

- **M05:** the pack counts model scenarios (Nordhaus 2015; Acemoglu and Restrepo; Aghion, Jones and Jones; Korinek and Stiglitz) as articulating M05, flagged "model scenario" and context-only (maintainer decision D3). Does each passage meet "states or models the possibility"? Every tier-1 articulation is a scenario, so the M05 earliest-located role (M05-18) rests on one. Is any earlier tier-1 text in scope an own-voice statement of M05? (Simon 1965 is relayed by Nordhaus and Armer but was not retrieved.)
- **M01:** Nourse (28 October 1955) rejects "just more mechanization" as technology yet sees no "specific economic problem of automation". Are M01-04 (contests) and M01-05 (articulates) both fair readings of one statement?
- **M09:** is any passage here a fair statement that economists engaged with machine intelligence "only recently"? Does the 1955–1984 record (hearings, Commission, Simon as relayed by Nordhaus, Leontief and Duchin) qualify it? Name any economist text before 2012 within the searched venues that treats machine intelligence as a distinct subject.
- **M08:** check 0.66%, 0.53% and the GDP ranges against the NBER text, and whether the later journal version changes them.
- **Commission:** which sentences are report text and which are members' comments or the chairman's introduction?
- **KAK:** is Hautamäki, Mäkelin and Vepsäläinen (2/1988) about AI as an economic subject? Should Loikkanen (3/1994) be subject-AI and Tanskanen (2/2020) subject-AI rather than method-ML?
- **Timeline:** for each row of `timeline.md` that cites a passage here, is the row's wording supported?
- **Searches:** report any earlier text that would meet a criterion within the searched venues as a lead, separately from disagreements.

## Timeline statements

- **Earliest tier-1 text on machines and employment:** Leontief, "Machines and Man", Scientific American, September 1952 (tier 1 since 2026-10-11). Is the standfirst (M05-00) Leontief's wording or the editors'? Does the article address automatic control and unemployment?
- **Earliest tier-1 text with the author's own checked wording:** Buckingham's statement of 14 October 1955. Is there an earlier economist's text in the hearings volume or the searched venues?
- **1931 JPE review titled "Robots or Men?"** (doi:10.1086/254189): does "robots" refer to machines or to workers? The timeline does not count it as engagement until read.
- **Sachs and Kotlikoff (NBER w18629)** as the earliest NBER title with a machine-intelligence term in the census, and the per-journal earliest titles (2015–2025 rows): spot-check two against Crossref.

## Tier questions

- **Congressional testimony** (Buckingham, Nourse, 1955): the rule names commission reports but not testimony. The pack treats a prepared statement by an economist as tier 1. Agree?
- **Newhouse (1966):** tier 1 by an established record as an economist (economics degrees, Harvard), although the 1966 text shows only the byline "Harvard University". Agree?
- **ETLA Brief 22 (2014):** a six-page research brief by two economists, treated as tier 1, not short-form commentary. Agree?
