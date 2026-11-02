# 01 Roadmap refresh and audit intake

Repository: futurelightcone/selekoa-dev. Fetch origin and create branch `roadmap-refresh-<date>` from `origin/main`. Documentation only: no data, code, spec or release changes.

Goal: bring `docs/roadmap.md` and `docs/backlog.md` up to date with `main`, and fold in the pre-launch audit's findings.

Read first: `AGENTS.md`; `docs/operating-guide.md` (section "Working on a smaller plan"); `docs/backlog.md`; `docs/roadmap.md`; the pre-launch audit's record on `main` or on branch `prelaunch-fixes` (`review/*prelaunch*`); every `review/*.md` dated after the latest date in `docs/backlog.md`.

Git identity, repository-local only: `git config user.name futurelightcone` and `git config user.email 267712019+futurelightcone@users.noreply.github.com`. Never push to `main`; open no pull request unless asked. End each commit message with `Claude-Session: <this session's URL>`. No model identifiers in tracked files.

Do:

1. Roadmap (backlog H2): mark interface item 4 (control timelines) done; remove "Explorer map speed" from Next steps (done in #112); move "Key papers" and "Kinds of AI and technical history" out of the Backlog (admitted on 2026-10-31); update the Chinese collections line (StepFun, 01.AI and Hunyuan were admitted in China III); remove the parked OpenAI–Oracle and Summers date lines if `review/archive-admissions-2026-10-26.md` and `review/housekeeping-2026-10-27.md` confirm they are done. Add one line pointing at `docs/backlog.md` for the working list. Keep the maintainer's own wording and order everywhere else.
2. Backlog: add the audit's findings as a new group or under P1, each with source, size, needs and a one-line action, in the same format. Remove any item that a merged branch has done since the backlog was written, and note the removal in the commit message.
3. Do not copy counts from the README; refer to it.

Gates: `npx prettier --check` on the changed files; `pnpm check:privacy`.

Output: the two edited files, pushed. Report in five lines: what changed, checks run, open decisions, next step.

Stop after pushing. Delete nothing; decide nothing for the maintainer.
