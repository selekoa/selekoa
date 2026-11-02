# Operating guide

How Selekoa's work is run, for the maintainer and for any thread, Codex or
Claude, that picks it up. It records the procedure that ran through
October 2026 and the plan for running it on lower-tier plans. Rules live
where they are already written: [`AGENTS.md`](../AGENTS.md) (working rules),
the [editorial policy](editorial-policy.md) (admission), [publishing](publishing.md)
(public source sync) and the [roadmap](roadmap.md) (priorities and backlog).
This guide does not repeat them; it says who does what, in what order.

## The pipeline

Every addition to the dataset passes through the same six steps. Nothing
skips one.

1. **Pack.** A research thread builds a candidate pack under
   `research/<pack>/`: `pack.json` and `pack.md`, `scope.md`, the scripts that
   build them, `verification.json` (mechanical quotation matching), `audit.md`
   (a fresh-context audit by the preparing family) and a cross-family brief
   with the pack's answers in a separate verdicts file. A review note
   `review/<pack>-<date>.md` lists open questions, each with a recommended
   answer. `data/` is untouched. The template is `research/frameworks-to-law/`.
2. **Cross-family check.** A model from the other family runs the brief
   blind first: it records its own answers before opening the verdicts file,
   the pack or the audit, then adds a "Comparison" section. It writes only its
   two report files on its own branch (`codex/<pack>-check` and similar) and
   opens no pull request.
3. **Adjudication.** The reviewing thread reads the report and proposes, for
   each disagreement, a correction or a hold. The maintainer decides. Decisions
   are recorded in the pack's review note ("Maintainer decisions") before any
   admission task starts.
4. **Admission.** A data thread admits the pack on a branch from `main`:
   one script makes every data change; the before-snapshot
   `review/<name>-before-<date>.json` goes first in the chain in
   `src/editorial/historical-views.ts`; `transactions.test.ts` and
   `versions.test.ts` are updated; a release is cut with `pnpm release X`. A
   pack that needs a schema change is admitted in two parts: records on
   existing predicates first (a patch or minor release by the rule below),
   then the schema change and the records that need it (a minor release).
   The admission record `review/<name>-admission-<date>.md` lists what was
   admitted, held and changed.
5. **Review.** The reviewing thread checks the branch in its own worktree:
   up to date with `main` (`git merge-tree` clean), `pnpm -s validate:data`,
   `pnpm -s check:privacy`, `pnpm release X --check`, unit tests, and a read
   of the diff and the admission record. It opens the pull request with the
   checks in the body. The admitting thread has already run `pnpm check` and
   the browser suite once.
6. **Merge.** Only the maintainer authorises a merge ("merge 81"). Merging
   `main` deploys the live site. After each merge the reviewing thread waits
   for the deploy and confirms the new release is served
   (`https://selekoa.pages.dev/data/` lists it) and that a new page loads.

Corrections to admitted data (a cross-family re-check, a maintainer
decision) follow steps 4 to 6 only, as a patch release.

## Versions

- **Patch:** corrections and small additions within existing collections.
- **Minor:** a new collection or a schema change.
- **Major:** 1.0, by the roadmap.

`pnpm release X --check` reproduces only the latest release. When two data
branches overlap, the one merged second merges `main`, regenerates its
before-snapshot from the new base (never by hand) and re-releases under the
next free version.

## Roles

| Role                 | October 2026 (Max plan)                        | From November 2026 (lowest paid tiers) |
| -------------------- | ---------------------------------------------- | -------------------------------------- |
| Packs and admissions | Claude cloud sessions, unattended              | Codex, one pack at a time              |
| Cross-family check   | Codex (GPT), run locally by the maintainer     | Claude, bounded briefs                 |
| Review and planning  | A Claude planning thread with scheduled checks | Claude, short visits                   |
| Archive retrieval    | Codex only (cloud sessions cannot reach it)    | Codex                                  |
| Decisions and merges | The maintainer                                 | The maintainer                         |

The admission rule needs two model families: whichever drafts, the other
audits (editorial policy, maintainer decision of 2026-10-29). Each pack's
review note names the preparing and the checking family, and the override
rule (a preparer's adjudication against the checker on an earliest-located
role or headline is not admitted on that adjudication alone) applies to
whichever family prepared. The November roles in the table are a plan, not
yet decided; the policy does not need changing for either.

Lower tiers allow less work per day. Keep each task bounded: one pack, one
check or one admission per thread; commit and push after each source group or
every 15 to 25 items, so a thread stopped by a limit resumes on "continue"
from its checkpoint.

## Writing a task prompt

A prompt is the only context a new thread has. Each one states:

- the repository (`futurelightcone/selekoa-dev`), the base branch and the
  branch to create, and that it never pushes to `main` and never merges;
- the repository-local Git identity from `AGENTS.md`;
- the goal, the files to read first, and the template to follow;
- the maintainer decisions it must apply, quoted, and what to hold instead
  of deciding;
- the editorial rules that bear on the task (earliest located, announced
  stays announced, dates keep kind and precision, no motives);
