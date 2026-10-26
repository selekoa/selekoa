# Re-check of the data changes in the quick wins (#37), 2026-10-25

**Status: complete.** All 226 changed claims were checked. Report only: no dataset record was changed. Corrections below are proposals for a later PR after adjudication.

## Summary

| Group                                                              | Claims  | Agree   | Disagree | Cannot verify |
| ------------------------------------------------------------------ | ------- | ------- | -------- | ------------- |
| Yudkowsky collection (first half)                                  | 41      | 40      | 1        | 0             |
| Yudkowsky collection (second half)                                 | 41      | 39      | 2        | 0             |
| Economics collection                                               | 59      | 59      | 0        | 0             |
| Framework provision changes and commitment links                   | 47      | 47      | 0        | 0             |
| Corporate structure, absences, SB 53 links, evaluation, assessment | 38      | 36      | 2        | 0             |
| **Total**                                                          | **226** | **221** | **5**    | **0**         |

Scope: the only data change in #37 (commit f660a12), item 12b: 226 claims whose `qualification` (182) or `inferenceRationale` (44) had internal identifiers replaced with plain descriptions or dropped ([change log](reader-text-ids-2026-10-15.md)). No other field of any claim changed in #37, and no evidence, source or entity record changed (checked by diffing every record across the commit).

No rewrite misnames its referent, changes a date, stance or scope, or adds a priority word, motive or loaded word. No internal identifier of the targeted kinds is left in a rewritten field. All five disagreements are minor. Two miscount the post's own "Q6" label. Three drop or blur the only pointer a reader had to a related record.

## Method

- Blind first. For each claim, fresh-context machine agents (Claude) were given the text before the change and the changed spans. They resolved each identifier against the pre-change data (claims, evidence, sources and entities at f660a12^) and the research packs, and wrote what a faithful replacement should say. Only then did they read the text after the change and classify it. One agent (framework provision changes group) read the after-texts in one pass rather than in batches. Its blind replacements all followed two patterns: reword the provision-record pointer, or drop an ID the sentence already describes.
- Factual descriptions introduced by a rewrite were checked against the referenced record. Where a rewrite named a source detail, it was also checked against the source (the LessWrong post, the Extropians archive). No item needed web.archive.org.
- The comparing session re-read every disagreement and proposed correction against the records. It adjudicated one item differently from its agent (marked below).
- This is a machine check by the preparing model family. It is not a cross-family check and not editorial acceptance.

## Disagreements to adjudicate

1. **`yk-y08-lw-2022-miri-announces-new-death-with-dignity-c`** (qualification). Adjudicated as a disagreement by the comparing session (the agent had agree with a note). 'Q6' is the post's own label, not an internal code. The post labels questions in groups (Q1, Q2 twice, Q3 twice, Q4 six times, Q5 three times, Q6 six times); the April Fool's question is the first one labelled Q6 and the 15th asked, so 'the post's sixth question' miscounts it. Same defect as yk-y30-lw-2022-miri-announces-new-death-with-dignity-c. Proposed: Restore the post's own label: "The question labelled Q6 in the post addresses the April Fool's framing and …" (rest unchanged).
1. **`yk-y28-extropians-2000-09-29-yudkowsky-6073-b`** (qualification). The interval is right (12:50:28 to 13:43:19 -0400), but "another Extropians message" drops the only pointer to the correcting message, which is an admitted record; the reader cannot tell which message it is. Minor. Proposed: 53 minutes later, in his reply ‘Re: Eugene's nuclear threat’ (also recorded for ‘Build it before rivals do’, Y24), he partly corrected himself: good intentions are not enough.
1. **`yk-y30-lw-2022-miri-announces-new-death-with-dignity-c`** (qualification). "Q6" is the post's own heading label, not an internal ID. The post labels questions in groups (Q2 to Q6 each cover several questions), so the April Fool's question is the 15th question asked, and "the sixth question" miscounts it. Proposed: In the post, the question labelled Q6 asks whether it is "just an April Fool's joke"; ...
1. **`sb-link-openai-fgf`** (qualification). Minor scope loss: 'applying OpenAI’s Preparedness approach' drops 'relevant parts' and the 'OpenAI describes' attribution, so the pointer reads as if the whole approach is applied as a matter of record. Proposed: The existing record of OpenAI’s description of the FGF as applying relevant parts of its Preparedness approach covers the relation to the Preparedness Framework.
1. **`cs-anthropic-legal-form-2021`** (qualification). Dropping the ID removes the only pointer to where the changed wording is recorded; the referenced record is dated by the July 2025 certificate, which a reader would not find from 'May 2021' alone. Proposed: The public-benefit wording changed in the restated certificate of May 2021; the later wording is recorded with the certificate of July 2025.

## Problems found that the rewrite did not cause

These are outside the scope of #37 but sit in the same fields. Listed for a later task:

- `ec-m01-nourse-1955-automation-hearings-statement-b`: the first passage's note still says "see the M01 contests record, p. 619". The p. 619 passage is this record's own second passage, changed to bears-on on 2026-10-12, and Nourse has no M01 contesting record. Proposed: "(see the second passage, p. 619)".
- `ec-m09-agrawal-gans-goldfarb-2019-economics-of-ai-introduction-a`: reader-facing text still names an internal file ("1952–2015 in timeline.md"). Proposed: "the earlier documentary record, 1952–2015".
- Nine economics qualifications now read "(Second passage) Second passage of the same record as the first passage." The sentence carries no information. Proposed: drop it and keep the "(Second passage)" label, or say what the second passage adds.
- Five economics qualifications (`ec-g02-aghion-jones-jones-2017-ai-and-economic-growth-a`, `-c`, `ec-g02-davidson-2021-explosive-economic-growth-a`, `ec-g09-clancy-besiroglu-2023-great-inflection-a`, `ec-m01-nourse-1955-automation-hearings-statement-b`) now mix curly quotation marks into text that otherwise uses straight ones.
- `yk-y02-sl4-2000-11-13-yudkowsky-0011-0181-c`: the text calls the 2000-08-31 _Staring into the Singularity_ passage "the research pack's earlier-self passage". The pack records that passage as related, not as an earlier self, and the sibling claim says so. The wording predates #37 and still names the research pack.
- `yk-y05-extropians-1999-08-04-yudkowsky-1587-c`: "his Extropians message of 1999-08-04" for the near-identical repost reads as if it were the claim's own message. Proposed: "a second Extropians message of 1999-08-04".
- `cm-eu-code-intent-openai`, `-anthropic`, `-google`: "the listing is a separate record" no longer says which listing (the company's own entry on the Commission's signatory list). Proposed: name it.
- `absent-rsp-v3-0-pause-training` (inference rationale): says Appendix A of RSP v3.0 "commits to delay AI development and deployment in two competitor scenarios". The provision record for the strong-safety-measures scenario (`prov-rsp-v3-0-competitor-parity`) quotes a commitment to "meet or exceed the overall risk reduction posture of these competitors", not a delay. The wording predates #37 and needs its own check against the RSP v3.0 text (PDF p. 16).
- Audit codes in economics qualifications were reduced to auditor letters ("audit C", "audits A and C"), which readers still have no key for. The change log already lists this as not covered.

## Per-item findings

Each entry gives the claim, field, classification, finding, identifiers resolved, evidence and any proposed correction.

### Yudkowsky collection (first half)

- **1. `yk-y01-sl4-2000-09-17-yudkowsky-0009-0092-c`** (qualification): **agree**. Rewrite names the 2006-06-06 SL4 message; date and stance preserved.  
  Identifiers: `sl4 0606-15174` → SL4 message 'Re: [agi] Two draft papers: AI and existential risk; heuristics...' by Yudkowsky, 2006-06-06 (pack passages T01-s5/T08-s5).  
  Evidence: pack.json T01-s5 source sl4-0606-15174 dated 2006-06-06, relation answered-it, premise T01-P2
- **2. `yk-y01-extropians-1996-12-08-yudkowsky-3761-c`** (qualification): **agree**. Both referents are 1996-11-22 Extropians messages; plural rewrite is faithful.  
  Identifiers: `T02-e1` → Extropians 'Interim purpose', 1996-11-22; `T02-e2` → Extropians 'Re: Survival ethic (U-Prime)', 1996-11-22.  
  Evidence: pack.json T02-e1 quote 'The Powers will be ethical. I am more certain of that than I am of the sun rising tomorrow.'; T02-e2 'The Powers will be ethical. They'll deduce the Meaning of Life'
- **3. `yk-y01-extropians-1997-09-26-yudkowsky-4420-c`** (qualification): **agree**. All three referents correctly described; proposition name matches the entity record.  
  Identifiers: `T01-e1` → Extropians 'Re: Trans- vs. Non-human', 1996-12-08; `T06` → take 'Keep it in a box' = Selekoa proposition Y06 'Confinement without network access keeps it safe'; `1996-12-31 T06 passages` → Extropians 'Re: Goal-based AI' messages 5142 and 5159, 1996-12-31 (T06-a, T06-b).  
  Evidence: before-entities.json confinement-keeps-it-safe name 'Confinement without network access keeps it safe' (code Y06); T06-a/T06-b both 1996-12-31
- **4. `yk-y02-staring-into-the-singularity-b`** (qualification): **agree**. Both referents named correctly with their years.  
  Identifiers: `T02-d` → Coherent Extrapolated Volition (2004-05); `T02-e` → 'That Tiny Note of Discord' (2008-09-23).  
  Evidence: pack.json T02-d doc-cev 2004-05 retrospective; T02-e lw post 2008-09-23 'That Tiny Note of Discord'
- **5. `yk-y02-sl4-2000-11-13-yudkowsky-0011-0181-c`** (qualification): **agree**. Faithful to the before text, but the rewrite keeps the inherited label 'earlier-self passage' and the internal phrase 'research pack's'; the pack records T02-c as 'related', and the sibling claim (item 4) says 'recorded as related, not as an earlier self'. Pre-existing inconsistency, not introduced by the rewrite.  
  Identifiers: `T02-c` → Staring into the Singularity 1.2.1, capture of the 2000-08-31 version.  
  Evidence: pack.json T02-c relation 'related', roles earliest-located; yk-y02-staring-into-the-singularity-b qualification: 'recorded as related, not as an earlier self.'  
  Proposed: Rejects the view expressed in the 2000-08-31 version of Staring into the Singularity.
- **6. `yk-y02-extropians-1996-11-22-yudkowsky-3178-a`** (qualification): **agree**. All four referents and dates match the pack.  
  Identifiers: `T02-e3` → Extropians 'Re: IA vs. AI was: longevity vs singularity', 1999-08-01; `T02-s1` → SL4 'Re: Ben's "Extropian Creed"', 2000-11-13; `T02-e` → 'That Tiny Note of Discord', 2008; `extropians.4Q99-2680` → Extropians message of 1999-11-27 (Porter's challenge to 'my 1996 claim').  
  Evidence: pack.json searchNotes: '4Q99-2680 (1999-11-27, Porter's challenge to 'my 1996 claim'...)'
- **7. `yk-y02-extropians-1996-11-22-yudkowsky-3184-a`** (qualification): **agree**. Dates resolve correctly.  
  Identifiers: `T02-e3/T02-s1/T02-e` → as item 6; `extropians.3Q99-1386` → Extropians message of 1999-08-01 (same as T02-e3); `extropians.1Q00-4786` → Extropians message of 2000-03-13 ('it becomes possible to see the objectively correct moral decisions').  
  Evidence: pack.json searchNotes: '1Q00-4786 (2000-03-13, above some intelligence level 'it becomes possible to see the objectively correct moral decisions')'
- **8. `yk-y02-extropians-1999-08-01-yudkowsky-1386-c`** (qualification): **agree**. All replacements correct; P2 text shortened ('true morality' for 'true or universally compelling morality') without changing meaning; 'first/second premise' follows the pack's P1/P2 order and both were spelled out earlier in the sentence.  
  Identifiers: `T02-e1, T02-e2` → 1996-11-22 Extropians messages; `T02-c` → Staring into the Singularity (2000 capture); `P1 / P2` → T02-P1 'Greater intelligence by itself brings benevolent goals'; T02-P2 'A sufficiently intelligent mind would discover a true or universally compelling morality and be bound to act on it'; `T02-s1` → SL4 message 2000-11-13; `T02-e` → 'That Tiny Note of Discord' (2008); `extropians.3Q99-1451` → Extropians message of 1999-08-03.  
  Evidence: pack.json T02 premises T02-P1/T02-P2; searchNotes '3Q99-1451 (1999-08-03, 'When I thought AIs would be benevolent, I said so...')'
- **9. `yk-y03-lw-2008-ghosts-in-the-machine-b`** (qualification): **agree**. Dropping loses nothing; the post is named in the sentence.  
  Identifiers: `T03-c` → 'The Hidden Complexity of Wishes' (2007-11-24).  
  Evidence: pack.json T03-c lw-4ARaTpNX62uaL86j6 'The Hidden Complexity of Wishes'
- **10. `yk-y04-sl4-2003-05-29-yudkowsky-0305-6846-c`** (qualification): **agree**. Correct referent and year.  
  Identifiers: `T04-b` → Coherent Extrapolated Volition (2004-05).  
  Evidence: pack.json T04-b doc-cev 2004-05 answered-it
- **11. `yk-y04-extropians-1998-12-06-yudkowsky-2153-c`** (qualification): **agree**. Pack take code replaced with the proposition's reader name and public code Y02.  
  Identifiers: `T02` → take 'Anything smart enough will figure out ethics and be good' = proposition Y02 'Sufficient intelligence brings good values'.  
  Evidence: before-entities.json intelligence-brings-benevolence: 'Sufficient intelligence brings good values' (code Y02)
- **12. `yk-y04-extropians-2000-03-14-yudkowsky-4837-b`** (qualification): **agree**. Referents and dates correct; premise spelled out in full.  
  Identifiers: `T04-s1` → SL4 'Re: Ben what are your views and concerns', 2000-10-03; `T04-d` → 'Magical Categories' (2008-08-24); `T04-P1` → premise 'A short instruction such as make people happy specifies what we want'.  
  Evidence: pack.json T04-s1 sl4-0010-0125 2000-10-03; T04-d lw-PoDAyQMWEXBBBEJ5P 'Magical Categories' 2008-08-24
- **13. `yk-y05-sl4-2005-08-09-yudkowsky-0508-11866-b`** (qualification): **agree**. Correct referent and year.  
  Identifiers: `T05-c` → 'Thou Art Godshatter' (2007-11-13).  
  Evidence: pack.json T05-c lw-cSXZpvqpa9vbGGLtG 'Thou Art Godshatter' 2007-11-13
