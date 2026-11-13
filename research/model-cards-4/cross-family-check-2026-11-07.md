# Cross-family check for model cards 4 and 5

| Work                | Status            | Coverage                  |
| ------------------- | ----------------- | ------------------------- |
| Part A · blind      | Recorded          | 64 cells across 16 cards  |
| Part A · comparison | Complete          | 64 of 64 cells            |
| Part B · direct     | Complete          | 24 of 24 cells            |
| Part C · population | Complete          | 16 cards                  |
| Part D · retrievals | Attempts recorded | 16 cards and 2 frameworks |

## Part A

The 64 answers were recorded from fresh developer copies and the blind brief. No preparer verdicts, packs, audits, drafts or review notes were opened. The JSON records the deciding passages, search scope for not-found answers, and PDF link annotations.

All 16 card requests returned HTTP 200. All 16 SHA-256 hashes match the preparer’s.

| Independent status | Cells |
| ------------------ | ----: |
| stated             |    29 |
| partly             |    18 |
| not-found          |    17 |
| not-applicable     |     0 |

| Items | Card                                  | Independent answers in item order                                                                             |
| ----- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| 1–4   | anthropic-claude-opus-4-1             | Q03 partly, Q05 stated, Q12 not-found, Q15 partly                                                             |
| 5–12  | gdm-gemini-2-5-flash-lite             | Q03 stated, Q05 partly, Q06 partly, Q07 not-found, Q09 not-found, Q10 not-found, Q11 not-found, Q15 not-found |
| 13–15 | gdm-gemini-2-5-pro                    | Q03 stated, Q05 stated, Q15 stated                                                                            |
| 16–20 | meta-muse-glimmer                     | Q03 partly, Q05 stated, Q10 not-found, Q11 not-found, Q15 partly                                              |
| 21–23 | meta-muse-wonder-and-muse-wonder-full | Q03 partly, Q05 stated, Q15 stated                                                                            |
| 24–26 | openai-deep-research                  | Q03 stated, Q05 stated, Q15 partly                                                                            |
| 27–29 | openai-o3-mini                        | Q03 stated, Q05 stated, Q15 partly                                                                            |
| 30–33 | xai-grok-4-6                          | Q03 stated, Q05 partly, Q09 not-found, Q15 not-found                                                          |
| 34–37 | anthropic-claude-haiku-4-5            | Q03 stated, Q05 stated, Q10 not-found, Q15 partly                                                             |
| 38–40 | anthropic-claude-sonnet-4-5           | Q03 stated, Q05 stated, Q15 stated                                                                            |
| 41–43 | anthropic-claude-opus-4-6             | Q03 stated, Q05 stated, Q15 stated                                                                            |
| 44–48 | gdm-gemini-2-5-deep-think             | Q03 stated, Q05 stated, Q10 not-found, Q14 not-found, Q15 stated                                              |
| 49–53 | gdm-gemini-2-5-flash                  | Q03 stated, Q05 partly, Q10 not-found, Q11 not-found, Q15 not-found                                           |
| 54–58 | meta-muse-spark-open                  | Q03 partly, Q05 not-found, Q07 partly, Q08 partly, Q15 stated                                                 |
| 59–61 | openai-gpt-4-5                        | Q03 partly, Q05 stated, Q15 partly                                                                            |
| 62–64 | openai-o3-o4-mini                     | Q03 stated, Q05 stated, Q15 partly                                                                            |

### Comparison

| Sample | Agree | Minor | Material | Cannot check |
| ------ | ----: | ----: | -------: | -----------: |
| Part A |    51 |     7 |        6 |            0 |
| Part B |    15 |     9 |        0 |            0 |
| Total  |    66 |    16 |        6 |            0 |

A material difference changes a cell status. A minor difference concerns wording, a locator or a qualification and leaves the status intact. The tally covers the 88 cells on the 16 copies matching the preparer’s hashes. Historical versions that could not be read are tracked separately in Part D.

| Item | Card and question           | Pack → blind       | Finding                                                                                                                                                                 |
| ---: | --------------------------- | ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|    5 | Gemini 2.5 Flash-Lite · Q03 | stated → stated    | Extend the p. 7 quotation through the full framework name. The edition by link annotation holds.                                                                        |
|    6 | Gemini 2.5 Flash-Lite · Q05 | stated → partly    | The no-CCL evaluation result is for Pro Preview. The card gives a proxy-based expectation for Flash-Lite.                                                               |
|   14 | Gemini 2.5 Pro · Q05        | stated → stated    | Keep the Experimental scope of the direct all-domain assessment visible alongside the narrower Preview and GA evidence and the GA deceptive-alignment gap.              |
|   38 | Claude Sonnet 4.5 · Q03     | partly → stated    | The annotation over the RSP name in §9.1, PDF p. 125, links to the fixed PDF for v2.2, effective 14 May 2025. The p. 9 annotation points to an announcement.            |
|   42 | Claude Opus 4.6 · Q05       | stated → stated    | The blind release-standard quote is in §1.2.3 on p. 13. The pack’s capability determination quote is in §1.2.4.                                                         |
|   43 | Claude Opus 4.6 · Q15       | stated → stated    | The pack has the correct subsection for the release decision, §1.2.3 on p. 13. The blind answer’s subsection label is wrong.                                            |
|   48 | Gemini 2.5 Deep Think · Q15 | stated → stated    | Add the p. 20 account of the RSC reviewing this model’s safety case before launch. It supplies model-specific context for the general release-decision wording on p. 5. |
|   49 | Gemini 2.5 Flash · Q03      | stated → stated    | Extend the p. 8 quotation through the full framework name. The edition by link annotation holds.                                                                        |
|   50 | Gemini 2.5 Flash · Q05      | stated → partly    | The no-CCL evaluation result is for Pro Preview. Flash has a proxy-based expectation, with no separate determination for Image or Audio.                                |
|   55 | Muse Spark Open · Q05       | partly → not-found | The card reports general release criteria and evaluations in line with the framework. No separate framework determination was found.                                    |
|   58 | Muse Spark Open · Q15       | partly → stated    | Meta’s statement that the model met its release criteria is a release acceptability judgment in the developer’s own voice.                                              |

