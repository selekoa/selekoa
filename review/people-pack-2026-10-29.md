# People pack (executives and single-record authors), 2026-10-29

The candidate pack is in [`research/people/`](../research/people/README.md). It serves two backlog items in the [roadmap](../docs/roadmap.md): the executives pass and single-record authors. **Nothing was admitted.** `data/`, the application, the schema and the releases are unchanged. Claude prepared the pack and ran its same-family audit ([audit.md](../research/people/audit.md)). The cross-family check (GPT, via Codex) has not been run, and no person has reviewed the pack.

## Counts

The counts are the pack's, taken against `main` at `024a6e5`.

|                                       |                                                                                               |
| ------------------------------------- | --------------------------------------------------------------------------------------------- |
| Candidate records                     | 83: 35 `held_role`, 36 `authored`, 5 `co_founded`, 7 `states_position` (a proposed predicate) |
| Proposed person records               | 37: 7 executives, 30 authors                                                                  |
| Existing person records gaining roles | 13: Zuckerberg, plus 12 persons who had no role record                                        |
| Candidate documents                   | 6 signed statements                                                                           |
| Candidate records in all              | 126 (83 records, 37 persons, 6 documents)                                                     |
| Authors listed as printed names       | 164 of the 194 single-record authors                                                          |
| Sources                               | 65; 133 quotations checked mechanically, with no problems                                     |

The prompt aimed at about 150 candidate records, and the pack falls short. Most single-record authors are credited on large team papers: the Qwen report has 46 such authors, AlphaFold 29, Chinchilla 17, InstructGPT 12 and LLaMA 11. Only a sample of these names was searched. Many personal and faculty pages also either refused or did not list the paper.

## What is in

- **Executives** (from SEC EDGAR filings, SoftBank Group's officer pages and NVIDIA's newsroom):
  - Sundar Pichai: Google and Alphabet chief executive, Alphabet director.
  - Satya Nadella: chief executive from 4 February 2014, chair from the announcement of 16 June 2021, and two earlier roles.
  - Mark Zuckerberg: chief executive from July 2004, chair from January 2012.
  - Jensen Huang: founder, president, chief executive and director since 1993.
  - Masayoshi Son: founder and chairman and CEO; Stargate chairman as announced.
  - Lawrence J. Ellison: founder; chief executive 1977–2014; chair 1995–2004; executive chair and chief technology officer from 17 September 2014.
  - John L. Hennessy: Alphabet's chair since January 2018.
  - Eddie Yongming Wu: Alibaba's chief executive and director since September 2023, co-founder, and technology director in 1999. The dataset's Chinese records name him.
- **Signed statements** (authorship plus what the text says):
  - Pichai's AI principles post (2018).
  - Nadella's statements on the OpenAI board (November 2023).
  - Nadella's 2025 shareholder letter, which includes his capacity figure.
  - Zuckerberg's "Personal Superintelligence" (2025).
  - Son's chairman's message on artificial superintelligence.
  - Hennessy's 2026 chair's letter on AI oversight and infrastructure.
- **Existing persons:**
  - Western: Warner (CEO) and Kant (CTO) at Poolside; Steinberger (CEO) at Magic; Qiu (CEO) and Albrecht (CTO) at Imbue; Giannandrea (SVP) at Apple; Muehlhauser (Anthropic board); Ghemawat (Google Senior Fellow); Yudkowsky (MIRI co-founder).
  - 01.AI: Huang Huiwen (COO), Shen Pengfei (vice president of sales) and Ma Jie (areas of responsibility).
- **Authors:** 30 persons with one authorship record each and an identifying second source.
  - 17 rest on a page the person controls (homepage, CV, résumé or signed post).
  - 13 rest on the publisher's or employer's own publication page.

## Who is out, and why

- **164 printed names.** Each has a reason in `pack.md`: a large team credit that was not searched individually; no second source located; a page refused; the page does not list the paper; a Usenet or mailing-list sender; a pen name; a same-name page belonging to someone else (William Saunders); or variant name forms (Michael I. Jordan).
- **Allan Dafoe is held.** The byline he shares with two others belongs to the announcement post, which the dataset groups with the framework PDF under `fsf-2024`.
- **Chinese heads without a primary role source:** Liang Wenfeng, Wang Xiaochuan and Yang Zhilin.
- **Heads that the dataset's Chinese records do not name:** Robin Li (Baidu), Pony Ma (Tencent), Liang Rubo (ByteDance) and Joseph C. Tsai (Alibaba's chairman).
- **Existing persons whose records rest only on reporting:** fourteen, including McGrew, Fedus and Pang.
- **No signed statements located for Huang or Ellison.**
- **Excluded from every filing:** ages, birth dates, family members and shareholdings.

## Retrieval failures

The pack lists 25 failures. The main ones:

