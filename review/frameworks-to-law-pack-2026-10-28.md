# Frameworks to law: candidate pack, 2026-10-28

A report on the candidate research pack in [`research/frameworks-to-law/`](../research/frameworks-to-law/README.md), prepared on branch `frameworks-to-law-pack` under the maintainer decision of 2026-10-27 (the governance flagship's legal layer). Nothing was admitted: `data/`, the application, the schema and the releases are unchanged. The pack was machine-prepared and audited by the same model family; the cross-family check has not been run, and no record has human review.

## What the pack holds

184 candidate records, each one claim in the dataset's shape with evidence (206 quotations and 68 labelled paraphrases, all from sources recorded as primary; the three SB 1047 vote records rest on the author's office's releases rather than the legislative journals, and say so). They concern 51 document versions: 47 new candidate documents, and four dataset documents they extend (the AI Act, the Digital Omnibus, the final Code of Practice and China's Interim Measures). 80 sources were retrieved on 2026-10-27; 20 candidate entities, mostly public bodies; 18 records name the dataset record they add to.

| Jurisdiction                                                                                                                              | Records | Status and dates | Listings and refusals | Provisions | Framework links | Other |
| ----------------------------------------------------------------------------------------------------------------------------------------- | ------: | ---------------: | --------------------: | ---------: | --------------: | ----: |
| International (Bletchley, Seoul, Paris, New Delhi, G7 Hiroshima and OECD reporting)                                                       |      40 |                7 |                    13 |         16 |               3 |     1 |
| EU (AI Act provisions not yet recorded, first Code draft and two comparisons, Commission opinion on the Code)                             |      33 |                2 |                     0 |         29 |               0 |     2 |
| US federal (EO 14110 and its revocation, EO 14179, 14365, 14409, AI Action Plan, legislative recommendations, BIS rules, NIST/AISI/CAISI) |      37 |               20 |                     0 |         16 |               0 |     1 |
| US states (SB 1047 and its veto, RAISE Act 2025 chapter and two comparisons with Chapter 96, California report, Illinois, Michigan)       |      19 |               11 |                     0 |          6 |               0 |     2 |
| UK (AI Security Institute renaming, memoranda with Anthropic, Cohere, OpenAI and Google DeepMind, UK–US memorandum, legislation status)   |      19 |                5 |                     2 |         11 |               0 |     1 |
| China (Interim Measures provisions, Labelling Measures, two national standards, Cybersecurity Law amendment, CAC filing announcements)    |      27 |                7 |                     0 |         20 |               0 |     0 |
| Links back (framework editions naming an instrument)                                                                                      |       9 |                0 |                     0 |          0 |               9 |     0 |

`pack.md` gives the records by jurisdiction and document, and a **timeline** of 77 dated events from the pack beside the dataset's own instrument and framework dates (marked ◇).

## Scope choices

