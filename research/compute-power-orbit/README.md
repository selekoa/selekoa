# Compute, power and orbit, 2023–2026

Backlog item B of the [roadmap](../../docs/roadmap.md): a documentary record of the build-out of AI compute between 2023 and 2026. It covers data-centre projects, power agreements and chip supply, and published plans for compute in orbit together with the arguments made for and against them. Each record says who stated what and when, with every figure and date as its source gives it.

It is a candidate research pack outside application data. It was machine-prepared and audited by the same model family (Claude). Nothing in it is editorially accepted or human-reviewed, and the cross-family check has not been run. It changes nothing in `data/`, the application, the schema or any release. It extends the dataset's capital and compute records (Stargate, Abilene, OpenAI–Oracle, Colossus, Rainier and the cloud and capacity agreements) and the BIS export-control records admitted in v0.11.0, without re-recording them.

## Files

- [scope.md](scope.md): what is in and out, the unit of record and the rules. It was written and pushed before research began.
- [pack.md](pack.md): the readable pack, generated from `pack.json`. It opens with counts and a **timeline** of dated events, set beside the dataset's existing compute, capital and export-control dates (marked ◇). Two tables follow it: stated targets and terms, which are projections, and earlier dates stated in passing. The pack then has one section per strand, grouped by project, agreement or measure. The orbital section opens with a table of propositions (OC1–OC11) giving each one's earliest located text. Candidate entities and documents, proposed predicates, omissions, retrieval failures, the drafting passes' open questions and the source table close it.
- [pack.json](pack.json): the candidate records in the dataset's shape, each with its evidence. It also holds the candidate documents and entities, the sources (address, HTTP status, SHA-256, retrieval date, word count, source role) and three derived lists: `timeline` (dated events), `statedTargets` (stated dates other than the event date) and `proposedPredicates` (counts).
- [timeline-dataset.json](timeline-dataset.json): dated compute, capital and BIS records already in the dataset, made by [dataset-timeline.mjs](dataset-timeline.mjs).
- [verification.json](verification.json): the mechanical check of every quotation and of the quotation budget per source.
- [audit.md](audit.md), [audit-sample.json](audit-sample.json) (drawn by [audit-sample.mjs](audit-sample.mjs)) and [audit/](audit/): the same-family audit of a 64-record sample (30 random, 34 targeted), the dispositions, and the widened family checks.
- [cross-family-input-2026-10-28.md](cross-family-input-2026-10-28.md) and [cross-family-verdicts-2026-10-28.json](cross-family-verdicts-2026-10-28.json): the blind brief for a cross-family check, with the pack's answers in a separate file. Not yet run.
- [drafts/](drafts/): the four strand drafts the pack is merged from, and their [format](drafts/FORMAT.md). Corrections are made in the drafts, never in `pack.json`.
- [tools.mjs](tools.mjs), [build.mjs](build.mjs): retrieval, search, quote checking, merge, render and brief.

## Method

1. **Scope first.** [scope.md](scope.md) was written from the dataset's existing records before any source was retrieved.
2. **Drafting by strand.** Four fresh-context passes drafted their records in parallel, to a common brief and format: data-centre projects, power, chip supply and orbital compute. Each pass found sources through search, retrieved them by direct HTTP with `tools.mjs fetch`, and checked its own quotations with `tools.mjs check`. Each also listed omissions, retrieval failures and open questions. Search results were used for discovery only; every evidence passage comes from a retrieved source.
3. **Integration.** The integrator merged the drafts and checked identifiers against the dataset. It mapped bounds and amount scopes to the dataset's enumerations and checked every flagged wording. It also corrected three date bases that rested on a party's statement of a decision. The drafts held 222 records; 22 detail records were dropped to keep the pack within its bound of about 200, and each is listed among the omissions with its reason. One record was added after the audit, where a rule's own text linked it to a dataset record (see [audit.md](audit.md)).
4. **Mechanical verification.** Every quotation is matched against the retrieved text of its own source. The check enforces the limits of 50 words per quotation (100 characters for Chinese) and the policy's per-source budget, counting the dataset's existing quotations from the same expression. It also checks locators and required fields.
5. **Same-family audit.** Two fresh-context auditors checked 64 records against the sources and tried to refute them. The sample was 30 random and 34 targeted records: figures, stated status and stage words, signatures, press-only records, extensions of dataset records, and contesting and earliest-located arguments. A correction pass verified and applied the findings in the drafts, then widened the checks to the affected record families across the whole pack. See [audit.md](audit.md).
6. **Cross-family brief.** A blind brief of 120 items is prepared for one run by a reviewer from a different model family. No record is admitted before that check, under the editorial policy.

