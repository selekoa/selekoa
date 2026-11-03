# Decision sheet: AI and money

The pack records what central banks, the BIS, the IMF, the FSB and financial supervisors have said about machine intelligence, on twelve propositions about financial stability, monetary policy, payments and supervision, plus 30 institutional events. The decision that matters most is **3, how the "Earliest located" headline is chosen** when the earliest text is a speech or a staff paper rather than an institution's own text.

Source: review note `review/ai-money-pack-2026-11-02.md` on branch `ai-money-pack`, sections "Open questions, with recommendations" (numbers 1–13 below match it) and "Housekeeping" (14). Files in `research/ai-money/` on the same branch.

**State.** Nothing is admitted. The cross-family check has not yet run: that is a check by a model from a different maker (GPT, through Codex) of what Claude drafted. It is required before admission; decisions 4 and 5 depend on it.

**Voice** means who a text speaks for: the institution, a committee, staff (with the usual disclaimer that views are the authors' own), or one official in a speech.

## Decisions

### 1. Committee reports

The RBI's FREE-AI Committee report and the ESRB Advisory Scientific Committee report.

- **a.** Attribute them to the committee, never to the authority.
- **b.** Attribute them to the authority.

_Recommendation: a._ Both reports are issued in the committee's name.

- a: these texts are labelled "committee report".
- b: they read as the central bank's or ESRB's own position.

### 2. The IMF Global Financial Stability Report chapter

Its disclaimer attributes the views to IMF staff, but the copy read prints no chapter authors.

- **a.** Institution voice with the disclaimer shown; switch to staff if the PDF prints authors. The same rule for the ECB Financial Stability Review special feature (already staff, with named authors).
- **b.** Staff voice now.

_Recommendation: a._ Without named authors, the IMF is the identifiable author; the disclaimer is shown either way.

- a: labelled IMF, with the disclaimer.
- b: labelled IMF staff.

### 3. One headline across all voices

On seven propositions (U01, U05, U06, U07, U10, U11, U12) the earliest text is a speech or a staff paper.

- **a.** One "Earliest located" headline by wording date across all voices, with the earliest institutional text shown beside it.
- **b.** A tiered rule (institutional texts first), as in the economics collection.
- **c.** Institutional texts only.

_Recommendation: a._ It keeps one comparable headline and still shows the institutional text.

- a: each proposition shows two dates where they differ (any voice; institution).
- b: two separate headlines per proposition.
- c: speeches and staff papers never hold a headline.

### 4. Phillips (Federal Reserve, 1997) on U10, firms' risk management

AI is one item in a list of underwriting tools.

- **a.** Keep as earliest located, with that qualification, if the cross-family check confirms it meets the criterion.
- **b.** Do not count it; the FSB 2017 report holds the headline.

_Recommendation: a._ The criterion asks for the statement, not for AI to be the main subject; the qualification shows the context.

- a: U10's headline is 1997. b: 2017.

### 5. Carney (Bank of England, 2018) on U06, AI matters for monetary policy

He places AI within a "Fourth Industrial Revolution".

- **a.** Keep as earliest located if the cross-family check agrees; otherwise Cook (22 September 2023).
- **b.** Cook now.

_Recommendation: a._

- a: U06's headline is 2018 (or 2023 after the check). b: 2023.

### 6. Texts reporting what others said

The IFC Bulletin's summary of a Central Bank of Aruba presentation, the ECB innovation platform's report, and respondents quoted in the Bank of England's FS2/23 feedback.

- **a.** They cannot hold an "Earliest located" headline; retrieve the Aruba paper itself if it is a central bank's text.
- **b.** Let them hold it.

_Recommendation: a._ A summary is not the speaker's own wording.

- a: these appear as records, never as headlines.
- b: some headlines may move earlier.

### 7. U08, AI agents and tokenised money, has no text that states it

Four texts bear on it. The closest passages are in industry white papers convened by MAS, which MAS labels industry-led.

- **a.** Keep U08 with context records only, shown as "no located text meets the criterion"; keep industry papers out of scope.
- **b.** Admit the industry white papers as stating it.
- **c.** Drop U08.

_Recommendation: a._ The scope is authorities' own texts.

- a: U08 appears with "no located text meets the criterion" and four context texts.
- b: U08 gets a headline from an industry text.
- c: the proposition does not appear.

### 8. Six events with no matching record type

For example a concluded project, a proof of concept, a standing priority.

- **a.** Record them as dated statements of status where that fits; hold the rest. No new record type for this pack alone.
- **b.** Create a new record type.

_Recommendation: a._

- a: some events appear as "stated as of" a date; some wait.
- b: all six appear; needs a schema change.

### 9. Date of the BIS Annual Economic Report 2024

The chapter prints 30 June 2024; the press release gives 25 June.

- **a.** Keep the printed date. No headline depends on it.
- **b.** Use the press-release date.

_Recommendation: a._

- a/b: the date shown differs by five days.

### 10. Securities regulators

The SEC (Bauguess, 21 June 2017) may be earlier than U09's current holder; sec.gov could not be reached here.

- **a.** Include securities regulators only through IOSCO and the authorities already in scope; record the SEC speech only if you widen the scope.
- **b.** Widen the scope to securities regulators.

_Recommendation: a._ It keeps the scope to monetary and financial authorities as set.

- a: no SEC texts.
- b: a further search; U09's headline may move.

### 11. Leads not yet recorded

Among them: Hernández de Cos (April 2024), a BIS speech of 8 October 2025, the Federal Reserve's Payments Innovation Roundtable summary (May 2026), Bundesbank and BaFin papers (2021–22), the Riksbank's AI Sweden partnership, DNB (2019), the ACPR (2020); Norges Bank and Danmarks Nationalbank not searched.

- **a.** One bounded follow-up pass after the Codex retrieval, before admission.
- **b.** Admit without them and list them as not searched.

_Recommendation: a._ Some may change a headline.

- a: admission waits for one more pass.
- b: the "How we searched" note lists them.

### 12. Usual names

Only "suptech" (U09) and "agentic payments" and "agentic commerce" (U07) are kept as names; ordinary phrases such as "herding" or "black box" are search terms only, following your decision of 2 November on ordinary-phrase names.

- **a.** Confirm; and the admission script checks names against full texts.
- **b.** Keep more names (say which).

_Recommendation: a._

- a: three named terms are shown.
- b: more "earliest use of the name" headlines.

### 13. Size

162 records, above the guideline of about 150 for one admission.

- **a.** Admit in two parts if the cross-family check holds: financial stability and supervision first, then monetary policy and payments with any follow-up records.
- **b.** One admission.

_Recommendation: a._

- a: the collection appears in two releases.
- b: one release.

### 14. A container path in the branch's history

One early commit carried a generic cloud-container working path (not personal); later commits removed it.

- **a.** Copy the files to a new branch instead of merging this one, so the path is not in `main`'s history.
- **b.** Merge as is.

_Recommendation: a._ It is the operating guide's advice for such branches and costs nothing.

- No change for readers either way.

---

Reply with, for example: 1a 2a 3a 4a 5a 6a 7a 8a 9a 10a 11a 12a 13a 14a
