# Kinds of AI and technical history: candidate pack, 2026-10-29

A report on the candidate research pack in [`research/technical-history/`](../research/technical-history/README.md), prepared on branch `technical-history-pack` for two roadmap backlog items: "Kinds of AI and technical history" (the families of machine intelligence and a technical timeline, as a documentary subproject) and "AGI term provenance". Nothing was admitted: `data/`, the application, the schema and the releases are unchanged.

**Families.** Prepared by Claude (five drafting passes, integration and a two-pass same-family audit). To be checked by GPT (the cross-family brief, not yet run). No record has human review.

## What the pack holds

195 candidate claims in the dataset's shape, on 86 new documents, 6 reused dataset documents and 10 reused key-papers documents, from 129 retrieved sources:

| Part     | Claims | What                                                                                                                                                                                                                                                                                                                                                                   |
| -------- | -----: | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Families |    111 | Eleven families, each a candidate concept with its usual names, a one-sentence criterion and a "How we searched" note: naming records (`uses_term`), defining statements quoted from primary texts (`discusses`), attributed statements about who devised or named something (`explicitly_credits`, `credits_work`), and reported use of a method (`uses_method_from`) |
| Terms    |     45 | Seven terms: 'artificial intelligence', 'machine learning', 'deep learning' (neural networks), 'artificial general intelligence' / 'AGI', 'superintelligence', 'large language model', 'foundation model'                                                                                                                                                              |
| Timeline |     27 | Records dated by the texts they come from; 23 of them are event statements from primary texts (matches, releases, results, stated parameter counts), which with 79 dated document versions give a timeline of 102 rows from 1943 to 2023 ([timeline.md](../research/technical-history/timeline.md))                                                                    |
| Persons  |     12 | Authorship records; candidate persons Ben Goertzel, Mark Avrum Gubrud, Edward A. Feigenbaum, Philippe Roussel and Alain Colmerauer; reused Shane Legg, John McCarthy, Nick Bostrom, Yann LeCun, Marvin Minsky, Donald Michie and Nils J. Nilsson                                                                                                                       |

Counting new documents, candidate concepts and persons and the dated document versions, the pack holds 383 candidate records. Every quotation (314) matches its retrieved source and the per-source quotation budgets, which count the dataset's existing quotations, hold ([verification.json](../research/technical-history/verification.json)).

### Headlines

