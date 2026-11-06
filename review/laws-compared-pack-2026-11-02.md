# Laws compared: candidate pack, 2026-11-02

Review note for the candidate research pack [`research/laws-compared/`](../research/laws-compared/README.md). The pack serves the roadmap's interface item "Laws compared". Rows are binding instruments that address developers of frontier or general-purpose AI models. Columns are fifteen questions, each with a criterion. Every answered cell quotes the instrument's own text.

- **Prepared by:** Claude (drafting in four fresh-context passes by source group, then integration). Same-family audit: Claude, fresh context.
- **Checked by:** Codex (GPT family), blind first, using [`cross-family-input-2026-11-02.md`](../research/laws-compared/cross-family-input-2026-11-02.md); the pack's answers were in [`cross-family-verdicts-2026-11-02.json`](../research/laws-compared/cross-family-verdicts-2026-11-02.json). Report: [`cross-family-check-2026-11-02.md`](../research/laws-compared/cross-family-check-2026-11-02.md) and [`.json`](../research/laws-compared/cross-family-check-2026-11-02.json), copied unchanged from branch `codex/laws-compared-check`.
- **Adjudicated by:** Claude, 2026-11-02, on branch `laws-compared-apply` ([brief 07](../docs/briefs/07-laws-compared-apply.md)). The corrections are applied to the drafts by [`cross-family-apply-2026-11-02.py`](../research/laws-compared/cross-family-apply-2026-11-02.py) and the pack is rebuilt. See "Cross-family check and adjudication".
- **State:** candidate pack outside application data. `data/`, the application, the schema and releases are untouched. Nothing is human-reviewed. Admission waits for the maintainer's decisions below.

## Scope

The question: what does each binding government instrument that addresses frontier or general-purpose AI developers say on the same fifteen questions? The questions cover who is covered and by what threshold; a safety framework and its publication; risk evaluation; outside assessment; incident reporting; model information; whistleblowers; adoption, entry into force and application dates; penalties; the enforcer; and the relation to developers' frameworks and codes. The questions, criteria and legend are in [`questions.json`](../research/laws-compared/questions.json), modelled on the Compare frameworks collection.

The instruments started from those on the frameworks-and-law page. A row was kept where the instrument is binding and places duties on developers or providers of such models. Every other instrument on that page is recorded as excluded, with the reason.

## Instruments compared (9 rows; 10 with Illinois, added 2026-11-04)

| Row                     | Instrument                                                                                                                 | Standing                                                                                           |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `eu-ai-act`             | AI Act, Regulation (EU) 2024/1689, general-purpose AI provisions, read with Regulation (EU) 2026/1744 where it amends them | binding                                                                                            |
| `eu-code-ss`            | General-Purpose AI Code of Practice, Safety and Security chapter                                                           | compliance route: providers "may rely on" it under Articles 53(4) and 55(2); not binding in itself |
| `ca-sb53`               | California SB 53, Chapter 138, Statutes of 2025                                                                            | binding                                                                                            |
| `ny-ch699`              | New York RAISE Act as signed, Chapter 699 of 2025                                                                          | binding; its Article 44-B is repealed and re-added by Chapter 96                                   |
| `ny-ch96`               | New York RAISE Act as amended, Chapter 96 of 2026                                                                          | binding                                                                                            |
| `cn-genai-measures`     | Interim Measures for generative AI services (2023)                                                                         | binding; addressed to service providers                                                            |
| `cn-labelling-measures` | Measures for labelling AI-generated synthetic content (2025)                                                               | binding; addressed to service providers and others                                                 |
| `il-aisma`              | Illinois Public Act 104-0538 (SB 315), Artificial Intelligence Safety Measures Act (added 2026-11-04)                      | binding; signed according to Executive Order 2026-07; enacted text not read by the preparer        |
| `us-eo14110`            | Executive Order 14110, section 4.2                                                                                         | revoked by Executive Order 14148, 20 January 2025; a historical row                                |
| `us-bis-ifr`            | BIS Framework for AI Diffusion, interim final rule                                                                         | rescission announced 13 May 2025; no formal rescission inspected                                   |

**United Kingdom.** The UK has no row. The pack records, with sources, that no binding instrument was located:

