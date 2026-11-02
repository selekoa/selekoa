# Archive retrieval of held sources: maintainer decisions applied, 2026-11-02

Applies the maintainer's decisions of 2026-11-02 on Codex's retrieval of the
held archive sources,
[`research/archive-fetch-held-2026-11-02/report.md`](../research/archive-fetch-held-2026-11-02/report.md)
(and `report.json`, branch `codex/archive-fetch-held` at b5a7574, brought in
unchanged). Branch `archive-fetch-apply` from `main` at cae26ec (v0.25.0).
Release **v0.26.0** (minor): new records and collection versions; schema
unchanged (2.29).

## Decisions applied

1. **Held re-check roles 55, 70, 89, 110, 113, 119, 122, 125, 132.** One
   record per proposition for the earlier held text, with the stance of the
   re-check's verdict (`review/earliest-located-recheck-2026-11-02.md`), as
   `review/recheck-decisions-2026-11-02.md` did; the headline moved to it and
   its `underRecheck` entry cleared. The report found every passage and
   verified it verbatim, and set none aside as missing the criterion, so no
   role stays held.
2. **Machine succession widened to 1863** (version 6): title
   "…, 1863–2026", question, scope note, a search-note entry for Butler's
   letter saying that 1863–1979 was not searched, and the axis. No
   "antecedent" label.
3. **W07.** Land's "Pythia Unbound" (2013-09-11, capture 20130914051121) is
   the earliest located articulation; "Against Orthogonality", "Stupid
   Monsters" and "Will-to-Think" are further articulations. Four document
   entities and four sources (author Nick Land; the page's label "admin" and
   the basis of the attribution are stated in each source and record). The
   withheld role (`proposition.withheld`) is removed; Taylor's relay stays an
   articulation, and its qualification now says the posts are recorded. Only
   the report's machine-intelligence passages are quoted; none advocates
   violence.
