# Dataset consistency audit, 2026-10-29

A whole-dataset consistency audit of release v0.11.0 (schema 2.19, metadata
updated 2026-10-28): 1,071 entities, 3,044 claims, 3,955 evidence records and
913 sources. It is a report and a proposed fix list only. Nothing in `data/`
changed. The maintainer decides; a later task applies the accepted fixes as a
patch release.

- **Script:** `pnpm audit:consistency [--json <path>]`
  (`scripts/audit-consistency.ts`, logic in `src/editorial/consistency-audit.ts`,
  unit test beside it). Report-only, exits 0.
- **Machine-readable findings:** [`dataset-audit-2026-10-29.json`](dataset-audit-2026-10-29.json),
  437 findings, each with check, code, severity, fix group, record IDs and details.
- **Not re-reported:** everything `datasetSchema` already enforces (duplicate
  IDs, missing subjects, objects, sources and evidence, orphaned evidence,
  quotation limits, proposition roles, interval order, dates after the dataset
  update, and the rest of `src/domain/schema.ts`). Validation passes on the
  current data, so none of those occur.

## Method and limits

The checks are heuristics over stored records. A finding is a lead for an
editor, not a verdict. No source was re-read for this audit: date and identity
findings name what the records say, and any fix that changes a proposition,
date or identity needs the source checked first. Severity:

- **high:** misleads a reader or breaks a policy rule (none found);
- **medium:** an inconsistency a reader or a later pack will trip over;
- **low:** hygiene, or a convention to settle before the next packs;
- **info:** context, or a pattern checked and found to follow the rules.

Several heuristics were tuned against false positives during the run (thread
replies sharing a subject line, chapters of one scanned volume, ordinal
"first", purpose clauses that paraphrase a legal text). The JSON keeps the
info-level results so the tuning can be inspected.

## Summary by check

| Check                     | Findings |  High | Medium |     Low |    Info | Actionable after review                                                       |
| ------------------------- | -------: | ----: | -----: | ------: | ------: | ----------------------------------------------------------------------------- |
| 1. Duplicates             |       32 |     0 |     17 |       9 |       6 | 6 source pairs recorded twice; 7 same-title document pairs to confirm         |
| 2. Type and subtype drift |       53 |     0 |     19 |      30 |       4 | 2 convention decisions, 10 predicate-drift groups (16 claims)                 |
| 3. Dates                  |       29 |     0 |      4 |      16 |       9 | 2 publication dates to re-check; 12 check-before-access dates                 |
| 4. Orphans and dangling   |       14 |     0 |      1 |       1 |      12 | 1 unused source; no dangling reference or bad collection member               |
| 5. Evidence quality       |      181 |     0 |     10 |      56 |     115 | 0 secondary-only claims with a primary source elsewhere; 10 budgets near cap  |
| 6. Wording                |       55 |     0 |      5 |      22 |      28 | 0 unattributed priority, evaluative or motive words in claim statements       |
| 7. Identifier hygiene     |       18 |     0 |     14 |       2 |       2 | 5 IDs that state a superseded stance; 9 prose references to pack-internal IDs |
| 8. Cross-pack overlaps    |       55 |     0 |      0 |      37 |      18 | 1 chamber modelling question; 32 identical statements                         |
| **Total**                 |  **437** | **0** | **70** | **173** | **194** |                                                                               |

The dataset is in better shape than its growth rate suggests: no high-severity
finding, no dangling reference, no collection member missing or out of scope,
no tertiary source used as evidence, no unattributed priority claim in our own
words, and no secondary-only claim where the dataset already holds a primary
source for the same proposition. The real debt is in conventions that packs
settled differently: entity typing, renamings, how document content is
recorded, source records per expression, and stance-bearing IDs.

## Findings

### 1. Duplicate or near-duplicate entities and sources