- The King's Speech of 2024 announced an intent to legislate.
- The 2026 briefing notes contain none of the searched terms.
- The memoranda with developers state that they are not legally binding.
- Title searches of legislation.gov.uk for 2023 to 2026 found one instrument, SI 2026/425, which places a duty on the Information Commissioner, not on developers.

The finding is bounded by those searches; see `findings` in `pack.json`.

**Other US federal texts.** None places a binding duty on developers. Executive Order 14409 provides for a voluntary access framework and says, in section 3(c), that it authorises no licensing requirement.

## Instruments excluded

The pack excluded 51 documents from the frameworks-and-law page; 50 since the Illinois act became a row on 2026-11-04. Each exclusion and its reason is in `pack.md` ("Instruments on the frameworks-and-law page not compared"). In brief:

- **Proposed or vetoed texts:** the Code draft, the EU draft implementing regulation, the BIS reporting proposal, the NIST drafts, SB 1047 (vetoed), Michigan HB 4668 (introduced) and the White House legislative recommendations.
- **Guidance, reports and announcements:** the EU guidelines, the training-summary template, the Commission's opinion on the Code, the Chinese filing announcements, the AI Action Plan, the US AISI evaluation reports, the California report and the Governor's RAISE announcement.
- **Voluntary or non-binding texts:** the White House commitments, the UK memoranda, the summit declarations, the Frontier AI Safety Commitments, and the G7 code and reporting framework.
- **Binding texts that place no duty on developers:** the Cybersecurity Law amendment, whose AI article states what the state supports, and Executive Orders 14148, 14179, 14365 and 14409.
- **Folded into another row:** the Digital Omnibus, read in the AI Act row.
- **Text not retrieved:** GB 45438-2025, a mandatory standard whose text is offered only through an online viewer. (The Illinois AI Safety Measures Act, listed here on 2026-11-02, became a row under decision 7a.)

Four candidates outside the dataset were not added because they were not read: Korea's AI Basic Act, Japan's AI Promotion Act, China's deep-synthesis and algorithm-recommendation provisions, and Colorado SB 24-205.

## Coverage per cell

There are 135 cells (9 rows × 15 questions). After adjudication the pack holds 188 quotations (cells, standing, findings and exclusions), all matched mechanically against the text re-retrieved on 2026-11-02. 101 reuse quotations already in the dataset. Before adjudication the totals were 71 stated, 28 partly, 32 not found and 4 not applicable, with 189 quotations.

| Row                   | Stated | Partly | Not found | Not applicable |
| --------------------- | -----: | -----: | --------: | -------------: |
| eu-ai-act             |     11 |      3 |         0 |              1 |
| eu-code-ss            |      9 |      2 |         4 |              0 |
| ca-sb53               |     11 |      2 |         2 |              0 |
| ny-ch699              |     10 |      2 |         3 |              0 |
| ny-ch96               |     11 |      2 |         2 |              0 |
| cn-genai-measures     |      4 |      6 |         4 |              1 |
| cn-labelling-measures |      5 |      3 |         6 |              1 |
| us-eo14110            |      3 |      3 |         8 |              1 |
| us-bis-ifr            |      7 |      4 |         3 |              1 |
| **Total**             | **71** | **27** |    **32** |          **5** |

One not-found cell (us-eo14110 Q06) was held for the maintainer; it is now settled as not found (see "Maintainer decisions").

No cell is "not retrieved". Every not-found cell records the sections read, the search terms and the passages set aside. The grid in `pack.md` shows the statuses by symbol. The symbols are not scores.

**Checks run:**

- `build.mjs verify`: 0 problems and one budget overrun ([verification.json](../research/laws-compared/verification.json)), before and after adjudication. For the rerun on 2026-11-02 every source was retrieved again from its recorded address. Fourteen of the twenty files match their recorded SHA-256 values, including SB 53's archive member. Six web pages served changed bytes (the BIS release, the OpenAI memorandum page, the 2024 King's Speech page, the New York Senate PDF and both Assembly records), as the checker also found; every quotation still matched. `drafts/sources.json` keeps the 2026-11-01 retrieval record.
- Cross-family check (Codex): 122 items, 85 blind and 37 direct. See the next section.
- Same-family audit of 50 cells (28 targeted, 22 random): 39 confirmed, 6 corrected and 5 uncertain, settled as recorded in [audit.md](../research/laws-compared/audit.md). After the one material correction, all 18 Q10 and Q12 cells were re-read.
- `pnpm check:privacy`.

