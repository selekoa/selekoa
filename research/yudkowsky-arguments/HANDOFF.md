# Handoff: Yudkowsky corpus research thread

Status as of 2026-10-08. The pack was merged to `main` in #15 (squashed); the `yudkowsky-arguments` branch is finished and should not be reused. Admission into Selekoa data is a separate task on its own branch.

## State

- **Pack:** `pack.json` (rendered `pack.md`) holds 29 generic takes with 216 dated Yudkowsky passages from 1996 to 2026.
  - Relations: answered-it 147, disagrees 24, related 35, earlier-self 6, said-it 4.
  - 40 passages are `cardUse: context-only`.
  - It is a candidate research pack outside application data, machine-prepared and machine-audited, with no human review.
- **Search scope** (details in `scope.md`):
  - every LessWrong post under his account (1,076)
  - five MIRI papers, the 2023 TIME article, the AI-box page and one capture of _Staring into the Singularity_
  - three Arbital pages
  - every SL4 message (1,876) and Extropians message (3,012) listed under his name
- **Not searched:** comments, Twitter/X, interviews, books, and Extropians traffic before 1996-07-25.
- **Checks:**
  - Every quotation matches its retrieved text (`verification.json`), and edited LessWrong posts are checked against the posting-day version.
  - Quotations respect 50 words each, 400 words per source, and about 10% of documents under 2,000 words. A message's length counts its body including quoted lines.
- **Audits** (all recorded in `audit.md`):
  - Same-family fresh-context audits of every passage.
  - One cross-family check (`gpt-check-2026-10-07.*`).
  - A correction pass adjudicating every finding of that check, in the final section.
- **Project document:** `docs/projects/yudkowsky-corpus.md` sets the goal, phases, the plan to admit records through the schema 2.11 proposition model, living-person rules and licence limits. The roadmap lists it under "Major focus projects".

## Decisions made

- Selekoa holds the records. The side app ("The Yudgment") lives in a separate repository, consumes a pinned Selekoa release, and keeps its own voice outside Selekoa. It is static first but built to grow, with no Jev for now.
- **Earlier-self** requires an earlier text that itself holds the take, premise included, and a located later Yudkowsky text that explicitly rejects it. Later retrospectives reporting an earlier view are `related`.
- **Engagement:** `answered-it` means the passage, with its paragraph or the message or turn it belongs to, gives a reason against a premise. Otherwise a contrary statement is `disagrees`.
- **Maintainer, 2026-10-07 (not yet implemented):**
  - `earliest-located` is allowed on answers and disagreements in Selekoa.
  - "Strongest" stays in the app.
  - A "years late" line needs a named later interlocutor and the same premise.
- **Living-person rules:** earlier views are shown only with later corrections, context-only passages are never shown alone, no ideological labels, no full texts, and LessWrong and other terms are checked before any publication.

## Open questions

1. **Overridden or stricter cross-family findings:** the corrector overrode GPT or went stricter on T15-d, T15-e2, T19-s3, T22-b and T30-c, and partly on T24-e2 and T28-c. These need a maintainer decision or another independent check.
2. **Engagement rule:** a message-level rule moved 23 passages to `answered-it`. A paragraph-only rule would keep more as `disagrees`.
3. **Schema gaps before admission:** the schema needs a choice of how to represent engagement, retrospective self-report and context-only use (see the project document).
4. **Takes and premises:** they were written for this pack and have had no human review. Changing them changes relations.

## Next three steps

1. Implement the approved schema decisions, then admit a first bounded set of takes as schema 2.11 propositions. Admission carries roles, wording dates and qualifications, and leaves out "strongest".
2. Run the separate "years late" search: for each take, named later interlocutors who made the same argument with the same premise.
3. Build the receipt-card mockup in the separate app repository from a pinned export, using real context-safe passages only.

## How to run it

From the repository root, with dependencies installed:

```sh
node scripts/yudkowsky-arguments.mjs lw-index               # LessWrong posts -> .local cache
node scripts/yudkowsky-arguments.mjs archive-index sl4|ext  # Hypermail author indexes
node scripts/yudkowsky-arguments.mjs archive-fetch sl4|ext  # message bodies (paced, resumable)
node scripts/yudkowsky-arguments.mjs fetch <url> <key>      # one other document
node scripts/yudkowsky-arguments.mjs lw-version <postId…>   # posting-day versions
node scripts/yudkowsky-arguments.mjs grep "<regex>" [--venue lw|doc|sl4|ext]
node scripts/yudkowsky-arguments.mjs build                  # refresh sources in pack.json
node scripts/yudkowsky-arguments.mjs verify                 # quotes, versions, caps -> verification.json
node scripts/yudkowsky-arguments.mjs render                 # pack.md
pnpm check && pnpm check:privacy
```

- **Cache:** retrieval bodies live in the ignored `.local/yudkowsky-arguments/` folder and are not tracked. A fresh checkout must re-fetch them, roughly 3 hours for the mailing lists at the built-in pacing, before `verify` can run.
- **Editing:** edit `pack.json` directly for takes and passages. `build` regenerates only the header and source records, and `verify` and `render` must follow every edit.
- **Format check:** `pnpm check`'s format step also reads any untracked local `.claude/` folder.
