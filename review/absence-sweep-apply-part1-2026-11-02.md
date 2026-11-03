# Textual absence-claims sweep, part 1: corrections applied, 2026-11-02

Applies part 1 of the Codex sweep of textual absence claims, brought in
unchanged and renamed with a `-part1` suffix so that the final report can
arrive without a conflict:
[`review/absence-claims-sweep-2026-11-02-part1.md`](absence-claims-sweep-2026-11-02-part1.md)
(and `.json`; branch `codex/absence-claims-sweep` at f8e00f7). The sweep is
incomplete: 216 of 344 in-scope records checked (172 absence holds, 15
absence fails, 26 scope issue, 3 unverifiable), 128 pending, 21 excluded by
the maintainer (`aib-`, `ab-`).

Branch `absence-sweep-apply-1` from `main` at 292faf5 (v0.26.1), following
`docs/briefs/08-absence-sweep-apply.md` as amended by the task of
2026-11-02: only the checked "fails" and "scope issue" records are applied;
pending and unverifiable records and every `aib-`/`ab-` record are left
alone. Release **v0.26.2** (patch): corrections within existing collections;
schema unchanged (2.29). Prepared by Claude; the sweep is the cross-family
(OpenAI) check.

## What was applied

All 41 flagged records were read against the stored data.

- **39 corrected.** Each qualification, time note or `missing` text that
  stated an absence the sweep contradicted, or generalised a passage-level
  limit to the whole text, now states what the source supports, with the
  sweep's passage and locator. Limits on known methods stay limits ("no
  separate treatment of computers was located", "the technical sections were
  not read line by line").
- **2 already corrected in v0.26.1.** The sweep read the v0.26.0 baseline
  (4627aa9). `yk-y11-sl4-2000-10-03-yudkowsky-0010-0125-c` (record 85) and
  `rd-r06-pinker-2018-popsci-fear-robots` (record 220) were fixed by the
  cross-family audit sample (items 119 and 80); their current text already
  says what the sweep proposes. No change.
- **No earliest located role withdrawn.** Four flagged records hold one
  (`ts-a1-good-1965`, `ts-c1-weizenbaum-1966`, `ts-a6-vinge-1993`,
  `cpo-orb-oc1-lumen-2024`). The sweep finds each still meets its
  criterion, and the corrections remove no passage the role rests on; for
  Vinge (A6) the correction adds support. No `underRecheck` entry is needed.

Each corrected record's first evidence item (for Weizenbaum, the Discussion
passage) has `checkedAt` 2026-11-02 and a note sentence naming the sweep
record and this file, and saying whether this session re-read the passage.

## Re-read on 2026-11-02

This session retrieved the source directly and found the sweep's passage for
records 17 (Minsky), 18 (Good), 21 (Weizenbaum), 38 and 40 (Vinge), 88, 109
and 110 (Yudkowsky messages), 138 (Autor abstract), 145 (Stevenson), 201
(Miller et al.), 211 (Belrose and Pope), 216 and 229 (Altman) and 230
(Dafoe and Russell). For the others it took the passage and locator from the
sweep. Moravec 1979 failed (the author's host failed TLS verification and the
archive capture reset the connection); Bostrom's page returned 406.

## Before → after (summary)