## Cross-family check and adjudication

Codex checked 122 items: 85 cells blind (79 agree, 4 disagree, 2 partly agree) and 37 cells and records directly (31 full support, 6 partial). Its blind answers were committed (4a98305) before it opened the verdicts or the audit. The rule applied here: the drafting family does not overrule the checker on a cell. It applies the checker's status or holds the cell with both reasons.

**The four disagreements.**

| Cell           | Pack (after audit) | Checker        | Disposition              | Reason                                                                                                                                                                                                                                                                                 |
| -------------- | ------------------ | -------------- | ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| eu-ai-act Q04  | not found          | not applicable | Checker's status applied | The Q04 criterion says "not applicable where Q03 finds no such document"; Q03 finds no written framework.                                                                                                                                                                              |
| ny-ch699 Q08   | partly             | not found      | Checker's status applied | Retaining test records is not publishing or supplying model information. The retention passage is now set aside, with § 1421(4) (incident disclosure).                                                                                                                                 |
| us-eo14110 Q05 | partly             | not found      | Checker's status applied | A duty to report the results of testing conducted is not a duty to test. The two passages are set aside.                                                                                                                                                                               |
| us-bis-ifr Q03 | not found          | partly         | Checker's status applied | The Q03 criterion's partly route covers required risk-management measures without a written document; Supplement No. 10, para. 15, requires AI-specific security practices covering model weights. The drafters had said partly; only the same-family audit had moved it to not found. |

**The two partial agreements.**

- **cn-genai-measures Q13:** status unchanged (partly). The note no longer adds "may" to the residual-enforcement clause; it says the Measures provide for a warning, a notice of criticism and an order to correct.
- **us-eo14110 Q06: held.** The checker recommends partly, because Sec. 4.4(a)(i) directs Homeland Security to evaluate AI misuse for CBRN threats, including, under (A), "to evaluate AI model capabilities". The preparer keeps not found: Q06 asks for assessment of the model or the developer's practices, and this is a general capability study for one threat domain that names no covered company or model. The cell shows not found, marked "(held)", with both reasons in `pack.json` (`held`) and `pack.md`. Sec. 4.4(a)(i)(A) is now set aside by name, as the checker asked. _Recommendation:_ keep not found. If the maintainer reads Q06 as covering policy-level capability evaluation by an authority, apply partly and write that reading into the legend.

**Corrections both families agree on, applied.**

- **Wording:** eu-ai-act Q01 no longer calls the systemic-risk category "the tier for the most capable models"; it names the Article 51 category and its conditions. The same words are removed from the Q01 criterion in `questions.json`. eu-code-ss Q01 and the Code's standing note no longer say the Code "binds" signatories. eu-code-ss Q08 now says access to an updated Model Report is due five business days after a confirmed update.
- **Locators:** the AI Act's enacting formula is after recital (180), before Chapter I and Article 1. New York Chapter 699 Q04's first quotation spans p. 4, lines 18–19.
- **Dates and standing:** the New York Chapter 96 standing, Q01 and Q07 now say that Article 44-B as re-added takes effect on 1 January 2027, so that signature is not read as application. The Code's title loses "(10 July 2025)": the chapter is undated, and its standing note now attributes that date to the Commission's Code page, as recorded in the dataset's Code sources.
- **Bounded findings:** the UK finding now opens "Within the searches stated below" and says it is not a finding that no such instrument exists. The US federal finding says "as read for this pack" and that the no-licensing clause concerns section 3's voluntary framework. Both record that the checker confirmed only the quoted passages.
- **GB 45438-2025:** the exclusion and source record no longer say "online viewer only". The catalogue offers preview and download, but the download address returned the catalogue page.
- **Already applied before the check:** the same-family audit's corrections ([audit.md](../research/laws-compared/audit.md)). The checker agreed with the EO 14110 Q12 correction, the EU Article 101 date reading and the New York Chapter 699 standing, and left the legal effect of Chapter 699's interval unresolved, as the pack does.

