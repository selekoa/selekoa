# Same-family audit: arguments about catastrophic risk from advanced AI

Audit of the candidate pack on 2026-10-29 by two fresh-context auditors of the same model family as the drafting passes (Claude). Neither drafted any record. They worked from `pack.json` as merged after the integrator's changes below, the sample in [audit-sample.json](audit-sample.json) and the cached source texts, and were asked to refute records rather than confirm them. Agreement between passes of one family is not independent corroboration; the cross-family check is still required before any admission.

## Integrator's changes before the audit

Made by [reconcile.mjs](reconcile.mjs) in the drafts, at the first merge:

- **One definition per shared work.** Seven works defined by more than one draft were set to one definition (Bengio 2024, Belrose and Pope 2023, Hinton 2024, Bostrom 2003, Brooks 2017, Narayanan and Kapoor 2025, Altman 2015), choosing the more careful word count where they differed; two ids for Bengio's 2024 post were made one. Further duplicates found by audit B were unified after the audit (below).
- **Bostrom, "Ethical Issues in Advanced Artificial Intelligence" (2003).** The author's page is an undated "slightly revised version"; its wording is attested from no known date, so its R05 record lost the earliest-located role, as its R01 record had already been drafted.
- **R05 criterion fit.** Chalmers (2010) and Muehlhauser and Salamon (2012) were reclassified as context: neither asserts a period of hours to months ("within years", "fairly rapidly"). Chalmers keeps the earliest-located use of the name "intelligence explosion".
- **Roles.** "Most developed" was removed from two contesting records (it is a role of articulations).
- **Quotation limit.** One quotation from Hinton's Nobel banquet speech (a short text) was shortened.
- **The 2019 Facebook thread** on instrumental convergence was recorded by the integrator from the LessWrong copy through its API ([drafts/debates.json](drafts/debates.json)), after the drafting pass had found the page refused.

## Coverage

| Auditor | Sample                                                                                                                                                                   | Items |  ok | correct | reclassify | drop |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----: | --: | ------: | ---------: | ---: |
| A       | Targeted: every earliest-located, earliest-located-term and most-developed role, every non-nonfiction register, every attested or claimed date, every comparative record |    68 |  49 |      16 |          3 |    0 |
| B       | Random: seeded shuffle (seed 20261029, linear congruential generator in build.mjs) of the other records, first 30; plus every reply (22)                                 |    52 |  42 |       6 |          4 |    0 |

120 of the 198 records and replies then in the pack. Every quotation in the sample matched its cached text; the problems found were of context, scope, dates, roles and missing earlier texts. Not retrieved by either auditor: the full text of Crawford and Calo (Nature, 2016), closed access; only its standfirst was read. Auditor B also read every statement and qualification of the pack for wording, and assessed balance over the whole pack. Reports: [audit/audit-A.json](audit/audit-A.json), [audit/audit-B.json](audit/audit-B.json).

The sample does not certify unsampled records. Material errors widened checking to the affected record families: the earliest-located roles of every proposition were rechecked against all records after the corrections, and all duplicate works were searched by address and title.

## Findings and dispositions

All 48 findings and wording items were applied (45) or applied in part (3) by [audit-fixes.mjs](audit-fixes.mjs); none was held. Each is listed with its disposition in [audit/dispositions.json](audit/dispositions.json). The material ones:

