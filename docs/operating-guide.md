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

The admission rule needs two model families, whichever drafts. The
editorial policy names the preparing family as Claude and the checking
family as GPT; if Codex becomes the preparing family, that wording is
updated by maintainer decision before the first Codex-prepared pack is
admitted, and the override rule (a preparer's adjudication against the
checker on an earliest-located role or headline is not admitted on that
adjudication alone) applies with the families swapped.

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
