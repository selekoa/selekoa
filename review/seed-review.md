# Selekoa — seed claim review

28 claims, grouped by type. These are research seeds; machine checks are not human review. This document is an editorial working aid and is never loaded by the application.

Schema: 2.0. Dataset date: 2026-09-17. Dataset fingerprint: `6e4cfc97d5c70d2a4becf25722f2d4f76f113914e680f25020e18030de54125c`.

Claim wording, qualifications and passages below come from the validated dataset. Quotes and paraphrases are labelled separately. Source roles are relative to each claim. A primary source is not a truth rank, and multiple sources do not guarantee independence.

## Recorded decisions

All 28 YES decisions and both supplied audits’ per-claim notes were recorded on 2026-09-18 at futurelightcone’s explicit request. Audit 2 is mapped by the unchanged review order; Audit 1 supplies the claim IDs. Notes retain the audits’ wording and are attributed audit comments, not additional dataset claims or independently verified corrections. The evidence-verification fields below retain their original machine-check history; no human source inspection is inferred from agreement between audits.

For claim 14, Audit 1 requests confirmation of the mission-critical workload scope; Audit 2 explicitly confirms the full-sentence scope. Later events mentioned in notes remain outside these historical claims.

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

## People / roles

### 01 · `altman-openai-2015`

**Statement:** OpenAI’s launch announcement names Sam Altman as a co-chair.

**Relation:** Sam Altman \[sam-altman\] → held\_role (held role at) → OpenAI \[openai\]

**Relation semantics:** A dated record of an institutional role. This does not establish the full employment interval.

**Temporal scope:** 2015-12-11 · snapshot; kind: snapshot

**Temporal qualification:** The date identifies this documented announcement or publication; it does not establish a continuing state.

**Qualification / scope limits:** This is a historical role snapshot. Neither the appointment date nor the end of the role is established by this record.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-17

**Evidence coverage:** Supporting evidence: primary · 1 source

**Structured attributes:**

```json
{
  "role": "Co-chair"
}
```

#### Evidence 1 · `evidence-altman-openai-2015`

**Source title:** Introducing OpenAI

**Source ID:** source-openai-launch

**Publisher / authors:** OpenAI / Greg Brockman; Ilya Sutskever; OpenAI

**Source role relative to this claim:** primary

**Evidence role:** supports

**Exact source excerpt:** OpenAI’s co-chairs are Sam Altman and Elon Musk.

**Locator:** OpenAI section, paragraph naming the co-chairs

