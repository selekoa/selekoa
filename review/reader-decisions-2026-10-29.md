# Reader-task decisions: what changed, 2026-10-29

The maintainer's decisions of 2026-10-29 on
[the reader tasks](reader-tasks-2026-10-29.md#decisions-for-the-maintainer):
the recommended answers to decisions 1 to 4 were adopted. Decision 5 (an
`?edition=` address on the compare page) is a separate interface task and is
not part of this branch.

- **Script:** [`research/reader-decisions-2026-10-29/apply.mjs`](../research/reader-decisions-2026-10-29/apply.mjs)
  makes every data change from the base commit `024a6e5` (release v0.12.0) and
  can be re-run.
- **Before-snapshot:** [`reader-decisions-before-2026-10-29.json`](reader-decisions-before-2026-10-29.json),
  first in the chain in `src/editorial/historical-views.ts`.
- **Release:** v0.12.1, a patch: 1 claim and 2 evidence records added, 2 claims
  changed, 2 collection definitions changed. Schema version unchanged (2.20);
  see "Open decision" below.
- **Editorial state:** every record remains a seed. No human review is claimed.

## 1. EU AI Act dates of application (data)

| Record                         | Change                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `aia-art113-chapter-v-applies` | Added. Art. 113, third paragraph, point (b): "Chapter V (general-purpose AI models) applies from 2 August 2025". A statement of the Regulation dated 2025-08-02, basis effective. Two evidence records: the Art. 113(b) passage (25 words, the same passage as the exception record) and the heading of Chapter V ("GENERAL-PURPOSE AI MODELS", 4 words, context) for the gloss. The source's quoted words go from 722 to 751 of its 800. |
| `aia-art113-general-date`      | Filed as a date: provision kind `threshold` → `statement`; dated 2026-08-02, basis effective, instead of the publication date 2024-07-12. The qualification no longer says that the entry-into-force date "is not recorded"; it has been recorded since 2026-10-28 (`fl-eu-aia-art113-entry-into-force`).                                                                                                                                 |
| `aia-art113-chapter-v-date`    | The exception's label glosses Chapter V: "Chapters III (Section 4), V (general-purpose AI models), VII and XII and Article 78 apply from 2 August 2025, except Article 101". It stays dated by publication.                                                                                                                                                                                                                               |

Both quotations were re-matched on 2026-10-29 against a fresh direct retrieval
of the Official Journal text from the Publications Office's Cellar repository
(SHA-256 `8f0b6563…721a`, the same as the frameworks-to-law admission's
retrieval; EUR-Lex returned an empty response). The general date's quotation
("It shall apply from 2 August 2026.") matched as well.

**Validation.** A stated provision was dated only by its edition's own
publication, effective or revision date. A provision that sets its own date of
application may now also be dated, with basis `effective`, by a day that one of
its supporting verbatim quotations from the same document writes out ("2 August
2025"). The rule is in `src/domain/schema.ts`. No field was added.

**Timeline.** The frameworks-and-law timeline lists a document's stated dates
(stated provisions dated as effective), so it now shows 2025-08-02 and
2026-08-02 for the EU AI Act beside 2024-08-01 (entry into force, computed). A
row for a stated date of kind `statement` names its provision ("Date stated in
the text: Chapter V (general-purpose AI models) applies from 2 August 2025"),
so the two EU rows can be told apart; other rows keep their label. The page's
orientation paragraph on binding texts adds that the chapter on these models
applies from 2 August 2025, a year before the general date, with both records.

## 2. China scope note (interface text)

One paragraph under "Chinese AI histories" on the Institutions hub and the same
paragraph in About's "Not yet covered" (`src/reading/china-scope.ts`). Its
counts come from the records (`chinaScope` in `src/domain/landing.ts`): the
Chinese dossiers, the three Chinese AI governance texts with the number of
TC260 versions, and the Chinese texts on the frameworks-and-law page. The same
function fails the build if a governance text moves onto that page, if the
China section disappears, or if the GB 45438 held note is removed.

Statements checked against the data:

- The seven dossiers: DeepSeek, Alibaba / Qwen, Zhipu AI, Moonshot AI, MiniMax,
  Baidu / ERNIE, ByteDance Seed.
- The governance texts: TC260's AI Safety Governance Framework (versions 1.0,
  2.0, 3.0), the AI Industry Alliance's AI Safety Commitments (December 2024),
  Shanghai AI Laboratory's Frontier AI Risk Management Framework (v1.0). None is
  an instrument on the frameworks-and-law page.
- Chinese developers' own frameworks: the only framework edition published by a
  Chinese developer in the records is Shanghai AI Laboratory's, which recommends
  practices to general-purpose AI developers. No Chinese company's own safety
  framework is recorded; their own statements on safety work are in records of
  reports, announcements and a prospectus (for example the Kimi K2 report's
  red-teaming section, MiniMax's prospectus, ByteDance Seed's Alignment &
  Preparedness announcement). A unit test checks the framework count. The
  frameworks-and-law page's China note said "Chinese developers' own frameworks
  are recorded on their own document pages"; it now names Shanghai AI
  Laboratory's framework instead.
- GB 45438-2025: its scope is held on the frameworks-and-law page
  (`gb-45438-scope`); its publication is recorded.
- Export controls: the only records are the US Bureau of Industry and
  Security's AI diffusion rule (its publication and its export control on model
  weights) and its announced rescission. The bureau's 2024 reporting proposal is
  not an export control.

The About page's earlier sentence ("Two Chinese collections … with three
Chinese AI governance texts") is unchanged.

## 3. RSP grid: AI R&D row note (collection definition)

The document-history collection can now carry a note on one row of a family's
provision grid (`rowNotes`). The Anthropic RSP's "Automated R&D threshold" row
reads: "v2.0 to v2.2 also have a capability threshold for “Autonomous AI
Research and Development”, which this row does not yet track. See each
edition's document page." It links v2.0, v2.1 and v2.2. The note rests on the
comparison cells `cmp-rsp-v2-0-d1-autonomy`, `cmp-rsp-v2-1-d1-autonomy` and
`cmp-rsp-v2-2-d1-autonomy`, which stay on the comparison page and are not
exported with the history.

**Later data change (not made here):** key the v2.0–v2.2 thresholds to the
provision `rsp-automated-rd-threshold`, as the policy-change row already does
across renamed wordings. That needs new provision records quoting each edition
and a cross-family check before admission. Remove the row note when it lands.

## 4. "named as a financial backer of" (interface label)

A record whose statement says only that a party is named as a financial backer
shows the route label "named as a financial backer of"; the predicate
`investment_announced` is unchanged. Every `investment_announced` statement was
read:

| Record                                                                   | Statement                                                                            | Label                                                                                            |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| `cn-high-flyer-backing`                                                  | Liang Wenfeng publicly identified High-Flyer as one of DeepSeek's financial backers. | Changed to "named as a financial backer of"                                                      |
| `softbank-stargate-2025`, `openai-stargate-2025`, `oracle-stargate-2025` | "… was named as an initial equity funder of Stargate."                               | Kept: the statement names an equity funding role in an announcement, which is more than a backer |
| Six Microsoft and Amazon records                                         | An announced investment, with an amount or a stated commitment                       | Kept                                                                                             |

The override is one entry in `relationLabelOverrides` (`src/domain/predicates.ts`).
Every display of a route label and the Markdown export use `relationLabel`; the
blank review pack (`src/editorial/seed-review.ts`) keeps the predicate's label so
that stored packs reproduce. A unit test fails if another
`investment_announced` statement names a financial backer without the label.

## Open decision

The widened dating rule changes what validation accepts but adds no field, so
it was released as a patch under the task's instruction. If it should count as
a schema change, the release becomes v0.13.0 with schema 2.21; nothing else
depends on the number.

## Checks

- `node research/reader-decisions-2026-10-29/apply.mjs`: reproduces the
  stored data from `024a6e5` (1 claim and 2 evidence added, 2 claims changed).
- `pnpm -s validate:data`: valid (1,073 entities, 3,043 claims, 905 sources,
  3,957 evidence).
- `pnpm -s check` (format, lint, typecheck, 69 unit test files / 650 tests,
  build of 4,018 pages): passed. A first run failed one suite: a row-note check
  threw on a historical dataset view; the check moved into the unit test.
- `pnpm release 0.12.1`, then `pnpm release 0.12.1 --check`: reproduces byte
  for byte. README coverage block regenerated with `pnpm docs:coverage`.
- `pnpm -s check:privacy`: passed.
- Browser: new spec `tests/browser/reader-decisions.spec.ts` (4 tests: both EU
  dates on the timeline, the RSP row note and its link, the China note on the
  hub and in About, the backer label on the claim page). Full suite through an
  untracked Playwright config without the Edge channel (deleted afterwards):
  221 passed (18.5 min). The changed views were also inspected at 1440 and
  390 px wide: no horizontal overflow, no console errors apart from the
  analytics beacon, which the test fixtures stub.
- Style self-check (`docs/style-guide.md`) on the touched reader text: no
  banned words or em-dashes; matches of "key" are identifiers only.
