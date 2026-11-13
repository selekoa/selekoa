# Source retrieval and comparison, 7 November 2026

| Item                                        | Status                               | Note                                                                                                                                                                                                          |
| ------------------------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1 Bank of England, One Bank Research Agenda | Read archived original               | Theme 4 documents use of machine learning to study central-bank policy communication and discusses AI, big data and sentiment research. The Google-query nowcasting example gives no machine-learning method. |
| 2 Periola and Kolawole (2019)               | Read publisher abstract              | DOI and Springer served the abstract. Crossref supplies matching bibliographic metadata. The typeset PDF and the received and accepted dates were unavailable.                                                |
| 3 GB 45438-2025                             | Read government PDF                  | Clause 1 was verified in the same Xiongan PDF. The main text and annexes contain 4,565 Han characters in the extractable text layer.                                                                          |
| 4a NRC Amendment No. 307                    | Amendment blocked; notice read       | The operative text and effective-date clause remain unread. The Federal Register notice confirms the issuance date, accession and fuel/source scope.                                                          |
| 4b NVIDIA H20                               | No BIS letter or rule located        | The bounded search found NVIDIA’s descriptions of the licence notification and sales outcome. The H20-specific BIS instrument remains unlocated.                                                              |
| 4c.1 Gwern, Good scan (archive row 554)     | Capture blocked; live scan read      | The live scan supplies the design-feedback passage. The capture’s PDF bytes could not be compared.                                                                                                            |
| 4c.2 Gwern, Michie scan (archive row 614)   | Capture rate-limited; live scan read | The live scan supplies Michie’s response to the conversational-program example. The capture’s PDF bytes could not be compared.                                                                                |
| 4c.3 Gwern, Vinge scan (archive row 701)    | Capture blocked; live scan read      | The live scan supplies Vinge’s singularity passage. The capture’s PDF bytes could not be compared.                                                                                                            |

## Method

- Direct HTTP GETs were made sequentially with at least 1.3 seconds between requests. HTTP status is the final response after redirects. SHA-256 covers the saved, content-decoded response body, including any HTML error or challenge page. The response notes identify the bytes that carry source text. Transient redirect parameters and signed queries are omitted.
- Capture timestamps are UTC and come from the replay address. A failed replay records the requested timestamp and hashes its response body. Live scans are separate witnesses.
- The Gwern addresses are absent from research/held-records-2026-11-04/codex-report.md and its JSON companion. This report uses the three blocked Gwern rows in research/archive-batch-2026-11-04/codex-report.md, also listed in research/archive-verification-2026-10-28/codex-report.md.

## 1 Bank of England, One Bank Research Agenda

