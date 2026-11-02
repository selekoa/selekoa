# 04 Public source sync

Repository: futurelightcone/selekoa-dev (private) and selekoa/selekoa (public). I authorise attaching `selekoa/selekoa` to this session with push access and pushing one snapshot commit to its default branch, following `docs/publishing.md`. I will approve the attach prompt when it appears.

Goal: sync the public source to the current dataset release on `main` of selekoa-dev (state the release, for example v0.23.2).

Read first: `AGENTS.md`; `docs/publishing.md` (the routine, steps 1 to 6); `docs/operating-guide.md` § Public sync.

Git identity, repository-local only and set in the public checkout: `git config user.name futurelightcone` and `git config user.email 267712019+futurelightcone@users.noreply.github.com`. The public commit message is `Selekoa source at dataset release vX.Y.Z`, with no trailers.

Constraints:

- Follow the routine exactly: `git archive origin/main` into the cleaned public checkout; the privacy audit (`pnpm install --frozen-lockfile`, `pnpm check:privacy`, the scans for addresses, home paths, credentials and personal identity); the tree-ID comparison; one commit; push.
- Any finding stops the sync. Report it; never patch the public copy by hand.
- Never force-push, rebase, amend, tag, create a release or change repository settings.
- Push nothing to selekoa-dev.

Gates: the privacy audit passes; `git write-tree` in the public checkout equals `git rev-parse origin/main^{tree}` in selekoa-dev.

Output: report the public commit, the selekoa-dev commit it copies, the tree ID and the audit results in five lines.

Stop after the push.