| Concept                                                                                                                                               | Earliest located use                                                                                                                                       |
| ----------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 'artificial intelligence'                                                                                                                             | Dartmouth proposal, 1955-08-31 (extends the dataset record)                                                                                                |
| 'machine learning'                                                                                                                                    | **Withheld**: Campaigne (March 1959, title only) or, if it fails the criterion, Samuel (July 1959)                                                         |
| 'artificial general intelligence'                                                                                                                     | **Withheld**: Gubrud (Foresight conference, November 1997), read only in an undated current copy                                                           |
| 'superintelligence'                                                                                                                                   | Vinge, VISION-21 proceedings, 1993-12 (displaces the dataset's 1996 Yudkowsky use)                                                                         |
| 'deep learning' (neural networks)                                                                                                                     | Weston, Ratle and Collobert, ICML 2008                                                                                                                     |
| 'large language model'                                                                                                                                | Hu, Turin and Brown, ICSLP 96, 1996-10 (statistical sense; correction from Brants et al. 2007)                                                             |
| 'foundation model'                                                                                                                                    | Bommasani et al., arXiv v1, 2021-08-16                                                                                                                     |
| Transformers and LLMs                                                                                                                                 | Vaswani et al., arXiv v1, 2017-06-12 ("the Transformer")                                                                                                   |
| Reinforcement learning                                                                                                                                | Minsky 1961 ("reinforcement learning device")                                                                                                              |
| Probabilistic and Bayesian                                                                                                                            | Minsky 1961 ("Bayes nets")                                                                                                                                 |
| Logic programming                                                                                                                                     | Kowalski, IFIP 74                                                                                                                                          |
| Connectionism, evolutionary computation, statistical learning and SVMs, hybrid and neurosymbolic, search and planning, symbolic AI and expert systems | **Withheld**, each with the unread leads that would decide it ([audit.md](../research/technical-history/audit.md#rule-adopted-for-earliest-located-roles)) |
| Deep learning (family)                                                                                                                                | Its naming records are the term's                                                                                                                          |

### Attributed statements, side by side and unresolved

- **'AGI'.** Goertzel (2011): Shane Legg suggested the title "Artificial General Intelligence" for Goertzel and Pennachin's book "in 2002 or so"; Gubrud had used the term in a 1997 article; Goertzel spread the term, "did sort of commission its creation", but did not coin it.
- **Backpropagation.** The PDP chapter (1986) credits Parker (1985) and Le Cun (1985) with similar derivations; LeCun, Bengio and Hinton (2015) cite Werbos (1974) among four works; Schmidhuber's 2014 survey credits Linnainmaa (1970), "apparently", and Werbos 1981 for the neural-network application; his page as served in 2026 (updated 2025) says 1982 and "not yet in his 1974 thesis".
- **'deep learning'.** Schmidhuber (2014): "coined around 2006"; Schmidhuber (2022): Dechter (1986) for machine learning, Aizenberg et al. (2000) for neural networks. Dechter's use is recorded as other-sense (constraint-satisfaction search); Aizenberg et al. was not retrieved.
- **'knowledge engineering'** (Feigenbaum 1977; Buchanan and Shortliffe 1984) and **the name 'Prolog'** (Kowalski 1988: Jacqueline Roussel; Colmerauer and Roussel 1992: Philippe Roussel).
- **'large language model'.** Zhao et al. (2023) say the research community coined the term, citing four works of 2022; the pack's located uses go back to 1996 in a statistical sense.
- **'foundation model'.** Bommasani et al. state that they chose to coin the term; recorded as the text's statement.
- **'artificial intelligence'.** McCarthy's undated review states one reason for "inventing the term"; recorded as his statement.

## Scope choices

- **Families are concepts; names are records.** Each family and term is a candidate concept with a criterion, and the earliest-located role follows the dataset's rule for propositions (schema 2.11 and 2.16): one per concept, decided by the date of the wording, withheld when an unread lead could decide it. A definition never says where a family began.
- **Reuse, not duplication.** The key-papers pack's records (authorship, citations, "states contribution") are not re-recorded; this pack adds only the dates and passages it needs, re-retrieved, under the key-papers IDs. Dataset documents are reused the same way.
- **Proposed predicates.** `uses_term` (naming) is new; `credits_work` is the key-papers pack's proposal. All other predicates exist. Defining statements use `discusses` with `attributes.technical.kind` (`definition`, and in some records `description`, `assessment` or `method`); event statements use `states_provision` of kind `statement` (schema 2.20).
- **Stubs for works known only from citation.** Seven documents (Linnainmaa 1970, Kelley 1960, Werbos 1974 and 1982, Parker 1985, LeCun 1985, Aizenberg et al. 2000) are objects of attributed statements only, marked as not retrieved; no record states what they say.
- **Bounded selection.** About 200 claims, as asked. Omissions (36) are listed with reasons in `pack.md`: among them Minsky and Papert's _Perceptrons_, the PDP volumes, Holland 1975, Haugeland's _Artificial Intelligence: The Very Idea_, Goertzel and Pennachin's 2007 volume, Legg's 2008 thesis, Newell and Simon 1976 and OpenAI's announcement posts for GPT-2 to GPT-4, which could not be retrieved or read.

## Checks run

- `tools.mjs check` on each draft and `tools.mjs verify` on the merged pack: 314 quotations, no problems.
- `tools.mjs merge`: identifiers against the dataset and the key-papers pack, one earliest-located record per concept unless withheld, no use in the required sense dated before it, no priority words in the pack's own sentences: no problems.
- Same-family audit of 100 items (two passes; 24 fixes, none dropped): [audit.md](../research/technical-history/audit.md).
- `pnpm check:privacy` before each push. No application, schema or data change, so `pnpm check` and the browser suite were not run.

## Retrieval failures

60 are listed in `pack.md`. The ones that matter most:

- **Internet Archive.** Capture pages refused this environment throughout, and the availability service answered HTTP 429; no capture was opened or compared. This blocks the 'AGI' headline (Gubrud's original address) and the dating of Schmidhuber's page.
- **Full-text search before the web.** Google Books (quota), OpenAlex (budget), Semantic Scholar (429 for most queries), scholar.archive.org and Usenet archives did not answer, so searches before about 1995 rest on Crossref titles and deposited abstracts, arXiv, the ACL Anthology bibliography, IJCAI and AAAI proceedings indexes, and the retrieved texts.
- **Publishers.** ACM Digital Library, ScienceDirect, Wiley, Springer and Sciendo refused most requests (Newell and Simon 1976, Campaigne 1959, Holland 1962, Campbell et al. 2002, Goertzel's 2014 JAGI article, Cortes and Vapnik 1995).
- **openai.com** and its help centre refused: ChatGPT's release is dated only as claimed, from the GPT-4 system card's reference. **jmc.stanford.edu**, **vetta.org** (Legg's thesis), **pnas.org**, **image-net.org** and **iro.umontreal.ca** refused or failed; copies on other author, course or repository sites were used where they exist, each with a version note.

## Open questions

1. **Rule R1 for earliest-located roles.** The integrator withheld eight headlines whose earliest lead is an unread index title, a citation or an undated current copy ([audit.md](../research/technical-history/audit.md#rule-adopted-for-earliest-located-roles)). Should headlines follow R1? **Recommended: yes.** It applies the policy's existing rule (the date of the wording decides; an undated later copy cannot be earliest located) and the dataset's withheld mechanism, and every withheld role names the leads that would decide it. Because it overrides the drafts on headline roles, it is not admitted on this adjudication alone; the cross-family check answers each search blind.
2. **Gubrud 1997 and 'AGI'.** The Foresight Archives' copy is the conference organiser's own continuing copy, undated, which names the original 1997 address; Goertzel (2011) independently reports a 1997 article by Gubrud. Is that copy a "later copy" under the policy? **Recommended: treat it as one, and keep the role withheld until a 1997–1998 capture (or the printed proceedings) is opened.** The cross-family checker is asked to open the capture; if it matches, Gubrud becomes the earliest located use, dated by the capture.
3. **Where do the families live in the hubs?** **Recommended: in "The institutional history of machine intelligence" hub, as a "Kinds of AI" collection page beside the institutions, with the timeline as its second view; terms ('AGI', 'superintelligence') link from the "Human thought and institutions" hub (Ideas & debates), where the propositions already are.** Families are documentary history of methods rather than debates, and the thought spine's propositions and this pack's terms should not be merged: a term record says a name was used, not that a proposition was argued.
4. **Is "technical history" a new collection type?** **Recommended: yes, a minor release when admitted.** Its records are naming records and dated versions, not propositions; it needs `uses_term` (or an equivalent the maintainer prefers) and a concept block with a criterion and terms, like the proposition block but for names. The admission would follow the two-part route of the operating guide: records on existing predicates (`discusses`, `explicitly_credits`, `authored`, `states_provision`, `uses_method_from`) first, then the schema change and the naming records.
5. **'large language model': statistical or neural sense?** The criterion counts language models distinguished by size, so Hu, Turin and Brown (1996) and Brants et al. (2007), both statistical, are located uses, and the earliest neural-network use found is Witteveen and Andrews (2019). **Recommended: keep the scale criterion and show the neural-sense use as a separate line in the collection, not as a second headline.** A neural-only criterion would need a fuller 2017–2019 search first.
6. **'deep learning' headline.** Weston et al. (2008) already speak of "existing approaches to deep learning". **Recommended: keep it as the earliest located, with the cross-family checker asked to search 2000–2008 (Aizenberg et al. 2000, the NIPS 2007 workshop, Bengio's 2007 report, Gomez and Schmidhuber 2005).**
7. **`reinforcement-learning` already exists in the dataset** as a concept. **Recommended: at admission, map `th-fam-reinforcement-learning` onto it rather than create a second concept**; the other family concepts are new.
8. **Persons.** Goertzel and Gubrud are supported by authored texts (Goertzel's 2011 post and SL4 message; Gubrud's 1997 paper); Feigenbaum, Roussel and Colmerauer by their papers. Legg is already in the dataset and gains only the Legg–Hutter authorship and Goertzel's attributed statement. **Recommended: admit the five person records with authorship only, and no record for Jacqueline Roussel (named only in Kowalski's attribution, kept as a literal).**
9. **Works known only from citation.** **Recommended: admit the seven stubs as documents, marked as not retrieved, because the attributed statements need an object;** no claim about their content.
10. **Defining-statement kinds.** The drafts used `definition`, and also `description` (a system's self-description), `assessment` (Lighthill) and `method`. **Recommended: keep the four kinds; calling a system's self-description a definition of a family would overstate it.**
11. **Dependence on the key-papers pack.** Ten documents are key-papers candidates that are not admitted. **Recommended: admit this pack after the key-papers pack, or carry those ten documents' minimal records into this admission if the key-papers pack is held.**
12. **Privacy note.** An interim checkpoint of the group A draft, pushed to this branch, quoted a copy header that prints McCarthy's former university email address; a later commit replaced it with a paraphrase, and the privacy check now runs with its failures visible. The address is a published author address of a 1959 paper's retyped copy, not personal data of a living contributor, and the public repository starts from fresh history. **Recommended: no history rewrite; delete the branch after merge or abandonment as usual.** A rewrite would need a force-push, which this session did not do.

## Next step

Run the cross-family check from [`cross-family-input-2026-10-29.md`](../research/technical-history/cross-family-input-2026-10-29.md) (134 items: 17 blind searches, 30 blind dates, 87 direct records) on branch `codex/technical-history-check`, then adjudicate its disagreements and record the maintainer's decisions here before any admission.

## Maintainer decisions (2026-10-30)

All recommended answers to the open questions above (1–12) are adopted as written. Admission still waits for the cross-family check and its adjudication; where the check changes the basis of a recommendation, the admission task lists it for the maintainer instead of applying it.

## Adjudication of the cross-family check (maintainer, 2026-10-31)

The check (`research/technical-history/cross-family-check-2026-10-29.md` on branch `codex/technical-history-check`, 134 items) is accepted. Apply at admission:

1. 'superintelligence': earliest located becomes Schwartz's March 1986 report, with the OCR/facsimile limit stated.
2. 'deep learning' (neural networks): earliest located becomes the NIPS 2007 workshop page as captured on 18 October 2007; its revision header (12 October) and the planned event (6 December) stay distinct dates.
3. 'artificial general intelligence': Gubrud's wording as attested by the archive capture of 7 February 1998 holds the earliest-located role with that attested date; the November 1997 conference date is shown only as stated, not as a verified publication date.
4. The other seven R1-withheld headlines (connectionism, machine learning, evolutionary computation, statistical learning, neurosymbolic AI, search and planning, symbolic AI) stay withheld; the dated candidates the check located are kept as candidates with their open leads listed.
5. Corrections: the Prolog naming credit recorded from both accounts without adjudication; the Malhotra paraphrase narrowed to vocabulary and dictionary knowledge; the OCR-derived quotations repaired ("learning-logic", "Symbolics"); citation links kept distinct from naming credits; datelines, revisions, publications and presentations kept apart.

Anything else that needs judgement is held and listed. Admit by copying the research files, not by merging this branch (an early commit on it quoted a historical author address).