The other status difference, Grok 4.6 Q09 (item 32), is **pack partly, blind not-found**. The pack’s reading is better supported for the earlier-checkpoint evaluation identified in §5. Keep that checkpoint scope explicit. Flash-Lite Q06 (item 7) keeps **partly** and needs a quotation naming a safeguard alongside the list introduction.

## Part B · direct

Items 65–88 are recorded in the JSON with passage, locator, date, scope and standalone-reading checks. The nine minor findings are items 67, 68, 77, 80, 81, 82, 83, 87 and 88. They concern external testing wording and search scope, physical page numbering, evaluation wording and safeguards, and the earlier checkpoint used by METR. No cell status changes.

## Part C · population and order

The two packs contain the next sixteen cards in the adopted population, with eight in each pack. No substitution was found. PaliGemma and Grok-1 remain pack 3 holds. Microsoft has no eligible row left under P3. [Population and ordering rule](../model-cards-2/population.md#order-of-later-packs)

The rendered tables reverse three date pairs. In pack 4, Gemini 2.5 Pro precedes Flash-Lite by the recorded dates, and o3-mini precedes Deep Research. In pack 5, Sonnet 4.5 precedes Haiku 4.5. Pack membership is unaffected. [Pack 4 overview](pack.md#overview) · [Pack 5 overview](../model-cards-5/pack.md#overview)

The JSON records each inherited date and the date printed on the copy checked. The August 30 Flash capture is an availability bound, with an August 27 revision printed in that capture. The Muse Wonder and Muse Spark Open release dates concern the models. The Wonder capture establishes card availability by October 13 UTC. The Glimmer repository has an August 9 first-pass README commit, while its public availability on that date is unverified.

## Part D · historical copies

| Retrieval                                                                          | Outcome                                                                                                                                                                                                                                                                       |
| ---------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Gemini 2.5 Flash-Lite · July 2025                                                  | Replay returned HTTP 429. The November 4 audit recorded the July 22 publication line in the July 31 capture. Differences in sampled cells could not be checked.                                                                                                               |
| Gemini 2.5 Flash · August 2025                                                     | Replay returned HTTP 429. The November 4 audit recorded the August 27 revision in the August 30 capture. Differences in sampled cells could not be checked.                                                                                                                   |
| Deep Research · February 2025                                                      | Replay returned HTTP 429. The sampled PDF keeps the February 25 printed date and has a July benchmark note. Differences in sampled cells could not be checked.                                                                                                                |
| Claude Opus 4.1, Sonnet 4.5, Opus 4.6 and Grok 4.6 · before the recorded revisions | No earlier expression was read. The retrieved Opus 4.1 capture matches the revised live bytes. The Sonnet capture was indexed after both revisions and replay returned HTTP 429.                                                                                              |
| Muse Wonder · October 13 capture                                                   | The live PDF contains an October 23 evaluation correction. The sampled cells hold on both copies. The Q03 URL, Q05 determination and Q15 decision are unchanged.                                                                                                              |
| Muse Glimmer · early publisher README revisions                                    | The August 10 revision matches the sampled Trust and Safety text. The August 9 first pass calls the section **Catastrophic risk**. This changes the locators for Q03, Q05 and Q15 while preserving the deciding language.                                                     |
| Meta Superintelligence Scaling Framework                                           | The live PDF and October 13 capture match byte for byte. The preface prints version 2.1, October 2026. The changelog dates v2.1 October 2. This corroborates what the undated address in Muse Wonder Q03 served by October 13. The card’s Q03 remains partly under ruling 5a. |
| xAI FAIF · Grok 4.6 reference 29                                                   | The cited URL returned HTTP 404 and archive replays returned HTTP 429. The replacement publisher PDF prints an effective date of June 30, 2026 and gives no numbered version on its first page. The card’s dated citation supports Q03.                                       |

The JSON lists the attempts for all sixteen cards, with retrieval and capture times, response codes, hashes and date kinds. The two inherited Gemini capture records are identified as prior-audit evidence.
