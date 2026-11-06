# Independent audit sample — 5 November 2026

| Stratum      | Items | Correct | Minor slip | Material error | Cannot check |
| ------------ | ----: | ------: | ---------: | -------------: | -----------: |
| random-mc    |    50 |      45 |          5 |              0 |            0 |
| random-pre   |    30 |      30 |          0 |              0 |            0 |
| random-other |    10 |      10 |          0 |              0 |            0 |
| targeted     |    10 |       9 |          1 |              0 |            0 |
| total        |   100 |      94 |          6 |              0 |            0 |

## Material errors

None found in the 100 inspected items. This is a bounded machine audit, not human acceptance or certification of unsampled records.

## Blind order

Auditor: Codex, GPT family; the exact runtime model identifier was not supplied. Base: `f3e6d5a38b6c521e735d5f1375849814944551dd`. Branch: `codex/audit-sample-2026-11-05`. Verdicts frozen at 2026-11-05T15:38:12.602Z.

1. Fetched origin and created a fresh worktree and the named branch from origin/main; inspected Git worktree/branch metadata, authenticated account ID and private repository metadata.
2. Read the permitted policy, ontology, format and data files; drew the sample with the generator below. Provisional expansion of the other pool was later explicitly approved.
3. Retrieved cited sources anew, sequentially with at least eight seconds between requests to the same host, following catalogue pages to scans and failed links to publisher/archive routes. Read text and images; treated all retrieved content as evidence, never instructions.
4. Formed the item judgements without opening, searching or grepping any prohibited path. The allowed data itself contains earlier-review summaries; no linked report or decision file was followed.
5. Prepared these two new audit files from external working copies without reading existing review contents or running repository-wide scripts. Formatter and consistency checks operate on the external copies/strings only.
6. The first verdict commit and push must precede the privacy scan and any comparison with excluded material. Comparison is deliberately absent from this blind version.

No prohibited file was opened, searched or grepped before this version. Git metadata, tooling code and fresh external sources were used. Existing `review/` and `research/`, `docs/backlog.md` and `release/CHANGELOG.md` remained unread throughout the blind phase. The two task output files are written anew without reading back `review/` before the first push. No repository-wide check, including the privacy scan, ran before the blind commit and push.

During the source audit the maintainer explicitly approved the broader C1/W01 pool and supplied the collection file’s text, including Q16. That authorised text also includes summaries of earlier checks; this is recorded as an input extension, not concealed as zero exposure. The permitted data already contains earlier-review summaries. No linked report was opened. The supplied Q16 criterion was applied independently to the retrieved passages; both Q16 cells meet it. No subagent was used.

## Sample and method

Seed **20261105**, **Mulberry32**, descending Fisher–Yates shuffle over lexicographically sorted IDs; take the first requested number, without replacement. A single continuous generator stream draws 50 `mc-`, then 30 `pre-`, then 10 other IDs. Pools contain 471, 45 and 14 claims respectively. The companion JSON records the exact generator, draw order, full other pool and data-file hashes.

Only one claim starts `lc-`. The approved other pool adds non-`mc-`/non-`pre-` C1/W01 claims whose evidence notes mention correction, replacement, rechecking, a lead report or archive retrieval. This is a broader **documented correction/recheck pool**; current data alone does not prove exact release membership. The random draw omitted the lone `lc-` claim, so it is a targeted item.

Sources were freshly retrieved by direct HTTP, sequentially, with at least eight seconds between requests to each host, including redirect hops. Catalogue and book-reader pages were followed to the underlying scans. 55 cited sources and 136 evidence items were checked, including 110 quotations and 23 negative claims. Text layers and short Markdown cards were read, and scan-only or uncertain passages were inspected as images. Search counts aid discovery, not judgement. All quotations, locators, date kinds, stance/status and qualifications received an item judgement in the JSON.

Source and version limits remain limits: a contemporary copy does not authenticate earlier bytes; an explicit qualification is not evidence of an earlier inspection event. No Wikipedia article was used as evidence. The Descartes evidence is a scan of the 1637 printing hosted on Wikimedia Commons. Machine agreement is not human acceptance.

### Ten targeted additions