| Rec. | Record                                                                   | Before (the absence)                                                               | After                                                                                                                                              |
| ---- | ------------------------------------------------------------------------ | ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| 6    | `ts-b2-erewhon-1872-context`                                             | the machines act only through people                                               | as yet receive impressions through human senses (ch. XXI, pp. 196–197); the treatise goes on to machines that hear directly and develop a language |
| 11   | `ts-a4-turing-c1951-context`                                             | No transition period is stated                                                     | "would not take long"; no duration for the transition                                                                                              |
| 12   | `ts-a4-turing-1951-context`                                              | No timescale is given (and a paraphrase "without saying how quickly")              | no duration for the transition; end-of-century and "within the next millennium" horizons; the evidence paraphrase narrowed the same way            |
| 14   | `ts-a3-dartmouth-1955-context`                                           | No mechanism is given                                                              | no mechanism for improving the improvement process; the attached statements describe learning and internal models                                  |
| 17   | `ts-a3-minsky-1961-context`                                              | not recursive self-improvement                                                     | section IV-D's GPS "bootstrapping" quoted; whether it meets A3 is not assessed                                                                     |
| 18   | `ts-a1-good-1965`                                                        | gives no timescale and says nothing about concealment                              | no duration for the explosion; "more probable than not … within the twentieth century"; concealment limited to the sections read                   |
| 21   | `ts-c1-weizenbaum-1966`                                                  | the article proposes no test                                                       | proposes credibility experiments and a test of understanding (drawing valid conclusions)                                                           |
| 22   | `ts-a1-moravec-1979`                                                     | does not describe a runaway beyond human level                                     | section 5: successive smarter generations, human equivalence no upper bound                                                                        |
| 26   | `ts-a4-drexler-1986-context`                                             | No transition period is given                                                      | "in a brief time"; no duration for an AI capability transition                                                                                     |
| 31   | `ts-a1-moravec-1989-context`                                             | No mechanism is given                                                              | components created, tested, added and deleted; no derivation of acceleration                                                                       |
| 38   | `ts-a5-vinge-1993`                                                       | creating entities not specified further                                            | this paragraph only; the paper names four routes                                                                                                   |
| 40   | `ts-a6-vinge-1993`                                                       | names no first-mover advantage                                                     | p. 15: forbidding automation "merely assures that someone else will get them first"                                                                |
| 46   | `ts-a4-hanson-1994-context`                                              | no takeoff period                                                                  | discusses how sudden; no duration                                                                                                                  |
| 47   | `ts-a4-miller-1995-context`                                              | does not tie the singularity to AI                                                 | forecasts place AI and uploads in the cluster; no AI takeoff duration                                                                              |
| 67   | `ts-b5-loosemore-2015-contests` (time note)                              | the API returns no author account                                                  | on 2026-11-02 the API returned an account identifier; an earlier null response is not reproduced                                                   |
| 88   | `yk-y11-extropians-1999-08-03-yudkowsky-1487-c`                          | the quoted paragraph concerns only takeoff speed                                   | it also says containment is useless while the Transcendee cannot be kept slow                                                                      |
| 100  | `yk-y20-staring-into-the-singularity-b`                                  | Not the later "risk is real but not Terminator" argument                           | the paragraph allows "an engineering risk"; its conclusion stays reassuring                                                                        |
| 101  | `yk-y20-ai-positive-negative-factor-global-risk-b`                       | does not address hatred or rebellion as such                                       | the cited paragraph does not; section 10 describes harm without hatred                                                                             |
| 106  | `yk-y24-ai-positive-negative-factor-global-risk-b`                       | this is not an argument for racing                                                 | a conditional claim about the order of development, with no guarantee of control                                                                   |
| 109  | `yk-y24-sl4-2002-05-03-yudkowsky-0205-3551-a`                            | does not state that racing to be first improves the outcome                        | proposal to finish first is limited to propaganda projects; no general claim                                                                       |
| 110  | `yk-y24-extropians-2000-09-29-yudkowsky-6080-a`                          | does not state … racing to be first improves the outcome                           | proposes trying to be first as a way to affect the situation; no claim that being first improves the outcome whoever builds                        |
| 113  | `yk-y28-lw-2022-six-dimensions-of-operational-adequacy-in-c`             | does not refute the premise that the most advanced projects are the most competent | separates resource advantage from alignment mindset and compares projects on each                                                                  |
| 128  | `ec-g05-clancy-besiroglu-2023-great-inflection-c`                        | says only that regulation is plausible but uncertain                               | adds training costs, enforcement, incentives to bypass, political effects                                                                          |
| 133  | `ec-m01-nourse-1955-automation-hearings-statement-b`                     | reports a view the author does not state as their own                              | summarises the witnesses' account; p. 620 accepts the long-run evaluation; pp. 621–622 adjustment and policy                                       |
| 134  | `ec-m01-technology-and-the-american-economy-1966-b`                      | puts the computer on a par with earlier technologies                               | declines to judge; does not put them on a par                                                                                                      |
| 135  | `ec-m01-mansfield-1966-technological-change-b`                           | automation only through the acceleration question                                  | also the "Detroit automation" example (p. II-100); no separate treatment of computers located                                                      |
| 138  | `ec-m02-autor-2015-why-are-there-still-so-many-jobs-a`                   | abstract does not say whether applied to AI                                        | abstract names AI and robotics for the final section; the article was not read                                                                     |
| 145  | `ec-m06b-stevenson-2019-ai-income-employment-meaning-b`                  | closes without naming instruments                                                  | existing redistribution examples (p. 193); closing funding question (p. 195); no redistribution design                                             |
| 148  | `ec-m01-bresnahan-brynjolfsson-hitt-1999-…-a` (time note, qualification) | PDF has no NBER cover page; about IT, not AI                                       | cover and abstract sheet are scanned pages without text; one AI mention (p. 11), formal inputs labour, IT, other capital                           |
| 149  | `ec-m09-bresnahan-brynjolfsson-hitt-1999-…-b` (time note)                | PDF has no NBER cover page                                                         | as record 148                                                                                                                                      |
| 162  | `ec-e04-korinek-stiglitz-2017-ai-income-distribution-b`                  | do not analyse developer incentives in detail                                      | pp. 19–21 analyse innovators' returns, contestability, patents, taxation; not incentives to invest in safety                                       |
| 166  | `ec-e05-hyytinen-2017-kak-editorial-b`                                   | says nothing about the state of economics on the topic                             | names earlier discussions (fn. 3); does not assess how far economics engaged                                                                       |
| 172  | `cpo-orb-oc1-lumen-2024`                                                 | 1978 solar-power literature                                                        | the publisher's abstract of one 1978 paper; full paper not inspected                                                                               |
| 201  | `rd-r01-miller-yampolskiy-haggstrom-2020-agi-modifying-utility`          | does not dispute the Omohundro–Bostrom account                                     | reasons with it but argues competition can defeat goal preservation; examples readable against goal integrity (p. 4)                               |
| 211  | `rd-r03-belrose-pope-2024-counting-arguments`                            | does not report evidence about trained systems' goals                              | draws on empirical training and generalisation results; does not measure hidden goals                                                              |
| 216  | `rd-a4-altman-2015-machine-intelligence-part-1`                          | names no period                                                                    | no duration for the transition; ten-or-hundred-year arrival, forty-year look ahead                                                                 |
| 229  | `rd-r08-altman-2015-machine-intelligence-part-1`                         | without a technical argument                                                       | a qualitative argument (fitness functions, survival subgoal, resources); no formal model                                                           |
| 230  | `rd-r08-dafoe-russell-2016-yes-we-are-worried`                           | names no route to extinction                                                       | names a general route; works through no scenario                                                                                                   |
| 237  | `rd-r09-bostrom-2002-existential-risks`                                  | conceivable, not likely                                                            | no separate probability; the shriek scenarios together given substantial probability                                                               |

