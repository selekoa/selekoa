# Same-family audit, 2026-10-29

This is a fresh-context audit of the people pack by the same model family (Claude) that drafted and merged it. It is neither a cross-family check nor a human review, and agreement here is not independent corroboration.

## Sample

[`audit-sample.mjs`](audit-sample.mjs) drew the sample, recorded in [`audit-sample.json`](audit-sample.json), with seed 20261030 and a linear congruential generator. The frame was the 84 records and 34 identity items of proposed persons in the pack before the audit:

- **Targeted:** 20 of the 34 items in the targeted class. The class covers proposed predicates, unknown dates, closed intervals, announcements, paraphrased or translated evidence, and persons who have aliases or are identified by a publisher's page.
- **Random:** 20 of the 84 other items.

That makes 40 items audited (34% of the frame). The 78 items outside the sample are not certified by it.

## Method

Two auditors each started in a fresh context and were given 20 items: the statement, the date and its kind, the qualification, and the evidence with source and locator (identity items also carried the person's name, aliases and description). Each was told to refute its items. Neither saw the drafts, `pack.json`, `pack.md` or this file. Both read the cached retrievals with `tools.mjs` and re-fetched where needed. Their reports are [`audit/audit-A.json`](audit/audit-A.json) and [`audit/audit-B.json`](audit/audit-B.json).

## Results

| Sample   | Upheld | Corrected | Held | No change (packaging) |
| -------- | -----: | --------: | ---: | --------------------: |
| Random   |     13 |         3 |    1 |                     3 |
| Targeted |      9 |        11 |    0 |                     0 |

Every quotation in the sample was found verbatim in its source.

The "no change" column covers three authorship items: Figurnov, LaVictoire and Izmailov. Auditor B was given these claims without their persons' identity passages, which was a fault in how the audit input was built, not in the pack. B nevertheless found an identifying page for each. Two of them (Figurnov's and Izmailov's homepages) match the pack's identity sources, and the third (MIRI's July 2016 announcement) is another source for LaVictoire beside his résumé.

## Corrections applied

| Record                                                                                                              | Finding                                                                                                                                                                              | Disposition                                                                                                                                                               |
| ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pp-au-allan-dafoe-fsf-2024`                                                                                        | The three-name byline belongs to the announcement post, one of the sources of the dataset document `fsf-2024`. The framework PDF credits Google DeepMind and has no personal byline. | **Held.** The person and the record were withdrawn, and Dafoe is listed as a printed name. An open question asks whether to split the announcement into its own document. |
| `identity:` Joulin, Rodriguez, Azhar, Lachaux, Lavril, Martinet (and the other LLaMA authors, which share the note) | The note called Meta the publisher (the page names arXiv) and the authors' "employer".                                                                                               | Note rewritten: an institutional page that is not independent of the byline; the affiliation is not recorded as employment.                                               |
| `identity:eddie-yongming-wu`; `pp-ex-wu-alibaba-ceo-2023`, `-director-2023`                                         | The "Eddie Wu" alias rested on a match of titles with the Caixin record, but the 20-F itself prints "Eddie Wu". The open intervals lacked the latest-document note.                  | Alias now rests on the 20-F passage (Item 6.C). Notes added.                                                                                                              |
| `identity:lawrence-j-ellison`; `pp-ex-ellison-oracle-executive-chair-2014`, `-cto-2014`                             | The 2026 title heading was marked as supporting 2014 appointments. "The next day" was ambiguous.                                                                                     | Evidence replaced with the proxy's "since September 2014" sentence (corroborates the month). Note dated to 18 September 2014.                                             |
| `pp-ex-nadella-microsoft-chair-2021`                                                                                | The locator was Item 8.01, not 5.02. The filing dates the announcement, not the election.                                                                                            | Locator, statement, date note and qualification corrected.                                                                                                                |
| `pp-st-zuckerberg-2025-open-source-risk-states`                                                                     | The passage is in the third paragraph from the end, not the penultimate one.                                                                                                         | Locator corrected.                                                                                                                                                        |
| `pp-er-kant-poolside-cto-2023`                                                                                      | The byline block on a live page was dated to the post's 2023 date.                                                                                                                   | Re-dated to the retrieval (29 October 2026), with the 2023 wording marked unauthenticated. Extended to `pp-er-warner-poolside-ceo-2023`.                                  |
| `pp-ex-pichai-joined-google-2004`                                                                                   | An open interval with no latest-document note, and "joined" is an event.                                                                                                             | Recast as an event dated 2004.                                                                                                                                            |
| `pp-st-hennessy-2026-ai-oversight-states`                                                                           | The chair's letter is undated, and "oversees investment" compressed the source.                                                                                                      | Date note now names the proxy date. Statement and value follow the letter's wording. Extended to the authorship record.                                                   |
| `pp-st-son-asi-states`                                                                                              | The heading was approximate, and the second passage assumed the aim rather than stating it.                                                                                          | Locator fixed. Second passage replaced with "Our aim is to become the No. 1 Platform Provider for this new era of ASI."                                                   |

Optional notes taken up: Hilton's page marks InstructGPT as a "Secondary contribution" (now in the note), and the board-statement value keeps "essential". Optional locator refinements on Hui, Everitt, Spiess and Taylor were left as they are.

## Checks extended beyond the sample

- **Open intervals.** All 17 records with a start and no end were re-read. The five whose notes did not name the latest document that states the role now do: Pichai's and Nadella's directorships, Zuckerberg's chair, Huang's directorship and Hennessy's chair.
- **Bylines read from live page templates.** Pichai's 2018 post has the same weakness as the Poolside page, so its qualification now says that the byline and date are read from the page as served. Magic's attribution sits in the post's body text and was left as it is.
- **8-K locators.** The other four 8-Ks were re-read for their item headings (Alphabet 2019, Microsoft 2014 and Oracle 2014 under Item 5.02; Google 2015 under Items 5.02 and 8.01). No other locator was wrong.
- **Publisher-page identities.** The corrected note applies to all thirteen persons identified by a Meta or Google Research publication page.

## Limits

- The same model family did all the work, so the cross-family brief is the next check required before any admission.
- Two auditors made one pass each, and no reconciliation pass followed the corrections.
- Retrieval failures during the audit: web.archive.org (rate limit, then connection reset) for the 2023 Poolside page, openai.com (HTTP 403), and an arXiv author listing (HTTP 404).
