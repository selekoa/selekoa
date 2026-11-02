# Lab genealogy 2: candidate pack, 2026-10-29

A report on the candidate research pack in [`research/lab-genealogy-2/`](../research/lab-genealogy-2/README.md), prepared on branch `lab-genealogy-2-pack`. It extends the lab genealogy admitted on 2026-10-17 ([admission record](genealogy-admission-2026-10-17.md)) to the years 2023–2026. Nothing was admitted: `data/`, the application, the schema and the releases are unchanged.

**Preparing family:** Claude (seven drafting passes, an integrator, three fresh-context auditors and a correction pass). **Checking family:** not yet run; the brief is ready for GPT.

## What the pack holds

280 candidate records from 128 sources (61 primary, 67 reporting or secondary), with 409 verbatim passages. 138 entities are proposed (79 people, 59 organisations); the rest reuse dataset entities.

| Group                                                                                                    | Records | Rest on reporting | Announced |
| -------------------------------------------------------------------------------------------------------- | ------: | ----------------: | --------: |
| New US labs (SSI, TML, Reflection, Periodic, Eureka, Ndea, humans&, Applied Compute, Ricursive)          |      63 |                22 |         0 |
| Mistral, Inflection, Microsoft AI, European labs (Latent Labs, Adaption, Ineffable Intelligence, Kyutai) |      51 |                11 |         6 |
| OpenAI and Anthropic moves                                                                               |      31 |                16 |        20 |
| Google DeepMind and Meta                                                                                 |      33 |                28 |        22 |
| xAI, Apple and Amazon                                                                                    |      34 |                13 |         8 |
| Acqui-hires and licensing-plus-hiring deals                                                              |      32 |                19 |        11 |
| Chinese labs                                                                                             |      36 |                19 |         2 |
| **Total**                                                                                                | **280** |           **128** |    **69** |

By predicate: `held_role` 106, `participated_in_round` 70, `departure_announced` 29, `co_founded` 29, `announced_funding` 25, `unit_of` 6, `founding_stated` 4, `licensing_hiring_agreement` 4, `investment_announced` 4, `launched` 2, `unit_disbanded` 1. Six records carry a reason stated by the person or organisation concerned; three are inferred (Zhipu participations through subscriber vehicles). Three passages are proposed as additional evidence for existing records.

The pack is larger than the 200 aimed at, mainly because each named investor in a stated round is its own record (70). Trimming to round totals and lead investors would bring it near 220.

## Scope choices

