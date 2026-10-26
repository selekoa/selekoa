# Selekoa — personnel continuity review

30 claims, grouped by type. These are research seeds; machine checks are not human review. This document is an editorial working aid and is never loaded by the application.

Schema: 2.1. Dataset date: 2026-09-18. Dataset fingerprint: `17b875840b4087e744cf7000395e038f9cb63f4d11a7070fec049111fc311179`.

Claim wording, qualifications and passages below come from the validated dataset. Quotes and paraphrases are labelled separately. Source roles are relative to each claim. A primary source is not a truth rank, and multiple sources do not guarantee independence.

## Recorded decisions

The supplied decisions and both audits’ per-claim notes were recorded on 2026-09-18 at futurelightcone’s explicit request. Audit 1 supplies claim IDs; Audit 2 is mapped by the unchanged 30-claim review order. Twenty-nine claims have matching YES decisions. Claim 02 has Audit 1: EDIT and Audit 2: YES; its working decision is EDIT, pending reconciliation rather than an assertion that both audits agree.

Audit 1 proposes expanding Daniela Amodei’s prior title to “VP of Safety and Policy”; Audit 2 supports the existing attribution to the slide’s “VP of Safety” wording. Both positions are preserved below. No replacement wording or structured-role change has been applied to the dataset, and no additional source has been treated as verified through these notes alone.

Audit comments retain their submitted wording and are not independently verified corrections or new dataset claims. In particular, first authorship alone does not establish engineering leadership (claim 06); claim 13 already labels the Amazon biography as secondary evidence; and a founder’s self-report is primary evidence, not an automatic quality ranking (claim 24). Later events mentioned in notes remain outside the scoped historical records.

All 30 claims remain seed and all linked evidence remains machine_checked. Neither supplied audit nor its recorded decision establishes personal human source inspection. The dataset fingerprint above identifies the unchanged reviewed dataset; this edited working copy must not be regenerated over.

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

## People / prior and historical roles

### 01 · `dario-openai-vp-2020`

**Statement:** OpenAI identified Dario Amodei as VP of Research in its December 2020 departure announcement.

**Relation:** Dario Amodei \[dario-amodei\] → held\_role (held role at) → OpenAI \[openai\]

**Relation semantics:** An institutional role with explicitly scoped time: snapshot, sourced interval, or unknown dates. No continuing appointment is implied.

**Temporal scope:** 2020-12-29 · snapshot; kind: snapshot

**Temporal qualification:** Snapshot at the dated source announcement; no employment interval or current appointment is inferred.

**Qualification / scope limits:** Role identified at departure announcement; neither appointment date nor final working day is established.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-18

**Evidence coverage:** Supporting evidence: primary · 1 source

**Structured attributes:**

```json
{
  "role": "VP of Research"
}
```

#### Evidence 1 · `evidence-dario-openai-vp-2020`

**Source title:** Organizational update from OpenAI

**Source ID:** source-openai-org-update-2020

**Publisher / authors:** OpenAI / OpenAI

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** The departure paragraph identifies Amodei as VP of Research.

**Locator:** Body, paragraph announcing Dario Amodei’s departure

