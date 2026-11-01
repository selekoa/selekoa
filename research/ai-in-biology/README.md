# AI in biology

The first part of the "AI in science" strand in the [roadmap](../../docs/roadmap.md) (maintainer note of 2026-10-30): AI in biology in its wide sense, as documentary history. It records the institutions and programmes, the models, papers and resources, the people, and the claims made about AI changing biology, each as what a document states, in its own words and versions. Biosecurity is one strand of the subject. The AI and biosecurity pack (`research/ai-bio/` on branch `ai-bio-pack`) covers it, and this pack links to its candidates without re-recording them.

This is a candidate research pack outside application data. It was machine-prepared and audited by the same model family (Claude). Nothing in it is editorially accepted or human-reviewed, and the cross-family check has not been run. It changes nothing in `data/`, the application, the schema or any release.

## Files

- [scope.md](scope.md): what is in and out, the unit of record and the rules. It was written and pushed before research began.
- [pack.md](pack.md): the readable pack, generated from `pack.json`. It opens with counts and a timeline, then one section per strand, grouped by organisation, document, person or proposition. "How we searched", the biosecurity links, omissions, retrieval failures, open questions and the source table close it.
- [pack.json](pack.json): the candidate documents, entities, sources and claims. Each source records its address, HTTP status, SHA-256, retrieval date and word count. Each claim is in the dataset's shape, with evidence (passage, locator, source role, support). `timeline` holds the dated events, and `biosecurityLinks` the links to the sibling pack.
- [verification.json](verification.json): the mechanical check of every quotation, the quotation budget per source, and the register screen.
- [audit.md](audit.md), [audit-sample.json](audit-sample.json), [audit/](audit/): the same-family audit. A random and targeted sample of 72 records was checked against the sources, and the file records how each finding was handled ([dispositions.json](audit/dispositions.json)). The draw is made by [sample.mjs](sample.mjs).
- [cross-family-input-2026-10-30.md](cross-family-input-2026-10-30.md) and [cross-family-verdicts-2026-10-30.json](cross-family-verdicts-2026-10-30.json): the blind brief for a cross-family check (120 items), with the pack's answers in a separate file. It has not been run.
- [drafts/](drafts/): the five source-group drafts the pack is merged from (labs, companies, models, people and claims), the shared entity registry, their [format](drafts/FORMAT.md) and the [brief](drafts/BRIEF.md) they were written to. Corrections are made in the drafts, never in `pack.json`. The brief predates the audit and still names the old id of the Nobel awarding body, which is now `aib-royal-swedish-academy-of-sciences`.
- [sibling-ids.json](sibling-ids.json), made by [siblings.mjs](siblings.mjs): the identifiers of the ai-bio, key-papers and technical-history candidate packs at pinned commits, so that a reference to a sibling candidate can be checked. [biosecurity-links.json](biosecurity-links.json) lists the eleven ai-bio candidates linked from here.
- [timeline-dataset.json](timeline-dataset.json): ten dated records already in the dataset (the AlphaFold documents, and Hassabis's and Jumper's roles), shown in the timeline for orientation and marked ◇. Made by [dataset-timeline.mjs](dataset-timeline.mjs) from an explicit list.
- [tools.mjs](tools.mjs), [build.mjs](build.mjs), [integrate.mjs](integrate.mjs): retrieval, search, quotation checking, the register and priority-word screens, the integrator's changes, merge, render and brief.

## Method

