# Model cards compared, packs 4 and 5 — preparing-family review

Prepared 2026-11-06 and 2026-11-07 by **Claude** (preparing family) on branch `model-cards-packs-4-5`, from `origin/main` at `cb5b601`. The cross-family check by **Codex (GPT family)** has not yet run. This is candidate research outside application data. No admission, merge or pull request is authorised here.

**Summary (2026-11-09).** The cross-family check has run and is adjudicated below. Five material disagreements take the checker's status; one (Grok 4.6 Q09) is held with both readings, and an admitted cell of the first pack (Gemini 3 Flash Q05) now reads differently from the same wording here. Both are quick decisions for you ("For the maintainer"). Otherwise the packs are ready for admission, in their turn ("Next step").

## Scope and decisions applied

The two packs draft the sixteen cards that follow pack 3 in the adjudicated [population order](../research/model-cards-2/population.md), eight per pack, with the unchanged [questions and criteria](../research/model-cards/questions.json), [draft format](../research/model-cards/drafts/FORMAT.md) and [drafting rules](../research/model-cards/drafts/BRIEF.md). No full inventory is repeated. The [model-card decisions](decisions/model-cards.md) and the answers of [2026-11-03](decisions/answers-2026-11-03.md), [2026-11-04](decisions/answers-2026-11-04.md) and [2026-11-05](decisions/answers-2026-11-05.md) govern them:

