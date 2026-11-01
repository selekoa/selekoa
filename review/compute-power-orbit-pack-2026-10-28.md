# Compute, power and orbit: candidate pack, 2026-10-28

This report covers the candidate research pack in [`research/compute-power-orbit/`](../research/compute-power-orbit/README.md), prepared on branch `compute-power-orbit-pack` for roadmap backlog item B. Nothing was admitted: `data/`, the application, the schema and the releases are unchanged. The pack was machine-prepared and audited by the same model family (Claude). The cross-family check has not been run, and no record has human review.

## What the pack holds

The pack has 201 candidate records, each one claim in the dataset's shape with its evidence: 380 quotations and 94 labelled paraphrases from 124 retrieved sources, 118 of them primary. It also has 35 candidate documents (executive orders, rules, regulator notices, papers and filings) and 92 candidate entities: sites, spacecraft, companies, public bodies and 11 orbital-compute propositions. Nine records name the dataset record they extend: six Stargate records, the SpaceX–xAI record and two export-control records. Seven rest on press reporting only and are marked as such.

| Strand                                                                                                                                                                                                                                                                                                         | Records | Announcements, plans, agreements | Stated status | Texts and decisions | Provisions | Arguments | Press only |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------: | -------------------------------: | ------------: | ------------------: | ---------: | --------: | ---------: |
| **Data-centre projects:** Stargate's US sites and aggregates (September 2025 onward), Crusoe at Abilene, Stargate UAE, Norway and UK, the UAE–US campus, Microsoft Fairwater, Meta Hyperion, Prometheus and El Paso, Anthropic–Fluidstack, Google, AWS, xAI Southaven, EU AI gigafactories, UK AI Growth Zones |      49 |                               38 |             6 |                   4 |          1 |         — |          0 |
| **Power:** nuclear PPAs and restarts (Crane, Clinton, Duane Arnold, Calvert Cliffs), SMR and fusion agreements, Talen–Amazon and FERC, Entergy gas for Meta, the xAI turbine permit; EO 14141, 14318 and 14299, DOE sites and the large-load direction to FERC; Texas SB 6; EU, UK, China and UAE texts        |      46 |                               23 |             — |                  13 |         10 |         — |          4 |
| **Chip supply:** OpenAI with NVIDIA, AMD and Broadcom; Samsung and SK hynix letters of intent; Microsoft–NVIDIA–Anthropic; NVIDIA–Intel, US–Intel and TSMC Arizona; HUMAIN; BIS rules of 2023–2026 and the 2025 Ascend guidance; NVIDIA's H20 statements; MOFCOM announcements; Huawei's Ascend roadmap        |      46 |                               22 |             — |                  13 |         11 |         — |          0 |
| **Orbital compute:** Starcloud (Lumen Orbit), Google's Project Suncatcher, ASCEND, Axiom Space, SpaceX and xAI, Blue Origin, Starcloud and SpaceX FCC filings, NVIDIA Space-1, Cowboy Space, China's Three-Body and Xingsuan constellations; arguments OC1–OC11                                                |      60 |                               12 |             7 |                   8 |          — |        33 |          3 |

`pack.md` holds the records by strand and project. It opens with a **timeline** of 142 dated events from the pack, set beside 66 compute, capital and export-control dates already in the dataset (marked ◇). Two tables follow it: 59 dates that parties stated as targets, deadlines or contract terms, which are kept apart from events, and the few earlier dates stated in passing. The orbital section opens with a table of the 11 propositions, giving each one's earliest located text.

## Scope choices

- **Extend, don't duplicate.** The dataset's Stargate announcement, the OpenAI–Oracle 4.5 GW agreement, Abilene, Colossus, Rainier, the cloud and capacity agreements and the BIS rules of 2024–2025 were not re-recorded. Several records extend them:
  - The September 2025 Stargate sites and aggregates extend `openai-oracle-capacity-2025` and `stargate-spending-plan-2025`.
  - SpaceX's orbital data-centre plan extends `xm-spacex-acquisition`.
  - Two BIS records extend the AI diffusion records. The foundry rule names the diffusion rule as "a rule related to this IFR". The July 2026 UAE rule states that BIS still specifies the worldwide licence requirement but enforces it only for Country Groups D:1, D:4 and D:5, "consistent with guidance issued on May 13, 2025".