## How to read a record

- **Announced stays announced.** A release is evidence that its publisher announced something. It is not evidence that a contract was signed, a site built, power delivered or chips shipped. A record states a signature, construction or operation only where a party says so, and it is dated by that statement (`operational_stated`, `launch_stated`).
- **Figures are as stated.** Capacity is recorded in `attributes.quantity` with the source's own wording, its bound (`up_to`, `at_least`, `approximate`, `more_than`) and what it measures where the source says: IT capacity, facility power, grid connection, generation or chips. Amounts are recorded in `attributes.amount` with a note on their scope. Nothing is converted, summed or compared across sources, and no party is given a project's whole amount unless the source does.
- **Targets are projections.** A target year for operation or delivery, a deadline or a contract term is kept in `attributes.statedDates`, never as the record's event date. `pack.md` lists these dates apart from events.
- **Arguments are propositions.** Each orbital argument is a candidate concept (OC1–OC11) with a neutral criterion. Records whose subject is the document stating the argument use `articulates_proposition`, `contests_proposition` or `bears_on_proposition`. "Earliest located" means the earliest text found by this pack's bounded searches; it never means "first".
- **Press-only.** A record that rests only on press reporting is marked `pressOnly` and says so.
- **Proposed predicates.** Where the dataset has no fitting predicate (site announcements, power and supply agreements, government awards, plans, launches, filings and regulator decisions), the record is marked `proposedPredicate` and the schema is unchanged. See the open questions in the [review report](../../review/compute-power-orbit-pack-2026-10-28.md).
- Records that extend a dataset record name it in `extends`.

## Limits and retrieval

- **Bounded selection.** The pack covers frontier developers' own projects and agreements, their compute partners, regulator records, and government texts that address AI compute. It does not cover every data-centre announcement, power contract or chip order. Omissions are listed with reasons in `pack.md`; an omission is not a judgement of importance.
- **OpenAI and xAI.** openai.com and x.ai refused direct retrieval, so OpenAI's and xAI's own posts were not read. Their agreements rest on counterparties' releases (Oracle, SoftBank, NVIDIA, AMD, Broadcom, Microsoft, Crusoe, Vantage, G42, Nscale) or on government releases. The cross-family checker is asked to open their posts or captures.
- **Filings and regulators.** sec.gov, ferc.gov, fcc.gov (licensing), the Louisiana PSC portal, TVA and some investor-relations sites refused. Where they did, records use company statements of the decision, dated by the statement, or FCC public notices (docs.fcc.gov), or Federal Register texts. Four power records and three Chinese constellation records rest on press reports and are marked press-only.
- **Internet Archive.** Capture pages refused connections, and the availability service answered HTTP 429 for most of the day. Most sources therefore have no capture address. A current copy does not authenticate earlier bytes.
- **Mutable pages.** Company announcement pages can be edited after release. A White House fact sheet of 29 September 2026 describes an order to replace "AI" with "SI" in executive-branch documents, so US executive-branch pages served after that date may differ from the text as first released. Federal Register texts were preferred where both existed.
- **China.** The NEA's and MIIT's sites refused, and the main MOFCOM host did not resolve. Texts are from gov.cn, ndrc.gov.cn, MOFCOM subsites and a provincial reprint, each labelled. Zhejiang Lab's site reset connections.
- **Same model family.** All drafting, integration, audit and correction passes used one model family. Agreement among them is not independent corroboration.

## Reproduction

From the repository root:

```sh
node research/compute-power-orbit/tools.mjs fetch <cacheKey> <url>     # one source at a time; CPO_UA overrides the user agent
node research/compute-power-orbit/tools.mjs grep <cacheKey> "<regex>"
node research/compute-power-orbit/tools.mjs archive <url>               # closest capture address (unchecked)
node research/compute-power-orbit/tools.mjs check research/compute-power-orbit/drafts/<strand>.json
node research/compute-power-orbit/dataset-timeline.mjs                   # -> timeline-dataset.json
node research/compute-power-orbit/tools.mjs merge                        # drafts -> pack.json
node research/compute-power-orbit/tools.mjs verify                       # -> verification.json
node research/compute-power-orbit/tools.mjs render                       # -> pack.md
node research/compute-power-orbit/tools.mjs brief 2026-10-28             # -> cross-family input and verdicts
npx prettier --write research/compute-power-orbit/
```

The cache lives in the ignored `.local/compute-power-orbit/` folder. A fresh checkout must re-fetch each source from the address in `pack.json` under its `cacheKey`. Compare SHA-256 values, since current responses may differ.
