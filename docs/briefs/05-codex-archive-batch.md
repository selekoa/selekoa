# 05 Codex archive batch

For Codex, run locally by the maintainer (cloud sessions cannot reach web.archive.org). Paste into Codex in a clone of futurelightcone/selekoa-dev.

Repository: futurelightcone/selekoa-dev. Fetch origin and create branch `codex/archive-batch-<date>` from `origin/main`. Write only the two report files named below; change nothing in `data/`, `src/`, `release/` or `review/`. Open no pull request.

Git identity, repository-local only: `git config user.name futurelightcone` and `git config user.email 267712019+futurelightcone@users.noreply.github.com`.

Goal: retrieve and read the archived or publisher copies that admitted or held records depend on, and report for each whether the stored passage, date or capture matches. This is retrieval and comparison, not adjudication.

Items (read the cited section for each list):

1. The 11 re-checks in `review/archive-fixes-2026-10-30.md` § Re-checks for the next Codex batch (items 26, 61, 111, 148, 454, 461, 554, 614, 644, 701, 710).
2. The 21 items in the same file, § Held, unchanged: for each, whether a capture now exists and what it shows.
3. Land's four posts held for W07 (Pythia Unbound, Against Orthogonality, Stupid Monsters, Will-to-Think): the passages are in `review/heterodox-admission-map-2026-11-01.json` under `heldNewRecords`. Find captures of the original xenosystems.net posts and match each passage character for character.
4. Archive-only reads listed in `docs/backlog.md` item D16: Meta Frontier AI Framework v1.1 (the 17 comparison cells), xAI's June 2026 framework (16 paraphrases), the three AI-bio editions, the Shelby County permit and three Talen releases, the Perspective and Lumen dates, the Commission library page and BIS PDF dates.

For each item record: the record or source ID, the address read (capture URL with its timestamp; strip any query string that carries a signature or key), whether it matches (match / differs / not found / blocked), the passage or date as read, and a one-line note.

Pace requests modestly and sequentially. Commit and push after each numbered group.

Output: `research/archive-batch-<date>/codex-report.md` and `codex-report.json` on the branch. Then stop and tell the maintainer the branch name; a Claude session applies the results as a patch.
