# Same-family audit: laws compared

- **Auditor:** one fresh-context Claude pass (same model family as the drafters and integrator), 2026-11-01. It was given the questions, the rules, the sample and the cached sources. For each cell it was asked to search the source and form its own answer before reading the pack's cell, then to try to refute the cell. It could not be prevented from reading the cell first; that order is the instruction it was given, not an established fact.
- **Sample:** [audit-sample.json](audit-sample.json), 50 of 135 cells. 28 were targeted: the drafters' borderline calls, the budget overrun, dates of uncertain kind, negative findings, the Chinese rows and the export-control rule's scope. 22 were random, drawn by a seeded linear congruential generator from the other cells.
- **Findings:** [audit/findings.json](audit/findings.json). Each finding records what was read and the auditor's verdict: confirmed, correct (with a fix) or uncertain (with a recommendation).
- **Fixes:** [audit/apply-fixes.py](audit/apply-fixes.py) and [audit/apply-widening.py](audit/apply-widening.py) edit the drafts. The pack is then rebuilt with `build.mjs all`.
- **Limit:** a sample does not certify the cells outside it. Agreement within one model family is not independent corroboration.

## Results

| Sample   | Confirmed | Correct | Uncertain |
| -------- | --------- | ------- | --------- |
| Targeted | 21        | 3       | 4         |
| Random   | 18        | 3       | 1         |
| Total    | 39        | 6       | 5         |

Every sampled quotation matched the cached text at its locator. The auditor also checked translations and the kinds of dates.

## Corrections made

1. **us-eo14110:Q12** (material). The status changed from partly to not found. The 90-day period in Sec. 4.2(a) is the Secretary's deadline, not a date from which companies' duties apply. The passage moved to the passages set aside.
2. **ca-sb53:Q02** (note). The Department of Technology's recommendations are due "on or before 1 January 2027 and annually thereafter", not "annually, from 1 January 2027".
3. **ny-ch699:Q05, Q08** (locators). The printed line numbers are corrected (p. 3, lines 31–32; p. 4, lines 28–30).
4. **eu-code-ss:Q09** (locator). The passage is the sentence before conditions (1)–(5) of Measure 3.5, PDF p. 14, not the last paragraph.
5. **ny-ch96:Q15** (note). The deeming provision is restated in full: compliance "to the extent it meets the standards of, or complies with, the designated federal law, regulation or guidance document".

## Uncertain cases, and how the integrator settled them

- **eu-ai-act:Q09.** Kept as partly. The Q09 criterion now says that protection applying only by reference to another law is partly, matching Q13, and the note says so.
- **cn-genai-measures:Q03.** Kept as not found. The set-aside now covers Article 4(2) explicitly: measures against discrimination in model generation are measures on a single other subject, not a framework on model risks.
- **us-bis-ifr:Q03.** Changed to not found, as the auditor recommended. The data-centre and model-weight security plans are a single other subject and are now recorded as set aside. Q04 follows and becomes not applicable.
- **us-bis-ifr:Q06.** Kept as partly. The note now gives the reason: the assessed party is a data-centre end user, not necessarily a model developer, and the subject is facility security. Raised for the cross-family check.
- **us-bis-ifr:Q10.** Changed to not found. The filing date is a publication-process date, and the signature block is undated. The filing line is set aside.

## Flag outside the sample

The auditor flagged that the New York Chapter 699 row's standing label, "superseded before effect", conflicted with its own Q11 cell. That cell gives a computed effect date of 19 March 2026, before Chapter 96 was signed on 27 March 2026. The standing is now "binding", and the note says that the texts read do not settle whether Chapter 699's text took effect before Chapter 96 was signed.

## Widening after a material correction

The Q12 correction concerned the kind of a date, so every Q10 and Q12 cell (18 cells) was re-read for the same fault. Two notes were changed:

- **eu-ai-act:Q12.** The note now says that the application date of Article 101 (2 August 2026) is a reading of Article 113's exception together with its general date. The text states no separate date for that article.
- **us-eo14110:Q12.** The note is reworded to fit the not-found status.

No other date-kind fault was found.
