# Selekoa — Evaluation Ontology I — exploratory seeds

4 claims, grouped by type. These are research seeds; machine checks are not human review. This document is an editorial working aid and is never loaded by the application.

Schema: 2.5. Dataset date: 2026-09-28. Dataset fingerprint: `619b263a49617d5d573d9dda9da8263210204bbcca71b5d516404d11ce67a3c1`.

Claim wording, qualifications and passages below come from the validated dataset. Quotes and paraphrases are labelled separately. Source roles are relative to each claim. A primary source is not a truth rank, and multiple sources do not guarantee independence.

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

## Evaluation engagements and institutional announcements

### 01 · `eval-ontology-i-arc-openai`

**Statement:** OpenAI reports ARC’s preliminary evaluation engagement on early GPT-4 versions for autonomous replication and resource acquisition risks.

**Relation:** Alignment Research Center \[alignment-research-center\] → evaluation\_engagement (documented evaluation engagement with) → OpenAI \[openai\]

**Relation semantics:** An evaluator’s explicitly documented, system-specific engagement with a developer. Proposed, announced and reported performed work are distinct activity stages. Reported performance does not independently verify execution, effectiveness or certification.

**Temporal scope:** Date unknown; kind: unknown

**Temporal qualification:** The inspected passage does not date the engagement. Model release and source access dates are not evaluation dates.

**Qualification / scope limits:** Developer-reported performance, not independent verification of execution, findings, effectiveness or certification. The source names Alignment Research Center (ARC); ARC Evals and METR are not substituted. Final-model experiments and ARC fine-tuning are described as further work needed.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-28

**Evidence coverage:** Supporting evidence: primary · 1 source

**Structured attributes:**

```json
{
  "activityStage": "reported_performed",
  "evaluatedSystem": "Early GPT-4 versions supplied to ARC; not the final deployed GPT-4 model",
  "activityScope": "Preliminary autonomous replication and resource acquisition evaluation without ARC fine-tuning access"
}
```

#### Evidence 1 · `evidence-eval-ontology-i-arc-openai`

**Source title:** GPT-4 System Card

**Source ID:** source-eval-ontology-i-gpt4-card

**Publisher / authors:** OpenAI / OpenAI

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** OpenAI says ARC tested early GPT-4 versions for autonomous replication and resource acquisition, without fine-tuning access or the final deployed model.

**Locator:** Section 2.9, printed pp55–56 (PDF pages 15–16), early-access paragraph, footnote 20 and concluding paragraph

