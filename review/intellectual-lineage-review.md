# Selekoa — intellectual lineage I — documented transmission

44 claims, grouped by lineage. These are research seeds; machine checks are not human review. This document is an editorial working aid and is never loaded by the application.

Schema: 2.4. Dataset date: 2026-09-20. Dataset fingerprint: `2381f9d852ae26508fb19bee3cc2956c1985d6b31a80d0daf84da6b0c35b5b6b`.

Claim wording, qualifications and passages below come from the validated dataset. Quotes and paraphrases are labelled separately. Source roles are relative to each claim. A primary source is not a truth rank, and multiple sources do not guarantee independence.

## Coverage

- Lineages: 4.
- New entities: 14.
- New claims: 39; unchanged context: 5; total in pack: 44.
- New sources: 11; sources used in pack: 15.
- New evidence: 39; evidence used in pack: 45.

| Predicate           | New claims |
| ------------------- | ---------: |
| authored            |         12 |
| cites               |         14 |
| discusses           |          3 |
| explicitly\_credits |          2 |
| uses\_method\_from  |          8 |

Mechanical links below are directed claims, not narrative transmission paths. Shared concepts, co-authors and institutional context do not establish transmission. Work-level citation targets do not identify the revision read by the citing author. Existing context retains its original evidence check and prior review history; new blank fields do not erase earlier decisions.

## Decisions

- **YES:** The evidence supports the claim as scoped and worded.
- **EDIT:** The underlying proposition appears supported but wording, temporal scope, amount, role, qualification, entity identity or similar detail should change.
- **RESEARCH MORE:** Available evidence is insufficient, ambiguous, mutable, conflicting, or needs another source.
- **REJECT:** The proposition is materially unsupported or wrong.

Enter exactly one of YES, EDIT, RESEARCH MORE or REJECT in each Human decision field when you have reviewed it. Leave unreviewed fields empty. Use Notes for reasoning, replacement wording and source links. Writing YES here does not change application data or mark evidence human_reviewed.

Return this completed file, or decisions and notes keyed by claim ID, with an explicit request to apply them. Use a pseudonymous reviewer identity. Regeneration refuses to overwrite any differing working copy. No decisions are imported automatically.

## Five questions

1. Does the source support the exact claim?
2. Is the claim scoped correctly in time, amount, role and certainty?
3. Are the entities correctly identified?
4. Is the source appropriate evidence for this proposition?
5. Is there an obvious correction, contradiction or later development that changes how this historical claim should be represented?

## Reading the dimensions

Derivation explicit means a source states the proposition; inferred means reasoning from evidence and requires a rationale. Resolution supported means recorded support for the scoped claim, not objective truth or absence of undiscovered contradiction. Contested retains supporting and contradictory evidence. Unresolved records an open question. Editorial state and evidence verification are separate.

## Scaling measurements and stated methods

**Mechanical documentary links:**

```text
Scaling Laws for Neural Language Models — cites → An Empirical Model of Large-Batch Training [lineage-scaling-cites-batch]
Scaling Laws for Neural Language Models — uses_method_from → An Empirical Model of Large-Batch Training [lineage-scaling-uses-batch]
Scaling Laws for Neural Language Models — cites → Attention Is All You Need [lineage-scaling-cites-attention]
Scaling Laws for Neural Language Models — uses_method_from → Attention Is All You Need [lineage-scaling-uses-attention]
Training Compute-Optimal Large Language Models — cites → Scaling Laws for Neural Language Models [lineage-chinchilla-cites-scaling]
```

### 01 · `lineage-scaling-cites-batch`

**Increment membership:** New claim

**Statement:** Scaling Laws cites An Empirical Model of Large-Batch Training.

**Relation:** Scaling Laws for Neural Language Models \[scaling-laws\] → cites (cites) → An Empirical Model of Large-Batch Training \[large-batch-training\]

**Relation semantics:** An explicit reference to a work. Citation alone is neither agreement nor causal influence.

**Temporal scope:** 2020-01-23 · publication; kind: event

**Temporal qualification:** First arXiv submission date of the inspected v1 expression; not the method invention date or a claim about later revisions.

**Qualification / scope limits:** An explicit work-level reference only; neither agreement nor a causal influence claim. The citing text does not identify a particular arXiv revision of the target.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-20

**Evidence coverage:** Supporting evidence: primary · 1 source

#### Evidence 1 · `evidence-lineage-scaling-cites-batch`

**Source title:** Scaling Laws for Neural Language Models

**Source ID:** source-scaling-laws-v1-2020

**Publisher / authors:** arXiv / Jared Kaplan; Sam McCandlish; Tom Henighan; Tom B. Brown; Benjamin Chess; Rewon Child; Scott Gray; Alec Radford; Jeffrey Wu; Dario Amodei

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** Section 5.1 attributes its critical-batch-size theory to \[MKAT18\].

**Locator:** v1 §5.1, PDF pp. 12–13; References \[MKAT18\]

