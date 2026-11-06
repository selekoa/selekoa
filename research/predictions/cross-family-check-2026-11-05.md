| Part    |            Items | Status                                       | Result                                                           |
| ------- | ---------------: | -------------------------------------------- | ---------------------------------------------------------------- |
| Part A  |               12 | Blind answers committed before held verdicts | **3 agree / 7 minor / 2 material / 0 cannot check**              |
| Part B1 |         5 groups | All requested context inspected              | Includes the Vinge image re-read and all dated captures          |
| Part B2 |         5 groups | Every group attempted                        | Four early attestations recovered; Kurzweil date remains partial |
| Part B3 | 1 optional group | Not attempted                                | Life page image not inspected                                    |
| Part C  |               12 | Complete after blind commit                  | Compared with held verdict answers only                          |

# Cross-family check: predictions pack (2026-11-05)

Documentary wording only; no judgement of whether a prediction came true.

## Scope and independence

Before source retrieval, a combined Get-Content call read the full input brief and the November 2 Markdown report for layout. Tool output was truncated but exposed earlier findings. No text was copied as source evidence; all eight source responses were retrieved afresh. This limits fresh-context independence. After Part A was committed and pushed, the first 50 lines of the November 2 Markdown report were read again solely to match its leading status-table layout.

Held verdicts deliberately read by Get-Content at 06:06:28 UTC, after blind commit 0848fc7 at 06:06:13 UTC. pack.json, pack.md, verification.json, drafts, followup, adjudication and review notes were not intentionally opened. Whole-index privacy scans mechanically read them only after the blind commit.

git fetch and worktree checkout transferred/materialized objects before drafting. pnpm check:privacy first attempted after blind commit at approximately 06:06 UTC; sandbox pnpm registration failed before scanning. The successful outside-sandbox run began around 06:07 UTC and mechanically read all 2,312 indexed files using git show, including held files, without displaying their text. Its pnpm dependency setup also read manifests/lockfile and created ignored node_modules. No held text was intentionally inspected until the comparison file read after the blind commit. Editorial tests also imported historical review/data fixtures after Part A was committed; sandbox run began at approximately 06:15 UTC and the outside-sandbox retry followed at approximately 06:16 UTC.

Prior report read occurred after worktree creation and before first source retrieval at 06:00:54 UTC on 2026-11-05. All sources inspected before Part A was written.

Whole-index baseline scan ran approximately 06:07–06:12 UTC, passed for 2,312 files before the blind-answer push. Final privacy validation uses a separate temporary index containing only the two final reports, so it does not rescan unrelated held files or modify the real index.

Direct HTTP, sequential; at least eight seconds between requests to each host. Initial sandbox Node fetch and curl failed DNS for the two live PDF hosts; successful curl requests ran outside the sandbox. Temporary response bodies and PDF renders remain untracked. Visual inspection of PDF pages; HTML text decoded without executing scripts. Displayed Metaculus values only. Signed query strings are excluded. One pacing deviation: the first Kurzweil April replay used curl -L and automatically followed its redirect to August without an enforced eight-second inter-hop pause. Subsequent replay requests disabled automatic redirects; separate requests were paced at least eight seconds apart. The redirect is disclosed and its August body is not described as an April capture.

## Part A: source-only answers

### Item 1

- **source**: simon
- **locator**: Printed p. 7 / bundle p. 13, prediction 2
- **found**: yes
- **event**: a digital computer will discover and prove an important new mathematical theorem
- **horizon**: within ten years
- **probability**: none
- **confidence**: I am willing to make the following predictions
- **conditions_hedges**: On the basis of these developments, and the speed with which research in this field is progressing
- **source_date**: {"publication":"January - February 1958","address":"November 14, 1957","kind":"journal issue; original address separately dated in printed p. 1 footnote"}
- **predictor**: Herbert A. Simon and Allen Newell jointly; Simon presented the address, and the footnote calls its content a joint product.
- **problems**: Do not turn the relative horizon into a publication-year deadline. Introductory sentence also found. Line-wrap hyphens normalized.

### Item 2

- **source**: simon
- **locator**: Printed p. 7 / bundle p. 13, prediction 3
- **found**: yes
- **event**: a digital computer will write music that will be accepted by critics as possessing considerable aesthetic value
- **horizon**: within ten years
- **probability**: none
- **confidence**: I am willing to make the following predictions
- **conditions_hedges**: On the basis of these developments, and the speed with which research in this field is progressing
- **source_date**: {"publication":"January - February 1958","address":"November 14, 1957","kind":"journal issue; original address separately dated in printed p. 1 footnote"}
- **predictor**: Herbert A. Simon and Allen Newell jointly; Simon presented the address, and the footnote calls its content a joint product.
- **problems**: Acceptance by critics and considerable aesthetic value are essential. Introductory sentence also found.

### Item 3

- **source**: simon
- **locator**: Printed pp. 7–8 / bundle pp. 13–14, prediction 4
- **found**: yes
- **event**: most theories in psychology will take the form of computer programs, or of qualitative statements about the characteristics of computer programs
- **horizon**: within ten years
- **probability**: none
- **confidence**: I am willing to make the following predictions
- **conditions_hedges**: On the basis of these developments, and the speed with which research in this field is progressing
- **source_date**: {"publication":"January - February 1958","address":"November 14, 1957","kind":"journal issue; original address separately dated in printed p. 1 footnote"}
- **predictor**: Herbert A. Simon and Allen Newell jointly; Simon presented the address, and the footnote calls its content a joint product.
- **problems**: The alternative qualitative-statements form is part of the event. Introductory sentence also found.

