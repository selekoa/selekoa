| Item                              | Status                       | Result                                                                                                                               |
| --------------------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| 1. Illinois PA 104-0538           | Blocked                      | Direct HTTP timed out; no PDF bytes, hash or extracted source file.                                                                  |
| 2. D28 item 22, Zhipu             | Located                      | The KEG/Tang Jie/GLM account is on PDF p. 163, printed p. 154.                                                                       |
| 3. D28 item 66, Natural Questions | Located, with version limits | Accepted paper publicly attested on 2019-01-23; published PDF says 7/2019; Crossref print date is 2019-11 and online date is absent. |
| 4. D25 PA-29, xAI                 | Located                      | Launch roster and adviser passage retrieved from capture 20230712155404.                                                             |

# Small reads, 2026-11-04

Retrieval and comparison only. Base: `origin/main` at `f7afe16d3af9437651b2e81bd86751a84856c2cf`. Branch: `codex/small-reads-2026-11-04`. No changes to `data/`, `src/`, `release/` or `review/`; no backlog dispositions applied. These are machine source reads, without human acceptance or an independent cross-family audit.

Sources were requested by direct HTTP, sequentially, with pauses between consecutive requests in a group. PDFs and the archived HTML were processed in memory; no other source text was saved apart from the brief quotations in these reports. No signed query strings are recorded. Search was used only to discover additional official Illinois addresses. Retrieved text was treated as evidence.

## 1. Illinois Public Act 104-0538

