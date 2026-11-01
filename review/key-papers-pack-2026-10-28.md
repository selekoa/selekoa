# Key papers and publications on AI: candidate pack, 2026-10-28

A report on the candidate research pack in [`research/key-papers/`](../research/key-papers/README.md), prepared on branch `key-papers-pack` for the roadmap item "Key papers and publications on AI" (maintainer note, 2026-10-28). Nothing was admitted: `data/`, the application, the schema and the releases are unchanged. The pack was machine-prepared and audited by the same model family; the cross-family check has not been run, and no record has human review.

## What the pack holds

112 papers and other publications on machine intelligence, each entered on a stated basis, never on a judgement of importance:

| Basis                    | Papers | Rule                                                                                                                                                          |
| ------------------------ | -----: | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1. Cited by the record   |     82 | Cited by at least **5** dataset documents (identifier, DOI or full-title match in the retrieved text; check date 2026-10-28), and on machine intelligence     |
| 2. Stated citation count |     30 | Semantic Scholar `citationCount` for machine-learning papers (query and filters in `scope.md`), retrieved 2026-10-28; the highest-ranked works basis 1 misses |

Twenty of the 112 are already document records in the dataset (among them Attention Is All You Need, Scaling Laws, InstructGPT, PPO, Good 1965 and several economics papers); the pack reuses their IDs and adds only what is missing.

Candidate records (1,221), in the dataset's shape:

| Kind                                                                                                                 | Records | Predicate                        |
| -------------------------------------------------------------------------------------------------------------------- | ------: | -------------------------------- |
| What the paper says it contributes, quoted (≤ 50 words) from the abstract or introduction                            |     138 | `states_contribution` (proposed) |
| Authorship as printed in the byline                                                                                  |     457 | `authored`                       |
| Citation by a dataset document (the basis-1 evidence)                                                                |     600 | `cites`                          |
| Attributed credit: a dataset document's own sentence attributing an argument, term, finding or approach to the paper |      26 | `credits_work` (proposed)        |

Persons: 138 proposed person records (credited on two or more pack papers under one printed name) and 76 existing person records reused; 891 credited authors are listed without a record. Four papers have no "states" record (no text retrieved, or no text layer). 72 papers have no conference or journal version recorded (see question 6).

## Basis tables

### Basis 1: cited by the record

The count is the number of dataset documents whose retrieved text cites the work, on 2026-10-28. It is a lower bound and a property of the dataset, not of the paper.

