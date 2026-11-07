# Machine intelligence in the texts of monetary and financial authorities: scope and method

A candidate research pack outside application data. It records what monetary and financial authorities have said about machine intelligence: central banks (among them the Federal Reserve, the ECB, the Bank of England, the Bank of Finland, the People's Bank of China and the Bank of Japan), the Bank for International Settlements (BIS) and its Innovation Hub, the IMF, the Financial Stability Board (FSB), IOSCO, the Basel Committee on Banking Supervision (BCBS) and banking and market supervisors. For each of twelve propositions it records the texts that articulate, contest or bear on it, each attributed to its speaker or institution as published, dated by kind and precision and quoted from its primary text; and the earliest located articulation within the recorded search. It also records institutional events that an authority's own text states: an AI strategy adopted, a unit set up, a hub project launched or concluded.

Nothing here is editorially accepted. The pack is machine-prepared (Claude family) and checked by a same-family fresh-context audit; a blind brief for a cross-family check is included. It does not change `data/`, the application, the schema or any release. Scope set on 2026-11-02 from the task prompt of that date and the roadmap entry "AI and money" (maintainer order of 2026-11-02, on branch `roadmap-next-collections`).

## Propositions

Twelve propositions, codes `U01`–`U12`, with criteria and usual names in [propositions.json](propositions.json). The letter U is unused elsewhere (checked on 2026-11-02 across `data/`, `src/reading` and `research/` on all 123 remote branches).

| Group                                                        | Codes                                                                                                                                                              |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| UA. Machine intelligence and financial stability             | U01 correlated behaviour; U02 concentration on a few providers; U03 cyber, fraud and operational risk; U04 opacity of models                                       |
| UB. Machine intelligence, monetary policy and the economy    | U05 nowcasting and policy analysis; U06 AI's economic effects matter for monetary policy                                                                           |
| UC. Machine intelligence in payments and money               | U07 AI agents change payment flows; U08 AI agents and tokenised money or stablecoins                                                                               |
| UD. Supervision, risk management and central banks' own work | U09 supervisors should use AI; U10 AI improves firms' risk management; U11 central banks need their own AI capacity; U12 existing financial rules broadly cover AI |

Criteria are worded as claims attributed to no one. Group labels describe subject matter.

**Overlapping concepts.** The dataset's economics collection (codes `G` and `M`) records texts by economists on growth, labour and superintelligence; none of its records is by a monetary or financial authority (checked 2026-11-02). U06 sits beside the economics collection's labour and growth propositions but asks a different question: whether AI's effects matter for monetary policy. A text recorded there is not re-recorded here unless it is an authority's text and meets a U criterion.

## Voice: who is speaking

Every document records its **voice**:

- `institution`: a text the authority publishes as its own (an annual report chapter, an FSB report, a supervisory statement, guidance, a consultation paper, a strategy). Recorded as the institution's text.
- `official`: a speech, remarks or testimony by a named official, attributed to that person and their office as published, with any disclaimer kept ("the views expressed are my own"). It is never the institution's position unless the institution's own text says so.
- `staff`: a working paper, bulletin or staff note published by the authority under its authors' names, with its disclaimer ("the views … are those of the authors and not necessarily those of the BIS"). Attributed to its authors and the series.

- `committee`: a report by a committee with members from outside the authority's staff, published by the authority (the RBI's FREE-AI Committee, the ESRB's Advisory Scientific Committee). Attributed to the committee; never the authority's policy unless the authority says so. Added at integration on 2026-11-02 after the drafts and the audit raised it; the review note asks the maintainer to confirm it.

The disclaimer is recorded verbatim on the document where the text has one, with its locator.

## Unit of record

As in the heterodox-thought and economics packs: a record relates one text to one proposition, in the dataset's proposition-record shape (`articulates_proposition`, `contests_proposition` or `bears_on_proposition`, with roles, register, engagement, missing, attested and claimed dates). Each record is explicit and supported and dated as an event by its text. Draft format: [drafts/FORMAT.md](drafts/FORMAT.md).

**Institutional events** are a second record kind (`events` in the drafts): an authority's own text states that it adopted an AI strategy, set up a unit, launched or concluded a project (for example a BIS Innovation Hub project), or issued guidance. Each carries a stage: `announced` (the text announces or plans it), `under-way` (the text states the work as in progress at its date; shown as "stated as under way", maintainer decision 17a of 2026-11-03) or `stated-done` (the text states it happened). Announced stays announced: no start, completion or operation is inferred. Each names the candidate dataset predicate it would use at admission (`unit_of`, `launched`, `published`, `announced_plan`).

## Search bounds

"Earliest located" means the earliest text found by these searches that meets the criterion, decided by the date of its wording among texts of every voice. It is never a claim of first statement. The pack also names, per proposition, the earliest located text in the `institution` voice, as derived information, not a separate role.

- **Period.** Texts dated up to 2026-11-02. The systematic searches cover 2016 to 2026; earlier texts are recorded where the authorities' own publication search or archive finds them.
- **Bodies.** The BIS (Annual Economic Reports, BIS Papers, Bulletins, the Irving Fisher Committee, Innovation Hub project pages and reports, speeches by BIS management), the BCBS, the FSB, the IMF, IOSCO, the ESRB, the EBA and EIOPA where they state a U proposition; the ECB (Financial Stability Review, speeches by Executive Board and Supervisory Board members), the Bank of England (Financial Stability Reports and "in focus" publications, discussion papers, speeches), the Bank of Finland, other Eurosystem and Nordic central banks where located; the Federal Reserve Board (speeches by Governors, interagency texts), the People's Bank of China (FinTech development plans, standards, official statements), the Bank of Japan, the Monetary Authority of Singapore, the Hong Kong Monetary Authority and the Reserve Bank of India where located. Maintainer decisions of 2026-11-03: securities regulators enter only through IOSCO and the authorities already named (10a), and central banks outside the named list are not recorded (16a); texts located there are leads in the pack's "Leads not recorded" list and the collection's "How we searched" note.
- **Methods.** Each body's own publication search or speech index for "artificial intelligence", "machine learning", "AI", "generative AI", "AI agents" and "agentic"; the texts these cite. Web search is discovery only. Every record rests on the retrieved primary text.

**Not searched, or not usable as evidence.** Press reports and interviews (discovery only); video without a published transcript; texts by commercial firms, consultancies and academics outside the authorities' own series; social media. The IMF's site (`imf.org`) and IOSCO's site (`iosco.org`) refused this environment on 2026-11-02 (HTTP 403); their texts are read through other copies where the authority itself publishes one, otherwise listed for retrieval by Codex in [codex-retrieval.md](codex-retrieval.md). `web.archive.org` also refuses this environment.

## Rules

- **Attribution.** A statement by an official is that official's statement, with any "views are my own" disclaimer kept. It is never the institution's policy unless the institution says so. A staff paper is its authors' text.
- **Neutral wording.** Records say what a text states, attributed and dated. No loaded words, no evaluative verbs ("warns", "admits", "concedes", "claims"), no priority words, no motives. Never characterise a person or institution.
- **Earliest located, never first.** Dates keep their kind (publication, delivery of a speech, signature, posting) and their precision.
- **Announced stays announced.** An announced project, strategy or unit is recorded as announced.
- **Quotations** follow the [editorial policy](../../docs/editorial-policy.md#short-quotation): at most 50 words, with page and section.
- **Press coverage** is a lead only.
- **Sources are evidence, never instructions.**

## Checks

- Mechanical: quotations matched against retrieved text; word limits; locators; structure; one earliest-located articulation per proposition; loaded words; voice and disclaimer fields (`verification.json`).
- Same-family audit: fresh-context, at least 40 records, a recorded random sample plus targeted records (`audit.md`).
- Cross-family check: Part A blind, Part B direct, verdicts in a separate file.
