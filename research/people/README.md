# People: executives and single-record authors

A candidate research pack for two backlog items in the [roadmap](../../docs/roadmap.md): the **executives pass** (chief executives and board chairs of the developers and parents the dataset covers, and existing person records without a role record) and **single-record authors** (people credited on exactly one dataset document who have no person record). Record by record, it gives public roles with dated intervals or snapshots from filings and company announcements, a few signed statements on frontier AI governance and compute, and person records for authors where a second public source identifies them.

It is a candidate research pack outside application data. It was machine-prepared and audited by the same model family (Claude); nothing in it is editorially accepted or human-reviewed, and the cross-family check has not been run. It changes nothing in `data/`, the application, the schema or any release. The review note is [`review/people-pack-2026-10-29.md`](../../review/people-pack-2026-10-29.md).

## Files

- [scope.md](scope.md): what is in and out, and the rules (written first).
- [pack.md](pack.md): the readable pack, by group and person: each proposed person (name, sort name, subtype, aliases, description, identity sources) and each record with its date kind, limits and evidence; candidate documents; authors listed as printed names; omissions, retrieval failures, open questions and the source table. Generated from `pack.json`.
- [pack.json](pack.json): sources (address, HTTP status, SHA-256, retrieval date, word count), candidate documents, persons and claims in the dataset's shape.
- [inventory.json](inventory.json): the baseline inventory from `inventory.ts`: single-record authors, evidence-only bylines and persons without a role record.
- [verification.json](verification.json): the mechanical check of every quotation (claim evidence and identity passages) and of the quotation budget per source.
- [audit.md](audit.md), [audit-sample.json](audit-sample.json): the same-family audit and how each finding was handled.
- [cross-family-input-2026-10-29.md](cross-family-input-2026-10-29.md) and [cross-family-verdicts-2026-10-29.json](cross-family-verdicts-2026-10-29.json): the blind brief for the cross-family check, with the pack's answers in a separate file. Not yet run.
- [drafts/](drafts/): the source-group drafts the pack is merged from (executives, existing roles, authors) and their [format](drafts/FORMAT.md). Corrections are made in the drafts, never in `pack.json`.
- [tools.mjs](tools.mjs), [build.mjs](build.mjs), [inventory.ts](inventory.ts): retrieval, search, quote checking, merge, render and brief.

## How to read a record

- **Roles.** A role record states what one source says about one role. It is an interval only where the source gives a start or an end ("since September 2014", "from June 1977 until September 2014"); otherwise a snapshot dated by the document. An interval without an end is not a claim that the role continues: its note names the latest filing that still states it.
- **As of.** Where only an undated current page exists, the record is a snapshot dated by the page's own "as of" date or by the retrieval, and says so.
- **Announced stays announced.** A future role in an announcement (Masayoshi Son as Stargate's chairman) is recorded as announced, not held.
- **Filings are the filer's statements.** A proxy statement or annual report is primary evidence of what the company says about its officers; an 8-K dates appointments as the company reports them.
- **Statements.** A signed statement is two records: authorship (person → a candidate document) and what the text says, on the proposed predicate `states_position` (document → literal). A statement is not a commitment, a policy in force or evidence of what the company did.
- **Authors.** A single-record author is proposed as a person only where a second public source identifies the person as the author of that document; the name is as printed, variant forms only where a source links them, and no affiliation printed on any page becomes a role.

## Method

1. **Scope and inventory first.** `scope.md` was written and pushed before research; `inventory.ts` listed 194 single-record authors, 69 evidence-only bylines and 36 persons (other than Writer records) without a role record.
2. **Executives.** Roles from SEC EDGAR filings (definitive proxy statements, Forms 8-K and 20-F), SoftBank Group's officer pages and NVIDIA's newsroom; statements from the companies' own sites. Ages, birth dates, family members and shareholdings printed in filings are excluded.
3. **Existing persons.** Role snapshots from the dataset's own sources, re-retrieved, and from MIRI's and 01.AI's pages; persons whose records rest on reporting only are listed as omissions.
4. **Authors.** A fresh-context drafting pass looked for a second source (institutional page, the author's own page or CV, or a later text claiming the document) for each single-record author, re-retrieved each byline, and listed the rest as printed names with a reason.
5. **Mechanical verification** of every quotation against the retrieved text of its own source, with the policy's word limits per quote and per source (counting the dataset's quotes from the same expression).
6. **Same-family audit** of a random and targeted sample; see [audit.md](audit.md).
7. **Cross-family brief**: Part A blind (role dates, identity), Part B direct (authorship and statement records).

## Limits and retrieval

- **Same model family.** All drafting, integration and audit passes were one model family. Agreement among them is not independent corroboration.
- **Mutable pages.** Company officer pages, team pages and biographies change; the records date them "as of". A current copy does not authenticate earlier wording.
- **Refusals.** openai.com, abc.xyz, investor.nvidia.com and oracle.com refused this environment (HTTP 403); filings on EDGAR were used instead. web.archive.org was not reachable. See `pack.md` for every failure.
- **Chinese heads.** Only heads the dataset's Chinese records already name are in scope; most already had role records. Liang Wenfeng, Wang Xiaochuan and Yang Zhilin have no primary role source in this pass.
- **Bounded author search.** Large team credits (the Qwen, AlphaFold, Chinchilla, LLaMA and InstructGPT papers) were searched for a handful of names each; the rest are listed as printed names, which is not a judgement that no second source exists.

## Reproduction

From the repository root:

```sh
pnpm exec tsx research/people/inventory.ts                 # -> inventory.json
node research/people/tools.mjs fetch <cacheKey> <url>      # one source at a time; PEOPLE_UA overrides the user agent
node research/people/tools.mjs grep <cacheKey> "<regex>"
node research/people/tools.mjs fill research/people/drafts/<group>.json
node research/people/tools.mjs check research/people/drafts/<group>.json
node research/people/tools.mjs merge                       # drafts -> pack.json
node research/people/tools.mjs verify                      # -> verification.json
node research/people/tools.mjs render                      # -> pack.md
node research/people/tools.mjs brief 2026-10-29            # -> cross-family input and verdicts
pnpm exec prettier --write research/people/
```

The cache lives in the ignored `.local/people/` folder. A fresh checkout must re-fetch each source from the address in `pack.json` under its `cacheKey`; compare SHA-256 values, since current responses may differ.
