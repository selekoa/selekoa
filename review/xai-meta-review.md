# Selekoa — xAI and Meta atlas

39 claims, grouped by type. These are research seeds; machine checks are not human review. This document is an editorial working aid and is never loaded by the application.

Schema: 2.5. Dataset date: 2026-09-29. Dataset fingerprint: `3d99f826ec29f59a80a60731c6a3448f5426e687c6ffcad38328919d58b93703`.

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

## xAI and Meta / institutions

### 01 · `xm-x-acquisition`

**Statement:** Reuters reported Musk’s announcement that xAI had acquired X.

**Relation:** xAI \[xai\] → acquired (acquired) → X (social media company) \[x-company\]

**Relation semantics:** An acquisition of the named organisation, with timing and scope qualified by the evidence. Distinct from an internal reorganisation or team combination.

**Temporal scope:** 2025-03-28 · announcement; kind: event

**Temporal qualification:** Announcement date, not an independently verified transaction completion date.

**Qualification / scope limits:** Reported acquisition announcement, not an independently checked closing or legal-entity chain. Reuters explicitly says deal specifics and integration arrangements remained unclear.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-29

**Evidence coverage:** Supporting evidence: secondary · 1 source

#### Evidence 1 · `evidence-xm-x-acquisition`

**Source title:** Musk’s social media firm X bought by his AI company, valued at $33 billion

**Source ID:** source-xm-x-acquisition

**Publisher / authors:** Reuters / Investing.com / Greg Bensinger

**Source role relative to this claim:** secondary

**Evidence role:** supports

**Paraphrase (not a quotation):** Musk announced that xAI had acquired X; integration details remained unclear.

**Locator:** Opening Reuters paragraph and paragraph beginning “Much of the deal’s specifics remain unclear”.

