# Decision sheet: headlines still under re-check

Nineteen "Earliest located" headlines on 17 propositions are withdrawn on the live site and shown as "Under re-check" with a reason. The decision that matters most is **2–8, whether a text now filed as context or as contesting should be re-filed as stating the proposition**: seven headlines depend on it, and each time the checker read the passage one way and the collection had filed it another.

Sources: `docs/briefs/09-recheck-remaining.md` (step 1); the re-check by Codex, `review/earliest-located-recheck-2026-11-02.md` (cited by role number); Claude's adjudication, `review/recheck-apply-2026-11-02.md` § Roles and § Open decisions 5–7; `review/recheck-decisions-2026-11-02.md` § Still under re-check; `review/archive-fetch-apply-2026-11-02.md` § Decisions applied; `review/audit-sample-fixes-2026-11-02.md` (item 117); `docs/editorial-policy.md` § Earliest located texts. The list of 19 is taken from `data/entities.json` on `main` at 292faf5.

**Terms.** A _record_ files one text on a proposition as stating it, contesting it, or as context only. A _headline_ names the earliest record of a kind ("Earliest located", "Earliest located text that contests it", "Earliest located use of the name"). The _cross-family re-check_ is a check by a model from a different maker (GPT, through Codex) of headlines Claude drafted. The policy does not let Claude overrule that check on a headline alone; the maintainer decides. Where a decision moves a headline to a text that has no record on the proposition yet, the apply step adds one record, with a quoted passage checked against the source.

**Common options.** _Move_: the headline goes to the earlier text. _Keep_: the headline returns to the record that held it before. _Leave withdrawn_: "Under re-check" stays, with its reason, until new evidence. _Drop_: no headline of that kind is shown.

## A. A blocked move (1)

### 1. Y28 "The developers know what they are doing": earliest contesting text (role 106)

Before: SL4 message of 1 August 2001. Checker: move to Yudkowsky's SL4 message of 12 April 2001, which says a competitor could outrun the leading project with more computation. Claude agreed. Blocked because the message is 212 words and its quotable words are already used.

- **a.** Move, with a record that paraphrases the passage and gives its locator, without quoting.
- **b.** Move, and replace an existing quotation from the message with this passage.
- **c.** Leave withdrawn.

_Recommendation: a._ Both families agree; a paraphrase keeps the quotation limit.

- a/b: the headline shows the April 2001 message (a: as a paraphrase).
- c: "Under re-check" stays.

## B. Re-filing a text (2–8)

The checker reads an earlier text as stating (or, for 3, contesting) the proposition; the collection files it as context. Claude was unsure. Option a re-files the text and moves the headline; option b keeps the filing and restores the earlier holder; option c leaves it withdrawn.

### 2. A3 "Recursive self-improvement": earliest located (role 39)

Before: Clemmensen, September 1996. Checker: move to Good (1965), whose machine improves itself by acquiring equipment; the criterion excludes building a better successor unless the same system is improved. Good is filed as context.

_Recommendation: a._ The checker cites a same-machine passage, which is what the criterion asks for; the qualification should say Good also describes a better successor.

- a: the headline shows Good, 1965. b: Clemmensen, 1996. c: "Under re-check".

### 3. Y25 "Interpretability will let us read its mind": earliest contesting text (role 102)

Before: SL4 message of 22 May 2003. Checker: move to the "Creating Friendly AI" seed chapter (wording attested 17 June 2001), which sets conditions under which reading intentions from records works. Filed as context.

_Recommendation: a._ The passage states explicit limits on reading thought, which the criterion's premise concerns.

- a: the headline shows the 2001 chapter. b: the 2003 message. c: "Under re-check".

### 4. Y28 "The developers know what they are doing": earliest located (role 105)

Before: "Creating Friendly AI" (June 2001). Checker: move to an Extropians message of 29 September 2000 giving developers' understanding and sustained work as reasons to defer to their safety judgment. Filed as context.

_Recommendation: a._ Deferring to developers' judgment on those grounds is the criterion's claim.

- a: the headline shows the 2000 message. b: the 2001 text. c: "Under re-check".

### 5. O6 "Heat rejection as a constraint on orbital compute": earliest located (role 160)

Before: Google's Suncatcher blog, November 2025. Checker: move to Lumen Orbit's white paper (December 2024 copy), which requires very large radiators because heat can leave only by radiation. Filed as context, because the paper argues the requirement can be met.

