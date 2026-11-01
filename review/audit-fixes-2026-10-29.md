# Audit fixes of 2026-10-29

The maintainer adopted every recommendation of the [dataset consistency audit](dataset-audit-2026-10-29.md) on 2026-10-29, together with four follow-ups to the frameworks-and-law guide ([record](flagship-frameworks-law-2026-10-29.md)). This record says what changed, by decision, what was held and why, how the audit's findings moved, and which checks ran.

- **Script.** [`research/audit-fixes-2026-10-29/apply.mjs`](../research/audit-fixes-2026-10-29/apply.mjs) makes every data change, starting each run from the dataset as stored at `be2e9e4` (release v0.11.0), so a re-run gives the same rows. The subtype mapping is in [`subtypes.mjs`](../research/audit-fixes-2026-10-29/subtypes.mjs) beside it. Run `node research/audit-fixes-2026-10-29/apply.mjs`, then Prettier on the data files.
- **Before-snapshot.** [`audit-fixes-before-2026-10-29.json`](audit-fixes-before-2026-10-29.json), first in the chain of `src/editorial/historical-views.ts`: the earlier metadata, the IDs added, the rows changed and removed as they were, and the earlier row order. `revert()` now restores removed rows; the historical-views test reproduces the v0.11.0 dataset from it exactly.
- **Removals.** Fourteen released IDs are removed, each with its reason in `release/removals.json` and in the release changelog.
- **Release.** v0.12.0, a minor release: schema 2.20 and one new collection. 7 records added, 1,043 changed, 14 removed against v0.11.0; 1,073 entities, 3,042 claims, 3,955 evidence records, 905 sources, 10 collections.
- **State.** No proposition changed what it states, except the two re-dated publications (B1). All records remain seeds; no evidence record became human-reviewed. New evidence is machine-checked.

## What changed, by decision

### Group (a)

- **A1.** The six Trammell–Korinek revision records name the 2023 source by its dataset ID in their attested-date notes, and the two Trammell–Korinek sources name each other by ID in their version notes. The Gans qualification reads “(Gans 2018, NBER Working Paper 24352; not a source record)”: qualifications must name no record ID (`reader-text.test.ts`).
- **A2.** The `us-ai-safety-institute` description now says that its dated names record the June 2025 re-establishment as CAISI; reorganisation and legal continuity remain unrecorded.
- **A3.** `source-wh-factsheet-2024-07-26` removed: no evidence used it and it identified no record.
- **A4.** “Describes … as” in the three paraphrases (`lg-ev-cn-tang-jie-zhipu-cofounder-glm`, `lg-ev-mx-bansal-msl-2025`, `lg-ev-mx-chang-msl-2025`; each note records the rewording) and in the statement of `ec-m09-acemoglu-restrepo-2019-wrong-kind-of-ai-b`.
- **A5.** All 69 records of the 32 identical-statement groups now name what separates them, outside parentheses: the list and the date (and, where two messages share a day, the archive message number) of a mailing-list message; “The NBER working paper” or “The Journal of Economic Perspectives article”; the October 2023 version or the April 2026 revision; the February 2025 or February 2026 edition of Microsoft's framework; whose part of a shared report a record is (Candela and Weng; Cubuk and Fedus); and, for proposition records that share a passage, the proposition each is recorded against.
- **A6.** One printed form per linked publisher, with the form printed on the expression and its hosting route moved to `version` (79 sources): the eleven publishers of the audit, and seven that C11 linked whose sources printed them several ways (Google, Baidu, MiniMax, TC260, Windsurf, xAI, Meta). A printed form that is one of the publisher's dated names stays: a 2018 page printed “Facebook”.
- **A7.** The 2026 revision's short name reads “Trammell and Korinek, Economic Growth under Transformative AI (2023, revised 2026)”.

### Group (b)

