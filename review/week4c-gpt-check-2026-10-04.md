# Independent check: week 4c control assessments

Model: Codex, based on GPT-6. The precise serving-model variant is not exposed in this session.

Checked on 2026-10-04 against `review/week4c-contested-for-cross-model.md` at `95e9694ffa075595a49f8474a05aadf4d8287fd5`. This is a bounded source and framing check of the two supplied records. I did not open other check reports, week 4c QA reports, or commit messages. No dataset changes were made.

## Shared finding and retrieval coverage

Both verdicts are **disagree** with the records as framed and placed. This does not adopt either organisation's or its critics' assessment.

“Competent sources disagree whether…” is a claim about the existence of disagreement, rather than the substantive control question. It is editorially self-referential: the evidence headings purport to support or contradict the existence of disagreement, while the passages discuss governance. It is not necessarily a logically circular argument, but it makes the evidence classification circular in use. Each statement also bundles several attributed claims. Put one substantive proposition in the statement and put attributed positions and limits in the qualification.

I opened all nine distinct cited sources live and at their supplied archive timestamps, covering all ten evidence items. Every quotation matches word for word, allowing whitespace normalisation; all supplied locators identify the quoted passage. I checked HTML paragraph boundaries where the web reader split a paragraph into several displayed blocks. No quotation or locator correction is required.

Archives were retrieved sequentially by direct HTTP using raw replay at the cited timestamps. The AI Lab Watch archive redirected to the trailing-slash URL at the same timestamp. Direct HTTP access to OpenAI's live structure page returned 403; the web reader successfully opened it and exposed the passage and surrounding list. All other cited live and archived sources were retrieved directly, including both copies of the Delaware PDF; its quote is on page 1. There is no outstanding retrieval failure requiring an `unable` verdict.

In the tables, evidence numbers refer to the final numeric suffix of each record's supplied evidence IDs. Suggested roles are for the substantive propositions below, construed as questions about practical capability, rather than merely the existence or intended purpose of formal powers.

## `cs-assessed-openai-recapitalization-control`: disagree

Suggested substantive proposition:

> Following the October 2025 recapitalization, the OpenAI Foundation can exercise effective mission-directed control over OpenAI Group PBC in practice.

Define the assessment's scope in the qualification: effective control means being able to use the retained governance powers to enforce the mission when commercial interests or Group management resist. This makes the question testable and removes the undefined contrast between nominal control and “control in substance”. It does not assert that the Foundation has already succeeded or failed in a particular intervention.

### Evidence placement and representation

| Evidence                         | Quote and locator, live + archive        | Suggested role | Reason                                                                                                                                                                          |
| -------------------------------- | ---------------------------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1: OpenAI structure page         | Match; correct list item                 | context        | States continuing control in describing the structure. It does not distinguish formal authority from the practical capability being assessed.                                   |
| 2: NFPG comparative assessment   | Match; correct first sentence            | context        | Compares the outcome with two different baselines. A downgrade from the former structure and improvements over the proposal can both be true while substantive control remains. |
| 3: NFPG dual-director warning    | Match; correct paragraph                 | context        | Describes a conditional failure mechanism, not a finding that the directors actually prioritise the PBC or that all retained control is ineffective.                            |
| 4: CalMatters reported criticism | Match; correct paragraph and sentence    | context        | Reports critics' characterisation and ways commercial actors could prevail. It does not establish that this has happened or identify an exact threshold for effective control.  |
| 5: Delaware DOJ letter           | Match; correct opening paragraph, page 1 | context        | Conditional regulatory non-objection based on representations; its existing placement is appropriate.                                                                           |

