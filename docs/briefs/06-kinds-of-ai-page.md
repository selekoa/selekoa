# 06 Kinds of AI page

Repository: futurelightcone/selekoa-dev. Fetch origin and create branch `kinds-of-ai-page` from `origin/main`. Interface work on existing records: no new research, no data changes. If a data branch is open, this can run beside it; it merges after.

Goal: give the technical-history collection (admitted 2026-10-31) a reader page: "Kinds of AI", in the institutional-history hub, with the families of machine intelligence, their defining statements and earliest-located terms, and a timeline view. Then a short reader's guide over it (backlog I2, R3).

Read first: `AGENTS.md`; `docs/style-guide.md`; `docs/backlog.md` items I2 and R3; `review/technical-history-admission-2026-10-31.md` (§ Collection and the withheld headlines); `review/guide-compute-buildout-2026-10-31.md` and `review/control-timelines-2026-11-01.md` as templates for a guide and a tool page; `src/site/bundle-budget.ts`; `docs/operating-guide.md` § Working on a smaller plan (Budgets, Checks, Recurring pitfalls).

Git identity, repository-local only: `git config user.name futurelightcone` and `git config user.email 267712019+futurelightcone@users.noreply.github.com`. Never push to `main`; never merge. End each commit message with `Claude-Session: <this session's URL>`. No model identifiers in tracked files.

Constraints:

- Earliest located, never first. Withheld headlines stay withheld and say so plainly; show their open leads only as leads.
- A pre-rendered path for the page, listed in the sitemap; a keyboard-accessible list beside any timeline graphic; no decorative motion.
- Draw the page from its own slice; keep its code out of shared modules (load it lazily). Add a budget entry about 10% above its first measurement. Do not raise any other limit; if Search or the start page goes over, find room.
- At most one plain caveat line per section on the page; record pages keep every qualification.
- If adding the collection to the release's collections is needed, stop and ask: it needs a minor release on a data branch.

Gates: `pnpm check`; `pnpm check:privacy`; the browser suite once (about 30 to 50 minutes; record the browser used), plus a new spec for the page; open the page at phone, laptop and desktop widths and read the console.

Output: `review/kinds-of-ai-page-<date>.md` with what was built, wording to approve, budgets and checks. Push.

Stop after pushing. Report in five lines.
