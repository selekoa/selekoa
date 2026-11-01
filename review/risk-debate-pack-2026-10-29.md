# Risk-debate candidate pack, 2026-10-29: review note

The candidate pack [`research/risk-debate/`](../research/risk-debate/README.md) records, for the thought spine ("Human thought and institutions around machine intelligence"), the published arguments that advanced AI could pose catastrophic or existential risk and the published counterarguments, 2000–2026: eighteen propositions, each with its earliest located articulation within a stated search, further articulating texts and contesting texts, quoted from primary texts, and the published exchanges in which one text answers another. Nothing is admitted; `data/`, the schema, the application and the releases are unchanged.

- **Prepared by:** Claude family (five drafting passes, an integrator, two fresh-context audit passes and a correction pass).
- **Checked by:** not yet. The cross-family check (GPT family, or whichever family did not prepare) is required before any admission. Its brief is [`cross-family-input-2026-10-29.md`](../research/risk-debate/cross-family-input-2026-10-29.md) (Part A blind, Part B direct; 120 items); the pack's answers are in [`cross-family-verdicts-2026-10-29.json`](../research/risk-debate/cross-family-verdicts-2026-10-29.json).
- **Override rule.** A preparer's adjudication against the checker on an earliest-located role or a headline is not admitted on that adjudication alone (editorial policy).
- **State.** Counts and the balance table are generated in [`pack.md`](../research/risk-debate/pack.md); verification ([`verification.json`](../research/risk-debate/verification.json)) reports no quotation or structural problems; the audit and its dispositions are in [`audit.md`](../research/risk-debate/audit.md).

## Proposition codes

Codes `R01`–`R17` (with `R10a`, `R10b`) are unused elsewhere: codes in use are A1–A6, B1–B6, C1–C3 (superintelligence), Y01–Y30 (Yudkowsky), G01–G09, M01–M09, E01–E05 (economics), and research-only facet codes in other packs (D, F, L, T, S).

| Code | Proposition                                             | Group | Overlaps a dataset concept     |
| ---- | ------------------------------------------------------- | ----- | ------------------------------ |
| R01  | Orthogonality of intelligence and goals                 | R1    | Y02 (contrary; Yudkowsky only) |
| R02  | Instrumental convergence                                | R1    | Y19 (Yudkowsky only)           |
| R03  | Inner or deceptive misalignment                         | R1    | B3, B4                         |
| R04  | Treacherous turn                                        | R1    | B1 (identical criterion)       |
| R05  | Fast takeoff or intelligence explosion                  | R1    | A4 (near-identical), A1        |
| R06  | Difficulty of alignment                                 | R1    | —                              |
| R07  | Risk of extinction or comparable catastrophe            | R1    | —                              |
| R08  | Existential risk from misalignment or loss of control   | R1    | —                              |
| R09  | Catastrophic risk from misuse                           | R1    | —                              |
| R10a | Intelligence brings benevolence or no drive to dominate | R2    | Y02 (Yudkowsky only)           |
| R10b | Advanced AI can be kept under control by design         | R2    | —                              |
| R11  | Risk claims are speculative or unfalsifiable            | R2    | Y20 (Yudkowsky only)           |
| R12  | Present harms deserve priority                          | R2    | —                              |
| R13  | Capabilities will plateau                               | R2    | Y13 (Yudkowsky only)           |
| R14  | Language models lack agency or understanding            | R2    | Y09, Y15 (Yudkowsky only)      |
| R15  | Open models reduce risk                                 | R2    | —                              |
| R16  | Takeoff will be gradual                                 | R2    | Y11 (Yudkowsky only)           |
| R17  | Economic incentives will produce safety                 | R2    | E04                            |

Groups: R1, "Arguments that advanced AI could pose catastrophic risk, and their premises"; R2, "Arguments that the risk is lower, later, placed elsewhere or better handled otherwise".

## Where the collection sits in the hub

The "Human thought and institutions around machine intelligence" hub (`src/ui/Hub.tsx`, hub `ideas`) shows example questions for three propositions collections, in this order: superintelligence (1863–2022), Yudkowsky's arguments (1996–2026), and the economics of machine intelligence. The pack would become a fourth collection, `#/propositions/risk-debate`, defined in a new `src/reading/risk-debate.ts` and listed in `propositionCollections` (`src/reading/human-thought.ts`).

