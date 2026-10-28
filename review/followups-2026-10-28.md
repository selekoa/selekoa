# Follow-ups of 2026-10-28

The maintainer's decisions of 27 October 2026 applied two cross-family machine reports and two pending corrections. [`apply.mjs`](../research/followups-2026-10-28/apply.mjs) made every data change in one run. The rows it added and the rows it changed, as they were, are in [`followups-before-2026-10-28.json`](followups-before-2026-10-28.json), the first entry in the chain of `src/editorial/historical-views.ts`. Patch release **v0.10.1**.

All records remain seeds. No person has reviewed them.

## Decisions (maintainer, 2026-10-27)

1. Apply the blind cross-family re-check of Meta's Frontier AI Framework v1.1 ([report](../research/frontier-framework-comparison/codex-meta-v1-1-2026-10-27.md)) to the comparison cells, in the pack and in the data. Adopt a verdict that differs from the stored status only where it follows from Rule B and `scope.md` as worded; keep the stored status where the difference needs judgement, and list it as open.
2. Admit Katja Grace and her two held authorship records (A037, A091) on the identifying source of the cross-family identity check ([report](../research/author-persons/codex-identity-2026-10-27.md)), with “KatjaGrace” as an alias.
3. Fix the date discrepancies of A010, A057 and A096 on the document records, keeping the date kind and precision and saying which source gives which date.
4. Record that the AI Magazine 2006 identity source is now cross-family checked (supports).

## Decisions (maintainer, 2026-10-28)

On the three Meta v1.1 cells that the first application kept as “Not checked”:

5. **D4 board or external oversight: “not found”.** Involving third parties “where appropriate” in an uplift assessment (Table 1, footnote 7, PDF p. 13) is not a role in overseeing or reviewing decisions. It is recorded as context in the not-found note, as for Google DeepMind FSF v1.0.
6. **D7 public or external reporting: “stated”**, on the §2.2 passage (PDF p. 9), with “plan to” in the note. This is consistent with “aim to” and “may publish” elsewhere.
7. **D8 revision process and approval: “stated”**, on the §5.1 passage (PDF p. 19), with “no approval body or interval named” in the note. This is consistent with FSF v1.0 and v2.0 and xAI FAIF 2025 and June 2026.

`apply.mjs` carries these as adopted cells and was re-run from the v0.10.0 state, so every change of both decisions comes from one run.

## 1. Meta Frontier AI Framework v1.1

The re-check retrieved the raw replay of the Internet Archive capture of 2025-02-13 (HTTP 200, `application/pdf`; decoded PDF 14,652,734 bytes, SHA-256 `9fa301df…cc21`), read all 21 pages, and matched all eight carried quotations on their recorded pages. It wrote its verdicts before opening the stored cells. This session could not reach the archive or the publisher (connection reset; HTTP 500), so the new cells rest on the re-check's quotations and locators, and the paraphrases were written from those quotations. Each evidence note says so.

**Confirmed: “Recorded, not re-checked” removed (4 cells).** D2 named levels, D2 how a threshold is defined, D3 pause and D4 determination are now “stated”. Evidence `checkedAt` is 2026-10-27, and each note names the re-check. The re-check found that the D2 paraphrases left out Table 1's conditions: the High row also says the model does not enable any identified sufficient scenario, and the Critical row also says the risk cannot be mitigated in the proposed deployment context. Both paraphrases now give them. D2 how a threshold is defined gains a third paraphrase, of the general definition on PDF p. 12, which the re-check cites as direct support.

**Adopted: from “Not checked” to a stated or not-found cell (13 cells).** Ten take the re-check's verdict; for three, where the re-check proposed “stated, partly”, the status is the maintainer's decision of 2026-10-28.

