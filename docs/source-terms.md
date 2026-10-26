# Source terms check

Dated 2026-10-12. Pre-launch check decided in the [roadmap](roadmap.md) ("Source
terms (decided 2026-10-10)"). This is a plain reading of published terms, not legal
advice. No data records were changed; the changes below are proposals.

## What was checked

Selekoa quotes short passages under the editorial policy: at most 50 words per quote,
at most 400 words per source document, and about 10% of a document under 2,000 words
(validation enforces both). `LICENSING.md` already excludes quoted passages from
Selekoa's CC BY 4.0 licence. The question here is narrower: do the terms of the
publishers we quote most forbid or condition that practice?

Quoted volume was counted from `data/evidence.json` and `data/sources.json` on this
branch: quote evidence only, a passage quoted for several claims counted once (as the
validator does), grouped by the host of the source's evidence URL and then by the
party whose terms apply. Counts are a snapshot for this check; they are not maintained.

All pages were retrieved on 2026-10-12 by direct HTTP or a fetch tool. Several
publishers block automated retrieval; those are marked "not retrieved" and need a
manual read in a browser. Wording marked † was read through a fetch tool that
summarises pages, so the quote should be rechecked against the live page before it is
relied on.

## Summary

| #   | Terms owner (hosts)                                                | Quotes | Words | Sources | Verdict                                          |
| --- | ------------------------------------------------------------------ | -----: | ----: | ------: | ------------------------------------------------ |
| 1   | Anthropic (anthropic.com, www-cdn.anthropic.com, cdn.sanity.io)    |    106 | 2,830 |      22 | OK for short attributed quotation                |
| 2   | LessWrong (lesswrong.com; MIRI terms)                              |     86 | 2,589 |      42 | OK for short attributed quotation                |
| 3   | SL4 archive (sl4.org; MIRI terms)                                  |     59 | 1,677 |      47 | OK with conditions                               |
| 4   | Extropians archive (extropians.weidai.com)                         |     64 | 1,566 |      51 | Unclear                                          |
| 5   | European Union (ec.europa.eu, digital-strategy, eur-lex.europa.eu) |     78 | 1,521 |      15 | OK with conditions (CC BY 4.0)                   |
| 6   | OpenAI (openai.com, cdn.openai.com)                                |     55 | 1,136 |      19 | Unclear (terms not retrieved)                    |
| 7   | Google DeepMind (deepmind.google, storage.googleapis.com)          |     36 | 1,048 |       7 | OK for short attributed quotation                |
| 8   | MIRI (intelligence.org)                                            |     34 | 1,038 |       7 | OK for short attributed quotation                |
| 9   | Meta (ai.meta.com, incl. one archived copy)                        |     19 |   555 |       3 | Unclear (terms not retrieved)                    |
| 10  | Microsoft (cdn-dynmedia-1.microsoft.com)                           |     20 |   527 |       2 | Restrictive on paper; short quotation defensible |
| 11  | California Legislature (leginfo.legislature.ca.gov)                |     29 |   508 |       8 | OK (public domain)                               |
| 12  | TIME (time.com)                                                    |     17 |   505 |       2 | Restrictive on paper; trim proposed              |
| 13  | Alignment Forum (alignmentforum.org)                               |      8 |   264 |       5 | OK for short attributed quotation                |
| 14  | Arbital via GreaterWrong viewer (arbital.greaterwrong.com)         |      8 |   263 |       5 | Unclear                                          |
| 15  | NASA Technical Reports Server (ntrs.nasa.gov)                      |      7 |   209 |       1 | OK (public use permitted)                        |

Whole dataset at the time of counting: 766 distinct quotes, 19,530 quoted words, 303
quoted sources. The first four rows hold 43% of quoted words. By first-named author,
Eliezer Yudkowsky accounts for 6,208 quoted words (32%) across LessWrong, SL4,
Extropians, MIRI, TIME and Arbital sources. Every document stays within its own limit;
the concentration is across documents, which the policy does not cap.

"Restrictive on paper" means the site terms forbid copying in general words but do not
address quotation for commentary. Selekoa's practice then rests on statutory
exceptions (fair use in the US, the quotation exception in the EU and UK), not on
permission. That is the ordinary position for most sources here, so it is not a reason
to remove them; it is a reason to keep quotes short, attributed and analytical, and to
answer takedown requests promptly.

## Per-source notes

### 1. Anthropic

- Terms: Consumer Terms, <https://www.anthropic.com/legal/consumer-terms>. No separate
  website terms page was found; <https://www.anthropic.com/legal/website-terms-of-use>
  returns 404. The Consumer Terms define the Services to include "associated apps,
  software, and websites".
- Wording: "We and our Providers retain all of our respective rights, title, and
  interest, including intellectual property rights, in and to the Services." Section 3
  forbids users "To crawl, scrape, or otherwise harvest data or information from our
  Services other than as permitted under these Terms." Section 12 forbids use of
  Anthropic's name, logos or trademarks without written permission.
- Licence: none for site documents. Quotation: not addressed.
- Verdict: OK for short attributed quotation. Selekoa uses the name only to identify
  the source, which is not trademark use.
- Limits: no source above 90% of its limit. The largest single host is
  www-cdn.anthropic.com (Responsible Scaling Policy PDFs, 48 quotes, 1,361 words across
  5 documents, each 2–4% of the document).

### 2. LessWrong

- Terms: "Lesswrong.com Privacy Policy and Terms of Use", linked from the LessWrong FAQ
  ("What is LessWrong's Privacy Policy and Terms of Use?"):
  <https://intelligence.org/files/PrivacyandTerms-Lesswrong.com.pdf>. PDF created
  2015-04-01. The FAQ says MIRI "is the relevant legal party". `/termsOfUse` returns 404.
- Wording: "Except as otherwise provided herein, you own all rights in and to your
  User-Generated Content." Authors grant MIRI "a non-exclusive, irrevocable, worldwide,
  and perpetual license to use your User-Generated Content for the normal and intended
  purposes of the Website." Under Acceptable Uses, users are "explicitly prohibited
  from: … Using a spider, scraper, or other automated technology to access the
  Website".
- Licence: none. No Creative Commons licence for posts was found; a 2012 community
  proposal to adopt one is a discussion, not a policy. Copyright stays with each author.
- Quotation: not addressed. Takedowns go to MIRI by DMCA notice.
- Verdict: OK for short attributed quotation. Attribution and a link to the post are
  already in every source record.
- Automated access: the 2015 terms forbid scrapers, but the current `robots.txt`
  (retrieved 2026-10-12) points AI agents to a Markdown version of the site and sets a
  3-second crawl delay. The written terms and the site's practice differ. Selekoa
  retrieves single pages for evidence checks, not bulk crawls; keep it that way.
- Limits: `source-agi-ruin-2022` is at 399 of 400 words (5.7% of the post) — no room
  for further quotes. `source-lw-2023-gpts-are-predictors-not-imitators` is at 98 of 99.

### 3. SL4 mailing-list archive

- Terms: "Sl4.org Privacy Policy and Terms of Use", linked from <http://sl4.org/> as
  "Privacy & Terms (NEW 2015-04-09)":
  <http://intelligence.org/files/PrivacyandTerms-Sl4.org.pdf>. Same MIRI template as
  LessWrong.
- Wording: MIRI "reserves the right to remove any content on the Website at its sole
  discretion"; copyright complaints go to MIRI by DMCA notice; the same "spider,
  scraper, or other automated technology" prohibition. The home page says the list "is
  owned and moderated by Eliezer Yudkowsky in his capacity as a private individual".
- Licence: none. The terms say nothing about who owns posts; by default each poster
  holds copyright in their own message.
- Verdict: OK with conditions. Each quote must stay attributed to the poster (not to
  the list), dated and linked to the archived message, as the records already do.
- Limits: messages are short, so the 10% rule binds. 12 of 47 sources are at or above
  90% of their limit, 6 of them at exactly 100%:
  `source-sl4-2005-01-02-yudkowsky-0501-10512` (10/10),
  `source-sl4-2008-02-11-yudkowsky-0802-17621` (14/14),
  `source-sl4-2000-08-21-yudkowsky-0008-0046` (33/33),
  `source-sl4-2001-04-06-yudkowsky-0104-0956` (11/11),
  `source-sl4-2000-07-20-yudkowsky-0007-0023` (35/35),
  `source-sl4-2000-09-16-yudkowsky-0009-0086` (18/18); also -0507-11765 (24/25),
  -0206-4208 (17/18), -0104-1166 (10/11), -0108-2031 (32/35), -0711-17248 (14/15) and
  `source-sl4-2000-07-07-atkins` (37/40). A one-sentence quote from a 100-word message
  is proportionally large even when it is short.

### 4. Extropians mailing-list archive

- Terms: none found. <http://extropians.weidai.com/> is a bare directory listing of
  quarterly folders (1996–2002); no notice, terms or contact. `robots.txt` is not
  served.
- Licence: none. Each poster holds copyright in their own message.
- List norms: search results surfaced 1996 list posts describing the early list as
  private, with forwarding requiring the poster's permission, and debating whether a
  public archive needed contributors' consent. These were not read in full (retrieval
  failed) and are leads, not findings. If they hold, some posters may not have expected
  their messages to be republished.
