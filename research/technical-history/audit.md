# Same-family audit, 2026-10-29

Two fresh-context auditors from the preparing model family (Claude) checked a sample of the merged pack against the retrieved sources and tried to refute each record. They were given the scope, the editorial policy's sections on earliest located texts and short quotation, `pack.json` and the sample, and were told not to read the drafting brief, the drafts' open questions, `pack.md` or the review note. Their reports are kept unchanged in [audit/audit-a.json](audit/audit-a.json) and [audit/audit-b.json](audit/audit-b.json). Agreement between passes of one family is not independent corroboration; the cross-family check is still required.

## Sample and coverage

[audit-sample.json](audit-sample.json), drawn by [audit-sample.mjs](audit-sample.mjs) (seed 1029) from the pack as merged before the audit (194 claims):

- **Targeted (63):** every earliest-located-term record (17), every inferred record and record resting on secondary evidence only, every other attributed statement in pack order, and 12 timeline statements (seeded).
- **Random (25)** of the remaining 131 records.
- **Dates (12)** of the document dates whose kind is not publication.

Pass A took the first half of the combined list (44 records) and dates 1–6; pass B the second half and dates 7–12. Both read every sampled source: cached text layers, page images rendered from scans (the Dartmouth facsimile, Rosenblatt 1957, LeCun 1989, RAND P-1584, Kowalski 1974, Pearl 1985, the A\* paper, the 1986 Nature letter), and fresh retrievals where needed. For each earliest-located record they ran a quick independent search (Crossref titles, arXiv API, Semantic Scholar abstracts, ACL Anthology). Coverage: 100 items, about half of all records; the other records were checked mechanically only.

## Findings

| Pass | Items |  OK | Fix | Drop |
| ---- | ----: | --: | --: | ---: |
| A    |    50 |  37 |  13 |    0 |
| B    |    50 |  39 |  11 |    0 |

Every quotation sampled matched its source verbatim at its locator, and every page-image paraphrase sampled was faithful. The findings concern **which text is earliest located** (ten of the seventeen headlines were refuted or found to rest on an unread or undated text), the dating of a mutable page, and wording.

## Rule adopted for earliest-located roles

The audit found three kinds of headline that the drafts had treated alike: texts read in full; titles read only in an index record (Crossref) or a citing reference; and a text read only in an undated current copy. The editorial policy says that the date of the wording decides, and that "a text known only from an undated later copy cannot be" earliest located. The integrator applied one rule to all seventeen concepts:

> **R1.** An earliest-located role needs wording read in the text itself and dated by that text. Where an earlier lead is known only as an unread index title, a citation in another text, or an undated later copy, the role is **withheld** (as schema 2.16 allows for propositions), the reason names the leads that would decide it, and the record that held it becomes a use. The withheld headline is recorded as a correction on the concept.

R1 is the integrator's adjudication, not a maintainer decision, and it bears on headlines, so under the editorial policy it is put to the maintainer (review note, question 1) and to the cross-family check (Part A asks for each search blind). Under R1, eight roles are withheld and nine are assigned:

