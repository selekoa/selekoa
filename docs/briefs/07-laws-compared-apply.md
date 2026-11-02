# 07 Laws compared: apply the cross-family check

For a Claude session. Paste everything below this line.

Repository: futurelightcone/selekoa-dev. Start a branch `laws-compared-apply` from `origin/laws-compared-pack`, then merge `origin/main` into it (no rebase). Read `research/laws-compared/README.md`, `review/laws-compared-pack-2026-11-02.md`, the Codex report on branch `codex/laws-compared-check` (`research/laws-compared/cross-family-check-2026-11-02.md` and `.json`; bring both onto the branch unchanged with `git checkout origin/codex/laws-compared-check -- research/laws-compared/cross-family-check-2026-11-02.md research/laws-compared/cross-family-check-2026-11-02.json`), `docs/editorial-policy.md` and `docs/operating-guide.md`.

Git identity, repository-local only: `git config user.name futurelightcone`, `git config user.email 267712019+futurelightcone@users.noreply.github.com`. Never push to main, and open no PR. End commit messages with `Claude-Session: <this session's URL>`.

1. Adjudicate the check. Apply every correction both families agree on (the audit's corrections, the checker's wording, locator and date findings). For the four disagreements (eu-ai-act Q04, ny-ch699 Q08, us-eo14110 Q05, us-bis-ifr Q03), the drafting family may not overrule the checker on a cell: apply the checker's status, or record the cell as held with both reasons for the maintainer.
2. Record the adjudication and the open decisions (SB 53 quotation limit, whether the Code of Practice stays a row, one or two New York rows, how to show revoked and rescission-announced rows, the "partly" rules, Illinois) in the pack's review note, each with a recommendation.
3. Do not admit the pack into the live data in this branch. Rebuild the pack and its brief with `node research/laws-compared/build.mjs`, run `pnpm check:privacy`, push, and report in five lines.