**Not changed.** The checker's "misleads alone" notes (for example, that the Code's cells must carry its non-binding standing, and SB 53's cells their large-developer tier) are conditions for the page, recorded under "Collection and page plan". They are not cell errors.

**Brief not regenerated.** `build.mjs brief 2026-11-02` would rewrite the dated blind input the checker used, and renumber its items. The input and verdicts files stay as the checker received them; `pack.json`, `pack.md` and `verification.json` are rebuilt.

## Open decisions for the maintainer

1. **California SB 53 quotation limit.** The dataset quotes 393 of SB 53's 400 permitted words; the pack adds 15, so it is 8 over: Q05 (7 words), Q06 (6) and the approval-date field (2). _Recommendation:_ at admission, give Q05 and Q06 as paraphrases with the section, and cite the existing approval record (`sb-enactment-2025-09-29`) for Q10. SB 53 then stays within the limit without a policy change. This needs the per-cell paraphrase in the schema plan below.
2. **The Code of Practice as a row.** _Recommendation:_ keep it, placed directly under the AI Act, labelled "Compliance route, not binding", and never counted among the laws in any summary. Every Code cell carries the standing in its note, as the checker asked.
3. **New York, one row or two.** _Recommendation:_ one row, "New York RAISE Act", showing Chapter 96 (as amended) by default, with Chapter 699 (as signed) as an earlier version the reader can switch to, as Compare frameworks switches editions. Both stay in the data. The row's standing says that the amended duties take effect on 1 January 2027.
4. **Revoked and rescission-announced rows.** _Recommendation:_ keep Executive Order 14110 and the BIS rule in a separate group after the others, headed "Revoked, or rescission announced", with each row's standing and its evidence shown on the row. EO 14110: "Revoked by Executive Order 14148 (20 January 2025)". BIS rule: "Rescission announced 13 May 2025; no formal rescission rule inspected". Never present the announcement as a rescission.
5. **The "partly" rules.** Four conventions now decide cells. _Recommendation:_ accept all four and write them into the collection's legend:
   - a direction to an agency to impose a duty is partly (EO 14110);
   - protection only by reference to another law is partly (AI Act Q09);
   - "without undue delay" counts as a stated deadline (AI Act Q07);
   - required security measures for model weights count as Q03 risk-management measures (BIS rule Q03, applied from the check). If the maintainer excludes model-weight security from "risks of its models", BIS Q03 returns to not found and Q04 stays not applicable.
6. **The held cell, us-eo14110 Q06.** _Recommendation:_ not found, as above.
7. **Illinois.** The AI Safety Measures Act was signed according to the Governor's Executive Order 2026-07; its text was not read (ilga.gov failed certificate checks here). _Recommendation:_ a short Codex retrieval of the public act before the collection is built. Add a row only if it places duties on frontier developers; otherwise record it as excluded with the reason.
8. **Rows addressed to service providers.** _Recommendation:_ keep the Chinese rows. The Q01 cells quote the defined party, and the page's introduction says some instruments address providers of services, not developers as such.
9. **Whether New York Chapter 699 took effect.** _Recommendation:_ hold. Record the effect rule and the computed date (19 March 2026), marked as computed, and do not state whether the text took effect.
10. **Jurisdictions outside the dataset.** _Recommendation:_ Korea's AI Basic Act in a separate bounded pack later; it does not block this one.

Settled by the check: the borderline cells (open question 10 of the pack) are disposed of above. The archive captures (open question 11) remain unopened: the checker used fresh official retrievals instead, so captures stay marked "not opened" until an admission task needs them.

## Maintainer decisions

Recorded 2026-11-04 on branch `laws-compared-apply-2`, from [`review/decisions/answers-2026-11-03.md`](decisions/answers-2026-11-03.md) and the decision sheet [`review/decisions/laws-compared.md`](decisions/laws-compared.md) (numbers match the open decisions above).

**Approved as recommended, 2026-11-03.** The maintainer's words, in the planning thread at about 20:00 Helsinki time: "OK to all your 'easy' suggestions." For this pack that approves **1a 2a 3a 4a 5a 7a 8a 9a 10a**, the recommendation as written in the sheet:

