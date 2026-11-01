# Compute, power and orbit, part 1: admission, 2026-10-30

Part 1 of the admission of the candidate pack in [`research/compute-power-orbit/`](../research/compute-power-orbit/README.md): the records on existing predicates. It follows the maintainer's decisions of 2026-10-28, which adopt every recommended answer of the [pack report](compute-power-orbit-pack-2026-10-28.md), and the corrections of the [cross-family check](../research/compute-power-orbit/cross-family-check-2026-10-28.md). This branch brings in the pack and the check's report and JSON from `codex/compute-power-orbit-check`, which contains the pack branch.

- **Script:** [`scripts/cpo-admission.ts`](../scripts/cpo-admission.ts) builds the records from the pack and the authored [map](cpo-admission-map-2026-10-30.json). `--verify` matches every quotation in a fresh retrieval, `--part 1` writes the records and `--part 1 --check` rebuilds them and compares them with the stored data.
- **Before-snapshot:** [`cpo-admission-1-before-2026-10-30.json`](cpo-admission-1-before-2026-10-30.json), first in the chain in `src/editorial/historical-views.ts`. It lists the added IDs; part 1 changes no existing row.
- **Fresh retrieval at admission:** all 124 pack sources and five further texts were retrieved again on 2026-10-30 into the ignored cache, and all 134 admitted quotations matched ([`admission-verification-2026-10-30.json`](../research/compute-power-orbit/admission-verification-2026-10-30.json)). PDFs returned the pack's bytes; HTML pages differ in bytes, as dynamic pages do. The Internet Archive refused this admission's connections, so capture readings rest on the cross-family check.
- **Schema:** unchanged (2.20). Every record uses an existing predicate and existing attributes.
- **Editorial state:** every record is a seed. No evidence is human-reviewed and no human translation is claimed.

## Counts as admitted

| Records  | Added | Changed |
| -------- | ----: | ------: |
| Claims   |    75 |       0 |
| Entities |    53 |       0 |
| Sources  |    41 |       0 |
| Evidence |   156 |       0 |

- **Claims:** 70 pack records and 5 added at admission. By predicate: `articulates_proposition` 28, `states_provision` 17, `published` 11, `enacted` 5, `contests_proposition` 5, `bears_on_proposition` 4, and one each of `revoked`, `cites`, `cloud_terms`, `investment_announced` and `plans_infrastructure_spend`. All are explicit.
- **Topics:** governance 32, ideas 40, capital 2, compute 1.
- **Entities:** 33 documents, 11 propositions (concepts), 5 public bodies (MOFCOM, NDRC, NEA, the Governor of Texas, the Texas Legislature) and 4 organisations (Intel, TSMC, Starcloud, Thales Alenia Space). Closed subtypes from `src/editorial/subtype-lists.ts`.
- **Evidence:** 132 quotations, 14 of them in Chinese, and 24 paraphrases; 21 items were added at admission.

## Which records are in part 1

The rule applied: a pack record is in part 1 if its predicate exists and every attribute it carries fits the current schema. Records that need part 2's fields stay for part 2 even where their predicate exists:

- `quantity.measures` (every capacity figure, among them all `plans_capacity` records and the `compute_capacity` records, including the Anthropic–NVIDIA capacity and the Three-Body capacity);
- `statedDates` (targets, deadlines and terms, including three government-text records: EO 14141's federal sites, the DOE letter to FERC and the 2024 data-centre plan's green-power target);
- an amount's `scopeNote` and the `project` and `programme` scopes (every other spending plan and investment);
- the `letter_of_intent` stage (the NVIDIA–OpenAI intent to invest);
- infrastructure subtypes, `location` and `operator` (the Three-Body hardware record, whose subject is a constellation).

The US government's equity investment in Intel as Intel announced it also waits for part 2: its counterparty is a government, which `investment_announced` does not take, and decision 4's `granted_equity_right` covers the closing.

