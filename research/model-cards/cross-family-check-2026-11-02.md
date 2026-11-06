| Check                   | Result                                                        |
| ----------------------- | ------------------------------------------------------------- |
| Phase                   | Complete                                                      |
| Items recorded          | 130 / 130                                                     |
| Part A                  | 87 checked; 3 excluded; blind answers frozen in `fdfa5cc`     |
| Part B                  | 37 / 37 in-scope checks                                       |
| Exclusions              | 30, 45, 52, 99, 112, 126                                      |
| Original-card checksums | 20 / 20 authenticated; CWM original recovered after blindness |

# Model cards compared: cross-family check

OpenAI Codex, GPT-6 family; exact served variant/version is not exposed. Checked 2026-11-03. This is a machine check of the developers’ accounts, not independent confirmation, proof of safeguard effectiveness or human review. Source passages, locators, negative searches, per-item answers and retrieval history are in [the JSON report](cross-family-check-2026-11-02.json).

Items **30, 45, 52, 99, 112 and 126** are **excluded from this pass by the maintainer**. Their Q07 passages were not used or checked. Other questions, including framework categories, safeguards and release statements, remain in scope. No excluded verdict is compared.

## Blind order

Every Part A answer and exclusion was committed and pushed in `fdfa5cc` before opening the verdicts file or `audit.md`. The frozen answer hash and its definition are in the JSON; the answers remain unchanged. Ten initial status differences were rechecked: items 7, 10, 15, 72, 76, 80 and 89 were reconciled with the pack, with the checker’s missed passages or criterion interpretation recorded separately. Three disagreements remain.

## Comparison

| Item               | Finding for disposition                                                                                                                                                                                                     |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 31 · Llama 3.3 Q09 | The card reports autonomous cyber-agent evaluation for the Llama 3 family, without an outcome. The written Q09 criterion supports **partly**, rather than **not-found**. Preserve family scope.                             |
| 36 · CWM Q06       | The original PDF’s §4.1.1 describes an honesty mitigation. Q06 supports **partly** for safeguards not tied to a framework determination. The pack records **not-found**.                                                    |
| 69 · GPT-4V Q15    | Broad availability and deployment preparation do not describe a release decision or the specified weaker cases. Retain **not-found**, rather than **partly**, under the written criterion. This boundary needs disposition. |
| 96                 | Second quotation is not verbatim: an ellipsis replaces a page break inside ASL-3 and drops its hyphen. Repair the transcription; conclusion and locator remain supported.                                                   |
| 101                | The absence note needs “dangerous-capability” scope; the card does report product-capability agentic evaluations.                                                                                                           |
| 102                | The passages tie generic safeguards to thresholds but name no safeguard type or standard. **Stated** exceeds Q06’s naming criterion; use **partly** or add a qualifying card passage.                                       |
| 119                | The bibliographic quotation omits the URL prefix without an omission marker. The framework reference and link are supported; repair the quotation.                                                                          |
| 130                | The quotation supports evaluation limits, but the note also lists ongoing monitoring as a limit. Monitoring is an operational practice; remove that clause from this answer.                                                |

The same-family audit used cached text and checked no archives. Its all-verbatim result does not certify this different sample: item 96 is a transcription issue, as is item 119. Its stated Grok 4.7 Q16 cleanup also needs checking against the supplied brief’s remaining monitoring clause. The audit’s Luna Q12 distinction is supported: a training agent is not by itself a described red-teaming test of this model. No loaded editorial wording, inferred motives or ranking of developers was identified in the checked notes.

## Selection and inventory

- Google’s official index links labelled model cards for Gemini 1.0, Gemini 1.5 and Gemini Robotics 1.5; the inventory says no cards were located. Gemini 1.5’s labelled appendix exists in a directly retrieved December 2024 capture. The December 2023 Gemini 1.0 capture has no such appendix: do not backdate the current card. Re-run the 2024 selection with the appendix-card rule explicit.
- Microsoft’s Fara-7B card has its own evaluations and a November 24, 2025 release date, corroborated by its official announcement. The written scope has no Phi/MAI-only exclusion. Re-run 2025 selection or authorise that narrower scope. Fara1.5 repositories are additional discovery leads; their creation dates are not release dates.
- Muse Spark 1.3’s September 2 announcement links the report now dated October 23. Resolve initial publication versus revision before choosing the 2026 row. The pinned Spark Open card returned 401 here. Argon’s same-month model-card/safety-report tie also lacks an explicit tie-breaker.
- Previously unretrieved Muse Spark and o3 Operator reports are now retrieved; the latter prints May 23, 2025.

## Retrieval and archives

Fresh direct HTTP was sequential, at least eight seconds apart per host. All 20 original card checksums ultimately match the preparer’s. CWM’s supplied URL returned 403; the blind pass used a disclosed arXiv expression with different bytes. After blindness, Meta’s fresh public download link yielded the original checksum. Both expressions and their use are recorded.

Internet Archive CDX searches covered each supplied URL within 31 days of its target date. Eight returned nearby captures:

| Card                           | Capture                                                                                                                                          |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| anthropic-claude-haiku-5-5     | [2026-10-26](https://web.archive.org/web/20261026042824/https://assets.claude.com/e1080d6bf5ae2018ea3c2f414064be03232f5be5.pdf)                  |
| google-deepmind-gemini-3-flash | [2025-12-17](https://web.archive.org/web/20251217173212/https://storage.googleapis.com/deepmind-media/Model-Cards/Gemini-3-Flash-Model-Card.pdf) |
| google-deepmind-gemini-4-argon | [2026-10-13](https://web.archive.org/web/20261013160206/https://storage.googleapis.com/deepmind-media/Model-Cards/Gemini-4-Argon-Model-Card.pdf) |
| openai-gpt-4v                  | [2023-09-25](https://web.archive.org/web/20230925123519/https://cdn.openai.com/papers/GPTV_System_Card.pdf)                                      |
| openai-o1                      | [2024-12-05](https://web.archive.org/web/20241205184050/https://cdn.openai.com/o1-system-card-20241205.pdf)                                      |
| openai-gpt-5-2-codex           | [2025-12-19](https://web.archive.org/web/20251219135142/https://cdn.openai.com/pdf/ac7c37ae-7f4c-4442-b741-2eabdeaf77e0/oai_5_2_Codex.pdf)       |
| xai-grok-4-1                   | [2025-11-17](https://web.archive.org/web/20251117213011/https://data.x.ai/2025-11-17-grok-4-1-model-card.pdf)                                    |
| xai-grok-4-7                   | [2026-09-22](https://web.archive.org/web/20260922080030/https://media.x.ai/v1/website/card4p7-3a96f40b.pdf)                                      |

For the other twelve exact URLs, no capture was returned in that bounded window; this does not establish archive absence. Capture discovery does not authenticate archived bytes. The two historical Google copies were additionally retrieved to inspect appendix presence. xAI’s card index returned 403, so completeness is not certified.

## Checks and next step

All recorded quotes are at most 50 words; source matching uses PDF whitespace/ligature normalization. The three focused editorial suites passed **21 tests**; two initial sandbox temporary-file failures passed on rerun outside the sandbox. Formatting, diff scope and privacy are checked at each checkpoint. Full-index privacy scans passed at 20, 40 and 60 items; subsequent scans cover the two changed report blobs and verify no other tracked changes.

Maintainer disposition is needed for the item findings and selection/date rules above. No pack, data or code change; no admission and no PR.