_Recommendation: a,_ with a qualification that the paper argues the requirement can be met. The criterion asks whether the text treats heat as a significant constraint, not whether it calls it unsolvable.

- a: the headline shows Lumen, 2024. b: Suncatcher, 2025. c: "Under re-check".

### 6. O11 "Harm to the sky and debris risk": earliest located (role 165)

Before: Aili, October 2025. Checker: move to Lumen's 2024 paper, which names debris mitigation and collision probability as hurdles for large data centres. Lumen is filed as contesting.

- **a.** Re-file as stating the proposition on its debris part, with a qualification that it says nothing on astronomy, and move.
- **b.** Keep it as contesting; Aili holds the headline.
- **c.** Keep the contesting record and add a second record stating the debris part; move.

_Recommendation: c._ The paper names the risk and argues it can be handled; two records show both without forcing one reading.

- a: the headline shows Lumen; its contesting record goes. b: Aili, 2025. c: Lumen holds the headline and still appears among contesting texts.

### 7. D5 "Synthesis-order screening is a control point": earliest located (role 169)

Before: Sandbrink, 24 June 2023. Checker: move to Soice and others, version 1 of 6 June 2023, which recommends verified DNA-synthesis screening against chatbot-enabled misuse. Filed as context.

_Recommendation: a._ A direct recommendation of screening as a control meets the criterion.

- a: the headline shows Soice and others. b: Sandbrink. c: "Under re-check".

### 8. D7 "Assessment must cover skilled actors": earliest located (role 174)

Before: Brent and McKelvey, June 2025. Checker: move to Sandbrink, version 1 of June 2023, which separates help to non-experts from gains for sophisticated actors and asks for monitoring of design tools. Filed as context.

_Recommendation: a,_ with the checker's limit in the qualification: it is not evidence that earlier evaluations covered skilled actors.

- a: the headline shows Sandbrink, 2023. b: Brent and McKelvey. c: "Under re-check".

## C. Sense and date precision (9–12)

### 9. Y05 "Training on human feedback instils human values": earliest contesting text (role 81)

Before: Extropians message 1587 of 4 August 1999. Checker: move to message 1589 of the same day, sent 15 seconds earlier by its header (18:47:55 against 18:48:10). The dataset stores both by day only.

- **a.** Record the header times on both records and move to 1589.
- **b.** Treat the two as tied by day and keep 1587.
- **c.** Show no headline while two texts tie.

_Recommendation: a._ The send times are printed in the messages, so the finer date is documentary.

- a: the headline shows message 1589, with its time. b: message 1587. c: none.

### 10. Y22 "Build superintelligence as fast as possible": earliest contesting text (role 99)

Before: SL4 message of 13 November 2000, withdrawn by the pre-launch audit because it rejects automatic goodness, not speed. Checker: move to an Extropians reply of 1 August 1999, which withdraws assured benevolence. The question is whether contesting the premise ("good by default") counts as contesting the proposition.

- **a.** Yes: move to the 1999 reply (a new record), filed as contesting the premise.
- **b.** Yes, but the 2000 message is enough: keep it.
- **c.** No: leave without a contesting headline until a text contesting speed is located.

_Recommendation: a._ The criterion names the premise, and the dataset already files premise challenges as contesting elsewhere (for example the Y13 headline admitted on 2 November).

- a: the headline shows the 1999 reply. b: the 2000 message. c: no contesting headline.

### 11. M02 "AI as the automation of tasks": earliest located (role 139)

Before: Frey and Osborne, 2013. Checker: move to Bresnahan, Brynjolfsson and Hitt (1999), which analyses computers taking over decisions through task allocation and discusses AI-related substitution. The criterion asks for AI, not computers in general.

- **a.** Move (a new record), if the quoted passage itself names AI or expert systems; otherwise b.
- **b.** Keep Frey and Osborne.
- **c.** Reword the criterion to cover computerisation, in a new collection version, and move.

_Recommendation: a,_ with its condition. The criterion stays as it is; the passage decides.

- a: the headline shows the 1999 paper. b: Frey and Osborne. c: the collection's question widens.

### 12. D3 "Published evaluations do not establish real-world biological risk": earliest located (role 173)

Before: Peppin and others, December 2024. Checker: move to the GPT-4 system card (March 2023), which separates tested capability from the likelihood of use and notes physical steps that information alone does not provide. That is a caveat about its own evaluation, not about evaluations in general.

- **a.** Move, with a qualification that it is a caveat about the card's own evaluation.
- **b.** Keep Peppin and others.

