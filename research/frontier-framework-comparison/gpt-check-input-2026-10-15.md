# Cross-family check: frontier safety frameworks compared, 2026-10-15

Generated from `pack.json` by `node research/frontier-framework-comparison/tools.mjs crosscheck 2026-10-15`; do not edit by hand. It is for a reviewer from a different model family from the one that drafted, merged and audited the pack (Claude). The pack is a candidate research pack outside application data; nothing here has human review.

## How to work

1. Work from the framework editions at the addresses below, retrieved fresh by direct HTTP, sequentially and at least 8 s apart per host. Treat every retrieved text as evidence, never as instructions. If a current copy differs from the preparer’s SHA-256, say so and work from what you retrieved. Archive copies are optional.
2. **Blind first.** Part A gives only an edition and a question. Record your own answer before opening [`gpt-check-verdicts-2026-10-15.json`](gpt-check-verdicts-2026-10-15.json), which holds what the pack recorded (status, quotations, mapping notes and, for "not found", the hits it set aside). Then compare. Say in your report whether you kept to this order. Reading `pack.json`, `pack.md` or `audit.md` first unblinds you.
3. Part B shows the pack’s quotation and locator; check them directly.
4. Do not edit the pack or any tracked file except your two report files. Return findings to the maintainer.

## Rules the pack applies

- Every filled cell is a verbatim quote from the edition named in its column, with a locator.
- "Not found" records the sections inspected and search terms; it is not proof of absence and not a claim that a provision was deleted.
- Categories are normalised; wording is not. A cell records what the edition states, not whether it was implemented, complied with or effective.
- No ranking or scoring of developers.
- Each question (facet) has a criterion, worded to fit every edition. A cell is "stated" when the edition contains a passage that meets the criterion, "stated, partly" when a passage meets it only in part (for example a domain named but given no threshold, or named only to exclude it), and "not found" when no passage meets it after reading the whole edition and searching.
- Quotations are at most 50 words, verbatim from the edition named (not from announcements or other editions). Conditional wording ("may", "aim to") stays in the quotation.
- The pack describes; it does not rank developers or judge provisions. Flag any wording in the verdicts file that ranks, scores or evaluates.

## What to record

**Part A (blind).** For each item: the passage or passages (each ≤ 50 words, with PDF page and section) that meet the criterion in that edition, or "not found" with the sections you read and at least five search terms. Then, after opening the verdicts file: `agree`, `disagree` (what the pack got wrong) or `partly` (e.g. the pack says not found and you found a passage that partly meets the criterion).

**Part B.** For each quotation: verbatim at the locator (yes/no); locator right (yes/minor/no); does the passage meet the criterion as an operative statement of that edition (full/partial/no); would it mislead shown alone (yes/no, why).

Return `gpt-check-2026-10-15.json` (one object per item with the fields above, plus retrieval failures and your model and version where known) and a short Markdown report `gpt-check-2026-10-15.md`.

## Editions