**This departs from the task's description of part 1** in one respect: it named `compute_capacity` and `uses_infrastructure` records. The pack has no `uses_infrastructure` record, and its two `compute_capacity` records both carry a figure that needs `quantity.measures`, so both move to part 2.

In part 1:

- **Government texts and provisions (18):** EO 14141 (issue, Sec. 4(h)(ii)), EO 14299 (Secs. 4(a) and 4(c)), EO 14318 (issue, revocation of EO 14141), Proclamation 11014, Texas S.B. 6, the UK AI Opportunities Action Plan's Recommendation 4, the 2024 data-centre plan's issue, the 2026 AI–energy plan (issue, Task (1)), and the MOFCOM announcements 23/2023, 46/2024, 61/2025 and 70/2025.
- **Export-control rules (14):** the BIS rules of October 2023, December 2024, January 2025 (foundry due diligence), January 2026 and July 2026, and the GP10 guidance of May 2025, each with its publication record and one or more provisions; and one `cites` record that links the foundry rule to the dataset's AI diffusion rule.
- **Compute and capital (3):** Anthropic's Azure commitment, NVIDIA's announced investment in Intel, and TSMC's announced Arizona investment as the White House release states it.
- **Arguments about compute in orbit (40):** a new collection (below): 33 pack records, 4 records of earlier texts added at admission, and the publication records of the ASCEND results, the Lumen white paper and the Suncatcher paper.

## Decisions applied

- **Decision 6, the orbital arguments:** a new propositions collection in the thought spine, “Arguments about compute in orbit” ([`src/reading/orbital-compute.ts`](../src/reading/orbital-compute.ts)), with a “How we searched” note that states both searches and their bounds. Two groups: reasons given (O1–O5) and limits and objections (O6–O11).
  - **Codes:** the schema's proposition code is one capital letter and digits, so the pack's OC1–OC11 are stored as O1–O11; the collection's limits say so. Widening the code pattern would be a schema change and is left to the maintainer.
  - **Usual names:** the pack's search terms are not stored as usual names, so no record holds the earliest-located-term role. The terms were search aids, not names the texts use for the propositions.
  - **Roles:** the pack's `supporting` role is the schema's `articulation`. A proponent's statement of a limit that the pack marked both earliest located and contesting keeps only its earliest-located role, since an articulation cannot also be contesting. Context records name what they lack.
  - **Attested date of the Lumen white paper:** the cover prints September 2024, and the check found an Internet Archive capture of 24 December 2024 byte-identical to the copy read for the pack and at admission. The seven Lumen records carry that capture as the date their wording is attested from. No earliest-located role changes because of it.
- **Decision 9, the diffusion rule's rescission:** kept as an announcement; no record changes it. The check's RIN, docket and phrase searches through 29 October 2026 found no formal rescission rule, and the 2026 enforcement statement says so in its qualification.
- **Decision 12, earlier texts:** applied below.
- **Decision 13, order:** part 1 admits no proposed predicate.

## Cross-family corrections

| Item | Record                              | Correction                                                                                                                                                                                                                                                                                                                                                  |
| ---- | ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 71   | BIS UAE rule, enforcement statement | The statement now gives the A:5 and A:6 exclusions, the ultimate-parent headquarters condition, and the retained UAE licence requirement with its exceptions (UAE Government entities and listed approved commercial entities). Two quotations from the same paragraph, 91 FR 43036, were added. The qualification says that this is not a rescission rule. |
| 49   | EO 14299 Sec. 4(a)                  | The statement and qualification now give the geographic limit (the 48 contiguous States and the District of Columbia), “where appropriate” for the designation and “as appropriate and consistent with applicable law” for the electrical infrastructure. Two quotations were added.                                                                        |
| 93   | Lumen white paper, O6 (radiators)   | The radiator comparison's locator is PDF p. 3, not p. 8.                                                                                                                                                                                                                                                                                                    |
| 110  | Marcy, O11                          | The paraphrase's locator names the title block and the Introduction on PDF p. 1, not the abstract.                                                                                                                                                                                                                                                          |
| —    | BIS foundry rule, link              | The pack's context passage (“a rule related to this IFR”) is now the evidence of a `cites` record from the foundry rule to the AI diffusion rule. The publication record's qualification points to it.                                                                                                                                                      |