- **B1 (by C6).** Both posts and both arXiv version-1 pages and title pages re-read on 2026-10-29. `xm-llama-publication` is re-dated from 2023-02-24 (Meta's post) to 2023-02-27 (arXiv version 1), and `atlas-deepmind-chinchilla` from 2022-04-12 (DeepMind's research account) to 2022-03-29. Each gains one machine-checked evidence record from the paper's arXiv expression (`evidence-xm-llama-publication-arxiv-v1`, `evidence-atlas-deepmind-chinchilla-arxiv-v1`); the post stays as evidence and its date is in the time note. Meta's post now links the arXiv record; what it linked on 24 February 2023 is not recorded, and the time note says so.
- **B2.** The agenda's PDF (re-read 2026-10-29) states no date; only its file metadata gives 27 July 2016, which is not a stated date. `lineage-ii-yudkowsky-agenda` keeps the year, and its time note now says why; the day remains the announcement's (`lineage-ii-miri-published-agenda`).
- **B3.** `source-meta-aasf-v2` confirmed: the framework's change log dates version 2.0 “April 7, 2026”, and the publication date is that of the capture of 8 April 2026, as its version note says. No change. The two Moravec files are held (see below).
- **B4 (with C5).** Seven sources of one expression merged into the earlier ID. Each pair was compared once: the same address, title and document, and for the Aghion pair the same SHA-256. The kept record takes the later record's publisher link, archive copy, document length and access date, and its version note records both inspections; the evidence of the other now cites the kept ID. The pooled quotation counts stay within each limit.

  | Kept                                          | Merged into it and removed                 |
  | --------------------------------------------- | ------------------------------------------ |
  | `source-atlas-openai-leadership`              | `source-openai-leadership-transition-2023` |
  | `source-atlas-openai-return`                  | `source-openai-new-initial-board-2023`     |
  | `source-eval-i-claude2-card`                  | `source-eval-ontology-i-claude2-card`      |
  | `source-eval-i-gpt4-card`                     | `source-eval-ontology-i-gpt4-card`         |
  | `source-eval-i-metr-name`                     | `source-eval-ontology-i-metr-name`         |
  | `source-eval-i-spinout`                       | `source-eval-ontology-i-spinout`           |
  | `source-aghion-jones-jones-2017-nber-capture` | `source-aghion-jones-jones-2017-nber`      |

- **B5.** Held (see below).
- **B6.** No merge. The journals' full texts could not be retrieved, only their abstract pages: the Acemoglu–Restrepo abstracts are word for word the same, the Agrawal–Gans–Goldfarb abstracts differ in one phrase (“automating prediction” in the working paper, “the automation of prediction” in the journal). The journal records' descriptions now say that each is the journal version of the working paper and why the two stay separate works.

### Conventions (c)

The conventions are recorded in `docs/ontology.md` (“Document statements and audit conventions”).