The exact old and new values are in
[`review/absence-sweep-apply-1-2026-11-02.json`](absence-sweep-apply-1-2026-11-02.json).

## Where this record departs from the sweep's wording

The drafting family does not overrule the checker on a headline; none of
these touches one.

- **Record 17, Minsky 1961.** The sweep's proposed sentence is an instruction
  ("Assess that specific proposal against A3's requirement…"), not record
  text. The record quotes the GPS bootstrapping passage and says the A3
  assessment is not made here.
- **Record 133, Nourse.** The sweep's wording presents "electronic control as
  a development within mechanization" as Nourse's description. Its passage
  supports only that p. 620 accepts the long-run evaluation. The record now
  says the p. 618 passage summarises the witnesses' account (not "a view the
  author does not state as his own") and adds p. 620 and pp. 621–622.
- **Records 109 and 110.** The sweep reads "beat them to the punch" and "try
  to _be_ the first" as a development-order strategy. The records keep the
  narrower absence, which the sweep also accepts: no general claim that being
  first improves the outcome, whoever builds.
- **Record 12, Turing 1951.** The labelled evidence paraphrase had the same
  error as the qualification ("without saying how quickly"); it is narrowed to
  the transition's duration. The sweep selected only the qualification and time
  note.

## Leads for the maintainer (not acted on)

- **A3 re-check.** Minsky 1961 (section IV-D) quotes GPS self-application as
  "bootstrapping", "old and familiar", and credits Newell, Shaw and Simon
  (his reference [15]) with "perhaps the first specific proposal". A3's
  earliest located headline is under re-check; these texts belong in it.
- **Y20.** AIPNFGR's section 10 sentence that the AI "does not hate you" could
  be recorded as contesting Y20 (draft of 2006). Y20's earliest located
  contesting text is of 1999, so no headline would change.

## Correction note (every changed record)

