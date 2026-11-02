# Lab genealogy 2: same-family fresh-context audit 3

- **Auditor:** Claude, the same model family as the drafters. This is a fresh-context check only, not the cross-family check required before admission.
- **Date:** 2026-10-29.
- **Input:** `audit/input-3.json`, 44 records (random sample plus targeted risks: funding totals, departure stage and date, stated reasons, deals or organisational changes, weaker or relaying outlets). Per-record verdicts are in `audit-3.json`.
- **Method:** I read AGENTS.md, the editorial policy sections and `scope.md`. I did not read the drafts, `pack.md`, the brief or the scripts. I fetched each of the 43 distinct sources one at a time into the auditor cache (`LG_CACHE=audit`), using the route each record names, and read each passage in context.
- **Retrieval:** all 43 sources were retrieved fresh: 35 direct, 5 relay (r.jina.ai) and 3 through the X syndication endpoint. Nothing failed, and the drafting copies were not used. The Zhipu prospectus text layer interleaves table columns. I checked each round total by summing the subscriber rows (B6-1/2) or against the Key Terms table (B2, B3).

## Result

- 30 ok, 14 correct, 0 drop.
- Every quoted passage was found verbatim at or near its locator.
- No identity errors.
- No round total is attributed to an investor.
- "Lead" appears only where the source says led.
- Nothing is called closed where the source does not say closed.

## Findings by kind

- **Predicate or overreach:**
  - Brockman's sabbatical is recorded as `departure_announced`. I recommend holding it until a leave predicate exists.
  - Ant Group–Zhipu B5: the prospectus names Shanghai Feiya as the subscriber. Assigning the participation to Ant Group through the ownership chain is an inference and needs derivation `inferred` with a rationale. The p.240 passage ("deemed to be interested") is the closest textual link.
- **Role attributes going beyond the source:**
  - Brockman's role attribute imports "President" from a 2022 record, which extends the role past its document date.
  - Velloso (Google, 2025): the attribute says "title not given", but the report gives the title ("o mesmo cargo").
- **Dates:**
  - Luo Fuli: the date belongs to The Paper's report, not to her post.
  - Zhipu B2 and B3: both rounds were completed in two stages (July/August 2023 and November 2023/January 2024). The qualifications should say so.
  - Velloso (Meta, 2026): the report contradicts itself ("seven months" against "since July 2025").
  - Ricursive: the statement credits the "Series A" label to the 16 February report, but the 26 January report already uses it.
- **Stage:** prospective departures without `stage: announced`: Hsiao and Patel.
- **Passages:**
  - Carlini: the quote stops before the words that carry the stated reason.
  - Radford: Mark Chen's statement survives here only in QbitAI's Chinese translation, so the English paraphrase is a back-translation and the record should say so.
- **Stated reasons through reporting:** Tworek's reason passes through TrendForce, which cites The Verge, which reports an image of his note. The Verge is the closer source.
- **Closer sources not tried** (one retrieval attempt each is suggested before admission):
  - Murati's X post for the TML seed participants.
  - Kilpatrick's X post.
  - Discovery Loop's announcement and the TechCrunch report for Quoc Le. The VnExpress report itself says Alphabet funds the venture, which qualifies "left Google".
  - Semafor for Hsiao.
  - Reflection's X post, to settle the August/October date conflict.
- **Private life and loaded words:** the Jiemian article on Luo Fuli contains salary rumours and family material, and the record leaves it out. Loaded words such as "rouba" and "AI才女" occur only in source titles, which is acceptable.

## Systematic issues to widen to unsampled records

1. **Report date as event date.** Reporting-based records use `time.kind: event` with the report date in some places (Hsiao, Radford, Mistral B, Patel, Hume, Velloso 2026) and `snapshot` in others (Kilpatrick, Lim, Metz, Wang). Both are covered by notes, but the convention should be the same across the pack.
2. **Missing `stage: announced`** on prospective departures that rest on reporting. Check every `departure_announced` record.
3. **Ownership-chain attribution** in the prospectus-based `participated_in_round` records. The prospectus names holding vehicles, and any record that names a parent group (Ant, Alibaba, Tencent, Meituan/Tianjin Sankuai and others) should be checked for derivation and rationale.
4. **Staged Zhipu rounds.** Check every Zhipu round record for stage-completion dates that differ from the round's completion month.
5. **Primary posts not tried.** Where reporting relays a founder's or company's own X or blog post, try that post before accepting reporting as the closest source.

## Limits

This audit is same-family, and a bounded sample does not certify the unsampled records. I did not open archive captures. Mutable pages (the SSI updates page, the humans& home page, the Reflection post) were checked as currently served.