**Entities: no merge candidate.** Name and alias matching (ASCII-folded,
corporate suffixes and parentheticals removed, institution names also without
"AI"/"Labs"), swapped family/given order, same family name with compatible
given names, and a fuzzy pass at similarity > 0.85 over persons and > 0.8 over
institutions found no pair that looks like one referent under two IDs. The
collisions found are designed distinctions, each linked by a claim:

- `openai` / `openai-inc` / `openai-lp` / `openai-group-pbc` (control-structure
  records relate them); `microsoft` / `microsoft-ai` (`unit_of`).
- `codeium` / `windsurf`: two entities joined by
  `lg-deal-codeium-renamed-windsurf-2025`, yet `windsurf` also carries
  "Codeium" as an alias. Either the alias or the second entity is redundant;
  see decision C3.

No person is recorded twice under variant printed names; variant printed names
are carried on authorship records, as designed.

**Sources: the same expression recorded twice** (`source-same-work-twice`).
These are the near-duplicates that matter, because each copy has its own
quotation budget and its own access date:

| Pair                                                                                  | What differs                                                        |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| `source-atlas-openai-leadership` / `source-openai-leadership-transition-2023`         | re-inspection (2026-09-28, 2026-10-04); the first has no quotes     |
| `source-atlas-openai-return` / `source-openai-new-initial-board-2023`                 | re-inspection; the first has no quotes                              |
| `source-eval-i-claude2-card` / `source-eval-ontology-i-claude2-card`                  | re-inspection a day apart; both `documentId: claude2-model-card`    |
| `source-eval-i-gpt4-card` / `source-eval-ontology-i-gpt4-card`                        | re-inspection a day apart; both `documentId: gpt4-system-card-2023` |
| `source-eval-i-metr-name` / `source-eval-ontology-i-metr-name`                        | re-inspection; the first has no evidence (identity source only)     |
| `source-eval-i-spinout` / `source-eval-ontology-i-spinout`                            | re-inspection                                                       |
| `source-openai-superalignment-2023` / `source-superalignment-announcement` (low)      | re-inspection; only the second names its document                   |
| `source-aghion-jones-jones-2017-nber` / `source-aghion-jones-jones-2017-nber-capture` | live PDF and Wayback capture of the same NBER edition               |

Four further same-URL pairs are deliberate distinct expressions and should
stay: `source-meta-faf-v1-1` / `-revised` (different wording, recorded as such),
the two Trammell–Korinek NBER versions (2023 and the 2026 revision),
`source-eu-code-page` / `-taskforce` (two "Last update" states of a mutable
page) and `source-rsp-announcement` / `-capture-1415` (an earliest capture).
Pooling each pair's quotes against one budget, none exceeds the limit
(largest: the Aghion pair, 467 of 800; Trammell–Korinek, 495 of 800).

Six URL groups are parts of one container (chapters of a scanned 1966 volume,
appendix studies, the 1955 hearings, the AI-Foom compilation, Usenet bundles)
with distinct titles and documents; they are correct as recorded.

**Documents with the same title in the same year** (`document-same-title-same-year`):

- Working paper and journal article as two works:
  `acemoglu-restrepo-2019-automation-and-new-tasks` / `-jep`,
  `agrawal-gans-goldfarb-2019-ambiguous-labor-market-impact` / `-jep`.
  Each pair also has identical authorship statements (check 8), so a reader
  cannot tell the two records apart. See decision C5.
- `trammell-korinek-2023-…-nber` / `trammell-korinek-2026-…-nber-revision`:
  two versions as two works. The revision is dated 2023-10 with an attested
  date of 2026-04, which is correct for the proposition rules, but its
  `shortName` reads "(2023)".
- Distinct works, correct as they are: `kimi-k3-blog` / `kimi-k3-report`,
  `minimax-m2-licence-2025-10` / `-11`, `sl4-2002-03-08-yudkowsky` /
  `ai-box-experiment-page`, the three 1955 hearing statements,
  `paris-ai-action-statement-2025-web` / `-pdf`.

### 2. Type and subtype drift

**Comparable institutions typed differently.**