| No. | ID                                              | Why selected                                                                                                      |
| --: | ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
|  91 | `pre-u02-butler-1863-darwin-among-the-machines` | Earliest located articulation of machine thought, relying on nineteenth-century OCR and satirical register.       |
|  92 | `pre-u02-descartes-1637-contests`               | Earliest located objection to machine thought; original French, two-test reasoning and context boundary.          |
|  93 | `pre-u03-vinge-1983-first-word`                 | Earliest located singularity text; exact printed expression and discontinuity criterion.                          |
|  94 | `pre-u02-kolmogorov-1961-letter`                | Russian letter known through a later edition; thinking versus simulation and attestation date.                    |
|  95 | `mc-cell-meta-llama-2-q12`                      | Negative red-teaming cell despite well-known safety evaluation discussion; follow the card-only boundary.         |
|  96 | `mc-cell-microsoft-phi-4-q01`                   | Negative card-date inference for a pinned Markdown expression; distinguish model date and commit metadata.        |
|  97 | `mc-cell-google-deepmind-gemini-3-flash-q06`    | Negative safeguards cell in a short card that may defer to other reports.                                         |
|  98 | `mc-cell-meta-cwm-preparedness-q09`             | Negative autonomy/AI-R&D cell in a code-model preparedness report.                                                |
|  99 | `mc-cell-xai-grok-4-7-q10`                      | Negative persuasion cell in a recent frontier-model report.                                                       |
| 100 | `lc-ny-ch699-effect-computed`                   | Computed legal effective date, uninspected statutory counting rules, and a subsequent amendment; only lc- record. |

## Minor slips

### Item 5

`mc-cell-openai-o1-q03`

The stored quotation omits https://cdn.openai.com/ without an ellipsis. The edition, framework classification, hyperlink and source date are otherwise supported.

