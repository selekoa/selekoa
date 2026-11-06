| Item / record                                                   | Result      |
| --------------------------------------------------------------- | ----------- |
| H01 — Illinois Public Act 104-0538                              | supports    |
| H02 — GB 45438-2025 scope                                       | supports    |
| H03 — Christiano: Takeoff speeds account tie                    | supports    |
| H04 — Butler 1865 attribution and bibliography                  | supports    |
| H05 — AI Magazine Winter 2006 date                              | not settled |
| H06 — Shanghai AI Laboratory founding                           | not settled |
| H07 — Tencent ESG AI Technical Committee filing date            | supports    |
| H08 — Tencent ESG safety red lines filing date                  | supports    |
| H09 — Nadella effective chair date                              | supports    |
| H10 — NVIDIA H20 statements versus BIS letter/rule              | not settled |
| H11 — ADA Space Three-Body / Xingsuan group 01 launch           | supports    |
| H12 — Starcloud-1 Gemini versus Gemma                           | not settled |
| H13 — O3 earlier orbital lead: Periola and Kolawole             | supports    |
| H14 — O10 earlier orbital lead: ASPLOS 2020                     | not settled |
| H15 — Michigan HB 4668 after 23 March 2026                      | not settled |
| H16 — SB 1047 Senate vote, 21 May 2024                          | supports    |
| H17 — SB 1047 Assembly vote, 28 August 2024                     | contradicts |
| H18 — SB 1047 Senate concurrence, 29 August 2024                | contradicts |
| H19 — Hanson 1994 base-record publication day                   | not settled |
| H20 — Hanson in printed Extropy 13: W03                         | supports    |
| H21 — NRC Amendment No. 307 text                                | blocked     |
| H22 — Constellation 2027 restart target                         | supports    |
| H23 — Audit B3: Moravec Analog author file                      | supports    |
| H24 — Audit B3: Moravec genetic-takeover author file            | supports    |
| H25 — Audit B5: CNCERT typing                                   | not settled |
| H26 — Audit B6: Acemoglu–Restrepo working paper / journal       | supports    |
| H27 — Audit B6: Agrawal–Gans–Goldfarb working paper / journal   | supports    |
| H28 — Audit C9: UK institute launch versus renaming             | supports    |
| H29 — MiniMax M3 alternate-host capture                         | supports    |
| H30 — Ulam 1958 memoir of John von Neumann: singularity passage | supports    |

# Held records: retrieval and comparison, 4 November 2026

Completed retrieval and comparison of every D17 bullet, including its named audit holds and the separate Constellation target decision, plus Illinois first and the authorised Ulam follow-up. No records admitted or corrected; no editorial decisions applied. No changes to data/, src/, release/ or review/. No PR, merge, main push, publication or deployment.

Branch: `codex/held-records-2026-11-04`; fetched base: `790d9bf`.

Cited review sections read before retrieval. Primary sources retrieved sequentially by direct curl HTTP with at least 1.5 seconds between requests; archive fallback where needed. Source bodies kept in memory only, except the authorised unedited Illinois government-edict extraction. Short quotations and authored comparisons only. HTTP 200 is not treated as proof of a document. Capture timestamps distinguish preserved expressions from event/publication dates. No Wikipedia evidence. English renderings of Chinese are machine translations, not human verified. HTTP failures were retried outside the sandbox network allowlist. Search-engine discovery was used for source locations only; comparisons rest on the directly retrieved sources listed below. Temporary scan page images were used for visual reading and are not retained in the worktree. For the original 29-item batch, all PDF pages were extracted where a text layer was available; comparisons use the identified passages, headings and content boundaries, not an exhaustive clause-by-clause collation or a check of mathematical results. Ulam follow-up: PDF pp. 1 and 5 were extracted, and p. 5 was also read visually; the rest of the memoir was not audited.

## H01 — Illinois Public Act 104-0538

