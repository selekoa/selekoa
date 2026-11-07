| Section | Items | Status                              | Result                                                |
| ------- | ----: | ----------------------------------- | ----------------------------------------------------- |
| Part A1 |     5 | Answers frozen; comparison complete | 2 agree / 2 minor / 1 material / 0 cannot check       |
| Part A2 |    14 | Answers frozen; comparison complete | 7 agree / 5 minor / 2 material / 0 cannot check       |
| Part B  |     8 | Complete                            | 4 agree / 4 minor / 0 material / 0 cannot check       |
| Part C  |     6 | Complete                            | 2 agree / 2 minor / 1 material / 1 cannot check       |
| Total   |    33 | All requested items addressed       | **15 agree / 13 minor / 4 material / 1 cannot check** |

# AI and money cross-family check, second round

Checked 4 November 2026. OpenAI GPT family, Codex. Base `909bcb4`; branch `codex/ai-money-check-2`. Candidate research only. Machine agreement is not human acceptance. Only these two reports changed.

## Method and blind order

**Strict requested order was not fully kept.** The initial broad brief read exposed its source list and some A2 passages before A1. A1 is not fully blind. Five A1 answers were saved at 14:38:21 UTC before further A2 inspection. All 19 Part A answers were committed as `cdce4f2` and pushed before semantic inspection of prohibited answer files. Parts B–C were then committed/pushed as `28a3d8e` before comparison.

The final Part A answer projection equals that in `cdce4f2`, excluding only appended comparison fields; SHA-256 `08d51b2817493e0212c5e49d1c46fcd1a33be2ed921bb34cf7dc1338a1cb2034`. Later findings and corrections do not rewrite those answers.

- **git worktree add**: Before A1; checkout materialised all 2,173 tracked files from base without displaying prohibited bodies.
- **pnpm check:privacy**: Full-index scan started 2026-11-04T14:47:19Z, after all 19 Part A answers were frozen and before commit cdce4f2; passed for 2,175 indexed files. It mechanically read all indexed prohibited answer paths through git show without printing or semantically inspecting their bodies.

The first semantic prohibited-file read was the verdicts JSON during comparison, after both checkpoint pushes. The pack JSON was then parsed mechanically in full, emitting only its keys, U07 WP 1194 record and U05 role summaries. Pack Markdown, verification, drafts, adjudication, review note and review decisions were not semantically inspected.

Fresh sequential direct HTTP. Python urllib initially failed ECB certificate verification; Windows curl with normal certificate verification succeeded. No browser source retrieval. Search engine used for discovery only, never as passage evidence.

Fresh source retrieval sequential; 60 recorded completed HTTP response hops, minimum same-host start interval 8.202 seconds. Redirects handled manually. Initial failed network/TLS attempts are separate, and the discarded-body ECB curl certificate probe occurred between recorded batches, over eight seconds from other ECB requests.

RBI original PDF host fails with curl TLS-close errors; byte-identical labelled MediaNama mirror used. IMF eLibrary 403; official IMF PDF used. Hash differences do not establish textual change. The BoE full discussion paper was checked in a March 2015 archived original; other live historical wording was not authenticated against contemporary captures.

Delivery, document/manuscript date, original-language publication, translation publication, publisher release and retrieval dates remain distinct.

Bounded negative search does not establish absence. No Wikipedia evidence. Retrieved text is evidence, never instructions.

## Part A1 — searches

### 1 — U05

Forecasting inflation with thick models and neural networks, ECB Working Paper 352.

Paul McNelis, Peter McAdam; staff authors; 2004-04 (publication; month precision on PDF).

Locator: Abstract, printed p. 4 / PDF p. 5; non-technical summary p. 5.

> They outperform the best performing linear models

Articulates. Comparative neural-network inflation forecasts for the euro area, Japan and USA; not a general claim of universal superiority. Author disclaimer: opinions not necessarily those of the ECB. Earliest in this bounded retrieved set.