**Recommended placement:** second, after the superintelligence collection and before the Yudkowsky collection, with the example question "Which published texts argue for and against catastrophic risk from advanced AI, and which answer one another?". The thought spine then reads from the long history of the propositions, to the documented debate on both sides, to one author's arguments, so that the single-author collection is not the reader's first view of the disagreement. The superintelligence and Yudkowsky collections should link to the overlapping R propositions and back.

## Open questions

Each has a recommended answer. Questions the drafts raised and the integration or audit already resolved are not repeated (R03's criterion narrowed to the learned objective; R12's earliest located moved to the DAIR statement; duplicate works unified; the 2019 Facebook thread recorded).

1. **R04 and R05 on existing concepts.** R04's criterion is identical to B1's and R05's nearly identical to A4's. Admit them as concepts of their own, or put the records on B1 and A4?
   _Recommended:_ put the records on B1 and A4, list B1 and A4 in the new collection's groups under their existing codes (dropping R04 and R05), and let earliest located be decided across each concept as now (Creating Friendly AI for B1; Vinge 1993 for A4). The pack's R04 and R05 earliest-located roles (Ngo 2022; Yudkowsky 2017, through the name "foom" only) then lapse. Two concepts with one criterion would give two headlines for one proposition.
2. **R03 beside B3 and B4.** R03 is wider than B3 (deceptive alignment) and B4 (scheming). Keep it as a concept of its own?
   _Recommended:_ yes, as `inner-or-deceptive-misalignment`, with a note that B3 and B4 are narrower cases; texts recorded on B3 or B4 are not re-recorded on R03.
3. **Overlaps with Yudkowsky-only claims (Y02, Y09, Y11, Y13, Y15, Y19, Y20).** These claims record his texts only and are phrased as "an explicit claim that …". Merge?
   _Recommended:_ no. Keep the R propositions separate; link each Y claim to its R counterpart in both collection definitions.
4. **The R10 split.** The audit split R10 into R10a (benevolence or no drive to dominate) and R10b (control by design), pairing R10a with R01 and R10b with R08. Accept?
   _Recommended:_ accept. One criterion joined two claims, and texts that accept orthogonality but hold that AI can be controlled by design read as denying orthogonality.
5. **R13 and R14 criteria.** The integration dropped their consequence clauses ("so that AI capable of the catastrophes in question is not near"; "so that they do not themselves pursue outcomes"), which no located articulation states. Accept the narrower criteria?
   _Recommended:_ accept; the collection's introduction says why these propositions bear on the risk debate, and no record implies the consequence.
6. **Earliest located resting on undated or later copies.** Bostrom 2003 (undated revised version) is kept from earliest located on R01 and R05; R02's earliest contesting record and R10a's earliest articulation rest on page order among undated Edge responses of 2014; Benson-Tilsen and Soares is dated by PDF metadata; Bengio's posts carry a modification date of 2025-12-03.
   _Recommended:_ keep the roles as recorded, with the dates visible, and ask the archive-capable thread (Codex) to compare the 2003 proceedings text, the Edge page's 2014 captures and Bengio's 2023–2024 captures before admission. A match for Bostrom 2003 makes it earliest located on R01, recorded as a correction.
7. **Bostrom 2002 on R07, R08 and R09.** "Existential Risks" holds earliest located on all three. On R09 its scenario is a small group entrenching its values through the first superintelligence, "depending on what those values are".
   _Recommended:_ keep R07 and R08; let the cross-family check decide R09 (it is a Part A2 item). If it is judged not to meet "deliberate use … to seize or entrench power", it becomes context and the next articulation holds the role.
8. **R05's earliest located within the pack.** After Chalmers (2010) and Muehlhauser and Salamon (2012) were reclassified as context for want of a stated short period, the role went to Yudkowsky's AlphaGo Zero post (2017), which meets the criterion only through the name "foom".
   _Recommended:_ moot if question 1 is answered as recommended; otherwise keep, with the qualification as written.
9. **Balance.** 93 risk-side and 90 counter-side records overall, but uneven per proposition: the counter side is thin on R09 (7:1), R17 (7:2) and R03 (7:3), the risk side on R05, R10a and R10b, R11 and R12. The causes are retrieval (LessWrong and the Alignment Forum refused this environment) and scope (much pushback on extinction and misuse risk is in posts on X, interviews and untranscribed debates).
   _Recommended:_ do not pad. Admit with the imbalance stated in the collection's search note. Ask a follow-up thread that can reach LessWrong to add the posts named in the omissions (Pope, Belrose, Barnett, DavidW, Wentworth, Kokotajlo 2020, Hanson's reply on AlphaGo Zero), and run a targeted search of liability and law-and-economics writing for R17.