- **Extend, don't duplicate.** The first pack already holds the headline 2023–2026 events (Mistral, SSI, TML, Reflection and Periodic founders; the xAI launch team and departures; MSL members from the 30 June 2025 memo; Microsoft AI; the four 2024–2025 licensing-and-hiring agreements; OpenAI's and Anthropic's main leadership changes). The drafts list 146 existing records used instead of re-recording them; `tools.mjs check` rejects a record that matches an existing one's subject, predicate, object and date.
- **People pack.** Parent-company executives and the Poolside, Magic, Imbue, 01.AI and Anthropic-board people of the parallel `people-pack` branch were not drafted. One record here (Giannandrea's announced adviser role at Apple) names its people-pack neighbour in `relatedCandidate`.
- **Funding** uses the existing capital predicates: one `announced_funding` per round total, one `participated_in_round` per named investor without an amount, `investment_announced` for a single investor's own stated amount (HUMAIN's $3 billion in xAI's Series E). Valuations are not recorded.
- **Deals** are recorded as the parties state them. No new `acquired` edge: the CMA's "acquisition … of certain assets of Inflection" is held (question 2). Amazon–Covariant and NVIDIA–Groq rest on the parties' texts; NVIDIA–Enfabrica and Google DeepMind–Hume AI rest on reporting; Anthropic–Humanloop is recorded as hiring only, since Anthropic said it did not acquire assets or IP.

## Checks

- `tools.mjs check` on every draft: no problems (shape, entity references, dates, loaded wording, funding attributes, duplicates, quotation limits including the dataset's own quotations from shared sources).
- `verify` and `verify fresh`: 409 of 409 passages match the drafting retrieval and a second retrieval of all 128 sources; 15 text layers changed, no quotation affected.
- Same-family audit ([audit.md](../research/lab-genealogy-2/audit.md)): 133 records (57 random, 76 targeted), 85 ok, 48 corrected, none dropped by the auditors; the corrections were widened to all records (dispositions in `audit/dispositions.json`).
- `pnpm check:privacy` passes. No personal e-mail addresses, private-life reasons or compensation are recorded; one stated reason (Keele's) and Baichuan's "personal reasons" for Hong Tao were left out as private.
- Not run: `pnpm check` and the browser suite (no data, schema or UI change).

## Retrieval failures

32 recorded in the drafts (listed in `pack.md` and in the brief for archive copies). The main ones:

- The Internet Archive refused connections throughout; no capture was read.
- The reader relay refused this environment for part of the run (HTTP 401, "bad IP reputation"); Business Wire (Inflection's 2023 round), Axios, GeekWire and some others were therefore not read.
- Pages gone or changed: Covariant's post on the Amazon deal (404; site now a placeholder), Inflection's 2023 funding page (404), SSI's June 2024 launch statement (current page undated, unsigned), TML's February 2025 founding-team list.
- Paywalls: Bloomberg, The Information, the Wall Street Journal, Semafor originals for several Meta and Apple moves; records cite the reports that relay them and say so. The Verge was unreachable (Vallone, Tworek, Luan).
- X syndication truncates long notes (Murati's seed post, Vinyals, Jumper, Schwarzer); image notes (Tworek) cannot be read.

## Open questions for the maintainer

1. **Run the cross-family check.** [`cross-family-input-2026-10-29.md`](../research/lab-genealogy-2/cross-family-input-2026-10-29.md): 231 items (122 blind in Part A, 109 direct in Part B, 3 proposed passages in Part C), with archive copies requested for every relayed or refusing page. _Recommended:_ run it with GPT in two sessions (Part A; then B and C), as the first pack was, before any admission.
2. **The CMA's "certain assets" wording on Microsoft–Inflection.** _Recommended:_ do not add an `acquired` edge between the companies; add the CMA's two passages (Summary para 1, and para 132's completion on 19 March 2024) as context evidence on the existing agreement record `lg-deal-microsoft-inflection-agreement-2024`, in a separate authorised correction.
3. **Brockman's 2024 sabbatical.** A leave is not a departure and no predicate fits. _Recommended:_ leave it out (held); keep the return record, which stands on its own post. Revisit only if a leave predicate is wanted for other cases.
4. **Departures known only from reporting** (8 records, e.g. Baichuan and 01.AI co-founders, Liberatore at xAI) use `departure_announced`, though neither the person nor the company announced them. _Recommended:_ admit them under that predicate marked "Rests on reporting", with the qualification saying no announcement was found, as the first pack did for similar cases; do not add a new predicate.
5. **Records resting on smaller or relaying outlets** (Baguete, WinBuzzer, VnExpress, exchange4media, TrendForce, QbitAI, 36Kr relaying 新智元, Bowang Caijing commentary; about 20 records, chiefly Meta and Google DeepMind moves, Baichuan departures, Nicolls at xAI). _Recommended:_ hold any record whose only supporting passage is from such an outlet unless the cross-family checker confirms it against the originating report or a primary text; admit the rest marked as reporting.
6. **Investor-participation records** (70). _Recommended:_ admit only participants named in the company's own announcement or a filing, and leave reporting-only participant lists (e.g. TML's seed participants, Mistral's Series A/B leads from reporting) as context in the round-total record's qualification. This keeps the round totals and drops 16 participation records.
7. **Zhipu participations through subscriber vehicles** (Ant Group, Meituan), recorded as inferred with premises. _Recommended:_ admit as inferred, with the subscriber vehicle named in the role and the qualification; do not attribute other vehicles to parent groups without the prospectus's own link (Tencent in B4 was left out on that ground).
8. **Stated reasons that are relayed** (Luan: an English rendering of French reporting of his words; Tworek: reporting of an image note). _Recommended:_ hold the `statedReason` of both unless the checker finds the person's own text; admit the departures themselves.
9. **Proposed evidence for existing records** (Sutskever's SSI co-founding from the SSI–NVIDIA release; the two CMA passages). _Recommended:_ add in the admission as evidence rows on the existing claims, not as new claims.
10. **New organisation entities for investors** (a16z, Lightspeed, DST Global, Accel, Valor and others; 38). _Recommended:_ admit them with minimal descriptions ("investor named in … round"), as the capital collections did; do not merge "DST" into DST Global without the source naming DST Global (two records map it so and say so in their qualifications; checker to confirm).
11. **Identity doubts:** Applied Compute's founders are named by first name only in the company text (full names from reporting); Noah Goodman is called a co-founder of humans& by some reports and an adviser by others; Ke Yang (Apple) and Zhou Yucong (MiniMax) have no original-language form. _Recommended:_ admit Applied Compute's founders with the reporting named for the full names; hold Goodman's co-founder record unless the company's own text names him; admit the others.
12. **Date conflict at Reflection AI:** the company's post shows 9 August 2025 while reporting dates the $2 billion round to 9 October 2025. _Recommended:_ keep the October date with the conflict recorded, and ask the checker for an archive capture of the post.

## Next step

Run the cross-family check (question 1). Then a reviewing thread adjudicates its findings, the maintainer decides the questions above, and a separate data thread admits the pack by group under those decisions (a patch release; no schema change is needed).

## Maintainer decisions (2026-10-30)

All recommended answers to the open questions above (1–12) are adopted as written. For records resting on reporting (question 5 and the 128 noted above): admit only those the cross-family check confirms from a primary text, or label them as resting on reporting. Reflection AI's date (question 12): prefer the company's own dated post unless the check shows its date is a display artefact. Admission still waits for the cross-family check and its adjudication; where the check changes the basis of a recommendation, the admission task lists it for the maintainer instead of applying it.

## Adjudication of the cross-family check (maintainer, 2026-10-31)

The check (`research/lab-genealogy-2/cross-family-check-2026-10-29.md` on `codex/lab-genealogy-2-check`: 69 agree, 52 partly, 1 disagree; all 128 reporting-only records followed up) is accepted. Apply at admission:

1. L197 Patel: his own post (27 October) states he left MSL some months earlier; record a completed departure before publication with the exact end unknown, not an announced departure.
2. L088 Hooker and L195 Katti stay announced (scheduled 15 September 2025 and 15 November 2026) until completion is documented.
3. L013 Zhipu: the Shanghai Yunya subscriber stage completed in November 2023; the whole B-3 round in January 2024; both dates, kept distinct.
4. L114, L121: "DST" stays an unresolved name; no mapping to DST Global.
5. L117–L124 Reflection AI: the company's own dated X post supports 9 October 2025; the blog and an October 2026 capture display 9 August; record the conflict without a cause.
6. L223, L224, L227: Goodman's co-founder credit and Applied Compute's founders' full names from their own texts; founding dates stay unknown.
7. L004–L006, L028–L032: use the recovered Inflection and Covariant originals; Covariant's COO-to-CEO change stays prospective; its licence and hiring agreement is not an acquisition.
8. L137, L163, L170–L171: use the original Tworek, Luan and Schwarzer texts; stated reasons only in their own words; formal-title and effective-date limits kept.
9. Proposed passages: X01 context (CMA "certain assets"), X02 support (completion 19 March 2024; decision 4 September and publication 24 October kept separate), X03 support (retrospective SSI co-founder credit).
10. Locator and quotation repairs, including L042 and L063.

Anything else needing judgement is held and listed.