| --: | --- | --- | --: |
| 1 | Attention Is All You Need | 2017 | 18 |
| 2 | Language Models are Few-Shot Learners | 2020 | 17 |
| 3 | Evaluating Large Language Models Trained on Code | 2021 | 16 |
| 4 | Measuring Massive Multitask Language Understanding | 2020 | 14 |
| 5 | Superintelligence: Paths, Dangers, Strategies | 2014 | 13 |
| 6 | Adam: A Method for Stochastic Optimization | 2014 | 11 |
| 7 | BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding | 2018 | 11 |
| 8 | Deep reinforcement learning from human preferences | 2017 | 11 |
| 9 | Language Models are Unsupervised Multitask Learners | 2019 | 11 |
| 10 | Training language models to follow instructions with human feedback | 2022 | 11 |
| 11 | Artificial Intelligence and Economic Growth | 2017 | 10 |
| 12 | Artificial Intelligence as a Positive and Negative Factor in Global Risk | 2006 | 10 |
| 13 | Improving Language Understanding by Generative Pre-Training | 2018 | 10 |
| 14 | Scaling Laws for Neural Language Models | 2020 | 10 |
| 15 | Artificial Intelligence Risk Management Framework (AI RMF 1.0) | 2023 | 9 |
| 16 | Concrete Problems in AI Safety | 2016 | 9 |
| 17 | DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning | 2025 | 9 |
| 18 | Training Compute-Optimal Large Language Models | 2022 | 9 |
| 19 | Exploring the Limits of Transfer Learning with a Unified Text-to-Text Transformer | 2019 | 8 |
| 20 | HellaSwag: Can a Machine Really Finish Your Sentence? | 2019 | 8 |
| 21 | On the Opportunities and Risks of Foundation Models | 2021 | 8 |
| 22 | The Basic AI Drives | 2008 | 8 |
| 23 | Why Are There Still So Many Jobs? The History and Future of Workplace Automation | 2015 | 8 |
| 24 | GPT-4 Technical Report | 2023 | 7 |
| 25 | LiveCodeBench: Holistic and Contamination Free Evaluation of Large Language Models for Code | 2024 | 7 |
| 26 | Measuring Mathematical Problem Solving With the MATH Dataset | 2021 | 7 |
| 27 | Program Synthesis with Large Language Models | 2021 | 7 |
| 28 | Proximal Policy Optimization Algorithms | 2017 | 7 |
| 29 | Switch Transformers: Scaling to Trillion Parameter Models with Simple and Efficient Sparsity | 2021 | 7 |
| 30 | Training Verifiers to Solve Math Word Problems | 2021 | 7 |
| 31 | Training a Helpful and Harmless Assistant with Reinforcement Learning from Human Feedback | 2022 | 7 |
| 32 | ZeRO: Memory optimizations Toward Training Trillion Parameter Models | 2019 | 7 |
| 33 | AI safety via debate | 2018 | 6 |
| 34 | Algorithms for Inverse Reinforcement Learning | 2000 | 6 |
| 35 | Are We Approaching an Economic Singularity? Information Technology and the Future of Economic Growth | 2015 | 6 |
| 36 | Challenging BIG-Bench Tasks and Whether Chain-of-Thought Can Solve Them | 2022 | 6 |
| 37 | Constitutional AI: Harmlessness from AI Feedback | 2022 | 6 |
| 38 | Deep contextualized word representations | 2018 | 6 |
| 39 | ImageNet classification with deep convolutional neural networks | 2012 | 6 |
| 40 | Llama 2: Open Foundation and Fine-Tuned Chat Models | 2023 | 6 |
| 41 | MMLU-Pro: A More Robust and Challenging Multi-Task Language Understanding Benchmark | 2024 | 6 |
| 42 | Megatron-LM: Training Multi-Billion Parameter Language Models Using Model Parallelism | 2019 | 6 |
| 43 | Natural Questions: A Benchmark for Question Answering Research | 2019 | 6 |
| 44 | Neural Machine Translation of Rare Words with Subword Units | 2015 | 6 |
| 45 | Robots and Jobs: Evidence from US Labor Markets | 2020 | 6 |
| 46 | The Race Between Machine and Man: Implications of Technology for Growth, Factor Shares and Employment | 2016 | 6 |
| 47 | Think you have Solved Question Answering? Try ARC, the AI2 Reasoning Challenge | 2018 | 6 |
| 48 | TriviaQA: A Large Scale Distantly Supervised Challenge Dataset for Reading Comprehension | 2017 | 6 |
| 49 | BoolQ: Exploring the Surprising Difficulty of Natural Yes/No Questions | 2019 | 5 |
| 50 | C-Eval: A Multi-Level Multi-Discipline Chinese Evaluation Suite for Foundation Models | 2023 | 5 |
| 51 | CMMLU: Measuring massive multitask language understanding in Chinese | 2023 | 5 |
| 52 | Chain-of-Thought Prompting Elicits Reasoning in Large Language Models | 2022 | 5 |
| 53 | Decoupled Weight Decay Regularization | 2017 | 5 |
| 54 | Deep Residual Learning for Image Recognition | 2015 | 5 |
| 55 | Economic Growth Given Machine Intelligence | 2000 | 5 |
| 56 | Ethical and social risks of harm from Language Models | 2021 | 5 |
| 57 | GPQA: A Graduate-Level Google-Proof Q&amp;A Benchmark | 2023 | 5 |
| 58 | GPipe: Efficient Training of Giant Neural Networks using Pipeline Parallelism | 2018 | 5 |
| 59 | GShard: Scaling Giant Models with Conditional Computation and Automatic Sharding | 2020 | 5 |
| 60 | Guided Cost Learning: Deep Inverse Optimal Control via Policy Optimization | 2016 | 5 |
| 61 | Human-level control through deep reinforcement learning | 2015 | 5 |
| 62 | Humanity's Last Exam | 2025 | 5 |
| 63 | Instruction-Following Evaluation for Large Language Models | 2023 | 5 |
| 64 | LLaMA: Open and Efficient Foundation Language Models | 2023 | 5 |
| 65 | LaMDA: Language Models for Dialog Applications | 2022 | 5 |
| 66 | Mastering the game of Go with deep neural networks and tree search | 2016 | 5 |
| 67 | MathVista: Evaluating Mathematical Reasoning of Foundation Models in Visual Contexts | 2023 | 5 |
| 68 | PIQA: Reasoning about Physical Commonsense in Natural Language | 2019 | 5 |
| 69 | PaLM: Scaling Language Modeling with Pathways | 2022 | 5 |
| 70 | RACE: Large-scale ReAding Comprehension Dataset From Examinations | 2017 | 5 |
| 71 | RoBERTa: A Robustly Optimized BERT Pretraining Approach | 2019 | 5 |
| 72 | RoFormer: Enhanced Transformer with Rotary Position Embedding | 2021 | 5 |
| 73 | Scalable agent alignment via reward modeling: a research direction | 2018 | 5 |
| 74 | Scaling Language Models: Methods, Analysis &amp; Insights from Training Gopher | 2021 | 5 |
| 75 | Self-Consistency Improves Chain of Thought Reasoning in Language Models | 2022 | 5 |
| 76 | Speculations Concerning the First Ultraintelligent Machine | 1965 | 5 |
| 77 | Supervising strong learners by amplifying weak experts | 2018 | 5 |
| 78 | The Alignment Problem from a Deep Learning Perspective | 2022 | 5 |
| 79 | The Future of Employment: How Susceptible Are Jobs to Computerisation? | 2013 | 5 |
| 80 | The Race between Man and Machine: Implications of Technology for Growth, Factor Shares, and Employment | 2018 | 5 |
| 81 | TruthfulQA: Measuring How Models Mimic Human Falsehoods | 2021 | 5 |
| 82 | WinoGrande: An Adversarial Winograd Schema Challenge at Scale | 2019 | 5 |

