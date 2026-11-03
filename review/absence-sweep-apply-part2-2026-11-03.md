# Textual absence-claims sweep, part 2: corrections applied, 2026-11-03

Applies the rest of the Codex sweep of textual absence claims. The final
report is brought in unchanged:
[`review/absence-claims-sweep-2026-11-02.md`](absence-claims-sweep-2026-11-02.md)
(and `.json`; branch `codex/absence-claims-sweep` at b7b6bbe). The sweep is
complete: 344 in-scope records checked (286 absence holds, 19 absence fails,
36 scope issue, 3 unverifiable), 21 excluded by the maintainer (`aib-`,
`ab-`). The part-1 files (`-part1` suffix) are unchanged.

Branch `absence-sweep-apply-2` from `main` at a526ca2 (v0.26.2), following
`docs/briefs/08-absence-sweep-apply.md` as amended by the task of
2026-11-03. Release **v0.26.3** (patch): corrections within existing
collections; schema unchanged (2.29). Prepared by Claude; the sweep is the
cross-family (OpenAI) check.

## Scope: the 14 records part 1 did not apply

The final report flags 55 records (19 fails, 36 scope issue). Part 1
([record](absence-sweep-apply-part1-2026-11-02.md), v0.26.2) handled 41 of
them; their verdicts and proposed wording are identical in the final report.
The remaining 14, listed before any change:

| Rec. | Record                                            | Verdict       |
| ---- | ------------------------------------------------- | ------------- |
| 254  | `rd-r11-dair-2023-statement`                      | scope issue   |
| 258  | `rd-r12-marcus-2023-ai-risk-agi-risk`             | scope issue   |
| 263  | `rd-r13-altman-2024-intelligence-age`             | absence fails |
| 273  | `rd-r15-kapoor-narayanan-2023-llama-out-of-bag`   | absence fails |
| 277  | `rd-r15-narayanan-kapoor-2024-not-model-property` | scope issue   |
| 280  | `rd-r16-brooks-2017-seven-deadly-sins`            | scope issue   |
| 281  | `rd-r17-askell-2019-cooperation`                  | absence fails |
| 301  | `ht-w02-faggella-2023-worthy-successor`           | scope issue   |
| 313  | `ht-w06-land-2014-teleological-identity`          | scope issue   |
| 318  | `ht-w07-bostrom-2012-superintelligent-will`       | scope issue   |
| 327  | `ht-w09-degaris-2001-building-gods`               | scope issue   |
| 357  | `ec-m07-frey-osborne-2013-future-of-employment-a` | scope issue   |
| 358  | `ec-m09-frey-osborne-2013-future-of-employment-b` | scope issue   |
| 364  | `rd-r14-bubeck-2023-sparks-agi`                   | absence fails |

4 fails, 10 scope issues. None is `aib-` or `ab-`. `scripts/absence-sweep-apply-2-spec.py`
stops unless its corrections cover exactly the flagged records outside part 1.

**Left alone:** the 3 unverifiable records (16 `ts-b6-samuel-1960-contests`,
56 `ts-b1-crocker-1996-12-31-context`, 97 `yk-y17-creating-friendly-ai-2001-c`;
the same three as in part 1) and the 21 excluded `aib-`/`ab-` records.

## What was applied