- the checks to run and the outputs to write;
- checkpointing and the short final report.

A cross-family prompt also states the blind-first order, the files it must
not open before its answers are committed, and that it writes only its report
files. Past prompts that worked are kept with the reports they produced; the
frameworks-to-law check is a good model.

## Hosting and accounts (no credentials here)

- **Site:** Cloudflare Pages project `selekoa`, built from `main` of
  `futurelightcone/selekoa-dev` (`pnpm build`, output `dist`). Custom domains
  `selekoa.org` and `www` (redirected to the root); `selekoa.com` redirects
  to `selekoa.org`. Preview branches are off. Caching is set in
  `public/_headers`.
- **Analytics:** Cloudflare Web Analytics through the manual snippet
  configured in `site.config.json`. Never enable automatic injection.
- **Search engines:** Google Search Console and Bing Webmaster Tools are
  verified by DNS; the sitemap is submitted to both.
- **Email:** `maintainer@selekoa.org` is routed by Cloudflare Email Routing
  to a private inbox. Replies as that address need an outbound route that is
  not set up yet.
- **Public source:** `selekoa/selekoa`, snapshot commits only, synced by the
  routine in [publishing](publishing.md) and only on the maintainer's
  explicit authorisation.

## Housekeeping

Every few days: delete merged branches (with approval), remove stale
worktrees, check `docs/roadmap.md` for parked work and list decisions waiting
on the maintainer. A step-back review of priorities and usability is planned
for mid-November 2026.

## Working on a smaller plan

From November 2026 the work runs on a smaller paid plan, at a slower pace,
with one session at a time instead of a planning thread directing several.
This section is for that successor session and for the maintainer. The open
work is in the [backlog](backlog.md); ready-to-paste task prompts are in
[`briefs/`](briefs/).

### Session sizing

- **One bounded task per session:** one pack, one check, one admission, one
  interface change or one decision sheet. A task that needs both a data
  release and an interface change is two sessions.
- **High effort by default.** A careful single pass costs less than a fast
  pass plus a repair session.
- **No parallel helpers unless needed.** Read the files yourself. Use a
  helper only to read more than about 300 KB of records whose conclusions,
  not contents, you need (as in a handover). Never run two helpers on the
  same files.
- **Split when** a pack passes about 150 records, an admission needs a schema
  change (records on existing predicates first, then the schema change), a
  task would cut more than one release, or a session reaches half its budget
  with less than half the work done. Commit and push at each checkpoint so a
  stopped session resumes on "continue".

### Sequencing

- **One data branch at a time.** Every admission or correction cuts a release
  and adds a before-snapshot to the chain in
  `src/editorial/historical-views.ts`. Two data branches open together both
  take the same next version and both rebuild their snapshots when the other
  merges. Interface branches that do not touch `data/` or `release/` can run
  alongside one data branch.
- **Merge order:** the data branch first, then interface branches, each
  merged with `main` before its pull request is reviewed.
- **The rebuild rule:** when `main` moves under a data branch, merge `main`
  into it, regenerate the before-snapshot with the admission script on the
  new base (never by hand; recent admission scripts such as
  `scripts/lab-genealogy-2-admission.ts` take `--base` and keep the stored
  `baseCommit`), rerun the script, re-cut the release under the next free
  version, and record the rebuild in the admission record. Resolve a
  `release/CHANGELOG.md` conflict by re-running `pnpm release`, not by
  editing.

### Budgets

`pnpm build` ends with `scripts/bundle-budget.ts`, which fails if a page type
loads more than its limit in `src/site/bundle-budget.ts` (gzip level 9, KB of
1,000 bytes). The limits sit about 10% above the sizes measured when they
were set. On v0.23.2 the Search page is the tightest (about 272 of 275 KB)
and the start page next (about 109 of 115 KB); the latest full table is in
`review/lab-genealogy-2-admission-2026-11-01.md`. The file budget is 15,000
files in `dist/` (`scripts/prerender.ts`; the host limit is 20,000).

A session that goes over a limit finds room instead of raising it:

1. Find what grew: `pnpm build` prints each page type's weight; compare
   the page's files with a build of `main`.
2. Keep page-specific code and records out of shared code: load a page's
   module lazily and let shared code import only its identifier and title
   (control timelines did this).
3. Ship less in shared indexes: drop fields a page does not read (the people
   index lost its sort keys; persons are listed by name alone when the
   identifier is the name's slug).
4. Move text into the page's slice rather than the bundle (the split already
   applied to propositions; see backlog I8 for the kinds still to split).

Raising a limit is a separate commit with a reason, and a maintainer
decision. Never raise one to make a data branch pass.

### Checks

Run checks proportionate to the change (`AGENTS.md` lists the rules):