- openai.com, abc.xyz, investor.nvidia.com and oracle.com refused (HTTP 403). Filings on EDGAR were used instead, and SoftBank's copy of the Stargate announcement.
- web.archive.org was not reachable.
- Baichuan's and DeepSeek's sites render by script and served no officer listing.
- Open Philanthropy and several faculty pages refused.
- DeepMind's publication pages were not found at the addresses tried.

## Open questions for the maintainer

1. **The proposed predicate `states_position`.**
   - Question: the seven statement records put what a signed text says on this predicate (document → literal). Admit them on it, map them to `discusses` with a concept, or hold them?
   - _Recommended:_ admit the six authorship records and their documents on existing predicates first. Hold the seven `states_position` records for a schema decision in a later minor release, as the frameworks-to-law pack did for its proposed predicates.
2. **Open intervals.**
   - Question: is a role with a start and no end acceptable under "never extrapolate a past role into the present"?
   - _Recommended:_ yes, as here, with the note naming the latest document that states the role. The interface should read "from … (stated in <document>, <date>)", never "present".
3. **Names as printed.**
   - Question: NVIDIA's filings print "Jen-Hsun Huang" and its newsroom "Jensen Huang". Oracle's filings print "Lawrence J. Ellison" and its press releases "Larry Ellison". Which form becomes the record name?
   - _Recommended:_ use the company's own executive-page form where one was retrieved (Jensen Huang) and the filing's form otherwise (Lawrence J. Ellison). Keep the other form as an alias, resting on the companies' parallel texts, and let the cross-family check confirm them.
4. **Mark Zuckerberg's subtype.**
   - Question: change it from Researcher to Executive?
   - _Recommended:_ yes. Every role record he has is an executive or board role.
5. **Publisher pages as identity sources.**
   - Question: thirteen authors rest on Meta's or Google Research's own publication page, which is an institutional page but not independent of the byline. Accept them?
   - _Recommended:_ accept them, with the note as written. Those pages confirm that the institution credits the name. If independence is wanted, hold these thirteen.
6. **The person's own pages.**
   - Question: does a homepage or CV on a personal domain count as "another authored text"?
   - _Recommended:_ yes, where the page is headed with the person's name and lists the document by title. Record it as the person's own statement.
7. **Splitting the FSF announcement.**
   - Question: should the 2024 announcement post (bylined Dragan, King and Dafoe) become its own document record?
   - _Recommended:_ yes, in a later correction. Then admit Dafoe on his research page and leave the Acknowledgements' "under the leadership of" out of authorship.
8. **As-of snapshots.**
   - Question: how should an undated page be dated?
   - _Recommended:_ by the earliest retrieval with identical bytes (01.AI, 15 October 2026); where bytes differ, by this pass's retrieval (Imbue, and Poolside's byline block).
9. **Widening the Chinese heads.**
   - Question: Baidu's and Alibaba's filings would give dated roles for Robin Li and Joseph C. Tsai, but the dataset's records do not name them. Widen the rule?
   - _Recommended:_ yes, in a separate bounded pass that adds the heads of every Chinese developer the dataset covers, each from a filing or prospectus.
10. **Writer records and roles.**
    - Question: the author-person pack's Writer records have no roles. Should institutional pages now give them roles (for example, Nate Soares as MIRI's President)?
    - _Recommended:_ yes, in a later pass, from the institution's own page only. A printed byline affiliation is still never a role.
11. **Pen names and list senders.**
    - _Recommended:_ keep them as printed names. Propose a record only where the person's own page or a later signed text claims the message, and only with a maintainer decision on recording pen names.
12. **Run the cross-family check** ([brief](../research/people/cross-family-input-2026-10-29.md), 116 items) before any admission, as the editorial policy requires.
    - Part A is blind: all 40 role and founding records and 33 identity items.
    - Part B is direct: all 7 statement records and all 36 authorship records.

## Checks run

- `pnpm install --frozen-lockfile`.
- `node research/people/tools.mjs verify`: 133 quotations, no problems.
- Merge structural checks: no problems.
- Prettier on the task-owned files.
- `pnpm -s check:privacy` before every push.

No data, schema or UI file was changed, so `pnpm check` and the browser tests were not required.

## Maintainer decisions (2026-10-30)

All recommended answers to the open questions above (1–12) are adopted as written. Admission still waits for the cross-family check and its adjudication; where the check changes the basis of a recommendation, the admission task lists it for the maintainer instead of applying it.

## Adjudication of the cross-family check (maintainer, 2026-10-30)

The check (`research/people/cross-family-check-2026-10-29.md` on branch `codex/people-check`: 103 agree, 13 partly) is accepted. Apply at admission:

1. Nadella's chair: the evidence gives the date's kind (the announcement of 16 June 2021); an effective date only where a text states one.
2. Remove the letter's "no date" qualification; the letter is dated.
3. Name forms: link "Jen-Hsun Huang" / "Jensen Huang" and "Lawrence J. Ellison" / "Larry Ellison" as aliases through the companies' own texts that print both.
4. Every other partial finding that follows from the check as worded; hold and list anything that needs judgement.

Admission waits for stage c2 of the data-loading design.
