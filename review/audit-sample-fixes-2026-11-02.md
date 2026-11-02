# Cross-family audit sample and Turing 1951: maintainer decisions applied, 2026-11-02

Applies the maintainer's decisions of 2026-11-02 on two Codex reports, both
brought in unchanged:

- the blind cross-family audit sample,
  [`review/cross-family-audit-sample-2026-11-02.md`](cross-family-audit-sample-2026-11-02.md)
  (and `.json`; branch `codex/cross-family-audit-sample` at f31c55c): 120
  claims checked, 4 material errors and 13 minor slips;
- the Turing 1951 lead,
  [`research/turing-1951-lead-2026-11-02/report.md`](../research/turing-1951-lead-2026-11-02/report.md)
  (and `report.json`; branch `codex/turing-1951-lead` at 2570fe8).

Branch `audit-sample-fixes` from `main` at 4627aa9 (v0.26.0). Release
**v0.26.1** (patch): corrections and two records within an existing
collection; schema unchanged (2.29). Prepared by Claude; the two reports are
the cross-family (OpenAI) checks.

## Decisions applied

1. **The four material errors** are corrected to what the source supports.
   Each source was re-read in full on 2026-11-02 (the SL4 and Extropians
   archives and Popular Science, retrieved directly); the audit's passages
   and locators agree with those copies.
   - **Item 117, Y08.** The record now bears on Y08 instead of contesting it,
     and its earliest located contesting role is withdrawn with an
     `underRecheck` entry on `warning-signs-in-time` (reason: the cross-family
     audit of 2026-11-02, item 117). No record holds the role meanwhile.
2. **Minor slips.** Eleven of the thirteen are fixed as the audit proposes,
   each source re-read on 2026-11-02 except the Edge and Robohub pages of
   item 78, where the audit's dating is taken. Item 59's passage is quoted,
   with the same two slips, by an unsampled record of the same release
   (`aib-labs-iso-alphabet-subsidiary-2024`); validation requires identical
   passages to count once, so both are corrected. Two items need judgement
   and are held (below).
3. **Turing 1951.** `ht-w01-turing-c1951-heretical-theory` articulates W01
   from AMT/B/4, typescript p. 10, final sentence, dated c. 1951 by the
   archive's typescript (not by the 1996 printing); no earliest located role
   (Butler 1863 holds W01). The report reads AMT/B/5 as bearing on W01, so
   `ht-w01-turing-1951-can-digital-computers-think` records it as context,
   with what is missing. Both passages were re-read on the archive's scans on
   2026-11-02; each evidence note cites the report as the cross-family pass.
4. **Backlog.** The held items and the open follow-ups are in
   `docs/backlog.md` (D28), with a note that a Codex sweep of absence
   claims runs on branch `codex/absence-claims-sweep`.

## Before → after

