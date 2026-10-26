# Selekoa

**A source-critical institutional memory and research base for machine intelligence.**

Research instrument, version 0.x and a work in progress, maintained by **futurelightcone**. Not yet published. Code is MIT-licensed (`LICENSE`); Selekoa's own data and text are CC BY 4.0 (`LICENSE-DATA.txt`), with third-party quotations and source documents excluded. See [LICENSING.md](LICENSING.md).

**The biography of machine intelligence** remains the north star; a substantial historical encyclopedia is the longer-term ambition. Preserve and make explorable the documentary history of people and institutional diaspora, ideas and intellectual lineages, institutions and organizational change, capital, governance, consequential infrastructure, and the human thought, debate and institutional movements surrounding machine intelligence.

The immediate purpose is to accelerate rigorous human work: academic research, serious journalism, books, policy research and historical investigation. Machine-first research is the bootstrap layer: sourced, inspectable, qualified and reusable by humans. Producing machine-generated content for its own sake is not a product goal. Exploratory records remain visibly distinct from human-curated material; source checks, human review and editorial acceptance stay separate.

The durable asset is the evidence-backed historical corpus and its research semantics. Maps and graphs are one interface alongside dossiers, person views, document/version histories, timelines, research starters, source inspection, exports and future query interfaces. Graph functionality may be reduced or omitted when it does not improve historical understanding.

Current research spines are **Frontier AI Governance**, a likely flagship emphasizing versioned documentary history; **human thought and institutions around machine intelligence**, with documented ideas and disagreements rather than inferred ideological labels; and **Chinese frontier-AI institutional history**, beginning with the bounded collection and preserving distinct actors and Chinese-language expressions. These are strategic directions, not finished products. See [positioning](docs/project-positioning.md).

The next phase prioritizes a polished, immediately legible public-facing experience, researcher entry points through people/topics/documents/questions, deep flagship paths and exportable research starters with source paths, relevant passages, qualifications, disagreements and open questions. Continue targeted corpus growth without letting it substitute for usability. This design priority does not authorize public release.

The [Reborn Genesis I starter](research/collections/conceptual-provenance-i/starter.md) preserves 11 investigated propositions, 18 evidence records and 12 source expressions from a pinned source-integrity baseline, including errors and unresolved historical questions. [Method, upstream boundaries and review limits](docs/research-corpus.md) explain what was and was not reproduced. Generate with `pnpm research:corpus`; verify with `pnpm research:corpus --check`. These research records remain outside the atlas dataset.

The [Conceptual Provenance II guide](research/collections/conceptual-provenance-ii/guide.md) investigates mesa-optimization source versions, the Sharp Left Turn post identity and a bounded CEV naming history. It links the complete evidence appendix, separate correction proposal, attributed machine audit and blank human sample. [Reproduction and limits](docs/conceptual-provenance-ii.md) describe the follow-up; verify with `pnpm research:provenance --check` and `pnpm review:seed --corpus --check`. Version I remains unchanged.

## Research sample