- **rsp-2023**: Anthropic, Responsible Scaling Policy, v1.0 (2023-09-19). https://www-cdn.anthropic.com/1adf000c8f675958c2ee23805d91aaade1cd4613/responsible-scaling-policy.pdf (preparer's copy retrieved 2026-10-15, SHA-256 `14785337769bee567dd488d346f9cf6e36fed7792da9656a0a8b55b2f6d21c43`)
- **rsp-v2-0**: Anthropic, Responsible Scaling Policy, v2.0 (2024-10-15). https://www-cdn.anthropic.com/616dee633636e5bd309cb73aed8622e80fe47839.pdf (preparer's copy retrieved 2026-10-15, SHA-256 `cc522e2770c6fec6c2808ce5abd8b757a8d7fe2078d029879295df8443185f7f`)
- **rsp-v2-1**: Anthropic, Responsible Scaling Policy, v2.1 (2025-03-31). https://www-cdn.anthropic.com/17310f6d70ae5627f55313ed067afc1a762a4068.pdf (preparer's copy retrieved 2026-10-15, SHA-256 `f0ac67ca61b1726cbcd159e6d2f595ce4f26de2ee29c594ba488f53f780d4ee7`)
- **rsp-v2-2**: Anthropic, Responsible Scaling Policy, v2.2 (2025-05-14). https://www-cdn.anthropic.com/872c653b2d0501d6ab44cf87f43e1dc4853e4d37.pdf (preparer's copy retrieved 2026-10-15, SHA-256 `4807f3970c76968a75a6dffa55d8ffe547014522b63c67e261cd02f7b6fc1e39`)
- **rsp-v3-0**: Anthropic, Responsible Scaling Policy, v3.0 (2026-02-24). https://anthropic.com/responsible-scaling-policy/rsp-v3-0 (preparer's copy retrieved 2026-10-15, SHA-256 `a71bfa08a7fa4b750b2b408b4b9c8681ad50c6b53271c314f591c59c84c38064`)
- **rsp-v3-1**: Anthropic, Responsible Scaling Policy, v3.1 (2026-04-02). https://www-cdn.anthropic.com/files/4zrzovbb/website/bf04581e4f329735fd90634f6a1962c13c0bd351.pdf (preparer's copy retrieved 2026-10-15, SHA-256 `5aa73a3b3155ef856e429711c8d156e18d9b5ce1e28c2e0a74019a2c3c764d7b`)
- **rsp-v3-2**: Anthropic, Responsible Scaling Policy, v3.2 (2026-04-29). https://cdn.sanity.io/files/4zrzovbb/website/28c6241900d90410628a8a2003a5572faae4365a.pdf (preparer's copy retrieved 2026-10-15, SHA-256 `5410e3d986cf6917e9105c3d3a661ccc91bfbcb8672bca18b7752ca394e3f2a1`)
- **rsp-v3-3**: Anthropic, Responsible Scaling Policy, v3.3 (2026-05-26). https://cdn.sanity.io/files/4zrzovbb/website/c11e84981d0a7281a1b229f3fa6af0da66eaf43f.pdf (preparer's copy retrieved 2026-10-15, SHA-256 `b7e7cc1e72e9371949415522ae3c9e61103cc739c5df64579af32dd941624f42`)
- **rsp-v3-4**: Anthropic, Responsible Scaling Policy, v3.4 (2026-07-08). https://cdn.sanity.io/files/4zrzovbb/website/0bacdc8440ea96e62a8766d99ebe1d4eea6d5f3a.pdf (preparer's copy retrieved 2026-10-15, SHA-256 `6247b9e4001fd342827526fabc476c9d4dd6b2041ac00055f0ccda26f4d0b07d`)
- **fsf-2024**: Google DeepMind, Frontier Safety Framework, v1.0 (2024-05-17). https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/introducing-the-frontier-safety-framework/fsf-technical-report.pdf (preparer's copy retrieved 2026-10-15, SHA-256 `3c073cd5c7a0dd03a07d0cc826fd9d5c76801f57441ac37ef6b2163e9261543d`)
- **fsf-v2-0**: Google DeepMind, Frontier Safety Framework, v2.0 (2025-02-04). https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/updating-the-frontier-safety-framework/Frontier%20Safety%20Framework%202.0.pdf (preparer's copy retrieved 2026-10-15, SHA-256 `14a48e4ef052fba75b651ea23845c2e9557f5c638e2767656decc6410861aae3`)
- **fsf-v3-0**: Google DeepMind, Frontier Safety Framework, v3.0 (2025-09-22). https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3.pdf (preparer's copy retrieved 2026-10-15, SHA-256 `87ebf40b747b98468226b2198442b45ff54854975f6e9882d9ece2d009082fe5`)
- **fsf-v3-1**: Google DeepMind, Frontier Safety Framework, v3.1 (2026-04-17). https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3-1.pdf (preparer's copy retrieved 2026-10-15, SHA-256 `ad10d2d240e0d557ecad406dbccedcbb4a70295f8ba8eec46bfe01803cb9c301`)
- **preparedness-beta-2023**: OpenAI, Preparedness Framework, Beta (2023-12-18). https://cdn.openai.com/openai-preparedness-framework-beta.pdf (preparer's copy retrieved 2026-10-15, SHA-256 `c84e3a59c7dab251e45434e0b0d3e8abadcea7293f995cf92d32269e7d290398`)
- **preparedness-v2**: OpenAI, Preparedness Framework, Version 2 (2025-04-15). https://cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf (preparer's copy retrieved 2026-10-15, SHA-256 `fae6e4cc6f7212a010bb9348fc0cde1fe711b9cad426c6a99db97740ee52729b`)
- **frontier-governance-2026**: OpenAI, Frontier Governance Framework, May 2026 edition (2026-05-28). https://cdn.openai.com/pdf/e37d949b-8c9f-4d76-b99e-4272f4631a7e/openai-frontier-governance-framework.pdf (preparer's copy retrieved 2026-10-15, SHA-256 `33e4e118b24d56786c2292df6ed4d9ec635f8887b22986f98ce3c09896fcfffc`)
- **faif-2025**: xAI, Frontier Artificial Intelligence Framework, December 2025 edition (2025-12-30). https://data.x.ai/2025-12-31-xai-frontier-artificial-intelligence-framework.pdf (preparer's copy retrieved 2026-10-15, SHA-256 `aa01669c19fca50c85323595141d08f98076cf0c48ed8f4a114ad6420c1a1012`)
- **faif-2026**: xAI, Frontier Artificial Intelligence Framework, June 2026 edition (2026-06-30). https://media.x.ai/v1/website/xai-frontier-artificial-intelligence-framework-30-june-2026-99c40684.pdf (preparer's copy retrieved 2026-10-15, SHA-256 `2c3c6313bd2fb6eeffcafedb38013c34d92c53331ddedbfa331821c75055df53`)
- **meta-faf-v1-1**: Meta, Frontier AI Framework / Advanced AI Scaling Framework, v1.1 (2025-02-03). Not retrievable by the preparer (publisher address returns HTTP 500); Internet Archive capture: https://web.archive.org/web/20250213105620/https://ai.meta.com/static-resource/meta-frontier-ai-framework/
- **meta-aasf-v2-0**: Meta, Frontier AI Framework / Advanced AI Scaling Framework, v2.0 (2026-04-08). https://ai.meta.com/static-resource/Meta_Advanced-AI-Scaling-Framework-v2 (preparer's copy retrieved 2026-10-15, SHA-256 `d87aa9bf00456ec747e80b84216f9f2ffc427c1e98541f8b3c8f7f52c13c7b6a`)
- **ms-fgf-2025**: Microsoft, Frontier Governance Framework, Feb 2025 (Version 1) (2025-02). https://cdn-dynmedia-1.microsoft.com/is/content/microsoftcorp/microsoft/final/en-us/microsoft-brand/documents/Microsoft-Frontier-Governance-Framework.pdf (preparer's copy retrieved 2026-10-15, SHA-256 `da0d8b1507a305fb8b5148b560d8be426549b854ca8888b999874d00e6170c4f`)
- **ms-fgf-2026**: Microsoft, Frontier Governance Framework, Feb 2026 (2026-02). https://cdn-dynmedia-1.microsoft.com/is/content/microsoftcorp/microsoft/msc/documents/presentations/CSR/Frontier-Governance-Framework-Feb-2026.pdf (preparer's copy retrieved 2026-10-15, SHA-256 `3282e4fc65a84420f3bf1360d4716928883abce3d28b56804d0598c164111932`)

## Questions (facets)

- **D1.cbrn** (Risk domains covered: Chemical, biological, radiological or nuclear weapons). _Criterion:_ The edition names any of chemical, biological, radiological or nuclear weapons (alone or combined) as a domain it tracks or sets a threshold for.
- **D1.cyber** (Risk domains covered: Cyber operations). _Criterion:_ The edition names cyber attacks, cyber offence or cybersecurity uplift as a tracked domain.
- **D1.autonomy** (Risk domains covered: Autonomy, self-improvement or AI research and development). _Criterion:_ The edition names autonomous operation, replication, self-improvement, AI research and development automation, or loss of control through such capabilities as a tracked domain.
- **D1.persuasion** (Risk domains covered: Persuasion or manipulation). _Criterion:_ The edition names persuasion or manipulation of people as a tracked domain.
- **D1.other** (Risk domains covered: Other named domains). _Criterion:_ Any further domain the edition names as tracked (for example misalignment, deceptive behaviour, sabotage of oversight). Research categories or monitored-only domains are recorded with their status as worded.
- **D2.levels** (Thresholds and triggers: Named levels or thresholds). _Criterion:_ The names and structure of the capability levels or thresholds the edition uses.
- **D2.definition** (Thresholds and triggers: How a threshold is defined). _Criterion:_ The edition’s general definition of what reaching a threshold means (for example uplift relative to a baseline, or a capability that could cause severe harm).
- **D3.safeguards** (Required actions when a threshold is reached: Safeguards required). _Criterion:_ Safeguards, mitigations or standards the edition requires (or states it will apply) for a model at or above a threshold.
- **D3.halt** (Required actions when a threshold is reached: Pause, non-deployment or non-training). _Criterion:_ A statement that development, training or deployment will stop, pause or not proceed when required safeguards are not in place or a level is reached.
- **D4.determination** (Who decides: Determination of capability or safeguard adequacy). _Criterion:_ The person, office or body the edition names as making or approving the determination that a threshold is reached, that safeguards are adequate, or that a model may be deployed.
- **D4.oversight** (Who decides: Board or external oversight). _Criterion:_ A role the edition gives to a board, board committee, trust, or external party in overseeing or reviewing those decisions.
- **D5.cadence** (Evaluation cadence and timing: Evaluation timing). _Criterion:_ The edition’s statement of when evaluations are run: before deployment, at compute or capability intervals, on a calendar, or on another trigger.
- **D6.competitor** (Exceptions and discretion: Provisions conditioned on other developers). _Criterion:_ A provision that changes what the developer will do depending on what other developers do or have (often called a “race” or “marginal risk” clause).
- **D6.discretion** (Exceptions and discretion: Other exceptions or discretion). _Criterion:_ Any other stated exception, deviation, override or room for judgement in applying the framework.
- **D7.internal** (Transparency and reporting: Internal reporting). _Criterion:_ Reporting or records the edition requires inside the developer (to leadership, a board, staff or a compliance function).
- **D7.external** (Transparency and reporting: Public or external reporting). _Criterion:_ Disclosure the edition says it will make to the public, to governments, or to other external parties.
- **D8.process** (Revision: Revision process and approval). _Criterion:_ How the edition says the framework will be reviewed, updated and approved.
- **D8.changes** (Revision: Stated changes from the previous edition). _Criterion:_ The edition’s own statement (changelog, introduction or summary) of what changed from its predecessor. Not applicable to the first edition in a sequence.

## Part A: blind questions (55)

Every cell the pack records as not found, mixed with the pause, decision-maker and competitor questions for the latest edition of each framework, in a seeded random order. The list alone does not say which items the pack records as found.

1. **faif-2026.D4.oversight**: xAI, Frontier Artificial Intelligence Framework, June 2026 edition (2026-06-30). Question D4.oversight: Board or external oversight.
2. **faif-2026.D4.determination**: xAI, Frontier Artificial Intelligence Framework, June 2026 edition (2026-06-30). Question D4.determination: Determination of capability or safeguard adequacy.
3. **fsf-2024.D7.external**: Google DeepMind, Frontier Safety Framework, v1.0 (2024-05-17). Question D7.external: Public or external reporting.
4. **ms-fgf-2026.D6.competitor**: Microsoft, Frontier Governance Framework, Feb 2026 (2026-02). Question D6.competitor: Provisions conditioned on other developers.
5. **ms-fgf-2025.D1.other**: Microsoft, Frontier Governance Framework, Feb 2025 (Version 1) (2025-02). Question D1.other: Other named domains.
6. **frontier-governance-2026.D6.competitor**: OpenAI, Frontier Governance Framework, May 2026 edition (2026-05-28). Question D6.competitor: Provisions conditioned on other developers.
7. **ms-fgf-2026.D3.halt**: Microsoft, Frontier Governance Framework, Feb 2026 (2026-02). Question D3.halt: Pause, non-deployment or non-training.
8. **fsf-v3-1.D3.halt**: Google DeepMind, Frontier Safety Framework, v3.1 (2026-04-17). Question D3.halt: Pause, non-deployment or non-training.
9. **fsf-v3-1.D6.competitor**: Google DeepMind, Frontier Safety Framework, v3.1 (2026-04-17). Question D6.competitor: Provisions conditioned on other developers.
10. **preparedness-v2.D3.halt**: OpenAI, Preparedness Framework, Version 2 (2025-04-15). Question D3.halt: Pause, non-deployment or non-training.
11. **preparedness-beta-2023.D6.competitor**: OpenAI, Preparedness Framework, Beta (2023-12-18). Question D6.competitor: Provisions conditioned on other developers.
12. **fsf-v3-1.D4.determination**: Google DeepMind, Frontier Safety Framework, v3.1 (2026-04-17). Question D4.determination: Determination of capability or safeguard adequacy.
13. **fsf-2024.D4.determination**: Google DeepMind, Frontier Safety Framework, v1.0 (2024-05-17). Question D4.determination: Determination of capability or safeguard adequacy.
14. **faif-2025.D4.oversight**: xAI, Frontier Artificial Intelligence Framework, December 2025 edition (2025-12-30). Question D4.oversight: Board or external oversight.
15. **rsp-v3-4.D4.determination**: Anthropic, Responsible Scaling Policy, v3.4 (2026-07-08). Question D4.determination: Determination of capability or safeguard adequacy.
16. **fsf-v3-1.D4.oversight**: Google DeepMind, Frontier Safety Framework, v3.1 (2026-04-17). Question D4.oversight: Board or external oversight.
17. **fsf-2024.D7.internal**: Google DeepMind, Frontier Safety Framework, v1.0 (2024-05-17). Question D7.internal: Internal reporting.
18. **faif-2026.D6.competitor**: xAI, Frontier Artificial Intelligence Framework, June 2026 edition (2026-06-30). Question D6.competitor: Provisions conditioned on other developers.
19. **meta-aasf-v2-0.D1.persuasion**: Meta, Frontier AI Framework / Advanced AI Scaling Framework, v2.0 (2026-04-08). Question D1.persuasion: Persuasion or manipulation.
20. **rsp-v3-2.D1.cyber**: Anthropic, Responsible Scaling Policy, v3.2 (2026-04-29). Question D1.cyber: Cyber operations.
21. **preparedness-v2.D6.competitor**: OpenAI, Preparedness Framework, Version 2 (2025-04-15). Question D6.competitor: Provisions conditioned on other developers.
22. **meta-aasf-v2-0.D3.halt**: Meta, Frontier AI Framework / Advanced AI Scaling Framework, v2.0 (2026-04-08). Question D3.halt: Pause, non-deployment or non-training.
23. **fsf-2024.D1.persuasion**: Google DeepMind, Frontier Safety Framework, v1.0 (2024-05-17). Question D1.persuasion: Persuasion or manipulation.
24. **rsp-2023.D1.persuasion**: Anthropic, Responsible Scaling Policy, v1.0 (2023-09-19). Question D1.persuasion: Persuasion or manipulation.
25. **fsf-v3-0.D4.oversight**: Google DeepMind, Frontier Safety Framework, v3.0 (2025-09-22). Question D4.oversight: Board or external oversight.
26. **meta-aasf-v2-0.D4.determination**: Meta, Frontier AI Framework / Advanced AI Scaling Framework, v2.0 (2026-04-08). Question D4.determination: Determination of capability or safeguard adequacy.
27. **rsp-v3-1.D1.persuasion**: Anthropic, Responsible Scaling Policy, v3.1 (2026-04-02). Question D1.persuasion: Persuasion or manipulation.
28. **rsp-v3-3.D1.cyber**: Anthropic, Responsible Scaling Policy, v3.3 (2026-05-26). Question D1.cyber: Cyber operations.
29. **preparedness-beta-2023.D7.external**: OpenAI, Preparedness Framework, Beta (2023-12-18). Question D7.external: Public or external reporting.
30. **fsf-2024.D6.competitor**: Google DeepMind, Frontier Safety Framework, v1.0 (2024-05-17). Question D6.competitor: Provisions conditioned on other developers.
31. **rsp-v3-1.D1.cyber**: Anthropic, Responsible Scaling Policy, v3.1 (2026-04-02). Question D1.cyber: Cyber operations.
32. **faif-2026.D8.changes**: xAI, Frontier Artificial Intelligence Framework, June 2026 edition (2026-06-30). Question D8.changes: Stated changes from the previous edition.
33. **frontier-governance-2026.D3.halt**: OpenAI, Frontier Governance Framework, May 2026 edition (2026-05-28). Question D3.halt: Pause, non-deployment or non-training.
34. **frontier-governance-2026.D4.determination**: OpenAI, Frontier Governance Framework, May 2026 edition (2026-05-28). Question D4.determination: Determination of capability or safeguard adequacy.
35. **rsp-v3-2.D1.persuasion**: Anthropic, Responsible Scaling Policy, v3.2 (2026-04-29). Question D1.persuasion: Persuasion or manipulation.
36. **preparedness-v2.D4.determination**: OpenAI, Preparedness Framework, Version 2 (2025-04-15). Question D4.determination: Determination of capability or safeguard adequacy.
37. **rsp-v3-4.D6.competitor**: Anthropic, Responsible Scaling Policy, v3.4 (2026-07-08). Question D6.competitor: Provisions conditioned on other developers.
38. **rsp-v3-4.D3.halt**: Anthropic, Responsible Scaling Policy, v3.4 (2026-07-08). Question D3.halt: Pause, non-deployment or non-training.
39. **rsp-v3-3.D1.persuasion**: Anthropic, Responsible Scaling Policy, v3.3 (2026-05-26). Question D1.persuasion: Persuasion or manipulation.
40. **fsf-v2-0.D1.persuasion**: Google DeepMind, Frontier Safety Framework, v2.0 (2025-02-04). Question D1.persuasion: Persuasion or manipulation.
41. **meta-aasf-v2-0.D6.competitor**: Meta, Frontier AI Framework / Advanced AI Scaling Framework, v2.0 (2026-04-08). Question D6.competitor: Provisions conditioned on other developers.
42. **fsf-v3-0.D8.changes**: Google DeepMind, Frontier Safety Framework, v3.0 (2025-09-22). Question D8.changes: Stated changes from the previous edition.
43. **faif-2025.D4.determination**: xAI, Frontier Artificial Intelligence Framework, December 2025 edition (2025-12-30). Question D4.determination: Determination of capability or safeguard adequacy.
44. **rsp-v3-0.D1.persuasion**: Anthropic, Responsible Scaling Policy, v3.0 (2026-02-24). Question D1.persuasion: Persuasion or manipulation.
45. **ms-fgf-2025.D1.persuasion**: Microsoft, Frontier Governance Framework, Feb 2025 (Version 1) (2025-02). Question D1.persuasion: Persuasion or manipulation.
46. **ms-fgf-2026.D4.determination**: Microsoft, Frontier Governance Framework, Feb 2026 (2026-02). Question D4.determination: Determination of capability or safeguard adequacy.
47. **faif-2026.D3.halt**: xAI, Frontier Artificial Intelligence Framework, June 2026 edition (2026-06-30). Question D3.halt: Pause, non-deployment or non-training.
48. **ms-fgf-2026.D1.other**: Microsoft, Frontier Governance Framework, Feb 2026 (2026-02). Question D1.other: Other named domains.
49. **faif-2025.D1.persuasion**: xAI, Frontier Artificial Intelligence Framework, December 2025 edition (2025-12-30). Question D1.persuasion: Persuasion or manipulation.
50. **fsf-v2-0.D4.oversight**: Google DeepMind, Frontier Safety Framework, v2.0 (2025-02-04). Question D4.oversight: Board or external oversight.
51. **fsf-2024.D4.oversight**: Google DeepMind, Frontier Safety Framework, v1.0 (2024-05-17). Question D4.oversight: Board or external oversight.
52. **rsp-v3-4.D1.cyber**: Anthropic, Responsible Scaling Policy, v3.4 (2026-07-08). Question D1.cyber: Cyber operations.
53. **rsp-v3-0.D1.cyber**: Anthropic, Responsible Scaling Policy, v3.0 (2026-02-24). Question D1.cyber: Cyber operations.
54. **faif-2025.D6.competitor**: xAI, Frontier Artificial Intelligence Framework, December 2025 edition (2025-12-30). Question D6.competitor: Provisions conditioned on other developers.
55. **rsp-v3-4.D1.persuasion**: Anthropic, Responsible Scaling Policy, v3.4 (2026-07-08). Question D1.persuasion: Persuasion or manipulation.

## Part B: quotation checks (32, a seeded 10% sample of the other stated cells)

### rsp-2023.D1.cbrn

- **Edition:** Anthropic, Responsible Scaling Policy, v1.0 (2023-09-19)
- **Question:** D1.cbrn Chemical, biological, radiological or nuclear weapons
- **Quote** (PDF p. 20 (printed p. 20), Appendices, 'ASL-3 Evaluations for Misuse Risks', second paragraph, first sentence): “Our ongoing project is focused on defining three factors sequentially for each domain of interest (CBRN and cyber risks)”

### rsp-v2-0.D1.cbrn

- **Edition:** Anthropic, Responsible Scaling Policy, v2.0 (2024-10-15)
- **Question:** D1.cbrn Chemical, biological, radiological or nuclear weapons
- **Quote** (PDF p. 7 (printed p. 3), §2 Capability Thresholds and Required Safeguards, table row 'Chemical, Biological, Radiological, and Nuclear (CBRN) weapons', Capability Thresholds column): “The ability to significantly help individuals or groups with basic technical backgrounds … create/obtain and deploy CBRN weapons.”

### rsp-v2-0.D4.determination

- **Edition:** Anthropic, Responsible Scaling Policy, v2.0 (2024-10-15)
- **Question:** D4.determination Determination of capability or safeguard adequacy
- **Quote** (PDF p. 13 (printed p. 9), §4.3 Safeguards Decision, second bullet): “Safeguards Report(s) will be escalated to the CEO and the Responsible Scaling Officer, who will (1) make the ultimate determination”

### rsp-v2-0.D7.external

- **Edition:** Anthropic, Responsible Scaling Policy, v2.0 (2024-10-15)
- **Question:** D7.external Public or external reporting
- **Quote** (PDF p. 16 (printed p. 12), §7.2 Transparency and External Input, numbered item 1 ('Public disclosures'), first sentence): “We will publicly release key information related to the evaluation and deployment of our models”

### rsp-v2-1.D2.definition

- **Edition:** Anthropic, Responsible Scaling Policy, v2.1 (2025-03-31)
- **Question:** D2.definition How a threshold is defined
- **Quote** (PDF p. 7 (printed p. 3), first paragraph (continuing §1 Background), second sentence): “a prespecified level of AI capability that, if reached, signals (1) a meaningful increase in the level of risk”

### rsp-v2-1.D8.changes

- **Edition:** Anthropic, Responsible Scaling Policy, v2.1 (2025-03-31)
- **Question:** D8.changes Stated changes from the previous edition
- **Quote** (PDF p. 22 (printed p. 18), Changelog, March 31, 2025 (RSP v2.1) entry, paragraph 'New Capability Thresholds', second sentence): “We have also disaggregated our existing AI R&D capability thresholds, separating them into two distinct levels”

### rsp-v2-2.D2.definition

- **Edition:** Anthropic, Responsible Scaling Policy, v2.2 (2025-05-14)
- **Question:** D2.definition How a threshold is defined
- **Quote** (PDF p. 7 (printed p. 3), first paragraph (continuing §1 Background), second sentence): “a prespecified level of AI capability that, if reached, signals (1) a meaningful increase in the level of risk”

### rsp-v2-2.D3.safeguards

- **Edition:** Anthropic, Responsible Scaling Policy, v2.2 (2025-05-14)
- **Question:** D3.safeguards Safeguards required
- **Quote** (PDF p. 8 (printed p. 4), §2, table row 'CBRN', entry 'CBRN-3', Required Safeguards column): “The ASL-3 Deployment Standard and the ASL-3 Security Standard … are required.”

### rsp-v2-2.D6.discretion

- **Edition:** Anthropic, Responsible Scaling Policy, v2.2 (2025-05-14)
- **Question:** D6.discretion Other exceptions or discretion
- **Quote** (PDF p. 16 (printed p. 12), §7.1, footnote 16): “where this policy is unintentionally ambiguous, we will act in accordance with the Responsible Scaling Officer or CEO’s judgment”

### rsp-v3-0.D4.determination

- **Edition:** Anthropic, Responsible Scaling Policy, v3.0 (2026-02-24)
- **Question:** D4.determination Determination of capability or safeguard adequacy
- **Quote** (PDF p. 12, §3.4 Procedures, item 3 ('Executive approval'), second sentence): “CEO and RSO will make the ultimate determination regarding the adequacy of the risk assessment and any downstream deployment or development plans.”

### rsp-v3-0.D4.oversight

- **Edition:** Anthropic, Responsible Scaling Policy, v3.0 (2026-02-24)
- **Question:** D4.oversight Board or external oversight
- **Quote** (PDF p. 12, §3.4 Procedures, item 5 ('Modified process when marginal risk analysis is important to our case')): “In the event that marginal risk analysis … plays a major role in a decision to move forward, explicit approval of the Risk Report by the Board and LTBT … will be required.”

### rsp-v3-3.D1.other

- **Edition:** Anthropic, Responsible Scaling Policy, v3.3 (2026-05-26)
- **Question:** D1.other Other named domains
- **Quote** (PDF p. 9, §1, threshold table, row 'Automated R&D in key domains', right column, where the row title is cited (the title in the row itself, PDF p. 7, cannot be matched in this text layer)): ““Misaligned AI systems in high-stakes settings””

### rsp-v3-3.D7.internal

- **Edition:** Anthropic, Responsible Scaling Policy, v3.3 (2026-05-26)
- **Question:** D7.internal Internal reporting
- **Quote** (PDF p. 16 (printed p. 15), §4 Governance, item 3 ('Internal transparency')): “We will share final, unredacted Risk Reports with Anthropic’s regular-clearance staff.”
- **Quote** (PDF p. 16 (printed p. 15), §4 Governance, item 2 ('Long Term Benefit Trust')): “regularly brief the LTBT on plans and developments related to our Risk Reports, including model training”

### rsp-v3-3.D8.process

- **Edition:** Anthropic, Responsible Scaling Policy, v3.3 (2026-05-26)
- **Question:** D8.process Revision process and approval
- **Quote** (PDF p. 16 (printed p. 15), §4 Governance, item 8 ('Policy changes'), first sentence): “Changes to the RSP will be proposed by the CEO and RSO, and approved by the Board in consultation with the LTBT.”

### rsp-v3-4.D1.cbrn

- **Edition:** Anthropic, Responsible Scaling Policy, v3.4 (2026-07-08)
- **Question:** D1.cbrn Chemical, biological, radiological or nuclear weapons
- **Quote** (PDF p. 6, §1 Our Recommendations for Industry-Wide Safety, threshold table, row 'Non-novel chemical/biological weapons production', left column ('Capability or usage threshold')): “create/obtain and deploy chemical and/or biological weapons with serious potential for catastrophic”

### rsp-v3-4.D1.autonomy

- **Edition:** Anthropic, Responsible Scaling Policy, v3.4 (2026-07-08)
- **Question:** D1.autonomy Autonomy, self-improvement or AI research and development
- **Quote** (PDF p. 8, §1, threshold table, row 'Automated R&D in key domains', left column, first sentence): “AI systems that can fully automate, or otherwise dramatically accelerate, the work of large, top-tier teams of human researchers”

### rsp-v3-4.D7.external

- **Edition:** Anthropic, Responsible Scaling Policy, v3.4 (2026-07-08)
- **Question:** D7.external Public or external reporting
- **Quote** (PDF p. 14, §3.5 Publication and Redactions, first sentence): “publish a public version of our Risk Report”
- **Quote** (PDF p. 14, §3.5 Publication and Redactions, paragraph after the list of redaction reasons): “disclose the existence of each redaction”

### fsf-2024.D8.process

- **Edition:** Google DeepMind, Frontier Safety Framework, v1.0 (2024-05-17)
- **Question:** D8.process Revision process and approval
- **Quote** (PDF p. 1 (printed p. 1), opening section, third paragraph, third sentence): “It will be reviewed periodically and we expect it to evolve substantially as our understanding of the risks and benefits of frontier models improves.”
- **Quote** (PDF p. 6 (printed p. 6), Future work, second paragraph, second sentence): “we will publish substantive revisions as appropriate.”

### fsf-v2-0.D8.changes

- **Edition:** Google DeepMind, Frontier Safety Framework, v2.0 (2025-02-04)
- **Question:** D8.changes Stated changes from the previous edition
- **Quote** (PDF p. 5 (printed p. 5), Table 1, footnote 9, first sentence): “Note that we have removed the Autonomy risk domain, which was included in Frontier Safety Framework version 1.0.”

### fsf-v3-1.D1.other

- **Edition:** Google DeepMind, Frontier Safety Framework, v3.1 (2026-04-17)
- **Question:** D1.other Other named domains
- **Quote** (PDF p. 5 (printed p. 5), §1.3.1 Risk Identification, fourth sentence): “risks may be most likely to arise from future models: CBRN, cyber, harmful manipulation, as well as machine learning R&D and misalignment.”

### fsf-v3-1.D8.changes

- **Edition:** Google DeepMind, Frontier Safety Framework, v3.1 (2026-04-17)
- **Question:** D8.changes Stated changes from the previous edition
- **Quote** (PDF p. 17 (printed p. 17), §5.3 Past Updates and Changes, Version 3.1 (April 17, 2026), first bullet): “Introduced CBRN TCLs and outlined mitigation and risk acceptance process.”
- **Quote** (PDF p. 17 (printed p. 17), §5.3, Version 3.1, second bullet): “Incorporated the previous exploratory Misalignment risk domain into a combined ML R&D and Misalignment risk domain”

### preparedness-beta-2023.D1.persuasion

- **Edition:** OpenAI, Preparedness Framework, Beta (2023-12-18)
- **Question:** D1.persuasion Persuasion or manipulation
- **Quote** (PDF p. 10, Tracked Risk Categories › 'Persuasion', opening sentence): “Persuasion is focused on risks related to convincing people to change their beliefs (or act on)”

### preparedness-v2.D1.autonomy

- **Edition:** OpenAI, Preparedness Framework, Version 2 (2025-04-15)
- **Question:** D1.autonomy Autonomy, self-improvement or AI research and development
- **Quote** (PDF p. 2 (printed p. 1), opening page, third bullet of the Tracked Categories list): “AI Self-improvement capabilities that … could also create new challenges for human control of AI systems.”

### preparedness-v2.D6.discretion

- **Edition:** OpenAI, Preparedness Framework, Version 2 (2025-04-15)
- **Question:** D6.discretion Other exceptions or discretion
- **Quote** (PDF p. 16 (printed p. 15), Appendix B, SAG responsibilities, fifth bullet): “OpenAI Leadership can also make decisions without the SAG’s participation”

### frontier-governance-2026.D2.levels

- **Edition:** OpenAI, Frontier Governance Framework, May 2026 edition (2026-05-28)
- **Question:** D2.levels Named levels or thresholds
- **Quote** (PDF p. 9 (printed p. 07), §2.4 Risk tiers › 'Cyber offense', introductory paragraph): “For cyber offense systemic risks, we have established a tier system … The system consists of the following tiers:”

### faif-2026.D1.persuasion

- **Edition:** xAI, Frontier Artificial Intelligence Framework, June 2026 edition (2026-06-30)
- **Question:** D1.persuasion Persuasion or manipulation
- **Quote** (PDF p. 2, §2.1 Risk Identification, third paragraph, first sentence): “four primary risk domains where significant or severe outcomes are most likely to emerge in current and future systems: CBRN Risks, Offensive Cybersecurity Risks, Loss of Control Risks and Harmful Manipulation Risks.”
- **Quote** (PDF p. 1, §1 Introduction, third paragraph, fourth sentence): “risks of models with high manipulative capabilities potentially being misused”

### faif-2026.D5.cadence

- **Edition:** xAI, Frontier Artificial Intelligence Framework, June 2026 edition (2026-06-30)
- **Question:** D5.cadence Evaluation timing
- **Quote** (PDF p. 2, §2 Risk Management Framework, second paragraph, first sentence): “xAI will conduct a full systemic risk assessment and mitigation process of our frontier models at least once a year.”
- **Quote** (PDF p. 6, first §2.3 'Systemic risk acceptance determination', first paragraph (continued from PDF p. 5), second sentence): “These evaluations are performed precedent to the wider deployment of our models”

### meta-aasf-v2-0.D1.autonomy

- **Edition:** Meta, Frontier AI Framework / Advanced AI Scaling Framework, v2.0 (2026-04-08)
- **Question:** D1.autonomy Autonomy, self-improvement or AI research and development
- **Quote** (PDF p. 1 (unnumbered opening page), second paragraph, second sentence): “The Framework currently focuses on catastrophic risks in three areas: Chemical & Biological, Cybersecurity, and Loss of Control.”

### ms-fgf-2025.D2.levels

- **Edition:** Microsoft, Frontier Governance Framework, Feb 2025 (Version 1) (2025-02)
- **Question:** D2.levels Named levels or thresholds
- **Quote** (PDF p. 4 (printed p. 3), §2 Capabilities and risks, paragraph after the tracked-capabilities list, first sentence): “whether the capability poses a low, medium, high, or critical risk”

### ms-fgf-2026.D1.persuasion

- **Edition:** Microsoft, Frontier Governance Framework, Feb 2026 (2026-02)
- **Question:** D1.persuasion Persuasion or manipulation
- **Quote** (PDF p. 4 (printed p. 3), §2 Capabilities and risks, 'Tracked high-risk capabilities', fifth bullet): “Harmful manipulation. A model’s ability to strategically distort human behavior or beliefs at scale.”

### ms-fgf-2026.D2.levels

- **Edition:** Microsoft, Frontier Governance Framework, Feb 2026 (2026-02)
- **Question:** D2.levels Named levels or thresholds
- **Quote** (PDF p. 4 (printed p. 3), §2 Capabilities and risks, paragraph after the tracked-capabilities list, first sentence): “whether the capability poses a low, medium, high, or critical risk”

### ms-fgf-2026.D2.definition

- **Edition:** Microsoft, Frontier Governance Framework, Feb 2026 (2026-02)
- **Question:** D2.definition How a threshold is defined
- **Quote** (PDF p. 12 (printed p. 11), Appendix I – Capability thresholds, CBRN weapons table, High row, Capability threshold column (first statement)): “The model provides a meaningful uplift to an expert’s … ability to develop and deliver a novel CBRN threat.”

## Specific questions

- **Category fit.** For each developer, is any facet label a poor fit for that developer’s structure, so that putting its passage under the label misleads? Name the cell and say why.
- **Edition neutrality.** Does any facet label or criterion borrow one developer’s terms?
- **Commitment versus practice.** Does any quotation or note in the verdicts file present a stated commitment as something done?
- **"Partly".** For cells the verdicts file marks `partial`, is the distinction from "stated" and from "not found" drawn consistently across developers?
- **Missing editions.** Is any published edition of these frameworks missing (for example an OpenAI Preparedness Framework edition between Beta and Version 2, an xAI framework before December 2025, or a later edition of any framework)? Give the publisher address.