1. **Scope first.** [scope.md](scope.md) was written and pushed before research began. It was based on what the dataset and the sibling packs already hold, and set the rules and bounds.
2. **Drafting by group.** Five fresh-context passes drafted the records to a written [brief](drafts/BRIEF.md) and [format](drafts/FORMAT.md), in parallel:
   - **labs:** DeepMind and Google DeepMind's science work, Isomorphic Labs, EvolutionaryScale, Arc Institute, the Institute for Protein Design, Microsoft Research AI for Science and NVIDIA BioNeMo;
   - **companies:** Recursion, insitro, Generate Biomedicines, Genentech and Roche, XtalPi and BioMap, plus company statements that a drug candidate entered a trial;
   - **models:** CASP, AlphaFold 1–3, the AlphaFold database, AlphaMissense, AlphaProteo, RoseTTAFold, RFdiffusion, ESM, Evo, Rosetta and Foldit;
   - **people:** authorship and dated roles, and the 2024 Nobel Prize in Chemistry;
   - **claims:** six propositions and the texts on them.

   Each pass retrieved its sources by direct HTTP through `tools.mjs fetch`, checked its own quotations and screens with `tools.mjs check` and `tools.mjs hazards`, and listed omissions, retrieval failures and open questions. Shared entities were defined once in `drafts/shared.json` before drafting.