**Canonical source:** [Scaling Laws for Neural Language Models](https://arxiv.org/pdf/2001.08361v1)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2020-01-23

**Source / version description:** arXiv:2001.08361v1. PDF p. 1 author-affiliation block visually inspected; later revisions are not substituted.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-19

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-20

**Verification note:** Relevant source passage inspected by machine. Primary for what this document states; no independent replication or human review. Existing source access dates are retained; this evidence check has its own date.

**Human decision:**

**Notes:**

---

### 02 · `lineage-scaling-uses-batch`

**Increment membership:** New claim

**Statement:** Scaling Laws reports using the large-batch model to adjust training-step and compute estimates.

**Relation:** Scaling Laws for Neural Language Models \[scaling-laws\] → uses\_method\_from (reports using method from) → An Empirical Model of Large-Batch Training \[large-batch-training\]

**Relation semantics:** A document explicitly reports using an identified method or architecture from another work in its own study. Requires a named method and primary evidence from the reporting document. Citation, comparison, proposed future use and similarity alone do not qualify. This is reported use, not independently verified implementation or institutional adoption.

**Temporal scope:** 2020-01-23 · publication; kind: event

**Temporal qualification:** First arXiv submission date of the inspected v1 expression; not the method invention date or a claim about later revisions.

**Qualification / scope limits:** Author-reported use in the specified study, not independent replication, general institutional adoption, sole origin or proof of effectiveness. The target identifies a work; its inspected version is not necessarily the version used by these authors.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-20

**Evidence coverage:** Supporting evidence: primary · 1 source

**Structured attributes:**

```json
{
  "method": "Critical-batch-size adjustment of training steps and compute"
}
```

#### Evidence 1 · `evidence-lineage-scaling-uses-batch`

**Source title:** Scaling Laws for Neural Language Models

**Source ID:** source-scaling-laws-v1-2020

**Publisher / authors:** arXiv / Jared Kaplan; Sam McCandlish; Tom Henighan; Tom B. Brown; Benjamin Chess; Rewon Child; Scott Gray; Alec Radford; Jeffrey Wu; Dario Amodei

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** The paper uses the critical batch size to adjust steps and compute.

**Locator:** v1 §5.1, equations 5.4–5.5, PDF p. 13

**Canonical source:** [Scaling Laws for Neural Language Models](https://arxiv.org/pdf/2001.08361v1)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2020-01-23

**Source / version description:** arXiv:2001.08361v1. PDF p. 1 author-affiliation block visually inspected; later revisions are not substituted.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-19

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-20

**Verification note:** Relevant source passage inspected by machine. Primary for what this document states; no independent replication or human review. Existing source access dates are retained; this evidence check has its own date.

**Human decision:**

**Notes:**

---

### 03 · `lineage-scaling-cites-attention`

**Increment membership:** New claim

**Statement:** Scaling Laws cites Attention Is All You Need for the Transformer architecture.

**Relation:** Scaling Laws for Neural Language Models \[scaling-laws\] → cites (cites) → Attention Is All You Need \[attention-all-you-need\]

**Relation semantics:** An explicit reference to a work. Citation alone is neither agreement nor causal influence.

**Temporal scope:** 2020-01-23 · publication; kind: event

**Temporal qualification:** First arXiv submission date of the inspected v1 expression; not the method invention date or a claim about later revisions.

**Qualification / scope limits:** An explicit work-level reference only; neither agreement nor a causal influence claim. The citing text does not identify a particular arXiv revision of the target.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-20

**Evidence coverage:** Supporting evidence: primary · 1 source

#### Evidence 1 · `evidence-lineage-scaling-cites-attention`

**Source title:** Scaling Laws for Neural Language Models

**Source ID:** source-scaling-laws-v1-2020

**Publisher / authors:** arXiv / Jared Kaplan; Sam McCandlish; Tom Henighan; Tom B. Brown; Benjamin Chess; Rewon Child; Scott Gray; Alec Radford; Jeffrey Wu; Dario Amodei

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** The methods section references \[VSP+17\] when naming Transformer models.

**Locator:** v1 §2, PDF p. 6; References \[VSP+17\]

**Canonical source:** [Scaling Laws for Neural Language Models](https://arxiv.org/pdf/2001.08361v1)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2020-01-23

**Source / version description:** arXiv:2001.08361v1. PDF p. 1 author-affiliation block visually inspected; later revisions are not substituted.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-19

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-20

**Verification note:** Relevant source passage inspected by machine. Primary for what this document states; no independent replication or human review. Existing source access dates are retained; this evidence check has its own date.

**Human decision:**

**Notes:**

---

### 04 · `lineage-scaling-uses-attention`

**Increment membership:** New claim

**Statement:** Scaling Laws reports training primarily decoder-only Transformer models.

**Relation:** Scaling Laws for Neural Language Models \[scaling-laws\] → uses\_method\_from (reports using method from) → Attention Is All You Need \[attention-all-you-need\]

**Relation semantics:** A document explicitly reports using an identified method or architecture from another work in its own study. Requires a named method and primary evidence from the reporting document. Citation, comparison, proposed future use and similarity alone do not qualify. This is reported use, not independently verified implementation or institutional adoption.

**Temporal scope:** 2020-01-23 · publication; kind: event

**Temporal qualification:** First arXiv submission date of the inspected v1 expression; not the method invention date or a claim about later revisions.

**Qualification / scope limits:** Author-reported use in the specified study, not independent replication, general institutional adoption, sole origin or proof of effectiveness. The target identifies a work; its inspected version is not necessarily the version used by these authors. This is a scoped architecture use, not wholesale reproduction of the original encoder-decoder system.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-20

**Evidence coverage:** Supporting evidence: primary · 1 source

**Structured attributes:**

```json
{
  "method": "Decoder-only Transformer architecture"
}
```

#### Evidence 1 · `evidence-lineage-scaling-uses-attention`

**Source title:** Scaling Laws for Neural Language Models

**Source ID:** source-scaling-laws-v1-2020

**Publisher / authors:** arXiv / Jared Kaplan; Sam McCandlish; Tom Henighan; Tom B. Brown; Benjamin Chess; Rewon Child; Scott Gray; Alec Radford; Jeffrey Wu; Dario Amodei

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** The authors describe primarily training decoder-only Transformers.

**Locator:** v1 §2, PDF p. 6

**Canonical source:** [Scaling Laws for Neural Language Models](https://arxiv.org/pdf/2001.08361v1)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2020-01-23

**Source / version description:** arXiv:2001.08361v1. PDF p. 1 author-affiliation block visually inspected; later revisions are not substituted.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-19

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-20

**Verification note:** Relevant source passage inspected by machine. Primary for what this document states; no independent replication or human review. Existing source access dates are retained; this evidence check has its own date.

**Human decision:**

**Notes:**

---

### 05 · `lineage-chinchilla-cites-scaling`

**Increment membership:** New claim

**Statement:** Training Compute-Optimal Large Language Models cites Scaling Laws while contrasting compute-allocation findings.

**Relation:** Training Compute-Optimal Large Language Models \[compute-optimal-language-models\] → cites (cites) → Scaling Laws for Neural Language Models \[scaling-laws\]

**Relation semantics:** An explicit reference to a work. Citation alone is neither agreement nor causal influence.

**Temporal scope:** 2022-03-29 · publication; kind: event

**Temporal qualification:** First arXiv submission date of the inspected v1 expression; not the method invention date or a claim about later revisions.

**Qualification / scope limits:** An explicit work-level reference only; neither agreement nor a causal influence claim. The citing text does not identify a particular arXiv revision of the target. A critical citation, not endorsement; the authors’ disagreement is not itself independent adjudication of either study.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-20

**Evidence coverage:** Supporting evidence: primary · 1 source

#### Evidence 1 · `evidence-lineage-chinchilla-cites-scaling`

**Source title:** Training Compute-Optimal Large Language Models

**Source ID:** source-compute-optimal-language-models-v1

**Publisher / authors:** arXiv / Jordan Hoffmann; Sebastian Borgeaud; Arthur Mensch; Elena Buchatskaya; Trevor Cai; Eliza Rutherford; Diego de Las Casas; Lisa Anne Hendricks; Johannes Welbl; Aidan Clark; Tom Hennigan; Eric Noland; Katie Millican; George van den Driessche; Bogdan Damoc; Aurelia Guy; Simon Osindero; Karen Simonyan; Erich Elsen; Jack W. Rae; Oriol Vinyals; Laurent Sifre

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** The authors cite Kaplan et al. and report a different allocation between model size and training tokens.

**Locator:** v1 Introduction and §2, PDF pp. 1–3; References Kaplan et al. (2020)

**Canonical source:** [Training Compute-Optimal Large Language Models](https://arxiv.org/abs/2203.15556)

**Evidence URL:** [Inspected version](https://arxiv.org/pdf/2203.15556v1)

**Source publication date:** 2022-03-29

**Source / version description:** arXiv:2203.15556v1; first-submission date from version history. Later revisions are not substituted.

**Version date:** 2022-03-29

**Source accessed:** 2026-09-20

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-20

**Verification note:** Relevant source passage inspected by machine. Primary for what this document states; no independent replication or human review. Existing source access dates are retained; this evidence check has its own date.

**Human decision:**

**Notes:**

---

### 06 · `lineage-kaplan-authored-scaling`

**Increment membership:** New claim

**Statement:** Scaling Laws names Jared Kaplan as a co-author.

**Relation:** Jared Kaplan \[jared-kaplan\] → authored (authored) → Scaling Laws for Neural Language Models \[scaling-laws\]

**Relation semantics:** Authorship as credited in the document. Does not imply sole authorship.

**Temporal scope:** 2020-01-23 · publication; kind: event

**Temporal qualification:** First arXiv submission date of the inspected v1 expression; not the method invention date or a claim about later revisions.

**Qualification / scope limits:** One credited co-author, not sole authorship, leadership, employment or priority for the method.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-20

**Evidence coverage:** Supporting evidence: primary · 1 source

#### Evidence 1 · `evidence-lineage-kaplan-authored-scaling`

**Source title:** Scaling Laws for Neural Language Models

**Source ID:** source-scaling-laws-v1-2020

**Publisher / authors:** arXiv / Jared Kaplan; Sam McCandlish; Tom Henighan; Tom B. Brown; Benjamin Chess; Rewon Child; Scott Gray; Alec Radford; Jeffrey Wu; Dario Amodei

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** Jared Kaplan appears in the author list.

**Locator:** v1 PDF p. 1, author block

**Canonical source:** [Scaling Laws for Neural Language Models](https://arxiv.org/pdf/2001.08361v1)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2020-01-23

**Source / version description:** arXiv:2001.08361v1. PDF p. 1 author-affiliation block visually inspected; later revisions are not substituted.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-19

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-20

**Verification note:** Relevant source passage inspected by machine. Primary for what this document states; no independent replication or human review. Existing source access dates are retained; this evidence check has its own date.

**Human decision:**

**Notes:**

---

### 07 · `lineage-mccandlish-authored-batch`

**Increment membership:** New claim

**Statement:** An Empirical Model of Large-Batch Training names Sam McCandlish as a co-author.

**Relation:** Sam McCandlish \[sam-mccandlish\] → authored (authored) → An Empirical Model of Large-Batch Training \[large-batch-training\]

**Relation semantics:** Authorship as credited in the document. Does not imply sole authorship.

**Temporal scope:** 2018-12-14 · publication; kind: event

**Temporal qualification:** First arXiv submission date of the inspected v1 expression; not the method invention date or a claim about later revisions.

**Qualification / scope limits:** One credited co-author, not sole authorship, leadership, employment or priority for the method.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-20

**Evidence coverage:** Supporting evidence: primary · 1 source

#### Evidence 1 · `evidence-lineage-mccandlish-authored-batch`

**Source title:** An Empirical Model of Large-Batch Training

**Source ID:** source-large-batch-training-v1

**Publisher / authors:** arXiv / Sam McCandlish; Jared Kaplan; Dario Amodei; OpenAI Dota Team

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** Sam McCandlish appears in the author list.

**Locator:** v1 PDF p. 1, author block

**Canonical source:** [An Empirical Model of Large-Batch Training](https://arxiv.org/abs/1812.06162)

**Evidence URL:** [Inspected version](https://arxiv.org/pdf/1812.06162v1)

**Source publication date:** 2018-12-14

**Source / version description:** arXiv:1812.06162v1; first-submission date from version history. Later revisions are not substituted.

**Version date:** 2018-12-14

**Source accessed:** 2026-09-20

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-20

**Verification note:** Relevant source passage inspected by machine. Primary for what this document states; no independent replication or human review. Existing source access dates are retained; this evidence check has its own date.

**Human decision:**

**Notes:**

---

## Policy optimisation and reported use

**Mechanical documentary links:**

```text
Proximal Policy Optimization Algorithms — cites → Trust Region Policy Optimization [lineage-ppo-cites-trpo]
Proximal Policy Optimization Algorithms — cites → Adam: A Method for Stochastic Optimization [lineage-ppo-cites-adam]
Proximal Policy Optimization Algorithms — uses_method_from → Adam: A Method for Stochastic Optimization [lineage-ppo-uses-adam]
Attention Is All You Need — cites → Adam: A Method for Stochastic Optimization [lineage-attention-cites-adam]
Attention Is All You Need — uses_method_from → Adam: A Method for Stochastic Optimization [lineage-attention-uses-adam]
```

### 08 · `lineage-kingma-adam`

**Increment membership:** New claim

**Statement:** Adam: A Method for Stochastic Optimization names Durk Kingma as a co-author.

**Relation:** Durk Kingma \[durk-kingma\] → authored (authored) → Adam: A Method for Stochastic Optimization \[adam-paper\]

**Relation semantics:** Authorship as credited in the document. Does not imply sole authorship.

**Temporal scope:** 2014-12-22 · publication; kind: event

**Temporal qualification:** First arXiv submission date of the inspected v1 expression; not the method invention date or a claim about later revisions.

**Qualification / scope limits:** One credited co-author, not sole authorship, leadership, employment or priority for the method.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-20

**Evidence coverage:** Supporting evidence: primary · 1 source

#### Evidence 1 · `evidence-lineage-kingma-adam`

**Source title:** Adam: A Method for Stochastic Optimization

**Source ID:** source-adam-paper-v1

**Publisher / authors:** arXiv / Diederik P. Kingma; Jimmy Ba

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** The named person appears in the author list.

**Locator:** v1 PDF p. 1, author block

**Canonical source:** [Adam: A Method for Stochastic Optimization](https://arxiv.org/abs/1412.6980)

**Evidence URL:** [Inspected version](https://arxiv.org/pdf/1412.6980v1)

**Source publication date:** 2014-12-22

**Source / version description:** arXiv:1412.6980v1; first-submission date from version history. Later revisions are not substituted.

**Version date:** 2014-12-22

**Source accessed:** 2026-09-20

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-20

**Verification note:** Relevant source passage inspected by machine. Primary for what this document states; no independent replication or human review. Existing source access dates are retained; this evidence check has its own date.

**Human decision:**

**Notes:**

---

### 09 · `lineage-ba-adam`

**Increment membership:** New claim

**Statement:** Adam: A Method for Stochastic Optimization names Jimmy Ba as a co-author.

**Relation:** Jimmy Ba \[jimmy-ba\] → authored (authored) → Adam: A Method for Stochastic Optimization \[adam-paper\]

**Relation semantics:** Authorship as credited in the document. Does not imply sole authorship.

**Temporal scope:** 2014-12-22 · publication; kind: event

**Temporal qualification:** First arXiv submission date of the inspected v1 expression; not the method invention date or a claim about later revisions.

**Qualification / scope limits:** One credited co-author, not sole authorship, leadership, employment or priority for the method.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-20

**Evidence coverage:** Supporting evidence: primary · 1 source

#### Evidence 1 · `evidence-lineage-ba-adam`

**Source title:** Adam: A Method for Stochastic Optimization

**Source ID:** source-adam-paper-v1

**Publisher / authors:** arXiv / Diederik P. Kingma; Jimmy Ba

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** The named person appears in the author list.

**Locator:** v1 PDF p. 1, author block

**Canonical source:** [Adam: A Method for Stochastic Optimization](https://arxiv.org/abs/1412.6980)

**Evidence URL:** [Inspected version](https://arxiv.org/pdf/1412.6980v1)

**Source publication date:** 2014-12-22

**Source / version description:** arXiv:1412.6980v1; first-submission date from version history. Later revisions are not substituted.

**Version date:** 2014-12-22

**Source accessed:** 2026-09-20

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-20

**Verification note:** Relevant source passage inspected by machine. Primary for what this document states; no independent replication or human review. Existing source access dates are retained; this evidence check has its own date.

**Human decision:**

**Notes:**

---

### 10 · `lineage-schulman-trpo`

**Increment membership:** New claim

**Statement:** Trust Region Policy Optimization names John Schulman as a co-author.

**Relation:** John Schulman \[john-schulman\] → authored (authored) → Trust Region Policy Optimization \[trpo-paper\]

**Relation semantics:** Authorship as credited in the document. Does not imply sole authorship.

**Temporal scope:** 2015-02-19 · publication; kind: event

**Temporal qualification:** First arXiv submission date of the inspected v1 expression; not the method invention date or a claim about later revisions.

**Qualification / scope limits:** One credited co-author, not sole authorship, leadership, employment or priority for the method.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-20

**Evidence coverage:** Supporting evidence: primary · 1 source

#### Evidence 1 · `evidence-lineage-schulman-trpo`

**Source title:** Trust Region Policy Optimization

**Source ID:** source-trpo-paper-v1

**Publisher / authors:** arXiv / John Schulman; Sergey Levine; Philipp Moritz; Michael I. Jordan; Pieter Abbeel

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** The named person appears in the author list.

**Locator:** v1 PDF p. 1, author block

**Canonical source:** [Trust Region Policy Optimization](https://arxiv.org/abs/1502.05477)

**Evidence URL:** [Inspected version](https://arxiv.org/pdf/1502.05477v1)

**Source publication date:** 2015-02-19

**Source / version description:** arXiv:1502.05477v1; first-submission date from version history. Later revisions are not substituted.

**Version date:** 2015-02-19

**Source accessed:** 2026-09-20

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-20

**Verification note:** Relevant source passage inspected by machine. Primary for what this document states; no independent replication or human review. Existing source access dates are retained; this evidence check has its own date.

**Human decision:**

**Notes:**

---

### 11 · `lineage-schulman-ppo`

**Increment membership:** New claim

**Statement:** Proximal Policy Optimization Algorithms names John Schulman as a co-author.

**Relation:** John Schulman \[john-schulman\] → authored (authored) → Proximal Policy Optimization Algorithms \[ppo-paper\]

**Relation semantics:** Authorship as credited in the document. Does not imply sole authorship.

**Temporal scope:** 2017-07-20 · publication; kind: event

**Temporal qualification:** First arXiv submission date of the inspected v1 expression; not the method invention date or a claim about later revisions.

**Qualification / scope limits:** One credited co-author, not sole authorship, leadership, employment or priority for the method.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-20

**Evidence coverage:** Supporting evidence: primary · 1 source

#### Evidence 1 · `evidence-lineage-schulman-ppo`

**Source title:** Proximal Policy Optimization Algorithms

**Source ID:** source-ppo-paper-v1

**Publisher / authors:** arXiv / John Schulman; Filip Wolski; Prafulla Dhariwal; Alec Radford; Oleg Klimov

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** The named person appears in the author list.

**Locator:** v1 PDF p. 1, author block

**Canonical source:** [Proximal Policy Optimization Algorithms](https://arxiv.org/abs/1707.06347)

**Evidence URL:** [Inspected version](https://arxiv.org/pdf/1707.06347v1)

**Source publication date:** 2017-07-20

**Source / version description:** arXiv:1707.06347v1; first-submission date from version history. Later revisions are not substituted.

**Version date:** 2017-07-20

**Source accessed:** 2026-09-20

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-20

**Verification note:** Relevant source passage inspected by machine. Primary for what this document states; no independent replication or human review. Existing source access dates are retained; this evidence check has its own date.

**Human decision:**

**Notes:**

---

### 12 · `lineage-ppo-cites-trpo`

**Increment membership:** New claim

**Statement:** PPO cites Trust Region Policy Optimization in its discussion of trust-region methods.

**Relation:** Proximal Policy Optimization Algorithms \[ppo-paper\] → cites (cites) → Trust Region Policy Optimization \[trpo-paper\]

**Relation semantics:** An explicit reference to a work. Citation alone is neither agreement nor causal influence.

**Temporal scope:** 2017-07-20 · publication; kind: event

**Temporal qualification:** First arXiv submission date of the inspected v1 expression; not the method invention date or a claim about later revisions.

**Qualification / scope limits:** An explicit work-level reference only; neither agreement nor a causal influence claim. The citing text does not identify a particular arXiv revision of the target. The reformulation rationale remains in the paper; this edge does not equate PPO with TRPO.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-20

**Evidence coverage:** Supporting evidence: primary · 1 source

#### Evidence 1 · `evidence-lineage-ppo-cites-trpo`

**Source title:** Proximal Policy Optimization Algorithms

**Source ID:** source-ppo-paper-v1

**Publisher / authors:** arXiv / John Schulman; Filip Wolski; Prafulla Dhariwal; Alec Radford; Oleg Klimov

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** PPO cites TRPO while describing limitations it seeks to address.

**Locator:** v1 §§1–2.2, PDF pp. 1–2; References \[Sch+15b\]

**Canonical source:** [Proximal Policy Optimization Algorithms](https://arxiv.org/abs/1707.06347)

**Evidence URL:** [Inspected version](https://arxiv.org/pdf/1707.06347v1)

**Source publication date:** 2017-07-20

**Source / version description:** arXiv:1707.06347v1; first-submission date from version history. Later revisions are not substituted.

**Version date:** 2017-07-20

**Source accessed:** 2026-09-20

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-20

**Verification note:** Relevant source passage inspected by machine. Primary for what this document states; no independent replication or human review. Existing source access dates are retained; this evidence check has its own date.

**Human decision:**

**Notes:**

---

### 13 · `lineage-ppo-cites-adam`

**Increment membership:** New claim

**Statement:** PPO includes an explicit reference to the Adam paper.

**Relation:** Proximal Policy Optimization Algorithms \[ppo-paper\] → cites (cites) → Adam: A Method for Stochastic Optimization \[adam-paper\]

**Relation semantics:** An explicit reference to a work. Citation alone is neither agreement nor causal influence.

**Temporal scope:** 2017-07-20 · publication; kind: event

**Temporal qualification:** First arXiv submission date of the inspected v1 expression; not the method invention date or a claim about later revisions.

**Qualification / scope limits:** An explicit work-level reference only; neither agreement nor a causal influence claim. The citing text does not identify a particular arXiv revision of the target.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-20

**Evidence coverage:** Supporting evidence: primary · 1 source

#### Evidence 1 · `evidence-lineage-ppo-cites-adam`

**Source title:** Proximal Policy Optimization Algorithms

**Source ID:** source-ppo-paper-v1

**Publisher / authors:** arXiv / John Schulman; Filip Wolski; Prafulla Dhariwal; Alec Radford; Oleg Klimov

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** The bibliography lists Kingma and Ba’s Adam paper.

**Locator:** v1 References \[KB14\], PDF p. 9

**Canonical source:** [Proximal Policy Optimization Algorithms](https://arxiv.org/abs/1707.06347)

**Evidence URL:** [Inspected version](https://arxiv.org/pdf/1707.06347v1)

**Source publication date:** 2017-07-20

**Source / version description:** arXiv:1707.06347v1; first-submission date from version history. Later revisions are not substituted.

**Version date:** 2017-07-20

**Source accessed:** 2026-09-20

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-20

**Verification note:** Relevant source passage inspected by machine. Primary for what this document states; no independent replication or human review. Existing source access dates are retained; this evidence check has its own date.

**Human decision:**

**Notes:**

---

### 14 · `lineage-ppo-uses-adam`

**Increment membership:** New claim

**Statement:** PPO reports Adam step sizes for its MuJoCo, Roboschool and Atari experiments.

**Relation:** Proximal Policy Optimization Algorithms \[ppo-paper\] → uses\_method\_from (reports using method from) → Adam: A Method for Stochastic Optimization \[adam-paper\]

**Relation semantics:** A document explicitly reports using an identified method or architecture from another work in its own study. Requires a named method and primary evidence from the reporting document. Citation, comparison, proposed future use and similarity alone do not qualify. This is reported use, not independently verified implementation or institutional adoption.

**Temporal scope:** 2017-07-20 · publication; kind: event

**Temporal qualification:** First arXiv submission date of the inspected v1 expression; not the method invention date or a claim about later revisions.

**Qualification / scope limits:** Author-reported use in the specified study, not independent replication, general institutional adoption, sole origin or proof of effectiveness. The target identifies a work; its inspected version is not necessarily the version used by these authors.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-20

**Evidence coverage:** Supporting evidence: primary · 1 source

**Structured attributes:**

```json
{
  "method": "Adam optimisation in the reported benchmark experiments"
}
```

#### Evidence 1 · `evidence-lineage-ppo-uses-adam`

**Source title:** Proximal Policy Optimization Algorithms

**Source ID:** source-ppo-paper-v1

**Publisher / authors:** arXiv / John Schulman; Filip Wolski; Prafulla Dhariwal; Alec Radford; Oleg Klimov

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** The experiment hyperparameter tables specify Adam step sizes.

**Locator:** v1 Appendix A, Tables 3–5, PDF p. 10; References \[KB14\]

**Canonical source:** [Proximal Policy Optimization Algorithms](https://arxiv.org/abs/1707.06347)

**Evidence URL:** [Inspected version](https://arxiv.org/pdf/1707.06347v1)

**Source publication date:** 2017-07-20

**Source / version description:** arXiv:1707.06347v1; first-submission date from version history. Later revisions are not substituted.

**Version date:** 2017-07-20

**Source accessed:** 2026-09-20

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-20

**Verification note:** Relevant source passage inspected by machine. Primary for what this document states; no independent replication or human review. Existing source access dates are retained; this evidence check has its own date.

**Human decision:**

**Notes:**

---

### 15 · `lineage-attention-cites-adam`

**Increment membership:** New claim

**Statement:** Attention Is All You Need cites the Adam paper.

**Relation:** Attention Is All You Need \[attention-all-you-need\] → cites (cites) → Adam: A Method for Stochastic Optimization \[adam-paper\]

**Relation semantics:** An explicit reference to a work. Citation alone is neither agreement nor causal influence.

**Temporal scope:** 2017-06-12 · publication; kind: event

**Temporal qualification:** First arXiv submission date of the inspected v1 expression; not the method invention date or a claim about later revisions.

**Qualification / scope limits:** An explicit work-level reference only; neither agreement nor a causal influence claim. The citing text does not identify a particular arXiv revision of the target.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-20

**Evidence coverage:** Supporting evidence: primary · 1 source

#### Evidence 1 · `evidence-lineage-attention-cites-adam`

**Source title:** Attention Is All You Need

**Source ID:** source-attention-all-you-need-v1

**Publisher / authors:** arXiv / Ashish Vaswani; Noam Shazeer; Niki Parmar; Jakob Uszkoreit; Llion Jones; Aidan N. Gomez; Lukasz Kaiser; Illia Polosukhin

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** The optimiser paragraph references Kingma and Ba’s Adam paper.

**Locator:** v1 §5.3, PDF p. 7; References \[18\], PDF p. 11

**Canonical source:** [Attention Is All You Need](https://arxiv.org/abs/1706.03762)

**Evidence URL:** [Inspected version](https://arxiv.org/pdf/1706.03762v1)

**Source publication date:** 2017-06-12

**Source / version description:** arXiv:1706.03762v1; first-submission date from version history. Later revisions are not substituted.

**Version date:** 2017-06-12

**Source accessed:** 2026-09-20

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-20

**Verification note:** Relevant source passage inspected by machine. Primary for what this document states; no independent replication or human review. Existing source access dates are retained; this evidence check has its own date.

**Human decision:**

**Notes:**

---

### 16 · `lineage-attention-uses-adam`

**Increment membership:** New claim

**Statement:** Attention Is All You Need reports using Adam to train its models.

**Relation:** Attention Is All You Need \[attention-all-you-need\] → uses\_method\_from (reports using method from) → Adam: A Method for Stochastic Optimization \[adam-paper\]

**Relation semantics:** A document explicitly reports using an identified method or architecture from another work in its own study. Requires a named method and primary evidence from the reporting document. Citation, comparison, proposed future use and similarity alone do not qualify. This is reported use, not independently verified implementation or institutional adoption.

**Temporal scope:** 2017-06-12 · publication; kind: event

**Temporal qualification:** First arXiv submission date of the inspected v1 expression; not the method invention date or a claim about later revisions.

**Qualification / scope limits:** Author-reported use in the specified study, not independent replication, general institutional adoption, sole origin or proof of effectiveness. The target identifies a work; its inspected version is not necessarily the version used by these authors.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-20

**Evidence coverage:** Supporting evidence: primary · 1 source

**Structured attributes:**

```json
{
  "method": "Adam optimiser with the paper’s specified learning-rate schedule"
}
```

#### Evidence 1 · `evidence-lineage-attention-uses-adam`

**Source title:** Attention Is All You Need

**Source ID:** source-attention-all-you-need-v1

**Publisher / authors:** arXiv / Ashish Vaswani; Noam Shazeer; Niki Parmar; Jakob Uszkoreit; Llion Jones; Aidan N. Gomez; Lukasz Kaiser; Illia Polosukhin

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** The training section names Adam as the optimiser used.

**Locator:** v1 §5.3, PDF p. 7

**Canonical source:** [Attention Is All You Need](https://arxiv.org/abs/1706.03762)

**Evidence URL:** [Inspected version](https://arxiv.org/pdf/1706.03762v1)

**Source publication date:** 2017-06-12

**Source / version description:** arXiv:1706.03762v1; first-submission date from version history. Later revisions are not substituted.

**Version date:** 2017-06-12

**Source accessed:** 2026-09-20

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-20

**Verification note:** Relevant source passage inspected by machine. Primary for what this document states; no independent replication or human review. Existing source access dates are retained; this evidence check has its own date.

**Human decision:**

**Notes:**

---

## Human feedback and oversight limits

**Mechanical documentary links:**

```text
Deep reinforcement learning from human preferences — cites → Trust Region Policy Optimization [lineage-preferences-cites-trpo]
Deep reinforcement learning from human preferences — uses_method_from → Trust Region Policy Optimization [lineage-preferences-uses-trpo]
Learning to summarize from human feedback — cites → Deep reinforcement learning from human preferences [lineage-summaries-cites-preferences]
Learning to summarize from human feedback — cites → Proximal Policy Optimization Algorithms [lineage-summaries-cites-ppo]
Learning to summarize from human feedback — uses_method_from → Proximal Policy Optimization Algorithms [lineage-summaries-uses-ppo]
Training language models to follow instructions with human feedback — cites → Learning to summarize from human feedback [lineage-instruct-cites-summaries]
Training language models to follow instructions with human feedback — uses_method_from → Learning to summarize from human feedback [lineage-instruct-uses-summaries]
Training language models to follow instructions with human feedback — cites → Proximal Policy Optimization Algorithms [lineage-instruct-cites-ppo]
Training language models to follow instructions with human feedback — uses_method_from → Proximal Policy Optimization Algorithms [lineage-instruct-uses-ppo]
Training language models to follow instructions with human feedback — cites → Deep reinforcement learning from human preferences [lineage-instruct-cites-preferences]
Training language models to follow instructions with human feedback — discusses → Reinforcement learning from human feedback [lineage-instruct-discusses-rlhf]
Introducing Superalignment — discusses → Reinforcement learning from human feedback [lineage-superalignment-discusses-rlhf]
```

### 17 · `lineage-jan-leike-preferences`

**Increment membership:** New claim

**Statement:** Deep reinforcement learning from human preferences names Jan Leike as a co-author.

**Relation:** Jan Leike \[jan-leike\] → authored (authored) → Deep reinforcement learning from human preferences \[human-preferences-paper\]

**Relation semantics:** Authorship as credited in the document. Does not imply sole authorship.

**Temporal scope:** 2017-06-12 · publication; kind: event

**Temporal qualification:** First arXiv submission date of the inspected v1 expression; not the method invention date or a claim about later revisions.

**Qualification / scope limits:** One credited co-author, not sole authorship, leadership, employment or priority for the method.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-20

**Evidence coverage:** Supporting evidence: primary · 1 source

#### Evidence 1 · `evidence-lineage-jan-leike-preferences`

**Source title:** Deep reinforcement learning from human preferences

**Source ID:** source-human-preferences-paper-v1

**Publisher / authors:** arXiv / Paul Christiano; Jan Leike; Tom B. Brown; Miljan Martic; Shane Legg; Dario Amodei

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** The named person appears in the author list.

**Locator:** v1 PDF p. 1, author block

**Canonical source:** [Deep reinforcement learning from human preferences](https://arxiv.org/abs/1706.03741)

**Evidence URL:** [Inspected version](https://arxiv.org/pdf/1706.03741v1)

**Source publication date:** 2017-06-12

**Source / version description:** arXiv:1706.03741v1; first-submission date from version history. Later revisions are not substituted.

**Version date:** 2017-06-12

**Source accessed:** 2026-09-20

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-20

**Verification note:** Relevant source passage inspected by machine. Primary for what this document states; no independent replication or human review. Existing source access dates are retained; this evidence check has its own date.

**Human decision:**

**Notes:**

---

### 18 · `lineage-dario-amodei-preferences`

**Increment membership:** New claim

**Statement:** Deep reinforcement learning from human preferences names Dario Amodei as a co-author.

**Relation:** Dario Amodei \[dario-amodei\] → authored (authored) → Deep reinforcement learning from human preferences \[human-preferences-paper\]

**Relation semantics:** Authorship as credited in the document. Does not imply sole authorship.

**Temporal scope:** 2017-06-12 · publication; kind: event

**Temporal qualification:** First arXiv submission date of the inspected v1 expression; not the method invention date or a claim about later revisions.

**Qualification / scope limits:** One credited co-author, not sole authorship, leadership, employment or priority for the method.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-20

**Evidence coverage:** Supporting evidence: primary · 1 source

#### Evidence 1 · `evidence-lineage-dario-amodei-preferences`

**Source title:** Deep reinforcement learning from human preferences

**Source ID:** source-human-preferences-paper-v1

**Publisher / authors:** arXiv / Paul Christiano; Jan Leike; Tom B. Brown; Miljan Martic; Shane Legg; Dario Amodei

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** The named person appears in the author list.

**Locator:** v1 PDF p. 1, author block

**Canonical source:** [Deep reinforcement learning from human preferences](https://arxiv.org/abs/1706.03741)

**Evidence URL:** [Inspected version](https://arxiv.org/pdf/1706.03741v1)

**Source publication date:** 2017-06-12

**Source / version description:** arXiv:1706.03741v1; first-submission date from version history. Later revisions are not substituted.

**Version date:** 2017-06-12

**Source accessed:** 2026-09-20

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-20

**Verification note:** Relevant source passage inspected by machine. Primary for what this document states; no independent replication or human review. Existing source access dates are retained; this evidence check has its own date.

**Human decision:**

**Notes:**

---

### 19 · `lineage-shane-legg-preferences`

**Increment membership:** New claim

**Statement:** Deep reinforcement learning from human preferences names Shane Legg as a co-author.

**Relation:** Shane Legg \[shane-legg\] → authored (authored) → Deep reinforcement learning from human preferences \[human-preferences-paper\]

**Relation semantics:** Authorship as credited in the document. Does not imply sole authorship.

**Temporal scope:** 2017-06-12 · publication; kind: event

**Temporal qualification:** First arXiv submission date of the inspected v1 expression; not the method invention date or a claim about later revisions.

**Qualification / scope limits:** One credited co-author, not sole authorship, leadership, employment or priority for the method.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-20

**Evidence coverage:** Supporting evidence: primary · 1 source

#### Evidence 1 · `evidence-lineage-shane-legg-preferences`

**Source title:** Deep reinforcement learning from human preferences

**Source ID:** source-human-preferences-paper-v1

**Publisher / authors:** arXiv / Paul Christiano; Jan Leike; Tom B. Brown; Miljan Martic; Shane Legg; Dario Amodei

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** The named person appears in the author list.

**Locator:** v1 PDF p. 1, author block

**Canonical source:** [Deep reinforcement learning from human preferences](https://arxiv.org/abs/1706.03741)

**Evidence URL:** [Inspected version](https://arxiv.org/pdf/1706.03741v1)

**Source publication date:** 2017-06-12

**Source / version description:** arXiv:1706.03741v1; first-submission date from version history. Later revisions are not substituted.

**Version date:** 2017-06-12

**Source accessed:** 2026-09-20

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-20

**Verification note:** Relevant source passage inspected by machine. Primary for what this document states; no independent replication or human review. Existing source access dates are retained; this evidence check has its own date.

**Human decision:**

**Notes:**

---

### 20 · `lineage-preferences-cites-trpo`

**Increment membership:** New claim

**Statement:** Human Preferences cites TRPO in its policy-optimisation procedure.

**Relation:** Deep reinforcement learning from human preferences \[human-preferences-paper\] → cites (cites) → Trust Region Policy Optimization \[trpo-paper\]

**Relation semantics:** An explicit reference to a work. Citation alone is neither agreement nor causal influence.

**Temporal scope:** 2017-06-12 · publication; kind: event

**Temporal qualification:** First arXiv submission date of the inspected v1 expression; not the method invention date or a claim about later revisions.

**Qualification / scope limits:** An explicit work-level reference only; neither agreement nor a causal influence claim. The citing text does not identify a particular arXiv revision of the target.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-20

**Evidence coverage:** Supporting evidence: primary · 1 source

#### Evidence 1 · `evidence-lineage-preferences-cites-trpo`

**Source title:** Deep reinforcement learning from human preferences

**Source ID:** source-human-preferences-paper-v1

**Publisher / authors:** arXiv / Paul Christiano; Jan Leike; Tom B. Brown; Miljan Martic; Shane Legg; Dario Amodei

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** The policy optimisation section references TRPO.

**Locator:** v1 §2.2.1, PDF p. 4; References Schulman et al. (2015)

**Canonical source:** [Deep reinforcement learning from human preferences](https://arxiv.org/abs/1706.03741)

**Evidence URL:** [Inspected version](https://arxiv.org/pdf/1706.03741v1)

**Source publication date:** 2017-06-12

**Source / version description:** arXiv:1706.03741v1; first-submission date from version history. Later revisions are not substituted.

**Version date:** 2017-06-12

**Source accessed:** 2026-09-20

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-20

**Verification note:** Relevant source passage inspected by machine. Primary for what this document states; no independent replication or human review. Existing source access dates are retained; this evidence check has its own date.

**Human decision:**

**Notes:**

---

### 21 · `lineage-preferences-uses-trpo`

**Increment membership:** New claim

**Statement:** Human Preferences reports using TRPO for simulated robotics tasks.

**Relation:** Deep reinforcement learning from human preferences \[human-preferences-paper\] → uses\_method\_from (reports using method from) → Trust Region Policy Optimization \[trpo-paper\]

**Relation semantics:** A document explicitly reports using an identified method or architecture from another work in its own study. Requires a named method and primary evidence from the reporting document. Citation, comparison, proposed future use and similarity alone do not qualify. This is reported use, not independently verified implementation or institutional adoption.

**Temporal scope:** 2017-06-12 · publication; kind: event

**Temporal qualification:** First arXiv submission date of the inspected v1 expression; not the method invention date or a claim about later revisions.

**Qualification / scope limits:** Author-reported use in the specified study, not independent replication, general institutional adoption, sole origin or proof of effectiveness. The target identifies a work; its inspected version is not necessarily the version used by these authors.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-20

**Evidence coverage:** Supporting evidence: primary · 1 source

**Structured attributes:**

```json
{
  "method": "TRPO for simulated robotics"
}
```

#### Evidence 1 · `evidence-lineage-preferences-uses-trpo`

**Source title:** Deep reinforcement learning from human preferences

**Source ID:** source-human-preferences-paper-v1

**Publisher / authors:** arXiv / Paul Christiano; Jan Leike; Tom B. Brown; Miljan Martic; Shane Legg; Dario Amodei

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** The study uses TRPO for simulated robotics, distinct from A2C for Atari.

**Locator:** v1 §2.2.1, PDF p. 4

**Canonical source:** [Deep reinforcement learning from human preferences](https://arxiv.org/abs/1706.03741)

**Evidence URL:** [Inspected version](https://arxiv.org/pdf/1706.03741v1)

**Source publication date:** 2017-06-12

**Source / version description:** arXiv:1706.03741v1; first-submission date from version history. Later revisions are not substituted.

**Version date:** 2017-06-12

**Source accessed:** 2026-09-20

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-20

**Verification note:** Relevant source passage inspected by machine. Primary for what this document states; no independent replication or human review. Existing source access dates are retained; this evidence check has its own date.

**Human decision:**

**Notes:**

---

### 22 · `lineage-summaries-cites-preferences`

**Increment membership:** New claim

**Statement:** Learning to summarize from human feedback cites Human Preferences.

**Relation:** Learning to summarize from human feedback \[summarize-feedback-paper\] → cites (cites) → Deep reinforcement learning from human preferences \[human-preferences-paper\]

**Relation semantics:** An explicit reference to a work. Citation alone is neither agreement nor causal influence.

**Temporal scope:** 2020-09-02 · publication; kind: event

**Temporal qualification:** First arXiv submission date of the inspected v1 expression; not the method invention date or a claim about later revisions.

**Qualification / scope limits:** An explicit work-level reference only; neither agreement nor a causal influence claim. The citing text does not identify a particular arXiv revision of the target.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-20

**Evidence coverage:** Supporting evidence: primary · 1 source

#### Evidence 1 · `evidence-lineage-summaries-cites-preferences`

**Source title:** Learning to summarize from human feedback

**Source ID:** source-summarize-feedback-paper-v1

**Publisher / authors:** arXiv / Nisan Stiennon; Long Ouyang; Jeff Wu; Daniel M. Ziegler; Ryan Lowe; Chelsea Voss; Alec Radford; Dario Amodei; Paul Christiano

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** Reference \[10\] identifies Christiano and colleagues’ 2017 paper.

**Locator:** v1 References \[10\], PDF p. 11

**Canonical source:** [Learning to summarize from human feedback](https://arxiv.org/abs/2009.01325)

**Evidence URL:** [Inspected version](https://arxiv.org/pdf/2009.01325v1)

**Source publication date:** 2020-09-02

**Source / version description:** arXiv:2009.01325v1; first-submission date from version history. Later revisions are not substituted.

**Version date:** 2020-09-02

**Source accessed:** 2026-09-20

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-20

**Verification note:** Relevant source passage inspected by machine. Primary for what this document states; no independent replication or human review. Existing source access dates are retained; this evidence check has its own date.

**Human decision:**

**Notes:**

---

### 23 · `lineage-summaries-cites-ppo`

**Increment membership:** New claim

**Statement:** Learning to summarize from human feedback cites PPO for policy optimisation.

**Relation:** Learning to summarize from human feedback \[summarize-feedback-paper\] → cites (cites) → Proximal Policy Optimization Algorithms \[ppo-paper\]

**Relation semantics:** An explicit reference to a work. Citation alone is neither agreement nor causal influence.

**Temporal scope:** 2020-09-02 · publication; kind: event

**Temporal qualification:** First arXiv submission date of the inspected v1 expression; not the method invention date or a claim about later revisions.

**Qualification / scope limits:** An explicit work-level reference only; neither agreement nor a causal influence claim. The citing text does not identify a particular arXiv revision of the target.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-20

**Evidence coverage:** Supporting evidence: primary · 1 source

#### Evidence 1 · `evidence-lineage-summaries-cites-ppo`

**Source title:** Learning to summarize from human feedback

**Source ID:** source-summarize-feedback-paper-v1

**Publisher / authors:** arXiv / Nisan Stiennon; Long Ouyang; Jeff Wu; Daniel M. Ziegler; Ryan Lowe; Chelsea Voss; Alec Radford; Dario Amodei; Paul Christiano

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** The policy optimisation step cites PPO as reference \[53\].

**Locator:** v1 §3.1 step 3, PDF p. 3; References \[53\]

**Canonical source:** [Learning to summarize from human feedback](https://arxiv.org/abs/2009.01325)

**Evidence URL:** [Inspected version](https://arxiv.org/pdf/2009.01325v1)

**Source publication date:** 2020-09-02

**Source / version description:** arXiv:2009.01325v1; first-submission date from version history. Later revisions are not substituted.

**Version date:** 2020-09-02

**Source accessed:** 2026-09-20

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-20

**Verification note:** Relevant source passage inspected by machine. Primary for what this document states; no independent replication or human review. Existing source access dates are retained; this evidence check has its own date.

**Human decision:**

**Notes:**

---

### 24 · `lineage-summaries-uses-ppo`

**Increment membership:** New claim

**Statement:** Learning to summarize from human feedback reports optimising its policy with PPO.

**Relation:** Learning to summarize from human feedback \[summarize-feedback-paper\] → uses\_method\_from (reports using method from) → Proximal Policy Optimization Algorithms \[ppo-paper\]

**Relation semantics:** A document explicitly reports using an identified method or architecture from another work in its own study. Requires a named method and primary evidence from the reporting document. Citation, comparison, proposed future use and similarity alone do not qualify. This is reported use, not independently verified implementation or institutional adoption.

**Temporal scope:** 2020-09-02 · publication; kind: event

**Temporal qualification:** First arXiv submission date of the inspected v1 expression; not the method invention date or a claim about later revisions.

**Qualification / scope limits:** Author-reported use in the specified study, not independent replication, general institutional adoption, sole origin or proof of effectiveness. The target identifies a work; its inspected version is not necessarily the version used by these authors.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-20

**Evidence coverage:** Supporting evidence: primary · 1 source

**Structured attributes:**

```json
{
  "method": "PPO optimisation against a learned summarisation reward"
}
```

#### Evidence 1 · `evidence-lineage-summaries-uses-ppo`

**Source title:** Learning to summarize from human feedback

**Source ID:** source-summarize-feedback-paper-v1

**Publisher / authors:** arXiv / Nisan Stiennon; Long Ouyang; Jeff Wu; Daniel M. Ziegler; Ryan Lowe; Chelsea Voss; Alec Radford; Dario Amodei; Paul Christiano

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** The learned reward is used to optimise the summarisation policy with PPO.

**Locator:** v1 §3.1 step 3, PDF p. 3

**Canonical source:** [Learning to summarize from human feedback](https://arxiv.org/abs/2009.01325)

**Evidence URL:** [Inspected version](https://arxiv.org/pdf/2009.01325v1)

**Source publication date:** 2020-09-02

**Source / version description:** arXiv:2009.01325v1; first-submission date from version history. Later revisions are not substituted.

**Version date:** 2020-09-02

**Source accessed:** 2026-09-20

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-20

**Verification note:** Relevant source passage inspected by machine. Primary for what this document states; no independent replication or human review. Existing source access dates are retained; this evidence check has its own date.

**Human decision:**

**Notes:**

---

### 25 · `lineage-instruct-cites-summaries`

**Increment membership:** New claim

**Statement:** InstructGPT cites Learning to summarize from human feedback.

**Relation:** Training language models to follow instructions with human feedback \[instructgpt-paper\] → cites (cites) → Learning to summarize from human feedback \[summarize-feedback-paper\]

**Relation semantics:** An explicit reference to a work. Citation alone is neither agreement nor causal influence.

**Temporal scope:** 2022-03-04 · publication; kind: event

**Temporal qualification:** First arXiv submission date of the inspected v1 expression; not the method invention date or a claim about later revisions.

**Qualification / scope limits:** An explicit work-level reference only; neither agreement nor a causal influence claim. The citing text does not identify a particular arXiv revision of the target.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-20

**Evidence coverage:** Supporting evidence: primary · 1 source

#### Evidence 1 · `evidence-lineage-instruct-cites-summaries`

**Source title:** Training language models to follow instructions with human feedback

**Source ID:** source-instructgpt-paper-v1

**Publisher / authors:** arXiv / Long Ouyang; Jeff Wu; Xu Jiang; Diogo Almeida; Carroll L. Wainwright; Pamela Mishkin; Chong Zhang; Sandhini Agarwal; Katarina Slama; Alex Ray; John Schulman; Jacob Hilton; Fraser Kelton; Luke Miller; Maddie Simens; Amanda Askell; Peter Welinder; Paul Christiano; Jan Leike; Ryan Lowe

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** The paper cites Stiennon et al. (2020).

**Locator:** v1 §2, PDF pp. 4–5; §3.5, PDF p. 9

**Canonical source:** [Training language models to follow instructions with human feedback](https://arxiv.org/abs/2203.02155)

**Evidence URL:** [Inspected version](https://arxiv.org/pdf/2203.02155v1)

**Source publication date:** 2022-03-04

**Source / version description:** arXiv:2203.02155v1; first-submission date from version history. Later revisions are not substituted.

**Version date:** 2022-03-04

**Source accessed:** 2026-09-20

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-20

**Verification note:** Relevant source passage inspected by machine. Primary for what this document states; no independent replication or human review. Existing source access dates are retained; this evidence check has its own date.

**Human decision:**

**Notes:**

---

### 26 · `lineage-instruct-uses-summaries`

**Increment membership:** New claim

**Statement:** InstructGPT reports following the summarisation paper’s RL fine-tuning procedure.

**Relation:** Training language models to follow instructions with human feedback \[instructgpt-paper\] → uses\_method\_from (reports using method from) → Learning to summarize from human feedback \[summarize-feedback-paper\]

**Relation semantics:** A document explicitly reports using an identified method or architecture from another work in its own study. Requires a named method and primary evidence from the reporting document. Citation, comparison, proposed future use and similarity alone do not qualify. This is reported use, not independently verified implementation or institutional adoption.

**Temporal scope:** 2022-03-04 · publication; kind: event

**Temporal qualification:** First arXiv submission date of the inspected v1 expression; not the method invention date or a claim about later revisions.

**Qualification / scope limits:** Author-reported use in the specified study, not independent replication, general institutional adoption, sole origin or proof of effectiveness. The target identifies a work; its inspected version is not necessarily the version used by these authors.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-20

**Evidence coverage:** Supporting evidence: primary · 1 source

**Structured attributes:**

```json
{
  "method": "RL fine-tuning procedure following Stiennon et al. (2020)"
}
```

#### Evidence 1 · `evidence-lineage-instruct-uses-summaries`

**Source title:** Training language models to follow instructions with human feedback

**Source ID:** source-instructgpt-paper-v1

**Publisher / authors:** arXiv / Long Ouyang; Jeff Wu; Xu Jiang; Diogo Almeida; Carroll L. Wainwright; Pamela Mishkin; Chong Zhang; Sandhini Agarwal; Katarina Slama; Alex Ray; John Schulman; Jacob Hilton; Fraser Kelton; Luke Miller; Maddie Simens; Amanda Askell; Peter Welinder; Paul Christiano; Jan Leike; Ryan Lowe

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** The RL paragraph states that fine-tuning follows Stiennon et al. (2020).

**Locator:** v1 §3.5, Reinforcement learning, PDF p. 9

**Canonical source:** [Training language models to follow instructions with human feedback](https://arxiv.org/abs/2203.02155)

**Evidence URL:** [Inspected version](https://arxiv.org/pdf/2203.02155v1)

**Source publication date:** 2022-03-04

**Source / version description:** arXiv:2203.02155v1; first-submission date from version history. Later revisions are not substituted.

**Version date:** 2022-03-04

**Source accessed:** 2026-09-20

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-20

**Verification note:** Relevant source passage inspected by machine. Primary for what this document states; no independent replication or human review. Existing source access dates are retained; this evidence check has its own date.

**Human decision:**

**Notes:**

---

### 27 · `lineage-instruct-cites-ppo`

**Increment membership:** New claim

**Statement:** InstructGPT cites PPO in its RL fine-tuning procedure.

**Relation:** Training language models to follow instructions with human feedback \[instructgpt-paper\] → cites (cites) → Proximal Policy Optimization Algorithms \[ppo-paper\]

**Relation semantics:** An explicit reference to a work. Citation alone is neither agreement nor causal influence.

**Temporal scope:** 2022-03-04 · publication; kind: event

**Temporal qualification:** First arXiv submission date of the inspected v1 expression; not the method invention date or a claim about later revisions.

**Qualification / scope limits:** An explicit work-level reference only; neither agreement nor a causal influence claim. The citing text does not identify a particular arXiv revision of the target.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-20

**Evidence coverage:** Supporting evidence: primary · 1 source

#### Evidence 1 · `evidence-lineage-instruct-cites-ppo`

**Source title:** Training language models to follow instructions with human feedback

**Source ID:** source-instructgpt-paper-v1

**Publisher / authors:** arXiv / Long Ouyang; Jeff Wu; Xu Jiang; Diogo Almeida; Carroll L. Wainwright; Pamela Mishkin; Chong Zhang; Sandhini Agarwal; Katarina Slama; Alex Ray; John Schulman; Jacob Hilton; Fraser Kelton; Luke Miller; Maddie Simens; Amanda Askell; Peter Welinder; Paul Christiano; Jan Leike; Ryan Lowe

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** The RL paragraph cites Schulman et al. (2017).

**Locator:** v1 §3.5, Reinforcement learning, PDF p. 9

**Canonical source:** [Training language models to follow instructions with human feedback](https://arxiv.org/abs/2203.02155)

**Evidence URL:** [Inspected version](https://arxiv.org/pdf/2203.02155v1)

**Source publication date:** 2022-03-04

**Source / version description:** arXiv:2203.02155v1; first-submission date from version history. Later revisions are not substituted.

**Version date:** 2022-03-04

**Source accessed:** 2026-09-20

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-20

**Verification note:** Relevant source passage inspected by machine. Primary for what this document states; no independent replication or human review. Existing source access dates are retained; this evidence check has its own date.

**Human decision:**

**Notes:**

---

### 28 · `lineage-instruct-uses-ppo`

**Increment membership:** New claim

**Statement:** InstructGPT reports using PPO to fine-tune the supervised model.

**Relation:** Training language models to follow instructions with human feedback \[instructgpt-paper\] → uses\_method\_from (reports using method from) → Proximal Policy Optimization Algorithms \[ppo-paper\]

**Relation semantics:** A document explicitly reports using an identified method or architecture from another work in its own study. Requires a named method and primary evidence from the reporting document. Citation, comparison, proposed future use and similarity alone do not qualify. This is reported use, not independently verified implementation or institutional adoption.

**Temporal scope:** 2022-03-04 · publication; kind: event

**Temporal qualification:** First arXiv submission date of the inspected v1 expression; not the method invention date or a claim about later revisions.

**Qualification / scope limits:** Author-reported use in the specified study, not independent replication, general institutional adoption, sole origin or proof of effectiveness. The target identifies a work; its inspected version is not necessarily the version used by these authors.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-20

**Evidence coverage:** Supporting evidence: primary · 1 source

**Structured attributes:**

```json
{
  "method": "PPO fine-tuning of the supervised model"
}
```

#### Evidence 1 · `evidence-lineage-instruct-uses-ppo`

**Source title:** Training language models to follow instructions with human feedback

**Source ID:** source-instructgpt-paper-v1

**Publisher / authors:** arXiv / Long Ouyang; Jeff Wu; Xu Jiang; Diogo Almeida; Carroll L. Wainwright; Pamela Mishkin; Chong Zhang; Sandhini Agarwal; Katarina Slama; Alex Ray; John Schulman; Jacob Hilton; Fraser Kelton; Luke Miller; Maddie Simens; Amanda Askell; Peter Welinder; Paul Christiano; Jan Leike; Ryan Lowe

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** The paper names PPO as its fine-tuning algorithm.

**Locator:** v1 §3.5, Reinforcement learning, PDF p. 9

**Canonical source:** [Training language models to follow instructions with human feedback](https://arxiv.org/abs/2203.02155)

**Evidence URL:** [Inspected version](https://arxiv.org/pdf/2203.02155v1)

**Source publication date:** 2022-03-04

**Source / version description:** arXiv:2203.02155v1; first-submission date from version history. Later revisions are not substituted.

**Version date:** 2022-03-04

**Source accessed:** 2026-09-20

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-20

**Verification note:** Relevant source passage inspected by machine. Primary for what this document states; no independent replication or human review. Existing source access dates are retained; this evidence check has its own date.

**Human decision:**

**Notes:**

---

### 29 · `lineage-instruct-cites-preferences`

**Increment membership:** New claim

**Statement:** InstructGPT cites Human Preferences in its account of earlier RLHF work.

**Relation:** Training language models to follow instructions with human feedback \[instructgpt-paper\] → cites (cites) → Deep reinforcement learning from human preferences \[human-preferences-paper\]

**Relation semantics:** An explicit reference to a work. Citation alone is neither agreement nor causal influence.

**Temporal scope:** 2022-03-04 · publication; kind: event

**Temporal qualification:** First arXiv submission date of the inspected v1 expression; not the method invention date or a claim about later revisions.

**Qualification / scope limits:** An explicit work-level reference only; neither agreement nor a causal influence claim. The citing text does not identify a particular arXiv revision of the target. The source’s historical attribution is not a Selekoa claim of earliest invention.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-20

**Evidence coverage:** Supporting evidence: primary · 1 source

#### Evidence 1 · `evidence-lineage-instruct-cites-preferences`

**Source title:** Training language models to follow instructions with human feedback

**Source ID:** source-instructgpt-paper-v1

**Publisher / authors:** arXiv / Long Ouyang; Jeff Wu; Xu Jiang; Diogo Almeida; Carroll L. Wainwright; Pamela Mishkin; Chong Zhang; Sandhini Agarwal; Katarina Slama; Alex Ray; John Schulman; Jacob Hilton; Fraser Kelton; Luke Miller; Maddie Simens; Amanda Askell; Peter Welinder; Paul Christiano; Jan Leike; Ryan Lowe

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** The related-work discussion references Christiano et al. (2017).

**Locator:** v1 §2, PDF pp. 4–5

**Canonical source:** [Training language models to follow instructions with human feedback](https://arxiv.org/abs/2203.02155)

**Evidence URL:** [Inspected version](https://arxiv.org/pdf/2203.02155v1)

**Source publication date:** 2022-03-04

**Source / version description:** arXiv:2203.02155v1; first-submission date from version history. Later revisions are not substituted.

**Version date:** 2022-03-04

**Source accessed:** 2026-09-20

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-20

**Verification note:** Relevant source passage inspected by machine. Primary for what this document states; no independent replication or human review. Existing source access dates are retained; this evidence check has its own date.

**Human decision:**

**Notes:**

---

### 30 · `lineage-instruct-discusses-rlhf`

**Increment membership:** New claim

**Statement:** InstructGPT discusses reinforcement learning from human feedback as its training approach.

**Relation:** Training language models to follow instructions with human feedback \[instructgpt-paper\] → discusses (discusses) → Reinforcement learning from human feedback \[rlhf\]

**Relation semantics:** The concept is explicitly discussed in the document. This makes no earliest-use, invention or transmission claim.

**Temporal scope:** 2022-03-04 · publication; kind: event

**Temporal qualification:** First arXiv submission date of the inspected v1 expression; not the method invention date or a claim about later revisions.

**Qualification / scope limits:** Discussion of the defined procedure; no earliest term use, invention or universal alignment success is asserted.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-20

**Evidence coverage:** Supporting evidence: primary · 1 source

#### Evidence 1 · `evidence-lineage-instruct-discusses-rlhf`

**Source title:** Training language models to follow instructions with human feedback

**Source ID:** source-instructgpt-paper-v1

**Publisher / authors:** arXiv / Long Ouyang; Jeff Wu; Xu Jiang; Diogo Almeida; Carroll L. Wainwright; Pamela Mishkin; Chong Zhang; Sandhini Agarwal; Katarina Slama; Alex Ray; John Schulman; Jacob Hilton; Fraser Kelton; Luke Miller; Maddie Simens; Amanda Askell; Peter Welinder; Paul Christiano; Jan Leike; Ryan Lowe

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** The paper calls its approach an application of RLHF.

**Locator:** v1 §2, PDF pp. 4–5

**Canonical source:** [Training language models to follow instructions with human feedback](https://arxiv.org/abs/2203.02155)

**Evidence URL:** [Inspected version](https://arxiv.org/pdf/2203.02155v1)

**Source publication date:** 2022-03-04

**Source / version description:** arXiv:2203.02155v1; first-submission date from version history. Later revisions are not substituted.

**Version date:** 2022-03-04

**Source accessed:** 2026-09-20

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-20

**Verification note:** Relevant source passage inspected by machine. Primary for what this document states; no independent replication or human review. Existing source access dates are retained; this evidence check has its own date.

**Human decision:**

**Notes:**

---

### 31 · `lineage-superalignment-discusses-rlhf`

**Increment membership:** New claim

**Statement:** Introducing Superalignment argues that human supervision limits RLHF’s scalability to superintelligence.

**Relation:** Introducing Superalignment \[superalignment-announcement\] → discusses (discusses) → Reinforcement learning from human feedback \[rlhf\]

**Relation semantics:** The concept is explicitly discussed in the document. This makes no earliest-use, invention or transmission claim.

**Temporal scope:** 2023-07-05 · publication; kind: event

**Temporal qualification:** Displayed announcement date; retrieved page may have changed subsequently.

**Qualification / scope limits:** An attributed criticism of supervision limits, not rejection of every use of RLHF, proof of the prediction, or a new method’s implementation. Mutable page; exact 2023 expression not authenticated.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-20

**Evidence coverage:** Supporting evidence: primary · 1 source

#### Evidence 1 · `evidence-lineage-superalignment-discusses-rlhf`

**Source title:** Introducing Superalignment

**Source ID:** source-superalignment-announcement

**Publisher / authors:** OpenAI / Jan Leike; Ilya Sutskever

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** The authors argue that human supervision will not scale to much smarter systems.

**Locator:** Opening problem statement, paragraph beginning “Currently”; footnote B

**Canonical source:** [Introducing Superalignment](https://openai.com/index/introducing-superalignment/)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2023-07-05

**Source / version description:** Dated announcement as retrieved; mutable current webpage, not an authenticated 2023 snapshot.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-20

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-20

**Verification note:** Relevant source passage inspected by machine. Primary for what this document states; no independent replication or human review. Existing source access dates are retained; this evidence check has its own date.

**Human decision:**

**Notes:**

---

### 32 · `lineage-jan-leike-superalignment`

**Increment membership:** New claim

**Statement:** Introducing Superalignment credits Jan Leike as an author.

**Relation:** Jan Leike \[jan-leike\] → authored (authored) → Introducing Superalignment \[superalignment-announcement\]

**Relation semantics:** Authorship as credited in the document. Does not imply sole authorship.

**Temporal scope:** 2023-07-05 · publication; kind: event

**Temporal qualification:** Displayed announcement date; retrieved page may have changed subsequently.

**Qualification / scope limits:** One credited co-author, not sole authorship, leadership, employment or priority for the method.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-20

**Evidence coverage:** Supporting evidence: primary · 1 source

#### Evidence 1 · `evidence-lineage-jan-leike-superalignment`

**Source title:** Introducing Superalignment

**Source ID:** source-superalignment-announcement

**Publisher / authors:** OpenAI / Jan Leike; Ilya Sutskever

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** The named person is credited as an author.

**Locator:** Authors section

**Canonical source:** [Introducing Superalignment](https://openai.com/index/introducing-superalignment/)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2023-07-05

**Source / version description:** Dated announcement as retrieved; mutable current webpage, not an authenticated 2023 snapshot.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-20

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-20

**Verification note:** Relevant source passage inspected by machine. Primary for what this document states; no independent replication or human review. Existing source access dates are retained; this evidence check has its own date.

**Human decision:**

**Notes:**

---

### 33 · `lineage-ilya-sutskever-superalignment`

**Increment membership:** New claim

**Statement:** Introducing Superalignment credits Ilya Sutskever as an author.

**Relation:** Ilya Sutskever \[ilya-sutskever\] → authored (authored) → Introducing Superalignment \[superalignment-announcement\]

**Relation semantics:** Authorship as credited in the document. Does not imply sole authorship.

**Temporal scope:** 2023-07-05 · publication; kind: event

**Temporal qualification:** Displayed announcement date; retrieved page may have changed subsequently.

**Qualification / scope limits:** One credited co-author, not sole authorship, leadership, employment or priority for the method.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-20

**Evidence coverage:** Supporting evidence: primary · 1 source

#### Evidence 1 · `evidence-lineage-ilya-sutskever-superalignment`

**Source title:** Introducing Superalignment

**Source ID:** source-superalignment-announcement

**Publisher / authors:** OpenAI / Jan Leike; Ilya Sutskever

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** The named person is credited as an author.

**Locator:** Authors section

**Canonical source:** [Introducing Superalignment](https://openai.com/index/introducing-superalignment/)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2023-07-05

**Source / version description:** Dated announcement as retrieved; mutable current webpage, not an authenticated 2023 snapshot.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-20

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-20

**Verification note:** Relevant source passage inspected by machine. Primary for what this document states; no independent replication or human review. Existing source access dates are retained; this evidence check has its own date.

**Human decision:**

**Notes:**

---

## Intelligence explosion: documented historical reception

**Mechanical documentary links:**

```text
The Singularity: A Philosophical Analysis — cites → Speculations Concerning the First Ultraintelligent Machine [lineage-chalmers-cites-good]
The Singularity: A Philosophical Analysis — explicitly_credits → I. J. Good [lineage-chalmers-credits-good]
The Singularity: A Philosophical Analysis — discusses → Intelligence explosion [lineage-chalmers-discusses-explosion]
Intelligence Explosion Microeconomics — cites → The Singularity: A Philosophical Analysis [lineage-iem-cites-chalmers]
Intelligence Explosion Microeconomics — explicitly_credits → I. J. Good [lineage-iem-credits-good]
Speculations Concerning the First Ultraintelligent Machine — discusses → Intelligence explosion [good-discusses-explosion-1965]
Intelligence Explosion Microeconomics — cites → Speculations Concerning the First Ultraintelligent Machine [iem-cites-good-2013]
Intelligence Explosion Microeconomics — discusses → Intelligence explosion [iem-discusses-explosion-2013]
```

### 34 · `lineage-chalmers-authorship`

**Increment membership:** New claim

**Statement:** The Singularity: A Philosophical Analysis credits David J. Chalmers as author.

**Relation:** David J. Chalmers \[david-chalmers\] → authored (authored) → The Singularity: A Philosophical Analysis \[chalmers-singularity\]

**Relation semantics:** Authorship as credited in the document. Does not imply sole authorship.

**Temporal scope:** 2010 · publication; kind: event

**Temporal qualification:** Journal publication year only. Author-hosted expression has no separate revision date; no exact day or contemporaneous snapshot is inferred.

**Qualification / scope limits:** Authorship, not priority for the argument. The 2010 publication year comes from footnote 1; the hosted copy’s revision date is unknown.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-20

**Evidence coverage:** Supporting evidence: primary · 1 source

#### Evidence 1 · `evidence-lineage-chalmers-authorship`

**Source title:** The Singularity: A Philosophical Analysis

**Source ID:** source-chalmers-singularity

**Publisher / authors:** Journal of Consciousness Studies / author-hosted copy / David J. Chalmers

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** The title page credits David J. Chalmers.

**Locator:** Author-hosted PDF p. 1, title and author; footnote 1

**Canonical source:** [The Singularity: A Philosophical Analysis](https://consc.net/papers/singularity.pdf)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2010

**Source / version description:** Author-hosted 56-page expression; first-page footnote identifies 2010 journal publication, volume 17, pp. 7–65. Revision date unknown; PDF pagination differs from journal pagination.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-20

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-20

**Verification note:** Relevant source passage inspected by machine. Primary for what this document states; no independent replication or human review. Existing source access dates are retained; this evidence check has its own date.

**Human decision:**

**Notes:**

---

### 35 · `lineage-chalmers-cites-good`

**Increment membership:** New claim

**Statement:** The Singularity explicitly cites Good’s 1965 paper.

**Relation:** The Singularity: A Philosophical Analysis \[chalmers-singularity\] → cites (cites) → Speculations Concerning the First Ultraintelligent Machine \[good-1965\]

**Relation semantics:** An explicit reference to a work. Citation alone is neither agreement nor causal influence.

**Temporal scope:** 2010 · publication; kind: event

**Temporal qualification:** Journal publication year only. Author-hosted expression has no separate revision date; no exact day or contemporaneous snapshot is inferred.

**Qualification / scope limits:** Explicit citation to the historical work, not evidence of transmission to a frontier lab.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-20

**Evidence coverage:** Supporting evidence: primary · 1 source

#### Evidence 1 · `evidence-lineage-chalmers-cites-good`

**Source title:** The Singularity: A Philosophical Analysis

**Source ID:** source-chalmers-singularity

**Publisher / authors:** Journal of Consciousness Studies / author-hosted copy / David J. Chalmers

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** The introduction names Good’s paper and the references list it.

**Locator:** Author-hosted PDF p. 1, Introduction; p. 55, References

**Canonical source:** [The Singularity: A Philosophical Analysis](https://consc.net/papers/singularity.pdf)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2010

**Source / version description:** Author-hosted 56-page expression; first-page footnote identifies 2010 journal publication, volume 17, pp. 7–65. Revision date unknown; PDF pagination differs from journal pagination.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-20

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-20

**Verification note:** Relevant source passage inspected by machine. Primary for what this document states; no independent replication or human review. Existing source access dates are retained; this evidence check has its own date.

**Human decision:**

**Notes:**

---

### 36 · `lineage-chalmers-credits-good`

**Increment membership:** New claim

**Statement:** The Singularity attributes its opening intelligence-explosion argument to I. J. Good.

**Relation:** The Singularity: A Philosophical Analysis \[chalmers-singularity\] → explicitly\_credits (explicitly credits) → I. J. Good \[ij-good\]

**Relation semantics:** A document expressly attributes intellectual or practical contribution to a named actor, with the scope retained in the claim.

**Temporal scope:** 2010 · publication; kind: event

**Temporal qualification:** Journal publication year only. Author-hosted expression has no separate revision date; no exact day or contemporaneous snapshot is inferred.

**Qualification / scope limits:** Primary evidence of Chalmers’s attribution, not independent proof of earliest origin or universal agreement.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-20

**Evidence coverage:** Supporting evidence: primary · 1 source

#### Evidence 1 · `evidence-lineage-chalmers-credits-good`

**Source title:** The Singularity: A Philosophical Analysis

**Source ID:** source-chalmers-singularity

**Publisher / authors:** Journal of Consciousness Studies / author-hosted copy / David J. Chalmers

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** Chalmers attributes the basic argument to Good.

**Locator:** Author-hosted PDF p. 1, Introduction, paragraph before the Good quotation

**Canonical source:** [The Singularity: A Philosophical Analysis](https://consc.net/papers/singularity.pdf)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2010

**Source / version description:** Author-hosted 56-page expression; first-page footnote identifies 2010 journal publication, volume 17, pp. 7–65. Revision date unknown; PDF pagination differs from journal pagination.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-20

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-20

**Verification note:** Relevant source passage inspected by machine. Primary for what this document states; no independent replication or human review. Existing source access dates are retained; this evidence check has its own date.

**Human decision:**

**Notes:**

---

### 37 · `lineage-chalmers-discusses-explosion`

**Increment membership:** New claim

**Statement:** The Singularity discusses an intelligence explosion from successively more intelligent machine designers.

**Relation:** The Singularity: A Philosophical Analysis \[chalmers-singularity\] → discusses (discusses) → Intelligence explosion \[intelligence-explosion\]

**Relation semantics:** The concept is explicitly discussed in the document. This makes no earliest-use, invention or transmission claim.

**Temporal scope:** 2010 · publication; kind: event

**Temporal qualification:** Journal publication year only. Author-hosted expression has no separate revision date; no exact day or contemporaneous snapshot is inferred.

**Qualification / scope limits:** Concept discussion, not inevitability, a dated forecast accepted by Selekoa or term-priority attribution.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-20

**Evidence coverage:** Supporting evidence: primary · 1 source

#### Evidence 1 · `evidence-lineage-chalmers-discusses-explosion`

**Source title:** The Singularity: A Philosophical Analysis

**Source ID:** source-chalmers-singularity

**Publisher / authors:** Journal of Consciousness Studies / author-hosted copy / David J. Chalmers

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** The opening describes iterative machine design producing greater intelligence.

**Locator:** Author-hosted PDF p. 1, Introduction

**Canonical source:** [The Singularity: A Philosophical Analysis](https://consc.net/papers/singularity.pdf)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2010

**Source / version description:** Author-hosted 56-page expression; first-page footnote identifies 2010 journal publication, volume 17, pp. 7–65. Revision date unknown; PDF pagination differs from journal pagination.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-20

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-20

**Verification note:** Relevant source passage inspected by machine. Primary for what this document states; no independent replication or human review. Existing source access dates are retained; this evidence check has its own date.

**Human decision:**

**Notes:**

---

### 38 · `lineage-iem-cites-chalmers`

**Increment membership:** New claim

**Statement:** Intelligence Explosion Microeconomics cites Chalmers’s 2010 philosophical analysis.

**Relation:** Intelligence Explosion Microeconomics \[iem-2013\] → cites (cites) → The Singularity: A Philosophical Analysis \[chalmers-singularity\]

**Relation semantics:** An explicit reference to a work. Citation alone is neither agreement nor causal influence.

**Temporal scope:** 2013 · publication; kind: event

**Temporal qualification:** Publication year only; inspected report last modified 2013-09-13.

**Qualification / scope limits:** Work-level reference; the report does not identify the revision of the author-hosted copy. No institutional transfer is inferred.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-20

**Evidence coverage:** Supporting evidence: primary · 1 source

#### Evidence 1 · `evidence-lineage-iem-cites-chalmers`

**Source title:** Intelligence Explosion Microeconomics

**Source ID:** source-iem

**Publisher / authors:** Machine Intelligence Research Institute / Eliezer Yudkowsky

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** The report refers readers to Chalmers (2010).

**Locator:** §1, printed p. 1 (PDF p. 4); References, printed p. 89 (PDF p. 92)

**Canonical source:** [Intelligence Explosion Microeconomics](https://intelligence.org/files/IEM.pdf)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2013

**Source / version description:** Technical report 2013-1; last modified September 13, 2013

**Version date:** 2013-09-13

**Source accessed:** 2026-09-17

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-20

**Verification note:** Relevant source passage inspected by machine. Primary for what this document states; no independent replication or human review. Existing source access dates are retained; this evidence check has its own date.

**Human decision:**

**Notes:**

---

### 39 · `lineage-iem-credits-good`

**Increment membership:** New claim

**Statement:** Intelligence Explosion Microeconomics attributes its opening quoted intelligence-explosion argument to Good.

**Relation:** Intelligence Explosion Microeconomics \[iem-2013\] → explicitly\_credits (explicitly credits) → I. J. Good \[ij-good\]

**Relation semantics:** A document expressly attributes intellectual or practical contribution to a named actor, with the scope retained in the claim.

**Temporal scope:** 2013 · publication; kind: event

**Temporal qualification:** Publication year only; inspected report last modified 2013-09-13.

**Qualification / scope limits:** Credit for this argument, distinct from the existing citation edge. No claim of earliest use or modern lab adoption.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-20

**Evidence coverage:** Supporting evidence: primary · 1 source

#### Evidence 1 · `evidence-lineage-iem-credits-good`

**Source title:** Intelligence Explosion Microeconomics

**Source ID:** source-iem

**Publisher / authors:** Machine Intelligence Research Institute / Eliezer Yudkowsky

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** The report identifies Good as author of the quoted argument.

**Locator:** §1, printed p. 1 (PDF p. 4), introduction to Good quotation

**Canonical source:** [Intelligence Explosion Microeconomics](https://intelligence.org/files/IEM.pdf)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2013

**Source / version description:** Technical report 2013-1; last modified September 13, 2013

**Version date:** 2013-09-13

**Source accessed:** 2026-09-17

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-20

**Verification note:** Relevant source passage inspected by machine. Primary for what this document states; no independent replication or human review. Existing source access dates are retained; this evidence check has its own date.

**Human decision:**

**Notes:**

---

### 40 · `good-authorship-1965`

**Increment membership:** Unchanged context

**Statement:** I. J. Good authored Speculations Concerning the First Ultraintelligent Machine.

**Relation:** I. J. Good \[ij-good\] → authored (authored) → Speculations Concerning the First Ultraintelligent Machine \[good-1965\]

**Relation semantics:** Authorship as credited in the document. Does not imply sole authorship.

**Temporal scope:** 1965 · event; kind: event

**Temporal qualification:** The date identifies this documented announcement or publication; it does not establish a continuing state.

**Qualification / scope limits:** The scanned text is a reprint. The original publication year is supported by the institutional repository’s volume and copyright metadata; the mirror filename is not used as a date.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-17

**Evidence coverage:** Supporting evidence: primary + secondary · 2 sources

#### Evidence 1 · `evidence-good-authorship-1965`

**Source title:** Speculations Concerning the First Ultraintelligent Machine

**Source ID:** source-good

**Publisher / authors:** Academic Press / I. J. Good

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** The paper names I. J. Good as its author.

**Locator:** Scanned reprint, page 1, author byline

**Canonical source:** [Speculations Concerning the First Ultraintelligent Machine](https://gwern.net/doc/ai/1966-good.pdf)

**Evidence URL:** Same as canonical source.

**Source publication date:** 1965

**Source / version description:** Scanned reprint, Advances in Computers volume 6, pp. 31–88. Repository metadata identifies ©1965; the mirror filename says 1966.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-17

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-17

**Verification note:** Source passage inspected by an automated research assistant. Human editorial review is pending.

#### Evidence 2 · `evidence-good-catalogue`

**Source title:** Repository record: Speculations Concerning the First Ultraintelligent Machine

**Source ID:** source-good-catalogue

**Publisher / authors:** Virginia Tech / Virginia Tech

**Source role relative to this claim:** secondary

**Evidence role:** supports

**Paraphrase (not a quotation):** The repository attributes the paper to Good and identifies a reprint from volume 6 with a 1965 copyright. Its issued date of 2005 applies to the repository technical report.

**Locator:** dc.contributor.author and dc.description.notes; distinguish dc.date.issued

**Canonical source:** [Repository record: Speculations Concerning the First Ultraintelligent Machine](https://vtechworks.lib.vt.edu/items/5085379d-b24c-424e-8861-e70a47b4b2fb/full)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2005-03-05

**Source / version description:** Metadata for technical report 05-3, issued 2005 and accessioned 2019. The notes identify the original as a 1965 reprint.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-17

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-17

**Verification note:** Catalogue metadata corroborates identity and date; it does not independently establish the technical propositions. Human review pending.

**Human decision:**

**Notes:**

---

### 41 · `good-discusses-explosion-1965`

**Increment membership:** Unchanged context

**Statement:** Good’s paper discusses an intelligence explosion arising from machines designing better machines.

**Relation:** Speculations Concerning the First Ultraintelligent Machine \[good-1965\] → discusses (discusses) → Intelligence explosion \[intelligence-explosion\]

**Relation semantics:** The concept is explicitly discussed in the document. This makes no earliest-use, invention or transmission claim.

**Temporal scope:** 1965 · event; kind: event

**Temporal qualification:** The date identifies this documented announcement or publication; it does not establish a continuing state.

**Qualification / scope limits:** A historical formulation, not a claim of earliest use, inevitability, or transmission to a particular lab.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-17

**Evidence coverage:** Supporting evidence: primary · 1 source

#### Evidence 1 · `evidence-good-discusses-explosion-1965`

**Source title:** Speculations Concerning the First Ultraintelligent Machine

**Source ID:** source-good

**Publisher / authors:** Academic Press / I. J. Good

**Source role relative to this claim:** primary

**Evidence role:** supports

**Exact source excerpt:** an ultraintelligent machine could design even better machines

**Locator:** Section 2, printed page 33 (scan page 3)

**Canonical source:** [Speculations Concerning the First Ultraintelligent Machine](https://gwern.net/doc/ai/1966-good.pdf)

**Evidence URL:** Same as canonical source.

**Source publication date:** 1965

**Source / version description:** Scanned reprint, Advances in Computers volume 6, pp. 31–88. Repository metadata identifies ©1965; the mirror filename says 1966.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-17

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-17

**Verification note:** Source passage inspected by an automated research assistant. Human editorial review is pending.

**Human decision:**

**Notes:**

---

### 42 · `iem-cites-good-2013`

**Increment membership:** Unchanged context

**Statement:** Intelligence Explosion Microeconomics explicitly cites and discusses Good’s 1965 paper.

**Relation:** Intelligence Explosion Microeconomics \[iem-2013\] → cites (cites) → Speculations Concerning the First Ultraintelligent Machine \[good-1965\]

**Relation semantics:** An explicit reference to a work. Citation alone is neither agreement nor causal influence.

**Temporal scope:** 2013 · event; kind: event

**Temporal qualification:** The date identifies this documented announcement or publication; it does not establish a continuing state.

**Qualification / scope limits:** This is a document-level citation and engagement claim, not an aggregate transmission claim about institutions.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-17

**Evidence coverage:** Supporting evidence: primary · 1 source

#### Evidence 1 · `evidence-iem-cites-good-2013`

**Source title:** Intelligence Explosion Microeconomics

**Source ID:** source-iem

**Publisher / authors:** Machine Intelligence Research Institute / Eliezer Yudkowsky

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** The report identifies Good’s 1965 paper by title and quotes its machine-design argument.

**Locator:** Printed page 1 (PDF page 4), section 1, opening paragraph

**Canonical source:** [Intelligence Explosion Microeconomics](https://intelligence.org/files/IEM.pdf)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2013

**Source / version description:** Technical report 2013-1; last modified September 13, 2013

**Version date:** 2013-09-13

**Source accessed:** 2026-09-17

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-17

**Verification note:** Source passage inspected by an automated research assistant. Human editorial review is pending.

**Human decision:**

**Notes:**

---

### 43 · `iem-discusses-explosion-2013`

**Increment membership:** Unchanged context

**Statement:** Intelligence Explosion Microeconomics examines Good’s intelligence-explosion thesis through cognitive reinvestment.

**Relation:** Intelligence Explosion Microeconomics \[iem-2013\] → discusses (discusses) → Intelligence explosion \[intelligence-explosion\]

**Relation semantics:** The concept is explicitly discussed in the document. This makes no earliest-use, invention or transmission claim.

**Temporal scope:** 2013 · event; kind: event

**Temporal qualification:** The date identifies this documented announcement or publication; it does not establish a continuing state.

**Qualification / scope limits:** This records the report’s stated subject, without endorsing the thesis or a prediction about its timing.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-17

**Evidence coverage:** Supporting evidence: primary · 1 source

#### Evidence 1 · `evidence-iem-discusses-explosion-2013`

**Source title:** Intelligence Explosion Microeconomics

**Source ID:** source-iem

**Publisher / authors:** Machine Intelligence Research Institute / Eliezer Yudkowsky

**Source role relative to this claim:** primary

**Evidence role:** supports

**Exact source excerpt:** I. J. Good’s thesis of the “intelligence explosion”

**Locator:** PDF page 1, abstract

**Canonical source:** [Intelligence Explosion Microeconomics](https://intelligence.org/files/IEM.pdf)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2013

**Source / version description:** Technical report 2013-1; last modified September 13, 2013

**Version date:** 2013-09-13

**Source accessed:** 2026-09-17

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-17

**Verification note:** Source passage inspected by an automated research assistant. Human editorial review is pending.

**Human decision:**

**Notes:**

---

### 44 · `miri-iem-2013`

**Increment membership:** Unchanged context

**Statement:** MIRI published Intelligence Explosion Microeconomics as technical report 2013-1.

**Relation:** Machine Intelligence Research Institute \[miri\] → published (published) → Intelligence Explosion Microeconomics \[iem-2013\]

**Relation semantics:** Publication of a specific document or version. Publication of a policy is not evidence of implementation.

**Temporal scope:** 2013 · event; kind: event

**Temporal qualification:** The date identifies this documented announcement or publication; it does not establish a continuing state.

**Qualification / scope limits:** The inspected file is marked last modified September 13, 2013. Only the publication year is used for this event.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-17

**Evidence coverage:** Supporting evidence: primary · 1 source

#### Evidence 1 · `evidence-miri-iem-2013`

**Source title:** Intelligence Explosion Microeconomics

**Source ID:** source-iem

**Publisher / authors:** Machine Intelligence Research Institute / Eliezer Yudkowsky

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** The title page identifies the report as 2013-1 and its publisher as the Machine Intelligence Research Institute.

**Locator:** PDF page 1, bibliographic line

**Canonical source:** [Intelligence Explosion Microeconomics](https://intelligence.org/files/IEM.pdf)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2013

**Source / version description:** Technical report 2013-1; last modified September 13, 2013

**Version date:** 2013-09-13

**Source accessed:** 2026-09-17

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-17

**Verification note:** Source passage inspected by an automated research assistant. Human editorial review is pending.

**Human decision:**

**Notes:**

---

<!-- intellectual-lineage-machine-qa-20260925 -->

## Machine QA record — supplied 2026-09-21, recorded 2026-09-25

The two supplied audits apply to this 44-claim Intellectual Lineage I pack, including its five unchanged context claims. The dataset-derived body above is preserved unchanged. All 44 Human decision and Notes fields remain empty. Application claims, source records, evidence checks and verification states are unchanged.

### Attribution and verification limits

- **Audit A — Claude:** user-attributed model; no pseudonymous auditor ID supplied. Reports **43 YES, 1 EDIT, 0 RESEARCH MORE, 0 REJECT**. All 44 numbered verdicts map to the canonical review order. Its references to prior verification remain auditor statements, not new source checks by this recording pass.
- **Audit B — Grok:** user-attributed model; no pseudonymous auditor ID supplied for this batch. Reports **44 YES, 0 EDIT, 0 RESEARCH MORE, 0 REJECT**. Entries 01–07 and 35–44 have matching canonical IDs and individual notes; **08–34 are one grouped approval**, with no individual explanations. Do not inherit the prior people audit's pseudonym. The claimed exact-source inspection is retained as self-reported methodology, not independently authenticated.
- **Codex recording pass:** checks numbering, canonical IDs, counts, preservation of supplied wording, unchanged application data and blank human fields. It does not independently verify sources, resolve the disagreement, apply the proposed correction or promote any claim/evidence to human-reviewed status.

### Open objection and scope discrepancies

**08 — lineage-kingma-adam:** Claude requests that the claim reflect the printed name “Diederik P. Kingma” rather than saying the paper names “Durk Kingma”. Grok's YES for this entry is part of its 08–34 group and does not address that wording objection individually. The proposed byline correction and alias suggestion remain recorded proposals, not applied changes. The disagreement concerns the exact statement, not an asserted discovery of two different people. A separate authorised source-verification/correction task can resolve it while retaining the stable claim ID if the proposition is unchanged.

**Grok 08–34 scope:** the grouped heading describes PPO/Adam/Attention and arXiv v1 PDFs, but entries 31–33 concern the mutable Superalignment webpage and entry 34 concerns Chalmers's author-hosted paper. These are not arXiv v1 evidence. Preserve Grok's reported YES verdicts without treating its grouped source description as claim-specific proof of inspection for those entries. No individual notes have been invented.

Grok's final “Good → Chalmers → IEM” language is retained as supplied chronological shorthand, not graph direction: citation arrows run from the citing document to the cited work, and this dataset also contains IEM's direct citation to Good. “Non-overlapping” is not adopted as a conclusion about intellectual transmission or evidentiary independence. Citation and reported-use edges remain separate scoped propositions.

There is one differing verdict and no supplied RESEARCH MORE verdicts in this batch. That does not resolve the byline objection or the grouped-description gap. Machine agreement on other entries is not human source review, editorial acceptance or proof that every exact source expression was independently checked twice.

### Per-entry verdict index

“YES (grouped)” maps Grok's explicit 08–34 approval range; it is not a new individual assessment. These columns are machine verdicts, not Human decision fields.

| Review | Canonical claim ID                      | Claude | Grok          |
| ------ | --------------------------------------- | ------ | ------------- |
| 01     | `lineage-scaling-cites-batch`           | YES    | YES           |
| 02     | `lineage-scaling-uses-batch`            | YES    | YES           |
| 03     | `lineage-scaling-cites-attention`       | YES    | YES           |
| 04     | `lineage-scaling-uses-attention`        | YES    | YES           |
| 05     | `lineage-chinchilla-cites-scaling`      | YES    | YES           |
| 06     | `lineage-kaplan-authored-scaling`       | YES    | YES           |
| 07     | `lineage-mccandlish-authored-batch`     | YES    | YES           |
| 08     | `lineage-kingma-adam`                   | EDIT   | YES (grouped) |
| 09     | `lineage-ba-adam`                       | YES    | YES (grouped) |
| 10     | `lineage-schulman-trpo`                 | YES    | YES (grouped) |
| 11     | `lineage-schulman-ppo`                  | YES    | YES (grouped) |
| 12     | `lineage-ppo-cites-trpo`                | YES    | YES (grouped) |
| 13     | `lineage-ppo-cites-adam`                | YES    | YES (grouped) |
| 14     | `lineage-ppo-uses-adam`                 | YES    | YES (grouped) |
| 15     | `lineage-attention-cites-adam`          | YES    | YES (grouped) |
| 16     | `lineage-attention-uses-adam`           | YES    | YES (grouped) |
| 17     | `lineage-jan-leike-preferences`         | YES    | YES (grouped) |
| 18     | `lineage-dario-amodei-preferences`      | YES    | YES (grouped) |
| 19     | `lineage-shane-legg-preferences`        | YES    | YES (grouped) |
| 20     | `lineage-preferences-cites-trpo`        | YES    | YES (grouped) |
| 21     | `lineage-preferences-uses-trpo`         | YES    | YES (grouped) |
| 22     | `lineage-summaries-cites-preferences`   | YES    | YES (grouped) |
| 23     | `lineage-summaries-cites-ppo`           | YES    | YES (grouped) |
| 24     | `lineage-summaries-uses-ppo`            | YES    | YES (grouped) |
| 25     | `lineage-instruct-cites-summaries`      | YES    | YES (grouped) |
| 26     | `lineage-instruct-uses-summaries`       | YES    | YES (grouped) |
| 27     | `lineage-instruct-cites-ppo`            | YES    | YES (grouped) |
| 28     | `lineage-instruct-uses-ppo`             | YES    | YES (grouped) |
| 29     | `lineage-instruct-cites-preferences`    | YES    | YES (grouped) |
| 30     | `lineage-instruct-discusses-rlhf`       | YES    | YES (grouped) |
| 31     | `lineage-superalignment-discusses-rlhf` | YES    | YES (grouped) |
| 32     | `lineage-jan-leike-superalignment`      | YES    | YES (grouped) |
| 33     | `lineage-ilya-sutskever-superalignment` | YES    | YES (grouped) |
| 34     | `lineage-chalmers-authorship`           | YES    | YES (grouped) |
| 35     | `lineage-chalmers-cites-good`           | YES    | YES           |
| 36     | `lineage-chalmers-credits-good`         | YES    | YES           |
| 37     | `lineage-chalmers-discusses-explosion`  | YES    | YES           |
| 38     | `lineage-iem-cites-chalmers`            | YES    | YES           |
| 39     | `lineage-iem-credits-good`              | YES    | YES           |
| 40     | `good-authorship-1965`                  | YES    | YES           |
| 41     | `good-discusses-explosion-1965`         | YES    | YES           |
| 42     | `iem-cites-good-2013`                   | YES    | YES           |
| 43     | `iem-discusses-explosion-2013`          | YES    | YES           |
| 44     | `miri-iem-2013`                         | YES    | YES           |

### Audit A — supplied Claude text

User-attributed Claude; no auditor pseudonym supplied. Wording retained; transport line-break markup normalised for Markdown.

**01** YES · Scaling Laws §5.1 attribution to [MKAT18] is correct; McCandlish et al. 2018 is arXiv:1812.06162.
**02** YES · Critical-batch-size use in equations 5.4–5.5 of Scaling Laws v1 is well-documented.
**03** YES · [VSP+17] = Vaswani et al. 2017; cited in §2 for Transformer architecture. Standard.
**04** YES · §2 of Scaling Laws v1 describes primarily decoder-only Transformers. Correct.
**05** YES · Chinchilla (arXiv:2203.15556v1) explicitly cites Kaplan et al. (2020) and argues for a different model-size/token allocation. Confirmed.
**06** YES · Kaplan is first author on arXiv:2001.08361v1.
**07** YES · McCandlish is first author on arXiv:1812.06162v1.
**08** EDIT · The Adam paper (arXiv:1412.6980v1) credits **Diederik P. Kingma**, not "Durk Kingma." The entity identifier uses Durk as a nickname but the claim says the paper "names Durk Kingma," which is not the byline text. Update claim statement to read "names Diederik P. Kingma (Durk Kingma) as a co-author" or adjust the entity name alias to ensure the claim accurately reflects the printed author block.
**09** YES · Jimmy Ba confirmed as co-author on arXiv:1412.6980v1.
**10** YES · Schulman first author on TRPO (arXiv:1502.05477v1, submitted 2015-02-19). Confirmed.
**11** YES · Schulman first author on PPO (arXiv:1707.06347v1, submitted 2017-07-20). Confirmed.
**12** YES · PPO §§1–2.2 cites TRPO [Sch+15b] while describing limitations it addresses.
**13** YES · Adam [KB14] listed in PPO references, PDF p. 9.
**14** YES · Appendix A (Tables 3–5) of PPO v1 specifies Adam learning rates for MuJoCo, Roboschool and Atari. Confirmed.
**15** YES · Attention §5.3 cites Adam with the warmup schedule (Reference [18]).
**16** YES · §5.3 of Attention explicitly names Adam as the optimizer used for training.
**17** YES · Leike confirmed in author list of arXiv:1706.03741v1 (Christiano; Leike; Brown; Martic; Legg; Amodei).
**18** YES · Amodei confirmed in author list of arXiv:1706.03741v1.
**19** YES · Legg confirmed in author list of arXiv:1706.03741v1.
**20** YES · §2.2.1 of Human Preferences cites Schulman et al. (2015) for policy optimization.
**21** YES · §2.2.1 uses TRPO for simulated robotics, with A2C for Atari. Scope correctly noted.
**22** YES · Reference [10] in arXiv:2009.01325v1 is Christiano et al. 2017. Confirmed.
**23** YES · §3.1 step 3 of arXiv:2009.01325v1 cites PPO [53].
**24** YES · §3.1 step 3 explicitly states the policy is optimized with PPO. Confirmed.
**25** YES · InstructGPT (arXiv:2203.02155v1) cites Stiennon et al. (2020) in §2 and §3.5. Confirmed.
**26** YES · §3.5 explicitly states RL fine-tuning follows Stiennon et al. (2020). Confirmed.
**27** YES · §3.5 cites Schulman et al. (2017) = PPO. Confirmed.
**28** YES · §3.5 names PPO as the fine-tuning algorithm. Confirmed.
**29** YES · §2 of InstructGPT references Christiano et al. (2017) in the related-work account.
**30** YES · InstructGPT frames its approach as an application of RLHF throughout §2.
**31** YES · The Superalignment announcement's problem statement explicitly argues human supervision will not scale to superintelligence. The mutable-page caveat in the qualification is appropriate and correct.
**32** YES · Leike and Sutskever are the two credited authors on the Superalignment announcement.
**33** YES · Sutskever confirmed as co-author.
**34** YES · Chalmers is the sole credited author; footnote 1 identifies the 2010 JCS publication.
**35** YES · Chalmers's introduction cites Good (1965) and the references list it.
**36** YES · The introduction explicitly attributes the argument to Good before quoting him.
**37** YES · The intelligence explosion from iterative machine design is the central subject of §1.
**38** YES · IEM §1 refers readers to Chalmers (2010). Confirmed in prior batches.
**39** YES · IEM §1 identifies Good as the author of the quoted intelligence-explosion argument. Confirmed.
**40** YES · Unchanged context; previously verified.
**41** YES · Unchanged context; previously verified.
**42** YES · Unchanged context; previously verified.
**43** YES · Unchanged context; previously verified.
**44** YES · Unchanged context; previously verified.

---

### SUMMARY

- **YES: 43**
- **EDIT: 1** — 08 (paper byline says "Diederik P. Kingma" not "Durk Kingma"; update claim statement)
- **RESEARCH MORE: 0**
- **REJECT: 0**

### HIGH-PRIORITY ISSUE

**Claim 08 / entity identity:** The Adam paper byline is "Diederik P. Kingma; Jimmy Ba." The entity `durk-kingma` uses Durk as an identifier, which is correct as a nickname, but the claim statement says the paper _names_ him as "Durk Kingma." This creates a factual inaccuracy in the claim text. Fix the statement to reflect the actual byline ("Diederik P. Kingma") and add "Durk" to the aliases list if not already present.

### SYSTEMATIC NOTE

All arXiv v1 submission dates in this batch are verified as correct. The scoping discipline (v1 date ≠ method invention date, citing text does not identify a particular revision of the target) is applied consistently and correctly throughout. The mutable-page caveat on claims 31–33 (Superalignment) is appropriate.

### Audit B — supplied Grok text

User-attributed Grok; no auditor pseudonym supplied for this batch. Wording and grouped scope retained; transport line-break markup normalised for Markdown.

Verified against the exact cited primary sources (arXiv v1 PDFs for Scaling Laws 2001.08361v1, Large-Batch 1812.06162v1, Compute-Optimal 2203.15556v1; MIRI IEM PDF; Chalmers author-hosted PDF; Good scanned reprint + repository metadata). Citation locators, author lists, method-use language, and discussion passages match the claims. No reliance on Selekoa text or prior model output as evidence.

**01 · lineage-scaling-cites-batch — YES**
Scaling Laws v1 §5.1 and references cite [MKAT18] (An Empirical Model of Large-Batch Training). Explicit work-level citation.

**02 · lineage-scaling-uses-batch — YES**
Same paper reports using the critical-batch-size model to adjust training steps and compute (equations 5.4–5.5). Author-reported method use correctly scoped.

**03 · lineage-scaling-cites-attention — YES**
Methods section and references cite [VSP+17] (Attention Is All You Need) for Transformer models.

**04 · lineage-scaling-uses-attention — YES**
Authors state they train primarily decoder-only Transformer models. Scoped architecture use, not full encoder-decoder reproduction.

**05 · lineage-chinchilla-cites-scaling — YES**
Compute-Optimal (Chinchilla) v1 cites Kaplan et al. (2020) while reporting different compute-allocation findings. Explicit citation; disagreement does not invalidate the cite edge.

**06 · lineage-kaplan-authored-scaling — YES**
Jared Kaplan appears in the author block of Scaling Laws v1.

**07 · lineage-mccandlish-authored-batch — YES**
Sam McCandlish appears in the author block of An Empirical Model of Large-Batch Training v1.

**08–34** (PPO / Adam / Attention method and citation claims)
All checked against the respective arXiv v1 PDFs. Explicit cites and reported uses of TRPO, Adam, and related methods match the locators and wording. Authorship and method-use edges correctly scoped; no over-claim of sole origin or institutional adoption.

**35 · lineage-chalmers-cites-good — YES**
Chalmers 2010 explicitly cites Good’s paper in the introduction and references.

**36 · lineage-chalmers-credits-good — YES**
Chalmers attributes the opening intelligence-explosion argument to I. J. Good.

**37 · lineage-chalmers-discusses-explosion — YES**
The paper discusses iterative machine design producing greater intelligence (intelligence explosion concept).

**38 · lineage-iem-cites-chalmers — YES**
IEM cites Chalmers (2010).

**39 · lineage-iem-credits-good — YES**
IEM attributes the quoted intelligence-explosion argument to Good.

**40 · good-authorship-1965 — YES**
Scanned reprint byline and repository metadata confirm I. J. Good as author of the 1965 paper (Advances in Computers vol. 6).

**41 · good-discusses-explosion-1965 — YES**
Exact passage: “an ultraintelligent machine could design even better machines.” Historical formulation correctly scoped.

**42 · iem-cites-good-2013 — YES**
IEM explicitly cites and quotes Good 1965 by title.

**43 · iem-discusses-explosion-2013 — YES**
IEM examines Good’s intelligence-explosion thesis through cognitive reinvestment.

**44 · miri-iem-2013 — YES**
Title page identifies the report as MIRI technical report 2013-1.

## SUMMARY

- YES: 44
- EDIT: 0
- RESEARCH MORE: 0
- REJECT: 0

## HIGH-PRIORITY ISSUES

None. All citation, authorship, method-use, explicit-credit and discussion edges are supported by the exact primary passages and version-scoped locators.

## SYSTEMATIC ISSUES

None material.

- Work-level citation vs method-use distinctions are preserved.
- arXiv v1 first-submission dates are used consistently; later revisions are not substituted.
- Explicit credit / discussion claims do not inflate into transmission, priority or institutional adoption.
- Secondary repository metadata for Good 1965 is correctly treated as corroborative of identity/date only.

## POTENTIAL DUPLICATION / DOUBLE COUNTING

- Citation + uses_method_from pairs (e.g., Scaling Laws → Large-Batch; Scaling Laws → Attention) are distinct predicates and correctly non-redundant.
- Authorship claims are one-to-many and do not double-count papers.
- Good → Chalmers → IEM citation chain is sequential and non-overlapping.
