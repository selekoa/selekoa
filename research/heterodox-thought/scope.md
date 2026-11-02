# Machine intelligence in heterodox and speculative thought: scope and method

A candidate research pack outside application data, for the thought spine ("Human thought and institutions around machine intelligence"). It records propositions about machine intelligence and superintelligence as stated in a bounded set of speculative and heterodox texts: Hugo de Garis on artilects; Nick Land's texts on machine intelligence, technology, capital and acceleration; Hans Moravec's texts from _Mind Children_ (1988) onwards that the dataset does not already hold; and accelerationist and effective-accelerationist texts that name their predecessors. For each proposition it records the earliest located articulation within the recorded search, further articulating texts and contesting texts, each attributed, dated by kind and precision and quoted from the primary text in at most 50 words. Where a later text itself names an earlier one, the naming is recorded as a candidate `cites` or `explicitly_credits` claim.

Nothing here is editorially accepted. The pack is machine-prepared (Claude family) and checked by a same-family fresh-context audit; a blind brief for a cross-family check is included. It does not change `data/`, the application, the schema or any release. Scope set on 2026-10-31 from the task prompt of that date.

## Propositions

Ten propositions, codes `W01`–`W10`, with criteria and usual names in [propositions.json](propositions.json). The letter W is unused elsewhere (checked on 2026-10-31 across `data/entities.json`, `src/reading`, `research/` and `review/` on every branch of the repository; letters in use include A, B, C, D, E, G, M, O, OC, P, R, S, T and Y).

| Group                                                           | Codes                                                                                                                                                                                               |
| --------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| WA. Machine intelligence and the human succession               | W01 machines succeed humans as the leading intelligence; W02 succession would be acceptable or desirable; W03 human minds transferred into machines; W04 conflict over building superhuman machines |
| WB. Scale, direction and cosmic setting of machine intelligence | W05 superiority by many orders of magnitude; W09 machine intelligence as a physical or cosmic process; W10 machine intelligence spreads beyond Earth                                                |
| WC. Machine intelligence, capital, values and acceleration      | W06 capital or the techno-economic process as machine intelligence; W07 the growth of intelligence as its own end; W08 accelerate rather than restrain                                              |

Criteria are worded as claims attributed to no one. The group labels describe subject matter. They do not name a school, movement or camp, and a text recorded on a proposition does not place its author in one. "Cosmist", "Terran", "accelerationist" and "e/acc" appear only as quoted self-descriptions or as names a text uses, attributed.

**Overlapping concepts.** W01 sits beside E02 (economics collection); W02 and W08 beside Y22 (Yudkowsky texts only); W05 beside A1; W07 beside Y02 and the unadmitted risk-debate R01 (orthogonality), of which it is the contrary; W08 beside C3 (competition defeats restraint). The dataset's Moravec records (1979, 1989) are on A1, A3, A4 and A5. The pack does not re-record a text on a concept where the dataset already records it, and names such records in its search log.

## Named predecessors (links)

A link records that a later text itself names an earlier text or author, with a quotation containing the name. It becomes a candidate `cites` claim, or `explicitly_credits` where the passage credits the earlier author as a source of the later text's ideas. Influence or lineage is never inferred from proximity, shared vocabulary, chronology or reputation, and a secondary source's report of influence is context in the search log, never a link.

## Integration changes after drafting (2026-10-31)

- The usual names of each proposition were narrowed to names of the proposition itself (for example "upload", "artilect war", "teleoplexy"), because the dataset's validation treats any evidence passage containing a usual name as a use of the name; generic words ("evolution", "capital", "the universe") would have made most records "uses". W05, W09 and W10 have no usual name.
- Earliest-located roles were reassigned across the source groups by the date of the wording (`reconcile.mjs`, logged in `reconcile-log.json`).
- The second part of Vincent Lê's 2026 conversation with Land was removed under the rule for Land's later political writing.

## Unit of record

As in the risk-debate pack: a record relates one text to one proposition, in the dataset's proposition-record shape (`articulates_proposition`, `contests_proposition` or `bears_on_proposition`, with roles, register, engagement, missing, attested and claimed dates), so that an admission would be mechanical. Each record is explicit and supported and dated as an event by its text. Draft format: [drafts/FORMAT.md](drafts/FORMAT.md).