### Item 4

- **source**: vinge
- **locator**: Printed p. 10, middle column, last paragraph
- **found**: no
- **event**: a future that will happen as soon as superhuman intelligences are created
- **horizon**: between 20 and 100 years from now
- **probability**: none
- **confidence**: should be
- **conditions_hedges**: given the progress in computer and biological sciences
- **source_date**: {"value":"January 1983","kind":"issue date supplied by brief; month/year not printed on this isolated p. 10 scan"}
- **predictor**: Vernor Vinge
- **problems**: Brief paraphrase is substantively supported, but its fragment “given our progress” is not literal: the scan says “given the progress”. Context describes the singularity; do not substitute hardware/software wording.
- **paraphrase_supported**: true

### Item 5

- **source**: vinge
- **locator**: Printed p. 10, right column, first paragraph
- **found**: yes
- **event**: there has been little progress in automating the distinct prerogatives of the human mind. During the next 20 years this will change
- **horizon**: During the next 20 years
- **probability**: none
- **confidence**: will change
- **conditions_hedges**: So far
- **source_date**: {"value":"January 1983","kind":"issue date supplied by brief; not printed on isolated scan"}
- **predictor**: Vernor Vinge
- **problems**: Capitalization at the sentence start normalized for comparison. Distinct from the middle-column 20–100-year passage.

### Item 6

- **source**: legg09
- **locator**: Main post, final AGI-distribution paragraph
- **found**: yes
- **event**: roughly human level AGI
- **horizon**: my mode is about 2025, my expected value is actually a bit higher at 2028; 2018 to 2036
- **probability**: my 90% credibility region
- **confidence**: my current belief distribution
- **conditions_hedges**: roughly; about
- **source_date**: {"value":"December 7th, 2009","kind":"posted"}
- **predictor**: Shane Legg
- **problems**: Do not replace the mean with a median or revise this version using the later corrected interval. Both supplied fragments found.

### Item 7

- **source**: legg10
- **locator**: Main post, human-level AGI paragraph
- **found**: yes
- **event**: the time until roughly human level AGI
- **horizon**: a mean of 2028, and a mode of 2025
- **probability**: none in the quoted sentence
- **confidence**: none in the quoted sentence
- **conditions_hedges**: roughly; retrospective “last year” and “I gave it”
- **source_date**: {"value":"10 December, 2010","kind":"posted"}
- **predictor**: Shane Legg
- **problems**: This reports the prior distribution and explicitly keeps the prediction unmoved at 2028. Following paragraph corrects the 90% interval to 2018–2045; do not silently overwrite 2009.

### Item 8

- **source**: legg11
- **locator**: Main post, opening paragraph
- **found**: yes
- **event**: when human level AGI will arrive
- **horizon**: a mean of 2028 and a mode of 2025
- **probability**: none in the quoted sentence
- **confidence**: none in the quoted sentence
- **conditions_hedges**: under the assumption that nothing crazy happens like a nuclear war
- **source_date**: {"value":"31 December, 2011","kind":"posted"}
- **predictor**: Shane Legg
- **problems**: The quoted I begins after “That is,” in the same sentence. Retain the nuclear-war assumption and unchanged-estimate context; proto-AGI is a separate prediction.

### Item 9

- **source**: fhi
- **locator**: Printed p. 1 / PDF p. 2
- **found**: yes
- **event**: the development of human-level machine intelligence
- **horizon**: 2028; 2050; 2150
- **probability**: 10%; 50%; 90%
- **confidence**: none
- **conditions_hedges**: Assuming no global catastrophe halts progress
- **source_date**: {"value":"(2011)","kind":"report year; poll date separately printed as 16/1 2011"}
- **predictor**: Sandberg and Bostrom’s Machine Intelligence Survey report, summarizing an informal poll
- **problems**: All four excerpts found. Medians of estimates at each probability threshold, not author forecasts or a pooled probability distribution. Never-answers and low eventual probabilities are described separately.

### Item 10

- **source**: metaculus
- **locator**: Question title; Community Prediction display and community table
- **found**: yes
- **event**: the first general AI system be devised, tested, and publicly announced
- **horizon**: 2031-06-14
- **probability**: median (community table); lower 25% and upper 75% also labelled
- **confidence**: none
- **conditions_hedges**: Question criteria define resolution; devised, tested, and publicly announced are cumulative requirements.
- **source_date**: {"value":"2025-01-05","kind":"capture date, not publication/opening date; “Opened” label has no rendered value in fetched HTML"}
- **predictor**: Metaculus community prediction
- **problems**: Both title and date are in rendered HTML text of the specified capture. No distribution decoding or live forecast substitution.

### Item 11

- **source**: openai
- **locator**: Main text, paragraph beginning “In 2026”
- **found**: yes
- **event**: AI to be capable of making very small discoveries
- **horizon**: In 2026
- **probability**: none
- **confidence**: we expect
- **conditions_hedges**: capable of; very small
- **source_date**: {"value":"November 6, 2025","kind":"publication date displayed; capture 20251107162450"}
- **predictor**: OpenAI (printed Author OpenAI)
- **problems**: Capability forecast, not a claim of realized discoveries or a generic AGI event.