- Verdict: unclear. Short attributed quotation for commentary is the same practice as
  for SL4, but there is no host terms page, no takedown route other than the
  maintainer, and the authors are mostly living private individuals.
- Limits: 11 of 51 sources are at or above 90% of their limit, 6 at 100%:
  `source-extropians-1996-08-10-burkhead` (29/29),
  `source-extropians-1996-09-04-bostrom` (44/44),
  `source-extropians-1996-12-31-yudkowsky-5142` (29/29),
  `source-extropians-1999-08-04-yudkowsky-1587` (13/13),
  `source-extropians-1999-08-04-yudkowsky-1591` (20/20) and -1589 (13/13); also
  `source-extropians-1998-09-24-hanson` (20/21), -1996-12-08-yudkowsky-3761 (30/32),
  -1997-09-26-yudkowsky-4420 (39/40), -1996-11-16-yudkowsky-3042 (17/18) and
  -1999-04-08-yudkowsky-0310 (28/29).

### 5. European Union

- Terms: Commission legal notice, <https://commission.europa.eu/legal-notice_en>.
- Wording: "Unless otherwise indicated (e.g. in individual copyright notices), content
  owned by the EU on this website is licensed under the Creative Commons Attribution
  4.0 International (CC BY 4.0) licence. This means that reuse is allowed, provided
  appropriate credit is given and changes are indicated." The policy implements the
  Commission Decision of 12 December 2011 on the reuse of Commission documents
  (2011/833/EU).