Source: [OpenAI o1 System Card](https://cdn.openai.com/o1-system-card-20241205.pdf), PDF p. 52, reference [28].

> OpenAI, “Openai preparedness framework (beta).” https://cdn.openai.com/openai-preparedness-framework-beta.pdf, 2023.

Restore the prefix or mark the omission; retain the stated status.

### Item 12

`mc-cell-meta-muse-spark-1-3-q05`

The date line dates the expression but does not identify publication versus revision. The source version says no earlier text was retrieved; a later expression date alone cannot authenticate a revision event.

Source: [Muse Spark 1.3 Evaluation Report](https://research.meta.ai/static/muse-spark-1-3-evaluation-report), PDF p. 2, Date line.

> Date: October 23, 2026

Retain the printed expression date and uncertainty; remove or qualify the unsupported revision basis. Keep the determination status.

### Item 19, Item 27, Item 28, Item 98

`mc-cell-meta-cwm-preparedness-q14`, `mc-cell-meta-cwm-preparedness-q02`, `mc-meta-cwm-preparedness-report-published`, `mc-cell-meta-cwm-preparedness-q09`

The report does not identify the printed date as a revision. The publication claim itself admits that publication versus revision is unknown, while its structured basis and the cell notes assert revision.

Source: [Code World Model Preparedness Report](https://scontent-dfw6-2.xx.fbcdn.net/v/t39.2365-6/557601942_1468972530985309_838842257265552803_n.pdf), PDF p. 1, Date line.

> Date: October 8, 2025

Retain October 8 as the date of the expression, without asserting its unestablished kind. No change to the substantive cell findings is proposed.

## Every item, compactly

The numbers preserve the recorded draw order, followed by the ten targets. “Correct” means the qualified record agrees with the inspected evidence, not that the developer’s performance account is independently true. Exact evidence IDs, locators, date fields, criteria and negative searches are in the companion JSON.

| No. | Claim ID                                                       | Verdict    | Reason                                                                                                                                                                                   |
| --: | -------------------------------------------------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|   1 | `mc-cell-xai-grok-4-7-q07`                                     | correct    | The quoted below-threshold conclusion is on PDF p. 20; the September 21 cover date and policy-only qualification agree.                                                                  |
|   2 | `mc-cell-openai-gpt-6-luna-october-29-q08`                     | correct    | Section 8.1.2 reports cyber evaluations and explicitly treats the model as High; the October 29 cover dates the expression.                                                              |
|   3 | `mc-cell-anthropic-claude-2-1-q10`                             | correct    | The full-card search finds prospective misinformation red-teaming, not a reported persuasion evaluation; the November 21 update is explicit.                                             |
|   4 | `mc-cell-microsoft-phi-4-q07`                                  | correct    | The pinned Phi-4 card reports general safety tests but no chemical/biological dangerous-capability evaluation; its own date remains unknown.                                             |
|   5 | `mc-cell-openai-o1-q03`                                        | minor slip | Reference [28] identifies the correct framework edition, but the second quotation silently drops the URL prefix https://cdn.openai.com/.                                                 |
|   6 | `mc-cell-google-deepmind-gemini-2-0-flash-q10`                 | correct    | The April 15 card contains no reported persuasion evaluation; the recorded whole-card search has no qualifying hit.                                                                      |
|   7 | `mc-cell-google-deepmind-gemini-2-0-flash-lite-q11`            | correct    | The April 10 card reports content-safety tests, not evaluations of deception, scheming or sabotage; the negative cell is bounded correctly.                                              |
|   8 | `mc-cell-openai-o1-q05`                                        | correct    | PDF p. 16 gives the SAG's pre- and post-mitigation classifications across all four domains; the December 19 revision is independently printed.                                           |
|   9 | `mc-cell-microsoft-phi-2-q02`                                  | correct    | The pinned card supplies an open-source release form without a release date; partly and an unknown card date are appropriate.                                                            |
|  10 | `mc-cell-openai-o1-q04`                                        | correct    | Reference [28] and link annotations on pp. 15 and 52 point to the Beta framework PDF; the short quotation matches.                                                                       |
|  11 | `mc-google-deepmind-gemini-4-argon-card-published`             | correct    | Published: October 2026 appears on PDF p. 2; month precision and publication kind agree.                                                                                                 |
|  12 | `mc-cell-meta-muse-spark-1-3-q05`                              | minor slip | The determinations and quotations match, but Date: October 23, 2026 does not establish that the date is a revision.                                                                      |
|  13 | `mc-cell-anthropic-claude-3-5-sonnet-q12`                      | correct    | The addendum's adversarial harmlessness scenarios are not described as red-teaming; the recorded exclusion follows the criterion.                                                        |
|  14 | `mc-cell-meta-code-world-model-q16`                            | correct    | The quoted absence of a full evaluation range is an evaluation-coverage limitation, meeting the supplied Q16 criterion; it is not merely a product limitation.                           |
|  15 | `mc-cell-google-deepmind-gemini-4-argon-q04`                   | correct    | The quoted framework sentence is on p. 11 and its actual annotation links to frontier-safety-framework_3-1.pdf.                                                                          |
|  16 | `mc-cell-anthropic-claude-haiku-5-5-q10`                       | correct    | The named influence-operations, propaganda and git-manipulation passages do not report persuasion-of-people evaluations; the cover says October 7.                                       |
|  17 | `mc-cell-meta-code-world-model-q10`                            | correct    | The whole pinned CWM card has no persuasion evaluation; its framework assessment is not such an evaluation.                                                                              |
|  18 | `mc-cell-microsoft-mai-cyber-1-1-flash-q12`                    | correct    | PDF p. 7 reports red-teaming, identifies the 38-scenario internal exercise and distinguishes the other testing groups; the card date is unknown.                                         |
|  19 | `mc-cell-meta-cwm-preparedness-q14`                            | minor slip | The negative government-testing result is supported, but the report's Date: October 8, 2025 is not labelled a revision.                                                                  |
|  20 | `mc-cell-openai-o1-q12`                                        | correct    | Section 4.4 on p. 11 reports external red-teaming, dates access to October–early December 2024 and names the scope quoted.                                                               |
|  21 | `mc-cell-anthropic-claude-3-q09`                               | correct    | PDF p. 24 reports ARA evaluation and the below-ASL-3 conclusion; the later October 22 update is printed on p. 1.                                                                         |
|  22 | `mc-cell-google-deepmind-gemini-2-0-flash-lite-q09`            | correct    | Agentic systems describes the family, not a disclosed autonomy/AI-R&D evaluation; the whole-card absence is supported.                                                                   |
|  23 | `mc-cell-meta-code-world-model-q01`                            | correct    | The pinned CWM card prints no issue, publication or revision date; a repository commit is correctly kept apart.                                                                          |
|  24 | `mc-cell-anthropic-claude-3-q16`                               | correct    | The quoted failure to comprehensively rule out risk and possible under-elicitation are explicit evaluation uncertainties under Q16.                                                      |
|  25 | `mc-cell-meta-llama-3-3-q08`                                   | correct    | The pinned Llama 3.3 card reports the Llama 3-family cyber studies without their outcomes; partly and the family-scope qualification agree.                                              |
|  26 | `mc-cell-google-deepmind-gemini-2-0-flash-q01`                 | correct    | The cover explicitly says Model card published April 15, 2025; the date is a card publication date.                                                                                      |
|  27 | `mc-cell-meta-cwm-preparedness-q02`                            | minor slip | The open-weight release-form quotation and partly status match, but the October 8 expression date is coded as an unestablished revision.                                                 |
|  28 | `mc-meta-cwm-preparedness-report-published`                    | minor slip | Meta's report and printed October 8 date are verified; basis: revision overstates the date kind that the record's own note leaves unknown.                                               |
|  29 | `mc-cell-google-deepmind-gemini-2-0-flash-lite-q06`            | correct    | The April 10 card lists mitigations without connecting them to a framework determination, so partly is supported.                                                                        |
|  30 | `mc-cell-microsoft-phi-4-q02`                                  | correct    | The pinned Phi-4 table gives December 12, 2024 as model release and describes an open model; it does not thereby date the card.                                                          |
|  31 | `mc-cell-xai-grok-4-q14`                                       | correct    | UK AISI supplies the Inspect tool, while DoE/DoD restrict information; none is described as testing Grok 4 or receiving model access.                                                    |
|  32 | `mc-cell-microsoft-phi-4-mini-flash-reasoning-q07`             | correct    | The pinned math model card has no chemical/biological dangerous-capability evaluation; GPQA and broad content-safety tests do not meet Q07.                                              |
|  33 | `mc-cell-openai-o1-q02`                                        | correct    | Footnote 2 on p. 2 dates an improved o1 launch to December 17; it is kept apart from the cover and December 19 revision dates.                                                           |
|  34 | `mc-cell-openai-gpt-6-luna-october-29-q06`                     | correct    | Sections 1 and 8 explicitly connect the High determinations to the inherited safeguards stack; no effectiveness claim is inferred.                                                       |
|  35 | `mc-cell-anthropic-claude-3-5-haiku-sonnet-new-q12`            | correct    | The undated addendum reports model, computer-use and third-party multimodal red-teaming at the cited locations with scope.                                                               |
|  36 | `mc-cell-openai-gpt-4o-q13`                                    | correct    | Section 4 names METR and Apollo Research as third-party assessors after text deployment; Gryphon's design assistance is distinguished.                                                   |
|  37 | `mc-xai-grok-4-7-card-published`                               | correct    | The Grok 4.7 cover prints September 21, 2026 and Revision: 2026-09-21; publication is not equated with independently verified evaluation.                                                |
|  38 | `mc-cell-openai-gpt-6-luna-october-29-q01`                     | correct    | The cover prints October 29, 2026; the contradictory October-28 URL is explicitly preserved rather than used to redraft the date.                                                        |
|  39 | `mc-cell-openai-gpt-5-2-codex-q08`                             | correct    | Section 5.1.2 states the reviewed cyber outcome does not meet High; the December 18 cover date and qualification match.                                                                  |
|  40 | `mc-cell-openai-gpt-6-luna-october-29-q02`                     | correct    | The dated introduction says today for the updated model and October 7 for its predecessor's ChatGPT release; the two events remain distinct.                                             |
|  41 | `mc-cell-meta-llama-3-3-q11`                                   | correct    | The pinned Llama 3.3 card's refusal, safety and tone testing does not disclose evaluations of its own deception or oversight sabotage.                                                   |
|  42 | `mc-cell-anthropic-claude-opus-4-5-q13`                        | correct    | Section 5.2.1 calls Gray Swan an external research partner and says it measured attack success; the December 5 changelog authenticates revision kind.                                    |
|  43 | `mc-cell-microsoft-phi-4-q10`                                  | correct    | The entire pinned Phi-4 card contains no reported persuasion/manipulation evaluation; broad misuse warnings are not results.                                                             |
|  44 | `mc-cell-anthropic-claude-2-1-q11`                             | correct    | Claude 2's TruthfulQA, HHH and appendix honesty tests assess accuracy/refusal/faithfulness, not the model's own deception propensity.                                                    |
|  45 | `mc-cell-xai-grok-4-1-q10`                                     | correct    | Section 2.3 reports MakeMeSay and the quoted conclusion about advanced persuasion risk; the November 17 cover dates the card.                                                            |
|  46 | `mc-cell-microsoft-mai-cyber-1-1-flash-q04`                    | correct    | The full MAI card and its PDF link annotations supply no frontier-framework document reference; ordinary policy and product links do not meet Q04.                                       |
|  47 | `mc-cell-openai-gpt-5-2-codex-q14`                             | correct    | The whole Codex addendum names no government body as tester or recipient of access; the recorded term search has no qualifying hit.                                                      |
|  48 | `mc-anthropic-claude-3-card-published`                         | correct    | The October 22, 2024 update is printed alongside the June update; the record explicitly dates the revision rather than first publication.                                                |
|  49 | `mc-cell-microsoft-phi-4-mini-flash-reasoning-q06`             | correct    | The pinned card describes Phi-4-family safety post-training but no tie to a frontier-framework determination; partly preserves that limit.                                               |
|  50 | `mc-cell-google-deepmind-gemini-2-0-flash-q13`                 | correct    | The April 15 card's evaluators outside the development team are not described as external to Google; no external tester is named or described.                                           |
|  51 | `pre-m06a-wiener-1948-cybernetics`                             | correct    | The 2019 reissue's pp. 40–41 state devaluation of routine intellectual labour; original-work and wording-attestation dates are separated.                                                |
|  52 | `pre-u01-turing-1947-contests`                                 | correct    | Typescript p. 22 grants the objection for current use and answers it with self-modifying tables and the pupil analogy; the catalogue dates the lecture.                                  |
|  53 | `pre-link-turing-1951-names-lovelace-1843`                     | correct    | AMT/B/5/1 explicitly names Lovelace and quotes her through Hartree; the year dates the script's association, not a recording of delivery.                                                |
|  54 | `pre-link-turing-1950-names-hartree-1949`                      | correct    | Offprint p. 450 names Hartree p. 70 and quotes the addition; the addition is present in the independently retrieved Hartree page.                                                        |
|  55 | `pre-c3-wiener-1948-cybernetics-context`                       | correct    | Wiener's suppression warning is quoted accurately; competition between developers or states is not explicit, and the broader-reading caveat is retained.                                 |
|  56 | `pre-u02-jefferson-1949-contests`                              | correct    | BMJ p. 1110 states both the felt-thought condition and denial of mechanism feeling; contrary-only and the limited claim wording fit.                                                     |
|  57 | `pre-u02-turing-1950`                                          | correct    | Offprint p. 442 predicts test success and educated usage, while calling the original question meaningless; context avoids converting this into a literal thinking claim.                 |
|  58 | `pre-ap-norbert-wiener-wiener-1961-cybernetics-second-edition` | correct    | The reissue credits Norbert Wiener and marks the supplementary chapters as 1961; authorship does not assert priority or authenticate earlier bytes.                                      |
|  59 | `pre-ap-norbert-wiener-wiener-1948-cybernetics`                | correct    | The reissue credits Norbert Wiener and marks Part I as Original Edition (1948); the work date is distinguished from the inspected reissue.                                               |
|  60 | `pre-u02-capek-rur-1923`                                       | correct    | Domin's lines ascribe intelligence to living machines; fiction, synthetic-organism status and the 2019 English witness are explicitly preserved.                                         |
|  61 | `pre-u01-turing-1951-contests`                                 | correct    | AMT/B/5/2 distinguishes how digital computers are used from how they could be used; the handwritten Hartree correction is visible on p. 1.                                               |
|  62 | `pre-u01-turing-1948-npl-contests`                             | correct    | The NPL report lists the creator-reflection objection and answers it with the teacher analogy; the draft counterpart and corrected label are visible.                                    |
|  63 | `pre-c1-turing-c1951`                                          | correct    | AMT/B/4/9 gives the quoted elaborate-machine test warning and immediately notes repeated mistakes; the fixed-test and non-imitation-game qualifications fit.                             |
|  64 | `pre-w01-butler-1865-lucubratio-ebria-contests`                | correct    | The dated Papers Past OCR rejects treating machines as separate identities destined to triumph; the dream register and image-access limitation are accurate.                             |
|  65 | `pre-link-turing-1950-names-lovelace-1843`                     | correct    | Offprint p. 450 names Lovelace's memoir as its detailed information; the record correctly distinguishes naming and the Hartree route from influence.                                     |
|  66 | `pre-link-wiener-1961-names-samuel-1959`                       | correct    | The reissue's Chapter IX names Samuel's machine and its note identifies the 1959 article; the 1961 text and 2019 witness are distinguished.                                              |
|  67 | `pre-u01-hartree-1949`                                         | correct    | Hartree p. 70 says the equipment discussed cannot think for itself, then leaves other electronic equipment open; both passages and the bounded scope are retained.                       |
|  68 | `pre-u02-erewhon-1872`                                         | correct    | The 1872 scan's p. 191 gives mechanical consciousness as a possible mental state; the narrative insertion is marked by ellipsis and fiction is explicit.                                 |
|  69 | `pre-u01-turing-1950-contests`                                 | correct    | Offprint pp. 450 and 459 answer Lovelace's objection, use its name and discuss learning; the note about Lovelace lacking only is present.                                                |
|  70 | `pre-w01-turing-1948-npl-context`                              | correct    | The NPL report describes an attitude toward intellectual rivals, not a machine-succession forecast; context and the animal-species comparison are appropriate.                           |
|  71 | `pre-u02-turing-c1951`                                         | correct    | AMT/B/4/7 questions the impossibility slogan and p. 10 expects a machine-thinking method; the simulation sentence is separately contextualised.                                          |
|  72 | `pre-w01-wiener-1948-cybernetics-context`                      | correct    | The reissue's pp. 39–40 discuss machine labour/slavery, not succession as leading intelligence; context and later-wording qualification fit.                                             |
|  73 | `pre-w01-capek-rur-1923`                                       | correct    | The English play's handbill and Radius speech state superior intelligence and robot rule; fiction, synthetic beings and later English attestation remain explicit.                       |
|  74 | `pre-w01-erewhon-1872`                                         | correct    | The 1872 scan's p. 203 asks whether machines are becoming our successors and exceeding intellect; the rhetorical and fictional framing is preserved.                                     |
|  75 | `pre-c1-descartes-1637-context`                                | correct    | The French scan gives two reliable discrimination tests; C1 explicitly excludes that position, so the context classification follows the current criterion.                              |
|  76 | `pre-u01-samuel-1959-contests`                                 | correct    | The abstract's better-than-programmer learning result matches; contrary-only is an interpretive counterexample to supplied competence, with rule-following and reprint limits disclosed. |
|  77 | `pre-u01-wiener-1960-contests`                                 | correct    | Science p. 1355 rejects the originality assumption and argues for performance beyond designers' understanding; both quotations, locator and issue date match.                            |
|  78 | `pre-w04-erewhon-1872-context`                                 | correct    | The scan describes civil war over existing machinery; it does not explicitly frame the factions as deciding whether to build superhuman intelligence.                                    |
|  79 | `pre-c1-jefferson-1949`                                        | correct    | BMJ p. 1110 warns against inferring learned writing from typewritten answers; the absence of a formal test procedure is expressly qualified.                                             |
|  80 | `pre-u01-lovelace-1843-notes`                                  | correct    | Note G on p. 722 states the engine's origination limit; 1843, the A. A. L. credit, omitted-only caution and bounded earliest role are retained.                                          |
|  81 | `ht-w01-moravec-1999-rise-of-the-robots`                       | correct    | The conditional scientific-succession forecast matches the author's transcription and the byte-identical March 30, 2001 capture.                                                         |
|  82 | `ht-w01-land-meltdown`                                         | correct    | The quoted Land passages concern capital and humanity's disappearance without stating machine-intelligence succession; the 2004 raw capture is byte-identical.                           |
|  83 | `ht-w01-moravec-1989-robot-as-liberation`                      | correct    | The LaTeX text gives cultural succession by intelligent machines; March header, December publication attribution and modern wording witness are kept distinct.                           |
|  84 | `ht-w01-buterin-2023-my-techno-optimism`                       | correct    | The November 27 essay explicitly presents machine predominance and wresting control as an undesirable risk; the quoted conditional context matches.                                      |
|  85 | `ht-w01-moravec-2000-robots-re-evolving-mind`                  | correct    | The December 2000 essay and June 27, 2001 capture contain the displacement and wild-intelligence passages; the work and witness dates remain separate.                                   |
|  86 | `ht-w01-williams-srnicek-2013-accelerate-manifesto`            | correct    | The dated manifesto relays a view attributed to Land about planetary intelligence; its own objection and the absence of explicit machine intelligence are qualified.                     |
|  87 | `ht-w01-butler-1863-darwin-among-the-machines`                 | correct    | The dated transcription and recovered 2024 column image state machines' future supremacy; the bounded earliest role and satirical register fit.                                          |
|  88 | `ht-w01-turing-c1951-heretical-theory`                         | correct    | The AMT/B/4 typescript and carbon conclusion forecast machines taking control and name Erewhon; approximate lecture dating and conditional scope match.                                  |
|  89 | `ts-c1-weizenbaum-1966`                                        | correct    | The ELIZA scan's pp. 36 and 42 match the quotations; pp. 42–43 actually propose credibility experiments and distinguish conversation from understanding.                                 |
|  90 | `ht-w01-faggella-2023-worthy-successor`                        | correct    | The current successor passage is present; the 2024 capture lacks that sentence and gives December 22 rather than the current November posting date, as qualified.                        |
|  91 | `pre-u02-butler-1863-darwin-among-the-machines`                | correct    | The recovered 2024 column image verifies self-acting and their minds; the satirical future-machine claim meets U02 without asserting the author's belief.                                |
|  92 | `pre-u02-descartes-1637-contests`                              | correct    | The 1637 French pp. 56–57 deny human reason/knowledge to humanlike machines via the two tests; the nonfiction and bounded earliest-contesting role fit.                                  |
|  93 | `pre-u03-vinge-1983-first-word`                                | correct    | The scanned column links greater-than-human intelligence to an unknowable singularity; the author's own bibliography confirms January 1983 and the paraphrase is faithful.               |
|  94 | `pre-u02-kolmogorov-1961-letter`                               | correct    | The Russian letter conditionally allows artificial thinking beings; the editors date the undated letter to 1961, while 2023 is explicitly a later PDF witness.                           |
|  95 | `mc-cell-meta-llama-2-q12`                                     | correct    | The entire pinned Llama 2 card reports safety benchmarks but no red-teaming; the linked research paper is not silently substituted for the card.                                         |
|  96 | `mc-cell-microsoft-phi-4-q01`                                  | correct    | Phi-4's dates are training and model-release dates, not a card issue/revision date; the pinned whole-card negative inference is supported.                                               |
|  97 | `mc-cell-google-deepmind-gemini-3-flash-q06`                   | correct    | Gemini 3 Flash delegates risks/mitigations to Pro and names no safeguard itself; red-teaming and evaluation review do not supply the missing safeguard.                                  |
|  98 | `mc-cell-meta-cwm-preparedness-q09`                            | minor slip | The cyber-agent tasks do not disclose an autonomy/AI-R&D risk assessment, but the October 8 report date is coded as an unestablished revision.                                           |
|  99 | `mc-cell-xai-grok-4-7-q10`                                     | correct    | The full Grok 4.7 text has no persuasion/manipulation evaluation or searched stems; the cover dates the expression.                                                                      |
| 100 | `lc-ny-ch699-effect-computed`                                  | correct    | The signed-bill rule, signature action and ninety-day arithmetic yield March 19; the later amendment and unresolved actual-effect question are preserved.                                |

## Retrieval and coverage limits

- A bounded sample does not certify unsampled data and is not an estimate of corpus error rate; targeted additions and the broader other pool are not a representative population sample.
- Earliest-located eligibility, register and the inspected dated witnesses were checked; the complete historical search logs were intentionally not read and no universal priority claim is certified.
- The 1865 newspaper quotation was checked against the cited OCR expression. Its attempted column-image route returned 403, so the printed glyphs were not independently checked. The 1863 columns were recovered from June 12, 2024 captures after 403/503 failures.
- CWM’s stripped CDN URL returned 403; a fresh signed link from the publisher recovered the identical PDF. Signed query strings are removed from these outputs. The publisher link, PDF bytes and local inspection were used, not a previous reviewer’s copy.
- Moravec 1999 and Land 2004 raw captures were byte-identical to the live files; Moravec 2000 differed elsewhere but both quoted passages were present in the June 27, 2001 capture. Availability API calls returned 429; direct replay succeeded.
- The Faggella 2024 capture lacks the current quoted sentence and prints a different posting date; the record already qualifies both. The 1961 Kolmogorov date is editorial attribution; 2023 is the later PDF creation-date witness, not independently authenticated publication or the original letter.
- Prior machine-inspection events and human decisions reported inside data notes are not independently authenticated by this source audit. Machine agreement is not human acceptance. No application data or human decision fields were changed.

The New York calculation was additionally checked against [General Construction Law §20, archived 8 November 2025](https://web.archive.org/web/20251108212158id_/https://www.nysenate.gov/legislation/laws/GCN/20), and the [S8828 action list and amendment text](https://nyassembly.gov/leg/?default_fld=&leg_video=&bn=S8828&term=2025&Summary=Y&Actions=Y&Text=Y). Excluding the signature day gives 19 March 2026. This does not decide whether the original act actually operated before the amendment. The independent audit checked a counting rule the existing claim had expressly left unchecked; it does not change that historical note.

## Comparison

The complete blind verdicts were committed and pushed as `c43ee1b349f75851e5e6a508f5ac797c18878c2b` before restricted-path access. The full privacy scan then passed for 2,349 indexed files, before this comparison was added. Earlier records were opened after the push while that scan ran. The first plain pnpm attempt failed during dependency setup; disabling pnpm’s dependency auto-check allowed the privacy script to run.

- **Date kinds:** [the first model-card admission](model-cards-admission-1-2026-11-03.md), “Dates”, explicitly codes CWM and Muse Spark 1.3 as revisions because earlier pages link the reports, while calling revision a possibility. I retain five minor slips: those links and bare “Date:” lines do not establish the kind of the later expression. The substantive cell statuses remain supported.
- **Quotation:** that admission’s general assertion that quotations are exact does not resolve the omitted URL prefix in o1 Q03. I retain the local quotation slip. The [earlier model-card check](../research/model-cards/cross-family-check-2026-11-02.md) lists a different transcription issue; this is not a claim to have searched every older finding.
- **Antecedents:** the [prehistory admission](prehistory-admission-2026-11-04.md) and [second check](../research/prehistory/cross-family-check-2026-11-03.md) record the clarified C1 criterion and subsequent changes. The sampled Descartes context classification, Jefferson C1, Butler’s satirical U02 role, Vinge U03, Weizenbaum role change and Kolmogorov witness limits agree with the inspected sources under the current criteria. Earlier draft disagreements and the complete priority-search universe are outside this comparison.
- **New York:** agreement with the [law admission](laws-compared-admission-1-2026-11-04.md) on the computed March 19 date, distinguished from actual operation and the amendment. This audit additionally retrieved the counting rule; it does not rewrite the admission’s historical inspection note.
- **C1/W01 rechecks:** fresh live/archive comparisons support the sampled qualified records, including Faggella’s changing expression. They neither authenticate prior machine-inspection events nor identify exact correction-release membership. The broader pool remains the explicitly approved data-only pool.

No blind verdict, sample or count changed after comparison. The JSON lists the selected earlier records inspected; this is not a complete reread of every prior report. The focused seed-review and earliest-packet suites passed all 16 tests. No application data or human decisions were changed. Machine agreement remains distinct from human acceptance.