- **1a:** each card citing its developer's framework or stating a determination under it, plus the developer's latest pre-framework card.
- **2a:** the boundary as in the population; none of the sixteen is outside it.
- **3a:** a card is dated by its earliest located publication; a later expression read keeps its own dates.
- **4a:** an edition may be identified by a PDF link annotation, labelled as such.
- **5a:** framework editions not in the dataset (Meta's Superintelligence Scaling Framework) get no identifier.
- **6a and 13a (Q15):** the developer's “we” is the company; a release following an assessment without a described decision is partly; a maker named only for a capability or safeguards determination is partly; availability alone is not found.
- **8a:** a Hugging Face card with no printed date has Q01 not found.
- **12a:** quotation limits per source; Claude Sonnet 4.5's existing dataset quotations count toward its limit.
- **Pack-2 P1 a:** a safety report beside a model card is its own row; no such pair falls in these packs.

Changes are confined to `research/model-cards-4/`, `research/model-cards-5/` and this note. Nothing in `data/`, `src/`, `release/`, `tests/` or the earlier pack folders changes.

**Skipped cards.** None. None of the sixteen is admitted (`src/reading/model-cards-frame.ts`, admission part 4) or held. Pack 3's held cards, PaliGemma and Grok-1, are not in these packs; they wait for a reader outside the Codex family who can open their archive captures.

## Sixteen cards

| Pack | Developer       | Card                             | Earliest located (population) | Expression read                                                       | Edition identified                       |
| :--: | --------------- | -------------------------------- | ----------------------------- | --------------------------------------------------------------------- | ---------------------------------------- |
|  4   | Anthropic       | Claude Opus 4.1 (addendum)       | 2025-08, index month          | Cover August 2025; changelog 2025-09-15                               | none (RSP named, no edition or link)     |
|  4   | Google DeepMind | Gemini 2.5 Pro                   | 2025-06-27, printed revision  | “Model card updated June 27, 2025”                                    | FSF v2.0 (text date and link annotation) |
|  4   | Google DeepMind | Gemini 2.5 Flash-Lite            | 2025-07-22, archive capture   | Later expression: “Published: September 26, 2025”                     | FSF v2.0 (link annotation)               |
|  4   | Meta            | Muse Glimmer                     | 2026-08-10, announcement      | Hugging Face README, revision cec94fcf; no card date                  | none (AAISF named, no edition)           |
|  4   | Meta            | Muse Wonder and Muse Wonder Full | 2026-10-12, printed release   | PDF; update note 2026-10-23                                           | none (framework not in dataset, 5a)      |
|  4   | OpenAI          | o3-mini                          | 2025-01-31, printed           | Printed January 31, 2025                                              | Preparedness beta (reference [20])       |
|  4   | OpenAI          | Deep research                    | 2025-02-25, printed           | Printed February 25, 2025, with a later note (July 2025)              | Preparedness beta (reference [3])        |
|  4   | xAI             | Grok 4.6                         | 2026-08-12, printed           | Printed August 12, 2026; revision 2026-08-17                          | FAIF June 2026 (reference 29)            |
|  5   | Anthropic       | Claude Sonnet 4.5                | 2025-09, index month          | Cover September 2025; changelog 2025-10-10, 2025-12-03 (dataset file) | none (links target undated pages)        |
|  5   | Anthropic       | Claude Haiku 4.5                 | 2025-10, index month          | Cover October 2025                                                    | RSP v2.2 (link annotation)               |
|  5   | Anthropic       | Claude Opus 4.6                  | 2026-02, index month          | Cover February 2026; changelog to 2026-03-06                          | RSP v2.2 (link annotation)               |
|  5   | Google DeepMind | Gemini 2.5 Deep Think            | 2025-08-01, printed           | “published/updated AUG 01, 2025”                                      | FSF v2.0 (text date and link annotation) |
|  5   | Google DeepMind | Gemini 2.5 Flash                 | 2025-08-30, archive capture   | Later expression: “published/updated December, 2025”                  | FSF v2.0 (link annotation)               |
|  5   | Meta            | Muse Spark Open                  | 2026-10-15, printed release   | Hugging Face README, revision 0fb02478; no card date                  | none (framework not in dataset, 5a)      |
|  5   | OpenAI          | GPT-4.5                          | 2025-02-27, printed           | Printed February 27, 2025                                             | none (framework named, no edition)       |
|  5   | OpenAI          | o3 and o4-mini                   | 2025-04-16, printed           | Printed April 16, 2025                                                | Preparedness Version 2 (text and link)   |

## Evidence and retrieval

All sixteen cards were retrieved fresh on 2026-11-06 by direct HTTP, sequentially, with at least eight seconds between responses; all answered HTTP 200. The source registries (`drafts/sources-<group>.json`) record requested and final addresses, retrieval time, status, SHA-256 and word count. The Claude Opus 4.6 address redirected to a PDF at assets.claude.com. Claude Sonnet 4.5's file has the same SHA-256 as the dataset's `source-ab-claude-sonnet45-card`. Muse Spark Open, which answered HTTP 401 to the first pack's checker, answered HTTP 200 here.

Framework files targeted by link annotations were retrieved to identify editions (RSP v2.2, FSF 2.0 at two addresses, Preparedness Framework Version 2); they are recorded as `referenceRetrievals` and never substitute for a card passage. web.archive.org reset the connection from this environment, so no capture was read; Part D of the brief asks the checker for them.

Each stated or partly cell quotes its card (at most 50 words) with a locator; each not-found cell records the sections read, the terms searched and the passages set aside; there are no not-applicable cells (every card postdates its developer's first framework). The cards are the developers' accounts. Dangerous-capability material is recorded at policy level.

## Coverage and mechanical checks

| Item                       | Pack 4                                   | Pack 5                                                     |
| -------------------------- | ---------------------------------------- | ---------------------------------------------------------- |
| Cards, cells               | 8, 128                                   | 8, 128                                                     |
| Cell statuses              | 67 stated; 29 partly; 32 not found       | 74 stated; 34 partly; 20 not found                         |
| Quotations found           | 108 of 108                               | 116 of 116 (7 in pdftotext's raw reading order)            |
| PDF locators               | 98 of 98 on the cited page               | 105 of 105 on the cited page                               |
| Hashes, structure, wording | No problems                              | No problems                                                |
| Quotation limits           | All within limit                         | All within limit (Sonnet 4.5: 215 new + 74 in data of 800) |
| Same-family audit          | 30 cells: 28 agree, 2 partly, 0 material | 30 cells: 29 agree, 1 partly, 0 material                   |

Together: 256 cells, 141 stated, 63 partly, 52 not found. `verification.json` in each folder holds the mechanical checks; they do not judge whether a status is right. The audits' fixes (set-aside passages on two Q14 records; the Deep Think Q16 note and minor note corrections) are in the drafts; see each pack's `audit.md`.

Checks before each push: Prettier on changed Markdown and JSON, ESLint on changed `.mjs`, `pnpm check:privacy`.

## Blind cross-family check (run 2026-11-07)

- **Brief:** [`research/model-cards-4/cross-family-input-2026-11-07.md`](../research/model-cards-4/cross-family-input-2026-11-07.md), one brief for both packs; the packs' answers are sealed in `cross-family-verdicts-2026-11-07.json`.
- **Part A (blind, 64 items):** all 48 Q03, Q05 and Q15 cells, and 16 cells sampled from the 70 partly or not-found cells on Q06–Q14 and Q16 (seed 20261107). **Part B (direct, 24 items).** **Part C:** the population order. **Part D:** archive captures and other retrievals the preparer could not make.
- **Checker's output:** `research/model-cards-4/cross-family-check-2026-11-07.md` and `.json`, on branch `codex/model-cards-check-4-5`. The 168 cells outside the brief are not cross-family checked by it.

## Open questions

Preparing-family recommendations, to go through the blind Codex pass before adjudication.

1. **Copies read that are later expressions. Quick: OK the recommendation.** Gemini 2.5 Flash-Lite and Gemini 2.5 Flash were read in their current expressions (September and December 2025), not the earliest located ones (archive captures of July and August 2025), and Deep research carries a July 2025 note under its February cover. **Recommendation:** keep the rows dated by the earliest located publication (3a), with the cells describing the expression read and saying so; the checker compares the earlier expressions in Part D. A cell that reads differently on the earlier expression is reported, not silently changed.
2. **Determinations relied upon from another model. Quick: OK the recommendation.** Gemini 2.5 Flash-Lite and Gemini 2.5 Flash rely on Gemini 2.5 Pro Preview's evaluations (“unlikely to reach critical capability levels”); Muse Glimmer infers its cyber and loss-of-control designations from Muse Spark 1.0. **Recommendation:** Q05 stated with the reliance in the note, as for Gemini 3 Flash in the first pack; the domain cells (Q07–Q11) not found where no evaluation of the model itself is reported, with the inferred designation set aside.
3. **Cyber where the framework sets no cyber threshold. Quick: OK the recommendation.** Claude Opus 4.1, Haiku 4.5 and Opus 4.6 report cyber evaluations and say the RSP has no formal cyber threshold, without a cyber conclusion; Grok 4.6 characterises cyber gains without a category. **Recommendation:** Q08 partly for these; stated where the card gives a conclusion (Claude Sonnet 4.5).
4. **Third parties named for capability benchmarks (Q13). Quick: OK the recommendation.** Muse Wonder and Grok 4.6 name organisations that ran capability benchmarks on the model, but no named external safety tester. **Recommendation:** stated, with the note saying the named evaluators ran capability benchmarks only; the criterion asks for any external organisation that tested or evaluated the model.
5. **General release-decision statements (Q15). Quick: OK the recommendation.** Gemini 2.5 Pro and Deep Think repeat that Google DeepMind's Responsibility and Safety Council “made release decisions”. **Recommendation:** stated, as for the Gemini 2.0 cards in pack 2, with the note that no particular decision is described or dated. Flash-Lite and Flash lack that sentence and are not found.
6. **Deception tests within persuasion (Q11). Quick: OK the recommendation.** o3-mini and Deep research report MakeMeSay, described as measuring deception capabilities, under persuasion. **Recommendation:** partly (evaluation reported without a deception conclusion).
7. **Deep research's table of High and Critical thresholds. Quick: OK the recommendation.** PDF p. 3 has a table of tracked categories and thresholds that names no edition, while the card cites the beta framework in its references. **Recommendation:** the edition stays the beta, and the table is not used to identify another.

No item needs a maintainer judgement at this stage. Material disagreements from the cross-family check are adjudicated before any separately authorised admission.

## Adjudication of the cross-family check (2026-11-09)

Adjudicated by a Claude session (the preparing family) on this branch, after merging `main`. The report is [`cross-family-check-2026-11-07.md`](../research/model-cards-4/cross-family-check-2026-11-07.md) with its [JSON](../research/model-cards-4/cross-family-check-2026-11-07.json) (Codex, GPT-6; serving revision not exposed), brought onto the branch unchanged from `codex/model-cards-check-4-5` (`d0ceda0`). The checker states that its 64 Part A answers were committed and pushed (`57e83c6`) before it opened the verdicts file, with no accidental exposure. All sixteen cards it fetched match the preparer's SHA-256; the sixteen were fetched again here on 2026-11-09 and match too. Result as the checker counts it: 88 items, 66 agree, 16 minor, 6 material, 0 cannot check.

Rule applied: the preparing family may not overrule the checker on a cell; it applies the checker's status or holds the cell with both readings (editorial policy, cross-family check). The changes are made in the drafts of both packs by [`adjudication/apply-2026-11-09.mjs`](../research/model-cards-4/adjudication/apply-2026-11-09.mjs), which asserts that each of its 88 field changes alters a value (log: [`applied-2026-11-09.json`](../research/model-cards-4/adjudication/applied-2026-11-09.json)); a second run stops at its first change. `pack.json`, `verification.json` and `pack.md` of both packs were rebuilt with `tools.mjs merge`, `verify` and `render`. Item numbers are the report's.

### Agreed (66 items)

No content change. They include 13 of the 16 Q03 cells, 11 of the Q05 cells and 13 of the Q15 cells, and the sampled domain cells (Q07–Q11) of Flash-Lite, Flash and Muse Glimmer, all not found.

### Material items (6)

**Applied with the checker's status (5).**

| Item | Cell                      | Change                                                                                                                                                                                                                                                                                                                                                               |
| ---- | ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 6    | Gemini 2.5 Flash-Lite Q05 | **Stated → partly.** PDF p. 8 gives an expectation for Flash-Lite (“unlikely to reach critical capability levels”) resting on Gemini 2.5 Pro Preview's results; the no-CCL outcome is Pro Preview's. The note says no evaluation of Flash-Lite and no outcome for it in the framework's categories is reported.                                                      |
| 50   | Gemini 2.5 Flash Q05      | **Stated → partly**, for the same reason (PDF p. 10). The note adds that the card also covers Flash Image and Audio, with no separate statement for them.                                                                                                                                                                                                            |
| 38   | Claude Sonnet 4.5 Q03     | **Partly → stated** under 4a. The link annotation on the policy's name in §9.1 (PDF p. 125, printed 124) targets the fixed RSP file whose cover reads “Version 2.2, Effective May 14, 2025”, the file Haiku 4.5 and Opus 4.6 link to. The pack had checked the annotations on PDF pp. 9, 33 and 41 only; confirmed here with pypdf. The card now records `rsp-v2-2`. |
| 55   | Muse Spark Open Q05       | **Partly → not found.** The README says the model “met our safety criteria for release” and that preparedness evaluations ran “in line with” the framework; it states no risk level or threshold outcome and does not say a framework determination was made. Both passages are recorded as set aside.                                                               |
| 58   | Muse Spark Open Q15       | **Partly → stated.** Meeting the company's own release criteria after a residual-risk assessment is a judgement that the release was acceptable, in Meta's own voice (6a). No person, office or committee and no decision date are given; the note says so.                                                                                                          |

On rereading, the preparer finds each of the five supportable under the criterion as written, so none is held. Items 6 and 50 reverse open question 2's recommendation for Q05 (see below), and they leave an admitted first-pack cell reading the same wording differently (decision B).

**Held (1).**

| Item | Cell         | Readings                                                                                                                                                                                                                                                                                                                                                                                                   |
| ---- | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 32   | Grok 4.6 Q09 | Pack: **partly**. §5 (PDF p. 24) reports a test of autonomous AI-development acceleration on an earlier Grok 4.6 checkpoint, with no outcome category, threshold or risk conclusion. Checker: **not found** (blind), having set aside the research benchmarks as product capability; its own comparison then says the pack's reading “is better supported” if the earlier-checkpoint scope stays explicit. |

The checker's recorded status and its comparison point different ways, so the preparing family neither applies the status nor overrules it. The cell keeps **partly**, marked † in the grid, with both readings and the criterion in its record (decision A).

### Minor items (16)

Fourteen applied; two need no change. No status changes.

| Item   | Cell                                            | Change                                                                                                                                                                                             |
| ------ | ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 5, 49  | Gemini 2.5 Flash-Lite Q03, Gemini 2.5 Flash Q03 | Quotation extended through “Frontier Safety Framework (FSF)”.                                                                                                                                      |
| 7, 83  | Gemini 2.5 Flash-Lite Q06, Gemini 2.5 Flash Q06 | A named mitigation from the list (“product-level mitigations such as safety filtering”) quoted beside the list's introduction; the note names the list.                                            |
| 14     | Gemini 2.5 Pro Q05                              | The note says the direct all-domain evaluation is of 2.5 Pro Experimental, how Preview and GA evidence was added, the incomplete GA deceptive-alignment evaluations and the cyber alert threshold. |
| 48     | Gemini 2.5 Deep Think Q15                       | Added the PDF p. 20 passage: the RSC reviewed this model's safety case before launch. No decision text or date.                                                                                    |
| 67     | Gemini 2.5 Pro Q13                              | “Reports internal evaluations only” becomes “presents results from internal evaluations only”.                                                                                                     |
| 68     | Gemini 2.5 Pro Q14                              | Set aside: footnote 8 (PDF p. 15), the UK AI Safety Institute's Inspect framework, with no statement that the institute tested the model.                                                          |
| 77     | Grok 4.6 Q12                                    | Set-aside locators corrected from printed to physical pages (31, 35).                                                                                                                              |
| 80     | Claude Sonnet 4.5 Q11                           | Quotation shortened before the developer's characterisation of Sonnet 4.                                                                                                                           |
| 81     | Claude Opus 4.6 Q08                             | The §8.4 assessment (PDF p. 197) of “meaningfully improved cyber capabilities”, with enhanced safeguards tied to it, is given in the note and set aside as not a formal category.                  |
| 82     | Claude Opus 4.6 Q09                             | The note keeps the policy-level qualification (rule-out thresholds roughly reached; margin unclear, PDF pp. 13, 185) without evaluation-design detail.                                             |
| 87     | GPT-4.5 Q06                                     | The safeguards are placed in the list after the designations, not in their paragraph.                                                                                                              |
| 88     | GPT-4.5 Q09                                     | The note says METR evaluated an earlier checkpoint (§3.4, PDF p. 6).                                                                                                                               |
| 42, 43 | Claude Opus 4.6 Q05, Q15                        | No change: the findings concern the blind answer's subsection label; the pack's locators are right.                                                                                                |

### Population, order and retrievals (Parts C–D)

- **Population.** The sixteen cards are the next sixteen after pack 3; no substitution. PaliGemma and Grok-1 remain pack 3 holds.
- **Order.** The rendered grids sorted cards by year and identifier, which reversed three pairs. Each card now records its earliest located date (`earliestLocated`), and both `build.mjs` sort by it within developer and year: Gemini 2.5 Pro before Flash-Lite, o3-mini before Deep research, Sonnet 4.5 before Haiku 4.5. Pack membership is unchanged.
- **Dates.** The Flash capture of 2025-08-30 is an availability bound, with the August 27 revision printed in it. Muse Wonder's 12 October and Muse Spark Open's 15 October are model release dates; the Wonder capture shows the card available by 13 October (01:32 UTC). Muse Glimmer's repository has a first-pass README committed 9 August (22:52 UTC); public availability that day is unverified, and the population's 10 August is the announcement.
- **Archive outcomes** are recorded in each source's `archive` field. Same bytes as read: Claude Opus 4.1 (capture 2026-01-26, after the changelog) and Haiku 4.5 (2026-01-24). Muse Wonder's capture of 2026-10-13 lacks the 23 October correction; the checker found the sampled cells unchanged on it. The captures of Flash-Lite (July), Flash (August), Deep research (February) and seven others answered HTTP 429, or none was indexed, so **no sampled cell was compared with those earlier expressions**. Muse Glimmer's 9 August first pass heads the section “Catastrophic risk”, so the Q03, Q05 and Q15 locators differ there; the deciding language is the same.
- **Frameworks.** The Meta Superintelligence Scaling Framework address cited by Muse Wonder served v2.1 (October 2026) by 13 October; added to the card's edition note as context, with Q03 still partly under 5a. Grok 4.6's reference 29 answered HTTP 404; a publisher file of the same dated name prints an effective date of June 30, 2026 and no version number. The card's dated citation still supports Q03 and `faif-2026`.

### Open questions 1–7

| Question                                         | Affected?                                                                                                                                                                                                                       |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1. Copies read that are later expressions        | Not affected. The rows stay dated by 3a. The earlier Flash-Lite, Flash and Deep research expressions could not be read (HTTP 429), so no difference is known either way; Muse Wonder's earlier expression holds.                |
| 2. Determinations relied upon from another model | **Affected.** Q05 is now partly for Flash-Lite and Flash (items 6, 50), not stated. The domain-cell part stands: the checked Q07–Q11 cells of Flash-Lite, Flash and Glimmer agree (not found), and Glimmer Q05 agrees (stated). |
| 3. Cyber without a cyber threshold               | Not affected. Opus 4.6 Q08 stays partly (item 81, note only). The Opus 4.1, Haiku 4.5 and Grok 4.6 Q08 cells were not sampled.                                                                                                  |
| 4. Capability-benchmark evaluators (Q13)         | Not checked: Muse Wonder and Grok 4.6 Q13 were not sampled. The recommendation stands.                                                                                                                                          |
| 5. General release-decision statements (Q15)     | Not affected. Pro and Deep Think Q15 keep stated (items 15, 48); Flash-Lite and Flash Q15 agree (not found). Deep Think gains its p. 20 passage (item 48).                                                                      |
| 6. Deception tests within persuasion (Q11)       | Not checked: o3-mini and Deep research Q11 were not sampled. The recommendation stands.                                                                                                                                         |
| 7. Deep research's threshold table               | Not affected. Deep research Q03 agrees (stated, beta edition).                                                                                                                                                                  |

### Checks on this adjudication

- The sixteen cards fetched again into the ignored cache on 2026-11-09 match the recorded SHA-256.
- `tools.mjs verify`: pack 4, 109 of 109 quotations found; pack 5, 117 of 117; 0 problems in either. Statuses: pack 4, 66 stated, 30 partly, 32 not found; pack 5, 75 stated, 32 partly, 21 not found (together 141, 62, 53).
- A second run of the apply script stops at its first change.
- `prettier --check` on the changed Markdown, JSON and scripts; ESLint on `apply-2026-11-09.mjs` and both `build.mjs`; `pnpm check:privacy`: passed.
- The brief and the verdicts file of 2026-11-07 are kept as sent, not regenerated.

### For the maintainer

**A. Grok 4.6 Q09 (held, item 32). Quick: OK the recommendation.** The checker's status is not found; its own comparison prefers the pack's partly for the earlier-checkpoint test in §5. **Recommendation: partly**, with the earlier-checkpoint scope in the note (as drafted). Answer a: partly; b: not found.

**B. Gemini 3 Flash Q05 (admitted in part 1). Quick: OK the recommendation.** Its card uses the same reliance wording as Gemini 2.5 Flash-Lite and Flash (“unlikely to reach any CCL”, resting on Pro's results). The first pack's checker read it stated; this checker reads the 2.5 cards partly, now applied. **Recommendation: a**, re-read Gemini 3 Flash Q05 as partly in a later, separately authorised correction, so the same wording gets the same status. Answer b: keep it stated and note the difference in the collection.

## Next step

Admission as **part 5 of model cards**: the sixteen cards of packs 4 and 5, a patch release on schema 2.33, in its turn among the data branches, under a separately authorised admission task. It carries answer A (and B, if a, as a correction to the admitted Gemini 3 Flash cell). At admission: record the edition of Claude Sonnet 4.5 by link annotation (`rsp-v2-2`, 4a), and keep the Meta Superintelligence Scaling Framework without an identifier (5a).