- **Crusoe's Abilene campus is a separate entity.** Crusoe's releases never name Stargate, OpenAI or Oracle, so the campus is not merged with `stargate-abilene` (open question 7).
- **Counterparties for OpenAI and xAI.** openai.com and x.ai refused retrieval. OpenAI's agreements rest on the releases of Oracle, SoftBank, NVIDIA, AMD, Broadcom, Microsoft, Samsung, SK Group, Vantage, Related Digital, G42 and Nscale. xAI's Southaven site rests on the Mississippi Governor's release.
- **Figures as stated.** Capacity is recorded with its wording and what it measures, where stated. Where a release states an aggregate (Stargate "nearly 7 gigawatts", Oracle's sites "over 5.5 gigawatts"), the aggregate is its own record and no site figures are added up. Joint figures are kept with their split where the source gives one: NVIDIA's "up to $10 billion" and Microsoft's "up to $5 billion" in Anthropic.
- **Arguments.** The arguments are 11 neutral propositions. Five state reasons given for orbital compute: solar supply, radiative cooling, terrestrial constraints, the launch-price condition and lower emissions. Six state limits or objections: heat rejection, radiation, no in-place repair, cost, ground bandwidth, and sky, debris and astronomy. Each has its earliest located text among those retrieved. Proponents' own statements of limits, from Google's Suncatcher, are marked as coming from a proponent. Independent critical texts are an arXiv preprint (Turyshev), a co-authored arXiv paper (Marcy), the Accademia dei Lincei's comment to the FCC, Secure World Foundation and an IEEE Spectrum analysis.
- **Bounded at about 200.** The drafts held 222 records; 22 detail records were dropped, such as later phases, second provisions and a figure stated twice. One record was added after the audit (the UAE-rule enforcement statement). The pack lists 86 omissions with reasons, including the dropped records, and an omission is not a judgement of importance. Not recorded include:
  - OpenAI's and xAI's own posts (refused);
  - Mistral AI's "1 GW by 2030" (only in a summary box);
  - the reported H20 revenue-share arrangement of August 2025 and NVIDIA's reported $30 billion OpenAI investment of February 2026 (press only);
  - Gulf government energy measures (none found);
  - Aetherflux's own post (refused).

## Checks

- **Mechanical.** All 380 quotations matched the retrieved text of their own sources, within the per-quotation limit (50 words; 100 characters for Chinese) and the per-source budgets. The budgets count the dataset's quotations from the same expressions. No problems remained. Structure: identifiers, predicates, date bases, figures, stated dates and press-only flags are checked at merge, with no structural problems.
- **Same-family audit.** Two fresh-context auditors checked 64 records (30 random, 34 targeted). Of these, 26 were upheld, 38 corrected and none dropped; one correction was rejected after checking. Every sampled quotation was verbatim. The findings were about support and attribution: statement elements that no quotation carried, joint releases credited to one company, a bound coded wrongly, a qualification without evidence, and locators.
- **Widened checks.** The checks then covered all records for five families. 51 records had a statement element without a passage, mostly fixed with a labelled paraphrase. 9 had a joint-release attribution. 88 figures were checked for bounds, and 1 changed. 6 dates rested on page metadata or on third-party reports of decisions. 20 qualifications had no evidence. The integrator checked 8 of the 70 new paraphrases against their sources, and all were faithful. See [`audit.md`](../research/compute-power-orbit/audit.md).
- **Integrator's corrections.**
  - Before the audit: three date bases were re-dated, enumerations normalised, and about 40 flagged uses of "first" checked. All were ordinals ("first two buildings"), not priority claims.
  - After the audit: the foundry-rule qualification contradicted the rule's own text; it now quotes it.
- **Cross-family brief.** [`cross-family-input-2026-10-28.md`](../research/compute-power-orbit/cross-family-input-2026-10-28.md) has 120 items: 77 blind dated events (Part A) and 43 direct checks (Part B). They are all 79 records of the riskiest classes and a seeded sample of 41 of the other targeted records with figures and stage words. The riskiest classes are stated operation, launch or status, regulator decisions, signatures, press-only records, extensions of dataset records, and every orbital argument. The 80 records outside the brief are mainly announcements without figures and provisions. The pack's answers are in [`cross-family-verdicts-2026-10-28.json`](../research/compute-power-orbit/cross-family-verdicts-2026-10-28.json). The brief also carries:
  - cautions that pages served now may differ from the release, covering US executive-branch pages after the 29 September 2026 "SI" order and edited company pages;
  - a list of 36 pages that refused the preparer, with the request to open captures.

  Nine Part A questions written by the drafting passes name a day-precise date, which weakens blindness on the date for those items, though not on their figures or stage. The check has not been run.

- `pnpm check:privacy` passed before each push. `pnpm check` was not run, because no data, schema or application file changed.

## Retrieval failures

- **Refused or unreadable.** openai.com and x.ai; sec.gov; ferc.gov and fcc.gov licensing (fcc.report too); investors.broadcom.com, ir.talenenergy.com, investor.nexteraenergy.com, investor.nvidia.com and Business Wire; tva.com; the Louisiana PSC portal (HTTP 500); aas.org; Aetherflux's Medium; digital-strategy.ec.europa.eu; EUR-Lex (HTTP 202 challenge); WAM and spacex.com updates (script shells with no text); zhejianglab.com and yuhang.gov.cn (connection reset); the main MOFCOM host (did not resolve).
- **Fallbacks.** Counterparties' and governments' releases, govinfo and Federal Register texts, FCC public notices on docs.fcc.gov, Broadcom's release on a wire mirror, the UAE Embassy's copy of the WAM report, SpaceX's content API, MOFCOM subsites, a provincial reprint of the 2026 NEA plan, and NVIDIA's earnings releases in place of an 8-K.
- **Internet Archive.** Capture pages refused, and the availability service returned HTTP 429 for most of the day, so most sources carry no capture address.
- **Mutable government pages.** whitehouse.gov (TSMC), energy.gov (DOE letter), nist.gov (CHIPS award; the page says it was updated in October 2025) and bis.gov (the Ascend guidance) were served after the September 2026 "SI" order. Quoted passages from them should be compared with near-release captures.

## Open questions for the maintainer

Each has a recommended answer.

1. **Sites as entities.**
   - _Context:_ The pack makes each data-centre site or campus a candidate `infrastructure` entity, distinct from the venture announcing it, as the dataset does for `stargate-abilene`. That gives 17 sites and campuses and a few clusters, programmes and zones, plus 5 spacecraft and 4 constellations.
   - _Recommended:_ Keep `infrastructure` with subtypes "Data-centre site", "Data-centre campus", "Spacecraft" and "Constellation". Add optional `location` (country code, admin area, place as worded) and `operator` fields. Never infer ownership from operation.
2. **Capacity and power units.**
   - _Context:_ A "gigawatt" in these sources can mean IT capacity, facility power, a grid connection, generation or contracted energy, and many releases do not say. The schema's `quantity` has free-text units and no field for what is measured, and no range: Meta's RFP asks for "1–4 GW", now coded `up_to` 4 GW with the range in words.
   - _Recommended:_ Add `quantity.measures`, an enumeration of `it_capacity`, `facility_power`, `grid_connection`, `generation_capacity`, `contracted_energy`, `chips` and `not_stated`. Add an optional `quantity.range {from, to}`. Keep `unit` as worded, so "gigawatt-scale" stays wording and never becomes a number. Never convert or sum, and validate that `not_stated` figures are never compared.
3. **Target and stated dates.**
   - _Context:_ 59 targets, deadlines and terms are kept in `attributes.statedDates` with kind, precision and who stated them. Two "earlier dates stated in passing" record a construction start and an operation stated within a release.
   - _Recommended:_ Add `statedDates` to the schema with a short kind enumeration: `target_operation`, `target_completion`, `construction_start_target`, `delivery_target`, `launch_target`, `deadline`, `contract_term`, `construction_start_stated` and `operational_stated`. Show targets apart from events on every timeline, and never let a target date a record.
4. **Proposed predicates.**
   - _Context:_ 94 records use 16 proposed names.
   - _Recommended:_ Adopt nine:
     - `announced_site`;
     - one `status_stated` (subject infrastructure or programme), merging `site_status_stated`, `operation_stated` and `programme_status_stated`;
     - `power_agreement` and `supply_agreement`, kept separate because their attributes differ;
     - `government_award`;
     - `granted_equity_right`;
     - `announced_plan`;
     - `launch_stated`;
     - `filed_application`.

     Add `regulator_decision`, but date it by the regulator's own record only when that record was retrieved; otherwise date it by the reporting statement, as now. Keep `accepted_for_filing` apart from any approval, and `designated_zone` for government designations. Fold `export_licence_requirement_stated` into `states_provision` when a BIS letter or rule is retrieved, and keep it as it stands until then. Drop `convened`: record the UK AI Energy Council's meeting with `published` on the government's statement.
5. **Stage values.**
   - _Context:_ The pack uses `letter_of_intent` and `term_sheet` for agreements, and `preliminary` and `final` for awards. These are outside the dataset's `transactionStage` enumeration.
   - _Recommended:_ Add `letter_of_intent` and `term_sheet` to `transactionStage`, and an `awardStage` (`preliminary`, `final`, `disbursed`) for government awards. Keep the source's own words alongside in a `stageWording` field, as the X-energy record does ("signed an agreement to explore").
6. **Which spine the orbital arguments belong to.**
   - _Recommended:_ Put the 11 propositions and their 33 records in the **thought spine** ("Human thought and institutions around machine intelligence") as a collection, "Arguments about compute in orbit". Its "How we searched" note would state the bounds (texts on orbital compute, 2019–2026). They are arguments made in papers, white papers and letters, and the thought spine's proposition model already carries earliest-located roles, contesting records and estimates.
   - Plans, launches and filings go in the **institutional history** spine's compute strand. The FCC filings, public notices and comments are cross-linked from the **governance** spine as regulatory records.
   - Admit the earliest-located roles only after the cross-family check has searched for earlier texts (question 12).
7. **Crusoe's Abilene campus and `stargate-abilene`.**
   - _Recommended:_ Keep them apart until one primary text names Crusoe as developer of Stargate I, for example OpenAI's or Oracle's post via a capture. Then record the link as its own claim, not as a merge.
8. **Press-only records.**
   - _Context:_ Seven records rest on press reports: the Talen–AWS Cumulus sale, FERC's rejection of the Susquehanna amendment, the Talen–Amazon 1,920 MW PPA, the Shelby County permit, and three on China's Three-Body constellation.
   - _Recommended:_ Keep them labelled. The cross-family checker should open the primary texts through the Archive (Talen's releases, FERC's order, the county's permit, Zhejiang Lab's news pages). Replace the press evidence where a primary text is found; drop the record where none supports it.
9. **The diffusion rule's rescission.**
   - _Context:_ No Federal Register rule formalising the rescission announced in May 2025 was found. The July 2026 UAE rule says the worldwide requirement is still specified and enforced only for some groups.
   - _Recommended:_ Keep `fl-us-bis-ai-diffusion-rescission-announced` as an announcement. Admit the 2026 enforcement statement as a provision record that extends it. Ask the checker to search the Federal Register by RIN or docket.
10. **The OpenAI–NVIDIA letter of intent.**
    - _Recommended:_ Keep both records as of 22 September 2025 (a letter of intent, and NVIDIA's intent to invest "up to $100 billion" as each gigawatt is deployed), and add no later status from press reports. Record any definitive agreement only from NVIDIA's or OpenAI's own text.
11. **Amount scopes.**
    - _Context:_ The dataset's `amount.scope` (`transaction`, `round_total`, `cumulative`) does not fit stated project or programme spending, such as "more than $15 billion" for a campus or €20 billion for a fund. The pack keeps the source's scope in `scopeNote`.
    - _Recommended:_ Add `project` and `programme` scopes. Keep `scopeNote` as the stated basis.
12. **Earliest-located roles for orbital arguments.**
    - _Context:_ The search covered texts on orbital compute from 2019 to 2026. The Lumen Orbit white paper (September 2024 as printed, attested only in the current copy) is earliest located for four propositions (OC1, OC3, OC4 and OC7). Earlier literature on space-based solar power, radiation in space electronics and on-orbit computing was not searched.
    - _Recommended:_ Before admission, run a bounded pre-2024 search, by the cross-family checker or a follow-up pass. Record any earlier text as a correction under the editorial policy. Until then, show the roles with the bound stated.
13. **Admission order.**
    - _Recommended:_
      1. Run the cross-family brief.
      2. Decide questions 1–5.
      3. Admit in two parts. First, records on existing predicates: government texts and provisions, export-control rules and their links, `compute_capacity` and `uses_infrastructure` records, and the orbital arguments after question 12. Second, the records with proposed predicates, once the schema decisions are made.

## What the cross-family check should prioritise

1. **OpenAI's and xAI's own posts, via captures.** These are the five-sites post, Stargate UAE, Norway and UK, and the NVIDIA, AMD, Broadcom, Samsung and SK posts. Check whether OpenAI's wording or figures differ from the counterparties' releases the pack relies on, for example "explore offtake" against "take" for Stargate UK.
2. **The seven press-only records and the four regulator decisions dated by a party's statement** (NRC on Crane, the Louisiana PSC, FERC on Susquehanna, the Shelby County permit). Find the regulator's own record and its date.
3. **Stated operation and launch:** Fairwater Wisconsin and Atlanta, Stargate UAE construction, Abilene's energized buildings, Starcloud-1's launch and in-orbit training, Axiom's nodes, and the Chinese constellations. Each must remain the operator's statement.
4. **Earliest-located roles OC1–OC11.** Look for earlier texts, and check the Lumen white paper's September 2024 date against a 2024 capture.
5. **US executive-branch pages served after the "SI" order:** whitehouse.gov (TSMC), energy.gov (the DOE letter), nist.gov (the CHIPS award) and bis.gov (the Ascend guidance). Compare each quoted passage with a near-release capture.
6. **Figures and what they measure:** GW, MW and chip counts and their bounds. No figure may be summed or reassigned.
7. **The 70 paraphrases added in the correction pass.** These cannot be matched mechanically; only 8 were checked by hand.
8. **Chinese texts.** MOFCOM announcements and their suspensions, the 2026 NEA plan from a provincial reprint, and the Three-Body constellation.

## Next step

Run the cross-family check from the brief, then decide questions 1–6 before any admission task.

## Maintainer decisions (2026-10-28)

All recommended answers to the open questions above (1–13) are adopted as written. Admission still waits for the cross-family check and its adjudication; where the check changes the basis of a recommendation, the admission task lists it for the maintainer instead of applying it.