- EUR-Lex: the English legal notice
  (<https://eur-lex.europa.eu/content/legal-notice/legal-notice.html>) returned a
  browser challenge; not retrieved. Search results for its other language versions say
  documents on EUR-Lex may be reused unless stated otherwise, and only the Official
  Journal is authentic. Recheck the English page by hand.
- Verdict: OK with conditions: credit the EU, state that quotes are excerpts, and link
  the CC BY 4.0 licence. Source records name the EU but carry no licence link.
- Limits: `source-eu-gpai-guidelines-2025` 390/400; `source-eu-ai-act-2024` 374/400
  (0.4% of the Act, so the 400-word cap, not proportion, is what binds).

### 6. OpenAI

- Terms: <https://openai.com/policies/terms-of-use/> and the en-GB variants returned
  403 to automated retrieval and to the fetch tool. Not retrieved.
- Verdict: unclear until read by hand. Search summaries describe the Terms of Use as
  covering ChatGPT and other services for individuals, with a ban on automated
  extraction; nothing found addresses quotation from published policy documents.
- Limits: `source-fgf-release` 20/20 (a 204-word release); others well below.

### 7. Google DeepMind

- Terms: deepmind.google links to the Google Terms of Service,
  <https://policies.google.com/terms>, "Effective July 30, 2026". The framework PDFs are
  served from storage.googleapis.com.
- Wording: "You may use Google's content as allowed by these terms and any
  service-specific additional terms, but we retain any intellectual property rights
  that we have in our content. Don't remove, obscure, or alter any of our branding,
  logos, or legal notices." The definitions describe copyright as "subject to certain
  limitations and exceptions (such as "fair use" and "fair dealing")".
- Licence: none. Verdict: OK for short attributed quotation; the terms themselves name
  fair use and fair dealing.
- Limits: none near the limit; the highest is Frontier Safety Framework 3.0 at 298/400.

### 8. MIRI (intelligence.org)

- Terms: "Privacy and Terms", <https://intelligence.org/privacy-and-terms/>: effective
  March 6, 2015, last updated March 5, 2025 †. Direct HTTP returned 403.
- Wording †: it covers intelligence.org only; copyright claims go to
  MIRI's copyright address; users agree not to "use automated tools to access the
  Website". No content licence and nothing on reuse.
- Verdict: OK for short attributed quotation.
- Rights note: `source-aipnfgr-miri-reprint` is MIRI's reprint of a chapter in _Global
  Catastrophic Risks_ (Oxford University Press, 2008); the chapter's rights may sit with
  the publisher, not MIRI. It is at 400 of 400 words (2.1% of the chapter). No further
  quotes.

### 9. Meta

- Terms: ai.meta.com and meta.com/legal returned HTTP 400 to automated retrieval. Not
  retrieved. Search found only Meta's general terms on user content, which do not
  concern Meta's published policy documents.
- Verdict: unclear until read by hand. Three sources; none near the limit.

### 10. Microsoft

- Terms: Microsoft Terms of Use, <https://www.microsoft.com/en-us/legal/terms-of-use>,
  "Last Updated: February 7, 2022".
- Wording: "Unless otherwise specified, the Services are for your personal and
  non-commercial use. You may not modify, copy, distribute, transmit, display, perform,
  reproduce, publish, license, create derivative works from, transfer, or sell any
  information … obtained from the Services." For documents such as white papers,
  permission is granted only if the copyright notice appears in all copies and use is
  "for informational and non-commercial or personal use only".
- Verdict: restrictive on paper. The document permission does not fit Selekoa (it
  requires the full copyright notice and excludes posting). Short attributed
  quotation for commentary relies on fair use, not on these terms. Keep it.
- Limits: two framework documents, 527 words in total, neither near the limit.

### 11. California Legislature

- Basis: Government Code section 10248.5, added by AB 884 (2016), read from the
  enrolled bill text on leginfo.ca.gov: information the Legislative Counsel makes
  available under section 10248 "is within the public domain and the State of
  California retains no copyright or other proprietary interest in that information."
  The current leginfo site returned 403 to automated retrieval.
- Verdict: OK. No condition beyond accurate citation.
- Limits: `source-ca-sb53-chaptered` is at 393/400 under Selekoa's own policy; the
  policy cap is self-imposed here, not a rights requirement.

### 12. TIME

- Terms: TIME Terms of Service, <https://legal.time.com/terms-of-service/>, effective
  July 1, 2026 †. time.com/terms-of-use returns 404 or 406.
- Wording †: "You agree not to copy, reproduce, publish, transmit, distribute, perform,
  sell, create derivative works of" the content; a licence "solely for your personal
  use"; no access "through scraping, spidering, crawling"; no use for "training a
  machine learning or artificial intelligence (AI) system". Permissions go to TIME's
  syndication address.
- Verdict: restrictive on paper. Short quotation for commentary relies on fair use.
- Limits: `source-time-2023-shut-it-all-down` has 12 quotes and 388 words from a
  2,282-word article, about 17% of it. It passes the validator because the 10% rule
  applies only under 2,000 words, but it is the most exposed source in the dataset:
  a commercial publisher, restrictive terms, and a large share of a short piece.
  Proposed: trim to about 230 words (10%) by paraphrasing the quotes that do not need
  exact wording.

### 13. Alignment Forum

- Terms: no terms page found; `/termsOfUse` returns 404. The FAQ
  (<https://www.alignmentforum.org/faq>) says † the forum is run by the LessWrong team
  and that when a post is promoted "you will continue to have full ownership of the
  content". It names no legal party; MIRI's LessWrong terms most likely apply, since
  posts are cross-posted to LessWrong.
- Verdict: OK for short attributed quotation; authors hold copyright.
- Limits: none near the limit.

### 14. Arbital (GreaterWrong viewer)

- Terms: the GreaterWrong about page (<https://www.greaterwrong.com/about>) describes a
  viewer for LessWrong, the EA Forum and Arbital and states no terms or licence.
  arbital.greaterwrong.com reset the connection. Arbital's own terms were not found.
- Verdict: unclear. Author copyright applies by default; the viewer adds nothing.
- Limits: `source-arbital-programmer-deception` 44/44 (a 440-word page).

### 15. NASA Technical Reports Server

- Record: the NTRS citation API for document 19940022856 (Vinge, "The Coming
  Technological Singularity", 1993) gives a copyright determination of
  `GOV_PUBLIC_USE_PERMITTED` and distribution `PUBLIC`. NTRS points readers to NASA's
  copyright notice and terms of use for its technical information.
- Verdict: OK. The essay's author held copyright, but the record states public use is
  permitted.
- Limits: 209 of 400 words.

## Cross-cutting findings

- **Automated access clauses.** MIRI's terms for LessWrong, SL4 and intelligence.org,
  Anthropic's Consumer Terms and TIME's terms forbid scraping or automated access. They
  concern how pages are fetched, not whether short quotes may be published. Selekoa's
  machine-first workflow fetches single pages for evidence checks. A public statement
  of that practice (single-page retrieval, respect for `robots.txt`, no bulk crawls)
  would answer the obvious objection.
- **No source forbids quotation outright.** None of the terms read addresses
  quotation for commentary. The editorial policy's override ("publisher terms that
  forbid quotation") is not triggered by any source checked.
- **Selekoa's licence.** `LICENSING.md` already excludes quoted passages from CC BY 4.0.
  That exclusion matters most for Microsoft and TIME, whose terms bar commercial reuse:
  a downstream user of a Selekoa release cannot take the quotes under Selekoa's licence.

## What to do before launch

Proposals; none is applied here.

1. **Trim the TIME source.** Reduce `source-time-2023-shut-it-all-down` from 388 to
   about 230 quoted words by converting quotes to paraphrase where exact wording is not
   needed. A data change: needs a separate authorised task.
2. **Add licence links for CC sources.** For EU sources (CC BY 4.0) and the other
   CC/OGL sources listed in the launch readiness note, add the licence URL to the
   source record's reuse field and note that quotes are excerpts. Schema or data
   change: separate task.
3. **Freeze the at-limit sources.** Treat sources at 100% of their limit (listed above,
   mostly SL4 and Extropians messages, plus `source-agi-ruin-2022`,
   `source-aipnfgr-miri-reprint`) as closed to further quotation. The validator already
   blocks it; this is a note for researchers adding claims.
4. **Read by hand** the terms not retrieved: OpenAI, Meta, the English EUR-Lex legal
   notice and the full text of TIME's terms (and the † wording for MIRI and the
   Alignment Forum).
5. **Mailing-list authors.** Decide whether the takedown and corrections contact
   should mention mailing-list posters explicitly, since the Extropians archive has no
   host to complain to.
6. **State the retrieval practice** on the About & method page: single-page retrieval
   for evidence checks, no bulk crawling. Interface text: separate task.

## Decisions for the maintainer

- Whether to trim the TIME source (item 1) before launch.
- Whether the Extropians "unclear" verdict is acceptable for launch with a takedown
  contact, or whether the most proportionally quoted short messages (those at 100% of
  their limit) should be reduced to paraphrase.
- Whether the one-author concentration (32% of quoted words) needs any action beyond
  the per-document limits.

## Applied (2026-10-13)

The maintainer approved four pre-launch trims on 2026-10-13. They shorten quotes
instead of converting them to paraphrase (item 1 above proposed paraphrase). Each
shortened quote keeps only words of the earlier quote, unaltered and in order, joined
by the record's existing ellipsis mark (“…” in Yudkowsky-collection records, “[...]”
in the others). No claim or quote record was removed; apart from the word counts in notes (below), no other field changed. Shared
passages were trimmed identically, so the validator still counts them once.

| Source                                        | Quoted words, before → after | Limit |
| --------------------------------------------- | ---------------------------: | ----: |
| `source-time-2023-shut-it-all-down`           |                    388 → 230 |   400 |
| `source-aipnfgr-miri-reprint`                 |                    400 → 302 |   400 |
| `source-agi-ruin-2022`                        |                    399 → 351 |   400 |
| `source-sl4-2005-01-02-yudkowsky-0501-10512`  |                       10 → 7 |    10 |
| `source-sl4-2008-02-11-yudkowsky-0802-17621`  |                      14 → 11 |    14 |
| `source-sl4-2000-08-21-yudkowsky-0008-0046`   |                      33 → 20 |    33 |
| `source-sl4-2001-04-06-yudkowsky-0104-0956`   |                       11 → 8 |    11 |
| `source-sl4-2000-07-20-yudkowsky-0007-0023`   |                      35 → 20 |    35 |
| `source-sl4-2000-09-16-yudkowsky-0009-0086`   |                      18 → 11 |    18 |
| `source-sl4-2005-07-25-yudkowsky-0507-11765`  |                      24 → 18 |    25 |
| `source-sl4-2002-06-23-yudkowsky-0206-4208`   |                      17 → 13 |    18 |
| `source-sl4-2001-08-01-yudkowsky-0108-2031`   |                      32 → 23 |    35 |
| `source-sl4-2007-11-24-yudkowsky-0711-17248`  |                       14 → 8 |    15 |
| `source-sl4-2000-07-07-atkins`                |                      37 → 25 |    40 |
| `source-extropians-1996-08-10-burkhead`       |                      29 → 19 |    29 |
| `source-extropians-1996-09-04-bostrom`        |                      44 → 31 |    44 |
| `source-extropians-1996-12-31-yudkowsky-5142` |                      29 → 24 |    29 |
| `source-extropians-1999-08-04-yudkowsky-1591` |                      20 → 14 |    20 |
| `source-extropians-1996-12-08-yudkowsky-3761` |                      30 → 18 |    32 |
| `source-extropians-1997-09-26-yudkowsky-4420` |                      39 → 27 |    40 |
| `source-extropians-1996-11-16-yudkowsky-3042` |                      17 → 12 |    18 |
| `source-extropians-1999-04-08-yudkowsky-0310` |                      28 → 19 |    29 |

Word counts follow the validator: whitespace-separated words, an ellipsis mark counts
as one word, and a passage quoted for several claims counts once.

- **TIME.** Now 10.1% of the 2,282-word article. The two near-identical “first try”
  quotes now share one passage; the rest keep the clause that carries each claim.
- **AIPNFGR and AGI Ruin.** Cut to the clauses each claim states. AGI Ruin stops at
  351, not about 330: the remaining quotes carry named elements of their claims
  (strategic awareness, loss functions, the written public plan), and cutting further
  would drop support.
- **SL4 and Extropians.** Most listed messages fell to 53–79% of their limit rather
  than half: below that, the quote would lose the subject or the reason its claim
  states. Not trimmed: `source-extropians-1999-08-04-yudkowsky-1587` (13/13) and
  -1589 (13/13), where any cut drops the reason (“emotions that won't exist in an
  AI”) or leaves a misleading fragment; `source-sl4-2001-04-19-yudkowsky-0104-1166`
  (10/11) and `source-extropians-1998-09-24-hanson` (20/21), where a cut drops the
  claim's subject or negation. `source-extropians-1996-12-31-yudkowsky-5142` stays at
  83% because both its claims need the full comparison and “could lie”.
- **Verification.** A test (`src/domain/quote-trims.test.ts`) checks that each
  shortened quote is cut from its earlier text and that nothing else in the record
  changed; the earlier rows are kept in `review/quote-trims-before-2026-10-13.json`.
  On 2026-10-13 every shortened quote except TIME's was also matched against the
  source as served (SL4 and Extropians archive pages, MIRI's PDF, the Alignment Forum
  copy of AGI Ruin). TIME and the Wayback Machine refused automated retrieval; the TIME
  quotes rest on the earlier verified quotes they were cut from.
- **Evidence notes.** Notes of 45 trimmed records stated the word count of the quote as
  checked on its original date. On the maintainer's approval (2026-10-14) each now
  gives the new count and the earlier one, for example “The quotation (24 words;
  trimmed 2026-10-13 from 31 words) matched…”; the rest of each note is unchanged.
