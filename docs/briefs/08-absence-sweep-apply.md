# 08 Apply the absence-claims sweep

For a Claude session, after the Codex sweep on branch `codex/absence-claims-sweep` is complete. Paste everything below this line.

Repository: futurelightcone/selekoa-dev. Start a branch `absence-sweep-apply` from `origin/main`. Read the Codex report (`review/absence-claims-sweep-2026-11-02.md` and `.json` on `codex/absence-claims-sweep`; bring both onto the branch unchanged), `review/cross-family-audit-sample-2026-11-02.md`, `docs/editorial-policy.md` and `docs/operating-guide.md`.

Git identity, repository-local only: `git config user.name futurelightcone`, `git config user.email 267712019+futurelightcone@users.noreply.github.com`. Never push to main, and open no PR. End commit messages with `Claude-Session: <this session's URL>`.

1. For each item marked "fails" or "scope issue", correct the qualification, note or statement to what the source supports, using the report's passage and locator. Keep limits on known methods as limits ("the only way I know of" is not "the only way").
2. Where a correction removes the support for an earliest-located role, withdraw the role with `underRecheck` (reason: the sweep, with its item number) and assign it nowhere else.
3. List items you disagree with, with your reason, for the maintainer; the drafting family does not overrule the checker on a headline.
4. Patch release with a correction note listing every changed record; gates as in the operating guide (`validate:data`, `audit:consistency`, `docs:coverage`, `check`, `release --check`, `check:privacy`, the full browser suite). Record in `review/absence-sweep-apply-<date>.md`, update `docs/backlog.md`, push and report in five lines.
