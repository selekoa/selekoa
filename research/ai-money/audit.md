# Same-family audit: AI in the texts of monetary and financial authorities

- **Auditor:** Claude (Anthropic), fresh context, the same model family as the preparer.
- **Date:** 2026-11-02.
- **Pack audited:** `research/ai-money/pack.json` on branch `ai-money-pack`, as merged and reconciled on 2026-11-02 (`reconcile-log.json`). Sample: `audit-sample.json` (seed 20261102).
- **Findings file:** [audit/findings.json](audit/findings.json). It has one entry per item, with six checks (quote, locator, stance, voice, date, wording), a severity and a recommendation.
- **Status:** this audit does not satisfy the cross-family requirement (see Limits).

## Method

1. **Quotation and locator.** I re-ran every evidence passage of every audited item against the cached expression (`.local/ai-money/doc/<cacheKey>`). I used the pack's own normaliser (`quoteFound` in `tools.mjs`) through a separate script, so the drafts' check results were not reused. For PDFs I worked out the page holding the first fragment of each quotation and compared it with the locator. Each quotation was then read in at least 450 characters of the text before it and 300 characters after it. Paraphrases of Chinese passages were compared against the quoted Chinese.
2. **Stance.** I read each passage in context against the criterion in `propositions.json` as worded. For bears_on records, I checked the `missing` element. For contests records, I checked the engagement kind and its rationale.
3. **Voice.** I checked `voice`, `authors`, `speakerRole`, `occasion` and `disclaimer` against the text. For every document whose disclaimer field is null, I searched the cached text automatically for disclaimer wording ("views expressed", "my own", "not necessarily" and similar), then read each hit.
4. **Dates.** I checked the date kind and precision against the date the page or PDF prints. For speeches, I checked delivery against publication.
5. **Wording.** I checked statements and qualifications for evaluative verbs, priority words, characterisation, hedges that were dropped, and claims that the text does not make.
6. **Earliest located.** For each holder I looked for an earlier text that meets the criterion and has the same stance. I searched three places: the records in the pack, the cached texts of the pack's own documents, and a small number of candidates outside the pack. I found the outside candidates by web search (discovery only) and fetched them where the host allowed it. Fetched candidates were saved to a scratch directory, not to the pack cache.
7. **Events.** I checked that the authority's own text states the event, and that the stage, kind and candidate predicate match what the text says.

## Coverage (items checked)

**Records: 56.**

- **Random sample (all 20):** am-u03-fsb-2024-ai, am-u12-eiopa-2025-ai-opinion, am-u12-boe-2022-dp5-22, am-u04-frb-2021-ai-rfi, am-u02-imf-2024-gfsr-ch3, am-u10-boe-2019-ml-survey, am-u01-bis-wp-1194, am-u06-frb-2023-cook-genai, am-u05-ecb-2026-ai-euro-area-economy, am-u06-bis-2024-aer-ch3, am-u10-pbc-2019-fintech-plan, am-u04-bcbs-2022-newsletter-aiml, am-u04-fsb-2024-ai, am-u01-bis-2024-aer-ch3, am-u12-fsi-2021-insights-35, am-u02-boe-2022-dp5-22, am-u06-ecb-2026-ai-euro-area-economy, am-u04-boe-2022-dp5-22, am-u04-fsi-2021-insights-35, am-u01-fsb-2024-ai.
- **Every earliest-located or earliest-located-term holder (17):** am-u01-boj-2017-kuroda-ai, am-u01-frb-2025-fsr-nov-contests, am-u02-fsb-2017-ai-ml, am-u03-fsb-2017-ai-ml, am-u04-fsb-2017-fintech-fs, am-u05-boe-2017-swp674-ml-central-banks, am-u05-frb-2023-cook-genai-contests, am-u06-boe-2018-carney-future-of-work, am-u07-frb-2025-waller-sibos, am-u07-hkma-2026-project-sage-release, am-u09-fsb-2017-fintech-fs, am-u09-fsb-2017-ai-ml, am-u10-frb-1997-phillips-risk, am-u10-bcbs-2018-sound-practices-fintech-contests, am-u11-bis-wp-930, am-u12-frb-2018-brainard-ai, am-u12-pbc-2019-fintech-plan-contests.
- **Every other contesting record (5):** am-u12-imf-2021-dp-ai-finance-contests, am-u12-fsi-2024-insights-63-contests, am-u12-rbi-2025-free-ai-report-contests, am-u12-esrb-2025-asc-ai-contests, am-u12-boe-2026-breeden-agents-of-change-contests.
- **Further targeted records (13):** am-u01-boe-2017-carney-promise-fintech-context, am-u07-boe-2026-breeden-agents-of-change, am-u07-ecb-2025-de-ip-outcome-report, am-u08-boj-2026-ueda-finsum, am-u06-pbc-2026-pan-jrjlt, am-u05-ifc-2017-bulletin-44-overview, am-u02-fsb-2026-bailey-g20-letter, am-u03-fsb-2026-bailey-g20-letter, am-u03-boe-2026-bailey-mansion-house, am-u07-boe-2026-bailey-mansion-house, am-u06-rb-2026-bunge-speech, am-u02-rbi-2024-das-crossroads, am-u09-bis-2019-carstens-innovation.
- **One record outside the sample (1):** am-u08-ecb-2026-ip-call-ai-agents-context. I checked it because it shares a document with a sampled event.