| Change                        | Gates                                                                                                                                                                                                                                                    |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Documentation or review notes | `npx prettier --check <changed files>`; `pnpm check:privacy`                                                                                                                                                                                             |
| Research pack (no `data/`)    | Prettier and ESLint on the pack's scripts and JSON; `pnpm check:privacy`                                                                                                                                                                                 |
| Data correction or admission  | `pnpm check` (format, lint, types, unit tests, build with budgets); `pnpm check:privacy`; `pnpm -s validate:data`; `pnpm release X --check`; the browser suite once; after a `main` merge, the unit tests and the browser specs that freeze counts again |
| Interface change              | `pnpm check`; `pnpm check:privacy`; the browser suite once and after each later UI change; open the app and read the console                                                                                                                             |

The full browser suite (about 320 tests, one worker) takes about 20 to 33
minutes on an idle machine and 45 to 50 minutes under load. Run it once per
branch; while iterating, run single specs
(`pnpm test:browser tests/browser/<name>.spec.ts`). A run is not valid if
another preview server holds port 4173.

### Codex

Codex (run locally by the maintainer) saves Claude usage on work that does
not need this repository's context:

- **Cross-family checks:** a Claude pack writes the brief
  (`research/<pack>/cross-family-input-<date>.md`) and the verdicts file; the
  maintainer gives Codex the brief and the branch name
  `codex/<pack>-check`. Codex answers blind first, then compares, and writes
  only its report files.
- **Archive retrieval:** cloud sessions get 403 or reset connections from
  web.archive.org, SEC, nrc.gov and others. Batch these reads into one Codex
  brief (backlog D14, D16, R5) instead of retrying from a cloud session.
- **Link health:** rerun `scripts/link-health.mjs` from the maintainer's
  network.
- **Pack drafting, possibly:** the policy allows either family to prepare a
  pack as long as the other checks it. If Codex drafts, a Claude session
  writes the brief and runs the check.

### The maintainer's part

- **Start a task:** open a new session and paste a brief from `docs/briefs/`.
  Edit the first lines if the backlog has moved.
- **Answer decisions:** reply in the form "1 yes, 2 hold, 3 as recommended".
  The session records the answers in the review note before acting.
- **Approve a merge:** say "merge N" when the pull request's body shows every
  gate passing, the branch is up to date with `main`, and no other data pull
  request is waiting. Merge data pull requests one at a time. Merging
  deploys; after each merge the site should list the new release at
  `https://selekoa.org/data/`.
- **Say "stop"** at any time; sessions commit and push at each checkpoint.

### Public sync

The routine is in [publishing](publishing.md). The session cannot reach
`selekoa/selekoa` until that repository is attached to it, and in auto mode
the attach request (`add_repo`, with push access) needs the maintainer's
approval inside that session. Say in the prompt: "Sync the public source to
release vX.Y.Z; I authorise attaching and pushing to `selekoa/selekoa`",
then approve the attach prompt when it appears. A brief is in
`docs/briefs/04-public-sync.md`.

### Recurring pitfalls

From the review records of October and November 2026:

- **Version clashes.** Two data branches cut the same version (v0.22.1 and
  v0.23.x on 2026-11-01). Avoid by sequencing; fix by the rebuild rule.
- **Frozen counts in browser specs.** Specs freeze counts and lists; each
  admission sets aside its ID prefix in `tests/browser/dossier-count.ts` and
  updates the record-page, personnel, cartography, chronicle and search
  specs (lab genealogy 2 had 13 such failures). Change the expectation's
  scope, never loosen a selector to pass.
- **Out-of-memory errors in release tests.** `src/release/release.test.ts`
  ran out of heap once the releases passed 690 MB; it now reads only the
  manifests. New tests must not load every release in full.
- **Unit-test timeouts under parallel load.** Search-index, hydration and map
  tests have exceeded their limits under a full run and passed alone. Rerun
  the one file before suspecting the change.
- **A stale local `main`.** Branch from `origin/main` after
  `git fetch origin main`, never from a local `main`, and check that
  `git merge-tree` against `origin/main` is clean before a review.
- **Port 4173 left busy.** A preview server from another worktree served an
  old build to one browser run. Check the port before and after a run.
- **The Edge channel.** `playwright.config.ts` asks for installed Edge
  (`channel: 'msedge'`). Cloud sessions have no Edge, so their runs used an
  untracked copy of the config without the channel, on Playwright's
  Chromium, and deleted it afterwards. Never commit that change; say in the
  record which browser ran.
- **Images out of git.** `*.png`, `*.jpg` and `*.pdf` are ignored. Keep
  screenshots outside the repository; do not add more tracked images.
- **Signed URLs in audit files.** A link-health record kept pre-signed S3
  addresses with a third-party key ID. `scripts/link-health.mjs` now strips
  such queries and `pnpm check:privacy` flags them; strip query strings from
  any retrieved address before recording it.
- **Private material in branch history.** Two pack branches carry an early
  commit with an author's address or a container path. Copy files from such
  a branch instead of merging it, and delete it (see
  [branch cleanup](branch-cleanup.md)).
- **Silent no-ops in admission scripts.** A list-shaped map entry was ignored
  by `cpo-admission.ts` and a promised correction never applied (fixed in
  v0.23.1). Check that every map entry changed a record.
- **Review on a stale base.** A fresh-context review written before a merge
  had to be redone. Review after the last `main` merge.