### Item 12

- **source**: openai
- **locator**: Same paragraph, second sentence
- **found**: yes
- **event**: we will have systems that can make more significant discoveries
- **horizon**: In 2028 and beyond
- **probability**: none
- **confidence**: we are pretty confident
- **conditions_hedges**: though we could of course be wrong, this is what our research progress appears to indicate
- **source_date**: {"value":"November 6, 2025","kind":"publication date displayed; capture 20251107162450"}
- **predictor**: OpenAI (printed Author OpenAI)
- **problems**: Retain “and beyond”, comparative significance, and the entire parenthetical qualification.

## Sources inspected

- [simon](https://cse.buffalo.edu/~rapaport/584/S07/02Feb2007Readings.pdf) — HTTP 200; capture none; SHA-256 `252860da138c9851a79f207f748de56f9f0e82414b397d97daa59abcf9a80836`; retrieved 2026-11-05T06:01:25Z.
- [vinge](https://gwern.net/doc/transhumanism/1983-vinge.pdf) — HTTP 200; capture none; SHA-256 `6d2f9a0afec5bf4ca347e78c4326c88799d0e69e274197f669a121aca5c7d8a4`; retrieved 2026-11-05T06:01:35Z.
- [legg09](https://web.archive.org/web/20091213040508/http://www.vetta.org:80/2009/12/tick-tock-tick-tock-bing/) — HTTP 200; capture 20091213040508; SHA-256 `81273d9fc71b9fd915d1045d1f01ff823d345b8e9a9d83d07771b59973d8d1c0`; retrieved 2026-11-05T06:01:43Z.
- [legg10](https://web.archive.org/web/20101214110948/http://www.vetta.org:80/2010/12/goodbye-2010/) — HTTP 200; capture 20101214110948; SHA-256 `e2baf3b7d54789efd9ded633a1da9550f71a19133cb37c07cbee15c11444d17e`; retrieved 2026-11-05T06:02:13Z.
- [legg11](https://web.archive.org/web/20120406082032/http://www.vetta.org:80/2011/12/goodbye-2011-hello-2012/) — HTTP 200; capture 20120406082032; SHA-256 `db9c9eeffa2550adeff6963ecb280932b52fb452a4670527dac19618c0fe06fc`; retrieved 2026-11-05T06:02:24Z.
- [fhi](https://web.archive.org/web/20161224100323/http://www.fhi.ox.ac.uk/reports/2011-1.pdf) — HTTP 200; capture 20161224100323; SHA-256 `7c6679ca2bb66ce8d1e5d1647bdd358d3fa46ab722758d2e85899add27d8ddb9`; retrieved 2026-11-05T06:02:33Z.
- [metaculus](https://web.archive.org/web/20250105212836/https://www.metaculus.com/questions/5121/date-of-artificial-general-intelligence/) — HTTP 200; capture 20250105212836; SHA-256 `c351ff6408ed4224dfa7e60e7080e3b5fb2082be94987bd155ca0597f6a7f338`; retrieved 2026-11-05T06:03:09Z.
- [openai](https://web.archive.org/web/20251107162450/https://openai.com/index/ai-progress-and-recommendations/) — HTTP 200; capture 20251107162450; SHA-256 `1d4ad46cc4c932bb676c2d53babc25ee5c08c7c48df7431ddaa0818b7970cf1f`; retrieved 2026-11-05T06:03:29Z.
- [kurzweil-live](https://www.writingsbyraykurzweil.com/the-law-of-accelerating-returns) — HTTP 200; capture none; SHA-256 `b1235f63983668667c5abade21b45d8084f3487cc19648396665252510f29aac`; retrieved 2026-11-05T06:07:14.5081291Z.
- [kurzweil-cdx](https://web.archive.org/cdx/search/cdx?url=kurzweilai.net/articles/art0134.html&output=json&filter=statuscode:200&collapse=timestamp:6&from=2001&to=2002) — HTTP 200; capture none; SHA-256 `cea170d0e756d1aeedcf365c933af7ff48a602341719a57164f43ee250f96ee9`; retrieved 2026-11-05T06:07:24.2661778Z.
- [bostrom-cdx](https://web.archive.org/cdx/search/cdx?url=nickbostrom.com/superintelligence.html&output=json&filter=statuscode:200&limit=5) — HTTP 200; capture none; SHA-256 `f26c44a9369729415fc6004697111722ebdfac2c11178b324a1c8ca8d2d9c1b6`; retrieved 2026-11-05T06:07:33.6357794Z.
- [kurzweil-2001](https://web.archive.org/web/20010411084019/http://www.kurzweilai.net:80/articles/art0134.html) — HTTP 200; capture 20010804224404; SHA-256 `6059e2b8a0a25e24926127263b943731fa70a7bcb2db80cdb3167b36bdc1a24f`; retrieved 2026-11-05T06:08:14.9006592Z.
- [bostrom-2000](https://web.archive.org/web/20001210012600/http://www.nickbostrom.com:80/superintelligence.html) — HTTP 200; capture 20001210012600; SHA-256 `b3c702914d4d74aca6086846ee7f9388ab60457db6377f3822bce92ee734004e`; retrieved 2026-11-05T06:08:27.5720302Z.
- [brooks-cdx](https://web.archive.org/cdx/search/cdx?url=rodneybrooks.com/my-dated-predictions/&output=json&filter=statuscode:200&from=201801&to=201802&limit=3) — HTTP 200; capture none; SHA-256 `d270357e9ca6f0f7b66ddfe34dc0b457413157d18527fc65b1ba6214dbf173a4`; retrieved 2026-11-05T06:08:37.8299421Z.
- [kurzweil-2001-raw](https://web.archive.org/web/20010411084019id_/http://www.kurzweilai.net:80/articles/art0134.html) — HTTP 302; capture 20010411084019; SHA-256 `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`; retrieved 2026-11-05T06:09:20.4572093Z.
- [ai2027-cdx](https://web.archive.org/cdx/search/cdx?url=ai-2027.com/&output=json&filter=statuscode:200&from=202504&to=202504&limit=3) — HTTP 200; capture none; SHA-256 `33acb1f07bffbc985a8a441c3fd349825837adee585cdbfbbace8de4dbae8ffa`; retrieved 2026-11-05T06:09:29.7274435Z.
- [longbets-cdx](https://web.archive.org/cdx/search/cdx?url=longbets.org/bet/1&output=json&filter=statuscode:200&from=2002&to=2003&limit=5) — HTTP 200; capture none; SHA-256 `e5fc3a60145cda4516898c07b73c56024e83ad1130ad17357c64aa3911b41860`; retrieved 2026-11-05T06:09:39.1223785Z.
- [brooks-2018](https://web.archive.org/web/20180102073550/http://rodneybrooks.com/my-dated-predictions/) — HTTP 200; capture 20180102073550; SHA-256 `176596b02e6ea2d5f4accf58872fee63f5e74f14ccad7b37000df275eeac6590`; retrieved 2026-11-05T06:10:18.4473094Z.
- [ai2027-2025](https://web.archive.org/web/20250403163539/https://ai-2027.com/) — HTTP 200; capture 20250403163539; SHA-256 `8a653823a738906a5445f6f7479289e064cb78476579bf50536587324d9f8caa`; retrieved 2026-11-05T06:10:30.3757820Z.
- [longbets-2002](https://web.archive.org/web/20020607200712/http://www.longbets.org:80/bet/1) — HTTP 200; capture 20020607200712; SHA-256 `9bb9dca24698ef5970a6f7b9690beecad7a79ae398d6d91d31ee721c0fb0556e`; retrieved 2026-11-05T06:11:01.6383378Z.
- [kurzweil-earliest-cdx](https://web.archive.org/cdx/search/cdx?url=kurzweilai.net/articles/art0134.html&output=json&filter=statuscode:200&limit=1) — HTTP 200; capture none; SHA-256 `8e03a01891676d65fa5e3a2d45574f8d2dba7693c3c4548a718931cd56aa2ca3`; retrieved 2026-11-05T06:11:45.0352100Z.
- [kurzweil-april-normal](https://web.archive.org/web/20010411084019/http://www.kurzweilai.net/articles/art0134.html) — HTTP 302; capture 20010411084019; SHA-256 `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`; retrieved 2026-11-05T06:11:55.1436689Z.
- [bostrom-prefix-cdx](https://web.archive.org/cdx/search/cdx?url=nickbostrom.com/superintelligence*&output=json&filter=statuscode:200&to=2000&limit=5) — HTTP 200; capture none; SHA-256 `e9da8e814d05e635d8f1f742f016f29dcab9148c3a2f0f7e30de8e789300527e`; retrieved 2026-11-05T06:12:08.9675016Z.

## Part B: retrieval

Addresses, capture timestamps, HTTP status codes and response-body SHA-256 hashes follow. Indexes locate captures; they do not authenticate unretrieved text. Bounded retrieval failures do not establish absence. Excerpts are at most 50 words each; HTML cell whitespace and PDF line wraps are normalized.

### B1.1

**found; visually reread after Part A commit**

- [vinge](https://gwern.net/doc/transhumanism/1983-vinge.pdf); capture none; HTTP 200; SHA-256 `6d2f9a0afec5bf4ca347e78c4326c88799d0e69e274197f669a121aca5c7d8a4`.

p. 10, middle column, final paragraph, consecutive sentence 1:

> This is a vision most people reserve for the far future, perhaps after another million years of normal evolution.

p. 10, middle column, final paragraph, consecutive sentence 2:

> Surprise—it is a future that will happen as soon as superhuman intelligences are created.

p. 10, middle column, final paragraph, consecutive sentence 3:

> And given the progress in computer and biological sciences, that should be between 20 and 100 years from now.

Full paragraph transcribed as three consecutive excerpts, each under 50 words; display line breaks and end-of-line word splits joined. Neither “computer hardware and software” nor “I feel this is likely” appears anywhere on the one-page scan. It says “the progress”, not “our progress”. The page itself prints 10 OMNI, not the month/year.

### B1.2.2009

**found**

- [legg09](https://web.archive.org/web/20091213040508/http://www.vetta.org:80/2009/12/tick-tock-tick-tock-bing/); capture 20091213040508; HTTP 200; SHA-256 `81273d9fc71b9fd915d1045d1f01ff823d345b8e9a9d83d07771b59973d8d1c0`.

Post heading date:

> December 7th, 2009

Final main-post paragraph, first sentence:

> Right, so my prediction for the last 10 years has been for roughly human level AGI in the year 2025 (though I also predict that sceptics will deny that it’s happened when it does!)

Following sentence:

> This year I’ve tried to come up with something a bit more precise.

The distribution’s subject is roughly human level AGI. Mean/expected value, mode and credibility interval remain this dated version.

### B1.2.2010

**found**

- [legg10](https://web.archive.org/web/20101214110948/http://www.vetta.org:80/2010/12/goodbye-2010/); capture 20101214110948; HTTP 200; SHA-256 `e2baf3b7d54789efd9ded633a1da9550f71a19133cb37c07cbee15c11444d17e`.

Post heading date:

> 10 December, 2010

Human-level AGI paragraph, first sentence:

> My longest running prediction, since 1999, has been the time until roughly human level AGI.

Following sentence (last year is linked to the 2009 post):

> It’s been consistent since then, though last year I decided to clarify things a bit and put down an actual distribution and some parameters.

Same paragraph, later sentence:

> I was toying with the idea of moving the prediction very slightly closer, but decided to play it safe and keep the prediction unmoved at 2028.

Next paragraph, first sentence:

> One thing I screwed up last year was the 90% credibility region.

Next paragraph, final sentences:

> It seems that I got the lower end right, however, as the CDF is about 0.05 at 2018. With 5% at each end, that gives the 90% interval.

“I gave it” reports the 2009 distribution, then the 2010 post reaffirms an unchanged mean. Next paragraph explicitly corrects its upper end to 2045 at CDF 0.95; do not mislabel this as a revision of the mean or silently substitute it into the 2009 record.

### B1.2.2011

**found**

- [legg11](https://web.archive.org/web/20120406082032/http://www.vetta.org:80/2011/12/goodbye-2011-hello-2012/); capture 20120406082032; HTTP 200; SHA-256 `db9c9eeffa2550adeff6963ecb280932b52fb452a4670527dac19618c0fe06fc`.

Post heading date:

> 31 December, 2011

Opening paragraph, first sentence:

> I’ve decided to once again leave my prediction for when human level AGI will arrive unchanged.

Opening paragraph, second sentence:

> That is, I give it a log-normal distribution with a mean of 2028 and a mode of 2025, under the assumption that nothing crazy happens like a nuclear war.

Human level AGI is the distribution’s subject; the following proto-AGI estimate is separate.

### B1.3

**found**

- [fhi](https://web.archive.org/web/20161224100323/http://www.fhi.ox.ac.uk/reports/2011-1.pdf); capture 20161224100323; HTTP 200; SHA-256 `7c6679ca2bb66ce8d1e5d1647bdd358d3fa46ab722758d2e85899add27d8ddb9`.

PDF p. 12, unnumbered questionnaire, definition before question 1:

> Define a human-level machine intelligence to be one that can substitute for humans in virtually all cognitive tasks, including those requiring scientific creativity, common sense, or social skills.

Printed p. 1 / PDF p. 2, question 1:

> Assuming no global catastrophe halts progress, by what year would you assign a 10%/50%/90% chance of the development of human-level machine intelligence?

Same question, next sentence:

> Feel free to answer ‘never’ if you believe such a milestone will never be reached.

Printed p. 1 / PDF p. 2, paragraph before time estimates:

> There were 35 collected surveys, suggesting a response rate of ≈41%.

PDF p. 2, title block:

> (2011)

PDF p. 1, cover citation:

> (2011)

PDF p. 2, opening paragraph, conference-date fragment:

> 16/1 2011

All 13 PDF pages visually inspected across Parts A and B. Poll date, report year and 2016 capture are separate. No day/month publication date found on the report. Reference access date 24 Jan 2011 is not a publication date. Definition appears in the appended survey, not in the brief’s p. 1 excerpt. Medians are conditional on no global catastrophe halting progress.

### B1.4

**found**

- [openai](https://web.archive.org/web/20251107162450/https://openai.com/index/ai-progress-and-recommendations/); capture 20251107162450; HTTP 200; SHA-256 `1d4ad46cc4c932bb676c2d53babc25ee5c08c7c48df7431ddaa0818b7970cf1f`.

Article date above heading:

> November 6, 2025

Author section below article:

> Author OpenAI

Main text, complete paragraph beginning In 2026:

> In 2026, we expect AI to be capable of making very small discoveries. In 2028 and beyond, we are pretty confident we will have systems that can make more significant discoveries (though we could of course be wrong, this is what our research progress appears to indicate).

Both sentences are in one paragraph. Institutional Author label; no individual byline found.

### B1.5

**found; opening date not rendered**

- [metaculus](https://web.archive.org/web/20250105212836/https://www.metaculus.com/questions/5121/date-of-artificial-general-intelligence/); capture 20250105212836; HTTP 200; SHA-256 `c351ff6408ed4224dfa7e60e7080e3b5fb2082be94987bd155ca0597f6a7f338`.

Forecast summary above prediction panel:

> Total Forecasters 1442

Adjacent forecast summary:

> Community Prediction 2031-06-14 (2027-05-10 - 2041-08-31)

Community table column labels:

> lower 25% median upper 75%

Community table row, three displayed dates/times:

> 2027-05-10 08:00 2031-06-14 03:55 2041-08-31 23:46

The supplied date is the displayed Community Prediction and also the community table’s median. The “Opened” label has no rendered value in the fetched HTML. Serialized open_time is 2020-08-23T05:00:00Z; this is metadata, not a displayed date and not a converted distribution. No live forecast read and no numeric distribution converted.

### B2.6

**partial: live and August wording found; January–April date not confirmed**

- [kurzweil-live](https://www.writingsbyraykurzweil.com/the-law-of-accelerating-returns); capture none; HTTP 200; SHA-256 `b1235f63983668667c5abade21b45d8084f3487cc19648396665252510f29aac`.
- [kurzweil-cdx](https://web.archive.org/cdx/search/cdx?url=kurzweilai.net/articles/art0134.html&output=json&filter=statuscode:200&collapse=timestamp:6&from=2001&to=2002); capture none; HTTP 200; SHA-256 `cea170d0e756d1aeedcf365c933af7ff48a602341719a57164f43ee250f96ee9`.
- [kurzweil-earliest-cdx](https://web.archive.org/cdx/search/cdx?url=kurzweilai.net/articles/art0134.html&output=json&filter=statuscode:200&limit=1); capture none; HTTP 200; SHA-256 `8e03a01891676d65fa5e3a2d45574f8d2dba7693c3c4548a718931cd56aa2ca3`.
- [kurzweil-2001](https://web.archive.org/web/20010411084019/http://www.kurzweilai.net:80/articles/art0134.html) → [actual response](https://web.archive.org/web/20010804224404/http://www.kurzweilai.net/articles/art0134.html); capture 20010804224404; HTTP 200; SHA-256 `6059e2b8a0a25e24926127263b943731fa70a7bcb2db80cdb3167b36bdc1a24f`.
- [kurzweil-2001-raw](https://web.archive.org/web/20010411084019id_/http://www.kurzweilai.net:80/articles/art0134.html); capture 20010411084019; HTTP 302; SHA-256 `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`.
- [kurzweil-april-normal](https://web.archive.org/web/20010411084019/http://www.kurzweilai.net/articles/art0134.html); capture 20010411084019; HTTP 302; SHA-256 `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`.

Live essay masthead, essay date field:

> date: January 2001

Live page posting timestamp above essay:

> January 1, 2025

Live essay, computational-capacity discussion:

> In line with my earlier predictions, supercomputers will achieve one human brain capacity by 2010, and personal computers will do so by around 2020.

Actual August 2001 replay, same capacity discussion:

> In line with my earlier predictions, supercomputers will achieve one human brain capacity by 2010, and personal computers will do so by around 2020.

August replay, essay heading:

> The Singularity is Near

August replay, heading subtitle:

> A Book Précis by Raymond Kurzweil

August replay, essay footer:

> Copyright ( C ) Raymond Kurzweil 2001

Earliest located exact-URL index entry: 20010411084019. The Jan–Apr query found that April entry only. It redirected to 20010804224404; raw replay with :80 and ordinary replay without :80 both returned HTTP 302 to August, with empty response bodies. August contains the same requested capacity sentence, but the heading is a differently titled précis. No printed January 2001 or 7 March 2001 date found in that August essay header/footer; comments’ dates are not essay publication dates. The live essay’s January 2001 field is distinct from its January 1, 2025 site posting. These bounded checks do not settle the precise original publication day or establish that the early differently titled page is the same version throughout.

### B2.7

**found in earliest located capture**

- [bostrom-cdx](https://web.archive.org/cdx/search/cdx?url=nickbostrom.com/superintelligence.html&output=json&filter=statuscode:200&limit=5); capture none; HTTP 200; SHA-256 `f26c44a9369729415fc6004697111722ebdfac2c11178b324a1c8ca8d2d9c1b6`.
- [bostrom-prefix-cdx](https://web.archive.org/cdx/search/cdx?url=nickbostrom.com/superintelligence*&output=json&filter=statuscode:200&to=2000&limit=5); capture none; HTTP 200; SHA-256 `e9da8e814d05e635d8f1f742f016f29dcab9148c3a2f0f7e30de8e789300527e`.
- [bostrom-2000](https://web.archive.org/web/20001210012600/http://www.nickbostrom.com:80/superintelligence.html); capture 20001210012600; HTTP 200; SHA-256 `b3c702914d4d74aca6086846ee7f9388ab60457db6377f3822bce92ee734004e`.

Early replay, computational-capacity discussion:

> If we need 100 Tops to simulate the human brain then the required computational power will be reached sometime between 2004 and 2008, depending on whether we assume a doubling time of 12 or 18 months.

Early replay, title date:

> (1997)

Early replay, notice below title:

> [Revised 25 October, 1998, and provided with a postscript]

Next notice:

> [A second postscript added 28 August, 2000]

Earliest capture located for nickbostrom.com/superintelligence.html: 20001210012600, original http://www.nickbostrom.com:80/superintelligence.html. A bounded prefix query through 2000 found only this URL/capture. This is a 2000 attestation of a revised page labelled 1997, not a recovered 1997 copy. Conditional hardware capacity is not sufficient evidence for a superintelligence-arrival deadline.

### B2.8

**found in earliest located January–February 2018 capture**

- [brooks-cdx](https://web.archive.org/cdx/search/cdx?url=rodneybrooks.com/my-dated-predictions/&output=json&filter=statuscode:200&from=201801&to=201802&limit=3); capture none; HTTP 200; SHA-256 `d270357e9ca6f0f7b66ddfe34dc0b457413157d18527fc65b1ba6214dbf173a4`.
- [brooks-2018](https://web.archive.org/web/20180102073550/http://rodneybrooks.com/my-dated-predictions/); capture 20180102073550; HTTP 200; SHA-256 `176596b02e6ea2d5f4accf58872fee63f5e74f14ccad7b37000df275eeac6590`.

Article heading date:

> January 1, 2018

AI table, next-big-thing row, prediction and date cells:

> Emergence of the generally agreed upon "next big thing" in AI beyond deep learning. NET 2023 BY 2027

AI table, mouse row, prediction and date cells:

> An AI system with an ongoing existence (no day is the repeat of another day as it currently is for all AI systems) at the level of a mouse. NET 2030

AI table, dog row, prediction and date cells:

> A robot that seems as intelligent, as attentive, and as faithful, as a dog. NET 2048

Introductory date conventions:

> NET some date, meaning “No Earlier Than” that date.

Introductory date conventions:

> BY some date, meaning “By” that date.

Earliest located Jan–Feb capture: 20180102073550. Prediction/date table cells are joined in reading order, whitespace normalized. The mouse line says AI system with ongoing existence; it does not say a robot with awareness. NET is a lower bound, not a deadline.

### B2.9

**found in earliest located April 2025 capture**

- [ai2027-cdx](https://web.archive.org/cdx/search/cdx?url=ai-2027.com/&output=json&filter=statuscode:200&from=202504&to=202504&limit=3); capture none; HTTP 200; SHA-256 `33acb1f07bffbc985a8a441c3fd349825837adee585cdbfbbace8de4dbae8ffa`.
- [ai2027-2025](https://web.archive.org/web/20250403163539/https://ai-2027.com/); capture 20250403163539; HTTP 200; SHA-256 `8a653823a738906a5445f6f7479289e064cb78476579bf50536587324d9f8caa`.

Opening date:

> April 3rd 2025

Opening paragraph:

> We predict that the impact of superhuman AI over the next decade will be enormous, exceeding that of the Industrial Revolution.

Following paragraph, opening sentence:

> We wrote a scenario that represents our best guess about what that might look like.

Earliest located April capture: 20250403163539. Opening lists Daniel Kokotajlo, Scott Alexander, Thomas Larsen, Eli Lifland, Romeo Dean. This is an attestation of the opening wording, not verification of scenario outcomes.

### B2.10

**found in bounded further 2002–2003 retrieval**

- [longbets-cdx](https://web.archive.org/cdx/search/cdx?url=longbets.org/bet/1&output=json&filter=statuscode:200&from=2002&to=2003&limit=5); capture none; HTTP 200; SHA-256 `e5fc3a60145cda4516898c07b73c56024e83ad1130ad17357c64aa3911b41860`.
- [longbets-2002](https://web.archive.org/web/20020607200712/http://www.longbets.org:80/bet/1); capture 20020607200712; HTTP 200; SHA-256 `9bb9dca24698ef5970a6f7b9690beecad7a79ae398d6d91d31ee721c0fb0556e`.

Bet 1 statement at top of page:

> A computer - or "machine intelligence" - will pass the Turing Test by 2029.

Parties table, initiator:

> Mitchell Kapor (mkapor) initiator

Parties table, responder:

> Ray Kurzweil (rkurzweil) responder

Parties table, stakes:

> Stakes $20,000 ($10,000 each)

Parties table, bet span:

> 02002 - 02029 (27 years)

Queried the brief’s earlier /bet/1 route for 2002–2003, then read capture 20020607200712 successfully. Spaces between HTML cells normalized. It also links Detailed Terms, which was not followed; no claim here that terms were unchanged. Statement, parties and stakes are contemporaneously attested in the 2002 capture. No outcome judgement.

Optional B3.11 was not attempted.

## Comparison

Compared only with cross-family-verdicts-2026-11-05.json. Descriptions of pack fields refer to that file’s held answers, not an independently inspected current pack.json.

The twelve Part C records only; not the ten Part B retrieval requests. Cannot check is a mutually exclusive record status. Unconfirmed date metadata and the partial Kurzweil retrieval remain explicit even where core passages are checkable.

| Item / record                                      | Status   | Comparison                                                                                                                                                                                                                                                                                                                                                                                                                               |
| -------------------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1 `pr-a-simon-newell-1958-theorem`                 | minor    | Event and relative horizon agree. The common introduction says “I am willing to make the following predictions” and grounds them in developments/research speed; pack confidence/conditions are none. Preserve this as contextual basis, not a numerical probability or hard logical condition. Source issue is January–February 1958; the address is separately dated November 14, 1957.                                                |
| 2 `pr-a-simon-newell-1958-music`                   | minor    | Same introductory confidence/context and date precision as item 1. Event retains critical acceptance and considerable aesthetic value.                                                                                                                                                                                                                                                                                                   |
| 3 `pr-a-simon-newell-1958-psychology`              | minor    | Same introductory confidence/context and date precision as item 1. The qualitative-statements alternative crosses pp. 7–8 and is present.                                                                                                                                                                                                                                                                                                |
| 4 `pr-b-vinge-1983-twenty-to-hundred-years`        | minor    | Horizon, predictor and “should be” agree. The scan says “given the progress”, not the pack’s “our progress”; literal found=yes needs that correction. The brief labels its composite a paraphrase: its meaning is supported, despite the literal mismatch. The isolated p. 10 scan does not print the supplied January 1983 issue date.                                                                                                  |
| 5 `pr-b-vinge-1983-next-twenty-years`              | agree    | Same next-20-years passage. Blind “will change” describes the asserted event; there is no separate verbal-confidence marker to add. Blind “So far” is context for the prior-state sentence, not an omitted condition on the forecast. January 1983 issue date is supplied, not visible on this scan.                                                                                                                                     |
| 6 `pr-e-legg-2009-mode-2025`                       | minor    | Mode, expectation and 90% interval agree. Keep “roughly human level AGI” in event scope. Blind probability contains the numeric credibility region; pack additionally uses mode/expected value as statistical labels, not numerical probability levels. Blind confidence “my current belief distribution” is a belief-description, not an additional confidence strength. Preserve the 2009 interval even though 2010 corrects it.       |
| 7 `pr-e-legg-2010-log-normal`                      | minor    | The mean/mode and post date agree. “I gave it” refers to last year’s estimate and the paragraph reaffirms it unchanged in 2010; clarify estimate versus posting/reaffirmation date. “roughly” is part of the subject. Blind probability=none meant no numerical probability in this sentence; mean/mode are retained as distribution statistics.                                                                                         |
| 8 `pr-e-legg-2011-log-normal`                      | agree    | Human-level AGI, log-normal mean/mode, date and nuclear-war assumption agree. Blind probability=none means no numerical probability in the sentence; pack mean/mode are statistical labels and the same associations are retained. “That is,” precedes the supplied fragment.                                                                                                                                                            |
| 9 `pr-c-fhi-2011-hlmi`                             | material | Pack conditions_hedges=none omits “Assuming no global catastrophe halts progress”. This changes the elicited proposition. Preserve the appended survey definition, medians of individual threshold estimates, 35 collected surveys/≈41% response, never-answer option, report year versus poll date. The three supplied threshold figures are confirmed.                                                                                 |
| 10 `pr-d-metaculus-5121-capture-2025-01-05`        | minor    | Title, displayed community date and capture date agree. The dated capture also explicitly labels the community table’s middle value “median”, and shows lower 25%/upper 75% plus 1,442 forecasters. Blind uses those statistical labels; pack probability=none is not an incorrect numerical probability. Do not imply a mere unlabelled date, derive dates from distributions, or use serialized opening metadata as a displayed field. |
| 11 `pr-f-openai-2025-very-small-discoveries`       | agree    | Event, 2026 horizon, “we expect”, institutional author and November 6, 2025 publication date agree. Blind capable-of/very-small qualifications are already inside the pack event.                                                                                                                                                                                                                                                        |
| 12 `pr-f-openai-2025-more-significant-discoveries` | material | Pack conditions_hedges=none omits the same sentence’s explicit “though we could of course be wrong, this is what our research progress appears to indicate”. Preserve that qualification along with “pretty confident” and “In 2028 and beyond”.                                                                                                                                                                                         |

The exact held passages are inspectable for all twelve records, apart from the explicitly identified Vinge the/our mismatch. The Vinge issue date is supplied rather than printed on this scan. Kurzweil’s precise original publication day remains unconfirmed in Part B. These limits do not establish absence.

## Checks and open points

- part_a_format: passed before blind commit
- first_privacy: passed: 2312 indexed files, before blind push
- final_format: passed on the two task-owned files; repeated after final report metadata
- editorial_tests: passed outside sandbox: 10 suites, 50 tests. Initial sandbox run had module-cache load failures, not failed assertions.
- final_privacy: passed: pnpm check:privacy on a temporary index containing the two task-owned reports; full-index baseline also passed for 2312 files before first push. Repeated after this check summary was saved.
- frozen_answers: exact Part A equality with blind commit verified; compact JSON projection SHA-256 d36eca8a1327a57c1119e737f17720baf7eadef7f514d4c187ead2fea407bc49
- retrieval_consistency: 12 comparison items; all Part B source references have response status and SHA-256; all excerpts at most 50 words; no signed query strings
- review_generation: No review pack generated or overwritten; editorial suites check existing generators and historical fixtures.
- diff: git diff --check passed; only two authorized reports changed

- Check whether candidate records preserve the FHI catastrophe assumption and OpenAI 2028 parenthetical: the held verdict answers omit them. Any candidate amendment needs a separately authorized task.
- Correct Vinge’s the/our fragment; keep its scan’s date limitation.
- Decisions 7a/11c: Kurzweil exact original publication day is not settled by the inspected copies; Bostrom 2000 capture, Brooks 2018 capture, AI 2027 April 2025 capture and Long Bet June 2002 capture now provide dated attestations.

Blind answers are preserved in commit `0848fc72350690fe1794999665558f086a31cf25` and unchanged in Part A here. Only these two reports were edited. No pack amendments, admission, PR, merge or outcome assessment.