**Canonical source:** [GPT-4 System Card](https://cdn.openai.com/papers/gpt-4-system-card.pdf)

**Evidence URL:** Same as canonical source.

**Source publication date:** Unknown; not inferred from access date

**Source / version description:** 60-page PDF expression reinspected 2026-09-28; printed pagination starts at 41. Publication/revision date unknown.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-28

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-28

**Verification note:** Developer account supporting only the described engagement; the source does not establish evaluation dates or independent replication.

**Human decision:**

**Notes:**

---

### 02 · `eval-ontology-i-arc-anthropic`

**Statement:** Anthropic reports an evaluation engagement with ARC, including work with its engineers to fine-tune a Claude snapshot for what Anthropic calls safety audits.

**Relation:** Alignment Research Center \[alignment-research-center\] → evaluation\_engagement (documented evaluation engagement with) → Anthropic \[anthropic\]

**Relation semantics:** An evaluator’s explicitly documented, system-specific engagement with a developer. Proposed, announced and reported performed work are distinct activity stages. Reported performance does not independently verify execution, effectiveness or certification.

**Temporal scope:** 2022 → End unknown; kind: interval

**Temporal qualification:** The source says since fall 2022; the year is the available schema precision, not January 1. The end is unknown; continuing work is described at report time only.

**Qualification / scope limits:** Anthropic’s account of work performed, not independent verification or certification. The evaluated snapshot is not identified as deployed Claude 2. Source actor is ARC, not silently ARC Evals or METR. Exact start date and completion are unknown; this does not assert a current engagement.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-28

**Evidence coverage:** Supporting evidence: primary · 1 source

**Structured attributes:**

```json
{
  "activityStage": "reported_performed",
  "evaluatedSystem": "A snapshot of Claude fine-tuned with Anthropic engineers; exact snapshot unspecified",
  "activityScope": "Evaluation work aimed at detecting dangerous autonomous replication capabilities"
}
```

#### Evidence 1 · `evidence-eval-ontology-i-arc-anthropic`

**Source title:** Model Card and Evaluations for Claude Models

**Source ID:** source-eval-ontology-i-claude2-card

**Publisher / authors:** Anthropic / Anthropic

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** Anthropic reports work with ARC since fall 2022 supporting its safety audits, including engineers fine-tuning a Claude snapshot for the evaluations.

**Locator:** Printed/PDF p2, Evaluations and Red Teaming, paragraph beginning We have been working

**Canonical source:** [Model Card and Evaluations for Claude Models](https://www-cdn.anthropic.com/bd2a28d2535bfb0494cc8e2a3bf135d2e7523226/Model-Card-Claude-2.pdf)

**Evidence URL:** Same as canonical source.

**Source publication date:** Unknown; not inferred from access date

**Source / version description:** 14-page content-addressed Claude 2 card reinspected 2026-09-28; separate publication date unknown.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-28

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-28

**Verification note:** Developer account. The snapshot remains unspecified; the release month elsewhere in the card does not date this work.

**Human decision:**

**Notes:**

---

### 03 · `eval-ontology-i-arc-evals-separation`

**Statement:** The article dated September 19, 2023 announces ARC Evals’ separation from ARC into a standalone evaluation organisation.

**Relation:** ARC Evals \[arc-evals\] → separation\_announced (announced separation from) → Alignment Research Center \[alignment-research-center\]

**Relation semantics:** A unit or organisation announced separation from its parent institution. Direction is separating unit to parent, not to an inferred successor. This does not establish completed incorporation, staff transfer, ownership transfer or legal succession.

**Temporal scope:** 2023-09-19 · announcement; kind: event

**Temporal qualification:** Displayed article date, not incorporation or completed separation. The inspected expression includes retrospective edits with unknown dates.

**Qualification / scope limits:** Announcement only. No completed legal incorporation, staff transfer, ownership transfer or legal succession established. The source had not yet settled a new name in its announcement framing. Its current text includes a later Christiano/AISI note; the original September expression was not authenticated.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-28

**Evidence coverage:** Supporting evidence: primary · 1 source

**Structured attributes:**

```json
{
  "activityStage": "announced",
  "transitionScope": "separation_announcement"
}
```

#### Evidence 1 · `evidence-eval-ontology-i-arc-evals-separation`

**Source title:** ARC Evals is spinning out from ARC

**Source ID:** source-eval-ontology-i-spinout

**Publisher / authors:** METR / Beth Barnes

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** The page describes formalising the separation of ARC Evals from ARC’s alignment research and a new standalone organisation whose name was undecided.

**Locator:** Title, displayed date and opening three body paragraphs; retrospective Christiano note immediately following

**Canonical source:** [ARC Evals is spinning out from ARC](https://evals.alignment.org/blog/2023-09-19-spin-out-announcement/)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2023-09-19

**Source / version description:** Current expression reinspected 2026-09-28. Displayed article date retained; retrospective Christiano/AISI note references a later appointment. Revision date unknown; no authenticated 2023 snapshot inspected.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-28

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-28

**Verification note:** Current institutional announcement supports its stated separation, with unknown revision dates. No formation records or archived expression inspected.

**Human decision:**

**Notes:**

---

### 04 · `eval-ontology-i-arc-evals-metr-name`

**Statement:** The article dated December 4, 2023 announces ARC Evals’ adoption of the name METR, Model Evaluation & Threat Research.

**Relation:** ARC Evals \[arc-evals\] → name\_transition\_announced (announced new name as) → Model Evaluation & Threat Research \[metr\]

**Relation semantics:** An explicit historical naming announcement links the earlier named institutional referent to the newly named referent. Dataset identities remain distinct. This is not acquisition, merger, ownership transfer or independently established legal succession.

**Temporal scope:** 2023-12-04 · announcement; kind: event

**Temporal qualification:** Displayed naming-announcement date; the current expression has retrospective edits of unknown date. Not a legal formation or staff-transfer date.

**Qualification / scope limits:** Historical name announcement only; ARC, ARC Evals and METR retain separate IDs. Not acquisition, merger, ownership transfer or independently established legal succession. Staff transfer is conditional on entity formation. The current page contains later Christiano/AISI wording; original December text has not been authenticated.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-28

**Evidence coverage:** Supporting evidence: primary · 1 source

**Structured attributes:**

```json
{
  "activityStage": "announced",
  "transitionScope": "name_announcement"
}
```

#### Evidence 1 · `evidence-eval-ontology-i-arc-evals-metr-name`

**Source title:** ARC Evals is now METR

**Source ID:** source-eval-ontology-i-metr-name

**Publisher / authors:** METR / METR

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** ARC Evals announces adoption of METR as its name; the next paragraph makes staff transfer conditional on formation of the new entity.

**Locator:** Title, displayed date and opening three body paragraphs, especially new-name paragraph and conditional staff-transfer sentence

**Canonical source:** [ARC Evals is now METR](https://metr.org/blog/2023-12-04-metr-announcement/)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2023-12-04

**Source / version description:** Current expression reinspected 2026-09-28. Displayed article date retained; retrospective Christiano/AISI note references a later appointment. Revision date unknown; no authenticated 2023 snapshot inspected.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-28

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-28

**Verification note:** Current institutional account of naming, not proof of completed formation. The later Christiano wording prevents treating all current text as an untouched December 2023 snapshot.

**Human decision:**

**Notes:**

---
