# Key papers and publications on AI: candidate pack

Generated from [pack.json](pack.json) by `node research/key-papers/render.mjs`; do not edit by hand. Candidate research pack outside application data. Machine-prepared and audited by the same model family (Claude); cross-family check not yet run; no human review. Nothing here is admitted. See the [README](README.md) and [scope](scope.md) for method and limits.

|                                          |                                                                        |
| ---------------------------------------- | ---------------------------------------------------------------------- |
| Papers                                   | 112 (basis 1: 82; basis 2: 30)                                         |
| Already document records in the dataset  | 20                                                                     |
| Candidate records                        | 1221: 138 “states”, 457 authorship, 600 citation, 26 attributed-credit |
| Person records                           | 138 proposed (credited on two or more pack papers), 76 existing reused |
| Credited authors without a person record | 891                                                                    |
| Near-misses (basis 1, count 4)           | 54                                                                     |
| Excluded by the subject rule             | 4                                                                      |

**Basis 1.** Cited by at least 5 distinct citing texts of the corpus (identifier or title match), on machine intelligence. Check date 2026-10-28. The count is of dataset documents (corpus entries) whose retrieved text cites the work; it is a lower bound (see scope).

**Basis 2.** Semantic Scholar `citationCount`, query `"machine learning" | "neural network" | "neural networks" | "deep learning" | "reinforcement learning" | "language model" | "language models"`, fieldsOfStudy=Computer Science; publicationTypes=JournalArticle,Conference; sort=citationCount:desc; retrieved 2026-10-28; up to 30 works not admitted by basis 1. A citation count is a property of the index, not a measure of quality or influence.

## Basis 1: cited by the record

|   # | Paper                                                                                                                                                          | Year | Citing dataset documents |
| --: | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- | -----------------------: |
|   1 | [Attention Is All You Need](#attention-all-you-need)                                                                                                           | 2017 |                       18 |
|   2 | [Language Models are Few-Shot Learners](#kp-language-models-few-shot-learners-2020)                                                                            | 2020 |                       17 |
|   3 | [Evaluating Large Language Models Trained on Code](#kp-evaluating-large-language-models-trained-2021)                                                          | 2021 |                       16 |
|   4 | [Measuring Massive Multitask Language Understanding](#kp-measuring-massive-multitask-language-understanding-2020)                                              | 2020 |                       14 |
|   5 | [Superintelligence: Paths, Dangers, Strategies](#kp-superintelligence-paths-dangers-strategies-2014)                                                           | 2014 |                       13 |
|   6 | [Adam: A Method for Stochastic Optimization](#adam-paper)                                                                                                      | 2014 |                       11 |
|   7 | [BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding](#kp-bert-pre-training-deep-bidirectional-2019)                              | 2018 |                       11 |
|   8 | [Deep reinforcement learning from human preferences](#human-preferences-paper)                                                                                 | 2017 |                       11 |
|   9 | [Language Models are Unsupervised Multitask Learners](#kp-language-models-unsupervised-multitask-learners-2019)                                                | 2019 |                       11 |
|  10 | [Training language models to follow instructions with human feedback](#instructgpt-paper)                                                                      | 2022 |                       11 |
|  11 | [Artificial Intelligence and Economic Growth](#aghion-jones-jones-2017-ai-and-economic-growth)                                                                 | 2017 |                       10 |
|  12 | [Artificial Intelligence as a Positive and Negative Factor in Global Risk](#ai-positive-negative-factor-global-risk)                                           | 2006 |                       10 |
|  13 | [Improving Language Understanding by Generative Pre-Training](#kp-improving-language-understanding-by-generative-2018)                                         | 2018 |                       10 |
|  14 | [Scaling Laws for Neural Language Models](#scaling-laws)                                                                                                       | 2020 |                       10 |
|  15 | [Artificial Intelligence Risk Management Framework (AI RMF 1.0)](#kp-ai-risk-management-framework-2023)                                                        | 2023 |                        9 |
|  16 | [Concrete Problems in AI Safety](#concrete-problems-paper)                                                                                                     | 2016 |                        9 |
|  17 | [DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning](#kp-deepseek-r1-incentivizing-reasoning-capability-2025)                  | 2025 |                        9 |
|  18 | [Training Compute-Optimal Large Language Models](#compute-optimal-language-models)                                                                             | 2022 |                        9 |
|  19 | [Exploring the Limits of Transfer Learning with a Unified Text-to-Text Transformer](#kp-exploring-limits-transfer-learning-unified-2019)                       | 2019 |                        8 |
|  20 | [HellaSwag: Can a Machine Really Finish Your Sentence?](#kp-hellaswag-can-machine-really-finish-2019)                                                          | 2019 |                        8 |
|  21 | [On the Opportunities and Risks of Foundation Models](#kp-opportunities-risks-foundation-models-2021)                                                          | 2021 |                        8 |
|  22 | [The Basic AI Drives](#kp-basic-ai-drives-2008)                                                                                                                | 2008 |                        8 |
|  23 | [Why Are There Still So Many Jobs? The History and Future of Workplace Automation](#autor-2015-why-are-there-still-so-many-jobs)                               | 2015 |                        8 |
|  24 | [GPT-4 Technical Report](#kp-gpt-4-technical-report-2023)                                                                                                      | 2023 |                        7 |
|  25 | [LiveCodeBench: Holistic and Contamination Free Evaluation of Large Language Models for Code](#kp-livecodebench-holistic-contamination-free-evaluation-2024)   | 2024 |                        7 |
|  26 | [Measuring Mathematical Problem Solving With the MATH Dataset](#kp-measuring-mathematical-problem-solving-math-2021)                                           | 2021 |                        7 |
|  27 | [Program Synthesis with Large Language Models](#kp-program-synthesis-large-language-models-2021)                                                               | 2021 |                        7 |
|  28 | [Proximal Policy Optimization Algorithms](#ppo-paper)                                                                                                          | 2017 |                        7 |
|  29 | [Switch Transformers: Scaling to Trillion Parameter Models with Simple and Efficient Sparsity](#kp-switch-transformers-scaling-trillion-parameter-2021)        | 2021 |                        7 |
|  30 | [Training a Helpful and Harmless Assistant with Reinforcement Learning from Human Feedback](#kp-training-helpful-harmless-assistant-reinforcement-2022)        | 2022 |                        7 |
|  31 | [Training Verifiers to Solve Math Word Problems](#kp-training-verifiers-solve-math-word-2021)                                                                  | 2021 |                        7 |
|  32 | [ZeRO: Memory optimizations Toward Training Trillion Parameter Models](#kp-zero-memory-optimizations-toward-training-2019)                                     | 2019 |                        7 |
|  33 | [AI safety via debate](#debate-paper)                                                                                                                          | 2018 |                        6 |
|  34 | [Algorithms for Inverse Reinforcement Learning](#kp-algorithms-inverse-reinforcement-learning-2000)                                                            | 2000 |                        6 |
|  35 | [Are We Approaching an Economic Singularity? Information Technology and the Future of Economic Growth](#nordhaus-2015-economic-singularity)                    | 2015 |                        6 |
|  36 | [Challenging BIG-Bench Tasks and Whether Chain-of-Thought Can Solve Them](#kp-challenging-big-bench-tasks-whether-2022)                                        | 2022 |                        6 |
|  37 | [Constitutional AI: Harmlessness from AI Feedback](#kp-constitutional-ai-harmlessness-from-ai-2022)                                                            | 2022 |                        6 |
|  38 | [Deep contextualized word representations](#kp-deep-contextualized-word-representations-2018)                                                                  | 2018 |                        6 |
|  39 | [ImageNet classification with deep convolutional neural networks](#kp-imagenet-classification-deep-convolutional-neural-2012)                                  | 2012 |                        6 |
|  40 | [Llama 2: Open Foundation and Fine-Tuned Chat Models](#kp-llama-2-open-foundation-fine-2023)                                                                   | 2023 |                        6 |
|  41 | [Megatron-LM: Training Multi-Billion Parameter Language Models Using Model Parallelism](#kp-megatron-lm-training-multi-billion-2019)                           | 2019 |                        6 |
|  42 | [MMLU-Pro: A More Robust and Challenging Multi-Task Language Understanding Benchmark](#kp-mmlu-pro-more-robust-challenging-2024)                               | 2024 |                        6 |
|  43 | [Natural Questions: A Benchmark for Question Answering Research](#kp-natural-questions-benchmark-question-answering-2019)                                      | 2019 |                        6 |
|  44 | [Neural Machine Translation of Rare Words with Subword Units](#kp-neural-machine-translation-rare-words-2015)                                                  | 2015 |                        6 |
|  45 | [Robots and Jobs: Evidence from US Labor Markets](#kp-robots-jobs-evidence-from-us-2019)                                                                       | 2020 |                        6 |
|  46 | [The Race Between Machine and Man: Implications of Technology for Growth, Factor Shares and Employment](#acemoglu-restrepo-2016-race-between-machine-and-man)  | 2016 |                        6 |
|  47 | [Think you have Solved Question Answering? Try ARC, the AI2 Reasoning Challenge](#kp-think-you-have-solved-question-2018)                                      | 2018 |                        6 |
|  48 | [TriviaQA: A Large Scale Distantly Supervised Challenge Dataset for Reading Comprehension](#kp-triviaqa-large-scale-distantly-supervised-2017)                 | 2017 |                        6 |
|  49 | [BoolQ: Exploring the Surprising Difficulty of Natural Yes/No Questions](#kp-boolq-exploring-surprising-difficulty-natural-2019)                               | 2019 |                        5 |
|  50 | [C-Eval: A Multi-Level Multi-Discipline Chinese Evaluation Suite for Foundation Models](#kp-c-eval-multi-level-multi-2023)                                     | 2023 |                        5 |
|  51 | [Chain-of-Thought Prompting Elicits Reasoning in Large Language Models](#kp-chain-thought-prompting-elicits-reasoning-2022)                                    | 2022 |                        5 |
|  52 | [CMMLU: Measuring massive multitask language understanding in Chinese](#kp-cmmlu-measuring-massive-multitask-language-2023)                                    | 2023 |                        5 |
|  53 | [Decoupled Weight Decay Regularization](#kp-decoupled-weight-decay-regularization-2017)                                                                        | 2017 |                        5 |
|  54 | [Deep Residual Learning for Image Recognition](#kp-deep-residual-learning-image-recognition-2015)                                                              | 2015 |                        5 |
|  55 | [Economic Growth Given Machine Intelligence](#hanson-economic-growth-given-machine-intelligence)                                                               | 2000 |                        5 |
|  56 | [Ethical and social risks of harm from Language Models](#kp-ethical-social-risks-harm-from-2021)                                                               | 2021 |                        5 |
|  57 | [GPipe: Efficient Training of Giant Neural Networks using Pipeline Parallelism](#kp-gpipe-efficient-training-giant-neural-2018)                                | 2018 |                        5 |
|  58 | [GPQA: A Graduate-Level Google-Proof Q&amp;A Benchmark](#kp-gpqa-graduate-level-google-proof-2023)                                                             | 2023 |                        5 |
|  59 | [GShard: Scaling Giant Models with Conditional Computation and Automatic Sharding](#kp-gshard-scaling-giant-models-conditional-2020)                           | 2020 |                        5 |
|  60 | [Guided Cost Learning: Deep Inverse Optimal Control via Policy Optimization](#kp-guided-cost-learning-deep-inverse-2016)                                       | 2016 |                        5 |
|  61 | [Human-level control through deep reinforcement learning](#kp-human-level-control-through-deep-2015)                                                           | 2015 |                        5 |
|  62 | [Humanity's Last Exam](#kp-humanity-s-last-exam-2025)                                                                                                          | 2025 |                        5 |
|  63 | [Instruction-Following Evaluation for Large Language Models](#kp-instruction-following-evaluation-large-language-2023)                                         | 2023 |                        5 |
|  64 | [LaMDA: Language Models for Dialog Applications](#kp-lamda-language-models-dialog-applications-2022)                                                           | 2022 |                        5 |
|  65 | [LLaMA: Open and Efficient Foundation Language Models](#kp-llama-open-efficient-foundation-language-2023)                                                      | 2023 |                        5 |
|  66 | [Mastering the game of Go with deep neural networks and tree search](#kp-mastering-game-go-deep-neural-2016)                                                   | 2016 |                        5 |
|  67 | [MathVista: Evaluating Mathematical Reasoning of Foundation Models in Visual Contexts](#kp-mathvista-evaluating-mathematical-reasoning-foundation-2023)        | 2023 |                        5 |
|  68 | [PaLM: Scaling Language Modeling with Pathways](#kp-palm-scaling-language-modeling-pathways-2022)                                                              | 2022 |                        5 |
|  69 | [PIQA: Reasoning about Physical Commonsense in Natural Language](#kp-piqa-reasoning-about-physical-commonsense-2019)                                           | 2019 |                        5 |
|  70 | [RACE: Large-scale ReAding Comprehension Dataset From Examinations](#kp-race-large-scale-reading-comprehension-2017)                                           | 2017 |                        5 |
|  71 | [RoBERTa: A Robustly Optimized BERT Pretraining Approach](#kp-roberta-robustly-optimized-bert-pretraining-2019)                                                | 2019 |                        5 |
|  72 | [RoFormer: Enhanced Transformer with Rotary Position Embedding](#kp-roformer-enhanced-transformer-rotary-position-2021)                                        | 2021 |                        5 |
|  73 | [Scalable agent alignment via reward modeling: a research direction](#reward-modeling-paper)                                                                   | 2018 |                        5 |
|  74 | [Scaling Language Models: Methods, Analysis &amp; Insights from Training Gopher](#kp-scaling-language-models-methods-analysis-2021)                            | 2021 |                        5 |
|  75 | [Self-Consistency Improves Chain of Thought Reasoning in Language Models](#kp-self-consistency-improves-chain-thought-2022)                                    | 2022 |                        5 |
|  76 | [Speculations Concerning the First Ultraintelligent Machine](#good-1965)                                                                                       | 1965 |                        5 |
|  77 | [Supervising strong learners by amplifying weak experts](#amplification-paper)                                                                                 | 2018 |                        5 |
|  78 | [The Alignment Problem from a Deep Learning Perspective](#kp-alignment-problem-from-deep-learning-2022)                                                        | 2022 |                        5 |
|  79 | [The Future of Employment: How Susceptible Are Jobs to Computerisation?](#frey-osborne-2013-future-of-employment)                                              | 2013 |                        5 |
|  80 | [The Race between Man and Machine: Implications of Technology for Growth, Factor Shares, and Employment](#acemoglu-restrepo-2018-race-between-man-and-machine) | 2018 |                        5 |
|  81 | [TruthfulQA: Measuring How Models Mimic Human Falsehoods](#kp-truthfulqa-measuring-how-models-mimic-2021)                                                      | 2021 |                        5 |
|  82 | [WinoGrande: An Adversarial Winograd Schema Challenge at Scale](#kp-adversarial-winograd-schema-challenge-at-2019)                                             | 2019 |                        5 |

## Basis 2: a stated citation count

| Index rank | Paper                                                                                                                                                                | Year | Semantic Scholar citations | Citing dataset documents |
| ---------: | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- | -------------------------: | -----------------------: |
|          4 | [Random Forests](#kp-random-forests-2001)                                                                                                                            | 2001 |                    127,570 |                        0 |
|          7 | [Faster R-CNN: Towards Real-Time Object Detection with Region Proposal Networks](#kp-faster-r-cnn-towards-real-2015)                                                 | 2015 |                     76,824 |                        1 |
|          9 | [XGBoost: A Scalable Tree Boosting System](#kp-xgboost-scalable-tree-boosting-system-2016)                                                                           | 2016 |                     64,954 |                        0 |
|         10 | [Gradient-based learning applied to document recognition](#kp-gradient-based-learning-applied-document-1998)                                                         | 1998 |                     63,607 |                        1 |
|         12 | [You Only Look Once: Unified, Real-Time Object Detection](#kp-you-only-look-once-unified-2015)                                                                       | 2015 |                     49,196 |                        0 |
|         13 | [Going deeper with convolutions](#kp-going-deeper-convolutions-2014)                                                                                                 | 2014 |                     48,393 |                        1 |
|         14 | [Batch Normalization: Accelerating Deep Network Training by Reducing Internal Covariate Shift](#kp-batch-normalization-accelerating-deep-network-2015)               | 2015 |                     48,185 |                        1 |
|         17 | [Dropout: a simple way to prevent neural networks from overfitting](#kp-dropout-simple-way-prevent-neural-2014)                                                      | 2014 |                     44,812 |                        3 |
|         18 | [A Unified Approach to Interpreting Model Predictions](#kp-unified-approach-interpreting-model-predictions-2017)                                                     | 2017 |                     44,356 |                        0 |
|         22 | [Semi-Supervised Classification with Graph Convolutional Networks](#kp-semi-supervised-classification-graph-convolutional-2016)                                      | 2016 |                     38,073 |                        0 |
|         23 | [Squeeze-and-Excitation Networks](#kp-squeeze-excitation-networks-2017)                                                                                              | 2017 |                     37,490 |                        0 |
|         25 | [SSD: Single Shot MultiBox Detector](#kp-ssd-single-shot-multibox-detector-2015)                                                                                     | 2015 |                     36,588 |                        0 |
|         26 | [Efficient Estimation of Word Representations in Vector Space](#kp-efficient-estimation-word-representations-vector-2013)                                            | 2013 |                     35,395 |                        2 |
|         30 | [Grad-CAM: Visual Explanations from Deep Networks via Gradient-Based Localization](#kp-grad-cam-visual-explanations-from-2016)                                       | 2016 |                     30,631 |                        0 |
|         31 | [Neural Machine Translation by Jointly Learning to Align and Translate](#kp-neural-machine-translation-by-jointly-2014)                                              | 2014 |                     30,288 |                        2 |
|         33 | [Rich Feature Hierarchies for Accurate Object Detection and Semantic Segmentation](#kp-rich-feature-hierarchies-accurate-object-2013)                                | 2013 |                     29,715 |                        0 |
|         34 | [Graph Attention Networks](#kp-graph-attention-networks-2017)                                                                                                        | 2017 |                     29,243 |                        0 |
|         35 | [Communication-Efficient Learning of Deep Networks from Decentralized Data](#kp-communication-efficient-learning-deep-networks-2016)                                 | 2016 |                     28,206 |                        0 |
|         36 | [Learning Phrase Representations using RNN Encoder–Decoder for Statistical Machine Translation](#kp-learning-phrase-representations-using-rnn-2014)                  | 2014 |                     28,132 |                        1 |
|         37 | [Distilling the Knowledge in a Neural Network](#kp-distilling-knowledge-neural-network-2015)                                                                         | 2015 |                     27,137 |                        1 |
|         38 | [EfficientNet: Rethinking Model Scaling for Convolutional Neural Networks](#kp-efficientnet-rethinking-model-scaling-convolutional-2019)                             | 2019 |                     27,104 |                        1 |
|         39 | [CBAM: Convolutional Block Attention Module](#kp-cbam-convolutional-block-attention-module-2018)                                                                     | 2018 |                     26,721 |                        0 |
|         40 | [MobileNets: Efficient Convolutional Neural Networks for Mobile Vision Applications](#kp-mobilenets-efficient-convolutional-neural-networks-2017)                    | 2017 |                     26,492 |                        0 |
|         42 | [“Why Should I Trust You?”: Explaining the Predictions of Any Classifier](#kp-why-should-i-trust-you-2016)                                                           | 2016 |                     25,114 |                        2 |
|         43 | [LoRA: Low-Rank Adaptation of Large Language Models](#kp-lora-low-rank-adaptation-large-2021)                                                                        | 2021 |                     24,949 |                        2 |
|         45 | [Explaining and Harnessing Adversarial Examples](#kp-explaining-harnessing-adversarial-examples-2014)                                                                | 2014 |                     23,499 |                        3 |
|         48 | [Sequence to Sequence Learning with Neural Networks](#kp-sequence-sequence-learning-neural-networks-2014)                                                            | 2014 |                     22,572 |                        1 |
|         51 | [DeepLab: Semantic Image Segmentation with Deep Convolutional Nets, Atrous Convolution, and Fully Connected CRFs](#kp-deeplab-semantic-image-segmentation-deep-2016) | 2016 |                     21,861 |                        0 |
|         53 | [Delving Deep into Rectifiers: Surpassing Human-Level Performance on ImageNet Classification](#kp-delving-deep-into-rectifiers-surpassing-2015)                      | 2015 |                     21,178 |                        0 |
|         54 | [The Unreasonable Effectiveness of Deep Features as a Perceptual Metric](#kp-unreasonable-effectiveness-deep-features-as-2018)                                       | 2018 |                     21,014 |                        0 |

## Papers by year

### 1965

<a id="good-1965"></a>

#### Speculations Concerning the First Ultraintelligent Machine

- ID `good-1965` (existing dataset document); subtype Research paper.
- Basis 1: cited by 5 dataset documents.
- Identifiers: doi 10.1016/s0065-2458(08)60418-0.
- Authors as printed (corpus:source-good, first page): not read. Not found on the first page (index names): I. J. Good.

| Version                                                                                                                                                                                       | Kind                       | Date | Precision | Basis                                                                                         |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | ---- | --------- | --------------------------------------------------------------------------------------------- |
| Speculations Concerning the First Ultraintelligent Machine (Scanned reprint, Advances in Computers volume 6, pp. 31–88. Repository metadata identifies ©1965; the mirror filename says 1966.) | as recorded in the dataset | 1965 | year      | dataset source source-good                                                                    |
| Advances in Computers, pp. 31-88                                                                                                                                                              | book chapter               | 1966 | year      | Crossref published-print date (year kept; publisher-deposited, not checked against the issue) |

States:

- Good states that the text attempts to take more of the magic out of the brain by means of a “subassembly” theory, which he describes as a modification of Hebb’s cell-assembly theory. “I n the following pages an attempt is made to take more of the magic out of the brain by means of a “subassembly” theory, which is a modification of Hebb’s famous speculative cell-assembly theory.” (PDF p. 1, §1 Introduction, para. 1)

Attributed-credit records (the citing document’s own attribution):

- [attributes a term or concept] Yudkowsky attributes the term “intelligence explosion”, for an AI making a large jump in intelligence after a threshold, to Good (1965). “One often encounters skepticism about this scenario—what Good (1965) called an “intelligence explosion”—because progress in Artificial Intelligence has the reputation of being very slow.” (Artificial Intelligence as a Positive and Negative Factor in Global Risk, PDF p. 19, §8 Rates of Intelligence Increase; wording attested by an undated later copy: Wording read in the MIRI reprint, which states that it contains minor changes; the reprint is undated in the source read, so the wording is not attested for 2008 by this copy.)
- [attributes a term or concept] Nordhaus (2015) attributes the idea that superintelligent computers would be the last invention humans need make to Good (1965), which it then quotes. “Superintelligent computers are the last invention humans would make, as described by the mathematician Irving Good (1965) as follows:” (Are We Approaching an Economic Singularity? Information Technology and the Future of Economic Growth, PDF p. 8, §II Artificial Intelligence and the Singularity)

Cited by: Intelligence Explosion Microeconomics (PDF p. 4, reference or mention by title); The Singularity: A Philosophical Analysis (PDF p. 1, reference or mention by title); Artificial Intelligence as a Positive and Negative Factor in Global Risk (PDF p. 45, reference or mention by title); Are We Approaching an Economic Singularity? Information Technology and the Future of Economic Growth (PDF p. 47, reference or mention by title); Self-Regulating Artificial General Intelligence (PDF p. 16, reference or mention by title).

### 1998

<a id="kp-gradient-based-learning-applied-document-1998"></a>

#### Gradient-based learning applied to document recognition

- ID `kp-gradient-based-learning-applied-document-1998` (proposed); subtype Research paper (work).
- Basis 2: 63,607 citations in Semantic Scholar (rank 10, 2026-10-28); cited by 1 dataset documents.
- Identifiers: doi 10.1109/5.726791.
- Authors as printed (paper:kp-gradient-based-learning-applied-document-1998--text, first page): not read. Not found on the first page (index names): Yann LeCun, L. Bottou, Yoshua Bengio, P. Haffner.

| Version                                                 | Kind                | Date | Precision | Basis                                                                                         |
| ------------------------------------------------------- | ------------------- | ---- | --------- | --------------------------------------------------------------------------------------------- |
| Proceedings of the IEEE, vol. 86, no. 11, pp. 2278-2324 | journal publication | 1998 | year      | Crossref published-print date (year kept; publisher-deposited, not checked against the issue) |

No “states” record: The cached PDF text (pp. 1-4 checked) has no usable text layer: the font encoding extracts as unreadable characters, so no abstract or introduction can be quoted.

Cited by: Batch Normalization (2015 paper) (reference or mention by title).

### 2000

<a id="kp-algorithms-inverse-reinforcement-learning-2000"></a>

#### Algorithms for Inverse Reinforcement Learning

- ID `kp-algorithms-inverse-reinforcement-learning-2000` (proposed); subtype Research paper (work).
- Basis 1: cited by 6 dataset documents.
- Identifiers: none.
- Authors as printed: not read. Not found on the first page (index names): Andrew Y. Ng, Stuart J. Russell.
- Preparer's note: The index DOI (10.2460/ajvr.67.2.323) belongs to an article in the American Journal of Veterinary Research, not this paper.

No dated version was recorded.

No “states” record: No text retrieved: `papers.mjs text` prints `missing` for this paper.

Cited by: Deep reinforcement learning from human preferences (PDF p. 12, reference or mention by title); Supervising strong learners by amplifying weak experts (PDF p. 9, reference or mention by title); Scalable agent alignment via reward modeling: a research direction (PDF p. 28, reference or mention by title); Self-critiquing models for assisting human evaluators (PDF p. 22, reference or mention by title); Concrete Problems in AI Safety (PDF p. 26, reference or mention by title); Alignment for Advanced Machine Learning Systems (PDF p. 23, reference or mention by title).

<a id="hanson-economic-growth-given-machine-intelligence"></a>

#### Economic Growth Given Machine Intelligence

- ID `hanson-economic-growth-given-machine-intelligence` (existing dataset document); subtype Working paper.
- Basis 1: cited by 5 dataset documents.
- Identifiers: none.
- Authors as printed (corpus:source-hanson-economic-growth-given-machine-intelligence, first page): “Robin Hanson”.

No dated version was recorded.

States:

- The paper examines the economic consequences of machine intelligence by constructing, from standard economic theory, a series of formal models of economies in which machines can both complement and substitute for human labour. “This paper examines the economic consequences of machine intelligence by using standard economic theory to construct a series of simple but increasingly more realistic formal models of economies where machines can both complement and substitute for human labor.” (PDF p. 2, §1 Introduction, para. 5)

Cited by: Intelligence Explosion Microeconomics (PDF p. 4, reference or mention by title); Arms Control and Intelligence Explosions (PDF p. 6, reference or mention by title); Long-Term Growth As A Sequence of Exponential Modes (PDF p. 20, reference or mention by title); Economic Growth under Transformative AI: A guide to the vast range of possibilities for output growth, wages, and the labor share (PDF p. 69, reference or mention by title); The Future of Employment: How Susceptible Are Jobs to Computerisation? (PDF p. 51, reference or mention by title).

### 2001

<a id="kp-random-forests-2001"></a>

#### Random Forests

- ID `kp-random-forests-2001` (proposed); subtype Research paper (work).
- Basis 2: 127,570 citations in Semantic Scholar (rank 4, 2026-10-28); cited by 0 dataset documents.
- Identifiers: doi 10.1023/a:1010933404324.
- Authors as printed: not read. Not found on the first page (index names): T. Hastie, Robert Tibshirani, Jerome H. Friedman.
- Preparer's note: Publisher page; quotations come from the abstract on that page.

| Version                                    | Kind                | Date | Precision | Basis                                                                                         |
| ------------------------------------------ | ------------------- | ---- | --------- | --------------------------------------------------------------------------------------------- |
| Machine Learning, vol. 45, no. 1, pp. 5-32 | journal publication | 2001 | year      | Crossref published-print date (year kept; publisher-deposited, not checked against the issue) |

No “states” record: No text retrieved: `papers.mjs text kp-random-forests-2001` prints `missing`.

### 2006

<a id="ai-positive-negative-factor-global-risk"></a>

#### Artificial Intelligence as a Positive and Negative Factor in Global Risk

- ID `ai-positive-negative-factor-global-risk` (existing dataset document); subtype Book chapter.
- Basis 1: cited by 10 dataset documents.
- Identifiers: doi 10.1093/oso/9780198570509.003.0021.
- Authors as printed (corpus:source-aipnfgr-miri-reprint, first page): “Eliezer Yudkowsky”.

| Version                                                                                                                                                                                                  | Kind                       | Date       | Precision | Basis                                                                                         |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | ---------- | --------- | --------------------------------------------------------------------------------------------- |
| Artificial Intelligence and Global Risk (SIAI draft of 5 February 2006) (Draft PDF as captured by the Internet Archive on 2006-07-08, retrieved 2026-10-06. The draft asks not to be quoted without perm | as recorded in the dataset | 2006-02-05 | day       | dataset source source-aipnfgr-2006-draft                                                      |
| Global Catastrophic Risks                                                                                                                                                                                | book chapter               | 2008       | year      | Crossref published-print date (year kept; publisher-deposited, not checked against the issue) |
| Artificial Intelligence as a Positive and Negative Factor in Global Risk (MIRI reprint) (MIRI reprint, "This version contains minor changes", retrieved 2026-10-06 with the hash recorded by the 1996–20 | as recorded in the dataset | 2008       | year      | dataset source source-aipnfgr-miri-reprint                                                    |

States:

- In the MIRI reprint of the 2008 chapter, the author states that he has analysed the global catastrophic risks of artificial intelligence from his own perspective and set out and supported his own conclusions. “I have perforce analyzed the matter from my own perspective; given my own conclusions and done my best to support them in limited space.” (MIRI reprint, PDF p. 2, §1 Introduction, para. 3)

Attributed-credit records (the citing document’s own attribution):

- [attributes and disputes] Hibbard (2006) attributes to Yudkowsky's draft chapter the criticism that Hibbard's 2001 article is an example of technical failure for using reinforcement learning, and disputes that criticism. (Paraphrase: Hibbard writes that the chapter cites his 2001 article as an example of technical failure because it uses reinforcement learning as the framework for describing AI.) (Reply to AIRisk, page text, opening paragraph)

Cited by: Intelligence Explosion Microeconomics (PDF p. 95, reference or mention by title); The Singularity: A Philosophical Analysis (PDF p. 56, reference or mention by title); Concrete Problems in AI Safety (reference or mention by title); Alignment for Advanced Machine Learning Systems (PDF p. 25, reference or mention by title); Reply to AIRisk (reference or mention by title); Arms Control and Intelligence Explosions (PDF p. 6, reference or mention by title); Corrigibility (PDF p. 10, reference or mention by title); Debunking Fallacies in the Theory of AI Motivation (reference or mention by title); The A.I. Dilemma: Growth versus Existential Risk (PDF p. 23, reference or mention by title); How Much Should We Spend to Reduce A.I.'s Existential Risk? (PDF p. 23, reference or mention by title).

### 2008

<a id="kp-basic-ai-drives-2008"></a>

#### The Basic AI Drives

- ID `kp-basic-ai-drives-2008` (proposed); subtype Research paper (work).
- Basis 1: cited by 8 dataset documents.
- Identifiers: none.
- Authors as printed (paper:kp-basic-ai-drives-2008--text, first page): not read. Not found on the first page (index names): S. Omohundro.
- Preparer's note: The index DOI (10.1201/9781351251389-3) is a 2018 reprint in an edited volume; the paper read is the 2008 proceedings text as posted by its author.

No dated version was recorded.

States:

- The paper states that it identifies a number of “drives” that, it argues, will appear in sufficiently advanced AI systems of any design. “We identify a number of “drives” that will appear in sufficiently advanced AI systems of any design.” (PDF p. 1, abstract)

Attributed-credit records (the citing document’s own attribution):

- [attributes a term or concept] Soares, Fallenstein and Yudkowsky (2015) attribute the term “goal-content integrity”, as an instrumentally convergent goal of intelligent agents, to Omohundro (2008). “In Stephen Omohundro’s terms, “goal-content integrity” is an instrumentally convergent goal of almost all intelligent agents (Omohundro 2008).” (Corrigibility, PDF p. 1, §Introduction, para. 3)
- [attributes a term or concept] Korinek and Stiglitz (2017) attribute the concept of “basic drives”, intermediate objectives instrumental for any final objective, to Omohundro (2008) and use it to set up their scenario of AI agents competing with humans for resources. “it will act by pursuing intermediate objectives or “basic drives” that are instrumental for any final objective (Omohundro, 2008)” (Artificial Intelligence and Its Implications for Income Distribution and Unemployment, PDF p. 36, section “Artificially Intelligent Agents and the Return of Malthus”, para. 1)
- [attributes and disputes] Loosemore (2015) attributes to Omohundro's The Basic AI Drives (2008) the argument that an AGI will feel compelled to pursue its objectives more efficiently, and disputes that argument. “In The Basic AI Drives (2008) Omohundro suggests that if an AGI can find a more efficient way to pursue its objectives it will feel compelled to do so.” (Debunking Fallacies in the Theory of AI Motivation, page text, section “Omohundro’s Basic AI Drives”, para. 1)

Cited by: Intelligence Explosion Microeconomics (PDF p. 94, reference or mention by title); The Singularity: A Philosophical Analysis (PDF p. 55, reference or mention by title); Scalable agent alignment via reward modeling: a research direction (PDF p. 28, reference or mention by title); Alignment for Advanced Machine Learning Systems (PDF p. 23, reference or mention by title); GPT-4 System Card (PDF p. 36, reference or mention by title); Corrigibility (PDF p. 10, reference or mention by title); Debunking Fallacies in the Theory of AI Motivation (reference or mention by title); Artificial Intelligence and Its Implications for Income Distribution and Unemployment (PDF p. 44, reference or mention by title).

### 2012

<a id="kp-imagenet-classification-deep-convolutional-neural-2012"></a>

#### ImageNet classification with deep convolutional neural networks

- ID `kp-imagenet-classification-deep-convolutional-neural-2012` (proposed); subtype Research paper (work).
- Basis 1: cited by 6 dataset documents.
- Identifiers: none.
- Authors as printed (paper:kp-imagenet-classification-deep-convolutional-neural-2012--text, first page): “Alex Krizhevsky”, “Ilya Sutskever”, “Geoffrey E. Hinton”.
- Preparer's note: The index DOI (10.1145/3065386) is the 2017 Communications of the ACM reprint; the paper read is the NIPS 2012 proceedings text.

| Version                                                          | Kind                   | Date | Precision | Basis                                                                    |
| ---------------------------------------------------------------- | ---------------------- | ---- | --------- | ------------------------------------------------------------------------ |
| Advances in Neural Information Processing Systems 25 (NIPS 2012) | conference publication | 2012 | year      | NeurIPS proceedings page (retrieved; also read by the same-family audit) |

States:

- The authors state that they trained a large, deep convolutional neural network to classify the 1.2 million images of the ImageNet LSVRC-2010 contest into 1000 classes. “We trained a large, deep convolutional neural network to classify the 1.2 million high-resolution images in the ImageNet LSVRC-2010 contest into the 1000 different classes.” (PDF p. 1, abstract)

Cited by: Scaling Laws for Neural Language Models (PDF p. 29, reference or mention by title); Adam: A Method for Stochastic Optimization (PDF p. 9, reference or mention by title); Scalable agent alignment via reward modeling: a research direction (PDF p. 26, reference or mention by title); Weak-to-Strong Generalization: Eliciting Strong Capabilities With Weak Supervision (PDF p. 23, reference or mention by title); Concrete Problems in AI Safety (reference or mention by title); Alignment for Advanced Machine Learning Systems (PDF p. 23, reference or mention by title).

Authorship records: `alex-krizhevsky` (proposed), `ilya-sutskever`.

### 2013

<a id="kp-efficient-estimation-word-representations-vector-2013"></a>

#### Efficient Estimation of Word Representations in Vector Space

- ID `kp-efficient-estimation-word-representations-vector-2013` (proposed); subtype Research paper (work).
- Basis 2: 35,395 citations in Semantic Scholar (rank 26, 2026-10-28); cited by 2 dataset documents.
- Identifiers: arxiv 1301.3781.
- Authors as printed (paper:kp-efficient-estimation-word-representations-vector-2013--v1, first page): “Tomas Mikolov”, “Kai Chen”, “Greg Corrado”, “Jeffrey Dean”.

| Version           | Kind             | Date       | Precision | Basis                          |
| ----------------- | ---------------- | ---------- | --------- | ------------------------------ |
| arXiv:1301.3781v1 | arXiv submission | 2013-01-16 | day       | arXiv submission history (UTC) |
| arXiv:1301.3781v2 | arXiv submission | 2013-03-07 | day       | arXiv submission history (UTC) |
| arXiv:1301.3781v3 | arXiv submission | 2013-09-07 | day       | arXiv submission history (UTC) |

States:

- The paper proposes two model architectures, which it describes as novel, for computing continuous vector representations of words from very large data sets. “We propose two novel model architectures for computing continuous vector representations of words from very large data sets.” (arXiv v1, PDF p. 1, abstract)

Cited by: ERNIE 2.0: A Continual Pre-training Framework for Language Understanding (PDF p. 10, reference by arXiv identifier); ERNIE: Enhanced Representation through Knowledge Integration (PDF p. 7, reference by arXiv identifier).

Authorship records: `greg-corrado`.

<a id="kp-rich-feature-hierarchies-accurate-object-2013"></a>

#### Rich Feature Hierarchies for Accurate Object Detection and Semantic Segmentation

- ID `kp-rich-feature-hierarchies-accurate-object-2013` (proposed); subtype Research paper (work).
- Basis 2: 29,715 citations in Semantic Scholar (rank 33, 2026-10-28); cited by 0 dataset documents.
- Identifiers: arxiv 1311.2524; doi 10.1109/cvpr.2014.81.
- Authors as printed (paper:kp-rich-feature-hierarchies-accurate-object-2013--v1, first page): “Ross Girshick”, “Jeff Donahue”, “Trevor Darrell”, “Jitendra Malik”.
- arXiv comments (author-supplied): “Extended version of our CVPR 2014 paper; latest update (v5) includes results using deeper networks (see Appendix G. Changelog)”

| Version                                                                      | Kind                   | Date       | Precision | Basis                                                                                         |
| ---------------------------------------------------------------------------- | ---------------------- | ---------- | --------- | --------------------------------------------------------------------------------------------- |
| arXiv:1311.2524v1                                                            | arXiv submission       | 2013-11-11 | day       | arXiv submission history (UTC)                                                                |
| 2014 IEEE Conference on Computer Vision and Pattern Recognition, pp. 580-587 | conference publication | 2014       | year      | Crossref published-print date (year kept; publisher-deposited, not checked against the issue) |
| arXiv:1311.2524v2                                                            | arXiv submission       | 2014-04-15 | day       | arXiv submission history (UTC)                                                                |
| arXiv:1311.2524v3                                                            | arXiv submission       | 2014-05-07 | day       | arXiv submission history (UTC)                                                                |
| arXiv:1311.2524v4                                                            | arXiv submission       | 2014-06-09 | day       | arXiv submission history (UTC)                                                                |
| arXiv:1311.2524v5                                                            | arXiv submission       | 2014-10-22 | day       | arXiv submission history (UTC)                                                                |

States:

- The paper presents R-CNN, an object detection system combining bottom-up region proposals with convolutional neural network features. “We call the resulting system R-CNN: Regions with CNN features.” (arXiv v1, PDF p. 1, abstract)
- The paper reports that a convolutional network trained for ImageNet classification can be adapted to detect objects in PASCAL, with a mean average precision of 48% on VOC 2007. “We show that the answer is yes, and that the resulting system is simple, scalable, and boosts mean average precision, relative to the venerable deformable part model, by more than 40% (achieving a final mAP of 48% on VOC 2007).” (arXiv v1, PDF p. 1, abstract)

Authorship records: `ross-girshick` (proposed).

<a id="frey-osborne-2013-future-of-employment"></a>

#### The Future of Employment: How Susceptible Are Jobs to Computerisation?

- ID `frey-osborne-2013-future-of-employment` (existing dataset document); subtype Working paper.
- Basis 1: cited by 5 dataset documents.
- Identifiers: doi 10.1016/j.techfore.2016.08.019.
- Authors as printed (corpus:source-frey-osborne-2013-future-of-employment, first page): “Carl Benedikt Frey”, “Michael A. Osborne”.

| Version                                                                                                                                                                                                 | Kind                       | Date       | Precision | Basis                                                                                         |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | ---------- | --------- | --------------------------------------------------------------------------------------------- |
| The Future of Employment: How Susceptible Are Jobs to Computerisation? (Full text (current file served by the Oxford Martin School; requested at oxfordmartin.ox.ac.uk, which redirected to this host). | as recorded in the dataset | 2013-09-17 | day       | dataset source source-frey-osborne-2013-future-of-employment                                  |
| Technological Forecasting and Social Change, vol. 114, pp. 254-280                                                                                                                                      | journal publication        | 2017       | year      | Crossref published-print date (year kept; publisher-deposited, not checked against the issue) |

States:

- The authors state that the paper examines how susceptible jobs are to computerisation. “We examine how susceptible jobs are to computerisation.” (working paper dated 17 September 2013, PDF p. 1, abstract)
- The paper describes its methodology, which estimates the probability of computerisation for 702 detailed occupations using a Gaussian process classifier, as novel. “To assess this, we begin by implementing a novel methodology to estimate the probability of computerisation for 702 detailed occupations, using a Gaussian process classifier.” (working paper dated 17 September 2013, PDF p. 1, abstract)

Attributed-credit records (the citing document’s own attribution):

- [summarises an argument or finding] Korinek and Stiglitz (2017) attribute to Frey and Osborne (2017) the warning that 47% of US jobs are at risk of automation by advances in AI-related fields. “For example, Frey and Osborne (2017) warn that 47% of jobs in the US economy are at risk of being automated by advances in AI‐related fields.” (Artificial Intelligence and Its Implications for Income Distribution and Unemployment, PDF p. 3, footnote 2)
- [summarises an argument or finding] Furman and Seamans (2018) attribute to Frey and Osborne (2017) an expert-based method for classifying susceptibility to automation and the resulting 47 percent estimate, in discussing which workers are likely to be affected. “Frey and Osborne (2017) use a panel of experts to categorize tasks by their susceptibility to automation, link these tasks to occupation, employment and wage data, and find that 47 percent” (AI and the Economy, PDF p. 15, §2.3 AI and Labor)

Cited by: Concrete Problems in AI Safety (PDF p. 24, reference or mention by title); Robots Are Us: Some Economics of Human Replacement (PDF p. 31, reference or mention by title); Artificial Intelligence and Its Implications for Income Distribution and Unemployment (PDF p. 42, reference or mention by title); AI and the Economy (PDF p. 31, reference or mention by title); GPTs are GPTs: An Early Look at the Labor Market Impact Potential of Large Language Models (PDF p. 33, reference or mention by title).

### 2014

<a id="adam-paper"></a>

#### Adam: A Method for Stochastic Optimization

- ID `adam-paper` (existing dataset document); subtype Research paper (work).
- Basis 1: cited by 11 dataset documents.
- Identifiers: arxiv 1412.6980.
- Authors as printed (paper:adam-paper--v1, first page): “Diederik P. Kingma”, “Jimmy Lei Ba”.
- arXiv comments (author-supplied): “Published as a conference paper at the 3rd International Conference for Learning Representations, San Diego, 2015”

| Version           | Kind             | Date       | Precision | Basis                          |
| ----------------- | ---------------- | ---------- | --------- | ------------------------------ |
| arXiv:1412.6980v1 | arXiv submission | 2014-12-22 | day       | arXiv submission history (UTC) |
| arXiv:1412.6980v2 | arXiv submission | 2015-01-17 | day       | arXiv submission history (UTC) |
| arXiv:1412.6980v3 | arXiv submission | 2015-02-27 | day       | arXiv submission history (UTC) |
| arXiv:1412.6980v4 | arXiv submission | 2015-03-03 | day       | arXiv submission history (UTC) |
| arXiv:1412.6980v5 | arXiv submission | 2015-04-23 | day       | arXiv submission history (UTC) |
| arXiv:1412.6980v6 | arXiv submission | 2015-06-23 | day       | arXiv submission history (UTC) |
| arXiv:1412.6980v7 | arXiv submission | 2015-07-20 | day       | arXiv submission history (UTC) |
| arXiv:1412.6980v8 | arXiv submission | 2015-07-23 | day       | arXiv submission history (UTC) |
| arXiv:1412.6980v9 | arXiv submission | 2017-01-30 | day       | arXiv submission history (UTC) |

States:

- The paper introduces Adam, described as an algorithm for first-order gradient-based optimization of stochastic objective functions. “We introduce Adam, an algorithm for first-order gradient-based optimization of stochastic objective functions.” (arXiv v1, PDF p. 1, abstract)

Cited by: Scaling Laws for Neural Language Models (PDF p. 29, reference or mention by title); An Empirical Model of Large-Batch Training (PDF p. 33, reference or mention by title); Training Compute-Optimal Large Language Models (PDF p. 18, reference by arXiv identifier); Proximal Policy Optimization Algorithms (PDF p. 9, reference by arXiv identifier); Learning to summarize from human feedback (PDF p. 12, reference by arXiv identifier); Weak-to-Strong Generalization: Eliciting Strong Capabilities With Weak Supervision (PDF p. 22, reference by arXiv identifier); Qwen Technical Report (reference by arXiv identifier); ERNIE 3.0: Large-scale Knowledge Enhanced Pre-training for Language Understanding and Generation (PDF p. 19, reference by arXiv identifier); ERNIE 3.0 Titan: Exploring Larger-scale Knowledge Enhanced Pre-training for Language Understanding and Generation (PDF p. 25, reference by arXiv identifier); Kimi K2: Open Agentic Intelligence (PDF p. 22, reference by arXiv identifier); Seed1.5-VL Technical Report (PDF p. 36, reference by arXiv identifier).

<a id="kp-dropout-simple-way-prevent-neural-2014"></a>

#### Dropout: a simple way to prevent neural networks from overfitting

- ID `kp-dropout-simple-way-prevent-neural-2014` (proposed); subtype Research paper (work).
- Basis 2: 44,812 citations in Semantic Scholar (rank 17, 2026-10-28); cited by 3 dataset documents.
- Identifiers: none.
- Authors as printed (paper:kp-dropout-simple-way-prevent-neural-2014--text, first page): “Nitish Srivastava”, “Geoffrey Hinton”, “Alex Krizhevsky”, “Ilya Sutskever”, “Ruslan Salakhutdinov”.
- Preparer's note: The index DOI (10.5555/…) is an ACM Digital Library record; the paper read is the JMLR text.

No dated version was recorded.

States:

- The paper presents dropout, a technique against overfitting that randomly drops units and their connections from a neural network during training. “The key idea is to randomly drop units (along with their connections) from the neural network during training.” (PDF p. 1, abstract)
- The authors report that dropout improved neural network performance on supervised tasks in vision, speech recognition, document classification and computational biology. “We show that dropout improves the performance of neural networks on supervised learning tasks in vision, speech recognition, document classification and computational biology, obtaining state-of-the-art results on many benchmark data sets.” (PDF p. 1, abstract)

Cited by: Weak-to-Strong Generalization: Eliciting Strong Capabilities With Weak Supervision (PDF p. 26, reference or mention by title); Batch Normalization (2015 paper) (reference or mention by title); ERNIE 3.0: Large-scale Knowledge Enhanced Pre-training for Language Understanding and Generation (PDF p. 19, reference or mention by title).

Authorship records: `geoffrey-hinton` (proposed), `alex-krizhevsky` (proposed), `ilya-sutskever`.

<a id="kp-explaining-harnessing-adversarial-examples-2014"></a>

#### Explaining and Harnessing Adversarial Examples

- ID `kp-explaining-harnessing-adversarial-examples-2014` (proposed); subtype Research paper (work).
- Basis 2: 23,499 citations in Semantic Scholar (rank 45, 2026-10-28); cited by 3 dataset documents.
- Identifiers: arxiv 1412.6572.
- Authors as printed (paper:kp-explaining-harnessing-adversarial-examples-2014--v1, first page): “Ian J. Goodfellow”, “Jonathon Shlens”, “Christian Szegedy”.

| Version           | Kind             | Date       | Precision | Basis                          |
| ----------------- | ---------------- | ---------- | --------- | ------------------------------ |
| arXiv:1412.6572v1 | arXiv submission | 2014-12-20 | day       | arXiv submission history (UTC) |
| arXiv:1412.6572v2 | arXiv submission | 2015-02-25 | day       | arXiv submission history (UTC) |
| arXiv:1412.6572v3 | arXiv submission | 2015-03-20 | day       | arXiv submission history (UTC) |

States:

- The authors argue that the primary cause of neural networks' vulnerability to adversarial perturbation is their linear nature. “We argue instead that the primary cause of neural networks’ vulnerability to adversarial perturbation is their linear nature.” (arXiv v1, PDF p. 1, abstract)
- The paper states that this view yields a simple and fast method for generating adversarial examples. “Moreover, this view yields a simple and fast method of generating adversarial examples.” (arXiv v1, PDF p. 1, abstract)

Cited by: Scalable agent alignment via reward modeling: a research direction (PDF p. 25, reference or mention by title); Concrete Problems in AI Safety (PDF p. 24, reference by arXiv identifier); Alignment for Advanced Machine Learning Systems (PDF p. 22, reference by arXiv identifier).

Authorship records: `christian-szegedy`.

<a id="kp-going-deeper-convolutions-2014"></a>

#### Going deeper with convolutions

- ID `kp-going-deeper-convolutions-2014` (proposed); subtype Research paper (work).
- Basis 2: 48,393 citations in Semantic Scholar (rank 13, 2026-10-28); cited by 1 dataset documents.
- Identifiers: arxiv 1409.4842; doi 10.1109/cvpr.2015.7298594.
- Authors as printed (paper:kp-going-deeper-convolutions-2014--v1, first page): “Christian Szegedy”, “Wei Liu”, “Yangqing Jia”, “Pierre Sermanet”, “Scott Reed”, “Dragomir Anguelov”, “Dumitru Erhan”, “Vincent Vanhoucke”, “Andrew Rabinovich”.

| Version                                                                         | Kind                   | Date       | Precision | Basis                                                                                         |
| ------------------------------------------------------------------------------- | ---------------------- | ---------- | --------- | --------------------------------------------------------------------------------------------- |
| arXiv:1409.4842v1                                                               | arXiv submission       | 2014-09-17 | day       | arXiv submission history (UTC)                                                                |
| 2015 IEEE Conference on Computer Vision and Pattern Recognition (CVPR), pp. 1-9 | conference publication | 2015       | year      | Crossref published-print date (year kept; publisher-deposited, not checked against the issue) |

States:

- The paper proposes a deep convolutional neural network architecture codenamed Inception, which the authors state set the best reported results for classification and detection in ILSVRC 2014. “We propose a deep convolutional neural network architecture codenamed Inception, which was responsible for setting the new state of the art for classification and detection in the ImageNet Large-Scale Visual Recognition Challenge 2014 (ILSVRC14).” (arXiv v1, PDF p. 1, abstract)

Cited by: Batch Normalization (2015 paper) (reference by arXiv identifier).

Authorship records: `christian-szegedy`, `wei-liu` (proposed), `scott-reed` (proposed), `dragomir-anguelov` (proposed), `dumitru-erhan` (proposed).

<a id="kp-learning-phrase-representations-using-rnn-2014"></a>

#### Learning Phrase Representations using RNN Encoder–Decoder for Statistical Machine Translation

- ID `kp-learning-phrase-representations-using-rnn-2014` (proposed); subtype Research paper (work).
- Basis 2: 28,132 citations in Semantic Scholar (rank 36, 2026-10-28); cited by 1 dataset documents.
- Identifiers: arxiv 1406.1078; doi 10.3115/v1/d14-1179.
- Authors as printed (paper:kp-learning-phrase-representations-using-rnn-2014--v1, first page): “Kyunghyun Cho”, “Bart van Merriënboer”, “Caglar Gulcehre”, “Fethi Bougares”, “Holger Schwenk”, “Yoshua Bengio”. Not found on the first page (index names): D. Bahdanau.
- arXiv comments (author-supplied): “EMNLP 2014”

| Version                                                                                                       | Kind                   | Date       | Precision | Basis                                                                                         |
| ------------------------------------------------------------------------------------------------------------- | ---------------------- | ---------- | --------- | --------------------------------------------------------------------------------------------- |
| Proceedings of the 2014 Conference on Empirical Methods in Natural Language Processing (EMNLP), pp. 1724-1734 | conference publication | 2014       | year      | Crossref published-print date (year kept; publisher-deposited, not checked against the issue) |
| arXiv:1406.1078v1                                                                                             | arXiv submission       | 2014-06-03 | day       | arXiv submission history (UTC)                                                                |
| arXiv:1406.1078v2                                                                                             | arXiv submission       | 2014-07-24 | day       | arXiv submission history (UTC)                                                                |
| arXiv:1406.1078v3                                                                                             | arXiv submission       | 2014-09-03 | day       | arXiv submission history (UTC)                                                                |

States:

- The paper proposes a neural network model called RNN Encoder–Decoder, consisting of two recurrent neural networks. “In this paper, we propose a novel neural network model called RNN Encoder–Decoder that consists of two recurrent neural networks (RNN).” (arXiv v1, PDF p. 1, abstract)

Cited by: Attention Is All You Need (PDF p. 10, reference by arXiv identifier).

Authorship records: `yoshua-bengio` (proposed).

<a id="kp-neural-machine-translation-by-jointly-2014"></a>

#### Neural Machine Translation by Jointly Learning to Align and Translate

- ID `kp-neural-machine-translation-by-jointly-2014` (proposed); subtype Research paper (work).
- Basis 2: 30,288 citations in Semantic Scholar (rank 31, 2026-10-28); cited by 2 dataset documents.
- Identifiers: arxiv 1409.0473.
- Authors as printed (paper:kp-neural-machine-translation-by-jointly-2014--v1, first page): “Dzmitry Bahdanau”, “Yoshua Bengio”. Not found on the first page (index names): Kyunghyun Cho.
- arXiv comments (author-supplied): “Accepted at ICLR 2015 as oral presentation”

| Version           | Kind             | Date       | Precision | Basis                          |
| ----------------- | ---------------- | ---------- | --------- | ------------------------------ |
| arXiv:1409.0473v1 | arXiv submission | 2014-09-01 | day       | arXiv submission history (UTC) |
| arXiv:1409.0473v2 | arXiv submission | 2014-09-04 | day       | arXiv submission history (UTC) |
| arXiv:1409.0473v3 | arXiv submission | 2014-10-07 | day       | arXiv submission history (UTC) |
| arXiv:1409.0473v4 | arXiv submission | 2014-12-19 | day       | arXiv submission history (UTC) |
| arXiv:1409.0473v5 | arXiv submission | 2015-03-22 | day       | arXiv submission history (UTC) |
| arXiv:1409.0473v6 | arXiv submission | 2015-04-24 | day       | arXiv submission history (UTC) |
| arXiv:1409.0473v7 | arXiv submission | 2016-05-19 | day       | arXiv submission history (UTC) |

States:

- The paper introduces an extension to the encoder–decoder model for neural machine translation that learns to align and translate jointly, as a way to address an issue it identifies with encoding a source sentence into a fixed-length vector. “In order to address this issue, we introduce an extension to the encoder–decoder model which learns to align and translate jointly.” (arXiv v1, PDF p. 1, §1 Introduction, para. 4)

Cited by: Attention Is All You Need (PDF p. 10, reference by arXiv identifier); Kimi K3: Open Frontier Intelligence (PDF p. 35, reference by arXiv identifier).

Authorship records: `yoshua-bengio` (proposed).

<a id="kp-sequence-sequence-learning-neural-networks-2014"></a>

#### Sequence to Sequence Learning with Neural Networks

- ID `kp-sequence-sequence-learning-neural-networks-2014` (proposed); subtype Research paper (work).
- Basis 2: 22,572 citations in Semantic Scholar (rank 48, 2026-10-28); cited by 1 dataset documents.
- Identifiers: arxiv 1409.3215.
- Authors as printed (paper:kp-sequence-sequence-learning-neural-networks-2014--v1, first page): “Ilya Sutskever”, “Oriol Vinyals”, “Quoc V. Le”.
- arXiv comments (author-supplied): “9 pages”

| Version           | Kind             | Date       | Precision | Basis                          |
| ----------------- | ---------------- | ---------- | --------- | ------------------------------ |
| arXiv:1409.3215v1 | arXiv submission | 2014-09-10 | day       | arXiv submission history (UTC) |
| arXiv:1409.3215v2 | arXiv submission | 2014-10-29 | day       | arXiv submission history (UTC) |
| arXiv:1409.3215v3 | arXiv submission | 2014-12-14 | day       | arXiv submission history (UTC) |

States:

- The paper presents a general end-to-end approach to sequence learning that, according to the authors, makes minimal assumptions on the sequence structure. “In this paper, we present a general end-to-end approach to sequence learning that makes minimal assumptions on the sequence structure.” (arXiv v1, PDF p. 1, abstract)

Cited by: source-gemini-report-v1 (PDF p. 32, reference or mention by title).

Authorship records: `ilya-sutskever`, `oriol-vinyals`, `quoc-le`.

<a id="kp-superintelligence-paths-dangers-strategies-2014"></a>

#### Superintelligence: Paths, Dangers, Strategies

- ID `kp-superintelligence-paths-dangers-strategies-2014` (proposed); subtype Research paper (work).
- Basis 1: cited by 13 dataset documents.
- Identifiers: none.
- Authors as printed: not read. Not found on the first page (index names): N. Bostrom.
- Preparer's note: The index DOI (10.5860/choice.187536) is a review in Choice, not the book. The book (Oxford University Press, 2014) has no DOI in the sources read; its text was not retrieved.

No dated version was recorded.

No “states” record: No text retrieved: papers.mjs text prints 'missing' for this book.

Attributed-credit records (the citing document’s own attribution):

- [attributes a term or concept] Soares, Fallenstein and Yudkowsky (2015) attribute the term “treacherous turn”, for an agent that conceals its utility function until it can avoid correction, to Bostrom (2014). “Bostrom (2014) refers to this as a “treacherous turn”.” (Corrigibility, PDF p. 1, footnote 2)
- [attributes a term or concept] Agrawal, Gans and Goldfarb (2019), summarising a discussant’s comment that humans must tell machines what to optimise, attribute the name “value-loading problem” for that task to Bostrom (2014). “Bostrom (2014) describes this as the value-loading problem.” (Introduction to "The Economics of Artificial Intelligence: An Agenda", PDF p. 10, summary of the volume's chapters)
- [builds on] Gans (2018) takes its definition of the control problem, which the paper then examines with the tools of economic theory, from a quotation of Bostrom (2014, p. 128). “”This is the problem that a project faces when it seeks to ensure that the superintelligence it is building will not harm the project’s interests.” (Bostrom (2014) , p.128)” (Self-Regulating Artificial General Intelligence, PDF p. 3, opening section, para. 1)
- [builds on] Gans (2023) attributes the existential-risk concerns of OpenAI's funders, which it says shaped OpenAI's governance structure, to their having been outlined by Bostrom (2014), and calls those concerns controversial. “These concerns had been outlined by Bostrom (2014), although they are controversial and subject to debate over whether such risks are salient (Gans, 2018) or a reason to slow AGI development (Jones, 2023).” (Can Socially-Minded Governance Control the AGI Beast?, PDF p. 3, opening section)
- [builds on] Alignment for Advanced Machine Learning Systems (MIRI, 2016) frames its objective-specification problems as a way to ameliorate dangers it attributes to Bostrom's Superintelligence (2014). “Intuitively, it seems that if we could codify what we mean by “find a way to cure Parkinson’s disease without doing anything drastic,” many of the dangers Bostrom (2014) describes in his book Superintelligence could be ameliorated.” (Alignment for Advanced Machine Learning Systems, PDF p. 2, §1 Introduction)

Cited by: Deep reinforcement learning from human preferences (PDF p. 11, reference or mention by title); Supervising strong learners by amplifying weak experts (PDF p. 8, reference or mention by title); Scalable agent alignment via reward modeling: a research direction (PDF p. 23, reference or mention by title); Concrete Problems in AI Safety (PDF p. 23, reference or mention by title); Alignment for Advanced Machine Learning Systems (PDF p. 21, reference or mention by title); GPT-4 System Card (PDF p. 35, reference or mention by title); Corrigibility (PDF p. 10, reference or mention by title); Artificial Intelligence and Its Implications for Income Distribution and Unemployment (PDF p. 41, reference or mention by title); Introduction to "The Economics of Artificial Intelligence: An Agenda" (PDF p. 20, reference or mention by title); Self-Regulating Artificial General Intelligence (PDF p. 16, reference or mention by title); The A.I. Dilemma: Growth versus Existential Risk (PDF p. 22, reference or mention by title); How Much Should We Spend to Reduce A.I.'s Existential Risk? (PDF p. 20, reference or mention by title); Can Socially-Minded Governance Control the AGI Beast? (PDF p. 16, reference or mention by title).

### 2015

<a id="nordhaus-2015-economic-singularity"></a>

#### Are We Approaching an Economic Singularity? Information Technology and the Future of Economic Growth

- ID `nordhaus-2015-economic-singularity` (existing dataset document); subtype Working paper.
- Basis 1: cited by 6 dataset documents.
- Identifiers: doi 10.2139/ssrn.2658259.
- Authors as printed (corpus:source-nordhaus-2015-nber, first page): “William D. Nordhaus”.

| Version                                                                                                                                                                                                  | Kind                       | Date    | Precision | Basis                                      |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | ------- | --------- | ------------------------------------------ |
| Are We Approaching an Economic Singularity? Information Technology and the Future of Economic Growth (Wayback capture of the Cowles Foundation PDF (cowles.yale.edu/.../d2021.pdf); compared with a capt | as recorded in the dataset | 2015-09 | month     | dataset source source-nordhaus-2015-cowles |

States:

- The paper states that it develops a growth model featuring what it labels Singularity and presents several tests of whether the economy is rapidly approaching it. “The paper develops a growth model that features Singularity and presents several tests of whether we are rapidly approaching Singularity.” (NBER Working Paper 21547, PDF p. 3, abstract)

Attributed-credit records (the citing document’s own attribution):

- [summarises an argument or finding] Brynjolfsson, Rock and Syverson (2017) attribute to Nordhaus (2015) the finding that the hypothesis of accelerating technology-driven growth fails a variety of tests, as part of the pessimistic view they describe. “Nordhaus (2015) finds that the hypothesis of an acceleration of technology-driven growth fails a variety of tests” (Artificial Intelligence and the Modern Productivity Paradox: A Clash of Expectations and Statistics, PDF p. 8, discussion of pessimistic views of future technological progress)

Cited by: Economic Growth under Transformative AI: A guide to the vast range of possibilities for output growth, wages, and the labor share (PDF p. 69, reference or mention by title); The Simple Macroeconomics of AI (PDF p. 51, reference or mention by title); Artificial Intelligence and the Modern Productivity Paradox: A Clash of Expectations and Statistics (PDF p. 43, reference or mention by title); Ovatko hyvät johtamismenetelmät talouskasvun lähde? (pääkirjoitus) (PDF p. 4, reference or mention by title); The A.I. Dilemma: Growth versus Existential Risk (PDF p. 23, reference or mention by title); How Much Should We Spend to Reduce A.I.'s Existential Risk? (PDF p. 22, reference or mention by title).

<a id="kp-batch-normalization-accelerating-deep-network-2015"></a>

#### Batch Normalization: Accelerating Deep Network Training by Reducing Internal Covariate Shift

- ID `kp-batch-normalization-accelerating-deep-network-2015` (proposed); subtype Research paper (work).
- Basis 2: 48,185 citations in Semantic Scholar (rank 14, 2026-10-28); cited by 1 dataset documents.
- Identifiers: arxiv 1502.03167.
- Authors as printed (paper:kp-batch-normalization-accelerating-deep-network-2015--v1, first page): “Sergey Ioffe”, “Christian Szegedy”.

| Version            | Kind             | Date       | Precision | Basis                          |
| ------------------ | ---------------- | ---------- | --------- | ------------------------------ |
| arXiv:1502.03167v1 | arXiv submission | 2015-02-11 | day       | arXiv submission history (UTC) |
| arXiv:1502.03167v2 | arXiv submission | 2015-02-13 | day       | arXiv submission history (UTC) |
| arXiv:1502.03167v3 | arXiv submission | 2015-03-02 | day       | arXiv submission history (UTC) |

States:

- The paper names the change in each layer’s input distribution during training internal covariate shift and states that it addresses the problem by normalizing layer inputs. “We refer to this phenomenon as internal covariate shift, and address the problem by normalizing layer inputs.” (arXiv v1, PDF p. 1, abstract)

Cited by: Batch Normalization (2015 paper) (reference by arXiv identifier).

Authorship records: `christian-szegedy`.

<a id="kp-deep-residual-learning-image-recognition-2015"></a>

#### Deep Residual Learning for Image Recognition

- ID `kp-deep-residual-learning-image-recognition-2015` (proposed); subtype Research paper (work).
- Basis 1: cited by 5 dataset documents.
- Identifiers: arxiv 1512.03385; doi 10.1109/cvpr.2016.90.
- Authors as printed (paper:kp-deep-residual-learning-image-recognition-2015--v1, first page): “Kaiming He”, “Xiangyu Zhang”, “Shaoqing Ren”, “Jian Sun”.
- arXiv comments (author-supplied): “Tech report”

| Version                                                                             | Kind                   | Date       | Precision | Basis                                                                                         |
| ----------------------------------------------------------------------------------- | ---------------------- | ---------- | --------- | --------------------------------------------------------------------------------------------- |
| arXiv:1512.03385v1                                                                  | arXiv submission       | 2015-12-10 | day       | arXiv submission history (UTC)                                                                |
| 2016 IEEE Conference on Computer Vision and Pattern Recognition (CVPR), pp. 770-778 | conference publication | 2016       | year      | Crossref published-print date (year kept; publisher-deposited, not checked against the issue) |

States:

- The paper presents a residual learning framework intended to ease the training of substantially deeper neural networks. “We present a residual learning framework to ease the training of networks that are substantially deeper than those used previously.” (arXiv v1, PDF p. 1, abstract)

Cited by: An Empirical Model of Large-Batch Training (PDF p. 33, reference by arXiv identifier); Weak-to-Strong Generalization: Eliciting Strong Capabilities With Weak Supervision (PDF p. 21, reference or mention by title); Alignment for Advanced Machine Learning Systems (PDF p. 22, reference by arXiv identifier); Highly accurate protein structure prediction with AlphaFold (2021) (reference or mention by title); Kimi K3: Open Frontier Intelligence (PDF p. 36, reference by arXiv identifier).

Authorship records: `kaiming-he` (proposed), `xiangyu-zhang` (proposed), `shaoqing-ren` (proposed), `jian-sun` (proposed).

<a id="kp-delving-deep-into-rectifiers-surpassing-2015"></a>

#### Delving Deep into Rectifiers: Surpassing Human-Level Performance on ImageNet Classification

- ID `kp-delving-deep-into-rectifiers-surpassing-2015` (proposed); subtype Research paper (work).
- Basis 2: 21,178 citations in Semantic Scholar (rank 53, 2026-10-28); cited by 0 dataset documents.
- Identifiers: arxiv 1502.01852; doi 10.1109/iccv.2015.123.
- Authors as printed (paper:kp-delving-deep-into-rectifiers-surpassing-2015--v1, first page): “Kaiming He”, “Xiangyu Zhang”, “Shaoqing Ren”, “Jian Sun”.

| Version                                                                     | Kind                   | Date       | Precision | Basis                                                                                         |
| --------------------------------------------------------------------------- | ---------------------- | ---------- | --------- | --------------------------------------------------------------------------------------------- |
| 2015 IEEE International Conference on Computer Vision (ICCV), pp. 1026-1034 | conference publication | 2015       | year      | Crossref published-print date (year kept; publisher-deposited, not checked against the issue) |
| arXiv:1502.01852v1                                                          | arXiv submission       | 2015-02-06 | day       | arXiv submission history (UTC)                                                                |

States:

- The paper proposes a Parametric Rectified Linear Unit (PReLU) that generalises the traditional rectified unit. “First, we propose a Parametric Rectified Linear Unit (PReLU) that generalizes the traditional rectified unit.” (arXiv v1, PDF p. 1, abstract)
- The paper states that, to the authors’ knowledge, its result on ImageNet 2012 classification is the first to surpass the human-level performance figure of 5.1% it cites for this challenge. “To our knowledge, our result is the first to surpass human-level performance (5.1%, [22]) on this visual recognition challenge.” (arXiv v1, PDF p. 1, abstract) — the paper’s own priority or novelty claim

Authorship records: `kaiming-he` (proposed), `xiangyu-zhang` (proposed), `shaoqing-ren` (proposed), `jian-sun` (proposed).

<a id="kp-distilling-knowledge-neural-network-2015"></a>

#### Distilling the Knowledge in a Neural Network

- ID `kp-distilling-knowledge-neural-network-2015` (proposed); subtype Research paper (work).
- Basis 2: 27,137 citations in Semantic Scholar (rank 37, 2026-10-28); cited by 1 dataset documents.
- Identifiers: arxiv 1503.02531.
- Authors as printed (paper:kp-distilling-knowledge-neural-network-2015--v1, first page): “Geoffrey Hinton”, “Oriol Vinyals”, “Jeff Dean”.
- arXiv comments (author-supplied): “NIPS 2014 Deep Learning Workshop”

| Version            | Kind             | Date       | Precision | Basis                          |
| ------------------ | ---------------- | ---------- | --------- | ------------------------------ |
| arXiv:1503.02531v1 | arXiv submission | 2015-03-09 | day       | arXiv submission history (UTC) |

States:

- The authors state that they extend earlier work by Caruana and collaborators on compressing an ensemble's knowledge into a single model, using a different compression technique. “Caruana and his collaborators [1] have shown that it is possible to compress the knowledge in an ensemble into a single model which is much easier to deploy and we develop this approach further using a different compression technique.” (arXiv v1, PDF p. 1, abstract)
- The paper also introduces an ensemble of full models and specialist models that learn to distinguish fine-grained classes the full models confuse. “We also introduce a new type of ensemble composed of one or more full models and many specialist models which learn to distinguish fine-grained classes that the full models confuse.” (arXiv v1, PDF p. 1, abstract)

Cited by: Weak-to-Strong Generalization: Eliciting Strong Capabilities With Weak Supervision (PDF p. 22, reference by arXiv identifier).

Authorship records: `geoffrey-hinton` (proposed), `oriol-vinyals`, `jeff-dean`.

<a id="kp-faster-r-cnn-towards-real-2015"></a>

#### Faster R-CNN: Towards Real-Time Object Detection with Region Proposal Networks

- ID `kp-faster-r-cnn-towards-real-2015` (proposed); subtype Research paper (work).
- Basis 2: 76,824 citations in Semantic Scholar (rank 7, 2026-10-28); cited by 1 dataset documents.
- Identifiers: arxiv 1506.01497; doi 10.1109/tpami.2016.2577031.
- Authors as printed (paper:kp-faster-r-cnn-towards-real-2015--v1, first page): “Shaoqing Ren”, “Kaiming He”, “Ross Girshick”, “Jian Sun”.
- arXiv comments (author-supplied): “Extended tech report”

| Version                                                                                       | Kind                | Date       | Precision | Basis                                                                                         |
| --------------------------------------------------------------------------------------------- | ------------------- | ---------- | --------- | --------------------------------------------------------------------------------------------- |
| arXiv:1506.01497v1                                                                            | arXiv submission    | 2015-06-04 | day       | arXiv submission history (UTC)                                                                |
| arXiv:1506.01497v2                                                                            | arXiv submission    | 2015-09-13 | day       | arXiv submission history (UTC)                                                                |
| arXiv:1506.01497v3                                                                            | arXiv submission    | 2016-01-06 | day       | arXiv submission history (UTC)                                                                |
| IEEE Transactions on Pattern Analysis and Machine Intelligence, vol. 39, no. 6, pp. 1137-1149 | journal publication | 2017       | year      | Crossref published-print date (year kept; publisher-deposited, not checked against the issue) |

States:

- The paper introduces a Region Proposal Network (RPN) that shares full-image convolutional features with the detection network, which the authors state makes region proposals nearly cost-free. “In this work, we introduce a Region Proposal Network (RPN) that shares full-image convolutional features with the detection network, thus enabling nearly cost-free region proposals.” (arXiv v1, PDF p. 1, abstract)

Cited by: FAIR ten-year retrospective (2023) (reference by arXiv identifier).

Authorship records: `shaoqing-ren` (proposed), `kaiming-he` (proposed), `ross-girshick` (proposed), `jian-sun` (proposed).

<a id="kp-human-level-control-through-deep-2015"></a>

#### Human-level control through deep reinforcement learning

- ID `kp-human-level-control-through-deep-2015` (proposed); subtype Research paper (work).
- Basis 1: cited by 5 dataset documents.
- Identifiers: doi 10.1038/nature14236.
- Authors as printed (paper:kp-human-level-control-through-deep-2015--text, first page): “Volodymyr Mnih”, “Koray Kavukcuoglu”, “David Silver”, “Andrei A. Rusu”, “Joel Veness”, “Marc G. Bellemare”, “Alex Graves”, “Martin Riedmiller”, “Andreas K. Fidjeland”, “Georg Ostrovski”, “Stig Petersen”, “Charles Beattie”, “Amir Sadik”, “Ioannis Antonoglou”, “Helen King”, “Dharshan Kumaran”, “Daan Wierstra”, “Shane Legg”, “Demis Hassabis”.
- Preparer's note: Publisher page; the article text is not open. Quotations come from the abstract on that page.

| Version                                 | Kind                | Date | Precision | Basis                                                                                         |
| --------------------------------------- | ------------------- | ---- | --------- | --------------------------------------------------------------------------------------------- |
| Nature, vol. 518, no. 7540, pp. 529-533 | journal publication | 2015 | year      | Crossref published-print date (year kept; publisher-deposited, not checked against the issue) |

States:

- The paper presents an agent, the deep Q-network, that learns policies directly from high-dimensional sensory inputs through end-to-end reinforcement learning. “Here we use recent advances in training deep neural networks … to develop a novel artificial agent, termed a deep Q-network, that can learn successful policies directly from high-dimensional sensory inputs using end-to-end reinforcement learning.” (Nature article page, abstract)
- The paper states that its agent is the first artificial agent capable of learning to excel at a diverse array of challenging tasks. “This work bridges the divide between high-dimensional sensory inputs and actions, resulting in the first artificial agent that is capable of learning to excel at a diverse array of challenging tasks.” (Nature article page, abstract) — the paper’s own priority or novelty claim

Cited by: Proximal Policy Optimization Algorithms (PDF p. 9, reference or mention by title); Deep reinforcement learning from human preferences (PDF p. 12, reference or mention by title); Scalable agent alignment via reward modeling: a research direction (PDF p. 27, reference or mention by title); Concrete Problems in AI Safety (PDF p. 26, reference or mention by title); Alignment for Advanced Machine Learning Systems (PDF p. 23, reference or mention by title).

Authorship records: `koray-kavukcuoglu`, `david-silver`, `ioannis-antonoglou`, `daan-wierstra`, `shane-legg`, `demis-hassabis`.

<a id="kp-neural-machine-translation-rare-words-2015"></a>

#### Neural Machine Translation of Rare Words with Subword Units

- ID `kp-neural-machine-translation-rare-words-2015` (proposed); subtype Research paper (work).
- Basis 1: cited by 6 dataset documents.
- Identifiers: arxiv 1508.07909; doi 10.18653/v1/p16-1162.
- Authors as printed (paper:kp-neural-machine-translation-rare-words-2015--v1, first page): “Rico Sennrich”, “Barry Haddow”, “Alexandra Birch”.
- arXiv comments (author-supplied): “accepted at ACL 2016; new in this version: figure 3”

| Version                                                                                                                        | Kind                   | Date       | Precision | Basis                                                                                         |
| ------------------------------------------------------------------------------------------------------------------------------ | ---------------------- | ---------- | --------- | --------------------------------------------------------------------------------------------- |
| arXiv:1508.07909v1                                                                                                             | arXiv submission       | 2015-08-31 | day       | arXiv submission history (UTC)                                                                |
| arXiv:1508.07909v2                                                                                                             | arXiv submission       | 2015-11-27 | day       | arXiv submission history (UTC)                                                                |
| Proceedings of the 54th Annual Meeting of the Association for Computational Linguistics (Volume 1: Long Papers), pp. 1715-1725 | conference publication | 2016       | year      | Crossref published-print date (year kept; publisher-deposited, not checked against the issue) |
| arXiv:1508.07909v3                                                                                                             | arXiv submission       | 2016-03-17 | day       | arXiv submission history (UTC)                                                                |
| arXiv:1508.07909v4                                                                                                             | arXiv submission       | 2016-06-03 | day       | arXiv submission history (UTC)                                                                |
| arXiv:1508.07909v5                                                                                                             | arXiv submission       | 2016-06-10 | day       | arXiv submission history (UTC)                                                                |

States:

- The paper introduces an approach to translating rare and unknown words in neural machine translation by encoding them as sequences of subword units, which it describes as simpler and more effective than back-off dictionaries. “In this paper, we introduce a simpler and more effective approach, enabling the translation of rare and unknown words by encoding them as sequences of subword units…” (arXiv v1, PDF p. 1, abstract)

Cited by: Scaling Laws for Neural Language Models (PDF p. 29, reference by arXiv identifier); An Empirical Model of Large-Batch Training (PDF p. 34, reference by arXiv identifier); Attention Is All You Need (PDF p. 11, reference by arXiv identifier); LLaMA (2023 paper) (reference by arXiv identifier); ChatGLM research history and techniques (reference or mention by title); Seed-X: Building Strong Multilingual Translation LLM with 7B Parameters (PDF p. 17, reference or mention by title).

<a id="kp-ssd-single-shot-multibox-detector-2015"></a>

#### SSD: Single Shot MultiBox Detector

- ID `kp-ssd-single-shot-multibox-detector-2015` (proposed); subtype Research paper (work).
- Basis 2: 36,588 citations in Semantic Scholar (rank 25, 2026-10-28); cited by 0 dataset documents.
- Identifiers: arxiv 1512.02325; doi 10.1007/978-3-319-46448-0_2.
- Authors as printed (paper:kp-ssd-single-shot-multibox-detector-2015--v1, first page): “Wei Liu”, “Dragomir Anguelov”, “Dumitru Erhan”, “Christian Szegedy”, “Scott Reed”. Not found on the first page (index names): Cheng-Yang Fu, A. Berg.
- arXiv comments (author-supplied): “ECCV 2016”

| Version                                      | Kind             | Date       | Precision | Basis                                                                                         |
| -------------------------------------------- | ---------------- | ---------- | --------- | --------------------------------------------------------------------------------------------- |
| arXiv:1512.02325v1                           | arXiv submission | 2015-12-08 | day       | arXiv submission history (UTC)                                                                |
| Lecture Notes in Computer Science, pp. 21-37 | book chapter     | 2016       | year      | Crossref published-print date (year kept; publisher-deposited, not checked against the issue) |
| arXiv:1512.02325v2                           | arXiv submission | 2016-03-30 | day       | arXiv submission history (UTC)                                                                |
| arXiv:1512.02325v3                           | arXiv submission | 2016-11-08 | day       | arXiv submission history (UTC)                                                                |
| arXiv:1512.02325v4                           | arXiv submission | 2016-11-30 | day       | arXiv submission history (UTC)                                                                |
| arXiv:1512.02325v5                           | arXiv submission | 2016-12-29 | day       | arXiv submission history (UTC)                                                                |

States:

- The paper presents a method, named SSD, for detecting objects in images with a single deep neural network. “We present a method for detecting objects in images using a single deep neural network.” (arXiv v1, PDF p. 1, abstract)

Authorship records: `wei-liu` (proposed), `dragomir-anguelov` (proposed), `dumitru-erhan` (proposed), `christian-szegedy`, `scott-reed` (proposed).

<a id="autor-2015-why-are-there-still-so-many-jobs"></a>

#### Why Are There Still So Many Jobs? The History and Future of Workplace Automation

- ID `autor-2015-why-are-there-still-so-many-jobs` (existing dataset document); subtype Journal article.
- Basis 1: cited by 8 dataset documents.
- Identifiers: doi 10.1257/jep.29.3.3.
- Authors as printed (corpus:source-autor-2015-why-are-there-still-so-many-jobs, first page): “David H. Autor”.

| Version                                                                                                                                                                                                  | Kind                       | Date | Precision | Basis                                                                                         |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | ---- | --------- | --------------------------------------------------------------------------------------------- |
| Journal of Economic Perspectives, vol. 29, no. 3, pp. 3-30                                                                                                                                               | journal publication        | 2015 | year      | Crossref published-print date (year kept; publisher-deposited, not checked against the issue) |
| Why Are There Still So Many Jobs? The History and Future of Workplace Automation (Abstract page only (full-text PDF refused, HTTP 403). Current copy retrieved directly on 2026-10-09; no archive captur | as recorded in the dataset | 2015 | year      | dataset source source-autor-2015-why-are-there-still-so-many-jobs                             |

States:

- The author states that the essay begins by identifying the reasons automation has not eliminated a majority of jobs over decades and centuries. “In this essay, I begin by identifying the reasons that automation has not wiped out a majority of jobs over the decades and centuries.” (publisher page (Journal of Economic Perspectives, vol. 29, no. 3, Summer 2015), abstract)

Attributed-credit records (the citing document’s own attribution):

- [summarises an argument or finding] Benzell et al. attribute to Autor (2015), whom they describe as a long-run skeptic of Luddism, the argument that the automobile displaced equestrian drivers but created many new human occupations. “He points out that the automobile displaced equestrian drivers but introduced myriad occupations for humans in the auto and other industries.” (Robots Are Us: Some Economics of Human Replacement, PDF p. 7, literature discussion; wording attested 2018-10: The copy read is NBER Working Paper 20941 as revised in October 2018; it cites works of 2015 and 2017, so this wording is attested only from the revision.)

Cited by: Economic Growth under Transformative AI: A guide to the vast range of possibilities for output growth, wages, and the labor share (PDF p. 68, reference or mention by title); Robots Are Us: Some Economics of Human Replacement (PDF p. 31, reference or mention by title); Artificial Intelligence, Automation and Work (PDF p. 41, reference or mention by title); Prediction, Judgment and Complexity: A Theory of Decision Making and Artificial Intelligence (PDF p. 26, reference or mention by title); AI and the Economy (PDF p. 29, reference or mention by title); The Wrong Kind of AI? Artificial Intelligence and the Future of Labor Demand (PDF p. 13, reference or mention by title); Why Are There Still So Many Jobs? The History and Future of Workplace Automation (reference by DOI); The History of Technological Anxiety and the Future of Economic Growth: Is This Time Different? (reference by DOI).

<a id="kp-you-only-look-once-unified-2015"></a>

#### You Only Look Once: Unified, Real-Time Object Detection

- ID `kp-you-only-look-once-unified-2015` (proposed); subtype Research paper (work).
- Basis 2: 49,196 citations in Semantic Scholar (rank 12, 2026-10-28); cited by 0 dataset documents.
- Identifiers: arxiv 1506.02640; doi 10.1109/cvpr.2016.91.
- Authors as printed (paper:kp-you-only-look-once-unified-2015--v1, first page): “Joseph Redmon”, “Santosh Divvala”, “Ross Girshick”, “Ali Farhadi”.

| Version                                                                             | Kind                   | Date       | Precision | Basis                                                                                         |
| ----------------------------------------------------------------------------------- | ---------------------- | ---------- | --------- | --------------------------------------------------------------------------------------------- |
| arXiv:1506.02640v1                                                                  | arXiv submission       | 2015-06-08 | day       | arXiv submission history (UTC)                                                                |
| arXiv:1506.02640v2                                                                  | arXiv submission       | 2015-06-09 | day       | arXiv submission history (UTC)                                                                |
| arXiv:1506.02640v3                                                                  | arXiv submission       | 2015-06-11 | day       | arXiv submission history (UTC)                                                                |
| arXiv:1506.02640v4                                                                  | arXiv submission       | 2015-11-12 | day       | arXiv submission history (UTC)                                                                |
| 2016 IEEE Conference on Computer Vision and Pattern Recognition (CVPR), pp. 779-788 | conference publication | 2016       | year      | Crossref published-print date (year kept; publisher-deposited, not checked against the issue) |
| arXiv:1506.02640v5                                                                  | arXiv submission       | 2016-05-09 | day       | arXiv submission history (UTC)                                                                |

States:

- The paper presents YOLO, which it describes as a unified pipeline for object detection. “We present YOLO, a unified pipeline for object detection.” (arXiv v1, PDF p. 1, abstract)
- The authors state that, instead of repurposing classifiers, they frame object detection as a regression problem to spatially separated bounding boxes and associated class probabilities. “Instead, we frame object detection as a regression problem to spatially separated bounding boxes and associated class probabilities.” (arXiv v1, PDF p. 1, abstract)

Authorship records: `ross-girshick` (proposed), `ali-farhadi` (proposed).

### 2016

<a id="kp-why-should-i-trust-you-2016"></a>

#### “Why Should I Trust You?”: Explaining the Predictions of Any Classifier

- ID `kp-why-should-i-trust-you-2016` (proposed); subtype Research paper (work).
- Basis 2: 25,114 citations in Semantic Scholar (rank 42, 2026-10-28); cited by 2 dataset documents.
- Identifiers: arxiv 1602.04938; doi 10.1145/2939672.2939778.
- Authors as printed (paper:kp-why-should-i-trust-you-2016--v1, first page): “Marco Tulio Ribeiro”, “Sameer Singh”, “Carlos Guestrin”.

| Version                                                                                                           | Kind                   | Date       | Precision | Basis                                                                                         |
| ----------------------------------------------------------------------------------------------------------------- | ---------------------- | ---------- | --------- | --------------------------------------------------------------------------------------------- |
| Proceedings of the 22nd ACM SIGKDD International Conference on Knowledge Discovery and Data Mining, pp. 1135-1144 | conference publication | 2016       | year      | Crossref published-print date (year kept; publisher-deposited, not checked against the issue) |
| arXiv:1602.04938v1                                                                                                | arXiv submission       | 2016-02-16 | day       | arXiv submission history (UTC)                                                                |
| arXiv:1602.04938v2                                                                                                | arXiv submission       | 2016-08-03 | day       | arXiv submission history (UTC)                                                                |
| arXiv:1602.04938v3                                                                                                | arXiv submission       | 2016-08-09 | day       | arXiv submission history (UTC)                                                                |

States:

- The paper proposes LIME, an explanation technique that explains the predictions of any classifier by learning an interpretable model locally around a prediction. “In this work, we propose LIME, a novel explanation technique that explains the predictions of any classifier in an interpretable and faithful manner, by learning an interpretable model locally around the prediction.” (arXiv v1, PDF p. 1, abstract)

Cited by: Weak-to-Strong Generalization: Eliciting Strong Capabilities With Weak Supervision (PDF p. 25, reference or mention by title); Alignment for Advanced Machine Learning Systems (PDF p. 24, reference by arXiv identifier).

Authorship records: `carlos-guestrin` (proposed).

<a id="kp-communication-efficient-learning-deep-networks-2016"></a>

#### Communication-Efficient Learning of Deep Networks from Decentralized Data

- ID `kp-communication-efficient-learning-deep-networks-2016` (proposed); subtype Research paper (work).
- Basis 2: 28,206 citations in Semantic Scholar (rank 35, 2026-10-28); cited by 0 dataset documents.
- Identifiers: arxiv 1602.05629.
- Authors as printed (paper:kp-communication-efficient-learning-deep-networks-2016--v1, first page): “H. Brendan McMahan”, “Eider Moore”, “Daniel Ramage”. Not found on the first page (index names): S. Hampson, B. A. Y. Arcas.
- arXiv comments (author-supplied): “[v4] Fixes a typo in the FedAvg pseudocode. [v3] Updates the large-scale LSTM experiments, along with other minor changes”

| Version            | Kind             | Date       | Precision | Basis                          |
| ------------------ | ---------------- | ---------- | --------- | ------------------------------ |
| arXiv:1602.05629v1 | arXiv submission | 2016-02-17 | day       | arXiv submission history (UTC) |
| arXiv:1602.05629v2 | arXiv submission | 2016-10-21 | day       | arXiv submission history (UTC) |
| arXiv:1602.05629v3 | arXiv submission | 2017-02-28 | day       | arXiv submission history (UTC) |
| arXiv:1602.05629v4 | arXiv submission | 2023-01-26 | day       | arXiv submission history (UTC) |

States:

- The authors advocate leaving training data distributed on mobile devices and learning a shared model by aggregating locally computed updates, an approach the paper calls Federated Learning. “We advocate an alternative that leaves the training data distributed on the mobile devices, and learns a shared model by aggregating locally-computed updates.” (arXiv v1 (titled "Federated Learning of Deep Networks using Model Averaging"), PDF p. 1, abstract)
- The paper presents a method for federated learning of deep networks that the authors state is robust to unbalanced and non-IID data distributions. “We present a practical method for the federated learning of deep networks that proves robust to the unbalanced and non-IID data distributions that naturally arise.” (arXiv v1 (titled "Federated Learning of Deep Networks using Model Averaging"), PDF p. 1, abstract)

<a id="concrete-problems-paper"></a>

#### Concrete Problems in AI Safety

- ID `concrete-problems-paper` (existing dataset document); subtype Research paper (work).
- Basis 1: cited by 9 dataset documents.
- Identifiers: arxiv 1606.06565.
- Authors as printed (paper:concrete-problems-paper--v1, first page): “Dario Amodei”, “Chris Olah”, “Jacob Steinhardt”, “Paul Christiano”, “John Schulman”, “Dan Mane”.
- arXiv comments (author-supplied): “29 pages”

| Version            | Kind             | Date       | Precision | Basis                          |
| ------------------ | ---------------- | ---------- | --------- | ------------------------------ |
| arXiv:1606.06565v1 | arXiv submission | 2016-06-21 | day       | arXiv submission history (UTC) |
| arXiv:1606.06565v2 | arXiv submission | 2016-07-25 | day       | arXiv submission history (UTC) |

States:

- The paper presents five practical research problems related to accident risk in machine learning systems, grouped by whether they originate from a wrong objective function, an objective function too expensive to evaluate frequently, or undesirable behaviour during learning. “We present a list of five practical research problems related to accident risk, categorized according to whether the problem originates from having the wrong objective function … an objective function that is too expensive to evaluate frequently … or undesirable behavior during the learning process …” (arXiv v1, PDF p. 1, abstract)

Attributed-credit records (the citing document’s own attribution):

- [builds on] Leike et al. (2018) state that they build on taxonomies and problem definitions from earlier authors, citing Amodei et al. (2016) among several works. “We build on taxonomies and problem definitions from many authors before us, highlighting tractable and neglected problems in the field of AI safety (Russell et al., 2015; Soares, 2015; Amodei et al., 2016;” (Scalable agent alignment via reward modeling: a research direction, PDF p. 1, §1 Introduction)

Cited by: Deep reinforcement learning from human preferences (PDF p. 11, reference by arXiv identifier); Supervising strong learners by amplifying weak experts (PDF p. 8, reference by arXiv identifier); AI safety via debate (PDF p. 23, reference by arXiv identifier); Scalable agent alignment via reward modeling: a research direction (PDF p. 22, reference by arXiv identifier); Self-critiquing models for assisting human evaluators (PDF p. 20, reference by arXiv identifier); Alignment for Advanced Machine Learning Systems (PDF p. 20, reference by arXiv identifier); Learning through human feedback — DeepMind account (2017) (reference or mention by title); There's No Fire Alarm for Artificial General Intelligence (reference by arXiv identifier); Self-Regulating Artificial General Intelligence (PDF p. 16, reference by arXiv identifier).

Authorship records: `dario-amodei`, `chris-olah`, `jacob-steinhardt` (proposed), `paul-christiano`, `john-schulman`.

<a id="kp-deeplab-semantic-image-segmentation-deep-2016"></a>

#### DeepLab: Semantic Image Segmentation with Deep Convolutional Nets, Atrous Convolution, and Fully Connected CRFs

- ID `kp-deeplab-semantic-image-segmentation-deep-2016` (proposed); subtype Research paper (work).
- Basis 2: 21,861 citations in Semantic Scholar (rank 51, 2026-10-28); cited by 0 dataset documents.
- Identifiers: arxiv 1606.00915; doi 10.1109/tpami.2017.2699184.
- Authors as printed (paper:kp-deeplab-semantic-image-segmentation-deep-2016--v1, first page): “Liang-Chieh Chen”, “George Papandreou”, “Iasonas Kokkinos”, “Kevin Murphy”, “A. Yuille”.
- arXiv comments (author-supplied): “Accepted by TPAMI”

| Version                                                                                     | Kind                | Date       | Precision | Basis                                                                                         |
| ------------------------------------------------------------------------------------------- | ------------------- | ---------- | --------- | --------------------------------------------------------------------------------------------- |
| arXiv:1606.00915v1                                                                          | arXiv submission    | 2016-06-02 | day       | arXiv submission history (UTC)                                                                |
| arXiv:1606.00915v2                                                                          | arXiv submission    | 2017-05-12 | day       | arXiv submission history (UTC)                                                                |
| IEEE Transactions on Pattern Analysis and Machine Intelligence, vol. 40, no. 4, pp. 834-848 | journal publication | 2018       | year      | Crossref published-print date (year kept; publisher-deposited, not checked against the issue) |

States:

- The paper presents DeepLab, a semantic image segmentation system, and states three contributions: atrous convolution, atrous spatial pyramid pooling and the combination of convolutional networks with a fully connected CRF. “In this work we address the task of semantic image segmentation with Deep Learning and make three main contributions that are experimentally shown to have substantial practical merit.” (arXiv v1, PDF p. 1, abstract)
- The paper proposes atrous spatial pyramid pooling (ASPP) for segmenting objects at multiple scales. “Second, we propose atrous spatial pyramid pooling (ASPP) to robustly segment objects at multiple scales.” (arXiv v1, PDF p. 1, abstract)

<a id="kp-grad-cam-visual-explanations-from-2016"></a>

#### Grad-CAM: Visual Explanations from Deep Networks via Gradient-Based Localization

- ID `kp-grad-cam-visual-explanations-from-2016` (proposed); subtype Research paper (work).
- Basis 2: 30,631 citations in Semantic Scholar (rank 30, 2026-10-28); cited by 0 dataset documents.
- Identifiers: arxiv 1610.02391; doi 10.1007/s11263-019-01228-7.
- Authors as printed (paper:kp-grad-cam-visual-explanations-from-2016--v1, first page): “Ramprasaath R. Selvaraju”, “Michael Cogswell”, “Abhishek Das”, “Ramakrishna Vedantam”, “Devi Parikh”, “Dhruv Batra”.
- arXiv comments (author-supplied): “This version was published in International Journal of Computer Vision (IJCV) in 2019; A previous version of the paper was published at International Conference on Computer Vision (ICCV'17)”

| Version                                                                | Kind                | Date       | Precision | Basis                                                                                         |
| ---------------------------------------------------------------------- | ------------------- | ---------- | --------- | --------------------------------------------------------------------------------------------- |
| arXiv:1610.02391v1                                                     | arXiv submission    | 2016-10-07 | day       | arXiv submission history (UTC)                                                                |
| arXiv:1610.02391v2                                                     | arXiv submission    | 2016-12-30 | day       | arXiv submission history (UTC)                                                                |
| arXiv:1610.02391v3                                                     | arXiv submission    | 2017-03-21 | day       | arXiv submission history (UTC)                                                                |
| arXiv:1610.02391v4                                                     | arXiv submission    | 2019-12-03 | day       | arXiv submission history (UTC)                                                                |
| International Journal of Computer Vision, vol. 128, no. 2, pp. 336-359 | journal publication | 2020       | year      | Crossref published-print date (year kept; publisher-deposited, not checked against the issue) |

States:

- The paper proposes a technique, Grad-CAM, for making CNN-based models more transparent by visualizing the input regions that matter for their predictions. “We propose a technique for making Convolutional Neural Network (CNN)-based models more transparent by visualizing the regions of input that are ‘important’ for predictions from these models – or visual explanations.” (arXiv v1, PDF p. 1, abstract)

<a id="kp-guided-cost-learning-deep-inverse-2016"></a>

#### Guided Cost Learning: Deep Inverse Optimal Control via Policy Optimization

- ID `kp-guided-cost-learning-deep-inverse-2016` (proposed); subtype Research paper (work).
- Basis 1: cited by 5 dataset documents.
- Identifiers: arxiv 1603.00448.
- Authors as printed (paper:kp-guided-cost-learning-deep-inverse-2016--v1, first page): “Chelsea Finn”, “Sergey Levine”, “Pieter Abbeel”.
- arXiv comments (author-supplied): “International Conference on Machine Learning (ICML), 2016, to appear”

| Version            | Kind             | Date       | Precision | Basis                          |
| ------------------ | ---------------- | ---------- | --------- | ------------------------------ |
| arXiv:1603.00448v1 | arXiv submission | 2016-03-01 | day       | arXiv submission history (UTC) |
| arXiv:1603.00448v2 | arXiv submission | 2016-03-03 | day       | arXiv submission history (UTC) |
| arXiv:1603.00448v3 | arXiv submission | 2016-05-27 | day       | arXiv submission history (UTC) |

States:

- The paper presents an inverse optimal control algorithm that it states can learn arbitrary nonlinear cost functions, such as neural networks, without meticulous feature engineering. “To address the former challenge, we present an algorithm capable of learning arbitrary nonlinear cost functions, such as neural networks, without meticulous feature engineering.” (arXiv v1, PDF p. 1, abstract)
- The paper formulates a sample-based approximation for maximum-entropy inverse optimal control, addressing cost learning under unknown dynamics. “To address the latter challenge, we formulate an efficient sample-based approximation for MaxEnt IOC.” (arXiv v1, PDF p. 1, abstract)

Cited by: Deep reinforcement learning from human preferences (PDF p. 11, reference or mention by title); Supervising strong learners by amplifying weak experts (PDF p. 9, reference or mention by title); Scalable agent alignment via reward modeling: a research direction (PDF p. 24, reference or mention by title); Concrete Problems in AI Safety (PDF p. 24, reference by arXiv identifier); Alignment for Advanced Machine Learning Systems (PDF p. 21, reference by arXiv identifier).

Authorship records: `chelsea-finn`, `pieter-abbeel`.

<a id="kp-mastering-game-go-deep-neural-2016"></a>

#### Mastering the game of Go with deep neural networks and tree search

- ID `kp-mastering-game-go-deep-neural-2016` (proposed); subtype Research paper (work).
- Basis 1: cited by 5 dataset documents.
- Identifiers: doi 10.1038/nature16961.
- Authors as printed (paper:kp-mastering-game-go-deep-neural-2016--text, first page): “David Silver”, “Aja Huang”, “Chris J. Maddison”, “Arthur Guez”, “Laurent Sifre”, “Julian Schrittwieser”, “Ioannis Antonoglou”, “Veda Panneershelvam”, “Marc Lanctot”, “Sander Dieleman”, “Dominik Grewe”, “John Nham”, “Nal Kalchbrenner”, “Ilya Sutskever”, “Timothy Lillicrap”, “Madeleine Leach”, “Koray Kavukcuoglu”, “Thore Graepel”, “Demis Hassabis”. Not found on the first page (index names): G. Driessche.
- Preparer's note: Publisher page; quotations come from the abstract on that page.

| Version                                 | Kind                | Date | Precision | Basis                                                                                         |
| --------------------------------------- | ------------------- | ---- | --------- | --------------------------------------------------------------------------------------------- |
| Nature, vol. 529, no. 7587, pp. 484-489 | journal publication | 2016 | year      | Crossref published-print date (year kept; publisher-deposited, not checked against the issue) |

States:

- The paper introduces an approach to computer Go that uses “value networks” to evaluate board positions and “policy networks” to select moves. “Here we introduce a new approach to computer Go that uses ‘value networks’ to evaluate board positions and ‘policy networks’ to select moves.” (publisher page (Nature 529, 484–489), abstract)

Cited by: Deep reinforcement learning from human preferences (PDF p. 12, reference or mention by title); AI safety via debate (PDF p. 23, reference or mention by title); Scalable agent alignment via reward modeling: a research direction (PDF p. 29, reference or mention by title); Concrete Problems in AI Safety (PDF p. 28, reference or mention by title); Alignment for Advanced Machine Learning Systems (PDF p. 24, reference or mention by title).

Authorship records: `david-silver`, `laurent-sifre`, `ioannis-antonoglou`, `ilya-sutskever`, `koray-kavukcuoglu`, `demis-hassabis`.

<a id="kp-semi-supervised-classification-graph-convolutional-2016"></a>

#### Semi-Supervised Classification with Graph Convolutional Networks

- ID `kp-semi-supervised-classification-graph-convolutional-2016` (proposed); subtype Research paper (work).
- Basis 2: 38,073 citations in Semantic Scholar (rank 22, 2026-10-28); cited by 0 dataset documents.
- Identifiers: arxiv 1609.02907.
- Authors as printed (paper:kp-semi-supervised-classification-graph-convolutional-2016--v1, first page): “Thomas N. Kipf”, “Max Welling”.
- arXiv comments (author-supplied): “Published as a conference paper at ICLR 2017”

| Version            | Kind             | Date       | Precision | Basis                          |
| ------------------ | ---------------- | ---------- | --------- | ------------------------------ |
| arXiv:1609.02907v1 | arXiv submission | 2016-09-09 | day       | arXiv submission history (UTC) |
| arXiv:1609.02907v2 | arXiv submission | 2016-10-24 | day       | arXiv submission history (UTC) |
| arXiv:1609.02907v3 | arXiv submission | 2016-11-03 | day       | arXiv submission history (UTC) |
| arXiv:1609.02907v4 | arXiv submission | 2017-02-22 | day       | arXiv submission history (UTC) |

States:

- The paper presents an approach to semi-supervised learning on graph-structured data based on a variant of convolutional neural networks that operate directly on graphs. “We present a scalable approach for semi-supervised learning on graph-structured data that is based on an efficient variant of convolutional neural networks which operate directly on graphs.” (arXiv v1, PDF p. 1, abstract)

<a id="acemoglu-restrepo-2016-race-between-machine-and-man"></a>

#### The Race Between Machine and Man: Implications of Technology for Growth, Factor Shares and Employment

- ID `acemoglu-restrepo-2016-race-between-machine-and-man` (existing dataset document); subtype Working paper.
- Basis 1: cited by 6 dataset documents.
- Identifiers: doi 10.2139/ssrn.2781320.
- Authors as printed (corpus:source-acemoglu-restrepo-2016-race-between-machine-and-man, first page): “Daron Acemoglu”, “Pascual Restrepo”.

| Version                                                                                                                                                                                                  | Kind                       | Date    | Precision | Basis                                                                     |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | ------- | --------- | ------------------------------------------------------------------------- |
| The Race Between Machine and Man: Implications of Technology for Growth, Factor Shares and Employment (Full text (revised version). Current copy retrieved directly on 2026-10-09; no archive capture (W | as recorded in the dataset | 2016-05 | month     | dataset source source-acemoglu-restrepo-2016-race-between-machine-and-man |

States:

- The authors state that they examine concerns that new technologies will make labor redundant, using a framework in which tasks can be automated and new tasks in which labor has a comparative advantage can be created. “We examine the concerns that new technologies will render labor redundant in a framework in which tasks previously performed by labor can be automated and new versions of existing tasks, in which labor has a comparative advantage, can be created.” (NBER Working Paper 22252 (May 2016, revised June 2017 version), PDF p. 2, abstract)

Cited by: Artificial Intelligence and the Modern Productivity Paradox: A Clash of Expectations and Statistics (PDF p. 38, reference or mention by title); Artificial Intelligence and Its Implications for Income Distribution and Unemployment (PDF p. 41, reference or mention by title); Artificial Intelligence, Automation and Work (PDF p. 41, reference or mention by title); Prediction, Judgment and Complexity: A Theory of Decision Making and Artificial Intelligence (PDF p. 26, reference or mention by title); AI and the Economy (PDF p. 29, reference or mention by title); Economic Policy for Artificial Intelligence (PDF p. 23, reference or mention by title).

<a id="kp-xgboost-scalable-tree-boosting-system-2016"></a>

#### XGBoost: A Scalable Tree Boosting System

- ID `kp-xgboost-scalable-tree-boosting-system-2016` (proposed); subtype Research paper (work).
- Basis 2: 64,954 citations in Semantic Scholar (rank 9, 2026-10-28); cited by 0 dataset documents.
- Identifiers: arxiv 1603.02754; doi 10.1145/2939672.2939785.
- Authors as printed (paper:kp-xgboost-scalable-tree-boosting-system-2016--v1, first page): “Tianqi Chen”, “Carlos Guestrin”.
- arXiv comments (author-supplied): “KDD'16 changed all figures to type1”

| Version                                                                                                         | Kind                   | Date       | Precision | Basis                                                                                         |
| --------------------------------------------------------------------------------------------------------------- | ---------------------- | ---------- | --------- | --------------------------------------------------------------------------------------------- |
| Proceedings of the 22nd ACM SIGKDD International Conference on Knowledge Discovery and Data Mining, pp. 785-794 | conference publication | 2016       | year      | Crossref published-print date (year kept; publisher-deposited, not checked against the issue) |
| arXiv:1603.02754v1                                                                                              | arXiv submission       | 2016-03-09 | day       | arXiv submission history (UTC)                                                                |
| arXiv:1603.02754v2                                                                                              | arXiv submission       | 2016-05-23 | day       | arXiv submission history (UTC)                                                                |
| arXiv:1603.02754v3                                                                                              | arXiv submission       | 2016-06-10 | day       | arXiv submission history (UTC)                                                                |

States:

- The paper describes XGBoost, a scalable machine learning system for tree boosting. “In this paper, we describe XGBoost, a scalable machine learning system for tree boosting.” (arXiv v1, PDF p. 1, §1 Introduction, para. 3)
- The paper proposes a sparsity-aware algorithm for sparse data and a weighted quantile sketch for approximate tree learning. “We propose a novel sparsity-aware algorithm for sparse data and weighted quantile sketch for approximate tree learning.” (arXiv v1, PDF p. 1, abstract)

Authorship records: `carlos-guestrin` (proposed).

### 2017

<a id="kp-unified-approach-interpreting-model-predictions-2017"></a>

#### A Unified Approach to Interpreting Model Predictions

- ID `kp-unified-approach-interpreting-model-predictions-2017` (proposed); subtype Research paper (work).
- Basis 2: 44,356 citations in Semantic Scholar (rank 18, 2026-10-28); cited by 0 dataset documents.
- Identifiers: arxiv 1705.07874; doi 10.9728/dcs.2024.25.7.1847.
- Authors as printed (paper:kp-unified-approach-interpreting-model-predictions-2017--v1, first page): “Scott M. Lundberg”, “Su-In Lee”.
- arXiv comments (author-supplied): “To appear in NIPS 2017”

| Version                                                            | Kind                | Date       | Precision | Basis                                                                                         |
| ------------------------------------------------------------------ | ------------------- | ---------- | --------- | --------------------------------------------------------------------------------------------- |
| arXiv:1705.07874v1                                                 | arXiv submission    | 2017-05-22 | day       | arXiv submission history (UTC)                                                                |
| arXiv:1705.07874v2                                                 | arXiv submission    | 2017-11-25 | day       | arXiv submission history (UTC)                                                                |
| Journal of Digital Contents Society, vol. 25, no. 7, pp. 1847-1860 | journal publication | 2024       | year      | Crossref published-print date (year kept; publisher-deposited, not checked against the issue) |

States:

- The paper presents SHAP (SHapley Additive exPlanations), a framework for interpreting predictions that assigns each feature an importance for a particular prediction. “Here, we present a unified framework for interpreting predictions, namely SHAP (SHapley Additive exPlanations), which assigns each feature an importance for a particular prediction.” (arXiv v1, PDF p. 1, abstract)

<a id="aghion-jones-jones-2017-ai-and-economic-growth"></a>

#### Artificial Intelligence and Economic Growth

- ID `aghion-jones-jones-2017-ai-and-economic-growth` (existing dataset document); subtype Working paper.
- Basis 1: cited by 10 dataset documents.
- Identifiers: none.
- Authors as printed (corpus:source-aghion-jones-jones-2017-nber-capture, first page): “Philippe Aghion”, “Benjamin F. Jones”, “Charles I. Jones”.

| Version                                                                                                                                                                                                  | Kind                       | Date    | Precision | Basis                                                      |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | ------- | --------- | ---------------------------------------------------------- |
| Artificial Intelligence and Economic Growth (Wayback capture of the NBER PDF (w23928); compared with the author-hosted Version 1.0 (web.stanford.edu/~chadj/AI.pdf, 2018 capture). Capture retrieved 202 | as recorded in the dataset | 2017-10 | month     | dataset source source-aghion-jones-jones-2017-nber-capture |

States:

- The paper states that it examines the potential impact of artificial intelligence on economic growth. “This paper examines the potential impact of artificial intelligence (A.I.) on economic growth.” (NBER Working Paper 23928, PDF p. 2, abstract)
- The authors state that their goal is to refine a set of questions about artificial intelligence and economic growth and to contribute to an agenda for the field. “The goal throughout is to refine a set of critical questions about A.I. and economic growth and to contribute to shaping an agenda for the field.” (NBER Working Paper 23928, PDF p. 2, abstract)

Attributed-credit records (the citing document’s own attribution):

- [summarises an argument or finding] Benzell et al. attribute to Aghion, Jones and Jones (2017) the argument connecting AI to the recent decline in labour's output share. “Aghion and his co-authors connect AI to the recent decline in labor’s output share.” (Robots Are Us: Some Economics of Human Replacement, PDF p. 6, literature discussion; wording attested 2018-10: The copy read is NBER Working Paper 20941 as revised in October 2018; it cites works of 2015 and 2017, so this wording is attested only from the revision.)
- [builds on] In The Great Inflection? (2023), Matt Clancy attributes to Aghion, Jones and Jones the model of innovation with AI that he then sketches to illustrate what explosive growth would require. “a model of innovation with AI by economists Philippe Aghion, Benjamin Jones, and Charles Jones” (The Great Inflection? A Debate About AI and Explosive Growth, page text, Matt Clancy's reply to the first question)

Cited by: Economic Growth under Transformative AI: A guide to the vast range of possibilities for output growth, wages, and the labor share (PDF p. 67, reference or mention by title); The Great Inflection? A Debate About AI and Explosive Growth (reference or mention by title); Explosive growth from AI automation: A review of the arguments (PDF p. 24, reference or mention by title); Robots Are Us: Some Economics of Human Replacement (PDF p. 6, reference or mention by title); Artificial Intelligence and Its Implications for Income Distribution and Unemployment (PDF p. 41, reference or mention by title); Artificial Intelligence, Automation and Work (PDF p. 41, reference or mention by title); Economic Policy for Artificial Intelligence (PDF p. 23, reference or mention by title); Ovatko hyvät johtamismenetelmät talouskasvun lähde? (pääkirjoitus) (PDF p. 3, reference or mention by title); The A.I. Dilemma: Growth versus Existential Risk (PDF p. 21, reference or mention by title); How Much Should We Spend to Reduce A.I.'s Existential Risk? (PDF p. 20, reference or mention by title).

<a id="attention-all-you-need"></a>

#### Attention Is All You Need

- ID `attention-all-you-need` (existing dataset document); subtype Research paper (work).
- Basis 1: cited by 18 dataset documents.
- Identifiers: arxiv 1706.03762.
- Authors as printed (paper:attention-all-you-need--v1, first page): “Ashish Vaswani”, “Noam Shazeer”, “Niki Parmar”, “Jakob Uszkoreit”, “Llion Jones”, “Aidan N. Gomez”, “Łukasz Kaiser”, “Illia Polosukhin”.
- arXiv comments (author-supplied): “15 pages, 5 figures”

| Version            | Kind             | Date       | Precision | Basis                          |
| ------------------ | ---------------- | ---------- | --------- | ------------------------------ |
| arXiv:1706.03762v1 | arXiv submission | 2017-06-12 | day       | arXiv submission history (UTC) |
| arXiv:1706.03762v2 | arXiv submission | 2017-06-19 | day       | arXiv submission history (UTC) |
| arXiv:1706.03762v3 | arXiv submission | 2017-06-20 | day       | arXiv submission history (UTC) |
| arXiv:1706.03762v4 | arXiv submission | 2017-06-30 | day       | arXiv submission history (UTC) |
| arXiv:1706.03762v5 | arXiv submission | 2017-12-06 | day       | arXiv submission history (UTC) |
| arXiv:1706.03762v6 | arXiv submission | 2023-07-24 | day       | arXiv submission history (UTC) |
| arXiv:1706.03762v7 | arXiv submission | 2023-08-02 | day       | arXiv submission history (UTC) |

States:

- The paper proposes a network architecture, the Transformer, that relies only on attention mechanisms and does not use recurrence or convolutions. “We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely.” (arXiv v1, PDF p. 1, abstract)

Cited by: Scaling Laws for Neural Language Models (PDF p. 30, reference or mention by title); Training Compute-Optimal Large Language Models (PDF p. 20, reference or mention by title); Learning to summarize from human feedback (PDF p. 13, reference or mention by title); Supervising strong learners by amplifying weak experts (PDF p. 9, reference or mention by title); Self-critiquing models for assisting human evaluators (PDF p. 23, reference or mention by title); Highly accurate protein structure prediction with AlphaFold (2021) (reference or mention by title); LLaMA (2023 paper) (reference or mention by title); DeepSeek-V3 Technical Report (reference or mention by title); Qwen Technical Report (reference or mention by title); ChatGLM research history and techniques (reference or mention by title); ERNIE 2.0: A Continual Pre-training Framework for Language Understanding (PDF p. 10, reference or mention by title); ERNIE: Enhanced Representation through Knowledge Integration (PDF p. 7, reference or mention by title); ERNIE 3.0 Titan: Exploring Larger-scale Knowledge Enhanced Pre-training for Language Understanding and Generation (PDF p. 27, reference or mention by title); Kimi K2: Open Agentic Intelligence (PDF p. 23, reference or mention by title); Kimi K3: Open Frontier Intelligence (PDF p. 39, reference or mention by title); Seed-X: Building Strong Multilingual Translation LLM with 7B Parameters (PDF p. 14, reference or mention by title); source-gemini-report-v1 (PDF p. 33, reference by arXiv identifier); lg-src-new-yogatama-dm-2019 (PDF p. 14, reference or mention by title).

Authorship records: `noam-shazeer`, `niki-parmar`, `jakob-uszkoreit`, `llion-jones`, `aidan-gomez`, `lukasz-kaiser`, `illia-polosukhin`.

<a id="kp-decoupled-weight-decay-regularization-2017"></a>

#### Decoupled Weight Decay Regularization

- ID `kp-decoupled-weight-decay-regularization-2017` (proposed); subtype Research paper (work).
- Basis 1: cited by 5 dataset documents.
- Identifiers: arxiv 1711.05101.
- Authors as printed (paper:kp-decoupled-weight-decay-regularization-2017--v1, first page): “Ilya Loshchilov”, “Frank Hutter”.
- arXiv comments (author-supplied): “Published as a conference paper at ICLR 2019”

| Version            | Kind             | Date       | Precision | Basis                          |
| ------------------ | ---------------- | ---------- | --------- | ------------------------------ |
| arXiv:1711.05101v1 | arXiv submission | 2017-11-14 | day       | arXiv submission history (UTC) |
| arXiv:1711.05101v2 | arXiv submission | 2018-02-14 | day       | arXiv submission history (UTC) |
| arXiv:1711.05101v3 | arXiv submission | 2019-01-04 | day       | arXiv submission history (UTC) |

States:

- The paper proposes decoupling weight decay from the optimization steps taken with respect to the loss function, to resolve what it describes as a limitation of common implementations of adaptive gradient algorithms such as Adam. “We propose a simple way to resolve this issue by decoupling weight decay and the optimization steps taken w.r.t. the loss function.” (arXiv v1, PDF p. 1, abstract)

Cited by: Training Compute-Optimal Large Language Models (PDF p. 19, reference or mention by title); LLaMA (2023 paper) (reference by arXiv identifier); DeepSeek-V3 Technical Report (reference by arXiv identifier); Qwen Technical Report (reference by arXiv identifier); Kimi K2: Open Agentic Intelligence (PDF p. 22, reference or mention by title).

<a id="human-preferences-paper"></a>

#### Deep reinforcement learning from human preferences

- ID `human-preferences-paper` (existing dataset document); subtype Research paper (work).
- Basis 1: cited by 11 dataset documents.
- Identifiers: arxiv 1706.03741.
- Authors as printed (paper:human-preferences-paper--v1, first page): “Paul F Christiano”, “Jan Leike”, “Tom B Brown”, “Miljan Martic”, “Shane Legg”, “Dario Amodei”.

| Version            | Kind             | Date       | Precision | Basis                          |
| ------------------ | ---------------- | ---------- | --------- | ------------------------------ |
| arXiv:1706.03741v1 | arXiv submission | 2017-06-12 | day       | arXiv submission history (UTC) |
| arXiv:1706.03741v2 | arXiv submission | 2017-07-02 | day       | arXiv submission history (UTC) |
| arXiv:1706.03741v3 | arXiv submission | 2017-07-13 | day       | arXiv submission history (UTC) |
| arXiv:1706.03741v4 | arXiv submission | 2023-02-17 | day       | arXiv submission history (UTC) |

States:

- The authors state that learning from non-expert human preferences between pairs of trajectory segments can solve complex RL tasks, including Atari games and simulated robot locomotion, without access to the reward function, and the paper reports feedback on less than 1% of the agent's interactions. “We show that this approach can effectively solve complex RL tasks without access to the reward function, including Atari games and simulated robot locomotion, while providing feedback on less than 1% of our agent’s interactions with the environment.” (arXiv v1, PDF p. 1, abstract)

Attributed-credit records (the citing document’s own attribution):

- [builds on] Ouyang et al. (2022), stating that they build on reinforcement learning from human feedback, cite Christiano et al. (2017), with Ibarz et al. (2018), for its original development on simulated robots and Atari games. “Originally developed for training simple robots in simulated environments and Atari games (Christiano et al., 2017; Ibarz et al., 2018), it has recently been applied to fine-tuning language models to summarize text” (Training language models to follow instructions with human feedback, PDF p. 4, §2 Related work, para. 1)

Cited by: Learning to summarize from human feedback (PDF p. 11, reference or mention by title); Training language models to follow instructions with human feedback (PDF p. 22, reference or mention by title); Supervising strong learners by amplifying weak experts (PDF p. 9, reference or mention by title); AI safety via debate (PDF p. 23, reference or mention by title); Scalable agent alignment via reward modeling: a research direction (PDF p. 24, reference or mention by title); Self-critiquing models for assisting human evaluators (PDF p. 21, reference or mention by title); Weak-to-Strong Generalization: Eliciting Strong Capabilities With Weak Supervision (PDF p. 20, reference or mention by title); GPT-4 System Card (PDF p. 32, reference or mention by title); Learning through human feedback — DeepMind account (2017) (reference or mention by title); Qwen Technical Report (reference or mention by title); Shah and Yudkowsky on alignment failures (reference by arXiv identifier).

Authorship records: `tom-b-brown` (proposed), `miljan-martic` (proposed).

<a id="kp-graph-attention-networks-2017"></a>

#### Graph Attention Networks

- ID `kp-graph-attention-networks-2017` (proposed); subtype Research paper (work).
- Basis 2: 29,243 citations in Semantic Scholar (rank 34, 2026-10-28); cited by 0 dataset documents.
- Identifiers: arxiv 1710.10903; doi 10.17863/cam.48429.
- Authors as printed (paper:kp-graph-attention-networks-2017--v1, first page): “Petar Veličkovic”, “Guillem Cucurull”, “Arantxa Casanova”, “Adriana Romero”, “Pietro Lio”, “Yoshua Bengio”.
- arXiv comments (author-supplied): “To appear at ICLR 2018. 12 pages, 2 figures”

| Version            | Kind             | Date       | Precision | Basis                          |
| ------------------ | ---------------- | ---------- | --------- | ------------------------------ |
| arXiv:1710.10903v1 | arXiv submission | 2017-10-30 | day       | arXiv submission history (UTC) |
| arXiv:1710.10903v2 | arXiv submission | 2017-12-20 | day       | arXiv submission history (UTC) |
| arXiv:1710.10903v3 | arXiv submission | 2018-02-04 | day       | arXiv submission history (UTC) |

States:

- The paper presents graph attention networks (GATs), which it describes as novel neural network architectures for graph-structured data that use masked self-attentional layers to address shortcomings of prior graph-convolution methods. “We present graph attention networks (GATs), novel neural network architectures that operate on graph-structured data, leveraging masked self-attentional layers to address the shortcomings of prior methods based on graph convolutions or their approximations.” (arXiv v1, PDF p. 1, abstract)

Authorship records: `guillem-cucurull` (proposed), `yoshua-bengio` (proposed).

<a id="kp-mobilenets-efficient-convolutional-neural-networks-2017"></a>

#### MobileNets: Efficient Convolutional Neural Networks for Mobile Vision Applications

- ID `kp-mobilenets-efficient-convolutional-neural-networks-2017` (proposed); subtype Research paper (work).
- Basis 2: 26,492 citations in Semantic Scholar (rank 40, 2026-10-28); cited by 0 dataset documents.
- Identifiers: arxiv 1704.04861.
- Authors as printed (paper:kp-mobilenets-efficient-convolutional-neural-networks-2017--v1, first page): “Andrew G. Howard”, “Menglong Zhu”, “Bo Chen”, “Dmitry Kalenichenko”, “Weijun Wang”, “Tobias Weyand”, “Marco Andreetto”, “Hartwig Adam”.

| Version            | Kind             | Date       | Precision | Basis                          |
| ------------------ | ---------------- | ---------- | --------- | ------------------------------ |
| arXiv:1704.04861v1 | arXiv submission | 2017-04-17 | day       | arXiv submission history (UTC) |

States:

- The paper presents a class of models called MobileNets, intended for mobile and embedded vision applications. “We present a class of efficient models called MobileNets for mobile and embedded vision applications.” (arXiv v1, PDF p. 1, abstract)

<a id="ppo-paper"></a>

#### Proximal Policy Optimization Algorithms

- ID `ppo-paper` (existing dataset document); subtype Research paper (work).
- Basis 1: cited by 7 dataset documents.
- Identifiers: arxiv 1707.06347.
- Authors as printed (paper:ppo-paper--v1, first page): “John Schulman”, “Filip Wolski”, “Prafulla Dhariwal”, “Alec Radford”, “Oleg Klimov”.

| Version            | Kind             | Date       | Precision | Basis                          |
| ------------------ | ---------------- | ---------- | --------- | ------------------------------ |
| arXiv:1707.06347v1 | arXiv submission | 2017-07-20 | day       | arXiv submission history (UTC) |
| arXiv:1707.06347v2 | arXiv submission | 2017-08-28 | day       | arXiv submission history (UTC) |

States:

- The paper introduces an algorithm, proximal policy optimization, that it states attains the data efficiency and reliable performance of TRPO while using only first-order optimization. “This paper seeks to improve the current state of affairs by introducing an algorithm that attains the data efficiency and reliable performance of TRPO, while using only first-order optimization.” (arXiv v1, PDF p. 1, §1 Introduction, para. 2)

Cited by: An Empirical Model of Large-Batch Training (PDF p. 34, reference by arXiv identifier); Learning to summarize from human feedback (PDF p. 13, reference by arXiv identifier); Training language models to follow instructions with human feedback (PDF p. 24, reference by arXiv identifier); Scalable agent alignment via reward modeling: a research direction (PDF p. 28, reference by arXiv identifier); GPT-4 System Card (PDF p. 37, reference or mention by title); Qwen Technical Report (reference by arXiv identifier); Seed-X: Building Strong Multilingual Translation LLM with 7B Parameters (PDF p. 16, reference by arXiv identifier).

Authorship records: `prafulla-dhariwal` (proposed), `alec-radford` (proposed).

<a id="kp-race-large-scale-reading-comprehension-2017"></a>

#### RACE: Large-scale ReAding Comprehension Dataset From Examinations

- ID `kp-race-large-scale-reading-comprehension-2017` (proposed); subtype Research paper (work).
- Basis 1: cited by 5 dataset documents.
- Identifiers: arxiv 1704.04683; doi 10.18653/v1/d17-1082.
- Authors as printed (paper:kp-race-large-scale-reading-comprehension-2017--v1, first page): “Guokun Lai”, “Qizhe Xie”, “Hanxiao Liu”, “Yiming Yang”, “Eduard Hovy”.
- arXiv comments (author-supplied): “EMNLP 2017”

| Version                                                                                             | Kind                   | Date       | Precision | Basis                                                                                         |
| --------------------------------------------------------------------------------------------------- | ---------------------- | ---------- | --------- | --------------------------------------------------------------------------------------------- |
| Proceedings of the 2017 Conference on Empirical Methods in Natural Language Processing, pp. 785-794 | conference publication | 2017       | year      | Crossref published-print date (year kept; publisher-deposited, not checked against the issue) |
| arXiv:1704.04683v1                                                                                  | arXiv submission       | 2017-04-15 | day       | arXiv submission history (UTC)                                                                |
| arXiv:1704.04683v2                                                                                  | arXiv submission       | 2017-04-30 | day       | arXiv submission history (UTC)                                                                |
| arXiv:1704.04683v3                                                                                  | arXiv submission       | 2017-06-10 | day       | arXiv submission history (UTC)                                                                |
| arXiv:1704.04683v4                                                                                  | arXiv submission       | 2017-07-15 | day       | arXiv submission history (UTC)                                                                |
| arXiv:1704.04683v5                                                                                  | arXiv submission       | 2017-12-05 | day       | arXiv submission history (UTC)                                                                |

States:

- The paper presents RACE, a dataset for benchmark evaluation of reading comprehension methods. “We present RACE, a new dataset for benchmark evaluation of methods in the reading comprehension task.” (arXiv v1, PDF p. 1, abstract)

Cited by: Training Compute-Optimal Large Language Models (PDF p. 18, reference or mention by title); Self-critiquing models for assisting human evaluators (PDF p. 22, reference by arXiv identifier); Claude 2 model card (PDF p. 13, reference or mention by title); LLaMA (2023 paper) (reference by arXiv identifier); DeepSeek-V3 Technical Report (reference or mention by title).

<a id="kp-squeeze-excitation-networks-2017"></a>

#### Squeeze-and-Excitation Networks

- ID `kp-squeeze-excitation-networks-2017` (proposed); subtype Research paper (work).
- Basis 2: 37,490 citations in Semantic Scholar (rank 23, 2026-10-28); cited by 0 dataset documents.
- Identifiers: arxiv 1709.01507; doi 10.1109/cvpr.2018.00745.
- Authors as printed (paper:kp-squeeze-excitation-networks-2017--v1, first page): “Jie Hu”, “Li Shen”, “Gang Sun”.
- arXiv comments (author-supplied): “journal version of the CVPR 2018 paper, accepted by TPAMI”

| Version                                                                            | Kind                   | Date       | Precision | Basis                                                                                         |
| ---------------------------------------------------------------------------------- | ---------------------- | ---------- | --------- | --------------------------------------------------------------------------------------------- |
| arXiv:1709.01507v1                                                                 | arXiv submission       | 2017-09-05 | day       | arXiv submission history (UTC)                                                                |
| 2018 IEEE/CVF Conference on Computer Vision and Pattern Recognition, pp. 7132-7141 | conference publication | 2018       | year      | Crossref published-print date (year kept; publisher-deposited, not checked against the issue) |
| arXiv:1709.01507v2                                                                 | arXiv submission       | 2018-04-05 | day       | arXiv submission history (UTC)                                                                |
| arXiv:1709.01507v3                                                                 | arXiv submission       | 2018-10-25 | day       | arXiv submission history (UTC)                                                                |
| arXiv:1709.01507v4                                                                 | arXiv submission       | 2019-05-16 | day       | arXiv submission history (UTC)                                                                |

States:

- The paper proposes an architectural unit, the Squeeze-and-Excitation (SE) block, which it states adaptively recalibrates channel-wise feature responses by modelling interdependencies between channels. “In this work, we focus on channels and propose a novel architectural unit, which we term the “Squeeze-and-Excitation”(SE) block, that adaptively recalibrates channel-wise feature responses by explicitly modelling interdependencies between channels.” (arXiv v1, PDF p. 1, abstract)

<a id="kp-triviaqa-large-scale-distantly-supervised-2017"></a>

#### TriviaQA: A Large Scale Distantly Supervised Challenge Dataset for Reading Comprehension

- ID `kp-triviaqa-large-scale-distantly-supervised-2017` (proposed); subtype Research paper (work).
- Basis 1: cited by 6 dataset documents.
- Identifiers: arxiv 1705.03551; doi 10.18653/v1/p17-1147.
- Authors as printed (paper:kp-triviaqa-large-scale-distantly-supervised-2017--v1, first page): “Mandar Joshi”, “Eunsol Choi”, “Daniel S. Weld”, “Luke Zettlemoyer”.
- arXiv comments (author-supplied): “Added references, fixed typos, minor baseline update”

| Version                                                                                                                        | Kind                   | Date       | Precision | Basis                                                                                         |
| ------------------------------------------------------------------------------------------------------------------------------ | ---------------------- | ---------- | --------- | --------------------------------------------------------------------------------------------- |
| Proceedings of the 55th Annual Meeting of the Association for Computational Linguistics (Volume 1: Long Papers), pp. 1601-1611 | conference publication | 2017       | year      | Crossref published-print date (year kept; publisher-deposited, not checked against the issue) |
| arXiv:1705.03551v1                                                                                                             | arXiv submission       | 2017-05-09 | day       | arXiv submission history (UTC)                                                                |
| arXiv:1705.03551v2                                                                                                             | arXiv submission       | 2017-05-13 | day       | arXiv submission history (UTC)                                                                |

States:

- The paper presents TriviaQA, a reading comprehension dataset that it reports contains over 650K question-answer-evidence triples. “We present TriviaQA, a challenging reading comprehension dataset containing over 650K question-answer-evidence triples.” (arXiv v1, PDF p. 1, abstract)

Cited by: Training Compute-Optimal Large Language Models (PDF p. 18, reference by arXiv identifier); Claude 2 model card (PDF p. 13, reference or mention by title); LLaMA (2023 paper) (reference by arXiv identifier); DeepSeek-V3 Technical Report (reference or mention by title); Kimi K2: Open Agentic Intelligence (PDF p. 22, reference by arXiv identifier); lg-src-new-yogatama-dm-2019 (PDF p. 13, reference or mention by title).

Authorship records: `mandar-joshi` (proposed), `luke-zettlemoyer` (proposed).

### 2018

<a id="debate-paper"></a>

#### AI safety via debate

- ID `debate-paper` (existing dataset document); subtype Research paper (work).
- Basis 1: cited by 6 dataset documents.
- Identifiers: arxiv 1805.00899.
- Authors as printed (paper:debate-paper--v1, first page): “Geoffrey Irving”, “Paul Christiano”, “Dario Amodei”.
- arXiv comments (author-supplied): “24 pages, 6 figures”

| Version            | Kind             | Date       | Precision | Basis                          |
| ------------------ | ---------------- | ---------- | --------- | ------------------------------ |
| arXiv:1805.00899v1 | arXiv submission | 2018-05-02 | day       | arXiv submission history (UTC) |
| arXiv:1805.00899v2 | arXiv submission | 2018-10-22 | day       | arXiv submission history (UTC) |

States:

- The paper proposes training agents via self-play on a zero-sum debate game, as a way to address tasks too complicated for a human to judge directly. “To help address this concern, we propose training agents via self play on a zero sum debate game.” (arXiv v1, PDF p. 1, abstract)

Attributed-credit records (the citing document’s own attribution):

- [builds on] Leike et al. (2018) attribute the complexity-theory analogy they use to support their assumption that evaluation is easier than production to Irving et al. (2018). “This analogy to complexity theory, first introduced by Irving et al. (2018), provides two important insights” (Scalable agent alignment via reward modeling: a research direction, PDF p. 9, §3.2 Recursive reward modeling)

Cited by: Training language models to follow instructions with human feedback (PDF p. 23, reference by arXiv identifier); Supervising strong learners by amplifying weak experts (PDF p. 9, reference by arXiv identifier); Scalable agent alignment via reward modeling: a research direction (PDF p. 26, reference by arXiv identifier); Self-critiquing models for assisting human evaluators (PDF p. 21, reference by arXiv identifier); Weak-to-Strong Generalization: Eliciting Strong Capabilities With Weak Supervision (PDF p. 22, reference by arXiv identifier); Without specific countermeasures, the easiest path to transformative AI likely leads to AI takeover (reference by arXiv identifier).

Authorship records: `geoffrey-irving` (proposed), `dario-amodei`.

<a id="kp-bert-pre-training-deep-bidirectional-2019"></a>

#### BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding

- ID `kp-bert-pre-training-deep-bidirectional-2019` (proposed); subtype Research paper (work).
- Basis 1: cited by 11 dataset documents.
- Identifiers: arxiv 1810.04805; doi 10.18653/v1/n19-1423.
- Authors as printed (paper:kp-bert-pre-training-deep-bidirectional-2019--v1, first page): “Jacob Devlin”, “Ming-Wei Chang”, “Kenton Lee”, “Kristina Toutanova”.

| Version                                                                                                                                                                                         | Kind                   | Date       | Precision | Basis                                                                                         |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | ---------- | --------- | --------------------------------------------------------------------------------------------- |
| arXiv:1810.04805v1                                                                                                                                                                              | arXiv submission       | 2018-10-11 | day       | arXiv submission history (UTC)                                                                |
| Proceedings of the 2019 Conference of the North American Chapter of the Association for Computational Linguistics: Human Language Technologies, Volume 1 (Long and Short Papers), pp. 4171-4186 | conference publication | 2019       | year      | Crossref published-print date (year kept; publisher-deposited, not checked against the issue) |
| arXiv:1810.04805v2                                                                                                                                                                              | arXiv submission       | 2019-05-24 | day       | arXiv submission history (UTC)                                                                |

States:

- The paper introduces a language representation model called BERT (Bidirectional Encoder Representations from Transformers). “We introduce a new language representation model called BERT, which stands for Bidirectional Encoder Representations from Transformers.” (arXiv v1, PDF p. 1, abstract)

Cited by: Scaling Laws for Neural Language Models (PDF p. 28, reference by arXiv identifier); Highly accurate protein structure prediction with AlphaFold (2021) (reference or mention by title); LLaMA (2023 paper) (reference by arXiv identifier); Qwen Technical Report (reference by arXiv identifier); GPTs are GPTs: An Early Look at the Labor Market Impact Potential of Large Language Models (PDF p. 33, reference by arXiv identifier); ERNIE 2.0: A Continual Pre-training Framework for Language Understanding (PDF p. 10, reference by arXiv identifier); ERNIE: Enhanced Representation through Knowledge Integration (PDF p. 7, reference by arXiv identifier); ERNIE 3.0: Large-scale Knowledge Enhanced Pre-training for Language Understanding and Generation (PDF p. 18, reference by arXiv identifier); ERNIE 3.0 Titan: Exploring Larger-scale Knowledge Enhanced Pre-training for Language Understanding and Generation (PDF p. 23, reference by arXiv identifier); lg-src-goo-codex-v1 (PDF p. 16, reference by arXiv identifier); lg-src-new-yogatama-dm-2019 (PDF p. 12, reference or mention by title).

Authorship records: `jacob-devlin` (proposed), `ming-wei-chang` (proposed), `kenton-lee` (proposed), `kristina-toutanova` (proposed).

<a id="kp-cbam-convolutional-block-attention-module-2018"></a>

#### CBAM: Convolutional Block Attention Module

- ID `kp-cbam-convolutional-block-attention-module-2018` (proposed); subtype Research paper (work).
- Basis 2: 26,721 citations in Semantic Scholar (rank 39, 2026-10-28); cited by 0 dataset documents.
- Identifiers: arxiv 1807.06521; doi 10.1007/978-3-030-01234-2_1.
- Authors as printed (paper:kp-cbam-convolutional-block-attention-module-2018--v1, first page): “Sanghyun Woo”, “Jongchan Park”, “Joon-Young Lee”, “In So Kweon”.
- arXiv comments (author-supplied): “Accepted to ECCV 2018”

| Version                                     | Kind             | Date       | Precision | Basis                                                                                         |
| ------------------------------------------- | ---------------- | ---------- | --------- | --------------------------------------------------------------------------------------------- |
| Lecture Notes in Computer Science, pp. 3-19 | book chapter     | 2018       | year      | Crossref published-print date (year kept; publisher-deposited, not checked against the issue) |
| arXiv:1807.06521v1                          | arXiv submission | 2018-07-17 | day       | arXiv submission history (UTC)                                                                |
| arXiv:1807.06521v2                          | arXiv submission | 2018-07-18 | day       | arXiv submission history (UTC)                                                                |

States:

- The paper proposes the Convolutional Block Attention Module (CBAM), an attention module for feed-forward convolutional neural networks. “We propose Convolutional Block Attention Module (CBAM), a simple yet effective attention module for feed-forward convolutional neural networks.” (arXiv v1, PDF p. 1, abstract)

<a id="kp-deep-contextualized-word-representations-2018"></a>

#### Deep contextualized word representations

- ID `kp-deep-contextualized-word-representations-2018` (proposed); subtype Research paper (work).
- Basis 1: cited by 6 dataset documents.
- Identifiers: arxiv 1802.05365; doi 10.18653/v1/n18-1202.
- Authors as printed (paper:kp-deep-contextualized-word-representations-2018--v1, first page): “Matthew E. Peters”, “Mark Neumann”, “Mohit Iyyer”, “Matt Gardner”, “Christopher Clark”, “Kenton Lee”, “Luke Zettlemoyer”.
- arXiv comments (author-supplied): “NAACL 2018. Originally posted to openreview 27 Oct 2017. v2 updated for NAACL camera ready”

| Version                                                                                                                                                                               | Kind                   | Date       | Precision | Basis                                                                                         |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | ---------- | --------- | --------------------------------------------------------------------------------------------- |
| Proceedings of the 2018 Conference of the North American Chapter of the Association for Computational Linguistics: Human Language Technologies, Volume 1 (Long Papers), pp. 2227-2237 | conference publication | 2018       | year      | Crossref published-print date (year kept; publisher-deposited, not checked against the issue) |
| arXiv:1802.05365v1                                                                                                                                                                    | arXiv submission       | 2018-02-15 | day       | arXiv submission history (UTC)                                                                |
| arXiv:1802.05365v2                                                                                                                                                                    | arXiv submission       | 2018-03-22 | day       | arXiv submission history (UTC)                                                                |

States:

- The paper introduces a deep contextualized word representation intended to model both complex characteristics of word use and how these uses vary across linguistic contexts. “We introduce a new type of deep contextualized word representation that models both (1) complex characteristics of word use (e.g., syntax and semantics), and (2) how these uses vary across linguistic contexts (i.e., to model polysemy).” (arXiv v1, PDF p. 1, abstract)

Cited by: ERNIE 2.0: A Continual Pre-training Framework for Language Understanding (PDF p. 10, reference by arXiv identifier); ERNIE: Enhanced Representation through Knowledge Integration (PDF p. 7, reference by arXiv identifier); ERNIE 3.0: Large-scale Knowledge Enhanced Pre-training for Language Understanding and Generation (PDF p. 18, reference by arXiv identifier); ERNIE 3.0 Titan: Exploring Larger-scale Knowledge Enhanced Pre-training for Language Understanding and Generation (PDF p. 23, reference by arXiv identifier); lg-src-goo-codex-v1 (PDF p. 17, reference by arXiv identifier); lg-src-new-yogatama-dm-2019 (PDF p. 13, reference or mention by title).

Authorship records: `christopher-clark` (proposed), `kenton-lee` (proposed), `luke-zettlemoyer` (proposed).

<a id="kp-gpipe-efficient-training-giant-neural-2018"></a>

#### GPipe: Efficient Training of Giant Neural Networks using Pipeline Parallelism

- ID `kp-gpipe-efficient-training-giant-neural-2018` (proposed); subtype Research paper (work).
- Basis 1: cited by 5 dataset documents.
- Identifiers: arxiv 1811.06965.
- Authors as printed (paper:kp-gpipe-efficient-training-giant-neural-2018--v1, first page): “Yanping Huang”, “Youlong Cheng”, “Dehao Chen”, “HyoukJoong Lee”, “Jiquan Ngiam”, “Quoc V. Le”, “Zhifeng Chen”.
- arXiv comments (author-supplied): “11 pages. Work in progress. Copyright 2018 by the authors”

| Version            | Kind             | Date       | Precision | Basis                          |
| ------------------ | ---------------- | ---------- | --------- | ------------------------------ |
| arXiv:1811.06965v1 | arXiv submission | 2018-11-16 | day       | arXiv submission history (UTC) |
| arXiv:1811.06965v2 | arXiv submission | 2018-11-19 | day       | arXiv submission history (UTC) |
| arXiv:1811.06965v3 | arXiv submission | 2018-11-20 | day       | arXiv submission history (UTC) |
| arXiv:1811.06965v4 | arXiv submission | 2018-12-12 | day       | arXiv submission history (UTC) |
| arXiv:1811.06965v5 | arXiv submission | 2019-07-25 | day       | arXiv submission history (UTC) |

States:

- The paper presents GPipe, a pipeline parallelism library for training very large deep neural networks across accelerators. “GPipe is a scalable pipeline parallelism library that enables learning of giant deep neural networks.” (arXiv v1, PDF p. 1, abstract)

Cited by: Scaling Laws for Neural Language Models (PDF p. 29, reference by arXiv identifier); ERNIE 3.0 Titan: Exploring Larger-scale Knowledge Enhanced Pre-training for Language Understanding and Generation (PDF p. 25, reference or mention by title); ERNIE 5.0 Technical Report (PDF p. 31, reference or mention by title); Kimi K2: Open Agentic Intelligence (PDF p. 22, reference or mention by title); Kimi K3: Open Frontier Intelligence (PDF p. 36, reference or mention by title).

Authorship records: `yanping-huang` (proposed), `dehao-chen` (proposed), `hyoukjoong-lee` (proposed), `quoc-le`, `zhifeng-chen` (proposed).

<a id="kp-improving-language-understanding-by-generative-2018"></a>

#### Improving Language Understanding by Generative Pre-Training

- ID `kp-improving-language-understanding-by-generative-2018` (proposed); subtype Research paper (work).
- Basis 1: cited by 10 dataset documents.
- Identifiers: none.
- Authors as printed (paper:kp-improving-language-understanding-by-generative-2018--text, first page): “Alec Radford”, “Karthik Narasimhan”.

No dated version was recorded.

States:

- The authors state that large gains on natural language understanding tasks can be achieved by generative pre-training of a language model on unlabelled text followed by discriminative fine-tuning on each task. “We demonstrate that large gains on these tasks can be realized by generative pre-training of a language model on a diverse corpus of unlabeled text, followed by discriminative fine-tuning on each specific task.” (PDF p. 1, abstract)

Cited by: Scaling Laws for Neural Language Models (PDF p. 29, reference or mention by title); Learning to summarize from human feedback (PDF p. 13, reference or mention by title); Self-critiquing models for assisting human evaluators (PDF p. 22, reference or mention by title); LLaMA (2023 paper) (reference or mention by title); Qwen Technical Report (reference or mention by title); ERNIE 2.0: A Continual Pre-training Framework for Language Understanding (PDF p. 10, reference or mention by title); ERNIE: Enhanced Representation through Knowledge Integration (PDF p. 7, reference or mention by title); ERNIE 3.0: Large-scale Knowledge Enhanced Pre-training for Language Understanding and Generation (PDF p. 18, reference or mention by title); ERNIE 3.0 Titan: Exploring Larger-scale Knowledge Enhanced Pre-training for Language Understanding and Generation (PDF p. 23, reference or mention by title); lg-src-new-yogatama-dm-2019 (PDF p. 13, reference or mention by title).

Authorship records: `alec-radford` (proposed).

<a id="reward-modeling-paper"></a>

#### Scalable agent alignment via reward modeling: a research direction

- ID `reward-modeling-paper` (existing dataset document); subtype Research paper (work).
- Basis 1: cited by 5 dataset documents.
- Identifiers: arxiv 1811.07871.
- Authors as printed (paper:reward-modeling-paper--v1, first page): “Jan Leike”, “David Krueger”, “Tom Everitt”, “Miljan Martic”, “Vishal Maini”, “Shane Legg”.

| Version            | Kind             | Date       | Precision | Basis                          |
| ------------------ | ---------------- | ---------- | --------- | ------------------------------ |
| arXiv:1811.07871v1 | arXiv submission | 2018-11-19 | day       | arXiv submission history (UTC) |

States:

- The paper outlines a research direction for the agent alignment problem based on reward modeling, in which a reward function is learned from interaction with the user and then optimized with reinforcement learning. “We outline a high-level research direction to solve the agent alignment problem centered around reward modeling: learning a reward function from interaction with the user and optimizing the learned reward function with reinforcement learning.” (arXiv v1, PDF p. 1, abstract)

Cited by: Learning to summarize from human feedback (PDF p. 12, reference by arXiv identifier); Training language models to follow instructions with human feedback (PDF p. 23, reference by arXiv identifier); Self-critiquing models for assisting human evaluators (PDF p. 21, reference by arXiv identifier); Weak-to-Strong Generalization: Eliciting Strong Capabilities With Weak Supervision (PDF p. 23, reference by arXiv identifier); Without specific countermeasures, the easiest path to transformative AI likely leads to AI takeover (reference by arXiv identifier).

Authorship records: `miljan-martic` (proposed), `shane-legg`.

<a id="amplification-paper"></a>

#### Supervising strong learners by amplifying weak experts

- ID `amplification-paper` (existing dataset document); subtype Research paper (work).
- Basis 1: cited by 5 dataset documents.
- Identifiers: arxiv 1810.08575.
- Authors as printed (paper:amplification-paper--v1, first page): “Paul Christiano”, “Buck Shlegeris”, “Dario Amodei”.

| Version            | Kind             | Date       | Precision | Basis                          |
| ------------------ | ---------------- | ---------- | --------- | ------------------------------ |
| arXiv:1810.08575v1 | arXiv submission | 2018-10-19 | day       | arXiv submission history (UTC) |

States:

- The paper proposes Iterated Amplification, a training strategy that builds a training signal for difficult problems by combining solutions to easier subproblems. “We propose Iterated Amplification, an alternative training strategy which progressively builds up a training signal for difficult problems by combining solutions to easier subproblems.” (arXiv v1, PDF p. 1, abstract)

Cited by: Learning to summarize from human feedback (PDF p. 11, reference by arXiv identifier); Training language models to follow instructions with human feedback (PDF p. 22, reference by arXiv identifier); Scalable agent alignment via reward modeling: a research direction (PDF p. 24, reference by arXiv identifier); Self-critiquing models for assisting human evaluators (PDF p. 21, reference by arXiv identifier); Weak-to-Strong Generalization: Eliciting Strong Capabilities With Weak Supervision (PDF p. 20, reference by arXiv identifier).

Authorship records: `dario-amodei`.

<a id="acemoglu-restrepo-2018-race-between-man-and-machine"></a>

#### The Race between Man and Machine: Implications of Technology for Growth, Factor Shares, and Employment

- ID `acemoglu-restrepo-2018-race-between-man-and-machine` (existing dataset document); subtype Journal article.
- Basis 1: cited by 5 dataset documents.
- Identifiers: doi 10.1257/aer.20160696.
- Authors as printed (corpus:source-acemoglu-restrepo-2018-race-between-man-and-machine, first page): “Daron Acemoglu”, “Pascual Restrepo”.

| Version                                                                                                                                                                                                  | Kind                       | Date    | Precision | Basis                                                                                         |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | ------- | --------- | --------------------------------------------------------------------------------------------- |
| American Economic Review, vol. 108, no. 6, pp. 1488-1542                                                                                                                                                 | journal publication        | 2018    | year      | Crossref published-print date (year kept; publisher-deposited, not checked against the issue) |
| The Race between Man and Machine: Implications of Technology for Growth, Factor Shares, and Employment (Abstract page only. Current copy retrieved directly on 2026-10-09; no archive capture (Wayback u | as recorded in the dataset | 2018-06 | month     | dataset source source-acemoglu-restrepo-2018-race-between-man-and-machine                     |

States:

- The authors state that they examine concerns that new technologies will render labor redundant, using a framework in which tasks performed by labor can be automated and new tasks in which labor has a comparative advantage can be created. “We examine the concerns that new technologies will render labor redundant in a framework in which tasks previously performed by labor can be automated and new versions of existing tasks, in which labor has a comparative advantage, can be created.” (publisher page (American Economic Review), page text, abstract)

Cited by: Economic Growth under Transformative AI: A guide to the vast range of possibilities for output growth, wages, and the labor share (PDF p. 67, reference or mention by title); The Simple Macroeconomics of AI (PDF p. 47, reference or mention by title); Robots Are Us: Some Economics of Human Replacement (PDF p. 30, reference or mention by title); The Wrong Kind of AI? Artificial Intelligence and the Future of Labor Demand (PDF p. 13, reference or mention by title); GPTs are GPTs: An Early Look at the Labor Market Impact Potential of Large Language Models (PDF p. 31, reference or mention by title).

<a id="kp-unreasonable-effectiveness-deep-features-as-2018"></a>

#### The Unreasonable Effectiveness of Deep Features as a Perceptual Metric

- ID `kp-unreasonable-effectiveness-deep-features-as-2018` (proposed); subtype Research paper (work).
- Basis 2: 21,014 citations in Semantic Scholar (rank 54, 2026-10-28); cited by 0 dataset documents.
- Identifiers: arxiv 1801.03924; doi 10.1109/cvpr.2018.00068.
- Authors as printed (paper:kp-unreasonable-effectiveness-deep-features-as-2018--v1, first page): “Richard Zhang”, “Phillip Isola”, “Alexei A. Efros”, “Eli Shechtman”, “Oliver Wang”.
- arXiv comments (author-supplied): “Accepted to CVPR 2018; Code and data available at [link: https://www.github.com/richzhang/PerceptualSimilarity] this https URL”

| Version                                                                          | Kind                   | Date       | Precision | Basis                                                                                         |
| -------------------------------------------------------------------------------- | ---------------------- | ---------- | --------- | --------------------------------------------------------------------------------------------- |
| 2018 IEEE/CVF Conference on Computer Vision and Pattern Recognition, pp. 586-595 | conference publication | 2018       | year      | Crossref published-print date (year kept; publisher-deposited, not checked against the issue) |
| arXiv:1801.03924v1                                                               | arXiv submission       | 2018-01-11 | day       | arXiv submission history (UTC)                                                                |
| arXiv:1801.03924v2                                                               | arXiv submission       | 2018-04-10 | day       | arXiv submission history (UTC)                                                                |

States:

- The paper introduces a Full Reference Image Quality Assessment (FR-IQA) dataset of human perceptual judgments, which the authors describe as orders of magnitude larger than previous datasets. “To answer these questions, we introduce a new Full Reference Image Quality Assessment (FR-IQA) dataset of perceptual human judgments, orders of magnitude larger than previous datasets.” (arXiv v1, PDF p. 1, abstract)
- The paper reports that deep features outperform previous perceptual metrics by large margins. “We find that deep features outperform all previous metrics by huge margins.” (arXiv v1, PDF p. 1, abstract)

<a id="kp-think-you-have-solved-question-2018"></a>

#### Think you have Solved Question Answering? Try ARC, the AI2 Reasoning Challenge

- ID `kp-think-you-have-solved-question-2018` (proposed); subtype Research paper (work).
- Basis 1: cited by 6 dataset documents.
- Identifiers: arxiv 1803.05457.
- Authors as printed (paper:kp-think-you-have-solved-question-2018--v1, first page): “Peter Clark”, “Isaac Cowhey”, “Oren Etzioni”, “Tushar Khot”, “Ashish Sabharwal”, “Carissa Schoenick”, “Oyvind Tafjord”.
- arXiv comments (author-supplied): “10 pages, 7 tables, 2 figures”

| Version            | Kind             | Date       | Precision | Basis                          |
| ------------------ | ---------------- | ---------- | --------- | ------------------------------ |
| arXiv:1803.05457v1 | arXiv submission | 2018-03-14 | day       | arXiv submission history (UTC) |

States:

- The paper presents a question set, text corpus and baselines, together called the AI2 Reasoning Challenge (ARC), intended to encourage research in advanced question answering. “We present a new question set, text corpus, and baselines assembled to encourage AI research in advanced question answering.” (arXiv v1, PDF p. 1, abstract)
- The authors state that they release the ARC Corpus of 14M science sentences and implementations of the three neural baseline models they tested. “We are also releasing the ARC Corpus, a corpus of 14M science sentences relevant to the task, and implementations of the three neural baseline models tested.” (arXiv v1, PDF p. 1, abstract)

Cited by: Claude 2 model card (PDF p. 13, reference or mention by title); LLaMA (2023 paper) (reference by arXiv identifier); DeepSeek-V3 Technical Report (reference by arXiv identifier); Qwen Technical Report (reference by arXiv identifier); Kimi K2: Open Agentic Intelligence (PDF p. 21, reference by arXiv identifier); Seed-X: Building Strong Multilingual Translation LLM with 7B Parameters (PDF p. 16, reference by arXiv identifier).

### 2019

<a id="kp-boolq-exploring-surprising-difficulty-natural-2019"></a>

#### BoolQ: Exploring the Surprising Difficulty of Natural Yes/No Questions

- ID `kp-boolq-exploring-surprising-difficulty-natural-2019` (proposed); subtype Research paper (work).
- Basis 1: cited by 5 dataset documents.
- Identifiers: arxiv 1905.10044; doi 10.18653/v1/n19-1300.
- Authors as printed (paper:kp-boolq-exploring-surprising-difficulty-natural-2019--v1, first page): “Christopher Clark”, “Kenton Lee”, “Ming-Wei Chang”, “Tom Kwiatkowski”, “Michael Collins”, “Kristina Toutanova”.
- arXiv comments (author-supplied): “In NAACL 2019”

| Version                                                                                                                                                                                         | Kind                   | Date       | Precision | Basis                                                                                         |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | ---------- | --------- | --------------------------------------------------------------------------------------------- |
| Proceedings of the 2019 Conference of the North American Chapter of the Association for Computational Linguistics: Human Language Technologies, Volume 1 (Long and Short Papers), pp. 2924-2936 | conference publication | 2019       | year      | Crossref published-print date (year kept; publisher-deposited, not checked against the issue) |
| arXiv:1905.10044v1                                                                                                                                                                              | arXiv submission       | 2019-05-24 | day       | arXiv submission history (UTC)                                                                |

States:

- The paper presents BoolQ, a reading comprehension dataset of naturally occurring yes/no questions, which the authors report are unexpectedly challenging. “We build a reading comprehension dataset, BoolQ, of such questions, and show that they are unexpectedly challenging.” (arXiv v1, PDF p. 1, abstract)

Cited by: Training Compute-Optimal Large Language Models (PDF p. 17, reference or mention by title); Weak-to-Strong Generalization: Eliciting Strong Capabilities With Weak Supervision (PDF p. 21, reference or mention by title); LLaMA (2023 paper) (reference by arXiv identifier); Qwen Technical Report (reference or mention by title); source-gemini-report-v1 (PDF p. 26, reference or mention by title).

Authorship records: `christopher-clark` (proposed), `kenton-lee` (proposed), `ming-wei-chang` (proposed), `tom-kwiatkowski` (proposed), `michael-collins` (proposed), `kristina-toutanova` (proposed).

<a id="kp-efficientnet-rethinking-model-scaling-convolutional-2019"></a>

#### EfficientNet: Rethinking Model Scaling for Convolutional Neural Networks

- ID `kp-efficientnet-rethinking-model-scaling-convolutional-2019` (proposed); subtype Research paper (work).
- Basis 2: 27,104 citations in Semantic Scholar (rank 38, 2026-10-28); cited by 1 dataset documents.
- Identifiers: arxiv 1905.11946.
- Authors as printed (paper:kp-efficientnet-rethinking-model-scaling-convolutional-2019--v1, first page): “Mingxing Tan”, “Quoc V. Le”.
- arXiv comments (author-supplied): “ICML 2019”

| Version            | Kind             | Date       | Precision | Basis                          |
| ------------------ | ---------------- | ---------- | --------- | ------------------------------ |
| arXiv:1905.11946v1 | arXiv submission | 2019-05-28 | day       | arXiv submission history (UTC) |
| arXiv:1905.11946v2 | arXiv submission | 2019-06-10 | day       | arXiv submission history (UTC) |
| arXiv:1905.11946v3 | arXiv submission | 2019-11-23 | day       | arXiv submission history (UTC) |
| arXiv:1905.11946v4 | arXiv submission | 2020-09-04 | day       | arXiv submission history (UTC) |
| arXiv:1905.11946v5 | arXiv submission | 2020-09-11 | day       | arXiv submission history (UTC) |

States:

- The paper proposes a scaling method that uniformly scales network depth, width and resolution using what it calls a compound coefficient. “Based on this observation, we propose a new scaling method that uniformly scales all dimensions of depth/width/resolution using a simple yet highly effective compound coefficient.” (arXiv v1, PDF p. 1, abstract)
- The paper describes using neural architecture search to design a baseline network scaled up into a family of models called EfficientNets, which it reports achieve better accuracy and efficiency than previous ConvNets. “To go even further, we use neural architecture search to design a new baseline network and scale it up to obtain a family of models, called EfficientNets, which achieve much better accuracy and efficiency than previous ConvNets.” (arXiv v1, PDF p. 1, abstract)

Cited by: Scaling Laws for Neural Language Models (PDF p. 30, reference by arXiv identifier).

Authorship records: `quoc-le`.

<a id="kp-exploring-limits-transfer-learning-unified-2019"></a>

#### Exploring the Limits of Transfer Learning with a Unified Text-to-Text Transformer

- ID `kp-exploring-limits-transfer-learning-unified-2019` (proposed); subtype Research paper (work).
- Basis 1: cited by 8 dataset documents.
- Identifiers: arxiv 1910.10683.
- Authors as printed (paper:kp-exploring-limits-transfer-learning-unified-2019--v1, first page): “Colin Raffel”, “Noam Shazeer”, “Adam Roberts”, “Katherine Lee”, “Sharan Narang”, “Michael Matena”, “Yanqi Zhou”, “Wei Li”, “Peter J. Liu”.

| Version            | Kind             | Date       | Precision | Basis                          |
| ------------------ | ---------------- | ---------- | --------- | ------------------------------ |
| arXiv:1910.10683v1 | arXiv submission | 2019-10-23 | day       | arXiv submission history (UTC) |
| arXiv:1910.10683v2 | arXiv submission | 2019-10-24 | day       | arXiv submission history (UTC) |
| arXiv:1910.10683v3 | arXiv submission | 2020-07-28 | day       | arXiv submission history (UTC) |
| arXiv:1910.10683v4 | arXiv submission | 2023-09-19 | day       | arXiv submission history (UTC) |

States:

- The paper explores transfer learning techniques for NLP by introducing a unified framework that casts every language problem in a text-to-text format. “In this paper, we explore the landscape of transfer learning techniques for NLP by introducing a unified framework that converts every language problem into a text-to-text format.” (arXiv v1, PDF p. 1, abstract)

Cited by: Scaling Laws for Neural Language Models (PDF p. 29, reference by arXiv identifier); Training Compute-Optimal Large Language Models (PDF p. 19, reference or mention by title); Learning to summarize from human feedback (PDF p. 13, reference by arXiv identifier); LLaMA (2023 paper) (reference or mention by title); Qwen Technical Report (reference or mention by title); ERNIE 3.0: Large-scale Knowledge Enhanced Pre-training for Language Understanding and Generation (PDF p. 17, reference by arXiv identifier); ERNIE 3.0 Titan: Exploring Larger-scale Knowledge Enhanced Pre-training for Language Understanding and Generation (PDF p. 24, reference by arXiv identifier); lg-src-goo-codex-v1 (PDF p. 18, reference by arXiv identifier).

Authorship records: `noam-shazeer`, `adam-roberts` (proposed), `katherine-lee` (proposed), `sharan-narang` (proposed), `yanqi-zhou` (proposed).

<a id="kp-hellaswag-can-machine-really-finish-2019"></a>

#### HellaSwag: Can a Machine Really Finish Your Sentence?

- ID `kp-hellaswag-can-machine-really-finish-2019` (proposed); subtype Research paper (work).
- Basis 1: cited by 8 dataset documents.
- Identifiers: arxiv 1905.07830; doi 10.18653/v1/p19-1472.
- Authors as printed (paper:kp-hellaswag-can-machine-really-finish-2019--v1, first page): “Rowan Zellers”, “Ari Holtzman”, “Yonatan Bisk”, “Ali Farhadi”, “Yejin Choi”.
- arXiv comments (author-supplied): “ACL 2019. Project page at [link: https://rowanzellers.com/hellaswag] this https URL”

| Version                                                                                                | Kind                   | Date       | Precision | Basis                                                                                         |
| ------------------------------------------------------------------------------------------------------ | ---------------------- | ---------- | --------- | --------------------------------------------------------------------------------------------- |
| Proceedings of the 57th Annual Meeting of the Association for Computational Linguistics, pp. 4791-4800 | conference publication | 2019       | year      | Crossref published-print date (year kept; publisher-deposited, not checked against the issue) |
| arXiv:1905.07830v1                                                                                     | arXiv submission       | 2019-05-19 | day       | arXiv submission history (UTC)                                                                |

States:

- The paper presents HellaSwag, a challenge dataset, and states that it shows commonsense inference remains difficult for the strongest models it tested. “In this paper, we show that commonsense inference still proves difficult for even stateof-the-art models, by presenting HellaSwag, a new challenge dataset.” (arXiv v1, PDF p. 1, abstract)

Cited by: Training Compute-Optimal Large Language Models (PDF p. 21, reference or mention by title); Training language models to follow instructions with human feedback (PDF p. 25, reference or mention by title); Weak-to-Strong Generalization: Eliciting Strong Capabilities With Weak Supervision (PDF p. 27, reference or mention by title); LLaMA (2023 paper) (reference by arXiv identifier); DeepSeek-V3 Technical Report (reference or mention by title); Qwen Technical Report (reference or mention by title); Kimi K2: Open Agentic Intelligence (PDF p. 24, reference by arXiv identifier); source-gemini-report-v1 (PDF p. 34, reference by arXiv identifier).

Authorship records: `rowan-zellers` (proposed), `yonatan-bisk` (proposed), `ali-farhadi` (proposed), `yejin-choi` (proposed).

<a id="kp-language-models-unsupervised-multitask-learners-2019"></a>

#### Language Models are Unsupervised Multitask Learners

- ID `kp-language-models-unsupervised-multitask-learners-2019` (proposed); subtype Research paper (work).
- Basis 1: cited by 11 dataset documents.
- Identifiers: none.
- Authors as printed (paper:kp-language-models-unsupervised-multitask-learners-2019--text, first page): “Alec Radford”, “Jeffrey Wu”, “Rewon Child”, “David Luan”, “Dario Amodei”, “Ilya Sutskever”.

No dated version was recorded.

States:

- The authors state that language models begin to learn tasks such as question answering and translation without explicit supervision when trained on WebText, a new dataset of millions of webpages. “We demonstrate that language models begin to learn these tasks without any explicit supervision when trained on a new dataset of millions of webpages called WebText.” (PDF p. 1, abstract)
- The paper describes its largest model, GPT-2, as a 1.5-billion-parameter Transformer and reports that it improves on previously reported results on 7 of 8 tested language modelling datasets in a zero-shot setting while still underfitting WebText. “Our largest model, GPT-2, is a 1.5B parameter Transformer that achieves state of the art results on 7 out of 8 tested language modeling datasets in a zero-shot setting but still underfits WebText.” (PDF p. 1, abstract)

Cited by: Scaling Laws for Neural Language Models (PDF p. 29, reference or mention by title); Learning to summarize from human feedback (PDF p. 13, reference or mention by title); Training language models to follow instructions with human feedback (PDF p. 24, reference or mention by title); Self-critiquing models for assisting human evaluators (PDF p. 23, reference or mention by title); GPT-4 System Card (PDF p. 32, reference or mention by title); LLaMA (2023 paper) (reference or mention by title); GPTs are GPTs: An Early Look at the Labor Market Impact Potential of Large Language Models (PDF p. 34, reference or mention by title); ERNIE: Enhanced Representation through Knowledge Integration (PDF p. 7, reference or mention by title); ERNIE 3.0: Large-scale Knowledge Enhanced Pre-training for Language Understanding and Generation (PDF p. 18, reference or mention by title); ERNIE 3.0 Titan: Exploring Larger-scale Knowledge Enhanced Pre-training for Language Understanding and Generation (PDF p. 25, reference or mention by title); source-gemini-report-v1 (PDF p. 30, reference or mention by title).

Authorship records: `alec-radford` (proposed), `jeffrey-wu` (proposed), `rewon-child` (proposed), `david-luan`, `dario-amodei`, `ilya-sutskever`.

<a id="kp-megatron-lm-training-multi-billion-2019"></a>

#### Megatron-LM: Training Multi-Billion Parameter Language Models Using Model Parallelism

- ID `kp-megatron-lm-training-multi-billion-2019` (proposed); subtype Research paper (work).
- Basis 1: cited by 6 dataset documents.
- Identifiers: arxiv 1909.08053.
- Authors as printed (paper:kp-megatron-lm-training-multi-billion-2019--v1, first page): “Mohammad Shoeybi”, “Mostofa Patwary”, “Raul Puri”, “Patrick LeGresley”, “Jared Casper”, “Bryan Catanzaro”.

| Version            | Kind             | Date       | Precision | Basis                          |
| ------------------ | ---------------- | ---------- | --------- | ------------------------------ |
| arXiv:1909.08053v1 | arXiv submission | 2019-09-17 | day       | arXiv submission history (UTC) |
| arXiv:1909.08053v2 | arXiv submission | 2019-09-19 | day       | arXiv submission history (UTC) |
| arXiv:1909.08053v3 | arXiv submission | 2019-10-05 | day       | arXiv submission history (UTC) |
| arXiv:1909.08053v4 | arXiv submission | 2020-03-13 | day       | arXiv submission history (UTC) |

States:

- The paper presents an intra-layer model-parallel approach that the authors state enables training transformer language models with billions of parameters. “In this work, we implement a simple, efficient intra-layer model parallel approach that enables training state of the art transformer language models with billions of parameters.” (arXiv v1, PDF p. 1, abstract)

Cited by: LLaMA (2023 paper) (reference by arXiv identifier); Qwen Technical Report (reference by arXiv identifier); ERNIE 3.0: Large-scale Knowledge Enhanced Pre-training for Language Understanding and Generation (PDF p. 18, reference by arXiv identifier); ERNIE 3.0 Titan: Exploring Larger-scale Knowledge Enhanced Pre-training for Language Understanding and Generation (PDF p. 24, reference by arXiv identifier); ERNIE 5.0 Technical Report (PDF p. 34, reference by arXiv identifier); Seed1.5-VL Technical Report (PDF p. 40, reference by arXiv identifier).

Authorship records: `raul-puri` (proposed).

<a id="kp-natural-questions-benchmark-question-answering-2019"></a>

#### Natural Questions: A Benchmark for Question Answering Research

- ID `kp-natural-questions-benchmark-question-answering-2019` (proposed); subtype Research paper (work).
- Basis 1: cited by 6 dataset documents.
- Identifiers: doi 10.1162/tacl_a_00276.
- Authors as printed (paper:kp-natural-questions-benchmark-question-answering-2019--text, first page): “Tom Kwiatkowski”, “Jennimaria Palomaki”, “Olivia Redfield”, “Michael Collins”, “Ankur Parikh”, “Chris Alberti”, “Danielle Epstein”, “Illia Polosukhin”, “Jacob Devlin”, “Kenton Lee”, “Kristina Toutanova”, “Llion Jones”, “Matthew Kelcey”, “Ming-Wei Chang”, “Andrew M. Dai”, “Jakob Uszkoreit”, “Quoc Le”, “Slav Petrov”.

| Version                                                                            | Kind                | Date | Precision | Basis                                                                                         |
| ---------------------------------------------------------------------------------- | ------------------- | ---- | --------- | --------------------------------------------------------------------------------------------- |
| Transactions of the Association for Computational Linguistics, vol. 7, pp. 453-466 | journal publication | 2019 | year      | Crossref published-print date (year kept; publisher-deposited, not checked against the issue) |

States:

- The paper presents the Natural Questions corpus, a question answering data set built from queries issued to the Google search engine. “We present the Natural Questions corpus, a question answering data set.” (PDF p. 1, abstract)

Cited by: Training Compute-Optimal Large Language Models (PDF p. 18, reference or mention by title); LLaMA (2023 paper) (reference or mention by title); DeepSeek-V3 Technical Report (reference by DOI); Qwen Technical Report (reference by DOI); source-gemini-report-v1 (PDF p. 28, reference by DOI); lg-src-new-yogatama-dm-2019 (PDF p. 13, reference or mention by title).

Authorship records: `tom-kwiatkowski` (proposed), `michael-collins` (proposed), `illia-polosukhin`, `jacob-devlin` (proposed), `kenton-lee` (proposed), `kristina-toutanova` (proposed), `llion-jones`, `ming-wei-chang` (proposed), `andrew-m-dai` (proposed), `jakob-uszkoreit`, `quoc-le`, `slav-petrov` (proposed).

<a id="kp-piqa-reasoning-about-physical-commonsense-2019"></a>

#### PIQA: Reasoning about Physical Commonsense in Natural Language

- ID `kp-piqa-reasoning-about-physical-commonsense-2019` (proposed); subtype Research paper (work).
- Basis 1: cited by 5 dataset documents.
- Identifiers: arxiv 1911.11641; doi 10.1609/aaai.v34i05.6239.
- Authors as printed (paper:kp-piqa-reasoning-about-physical-commonsense-2019--v1, first page): “Yonatan Bisk”, “Rowan Zellers”, “Ronan Le Bras”, “Jianfeng Gao”, “Yejin Choi”.
- arXiv comments (author-supplied): “AAAI 2020”

| Version                                                                                       | Kind                | Date       | Precision | Basis                                                                                          |
| --------------------------------------------------------------------------------------------- | ------------------- | ---------- | --------- | ---------------------------------------------------------------------------------------------- |
| arXiv:1911.11641v1                                                                            | arXiv submission    | 2019-11-26 | day       | arXiv submission history (UTC)                                                                 |
| Proceedings of the AAAI Conference on Artificial Intelligence, vol. 34, no. 05, pp. 7432-7439 | journal publication | 2020       | year      | Crossref published-online date (year kept; publisher-deposited, not checked against the issue) |

States:

- The paper introduces a physical commonsense reasoning task and a benchmark dataset for it, Physical Interaction: Question Answering (PIQA). “In this paper, we introduce the task of physical commonsense reasoning and a corresponding benchmark dataset Physical Interaction: Question Answering or PIQA” (arXiv v1, PDF p. 1, abstract)

Cited by: Training Compute-Optimal Large Language Models (PDF p. 16, reference or mention by title); Weak-to-Strong Generalization: Eliciting Strong Capabilities With Weak Supervision (PDF p. 20, reference or mention by title); LLaMA (2023 paper) (reference or mention by title); DeepSeek-V3 Technical Report (reference by DOI); Qwen Technical Report (reference by DOI).

Authorship records: `yonatan-bisk` (proposed), `rowan-zellers` (proposed), `ronan-le-bras` (proposed), `jianfeng-gao` (proposed), `yejin-choi` (proposed).

<a id="kp-roberta-robustly-optimized-bert-pretraining-2019"></a>

#### RoBERTa: A Robustly Optimized BERT Pretraining Approach

- ID `kp-roberta-robustly-optimized-bert-pretraining-2019` (proposed); subtype Research paper (work).
- Basis 1: cited by 5 dataset documents.
- Identifiers: arxiv 1907.11692.
- Authors as printed (paper:kp-roberta-robustly-optimized-bert-pretraining-2019--v1, first page): “Yinhan Liu”, “Myle Ott”, “Naman Goyal”, “Jingfei Du”, “Mandar Joshi”, “Danqi Chen”, “Omer Levy”, “Mike Lewis”, “Luke Zettlemoyer”, “Veselin Stoyanov”.

| Version            | Kind             | Date       | Precision | Basis                          |
| ------------------ | ---------------- | ---------- | --------- | ------------------------------ |
| arXiv:1907.11692v1 | arXiv submission | 2019-07-26 | day       | arXiv submission history (UTC) |

States:

- The paper presents a replication study of BERT pretraining that measures the impact of hyperparameters and training data size. “We present a replication study of BERT pretraining (Devlin et al., 2019) that carefully measures the impact of many key hyperparameters and training data size.” (arXiv v1, PDF p. 1, abstract)
- The authors state that BERT was significantly undertrained and propose a training recipe, RoBERTa, which they report can match or exceed post-BERT methods. “We find that BERT was significantly undertrained and propose an improved recipe for training BERT models, which we call RoBERTa, that can match or exceed the performance of all of the post-BERT methods.” (arXiv v1, PDF p. 1, §1 Introduction, para. 2)

Cited by: Scaling Laws for Neural Language Models (PDF p. 29, reference by arXiv identifier); Qwen Technical Report (reference by arXiv identifier); ERNIE 3.0: Large-scale Knowledge Enhanced Pre-training for Language Understanding and Generation (PDF p. 22, reference by arXiv identifier); ERNIE 3.0 Titan: Exploring Larger-scale Knowledge Enhanced Pre-training for Language Understanding and Generation (PDF p. 28, reference by arXiv identifier); lg-src-goo-codex-v1 (PDF p. 17, reference by arXiv identifier).

Authorship records: `naman-goyal` (proposed), `mandar-joshi` (proposed), `luke-zettlemoyer` (proposed).

<a id="kp-adversarial-winograd-schema-challenge-at-2019"></a>

#### WinoGrande: An Adversarial Winograd Schema Challenge at Scale

- ID `kp-adversarial-winograd-schema-challenge-at-2019` (proposed); subtype Research paper (work).
- Basis 1: cited by 5 dataset documents.
- Identifiers: arxiv 1907.10641.
- Authors as printed (paper:kp-adversarial-winograd-schema-challenge-at-2019--v1, first page): “Keisuke Sakaguchi”, “Ronan Le Bras”, “Chandra Bhagavatula”, “Yejin Choi”.
- Preparer's note: arXiv identifier missing from the index record; the arXiv abstract page carries the same title.

| Version            | Kind             | Date       | Precision | Basis                          |
| ------------------ | ---------------- | ---------- | --------- | ------------------------------ |
| arXiv:1907.10641v1 | arXiv submission | 2019-07-24 | day       | arXiv submission history (UTC) |
| arXiv:1907.10641v2 | arXiv submission | 2019-11-21 | day       | arXiv submission history (UTC) |

States:

- The paper introduces WinoGrande, a collection of Winograd Schema Challenge problems that it states are adversarially constructed to be robust against spurious statistical biases. “We introduce W INO G RANDE, a new collection of WSC problems that are adversarially constructed to be robust against spurious statistical biases.” (arXiv v1, PDF p. 1, abstract)

Cited by: Training Compute-Optimal Large Language Models (PDF p. 20, reference or mention by title); LLaMA (2023 paper) (reference or mention by title); DeepSeek-V3 Technical Report (reference or mention by title); ERNIE 5.0 Technical Report (PDF p. 34, reference or mention by title); Kimi K2: Open Agentic Intelligence (PDF p. 23, reference or mention by title).

Authorship records: `ronan-le-bras` (proposed), `yejin-choi` (proposed).

<a id="kp-zero-memory-optimizations-toward-training-2019"></a>

#### ZeRO: Memory optimizations Toward Training Trillion Parameter Models

- ID `kp-zero-memory-optimizations-toward-training-2019` (proposed); subtype Research paper (work).
- Basis 1: cited by 7 dataset documents.
- Identifiers: arxiv 1910.02054; doi 10.1109/sc41405.2020.00024.
- Authors as printed (paper:kp-zero-memory-optimizations-toward-training-2019--v1, first page): “Samyam Rajbhandari”, “Jeff Rasley”, “Olatunji Ruwase”, “Yuxiong He”.
- Preparer's note: arXiv lists v1 (4 October 2019) as withdrawn and serves no PDF for it; the text read is v2 (7 October 2019).

| Version                                                                                                   | Kind                   | Date       | Precision | Basis                                                                                         |
| --------------------------------------------------------------------------------------------------------- | ---------------------- | ---------- | --------- | --------------------------------------------------------------------------------------------- |
| arXiv:1910.02054v1                                                                                        | arXiv submission       | 2019-10-04 | day       | arXiv submission history (UTC)                                                                |
| arXiv:1910.02054v2                                                                                        | arXiv submission       | 2019-10-07 | day       | arXiv submission history (UTC)                                                                |
| SC20: International Conference for High Performance Computing, Networking, Storage and Analysis, pp. 1-16 | conference publication | 2020       | year      | Crossref published-print date (year kept; publisher-deposited, not checked against the issue) |
| arXiv:1910.02054v3                                                                                        | arXiv submission       | 2020-05-13 | day       | arXiv submission history (UTC)                                                                |

States:

- The paper presents the Zero Redundancy Optimizer (ZeRO), which it describes as a novel solution for optimising memory that achieves both memory efficiency and scaling efficiency. “We develop a novel solution, Zero Redundancy Optimizer (ZeRO), to optimize memory, achieving both memory efficiency and scaling efficiency.” (arXiv 1910.02054v2 as printed in the cached text, PDF p. 1, abstract, para. 2)

Cited by: Training Compute-Optimal Large Language Models (PDF p. 19, reference or mention by title); DeepSeek-V3 Technical Report (reference or mention by title); ERNIE 3.0: Large-scale Knowledge Enhanced Pre-training for Language Understanding and Generation (PDF p. 20, reference or mention by title); ERNIE 3.0 Titan: Exploring Larger-scale Knowledge Enhanced Pre-training for Language Understanding and Generation (PDF p. 26, reference or mention by title); ERNIE 5.0 Technical Report (PDF p. 33, reference or mention by title); Kimi K2: Open Agentic Intelligence (PDF p. 23, reference or mention by title); Kimi K3: Open Frontier Intelligence (PDF p. 38, reference or mention by title).

### 2020

<a id="kp-gshard-scaling-giant-models-conditional-2020"></a>

#### GShard: Scaling Giant Models with Conditional Computation and Automatic Sharding

- ID `kp-gshard-scaling-giant-models-conditional-2020` (proposed); subtype Research paper (work).
- Basis 1: cited by 5 dataset documents.
- Identifiers: arxiv 2006.16668.
- Authors as printed (paper:kp-gshard-scaling-giant-models-conditional-2020--v1, first page): “Dmitry Lepikhin”, “HyoukJoong Lee”, “Yuanzhong Xu”, “Dehao Chen”, “Orhan Firat”, “Yanping Huang”, “Maxim Krikun”, “Noam Shazeer”, “Zhifeng Chen”.

| Version            | Kind             | Date       | Precision | Basis                          |
| ------------------ | ---------------- | ---------- | --------- | ------------------------------ |
| arXiv:2006.16668v1 | arXiv submission | 2020-06-30 | day       | arXiv submission history (UTC) |

States:

- The paper presents GShard, described as a module of lightweight annotation APIs and an extension to the XLA compiler. “GShard is a module composed of a set of lightweight annotation APIs and an extension to the XLA compiler.” (arXiv v1, PDF p. 1, abstract)
- The paper reports using GShard's automatic sharding to scale a multilingual neural machine translation Transformer with Sparsely-Gated Mixture-of-Experts beyond 600 billion parameters. “GShard enabled us to scale up multilingual neural machine translation Transformer model with Sparsely-Gated Mixture-of-Experts beyond 600 billion parameters using automatic sharding.” (arXiv v1, PDF p. 1, abstract)

Cited by: DeepSeek-V3 Technical Report (reference or mention by title); Qwen Technical Report (reference by arXiv identifier); ERNIE 5.0 Technical Report (PDF p. 32, reference by arXiv identifier); Kimi K2: Open Agentic Intelligence (PDF p. 22, reference by arXiv identifier); Kimi K3: Open Frontier Intelligence (PDF p. 37, reference by arXiv identifier).

Authorship records: `dmitry-lepikhin` (proposed), `hyoukjoong-lee` (proposed), `yuanzhong-xu` (proposed), `dehao-chen` (proposed), `orhan-firat` (proposed), `yanping-huang` (proposed), `maxim-krikun` (proposed), `noam-shazeer`, `zhifeng-chen` (proposed).

<a id="kp-language-models-few-shot-learners-2020"></a>

#### Language Models are Few-Shot Learners

- ID `kp-language-models-few-shot-learners-2020` (proposed); subtype Research paper (work).
- Basis 1: cited by 17 dataset documents.
- Identifiers: arxiv 2005.14165.
- Authors as printed (paper:kp-language-models-few-shot-learners-2020--v1, first page): “Tom B. Brown”, “Benjamin Mann”, “Nick Ryder”, “Melanie Subbiah”, “Jared Kaplan”, “Prafulla Dhariwal”, “Arvind Neelakantan”, “Pranav Shyam”, “Girish Sastry”, “Amanda Askell”, “Sandhini Agarwal”, “Ariel Herbert-Voss”, “Gretchen Krueger”, “Tom Henighan”, “Rewon Child”, “Aditya Ramesh”, “Daniel M. Ziegler”, “Jeffrey Wu”, “Clemens Winter”, “Christopher Hesse”, “Mark Chen”, “Eric Sigler”, “Mateusz Litwin”, “Scott Gray”, “Benjamin Chess”, “Jack Clark”, “Christopher Berner”, “Sam McCandlish”, “Alec Radford”, “Ilya Sutskever”, “Dario Amodei”.
- arXiv comments (author-supplied): “40+32 pages”

| Version            | Kind             | Date       | Precision | Basis                          |
| ------------------ | ---------------- | ---------- | --------- | ------------------------------ |
| arXiv:2005.14165v1 | arXiv submission | 2020-05-28 | day       | arXiv submission history (UTC) |
| arXiv:2005.14165v2 | arXiv submission | 2020-06-01 | day       | arXiv submission history (UTC) |
| arXiv:2005.14165v3 | arXiv submission | 2020-06-05 | day       | arXiv submission history (UTC) |
| arXiv:2005.14165v4 | arXiv submission | 2020-07-22 | day       | arXiv submission history (UTC) |

States:

- The authors state that scaling up language models greatly improves task-agnostic few-shot performance, in some cases reaching competitiveness with what they call prior state-of-the-art fine-tuning approaches. “Here we show that scaling up language models greatly improves task-agnostic, few-shot performance, sometimes even reaching competitiveness with prior state-of-the-art finetuning approaches.” (arXiv v1, PDF p. 1, abstract)
- The paper describes training GPT-3, an autoregressive language model with 175 billion parameters, which it states is ten times larger than any previous non-sparse language model, and testing it in the few-shot setting. “Specifically, we train GPT-3, an autoregressive language model with 175 billion parameters, 10x more than any previous non-sparse language model, and test its performance in the few-shot setting.” (arXiv v1, PDF p. 1, abstract) — the paper’s own priority or novelty claim

Cited by: Training Compute-Optimal Large Language Models (PDF p. 17, reference or mention by title); Learning to summarize from human feedback (PDF p. 11, reference or mention by title); Training language models to follow instructions with human feedback (PDF p. 22, reference by arXiv identifier); Self-critiquing models for assisting human evaluators (PDF p. 20, reference or mention by title); Weak-to-Strong Generalization: Eliciting Strong Capabilities With Weak Supervision (PDF p. 20, reference or mention by title); GPT-4 System Card (PDF p. 31, reference or mention by title); LLaMA (2023 paper) (reference or mention by title); Qwen Technical Report (reference or mention by title); ChatGLM research history and techniques (reference or mention by title); Why AI alignment could be hard with modern deep learning (reference by arXiv identifier); Without specific countermeasures, the easiest path to transformative AI likely leads to AI takeover (reference by arXiv identifier); GPTs are GPTs: An Early Look at the Labor Market Impact Potential of Large Language Models (PDF p. 32, reference or mention by title); ERNIE 3.0: Large-scale Knowledge Enhanced Pre-training for Language Understanding and Generation (PDF p. 17, reference or mention by title); ERNIE 3.0 Titan: Exploring Larger-scale Knowledge Enhanced Pre-training for Language Understanding and Generation (PDF p. 23, reference or mention by title); Seed-Thinking-v1.5: Advancing Superb Reasoning Models with Reinforcement Learning (PDF p. 14, reference or mention by title); source-gemini-report-v1 (PDF p. 25, reference or mention by title); lg-src-goo-codex-v1 (PDF p. 15, reference by arXiv identifier).

Authorship records: `tom-b-brown` (proposed), `nick-ryder` (proposed), `jared-kaplan`, `prafulla-dhariwal` (proposed), `girish-sastry` (proposed), `amanda-askell` (proposed), `sandhini-agarwal` (proposed), `ariel-herbert-voss` (proposed), `gretchen-krueger` (proposed), `tom-henighan` (proposed), `rewon-child` (proposed), `jeffrey-wu` (proposed), `clemens-winter` (proposed), `christopher-hesse` (proposed), `mark-chen`, `scott-gray` (proposed), `benjamin-chess` (proposed), `jack-clark`, `sam-mccandlish`, `alec-radford` (proposed), `ilya-sutskever`, `dario-amodei`.

<a id="kp-measuring-massive-multitask-language-understanding-2020"></a>

#### Measuring Massive Multitask Language Understanding

- ID `kp-measuring-massive-multitask-language-understanding-2020` (proposed); subtype Research paper (work).
- Basis 1: cited by 14 dataset documents.
- Identifiers: arxiv 2009.03300.
- Authors as printed (paper:kp-measuring-massive-multitask-language-understanding-2020--v1, first page): “Dan Hendrycks”, “Collin Burns”, “Steven Basart”, “Andy Zou”, “Mantas Mazeika”, “Dawn Song”, “Jacob Steinhardt”.
- arXiv comments (author-supplied): “ICLR 2021; the test and code is available at [link: https://github.com/hendrycks/test] this https URL”

| Version            | Kind             | Date       | Precision | Basis                          |
| ------------------ | ---------------- | ---------- | --------- | ------------------------------ |
| arXiv:2009.03300v1 | arXiv submission | 2020-09-07 | day       | arXiv submission history (UTC) |
| arXiv:2009.03300v2 | arXiv submission | 2020-09-21 | day       | arXiv submission history (UTC) |
| arXiv:2009.03300v3 | arXiv submission | 2021-01-12 | day       | arXiv submission history (UTC) |

States:

- The paper proposes a test intended to measure the multitask accuracy of text models. “We propose a new test to measure a text model’s multitask accuracy.” (arXiv v1, PDF p. 1, abstract)
- The paper states that the test covers 57 tasks, including elementary mathematics, US history, computer science and law. “The test covers 57 tasks including elementary mathematics, US history, computer science, law, and more.” (arXiv v1, PDF p. 1, abstract)

Cited by: Training Compute-Optimal Large Language Models (PDF p. 17, reference by arXiv identifier); Claude 2 model card (PDF p. 13, reference or mention by title); Gemini — Google DeepMind research introduction (2023) (reference by arXiv identifier); LLaMA (2023 paper) (reference by arXiv identifier); DeepSeek-V3 Technical Report (reference by arXiv identifier); DeepSeek-R1 research report (reference by arXiv identifier); Qwen Technical Report (reference by arXiv identifier); ChatGLM research history and techniques (reference or mention by title); ERNIE 5.0 Technical Report (PDF p. 31, reference by arXiv identifier); Kimi K2: Open Agentic Intelligence (PDF p. 21, reference by arXiv identifier); Seed1.8 Model Card: Towards Generalized Real-World Agency (PDF p. 23, reference by arXiv identifier); Seed-X: Building Strong Multilingual Translation LLM with 7B Parameters (PDF p. 15, reference by arXiv identifier); NIST AI 800-1 (second public draft): Managing Misuse Risk for Dual-Use Foundation Models (PDF p. 66, reference by arXiv identifier); source-gemini-report-v1 (PDF p. 27, reference or mention by title).

Authorship records: `dan-hendrycks`, `collin-burns` (proposed), `steven-basart` (proposed), `mantas-mazeika` (proposed), `dawn-song` (proposed), `jacob-steinhardt` (proposed).

<a id="kp-robots-jobs-evidence-from-us-2019"></a>

#### Robots and Jobs: Evidence from US Labor Markets

- ID `kp-robots-jobs-evidence-from-us-2019` (proposed); subtype Research paper (work).
- Basis 1: cited by 6 dataset documents.
- Identifiers: doi 10.1086/705716.
- Authors as printed (paper:kp-robots-jobs-evidence-from-us-2019--text, first page): “Daron Acemoglu”, “Pascual Restrepo”.
- Preparer's note: The journal text (Journal of Political Economy, 2020) is not open; the NBER working paper (w23285, 2017) is read and its quotations are scoped to it.

| Version                                                      | Kind                | Date | Precision | Basis                                                                                         |
| ------------------------------------------------------------ | ------------------- | ---- | --------- | --------------------------------------------------------------------------------------------- |
| Journal of Political Economy, vol. 128, no. 6, pp. 2188-2244 | journal publication | 2020 | year      | Crossref published-print date (year kept; publisher-deposited, not checked against the issue) |

States:

- The paper analyses the effect of the increase in industrial robot usage between 1990 and 2007 on US local labour markets. “We analyze the effect of the increase in industrial robot usage between 1990 and 2007 on US local labor markets.” (NBER Working Paper 23285 (March 2017), PDF p. 2, abstract)

Cited by: Economic Growth under Transformative AI: A guide to the vast range of possibilities for output growth, wages, and the labor share (PDF p. 67, reference or mention by title); The Simple Macroeconomics of AI (PDF p. 47, reference or mention by title); Artificial Intelligence, Automation and Work (PDF p. 41, reference or mention by title); Economic Policy for Artificial Intelligence (PDF p. 23, reference or mention by title); Artificial Intelligence: The Ambiguous Labor Market Impact of Automating Prediction (PDF p. 24, reference or mention by title); The Wrong Kind of AI? Artificial Intelligence and the Future of Labor Demand (PDF p. 13, reference or mention by title).

Authorship records: `daron-acemoglu`, `pascual-restrepo`.

<a id="scaling-laws"></a>

#### Scaling Laws for Neural Language Models

- ID `scaling-laws` (existing dataset document); subtype Research paper (work).
- Basis 1: cited by 10 dataset documents.
- Identifiers: arxiv 2001.08361.
- Authors as printed (paper:scaling-laws--v1, first page): “Jared Kaplan”, “Sam McCandlish”, “Tom Henighan”, “Tom B. Brown”, “Benjamin Chess”, “Rewon Child”, “Scott Gray”, “Alec Radford”, “Jeffrey Wu”, “Dario Amodei”.
- arXiv comments (author-supplied): “19 pages, 15 figures”

| Version            | Kind             | Date       | Precision | Basis                          |
| ------------------ | ---------------- | ---------- | --------- | ------------------------------ |
| arXiv:2001.08361v1 | arXiv submission | 2020-01-23 | day       | arXiv submission history (UTC) |

States:

- The paper presents a study of empirical scaling laws for language model performance measured by cross-entropy loss. “We study empirical scaling laws for language model performance on the cross-entropy loss.” (arXiv v1, PDF p. 1, abstract)
- The paper reports that loss scales as a power law with model size, dataset size and training compute, with some trends spanning more than seven orders of magnitude. “The loss scales as a power-law with model size, dataset size, and the amount of compute used for training, with some trends spanning more than seven orders of magnitude.” (arXiv v1, PDF p. 1, abstract)

Attributed-credit records (the citing document’s own attribution):

- [summarises an argument or finding] Hoffmann et al. (2022) attribute to Kaplan et al. (2020) the conclusion that large models should not be trained to their lowest possible loss to be compute-optimal; the next sentence says they reach the same conclusion but recommend many more training tokens. “One notable conclusion in Kaplan et al. (2020) is that large models should not be trained to their lowest possible loss to be compute optimal.” (Training Compute-Optimal Large Language Models, PDF p. 1, §1 Introduction, para. 2)

Cited by: Training Compute-Optimal Large Language Models (PDF p. 18, reference by arXiv identifier); Self-critiquing models for assisting human evaluators (PDF p. 21, reference by arXiv identifier); Claude 2 model card (PDF p. 13, reference or mention by title); LLaMA (2023 paper) (reference by arXiv identifier); Commission Guidelines on the scope of the obligations for providers of general-purpose AI models established by Regulation (EU) 2024/1689 (C(2025) 7719 final) (PDF p. 35, reference by arXiv identifier); Explosive growth from AI automation: A review of the arguments (PDF p. 25, reference by arXiv identifier); GPTs are GPTs: An Early Look at the Labor Market Impact Potential of Large Language Models (PDF p. 33, reference by arXiv identifier); ERNIE 3.0: Large-scale Knowledge Enhanced Pre-training for Language Understanding and Generation (PDF p. 18, reference by arXiv identifier); Kimi K3: Open Frontier Intelligence (PDF p. 36, reference by arXiv identifier); Seed1.5-VL Technical Report (PDF p. 36, reference by arXiv identifier).

Authorship records: `sam-mccandlish`, `tom-henighan` (proposed), `tom-b-brown` (proposed), `benjamin-chess` (proposed), `rewon-child` (proposed), `scott-gray` (proposed), `alec-radford` (proposed), `jeffrey-wu` (proposed), `dario-amodei`.

### 2021

<a id="kp-ethical-social-risks-harm-from-2021"></a>

#### Ethical and social risks of harm from Language Models

- ID `kp-ethical-social-risks-harm-from-2021` (proposed); subtype Research paper (work).
- Basis 1: cited by 5 dataset documents.
- Identifiers: arxiv 2112.04359.
- Authors as printed (paper:kp-ethical-social-risks-harm-from-2021--v1, first page): “Laura Weidinger”, “John Mellor”, “Maribeth Rauh”, “Conor Griffin”, “Jonathan Uesato”, “Po-Sen Huang”, “Myra Cheng”, “Mia Glaese”, “Borja Balle”, “Atoosa Kasirzadeh”, “Zac Kenton”, “Sasha Brown”, “Will Hawkins”, “Tom Stepleton”, “Courtney Biles”, “Abeba Birhane”, “Julia Haas”, “Laura Rimell”, “Lisa Anne Hendricks”, “William Isaac”, “Sean Legassick”, “Geoffrey Irving”, “Iason Gabriel”.

| Version            | Kind             | Date       | Precision | Basis                          |
| ------------------ | ---------------- | ---------- | --------- | ------------------------------ |
| arXiv:2112.04359v1 | arXiv submission | 2021-12-08 | day       | arXiv submission history (UTC) |

States:

- The authors state that the paper aims to help structure the landscape of risks associated with large-scale language models. “This paper aims to help structure the risk landscape associated with large-scale Language Models (LMs).” (arXiv v1, PDF p. 1, abstract)
- The paper outlines six risk areas: discrimination, exclusion and toxicity; information hazards; misinformation harms; malicious uses; human-computer interaction harms; and automation, access and environmental harms. “The paper outlines six specific risk areas: I. Discrimination, Exclusion and Toxicity, II. Information Hazards, III. Misinformation Harms, IV. Malicious Uses, V. Human-Computer Interaction Harms, VI. Automation, Access, and Environmental Harms.” (arXiv v1, PDF p. 1, abstract)

Cited by: Training Compute-Optimal Large Language Models (PDF p. 20, reference or mention by title); Training language models to follow instructions with human feedback (PDF p. 25, reference by arXiv identifier); GPT-4 System Card (PDF p. 31, reference or mention by title); GPTs are GPTs: An Early Look at the Labor Market Impact Potential of Large Language Models (PDF p. 35, reference by arXiv identifier); source-gemini-report-v1 (PDF p. 33, reference by arXiv identifier).

Authorship records: `laura-weidinger` (proposed), `john-mellor` (proposed), `maribeth-rauh` (proposed), `jonathan-uesato` (proposed), `po-sen-huang` (proposed), `mia-glaese`, `laura-rimell` (proposed), `lisa-anne-hendricks` (proposed), `william-isaac` (proposed), `geoffrey-irving` (proposed), `iason-gabriel` (proposed).

<a id="kp-evaluating-large-language-models-trained-2021"></a>

#### Evaluating Large Language Models Trained on Code

- ID `kp-evaluating-large-language-models-trained-2021` (proposed); subtype Research paper (work).
- Basis 1: cited by 16 dataset documents.
- Identifiers: arxiv 2107.03374.
- Authors as printed (paper:kp-evaluating-large-language-models-trained-2021--v1, first page): “Mark Chen”, “Jerry Tworek”, “Heewoo Jun”, “Qiming Yuan”, “Jared Kaplan”, “Harri Edwards”, “Yura Burda”, “Nicholas Joseph”, “Greg Brockman”, “Alex Ray”, “Raul Puri”, “Gretchen Krueger”, “Michael Petrov”, “Heidy Khlaaf”, “Girish Sastry”, “Pamela Mishkin”, “Brooke Chan”, “Scott Gray”, “Nick Ryder”, “Mikhail Pavlov”, “Alethea Power”, “Lukasz Kaiser”, “Mohammad Bavarian”, “Clemens Winter”, “Philippe Tillet”, “Felipe Such”, “Dave Cummings”, “Matthias Plappert”, “Fotios Chantzis”, “Elizabeth Barnes”, “Ariel Herbert-Voss”, “Will Guss”, “Alex Nichol”, “Igor Babuschkin”, “Suchir Balaji”, “Shantanu Jain”, “Andrew Carr”, “Jan Leike”, “Josh Achiam”, “Vedant Misra”, “Evan Morikawa”, “Alec Radford”, “Matthew Knight”, “Miles Brundage”, “Mira Murati”, “Katie Mayer”, “Peter Welinder”, “Bob McGrew”, “Dario Amodei”, “Sam McCandlish”, “Ilya Sutskever”, “Wojciech Zaremba”. Not found on the first page (index names): Henrique Pondé de Oliveira Pinto, A. Paino, N. Tezak, Jie Tang, William Saunders, Christopher Hesse.
- arXiv comments (author-supplied): “corrected typos, added references, added authors, added acknowledgements”

| Version            | Kind             | Date       | Precision | Basis                          |
| ------------------ | ---------------- | ---------- | --------- | ------------------------------ |
| arXiv:2107.03374v1 | arXiv submission | 2021-07-07 | day       | arXiv submission history (UTC) |
| arXiv:2107.03374v2 | arXiv submission | 2021-07-14 | day       | arXiv submission history (UTC) |

States:

- The paper introduces Codex, described as a GPT language model fine-tuned on publicly available GitHub code, and studies its Python code-writing capabilities. “We introduce Codex, a GPT language model finetuned on publicly available code from GitHub, and study its Python code-writing capabilities.” (arXiv v1, PDF p. 1, abstract)

Cited by: Training language models to follow instructions with human feedback (PDF p. 22, reference by arXiv identifier); Self-critiquing models for assisting human evaluators (PDF p. 21, reference by arXiv identifier); GPT-4 System Card (PDF p. 31, reference or mention by title); Claude 2 model card (PDF p. 13, reference by arXiv identifier); Gemini — Google DeepMind research introduction (2023) (reference by arXiv identifier); LLaMA (2023 paper) (reference or mention by title); DeepSeek-V3 Technical Report (reference by arXiv identifier); DeepSeek-R1 research report (reference by arXiv identifier); Qwen Technical Report (reference by arXiv identifier); ChatGLM research history and techniques (reference by arXiv identifier); Meta Advanced AI Scaling Framework — Version 2 (PDF p. 28, reference by arXiv identifier); GPTs are GPTs: An Early Look at the Labor Market Impact Potential of Large Language Models (PDF p. 32, reference by arXiv identifier); ERNIE 5.0 Technical Report (PDF p. 29, reference by arXiv identifier); Kimi K2: Open Agentic Intelligence (PDF p. 21, reference or mention by title); Seed-Coder: Let the Code Model Curate Data for Itself (PDF p. 35, reference by arXiv identifier); source-gemini-report-v1 (PDF p. 25, reference by arXiv identifier).

Authorship records: `mark-chen`, `jared-kaplan`, `nicholas-joseph` (proposed), `greg-brockman`, `alex-ray` (proposed), `raul-puri` (proposed), `gretchen-krueger` (proposed), `girish-sastry` (proposed), `pamela-mishkin`, `scott-gray` (proposed), `nick-ryder` (proposed), `lukasz-kaiser`, `mohammad-bavarian` (proposed), `clemens-winter` (proposed), `ariel-herbert-voss` (proposed), `igor-babuschkin`, `jan-leike`, `joshua-achiam`, `vedant-misra` (proposed), `alec-radford` (proposed), `miles-brundage`, `mira-murati`, `peter-welinder` (proposed), `bob-mcgrew`, `dario-amodei`, `sam-mccandlish`, `ilya-sutskever`, `wojciech-zaremba`.

<a id="kp-lora-low-rank-adaptation-large-2021"></a>

#### LoRA: Low-Rank Adaptation of Large Language Models

- ID `kp-lora-low-rank-adaptation-large-2021` (proposed); subtype Research paper (work).
- Basis 2: 24,949 citations in Semantic Scholar (rank 43, 2026-10-28); cited by 2 dataset documents.
- Identifiers: arxiv 2106.09685.
- Authors as printed (paper:kp-lora-low-rank-adaptation-large-2021--v1, first page): “Yelong Shen”, “Phillip Wallis”, “Zeyuan Allen-Zhu”, “Yuanzhi Li”, “Shean Wang”, “Li Shean Wang”, “Weizhu Chen”. Not found on the first page (index names): J. Hu.
- arXiv comments (author-supplied): “Draft V2 includes better baselines, experiments on GLUE, and more on adapter latency”

| Version            | Kind             | Date       | Precision | Basis                          |
| ------------------ | ---------------- | ---------- | --------- | ------------------------------ |
| arXiv:2106.09685v1 | arXiv submission | 2021-06-17 | day       | arXiv submission history (UTC) |
| arXiv:2106.09685v2 | arXiv submission | 2021-10-16 | day       | arXiv submission history (UTC) |

States:

- The paper proposes Low-Rank Adaptation (LoRA), which freezes pre-trained model weights and injects trainable rank decomposition matrices into each Transformer layer, and states that this greatly reduces the number of trainable parameters for downstream tasks. “We propose Low-Rank Adaptation, or LoRA, which freezes the pre-trained model weights and injects trainable rank decomposition matrices into each layer of the Transformer architecture, greatly reducing the number of trainable parameters for downstream tasks.” (arXiv v1, PDF p. 1, abstract)

Cited by: Weak-to-Strong Generalization: Eliciting Strong Capabilities With Weak Supervision (PDF p. 22, reference or mention by title); Qwen Technical Report (reference by arXiv identifier).

<a id="kp-measuring-mathematical-problem-solving-math-2021"></a>

#### Measuring Mathematical Problem Solving With the MATH Dataset

- ID `kp-measuring-mathematical-problem-solving-math-2021` (proposed); subtype Research paper (work).
- Basis 1: cited by 7 dataset documents.
- Identifiers: arxiv 2103.03874.
- Authors as printed (paper:kp-measuring-mathematical-problem-solving-math-2021--v1, first page): “Dan Hendrycks”, “Collin Burns”, “Saurav Kadavath”, “Akul Arora”, “Steven Basart”, “Eric Tang”, “Dawn Song”, “Jacob Steinhardt”.
- arXiv comments (author-supplied): “NeurIPS 2021. Code and the MATH dataset is available at [link: https://github.com/hendrycks/math/] this https URL”

| Version            | Kind             | Date       | Precision | Basis                          |
| ------------------ | ---------------- | ---------- | --------- | ------------------------------ |
| arXiv:2103.03874v1 | arXiv submission | 2021-03-05 | day       | arXiv submission history (UTC) |
| arXiv:2103.03874v2 | arXiv submission | 2021-11-08 | day       | arXiv submission history (UTC) |

States:

- The paper introduces MATH, described as a dataset of 12,500 competition mathematics problems for measuring mathematical problem solving in machine learning models. “To measure this ability in machine learning models, we introduce MATH, a new dataset of 12, 500 challenging competition mathematics problems.” (arXiv v1, PDF p. 1, abstract)

Cited by: Weak-to-Strong Generalization: Eliciting Strong Capabilities With Weak Supervision (PDF p. 22, reference or mention by title); LLaMA (2023 paper) (reference by arXiv identifier); DeepSeek-V3 Technical Report (reference by arXiv identifier); Qwen Technical Report (reference by arXiv identifier); ERNIE 5.0 Technical Report (PDF p. 31, reference by arXiv identifier); Kimi K2: Open Agentic Intelligence (PDF p. 21, reference by arXiv identifier); source-gemini-report-v1 (PDF p. 27, reference by arXiv identifier).

Authorship records: `dan-hendrycks`, `collin-burns` (proposed), `saurav-kadavath` (proposed), `steven-basart` (proposed), `dawn-song` (proposed), `jacob-steinhardt` (proposed).

<a id="kp-opportunities-risks-foundation-models-2021"></a>

#### On the Opportunities and Risks of Foundation Models

- ID `kp-opportunities-risks-foundation-models-2021` (proposed); subtype Research paper (work).
- Basis 1: cited by 8 dataset documents.
- Identifiers: arxiv 2108.07258.
- Authors as printed (paper:kp-opportunities-risks-foundation-models-2021--v1, first page): “Rishi Bommasani”, “Drew A. Hudson”, “Ehsan Adeli”, “Russ Altman”, “Simran Arora”, “Sydney von Arx”, “Michael S. Bernstein”, “Jeannette Bohg”, “Antoine Bosselut”, “Emma Brunskill”, “Erik Brynjolfsson”, “Shyamal Buch”, “Dallas Card”, “Rodrigo Castellon”, “Niladri Chatterji”, “Annie Chen”, “Kathleen Creel”, “Chris Donahue”, “Moussa Doumbouya”, “Esin Durmus”, “Stefano Ermon”, “John Etchemendy”, “Kawin Ethayarajh”, “Chelsea Finn”, “Trevor Gale”, “Lauren Gillespie”, “Karan Goel”, “Noah Goodman”, “Shelby Grossman”, “Neel Guha”, “Tatsunori Hashimoto”, “Peter Henderson”, “John Hewitt”, “Daniel E. Ho”, “Jenny Hong”, “Kyle Hsu”, “Jing Huang”, “Thomas Icard”, “Saahil Jain”, “Dan Jurafsky”, “Pratyusha Kalluri”, “Siddharth Karamcheti”, “Geoff Keeling”, “Fereshte Khani”, “Omar Khattab”, “Pang Wei Koh”, “Mark Krass”, “Ranjay Krishna”, “Rohith Kuditipudi”, “Ananya Kumar”, “Faisal Ladhak”, “Mina Lee”, “Tony Lee”, “Jure Leskovec”, “Isabelle Levent”, “Xiang Lisa Li”, “Xuechen Li”, “Tengyu Ma”, “Ali Malik”, “Christopher D. Manning”, “Suvir Mirchandani”, “Eric Mitchell”, “Zanele Munyikwa”, “Suraj Nair”, “Avanika Narayan”, “Deepak Narayanan”, “Allen Nie”, “Juan Carlos Niebles”, “Hamed Nilforoshan”, “Julian Nyarko”, “Giray Ogut”, “Laurel Orr”, “Isabel Papadimitriou”, “Chris Piech”, “Eva Portelance”, “Christopher Potts”, “Aditi Raghunathan”, “Hongyu Ren”, “Frieda Rong”, “Yusuf Roohani”, “Camilo Ruiz”, “Jack Ryan”, “Christopher Ré”, “Dorsa Sadigh”, “Shiori Sagawa”, “Keshav Santhanam”, “Andy Shih”, “Krishnan Srinivasan”, “Alex Tamkin”, “Rohan Taori”, “Armin W. Thomas”, “Florian Tramèr”, “Rose E. Wang”, “William Wang”, “Bohan Wu”, “Jiajun Wu”, “Yuhuai Wu”, “Sang Michael Xie”, “Michihiro Yasunaga”, “Jiaxuan You”, “Matei Zaharia”, “Michael Zhang”, “Tianyi Zhang”, “Xikun Zhang”, “Yuhui Zhang”, “Lucia Zheng”, “Kaitlyn Zhou”, “Percy Liang”. Not found on the first page (index names): J. Davis, Dora Demszky, Fei-Fei Li, Benjamin Newman, J. Park, Robert Reich.
- arXiv comments (author-supplied): “Authored by the Center for Research on Foundation Models (CRFM) at the Stanford Institute for Human-Centered Artificial Intelligence (HAI). Report page with citation guidelines: [link: https://crfm.stanford.edu/report.html] this https URL”

| Version            | Kind             | Date       | Precision | Basis                          |
| ------------------ | ---------------- | ---------- | --------- | ------------------------------ |
| arXiv:2108.07258v1 | arXiv submission | 2021-08-16 | day       | arXiv submission history (UTC) |
| arXiv:2108.07258v2 | arXiv submission | 2021-08-18 | day       | arXiv submission history (UTC) |
| arXiv:2108.07258v3 | arXiv submission | 2022-07-12 | day       | arXiv submission history (UTC) |

States:

- The report names models trained on broad data at scale and adaptable to many downstream tasks "foundation models", explaining the term by their "critically central yet incomplete character". “We call these models foundation models to underscore their critically central yet incomplete character.” (arXiv v1, PDF p. 1, abstract)
- The report describes itself as an account of the opportunities and risks of foundation models, covering capabilities, technical principles, applications and societal impact. “This report provides a thorough account of the opportunities and risks of foundation models, ranging from their capabilities … to their applications (e.g., law, healthcare, education) and societal impact (e.g., inequity, misuse, economic and environmental impact, legal and ethical considerations).” (arXiv v1, PDF p. 1, abstract)

Cited by: Training language models to follow instructions with human feedback (PDF p. 22, reference by arXiv identifier); Self-critiquing models for assisting human evaluators (PDF p. 20, reference by arXiv identifier); GPT-4 System Card (PDF p. 34, reference or mention by title); Qwen Technical Report (reference by arXiv identifier); GPTs are GPTs: An Early Look at the Labor Market Impact Potential of Large Language Models (PDF p. 32, reference by arXiv identifier); How are AI developers managing risks? (OECD Artificial Intelligence Papers, No. 45) (PDF p. 35, reference by arXiv identifier); NIST AI 800-1 (initial public draft): Managing Misuse Risk for Dual-Use Foundation Models (PDF p. 25, reference by arXiv identifier); The California Report on Frontier AI Policy (PDF p. 47, reference by arXiv identifier).

Authorship records: `erik-brynjolfsson`, `chelsea-finn`, `hongyu-ren`.

<a id="kp-program-synthesis-large-language-models-2021"></a>

#### Program Synthesis with Large Language Models

- ID `kp-program-synthesis-large-language-models-2021` (proposed); subtype Research paper (work).
- Basis 1: cited by 7 dataset documents.
- Identifiers: arxiv 2108.07732.
- Authors as printed (paper:kp-program-synthesis-large-language-models-2021--v1, first page): “Jacob Austin”, “Augustus Odena”, “Maxwell Nye”, “Maarten Bosma”, “Henryk Michalewski”, “David Dohan”, “Ellen Jiang”, “Carrie Cai”, “Michael Terry”, “Quoc Le”, “Charles Sutton”.
- arXiv comments (author-supplied): “Jacob and Augustus contributed equally”

| Version            | Kind             | Date       | Precision | Basis                          |
| ------------------ | ---------------- | ---------- | --------- | ------------------------------ |
| arXiv:2108.07732v1 | arXiv submission | 2021-08-16 | day       | arXiv submission history (UTC) |

States:

- The paper evaluates large language models of 244M to 137B parameters on program synthesis in Python using two benchmarks it introduces, MBPP and MathQA-Python, in few-shot and fine-tuning settings. “We evaluate a collection of such models (with between 244M and 137B parameters) on two new benchmarks, MBPP and MathQA-Python, in both the few-shot and fine-tuning regimes.” (arXiv v1, PDF p. 1, abstract)

Cited by: Self-critiquing models for assisting human evaluators (PDF p. 20, reference by arXiv identifier); LLaMA (2023 paper) (reference or mention by title); DeepSeek-V3 Technical Report (reference by arXiv identifier); Qwen Technical Report (reference by arXiv identifier); ERNIE 5.0 Technical Report (PDF p. 29, reference by arXiv identifier); Kimi K2: Open Agentic Intelligence (PDF p. 21, reference by arXiv identifier); Seed-Coder: Let the Code Model Curate Data for Itself (PDF p. 34, reference by arXiv identifier).

Authorship records: `jacob-austin` (proposed), `maarten-bosma` (proposed), `henryk-michalewski` (proposed), `david-dohan` (proposed), `quoc-le`, `charles-sutton` (proposed).

<a id="kp-roformer-enhanced-transformer-rotary-position-2021"></a>

#### RoFormer: Enhanced Transformer with Rotary Position Embedding

- ID `kp-roformer-enhanced-transformer-rotary-position-2021` (proposed); subtype Research paper (work).
- Basis 1: cited by 5 dataset documents.
- Identifiers: arxiv 2104.09864; doi 10.1016/j.neucom.2023.127063.
- Authors as printed (paper:kp-roformer-enhanced-transformer-rotary-position-2021--v1, first page): “Jianlin Su”, “Yu Lu”, “Shengfeng Pan”, “Yunfeng Liu”. Not found on the first page (index names): Murtadha H. M. Ahmed, Wen Bo.
- arXiv comments (author-supplied): “fixed some typos”

| Version                              | Kind                | Date       | Precision | Basis                                                                                         |
| ------------------------------------ | ------------------- | ---------- | --------- | --------------------------------------------------------------------------------------------- |
| arXiv:2104.09864v1                   | arXiv submission    | 2021-04-20 | day       | arXiv submission history (UTC)                                                                |
| arXiv:2104.09864v2                   | arXiv submission    | 2021-10-09 | day       | arXiv submission history (UTC)                                                                |
| arXiv:2104.09864v3                   | arXiv submission    | 2022-08-05 | day       | arXiv submission history (UTC)                                                                |
| arXiv:2104.09864v4                   | arXiv submission    | 2022-08-09 | day       | arXiv submission history (UTC)                                                                |
| arXiv:2104.09864v5                   | arXiv submission    | 2023-11-08 | day       | arXiv submission history (UTC)                                                                |
| Neurocomputing, vol. 568, pp. 127063 | journal publication | 2024       | year      | Crossref published-print date (year kept; publisher-deposited, not checked against the issue) |

States:

- The paper examines methods of encoding positional information in transformer-based language models and proposes an implementation it names Rotary Position Embedding (RoPE). “We investigate various methods to encode positional information in transformer-based language models and propose a novel implementation named Rotary Position Embedding(RoPE).” (arXiv v1, PDF p. 1, abstract)

Cited by: LLaMA (2023 paper) (reference by arXiv identifier); DeepSeek-V3 Technical Report (reference or mention by title); Qwen Technical Report (reference by arXiv identifier); ChatGLM research history and techniques (reference by arXiv identifier); Seed-X: Building Strong Multilingual Translation LLM with 7B Parameters (PDF p. 17, reference or mention by title).

<a id="kp-scaling-language-models-methods-analysis-2021"></a>

#### Scaling Language Models: Methods, Analysis &amp; Insights from Training Gopher

- ID `kp-scaling-language-models-methods-analysis-2021` (proposed); subtype Research paper (work).
- Basis 1: cited by 5 dataset documents.
- Identifiers: arxiv 2112.11446.
- Authors as printed (paper:kp-scaling-language-models-methods-analysis-2021--v1, first page): “Jack W. Rae”, “Sebastian Borgeaud”, “Trevor Cai”, “Jordan Hoffmann”, “John Aslanides”, “Sarah Henderson”, “Roman Ring”, “Susannah Young”, “Eliza Rutherford”, “Tom Hennigan”, “Jacob Menick”, “Albin Cassirer”, “Richard Powell”, “Lisa Anne Hendricks”, “Maribeth Rauh”, “Po-Sen Huang”, “Amelia Glaese”, “Johannes Welbl”, “Sumanth Dathathri”, “Saffron Huang”, “Jonathan Uesato”, “John Mellor”, “Irina Higgins”, “Antonia Creswell”, “Nat McAleese”, “Amy Wu”, “Erich Elsen”, “Siddhant Jayakumar”, “Elena Buchatskaya”, “David Budden”, “Esme Sutherland”, “Karen Simonyan”, “Michela Paganini”, “Laurent Sifre”, “Lena Martens”, “Xiang Lorraine Li”, “Adhiguna Kuncoro”, “Aida Nematzadeh”, “Elena Gribovskaya”, “Domenic Donato”, “Angeliki Lazaridou”, “Arthur Mensch”, “Jean-Baptiste Lespiau”, “Maria Tsimpoukelli”, “Nikolai Grigorev”, “Doug Fritz”, “Thibault Sottiaux”, “Mantas Pajarskas”, “Toby Pohlen”, “Zhitao Gong”, “Daniel Toyama”, “Yujia Li”, “Tayfun Terzi”, “Vladimir Mikulik”, “Igor Babuschkin”, “Aidan Clark”, “Diego de Las Casas”, “Aurelia Guy”, “Chris Jones”, “James Bradbury”, “Matthew Johnson”, “Blake Hechtman”, “Laura Weidinger”, “Iason Gabriel”, “William Isaac”, “Ed Lockhart”, “Simon Osindero”, “Laura Rimell”, “Chris Dyer”, “Oriol Vinyals”, “Kareem Ayoub”, “Jeff Stanway”, “Lorrayne Bennett”, “Demis Hassabis”, “Koray Kavukcuoglu”, “Geoffrey Irving”. Not found on the first page (index names): Katie Milli-can, H. F. Song, G. Driessche, Cyprien de Masson d'Autume.
- arXiv comments (author-supplied): “120 pages”

| Version            | Kind             | Date       | Precision | Basis                          |
| ------------------ | ---------------- | ---------- | --------- | ------------------------------ |
| arXiv:2112.11446v1 | arXiv submission | 2021-12-08 | day       | arXiv submission history (UTC) |
| arXiv:2112.11446v2 | arXiv submission | 2022-01-21 | day       | arXiv submission history (UTC) |

States:

- The paper presents an analysis of Transformer-based language model performance across model scales from tens of millions of parameters up to a 280-billion-parameter model called Gopher. “In this paper, we present an analysis of Transformer-based language model performance across a wide range of model scales — from models with tens of millions of parameters up to a 280 billion parameter model called Gopher.” (arXiv v1, PDF p. 1, abstract)

Attributed-credit records (the citing document’s own attribution):

- [summarises an argument or finding] Hoffmann et al. (2022) attribute to Rae et al. (2021) the finding that improving loss by adding parameters has a negligible effect on unprompted toxic generation, and test whether it holds for compute-optimal training. “Rae et al. (2021) found that improving language modelling loss by increasing the number of model parameters has only a negligible effect on toxic text generation (unprompted)” (Training Compute-Optimal Large Language Models, PDF p. 14, §4.2.7 Gender bias and toxicity)

Cited by: Training Compute-Optimal Large Language Models (PDF p. 19, reference by arXiv identifier); Training language models to follow instructions with human feedback (PDF p. 24, reference by arXiv identifier); LLaMA (2023 paper) (reference by arXiv identifier); Qwen Technical Report (reference by arXiv identifier); source-gemini-report-v1 (PDF p. 31, reference by arXiv identifier).

Authorship records: `jack-w-rae` (proposed), `sebastian-borgeaud` (proposed), `trevor-cai` (proposed), `jordan-hoffmann` (proposed), `eliza-rutherford` (proposed), `tom-hennigan` (proposed), `lisa-anne-hendricks` (proposed), `maribeth-rauh` (proposed), `po-sen-huang` (proposed), `johannes-welbl` (proposed), `jonathan-uesato` (proposed), `john-mellor` (proposed), `erich-elsen` (proposed), `elena-buchatskaya` (proposed), `karen-simonyan`, `laurent-sifre`, `arthur-mensch`, `toby-pohlen`, `vladimir-mikulik`, `igor-babuschkin`, `aidan-clark` (proposed), `diego-de-las-casas` (proposed), `aurelia-guy` (proposed), `james-bradbury` (proposed), `laura-weidinger` (proposed), `iason-gabriel` (proposed), `william-isaac` (proposed), `simon-osindero` (proposed), `laura-rimell` (proposed), `oriol-vinyals`, `demis-hassabis`, `koray-kavukcuoglu`, `geoffrey-irving` (proposed).

<a id="kp-switch-transformers-scaling-trillion-parameter-2021"></a>

#### Switch Transformers: Scaling to Trillion Parameter Models with Simple and Efficient Sparsity

- ID `kp-switch-transformers-scaling-trillion-parameter-2021` (proposed); subtype Research paper (work).
- Basis 1: cited by 7 dataset documents.
- Identifiers: arxiv 2101.03961.
- Authors as printed (paper:kp-switch-transformers-scaling-trillion-parameter-2021--v1, first page): “William Fedus”, “Barret Zoph”, “Noam Shazeer”.
- arXiv comments (author-supplied): “JMLR”

| Version            | Kind             | Date       | Precision | Basis                          |
| ------------------ | ---------------- | ---------- | --------- | ------------------------------ |
| arXiv:2101.03961v1 | arXiv submission | 2021-01-11 | day       | arXiv submission history (UTC) |
| arXiv:2101.03961v2 | arXiv submission | 2022-04-30 | day       | arXiv submission history (UTC) |
| arXiv:2101.03961v3 | arXiv submission | 2022-06-16 | day       | arXiv submission history (UTC) |

States:

- The paper presents the Switch Transformer as its response to the complexity, communication costs and training instability it attributes to Mixture of Experts models. “We address these with the Switch Transformer.” (arXiv v1, PDF p. 1, abstract)
- The authors state that they simplify the Mixture of Experts routing algorithm and design models with reduced communication and computational costs. “We simplify the MoE routing algorithm and design intuitive improved models with reduced communication and computational costs.” (arXiv v1, PDF p. 1, abstract)

Cited by: Training Compute-Optimal Large Language Models (PDF p. 17, reference by arXiv identifier); Training language models to follow instructions with human feedback (PDF p. 22, reference by arXiv identifier); DeepSeek-V3 Technical Report (reference by arXiv identifier); Qwen Technical Report (reference or mention by title); ERNIE 3.0: Large-scale Knowledge Enhanced Pre-training for Language Understanding and Generation (PDF p. 18, reference by arXiv identifier); ERNIE 3.0 Titan: Exploring Larger-scale Knowledge Enhanced Pre-training for Language Understanding and Generation (PDF p. 24, reference by arXiv identifier); Kimi K3: Open Frontier Intelligence (PDF p. 36, reference or mention by title).

Authorship records: `liam-fedus`, `barret-zoph`, `noam-shazeer`.

<a id="kp-training-verifiers-solve-math-word-2021"></a>

#### Training Verifiers to Solve Math Word Problems

- ID `kp-training-verifiers-solve-math-word-2021` (proposed); subtype Research paper (work).
- Basis 1: cited by 7 dataset documents.
- Identifiers: arxiv 2110.14168.
- Authors as printed (paper:kp-training-verifiers-solve-math-word-2021--v1, first page): “Karl Cobbe”, “Vineet Kosaraju”, “Mohammad Bavarian”, “Jacob Hilton”, “Reiichiro Nakano”, “Christopher Hesse”, “John Schulman”. Not found on the first page (index names): Mark Chen, Heewoo Jun, Lukasz Kaiser, Matthias Plappert, Jerry Tworek.

| Version            | Kind             | Date       | Precision | Basis                          |
| ------------------ | ---------------- | ---------- | --------- | ------------------------------ |
| arXiv:2110.14168v1 | arXiv submission | 2021-10-27 | day       | arXiv submission history (UTC) |
| arXiv:2110.14168v2 | arXiv submission | 2021-11-18 | day       | arXiv submission history (UTC) |

States:

- The paper introduces GSM8K, a dataset it describes as 8.5K grade school math word problems. “To diagnose the failures of current models and support research, we introduce GSM8K, a dataset of 8.5K high quality linguistically diverse grade school math word problems.” (arXiv v1, PDF p. 1, abstract)
- The paper proposes training verifiers that judge the correctness of model-generated solutions. “To increase performance, we propose training verifiers to judge the correctness of model completions.” (arXiv v1, PDF p. 1, abstract)

Cited by: Claude 2 model card (PDF p. 13, reference by arXiv identifier); LLaMA (2023 paper) (reference by arXiv identifier); DeepSeek-V3 Technical Report (reference by arXiv identifier); Qwen Technical Report (reference by arXiv identifier); ChatGLM research history and techniques (reference by arXiv identifier); Kimi K2: Open Agentic Intelligence (PDF p. 21, reference by arXiv identifier); source-gemini-report-v1 (PDF p. 26, reference by arXiv identifier).

Authorship records: `mohammad-bavarian` (proposed), `jacob-hilton` (proposed), `christopher-hesse` (proposed), `john-schulman`.

<a id="kp-truthfulqa-measuring-how-models-mimic-2021"></a>

#### TruthfulQA: Measuring How Models Mimic Human Falsehoods

- ID `kp-truthfulqa-measuring-how-models-mimic-2021` (proposed); subtype Research paper (work).
- Basis 1: cited by 5 dataset documents.
- Identifiers: arxiv 2109.07958; doi 10.18653/v1/2022.acl-long.229.
- Authors as printed (paper:kp-truthfulqa-measuring-how-models-mimic-2021--v1, first page): “Stephanie Lin”, “Jacob Hilton”, “Owain Evans”.
- arXiv comments (author-supplied): “ACL 2022 (main conference); the TruthfulQA benchmark and evaluation code is available at [link: https://github.com/sylinrl/TruthfulQA] this https URL”

| Version                                                                                                                        | Kind                   | Date       | Precision | Basis                                                                                         |
| ------------------------------------------------------------------------------------------------------------------------------ | ---------------------- | ---------- | --------- | --------------------------------------------------------------------------------------------- |
| arXiv:2109.07958v1                                                                                                             | arXiv submission       | 2021-09-08 | day       | arXiv submission history (UTC)                                                                |
| Proceedings of the 60th Annual Meeting of the Association for Computational Linguistics (Volume 1: Long Papers), pp. 3214-3252 | conference publication | 2022       | year      | Crossref published-print date (year kept; publisher-deposited, not checked against the issue) |
| arXiv:2109.07958v2                                                                                                             | arXiv submission       | 2022-05-08 | day       | arXiv submission history (UTC)                                                                |

States:

- The paper proposes a benchmark, TruthfulQA, for measuring whether a language model is truthful in answering questions, and reports that it comprises 817 questions in 38 categories. “We propose a benchmark to measure whether a language model is truthful in generating answers to questions.” (arXiv v1, PDF p. 1, abstract)

Cited by: Training Compute-Optimal Large Language Models (PDF p. 19, reference by arXiv identifier); Training language models to follow instructions with human feedback (PDF p. 23, reference by arXiv identifier); GPT-4 System Card (PDF p. 33, reference or mention by title); Claude 2 model card (PDF p. 13, reference or mention by title); LLaMA (2023 paper) (reference by arXiv identifier).

Authorship records: `jacob-hilton` (proposed).

### 2022

<a id="kp-chain-thought-prompting-elicits-reasoning-2022"></a>

#### Chain-of-Thought Prompting Elicits Reasoning in Large Language Models

- ID `kp-chain-thought-prompting-elicits-reasoning-2022` (proposed); subtype Research paper (work).
- Basis 1: cited by 5 dataset documents.
- Identifiers: arxiv 2201.11903; doi 10.52202/068431-1800.
- Authors as printed (paper:kp-chain-thought-prompting-elicits-reasoning-2022--v1, first page): “Jason Wei”, “Xuezhi Wang”, “Dale Schuurmans”, “Maarten Bosma”, “Ed Chi”, “Quoc Le”, “Denny Zhou”. Not found on the first page (index names): F. Xia.

| Version                                                               | Kind                   | Date       | Precision | Basis                                                                                         |
| --------------------------------------------------------------------- | ---------------------- | ---------- | --------- | --------------------------------------------------------------------------------------------- |
| Advances in Neural Information Processing Systems 35, pp. 24824-24837 | conference publication | 2022       | year      | Crossref published-print date (year kept; publisher-deposited, not checked against the issue) |
| arXiv:2201.11903v1                                                    | arXiv submission       | 2022-01-28 | day       | arXiv submission history (UTC)                                                                |
| arXiv:2201.11903v2                                                    | arXiv submission       | 2022-04-06 | day       | arXiv submission history (UTC)                                                                |
| arXiv:2201.11903v3                                                    | arXiv submission       | 2022-06-01 | day       | arXiv submission history (UTC)                                                                |
| arXiv:2201.11903v4                                                    | arXiv submission       | 2022-06-13 | day       | arXiv submission history (UTC)                                                                |
| arXiv:2201.11903v5                                                    | arXiv submission       | 2022-10-10 | day       | arXiv submission history (UTC)                                                                |
| arXiv:2201.11903v6                                                    | arXiv submission       | 2023-01-10 | day       | arXiv submission history (UTC)                                                                |

States:

- The paper studies prompting language models to generate a chain of thought, a series of intermediate sentences before an answer, and reports that this improves reasoning performance in sufficiently large models. “This paper explores the ability of language models to generate a coherent chain of thought—a series of short sentences that mimic the reasoning process a person might have when responding to a question.” (arXiv v1, PDF p. 1, abstract)

Cited by: Self-critiquing models for assisting human evaluators (PDF p. 23, reference by arXiv identifier); Qwen Technical Report (reference or mention by title); ChatGLM research history and techniques (reference or mention by title); Seed-Thinking-v1.5: Advancing Superb Reasoning Models with Reinforcement Learning (PDF p. 14, reference or mention by title); source-gemini-report-v1 (PDF p. 33, reference by arXiv identifier).

Authorship records: `jason-wei` (proposed), `xuezhi-wang` (proposed), `dale-schuurmans` (proposed), `maarten-bosma` (proposed), `ed-chi` (proposed), `quoc-le`, `denny-zhou` (proposed).

<a id="kp-challenging-big-bench-tasks-whether-2022"></a>

#### Challenging BIG-Bench Tasks and Whether Chain-of-Thought Can Solve Them

- ID `kp-challenging-big-bench-tasks-whether-2022` (proposed); subtype Research paper (work).
- Basis 1: cited by 6 dataset documents.
- Identifiers: arxiv 2210.09261.
- Authors as printed (paper:kp-challenging-big-bench-tasks-whether-2022--v1, first page): “Mirac Suzgun”, “Nathan Scales”, “Nathanael Schärli”, “Sebastian Gehrmann”, “Yi Tay”, “Hyung Won Chung”, “Aakanksha Chowdhery”, “Quoc V. Le”, “Ed H. Chi”, “Denny Zhou”, “Jason Wei”.
- arXiv comments (author-supplied): “GitHub repository: [link: https://github.com/suzgunmirac/BIG-Bench-Hard] this https URL”

| Version            | Kind             | Date       | Precision | Basis                          |
| ------------------ | ---------------- | ---------- | --------- | ------------------------------ |
| arXiv:2210.09261v1 | arXiv submission | 2022-10-17 | day       | arXiv submission history (UTC) |

States:

- The paper defines BIG-Bench Hard (BBH), a suite of 23 BIG-Bench tasks, and studies chain-of-thought prompting on it. “In this work, we focus on a suite of 23 challenging BIG-Bench tasks which we call BIG-Bench Hard (BBH).” (arXiv v1, PDF p. 1, abstract)

Cited by: DeepSeek-V3 Technical Report (reference by arXiv identifier); Qwen Technical Report (reference by arXiv identifier); ChatGLM research history and techniques (reference or mention by title); ERNIE 5.0 Technical Report (PDF p. 34, reference or mention by title); Kimi K2: Open Agentic Intelligence (PDF p. 23, reference by arXiv identifier); source-gemini-report-v1 (PDF p. 32, reference by arXiv identifier).

Authorship records: `sebastian-gehrmann` (proposed), `yi-tay`, `hyung-won-chung` (proposed), `aakanksha-chowdhery` (proposed), `quoc-le`, `denny-zhou` (proposed), `jason-wei` (proposed).

<a id="kp-constitutional-ai-harmlessness-from-ai-2022"></a>

#### Constitutional AI: Harmlessness from AI Feedback

- ID `kp-constitutional-ai-harmlessness-from-ai-2022` (proposed); subtype Research paper (work).
- Basis 1: cited by 6 dataset documents.
- Identifiers: arxiv 2212.08073.
- Authors as printed (paper:kp-constitutional-ai-harmlessness-from-ai-2022--v1, first page): “Yuntao Bai”, “Saurav Kadavath”, “Sandipan Kundu”, “Amanda Askell”, “Jackson Kernion”, “Andy Jones”, “Anna Chen”, “Anna Goldie”, “Azalia Mirhoseini”, “Cameron McKinnon”, “Carol Chen”, “Catherine Olsson”, “Christopher Olah”, “Danny Hernandez”, “Dawn Drain”, “Deep Ganguli”, “Dustin Li”, “Eli Tran-Johnson”, “Ethan Perez”, “Jamie Kerr”, “Jared Mueller”, “Jeffrey Ladish”, “Joshua Landau”, “Kamal Ndousse”, “Liane Lovitt”, “Michael Sellitto”, “Nelson Elhage”, “Nicholas Schiefer”, “Noemi Mercado”, “Nova DasSarma”, “Robert Lasenby”, “Robin Larson”, “Sam Ringer”, “Scott Johnston”, “Shauna Kravec”, “Sheer El Showk”, “Stanislav Fort”, “Tamera Lanham”, “Timothy Telleen-Lawton”, “Tom Conerly”, “Tom Henighan”, “Tristan Hume”, “Samuel R. Bowman”, “Zac Hatfield-Dodds”, “Ben Mann”, “Dario Amodei”, “Nicholas Joseph”, “Sam McCandlish”, “Tom Brown”, “Jared Kaplan”. Not found on the first page (index names): Kamilė Lukošiūtė.

| Version            | Kind             | Date       | Precision | Basis                          |
| ------------------ | ---------------- | ---------- | --------- | ------------------------------ |
| arXiv:2212.08073v1 | arXiv submission | 2022-12-15 | day       | arXiv submission history (UTC) |

States:

- The paper describes a method it calls Constitutional AI (CAI) and its use to train a non-evasive and relatively harmless AI assistant without human feedback labels for harms. “In this paper we develop a method we refer to as Constitutional AI (CAI), depicted in Figure 1, and use it to train a non-evasive and relatively harmless AI assistant, without any human feedback labels for harms.” (arXiv v1, PDF p. 2, §1 Introduction, para. 2)

Cited by: Weak-to-Strong Generalization: Eliciting Strong Capabilities With Weak Supervision (PDF p. 19, reference by arXiv identifier); GPT-4 System Card (PDF p. 38, reference or mention by title); Claude 2 model card (PDF p. 12, reference by arXiv identifier); DeepSeek-V3 Technical Report (reference by arXiv identifier); Qwen Technical Report (reference by arXiv identifier); source-gemini-report-v1 (PDF p. 24, reference by arXiv identifier).

Authorship records: `yuntao-bai` (proposed), `saurav-kadavath` (proposed), `amanda-askell` (proposed), `jackson-kernion` (proposed), `andy-jones` (proposed), `anna-chen` (proposed), `catherine-olsson` (proposed), `chris-olah`, `danny-hernandez` (proposed), `dawn-drain` (proposed), `deep-ganguli` (proposed), `kamal-ndousse` (proposed), `liane-lovitt` (proposed), `nelson-elhage` (proposed), `nova-dassarma` (proposed), `scott-johnston` (proposed), `shauna-kravec` (proposed), `sheer-el-showk` (proposed), `stanislav-fort` (proposed), `tom-conerly` (proposed), `tom-henighan` (proposed), `tristan-hume` (proposed), `samuel-r-bowman` (proposed), `zac-hatfield-dodds` (proposed), `ben-mann`, `dario-amodei`, `nicholas-joseph` (proposed), `sam-mccandlish`, `tom-brown`, `jared-kaplan`.

<a id="kp-lamda-language-models-dialog-applications-2022"></a>

#### LaMDA: Language Models for Dialog Applications

- ID `kp-lamda-language-models-dialog-applications-2022` (proposed); subtype Research paper (work).
- Basis 1: cited by 5 dataset documents.
- Identifiers: arxiv 2201.08239.
- Authors as printed (paper:kp-lamda-language-models-dialog-applications-2022--v1, first page): “Romal Thoppilan”, “Daniel De Freitas”, “Jamie Hall”, “Noam Shazeer”, “Apoorv Kulshreshtha”, “Heng-Tze Cheng”, “Alicia Jin”, “Taylor Bos”, “Leslie Baker”, “Yu Du”, “Hongrae Lee”, “Huaixiu Steven Zheng”, “Amin Ghafouri”, “Marcelo Menegali”, “Yanping Huang”, “Maxim Krikun”, “Dmitry Lepikhin”, “James Qin”, “Dehao Chen”, “Yuanzhong Xu”, “Zhifeng Chen”, “Adam Roberts”, “Maarten Bosma”, “Yanqi Zhou”, “Chung-Ching Chang”, “Igor Krivokon”, “Will Rusch”, “Marc Pickett”, “Kathleen Meier-Hellstern”, “Tulsee Doshi”, “Renelito Delos Santos”, “Toju Duke”, “Johnny Soraker”, “Ben Zevenbergen”, “Vinodkumar Prabhakaran”, “Mark Diaz”, “Ben Hutchinson”, “Kristen Olson”, “Alejandra Molina”, “Erin Hoffman-John”, “Josh Lee”, “Lora Aroyo”, “Ravi Rajakumar”, “Alena Butryna”, “Matthew Lamm”, “Viktoriya Kuzmina”, “Aaron Cohen”, “Rachel Bernstein”, “Ray Kurzweil”, “Blaise Aguera-Arcas”, “Claire Cui”, “Marian Croak”, “Ed Chi”, “Quoc Le”. Not found on the first page (index names): Yaguang Li, Vincent Y. Zhao, Pranesh Srinivasan, L. Man, M. Morris, Joseph Fenton.

| Version            | Kind             | Date       | Precision | Basis                          |
| ------------------ | ---------------- | ---------- | --------- | ------------------------------ |
| arXiv:2201.08239v1 | arXiv submission | 2022-01-20 | day       | arXiv submission history (UTC) |
| arXiv:2201.08239v2 | arXiv submission | 2022-01-21 | day       | arXiv submission history (UTC) |
| arXiv:2201.08239v3 | arXiv submission | 2022-02-10 | day       | arXiv submission history (UTC) |

States:

- The paper presents LaMDA (Language Models for Dialog Applications). “We present LaMDA: Language Models for Dialog Applications.” (arXiv v1, PDF p. 1, abstract)
- The paper describes LaMDA as a family of Transformer-based language models specialised for dialog, with up to 137B parameters, pre-trained on 1.56T words of public dialog data and web text. “LaMDA is a family of Transformerbased neural language models specialized for dialog, which have up to 137B parameters and are pre-trained on 1.56T words of public dialog data and web text.” (arXiv v1, PDF p. 1, abstract)

Cited by: Training Compute-Optimal Large Language Models (PDF p. 20, reference or mention by title); Training language models to follow instructions with human feedback (PDF p. 25, reference by arXiv identifier); LLaMA (2023 paper) (reference or mention by title); Qwen Technical Report (reference by arXiv identifier); GPTs are GPTs: An Early Look at the Labor Market Impact Potential of Large Language Models (PDF p. 35, reference by arXiv identifier).

Authorship records: `daniel-de-freitas`, `noam-shazeer`, `yanping-huang` (proposed), `maxim-krikun` (proposed), `dmitry-lepikhin` (proposed), `dehao-chen` (proposed), `yuanzhong-xu` (proposed), `zhifeng-chen` (proposed), `adam-roberts` (proposed), `maarten-bosma` (proposed), `yanqi-zhou` (proposed), `toju-duke` (proposed), `vinodkumar-prabhakaran` (proposed), `mark-diaz` (proposed), `ben-hutchinson` (proposed), `ed-chi` (proposed), `quoc-le`.

<a id="kp-palm-scaling-language-modeling-pathways-2022"></a>

#### PaLM: Scaling Language Modeling with Pathways

- ID `kp-palm-scaling-language-modeling-pathways-2022` (proposed); subtype Research paper (work).
- Basis 1: cited by 5 dataset documents.
- Identifiers: arxiv 2204.02311.
- Authors as printed (paper:kp-palm-scaling-language-modeling-pathways-2022--v1, first page): “Aakanksha Chowdhery”, “Sharan Narang”, “Jacob Devlin”, “Maarten Bosma”, “Gaurav Mishra”, “Adam Roberts”, “Paul Barham”, “Hyung Won Chung”, “Charles Sutton”, “Sebastian Gehrmann”, “Parker Schuh”, “Kensen Shi”, “Sasha Tsvyashchenko”, “Joshua Maynez”, “Abhishek Rao”, “Parker Barnes”, “Yi Tay”, “Noam Shazeer”, “Vinodkumar Prabhakaran”, “Emily Reif”, “Nan Du”, “Ben Hutchinson”, “Reiner Pope”, “James Bradbury”, “Jacob Austin”, “Michael Isard”, “Guy Gur-Ari”, “Pengcheng Yin”, “Toju Duke”, “Anselm Levskaya”, “Sanjay Ghemawat”, “Sunipa Dev”, “Henryk Michalewski”, “Xavier Garcia”, “Vedant Misra”, “Kevin Robinson”, “Liam Fedus”, “Denny Zhou”, “Daphne Ippolito”, “David Luan”, “Hyeontaek Lim”, “Barret Zoph”, “Alexander Spiridonov”, “Ryan Sepassi”, “David Dohan”, “Shivani Agrawal”, “Mark Omernick”, “Andrew M. Dai”, “Thanumalayan Sankaranarayana Pillai”, “Marie Pellat”, “Aitor Lewkowycz”, “Erica Moreira”, “Rewon Child”, “Oleksandr Polozov”, “Katherine Lee”, “Zongwei Zhou”, “Xuezhi Wang”, “Brennan Saeta”, “Mark Diaz”, “Orhan Firat”, “Michele Catasta”, “Jason Wei”, “Kathy Meier-Hellstern”, “Douglas Eck”, “Jeff Dean”, “Slav Petrov”, “Noah Fiedel”.

| Version            | Kind             | Date       | Precision | Basis                          |
| ------------------ | ---------------- | ---------- | --------- | ------------------------------ |
| arXiv:2204.02311v1 | arXiv submission | 2022-04-05 | day       | arXiv submission history (UTC) |
| arXiv:2204.02311v2 | arXiv submission | 2022-04-07 | day       | arXiv submission history (UTC) |
| arXiv:2204.02311v3 | arXiv submission | 2022-04-19 | day       | arXiv submission history (UTC) |
| arXiv:2204.02311v4 | arXiv submission | 2022-09-29 | day       | arXiv submission history (UTC) |
| arXiv:2204.02311v5 | arXiv submission | 2022-10-05 | day       | arXiv submission history (UTC) |

States:

- The authors state that, to study the impact of scale on few-shot learning, they trained a 540-billion-parameter, densely activated Transformer language model called Pathways Language Model (PaLM). “To further our understanding of the impact of scale on few-shot learning, we trained a 540-billion parameter, densely activated, Transformer language model, which we call Pathways Language Model (PaLM).” (arXiv v1, PDF p. 1, abstract)

Cited by: Self-critiquing models for assisting human evaluators (PDF p. 21, reference by arXiv identifier); LLaMA (2023 paper) (reference by arXiv identifier); Qwen Technical Report (reference by arXiv identifier); ChatGLM research history and techniques (reference by arXiv identifier); source-gemini-report-v1 (PDF p. 26, reference or mention by title).

Authorship records: `aakanksha-chowdhery` (proposed), `sharan-narang` (proposed), `jacob-devlin` (proposed), `maarten-bosma` (proposed), `adam-roberts` (proposed), `hyung-won-chung` (proposed), `charles-sutton` (proposed), `sebastian-gehrmann` (proposed), `yi-tay`, `noam-shazeer`, `vinodkumar-prabhakaran` (proposed), `ben-hutchinson` (proposed), `james-bradbury` (proposed), `jacob-austin` (proposed), `toju-duke` (proposed), `sanjay-ghemawat`, `henryk-michalewski` (proposed), `vedant-misra` (proposed), `liam-fedus`, `denny-zhou` (proposed), `david-luan`, `barret-zoph`, `david-dohan` (proposed), `andrew-m-dai` (proposed), `rewon-child` (proposed), `katherine-lee` (proposed), `xuezhi-wang` (proposed), `mark-diaz` (proposed), `orhan-firat` (proposed), `jason-wei` (proposed), `jeff-dean`, `slav-petrov` (proposed).

<a id="kp-self-consistency-improves-chain-thought-2022"></a>

#### Self-Consistency Improves Chain of Thought Reasoning in Language Models

- ID `kp-self-consistency-improves-chain-thought-2022` (proposed); subtype Research paper (work).
- Basis 1: cited by 5 dataset documents.
- Identifiers: arxiv 2203.11171.
- Authors as printed (paper:kp-self-consistency-improves-chain-thought-2022--v1, first page): “Xuezhi Wang”, “Jason Wei”, “Dale Schuurmans”, “Quoc Le”, “Denny Zhou”. Not found on the first page (index names): Ed H. Chi, Sharan Narang, A. Chowdhery.
- arXiv comments (author-supplied): “Published at ICLR 2023. V2: added PaLM results; V3: added UL2 results; V4: camera ready version at ICLR 2023”

| Version            | Kind             | Date       | Precision | Basis                          |
| ------------------ | ---------------- | ---------- | --------- | ------------------------------ |
| arXiv:2203.11171v1 | arXiv submission | 2022-03-21 | day       | arXiv submission history (UTC) |
| arXiv:2203.11171v2 | arXiv submission | 2022-04-06 | day       | arXiv submission history (UTC) |
| arXiv:2203.11171v3 | arXiv submission | 2022-10-04 | day       | arXiv submission history (UTC) |
| arXiv:2203.11171v4 | arXiv submission | 2023-03-07 | day       | arXiv submission history (UTC) |

States:

- The paper presents self-consistency, an ensemble strategy that the authors report improves the reasoning accuracy of large language models. “We explore a simple ensemble strategy, self-consistency, that significantly improves the reasoning accuracy of large language models.” (arXiv v1, PDF p. 1, abstract)

Cited by: Self-critiquing models for assisting human evaluators (PDF p. 23, reference by arXiv identifier); LLaMA (2023 paper) (reference or mention by title); DeepSeek-R1 research report (reference by arXiv identifier); Qwen Technical Report (reference by arXiv identifier); source-gemini-report-v1 (PDF p. 33, reference by arXiv identifier).

Authorship records: `xuezhi-wang` (proposed), `jason-wei` (proposed), `dale-schuurmans` (proposed), `quoc-le`, `denny-zhou` (proposed).

<a id="kp-alignment-problem-from-deep-learning-2022"></a>

#### The Alignment Problem from a Deep Learning Perspective

- ID `kp-alignment-problem-from-deep-learning-2022` (proposed); subtype Research paper (work).
- Basis 1: cited by 5 dataset documents.
- Identifiers: arxiv 2209.00626.
- Authors as printed (paper:kp-alignment-problem-from-deep-learning-2022--v1, first page): “Richard Ngo”. Not found on the first page (index names): Lawrence Chan, Sören Mindermann.
- arXiv comments (author-supplied): “Published in ICLR 2024”

| Version            | Kind             | Date       | Precision | Basis                          |
| ------------------ | ---------------- | ---------- | --------- | ------------------------------ |
| arXiv:2209.00626v1 | arXiv submission | 2022-08-30 | day       | arXiv submission history (UTC) |
| arXiv:2209.00626v2 | arXiv submission | 2022-12-14 | day       | arXiv submission history (UTC) |
| arXiv:2209.00626v3 | arXiv submission | 2022-12-16 | day       | arXiv submission history (UTC) |
| arXiv:2209.00626v4 | arXiv submission | 2023-02-22 | day       | arXiv submission history (UTC) |
| arXiv:2209.00626v5 | arXiv submission | 2023-09-01 | day       | arXiv submission history (UTC) |
| arXiv:2209.00626v6 | arXiv submission | 2024-03-19 | day       | arXiv submission history (UTC) |
| arXiv:2209.00626v7 | arXiv submission | 2025-03-03 | day       | arXiv submission history (UTC) |
| arXiv:2209.00626v8 | arXiv submission | 2025-05-04 | day       | arXiv submission history (UTC) |

States:

- The report states that it makes a case that, without substantial action to prevent it, AGIs will likely pursue goals that are misaligned from a human perspective, with potentially catastrophic consequences. “This report makes a case for why, without substantial action to prevent it, AGIs will likely use their intelligence to pursue goals which are very undesirable (in other words, misaligned) from a human perspective, with potentially catastrophic consequences.” (arXiv v1, PDF p. 1, abstract)

Cited by: Weak-to-Strong Generalization: Eliciting Strong Capabilities With Weak Supervision (PDF p. 24, reference by arXiv identifier); GPT-4 System Card (PDF p. 35, reference or mention by title); The A.I. Dilemma: Growth versus Existential Risk (PDF p. 23, reference or mention by title); How Much Should We Spend to Reduce A.I.'s Existential Risk? (PDF p. 22, reference or mention by title); The California Report on Frontier AI Policy (PDF p. 49, reference or mention by title).

Authorship records: `richard-ngo`.

<a id="kp-training-helpful-harmless-assistant-reinforcement-2022"></a>

#### Training a Helpful and Harmless Assistant with Reinforcement Learning from Human Feedback

- ID `kp-training-helpful-harmless-assistant-reinforcement-2022` (proposed); subtype Research paper (work).
- Basis 1: cited by 7 dataset documents.
- Identifiers: arxiv 2204.05862.
- Authors as printed (paper:kp-training-helpful-harmless-assistant-reinforcement-2022--v1, first page): “Yuntao Bai”, “Andy Jones”, “Kamal Ndousse”, “Amanda Askell”, “Anna Chen”, “Nova DasSarma”, “Dawn Drain”, “Stanislav Fort”, “Deep Ganguli”, “Tom Henighan”, “Nicholas Joseph”, “Saurav Kadavath”, “Jackson Kernion”, “Tom Conerly”, “Sheer El-Showk”, “Nelson Elhage”, “Zac Hatfield-Dodds”, “Danny Hernandez”, “Tristan Hume”, “Scott Johnston”, “Shauna Kravec”, “Liane Lovitt”, “Neel Nanda”, “Catherine Olsson”, “Dario Amodei”, “Tom Brown”, “Jack Clark”, “Sam McCandlish”, “Chris Olah”, “Ben Mann”, “Jared Kaplan”.
- arXiv comments (author-supplied): “Data available at [link: https://github.com/anthropics/hh-rlhf] this https URL”

| Version            | Kind             | Date       | Precision | Basis                          |
| ------------------ | ---------------- | ---------- | --------- | ------------------------------ |
| arXiv:2204.05862v1 | arXiv submission | 2022-04-12 | day       | arXiv submission history (UTC) |

States:

- The paper describes applying preference modelling and reinforcement learning from human feedback (RLHF) to fine-tune language models to act as helpful and harmless assistants. “We apply preference modeling and reinforcement learning from human feedback (RLHF) to finetune language models to act as helpful and harmless assistants.” (arXiv v1, PDF p. 1, abstract)

Cited by: Self-critiquing models for assisting human evaluators (PDF p. 20, reference by arXiv identifier); Weak-to-Strong Generalization: Eliciting Strong Capabilities With Weak Supervision (PDF p. 19, reference by arXiv identifier); GPT-4 System Card (PDF p. 32, reference or mention by title); Claude 2 model card (PDF p. 12, reference or mention by title); Qwen Technical Report (reference by arXiv identifier); GPTs are GPTs: An Early Look at the Labor Market Impact Potential of Large Language Models (PDF p. 31, reference by arXiv identifier); source-gemini-report-v1 (PDF p. 24, reference by arXiv identifier).

Authorship records: `yuntao-bai` (proposed), `andy-jones` (proposed), `kamal-ndousse` (proposed), `amanda-askell` (proposed), `anna-chen` (proposed), `nova-dassarma` (proposed), `dawn-drain` (proposed), `stanislav-fort` (proposed), `deep-ganguli` (proposed), `tom-henighan` (proposed), `nicholas-joseph` (proposed), `saurav-kadavath` (proposed), `jackson-kernion` (proposed), `tom-conerly` (proposed), `sheer-el-showk` (proposed), `nelson-elhage` (proposed), `zac-hatfield-dodds` (proposed), `danny-hernandez` (proposed), `tristan-hume` (proposed), `scott-johnston` (proposed), `shauna-kravec` (proposed), `liane-lovitt` (proposed), `catherine-olsson` (proposed), `dario-amodei`, `tom-brown`, `jack-clark`, `sam-mccandlish`, `chris-olah`, `ben-mann`, `jared-kaplan`.

<a id="compute-optimal-language-models"></a>

#### Training Compute-Optimal Large Language Models

- ID `compute-optimal-language-models` (existing dataset document); subtype Research paper (work).
- Basis 1: cited by 9 dataset documents.
- Identifiers: arxiv 2203.15556; doi 10.52202/068431-2176.
- Authors as printed (paper:compute-optimal-language-models--v1, first page): “Jordan Hoffmann”, “Sebastian Borgeaud”, “Arthur Mensch”, “Elena Buchatskaya”, “Trevor Cai”, “Eliza Rutherford”, “Diego de Las Casas”, “Lisa Anne Hendricks”, “Johannes Welbl”, “Aidan Clark”, “Tom Hennigan”, “Eric Noland”, “Katie Millican”, “George van den Driessche”, “Bogdan Damoc”, “Aurelia Guy”, “Simon Osindero”, “Karen Simonyan”, “Erich Elsen”, “Jack W. Rae”, “Oriol Vinyals”, “Laurent Sifre”.

| Version                                                               | Kind                   | Date       | Precision | Basis                                                                                         |
| --------------------------------------------------------------------- | ---------------------- | ---------- | --------- | --------------------------------------------------------------------------------------------- |
| Advances in Neural Information Processing Systems 35, pp. 30016-30030 | conference publication | 2022       | year      | Crossref published-print date (year kept; publisher-deposited, not checked against the issue) |
| arXiv:2203.15556v1                                                    | arXiv submission       | 2022-03-29 | day       | arXiv submission history (UTC)                                                                |

States:

- The authors report that, from training over 400 language models, they find that compute-optimal training scales model size and the number of training tokens equally, doubling tokens with every doubling of model size. “By training over 400 language models … we find that for compute-optimal training, the model size and the number of training tokens should be scaled equally: for every doubling of model size the number of training tokens should also be doubled.” (arXiv v1, PDF p. 1, abstract)
- The paper describes testing this hypothesis by training Chinchilla, a 70-billion-parameter model with the same compute budget as Gopher and four times more data. “We test this hypothesis by training a predicted … model, Chinchilla, that uses the same compute budget as Gopher but with 70B parameters and 4× more more data.” (arXiv v1, PDF p. 1, abstract)

Cited by: Self-critiquing models for assisting human evaluators (PDF p. 21, reference by arXiv identifier); LLaMA (2023 paper) (reference by arXiv identifier); Qwen Technical Report (reference by arXiv identifier); Explosive growth from AI automation: A review of the arguments (PDF p. 25, reference by arXiv identifier); Kimi K3: Open Frontier Intelligence (PDF p. 36, reference by arXiv identifier); Seed1.5-VL Technical Report (PDF p. 35, reference by arXiv identifier); NIST AI 800-1 (initial public draft): Managing Misuse Risk for Dual-Use Foundation Models (PDF p. 25, reference or mention by title); NIST AI 800-1 (second public draft): Managing Misuse Risk for Dual-Use Foundation Models (PDF p. 64, reference or mention by title); source-gemini-report-v1 (PDF p. 27, reference by arXiv identifier).

Authorship records: `jordan-hoffmann` (proposed), `sebastian-borgeaud` (proposed), `arthur-mensch`, `elena-buchatskaya` (proposed), `trevor-cai` (proposed), `eliza-rutherford` (proposed), `diego-de-las-casas` (proposed), `lisa-anne-hendricks` (proposed), `johannes-welbl` (proposed), `aidan-clark` (proposed), `tom-hennigan` (proposed), `aurelia-guy` (proposed), `simon-osindero` (proposed), `karen-simonyan`, `erich-elsen` (proposed), `jack-w-rae` (proposed), `oriol-vinyals`, `laurent-sifre`.

<a id="instructgpt-paper"></a>

#### Training language models to follow instructions with human feedback

- ID `instructgpt-paper` (existing dataset document); subtype Research paper (work).
- Basis 1: cited by 11 dataset documents.
- Identifiers: arxiv 2203.02155; doi 10.52202/068431-2011.
- Authors as printed (paper:instructgpt-paper--v1, first page): “Long Ouyang”, “Jeff Wu”, “Xu Jiang”, “Diogo Almeida”, “Carroll L. Wainwright”, “Pamela Mishkin”, “Chong Zhang”, “Sandhini Agarwal”, “Katarina Slama”, “Alex Ray”, “John Schulman”, “Jacob Hilton”, “Fraser Kelton”, “Luke Miller”, “Maddie Simens”, “Amanda Askell”, “Peter Welinder”, “Paul Christiano”, “Jan Leike”, “Ryan Lowe”.

| Version                                                               | Kind                   | Date       | Precision | Basis                                                                                         |
| --------------------------------------------------------------------- | ---------------------- | ---------- | --------- | --------------------------------------------------------------------------------------------- |
| Advances in Neural Information Processing Systems 35, pp. 27730-27744 | conference publication | 2022       | year      | Crossref published-print date (year kept; publisher-deposited, not checked against the issue) |
| arXiv:2203.02155v1                                                    | arXiv submission       | 2022-03-04 | day       | arXiv submission history (UTC)                                                                |

States:

- The authors state that the paper shows a way to align language models with user intent across a wide range of tasks by fine-tuning with human feedback. “In this paper, we show an avenue for aligning language models with user intent on a wide range of tasks by fine-tuning with human feedback.” (arXiv v1, PDF p. 1, abstract)

Cited by: Self-critiquing models for assisting human evaluators (PDF p. 22, reference by arXiv identifier); Weak-to-Strong Generalization: Eliciting Strong Capabilities With Weak Supervision (PDF p. 24, reference or mention by title); GPT-4 System Card (PDF p. 31, reference or mention by title); LLaMA (2023 paper) (reference or mention by title); Qwen Technical Report (reference or mention by title); ChatGLM research history and techniques (reference or mention by title); Without specific countermeasures, the easiest path to transformative AI likely leads to AI takeover (reference or mention by title); GPTs are GPTs: An Early Look at the Labor Market Impact Potential of Large Language Models (PDF p. 34, reference by arXiv identifier); Kimi K2: Open Agentic Intelligence (PDF p. 23, reference or mention by title); Seed1.5-VL Technical Report (PDF p. 38, reference by arXiv identifier); source-gemini-report-v1 (PDF p. 30, reference or mention by title).

Authorship records: `pamela-mishkin`, `sandhini-agarwal` (proposed), `alex-ray` (proposed), `john-schulman`, `jacob-hilton` (proposed), `amanda-askell` (proposed), `peter-welinder` (proposed), `paul-christiano`, `jan-leike`.

### 2023

<a id="kp-ai-risk-management-framework-2023"></a>

#### Artificial Intelligence Risk Management Framework (AI RMF 1.0)

- ID `kp-ai-risk-management-framework-2023` (proposed); subtype Research paper (work).
- Basis 1: cited by 9 dataset documents.
- Identifiers: doi 10.6028/nist.ai.100-1.
- Authors as printed (paper:kp-ai-risk-management-framework-2023--text, first page): not read. Not found on the first page (index names): Elham Tabassi.
- Preparer's note: The index gives a short title; the title page prints "Artificial Intelligence Risk Management Framework (AI RMF 1.0)" and "January 2023" (corrected after the same-family audit).

| Version       | Kind                        | Date    | Precision | Basis                                       |
| ------------- | --------------------------- | ------- | --------- | ------------------------------------------- |
| NIST AI 100-1 | publication (report series) | 2023-01 | month     | title page of the PDF read ("January 2023") |

States:

- The document states that, as directed by the National Artificial Intelligence Initiative Act of 2020, the AI RMF aims to offer organisations that design, develop, deploy or use AI systems a resource to help manage the risks of AI. “As directed by the National Artificial Intelligence Initiative Act of 2020 (P.L. 116-283), the goal of the AI RMF is to offer a resource to the organizations designing, developing, deploying, or using AI systems to help manage the many risks of AI …” (PDF p. 7 (printed p. 2), Executive Summary)

Attributed-credit records (the citing document’s own attribution):

- [builds on] Executive Order 14110 (2023) describes a set of risk-management practices for government uses of AI as derived from the Blueprint for an AI Bill of Rights and the NIST AI Risk Management Framework. “the following practices derived from OSTP’s Blueprint for an AI Bill of Rights and the NIST AI Risk Management Framework” (Executive Order 14110: Safe, Secure, and Trustworthy Development and Use of Artificial Intelligence, PDF p. 28, Sec. 10.1(b)(iv))
- [builds on] NIST AI 800-1 (initial public draft, 2024) states that it builds on the AI Risk Management Framework in identifying practices to map, measure, manage and govern misuse risks from foundation models. “Building on the AI Risk Management Framework,3 this document identifies best practices to map, measure, manage, and govern misuse risks from foundation models” (NIST AI 800-1 (initial public draft): Managing Misuse Risk for Dual-Use Foundation Models, PDF p. 5, §1 Introduction, with note 3)
- [builds on] OpenAI's Frontier Governance Framework (May 2026 edition) states that its approach to frontier AI safety risks is informed by standards including the NIST AI Risk Management Framework. (Paraphrase: the framework says its approach to mitigating frontier AI safety risks is informed by national and international AI risk management standards, naming ISO 42001 and the NIST AI Risk Management Framework among them.) (OpenAI Frontier Governance Framework — May 2026 edition, PDF p. 4, introductory section)

Cited by: OpenAI Frontier Governance Framework — May 2026 edition (PDF p. 4, reference or mention by title); xAI Frontier Artificial Intelligence Framework — December 2025 edition (PDF p. 2, reference or mention by title); Google DeepMind safety and responsibility response (2023) (reference or mention by title); Microsoft Frontier Governance Framework — February 2026 (PDF p. 11, reference or mention by title); Ensuring Safe, Secure, and Trustworthy AI: voluntary AI commitments (July 2023) (PDF p. 3, reference or mention by title); Voluntary AI Commitments (September 2023) (PDF p. 2, reference or mention by title); Executive Order 14110: Safe, Secure, and Trustworthy Development and Use of Artificial Intelligence (PDF p. 2, reference or mention by title); Winning the Race: America’s AI Action Plan (PDF p. 7, reference by DOI); NIST AI 800-1 (second public draft): Managing Misuse Risk for Dual-Use Foundation Models (PDF p. 6, reference or mention by title).

<a id="kp-c-eval-multi-level-multi-2023"></a>

#### C-Eval: A Multi-Level Multi-Discipline Chinese Evaluation Suite for Foundation Models

- ID `kp-c-eval-multi-level-multi-2023` (proposed); subtype Research paper (work).
- Basis 1: cited by 5 dataset documents.
- Identifiers: arxiv 2305.08322.
- Authors as printed (paper:kp-c-eval-multi-level-multi-2023--v1, first page): “Yuzhen Huang”, “Yuzhuo Bai”, “Zhihao Zhu”, “Junlei Zhang”, “Jinghan Zhang”, “Tangjun Su”, “Junteng Liu”, “Chuancheng Lv”, “Yikai Zhang”, “Jiayi Lei”, “Yao Fu”, “Maosong Sun”, “Junxian He”.
- arXiv comments (author-supplied): “NeurIPS 2023. Website: [link: https://cevalbenchmark.com] this https URL”

| Version            | Kind             | Date       | Precision | Basis                          |
| ------------------ | ---------------- | ---------- | --------- | ------------------------------ |
| arXiv:2305.08322v1 | arXiv submission | 2023-05-15 | day       | arXiv submission history (UTC) |
| arXiv:2305.08322v2 | arXiv submission | 2023-05-17 | day       | arXiv submission history (UTC) |
| arXiv:2305.08322v3 | arXiv submission | 2023-11-06 | day       | arXiv submission history (UTC) |

States:

- The paper presents C-Eval, an evaluation suite for the knowledge and reasoning abilities of foundation models in a Chinese context, which it states is the first comprehensive Chinese evaluation suite. “the first comprehensive Chinese evaluation suite designed to assess advanced knowledge and reasoning abilities of foundation models in a Chinese context” (arXiv v1, PDF p. 1, abstract) — the paper’s own priority or novelty claim

Cited by: DeepSeek-V3 Technical Report (reference by arXiv identifier); DeepSeek-R1 research report (reference by arXiv identifier); Qwen Technical Report (reference by arXiv identifier); ERNIE 5.0 Technical Report (PDF p. 31, reference or mention by title); Kimi K2: Open Agentic Intelligence (PDF p. 22, reference by arXiv identifier).

<a id="kp-cmmlu-measuring-massive-multitask-language-2023"></a>

#### CMMLU: Measuring massive multitask language understanding in Chinese

- ID `kp-cmmlu-measuring-massive-multitask-language-2023` (proposed); subtype Research paper (work).
- Basis 1: cited by 5 dataset documents.
- Identifiers: arxiv 2306.09212.
- Authors as printed (paper:kp-cmmlu-measuring-massive-multitask-language-2023--v1, first page): “Haonan Li”, “Yixuan Zhang”, “Fajri Koto”, “Yifei Yang”, “Hai Zhao”, “Yeyun Gong”, “Nan Duan”, “Timothy Baldwin”.

| Version            | Kind             | Date       | Precision | Basis                          |
| ------------------ | ---------------- | ---------- | --------- | ------------------------------ |
| arXiv:2306.09212v1 | arXiv submission | 2023-06-15 | day       | arXiv submission history (UTC) |
| arXiv:2306.09212v2 | arXiv submission | 2024-01-17 | day       | arXiv submission history (UTC) |

States:

- The paper introduces CMMLU, which it describes as a comprehensive Chinese benchmark covering subjects in natural science, social sciences, engineering and humanities. “This paper aims to bridge this gap by introducing CMMLU, a comprehensive Chinese benchmark that covers various subjects, including natural science, social sciences, engineering, and humanities.” (arXiv v1, PDF p. 1, abstract)

Cited by: DeepSeek-V3 Technical Report (reference by arXiv identifier); DeepSeek-R1 research report (reference by arXiv identifier); Qwen Technical Report (reference by arXiv identifier); ERNIE 5.0 Technical Report (PDF p. 32, reference or mention by title); Kimi K2: Open Agentic Intelligence (PDF p. 22, reference by arXiv identifier).

<a id="kp-gpqa-graduate-level-google-proof-2023"></a>

#### GPQA: A Graduate-Level Google-Proof Q&amp;A Benchmark

- ID `kp-gpqa-graduate-level-google-proof-2023` (proposed); subtype Research paper (work).
- Basis 1: cited by 5 dataset documents.
- Identifiers: arxiv 2311.12022.
- Authors as printed (paper:kp-gpqa-graduate-level-google-proof-2023--v1, first page): “David Rein”, “Betty Li Hou”, “Asa Cooper Stickland”, “Jackson Petty”, “Richard Yuanzhe Pang”, “Julien Dirani”, “Julian Michael”, “Samuel R. Bowman”.
- arXiv comments (author-supplied): “28 pages, 5 figures, 7 tables”

| Version            | Kind             | Date       | Precision | Basis                          |
| ------------------ | ---------------- | ---------- | --------- | ------------------------------ |
| arXiv:2311.12022v1 | arXiv submission | 2023-11-20 | day       | arXiv submission history (UTC) |

States:

- The paper presents GPQA, a dataset of 448 multiple-choice questions written by domain experts in biology, physics and chemistry, which it describes as challenging. “We present GPQA, a challenging dataset of 448 multiple-choice questions written by domain experts in biology, physics, and chemistry.” (arXiv v1, PDF p. 1, abstract)

Cited by: DeepSeek-V3 Technical Report (reference by arXiv identifier); DeepSeek-R1 research report (reference by arXiv identifier); ChatGLM research history and techniques (reference by arXiv identifier); Frontier AI Risk Management Framework (v1.0) (PDF p. 46, reference by arXiv identifier); NIST AI 800-1 (second public draft): Managing Misuse Risk for Dual-Use Foundation Models (PDF p. 66, reference by arXiv identifier).

Authorship records: `samuel-r-bowman` (proposed).

<a id="kp-gpt-4-technical-report-2023"></a>

#### GPT-4 Technical Report

- ID `kp-gpt-4-technical-report-2023` (proposed); subtype Research paper (work).
- Basis 1: cited by 7 dataset documents.
- Identifiers: arxiv 2303.08774.
- Authors as printed (paper:kp-gpt-4-technical-report-2023--v1, first page): “OpenAI”.
- Preparer's note: The first page prints the collective byline "OpenAI"; contributors are listed in the paper's contributions section. No individual authorship records are proposed.
- arXiv comments (author-supplied): “100 pages; updated authors list; fixed author names and added citation”

| Version            | Kind             | Date       | Precision | Basis                          |
| ------------------ | ---------------- | ---------- | --------- | ------------------------------ |
| arXiv:2303.08774v1 | arXiv submission | 2023-03-15 | day       | arXiv submission history (UTC) |
| arXiv:2303.08774v2 | arXiv submission | 2023-03-16 | day       | arXiv submission history (UTC) |
| arXiv:2303.08774v3 | arXiv submission | 2023-03-27 | day       | arXiv submission history (UTC) |
| arXiv:2303.08774v4 | arXiv submission | 2023-12-19 | day       | arXiv submission history (UTC) |
| arXiv:2303.08774v5 | arXiv submission | 2024-03-01 | day       | arXiv submission history (UTC) |
| arXiv:2303.08774v6 | arXiv submission | 2024-03-04 | day       | arXiv submission history (UTC) |

States:

- The report describes the development of GPT-4, which it presents as a large-scale multimodal model that accepts image and text inputs and produces text outputs. “We report the development of GPT-4, a large-scale, multimodal model which can accept image and text inputs and produce text outputs.” (arXiv v1, PDF p. 1, abstract)

Attributed-credit records (the citing document’s own attribution):

- [builds on] Eloundou et al. (2023) cite the GPT-4 technical report (OpenAI, 2023b in their reference list) for the claim that GPT-4 is an effective discriminator, in the section introducing their use of GPT-4 to rate task exposure. “Recent research indicates that GPT-4 serves as an effective discriminator, capable of applying intricate taxonomies and responding to changes in wording and emphasis. (OpenAI, 2023b)” (GPTs are GPTs: An Early Look at the Labor Market Impact Potential of Large Language Models, PDF p. 9, §3.4.2 Measuring GPTs with GPT-4)

Cited by: Weak-to-Strong Generalization: Eliciting Strong Capabilities With Weak Supervision (PDF p. 24, reference by arXiv identifier); GPT-4 System Card (PDF p. 9, reference or mention by title); Qwen Technical Report (reference by arXiv identifier); ChatGLM research history and techniques (reference or mention by title); GPTs are GPTs: An Early Look at the Labor Market Impact Potential of Large Language Models (PDF p. 34, reference or mention by title); Seed-Thinking-v1.5: Advancing Superb Reasoning Models with Reinforcement Learning (PDF p. 14, reference by arXiv identifier); source-gemini-report-v1 (PDF p. 29, reference or mention by title).

<a id="kp-instruction-following-evaluation-large-language-2023"></a>

#### Instruction-Following Evaluation for Large Language Models

- ID `kp-instruction-following-evaluation-large-language-2023` (proposed); subtype Research paper (work).
- Basis 1: cited by 5 dataset documents.
- Identifiers: arxiv 2311.07911.
- Authors as printed (paper:kp-instruction-following-evaluation-large-language-2023--v1, first page): “Jeffrey Zhou”, “Tianjian Lu”, “Swaroop Mishra”, “Siddhartha Brahma”, “Sujoy Basu”, “Yi Luan”, “Denny Zhou”, “Le Hou”.

| Version            | Kind             | Date       | Precision | Basis                          |
| ------------------ | ---------------- | ---------- | --------- | ------------------------------ |
| arXiv:2311.07911v1 | arXiv submission | 2023-11-14 | day       | arXiv submission history (UTC) |

States:

- The paper introduces Instruction-Following Eval (IFEval), an evaluation of instruction following for large language models. “To overcome these issues, we introduce Instruction-Following Eval (IFEval) for large language models.” (arXiv v1, PDF p. 1, abstract)

Cited by: DeepSeek-V3 Technical Report (reference by arXiv identifier); DeepSeek-R1 research report (reference by arXiv identifier); ChatGLM research history and techniques (reference by arXiv identifier); ERNIE 5.0 Technical Report (PDF p. 36, reference by arXiv identifier); Kimi K2: Open Agentic Intelligence (PDF p. 24, reference by arXiv identifier).

Authorship records: `denny-zhou` (proposed).

<a id="kp-llama-2-open-foundation-fine-2023"></a>

#### Llama 2: Open Foundation and Fine-Tuned Chat Models

- ID `kp-llama-2-open-foundation-fine-2023` (proposed); subtype Research paper (work).
- Basis 1: cited by 6 dataset documents.
- Identifiers: arxiv 2307.09288.
- Authors as printed (paper:kp-llama-2-open-foundation-fine-2023--v1, first page): “Hugo Touvron”, “Louis Martin”, “Kevin Stone”, “Peter Albert”, “Amjad Almahairi”, “Yasmine Babaei”, “Nikolay Bashlykov”, “Soumya Batra”, “Prajjwal Bhargava”, “Shruti Bhosale”, “Dan Bikel”, “Lukas Blecher”, “Moya Chen”, “Guillem Cucurull”, “David Esiobu”, “Jude Fernandes”, “Jeremy Fu”, “Wenyin Fu”, “Brian Fuller”, “Cynthia Gao”, “Vedanuj Goswami”, “Naman Goyal”, “Anthony Hartshorn”, “Saghar Hosseini”, “Rui Hou”, “Hakan Inan”, “Marcin Kardas”, “Viktor Kerkez”, “Madian Khabsa”, “Isabel Kloumann”, “Artem Korenev”, “Punit Singh Koura”, “Thibaut Lavril”, “Jenya Lee”, “Diana Liskovich”, “Yinghai Lu”, “Yuning Mao”, “Xavier Martinet”, “Todor Mihaylov”, “Pushkar Mishra”, “Igor Molybog”, “Yixin Nie”, “Andrew Poulton”, “Jeremy Reizenstein”, “Rashi Rungta”, “Kalyan Saladi”, “Alan Schelten”, “Ruan Silva”, “Eric Michael Smith”, “Ranjan Subramanian”, “Binh Tang”, “Ross Taylor”, “Adina Williams”, “Puxin Xu”, “Zheng Yan”, “Iliyan Zarov”, “Yuchen Zhang”, “Angela Fan”, “Melanie Kambadur”, “Sharan Narang”, “Aurelien Rodriguez”, “Robert Stojnic”, “Sergey Edunov”, “Thomas Scialom”. Not found on the first page (index names): Cristian Canton-Ferrer, M. Lachaux, Xia Tan, Jian-Xiang Kuan.

| Version            | Kind             | Date       | Precision | Basis                          |
| ------------------ | ---------------- | ---------- | --------- | ------------------------------ |
| arXiv:2307.09288v1 | arXiv submission | 2023-07-18 | day       | arXiv submission history (UTC) |
| arXiv:2307.09288v2 | arXiv submission | 2023-07-19 | day       | arXiv submission history (UTC) |

States:

- The authors state that they develop and release Llama 2, a collection of pretrained and fine-tuned large language models from 7 billion to 70 billion parameters. “In this work, we develop and release Llama 2, a collection of pretrained and fine-tuned large language models (LLMs) ranging in scale from 7 billion to 70 billion parameters.” (arXiv v1, PDF p. 1, abstract)

Cited by: Llama commercial-availability announcement (2023) (reference or mention by title); DeepSeek-V3 Technical Report (reference by arXiv identifier); Qwen Technical Report (reference by arXiv identifier); ChatGLM research history and techniques (reference or mention by title); Seed-Coder: Let the Code Model Curate Data for Itself (PDF p. 39, reference by arXiv identifier); source-gemini-report-v1 (PDF p. 33, reference by arXiv identifier).

Authorship records: `hugo-touvron`, `guillem-cucurull` (proposed), `naman-goyal` (proposed), `thibaut-lavril` (proposed), `xavier-martinet` (proposed), `sharan-narang` (proposed), `aurelien-rodriguez` (proposed).

<a id="kp-llama-open-efficient-foundation-language-2023"></a>

#### LLaMA: Open and Efficient Foundation Language Models

- ID `kp-llama-open-efficient-foundation-language-2023` (proposed); subtype Research paper (work).
- Basis 1: cited by 5 dataset documents.
- Identifiers: arxiv 2302.13971.
- Authors as printed (paper:kp-llama-open-efficient-foundation-language-2023--v1, first page): “Hugo Touvron”, “Thibaut Lavril”, “Gautier Izacard”, “Xavier Martinet”, “Martinet Marie-Anne Lachaux”, “Timothee Lacroix”, “Baptiste Rozière”, “Naman Goyal”, “Eric Hambro”, “Faisal Azhar”, “Aurelien Rodriguez”, “Armand Joulin”, “Edouard Grave”, “Guillaume Lample”.

| Version            | Kind             | Date       | Precision | Basis                          |
| ------------------ | ---------------- | ---------- | --------- | ------------------------------ |
| arXiv:2302.13971v1 | arXiv submission | 2023-02-27 | day       | arXiv submission history (UTC) |

States:

- The paper introduces LLaMA, a collection of language models from 7B to 65B parameters trained, it states, on publicly available datasets only. “We introduce LLaMA, a collection of foundation language models ranging from 7B to 65B parameters.” (arXiv v1, PDF p. 1, abstract)
- The authors state that they release all the models to the research community. “We release all our models to the research community” (arXiv v1, PDF p. 1, abstract)

Cited by: LLaMA (2023 paper) (reference by arXiv identifier); DeepSeek-V3 Technical Report (reference by arXiv identifier); Qwen Technical Report (reference by arXiv identifier); ChatGLM research history and techniques (reference or mention by title); source-gemini-report-v1 (PDF p. 32, reference by arXiv identifier).

Authorship records: `hugo-touvron`, `thibaut-lavril` (proposed), `xavier-martinet` (proposed), `timothee-lacroix`, `naman-goyal` (proposed), `aurelien-rodriguez` (proposed), `guillaume-lample`.

<a id="kp-mathvista-evaluating-mathematical-reasoning-foundation-2023"></a>

#### MathVista: Evaluating Mathematical Reasoning of Foundation Models in Visual Contexts

- ID `kp-mathvista-evaluating-mathematical-reasoning-foundation-2023` (proposed); subtype Research paper (work).
- Basis 1: cited by 5 dataset documents.
- Identifiers: arxiv 2310.02255.
- Authors as printed (paper:kp-mathvista-evaluating-mathematical-reasoning-foundation-2023--v1, first page): “Pan Lu”, “Hritik Bansal”, “Tony Xia”, “Jiacheng Liu”, “Chunyuan Li”, “Hannaneh Hajishirzi”, “Hao Cheng”, “Kai-Wei Chang”, “Michel Galley”, “Jianfeng Gao”.
- arXiv comments (author-supplied): “116 pages, 120 figures. Accepted to ICLR 2024”

| Version            | Kind             | Date       | Precision | Basis                          |
| ------------------ | ---------------- | ---------- | --------- | ------------------------------ |
| arXiv:2310.02255v1 | arXiv submission | 2023-10-03 | day       | arXiv submission history (UTC) |
| arXiv:2310.02255v2 | arXiv submission | 2023-10-25 | day       | arXiv submission history (UTC) |
| arXiv:2310.02255v3 | arXiv submission | 2024-01-21 | day       | arXiv submission history (UTC) |

States:

- The paper presents MathVista, described as a benchmark combining challenges from diverse mathematical and visual tasks. “To bridge this gap, we present M ATH V ISTA, a benchmark designed to amalgamate challenges from diverse mathematical and visual tasks.” (arXiv v1, PDF p. 1, abstract)

Cited by: ERNIE 5.0 Technical Report (PDF p. 32, reference by arXiv identifier); Seed1.5-VL Technical Report (PDF p. 37, reference by arXiv identifier); Seed1.8 Model Card: Towards Generalized Real-World Agency (PDF p. 24, reference by arXiv identifier); Seed2.0 Model Card: Towards Intelligence Frontier for Real-World Complexity (PDF p. 52, reference by arXiv identifier); source-gemini-report-v1 (PDF p. 29, reference by arXiv identifier).

Authorship records: `jianfeng-gao` (proposed).

### 2024

<a id="kp-livecodebench-holistic-contamination-free-evaluation-2024"></a>

#### LiveCodeBench: Holistic and Contamination Free Evaluation of Large Language Models for Code

- ID `kp-livecodebench-holistic-contamination-free-evaluation-2024` (proposed); subtype Research paper (work).
- Basis 1: cited by 7 dataset documents.
- Identifiers: arxiv 2403.07974.
- Authors as printed (paper:kp-livecodebench-holistic-contamination-free-evaluation-2024--v1, first page): “Naman Jain”, “King Han”, “Alex Gu”, “Wen-Ding Li”, “Fanjia Yan”, “Tianjun Zhang”, “Sida I. Wang”, “Armando Solar-Lezama”, “Koushik Sen”, “Ion Stoica”.
- arXiv comments (author-supplied): “Website - [link: https://livecodebench.github.io/] this https URL”

| Version            | Kind             | Date       | Precision | Basis                          |
| ------------------ | ---------------- | ---------- | --------- | ------------------------------ |
| arXiv:2403.07974v1 | arXiv submission | 2024-03-12 | day       | arXiv submission history (UTC) |
| arXiv:2403.07974v2 | arXiv submission | 2024-06-06 | day       | arXiv submission history (UTC) |

States:

- The paper proposes LiveCodeBench, which it describes as a comprehensive and contamination-free evaluation of LLMs for code that continuously collects new problems from contests on LeetCode, AtCoder and CodeForces. “In this work, we propose LiveCodeBench, a comprehensive and contamination-free evaluation of LLMs for code, which continuously collects new problems over time from contests across three competition platforms, namely LeetCode, AtCoder, and CodeForces.” (arXiv v1, PDF p. 1, abstract)

Cited by: DeepSeek-V3 Technical Report (reference by arXiv identifier); DeepSeek-R1 research report (reference by arXiv identifier); ERNIE 5.0 Technical Report (PDF p. 31, reference by arXiv identifier); Kimi K2: Open Agentic Intelligence (PDF p. 22, reference by arXiv identifier); Seed1.8 Model Card: Towards Generalized Real-World Agency (PDF p. 23, reference by arXiv identifier); Seed2.0 Model Card: Towards Intelligence Frontier for Real-World Complexity (PDF p. 51, reference by arXiv identifier); Seed-Coder: Let the Code Model Curate Data for Itself (PDF p. 36, reference or mention by title).

<a id="kp-mmlu-pro-more-robust-challenging-2024"></a>

#### MMLU-Pro: A More Robust and Challenging Multi-Task Language Understanding Benchmark

- ID `kp-mmlu-pro-more-robust-challenging-2024` (proposed); subtype Research paper (work).
- Basis 1: cited by 6 dataset documents.
- Identifiers: arxiv 2406.01574.
- Authors as printed (paper:kp-mmlu-pro-more-robust-challenging-2024--v1, first page): “Yubo Wang”, “Xueguang Ma”, “Ge Zhang”, “Yuansheng Ni”, “Abhranil Chandra”, “Shiguang Guo”, “Weiming Ren”, “Aaran Arulraj”, “Xuan He”, “Ziyan Jiang”, “Tianle Li”, “Max Ku”, “Kai Wang”, “Alex Zhuang”, “Rongqi Fan”, “Xiang Yue”, “Wenhu Chen”.
- arXiv comments (author-supplied): “This version has been accepted and published at NeurIPS 2024 Track Datasets and Benchmarks (Spotlight)”

| Version            | Kind             | Date       | Precision | Basis                          |
| ------------------ | ---------------- | ---------- | --------- | ------------------------------ |
| arXiv:2406.01574v1 | arXiv submission | 2024-06-03 | day       | arXiv submission history (UTC) |
| arXiv:2406.01574v2 | arXiv submission | 2024-06-04 | day       | arXiv submission history (UTC) |
| arXiv:2406.01574v3 | arXiv submission | 2024-06-05 | day       | arXiv submission history (UTC) |
| arXiv:2406.01574v4 | arXiv submission | 2024-06-23 | day       | arXiv submission history (UTC) |
| arXiv:2406.01574v5 | arXiv submission | 2024-10-07 | day       | arXiv submission history (UTC) |
| arXiv:2406.01574v6 | arXiv submission | 2024-11-06 | day       | arXiv submission history (UTC) |

States:

- The paper introduces MMLU-Pro, a dataset that extends the MMLU benchmark with more reasoning-focused questions and expands the answer choices from four to ten. “This paper introduces MMLU-Pro, an enhanced dataset designed to extend the mostly knowledge-driven MMLU benchmark by integrating more challenging, reasoning-focused questions and expanding the choice set from four to ten options.” (arXiv v1, PDF p. 1, abstract)

Cited by: DeepSeek-V3 Technical Report (reference by arXiv identifier); DeepSeek-R1 research report (reference by arXiv identifier); ERNIE 5.0 Technical Report (PDF p. 34, reference or mention by title); Kimi K2: Open Agentic Intelligence (PDF p. 23, reference by arXiv identifier); Frontier AI Risk Management Framework (v1.0) (PDF p. 47, reference by arXiv identifier); Seed1.8 Model Card: Towards Generalized Real-World Agency (PDF p. 26, reference or mention by title).

### 2025

<a id="kp-deepseek-r1-incentivizing-reasoning-capability-2025"></a>

#### DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning

- ID `kp-deepseek-r1-incentivizing-reasoning-capability-2025` (proposed); subtype Research paper (work).
- Basis 1: cited by 9 dataset documents.
- Identifiers: arxiv 2501.12948; doi 10.1038/s41586-025-09422-z.
- Authors as printed (paper:kp-deepseek-r1-incentivizing-reasoning-capability-2025--v1, first page): “DeepSeek-AI”.
- Preparer's note: The first page prints the collective byline "DeepSeek-AI"; individual contributors are listed in the paper's contributions section, not in the byline. No individual authorship records are proposed.
- arXiv journal reference (author-supplied): “Nature volume 645, pages 633-638 (2025)”

| Version                                 | Kind                | Date       | Precision | Basis                                                                                         |
| --------------------------------------- | ------------------- | ---------- | --------- | --------------------------------------------------------------------------------------------- |
| Nature, vol. 645, no. 8081, pp. 633-638 | journal publication | 2025       | year      | Crossref published-print date (year kept; publisher-deposited, not checked against the issue) |
| arXiv:2501.12948v1                      | arXiv submission    | 2025-01-22 | day       | arXiv submission history (UTC)                                                                |
| arXiv:2501.12948v2                      | arXiv submission    | 2026-01-04 | day       | arXiv submission history (UTC)                                                                |

States:

- The paper introduces two reasoning models, DeepSeek-R1-Zero and DeepSeek-R1, which it calls its first-generation reasoning models. “We introduce our first-generation reasoning models, DeepSeek-R1-Zero and DeepSeek-R1.” (arXiv v1, PDF p. 1, abstract)
- The authors state that they release DeepSeek-R1-Zero, DeepSeek-R1 and six dense models distilled from DeepSeek-R1 on Qwen and Llama bases as open source. “To support the research community, we open-source DeepSeek-R1-Zero, DeepSeek-R1, and six dense models (1.5B, 7B, 8B, 14B, 32B, 70B) distilled from DeepSeek-R1 based on Qwen and Llama.” (arXiv v1, PDF p. 1, abstract)

Cited by: xAI Frontier Artificial Intelligence Framework — December 2025 edition (PDF p. 9, reference or mention by title); ERNIE 5.0 Technical Report (PDF p. 31, reference by arXiv identifier); Kimi K2: Open Agentic Intelligence (PDF p. 21, reference by arXiv identifier); Kimi K3: Open Frontier Intelligence (PDF p. 36, reference by DOI); Seed1.5-VL Technical Report (PDF p. 35, reference by arXiv identifier); Seed-Coder: Let the Code Model Curate Data for Itself (PDF p. 35, reference by arXiv identifier); Seed-Thinking-v1.5: Advancing Superb Reasoning Models with Reinforcement Learning (PDF p. 13, reference or mention by title); Seed-X: Building Strong Multilingual Translation LLM with 7B Parameters (PDF p. 15, reference by arXiv identifier); DeepSeek-R1 research report (reference or mention by title).

<a id="kp-humanity-s-last-exam-2025"></a>

#### Humanity's Last Exam

- ID `kp-humanity-s-last-exam-2025` (proposed); subtype Research paper (work).
- Basis 1: cited by 5 dataset documents.
- Identifiers: arxiv 2501.14249; doi 10.1038/s41586-025-09962-4.
- Authors as printed (paper:kp-humanity-s-last-exam-2025--v1, first page): “Long Phan”, “Alice Gatti”, “Ziwen Han”, “Nathaniel Li”, “Josephina Hu”, “Hugh Zhang”, “Sean Shi”, “Michael Choi”, “Anish Agrawal”, “Arnav Chopra”, “Adam Khoja”, “Richard Ren”, “Ryan Kim”, “Jason Hausenloy”, “Oliver Zhang”, “Mantas Mazeika”, “Daron Anderson”, “Tung Nguyen”, “Mobeen Mahmood”, “Fiona Feng”, “Steven Y. Feng”, “Haoran Zhao”, “Michael Yu”, “Varun Gangal”, “Chelsea Zou”, “Zihan Wang”, “Jessica P. Wang”, “Pawan Kumar”, “Oleksandr Pokutnyi”, “Robert Gerbicz”, “Serguei Popov”, “John-Clark Levin”, “Mstyslav Kazakov”, “Johannes Schmitt”, “Geoff Galgon”, “Alvaro Sanchez”, “Yongki Lee”, “Will Yeadon”, “Scott Sauers”, “Marc Roth”, “Chidozie Agu”, “Søren Riis”, “Fabian Giska”, “Saiteja Utpala”, “Zachary Giboney”, “Gashaw M. Goshu”, “Sarah-Jane Crowson”, “Maheshbhai Naiya”, “Noah Burns”, “Lennart Finke”, “Zerui Cheng”, “Hyunwoo Park”, “Francesco Fournier-Facio”, “John Wydallis”, “Mark Nandor”, “Ankit Singh”, “Tim Gehrunger”, “Jiaqi Cai”, “Ben McCarty”, “Darling Duclosel”, “Jungbae Nam”, “Jennifer Zampese”, “Ryan G. Hoerr”, “Aras Bacho”, “Gautier Abou Loume”, “Abdallah Galal”, “Hangrui Cao”, “Alexis C Garretson”, “Damien Sileo”, “Qiuyu Ren”, “Doru Cojoc”, “Pavel Arkhipov”, “Usman Qazi”, “Lianghui Li”, “Sumeet Motwani”, “Christian Schroeder de Witt”, “Edwin Taylor”, “Johannes Veith”, “Eric Singer”, “Taylor D. Hartman”, “Paolo Rissone”, “Jaehyeok Jin”, “Jack Wei Lun Shi”, “Chris G. Willcocks”, “Joshua Robinson”, “Aleksandar Mikov”, “Ameya Prabhu”, “Longke Tang”, “Xavier Alapont”, “Ameya Prabhu”, “Kevin Zhou”, “Emily de Oliveira Santos”, “Andrey Pupasov Maksimov”, “Edward Vendrow”, “Kengo Zenitani”, “Julien Guillod”, “Yuqi Li”, “Joshua Vendrow”, “Vladyslav Kuchkin”, “Pierre Marion”, “Jayson Lynch”, “Kaiqu Liang”, “Andrew Gritsevskiy”, “Dakotah Martinez”, “Ben Pageler”, “Nick Crispino”, “Dimitri Zvonkine”, “Natanael Wildner Fraga”, “Saeed Soori”, “Ori Press”, “Henry Tang”, “Julian Salazar”, “Sean R. Green”, “Lina Brüssel”, “Moon Twayana”, “Aymeric Dieuleveut”, “T. Ryan Rogers”, “Wenjin Zhang”, “Bikun Li”, “Jinzhou Yang”, “Arun Rao”, “Gabriel Loiseau”, “Mikhail Kalinin”, “Marco Lukas”, “Ciprian Manolescu”, “Subrata Mishra”, “Ariel Ghislain Kemogne Kamdoum”, “Tobias Kreiman”, “Tad Hogg”, “Alvin Jin”, “Carlo Bosio”, “Gongbo Sun”, “Brian P Coppola”, “Tim Tarver”, “Haline Heidinger”, “Rafael Sayous”, “Stefan Ivanov”, “Joseph M Cavanagh”, “Jiawei Shen”, “Joseph Marvin Imperial”, “Philippe Schwaller”, “Shaipranesh Senthilkuma”, “Andres M Bran”, “Ali Dehghan”, “Andres Algaba”, “Brecht Verbeken”, “David Noever”, “Lisa Schut”, “Ilia Sucholutsky”, “Evgenii Zheltonozhskii”, “Derek Lim”, “Richard Stanley”, “Shankar Sivarajan”, “Tong Yang”, “John Maar”, “Julian Wykowski”, “Martí Oller”, “Jennifer Sandlin”, “Anmol Sahu”, “Yuzheng Hu”, “Sara Fish”, “Nasser Heydari”, “Archimedes Apronti”, “Kaivalya Rawal”, “Tobias Garcia Vilchis”, “Yuexuan Zu”, “Martin Lackner”, “James Koppel”, “Jeremy Nguyen”, “Daniil S. Antonenko”, “Steffi Chern”, “Bingchen Zhao”, “Pierrot Arsene”, “Alan Goldfarb”, “Sergey Ivanov”, “Rafał Poświata”, “Chenguang Wang”, “Daofeng Li”, “Donato Crisostomi”, “Donato Crisostomi”, “Benjamin Myklebust”, “Archan Sen”, “David Perrella”, “Nurdin Kaparov”, “Mark H Inlow”, “Allen Zang”, “Elliott Thornley”, “Daniil Orel”, “Vladislav Poritski”, “Shalev Ben-David”, “Zachary Berger”, “Parker Whitfill”, “Michael Foster”, “Daniel Munro”, “Linh Ho”, “Dan Bar Hava”, “Aleksey Kuchkin”, “Robert Lauff”, “David Holmes”, “Frank Sommerhage”, “Keith Schneider”, “Zakayo Kazibwe”, “Nate Stambaugh”, “Mukhwinder Singh”, “Ilias Magoulas”, “Don Clarke”, “Dae Hyun Kim”, “Felipe Meneguitti Dias”, “Dae Hyun Kim”, “Kanu Priya Agarwal”, “Victor Efren Guadarrama Vilchis”, “Immo Klose”, “Christoph Demian”, “Ujjwala Anantheswaran”, “Adam Zweiger”, “Guglielmo Albani”, “Jeffery Li”, “Nicolas Daans”, “Maksim Radionov”, “Václav Rozhon”, “Ziqiao Ma”, “Christian Stump”, “Mohammed Berkani”, “Jacob Platnick”, “Volodymyr Nevirkovets”, “Luke Basler”, “Marco Piccardo”, “Ferenc Jeanplong”, “Niv Cohen”, “Josef Tkadlec”, “Paul Rosu”, “Piotr Padlewski”, “Stanislaw Barzowski”, “Kyle Montgomery”, “Aline Menezes”, “Arkil Patel”, “Zixuan Wang”, “Jamie Tucker-Foltz”, “Jack Stade”, “Tom Goertzen”, “Fereshteh Kazemi”, “Jeremiah Milbauer”, “John Arnold Ambay”, “Jeremiah Milbauer”, “Yan Carlos Leyva Labrador”, “Hew Wolff”, “Vivien Rossbach”, “Muhammad Fayez Aziz”, “Younesse Kaddar”, “Yanxu Chen”, “Robin Zhang”, “Jiayi Pan”, “Antonio Terpin”, “Jiayi Pan”, “Hailey Schoelkopf”, “Eric Zheng”, “Avishy Carmi”, “Adam Jones”, “Jainam Shah”, “Ethan D. L. Brown”, “Kelin Zhu”, “Max Bartolo”, “Richard Wheeler”, “Andrew Ho”, “Shaul Barkan”, “Jiaqi Wang”, “Martin Stehberger”, “Egor Kretov”, “Kaustubh Sridhar”, “Kaustubh Sridhar”, “Anji Zhang”, “Daniel Pyda”, “Joanna Tam”, “David M. Cunningham”, “Zihan Wang”, “Hyunwoo Park”, “Hyunwoo Park”. Not found on the first page (index names): 223 names.
- arXiv comments (author-supplied): “29 pages, 6 figures”

| Version                                   | Kind                | Date       | Precision | Basis                                                                                         |
| ----------------------------------------- | ------------------- | ---------- | --------- | --------------------------------------------------------------------------------------------- |
| arXiv:2501.14249v1                        | arXiv submission    | 2025-01-24 | day       | arXiv submission history (UTC)                                                                |
| arXiv:2501.14249v2                        | arXiv submission    | 2025-02-06 | day       | arXiv submission history (UTC)                                                                |
| arXiv:2501.14249v3                        | arXiv submission    | 2025-02-12 | day       | arXiv submission history (UTC)                                                                |
| arXiv:2501.14249v4                        | arXiv submission    | 2025-02-19 | day       | arXiv submission history (UTC)                                                                |
| arXiv:2501.14249v5                        | arXiv submission    | 2025-02-21 | day       | arXiv submission history (UTC)                                                                |
| arXiv:2501.14249v6                        | arXiv submission    | 2025-04-11 | day       | arXiv submission history (UTC)                                                                |
| arXiv:2501.14249v7                        | arXiv submission    | 2025-04-19 | day       | arXiv submission history (UTC)                                                                |
| arXiv:2501.14249v8                        | arXiv submission    | 2025-09-12 | day       | arXiv submission history (UTC)                                                                |
| arXiv:2501.14249v9                        | arXiv submission    | 2025-09-25 | day       | arXiv submission history (UTC)                                                                |
| Nature, vol. 649, no. 8099, pp. 1139-1146 | journal publication | 2026       | year      | Crossref published-print date (year kept; publisher-deposited, not checked against the issue) |
| arXiv:2501.14249v10                       | arXiv submission    | 2026-02-20 | day       | arXiv submission history (UTC)                                                                |
| arXiv:2501.14249v11                       | arXiv submission    | 2026-07-28 | day       | arXiv submission history (UTC)                                                                |
| arXiv:2501.14249v12                       | arXiv submission    | 2026-10-19 | day       | arXiv submission history (UTC)                                                                |

States:

- The paper introduces Humanity’s Last Exam (HLE), a multi-modal benchmark that the authors describe as at the frontier of human knowledge and designed to be the final closed-ended academic benchmark of its kind with broad subject coverage. “In response, we introduce H UMANITY ’ S L AST E XAM (HLE), a multi-modal benchmark at the frontier of human knowledge, designed to be the final closed-ended academic benchmark of its kind with broad subject coverage.” (arXiv v1, PDF p. 3, abstract)

Cited by: ERNIE 5.0 Technical Report (PDF p. 33, reference by arXiv identifier); Kimi K2: Open Agentic Intelligence (PDF p. 23, reference by arXiv identifier); Kimi K3: Open Frontier Intelligence (PDF p. 38, reference by arXiv identifier); Seed1.8 Model Card: Towards Generalized Real-World Agency (PDF p. 24, reference by arXiv identifier); Seed2.0 Model Card: Towards Intelligence Frontier for Real-World Complexity (PDF p. 53, reference by arXiv identifier).

Authorship records: `mantas-mazeika` (proposed).

## Proposed person records

Credited on two or more pack papers under one printed name. Name as printed; no affiliation, role or identity beyond the printed name.

| ID                       | Name                   | Papers | Printed forms                      |
| ------------------------ | ---------------------- | -----: | ---------------------------------- |
| `aakanksha-chowdhery`    | Aakanksha Chowdhery    |      2 | “Aakanksha Chowdhery”              |
| `adam-roberts`           | Adam Roberts           |      3 | “Adam Roberts”                     |
| `aidan-clark`            | Aidan Clark            |      2 | “Aidan Clark”                      |
| `alec-radford`           | Alec Radford           |      6 | “Alec Radford”                     |
| `alex-krizhevsky`        | Alex Krizhevsky        |      2 | “Alex Krizhevsky”                  |
| `alex-ray`               | Alex Ray               |      2 | “Alex Ray”                         |
| `ali-farhadi`            | Ali Farhadi            |      2 | “Ali Farhadi”                      |
| `amanda-askell`          | Amanda Askell          |      4 | “Amanda Askell”                    |
| `andrew-m-dai`           | Andrew M. Dai          |      2 | “Andrew M. Dai”                    |
| `andy-jones`             | Andy Jones             |      2 | “Andy Jones”                       |
| `anna-chen`              | Anna Chen              |      2 | “Anna Chen”                        |
| `ariel-herbert-voss`     | Ariel Herbert-Voss     |      2 | “Ariel Herbert-Voss”               |
| `aurelia-guy`            | Aurelia Guy            |      2 | “Aurelia Guy”                      |
| `aurelien-rodriguez`     | Aurelien Rodriguez     |      2 | “Aurelien Rodriguez”               |
| `ben-hutchinson`         | Ben Hutchinson         |      2 | “Ben Hutchinson”                   |
| `benjamin-chess`         | Benjamin Chess         |      2 | “Benjamin Chess”                   |
| `carlos-guestrin`        | Carlos Guestrin        |      2 | “Carlos Guestrin”                  |
| `catherine-olsson`       | Catherine Olsson       |      2 | “Catherine Olsson”                 |
| `charles-sutton`         | Charles Sutton         |      2 | “Charles Sutton”                   |
| `christopher-clark`      | Christopher Clark      |      2 | “Christopher Clark”                |
| `christopher-hesse`      | Christopher Hesse      |      2 | “Christopher Hesse”                |
| `clemens-winter`         | Clemens Winter         |      2 | “Clemens Winter”                   |
| `collin-burns`           | Collin Burns           |      2 | “Collin Burns”                     |
| `dale-schuurmans`        | Dale Schuurmans        |      2 | “Dale Schuurmans”                  |
| `danny-hernandez`        | Danny Hernandez        |      2 | “Danny Hernandez”                  |
| `david-dohan`            | David Dohan            |      2 | “David Dohan”                      |
| `dawn-drain`             | Dawn Drain             |      2 | “Dawn Drain”                       |
| `dawn-song`              | Dawn Song              |      2 | “Dawn Song”                        |
| `deep-ganguli`           | Deep Ganguli           |      2 | “Deep Ganguli”                     |
| `dehao-chen`             | Dehao Chen             |      3 | “Dehao Chen”                       |
| `denny-zhou`             | Denny Zhou             |      5 | “Denny Zhou”                       |
| `diego-de-las-casas`     | Diego de Las Casas     |      2 | “Diego de Las Casas”               |
| `dmitry-lepikhin`        | Dmitry Lepikhin        |      2 | “Dmitry Lepikhin”                  |
| `dragomir-anguelov`      | Dragomir Anguelov      |      2 | “Dragomir Anguelov”                |
| `dumitru-erhan`          | Dumitru Erhan          |      2 | “Dumitru Erhan”                    |
| `ed-chi`                 | Ed Chi                 |      2 | “Ed Chi”                           |
| `elena-buchatskaya`      | Elena Buchatskaya      |      2 | “Elena Buchatskaya”                |
| `eliza-rutherford`       | Eliza Rutherford       |      2 | “Eliza Rutherford”                 |
| `erich-elsen`            | Erich Elsen            |      2 | “Erich Elsen”                      |
| `geoffrey-hinton`        | Geoffrey Hinton        |      2 | “Geoffrey Hinton”                  |
| `geoffrey-irving`        | Geoffrey Irving        |      3 | “Geoffrey Irving”                  |
| `girish-sastry`          | Girish Sastry          |      2 | “Girish Sastry”                    |
| `gretchen-krueger`       | Gretchen Krueger       |      2 | “Gretchen Krueger”                 |
| `guillem-cucurull`       | Guillem Cucurull       |      2 | “Guillem Cucurull”                 |
| `henryk-michalewski`     | Henryk Michalewski     |      2 | “Henryk Michalewski”               |
| `hyoukjoong-lee`         | HyoukJoong Lee         |      2 | “HyoukJoong Lee”                   |
| `hyung-won-chung`        | Hyung Won Chung        |      2 | “Hyung Won Chung”                  |
| `iason-gabriel`          | Iason Gabriel          |      2 | “Iason Gabriel”                    |
| `jack-w-rae`             | Jack W. Rae            |      2 | “Jack W. Rae”                      |
| `jackson-kernion`        | Jackson Kernion        |      2 | “Jackson Kernion”                  |
| `jacob-austin`           | Jacob Austin           |      2 | “Jacob Austin”                     |
| `jacob-devlin`           | Jacob Devlin           |      3 | “Jacob Devlin”                     |
| `jacob-hilton`           | Jacob Hilton           |      3 | “Jacob Hilton”                     |
| `jacob-steinhardt`       | Jacob Steinhardt       |      3 | “Jacob Steinhardt”                 |
| `james-bradbury`         | James Bradbury         |      2 | “James Bradbury”                   |
| `jason-wei`              | Jason Wei              |      4 | “Jason Wei”                        |
| `jeffrey-wu`             | Jeffrey Wu             |      3 | “Jeffrey Wu”                       |
| `jian-sun`               | Jian Sun               |      3 | “Jian Sun”                         |
| `jianfeng-gao`           | Jianfeng Gao           |      2 | “Jianfeng Gao”                     |
| `johannes-welbl`         | Johannes Welbl         |      2 | “Johannes Welbl”                   |
| `john-mellor`            | John Mellor            |      2 | “John Mellor”                      |
| `jonathan-uesato`        | Jonathan Uesato        |      2 | “Jonathan Uesato”                  |
| `jordan-hoffmann`        | Jordan Hoffmann        |      2 | “Jordan Hoffmann”                  |
| `kaiming-he`             | Kaiming He             |      3 | “Kaiming He”                       |
| `kamal-ndousse`          | Kamal Ndousse          |      2 | “Kamal Ndousse”                    |
| `katherine-lee`          | Katherine Lee          |      2 | “Katherine Lee”                    |
| `kenton-lee`             | Kenton Lee             |      4 | “Kenton Lee”                       |
| `kristina-toutanova`     | Kristina Toutanova     |      3 | “Kristina Toutanova”               |
| `laura-rimell`           | Laura Rimell           |      2 | “Laura Rimell”                     |
| `laura-weidinger`        | Laura Weidinger        |      2 | “Laura Weidinger”                  |
| `liane-lovitt`           | Liane Lovitt           |      2 | “Liane Lovitt”                     |
| `lisa-anne-hendricks`    | Lisa Anne Hendricks    |      3 | “Lisa Anne Hendricks”              |
| `luke-zettlemoyer`       | Luke Zettlemoyer       |      3 | “Luke Zettlemoyer”                 |
| `maarten-bosma`          | Maarten Bosma          |      4 | “Maarten Bosma”                    |
| `mandar-joshi`           | Mandar Joshi           |      2 | “Mandar Joshi”                     |
| `mantas-mazeika`         | Mantas Mazeika         |      2 | “Mantas Mazeika”                   |
| `maribeth-rauh`          | Maribeth Rauh          |      2 | “Maribeth Rauh”                    |
| `mark-diaz`              | Mark Diaz              |      2 | “Mark Diaz”                        |
| `maxim-krikun`           | Maxim Krikun           |      2 | “Maxim Krikun”                     |
| `michael-collins`        | Michael Collins        |      2 | “Michael Collins”                  |
| `miljan-martic`          | Miljan Martic          |      2 | “Miljan Martic”                    |
| `ming-wei-chang`         | Ming-Wei Chang         |      3 | “Ming-Wei Chang”                   |
| `mohammad-bavarian`      | Mohammad Bavarian      |      2 | “Mohammad Bavarian”                |
| `naman-goyal`            | Naman Goyal            |      3 | “Naman Goyal”                      |
| `nelson-elhage`          | Nelson Elhage          |      2 | “Nelson Elhage”                    |
| `nicholas-joseph`        | Nicholas Joseph        |      3 | “Nicholas Joseph”                  |
| `nick-ryder`             | Nick Ryder             |      2 | “Nick Ryder”                       |
| `nova-dassarma`          | Nova DasSarma          |      2 | “Nova DasSarma”                    |
| `orhan-firat`            | Orhan Firat            |      2 | “Orhan Firat”                      |
| `peter-welinder`         | Peter Welinder         |      2 | “Peter Welinder”                   |
| `po-sen-huang`           | Po-Sen Huang           |      2 | “Po-Sen Huang”                     |
| `prafulla-dhariwal`      | Prafulla Dhariwal      |      2 | “Prafulla Dhariwal”                |
| `raul-puri`              | Raul Puri              |      2 | “Raul Puri”                        |
| `rewon-child`            | Rewon Child            |      4 | “Rewon Child”                      |
| `ronan-le-bras`          | Ronan Le Bras          |      2 | “Ronan Le Bras”                    |
| `ross-girshick`          | Ross Girshick          |      3 | “Ross Girshick”                    |
| `rowan-zellers`          | Rowan Zellers          |      2 | “Rowan Zellers”                    |
| `samuel-r-bowman`        | Samuel R. Bowman       |      2 | “Samuel R. Bowman”                 |
| `sandhini-agarwal`       | Sandhini Agarwal       |      2 | “Sandhini Agarwal”                 |
| `saurav-kadavath`        | Saurav Kadavath        |      3 | “Saurav Kadavath”                  |
| `scott-gray`             | Scott Gray             |      3 | “Scott Gray”                       |
| `scott-johnston`         | Scott Johnston         |      2 | “Scott Johnston”                   |
| `scott-reed`             | Scott Reed             |      2 | “Scott Reed”                       |
| `sebastian-borgeaud`     | Sebastian Borgeaud     |      2 | “Sebastian Borgeaud”               |
| `sebastian-gehrmann`     | Sebastian Gehrmann     |      2 | “Sebastian Gehrmann”               |
| `shaoqing-ren`           | Shaoqing Ren           |      3 | “Shaoqing Ren”                     |
| `sharan-narang`          | Sharan Narang          |      3 | “Sharan Narang”                    |
| `shauna-kravec`          | Shauna Kravec          |      2 | “Shauna Kravec”                    |
| `sheer-el-showk`         | Sheer El-Showk         |      2 | “Sheer El-Showk”, “Sheer El Showk” |
| `simon-osindero`         | Simon Osindero         |      2 | “Simon Osindero”                   |
| `slav-petrov`            | Slav Petrov            |      2 | “Slav Petrov”                      |
| `stanislav-fort`         | Stanislav Fort         |      2 | “Stanislav Fort”                   |
| `steven-basart`          | Steven Basart          |      2 | “Steven Basart”                    |
| `thibaut-lavril`         | Thibaut Lavril         |      2 | “Thibaut Lavril”                   |
| `toju-duke`              | Toju Duke              |      2 | “Toju Duke”                        |
| `tom-b-brown`            | Tom B. Brown           |      3 | “Tom B. Brown”, “Tom B Brown”      |
| `tom-conerly`            | Tom Conerly            |      2 | “Tom Conerly”                      |
| `tom-henighan`           | Tom Henighan           |      4 | “Tom Henighan”                     |
| `tom-hennigan`           | Tom Hennigan           |      2 | “Tom Hennigan”                     |
| `tom-kwiatkowski`        | Tom Kwiatkowski        |      2 | “Tom Kwiatkowski”                  |
| `trevor-cai`             | Trevor Cai             |      2 | “Trevor Cai”                       |
| `tristan-hume`           | Tristan Hume           |      2 | “Tristan Hume”                     |
| `vedant-misra`           | Vedant Misra           |      2 | “Vedant Misra”                     |
| `vinodkumar-prabhakaran` | Vinodkumar Prabhakaran |      2 | “Vinodkumar Prabhakaran”           |
| `wei-liu`                | Wei Liu                |      2 | “Wei Liu”                          |
| `william-isaac`          | William Isaac          |      2 | “William Isaac”                    |
| `xavier-martinet`        | Xavier Martinet        |      2 | “Xavier Martinet”                  |
| `xiangyu-zhang`          | Xiangyu Zhang          |      2 | “Xiangyu Zhang”                    |
| `xuezhi-wang`            | Xuezhi Wang            |      3 | “Xuezhi Wang”                      |
| `yanping-huang`          | Yanping Huang          |      3 | “Yanping Huang”                    |
| `yanqi-zhou`             | Yanqi Zhou             |      2 | “Yanqi Zhou”                       |
| `yejin-choi`             | Yejin Choi             |      3 | “Yejin Choi”                       |
| `yonatan-bisk`           | Yonatan Bisk           |      2 | “Yonatan Bisk”                     |
| `yoshua-bengio`          | Yoshua Bengio          |      3 | “Yoshua Bengio”                    |
| `yuanzhong-xu`           | Yuanzhong Xu           |      2 | “Yuanzhong Xu”                     |
| `yuntao-bai`             | Yuntao Bai             |      2 | “Yuntao Bai”                       |
| `zac-hatfield-dodds`     | Zac Hatfield-Dodds     |      2 | “Zac Hatfield-Dodds”               |
| `zhifeng-chen`           | Zhifeng Chen           |      3 | “Zhifeng Chen”                     |

## Existing person records reused

`ashish-vaswani` (1), `noam-shazeer` (6), `niki-parmar` (1), `jakob-uszkoreit` (2), `llion-jones` (2), `aidan-gomez` (1), `lukasz-kaiser` (2), `illia-polosukhin` (2), `jared-kaplan` (5), `mark-chen` (2), `jack-clark` (2), `sam-mccandlish` (5), `ilya-sutskever` (7), `dario-amodei` (10), `greg-brockman` (1), `pamela-mishkin` (2), `igor-babuschkin` (2), `jan-leike` (4), `joshua-achiam` (1), `miles-brundage` (1), `mira-murati` (1), `bob-mcgrew` (1), `wojciech-zaremba` (1), `dan-hendrycks` (2), `durk-kingma` (1), `jimmy-ba` (1), `shane-legg` (3), `david-luan` (2), `john-schulman` (4), `paul-christiano` (4), `philippe-aghion` (1), `benjamin-f-jones` (1), `charles-i-jones` (1), `eliezer-yudkowsky` (1), `chris-olah` (2), `arthur-mensch` (2), `karen-simonyan` (2), `oriol-vinyals` (4), `laurent-sifre` (3), `erik-brynjolfsson` (1), `chelsea-finn` (2), `hongyu-ren` (1), `david-h-autor` (1), `quoc-le` (5), `liam-fedus` (1), `barret-zoph` (2), `tom-brown` (2), `ben-mann` (2), `william-d-nordhaus` (1), `yi-tay` (2), `quoc-le` (4), `chris-olah` (1), `hugo-touvron` (2), `daron-acemoglu` (3), `pascual-restrepo` (3), `robin-hanson` (1), `mia-glaese` (1), `pieter-abbeel` (1), `koray-kavukcuoglu` (3), `david-silver` (2), `ioannis-antonoglou` (2), `daan-wierstra` (1), `demis-hassabis` (3), `daniel-de-freitas` (1), `timothee-lacroix` (1), `guillaume-lample` (1), `sanjay-ghemawat` (1), `liam-fedus` (1), `jeff-dean` (2), `toby-pohlen` (1), `vladimir-mikulik` (1), `richard-ngo` (1), `carl-benedikt-frey` (1), `michael-a-osborne` (1), `christian-szegedy` (4), `greg-corrado` (1)

## Possible same person under two printed forms (not merged)

Family name and first initial agree; the pack does not merge them. Each goes to the cross-family check.

- `mark-chen` / `moya chen`
- `paul-christiano` / `paul f christiano`
- `charles-i-jones` / `chris jones`
- `chris-olah` / `chris-olah`
- `quoc-le` / `quoc-le`
- `tom-brown` / `tom-b-brown`
- `ben-mann` / `benjamin mann`
- `jeff-dean` / `jeffrey dean`
- `jeffrey-wu` / `jeff wu` / `jiajun wu`
- `kenton-lee` / `katherine-lee`
- `yuntao-bai` / `yuzhuo bai`
- `andy-jones` / `adam jones`
- `anna-chen` / `annie chen`
- `ed-chi` / `ed h chi`
- `xiangyu-zhang` / `xikun zhang`
- `yanping-huang` / `yuzhen huang`
- `dehao-chen` / `danqi chen`
- `hyoukjoong-lee` / `hongrae lee`
- `geoffrey-hinton` / `geoffrey e hinton`
- `shantanu jain` / `saahil jain`
- `wei li` / `wen ding li`
- `xiang lisa li` / `xuechen li` / `xiang lorraine li`
- `william wang` / `weijun wang`
- `tianyi zhang` / `tianjun zhang`
- `yuhui zhang` / `yuchen zhang` / `yikai zhang` / `yixuan zhang`
- `kaitlyn zhou` / `kevin zhou`
- `sida i wang` / `shean wang`
- `dustin li` / `daofeng li`
- `jenya lee` / `josh lee` / `joon young lee`
- `yinghai lu` / `yu lu`
- `wenhu chen` / `weizhu chen`
- `zhihao zhu` / `zeyuan allen zhu`
- `junlei zhang` / `jinghan zhang`
- `junteng liu` / `jiacheng liu`
- `yifei yang` / `yiming yang`
- `hai zhao` / `haoran zhao`
- `josephina hu` / `jie hu`
- `zihan wang` / `zixuan wang`
- `jessica p wang` / `jiaqi wang`
- `yuqi li` / `yujia li` / `yuanzhi li`
- `arun rao` / `abhishek rao`
- `subrata mishra` / `swaroop mishra`
- `alvin jin` / `alicia jin`
- `gongbo sun` / `gang sun`
- `stefan ivanov` / `sergey ivanov`
- `robin zhang` / `richard zhang`
- `heng tze cheng` / `hao cheng`
- `kathleen meier hellstern` / `kathy meier hellstern`
- `yinhan liu` / `yunfeng liu`

## Near-misses

Cited by 4 dataset documents, one below the threshold.

| Paper                                                                                                | Count |
| ---------------------------------------------------------------------------------------------------- | ----: |
| $τ^2$-Bench: Evaluating Conversational Agents in a Dual-Control Environment                          |     4 |
| A Span-Extraction Dataset for Chinese Machine Reading Comprehension                                  |     4 |
| AGIEval: A Human-Centric Benchmark for Evaluating Foundation Models                                  |     4 |
| Are We Done with MMLU?                                                                               |     4 |
| Artificial intelligence meets natural stupidity                                                      |     4 |
| Artificial Intelligence, Automation and Work                                                         |     4 |
| Asynchronous Methods for Deep Reinforcement Learning                                                 |     4 |
| Automation and New Tasks: How Technology Displaces and Reinstates Labor                              |     4 |
| BrowseComp: A Simple Yet Challenging Benchmark for Browsing Agents                                   |     4 |
| Chinese SimpleQA: A Chinese Factuality Evaluation for Large Language Models                          |     4 |
| Competition-Level Code Generation with AlphaCode                                                     |     4 |
| Cooperative Inverse Reinforcement Learning                                                           |     4 |
| Could Advanced AI Drive Explosive Economic Growth?                                                   |     4 |
| CRUXEval: A Benchmark for Code Reasoning, Understanding and Execution                                |     4 |
| Cybench: A Framework for Evaluating Cybersecurity Capabilities and Risks of Language Models          |     4 |
| DAPO: An Open-Source LLM Reinforcement Learning System at Scale                                      |     4 |
| DeepSeek-V2: A Strong, Economical, and Efficient Mixture-of-Experts Language Model                   |     4 |
| DeepSeek-V3 Technical Report                                                                         |     4 |
| DeepSeekMath: Pushing the Limits of Mathematical Reasoning in Open Language Models                   |     4 |
| DROP: A Reading Comprehension Benchmark Requiring Discrete Reasoning Over Paragraphs                 |     4 |
| Economic Growth under Transformative AI                                                              |     4 |
| Emergent Abilities of Large Language Models                                                          |     4 |
| ERNIE: Enhanced Representation through Knowledge Integration                                         |     4 |
| GLU Variants Improve Transformer                                                                     |     4 |
| GLUE: A Multi-Task Benchmark and Analysis Platform for Natural Language Understanding                |     4 |
| Google's Neural Machine Translation System: Bridging the Gap between Human and Machine Translation   |     4 |
| Information Technology, Workplace Organization and the Demand for Skilled Labor: Firm-Level Evidence |     4 |
| Interactively shaping agents via human reinforcement: the TAMER framework                            |     4 |
| LAB-Bench: Measuring Capabilities of Language Models for Biology Research                            |     4 |
| Mastering Chess and Shogi by Self-Play with a General Reinforcement Learning Algorithm               |     4 |
| Mastering the game of Go without human knowledge                                                     |     4 |
| MMMU-Pro: A More Robust Multi-discipline Multimodal Understanding Benchmark                          |     4 |
| MMMU: A Massive Multi-discipline Multimodal Understanding and Reasoning Benchmark for Expert AGI     |     4 |
| MMVU: Measuring Expert-Level Multi-Discipline Video Understanding                                    |     4 |
| Model Cards for Model Reporting                                                                      |     4 |
| Multi-SWE-bench: A Multilingual Benchmark for Issue Resolving                                        |     4 |
| OpenAI Gym                                                                                           |     4 |
| RealToxicityPrompts: Evaluating Neural Toxic Degeneration in Language Models                         |     4 |
| Recursive Deep Models for Semantic Compositionality Over a Sentiment Treebank                        |     4 |
| Release Strategies and the Social Impacts of Language Models                                         |     4 |
| Research Priorities for Robust and Beneficial Artificial Intelligence                                |     4 |
| Risks from Learned Optimization in Advanced Machine Learning Systems                                 |     4 |
| Semi-supervised Sequence Learning                                                                    |     4 |
| SuperGLUE: A Stickier Benchmark for General-Purpose Language Understanding Systems                   |     4 |
| The Coming Technological Singularity: How to Survive in the Post-Human Era                           |     4 |
| The Llama 3 Herd of Models                                                                           |     4 |
| The Superintelligent Will: Motivation and Instrumental Rationality in Advanced Artificial Agents     |     4 |
| The WMDP Benchmark: Measuring and Reducing Malicious Use With Unlearning                             |     4 |
| Transformer-XL: Attentive Language Models Beyond a Fixed-Length Context                              |     4 |
| Video-MME: The First-Ever Comprehensive Evaluation Benchmark of Multi-modal LLMs in Video Analysis   |     4 |
| Video-MMMU: Evaluating Knowledge Acquisition from Multi-Discipline Professional Videos               |     4 |
| XLNet: Generalized Autoregressive Pretraining for Language Understanding                             |     4 |
| YaRN: Efficient Context Window Extension of Large Language Models                                    |     4 |
| ZeroBench: An Impossible Visual Benchmark for Contemporary Large Multimodal Models                   |     4 |

## Excluded by the subject rule

| Paper                                                                                      | Count | Reason                                                                                                                                    |
| ------------------------------------------------------------------------------------------ | ----: | ----------------------------------------------------------------------------------------------------------------------------------------- |
| The Second Machine Age: Work, Progress, and Prosperity in a Time of Brilliant Technologies |     9 | Subject rule not met (fields of study Engineering, Business; no keyword in the title).                                                    |
| Are Ideas Getting Harder to Find?                                                          |     7 | Research productivity and economic growth; neither title nor abstract concerns machine intelligence.                                      |
| Report of the Editor, Journal of Economic Perspectives                                     |     6 | A journal editor's annual report, matched by its DOI in the American Economic Association site's navigation links, not cited in any text. |
| SocialIQA: Commonsense Reasoning about Social Interactions                                 |     4 | Subject rule not met (no index record; no keyword in the title).                                                                          |

## Basis 2: works passed over

| Index rank | Work                                                                                                                                                    | Citations | Reason                                                                                                                                                                               |
| ---------: | ------------------------------------------------------------------------------------------------------------------------------------------------------- | --------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|          1 | Deep Residual Learning for Image Recognition                                                                                                            |   243,628 | Already admitted by basis 1.                                                                                                                                                         |
|          2 | Attention is All you Need                                                                                                                               |   198,906 | Already admitted by basis 1.                                                                                                                                                         |
|          3 | ImageNet classification with deep convolutional neural networks                                                                                         |   132,325 | Already admitted by basis 1.                                                                                                                                                         |
|          5 | Scikit-learn: Machine Learning in Python                                                                                                                |    96,802 | A software description (a library), not a paper on a method, model or finding.                                                                                                       |
|          6 | Deep learning                                                                                                                                           |    85,337 | Index anomaly: the record is a 2017 encyclopedia entry by two authors whose count (tens of thousands) cannot be its own; the index appears to have merged citations of another work. |
|          8 | Language Models are Few-Shot Learners                                                                                                                   |    65,286 | Already admitted by basis 1.                                                                                                                                                         |
|         11 | PyTorch: An Imperative Style, High-Performance Deep Learning Library                                                                                    |    56,864 | A software description (a library).                                                                                                                                                  |
|         15 | Reinforcement Learning: An Introduction                                                                                                                 |    45,583 | A book (textbook), not a paper.                                                                                                                                                      |
|         16 | LIBSVM: A library for support vector machines                                                                                                           |    45,299 | A software description (a library).                                                                                                                                                  |
|         19 | Collective dynamics of ‘small-world’ networks                                                                                                           |    43,472 | Network science; not on machine learning.                                                                                                                                            |
|         20 | Pattern Recognition and Machine Learning                                                                                                                |    41,763 | A book (textbook), not a paper.                                                                                                                                                      |
|         21 | Highly accurate protein structure prediction with AlphaFold                                                                                             |    40,306 | Structural biology; the index places it in Computer Science, but its subject is protein structure.                                                                                   |
|         24 | Deep Learning                                                                                                                                           |    37,074 | Index anomaly: the record is a 2017 encyclopedia entry by two authors whose count (tens of thousands) cannot be its own; the index appears to have merged citations of another work. |
|         27 | Human-level control through deep reinforcement learning                                                                                                 |    33,795 | Already admitted by basis 1.                                                                                                                                                         |
|         28 | Proximal Policy Optimization Algorithms                                                                                                                 |    32,728 | Already admitted by basis 1.                                                                                                                                                         |
|         29 | RoBERTa: A Robustly Optimized BERT Pretraining Approach                                                                                                 |    32,011 | Already admitted by basis 1.                                                                                                                                                         |
|         32 | Generative Adversarial Networks                                                                                                                         |    30,250 | Index anomaly: the record is a 2021 conference paper whose count appears to merge citations of the 2014 paper of the same name; neither expression is admitted on this count.        |
|         41 | Training language models to follow instructions with human feedback                                                                                     |    25,369 | Already admitted by basis 1.                                                                                                                                                         |
|         44 | A Survey on Transfer Learning                                                                                                                           |    24,335 | A survey of a field, not a paper on a method, model or finding.                                                                                                                      |
|         46 | Chain of Thought Prompting Elicits Reasoning in Large Language Models                                                                                   |    23,295 | Already admitted by basis 1.                                                                                                                                                         |
|         47 | An introduction to ROC analysis                                                                                                                         |    22,617 | A tutorial on an evaluation method in statistics, not a machine-learning method, model or finding.                                                                                   |
|         49 | Statistical Learning Theory                                                                                                                             |    22,369 | A book, not a paper.                                                                                                                                                                 |
|         50 | LLaMA: Open and Efficient Foundation Language Models                                                                                                    |    22,221 | Already admitted by basis 1.                                                                                                                                                         |
|         52 | Physics-informed neural networks: A deep learning framework for solving forward and inverse problems involving nonlinear partial differential equations |    21,769 | Applied mathematics (numerical methods for differential equations).                                                                                                                  |

## Retrieval failures

| Source                                                                   | Result                                                                                                                                    |
| ------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| corpus source source-o1-card                                             | openai.com: HTTP 403                                                                                                                      |
| corpus source source-pf-v2-update                                        | openai.com: HTTP 403; web.archive.org: curl: (35) Recv failure: Connection reset by peer                                                  |
| corpus source source-fgf-release                                         | openai.com: HTTP 403; web.archive.org: host unreachable in this run                                                                       |
| corpus source source-faif-2026                                           | media.x.ai: HTTP 404; web.archive.org: curl: (35) Recv failure: Connection reset by peer                                                  |
| corpus source source-superalignment-announcement                         | openai.com: HTTP 403                                                                                                                      |
| corpus source source-openai-launch                                       | openai.com: HTTP 403                                                                                                                      |
| corpus source source-atlas-openai-lp                                     | openai.com: HTTP 403; web.archive.org: host unreachable in this run                                                                       |
| corpus source source-atlas-openai-pbc-plan                               | openai.com: HTTP 403; web.archive.org: host unreachable in this run                                                                       |
| corpus source source-atlas-openai-recapitalization                       | openai.com: HTTP 403; web.archive.org: host unreachable in this run                                                                       |
| corpus source source-atlas-gym                                           | openai.com: HTTP 403                                                                                                                      |
| corpus source source-atlas-openai-preferences                            | openai.com: HTTP 403                                                                                                                      |
| corpus source source-atlas-openai-robotics                               | openai.com: HTTP 403                                                                                                                      |
| corpus source source-atlas-charter                                       | openai.com: HTTP 403                                                                                                                      |
| corpus source source-cn-r1-readme                                        | github.com: HTTP 403                                                                                                                      |
| corpus source source-cn-glm45-readme                                     | github.com: HTTP 403                                                                                                                      |
| corpus source source-nilsson-1984-ai-employment-and-income               | ojs.aaai.org: HTTP 200 (0 words of text)                                                                                                  |
| corpus source source-anthropic-coi-2021-01-26                            | drive.google.com: HTTP 200 (9 words of text)                                                                                              |
| corpus source source-dartmouth-1955-facsimile                            | raysolomonoff.com: HTTP 200 (0 words of text)                                                                                             |
| corpus source lg-src-cn-baichuan-home                                    | www.baichuan-ai.com: HTTP 200 (1 words of text)                                                                                           |
| corpus source source-extropy-07-scan                                     | diyhpl.us: HTTP 200 (0 words of text)                                                                                                     |
| corpus source source-anthropic-coi-2021-05-24                            | drive.google.com: HTTP 200 (9 words of text)                                                                                              |
| corpus source source-anthropic-coi-2023-03-31                            | drive.google.com: HTTP 200 (9 words of text)                                                                                              |
| corpus source source-extropy-08-scan                                     | diyhpl.us: HTTP 200 (0 words of text)                                                                                                     |
| corpus source source-anthropic-coi-2023-09-21                            | drive.google.com: HTTP 200 (9 words of text)                                                                                              |
| corpus source source-eu-ai-act-2024                                      | eur-lex.europa.eu: HTTP 202 (0 words of text); web.archive.org: curl: (35) Recv failure: Connection reset by peer                         |
| corpus source source-anthropic-coi-2024-01-29                            | drive.google.com: HTTP 200 (9 words of text)                                                                                              |
| corpus source source-anthropic-coi-2025-07-03                            | drive.google.com: HTTP 200 (9 words of text)                                                                                              |
| corpus source source-roodman-2020-modeling-the-human-trajectory          | www.openphilanthropy.org: HTTP 403; web.archive.org: curl: (35) Recv failure: Connection reset by peer                                    |
| corpus source source-extropy-13-scan                                     | diyhpl.us: HTTP 200 (0 words of text)                                                                                                     |
| corpus source source-sits-2000-capture                                   | sysopmind.com: HTTP 404; web.archive.org: curl: (35) Recv failure: Connection reset by peer                                               |
| corpus source source-openai-structure-evolve-2024                        | openai.com: HTTP 403; web.archive.org: host unreachable in this run                                                                       |
| corpus source source-eder-1994-sandberg-relay                            | www.aleph.se: HTTP 404; web.archive.org: curl: (35) Recv failure: Connection reset by peer                                                |
| corpus source source-meta-faf-v1-1                                       | ai.meta.com: HTTP 500; web.archive.org: host unreachable in this run                                                                      |
| corpus source source-butler-1863-press                                   | paperspast.natlib.govt.nz: HTTP 200 (0 words of text); web.archive.org: curl: (35) Recv failure: Connection reset by peer                 |
| corpus source source-ca-sb53-chaptered                                   | leginfo.legislature.ca.gov: HTTP 403; web.archive.org: curl: (35) Recv failure: Connection reset by peer                                  |
| corpus source source-eoc-1997-chapter-5                                  | www.foresight.org: HTTP 404; web.archive.org: curl: (35) Recv failure: Connection reset by peer                                           |
| corpus source source-extropy-15-scan                                     | diyhpl.us: HTTP 200 (0 words of text)                                                                                                     |
| corpus source source-meta-faf-v1-1-revised                               | ai.meta.com: HTTP 500; web.archive.org: host unreachable in this run                                                                      |
| corpus source source-catai-2001-capture                                  | sysopmind.com: HTTP 404; web.archive.org: host unreachable in this run                                                                    |
| corpus source source-butler-1865-press                                   | paperspast.natlib.govt.nz: HTTP 200 (0 words of text); web.archive.org: host unreachable in this run                                      |
| corpus source source-karnofsky-2020-comment-human-trajectory             | www.openphilanthropy.org: HTTP 403; web.archive.org: host unreachable in this run                                                         |
| corpus source source-eoc-1997-references                                 | www.foresight.org: HTTP 404; web.archive.org: curl: (35) Recv failure: Connection reset by peer                                           |
| corpus source source-eoc-1997-chapter-11                                 | www.foresight.org: HTTP 404; web.archive.org: host unreachable in this run                                                                |
| corpus source source-davidson-2021-explosive-economic-growth             | www.openphilanthropy.org: HTTP 403; web.archive.org: host unreachable in this run                                                         |
| corpus source source-eu-digital-omnibus-ai-2026                          | eur-lex.europa.eu: HTTP 202 (0 words of text); web.archive.org: curl: (35) Recv failure: Connection reset by peer                         |
| corpus source source-hanson-1994-uploads-web-reprint                     | hanson.berkeley.edu: curl: (6) Could not resolve host: hanson.berkeley.edu; web.archive.org: host unreachable in this run                 |
| corpus source source-moravec-1979-analog-html                            | frc.ri.cmu.edu: curl: (60) SSL certificate problem: unable to get local issuer certificate; web.archive.org: host unreachable in this run |
| corpus source source-aipnfgr-2006-draft                                  | www.singinst.org: curl: (6) Could not resolve host: www.singinst.org; web.archive.org: host unreachable in this run                       |
| corpus source source-cfai-2001-seed-html                                 | singinst.org: curl: (6) Could not resolve host: singinst.org; web.archive.org: host unreachable in this run                               |
| corpus source source-levy-cv                                             | cs.stanford.edu: curl: (35) Recv failure: Connection reset by peer                                                                        |
| corpus source source-hanson-1998-is-a-singularity-just-around-the-corner | hanson.berkeley.edu: curl: (6) Could not resolve host: hanson.berkeley.edu; web.archive.org: host unreachable in this run                 |
| corpus source source-moravec-1989-takeover-file                          | frc.ri.cmu.edu: curl: (60) SSL certificate problem: unable to get local issuer certificate; web.archive.org: host unreachable in this run |
| corpus source source-cfai-2001-glossary-html                             | singinst.org: curl: (6) Could not resolve host: singinst.org; web.archive.org: host unreachable in this run                               |
| corpus source source-cfai-2001-challenge-html                            | singinst.org: curl: (6) Could not resolve host: singinst.org; web.archive.org: host unreachable in this run                               |
| corpus source source-cfai-2001-anthro-html                               | singinst.org: host unreachable in this run; web.archive.org: host unreachable in this run                                                 |
| corpus source source-cfai-2001-policy-html                               | singinst.org: host unreachable in this run; web.archive.org: host unreachable in this run                                                 |
| corpus source source-arbital-programmer-deception                        | arbital.greaterwrong.com: curl: (35) Recv failure: Connection reset by peer; web.archive.org: host unreachable in this run                |
| corpus source source-arbital-optimization-daemons                        | arbital.greaterwrong.com: curl: (35) Recv failure: Connection reset by peer; web.archive.org: host unreachable in this run                |
| corpus source source-arbital-instrumental-convergence                    | arbital.greaterwrong.com: curl: (35) Recv failure: Connection reset by peer                                                               |
| corpus source source-arbital-orthogonality                               | arbital.greaterwrong.com: host unreachable in this run                                                                                    |
| paper kp-superintelligence-paths-dangers-strategies-2014                 | no text address                                                                                                                           |
| paper kp-random-forests-2001                                             | text: HTTP 200                                                                                                                            |
| paper kp-algorithms-inverse-reinforcement-learning-2000                  | text: HTTP 503                                                                                                                            |