- **Claims changed (39):** `ts-b2-erewhon-1872-context`,
  `ts-a4-turing-c1951-context`, `ts-a4-turing-1951-context`,
  `ts-a3-dartmouth-1955-context`, `ts-a3-minsky-1961-context`,
  `ts-a1-good-1965`, `ts-c1-weizenbaum-1966`, `ts-a1-moravec-1979`,
  `ts-a4-drexler-1986-context`, `ts-a1-moravec-1989-context`,
  `ts-a5-vinge-1993`, `ts-a6-vinge-1993`, `ts-a4-hanson-1994-context`,
  `ts-a4-miller-1995-context`, `ts-b5-loosemore-2015-contests`,
  `yk-y11-extropians-1999-08-03-yudkowsky-1487-c`,
  `yk-y20-staring-into-the-singularity-b`,
  `yk-y20-ai-positive-negative-factor-global-risk-b`,
  `yk-y24-ai-positive-negative-factor-global-risk-b`,
  `yk-y24-sl4-2002-05-03-yudkowsky-0205-3551-a`,
  `yk-y24-extropians-2000-09-29-yudkowsky-6080-a`,
  `yk-y28-lw-2022-six-dimensions-of-operational-adequacy-in-c`,
  `ec-g05-clancy-besiroglu-2023-great-inflection-c`,
  `ec-m01-nourse-1955-automation-hearings-statement-b`,
  `ec-m01-technology-and-the-american-economy-1966-b`,
  `ec-m01-mansfield-1966-technological-change-b`,
  `ec-m02-autor-2015-why-are-there-still-so-many-jobs-a`,
  `ec-m06b-stevenson-2019-ai-income-employment-meaning-b`,
  `ec-m01-bresnahan-brynjolfsson-hitt-1999-it-workplace-organization-a`,
  `ec-m09-bresnahan-brynjolfsson-hitt-1999-it-workplace-organization-b`,
  `ec-e04-korinek-stiglitz-2017-ai-income-distribution-b`,
  `ec-e05-hyytinen-2017-kak-editorial-b`, `cpo-orb-oc1-lumen-2024`,
  `rd-r01-miller-yampolskiy-haggstrom-2020-agi-modifying-utility`,
  `rd-r03-belrose-pope-2024-counting-arguments`,
  `rd-a4-altman-2015-machine-intelligence-part-1`,
  `rd-r08-altman-2015-machine-intelligence-part-1`,
  `rd-r08-dafoe-russell-2016-yes-we-are-worried`,
  `rd-r09-bostrom-2002-existential-risks`.
- **Evidence changed (39):** the first evidence item of each claim above
  (for `ts-c1-weizenbaum-1966`, `evidence-ts-c1-weizenbaum-1966-2`); the
  release changelog lists them.
- **Entities, sources, collections:** unchanged. Claim IDs, predicates,
  roles and dates are unchanged, so no record is superseded and no
  collection's membership or order moves.

## Method

`scripts/absence-sweep-apply-1-spec.py` builds
`review/absence-sweep-apply-1-2026-11-02.json` and stops unless the spec
covers exactly the sweep's 41 flagged records and none is `aib-`/`ab-`;
`scripts/apply-recheck.ts` applies it. Each patch names the value it
replaces. `--verify` checks that every new quotation in a claim is in the
sweep report or the stored evidence. Before-snapshot
`review/absence-sweep-apply-1-before-2026-11-02.json`, first in the chain in
`src/editorial/historical-views.ts`.

## Checks

On `absence-sweep-apply-1`:

- `python3 scripts/absence-sweep-apply-1-spec.py --verify`: 11 quotations
  verified.
- `pnpm tsx scripts/apply-recheck.ts --spec review/absence-sweep-apply-1-2026-11-02.json --check`:
  stored records match.
- `pnpm validate:data`: 2,133 entities, 5,832 claims, 2,013 sources, 7,952
  evidence.
- `pnpm audit:consistency`: no high findings; totals identical to `main`
  (one evaluative-word finding from a first draft was removed by quoting the
  report's word “revolutionary”).
- `pnpm docs:coverage`: current; no change.
- `pnpm release 0.26.2 --check`: reproduces byte for byte.
- `pnpm check`: format, lint, typecheck, 916 unit tests, build, bundle
  budget (no limit raised; Search 273.9 of 275 KB).
- `pnpm check:privacy`: passes.
- Browser suite: 325 of 325 passed (20.4 min, one worker), on Playwright's
  Chromium with a config outside the repository without the `msedge`
  channel, deleted afterwards; port 4173 free after the run.