**Canonical source:** [Musk’s social media firm X bought by his AI company, valued at $33 billion](https://ca.investing.com/news/stock-market-news/musks-xai-buys-musks-x-social-media-platform-for-33-billion-3929163)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2025-03-28

**Source / version description:** Reuters syndication, published March 28 and updated March 29, 2025.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-29

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-29

**Verification note:** Passage checked by machine against the identified source expression. No human editorial acceptance or independent verification of implementation is implied.

**Human decision:**

**Notes:**

---

### 02 · `xm-spacex-acquisition`

**Statement:** xAI announced that SpaceX had acquired xAI.

**Relation:** SpaceX \[spacex\] → acquired (acquired) → xAI \[xai\]

**Relation semantics:** An acquisition of the named organisation, with timing and scope qualified by the evidence. Distinct from an internal reorganisation or team combination.

**Temporal scope:** 2026-02-02 · announcement; kind: event

**Temporal qualification:** Announcement date, not an independently verified transaction completion date.

**Qualification / scope limits:** First-party announcement only. No valuation, legal succession, later branding identity or independently verified closing is asserted.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-29

**Evidence coverage:** Supporting evidence: primary · 1 source

#### Evidence 1 · `evidence-xm-spacex-acquisition`

**Source title:** xAI joins SpaceX

**Source ID:** source-xm-spacex

**Publisher / authors:** xAI / xAI

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** SpaceX announced that it had acquired xAI.

**Locator:** Single body paragraph beneath the February 2, 2026 heading.

**Canonical source:** [xAI joins SpaceX](https://x.ai/news/xai-joins-spacex)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2026-02-02

**Source / version description:** Dated publisher webpage as retrieved; not an authenticated historical capture.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-29

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-29

**Verification note:** Passage checked by machine against the identified source expression. No human editorial acceptance or independent verification of implementation is implied.

**Human decision:**

**Notes:**

---

### 03 · `xm-meta-name`

**Statement:** Facebook announced Meta as its new company brand.

**Relation:** Facebook (company, historical name) \[facebook-company\] → name\_transition\_announced (announced new name as) → Meta \[meta\]

**Relation semantics:** An explicit historical naming announcement links the earlier named institutional referent to the newly named referent. Dataset identities remain distinct. This is not acquisition, merger, ownership transfer or independently established legal succession.

**Temporal scope:** 2021-10-28 · announcement; kind: event

**Temporal qualification:** Announcement date, not an independently verified transaction completion date.

**Qualification / scope limits:** The source explicitly says the corporate structure is not changing. This is a name announcement, not incorporation, merger or legal succession.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-29

**Evidence coverage:** Supporting evidence: primary · 1 source

**Structured attributes:**

```json
{
  "activityStage": "announced",
  "transitionScope": "name_announcement"
}
```

#### Evidence 1 · `evidence-xm-meta-name`

**Source title:** Introducing Meta: A Social Technology Company

**Source ID:** source-xm-meta-name

**Publisher / authors:** Meta / Meta

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** Meta was introduced as the new company brand while corporate structure remained unchanged.

**Locator:** Opening paragraph and paragraph beginning “Our corporate structure is not changing”.

**Canonical source:** [Introducing Meta: A Social Technology Company](https://about.fb.com/news/2021/10/facebook-company-is-now-meta/)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2021-10-28

**Source / version description:** Page dated October 28, 2021 with November 7, 2022 update shown.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-29

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-29

**Verification note:** Passage checked by machine against the identified source expression. No human editorial acceptance or independent verification of implementation is implied.

**Human decision:**

**Notes:**

---

### 04 · `xm-fair-facebook`

**Statement:** Facebook described FAIR as its AI research organization in its Paris expansion announcement.

**Relation:** FAIR \[fair\] → unit\_of (was a unit of) → Facebook (company, historical name) \[facebook-company\]

**Relation semantics:** A documented internal research team or unit within an organisation. Does not establish a separate legal subsidiary or an ownership transaction.

**Temporal scope:** 2018-01-22 · snapshot; kind: snapshot

**Temporal qualification:** Historical source snapshot; no continuing appointment or capacity is inferred.

**Qualification / scope limits:** Historical company context; does not equate FAIR with the whole parent company or assert a separately incorporated subsidiary.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-29

**Evidence coverage:** Supporting evidence: primary · 1 source

#### Evidence 1 · `evidence-xm-fair-facebook`

**Source title:** Facebook investit 10 millions d’euros supplémentaires et double l’équipe de Facebook AI Research Paris

**Source ID:** source-xm-fair-paris

**Publisher / authors:** Facebook / Facebook

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** Facebook describes expansion of its FAIR research teams and identifies LeCun as FAIR Chief Scientist.

**Locator:** Opening paragraph, FAIR Paris expansion section and LeCun quotation.

**Canonical source:** [Facebook investit 10 millions d’euros supplémentaires et double l’équipe de Facebook AI Research Paris](https://about.fb.com/fr/news/2018/01/facebook-investit-10-millions-deuros-supplementaires-et-double-lequipe-de-facebook-ai-research-paris-pour-accelerer-lintelligence-artificielle-en-france-dici-2022/)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2018-01-22

**Source / version description:** French-language page dated January 22, 2018; February 25, 2020 update also shown.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-29

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-29

**Verification note:** Passage checked by machine against the identified source expression. No human editorial acceptance or independent verification of implementation is implied.

**Human decision:**

**Notes:**

---

### 05 · `xm-fair-meta`

**Statement:** Meta’s ten-year retrospective identifies FAIR as its Fundamental AI Research team.

**Relation:** FAIR \[fair\] → unit\_of (was a unit of) → Meta \[meta\]

**Relation semantics:** A documented internal research team or unit within an organisation. Does not establish a separate legal subsidiary or an ownership transaction.

**Temporal scope:** 2023-11-30 · snapshot; kind: snapshot

**Temporal qualification:** Historical source snapshot; no continuing appointment or capacity is inferred.

**Qualification / scope limits:** FAIR is an internal research unit. The same article distinguishes broader Meta Generative AI and product teams; their work is not automatically FAIR work.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-29

**Evidence coverage:** Supporting evidence: primary · 1 source

#### Evidence 1 · `evidence-xm-fair-meta`

**Source title:** Celebrating 10 years of FAIR: A decade of advancing the state-of-the-art through open research

**Source ID:** source-xm-fair-decade

**Publisher / authors:** Meta / Joelle Pineau

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** The article identifies Meta’s Fundamental AI Research team and separately names generative-AI and product teams.

**Locator:** Opening paragraph and “The present” section.

**Canonical source:** [Celebrating 10 years of FAIR: A decade of advancing the state-of-the-art through open research](https://ai.meta.com/blog/fair-10-year-anniversary-open-science-meta/)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2023-11-30

**Source / version description:** Dated publisher webpage as retrieved; not an authenticated historical capture.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-29

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-29

**Verification note:** Passage checked by machine against the identified source expression. No human editorial acceptance or independent verification of implementation is implied.

**Human decision:**

**Notes:**

---

## xAI and Meta / people

### 06 · `xm-christian-szegedy-xai`

**Statement:** Christian Szegedy appears on xAI’s launch-team roster.

**Relation:** Christian Szegedy \[christian-szegedy\] → held\_role (held role at) → xAI \[xai\]

**Relation semantics:** An institutional role with explicitly scoped time: snapshot, sourced interval, or unknown dates. No continuing appointment is implied.

**Temporal scope:** 2023-07-12 · snapshot; kind: snapshot

**Temporal qualification:** Historical source snapshot; no continuing appointment or capacity is inferred.

**Qualification / scope limits:** Roster membership is not an incorporation role, exact hiring date or continuing appointment.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-29

**Evidence coverage:** Supporting evidence: secondary · 1 source

**Structured attributes:**

```json
{
  "role": "Launch-team member"
}
```

#### Evidence 1 · `evidence-xm-christian-szegedy-xai`

**Source title:** Musk announces new AI company that seeks to “understand the universe”

**Source ID:** source-xai-team-2023

**Publisher / authors:** Ars Technica / Benj Edwards

**Source role relative to this claim:** secondary

**Evidence role:** supports

**Paraphrase (not a quotation):** Christian Szegedy is listed among the xAI team members.

**Locator:** Article paragraph beginning “The xAI team includes…”; launch-team list.

**Canonical source:** [Musk announces new AI company that seeks to “understand the universe”](https://arstechnica.com/information-technology/2023/07/musk-announces-new-ai-company-that-seeks-to-understand-the-universe/)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2023-07-12

**Source / version description:** Contemporaneous report and screenshot of the launch roster. The current x.ai company page has changed; original archive retrieval was unavailable.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-18

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-29

**Verification note:** Passage checked by machine against the identified source expression. No human editorial acceptance or independent verification of implementation is implied.

**Human decision:**

**Notes:**

---

### 07 · `xm-toby-pohlen-xai`

**Statement:** Toby Pohlen appears on xAI’s launch-team roster.

**Relation:** Toby Pohlen \[toby-pohlen\] → held\_role (held role at) → xAI \[xai\]

**Relation semantics:** An institutional role with explicitly scoped time: snapshot, sourced interval, or unknown dates. No continuing appointment is implied.

**Temporal scope:** 2023-07-12 · snapshot; kind: snapshot

**Temporal qualification:** Historical source snapshot; no continuing appointment or capacity is inferred.

**Qualification / scope limits:** Roster membership is not an incorporation role, exact hiring date or continuing appointment.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-29

**Evidence coverage:** Supporting evidence: secondary · 1 source

**Structured attributes:**

```json
{
  "role": "Launch-team member"
}
```

#### Evidence 1 · `evidence-xm-toby-pohlen-xai`

**Source title:** Musk announces new AI company that seeks to “understand the universe”

**Source ID:** source-xai-team-2023

**Publisher / authors:** Ars Technica / Benj Edwards

**Source role relative to this claim:** secondary

**Evidence role:** supports

**Paraphrase (not a quotation):** Toby Pohlen is listed among the xAI team members.

**Locator:** Article paragraph beginning “The xAI team includes…”; launch-team list.

**Canonical source:** [Musk announces new AI company that seeks to “understand the universe”](https://arstechnica.com/information-technology/2023/07/musk-announces-new-ai-company-that-seeks-to-understand-the-universe/)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2023-07-12

**Source / version description:** Contemporaneous report and screenshot of the launch roster. The current x.ai company page has changed; original archive retrieval was unavailable.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-18

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-29

**Verification note:** Passage checked by machine against the identified source expression. No human editorial acceptance or independent verification of implementation is implied.

**Human decision:**

**Notes:**

---

### 08 · `xm-szegedy-google`

**Statement:** The Batch Normalization paper lists Christian Szegedy with a Google affiliation.

**Relation:** Christian Szegedy \[christian-szegedy\] → held\_role (held role at) → Google \[google\]

**Relation semantics:** An institutional role with explicitly scoped time: snapshot, sourced interval, or unknown dates. No continuing appointment is implied.

**Temporal scope:** 2015-02-11 · snapshot; kind: snapshot

**Temporal qualification:** Historical source snapshot; no continuing appointment or capacity is inferred.

**Qualification / scope limits:** The byline establishes a Google Inc. affiliation only; no particular internal research unit or employment interval is asserted.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-29

**Evidence coverage:** Supporting evidence: primary · 1 source

**Structured attributes:**

```json
{
  "role": "Paper author affiliated with Google"
}
```

#### Evidence 1 · `evidence-xm-szegedy-google`

**Source title:** Batch Normalization: Accelerating Deep Network Training by Reducing Internal Covariate Shift

**Source ID:** source-xm-batch-normalization

**Publisher / authors:** arXiv / Sergey Ioffe; Christian Szegedy

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** Christian Szegedy is an author affiliated with Google Inc.

**Locator:** Title-page author block: Christian Szegedy; affiliation Google Inc.

**Canonical source:** [Batch Normalization: Accelerating Deep Network Training by Reducing Internal Covariate Shift](https://arxiv.org/html/1502.03167v1)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2015-02-11

**Source / version description:** arXiv:1502.03167v1; HTML rendering of the first submitted version.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-29

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-29

**Verification note:** Passage checked by machine against the identified source expression. No human editorial acceptance or independent verification of implementation is implied.

**Human decision:**

**Notes:**

---

### 09 · `xm-babuschkin-departure`

**Statement:** Reuters reported Igor Babuschkin’s announcement that he had left xAI.

**Relation:** Igor Babuschkin \[igor-babuschkin\] → departure\_announced (had departure announced from) → xAI \[xai\]

**Relation semantics:** A source announced this person’s departure from a specified role. The event date is the announcement, not an inferred final working day or end of every association.

**Temporal scope:** 2025-08-13 · announcement; kind: event

**Temporal qualification:** Announcement date, not an independently verified transaction completion date.

**Qualification / scope limits:** Reuters quotes his last-day announcement; the underlying social post was not independently retrieved. No reason for departure or end of every association is inferred.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-29

**Evidence coverage:** Supporting evidence: secondary · 1 source

**Structured attributes:**

```json
{
  "role": "Co-founder"
}
```

#### Evidence 1 · `evidence-xm-babuschkin-departure`

**Source title:** xAI co-founder Babuschkin departs to launch AI safety investment firm

**Source ID:** source-xm-babuschkin-departure

**Publisher / authors:** Reuters / Investing.com / Reuters

**Source role relative to this claim:** secondary

**Evidence role:** supports

**Paraphrase (not a quotation):** Babuschkin said that day was his last at xAI and described plans for Babuschkin Ventures.

**Locator:** Opening three paragraphs; quotation beginning “Today was my last day at xAI”.

**Canonical source:** [xAI co-founder Babuschkin departs to launch AI safety investment firm](https://www.investing.com/news/stock-market-news/xai-cofounder-babuschkin-departs-to-launch-ai-safety-investment-firm-4190463)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2025-08-13

**Source / version description:** Reuters syndication, published and updated August 13, 2025.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-29

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-29

**Verification note:** Passage checked by machine against the identified source expression. No human editorial acceptance or independent verification of implementation is implied.

**Human decision:**

**Notes:**

---

### 10 · `xm-lecun-fair-start`

**Statement:** Facebook’s historical biography dates LeCun’s AI research directorship to December 2013.

**Relation:** Yann LeCun \[yann-lecun\] → held\_role (held role at) → FAIR \[fair\]

**Relation semantics:** An institutional role with explicitly scoped time: snapshot, sourced interval, or unknown dates. No continuing appointment is implied.

**Temporal scope:** 2013-12 → End unknown; kind: interval

**Temporal qualification:** Start month reported retrospectively in the January 2018 biography. No end date established.

**Qualification / scope limits:** The same page calls him Chief Scientist in its quotation. This records the historical start of research leadership, not an uninterrupted director title or current appointment.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-29

**Evidence coverage:** Supporting evidence: primary · 1 source

**Structured attributes:**

```json
{
  "role": "AI research director (historical start)"
}
```

#### Evidence 1 · `evidence-xm-lecun-fair-start`

**Source title:** Facebook investit 10 millions d’euros supplémentaires et double l’équipe de Facebook AI Research Paris

**Source ID:** source-xm-fair-paris

**Publisher / authors:** Facebook / Facebook

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** The biography says LeCun had been director of Facebook AI research since December 2013.

**Locator:** “Facebook AI Research : Curriculum” / Yann LeCun biography, opening sentence.

**Canonical source:** [Facebook investit 10 millions d’euros supplémentaires et double l’équipe de Facebook AI Research Paris](https://about.fb.com/fr/news/2018/01/facebook-investit-10-millions-deuros-supplementaires-et-double-lequipe-de-facebook-ai-research-paris-pour-accelerer-lintelligence-artificielle-en-france-dici-2022/)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2018-01-22

**Source / version description:** French-language page dated January 22, 2018; February 25, 2020 update also shown.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-29

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-29

**Verification note:** Passage checked by machine against the identified source expression. No human editorial acceptance or independent verification of implementation is implied.

**Human decision:**

**Notes:**

---

### 11 · `xm-lecun-meta`

**Statement:** Meta identified Yann LeCun as its Chief AI Scientist in the I-JEPA account.

**Relation:** Yann LeCun \[yann-lecun\] → held\_role (held role at) → Meta \[meta\]

**Relation semantics:** An institutional role with explicitly scoped time: snapshot, sourced interval, or unknown dates. No continuing appointment is implied.

**Temporal scope:** 2023-06-13 · snapshot; kind: snapshot

**Temporal qualification:** Historical source snapshot; no continuing appointment or capacity is inferred.

**Qualification / scope limits:** A June 2023 role snapshot, not a current appointment or an inferred start date.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-29

**Evidence coverage:** Supporting evidence: primary · 1 source

**Structured attributes:**

```json
{
  "role": "Chief AI Scientist"
}
```

#### Evidence 1 · `evidence-xm-lecun-meta`

**Source title:** I-JEPA: The first AI model based on Yann LeCun’s vision for more human-like AI

**Source ID:** source-xm-ijepa

**Publisher / authors:** Meta / Meta

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** LeCun is identified as Meta Chief AI Scientist.

**Locator:** Opening paragraph naming “Meta Chief AI Scientist Yann LeCun”.

**Canonical source:** [I-JEPA: The first AI model based on Yann LeCun’s vision for more human-like AI](https://ai.meta.com/blog/yann-lecun-ai-model-i-jepa/)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2023-06-13

**Source / version description:** Dated publisher webpage as retrieved; not an authenticated historical capture.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-29

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-29

**Verification note:** Passage checked by machine against the identified source expression. No human editorial acceptance or independent verification of implementation is implied.

**Human decision:**

**Notes:**

---

### 12 · `xm-pineau-meta`

**Statement:** The FAIR retrospective identifies Joelle Pineau as Meta VP of AI Research.

**Relation:** Joelle Pineau \[joelle-pineau\] → held\_role (held role at) → Meta \[meta\]

**Relation semantics:** An institutional role with explicitly scoped time: snapshot, sourced interval, or unknown dates. No continuing appointment is implied.

**Temporal scope:** 2023-11-30 · snapshot; kind: snapshot

**Temporal qualification:** Historical source snapshot; no continuing appointment or capacity is inferred.

**Qualification / scope limits:** A byline role snapshot; no exact appointment date or continuing role is inferred.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-29

**Evidence coverage:** Supporting evidence: primary · 1 source

**Structured attributes:**

```json
{
  "role": "VP of AI Research"
}
```

#### Evidence 1 · `evidence-xm-pineau-meta`

**Source title:** Celebrating 10 years of FAIR: A decade of advancing the state-of-the-art through open research

**Source ID:** source-xm-fair-decade

**Publisher / authors:** Meta / Joelle Pineau

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** Pineau is credited as VP of AI Research.

**Locator:** Author byline: Joelle Pineau, VP of AI Research.

**Canonical source:** [Celebrating 10 years of FAIR: A decade of advancing the state-of-the-art through open research](https://ai.meta.com/blog/fair-10-year-anniversary-open-science-meta/)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2023-11-30

**Source / version description:** Dated publisher webpage as retrieved; not an authenticated historical capture.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-29

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-29

**Verification note:** Passage checked by machine against the identified source expression. No human editorial acceptance or independent verification of implementation is implied.

**Human decision:**

**Notes:**

---

### 13 · `xm-pineau-cohere`

**Statement:** Cohere announced that Joelle Pineau would join as Chief AI Officer.

**Relation:** Joelle Pineau \[joelle-pineau\] → held\_role (held role at) → Cohere \[cohere\]

**Relation semantics:** An institutional role with explicitly scoped time: snapshot, sourced interval, or unknown dates. No continuing appointment is implied.

**Temporal scope:** 2025-08-14 · snapshot; kind: snapshot

**Temporal qualification:** Snapshot of an announced forthcoming appointment, not a verified first working day.

**Qualification / scope limits:** Cohere uses future tense and identifies her as former head of Meta’s FAIR. The record does not establish the exact transition date or a current appointment.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-29

**Evidence coverage:** Supporting evidence: primary · 1 source

**Structured attributes:**

```json
{
  "role": "Announced incoming Chief AI Officer"
}
```

#### Evidence 1 · `evidence-xm-pineau-cohere`

**Source title:** Cohere raises $500M at $6.8B valuation to accelerate enterprise efficiency with agentic AI

**Source ID:** source-xm-pineau-cohere

**Publisher / authors:** Cohere / Cohere

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** Cohere announced Pineau would join as Chief AI Officer.

**Locator:** Leadership-expansion introduction and bullet beginning “Joelle Pineau will be joining”.

**Canonical source:** [Cohere raises $500M at $6.8B valuation to accelerate enterprise efficiency with agentic AI](https://cohere.com/blog/august-2025-funding-round)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2025-08-14

**Source / version description:** Dated publisher webpage as retrieved; not an authenticated historical capture.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-29

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-29

**Verification note:** Passage checked by machine against the identified source expression. No human editorial acceptance or independent verification of implementation is implied.

**Human decision:**

**Notes:**

---

### 14 · `xm-touvron-meta`

**Statement:** The first LLaMA paper lists Hugo Touvron under the Meta AI affiliation.

**Relation:** Hugo Touvron \[hugo-touvron\] → held\_role (held role at) → Meta \[meta\]

**Relation semantics:** An institutional role with explicitly scoped time: snapshot, sourced interval, or unknown dates. No continuing appointment is implied.

**Temporal scope:** 2023-02-27 · snapshot; kind: snapshot

**Temporal qualification:** Historical source snapshot; no continuing appointment or capacity is inferred.

**Qualification / scope limits:** Meta AI is the paper’s research affiliation; this does not establish a specific FAIR unit, exact legal employer or employment interval.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-29

**Evidence coverage:** Supporting evidence: primary · 1 source

**Structured attributes:**

```json
{
  "role": "Paper author affiliated with Meta AI"
}
```

#### Evidence 1 · `evidence-xm-touvron-meta`

**Source title:** LLaMA: Open and Efficient Foundation Language Models

**Source ID:** source-xm-llama-paper

**Publisher / authors:** arXiv / Hugo Touvron; Thibaut Lavril; Gautier Izacard; Xavier Martinet; Marie-Anne Lachaux; Timothée Lacroix; Baptiste Rozière; Naman Goyal; Eric Hambro; Faisal Azhar; Aurelien Rodriguez; Armand Joulin; Edouard Grave; Guillaume Lample

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** Hugo Touvron is listed among the authors affiliated with Meta AI.

**Locator:** Title-page authors and Meta AI affiliation.

**Canonical source:** [LLaMA: Open and Efficient Foundation Language Models](https://arxiv.org/html/2302.13971v1)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2023-02-27

**Source / version description:** arXiv:2302.13971v1; first submitted version.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-29

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-29

**Verification note:** Passage checked by machine against the identified source expression. No human editorial acceptance or independent verification of implementation is implied.

**Human decision:**

**Notes:**

---

### 15 · `xm-zuckerberg-meta`

**Statement:** The strategy essay identifies Zuckerberg as Meta founder and CEO.

**Relation:** Mark Zuckerberg \[mark-zuckerberg\] → held\_role (held role at) → Meta \[meta\]

**Relation semantics:** An institutional role with explicitly scoped time: snapshot, sourced interval, or unknown dates. No continuing appointment is implied.

**Temporal scope:** 2024-07-23 · snapshot; kind: snapshot

**Temporal qualification:** Historical source snapshot; no continuing appointment or capacity is inferred.

**Qualification / scope limits:** Historical byline snapshot; no continuing appointment is inferred.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-29

**Evidence coverage:** Supporting evidence: primary · 1 source

**Structured attributes:**

```json
{
  "role": "Founder and CEO"
}
```

#### Evidence 1 · `evidence-xm-zuckerberg-meta`

**Source title:** Open Source AI Is the Path Forward

**Source ID:** source-xm-open-strategy

**Publisher / authors:** Meta / Mark Zuckerberg

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** Zuckerberg is identified as Founder and CEO.

**Locator:** Byline below publication date.

**Canonical source:** [Open Source AI Is the Path Forward](https://about.fb.com/news/2024/07/open-source-ai-is-the-path-forward/)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2024-07-23

**Source / version description:** July 23, 2024 essay with January 27, 2025 update shown.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-29

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-29

**Verification note:** Passage checked by machine against the identified source expression. No human editorial acceptance or independent verification of implementation is implied.

**Human decision:**

**Notes:**

---

## xAI and Meta / ideas

### 16 · `xm-research-programme`

**Statement:** xAI published an initial research programme alongside its Grok announcement.

**Relation:** xAI \[xai\] → published (published) → Announcing Grok / research programme (2023) \[xai-research-programme-2023\]

**Relation semantics:** Publication of a specific document or version. Publication of a policy is not evidence of implementation.

**Temporal scope:** 2023-11-03 · publication; kind: event

**Temporal qualification:** Date of this source expression; not an invention or implementation date.

**Qualification / scope limits:** The page header dates this expression November 3. Listed research directions do not establish implemented techniques or demonstrated capabilities.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-29

**Evidence coverage:** Supporting evidence: primary · 1 source

#### Evidence 1 · `evidence-xm-research-programme`

**Source title:** Announcing Grok

**Source ID:** source-xm-research-programme

**Publisher / authors:** xAI / xAI

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** The announcement describes research directions for more reliable reasoning and tool use.

**Locator:** Date header and “Research at xAI” section opening.

**Canonical source:** [Announcing Grok](https://x.ai/news/grok)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2023-11-03

**Source / version description:** Dated publisher webpage as retrieved; not an authenticated historical capture.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-29

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-29

**Verification note:** Passage checked by machine against the identified source expression. No human editorial acceptance or independent verification of implementation is implied.

**Human decision:**

**Notes:**

---

### 17 · `xm-scalable-oversight`

**Statement:** xAI’s initial agenda discusses scalable oversight assisted by tools and human feedback.

**Relation:** Announcing Grok / research programme (2023) \[xai-research-programme-2023\] → discusses (discusses) → Scalable oversight \[scalable-oversight\]

**Relation semantics:** The concept is explicitly discussed in the document. This makes no earliest-use, invention or transmission claim.

**Temporal scope:** 2023-11-03 · publication; kind: event

**Temporal qualification:** Date of this source expression; not an invention or implementation date.

**Qualification / scope limits:** An explicitly stated research direction, not proof of implementation or influence from any particular earlier institution.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-29

**Evidence coverage:** Supporting evidence: primary · 1 source

#### Evidence 1 · `evidence-xm-scalable-oversight`

**Source title:** Announcing Grok

**Source ID:** source-xm-research-programme

**Publisher / authors:** xAI / xAI

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** The agenda proposes tool-assisted human oversight and feedback at scale.

**Locator:** “Research at xAI” / “Scalable oversight with tool assistance” bullet.

**Canonical source:** [Announcing Grok](https://x.ai/news/grok)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2023-11-03

**Source / version description:** Dated publisher webpage as retrieved; not an authenticated historical capture.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-29

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-29

**Verification note:** Passage checked by machine against the identified source expression. No human editorial acceptance or independent verification of implementation is implied.

**Human decision:**

**Notes:**

---

### 18 · `xm-formal-verification`

**Statement:** xAI’s initial agenda proposes integrating formal verification.

**Relation:** Announcing Grok / research programme (2023) \[xai-research-programme-2023\] → discusses (discusses) → Formal verification \[formal-verification\]

**Relation semantics:** The concept is explicitly discussed in the document. This makes no earliest-use, invention or transmission claim.

**Temporal scope:** 2023-11-03 · publication; kind: event

**Temporal qualification:** Date of this source expression; not an invention or implementation date.

**Qualification / scope limits:** A proposed direction in verifiable settings, not evidence that deployed models formally guarantee correctness.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-29

**Evidence coverage:** Supporting evidence: primary · 1 source

#### Evidence 1 · `evidence-xm-formal-verification`

**Source title:** Announcing Grok

**Source ID:** source-xm-research-programme

**Publisher / authors:** xAI / xAI

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** The agenda proposes using formal verification, including verifiable code-correctness settings.

**Locator:** “Research at xAI” / “Integrating with formal verification” bullet.

**Canonical source:** [Announcing Grok](https://x.ai/news/grok)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2023-11-03

**Source / version description:** Dated publisher webpage as retrieved; not an authenticated historical capture.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-29

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-29

**Verification note:** Passage checked by machine against the identified source expression. No human editorial acceptance or independent verification of implementation is implied.

**Human decision:**

**Notes:**

---

### 19 · `xm-szegedy-batch-normalization`

**Statement:** Christian Szegedy co-authored the Batch Normalization paper.

**Relation:** Christian Szegedy \[christian-szegedy\] → authored (authored) → Batch Normalization (2015 paper) \[batch-normalization-paper\]

**Relation semantics:** Authorship as credited in the document. Does not imply sole authorship.

**Temporal scope:** 2015-02-11 · publication; kind: event

**Temporal qualification:** Date of this source expression; not an invention or implementation date.

**Qualification / scope limits:** Co-authorship is not sole invention; this pre-xAI paper does not establish xAI adoption or influence.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-29

**Evidence coverage:** Supporting evidence: primary · 1 source

#### Evidence 1 · `evidence-xm-szegedy-batch-normalization`

**Source title:** Batch Normalization: Accelerating Deep Network Training by Reducing Internal Covariate Shift

**Source ID:** source-xm-batch-normalization

**Publisher / authors:** arXiv / Sergey Ioffe; Christian Szegedy

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** Sergey Ioffe and Christian Szegedy are credited as authors.

**Locator:** Title-page author list.

**Canonical source:** [Batch Normalization: Accelerating Deep Network Training by Reducing Internal Covariate Shift](https://arxiv.org/html/1502.03167v1)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2015-02-11

**Source / version description:** arXiv:1502.03167v1; HTML rendering of the first submitted version.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-29

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-29

**Verification note:** Passage checked by machine against the identified source expression. No human editorial acceptance or independent verification of implementation is implied.

**Human decision:**

**Notes:**

---

### 20 · `xm-batch-normalization-method`

**Statement:** The Batch Normalization paper describes normalization using training mini-batches.

**Relation:** Batch Normalization (2015 paper) \[batch-normalization-paper\] → discusses (discusses) → Batch normalization \[batch-normalization\]

**Relation semantics:** The concept is explicitly discussed in the document. This makes no earliest-use, invention or transmission claim.

**Temporal scope:** 2015-02-11 · publication; kind: event

**Temporal qualification:** Date of this source expression; not an invention or implementation date.

**Qualification / scope limits:** Describes the paper’s method; its performance claims are not independently verified here.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-29

**Evidence coverage:** Supporting evidence: primary · 1 source

#### Evidence 1 · `evidence-xm-batch-normalization-method`

**Source title:** Batch Normalization: Accelerating Deep Network Training by Reducing Internal Covariate Shift

**Source ID:** source-xm-batch-normalization

**Publisher / authors:** arXiv / Sergey Ioffe; Christian Szegedy

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** The proposed method normalizes activations using training mini-batches.

**Locator:** Abstract, method description after internal covariate shift motivation.

**Canonical source:** [Batch Normalization: Accelerating Deep Network Training by Reducing Internal Covariate Shift](https://arxiv.org/html/1502.03167v1)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2015-02-11

**Source / version description:** arXiv:1502.03167v1; HTML rendering of the first submitted version.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-29

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-29

**Verification note:** Passage checked by machine against the identified source expression. No human editorial acceptance or independent verification of implementation is implied.

**Human decision:**

**Notes:**

---

### 21 · `xm-yang-tensor-programs`

**Statement:** Greg Yang co-authored Tensor Programs V on hyperparameter transfer across model sizes.

**Relation:** Greg Yang \[greg-yang\] → authored (authored) → Tensor Programs V (2022 paper) \[tensor-programs-v\]

**Relation semantics:** Authorship as credited in the document. Does not imply sole authorship.

**Temporal scope:** 2022-03-07 · publication; kind: event

**Temporal qualification:** Date of this source expression; not an invention or implementation date.

**Qualification / scope limits:** Version-one authorship predates xAI. Neither employment overlap nor co-authorship establishes institutional adoption or transmission.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-29

**Evidence coverage:** Supporting evidence: primary · 1 source

#### Evidence 1 · `evidence-xm-yang-tensor-programs`

**Source title:** Tensor Programs V: Tuning Large Neural Networks via Zero-Shot Hyperparameter Transfer

**Source ID:** source-xm-tensor-programs-v

**Publisher / authors:** arXiv / Greg Yang; Edward J. Hu; Igor Babuschkin; Szymon Sidor; Xiaodong Liu; David Farhi; Nick Ryder; Jakub Pachocki; Weizhu Chen; Jianfeng Gao

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** Greg Yang is credited on the paper introducing hyperparameter transfer across model sizes.

**Locator:** Version-one abstract page: author list and abstract.

**Canonical source:** [Tensor Programs V: Tuning Large Neural Networks via Zero-Shot Hyperparameter Transfer](https://arxiv.org/abs/2203.03466v1)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2022-03-07

**Source / version description:** arXiv:2203.03466v1; version-specific abstract and author list, not the March 28 revision.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-29

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-29

**Verification note:** Passage checked by machine against the identified source expression. No human editorial acceptance or independent verification of implementation is implied.

**Human decision:**

**Notes:**

---

### 22 · `xm-fair-retrospective`

**Statement:** Meta published a retrospective locating FAIR’s launch in late 2013 and describing a decade of open research.

**Relation:** Meta \[meta\] → published (published) → FAIR ten-year retrospective (2023) \[fair-decade-2023\]

**Relation semantics:** Publication of a specific document or version. Publication of a policy is not evidence of implementation.

**Temporal scope:** 2023-11-30 · publication; kind: event

**Temporal qualification:** Date of this source expression; not an invention or implementation date.

**Qualification / scope limits:** A retrospective institutional account, not independent confirmation of every claimed achievement or proof of priority.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-29

**Evidence coverage:** Supporting evidence: primary · 1 source

#### Evidence 1 · `evidence-xm-fair-retrospective`

**Source title:** Celebrating 10 years of FAIR: A decade of advancing the state-of-the-art through open research

**Source ID:** source-xm-fair-decade

**Publisher / authors:** Meta / Joelle Pineau

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** The retrospective describes FAIR’s late-2013 launch and its open-research programme.

**Locator:** “The past decade” section; opening launch-history paragraph.

**Canonical source:** [Celebrating 10 years of FAIR: A decade of advancing the state-of-the-art through open research](https://ai.meta.com/blog/fair-10-year-anniversary-open-science-meta/)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2023-11-30

**Source / version description:** Dated publisher webpage as retrieved; not an authenticated historical capture.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-29

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-29

**Verification note:** Passage checked by machine against the identified source expression. No human editorial acceptance or independent verification of implementation is implied.

**Human decision:**

**Notes:**

---

### 23 · `xm-llama-publication`

**Statement:** Meta introduced the LLaMA research work and linked its paper on February 24, 2023.

**Relation:** Meta \[meta\] → published (published) → LLaMA (2023 paper) \[llama-paper\]

**Relation semantics:** Publication of a specific document or version. Publication of a policy is not evidence of implementation.

**Temporal scope:** 2023-02-24 · publication; kind: event

**Temporal qualification:** Date of this source expression; not an invention or implementation date.

**Qualification / scope limits:** Institutional announcement date; the first arXiv submission is February 27. The announcement describes controlled noncommercial research access, not unrestricted commercial availability.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-29

**Evidence coverage:** Supporting evidence: primary · 1 source

#### Evidence 1 · `evidence-xm-llama-publication`

**Source title:** Introducing LLaMA: A foundational, 65-billion-parameter large language model

**Source ID:** source-xm-llama-announcement

**Publisher / authors:** Meta / Meta

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** Meta introduced LLaMA and linked the research paper under a noncommercial research-access policy.

**Locator:** Original opening paragraph, “Read the paper” link and closing research-licence/access paragraphs.

**Canonical source:** [Introducing LLaMA: A foundational, 65-billion-parameter large language model](https://ai.meta.com/blog/large-language-model-llama-meta-ai/)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2023-02-24

**Source / version description:** February 24, 2023 announcement with a later Llama 2 update banner; original announcement body is the evidence.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-29

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-29

**Verification note:** Passage checked by machine against the identified source expression. No human editorial acceptance or independent verification of implementation is implied.

**Human decision:**

**Notes:**

---

### 24 · `xm-touvron-llama`

**Statement:** Hugo Touvron co-authored the first LLaMA paper.

**Relation:** Hugo Touvron \[hugo-touvron\] → authored (authored) → LLaMA (2023 paper) \[llama-paper\]

**Relation semantics:** Authorship as credited in the document. Does not imply sole authorship.

**Temporal scope:** 2023-02-27 · publication; kind: event

**Temporal qualification:** Date of this source expression; not an invention or implementation date.

**Qualification / scope limits:** Version-one authorship; not sole authorship or proof that every Meta AI research group participated.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-29

**Evidence coverage:** Supporting evidence: primary · 1 source

#### Evidence 1 · `evidence-xm-touvron-llama`

**Source title:** LLaMA: Open and Efficient Foundation Language Models

**Source ID:** source-xm-llama-paper

**Publisher / authors:** arXiv / Hugo Touvron; Thibaut Lavril; Gautier Izacard; Xavier Martinet; Marie-Anne Lachaux; Timothée Lacroix; Baptiste Rozière; Naman Goyal; Eric Hambro; Faisal Azhar; Aurelien Rodriguez; Armand Joulin; Edouard Grave; Guillaume Lample

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** Hugo Touvron appears in the author list.

**Locator:** Version-one title-page author list.

**Canonical source:** [LLaMA: Open and Efficient Foundation Language Models](https://arxiv.org/html/2302.13971v1)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2023-02-27

**Source / version description:** arXiv:2302.13971v1; first submitted version.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-29

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-29

**Verification note:** Passage checked by machine against the identified source expression. No human editorial acceptance or independent verification of implementation is implied.

**Human decision:**

**Notes:**

---

### 25 · `xm-llama-transformer`

**Statement:** The LLaMA paper reports using the Transformer architecture of Vaswani and colleagues.

**Relation:** LLaMA (2023 paper) \[llama-paper\] → uses\_method\_from (reports using method from) → Attention Is All You Need \[attention-all-you-need\]

**Relation semantics:** A document explicitly reports using an identified method or architecture from another work in its own study. Requires a named method and primary evidence from the reporting document. Citation, comparison, proposed future use and similarity alone do not qualify. This is reported use, not independently verified implementation or institutional adoption.

**Temporal scope:** 2023-02-27 · publication; kind: event

**Temporal qualification:** Date of this source expression; not an invention or implementation date.

**Qualification / scope limits:** Explicit reported architectural use, not merely citation. Implementation and institutional influence are not independently verified.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-29

**Evidence coverage:** Supporting evidence: primary · 1 source

**Structured attributes:**

```json
{
  "method": "Transformer architecture"
}
```

#### Evidence 1 · `evidence-xm-llama-transformer`

**Source title:** LLaMA: Open and Efficient Foundation Language Models

**Source ID:** source-xm-llama-paper

**Publisher / authors:** arXiv / Hugo Touvron; Thibaut Lavril; Gautier Izacard; Xavier Martinet; Marie-Anne Lachaux; Timothée Lacroix; Baptiste Rozière; Naman Goyal; Eric Hambro; Faisal Azhar; Aurelien Rodriguez; Armand Joulin; Edouard Grave; Guillaume Lample

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** The authors say their network uses the Transformer architecture.

**Locator:** Section 2.2 “Architecture”, opening sentence and Vaswani et al. (2017) reference.

**Canonical source:** [LLaMA: Open and Efficient Foundation Language Models](https://arxiv.org/html/2302.13971v1)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2023-02-27

**Source / version description:** arXiv:2302.13971v1; first submitted version.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-29

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-29

**Verification note:** Passage checked by machine against the identified source expression. No human editorial acceptance or independent verification of implementation is implied.

**Human decision:**

**Notes:**

---

### 26 · `xm-llama-chinchilla`

**Statement:** The LLaMA paper discusses Hoffmann and colleagues’ compute-optimal training analysis while distinguishing inference budgets.

**Relation:** LLaMA (2023 paper) \[llama-paper\] → cites (cites) → Training Compute-Optimal Large Language Models \[compute-optimal-language-models\]

**Relation semantics:** An explicit reference to a work. Citation alone is neither agreement nor causal influence.

**Temporal scope:** 2023-02-27 · publication; kind: event

**Temporal qualification:** Date of this source expression; not an invention or implementation date.

**Qualification / scope limits:** Citation and explicit comparison, not adoption of every Chinchilla prescription or inferred institutional influence.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-29

**Evidence coverage:** Supporting evidence: primary · 1 source

#### Evidence 1 · `evidence-xm-llama-chinchilla`

**Source title:** LLaMA: Open and Efficient Foundation Language Models

**Source ID:** source-xm-llama-paper

**Publisher / authors:** arXiv / Hugo Touvron; Thibaut Lavril; Gautier Izacard; Xavier Martinet; Marie-Anne Lachaux; Timothée Lacroix; Baptiste Rozière; Naman Goyal; Eric Hambro; Faisal Azhar; Aurelien Rodriguez; Armand Joulin; Edouard Grave; Guillaume Lample

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** The introduction contrasts training-compute optimization with inference-cost considerations.

**Locator:** Section 1 “Introduction”, paragraph discussing Hoffmann et al. (2022) and inference budget.

**Canonical source:** [LLaMA: Open and Efficient Foundation Language Models](https://arxiv.org/html/2302.13971v1)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2023-02-27

**Source / version description:** arXiv:2302.13971v1; first submitted version.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-29

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-29

**Verification note:** Passage checked by machine against the identified source expression. No human editorial acceptance or independent verification of implementation is implied.

**Human decision:**

**Notes:**

---

### 27 · `xm-zuckerberg-strategy`

**Statement:** Mark Zuckerberg authored Meta’s July 2024 open-AI strategy essay.

**Relation:** Mark Zuckerberg \[mark-zuckerberg\] → authored (authored) → Open Source AI Is the Path Forward (2024) \[meta-open-strategy-2024\]

**Relation semantics:** Authorship as credited in the document. Does not imply sole authorship.

**Temporal scope:** 2024-07-23 · publication; kind: event

**Temporal qualification:** Date of this source expression; not an invention or implementation date.

**Qualification / scope limits:** Authorship attribution, not endorsement of its policy or technical conclusions.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-29

**Evidence coverage:** Supporting evidence: primary · 1 source

#### Evidence 1 · `evidence-xm-zuckerberg-strategy`

**Source title:** Open Source AI Is the Path Forward

**Source ID:** source-xm-open-strategy

**Publisher / authors:** Meta / Mark Zuckerberg

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** Mark Zuckerberg is credited as the essay’s author.

**Locator:** Byline: By Mark Zuckerberg, Founder and CEO.

**Canonical source:** [Open Source AI Is the Path Forward](https://about.fb.com/news/2024/07/open-source-ai-is-the-path-forward/)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2024-07-23

**Source / version description:** July 23, 2024 essay with January 27, 2025 update shown.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-29

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-29

**Verification note:** Passage checked by machine against the identified source expression. No human editorial acceptance or independent verification of implementation is implied.

**Human decision:**

**Notes:**

---

### 28 · `xm-ijepa-publication`

**Statement:** Meta published an account of I-JEPA’s representation-prediction approach.

**Relation:** Meta \[meta\] → published (published) → I-JEPA research account (2023) \[ijepa-research-account\]

**Relation semantics:** Publication of a specific document or version. Publication of a policy is not evidence of implementation.

**Temporal scope:** 2023-06-13 · publication; kind: event

**Temporal qualification:** Date of this source expression; not an invention or implementation date.

**Qualification / scope limits:** An institutional research account linking a paper and released artifacts, not independent verification of claimed performance or human-like understanding.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-29

**Evidence coverage:** Supporting evidence: primary · 1 source

#### Evidence 1 · `evidence-xm-ijepa-publication`

**Source title:** I-JEPA: The first AI model based on Yann LeCun’s vision for more human-like AI

**Source ID:** source-xm-ijepa

**Publisher / authors:** Meta / Meta

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** The account introduces prediction in representation space and links research and training artifacts.

**Locator:** Opening introduction to I-JEPA and paper/code links.

**Canonical source:** [I-JEPA: The first AI model based on Yann LeCun’s vision for more human-like AI](https://ai.meta.com/blog/yann-lecun-ai-model-i-jepa/)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2023-06-13

**Source / version description:** Dated publisher webpage as retrieved; not an authenticated historical capture.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-29

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-29

**Verification note:** Passage checked by machine against the identified source expression. No human editorial acceptance or independent verification of implementation is implied.

**Human decision:**

**Notes:**

---

### 29 · `xm-ijepa-self-supervision`

**Statement:** The I-JEPA account discusses self-supervised learning from unlabeled observations.

**Relation:** I-JEPA research account (2023) \[ijepa-research-account\] → discusses (discusses) → Self-supervised learning \[self-supervised-learning\]

**Relation semantics:** The concept is explicitly discussed in the document. This makes no earliest-use, invention or transmission claim.

**Temporal scope:** 2023-06-13 · publication; kind: event

**Temporal qualification:** Date of this source expression; not an invention or implementation date.

**Qualification / scope limits:** A described learning approach, not proof of human-like intelligence, generality or priority.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-29

**Evidence coverage:** Supporting evidence: primary · 1 source

#### Evidence 1 · `evidence-xm-ijepa-self-supervision`

**Source title:** I-JEPA: The first AI model based on Yann LeCun’s vision for more human-like AI

**Source ID:** source-xm-ijepa

**Publisher / authors:** Meta / Meta

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** The account describes learning from unlabeled observations and predicting representations.

**Locator:** “Capturing common-sense knowledge with self-supervised learning” section.

**Canonical source:** [I-JEPA: The first AI model based on Yann LeCun’s vision for more human-like AI](https://ai.meta.com/blog/yann-lecun-ai-model-i-jepa/)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2023-06-13

**Source / version description:** Dated publisher webpage as retrieved; not an authenticated historical capture.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-29

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-29

**Verification note:** Passage checked by machine against the identified source expression. No human editorial acceptance or independent verification of implementation is implied.

**Human decision:**

**Notes:**

---

## xAI and Meta / capital

### 30 · `xm-series-e-total`

**Statement:** xAI reported closing a $20 billion Series E financing round.

**Relation:** xAI \[xai\] → announced\_funding (announced funding of) → 20000000000 USD \[literal; no graph edge\]

**Relation semantics:** The reported total of a financing round, not a valuation or any one investor’s contribution.

**Temporal scope:** 2026-01-06 · announcement; kind: event

**Temporal qualification:** Announcement date, not an independently verified transaction completion date.

**Qualification / scope limits:** Company-reported closed round total; not the earlier $15 billion target, valuation, cash-spending figure or any investor’s contribution.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-29

**Evidence coverage:** Supporting evidence: primary · 1 source

**Transaction type:** funding\_round

**Transaction stage:** closed

**Relationship context:** external

**Amount / bound / currency / scope:** exact · 20000000000 · USD · round\_total

**Quantity / bound / unit:** Not specified

**Structured attributes:**

```json
{
  "transactionType": "funding_round",
  "relationshipContext": "external",
  "transactionStage": "closed",
  "amount": {
    "value": 20000000000,
    "currency": "USD",
    "bound": "exact",
    "scope": "round_total"
  }
}
```

#### Evidence 1 · `evidence-xm-series-e-total`

**Source title:** xAI Raises $20B Series E

**Source ID:** source-xm-series-e

**Publisher / authors:** xAI / xAI

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** xAI said its completed Series E raised $20 billion.

**Locator:** Opening paragraph: completed upsized Series E; total raised.

**Canonical source:** [xAI Raises $20B Series E](https://x.ai/news/series-e)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2026-01-06

**Source / version description:** Dated publisher webpage as retrieved; not an authenticated historical capture.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-29

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-29

**Verification note:** Passage checked by machine against the identified source expression. No human editorial acceptance or independent verification of implementation is implied.

**Human decision:**

**Notes:**

---

### 31 · `xm-nvidia-series-e`

**Statement:** xAI named NVIDIA as a strategic investor in its Series E round.

**Relation:** NVIDIA \[nvidia\] → participated\_in\_round (participated in funding for) → xAI \[xai\]

**Relation semantics:** Named participation in a financing round. The full round total is not attributed to this investor.

**Temporal scope:** 2026-01-06 · announcement; kind: event

**Temporal qualification:** Announcement date, not an independently verified transaction completion date.

**Qualification / scope limits:** The announcement supplies no NVIDIA contribution amount or instrument; the full round total must not be assigned to NVIDIA.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-29

**Evidence coverage:** Supporting evidence: primary · 1 source

**Transaction type:** investment

**Transaction stage:** closed

**Relationship context:** external

**Amount / bound / currency / scope:** Not specified

**Quantity / bound / unit:** Not specified

**Structured attributes:**

```json
{
  "transactionType": "investment",
  "relationshipContext": "external",
  "transactionStage": "closed"
}
```

#### Evidence 1 · `evidence-xm-nvidia-series-e`

**Source title:** xAI Raises $20B Series E

**Source ID:** source-xm-series-e

**Publisher / authors:** xAI / xAI

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** NVIDIA is named as a strategic investor in the round.

**Locator:** Second paragraph: strategic investors NVIDIA and Cisco Investments.

**Canonical source:** [xAI Raises $20B Series E](https://x.ai/news/series-e)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2026-01-06

**Source / version description:** Dated publisher webpage as retrieved; not an authenticated historical capture.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-29

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-29

**Verification note:** Passage checked by machine against the identified source expression. No human editorial acceptance or independent verification of implementation is implied.

**Human decision:**

**Notes:**

---

## xAI and Meta / compute

### 32 · `xm-colossus-aggregate`

**Statement:** xAI reported ending 2025 with over one million H100 GPU equivalents across Colossus I and II.

**Relation:** xAI \[xai\] → uses\_infrastructure (uses infrastructure) → Colossus I and II (reported aggregate) \[colossus-i-ii\]

**Relation semantics:** Use of a named compute asset at the documented date. Does not establish ownership.

**Temporal scope:** 2025 · snapshot; kind: snapshot

**Temporal qualification:** Year-end 2025 capacity as retrospectively reported on January 6, 2026; day precision is not supplied.

**Qualification / scope limits:** Company-reported aggregate equivalence metric, not a count of installed H100 chips or independently measured available training capacity.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-29

**Evidence coverage:** Supporting evidence: primary · 1 source

**Transaction type:** infrastructure\_use

**Transaction stage:** operational

**Relationship context:** internal

**Amount / bound / currency / scope:** Not specified

**Quantity / bound / unit:** more\_than · 1000000 · H100 GPU equivalents across Colossus I and II

**Structured attributes:**

```json
{
  "transactionType": "infrastructure_use",
  "relationshipContext": "internal",
  "transactionStage": "operational",
  "quantity": {
    "value": 1000000,
    "unit": "H100 GPU equivalents across Colossus I and II",
    "bound": "more_than"
  }
}
```

#### Evidence 1 · `evidence-xm-colossus-aggregate`

**Source title:** xAI Raises $20B Series E

**Source ID:** source-xm-series-e

**Publisher / authors:** xAI / xAI

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** Colossus I and II were reported to end 2025 above one million H100 GPU equivalents.

**Locator:** “2025 was a year of breakthrough momentum” / “Data Centers” bullet.

**Canonical source:** [xAI Raises $20B Series E](https://x.ai/news/series-e)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2026-01-06

**Source / version description:** Dated publisher webpage as retrieved; not an authenticated historical capture.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-29

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-29

**Verification note:** Passage checked by machine against the identified source expression. No human editorial acceptance or independent verification of implementation is implied.

**Human decision:**

**Notes:**

---

### 33 · `xm-rsc-initial`

**Statement:** Meta reported RSC operating with 6,080 GPUs.

**Relation:** Meta \[meta\] → uses\_infrastructure (uses infrastructure) → AI Research SuperCluster (RSC) \[research-supercluster\]

**Relation semantics:** Use of a named compute asset at the documented date. Does not establish ownership.

**Temporal scope:** 2022-01-24 · snapshot; kind: snapshot

**Temporal qualification:** Historical source snapshot; no continuing appointment or capacity is inferred.

**Qualification / scope limits:** Company-reported first-phase capacity, not the later expansion target or independent utilization measurement.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-29

**Evidence coverage:** Supporting evidence: primary · 1 source

**Transaction type:** infrastructure\_use

**Transaction stage:** operational

**Relationship context:** internal

**Amount / bound / currency / scope:** Not specified

**Quantity / bound / unit:** exact · 6080 · GPUs

**Structured attributes:**

```json
{
  "transactionType": "infrastructure_use",
  "relationshipContext": "internal",
  "transactionStage": "operational",
  "quantity": {
    "value": 6080,
    "unit": "GPUs",
    "bound": "exact"
  }
}
```

#### Evidence 1 · `evidence-xm-rsc-initial`

**Source title:** Introducing the AI Research SuperCluster — Meta’s cutting-edge AI supercomputer for AI research

**Source ID:** source-xm-rsc-2022

**Publisher / authors:** Meta / Kevin Lee; Shubho Sengupta

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** Meta reported RSC operating with 6,080 GPUs.

**Locator:** “Building RSC” opening paragraph and “Phase two and beyond”.

**Canonical source:** [Introducing the AI Research SuperCluster — Meta’s cutting-edge AI supercomputer for AI research](https://ai.meta.com/blog/ai-rsc/)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2022-01-24

**Source / version description:** January 24, 2022 announcement; January 28 privacy update explicitly distinguished.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-29

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-29

**Verification note:** Passage checked by machine against the identified source expression. No human editorial acceptance or independent verification of implementation is implied.

**Human decision:**

**Notes:**

---

### 34 · `xm-rsc-plan`

**Statement:** Meta planned to expand RSC to 16,000 GPUs during 2022.

**Relation:** Meta \[meta\] → plans\_capacity (planned capacity for) → AI Research SuperCluster (RSC) \[research-supercluster\]

**Relation semantics:** Planned capacity of an identified compute asset. No deployment, operation, procurement or ownership is established.

**Temporal scope:** 2022-01-24 · announcement; kind: event

**Temporal qualification:** Announcement date, not an independently verified transaction completion date.

**Qualification / scope limits:** A target announced in January 2022, not proof of completion within that year.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-29

**Evidence coverage:** Supporting evidence: primary · 1 source

**Transaction type:** compute\_capacity

**Transaction stage:** planned

**Relationship context:** internal

**Amount / bound / currency / scope:** Not specified

**Quantity / bound / unit:** exact · 16000 · GPUs

**Structured attributes:**

```json
{
  "transactionType": "compute_capacity",
  "relationshipContext": "internal",
  "transactionStage": "planned",
  "quantity": {
    "value": 16000,
    "unit": "GPUs",
    "bound": "exact"
  }
}
```

#### Evidence 1 · `evidence-xm-rsc-plan`

**Source title:** Introducing the AI Research SuperCluster — Meta’s cutting-edge AI supercomputer for AI research

**Source ID:** source-xm-rsc-2022

**Publisher / authors:** Meta / Kevin Lee; Shubho Sengupta

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** Meta planned to expand RSC to 16,000 GPUs during 2022.

**Locator:** “Phase two and beyond”, paragraph on growing from 6,080 to 16,000 GPUs.

**Canonical source:** [Introducing the AI Research SuperCluster — Meta’s cutting-edge AI supercomputer for AI research](https://ai.meta.com/blog/ai-rsc/)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2022-01-24

**Source / version description:** January 24, 2022 announcement; January 28 privacy update explicitly distinguished.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-29

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-29

**Verification note:** Passage checked by machine against the identified source expression. No human editorial acceptance or independent verification of implementation is implied.

**Human decision:**

**Notes:**

---

### 35 · `xm-rsc-completion`

**Statement:** Meta reported completion of RSC’s second phase with 16,000 NVIDIA A100 GPUs.

**Relation:** Meta \[meta\] → uses\_infrastructure (uses infrastructure) → AI Research SuperCluster (RSC) \[research-supercluster\]

**Relation semantics:** Use of a named compute asset at the documented date. Does not establish ownership.

**Temporal scope:** 2023-05-18 · snapshot; kind: snapshot

**Temporal qualification:** Historical source snapshot; no continuing appointment or capacity is inferred.

**Qualification / scope limits:** Company report of completed capacity in May 2023. It does not establish the precise installation date, spending or an independently measured performance ranking.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-29

**Evidence coverage:** Supporting evidence: primary · 1 source

**Transaction type:** infrastructure\_use

**Transaction stage:** operational

**Relationship context:** internal

**Amount / bound / currency / scope:** Not specified

**Quantity / bound / unit:** exact · 16000 · GPUs

**Structured attributes:**

```json
{
  "transactionType": "infrastructure_use",
  "relationshipContext": "internal",
  "transactionStage": "operational",
  "quantity": {
    "value": 16000,
    "unit": "GPUs",
    "bound": "exact"
  }
}
```

#### Evidence 1 · `evidence-xm-rsc-completion`

**Source title:** Pursuing groundbreaking scale and accelerating research using Meta’s Research SuperCluster

**Source ID:** source-xm-rsc-2023

**Publisher / authors:** Meta / Meta

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** Meta reported completion of RSC’s second phase with 16,000 NVIDIA A100 GPUs.

**Locator:** Opening section describing completed phase two, 2,000 DGX A100 systems and 16,000 GPUs.

**Canonical source:** [Pursuing groundbreaking scale and accelerating research using Meta’s Research SuperCluster](https://ai.meta.com/blog/supercomputer-meta-research-supercluster-2023/)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2023-05-18

**Source / version description:** Dated publisher webpage as retrieved; not an authenticated historical capture.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-29

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-29

**Verification note:** Passage checked by machine against the identified source expression. No human editorial acceptance or independent verification of implementation is implied.

**Human decision:**

**Notes:**

---

## xAI and Meta / governance

### 36 · `xm-open-weights`

**Statement:** xAI announced release of Grok-1 base weights and architecture under Apache 2.0.

**Relation:** xAI \[xai\] → published (published) → Grok-1 open-weight release announcement (2024) \[xai-open-weights-2024\]

**Relation semantics:** Publication of a specific document or version. Publication of a policy is not evidence of implementation.

**Temporal scope:** 2024-03-17 · publication; kind: event

**Temporal qualification:** Date of this source expression; not an invention or implementation date.

**Qualification / scope limits:** Scope is the base checkpoint and architecture: the announcement says pretraining ended in October 2023 and the checkpoint was not dialogue-fine-tuned. No claim that training data or all development artifacts were released.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-29

**Evidence coverage:** Supporting evidence: primary · 1 source

#### Evidence 1 · `evidence-xm-open-weights`

**Source title:** Open Release of Grok-1

**Source ID:** source-xm-open-weights

**Publisher / authors:** xAI / xAI

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** The release covers base weights and architecture under Apache 2.0, with an October 2023 pretraining checkpoint.

**Locator:** Opening two paragraphs and Apache 2.0 release paragraph.

**Canonical source:** [Open Release of Grok-1](https://x.ai/news/grok-os)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2024-03-17

**Source / version description:** Dated publisher webpage as retrieved; not an authenticated historical capture.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-29

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-29

**Verification note:** Passage checked by machine against the identified source expression. No human editorial acceptance or independent verification of implementation is implied.

**Human decision:**

**Notes:**

---

### 37 · `xm-pytorch-governance`

**Statement:** Meta announced PyTorch’s move to an independent foundation within the Linux Foundation.

**Relation:** Meta \[meta\] → published (published) → PyTorch Foundation transition announcement (2022) \[pytorch-foundation-announcement\]

**Relation semantics:** Publication of a specific document or version. Publication of a policy is not evidence of implementation.

**Temporal scope:** 2022-09-12 · publication; kind: event

**Temporal qualification:** Date of this source expression; not an invention or implementation date.

**Qualification / scope limits:** Announcement of a governance arrangement, not an independently verified legal transfer. Meta also said it would continue investing in and using PyTorch.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-29

**Evidence coverage:** Supporting evidence: primary · 1 source

#### Evidence 1 · `evidence-xm-pytorch-governance`

**Source title:** Announcing the PyTorch Foundation to Accelerate Progress in AI Research

**Source ID:** source-xm-pytorch-foundation

**Publisher / authors:** Meta / Meta

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** PyTorch was announced as moving to an independent foundation within the Linux Foundation.

**Locator:** Takeaways and opening paragraphs describing the new independent PyTorch Foundation.

**Canonical source:** [Announcing the PyTorch Foundation to Accelerate Progress in AI Research](https://about.fb.com/news/2022/09/pytorch-foundation-to-accelerate-progress-in-ai-research/)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2022-09-12

**Source / version description:** September 12, 2022 page with September 20 update shown.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-29

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-29

**Verification note:** Passage checked by machine against the identified source expression. No human editorial acceptance or independent verification of implementation is implied.

**Human decision:**

**Notes:**

---

### 38 · `xm-open-strategy`

**Statement:** Meta published Zuckerberg’s argument for an open-model ecosystem.

**Relation:** Meta \[meta\] → published (published) → Open Source AI Is the Path Forward (2024) \[meta-open-strategy-2024\]

**Relation semantics:** Publication of a specific document or version. Publication of a policy is not evidence of implementation.

**Temporal scope:** 2024-07-23 · publication; kind: event

**Temporal qualification:** Date of this source expression; not an invention or implementation date.

**Qualification / scope limits:** The essay states the company’s strategy. Its use of “open source” is not an independent finding that every model or licence meets an external definition.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-29

**Evidence coverage:** Supporting evidence: primary · 1 source

#### Evidence 1 · `evidence-xm-open-strategy`

**Source title:** Open Source AI Is the Path Forward

**Source ID:** source-xm-open-strategy

**Publisher / authors:** Meta / Mark Zuckerberg

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** The essay argues that an open ecosystem benefits Meta and developers.

**Locator:** Essay opening and “Why open source AI is good for Meta” section.

**Canonical source:** [Open Source AI Is the Path Forward](https://about.fb.com/news/2024/07/open-source-ai-is-the-path-forward/)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2024-07-23

**Source / version description:** July 23, 2024 essay with January 27, 2025 update shown.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-29

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-29

**Verification note:** Passage checked by machine against the identified source expression. No human editorial acceptance or independent verification of implementation is implied.

**Human decision:**

**Notes:**

---

### 39 · `xm-llama-commercial`

**Statement:** Meta announced Llama 2 availability for research and commercial use.

**Relation:** Meta \[meta\] → published (published) → Llama commercial-availability announcement (2023) \[llama-commercial-announcement\]

**Relation semantics:** Publication of a specific document or version. Publication of a policy is not evidence of implementation.

**Temporal scope:** 2023-07-18 · publication; kind: event

**Temporal qualification:** Date of this source expression; not an invention or implementation date.

**Qualification / scope limits:** Company availability statement subject to the relevant licence terms; not a claim of unrestricted use, an external open-source certification or terms for later versions.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-29

**Evidence coverage:** Supporting evidence: primary · 1 source

#### Evidence 1 · `evidence-xm-llama-commercial`

**Source title:** Meta and Microsoft Introduce the Next Generation of Llama

**Source ID:** source-xm-llama-commercial

**Publisher / authors:** Meta / Meta

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** The announcement describes Llama 2 as available free for research and commercial use.

**Locator:** Takeaways and opening paragraph describing research and commercial availability.

**Canonical source:** [Meta and Microsoft Introduce the Next Generation of Llama](https://about.fb.com/news/2023/07/llama-2/)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2023-07-18

**Source / version description:** Dated publisher webpage as retrieved; not an authenticated historical capture.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-29

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-29

**Verification note:** Passage checked by machine against the identified source expression. No human editorial acceptance or independent verification of implementation is implied.

**Human decision:**

**Notes:**

---