- **14. `yk-y05-extropians-1999-08-04-yudkowsky-1587-c`** (qualification): **agree**. Faithful, but 'his Extropians message of 1999-08-04' is the same description a reader would give the claim's own message; 'another' or 'a second' would avoid apparent self-reference. Not misleading given 'copy posted seconds apart'.  
  Identifiers: `extropians.3Q99-1589` → Extropians archive message 1589 (3Q99), a near-identical repost of message 1587 posted seconds later, 1999-08-04.  
  Evidence: pack.json T05-e1 qualification: 'A near-identical copy was posted seconds apart (extropians.3Q99-1589, 'isn't going to exist').'  
  Proposed: A near-identical copy was posted seconds apart (a second Extropians message of 1999-08-04, 'isn't going to exist').
- **15. `yk-y05-extropians-1999-08-01-yudkowsky-1386-b`** (qualification): **agree**. Correct referent and date.  
  Identifiers: `T05-s1` → SL4 'Re: Ben what are your views and concerns', 2000-10-03.  
  Evidence: pack.json T05-s1 sl4-0010-0125 2000-10-03
- **16. `yk-y06-ai-box-experiment-page-c`** (qualification): **agree**. Dropping loses nothing; list and date remain and an entity record for the message exists.  
  Identifiers: `sl4-2002-3132` → SL4 message 'The "AI Box" experiment', 2002-03-08 (entity sl4-2002-03-08-yudkowsky).  
  Evidence: pack.json searchNotes: 'sl4-2002-3132 (8 March 2002) proposes the first AI-box test and explains its secrecy rule'
- **17. `yk-y08-lw-2022-miri-announces-new-death-with-dignity-c`** (qualification): **disagree**. Adjudicated as a disagreement by the comparing session (the agent had agree with a note). 'Q6' is the post's own label, not an internal code. The post labels questions in groups (Q1, Q2 twice, Q3 twice, Q4 six times, Q5 three times, Q6 six times); the April Fool's question is the first one labelled Q6 and the 15th asked, so 'the post's sixth question' miscounts it. Same defect as yk-y30-lw-2022-miri-announces-new-death-with-dignity-c.  
  Identifiers: `Q6` → the post's own label 'Q6' for its question-and-answer block on the April Fool's framing (several follow-ups are also labelled Q6).  
  Evidence: https://www.lesswrong.com/posts/j9Q8bRmwCgXRYAgcJ, retrieved 2026-10-25: question labels in order Q1, Q2, Q2, Q3, Q3, Q4 (six), Q5 (three), then "Q6: Hey, this was posted on April 1st."  
  Proposed: Restore the post's own label: "The question labelled Q6 in the post addresses the April Fool's framing and …" (rest unchanged).
- **18. `yk-y08-sl4-2000-07-09-yudkowsky-0007-0017-b`** (qualification): **agree**. Correct referent and date in both places.  
  Identifiers: `T08-s5 / sl4:0606-15174 / sl4 0606-15174` → SL4 'Re: [agi] Two draft papers: AI and existential risk; heuristics and biases', 2006-06-06.  
  Evidence: pack.json T08-s5 source sl4-0606-15174 2006-06-06 answered-it strongest P2
- **19. `yk-y08-sl4-2006-06-06-yudkowsky-0606-15174-c`** (qualification): **agree**. Correct referent and date.  
  Identifiers: `T08-s1` → SL4 'Re: [SL4] Programmed morality', 2000-07-09.  
  Evidence: pack.json T08-s1 sl4-0007-0017 2000-07-09 related earliest-located P2
- **20. `yk-y08-sl4-2005-07-13-yudkowsky-0507-11477-c`** (qualification): **agree**. The premise is stated at the start of the same text, so 'the premise' is unambiguous.  
  Identifiers: `T08-P3` → premise 'Once a warning sign is seen, it will lead to effective action'.  
  Evidence: pack.json T08-P3 'Once a warning sign is seen, it will lead to effective action.'
- **21. `yk-y10-extropians-1996-11-13-yudkowsky-2941-c`** (qualification): **agree**. Correct referent; 'three days later' consistent with 1996-11-13 -> 1996-11-16.  
  Identifiers: `T10-e2` → Extropians 'Re: extropians-digest V1 #110', 1996-11-16 (reply to Robin Hanson).  
  Evidence: pack.json T10-e2 ext-extropians.96-3042 1996-11-16 answered-it
- **22. `yk-y10-extropians-1996-11-16-yudkowsky-3042-c`** (qualification): **agree**. Both occurrences replaced with the correct date.  
  Identifiers: `T10-e3 / extropians.3Q98-2487 / Extropians 3Q98-2487` → Extropians 'Re: Singularity: The Moore's Law Argument', 1998-09-18.  
  Evidence: pack.json T10-e3 ext-extropians.3Q98-2487 1998-09-18 later-restatement
- **23. `yk-y10-extropians-1998-09-18-yudkowsky-2487-c`** (qualification): **agree**. Faithful; the before text identified it only as 'the Staring passage' too, and the statement names the 'Recursive Moore's Law' section.  
  Identifiers: `T10-a` → Staring into the Singularity 1.2.1 (2000 capture), section 2 passage on the hyperbolic doubling sequence ('If some of the researchers and engineers are themselves computers...').  
  Evidence: pack.json T10-a locator: '§2 'The Beyondness of the Singularity', paragraph beginning 'That doubling sequence is actually a pessimistic projection''
- **24. `yk-y11-sl4-2000-10-03-yudkowsky-0010-0125-c`** (qualification): **agree**. Correct referents and dates; 'CFAI' was already in the before text.  
  Identifiers: `T11-a` → Creating Friendly AI 1.0 passage (2001-06-15); `T11-s2` → SL4 'Re: Event horizon', 2001-01-24.  
  Evidence: pack.json T11-a doc-cfai 2001-06-15; T11-s2 sl4-0101-0452 2001-01-24
- **25. `yk-y11-sl4-2001-01-24-yudkowsky-0101-0452-c`** (qualification): **agree**. Dropping loses nothing.  
  Identifiers: `T11-P2` → premise 'Slightly weaker predecessor systems will give us time and experience to adjust'.  
  Evidence: pack.json T11-P2
- **26. `yk-y11-sl4-2000-07-09-yudkowsky-0007-0017-b`** (qualification): **agree**. All four referents and dates correct.  
  Identifiers: `sl4:0103-0788` → SL4 message of 2001-03-24 ('that was my working model from 1996 to 2000. During 2000 I started switching...'); `T11-s4` → SL4 'Re: Conservative Estimation of the Economic Impact of Artificial Intelligence', 2004-12-29; `T11-d` → 'Yudkowsky and Christiano discuss "Takeoff Speeds"' (2021-11-22); `T11-e` → 'AGI Ruin: A List of Lethalities' (2022-06-05).  
  Evidence: pack.json searchNotes: "0103-0788 (2001-03-24), 'that was my working model from 1996 to 2000. During 2000 I started switching from \"objective morality\" to \"Friendly AI\"'"
- **27. `yk-y11-sl4-2004-12-29-yudkowsky-0412-10488-c`** (qualification): **agree**. Correct referents; proposition name matches entity.  
  Identifiers: `T11` → take = proposition Y11 'A slow takeoff will leave time to adjust'; `T11-s2` → SL4 'Re: Event horizon', 2001-01-24; `T11-b` → 'Hard Takeoff' (2008-12-02).  
  Evidence: pack.json T11-b lw-tjH8XPxAnr6JRbh7k 'Hard Takeoff' 2008-12-02
- **28. `yk-y11-extropians-1998-09-08-yudkowsky-2235-c`** (qualification): **agree**. Codes dropped; glosses already present.  
  Identifiers: `P1` → T11-P1 'Capability gains will be gradual and visible'; `P2` → T11-P2 time-to-adjust premise.  
  Evidence: pack.json T11-P1/T11-P2
- **29. `yk-y13-sl4-2000-11-18-yudkowsky-0011-0240-b`** (qualification): **agree**. All referents correct.  
  Identifiers: `T13-a` → 'Artificial Intelligence as a Positive and Negative Factor in Global Risk' (2008); `T13-P1` → premise 'We can know that AGI is decades away'; `T14` → proposition Y14 'Problems can be fixed as they arise'.  
  Evidence: pack.json T13-a doc-aipnf 2008 answered-it P2; before-entities.json fix-problems-as-they-arise (code Y14)
- **30. `yk-y14-sl4-2000-09-17-yudkowsky-0009-0092-c`** (qualification): **agree**. Correct referents and dates. 'CFAI' stays unexpanded (as in the before text); the entity short name is 'Creating Friendly AI (2001)'.  
  Identifiers: `T14-a` → Creating Friendly AI 1.0 design-assumption passage (2001-06-15), relation related; `T14-c` → TIME article 'Pausing AI Developments Isn't Enough. We Need to Shut it All Down' (2023-03-29).  
  Evidence: pack.json T14-c doc-time-2023 2023-03-29; before-entities.json creating-friendly-ai-2001
- **31. `yk-y14-sl4-2005-07-25-yudkowsky-0507-11765-b`** (qualification): **agree**. Premise is stated at the head of the same text.  
  Identifiers: `T14-P1` → premise 'We get to learn from failures with powerful AI and try again, as with other technologies'.  
  Evidence: pack.json T14-P1
- **32. `yk-y14-extropians-2000-09-05-yudkowsky-4277-c`** (qualification): **agree**. Correct proposition name and code.  
  Identifiers: `T01` → proposition Y01 'Switching it off if it becomes dangerous'.  
  Evidence: before-entities.json switch-off-if-dangerous (code Y01)
- **33. `yk-y15-sl4-2001-02-25-yudkowsky-0102-0594-c`** (qualification): **agree**. Correct referent and date.  
  Identifiers: `T15-a` → 'The Rhythm of Disagreement' (2008-06-01).  
  Evidence: pack.json T15-a 2008-06-01 answered-it
- **34. `yk-y15-extropians-1998-09-15-yudkowsky-2411-c`** (qualification): **agree**. Correct referents.  
  Identifiers: `T02` → proposition Y02 'Sufficient intelligence brings good values'; `T15-b` → 'Dreams of Friendliness' (2008-08-31).  
  Evidence: pack.json T15-b 'Dreams of Friendliness' 2008-08-31
- **35. `yk-y15-extropians-1999-04-08-yudkowsky-0310-c`** (qualification): **agree**. Codes dropped without loss.  
  Identifiers: `P1` → T15-P1 capable-without-goals premise; `P2` → T15-P2 'A system that only outputs answers or plans ... is safe'.  
  Evidence: pack.json T15-P1/T15-P2
- **36. `yk-y16-sl4-2000-10-03-yudkowsky-0010-0125-c`** (qualification): **agree**. Correct referents. Years of the two later texts are not given, which would help readers judge 'later', but nothing substantive is lost.  
  Identifiers: `T16-a` → 'AGI Ruin: A List of Lethalities' (2022-06-05); `T16-d` → 'Value is Fragile' (2009-01-29); `T16-b` → Coherent Extrapolated Volition (2004-05).  
  Evidence: pack.json T16-a lw-uMQ3cqWDPHhjtiesc 2022-06-05; T16-d lw-GNnHHmm8EzePmKzPk 2009-01-29; T16-b doc-cev 2004-05
- **37. `yk-y16-sl4-2002-06-27-yudkowsky-0206-4453-c`** (qualification): **agree**. Correct referents.  
  Identifiers: `T16-P2` → premise 'Present-day or programmers' values are settled enough to fix permanently in an AI'; `T16-s1` → SL4 'Re: Ben what are your views and concerns', 2000-10-03; `the take` → proposition Y16 'Giving it good human values'.  
  Evidence: pack.json T16-s1 sl4-0010-0125 2000-10-03
- **38. `yk-y16-sl4-2000-11-18-yudkowsky-0011-0240-c`** (qualification): **agree**. Correct date.  
  Identifiers: `sl4:0103-0788` → SL4 message of 2001-03-24 ('that was my working model from 1996 to 2000...').  
  Evidence: pack.json searchNotes: "0103-0788 (2001-03-24), 'that was my working model from 1996 to 2000.'"
- **39. `yk-y16-extropians-1996-12-08-yudkowsky-3761-c`** (qualification): **agree**. All four referents correct; CEV given without year but entity is unambiguous.  
  Identifiers: `T02` → proposition Y02; `T20` → proposition Y20 'AI risk as film science fiction' (take 'AI risk is just Terminator sci-fi'; premise about robots that hate or rebel); `T16-s1` → SL4 message 2000-10-03; `T16-b` → Coherent Extrapolated Volition (2004).  
  Evidence: pack.json T20-P1 'The concern is about robots that come to hate or rebel against humans.'
- **40. `yk-y17-creating-friendly-ai-2001-c`** (qualification): **agree**. Correct referents and dates.  
  Identifiers: `T17-b` → TIME article 'Pausing AI Developments Isn't Enough. We Need to Shut it All Down' (2023-03-29); `T17-e` → 'Only Law Can Prevent Extinction' (2026-04-13).  
  Evidence: pack.json T17-b doc-time-2023 2023-03-29 related P3; T17-e 2026-04-13 answered-it later-restatement P2
- **41. `yk-y17-sl4-2001-04-06-yudkowsky-0104-0956-c`** (qualification): **agree**. Correct referents and dates.  
  Identifiers: `T17-c` → Creating Friendly AI 1.0 passage (2001-06-15); `T17-b` → TIME article (2023-03-29).  
  Evidence: pack.json T17-c doc-cfai 2001-06-15 answered-it P2

### Yudkowsky collection (second half)

- **1. `yk-y17-extropians-1998-12-06-yudkowsky-2153-c`** (qualification): **agree**. All three referents named correctly with correct years; no qualification lost.  
  Identifiers: `T22` → take Y22 (entity build-superintelligence-fast, "Build superintelligence as fast as possible"); `T17-b` → TIME 2023 "Pausing AI Developments Isn't Enough. We Need to Shut it All Down" (doc-time-2023), moratorium passage; `T17-f` → "Only Law Can Prevent Extinction" (LessWrong, 2026-04-13).  
  Evidence: research/yudkowsky-arguments/pack.json T17-f source lw-5CfBDiQNg9upfipWk "Only Law Can Prevent Extinction" 2026-04-13; T17-b source doc-time-2023 2023-03-29
- **2. `yk-y17-extropians-1999-10-21-yudkowsky-1086-c`** (qualification): **agree**. T17-e and T17-f are both passages of the same 2026 post, so collapsing them into one title is faithful.  
  Identifiers: `T22` → take Y22 (build-superintelligence-fast); `T17-b` → TIME 2023 article; `T17-e` → "Only Law Can Prevent Extinction" 2026 ("effective everywhere"); `T17-f` → "Only Law Can Prevent Extinction" 2026.  
  Evidence: research/yudkowsky-arguments/pack.json T17-e quote "If an ASI ban is to accomplish anything at all, it has to be effective everywhere." source lw-5CfBDiQNg9upfipWk
- **3. `yk-y18-lw-2024-the-sun-is-big-but-superintelligences-c`** (qualification): **agree**. "the section ii passage" correctly identifies T18-b, whose qualification holds the crosspost note.  
  Identifiers: `T18-b` → first passage of this claim: section ii, paragraph beginning "What it all adds up to" (evidence-yk-t18-b, first of evidenceIds).  
  Evidence: research/yudkowsky-arguments/pack.json T18-b locator "section ii, paragraph beginning 'What it all adds up to'"; qualification "The LessWrong post says it was 'Crossposted from Twitter with Eliezer's permission'"
- **4. `yk-y18-sl4-2000-10-03-yudkowsky-0010-0125-c`** (qualification): **agree**. Names the correct 2024 post and year; the specific section is not needed for an ordering note.  
  Identifiers: `T18-d` → "The Sun is big, but superintelligences will not spare Earth a little sunlight" (2024-09-23), section i comparative-advantage passage.  
  Evidence: research/yudkowsky-arguments/pack.json T18-d locator "section i, paragraph beginning 'Comparative Advantage doesn't imply'", source lw-F8sfrbPjCQj4KwJqn 2024-09-23
- **5. `yk-y18-sl4-2002-06-23-yudkowsky-0206-4208-c`** (qualification): **agree**. Correct proposition label and code.  
  Identifiers: `T19` → take Y19 (harm-requires-hostility, "Without hatred it will not harm us"); `T19-s1` → same SL4 passage reused for Y19 (sl4-0206-4208).  
  Evidence: research/yudkowsky-arguments/pack.json T19-s1 source sl4-0206-4208, same quote as T18-s2
- **6. `yk-y18-sl4-2006-06-13-yudkowsky-0606-15271-c`** (qualification): **agree**. Correct referent and year.  
  Identifiers: `T18-d` → "The Sun is big..." 2024 comparative-advantage passage.  
  Evidence: research/yudkowsky-arguments/pack.json T18-d quote "Comparative Advantage doesn't imply that Earth can produce more with $77 of sunlight..."
- **7. `yk-y18-extropians-1996-11-22-yudkowsky-3178-b`** (qualification): **agree**. Every referent resolved correctly, including T18-c as the opening paragraph; the premise paraphrase abridges T18-P1 slightly in the first occurrence but stays accurate.  
  Identifiers: `T02` → take Y02 (intelligence-brings-benevolence, "Sufficient intelligence brings good values"); `T18` → take Y18 (earth-not-worth-taking, "A superintelligence would leave Earth alone"); `P1 / T18-P1` → premise T18-P1 "A superintelligence would leave us a small share, because sparing Earth would cost it very little."; `ext:extropians.3Q98-2171` → Extropians "Singularity, Breaker of Dreams" 1998-09-07 (ext-extropians.3Q98-2171); `T19-e1` → passage of that message used for Y19; `T18-e1` → Extropians "Re: SI Comparative Advantage [was Re: Free Will]" 1999-08-25; `T18-c` → "The Sun is big..." 2024, opening paragraph (Arnault rejoinder).  
  Evidence: research/yudkowsky-arguments/pack.json T18-c locator "Opening paragraph (current and posting-day versions)"; T18-e1 source ext-extropians.3Q99-2783 1999-08-25
- **8. `yk-y19-time-2023-shut-it-all-down-c`** (qualification): **agree**. Correct document; the 2008 date is kept as in the before text (the admitted record is dated by the 2006 draft, but the before text said 2008, so no change).  
  Identifiers: `T19-b` → AIPNF passage "The AI does not hate you, nor does it love you..." (doc-aipnf, chapter published 2008).  
  Evidence: research/yudkowsky-arguments/pack.json T19-b qualification "Chapter published 2008; cached text is the MIRI reprint"
- **9. `yk-y19-sl4-2002-06-23-yudkowsky-0206-4208-c`** (qualification): **agree**. Both referents correct.  
  Identifiers: `T18-s2` → same SL4 passage used for Y18; `T19-b` → AIPNF (2008).  
  Evidence: research/yudkowsky-arguments/pack.json T18-s2 source sl4-0206-4208
- **10. `yk-y19-sl4-2005-07-13-yudkowsky-0507-11483-c`** (qualification): **agree**. Both referents and dates correct.  
  Identifiers: `T19-b` → AIPNF (2008); `T19-s1` → SL4 "Re: Threats to the Singularity." 2002-06-23.  
  Evidence: research/yudkowsky-arguments/pack.json T19-s1 source sl4-0206-4208 2002-06-23
- **11. `yk-y19-extropians-1998-09-07-yudkowsky-2171-c`** (qualification): **agree**. Both referents and dates correct.  
  Identifiers: `T19-e2` → Extropians "Interim purpose" 1996-11-22 (ext-extropians.96-3178), Powers-ethical passage; `T19-b` → AIPNF (doc-aipnf, 2008).  
  Evidence: research/yudkowsky-arguments/pack.json T19-e2 source ext-extropians.96-3178 "Interim purpose" 1996-11-22
- **12. `yk-y19-extropians-1996-11-22-yudkowsky-3178-b`** (qualification): **agree**. All referents correct; dropping "T19-e1" loses nothing because the message itself is named.  
  Identifiers: `T02` → take Y02 "Sufficient intelligence brings good values"; `ext:extropians.3Q98-2171` → Extropians "Singularity, Breaker of Dreams" 1998-09-07; `T19-e1` → passage of that message for Y19; `T19-s1` → SL4 "Re: Threats to the Singularity." 2002-06-23; `T19-b` → AIPNF 2008.  
  Evidence: research/yudkowsky-arguments/pack.json T19-e1 source ext-extropians.3Q98-2171 1998-09-07
- **13. `yk-y20-sl4-2001-04-19-yudkowsky-0104-1166-c`** (qualification): **agree**. Date and "previous day" are correct. Because the 2001-04-18 message is not an admitted record, the bare date is the only pointer; a short description would help but the before text gave none either.  
  Identifiers: `T20-s1` → SL4 message of 2001-04-18 announcing the CFAI open-commentary version, heading "Anthropomorphic political rebellion is just plain silly"; removed from the pack before audit (not an admitted record).  
  Evidence: research/yudkowsky-arguments/pack.json T20 searchNotes: "Found disagrees 2001-04-18 (s1: CFAI open-commentary heading 'Anthropomorphic political rebellion is just plain silly')"
- **14. `yk-y20-extropians-1999-08-04-yudkowsky-1591-c`** (qualification): **agree**. Referents and years correct.  
  Identifiers: `T02` → take Y02; `T20-c` → Staring into the Singularity 1.2.1 (doc-sits-2000-capture, 2000-08-31) "selfishness and resentment do not spontaneously appear"; `T20-a` → "The Logical Fallacy of Generalization from Fictional Evidence" 2007-10-16.  
  Evidence: research/yudkowsky-arguments/pack.json T20-a source lw-rHBdcHGLJ7KvLJQPk 2007-10-16; T20-c source doc-sits-2000-capture
- **15. `yk-y20-extropians-1997-09-25-yudkowsky-4400-b`** (qualification): **agree**. All correct.  
  Identifiers: `ext:extropians.3Q98-2171` → "Singularity, Breaker of Dreams" 1998-09-07; `T20-e1` → Extropians "Re: Does a parental model work..." 1999-08-04 (3Q99-1591); `T20-s2` → SL4 "Re: FW: Group releases \"Friendly AI\"" 2001-04-19.  
  Evidence: research/yudkowsky-arguments/pack.json T20-e1 source ext-extropians.3Q99-1591 1999-08-04; T20-s2 source sl4-0104-1166 2001-04-19
- **16. `yk-y21-extropians-1999-08-04-yudkowsky-1589-c`** (qualification): **agree**. Referents correct. "Second" is accurate: the archive Date headers put 1589 at 18:47:55 and 1587 at 18:48:10 -0500. The duplicate is also the admitted Y05 record, which could be named as a pointer, but nothing substantive is lost.  
  Identifiers: `T21-s1` → SL4 "Re: Novamente goal system" 2002-03-09 (sl4-0203-3148), socialisation passage; `extropians.3Q99-1587 / Extropians 3Q99-1587` → near-duplicate Extropians reply of 1999-08-04, also admitted as T05-e1 (claim yk-y05-extropians-1999-08-04-yudkowsky-1587-c).  
  Evidence: http://extropians.weidai.com/extropians.3Q99/1589.html Date "Wed, 04 Aug 1999 18:47:55 -0500"; .../1587.html "Wed, 04 Aug 1999 18:48:10 -0500"
- **17. `yk-y22-staring-into-the-singularity-a`** (qualification): **agree**. All four referents correct and in passage order.  
  Identifiers: `T22-c` → "The Magnitude of His Own Folly" 2008-09-30; `T22-a` → first passage of this claim: SITS 1.2.1 §5 passage (evidence-yk-t22-a, first evidenceId); `T22-b` → "Fighting a Rearguard Action Against the Truth" 2008-09-24; `T22-s2` → SL4 "Re: Floppy take-off" 2001-08-01.  
  Evidence: research/yudkowsky-arguments/pack.json T22-a locator "§5 'The Interim Meaning of Life', closing paragraph"; T22-s2 source sl4-0108-2031
- **18. `yk-y22-lw-2008-fighting-a-rearguard-action-against-the-b`** (qualification): **agree**. Code dropped; title remains.  
  Identifiers: `T22-c` → "The Magnitude of His Own Folly" 2008-09-30.  
  Evidence: research/yudkowsky-arguments/pack.json T22-c source lw-fLRPeXihRaiRo5dyX
- **19. `yk-y22-sl4-2000-11-13-yudkowsky-0011-0181-c`** (qualification): **agree**. Correct referent and date.  
  Identifiers: `T22-a` → SITS 1.2.1 earlier-self passage (doc-sits-2000-capture, 2000-08-31).  
  Evidence: research/yudkowsky-arguments/pack.json T22-a relation earlier-self, source doc-sits-2000-capture date 2000-08-31
- **20. `yk-y22-sl4-2001-08-01-yudkowsky-0108-2031-c`** (qualification): **agree**. Correct.  
  Identifiers: `T22-a` → SITS 1.2.1 earlier-self passage.  
  Evidence: research/yudkowsky-arguments/pack.json T22-a relation earlier-self
- **21. `yk-y22-extropians-1996-11-22-yudkowsky-3178-a`** (qualification): **agree**. Both correct.  
  Identifiers: `T22-b` → "Fighting a Rearguard Action Against the Truth" 2008-09-24; `T22-s2` → SL4 "Re: Floppy take-off" 2001-08-01.  
  Evidence: research/yudkowsky-arguments/pack.json T22-b quote "Eliezer1996-2000's strategies..."; T22-s2 source sl4-0108-2031
- **22. `yk-y24-ai-positive-negative-factor-global-risk-b`** (qualification): **agree**. Correct referent; year already in sentence.  
  Identifiers: `T24-a` → TIME 2023 "Pausing AI Developments Isn't Enough..." arms-race sentence (doc-time-2023).  
  Evidence: research/yudkowsky-arguments/pack.json T24-a quote "anyone talking of arms races is a fool"
- **23. `yk-y24-sl4-2002-03-10-yudkowsky-0203-3160-b`** (qualification): **agree**. Correct.  
  Identifiers: `T24-a` → TIME 2023 "Pausing AI Developments Isn't Enough..." arms-race sentence (doc-time-2023).  
  Evidence: research/yudkowsky-arguments/pack.json T24-a source doc-time-2023 2023-03-29
- **24. `yk-y24-sl4-2002-05-03-yudkowsky-0205-3551-a`** (qualification): **agree**. Correct.  
  Identifiers: `T24-a` → TIME 2023 "Pausing AI Developments Isn't Enough..." arms-race sentence (doc-time-2023).  
  Evidence: research/yudkowsky-arguments/pack.json T24-a source doc-time-2023 2023-03-29
- **25. `yk-y24-sl4-2007-11-24-yudkowsky-0711-17248-c`** (qualification): **agree**. Dropping loses nothing: the cross-reference pointed to a removed pack passage of the same message.  
  Identifiers: `T28-s3` → passage from this same message (sl4-0711-17248) paraphrasing the rejected rationale; removed from the pack before audit, so no admitted record.  
  Evidence: research/yudkowsky-arguments/pack.json T28 searchNotes: "Removed before audit: T28-s3 (his paraphrase of a rejected position; the message is too short to quote it within the 10% cap alongside T24-s4)"
- **26. `yk-y24-extropians-2000-09-29-yudkowsky-6080-a`** (qualification): **agree**. All correct.  
  Identifiers: `T24-s4` → SL4 "Re: UCaRtMaAI paper" 2007-11-24; `T24-a` → TIME 2023 "Pausing AI Developments Isn't Enough..." arms-race sentence (doc-time-2023); `T24-s2` → SL4 "Webmind Inc. as social process" 2002-03-10.  
  Evidence: research/yudkowsky-arguments/pack.json T24-s4 source sl4-0711-17248; T24-s2 source sl4-0203-3160
- **27. `yk-y25-sl4-2000-07-20-yudkowsky-0007-0023-a`** (qualification): **agree**. Correct; the item number matches the passage locator.  
  Identifiers: `P1` → premise T25-P1 "We can see what an AI system is thinking."; `T25-b` → "AGI Ruin: A List of Lethalities" 2022-06-05, Section B.3 item 25.  
  Evidence: research/yudkowsky-arguments/pack.json T25-b locator "AGI Ruin: A List of Lethalities, Section B.3, item 25"
- **28. `yk-y26-ai-positive-negative-factor-global-risk-c`** (qualification): **agree**. Referent is right, but "the section 10 passage above" is slightly ambiguous because the second passage is also in section 10; "above" disambiguates it.  
  Identifiers: `T26-a` → first passage of this claim (AIPNF section 10, paragraph beginning "We suppose there comes into existence an extremely fast mind"; evidence-yk-t26-a, first evidenceId).  
  Evidence: research/yudkowsky-arguments/pack.json T26-a locator "section 10 'Threats and Promises', paragraph beginning 'We suppose...'"; T26-b locator "section 10 'Threats and Promises', numbered pathway, step 3"  
  Proposed: Same reprint as the first passage above.
- **29. `yk-y26-extropians-1996-12-31-yudkowsky-5142-c`** (qualification): **agree**. Correct; the source id is this claim's own message, so dropping it loses nothing.  
  Identifiers: `T06-a` → same passage used for Y06 "Confinement without network access keeps it safe"; `doc-ext-1996-5142` → source record of this message (pack id ext-extropians.96-5142, "Re: Goal-based AI", 1996-12-31).  
  Evidence: research/yudkowsky-arguments/pack.json T06-a source ext-extropians.96-5142, quote identical to T26-e1
- **30. `yk-y26-extropians-1997-09-26-yudkowsky-4420-b`** (qualification): **agree**. Both correct; the date keeps a pointer to the unadmitted 1999 message.  
  Identifiers: `T26-e3` → Extropians "Re: Why would AI want to be friendly?..." 2000-09-05; `extropians.2Q99-4068` → Extropians message of 1999-06-17 (AI sending a DNA sequence to a sequencer and synthesizer); seen, not admitted.  
  Evidence: research/yudkowsky-arguments/pack.json T26 searchNotes: "1999-06-17 (extropians.2Q99-4068, AI sending a DNA sequence to a sequencer and synthesizer)"
- **31. `yk-y26-extropians-2000-09-05-yudkowsky-4292-c`** (qualification): **agree**. Correct referent; 09-05 to 09-16 is eleven days.  
  Identifiers: `T26-s1` → SL4 "Re:" 2000-09-16 (sl4-0009-0086), escape through surrounding humans.  
  Evidence: research/yudkowsky-arguments/pack.json T26-s1 source sl4-0009-0086 2000-09-16
- **32. `yk-y28-creating-friendly-ai-2001-a`** (qualification): **agree**. Correct; the before text gave no date for T28-c and the after adds none.  
  Identifiers: `T28-e` → "Above-Average AI Scientists" 2008-09-28; `T28-c` → "Six Dimensions of Operational Adequacy in AGI Projects" (written Nov 2017, posted 2022-05-30).  
  Evidence: research/yudkowsky-arguments/pack.json T28-c qualification "lightly edited copy of a document written in November 2017; posted 2022-05-30"
- **33. `yk-y28-sl4-2001-08-01-yudkowsky-0108-2031-c`** (qualification): **agree**. Correct; the CFAI abbreviation is expanded to the title.  
  Identifiers: `T28-d` → Creating Friendly AI sentence "the most advanced projects will have the brightest AI researchers" (doc-cfai, 2001-06-15).  
  Evidence: research/yudkowsky-arguments/pack.json T28-d source doc-cfai 2001-06-15
- **34. `yk-y28-sl4-2006-02-15-yudkowsky-0602-14096-c`** (qualification): **agree**. Correct.  
  Identifiers: `T28-b` → AIPNF section 14 passage "At the time of this writing in 2006" (doc-aipnf, 2008).  
  Evidence: research/yudkowsky-arguments/pack.json T28-b locator "Section 14 Making Progress on Friendly AI, paragraph beginning 'At the time of this writing in 2006'"
- **35. `yk-y28-extropians-2000-09-29-yudkowsky-6073-b`** (qualification): **disagree**. The interval is right (12:50:28 to 13:43:19 -0400), but "another Extropians message" drops the only pointer to the correcting message, which is an admitted record; the reader cannot tell which message it is. Minor.  
  Identifiers: `extropians.3Q00-6080` → Extropians "Re: Eugene's nuclear threat" 2000-09-29 13:43 -0400, his own correction; admitted as T24-e2 (claim yk-y24-extropians-2000-09-29-yudkowsky-6080-a).  
  Evidence: http://extropians.weidai.com/extropians.3Q00/6073.html "Fri, 29 Sep 2000 12:50:28 -0400"; .../6080.html "Re: Eugene's nuclear threat" "Fri, 29 Sep 2000 13:43:19 -0400"  
  Proposed: 53 minutes later, in his reply ‘Re: Eugene's nuclear threat’ (also recorded for ‘Build it before rivals do’, Y24), he partly corrected himself: good intentions are not enough.
- **36. `yk-y29-extropians-2000-03-16-yudkowsky-5105-c`** (qualification): **agree**. Correct.  
  Identifiers: `T29-s1` → SL4 "Re: Beyond evolution" 2001-02-04.  
  Evidence: research/yudkowsky-arguments/pack.json T29-s1 source sl4-0102-0539 2001-02-04
- **37. `yk-y30-staring-into-the-singularity-b`** (qualification): **agree**. Correct; the AIPNF abbreviation is expanded.  
  Identifiers: `T30-c` → "That Tiny Note of Discord" 2008-09-23; `T30-d / AIPNF` → AIPNF section 3 passage.  
  Evidence: research/yudkowsky-arguments/pack.json T30-d locator "Section 3, paragraph beginning 'Not knowing how to build a friendly AI'"
- **38. `yk-y30-ai-positive-negative-factor-global-risk-c`** (qualification): **agree**. Referents and years correct. The lumping of a 2008 retrospective under "his own superseded view" is inherited from the before text, not introduced.  
  Identifiers: `T30-b` → Staring into the Singularity 1.2.1 (2000 capture); `T30-c` → "That Tiny Note of Discord" 2008.  
  Evidence: research/yudkowsky-arguments/pack.json T30-d qualification "Earliest located after his own superseded view (T30-b, T30-c)"
- **39. `yk-y30-lw-2022-miri-announces-new-death-with-dignity-c`** (qualification): **disagree**. "Q6" is the post's own heading label, not an internal ID. The post labels questions in groups (Q2 to Q6 each cover several questions), so the April Fool's question is the 15th question asked, and "the sixth question" miscounts it.  
  Identifiers: `Q6` → the post's own question label "Q6" (not an internal identifier); several successive questions carry the label Q6, the first being "Hey, this was posted on April 1st...".  
  Evidence: https://www.lesswrong.com/posts/j9Q8bRmwCgXRYAgcJ : question labels in order Q1, Q2, Q2, Q3, Q3, Q4 x6, Q5 x3, then 'Q6: Hey, this was posted on April 1st. All of this is just...'  
  Proposed: In the post, the question labelled Q6 asks whether it is "just an April Fool's joke"; ...
- **40. `yk-y30-sl4-2000-11-13-yudkowsky-0011-0181-c`** (qualification): **agree**. All correct; quoted fragments keep the messages findable.  
  Identifiers: `T30-b` → Staring into the Singularity earlier-self case (2000-08-31); `0012-0355` → SL4 message 2000-12-10 (admitted source); `0406-9076` → SL4 message 2004-06-04 (not an admitted source); `T22-s1` → same SL4 sentence recorded for Y22.  
  Evidence: research/yudkowsky-arguments/pack.json T22-s1 source sl4-0011-0181, same quote as T30-s1
- **41. `yk-y30-extropians-1996-11-22-yudkowsky-3178-a`** (qualification): **agree**. All correct; date verified on the archive copy. The message title could be added but the date suffices.  
  Identifiers: `T30-s1` → SL4 "Re: Ben's \"Extropian Creed\"" 2000-11-13; `T30-c` → "That Tiny Note of Discord" 2008; `extropians.4Q99-2680` → Extropians "Re: SOC: Tractatus Theopoliticus (was: Is vs. Ought)" 1999-11-27 (PS on his 1996 claim).  
  Evidence: http://extropians.weidai.com/extropians.4Q99/2680.html "Sat, 27 Nov 1999 18:06:42 -0600" PS: "Mitchell Porter challenged my 1996 claim that \"the Powers would be ethical\" on the grounds that my conception of ethics was anthropomorphic, a conclusion I later came to myself."

### Economics collection

- **1. `ec-g01-hanson-economic-growth-given-machine-intelligence-a`** (qualification): **agree**. Labels match evidenceIds order (g01-a, g01-a2). Faithful; "Second passage of the same record as the first passage" is redundant but harmless.  
  Identifiers: `G01-a` → evidence-ec-g01-a (claim ec-g01-hanson-economic-growth-given-machine-intelligence-a; Section 7 "Discussion", paragraph beginning "These models also suggest"); `G01-a2` → evidence-ec-g01-a2 (claim ec-g01-hanson-economic-growth-given-machine-intelligence-a; Section 7 "Discussion", same paragraph, next sentence).  
  Evidence: before-evidence.json evidence-ec-g01-a / -a2 notes: "Candidate pack passage G01-a / G01-a2"
- **2. `ec-g01-clancy-besiroglu-2023-great-inflection-c`** (qualification): **agree**. Order matches evidenceIds (g01-f closing turn, g01-f2 first turn). "audit C05" -> "audit C" keeps the auditor letter, an internal label with no reader key, but loses nothing substantive.  
  Identifiers: `C05` → targeted auditor C, finding C05 (Clancy 10-20% moved from G09-g to G01-f2); `G01-f` → evidence-ec-g01-f (claim ec-g01-clancy-besiroglu-2023-great-inflection-c; Matt Clancy's closing turn, paragraph beginning "One final meta point"); `G01-f2` → evidence-ec-g01-f2 (claim ec-g01-clancy-besiroglu-2023-great-inflection-c; Matt Clancy's first turn, beginning "That's right").  
  Evidence: research/economics-growth/audit.md findings table: "G09-g (C05) | Clancy's 10–20% answers a conditional 65% filed under G01 | Moved to G01 as G01-f2"
- **3. `ec-g02-aghion-jones-jones-2017-ai-and-economic-growth-a`** (qualification): **agree**. Section pointer matches the G02-b locator (Section 4.2 "Objections to singularities", subsection "Search Limits"). Minor: rewrite mixes curly quotes into straight-quoted text.  
  Identifiers: `G02-b` → evidence-ec-g02-b (claim ec-g02-aghion-jones-jones-2017-ai-and-economic-growth-c; Section 4.2 "Objections to singularities", subsection "Search Limits").  
  Evidence: evidence-ec-g02-b locator: Section 4.2 "Objections to singularities", subsection "Search Limits"
- **4. `ec-g02-aghion-jones-jones-2017-ai-and-economic-growth-c`** (qualification): **agree**. Section pointer matches G02-a locator. Faithful.  
  Identifiers: `G02-a` → evidence-ec-g02-a (claim ec-g02-aghion-jones-jones-2017-ai-and-economic-growth-a; Section 4.1, Example 2 "Automation of Ideas Production", first paragraph).  
  Evidence: evidence-ec-g02-a locator: Section 4.1, Example 2 "Automation of Ideas Production", first paragraph
- **5. `ec-g02-hanson-1998-some-skepticism-c`** (qualification): **agree**. Order matches (g02-c, g02-d). Faithful.  
  Identifiers: `G02-c` → evidence-ec-g02-c (claim ec-g02-hanson-1998-some-skepticism-c; Hanson's comment, paragraphs beginning "Now let me be more critical" and "Can we); `G02-d` → evidence-ec-g02-d (claim ec-g02-hanson-1998-some-skepticism-c; Hanson's comment, paragraph beginning "Can we interpret Vinge's claim as describ).  
  Evidence: evidence-ec-g02-c / -d notes
- **6. `ec-g02-davidson-2021-explosive-economic-growth-a`** (qualification): **agree**. G09-d is Davidson's abstract sentence held by the G09 claim; "the report's abstract" points to the right place. Loses only the cross-reference to the G09 record, which the abstract pointer replaces adequately.  
  Identifiers: `G02-e` → evidence-ec-g02-e (claim ec-g02-davidson-2021-explosive-economic-growth-a; Summary, first argument ("Idea-based models of very long-run growth imply AI cou); `G02-e2` → evidence-ec-g02-e2 (claim ec-g02-davidson-2021-explosive-economic-growth-a; Summary, first argument, paragraph after the feedback loop); `G09-d` → evidence-ec-g09-d (claim ec-g09-davidson-2021-explosive-economic-growth-a; Abstract).  
  Evidence: evidence-ec-g09-d locator "Abstract": "Ultimately, I find that explosive growth by 2100 is plausible but far from certain."
- **7. `ec-g03-hanson-economic-growth-given-machine-intelligence-a`** (qualification): **agree**. C01 -> "audit C": faithful; auditor letter remains as unexplained internal label (as elsewhere in data).  
  Identifiers: `C01` → targeted auditor C, finding C01 (Hanson doubling-time passage added as G03-0/G09-0).  
  Evidence: research/economics-growth/audit.md "G03, G09 (C01–C02) ... Added as G03-0 and G09-0"
- **8. `ec-g03-clancy-besiroglu-2023-great-inflection-b`** (qualification): **agree**. Dropping the GPT-check item code loses nothing; the passage is the claim's own.  
  Identifiers: `G03-g` → evidence-ec-g03-g (claim ec-g03-clancy-besiroglu-2023-great-inflection-b; Matt Clancy's turn beginning "I'm happy to grant that we have seen accelerations).  
  Evidence: research/economics-growth/audit.md adjudication: "G03-g | contests → bears-on ... accept"
- **9. `ec-g04-nordhaus-2015-economic-singularity-a`** (qualification): **agree**. Faithful, though the whole qualification is now an uninformative tautology.  
  Identifiers: `G04-a` → evidence-ec-g04-a (claim ec-g04-nordhaus-2015-economic-singularity-a; Section IV "Singularity from the demand and the supply side", first paragraph); `G04-b` → evidence-ec-g04-b (claim ec-g04-nordhaus-2015-economic-singularity-a; Section VII "Supply-side Singularity", paragraph beginning "The natural produced).  
  Evidence: evidence-ec-g04-a / -b notes
- **10. `ec-g04-hanson-economic-growth-given-machine-intelligence-c`** (qualification): **agree**. C06 -> C; faithful.  
  Identifiers: `C06` → targeted auditor C, finding C06 (G04-e reclassified to contests; with blind auditor B).  
  Evidence: research/economics-growth/audit.md "G04-e (B, C06) ... Reclassified as contests"
- **11. `ec-g04-erdil-besiroglu-2023-explosive-growth-review-c`** (qualification): **agree**. Former code G05-h dropped; dates and criterion preserved; order matches.  
  Identifiers: `G04-g` → evidence-ec-g04-g (claim ec-g04-erdil-besiroglu-2023-explosive-growth-review-c; Section 2.3 "AI automation could have massive transitory effects", paragraph beg); `G04-g2` → evidence-ec-g04-g2 (claim ec-g04-erdil-besiroglu-2023-explosive-growth-review-c; Section 3.1 "Regulations can slow down the economic impact of AI", paragraph beg); `G05-h` → former pack code of G04-g2 before the 2026-10-10 G04/G05 move.  
  Evidence: research/economics-growth/audit.md "Moves: ... G05-h → G04-g2 (Erdil and Besiroglu: regulation of AI training and deployment)"
- **12. `ec-g04-clancy-besiroglu-2023-great-inflection-a`** (qualification): **agree**. Order matches (g04-h, g04-k, g04-k2); former codes G05-d/e dropped; "with G04-k" -> "with the second passage" correct.  
  Identifiers: `C04` → targeted auditor C, finding C04 (G04-h replaced; with blind auditor A); `G04-h` → evidence-ec-g04-h (claim ec-g04-clancy-besiroglu-2023-great-inflection-a; Matt Clancy's turn beginning "I think that's a fair representation", paragraph b); `G04-k` → evidence-ec-g04-k (claim ec-g04-clancy-besiroglu-2023-great-inflection-a; Matt Clancy's turn beginning "As a quick aside"; his closing turn, first observa); `G04-k2` → evidence-ec-g04-k2 (claim ec-g04-clancy-besiroglu-2023-great-inflection-a; Matt Clancy's closing turn, first of "three broad observations"); `G05-d` → former pack code of G04-k; `G05-e` → former pack code of G04-k2.  
  Evidence: research/economics-growth/audit.md adjudication rows G05-d -> G04-k, G05-e -> G04-k2
- **13. `ec-g05-nordhaus-2015-economic-singularity-c`** (qualification): **agree**. C03 -> audit C; faithful. Proposition code (G06) kept, consistent with statements.  
  Identifiers: `C03` → targeted auditor C, finding C03 (Nordhaus physical-limits passage G05-n added).  
  Evidence: research/economics-growth/audit.md "G05 (C03) | Nordhaus 2015 answers the physical-limits objection ... Added G05-n"
- **14. `ec-g06-nordhaus-2015-economic-singularity-b`** (qualification): **agree**. Order matches (g06-a abstract, g06-b Sec IX). Faithful.  
  Identifiers: `G06-a` → evidence-ec-g06-a (claim ec-g06-nordhaus-2015-economic-singularity-b; Abstract); `G06-b` → evidence-ec-g06-b (claim ec-g06-nordhaus-2015-economic-singularity-b; Section IX "Summary of Tests for Singularity").  
  Evidence: evidence-ec-g06-a / -b
- **15. `ec-g07-hanson-1994-if-uploads-come-first-a`** (qualification): **agree**. Order matches. Faithful.  
  Identifiers: `G07-a` → evidence-ec-g07-a (claim ec-g07-hanson-1994-if-uploads-come-first-a; Abstract); `G07-a2` → evidence-ec-g07-a2 (claim ec-g07-hanson-1994-if-uploads-come-first-a; Section "The Evolution of Values", first paragraph).  
  Evidence: evidence-ec-g07-a / -a2
- **16. `ec-g07-hanson-economic-growth-given-machine-intelligence-a`** (qualification): **agree**. Order matches (g07-b abstract, g07-c Sec 3). Faithful.  
  Identifiers: `G07-b` → evidence-ec-g07-b (claim ec-g07-hanson-economic-growth-given-machine-intelligence-a; Abstract); `G07-c` → evidence-ec-g07-c (claim ec-g07-hanson-economic-growth-given-machine-intelligence-a; Section 3 "The Simplest Model", paragraph after the wage equations).  
  Evidence: evidence-ec-g07-b / -c
- **17. `ec-g07-nordhaus-2015-economic-singularity-a`** (qualification): **agree**. C12 -> audit C. Faithful (audit table also credits B, but the before text did not).  
  Identifiers: `C12` → targeted auditor C, finding C12 (G07-d Nordhaus added; with auditor B).  
  Evidence: research/economics-growth/audit.md "G07 (C12, B) ... G07-d (Nordhaus, context-only) and G07-a2 added"
- **18. `ec-g08-acemoglu-2024-simple-macroeconomics-of-ai-a`** (qualification): **agree**. Label correctly ties the level-effect caveat to the second passage (g08-b, 1.1% GDP).  
  Identifiers: `G08-a` → evidence-ec-g08-a (claim ec-g08-acemoglu-2024-simple-macroeconomics-of-ai-a; Abstract); `G08-b` → evidence-ec-g08-b (claim ec-g08-acemoglu-2024-simple-macroeconomics-of-ai-a; Section 1 (Introduction), paragraph on investment effects).  
  Evidence: evidence-ec-g08-b: "GDP is also estimated to grow by around 1.1% over the next 10 years."
- **19. `ec-g09-hanson-economic-growth-given-machine-intelligence-a`** (qualification): **agree**. G03-0 is the same paper's G03 articulating passage; "the one quoted under G03" is unambiguous for this source. Faithful.  
  Identifiers: `C02` → targeted auditor C, finding C02 (same as C01); `G03-0` → evidence-ec-g03-0 (claim ec-g03-hanson-economic-growth-given-machine-intelligence-a; Section 3 "The Simplest Model", paragraph after the 45% example).  
  Evidence: evidence-ec-g03-0, claim ec-g03-hanson-economic-growth-given-machine-intelligence-a
- **20. `ec-g09-hanson-2000-long-term-growth-exponential-modes-a`** (qualification): **agree**. Faithful.  
  Identifiers: `G09-a` → evidence-ec-g09-a (claim ec-g09-hanson-2000-long-term-growth-exponential-modes-a; Paragraph beginning "In summary, if one takes seriously" (pp. 15–16), in the sec); `G09-b` → evidence-ec-g09-b (claim ec-g09-hanson-2000-long-term-growth-exponential-modes-a; Paragraph beginning "In summary, if one takes seriously" (p. 16), later sentence).  
  Evidence: evidence-ec-g09-a / -b
- **21. `ec-g09-karnofsky-2020-comment-human-trajectory-a`** (qualification): **agree**. G03-d is Karnofsky's own G03 record; faithful.  
  Identifiers: `G03-d` → evidence-ec-g03-d (claim ec-g03-karnofsky-2020-comment-human-trajectory-a; Comment "Some personal reactions on this piece", paragraph beginning "Like David).  
  Evidence: evidence-ec-g03-d, claim ec-g03-karnofsky-2020-comment-human-trajectory-a
- **22. `ec-g09-davidson-2021-explosive-economic-growth-a`** (qualification): **agree**. Faithful.  
  Identifiers: `G09-d` → evidence-ec-g09-d (claim ec-g09-davidson-2021-explosive-economic-growth-a; Abstract); `G09-e` → evidence-ec-g09-e (claim ec-g09-davidson-2021-explosive-economic-growth-a; Appendix G "How I decide my overall probability of explosive growth by 2100").  
  Evidence: evidence-ec-g09-d / -e
- **23. `ec-g09-clancy-besiroglu-2023-great-inflection-a`** (qualification): **agree**. Both referents correct (G01-e Besiroglu articulates; G01-f2 is the second passage of Clancy's contesting record).  
  Identifiers: `G01-e` → evidence-ec-g01-e (claim ec-g01-clancy-besiroglu-2023-great-inflection-a; Tamay Besiroglu's first long turn, paragraph beginning "Our second theme centers); `G01-f2` → evidence-ec-g01-f2 (claim ec-g01-clancy-besiroglu-2023-great-inflection-c; Matt Clancy's first turn, beginning "That's right"); `G09-j` → evidence-ec-g09-j (claim ec-g09-clancy-besiroglu-2023-great-inflection-a; Tamay Besiroglu's first long turn, paragraph beginning "Our second theme centers); `G09-k` → evidence-ec-g09-k (claim ec-g09-clancy-besiroglu-2023-great-inflection-a; Matt Clancy's first turn, beginning "That's right").  
  Evidence: evidence-ec-g01-e (claim ...great-inflection-a, articulates); evidence-ec-g01-f2 (claim ...great-inflection-c, contests)
- **24. `ec-m01-nourse-1955-automation-hearings-statement-b`** (qualification): **agree**. Rewrite faithful. Pre-existing, untouched problem: "see the M01 contests record, p. 619" is stale: the p. 619 passage (M01-04) is this record's own second passage, changed to bears-on on 2026-10-12, and there is no Nourse M01 contests record.  
  Identifiers: `M01-03` → evidence-ec-m01-03 (claim ec-m01-nourse-1955-automation-hearings-statement-b; printed p. 618 (statement, opening; session of 28 October 1955 with Vannevar Bus); `M01-04` → evidence-ec-m01-04 (claim ec-m01-nourse-1955-automation-hearings-statement-b; printed p. 619 (statement, 'Four aspects of automation')); `M01-05` → evidence-ec-m01-05 (claim ec-m01-nourse-1955-automation-hearings-statement-a; printed p. 621 (statement, 'Technology is indivisible')).  
  Evidence: before.json: Nourse M01 claims are only ...statement-b (bears_on, m01-03/04) and ...statement-a (articulates, m01-05); evidence-ec-m01-04 locator printed p. 619  
  Proposed: "(see the second passage, p. 619)" in place of "(see the M01 contests record, p. 619)" - outside this rewrite's scope
- **25. `ec-m02-leontief-duchin-1984-impacts-of-automation-b`** (qualification): **agree**. Order matches (m02-04, -05, -06). Faithful.  
  Identifiers: `M02-04` → evidence-ec-m02-04 (claim ec-m02-leontief-duchin-1984-impacts-of-automation-b; ch. 4 'The Automation of Production Operations', sect. A Introduction, printed p); `M02-05` → evidence-ec-m02-05 (claim ec-m02-leontief-duchin-1984-impacts-of-automation-b; printed p. 5.23); `M02-06` → evidence-ec-m02-06 (claim ec-m02-leontief-duchin-1984-impacts-of-automation-b; ch. 4, 'Robotics', overview of the technology, printed p. 4.19).  
  Evidence: evidence-ec-m02-04/05/06
- **26. `ec-m03-brynjolfsson-rock-syverson-2017-productivity-paradox-a`** (qualification): **agree**. Order matches evidenceIds; content unchanged. Faithful.  
  Identifiers: `M03-01` → evidence-ec-m03-01 (claim ec-m03-brynjolfsson-rock-syverson-2017-productivity-paradox-a; pdf page 2; abstract); `M03-03` → evidence-ec-m03-03 (claim ec-m03-brynjolfsson-rock-syverson-2017-productivity-paradox-a; pdf page 36; Conclusion).  
  Evidence: before-evidence.json notes "Candidate pack passage ..." for each evidenceId
- **27. `ec-m03-eloundou-et-al-2023-gpts-are-gpts-b`** (qualification): **agree**. Order matches evidenceIds; content unchanged. Faithful.  
  Identifiers: `M03-10` → evidence-ec-m03-10 (claim ec-m03-eloundou-et-al-2023-gpts-are-gpts-b; pdf page 1; Abstract); `M03-11` → evidence-ec-m03-11 (claim ec-m03-eloundou-et-al-2023-gpts-are-gpts-b; pdf page 11; 4 Results, 4.1 Summary Statistics (printed p. 10 begins section 4.1).  
  Evidence: before-evidence.json notes "Candidate pack passage ..." for each evidenceId
- **28. `ec-m04-agrawal-gans-goldfarb-2018-prediction-judgment-complexity-a`** (qualification): **agree**. Faithful.  
  Identifiers: `M04-02` → evidence-ec-m04-02 (claim ec-m04-agrawal-gans-goldfarb-2018-prediction-judgment-complexity-a; pdf page 2; abstract); `M04-03` → evidence-ec-m04-03 (claim ec-m04-agrawal-gans-goldfarb-2018-prediction-judgment-complexity-a; pdf page 5; section 1 Introduction); `M04-04` → evidence-ec-m04-04 (claim ec-m04-agrawal-gans-goldfarb-2018-prediction-judgment-complexity-a; pdf page 25; section 6 Conclusions).  
  Evidence: evidence-ec-m04-02/03/04
- **29. `ec-m04-agrawal-gans-goldfarb-2018-economic-policy-for-ai-a`** (qualification): **agree**. Order matches evidenceIds; content unchanged. Faithful.  
  Identifiers: `M04-05` → evidence-ec-m04-05 (claim ec-m04-agrawal-gans-goldfarb-2018-economic-policy-for-ai-a; pdf page 2; abstract); `M04-06` → evidence-ec-m04-06 (claim ec-m04-agrawal-gans-goldfarb-2018-economic-policy-for-ai-a; pdf page 5; section 2 Artificial Intelligence as a General Purpose Technology).  
  Evidence: before-evidence.json notes "Candidate pack passage ..." for each evidenceId
- **30. `ec-m04-agrawal-gans-goldfarb-2019-ambiguous-labor-market-impact-a`** (qualification): **agree**. Order matches evidenceIds; content unchanged. Faithful.  
  Identifiers: `M04-08` → evidence-ec-m04-08 (claim ec-m04-agrawal-gans-goldfarb-2019-ambiguous-labor-market-impact-a; pdf page 3; introduction (printed p. 1)); `M04-09` → evidence-ec-m04-09 (claim ec-m04-agrawal-gans-goldfarb-2019-ambiguous-labor-market-impact-a; pdf page 3; introduction (printed p. 1)).  
  Evidence: before-evidence.json notes "Candidate pack passage ..." for each evidenceId
- **31. `ec-m05-buckingham-1955-automation-hearings-statement-c`** (qualification): **agree**. Sole passage; dropping the code loses nothing.  
  Identifiers: `M05-03` → evidence-ec-m05-03 (claim ec-m05-buckingham-1955-automation-hearings-statement-c; printed p. 35 (prepared statement, 'Impact of automation on the economic system').  
  Evidence: claim has one evidenceId; research/economics-mainstream/pack.json decisions["2026-10-12"].engagement
- **32. `ec-m05-nourse-1955-automation-hearings-statement-c`** (qualification): **agree**. Sole passage; dropping the code loses nothing.  
  Identifiers: `M05-04` → evidence-ec-m05-04 (claim ec-m05-nourse-1955-automation-hearings-statement-c; printed p. 620 (statement, 'From technology to economics')).  
  Evidence: claim has one evidenceId; research/economics-mainstream/pack.json decisions["2026-10-12"].engagement
- **33. `ec-m05-armer-1966-computer-aspects-of-technological-change-b`** (qualification): **agree**. Order matches (m05-05, m05-06). Faithful.  
  Identifiers: `M05-05` → evidence-ec-m05-05 (claim ec-m05-armer-1966-computer-aspects-of-technological-change-b; printed p. 81 ('Computer Aspects of Technological Change', opening)); `M05-06` → evidence-ec-m05-06 (claim ec-m05-armer-1966-computer-aspects-of-technological-change-b; printed p. 81 ('Computer Aspects of Technological Change')).  
  Evidence: evidence-ec-m05-05/06
- **34. `ec-m05-armer-1966-computer-aspects-of-technological-change-c`** (qualification): **agree**. Sole passage; dropping the code loses nothing.  
  Identifiers: `M05-07` → evidence-ec-m05-07 (claim ec-m05-armer-1966-computer-aspects-of-technological-change-c; printed p. 82 ('Computer Aspects of Technological Change')).  
  Evidence: claim has one evidenceId; research/economics-mainstream/pack.json decisions["2026-10-12"].engagement
- **35. `ec-m05-levitan-1966-new-directions-in-aid-of-the-poor-c`** (qualification): **agree**. Sole passage; dropping the code loses nothing.  
  Identifiers: `M05-09` → evidence-ec-m05-09 (claim ec-m05-levitan-1966-new-directions-in-aid-of-the-poor-c; printed p. 156).  
  Evidence: claim has one evidenceId; research/economics-mainstream/pack.json decisions["2026-10-12"].engagement
- **36. `ec-m05-technology-and-the-american-economy-1966-c`** (qualification): **agree**. All referents correct: M05-12 is the p. 9 second passage; M05-07 is Armer's contesting M05 record.  
  Identifiers: `M05-07` → evidence-ec-m05-07 (claim ec-m05-armer-1966-computer-aspects-of-technological-change-c; printed p. 82 ('Computer Aspects of Technological Change')); `M05-11` → evidence-ec-m05-11 (claim ec-m05-technology-and-the-american-economy-1966-c; printed p. 1 (Part I, ch. 1 'The Pace of Technological Change', opening paragrap); `M05-12` → evidence-ec-m05-12 (claim ec-m05-technology-and-the-american-economy-1966-c; printed p. 9 (Part I, ch. 2)).  
  Evidence: evidence-ec-m05-12 locator printed p. 9; evidence-ec-m05-07 claim ec-m05-armer-1966-computer-aspects-of-technological-change-c (contests)
- **37. `ec-m05-nordhaus-2015-economic-singularity-b`** (qualification): **agree**. Order matches; M05-06 -> "his passage recorded as bearing on M05" correct (Armer bears-on record). D3 label dropped, date kept.  
  Identifiers: `D3` → maintainer decision D3: model scenarios under M05 stay as articulations, flagged model scenario, context-only; `M05-06` → evidence-ec-m05-06 (claim ec-m05-armer-1966-computer-aspects-of-technological-change-b; printed p. 81 ('Computer Aspects of Technological Change')); `M05-18` → evidence-ec-m05-18 (claim ec-m05-nordhaus-2015-economic-singularity-b; pdf page 40; Section X(d), Interpretations and Elaborations: The euthanasia of t); `M05-19` → evidence-ec-m05-19 (claim ec-m05-nordhaus-2015-economic-singularity-b; pdf page 44; Section XI, Concluding Comments on Singularity (printed p. 41)); `M05-41` → evidence-ec-m05-41 (claim ec-m05-nordhaus-2015-economic-singularity-b; pdf page 9); `M05-42` → evidence-ec-m05-42 (claim ec-m05-nordhaus-2015-economic-singularity-b; pdf page 9).  
  Evidence: evidence-ec-m05-06 claim ec-m05-armer-1966-...-b (bears_on); research/economics-mainstream/pack.json decisions.D3
- **38. `ec-m05-acemoglu-restrepo-2016-race-between-machine-and-man-a`** (qualification): **agree**. Faithful. "a lead in the research pack" is vaguer than naming the book, but the before text did not name it either.  
  Identifiers: `D3` → maintainer decision D3: model scenarios under M05 stay as articulations, flagged model scenario, context-only; `L01` → lead L01: Simon, The Shape of Automation for Men and Management (1965), not retrieved.  
  Evidence: research/economics-mainstream/pack.json leads[L01]: "Simon, H. A. (1965). The shape of automation for men and management"
- **39. `ec-m05-aghion-jones-jones-2017-ai-and-economic-growth-a`** (qualification): **agree**. D3 label dropped; date (from decisions.date "2026-10-10/11", as in the before text) kept. Faithful.  
  Identifiers: `D3` → maintainer decision D3: model scenarios under M05 stay as articulations, flagged model scenario, context-only.  
  Evidence: research/economics-mainstream/pack.json decisions.D3
- **40. `ec-m05-korinek-stiglitz-2017-ai-income-distribution-a`** (qualification): **agree**. D3 label dropped; date (from decisions.date "2026-10-10/11", as in the before text) kept. Faithful.  
  Identifiers: `D3` → maintainer decision D3: model scenarios under M05 stay as articulations, flagged model scenario, context-only.  
  Evidence: research/economics-mainstream/pack.json decisions.D3
- **41. `ec-m05-acemoglu-restrepo-2018-race-between-man-and-machine-a`** (qualification): **agree**. D3 label dropped; date (from decisions.date "2026-10-10/11", as in the before text) kept. Faithful.  
  Identifiers: `D3` → maintainer decision D3: model scenarios under M05 stay as articulations, flagged model scenario, context-only.  
  Evidence: research/economics-mainstream/pack.json decisions.D3
- **42. `ec-m05-acemoglu-restrepo-2019-automation-and-new-tasks-b`** (qualification): **agree**. Order matches evidenceIds; content unchanged. Faithful.  
  Identifiers: `M05-33` → evidence-ec-m05-33 (claim ec-m05-acemoglu-restrepo-2019-automation-and-new-tasks-b; pdf page 4; Introduction, footnote 1 (printed p. 3)); `M05-34` → evidence-ec-m05-34 (claim ec-m05-acemoglu-restrepo-2019-automation-and-new-tasks-b; pdf page 22; Concluding Remarks (printed p. 21)).  
  Evidence: before-evidence.json notes "Candidate pack passage ..." for each evidenceId
- **43. `ec-m05-acemoglu-2024-simple-macroeconomics-of-ai-b`** (qualification): **agree**. Order matches evidenceIds; content unchanged. Faithful.  
  Identifiers: `M05-39` → evidence-ec-m05-39 (claim ec-m05-acemoglu-2024-simple-macroeconomics-of-ai-b; pdf page 44; 4 Concluding Remarks and Discussion, list item 1 (printed p. 42)); `M05-40` → evidence-ec-m05-40 (claim ec-m05-acemoglu-2024-simple-macroeconomics-of-ai-b; pdf page 8; 1 Introduction (printed p. 6)).  
  Evidence: before-evidence.json notes "Candidate pack passage ..." for each evidenceId
- **44. `ec-m06a-buckingham-1955-automation-hearings-statement-a`** (qualification): **agree**. Order matches evidenceIds; content unchanged. Faithful.  
  Identifiers: `M06a-01` → evidence-ec-m06a-01 (claim ec-m06a-buckingham-1955-automation-hearings-statement-a; printed p. 33 (prepared statement, 'Direct effects of automation', items 1-2 of ); `M06a-02` → evidence-ec-m06a-02 (claim ec-m06a-buckingham-1955-automation-hearings-statement-a; printed p. 34 (prepared statement, 'Impact of automation on the economic system').  
  Evidence: before-evidence.json notes "Candidate pack passage ..." for each evidenceId
- **45. `ec-m06b-nourse-1955-automation-hearings-statement-b`** (qualification): **agree**. Order matches evidenceIds; content unchanged. Faithful.  
  Identifiers: `M06b-02` → evidence-ec-m06b-02 (claim ec-m06b-nourse-1955-automation-hearings-statement-b; printed p. 622 (statement, 'Integration of the economic process')); `M06b-04` → evidence-ec-m06b-04 (claim ec-m06b-nourse-1955-automation-hearings-statement-b; printed p. 625 (statement)).  
  Evidence: before-evidence.json notes "Candidate pack passage ..." for each evidenceId
- **46. `ec-m06b-korinek-stiglitz-2017-ai-income-distribution-a`** (qualification): **agree**. Order matches; "Same passage as the M06a record" (proposition code) left, consistent with statements.  
  Identifiers: `M06b-11` → evidence-ec-m06b-11 (claim ec-m06b-korinek-stiglitz-2017-ai-income-distribution-a; pdf page 39; Conclusions); `M06b-12` → evidence-ec-m06b-12 (claim ec-m06b-korinek-stiglitz-2017-ai-income-distribution-a; pdf page 2; abstract); `M06b-13` → evidence-ec-m06b-13 (claim ec-m06b-korinek-stiglitz-2017-ai-income-distribution-a; pdf page 5; section 1 Introduction (roadmap of section 4)).  
  Evidence: evidence-ec-m06b-11/12/13
- **47. `ec-m06b-trajtenberg-2018-ai-as-the-next-gpt-a`** (qualification): **agree**. Order matches evidenceIds; content unchanged. Faithful.  
  Identifiers: `M06b-15` → evidence-ec-m06b-15 (claim ec-m06b-trajtenberg-2018-ai-as-the-next-gpt-a; pdf page 2; abstract); `M06b-16` → evidence-ec-m06b-16 (claim ec-m06b-trajtenberg-2018-ai-as-the-next-gpt-a; pdf page 6; section 2 "Is this time different?").  
  Evidence: before-evidence.json notes "Candidate pack passage ..." for each evidenceId
- **48. `ec-m07-frey-osborne-2013-future-of-employment-a`** (qualification): **agree**. Order matches evidenceIds; content unchanged. Faithful.  
  Identifiers: `M07-01` → evidence-ec-m07-01 (claim ec-m07-frey-osborne-2013-future-of-employment-a; pdf page 1; Abstract); `M07-02` → evidence-ec-m07-02 (claim ec-m07-frey-osborne-2013-future-of-employment-a; pdf page 44; Section VI, Conclusions (printed p. 44)).  
  Evidence: before-evidence.json notes "Candidate pack passage ..." for each evidenceId
- **49. `ec-m07-eloundou-et-al-2023-gpts-are-gpts-a`** (qualification): **agree**. Order matches evidenceIds; content unchanged. Faithful.  
  Identifiers: `M07-04` → evidence-ec-m07-04 (claim ec-m07-eloundou-et-al-2023-gpts-are-gpts-a; pdf page 1; Abstract); `M07-05` → evidence-ec-m07-05 (claim ec-m07-eloundou-et-al-2023-gpts-are-gpts-a; pdf page 1; Abstract).  
  Evidence: before-evidence.json notes "Candidate pack passage ..." for each evidenceId
- **50. `ec-m08-brynjolfsson-rock-syverson-2017-productivity-paradox-b`** (qualification): **agree**. Order matches evidenceIds; content unchanged. Faithful.  
  Identifiers: `M08-02` → evidence-ec-m08-02 (claim ec-m08-brynjolfsson-rock-syverson-2017-productivity-paradox-b; pdf page 19; section "A Technology-Driven Case for Productivity Optimism"); `M08-03` → evidence-ec-m08-03 (claim ec-m08-brynjolfsson-rock-syverson-2017-productivity-paradox-b; pdf page 20; section "A Technology-Driven Case for Productivity Optimism" (call ).  
  Evidence: before-evidence.json notes "Candidate pack passage ..." for each evidenceId
- **51. `ec-m08-acemoglu-2024-simple-macroeconomics-of-ai-a`** (qualification): **agree**. Order matches (m08-04/05/06). Faithful.  
  Identifiers: `M08-04` → evidence-ec-m08-04 (claim ec-m08-acemoglu-2024-simple-macroeconomics-of-ai-a; pdf page 45; 4 Concluding Remarks and Discussion (printed p. 43)); `M08-05` → evidence-ec-m08-05 (claim ec-m08-acemoglu-2024-simple-macroeconomics-of-ai-a; pdf page 45; 4 Concluding Remarks and Discussion (printed p. 43)); `M08-06` → evidence-ec-m08-06 (claim ec-m08-acemoglu-2024-simple-macroeconomics-of-ai-a; pdf page 45; 4 Concluding Remarks and Discussion (printed p. 43)).  
  Evidence: evidence-ec-m08-04/05/06
- **52. `ec-m09-leontief-duchin-1984-impacts-of-automation-b`** (qualification): **agree**. Order matches evidenceIds; content unchanged. Faithful.  
  Identifiers: `M09-06` → evidence-ec-m09-06 (claim ec-m09-leontief-duchin-1984-impacts-of-automation-b; Abstract ('Issues'), unnumbered front matter); `M09-07` → evidence-ec-m09-07 (claim ec-m09-leontief-duchin-1984-impacts-of-automation-b; printed p. 1.33).  
  Evidence: before-evidence.json notes "Candidate pack passage ..." for each evidenceId
- **53. `ec-m09-nordhaus-2015-economic-singularity-b`** (qualification): **agree**. M09-35 is the third evidenceId (Simon passage, pdf p. 9); correct. L01 -> "a lead in the research pack" faithful.  
  Identifiers: `L01` → lead L01: Simon, The Shape of Automation for Men and Management (1965), not retrieved; `M09-11` → evidence-ec-m09-11 (claim ec-m09-nordhaus-2015-economic-singularity-b; pdf page 10; Section III, Historical perspectives on Singularity in economics (p); `M09-12` → evidence-ec-m09-12 (claim ec-m09-nordhaus-2015-economic-singularity-b; pdf page 5; Section II, Artificial Intelligence and the Singularity (printed p. ); `M09-35` → evidence-ec-m09-35 (claim ec-m09-nordhaus-2015-economic-singularity-b; pdf page 9; section on the history of the accelerationist debate).  
  Evidence: evidence-ec-m09-35 locator pdf page 9: "One of the most impressive attempts ... was Herbert Simon"
- **54. `ec-m09-acemoglu-restrepo-2018-ai-automation-and-work-b`** (qualification): **agree**. Order matches evidenceIds; content unchanged. Faithful.  
  Identifiers: `M09-17` → evidence-ec-m09-17 (claim ec-m09-acemoglu-restrepo-2018-ai-automation-and-work-b; pdf page 34; section 6 Concluding Remarks (printed p. 32)); `M09-18` → evidence-ec-m09-18 (claim ec-m09-acemoglu-restrepo-2018-ai-automation-and-work-b; pdf page 3; section 1 Introduction (printed p. 1)).  
  Evidence: before-evidence.json notes "Candidate pack passage ..." for each evidenceId
- **55. `ec-m09-trajtenberg-2018-ai-as-the-next-gpt-b`** (qualification): **agree**. Order matches evidenceIds; content unchanged. Faithful.  
  Identifiers: `M09-19` → evidence-ec-m09-19 (claim ec-m09-trajtenberg-2018-ai-as-the-next-gpt-b; pdf page 4; section 2 "Is this time different?"); `M09-20` → evidence-ec-m09-20 (claim ec-m09-trajtenberg-2018-ai-as-the-next-gpt-b; pdf page 10; section 3.3 The Direction of Technical Change).  
  Evidence: before-evidence.json notes "Candidate pack passage ..." for each evidenceId
- **56. `ec-m09-furman-seamans-2018-ai-and-the-economy-b`** (qualification): **agree**. Order matches evidenceIds; content unchanged. Faithful.  
  Identifiers: `M09-21` → evidence-ec-m09-21 (claim ec-m09-furman-seamans-2018-ai-and-the-economy-b; pdf page 27; section 6 Conclusion); `M09-22` → evidence-ec-m09-22 (claim ec-m09-furman-seamans-2018-ai-and-the-economy-b; pdf page 10; section 2).  
  Evidence: before-evidence.json notes "Candidate pack passage ..." for each evidenceId
- **57. `ec-m09-acemoglu-restrepo-2019-wrong-kind-of-ai-b`** (qualification): **agree**. Order matches evidenceIds; content unchanged. Faithful.  
  Identifiers: `M09-25` → evidence-ec-m09-25 (claim ec-m09-acemoglu-restrepo-2019-wrong-kind-of-ai-b; pdf page 7; Varieties of AI (printed p. 5)); `M09-26` → evidence-ec-m09-26 (claim ec-m09-acemoglu-restrepo-2019-wrong-kind-of-ai-b; pdf page 3; AI As a Technology Platform (printed p. 1)).  
  Evidence: before-evidence.json notes "Candidate pack passage ..." for each evidenceId
- **58. `ec-m09-agrawal-gans-goldfarb-2019-economics-of-ai-introduction-a`** (qualification): **agree**. Faithful. Pre-existing, untouched: "timeline.md" is an internal repository file name in reader-facing text.  
  Identifiers: `M09-27` → evidence-ec-m09-27 (claim ec-m09-agrawal-gans-goldfarb-2019-economics-of-ai-introduction-a; pdf page 2; Introduction, opening paragraph (printed p. 1)); `M09-30` → evidence-ec-m09-30 (claim ec-m09-agrawal-gans-goldfarb-2019-economics-of-ai-introduction-a; pdf page 19; The Future of Research on the Economics of Artificial Intelligence,).  
  Evidence: evidence-ec-m09-27 locator printed p. 1; evidence-ec-m09-30 pdf page 19
- **59. `ec-m09-agrawal-gans-goldfarb-2019-economics-of-ai-introduction-b`** (qualification): **agree**. Order matches evidenceIds; content unchanged. Faithful.  
  Identifiers: `M09-28` → evidence-ec-m09-28 (claim ec-m09-agrawal-gans-goldfarb-2019-economics-of-ai-introduction-b; pdf page 2; Introduction (printed p. 1)); `M09-29` → evidence-ec-m09-29 (claim ec-m09-agrawal-gans-goldfarb-2019-economics-of-ai-introduction-b; pdf page 13; Growth, Jobs, and Inequality section, closing paragraph (printed p.).  
  Evidence: before-evidence.json notes "Candidate pack passage ..." for each evidenceId

### Framework provision changes and commitment links

- **1. `prov-preparedness-v2-high-deployment-restriction`** (qualification): **agree**. The referent is a provision_assessed record with resolution 'contested'; the sentence still states it is separate and contested. Faithful.  
  Identifiers: `assessed-preparedness-v2-high-deployment-mitigation` → Preparedness v2 provision_assessed claim (resolution: contested) on whether governance lets Leadership deploy High-capability models without sufficient safeguards.  
  Evidence: qw/before.json assessed-preparedness-v2-high-deployment-mitigation: resolution=contested, derivation=posed
- **2. `provchange-rsp-v2-0-misuse-uplift-threshold`** (inferenceRationale): **agree**. Both provision IDs resolve to states_provision records whose subjects match the provchange's later/earlier editions in order, with quote-type evidence at the stated locators; 'its provision record' is faithful and keeps the pointer. No ID left behind.  
  Identifiers: `prov-rsp-v2-0-misuse-uplift-threshold` → Provision record (states_provision) of edition rsp-v2-0: RSP v2.0 states that its CBRN weapons Capability Threshold is the ability to significantly help individuals or groups with basic technical b; `prov-rsp-2023-misuse-uplift-threshold` → Provision record (states_provision) of edition rsp-2023: RSP v1.0 states that one capability qualifying a model as ASL-3 is that access to it would substantially increase the risk of deliberately-c.  
  Evidence: qw/before.json prov-rsp-v2-0-misuse-uplift-threshold subject=rsp-v2-0, prov-rsp-2023-misuse-uplift-threshold subject=rsp-2023; qw/before-evidence.json evidence-provchange-rsp-v2-0-misuse-uplift-threshold-later note: 'the edition’s own wording is quoted in its provision record'
- **3. `provchange-rsp-v2-1-ceo-rso-decision-board-ltbt-informed`** (inferenceRationale): **agree**. Both provision IDs resolve to states_provision records whose subjects match the provchange's later/earlier editions in order, with quote-type evidence at the stated locators; 'its provision record' is faithful and keeps the pointer. No ID left behind.  
  Identifiers: `prov-rsp-v2-1-ceo-rso-decision-board-ltbt-informed` → Provision record (states_provision) of edition rsp-v2-1: RSP v2.1 states that if the CEO and RSO decide to proceed with deployment and training, they will share their decision, with the underlying ; `prov-rsp-v2-0-ceo-rso-decision-board-ltbt-informed` → Provision record (states_provision) of edition rsp-v2-0: RSP v2.0 states that if the CEO and RSO decide to proceed with deployment and training, they will share their decision, with the underlying .  
  Evidence: qw/before.json prov-rsp-v2-1-ceo-rso-decision-board-ltbt-informed subject=rsp-v2-1, prov-rsp-v2-0-ceo-rso-decision-board-ltbt-informed subject=rsp-v2-0; qw/before-evidence.json evidence-provchange-rsp-v2-1-ceo-rso-decision-board-ltbt-informed-later note: 'the edition’s own wording is quoted in its provision record'
- **4. `provchange-rsp-v3-0-misuse-uplift-threshold`** (inferenceRationale): **agree**. Both provision IDs resolve to states_provision records whose subjects match the provchange's later/earlier editions in order, with quote-type evidence at the stated locators; 'its provision record' is faithful and keeps the pointer. No ID left behind.  
  Identifiers: `prov-rsp-v3-0-misuse-uplift-threshold` → Provision record (states_provision) of edition rsp-v3-0: RSP v3.0 states that its non-novel chemical/biological weapons production threshold covers AI systems with the ability to significantly help; `prov-rsp-v2-2-misuse-uplift-threshold` → Provision record (states_provision) of edition rsp-v2-2: RSP v2.2 states that its CBRN-3 Capability Threshold is the ability to significantly help individuals or groups with basic technical backgro.  
  Evidence: qw/before.json prov-rsp-v3-0-misuse-uplift-threshold subject=rsp-v3-0, prov-rsp-v2-2-misuse-uplift-threshold subject=rsp-v2-2; qw/before-evidence.json evidence-provchange-rsp-v3-0-misuse-uplift-threshold-later note: 'the edition’s own wording is quoted in its provision record'
- **5. `provchange-rsp-v3-0-ceo-rso-decision-board-ltbt-informed`** (inferenceRationale): **agree**. Both provision IDs resolve to states_provision records whose subjects match the provchange's later/earlier editions in order, with quote-type evidence at the stated locators; 'its provision record' is faithful and keeps the pointer. No ID left behind.  
  Identifiers: `prov-rsp-v3-0-ceo-rso-decision-board-ltbt-informed` → Provision record (states_provision) of edition rsp-v3-0: RSP v3.0 states that, following approval of a Risk Report, the CEO and RSO will promptly share their decision(s), the underlying Risk Report; `prov-rsp-v2-2-ceo-rso-decision-board-ltbt-informed` → Provision record (states_provision) of edition rsp-v2-2: RSP v2.2 states that if the CEO and RSO decide to proceed with deployment and training, they will share their decision, with the underlying .  
  Evidence: qw/before.json prov-rsp-v3-0-ceo-rso-decision-board-ltbt-informed subject=rsp-v3-0, prov-rsp-v2-2-ceo-rso-decision-board-ltbt-informed subject=rsp-v2-2; qw/before-evidence.json evidence-provchange-rsp-v3-0-ceo-rso-decision-board-ltbt-informed-later note: 'the edition’s own wording is quoted in its provision record'
- **6. `provchange-fsf-v2-0-hold-pending-mitigations`** (inferenceRationale): **agree**. Both provision IDs resolve to states_provision records whose subjects match the provchange's later/earlier editions in order, with quote-type evidence at the stated locators; 'its provision record' is faithful and keeps the pointer. No ID left behind.  
  Identifiers: `prov-fsf-v2-0-hold-pending-mitigations` → Provision record (states_provision) of edition fsf-v2-0: FSF v2.0 states that if a model flagged by an alert threshold is assessed to pose risks for which readily available mitigations may not be s; `prov-fsf-2024-hold-pending-mitigations` → Provision record (states_provision) of edition fsf-2024: FSF v1.0 states that if a model reaches evaluation thresholds before mitigations at appropriate levels are ready, Google DeepMind would put .  
  Evidence: qw/before.json prov-fsf-v2-0-hold-pending-mitigations subject=fsf-v2-0, prov-fsf-2024-hold-pending-mitigations subject=fsf-2024; qw/before-evidence.json evidence-provchange-fsf-v2-0-hold-pending-mitigations-later note: 'the edition’s own wording is quoted in its provision record'
- **7. `provchange-fsf-v3-0-alert-threshold`** (inferenceRationale): **agree**. Both provision IDs resolve to states_provision records whose subjects match the provchange's later/earlier editions in order, with quote-type evidence at the stated locators; 'its provision record' is faithful and keeps the pointer. No ID left behind.  
  Identifiers: `prov-fsf-v3-0-alert-threshold` → Provision record (states_provision) of edition fsf-v3-0: FSF v3.0 states that early warning evaluations assess the proximity of a model to a CCL and that the alert thresholds defined for them are d; `prov-fsf-v2-0-alert-threshold` → Provision record (states_provision) of edition fsf-v2-0: FSF v2.0 states that Google DeepMind will define a set of “early warning evaluations” with a specific “alert threshold” that flags when a CC.  
  Evidence: qw/before.json prov-fsf-v3-0-alert-threshold subject=fsf-v3-0, prov-fsf-v2-0-alert-threshold subject=fsf-v2-0; qw/before-evidence.json evidence-provchange-fsf-v3-0-alert-threshold-later note: 'the edition’s own wording is quoted in its provision record'
- **8. `provchange-fsf-v3-1-alert-threshold`** (inferenceRationale): **agree**. Both provision IDs resolve to states_provision records whose subjects match the provchange's later/earlier editions in order, with quote-type evidence at the stated locators; 'its provision record' is faithful and keeps the pointer. No ID left behind.  
  Identifiers: `prov-fsf-v3-1-alert-threshold` → Provision record (states_provision) of edition fsf-v3-1: FSF v3.1 states that, for CCLs, Google DeepMind defines alert thresholds, which may draw on evaluation results, expert assessments and other; `prov-fsf-v3-0-alert-threshold` → Provision record (states_provision) of edition fsf-v3-0: FSF v3.0 states that early warning evaluations assess the proximity of a model to a CCL and that the alert thresholds defined for them are d.  
  Evidence: qw/before.json prov-fsf-v3-1-alert-threshold subject=fsf-v3-1, prov-fsf-v3-0-alert-threshold subject=fsf-v3-0; qw/before-evidence.json evidence-provchange-fsf-v3-1-alert-threshold-later note: 'the edition’s own wording is quoted in its provision record'
- **9. `provchange-fsf-v3-0-pre-deployment-review`** (inferenceRationale): **agree**. Both provision IDs resolve to states_provision records whose subjects match the provchange's later/earlier editions in order, with quote-type evidence at the stated locators; 'its provision record' is faithful and keeps the pointer. No ID left behind.  
  Identifiers: `prov-fsf-v3-0-pre-deployment-review` → Provision record (states_provision) of edition fsf-v3-0: FSF v3.0 states that, in the deployment mitigation process for misuse CCLs, external deployments of a model take place only after the approp; `prov-fsf-v2-0-pre-deployment-review` → Provision record (states_provision) of edition fsf-v2-0: FSF v2.0 states that general availability deployment of a model takes place only after the appropriate corporate governance body determines .  
  Evidence: qw/before.json prov-fsf-v3-0-pre-deployment-review subject=fsf-v3-0, prov-fsf-v2-0-pre-deployment-review subject=fsf-v2-0; qw/before-evidence.json evidence-provchange-fsf-v3-0-pre-deployment-review-later note: 'the edition’s own wording is quoted in its provision record'
- **10. `provchange-fsf-v3-1-pre-deployment-review`** (inferenceRationale): **agree**. Both provision IDs resolve to states_provision records whose subjects match the provchange's later/earlier editions in order, with quote-type evidence at the stated locators; 'its provision record' is faithful and keeps the pointer. No ID left behind.  
  Identifiers: `prov-fsf-v3-1-pre-deployment-review` → Provision record (states_provision) of edition fsf-v3-1: FSF v3.1 states that, in the deployment mitigation process for misuse T/CCLs, external deployments of a model take place only after the appr; `prov-fsf-v3-0-pre-deployment-review` → Provision record (states_provision) of edition fsf-v3-0: FSF v3.0 states that, in the deployment mitigation process for misuse CCLs, external deployments of a model take place only after the approp.  
  Evidence: qw/before.json prov-fsf-v3-1-pre-deployment-review subject=fsf-v3-1, prov-fsf-v3-0-pre-deployment-review subject=fsf-v3-0; qw/before-evidence.json evidence-provchange-fsf-v3-1-pre-deployment-review-later note: 'the edition’s own wording is quoted in its provision record'
- **11. `provchange-preparedness-v2-high-deployment-restriction`** (inferenceRationale): **agree**. Both provision IDs resolve to states_provision records whose subjects match the provchange's later/earlier editions in order, with quote-type evidence at the stated locators; 'its provision record' is faithful and keeps the pointer. No ID left behind.  
  Identifiers: `prov-preparedness-v2-high-deployment-restriction` → Provision record (states_provision) of edition preparedness-v2: Preparedness Framework Version 2 commits OpenAI not to deploy a model that reaches a High capability threshold until the associated risks ar; `prov-preparedness-beta-2023-high-deployment-restriction` → Provision record (states_provision) of edition preparedness-beta-2023: Preparedness Framework (Beta) states that only models with a post-mitigation score of “medium” or below can be deployed..  
  Evidence: qw/before.json prov-preparedness-v2-high-deployment-restriction subject=preparedness-v2, prov-preparedness-beta-2023-high-deployment-restriction subject=preparedness-beta-2023; qw/before-evidence.json evidence-provchange-preparedness-v2-high-deployment-restriction-later note: 'the edition’s own wording is quoted in its provision record'
- **12. `provchange-meta-aasf-v2-0-high-threshold`** (inferenceRationale): **agree**. Both provision IDs resolve to states_provision records whose subjects match the provchange's later/earlier editions in order, with quote-type evidence at the stated locators; 'its provision record' is faithful and keeps the pointer. No ID left behind.  
  Identifiers: `prov-meta-aasf-v2-0-high-threshold` → Provision record (states_provision) of edition meta-aasf-v2-0: Advanced AI Scaling Framework v2 states that the high risk threshold applies where deployment of the Frontier AI could substantially contrib; `prov-meta-faf-v1-1-high-threshold` → Provision record (states_provision) of edition meta-faf-v1-1: Frontier AI Framework v1.1 states that a model is at the high risk threshold when it provides significant uplift towards execution of a thre.  
  Evidence: qw/before.json prov-meta-aasf-v2-0-high-threshold subject=meta-aasf-v2-0, prov-meta-faf-v1-1-high-threshold subject=meta-faf-v1-1; qw/before-evidence.json evidence-provchange-meta-aasf-v2-0-high-threshold-later note: 'the edition’s own wording is quoted in its provision record'
- **13. `provchange-fsf-v3-0-government-disclosure`** (inferenceRationale): **agree**. Both provision IDs resolve to states_provision records whose subjects match the provchange's later/earlier editions in order, with quote-type evidence at the stated locators; 'its provision record' is faithful and keeps the pointer. No ID left behind.  
  Identifiers: `prov-fsf-v3-0-government-disclosure` → Provision record (states_provision) of edition fsf-v3-0: FSF v3.0 states that if Google DeepMind assesses that a model has reached a CCL that poses an unmitigated and material risk to overall publi; `prov-fsf-v2-0-government-disclosure` → Provision record (states_provision) of edition fsf-v2-0: FSF v2.0 states that if Google DeepMind assesses that a model has reached a CCL that poses an unmitigated and material risk to overall publi.  
  Evidence: qw/before.json prov-fsf-v3-0-government-disclosure subject=fsf-v3-0, prov-fsf-v2-0-government-disclosure subject=fsf-v2-0; qw/before-evidence.json evidence-provchange-fsf-v3-0-government-disclosure-later note: 'the edition’s own wording is quoted in its provision record'
- **14. `provchange-rsp-v2-0-pause-training`** (inferenceRationale): **agree**. Both provision IDs resolve to states_provision records whose subjects match the provchange's later/earlier editions in order, with quote-type evidence at the stated locators; 'its provision record' is faithful and keeps the pointer. No ID left behind.  
  Identifiers: `prov-rsp-v2-0-pause-training` → Provision record (states_provision) of edition rsp-v2-0: RSP v2.0 states that if a model in pretraining has capabilities comparable to or greater than the model that requires the ASL-3 Security Sta; `prov-rsp-2023-pause-training` → Provision record (states_provision) of edition rsp-2023: RSP v1.0 states that Anthropic commits to pause training before a model's capability level outstrips the Containment Measures it has impleme.  
  Evidence: qw/before.json prov-rsp-v2-0-pause-training subject=rsp-v2-0, prov-rsp-2023-pause-training subject=rsp-2023; qw/before-evidence.json evidence-provchange-rsp-v2-0-pause-training-later note: 'the edition’s own wording is quoted in its provision record'
- **15. `provchange-rsp-v2-0-policy-change-approval`** (inferenceRationale): **agree**. Both provision IDs resolve to states_provision records whose subjects match the provchange's later/earlier editions in order, with quote-type evidence at the stated locators; 'its provision record' is faithful and keeps the pointer. No ID left behind.  
  Identifiers: `prov-rsp-v2-0-policy-change-approval` → Provision record (states_provision) of edition rsp-v2-0: RSP v2.0 states that changes to the policy will be proposed by the CEO and the Responsible Scaling Officer and approved by the Board of Dire; `prov-rsp-2023-policy-change-approval` → Provision record (states_provision) of edition rsp-2023: RSP v1.0 states that Anthropic will follow an Update Process for the policy that includes approval by the board of directors following consu.  
  Evidence: qw/before.json prov-rsp-v2-0-policy-change-approval subject=rsp-v2-0, prov-rsp-2023-policy-change-approval subject=rsp-2023; qw/before-evidence.json evidence-provchange-rsp-v2-0-policy-change-approval-later note: 'the edition’s own wording is quoted in its provision record'
- **16. `provchange-fsf-v2-0-response-plan`** (inferenceRationale): **agree**. Both provision IDs resolve to states_provision records whose subjects match the provchange's later/earlier editions in order, with quote-type evidence at the stated locators; 'its provision record' is faithful and keeps the pointer. No ID left behind.  
  Identifiers: `prov-fsf-v2-0-response-plan` → Provision record (states_provision) of edition fsf-v2-0: FSF v2.0 states that when a model reaches an alert threshold for a CCL, Google DeepMind will assess the model's proximity to the CCL and ana; `prov-fsf-2024-response-plan` → Provision record (states_provision) of edition fsf-2024: FSF v1.0 states that when a model reaches evaluation thresholds (passes a set of early warning evaluations), Google DeepMind will formulate .  
  Evidence: qw/before.json prov-fsf-v2-0-response-plan subject=fsf-v2-0, prov-fsf-2024-response-plan subject=fsf-2024; qw/before-evidence.json evidence-provchange-fsf-v2-0-response-plan-later note: 'the edition’s own wording is quoted in its provision record'
- **17. `provchange-fsf-v3-1-response-plan-distant-from-ccl`** (inferenceRationale): **agree**. Both provision IDs resolve to states_provision records whose subjects match the provchange's later/earlier editions in order, with quote-type evidence at the stated locators; 'its provision record' is faithful and keeps the pointer. No ID left behind.  
  Identifiers: `prov-fsf-v3-1-response-plan-distant-from-ccl` → Provision record (states_provision) of edition fsf-v3-1: FSF v3.1 states that if Google DeepMind assesses that risks stemming from the model remain acceptable and model capabilities remain distant ; `prov-fsf-v3-0-response-plan-distant-from-ccl` → Provision record (states_provision) of edition fsf-v3-0: FSF v3.0 states that where model capabilities remain quite distant from a CCL, a response plan may involve the adoption of additional capabi.  
  Evidence: qw/before.json prov-fsf-v3-1-response-plan-distant-from-ccl subject=fsf-v3-1, prov-fsf-v3-0-response-plan-distant-from-ccl subject=fsf-v3-0; qw/before-evidence.json evidence-provchange-fsf-v3-1-response-plan-distant-from-ccl-later note: 'the edition’s own wording is quoted in its provision record'
- **18. `provchange-fsf-v3-0-security-level-adjustment`** (inferenceRationale): **agree**. Both provision IDs resolve to states_provision records whose subjects match the provchange's later/earlier editions in order, with quote-type evidence at the stated locators; 'its provision record' is faithful and keeps the pointer. No ID left behind.  
  Identifiers: `prov-fsf-v3-0-security-level-adjustment` → Provision record (states_provision) of edition fsf-v3-0: FSF v3.0 states that an adjustment of its recommended security levels may occur if, for example, a model does not possess capabilities meani; `prov-fsf-v2-0-security-level-adjustment` → Provision record (states_provision) of edition fsf-v2-0: FSF v2.0 states that an adjustment of its recommended security levels may occur if, for example, a model does not possess capabilities meani.  
  Evidence: qw/before.json prov-fsf-v3-0-security-level-adjustment subject=fsf-v3-0, prov-fsf-v2-0-security-level-adjustment subject=fsf-v2-0; qw/before-evidence.json evidence-provchange-fsf-v3-0-security-level-adjustment-later note: 'the edition’s own wording is quoted in its provision record'
- **19. `provchange-fsf-v3-1-deployment-mitigation-scope`** (inferenceRationale): **agree**. Both provision IDs resolve to states_provision records whose subjects match the provchange's later/earlier editions in order, with quote-type evidence at the stated locators; 'its provision record' is faithful and keeps the pointer. No ID left behind.  
  Identifiers: `prov-fsf-v3-1-deployment-mitigation-scope` → Provision record (states_provision) of edition fsf-v3-1: FSF v3.1 states, of its misuse risk acceptance criterion on deployment mitigations, that this is required only for external deployment, not ; `prov-fsf-v3-0-deployment-mitigation-scope` → Provision record (states_provision) of edition fsf-v3-0: FSF v3.0 states, of its misuse risk acceptance criterion on deployment mitigations, that this is required only for external deployment, not .  
  Evidence: qw/before.json prov-fsf-v3-1-deployment-mitigation-scope subject=fsf-v3-1, prov-fsf-v3-0-deployment-mitigation-scope subject=fsf-v3-0; qw/before-evidence.json evidence-provchange-fsf-v3-1-deployment-mitigation-scope-later note: 'the edition’s own wording is quoted in its provision record'
- **20. `provchange-fsf-v3-1-framework-update-review`** (inferenceRationale): **agree**. Both provision IDs resolve to states_provision records whose subjects match the provchange's later/earlier editions in order, with quote-type evidence at the stated locators; 'its provision record' is faithful and keeps the pointer. No ID left behind.  
  Identifiers: `prov-fsf-v3-1-framework-update-review` → Provision record (states_provision) of edition fsf-v3-1: FSF v3.1 states that the Frontier Safety Framework will be reviewed at least once a year.; `prov-fsf-v3-0-framework-update-review` → Provision record (states_provision) of edition fsf-v3-0: FSF v3.0 states that the Frontier Safety Framework will be updated at least once a year..  
  Evidence: qw/before.json prov-fsf-v3-1-framework-update-review subject=fsf-v3-1, prov-fsf-v3-0-framework-update-review subject=fsf-v3-0; qw/before-evidence.json evidence-provchange-fsf-v3-1-framework-update-review-later note: 'the edition’s own wording is quoted in its provision record'
- **21. `provchange-preparedness-v2-critical-development-restriction`** (inferenceRationale): **agree**. Both provision IDs resolve to states_provision records whose subjects match the provchange's later/earlier editions in order, with quote-type evidence at the stated locators; 'its provision record' is faithful and keeps the pointer. No ID left behind.  
  Identifiers: `prov-preparedness-v2-critical-development-restriction` → Provision record (states_provision) of edition preparedness-v2: Preparedness Framework Version 2 states that if a model under development reaches a Critical capability threshold, OpenAI also requires safe; `prov-preparedness-beta-2023-critical-development-restriction` → Provision record (states_provision) of edition preparedness-beta-2023: Preparedness Framework (Beta) states that only models with a post-mitigation score of “high” or below can be developed further..  
  Evidence: qw/before.json prov-preparedness-v2-critical-development-restriction subject=preparedness-v2, prov-preparedness-beta-2023-critical-development-restriction subject=preparedness-beta-2023; qw/before-evidence.json evidence-provchange-preparedness-v2-critical-development-restriction-later note: 'the edition’s own wording is quoted in its provision record'
- **22. `provchange-preparedness-v2-final-decision-authority`** (inferenceRationale): **agree**. Both provision IDs resolve to states_provision records whose subjects match the provchange's later/earlier editions in order, with quote-type evidence at the stated locators; 'its provision record' is faithful and keeps the pointer. No ID left behind.  
  Identifiers: `prov-preparedness-v2-final-decision-authority` → Provision record (states_provision) of edition preparedness-v2: Preparedness Framework Version 2 states that OpenAI Leadership can approve or reject the Safety Advisory Group’s recommendations and that th; `prov-preparedness-beta-2023-final-decision-authority` → Provision record (states_provision) of edition preparedness-beta-2023: Preparedness Framework (Beta) states that there is an advisory group, the Safety Advisory Group, to provide nuanced input and recommendation.  
  Evidence: qw/before.json prov-preparedness-v2-final-decision-authority subject=preparedness-v2, prov-preparedness-beta-2023-final-decision-authority subject=preparedness-beta-2023; qw/before-evidence.json evidence-provchange-preparedness-v2-final-decision-authority-later note: 'the edition’s own wording is quoted in its provision record'
- **23. `provchange-meta-aasf-v2-0-moderate-threshold`** (inferenceRationale): **agree**. Both provision IDs resolve to states_provision records whose subjects match the provchange's later/earlier editions in order, with quote-type evidence at the stated locators; 'its provision record' is faithful and keeps the pointer. No ID left behind.  
  Identifiers: `prov-meta-aasf-v2-0-moderate-threshold` → Provision record (states_provision) of edition meta-aasf-v2-0: Advanced AI Scaling Framework v2.0 states, in the 'Moderate or lower' row of Table 1, that the Frontier AI shows relevant capabilities but c; `prov-meta-faf-v1-1-moderate-threshold` → Provision record (states_provision) of edition meta-faf-v1-1: Frontier AI Framework v1.1 states, in the Moderate row of Table 1, that the model would not provide significant uplift towards execution of .  
  Evidence: qw/before.json prov-meta-aasf-v2-0-moderate-threshold subject=meta-aasf-v2-0, prov-meta-faf-v1-1-moderate-threshold subject=meta-faf-v1-1; qw/before-evidence.json evidence-provchange-meta-aasf-v2-0-moderate-threshold-later note: 'the edition’s own wording is quoted in its provision record'
- **24. `prov-openai-group-pbc-cert-class-n-elections`** (qualification): **agree**. Rewrite 'see the record of the Foundation’s right to elect the board' names the referent correctly (Foundation's director-appointment/replacement right via Class N); keeps 'stated by OpenAI', so attribution is preserved. 'Elect' vs the record's 'appoints' is consistent with the provision's director-election framing.  
  Identifiers: `cs-openai-foundation-elects-pbc-directors` → OpenAI's statement that the OpenAI Foundation, via Class N rights, appoints and can replace all OpenAI Group PBC directors (holds_control_right).  
  Evidence: qw/before.json cs-openai-foundation-elects-pbc-directors: 'OpenAI states that the OpenAI Foundation ... appoints all members of OpenAI Group’s board and can replace directors at any time.'
- **25. `provchange-anthropic-coi-2024-01-29-class-t-phase-in`** (inferenceRationale): **agree**. IDs dropped; certificates still identified by filing dates 2023-09-21 and 2024-01-29, quotes and article references unchanged.  
  Identifiers: `prov-anthropic-coi-2023-09-21-class-t-phase-in` → Provision record for the Class T phase-in definitions in the certificate filed 2023-09-21; `prov-anthropic-coi-2024-01-29-class-t-phase-in` → Provision record for the Class T phase-in definitions in the certificate filed 2024-01-29.  
  Evidence: qw/before.json prov-anthropic-coi-2023-09-21-class-t-phase-in / prov-anthropic-coi-2024-01-29-class-t-phase-in subjects anthropic-coi-2023-09-21 / anthropic-coi-2024-01-29
- **26. `cm-wh-2023-07-published`** (qualification): **agree**. ID dropped; paraphrase matches the referenced provision record. Nothing lost.  
  Identifiers: `prov-wh-2023-07-duration` → July 2023 White House commitments text: commitments intended to remain in effect until regulations on substantially the same issues come into force.  
  Evidence: qw/before.json prov-wh-2023-07-duration: 'companies intend the voluntary commitments to remain in effect until regulations covering substantially the same issues come into force.'
- **27. `cm-wh-2023-09-adobe`** (qualification): **agree**. ID dropped; sentence still states the scope difference. The comparison record is reachable from the September text's edition history; no needed pointer lost.  
  Identifiers: `provchange-wh-2023-09-scope` → Inferred change record: September 2023 text measures scope against the company's own most advanced model instead of the industry frontier.  
  Evidence: qw/before.json provchange-wh-2023-09-scope: wh-voluntary-ai-commitments-2023-09 changes_from wh-voluntary-ai-commitments-2023-07 (scope clause)
- **28. `cm-wh-2023-09-cohere`** (qualification): **agree**. ID dropped; sentence still states the scope difference. The comparison record is reachable from the September text's edition history; no needed pointer lost.  
  Identifiers: `provchange-wh-2023-09-scope` → Inferred change record: September 2023 text measures scope against the company's own most advanced model instead of the industry frontier.  
  Evidence: qw/before.json provchange-wh-2023-09-scope: wh-voluntary-ai-commitments-2023-09 changes_from wh-voluntary-ai-commitments-2023-07 (scope clause)
- **29. `cm-wh-2023-09-ibm`** (qualification): **agree**. ID dropped; sentence still states the scope difference. The comparison record is reachable from the September text's edition history; no needed pointer lost.  
  Identifiers: `provchange-wh-2023-09-scope` → Inferred change record: September 2023 text measures scope against the company's own most advanced model instead of the industry frontier.  
  Evidence: qw/before.json provchange-wh-2023-09-scope: wh-voluntary-ai-commitments-2023-09 changes_from wh-voluntary-ai-commitments-2023-07 (scope clause)
- **30. `cm-wh-2023-09-nvidia`** (qualification): **agree**. ID dropped; sentence still states the scope difference. The comparison record is reachable from the September text's edition history; no needed pointer lost.  
  Identifiers: `provchange-wh-2023-09-scope` → Inferred change record: September 2023 text measures scope against the company's own most advanced model instead of the industry frontier.  
  Evidence: qw/before.json provchange-wh-2023-09-scope: wh-voluntary-ai-commitments-2023-09 changes_from wh-voluntary-ai-commitments-2023-07 (scope clause)
- **31. `cm-wh-2023-09-palantir`** (qualification): **agree**. ID dropped; sentence still states the scope difference. The comparison record is reachable from the September text's edition history; no needed pointer lost.  
  Identifiers: `provchange-wh-2023-09-scope` → Inferred change record: September 2023 text measures scope against the company's own most advanced model instead of the industry frontier.  
  Evidence: qw/before.json provchange-wh-2023-09-scope: wh-voluntary-ai-commitments-2023-09 changes_from wh-voluntary-ai-commitments-2023-07 (scope clause)
- **32. `cm-wh-2023-09-salesforce`** (qualification): **agree**. ID dropped; sentence still states the scope difference. The comparison record is reachable from the September text's edition history; no needed pointer lost.  
  Identifiers: `provchange-wh-2023-09-scope` → Inferred change record: September 2023 text measures scope against the company's own most advanced model instead of the industry frontier.  
  Evidence: qw/before.json provchange-wh-2023-09-scope: wh-voluntary-ai-commitments-2023-09 changes_from wh-voluntary-ai-commitments-2023-07 (scope clause)
- **33. `cm-wh-2023-09-scale-ai`** (qualification): **agree**. ID dropped; sentence still states the scope difference. The comparison record is reachable from the September text's edition history; no needed pointer lost.  
  Identifiers: `provchange-wh-2023-09-scope` → Inferred change record: September 2023 text measures scope against the company's own most advanced model instead of the industry frontier.  
  Evidence: qw/before.json provchange-wh-2023-09-scope: wh-voluntary-ai-commitments-2023-09 changes_from wh-voluntary-ai-commitments-2023-07 (scope clause)
- **34. `cm-wh-2023-09-stability-ai`** (qualification): **agree**. ID dropped; sentence still states the scope difference. The comparison record is reachable from the September text's edition history; no needed pointer lost.  
  Identifiers: `provchange-wh-2023-09-scope` → Inferred change record: September 2023 text measures scope against the company's own most advanced model instead of the industry frontier.  
  Evidence: qw/before.json provchange-wh-2023-09-scope: wh-voluntary-ai-commitments-2023-09 changes_from wh-voluntary-ai-commitments-2023-07 (scope clause)
- **35. `provchange-wh-2023-09-scope`** (inferenceRationale): **agree**. IDs dropped; quotes and text identifications intact.  
  Identifiers: `prov-wh-2023-07-scope` → July 2023 text scope clause (industry frontier); `prov-wh-2023-09-scope` → September 2023 text scope clause (company's own most advanced model).  
  Evidence: qw/before.json prov-wh-2023-07-scope, prov-wh-2023-09-scope statements quote the same phrases
- **36. `cm-link-rsp-v2-0-wh`** (qualification): **agree**. ID dropped; the paired record (same edition, the other commitment) exists and is named in words. Faithful.  
  Identifiers: `cm-link-rsp-v2-0-seoul` → Provision record (references_commitment) of edition rsp-v2-0: Anthropic’s Responsible Scaling Policy v2.0 states that the policy also helps satisfy Anthropic’s Frontier AI Safety Commitments (2024)..  
  Evidence: qw/before.json cm-link-rsp-v2-0-seoul: Anthropic’s Responsible Scaling Policy v2.0 states that the policy also helps satisfy Anthropic’s Frontier AI Safety Commitments (2024).
- **37. `cm-link-rsp-v2-1-wh`** (qualification): **agree**. ID dropped; the paired record (same edition, the other commitment) exists and is named in words. Faithful.  
  Identifiers: `cm-link-rsp-v2-1-seoul` → Provision record (references_commitment) of edition rsp-v2-1: Anthropic’s Responsible Scaling Policy v2.1 states that the policy also helps satisfy Anthropic’s Frontier AI Safety Commitments (2024)..  
  Evidence: qw/before.json cm-link-rsp-v2-1-seoul: Anthropic’s Responsible Scaling Policy v2.1 states that the policy also helps satisfy Anthropic’s Frontier AI Safety Commitments (2024).
- **38. `cm-link-rsp-v2-2-wh`** (qualification): **agree**. ID dropped; the paired record (same edition, the other commitment) exists and is named in words. Faithful.  
  Identifiers: `cm-link-rsp-v2-2-seoul` → Provision record (references_commitment) of edition rsp-v2-2: Anthropic’s Responsible Scaling Policy v2.2 states that the policy also helps satisfy Anthropic’s Frontier AI Safety Commitments (2024)..  
  Evidence: qw/before.json cm-link-rsp-v2-2-seoul: Anthropic’s Responsible Scaling Policy v2.2 states that the policy also helps satisfy Anthropic’s Frontier AI Safety Commitments (2024).
- **39. `cm-seoul-meta`** (qualification): **agree**. ID dropped; attribution, date (May 2024) and wording match the referenced link record.  
  Identifiers: `cm-link-meta-faf-v1-1-seoul` → Meta FAF v1.1 references the Frontier AI Safety Commitments, saying Meta signed them in May 2024.  
  Evidence: qw/before.json cm-link-meta-faf-v1-1-seoul: Meta’s Frontier AI Framework v1.1 opens its scope section by stating that, in line with the Frontier AI Safety Commitments, which it says Meta signed in May 2024, the framework relates to Meta’s forthcoming most advanced
- **40. `cm-seoul-microsoft`** (qualification): **agree**. ID dropped; attribution, date (May 2024) and wording match the referenced link record.  
  Identifiers: `cm-link-ms-fgf-2025-seoul` → Microsoft FGF v1 (Feb 2025) says it originates in the Frontier AI Safety Commitments made by Microsoft and fifteen other labs in May 2024.  
  Evidence: qw/before.json cm-link-ms-fgf-2025-seoul: Microsoft’s Frontier Governance Framework, Version 1 (February 2025), states that the framework has its genesis in the voluntary Frontier AI Safety Commitments that Microsoft and fifteen other AI labs made in May 2024.
- **41. `cm-link-rsp-v2-0-seoul`** (qualification): **agree**. ID dropped; the paired record (same edition, the other commitment) exists and is named in words. Faithful.  
  Identifiers: `cm-link-rsp-v2-0-wh` → Provision record (references_commitment) of edition rsp-v2-0: Anthropic’s Responsible Scaling Policy v2.0 states that the policy also helps satisfy Anthropic’s Voluntary White House Commitments (2023)..  
  Evidence: qw/before.json cm-link-rsp-v2-0-wh: Anthropic’s Responsible Scaling Policy v2.0 states that the policy also helps satisfy Anthropic’s Voluntary White House Commitments (2023).
- **42. `cm-link-rsp-v2-1-seoul`** (qualification): **agree**. ID dropped; the paired record (same edition, the other commitment) exists and is named in words. Faithful.  
  Identifiers: `cm-link-rsp-v2-1-wh` → Provision record (references_commitment) of edition rsp-v2-1: Anthropic’s Responsible Scaling Policy v2.1 states that the policy also helps satisfy Anthropic’s Voluntary White House Commitments (2023)..  
  Evidence: qw/before.json cm-link-rsp-v2-1-wh: Anthropic’s Responsible Scaling Policy v2.1 states that the policy also helps satisfy Anthropic’s Voluntary White House Commitments (2023).
- **43. `cm-link-rsp-v2-2-seoul`** (qualification): **agree**. ID dropped; the paired record (same edition, the other commitment) exists and is named in words. Faithful.  
  Identifiers: `cm-link-rsp-v2-2-wh` → Provision record (references_commitment) of edition rsp-v2-2: Anthropic’s Responsible Scaling Policy v2.2 states that the policy also helps satisfy Anthropic’s Voluntary White House Commitments (2023)..  
  Evidence: qw/before.json cm-link-rsp-v2-2-wh: Anthropic’s Responsible Scaling Policy v2.2 states that the policy also helps satisfy Anthropic’s Voluntary White House Commitments (2023).
- **44. `cm-eu-code-intent-openai`** (qualification): **agree**. ID dropped; 'the listing is a separate record' still conveys the separation of intention and listing. The listing record is the same company–Code pair, so a reader can find it; minor loss of precision only.  
  Identifiers: `cm-eu-code-openai` → OpenAI on the Commission's GPAI Code signatory list (from 2025-08-01).  
  Evidence: qw/before.json cm-eu-code-openai: OpenAI appears on the European Commission’s list of signatories of the General-Purpose AI Code of Practice from the list’s first publication on 1 August 2025, and is still listed in the version last u
- **45. `cm-eu-code-intent-anthropic`** (qualification): **agree**. ID dropped; 'the listing is a separate record' still conveys the separation of intention and listing. The listing record is the same company–Code pair, so a reader can find it; minor loss of precision only.  
  Identifiers: `cm-eu-code-anthropic` → Anthropic on the Commission's GPAI Code signatory list (from 2025-08-01).  
  Evidence: qw/before.json cm-eu-code-anthropic: Anthropic appears on the European Commission’s list of signatories of the General-Purpose AI Code of Practice from the list’s first publication on 1 August 2025, and is still listed in the version las
- **46. `cm-eu-code-intent-google`** (qualification): **agree**. ID dropped; 'the listing is a separate record' still conveys the separation of intention and listing. The listing record is the same company–Code pair, so a reader can find it; minor loss of precision only.  
  Identifiers: `cm-eu-code-google` → Google on the Commission's GPAI Code signatory list (from 2025-08-01).  
  Evidence: qw/before.json cm-eu-code-google: Google appears on the European Commission’s list of signatories of the General-Purpose AI Code of Practice from the list’s first publication on 1 August 2025, and is still listed in the version last u
- **47. `cm-link-ms-fgf-2026-eu-code`** (qualification): **agree**. ID dropped; referent is the ms-fgf-2026 references_commitment california-sb-53 record, whose statement includes the change-log sentence. Faithful.  
  Identifiers: `sb-link-ms-fgf-2026` → Microsoft FGF (Feb 2026) references California SB 53 (TFAIA), incl. in its change log.  
  Evidence: qw/before.json sb-link-ms-fgf-2026: 'Its change log describes the edition as a one-year update following finalisation of the EU GPAI Code of Practice, New York's RAISE Act and TFAIA.'

### Corporate structure, absences, SB 53 links, evaluation, assessment

- **1. `eval-i-rsp-christiano-credit`** (qualification): **agree**. Rewrite names the referent accurately (announcement, explicit credit, ARC Evals' framework); no qualification changed.  
  Identifiers: `rsp-credits-arc-2023` → claim: The RSP announcement explicitly credited ARC Evals' framework as inspiring Anthropic's approach.  
  Evidence: qw/before.json rsp-credits-arc-2023: 'The RSP announcement explicitly credited ARC Evals’ framework as inspiring Anthropic’s approach.'
- **2. `assessed-preparedness-v2-high-deployment-mitigation`** (qualification): **agree**. 'the provision record for Version 2' is faithful in context ('the rule' is the High-deployment restriction); slightly generic since Version 2 has several provision records, but the sentence's subject disambiguates.  
  Identifiers: `prov-preparedness-v2-high-deployment-restriction` → claim: Preparedness Framework Version 2 commits OpenAI not to deploy a model reaching a High threshold until risks are sufficiently minimized.  
  Evidence: qw/before.json prov-preparedness-v2-high-deployment-restriction: 'Preparedness Framework Version 2 commits OpenAI not to deploy a model that reaches a High capability threshold until the associated risks are sufficiently minimized.'
- **3. `absent-rsp-v3-0-no-train-deploy-without-safeguards`** (inferenceRationale): **agree**. Dropping the ID loses nothing: the statement names the provision, and the provision key attribute keeps the machine link. The doubled full stop is correctly reduced to one. 'proposed separately as its own provision record' is faithful: the shorthand denoted the separate v3.0 competitor-lead delay provision, and the parenthesis already sits beside the Appendix A scenario wording it refers to.  
  Identifiers: `prov-rsp-v2-2-no-train-deploy-without-safeguards` → RSP v2.2 states its RSP is a public commitment not to train or deploy catastrophic-harm-capable models unless safeguards keep risks below acceptable levels; `..` → doubled full stop after the Changelog page range; `rsp-competitor-lead-delay` → shorthand for the RSP v3.0 Appendix A provision record prov-rsp-v3-0-competitor-lead-delay (delay development/deployment when Anthropic is in the lead).  
  Evidence: qw/before.json absent-rsp-v3-0-no-train-deploy-without-safeguards: statement 'No passage stating the provision “…” was found in … within the inspected scope'; attributes.provision.key present.
- **4. `absent-rsp-v3-1-no-train-deploy-without-safeguards`** (inferenceRationale): **agree**. Dropping the ID loses nothing: the statement names the provision, and the provision key attribute keeps the machine link. The doubled full stop is correctly reduced to one.  
  Identifiers: `prov-rsp-v2-2-no-train-deploy-without-safeguards` → same RSP v2.2 provision; `..` → doubled full stop after the Changelog page range.  
  Evidence: qw/before.json absent-rsp-v3-1-no-train-deploy-without-safeguards: statement 'No passage stating the provision “…” was found in … within the inspected scope'; attributes.provision.key present.
- **5. `absent-rsp-v3-2-no-train-deploy-without-safeguards`** (inferenceRationale): **agree**. Dropping the ID loses nothing: the statement names the provision, and the provision key attribute keeps the machine link. The doubled full stop is correctly reduced to one.  
  Identifiers: `prov-rsp-v2-2-no-train-deploy-without-safeguards` → same RSP v2.2 provision; `..` → doubled full stop after the Changelog page range.  
  Evidence: qw/before.json absent-rsp-v3-2-no-train-deploy-without-safeguards: statement 'No passage stating the provision “…” was found in … within the inspected scope'; attributes.provision.key present.
- **6. `absent-rsp-v3-3-no-train-deploy-without-safeguards`** (inferenceRationale): **agree**. Dropping the ID loses nothing: the statement names the provision, and the provision key attribute keeps the machine link. The doubled full stop is correctly reduced to one.  
  Identifiers: `prov-rsp-v2-2-no-train-deploy-without-safeguards` → same RSP v2.2 provision; `..` → doubled full stop after the Changelog page range.  
  Evidence: qw/before.json absent-rsp-v3-3-no-train-deploy-without-safeguards: statement 'No passage stating the provision “…” was found in … within the inspected scope'; attributes.provision.key present.
- **7. `absent-rsp-v3-4-no-train-deploy-without-safeguards`** (inferenceRationale): **agree**. Dropping the ID loses nothing: the statement names the provision, and the provision key attribute keeps the machine link. The doubled full stop is correctly reduced to one.  
  Identifiers: `prov-rsp-v2-2-no-train-deploy-without-safeguards` → same RSP v2.2 provision; `..` → doubled full stop after the Changelog page range.  
  Evidence: qw/before.json absent-rsp-v3-4-no-train-deploy-without-safeguards: statement 'No passage stating the provision “…” was found in … within the inspected scope'; attributes.provision.key present.
- **8. `absent-fsf-v2-0-evaluation-interval`** (inferenceRationale): **agree**. Dropping the ID loses nothing: the statement names the provision, and the provision key attribute keeps the machine link.  
  Identifiers: `prov-fsf-2024-evaluation-interval` → FSF v1.0: aim to evaluate every 6x effective compute and every 3 months of fine-tuning progress.  
  Evidence: qw/before.json absent-fsf-v2-0-evaluation-interval: statement 'No passage stating the provision “…” was found in … within the inspected scope'; attributes.provision.key present.
- **9. `absent-fsf-v2-0-autonomy-ccl`** (inferenceRationale): **agree**. Dropping the ID loses nothing: the statement names the provision, and the provision key attribute keeps the machine link.  
  Identifiers: `prov-fsf-2024-autonomy-ccl` → FSF v1.0 Autonomy level 1 CCL.  
  Evidence: qw/before.json absent-fsf-v2-0-autonomy-ccl: statement 'No passage stating the provision “…” was found in … within the inspected scope'; attributes.provision.key present.
- **10. `absent-fsf-v3-0-hold-pending-mitigations`** (inferenceRationale): **agree**. Dropping the ID loses nothing: the statement names the provision, and the provision key attribute keeps the machine link.  
  Identifiers: `prov-fsf-v2-0-hold-pending-mitigations` → FSF v2.0: response plan may put deployment/development on hold until adequate mitigations.  
  Evidence: qw/before.json absent-fsf-v3-0-hold-pending-mitigations: statement 'No passage stating the provision “…” was found in … within the inspected scope'; attributes.provision.key present.
- **11. `absent-fsf-v3-0-response-plan-approval`** (inferenceRationale): **agree**. Dropping the ID loses nothing: the statement names the provision, and the provision key attribute keeps the machine link.  
  Identifiers: `prov-fsf-v2-0-response-plan-approval` → FSF v2.0: response plans reviewed/approved by named governance councils.  
  Evidence: qw/before.json absent-fsf-v3-0-response-plan-approval: statement 'No passage stating the provision “…” was found in … within the inspected scope'; attributes.provision.key present.
- **12. `absent-fsf-v3-0-adoption-conditional-on-industry`** (inferenceRationale): **agree**. Dropping the ID loses nothing: the statement names the provision, and the provision key attribute keeps the machine link.  
  Identifiers: `prov-fsf-v2-0-adoption-conditional-on-industry` → FSF v2.0: adoption may depend on field adopting similar protocols.  
  Evidence: qw/before.json absent-fsf-v3-0-adoption-conditional-on-industry: statement 'No passage stating the provision “…” was found in … within the inspected scope'; attributes.provision.key present.
- **13. `absent-preparedness-v2-safety-enhancing-development-exception`** (inferenceRationale): **agree**. Dropping the ID loses nothing: the statement names the provision, and the provision key attribute keeps the machine link.  
  Identifiers: `prov-preparedness-beta-2023-safety-enhancing-development-exception` → Preparedness (Beta): development restriction should not preclude safety-enhancing development.  
  Evidence: qw/before.json absent-preparedness-v2-safety-enhancing-development-exception: statement 'No passage stating the provision “…” was found in … within the inspected scope'; attributes.provision.key present.
- **14. `absent-faif-2026-bio-chem-acceptance-criterion`** (inferenceRationale): **agree**. Dropping the ID loses nothing; the claim statement names the provision and attributes.provision.key keeps the link.  
  Identifiers: `prov-faif-2025-bio-chem-acceptance-criterion` → FAIF Dec 2025: answer rate below 1 of 20 on restricted bio/chem queries.  
  Evidence: qw/before.json prov-faif-2025-bio-chem-acceptance-criterion statement matches the provision named in the claim statement.
- **15. `absent-faif-2026-mask-acceptance-criterion`** (inferenceRationale): **agree**. Dropping the ID loses nothing; the claim statement names the provision and attributes.provision.key keeps the link.  
  Identifiers: `prov-faif-2025-mask-acceptance-criterion` → FAIF Dec 2025: MASK dishonesty rate below 1 of 2.  
  Evidence: qw/before.json prov-faif-2025-mask-acceptance-criterion statement matches the provision named in the claim statement.
- **16. `absent-faif-2026-benefits-may-outweigh-benchmark-risks`** (inferenceRationale): **agree**. Dropping the ID loses nothing; the claim statement names the provision and attributes.provision.key keeps the link.  
  Identifiers: `prov-faif-2025-benefits-may-outweigh-benchmark-risks` → FAIF Dec 2025: benefits may outweigh benchmark-identified risks.  
  Evidence: qw/before.json prov-faif-2025-benefits-may-outweigh-benchmark-risks statement matches the provision named in the claim statement.
- **17. `absent-rsp-v2-0-weights-deletion-decision`** (inferenceRationale): **agree**. Dropping the ID loses nothing; the claim statement names the provision and attributes.provision.key keeps the link. '..' fixed.  
  Identifiers: `prov-rsp-2023-weights-deletion-decision` → RSP v1.0: CISO and CEO convened to decide weight deletion; `..` → doubled full stop.  
  Evidence: qw/before.json prov-rsp-2023-weights-deletion-decision statement matches the provision named in the claim statement.
- **18. `absent-rsp-v3-0-pause-training`** (inferenceRationale): **agree**. Faithful. Side note outside the rewrite: the recorded parity provision (prov-rsp-v3-0-competitor-parity) states meeting or exceeding competitors' risk-reduction posture, not a delay, so 'commits to delay ... in two competitor scenarios' may deserve a separate wording check.  
  Identifiers: `prov-rsp-v2-2-pause-training` → RSP v2.2: pause training until ASL-3 Security Standard implemented; `rsp-competitor-lead-delay` → shorthand for prov-rsp-v3-0-competitor-lead-delay; `rsp-competitor-parity` → shorthand for prov-rsp-v3-0-competitor-parity; `..` → doubled full stop.  
  Evidence: qw/before.json prov-rsp-v3-0-competitor-parity: 'in the scenario where competitors have strong safety measures, Anthropic will ... meet or exceed the overall risk reduction posture of these competitors'
- **19. `absent-rsp-v3-0-restrict-and-pause`** (inferenceRationale): **agree**. Dropping the ID loses nothing; the claim statement names the provision and attributes.provision.key keeps the link. '..' fixed.  
  Identifiers: `prov-rsp-v2-2-restrict-and-pause` → RSP v2.2: restrict deployment and further scaling if Safeguards showing cannot be made; `..` → doubled full stop.  
  Evidence: qw/before.json prov-rsp-v2-2-restrict-and-pause statement matches the provision named in the claim statement.
- **20. `absent-rsp-v3-0-may-proceed-with-safeguards`** (inferenceRationale): **agree**. Dropping the ID loses nothing; the claim statement names the provision and attributes.provision.key keeps the link. '..' fixed.  
  Identifiers: `prov-rsp-v2-2-may-proceed-with-safeguards` → RSP v2.2: may proceed once ASL-3 Required Safeguards met; `..` → doubled full stop.  
  Evidence: qw/before.json prov-rsp-v2-2-may-proceed-with-safeguards statement matches the provision named in the claim statement.
- **21. `absent-meta-aasf-v2-0-critical-pause-investigation`** (inferenceRationale): **agree**. Faithful; 'v2's critical-threshold measure' already describes the referent.  
  Identifiers: `prov-meta-faf-v1-1-critical-pause-investigation` → Meta FAF v1.1: pause development while investigating remaining barriers; `meta-critical-development-measure` → shorthand for prov-meta-aasf-v2-0-critical-development-measure (AASF v2: continue development only if assessments complete and safeguards validated).  
  Evidence: qw/before.json prov-meta-aasf-v2-0-critical-development-measure: 'should either critical-threshold scenario arise, Meta will only continue development ... if ... safeguards are defined, implemented and validated'
- **22. `absent-meta-aasf-v2-0-uplift-assessment-approval`** (inferenceRationale): **agree**. Faithful; the surrounding sentence already describes the threshold-assignment provision.  
  Identifiers: `prov-meta-faf-v1-1-uplift-assessment-approval` → Meta FAF v1.1: senior-level decision-makers approve final uplift assessment; `meta-threshold-assignment-authority` → shorthand for prov-meta-aasf-v2-0-threshold-assignment-authority.  
  Evidence: qw/before.json prov-meta-aasf-v2-0-threshold-assignment-authority: 'the Chief AI Officer and Director of Alignment and Risk will assign a risk threshold.'
- **23. `sb-false-statement-prohibition`** (qualification): **agree**. Rewrite matches the referent (the absence record). It does not point to sb-link-faif-2025, the record of the sentence itself, but neither did the original.  
  Identifiers: `faif-2026-compliance-sentence` → claim: the June 2026 FAIF does not contain the December 2025 edition's TFAIA compliance sentence.  
  Evidence: qw/before.json faif-2026-compliance-sentence: 'The June 2026 FAIF does not contain the December 2025 edition’s sentence asserting compliance with California’s TFAIA.'
- **24. `sb-link-openai-fgf`** (qualification): **disagree**. Minor scope loss: 'applying OpenAI’s Preparedness approach' drops 'relevant parts' and the 'OpenAI describes' attribution, so the pointer reads as if the whole approach is applied as a matter of record.  
  Identifiers: `fgf-applies-preparedness` → claim: OpenAI describes its FGF as applying relevant parts of its continuing Preparedness approach to specific regulatory obligations.  
  Evidence: qw/before.json fgf-applies-preparedness: 'OpenAI describes its Frontier Governance Framework as applying relevant parts of its continuing Preparedness approach to specific regulatory obligations.'  
  Proposed: The existing record of OpenAI’s description of the FGF as applying relevant parts of its Preparedness approach covers the relation to the Preparedness Framework.
- **25. `sb-link-faif-2025`** (qualification): **agree**. Faithful ('record of the June 2026 edition’s changes' matches its changes_from predicate); slightly redundant wording only.  
  Identifiers: `faif-2026-compliance-sentence` → claim (subject faif-2026, predicate changes_from): June 2026 FAIF lacks the December 2025 TFAIA compliance sentence.  
  Evidence: qw/before.json faif-2026-compliance-sentence predicate changes_from.
- **26. `sb-anthropic-fcf-published`** (qualification): **agree**. 'the record of RSP v3.0’s reference to SB 53' names the referent correctly.  
  Identifiers: `sb-link-rsp-v3-0` → RSP v3.0 uses 'catastrophic risk' in its plain meaning and addresses SB 53-type statutory definitions in separate compliance frameworks.  
  Evidence: sb-link-rsp-v3-0: 'where laws such as California SB 53 define this or similar terms ... Anthropic addresses those requirements in separate compliance frameworks.'
- **27. `cs-openai-lp-announced-2019`** (qualification): **agree**. Faithful.  
  Identifiers: `cs-openai-lp-board-control-2019` → March 2019 announcement: OpenAI LP controlled by the OpenAI Nonprofit board.  
  Evidence: cs-openai-lp-board-control-2019: 'OpenAI LP is controlled by the board of OpenAI Nonprofit'
- **28. `cs-openai-lp-board-control-2019`** (qualification): **agree**. Dropping is acceptable: the Form 990 is named in the sentence and 'These records' in the next sentence still reads naturally.  
  Identifiers: `cs-openai-990-2019-gp-llc-controls-lp` → Form 990 TY2019: OpenAI GP LLC is direct controlling entity of OpenAI LP.  
  Evidence: cs-openai-990-2019-gp-llc-controls-lp statement matches the described schedule entry.
- **29. `cs-openai-990-2019-gp-llc-controls-lp`** (qualification): **agree**. Acceptable; 'the two records' now relies on the reader inferring the second schedule entry is its own record, which the sentence makes plausible. '(recorded separately)' would be slightly clearer.  
  Identifiers: `cs-openai-990-2019-inc-controls-gp-llc` → Form 990 TY2019: OpenAI GP LLC a disregarded entity controlled by OpenAI Inc.  
  Evidence: cs-openai-990-2019-inc-controls-gp-llc: 'lists OpenAI GP LLC as a disregarded entity whose direct controlling entity is OpenAI Inc.'
- **30. `cs-altman-board-departure-2023`** (qualification): **agree**. Faithful; dates and scope preserved.  
  Identifiers: `atlas-altman-departure` → board announced Altman's removal as CEO (2023-11-17); `atlas-altman-return` → Altman announced his return as CEO (2023-11-29 snapshot); `cs-altman-board-return-2024` → 8 March 2024 announcement that Altman would rejoin the board.  
  Evidence: atlas-altman-return time snapshot 2023-11-29; cs-altman-board-return-2024 'announced on 8 March 2024'.
- **31. `cs-summers-initial-board-2023`** (qualification): **agree**. Pointer is faithful and the referenced qualification holds the reason; inlining the reason would help but is not required.  
  Identifiers: `cs-taylor-chair-initial-board-2023` → 29 Nov 2023 announcement of initial board: Taylor (chair), Summers, D'Angelo; its qualification gives the reason for recording against OpenAI, Inc..  
  Evidence: cs-taylor-chair-initial-board-2023 qualification: 'The post does not name the legal entity; the role is recorded against OpenAI, Inc., whose board ... describes as the overall governing body.'
- **32. `cs-dangelo-initial-board-2023`** (qualification): **agree**. Pointer is faithful and the referenced qualification holds the reason; inlining the reason would help but is not required.  
  Identifiers: `cs-taylor-chair-initial-board-2023` → 29 Nov 2023 announcement of initial board: Taylor (chair), Summers, D'Angelo; its qualification gives the reason for recording against OpenAI, Inc..  
  Evidence: cs-taylor-chair-initial-board-2023 qualification: 'The post does not name the legal entity; the role is recorded against OpenAI, Inc., whose board ... describes as the overall governing body.'
- **33. `cs-sutskever-board-departure-2023`** (qualification): **agree**. Nothing lost; date precision (May 2024) preserved.  
  Identifiers: `sutskever-openai-departure-announced-2024` → OpenAI announced Sutskever and the company would part ways (2024-05-14).  
  Evidence: sutskever-openai-departure-announced-2024 time 2024-05-14.
- **34. `cs-openai-structure-plan-2024`** (qualification): **agree**. Nothing lost.  
  Identifiers: `cs-openai-nonprofit-retains-control-2025` → 5 May 2025 announcement: nonprofit would retain control.  
  Evidence: cs-openai-nonprofit-retains-control-2025 statement.
- **35. `cs-openai-foundation-elects-pbc-directors`** (qualification): **agree**. Nothing lost.  
  Identifiers: `cs-assessed-openai-recapitalization-control` → contested assessment: Foundation can exercise effective mission-directed control over OpenAI Group PBC.  
  Evidence: cs-assessed-openai-recapitalization-control statement.
- **36. `cs-openai-foundation-removes-pbc-directors`** (qualification): **agree**. Faithful; 'right to elect the board' matches the record (appoints all members).  
  Identifiers: `prov-openai-group-pbc-cert-director-removal` → certificate provision: removal by Class N holder or by two-thirds of other voting power, max one-third of board per twelve months; `cs-openai-foundation-elects-pbc-directors` → OpenAI states the Foundation appoints all OpenAI Group board members via Class N rights.  
  Evidence: cs-openai-foundation-elects-pbc-directors: 'appoints all members of OpenAI Group’s board and can replace directors at any time.'
- **37. `cs-christiano-openai-foundation-board-2026`** (qualification): **agree**. Nothing lost.  
  Identifiers: `cs-christiano-anthropic-ltbt-trustee` → named 19 Sep 2023 as initial LTBT Trustee; stepped down April 2024.  
  Evidence: cs-christiano-anthropic-ltbt-trustee statement.
- **38. `cs-anthropic-legal-form-2021`** (qualification): **disagree**. Dropping the ID removes the only pointer to where the changed wording is recorded; the referenced record is dated by the July 2025 certificate, which a reader would not find from 'May 2021' alone.  
  Identifiers: `cs-anthropic-legal-form-2025` → July 2025 restated certificate's public-benefit wording, also present in the May 2021 restated certificate.  
  Evidence: cs-anthropic-legal-form-2025: 'certificate ... filed on 3 July 2025 ... states its specific public benefit as responsibly developing and maintaining advanced AI for the long term benefit of humanity. The same wording is in Article III of the restated certificate filed on 24 May 2021.'  
  Proposed: The public-benefit wording changed in the restated certificate of May 2021; the later wording is recorded with the certificate of July 2025.
