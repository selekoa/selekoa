# Lab genealogy 2: fresh-context audit, batch 2

- **Auditor:** Claude, a fresh-context subagent of the same model family as the drafters. This is not a cross-family check.
- **Date:** 2026-10-29.
- **Input:** `audit/input-2.json`: 44 records, selected as random, funding totals, deals or organisational changes, departure stage and date, stated reason, and records resting on a weaker or relaying outlet. I did not read the drafts, `pack.md`, the drafting brief or the scripts.
- **Method:** I retrieved each of the 46 cited sources fresh into `.local/lab-genealogy-2/audit/` with `tools.mjs fetch`, one at a time, using the recorded route. I then read each passage in context with `grep` or `text`. I recomputed the two Zhipu prospectus totals by summing the table rows from the text layer. For a handful of names I checked the existing-record inventory to catch duplicates.
- **Verdicts are in `audit/audit-2.json`:** 29 ok, 15 correct, 0 drop.

## Retrieval

All 46 sources came back fresh: 38 direct, 5 through the r.jina.ai relay (GeekWire, CNBC, StreetInsider/Reuters, exchange4media, GlobeNewswire) and 3 through X's syndication endpoint (Keele, Brockman, Vinyals). I did not use the drafting copy for any record.

One retrieval failed, for a source not cited in the records: Inflection AI's own funding announcement of June 2023, which I tried as a possible closer source (relay HTTP 401).

The X syndication text for Vinyals is truncated, as the record says.

## Findings by kind

- **Passages:** every quote and anchor I checked is verbatim in the fresh copy and at or near its locator. I found no identity errors. I found no round total attributed to one investor, and "lead" appears only where the source says it.
- **Funding:** both Zhipu totals reproduce exactly from the table rows: RMB1,228,809,303 for B4 and RMB2,454,999,968 for B6-3/3+/4.
  - B6: the quote is a definitional fragment that does not itself say "completed". The note on the convertible notes stops at February 2025, but the prospectus also records an agreement of 17 March 2025.
  - Moonshot: the qualification says the internal letter was not retrieved, but Lanjing reproduces the full letter, which contains the company's own sentence.
- **Dates:**
  - CMA/Inflection: the CMA itself states that the transaction "completed and was made public on 19 March 2024" (para 132). The note denies that a completion date is stated.
  - Schwarzer: the post date of 3 March 2026 rests on no attached evidence.
  - Ricursive: the note's "at the company's formal launch" is not in TechCrunch.
- **Qualifications that cite unattached or unsupported sources:**
  - Humanloop's own announcement (Hayes).
  - "reported as a LinkedIn post" (Vallone; The Decoder says no such thing).
  - TechCrunch for "Yash Patil".
  - The X post that dates Schwarzer's move.
- **Relays not disclosed:**
  - TechCrunch relays Forbes (Inflection round).
  - Crypto Briefing relays CNBC (Ruddarraju).
  - Next relays The Verge, and Luan's stated reason is a back-translation from French that drops "entirely new".
- **Source strength:** these records rest on weak outlets where closer sources probably exist (not verified):
  - Maginative (Bubeck).
  - The Decoder (Vallone).
  - TechTarget (MSL Infra).
  - Baguete (Velloso: the title is given only as "the same position", and the source spells him "Matt").
  - Jiemian's unattributed "公开资料显示" summary (Luo Fuli at DeepSeek).
- **Context omitted:** TechCrunch's Humanloop article carries an Anthropic spokesperson's statement that Anthropic did not acquire Humanloop's assets or IP. It bears on how the arrangement is characterised and is not recorded.
- **Wording:** the Liberatore quote carries "abruptly". Shorten it. Elsewhere, loaded framings in the sources ("walked out", "出走", "acquired the co-founders") are correctly not adopted. Private-life material (Keele's children, Luo Fuli's family) is correctly left out.
- **Predicate:** `departure_announced` is used for departures that were only reported, where nobody announced anything: Jiao Ke, Liberatore and Xie Jian. The qualifications say the records rest on reporting. The record shape still reads as an announcement, and Xie Jian also carries `stage: announced`.

## To widen to unsampled records

1. Check every qualification that names a source ("X's own announcement", "per TechCrunch", "reported as …") against the attached evidence. Four of the 44 records here name a source that is not attached or does not say it.
2. Search reporting sources for "first reported by", "according to", "reported" and "citing", and disclose any second-hand relay in the qualification. Three undisclosed relays turned up in this sample.
3. For every claim that a document was "not retrieved", check whether the retrieved outlet reproduces it in full, as Lanjing does with Moonshot's letter.
4. For CMA and other regulator records, use the regulator's own completion or effective dates where it states them.
5. Decide maintainer-side whether `departure_announced` may carry reported, unannounced departures, or whether those need different wording or a stage value such as "reported". Then apply the decision across the pack.

A bounded sample does not certify unsampled records. Machine agreement here is neither historical certainty nor human acceptance.
