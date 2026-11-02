# Lab genealogy 2: same-family audit, 2026-10-29

A fresh-context machine audit of the candidate pack, by the same model family that drafted it (Claude). It is not the cross-family check required before admission, and machine agreement is not human review.

## Method

- **Selection** ([audit-sample.json](audit-sample.json)): a recorded random 20% of the 283 merged records (57; `tools.mjs sample 20 20261029`, mulberry32) plus 76 targeted records: every stated reason, every record resting on a smaller or relaying outlet, every deal or organisational change, every funding total, every departure, and every record overlapping an existing dataset record. 133 records in all, split into three batches ([audit/input-1.json](audit/input-1.json) to `input-3.json`).
- **Auditors:** three fresh-context passes, given only the records, their evidence and the editorial rules, not the drafts, the drafting notes or `pack.md`. Each retrieved every cited source again into its own cache (`LG_CACHE=audit`): 136 retrievals, 109 direct, 18 through the reader relay, 9 through X's syndication endpoint; none had to fall back to the drafting copy. Reports: [audit-1](audit/audit-1.md), [audit-2](audit/audit-2.md), [audit-3](audit/audit-3.md), with per-record verdicts in the JSON files beside them.
- **Correction pass:** a separate pass applied the findings in the drafts through one script, [corrections.mjs](corrections.mjs) (idempotent), and widened the systematic findings to every record. Each finding's disposition is in [audit/dispositions.json](audit/dispositions.json).

## Results

| Batch | Records |  ok | correct | drop |
| ----- | ------: | --: | ------: | ---: |
| 1     |      45 |  26 |      19 |    0 |
| 2     |      44 |  29 |      15 |    0 |
| 3     |      44 |  30 |      14 |    0 |
| All   |     133 |  85 |      48 |    0 |

Every quoted passage was found at or near its locator in the auditors' own copies. No identity error, no round total attributed to one investor, no "lead" or "closed" the source did not state, no deal called an acquisition that the parties did not call one, no loaded wording.

Of the 48 corrections: 36 applied as proposed, 11 applied differently (reasons recorded), 1 not applied because the record was dropped.

## Findings by kind

- **Qualifications naming sources that were not attached** (four in one batch): widened to all records; 20 changed (the unattached claim removed, or the source attached).
- **Relays not disclosed:** reporting that follows another outlet (Semafor, The New York Times, Forbes, CNBC, The Verge, the Wall Street Journal, Bloomberg) now names it; 17 records. Anonymous sourcing stated on 5.
- **Stage:** prospective departures and appointments without `stage: announced` (Hsiao, Patel, Ramani, Silver and others); widened to every departure and appointment, 21 changed. A departure stated as effective by its source carries no stage, since the schema's stage values are for prospective or reported activity only.
- **Reported departures:** some departures are known only from reporting, with no announcement by the person or company (Jiao Ke, Xie Jian, Liberatore and others). Kept under `departure_announced`, with a qualification naming the reporting (8 records), as an open question for the maintainer.
- **Structural** (coordinator decisions, recorded in [integration.json](integration.json)):
  - Brockman's 2024 sabbatical (a leave recorded as a departure) is held.
  - The CMA's "acquisition … of certain assets of Inflection" as an `acquired` edge is held; its passages are proposed instead as evidence for the existing agreement record.
  - The Sutskever co-founder record duplicated an existing record; its primary passage is proposed as evidence for that record.
  - Ramani's MSL Infra lead, resting on an aggregator page, is dropped.
  - Hassabis's 2026 record is limited to the CEO title, with Google's text that he remains Chair of Google DeepMind.
  - HUMAIN's $3 billion is moved from a participation record to its own investment record.
  - Zhipu participations credited to Ant Group and Meituan through subscriber vehicles are recorded as inferred, with premises.
- **Closer sources:** six found and used: CNBC on Katti and Ruddarraju in place of Crypto Briefing, Bloomberg via Fortune on Bubeck, Semafor on Hsiao and Woodward, Google's author page, Jeff Dean's Discovery Loop thread as reproduced by Radical Ventures, and Sina Tech via Huxiu on Xie Jian. Not found: The Verge's reports on Vallone, Tworek and Luan (unreachable), Inflection's 2023 release, Reflection's and Kilpatrick's own posts, Discovery Loop's own announcement.
- **Stated reasons:** Carlini's quotation now reaches his reason. Agarwal's reason uses his own words. Luan's and Tworek's reasons are marked as relayed: an English rendering of French reporting, and a report of an image note.

## After corrections

280 records in the pack (288 drafted, 8 dropped or held at integration), 409 passages. Every passage matches both the drafting retrieval and a second, fresh retrieval (`verification.json`; 15 text layers changed between them, no quotation affected). 128 of the 280 records have no primary supporting passage and rest on reporting.

## Limits

- One model family drafted, integrated, audited and corrected. Agreement among those passes is not independent corroboration.
- The roughly 150 records outside the sample were checked only by the widened patterns and the mechanical verification.
- No archive capture was read: the Internet Archive refuses this environment. Pages read only through the relay, and pages that refused, are listed in the cross-family brief for the checker to open in an archive copy.
