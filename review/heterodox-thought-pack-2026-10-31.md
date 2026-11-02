# Heterodox-thought candidate pack, 2026-10-31: review note

The candidate pack [`research/heterodox-thought/`](../research/heterodox-thought/README.md) records, for the thought spine ("Human thought and institutions around machine intelligence"), ten propositions about machine intelligence and superintelligence as stated in texts by Hugo de Garis, Nick Land and Hans Moravec, in accelerationist and effective-accelerationist texts, in a bounded set of further articulating texts, and in the texts that contest them. For each proposition it gives the earliest located articulation within a stated search, further articulations and contesting texts, each attributed, dated by kind and precision and quoted from its primary text in at most 50 words. Where a later text itself names an earlier text or author, the naming is recorded as a candidate `cites` or `explicitly_credits` link. Nothing is admitted; `data/`, the schema, the application and the releases are unchanged.

- **Prepared by:** Claude family (five drafting passes, an integrator, fourteen fresh-context audit agents with one adversarial verifier per finding, and a writer and a checker per draft for the fixes).
- **Checked by:** not yet. The cross-family check (GPT family, or whichever family did not prepare) is required before any admission. Its brief is [`cross-family-input-2026-10-31.md`](../research/heterodox-thought/cross-family-input-2026-10-31.md) (Part A blind, Part B direct, every link); the pack's answers are in [`cross-family-verdicts-2026-10-31.json`](../research/heterodox-thought/cross-family-verdicts-2026-10-31.json). The brief asks the checker to open the Internet Archive captures of the pages that refused this environment.
- **Override rule.** A preparer's adjudication against the checker on an earliest-located role or a headline is not admitted on that adjudication alone (editorial policy).
- **State.** Counts are generated in [`pack.md`](../research/heterodox-thought/pack.md). [`verification.json`](../research/heterodox-thought/verification.json) reports no quotation, budget, structural or wording problems. The audit, its 140 findings and their dispositions are in [`audit.md`](../research/heterodox-thought/audit.md).

## Proposition codes

Codes `W01`–`W10` are unused elsewhere: the letter W appears in no proposition code in `data/entities.json`, `src/reading`, `research/` or `review/` on any branch (checked 2026-10-31).

| Code | Proposition                                                    | Group | Beside a dataset concept            |
| ---- | -------------------------------------------------------------- | ----- | ----------------------------------- |
| W01  | Machines succeed humans as the leading intelligence            | WA    | E02                                 |
| W02  | Succession by machines would be acceptable or desirable        | WA    | Y22 (Yudkowsky only)                |
| W03  | Human minds transferred into machines                          | WA    | —                                   |
| W04  | Conflict over building superhuman machines                     | WA    | —                                   |
| W05  | Superiority by many orders of magnitude                        | WB    | A1                                  |
| W06  | Capital or the techno-economic process as machine intelligence | WC    | —                                   |
| W07  | The growth of intelligence as its own end                      | WC    | Y02; risk-debate R01 (its contrary) |
| W08  | Accelerate rather than restrain                                | WC    | Y22 (Yudkowsky only); C3            |
| W09  | Machine intelligence as a physical or cosmic process           | WB    | —                                   |
| W10  | Machine intelligence spreads beyond Earth                      | WB    | —                                   |

Groups: WA, "Machine intelligence and the human succession"; WB, "Scale, direction and cosmic setting of machine intelligence"; WC, "Machine intelligence, capital, values and acceleration". The labels describe subject matter, not schools or camps.

## Where the collection sits in the thought spine

The hub "Human thought and institutions around machine intelligence" (`src/ui/Hub.tsx`, hub `ideas`) shows example questions for three propositions collections: superintelligence (1863–2022), Yudkowsky's arguments and the economics of machine intelligence. `propositionCollections` (`src/reading/human-thought.ts`) also lists orbital compute and AI and biosecurity. The risk-debate pack, decided on 2026-10-30 and awaiting admission, is to sit second, after the superintelligence collection.