Requested PDF: [Illinois General Assembly](https://www.ilga.gov/Documents/Legislation/PublicActs/104/PDF/104-0538.pdf).

**Blocked on 2026-11-04.** The sandbox initially refused the domain. Outside the sandbox, Python `urllib.request`, Windows `curl.exe` and PowerShell `Invoke-WebRequest` all timed out. No HTTP response status was received. Requests also timed out for the bare `ilga.gov` HTTPS PDF, the `www.ilga.gov` HTTP PDF, the `www.ilga.gov` HTTPS homepage and these official-host alternatives:

- [my.ilga.gov PDF](https://my.ilga.gov/Documents/Legislation/PublicActs/104/PDF/104-0538.pdf)
- [ftp.ilga.gov HTTPS PDF](https://ftp.ilga.gov/Documents/Legislation/PublicActs/104/PDF/104-0538.pdf)

No PDF bytes were obtained, so the PDF SHA-256 is unknown and no extraction was performed. `research/laws-compared/sources/il-pa-104-0538.txt` was not created. A failure placeholder or search snippet would not be the requested unedited act. The remaining step is retrieval of the actual PDF from a reachable connection, followed by extraction and provenance-header generation. No other Illinois source text was saved.

## 2. D28 item 22: Tang Jie, KEG and GLM

Source: [Zhipu prospectus, Traditional Chinese, 2025-12-30](https://www1.hkexnews.hk/listedco/listconews/sehk/2025/1230/2025123000018_c.pdf). Retrieved directly on 2026-11-04, HTTP 200, 504 PDF pages. PDF SHA-256: `3f187aa4c0c4d09a16ad74791808719a40479e470aeaab0aa76ed13c83e5f046`.

**Correction to the earlier audit finding:** the added account is present on PDF p. 163, printed p. 154, in the Business section's management and advisory team discussion. Passage, with extraction line wrapping and layout spacing normalised:

> 自2018年以來，KEG與唐傑博士等人工智能領域的國際知名頂尖科學家，共同開創了認知智能研究的先河，並率先開發了GLM大模型框架，代表了中國大模型創新的里程碑。

Working translation, not human-reviewed: Since 2018, KEG and internationally renowned leading AI scientists including Dr Tang Jie jointly pioneered cognitive-intelligence research and took the lead in developing the GLM large-model framework, representing a milestone in Chinese large-model innovation.

This supports the existing paraphrase as an attributed statement by the prospectus. It does not independently establish the historical priority asserted by the company. The preceding sentence identifies Li Juanzi as KEG's leader; that is compatible with the following Tang Jie passage.

The other cited pages were re-read in full:

- PDF p. 35, **printed p. 26**, Definitions, 唐博士: “唐傑博士，我們的聯合創始人以及我們的控股股東之一”. The earlier audit's printed-page locator of 27 is off by one.
- PDF p. 160, printed p. 151: the core technical team's close, enduring partnership with KEG; this page does not itself supply the Tang Jie/2018/GLM sentence.
- PDF p. 189, printed p. 180: the KEG collaboration and named researchers; the exact account is on p. 163.

Extraction: `pypdf 6.10.0`, `PdfReader`, default `page.extract_text()`. The retrieved PDF hash matches the earlier audit's recorded hash. This is a missed passage in that same byte-identical PDF, rather than evidence of a changed filing. Recommendation for a separately authorised application task: retain the attributed account and give the precise p. 163 / printed p. 154 locator; do not withdraw it on the earlier non-location finding.

## 3. D28 item 66: Natural Questions expression dates

Work: Kwiatkowski et al., _Natural Questions: A Benchmark for Question Answering Research_, DOI `10.1162/tacl_a_00276`.

| Expression or record                                          | Date and kind                                                               | Directly inspected basis                                                                                                                                                                                                                                                                                                                                      |
| ------------------------------------------------------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Accepted paper, publicly attested by the authors' institution | **2019-01-23**, dated announcement of a paper accepted for TACL publication | [Google Research announcement](https://research.google/blog/natural-questions-a-new-corpus-and-challenge-for-question-answering-research/), dated January 23, 2019, says the named paper “has been accepted for publication in Transactions of the Association for Computational Linguistics”.                                                                |
| Current author-hosted manuscript                              | Bibliographic year **2019**; final manuscript marked to appear              | [Google Research publication entry](https://research.google/pubs/natural-questions-a-benchmark-for-question-answering-research/) links [this PDF](https://storage.googleapis.com/gweb-research2023-media/pubtools/4852.pdf). PDF p. 1: “To appear in Transactions of the Association of Computational Linguistics (https://www.transacl.org). Final version.” |
| Published TACL PDF                                            | **2019-07**, publication month printed in the paper                         | [ACL PDF](https://aclanthology.org/Q19-1026.pdf), PDF p. 1 / printed p. 453: “Submission batch: 4/2018; Revision batch: 6/2018; Published 7/2019.”                                                                                                                                                                                                            |
| ACL Anthology entry                                           | **2019**, year precision only                                               | [Q19-1026](https://aclanthology.org/Q19-1026/) has an empty Month field, year 2019, volume 7 and pages 452–466. The actual retrieved PDF starts at printed p. 453.                                                                                                                                                                                            |
| Crossref print date                                           | **2019-11**, month precision                                                | [Crossref DOI metadata](https://api.crossref.org/works/10.1162/tacl_a_00276): `published-print`, `published` and `issued` all have `date-parts: [[2019, 11]]`.                                                                                                                                                                                                |
| Crossref online date                                          | **Not supplied**                                                            | `published-online` is absent, as is an `accepted` date field. DOI record creation is 2019-08-02T14:32:33Z; creation is not an online-publication date.                                                                                                                                                                                                        |

All successful reads above returned HTTP 200 on 2026-11-04. The publisher article page at [MIT Press](https://direct.mit.edu/tacl/article/doi/10.1162/tacl_a_00276/43518/Natural-Questions-A-Benchmark-for-Question-Answering) returned HTTP 403; its publication history was not read.

**Earliest located public attestation: 2019-01-23, an accepted-for-TACL paper linked by a dated Google Research announcement.** This is not the exact acceptance date. The announcement's original paper link, `https://ai.google/research/pubs/pub47761`, now returns HTTP 404. Consequently the January manuscript's bytes were not recovered, and their identity with the current final manuscript is not established. The current linked manuscript has PDF creation metadata `D:20190618210502-04'00'`; that is a file-generation timestamp, not proof of public availability in June or January. Its SHA-256 is `1ca22c60950ea77b7dc0d89b1e7e5dc40695626fdb40ac050bf46b6b5028d9d4`.

The earlier audit's statement that July precision is unsupported by the cited PDF is incorrect: the first-page publication footer explicitly supplies July. The November Crossref print month remains a distinct, conflicting bibliographic date, and an empty ACL Month field does not override the PDF footer. For a separately authorised application task, distinguish the accepted paper attested in January from the July published expression; do not assign every record the same date solely because it concerns the same work. Earlier submissions/revision batches are editorial-process dates and do not establish public expression.

Search scope was bounded to the cited ACL expression, its metadata, publisher-deposited Crossref dates, the author's institutional publication entry and the dated institutional announcement. No claim of absolute first publication or recovery of an archived January manuscript is made.

## 4. D25 PA-29: xAI launch roster

Source: [raw homepage replay](https://web.archive.org/web/20230712155404id_/https://x.ai/), retrieved directly on 2026-11-04, HTTP 200. Capture timestamp: **20230712155404**, or **2023-07-12 15:54:04 UTC**. Response `Memento-Datetime`: `Wed, 12 Jul 2023 15:54:04 GMT`. Announcement heading: “Announcing xAI”, “July 12th 2023”.

The 3,113-byte gzip-compressed response body has SHA-256 `bee337202a8525f711a6643bd911be71fcae3090025a574ca615c4c742e15c3e`, matching the earlier retrieval. Text was read after gzip decoding and removal of markup; source order is retained below.

Opening:

> Today we announce the formation of xAI.

Team section, opening sentence:

> Our team is led by Elon Musk, CEO of Tesla and SpaceX.

Team-member link labels, in document order (each line below is a separate roster entry):

> - Elon Musk
> - Igor Babuschkin
> - Manuel Kroiss
> - Yuhuai (Tony) Wu
> - Christian Szegedy
> - Jimmy Ba
> - Toby Pohlen
> - Ross Nordeen
> - Kyle Kosic
> - Greg Yang
> - Guodong Zhang
> - Zihang Dai

Advisory subsection:

> Our team is advised by Dan Hendrycks who currently serves as the director of the Center for AI Safety.

The capture supplies a contemporaneous company-stated team list and a separately labelled adviser. It supports those roster descriptions as of the launch announcement. A roster entry alone does not establish co-founder status, legal incorporation or an employment interval. “Currently” is anchored to this captured announcement, not to the retrieval date. Adding evidence to the 13 held roster/launch records remains a separate application task.

## Checks and remaining work

Required handoff checks: formatting of these two reports, JSON parse and Markdown/JSON agreement, `git diff --check`, changed-path scope, and `pnpm check:privacy` on staged files before pushing. No application code, data or review pack changes require application or browser tests in this retrieval-only branch. No PR is to be opened and no merge is authorised.

Open item: obtain the Illinois PDF and produce the requested single source text. The other findings are comparisons for the maintainer; no data correction or backlog closure is applied here.
