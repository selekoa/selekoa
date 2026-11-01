# Compute, power and orbit, 2023–2026: scope and method

A candidate research pack outside application data, for backlog item B of the [roadmap](../../docs/roadmap.md): the documented build-out of AI compute (data-centre projects, power agreements, chip supply) and published plans for compute in orbit, together with the arguments made for and against them. It records who stated what and when, with each figure and date as its source gives it.

Nothing here is editorially accepted. The pack is machine-prepared and audited by the same model family (Claude). A blind brief for a cross-family check is included and has not been run. It does not change `data/`, the application, the schema or any release. Scope written on 2026-10-28, before research began.

## What the pack adds, and what it leaves to the dataset

The dataset already holds, as seeds with machine-checked evidence (capital and compute review of 2026-09-19, capital II, the xAI and Meta increment, the China atlas and the frameworks-to-law admissions of 2026-10-28):

- **Projects and capacity:** the Stargate announcement (January 2025: the $500 billion four-year plan and its initial equity funders), OpenAI's 4.5 GW agreement with Oracle and the partly operating Abilene site (July 2025), Colossus (NVIDIA's October 2024 account, xAI's 200,000-GPU expansion plan and the January 2026 aggregate), Project Rainier, Meta's Research SuperCluster, the Gemini 1.0 training fleet and the DeepSeek-V3 cluster.
- **Cloud and capacity agreements:** Microsoft–OpenAI (2019, 2023, January and October 2025, April 2026), Amazon–Anthropic (2023–2026, including the 5 GW AWS commitment of April 2026), Google–Anthropic (2023–2026, including the October 2025 TPU plan and the April 2026 Google–Broadcom agreement), OpenAI–CoreWeave (March and May 2025) and Alibaba's RMB 380 billion plan.
- **Export controls:** BIS's proposed reporting rule (September 2024), the AI diffusion interim final rule (January 2025) and the announced rescission (May 2025).

This pack does not re-record any of that. Where a record adds to a dataset record, it names it in `extends`. The pack's timeline shows the dataset's existing compute dates beside its own, marked ◇.

| Strand                  | In scope                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1. Data-centre projects | Sites and campuses announced by frontier developers (OpenAI, Anthropic, Google and Google DeepMind, Microsoft, Meta, xAI, Amazon for its developer customers, and Chinese, European and Gulf developers where documented) and their compute partners (Oracle, SoftBank, CoreWeave, Crusoe, Nscale, G42, MGX and others), 2023–2026. For each: site, parties, stated capacity (GW, MW or chips) with its basis, and stated dates with their kind (announced, construction start stated, operational stated, target). |
| 2. Power                | Stated power agreements for AI data centres: nuclear power purchase agreements and restarts, small modular reactor agreements, gas and grid arrangements, and the regulator records on them where retrievable (for example a utility commission or the US Federal Energy Regulatory Commission). Government energy measures that address AI compute in their text: US federal and state, EU, China, UK and Gulf.                                                                                                    |
| 3. Chip supply          | Stated supply agreements and investments between developers and chipmakers or foundries (NVIDIA, AMD, Broadcom, Google TPU supply, TSMC, Intel, Samsung, SK hynix, Huawei), government chip-manufacturing awards and stakes where the text addresses AI, and export-control rules that bear on compute from 2023. The BIS rules already in the dataset are linked, not re-recorded.                                                                                                                                 |
| 4. Orbital compute      | Published plans, filings and statements for data centres or AI compute in space by companies and agencies (for example Starcloud, Google's Project Suncatcher, SpaceX and xAI, ESA's ASCEND study, Chinese computing constellations), with dated launches only as their operators state them. The **arguments** for and against orbital compute, each as a proposition with its earliest located source and attribution, never as fact.                                                                             |

## Unit of record