- **C1.** `us-ai-safety-institute` retyped to `public_body`. Schema 2.20 lets a public body be the subject of `evaluation_engagement` and the object of `held_role`, which its four engagement records and one role record need. `technology-innovation-institute` stays an organisation; `cncert` is held under B5.
- **C2.** 609 subtypes normalised to closed lists (organisations 89, public bodies 26, documents 215, persons 279). The audit's organisation list gained five kinds for records that fit none of its kinds (Company, Business unit, Governance body, Industry association, Response centre), and the person list gained Board member. Persons: “Author” became “Writer” (the credited author of recorded texts; no occupation implied); “Institutional actor” became Executive, Board member or Researcher from the roles the records give, with 45 decided by hand from the records' roles and descriptions (listed in the script): 39 whose roles name no title the rules read, such as co-founders without a title, and six whose later leadership titles the rules would have read first. Three qualifications that descriptions did not already state moved to them; the others were already there. `european-parliament-and-council` drops “(as legislators)” from its name, which its description states.
- **C3.** Two pairs migrated, because the sources describe a renaming of one body: `facebook-company` into `meta` (the announcement says that the corporate structure is not changing) and `codeium` into `windsurf` (“officially rebrand our company”; the post also dates Exafunction, 2021, and Codeium, by 2022). Each kept entity carries dated names and the former names as aliases; the name-transition records `xm-meta-name` and `lg-deal-codeium-renamed-windsurf-2025` and their evidence are removed, and every reference to the merged entity now names the kept one (`xm-fair-facebook` now places FAIR in `meta`, dated 2018, when the company was named Facebook). Two pairs stay two entities: see below. Codeium is now a dated name of Windsurf, so the alias stays.
- **C4.** The five stance-bearing IDs are kept and listed in `docs/ontology.md`; `docs/dataset-format.md` tells release readers that the suffix is historical. The audit reports them as information.
- **C5.** Applied through B4 and B6.
- **C7.** `ny-ch96-effective-date`: the time note says that the date was scheduled at the time of recording (2026-10-11).
- **C8.** No evidence re-dated. The re-inspection records do not say that the twelve passages were re-checked on 2026-10-04: the atlas OpenAI passages were not (week 4c added new quotations), and the cross-model check of the nine RSP assessment passages names two retrieval days without dating each passage. Under C8 a passage keeps its last check date, so the audit now reports checks before a later access as information (22, ten of them from the B4 merges, whose kept records take the later access date).
- **C9 (schema 2.20).** `states_provision` may be recorded on any document with an exact expression, with the new kind `statement`. **17** records were migrated, keeping their IDs; the audit's summary said 16, its findings list 17. Each now has the document as subject, a short label as object and `attributes.provision = { kind: 'statement', key }`; its qualification records the change. Six sources now name the document they are the exact expression of (the MiniMax licences and prospectus, the Kimi K2 and K3 licences, the Kimi K2 report). Two GOV.UK records dated by their publication now carry basis `publication` rather than `announcement`, and the two Kimi K3 licence records, dated by the commit that dates the file, carry an event with basis `revision` rather than a snapshot.
- **C10.** Four chamber entities (`california-state-senate`, `california-state-assembly`, `new-york-state-senate`, `new-york-state-assembly`) are the subjects of the five vote records; the two legislatures stay for enactment-level records and as publishers.
- **C11.** 213 sources gain `publisherId` where the printed publisher names one institution whose expression the source is; for “OpenAI”, `openai`. 38 stay unlinked: 37 X posts (a hosting platform) and one legal filing.
- **C12.** Recorded in `docs/ontology.md`; no ID renamed.

### Frameworks-and-law follow-ups

- The July 2023 White House commitments show “Second round recorded”, not “Later version recorded”: an instrument may set `laterVersion: 'second-round'` in the guide's definition, and the projection, legend and unit test follow. The record is unchanged.
- `/question/frameworks-to-obligations` is titled “Frontier-AI frameworks and legal obligations, 2023–2026: what changed in developers’ self-governance and in the law?” (definition version 2; same ID and address). The README and `docs/research-references.md` describe it in the same terms; `review/essay-starter-gaps.md` is regenerated.
- The guide is registered as a release collection of the new kind `guide` (`guide/frontier-frameworks-and-law`), which makes this a minor release. `docs/dataset-format.md` lists the kind, and `compare`, which it had not listed.
- Page title, standing labels and the `/guide/` prefix are kept.

## Held, and why

| Item                                                         | Why                                                                                                                                                                                                                                                  |
| ------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| B3: `source-moravec-1979-analog-html`, `-1989-takeover-file` | The author's archive at frc.ri.cmu.edu did not answer from this session (retrieval failed on 2026-10-29). Their version notes already record the dates the files print (“this version 1978”, “July 1988”) and where the publication dates come from. |
| B5: `cncert`                                                 | cert.org.cn could not be reached, so no source stating its status was read; it stays an organisation and its description still asserts no legal status.                                                                                              |
| B6: two working-paper and journal pairs                      | Only the journals' abstract pages could be retrieved; no merge without comparing the texts.                                                                                                                                                          |
| C3: `arc-evals` and `metr`                                   | Re-read 2026-10-29: the announcement adopts the name and says that “ARC Evals staff will transition to the new METR entity once it has been formed”, which describes a new body. Two entities and the name-transition record stay.                   |
| C3: `xai` and `spacexai`                                     | No retrieved source states that xAI was renamed: the post states that an account is now @spacexai, and the context record has Musk write that xAI will be dissolved as a separate company. Two entities stay.                                        |
| C8: twelve evidence check dates                              | The records do not show a re-check of these passages on 2026-10-04 (above).                                                                                                                                                                          |
| C9: claims for `uk-ai-security-institute`                    | The migration records the two GOV.UK texts' statements on the documents; the institute is named in them and in its dated names but is still the subject of no claim. A `launched` record would be a new claim; it is left for a data task.           |