| Address                                                                                                                                                         | HTTP | Response SHA-256                                                   | Read result                                                                       |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- | ------------------------------------------------------------------ | --------------------------------------------------------------------------------- |
| [boe](https://web.archive.org/web/20150319140614id_/http://www.bankofengland.co.uk:80/research/Documents/onebank/discussion.pdf) (capture 2015-03-19T14:06:14Z) | 200  | `a1963d083b2d45b092c2bd129d96c8130b85f8abe892cd35bf48de5cfb2e15e2` | Original 50-page discussion paper. SHA-256 matches the prior J05 read.            |
| [boe-live](https://www.bankofengland.co.uk/research/Documents/onebank/discussion.pdf)                                                                           | 404  | `751cd50092d343dff3dab303f82fa1231af8ca635f232f2e46d48f62c13157ac` | The legacy live document address returned a Bank of England 404 page.             |
| [boe-launch](https://www.bankofengland.co.uk/news/2015/february/one-bank-research-agenda-launched-today)                                                        | 200  | `51a9455f5ec9d4b53419150169cc8ea179ea7d5b18e743646dd0751bd074aa2b` | Official launch announcement, dated 25 February 2015. Identifies the five themes. |

- “How can the potential of big data and other new data sets best be realised?” (boe, Theme 4, question 1 heading, printed p. 23 / PDF p. 24)
- “artificial intelligence techniques and big data offer ways to find interesting new empirical relationships” (boe, Theme 4, question 1, paragraph spanning printed pp. 23–24, excerpt on printed p. 24 / PDF p. 25)
- “And textual information has been quantified systematically using machine-learning algorithms to assess a wide variety of questions about the communication of central bank policy decisions and the propagation of ideas and policy messages” (boe, Theme 4, question 1, same paragraph, printed p. 24 / PDF p. 25)
- “Such analysis could help inform how consumer and financial sentiment evolves.” (boe, Theme 4, question 1, same paragraph, printed p. 24 / PDF p. 25)

Theme 4 documents use of machine learning to study central-bank policy communication and discusses AI, big data and sentiment research. The Google-query nowcasting example gives no machine-learning method.

## 2 Periola and Kolawole (2019)

A. A. Periola and M. O. Kolawole. “Space-Based Data Centres: A Paradigm for Data Processing and Scientific Investigations.” _Wireless Personal Communications_ 107(1), pp. 95–119. DOI `10.1007/s11277-019-06242-z`.

Springer gives 11 March 2019 for online publication and the version of record, and 1 July 2019 for the issue date. Crossref gives 11 March 2019 online and July 2019 in print. Received and accepted dates are unverified.

Springer article header, About this article, and citation metadata; Crossref message fields.

| Address                                                                                                                                                                      | HTTP | Response SHA-256                                                   | Read result                                                                                                                                                              |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [doi request](https://doi.org/10.1007/s11277-019-06242-z) → [final address](https://link.springer.com/article/10.1007/s11277-019-06242-z)                                    | 200  | `6d12ac873aeb0bf983df443b3384760de84e58e5e362f25400497f39302efbb8` | Resolved to Springer’s HTML article. Its visible abstract matches the direct Springer response.                                                                          |
| [springer](https://link.springer.com/article/10.1007/s11277-019-06242-z)                                                                                                     | 200  | `f62b7c1b3faed6a542759dc2d297c9a11fdb07d9ad4ea0de164f3acb12f97f38` | Publisher’s HTML contains the abstract and publication dates. The received and accepted fields are absent.                                                               |
| [crossref](https://api.crossref.org/works/10.1007/s11277-019-06242-z)                                                                                                        | 200  | `710c87e1f7a67226028818c2530ce6fe78e7e05ad16d1e96f2504f6155f0e6d9` | Crossref confirms the citation and date precision. Its record has no abstract, received date or accepted date.                                                           |
| [springer-pdf request](https://link.springer.com/content/pdf/10.1007/s11277-019-06242-z.pdf) → [final address](https://link.springer.com/article/10.1007/s11277-019-06242-z) | 200  | `eed607eec1bde88a5da478d907fb345fe8be9afc06f9008f3d4e8d693095f2f1` | The advertised PDF address redirected to the same article in HTML.                                                                                                       |
| [springer-print-witness](https://www.researchgate.net/publication/331666663_Space-Based_Data_Centres_A_Paradigm_for_Data_Processing_and_Scientific_Investigations)           | 403  | `253f95880b9cc0af74118a43324006230e4fad478bb6eb1ea69d5697062c2e5b` | Direct retrieval returned a challenge. A separate indexed view of the typeset first page shows the online date and abstract, with no received or accepted dates visible. |

- “reliance on further hosting of terrestrial data centres becomes problematic in densely populated regions. This leads to exploring space as hosting centres” (springer, Abstract, second and third sentences; article starts on p. 95)

**Abstract, paraphrase.** The authors motivate space hosting with storage and access demand and constraints on expanding terrestrial capacity in densely populated regions. They propose satellite integration and cognitive computing, describe applications, and compare siting costs. The abstract reports a model for the opportunity cost of land and application latency. Its simulations report average land-cost reductions ranging from 3.3% to 66.3%, and 45.7% lower latency on average. The closing sentence speculates about applications to the search for extraterrestrial intelligence.

One verbatim excerpt plus a summary for the copyrighted abstract. The typeset first-page transcription in the indexed ResearchGate view agrees on the quoted wording after line-break and ligature normalization. Its issue label is 107(3), whereas Springer and Crossref both give 107(1).

DOI and Springer served the abstract. Crossref supplies matching bibliographic metadata. The typeset PDF and the received and accepted dates were unavailable.

## 3 GB 45438-2025

**Count.** 4,565 Han characters in the main text and annexes, 4,937 across the complete text layer, and 61 in the two scope sentences.

Extract each PDF page with PyMuPDF get_text() and count characters whose Unicode name contains CJK UNIFIED IDEOGRAPH. Main text includes clauses 1–6 and Annexes A–F, printed pp. 1–15 / PDF pp. 5–19. The whole-file count includes the cover, contents, foreword and introduction. Punctuation, Latin letters, digits and whitespace contribute zero. Labels embedded only in figure images are outside the extractable text layer.

| Address                                                                                                                                                    | HTTP | Response SHA-256                                                   | Read result                                                                                                                                       |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| [gb](https://www.xiongan.gov.cn/20250617/99e8309670814bdba91b3bcbfaca4e6c/2025061799e8309670814bdba91b3bcbfaca4e6c_38598ff9004470443c9195f1655adb29a0.pdf) | 200  | `bb704324cbfeb19e98df040cf08a0912475ed5cb4a80782108b74e634e51c8c3` | This 19-page file has the same SHA-256 as the government copy read on 4 November. Clause 1 specifies both the subject and the covered activities. |

- “本文件规定了人工智能生成合成内容标识方法。” (gb, Clause 1 范围, printed p. 1 / PDF p. 5)
- “本文件适用于生成合成服务提供者和内容传播服务提供者开展人工智能生成合成内容标识活动。” (gb, Clause 1 范围, printed p. 1 / PDF p. 5)

Clause 1 was verified in the same Xiongan PDF. The main text and annexes contain 4,565 Han characters in the extractable text layer.

## 4a NRC Amendment No. 307

| Address                                                                                                                                                                               | HTTP | Response SHA-256                                                   | Read result                                                                                                                        |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- | ------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| [nrc](https://www.nrc.gov/docs/ML2613/ML26135A004.pdf)                                                                                                                                | 403  | `57440bd0ebe6fdb4db1633609ba12dd5fd22dc728056350b8173e697e538f131` | The NRC PDF route returned an access-denied page.                                                                                  |
| [nrc-pbad](https://pbadupws.nrc.gov/docs/ML2613/ML26135A004.pdf)                                                                                                                      | 403  | `91c5345dc1ef402510ab2ff31e853e367257dd59e5e65773b05595f8eb01d2ce` | The alternate NRC PDF host returned an access-denied page.                                                                         |
| [nrc-adams request](https://adamswebsearch2.nrc.gov/webSearch2/main.jsp?AccessionNumber=ML26135A004) → [final address](https://www.nrc.gov/docs/ML2613/ML26135A004.pdf)               | 403  | `c5704052e04a2b3ed064b8fbd3dfc6cf738fbb8a0cb9d32f500ba293ad61b01b` | Legacy ADAMS redirected to the denied NRC PDF route.                                                                               |
| [nrc-api](https://adams-api.nrc.gov/announcements/v2/documents/ML26135A004)                                                                                                           | 404  | `3494d22a0b9ae1678a72df5841b7a6ec60e75499b91341f9763a556d6b8cb1f9` | The announcements route returned a resource-not-found response.                                                                    |
| [nrc-aps](https://adams-api.nrc.gov/aps/api/search/ML26135A004)                                                                                                                       | 401  | `c90468927fb778dd15b9da44a4dfec94fa8544d9746a59183f1bd413f87ac52a` | The documented ADAMS Public Search API requires a subscription key and returned 401.                                               |
| [nrc-cdx](https://web.archive.org/cdx/search/cdx?url=www.nrc.gov/docs/ML2613/ML26135A004.pdf&output=json&filter=statuscode:200&fl=timestamp,original&filter=mimetype:application/pdf) | 200  | `37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570` | The CDX query for HTTP 200 PDF captures of the www.nrc.gov address returned an empty array.                                        |
| [nrc-facility](https://www.nrc.gov/facilities-safety/facility-finder/reactors/ccec)                                                                                                   | 403  | `e8487578d9ab0020c7a9b3721e00be6101043247413377e41792ae4436bc6024` | Direct retrieval of the facility overview was denied.                                                                              |
| [nrc-notice](https://www.govinfo.gov/content/pkg/FR-2026-08-04/pdf/2026-15750.pdf)                                                                                                    | 200  | `b3e839df46a0dc769b66497fe2a2489a2bd2b460f8049c9969ed91fe28e078ff` | Official issuance notice, dated 4 August 2026. Its Crane entry identifies Amendment 307, dated 1 July 2026, accession ML26135A004. |

- “allow receipt and possession of new reactor fuel and new sealed neutron sources” (nrc-notice, License Amendment Issuances, Crane entry, 91 FR 49456 / PDF p. 5, Brief Description of Amendment)

The operative text and effective-date clause remain unread. The Federal Register notice confirms the issuance date, accession and fuel/source scope.

## 4b NVIDIA H20

| Address                                                                                                                                                                | HTTP | Response SHA-256                                                   | Read result                                                                                                                                     |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- | ------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| [fr-h20](https://www.federalregister.gov/api/v1/documents.json?conditions%5Bterm%5D=%22H20%22&conditions%5Bagencies%5D%5B%5D=industry-and-security-bureau&per_page=20) | 200  | `f433aebe030b451000b34b8eb59093ab1ade3fef2c9efd4b4e994248bc5863ad` | Federal Register exact-term query scoped to BIS returned count 0. Its coverage is limited to the queried index.                                 |
| [bis-2025](https://www.bis.gov/press-release/department-commerce-announces-rescission-biden-era-artificial-intelligence-diffusion-rule-strengthens)                    | 200  | `3be15143f8d609e016df1bd0e2bf2bb135f055b5e3b7b0a989e76992c1946125` | The 13 May 2025 BIS announcement discusses chip controls without naming H20 in the announcement text.                                           |
| [nvidia-edgar](https://www.sec.gov/Archives/edgar/data/1045810/000104581025000082/nvda-20250409.htm)                                                                   | 403  | `1960f0351be579f2620d2b09e35e340b7f5b23d69d41d37a350076db6f586fd6` | SEC denied the direct request. An indexed view of the 15 April 2025 Form 8-K shows Item 8.01, NVIDIA’s account of 9 and 14 April notifications. |
| [nvidia-q1](https://nvidianews.nvidia.com/news/nvidia-announces-financial-results-for-first-quarter-fiscal-2026)                                                       | 200  | `7193133774c202962e8b19f44ffd2a65de6e399cffb2dea10534a77d72270a52` | Company results describe the notification and resulting charges.                                                                                |
| [nvidia-q2](https://nvidianews.nvidia.com/news/nvidia-announces-financial-results-for-second-quarter-fiscal-2026)                                                      | 200  | `5145256000e92fa1c73f1236a69d5f6914389903d6d1e2868291516e127c01fa` | Company results give the reported sales outcome for the fiscal quarter ended 27 July 2025.                                                      |

- “On April 9, 2025, NVIDIA was informed by the U.S. government that a license is required for exports of its H20 products into the China market.” (nvidia-q1, 28 May 2025 results release, opening results paragraphs)
- “There were no H20 sales to China-based customers in the second quarter.” (nvidia-q2, 27 August 2025 results release, opening results paragraphs)

The bounded search found NVIDIA’s descriptions of the licence notification and sales outcome. The H20-specific BIS instrument remains unlocated.

## 4c.1 Gwern, Good scan (archive row 554)

| Address                                                                                                                                       | HTTP | Response SHA-256                                                   | Read result                                  |
| --------------------------------------------------------------------------------------------------------------------------------------------- | ---- | ------------------------------------------------------------------ | -------------------------------------------- |
| [good-archive](https://web.archive.org/web/20261030051429id_/https://gwern.net/doc/ai/1966-good.pdf) (requested capture 2026-10-30T05:14:29Z) | 403  | `2cdb9af8c24384513fa680a856b79ddad504ab8f45072db19ea540aee07a9ce8` | Raw replay returned HTML with HTTP 403.      |
| [good-replay](https://web.archive.org/web/20261030051429/https://gwern.net/doc/ai/1966-good.pdf) (requested capture 2026-10-30T05:14:29Z)     | 403  | `bb6060b36fca8aa3b146def7bd6261bbfe5bc29d58fa2ab75bb39f0935405c3b` | Standard replay returned HTML with HTTP 403. |
| [good-live](https://gwern.net/doc/ai/1966-good.pdf)                                                                                           | 200  | `7c0e6fb6bdc73147e77c67d5aabf71a5da3838b6824cecf0aad3b6ad82f6c272` | Live 58-page scan read at the cited passage. |

- “an ultraintelligent machine could design even better machines” (good-live, Section 2, printed p. 33 / PDF p. 3, first paragraph)

The live scan supplies the design-feedback passage. The capture’s PDF bytes could not be compared.

## 4c.2 Gwern, Michie scan (archive row 614)

| Address                                                                                                                                                                 | HTTP | Response SHA-256                                                   | Read result                                   |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- | ------------------------------------------------------------------ | --------------------------------------------- |
| [michie-archive](https://web.archive.org/web/20261030051457id_/https://gwern.net/doc/ai/1986-michie-onmachineintelligence.pdf) (requested capture 2026-10-30T05:14:57Z) | 429  | `e859c18f0c0cc71ffed35c4e7ebc87cbb4f136116156f2de1588aeb71449533e` | Raw replay returned HTTP 429.                 |
| [michie-replay](https://web.archive.org/web/20261030051457/https://gwern.net/doc/ai/1986-michie-onmachineintelligence.pdf) (requested capture 2026-10-30T05:14:57Z)     | 429  | `e859c18f0c0cc71ffed35c4e7ebc87cbb4f136116156f2de1588aeb71449533e` | Standard replay returned HTTP 429.            |
| [michie-live](https://gwern.net/doc/ai/1986-michie-onmachineintelligence.pdf)                                                                                           | 200  | `e48b1ffdaf417b1358941347b6fe61ad75bd17c6ad973ee3284f4533f9bd623f` | Live 276-page scan read at the cited passage. |

- “So Turing’s test has to be refined if it is going to be useful in the way intended.” (michie-live, Chapter 20, printed p. 242 / PDF p. 247, second paragraph)

The live scan supplies Michie’s response to the conversational-program example. The capture’s PDF bytes could not be compared.

## 4c.3 Gwern, Vinge scan (archive row 701)

| Address                                                                                                                                                    | HTTP | Response SHA-256                                                   | Read result                                        |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- | ------------------------------------------------------------------ | -------------------------------------------------- |
| [vinge-archive](https://web.archive.org/web/20261030051526id_/https://gwern.net/doc/transhumanism/1983-vinge.pdf) (requested capture 2026-10-30T05:15:26Z) | 403  | `f21d579d815ba1db4d964d841794307b19244c99e9fa5f26b56d6e593d7b4034` | Raw replay returned HTML with HTTP 403.            |
| [vinge-replay](https://web.archive.org/web/20261030051526/https://gwern.net/doc/transhumanism/1983-vinge.pdf) (requested capture 2026-10-30T05:15:26Z)     | 429  | `e859c18f0c0cc71ffed35c4e7ebc87cbb4f136116156f2de1588aeb71449533e` | Standard replay returned HTTP 429.                 |
| [vinge-live](https://gwern.net/doc/transhumanism/1983-vinge.pdf)                                                                                           | 200  | `6d2f9a0afec5bf4ca347e78c4326c88799d0e69e274197f669a121aca5c7d8a4` | Live one-page Omni scan read at the cited passage. |

- “When this happens, human history will have reached a kind of singularity” (vinge-live, First Word, Omni printed p. 10 / PDF p. 1, middle column)

The live scan supplies Vinge’s singularity passage. The capture’s PDF bytes could not be compared.