**Events: all 29** in `events`. This covers the 8 sampled events and the 21 others.

**Documents: 3** have separate findings (ecb-2026-ip-call-ai-agents, bis-2026-aer-ch1, ecb-2024-fsr-ai). I checked the voice and disclaimer fields of every document behind an audited item, and ran the automatic disclaimer search on all 93 documents.

**Total: 88 entries** in findings.json (56 records, 29 events, 3 documents).

## Results by severity

| Severity | Records | Events | Documents | Total |
| -------- | ------: | -----: | --------: | ----: |
| none     |      39 |     20 |         1 |    60 |
| minor    |      15 |      8 |         1 |    24 |
| material |       2 |      1 |         1 |     4 |

The four material entries come from **two underlying problems**. One problem accounts for three of the entries, because a single wrong date appears on one document, one record and one event.

**Quotations.** Every audited quotation (more than 120 passages, including 4 disclaimers) matched its cached expression verbatim. Every PDF locator matched the page holding the quotation. Every speech checked has its "views are my own" disclaimer recorded where the text carries one. The automatic search found no official-voice text with a views disclaimer that the pack failed to record. The Machado (SSM, 2026) text has only "all errors and inaccuracies are my own", which is not a views disclaimer.

## Material findings

1. **The earliest located use of "agentic commerce" is assigned to the wrong text** (am-u07-hkma-2026-project-sage-release, HKMA, 2 November 2026). The reconcile script looked for the term only in evidence passages. At least three earlier texts in the pack's own cache use it:
   - Breeden, "Agents of change", published 30 June 2026 (boe-2026-breeden-agents-of-change). The section is headed "Agentic payments and commerce", and the text reads: "What these two examples – agentic commerce and agentic trading – both highlight …".
   - Waller, Sibos speech of 29 September 2026 (frb-2026-waller-agents): "a potentially transformative topic for the payments industry—agentic commerce".
   - The Federal Reserve Board's Payments Innovation Roundtable meeting summary of 26 May 2026 (cached as frb-2026-agentic-roundtable, not recorded): "with a particular focus on agentic commerce".

   Breeden also uses "agentic payment journeys", which bears on the second usual name, "agentic payments".

   **Recommendation:**
   - Move earliest-located-term to the earliest recorded text that meets U07 and uses the term. That is am-u07-boe-2026-breeden-agents-of-change, with the term passage added as evidence.
   - Decide whether to admit the 26 May 2026 roundtable summary, and whether it is eligible. It is a Board summary of an industry meeting, so it is largely a relay.
   - Change rule 3 of `reconcile.mjs` to search each document's cached text, not only the evidence passages.
   - Run the same check for "agentic payments" and "suptech".

2. **The ECB digital euro innovation platform call has a wrong date note.** This affects document ecb-2026-ip-call-ai-agents, record am-u08-ecb-2026-ip-call-ai-agents-context and event am-event-ecb-2026-innovation-platform-ai-payments.
   - The pack dates the call "2026" (basis posting). Its date note says "The retrieved page prints no posting date" and that the "260928" in the address "is not printed on the page".
   - The cached page does print "28 September 2026". It appears as the publication date directly under the title (`p.ecb-publicationDate`) and in the citation meta tag.
   - **Recommendation:** date the call 2026-09-28 (basis publication) and correct the note in the europe draft. Propagate the date to the U08 record and the event, then re-run the ordering.

## Minor findings

### Stance

