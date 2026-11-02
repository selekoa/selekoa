# State of Selekoa, 2026-11-02

A snapshot for the session that takes over when the October planning thread
ends. It follows the [state of 2026-10-28](state-of-selekoa-2026-10-28.md).
Counts are as of dataset release v0.23.2 and are not kept up to date here;
current figures are in the [README](../README.md#research-sample) and the
[release notes](../release/CHANGELOG.md). Open work is in the
[backlog](../docs/backlog.md); procedure is in the
[operating guide](../docs/operating-guide.md), including "Working on a
smaller plan".

## What is live

- **Site:** https://selekoa.org since 2026-10-26, built by Cloudflare Pages
  from `main` (`origin/main` at `4629608` on 2026-11-01). Every record has a
  pre-rendered page (7,902 pages at the last full build), readable without
  scripts; the current release's files are under `/data/`, with `llms.txt`.
- **Dataset v0.23.2** (2026-11-01, schema 2.27): 2,130 entities, 5,785 claims,
  7,893 evidence records, 2,007 sources, 15 release collections. Between
  v0.11.0 (2026-10-28) and v0.23.2 the claims nearly doubled (3,044 to
  5,785) through the admissions and corrections in the release notes.
- **Collections and tools:** Compare frameworks (22 editions, with "One
  question" and "Side by side" views and a CSV download); frontier
  frameworks and law; control structures of OpenAI and Anthropic, and lab
  control timelines side by side; external commitments; propositions on
  superintelligence, the risk debate, machine succession (heterodox
  thought), economics, Yudkowsky's arguments, AI and biological risk, AI in
  science and compute in orbit; a compute build-out guide; an
  edition-by-edition framework guide; browse by year; the map (layouts
  computed at build time).
- **Admitted on 2026-10-30 to 11-01, not all with a reader page yet:** key
  papers (credits and documents), technical history (kinds of AI, no page),
  people (executives and single-text writers), lab genealogy 2 (rounds and
  moves), China III (StepFun, 01.AI, Tencent Hunyuan, CAC listings), AI in
  biology (institutions, models, papers).
- **Pre-launch interface (2026-11-01):** a "Ways in" panel on the start page,
  the maintainer's "Why machine-first" and "How this was built" sections in
  About, the banner "Found and cross-checked by machines", and at most one
  caveat line per section on entry pages.

## The method, in one paragraph

Every addition passes six steps: a **pack** prepared by one model family
with mechanical quotation matching and a fresh-context audit; a blind
**cross-family check** by the other family (Codex, run locally by the
maintainer); **adjudication**, where the maintainer decides each
disagreement; **admission** on its own branch by one script, with a
before-snapshot in the version chain and a release; **review** of the branch
against `main`; and a **merge** that only the maintainer authorises and that
deploys the site. Each claim carries a passage, a locator, a source role and
a check date; "earliest located" never becomes "first"; announced stays
announced; unknown dates stay unknown. No person reads every record before
publication; the maintainer sets the rules, reviews each batch and decides
what is admitted.

## Work in flight on 2026-11-02

| Item                                    | Branch                    | State                                     |
| --------------------------------------- | ------------------------- | ----------------------------------------- |
| Pre-launch audit                        | `prelaunch-fixes`         | Running; findings go into the backlog, P1 |
| Propositions by thinker (interface)     | `propositions-by-thinker` | Running; roadmap interface item 5         |
| Laws compared (research pack, drafting) | not yet on the remote     | Brief being drafted; backlog R1           |
| This handover (backlog, guide, briefs)  | `handover-2026-11`        | Pushed; documentation only                |

No data branch is open. The next data task should wait until the two
running branches are reviewed and merged.

## What is pending

- **Maintainer decisions** that block data work: whether `cites` may point
  at a person (39 held heterodox links), a `states_position` predicate (7
  people statements), technical history's statement kinds, lab genealogy 2's
  nine questions, risk debate's six, China III's judgement items, compute
  and key-papers confirmations. Brief 02 turns them into one decision sheet.
- **Archive reads** that only Codex can make: the archive verification's 21
  held items and 11 re-checks, Land's four posts (W07), and records resting
  on the cross-family check's reading. Brief 05 batches them.
- **Interface:** propositions by thinker (in flight), a Kinds of AI page,
  the key papers section, map slices for dossier maps and legible stars on
  phones, guides for the risk debate, kinds of AI and AI in biology, and
  commitments by developer.
- **Before wider public mention:** the pre-launch audit's findings, the
  editorial-status wording still in 1,516 evidence notes, a public source
  sync (the public repository is still at the launch snapshot), and a
  decision on "What's new" and feeds.
- **Housekeeping:** 101 remote branches can be deleted after approval
  ([branch cleanup](../docs/branch-cleanup.md)); two of them carry private
  material in early commits. The roadmap needs a refresh (brief 01).

## Constraints the successor inherits

- **Budgets:** the Search page loads about 272 of its 275 KB and the start
  page about 109 of 115 KB. Find room; do not raise limits.
- **Browser suite:** about 320 tests, 20 to 33 minutes idle and up to 50
  under load. Cloud sessions run it on Playwright's Chromium through an
  untracked config copy; the tracked config asks for Edge.
- **Network:** cloud sessions are refused by web.archive.org, SEC, nrc.gov
  and some publishers. Batch those reads for Codex.
- **Pace:** one session at a time, one bounded task each, one data branch at
  a time.

## Decisions waiting on the maintainer

- Authorise the public source sync (brief 04).
- Answer the decision sheet (brief 02), when it exists.
- Approve the branch deletions in `docs/branch-cleanup.md`.
- Whether Codex becomes the preparing family from November (operating guide,
  "Roles").
- Mid-November step-back review of priorities and usability.
