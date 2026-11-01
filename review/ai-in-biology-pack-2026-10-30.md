# AI in biology candidate pack, 2026-10-30

Review note for the candidate pack in [`research/ai-in-biology/`](../research/ai-in-biology/README.md), on branch `ai-in-biology-pack`. It is the first part of the "AI in science" strand (roadmap note of 2026-10-30).

- **Preparing family:** Claude, for drafting, integration and the same-family audit.
- **Checking family:** not yet run. Under the operating guide this is a GPT run of the [blind brief](../research/ai-in-biology/cross-family-input-2026-10-30.md).

Nothing is admitted, and `data/`, `src/`, the schema and the releases are unchanged.

## What the pack holds

The pack has 256 candidate records, 101 document versions, 70 candidate entities and 108 sources, in four strands:

| Strand                      | Records | What it covers                                                                                                                                                                                          |
| --------------------------- | ------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Institutions                |      98 | DeepMind/Google DeepMind science, Isomorphic Labs, EvolutionaryScale, Arc, IPD, MSR AI for Science, NVIDIA BioNeMo, Recursion, insitro, Generate, Genentech/Roche, XtalPi, BioMap, Exscientia, Insilico |
| Models and resources        |      71 | CASP (organisers' pages and overview papers), AlphaFold 1–3, AlphaFold DB, AlphaMissense, AlphaProteo, RoseTTAFold, RFdiffusion, ESM, Evo, Rosetta, Foldit                                              |
| People                      |      59 | Authorship and dated roles (in this strand and in Institutions), and the 2024 Nobel Prize in Chemistry as the Academy's statement                                                                       |
| Claims about AI and biology |      28 | Six propositions (P1–P6), each with its earliest located text                                                                                                                                           |

Eleven AI and biosecurity (`ai-bio-pack`) candidates are linked from here and not re-recorded.

Checks:

- **Mechanical verification:** 360 quotations, no problems.
- **Register and priority-word screens:** clean.
- **Same-family audit:** 72 records sampled; 45 upheld and 27 corrected, with nothing dropped and no hazard or privacy finding.
- **`pnpm check:privacy`:** passed.

`pnpm check` was not run: no application, data or schema file changed.

## Open questions, each with a recommended answer

### Where it sits

1. **Hub.** Which hub hosts the pack? _Recommended:_ Institutions & people, as the home of the institutions, models and people strands, since it is institutional and documentary history of machine intelligence in a science. The claims strand also belongs in Ideas & debates, where its propositions sit beside the other proposition collections. The biosecurity links lead to Governance through the AI and biosecurity pack. One home, two cross-links; no new hub.
2. **An "AI in science" collection.** Should a collection called "AI in science" host this pack, as the roadmap note of 2026-10-30 anticipates for mathematics, physics, chemistry, materials, climate, astronomy and space? _Recommended:_ Yes. At admission, create one reader collection named "AI in science", with biology as its first and, for now, only section. Its definition says that it records institutions, models and papers, people and attributed claims, field by field, and that it is not a survey of the fields. The name then needs no change when mathematics is added. Do not create empty sections for fields not yet researched. The collection is for readers; it does not replace the hub placement in question 1.
3. **Spine wording.** The positioning document's three spines do not name science. _Recommended:_ No change to the spines now. "AI in science" is a strand inside The institutional history of machine intelligence. Revisit at the mid-November step-back review if the strand grows to a second field.

### Size and admission shape

4. **Over the bound.** The pack has 256 records against an aim of about 200. _Recommended:_ Keep all of them, since none restates another. If a smaller pack is wanted, drop in this order:
   - (a) the four AlphaMissense authorship records, whose evidence is secondary metadata;
   - (b) CASP records beyond CASP1, CASP13 and CASP14 headline results (about 8);
   - (c) AlphaFold 3 limitation records beyond two (about 4);
   - (d) Isomorphic Labs partnership records beyond Lilly and Novartis (about 3).

   That brings it to about 237.

5. **Proposed predicates.** The pack uses two predicates the schema does not have:
   - `partnership_announced` (13 records), subject → counterparty, with `activityStage: announced`;
   - `award_announced` (3 records), awarding body → laureate, with the citation quoted.

   _Recommended:_ Accept both and admit in two parts, as the operating guide sets out for a schema change:
   - **Part 1:** the 240 records on existing predicates, a patch or minor release.
   - **Part 2:** the schema change and the 16 records that need it, a minor release.

   The alternative, `states_provision` on the announcing document, loses the counterparty as a graph edge.

6. **Amount and attribute shapes.** Settled in the audit (decision b): only the schema's amount scopes, and no `milestones` or `participation` attributes. "Up to" amounts and "led by" stay in statements. _Recommended:_ Confirm.

### Evidence and dates

7. **Inferred dates on two DeepMind pages.** Google DeepMind's blog now displays 15 January 2022 and 22 July 2022 on posts whose texts concern the CASP13 entry of 2018 and the AlphaFold database launch of July 2021. Four records date them by inference from the text. _Recommended:_ Keep the inferred dates, marked inferred with their rationale. Have the cross-family checker, who can reach the Internet Archive, open the captures the availability service lists (2018-12-03 and 2021-07-24). Replace the inference with the capture date only if the capture holds the quoted wording.
8. **Science papers on other expressions.** science.org refused retrieval:
   - AlphaMissense, ESM-2 and ESM3 rest on their PubMed records;
   - RoseTTAFold and Evo rest on PubMed Central author manuscripts;
   - the 1997 Rosetta paper rests on its PubMed record.

   _Recommended:_ Accept for abstract-level statements and dates, under audit decision e: abstract text relayed by PubMed is the authors' and primary; bibliographic metadata is secondary. Replace the PubMed records with the article if the checker or a later thread can read it.

9. **Paraphrase-only and bundle-only sources.**
   - **Genentech's 2021 Prescient Design story:** its text is in script data, so its two records rest on paraphrase.
   - **BioMap's site:** read from its JavaScript bundle.

   _Recommended:_ Keep both as candidates. Before admission, prefer a Roche or Genentech document that can be quote-checked for the acquisition, for example Roche's 2021 annual report, and a rendered capture for BioMap.

10. **CASP14 roles re-dated (integrator against a drafting pass).** The people pass dated Moult's and Baker's CASP14 committee roles to 2020 because the undated page concerns CASP14. The integrator made them snapshots at the retrieval date, under the scope's rule. _Recommended:_ Keep the snapshots. A committee listing on an undated page is not dated by its subject. Record CASP14's dates separately, as the models pass does.
11. **Pages attested only from 2026-10-30.** The wording of DeepMind's 2020 account, the Isomorphic Labs launch article (dated 1 November 2021) and EvolutionaryScale's ESM3 post (25 June 2024) was read as served on 2026-10-30. _Recommended:_ Keep the records dated by the page's own date, with the attestation date in the note, as the editorial policy's "two dates" rule requires. Ask the checker to compare captures.

### Claims about AI and biology

12. **P1 is not limited to AI.** P1 is the proposition that computationally predicted structures aid drug design. Its earliest located text is Blundell et al. (_Nature_, 1987), on knowledge-based modelling. _Recommended:_ Keep the criterion broad, since the expectation predates machine learning, which is what the record shows. Do not add a separate machine-learning-only proposition unless the maintainer wants that question asked.
13. **Abstract-only texts.** Five proposition texts were read only in Europe PMC abstract records, including P6's earliest located text (Jayatunga et al., 2024). _Recommended:_ Admit as abstract-level records. Hold P6's earliest-located headline until the article is read, because the criterion turns on a rate the abstract may state differently from the body.
14. **Ahlmann-Eltze et al. (2025) as contesting P2.** _Recommended:_ "Contests", limited to the present-tense half of the criterion as the record says. This is one of the records the cross-family check should look at.
15. **Weakly bounded searches.** The "How we searched" note itself calls P2, P4 and P5 weakly bounded. Two 2019 generative-model preprints were listed for P4 but not read. _Recommended:_ Do not show "Earliest located" headlines for P2, P4 and P5 on the site until a second search, by the checker or a follow-up thread, has been run. Show the texts in date order without the headline meanwhile.

### Identity and modelling

16. **AlphaFold 2 paper defined twice across packs.** The technical-history candidate `th-jumper-2021-alphafold` is the same expression as the dataset's `alphafold-paper`. _Recommended:_ When the technical-history pack is admitted, map its records onto `alphafold-paper` and drop the candidate document. This pack already uses `alphafold-paper` and links the sibling.
17. **Models as documents.** No `model` entities were created; each model is represented by its paper or release. _Recommended:_ Keep. Add `model` entities only when a record needs a model as subject or object across several documents, for example to compare AlphaFold versions.
18. **Single entities across names.** _Recommended:_ Keep one entity each:
    - XtalPi, which filed as QuantumPharm Inc. until November 2024;
    - Microsoft Research's AI4Science team (2022) and AI for Science lab (2026);
    - CASP the experiment series and the Prediction Center, for Moult's `co_founded`.

    Each qualification states the difference.

19. **EvolutionaryScale and Biohub (November 2025).** _Recommended:_ A statement only, not `acquired` or `combined_into`, since neither party's text uses either.
20. **Two titles for Jumper on one day.** _Recommended:_ Keep both, sourced separately and not reconciled.

### Gaps and follow-ups

21. **Not found.** The following could not be found in a source that answered:
    - EvolutionaryScale's founding date, founders and seed round;
    - BioMap's founding year and its Sanofi collaboration;
    - Pushmeet Kohli's Google DeepMind title;
    - XtalPi's later DoveTree updates (5 August 2025, 27 May 2026), which may record a definitive agreement.

    _Recommended:_ A bounded follow-up. Codex can reach the Internet Archive and is best placed for the captures.

22. **Not in scope this time.** Omitted, with reasons in `pack.md`:
    - CASP15 to CASP17;
    - AlphaFold-Multimer, AlphaFold Server and AlphaGenome;
    - the ESM Metagenomic Atlas;
    - clinical-trial registry entries;
    - Insilico's earlier trial statements;
    - the Nobel scientific background.

    _Recommended:_ Leave them to a second increment, after the cross-family check, rather than widening this pack.

## Next step

Run the cross-family check: a GPT model takes [`cross-family-input-2026-10-30.md`](../research/ai-in-biology/cross-family-input-2026-10-30.md) blind first, then compares with the verdicts file, on its own branch. After that, adjudicate and record the maintainer's decisions on the questions above in a "Maintainer decisions" section here, before any admission task.

## Maintainer decisions and adjudication (2026-10-30)

All recommended answers to the open questions above are adopted. The cross-family check (`research/ai-in-biology/cross-family-check-2026-10-30.md` on branch `codex/ai-in-biology-check`) is accepted; apply at admission:

1. DeepMind posts dated by their original-period captures (2 December 2018; 22 July 2021), not the dates the served pages now display.
2. AlphaMissense and Lyu: publisher online and print dates kept apart; the relay disagreement recorded.
3. P2 earliest located → Bray (1990); P3 → Berg's 2013 company announcement; search bounds restated.
4. P4 and P5: no earliest-located headline until their criteria are adjudicated; hold the roles.
5. Ahlmann-Eltze et al. (2025): a qualified challenge to the tested models, not a contradiction of P2 as a whole.
6. Isomorphic Labs launch at month precision (November 2021); ESM3's current byline not backdated.
7. Roche's 2021 annual report as evidence for the Prescient Design acquisition.
8. P6: the rate statement with its stated caveats; no causal claim.
9. The punctuation and locator corrections listed in the report.

Anything else that needs judgement is held and listed. Admission follows the data-loading stages.
