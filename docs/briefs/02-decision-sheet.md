# 02 Decision sheet

Repository: futurelightcone/selekoa-dev. Fetch origin and create branch `decision-sheet-<date>` from `origin/main`. Documentation only.

Goal: one short decision sheet the maintainer can answer in a single reply, covering the pending choices that block data work: backlog items D1, D2, D3, D4, D5, D6, D7, D8, D9 and D20.

Read first: `AGENTS.md`; `docs/editorial-policy.md`; `docs/ontology.md`; `docs/backlog.md`; and for each item the review section it cites (for example `review/heterodox-admission-2026-11-01.md` § Open for the maintainer, `review/lab-genealogy-2-admission-2026-11-01.md` § Open for the maintainer, `review/technical-history-admission-2026-10-31.md` § For the maintainer, `review/people-admission-2026-10-31.md` § Held, `review/risk-debate-admission-2026-10-31.md` § Open for the maintainer, `review/china-labs-3-admission-2026-10-31.md` § Needing judgement, `review/cpo-admission-1-2026-10-30.md` and `review/cpo-admission-2-2026-10-30.md` § Open, `review/key-papers-admission-2026-10-31.md` § Open for the maintainer).

Git identity, repository-local only: `git config user.name futurelightcone` and `git config user.email 267712019+futurelightcone@users.noreply.github.com`. Never push to `main`. End each commit message with `Claude-Session: <this session's URL>`. No model identifiers in tracked files.

Write `review/decision-sheet-<date>.md`:

- Numbered questions, grouped: schema (one minor release), lab genealogy 2, risk debate, China III, compute, key papers.
- Each question: one or two sentences of context, the options, the recommended answer with its reason in one line, the records it affects (IDs or counts), and the source section.
- Mark which answers need a schema change (minor release) and which a patch.
- Recommend; never decide. Apply no change to data.
- At the end, the reply format: "1 A, 2 recommended, 3 hold …".

Gates: `npx prettier --check` on the new file; `pnpm check:privacy`.

Output: the sheet, pushed. Report in five lines and paste the list of question titles so the maintainer can answer from the chat.

Stop after pushing. When the maintainer replies, record the answers under "Maintainer decisions (<date>)" in the same file, push, and stop again.