The other corrections of the check (date precision, the regulator records, the Talen releases, ADA and LandSpace, Starcloud's “Gemini” and “Gemma”, the Stargate UK wording and the paraphrase not found) concern part 2 records.

## Earlier orbital texts (decision 12)

Each text the check located was applied against its proposition's criterion as worded. Each change of an earliest-located role is a correction under the editorial policy and is listed on the collection page, with the replaced headline kept on record.

| Proposition                 | Earlier text                                                                                 | Applied                                                                                                                                                                                                                                                                                                                  |
| --------------------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| O3, terrestrial constraints | Periola and Kolawole, publisher abstract (online 11 March 2019)                              | **Held as a lead.** This admission could not read the abstract: the publisher's page answers with a cookie redirect, which was not worked around. The check's reading suggests the abstract states the proposition. The Lumen white paper keeps the role; its qualification and the collection's gaps name the lead.     |
| O7, radiation               | Kolasinski, “Effects of space radiation on electronic microcircuits” (NASA-hosted, May 1989) | **Admitted, earliest located.** The criterion as worded asks only that radiation in orbit disrupt computing hardware and need mitigation. The paper describes upsets in computer memories in orbit and hardening; it says nothing about placing compute in orbit, and the record says so. Lumen becomes an articulation. |
| O8, no repair               | ESPI Report 98 (19 November 2025)                                                            | **Admitted, earliest located**, three days before the Suncatcher paper, which becomes an articulation. Dated by the report page; the PDF prints November 2025.                                                                                                                                                           |
| O9, cost                    | ESPI Report 98 (19 November 2025)                                                            | **Admitted, earliest located**, with its architecture-specific conditions and its own conclusion that feasibility is likely if conditions improve. Turyshev's preprint becomes an articulation.                                                                                                                          |
| O10, ground links           | ASPLOS 2020 paper on orbital edge computing                                                  | **Held as a lead.** The author's host failed certificate verification here and the ACM copy answered HTTP 403. Suncatcher's post keeps the role; its qualification and the collection's gaps name the lead.                                                                                                              |
| O11, sky and debris         | Aili, Choi, Ong and Wen, Nature Electronics Perspective (attested 25 November 2025)          | **Admitted, earliest located**, on the debris and atmospheric element. The author-hosted proof read at admission has the SHA-256 of the capture the check opened. The Lincei comment becomes an articulation.                                                                                                            |
| O6, heat rejection          | The same Perspective                                                                         | **Unchanged, as decided.** The candidate is named in the earliest record's qualification and in the collection's gaps.                                                                                                                                                                                                   |
| O1, O2, O4, O5              | none verified                                                                                | The qualifications now state both searches' bounds.                                                                                                                                                                                                                                                                      |

The new records are dated as follows: Kolasinski by the proceedings' catalogue month in NASA's Technical Reports Server (no printed day); ESPI by its report page; the Perspective by the publisher's online date as the check read it (this admission did not read the publisher page), with its wording attested from the capture.

## Admission's own changes

- **Provision kinds.** The pack's `names_ai_compute`, `eligibility` and `date` are not schema kinds. They become `statement`, except EO 14299 Sec. 4(c), a direction with a goal (`required_action`), and the gallium and germanium licensing requirement (`required_action`).
- **Date bases.** `issuance` becomes `publication`, with a note that the date is the date of issue and that no signing event is shown, as in the frameworks-to-law admission. `revocation` becomes `signature` (EO 14318's). Each provision is dated by one of its text's own dates; executive order provisions by their Federal Register publication, with the signature in the note.
- **Transactions.** The pack's `cloud_commitment` and `equity_stake` types are `cloud_services` and `equity_investment`, with an external relationship. TSMC's plan is a literal amount with stage `planned`, the stage the dataset gives every spending plan; the White House release remains its only source.
- **Quotations shortened or given by paraphrase.** Two Chinese quotations over 50 characters (the AI–energy plan's Task (1) and Announcement 61's Article 4) were shortened, with the rest quoted separately or paraphrased. Three short texts would have exceeded their limit of a tenth of their words: MOFCOM 46/2024 (225 words), MOFCOM–GAC 70/2025 (76 words) and the White House TSMC release (201 words). Each keeps a short quotation, and the rest is given by labelled paraphrase.
- **Families.** A document's version family may not reuse a document ID, so families are named without the year (for example `us-bis-uae-rule`) or with `-family`.
- **Reader text.** Record IDs in the pack's wording became “recorded separately”.
- **Language tags.** The pack's `zh` sources are tagged `zh-Hans`, as the frameworks-to-law and second Chinese admissions tag theirs (corrected on this branch after the first push, with v0.13.0 re-released; `framework-evidence.test.ts` leaves the pack's own Chinese sources out of its list, as it does the second Chinese collection's).

## Held

| Record                             | Why                                                     |
| ---------------------------------- | ------------------------------------------------------- |
| Periola and Kolawole (2019) for O3 | Abstract not retrievable at admission; listed as a lead |
| ASPLOS 2020 paper for O10          | Not retrievable at admission; listed as a lead          |
| The other 131 pack records         | Part 2: proposed predicates or part 2 fields (above)    |

## Release

Dataset release **v0.13.0**, a minor release: part 1 adds a collection (docs/dataset-format.md, Versions). `pnpm release 0.13.0` against v0.12.1: 326 added, 1 changed (the frameworks-and-law guide, whose computed list of enacted texts now includes the five `enacted` records).

## Tests changed

- `transactions.test.ts`, `versions.test.ts` and `research-path.test.ts` exclude part 1's added claims from their earlier counts.
- Browser: `tests/browser/dossier-count.ts` and the mobile cartography count in `cartography.spec.ts` exclude `cpo-` records, as they do the earlier admissions' (the Anthropic dossier gains the Azure commitment).
- `review/essay-starter-gaps.md` and the README coverage block were regenerated (`pnpm question:gaps`, `pnpm docs:coverage`).

## Checks

- `pnpm tsx scripts/cpo-admission.ts --verify`: 134 quotations, all matched in the fresh retrieval.
- `pnpm tsx scripts/cpo-admission.ts --part 1 --check`: the stored records match the pack and the map.
- `pnpm -s validate:data`: valid (1,126 entities, 3,118 claims, 946 sources, 4,113 evidence records).
- `pnpm -s check`, run step by step: format, lint, typecheck, unit tests (668 passed) and build, with 4,132 pages pre-rendered.
- `pnpm -s check:privacy`: passed.
- `pnpm release 0.13.0 --check`: reproduces byte for byte.
- Browser tests, through an untracked copy of the Playwright configuration with the installed Chromium instead of Edge (deleted afterwards): 235 of 238 passed. The three failures were the counts this part changes: the Anthropic dossier (two specs) and the mobile cartography claims list. After the fix the three affected spec files passed (14 tests).

## Open for the maintainer

1. **The two leads** (Periola and Kolawole for O3, ASPLOS 2020 for O10) need a retrieval this environment could not make. If either is read and qualifies, it replaces the current holder as a correction. Schema 2.16 can withhold a role meanwhile, by decision.
2. **O7's criterion.** The 1989 paper qualifies only because the criterion does not ask for an argument about compute in orbit. If the collection should count only texts about orbital computing, the criterion needs narrowing, and Lumen would return as earliest located.
3. **Codes O1–O11.** Keep, or widen the code pattern in part 2 to store OC1–OC11.
4. **Dates resting on the check.** The Perspective's online date (27 October 2025) and the Lumen and Perspective capture readings rest on the cross-family check, because this admission could not reach the publisher page or the Internet Archive.