| Decision                       | Answer | Effect                                                                                                                                                                   |
| ------------------------------ | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1. SB 53 quotation limit       | a      | Q05 and Q06 become paraphrases with the section at admission; Q10 cites the existing approval record `sb-enactment-2025-09-29`.                                          |
| 2. The Code as a row           | a      | Kept, directly under the AI Act, labelled "Compliance route, not binding", never counted among the laws; every Code cell carries the standing in its note.               |
| 3. New York                    | a      | One row, "New York RAISE Act", Chapter 96 by default, Chapter 699 as the earlier version; the row says the amended duties take effect on 1 January 2027.                 |
| 4. Revoked and announced texts | a      | EO 14110 and the BIS rule in a final group, "Revoked, or rescission announced", with standing and evidence on each row; the announcement is never shown as a rescission. |
| 5. The four "partly" rules     | a      | All four go into the legend (below).                                                                                                                                     |
| 7. Illinois                    | a      | Codex retrieval authorised; row only if the act places duties on frontier developers (outcome below).                                                                    |
| 8. Chinese rows                | a      | Kept; Q01 quotes the defined party; the introduction says some texts address service providers.                                                                          |
| 9. New York Chapter 699 effect | a      | Held: the effect rule and the computed date (19 March 2026), marked computed; the pack does not say whether it took effect.                                              |
| 10. Jurisdictions not read     | a      | A separate small pack later, starting with Korea; listed as not yet read.                                                                                                |

**The four "partly" rules (decision 5a), for the legend.**

1. An order to an agency to impose a duty counts as partly.
2. Protection only by reference to another law counts as partly.
3. "Without undue delay" counts as a stated deadline.
4. Required security measures for model weights count as risk-management measures under Q03.

**Decision 6 (EO 14110, Q06): settled as 6a without a maintainer decision.** The answers file routed this disagreement to a Codex second pass. The checker changed its first reading to not found: section 4.4(a)(i)(A)–(B) "does not establish an outside-assessment requirement for a covered developer’s model or practices", and it asked for the passage to be recorded as read and set aside. The report is copied unchanged from branch `codex/second-pass-2026-11-03` (1fd8d66) as [`second-pass-codex-report-2026-11-03.md`](../research/laws-compared/second-pass-codex-report-2026-11-03.md) and [`.json`](../research/laws-compared/second-pass-codex-report-2026-11-03.json); case 2 is this cell, case 5 the Illinois retrieval, and the other cases concern other packs. Applied to `drafts/us-federal.json`: the cell's `held` record is removed, the status stays not found, and Sec. 4.4(a)(i), including (A), stays in the search as read and set aside, citing the second pass.

**Decision 7a, outcome.** The second pass (case 5) retrieved Public Act 104-0538, the Artificial Intelligence Safety Measures Act, through Internet Archive captures of ilga.gov, and reports frontier-developer duties in sections 10, 15 and 20. Under 7a the act gets a row; it is drafted and sent to a short cross-family check (see "Illinois row").

## Illinois row (decision 7a), 2026-11-04

Row `il-aisma`: Illinois Public Act 104-0538 (SB 315), the Artificial Intelligence Safety Measures Act, placed after New York. Drafted in [`drafts/us-illinois.json`](../research/laws-compared/drafts/us-illinois.json) by the one-off script [`illinois-2026-11-04.py`](../research/laws-compared/illinois-2026-11-04.py), which also adds the instrument, its two sources and its standing record, and removes the act from the exclusions.

**The enacted text was not retrieved here.** On 2026-11-04, www.ilga.gov returned HTTP 403 ("Access Denied") once its incomplete certificate chain was completed with the issuer's published intermediate, and web.archive.org reset every connection, so the capture the checker read on 2026-11-03 could not be opened. No request was retried with altered headers. The checker's report records one quotation from the act and the copy's SHA-256, not the text, so a full row could not be drafted from it.