_Recommendation: a._ The card is itself a published evaluation and states that it does not establish real-world risk; the qualification keeps the limit visible.

- a: the headline shows the GPT-4 card. b: Peppin and others, 2024.

## D. Criteria (13–14)

### 13. R15 "Open models reduce risk": earliest located and earliest contesting (roles 65, 66)

The criterion says releasing model weights. The holders (Goertzel and Pitt 2012 stating; Alexander 2015 contesting) argue about open code. The checker could not decide; on a code reading, Yudkowsky's SL4 message of 12 April 2001 (the message in decision 1) would be the earliest contesting text.

- **a.** Reword the criterion in a new collection version to "model weights or source code"; restore Goertzel and Pitt; move the contesting headline to the April 2001 message (paraphrased, as decision 1).
- **b.** Keep the weights criterion; re-file the code texts as context; leave both headlines withdrawn until a text about weights is located.
- **c.** Keep the criterion and drop both headlines.

_Recommendation: a._ The open-code arguments are the same debate before weights existed as a separate object; b would re-file every record that concerns code.

- a: both headlines return; the criterion says "weights or source code". b/c: no headlines; code texts appear as context.

### 14. O10 "Ground links as a limit on orbital compute": earliest located (role 162)

Before: Suncatcher blog, November 2025. Checker: undecidable; no text states which workloads ground links exclude, as the criterion requires.

- **a.** Keep the criterion and leave withdrawn; the next orbital-compute pass searches for a text stating a workload limit.
- **b.** Reword the criterion to "constrain orbital compute" and re-rank the candidates.

_Recommendation: a._ Rewording would change the proposition to fit the available texts.

- a: "Under re-check" stays. b: a headline returns after a re-ranking.

## E. Texts that cannot yet be ordered (15–18)

The policy decides order by the date from which the wording is attested. Where the earlier text survives only in a later copy, the order is open until an earlier copy is read.

### 15. B1 "Treacherous turn": earliest use of the name (role 5)

Before: Grace's 2014 reading-group page (dated 31 August 2014; the wording may have been added later). Other candidates: Danaher's post (dated 29 July 2014; first copy reached February 2015) and Bostrom's _Superintelligence_ (3 July 2014; book text not held).

- **a.** Ask Codex for early archive copies of both posts and the book's page; decide after.
- **b.** Drop the name headline.

_Recommendation: a._ The name is a coined term, not an ordinary phrase, so the headline is worth settling.

- a: "Under re-check" until Codex reports. b: no name headline.

### 16. W02 "Succession by machines would be acceptable": earliest located (role 112)

Before: Minsky, October 1994 (the copy read is a revised page dated 2 January 1997). Moravec texts attributed to 1979 and 1989 survive in later copies (one attested March 2001).

- **a.** Ask Codex (or a library) for the 1979 and 1989 prints and Minsky's 1994 print; decide after.
- **b.** Restore Minsky now, with a note that earlier-attributed Moravec texts await a print copy.

_Recommendation: a._ Restoring now could reverse again once a print is read.

- a: "Under re-check" until then. b: the headline shows Minsky, with a note.

### 17. W10 "Machine intelligence spreads beyond Earth": earliest located (role 126)

Before: de Garis, 1989. Moravec's work attributed to February 1979 survives only in a later author-hosted copy.

- **a.** Ask Codex for the February 1979 print; decide after.
- **b.** Restore de Garis now, with a note.

_Recommendation: a,_ for the same reason as 16.

- a: "Under re-check" until then. b: the headline shows de Garis, with a note.

### 18. Y08 "Clear warning signs will come before danger": earliest contesting text (audit item 117)

Before: an Extropians message of 6 January 1999, re-filed as context after the cross-family audit sample found it does not address warning signs. No checker verdict on a replacement yet. The earliest remaining contesting records are an SL4 message of 13 July 2005 and the 2006 chapter "AI as a positive and negative factor in global risk".

- **a.** Ask Codex to check the remaining contesting records in date order; the first that meets the criterion takes the headline.
- **b.** Give it to the 13 July 2005 message now.

_Recommendation: a._ The previous holder failed on exactly this kind of reading, so the next one should be checked first.

- a: "Under re-check" until Codex reports. b: the headline shows the 2005 message.

---

Reply with, for example: 1a 2a 3a 4a 5a 6c 7a 8a 9a 10a 11a 12a 13a 14a 15a 16a 17a 18a