| Item | Record                                                                                                                | Before                                                                                                                      | After                                                                                                                                                                                                                                                                   |
| ---- | --------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 80   | `rd-r06-pinker-2018-popsci-fear-robots` (qualification)                                                               | "…misread intelligence; it does not discuss systems produced by training."                                                  | "…misread intelligence. Among those scenarios it lists an AI that, 'if it had been trained on the concept of happiness with pictures of smiling faces', would tile the galaxy…; an earlier paragraph says that current programs are 'trained on millions of examples'." |
| 86   | `yk-y01-sl4-2002-05-03-yudkowsky-0205-3551-c` (statement, qualification)                                              | "…and that only the CFAI semantics would keep goals as the programmers understood them." Hedge: "It currently looks to me". | "…and that, for the kind of goals humans would craft, the CFAI semantics were the only way he knew of to create an AI that would implement those goals as the programmers originally understood them." Hedge adds "the only way I know of".                             |
| 119  | `yk-y11-sl4-2000-10-03-yudkowsky-0010-0125-c` (engagement, qualification)                                             | `contrary-only`; "States the contrary expectation without engaging any argument for gradual takeoff."                       | `engages-premise`; the qualification paraphrases the later section "Webmind's awakening": independent self-improvement in accelerated subjective time, prehuman to transhuman before observation and catch-up would matter. Contesting relation kept.                   |
| 117  | `yk-y08-extropians-1999-01-06-yudkowsky-0160-c` (predicate, statement, roles, qualification); `warning-signs-in-time` | `contests_proposition`; roles contesting, earliest-located; `contrary-only`                                                 | `bears_on_proposition`; role context, with `missing`; engagement removed; Y08's earliest located contesting headline under re-check (item 117), assigned to no other record. ID kept (decision C4; added to `keptStanceIds`).                                           |
| 2    | `lg-mx-lecun-ami-chair-2025` (evidence locator)                                                                       | Paragraph 2                                                                                                                 | Article body, paragraph 3                                                                                                                                                                                                                                               |
| 19   | `kp-cites-llama-paper-natural-questions-benchmark-question-answering-2019` (evidence locator)                         | "reference or mention by title"                                                                                             | References, Kwiatkowski et al. (2019), entry; also §3.2 Closed-book Question Answering                                                                                                                                                                                  |
| 28   | `rd-r06-belrose-pope-2023-ai-easy-to-control` (evidence 1 quotation)                                                  | `"alignment."`                                                                                                              | `“alignment.”`                                                                                                                                                                                                                                                          |
| 29   | `c2-bytedance-seed-20-model-card` (aliases evidence)                                                                  | `authors'`; Section 7                                                                                                       | `authors’`; PDF p. 58, Section 7                                                                                                                                                                                                                                        |
| 59   | `aib-labs-iso-founding-stated` (evidence 2, statement); also `aib-labs-iso-alphabet-subsidiary-2024`                  | PDF p. 1; `Alphabet's`                                                                                                      | PDF p. 2; `Alphabet’s` (quotation and statement)                                                                                                                                                                                                                        |
| 72   | `aib-labs-dm-2018-casp13-ranking` (evidence 1 quotation)                                                              | `We're`, straight quotation marks                                                                                           | `We’re`, curly quotation marks                                                                                                                                                                                                                                          |
| 73   | `th-ns-garcez-lamb-term` (time note)                                                                                  | Generic submission-date note                                                                                                | Says the date is arXiv v1's (10 December 2020) and the quotations are read in v2 (16 December 2020), whose title and abstract match v1 (re-read). The audit's alternative to adding a v1 source.                                                                        |
| 78   | `rd-r10a-brooks-2014-tool-not-threat` (date, note)                                                                    | 2014-11, "Date of posting."                                                                                                 | 2014; the Robohub repost of 11 November 2014 is a separate expression and does not date the Edge response.                                                                                                                                                              |
| 79   | `kp-states-lamda-language-models-dialog-applications-2022-2` (evidence quotation)                                     | `Transformerbased`                                                                                                          | `Transformer-based`                                                                                                                                                                                                                                                     |
| 112  | `ts-a1-shulman-2009` (date, note)                                                                                     | 2009-07-02                                                                                                                  | 2009-07; the conference ran 2–4 July 2009; the modified reprint is a separate, undated expression.                                                                                                                                                                      |
| 120  | `ts-a6-grace-2014-treacherous-turn` (evidence quotation, locator)                                                     | Two bullets joined by an unmarked "/"                                                                                       | The first sub-bullet alone: "First mover advantage implies the AI is in a position to do what it wants"                                                                                                                                                                 |
| W01  | `ht-w01-turing-c1951-heretical-theory`                                                                                | Not recorded on W01 (the sentence was recorded on A1)                                                                       | Articulates W01; c. 1951; no earliest located role.                                                                                                                                                                                                                     |
| W01  | `ht-w01-turing-1951-can-digital-computers-think`                                                                      | Not recorded on W01                                                                                                         | Bears on W01 (context); 1951, broadcast 15 May 1951 in the note.                                                                                                                                                                                                        |

Every corrected evidence record has `checkedAt` 2026-11-02 and a sentence
appended to its note naming the audit item and this record.

## Held: minor slips that need judgement

- **Item 22, `lg-cn-tang-jie-zhipu-cofounder`.** The audit could not locate
  the KEG/GLM account in the cited prospectus pages and proposes removing it
  from the qualification and withdrawing or replacing the second evidence
  item. The pack's retrieval of 2026-10-15 matched its anchor
  "KEG與唐傑博士". Removing evidence against an earlier match needs a re-read
  of the 504-page prospectus. The co-founder fact is unaffected.
- **Item 66, `kp-authored-quoc-le-…-2019`.** The audit finds July 2019
  unsupported. The same date is on every authorship record and the states
  record of the Natural Questions paper (ten records), and a record citing
  the paper is dated January 2019. The work's earliest expression should be
  settled once for the family, not for one record.

## Collections

| Collection                         | Version | Change                                                                                                                                                                                                                                                |
| ---------------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `propositions/yudkowsky-arguments` | 5 → 6   | Correction entry: Y08's earliest located contesting headline withdrawn (item 117).                                                                                                                                                                    |
| `propositions/risk-debate`         | 6 → 7   | No text change: Brooks’s Edge response (item 78) is now dated 2014, which moves it within the members’ date order.                                                                                                                                    |
| `propositions/machine-succession`  | 6 → 7   | Scope: texts before 1979 are Butler's letter and two Turing texts of about 1951. Venue entry for the two Turing texts; Butler entry no longer says the letter is the only text before 1979. Methods: the Turing report and the re-read of both scans. |