- **am-u05-frb-2023-cook-genai-contests.** Cook conditions the value of AI forecasts on explanation. She does not dispute that AI "can improve" analysis, and the record's own qualification says so. _Recommendation:_ re-code as bears_on, or as contests with engagement "contrary-only". If it is re-coded, U05 loses its contesting earliest-located holder.
- **am-u10-bcbs-2018-sound-practices-fintech-contests.**
  - "As yet unproven" does not dispute "can improve". The engagement rationale restates the criterion as "have been shown to measure risk better", which is not the criterion's wording.
  - The statement drops the printed words "termination of credit limits".
  - _Recommendation:_ re-code as bears_on, or narrow the rationale to match the criterion. Restore the printed wording in the statement.
- **am-u02-fsb-2026-bailey-g20-letter.** The "highly concentrated third-party service providers" are not said to be AI providers; they amplify a frontier-AI cyber risk. _Recommendation:_ re-code as bears_on, with that element recorded as missing.
- **am-u03-fsb-2017-ai-ml.** The record is acceptable, but its earliest-located role may be superseded. The FSB report of 27 June 2017, PDF p. 24, states: "As FinTech firms seek to further reduce their cost base with automation and the use of AI, a lack of human supervision may entail new risks." See the U03 candidates below.

### Wording and attribution

- **am-u06-pbc-2026-pan-jrjlt.** Point one (the timing of demand and supply effects) is framed in the text as an issue raised in the discussions of international organisations and central banks. The statement presents it as Pan's own claim; the qualification notes the framing but the statement does not. _Recommendation:_ reword the statement.
- **am-u07-boe-2026-breeden-agents-of-change.** The text says "the biggest issues are likely to be for regulation and industry standards"; the statement says these "are the main issues". _Recommendation:_ restore "likely" and the frame.
- **Group-scoped earliest notes left in qualifications after merging.** In each case the merged pack holds an earlier text, so the note is stale or misleading. _Recommendation:_ remove these notes at integration and state the per-proposition institution-voice earliest once, as derived information, as scope.md says.
  - am-u04-frb-2021-ai-rfi says it is the earliest institution-voice U04 text; FSB, June 2017, is earlier.
  - am-u04-bcbs-2022-newsletter-aiml makes the same claim for U04; the same earlier texts apply.
  - am-u01-bis-2024-aer-ch3 makes the same claim for U01; FSB, November 2017, is earlier.
  - am-u06-frb-2023-cook-genai calls itself earliest located for U06; Carney, 2018, is earlier.

### Voice

- **imf-2024-gfsr-ch3 (record am-u02-imf-2024-gfsr-ch3).** The voice is "institution" but the recorded disclaimer says the views are "those of the IMF staff". _Recommendation:_ choose a single rule for staff-disclaimed flagship reports.
- **rbi-2025-free-ai-report.** The voice "committee" is outside the scope and FORMAT vocabulary. _Recommendation:_ maintainer decision.
- **esrb-2025-asc-ai.** The voice is "staff", but the authors include academics who sit on the Advisory Scientific Committee. _Recommendation:_ use "committee" if that voice is adopted, or keep "staff" and add a note.
- **imf-2021-dp-ai-finance (record am-u12-imf-2021-dp-ai-finance-contests).** The subtype is "Working paper", but the text is a Departmental Paper. The disclaimer is not recorded because the PDF was not retrieved. _Recommendation:_ correct the subtype and retrieve the PDF.
- **bis-2026-aer-ch1.** This institution-voice text carries "The views expressed here do not necessarily reflect the views of the BIS member central banks", but its disclaimer field is null. _Recommendation:_ record the disclaimer.

### Dates

- **bis-2024-aer-ch3** (am-u01-, am-u06- and the eight-projects event). The records are dated 30 June 2024, the date of the Annual Economic Report. The BIS press release states that the chapter was released on 25 June 2024. This does not change any earliest-located holder. _Recommendation:_ date the chapter by its release and keep the AER date in the note, or keep 30 June 2024 with a recorded rule.

### Events

- **am-event-pbc-2021-jrt-0221-standard.** The id and subject carry the standard number and year (JR/T 0221-2021) that the record's own qualification says are not evidenced here.
- **am-event-bisih-2023-aurora-phase1-concluded.** The candidate predicate is "launched" for a conclusion. None of the four candidate predicates fits a conclusion; this needs a maintainer decision.
- **am-event-bisih-2024-gaia-proof-of-concept, am-event-bisih-2026-spectrum and am-event-bisih-2026-aise.** The candidate predicate "launched" is not stated by the pages. They state that a proof of concept was delivered, that a project explored something, or that a project exists.
- **am-event-ecb-2024-ai-action-plan.** The kind is "strategy-adopted", but the speech says the ECB "has developed" the plan.
- **am-event-bof-2025-data-ai-priority.** Kind (strategy-adopted), stage (stated-done) and predicate (announced_plan) disagree with each other.
- **am-event-ecb-2026-digitalisation-programme.** One record holds both stages: the programme is developed (stated-done), while the AI lab is "being established" and the assistants studio "being designed" (announced). _Recommendation:_ split the record into two events.