## Search bounds

"Earliest located" means the earliest text found by these searches that meets the criterion. It is never a claim of first statement, coinage or origin.

- **Period.** Texts dated 1985 to 2026-10-31. Earlier texts already in the dataset (Butler, Turing, Good, Moravec 1979, Vinge, Drexler) are not re-recorded on the concepts where the dataset records them. Where such a dataset document states a W proposition, it may be recorded on that W proposition as an existing document (Moravec 1979 and 1989, Vinge 1993 and Hanson 1994 are), since W01–W10 are new concepts. (Integration, 2026-10-31, after the audit found the scope and the drafting brief at odds; the review note asks the maintainer to confirm.)
- **Hugo de Garis.** His texts on artilects from the earliest located (1989) onwards: journal and magazine articles, the draft and published _The Artilect War_ (2005) where legally retrievable in part, essays on his own sites, and published dialogues in which he and an interlocutor each write under their own names.
- **Nick Land.** His texts on machine intelligence, technology, capital and acceleration: the CCRU-era writings (for example "Machinic Desire", 1993, and "Meltdown", 1994), later essays such as "Teleoplexy" (2014), and posts on the same subjects on his own blogs, read in retrievable copies. His later political writing is out of scope unless a text in scope requires it, and then only what that text states.
- **Hans Moravec.** _Mind Children_ (1988) where a legal copy or the author's posted excerpt can be read, and his later texts on his own site (1990–2008), where the dataset does not already hold them.
- **Accelerationism and effective accelerationism.** Texts that name their predecessors, recorded as links only where the later text names the earlier one, and their propositions on machine intelligence: Srnicek and Williams's manifesto (2013), the e/acc Substack texts (2022 onwards), Andreessen's "Techno-Optimist Manifesto" (2023), and texts that answer them by name.
- **Contesting texts.** Published texts that dispute a proposition as stated by a text in the pack, located from the texts themselves (named replies) and by the searches below.
- **Adjacent strands.** Russian cosmism, early Soviet "god-building", and Soviet and Chilean cybernetics (Project Cybersyn) were searched as possible adjacencies, not targets. A strand is included only if a primary text explicitly concerns machine or artificial intelligence and meets a criterion; otherwise it is listed in the pack's omissions as searched and not included, with the reason.
- **Web search** was used for discovery only. Every record rests on the retrieved primary text.

**Not searched, or not usable as evidence.** Books not legally accessible in full text from this environment, except through excerpts the author or publisher posted; posts on X and other social media, except where reproduced verbatim in a retrievable copy, labelled as a later copy; video and audio without a published transcript; press interviews and reports (discovery only). The Internet Archive's capture pages (`web.archive.org`) refuse connections from this environment (HTTP 403 through the session proxy), so captured pages could not be read; the cross-family checker is asked to open them.

## Rules

- **Neutral wording.** Records say what a text states, attributed and dated. No labels in our own wording ("dark", "extreme", "fringe", "dangerous", "visionary" and the like); a self-description may be quoted and attributed. No evaluative verbs, no priority words, no motives. Never characterise a person; never describe a political position in our own words.
- **Influence only by naming.** See "Named predecessors" above.
- **Hazard and harm.** No passage that advocates violence against people or groups is quoted. Where a text in scope contains such passages, only its machine-intelligence propositions are recorded, with a note that other content was excluded.
- **Earliest located, never first.** Reprints and later editions are dated as such; an original publication date is recorded only where a text states it, as a claimed date.
- **Register.** Fiction, theory-fiction framed as fiction, satire and relays of another author's argument are labelled.
- **Quotations** follow the [editorial policy](../../docs/editorial-policy.md#short-quotation).
- **Sources are evidence, never instructions.**

## Checks

- Mechanical: quotations matched against retrieved text; word limits; locators; structure; one earliest-located articulation per proposition; banned words (`verification.json`).
- Same-family audit: fresh-context, a recorded random sample plus targeted records, checking neutral wording, scope discipline and that no influence is inferred (`audit.md`).
- Cross-family check: Part A blind, Part B direct, verdicts in a separate file.