## Correction note (every changed record)

- **Claims changed (9):** `rd-r06-pinker-2018-popsci-fear-robots`,
  `yk-y01-sl4-2002-05-03-yudkowsky-0205-3551-c`,
  `yk-y11-sl4-2000-10-03-yudkowsky-0010-0125-c`,
  `yk-y08-extropians-1999-01-06-yudkowsky-0160-c`,
  `aib-labs-iso-founding-stated`, `aib-labs-iso-alphabet-subsidiary-2024`,
  `th-ns-garcez-lamb-term`, `rd-r10a-brooks-2014-tool-not-threat`,
  `ts-a1-shulman-2009`.
- **Claims added (2):** `ht-w01-turing-c1951-heretical-theory`,
  `ht-w01-turing-1951-can-digital-computers-think`.
- **Evidence changed (13):** `evidence-rd-r06-pinker-2018-popsci-fear-robots-1`,
  `evidence-yk-t01-s3`, `evidence-yk-t11-s1`, `evidence-yk-t08-e1`,
  `lg-ev-mx-lecun-ami-chair-2025`,
  `evidence-kp-cites-llama-paper-natural-questions-benchmark-question-answering-2019-1`,
  `evidence-rd-r06-belrose-pope-2023-ai-easy-to-control-1`,
  `c2-ev-bytedance-seed-20-model-card-aliases`,
  `evidence-aib-labs-iso-founding-stated-2`,
  `evidence-aib-labs-iso-alphabet-subsidiary-2024-1`,
  `evidence-aib-labs-dm-2018-casp13-ranking-1`,
  `evidence-kp-states-lamda-language-models-dialog-applications-2022-2-1`,
  `evidence-ts-a6-grace-2014-treacherous-turn`.
- **Evidence added (2):** `evidence-ht-w01-turing-c1951-heretical-theory-1`,
  `evidence-ht-w01-turing-1951-can-digital-computers-think-1`.
- **Entities changed (1):** `warning-signs-in-time` (`underRecheck`).
- **Collections changed (3):** as above.

Claim IDs are unchanged; no proposition changed, so no record is superseded.

## Method

`scripts/audit-sample-fixes-spec.py` builds
`review/audit-sample-fixes-2026-11-02.json`; `scripts/apply-recheck.ts`
applies it. Each patch names the value it replaces. `--verify` checks that
every quotation the spec relies on is in the audit or the Turing report.
Before-snapshot `review/audit-sample-fixes-before-2026-11-02.json`, first in
the chain in `src/editorial/historical-views.ts`.

## Points for the maintainer

- **AMT/B/5's date.** The new W01 context record follows the Turing report:
  dated 1951, with the broadcast of 15 May 1951 in the note, because the
  archive does not date the script's composition or annotations to that day.
  The older record of the same script, `ts-b6-turing-1951-context`
  (superintelligence collection), is dated 1951-05-15. Not changed here.
- **Y08 has no earliest located contesting text** until a re-check of its
  candidate texts. The audit suggests rechecking the bounded Y08 sequence
  before choosing one (backlog D28).
- **Sampling.** The audit is a sample; its 4 material errors in 120 do not
  certify the rest. Item 117's kind of error (a criterion mismatch on an
  earliest-located role) and items 80 and 119 (an absence claim the source
  contradicts) are the families the Codex absence-claims sweep addresses.

## Checks

On `audit-sample-fixes`:

- `python3 scripts/audit-sample-fixes-spec.py --verify`: passes.
- `pnpm tsx scripts/apply-recheck.ts --spec review/audit-sample-fixes-2026-11-02.json --check`:
  stored records match.
- `pnpm validate:data`: 2,133 entities, 5,832 claims, 2,013 sources, 7,952
  evidence.
- `pnpm audit:consistency`: no high findings. One new finding, the Y08
  record's `-c` suffix on a bears-on record, is recorded as kept by decision
  C4 (`keptStanceIds`, `docs/ontology.md`) and is now info.
- `pnpm docs:coverage`: block regenerated in `docs/development.md`.
- `pnpm check`: format, lint, typecheck, 914 unit tests, build, bundle
  budget (no limit raised; Search 273.9 of 275 KB).
- `pnpm release 0.26.1 --check`: reproduces byte for byte.
- `pnpm check:privacy`: passes.
- Browser suite: 325 of 325 passed (35.7 min, one worker), on Playwright's
  Chromium with a config outside the repository without the `msedge`
  channel, deleted afterwards; port 4173 free after the run.