No event infers a start, completion or operation that its text does not state. The announced events (BoE AI Consortium, FSB 2024 update, Aurora new phase, FSB frontier-AI work, ECB 2027 workshops) are correctly kept as announced.

## Earlier-text candidates, by proposition

Searches outside the pack were for discovery only. A candidate is listed with the strength of its fit to the criterion.

| Code | Current holder                                                      | Candidates and assessment                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ---- | ------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| U01  | Kuroda, 13 Apr 2017                                                 | None found that meets the criterion. Carney (25 Jan 2017) and FSB (27 Jun 2017, p. 24, herding "due to reliance on similar algorithms") speak of algorithms, not AI, and are correctly recorded as context.                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| U02  | FSB, 1 Nov 2017                                                     | None found. The FSB report of June 2017 names third-party AI providers only descriptively (Annex G, PDF p. 59).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| U03  | FSB, 1 Nov 2017                                                     | **FSB, 27 Jun 2017** (in the pack; fsb.org/uploads/R270617.pdf, PDF p. 24): "As FinTech firms seek to further reduce their cost base with automation and the use of AI, a lack of human supervision may entail new risks". This plausibly meets "adds operational risks" and should be assessed. Weaker candidate: Kuroda, 13 Apr 2017 (boj.or.jp/en/about/press/koen_2017/ko170413a.htm): applying AI makes "information security and data privacy … even more critical". This bears on the criterion but states no increase in attack capability.                                                                                                      |
| U04  | FSB, 27 Jun 2017                                                    | None found earlier. The Kuroda (2017) and Carney (2017) texts have no opacity passage.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| U05  | BoE SWP 674, Sep 2017                                               | The IFC Bulletin 44 overview (Sep 2017) is the same month and a relay, so it is correctly ineligible. Bank of England Quarterly Bulletin 2015 Q1, Bholat, "Big data and central banks" (bankofengland.co.uk/-/media/boe/files/quarterly-bulletin/2015/big-data-and-central-banks.pdf; fetched and read) mentions neural networks "used to make predictions" in a data-mining tutorial and says central banks "will need to make further advances to 'nowcast'". It bears on the criterion but does not state that ML improves nowcasting. Contest: see the stance finding on Cook.                                                                       |
| U06  | Carney, 14 Sep 2018                                                 | Carney, "The Spectre of Monetarism", 5 Dec 2016 (bankofengland.co.uk/-/media/boe/files/speech/2016/the-spectre-of-monetarism.pdf; fetched and read) names "machine learning" as part of a technological revolution hollowing out jobs and discusses low equilibrium rates. It does not link AI to the setting of monetary policy, so it bears on the criterion only.                                                                                                                                                                                                                                                                                     |
| U07  | Waller, 29 Sep 2025                                                 | The ECB outcome report (Sep 2025, relay) is correctly ineligible. The BIS Annual Economic Report 2025, ch. III (in the pack), says pre-screening and compliance reporting could be embedded in payment instructions "through AI agents". This bears on payment processing, not agents initiating payments; it is earlier than the holder but does not meet the criterion. Term: see material finding 1.                                                                                                                                                                                                                                                  |
| U08  | No articulation                                                     | No candidate found.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| U09  | FSB, 27 Jun 2017 (term: FSB, 1 Nov 2017)                            | **SEC, Scott Bauguess** (Acting Director, Division of Economic and Risk Analysis), "The Role of Big Data, Machine Learning, and AI in Assessing Risks: a Regulatory Perspective", 21 Jun 2017 (sec.gov/news/speech/bauguess-big-data-ai). Discovery snippets say it describes machine learning driving SEC surveillance and risk assessment, and that it has a views disclaimer. sec.gov returned HTTP 403, so it is unverified. Its relevance depends on whether securities regulators count as "market supervisors" in scope. An earlier Bauguess speech of 21 Oct 2016 at the American Statistical Association is also a lead (unverified, HTTP 403). |
| U10  | Phillips, 4 Nov 1997                                                | No earlier text found. Federal Reserve speeches before 1996 were not searched.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| U11  | BIS WP 930, Mar 2021                                                | Carstens, 3 Jun 2019 (in the pack): authorities "need to be as creative, nimble and tech-savvy as any new kid on the banking block", next to a sentence on AI supervisory tools. It bears on the criterion but states no AI-capability need. Bholat (2015) describes the Bank of England's Advanced Analytics Division and Chief Data Officer; it bears on the criterion, without AI.                                                                                                                                                                                                                                                                    |
| U12  | Brainard, 13 Nov 2018 (articulates); PBoC plan, Aug 2019 (contests) | MAS FEAT principles (12 Nov 2018, one day earlier; the release is cached) are complementary principles. The release does not state that existing rules broadly cover AI, so it is not a candidate as read. DNB "General principles for the use of AI in the financial sector" (2019) was not retrieved (HTTP 403) and is later in any case.                                                                                                                                                                                                                                                                                                              |

