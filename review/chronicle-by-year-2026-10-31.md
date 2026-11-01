# Chronicle by year (2026-10-31)

Branch `chronicle-by-year` from `main` at `f56a2d6` (#109). A chronicle of
the record: one page per year (`/year/<yyyy>`) for every year with a dated
record or a stated date, a page per topic of each year with more than one
topic (`/year/<yyyy>-<topic>`), and an index of the years (`/years`), all
generated from the records. No data, release, export, header or hosting
setting changed. Nothing was deployed.

## What a year page shows

- **Orientation.** "Selekoa’s 772 records dated 2025, in date order,
  grouped by topic. 7 stated dates are listed apart." (a topic page: "…
  516 governance records dated 2025, in date order, of 772 in all
  topics."), then "Selective: what the records hold, not
  a history of the year." A closed "How this page is made" note lists the
  limits (wording below).
- **Steps.** The previous and next year with records or stated dates, and
  "All years".
- **Topic filter.** "Show: All topics (772) · People (79) · …": links to the
  year's topic pages, the current one marked (`aria-current="page"`). Each is
  a pre-rendered page with its own slice, so the filter works without
  scripts and opens from a slice with them.
- **Records**, by topic (the claims' own `topic`, in the explorer's order and
  labels), then by month: records dated only to the year first ("Dated to
  2025 only"), then each month ("March 2025"); within a month, records dated
  only to the month come first, then by day. Each record shows:
  - its date as stored (`<time datetime>`), the date's kind (event,
    publication, announcement, effective, revision, signature, snapshot,
    interval, interval begins or ends) and its precision ("dated to the day /
    month / year"), and the stage it states, if any (announced, proposed,
    plan, letter of intent, …);
  - a "Contested" or "Unresolved" badge where the record is not settled, and
    "Inferred" or "Question posed by Selekoa" where it is not stated in the
    source;
  - its statement, a link that opens the claim and its evidence in the claim
    panel (without scripts, the claim page, which holds the panel);
  - earliest located marks the propositions collections give it, each linking
    to its row in the collection;
  - a link to its record (the subject's person, document or dossier page, or a
    proposition's place in its collection) and a link to its claim page.
- **Provision records** (quoted provisions and recorded absences of one text)
  sharing a text and a date are one entry: "24 provision records of
  ‹text›", linked to the text's page, which lists them. A contested or
  unresolved provision record and a provision assessment are listed on their
  own. In 2025 this turns 324 provision rows into 54 entries.
- **Dates stated for the year**, after the records and apart from them:
  targets, deadlines and terms from the records' stated dates
  (`attributes.statedDates`, "Operation target", "Deadline", …, with who
  stated it and any wording such as "mid-2027"), and scheduled dates: a
  record's own date that lies wholly after the latest check of that
  record's own evidence, such as a law's effective date (one today,
  `ny-ch96-effective-date`, 2027-01-01, checked 2026-10-11). Years that only
  have stated dates (2027–2050, nine pages) are titled "Dates stated for
  2027" and say "No dated records for 2027. The records state dates for it,
  listed below." A stated date kept only in words, with no year, is not
  listed (the limits say so).
- **Intervals**: a record with an interval appears in its start and end
  years; when both fall in one year, once, as "2025-03 → 2025-09".

## Rules as implemented

- Generated from data only: dates, counts, statements, names and marks come
  from the records; the fixed wording is in `src/reading/chronicle.ts`.
  `src/domain/chronicle.test.ts` fails on trend or cause words (the compute
  and edition guides' lists together, with "turning point", "milestone",
  "landmark", "breakthrough", "rise of", "decline", "trend" and others) in the
  fixed wording and in the rendered pages' own text; the browser test checks
  the same on the page.
- Dates keep their kind; a month- or year-precision date is never shown on a
  day and sits under its month or year (tested on every year page).
- Target and stated future dates are kept apart (tested: no record listed
  among a year's records has a date after the latest check; every stated
  entry's date comes from the record's stated dates or is after the check).
- An announcement keeps its basis ("announcement") and stated stage.
- Contested and unresolved records show their status (tested).
- Unknown dates place nothing; an interval appears in its start and end
  years (one entry when both fall in one year).

## Integration

- **Addresses**: `/years`, `/year/<yyyy>`, `/year/<yyyy>-<topic>` (only where
  the year has more than one topic), each with `?inspect=`. Topic pages use a
  hyphen rather than `/year/2025/governance` so that no page file
  (`year/2025.html`) shares its name with a directory (`year/2025/`), which
  hosts can answer with a redirect.
- **Pre-rendered and in the sitemap**: every chronicle page (`pagePaths`
  feeds both).
- **Start page**: "Browse by year → Every dated record, one page per year."
  under the hub cards; nothing displaced.
- **Hubs**: an entry "Browse by year" at the end of each hub's list.
- **Record pages**: the claim panel's date (on claim pages and wherever a
  claim panel opens, record pages included) adds "Records dated 2025 →" for
  each year the date places the record in ("Dates stated for 2027 →" for a
  scheduled date). Rows in record pages are whole-row
  links, so the year cannot be a link inside them.
- **Search**: a "Pages" entry per year, by its title ("Records dated 2025")
  alone, and one for the index with its description. Summaries per year were
  dropped to keep the search page within its budget.
- **Headers**: `/years` and `/year/*` added to `public/_headers` with
  `Cache-Control: no-cache`, as every other page; the headers unit test
  requires each built page to match exactly one rule. This is the only
  hosting-file change.
- **Slices**: `year` pages and `/years` have slices. Which years exist, each
  year's counts by topic and which records state a date for a year are
  computed by the build into the collection index
  (`chronicle` in `src/domain/collection-index.ts`), so a page drawn from its
  slice shows what the whole dataset gives and the index page needs no
  records.
- **New collections**: nothing to register. The chronicle reads every claim's
  date and topic; records admitted on `*-admission` branches appear on
  rebase without code changes. A new topic would need a label (the topic list
  is part of the schema).

## Measurements

On this machine (4 processors), `main` at `f56a2d6` against this branch at
`05efc06`.

| Measure                               |       `main` |                                 Branch |
| ------------------------------------- | -----------: | -------------------------------------: |
| Pages pre-rendered                    |        4,537 |                                4,676 ² |
| Slice files                           |        1,224 |                                  1,363 |
| `dist/` files                         |        6,267 |                                  6,549 |
| Pages needing the whole relation core |            0 |                                      0 |
| Pre-rendering                         |       83.1 s |                         71–90 s (runs) |
| `pnpm build`, whole                   |      185 s ¹ |                            157–167 s ¹ |
| Budget: Year (`/year/2025`)           |            — |                 362.5 of 400 KB gzip-9 |
| Budget: Years index                   |            — |                 278.8 of 305 KB gzip-9 |
| Budget: Search                        | 266.9 of 275 |                           271.8 of 275 |
| Budget: other workspace pages         |              | +4.5 to +5.8 KB each, all within limit |
| `/year/2025` HTML                     |            — |               519 KB raw, 58 KB gzip-9 |
| `/year/2025` slice                    |            — |               487 KB raw, 84 KB gzip-9 |

² +139: 65 year pages, 73 topic pages and `/years`.

¹ Run to run the build varies by about 20 s here; the branch's builds were
not slower than `main`'s. The whole build is above two minutes on both;
pre-rendering is about 75 s.

Where the workspace pages' growth comes from (gzip-9): the bundler now
puts the propositions module in a chunk of its own (+1.9 KB on every
workspace page), the collection index carries the chronicle's index
(+1.3 KB), Workspace +0.5 KB, the entry +0.3 KB; the search facets +1.1 KB
before the per-year summaries were dropped. No limit was raised; the two
new page types' limits are about 10% above their sizes. Search is the
closest to its limit (3.2 KB left).

Page-hash comparison (`scripts/page-hashes.ts`): 3,285 pages changed, all
expected: the 3,281 claim pages of dated claims (the claim panel's year
link), the start page and the three hubs. No other page changed.

## Wording to approve

Fixed text (`src/reading/chronicle.ts`, `src/ui/Chronicle.tsx`, the hub and
start-page entries, the claim panel link):

- Index title "Browse by year"; lede "Every year in which Selekoa holds a
  dated record or a stated date. Each year’s page lists its records in date
  order, grouped by topic. The counts are of records, not of events."
- "Selective: what the records hold, not a history of the year." (index: "of
  any year").
- "How this page is made":
  1. Each record keeps the kind of date its source gives: an event, a
     publication, an announcement, an effective date, a revision, a
     signature, a snapshot, or the start or end of an interval. A snapshot is
     one dated report of a state.
  2. A record dated only to a month sits under that month, before the records
     dated to a day. A record dated only to the year sits under the year,
     before the months. No day or month is added.
  3. An announcement records what a party stated. It does not show that
     anything was done, built or paid for.
  4. Dates a party states for a year are listed apart, after the records:
     targets, deadlines and terms, and dates stated in passing, such as a
     reported start of operation. So is a record’s own date that falls after
     its sources were last checked, such as a law’s date of effect. A stated
     date given only in words, with no year, is not listed.
  5. Records with an unknown date are not listed. A record with an interval
     appears in the year it starts and in the year it ends, or once, with
     both dates, when both fall in one year.
  6. Each provision of a text is a record of its own. Provisions sharing a
     text and a date are shown here as one entry, with their number, and
     listed on the text’s page; a contested or unresolved one is listed here
     on its own. The counts on this page include each provision record.
  7. The page is generated from the records, with no selection or framing by
     an editor. Coverage is uneven across years and topics: a year or topic
     with few records may be one the records barely cover.
- Stated section: "Dates stated for 2025"; "Each date as its record gives
  it, with who stated it. A target, deadline or term says what a party said
  would happen; a reported date says what a party said happened; a scheduled
  date had not been reached when the record’s sources were last checked.
  None is a dated record of what happened."; a scheduled date's label
  "Scheduled date · effective".
- Years with stated dates only: "No dated records for 2050. The records
  state dates for it, listed below."
- Side panel: "Inspect any record … The records are listed by the dates their
  sources give. Their order in a year records no connection between them."
  (on the index: "Reading the years" with the second sentence only).
- Stage labels shown after the precision: announced, proposed, reported as
  performed, plan, commitment, contract, letter of intent, term sheet,
  closed, stated as in operation, preliminary award, final award, disbursed;
  other stored stages as stored (delivered, invested, deployed, completed).
- Hub entry: "Every dated record, one page per year, in date order and
  grouped by topic, each with its date as its source gives it. Targets and
  other stated dates are listed apart from the records. Selective: what the
  records hold, not a history of any year." → "Browse the records by year →".
- Row links: statement + "Evidence ↗"; the subject's short name + "→";
  "Claim page →" (accessible name "Claim page: ‹statement›"); provisions:
  "Read them on the document’s page →".
- Claim panel: "Records dated 2025 →".

## Open questions (each with a recommendation)

1. **Strands = topics.** The brief lists governance, institutions, people
   and roles, documents and versions, papers, compute and power, the
   arguments and China. The records carry one topic each (people,
   institutions, ideas, capital, compute, governance), which covers every
   claim exactly once and needs no upkeep. Documents and versions, papers
   and arguments fall under governance and ideas; China is a scope across
   topics with no field of its own (a rule by country or entity would be an
   editorial decision). Recommendation: keep topics; consider a China filter
   later only with a written membership rule.
2. **Provision grouping.** Recommended as built (324 → 54 entries in 2025).
   The alternative lists every provision record (2025: 772 rows).
3. **Years with stated dates only** (2027–2050, eight pages). Recommended:
   keep, since the page says plainly there are no dated records. The
   alternative lists those stated dates only under the year of the record
   that states them.
4. **Scheduled dates** are judged against the latest check of each
   record's own evidence, not the build date or the dataset's latest check,
   so a page stays a function of the data and an unrelated admission never
   turns a scheduled date into a record. Once a record's sources are checked
   after its date, the date is listed as a record; the record should then
   say whether it took effect. Recommendation: keep.
5. **Document version dates** (`documentVersion.publishedAt` etc.) are not
   separate entries: each version's dates already appear through its
   publication, revision and effective-date claims. Recommendation: keep.
6. **Topic page addresses** `/year/2025-governance` (see Integration).
   Recommendation: keep; `/year/2025/governance` would need a check of how
   the host answers a path that is both a file and a directory.

## Machine review

A fresh-context review by five reviewers (domain, integration with slices
and navigation, wording, interface and no-script use, tests), each finding
checked by two independent refuters asked to disprove it (51 agents, same
model family as the author; no person reviewed the code or the wording).
Fifteen findings survived and were fixed in `ef43312`:

- scheduled dates judged against the dataset's latest check (an unrelated
  admission would have turned `ny-ch96-effective-date` into a 2027 record);
  now each record's own evidence;
- years with stated dates only titled and introduced as "Records dated …"
  with a self-contradicting lede;
- stated dates kept only in words dropped silently (now stated in the
  limits);
- an interval within one year lost its end date;
- the stated-dates note described every date as a forecast, though reported
  past starts are listed too;
- stage "operational" labelled "stated as in production" (now "stated as in
  operation");
- the provisions limit said "counted as one entry", contradicting the
  counts;
- the claim panel linked a scheduled date as "Records dated 2027";
- the index's side note invited readers to select statements it does not
  have;
- hundreds of identical "Claim page →" link names;
- tests: the browser link check could not fail (the preview server answers
  any path), the seeding test did not seed, status and stage checks were
  thin, and precision was checked by restating the code.

Rejected by both refuters: grouped provisions hiding inferred records,
dropping the compute guide's stage wording, record links rendered as
buttons for subjects without pages, link targets on phones, the stated
section's position on long pages, and the hydration sample's coverage of
provision entries.

## Checks run

- `pnpm -s check` at `05efc06`: format, lint, typecheck, 81 test files /
  748 tests passed, build with budgets passed (the hydration test samples
  every 40th year page and `/years`; the build draws every page from its
  slice, both snapshots, and checks its title).
- `pnpm -s check:privacy`: passed before each push.
- Unit: `src/domain/chronicle.test.ts`, 15 tests (every dated record placed
  once per year its date gives; kinds and precision as stored; month/year
  headings; stated and scheduled dates apart; counts; seeding; addresses;
  search entries; every unsettled record's status; announcement and stage
  labels; stated-only years; no trend or cause words in fixed text or
  rendered pages).
- Browser, full suite through an untracked Chromium config (deleted
  afterwards), port 4173 free: 275 passed, 1 failed:
  `slice-navigation.spec.ts:233` ("a page opened beneath a cursor that has
  not moved loads nothing more"), which hovers the first `summary, button`,
  the header's hidden search button at 390 px. That line is the one
  `fix-slice-nav-cursor-test` replaces; it was not run on `main` here and
  is not changed here, to avoid overlapping edits. `tests/browser/chronicle.spec.ts` (6 tests): start
  page → index → year → topic, each opened from its slice only and drawn as
  a fresh load; hubs, claim panel and search links; every link on five
  chronicle pages resolves to a built file (460+); axe on `/year/1955` and
  `/years`; no horizontal scroll at 1440 and 390 px; claim panel inline on a
  phone; without scripts, years, topics, steps and claims are real links.
- Inspection at 1440 and 390 px (`/years`, `/year/2025`, `/year/2050`,
  `/year/1955`, an open claim panel, the start page): found the phone
  overflow from long record names, a repeated count in the opening and an
  undersized start-page link; all fixed. Console: only the analytics
  beacon's CORS refusal on 127.0.0.1, which the test fixtures stub.