- **Status:** supports.
- **Record/source IDs:** `Public Act 104-0538`, `SB0315 Enrolled`.
- **Read first:** review/frameworks-to-law-admission-2-2026-10-28.md § Open for the maintainer 4; review/frameworks-to-law-pack-2026-10-28.md § Q8 (decision 8).
- **Held point:** Recover the Act's own bill identity and text, previously unreachable.
- **Address read:** [source](https://web.archive.org/web/20260908054441id_/https://www.ilga.gov/Documents/Legislation/PublicActs/104/PDF/104-0538.pdf); HTTP 200; capture 2026-09-08T05:44:41Z; retrieved 2026-11-04. SHA-256 `f10cd7d854d5a6e1ab2c5e982e458d744abbfbdafde97f897ae03d1d8069f71f`.
  - **Quotation:** “This Act may be cited as the Artificial Intelligence Safety Measures Act.” (Section 1, PDF p. 1).
  - **Source states (paraphrase):** The recurring footer identifies Public Act 104-0538 and SB0315 Enrolled. Section 99 (PDF p. 56) states an effective date of January 1, 2027; Section 10(a), beginning on PDF p. 4, schedules the large-developer framework duty from January 1, 2028. (Section 1, PDF p. 1).
- **Address read:** [source](https://www.ilga.gov/Documents/Legislation/PublicActs/104/PDF/104-0538.pdf); transport failure; capture none (live); retrieved 2026-11-04.
  - **Retrieval limit:** Live connection failed after about 21 seconds; archived PDF successfully retrieved.
- **Comparison:** Supports the Act and bill identity and recovers the statutory text. The PDF does not by itself establish the governor's approval date; effective dates and duty start dates are separate.
- **Note:** Unedited PDF.js extraction saved at research/laws-compared/sources/il-pa-104-0538.txt; 56 pages, form-feed separators, provenance header; no OCR or editorial cleanup.

## H02 — GB 45438-2025 scope

- **Status:** supports.
- **Record/source IDs:** `fl-cn-gb45438-scope`, `cn-gb45438-openstd`.
- **Read first:** review/frameworks-to-law-admission-1-2026-10-28.md § Held.
- **Held point:** Read the edition's own scope rather than relying on SAMR's news description.
- **Address read:** [source](https://www.xiongan.gov.cn/20250617/99e8309670814bdba91b3bcbfaca4e6c/2025061799e8309670814bdba91b3bcbfaca4e6c_38598ff9004470443c9195f1655adb29a0.pdf); HTTP 200; capture none (live); retrieved 2026-11-04. SHA-256 `bb704324cbfeb19e98df040cf08a0912475ed5cb4a80782108b74e634e51c8c3`.
  - **Quotation:** “本文件适用于生成合成服务提供者和内容传播服务提供者开展人工智能生成合成内容标识活动。” (Section 1 范围, printed p. 1 / PDF p. 5).
  - **Source states (paraphrase):** It specifies methods for labelling AI-generated/synthetic content and applies to generation/synthesis service providers and content dissemination service providers carrying out those labelling activities. (Section 1 范围, printed p. 1 / PDF p. 5).
- **Address read:** [source](https://openstd.samr.gov.cn/bzgk/std/newGbInfo?hcno=F32EA2A561F1886CD8D606513512D547); HTTP 200; capture none (live); retrieved 2026-11-04.
  - **Source states (paraphrase):** Catalogue identifies the standard, publication on 2025-02-28 and implementation on 2025-09-01; catalogue metadata is not the scope clause. (Catalogue fields).
- **Address read:** [source](https://www.tc260.org.cn/upload/2025-03-15/1742009439794081593.pdf); HTTP 200; capture none (live); retrieved 2026-11-04.
  - **Retrieval limit:** Returned TC260 homepage HTML, not a PDF; excluded as clause evidence.
- **Comparison:** Supports the held scope proposition with the standard's own clause in a government-hosted copy.
- **Note:** The clause limits application to labelling activities; it is not a general assertion that every service falls under every obligation.

## H03 — Christiano: Takeoff speeds account tie

- **Status:** supports.
- **Record/source IDs:** `A105`, `source-christiano-2018-takeoff-speeds`.
- **Read first:** review/author-persons-admission-2026-10-27.md § Held; § Username credits.
- **Held point:** Tie the sideways-view.com byline paulfchristiano to Paul Christiano, rather than assuming the forum identity carries across hosts.
- **Address read:** [source](https://sideways-view.com/2018/02/24/takeoff-speeds/); HTTP 200; capture none (live); retrieved 2026-11-04.
  - **Quotation:** “by paulfchristiano” (Post heading/byline).
- **Address read:** [source](https://public-api.wordpress.com/rest/v1.1/sites/sideways-view.com/posts/slug:takeoff-speeds); HTTP 200; capture none (live); retrieved 2026-11-04. SHA-256 `42b70c5eea3e56d819daa1d3bb5c7d243cd9c8fcc7e863ca7dd13ac9a0995a7e`.
  - **Source states (paraphrase):** Post ID 9281, title Takeoff speeds, has author ID 22174451, login paulfchristiano, and author.URL http://paulfchristiano.com. (Root ID/title/URL and author object).
- **Address read:** [source](https://paulfchristiano.com/); HTTP 200; capture none (live); retrieved 2026-11-04.
  - **Quotation:** “Paul Christiano” (Site heading).
- **Comparison:** The publisher's post-to-author mapping links this specific blog account to a site headed Paul Christiano. Supports an attributed account-identification tie without relying on the forum account.
- **Note:** Current publisher metadata, not a contemporaneous 2018 identity capture or proof of lifetime account ownership.

## H04 — Butler 1865 attribution and bibliography

- **Status:** supports.
- **Record/source IDs:** `source-butler-1865-press`, `Lucubratio Ebria`.
- **Read first:** review/author-persons-admission-2026-10-27.md § Held.
- **Held point:** Find a cited authority for Samuel Butler's authorship of the unsigned 1865 text.
- **Address read:** [source](https://www.gutenberg.org/files/6173/6173-h/6173-h.htm); HTTP 200; capture none (live); retrieved 2026-11-04. SHA-256 `92661d82d3166bb305a6264bcd553543864cce2ecc3a1840815178c11bce977f`.
  - **Quotation:** “This second article was Lucubratio Ebria, and was sent by Butler from England to the editor of the Press in 1865” (Henry Festing Jones, The Note-Books of Samuel Butler (1912), III, prefatory note, paragraph introducing Butler’s covering letter).
  - **Source states (paraphrase):** Jones's Biographical Statement, 1865 entry, also attributes the article to Butler; the III prefatory note dates its original appearance to 29 July 1865 and introduces an extract from Butler's covering letter. (Henry Festing Jones, The Note-Books of Samuel Butler (1912), III, prefatory note, paragraph introducing Butler’s covering letter).
- **Comparison:** Supports attribution through an explicit edited bibliographical statement and an introduced author letter, beyond mere text matching.
- **Note:** Cite Jones's attribution and printed-letter context; this does not turn the original newspaper's unsigned article into a signed one.

## H05 — AI Magazine Winter 2006 date

- **Status:** not settled.
- **Record/source IDs:** `source-aimag-2006-dartmouth-proposal`, `10.1609/aimag.v27i4.1904`.
- **Read first:** review/followups-2026-10-28.md § Open for the maintainer 2; research/author-persons/codex-identity-2026-10-27.md § 2.
- **Held point:** Resolve 15 December 2006 (AAAI) against 1 December 2006 (Wiley).
- **Address read:** [source](https://ojs.aaai.org/aimagazine/index.php/aimagazine/article/view/1904); HTTP 200; capture none (live); retrieved 2026-11-04.
  - **Quotation:** “2006-12-15” (Published field).
  - **Source states (paraphrase):** The issue field identifies Vol. 27 No. 4: Winter 2006. (Published field).
- **Address read:** [source](https://onlinelibrary.wiley.com/doi/10.1609/aimag.v27i4.1904); HTTP 403; capture none (live); retrieved 2026-11-04.
  - **Retrieval limit:** Publisher returned a challenge; its 1 December field was not freshly read.
- **Address read:** [source](https://api.crossref.org/works/10.1609/aimag.v27i4.1904); HTTP 404; capture none (live); retrieved 2026-11-04.
  - **Retrieval limit:** No DOI record returned by this route.
- **Address read:** [source](https://web.archive.org/cdx/search/cdx?url=onlinelibrary.wiley.com/doi/10.1609/aimag.v27i4.1904&output=json&filter=statuscode:200&fl=timestamp,original&limit=-3); HTTP 200; capture none (live); retrieved 2026-11-04.
  - **Source states (paraphrase):** Exact publisher-URL query returned no HTTP-200 capture. (Empty CDX result).
- **Comparison:** Supports AAAI's recorded 15 December field, but does not adjudicate which date represents issue publication or why Wiley differs.
- **Note:** Retain both date expressions with their publishers; a season/year is safer for an undifferentiated issue date pending stronger evidence.

## H06 — Shanghai AI Laboratory founding

- **Status:** not settled.
- **Record/source IDs:** `c3-shlab-unveiled-2020`.
- **Read first:** review/china-labs-3-admission-2026-10-31.md § Held.
- **Held point:** Find a laboratory or registration text for founding; distinguish plaque unveiling from founding.
- **Address read:** [source](https://www.shlab.org.cn/aboutus); HTTP 200; capture none (live); retrieved 2026-11-04.
  - **Source states (paraphrase):** Institutional description gives no founding date. (About text).
- **Address read:** [source](https://www.shlab.org.cn/news/5443438); HTTP 200; capture none (live); retrieved 2026-11-04.
  - **Quotation:** “成立于 2020 年 7 月” (做真正有影响力的工作, opening paragraph).
  - **Source states (paraphrase):** Laboratory-hosted media reprint dated 13 July 2023 states founding in July 2020; it identifies the reproduced text as a 12 July 2023 机器之心 interview/report. (做真正有影响力的工作, opening paragraph).
- **Comparison:** Supports a reported founding month on the laboratory's site, but this is explicitly a media reprint. It does not establish an exact founding day or registration event.
- **Note:** Useful new route; primary founding/registration hold remains.

## H07 — Tencent ESG AI Technical Committee filing date

- **Status:** supports.
- **Record/source IDs:** `c3-tencent-esg2025-ai-committee`, `c3-src-tencent-esg-2025`.
- **Read first:** review/china-labs-3-admission-2026-10-31.md § Held; § Open leads.
- **Held point:** Date the expression by its HKEX filing.
- **Address read:** [source](https://www1.hkexnews.hk/search/titlesearch.xhtml?category=0&lang=EN&market=SEHK&stockId=1000041952); HTTP 200; capture none (live); retrieved 2026-11-04.
  - **Quotation:** “09/04/2026 17:26” (Release Time, ESG REPORT 2025 row, TENCENT N5006 (40241)).
  - **Source states (paraphrase):** Links directly to 2026040901285.pdf under Tencent's debt listing. (Release Time, ESG REPORT 2025 row, TENCENT N5006 (40241)).
- **Address read:** [source](https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0409/2026040901285.pdf); HTTP 200; capture none (live); retrieved 2026-11-04. SHA-256 `8fa8f9b9f750fb25f302dfd3213e5323b258d2d361dfa41ba3dfbc682dc517d7`.
  - **Quotation:** “The AI Technical Committee, one of the sub-committees established under the group-level Technical Committee” (Management Structure and Policies, printed p. 30 / PDF p. 31).
  - **Source states (paraphrase):** Tencent assigns cross-department coordination, security assessments and AI-project governance to the committee. (Management Structure and Policies, printed p. 30 / PDF p. 31).
- **Address read:** [source](https://static.www.tencent.com/uploads/2026/04/09/34cdfa7393ee49cd5677b28f38c68d74.pdf); HTTP 200; capture none (live); retrieved 2026-11-04. SHA-256 `8fa8f9b9f750fb25f302dfd3213e5323b258d2d361dfa41ba3dfbc682dc517d7`.
  - **Source states (paraphrase):** Byte-identical publisher copy. (Whole-file hash comparison).
- **Comparison:** Supports a 9 April 2026 publication/filing date for this exact expression and its attributed committee statement.
- **Note:** 17:26 is HKEX's displayed release time; disclosure date does not date committee formation or prove implementation.

## H08 — Tencent ESG safety red lines filing date

- **Status:** supports.
- **Record/source IDs:** `c3-tencent-esg2025-red-lines`, `c3-src-tencent-esg-2025`.
- **Read first:** review/china-labs-3-admission-2026-10-31.md § Held.
- **Held point:** Date the expression supporting Tencent's stated AI safety red lines.
- **Address read:** [source](https://www1.hkexnews.hk/search/titlesearch.xhtml?category=0&lang=EN&market=SEHK&stockId=1000041952); HTTP 200; capture none (live); retrieved 2026-11-04.
  - **Quotation:** “09/04/2026 17:26” (Release Time, ESG REPORT 2025 row).
- **Address read:** [source](https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0409/2026040901285.pdf); HTTP 200; capture none (live); retrieved 2026-11-04. SHA-256 `8fa8f9b9f750fb25f302dfd3213e5323b258d2d361dfa41ba3dfbc682dc517d7`.
  - **Quotation:** “By setting safety red lines and iteratively optimising protective measures, we can identify security hazards or emergencies rapidly and handle them effectively.” (Tencent Responsible AI Principles, principle 3, printed p. 30 / PDF p. 31).
- **Comparison:** Supports the attributed statement dated by the same 9 April 2026 filing, identical to the publisher PDF.
- **Note:** States an approach; does not enumerate operational thresholds or independently demonstrate effectiveness.

## H09 — Nadella effective chair date

- **Status:** supports.
- **Record/source IDs:** `Microsoft 2021 proxy, SEC accession 0001193125-21-298757`.
- **Read first:** review/people-admission-2026-10-31.md § Held; research/people/cross-family-check-2026-10-29.md item 10.
- **Held point:** Re-read the 2021 proxy's effective-date sentence.
- **Address read:** [source](https://web.archive.org/web/20260826083929id_/https://www.sec.gov/Archives/edgar/data/789019/000119312521298757/d189481ddef14a.htm); HTTP 200; capture 2026-08-26T08:39:29Z; retrieved 2026-11-04. SHA-256 `ec7e83e39cd72064d975afecc9d08d86544db7c19232a297cf6e1475613761e5`.
  - **Quotation:** “Effective June 16, the Board’s independent directors unanimously elected Satya Nadella to the role of Chairman and CEO” (Board Leadership, opening paragraph).
  - **Source states (paraphrase):** Preceding sentence says Thompson served as Chairman until June 16, 2021, establishing the year. (Board Leadership, opening paragraph).
- **Comparison:** Supports an effective start of 16 June 2021, separately from the announcement convention.
- **Note:** Archived 2021 proxy; no end date or current appointment inferred.

## H10 — NVIDIA H20 statements versus BIS letter/rule

- **Status:** not settled.
- **Record/source IDs:** `cpo-ch-nvidia-h20-licence-requirement`, `cpo-ch-nvidia-h20-no-china-sales-q2`.
- **Read first:** review/cpo-admission-2-2026-10-30.md § Held; § Open for the maintainer 4.
- **Held point:** Locate BIS letter/rule for April 2025 licensing and compare the August 2025 sales statement.
- **Address read:** [source](https://nvidianews.nvidia.com/news/nvidia-announces-financial-results-for-first-quarter-fiscal-2026); HTTP 200; capture none (live); retrieved 2026-11-04.
  - **Quotation:** “On April 9, 2025, NVIDIA was informed by the U.S. government that a license is required for exports of its H20 products into the China market.” (Opening results paragraphs, 28 May 2025).
- **Address read:** [source](https://nvidianews.nvidia.com/news/nvidia-announces-financial-results-for-second-quarter-fiscal-2026); HTTP 200; capture none (live); retrieved 2026-11-04.
  - **Quotation:** “There were no H20 sales to China-based customers in the second quarter.” (Opening results paragraphs, 27 August 2025).
  - **Source states (paraphrase):** Outlook assumes no H20 shipments to China in Q3; reported Q2 ended 27 July 2025. (Opening results paragraphs, 27 August 2025).
- **Address read:** [source](https://www.bis.gov/press-release/department-commerce-announces-rescission-biden-era-artificial-intelligence-diffusion-rule-strengthens); HTTP 200; capture none (live); retrieved 2026-11-04.
  - **Source states (paraphrase):** 13 May 2025 announcement discusses diffusion and chip controls, but supplies no H20-specific letter. (Whole announcement).
- **Address read:** [source](https://www.federalregister.gov/api/v1/documents.json?conditions%5Bterm%5D=%22H20%22&conditions%5Bagencies%5D%5B%5D=industry-and-security-bureau&per_page=20); HTTP 200; capture none (live); retrieved 2026-11-04.
  - **Source states (paraphrase):** Exact H20 search restricted to BIS returned count 0. (JSON count).
- **Comparison:** Company statements reproduce; no H20-specific BIS letter/rule located in this bounded search. A rule alone would not establish realised sales.
- **Note:** Keep attribution and hold; search failure does not establish that no letter or differently worded control exists.

## H11 — ADA Space Three-Body / Xingsuan group 01 launch

- **Status:** supports.
- **Record/source IDs:** `cpo-orb-three-body-launch-stated`, `orb-adaspace-home`.
- **Read first:** review/cpo-admission-2-2026-10-30.md § Held; research/compute-power-orbit/pack.md § Stated status.
- **Held point:** Re-read the operator's May 2025 launch statement after its homepage served a suspension notice.
- **Address read:** [source](http://www.adaspace.com/); HTTP 200; capture none (live); retrieved 2026-11-04. SHA-256 `d560d3b0e577dff028806553c972fac361294f016894f4b3fa9e90b050fdc4d4`.
  - **Quotation:** “2025年5月，国星宇航“星算”计划01组太空计算中心成功发射入轨。” (关于我们, second paragraph).
  - **Source states (paraphrase):** The operator states its Xingsuan programme group 01 space computing centre successfully launched into orbit in May 2025. (关于我们, second paragraph).
- **Comparison:** Supports the held operator statement at month precision; the page is no longer suspended. It does not itself name Three-Body, state 12 satellites, or give 14 May.
- **Note:** Recover only the operator's month-level statement; retain separate evidence for day, constellation identity and composition.

## H12 — Starcloud-1 Gemini versus Gemma

- **Status:** not settled.
- **Record/source IDs:** `cpo-orb-starcloud-1-training-stated`, `orb-starcloud-1`.
- **Read first:** review/cpo-admission-2-2026-10-30.md § Corrections item 115.
- **Held point:** Determine whether Starcloud-1 ran Gemini or Gemma.
- **Address read:** [source](https://www.starcloud.com/starcloud-1); HTTP 200; capture none (live); retrieved 2026-11-04. SHA-256 `3d477f6b0c4017e5cca7929873d961adc6e6e8ed7cfa59b8178adaa91c66b99d`.
  - **Quotation:** “to run a version of Gemini in space” (WHY IT WAS SPECIAL).
  - **Source states (paraphrase):** The same page embeds a congratulation attributed to Demis Hassabis that calls the models Gemma, while also describing nanoGPT training. (WHY IT WAS SPECIAL).
- **Comparison:** The internal discrepancy reproduces: page narrative says Gemini, embedded attributed quotation says Gemma. Neither wording can silently correct the other.
- **Note:** Retain both attributions; page does not settle model identity or prove the operational claim independently.

## H13 — O3 earlier orbital lead: Periola and Kolawole

- **Status:** supports.
- **Record/source IDs:** `oc3-terrestrial-constraints`, `10.1007/s11277-019-06242-z`.
- **Read first:** review/cpo-admission-1-2026-10-30.md § Held; § Open for the maintainer 1.
- **Held point:** Read the 2019 abstract for the terrestrial-constraints criterion.
- **Address read:** [source](https://link.springer.com/article/10.1007/s11277-019-06242-z); HTTP 200; capture none (live); retrieved 2026-11-04.
  - **Quotation:** “reliance on further hosting of terrestrial data centres becomes problematic in densely populated regions. This leads to exploring space as hosting centres” (Abstract, second and third sentences).
  - **Source states (paraphrase):** Space-Based Data Centres: A Paradigm for Data Processing and Scientific Investigations, A. A. Periola and M. O. Kolawole. Publisher gives publication/version of record 11 March 2019 and issue date 1 July 2019; abstract discusses land opportunity costs. (Abstract, second and third sentences).
- **Comparison:** Supports a candidate articulation predating Lumen 2024: terrestrial land/population constraints explicitly motivate space siting, meeting O3's land branch.
- **Note:** Abstract only; subscription full text unread. Date kinds remain distinct, and no global priority claim or role reassignment is made.

## H14 — O10 earlier orbital lead: ASPLOS 2020

- **Status:** not settled.
- **Record/source IDs:** `oc10-ground-bandwidth`, `10.1145/3373376.3378473`.
- **Read first:** review/cpo-admission-1-2026-10-30.md § Held; § Open for the maintainer 1; current data/entities.json O10 criterion and src/reading/orbital-compute.ts role note read for comparison.
- **Held point:** Read the earlier orbital-edge paper for workload limits imposed by ground links.
- **Address read:** [source](https://abstract.ece.cmu.edu/pubs/oec-asplos2020.pdf); HTTP 200; capture none (live); retrieved 2026-11-04. SHA-256 `8addf0bb49d896e7d7b95b5133cc5326fa3f9581097208f93a20680ab43ae92a`.
  - **Quotation:** “Limits on downlink bitrate prevent bent pipes from scaling to accommodate the extreme data volumes of large constellations” (Section 1, PDF p. 2, paragraph beginning Challenges faced by existing systems).
  - **Source states (paraphrase):** Bradley Denby and Brandon Lucia, Orbital Edge Computing: Nanosatellite Constellations as a New Class of Computer System. Abstract and introduction tie ground-station access, intermittent downlinks and latency to Earth-observation workloads, proposing onboard processing; p. 1 prints ASPLOS 2020, 16–20 March. (Section 1, PDF p. 2, paragraph beginning Challenges faced by existing systems).
- **Comparison:** The 2020 paper explicitly connects downlink limits to Earth-observation data volumes and motivates computing on the satellite. This supports an earlier related text, but does not clearly identify which workloads an orbital computing service cannot serve because of its ground links. Its direction is a reason to move sensor processing into orbit, so classification under O10 as a limit on orbital compute requires an editorial ruling.
- **Note:** Retrieval hold is closed. Current main has withdrawn O10’s former headline; do not assign this lead a replacement role from topical similarity alone.

## H15 — Michigan HB 4668 after 23 March 2026

- **Status:** not settled.
- **Record/source IDs:** `2025-HB-4668`, `fl-us-mi-hb4668-status-2026`.
- **Read first:** review/frameworks-to-law-admission-2-2026-10-28.md § Open for the maintainer 3.
- **Held point:** Establish later bill action without extrapolating a historical snapshot.
- **Address read:** [source](https://legislature.mi.gov/Bills/Bill?ObjectName=2025-HB-4668); transport failure; capture none (live); retrieved 2026-11-04.
  - **Retrieval limit:** Live host failed to connect; www host also failed.
- **Address read:** [source](https://web.archive.org/web/20260328163929id_/https://legislature.mi.gov/Bills/Bill?ObjectName=2025-HB-4668); HTTP 200; capture 2026-03-28T16:39:29Z; retrieved 2026-11-04. SHA-256 `d1973727f3941155cf8396fb400ed156f0b285b52875c5b01b45b55e6aca19f7`.
  - **Quotation:** “referred to Committee on Communications and Technology” (History, last row, 3/19/2026, HJ 25 Pg. 0).
  - **Source states (paraphrase):** The complete captured history lists no action after 19 March 2026. Its page-number placeholder is 0; do not import the later pack's 349 into this capture. (History, last row, 3/19/2026, HJ 25 Pg. 0).
- **Address read:** [source](https://web.archive.org/cdx/search/cdx?url=legislature.mi.gov/Bills/Bill?ObjectName=2025-HB-4668&output=json&filter=statuscode:200&filter=timestamp:2026&fl=timestamp,original&collapse=timestamp:6&limit=-8); HTTP 200; capture none (live); retrieved 2026-11-04.
  - **Source states (paraphrase):** The bounded index query returned January and 28 March 2026 captures. (Returned capture rows).
- **Comparison:** A post-23-March witness supports unchanged listed status as of 28 March; it cannot settle actions from then to 4 November 2026.
- **Note:** Keep snapshot date explicit; current status remains unverified.

## H16 — SB 1047 Senate vote, 21 May 2024

- **Status:** supports.
- **Record/source IDs:** `fl-us-ca-sb1047-passed-senate`.
- **Read first:** review/frameworks-to-law-pack-2026-10-28.md § Q8 (decision 8); research/frameworks-to-law/pack.md § US states, vote records.
- **Held point:** Compare the author's reported 32–1 with the Senate journal.
- **Address read:** [source](https://web.archive.org/web/20250321024200id_/https://leginfo.legislature.ca.gov/faces/pubSenDailyJrn2.xhtml?type=doc&sessionyear=20232024&pagenum=4035&sessionnum=0&fileid=1059); HTTP 200; capture 2025-03-21T02:42:00Z; retrieved 2026-11-04. SHA-256 `dd6a0473bf647ad654430810d9427cb5f21bb060213fda585a6ba06386301fa1`.
  - **Quotation:** “AYES (32)” (21 May 2024 Senate Journal, printed p. 4091 / PDF p. 57, SB 1047 roll call).
  - **Source states (paraphrase):** The same roll call lists NOES (1), Senator Grove, and orders transmission to the Assembly. (21 May 2024 Senate Journal, printed p. 4091 / PDF p. 57, SB 1047 roll call).
- **Comparison:** Supports the date and 32–1 tally from the journal itself.
- **Note:** The 17 May timestamp in the bill heading dates its text, not the 21 May vote; live document endpoint returned 403 before archive fallback.

## H17 — SB 1047 Assembly vote, 28 August 2024

- **Status:** contradicts.
- **Record/source IDs:** `fl-us-ca-sb1047-passed-assembly`.
- **Read first:** review/frameworks-to-law-pack-2026-10-28.md § Q8 (decision 8); research/frameworks-to-law/pack.md § US states, vote records.
- **Held point:** Compare the author's reported 49–15 with the Assembly journal.
- **Address read:** [source](https://clerk.assembly.ca.gov/sites/clerk.assembly.ca.gov/files/adj082824_r2_0.pdf); HTTP 200; capture none (live); retrieved 2026-11-04. SHA-256 `0ce05cc6439678d0855ec2e1782e1b0810224b13efc0aa69f9aafa2f202df394`.
  - **Quotation:** “AYES—48” (28 August 2024 Assembly Journal, printed p. 6719 / PDF p. 43, SB 1047).
  - **Source states (paraphrase):** NOES—16 follows the aye list; the bill is passed and ordered transmitted to the Senate. Printed p. 6814 / PDF p. 138 separately records additions including Bains as No. (28 August 2024 Assembly Journal, printed p. 6719 / PDF p. 43, SB 1047).
- **Comparison:** The revised official journal records 48–16, contradicting 49–15 if presented as the journal's final recorded tally. The vote date and passage agree.
- **Note:** Keep the author's contemporaneous press tally distinct from the revised journal; the cause/timing of every difference was not reconstructed.

## H18 — SB 1047 Senate concurrence, 29 August 2024

- **Status:** contradicts.
- **Record/source IDs:** `fl-us-ca-sb1047-senate-final-vote`.
- **Read first:** review/frameworks-to-law-pack-2026-10-28.md § Q8 (decision 8); research/frameworks-to-law/pack.md § US states, vote records.
- **Held point:** Compare the author's reported 29–9 with the Senate journal.
- **Address read:** [source](https://web.archive.org/web/20250325013821id_/https://leginfo.legislature.ca.gov/faces/pubSenDailyJrn2.xhtml?type=doc&sessionyear=20232024&pagenum=5623&sessionnum=0&fileid=1099); HTTP 200; capture 2025-03-25T01:38:21Z; retrieved 2026-11-04. SHA-256 `292672092386e9d9f9432d3a045a6a74b5e29b0ff5e959513b3d609456637c28`.
  - **Quotation:** “AYES (30)” (29 August 2024 Senate Journal, printed p. 5639 / PDF p. 17, SB 1047 concurrence).
  - **Source states (paraphrase):** Lists NOES (9), concurs in Assembly amendments and orders enrolment. Under Requests to be added to roll call, printed p. 5697 / PDF p. 75, Mike McGuire requests an aye on SB 1047 under Senate Rule 44. (29 August 2024 Senate Journal, printed p. 5639 / PDF p. 17, SB 1047 concurrence).
- **Comparison:** Journal records 30–9, rather than the press release's 29–9. The recorded-vote addition provides relevant context, without erasing what the earlier release reported.
- **Note:** Live document endpoint returned 403. Archive request redirected to the actual capture shown here; requested and served timestamps were not conflated.

## H19 — Hanson 1994 base-record publication day

- **Status:** not settled.
- **Record/source IDs:** `source-hanson-1994-uploads-web-reprint`, `ec-g01-hanson-1994-if-uploads-come-first-b`, `ec-g07-hanson-1994-if-uploads-come-first-a`.
- **Read first:** review/heterodox-admission-2026-11-01.md § Open for the maintainer 4; § Decisions applied, check 8.
- **Held point:** Determine whether the reprint heading establishes publication on 8 March 1994.
- **Address read:** [source](https://web.archive.org/web/19980220204707id_/http://hanson.berkeley.edu/uploads.html); HTTP 200; capture 1998-02-20T20:47:07Z; retrieved 2026-11-04. SHA-256 `c34890e352bba48a521c5237afeeb8d5b2063b3091e46bae35270326b9dbaf61`.
  - **Quotation:** “March 8, 1994” (Heading beneath Robin Hanson's name).
  - **Source states (paraphrase):** Following notice says the article originally appeared in Extropy 6:2 (1994), reprinted with permission; it does not identify the heading as the issue's publication date. (Heading beneath Robin Hanson's name).
- **Address read:** [source](https://web.archive.org/web/20250428112724id_/https://diyhpl.us/~bryan/irc/extropians/extropy-magazine/Extropy-13.pdf); HTTP 200; capture 2025-04-28T11:27:24Z; retrieved 2026-11-04. SHA-256 `7c542906cf18b9b2c859d83f6ab72217d7c84127c1bc34333ff7ab1ad06afa37`.
  - **Source states (paraphrase):** Visually read contents (PDF p. 1) and printed pp. 10–11 (PDF pp. 8–9): issue identifies third quarter 1994, not 8 March. (Contents sidebar and page footers).
- **Comparison:** The day is a genuine web-heading date, but its kind remains unstated. It does not establish print publication on that day; quarter-level issue dating is directly visible.
- **Note:** Two ec- records and the earlier source still carry the precise day on this base. A separate correction decision should retain heading, print and archive dates separately.

## H20 — Hanson in printed Extropy 13: W03

- **Status:** supports.
- **Record/source IDs:** `source-extropy-13-scan`, `ht-w03-hanson-1994-if-uploads-come-first`.
- **Read first:** review/heterodox-admission-2026-11-01.md § Open for the maintainer 3; § Fresh-context review, W03; current claim and its three evidence records read to identify later correction.
- **Held point:** Check visually whether the 1994 printed issue contains the upload wording used for W03.
- **Address read:** [source](https://web.archive.org/web/20250428112724id_/https://diyhpl.us/~bryan/irc/extropians/extropy-magazine/Extropy-13.pdf); HTTP 200; capture 2025-04-28T11:27:24Z; retrieved 2026-11-04. SHA-256 `7c542906cf18b9b2c859d83f6ab72217d7c84127c1bc34333ff7ab1ad06afa37`.
  - **Quotation:** “What if we someday learn how to model small brain units, and so can “upload” ourselves into new computer brains?” (Printed p. 10 / PDF p. 8, abstract box; visual transcription).
  - **Source states (paraphrase):** Printed p. 11 / PDF p. 9, Uploads section and pull quote, also state willingness to upload even if the old brain is destroyed. Footer dates issue to third quarter 1994; contents names Hanson and the article. (Printed p. 10 / PDF p. 8, abstract box; visual transcription).
- **Address read:** [source](https://diyhpl.us/~bryan/irc/extropians/extropy-magazine/Extropy-13.pdf); transport failure; capture none (live); retrieved 2026-11-04.
  - **Retrieval limit:** Live transfer ended prematurely (curl 18); complete archived PDF read instead.
- **Comparison:** Supports the printed wording and 1994 attestation. Current main already gives Hanson W03's earliest-located role and cites the 2 November re-check; the D17 hold is stale in that respect.
- **Note:** Visual read of PDF pp. 1, 2, 8 and 9; not a text-layer match. The inspected contents says third quarter, not September; no month inferred.

## H21 — NRC Amendment No. 307 text

- **Status:** blocked.
- **Record/source IDs:** `cpo-pw-crane-nrc-fuel-amendment`, `ML26135A004`, `source-nrc-fr-2026-08-04-biweekly-notice`.
- **Read first:** review/crane-nrc-fix-2026-11-01.md § Retrieval; § What changed.
- **Held point:** Read the amendment itself, beyond the NRC facility summary and Federal Register notice.
- **Address read:** [source](https://www.nrc.gov/docs/ML2613/ML26135A004.pdf); HTTP 403; capture none (live); retrieved 2026-11-04.
  - **Retrieval limit:** NRC Access Denied; amendment text not read.
- **Address read:** [source](https://pbadupws.nrc.gov/docs/ML2613/ML26135A004.pdf); HTTP 403; capture none (live); retrieved 2026-11-04.
  - **Retrieval limit:** Alternate NRC host also denied access.
- **Address read:** [source](https://web.archive.org/cdx/search/cdx?url=www.nrc.gov/docs/ML2613/ML26135A004.pdf&output=json&filter=statuscode:200&fl=timestamp,original&filter=mimetype:application/pdf); HTTP 200; capture none (live); retrieved 2026-11-04.
  - **Source states (paraphrase):** No qualifying capture; same result for bare nrc.gov and pbadupws.nrc.gov exact paths. (Empty index result).
- **Address read:** [source](https://www.govinfo.gov/content/pkg/FR-2026-08-04/pdf/2026-15750.pdf); HTTP 200; capture none (live); retrieved 2026-11-04. SHA-256 `b3e839df46a0dc769b66497fe2a2489a2bd2b460f8049c9969ed91fe28e078ff`.
  - **Quotation:** “allow receipt and possession of new reactor fuel and new sealed neutron sources” (License Amendment Issuances, Crane entry, 91 FR 49456 / PDF p. 5).
  - **Source states (paraphrase):** Lists Amendment 307, date 1 July 2026, accession ML26135A004. (License Amendment Issuances, Crane entry, 91 FR 49456 / PDF p. 5).
- **Comparison:** The official notice supports the already-corrected scope/date, but does not recover the amendment's operative text, signature or effective-date clause.
- **Note:** Specific document access remains blocked; do not label the notice as a reading of the amendment.

## H22 — Constellation 2027 restart target

- **Status:** supports.
- **Record/source IDs:** `source-cpo-pw-constellation-q2-2026`, `cpo-pw-crane-nrc-fuel-amendment (context only)`.
- **Read first:** review/crane-nrc-fix-2026-11-01.md § What changed, Constellation's 2027 target.
- **Held point:** Check the company's target as a possible separate attributed record, rather than a date of NRC approval.
- **Address read:** [source](https://www.constellationenergy.com/news/2026/08/constellation-reports-second-quarter-2026-results.html); HTTP 200; capture none (live); retrieved 2026-11-04. SHA-256 `709347cd4d34733718dc34f6d17da40a4e3bf7bba9291aea5a1e65b81b404b1b`.
  - **Quotation:** “a major milestone moving us closer to restarting operations in 2027” (Recent Developments and Second Quarter Highlights, Progress continues at Crane Clean Energy Center; dateline 6 August 2026).
- **Comparison:** Supports Constellation's stated 2027 restart target as of its 6 August release. It is not an NRC restart authorisation or proof of completed restart.
- **Note:** Creating a separate target record remains the maintainer's decision; nothing admitted here.

## H23 — Audit B3: Moravec Analog author file

- **Status:** supports.
- **Record/source IDs:** `source-moravec-1979-analog-html`.
- **Read first:** review/audit-fixes-2026-10-29.md § Held, and why, B3.
- **Held point:** Re-open the previously unreachable author file and check the dates its version note reports.
- **Address read:** [source](https://frc.ri.cmu.edu/~hpm/project.archive/general.articles/1978/analog.1978.html); HTTP 200; capture none (live); retrieved 2026-11-04. SHA-256 `ca5adbcff8de2e35c85e849fde1e33b750afcfa925b45d5579e19126171ddb1b`.
  - **Quotation:** “July 21, 1976” (Heading below author/university).
  - **Source states (paraphrase):** Heading then says this version 1978. Full author file is reachable; body contains the machine-successor and mind-transfer discussion. (Heading below author/university).
- **Comparison:** Supports the existing version note's distinction between the 1976 heading and 1978 expression. This file does not itself verify the separate February 1979 Analog print issue.
- **Note:** Retrieval hold closed for the author file; keep expression date and print publication date separate.

## H24 — Audit B3: Moravec genetic-takeover author file

- **Status:** supports.
- **Record/source IDs:** `source-moravec-1989-takeover-file`.
- **Read first:** review/audit-fixes-2026-10-29.md § Held, and why, B3.
- **Held point:** Re-open the LaTeX file and verify its printed header date.
- **Address read:** [source](https://frc.ri.cmu.edu/~hpm/project.archive/general.articles/1988/takeover.ltx); HTTP 200; capture none (live); retrieved 2026-11-04. SHA-256 `419a51ad93b8dc4f592b8d46a0ca1d73066cc8b62204ddbf8166ae3bfc4a19b9`.
  - **Quotation:** “July 1988” (Opening title/author block of the plain-text LaTeX expression).
  - **Source states (paraphrase):** File identifies Human Culture - A Genetic Takeover Underway, Hans Moravec. Closing note says adapted from forthcoming Mind Children, Fall 1988. (Opening title/author block of the plain-text LaTeX expression).
- **Comparison:** Supports the current version note's July 1988 expression date. It does not authenticate wording in the separate 1989 printed chapter.
- **Note:** Retrieval hold closed for the author file; no source text retained.

## H25 — Audit B5: CNCERT typing

- **Status:** not settled.
- **Record/source IDs:** `cncert`.
- **Read first:** review/audit-fixes-2026-10-29.md § Held, and why, B5; research/china-labs-2 admission context.
- **Held point:** Find inspectable institutional-status statements before changing the organisation/public-body type.
- **Address read:** [source](https://www.cert.org.cn/publish/main/34/index.html); HTTP 200; capture none (live); retrieved 2026-11-04. SHA-256 `bddac2d640f57a24c74d9b5b4cfe89dfc0266882e1dda61e0a7c404755487a64`.
  - **Quotation:** “为非政府非盈利的网络安全技术中心” (CNCERT简介, section 1, first paragraph).
  - **Source states (paraphrase):** Self-description calls CNCERT/CC a nongovernmental nonprofit cybersecurity technical centre, founded August 2001, leading China's incident-response system. (CNCERT简介, section 1, first paragraph).
- **Address read:** [source](https://www.cert.org.cn/publish/main/12/2012/20120330183627058453773/20120330183627058453773_.html); HTTP 200; capture none (live); retrieved 2026-11-04. SHA-256 `54375fee3096fa470e31807a27242af5587c7428d27965e903c54bdc665cfb03`.
  - **Quotation:** “是信息产业部直属全额拔款事业单位” (Recruitment notice dated 2007-12-06, opening paragraph).
  - **Source states (paraphrase):** Historical notice describes a fully state-funded public institution directly under the Ministry of Information Industry. The 2012 URL path is not the notice's printed date. (Recruitment notice dated 2007-12-06, opening paragraph).
- **Comparison:** Retrieval obstacle is closed. The sources state different aspects at different times; neither permits silently deriving a current legal status from the operational self-description or the 2007 administrative affiliation.
- **Note:** Preserve original Chinese and date each statement; dataset typing remains an explicit editorial/schema decision.

## H26 — Audit B6: Acemoglu–Restrepo working paper / journal

- **Status:** supports.
- **Record/source IDs:** `source-acemoglu-restrepo-2019-automation-and-new-tasks`, `source-acemoglu-restrepo-2019-automation-and-new-tasks-jep`.
- **Read first:** review/audit-fixes-2026-10-29.md § Changes B6; § Held, and why B6.
- **Held point:** Compare full expressions before deciding whether to merge records previously compared only through abstracts.
- **Address read:** [source](https://www.nber.org/system/files/working_papers/w25684/w25684.pdf); HTTP 200; capture none (live); retrieved 2026-11-04. SHA-256 `7757f77583c186dbbd0945e81e286fbb3ec35ed4e633ce65b2bb22f9f1bec490`.
  - **Quotation:** “Prepared for Journal of Economic Perspectives.” (NBER Working Paper 25684, March 2019, cover / PDF p. 1).
  - **Source states (paraphrase):** 67-page PDF; Online Appendix begins at PDF p. 33 with theory, empirical details, robustness checks and data sources. (NBER Working Paper 25684, March 2019, cover / PDF p. 1).
- **Address read:** [source](https://web.archive.org/web/20250803100302id_/https://pubs.aeaweb.org/doi/pdf/10.1257/jep.33.2.3); HTTP 200; capture 2025-08-03T10:03:02Z; retrieved 2026-11-04. SHA-256 `8ae9a219b4861e611e4f0e7363ad2eee935d9a1910b591cffe2f213ca3a7fb82`.
  - **Quotation:** “An online Appendix available with this paper at the journal website” (JEP 33(2), Spring 2019, printed p. 6 / PDF p. 4).
  - **Source states (paraphrase):** 28-page published article, printed pp. 3–30; appendix is external rather than bundled. The task framework, labour-displacement analysis and empirical discussion correspond to the working paper, with copy editing and different pagination. (JEP 33(2), Spring 2019, printed p. 6 / PDF p. 4).
- **Address read:** [source](https://pubs.aeaweb.org/doi/pdf/10.1257/jep.33.2.3); HTTP 403; capture none (live); retrieved 2026-11-04.
  - **Retrieval limit:** Live publisher PDF refused; complete archived publisher PDF retrieved; relevant passages compared.
- **Comparison:** Supports an explicitly documented working-paper/journal relationship while demonstrating distinct expressions and a material difference in bundled content. Access-only obstacle is closed; abstracts are no longer the sole comparison.
- **Note:** Keep version-specific locators and appendix boundaries. A work-entity merger is an editorial modelling decision, not implied by shared title or argument.

## H27 — Audit B6: Agrawal–Gans–Goldfarb working paper / journal

- **Status:** supports.
- **Record/source IDs:** `source-agrawal-gans-goldfarb-2019-ambiguous-labor-market-impact`, `source-agrawal-gans-goldfarb-2019-ambiguous-labor-market-impact-jep`.
- **Read first:** review/audit-fixes-2026-10-29.md § Changes B6; § Held, and why B6.
- **Held point:** Compare full working-paper and published expressions rather than treating similar abstracts as textual identity.
- **Address read:** [source](https://www.nber.org/system/files/working_papers/w25619/w25619.pdf); HTTP 200; capture none (live); retrieved 2026-11-04. SHA-256 `dbd015967a47f77a41ff8028f5cc8208c3bb0e8cb44d6b1cc9be04f7df9c2450`.
  - **Quotation:** “Working Paper 25619” (Cover / PDF p. 1, February 2019).
  - **Source states (paraphrase):** 27-page expression. Conclusion, printed p. 20 / PDF p. 22, cites Autor and Acemoglu 2011 and Acemoglu and Restrepo 2019 in its opening parenthesis. (Cover / PDF p. 1, February 2019).
- **Address read:** [source](https://web.archive.org/web/20240408111057id_/https://pubs.aeaweb.org/doi/pdf/10.1257/jep.33.2.31); HTTP 200; capture 2024-04-08T11:10:57Z; retrieved 2026-11-04. SHA-256 `28b11d38968464d4c67f3d0dd8da42b42850f5307d6cb17660e491d6249ab595`.
  - **Quotation:** “as discussed in Acemoglu and Restrepo in this issue” (Conclusion, printed p. 47 / PDF p. 17).
  - **Source states (paraphrase):** 20-page JEP 33(2), Spring 2019 expression, printed pp. 31–50. Conclusion adds the in-this-issue reference. The legal prediction, email, bail, radiology and complementary-task discussions correspond across the expressions; layout and wording differ. (Conclusion, printed p. 47 / PDF p. 17).
- **Address read:** [source](https://pubs.aeaweb.org/doi/pdf/10.1257/jep.33.2.31); HTTP 403; capture none (live); retrieved 2026-11-04.
  - **Retrieval limit:** Live publisher refused; complete archive PDF recovered; relevant passages compared.
- **Comparison:** Matching authors, title, structure and the compared body passages support a working-paper/journal version relationship; this is a bibliographic inference from those correspondences. The journal adds an in-this-issue reference in the conclusion, beyond the abstract difference. The expressions are not text-identical.
- **Note:** Access-only hold is closed. Preserve expression-specific dates, locators and wording; no automatic merger or transfer of checked passages.

## H28 — Audit C9: UK institute launch versus renaming

- **Status:** supports.
- **Record/source IDs:** `uk-ai-security-institute`, `source-bletchley-chair-safety-testing-2023`, `source-uk-aisi-rename-release-2025`.
- **Read first:** review/audit-fixes-2026-10-29.md § Held, and why C9; current entity's dated names.
- **Held point:** Recover the source basis for a separately admitted launch claim while retaining the later name transition.
- **Address read:** [source](https://www.gov.uk/government/publications/ai-safety-summit-2023-chairs-statement-safety-testing-2-november/safety-testing-chairs-statement-of-session-outcomes-2-november-2023); HTTP 200; capture none (live); retrieved 2026-11-04.
  - **Quotation:** “the United Kingdom (UK) has launched the AI Safety Institute” (Chair's statement published 2 November 2023, paragraph beginning As its contribution to this collaboration).
- **Address read:** [source](https://www.gov.uk/government/news/tackling-ai-security-risks-to-unleash-growth-and-deliver-plan-for-change); HTTP 200; capture none (live); retrieved 2026-11-04.
  - **Quotation:** “UK’s AI Safety Institute becomes ‘UK AI Security Institute’” (14 February 2025 release, standfirst).
  - **Source states (paraphrase):** Body describes recasting the institute and a new criminal-misuse team; it does not announce creation of a separate institute legal person. (14 February 2025 release, standfirst).
- **Comparison:** Supports an attributed 2023 launch and a distinct 2025 name/focus announcement. It does not support presenting the Security name as the original 2023 name or treating the 2025 announcement as a new legal body.
- **Note:** Adding a subject-level launch claim remains a separate data task; this report changes none.

## H29 — MiniMax M3 alternate-host capture

- **Status:** supports.
- **Record/source IDs:** `c2-minimax-m3-announcement`, `c2-src-minimax-m3-blog-zh`.
- **Read first:** review/china-labs-2-admission-2026-10-27.md § Admission's own fixes, Archive captures; research/china-labs-2/codex-check-2026-10-27.md K058.
- **Held point:** Compare the unlinked bare-host archive capture with the www-host source expression.
- **Address read:** [source](https://web.archive.org/web/20261023112412id_/https://minimax.cn/blog/minimax-m3); HTTP 200; capture 2026-10-23T11:24:12Z; retrieved 2026-11-04. SHA-256 `f656f477d818a24b208dc7b9bf8a0260515ffd27ce59ddadf60b4519709a4c7c`.
  - **Quotation:** “接下来 10 天内我们会更新模型的技术报告、以及开源对应的模型权重。” (Closing API section).
  - **Source states (paraphrase):** Article title and displayed 2026-06-01 date match the M3 launch post; opening announces M3 and access through Code, Token Plan and API. Closing promises a report and model weights in the next ten days. (Closing API section).
- **Address read:** [source](https://www.minimax.cn/blog/minimax-m3); HTTP 200; capture none (live); retrieved 2026-11-04. SHA-256 `cd7b1f830244dc95117daa8930b20a20da95c37c27e3373d35a64f2c484687db`.
  - **Source states (paraphrase):** Same title, displayed date, opening and prospective closing recovered; navigation differs from the capture. (Article heading, introduction and closing API section).
- **Address read:** [source](https://minimax.cn/blog/minimax-m3); HTTP 200; capture none (live); retrieved 2026-11-04. SHA-256 `cd7b1f830244dc95117daa8930b20a20da95c37c27e3373d35a64f2c484687db`.
  - **Source states (paraphrase):** Current bare-host response is byte-identical to the current www-host response. (Whole-file hash comparison).
- **Comparison:** Supports the capture as an alternate-host witness to the cited M3 article and its decisive statements. Captured and live HTML are not byte-identical, so do not claim whole-file equality across dates.
- **Note:** October capture does not authenticate a June-day snapshot, validate promotional capability claims, or demonstrate fulfilment of the ten-day promise.

## H30 — Ulam 1958 memoir of John von Neumann: singularity passage

- **Bibliography:** S. Ulam, “John von Neumann, 1903–1957”, Bulletin of the American Mathematical Society 64 (1958), no. 3, part 2, pp. 1–49.
- **Status:** supports.
- **Record/source IDs:** `10.1090/S0002-9904-1958-10189-5`, `S0002-9904-1958-10189-5`.
- **Read first:** Authorised follow-up item; review/decisions/prehistory.md § 3, A third proposition: the technological singularity, read before PDF retrieval.
- **Held point:** Retrieve the AMS-published memoir, compare the PDF SHA-256 with the preparer’s supplied 7819f7b4… prefix, and check the technological-progress/singularity passage on p. 5.
- **Address read:** [source](https://www.ams.org/journals/bull/1958-64-03/S0002-9904-1958-10189-5/); HTTP 403; capture none (live); retrieved 2026-11-04.
  - **Retrieval limit:** Live landing page returned an AMS connection-verification challenge.
- **Address read:** [source](https://web.archive.org/web/20250906083526id_/https://www.ams.org/journals/bull/1958-64-03/S0002-9904-1958-10189-5/); HTTP 200; capture 2025-09-06T08:35:26Z; retrieved 2026-11-04.
  - **Source states (paraphrase):** Archived publisher landing page credits S. Ulam, gives Bulletin of the American Mathematical Society 64 (1958), pp. 1–49, records issue 3 in citation metadata, and links the relative file S0002-9904-1958-10189-5.pdf. (Article heading, citation metadata and PDF link).
- **Address read:** [source](https://www.ams.org/journals/bull/1958-64-03/S0002-9904-1958-10189-5/S0002-9904-1958-10189-5.pdf); HTTP 403; capture none (live); retrieved 2026-11-04.
  - **Retrieval limit:** Live linked PDF also returned a connection-verification HTML page; its bytes are not treated as a PDF hash.
- **Address read:** [source](https://web.archive.org/web/20260302170508id_/https://www.ams.org/journals/bull/1958-64-03/S0002-9904-1958-10189-5/S0002-9904-1958-10189-5.pdf); HTTP 200; capture 2026-03-02T17:05:08Z; retrieved 2026-11-04. PDF SHA-256 `7819f7b4b1acdd2399beb09ff122ea9dce9c28b129567a8e2c81228c31954280`.
  - **Quotation (44 words):** “One conversation centered on the ever accelerating progress of technology and changes in the mode of human life, which gives the appearance of approaching some essential singularity in the history of the race beyond which human affairs, as we know them, could not continue.” (Printed p. 5 / PDF p. 5, final paragraph, final sentence).
  - **Source states (paraphrase):** 49-page AMS PDF. Page 1 credits S. Ulam and prints the title John von Neumann, 1903–1957; it records receipt by the editors on 8 February 1958. Page 5 presents the passage as Ulam’s report of a conversation, without giving its date. (Printed p. 5 / PDF p. 5, final paragraph, final sentence).
- **Hash comparison:** Matches the supplied `7819f7b4…` prefix. A full expected digest was not supplied.
- **Comparison:** Supports the requested passage in the AMS memoir. The PDF hash matches the supplied 7819f7b4 prefix; a full expected digest was not supplied, so equality to an unseen complete preparer digest is not asserted.
- **Note:** Text layer and rendered p. 5 agree; quotation is 44 words, with line breaks normalised. This is Ulam’s retrospective report, not a dated transcript or an explicit claim about AI/computing. No publication-day or priority finding is inferred.

## Checks and boundaries

Only these two reports and `research/laws-compared/sources/il-pa-104-0538.txt` are intended changes. Formatting and privacy are checked before each checkpoint push. No review pack is regenerated or overwritten. UI, application and editorial-generation suites do not exercise these research-only files.

- **formatting:** Task-owned Markdown and JSON checked with repository Prettier; the authorised unedited statute extraction is excluded from formatting.
- **privacy:** pnpm --config.verify-deps-before-run=false check:privacy on each checkpoint index before each push. This changes only the dependency preflight setting for the command; it runs the repository check:privacy script.
- **scope:** Exactly the two requested reports and Illinois extraction are task-owned tracked changes; protected directories compared with the fetched base.
- **source_integrity:** Illinois PDF hash and extraction checked against a fresh in-memory extraction of the downloaded PDF; original body preserved without edits. All item IDs, status-table correspondence, required fields, capture dates and quotation lengths checked. Ulam follow-up: PDF hash prefix, served capture timestamp, 44-word quotation and rendered p. 5 checked; no additional raw source text retained.
- **not_applicable:** No application, data, schema, UI or review-pack changes. No review-generation or browser run; these do not exercise the three research artifacts. No annotated pack touched.

## Open decisions

- No result authorises data admission or correction.
- Adjudicate SB 1047 journal tallies separately from contemporaneous press tallies.
- Keep AI Magazine day-date discrepancy, exact Shanghai founding, H20 regulator basis, Starcloud model identity, current Michigan status and current CNCERT legal typing qualified.
- NRC amendment text still requires a successful retrieval route.
- Choose record/version modelling for the economic-paper pairs and whether to add the Constellation target and UK launch records.
- D17’s Hanson W03 hold is stale on this base; the earlier ec- publication-day records remain separate follow-up.
- Decide whether ASPLOS 2020’s ground-link motivation for onboard sensing/processing meets O10’s workload-limitation criterion; it is not automatically a qualifying objection to orbital compute.
