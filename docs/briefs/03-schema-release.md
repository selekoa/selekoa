# 03 Schema release from the decision sheet

Repository: futurelightcone/selekoa-dev. Fetch origin and create branch `schema-<date>` from `origin/main`. This is a data task. Run it only after the maintainer's answers are recorded in `review/decision-sheet-<date>.md` on `main`, and only if no other data branch is open (check `git branch -r` and open pull requests; stop and report if one is).

Goal: apply the recorded schema decisions (backlog D1, D2, D3, D9, D20 as decided) in one minor release, and admit the held records that the decisions release: for example the 27 heterodox `cites` links to persons, the 7 people statement records, the technical-history records held for statement kinds.

Read first: `AGENTS.md`; `docs/operating-guide.md` (the pipeline; "Working on a smaller plan"); `docs/editorial-policy.md`; `docs/ontology.md`; `docs/dataset-format.md`; the decision sheet; the admission records and held maps of each affected collection (`review/heterodox-admission-map-2026-11-01.json`, `review/people-admission-map-2026-10-31.json`, `review/technical-history-admission-map-2026-10-31.json`); the latest admission script as the template (`scripts/lab-genealogy-2-admission.ts`).

Git identity, repository-local only: `git config user.name futurelightcone` and `git config user.email 267712019+futurelightcone@users.noreply.github.com`. Never push to `main`; never merge. End each commit message with `Claude-Session: <this session's URL>`. No model identifiers in tracked files.

Constraints:

- Apply only what the sheet records as decided; hold everything else and list it.
- One script makes every data change; the before-snapshot `review/<name>-before-<date>.json` goes first in the chain in `src/editorial/historical-views.ts`; update `transactions.test.ts` and `versions.test.ts`; cut the release with `pnpm release X` (minor).
- Earliest located, never first; announced stays announced; dates keep their kind and precision; no motives.
- Admitted records rest on passages already verified in the packs; do not re-retrieve or rewrite them.
- If a page goes over its budget, find room (operating guide, Budgets); do not raise a limit.
- Commit and push after the script, after the release and after the checks.

Gates: `pnpm -s validate:data`; `pnpm check`; `pnpm check:privacy`; `pnpm release X --check`; the browser suite once (about 30 to 50 minutes; record the browser used). Update browser specs that freeze counts by scope, not by loosening selectors.

Output: `review/<name>-admission-<date>.md` with what was admitted, held and changed, the checks and the budget table. Push.

Stop after pushing. Report in five lines; say "ready for review" and the release number. The maintainer opens the pull request and says "merge N".
