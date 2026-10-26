# Internet Archive quotation recheck, 2026-10-15

Status: complete. Base: `02c5698`. Machine verification; no human review.

## Summary

| Source                                                                                  | Matched | Mismatched | Unreachable | Reported capture (UTC)                                                                                                                             |
| --------------------------------------------------------------------------------------- | ------: | ---------: | ----------: | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Is a Singularity Just Around the Corner? What it takes to get explosive economic growth |       3 |          0 |           0 | [19990128001813](https://web.archive.org/web/19990128001813id_/http://hanson.berkeley.edu/fastgrow.html)                                           |
| Some Skepticism (comment in "A Critical Discussion of Vinge's Singularity Concept")     |       5 |          0 |           0 | [20001117154900](https://web.archive.org/web/20001117154900id_/http://hanson.gmu.edu/vc.html)                                                      |
| Economic Growth Given Machine Intelligence                                              |       4 |          0 |           0 | [20000819034042](https://web.archive.org/web/20000819034042id_/http://hanson.gmu.edu/aigrow.pdf)                                                   |
| Economic Growth under Transformative AI (October 2023 version)                          |       8 |          0 |           0 | [20231129164044](https://web.archive.org/web/20231129164044id_/https://www.nber.org/system/files/working_papers/w31815/w31815.pdf)                 |
| Modeling the Human Trajectory                                                           |       1 |          0 |           0 | [20200623172927](https://web.archive.org/web/20200623172927id_/https://www.openphilanthropy.org/blog/modeling-human-trajectory)                    |
| Comment on "Modeling the Human Trajectory" ("Some personal reactions on this piece")    |       0 |          2 |           0 | [20200623172927](https://web.archive.org/web/20200623172927id_/https://www.openphilanthropy.org/blog/modeling-human-trajectory)                    |
| Could Advanced AI Drive Explosive Economic Growth?                                      |       7 |          1 |           0 | [20210702003241](https://web.archive.org/web/20210702003241id_/https://www.openphilanthropy.org/could-advanced-ai-drive-explosive-economic-growth) |
| Meta Frontier AI Framework — Version 1.1                                                |       8 |          0 |           0 | [20250213105620](https://web.archive.org/web/20250213105620id_/https://ai.meta.com/static-resource/meta-frontier-ai-framework/)                    |
| **Total quotation records**                                                             |  **36** |      **3** |       **0** |                                                                                                                                                    |

Typography-only mismatches: 3. NFKC does not turn curly punctuation into ASCII. These records match if curly quotation marks/apostrophes are additionally folded; no lexical difference was found. This additional folding is not included in the strict totals.

## Method and limits

- Scope: 20 esoteric passages, 11 admitted growth evidence passages, and eight quotations in four Meta v1.1 comparison cells. Repeated quotation G03-d/G09-c is counted as two records.

- Direct sequential curl HTTP retrieval, eight seconds between requests, no automatic redirects. Requested exact captures; all served timestamps come from the Archive Memento-Datetime response header, never inferred from requested URLs.

- HTML text: Python HTMLParser(convert_charrefs=True), script/style removed. PDF text: pypdf 6.10.0 for Hanson and Trammell–Korinek; pdfplumber 0.11.9 for Meta because pypdf splits letters inside words. Meta quotations are checked on their cited PDF pages. The Meta Table 1 risk-threshold column is extracted separately with crop (90, 90, 245, 700) on PDF page 13 to prevent column interleaving, and checked against a rendered page. Comparison is case-sensitive NFKC plus collapsed whitespace. PDF hyphenation across line breaks is joined where necessary; original punctuation and genuine hyphens are retained. No spelling, case, quotation-mark or apostrophe folding in the reported counts.

- An editorial ellipsis separates fragments that must occur in order on the same source page. The excerpt includes omitted source words. A terminal editorial ellipsis does not require a literal ellipsis in the source. This is a fragment match, not a claim that the edited quotation including ellipses is one continuous substring.

- Hanson E02-01 and E05-03 required restoration of missing text-layer spaces, confirmed by machine inspection of rendered PDF pages 1 and 12. Trammell–Korinek E05-19 and E05-21 line-break hyphenation was confirmed against rendered PDF pages 56 and 4.

- Machine quotation verification only; no human review, admission, classification change or evidence-check-date update. Records and packs are unchanged. Download bodies and rendered pages remain ignored; this report is the explicitly requested review artifact.

## Capture provenance

### hanson-1998-singularity

- Requested: https://web.archive.org/web/19990128001813id_/http://hanson.berkeley.edu/fastgrow.html
- Served capture: https://web.archive.org/web/19990128001813id_/http://hanson.berkeley.edu/fastgrow.html
- Archive-reported timestamp: `19990128001813`; `Memento-Datetime: Thu, 28 Jan 1999 00:18:13 GMT`.
- Retrieved: 2026-10-15T18:58:42.757Z; HTTP 200.
- SHA-256: `ed1990bc86053ac024cc6d7d78d6592379bd42275bc3ce3372344ed27afee004`. Byte-identical to the pack retrieval hash.

### hanson-1998-vinge

- Requested: https://web.archive.org/web/20001117154900id_/http://hanson.gmu.edu/vc.html
- Served capture: https://web.archive.org/web/20001117154900id_/http://hanson.gmu.edu/vc.html
- Archive-reported timestamp: `20001117154900`; `Memento-Datetime: Fri, 17 Nov 2000 15:49:00 GMT`.
- Retrieved: 2026-10-15T18:58:52.587Z; HTTP 200.
- SHA-256: `e54a679e31374bf4cb71e49287f363be63976a4bb3f7d180e98f89bccd64cf2c`. Byte-identical to the pack retrieval hash.

### hanson-aigrow

- Requested: https://web.archive.org/web/20000819034042id_/http://hanson.gmu.edu/aigrow.pdf
- Served capture: https://web.archive.org/web/20000819034042id_/http://hanson.gmu.edu/aigrow.pdf
- Archive-reported timestamp: `20000819034042`; `Memento-Datetime: Sat, 19 Aug 2000 03:40:42 GMT`.
- Retrieved: 2026-10-15T18:59:06.515Z; HTTP 200.
- SHA-256: `754380e21b0e9f5a62fe71ea238a86e8640df48a0551c55cf4877a2a732b99c1`. Byte-identical to the pack retrieval hash.

### nber-w31815-2023

- Requested: https://web.archive.org/web/20231129164044id_/https://www.nber.org/system/files/working_papers/w31815/w31815.pdf
- Served capture: https://web.archive.org/web/20231129164044id_/https://www.nber.org/system/files/working_papers/w31815/w31815.pdf
- Archive-reported timestamp: `20231129164044`; `Memento-Datetime: Wed, 29 Nov 2023 16:40:44 GMT`.
- Retrieved: 2026-10-15T18:59:17.265Z; HTTP 200.
- SHA-256: `0374b709682aada8e05cd3af7e17cd6ec1b71d2d7ab4b8fe8969d2791c42dbbe`. Byte-identical to the pack retrieval hash.

### roodman-2020

- Requested: https://web.archive.org/web/20200623172927id_/https://www.openphilanthropy.org/blog/modeling-human-trajectory
- Served capture: https://web.archive.org/web/20200623172927id_/https://www.openphilanthropy.org/blog/modeling-human-trajectory
- Archive-reported timestamp: `20200623172927`; `Memento-Datetime: Tue, 23 Jun 2020 17:29:27 GMT`.
- Retrieved: 2026-10-15T18:59:30.712Z; HTTP 200.
- SHA-256: `7c70b5dc13cf6544be00bce394d16e80190ee1ba78e09a1d5a816e4514cd9c66`. Byte-identical to the pack retrieval hash.

### karnofsky-2020-comment

- Requested: https://web.archive.org/web/20200623172927id_/https://www.openphilanthropy.org/blog/modeling-human-trajectory
- Served capture: https://web.archive.org/web/20200623172927id_/https://www.openphilanthropy.org/blog/modeling-human-trajectory
- Archive-reported timestamp: `20200623172927`; `Memento-Datetime: Tue, 23 Jun 2020 17:29:27 GMT`.
- Retrieved: 2026-10-15T18:59:30.712Z; HTTP 200.
- SHA-256: `7c70b5dc13cf6544be00bce394d16e80190ee1ba78e09a1d5a816e4514cd9c66`. Byte-identical to the pack retrieval hash.

### davidson-2021

- Requested: https://web.archive.org/web/20210702003241id_/https://www.openphilanthropy.org/could-advanced-ai-drive-explosive-economic-growth
- Served capture: https://web.archive.org/web/20210702003241id_/https://www.openphilanthropy.org/could-advanced-ai-drive-explosive-economic-growth
- Archive-reported timestamp: `20210702003241`; `Memento-Datetime: Fri, 02 Jul 2021 00:32:41 GMT`.
- Retrieved: 2026-10-15T18:59:40.955Z; HTTP 200.
- SHA-256: `b49aea65d3574a88e914a855aaba57dd4a02728159a187a26a657d0f44ac324b`. Byte-identical to the pack retrieval hash.

### meta-faf-v1-1

- Requested: https://web.archive.org/web/20250213105620id_/https://ai.meta.com/static-resource/meta-frontier-ai-framework/
- Served capture: https://web.archive.org/web/20250213105620id_/https://ai.meta.com/static-resource/meta-frontier-ai-framework/
- Archive-reported timestamp: `20250213105620`; `Memento-Datetime: Thu, 13 Feb 2025 10:56:20 GMT`.
- Retrieved: 2026-10-15T19:00:25.525Z; HTTP 200.
- SHA-256: `9fa301dfb67bf8d392abda13a2466358ffde756f14a9d55e4fe2d95f7cfecc21`.

## Per-quotation results

### E01-01: match

- Source: `hanson-1998-singularity`.
- Capture: [19990128001813](https://web.archive.org/web/19990128001813id_/http://hanson.berkeley.edu/fastgrow.html); Archive header: `Thu, 28 Jan 1999 00:18:13 GMT`.
- Recorded locator: Journal of Transhumanism 2 (June 1998), Wayback capture 1999-01-28; section "Introduction", para. 1
- Check: NFKC + whitespace.
- Recorded quotation: Many technological enthusiasts, impressed by the potential of various envisioned technologies, have speculated that technology may soon become so productive as to induce a "singularity", a period of extremely rapid growth.
- Source excerpt: Many technological enthusiasts, impressed by the potential of various envisioned technologies, have speculated that technology may soon become so productive as to induce a "singularity", a period of extremely rapid growth.

### E01-02: match

- Source: `hanson-1998-singularity`.
- Capture: [19990128001813](https://web.archive.org/web/19990128001813id_/http://hanson.berkeley.edu/fastgrow.html); Archive header: `Thu, 28 Jan 1999 00:18:13 GMT`.
- Recorded locator: Journal of Transhumanism 2 (June 1998), Wayback capture 1999-01-28; section "Investment Bottlenecks", final para.
- Check: NFKC + whitespace.
- Recorded quotation: Thus it seems unlikely that a single new technology could quickly knock the economy into a high demand mode with very high growth rates.
- Source excerpt: Thus it seems unlikely that a single new technology could quickly knock the economy into a high demand mode with very high growth rates.

### E05-01: match

- Source: `hanson-1998-singularity`.
- Capture: [19990128001813](https://web.archive.org/web/19990128001813id_/http://hanson.berkeley.edu/fastgrow.html); Archive header: `Thu, 28 Jan 1999 00:18:13 GMT`.
- Recorded locator: Journal of Transhumanism 2 (June 1998), Wayback capture 1999-01-28; section "Conclusion", final para.
- Check: NFKC + whitespace.
- Recorded quotation: a persuasive argument for this case should explain, in standard economic terminology, why we should expect this technology to meet these conditions.
- Source excerpt: a persuasive argument for this case should explain, in standard economic terminology, why we should expect this technology to meet these conditions.

### E01-04: match

- Source: `hanson-1998-vinge`.
- Capture: [20001117154900](https://web.archive.org/web/20001117154900id_/http://hanson.gmu.edu/vc.html); Archive header: `Fri, 17 Nov 2000 15:49:00 GMT`.
- Recorded locator: Robin Hanson, comment "Some Skepticism" (signed ©1998), in "Comments on Vinge's Singularity", Wayback capture 2000; para. beginning "Now let me be more critical"
- Check: NFKC + whitespace.
- Recorded quotation: Some people interpret this as imagining a single engineer working on the task of redesigning itself to be 1% smarter. … These assumptions allow the engineer's intelligence to explode to infinity within a finite time.
- Source excerpt: Some people interpret this as imagining a single engineer working on the task of redesigning itself to be 1% smarter. They think of intelligence as a productivity multiplier, shortening the time it takes do many mental tasks given the same other resources, and they assume this "make myself 1% smarter" task stays equally hard, as the engineer becomes smarter. These assumptions allow the engineer's intelligence to explode to infinity within a finite time.

### E01-05: match

- Source: `hanson-1998-vinge`.
- Capture: [20001117154900](https://web.archive.org/web/20001117154900id_/http://hanson.gmu.edu/vc.html); Archive header: `Fri, 17 Nov 2000 15:49:00 GMT`.
- Recorded locator: Robin Hanson, comment "Some Skepticism" (signed ©1998), in "Comments on Vinge's Singularity", Wayback capture 2000; para. beginning "If early work focuses"
- Check: NFKC + whitespace.
- Recorded quotation: If early work focuses on the easiest improvements, however, the task of becoming more productive can get harder as the easy wins are exhausted.
- Source excerpt: If early work focuses on the easiest improvements, however, the task of becoming more productive can get harder as the easy wins are exhausted.

### E01-06: match

- Source: `hanson-1998-vinge`.
- Capture: [20001117154900](https://web.archive.org/web/20001117154900id_/http://hanson.gmu.edu/vc.html); Archive header: `Fri, 17 Nov 2000 15:49:00 GMT`.
- Recorded locator: Robin Hanson, comment "Some Skepticism" (signed ©1998), in "Comments on Vinge's Singularity", Wayback capture 2000; para. beginning "Can we interpret Vinge's claim"
- Check: NFKC + whitespace.
- Recorded quotation: The vast economic literature on economic growth offers little support for any simple direct relation between economic growth rates and either intelligence levels or clock speeds.
- Source excerpt: The vast economic literature on economic growth offers little support for any simple direct relation between economic growth rates and either intelligence levels or clock speeds.

### E01-07: match

- Source: `hanson-1998-vinge`.
- Capture: [20001117154900](https://web.archive.org/web/20001117154900id_/http://hanson.gmu.edu/vc.html); Archive header: `Fri, 17 Nov 2000 15:49:00 GMT`.
- Recorded locator: Robin Hanson, comment "Some Skepticism" (signed ©1998), in "Comments on Vinge's Singularity", Wayback capture 2000; para. beginning "First, let me say what I agree with"
- Check: NFKC + whitespace.
- Recorded quotation: within the next century we will probably begin to see a wider variety of minds, including humans who have uploaded, sped-up, and begun to explore the vast possibilities of higher bandwidths and self-modification.
- Source excerpt: within the next century we will probably begin to see a wider variety of minds, including humans who have uploaded, sped-up, and begun to explore the vast possibilities of higher bandwidths and self-modification.

### E02-02: match

- Source: `hanson-1998-vinge`.
- Capture: [20001117154900](https://web.archive.org/web/20001117154900id_/http://hanson.gmu.edu/vc.html); Archive header: `Fri, 17 Nov 2000 15:49:00 GMT`.
- Recorded locator: Robin Hanson, comment "Some Skepticism" (signed ©1998), in "Comments on Vinge's Singularity", Wayback capture 2000; para. beginning "It seems to me that human cognition"
- Check: NFKC + whitespace.
- Recorded quotation: we can understand much about quite a diverse zoo of possible minds, many of them much more capable that ourselves on many dimensions.
- Source excerpt: we can understand much about quite a diverse zoo of possible minds, many of them much more capable that ourselves on many dimensions.

### E01-03: match

- Source: `hanson-aigrow`.
- Capture: [20000819034042](https://web.archive.org/web/20000819034042id_/http://hanson.gmu.edu/aigrow.pdf); Archive header: `Sat, 19 Aug 2000 03:40:42 GMT`.
- Recorded locator: Hanson, "Economic Growth Given Machine Intelligence" (author-dated 1998; Wayback capture 2000-08-19), sec. 4 "Some Variations", learning-by-doing variant, p. 7
- Check: NFKC + whitespace. Located on PDF page 7.
- Recorded quotation: Otherwise, we no longer have diminishing returns and steady growth solutions are no longer possible; our model predicts a continually accelerating growth rate.
- Source excerpt: Otherwise, we no longer have diminishing returns and steady growth solutions are no longer possible; our model predicts a continually accelerating growth rate.

### E02-01: match

- Source: `hanson-aigrow`.
- Capture: [20000819034042](https://web.archive.org/web/20000819034042id_/http://hanson.gmu.edu/aigrow.pdf); Archive header: `Sat, 19 Aug 2000 03:40:42 GMT`.
- Recorded locator: Hanson, "Economic Growth Given Machine Intelligence" (author-dated 1998; Wayback capture 2000-08-19), sec. 1 "Introduction", p. 1
- Check: Rendered-page transcription; missing text-layer spaces restored. Located on PDF page 1.
- Recorded quotation: Today, Artificial Intelligence and Robotics are long-standing fields of engineering whose explicit goals are to develop principles of design to eventually enable machines to accomplish all human cognitive and physical tasks.
- Source excerpt: Today, Artificial Intelligence and Robotics are long-standing fields of engineering whose explicit goals are to develop principles of design to eventually enable machines to accomplish all human cognitive and physical tasks.
- Note: Machine visual inspection of the archived PDF confirmed the word boundaries; all non-whitespace characters agree with the extracted page.

### E05-02: match

- Source: `hanson-aigrow`.
- Capture: [20000819034042](https://web.archive.org/web/20000819034042id_/http://hanson.gmu.edu/aigrow.pdf); Archive header: `Sat, 19 Aug 2000 03:40:42 GMT`.
- Recorded locator: Hanson, "Economic Growth Given Machine Intelligence" (author-dated 1998; Wayback capture 2000-08-19), sec. 1 "Introduction", p. 2
- Check: NFKC + whitespace. Located on PDF page 2.
- Recorded quotation: What are likely to be the long-term economic consequences of continued progress in developing machine intelligence? Beyond disputes over when machines have complemented vs. substituted for human labor, very little research seems to have been done on this question.
- Source excerpt: What are likely to be the long-term economic consequences of continued progress in developing machine intelligence? Beyond disputes over when machines have complemented vs. substituted for human labor, very little research seems to have been done on this question.

### E05-03: match

- Source: `hanson-aigrow`.
- Capture: [20000819034042](https://web.archive.org/web/20000819034042id_/http://hanson.gmu.edu/aigrow.pdf); Archive header: `Sat, 19 Aug 2000 03:40:42 GMT`.
- Recorded locator: Hanson, "Economic Growth Given Machine Intelligence" (author-dated 1998; Wayback capture 2000-08-19), concluding section, p. 12
- Check: Rendered-page transcription; missing text-layer spaces restored. Located on PDF page 12.
- Recorded quotation: If machine intelligences are a real prospect in the foreseeable future, their economic implications would seem to deserve closer scrutiny.
- Source excerpt: If machine intelligences are a real prospect in the foreseeable future, their economic implications would seem to deserve closer scrutiny.
- Note: Machine visual inspection of the archived PDF confirmed the word boundaries; all non-whitespace characters agree with the extracted page.

### E01-23: match

- Source: `nber-w31815-2023`.
- Capture: [20231129164044](https://web.archive.org/web/20231129164044id_/https://www.nber.org/system/files/working_papers/w31815/w31815.pdf); Archive header: `Wed, 29 Nov 2023 16:40:44 GMT`.
- Recorded locator: pdf page 57; concluding section
- Check: NFKC + whitespace. Located on PDF page 57.
- Recorded quotation: More worrying are models in which a unit of capital can grow, do research into capital-augmenting technology, and recursively self-improve, all without human input.
- Source excerpt: More worrying are models in which a unit of capital can grow, do research into capital-augmenting technology, and recursively self-improve, all without human input.

### E01-24: match

- Source: `nber-w31815-2023`.
- Capture: [20231129164044](https://web.archive.org/web/20231129164044id_/https://www.nber.org/system/files/working_papers/w31815/w31815.pdf); Archive header: `Wed, 29 Nov 2023 16:40:44 GMT`.
- Recorded locator: pdf page 2; Abstract
- Check: NFKC + whitespace. Located on PDF page 2.
- Recorded quotation: We then consider models in which AI increases knowledge production, capturing the notion that AI will let capital “self-improve”, speeding growth further.
- Source excerpt: We then consider models in which AI increases knowledge production, capturing the notion that AI will let capital “self-improve”, speeding growth further.

### E02-11: match

- Source: `nber-w31815-2023`.
- Capture: [20231129164044](https://web.archive.org/web/20231129164044id_/https://www.nber.org/system/files/working_papers/w31815/w31815.pdf); Archive header: `Wed, 29 Nov 2023 16:40:44 GMT`.
- Recorded locator: pdf page 56; concluding section
- Check: NFKC + whitespace. Located on PDF page 56.
- Recorded quotation: in the long run, the likeliest transformative scenario is that AI will outsmart us all.
- Source excerpt: in the long run, the likeliest transformative scenario is that AI will outsmart us all.

### E03-15: match

- Source: `nber-w31815-2023`.
- Capture: [20231129164044](https://web.archive.org/web/20231129164044id_/https://www.nber.org/system/files/working_papers/w31815/w31815.pdf); Archive header: `Wed, 29 Nov 2023 16:40:44 GMT`.
- Recorded locator: pdf page 57; concluding section
- Check: NFKC + whitespace. Located on PDF page 57.
- Recorded quotation: to the extent that AI development poses such a risk, AI safety is a global and intergenerational public good.
- Source excerpt: to the extent that AI development poses such a risk, AI safety is a global and intergenerational public good.

### E05-18: match

- Source: `nber-w31815-2023`.
- Capture: [20231129164044](https://web.archive.org/web/20231129164044id_/https://www.nber.org/system/files/working_papers/w31815/w31815.pdf); Archive header: `Wed, 29 Nov 2023 16:40:44 GMT`.
- Recorded locator: pdf page 57; concluding section
- Check: NFKC + whitespace. Located on PDF page 57.
- Recorded quotation: With the recent exceptions of Jones (2023) and Acemoglu and Lensman (2023), treatments of existential risk from AI appear to be absent from the economics literature.
- Source excerpt: With the recent exceptions of Jones (2023) and Acemoglu and Lensman (2023), treatments of existential risk from AI appear to be absent from the economics literature.

### E05-19: match

- Source: `nber-w31815-2023`.
- Capture: [20231129164044](https://web.archive.org/web/20231129164044id_/https://www.nber.org/system/files/working_papers/w31815/w31815.pdf); Archive header: `Wed, 29 Nov 2023 16:40:44 GMT`.
- Recorded locator: pdf page 56; concluding section
- Check: NFKC + whitespace + PDF line-break dehyphenation. Located on PDF page 56.
- Recorded quotation: the lack of attention to these possibilities by most of the economics profession is not a necessary consequence of all plausible economic models. Rather, it is the result of a widespread norm of focusing only on model scenarios in which long-run growth is roughly constant
- Source excerpt: the lack of attention to these possibilities by most of the economics profession is not a necessary consequence of all plausible economic models. Rather, it is the result of a widespread norm of focusing only on model scenarios in which long-run growth is roughly constant

### E05-20: match

- Source: `nber-w31815-2023`.
- Capture: [20231129164044](https://web.archive.org/web/20231129164044id_/https://www.nber.org/system/files/working_papers/w31815/w31815.pdf); Archive header: `Wed, 29 Nov 2023 16:40:44 GMT`.
- Recorded locator: pdf page 7; footnote 2
- Check: NFKC + whitespace. Located on PDF page 7.
- Recorded quotation: a decade ago, before mainstream economists started to analyze the transformative potential of AI.
- Source excerpt: a decade ago, before mainstream economists started to analyze the transformative potential of AI.

### E05-21: match

- Source: `nber-w31815-2023`.
- Capture: [20231129164044](https://web.archive.org/web/20231129164044id_/https://www.nber.org/system/files/working_papers/w31815/w31815.pdf); Archive header: `Wed, 29 Nov 2023 16:40:44 GMT`.
- Recorded locator: pdf page 4; Introduction
- Check: NFKC + whitespace + PDF line-break dehyphenation. Located on PDF page 4.
- Recorded quotation: At least since Herbert Simon’s 1960 prediction that artificial intelligence would soon be able to replace all human labor, many economists have understood that sufficiently advanced artificial intelligence (AI) could transform the structure of the global economy.
- Source excerpt: At least since Herbert Simon’s 1960 prediction that artificial intelligence would soon be able to replace all human labor, many economists have understood that sufficiently advanced artificial intelligence (AI) could transform the structure of the global economy.

### G03-c: match

- Source: `roodman-2020`. Evidence: `evidence-ec-g03-c`.
- Capture: [20200623172927](https://web.archive.org/web/20200623172927id_/https://www.openphilanthropy.org/blog/modeling-human-trajectory); Archive header: `Tue, 23 Jun 2020 17:29:27 GMT`.
- Recorded locator: Introduction, paragraph beginning "Having now labored long on the task"
- Check: NFKC + whitespace.
- Recorded quotation: I did come to appreciate that any system whose rate of growth rises with its size is inherently unstable. The human future might be one of explosion, perhaps an economic upwelling that eclipses the industrial revolution as thoroughly as it eclipsed the agricultural revolution.
- Source excerpt: I did come to appreciate that any system whose rate of growth rises with its size is inherently unstable. The human future might be one of explosion, perhaps an economic upwelling that eclipses the industrial revolution as thoroughly as it eclipsed the agricultural revolution.

### G03-d: mismatch

- Source: `karnofsky-2020-comment`. Evidence: `evidence-ec-g03-d`.
- Capture: [20200623172927](https://web.archive.org/web/20200623172927id_/https://www.openphilanthropy.org/blog/modeling-human-trajectory); Archive header: `Tue, 23 Jun 2020 17:29:27 GMT`.
- Recorded locator: Comment "Some personal reactions on this piece", paragraph beginning "Like David, I wouldn't take the model"
- Check: NFKC + whitespace; failed strict comparison.
- Recorded quotation: I tentatively agree with what I see as the central themes: that a sufficiently broad view of history shows accelerating growth, that this dynamic is inherently unstable, and that we therefore have little reason to "rule out" explosive growth in the coming decades.
- Actual source wording: I tentatively agree with what I see as the central themes: that a sufficiently broad view of history shows accelerating growth, that this dynamic is inherently unstable, and that we therefore have little reason to “rule out” explosive growth in the coming decades.
- Note: Typography only: ASCII quotation marks/apostrophes in the record differ from curly Unicode punctuation in the archived source. Matches if those punctuation forms are additionally folded.

### G09-c: mismatch

- Source: `karnofsky-2020-comment`. Evidence: `evidence-ec-g09-c`.
- Capture: [20200623172927](https://web.archive.org/web/20200623172927id_/https://www.openphilanthropy.org/blog/modeling-human-trajectory); Archive header: `Tue, 23 Jun 2020 17:29:27 GMT`.
- Recorded locator: Comment "Some personal reactions on this piece", paragraph beginning "Like David, I wouldn't take the model"
- Check: NFKC + whitespace; failed strict comparison.
- Recorded quotation: I tentatively agree with what I see as the central themes: that a sufficiently broad view of history shows accelerating growth, that this dynamic is inherently unstable, and that we therefore have little reason to "rule out" explosive growth in the coming decades.
- Actual source wording: I tentatively agree with what I see as the central themes: that a sufficiently broad view of history shows accelerating growth, that this dynamic is inherently unstable, and that we therefore have little reason to “rule out” explosive growth in the coming decades.
- Note: Typography only: ASCII quotation marks/apostrophes in the record differ from curly Unicode punctuation in the archived source. Matches if those punctuation forms are additionally folded.

### G02-e: match

- Source: `davidson-2021`. Evidence: `evidence-ec-g02-e`.
- Capture: [20210702003241](https://web.archive.org/web/20210702003241id_/https://www.openphilanthropy.org/could-advanced-ai-drive-explosive-economic-growth); Archive header: `Fri, 02 Jul 2021 00:32:41 GMT`.
- Recorded locator: Summary, first argument ("Idea-based models of very long-run growth imply AI could drive explosive growth")
- Check: NFKC + whitespace.
- Recorded quotation: Suppose we develop AI systems that can substitute very effectively for human labor in producing output and in R&D. The following ideas feedback loop could occur: more ideas → more output → more AI systems → more ideas…
- Source excerpt: Suppose we develop AI systems that can substitute very effectively for human labor in producing output and in R&D. The following ideas feedback loop could occur: more ideas → more output → more AI systems → more ideas

### G02-e2: match

- Source: `davidson-2021`. Evidence: `evidence-ec-g02-e2`.
- Capture: [20210702003241](https://web.archive.org/web/20210702003241id_/https://www.openphilanthropy.org/could-advanced-ai-drive-explosive-economic-growth); Archive header: `Fri, 02 Jul 2021 00:32:41 GMT`.
- Recorded locator: Summary, first argument, paragraph after the feedback loop
- Check: NFKC + whitespace.
- Recorded quotation: Before 1880, the ideas feedback loop led to super-exponential growth. So our default expectation should be that this new ideas feedback loop will again lead to super-exponential growth.
- Source excerpt: Before 1880, the ideas feedback loop led to super-exponential growth. So our default expectation should be that this new ideas feedback loop will again lead to super-exponential growth.

### G03-e: match

- Source: `davidson-2021`. Evidence: `evidence-ec-g03-e`.
- Capture: [20210702003241](https://web.archive.org/web/20210702003241id_/https://www.openphilanthropy.org/could-advanced-ai-drive-explosive-economic-growth); Archive header: `Fri, 02 Jul 2021 00:32:41 GMT`.
- Recorded locator: Summary, third argument ("An ignorance perspective assigns some probability to explosive growth")
- Check: NFKC + whitespace.
- Recorded quotation: But we do know that the pace of growth has increased significantly over the course of history. Absent deeper understanding of the mechanics driving growth, it would be strange to rule out growth increasing again.
- Source excerpt: But we do know that the pace of growth has increased significantly over the course of history. Absent deeper understanding of the mechanics driving growth, it would be strange to rule out growth increasing again.

### G04-f: mismatch

- Source: `davidson-2021`. Evidence: `evidence-ec-g04-f`.
- Capture: [20210702003241](https://web.archive.org/web/20210702003241id_/https://www.openphilanthropy.org/could-advanced-ai-drive-explosive-economic-growth); Archive header: `Fri, 02 Jul 2021 00:32:41 GMT`.
- Recorded locator: Summary, objection "Automation limits", response
- Check: NFKC + whitespace; failed strict comparison.
- Recorded quotation: I don't think this provides a decisive reason to rule out explosive growth. Firstly, it's possible that we will ultimately automate all essential tasks, or restructure work-flows to do without them.
- Actual source wording: I don’t think this provides a decisive reason to rule out explosive growth. Firstly, it’s possible that we will ultimately automate all essential tasks, or restructure work-flows to do without them.
- Note: Typography only: ASCII quotation marks/apostrophes in the record differ from curly Unicode punctuation in the archived source. Matches if those punctuation forms are additionally folded.

### G05-c: match

- Source: `davidson-2021`. Evidence: `evidence-ec-g05-c`.
- Capture: [20210702003241](https://web.archive.org/web/20210702003241id_/https://www.openphilanthropy.org/could-advanced-ai-drive-explosive-economic-growth); Archive header: `Fri, 02 Jul 2021 00:32:41 GMT`.
- Recorded locator: Summary, objection "Limits to how fast a human economy can grow", response
- Check: NFKC + whitespace.
- Recorded quotation: I do think that there is some chance that one of these bottlenecks will prevent explosive growth. On the other hand, no individual bottleneck is certain to apply and there are some reasons to think we could grow at 30% per year
- Source excerpt: I do think that there is some chance that one of these bottlenecks will prevent explosive growth. On the other hand, no individual bottleneck is certain to apply and there are some reasons to think we could grow at 30% per year

### G06-c: match

- Source: `davidson-2021`. Evidence: `evidence-ec-g06-c`.
- Capture: [20210702003241](https://web.archive.org/web/20210702003241id_/https://www.openphilanthropy.org/could-advanced-ai-drive-explosive-economic-growth); Archive header: `Fri, 02 Jul 2021 00:32:41 GMT`.
- Recorded locator: Summary, objection "There's no evidence of explosive growth in any economic sub-sector", response
- Check: NFKC + whitespace.
- Recorded quotation: The absence of these signs in macroeconomic data is reason to doubt explosive growth will occur within the next couple of decades. Beyond this time frame, it is hard to draw conclusions.
- Source excerpt: The absence of these signs in macroeconomic data is reason to doubt explosive growth will occur within the next couple of decades. Beyond this time frame, it is hard to draw conclusions.

### G09-d: match

- Source: `davidson-2021`. Evidence: `evidence-ec-g09-d`.
- Capture: [20210702003241](https://web.archive.org/web/20210702003241id_/https://www.openphilanthropy.org/could-advanced-ai-drive-explosive-economic-growth); Archive header: `Fri, 02 Jul 2021 00:32:41 GMT`.
- Recorded locator: Abstract
- Check: NFKC + whitespace.
- Recorded quotation: Ultimately, I find that explosive growth by 2100 is plausible but far from certain.
- Source excerpt: Ultimately, I find that explosive growth by 2100 is plausible but far from certain.

### G09-e: match

- Source: `davidson-2021`. Evidence: `evidence-ec-g09-e`.
- Capture: [20210702003241](https://web.archive.org/web/20210702003241id_/https://www.openphilanthropy.org/could-advanced-ai-drive-explosive-economic-growth); Archive header: `Fri, 02 Jul 2021 00:32:41 GMT`.
- Recorded locator: Appendix G "How I decide my overall probability of explosive growth by 2100"
- Check: NFKC + whitespace.
- Recorded quotation: What is robust is that I assign non-negligible probability (>10%) to explosive growth, exponential growth, and sub-exponential growth.
- Source excerpt: What is robust is that I assign non-negligible probability (>10%) to explosive growth, exponential growth, and sub-exponential growth.

### meta-faf-v1-1.D2.levels.1: match

- Source: `meta-faf-v1-1`. Evidence: `evidence-prov-meta-faf-v1-1-moderate-threshold`. Cell: `D2.levels`.
- Capture: [20250213105620](https://web.archive.org/web/20250213105620id_/https://ai.meta.com/static-resource/meta-frontier-ai-framework/); Archive header: `Thu, 13 Feb 2025 10:56:20 GMT`.
- Recorded locator: PDF p. 13 (printed p. 13), §3.3 Risk thresholds, Table 1: Risk thresholds for frontier AI, Moderate row, Risk Threshold column (text below the measure label 'Release')
- Check: pdfplumber cropped table column; NFKC + whitespace. Located on PDF page 13.
- Recorded quotation: The model would not provide significant uplift towards execution of a threat scenario.
- Source excerpt: The model would not provide significant uplift towards execution of a threat scenario.
- Note: Table 1 risk-threshold column extracted separately at PDF coordinates (90, 90, 245, 700) to avoid interleaving adjacent security/measure columns; checked against the rendered page.

### meta-faf-v1-1.D2.definition.1: match

- Source: `meta-faf-v1-1`. Evidence: `evidence-prov-meta-faf-v1-1-high-threshold`. Cell: `D2.definition`.
- Capture: [20250213105620](https://web.archive.org/web/20250213105620id_/https://ai.meta.com/static-resource/meta-frontier-ai-framework/); Archive header: `Thu, 13 Feb 2025 10:56:20 GMT`.
- Recorded locator: PDF p. 13 (printed p. 13), §3.3 Risk thresholds, Table 1: Risk thresholds for frontier AI, High row, Risk Threshold column (text below the measure label 'Do not release')
- Check: pdfplumber cropped table column; NFKC + whitespace. Located on PDF page 13.
- Recorded quotation: The model provides significant uplift towards execution of a threat scenario (i.e. significantly enhances performance on key capabilities or tasks needed to produce a catastrophic outcome)
- Source excerpt: The model provides significant uplift towards execution of a threat scenario (i.e. significantly enhances performance on key capabilities or tasks needed to produce a catastrophic outcome)
- Note: Table 1 risk-threshold column extracted separately at PDF coordinates (90, 90, 245, 700) to avoid interleaving adjacent security/measure columns; checked against the rendered page.

### meta-faf-v1-1.D2.definition.2: match

- Source: `meta-faf-v1-1`. Evidence: `evidence-prov-meta-faf-v1-1-critical-threshold`. Cell: `D2.definition`.
- Capture: [20250213105620](https://web.archive.org/web/20250213105620id_/https://ai.meta.com/static-resource/meta-frontier-ai-framework/); Archive header: `Thu, 13 Feb 2025 10:56:20 GMT`.
- Recorded locator: PDF p. 13 (printed p. 13), §3.3 Risk thresholds, Table 1: Risk thresholds for frontier AI, Critical row, Risk Threshold column (text below the measure label 'Stop development')
- Check: pdfplumber cropped table column; NFKC + whitespace. Located on PDF page 13.
- Recorded quotation: The model would uniquely enable the execution of at least one of the threat scenarios that have been identified as potentially sufficient to produce a catastrophic outcome
- Source excerpt: The model would uniquely enable the execution of at least one of the threat scenarios that have been identified as potentially sufficient to produce a catastrophic outcome
- Note: Table 1 risk-threshold column extracted separately at PDF coordinates (90, 90, 245, 700) to avoid interleaving adjacent security/measure columns; checked against the rendered page.

### meta-faf-v1-1.D3.halt.1: match

- Source: `meta-faf-v1-1`. Evidence: `evidence-prov-meta-faf-v1-1-critical-development-measure`. Cell: `D3.halt`.
- Capture: [20250213105620](https://web.archive.org/web/20250213105620id_/https://ai.meta.com/static-resource/meta-frontier-ai-framework/); Archive header: `Thu, 13 Feb 2025 10:56:20 GMT`.
- Recorded locator: PDF p. 12 (printed p. 12), §3.3 Risk thresholds, first paragraph, third sentence
- Check: NFKC + whitespace. Located on PDF page 12.
- Recorded quotation: If a frontier AI is assessed to have reached the critical risk threshold and cannot be mitigated, we will stop development and implement the measures outlined in Table 1.
- Source excerpt: If a frontier AI is assessed to have reached the critical risk threshold and cannot be mitigated, we will stop development and implement the measures outlined in Table 1.

### meta-faf-v1-1.D3.halt.2: match

- Source: `meta-faf-v1-1`. Evidence: `evidence-prov-meta-faf-v1-1-high-deployment-measure`. Cell: `D3.halt`.
- Capture: [20250213105620](https://web.archive.org/web/20250213105620id_/https://ai.meta.com/static-resource/meta-frontier-ai-framework/); Archive header: `Thu, 13 Feb 2025 10:56:20 GMT`.
- Recorded locator: PDF p. 17 (printed p. 17), §4.2 Evaluation and mitigation, paragraph beginning 'We may take into account monetary costs', second sentence
- Check: NFKC + whitespace. Located on PDF page 17.
- Recorded quotation: If the results of our evaluations indicate that a frontier AI has a “high” risk threshold … we will not release the frontier AI externally.
- Source excerpt: If the results of our evaluations indicate that a frontier AI has a “high” risk threshold by providing significant uplift towards realization of a catastrophic outcome we will not release the frontier AI externally.

### meta-faf-v1-1.D3.halt.3: match

- Source: `meta-faf-v1-1`. Evidence: `evidence-prov-meta-faf-v1-1-critical-pause-investigation`. Cell: `D3.halt`.
- Capture: [20250213105620](https://web.archive.org/web/20250213105620id_/https://ai.meta.com/static-resource/meta-frontier-ai-framework/); Archive header: `Thu, 13 Feb 2025 10:56:20 GMT`.
- Recorded locator: PDF p. 13 (printed p. 13), §3.3 Risk thresholds, Table 1: Risk thresholds for frontier AI, Critical row, Measures column, first bullet, second sentence
- Check: NFKC + whitespace. Located on PDF page 13.
- Recorded quotation: If a model appears to uniquely enable the execution of a threat scenario we will pause development while we investigate whether barriers to realizing the catastrophic outcome remain.
- Source excerpt: If a model appears to uniquely enable the execution of a threat scenario we will pause development while we investigate whether barriers to realizing the catastrophic outcome remain.

### meta-faf-v1-1.D4.determination.1: match

- Source: `meta-faf-v1-1`. Evidence: `evidence-prov-meta-faf-v1-1-approval-decision-authority`. Cell: `D4.determination`.
- Capture: [20250213105620](https://web.archive.org/web/20250213105620id_/https://ai.meta.com/static-resource/meta-frontier-ai-framework/); Archive header: `Thu, 13 Feb 2025 10:56:20 GMT`.
- Recorded locator: PDF p. 8 (printed p. 8), §2.1.3 Decide, 'Make a decision on release', second sentence
- Check: NFKC + whitespace. Located on PDF page 8.
- Recorded quotation: Informed by this analysis, a leadership team will either request further testing or information, require additional mitigations or improvements, or they will approve the model for release.
- Source excerpt: Informed by this analysis, a leadership team will either request further testing or information, require additional mitigations or improvements, or they will approve the model for release.

### meta-faf-v1-1.D4.determination.2: match

- Source: `meta-faf-v1-1`. Evidence: `evidence-prov-meta-faf-v1-1-uplift-assessment-approval`. Cell: `D4.determination`.
- Capture: [20250213105620](https://web.archive.org/web/20250213105620id_/https://ai.meta.com/static-resource/meta-frontier-ai-framework/); Archive header: `Thu, 13 Feb 2025 10:56:20 GMT`.
- Recorded locator: PDF p. 13 (printed p. 13), §3.3 Risk thresholds, footnote 7 (attached to Table 1, High row, Risk Threshold column), third and final sentence
- Check: NFKC + whitespace. Located on PDF page 13.
- Recorded quotation: A final assessment of uplift is approved by senior-level decision-makers through our AI Risk process (see Section 2.1).
- Source excerpt: A final assessment of uplift is approved by senior-level decision-makers through our AI Risk process (see Section 2.1).

## Failed requests

Archive HTTP failures: 0. One earlier attempt was blocked by the local sandbox before an Archive response was available:

- URL: https://web.archive.org/web/19990128001813id_/http://hanson.berkeley.edu/fastgrow.html
  - Failure: Network access to web.archive.org was blocked: domain is not on the allowlist for the current sandbox mode.
  - Archive timestamp: none reported.
  - Resolution: Retried with explicit escalated network approval; successful request recorded in requests.

The matching JSON includes the complete HTTP request ledger, including response metadata for every successful request. Karnofsky shares the retrieved Roodman capture; the body was reused without another request.