- `us-ai-safety-institute` is `organisation` ("Government AI safety
  institute"); `uk-ai-security-institute` is `public_body` ("Government AI
  safety institute (UK)"). The US record's description also says "Later
  names, reorganisation and legal continuity are not recorded", while its
  `datedNames` now record the 2025 renaming to CAISI.
- Also flagged: `cncert` (China's national CERT), typed `organisation` "for
  cataloguing; no legal status is asserted", as its description says, and
  `technology-innovation-institute` (an Abu Dhabi research institute; its
  status is not recorded). Both need the convention in C1 and, for a retype, a
  source for the body's status.
- Legislative chambers are modelled two ways: `michigan-house-of-representatives`
  is its own entity, while the California and New York chambers are folded
  into `california-legislature` and `new-york-state-legislature` (so
  `fl-us-ny-s6953b-passed-assembly` and `fl-us-ny-s6953b-passed-senate`, and
  the three SB 1047 votes, share one subject).

**Subtype vocabulary.** 65 organisation subtypes for 140 records (50 used
once), 114 document subtypes for 494 records (69 used once), 21 public-body
subtypes for 26 records. Examples of drift:

- Frontier developers: `openai`, `anthropic`, `google-deepmind`, `xai`, `reka`,
  `sakana-ai`, `ai21-labs` are "AI laboratory"; `mistral-ai`, `minimax`,
  `inflection-ai` and 24 others "AI company"; `deepseek`, `zhipu`, `ami-labs`
  "AI research company"; `cohere` and `meta` "Institutional referent"; `ssi`
  and `thinking-machines-lab` "Supporting institution".
- Role-relative subtypes that describe a record's place in a pack: "Supporting
  institution" (5: `stripe`, `tesla`, `ssi`, `thinking-machines-lab`,
  `university-of-toronto`), "Institutional referent" (5: `x-company`,
  `spacex`, `facebook-company`, `meta`, `cohere`), and for persons
  "Institutional actor" (149) and "Author" (88).
- Near-identical pairs: "Research team" / "Research teams", "Research paper" /
  "Research paper (work)", "Model card" / "Model card (report)", "Researcher
  and co-founder" / "Researcher and company founder", "Report" / "Report (OECD)".
- Subtypes and names that carry a qualification or record state:
  `uk-us-ai-safety-mou-2024` ("text not inspected"),
  `anthropic-frontier-compliance-framework` ("edition not inspected"),
  `eu-draft-implementing-regulation-gpai-proceedings-2026` ("not adopted"),
  `il-ai-safety-measures-act` ("as described by the Governor"),
  `anthropic-ltbt` ("as described by Anthropic"),
  `european-parliament-and-council` ("as legislators").

**Predicate drift: document content recorded as publication**
(`content-recorded-as-publication`). Sixteen claims on ten documents use
`published` (publisher → document) for what the text states:

- `c2-minimax-01-licence-mau`, `-military`, `-no-improve`;
  `c2-minimax-m3-licence-commercial`; `c2-minimax-prospectus-abab1`,
  `-moderation`, `-safety-assessment`; `c2-moonshot-k2-licence`, `-display`;
  `c2-moonshot-k2-report-redteam`; `c2-moonshot-k3-licence`, `-maas`;
- `fl-eu-cop-draft1-light-detail`; `fl-eu-opinion-drafting-process`,
  `fl-eu-opinion-no-kpis`; `fl-uk-aisi-focus`; `fl-uk-aisi-launch-chair-statement`.

Elsewhere the same kind of proposition is a `states_provision` record on the
document. The likely cause: provision records require document-version
metadata, which these documents lack, so the packs fell back to `published`.
The effect is that these statements appear as several publications of one
document, and `uk-ai-security-institute` has no claim at all: its launch and
renaming are recorded on DSIT's publication of the press releases.

**Renamings recorded two ways** (`renaming-two-models`). Schema 2.19 dated
names on one entity (`us-ai-safety-institute`, `uk-ai-security-institute`)
versus schema 2.5 name-transition claims between two entities
(`eval-ontology-i-arc-evals-metr-name`, `xm-meta-name`,
`lg-deal-codeium-renamed-windsurf-2025`, `lg-mx-xai-spacexai-name-2026`).

**Publisher strings.** Eleven linked publishers are printed in several forms
(DSIT seven ways, the European Commission four ways). 268 sources print a
publisher name that matches a dataset entity but carry no `publisherId`; 44 of
them say "OpenAI", which matches four OpenAI entities, and 37 say "X", the
platform.

### 3. Date consistency

- **Publication events against the work's own date.** `xm-llama-publication`
  dates Meta's publication of `llama-paper` 2023-02-24 (basis publication), the
  day of Meta's blog post; the paper's arXiv v1 and `xm-touvron-llama` give
  2023-02-27. `atlas-deepmind-chinchilla` dates DeepMind's publication of
  `compute-optimal-language-models` 2022-04-12, the blog date; arXiv v1 is
  2022-03-29. Both records describe an institutional post that links an
  earlier or later paper, but their object is the paper. See decision C6.
- **Mixed precision for one event.** `miri-ml-agenda`:
  `lineage-ii-miri-published-agenda` gives 2016-07-27,
  `lineage-ii-yudkowsky-agenda` gives 2016.
- **A scheduled date recorded as an event.** `ny-ch96-effective-date`: an
  effective date of 2027-01-01, recorded on 2026-10-11 before it occurred.
  This is how scheduled effects are modelled (`basis: effective`); the only
  question is whether a not-yet-reached date should say so (decision C7).
- **No target dates used as event dates.** Every plan, commitment and
  announcement record in the capital and compute strand is dated by its
  announcement with the stage kept separately; notes that mention a planned
  date set it aside (for example `lg-mx-pineau-meta-departure-2025`).
- **Evidence checked before its source's access date** (12): the atlas
  OpenAI control records (`evidence-atlas-openai-lp`, `-pbc-plan`,
  `-recapitalization`, checked 2026-09-28; source accessed 2026-10-04) and nine
  RSP assessment passages (checked 2026-10-03; sources accessed 2026-10-04).
  The sources' `accessedAt` was moved forward on re-inspection while the
  evidence kept its first check date. See decision C8.
- **Version date before publication date** (3, low): `source-meta-aasf-v2`
  (2026-04-07 / 2026-04-08), `source-moravec-1979-analog-html` (1978 / 1979-02),
  `source-moravec-1989-takeover-file` (1988-07 / 1989). Plausible (a dated
  draft or a file dated before posting), but `versionDate` is meant to date
  the inspected expression; confirm against the sources.
- **No conflict** between signature and publication dates (seven executive
  orders and EU acts are dated by signature with `basis: signature`), nor for
  the two Chinese texts whose posting date differs from the adoption date
  their `dateNote` explains. No source is dated after its access date; no
  evidence is checked before its source's publication date.

### 4. Orphans and dangling references

- **Unused source:** `source-wh-factsheet-2024-07-26` has no evidence and is
  not an identity source.
- **Entity without claims:** `uk-ai-security-institute` (see check 2). `g7`
  and `uk-prime-ministers-office` have no claims but are publishers of
  document versions.
- **Identity-only sources** (5) and **documents without claims** (4) are
  referred to by other records; acceptable.
- **Clean:** no dangling `statedReason`, no missing or out-of-scope member in
  the nine collections and the question starter, no proposition outside a
  collection, no evidence pointing to a missing claim. 74 document versions
  name a family key with no family concept, which the ontology allows.

### 5. Evidence quality

- **Resting on reporting:** 151 claims have only secondary supporting
  evidence (74 `held_role`, 36 `co_founded`, 23 `departure_announced`, others
  few). For none of them does the dataset record the same subject, predicate
  and object with primary evidence, or hold a primary source from a party to
  the record published the same day. Matching at year or month precision
  produced only coincidences. This does not show that no primary source
  exists; it shows the dataset does not already hold one.
- **No tertiary source** (Wikipedia, Wikidata, Britannica, Baidu Baike) is
  cited as evidence, directly or through an archive URL.
- **Quotation headroom, long texts near the cap** (medium; quoted / limit):

  | Source                                          | Used / limit | Left |
  | ----------------------------------------------- | -----------: | ---: |
  | `source-fgf-2026`                               |    399 / 400 |    1 |
  | `source-ms-fgf-2026`                            |    396 / 400 |    4 |
  | `source-ca-sb53-chaptered`                      |    393 / 400 |    7 |
  | `source-clancy-besiroglu-2023-great-inflection` |    384 / 400 |   16 |
  | `source-rsp-3-2`                                |    393 / 415 |   22 |
  | `source-rsp-3-0`                                |    370 / 400 |   30 |
  | `source-rsp-3-4`                                |    406 / 437 |   31 |
  | `source-fsf-3-1`                                |    368 / 401 |   33 |
  | `source-fsf-3-0`                                |    365 / 400 |   35 |
  | `source-eu-ai-act-2024`                         |    722 / 800 |   78 |

  The first three cannot take another quoted provision; the AI-bio pack
  already hit this on `source-fgf-2026` and `source-ms-fgf-2026`. 56 short
  messages and pages are at their cap by construction (one quoted sentence)
  and are listed at low severity in the JSON.

### 6. Wording in our own text

Scanned: entity descriptions, criteria and date notes; claim statements,
qualifications, time notes, rationales and thought fields; evidence notes,
paraphrased passages and context requirements; reuse notes. Quotations
inside these fields and source titles are excluded.

- **No unattributed priority claim** ("the first to", "coined", "pioneered")
  and no "landmark" or "historic" in our own statements. Five priority words
  occur, each attributed to its source: `lg-ev-cn-tang-jie-zhipu-cofounder-glm`
  ("The prospectus says … pioneered … first developed"), `lg-ev-mx-bansal-msl-2025`
  and `lg-ev-mx-chang-msl-2025` ("The memo lists … pioneered / invented"),
  `ec-m09-acemoglu-restrepo-2019-wrong-kind-of-ai-b` ("The authors note …
  pioneered"). The policy's rule on priority words asks for "a competent
  authority"; a company prospectus and an internal memo are self-descriptions.
  They are evidence of what those documents say, which the paraphrases make
  clear. Keep, or narrow to "describes … as" (fix A4, optional).
- **Motive words:** the four outside text-describing records are attributed
  statements (`lg-gs-brundage-openai-departure-2024` and its `statedReason`,
  `cm-eu-code-intent-anthropic`) or a criterion (`scheming`). Nineteen more are
  purpose clauses in paraphrases of legal and framework texts.
- **Ideological labels:** one, "accelerationist case" in
  `ec-m05-nordhaus-2015-economic-singularity-b`, which is the name of
  Nordhaus's model case, not a label for a person.
- **Style-guide words** (17, low): mostly the source's own words in a
  paraphrase ("nuanced" from Anthropic and OpenAI, "robust" from Meta);
  "landscape" in five RSP v3 qualifications (`cmp-rsp-v3-0-d6-competitor` to
  `cmp-rsp-v3-4-d6-competitor`) is the framework's term "competitive landscape
  analysis". The guide does not govern data records.

### 7. Identifier hygiene

- **IDs that state a stance the record no longer has** (the pattern of the
  AI-bio pack's question 5):

  | ID                                                         | ID says     | Record is                        |
  | ---------------------------------------------------------- | ----------- | -------------------------------- |
  | `ts-a2-hanson-2008-core-argument-contests`                 | contests    | `bears_on_proposition` (context) |
  | `yk-y24-sl4-2002-05-03-yudkowsky-0205-3551-a`              | articulates | `bears_on_proposition` (context) |
  | `yk-y24-extropians-2000-09-29-yudkowsky-6080-a`            | articulates | `bears_on_proposition` (context) |
  | `yk-y22-lw-2008-fighting-a-rearguard-action-against-the-b` | bears on    | `articulates_proposition`        |
  | `yk-y30-lw-2008-that-tiny-note-of-discord-b`               | bears on    | `articulates_proposition`        |

  The Yudkowsky and economics collections end proposition IDs in a stance
  letter (`-a`, `-b`, `-c`); the two Y24 records changed stance in the
  2026-10-17 cross-family dispositions. All five are merged, so their IDs are
  stable under the editorial policy. See decision C4.

- **Prose that names a record ID that does not exist** (9): seven
  `ec-e0*-trammell-korinek-2026-…-revision-*` records and the two
  Trammell–Korinek sources refer to "source nber-w31815-2023" or "nber-w31815",
  and `ec-e03-gans-2023-socially-minded-governance-agi-b` to "source
  nber-w24352 in this pack": the pack's working IDs, not dataset IDs. The
  dataset IDs are `source-trammell-korinek-2023-growth-under-transformative-ai-nber`
  and `source-trammell-korinek-2026-growth-under-transformative-ai-nber-revision`;
  the Gans 2018 paper is not a source record.
- **ID prefixes.** Sources use `source-` (642), `lg-` (210) and `c2-` (61);
  evidence `evidence-` (2,567), `lg-` (678), `ev-` (490) and `c2-` (220);
  claims carry 101 pack prefixes. No ID is shared across record kinds and no
  evidence ID names another claim. The prefixes are opaque but inconsistent.

### 8. Cross-pack overlaps

- **No cross-pack duplicate proposition** was found: no two records share
  subject, predicate, object and the distinguishing attributes (provision key,
  role, right, amount, stage) with compatible dates and similar statements.
  Earlier same-key groups (MiniMax licence terms, Microsoft–OpenAI cloud
  terms, framework change records) are distinct propositions.
- **One chamber question:** `fl-us-ny-s6953b-passed-assembly` and
  `fl-us-ny-s6953b-passed-senate` share subject, object and date and differ
  only in the chamber named in the statement (see check 2).
- **Founder role and founding** (4, same pack): `lg-cn-kai-fu-lee-01ai-ceo-2026`,
  `lg-deal-mohan-windsurf-ceo-2024`, `lg-deal-shazeer-character-ai-ceo-2024` and
  `lg-deal-simonyan-inflection-chief-scientist-2024` record a "co-founder and …"
  role beside a `co_founded` record for the same pair. Not duplicates (a role
  title as printed and a founding are different propositions); listed so a
  reader-facing count of founders does not count both.
- **Identical statements** (32): the authorship statements of the two
  same-title document pairs, mailing-list replies with the same subject line on
  the same day (`ap-eliezer-yudkowsky-extropians-1996-12-31-yudkowsky-5142` and
  `-5159`, and nine more groups), Microsoft FGF 2025 provision records and the
  comparison cells that quote the same passage, and one human-thought passage
  shared by several proposition records (`ts-a1-drexler-1995-context` and three
  others). The records are distinct; their statements do not say how.

## Proposed fixes

### (a) Mechanical and safe

These change no proposition, date, identity or stance. Each is one stored-field
edit in a patch release, with the before-rows recorded.

| #   | Fix                                                                                                                                                                                                                                                           | Records |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------: |
| A1  | Replace the pack-internal names "source nber-w31815-2023" and "nber-w31815" with the dataset IDs; reword the Gans qualification to "(Gans 2018, NBER Working Paper 24352; not a source record)".                                                              |       9 |
| A2  | Correct the description of `us-ai-safety-institute`, which says later names are not recorded although its `datedNames` record CAISI.                                                                                                                          |       1 |
| A3  | Remove `source-wh-factsheet-2024-07-26`, which nothing uses, or record why it is kept.                                                                                                                                                                        |       1 |
| A4  | Optional: narrow the five attributed priority words to "describes … as" (`lg-ev-cn-tang-jie-zhipu-cofounder-glm`, `lg-ev-mx-bansal-msl-2025`, `lg-ev-mx-chang-msl-2025`, `ec-m09-acemoglu-restrepo-2019-wrong-kind-of-ai-b`). No other wording fix is needed. |       4 |
| A5  | Differentiate the 32 identical statements by naming what separates them (the expression, the message number, the edition or the proposition), without changing the proposition.                                                                               |      69 |
| A6  | Normalise publisher strings for the eleven linked publishers to one printed form each, keeping the hosting route in `version`.                                                                                                                                |      96 |
| A7  | Give `trammell-korinek-2026-…-nber-revision` a `shortName` that names the revision ("(2023, revised 2026)").                                                                                                                                                  |       1 |

### (b) Need a source

| #   | Fix                                                                                                                                                                                                                                  | Records |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------: |
| B1  | Re-read the LLaMA and Chinchilla posts and papers, and either re-date `xm-llama-publication` and `atlas-deepmind-chinchilla` to the paper or re-scope them to the post (decision C6 decides which).                                  |       2 |
| B2  | `miri-ml-agenda`: confirm the day (2016-07-27) from the agenda's own expression and raise `lineage-ii-yudkowsky-agenda` to it, or record why the year is kept.                                                                       |       1 |
| B3  | Confirm the three version-before-publication dates (`source-meta-aasf-v2`, `source-moravec-1979-analog-html`, `source-moravec-1989-takeover-file`) against their expressions.                                                        |       3 |
| B4  | Merge the six re-inspected source pairs and the Aghion live/capture pair into one source each (move evidence, keep the earlier ID, record the other as an alias in the change record). Needs only the two copies compared once each. |       7 |
| B5  | Retype `cncert` as `public_body` only on a source that states its governmental status; its record deliberately asserts none.                                                                                                         |       1 |
| B6  | Working paper and journal article pairs (`…-automation-and-new-tasks`, `…-ambiguous-labor-market-impact`): no merge without comparing the two texts' wording.                                                                        |       2 |

No entity merge is proposed: no candidate pair has a source that identifies
the two as one referent.

### (c) Need a convention decision

Each with a recommended answer.

- **C1. Entity type for public institutions.** _Recommended:_ `public_body`
  for any body that is part of a government or established by an
  intergovernmental agreement, including state AI safety institutes, national
  CERTs and standards committees; `organisation` for state-funded but
  separately constituted research institutes and labs (`shanghai-ai-lab`,
  `peng-cheng-laboratory`, and `technology-innovation-institute` unless a
  source shows otherwise). Apply it now to `us-ai-safety-institute` (to
  `public_body`, matching the UK institute; NIST's pages describe it as housed
  at NIST) and to `cncert` once B5 has a source.
- **C2. Subtype vocabulary.** _Recommended:_ a closed list per type, recorded
  in `docs/ontology.md` and checked by this audit rather than by validation:
  for organisations "AI company" (frontier and other model developers,
  replacing "AI laboratory", "AI research company" and the role-relative
  subtypes), "Technology company", "Research unit" (internal teams, labs and
  divisions), "Research institute", "Nonprofit", "Investor", "University",
  "Legal entity" (for the control-structure vehicles, with the legal form in
  the description); for persons, a short neutral list ("Researcher",
  "Executive", "Investor", "Writer", "Public official"), never "Author" or
  "Institutional actor"; for documents, keep detail in the name and use one
  subtype per document kind. Qualifications ("not inspected", "as described
  by") move from subtypes to descriptions.
- **C3. Renamings.** _Recommended:_ one entity with `datedNames` when the
  sources describe a renaming of the same body (US and UK institutes, ARC Evals
  to METR, Codeium to Windsurf, Facebook to Meta); two entities and a
  `name_transition_announced` claim only when the sources describe a new body
  (xAI to SpaceXAI, if the sources describe a new entity). Until a migration,
  remove the "Codeium" alias from `windsurf`.
- **C4. Stance-bearing IDs.** _Recommended:_ keep the five merged IDs (they are
  stable under the editorial policy), record them in a short note so readers of
  the release know the suffix is historical, and from now on give new
  proposition records stance-neutral IDs (`<collection>-<code>-<text>`). The
  AI-bio pack's `ab-arg-b2-batalis-articulates` is unadmitted and should be
  renamed at admission, as already decided.
- **C5. Expressions of one work.** _Recommended:_ one document entity per
  work, with each inspected expression (working paper, journal version, live
  page, capture) as a source with `documentId`; separate document entities only
  for distinct editions whose wording differs and is recorded as such (as for
  framework editions). Source records are not duplicated on re-inspection: a
  re-check updates `accessedAt` and the evidence `checkedAt` on the existing
  record. Quotation budgets are counted per edition, so two sources of one
  edition share one budget (none exceeds it today).
- **C6. Publication dates of papers announced in a post.** _Recommended:_ a
  `published` claim whose object is a paper is dated by the paper's first
  public expression (arXiv v1 or the venue); a post that announces the paper is
  its own document, or the date is noted in the time note. Applies to
  `xm-llama-publication` and `atlas-deepmind-chinchilla` (B1).
- **C7. Scheduled dates.** _Recommended:_ keep effective dates as events with
  `basis: effective`, and add a time note when the date was in the future at
  `recordedAt` ("scheduled at the time of recording"), so a reader does not
  take it as a completed event. One record now (`ny-ch96-effective-date`).
- **C8. Access and check dates.** _Recommended:_ `accessedAt` is the latest
  inspection of the expression, and each evidence `checkedAt` is the date its
  passage was last checked; when a source is re-inspected, its evidence is
  re-checked and re-dated in the same change. Re-date the 12 evidence records
  of check 3 only if their passages were re-checked on 2026-10-04 (the
  re-inspection record should say); otherwise leave them and move nothing.
- **C9. Document content.** _Recommended:_ allow `states_provision` on any
  document with an exact expression (a source with `documentId`), not only on
  framework editions with version metadata, and migrate the 16
  content-as-publication claims to it in the same patch, keeping their IDs.
  `published` then records only that a document was issued. This also gives
  `uk-ai-security-institute` its launch and renaming claims as subject.
- **C10. Legislative chambers.** _Recommended:_ one entity per chamber where a
  record dates a chamber's vote (as already for Michigan); the legislature
  entity stays for enactment-level records. Applies to the California and New
  York votes.
- **C11. Publisher links.** _Recommended:_ set `publisherId` where the printed
  publisher is the author institution and the match is unambiguous; never link
  a hosting platform (X, arXiv, LessWrong, GitHub, Hugging Face) as publisher
  identity; for "OpenAI", link `openai` unless the source is a legal filing.
- **C12. ID prefixes.** _Recommended:_ no renaming of merged IDs. New sources
  use `source-` and new evidence `evidence-`; claim IDs may keep a pack
  prefix.

## Decisions needed from the maintainer

1. C1 and C2 (typing and subtypes): adopt the conventions and authorise a
   patch that retypes `us-ai-safety-institute` and `cncert` and normalises
   subtypes, or keep current types.
2. C9 (document content as provisions): a schema change (minor release) or
   leave the 16 records as they are.
3. C5 and B4 (one source per expression): authorise the seven source merges.
4. C3 (renamings): which model, and whether to migrate the four
   name-transition pairs.
5. C4 (stance IDs): keep with a note, as recommended, or supersede with new IDs.
6. Group (a): authorise A1–A3 and A5–A7 as one patch release; A4 is optional.

## Next step

After the decisions, one data task applies group (a) and the accepted (b) and
(c) items as a patch release (C9 as a minor release), with a before-snapshot
and a re-run of `pnpm audit:consistency` to show the findings it closes.