10. **Missing seed texts.** "On the Dangers of Stochastic Parrots" (2021), Chollet's "The implausibility of intelligence explosion" (2017), LeCun's "A Path Towards Autonomous Machine Intelligence" (2022) and his 2023 Senate testimony, and the Senate Judiciary written testimony of Russell, Amodei and Marcus were refused.
    _Recommended:_ retrieve them in the archive-capable thread before admission. Chollet's essay matters most: Yudkowsky's reply to it is recorded and the essay itself is not.
11. **The LeCun–Bengio exchange.** The only recorded exchange between them is the 2019 Facebook thread, read in a compiler's copy of 4 October 2019 that states it fixed typos and formatting. Their exchanges of 2023–2024 are on X, in interviews and in the Munk Debate (no transcript located).
    _Recommended:_ admit the 2019 thread records dated by the copy, with the wording attested from it. Record later exchanges only from texts each published. Do not use reports.
12. **Reports of expert disagreement.** The International AI Safety Report (2025) and the FLI letters are recorded as bearing on, not articulating, R06 and R08.
    _Recommended:_ keep as context. They document what a body stated on a date, and the collection should show them, but they do not state the propositions.
13. **Signed statements.** The CAIS statement, the DAIR statement, the FLI letters, the Mozilla joint statement and Meta's statement of support are recorded as texts, with no stance attributed to any signatory.
    _Recommended:_ keep. Do not add signatory lists to the collection; if wanted, record them later as `lists_participants`, which records a list, not a view.
14. **Debates as `cites` claims.** The 22 replies are candidate `cites` claims, and the 17 debates are a grouping in the pack. The schema has no debate entity.
    _Recommended:_ admit the replies as `cites` claims with the reply qualification ("a reply is not agreement"). Show the debates as a reading list in the collection definition, rather than adding a schema type.
15. **Position labels.** The balance count calls a record "risk side" or "counter side" by its passage's direction on one proposition.
    _Recommended:_ keep the count in research files only. In the interface, show each record by its stance on the proposition (articulates, contests, bears on), never by "side", so that no author is placed in a camp.

## Next steps

1. Archive and retrieval pass (Codex): the captures in questions 6 and 10, and the LessWrong posts in question 9.
2. Cross-family check from the brief, on its own branch, blind first.
3. Adjudication of disagreements, then the maintainer's decisions recorded here under "Maintainer decisions".
4. Admission: a minor release (a new collection), on existing predicates and roles if questions 1 and 14 are answered as recommended, so that no schema change is needed.

## Maintainer decisions

None recorded yet.

## Maintainer decisions (2026-10-30)

All recommended answers to the open questions above (1–15) are adopted as written. Admission still waits for the cross-family check and its adjudication; where the check changes the basis of a recommendation, the admission task lists it for the maintainer instead of applying it.

## Adjudication of the cross-family check (maintainer, 2026-10-31)

The check (`research/risk-debate/cross-family-check-2026-10-29.md` on `codex/risk-debate-check`; all 50 blind classifications agree) is accepted. Apply at admission: earlier-located roles move only to dated texts (for example Joy, April 2000, on R07; Goertzel, May 2002, on R06; Corrigibility, January 2015, on R04), and leads whose historical date cannot be pinned (the 2016 migrated page on R03; CFAI's 2001 wording in a later reflow on R05) are listed, not admitted as headlines; Bostrom's wording as attested by 6 August 2003; Crawford (25 June 2016) as earliest located on R12; item 92 (Andreessen, R10b) and item 96 (Brooks, R01) become "bears on"; item 90 kept only with a qualifying whole-transition passage, otherwise context; the date displays of items 87, 95 and 100 corrected; the six proposed balance texts admitted where they meet their criteria (Violet Hour 2024, R03; Arctotherium 2026, R17; Corrigibility 2015, R10a and R10b; Hadshar 2023, R11; Encode Justice–FLI 2023, R12; Davidson 2023, R05, with its metric stated). No author is placed in a camp. Anything else needing judgement is held and listed.