3. **Integration.** One id per document and one source key per address across passes. Two roles were re-dated as snapshots. Two proposition records were linked to company statements. See [audit.md](audit.md#integrators-changes-before-the-audit).
4. **Mechanical verification.** Every quotation is matched against the retrieved text of its own source. Each is held to the 50-word limit and the policy's per-source budget, counting the dataset's existing quotations from the same expression (the AlphaFold paper and DeepMind's 2020 account). Locators, required fields and dataset and sibling references are checked. The register screen and the priority-word screen run over every statement and qualification. At the last run: 360 quotations, 22 labelled paraphrases, no problems.
5. **Same-family audit.** Two fresh-context auditors checked 72 records (32 random, 40 targeted) against the sources and tried to refute them. They found no hazard, privacy or priority-word breach. All 27 findings were corrected (22 as proposed, 5 differently) and none was declined or dropped. They were widened into nine family-wide decisions, applied to every record they bear on.
6. **Cross-family brief.** A blind brief of 120 items for a reviewer from a different model family:
   - **Part A:** dated events (founding, roles, funding, partnerships, awards, publication), plus the earliest located text of each proposition, asked by criterion only with the record id withheld;
   - **Part B:** the other items, checked directly.

   No record is admitted before that check, under the editorial policy.

## How to read a record

- **A record states what one document says,** dated by the kind of date its source gives:
  - founding as stated;
  - announcement;
  - preprint posting;
  - journal receipt, acceptance and online publication;
  - issue;
  - release;
  - the retrieval date of a page that states no date (a snapshot).

  A role is dated by the document that states it and is never extended into a tenure.

- **A paper's contribution is the authors' statement,** quoted. CASP results are recorded as CASP's organisers state them in their overview papers and pages, not as a developer states them. Selekoa's own wording carries no "solved", "first" or "breakthrough". Where a source uses such a word, it is quoted and attributed, for example the CASP14 organisers' characterisation of their results.
- **A company's statement is the company's:** of purpose, results, funding, a partnership or a drug candidate entering a trial. It is dated and never presented as an independent result. An announced partnership stays announced (`partnership_announced`, a proposed predicate). A round total is never one investor's share, and "up to" milestone amounts stay "up to".
- **People** are recorded by authorship as credited and by dated public roles. A printed affiliation is not employment. The 2024 Nobel Prize in Chemistry is the Royal Swedish Academy of Sciences' own statement (`award_announced`, a proposed predicate), one record per laureate.
- **A claim about AI and biology is a proposition** with one criterion (P1–P6). A record says that a text articulates, contests or bears on it, dated by the text; it is never evidence that the proposition is true. "Earliest located" means the earliest text the recorded search found. The search is stated once in "How we searched" in `pack.md`, and is weakly bounded for P2, P4 and P5.
- **Hazard-safe.** Records stay at the policy, institutional, publication and claim level. Fourteen records carry a hazard note saying that technical content in the source was excluded and only high-level statements quoted. These are on ESM3, Evo, Evo 2, RFdiffusion, AlphaProteo and protein-design texts.
- **Sibling links.** Records that concern the same document as a sibling candidate name it in `siblingLinks` (13 do). For example, the technical-history candidate `th-jumper-2021-alphafold` is the same expression as the dataset's `alphafold-paper`. One record names a dataset record in `extends`.

## Limits and retrieval

- **Over the bound.** The task asked for about 200 records; the five passes returned 254, and integration made 256. Nothing was pruned. The review note names what to drop first if the maintainer wants a smaller pack.
- **Publishers that refused.**
  - **science.org** refused direct retrieval. Five Science papers therefore rest on other expressions:
    - AlphaMissense, ESM-2 and ESM3 on their PubMed records (abstract and author list);
    - RoseTTAFold and Evo on their PubMed Central author manuscripts.

    The 1997 Rosetta paper also rests on its PubMed record. Each source entry names the expression read.

  - **PubMed Central** sometimes served a reCAPTCHA page, and Europe PMC's full-text service returned HTTP 500 for some articles.
  - **Recursion's investor site** returned 403; the same releases were read as filed on SEC EDGAR.
  - **github.com** refused the AlphaFold 3 repository; the README was read from raw.githubusercontent.com.
- **Internet Archive.** Capture pages were blocked by this environment's network policy. Capture addresses come from the availability service and are marked unchecked. A current copy does not authenticate earlier wording. Several records state that a dated page's wording is attested only from 2026-10-30:
  - DeepMind's 2020 account;
  - the Isomorphic Labs launch article of 2021;
  - EvolutionaryScale's ESM3 post of 2024.
- **Inferred dates.** Two DeepMind blog pages now display dates (15 January 2022 and 22 July 2022) that contradict their own texts. Four records date them by inference from the text (2018; July 2021), with a written rationale, and are in the cross-family brief.
- **Script-rendered pages.**
  - **Genentech's 2021 Prescient Design story:** the text sits in script data, so its two records rest on paraphrase that the quotation check cannot verify.
  - **BioMap's site:** served only as a JavaScript bundle; it is recorded as the page text as served.
  - **Arc's Virtual Cell Challenge site:** has no served text.
- **Not found.**
  - EvolutionaryScale's founding date, founders and seed round: none of its own pages that answered states them.
  - BioMap's founding year and the BioMap–Sanofi collaboration.
  - Pushmeet Kohli's Google DeepMind title.

  Nothing was recorded from memory or from aggregator pages.

- **Figures that disagree.**
  - The AlphaFold database's size is stated differently in different expressions (over 360,000 or "the initial 300k" for 2021; over 200 million or over 214 million later). These are kept as separate dated statements.
  - Jumper's title on 9 October 2024 is "Senior Research Scientist" in the Nobel release and "Director" in Google DeepMind's post. Both are kept.
- **Same model family.** All drafting, integration and audit passes were one model family. Agreement among them is not independent corroboration.

## Reproduction

From the repository root:

```sh
node research/ai-in-biology/tools.mjs fetch <cacheKey> <url>   # one source at a time; AIB_UA overrides the user agent
node research/ai-in-biology/tools.mjs grep <cacheKey> "<regex>"
node research/ai-in-biology/tools.mjs check research/ai-in-biology/drafts/<group>.json
node research/ai-in-biology/tools.mjs hazards research/ai-in-biology/drafts/<group>.json
node research/ai-in-biology/siblings.mjs                         # -> sibling-ids.json (needs the sibling branches fetched)
node research/ai-in-biology/dataset-timeline.mjs                 # -> timeline-dataset.json
node research/ai-in-biology/tools.mjs merge                      # drafts -> pack.json
node research/ai-in-biology/tools.mjs verify                     # -> verification.json
node research/ai-in-biology/tools.mjs render                     # -> pack.md
node research/ai-in-biology/tools.mjs brief 2026-10-30           # -> cross-family input and verdicts
npx prettier --write research/ai-in-biology/
```

`integrate.mjs` and `sample.mjs` were each run once, on the drafts and on the pack as they then stood; re-running `sample.mjs` would draw a different sample from a different pack. The cache lives in the ignored `.local/ai-in-biology/` folder. A fresh checkout must re-fetch each source from the address in `pack.json` under its `cacheKey`; compare SHA-256 values, since current responses may differ.