| Question                                       | Now       | Why it follows from Rule B and `scope.md` as worded                                                                                                                                                                                                                      |
| ---------------------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| D1 chemical, biological, radiological, nuclear | Stated    | The criterion asks for any of the four; chemical and biological weapons are named (PDF p. 15).                                                                                                                                                                           |
| D1 cyber operations                            | Stated    | A named domain with outcomes (PDF p. 14).                                                                                                                                                                                                                                |
| D1 autonomy, AI R&D                            | Stated    | Autonomous cyber operations are a tracked enabling capability (PDF p. 14). The scope is narrow, within the cyber domain, but Rule B makes narrow scope a note, not “partly”. Consistent with Meta's v2.0 cell, where enabling capabilities inside a domain are “stated”. |
| D1 persuasion or manipulation                  | Not found | Whole edition read, five stems searched, hits set aside: scams and grooming sit within cyber harm. Same treatment as Microsoft FGF 2025 (social engineering within cyber).                                                                                               |
| D1 other named domains                         | Not found | Whole edition read, five stems searched; deception concerns the reliability of evaluations, not a tracked domain.                                                                                                                                                        |
| D3 safeguards required                         | Stated    | Threshold-specific access and security measures (Table 1, PDF p. 13); conditional applicability is a note.                                                                                                                                                               |
| D5 evaluation timing                           | Stated    | Timing is stated; “typically” is kept in the paraphrase and the note.                                                                                                                                                                                                    |
| D6 conditioned on other developers             | Not found | Whole edition read, six stems searched; the hits are scope tests, baselines or barriers, which the D6 boundary ruling records as context.                                                                                                                                |
| D6 other exceptions or discretion              | Stated    | “insofar as is technically feasible and commercially practicable” qualifies the Critical security protections (Table 1, PDF p. 13).                                                                                                                                      |
| D7 internal reporting                          | Stated    | Documented mitigation strategies and residual risks feed internal review (PDF pp. 7–8); the criterion accepts internal records.                                                                                                                                          |
| D4 board or external oversight                 | Not found | Decided 2026-10-28. Third parties involved “where appropriate” in the uplift assessment (Table 1, footnote 7, PDF p. 13) have no role in overseeing or reviewing decisions; recorded as context, as for FSF v1.0. Six stems searched.                                    |
| D7 public or external reporting                | Stated    | Decided 2026-10-28. §2.2 (PDF p. 9), “plan to continue sharing”; “plan to” is in the note, as “aim to” (FSF v2.0–v3.1) and “may publish” (xAI FAIF 2025) are.                                                                                                            |
| D8 revision process and approval               | Stated    | Decided 2026-10-28. §5.1 (PDF p. 19); “no approval body or interval named” is in the note, as for FSF v1.0 and v2.0 and xAI FAIF 2025 and June 2026.                                                                                                                     |

D8 stated changes stays “Does not apply”: the re-check confirms the first-edition statement (PDF p. 5).

**Other changes.**

- The collection definition (`src/reading/framework-comparison.ts`, version 3) lists no cell as not checked. The “Not checked” legend keeps its v0.10.0 wording.
- The page's legend now lists only statuses that some cell carries, so neither “Recorded, not re-checked” nor “Not checked” appears. Both statuses stay in the schema.
- Quoted words for the edition rise by two short passages (D3 safeguards, D6 discretion), within the limit (validation passes).
- The edition's provision records (`prov-meta-faf-v1-1-*`), whose passages the re-check also matched, are unchanged. Their notes still give the check of 2026-10-03.
- **Pack.** The Meta cells in `pack.json` and `paraphrases.json` now carry the re-check's passages with their source, the D2 quotations in full, and a `recheck` note; for the three decided cells the note names the re-check's proposal and the decision. `pack.md` was re-rendered. The pack's legend no longer lists “R”. `scope.md` and the pack README record the re-check.

## 2. Katja Grace

- **Person record** `katja-grace`, subtype Author, as prepared in the pack, with the alias “KatjaGrace”. Identity sources: the two target posts and a new source, `source-grace-2020-atari-early`. That source is the LessWrong post “Atari early” (2 April 2020). Its header credits the account “KatjaGrace”, and its body ends “By Katja Grace”. It carries no claim evidence and quotes nothing. Its record says the check read the current page on 2026-10-27 with no archive capture, and that the date the full-name line was added is not established.
- **Authorship records** A091 (“Superintelligence reading group”, 2014-08-31) and A037 (“Superintelligence 11: The treacherous turn”, 2014-11-25), following the Christiano precedent. Each statement says the post credits the username “KatjaGrace”. The passage quotes the username in the “by” line, as the identity check inspected it, with the author link to `/users/katjagrace`. The qualification names the identifying post.
- **Held list.** `research/author-persons/admission-held-2026-10-27.json` no longer lists Grace or her two records. It still holds Butler's 1865 article and Christiano's “Takeoff speeds” (A105).