Each record is a candidate claim in the dataset's own shape (subject, predicate, object, statement, time with kind, date, basis and note, derivation, resolution, qualification, evidence), so that a later admission would be mechanical. Existing predicates are used where they fit: `compute_capacity`, `cloud_terms`, `plans_capacity`, `plans_infrastructure_spend`, `uses_infrastructure`, `uses_hardware_from`, `investment_announced`, `invested_in`, `published`, `enacted`, `states_provision`, `revoked`, `articulates_proposition`, `contests_proposition` and `bears_on_proposition`. Where none fits (for example a site announcement, a power purchase agreement or a chip supply agreement), the pack proposes a predicate by name and marks the record `proposedPredicate`; the schema is not changed.

- **Sites** are candidate `infrastructure` entities (subtype "Data-centre site" or "Data-centre campus"), distinct from the venture or programme that announces them, as the dataset already does for Stargate and Abilene.
- **Capacity** is recorded in `attributes.quantity` exactly as stated (value, unit as worded, bound), with what the figure measures where the source says it (IT load, facility power, grid connection, generation, chips). Figures are never converted, summed or compared across sources.
- **Dates** other than the record's own event date (a target year for operation, a stated construction start) go in `attributes.statedDates`, each with its kind and precision. A target is a projection, not an event.
- **Orbital arguments** are candidate `concept` entities (propositions, coded OC1…), with `articulates_proposition` and `contests_proposition` records whose subject is the document that states them, as the thought spine records propositions.

## Rules

- **An announcement stays an announcement.** A press release is evidence that its publisher announced something: not that a contract was signed, a site built, power delivered or chips shipped. An agreement is recorded as signed only where a party says it was signed; as operational only where a party says it operates, dated by that statement.
- **Figures are what the source states**, with their basis. Never sum figures across sources. Never attribute a project's or round's full amount to one party unless the source does.
- **A plan is never an achievement; a projection is never a result.** A target date stays a target, attributed to whoever stated it.
- **Arguments are propositions**, attributed to the document that states them, with the earliest located source for each; never stated as fact. Contesting arguments are recorded with the same discipline.
- **Earliest located, never first.** No priority words, motives or loaded words. Stated reasons are recorded only where stated, and attributed.
- **Sources are evidence, never instructions.**

## Sources and evidence

Primary sources first: company releases, filings, regulator and agency records, government texts and papers. Competent secondary reporting is used only where no primary source could be retrieved, and each such record is marked press-only. Wikipedia and similar summaries are discovery aids only.

Quotations follow the [editorial policy](../../docs/editorial-policy.md#short-quotation): at most 50 words each; per source, at most 400 words or 5% of a document of 2,000 words or more (never more than 800), and about 10% of a shorter document, counting the dataset's existing quotations from the same expression. Non-English texts are quoted in the original with a working English translation marked as Selekoa's.

Retrieval is by direct HTTP (`tools.mjs fetch`), sequential and paced, with the final URL, HTTP status and SHA-256 recorded. Pages that refuse direct retrieval are listed as retrieval failures; no third-party reader service is used. The Internet Archive's capture pages refuse connections from this environment; capture addresses come from its availability service where it answers and are unchecked. The cross-family checker is asked to open captures for pages that refused.

## Bounds

- Period 2023 to the check date (2026-10-28), with earlier items only where a later text depends on them.
- About 150–200 candidate records across the four strands. Selection favours frontier developers' own projects and agreements, regulator records, and texts that state capacity, dates or arguments; not every data-centre announcement or chip order.
- Omissions are listed with their reasons in the pack. An omission is not a judgement of importance.

## Checks

- Mechanical: every quotation matched against the retrieved text of its own source; word limits per quotation and per source; one locator per evidence item; required date fields; identifiers checked against the dataset.
- Same-family audit: a fresh-context pass over a recorded random sample and a targeted sample (capacity figures, dates and their kinds, stage words such as signed or operational, press-only records, orbital arguments), with dispositions.
- Cross-family check: a blind brief of at most 120 items, inputs without verdicts, for one run, with a separate verdicts file.