## Audit findings before and after

`pnpm audit:consistency` re-run on the fixed data. Before: the audit of v0.11.0 ([JSON](dataset-audit-2026-10-29.json)). The audit code now also checks the closed subtype lists and reads conventions C3, C4, C7, C8 and C11 and fix A4, so some findings remain but at information level.

| Check       | Before | After | Medium before → after | Low before → after |
| ----------- | -----: | ----: | --------------------: | -----------------: |
| Duplicates  |     32 |    24 |               17 → 10 |              9 → 8 |
| Types       |     53 |    11 |                19 → 2 |             30 → 0 |
| Dates       |     29 |    36 |                 4 → 0 |             16 → 4 |
| Orphans     |     14 |    15 |                 1 → 0 |              1 → 1 |
| Evidence    |    181 |   180 |               10 → 10 |            56 → 56 |
| Wording     |     55 |    55 |                 5 → 0 |            22 → 21 |
| Identifiers |     18 |     9 |                14 → 0 |              2 → 2 |
| Overlaps    |     55 |    12 |                 0 → 0 |             37 → 4 |
| **Total**   |    437 |   342 |               70 → 22 |           173 → 96 |

No finding is high before or after. Information-level findings rose from 194 to 224.

**Closed:** `content-recorded-as-publication` (10 → 0, C9); `event-date-conflicts-document` (2 → 0, B1); `same-event-conflicting-dates` (1 → 0, B1); `source-same-work-twice` (10 → 3, B4; the three left are the distinct expressions the audit said should stay); `source-unused` (1 → 0, A3); `prose-names-missing-id` (9 → 0, A1); `identical-statement` (32 → 0, A5); `same-pack-duplicate` (1 → 0) and `same-key-distinct-statements` (18 → 8, A5 and C9); `publisher-name-variants` (11 → 0, A6); `qualified-subtype` (6 → 0), `role-relative-subtype` (4 → 0), `subtype-variants` (10 → 0) and medium `subtype-vocabulary` (3 → 0, C2); `name-collision` (3 → 2, C3: Codeium); `government-body-as-organisation` (3 → 2, C1); one low `evaluative-word` (a subtype). **Moved to information by an adopted convention:** `evidence-checked-before-access` (C8), `id-states-other-stance` (C4), the five attributed priority words in four records (A4), `renaming-two-models` (C3), `scheduled-date-as-event` (C7) and `publisher-not-linked` (C11). The new `subtype-outside-list` check finds nothing.

**Still open:** the seven same-title document pairs (two held under B6; the rest distinct works, as the audit found), `cncert` (B5) and `technology-innovation-institute` (an organisation by C1), the ten quotation budgets near their limit (no fix proposed), the 56 short texts at their limit by construction, `uk-ai-security-institute` without a claim, and the low wording and overlap findings the audit listed for information.

## Checks

Run on the branch after the last data change unless stated.

- `node research/audit-fixes-2026-10-29/apply.mjs` re-run from the base commit, then Prettier: the data files are unchanged, so the script reproduces the stored rows.
- `pnpm -s validate:data`: valid, 1,073 entities, 3,042 claims, 905 sources, 3,955 evidence records.
- `pnpm -s check` (format, lint, typecheck, 642 unit tests, build and prerender of 4,017 pages): passed.
- `pnpm -s check:privacy`: passed.
- `pnpm release 0.12.0 --check`: reproduces byte for byte.
- `pnpm audit:consistency`: 342 findings, as above.
- Browser suite, through an untracked Playwright config using the session's Chromium instead of Edge (deleted afterwards): 203 of 209 passed on the first run. Four download checks failed only on the dataset fingerprint, because the build predated the last data change (the removal of an unsourced Meta alias), and the two Meta dossier tests expected the removed `xm-meta-name`; `tests/browser/xai-meta.spec.ts` now expects `xm-fair-facebook`. After a rebuild, the seven affected spec files (50 tests, including the document and frameworks-and-law pages) passed.
- The new document-page section was inspected in the built app for a licence and a GOV.UK release; the console showed only the blocked analytics request of a local preview.