| Status        | Cells | Which                                                                                                                     |
| ------------- | ----: | ------------------------------------------------------------------------------------------------------------------------- |
| Stated        |     1 | Q02, threshold: the definition of "frontier model" (more than 10²⁶ operations), quoted from the checker's copy, unmatched |
| Not retrieved |    14 | Q01, Q03–Q15                                                                                                              |

- **Unverified.** The Q02 quotation is the checker's, labelled on the passage (`copy`); `build.mjs verify` reports it as having no cached text, and the source as having no word count, so its quotation budget cannot be computed. These are the two problems in `verification.json`; every other quotation in the pack matched fresh retrievals made on 2026-11-04 (six web pages served changed bytes, the same six as on 2026-11-02; SB 53's archive member matches its SHA-256).
- **Leads.** Thirteen not-retrieved cells carry a `lead`: what the checker's second pass reports about the act on that question (sections and dates), marked as the checker's paraphrase and not evidence. Q10 to Q12 leads keep date kinds: passage 29 May 2026 and approval 6 July 2026 (bill history); general effective date 1 January 2027 (section 99); separate start dates 1 January 2027 (section 18) and 1 January 2028 (sections 10(a) and 10(d), the audit later where the developer qualifies later). No cell says that any duty has taken effect.
- **Standing.** Executive Order 2026-07, retrieved again on 2026-11-04 (same SHA-256 as the checker's copy), states that the act was passed and signed; the passage reuses an admitted quotation.
- **The four "partly" rules (5a)** could not be applied: no Illinois passage was read that a rule would decide.
- **Not quoted.** The executive order's description of the act's duties is the Governor's account, not the act; it is recorded as an omission.

## Illinois row (2026-11-04)

The row above is now drafted from the act and compared with the cross-family check; this section supersedes the table and the "Unverified" and "Leads" points above.

**Source.** [`sources/il-pa-104-0538.txt`](../research/laws-compared/sources/il-pa-104-0538.txt): the text of the enacted PDF, saved by Codex from the Internet Archive capture of 2026-09-08 (HTTP 200; PDF SHA-256 `f10cd7d8…f71f`, the registry's; extracted with pdfjs-dist), copied unchanged from `codex/held-records-2026-11-04`. The preparer read that text, not the PDF. Length: 10,500 words, not counting the page footer (limit 525); the cells quote 488 new words. The bill status record (Q10) still could not be opened here: web.archive.org reset the connection and ilga.gov failed certificate verification.

**Blind order kept, and two independent readings.** Here the roles were reversed: Codex read the act first, blind ([`cross-family-check-2026-11-04.md`](../research/laws-compared/cross-family-check-2026-11-04.md) and [`.json`](../research/laws-compared/cross-family-check-2026-11-04.json), from `codex/laws-compared-check-2`, its answers pushed before it opened the pack's verdicts). Claude then drafted all fifteen cells from the saved text without opening that report, and committed and pushed them (`f116260`) before copying it in. Neither family saw the other's answers before writing its own.

**Agreement.** 13 of 15 cells agree on status (all stated: Q01–Q04, Q06–Q09, Q11–Q15). Q10 differs only because the preparer could not open the record: the checker's status (stated) is applied, quoting its copy of the Actions table (Governor approved 6 July 2026; passed both houses 29 May 2026), with the passage labelled `copy`. Q05 is held (below). The standing record agrees (checker's part B). The executive order served the preparer the registry's bytes on 2026-11-04 and the checker different bytes the same day; the checker found the quotation unchanged. Q02's quotation is the same in both readings, apart from how the exponent is printed (see 2 below). The checker quotes more passages (Q05 Section 10(a)(4), Q06 10(d)(2)(C), Q12 18(a), Q14 the Agency's definition, Q15 10(a)(1)); the preparer's notes already state their content, and adding them would use up most of the word limit, so they are not added. One correction came from the comparison: the preparer counted the page footer as 9 words; it is 10, so the length is 10,500 (the checker counts 10,499, joining "10 26" as one token). The corrections were made by [`cross-family-apply-2026-11-04.py`](../research/laws-compared/cross-family-apply-2026-11-04.py), and the pack was rebuilt.

| Status | Cells | Which                      |
| ------ | ----: | -------------------------- |
| Stated |    14 | Q01–Q04, Q06–Q15           |
| Partly |     1 | Q05 (held: checker stated) |

**Verification.** `build.mjs verify` on 2026-11-04, after the 21 other sources with a cache were fetched again (SB 53's member matches its SHA-256): every Illinois quotation from the act matches the saved text. Three problems remain, all from the checker's copy of the bill record: no cached text for the two Q10 passages, and no word count for that source. SB 53's budget overrun is unchanged (decision 1a). In Illinois quotations, "…" stands for the page footer at a PDF page break.

**For the maintainer.**

1. **Q05, risk evaluation (held).** Checker: stated, because large frontier developers must implement and comply with a framework that covers assessing model capabilities (Section 10(a)(2)) and reviewing assessments before deployment (10(a)(4)). Preparer: partly, because the act has no separate duty to test each model; the duty runs through the framework, in words identical to California SB 53, which the pack records as partly and which the checker itself read, blind, as partly on 2026-11-02 (item 17).
   - **a.** Partly, for both laws.
   - **b.** Stated, and SB 53 Q05 goes back to the checker on the same question.

   _Recommendation: a._ The same words get the same status. **Quick: OK the recommendation.**

2. **Q02, how the exponent is printed.** The PDF prints 10²⁶ as a superscript; its text layer gives "10 26", and the checker quoted "10²⁶". The cell quotes "10 26", with the figure in the note, as the EU row quotes "1025", so that verification can match it.
   - **a.** Keep "10 26" with the note.
   - **b.** Print "10²⁶" and teach the verification to read superscripts.

   _Recommendation: a._ This keeps the pack's existing practice. **Quick: OK the recommendation.**

3. **Q10 from the checker's copy.** _Recommendation:_ accept the checker's copy as the retrieval at admission, with the passage labelled as such (the SHA-256 matches the registry), unless a session can open the capture first. **Quick: OK the recommendation.**

**Ready for part 2.** On the maintainer's instruction "laws without Illinois", part 1 of the admission goes ahead without this row. Once Q05 is answered, the row is ready for part 2 of the admission: 15 cells, one record each, with the standing record.

## Collection and page plan

How the pack becomes a collection and a page alongside Compare frameworks. Nothing here is admitted or built on this branch.

**What the reader gets.**

- A page "Laws compared" at `/compare/laws-compared`, built on the Compare frameworks page. Its table has the same orientation as Compare frameworks: rows are the fifteen questions and columns are instruments, in a fixed order by jurisdiction and then date: EU (AI Act, then the Code, marked as a compliance route), California, New York, Illinois (once its row is drafted from the text and checked), China (two), then the group "Revoked, or rescission announced" (EO 14110, BIS rule). Each column header shows the instrument's standing in words.
- A cell gives the status in words and opens the quotation (with translation for Chinese texts), the locator, the note and the source. A not-found cell opens its search: sections read, terms and passages set aside. No symbols are summed, and the page has no counts by instrument.
- A one-question page per question, at `/compare/laws-compared/<question>`, listing every instrument's cell in full. These are the pages to link from the governance hub (for example, "Incident reporting" or "Whistleblowers").
- A list equivalent of the table for keyboard and screen-reader users, as on Compare frameworks.
- A CSV of every cell at `/compare/laws-compared.csv`, using the Compare frameworks columns, plus `instrument_standing`, `translation` and `date_kind`.
- Introduction, reading note, legend and limits from `questions.json`, rewritten to `docs/style-guide.md`. The limits state that a cell records what the text requires of the categories it defines, not whether any developer is covered or complied; that a not-found cell is bounded by its search; and that the Code and the two federal rows have the standing shown.
- Links in from the frameworks-and-law page, the governance hub and Compare frameworks ("How laws treat the same questions").

**Schema needs (one minor release).**

1. **Question sets per collection.** Comparison questions are one global list today (`comparisonDimensions`, facets D1–D9, used by `facetById` in validation). Add a second set, `lawComparisonQuestions` (Q01–Q15), with facet IDs that cannot collide (`L.Q01` to `L.Q15`) and keys `comparison-law-q01` and so on. Validation looks a facet up in either set. Compare frameworks is unchanged.
2. **Provision kinds.** Map each question to an existing kind where one fits: Q02 → `threshold`; Q03, Q05, Q06, Q08 and Q09 → `required_action`; Q07 → `reporting`; Q10 to Q12 → `date`; Q14 → `decision_authority`. Q01 (covered party), Q04 (publication), Q13 (penalties) and Q15 (relation to codes) need either `statement` (schema 2.20) or new kinds. _Recommendation:_ use `statement` for those four, so the release adds no new kind.
3. **Columns that are instruments, not framework families.** `comparisonView` builds columns from `frameworkVersions(data, family)`. Generalise the collection type so that a column is either a framework family or an instrument family, and give the two New York chapters a shared `documentVersion.family` (`ny-raise-act`) so Chapter 699 is an earlier version of the row. Every other row is a single-version family.
4. **Standing and groups on the collection.** Add `groups` (heading, instrument IDs) and, per column, the claim ID of its standing record, so the page shows standing from data, not from collection prose. EO 14110's revocation and the BIS announcement are existing claims or are admitted in part 1.
5. **Per-cell paraphrase.** Allow a stated or partly law cell to rest on a paraphrase with locator when the source's quotation limit is reached (SB 53 Q05 and Q06), marked on the cell. The framework comparison's per-question rule (schema 2.18) stays.
6. **Chinese passages.** Evidence keeps the original-language quotation and Selekoa's working translation, as the Chinese collections already do; the CSV carries both.
7. **Computed dates.** New York Chapter 699 Q11 uses `computed: true` (schema 2.19).
8. **Not applicable and held.** The five not-applicable cells go in the collection's `notApplicable` list with reasons, as on Compare frameworks. A held cell is never admitted: the maintainer decides it first.

**Admission steps (following the operating guide's pipeline).**

1. **Maintainer decisions** recorded above (done 2026-11-04), including the held cell and the Illinois retrieval and its outcome. The four "partly" rules are now in `questions.json` (`partlyRules`) and in the pack's legend; the page's legend takes them from there. **Illinois row:** drafted from the enacted text by a session that can open the capture, compared with the checker's blind reading, then adjudicated (see "Next step"). _Recommendation:_ if it is not ready when part 1 starts, part 1 goes ahead with the other nine rows and Illinois follows in part 2; until then the page lists Illinois as not yet read.
2. **Part 1, patch release, existing predicates.** One script admits what needs no schema change: the standing records (revocation, rescission announcement, Code reliance, New York signatures and effect provisions) where the dataset lacks them, and the quoted provisions as `states_provision` claims without a facet. A cell whose passage is already an admitted quotation cites the existing claim and evidence instead of duplicating it. Before-snapshot first in `src/editorial/historical-views.ts`. `pnpm check`, `pnpm check:privacy`, release.
3. **Part 2, minor release, schema.** The changes above; then one claim per cell (135 less the five not applicable; 150 cells once Illinois is in), each with the law facet, status `stated` or `partly`, or `provision_not_found` with the search as premises and qualification. The collection `src/reading/law-comparison.ts` and its registration in `src/release/collections.ts`. Tests: domain (view, CSV, validation of law facets, no collision with D-facets), and an editorial test that every cell has one record.
4. **Page.** Generalise `FrameworkComparison.tsx` instead of copying it, and lazy-load it, because search and the start page are near their bundle limits. Do not raise a budget. Browser test for the table, the list equivalent, a one-question page and the CSV; inspect the app and console.
5. **Review and merge** as the operating guide sets out. Then the public sync.

**Risks to watch at admission.** SB 53's quotation limit; the BIS page's changed terms ("SI" for "AI"), which quotations already avoid; New York's "??" section signs, which quotations already join around; and the six sources whose bytes changed since 2026-11-01, which need their expressions recorded at admission.

## Next step

1. **Maintainer: Illinois Q05** ("For the maintainer" under "Illinois row (2026-11-04)"; points 2 and 3 there are quick). The cross-family check and the drafting from the text are done (branch `laws-compared-illinois`).
2. **Admission part 1** (above), without Illinois, as the maintainer instructed ("laws without Illinois").
3. **Admission part 2** with the Illinois row: 15 cells and the standing record, Q05 as decided, Q10 from the checker's copy unless the bill status record can be opened first.
