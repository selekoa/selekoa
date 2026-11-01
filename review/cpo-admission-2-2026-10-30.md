# Compute, power and orbit, part 2: admission, 2026-10-30

Part 2 of the admission of the candidate pack in [`research/compute-power-orbit/`](../research/compute-power-orbit/README.md): the schema change of decisions 1–5 and 11, and the records that need it. Part 1 is recorded in [cpo-admission-1-2026-10-30.md](cpo-admission-1-2026-10-30.md). Both follow the maintainer's decisions of 2026-10-28 in the [pack report](compute-power-orbit-pack-2026-10-28.md) and the corrections of the [cross-family check](../research/compute-power-orbit/cross-family-check-2026-10-28.md).

- **Script:** [`scripts/cpo-admission.ts`](../scripts/cpo-admission.ts) with `--part 2`, from the pack and the authored [map](cpo-admission-map-2026-10-30.json). `--part 2 --check` compares the result with the stored data. Its part 2 rules run only for a part with a schema version, so `--part 1 --check` still reproduces part 1 on the part 1 data.
- **Before-snapshot:** [`cpo-admission-2-before-2026-10-30.json`](cpo-admission-2-before-2026-10-30.json), first in the chain in `src/editorial/historical-views.ts`, before part 1's. Part 2 changes no existing row.
- **Fresh retrieval at admission:** every admitted quotation matched a direct retrieval of 2026-10-30 ([`admission-verification-2026-10-30.json`](../research/compute-power-orbit/admission-verification-2026-10-30.json), 404 quotations). The two that did not match belong to held records (ADA Space's homepage, which now serves a suspension notice).
- **Editorial state:** every record is a seed. No evidence is human-reviewed.

## Schema 2.21 (decisions 1–5 and 11)

- **Infrastructure (decision 1).** New entity fields `location` (country code, admin area and place, as the sources word them) and `operator` (each stated operator with a note; validation allows both only on infrastructure, and an operator must be an organisation or public body). Ownership is never inferred from operation.
  - Subtypes as decided: “Data-centre site”, “Data-centre campus”, “Spacecraft”, “Constellation”. The pack's clusters, programmes and zone take “Compute cluster” (already a dataset subtype), “Data-centre programme” and “Designated zone”.
  - 23 of the 32 new infrastructure entities have a location; one has stated operators (Stargate UAE: OpenAI and Oracle, “operated by OpenAI and Oracle”).
- **Figures (decision 2).** `quantity.measures` (`it_capacity`, `facility_power`, `grid_connection`, `generation_capacity`, `contracted_energy`, `chips`, `not_stated`) and `quantity.range` (`from`, `to`, with the value as its upper end). `unit` keeps the wording, so “gigawatt-scale” stays wording. The pack's free-text measures were coded by rule; a figure whose source does not say what it measures is `not_stated`. Meta's “1–4 GW” is a range. No figure is converted, summed or compared.
- **Stated dates (decision 3).** `attributes.statedDates` with the nine decided kinds. The pack's `deadline_stated`, `contract_end_stated`, `delivery_start_stated`, `selection_target` and `target_stated` became `deadline`, `contract_term`, `delivery_target` and `target_completion`. A date is stored at the precision the source gives; a phrase no precision expresses (“mid-2027”, “early 2030s”, “Q1 2027”) is `wording`, with the year where the phrase names one. The Inspector shows them as “Stated dates (targets and terms, not events)”; no stated date dates a record.
- **Predicates (decision 4).** `announced_site`, `status_stated` (merging the pack's `site_status_stated`, `operation_stated` and `programme_status_stated`), `power_agreement`, `supply_agreement`, `government_award`, `granted_equity_right`, `announced_plan`, `launch_stated`, `filed_application`, `regulator_decision`, `accepted_for_filing` and `designated_zone`. `convened` is not adopted: the UK AI Energy Council's meeting is a `published` record of the government's statement. `export_licence_requirement_stated` is not adopted (held, below).
  - Existing predicates widened: `plans_capacity` and `plans_infrastructure_spend` may name a group of sites as a literal or a site; `investment_announced` and `invested_in` may have a public body as investor.
- **Stages (decision 5).** `transactionStage` gains `letter_of_intent` and `term_sheet` (an announced investment may be at either); `awardStage` (`preliminary`, `final`, `disbursed`) belongs to government awards; `stageWording` keeps the source's words (“signed an agreement to explore”). An amount needs a transaction or an award stage.
- **Amount scopes (decision 11).** `project` and `programme`, with the stated basis in `scopeNote`. A plan for an identified site is a project; for a state, region, fund or several sites a programme; an investment in a company or a government award stays a transaction.
- **Terms as worded.** `power` (technology and mechanism), `supply` (product and units) and `term` (“20 years”), as the pack recorded them for the agreements decision 4 keeps apart.
- **Release format 1.8** adds the entity fields `location` and `operator` and their CSV columns `location_json` and `operator_json`. [dataset-format.md](../docs/dataset-format.md) and [ontology.md](../docs/ontology.md) describe the change.

## Counts as admitted

| Records  | Added | Changed |
| -------- | ----: | ------: |
| Claims   |   128 |       0 |
| Entities |    76 |       0 |
| Sources  |    91 |       0 |
| Evidence |   345 |       0 |

- **Claims:** 127 pack records and one added at admission. By predicate: `power_agreement` 19, `announced_plan` 17, `announced_site` 16, `plans_capacity` 12, `status_stated` 11, `plans_infrastructure_spend` 10, `supply_agreement` 9, `states_provision` 5, `government_award` 5, `investment_announced` 4, `regulator_decision` 4, `published` 3, `launch_stated` 3, `filed_application` 3, `granted_equity_right` 2, and one each of `designated_zone`, `accepted_for_filing`, `compute_capacity`, `invested_in` and `uses_hardware_from`. 50 carry stated dates and 50 a coded measure.
- **Topics:** compute 89, capital 22, governance 17.
- **Entities:** 32 infrastructure, 28 organisations, 10 public bodies and 6 documents.
- **Evidence:** 263 quotations, 11 of them in Chinese, and 82 paraphrases; 16 items were added at admission.

## Cross-family corrections

| Item     | Record                           | Correction                                                                                                                                                                                                                                                                                                                                      |
| -------- | -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 3        | Crusoe Abilene, energised        | Completion target: 2026, “by the end of 2026”, not December.                                                                                                                                                                                                                                                                                    |
| 4        | Crusoe's Microsoft campus        | First building: 2027, “mid-2027”, with no half-year coded.                                                                                                                                                                                                                                                                                      |
| 26       | Stargate Saline Township         | Construction start target: 2026, “early 2026”, not the first quarter.                                                                                                                                                                                                                                                                           |
| 65       | OpenAI–Broadcom collaboration    | Completion: 2029, “by the end of 2029”, not December; the start “second half of 2026”.                                                                                                                                                                                                                                                          |
| 34       | NRC, Crane                       | Now the NRC's own record: Amendment No. 307, dated 1 July 2026, approves the receipt and possession of new fuel and sealed neutron sources. The record says it is not a restart approval. Constellation's report of 6 August 2026 is context.                                                                                                   |
| 40       | Louisiana PSC, Order U-37425     | Dated by the order: decided on 20 August 2025; written order of 29 August 2025, effective immediately. The order was retrieved directly at admission (the check had read a capture).                                                                                                                                                            |
| 44       | FERC, Susquehanna                | Now FERC's own order issued on 1 November 2024 (189 FERC ¶ 61,078), rejecting the increase of co-located load from 300 to 480 MW, retrieved at admission. The press report is context, and the record is no longer press-only.                                                                                                                  |
| 58       | Shelby County permit 01156-01PC  | Issued on 2 July 2025; printed expiry 2 January 2027; fifteen turbines at 16.48 MW each, not summed. This rests on the check's reading of a capture (below).                                                                                                                                                                                    |
| 43, 45   | Talen–AWS sale, Talen–Amazon PPA | Talen's own releases replace the press as the supporting evidence: the sale release of 4 March 2024 (which does not name the buyer), the results of 14 March 2024 (which name AWS) and the PPA release of 11 June 2025. They rest on the check's reading of captures; the press passages remain as secondary context.                           |
| 116      | Three-Body, launch               | Held (below).                                                                                                                                                                                                                                                                                                                                   |
| 120, P94 | ADA Space “Xingsuan” group 02    | The pack's record is held; its operator paraphrase was not found again. A new record of LandSpace's release of 14 October 2026 states what that release says: eight ADA Space satellites among ten payloads on Zhuque-2E Y4, launched from Dongfeng, for computing, laser-link and radiative-cooling tests. It names no group-02 or Three-Body. |
| 115      | Starcloud-1, training            | The record keeps “Gemini” as the page says, and its qualification records that the same page embeds a congratulation naming Gemma. Not resolved.                                                                                                                                                                                                |
| —        | Stargate UK                      | Unchanged: the record already gives Nscale's “explore offtake” and the government's “take”, each attributed.                                                                                                                                                                                                                                    |
| —        | Three Chinese Three-Body records | Kept labelled press-only; each qualification says the check found no laboratory or operator text.                                                                                                                                                                                                                                               |

The other part 2 items agreed or found full support.

## Admission's own changes

- **Status records.** The pack's two `operation_stated` records (Axiom's ARCs, Starcloud-1's training) have the infrastructure as subject and the stated status as a literal, as `status_stated` requires. The Three-Body capacity record, which the pack gave as `compute_capacity` with a literal object, is a `status_stated` record of the constellation. The Three-Body composition record has the constellation as subject (`uses_hardware_from` takes infrastructure).
- **The US government and Intel.** Intel's announcement of the government's investment has the Department of Commerce as investor and Intel as object; the closing and the warrant keep their pack form.
- **Transaction typing.** Transaction predicates carry a type, an external relationship and a stage; spending and capacity plans have stage `planned`. The pack's types `power_purchase`, `supply`, `foundry`, `warrant` and `grant` were dropped, since their predicates now say what they are; `equity_stake` became `equity_investment`. An amount without a stage, such as the InvestAI fund or the North East zone's expected investment, has stage `announced`.
- **Quotations shortened.** Three short texts would have exceeded a tenth of their words: the EuroHPC page, Google's Duane Arnold release and Starcloud-1's page. Each keeps a short quotation and the rest is given by labelled paraphrase.
- **Dates.** Bases the schema lacks: `operational_stated`, `launch_stated` and `completion_stated` became `announcement`, with a note that the record is dated by the statement; `filing` has no basis and a note that the date is the filing date as the regulator lists it.
- **Subtypes.** The applications filed with the FCC are documents of a new closed subtype, “Regulatory filing”, added to `src/editorial/subtype-lists.ts`. Other pack subtypes were mapped to the closed lists (for example a utility or a reactor developer to “Company”, a federal regulator to “Government agency”).
- **Interface.** The Inspector shows a figure's measure, a record's stated dates and an infrastructure's location.

## Held

| Record                                      | Why                                                                                                                                                                                                                              |
| ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| NVIDIA H20 licence requirement (April 2025) | Decision 4 keeps `export_licence_requirement_stated` until a BIS letter or rule is retrieved; none was.                                                                                                                          |
| NVIDIA H20, no China sales (August 2025)    | As above.                                                                                                                                                                                                                        |
| ADA Space, Three-Body launch                | ADA Space's homepage now serves a suspension notice, so the operator's statement cannot be re-read. The launch of the first 12 satellites on 14 May 2025 stays recorded through the press report of the thousand-satellite plan. |
| ADA Space, “Xingsuan” group 02              | Replaced by the LandSpace record above.                                                                                                                                                                                          |

## Resting on the cross-family check

This admission could not reach the Internet Archive, Talen's investor site (HTTP 403) or Shelby County's address (HTTP 404). Four sources therefore rest on the check's reading of captures, and their evidence is labelled paraphrase, never quotation: Shelby County's permit, Talen's sale release, Talen's results of 14 March 2024 and Talen's PPA release. The NRC page, the FERC order, the LPSC order and LandSpace's release were read directly.

## Release

Dataset release **v0.14.0**, a minor release: the schema rises from 2.20 to 2.21 (docs/dataset-format.md, Versions). Release format 1.8. `pnpm release 0.14.0` against v0.13.0: 640 added, 0 changed, 0 removed.

## Tests changed

- `transactions.test.ts`, `versions.test.ts` and `research-path.test.ts` exclude part 2's added claims from their earlier counts.
- `framework-provisions.test.ts` expects schema 2.21.
- The README coverage block was regenerated (`pnpm docs:coverage`); `review/essay-starter-gaps.md` is current.

## Checks

- `pnpm tsx scripts/cpo-admission.ts --verify`: 404 quotations; the two not matched belong to held records.
- `pnpm tsx scripts/cpo-admission.ts --part 2 --check`: the stored records match the pack and the map.
- `pnpm -s validate:data`: valid (1,202 entities, 3,246 claims, 1,037 sources, 4,458 evidence records).
- `pnpm -s check`, run step by step: format, lint, typecheck, unit tests (670 passed) and build, with 4,294 pages pre-rendered.
- `pnpm -s check:privacy`: passed.
- `pnpm release 0.14.0 --check`: reproduces byte for byte.
- Browser tests, through an untracked copy of the Playwright configuration with the installed Chromium instead of Edge (deleted afterwards): 238 of 238 passed.

## Open for the maintainer

1. **Subtypes beyond the decided four:** “Compute cluster”, “Data-centre programme” and “Designated zone” for infrastructure, and the new document subtype “Regulatory filing”.
2. **Measures coded by rule.** The pack recorded what each figure measures in free text; the codes follow keyword rules (for example “co-located load” is `facility_power`). The free text is not kept; the unit wording and the qualification are.
3. **Sources read only by the check** (four, above) wait for a retrieval route to the Archive or the publishers.
4. **NVIDIA's H20 statements** wait for a BIS letter or rule, by decision 4.
5. **Terms beyond the decisions.** `power`, `supply` and `term` are schema fields that decision 4 implies but does not name.