**Canonical source:** [Introducing OpenAI](https://openai.com/index/introducing-openai/)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2015-12-11

**Source / version description:** Dated page, inspected at retrieval

**Version date:** Not separately recorded

**Source accessed:** 2026-09-17

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-17

**Verification note:** Source passage inspected by an automated research assistant. Human editorial review is pending.

**Human decision:** YES

**Notes:**

Audit 2: Confirmed on [https://openai.com/index/introducing-openai/](https://openai.com/index/introducing-openai/) (11 Dec 2015): “OpenAI’s co-chairs are Sam Altman and Elon Musk.” Snapshot role correctly scoped.

---

### 02 · `musk-openai-2015`

**Statement:** OpenAI’s launch announcement names Elon Musk as a co-chair.

**Relation:** Elon Musk \[elon-musk\] → held\_role (held role at) → OpenAI \[openai\]

**Relation semantics:** A dated record of an institutional role. This does not establish the full employment interval.

**Temporal scope:** 2015-12-11 · snapshot; kind: snapshot

**Temporal qualification:** The date identifies this documented announcement or publication; it does not establish a continuing state.

**Qualification / scope limits:** This is a historical role snapshot. Neither the appointment date nor the end of the role is established by this record.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-17

**Evidence coverage:** Supporting evidence: primary · 1 source

**Structured attributes:**

```json
{
  "role": "Co-chair"
}
```

#### Evidence 1 · `evidence-musk-openai-2015`

**Source title:** Introducing OpenAI

**Source ID:** source-openai-launch

**Publisher / authors:** OpenAI / Greg Brockman; Ilya Sutskever; OpenAI

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** The announcement identifies Musk and Altman as co-chairs.

**Locator:** OpenAI section, paragraph naming the co-chairs

**Canonical source:** [Introducing OpenAI](https://openai.com/index/introducing-openai/)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2015-12-11

**Source / version description:** Dated page, inspected at retrieval

**Version date:** Not separately recorded

**Source accessed:** 2026-09-17

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-17

**Verification note:** Source passage inspected by an automated research assistant. Human editorial review is pending.

**Human decision:** YES

**Notes:**

Audit 1: Evidence 1 for 01 supplies the exact quote; this evidence entry is correctly labelled paraphrase, since it describes the same sentence without quoting it. No inconsistency.

Audit 2: Same source and sentence as claim 01. Exact match.

---

### 03 · `sutskever-openai-2015`

**Statement:** OpenAI’s launch announcement names Ilya Sutskever as research director.

**Relation:** Ilya Sutskever \[ilya-sutskever\] → held\_role (held role at) → OpenAI \[openai\]

**Relation semantics:** A dated record of an institutional role. This does not establish the full employment interval.

**Temporal scope:** 2015-12-11 · snapshot; kind: snapshot

**Temporal qualification:** The date identifies this documented announcement or publication; it does not establish a continuing state.

**Qualification / scope limits:** This is a historical role snapshot. Neither the appointment date nor the end of the role is established by this record.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-17

**Evidence coverage:** Supporting evidence: primary · 1 source

**Structured attributes:**

```json
{
  "role": "Research director"
}
```

#### Evidence 1 · `evidence-sutskever-openai-2015`

**Source title:** Introducing OpenAI

**Source ID:** source-openai-launch

**Publisher / authors:** OpenAI / Greg Brockman; Ilya Sutskever; OpenAI

**Source role relative to this claim:** primary

**Evidence role:** supports

**Exact source excerpt:** OpenAI’s research director is Ilya Sutskever

**Locator:** OpenAI section, research leadership paragraph

**Canonical source:** [Introducing OpenAI](https://openai.com/index/introducing-openai/)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2015-12-11

**Source / version description:** Dated page, inspected at retrieval

**Version date:** Not separately recorded

**Source accessed:** 2026-09-17

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-17

**Verification note:** Source passage inspected by an automated research assistant. Human editorial review is pending.

**Human decision:** YES

**Notes:**

Audit 2: Same page: “OpenAI’s research director is Ilya Sutskever.” Exact match.

---

### 04 · `dario-anthropic-2021`

**Statement:** Anthropic’s Series A announcement names Dario Amodei as CEO.

**Relation:** Dario Amodei \[dario-amodei\] → held\_role (held role at) → Anthropic \[anthropic\]

**Relation semantics:** A dated record of an institutional role. This does not establish the full employment interval.

**Temporal scope:** 2021-05-28 · snapshot; kind: snapshot

**Temporal qualification:** The date identifies this documented announcement or publication; it does not establish a continuing state.

**Qualification / scope limits:** This is a historical role snapshot. Neither the appointment date nor the end of the role is established by this record.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-17

**Evidence coverage:** Supporting evidence: primary · 1 source

**Structured attributes:**

```json
{
  "role": "CEO"
}
```

#### Evidence 1 · `evidence-dario-anthropic-2021`

**Source title:** Anthropic raises $124 million to build more reliable, general AI systems

**Source ID:** source-anthropic-series-a

**Publisher / authors:** Anthropic / Anthropic

**Source role relative to this claim:** primary

**Evidence role:** supports

**Exact source excerpt:** Dario Amodei (CEO)

**Locator:** Second body paragraph

**Canonical source:** [Anthropic raises $124 million to build more reliable, general AI systems](https://www.anthropic.com/news/anthropic-raises-124-million-to-build-more-reliable-general-ai-systems)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2021-05-28

**Source / version description:** Dated page, inspected at retrieval

**Version date:** Not separately recorded

**Source accessed:** 2026-09-17

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-17

**Verification note:** Source passage inspected by an automated research assistant. Human editorial review is pending.

**Human decision:** YES

**Notes:**

Audit 2: [https://www.anthropic.com/news/anthropic-raises-124-million-to-build-more-reliable-general-ai-systems](https://www.anthropic.com/news/anthropic-raises-124-million-to-build-more-reliable-general-ai-systems) (28 May 2021): “Dario Amodei (CEO).” Exact match.

---

### 05 · `daniela-anthropic-2021`

**Statement:** Anthropic’s Series A announcement names Daniela Amodei as president.

**Relation:** Daniela Amodei \[daniela-amodei\] → held\_role (held role at) → Anthropic \[anthropic\]

**Relation semantics:** A dated record of an institutional role. This does not establish the full employment interval.

**Temporal scope:** 2021-05-28 · snapshot; kind: snapshot

**Temporal qualification:** The date identifies this documented announcement or publication; it does not establish a continuing state.

**Qualification / scope limits:** This is a historical role snapshot. Neither the appointment date nor the end of the role is established by this record.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-17

**Evidence coverage:** Supporting evidence: primary · 1 source

**Structured attributes:**

```json
{
  "role": "President"
}
```

#### Evidence 1 · `evidence-daniela-anthropic-2021`

**Source title:** Anthropic raises $124 million to build more reliable, general AI systems

**Source ID:** source-anthropic-series-a

**Publisher / authors:** Anthropic / Anthropic

**Source role relative to this claim:** primary

**Evidence role:** supports

**Exact source excerpt:** Daniela Amodei (President)

**Locator:** Second body paragraph

**Canonical source:** [Anthropic raises $124 million to build more reliable, general AI systems](https://www.anthropic.com/news/anthropic-raises-124-million-to-build-more-reliable-general-ai-systems)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2021-05-28

**Source / version description:** Dated page, inspected at retrieval

**Version date:** Not separately recorded

**Source accessed:** 2026-09-17

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-17

**Verification note:** Source passage inspected by an automated research assistant. Human editorial review is pending.

**Human decision:** YES

**Notes:**

Audit 2: Same paragraph: “Daniela Amodei (President).” Exact match.

---

### 06 · `hassabis-deepmind-2023`

**Statement:** Demis Hassabis stated that he would lead the combined Google DeepMind unit.

**Relation:** Demis Hassabis \[demis-hassabis\] → held\_role (held role at) → Google DeepMind \[google-deepmind\]

**Relation semantics:** A dated record of an institutional role. This does not establish the full employment interval.

**Temporal scope:** 2023-04-20 · snapshot; kind: snapshot

**Temporal qualification:** The date identifies this documented announcement or publication; it does not establish a continuing state.

**Qualification / scope limits:** The source is Hassabis’s own message. This is an announcement snapshot, without an inferred end date.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-17

**Evidence coverage:** Supporting evidence: primary · 1 source

**Structured attributes:**

```json
{
  "role": "Unit leader"
}
```

#### Evidence 1 · `evidence-hassabis-deepmind-2023`

**Source title:** Announcing Google DeepMind

**Source ID:** source-deepmind-combination

**Publisher / authors:** Google DeepMind / Demis Hassabis

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** Hassabis says he is excited to be leading the newly combined unit.

**Locator:** Staff message, combination paragraph and signature

**Canonical source:** [Announcing Google DeepMind](https://deepmind.google/blog/announcing-google-deepmind/)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2023-04-20

**Source / version description:** Dated page, inspected at retrieval

**Version date:** Not separately recorded

**Source accessed:** 2026-09-17

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-17

**Verification note:** Source passage inspected by an automated research assistant. Human editorial review is pending.

**Human decision:** YES

**Notes:**

Audit 1: The role attribute "Unit leader" is an editorial normalisation; the announcement did not use that term. Hassabis was already CEO of DeepMind; this record captures the forward-looking leadership statement for the combined entity, which is appropriate for the snapshot kind.

Audit 2: [https://deepmind.google/blog/announcing-google-deepmind/](https://deepmind.google/blog/announcing-google-deepmind/) (20 Apr 2023): Hassabis states he is “excited to be leading this unit.” Snapshot of announced leadership correctly scoped.

---

## Institutions

### 07 · `deepmind-combined-2023`

**Statement:** DeepMind was announced as joining the Brain team in a combined unit called Google DeepMind.

**Relation:** DeepMind \[deepmind\] → combined\_into (combined into) → Google DeepMind \[google-deepmind\]

**Relation semantics:** An announced organisational combination; not a claim that the predecessor was a separate legal company.

**Temporal scope:** 2023-04-20 · event; kind: event

**Temporal qualification:** The date identifies this documented announcement or publication; it does not establish a continuing state.

**Qualification / scope limits:** An organisational combination, not an inferred legal-entity merger or an acquisition transaction.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-17

**Evidence coverage:** Supporting evidence: primary · 1 source

#### Evidence 1 · `evidence-deepmind-combined-2023`

**Source title:** Announcing Google DeepMind

**Source ID:** source-deepmind-combination

**Publisher / authors:** Google DeepMind / Demis Hassabis

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** The staff message says DeepMind and the Brain team will join in a single unit named Google DeepMind.

**Locator:** Staff message, paragraph beginning That’s why today

**Canonical source:** [Announcing Google DeepMind](https://deepmind.google/blog/announcing-google-deepmind/)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2023-04-20

**Source / version description:** Dated page, inspected at retrieval

**Version date:** Not separately recorded

**Source accessed:** 2026-09-17

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-17

**Verification note:** Source passage inspected by an automated research assistant. Human editorial review is pending.

**Human decision:** YES

**Notes:**

Audit 2: Same page: DeepMind and the Brain team “will be joining forces as a single, focused unit called Google DeepMind.” Organisational combination correctly scoped (not a legal-entity merger claim).

---

### 08 · `brain-combined-2023`

**Statement:** The Brain team from Google Research was announced as joining DeepMind in Google DeepMind.

**Relation:** Google Brain \[google-brain\] → combined\_into (combined into) → Google DeepMind \[google-deepmind\]

**Relation semantics:** An announced organisational combination; not a claim that the predecessor was a separate legal company.

**Temporal scope:** 2023-04-20 · event; kind: event

**Temporal qualification:** The date identifies this documented announcement or publication; it does not establish a continuing state.

**Qualification / scope limits:** The source identifies a research team; this record does not treat Brain as a separate legal company.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-17

**Evidence coverage:** Supporting evidence: primary · 1 source

#### Evidence 1 · `evidence-brain-combined-2023`

**Source title:** Announcing Google DeepMind

**Source ID:** source-deepmind-combination

**Publisher / authors:** Google DeepMind / Demis Hassabis

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** Google Research’s Brain team is one of the two groups named in the combination.

**Locator:** Staff message, paragraph beginning That’s why today

**Canonical source:** [Announcing Google DeepMind](https://deepmind.google/blog/announcing-google-deepmind/)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2023-04-20

**Source / version description:** Dated page, inspected at retrieval

**Version date:** Not separately recorded

**Source accessed:** 2026-09-17

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-17

**Verification note:** Source passage inspected by an automated research assistant. Human editorial review is pending.

**Human decision:** YES

**Notes:**

Audit 2: Same sentence/paragraph identifies the Brain team from Google Research as one of the two groups joining the unit. Correct.

---

## Capital

### 09 · `microsoft-investment-2023`

**Statement:** Microsoft announced a multiyear, multibillion-dollar investment in OpenAI.

**Relation:** Microsoft \[microsoft\] → investment\_announced (announced investment in) → OpenAI \[openai\]

**Relation semantics:** A counterparty announced an investment. Amount and transaction stage are qualified separately.

**Temporal scope:** 2023-01-23 · event; kind: event

**Temporal qualification:** The date identifies this documented announcement or publication; it does not establish a continuing state.

**Qualification / scope limits:** The announcement does not disclose an exact amount or realised disbursements; none are inferred.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-17

**Evidence coverage:** Supporting evidence: primary · 1 source

**Structured attributes:**

```json
{
  "transactionStage": "announced"
}
```

#### Evidence 1 · `evidence-microsoft-investment-2023`

**Source title:** Microsoft and OpenAI extend partnership

**Source ID:** source-microsoft-partnership

**Publisher / authors:** Microsoft / Microsoft

**Source role relative to this claim:** primary

**Evidence role:** supports

**Exact source excerpt:** multiyear, multibillion dollar investment

**Locator:** Opening paragraph

**Canonical source:** [Microsoft and OpenAI extend partnership](https://blogs.microsoft.com/blog/2023/01/23/microsoftandopenaiextendpartnership/)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2023-01-23

**Source / version description:** Dated page, inspected at retrieval

**Version date:** Not separately recorded

**Source accessed:** 2026-09-17

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-17

**Verification note:** Source passage inspected by an automated research assistant. Human editorial review is pending.

**Human decision:** YES

**Notes:**

Audit 1: This is the third phase of the Microsoft–OpenAI partnership (following 2019 and 2021 investments). The excerpt is verbatim from the source. No exact dollar figure was disclosed in the announcement; widely reported as approximately $10 billion in subsequent coverage but that figure is not part of this claim.

Audit 2: [https://blogs.microsoft.com/blog/2023/01/23/microsoftandopenaiextendpartnership/](https://blogs.microsoft.com/blog/2023/01/23/microsoftandopenaiextendpartnership/) (23 Jan 2023): “multiyear, multibillion dollar investment.” Exact phrasing; amount and disbursements correctly left undisclosed.

---

### 10 · `amazon-investment-2023`

**Statement:** Anthropic announced that Amazon would invest up to $4 billion in the company.

**Relation:** Amazon \[amazon\] → investment\_announced (announced investment in) → Anthropic \[anthropic\]

**Relation semantics:** A counterparty announced an investment. Amount and transaction stage are qualified separately.

**Temporal scope:** 2023-09-25 · event; kind: event

**Temporal qualification:** The date identifies this documented announcement or publication; it does not establish a continuing state.

**Qualification / scope limits:** An upper-bound announced commitment, not evidence that $4 billion had already been paid. Subsequent transactions are outside this record.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-17

**Evidence coverage:** Supporting evidence: primary · 1 source

**Structured attributes:**

```json
{
  "transactionStage": "announced",
  "amount": {
    "value": 4000000000,
    "currency": "USD",
    "bound": "up_to",
    "scope": "transaction"
  }
}
```

#### Evidence 1 · `evidence-amazon-investment-2023`

**Source title:** Expanding access to safer AI with Amazon

**Source ID:** source-amazon-partnership

**Publisher / authors:** Anthropic / Anthropic

**Source role relative to this claim:** primary

**Evidence role:** supports

**Exact source excerpt:** Amazon will invest up to $4 billion in Anthropic.

**Locator:** Opening paragraph

**Canonical source:** [Expanding access to safer AI with Amazon](https://www.anthropic.com/news/anthropic-amazon)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2023-09-25

**Source / version description:** Dated page, inspected at retrieval

**Version date:** Not separately recorded

**Source accessed:** 2026-09-17

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-17

**Verification note:** Source passage inspected by an automated research assistant. Human editorial review is pending.

**Human decision:** YES

**Notes:**

Audit 2: [https://www.anthropic.com/news/anthropic-amazon](https://www.anthropic.com/news/anthropic-amazon) (25 Sep 2023): “Amazon will invest up to $4 billion in Anthropic.” Upper-bound announced commitment correctly scoped.

---

### 11 · `sequoia-xai-2024`

**Statement:** xAI named Sequoia Capital as a participant in its Series B financing.

**Relation:** Sequoia Capital \[sequoia\] → participated\_in\_round (participated in funding for) → xAI \[xai\]

**Relation semantics:** Named participation in a financing round. The full round total is not attributed to this investor.

**Temporal scope:** 2024-05-26 · event; kind: event

**Temporal qualification:** The date identifies this documented announcement or publication; it does not establish a continuing state.

**Qualification / scope limits:** Sequoia’s individual contribution and ownership percentage are not disclosed. The $6 billion round total is a separate claim.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-17

**Evidence coverage:** Supporting evidence: primary · 1 source

**Structured attributes:**

```json
{
  "transactionStage": "announced"
}
```

#### Evidence 1 · `evidence-sequoia-xai-2024`

**Source title:** Series B funding round

**Source ID:** source-xai-series-b

**Publisher / authors:** xAI / xAI

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** Sequoia Capital appears in the list of participating investors.

**Locator:** First full paragraph below the announcement divider

**Canonical source:** [Series B funding round](https://x.ai/news/series-b)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2024-05-26

**Source / version description:** 2024 announcement retained on a subsequently rebranded website

**Version date:** Not separately recorded

**Source accessed:** 2026-09-17

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-17

**Verification note:** Source passage inspected by an automated research assistant. Human editorial review is pending.

**Human decision:** YES

**Notes:**

Audit 1: Source fetched and confirmed. Exact investor list from x.ai/news/series-b: "Valor Equity Partners, Vy Capital, Andreessen Horowitz, Sequoia Capital, Fidelity Management & Research Company, Prince Alwaleed Bin Talal and Kingdom Holding, amongst others." Sequoia is explicitly named.

Audit 2: [https://x.ai/news/series-b](https://x.ai/news/series-b) (26 May 2024): Sequoia Capital listed among participating investors in the Series B. Individual contribution correctly left undisclosed.

---

### 12 · `xai-round-total-2024`

**Statement:** xAI announced a $6 billion Series B funding round.

**Relation:** xAI \[xai\] → announced\_funding (announced funding of) → 6000000000 USD \[literal; no graph edge\]

**Relation semantics:** The reported total of a financing round, not a valuation or any one investor’s contribution.

**Temporal scope:** 2024-05-26 · event; kind: event

**Temporal qualification:** The date identifies this documented announcement or publication; it does not establish a continuing state.

**Qualification / scope limits:** This is the total announced round, not valuation, realised spending, or an individual investor’s contribution. Literal claims appear in the inspector and timeline, without invented graph nodes.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-17

**Evidence coverage:** Supporting evidence: primary · 1 source

**Structured attributes:**

```json
{
  "transactionStage": "announced",
  "amount": {
    "value": 6000000000,
    "currency": "USD",
    "bound": "exact",
    "scope": "round_total"
  }
}
```

#### Evidence 1 · `evidence-xai-round-total-2024`

**Source title:** Series B funding round

**Source ID:** source-xai-series-b

**Publisher / authors:** xAI / xAI

**Source role relative to this claim:** primary

**Evidence role:** supports

**Exact source excerpt:** Our Series B funding round of $6 billion

**Locator:** Opening announcement sentence

**Canonical source:** [Series B funding round](https://x.ai/news/series-b)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2024-05-26

**Source / version description:** 2024 announcement retained on a subsequently rebranded website

**Version date:** Not separately recorded

**Source accessed:** 2026-09-17

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-17

**Verification note:** Source passage inspected by an automated research assistant. Human editorial review is pending.

**Human decision:** YES

**Notes:**

Audit 1: Excerpt confirmed verbatim from the canonical source. xAI subsequently raised a $6 billion Series C (November 2024) at a $50 billion valuation; that is a separate event and does not affect this claim.

Audit 2: Same page: “Our Series B funding round of $6 billion.” Exact total; not valuation or individual contributions.

---

## Compute

### 13 · `openai-cloud-2023`

**Statement:** Microsoft’s partnership announcement described Azure as OpenAI’s exclusive cloud provider.

**Relation:** OpenAI \[openai\] → selected\_cloud\_provider (selected cloud provider) → Microsoft \[microsoft\]

**Relation semantics:** A dated announcement describing cloud provision. Direction runs from customer to provider; this does not assert payment or continuing exclusivity.

**Temporal scope:** 2023-01-23 · event; kind: event

**Temporal qualification:** The date identifies this documented announcement or publication; it does not establish a continuing state.

**Qualification / scope limits:** Azure is represented through its Microsoft counterparty. This describes the January 2023 announcement, not present-day exclusivity or an amount spent.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-17

**Evidence coverage:** Supporting evidence: primary · 1 source

**Structured attributes:**

```json
{
  "transactionStage": "announced"
}
```

#### Evidence 1 · `evidence-openai-cloud-2023`

**Source title:** Microsoft and OpenAI extend partnership

**Source ID:** source-microsoft-partnership

**Publisher / authors:** Microsoft / Microsoft

**Source role relative to this claim:** primary

**Evidence role:** supports

**Exact source excerpt:** Azure will power all OpenAI workloads

**Locator:** Bullet titled Exclusive cloud provider

**Canonical source:** [Microsoft and OpenAI extend partnership](https://blogs.microsoft.com/blog/2023/01/23/microsoftandopenaiextendpartnership/)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2023-01-23

**Source / version description:** Dated page, inspected at retrieval

**Version date:** Not separately recorded

**Source accessed:** 2026-09-17

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-17

**Verification note:** Source passage inspected by an automated research assistant. Human editorial review is pending.

**Human decision:** YES

**Notes:**

Audit 1: The announcement bullet is explicitly titled "Exclusive cloud provider" and reads in full: "As OpenAI's exclusive cloud provider, Azure will power all OpenAI workloads across research, products and API services." The excerpt in the evidence entry is accurate but partial; the bullet heading supplies the "exclusive" language that the claim depends on. The claim is correctly scoped to this January 2023 announcement. Note for future maintenance: exclusivity was subsequently modified as part of the Stargate project announcement (January 2025), when Microsoft moved to a right-of-first-refusal model for new capacity. That development does not affect this claim but should be represented in a separate record if the graph tracks the relationship over time.

Audit 2: Microsoft partnership page: “As OpenAI’s exclusive cloud provider, Azure will power all OpenAI workloads…” Announcement snapshot correctly scoped.

---

### 14 · `anthropic-cloud-2023`

**Statement:** Anthropic announced AWS as its primary cloud provider for mission-critical workloads.

**Relation:** Anthropic \[anthropic\] → selected\_cloud\_provider (selected cloud provider) → Amazon Web Services \[aws\]

**Relation semantics:** A dated announcement describing cloud provision. Direction runs from customer to provider; this does not assert payment or continuing exclusivity.

**Temporal scope:** 2023-09-25 · event; kind: event

**Temporal qualification:** The date identifies this documented announcement or publication; it does not establish a continuing state.

**Qualification / scope limits:** Primary does not mean exclusive. The announcement concerns future provision and identifies other existing solutions; no expenditure is stated.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-17

**Evidence coverage:** Supporting evidence: primary · 1 source

**Structured attributes:**

```json
{
  "transactionStage": "announced"
}
```

#### Evidence 1 · `evidence-anthropic-cloud-2023`

**Source title:** Expanding access to safer AI with Amazon

**Source ID:** source-amazon-partnership

**Publisher / authors:** Anthropic / Anthropic

**Source role relative to this claim:** primary

**Evidence role:** supports

**Exact source excerpt:** AWS will become Anthropic’s primary cloud provider

**Locator:** Second body paragraph

**Canonical source:** [Expanding access to safer AI with Amazon](https://www.anthropic.com/news/anthropic-amazon)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2023-09-25

**Source / version description:** Dated page, inspected at retrieval

**Version date:** Not separately recorded

**Source accessed:** 2026-09-17

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-17

**Verification note:** Source passage inspected by an automated research assistant. Human editorial review is pending.

**Human decision:** YES

**Notes:**

Audit 1: The claim adds "for mission-critical workloads" which is not in the exact excerpt. The source text does qualify the primary-provider designation; confirm that the full sentence in the source supports this scoping before promoting. The "primary" / "not exclusive" distinction in the qualification is correctly drawn and contrasts usefully with claim 13.

Audit 2: Amazon/Anthropic page: “AWS will become Anthropic’s primary cloud provider for mission critical workloads…” Primary (not exclusive) correctly scoped.

---

### 15 · `xai-colossus-2024`

**Statement:** NVIDIA described Colossus as being used to train xAI’s Grok models.

**Relation:** xAI \[xai\] → uses\_infrastructure (uses infrastructure) → Colossus \[colossus\]

**Relation semantics:** Use of a named compute asset at the documented date. Does not establish ownership.

**Temporal scope:** 2024-10-28 · snapshot; kind: snapshot

**Temporal qualification:** The date identifies this documented announcement or publication; it does not establish a continuing state.

**Qualification / scope limits:** This is a supplier’s account of use at the stated date; legal ownership and independent performance verification are not established.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-17

**Evidence coverage:** Supporting evidence: primary · 1 source

#### Evidence 1 · `evidence-xai-colossus-2024`

**Source title:** NVIDIA Ethernet Networking Accelerates World’s Largest AI Supercomputer, Built by xAI

**Source ID:** source-nvidia-colossus

**Publisher / authors:** NVIDIA / NVIDIA

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** The release says Colossus is being used to train xAI’s Grok model family.

**Locator:** Second body paragraph

**Canonical source:** [NVIDIA Ethernet Networking Accelerates World’s Largest AI Supercomputer, Built by xAI](https://nvidianews.nvidia.com/news/spectrum-x-ethernet-networking-xai-colossus)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2024-10-28

**Source / version description:** Dated page, inspected at retrieval

**Version date:** Not separately recorded

**Source accessed:** 2026-09-17

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-17

**Verification note:** Source passage inspected by an automated research assistant. Human editorial review is pending.

**Human decision:** YES

**Notes:**

Audit 2: [https://nvidianews.nvidia.com/news/spectrum-x-ethernet-networking-xai-colossus](https://nvidianews.nvidia.com/news/spectrum-x-ethernet-networking-xai-colossus) (28 Oct 2024): Colossus “is being used to train xAI’s Grok family of large language models.” Supplier account of use correctly scoped.

---

### 16 · `colossus-nvidia-2024`

**Statement:** NVIDIA described Colossus as comprising 100,000 NVIDIA Hopper GPUs.

**Relation:** Colossus \[colossus\] → uses\_hardware\_from (uses hardware from) → NVIDIA \[nvidia\]

**Relation semantics:** Supplier hardware is reported in a compute asset. No purchase price or direct purchasing contract is implied.

**Temporal scope:** 2024-10-28 · snapshot; kind: snapshot

**Temporal qualification:** The date identifies this documented announcement or publication; it does not establish a continuing state.

**Qualification / scope limits:** The supplier also described a planned expansion. This snapshot includes only the stated 100,000-GPU configuration, without inferring purchase price or present capacity.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-17

**Evidence coverage:** Supporting evidence: primary · 1 source

**Structured attributes:**

```json
{
  "quantity": {
    "value": 100000,
    "unit": "NVIDIA Hopper GPUs"
  }
}
```

#### Evidence 1 · `evidence-colossus-nvidia-2024`

**Source title:** NVIDIA Ethernet Networking Accelerates World’s Largest AI Supercomputer, Built by xAI

**Source ID:** source-nvidia-colossus

**Publisher / authors:** NVIDIA / NVIDIA

**Source role relative to this claim:** primary

**Evidence role:** supports

**Exact source excerpt:** comprising 100,000 NVIDIA Hopper GPUs

**Locator:** Opening paragraph

**Canonical source:** [NVIDIA Ethernet Networking Accelerates World’s Largest AI Supercomputer, Built by xAI](https://nvidianews.nvidia.com/news/spectrum-x-ethernet-networking-xai-colossus)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2024-10-28

**Source / version description:** Dated page, inspected at retrieval

**Version date:** Not separately recorded

**Source accessed:** 2026-09-17

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-17

**Verification note:** Source passage inspected by an automated research assistant. Human editorial review is pending.

**Human decision:** YES

**Notes:**

Audit 1: The same NVIDIA release described a planned expansion to 200,000 GPUs. The qualification correctly records only the stated October 2024 configuration.

Audit 2: Same release: “comprising 100,000 NVIDIA Hopper GPUs.” Snapshot of stated configuration; planned expansion noted but not claimed here.

---

## Governance

### 17 · `anthropic-rsp-2023`

**Statement:** Anthropic announced publication of its initial Responsible Scaling Policy.

**Relation:** Anthropic \[anthropic\] → published (published) → Responsible Scaling Policy (2023) \[rsp-2023\]

**Relation semantics:** Publication of a specific document or version. Publication of a policy is not evidence of implementation.

**Temporal scope:** 2023-09-19 · event; kind: event

**Temporal qualification:** The date identifies this documented announcement or publication; it does not establish a continuing state.

**Qualification / scope limits:** Publication is not proof of implementation or effectiveness. Later revisions are distinct documents and are not represented by this node.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-17

**Evidence coverage:** Supporting evidence: primary · 1 source

#### Evidence 1 · `evidence-anthropic-rsp-2023`

**Source title:** Introducing Anthropic’s Responsible Scaling Policy

**Source ID:** source-rsp-announcement

**Publisher / authors:** Anthropic / Anthropic

**Source role relative to this claim:** primary

**Evidence role:** supports

**Exact source excerpt:** Today, we’re publishing our Responsible Scaling Policy (RSP)

**Locator:** Opening paragraph

**Canonical source:** [Introducing Anthropic’s Responsible Scaling Policy](https://www.anthropic.com/news/anthropics-responsible-scaling-policy)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2023-09-19

**Source / version description:** Dated page, inspected at retrieval

**Version date:** Not separately recorded

**Source accessed:** 2026-09-17

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-17

**Verification note:** Source passage inspected by an automated research assistant. Human editorial review is pending.

**Human decision:** YES

**Notes:**

Audit 1: Page fetched and confirmed. Excerpt is verbatim from the opening sentence of the announcement.

Audit 2: [https://www.anthropic.com/news/anthropics-responsible-scaling-policy](https://www.anthropic.com/news/anthropics-responsible-scaling-policy) (19 Sep 2023): “Today, we’re publishing our Responsible Scaling Policy (RSP).” Publication event correctly scoped.

---

### 18 · `deepmind-fsf-2024`

**Statement:** Google DeepMind introduced its initial Frontier Safety Framework.

**Relation:** Google DeepMind \[google-deepmind\] → published (published) → Frontier Safety Framework (2024) \[fsf-2024\]

**Relation semantics:** Publication of a specific document or version. Publication of a policy is not evidence of implementation.

**Temporal scope:** 2024-05-17 · event; kind: event

**Temporal qualification:** The date identifies this documented announcement or publication; it does not establish a continuing state.

**Qualification / scope limits:** The announcement called it exploratory and targeted full implementation by early 2025. Introduction is not evidence that implementation was complete.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-17

**Evidence coverage:** Supporting evidence: primary · 1 source

#### Evidence 1 · `evidence-deepmind-fsf-2024`

**Source title:** Introducing the Frontier Safety Framework

**Source ID:** source-fsf-announcement

**Publisher / authors:** Google DeepMind / Anca Dragan; Helen King; Allan Dafoe

**Source role relative to this claim:** primary

**Evidence role:** supports

**Exact source excerpt:** Today, we are introducing our Frontier Safety Framework

**Locator:** Opening section, framework introduction

**Canonical source:** [Introducing the Frontier Safety Framework](https://deepmind.google/blog/introducing-the-frontier-safety-framework/)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2024-05-17

**Source / version description:** Dated page, inspected at retrieval

**Version date:** Not separately recorded

**Source accessed:** 2026-09-17

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-17

**Verification note:** Source passage inspected by an automated research assistant. Human editorial review is pending.

**Human decision:** YES

**Notes:**

Audit 2: [https://deepmind.google/blog/introducing-the-frontier-safety-framework/](https://deepmind.google/blog/introducing-the-frontier-safety-framework/) (17 May 2024): “Today, we are introducing our Frontier Safety Framework.” Exploratory / targeted full implementation by early 2025 correctly noted in scope limits.

---

### 19 · `openai-o1-card-2024`

**Statement:** OpenAI published the o1 System Card version labelled updated December 5, 2024.

**Relation:** OpenAI \[openai\] → published (published) → OpenAI o1 System Card (December 2024) \[o1-card-2024\]

**Relation semantics:** Publication of a specific document or version. Publication of a policy is not evidence of implementation.

**Temporal scope:** 2024-12-05 · event; kind: event

**Temporal qualification:** The date identifies this documented announcement or publication; it does not establish a continuing state.

**Qualification / scope limits:** The page combines several testing periods. The record identifies this update, not the original publication date of every passage.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-17

**Evidence coverage:** Supporting evidence: primary · 1 source

#### Evidence 1 · `evidence-openai-o1-card-2024`

**Source title:** OpenAI o1 System Card

**Source ID:** source-o1-card

**Publisher / authors:** OpenAI / OpenAI

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** The page identifies OpenAI as publisher and labels the system card as updated on December 5, 2024.

**Locator:** Page title, update label and introduction

**Canonical source:** [OpenAI o1 System Card](https://openai.com/index/openai-o1-system-card/)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2024-12-05

**Source / version description:** Page labelled Updated: December 5, 2024; includes multiple evaluation periods

**Version date:** 2024-12-05

**Source accessed:** 2026-09-17

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-17

**Verification note:** Source passage inspected by an automated research assistant. Human editorial review is pending.

**Human decision:** YES

**Notes:**

Audit 1: Confirmed from openai.com: page header reads "Updated: December 5, 2024." The document was also posted to arXiv as 2412.16720v1 on December 21, 2024; the arXiv submission postdates the OpenAI page and does not affect the claim date.

Audit 2: [https://openai.com/index/openai-o1-system-card/](https://openai.com/index/openai-o1-system-card/) labelled “Updated: December 5, 2024.” Publication/update of the system card correctly scoped.

---

### 20 · `o1-evaluates-deception-2024`

**Statement:** The o1 System Card lists deceptive alignment among categories covered by external red teamers.

**Relation:** OpenAI o1 System Card (December 2024) \[o1-card-2024\] → reports\_evaluation\_of (reports evaluation of) → Deceptive alignment \[deceptive-alignment\]

**Relation semantics:** A document names a concept as an evaluation category. This is not a finding that the evaluated system exhibits the property.

**Temporal scope:** 2024-12-05 · event; kind: event

**Temporal qualification:** The date identifies this documented announcement or publication; it does not establish a continuing state.

**Qualification / scope limits:** A named evaluation category does not establish deceptive alignment in the model, nor a direct intellectual lineage from the learned-optimization paper.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-17

**Evidence coverage:** Supporting evidence: primary · 1 source

#### Evidence 1 · `evidence-o1-evaluates-deception-2024`

**Source title:** OpenAI o1 System Card

**Source ID:** source-o1-card

**Publisher / authors:** OpenAI / OpenAI

**Source role relative to this claim:** primary

**Evidence role:** supports

**Exact source excerpt:** Red teamers covered categories that spanned deceptive alignment

**Locator:** External red teaming, paragraph describing October–December testing

**Canonical source:** [OpenAI o1 System Card](https://openai.com/index/openai-o1-system-card/)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2024-12-05

**Source / version description:** Page labelled Updated: December 5, 2024; includes multiple evaluation periods

**Version date:** 2024-12-05

**Source accessed:** 2026-09-17

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-17

**Verification note:** Source passage inspected by an automated research assistant. Human editorial review is pending.

**Human decision:** YES

**Notes:**

Audit 1: Confirmed from arXiv PDF (2412.16720). Full sentence: "Red teamers covered categories that spanned deceptive alignment, AI R&D capabilities, cybersecurity, content policy violations, assessing both the default behavior of these models as well as applying adversarial attacks." The excerpt is accurate; it appears in the October–December o1 red-team paragraph, distinct from the earlier o1-preview period.

Audit 2: Same system card, External red teaming section: “Red teamers covered categories that spanned deceptive alignment…” Named evaluation category correctly scoped (not a finding that the model exhibits the property).

---

## Ideas / intellectual provenance

### 21 · `good-authorship-1965`

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

**Human decision:** YES

**Notes:**

Audit 1: The filename date discrepancy (mirror says 1966, repository copyright says 1965) is correctly handled by the qualification. Advances in Computers vol. 6 was published in 1965; the volume copyright date takes precedence over the mirror filename.

Audit 2: Primary PDF (gwern mirror of Advances in Computers vol. 6) and Virginia Tech repository record both credit I. J. Good / Irving John Good. 1965 copyright / volume metadata supported; reprint status noted.

---

### 22 · `good-discusses-explosion-1965`

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

**Human decision:** YES

**Notes:**

Audit 2: Same paper (section 2): “an ultraintelligent machine could design even better machines; there would then unquestionably be an ‘intelligence explosion’.” Explicit discussion correctly scoped.

---

### 23 · `miri-iem-2013`

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

**Human decision:** YES

**Notes:**

Audit 2: [https://intelligence.org/files/IEM.pdf](https://intelligence.org/files/IEM.pdf) title page identifies technical report 2013-1 published by Machine Intelligence Research Institute. Year and report number match.

---

### 24 · `yudkowsky-iem-2013`

**Statement:** Intelligence Explosion Microeconomics credits Eliezer Yudkowsky as author.

**Relation:** Eliezer Yudkowsky \[eliezer-yudkowsky\] → authored (authored) → Intelligence Explosion Microeconomics \[iem-2013\]

**Relation semantics:** Authorship as credited in the document. Does not imply sole authorship.

**Temporal scope:** 2013 · event; kind: event

**Temporal qualification:** The date identifies this documented announcement or publication; it does not establish a continuing state.

**Qualification / scope limits:** Authorship alone does not establish priority for the concepts discussed.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-17

**Evidence coverage:** Supporting evidence: primary · 1 source

#### Evidence 1 · `evidence-yudkowsky-iem-2013`

**Source title:** Intelligence Explosion Microeconomics

**Source ID:** source-iem

**Publisher / authors:** Machine Intelligence Research Institute / Eliezer Yudkowsky

**Source role relative to this claim:** primary

**Evidence role:** supports

**Exact source excerpt:** Eliezer Yudkowsky

**Locator:** PDF page 1, title and byline

**Canonical source:** [Intelligence Explosion Microeconomics](https://intelligence.org/files/IEM.pdf)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2013

**Source / version description:** Technical report 2013-1; last modified September 13, 2013

**Version date:** 2013-09-13

**Source accessed:** 2026-09-17

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-17

**Verification note:** Source passage inspected by an automated research assistant. Human editorial review is pending.

**Human decision:** YES

**Notes:**

Audit 2: Same PDF: “Eliezer Yudkowsky” on title/byline. Authorship credit exact.

---

### 25 · `iem-cites-good-2013`

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

**Human decision:** YES

**Notes:**

Audit 2: Same report opens by identifying and quoting Good’s 1965 paper by title and the machine-design / intelligence-explosion argument. Explicit citation + discussion.

---

### 26 · `iem-discusses-explosion-2013`

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

**Human decision:** YES

**Notes:**

Audit 1: The excerpt confirms that Good's thesis is the stated subject. The phrase "cognitive reinvestment" appears in the body of the report as the primary mechanism Yudkowsky uses to formalise the explosion argument; it is not in the abstract excerpt but is present in the document, so the claim as worded is supported.

Audit 2: Abstract and body examine “I. J. Good’s thesis of the ‘intelligence explosion’” via cognitive reinvestment. Subject correctly scoped.

---

### 27 · `risks-discusses-deception-2021`

**Statement:** Version 3 of Risks from Learned Optimization discusses deceptive alignment in section 4.

**Relation:** Risks from Learned Optimization (v3) \[risks-v3\] → discusses (discusses) → Deceptive alignment \[deceptive-alignment\]

**Relation semantics:** The concept is explicitly discussed in the document. This makes no earliest-use, invention or transmission claim.

**Temporal scope:** 2021-12-01 · event; kind: event

**Temporal qualification:** The date identifies this documented announcement or publication; it does not establish a continuing state.

**Qualification / scope limits:** The paper was first submitted in 2019, but this claim is scoped to the inspected 2021 HTML version. No earliest-use claim is made.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-17

**Evidence coverage:** Supporting evidence: primary · 1 source

#### Evidence 1 · `evidence-risks-discusses-deception-2021`

**Source title:** Risks from Learned Optimization in Advanced Machine Learning Systems

**Source ID:** source-learned-optimization

**Publisher / authors:** arXiv / Evan Hubinger; Chris van Merwijk; Vladimir Mikulik; Joar Skalse; Scott Garrabrant

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** Section 4 describes a mesa-optimizer pursuing the base objective instrumentally in order to avoid modification.

**Locator:** Section 4, Deceptive alignment, opening paragraphs

**Canonical source:** [Risks from Learned Optimization in Advanced Machine Learning Systems](https://arxiv.org/abs/1906.01820)

**Evidence URL:** [Inspected version](https://arxiv.org/html/1906.01820v3)

**Source publication date:** 2019-06-05

**Source / version description:** arXiv:1906.01820v3; claims scoped to this version, not first use in 2019

**Version date:** 2021-12-01

**Source accessed:** 2026-09-17

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-17

**Verification note:** Source passage inspected by an automated research assistant. Human editorial review is pending.

**Human decision:** YES

**Notes:**

Audit 1: Confirmed via arXiv PDF and the LessWrong sequence, which explicitly labels its fourth post "Deceptive Alignment" and states it corresponds to section 4 of the paper. The section heading "Deceptive alignment" appears in the PDF. Scoping to v3 (2021-12-01) is appropriate given the evidence URL points to the v3 HTML rendering.

Audit 2: arXiv:1906.01820v3 (HTML, 1 Dec 2021) Section 4 is titled “Deceptive alignment” and discusses mesa-optimizers pursuing the base objective instrumentally to avoid modification. Version-scoped correctly.

---

### 28 · `rsp-credits-arc-2023`

**Statement:** The RSP announcement explicitly credited ARC Evals’ framework as inspiring Anthropic’s approach.

**Relation:** Responsible Scaling Policy (2023) \[rsp-2023\] → explicitly\_credits (explicitly credits) → ARC Evals \[arc-evals\]

**Relation semantics:** A document expressly attributes intellectual or practical contribution to a named actor, with the scope retained in the claim.

**Temporal scope:** 2023-09-19 · event; kind: event

**Temporal qualification:** The date identifies this documented announcement or publication; it does not establish a continuing state.

**Qualification / scope limits:** The credit is specific to this policy approach. It does not imply a shared ideology or prove a broader causal account.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-17

**Evidence coverage:** Supporting evidence: primary · 1 source

#### Evidence 1 · `evidence-rsp-credits-arc-2023`

**Source title:** Introducing Anthropic’s Responsible Scaling Policy

**Source ID:** source-rsp-announcement

**Publisher / authors:** Anthropic / Anthropic

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** Anthropic credits ARC Evals’ evaluation expertise and states that its broader Responsible Scaling Policy framework inspired Anthropic’s approach.

**Locator:** Acknowledgements, final paragraph before footnotes

**Canonical source:** [Introducing Anthropic’s Responsible Scaling Policy](https://www.anthropic.com/news/anthropics-responsible-scaling-policy)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2023-09-19

**Source / version description:** Dated page, inspected at retrieval

**Version date:** Not separately recorded

**Source accessed:** 2026-09-17

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-17

**Verification note:** Source passage inspected by an automated research assistant. Human editorial review is pending.

**Human decision:** YES

**Notes:**

Audit 1: Page fetched and passage confirmed. The exact text of the acknowledgement paragraph reads: "We also recognize ARC Evals' leadership in originating and spearheading the development of their broader ARC Responsible Scaling Policy framework, which inspired our approach." This is more specific than the paraphrase in the evidence entry, which is accurate but elides "originating and spearheading." The claim as worded ("explicitly credited ARC Evals' framework as inspiring Anthropic's approach") is fully supported.

Audit 2: Anthropic RSP announcement acknowledgements: explicitly credits ARC Evals’ evaluation expertise and states that ARC’s broader Responsible Scaling Policy framework “inspired our approach.” Credit correctly scoped.

---