- **Earliest-located roles moved (audit A).** R01 contesting from Brooks 2017 to Goertzel 2015 (Brooks's quotation had also dropped his negation); R06 articulating from Yudkowsky 2016 to Russell's Edge response of 2014; R07, R08 and R09 contesting to Pinker's Edge response of 2014 (earlier than the auditor's first proposal, Hawkins 2015, which is recorded as contesting); R11 contesting from Dafoe and Russell 2016 to Russell 2014; R12 articulating to the DAIR statement of 31 March 2023, after Crawford and Calo (standfirst only) and Zador's 2019 comment (no documented present harms) became context; R13 contesting to Gwern (attested 2022-01-02).
- **Reclassified.** RAND's 2024 red-team study (measures 2023 models only) to context on R09; Pinker 2018 from contesting R01 to contesting R06, with its no-drive passage on R10a; Kambhampati 2024 and Browning and LeCun 2022 to context on R14; Leike 2022 to context on R06.
- **Criterion split.** R10 joined two claims, so that texts accepting orthogonality but holding that AI can be controlled by design read as denying orthogonality. It is now R10a (benevolence or no drive to dominate; paired with R01) and R10b (control by design; paired with R08). The R13 and R14 criteria lost a consequence clause that no located articulation states; see the review note.
- **Duplicate works.** Andreessen 2023 (three ids), Hendrycks et al. 2023, Bengio et al. 2023, Narayanan and Kapoor 2025 and Brooks 2014 (two expressions of one work, kept as two sources of one document) were each made one document. No two records then shared text, proposition and stance.
- **Statements and evidence.** Bostrom 2002 on R09 now keeps the paper's condition ("depending on what those values are"); Marcus 2023 keeps "(just)"; Gebru and Torres rest on their diversion passage; Ngo 2022 on R04 rests on the report's phase overview; dates and claimed dates corrected (Armstrong, Bostrom and Shulman to October 2013; Grace 2022's byline; Bostrom 2002's talk of April 2001).
- **Replies.** The Howard reply's target (Yudkowsky's TIME article) is marked as the pack's identification; the Kapoor et al. reply to Gopal et al. is reworded to what the passage says.
- **Stale entries.** Omission entries that contradicted the records (the 2019 thread, Ng's letters, LeCun 2022) were corrected.

## Balance

Position counts which way a passage argues on one proposition: the risk side articulates R01–R09 or contests R10a–R17; the counter side articulates R10a–R17 or contests R01–R09. It does not classify authors. After the corrections, 210 records: 93 risk side, 90 counter side, 27 context (pack.md has the table by proposition).

- **Thin counter side:** R09 (7:1), R17 (7:2) and R03 (7:3). R09 and R17: few primary texts argue that misuse could not be catastrophic or that markets will produce safety; much of the published pushback on misuse and on extinction risk is in interviews, posts on X and debates without transcripts, which the scope excludes, and the economic texts of Hanson and Gans are in the dataset on E04 and linked. R03, R04 and R06: retrieval, since LessWrong and the Alignment Forum refused direct page requests during drafting, so posts by Pope, Belrose, Barnett and others are missing.
- **Thin risk side:** R05 (6:10), R10a and R10b (3:6, 2:6), R11 (3:6), R12 (3:5). R05: the dataset already holds the main fast-takeoff texts on A4 (Yudkowsky 2001–2013, Cotra 2022), which are linked, not re-recorded.
- **Authors.** Most records on the risk side: Bengio 11, Bostrom 10 (and 1 context), Russell 8. On the counter side: Pinker 9, Narayanan and Kapoor 8, Marcus 5 (with 2 on the risk side), Andreessen 5 (and 1 context), Belrose and Pope 5. Seed authors with no record: Chollet (essay refused); Bender et al.'s "Stochastic Parrots" (not retrievable; Bender is recorded through the DAIR statement and Bender and Koller 2020); LeCun's "A Path Towards Autonomous Machine Intelligence" (refused). LeCun is recorded through the 2019 thread, the 2019 essay with Zador, the 2022 essay with Browning and the 2023 joint statement on openness.
- **Signatures and proximity.** None found: every signed statement is recorded as what its text says, and no record attributes a stance to a person from a signature, affiliation or another text.

## Neutral wording

- **Mechanical.** `tools.mjs merge` rejects the pack's own use, outside quotation marks, of labels ("doomer", "accelerationist", "sceptic", "alarmist"), evaluative verbs ("admits", "concedes", "warns", "dismisses", "debunks") and priority words ("coined", "seminal", "landmark", "pioneering", "influential"); "first" is listed as a warning and read by hand. None is used; the three remaining uses of "first" are descriptive ("released … at first", "the first products to market", "the first part").
- **By reading (audit B).** No banned label in the pack's voice. Applied: authors' loaded words now in quotation marks as theirs ("self-refuting", "doomed", "leading"); "grants" and "denies" replaced by neutral verbs in nine records; a phrase discounting Altman 2024 by its author's role removed; Andreessen's own term quoted instead of paraphrased. The group labels now have the same form ("Arguments that …").
- **Criteria.** Each is worded as a claim attributed to no one; R10's two claims are separated.

## Limits that remain

- Same family throughout; no cross-family check yet.
- 90 of the 210 records were never in an audit sample (the 12 records added by the corrections were checked by the correction pass against the cache only).
- Several earliest-located roles rest on a single bounded search and on current copies of mutable pages (Bengio's posts carry a modification date of 2025-12-03; Turner's page an update of 2026-08-19); R02's earliest contesting role and R10a's earliest articulation rest on page order of undated Edge responses of 2014.
- The R05 earliest-located role (Yudkowsky 2017) meets the criterion only through the name "foom"; the dataset's A4 records (2001 onwards) are earlier on the overlapping concept.