## 3. Document dates

The record dates are unchanged in value, kind and precision. Each document record, source record and authorship record now says which source gives which date.

| Item | Document                                                          | Record date | Sources of the dates                                                                                                                                                                                                                              |
| ---- | ----------------------------------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A010 | Bostrom, Extropians message                                       | 1996-09-04  | The archive's receipt line, “Wed Sep 4 10:09:44 1996 MST”, and the archive's 1996 volume give the date. The garbled sent header ends “04 Sep 95”, and nothing else supports it. The receipt line was re-read in a direct retrieval on 2026-10-27. |
| A057 | Moravec, “Human Culture—A Genetic Takeover Underway”              | 1989        | The year of the printed chapter, from the author's publication list. The inspected file and its 2001 capture date the text July 1988, now the source's `versionDate` (1988-07). No 1989 printing was inspected.                                   |
| A096 | Moravec, “Today's Computers, Intelligent Machines and Our Future” | 1979-02     | The Analog issue (99, no. 2), from the author's publication list. The inspected page and its 2001 capture print “July 21, 1976” and “this version 1978”, now the source's `versionDate` (1978). The printed issue was not inspected.              |

The Moravec pages could not be re-fetched in this session (TLS chain error), so A057 and A096 rest on the identity check's reading of 2026-10-27.

## 4. AI Magazine 2006 identity source

`source-aimag-2006-dartmouth-proposal` now records the cross-family check of 2026-10-27, which found that it supports the names. The publisher PDF (Wiley), printed p. 12, prints “John McCarthy, Marvin L. Minsky, Nathaniel Rochester, and Claude E. Shannon” beneath the title, and p. 14 repeats the names. The middle initials are not expanded. The source's date (2006-12-15, from the AAAI record) differs from Wiley's 1 December 2006. This is recorded, not adjudicated.

## Release and history

- Before-snapshot `review/followups-before-2026-10-28.json`, first in the chain. The historical-views test reproduces v0.10.0's data exactly. `transactions.test.ts` and `versions.test.ts` list its added claims.
- **v0.10.1 (patch):** 33 added, 26 changed, 0 removed (1 entity, 15 claims, 16 evidence and 1 source added; 3 entities, 7 claims, 11 evidence, 4 sources and the comparison collection changed). There is no schema change and no new collection. `pnpm release 0.10.1 --check` reproduces it byte for byte.
- Regenerated: README coverage block (`pnpm docs:coverage`), `review/essay-starter-gaps.md` (`pnpm question:gaps`, dataset date only), `pack.md`.
- Two browser expectations changed. The Meta v1.1 comparison steps now expect “Stated”, “Not found” and, on D4 oversight, “Not found” with no “Not checked”. The example of a document without an authorship record is now Christiano's held “Takeoff speeds”.

## Checks

- `pnpm install --frozen-lockfile`; `pnpm -s validate:data`: valid (1,009 entities, 2,864 claims, 844 sources, 3,664 evidence records).
- `node research/frontier-framework-comparison/admit-paraphrases.mjs --check`: no problems on the Meta v1.1 cells. Without the ignored text cache it reports 80 messages on other editions, the same before and after this change.
- `pnpm -s check`: format, lint, typecheck, 618 unit tests passed, build and pre-render of 3,795 pages.
- `pnpm -s check:privacy`: passed.
- `pnpm release 0.10.1 --check`: reproduces byte for byte.
- `pnpm test:browser` (Chromium, through an untracked copy of the Playwright configuration without the Edge channel, deleted afterwards): 206 passed.

## Open for the maintainer

1. The new cells rest on a single cross-family reading, and the paraphrases were written from its quotations, not from a fresh copy of the edition. A re-read from a session with archive access would close this.
2. The AI Magazine date difference (2006-12-15 against 1 December 2006) is recorded and not adjudicated.
