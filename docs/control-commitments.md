# Control structures and external commitments (weeks 4b–4c)

Week 4b added the record types for two governance questions — who controls a developer, through which instrument and from when; and which external commitments and laws apply to frontier developers, who signed them and which published frameworks link themselves to them — together with the first integrated topic, California SB 53. Week 4c re-verified the other topics' research leads and admitted them in two parts: first the OpenAI and Anthropic control structures, then the White House, Seoul and EU commitments. All new records are seeds with machine-checked evidence. Research cut-off and check date: 2026-10-04.

This document describes what each increment admitted. It holds no current counts: the pages, the About & method page and the generated [README coverage](../README.md#research-sample) compute them from the stored records, and counts in the method notes describe an increment as admitted.

## Record types (schema 2.9)

See the [ontology](ontology.md#control-structures-and-external-commitments-schema-29) for the full rules. In short:

- **Control rights** (`holds_control_right`) name the right held, the instrument and the stage (planned, announced, agreed in principle, effective). An announcement is dated by the announcement; an effective arrangement never is. Control is not ownership, and records are never joined into an inferred chain of control. Legal forms, formations, conversions and control assessments have their own records. A control assessment is a question posed by Selekoa (schema 2.10), contested or unresolved, and is dated by the arrangement it concerns or left undated, never by the publication dates of its sources.
- **Signatories and refusals** (`signed_commitment`, `declined_commitment`) separate announced intent, signature and appearance on a published list, and keep any stated scope, such as signing a single chapter.
- **Commitment links** (`references_commitment`) record only what a framework edition says about a commitment or law in its own quoted words: that it fulfils, implements, responds to, serves as its framework under, complies with or merely names it. Date proximity never creates a link.
- **Commitment texts and statutes** are versioned documents that public bodies may publish, so their provisions are quoted and dated like framework provisions.

A commitment, a signature or a legal obligation is never evidence of compliance, implementation or effectiveness.

## California SB 53 as chaptered

[Page](../README.md#research-sample): `#/commitments/external-commitments`. The record set covers:

- **Enactment.** The Governor approved the bill on 29 September 2025 and it was filed and chaptered the same day (Chapter 138, Statutes of 2025). The edition is identified by the chaptered text's publication date, 2025-09-29, and its effective date, 2026-01-01, taken from the codified history notes checked on 2026-10-04 (no amendment shown). The CalCompute section is operative only on an appropriation, which was not checked.
- **Quoted provisions.** Definitions and thresholds (frontier model above 10^26 operations, frontier developer, large frontier developer above $500 million revenue with affiliates, catastrophic risk); the duty to write, implement, comply with and publish a frontier AI framework, its annual review and 30-day publication of material modifications; transparency reports and the system-card rule; internal-use risk summaries; critical safety incident reporting within 15 days, or 24 hours where risk is imminent; the false-statement prohibition; the federal-equivalence pathway; civil penalties of up to $1,000,000 per violation, recoverable only by the Attorney General; and the whistleblower protections.
- **Framework links.** These are quoted from the editions themselves:
  - OpenAI's Frontier Governance Framework (May 2026) states that it is OpenAI's framework under the Act.
  - xAI's December 2025 framework states that it complies.
  - Microsoft's February 2026 framework describes itself as updated after the Act and runs one assessment as the Act requires.
  - Anthropic's RSP v3.0 only names the Act, pointing to separate compliance documentation.
- **One announcement.** Anthropic announced its Frontier Compliance Framework on 19 December 2025 as its compliance framework for SB 53. The framework's own text was not inspected, so it is not linked to the statute.

**Stopped, not resolved.** These questions are listed on the page and not recorded:

- whether the Act applies to any named company;
- alleged violations and the replies to them;
- the legal effect of company designations;
- federal preemption and contract carve-outs;
- what it means to comply with one's own framework or to modify it materially.

## OpenAI and Anthropic control structures (week 4c, part 1)

[Pages](../README.md#research-sample): `#/control/openai` and `#/control/anthropic`. Each is a dated timeline computed from stored records, with a table of who holds which control right over which entity, through which instrument and at which stage. Rows are never joined into a chain of control.

- **OpenAI.** Its nonprofit's legal form and name change (tax year 2024 Form 990). The March 2019 announcement of OpenAI LP and of control by the nonprofit's board, recorded as announced. The tax year 2019 Schedule R relations (OpenAI Inc → OpenAI GP LLC → OpenAI LP, each a separate record) and tax year 2024's OpenAI GP LLC → OpenAI Global LLC. The 2023 change of OpenAI, L.P. into OpenAI OpCo, L.L.C. (court disclosure and the UK CMA) and OpenAI GP LLC's control of the operating company as Manager (CMA). The board changes of 17 and 29 November 2023 and March 2024. The December 2024 plan and the May 2025 decision that the nonprofit would retain control (announced). OpenAI Group PBC's legal form and the Foundation's Class N rights to elect and remove directors and to approve listed actions, read from the filed certificate of 28 October 2025 (effective), with four quoted certificate provisions. The Delaware Attorney General's letter of 28 October 2025 and two representations it records (nonprofit control; the Safety and Security Committee's authority to halt releases). Paul Christiano's appointment to the Foundation board (2026). One unresolved question posed by Selekoa, with context evidence only: whether the Foundation can exercise effective mission-directed control over OpenAI Group PBC in practice after the recapitalization. It is dated by the recapitalization of 28 October 2025.
- **Anthropic.** Its legal form and public-benefit wording (certificates filed 2021-01-26 and 2025-07-03). The 2021 Long-Term Benefit Committee's power to approve or reject director candidates. The Long-Term Benefit Trust's Class T rights: electing up to three of five directors from 6 September 2023, removing them, and consenting to changes to its rights and to the board's size. The phase-in definitions in the certificates of September 2023 and January 2024 and the textual change between them (an inferred document comparison). Anthropic's 2023 description of the Trust, three Trust-appointed directors and Paul Christiano's term as an initial Trustee. One unresolved question posed by Selekoa, with context evidence only: whether the Trust is independent enough of stockholders to exercise effective public-interest oversight in practice. It is undated.

Certificates of incorporation and the Delaware letter are recorded as document versions published by the company or the public body, so their provisions are quoted and dated like framework provisions. A provision of a regulator's letter that records a company's representation is the letter's statement; it is not evidence that the representation binds anyone or has been carried out. The Anthropic certificates are Delaware-stamped scans published by AI Lab Watch, read from page images; the OpenAI Group PBC certificate's OCR layer contains recognition errors, so its quotes were also read from the page images.

**Set aside, not recorded.** Whether the representations to the Attorneys General bind OpenAI or their conditions were met; whether the Class N rights or the Trust's rights amount to control in law; how the 2023 and 2025 restructurings were carried out in law; the difference between the representation about the safety clause and the filed charter's wording; whether Paul Christiano's appointment meets the board-separation representation; the reasons for the November 2023 events; whether Anthropic's stockholders can change or end the Trust; the dates of the Trust's second and third seats; and whether the 2024 investor-approval clause is a veto. Each is listed on its page.

**Leads not admitted.** Of the week 4b research leads, these were left out after re-checking: the X post announcing the November 2023 agreement in principle (not retrievable by direct HTTP; the 29 November post is used); Microsoft's board-observer seat and the CMA's material-influence finding (not control rights; cited as context and an open question); the California memorandum's notice right (context only); Microsoft's and the Foundation's equity stakes (ownership, not control); the round-two Microsoft, SoftBank and court-disclosure entity leads; Anthropic's notice, dividend, amendment-threshold, CEO-deadlock and investor-seat provisions; later Trustees and directors not already in the dataset; the CMA's Amazon and Alphabet decisions and the investors' non-voting holdings; and TIME's May 2024 report of the phase-in dates (HTTP 406 to direct retrieval).

## White House, Seoul and EU commitments (week 4c, part 2)

[Page](../README.md#research-sample): `#/commitments/external-commitments`, now with five texts in date order and a table of who signed or refused which text. A listing is recorded at the stage "listed" and dated by the published list, never by an inferred signature date. A statute has no column in that table.

- **White House voluntary AI commitments.** The July 2023 text and the undated September 2023 text, each with its issue record from the White House fact sheet that announced it. Fifteen listings: seven companies on 21 July 2023 and eight on 12 September 2023. Five quoted provisions of the July text (scope, stated duration, red-teaming, model-weight security, public reporting) and the September scope clause, with an inferred comparison of the two scope clauses. Four Anthropic RSP editions link themselves to the commitments: v1.0 names them, and v2.0 to v2.2 say that the policy helps satisfy them. Apple's 2024 sign-on is an open question because the announcement names neither text.
- **Frontier AI Safety Commitments.** The GOV.UK text published by DSIT on 21 May 2024. Twenty listings: sixteen organisations on 21 May 2024 and four added on 7 February 2025. Five quoted provisions: publishing a safety framework by the AI Summit in France, intolerable-risk thresholds, input from trusted actors including home governments, not developing or deploying above the thresholds, and the transparency exception. Six framework links: RSP v2.0 to v2.2 say they help satisfy the commitments; Microsoft's Frontier Governance Framework (February 2025 and February 2026) and Meta's Frontier AI Framework v1.1 respond to them.
- **EU General-Purpose AI Code of Practice.** The final Code received and published by the European Commission on 10 July 2025, recorded as one document; the six quoted provisions come from its Safety and Security chapter. Nine listings dated 1 August 2025, the first Internet Archive capture of the Commission's list, including xAI with the scope "Safety and Security chapter only". Four announced intents: OpenAI (conditional on the AI Board's approval), Anthropic, Google and xAI (Safety and Security chapter only). Meta's statement that it would not sign (Joel Kaplan, 18 July 2025). Three framework links: OpenAI's Frontier Governance Framework (May 2026) states that it serves as its public summary under the Code, Microsoft's February 2026 framework responds to the Code, and xAI's June 2026 framework names the Safety and Security chapter.

For the EU list, signatories are recorded only for organisations the dataset covers for other reasons; the Commission's list names others. Eight of the 26 organisations listed on 1 August 2025 are absent from the page as last updated on 31 July 2026, and the Commission gives no reasons.

**Set aside, not recorded.** Whether the White House commitments bind anyone or remain in effect; whether a Seoul listing creates an obligation, and whether "agreed to", "signed up to" and "endorse" describe the same act; the legal effect of signing the EU Code, of xAI's chapter-limited signature and of Meta's view that the Code goes beyond the AI Act; and whether any company is a provider of a general-purpose AI model with systemic risk. Each is listed on the page.

**Leads not admitted.** Company web pages, system cards, progress reports and transparency reports that mention the White House commitments (they are not framework editions); company statements that a commitment was met, and the Wang et al. compliance assessment (fulfilment is not recorded); the reported absence of any reference in RSP v3.0 to v3.4 (not re-checked); White House commitments 2, 4 and 5 and the EU chapter's Measure 1.1, Commitment 7 and Measure 10.2 (bounded selection); the Seoul Declaration; METR's trackers; Google DeepMind's announcement post for FSF v2.0 (the link is not in the framework); AI Act and implementing-regulation provisions; the AI Board's adequacy conclusion and OpenAI's statement naming OpenAI Ireland as provider (legal application); and the unverified round-two leads.

## QA and limits

The week 4c [QA record](../review/week4c-qa-2026-10-04.json) gives the integrator's own retrieval of every source, the archive checks, the mechanical and visual quote checks and each admitted, merged or dropped lead. The two control assessments, proposed as contested, are in the [cross-model packet](../review/week4c-contested-for-cross-model.md) for a different-model check before merge; after that check ([findings](../review/week4c-gpt-check-2026-10-04.md)) both were recorded as unresolved with context evidence only. Part 2 adds no contested record. Each evidence note says whether its passage repeats one from the week 4b research pass or was written or selected by the integrating session. For SB 53, the [week 4b QA record](../review/week4b-qa-2026-10-04.json) gives per-claim verdicts, adjudications, stops, retrieval failures and pages retrieved through the browser fallback.

**Method.** One research agent proposed 30 claims. Two independent verifiers, each told to refute, checked every claim against the source text. A third agent adjudicated every claim they did not both uphold. Outcomes:

- 9 claims were upheld by both verifiers;
- 21 were kept with corrections;
- none was dropped;
- 25 records were admitted;
- two claims were merged into other records;
- three were verified but not admitted: an uncodified legislative finding, the SB 1047 veto, and an OpenAI entity statement deferred to the OpenAI topic.

**Quote check.** Every admitted quote (42) was matched mechanically: 30 against the integrator's own direct fetches, 12 against the research agents' direct fetches where the legislature's code pages kept failing.

**Same model.** All agents and the integrator were one model (Claude Opus 5.5). Their agreement is not independent corroboration and not human review.

**Extra round not admitted.** The completeness critic's extra round produced 34 further SB 53 claims, including the Frontier Compliance Framework's own designation sentence. They were not verified by the stop and are not admitted.
