# Selekoa — capital and compute review

37 claims, grouped by type. These are research seeds; machine checks are not human review. This document is an editorial working aid and is never loaded by the application.

Schema: 2.3. Dataset date: 2026-09-19. Dataset fingerprint: `bdb60ded89302c48118117d552e6ab9958995432c04ad45fb98174b1f6057291`.

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

## OpenAI / Microsoft / Stargate — capital, cloud terms and infrastructure

### 01 · `microsoft-investment-2019`

**Statement:** Microsoft announced a $1 billion investment in OpenAI.

**Relation:** Microsoft \[microsoft\] → investment\_announced (announced investment in) → OpenAI \[openai\]

**Relation semantics:** A counterparty announced an investment. Amount and transaction stage are qualified separately.

**Temporal scope:** 2019-07-22 · announcement; kind: event

**Temporal qualification:** Announcement date; the transaction stage is separately recorded.

**Qualification / scope limits:** Announcement amount; cash disbursement, instrument and ownership share are not established.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-19

**Evidence coverage:** Supporting evidence: primary · 1 source

**Transaction type:** investment

**Transaction stage:** announced

**Relationship context:** external

**Amount / bound / currency / scope:** exact · 1000000000 · USD · transaction

**Quantity / bound / unit:** Not specified

**Structured attributes:**

```json
{
  "transactionType": "investment",
  "relationshipContext": "external",
  "transactionStage": "announced",
  "amount": {
    "value": 1000000000,
    "currency": "USD",
    "bound": "exact",
    "scope": "transaction"
  }
}
```

#### Evidence 1 · `evidence-microsoft-investment-2019`

**Source title:** OpenAI forms exclusive computing partnership with Microsoft to build new Azure AI supercomputing technologies

**Source ID:** source-ms-openai-2019

**Publisher / authors:** Microsoft / Microsoft

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** The release identifies a $1 billion Microsoft investment.

**Locator:** Subtitle above the dated release

