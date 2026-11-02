# Branch cleanup

The rule for deleting remote branches of `futurelightcone/selekoa-dev`, and
the list as of 2026-11-01 (`origin/main` at `4629608`). **Nothing has been
deleted.** Deleting a branch needs the maintainer's approval (`AGENTS.md`,
"Operating rhythm").

## The rule

1. **List every remote branch** and classify it: merged into `main` by
   ancestry; merged by pull request (the branch tip is the head of a merged
   pull request); content already on `main` (every file the branch changed is
   identical on `main`, or `git cherry` marks every commit as applied); or
   open work.
2. **List every branch a tracked file names**, for example a cross-family
   report cited as "on branch `codex/<pack>-check`". A deleted branch makes
   such a citation dangling.
3. **Copy before deleting.** If a cited branch holds a report or file that is
   not on `main`, copy it into `main` first, as a separate documentation
   change, and point the citation at the copied path. Never merge a `codex/*`
   branch to do this (one early commit on `codex/technical-history-check`
   quoted a historical author's address; its admission copied the files
   instead).
4. **Delete only** branches that are merged (by any of the three tests in
   step 1) and whose cited content is on `main`. Leave open work, and any
   branch a running session may still push to.

Citations in old review notes ("built on branch `prerender-pages`") are
history, not links; they do not need the branch to exist once the content is
on `main`. Do not rewrite those notes.

## Findings (2026-11-01)

