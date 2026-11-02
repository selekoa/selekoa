# 09 Headlines still under re-check

For a Claude session, in two steps. Paste everything below this line.

Repository: futurelightcone/selekoa-dev. Start from `origin/main`. Read `review/recheck-apply-2026-11-02.md` (open decisions 5–7), `review/recheck-decisions-2026-11-02.md`, `review/archive-fetch-apply-2026-11-02.md` (the list of headlines still under re-check), `review/audit-sample-fixes-2026-11-02.md` (Y08), the Codex re-check `review/earliest-located-recheck-2026-11-02.md` and `docs/editorial-policy.md`.

Git identity, repository-local only: `git config user.name futurelightcone`, `git config user.email 267712019+futurelightcone@users.noreply.github.com`. Never push to main, and open no PR. End commit messages with `Claude-Session: <this session's URL>`.

Step 1 (documentation only, branch `recheck-remaining-sheet`): write `review/recheck-remaining-decisions-<date>.md`, one page. For every proposition still carrying `underRecheck`, give the headline, the candidate records, the checker's verdict, the drafting family's view, and a recommended decision (move, keep the current holder, reclassify a stance, reword a criterion in a new collection version, or drop the headline). Push and stop; the maintainer decides.

Step 2 (after the maintainer's decisions, branch `recheck-remaining-apply`): apply exactly the decisions, as `recheck-decisions` did, with a release, the full gates and a record.