**Canonical source:** [Organizational update from OpenAI](https://openai.com/index/organizational-update/)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2020-12-29

**Source / version description:** Dated announcement, retrieved 2026-09-18; announcement time is distinct from the last working day.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-18

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-18

**Verification note:** Relevant source passage inspected by an automated research assistant. Human source review is pending.

**Human decision:** YES

**Notes:**

Audit 2 (YES): Confirmed on [https://openai.com/index/organizational-update/](https://openai.com/index/organizational-update/) (29 Dec 2020): “Dario Amodei, VP of Research, is leaving OpenAI…” Snapshot role at departure announcement correctly scoped.

---

### 02 · `daniela-openai-safety-prior`

**Statement:** Anthropic’s founder slide identifies Daniela Amodei as a former VP of Safety at OpenAI.

**Relation:** Daniela Amodei \[daniela-amodei\] → held\_role (held role at) → OpenAI \[openai\]

**Relation semantics:** An institutional role with explicitly scoped time: snapshot, sourced interval, or unknown dates. No continuing appointment is implied.

**Temporal scope:** Date unknown; kind: unknown

**Temporal qualification:** The source establishes a prior role but does not supply employment dates. No start or end is inferred.

**Qualification / scope limits:** The slide’s title is retained as “VP of Safety”; no additional policy remit or tenure dates are inferred.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-18

**Evidence coverage:** Supporting evidence: primary · 1 source

**Structured attributes:**

```json
{
  "role": "VP of Safety"
}
```

#### Evidence 1 · `evidence-daniela-openai-safety-prior`

**Source title:** Leverage Anthropic’s Claude models for AI’s evolving landscape

**Source ID:** source-anthropic-reinvent-2024

**Publisher / authors:** Anthropic / AWS re:Invent / Maggie Vo; Elie Schoppik

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** Daniela’s row describes her previous OpenAI safety vice-presidency.

**Locator:** PDF page 6, “Our business”, Daniela Amodei row

**Canonical source:** [Leverage Anthropic’s Claude models for AI’s evolving landscape](https://d1.awsstatic.com/onedam/marketing-channels/website/aws/en_US/events/approved/reinvent-2025/reinvent/2024/slides/aim/AIM123-S_Leverage-Anthropics-Claude-models-for-AIs-evolving-landscape-sponsored-by-Anthropic.pdf)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2024

**Source / version description:** AIM123-S; 2024 deck as identified by copyright and event path. PDF page 6 contains founder rows. No exact presentation or upload date inferred.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-18

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-18

**Verification note:** Relevant source passage inspected by an automated research assistant. Human source review is pending.

**Human decision:** EDIT

**Notes:**

Audit 1 (EDIT): The claim and structured attribute record "VP of Safety" as the slide's label, and the qualification already signals the abbreviation ("no additional policy remit…is inferred"). However, multiple independent sources confirm that the full title was VP of Safety and Policy (Wikipedia, longtermwiki, Fortune calls it "senior vice president of safety and policy"). The slide appears to truncate the title. Update the structured attribute role to "VP of Safety and Policy" and adjust the claim statement to match. The qualification note "the slide's title is retained as 'VP of Safety'" is accurate as a source-fidelity statement but should be accompanied by a note that the full title per other sources includes the Policy remit. One source (Tygart Media) says "VP of Operations" — this appears to be an error and should not be treated as a competing title.

Audit 2 (YES): Anthropic 2024 re:Invent founder slide (AIM123-S PDF page 6) identifies Daniela Amodei with prior OpenAI VP of Safety title. Prior-role attribution correctly scoped (no dates inferred).

---

### 03 · `olah-openai-interpretability-prior`

**Statement:** Chris Olah’s biography states that he previously led interpretability research at OpenAI.

**Relation:** Chris Olah \[chris-olah\] → held\_role (held role at) → OpenAI \[openai\]

**Relation semantics:** An institutional role with explicitly scoped time: snapshot, sourced interval, or unknown dates. No continuing appointment is implied.

**Temporal scope:** Date unknown; kind: unknown

**Temporal qualification:** The source establishes a prior role but does not supply employment dates. No start or end is inferred.

**Qualification / scope limits:** First-person retrospective; title is a description of research responsibility, not an inferred corporate rank.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-18

**Evidence coverage:** Supporting evidence: primary · 1 source

**Structured attributes:**

```json
{
  "role": "Interpretability research lead"
}
```

#### Evidence 1 · `evidence-olah-openai-interpretability-prior`

**Source title:** About Me — Christopher Olah

**Source ID:** source-olah-bio

**Publisher / authors:** colah’s blog / Christopher Olah

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** Olah describes earlier leadership of OpenAI’s interpretability research.

**Locator:** About Me, biography paragraph beginning “I’m one of the co-founders”

**Canonical source:** [About Me — Christopher Olah](https://colah.github.io/about.html)

**Evidence URL:** Same as canonical source.

**Source publication date:** Unknown; not inferred from access date

**Source / version description:** Undated mutable personal biography inspected 2026-09-18. It establishes prior roles, not their start or end dates.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-18

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-18

**Verification note:** Relevant source passage inspected by an automated research assistant. Human source review is pending.

**Human decision:** YES

**Notes:**

Audit 1 (YES): Mutable source; the page as accessed reflects a retrospective prior role. Olah's progression (Google Brain → OpenAI → Anthropic co-founder) is confirmed across independent sources.

Audit 2 (YES): [https://colah.github.io/about.html](https://colah.github.io/about.html): “Previously, I led interpretability research at OpenAI…” Explicit first-person prior-role statement; title is descriptive of research responsibility.

---

### 04 · `olah-brain-team-2017`

**Statement:** Google Brain’s September 2017 research account identifies Chris Olah as a Brain team member.

**Relation:** Chris Olah \[chris-olah\] → held\_role (held role at) → Google Brain \[google-brain\]

**Relation semantics:** An institutional role with explicitly scoped time: snapshot, sourced interval, or unknown dates. No continuing appointment is implied.

**Temporal scope:** 2017-09-13 · snapshot; kind: snapshot

**Temporal qualification:** Team-membership snapshot in a dated institutional account; no full employment interval is inferred.

**Qualification / scope limits:** Team membership is explicitly stated in the article body. No precise job rank or continuing role is inferred.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-18

**Evidence coverage:** Supporting evidence: primary · 1 source

**Structured attributes:**

```json
{
  "role": "Research team member"
}
```

#### Evidence 1 · `evidence-olah-brain-team-2017`

**Source title:** The Google Brain Team’s Approach to Research

**Source ID:** source-brain-research-2017

**Publisher / authors:** Google Research / Jeff Dean

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** The Distill paragraph explicitly identifies Chris Olah as a Brain team member.

**Locator:** Body, paragraph introducing Distill.pub

**Canonical source:** [The Google Brain Team’s Approach to Research](https://research.google/blog/the-google-brain-teams-approach-to-research/)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2017-09-13

**Source / version description:** Dated team account. Organisational identity is taken from the body, not mutable author-profile titles.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-18

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-18

**Verification note:** Relevant source passage inspected by an automated research assistant. Human source review is pending.

**Human decision:** YES

**Notes:**

Audit 1 (YES): Snapshot in a dated institutional source; not mutable. Consistent with Olah's documented career trajectory.

Audit 2 (YES): [https://research.google/blog/the-google-brain-teams-approach-to-research/](https://research.google/blog/the-google-brain-teams-approach-to-research/) (13 Sep 2017) explicitly identifies Chris Olah as a Brain team member in the Distill paragraph. Team-membership snapshot correctly scoped.

---

### 05 · `clark-openai-policy-prior`

**Statement:** Jack Clark’s biography identifies his prior role as Policy Director at OpenAI.

**Relation:** Jack Clark \[jack-clark\] → held\_role (held role at) → OpenAI \[openai\]

**Relation semantics:** An institutional role with explicitly scoped time: snapshot, sourced interval, or unknown dates. No continuing appointment is implied.

**Temporal scope:** Date unknown; kind: unknown

**Temporal qualification:** The source establishes a prior role but does not supply employment dates. No start or end is inferred.

**Qualification / scope limits:** Retrospective biography; the source-access date does not date the role.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-18

**Evidence coverage:** Supporting evidence: primary · 1 source

**Structured attributes:**

```json
{
  "role": "Policy Director"
}
```

#### Evidence 1 · `evidence-clark-openai-policy-prior`

**Source title:** About — Import AI

**Source ID:** source-clark-bio

**Publisher / authors:** Import AI / Jack Clark

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** Clark describes his pre-Anthropic position as OpenAI’s Policy Director.

**Locator:** Biography, first paragraph

**Canonical source:** [About — Import AI](https://jack-clark.net/about/)

**Evidence URL:** Same as canonical source.

**Source publication date:** Unknown; not inferred from access date

**Source / version description:** Undated mutable biography inspected 2026-09-18. Historic role only; page comments and original blog creation date do not date the current biography.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-18

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-18

**Verification note:** Relevant source passage inspected by an automated research assistant. Human source review is pending.

**Human decision:** YES

**Notes:**

Audit 2 (YES): [https://jack-clark.net/about/](https://jack-clark.net/about/): “Prior to Anthropic, Jack was the Policy Director of OpenAI.” Explicit retrospective prior role; no dates inferred.

---

### 06 · `brown-openai-gpt3-prior`

**Statement:** Anthropic’s founder slide identifies Tom Brown as a former GPT-3 Engineering Lead at OpenAI.

**Relation:** Tom Brown \[tom-brown\] → held\_role (held role at) → OpenAI \[openai\]

**Relation semantics:** An institutional role with explicitly scoped time: snapshot, sourced interval, or unknown dates. No continuing appointment is implied.

**Temporal scope:** Date unknown; kind: unknown

**Temporal qualification:** The source establishes a prior role but does not supply employment dates. No start or end is inferred.

**Qualification / scope limits:** A project leadership role, not an assertion that he led all OpenAI engineering. Dates are unspecified.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-18

**Evidence coverage:** Supporting evidence: primary · 1 source

**Structured attributes:**

```json
{
  "role": "GPT-3 Engineering Lead"
}
```

#### Evidence 1 · `evidence-brown-openai-gpt3-prior`

**Source title:** Leverage Anthropic’s Claude models for AI’s evolving landscape

**Source ID:** source-anthropic-reinvent-2024

**Publisher / authors:** Anthropic / AWS re:Invent / Maggie Vo; Elie Schoppik

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** Brown’s row records prior GPT-3 engineering leadership at OpenAI.

**Locator:** PDF page 6, “Our business”, Tom Brown row

**Canonical source:** [Leverage Anthropic’s Claude models for AI’s evolving landscape](https://d1.awsstatic.com/onedam/marketing-channels/website/aws/en_US/events/approved/reinvent-2025/reinvent/2024/slides/aim/AIM123-S_Leverage-Anthropics-Claude-models-for-AIs-evolving-landscape-sponsored-by-Anthropic.pdf)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2024

**Source / version description:** AIM123-S; 2024 deck as identified by copyright and event path. PDF page 6 contains founder rows. No exact presentation or upload date inferred.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-18

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-18

**Verification note:** Relevant source passage inspected by an automated research assistant. Human source review is pending.

**Human decision:** YES

**Notes:**

Audit 1 (YES): Corroborated by the GPT-3 paper (arXiv:2005.14165), which credits Tom B. Brown as first author. The "engineering lead" description fits his authorship role.

Audit 2 (YES): Same Anthropic 2024 founder slide (page 6) records Tom Brown’s prior GPT-3 Engineering Lead role at OpenAI. Project-leadership attribution correctly scoped.

---

### 07 · `babuschkin-deepmind-prior`

**Statement:** Igor Babuschkin’s career account describes research on WaveNet and AlphaStar at DeepMind.

**Relation:** Igor Babuschkin \[igor-babuschkin\] → held\_role (held role at) → DeepMind \[deepmind\]

**Relation semantics:** An institutional role with explicitly scoped time: snapshot, sourced interval, or unknown dates. No continuing appointment is implied.

**Temporal scope:** Date unknown; kind: unknown

**Temporal qualification:** The source establishes a prior role but does not supply employment dates. No start or end is inferred.

**Qualification / scope limits:** Retrospective self-description; project work does not establish a formal rank, continuous tenure, or exact employment boundaries.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-18

**Evidence coverage:** Supporting evidence: primary · 1 source

**Structured attributes:**

```json
{
  "role": "Researcher (specific rank unstated)"
}
```

#### Evidence 1 · `evidence-babuschkin-deepmind-prior`

**Source title:** About — Igor Babuschkin

**Source ID:** source-babuschkin-bio

**Publisher / authors:** Igor Babuschkin / Igor Babuschkin

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** His career account places WaveNet and AlphaStar work at DeepMind.

**Locator:** The Journey, DeepMind paragraph

**Canonical source:** [About — Igor Babuschkin](https://babuschk.in/about.html)

**Evidence URL:** Same as canonical source.

**Source publication date:** Unknown; not inferred from access date

**Source / version description:** Undated personal career account, inspected 2026-09-18. Identity cross-checked via github.com/ibab, whose babushk.in link redirects to this domain. Dates and employment titles are not supplied.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-18

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-18

**Verification note:** Relevant source passage inspected by an automated research assistant. Human source review is pending.

**Human decision:** YES

**Notes:**

Audit 1 (YES): Babuschkin's departure announcement (August 13, 2025) independently confirms his DeepMind background: "who has a background with Google's DeepMind and OpenAI." The bio was accessed September 2026, after his xAI departure, which does not affect this prior-role claim.

Audit 2 (YES): [https://babuschk.in/about.html](https://babuschk.in/about.html): “At DeepMind, I worked on WaveNet and AlphaStar…” Explicit prior research work; rank left unstated as scoped.

---

### 08 · `babuschkin-openai-prior`

**Statement:** Igor Babuschkin’s career account describes work on reasoning and pretraining at OpenAI.

**Relation:** Igor Babuschkin \[igor-babuschkin\] → held\_role (held role at) → OpenAI \[openai\]

**Relation semantics:** An institutional role with explicitly scoped time: snapshot, sourced interval, or unknown dates. No continuing appointment is implied.

**Temporal scope:** Date unknown; kind: unknown

**Temporal qualification:** The source establishes a prior role but does not supply employment dates. No start or end is inferred.

**Qualification / scope limits:** No start/end dates, duration, or precise job title are supplied. No departure event is inferred.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-18

**Evidence coverage:** Supporting evidence: primary · 1 source

**Structured attributes:**

```json
{
  "role": "Researcher (specific rank unstated)"
}
```

#### Evidence 1 · `evidence-babuschkin-openai-prior`

**Source title:** About — Igor Babuschkin

**Source ID:** source-babuschkin-bio

**Publisher / authors:** Igor Babuschkin / Igor Babuschkin

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** His account describes OpenAI work on reasoning and pretraining.

**Locator:** The Journey, OpenAI paragraph

**Canonical source:** [About — Igor Babuschkin](https://babuschk.in/about.html)

**Evidence URL:** Same as canonical source.

**Source publication date:** Unknown; not inferred from access date

**Source / version description:** Undated personal career account, inspected 2026-09-18. Identity cross-checked via github.com/ibab, whose babushk.in link redirects to this domain. Dates and employment titles are not supplied.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-18

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-18

**Verification note:** Relevant source passage inspected by an automated research assistant. Human source review is pending.

**Human decision:** YES

**Notes:**

Audit 1 (YES): See note on 07. Same mutable source; prior-role claim is stable regardless of his August 2025 xAI departure.

Audit 2 (YES): Same page: “I was fortunate to continue pushing the frontier at OpenAI, working on reasoning and pretraining…” Explicit prior work; no dates or precise rank supplied.

---

### 09 · `igor-babuschkin-xai-team-2023`

**Statement:** Igor Babuschkin appeared on xAI’s launch team roster in July 2023.

**Relation:** Igor Babuschkin \[igor-babuschkin\] → held\_role (held role at) → xAI \[xai\]

**Relation semantics:** An institutional role with explicitly scoped time: snapshot, sourced interval, or unknown dates. No continuing appointment is implied.

**Temporal scope:** 2023-07-12 · snapshot; kind: snapshot

**Temporal qualification:** Snapshot at the dated source announcement; no employment interval or current appointment is inferred.

**Qualification / scope limits:** Roster snapshot only; no precise rank, start date, or continuing employment is inferred.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-18

**Evidence coverage:** Supporting evidence: secondary · 1 source

**Structured attributes:**

```json
{
  "role": "Launch team member"
}
```

#### Evidence 1 · `evidence-igor-babuschkin-xai-team-2023`

**Source title:** Musk announces new AI company that seeks to “understand the universe”

**Source ID:** source-xai-team-2023

**Publisher / authors:** Ars Technica / Benj Edwards

**Source role relative to this claim:** secondary

**Evidence role:** supports

**Paraphrase (not a quotation):** The launch report names Igor Babuschkin on xAI’s team.

**Locator:** Body, paragraph following the July 12 website screenshot

**Canonical source:** [Musk announces new AI company that seeks to “understand the universe”](https://arstechnica.com/information-technology/2023/07/musk-announces-new-ai-company-that-seeks-to-understand-the-universe/)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2023-07-12

**Source / version description:** Contemporaneous report and screenshot of the launch roster. The current x.ai company page has changed; original archive retrieval was unavailable.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-18

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-18

**Verification note:** Relevant source passage inspected by an automated research assistant. Human source review is pending.

**Human decision:** YES

**Notes:**

Audit 1 (YES): Babuschkin's own August 2025 departure post confirms the founding: "Today was my last day at xAI, the company that I helped start with Elon Musk in 2023." The snapshot claim is accurate; his departure after the snapshot date is irrelevant to it. Should a departure record exist or be created for Babuschkin (August 13, 2025), it pairs naturally with this roster entry.

Audit 2 (YES): [https://arstechnica.com/information-technology/2023/07/musk-announces-new-ai-company-that-seeks-to-understand-the-universe/](https://arstechnica.com/information-technology/2023/07/musk-announces-new-ai-company-that-seeks-to-understand-the-universe/) (12 Jul 2023) names Igor Babuschkin on the launch roster (with screenshot reference). Roster snapshot correctly scoped.

---

### 10 · `greg-yang-xai-team-2023`

**Statement:** Greg Yang appeared on xAI’s launch team roster in July 2023.

**Relation:** Greg Yang \[greg-yang\] → held\_role (held role at) → xAI \[xai\]

**Relation semantics:** An institutional role with explicitly scoped time: snapshot, sourced interval, or unknown dates. No continuing appointment is implied.

**Temporal scope:** 2023-07-12 · snapshot; kind: snapshot

**Temporal qualification:** Snapshot at the dated source announcement; no employment interval or current appointment is inferred.

**Qualification / scope limits:** Roster snapshot only; no precise rank, start date, or continuing employment is inferred.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-18

**Evidence coverage:** Supporting evidence: secondary · 1 source

**Structured attributes:**

```json
{
  "role": "Launch team member"
}
```

#### Evidence 1 · `evidence-greg-yang-xai-team-2023`

**Source title:** Musk announces new AI company that seeks to “understand the universe”

**Source ID:** source-xai-team-2023

**Publisher / authors:** Ars Technica / Benj Edwards

**Source role relative to this claim:** secondary

**Evidence role:** supports

**Paraphrase (not a quotation):** The launch report names Greg Yang on xAI’s team.

**Locator:** Body, paragraph following the July 12 website screenshot

**Canonical source:** [Musk announces new AI company that seeks to “understand the universe”](https://arstechnica.com/information-technology/2023/07/musk-announces-new-ai-company-that-seeks-to-understand-the-universe/)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2023-07-12

**Source / version description:** Contemporaneous report and screenshot of the launch roster. The current x.ai company page has changed; original archive retrieval was unavailable.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-18

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-18

**Verification note:** Relevant source passage inspected by an automated research assistant. Human source review is pending.

**Human decision:** YES

**Notes:**

Audit 1 (YES): Yang stepped back from xAI into an informal advisory role in January 2026 due to a Lyme disease diagnosis. This does not affect the July 2023 snapshot claim. Should a departure record be created for Yang, note that his exit was health-related and described as a step-back, not a resignation from the founding role per se.

Audit 2 (YES): Same Ars Technica report names Greg Yang on the launch roster. Roster snapshot correctly scoped.

---

### 11 · `yang-microsoft-research-prior`

**Statement:** Greg Yang’s personal biography states that he was previously a researcher at Microsoft Research.

**Relation:** Greg Yang \[greg-yang\] → held\_role (held role at) → Microsoft Research \[microsoft-research\]

**Relation semantics:** An institutional role with explicitly scoped time: snapshot, sourced interval, or unknown dates. No continuing appointment is implied.

**Temporal scope:** Date unknown; kind: unknown

**Temporal qualification:** The source establishes a prior role but does not supply employment dates. No start or end is inferred.

**Qualification / scope limits:** Only the expressly prior Microsoft Research role is used. The mutable page’s present-tense xAI wording is not treated as current employment evidence.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-18

**Evidence coverage:** Supporting evidence: primary · 1 source

**Structured attributes:**

```json
{
  "role": "Researcher"
}
```

#### Evidence 1 · `evidence-yang-microsoft-research-prior`

**Source title:** Greg Yang — Professional page

**Source ID:** source-yang-bio

**Publisher / authors:** Greg Yang / Greg Yang

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** Yang’s introductory biography identifies an earlier research role at Microsoft Research.

**Locator:** About Me, first paragraph

**Canonical source:** [Greg Yang — Professional page](https://thegregyang.com/)

**Evidence URL:** Same as canonical source.

**Source publication date:** Unknown; not inferred from access date

**Source / version description:** Undated mutable personal biography, inspected 2026-09-18. Used only for the explicitly prior Microsoft Research role, not current employment.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-18

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-18

**Verification note:** Relevant source passage inspected by an automated research assistant. Human source review is pending.

**Human decision:** YES

**Notes:**

Audit 1 (YES): The prior-role claim is stable. The bio was accessed in September 2026, after Yang's January 2026 step-back from xAI; the prior Microsoft Research role is unaffected by either event.

Audit 2 (YES): [https://thegregyang.com/](https://thegregyang.com/): “Previously I was a researcher at Microsoft Research.” Explicit prior role; present-tense xAI wording not treated as current-employment evidence.

---

### 12 · `hassabis-deepmind-ceo-2023`

**Statement:** The April 2023 combination announcement identifies Demis Hassabis as DeepMind CEO.

**Relation:** Demis Hassabis \[demis-hassabis\] → held\_role (held role at) → DeepMind \[deepmind\]

**Relation semantics:** An institutional role with explicitly scoped time: snapshot, sourced interval, or unknown dates. No continuing appointment is implied.

**Temporal scope:** 2023-04-20 · snapshot; kind: snapshot

**Temporal qualification:** Snapshot at the dated source announcement; no employment interval or current appointment is inferred.

**Qualification / scope limits:** This refers to the predecessor organisation, distinct from his separately recorded leadership of the combined Google DeepMind unit.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-18

**Evidence coverage:** Supporting evidence: primary · 1 source

**Structured attributes:**

```json
{
  "role": "CEO"
}
```

#### Evidence 1 · `evidence-hassabis-deepmind-ceo-2023`

**Source title:** Announcing Google DeepMind

**Source ID:** source-deepmind-combination

**Publisher / authors:** Google DeepMind / Demis Hassabis

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** The announcement introduces the staff message as a message from DeepMind CEO Demis Hassabis.

**Locator:** Introduction immediately before “Hi Team”

**Canonical source:** [Announcing Google DeepMind](https://deepmind.google/blog/announcing-google-deepmind/)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2023-04-20

**Source / version description:** Dated page, inspected at retrieval

**Version date:** Not separately recorded

**Source accessed:** 2026-09-17

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-18

**Verification note:** Relevant source passage inspected by an automated research assistant. Human source review is pending.

**Human decision:** YES

**Notes:**

Audit 1 (YES): This record and claim 06 in the prior batch (hassabis-deepmind-2023: his stated intent to lead the combined unit) are consistent and complementary: one records his title in the predecessor entity at the moment of announcement, the other records his forward-looking leadership statement for the combined entity.

Audit 2 (YES): [https://deepmind.google/blog/announcing-google-deepmind/](https://deepmind.google/blog/announcing-google-deepmind/) introduces the staff message as from “DeepMind CEO Demis Hassabis.” Predecessor-organisation CEO snapshot correctly scoped (distinct from combined-unit leadership).

---

### 13 · `ng-brain-lead-2011-2012`

**Statement:** Andrew Ng served as founding lead of the Google Brain project from 2011 to 2012.

**Relation:** Andrew Ng \[andrew-ng\] → held\_role (held role at) → Google Brain \[google-brain\]

**Relation semantics:** An institutional role with explicitly scoped time: snapshot, sourced interval, or unknown dates. No continuing appointment is implied.

**Temporal scope:** 2011 → 2012; kind: interval

**Temporal qualification:** The biographical source explicitly gives both years. No precise start/end days or later continuing role are inferred.

**Qualification / scope limits:** A retrospective appointment biography supplies the prior interval; the April 2024 publication and Amazon appointment dates are not tenure dates.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-18

**Evidence coverage:** Supporting evidence: secondary · 1 source

**Structured attributes:**

```json
{
  "role": "Founding lead"
}
```

#### Evidence 1 · `evidence-ng-brain-lead-2011-2012`

**Source title:** Dr. Andrew Ng appointed to Amazon’s Board of Directors

**Source ID:** source-ng-amazon-2024

**Publisher / authors:** Amazon / Amazon Staff

**Source role relative to this claim:** secondary

**Evidence role:** supports

**Paraphrase (not a quotation):** The prior-experience list gives Ng’s Google Brain founding-lead role and the years 2011–2012.

**Locator:** Prior-experience bullet beginning “Founding Lead”

**Canonical source:** [Dr. Andrew Ng appointed to Amazon’s Board of Directors](https://www.aboutamazon.com/news/company-news/dr-andrew-ng-joins-amazon-board-of-directors)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2024-04-11

**Source / version description:** Dated appointment biography. The explicitly stated prior Google Brain leadership interval is used, not the Amazon appointment date.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-18

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-18

**Verification note:** Relevant source passage inspected by an automated research assistant. Human source review is pending.

**Human decision:** YES

**Notes:**

Audit 1 (YES): The evidence entry is tagged secondary but the source field says primary. An Amazon appointment biography is a credible secondary source for Ng's prior Google role. The 2011–2012 interval is consistent with the wider historical record of Google Brain's formation and Ng's move to Baidu in 2014.

Audit 2 (YES): [https://www.aboutamazon.com/news/company-news/dr-andrew-ng-joins-amazon-board-of-directors](https://www.aboutamazon.com/news/company-news/dr-andrew-ng-joins-amazon-board-of-directors) (11 Apr 2024): “Founding Lead of Google’s Google Brain (Deep Learning) Project, from 2011 to 2012.” Explicit prior interval used; Amazon appointment date not treated as tenure date.

---

### 14 · `dean-google-chief-scientist-2023`

**Statement:** Google announced that Jeff Dean would become Google’s Chief Scientist in April 2023.

**Relation:** Jeff Dean \[jeff-dean\] → held\_role (held role at) → Google \[google\]

**Relation semantics:** An institutional role with explicitly scoped time: snapshot, sourced interval, or unknown dates. No continuing appointment is implied.

**Temporal scope:** 2023-04-20 · snapshot; kind: snapshot

**Temporal qualification:** Snapshot at the dated source announcement; no employment interval or current appointment is inferred.

**Qualification / scope limits:** Announcement snapshot; no appointment completion day or employment interval is supplied.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-18

**Evidence coverage:** Supporting evidence: primary · 1 source

**Structured attributes:**

```json
{
  "role": "Chief Scientist"
}
```

#### Evidence 1 · `evidence-dean-google-chief-scientist-2023`

**Source title:** Google DeepMind: Bringing together two world-class AI teams

**Source ID:** source-google-combination-2023

**Publisher / authors:** Google / Sundar Pichai

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** Pichai announces Dean’s new Google Chief Scientist role.

**Locator:** Staff message, Jeff Dean paragraph

**Canonical source:** [Google DeepMind: Bringing together two world-class AI teams](https://blog.google/innovation-and-ai/technology/ai/april-ai-update/)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2023-04-20

**Source / version description:** Dated staff-message recap announcing the combination and leadership roles.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-18

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-18

**Verification note:** Relevant source passage inspected by an automated research assistant. Human source review is pending.

**Human decision:** YES

**Notes:**

Audit 2 (YES): [https://blog.google/innovation-and-ai/technology/ai/april-ai-update/](https://blog.google/innovation-and-ai/technology/ai/april-ai-update/) (20 Apr 2023): “Jeff Dean will take on the elevated role of Google’s Chief Scientist…” Announcement snapshot correctly scoped.

---

### 15 · `dean-google-deepmind-chief-scientist-2023`

**Statement:** Google’s combination announcement stated that Jeff Dean would serve as Chief Scientist to Google DeepMind.

**Relation:** Jeff Dean \[jeff-dean\] → held\_role (held role at) → Google DeepMind \[google-deepmind\]

**Relation semantics:** An institutional role with explicitly scoped time: snapshot, sourced interval, or unknown dates. No continuing appointment is implied.

**Temporal scope:** 2023-04-20 · snapshot; kind: snapshot

**Temporal qualification:** Snapshot at the dated source announcement; no employment interval or current appointment is inferred.

**Qualification / scope limits:** This unit-level remit accompanies the Google-wide role; it does not imply a second legal employer or a CEO appointment.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-18

**Evidence coverage:** Supporting evidence: primary · 1 source

**Structured attributes:**

```json
{
  "role": "Chief Scientist"
}
```

#### Evidence 1 · `evidence-dean-google-deepmind-chief-scientist-2023`

**Source title:** Google DeepMind: Bringing together two world-class AI teams

**Source ID:** source-google-combination-2023

**Publisher / authors:** Google / Sundar Pichai

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** The same announcement assigns Dean a Chief Scientist remit for Google DeepMind.

**Locator:** Staff message, Jeff Dean paragraph, second sentence

**Canonical source:** [Google DeepMind: Bringing together two world-class AI teams](https://blog.google/innovation-and-ai/technology/ai/april-ai-update/)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2023-04-20

**Source / version description:** Dated staff-message recap announcing the combination and leadership roles.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-18

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-18

**Verification note:** Relevant source passage inspected by an automated research assistant. Human source review is pending.

**Human decision:** YES

**Notes:**

Audit 1 (YES): Claims 14, 15, and 16 all derive from the same sentence in Pichai's announcement; separating them into three records correctly reflects the three distinct institutional relationships (Google, Google DeepMind, Google Research).

Audit 2 (YES): Same paragraph: “…he’ll serve as Chief Scientist to Google Research and Google DeepMind.” Unit-level remit correctly scoped.

---

### 16 · `dean-google-research-chief-scientist-2023`

**Statement:** Google’s combination announcement stated that Jeff Dean would serve as Chief Scientist to Google Research.

**Relation:** Jeff Dean \[jeff-dean\] → held\_role (held role at) → Google Research \[google-research\]

**Relation semantics:** An institutional role with explicitly scoped time: snapshot, sourced interval, or unknown dates. No continuing appointment is implied.

**Temporal scope:** 2023-04-20 · snapshot; kind: snapshot

**Temporal qualification:** Snapshot at the dated source announcement; no employment interval or current appointment is inferred.

**Qualification / scope limits:** Google Research remains a distinct research unit in the announcement; this remit does not merge it wholesale into Google DeepMind.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-18

**Evidence coverage:** Supporting evidence: primary · 1 source

**Structured attributes:**

```json
{
  "role": "Chief Scientist"
}
```

#### Evidence 1 · `evidence-dean-google-research-chief-scientist-2023`

**Source title:** Google DeepMind: Bringing together two world-class AI teams

**Source ID:** source-google-combination-2023

**Publisher / authors:** Google / Sundar Pichai

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** The announcement assigns Dean a Chief Scientist remit for Google Research.

**Locator:** Staff message, Jeff Dean paragraph, second sentence

**Canonical source:** [Google DeepMind: Bringing together two world-class AI teams](https://blog.google/innovation-and-ai/technology/ai/april-ai-update/)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2023-04-20

**Source / version description:** Dated staff-message recap announcing the combination and leadership roles.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-18

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-18

**Verification note:** Relevant source passage inspected by an automated research assistant. Human source review is pending.

**Human decision:** YES

**Notes:**

Audit 1 (YES): See note on 15.

Audit 2 (YES): Same sentence assigns the Chief Scientist remit for Google Research. Distinct research-unit identity retained.

---

## People / co-founding

### 17 · `dario-cofounded-anthropic-2021`

**Statement:** Dario Amodei co-founded Anthropic in 2021.

**Relation:** Dario Amodei \[dario-amodei\] → co\_founded (co-founded) → Anthropic \[anthropic\]

**Relation semantics:** Participation in founding an organisation or research team. Neither sole founding nor legal incorporation is implied.

**Temporal scope:** 2021 · event; kind: event

**Temporal qualification:** The source states founding at the beginning of 2021; no exact day or month is encoded.

**Qualification / scope limits:** Co-founding is distinct from the separately recorded executive role and does not identify a legal incorporation date.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-18

**Evidence coverage:** Supporting evidence: primary · 1 source

#### Evidence 1 · `evidence-dario-cofounded-anthropic-2021`

**Source title:** Anthropic Raises Series B to build steerable, interpretable, robust AI systems

**Source ID:** source-anthropic-series-b-2022

**Publisher / authors:** Anthropic / Anthropic

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** The announcement dates Anthropic’s founding to early 2021 and identifies Dario Amodei as a co-founder.

**Locator:** Body, founding paragraph and Dario Amodei quotation attribution

**Canonical source:** [Anthropic Raises Series B to build steerable, interpretable, robust AI systems](https://www.anthropic.com/news/anthropic-raises-series-b-to-build-safe-reliable-ai)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2022-04-29

**Source / version description:** Dated announcement; retrospective founding year stated in body.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-18

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-18

**Verification note:** Relevant source passage inspected by an automated research assistant. Human source review is pending.

**Human decision:** YES

**Notes:**

Audit 2 (YES): [https://www.anthropic.com/news/anthropic-raises-series-b-to-build-safe-reliable-ai](https://www.anthropic.com/news/anthropic-raises-series-b-to-build-safe-reliable-ai) (29 Apr 2022): dates founding to “the beginning of 2021” and identifies Dario Amodei as co-founder/CEO. Co-founding year correctly scoped.

---

### 18 · `daniela-cofounded-anthropic-2021`

**Statement:** Daniela Amodei co-founded Anthropic in 2021.

**Relation:** Daniela Amodei \[daniela-amodei\] → co\_founded (co-founded) → Anthropic \[anthropic\]

**Relation semantics:** Participation in founding an organisation or research team. Neither sole founding nor legal incorporation is implied.

**Temporal scope:** 2021 · event; kind: event

**Temporal qualification:** The source states founding at the beginning of 2021; no exact day or month is encoded.

**Qualification / scope limits:** Co-founding is distinct from the separately recorded executive role and does not identify a legal incorporation date.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-18

**Evidence coverage:** Supporting evidence: primary · 1 source

#### Evidence 1 · `evidence-daniela-cofounded-anthropic-2021`

**Source title:** Anthropic Raises Series B to build steerable, interpretable, robust AI systems

**Source ID:** source-anthropic-series-b-2022

**Publisher / authors:** Anthropic / Anthropic

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** The announcement dates Anthropic’s founding to early 2021 and identifies Daniela Amodei as a co-founder.

**Locator:** Body, founding paragraph and Daniela Amodei quotation attribution

**Canonical source:** [Anthropic Raises Series B to build steerable, interpretable, robust AI systems](https://www.anthropic.com/news/anthropic-raises-series-b-to-build-safe-reliable-ai)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2022-04-29

**Source / version description:** Dated announcement; retrospective founding year stated in body.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-18

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-18

**Verification note:** Relevant source passage inspected by an automated research assistant. Human source review is pending.

**Human decision:** YES

**Notes:**

Audit 1 (YES): Cross-check: a recent comparative report (February 2026) notes "Anthropic, alone among the major AI labs, has retained all seven of its founders," corroborating that the full founding roster is intact.

Audit 2 (YES): Same announcement identifies Daniela Amodei as co-founder/President and dates founding to early 2021. Co-founding year correctly scoped.

---

### 19 · `chris-olah-cofounded-anthropic-2021`

**Statement:** Chris Olah is credited as an Anthropic co-founder in the company’s 2024 founder slide.

**Relation:** Chris Olah \[chris-olah\] → co\_founded (co-founded) → Anthropic \[anthropic\]

**Relation semantics:** Participation in founding an organisation or research team. Neither sole founding nor legal incorporation is implied.

**Temporal scope:** 2021 · event; kind: event

**Temporal qualification:** The same slide dates the organisation’s founding to 2021. No individual signing date or legal incorporation date is supplied.

**Qualification / scope limits:** Institutional co-founder attribution, not a claim to an exhaustive founding roster or a present executive title.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-18

**Evidence coverage:** Supporting evidence: primary · 1 source

#### Evidence 1 · `evidence-chris-olah-cofounded-anthropic-2021`

**Source title:** Leverage Anthropic’s Claude models for AI’s evolving landscape

**Source ID:** source-anthropic-reinvent-2024

**Publisher / authors:** Anthropic / AWS re:Invent / Maggie Vo; Elie Schoppik

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** The 2021 founding panel credits Chris Olah as a co-founder.

**Locator:** PDF page 6, “Our business”, Founded panel and Chris Olah row

**Canonical source:** [Leverage Anthropic’s Claude models for AI’s evolving landscape](https://d1.awsstatic.com/onedam/marketing-channels/website/aws/en_US/events/approved/reinvent-2025/reinvent/2024/slides/aim/AIM123-S_Leverage-Anthropics-Claude-models-for-AIs-evolving-landscape-sponsored-by-Anthropic.pdf)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2024

**Source / version description:** AIM123-S; 2024 deck as identified by copyright and event path. PDF page 6 contains founder rows. No exact presentation or upload date inferred.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-18

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-18

**Verification note:** Relevant source passage inspected by an automated research assistant. Human source review is pending.

**Human decision:** YES

**Notes:**

Audit 2 (YES): Anthropic 2024 founder slide (page 6) credits Chris Olah as co-founder and dates organisation founding to 2021. Institutional attribution correctly scoped.

---

### 20 · `jack-clark-cofounded-anthropic-2021`

**Statement:** Jack Clark is credited as an Anthropic co-founder in the company’s 2024 founder slide.

**Relation:** Jack Clark \[jack-clark\] → co\_founded (co-founded) → Anthropic \[anthropic\]

**Relation semantics:** Participation in founding an organisation or research team. Neither sole founding nor legal incorporation is implied.

**Temporal scope:** 2021 · event; kind: event

**Temporal qualification:** The same slide dates the organisation’s founding to 2021. No individual signing date or legal incorporation date is supplied.

**Qualification / scope limits:** Institutional co-founder attribution, not a claim to an exhaustive founding roster or a present executive title.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-18

**Evidence coverage:** Supporting evidence: primary · 1 source

#### Evidence 1 · `evidence-jack-clark-cofounded-anthropic-2021`

**Source title:** Leverage Anthropic’s Claude models for AI’s evolving landscape

**Source ID:** source-anthropic-reinvent-2024

**Publisher / authors:** Anthropic / AWS re:Invent / Maggie Vo; Elie Schoppik

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** The 2021 founding panel credits Jack Clark as a co-founder.

**Locator:** PDF page 6, “Our business”, Founded panel and Jack Clark row

**Canonical source:** [Leverage Anthropic’s Claude models for AI’s evolving landscape](https://d1.awsstatic.com/onedam/marketing-channels/website/aws/en_US/events/approved/reinvent-2025/reinvent/2024/slides/aim/AIM123-S_Leverage-Anthropics-Claude-models-for-AIs-evolving-landscape-sponsored-by-Anthropic.pdf)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2024

**Source / version description:** AIM123-S; 2024 deck as identified by copyright and event path. PDF page 6 contains founder rows. No exact presentation or upload date inferred.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-18

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-18

**Verification note:** Relevant source passage inspected by an automated research assistant. Human source review is pending.

**Human decision:** YES

**Notes:**

Audit 2 (YES): Same slide credits Jack Clark as co-founder with 2021 founding panel. Institutional attribution correctly scoped.

---

### 21 · `tom-brown-cofounded-anthropic-2021`

**Statement:** Tom Brown is credited as an Anthropic co-founder in the company’s 2024 founder slide.

**Relation:** Tom Brown \[tom-brown\] → co\_founded (co-founded) → Anthropic \[anthropic\]

**Relation semantics:** Participation in founding an organisation or research team. Neither sole founding nor legal incorporation is implied.

**Temporal scope:** 2021 · event; kind: event

**Temporal qualification:** The same slide dates the organisation’s founding to 2021. No individual signing date or legal incorporation date is supplied.

**Qualification / scope limits:** Institutional co-founder attribution, not a claim to an exhaustive founding roster or a present executive title.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-18

**Evidence coverage:** Supporting evidence: primary · 1 source

#### Evidence 1 · `evidence-tom-brown-cofounded-anthropic-2021`

**Source title:** Leverage Anthropic’s Claude models for AI’s evolving landscape

**Source ID:** source-anthropic-reinvent-2024

**Publisher / authors:** Anthropic / AWS re:Invent / Maggie Vo; Elie Schoppik

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** The 2021 founding panel credits Tom Brown as a co-founder.

**Locator:** PDF page 6, “Our business”, Founded panel and Tom Brown row

**Canonical source:** [Leverage Anthropic’s Claude models for AI’s evolving landscape](https://d1.awsstatic.com/onedam/marketing-channels/website/aws/en_US/events/approved/reinvent-2025/reinvent/2024/slides/aim/AIM123-S_Leverage-Anthropics-Claude-models-for-AIs-evolving-landscape-sponsored-by-Anthropic.pdf)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2024

**Source / version description:** AIM123-S; 2024 deck as identified by copyright and event path. PDF page 6 contains founder rows. No exact presentation or upload date inferred.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-18

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-18

**Verification note:** Relevant source passage inspected by an automated research assistant. Human source review is pending.

**Human decision:** YES

**Notes:**

Audit 2 (YES): Same slide credits Tom Brown as co-founder with 2021 founding panel. Institutional attribution correctly scoped.

---

### 22 · `babuschkin-cofounded-xai`

**Statement:** Igor Babuschkin states that he co-founded xAI with Elon Musk.

**Relation:** Igor Babuschkin \[igor-babuschkin\] → co\_founded (co-founded) → xAI \[xai\]

**Relation semantics:** Participation in founding an organisation or research team. Neither sole founding nor legal incorporation is implied.

**Temporal scope:** Date unknown; kind: unknown

**Temporal qualification:** This retrospective co-founding statement supplies no date. The separately dated launch roster is not treated as a founding or incorporation date.

**Qualification / scope limits:** First-person co-founder attribution; no complete founder roster or legal status is established.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-18

**Evidence coverage:** Supporting evidence: primary · 1 source

#### Evidence 1 · `evidence-babuschkin-cofounded-xai`

**Source title:** About — Igor Babuschkin

**Source ID:** source-babuschkin-bio

**Publisher / authors:** Igor Babuschkin / Igor Babuschkin

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** Babuschkin describes co-founding xAI together with Musk.

**Locator:** The Journey, xAI paragraph

**Canonical source:** [About — Igor Babuschkin](https://babuschk.in/about.html)

**Evidence URL:** Same as canonical source.

**Source publication date:** Unknown; not inferred from access date

**Source / version description:** Undated personal career account, inspected 2026-09-18. Identity cross-checked via github.com/ibab, whose babushk.in link redirects to this domain. Dates and employment titles are not supplied.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-18

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-18

**Verification note:** Relevant source passage inspected by an automated research assistant. Human source review is pending.

**Human decision:** YES

**Notes:**

Audit 1 (YES): The co-founding statement is independently confirmed by Babuschkin's own X post on departure (August 13, 2025): "Today was my last day at xAI, the company that I helped start with Elon Musk in 2023." Musk replied: "Thanks for helping build @xAI! We wouldn't be here without you." The bio was accessed after his departure; the bio's xAI section may now describe the role as historical, but the co-founding fact is unaffected. The bio is an appropriate primary source for this claim's co-founding scope.

Audit 2 (YES): [https://babuschk.in/about.html](https://babuschk.in/about.html): “I co-founded xAI with Elon Musk…” Explicit first-person co-founder statement; no date supplied, correctly left unknown.

---

### 23 · `demis-hassabis-cofounded-deepmind-2010`

**Statement:** Demis Hassabis co-founded DeepMind in 2010.

**Relation:** Demis Hassabis \[demis-hassabis\] → co\_founded (co-founded) → DeepMind \[deepmind\]

**Relation semantics:** Participation in founding an organisation or research team. Neither sole founding nor legal incorporation is implied.

**Temporal scope:** 2010 · event; kind: event

**Temporal qualification:** Historical event at the precision explicitly supported by the source; not the source-access date.

**Qualification / scope limits:** Founding year only; no incorporation day or sole-founder claim.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-18

**Evidence coverage:** Supporting evidence: primary · 1 source

#### Evidence 1 · `evidence-demis-hassabis-cofounded-deepmind-2010`

**Source title:** From academia to industry: The story of Google DeepMind

**Source ID:** source-legg-deepmind-2014

**Publisher / authors:** Schloss Dagstuhl – Leibniz-Zentrum für Informatik / Shane Legg

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** Legg’s abstract names Demis Hassabis among DeepMind’s 2010 co-founders.

**Locator:** Abstract, first sentence

**Canonical source:** [From academia to industry: The story of Google DeepMind](https://drops.dagstuhl.de/entities/document/10.4230/OASIcs.ICCSW.2014.1)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2014-10-08

**Source / version description:** ICCSW 2014, OASIcs volume 43, page 1. Founder-authored proceedings abstract; DOI 10.4230/OASIcs.ICCSW.2014.1.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-18

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-18

**Verification note:** Relevant source passage inspected by an automated research assistant. Human source review is pending.

**Human decision:** YES

**Notes:**

Audit 1 (YES): The source is authored by co-founder Legg, making it a founder-authored primary account of the founding. Claims 23, 24, and 25 share this source and all three founding attributions are stated in the same sentence.

Audit 2 (YES): [https://drops.dagstuhl.de/entities/document/10.4230/OASIcs.ICCSW.2014.1](https://drops.dagstuhl.de/entities/document/10.4230/OASIcs.ICCSW.2014.1) abstract: Shane Legg “left academia to cofound DeepMind Technologies in 2010, along with Demis Hassabis and Mustafa Suleyman.” Explicit 2010 co-founding credit.

---

### 24 · `shane-legg-cofounded-deepmind-2010`

**Statement:** Shane Legg co-founded DeepMind in 2010.

**Relation:** Shane Legg \[shane-legg\] → co\_founded (co-founded) → DeepMind \[deepmind\]

**Relation semantics:** Participation in founding an organisation or research team. Neither sole founding nor legal incorporation is implied.

**Temporal scope:** 2010 · event; kind: event

**Temporal qualification:** Historical event at the precision explicitly supported by the source; not the source-access date.

**Qualification / scope limits:** Founding year only; no incorporation day or sole-founder claim.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-18

**Evidence coverage:** Supporting evidence: primary · 1 source

#### Evidence 1 · `evidence-shane-legg-cofounded-deepmind-2010`

**Source title:** From academia to industry: The story of Google DeepMind

**Source ID:** source-legg-deepmind-2014

**Publisher / authors:** Schloss Dagstuhl – Leibniz-Zentrum für Informatik / Shane Legg

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** Legg’s abstract names Shane Legg among DeepMind’s 2010 co-founders.

**Locator:** Abstract, first sentence

**Canonical source:** [From academia to industry: The story of Google DeepMind](https://drops.dagstuhl.de/entities/document/10.4230/OASIcs.ICCSW.2014.1)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2014-10-08

**Source / version description:** ICCSW 2014, OASIcs volume 43, page 1. Founder-authored proceedings abstract; DOI 10.4230/OASIcs.ICCSW.2014.1.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-18

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-18

**Verification note:** Relevant source passage inspected by an automated research assistant. Human source review is pending.

**Human decision:** YES

**Notes:**

Audit 1 (YES): The author of the source and the subject of the claim are the same person; this is a self-report, which is the highest-quality source for a founding attribution.

Audit 2 (YES): Same abstract names Shane Legg among the 2010 co-founders. Explicit.

---

### 25 · `mustafa-suleyman-cofounded-deepmind-2010`

**Statement:** Mustafa Suleyman co-founded DeepMind in 2010.

**Relation:** Mustafa Suleyman \[mustafa-suleyman\] → co\_founded (co-founded) → DeepMind \[deepmind\]

**Relation semantics:** Participation in founding an organisation or research team. Neither sole founding nor legal incorporation is implied.

**Temporal scope:** 2010 · event; kind: event

**Temporal qualification:** Historical event at the precision explicitly supported by the source; not the source-access date.

**Qualification / scope limits:** Founding year only; no incorporation day or sole-founder claim.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-18

**Evidence coverage:** Supporting evidence: primary · 1 source

#### Evidence 1 · `evidence-mustafa-suleyman-cofounded-deepmind-2010`

**Source title:** From academia to industry: The story of Google DeepMind

**Source ID:** source-legg-deepmind-2014

**Publisher / authors:** Schloss Dagstuhl – Leibniz-Zentrum für Informatik / Shane Legg

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** Legg’s abstract names Mustafa Suleyman among DeepMind’s 2010 co-founders.

**Locator:** Abstract, first sentence

**Canonical source:** [From academia to industry: The story of Google DeepMind](https://drops.dagstuhl.de/entities/document/10.4230/OASIcs.ICCSW.2014.1)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2014-10-08

**Source / version description:** ICCSW 2014, OASIcs volume 43, page 1. Founder-authored proceedings abstract; DOI 10.4230/OASIcs.ICCSW.2014.1.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-18

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-18

**Verification note:** Relevant source passage inspected by an automated research assistant. Human source review is pending.

**Human decision:** YES

**Notes:**

Audit 1 (YES): The 2010 founding claim is unaffected by Suleyman's subsequent departures: from DeepMind (he left before the Google combination), and his later role as CEO of Microsoft AI (announced March 2024). Those are separate events outside this record's scope.

Audit 2 (YES): Same abstract names Mustafa Suleyman among the 2010 co-founders. Explicit.

---

## People / departure announcements and public launch

### 26 · `dario-openai-departure-announced-2020`

**Statement:** OpenAI announced that Dario Amodei was leaving the company.

**Relation:** Dario Amodei \[dario-amodei\] → departure\_announced (had departure announced from) → OpenAI \[openai\]

**Relation semantics:** A source announced this person’s departure from a specified role. The event date is the announcement, not an inferred final working day or end of every association.

**Temporal scope:** 2020-12-29 · event; kind: event

**Temporal qualification:** Public announcement date. The body mentions an employee announcement earlier that month; the exact final working day is not given.

**Qualification / scope limits:** An announced departure, not an exact employment boundary. The unnamed new project is not equated with Anthropic in this record.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-18

**Evidence coverage:** Supporting evidence: primary · 1 source

**Structured attributes:**

```json
{
  "role": "VP of Research"
}
```

#### Evidence 1 · `evidence-dario-openai-departure-announced-2020`

**Source title:** Organizational update from OpenAI

**Source ID:** source-openai-org-update-2020

**Publisher / authors:** OpenAI / OpenAI

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** OpenAI announces Amodei’s departure and says it had been announced to employees earlier in December.

**Locator:** Body, departure paragraph and paragraph beginning “When his departure was announced”

**Canonical source:** [Organizational update from OpenAI](https://openai.com/index/organizational-update/)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2020-12-29

**Source / version description:** Dated announcement, retrieved 2026-09-18; announcement time is distinct from the last working day.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-18

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-18

**Verification note:** Relevant source passage inspected by an automated research assistant. Human source review is pending.

**Human decision:** YES

**Notes:**

Audit 1 (YES): This pairs with claim 01 (role at departure) from the same source. The body says the departure had been communicated to employees "earlier in December," making the December 29 date the public announcement, as the temporal qualification correctly notes.

Audit 2 (YES): OpenAI organisational update (29 Dec 2020) announces Dario Amodei’s departure (and notes earlier employee announcement). Announcement-event correctly scoped (not final working day).

---

### 27 · `musk-openai-board-departure-2018`

**Statement:** OpenAI announced Elon Musk’s departure from its board in February 2018.

**Relation:** Elon Musk \[elon-musk\] → departure\_announced (had departure announced from) → OpenAI \[openai\]

**Relation semantics:** A source announced this person’s departure from a specified role. The event date is the announcement, not an inferred final working day or end of every association.

**Temporal scope:** 2018-02-20 · event; kind: event

**Temporal qualification:** Date of the public board-departure announcement; no general employment-end date is inferred.

**Qualification / scope limits:** Board role only. The announcement also envisages continued advice and donations, so this is not an end to every association.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-18

**Evidence coverage:** Supporting evidence: primary · 1 source

**Structured attributes:**

```json
{
  "role": "Board member"
}
```

#### Evidence 1 · `evidence-musk-openai-board-departure-2018`

**Source title:** OpenAI supporters

**Source ID:** source-openai-supporters-2018

**Publisher / authors:** OpenAI / OpenAI

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** OpenAI says Musk will leave its board while continuing to advise and donate.

**Locator:** Body, paragraph beginning “Additionally, Elon Musk”

**Canonical source:** [OpenAI supporters](https://openai.com/index/openai-supporters/)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2018-02-20

**Source / version description:** Dated announcement; board departure is distinct from continued advice or donations.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-18

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-18

**Verification note:** Relevant source passage inspected by an automated research assistant. Human source review is pending.

**Human decision:** YES

**Notes:**

Audit 1 (YES): Multiple contemporaneous reports (Fortune, CNBC, Electrek) corroborate the announcement date as February 20–21, 2018; the blog post date of February 20 is consistent. The "Board member" role attribute is accurate at departure: Musk's co-chair role from the 2015 founding was formally superseded when Altman became CEO. The announcement says he will "continue to donate and advise," which the qualification correctly captures as limiting the scope to the board role departure.

Audit 2 (YES): [https://openai.com/index/openai-supporters/](https://openai.com/index/openai-supporters/) (20 Feb 2018): “Elon Musk will depart the OpenAI Board but will continue to donate and advise…” Board-departure announcement correctly scoped (continued advice/donations retained).

---

### 28 · `musk-launched-xai-2023`

**Statement:** Elon Musk publicly launched xAI on July 12, 2023.

**Relation:** Elon Musk \[elon-musk\] → launched (publicly launched) → xAI \[xai\]

**Relation semantics:** A public organisational launch by the named actor. This date does not establish legal incorporation or sole founding.

**Temporal scope:** 2023-07-12 · event; kind: event

**Temporal qualification:** Historical event at the precision explicitly supported by the source; not the source-access date.

**Qualification / scope limits:** Public debut, not legal incorporation or sole founding. No organisational succession from OpenAI is implied.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-18

**Evidence coverage:** Supporting evidence: secondary · 1 source

#### Evidence 1 · `evidence-musk-launched-xai-2023`

**Source title:** Elon Musk unveils new AI startup, xAI

**Source ID:** source-xai-launch-2023

**Publisher / authors:** Axios / Hope King

**Source role relative to this claim:** secondary

**Evidence role:** supports

**Paraphrase (not a quotation):** Musk announced xAI’s formation that day.

**Locator:** Opening paragraph and “Driving the news”

**Canonical source:** [Elon Musk unveils new AI startup, xAI](https://www.axios.com/2023/07/12/elon-musk-ai-xai-chatgpt)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2023-07-12

**Source / version description:** Contemporaneous launch report; records public debut, not incorporation.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-18

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-18

**Verification note:** Relevant source passage inspected by an automated research assistant. Human source review is pending.

**Human decision:** YES

**Notes:**

Audit 1 (YES): The July 12, 2023 date is corroborated by the Ars Technica launch report (source-xai-team-2023) used in claims 09 and 10.

Audit 2 (YES): [https://www.axios.com/2023/07/12/elon-musk-ai-xai-chatgpt](https://www.axios.com/2023/07/12/elon-musk-ai-xai-chatgpt) (12 Jul 2023) and contemporaneous reports record Musk’s public launch/announcement of xAI that day. Public-debut event correctly scoped (not incorporation).

---

## Institutions / acquisition and internal team identity

### 29 · `google-acquired-deepmind-2014`

**Statement:** Google acquired DeepMind in early 2014.

**Relation:** Google \[google\] → acquired (acquired) → DeepMind \[deepmind\]

**Relation semantics:** An acquisition of the named organisation, with timing and scope qualified by the evidence. Distinct from an internal reorganisation or team combination.

**Temporal scope:** 2014 · event; kind: event

**Temporal qualification:** Source says early 2014; month and completion day remain unspecified.

**Qualification / scope limits:** No purchase price, legal-entity identifier, or 2023 combination is implied.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-18

**Evidence coverage:** Supporting evidence: primary · 1 source

#### Evidence 1 · `evidence-google-acquired-deepmind-2014`

**Source title:** From academia to industry: The story of Google DeepMind

**Source ID:** source-legg-deepmind-2014

**Publisher / authors:** Schloss Dagstuhl – Leibniz-Zentrum für Informatik / Shane Legg

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** Legg’s 2014 abstract describes Google’s acquisition earlier that year.

**Locator:** Abstract, second paragraph, final sentence

**Canonical source:** [From academia to industry: The story of Google DeepMind](https://drops.dagstuhl.de/entities/document/10.4230/OASIcs.ICCSW.2014.1)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2014-10-08

**Source / version description:** ICCSW 2014, OASIcs volume 43, page 1. Founder-authored proceedings abstract; DOI 10.4230/OASIcs.ICCSW.2014.1.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-18

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-18

**Verification note:** Relevant source passage inspected by an automated research assistant. Human source review is pending.

**Human decision:** YES

**Notes:**

Audit 1 (YES): The acquisition was announced January 26, 2014 at a reported price of approximately £400 million (~$500 million). "Early 2014" is accurate. The source written by Legg in October 2014 refers to the acquisition as something that happened "earlier this year," which confirms the timing without supplying a precise date — consistent with the claim's temporal qualification.

Audit 2 (YES): Legg 2014 abstract: “In early 2014 DeepMind made international business headlines after it was acquired by Google.” Early-2014 acquisition correctly scoped (no price or legal-entity details inferred).

---

### 30 · `brain-unit-google-research-2017`

**Statement:** Google Brain’s 2017 research account describes the team as part of Google Research.

**Relation:** Google Brain \[google-brain\] → unit\_of (was a unit of) → Google Research \[google-research\]

**Relation semantics:** A documented internal research team or unit within an organisation. Does not establish a separate legal subsidiary or an ownership transaction.

**Temporal scope:** 2017-09-13 · snapshot; kind: snapshot

**Temporal qualification:** Snapshot at the dated source announcement; no employment interval or current appointment is inferred.

**Qualification / scope limits:** Internal research-team identity, not a separate legal company or an acquisition. No full membership interval is reconstructed.

**Epistemic dimensions:** derivation: explicit; resolution: supported

**Editorial state:** seed

**Claim recorded:** 2026-09-18

**Evidence coverage:** Supporting evidence: primary · 1 source

#### Evidence 1 · `evidence-brain-unit-google-research-2017`

**Source title:** The Google Brain Team’s Approach to Research

**Source ID:** source-brain-research-2017

**Publisher / authors:** Google Research / Jeff Dean

**Source role relative to this claim:** primary

**Evidence role:** supports

**Paraphrase (not a quotation):** The team places itself alongside other teams within Google Research.

**Locator:** Body, paragraph beginning “Along with other teams within Google Research”

**Canonical source:** [The Google Brain Team’s Approach to Research](https://research.google/blog/the-google-brain-teams-approach-to-research/)

**Evidence URL:** Same as canonical source.

**Source publication date:** 2017-09-13

**Source / version description:** Dated team account. Organisational identity is taken from the body, not mutable author-profile titles.

**Version date:** Not separately recorded

**Source accessed:** 2026-09-18

**Evidence verification:** machine\_checked

**Machine-check date:** 2026-09-18

**Verification note:** Relevant source passage inspected by an automated research assistant. Human source review is pending.

**Human decision:** YES

**Notes:**

Audit 1 (YES): This claim directly supports the qualification in claim 08 of the prior batch (brain-combined-2023: "the source identifies a research team; this record does not treat Brain as a separate legal company"). The two records are complementary.

Audit 2 (YES): Google Brain 2017 research account: “Along with other teams within Google Research…” Explicit internal-unit identity snapshot correctly scoped.

---
