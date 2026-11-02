# Lab genealogy 2: same-family audit, batch 1

- **Auditor:** Claude, a fresh context from the same model family as the drafters. This is not a cross-family check.
- **Date:** 2026-10-29.
- **Input:** `audit/input-1.json`, 45 records, each with its selection reasons: random 16; rests on a weaker or relaying outlet 15; departure stage and date 10; funding total 4; deal or organisational change 3; stated reason 2; overlaps an existing record 1. Some records carry more than one reason.
- **Method:** I fetched every one of the 47 distinct evidence URLs myself, one at a time, into the auditor cache (`LG_CACHE=audit`): 36 direct, 8 through the r.jina.ai relay, 3 through X syndication. I read each passage in context and tried to refute identity, wording, locator, date kind and precision, stage, funding shape, source role and qualification. I made two extra fetches: Inflection's 2023 funding release, which the relay shows as now a 404 page, and xAI's Series E post of 6 January 2026, which I used to confirm a negative statement in record 30. I did not read the drafts, `pack.md`, the drafting brief or the scripts. I did read the existing-claims inventory, to test overlaps.
- **Retrieval failures:** none. I used no drafting copies. X syndication returned complete text for the Agarwal and Simo posts. The Jumper post ends mid-sentence, as the record says.

## Results

26 ok, 19 correct, 0 drop. Every verbatim passage matched the freshly retrieved text. I found no identity error, no unsupported acquisition or closing, no round total attributed to one investor, and no loaded wording in a record.

### Material

- **lg2-gm-hassabis-steps-down-ceo-2026:** the predicate misleads. In a graph or list, `departure_announced → Google DeepMind` reads as Hassabis leaving GDM, but Google's own text makes him Chair of GDM. The proposition is the end of a role, so model it as a role change, or scope it explicitly to the CEO role.
- **lg2-nl-sutskever-ssi-cofounder-primary:** this duplicates the existing `ilya-sutskever-ssi-cofounder-2024` (same subject, predicate and object, but dated differently). The new passage should become extra evidence on that claim, not a new claim.
- **lg2-xa-humain-series-e:** the scope rule says `participated_in_round` carries no amount, but this record carries HUMAIN's $3 billion. Split it into a participation record and an `investment_announced` record with the amount. xAI's own Series E post does not name HUMAIN; I confirmed this.
- **lg2-gm-ramani-msl-infra-lead-2025:** BTW Media is an aggregator page. It shows a machine "confidence 76%" label, a revision date of 17 August 2026, and cites Capacity Media. Replace it with a report of Wang's memo, or drop the record.

### Sources (weaker or relaying outlets)

- **Relays not named in the qualification:** 9to5Google follows Semafor (Woodward). TechCrunch follows The New York Times (humans&).
- **Closer sources available or likely:**
  - Katti: CNBC, which this environment can retrieve through the relay.
  - Ruddarraju: CNBC / an OpenAI spokesperson calling him "CTO of compute" on 14 October 2026, a better source than the unsourced e4m brief.
  - Burnham: the 19 November 2025 xAI–HUMAIN release itself.
  - Bubeck: the report that Maginative's unattributed spokesperson quote comes from.
  - Kolesnikov, Kilpatrick, Hooker, Vallone: their own posts.
  - Woodward: Google blog bylines for the title.
- **Xie Jian (lg2-cn-xie-jian-baichuan-cofounder):** the only evidence is the timeline of a commentary piece marked as compiled from public information. Seek contemporaneous July 2025 reporting.
- **Translated edition:** the heise English article is a translation of a German original, and the qualification should say so.

### Qualification and attributes

- **Anonymous sourcing not stated:** Baichuan (Lanjing's 知情人士), Silver (the January staff notice), Ke Yang (Bloomberg's people familiar with the matter).
- **Missing `stage`** on two departure records: Silver (stated as effective) and Ramani 2026.
- **Small extensions of the source:**
  - Agarwal's stated reason paraphrases "felt the pull" as "wanted"; quote it instead.
  - Ke Yang: the qualification uses a pronoun the source does not give.
  - Burnham: the statement calls it an "xAI press release"; the source says a press release about the partnership.
  - Velloso: the source spells the name "Matt".
- **Evidence role:** the 36Kr fragment in the Chen Weipeng departure record concerns a different proposition (that he had left). Make it context, not support.
- **Identity without evidence:** "Linden Li" rests on a TechCrunch item that is not attached.
- **Locator:** Bubeck's locator ("first and third paragraphs") does not match where the passage sits.

## Widen to unsampled records

1. **Departure records:** check every `departure_announced` record for a `stage` attribute, and for role changes inside the same organisation that the predicate presents as leaving it.
2. **Secondary records:** check whether the qualification names the outlet being relayed (Semafor, NYT, Bloomberg, The Information, CNBC) and any anonymous sourcing.
3. **Small trade, aggregator or crypto outlets** (BTW Media, WinBuzzer, Crypto Briefing, exchange4media, Maginative, Mobile World Live): try the originating report first. CNBC and Bloomberg Government pages retrieve here.
4. **Funding records:** check every `participated_in_round` record for an attached amount.
5. **Overlaps:** check every record selected because it overlaps an existing claim. A new primary passage for an existing proposition should become extra evidence on that claim, not a new claim.
6. **Names:** check every full name in a statement that rests on an evidence item that is not attached.

A sample of this size does not certify the records outside it.