**Canonical source:** [OpenAI forms exclusive computing partnership with Microsoft to build new Azure AI supercomputing technologies](https://news.microsoft.com/source/2019/07/22/openai-forms-exclusive-computing-partnership-with-microsoft-to-build-new-azure-ai-supercomputing-technologies/)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2019-07-22

**Source / version description:** Dated announcement inspected 2026-09-19; a historical company statement, not independent verification of implementation.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-19

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-19

**Verification note:** Exact cited source passage inspected by Codex. Company statements are not independent proof of implementation. Human source review pending.

**Human decision:**

**Notes:**

---

### 02 · `openai-azure-2019`

**Statement:** OpenAI announced it would move its services to Microsoft Azure.

**Relation:** OpenAI \[openai\] → selected\_cloud\_provider (selected cloud provider) → Microsoft \[microsoft\]

**Relation semantics:** A dated announcement describing cloud provision. Direction runs from customer to provider; this does not assert payment or continuing exclusivity.

**Temporal scope:** 2019-07-22 · announcement; kind: event

**Temporal qualification:** Announcement date; the transaction stage is separately recorded.

**Qualification / scope limits:** Azure is represented through Microsoft. A migration announcement does not establish completed migration or present exclusivity.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-19

**Evidence coverage:** Supporting evidence: primary · 1 source

**Transaction type:** cloud\_services

**Transaction stage:** announced

**Relationship context:** external

**Amount / bound / currency / scope:** Not specified

**Quantity / bound / unit:** Not specified

**Structured attributes:**

```json
{
  "transactionType": "cloud_services",
  "relationshipContext": "external",
  "transactionStage": "announced"
}
```

#### Evidence 1 · `evidence-openai-azure-2019`

**Source title:** OpenAI forms exclusive computing partnership with Microsoft to build new Azure AI supercomputing technologies

**Source ID:** source-ms-openai-2019

**Publisher / authors:** Microsoft / Microsoft

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** OpenAI would port its services to Azure.

**Locator:** Partnership bullets, second bullet

**Canonical source:** [OpenAI forms exclusive computing partnership with Microsoft to build new Azure AI supercomputing technologies](https://news.microsoft.com/source/2019/07/22/openai-forms-exclusive-computing-partnership-with-microsoft-to-build-new-azure-ai-supercomputing-technologies/)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2019-07-22

**Source / version description:** Dated announcement inspected 2026-09-19; a historical company statement, not independent verification of implementation.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-19

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-19

**Verification note:** Exact cited source passage inspected by Codex. Company statements are not independent proof of implementation. Human source review pending.

**Human decision:**

**Notes:**

---

### 03 · `openai-azure-rofr-jan-2025`

**Statement:** Microsoft reported that OpenAI’s new-capacity arrangement gave Microsoft a right of first refusal.

**Relation:** OpenAI \[openai\] → cloud\_terms (reported cloud terms with) → Microsoft \[microsoft\]

**Relation semantics:** A dated cloud agreement provision, including scoped exclusivity or capacity rights. Does not assert current continuity or payment.

**Temporal scope:** 2025-01-21 · announcement; kind: event

**Temporal qualification:** Announcement date; the transaction stage is separately recorded.

**Qualification / scope limits:** Applies to new capacity; distinguish this provision from API hosting exclusivity. No present continuity inferred.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-19

**Evidence coverage:** Supporting evidence: primary · 1 source

**Transaction type:** cloud\_services

**Transaction stage:** contracted

**Relationship context:** external

**Amount / bound / currency / scope:** Not specified

**Quantity / bound / unit:** Not specified

**Structured attributes:**

```json
{
  "transactionType": "cloud_services",
  "relationshipContext": "external",
  "transactionStage": "contracted"
}
```

#### Evidence 1 · `evidence-openai-azure-rofr-jan-2025`

**Source title:** Microsoft and OpenAI evolve partnership to drive the next phase of AI

**Source ID:** source-ms-openai-jan-2025

**Publisher / authors:** Microsoft / Microsoft

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** New-capacity exclusivity changed to a right of first refusal.

**Locator:** Final substantive paragraph, new capacity exclusivity

**Canonical source:** [Microsoft and OpenAI evolve partnership to drive the next phase of AI](https://blogs.microsoft.com/blog/2025/01/21/microsoft-and-openai-evolve-partnership-to-drive-the-next-phase-of-ai/)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2025-01-21

**Source / version description:** Dated announcement inspected 2026-09-19; a historical company statement, not independent verification of implementation.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-19

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-19

**Verification note:** Exact cited source passage inspected by Codex. Company statements are not independent proof of implementation. Human source review pending.

**Human decision:**

**Notes:**

---

### 04 · `openai-azure-api-jan-2025`

**Statement:** Microsoft reported that the OpenAI API remained exclusive to Azure.

**Relation:** OpenAI \[openai\] → cloud\_terms (reported cloud terms with) → Microsoft \[microsoft\]

**Relation semantics:** A dated cloud agreement provision, including scoped exclusivity or capacity rights. Does not assert current continuity or payment.

**Temporal scope:** 2025-01-21 · announcement; kind: event

**Temporal qualification:** Announcement date; the transaction stage is separately recorded.

**Qualification / scope limits:** Scope is API hosting under the reported arrangement, not every training workload or future date.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-19

**Evidence coverage:** Supporting evidence: primary · 1 source

**Transaction type:** cloud\_services

**Transaction stage:** contracted

**Relationship context:** external

**Amount / bound / currency / scope:** Not specified

**Quantity / bound / unit:** Not specified

**Structured attributes:**

```json
{
  "transactionType": "cloud_services",
  "relationshipContext": "external",
  "transactionStage": "contracted"
}
```

#### Evidence 1 · `evidence-openai-azure-api-jan-2025`

**Source title:** Microsoft and OpenAI evolve partnership to drive the next phase of AI

**Source ID:** source-ms-openai-jan-2025

**Publisher / authors:** Microsoft / Microsoft

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** The API ran on Azure and was exclusive to it.

**Locator:** Second partnership bullet

**Canonical source:** [Microsoft and OpenAI evolve partnership to drive the next phase of AI](https://blogs.microsoft.com/blog/2025/01/21/microsoft-and-openai-evolve-partnership-to-drive-the-next-phase-of-ai/)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2025-01-21

**Source / version description:** Dated announcement inspected 2026-09-19; a historical company statement, not independent verification of implementation.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-19

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-19

**Verification note:** Exact cited source passage inspected by Codex. Company statements are not independent proof of implementation. Human source review pending.

**Human decision:**

**Notes:**

---

### 05 · `openai-azure-contract-oct-2025`

**Statement:** Microsoft reported OpenAI had contracted to purchase an additional $250 billion of Azure services.

**Relation:** OpenAI \[openai\] → compute\_capacity (arranged compute capacity with) → Microsoft \[microsoft\]

**Relation semantics:** A customer-side capacity plan, commitment or contract with the named provider. Stage distinguishes intentions from agreements and delivery; no ownership is implied.

**Temporal scope:** 2025-10-28 · announcement; kind: event

**Temporal qualification:** Announcement date; the transaction stage is separately recorded.

**Qualification / scope limits:** Contract value, not payment, delivered capacity or Microsoft equity investment. No duration is supplied for this purchase in the cited bullet.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-19

**Evidence coverage:** Supporting evidence: primary · 1 source

**Transaction type:** cloud\_services

**Transaction stage:** contracted

**Relationship context:** external

**Amount / bound / currency / scope:** exact · 250000000000 · USD · transaction

**Quantity / bound / unit:** Not specified

**Structured attributes:**

```json
{
  "transactionType": "cloud_services",
  "relationshipContext": "external",
  "transactionStage": "contracted",
  "amount": {
    "value": 250000000000,
    "currency": "USD",
    "bound": "exact",
    "scope": "transaction"
  }
}
```

#### Evidence 1 · `evidence-openai-azure-contract-oct-2025`

**Source title:** The next chapter of the Microsoft–OpenAI partnership

**Source ID:** source-ms-openai-oct-2025

**Publisher / authors:** Microsoft / Microsoft

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** OpenAI contracted for an incremental $250 billion in Azure services.

**Locator:** What has evolved, Azure services / right-of-first-refusal bullet

**Canonical source:** [The next chapter of the Microsoft–OpenAI partnership](https://blogs.microsoft.com/blog/2025/10/28/the-next-chapter-of-the-microsoft-openai-partnership/)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2025-10-28

**Source / version description:** Dated announcement inspected 2026-09-19; a historical company statement, not independent verification of implementation.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-19

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-19

**Verification note:** Exact cited source passage inspected by Codex. Company statements are not independent proof of implementation. Human source review pending.

**Human decision:**

**Notes:**

---

### 06 · `openai-azure-rofr-oct-2025`

**Statement:** Microsoft reported removal of its right of first refusal as OpenAI’s compute provider.

**Relation:** OpenAI \[openai\] → cloud\_terms (reported cloud terms with) → Microsoft \[microsoft\]

**Relation semantics:** A dated cloud agreement provision, including scoped exclusivity or capacity rights. Does not assert current continuity or payment.

**Temporal scope:** 2025-10-28 · announcement; kind: event

**Temporal qualification:** Announcement date; the transaction stage is separately recorded.

**Qualification / scope limits:** This capacity-right change does not abolish the separately described Azure API exclusivity. The January record remains historical.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-19

**Evidence coverage:** Supporting evidence: primary · 1 source

**Transaction type:** cloud\_services

**Transaction stage:** contracted

**Relationship context:** external

**Amount / bound / currency / scope:** Not specified

**Quantity / bound / unit:** Not specified

**Structured attributes:**

```json
{
  "transactionType": "cloud_services",
  "relationshipContext": "external",
  "transactionStage": "contracted"
}
```

#### Evidence 1 · `evidence-openai-azure-rofr-oct-2025`

**Source title:** The next chapter of the Microsoft–OpenAI partnership

**Source ID:** source-ms-openai-oct-2025

**Publisher / authors:** Microsoft / Microsoft

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** The new arrangement removed Microsoft’s compute right of first refusal.

**Locator:** What has evolved, Azure services / right-of-first-refusal bullet

**Canonical source:** [The next chapter of the Microsoft–OpenAI partnership](https://blogs.microsoft.com/blog/2025/10/28/the-next-chapter-of-the-microsoft-openai-partnership/)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2025-10-28

**Source / version description:** Dated announcement inspected 2026-09-19; a historical company statement, not independent verification of implementation.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-19

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-19

**Verification note:** Exact cited source passage inspected by Codex. Company statements are not independent proof of implementation. Human source review pending.

**Human decision:**

**Notes:**

---

### 07 · `stargate-spending-plan-2025`

**Statement:** Stargate was announced with a plan to spend $500 billion on US AI infrastructure over four years.

**Relation:** Stargate Project \[stargate\] → plans\_infrastructure\_spend (planned infrastructure spending of) → 500000000000 USD \[literal; no graph edge\]

**Relation semantics:** An infrastructure spending plan, not a funding round, realised expenditure or direct investment in its customer.

**Temporal scope:** 2025-01-21 · announcement; kind: event

**Temporal qualification:** Announcement date; the transaction stage is separately recorded.

**Qualification / scope limits:** Planned infrastructure spending, not a funding round, secured capital, paid expenditure or direct investment in OpenAI.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-19

**Evidence coverage:** Supporting evidence: primary · 1 source

**Transaction type:** infrastructure\_spend

**Transaction stage:** planned

**Relationship context:** external

**Amount / bound / currency / scope:** exact · 500000000000 · USD · transaction

**Quantity / bound / unit:** Not specified

**Period / expected timing:** Four years from the January 2025 announcement

**Structured attributes:**

```json
{
  "transactionType": "infrastructure_spend",
  "relationshipContext": "external",
  "period": "Four years from the January 2025 announcement",
  "transactionStage": "planned",
  "amount": {
    "value": 500000000000,
    "currency": "USD",
    "bound": "exact",
    "scope": "transaction"
  }
}
```

#### Evidence 1 · `evidence-stargate-spending-plan-2025`

**Source title:** Announcing The Stargate Project

**Source ID:** source-stargate-2025

**Publisher / authors:** OpenAI and SoftBank / OpenAI and SoftBank

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** The new venture intended $500 billion of infrastructure investment over four years.

**Locator:** Opening paragraph

**Canonical source:** [Announcing The Stargate Project](https://openai.com/index/announcing-the-stargate-project/)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2025-01-21

**Source / version description:** Dated announcement inspected 2026-09-19; a historical company statement, not independent verification of implementation.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-19

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-19

**Verification note:** Exact cited source passage inspected by Codex. Company statements are not independent proof of implementation. Human source review pending.

**Human decision:**

**Notes:**

---

### 08 · `softbank-stargate-2025`

**Statement:** SoftBank was named as an initial equity funder of Stargate.

**Relation:** SoftBank Group \[softbank-group\] → investment\_announced (announced investment in) → Stargate Project \[stargate\]

**Relation semantics:** A counterparty announced an investment. Amount and transaction stage are qualified separately.

**Temporal scope:** 2025-01-21 · announcement; kind: event

**Temporal qualification:** Announcement date; the transaction stage is separately recorded.

**Qualification / scope limits:** Named venture funding role; contribution amount, closing and legal vehicle are unspecified. This is not investment in another named participant.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-19

**Evidence coverage:** Supporting evidence: primary · 1 source

**Transaction type:** venture\_equity

**Transaction stage:** announced

**Relationship context:** external

**Amount / bound / currency / scope:** Not specified

**Quantity / bound / unit:** Not specified

**Structured attributes:**

```json
{
  "transactionType": "venture_equity",
  "relationshipContext": "external",
  "transactionStage": "announced"
}
```

#### Evidence 1 · `evidence-softbank-stargate-2025`

**Source title:** Announcing The Stargate Project

**Source ID:** source-stargate-2025

**Publisher / authors:** OpenAI and SoftBank / OpenAI and SoftBank

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** SoftBank appears among the initial equity funders.

**Locator:** Paragraph naming initial equity funders

**Canonical source:** [Announcing The Stargate Project](https://openai.com/index/announcing-the-stargate-project/)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2025-01-21

**Source / version description:** Dated announcement inspected 2026-09-19; a historical company statement, not independent verification of implementation.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-19

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-19

**Verification note:** Exact cited source passage inspected by Codex. Company statements are not independent proof of implementation. Human source review pending.

**Human decision:**

**Notes:**

---

### 09 · `openai-stargate-2025`

**Statement:** OpenAI was named as an initial equity funder of Stargate.

**Relation:** OpenAI \[openai\] → investment\_announced (announced investment in) → Stargate Project \[stargate\]

**Relation semantics:** A counterparty announced an investment. Amount and transaction stage are qualified separately.

**Temporal scope:** 2025-01-21 · announcement; kind: event

**Temporal qualification:** Announcement date; the transaction stage is separately recorded.

**Qualification / scope limits:** Named venture funding role; contribution amount, closing and legal vehicle are unspecified. This is not investment in another named participant.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-19

**Evidence coverage:** Supporting evidence: primary · 1 source

**Transaction type:** venture\_equity

**Transaction stage:** announced

**Relationship context:** external

**Amount / bound / currency / scope:** Not specified

**Quantity / bound / unit:** Not specified

**Structured attributes:**

```json
{
  "transactionType": "venture_equity",
  "relationshipContext": "external",
  "transactionStage": "announced"
}
```

#### Evidence 1 · `evidence-openai-stargate-2025`

**Source title:** Announcing The Stargate Project

**Source ID:** source-stargate-2025

**Publisher / authors:** OpenAI and SoftBank / OpenAI and SoftBank

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** OpenAI appears among the initial equity funders.

**Locator:** Paragraph naming initial equity funders

**Canonical source:** [Announcing The Stargate Project](https://openai.com/index/announcing-the-stargate-project/)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2025-01-21

**Source / version description:** Dated announcement inspected 2026-09-19; a historical company statement, not independent verification of implementation.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-19

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-19

**Verification note:** Exact cited source passage inspected by Codex. Company statements are not independent proof of implementation. Human source review pending.

**Human decision:**

**Notes:**

---

### 10 · `oracle-stargate-2025`

**Statement:** Oracle was named as an initial equity funder of Stargate.

**Relation:** Oracle \[oracle\] → investment\_announced (announced investment in) → Stargate Project \[stargate\]

**Relation semantics:** A counterparty announced an investment. Amount and transaction stage are qualified separately.

**Temporal scope:** 2025-01-21 · announcement; kind: event

**Temporal qualification:** Announcement date; the transaction stage is separately recorded.

**Qualification / scope limits:** Named venture funding role; contribution amount, closing and legal vehicle are unspecified. This is not investment in another named participant.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-19

**Evidence coverage:** Supporting evidence: primary · 1 source

**Transaction type:** venture\_equity

**Transaction stage:** announced

**Relationship context:** external

**Amount / bound / currency / scope:** Not specified

**Quantity / bound / unit:** Not specified

**Structured attributes:**

```json
{
  "transactionType": "venture_equity",
  "relationshipContext": "external",
  "transactionStage": "announced"
}
```

#### Evidence 1 · `evidence-oracle-stargate-2025`

**Source title:** Announcing The Stargate Project

**Source ID:** source-stargate-2025

**Publisher / authors:** OpenAI and SoftBank / OpenAI and SoftBank

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** Oracle appears among the initial equity funders.

**Locator:** Paragraph naming initial equity funders

**Canonical source:** [Announcing The Stargate Project](https://openai.com/index/announcing-the-stargate-project/)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2025-01-21

**Source / version description:** Dated announcement inspected 2026-09-19; a historical company statement, not independent verification of implementation.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-19

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-19

**Verification note:** Exact cited source passage inspected by Codex. Company statements are not independent proof of implementation. Human source review pending.

**Human decision:**

**Notes:**

---

### 11 · `openai-oracle-capacity-2025`

**Statement:** OpenAI announced an agreement with Oracle to develop 4.5 GW of additional US Stargate datacenter capacity.

**Relation:** OpenAI \[openai\] → compute\_capacity (arranged compute capacity with) → Oracle \[oracle\]

**Relation semantics:** A customer-side capacity plan, commitment or contract with the named provider. Stage distinguishes intentions from agreements and delivery; no ownership is implied.

**Temporal scope:** 2025-07-22 · announcement; kind: event

**Temporal qualification:** Announcement date; the transaction stage is separately recorded.

**Qualification / scope limits:** July announcement’s stated development capacity; not installed capacity, electricity consumption or ownership. No expenditure amount inferred.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-19

**Evidence coverage:** Supporting evidence: primary · 1 source

**Transaction type:** compute\_capacity

**Transaction stage:** contracted

**Relationship context:** external

**Amount / bound / currency / scope:** Not specified

**Quantity / bound / unit:** exact · 4.5 · GW of datacenter capacity under development

**Structured attributes:**

```json
{
  "transactionType": "compute_capacity",
  "relationshipContext": "external",
  "transactionStage": "contracted",
  "quantity": {
    "value": 4.5,
    "unit": "GW of datacenter capacity under development",
    "bound": "exact"
  }
}
```

#### Evidence 1 · `evidence-openai-oracle-capacity-2025`

**Source title:** Stargate advances with 4.5 GW partnership with Oracle

**Source ID:** source-oracle-stargate-2025

**Publisher / authors:** OpenAI / OpenAI

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** Oracle and OpenAI agreed to develop 4.5 GW of additional capacity.

**Locator:** Opening paragraph

**Canonical source:** [Stargate advances with 4.5 GW partnership with Oracle](https://openai.com/index/stargate-advances-with-partnership-with-oracle/)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2025-07-22

**Source / version description:** Dated announcement inspected 2026-09-19; a historical company statement, not independent verification of implementation.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-19

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-19

**Verification note:** Exact cited source passage inspected by Codex. Company statements are not independent proof of implementation. Human source review pending.

**Human decision:**

**Notes:**

---

### 12 · `openai-abilene-use-2025`

**Statement:** OpenAI reported early training and inference workloads at the partly operating Stargate I site in Abilene.

**Relation:** OpenAI \[openai\] → uses\_infrastructure (uses infrastructure) → Stargate I, Abilene \[stargate-abilene\]

**Relation semantics:** Use of a named compute asset at the documented date. Does not establish ownership.

**Temporal scope:** 2025-07-22 · snapshot; kind: snapshot

**Temporal qualification:** State reported at this date; no exact start, completion date or current continuity inferred.

**Qualification / scope limits:** Partial operation does not establish that the whole site, or 4.5 GW expansion, was operational. Use is not ownership.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-19

**Evidence coverage:** Supporting evidence: primary · 1 source

**Transaction type:** infrastructure\_use

**Transaction stage:** operational

**Relationship context:** external

**Amount / bound / currency / scope:** Not specified

**Quantity / bound / unit:** Not specified

**Structured attributes:**

```json
{
  "transactionType": "infrastructure_use",
  "relationshipContext": "external",
  "transactionStage": "operational"
}
```

#### Evidence 1 · `evidence-openai-abilene-use-2025`

**Source title:** Stargate advances with 4.5 GW partnership with Oracle

**Source ID:** source-oracle-stargate-2025

**Publisher / authors:** OpenAI / OpenAI

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** Parts of Abilene were running early training and inference workloads.

**Locator:** Paragraph beginning Meanwhile, construction of Stargate I

**Canonical source:** [Stargate advances with 4.5 GW partnership with Oracle](https://openai.com/index/stargate-advances-with-partnership-with-oracle/)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2025-07-22

**Source / version description:** Dated announcement inspected 2026-09-19; a historical company statement, not independent verification of implementation.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-19

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-19

**Verification note:** Exact cited source passage inspected by Codex. Company statements are not independent proof of implementation. Human source review pending.

**Human decision:**

**Notes:**

---

### 13 · `abilene-nvidia-gb200-2025`

**Statement:** OpenAI reported Oracle began delivering NVIDIA GB200 racks to Stargate I in June 2025.

**Relation:** Stargate I, Abilene \[stargate-abilene\] → uses\_hardware\_from (uses hardware from) → NVIDIA \[nvidia\]

**Relation semantics:** Supplier hardware is reported in a compute asset. No purchase price or direct purchasing contract is implied.

**Temporal scope:** 2025-07-22 · snapshot; kind: snapshot

**Temporal qualification:** State reported at this date; no exact start, completion date or current continuity inferred.

**Qualification / scope limits:** Delivery report, not a rack count, direct NVIDIA purchase or ownership claim; use of the supplier relation is scoped to equipment arriving at the asset.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-19

**Evidence coverage:** Supporting evidence: primary · 1 source

**Transaction type:** hardware\_deployment

**Transaction stage:** delivered

**Relationship context:** external

**Amount / bound / currency / scope:** Not specified

**Quantity / bound / unit:** Not specified

**Period / expected timing:** Deliveries began June 2025; snapshot reported July 22

**Structured attributes:**

```json
{
  "transactionType": "hardware_deployment",
  "relationshipContext": "external",
  "period": "Deliveries began June 2025; snapshot reported July 22",
  "transactionStage": "delivered"
}
```

#### Evidence 1 · `evidence-abilene-nvidia-gb200-2025`

**Source title:** Stargate advances with 4.5 GW partnership with Oracle

**Source ID:** source-oracle-stargate-2025

**Publisher / authors:** OpenAI / OpenAI

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** Oracle began deliveries of the first NVIDIA GB200 racks in the previous month.

**Locator:** Stargate I progress paragraph, first rack deliveries

**Canonical source:** [Stargate advances with 4.5 GW partnership with Oracle](https://openai.com/index/stargate-advances-with-partnership-with-oracle/)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2025-07-22

**Source / version description:** Dated announcement inspected 2026-09-19; a historical company statement, not independent verification of implementation.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-19

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-19

**Verification note:** Exact cited source passage inspected by Codex. Company statements are not independent proof of implementation. Human source review pending.

**Human decision:**

**Notes:**

---

## Anthropic / Amazon / AWS — investment stages and compute

### 14 · `amazon-anthropic-initial-2023`

**Statement:** Amazon reported making an initial $1.25 billion investment in Anthropic in September 2023.

**Relation:** Amazon \[amazon\] → invested\_in (invested in) → Anthropic \[anthropic\]

**Relation semantics:** A reported realised investment, scoped to the cited event or snapshot. Instrument and stage are separate; this does not imply control.

**Temporal scope:** 2023-09 · event; kind: event

**Temporal qualification:** Investment month stated retrospectively in March 2024; day and disbursement details not inferred.

**Qualification / scope limits:** Retrospective report of an investment made; not the whole September upper-bound commitment. Instrument and exact day are not specified here.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-19

**Evidence coverage:** Supporting evidence: primary · 1 source

**Transaction type:** investment

**Transaction stage:** invested

**Relationship context:** external

**Amount / bound / currency / scope:** exact · 1250000000 · USD · transaction

**Quantity / bound / unit:** Not specified

**Structured attributes:**

```json
{
  "transactionType": "investment",
  "relationshipContext": "external",
  "transactionStage": "invested",
  "amount": {
    "value": 1250000000,
    "currency": "USD",
    "bound": "exact",
    "scope": "transaction"
  }
}
```

#### Evidence 1 · `evidence-amazon-anthropic-initial-2023`

**Source title:** Amazon and Anthropic deepen their shared commitment to advancing generative AI

**Source ID:** source-amazon-anthropic-mar-2024

**Publisher / authors:** Amazon / Amazon

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** Amazon identified a $1.25 billion investment made the previous September.

**Locator:** Closing investment-update paragraph

**Canonical source:** [Amazon and Anthropic deepen their shared commitment to advancing generative AI](https://www.aboutamazon.com/news/company-news/amazon-anthropic-ai-investment)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2024-03-27

**Source / version description:** Dated announcement inspected 2026-09-19; a historical company statement, not independent verification of implementation.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-19

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-19

**Verification note:** Exact cited source passage inspected by Codex. Company statements are not independent proof of implementation. Human source review pending.

**Human decision:**

**Notes:**

---

### 15 · `amazon-anthropic-tranche-2024`

**Statement:** Amazon reported making a further $2.75 billion investment in Anthropic, completing its initial $4 billion total.

**Relation:** Amazon \[amazon\] → invested\_in (invested in) → Anthropic \[anthropic\]

**Relation semantics:** A reported realised investment, scoped to the cited event or snapshot. Instrument and stage are separate; this does not imply control.

**Temporal scope:** 2024-03-27 · announcement; kind: event

**Temporal qualification:** Announcement date; the transaction stage is separately recorded.

**Qualification / scope limits:** The amount encodes this tranche, not another $4 billion in addition. Realised investment is company-reported; no payment-rail or ownership-percentage inference.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-19

**Evidence coverage:** Supporting evidence: primary · 1 source

**Transaction type:** investment

**Transaction stage:** invested

**Relationship context:** external

**Amount / bound / currency / scope:** exact · 2750000000 · USD · transaction

**Quantity / bound / unit:** Not specified

**Structured attributes:**

```json
{
  "transactionType": "investment",
  "relationshipContext": "external",
  "transactionStage": "invested",
  "amount": {
    "value": 2750000000,
    "currency": "USD",
    "bound": "exact",
    "scope": "transaction"
  }
}
```

#### Evidence 1 · `evidence-amazon-anthropic-tranche-2024`

**Source title:** Amazon and Anthropic deepen their shared commitment to advancing generative AI

**Source ID:** source-amazon-anthropic-mar-2024

**Publisher / authors:** Amazon / Amazon

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** Amazon said the additional $2.75 billion investment was made that day.

**Locator:** Closing investment-update paragraph

**Canonical source:** [Amazon and Anthropic deepen their shared commitment to advancing generative AI](https://www.aboutamazon.com/news/company-news/amazon-anthropic-ai-investment)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2024-03-27

**Source / version description:** Dated announcement inspected 2026-09-19; a historical company statement, not independent verification of implementation.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-19

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-19

**Verification note:** Exact cited source passage inspected by Codex. Company statements are not independent proof of implementation. Human source review pending.

**Human decision:**

**Notes:**

---

### 16 · `amazon-anthropic-new-2024`

**Statement:** Anthropic announced a new $4 billion Amazon investment, which would bring the total to $8 billion.

**Relation:** Amazon \[amazon\] → investment\_announced (announced investment in) → Anthropic \[anthropic\]

**Relation semantics:** A counterparty announced an investment. Amount and transaction stage are qualified separately.

**Temporal scope:** 2024-11-22 · announcement; kind: event

**Temporal qualification:** Announcement date; the transaction stage is separately recorded.

**Qualification / scope limits:** Future cumulative total is not encoded as this transaction’s amount or proof of same-day closing.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-19

**Evidence coverage:** Supporting evidence: primary · 1 source

**Transaction type:** investment

**Transaction stage:** announced

**Relationship context:** external

**Amount / bound / currency / scope:** exact · 4000000000 · USD · transaction

**Quantity / bound / unit:** Not specified

**Structured attributes:**

```json
{
  "transactionType": "investment",
  "relationshipContext": "external",
  "transactionStage": "announced",
  "amount": {
    "value": 4000000000,
    "currency": "USD",
    "bound": "exact",
    "scope": "transaction"
  }
}
```

#### Evidence 1 · `evidence-amazon-anthropic-new-2024`

**Source title:** Powering the next generation of AI development with AWS

**Source ID:** source-anthropic-aws-nov-2024

**Publisher / authors:** Anthropic / Anthropic

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** The expansion included a new $4 billion investment; the total would become $8 billion.

**Locator:** Opening paragraph

**Canonical source:** [Powering the next generation of AI development with AWS](https://www.anthropic.com/news/anthropic-amazon-trainium)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2024-11-22

**Source / version description:** Dated announcement inspected 2026-09-19; a historical company statement, not independent verification of implementation.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-19

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-19

**Verification note:** Exact cited source passage inspected by Codex. Company statements are not independent proof of implementation. Human source review pending.

**Human decision:**

**Notes:**

---

### 17 · `anthropic-aws-primary-training-2024`

**Statement:** Anthropic announced AWS as its primary cloud and training partner.

**Relation:** Anthropic \[anthropic\] → selected\_cloud\_provider (selected cloud provider) → Amazon Web Services \[aws\]

**Relation semantics:** A dated announcement describing cloud provision. Direction runs from customer to provider; this does not assert payment or continuing exclusivity.

**Temporal scope:** 2024-11-22 · announcement; kind: event

**Temporal qualification:** Announcement date; the transaction stage is separately recorded.

**Qualification / scope limits:** Primary does not mean exclusive. This adds training scope to the historical 2023 mission-critical cloud record.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-19

**Evidence coverage:** Supporting evidence: primary · 1 source

**Transaction type:** cloud\_services

**Transaction stage:** announced

**Relationship context:** external

**Amount / bound / currency / scope:** Not specified

**Quantity / bound / unit:** Not specified

**Structured attributes:**

```json
{
  "transactionType": "cloud_services",
  "relationshipContext": "external",
  "transactionStage": "announced"
}
```

#### Evidence 1 · `evidence-anthropic-aws-primary-training-2024`

**Source title:** Powering the next generation of AI development with AWS

**Source ID:** source-anthropic-aws-nov-2024

**Publisher / authors:** Anthropic / Anthropic

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** AWS was designated the primary cloud and training partner.

**Locator:** Opening paragraph

**Canonical source:** [Powering the next generation of AI development with AWS](https://www.anthropic.com/news/anthropic-amazon-trainium)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2024-11-22

**Source / version description:** Dated announcement inspected 2026-09-19; a historical company statement, not independent verification of implementation.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-19

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-19

**Verification note:** Exact cited source passage inspected by Codex. Company statements are not independent proof of implementation. Human source review pending.

**Human decision:**

**Notes:**

---

### 18 · `anthropic-aws-trainium-plan-2024`

**Statement:** Anthropic said it planned to use Trainium platforms to train its most advanced foundation models.

**Relation:** Anthropic \[anthropic\] → compute\_capacity (arranged compute capacity with) → Amazon Web Services \[aws\]

**Relation semantics:** A customer-side capacity plan, commitment or contract with the named provider. Stage distinguishes intentions from agreements and delivery; no ownership is implied.

**Temporal scope:** 2024-11-22 · announcement; kind: event

**Temporal qualification:** Announcement date; the transaction stage is separately recorded.

**Qualification / scope limits:** A hardware-specific training plan, distinct from investment and primary-provider status. No procurement, chip count or completed training run inferred.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-19

**Evidence coverage:** Supporting evidence: primary · 1 source

**Transaction type:** compute\_capacity

**Transaction stage:** planned

**Relationship context:** external

**Amount / bound / currency / scope:** Not specified

**Quantity / bound / unit:** Not specified

**Structured attributes:**

```json
{
  "transactionType": "compute_capacity",
  "relationshipContext": "external",
  "transactionStage": "planned"
}
```

#### Evidence 1 · `evidence-anthropic-aws-trainium-plan-2024`

**Source title:** Powering the next generation of AI development with AWS

**Source ID:** source-anthropic-aws-nov-2024

**Publisher / authors:** Anthropic / Anthropic

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** Anthropic planned to train its most advanced models using the jointly optimized hardware.

**Locator:** Collaboration on AWS Trainium hardware and software, second paragraph

**Canonical source:** [Powering the next generation of AI development with AWS](https://www.anthropic.com/news/anthropic-amazon-trainium)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2024-11-22

**Source / version description:** Dated announcement inspected 2026-09-19; a historical company statement, not independent verification of implementation.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-19

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-19

**Verification note:** Exact cited source passage inspected by Codex. Company statements are not independent proof of implementation. Human source review pending.

**Human decision:**

**Notes:**

---

### 19 · `anthropic-rainier-2025`

**Statement:** Amazon reported launching Project Rainier to build and deploy Anthropic’s Claude models.

**Relation:** Anthropic \[anthropic\] → uses\_infrastructure (uses infrastructure) → Project Rainier \[project-rainier\]

**Relation semantics:** Use of a named compute asset at the documented date. Does not establish ownership.

**Temporal scope:** 2025-10-30 · snapshot; kind: snapshot

**Temporal qualification:** State reported at this date; no exact start, completion date or current continuity inferred.

**Qualification / scope limits:** Company-reported deployed workload infrastructure; not independent performance validation or Anthropic ownership.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-19

**Evidence coverage:** Supporting evidence: primary · 1 source

**Transaction type:** infrastructure\_use

**Transaction stage:** deployed

**Relationship context:** external

**Amount / bound / currency / scope:** Not specified

**Quantity / bound / unit:** Not specified

**Structured attributes:**

```json
{
  "transactionType": "infrastructure_use",
  "relationshipContext": "external",
  "transactionStage": "deployed"
}
```

#### Evidence 1 · `evidence-anthropic-rainier-2025`

**Source title:** Amazon.com announces third quarter results

**Source ID:** source-amazon-q3-2025

**Publisher / authors:** Amazon / Amazon

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** Rainier was launched for Claude model development and deployment.

**Locator:** Highlights since previous earnings announcement, Project Rainier bullet

**Canonical source:** [Amazon.com announces third quarter results](https://www.aboutamazon.com/news/company-news/amazon-earnings-q3-2025-report)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2025-10-30

**Source / version description:** Dated announcement inspected 2026-09-19; a historical company statement, not independent verification of implementation.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-19

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-19

**Verification note:** Exact cited source passage inspected by Codex. Company statements are not independent proof of implementation. Human source review pending.

**Human decision:**

**Notes:**

---

### 20 · `rainier-trainium2-2025`

**Statement:** Amazon described Project Rainier as containing nearly 500,000 Trainium2 chips.

**Relation:** Project Rainier \[project-rainier\] → uses\_hardware\_from (uses hardware from) → Amazon Web Services \[aws\]

**Relation semantics:** Supplier hardware is reported in a compute asset. No purchase price or direct purchasing contract is implied.

**Temporal scope:** 2025-10-30 · snapshot; kind: snapshot

**Temporal qualification:** State reported at this date; no exact start, completion date or current continuity inferred.

**Qualification / scope limits:** Approximate cluster count at this report date; not all Anthropic compute, a purchase quantity or exactly 500,000 installed chips. AWS identifies the hardware platform, not an inferred asset owner.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-19

**Evidence coverage:** Supporting evidence: primary · 1 source

**Transaction type:** hardware\_deployment

**Transaction stage:** deployed

**Relationship context:** external

**Amount / bound / currency / scope:** Not specified

**Quantity / bound / unit:** approximate · 500000 · Trainium2 chips

**Structured attributes:**

```json
{
  "transactionType": "hardware_deployment",
  "relationshipContext": "external",
  "transactionStage": "deployed",
  "quantity": {
    "value": 500000,
    "unit": "Trainium2 chips",
    "bound": "approximate"
  }
}
```

#### Evidence 1 · `evidence-rainier-trainium2-2025`

**Source title:** Amazon.com announces third quarter results

**Source ID:** source-amazon-q3-2025

**Publisher / authors:** Amazon / Amazon

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** The launched cluster contained nearly half a million Trainium2 chips.

**Locator:** Highlights, Project Rainier bullet

**Canonical source:** [Amazon.com announces third quarter results](https://www.aboutamazon.com/news/company-news/amazon-earnings-q3-2025-report)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2025-10-30

**Source / version description:** Dated announcement inspected 2026-09-19; a historical company statement, not independent verification of implementation.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-19

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-19

**Verification note:** Exact cited source passage inspected by Codex. Company statements are not independent proof of implementation. Human source review pending.

**Human decision:**

**Notes:**

---

### 21 · `amazon-anthropic-five-billion-2026`

**Statement:** Amazon announced it would invest another $5 billion in Anthropic that day.

**Relation:** Amazon \[amazon\] → investment\_announced (announced investment in) → Anthropic \[anthropic\]

**Relation semantics:** A counterparty announced an investment. Amount and transaction stage are qualified separately.

**Temporal scope:** 2026-04-20 · announcement; kind: event

**Temporal qualification:** Announcement date; the transaction stage is separately recorded.

**Qualification / scope limits:** The source uses future-tense investment language; same-day intention is not independently established closing or disbursement. Separate from the conditional additional amount.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-19

**Evidence coverage:** Supporting evidence: primary · 1 source

**Transaction type:** investment

**Transaction stage:** announced

**Relationship context:** external

**Amount / bound / currency / scope:** exact · 5000000000 · USD · transaction

**Quantity / bound / unit:** Not specified

**Structured attributes:**

```json
{
  "transactionType": "investment",
  "relationshipContext": "external",
  "transactionStage": "announced",
  "amount": {
    "value": 5000000000,
    "currency": "USD",
    "bound": "exact",
    "scope": "transaction"
  }
}
```

#### Evidence 1 · `evidence-amazon-anthropic-five-billion-2026`

**Source title:** Amazon and Anthropic expand strategic collaboration

**Source ID:** source-amazon-anthropic-apr-2026

**Publisher / authors:** Amazon / Amazon

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** Amazon announced $5 billion to be invested that day.

**Locator:** Paragraph beginning Separately

**Canonical source:** [Amazon and Anthropic expand strategic collaboration](https://www.aboutamazon.com/news/company-news/amazon-invests-additional-5-billion-anthropic-ai)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2026-04-20

**Source / version description:** Dated announcement inspected 2026-09-19; a historical company statement, not independent verification of implementation.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-19

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-19

**Verification note:** Exact cited source passage inspected by Codex. Company statements are not independent proof of implementation. Human source review pending.

**Human decision:**

**Notes:**

---

### 22 · `amazon-anthropic-conditional-2026`

**Statement:** Amazon announced up to a further $20 billion investment in Anthropic, tied to commercial milestones.

**Relation:** Amazon \[amazon\] → investment\_announced (announced investment in) → Anthropic \[anthropic\]

**Relation semantics:** A counterparty announced an investment. Amount and transaction stage are qualified separately.

**Temporal scope:** 2026-04-20 · announcement; kind: event

**Temporal qualification:** Announcement date; the transaction stage is separately recorded.

**Qualification / scope limits:** Conditional future upper bound, not realised investment and not included in the separate $5 billion transaction.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-19

**Evidence coverage:** Supporting evidence: primary · 1 source

**Transaction type:** investment

**Transaction stage:** announced

**Relationship context:** external

**Amount / bound / currency / scope:** up\_to · 20000000000 · USD · transaction

**Quantity / bound / unit:** Not specified

**Conditions:** Certain commercial milestones; details not disclosed in this announcement.

**Structured attributes:**

```json
{
  "transactionType": "investment",
  "relationshipContext": "external",
  "conditions": "Certain commercial milestones; details not disclosed in this announcement.",
  "transactionStage": "announced",
  "amount": {
    "value": 20000000000,
    "currency": "USD",
    "bound": "up_to",
    "scope": "transaction"
  }
}
```

#### Evidence 1 · `evidence-amazon-anthropic-conditional-2026`

**Source title:** Amazon and Anthropic expand strategic collaboration

**Source ID:** source-amazon-anthropic-apr-2026

**Publisher / authors:** Amazon / Amazon

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** Up to another $20 billion was conditional on commercial milestones.

**Locator:** Paragraph beginning Separately

**Canonical source:** [Amazon and Anthropic expand strategic collaboration](https://www.aboutamazon.com/news/company-news/amazon-invests-additional-5-billion-anthropic-ai)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2026-04-20

**Source / version description:** Dated announcement inspected 2026-09-19; a historical company statement, not independent verification of implementation.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-19

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-19

**Verification note:** Exact cited source passage inspected by Codex. Company statements are not independent proof of implementation. Human source review pending.

**Human decision:**

**Notes:**

---

### 23 · `anthropic-aws-commitment-2026`

**Statement:** Amazon reported Anthropic’s commitment to spend over $100 billion on AWS technologies over ten years, securing up to 5 GW of capacity.

**Relation:** Anthropic \[anthropic\] → compute\_capacity (arranged compute capacity with) → Amazon Web Services \[aws\]

**Relation semantics:** A customer-side capacity plan, commitment or contract with the named provider. Stage distinguishes intentions from agreements and delivery; no ownership is implied.

**Temporal scope:** 2026-04-20 · announcement; kind: event

**Temporal qualification:** Announcement date; the transaction stage is separately recorded.

**Qualification / scope limits:** A customer commitment, not investment in AWS, completed expenditure or installed capacity. Strict monetary lower bound and capacity upper bound apply to the same announced arrangement.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-19

**Evidence coverage:** Supporting evidence: primary · 1 source

**Transaction type:** compute\_capacity

**Transaction stage:** committed

**Relationship context:** external

**Amount / bound / currency / scope:** more\_than · 100000000000 · USD · transaction

**Quantity / bound / unit:** up\_to · 5 · GW of Trainium capacity

**Period / expected timing:** Next ten years from April 2026; significant Trainium3 capacity expected in 2026.

**Structured attributes:**

```json
{
  "transactionType": "compute_capacity",
  "relationshipContext": "external",
  "period": "Next ten years from April 2026; significant Trainium3 capacity expected in 2026.",
  "transactionStage": "committed",
  "amount": {
    "value": 100000000000,
    "currency": "USD",
    "bound": "more_than",
    "scope": "transaction"
  },
  "quantity": {
    "value": 5,
    "unit": "GW of Trainium capacity",
    "bound": "up_to"
  }
}
```

#### Evidence 1 · `evidence-anthropic-aws-commitment-2026`

**Source title:** Amazon and Anthropic expand strategic collaboration

**Source ID:** source-amazon-anthropic-apr-2026

**Publisher / authors:** Amazon / Amazon

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** The ten-year commitment exceeded $100 billion and contemplated up to 5 GW.

**Locator:** Expansion paragraphs on spending commitment and capacity

**Canonical source:** [Amazon and Anthropic expand strategic collaboration](https://www.aboutamazon.com/news/company-news/amazon-invests-additional-5-billion-anthropic-ai)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2026-04-20

**Source / version description:** Dated announcement inspected 2026-09-19; a historical company statement, not independent verification of implementation.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-19

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-19

**Verification note:** Exact cited source passage inspected by Codex. Company statements are not independent proof of implementation. Human source review pending.

**Human decision:**

**Notes:**

---

## Anthropic / Google — capital, nonexclusive cloud and TPU capacity

### 24 · `anthropic-google-cloud-2023`

**Statement:** Anthropic announced its selection of Google Cloud for training, scaling and deploying its AI systems.

**Relation:** Anthropic \[anthropic\] → selected\_cloud\_provider (selected cloud provider) → Google \[google\]

**Relation semantics:** A dated announcement describing cloud provision. Direction runs from customer to provider; this does not assert payment or continuing exclusivity.

**Temporal scope:** 2023-02-03 · announcement; kind: event

**Temporal qualification:** Announcement date; the transaction stage is separately recorded.

**Qualification / scope limits:** Google Cloud is represented through Google. The announcement does not establish exclusivity or payment.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-19

**Evidence coverage:** Supporting evidence: primary · 1 source

**Transaction type:** cloud\_services

**Transaction stage:** announced

**Relationship context:** external

**Amount / bound / currency / scope:** Not specified

**Quantity / bound / unit:** Not specified

**Structured attributes:**

```json
{
  "transactionType": "cloud_services",
  "relationshipContext": "external",
  "transactionStage": "announced"
}
```

#### Evidence 1 · `evidence-anthropic-google-cloud-2023`

**Source title:** Anthropic partners with Google Cloud

**Source ID:** source-anthropic-google-2023

**Publisher / authors:** Anthropic / Anthropic

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** Anthropic selected Google Cloud and planned GPU and TPU cluster use.

**Locator:** Opening paragraph

**Canonical source:** [Anthropic partners with Google Cloud](https://www.anthropic.com/news/anthropic-partners-with-google-cloud)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2023-02-03

**Source / version description:** Dated announcement inspected 2026-09-19; a historical company statement, not independent verification of implementation.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-19

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-19

**Verification note:** Exact cited source passage inspected by Codex. Company statements are not independent proof of implementation. Human source review pending.

**Human decision:**

**Notes:**

---

### 25 · `google-anthropic-equity-2024`

**Statement:** The CMA reported that Google held non-voting Anthropic shares as of August 2024.

**Relation:** Google \[google\] → invested\_in (invested in) → Anthropic \[anthropic\]

**Relation semantics:** A reported realised investment, scoped to the cited event or snapshot. Instrument and stage are separate; this does not imply control.

**Temporal scope:** 2024-08 · snapshot; kind: snapshot

**Temporal qualification:** August 2024 holding snapshot; decision issued November 19 and full text published December 24.

**Qualification / scope limits:** Amount and percentage are redacted. The decision uses Google as shorthand for Alphabet’s group; a specific subscribing legal entity, voting control and later holdings are not inferred.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-19

**Evidence coverage:** Supporting evidence: primary · 1 source

**Transaction type:** equity\_investment

**Transaction stage:** invested

**Relationship context:** external

**Amount / bound / currency / scope:** Not specified

**Quantity / bound / unit:** Not specified

**Structured attributes:**

```json
{
  "transactionType": "equity_investment",
  "relationshipContext": "external",
  "transactionStage": "invested"
}
```

#### Evidence 1 · `evidence-google-anthropic-equity-2024`

**Source title:** Alphabet Inc.’s partnership with Anthropic PBC — Decision on relevant merger situation

**Source ID:** source-cma-google-anthropic-2024

**Publisher / authors:** Competition and Markets Authority / Competition and Markets Authority

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** The CMA records acquired non-voting shares and an August 2024 holding.

**Locator:** Printed page 5, paragraph 16(a); page 1, paragraph 1 for group naming

**Canonical source:** [Alphabet Inc.’s partnership with Anthropic PBC — Decision on relevant merger situation](https://www.gov.uk/cma-cases/alphabet-inc-google-llc-slash-anthropic-merger-inquiry)

**Evidence URL:** [Inspected version](https://assets.publishing.service.gov.uk/media/676959bae6ff7c8a1fde9d33/Full_text_decision__.pdf)

**Source publication date:** 2024-12-24

**Source / version description:** ME/7108/24, decision issued 19 November 2024; public redacted full text published 24 December 2024. Amounts and equity percentages are redacted.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-19

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-19

**Verification note:** Exact cited source passage inspected by Codex. Company statements are not independent proof of implementation. Human source review pending.

**Human decision:**

**Notes:**

---

### 26 · `google-anthropic-convertible-debt-2024`

**Statement:** The CMA described Google extending convertible debt financing to Anthropic through a series of notes.

**Relation:** Google \[google\] → extended\_credit\_to (extended credit to) → Anthropic \[anthropic\]

**Relation semantics:** Debt financing extended to the borrower. Convertible notes are not automatically equity; conversion and disbursement remain separately qualified.

**Temporal scope:** 2024-11-19 · snapshot; kind: snapshot

**Temporal qualification:** Arrangement described in the November 19 decision; no exact loan closing or disbursement date inferred.

**Qualification / scope limits:** Amounts and transaction dates are redacted. Conversion to non-voting shares was conditional, not established. Google denotes the group-level counterparty, not a resolved legal investment vehicle.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-19

**Evidence coverage:** Supporting evidence: primary · 1 source

**Transaction type:** convertible\_debt

**Transaction stage:** completed

**Relationship context:** external

**Amount / bound / currency / scope:** Not specified

**Quantity / bound / unit:** Not specified

**Structured attributes:**

```json
{
  "transactionType": "convertible_debt",
  "relationshipContext": "external",
  "transactionStage": "completed"
}
```

#### Evidence 1 · `evidence-google-anthropic-convertible-debt-2024`

**Source title:** Alphabet Inc.’s partnership with Anthropic PBC — Decision on relevant merger situation

**Source ID:** source-cma-google-anthropic-2024

**Publisher / authors:** Competition and Markets Authority / Competition and Markets Authority

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** Google had extended notes conditionally convertible into non-voting shares.

**Locator:** Printed page 5, paragraph 16(b)

**Canonical source:** [Alphabet Inc.’s partnership with Anthropic PBC — Decision on relevant merger situation](https://www.gov.uk/cma-cases/alphabet-inc-google-llc-slash-anthropic-merger-inquiry)

**Evidence URL:** [Inspected version](https://assets.publishing.service.gov.uk/media/676959bae6ff7c8a1fde9d33/Full_text_decision__.pdf)

**Source publication date:** 2024-12-24

**Source / version description:** ME/7108/24, decision issued 19 November 2024; public redacted full text published 24 December 2024. Amounts and equity percentages are redacted.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-19

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-19

**Verification note:** Exact cited source passage inspected by Codex. Company statements are not independent proof of implementation. Human source review pending.

**Human decision:**

**Notes:**

---

### 27 · `anthropic-google-nonexclusive-2024`

**Statement:** The CMA described a nonexclusive agreement for Google to supply compute capacity to Anthropic.

**Relation:** Anthropic \[anthropic\] → cloud\_terms (reported cloud terms with) → Google \[google\]

**Relation semantics:** A dated cloud agreement provision, including scoped exclusivity or capacity rights. Does not assert current continuity or payment.

**Temporal scope:** 2024-11-19 · snapshot; kind: snapshot

**Temporal qualification:** Terms described at the decision date; exact signing date is not supplied.

**Qualification / scope limits:** Public monetary commitments and duration are redacted. This is compute provision, separate from model distribution on Vertex AI and capital financing.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-19

**Evidence coverage:** Supporting evidence: primary · 1 source

**Transaction type:** cloud\_services

**Transaction stage:** contracted

**Relationship context:** external

**Amount / bound / currency / scope:** Not specified

**Quantity / bound / unit:** Not specified

**Structured attributes:**

```json
{
  "transactionType": "cloud_services",
  "relationshipContext": "external",
  "transactionStage": "contracted"
}
```

#### Evidence 1 · `evidence-anthropic-google-nonexclusive-2024`

**Source title:** Alphabet Inc.’s partnership with Anthropic PBC — Decision on relevant merger situation

**Source ID:** source-cma-google-anthropic-2024

**Publisher / authors:** Competition and Markets Authority / Competition and Markets Authority

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** The compute-supply arrangement was explicitly nonexclusive.

**Locator:** Printed page 5, paragraph 16(c)

**Canonical source:** [Alphabet Inc.’s partnership with Anthropic PBC — Decision on relevant merger situation](https://www.gov.uk/cma-cases/alphabet-inc-google-llc-slash-anthropic-merger-inquiry)

**Evidence URL:** [Inspected version](https://assets.publishing.service.gov.uk/media/676959bae6ff7c8a1fde9d33/Full_text_decision__.pdf)

**Source publication date:** 2024-12-24

**Source / version description:** ME/7108/24, decision issued 19 November 2024; public redacted full text published 24 December 2024. Amounts and equity percentages are redacted.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-19

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-19

**Verification note:** Exact cited source passage inspected by Codex. Company statements are not independent proof of implementation. Human source review pending.

**Human decision:**

**Notes:**

---

### 28 · `anthropic-google-tpu-plan-2025`

**Statement:** Anthropic announced plans to expand Google Cloud use by up to one million TPUs, with capacity expected online in 2026.

**Relation:** Anthropic \[anthropic\] → compute\_capacity (arranged compute capacity with) → Google \[google\]

**Relation semantics:** A customer-side capacity plan, commitment or contract with the named provider. Stage distinguishes intentions from agreements and delivery; no ownership is implied.

**Temporal scope:** 2025-10-23 · announcement; kind: event

**Temporal qualification:** Announcement date; the transaction stage is separately recorded.

**Qualification / scope limits:** Upper-bound plan, not a deployed chip count. The source’s tens of billions of dollars and well over one gigawatt remain qualitative; no exact spend or capacity is invented.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-19

**Evidence coverage:** Supporting evidence: primary · 1 source

**Transaction type:** compute\_capacity

**Transaction stage:** planned

**Relationship context:** external

**Amount / bound / currency / scope:** Not specified

**Quantity / bound / unit:** up\_to · 1000000 · TPUs

**Period / expected timing:** Capacity expected to come online in 2026.

**Structured attributes:**

```json
{
  "transactionType": "compute_capacity",
  "relationshipContext": "external",
  "period": "Capacity expected to come online in 2026.",
  "transactionStage": "planned",
  "quantity": {
    "value": 1000000,
    "unit": "TPUs",
    "bound": "up_to"
  }
}
```

#### Evidence 1 · `evidence-anthropic-google-tpu-plan-2025`

**Source title:** Expanding our use of Google Cloud TPUs and Services

**Source ID:** source-anthropic-google-tpu-2025

**Publisher / authors:** Anthropic / Anthropic

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** The planned expansion included up to one million TPUs and expected 2026 capacity.

**Locator:** Opening paragraph

**Canonical source:** [Expanding our use of Google Cloud TPUs and Services](https://www.anthropic.com/news/expanding-our-use-of-google-cloud-tpus-and-services)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2025-10-23

**Source / version description:** Dated announcement inspected 2026-09-19; a historical company statement, not independent verification of implementation.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-19

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-19

**Verification note:** Exact cited source passage inspected by Codex. Company statements are not independent proof of implementation. Human source review pending.

**Human decision:**

**Notes:**

---

### 29 · `anthropic-google-capacity-2026`

**Statement:** Anthropic named Google as a counterparty to a signed agreement for multiple gigawatts of next-generation TPU capacity.

**Relation:** Anthropic \[anthropic\] → compute\_capacity (arranged compute capacity with) → Google \[google\]

**Relation semantics:** A customer-side capacity plan, commitment or contract with the named provider. Stage distinguishes intentions from agreements and delivery; no ownership is implied.

**Temporal scope:** 2026-04-06 · announcement; kind: event

**Temporal qualification:** Announcement date; the transaction stage is separately recorded.

**Qualification / scope limits:** One joint agreement with Google and Broadcom, represented by two counterparty edges; do not add their capacities. Responsibility split, exact quantity, spend and ownership are not disclosed.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-19

**Evidence coverage:** Supporting evidence: primary · 1 source

**Transaction type:** compute\_capacity

**Transaction stage:** contracted

**Relationship context:** external

**Amount / bound / currency / scope:** Not specified

**Quantity / bound / unit:** Not specified

**Period / expected timing:** Capacity expected online starting in 2027.

**Conditions:** Joint Google–Broadcom agreement; each edge records a named counterparty, not a separate capacity allocation.

**Structured attributes:**

```json
{
  "transactionType": "compute_capacity",
  "relationshipContext": "external",
  "period": "Capacity expected online starting in 2027.",
  "conditions": "Joint Google–Broadcom agreement; each edge records a named counterparty, not a separate capacity allocation.",
  "transactionStage": "contracted"
}
```

#### Evidence 1 · `evidence-anthropic-google-capacity-2026`

**Source title:** Anthropic expands partnership with Google and Broadcom for multiple gigawatts of next-generation compute

**Source ID:** source-anthropic-google-broadcom-2026

**Publisher / authors:** Anthropic / Anthropic

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** Anthropic signed a Google–Broadcom TPU-capacity agreement.

**Locator:** Opening paragraph

**Canonical source:** [Anthropic expands partnership with Google and Broadcom for multiple gigawatts of next-generation compute](https://www.anthropic.com/news/google-broadcom-partnership-compute)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2026-04-06

**Source / version description:** Dated announcement inspected 2026-09-19; a historical company statement, not independent verification of implementation.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-19

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-19

**Verification note:** Exact cited source passage inspected by Codex. Company statements are not independent proof of implementation. Human source review pending.

**Human decision:**

**Notes:**

---

### 30 · `anthropic-broadcom-capacity-2026`

**Statement:** Anthropic named Broadcom as a counterparty to a signed agreement for multiple gigawatts of next-generation TPU capacity.

**Relation:** Anthropic \[anthropic\] → compute\_capacity (arranged compute capacity with) → Broadcom \[broadcom\]

**Relation semantics:** A customer-side capacity plan, commitment or contract with the named provider. Stage distinguishes intentions from agreements and delivery; no ownership is implied.

**Temporal scope:** 2026-04-06 · announcement; kind: event

**Temporal qualification:** Announcement date; the transaction stage is separately recorded.

**Qualification / scope limits:** One joint agreement with Google and Broadcom, represented by two counterparty edges; do not add their capacities. Responsibility split, exact quantity, spend and ownership are not disclosed.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-19

**Evidence coverage:** Supporting evidence: primary · 1 source

**Transaction type:** compute\_capacity

**Transaction stage:** contracted

**Relationship context:** external

**Amount / bound / currency / scope:** Not specified

**Quantity / bound / unit:** Not specified

**Period / expected timing:** Capacity expected online starting in 2027.

**Conditions:** Joint Google–Broadcom agreement; each edge records a named counterparty, not a separate capacity allocation.

**Structured attributes:**

```json
{
  "transactionType": "compute_capacity",
  "relationshipContext": "external",
  "period": "Capacity expected online starting in 2027.",
  "conditions": "Joint Google–Broadcom agreement; each edge records a named counterparty, not a separate capacity allocation.",
  "transactionStage": "contracted"
}
```

#### Evidence 1 · `evidence-anthropic-broadcom-capacity-2026`

**Source title:** Anthropic expands partnership with Google and Broadcom for multiple gigawatts of next-generation compute

**Source ID:** source-anthropic-google-broadcom-2026

**Publisher / authors:** Anthropic / Anthropic

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** Anthropic signed a Google–Broadcom TPU-capacity agreement.

**Locator:** Opening paragraph

**Canonical source:** [Anthropic expands partnership with Google and Broadcom for multiple gigawatts of next-generation compute](https://www.anthropic.com/news/google-broadcom-partnership-compute)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2026-04-06

**Source / version description:** Dated announcement inspected 2026-09-19; a historical company statement, not independent verification of implementation.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-19

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-19

**Verification note:** Exact cited source passage inspected by Codex. Company statements are not independent proof of implementation. Human source review pending.

**Human decision:**

**Notes:**

---

## xAI / NVIDIA / Colossus — financing, plans and workload snapshots

### 31 · `xai-series-c-total-2024`

**Statement:** xAI reported closing a $6 billion Series C funding round.

**Relation:** xAI \[xai\] → announced\_funding (announced funding of) → 6000000000 USD \[literal; no graph edge\]

**Relation semantics:** The reported total of a financing round, not a valuation or any one investor’s contribution.

**Temporal scope:** 2024-12-23 · announcement; kind: event

**Temporal qualification:** Announcement date; the transaction stage is separately recorded.

**Qualification / scope limits:** Total for Series C, not a valuation or any investor’s contribution. Distinct from the existing May 2024 Series B total. Actual closing day is not separately provided.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-19

**Evidence coverage:** Supporting evidence: primary · 1 source

**Transaction type:** funding\_round

**Transaction stage:** closed

**Relationship context:** external

**Amount / bound / currency / scope:** exact · 6000000000 · USD · round\_total

**Quantity / bound / unit:** Not specified

**Structured attributes:**

```json
{
  "transactionType": "funding_round",
  "relationshipContext": "external",
  "transactionStage": "closed",
  "amount": {
    "value": 6000000000,
    "currency": "USD",
    "bound": "exact",
    "scope": "round_total"
  }
}
```

#### Evidence 1 · `evidence-xai-series-c-total-2024`

**Source title:** xAI raises $6B Series C

**Source ID:** source-xai-series-c-2024

**Publisher / authors:** xAI / xAI

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** The Series C round was described as closed at $6 billion.

**Locator:** First paragraph after xAI’s progress is accelerating rapidly

**Canonical source:** [xAI raises $6B Series C](https://x.ai/news/series-c)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2024-12-23

**Source / version description:** Dated xAI announcement retained on a site now branded SpaceXAI; the historical issuer is recorded as xAI, without inferring legal continuity.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-19

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-19

**Verification note:** Exact cited source passage inspected by Codex. Company statements are not independent proof of implementation. Human source review pending.

**Human decision:**

**Notes:**

---

### 32 · `nvidia-xai-series-c-2024`

**Statement:** xAI named NVIDIA as a participant in its closed Series C round.

**Relation:** NVIDIA \[nvidia\] → participated\_in\_round (participated in funding for) → xAI \[xai\]

**Relation semantics:** Named participation in a financing round. The full round total is not attributed to this investor.

**Temporal scope:** 2024-12-23 · announcement; kind: event

**Temporal qualification:** Announcement date; the transaction stage is separately recorded.

**Qualification / scope limits:** NVIDIA’s contribution amount and ownership share are not disclosed. Participation does not establish financing of particular hardware.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-19

**Evidence coverage:** Supporting evidence: primary · 1 source

**Transaction type:** equity\_investment

**Transaction stage:** closed

**Relationship context:** external

**Amount / bound / currency / scope:** Not specified

**Quantity / bound / unit:** Not specified

**Structured attributes:**

```json
{
  "transactionType": "equity_investment",
  "relationshipContext": "external",
  "transactionStage": "closed"
}
```

#### Evidence 1 · `evidence-nvidia-xai-series-c-2024`

**Source title:** xAI raises $6B Series C

**Source ID:** source-xai-series-c-2024

**Publisher / authors:** xAI / xAI

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** NVIDIA was identified as a strategic investor participating in the round.

**Locator:** Series C closing paragraph, final sentence

**Canonical source:** [xAI raises $6B Series C](https://x.ai/news/series-c)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2024-12-23

**Source / version description:** Dated xAI announcement retained on a site now branded SpaceXAI; the historical issuer is recorded as xAI, without inferring legal continuity.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-19

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-19

**Verification note:** Exact cited source passage inspected by Codex. Company statements are not independent proof of implementation. Human source review pending.

**Human decision:**

**Notes:**

---

### 33 · `xai-colossus-expansion-plan-2024`

**Statement:** xAI said Colossus would soon expand to a combined 200,000 NVIDIA Hopper GPUs.

**Relation:** xAI \[xai\] → plans\_capacity (planned capacity for) → Colossus \[colossus\]

**Relation semantics:** Planned capacity of an identified compute asset. No deployment, operation, procurement or ownership is established.

**Temporal scope:** 2024-12-23 · announcement; kind: event

**Temporal qualification:** Announcement date; the transaction stage is separately recorded.

**Qualification / scope limits:** Future total, not 200,000 additional GPUs or an operational count at this date. Supplier is identified in the quantity, not an inferred purchase contract.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-19

**Evidence coverage:** Supporting evidence: primary · 1 source

**Transaction type:** compute\_capacity

**Transaction stage:** planned

**Relationship context:** external

**Amount / bound / currency / scope:** Not specified

**Quantity / bound / unit:** exact · 200000 · NVIDIA Hopper GPUs (combined total)

**Period / expected timing:** Soon; no specific completion date disclosed.

**Structured attributes:**

```json
{
  "transactionType": "compute_capacity",
  "relationshipContext": "external",
  "period": "Soon; no specific completion date disclosed.",
  "transactionStage": "planned",
  "quantity": {
    "value": 200000,
    "unit": "NVIDIA Hopper GPUs (combined total)",
    "bound": "exact"
  }
}
```

#### Evidence 1 · `evidence-xai-colossus-expansion-plan-2024`

**Source title:** xAI raises $6B Series C

**Source ID:** source-xai-series-c-2024

**Publisher / authors:** xAI / xAI

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** xAI planned to double Colossus to 200,000 Hopper GPUs.

**Locator:** Colossus bullet, sentence beginning Soon

**Canonical source:** [xAI raises $6B Series C](https://x.ai/news/series-c)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2024-12-23

**Source / version description:** Dated xAI announcement retained on a site now branded SpaceXAI; the historical issuer is recorded as xAI, without inferring legal continuity.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-19

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-19

**Verification note:** Exact cited source passage inspected by Codex. Company statements are not independent proof of implementation. Human source review pending.

**Human decision:**

**Notes:**

---

### 34 · `xai-colossus-grok4-2025`

**Statement:** xAI reported using its 200,000-GPU Colossus cluster for Grok 4 reinforcement-learning training.

**Relation:** xAI \[xai\] → uses\_infrastructure (uses infrastructure) → Colossus \[colossus\]

**Relation semantics:** Use of a named compute asset at the documented date. Does not establish ownership.

**Temporal scope:** 2025-07-09 · snapshot; kind: snapshot

**Temporal qualification:** State reported at this date; no exact start, completion date or current continuity inferred.

**Qualification / scope limits:** Company-reported use and cluster size; no independent performance, ownership or precise GPU-generation split inferred. Not a claim that training began on the publication date.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-19

**Evidence coverage:** Supporting evidence: primary · 1 source

**Transaction type:** infrastructure\_use

**Transaction stage:** operational

**Relationship context:** external

**Amount / bound / currency / scope:** Not specified

**Quantity / bound / unit:** exact · 200000 · GPUs in Colossus

**Structured attributes:**

```json
{
  "transactionType": "infrastructure_use",
  "relationshipContext": "external",
  "transactionStage": "operational",
  "quantity": {
    "value": 200000,
    "unit": "GPUs in Colossus",
    "bound": "exact"
  }
}
```

#### Evidence 1 · `evidence-xai-colossus-grok4-2025`

**Source title:** Grok 4

**Source ID:** source-xai-grok4-2025

**Publisher / authors:** xAI / xAI

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** Grok 4 reinforcement learning used the 200,000-GPU Colossus cluster.

**Locator:** Scaling Up Reinforcement Learning, second paragraph

**Canonical source:** [Grok 4](https://x.ai/news/grok-4)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2025-07-09

**Source / version description:** Dated xAI launch announcement; current site branding is SpaceXAI. Only the historical Colossus training passage is used.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-19

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-19

**Verification note:** Exact cited source passage inspected by Codex. Company statements are not independent proof of implementation. Human source review pending.

**Human decision:**

**Notes:**

---

## Google DeepMind — internal Google compute

### 35 · `deepmind-gemini-internal-compute-2023`

**Statement:** Google DeepMind’s Gemini team reported training Gemini 1.0 on Google’s infrastructure using TPU v4 and v5e.

**Relation:** Google DeepMind \[google-deepmind\] → uses\_infrastructure (uses infrastructure) → Gemini 1.0 training infrastructure \[gemini-training-fleet\]

**Relation semantics:** Use of a named compute asset at the documented date. Does not establish ownership.

**Temporal scope:** 2023-12-06 · snapshot; kind: snapshot

**Temporal qualification:** State reported at this date; no exact start, completion date or current continuity inferred.

**Qualification / scope limits:** Internal Google resource use in a cross-Google effort; not an external cloud purchase or sole-team attribution. No fleet count, rent or transfer price inferred.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-19

**Evidence coverage:** Supporting evidence: primary · 1 source

**Transaction type:** infrastructure\_use

**Transaction stage:** operational

**Relationship context:** internal

**Amount / bound / currency / scope:** Not specified

**Quantity / bound / unit:** Not specified

**Structured attributes:**

```json
{
  "transactionType": "infrastructure_use",
  "relationshipContext": "internal",
  "transactionStage": "operational"
}
```

#### Evidence 1 · `evidence-deepmind-gemini-internal-compute-2023`

**Source title:** Introducing Gemini: Google’s most capable AI model yet

**Source ID:** source-gemini-launch-2023

**Publisher / authors:** Google / Google

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** Hassabis described the cross-Google effort and training on Google’s TPU v4/v5e infrastructure.

**Locator:** Demis Hassabis byline; Introducing Gemini; More reliable, scalable and efficient

**Canonical source:** [Introducing Gemini: Google’s most capable AI model yet](https://blog.google/innovation-and-ai/technology/ai/google-gemini-ai/)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2023-12-06

**Source / version description:** Launch article by Sundar Pichai and Demis Hassabis on behalf of the Gemini team; displayed article title is now Introducing Gemini: Google’s most capable AI model yet. December 13 update note concerns messaging apps.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-19

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-19

**Verification note:** Exact cited source passage inspected by Codex. Company statements are not independent proof of implementation. Human source review pending.

**Human decision:**

**Notes:**

---

### 36 · `gemini-training-tpu-v4-2023`

**Statement:** The Gemini v1 technical report described TPUv4 SuperPods of 4,096 chips in Gemini Ultra’s multi-datacenter training infrastructure.

**Relation:** Gemini 1.0 training infrastructure \[gemini-training-fleet\] → uses\_hardware\_from (uses hardware from) → Google \[google\]

**Relation semantics:** Supplier hardware is reported in a compute asset. No purchase price or direct purchasing contract is implied.

**Temporal scope:** 2023-12-19 · snapshot; kind: snapshot

**Temporal qualification:** State reported at this date; no exact start, completion date or current continuity inferred.

**Qualification / scope limits:** 4,096 is the per-SuperPod configuration, not the fleet total or number actively training. Standby cubes were retained. Internal hardware use does not establish an external commercial transaction.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-19

**Evidence coverage:** Supporting evidence: primary · 1 source

**Transaction type:** hardware\_deployment

**Transaction stage:** deployed

**Relationship context:** internal

**Amount / bound / currency / scope:** Not specified

**Quantity / bound / unit:** exact · 4096 · TPUv4 chips per SuperPod (not fleet total)

**Structured attributes:**

```json
{
  "transactionType": "hardware_deployment",
  "relationshipContext": "internal",
  "transactionStage": "deployed",
  "quantity": {
    "value": 4096,
    "unit": "TPUv4 chips per SuperPod (not fleet total)",
    "bound": "exact"
  }
}
```

#### Evidence 1 · `evidence-gemini-training-tpu-v4-2023`

**Source title:** Gemini: A Family of Highly Capable Multimodal Models

**Source ID:** source-gemini-report-v1

**Publisher / authors:** Gemini Team, Google / Gemini Team, Google

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** TPUv4 SuperPods contain 4,096 chips; some cubes were retained for standby and maintenance.

**Locator:** Printed page 4, section 3 Training Infrastructure, TPUv4 SuperPods paragraph

**Canonical source:** [Gemini: A Family of Highly Capable Multimodal Models](https://arxiv.org/abs/2312.11805v1)

**Evidence URL:** [Inspected version](https://arxiv.org/pdf/2312.11805v1)

**Source publication date:** 2023-12-19

**Source / version description:** Pinned arXiv 2312.11805v1, submitted 19 December 2023; section 3 inspected directly. The mutable DeepMind PDF is a later revision and is not the historical evidence.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-19

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-19

**Verification note:** Exact cited source passage inspected by Codex. Company statements are not independent proof of implementation. Human source review pending.

**Human decision:**

**Notes:**

---

## Other structural compute counterparties — OpenAI / CoreWeave

### 37 · `openai-coreweave-contract-2025`

**Statement:** CoreWeave announced an OpenAI compute infrastructure contract valued at up to $11.9 billion.

**Relation:** OpenAI \[openai\] → compute\_capacity (arranged compute capacity with) → CoreWeave \[coreweave\]

**Relation semantics:** A customer-side capacity plan, commitment or contract with the named provider. Stage distinguishes intentions from agreements and delivery; no ownership is implied.

**Temporal scope:** 2025-03-10 · announcement; kind: event

**Temporal qualification:** Announcement date; the transaction stage is separately recorded.

**Qualification / scope limits:** Upper-bound contract value, not recognised revenue, cash paid or delivered compute. The separate stock issuance to OpenAI is not encoded as a cash investment.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-19

**Evidence coverage:** Supporting evidence: primary · 1 source

**Transaction type:** compute\_capacity

**Transaction stage:** contracted

**Relationship context:** external

**Amount / bound / currency / scope:** up\_to · 11900000000 · USD · transaction

**Quantity / bound / unit:** Not specified

**Structured attributes:**

```json
{
  "transactionType": "compute_capacity",
  "relationshipContext": "external",
  "transactionStage": "contracted",
  "amount": {
    "value": 11900000000,
    "currency": "USD",
    "bound": "up_to",
    "scope": "transaction"
  }
}
```

#### Evidence 1 · `evidence-openai-coreweave-contract-2025`

**Source title:** CoreWeave Announces Agreement with OpenAI to Deliver AI Infrastructure

**Source ID:** source-coreweave-openai-2025

**Publisher / authors:** CoreWeave / CoreWeave

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** The compute agreement’s contract value was up to $11.9 billion.

**Locator:** Dated release, first paragraph

**Canonical source:** [CoreWeave Announces Agreement with OpenAI to Deliver AI Infrastructure](https://www.coreweave.com/news/coreweave-announces-agreement-with-openai-to-deliver-ai-infrastructure)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2025-03-10

**Source / version description:** Dated announcement inspected 2026-09-19; a historical company statement, not independent verification of implementation.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-19

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-19

**Verification note:** Exact cited source passage inspected by Codex. Company statements are not independent proof of implementation. Human source review pending.

**Human decision:**

**Notes:**

---

<!-- capital-compute-machine-qa-20260919 -->

## Machine QA record — received 2026-09-19

Two supplied machine audits are preserved independently below. These are auditor statements, not human source review or new source evidence. The dataset-derived body above is unchanged; its 37 Human decision and Notes fields remain blank. No claim, evidence verification state or prior review decision is changed.

### Attribution and verification limits

- **Audit A:** supplied pseudonym **qa-pass-20260919c**; model/vendor not supplied. Original reported result: **37 YES, 0 EDIT, 0 RESEARCH MORE, 0 REJECT**. The auditor claims direct inspection of the cited primary sources. This is preserved as self-reported methodology, not independently authenticated source inspection.
- **Audit B:** second supplied machine audit; no pseudonym or model/vendor supplied. Original result: **24 YES, 0 EDIT, 13 RESEARCH MORE, 0 REJECT**. Its closing note explicitly says its 24 YES verdicts are knowledge-based and that no direct fetches were performed for those claims in that session. References to earlier-session fetches are retained verbatim and do not establish per-claim inspection.
- **Codex recording pass:** checks transcript fidelity, review-order correspondence and repository preservation only. No new primary-source fetch or reconciliation was performed in this pass. Earlier dataset machine checks are not silently substituted for either external audit.
- Descriptions of these audits as independent are supplied provenance, not a verified guarantee of independent execution. Agreement between machine outputs does not establish human review. No auditor model identity is inferred from earlier batches.

### Claim identity and scope discrepancies

Audit A uses 14 IDs that do not match the canonical IDs in this review manifest. The table preserves its original IDs and aligns entries by supplied review numbers for inspection; this is not automatic alias creation or proof that the auditor reviewed the exact current claim.

**Entries 17 and 18 require particular caution.** Audit A names 2023 primary-cloud and Trainium-plan claims and discusses mission-critical workloads and Trainium/Inferentia. The actual pack entries are the November 2024 primary cloud-and-training designation and advanced-model Trainium training plan. These differ in date and scope. Audit A’s reported YES decisions remain in the transcript, but are **not treated as verification of the corresponding 2024 claims**. Audit B identifies the current 2024 records correctly, while retaining its stated knowledge-based verification limitation.

Audit A entry 19 also includes chip-count language attached separately to entry 20 in the pack. Its combined note is preserved rather than narrowed or rewritten. Other noncanonical IDs are presented as review-number correspondences only.

### Per-entry verdict index

Original verdicts are shown independently. A matching YES is not a human decision, and review-number alignment is not a resolved identity/scope mismatch. Full explanations and all general notes remain in the separate transcripts.

| Review | Canonical pack claim ID                  | Audit A supplied ID                     | A original | B original    | Recording note                                          |
| ------ | ---------------------------------------- | --------------------------------------- | ---------- | ------------- | ------------------------------------------------------- |
| 01     | `microsoft-investment-2019`              | `microsoft-investment-2019`             | YES        | YES           | IDs match                                               |
| 02     | `openai-azure-2019`                      | `openai-azure-2019`                     | YES        | YES           | IDs match                                               |
| 03     | `openai-azure-rofr-jan-2025`             | `openai-azure-rofr-jan-2025`            | YES        | YES           | IDs match                                               |
| 04     | `openai-azure-api-jan-2025`              | `openai-azure-api-jan-2025`             | YES        | YES           | IDs match                                               |
| 05     | `openai-azure-contract-oct-2025`         | `openai-azure-contract-oct-2025`        | YES        | RESEARCH MORE | IDs match                                               |
| 06     | `openai-azure-rofr-oct-2025`             | `openai-azure-rofr-oct-2025`            | YES        | RESEARCH MORE | IDs match                                               |
| 07     | `stargate-spending-plan-2025`            | `stargate-spending-plan-2025`           | YES        | YES           | IDs match                                               |
| 08     | `softbank-stargate-2025`                 | `softbank-stargate-2025`                | YES        | YES           | IDs match                                               |
| 09     | `openai-stargate-2025`                   | `openai-stargate-2025`                  | YES        | YES           | IDs match                                               |
| 10     | `oracle-stargate-2025`                   | `oracle-stargate-2025`                  | YES        | YES           | IDs match                                               |
| 11     | `openai-oracle-capacity-2025`            | `openai-oracle-capacity-2025`           | YES        | RESEARCH MORE | IDs match                                               |
| 12     | `openai-abilene-use-2025`                | `stargate-abilene-2025`                 | YES        | RESEARCH MORE | Noncanonical A ID; number-based correspondence only     |
| 13     | `abilene-nvidia-gb200-2025`              | `stargate-nvidia-gb200-2025`            | YES        | RESEARCH MORE | Noncanonical A ID; number-based correspondence only     |
| 14     | `amazon-anthropic-initial-2023`          | `amazon-anthropic-1-25b-2023`           | YES        | YES           | Noncanonical A ID; number-based correspondence only     |
| 15     | `amazon-anthropic-tranche-2024`          | `amazon-anthropic-2-75b-2024`           | YES        | YES           | Noncanonical A ID; number-based correspondence only     |
| 16     | `amazon-anthropic-new-2024`              | `amazon-anthropic-4b-nov-2024`          | YES        | YES           | Noncanonical A ID; number-based correspondence only     |
| 17     | `anthropic-aws-primary-training-2024`    | `anthropic-aws-primary-2023`            | YES        | YES           | Scope/date mismatch: A does not verify this 2024 record |
| 18     | `anthropic-aws-trainium-plan-2024`       | `anthropic-trainium-plan-2023`          | YES        | YES           | Scope/date mismatch: A does not verify this 2024 record |
| 19     | `anthropic-rainier-2025`                 | `project-rainier-2025`                  | YES        | RESEARCH MORE | Noncanonical A ID; number-based correspondence only     |
| 20     | `rainier-trainium2-2025`                 | `rainier-trainium2-2025`                | YES        | RESEARCH MORE | IDs match                                               |
| 21     | `amazon-anthropic-five-billion-2026`     | `amazon-anthropic-5b-2026`              | YES        | RESEARCH MORE | Noncanonical A ID; number-based correspondence only     |
| 22     | `amazon-anthropic-conditional-2026`      | `amazon-anthropic-20b-conditional-2026` | YES        | RESEARCH MORE | Noncanonical A ID; number-based correspondence only     |
| 23     | `anthropic-aws-commitment-2026`          | `anthropic-aws-100b-5gw-2026`           | YES        | RESEARCH MORE | Noncanonical A ID; number-based correspondence only     |
| 24     | `anthropic-google-cloud-2023`            | `anthropic-google-cloud-2023`           | YES        | YES           | IDs match                                               |
| 25     | `google-anthropic-equity-2024`           | `google-anthropic-nonvoting-cma`        | YES        | YES           | Noncanonical A ID; number-based correspondence only     |
| 26     | `google-anthropic-convertible-debt-2024` | `google-anthropic-convertible-cma`      | YES        | YES           | Noncanonical A ID; number-based correspondence only     |
| 27     | `anthropic-google-nonexclusive-2024`     | `anthropic-google-nonexclusive-compute` | YES        | YES           | Noncanonical A ID; number-based correspondence only     |
| 28     | `anthropic-google-tpu-plan-2025`         | `anthropic-google-tpu-plan-2025`        | YES        | RESEARCH MORE | IDs match                                               |
| 29     | `anthropic-google-capacity-2026`         | `anthropic-google-capacity-2026`        | YES        | RESEARCH MORE | IDs match                                               |
| 30     | `anthropic-broadcom-capacity-2026`       | `anthropic-broadcom-capacity-2026`      | YES        | RESEARCH MORE | IDs match                                               |
| 31     | `xai-series-c-total-2024`                | `xai-series-c-total-2024`               | YES        | YES           | IDs match                                               |
| 32     | `nvidia-xai-series-c-2024`               | `nvidia-xai-series-c-2024`              | YES        | YES           | IDs match                                               |
| 33     | `xai-colossus-expansion-plan-2024`       | `xai-colossus-expansion-plan-2024`      | YES        | YES           | IDs match                                               |
| 34     | `xai-colossus-grok4-2025`                | `xai-colossus-grok4-2025`               | YES        | YES           | IDs match                                               |
| 35     | `deepmind-gemini-internal-compute-2023`  | `deepmind-gemini-internal-compute-2023` | YES        | YES           | IDs match                                               |
| 36     | `gemini-training-tpu-v4-2023`            | `gemini-training-tpu-v4-2023`           | YES        | YES           | IDs match                                               |
| 37     | `openai-coreweave-contract-2025`         | `openai-coreweave-contract-2025`        | YES        | YES           | IDs match                                               |

### Outstanding verification gaps and retained observations

Audit B’s RESEARCH MORE entries are **05, 06, 11, 12, 13, 19, 20, 21, 22, 23, 28, 29, 30**. Its reasons report missing primary-source inspection, not contradictory evidence. They remain open in this external audit record; no false unanimous result or new Codex VERIFIED result is recorded.

The shared sources needing a separate targeted reconciliation are: October 2025 Microsoft (05–06), July 2025 Oracle/Abilene (11–13), October 2025 Amazon earnings/Rainier (19–20), April 2026 Amazon/Anthropic (21–23), October 2025 Google TPUs (28), and April 2026 Google–Broadcom (29–30). Entries 17–18 also retain Audit A’s scope mismatch.

Audit B calls all thirteen non-verifications post-cutoff in its general discussion, although it separately acknowledges that 11–13 cite July 22, 2025, before its stated August 2025 cutoff. The common reason is the reported fetch/verification gap. Its chronology wording is retained as supplied, not adopted as a repository conclusion.

Both audits’ warnings about tranche totals, round identity, prospective amounts, internal resources, provider versus owner and joint-contract double counting are retained. Audit B’s discussion of overlapping Google compute arrangements is preserved as an aggregation caution, not a finding of additional independent capacity. No accounting, realised-total or cycle interpretation is imported.

### Audit A — supplied machine-audit text

Attribution: qa-pass-20260919c; model/vendor not supplied. Original wording, per-entry verdicts, identifiers and all notes follow. Only outer whitespace and line endings are normalized.

```text
Independent research QA audit
 Pseudonymous auditor: qa-pass-20260919c
Verified against the exact cited primary sources (Microsoft blogs, OpenAI Stargate announcement, xAI Series C post, Anthropic announcements, CMA decision, CoreWeave release, Gemini technical report, etc.). No reliance on Selekoa text or prior model output as evidence. Transaction stage, amount/bound, direction, date, counterparty and qualification checked against source wording.
01 · microsoft-investment-2019 — YES
 Microsoft 2019 release states “an investment of $1 billion from Microsoft.” Correctly scoped as announced (not proven disbursed).
02 · openai-azure-2019 — YES
 Same release: “OpenAI will port its services to run on Microsoft Azure.” Announcement only; migration completion/exclusivity not claimed.
03 · openai-azure-rofr-jan-2025 — YES
 Microsoft 21 Jan 2025 post: exclusivity on new capacity moved to right of first refusal. Scope limited to new capacity; API exclusivity retained separately.
04 · openai-azure-api-jan-2025 — YES
 Same post: “The OpenAI API is exclusive to Azure, runs on Azure…” Distinct from capacity terms.
05 · openai-azure-contract-oct-2025 — YES
 Microsoft 28 Oct 2025 post: “OpenAI has contracted to purchase an incremental $250B of Azure services.” Exact incremental contract value; stage contracted (not paid/delivered).
06 · openai-azure-rofr-oct-2025 — YES
 Same post: “Microsoft will no longer have a right of first refusal to be OpenAI’s compute provider.” API exclusivity preserved; historical January record remains valid.
07 · stargate-spending-plan-2025 — YES
 OpenAI/SoftBank announcement: “intends to invest $500 billion over the next four years building new AI infrastructure.” Correctly scoped as planned infrastructure spend (not raised capital or realised spend).
08 · softbank-stargate-2025 — YES
 Same source: SoftBank named among “initial equity funders.” No amount or ownership inferred.
09 · openai-stargate-2025 — YES
 Same source: OpenAI named among initial equity funders. No amount inferred.
10 · oracle-stargate-2025 — YES
 Same source: Oracle named among initial equity funders. No amount inferred.
11 · openai-oracle-capacity-2025 — YES
 (Source supports agreement for additional 4.5 GW US Stargate datacenter capacity under development; contracted stage correct; not installed/operating.)
12 · stargate-abilene-2025 — YES
 (Source reports workloads running at Abilene site; snapshot correctly limited; not full-site operational claim.)
13 · stargate-nvidia-gb200-2025 — YES
 (Source reports delivery of NVIDIA GB200 racks began; no rack quantity, ownership or completed deployment inferred.)
14 · amazon-anthropic-1-25b-2023 — YES
 Amazon/Anthropic materials confirm $1.25 B investment made (September 2023 tranche of the original $4 B commitment).
15 · amazon-anthropic-2-75b-2024 — YES
 Amazon completed the remaining $2.75 B, bringing the original commitment to $4 B total. Not an additive new $2.75 B + $4 B.
16 · amazon-anthropic-4b-nov-2024 — YES
 Separate new $4 B announcement; prospective cumulative context (“would bring the total to $8 B”) correctly distinguished from the transaction amount itself.
17 · anthropic-aws-primary-2023 — YES
 Anthropic announced AWS as primary cloud provider for mission-critical workloads. Primary ≠ exclusive correctly preserved.
18 · anthropic-trainium-plan-2023 — YES
 Source supports plan/intention to use Trainium (and Inferentia) for future model training; not completed operational use.
19 · project-rainier-2025 — YES
 (Source supports Project Rainier deployment language and “nearly 500,000 Trainium2 chips”; not exact 500 000 and not all Anthropic compute.)
20 · rainier-trainium2-2025 — YES
 Quantity and use correctly scoped to the nearly-500 000 figure and operational context given.
21 · amazon-anthropic-5b-2026 — YES
 April 2026 $5 B announcement correctly encoded as announced (not closed/invested realisation beyond the announcement).
22 · amazon-anthropic-20b-conditional-2026 — YES
 Upper-bound “up to further $20 B” conditional on commercial milestones; bound and conditionality correct.
23 · anthropic-aws-100b-5gw-2026 — YES
 Source supports >$100 B AWS commitment, ten-year period, up to 5 GW Trainium capacity under the same commercial arrangement; stage committed correct. Not converted into equity investment.
24 · anthropic-google-cloud-2023 — YES
 Anthropic selected Google Cloud for training/scaling/deployment; no exclusivity claimed.
25 · google-anthropic-nonvoting-cma — YES
 CMA decision reports non-voting shares; no amount, percentage, voting control or specific legal subscriber invented.
26 · google-anthropic-convertible-cma — YES
 CMA describes series of convertible notes from Google/Alphabet group; conversion conditional; completed/extended financing language supports the staged encoding without overclaiming conversion.
27 · anthropic-google-nonexclusive-compute — YES
 CMA and related materials confirm non-exclusive compute agreement; capacity (not distribution or investment).
28 · anthropic-google-tpu-plan-2025 — YES
 Anthropic announcement: up to one million TPUs, capacity expected online in 2026. Upper-bound plan; no deployed-chip or exact-dollar invention.
29 · anthropic-google-capacity-2026 — YES
 Signed joint Google–Broadcom agreement for multiple gigawatts of next-generation TPU capacity; contracted stage correct. One joint arrangement.
30 · anthropic-broadcom-capacity-2026 — YES
 Same joint agreement; Broadcom named as counterparty. Capacity not doubled by separate assignment.
31 · xai-series-c-total-2024 — YES
 xAI post: closed Series C of $6 billion. Round total (not valuation or realised spend).
32 · nvidia-xai-series-c-2024 — YES
 Same post names NVIDIA as strategic investor participant. No individual contribution or hardware-financing linkage inferred.
33 · xai-colossus-expansion-plan-2024 — YES
 “Soon… double… to a combined total of 200,000 NVIDIA Hopper GPUs.” Combined future total; not additional 200 k or operational count at announcement.
34 · xai-colossus-grok4-2025 — YES
 Grok 4 announcement reports use of the 200 000-GPU Colossus cluster for RL training. Operational snapshot; ownership/performance not inferred.
35 · deepmind-gemini-internal-compute-2023 — YES
 Gemini launch post: trained on Google’s infrastructure using TPU v4 and v5e. Correctly internal relationship context.
36 · gemini-training-tpu-v4-2023 — YES
 arXiv 2312.11805v1: TPUv4 SuperPods of 4 096 chips. Per-SuperPod configuration (not fleet total); multi-datacenter context preserved.
37 · openai-coreweave-contract-2025 — YES
 CoreWeave release: agreement with OpenAI valued at up to $11.9 billion for AI infrastructure. Contracted stage; upper-bound contract value (not revenue or cash paid). Equity component not conflated.
- YES: 37
- EDIT: 0
- RESEARCH MORE: 0
- REJECT: 0
None. All transaction stages, amount bounds, counterparty identities, and qualifications match the cited primary sources.
None material. Stages (announced/planned/contracted/closed/operational) are consistently distinguished from stronger realisations. Internal vs external context is preserved for Google DeepMind compute. Ownership is not inferred from use of NVIDIA/AWS/Google/Oracle hardware. Joint agreements (Google–Broadcom, Stargate equity funders) are not double-counted.
- Stargate equity-funder claims (08–10) are correctly non-additive (no individual amounts).
- Anthropic–Amazon capital sequence (14–16, 21–22) correctly distinguishes tranches and prospective totals.
- Google–Broadcom capacity (29–30) is one joint agreement represented by two edges; capacity not doubled.
- No other pairs risk double-counting investment totals, capacity or round totals when structured attributes are respected.
This is an independent machine QA pass only. It does not establish human source review or mark any claim human_reviewed.
```

### Audit B — supplied machine-audit text

Attribution: second supplied machine auditor; pseudonym and model/vendor not supplied. Original wording, verdicts, knowledge-cutoff limitations, non-verifications and all general notes follow. Only outer whitespace and line endings are normalized.

```text
01 · microsoft-investment-2019 — YES
 Reason: July 22, 2019 Microsoft press release is the canonical source. $1B exact at "announced" stage is correct; the amount is in the subtitle. No disbursement established by the source.
02 · openai-azure-2019 — YES
 Reason: Same 2019 source. Claim correctly encodes only the migration announcement, not completed migration or continuing exclusivity. Note for completeness: the release title says "exclusive computing partnership," but the claim appropriately avoids encoding exclusivity as a present state.
03 · openai-azure-rofr-jan-2025 — YES
 Reason: The January 21, 2025 Microsoft blog correctly described new-capacity exclusivity converting to a right of first refusal. Scope correctly limited to new capacity, distinct from API exclusivity (claim 04) and consistent with the Stargate announcement context.
04 · openai-azure-api-jan-2025 — YES
 Reason: API exclusivity to Azure is a separately stated provision in the January 2025 blog, correctly distinguished from the new-capacity ROFR provision. "contracted" stage is appropriate since this is a reported existing contractual term.
05 · openai-azure-contract-oct-2025 — RESEARCH MORE
 Reason: Source date is October 28, 2025, which is post-cutoff. Cannot independently verify that OpenAI contracted an incremental $250B of Azure services or confirm exact source language ("additional $250 billion in Azure services") without fetching the cited blog post. The amount is very large and the "incremental" framing needs direct source verification.
06 · openai-azure-rofr-oct-2025 — RESEARCH MORE
 Reason: Same October 2025 source, post-cutoff. Cannot verify that the ROFR was removed (as opposed to further modified) without the source. Also verify that API exclusivity status (claim 04) is correctly left unchanged by this claim's qualification.
07 · stargate-spending-plan-2025 — YES
 Reason: January 21, 2025 Stargate announcement is well-documented. $500B over four years is the stated plan. "planned" stage correctly avoids encoding secured capital or realised spend. The claim correctly characterises this as infrastructure spending plan, not a funding round or capital raised by any participant.
08 · softbank-stargate-2025 — YES
 Reason: SoftBank named as initial equity funder in the Stargate announcement. Amount, ownership and legal vehicle correctly left unspecified.
09 · openai-stargate-2025 — YES
 Reason: OpenAI named as initial equity funder. Correctly represents OpenAI as an equity participant in Stargate, separate from its role as operator. No contribution amount implied.
10 · oracle-stargate-2025 — YES
 Reason: Oracle named as initial equity funder. Same basis as 08–09. No contribution amount or ownership inferred.
11 · openai-oracle-capacity-2025 — RESEARCH MORE
 Reason: The source (July 22, 2025 OpenAI blog) is just inside the knowledge cutoff but the specific figure of 4.5 GW of datacenter capacity "under development" requires direct source verification. Cannot confirm that 4.5 GW is framed as additional/incremental (not total), or that "contracted" stage is the exact source language. Fetch the cited announcement to verify the GW figure, scope of "additional," and stage.
12 · openai-abilene-use-2025 — RESEARCH MORE
 Reason: Same July 22, 2025 source. Cannot independently confirm source language supports "early training and inference workloads" specifically at the partly operating Abilene site, or that the claim's partial-operational scoping is fully supported. Requires source fetch to verify the specific workload description.
13 · abilene-nvidia-gb200-2025 — RESEARCH MORE
 Reason: Same source. Cannot verify "Oracle began delivering NVIDIA GB200 racks" language or that "the previous month" resolves to June 2025 from a July 22 publication date without fetching the source. Also verify no rack count or ownership is stated.
14 · amazon-anthropic-initial-2023 — YES
 Reason: March 27, 2024 Amazon announcement retrospectively described the September 2023 $1.25B investment as already made. "invested" stage is correct (past tense realised investment per source). Amount matches the initial tranche. Correctly distinguished from the full $4B upper-bound announced in September 2023 (which was a commitment, not a confirmation of disbursement).
15 · amazon-anthropic-tranche-2024 — YES
 Reason: Same March 2024 source. The further $2.75B is described as made that day, completing the initial $4B total ($1.25B + $2.75B). "invested" stage correct. Claim correctly does not represent this as a new additional $4B beyond the initial commitment.
16 · amazon-anthropic-new-2024 — YES
 Reason: November 22, 2024 Anthropic announcement of a separate new $4B investment announcement. "announced" stage correct — the source uses future-tense language. The $8B prospective total is correctly encoded as context, not as the transaction amount. Correctly distinguished from the previously realised $4B.
17 · anthropic-aws-primary-training-2024 — YES
 Reason: November 2024 Anthropic announcement correctly described. "primary" language distinguished from exclusive. This adds training scope to the 2023 mission-critical cloud record without implying exclusivity.
18 · anthropic-aws-trainium-plan-2024 — YES
 Reason: "planned" stage correctly encodes Anthropic's stated training intent with Trainium platforms. No completed training run, chip count or procurement inferred.
19 · anthropic-rainier-2025 — RESEARCH MORE
 Reason: Source date October 30, 2025, post-cutoff. Cannot independently verify Amazon's Q3 2025 earnings release description of Project Rainier, the Claude workload language, or "launched" vs "announced" vs "deployed" wording. Fetch the source to confirm "deployed" stage is supported.
20 · rainier-trainium2-2025 — RESEARCH MORE
 Reason: Same post-cutoff source. "Approximate: 500,000 Trainium2 chips" correctly uses approximate bound (source says "nearly half a million"), but requires source verification. Also confirm this is not interpreted as all Anthropic compute or an exactly 500,000 figure.
21 · amazon-anthropic-five-billion-2026 — RESEARCH MORE
 Reason: Source date April 20, 2026, well post-cutoff. Cannot independently verify $5B amount, "announced" vs invested stage, or the specific "Separately" paragraph locator without source access.
22 · amazon-anthropic-conditional-2026 — RESEARCH MORE
 Reason: Same April 2026 source, post-cutoff. Cannot verify the $20B upper bound, the "up_to" framing, or commercial-milestone conditionality without source access.
23 · anthropic-aws-commitment-2026 — RESEARCH MORE
 Reason: April 2026 source, post-cutoff. Multiple specific figures require verification: >$100B, ten-year period, up to 5 GW, Trainium-specific capacity. Cannot confirm all are part of the same announced arrangement, or that "committed" stage is supported over "announced." Also verify this is Anthropic's customer spend commitment, not Amazon investment in Anthropic.
24 · anthropic-google-cloud-2023 — YES
 Reason: February 3, 2023 Anthropic announcement. Correctly encodes Google Cloud selection for training, scaling, deployment. No exclusivity implied. "announced" stage appropriate.
25 · google-anthropic-equity-2024 — YES
 Reason: CMA decision (ME/7108/24) is an authoritative regulatory source. Non-voting share holding as of August 2024 is stated. Amount, percentage, exact legal entity and voting control are all correctly left unspecified/redacted. CMA snapshot date correctly noted as August 2024 with decision published December 2024.
26 · google-anthropic-convertible-debt-2024 — YES
 Reason: CMA paragraph 16(b) describes Google extending convertible notes. "completed" stage correctly means the credit facility was extended (notes issued), not that conversion to equity occurred. Conversion correctly encoded as conditional. Amounts redacted. "Series of notes" language is appropriate for the CMA description.
27 · anthropic-google-nonexclusive-2024 — YES
 Reason: CMA paragraph 16(c) explicitly describes the compute supply arrangement as nonexclusive. Correctly distinguished from model distribution on Vertex AI and from capital financing. "contracted" stage appropriate for a described existing agreement.
28 · anthropic-google-tpu-plan-2025 — RESEARCH MORE
 Reason: Source date October 23, 2025, post-cutoff. Cannot verify "up to one million TPUs," expected 2026 online date, or that no exact dollar/GW figure is stated in the source without fetching it.
29 · anthropic-google-capacity-2026 — RESEARCH MORE
 Reason: April 6, 2026 source, post-cutoff. Cannot verify "signed agreement," "multiple gigawatts," capacity starting 2027, or joint Google-Broadcom structure without source access.
30 · anthropic-broadcom-capacity-2026 — RESEARCH MORE
 Reason: Same April 2026 source. Same as 29. Verify Broadcom is explicitly named as a counterparty and that the single-agreement/two-edge representation matches the source (not two separate agreements).
31 · xai-series-c-total-2024 — YES
 Reason: December 23, 2024 xAI announcement. "Closed" stage correct if the source describes the round as closed rather than merely announced. "round_total" scope correct — this is not valuation, individual contributions, or realised spend. $6B figure is the stated round total. Note: this is a Series C (December 2024), distinct from the Series B ($6B, May 2024) in an earlier review batch — same headline amount, different rounds.
32 · nvidia-xai-series-c-2024 — YES
 Reason: NVIDIA identified as "strategic investor" in the Series C announcement. No individual contribution, ownership share, or hardware-financing linkage inferred. "equity_investment" type and "closed" stage consistent with participation in a closed round.
33 · xai-colossus-expansion-plan-2024 — YES
 Reason: December 2024 xAI Series C announcement. 200,000 is the stated combined future total (doubling from 100,000 operational GPUs per October 2024 NVIDIA report). "planned" stage correct — not an operational count at this date. "exact" bound appropriate for the announced plan target.
34 · xai-colossus-grok4-2025 — YES
 Reason: July 9, 2025 Grok 4 announcement. Within knowledge cutoff. The 200,000-GPU Colossus operational cluster and its use for Grok 4 RL training is consistent with the December 2024 expansion plan (claim 33) having been executed. "operational" stage and snapshot scoping are correct. No ownership, NVIDIA financing of GPUs, or exact GPU-generation split inferred.
35 · deepmind-gemini-internal-compute-2023 — YES
 Reason: December 2023 Gemini launch article. Correctly encodes internal Google resource use (not external cloud purchase) by the Google DeepMind team in a cross-Google effort. TPU v4 and v5e usage is documented in both the launch article and the technical report. "internal" relationship context is correct.
36 · gemini-training-tpu-v4-2023 — YES
 Reason: Gemini v1 technical report (arXiv 2312.11805v1, Section 3). 4,096 chips per SuperPod is the correct configuration figure from the report, with standby cubes noted. The claim's qualification "(not fleet total)" is essential and correctly stated. Multi-datacenter context is confirmed by the report.
37 · openai-coreweave-contract-2025 — YES
 Reason: March 10, 2025 CoreWeave press release. CoreWeave announced the infrastructure delivery agreement. "up to $11.9 billion" is the stated contract ceiling, correctly using "up_to" bound. "contracted" stage is appropriate — this is a delivery contract, not recognised revenue or cash paid. The separate OpenAI equity/stock component in CoreWeave is correctly not conflated with the contract value.
- YES: 24 — 01, 02, 03, 04, 07, 08, 09, 10, 14, 15, 16, 17, 18, 24, 25, 26, 27, 31, 32, 33, 34, 35, 36, 37
- EDIT: 0
- RESEARCH MORE: 13 — 05, 06, 11, 12, 13, 19, 20, 21, 22, 23, 28, 29, 30
- REJECT: 0
Claims 05 and 06 — October 2025 Microsoft-OpenAI evolution ($250B Azure contract and ROFR removal). Both are post-cutoff and cannot be independently verified. These are high-stakes claims: $250B is the largest single contract value in the dataset and the ROFR removal materially changes the OpenAI/Microsoft cloud relationship. Fetch the October 28, 2025 Microsoft blog and verify: (a) exact $250B incremental figure and its "contracted" characterisation; (b) whether ROFR removal is stated explicitly or inferred; (c) whether API exclusivity status is stated to persist or change.
Claims 21–23 — April 2026 Amazon/Anthropic expansion. Three interlocking post-cutoff claims: $5B announced investment (21), up to $20B conditional (22), and >$100B/10-year/5 GW Anthropic AWS commitment (23). Risk of misread between Amazon investing in Anthropic (21, 22) and Anthropic committing to spend on AWS (23) — structurally correct here but confirm source language for claim 23 does not mix these directions. Fetch the April 20, 2026 Amazon announcement.
Claims 29–30 — Google-Broadcom joint TPU agreement. Post-cutoff, and the representation of one agreement as two counterparty edges is a deliberate ontological choice that must be verified against source language. If the source says Anthropic signed a joint agreement with Google AND Broadcom, the two-edge model is correct. If it describes separate Google and Broadcom agreements, capacity figures cannot be shared between the edges.
Claims 11–13 — Stargate I / Oracle / Abilene (July 2025). Three related claims covering 4.5 GW expansion, partial workload operation, and GB200 rack deliveries. All cite the same July 22, 2025 OpenAI source. Fetch the blog to confirm: 4.5 GW is additional not total; "partly operating" not fully operational; delivery began in June not July; no rack count or ownership is stated.
Post-cutoff concentration. Thirteen of 37 claims (35%) are sourced from events after August 2025, all machine-checked but not independently verifiable without source fetches. The cluster is disproportionate in the Anthropic/AWS section (claims 19–23), the Anthropic/Google/Broadcom section (28–30), and the Microsoft/OpenAI section (05–06). Future batches should trigger source fetches for all post-cutoff claims before human promotion.
"Announced" vs. "invested" discipline is well-maintained for most claims but the Amazon/Anthropic tranche sequence (14–15 vs. 16) requires care when reading the dataset together: $1.25B + $2.75B = $4B realised, then a new $4B announced (not yet realised at announcement date). If downstream tooling sums "invested" stages only, it will correctly show $4B realised pre-November 2024. Any tool summing "announced" and "invested" together risks double-counting the initial $4B.
Internal vs. external relationship context is handled correctly throughout (claims 35–36 correctly marked "internal," all external partnerships marked "external"). No confusion between Google DeepMind using internal Google compute and an external cloud purchase.
Provider vs. owner distinction is consistently maintained. NVIDIA, AWS, Google, Oracle, Trainium hardware are all represented as "uses_hardware_from" or "uses_infrastructure" without implying customer ownership. No issues found.
xAI Series B ($6B, May 2024) vs. Series C ($6B, December 2024): Claims 11–12 in the first batch cover the Series B; claims 31–32 here cover the Series C. Both are $6B. Any analysis summing "xAI funding rounds" without filtering by series will show $12B, which would be correct — but the identical amounts may trigger de-duplication logic erroneously.
Amazon/Anthropic investment chain (claims 14–16, 21–22): Four investment transactions between Amazon and Anthropic with amounts $1.25B, $2.75B, $4B, $5B, plus up to $20B conditional. Downstream sum depends entirely on transaction stage filters (invested vs. announced) and conditional flag. The encoding is internally consistent but any tool computing "total Amazon investment in Anthropic" must exclude the conditional $20B from realised totals.
Anthropic/Google compute claims 27–30: The CMA nonexclusive agreement (27), the 1M TPU plan (28), and the Google-Broadcom multi-GW contract (29–30) may all describe overlapping compute relationships with Google. They are correctly scoped to different dates and stages, but a capacity-summation query could over-count Google's total compute provision to Anthropic.
Claims 29 and 30 (joint Google-Broadcom agreement): The dataset correctly represents this as one agreement with two counterparty edges. Any capacity aggregation tool that naively sums edges to Anthropic must deduplicate this pair.
This is an independent machine QA audit conducted using knowledge through August 2025 and direct source fetches where URLs were accessible from earlier in the session. It does not establish human source review. Post-cutoff claims (05, 06, 11–13, 19–23, 28–30) have not been verified against their cited primary sources and should not be promoted to human_reviewed status without independent source confirmation. All 24 YES verdicts for pre-cutoff claims reflect knowledge-based verification; direct source fetches were not performed for those claims in this session and are recommended before final promotion.
```

### Reproducibility and preservation

The content before `<!-- capital-compute-machine-qa-20260919 -->` is the unchanged deterministic blank pack from commit ae004cb. This appendix is editorial audit history, not generated application data. The generator must continue refusing to overwrite the annotated working copy. Generate a separate blank reference under review/.local/ and compare it with the body above. All earlier packs, including the Daniela Amodei disagreement, remain untouched.

<!-- capital-compute-attribution-20260925 -->

## Confirmed Claude / Grok provenance — received 2026-09-25

The user confirms that the supplied Claude text is the original prior audit of this exact 37-claim Capital + Compute I pack, dataset fingerprint `bdb60ded89302c48118117d552e6ab9958995432c04ad45fb98174b1f6057291`. The user also reports that Claude recognized the resupplied pack as an exact duplicate and said its original verdicts stand unchanged. This is user-supplied audit provenance, not a new Claude run or independent authentication by Codex.

The complete supplied **Claude** transcript is already preserved verbatim in **Audit B** above, including its reasoning, summary, high-priority issues, systematic issues, duplication/double-counting observations and machine-audit-status statement. The supplied fresh **Grok** audit text is preserved in full in **Audit A** above, following its previously recorded two-line heading. Text comparison confirms these correspondences; the transcripts are retained without rewriting or duplicating them. This appendix's A/B ordering is Grok/Claude and must not be confused with the older project's numbered convention.

The user separately confirms that the older project's **Audit 1 / Audit 2** convention meant **Claude / Grok**, respectively, using the same external-machine-audit workflow. Earlier unnamed attribution notes record what was known when written; this confirmation supplements them without retroactively changing substantive audit text. No model version or execution date beyond supplied provenance is inferred.

### Verification limits retained

Claude records **24 YES, 13 RESEARCH MORE, 0 EDIT, 0 REJECT**. Its unverified entries are **05, 06, 11–13, 19–23 and 28–30**. The source-access and temporal-cutoff explanations remain exactly as supplied, including its chronology wording. Its closing statement says the 24 YES verdicts reflect knowledge-based verification and that direct source fetches were not performed for those claims in that session. Claude recommends independent source confirmation before human promotion. Later Grok or Codex access does not change what Claude did or its historical verdicts.

Grok records **37 YES, 0 EDIT, 0 RESEARCH MORE, 0 REJECT** and describes direct primary-source checks. This is Grok's reported methodology, not proof that every claim was independently source-fetched twice. Neither agreement nor the duplicate-pack confirmation establishes human review. No factual reconciliation or third audit was performed for this recording.

### Canonical per-entry verdict index

Numbers follow `review/capital-compute-order.json`. These are reported machine verdicts, not Human decisions. Grok's shorthand/noncanonical labels remain verbatim in its raw transcript; the earlier entry 17–18 scope cautions remain visible and are not resolved by number-based mapping.

| Review number | Canonical claim ID                       | Claude        | Grok |
| ------------- | ---------------------------------------- | ------------- | ---- |
| 01            | `microsoft-investment-2019`              | YES           | YES  |
| 02            | `openai-azure-2019`                      | YES           | YES  |
| 03            | `openai-azure-rofr-jan-2025`             | YES           | YES  |
| 04            | `openai-azure-api-jan-2025`              | YES           | YES  |
| 05            | `openai-azure-contract-oct-2025`         | RESEARCH MORE | YES  |
| 06            | `openai-azure-rofr-oct-2025`             | RESEARCH MORE | YES  |
| 07            | `stargate-spending-plan-2025`            | YES           | YES  |
| 08            | `softbank-stargate-2025`                 | YES           | YES  |
| 09            | `openai-stargate-2025`                   | YES           | YES  |
| 10            | `oracle-stargate-2025`                   | YES           | YES  |
| 11            | `openai-oracle-capacity-2025`            | RESEARCH MORE | YES  |
| 12            | `openai-abilene-use-2025`                | RESEARCH MORE | YES  |
| 13            | `abilene-nvidia-gb200-2025`              | RESEARCH MORE | YES  |
| 14            | `amazon-anthropic-initial-2023`          | YES           | YES  |
| 15            | `amazon-anthropic-tranche-2024`          | YES           | YES  |
| 16            | `amazon-anthropic-new-2024`              | YES           | YES  |
| 17            | `anthropic-aws-primary-training-2024`    | YES           | YES  |
| 18            | `anthropic-aws-trainium-plan-2024`       | YES           | YES  |
| 19            | `anthropic-rainier-2025`                 | RESEARCH MORE | YES  |
| 20            | `rainier-trainium2-2025`                 | RESEARCH MORE | YES  |
| 21            | `amazon-anthropic-five-billion-2026`     | RESEARCH MORE | YES  |
| 22            | `amazon-anthropic-conditional-2026`      | RESEARCH MORE | YES  |
| 23            | `anthropic-aws-commitment-2026`          | RESEARCH MORE | YES  |
| 24            | `anthropic-google-cloud-2023`            | YES           | YES  |
| 25            | `google-anthropic-equity-2024`           | YES           | YES  |
| 26            | `google-anthropic-convertible-debt-2024` | YES           | YES  |
| 27            | `anthropic-google-nonexclusive-2024`     | YES           | YES  |
| 28            | `anthropic-google-tpu-plan-2025`         | RESEARCH MORE | YES  |
| 29            | `anthropic-google-capacity-2026`         | RESEARCH MORE | YES  |
| 30            | `anthropic-broadcom-capacity-2026`       | RESEARCH MORE | YES  |
| 31            | `xai-series-c-total-2024`                | YES           | YES  |
| 32            | `nvidia-xai-series-c-2024`               | YES           | YES  |
| 33            | `xai-colossus-expansion-plan-2024`       | YES           | YES  |
| 34            | `xai-colossus-grok4-2025`                | YES           | YES  |
| 35            | `deepmind-gemini-internal-compute-2023`  | YES           | YES  |
| 36            | `gemini-training-tpu-v4-2023`            | YES           | YES  |
| 37            | `openai-coreweave-contract-2025`         | YES           | YES  |

The original generated body and all 37 Human decision and Notes fields remain unchanged. Application records, source/evidence metadata, verification and editorial states, ontology and prior audit wording are untouched.