| Concept                           | Before the audit                     | After                                                                                                          |
| --------------------------------- | ------------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| 'artificial general intelligence' | Gubrud 1997 (undated current copy)   | Withheld: a 1997–1998 capture or printed proceedings would decide                                              |
| 'machine learning'                | Campaigne, March 1959 (index title)  | Withheld: Campaigne's text decides; if it does not meet the criterion, Samuel (July 1959) is the earliest read |
| Connectionism                     | Dartmouth 1955, "Neuron Nets"        | Withheld: titles of 1942–1950 (Pitts, Landahl, Studley, Rapoport) not read                                     |
| Evolutionary computation          | Burgin 1973 (index title)            | Withheld: Fogel, Owens and Walsh 1966, cited by Koza 1990                                                      |
| Statistical learning, SVMs        | Cortes and Vapnik 1995 (index title) | Withheld: Boser, Guyon and Vapnik 1992 not read                                                                |
| Hybrid, neurosymbolic             | Towell and Shavlik (1994 wording)    | Withheld: titles of 1988–1991 (Nenov and Dyer, Hendler, Wermter and Lehnert) not read                          |
| Search and planning               | GPS report (1958–59)                 | Withheld: Simon and Newell 1958 (Operations Research) and the 1956–57 Logic Theory papers not read             |
| Symbolic AI, expert systems       | Malhotra, IJCAI 1975                 | Withheld: Malhotra's February 1975 thesis (cited) and the 1969–1974 Stanford reports not read                  |
| 'large language model'            | Brants et al. 2007                   | **Corrected** to Hu, Turin and Brown, ICSLP 96 (October 1996), found and read by pass B                        |
| 'artificial intelligence'         | Dartmouth 1955                       | Unchanged                                                                                                      |
| 'superintelligence'               | Vinge 1993                           | Unchanged                                                                                                      |
| 'deep learning' (neural)          | Weston, Ratle and Collobert 2008     | Unchanged (Aizenberg et al. 2000 attributed, not read: see question 4)                                         |
| 'foundation model'                | Bommasani et al. 2021                | Unchanged                                                                                                      |
| Transformers and LLMs             | Vaswani et al. 2017                  | Unchanged                                                                                                      |
| Reinforcement learning            | Minsky 1961                          | Unchanged                                                                                                      |
| Probabilistic, Bayesian           | Minsky 1961, "Bayes nets"            | Unchanged                                                                                                      |
| Logic programming                 | Kowalski 1974                        | Unchanged (his November 1973 memo is claimed in Kowalski 1988, not read)                                       |

## Dispositions

All changes are made in the drafts by [audit-fixes.mjs](audit-fixes.mjs), which names each finding it answers; `pack.json` is rebuilt from the drafts.