**Recommended placement:** a new collection `#/propositions/machine-succession` (definition `src/reading/machine-succession.ts`), listed in `propositionCollections` after the Yudkowsky collection and before economics, and not one of the hub's three example questions at first. The spine would then read: the long history of the propositions about superintelligence; the documented debate on catastrophic risk; one author's arguments; then the propositions about succession, scale and acceleration that sit outside that debate's terms, several of which (W02, W07, W08) are what the debate's texts answer. Cross-links in both directions: superintelligence A1 to W05; risk-debate R01 to W07 (contraries); Yudkowsky Y22 to W02 and W08; C3 to W08. Its example question, when one is shown: "Which texts state that machines will succeed humanity, which hold that this would be acceptable, and which dispute it?"

## Open questions

Each has a recommended answer. Questions the drafts raised that the integration or the audit resolved are not repeated (the undated _Robot_ preview page, the pseudonymous 2007 post kept under its signed name, the de Garis hazard notes, the narrowed usual names, the reassigned earliest-located roles; see [`audit.md`](../research/heterodox-thought/audit.md)).

1. **Reader-facing title.** "Heterodox" and "speculative" describe the texts in our own words, which the scope rules out for records.
   _Recommended:_ a neutral title that names the subject, such as "Machine succession, scale and acceleration: propositions in located texts, 1979–2026". Keep "heterodox-thought" only as the research directory name.
2. **Dataset documents on new propositions.** The scope said the dataset's earlier texts are "not re-recorded", while the drafting brief allowed a dataset document on a W proposition. Moravec 1979 and 1989, Vinge 1993 and Hanson 1994 are recorded on W propositions; the scope was amended at integration.
   _Recommended:_ accept. The W propositions are new concepts; no dataset document is re-recorded on a concept where the dataset already records it. The collection's period then begins in 1979.
3. **Earliest located resting on later copies.** Several texts dated 1989–2004 are known here only from pages retrieved in 2026 (Moravec's site, Kurzweil 2001, Bostrom 2004, Faggella's essay as updated) or from copies attested in 1997–2001, so earlier-dated texts lose the role to texts attested earlier. W02's headline is Minsky 1994 as attested on 1997-01-02; W09's is Moravec's "Genetic Takeover" as attested in 2001.
   _Recommended:_ keep the roles as recorded, with both dates shown, and have the cross-family checker (or an archive-capable thread) compare the listed captures before admission. A capture that matches makes its text earliest located, recorded as a correction.
4. **W07 rests on a relay.** Land's own posts on orthogonality and the "will-to-think" (xenosystems.net, captures reported from 2013–2014) could not be read; the only articulation is Jessica Taylor's 2024 review relaying them, labelled `relay`.
   _Recommended:_ ask the checker to open the captures of "Against Orthogonality" and "Will-to-Think". If they are read, record them and let them hold the role. If not, admit W07 with the relay as earliest located and its register shown, and say in the collection's search note that the author's own texts were not read.
5. **Land's texts are thin.** "Machinic Desire" (1993), "Teleoplexy" (2014), the 2017 Jacobite essay and the xenosystems posts were not retrievable; "Circuitries" (1992) has no text layer and is recorded by paraphrase checked against page images.
   _Recommended:_ do not pad. Before admission, an archive- and OCR-capable thread adds an OCR text of the Pli 4 scan (so the "Circuitries" passages can be quoted and checked) and reads the captures; otherwise admit with the gap stated.
6. **"Meltdown".** The CCRU dates the pamphlet that carried it "Winter, 1997"; the web copy is undated, so its wording is attested only from 2026. It keeps the hazard note (the text contains passages the rule excludes) and passage-level registers (the W06 passage is framed "The story goes like this" and is labelled fiction).
   _Recommended:_ keep as recorded; ask the checker to open the 2004 capture.
7. **Posts signed "Old Nick".** The 2007 Hyperstition post is kept under its signed name; a chapter of the same title is attributed to Land in _Fanged Noumena_ (2011), whose wording was not compared. "Sense and Singularity" (2007), also signed "Old Nick", was not recorded.
   _Recommended:_ attribute nothing by inference. Record a signed post as Land's only where a text (the collection's reprint, compared) attributes that wording to him.