Near-misses (count 4, one below the threshold): 54, among them $τ^2$-Bench: Evaluating Conversational Agents in a Dual-Control Environment (4), A Span-Extraction Dataset for Chinese Machine Reading Comprehension (4), AGIEval: A Human-Centric Benchmark for Evaluating Foundation Models (4), Are We Done with MMLU? (4), Artificial intelligence meets natural stupidity (4), Artificial Intelligence, Automation and Work (4), Asynchronous Methods for Deep Reinforcement Learning (4), Automation and New Tasks: How Technology Displaces and Reinstates Labor (4), BrowseComp: A Simple Yet Challenging Benchmark for Browsing Agents (4), Chinese SimpleQA: A Chinese Factuality Evaluation for Large Language Models (4), Competition-Level Code Generation with AlphaCode (4), Cooperative Inverse Reinforcement Learning (4); the full list is in `pack.md`. Excluded by the subject rule: 4 (Are Ideas Getting Harder to Find?, The Second Machine Age, an editor's report matched through site navigation, SocialIQA).

### Basis 2: a stated citation count

| Index rank | Paper                                                                                                           | Year | Semantic Scholar citations | Citing dataset documents |
| ---------: | --------------------------------------------------------------------------------------------------------------- | ---- | -------------------------: | -----------------------: |
|          4 | Random Forests                                                                                                  | 2001 |                    127,570 |                        0 |
|          7 | Faster R-CNN: Towards Real-Time Object Detection with Region Proposal Networks                                  | 2015 |                     76,824 |                        1 |
|          9 | XGBoost: A Scalable Tree Boosting System                                                                        | 2016 |                     64,954 |                        0 |
|         10 | Gradient-based learning applied to document recognition                                                         | 1998 |                     63,607 |                        1 |
|         12 | You Only Look Once: Unified, Real-Time Object Detection                                                         | 2015 |                     49,196 |                        0 |
|         13 | Going deeper with convolutions                                                                                  | 2014 |                     48,393 |                        1 |
|         14 | Batch Normalization: Accelerating Deep Network Training by Reducing Internal Covariate Shift                    | 2015 |                     48,185 |                        1 |
|         17 | Dropout: a simple way to prevent neural networks from overfitting                                               | 2014 |                     44,812 |                        3 |
|         18 | A Unified Approach to Interpreting Model Predictions                                                            | 2017 |                     44,356 |                        0 |
|         22 | Semi-Supervised Classification with Graph Convolutional Networks                                                | 2016 |                     38,073 |                        0 |
|         23 | Squeeze-and-Excitation Networks                                                                                 | 2017 |                     37,490 |                        0 |
|         25 | SSD: Single Shot MultiBox Detector                                                                              | 2015 |                     36,588 |                        0 |
|         26 | Efficient Estimation of Word Representations in Vector Space                                                    | 2013 |                     35,395 |                        2 |
|         30 | Grad-CAM: Visual Explanations from Deep Networks via Gradient-Based Localization                                | 2016 |                     30,631 |                        0 |
|         31 | Neural Machine Translation by Jointly Learning to Align and Translate                                           | 2014 |                     30,288 |                        2 |
|         33 | Rich Feature Hierarchies for Accurate Object Detection and Semantic Segmentation                                | 2013 |                     29,715 |                        0 |
|         34 | Graph Attention Networks                                                                                        | 2017 |                     29,243 |                        0 |
|         35 | Communication-Efficient Learning of Deep Networks from Decentralized Data                                       | 2016 |                     28,206 |                        0 |
|         36 | Learning Phrase Representations using RNN Encoder–Decoder for Statistical Machine Translation                   | 2014 |                     28,132 |                        1 |
|         37 | Distilling the Knowledge in a Neural Network                                                                    | 2015 |                     27,137 |                        1 |
|         38 | EfficientNet: Rethinking Model Scaling for Convolutional Neural Networks                                        | 2019 |                     27,104 |                        1 |
|         39 | CBAM: Convolutional Block Attention Module                                                                      | 2018 |                     26,721 |                        0 |
|         40 | MobileNets: Efficient Convolutional Neural Networks for Mobile Vision Applications                              | 2017 |                     26,492 |                        0 |
|         42 | “Why Should I Trust You?”: Explaining the Predictions of Any Classifier                                         | 2016 |                     25,114 |                        2 |
|         43 | LoRA: Low-Rank Adaptation of Large Language Models                                                              | 2021 |                     24,949 |                        2 |
|         45 | Explaining and Harnessing Adversarial Examples                                                                  | 2014 |                     23,499 |                        3 |
|         48 | Sequence to Sequence Learning with Neural Networks                                                              | 2014 |                     22,572 |                        1 |
|         51 | DeepLab: Semantic Image Segmentation with Deep Convolutional Nets, Atrous Convolution, and Fully Connected CRFs | 2016 |                     21,861 |                        0 |
|         53 | Delving Deep into Rectifiers: Surpassing Human-Level Performance on ImageNet Classification                     | 2015 |                     21,178 |                        0 |
|         54 | The Unreasonable Effectiveness of Deep Features as a Perceptual Metric                                          | 2018 |                     21,014 |                        0 |

Passed over by basis 2, with reasons in `pack.md`: software descriptions (scikit-learn, PyTorch, LIBSVM, TensorFlow), textbooks, works outside machine learning, surveys of a field, and two index anomalies (a 2017 encyclopedia entry "Deep learning" and a 2021 "Generative Adversarial Networks" record, each carrying tens of thousands of citations that cannot be its own).

## Checks

- **Mechanical** (`verify.mjs`): all 162 quotations found in the text they name, within 50 words and within every source's budget counting the dataset's existing quotations of the same expression; all 600 citations re-found in the citing texts; all 457 printed names found on the first page of the version read. No problems at the last run.
- **Same-family audit** ([audit.md](../research/key-papers/audit.md)): two fresh-context auditors, about 150 records and papers; 33 findings (12 from auditor A, 21 rows from auditor B), all disposed. The material ones changed rules, not single records, and every count was recomputed:
  - false citations from short titles inside other names (TC260's and SAIL's own "risk management framework" titles), from an encyclopedia link, and from an unlinked arXiv v5 counted beside the dataset's record of the same paper. Long Short-Term Memory, Google's Neural Machine Translation System and Cooperative Inverse Reinforcement Learning fell to 4 and left basis 1;
  - Semantic Scholar's venue years wrong in 9 of 23 sampled papers: all its venue entries were removed;
  - printed names missed where the index form differs (Jeffrey/Jeff, hyphenated given names): matcher widened for all papers;
  - dates of attributions read in later copies (a 2018 revision, an undated reprint) now carry an attested date or note.
- **Integrator's corrections before the audit**: a book's bibliography (the AI-Foom Debate volume, which holds about thirty dataset posts) and an archive listing shared by every edition of a framework had been credited to each record; citations in any body shared by several records are no longer counted. A wrong index match (another paper titled "Artificial Intelligence and Economic Growth") was discarded. Two thin attributions were dropped; three quotations were paraphrased or shortened for source budgets.
- **Cross-family brief**: [`cross-family-input-2026-10-28.md`](../research/key-papers/cross-family-input-2026-10-28.md), 187 items (90 in Part A, blind: publication dates and versions, authorship as printed; 97 in Part B, direct: quotations, attributions, citation-basis counts). The pack's answers are in a separate verdicts file. Not run.
- `pnpm check:privacy` passed before each push. `pnpm check` was not run: no data, schema or application file changed.

## Retrieval failures

- **Corpus** (60 of 567 sources not read): web.archive.org refused connections throughout; openai.com (13 sources), Meta's AI pages, sec.gov, the Open Philanthropy / Coefficient Giving site, the New York Governor's site, leginfo, EUR-Lex (HTTP 202, empty), arbital.greaterwrong.com, GitHub file pages and several personal and archive sites refused or failed. Their citations are not counted, so every count is a lower bound for the documents they hold.
- **Shared bodies** (18 not counted): the AI-Foom Debate volume, framework archive listings, monthly newsgroup archives, one NBER address serving two versions, and error pages returned for several addresses.
- **Papers**: Superintelligence (book; no text), Algorithms for Inverse Reinforcement Learning (HTTP 503), Random Forests (publisher page without text), Gradient-based learning applied to document recognition (PDF without a usable text layer). Long Short-Term Memory was read from a course site's copy, Robots and Jobs from the NBER working paper, and three Nature and Springer papers from publisher abstracts.
- **Indexes**: OpenAlex's shared free budget for this network was exhausted on 2026-10-28 (no key requested); Semantic Scholar answered with pacing; dblp and OpenReview presented bot challenges.

## Open questions for the maintainer

Each has a recommended answer.

1. **A "paper" document subtype and hub section.** The dataset has "Research paper (work)", "Research paper", "Conference paper", "Journal article", "Preprint" and "Working paper". _Recommended:_ admit the pack's papers as "Research paper (work)", the subtype the lineage records already use, with versions as document versions; do not add a new subtype. Add a section "Papers the record cites" to the institutional-history hub (technical strand), listing the basis-1 papers with their counts and check date, and linking each to its document page. Show basis-2 papers in the same section under their own heading, with the index, count and date.
2. **How a paper links to the thought spine.** _Recommended:_ through attributed-credit records only: add `credits_work` (document → document: the citing document expressly attributes an argument, concept, term, finding or approach to the work) with an `attribution` attribute (builds on; attributes a term or concept; summarises an argument or finding; attributes and disputes). Admit the first, second and fourth kinds; hold "summarises" (7 records) until the cross-family check has read them, since a summary is the weakest form of credit. Do not make papers texts in the proposition collections on citation grounds; that needs the collections' own criteria and a separate pass.
3. **Person-record threshold.** Two or more pack papers under one identical printed name gives 138 new person records, mostly co-authors of large-team papers. _Recommended:_ keep the rule, but admit persons in two steps: first the persons credited on three or more pack papers or already linked to a dataset text, then the rest after the cross-family identity items. Keep the 891 single-paper authors as printed names on the document records (an author list attribute), without person records. Never merge variant printed forms without a source that identifies the person.
4. **`states_contribution`.** The dataset has `states_provision` for legal and framework texts, and no predicate for what a paper says it contributes. _Recommended:_ add `states_contribution` (document → literal; the document's own description of its contribution, quoted; never an assessment), rather than reusing `states_provision`.
5. **Priority claims in papers' own words** (4 quotations: DQN, GPT-3, PReLU, C-Eval). _Recommended:_ admit them as quoted and flagged, with the qualification that the claim is the paper's; show the flag in the interface. Keep "new" and "novel" unflagged.
6. **Venue facts.** After the audit removed Semantic Scholar's venue entries, 72 papers carry arXiv versions only. _Recommended:_ add conference and journal versions only from the proceedings or journal page (or Crossref, at year precision), using the cross-family check's Part A answers where they agree with a page the preparer can retrieve; leave a venue unknown otherwise.
7. **Collective bylines** ("OpenAI" on the GPT-4 Technical Report, "DeepSeek-AI" on DeepSeek-R1). _Recommended:_ record the collective byline as printed (an organisation credit through `published` or an author-literal), and no individual authorship records from contribution lists.
8. **Showing the count.** _Recommended:_ show the basis-1 count only with its definition and date ("cited by N dataset documents as of 2026-10-28"), recompute it at each release from the dataset, and never sort the hub section by it alone (sort by year by default).
9. **Basis 2 index.** _Recommended:_ keep Semantic Scholar for this pack, recording the query, filters and date; if OpenAlex is preferred later, rerun basis 2 with a key and record both counts.
10. **Admission order.** _Recommended:_ (1) run the cross-family brief; (2) decide questions 2–4; (3) admit the documents, versions, "states" and `cites` records first (existing predicates except `states_contribution`); (4) persons and authorship second, after the identity items; (5) attributed-credit records last.

## What the cross-family check should prioritise

1. **Venue publications and dates** (Part A, `dates`): the pack has none for 72 papers, and the audit showed the index unreliable.
2. **Counts at the threshold** (Part B, `count`): 34 papers sit exactly at 5; one false citation removes a paper from basis 1.
3. **Attributed-credit records** (Part B, `attribution`, all 26), especially the "summarises" kind and the two records whose wording survives only in later copies.
4. **Identity under one printed name** (Part A, `authorship`), especially common names (Xiangyu Zhang, Jian Sun, Wei Liu) and names whose printed forms differ between papers.
5. **The four priority-claim quotations** and a sample of the rest (Part B, `quotation`).

## Next step

Run the cross-family check from the brief, then decide questions 2–4 before any admission task.

## Maintainer decisions (2026-10-28)

All recommended answers to the open questions above (1–10) are adopted as written. Admission still waits for the cross-family check and its adjudication; where the check changes the basis of a recommendation, the admission task lists it for the maintainer instead of applying it.