| Record                                                             | Pass | Finding                                                                                                  | Disposition                                                                                                                                                                          |
| ------------------------------------------------------------------ | ---- | -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `th-term-agi-gubrud-1997`                                          | A    | Undated current copy cannot hold the role; the sense rests on an unquoted definition; "might" softens it | Role withheld (R1); definition quoted; statement reworded without "might"; attested date stated as undated                                                                           |
| `th-credit-goertzel-2011-gubrud`                                   | A    | "the term 'AGI'" implies the abbreviation, which Gubrud does not use                                     | Reworded to the full phrase; qualification notes the post does not name the article                                                                                                  |
| `th-term-agi-goertzel-wang-2007`                                   | A    | Time basis publication; the year is claimed from a citing reference                                      | Basis set to claimed                                                                                                                                                                 |
| `th-term-ai-dartmouth-1955`                                        | A    | Paraphrase misplaces "the artificial intelligence problem"; annotated facsimile not noted                | Paraphrase corrected; source version notes the annotations                                                                                                                           |
| `th-cn-name-dartmouth-1955`                                        | A    | Earlier titles 1942–1950 name neural nets as formal models                                               | Role withheld (R1), leads named                                                                                                                                                      |
| `th-cn-def-rosenblatt-1957`                                        | A    | Statement fuses the laboratory programme with the author's research                                      | Statement and object reworded; ambiguity noted                                                                                                                                       |
| `th-ml-campaigne-1959`                                             | A    | Sense marked "meets" though only inferred                                                                | Sense set to unverified; role withheld (R1)                                                                                                                                          |
| `th-evo-burgin-1973`                                               | A    | Displaced by Fogel et al. 1966, cited in the pack's own evidence                                         | Role withheld (R1); sense unverified                                                                                                                                                 |
| `th-stat-cortes-vapnik-1995`                                       | A    | Conflicts with the family's names; Boser et al. 1992 earlier                                             | Role withheld (R1)                                                                                                                                                                   |
| `th-ns-towell-1994-term`                                           | A    | Earlier "hybrid symbolic/connectionist" titles 1988–1991                                                 | Role withheld (R1)                                                                                                                                                                   |
| `th-ns-garcez-lamb-credits-kautz`                                  | A    | Object is the 2022 article; the credit is to the 2020 lecture                                            | Kept: the object records the lecture (presented 2020-02-10) with its article; qualification says so                                                                                  |
| `th-sp-name-gps-1959`                                              | A    | Simon and Newell 1958 earlier; Logic Theory papers unsearched                                            | Role withheld (R1)                                                                                                                                                                   |
| `th-sym-name-malhotra-1975`                                        | A    | Author's February 1975 thesis cited; sense rests on an unquoted passage                                  | Role withheld (R1); p. 2 passage added as a paraphrase (the two-column text layer interleaves)                                                                                       |
| `th-term-llm-brants-2007`                                          | B    | Earlier use: Hu, Turin and Brown, ICSLP 96                                                               | Correction: Hu 1996 added as the earliest located (`th-term-llm-hu-1996`); Brants a use; search note extended                                                                        |
| `th-term-fm-bommasani-2021`                                        | B    | The description is in the preceding sentence                                                             | Preceding sentence quoted                                                                                                                                                            |
| `th-credit-goertzel-2011-self`                                     | B    | The ellipsis dropped Goertzel's partial self-credit; locator wrong                                       | Statement and contribution include "did sort of commission its creation"; quoted clause added, first clause paraphrased to stay within the post's quotation limit; locator corrected |
| `th-cn-credit-pdp8-parker`                                         | B    | Quotation follows the text layer's "learninglogic"                                                       | Kept the matched text-layer form (the checker matches against it); note gives the printed form "learning-logic"                                                                      |
| `th-cn-credit-schmidhuberbp-linnainmaa`, `…-werbos`, document date | B    | Wording dated 2014 is at least 2020 wording; the order of the disagreement is reversed                   | Records dated 2025 (claimed: the page's latest stated update); a document date records it; the 2014 survey's different account noted on the Werbos record                            |
| `th-fam-tllm-gpt2-uses-transformer`                                | B    | Basis publication; the year is claimed                                                                   | Basis set to claimed                                                                                                                                                                 |
| `th-dl-credit-schmidhuber2014-2006`                                | B    | The edge reads as crediting Hinton et al. 2006 with the term                                             | Contribution reworded to the pre-training the survey cites it for; qualification says it is not a term credit                                                                        |
| `th-lp-name-colmerauer-1992`                                       | B    | "publication 1992-11" is the date the author's PDF bears                                                 | Document date kind set to event (date the text bears); claim basis claimed; HOPL-II 1993 noted                                                                                       |
| `th-fam-tllm-gpt4-def`                                             | B    | RLHF clause outside the quotation                                                                        | Sentence quoted                                                                                                                                                                      |

**Optional points not applied** (listed in the audit files): fuller quotations where the omitted words are short (Rosenblatt 1958, AlphaGo Zero, Zhao et al.), labelling issue dates, the 2018/2020 printing of Sutton and Barto, the Kowalski 1973 memo as a claimed date, a duplicate date on Samuel 1959, citing the STRIPS proceedings PDF rather than the web detail page, and the GPT-2 PDF metadata date. None changes a proposition or a date; they are left for the admission pass.

## Integrator's changes before the audit

- **Privacy.** Group A had quoted the header of McCarthy's retyped 1959 copy, which prints a contact address; the date evidence is now a paraphrase. (An interim checkpoint of the draft that contained it was pushed to the branch before the privacy check caught it; see the review note.)
- **Feigenbaum 1977 naming record.** A second quotation added so that both names the record carries ('knowledge engineering', 'knowledge-based systems') are quoted.
- **Person IDs.** Group A's candidate persons renamed from a `th-person-` prefix to plain IDs (`edward-feigenbaum`, `philippe-roussel`, `alain-colmerauer`), as the dataset's person IDs have no prefix.
- **Merge checks.** Quoted words and attributed ("According to …") statements are excluded from the priority-word check; a naming record may carry several names separated by semicolons, each of which must be quoted.

## Retrieval failures during the audit

The Internet Archive answered HTTP 429 or reset the connection to both passes, so no capture of Gubrud's original address or of an earlier state of Schmidhuber's page could be found. The GitHub API returned nothing for the GPT-2 repository; Elsevier withheld a 1997 abstract by Hu and colleagues; ACM refused Campaigne 1959.