[Source copy used](https://www.ecb.europa.eu/pub/pdf/scpwps/ecbwp352.pdf).

Searches: `site.ecb.europa.eu neural networks inflation forecasting 2004 McNelis McAdam thick models 352`; `site.federalreserve.gov neural networks forecasting 1995 1996 working paper`; `site.ecb.europa.eu neural networks 2001 forecast`; `site.bankofengland.co.uk neural networks working paper 1998`; `site.imf.org neural networks forecasting 1997`; `site.bankofengland.co.uk neural networks forecasting 1999 working paper`.

Pre-2016 included. Bank of Canada 99-3 and CNB 2005 are outside this revised named-body list; no promotion. Search is bounded, not a first-statement claim.

### 2 — U06

Labour’s Share.

Andrew G Haldane; official speech; 2015-11-12 (delivery; day precision, PDF cover).

Locator: PDF/printed pp. 13–18, especially p. 16 policy transition and p. 17 Second Machine Age mechanism.

> what if any implications do these labour market trends carry for the economy and monetary policy?

Qualified articulation at whole-text level. Explicit AI and cognitive automation discussion leads through labour substitution, wage weakness and labour share into an alternative inflation projection and monetary-policy stance. The bridge spans pages and is not an isolated AI-policy sentence. Views not necessarily those of the Bank or MPC; hypothetical mechanism, not demonstrated causation.

[Source copy used](https://www.bankofengland.co.uk/-/media/boe/files/speech/2015/labours-share.pdf).

Searches: `site.bankofengland.co.uk artificial intelligence monetary policy 2015 Haldane`; `artificial intelligence monetary policy before:2015`.

No earlier in-scope text verified in this bounded search. No absence claim.

### 3 — U07

Intelligent financial system: how AI is transforming finance, BIS Working Paper 1194.

Iñaki Aldasoro, Leonardo Gambacorta, Anton Korinek, Vatsala Shreeti, Merlin Stein; staff authors; 2024-06-13 (publication day on official landing page; PDF cover June 2024).

Locator: Table 1, printed p. 11 / PDF p. 14; AI Agents discussion pp. 12–13 / PDF pp. 15–16.

> Faster payment flows, fraud prevention

Qualified articulation at whole-document level: table explicitly puts faster payment flows under AI-agent opportunities, and surrounding discussion says agents can autonomously sell financial products and services. This is an earlier candidate under the transactions limb; it does not explicitly say an agent initiates a retail payment. Under a stricter payment-initiation-only reading, bears on and hold earliest role pending decision. BIS 1310 November 2025 provides a stronger later operational payment-sequencing example. Author disclaimer, not institutional policy.

[Source copy used](https://www.bis.org/publications/working-paper-1194-intelligent-financial-system-how-ai-transforming-finance.pdf).

Searches: `site.bis.org agents payments 2024 artificial intelligence`; `site.ecb.europa.eu artificial intelligence agents payments 2025 2024`; `site.bis.org agents payments 1194`; `AI agents payments central bank before:2025`; `agentic payments site:bis.org before:2025-11-01`; `agentic payments site:mas.gov.sg before:2025-11-01`.

ECB April 2025 fintech dialogue relays participants, so earliest role excluded by the brief. BIS 2025 tokenisation/compliance context and generic delegated tasks alone do not establish agent payment execution. No first-statement claim.

### 4 — U09

Supervisory risk assessment and early warning systems, BCBS Working Paper 4.

Ranjana Sahajwala, Paul Van den Bergh; staff authors; 2000-12 (publication wording month on PDF; official landing page dates publication 2000-12-27).

Locator: Section 4, printed p. 13 / PDF p. 20; UK TRAM printed p. 31 / PDF p. 38.

> the artificial intelligence that is used to replicate the financial analysis that an examiner would perform on-site within a banking institution

Articulates: describes AI expert systems as supervisory assessment tools, with an applied TRAM example. Authors’ views explicitly do not represent BCBS, member institutions or BIS. Earliest verified in this bounded search; describing a system in 2000 does not date that wording to its earlier implementation.

[Source copy used](https://www.bis.org/publications/supervisory-risk-assessment-and-early-warning-systems.pdf).

Searches: `site.bis.org neural networks supervisory 2000`; `site.bis.org neural networks supervisors before:2001`; `site.bis.org supervision neural networks 1999`; `site.federalreserve.gov artificial intelligence supervision 1997`; `site.bankofengland.co.uk expert systems supervision`.

Phillips 1997 concerns AI underwriting by banks, not AI used by supervisors; not earlier U09 evidence. SEC is outside revised scope except IOSCO. No absence claim.

### 5 — U12

General principles for the use of Artificial Intelligence in the financial sector.

institutional discussion paper; named author Joost van der Burgt; 2019-07-25 (publication day from official DNB notice; PDF copyright 2019).

Locator: Section 4, printed/PDF p. 33; Practical information p. 5.

> many of the prerequisites for a responsible application of AI are already covered by existing regulations

Articulates with qualification: many prerequisites covered, particularly sound/controlled operations. DNB presents its preliminary view despite named authorship. Same paragraph allows loopholes and AI-specific future policy, so this is broad applicability, not universal sufficiency or a permanent rejection of new rules.

[Source copy used](https://www.dnb.nl/media/jkbip2jc/general-principles-for-the-use-of-artificial-intelligence-in-the-financial-sector.pdf).

Searches: `site.dnb.nl artificial intelligence existing 2019 principles`; `site.fsb.org 2017 artificial intelligence existing regulation`; `site.fsb.org artificial intelligence regulation before:2019`; `site.dnb.nl DNB komt met richtlijnen 25 juli 2019`.

FSB November 2017 and earlier-rule searches supplied no earlier institutional passage expressly asserting broad AI-framework coverage in the texts checked. This bounded result does not establish absence.

## Part A2 — passage classifications

### 6 — U12

**bears on**.

Committee voice, published 2025-08-13 per official release; report itself dated August 2025. All four quotes and locators verified in the byte-identical MediaNama mirror. Paragraph 3.2.3.5 acknowledges incremental gaps; p. 55 requests amendments where needed. Paragraph 4.4.33 proposes a standing committee and an AI-safety institutional spoke, not unambiguously a separate regulatory regime. Under decision 18a these do not alone dispute broad existing-rule coverage. Missing: an explicit denial of broad coverage/sufficiency or a requirement for a separate AI regulatory framework. Section 4.1.4 is stronger on the need for an appropriate framework but does not settle whether existing rules plus targeted measures supply it. No RBI adoption inferred.

- [Source copy](https://www.medianama.com/wp-content/uploads/2025/08/Framework-for-Responsible-and-Ethical-Enablement-of-Artificial-Intelligence-FREE-AI-RBI-Report.pdf): Chapter 3, paragraph 3.2.3.5, PDF p. 34; quotation verified.
- [Source copy](https://www.medianama.com/wp-content/uploads/2025/08/Framework-for-Responsible-and-Ethical-Enablement-of-Artificial-Intelligence-FREE-AI-RBI-Report.pdf): Chapter 4, recommendations on policy, PDF p. 55; quotation verified.
- [Source copy](https://www.medianama.com/wp-content/uploads/2025/08/Framework-for-Responsible-and-Ethical-Enablement-of-Artificial-Intelligence-FREE-AI-RBI-Report.pdf): Chapter 4, paragraph 4.1.5, PDF p. 44; quotation verified.
- [Source copy](https://www.medianama.com/wp-content/uploads/2025/08/Framework-for-Responsible-and-Ethical-Enablement-of-Artificial-Intelligence-FREE-AI-RBI-Report.pdf): Chapter 4, paragraph 4.4.33, PDF p. 59; quotation verified.

### 7 — U05

**articulates**.

Both quotations and paragraph locator verified. Governor Ida Wolden Bache, official speech, publication 2026-05-21. Surrounding text links ML forecast weighting and reduced forecast error to the Monetary Policy and Financial Stability Committee’s assessment base. Preliminary promising work; no claim of completed production deployment.

- [Source copy](https://www.norges-bank.no/en/news-events/news/Speeches/2026/2026-05-21-bache/): Paragraph beginning ‘We are currently exploring’; quotation verified.
- [Source copy](https://www.norges-bank.no/en/news-events/news/Speeches/2026/2026-05-21-bache/): Same paragraph; quotation verified.

### 8 — U12

**contests**.

Quotation, section and 2026-06-30 publication verified. Sarah Breeden’s official speech questions continuing sufficiency specifically because existing frameworks did not contemplate autonomous agents and human-in-loop reliance may fail. Following sentence allows more sophisticated governance/accountability frameworks. Qualified prospective contest of sufficiency, not denial that current rules apply.

- [Source copy](https://www.bankofengland.co.uk/speech/2026/june/sarah-breeden-panel-at-the-european-central-bank-forum-on-central-banking-2026): Section “Agentic payments and commerce”, final paragraph; quotation verified.

### 9 — U07

**articulates**.

Both abstract quotations and PDF p. 3 verified; hyphenation of cash-management crosses a line. Whole text experiments have the agent prioritise, schedule and defer wholesale payments subject to liquidity constraints. Staff authors Aldasoro and Desai, with BIS/BoC disclaimer. November 10, 2025 is the manuscript/title-page date; cover gives November. Do not automatically label it the publisher’s release date. Stylised simulations, not realised deployment or payment-network performance.

- [Source copy](https://www.bis.org/publications/working-paper-1310-ai-agents-cash-management-payment-systems.pdf): PDF p. 3, abstract; quotation verified.
- [Source copy](https://www.bis.org/publications/working-paper-1310-ai-agents-cash-management-payment-systems.pdf): PDF p. 3, abstract; quotation verified.

### 10 — U06

**articulates**.

All three quotations and page locators verified. Official speaker Ole Christian Bech-Moen; delivery 2026-01-29 confirmed by official landing page, published 2026-02-02. English speaking notes are explicitly ChatGPT-generated and Norges Bank post-edited; English wording’s contemporaneous availability on the delivery date is not independently attested. PDF p. 8 directly links AI, productivity and neutral-rate assessment; surrounding model simulations are conditional.

- [Source copy](https://www.norges-bank.no/contentassets/93003c5a459f4961bad556a1c444a8e2/speech_valutaseminaret2026.pdf?v=03022026122340): PDF p. 8, slide ‘“Real-time” estimates and model estimates of the neutral real rate’; quotation verified.
- [Source copy](https://www.norges-bank.no/contentassets/93003c5a459f4961bad556a1c444a8e2/speech_valutaseminaret2026.pdf?v=03022026122340): PDF p. 8, same passage; quotation verified.
- [Source copy](https://www.norges-bank.no/contentassets/93003c5a459f4961bad556a1c444a8e2/speech_valutaseminaret2026.pdf?v=03022026122340): PDF p. 1, heading; quotation verified.

### 11 — U12

**bears on**.

All three quotes occur in Chapter 3 F, printed p. 19 / PDF p. 22 in official IMF PDF; supplied eLibrary HTML is blocked (403). Staff voice with disclaimer; October 2021 PDF and 2021-10-22 landing-page date. Gaps are conditional, especially outside regulatory perimeters; clear standards/guidelines do not alone contest broad coverage under decision 18a. Sufficiency is reported as other jurisdictions’ conclusion, not the authors’ own articulation. Missing: authors’ explicit broad sufficiency claim or explicit denial of it. Cover credits Boukherouaa and Ghiath Shabsigh in collaboration with six others; brief’s five-name list is incomplete.

- [Source copy](https://www.imf.org/-/media/files/publications/dp/2021/english/pdeoraifea.pdf): Chapter 3, section F, final bullet (HTML); quotation verified.
- [Source copy](https://www.imf.org/-/media/files/publications/dp/2021/english/pdeoraifea.pdf): Chapter 3, section F (HTML); quotation verified.
- [Source copy](https://www.imf.org/-/media/files/publications/dp/2021/english/pdeoraifea.pdf): Chapter 3, section F (HTML); quotation verified.

### 12 — U06

**articulates**.

Qualified whole-text articulation, matching A1’s answer. All four quotations, cover disclaimer and delivery 2015-11-12 verified. AI/cognitive automation pp. 13–15 connects to labour substitution and inflation/policy pp. 16–18. This is a cross-page causal scenario, not a single direct AI-monetary-policy assertion or an empirical causal finding. Speaker voice only.

- [Source copy](https://www.bankofengland.co.uk/-/media/boe/files/speech/2015/labours-share.pdf): PDF p. 13 (printed p. 13); quotation verified.
- [Source copy](https://www.bankofengland.co.uk/-/media/boe/files/speech/2015/labours-share.pdf): PDF p. 16 (printed p. 16); quotation verified.
- [Source copy](https://www.bankofengland.co.uk/-/media/boe/files/speech/2015/labours-share.pdf): PDF p. 17 (printed p. 17); quotation verified.
- [Source copy](https://www.bankofengland.co.uk/-/media/boe/files/speech/2015/labours-share.pdf): PDF p. 17 (printed p. 17); quotation verified.

### 13 — U09

**articulates**.

All three quotations and PDF pp. 19/45 locators verified. Staff authors Sahajwala and Van den Bergh; December 2000 publication wording, official landing-page publication 27 December. PDF p. 4 disclaimer verified. Conclusions explicitly support AI-assisted accurate bank risk assessment and supervisory use. Actual past implementation dates do not antedate this document’s wording. A1’s extra locator notes contain slips: section 4 is printed 13 / PDF 19, TRAM printed 35 / PDF 41.

- [Source copy](https://www.bis.org/publications/supervisory-risk-assessment-and-early-warning-systems.pdf): PDF p. 19, section on financial ratio and peer group analysis; quotation verified.
- [Source copy](https://www.bis.org/publications/supervisory-risk-assessment-and-early-warning-systems.pdf): PDF p. 45, ‘Conclusions’; quotation verified.
- [Source copy](https://www.bis.org/publications/supervisory-risk-assessment-and-early-warning-systems.pdf): PDF p. 45, ‘Conclusions’; quotation verified.

### 14 — U05

**articulates**.

Both quotes and PDF pp. 5/6 locators verified, together with PDF p. 3 disclaimer. Staff authors McNelis and McAdam, April 2004 month precision. Non-technical summary limits gains by index, country and structural-instability setting; no universal advantage.

- [Source copy](https://www.ecb.europa.eu/pub/pdf/scpwps/ecbwp352.pdf): PDF p. 5, abstract; quotation verified.
- [Source copy](https://www.ecb.europa.eu/pub/pdf/scpwps/ecbwp352.pdf): PDF p. 6, non-technical summary; quotation verified.

### 15 — U10

**articulates**.

Main quote on PDF p. 3 and complementary Bundesbank consultation-page quote verified. Joint BaFin/Bundesbank institutional consultation, dated 2021-07-15 on official listing. Quantifying risks more accurately explicitly supplies improved risk management. Consultation, not binding final requirements.

- [Source copy](https://www.bundesbank.de/resource/blob/793670/61532e24c3298d8b24d4d15a34f503a8/472B63F073F071307366337C94F8C870/2021-07-15-ml-konsultationspapier-data.pdf): PDF p. 3, chapter I ‘Machine learning is advancing’; quotation verified.
- [Source copy](https://www.bundesbank.de/en/tasks/financial-supervision/individual-aspects/risk-management/machine-learning-methods): Section ‘Consultation 11/2021’; quotation verified.

### 16 — U12

**articulates**.

All three quotes and PDF pp. 5/33 locators verified. Institutional preliminary DNB view despite named author Joost van der Burgt. Official release notice refines 2019 to 2019-07-25. Existing regulations cover many prerequisites; possible loopholes/future AI-specific policy coexist. Does not assert complete coverage or rule out future changes.

- [Source copy](https://www.dnb.nl/media/jkbip2jc/general-principles-for-the-use-of-artificial-intelligence-in-the-financial-sector.pdf): PDF p. 5, ‘Practical information’; quotation verified.
- [Source copy](https://www.dnb.nl/media/jkbip2jc/general-principles-for-the-use-of-artificial-intelligence-in-the-financial-sector.pdf): PDF p. 33, chapter 4 ‘General principles for the use of AI by financial institutions (‘SAFEST’)’; quotation verified.
- [Source copy](https://www.dnb.nl/media/jkbip2jc/general-principles-for-the-use-of-artificial-intelligence-in-the-financial-sector.pdf): PDF p. 33, same paragraph; quotation verified.

### 17 — U12

**articulates**.

PDF p. 4 quotation and complementary Bundesbank page quotation verified. Joint institutional consultation, 2021-07-15, limited to ML in prudential risk models for banks/insurers. Largely transferable technology-neutral foundations directly meet broad applicability, while few adaptations remain possible.

- [Source copy](https://www.bundesbank.de/resource/blob/793670/61532e24c3298d8b24d4d15a34f503a8/472B63F073F071307366337C94F8C870/2021-07-15-ml-konsultationspapier-data.pdf): PDF p. 4, chapter I ‘Machine learning is advancing’; quotation verified.
- [Source copy](https://www.bundesbank.de/en/tasks/financial-supervision/individual-aspects/risk-management/machine-learning-methods): Section ‘Consultation 11/2021’; quotation verified.

### 18 — U05

**articulates**.

Danish quotation and summary locator verified verbatim. Institutional Nationalbank publication page, 2019-01-21; original Danish kept as evidence, supplied English translation is faithful. Page places ML text analysis and improved bankruptcy-probability accuracy under financial stability and financial risks: central-bank economic/risk analysis rather than a claim about private firms adopting it. Full report attachment was not retrieved; this check covers the institutional landing summary only.

- [Source copy](https://www.nationalbanken.dk/da/viden-og-nyheder/publikationer-og-taler/arkiv-publikationer/2019/tekstbaseret-machine-learning-forbedrer-konkursmodellering): Landing page, summary paragraph; quotation verified.

### 19 — U04

**articulates**.

PDF p. 13 quotation and complementary Bundesbank page quotation verified. Joint BaFin/Bundesbank institutional consultation, 2021-07-15. Reduced transparency explicitly impedes validators/supervisors’ comprehension and output checks. Following paragraphs require weighing better predictive ability against model risk and explainability; no claim all black-box models are prohibited.

- [Source copy](https://www.bundesbank.de/resource/blob/793670/61532e24c3298d8b24d4d15a34f503a8/472B63F073F071307366337C94F8C870/2021-07-15-ml-konsultationspapier-data.pdf): PDF p. 13, chapter III.3 ‘Focus on explainability’; quotation verified.
- [Source copy](https://www.bundesbank.de/en/tasks/financial-supervision/individual-aspects/risk-management/machine-learning-methods): Section ‘Consultation 11/2021’; quotation verified.

## Part B — direct checks

### 20 — am-event-rb-2025-ai-policy

**agree**.

institutional Executive Board decision; 2025-05-26 (decision day).

Locator: PDF p. 1, Riksbankens beslut and Skälen för beslutet.

> Riksbanken fastställer AI-policy för Sveriges riksbank i enlighet med bilaga.

Both Swedish quotations are verbatim at the supplied locators. Adoption is stated done on 26 May; entry into force is separately 1 June 2025. Annex sets purposes, principles and governance of internal AI use. No inference of implementation or effectiveness; dated status treatment is appropriate.

[Source copy used](https://www.riksbank.se/globalassets/media/dagordningar--protokoll/protokoll/direktionen/2025/250526/protokollsbilaga-d-beslut-ai-policy-for-sveriges-riksbank.pdf).

### 21 — am-event-fsb-2017-ai-ml-monitoring

**agree**.

institutional report; 2017-06-27 (publication day).

Locator: Annex G, Description, printed p. 55 / PDF p. 59.

> The FSB is conducting ongoing monitoring of AI and machine learning in financial services.

Quotation verbatim. Following sentences identify initial, preliminary findings subject to change. Under-way status is correct; no commencement or completion date is supplied. The observation date must not be converted into a project start date.

[Source copy used](https://www.fsb.org/uploads/R270617.pdf).

### 22 — am-event-fsb-2024-ai-report-update

**minor**.

official speech, Klaas Knot as FSB Chair; 2024-07-11 (speech/publication day; work observed in 2024).

Locator: Paragraph beginning This year, we are updating.

> This year, we are updating an FSB paper

Full supplied quotation is verbatim. Under-way stage, year precision and attributed official statement are supported. Disclaimer expressly excludes necessary agreement by FSB/members; later paragraph calls the work purely analytical, without policy-option development then. The project-launched type is an over-strong taxonomy label for update-in-progress evidence: use an ongoing-work/status type at admission or keep its explicit no-launch-date qualification. No actual launch is demonstrated.

[Source copy used](https://www.fsb.org/2024/07/the-ai-adventure-how-artificial-intelligence-may-shape-the-economy-and-the-financial-system/).

### 23 — am-event-fsb-2026-frontier-ai-cyber-work

**agree**.

official Chair letter, Andrew Bailey; 2026-08-28 (letter date, not filename date).

Locator: Frontier AI section, PDF p. 2.

> the FSB is exploring particular issues

Full quoted passage is verbatim across PDF lines. Surrounding text also states exploration of response/recovery capabilities for significant operational disruption. Under-way status is supported; no realised results, commencement or completion date. Letter date is 28 August although URL says P310826.

[Source copy used](https://www.fsb.org/uploads/P310826.pdf).

### 24 — dnb-document-date-voice

**minor**.

General principles for the use of Artificial Intelligence in the financial sector.

2019-07-25 (official publication notice day).

Locator: DNB release date label; discussion paper PDF pp. 5 and 33.

Official DNB notice explicitly dates publication 25 July 2019. Refine the year-only record to that day. Institutional voice is supported by DNB presenting its preliminary view on p. 5; retain named author Joost van der Burgt and consultation/preliminary status. The English report wording is not independently authenticated by a July 2019 archive in this task.

[Source copy used](https://www.dnb.nl/algemeen-nieuws/nieuws-2019/dnb-komt-met-richtlijnen-voor-gebruik-kunstmatige-intelligentie/).

### 25 — dn-document-voice

**minor**.

Tekstbaseret machine learning forbedrer konkursmodellering.

2019-01-21 (publication day; editorial close separately 2019-01-18).

Locator: PDF pp. 1, 2 and 7, including visually inspected p. 7 credits.

PDF p. 7 names Anna Kirstine Hvid and Pia Mølgaard, both Quantitative Risk Analyst, Financial Stability. It carries no located author-views/staff disclaimer in its seven pages; the series description presents Nationalbank analyses of economic and financial conditions, with Danish prevailing over English in translation doubt. Record those named staff credits. Names alone do not establish staff-only voice: unlike an explicit working-paper disclaimer, these footer credits do not disown institutional responsibility. Retaining qualified institutional analytical-series voice is defensible; do not claim anonymity or that the PDF proves staff-only voice. Page 2 distinguishes the underlying November 2018 Working Paper, whose authorship/voice is a separate document question.

[Source copy used](https://www.nationalbanken.dk/media/wksfsbkg/analyse-nr-3-tekstbaseret-machine-learning-forbedrer-konkursmodellering.pdf).

### 26 — nb-document-version

**minor**.

Hvordan kan KI påvirke pengepolitikken? / How can AI affect monetary policy?.

official speaker Ole Christian Bech-Moen; 2026-01-29 (delivery and Norwegian publication day; English landing publication 2026-02-02).

Locator: Norwegian speaking notes PDF p. 8; English notes PDF pp. 1 and 8; both official landing pages.

> kan KI bidra til en oppgang i den nøytrale renten.

Yes: a Norwegian text exists, linked as Talepunkter til presentasjonen, and directly supports the AI/productivity/neutral-rate proposition. Its page is published 29 January 2026 16:00; English page is published 2 February 12:05. The quoted English is the explicitly ChatGPT-generated, post-edited translation, not a verbatim English delivery on 29 January. Record Norwegian as the original published expression alongside delivery date, and the English translation as a separate version. This checks published notes, not an audio transcript of every delivered word.

[Source copy used](https://www.norges-bank.no/contentassets/93003c5a459f4961bad556a1c444a8e2/talepunkter_valutaseminaret2026-002.pdf?v=29012026160421).

### 27 — bcbs-document-voice-date

**agree**.

Supervisory risk assessment and early warning systems.

staff authors Sahajwala and Van den Bergh; 2000-12 (publication month in PDF; official landing day 2000-12-27).

Locator: PDF pp. 1/3 authors and cover date; PDF p. 4 disclaimer; BIS landing date.

Staff voice is explicitly warranted by two named authors and the series disclaimer, which is verbatim as supplied. December 2000 correctly preserves the PDF’s wording date; 27 December is the official landing-page publication metadata. These may coexist without falsely claiming day-level wording authentication.

[Source copy used](https://www.bis.org/publications/supervisory-risk-assessment-and-early-warning-systems.pdf).

## Part C — retrievals

### 28 — dnb-pdf-retrieval

**agree**.

Locator: PDF pp. 5 and 33.

Recovered by direct Windows curl, HTTP 200 on 2026-11-04; SHA-256 38c6ad434f68bdd0075a52dc31b360a05d6c8719c420c5491ed423167562228c, matching supplied copy. Earlier urllib request returned 403; keep both outcomes. Both requested quotations verified, with p. 33’s loopholes and potential AI-specific policies retained. Resolves this environment’s old PDF access gap.

[Source copy used](https://www.dnb.nl/media/jkbip2jc/general-principles-for-the-use-of-artificial-intelligence-in-the-financial-sector.pdf).

### 29 — dnb-release-retrieval

**minor**.

Locator: DNB news release heading/date and report link.

Recovered official DNB notice, HTTP 200 on 2026-11-04; SHA-256 c14bb551bb6e043f5c7d1fcd2ab526ab8114c513125e79dfac676743abd7f7d7. Publication label gives 25 July 2019. Resolves date hold; supports refining document metadata as in item 24, not altering the substantive U12 qualification.

[Source copy used](https://www.dnb.nl/algemeen-nieuws/nieuws-2019/dnb-komt-met-richtlijnen-voor-gebruik-kunstmatige-intelligentie/).

### 30 — dn-pdf-retrieval

**minor**.

Locator: Analysis No. 3, PDF p. 7 credits/series statement; p. 1 publication date.

Located by bounded title search and retrieved official PDF, HTTP 200 on 2026-11-04; SHA-256 c9522edff1ce7caa7d691c8d3b107b3381879f2d9203280a2165e14021586f66. Names Anna Kirstine Hvid and Pia Mølgaard as Quantitative Risk Analysts. No staff-views disclaimer located in full seven-page text; final credits page also visually inspected. Add credits and separate editorial-close date 18 January from publication 21 January. Institutional-series voice remains qualified; see item 25. Resolves missing-PDF gap.

[Source copy used](https://www.nationalbanken.dk/media/wksfsbkg/analyse-nr-3-tekstbaseret-machine-learning-forbedrer-konkursmodellering.pdf).

### 31 — fed-roundtable-posting-date

**cannot check**.

Locator: One-page meeting note; Waller speech dated 2026-09-29, footnote 7.

PDF retrieved, HTTP 200 on 2026-11-04; SHA-256 36e311cfd5cdcc3cd75780de27c89166541b48d94123d5df0e5d74227d7c66c8. Printed 26 May 2026 is the meeting date, not publication. Official Waller speech links it in footnote 7 and is dated/last-updated 29 September 2026 despite filename waller20260928a. That is a dated link on a live page, not an exact original posting date for the PDF. No Board page explicitly giving its posting day was located by exact-filename search and the linked speech. Keep publication unknown; do not substitute the supplied Last-Modified header or filename. Passage/meeting are checkable; requested posting date is unresolved.

[Source copy used](https://www.federalreserve.gov/paymentsystems/files/payments-innovation-roundtable-meeting-20260526.pdf).

### 32 — U05

**material**.

One Bank Research Agenda, Discussion Paper.

institutional research agenda; 2015-02 (paper month, official launch 2015-02-25; archived original captured 2015-03-19).

Locator: Theme 4, printed pp. 23–24 / PDF pp. 24–25, especially p. 24.

> textual information has been quantified systematically using machine-learning algorithms

Recovered full 50-page paper from a March 2015 archive capture of the official URL: HTTP 200 on 2026-11-04, SHA-256 a1963d083b2d45b092c2bd129d96c8130b85f8abe892cd35bf48de5cfb2e15e2. Explicitly discusses AI/ML methods analysing central-bank policy communications, then endorses their potential to inform sentiment assessment. Meets U05 at whole-section level and provides a 2015 institutional candidate, though not earlier than ECB 2004 staff text. Do not claim the adjacent Google-query nowcasting example necessarily uses ML; FCA transaction-data monitoring alone does not establish AI suptech. Legacy official URL and guessed migrated full-paper URL returned 404. Official summary PDF was retrieved separately and lacks the full passage. A labelled 50-page mirror was also retrieved (HTTP 200, SHA-256 7eb285db56902ed530a9885d7ed01c3b89a8fcd43f4a6b0c2a0811b09f286b91); byte hashes and complete extracted texts differ, so only the archived original is used for this finding.

[Source copy used](https://web.archive.org/web/20150319140614id_/http://www.bankofengland.co.uk:80/research/Documents/onebank/discussion.pdf).

### 33 — canada-99-3-retrieval

**agree**.

Forecasting GDP Growth Using Artificial Neural Networks, Bank of Canada Working Paper 99-3.

staff authors Greg Tkacz and Sarah Hu; 1999-01 (publication month, PDF p. 3).

Locator: PDF p. 3 title/date/disclaimer; abstract printed p. v / PDF p. 7.

> At the 4-quarter horizon, however, the improved forecast accuracy is statistically significant.

Recovered official Bank of Canada repository PDF by a bounded direct file-path attempt, HTTP 200 on 2026-11-04; SHA-256 165a1394abdf4085aff1599a558455c029db823f21b6a06c8f7aa4699db6ed95. Legacy bank URL still redirects through DOI to an empty repository landing response (202). Direct record/825/files/wp99-3.pdf redirects to its downloadable nanna file with ordinary metadata/download parameters. Explicit authors’ views disclaimer; neural networks improve four-quarter GDP forecasts, not significantly one-quarter forecasts. It is an inspected earlier lead, but Bank of Canada is outside revised named-body bounds under decision 16a: no in-scope earliest-role promotion. Government deposit URL returned an archived-page wrapper, not PDF; no evidence claim from that wrapper.

[Source copy used](https://www.oar-rao.bank-banque-canada.ca/nanna/record/825/files/wp99-3.pdf?withWatermark=0&withMetadata=0&registerDownload=1&version=1).

## Comparison

Comparison added only after both checkpoint commits/pushes. Frozen Part A answers are preserved byte-for-byte at the JSON object projection level after excluding the appended comparison field. Agree means substantive agreement within stated bounds; minor includes metadata, credit, taxonomy and checker-locator corrections; material includes stance/earliest-role boundaries or a recovered institutional source affecting a comparator; cannot check marks an unresolved requested fact. Counts are item outcomes, not distinct defects.

| Item   | Verdict  | Finding                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1 U05  | agree    | ECB WP 352, April 2004, staff authors and disclaimer match. Earlier out-of-scope Bank of Canada lead does not change the scoped answer.                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| 2 U06  | agree    | Haldane 12 November 2015 matches, with a whole-text AI/labour-substitution bridge to the monetary-policy scenario; speaker disclaimer retained.                                                                                                                                                                                                                                                                                                                                                                                                                          |
| 3 U07  | material | Pack selects BIS WP 1310 (manuscript 10 November 2025). Frozen answer proposes BIS WP 1194 (June 2024) using autonomous financial-product sales plus its AI-agent/faster-payment-flows table. Post-blind pack record am-u07-bis-wp-1194 already treats the table as bears on because it lacks explicit agent payment execution. This is a criterion-boundary disagreement, not discovery of an absent record. Table alone is insufficient; adjudicate the additional surrounding transactions evidence and keep the role on hold if payment initiation must be explicit. |
| 4 U09  | minor    | December 2000 BCBS staff text agrees. Checker’s frozen A1 locators were wrong: section 4 is printed p. 13 / PDF p. 19, TRAM printed p. 35 / PDF p. 41. Pack’s supplied pp. 19/45 are correct. Corrected independently in frozen A2 item 13; no earliest-role disagreement.                                                                                                                                                                                                                                                                                               |
| 5 U12  | minor    | Institutional DNB comparator agrees. Official release refines pack’s year-only date to 25 July 2019. Preserve preliminary view, possible loopholes and future AI-specific policy.                                                                                                                                                                                                                                                                                                                                                                                        |
| 6 U12  | material | Pack contests U12 on a dedicated framework; frozen answer bears on. The dedicated institutional framework on PDF p. 59 is an AI-safety/coordination institution and standing committee, which is not automatically a separate regulatory regime. Incremental amendments alone are excluded by decision 18a. Adjudicate this institutional-versus-regulatory-framework distinction rather than inferring a broad rejection of existing-rule coverage.                                                                                                                     |
| 7 U05  | agree    | Articulation and official speech voice agree; preliminary work in progress, not adopted model.                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| 8 U12  | material | Pack bears on; frozen answer is a qualified prospective contest. Checker treats the human-in-loop premise and frameworks not designed for autonomous agents as an argument against continuing sufficiency. Pack reasonably distinguishes a question/possible adaptation from an express broad-coverage rejection under decision 18a. Preserve this uncertainty; do not automatically override context classification.                                                                                                                                                    |
| 9 U07  | minor    | Articulation, staff disclaimer and simulation limits agree. PDF title is dated 10 November 2025; official BIS page gives publication 26 November. Keep manuscript/wording date and publisher release distinct instead of calling 10 November the verified publication day.                                                                                                                                                                                                                                                                                               |
| 10 U06 | minor    | Articulation and delivery date agree. Official Norwegian notes recovered: Norwegian page published 29 January, English page 2 February. Record original-language and machine-translated/post-edited versions separately; no verbatim English delivery claim.                                                                                                                                                                                                                                                                                                             |
| 11 U12 | minor    | Bears-on classification agrees with decision 18a. Official IMF PDF verifies passages despite blocked eLibrary. Brief/statement credits omit Ghiath Shabsigh, Ebru S. Iskender and Alin T. Mirestean: cover credits two preparers in collaboration with six others. Correct attribution metadata; no stance change.                                                                                                                                                                                                                                                       |
| 12 U06 | agree    | Qualified whole-text articulation and earliest role agree, including speaker disclaimer and scenario rather than realised causation.                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| 13 U09 | agree    | Staff voice, December 2000 wording date, expert-system meaning and articulation agree; exact conclusion and section locators verified.                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| 14 U05 | agree    | April 2004 staff articulation agrees. Gains are index/country/period specific; forecasts can converge without structural change.                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| 15 U10 | agree    | Joint institutional consultation articulates possible improved firm risk management; no measured performance claim.                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| 16 U12 | minor    | Institutional preliminary-view articulation agrees. Refine year-only metadata using the official 25 July 2019 notice; preserve loopholes and prospective regulation.                                                                                                                                                                                                                                                                                                                                                                                                     |
| 17 U12 | agree    | Joint consultation’s broad transferability of technology-neutral foundations and few possible adaptations match.                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| 18 U05 | minor    | U05 articulation agrees. Later full PDF retrieval adds analyst credits Hvid/Mølgaard and editorial-close date; no staff-views disclaimer located. Do not make an automatic institution-to-staff switch from footer names alone.                                                                                                                                                                                                                                                                                                                                          |
| 19 U04 | agree    | U04 articulation agrees; reduced transparency obstructs comprehension/output validation, with model-performance trade-offs retained.                                                                                                                                                                                                                                                                                                                                                                                                                                     |

The U07 disagreement is about a record already present as context (BIS WP 1194), not a missing source. The stronger whole-document reading remains conditional. The two U12 disputes concern sufficiency and the meaning of a dedicated institutional framework; neither side’s machine classification is editorial acceptance.

The recovered BoE February 2015 discussion paper supplies a U05 institutional candidate predating the pack’s 2017 institutional texts. It does not displace the April 2004 staff earliest text. The recovered Canadian January 1999 staff paper stays outside the revised named-body scope.

No automatic pack corrections or admissions are made. The exact Fed note posting date remains unresolved despite successful passage access.

## Wording and attribution audit

All 14 A2 statement strings in verdicts and four event narratives in brief; also targeted U07 WP 1194 record. No general audit of unselected records.

No unqualified promotion of an official/staff view to institution policy found in these statements. IMF author credits are incomplete (item 11); Norges original/translated versions need separating (items 10/26); Danish staff credits should be recorded without inventing a disclaimer (18/25/30).

- Item 7, **promising**: Explicitly attributed to Bache’s preliminary-results statement; source language, not checker endorsement.
- Item 14, **best-performing**: Source’s comparative forecast-model claim, bounded by index/country/period; not an unqualified editorial ranking.
- Item 18, **substantially**: Degree in the Danish source’s summary; retain only as source-attributed wording, not an independent performance validation.

Earliest located is bounded documentary search, never first statement. No unqualified first-ever assertion or motive attribution found in the inspected statements.

## Source-copy and retrieval record

The companion JSON records all retained response hops with date, status, content type, bytes, SHA-256 and supplied-hash comparison. Failed attempts, original hosts and alternate copies remain separate. No signed access query is retained.

- `ecb352`: Initial Python urllib certificate-chain failure; later Windows curl succeeded..
- `haldane`: 200 2026-11-04T14:33:36Z [www.bankofengland.co.uk]; hash matches supplied.
- `bcbs4`: 301 2026-11-04T14:33:38Z [www.bis.org] → 200 2026-11-04T14:33:47Z [www.bis.org].
- `dnb2019`: 403 2026-11-04T14:33:47Z [www.dnb.nl].
- `bis1194`: 301 2026-11-04T14:33:55Z [www.bis.org] → 200 2026-11-04T14:34:03Z [www.bis.org].
- `ecb352`: 200 2026-11-04T14:35:15Z [www.ecb.europa.eu]; hash matches supplied.
- `bcbs4pdf`: 200 2026-11-04T14:35:17Z [www.bis.org]; hash matches supplied.
- `dnb2019retry`: 200 2026-11-04T14:35:25Z [www.dnb.nl]; hash matches supplied.
- `bis1194pdf`: 200 2026-11-04T14:35:27Z [www.bis.org].
- `fsb2017`: 200 2026-11-04T14:35:34Z [www.fsb.org].
- `ecb2025fintech`: 200 2026-11-04T14:35:48Z [www.ecb.europa.eu].
- `dnbrelease`: 200 2026-11-04T14:37:19Z [www.dnb.nl].
- `frb1997`: 200 2026-11-04T14:37:20Z [www.federalreserve.gov].
- `bis1310`: 200 2026-11-04T14:37:21Z [www.bis.org]; hash matches supplied.
- `boe-2026-breeden-agents-of-change`: 200 2026-11-04T14:38:48Z [www.bankofengland.co.uk]; hash differs from supplied.
- `buba-2021-ml-risk-models-consultation`: 200 2026-11-04T14:38:49Z [www.bundesbank.de]; hash matches supplied.
- `buba-ml-methods-page`: 301 2026-11-04T14:38:57Z [www.bundesbank.de] → 200 2026-11-04T14:39:05Z [www.bundesbank.de]; hash differs from supplied.
- `dn-2019-text-ml-bankruptcy`: 200 2026-11-04T14:39:06Z [www.nationalbanken.dk]; hash matches supplied.
- `imf-2021-dp-ai-finance`: 403 2026-11-04T14:39:08Z [www.elibrary.imf.org]; hash differs from supplied.
- `nb-2026-bache-models`: 200 2026-11-04T14:39:08Z [www.norges-bank.no]; hash differs from supplied.
- `nb-2026-bech-moen-speech`: 301 2026-11-04T14:39:16Z [www.norges-bank.no] → 200 2026-11-04T14:39:25Z [www.norges-bank.no]; hash matches supplied.
- `rbi-2025-free-ai-report`: curl TLS-close error (56); no completed response retained..
- `imf2021pdf`: 200 2026-11-04T14:40:15Z [www.imf.org]; hash differs from supplied.
- `rbiindex`: 302 2026-11-04T14:40:21Z [m.rbi.org.in] → 200 2026-11-04T14:40:23Z [rbi.org.in].
- `rbiretry`: curl TLS-close error (56); no completed response retained..
- `nbbechpage`: 404 2026-11-04T14:40:27Z [www.norges-bank.no].
- `rbi200body`: curl TLS-close error (56); no completed response retained..
- `nbbechdate`: 200 2026-11-04T14:41:14Z [www.norges-bank.no].
- `rbihtml`: 200 2026-11-04T14:41:15Z [www.rbi.org.in].
- `rbimirror`: 200 2026-11-04T14:42:05Z [www.medianama.com]; hash matches supplied.
- `rbirelease`: 200 2026-11-04T14:42:12Z [www.rbi.org.in].
- `bis1310page`: 200 2026-11-04T14:45:15Z [www.bis.org].
- `imf2021page`: 200 2026-11-04T14:45:16Z [www.imf.org].
- `fsb-2017-fintech-fs`: 200 2026-11-04T14:48:04Z [www.fsb.org]; hash matches supplied.
- `fsb-2024-knot-ai-page`: 200 2026-11-04T14:48:13Z [www.fsb.org]; hash differs from supplied.
- `fsb-2026-bailey-g20-letter`: 200 2026-11-04T14:48:21Z [www.fsb.org]; hash matches supplied.
- `rb-2025-ai-policy-decision`: 200 2026-11-04T14:48:24Z [www.riksbank.se]; hash matches supplied.
- `fed2026roundtable`: 200 2026-11-04T14:48:25Z [www.federalreserve.gov].
- `canada993`: 301 2026-11-04T14:48:26Z [www.bankofcanada.ca] → 302 2026-11-04T14:48:26Z [doi.org] → 202 2026-11-04T14:48:27Z [www.oar-rao.bank-banque-canada.ca].
- `dn2019pdf`: 200 2026-11-04T14:49:06Z [www.nationalbanken.dk].
- `boe2015agenda`: 200 2026-11-04T14:49:07Z [www.bankofengland.co.uk].
- `boe2015launch`: 200 2026-11-04T14:49:15Z [www.bankofengland.co.uk].
- `fed2026waller`: 200 2026-11-04T14:49:16Z [www.federalreserve.gov].
- `nbbechnorwegian`: 200 2026-11-04T14:49:16Z [www.norges-bank.no].
- `canada993gov`: 307 2026-11-04T14:49:17Z [publications.gc.ca] → 200 2026-11-04T14:49:25Z [publications.gc.ca].
- `nbbechnorwegiannotes`: 301 2026-11-04T14:50:51Z [www.norges-bank.no] → 200 2026-11-04T14:50:59Z [www.norges-bank.no].
- `canada993oarpdf`: 302 2026-11-04T14:51:00Z [www.oar-rao.bank-banque-canada.ca] → 200 2026-11-04T14:51:09Z [www.oar-rao.bank-banque-canada.ca].
- `canada993catalog`: 200 2026-11-04T14:51:12Z [publications.gc.ca].
- `boe2015discussionold`: 404 2026-11-04T14:51:19Z [www.bankofengland.co.uk].
- `boe2015discussion`: 302 2026-11-04T14:51:27Z [www.bankofengland.co.uk] → 404 2026-11-04T14:51:35Z [www.bankofengland.co.uk].
- `boe2015archiveindex`: 200 2026-11-04T14:52:20Z [web.archive.org].
- `boe2015discussionmirror`: 200 2026-11-04T14:52:25Z [cryptochainuni.com].
- `boe2015discussionarchive`: 200 2026-11-04T14:53:28Z [web.archive.org].

## Checks and decisions

All 34 supplied A2 quotations, all five supplied event quotations and all 12 checker excerpts match retrieved text under whitespace/typography/PDF normalisation. Checker excerpts have at most 21 words. Original Part A JSON projection read directly from cdce4f2 equals final items 1–19 after removing only appended comparison fields; SHA-256 08d51b2817493e0212c5e49d1c46fcd1a33be2ed921bb34cf7dc1338a1cb2034.

22 tests passed in three focused suites: src/research/collection.test.ts, src/research/followup.test.ts and src/editorial/earliest-packet.test.ts. Initial sandbox run failed before tests on temporary module access; approved rerun passed. No review pack was regenerated or annotated.

First checkpoint: full-index pnpm check:privacy passed (2,175 files). Later checkpoints use a disclosed temporary index containing only the two changed reports, after the unchanged baseline passed in full. Each scan precedes its commit and push.

pnpm exec in fresh worktree attempted dependency registration and failed on a sandbox symlink; no tracked files changed. Formatting used existing root Prettier directly. Initial node HTTP attempts failed without source bodies; public HTTP retrieval continued through approved Windows curl.

Formatting checked only on task-owned Markdown/JSON. No pack/review generation, data amendment, application build or browser test; no UI or application change.

- U07: adjudicate whether WP 1194’s autonomous-sales discussion plus payment-flows table meets the transactions limb, or requires an explicit payment-initiation sentence.
- U12: adjudicate RBI’s dedicated AI-safety institution versus a separate regulatory framework, and Breeden’s prospective sufficiency argument versus a question alone.
- Record recovered dates, author credits, original/translated versions and BoE 2015 institutional candidate; correct checker’s A1 BCBS locators without rewriting the frozen answer.
- Keep Fed posting day unknown; keep Bank of Canada 1999 outside current scope. Machine checks do not constitute human acceptance.