- **Extend, don't duplicate.** SB 53, the White House commitments, the Seoul commitments, the AI Act provisions already quoted, the final Code with its listings, the Commission's guidelines and the RAISE Act Chapter 96 records were not re-recorded. New records name the dataset record they add to.
- **China.** TC260's AI Safety Governance Framework, the AI Industry Alliance's commitments and Chinese developers' frameworks are in the `china-labs-pack-2` branch and were left out. This pack adds national measures and standards only.
- **Links back.** All 22 framework editions in the dataset were searched for named instruments; 21 were retrieved. Nine new links were recorded. Four of them carry the SB 53 footnote of RSP v3.0 into v3.1–v3.4. Others: OpenAI's Preparedness Beta naming the July 2023 commitments, OpenAI's FGF naming the AI Act and Appendix 2.2 of the Code, and Microsoft's February 2026 framework naming the AI Act and the RAISE Act. Generic references to "applicable laws" and to voluntary technical standards were left out.
- **Bounded provisions.** Each instrument contributes the provisions that decide who is covered, what frontier or general-purpose model developers must do, dates, enforcement, and any reference to frameworks or codes.
- **Not recorded, with reasons in `pack.md`.** These are 40 omissions, among them: the second and third Code drafts (only unofficial copies found); the AI Board's assessment; signatories by chapter; the UK's and US's reasons for not signing the Paris statement (no official statement retrieved); the Illinois Act's bill record; the reported May 2026 CAISI agreements with Google DeepMind, Microsoft and xAI (absent from NIST's listing as retrieved); and Colorado's AI Act (not aimed at frontier developers).

## Checks

- **Mechanical.** All 206 quotations matched against the retrieved text of their own source, within the per-quotation and per-source limits (counting the dataset's existing quotations from the same expressions). No problems remained.
- **Same-family audit.** Two fresh-context auditors checked 64 records: 30 random and 34 targeted. 19 were corrected and none dropped. Checking was then widened to the affected families: AI Act dates of application, the revoked executive order, dates resting on announcements, and inferred comparisons. See [`audit.md`](../research/frameworks-to-law/audit.md).
- **Integrator's corrections before the audit.**
  - Two pairs of differing official counts (New Delhi endorsers; OECD reporting framework first round) were proposed as contested. They are dated snapshots or use different units, so they are recorded as such.
  - Two string-search results were recast as bounded absences.
  - A September 2026 White House fact sheet on renaming "AI" to "SI" in executive-branch documents was moved from a record to a source caveat.
- **Cross-family brief.** [`cross-family-input-2026-10-28.md`](../research/frameworks-to-law/cross-family-input-2026-10-28.md) has 120 items. It covers all 87 status, listing, link, proposed-predicate and inferred records, plus a seeded sample of 33 of the 97 provision records. The pack's answers are in a separate verdicts file. Not run.
- `pnpm check:privacy` passed before each push. `pnpm check` was not run, because no data, schema or application file changed.

## Retrieval failures

- **Internet Archive.** Capture pages refused connections throughout. Capture addresses were taken from the availability service and are unchecked.
- **EUR-Lex.** It returned HTTP 202 with empty bodies, so the AI Act was retrieved from the Publications Office repository. That copy matches the dataset's word count.
- **Commission pages.** The Commission's digital-strategy pages refused (403).
- **Refused or blocked elsewhere:**
  - congress.gov, leginfo, commerce.gov, the New York Senate and Governor sites, and Hansard refused (403).
  - The New York Open Legislation API needs a key.
  - ilga.gov failed certificate verification.
  - cac.gov.cn and npc.gov.cn reset connections; Chinese texts come from gov.cn copies.
- **Developer frameworks and portals:**
  - xAI's June 2026 framework now returns HTTP 404 (200 on 2026-10-15), and Meta's v1.1 framework HTTP 400.
  - Anthropic's Frontier Compliance Framework sits on a script-rendered portal and could not be read.
- **Changed government wording.** NIST and BIS pages now show "SI" for "AI" in places, after the September 2026 order. Quotations avoid altered passages, but the served pages are not the texts as first released.

## Open questions for the maintainer

Each has a recommended answer.

1. **Country entities.** Listings in summit declarations have countries as subjects, and the schema has no country type. _Recommended:_ add a `country` entity type (or a `public_body` subtype) keyed by ISO 3166 code. Keep a whole list as one document-level listing record, and record a country singly only where a claim needs it, as the pack does.
2. **Proposed predicates (27 records).** The pack proposes `lists_participants`, `not_listed`, `passed`, `introduced`, `vetoed`, `revoked`, `legislative_status`, `renamed_body`, `re_established_as`, `announced_agreement`, `announced_rescission` and `reported_collaboration`. _Recommended:_ add a small legislative-status set (`introduced`, `passed`, `vetoed`, `revoked`) and a document-level `lists_participants` with a count basis (stated or counted). Model announcements as a stage attribute on existing predicates, as `signed_commitment` does. Model renamings as dated names on one entity.
3. **Intergovernmental publishers (G7, OECD).** _Recommended:_ `public_body` with subtype "intergovernmental".
4. **Computed entry into force of the AI Act (1 August 2024).** The dataset left this date out deliberately. _Recommended:_ admit it as an inferred record with its rule quoted, because it is the date the Act's other dates count from. If the dataset keeps to stated dates only, drop it.
5. **First Code of Practice draft from the Dutch Senate's copy.** _Recommended:_ admit with the version note. Before admission, check it against the Commission's own file from a route that can reach it, and record the Commission's stated date (reported as 14 November 2024).
6. **AI Act source.** _Recommended:_ on admission, map these records to the dataset's existing source `source-eu-ai-act-2024`, recording the Publications Office repository as the retrieval route. It is the same Official Journal expression.
7. **Provision-level framework links.** One example is OpenAI's FGF reference to "Appendix 2.2 of the Code of Practice". _Recommended:_ add it as a second evidence item on the existing link record. Keep one link per edition and instrument.
8. **SB 1047 votes and the Illinois Act.** These rest on the author's office and on a later executive order. _Recommended:_ keep them as labelled until the legislative journals and the Illinois bill record can be retrieved. Do not record dates, bill or Public Act numbers from secondary reports.
9. **Changed government wording ("SI" for "AI").** _Recommended:_ make the cross-family check compare every quoted NIST and BIS passage with a near-release Internet Archive capture (the cross-family model can reach the Archive), and record the expression checked.
10. **Admission order.** _Recommended:_
    1. Run the cross-family brief.
    2. Decide questions 1–2, which govern the 27 records with proposed predicates and the country listings.
    3. Admit in two parts: EU, China and the links back first (existing predicates, no country subjects), then the international, UK and US records that need the schema decisions.
11. **Developers' compliance documents** (Anthropic's Frontier Compliance Framework, others' SB 53 frameworks). _Recommended:_ a separate bounded pass, by a route that can read script-rendered portals, recording only what each document states it is.

## Next step

Run the cross-family check from the brief, then decide questions 1–4 before any admission task.