The app opens on a reading-first start page: purpose and entry points to document histories, the Anthropic question page, institutional dossiers, People A–Z and the record explorer (`#/explore`). The About & method page (`#/about`, linked from the header, start page and footer; a one-line review status in the header links to its “How this was checked” section, and its coverage section lists every editorially accepted claim and human-reviewed evidence record) explains what Selekoa is and is not, computed coverage, how records were checked, every status label, known limits, citation and corrections. The [Frontier safety frameworks](docs/research-references.md#document-histories-and-research-starters) history (`#/documents/frontier-safety-frameworks`) lists every recorded edition of the frameworks of Anthropic, Google DeepMind, OpenAI (two frameworks), xAI, Meta and Microsoft with date bases, recorded replacements and changes, a bounded set of quoted provisions per edition (thresholds, required actions, who decides, exceptions) aligned across editions, recorded absences, coverage gaps, open questions and the assessments Selekoa poses as questions, contested or unresolved, and downloads a research starter. It is a machine-proposed projection of stored claims.

Two [control-structure timelines](docs/control-commitments.md) (`#/control/openai`, `#/control/anthropic`, under **Control & commitments** in the header) list who holds which control right over which entity, through which instrument and at which stage (announced or in effect), from tax and court filings, the filed certificates of incorporation, a regulator’s decision and letter, and the companies’ announcements: OpenAI’s nonprofit, capped-profit partnership, operating company and public benefit corporation, the board changes from November 2023, and Anthropic’s public benefit corporation, its 2021 Long-Term Benefit Committee and the Long-Term Benefit Trust’s Class T rights and their amendment. Each page keeps one unresolved question about effective control, posed by Selekoa with context evidence only, and lists the questions set aside because they need legal interpretation.

The [External commitments and obligations](docs/control-commitments.md) page (`#/commitments/external-commitments`) covers five texts in date order: the White House voluntary AI commitments of July and September 2023, the Frontier AI Safety Commitments of the AI Seoul Summit (2024), the EU General-Purpose AI Code of Practice (2025) and California SB 53 as chaptered. A table lists the organisations and, for each text, whether they announced an intent to sign, appeared on a published list (dated by the list) or stated that they would not sign. Any stated scope, such as a single chapter, is kept. Each text has its issue or enactment record, quoted provisions, the framework editions that link themselves to it in their own words, and the questions set aside because they need legal interpretation. A commitment, a listing or a legal obligation is never presented as evidence of compliance.

Every person has a page (`#/person/ID`) with a documented path in date order, undated records kept apart, works, explicit credits, governance records, a computed list of what the record cannot tell you and a research-starter download. Every document has a page (`#/document/ID`) with dates and their basis, the exact source, its version family and each documentary relation listed separately. The Anthropic guided reading is now an instance of a reusable question format (`#/question/ID`) with computed disputes and open questions; earlier `#/reading/` links still resolve. All three are projections of existing claims; see [research references](docs/research-references.md#person-document-and-question-pages).

A research question page (`#/question/frameworks-to-obligations`) asks how frontier-AI developers' self-governance changed from voluntary frameworks to legal obligations, 2023–2026. It uses existing records only: a computed chronology, the developers' own frameworks, the shared commitments, the EU Code of Practice and SB 53, key framework revisions, open and unresolved records, and a list of what the records cannot answer. It adds no essay or conclusion. Its starter export cites original sources before Selekoa IDs. `pnpm question:gaps` writes the gap list as candidate research tasks to `review/essay-starter-gaps.md`.

The [propositions about superintelligence](docs/human-thought.md) page (`#/propositions/superintelligence`) is the first human-thought collection. For each proposition, such as the intelligence explosion, the treacherous turn or deceptive alignment, it lists the located texts from 1863 to 2022 that state, dispute or bear on it, in date order. Each record gives the text’s register, so fiction and satire are labelled, and both dates where the quoted wording survives only in a later copy. Each proposition names its earliest located text, decided by the date of the wording, and a “How we searched” note states the scope and known gaps once. No record links one text to another. The page downloads a research starter with the original sources first.

Focus an institution and open Dossier to read a selective chronology, people and institutional paths, ideas and documents, capital/compute, and governance. Coverage includes Anthropic, OpenAI, DeepMind / Google Brain / Google DeepMind, xAI, Meta / FAIR, DeepSeek, Alibaba / Qwen and Zhipu, alongside MIRI and alignment-history material. Coverage is selective; related institutions retain separate identities. Every statement opens the same Evidence Inspector used by Map, Claims and Timeline; the dossier adds no factual database. The existing map and filtered text views remain available. Light and dark are presentation modes of the same system.

<!-- coverage:start — generated by `pnpm docs:coverage` from the stored records; do not edit by hand -->

The dataset (schema 2.16, updated 2026-10-25) contains **850 entities, 2,038 claims, 780 sources and 2,633 evidence records**. Claims comprise 1,747 relationships between records, including 759 records of a text articulating, contesting or bearing on a proposition, and 291 claims about a value, including 236 quoted provisions of frameworks, laws, commitment texts and governing documents and 20 recorded absences. Dated records run from 1863 to 2027; 139 records have no established date. Evidence checks span 2026-09-17 to 2026-10-25.

By derivation, 1,984 claims are stated in a source, 49 are inferred and 5 are questions posed by Selekoa; 5 claims are assessments of a change, a provision or control. 2,032 are supported, 1 contested (with evidence on both sides) and 5 unresolved (context evidence only). There are **2,037 seed claims and 1 editorially accepted claim; 2,631 machine-checked evidence records and 2 human-reviewed records**.

<!-- coverage:end -->

Coverage spans selected dated records plus explicitly undated records; the About & method page computes the same figures from the loaded data, and each [dataset release](release/CHANGELOG.md) records its own counts in its manifest. The [OpenAI/DeepMind expansion](docs/institutional-atlas.md), [xAI/Meta expansion](docs/xai-meta-atlas.md) and [first Chinese AI collection](docs/china-atlas.md) provide connected institutional dossiers. Open **Chinese AI histories** in the sidebar for DeepSeek, Alibaba/Qwen and Zhipu. This shared navigation does not assert shared ownership or lineage.

The limited editorial promotions come from explicitly authorized corrections, not automatic import of review-pack decisions. Historical decisions, disagreements and attributed machine audits remain in their original packs. This is neither a current sector inventory nor comprehensive historical coverage.

Review follows the [machine-first editorial policy](docs/editorial-policy.md): passage-level checking, qualified evidence, reproducible validation and bounded fresh-context machine audits with random and targeted samples. Routine human spot-checks are no longer mandatory for every exploratory increment. Human attention focuses on material unresolved issues, reported errors, consequential ambiguities and selected editorial acceptance. Human-curated interpretations still require inspection of selected claims, source paths and framing; academic and journalistic users must independently verify the claims and original sources they rely on. The change is prospective; prior decisions and review packs remain unchanged.

The OpenAI/DeepMind increment remains entirely exploratory. Its human sample is uncompleted and its human decision/notes fields remain blank; the [integration record](docs/institutional-atlas-integration.md) records machine audit coverage without editorial promotion.

## Run locally

Requires Node 22.12+ and pnpm 11. Exact package versions are recorded in the lockfile.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open [localhost](http://127.0.0.1:5173). The server binds only to the local machine. The app has no backend, accounts, analytics, external font requests or runtime data-fetch dependency.

```sh
pnpm check
pnpm test:browser
pnpm test:privacy
pnpm check:privacy
```

`node scripts/check-wayback.mjs` (network, manual, not part of `pnpm check`) verifies that each Wayback `archivedUrl` in `data/sources.json` names the capture the Internet Archive actually serves, and exits non-zero on any redirect to another capture, 404 or failure.

`pnpm check:links` (network, manual, not part of `pnpm check`) requests every source URL in `data/sources.json` and sorts each into ok, redirect, client error, blocked, server error, dead domain, network failure or tool limit. Results go to the ignored `review/.local/`; the latest run is summarised in [the link check](docs/link-check.md).

`pnpm test` runs the unit tests with two workers and a 60-second test timeout (set in `vite.config.ts`). Several suites load and validate the whole dataset, so one worker per core timed out on a loaded machine; pass `pnpm test -- --maxWorkers=4` to use more workers on an idle one. `pnpm docs:coverage` regenerates the README coverage block after a data change; a unit test fails while it is stale.

The browser suite uses installed Microsoft Edge against a production preview, with one worker and a five-minute test timeout (`playwright.config.ts`): accessibility scans of the longest pages take minutes on a loaded machine. Run `pnpm build` before standalone browser tests. `pnpm preview` serves the build at [the preview address](http://127.0.0.1:4173). Generated browser artifacts remain ignored. The privacy scanner reads staged paths and contents from the Git index; stage intended files first. It flags common secrets, home-directory paths and unexpected email addresses, but does not prove anonymity.

## Dataset releases

`pnpm release <MAJOR.MINOR.PATCH>` writes a fixed, versioned copy of the records to `release/v<version>/`: entities, claims, evidence, sources and collection definitions as JSON and CSV, a manifest with counts, schema version and checksums, the records added, changed and removed by ID since the previous release, a citation file and a README. The first release is [v0.1.0](release/v0.1.0/README.md); the [release changelog](release/CHANGELOG.md) lists every release. The [dataset format](docs/dataset-format.md) defines field meanings, stability, IDs, supersession, removal and the separate `quote` field for third-party text. A release is never overwritten; `pnpm release <version> --check` regenerates it while the data is unchanged, and the unit tests rebuild every release from its own records and refuse a released ID that disappears without a recorded reason. The About & method page shows the latest release and links to a local ZIP built from its files. Nothing is published. Releases written before the licence say that none is granted and stay unchanged; [LICENSING.md](LICENSING.md) states the terms for them, and releases from format 1.4 state the licence in their manifest.

## Continue

Start with [AGENTS.md](AGENTS.md), the [roadmap](docs/roadmap.md),
[editorial policy](docs/editorial-policy.md) and [ontology](docs/ontology.md).
Prioritize materially richer explorable history or concrete researcher-facing
capabilities. Existing [reference and export tools](docs/research-references.md)
and [guided paths](docs/guided-research-paths.md) are starting points for further
researcher workflows.

Use a checkout of current main as the canonical starting point. Inspect
`git worktree list` and branch status first: the separate
`codex/christiano-institutional-episode` pilot remains unmerged and is not part
of canonical coverage. Other checkouts may contain unrelated edits; preserve them
and do not infer that a historical worktree is current main.

Schema 2.10 supports personnel continuity, document versions, transaction
stages/bounds, reported method use, scoped evaluation engagements, institutional
announcements, catalogue-form person names, source language and archive captures,
quoted framework provisions with recorded absences, provision-level changes
and contested assessments, per-document quotation limits, and control
structures and external commitments (control rights with instrument and stage,
legal forms, signatories, refusals, enactment and quoted framework links). Schema 2.10 records every assessment as a question posed by Selekoa and dates it by what it assesses, never by its sources' publication window. Data lives in `data/`; the dossier is a projection of those
records. `pnpm validate:data` checks the current dataset.
`pnpm check:migration` compares the historical foundation pass with genesis;
it is not the current-data regression check after authorized additions.

**Expected failures on current main.** Two commands fail by design and are not
part of `pnpm check`:

- `pnpm check:migration` fails: it asserts the 28-claim genesis dataset, and
  authorized additions have since changed the data. It exists to verify the
  schema 2.0 foundation migration against genesis, nothing else.
- `pnpm review:seed --check` without `--output` fails: its default target,
  `review/seed-review.md`, is the annotated genesis pack with recorded
  decisions, so it no longer matches a blank regeneration. Use `--check` only
  against a blank pack you generated (see below) to verify reproducibility.

Historical review packs and increment documents retain their original scope,
counts, decisions and audit notes. Never regenerate an annotated pack in place.
For a selected increment, use `pnpm review:seed --order review/<increment>-order.json
--title "Selected increment" --output review/.local/<new-blank-pack>.md`.
Append `--check` to verify that same blank reference. Human fields remain empty
unless actual decisions are supplied; applying them requires separate authorization.
`pnpm review:assessments` regenerates the latest packet of contested and
assessment records for a different-model check
(`review/week4c-contested-for-cross-model.md`) from the dataset view of its time;
append `--check` to verify it. Earlier packets are reproduced by unit tests.
`pnpm review:earliest` regenerates the packet of earliest-located records of the
propositions collection for a different-model check
(`review/thought-spine-earliest-for-cross-model-2026-10-06.md`) from the dataset
view it was checked against; append `--check` to verify it.
Historical dataset views live in `src/editorial/historical-views.ts`, one entry
per stored before-snapshot.
Research reproduction uses `pnpm research:corpus --check`,
`pnpm research:provenance --check` and `pnpm review:seed --corpus --check`.

- [Institutional dossiers](docs/institutional-dossiers.md): selection rules, Anthropic fixture and integration limits
- [People and diaspora](docs/people-diaspora.md): documented personnel paths
- [Intellectual lineage I](docs/intellectual-lineage.md) and [II](docs/intellectual-lineage-ii.md): documented transmission and oversight
- [Capital II](docs/capital-loops.md): reciprocal corridors and bounded cycle analysis
- [Capital and compute](docs/capital-compute.md): transaction semantics, research audit and unresolved boundaries
- [Launch readiness](docs/launch-readiness.md) and [launch runbook](docs/launch-runbook.md): what was checked, the decisions taken and the maintainer's launch-day steps (indexing, analytics and contact settings in `site.config.json`)
- [Governance versioning](docs/governance-versioning.md): version identity, change evidence and unresolved questions
- [Control structures and external commitments](docs/control-commitments.md): schema 2.9 semantics, SB 53 coverage, the OpenAI and Anthropic control structures, the White House, Seoul and EU commitments, and the questions set aside
- [Ontology](docs/ontology.md): records, semantics and time
- [Personnel continuity](docs/personnel-continuity.md): scope, source choices and unresolved boundaries
- [Editorial policy](docs/editorial-policy.md): evidence, review and corrections
- [Style guide](docs/style-guide.md): reader-facing text, voice and internal terms
- [Architecture](docs/architecture.md): implementation and future storage
- [Positioning](docs/project-positioning.md): research purpose, flagship spines and product priorities
- [Vision](docs/vision.md): scope and non-goals
- [Adjacent projects](docs/adjacent-projects.md): reuse and differentiation
- [Roadmap](docs/roadmap.md): next increments
- [Agent instructions](AGENTS.md): environment and privacy

The lab anchors are data configuration, not an ontology limit. Private research inputs are never included.