4. **PA-29.** `lg-xai-founding-stated-2023` (`founding_stated`, "12 July 2023
   (formation announced)") on a new source, `source-xai-announcing-2023`, the
   x.ai homepage captured 2023-07-12, quoting "Today we announce the formation
   of xAI." Dated by the announcement; not an incorporation date. xAI now has
   a founding record for the 2023 Institutions page.
5. **PA-22.** Resolved without a data change. The report's identity check
   confirms the cited biography is Jan Leike's (`source-leike-bio`, capture
   20260917114120), not John Schulman's (the name in the brief was a
   mismatch). Its wording is open-ended and present tense ("I lead the
   Alignment Science team at Anthropic."); "until the beginning of 2026" is
   absent from the page. `leike-anthropic-alignment-science` already records
   an open-ended self-description with an unknown date, so no correction is
   needed. A later version's end date is not projected into these bytes.

**Result:** 9 headlines moved and W07's withheld headline set. **18 headlines
remain under re-check** (was 27): role 106 (quotation limit), the
reclassifications 39, 102, 105, 160, 165, 169, 174, the sense or precision
questions 81, 99, 139, 173, the criteria 65, 66, 162 and the undecidables 5,
112, 126.

## Method

- **No retrieval here.** This cloud session cannot reach web.archive.org or
  Papers Past. Every quotation is a passage span the report gives verbatim,
  under its role, with the capture, HTTP status and SHA-256 of the response
  body. The report is the cross-family retrieval for these records, and each
  evidence note cites it, the capture and the hash, and says that the passage
  was not retrieved again here.
- **Spec and data.** `scripts/archive-fetch-apply-spec.py` builds
  `review/archive-fetch-apply-2026-11-02.json` from `report.json`;
  `scripts/apply-recheck.ts` applies it. `--verify` checks that each of the 16
  quotations is a span of the report under its role, appears in
  `report.md`, is at most 50 words, and that its capture answered 200 with
  the hash the report prints. Before-snapshot
  `review/archive-fetch-apply-before-2026-11-02.json`, first in the chain in
  `src/editorial/historical-views.ts`.
- **Dates** carry the kinds the report states. A page-update date becomes the
  record's date (`basis: revision`), a copyright or displayed creation date
  becomes `claimed`, and the capture becomes `attested`, which decides the
  headline. Drexler's record is dated 1997-04-01 (page footer), claimed 1986
  (copyright), attested 1997-07-09; the 1986 printing is not compared, so the
  wording is not backdated to it. "Staring into the Singularity" 1.2.1 is
  dated 2000-08-31 (displayed update), claimed 1996-11-18 (displayed
  creation), attested 2000-12-04. Butler is dated 1863-06-13 from Papers
  Past's issue record (masthead not inspected); his passages were compared
  with the 2024 column-image captures. Hanson is dated 1998-06, attested
  1999-01-28 (bytes match the source's hash). Land's posts are dated by their
  displayed posting dates and attested by their captures.
- **Quotation limits** hold for every source (validation). Butler's letter
  now carries 155 of 185 quotable words; the W02 and W08 records share one
  passage.
- **Collections.** Versions raised: risk debate 6 (search-note entry for
  Drexler's web edition in "Texts of 1993 to 1997"; R07, R09 corrections),
  Yudkowsky's arguments 5 (Y13), machine succession 6 (period, W01, W02, W05,
  W08, W09, W07), economics 6 (G04). Each move is a correction entry; each
  collection's methods name the archive retrieval.

## Points for the maintainer's review

- **Role 119 (W05).** The report notes that the trillions-fold figure is for
  the neuron-equivalents of a visual cortex, not overall intelligence, and
  that the cognitive-capacity reading rests on the adjoining passage. It did
  not say the passage fails the criterion, and the re-check's verdict was a
  move, so the record is admitted with that limit in its qualification and
  in the collection's gaps. Withdraw the headline if the criterion's "overall
  cognitive capacity" should exclude it.
- **Role 89 (Y13).** The passage contests the premise that AGI can be known
  to be decades away; the essay's aim is to bring about the Singularity, not
  the later safety position. The qualification says so.
- **Records of the same text with different dates.** The new Drexler and SITS
  records are dated by the page versions the report establishes; the
  dataset's older records of the same texts (`ts-b6-drexler-1986-contests`,
  `ts-a5-sits`) keep 1986 and 1996-11-18 with an attested date. Both orders
  agree, since the attested date decides. Not changed here.
- **Land attribution.** The posts show the author label "admin". They are
  credited to Land as his blog's posts, as Taylor's review attributes them;
  the report did not establish the account's identity.
- **Audit follow-up.** With xAI's own page now held, `pnpm audit:consistency`
  reports 13 records of the July 2023 launch and roster that rest only on
  reporting (`secondary-only-actor-source-same-day`, medium). The capture
  carries the team list; added to `docs/backlog.md` (D25).

## Per-item table

Records are seeds, machine checked; no human editorial review.

| Item     | Proposition (collection)            | Headline                    | Before → after                                                                  | Basis                                                                                                                                         |
| -------- | ----------------------------------- | --------------------------- | ------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Role 55  | R09 misuse (risk debate)            | Earliest located            | Under re-check → `rd-r09-drexler-1986-engines-of-destruction`                   | Articulates; 1997-04-01 (revision), claimed 1986, attested 1997-07-09; 1 passage, "Engines of Power". Before: Bostrom 2002.                   |
| Role 70  | R07 extinction (risk debate)        | Earliest located            | Under re-check → `rd-r07-drexler-1986-engines-of-destruction`                   | Articulates; dates as role 55; 2 passages (introduction; "The Threat from the Machines"). Before: Joy 2000.                                   |
| Role 89  | Y13 (Yudkowsky's arguments)         | Earliest located contesting | Under re-check → `yk-y13-staring-into-the-singularity-c`                        | Contests (engages premise); 2000-08-31 (revision), claimed 1996-11-18, attested 2000-12-04; section 3. Before: 2006 draft.                    |
| Role 119 | W05 (machine succession)            | Earliest located            | Under re-check → `ht-w05-yudkowsky-2000-staring-into-the-singularity`           | Articulates; dates as role 89; 2 passages, section 2.1; visual-cortex limit stated. Before: Kurzweil 2001 (attested 2001-11-07).              |
| Role 110 | W01 (machine succession)            | Earliest located            | Under re-check → `ht-w01-butler-1863-darwin-among-the-machines`                 | Articulates; 1863-06-13 (publication); image segment 5. Before: de Garis 1989.                                                                |
| Role 113 | W02 (machine succession)            | Earliest located contesting | Under re-check → `ht-w02-butler-1863-darwin-among-the-machines`                 | Contests (engages premise); 1863-06-13; image segment 5. Before: Joy 2000.                                                                    |
| Role 122 | W08 (machine succession)            | Earliest located contesting | Under re-check → `ht-w08-butler-1863-darwin-among-the-machines`                 | Contests (engages premise); 1863-06-13; same passage as role 113. Before: Joy 2000.                                                           |
| Role 125 | W09 (machine succession)            | Earliest located            | Under re-check → `ht-w09-butler-1863-darwin-among-the-machines`                 | Articulates; 1863-06-13; image segment 3. Before: Moravec, "After Life" 1989.                                                                 |
| Role 132 | G04 (economics)                     | Earliest located (tier 1)   | Under re-check → `ec-g04-hanson-1998-is-a-singularity-just-around-the-corner-a` | Articulates; 1998-06 (publication), attested 1999-01-28; tier 1 as the source's other records. Before: Nordhaus 2015.                         |
| W07      | W07 (machine succession)            | Earliest located            | Withheld → `ht-w07-land-2013-pythia-unbound`                                    | Articulates; 2013-09-11, attested 2013-09-14. Taylor's relay (2024) unchanged as an articulation, qualification updated.                      |
| W07      | W07                                 | —                           | Not recorded → 3 articulations                                                  | "Against Orthogonality" 2013-10-25 (attested 2013-10-28), "Stupid Monsters" 2014-08-25 (2014-10-13), "Will-to-Think" 2014-09-15 (2014-09-17). |
| Period   | Machine succession                  | —                           | 1979–2026 → 1863–2026 (version 6)                                               | Decision 2; Butler is the only text before 1979; 1863–1979 not searched.                                                                      |
| PA-29    | xAI (institutions, year 2023)       | —                           | No founding record → `lg-xai-founding-stated-2023`                              | Announcement dated 12 July 2023 in the capture of that day; not incorporation.                                                                |
| PA-22    | `leike-anthropic-alignment-science` | —                           | Unchanged                                                                       | Identity: Leike, not Schulman. Capture 2026-09-17 wording open-ended; no "until" phrase. No correction.                                       |

## Checks

On `archive-fetch-apply`:

- `python3 scripts/archive-fetch-apply-spec.py --verify`: 16 of 16
  quotations are spans of the report with a 200 capture and its hash.
- `pnpm tsx scripts/apply-recheck.ts --spec review/archive-fetch-apply-2026-11-02.json --check`:
  stored records match.
- `pnpm validate:data`: 2,133 entities, 5,830 claims, 2,013 sources, 7,950
  evidence.
- `pnpm audit:consistency`: no high findings; 13 new medium findings, the xAI
  roster follow-up above, and one info (quotation headroom).
- `pnpm docs:coverage`: block regenerated in `docs/development.md`.
- Unit tests: 909 passed, 1 skipped.
- `pnpm check`: format, lint, typecheck, 912 unit tests, build, bundle
  budget (no limit raised).
- `pnpm release 0.26.0 --check`: reproduces byte for byte.
- `pnpm check:privacy`: passed.
- Full browser suite in two batches with a local Playwright config using the
  bundled Chromium instead of the msedge channel (deleted afterwards; port
  4173 left free): 100 passed and 225 passed.
