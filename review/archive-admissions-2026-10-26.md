# Archive admissions of 2026-10-26: decision record

**Status: applied on branch `archive-admissions-2026-10-26`; not merged.** On 2026-10-26 the maintainer authorised two data changes on the strength of the blind cross-family archive check [`research/archive-checks-2026-10-26/codex-report.md`](../research/archive-checks-2026-10-26/codex-report.md) (items 6 and 12–16), and nothing else. The same day the maintainer revised the dataset versioning rule and set this release as **v0.7.2** (below).

All dataset records remain seeds. Schema unchanged at 2.16. Nothing was published, deployed or tagged.

## Decisions

1. **Admit the five Adept records held back on 2026-10-17** (see the "Held back" section of the [genealogy admission record](genealogy-admission-2026-10-17.md)). They were held back only because Adept's 2022 launch post could not be read a second time; the cross-family check read it in a Wayback Machine capture and found all five supported.
2. **Stargate** (`source-oracle-stargate-2025`): extend the quotation of `openai-oracle-capacity-2025` through "in the U.S." and record the same-day capture as the source's archived copy. Claims `openai-abilene-use-2025` and `abilene-nvidia-gb200-2025` (items 7–8) unchanged beyond the source's archived copy.
3. **Versioning rule** (the maintainer's follow-up decision of 2026-10-26): patch = corrections and small additions within existing collections; minor = a new collection or a schema change; major = 1.0, per the roadmap's version policy. Applied in [`docs/dataset-format.md`](../docs/dataset-format.md#versions). Earlier releases keep their numbers; under the previous rule ("records are added" → minor) this release would have been v0.8.0.

## Evidence basis

The web.archive.org copies could not be re-fetched from the environment that applied these changes. Every changed or added evidence note says that its passage rests on the cross-family check's capture read of 2026-10-26.

| Capture                                                                                                                                        | Read for         | Report items |
| ---------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | ------------ |
| [2022-04-26 16:02:16 UTC](https://web.archive.org/web/20220426160216/https://www.adept.ai/post/introducing-adept), "Introducing Adept AI Labs" | Adept records    | 12–16        |
| [2025-07-22 11:51:19 UTC](https://web.archive.org/web/20250722115119/https://openai.com/index/stargate-advances-with-partnership-with-oracle/) | Stargate passage | 6            |

The captured Adept post is the original expression, at `/post/introducing-adept` under the title "Introducing Adept AI Labs". The pack read a later expression at `/blog/introducing-adept`, titled "Introducing Adept", through the reader relay on 2026-10-15. The source record keeps the pack's title and address and records the capture as its archived copy, with both titles in its version line; no byte equivalence is claimed. The pack's paragraph numbers follow the later layout, so the locators now name the paragraphs as they open in the capture, as the report advises.

## Records added

Source `lg-src-deal-adept-intro-2022` (David Luan, Adept, 2022-04-26; archived copy 2022-04-26). No `retrievalRoute` is set on the five passages: the schema's routes (direct, reader relay, X syndication) do not describe an archive-capture read, and adding one would be a schema change, which was not authorised. The note says how each passage was read.

| Claim                                   | Predicate    | Evidence (type, locator)                                                                                                                     | Time                                                             |
| --------------------------------------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| `lg-deal-luan-cofounded-adept`          | `co_founded` | paraphrase, anchor "my cofounders Ashish Vaswani and Niki Parmar"; second body paragraph and paragraph beginning "True general intelligence" | unknown; launch date is the announcement date, not incorporation |
| `lg-deal-vaswani-cofounded-adept`       | `co_founded` | quote (7 words); second body paragraph                                                                                                       | unknown; as above                                                |
| `lg-deal-parmar-cofounded-adept`        | `co_founded` | quote (7 words); second body paragraph                                                                                                       | unknown; as above                                                |
| `lg-deal-luan-google-prior`             | `held_role`  | quote (10 words); paragraph beginning "These breakthroughs"                                                                                  | unknown; tenure dates not stated                                 |
| `lg-deal-luan-openai-engineering-prior` | `held_role`  | quote (15 words); paragraph beginning "The Transformer"                                                                                      | unknown; tenure dates not stated                                 |

Evidence IDs are the pack's (`lg-ev-deal-…`), checked 2026-10-26, machine-checked, no human review. Quotations are the pack's and match the report's. Quoted words from the source: 32 of a limit of 85 (855-word document).

Changes from the pack's wording, none of them to substance:

- Time notes state the report's date qualifications: the launch date is not an incorporation date; the dates of Luan's prior roles stay unknown.
- Pronouns not taken from a source were removed. The Luan statements now read "names Ashish Vaswani and Niki Parmar as the author's cofounders and announces that they are starting Adept", "of having joined Google…" and "of having led Engineering at OpenAI…". The Vaswani and Parmar qualifications name the person instead of using a pronoun.
- The Vaswani qualification's record-ID cross-reference became prose (the reader-text rule of 2026-10-15): "Adept's June 2024 update does not name which co-founders joined Amazon, so whether Vaswani was among them is not established."
- The two prior-role qualifications add that the post's date (Google) and the GPT model names (OpenAI) do not date the role (report items 15–16).

## Records changed

| Record                                          | Field                   | Before                                                        | After                                                                               |
| ----------------------------------------------- | ----------------------- | ------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| evidence `evidence-openai-oracle-capacity-2025` | passage                 | "… 4.5 gigawatts of additional Stargate data center capacity" | "… capacity in the U.S." (20 words)                                                 |
|                                                 | checkedAt               | 2026-10-15                                                    | 2026-10-26                                                                          |
|                                                 | note                    | relay-only check                                              | the same, plus the extension, its basis in the capture read and the agreement stage |
| source `source-oracle-stargate-2025`            | archivedUrl, archivedAt | none                                                          | the 2025-07-22 capture                                                              |
|                                                 | version                 | inspection note                                               | the same, plus the archived copy and its read                                       |

Quoted words from the Oracle source: 49 of a limit of 49 (496-word document). The notes of items 7–8 still say that the 2026-10-15 re-check found no capture; that remains true of that re-check and was not changed. `data/meta.json`: one sentence added to the scope.

## Procedure

- Before-snapshot `review/archive-admissions-before-2026-10-26.json` (base `14dcc39`, release v0.7.1): earlier metadata, the 11 added IDs and the 2 changed rows. First in the chain in `src/editorial/historical-views.ts`; the historical-views test reproduces every earlier dataset.
- `src/domain/genealogy-admission.test.ts`: the five held-back records are now expected absent from the pre-admission view and present in the dataset, recorded 2026-10-26, without a retrieval route.
- Regenerated: README coverage block (`pnpm docs:coverage`); `review/essay-starter-gaps.md` was already current (`pnpm question:gaps`).
- Release v0.7.2 by `pnpm release 0.7.2 --date 2026-10-26`: 11 added (5 claims, 5 evidence, 1 source), 2 changed (1 evidence, 1 source), 0 removed against v0.7.1. `pnpm release 0.7.2 --check` reproduces it byte for byte. No ZIP, no tag.
- The genealogy admission record's "Held back" section points here; its table is kept. The roadmap's genealogy entry and change log point here.

## Checks

Run on this branch after the last data change:

- `pnpm install --frozen-lockfile`: clean.
- `pnpm -s check` (format, lint, typecheck, 58 test files with 520 tests, build): passed. It includes the historical-views test, which reproduces every earlier dataset from the snapshot chain. Three tests that count the claims added by each increment (`transactions`, `versions`, `research-path`) were extended to count this admission's records with the genealogy's.
- `pnpm -s check:privacy`: passed.
- `pnpm release 0.7.2 --check`: reproduces byte for byte.
- `pnpm test:browser`, using Chromium at `/opt/pw-browsers` through an untracked config without the Edge `channel` line: **149 passed**, on a trial build with analytics off through `SELEKOA_SITE_CONFIG` (a scratch copy of `site.config.json` with `analytics.provider` set to `none`). Against the default production build the suite fails on the known Cloudflare Web Analytics issue (since #62): the beacon's requests from `http://127.0.0.1:4173` fail CORS and the no-console-errors assertions catch them (85 failures before that run was stopped at its time limit; the one inspected was this error). `site.config.json` is unchanged.