All 14 corrected. Each qualification or time note that stated an absence the
sweep contradicted, or generalised a passage-level limit to the whole text,
now states what the source supports, with the sweep's passage and locator.
Limits stay limits ("does not separately evaluate", "without demonstrating
the identity", "no 2013-era copy is authenticated").

Each corrected record's first evidence item has `checkedAt` 2026-11-03 and a
note sentence naming the sweep record and this file, and saying whether this
session re-read the passage.

**No earliest located role withdrawn.** Three records hold one:
`rd-r12-marcus-2023-ai-risk-agi-risk` (earliest-located),
`ht-w07-bostrom-2012-superintelligent-will` (earliest-located-term,
"orthogonality") and `ec-m07-frey-osborne-2013-future-of-employment-a`
(earliest-located). The sweep gives no earliest-located assessment for them;
each correction widens or narrows a qualification and removes no passage the
role rests on (Marcus's "either/or" passage, Bostrom's orthogonality thesis,
Frey and Osborne's estimate). No `underRecheck` entry is needed.

## Re-read on 2026-11-03

This session retrieved the source directly and found the sweep's passage for
records 254 (DAIR), 258 (Marcus: Hinton, the FLI letter, Europol), 263
(Altman: "navigate the risks", infrastructure "that wars get fought over",
labour markets), 273 (further reading on fraud; the malware update), 277
(recommendation 2), 280 ("over time"), 281 (footnote 3 and section 1.4 on
catastrophic failures and liability), 318 (section 2.3), 327 (Moore's law
paragraphs; "cosmic tragedy") and 364 (PDF pp. 4 and 92). For the others it
took the passage and locator from the sweep: the Land transcript returned
406, the Faggella archive capture reset the connection, and the Frey and
Osborne PDF was not retrieved again.

## Before → after (summary)

| Rec. | Record                                      | Before (the absence)                                 | After                                                                                                                         |
| ---- | ------------------------------------------- | ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| 254  | `rd-r11-dair-2023-statement`                | gives no separate argument about evidence            | criticises framing (misattributed agency, distraction from current harms); no technical evaluation of a catastrophe mechanism |
| 258  | `rd-r12-marcus-2023-ai-risk-agi-risk`       | does not answer a named text                         | concluding argument general; engages Hinton, the FLI letter and a Europol report; no point-by-point reply                     |
| 263  | `rd-r13-altman-2024-intelligence-age`       | does not address risk                                | discusses risks and harms: conflict over infrastructure, unequal access, labour markets; plateau absence kept                 |
| 273  | `…kapoor-narayanan-2023-llama-out-of-bag`   | Limited to disinformation and spam                   | focused on them; further reading on fraud; malware update as a point against open-sourcing; no-position sentence kept         |
| 277  | `…narayanan-kapoor-2024-not-model-property` | call for assessment rather than concluding it is low | case-by-case: low for vulnerability detection, substantial for NCII; no general low-risk conclusion                           |
| 280  | `rd-r16-brooks-2017-seven-deadly-sins`      | no timescale beyond "over time"                      | for this adaptation, an order and no duration; other horizons elsewhere                                                       |
| 281  | `rd-r17-askell-2019-cooperation`            | does not address catastrophic risk                   | discusses irreversible or catastrophic failures, liability limits, discontinuous progress; analytical, not measured           |
| 364  | `rd-r14-bubeck-2023-sparks-agi`             | concerns capability, not goals                       | distinguishes capability from motivation and goals; agency as future work; does not establish GPT-4 has goals                 |
| 301  | `ht-w02-faggella-2023-worthy-successor`     | passages not found in the 2024 capture               | their exact wording absent; the capture already states the core aim, without BCI                                              |
| 313  | `ht-w06-land-2014-teleological-identity`    | give no argument for it                              | sketch supporting analogies, without demonstrating the identity                                                               |
| 318  | `ht-w07-bostrom-2012-superintelligent-will` | does not discuss growth of intelligence as an end    | does not advocate it as a final end; section 2.3 on instrumental enhancement                                                  |
| 327  | `ht-w09-degaris-2001-building-gods`         | no physical mechanism is argued                      | the "cosmic tragedy" judgement is not derived from physics; earlier paragraphs argue capacity from Moore's law                |
| 357  | `ec-m07-…-a` (time note)                    | an archive capture was not available                 | live PDF byte-identical to the capture of 8 October 2026; no 2013-era copy authenticated                                      |
| 358  | `ec-m09-…-b` (qualification, time note)     | a gap claim; archive capture not available           | the authors' knowledge-qualified gap claim, not an established absence; time note as record 357                               |

The exact old and new values are in
[`review/absence-sweep-apply-2-2026-11-03.json`](absence-sweep-apply-2-2026-11-03.json).

## Where this record departs from the sweep (for the maintainer)

The drafting family does not overrule the checker on a headline; none of
these touches one.

- **Record 357, Frey and Osborne (-a), qualification.** The sweep marks the
  qualification as a scope issue as well as the time note, but its finding
  concerns only archival coverage. The qualification already says the figure
  is technical susceptibility, not a forecast of job loss, and states nothing
  about archives, so it is unchanged; the time note carries the correction.
- **Record 263, Altman 2024.** The sweep's wording names "unequal access";
  the essay's words are that AI could become "mostly a tool for rich
  people". The record paraphrases that sentence.
- **Records 357 and 358, time notes.** The sweep's byte-identity finding is
  its own (2026-11-03); this session did not reproduce it, and the notes say
  the sweep found it.

## Correction note (every changed record)

- **Claims changed (14):** `rd-r11-dair-2023-statement`,
  `rd-r12-marcus-2023-ai-risk-agi-risk`, `rd-r13-altman-2024-intelligence-age`,
  `rd-r15-kapoor-narayanan-2023-llama-out-of-bag`,
  `rd-r15-narayanan-kapoor-2024-not-model-property`,
  `rd-r16-brooks-2017-seven-deadly-sins`, `rd-r17-askell-2019-cooperation`,
  `rd-r14-bubeck-2023-sparks-agi`, `ht-w02-faggella-2023-worthy-successor`,
  `ht-w06-land-2014-teleological-identity`,
  `ht-w07-bostrom-2012-superintelligent-will`,
  `ht-w09-degaris-2001-building-gods`,
  `ec-m07-frey-osborne-2013-future-of-employment-a`,
  `ec-m09-frey-osborne-2013-future-of-employment-b`.
- **Evidence changed (14):** the first evidence item of each claim above; the
  release changelog (`release/v0.26.3/CHANGELOG.md`) lists them.
- **Entities, sources, collections:** unchanged. Claim IDs, predicates,
  roles and dates are unchanged, so no record is superseded and no
  collection's membership or order moves.

## Method

`scripts/absence-sweep-apply-2-spec.py` builds
`review/absence-sweep-apply-2-2026-11-03.json`; `scripts/apply-recheck.ts`
applies it. Each patch names the value it replaces. `--verify` checks that
every new quotation in a claim is in the sweep report or the stored
evidence. Before-snapshot `review/absence-sweep-apply-2-before-2026-11-03.json`,
first in the chain in `src/editorial/historical-views.ts`.

## Checks

On `absence-sweep-apply-2`:

- `python3 scripts/absence-sweep-apply-2-spec.py --verify`: 2 quotations
  verified.
- `pnpm tsx scripts/apply-recheck.ts --spec review/absence-sweep-apply-2-2026-11-03.json --check`:
  stored records match.
- `pnpm validate:data`: 2,133 entities, 5,832 claims, 2,013 sources, 7,952
  evidence.
- `pnpm audit:consistency`: no high findings; totals identical to `main`.
- `pnpm docs:coverage`: updated (date and check span only).
- `pnpm release 0.26.3 --check`: reproduces byte for byte.
- `pnpm check`: format, lint, typecheck, 918 unit tests, build, bundle
  budget (no limit raised; Search 273.9 of 275 KB). The first run failed one
  test because `review/essay-starter-gaps.md` carries the dataset date; it
  was regenerated with `pnpm question:gaps`.
- `pnpm check:privacy`: passes.
- Browser suite: 325 of 325 passed (32.2 min, one worker), on Playwright's
  Chromium with a local config without the `msedge` channel, deleted
  afterwards; port 4173 free after the run.