8. **Lê's 2026 conversation with Land, part 2.** Removed by the integrator under the scope rule for Land's later political writing, although two verifiers read the W08 criterion as covering its passages.
   _Recommended:_ confirm the removal. The Williams–Srnicek manifesto's bears-on record on W08 stays: it concerns acceleration of the technological process the criterion names, and is not Land's political writing.
9. **Pseudonymous and collective authors.** "Beff Jezos", "bayes", "e/acc" (a newsletter with two bylines) and the LessWrong user "jacob" are recorded as their bylines show. The 2023 podcast transcript names Guillaume Verdon as the guest the host introduces as "Beff Jezos".
   _Recommended:_ record bylines only. Do not join a pseudonym to a legal name unless the text itself does, and then only for that text.
10. **Andreessen's "Patron Saints".** The list is introduced "In lieu of detailed endnotes and citations, read the work of these people".
    _Recommended:_ `cites`, not `explicitly_credits`: the list directs the reader to people, without crediting a named idea to any of them. The only `explicitly_credits` link (xenogothic 2023 to Land) stays.
11. **Links to people and texts outside the dataset.** About two fifths of the links point to a person or text that is neither a pack document nor a dataset entity (Marx, Deleuze and Guattari, Lenin, Kurzweil's books, Bostrom's _Superintelligence_, Kelly's _Out of Control_, Cairns-Smith, Barrow and Tipler, social-media accounts).
    _Recommended:_ at admission create person entities for the authors of pack documents (Land, de Garis, Kurzweil and others), and admit links to them. Hold links whose target would be a new entity only for this link; list them in the collection's search note as names the texts give.
12. **W06 without the words "artificial" or "machine".** The 2022 e/acc texts and Andreessen's manifesto call capital or technocapital "a form of intelligence"; they are recorded as bearing on W06.
    _Recommended:_ keep as bears-on, with the missing element named.
13. **Opinion essays and conference slides.** Torres's Truthdig essay (2023) is recorded as its author's argument; Sutton's slides (2013, 2023) as his texts.
    _Recommended:_ keep. Each is the author's own published text, not a report of what someone else said.
14. **Coverage.** W10 has no contesting text; W07 has one articulation (a relay); counts by author are uneven.
    _Recommended:_ do not pad. State the gaps in the collection's search note.
15. **Adjacent strands.** Russian cosmism, early Soviet "god-building", Soviet cybernetics and Chilean cybernetics (Project Cybersyn) were searched and are not included: no retrieved primary text of these strands explicitly concerns machine or artificial intelligence and meets a criterion (Kolmogorov's 1961 theses concern only whether machine thought is possible). Shared vocabulary, such as de Garis's "Cosmists", is not a link.
    _Recommended:_ accept; list them in the collection's search note as searched and not included.
16. **Earlier relevant texts not read.** _Mind Children_ (1988), the 2005 printing of _The Artilect War_ (read in de Garis's posted PDF of 2014) and the 1990 printing of "Moral Dilemmas" (read in a 1999 print of his page).
    _Recommended:_ admit with these limits shown in the records' dates and qualifications; list them as leads in `review/thought-spine-leads.md` at admission.

## Next steps

1. Cross-family check from the brief, on its own branch, blind first, opening the listed archive captures.
2. Adjudication of disagreements, then the maintainer's decisions recorded here under "Maintainer decisions".
3. Admission: a minor release (a new collection) on existing predicates and roles; no schema change is needed if questions 10 and 11 are answered as recommended.

## Maintainer decisions

None recorded yet.

## Maintainer decisions (2026-11-01)

All recommended answers to the open questions above (1–16) are adopted as written, including a neutral reader-facing title that does not describe the texts as heterodox or speculative in our own words, and the adjacent strands (Russian cosmism, Soviet god-building, Soviet and Chilean cybernetics) listed in the search note as searched and not included. Admission waits for the cross-family check and its adjudication; where the check changes the basis of a recommendation, the admission task lists it for the maintainer instead of applying it.

## Adjudication of the cross-family check (2026-11-01)

Report: `research/heterodox-thought/cross-family-check-2026-10-31.md` and `.json` (checker: Codex; prepared by Claude). Of the 45 Part A2 classifications, 41 agree; of the 45 direct record checks, 43 agree. All 60 named-predecessor links agree on relation type (59 `cites`, 1 `explicitly_credits`).

**Reading order.** The checker read the whole brief before answering A1, so the ten A1 answers are not fully blind; it disclosed this. All 55 Part A answers were committed (`000a8e5`) before the verdicts, audit or pack were opened, so the A2 comparison stands. A1 earliest-located selections are treated as leads, not as independent confirmation.

## Maintainer decisions on the check (2026-11-01)

All eleven recommendations are adopted:

1. **W07.** Land's "Pythia Unbound" (2013-09-11; capture 20130914051121) becomes the earliest located articulation, replacing the Taylor relay. "Against Orthogonality" (2013-10-25), "Stupid Monsters" (2014-08-25) and "Will-to-Think" (2014-09-15) are admitted as further articulations, each with its opened capture. Only their machine-intelligence passages are recorded.
2. **W06.** "Machinic Desire" (1993 journal article, read in a later publisher PDF; capture 20190304091609) becomes the earliest located articulation. "Meltdown" (Winter 1997 as attributed by the publisher's reprint; wording attested by capture 20040203102201) stays as a later articulation.
3. **Drexler, _Engines of Creation_ chapter 5** (states copyright 1986 and a 2004 web revision): held. List it in `review/thought-spine-leads.md` as a version-qualified lead for W01, W03 and W09. Admit it only once the 1986 printed wording is checked.
4. **Items 41 and 51 (de Garis 1989, 1990).** The checker classifies both as bearing on, not articulating, W03 and W05. Both hold an earliest-located role, and the drafting family does not overrule the checker on a headline claim. Record both as `bears_on_proposition`, and pass the earliest-located role to the next qualifying text. Re-read them in the project 4 consistency audit.
5. **Item 69 (Moravec 1979, W08).** Keep `bears_on_proposition`; the checker reads it as articulating W08. This disagreement is recorded here and in the collection's search note. Re-read it in the project 4 audit. No earliest-located role changes on this item.
6. **Item 97 / W05 criterion.** Clarify the criterion: "capacity" means intelligence or overall cognitive capacity, not a robot's sensorimotor or output capacity. Item 97 stays `bears_on_proposition`.
7. **Engagement labels.** Items 12 (Joy 2000) and 20 (Pinker 2015) become reasoned objections; each gives a reason for its position. Item 21 (Alexander 2014) stays contrary-only at passage level.
8. **Mechanical corrections:**
   - Item 59 (Vinge): mark the omission of "technological" in the quotation.
   - Kurzweil 2001: written November 2000; publication stated 7 March 2001 (capture 20011107130154). Correct the January 2001 label.
   - Kelly: 27 April 2017, from the primary footer.
   - Bostrom 2004: cite capture 20041221002632, where the Hanson and Moravec footnotes are numbered 11 and 6.
   - e/acc: use the original 1 June 2022 post (capture 20220602061031) as the version basis.
   - Hanson: the "8 March 1994" heading is recorded as a heading, not a publication date.
   - The "Critique of Transcendental Miserablism" post is credited to its signature, "Old Nick", not to Land.
9. **Faggella, "worthy successor".** The February 2024 capture (20240226081218) lacks the current W02 wording and conclusion, the item 117 Kurzweil sentence and both item 77 slowdown passages. Those passages are dated by the current page's retrieval, not 2023. Passages present in the capture cite it. Both posting dates are kept as stated: 22 December 2023 in the archived metadata and 24 November in the current metadata.
10. **New contesting texts.** "Contra Land on Orthogonality" (page dated 24 August 2018) is held until a capture confirms its date. The Goertzel interview is not added. The W10 gap (no contesting text) is stated in the search note, not padded.
11. **Adjacent strands.** "Searched, not included" is confirmed within the recorded bounds of each search: Russian cosmism, god-building, Soviet cybernetics and Chilean cybernetics. These searches do not establish absence across a whole strand, and the search note says so.

Admission follows the current admissions chain, as a minor release (new collection) based on main after the chain merges.