- 105 remote branches. 65 are ancestors of `main`.
- 27 branches created before 2026-10-27 have no common ancestor with the
  current `main` history, or were merged by pull request after further
  commits on `main`; for every one of them the branch tip equals the head of a
  merged pull request (#63 to #78), so their work is on `main`.
- `compute-power-orbit-pack`, `technical-history-pack`,
  `archive-verification-2026-10-28`, `codex/archive-verification-2026-10-28`,
  `codex/compute-power-orbit-check`, `codex/paraphrase-check-2026-10-28`,
  `codex/frameworks-to-law-check`, `codex/author-persons-check`,
  `codex/china-labs-2-check`, `codex/archive-checks-2026-10-26`,
  `codex/identity-checks-2026-10-27`, `codex/meta-v1-1-recheck` and
  `codex/technical-history-check` were never merged as branches, but every
  report and research file they hold is byte-identical on `main` (checked
  file by file). The only difference on `codex/technical-history-check` is
  that its copy of `review/technical-history-pack-2026-10-29.md` lacks the
  later adjudication section that `main` has.
- `data-c1-search` and `data-c5-navigation` carry commits made after their
  pull requests merged. `git cherry` shows the c5 commits as applied on
  `main`; the c1 commit ("Build the search index with a Vite server of its own
  in development too") was re-applied on `main` as `0508296`.
- **Every cross-family report cited on a `codex/*` branch is already on
  `main`.** No copy step is needed today. Re-run the check before deleting,
  because new `codex/*` branches will arrive.
- Four branches named in tracked files no longer exist on the remote:
  `codex/christiano-institutional-episode` (the roadmap says the maintainer
  deletes it; done), `codex/conceptual-provenance-ii`,
  `codex/network-cartography-i` and `codex/research-baseline-supplement`.
  Nothing to do; the citations are historical.

### Keep

| Branch                    | Why                                 |
| ------------------------- | ----------------------------------- |
| `main`                    | Production                          |
| `prelaunch-fixes`         | Running audit session, unmerged     |
| `propositions-by-thinker` | Running interface session, unmerged |
| `handover-2026-11`        | This handover, until merged         |

### Safe to delete after approval (101 branches)

Merged into `main` by ancestry (64):

```
ai-bio-admission-1 ai-bio-admission-2 ai-bio-pack ai-in-biology-admission
ai-in-biology-pack archive-fixes-2026-10-30 audit-fixes-2026-10-29
china-labs-3-admission china-labs-3-pack chronicle-by-year
codex/ai-bio-check codex/ai-in-biology-check codex/china-labs-3-check
codex/heterodox-thought-check codex/key-papers-check
codex/lab-genealogy-2-check codex/people-check codex/risk-debate-check
compare-first-screen control-timelines cpo-admission-1 cpo-admission-2
crane-nrc-fix data-c0-gates data-c2-pages data-c3-rest data-c4-core
data-loading-plan dataset-audit-2026-10-29 fix-prerender-held-button-test
fix-slice-nav-cursor-test flagship-frameworks-law followups-2026-10-28
frameworks-to-law-admission-1 frameworks-to-law-admission-2
guide-compute-buildout guide-compute-followups guide-framework-changes
heterodox-admission heterodox-thought-pack hide-header-search-on-search
key-papers-admission key-papers-pack lab-genealogy-2-admission
lab-genealogy-2-pack link-health-2026-10-29 map-prebuilt-layouts
operating-guide-2026-10-28 paraphrase-corrections-2026-10-28 people-admission
people-pack policy-family-roles-2026-10-29 prelaunch-interface
reader-decisions-2026-10-29 reader-tasks-2026-10-29 redact-signed-urls
risk-debate-admission risk-debate-pack roadmap-about-voice roadmap-contact
roadmap-interface-order roadmap-wording site-search-header-2026-10-29
start-title-one-line technical-history-admission
```

Merged by pull request; tip equals the merged pull request's head (18):

```
archive-admissions-2026-10-26 author-persons-admission china-labs-2-admission
claude/tender-darwin-htfmo5 compare-more-facets data-fixes-2026-10-26
data-urls-llms findability-plan framework-comparison-ui
framework-rulings-2026-10-27 homepage-tweaks housekeeping-2026-10-27
prerender-pages reader-fixes spines-hubs start-page-featured
data-c1-search data-c5-navigation
```

(`data-c1-search` and `data-c5-navigation` have post-merge commits whose
changes are on `main`, see above.)

Content on `main`, never merged as a branch (19):

```
archive-verification-2026-10-28 author-person-pack china-labs-pack-2
codex/archive-checks-2026-10-26 codex/archive-verification-2026-10-28
codex/author-persons-check codex/china-labs-2-check
codex/compute-power-orbit-check codex/frameworks-to-law-check
codex/identity-checks-2026-10-27 codex/meta-v1-1-recheck
codex/paraphrase-check-2026-10-28 codex/technical-history-check
compute-power-orbit-pack framework-adjudication-memo fresh-eyes-live
frameworks-to-law-pack recheck-38-42 technical-history-pack
```

The pack branches in this group (`author-person-pack`, `china-labs-pack-2`,
`framework-adjudication-memo`, `fresh-eyes-live`, `frameworks-to-law-pack`,
`recheck-38-42`) predate the current `main` history; their research and
review files are on `main` (no file on them is missing from `main`; the
differences are later edits on `main`).

## Commands

Re-run the inventory first; branches change between sessions.

```sh
git fetch --prune origin
# Classify every remote branch
for b in $(git for-each-ref --format='%(refname:short)' refs/remotes/origin | grep -v -e '^origin$' -e HEAD); do
  if git merge-base --is-ancestor "$b" origin/main; then echo "merged ${b#origin/}";
  else echo "open   ${b#origin/} ($(git rev-list --count origin/main.."$b") ahead)"; fi
done
# Branch names cited in tracked files
git grep -ohE '`(codex|claude)/[a-z0-9.-]+`' origin/main | sort -u
# For a branch that is not an ancestor: is every file it changed identical on main?
b=origin/<branch>; mb=$(git merge-base "$b" origin/main)
git diff --name-only "$mb" "$b" | xargs -r git diff --name-only "$b" origin/main --
# Commits already applied on main show "-"
git cherry -v origin/main "$b"
```

Deletion, only after the maintainer approves the list, in batches, from a
session that can push to the repository:

```sh
git push origin --delete <branch> [<branch> ...]
```

The maintainer can also delete branches on GitHub (repository, Branches,
the bin icon), which keeps a "Restore" button for a while.