## Retrieval failures in this audit

- **sec.gov, HTTP 403** (both Bauguess speeches): discovery snippets only, no verbatim check.
- **Bank of England PDFs** (Carney 2016, Bholat 2015) were retrieved without problems. They were saved outside the pack cache and are not pack evidence.
- **No re-fetch of pack sources was needed.** Every audited source was present in the cache.

## Limits

- **Same family.** The auditor is the same model family (Claude) as the preparer. Shared blind spots in reading, stance judgement and wording are therefore not excluded. **This audit does not satisfy the cross-family requirement** in `scope.md`; the Part A blind and Part B direct cross-family check is still outstanding.
- **Coverage.** 56 of 162 records and all 29 events were audited. The 106 unaudited records had no quotation or stance check here.
- **Expressions.** Quotations were checked against the cached expressions retrieved on 2026-11-02. For HTML pages, a check confirms the text as served on that date, not a fixed edition.
- **Earliest located.** The search for earlier texts was bounded: the pack's cache, plus a few targeted discovery searches. The IMF and IOSCO sites, the SEC site and web.archive.org refuse this environment, so earlier texts there may exist unexamined. "Earliest located" remains a statement about the recorded searches, never a claim of first statement.
- **Judgement calls.** The stance findings marked minor (Cook, BCBS 2018, Bailey letter U02) are editorial judgements about how far a criterion stretches. A cross-family reader may decide them differently.

## Dispositions (preparing thread, 2026-11-02)

Applied in the drafts by [`audit-fixes.mjs`](audit-fixes.mjs), logged in [audit/fixes.json](audit/fixes.json); `pack.json` was then rebuilt and re-verified (every quotation matches). Same-family dispositions; none is a cross-family adjudication.

- **Material 1 (agentic commerce):** accepted. The earliest located use of the name moves to Breeden, 30 June 2026, with the passage that uses it added as evidence. Usual names were also checked against the full cached texts of every record on U07 and U09: the June 2017 FSB report's glossary uses "SupTech" and now holds the U09 name role, with that passage as context evidence. The Federal Reserve Board's roundtable summary of 26 May 2026 is not recorded (an open question in the review note).
- **Material 2 (ECB call date):** accepted. Document, U08 context record and event dated 2026-09-28 (publication).
- **Stretched stances:** accepted. Cook 2023 on U05, the Basel Committee 2018 on U10 (with "termination of credit limits" restored) and Bailey's 2026 letter on U02 are re-coded as context with the missing element named. U05 and U10 now have no contesting record.
- **Stale group-scoped notes, Pan and Breeden wording:** accepted as recommended.
- **Voice:** `committee` adopted for the RBI FREE-AI report and the ESRB ASC report (scope.md updated); the IMF GFSR chapter kept as institution voice with a note (open question); IMF departmental paper subtype corrected; the BIS AER 2026 disclaimer recorded.
- **AER 2024 date:** not changed. The chapter page prints "30 June 2024"; the release on 25 June is noted in the review note. No holder changes either way.
- **Events:** accepted. Candidate predicates set to none where none of the four fits (open question); kinds corrected; the PBoC standard event renamed without the unevidenced number; the ECB digitalisation programme split into the programme (stated) and the AI research lab (announced).
- **U03 candidate (FSB, June 2017, p. 24):** not reassigned. "A lack of human supervision may entail new risks" names no cyber, fraud, manipulation or operational risk; left for the cross-family check.
- **Bears-on candidates outside the pack (BoE Quarterly Bulletin 2015, Carney 2016, Carstens 2019, SEC 2017):** not added in this pass; listed in the review note.
