# Economics of Machine Intelligence

**Status: aim, scope, name and propositions accepted by the maintainer on 2026-10-09; phase 1 and the mainstream pack admitted on 2026-10-14, the esoteric strand on 2026-10-16 (below).** Machine-prepared on 2026-10-08 and corrected on 2026-10-10. Nothing here authorises publication.

A major focus project on how economics as a field has approached machine intelligence: a source-critical record of the documented economic arguments about it. It records who argued what, when, in which version of a text, and on which premises or model assumptions. It does not forecast, and it does not assess whether an argument or a model is right. It belongs to the spine on [human thought and institutions around machine intelligence](../project-positioning.md#human-thought-and-institutions-around-machine-intelligence).

## Purpose

Economic claims about machine intelligence are cited often and read rarely. A growth rate from a model is quoted without the model's conditions, a working paper is cited by its later journal year, and a critique is presented as a refutation of a claim it did not address. The project should let a researcher see, for each proposition, the texts that state it, the texts that answer it, and the conditions each text attaches.

Rules particular to this project, beyond the [editorial policy](../editorial-policy.md):

- **A model's assumptions are part of its claim.** A passage from a formal model articulates a proposition only with the conditions under which the model derives it, such as an elasticity of substitution above one or full automation of research. A conditional result is never recorded as an unconditional forecast.
- **Versions are dated separately.** Working papers, journal versions, book chapters and later revisions carry their own dates. The checked wording decides the record's wording date. A journal year never backdates or postdates a working paper's wording.
- **Engagement is stated.** A text that answers a premise is kept apart from a text that states a contrary conclusion without giving a reason against that premise, under the message-level rule of [schema 2.12](../ontology.md#contesting-records-retrospectives-and-context-only-passages-schema-212).
- **No labels.** Authors are not sorted into camps such as optimists, sceptics or accelerationists. Self-descriptions are recorded as such.
- **Estimates stay attributed.** A growth rate, probability or productivity figure is the author's estimate under the author's stated conditions. Figures from different texts are never combined.

## Proposed phases

| Phase | Scope                                                                                                                                                                                                                                                      | Status                                  |
| ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| 1     | The explosive-growth debate: whether machine intelligence produces growth far faster than historical rates, and the bottleneck, empirical and forecast arguments against it. Twelve texts from 1994 to 2024, each retrieved and checked passage by passage | Admitted 2026-10-14 (G01–G09)           |
| 2     | Wider growth literature: earlier and later texts on the same propositions, journal versions of phase 1 working papers, and directly engaged replies. Includes the retrieval of I. J. Good (1965), which failed in phase 1                                  | Proposed                                |
| 3     | Labour, wages and distribution: task-based automation models, the labour share, and the earlier economic writing on machinery and employment                                                                                                               | Proposed                                |
| 4     | Costs and inputs as argued in texts: compute prices, scaling and the economics of training, linked to (not duplicating) the capital and compute records                                                                                                    | Proposed; needs a boundary decision     |
| 5     | Institutional economic statements: forecasts and analyses published by laboratories, central banks, international organisations and governments                                                                                                            | Proposed; needs a source-selection rule |

Each phase states exactly what was searched in a "How we searched" note. "Earliest located" means earliest within that searched scope, never first use.

## Phase 1: the explosive-growth spine

The working material is in [`research/economics-growth/`](../../research/economics-growth/README.md): nine generic propositions (codes `G01`–`G09` in the pack) with passages that articulate, contest or bear on them, from twelve texts dated 1994 to 2024. Its scope note, audit report and per-passage verification are the current "How we searched" record. It is a candidate pack outside application data. Nothing in it is editorially accepted.

The propositions separate four kinds of argument that are often merged:

- **Mechanisms** (G01, G02, G07): what follows if machines substitute for labour or for researchers.
- **Constraints** (G04, G05): what could prevent the mechanism from producing explosive growth. G04 holds constraints that work by keeping tasks unautomated or automating them slowly; G05 holds constraints that would still bind if every task were automated.
- **Evidence** (G03, G06, G08): long-run history, current macroeconomic data and task-level estimates.
- **Estimates** (G09): each text's own estimate of explosive growth, with its horizon, definition and conditions.

## Relation to capital and compute

The [capital and compute](../capital-compute.md) records and [Capital II](../capital-loops.md) document transactions and capacity: who invested in or contracted with whom, at which stage. This project documents arguments. The boundary:

- Transaction records are never evidence that a growth proposition holds. A large investment is not an argument for explosive growth.
- A laboratory's or investor's own text that argues an economic proposition can become a proposition record here. Its transactions stay in the capital and compute records.
- Phase 4 links argued cost trends to the documents they rest on. It does not sum or recompute financial amounts.

## Data model

The pack follows the Yudkowsky pack's structure, mapped to the schema 2.11 and 2.12 proposition model:

| Pack relation | Schema record                                             |
| ------------- | --------------------------------------------------------- |
| `articulates` | `articulates_proposition`                                 |
| `contests`    | `contests_proposition`, with `engagement` and a rationale |
| `bears-on`    | `bears_on_proposition`, naming the `missing` element      |

Pack fields map to `thought.roles` (`earliest-located` on articulating and contesting records only), `claimed` and `attested` dates, and `contextOnly` on evidence. Fields with no schema home yet: the model `conditions` of a passage (a structured assumptions field is to be added at admission), the `versions` and `publishedVersion` of a source, the source `tier`, the tier-2 role `earliest-located-tier-2`, and the G09 `estimate` record.

## Maintainer decisions (2026-10-09)

Recorded in substance as given; applied in the correction pass of 2026-10-10 ([audit](../../research/economics-growth/audit.md#corrections-after-cross-family-check-2026-10-10)).

1. **Aim and scope.** The project records how economics as a field has approached machine intelligence. The explosive-growth spine is phase 1. Scope, name and propositions G01–G09 are accepted.
2. **Source tiers.** Tier 1: scholarly work by economists in any venue (journals, working papers, books, chapters, reports they wrote), plus core economics venues. Tier 2: non-economists, blogs, think-tank reports and magazine debates, labelled as such. Earliest located is computed within tier 1 by default; the tier-2 earliest is shown separately. Every source carries a tier, and earliest-located roles are recomputed.
3. **Model assumptions.** Kept in the pack; a structured assumptions field will be added to the schema at admission.
4. **Version of record.** Quote the version actually checked; record working-paper and journal dates; earliest located is decided by the date of the wording.
5. **Collection code.** `G` is accepted.
6. **Wayback and current copies.** Provisional admission is acceptable with Wayback (or current-copy) text as the backbone, plus an APA citation of the published version.
7. **Cross-family check and terms.** The GPT check is done. Publisher terms are checked before any publication.
8. **Living authors.** No special rules: normal scholarly practice (accurate quotation, fair context, no inferred motives).
9. **G09.** The threshold of about 10% is replaced by one record per text's own estimate (author, number, horizon, conditions).
10. **G04/G05 boundary.** Settled now with a clear criterion; passages reclassified and each move recorded.
11. **Undated files.** An undated file with a dated capture is dated by the capture (attested); the author's claimed date is kept separately.
12. **Stretch goal (recorded only).** A possible article proposal to _Kansantaloudellinen aikakauskirja_. A separate branch, `economics-mainstream-pass1`, covers mainstream reception and the journal.

How they were applied: "date of the wording" is implemented as the attested date of the checked wording, as the [editorial policy](../editorial-policy.md#earliest-located-texts) requires; tiers were decided by venue form first and then by an economics appointment, address or affiliation shown in or contemporary with the text (superseded by the rule of 2026-10-11, below); the G04/G05 test is whether the constraint would still bind if every task were automated.

## Maintainer decision (2026-10-11): one tier rule

Recorded in substance as given. It supersedes the venue-first tier rule applied on 2026-10-10 (decision 2 above, as applied) and governs both economics packs: the explosive-growth pack and `economics-mainstream-pass1`. Applied in the re-tiering pass of 2026-10-11 ([audit](../../research/economics-growth/audit.md#re-tiering-under-the-2026-10-11-rule)).

- **Tier 1:** scholarly work by economists in any venue: journals, working papers, books, chapters, commission reports, and essays or articles they wrote in magazines (Leontief's 1952 article in _Scientific American_ is tier 1). An economist is an author with an economics appointment, degree, address or affiliation shown in or near the text, or an established record as an economist. Tier 1 also includes the core economics venues regardless of author.
- **Tier 2:** texts by non-economists, whatever the venue, and short-form commentary even by economists: blog comments, forum replies, and magazine or online debates, unless a turn is itself a substantive scholarly argument (the judgement is recorded).

Settled borderlines in the explosive-growth pack: Erdil and Besiroglu (2023) tier 2 (no author shown to be an economist; arXiv is not a core economics venue; reversed on 2026-10-25, see below); Roodman's post (2020) tier 1 (a long essay by an author with an established record as an economist), and his technical paper would be tier 1 but was not retrieved; Karnofsky's comment tier 2 (non-economist, blog comment); Davidson (2021) tier 2 (no economics appointment, degree or affiliation shown, no established record); the Asterisk debate turns tier 2 (no turn is itself a substantive scholarly argument); Hanson's 1998 comment on Vinge tier 2 (short-form commentary by an economist).

## Maintainer decision (2026-10-12): standing judged at the time of writing

An author's standing as an economist is judged at the time the text was written. A later record does not make an earlier text tier 1. Applied on 2026-10-12 ([audit](../../research/economics-growth/audit.md#standing-judged-at-the-time-of-writing-2026-10-12)): Hanson's "If Uploads Come First" (1994) returns to tier 2, because in 1994 he held no economics degree or appointment and none is shown on the page. The tier-1 earliest articulating record for G07 returns to his "Economic Growth Given Machine Intelligence" (attested 2000-08-19), and the 1994 essay becomes the tier-2 earliest. This settles open decision 6.

## Open decisions (maintainer to decide)

Decisions 1–13 of the 2026-10-08 draft were settled on 2026-10-09 (above). Raised by the correction pass:

1. **Erdil and Besiroglu's tier.** Settled by the rule of 2026-10-11: tier 2. Reversed on 2026-10-25: Besiroglu held an MPhil in Economics before the text, so the premise did not hold; tier 1.
2. **Roodman's technical paper.** Settled by the rule of 2026-10-11: the post is tier 1, and the technical paper would be tier 1 if retrieved.
3. **G06 wording.** The criterion says the data show "no sign yet" of approach. Nordhaus reports two positive tests and concludes "not near", so under the literal wording his record only bears on G06 and the proposition has no tier-1 articulating record. Rewording to "no persuasive evidence of a near-term approach" would make his record articulate it.
4. **Re-check of Open Philanthropy pages.** Davidson's report and Roodman's post (with Karnofsky's comment) could not be re-read on 2026-10-10: the Wayback Machine reset connections and the current host refused requests. On 2026-10-11 the recorded captures were retrieved again and all 11 quotations match them; G05-c's place under G05 has still not been re-read.
5. **Terms before publication.** NBER papers allow short quotation "not to exceed two paragraphs" with credit and the © notice; other venues have not been checked. Nothing here authorises publication.
6. **When the established record counts.** Settled on 2026-10-12: standing is judged when the text was written. Hanson's 1994 essay is tier 2, and the tier-1 earliest articulating record for G07 is his undated working paper (attested 2000-08-19).

## Admission (2026-10-14)

The maintainer authorised on 2026-10-14 admitting both candidate packs as proposition records, following the Yudkowsky precedent. Admitted the same day as the collection [“Economics of machine intelligence”](../../src/reading/economics.ts) (page `#/propositions/economics-of-machine-intelligence`), under schema 2.13:

- **Admitted:** the explosive-growth pack (G01–G09) and the mainstream pack (M01–M09, with M06a and M06b), including its Finnish strand as far as the pack records passages (ETLA Brief 22, under M07). 19 propositions, 282 passages, 231 records from 59 documents (185 tier-1 and 46 tier-2 records).
- **Excluded:** the esoteric sub-pack (E01–E05), which has had no cross-family check; its blind brief is ready ([`gpt-check-input-2026-10-14.md`](../../research/economics-mainstream/esoteric/gpt-check-input-2026-10-14.md)). The 247 Kansantaloudellinen aikakauskirja texts listed in `kak.md` are not records, because they were classified by subject, not against the propositions.
- **Schema 2.13** adds each record's tier with its basis, the role `earliest-located-tier-2` (earliest located is validated within each tier), model conditions, stated estimates, and proposition codes with a letter suffix. This settles the fields listed under “Data model” as having no schema home, except source `versions` and `publishedVersion`, which go into the source's version text.
- **Kept:** every qualification, maintainer decision, model-scenario flag, context-only reason and open item. One quotation (M07-07) was shortened to stay within 50 words as the dataset counts them.

The admission record, with the mapping, quotation re-check, self-audit, decisions made at admission and the items left open, is [`review/economics-admission-2026-10-14.md`](../../review/economics-admission-2026-10-14.md).

## Admission of the esoteric strand (2026-10-16)

The maintainer decided on 2026-10-16 to admit the esoteric sub-pack after its cross-family GPT check and the E05 decision (option A) of 2026-10-15. It was admitted the same day into the same collection as a third group, “Superintelligence and existential risk” (E01–E05), under schema 2.14: 116 of 119 passages as 86 records from 33 documents. Three passages from Hanson's 1998 comment on Vinge were held back for the quotation limit. The 17 admitted passages from Internet Archive captures rest on the GPT check of 2026-10-15, because web.archive.org could not be reached at admission. Earliest located was recomputed and equals the pack's roles. The admission record is [`review/esoteric-admission-2026-10-16.md`](../../review/esoteric-admission-2026-10-16.md).

## Corrections after the re-checks (2026-10-25)

A same-family re-check of every tier and earliest located role of the first two strands, and a blind cross-family check of 19 of its items, were adjudicated by the maintainer on 2026-10-25. Applied the same day under schema 2.16 and released as dataset v0.7.0: Erdil and Besiroglu (2023) re-tiered to tier 1; six records added (Davidson under G01, Hanson 1998 under G03, the 2016 Harvard Business Review essay under M04, the Diebold condensation of 1955 under M06a and M06b, Reuther's statement of 1955 under M06b); five earliest located roles moved; the tier-1 G09 role withheld while Hanson's "Long-Term Growth As A Sequence of Exponential Modes" is checked as a lead; M08 dated by the April 2024 version. The decision record, with each ruling and what was and was not applied, is [`review/recheck-corrections-2026-10-25.md`](../../review/recheck-corrections-2026-10-25.md).