**Specific answer on NFPG:** evidence 2 disputes degree and scope relative to the old arrangement, acknowledges improvements over the abandoned proposal, and does not itself deny substantive control. The analysis recognises safety-approval and appointment powers while questioning their exercise. Evidence 3 is conditional; its nominal-control wording must not become a categorical operational finding. [NFPG update](https://notforprivategain.org/november-update).

Attribution is broadly correct. NFPG is an advocacy assessment by its four named signatories, not a regulator's conclusion. CalMatters reports experts' and advocates' positions; its authors are reporting the assessment, not adopting it. The article names participants later, including Robert Bartlett and Steven Adler, but the collective introductory quote should not be assigned wholesale to one of them. Bartlett's discussion is expressly cautious about future committee activity. These sources are competent for their stated analyses and reported concerns; neither institutional interest nor source role automatically invalidates them. [CalMatters article](https://calmatters.org/economy/technology/2025/10/openai-restructuring-deal-full-of-holes-critics-say/).

### Material omissions

The already-cited [Fried/Reiter article](https://corpgov.law.harvard.edu/2026/05/11/ai-corporate-governance-and-ben-jerrys-risk/) treats OpenAI's retained appointment, veto and safety powers as substantial investor-overriding authority and argues that guardian-overreach risk persists. This competent counterweight is missing. It is the authors' analysis, not Harvard's position or proof of successful mission enforcement.

[Bret Taylor's October 28 announcement](https://openai.com/index/built-to-benefit-everyone/), under “Mission at the center”, additionally asserts that retained control preserves mission-focused governance. That is a relevant organisational assurance, stronger in framing than the isolated structure sentence, but not a direct answer to NFPG's later dual-loyalty concerns. A bounded search did not establish a direct organisational rebuttal to those concerns.

### Exact recommended fixes

1. Replace the multi-claim statement with the substantive proposition above, with a new stable claim ID linked by `supersedes` if required by the proposition-change policy.
2. Set resolution to **unresolved** and set all five existing evidence items to **context**. Preserve their quotes and locators. The packet does not establish opposed assessments of the same clearly defined practical capability. This is a scope judgment, not a requirement that every assessment prove an operational outcome.
3. Replace the qualification with:

   > Effective control here concerns the Foundation's ability to enforce its mission through its retained governance powers when commercial interests or Group management resist. OpenAI asserts continuing control; formal rights are documented separately. NFPG recognises improvements over the abandoned proposal while judging control weaker than under the former structure and identifying conditional risks to effective exercise. CalMatters reports critics' concerns about possible commercial predominance. The Delaware Attorney General's non-objection is conditional on representations. These sources do not settle practical effectiveness, and no legal conclusion or side is adopted.

4. Add the omitted attributed analyses as context if this question is retained. Do not restore `contested` merely because one source says control and another says downgrade; obtain passages explicitly assessing the same practical capability on opposing sides first.

## `cs-assessed-anthropic-ltbt-independence`: disagree

Suggested substantive proposition:

> Anthropic's Long-Term Benefit Trust has sufficient independence from stockholders to exercise effective public-interest oversight of Anthropic in practice.

The qualification should specify that the uncertainty concerns the Trust's capacity to intervene when public-interest oversight conflicts with stockholder preferences. Financial disinterest, a recognised oversight role and complete insulation from removal are distinct questions.

### Evidence placement and representation

| Evidence                                   | Quote and locator, live + archive    | Suggested role | Reason                                                                                                                                                                            |
| ------------------------------------------ | ------------------------------------ | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1: Anthropic's 2023 design description     | Match; correct section and paragraph | context        | “Designed to” states design intent, not achieved independence in practice.                                                                                                        |
| 2: Anthropic's Bernanke announcement       | Match; correct paragraph             | context        | Asserts a checking role; does not address its effectiveness under opposing stockholder pressure.                                                                                  |
| 3: Stein-Perlman's AI Lab Watch conclusion | Match; correct section               | context        | Tentative assessment of possible subordination and likely loss of powers, based on limited public information. It is not a categorical finding of inability to provide any check. |
| 4: Fried/Reiter assessment                 | Match; correct paragraph             | context        | Partial insulation is compatible with sufficient insulation for some oversight. Their assessment also favours limiting guardian overreach.                                        |
| 5: Morley/Berger/Simmerman description     | Match; correct paragraph             | context        | Explains accountability mechanisms; does not settle whether independence is sufficient. Existing placement is appropriate.                                                        |

**Specific answer on design intent:** evidence 1 belongs in context for practical independence. Anthropic also presents the arrangement as experimental, with efficacy still to be learned. Removing that limitation turns an intended safeguard into an achieved result. [Anthropic's original explanation](https://www.anthropic.com/news/the-long-term-benefit-trust).

Evidence 2 is a real positive organisational assertion about the Trust's role; do not erase it. The same paragraph calls Trustees independent of management and investors and explains their financial disinterest. Those claims still do not answer whether the stockholder failsafe prevents effective intervention against stockholder wishes. [Bernanke announcement](https://www.anthropic.com/news/ben-bernanke).

The critics should not be presented as one camp denying independence. Stein-Perlman offers a tentative governance critique and acknowledges that stronger accountability remains possible; his 2024 information limits should not become assertions about the 2026 arrangement. [AI Lab Watch post](https://ailabwatch.org/blog/anthropic-trust-powerless). Fried and Reiter acknowledge that guardians can do too little but emphasise the danger of doing too much; they regard investor override as a safeguard. Their comparison does not conclude that the Trust is insufficiently independent for every public-interest check. Morley, Berger and Simmerman are outside counsel describing the arrangement they helped create, not an independent evaluation of its performance. [Counsel's description](https://corpgov.law.harvard.edu/2023/10/28/anthropic-long-term-benefit-trust/).

### Material omissions

Anthropic's [Transparency Hub](https://www.anthropic.com/transparency/voluntary-commitments), under “Corporate Governance and Financing Transparency”, expressly links the Trust's appointment powers to insulating the mission from short-term commercial and shareholder pressures. This is a more direct positive assessment of the intended protection and should be represented. It does not specifically resolve the failsafe criticism. Its undated, changing text needs an expression date or snapshot before admission.

Anthropic's [April 14, 2026 appointment announcement](https://www.anthropic.com/news/narasimhan-board) states that Trust-appointed directors then formed a board majority. This matters when qualifying a 2024 account of uncertain phase-in; appointment power is still separate from independence against removal. Neither omission establishes practical success. No direct response specifying why the failsafe leaves adequate independence was found in this bounded check.

### Exact recommended fixes

1. Replace the multi-claim statement with the substantive proposition above; use a new stable ID with `supersedes` if required.
2. For this practical-capability question, set resolution to **unresolved** and all five existing items to **context**. A checking role, intended independence, possible subordination and partial insulation can coexist. They do not alone establish a binary disagreement about sufficient practical independence under stockholder opposition.
3. Replace the qualification with:

   > The unresolved question is whether the Trust can exercise effective public-interest oversight when stockholder preferences conflict with that oversight. Anthropic describes financially disinterested Trustees, an intended independent design and a checking role. Stein-Perlman's 2024 analysis tentatively identifies possible stockholder subordination under incompletely disclosed failsafe terms. Fried and Reiter describe partial investor insulation and favour constraints on guardian overreach; they do not simply deny an effective checking role. Outside counsel describe the arrangement's accountability and amendment mechanisms. Source dates and subsequent phase-in must be distinguished. The inspected public descriptions do not settle practical effectiveness; no side or legal conclusion is adopted.

4. Add the omitted company position and phase-in announcement with their scope and dates visible. A separate **predictive assessment of the design's resistance to shareholder pressure** could potentially be contested using the more direct Transparency Hub assertion and Stein-Perlman's counter-assessment. That would require aligning the proposition, expressions and sides explicitly; it should not be smuggled into the current record by treating design intent as demonstrated practice.

## Status rule

If no genuine same-proposition disagreement remains after this alignment, the record should be **unresolved with context-only evidence**. That is the recommended treatment of these practical-capability questions on the supplied passages. It preserves the competing assurances and concerns without inventing either a settled result or a sharper disagreement than the sources express.
