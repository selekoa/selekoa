# Guided reading: AI compute, data centres, power, chips and rules (2026-10-31)

A third guided reading, at `/guide/ai-compute-2023-2026`, built from the compute, power and chip records admitted in v0.13.0 and v0.14.0 ([part 1](cpo-admission-1-2026-10-30.md), [part 2](cpo-admission-2-2026-10-30.md)). No data record, schema or release changes. Every date, figure, stage and stated date on the page is computed from the records the definition lists.

- **Definition:** [`src/reading/compute-buildout.ts`](../src/reading/compute-buildout.ts), registered in [`src/reading/guides.ts`](../src/reading/guides.ts) as `computeGuides`.
- **Projection:** [`src/domain/compute-buildout.ts`](../src/domain/compute-buildout.ts), pure, with tests in `compute-buildout.test.ts`.
- **Page:** [`src/ui/ComputeBuildout.tsx`](../src/ui/ComputeBuildout.tsx) and `compute-buildout.css`; it reuses the timeline and legend styles of the frameworks-and-law guide.
- **Hub:** the compute strand sits in the **institutional history** spine, so the page is listed on the Institutions & people hub (`/institutions`), and the header marks that hub as current. Basis: decision 6 of the [pack report](compute-power-orbit-pack-2026-10-28.md) (“Plans, launches and filings go in the institutional history spine's compute strand”); the orbit arguments went to the thought spine.
- **Editorial state:** machine-proposed selection and framing. No human review of the selection or framing is recorded, and the page says so.

## What the page shows

In page order, as built on 2026-10-31 against `main` at `754ce57`:

1. **Header.** Eyebrow “Guided reading · 140 records · 55 stated dates”, title, question, the machine-selection notice and a copy-link control. A table of contents follows.
2. **What the page covers.** One computed sentence of bounds (140 records in 5 sections, dated 2023 to 2026, 81 figures, 55 stated dates), the authored bounds sentence, four orientation passages (sites, power, chips, government), each with its record links, and a legend of how to read a record (date, stage, figure, stated dates).
3. **Limits of this page** (collapsed): five limits.
4. **Timeline.** One row per record, 140 rows from 2023-05-10 to 2026-10-28, grouped by year. Each row: the record's own date as stored and its basis (91 announcements, the rest publication, signature or effective dates; one snapshot), the kind of record and stated stage, an “Announcement” tag on every record dated by an announcement, the section tag, the record's statement, the parties and an inspect link. No row is dated by a stated date.
5. **Stated dates: targets, deadlines and terms.** The 55 stated dates, apart from the timeline, grouped by the year stated (five give no year, such as “early 2030s”), each in the source's words where no date expresses them, with its kind, who stated it, the record's own date and a record link.
6. **Five sections**, each with groups; every record as a row with its stated stage, its figures and its stated dates:
   - **Data-centre projects** (43): sites announced 16, capacity stated in plans 12, status as stated 6, spending plans 9.
   - **Power** (25): power agreements 19, regulator decisions 4, plans announced 2.
   - **Chip supply** (25): supply agreements 8, compute commitments and investments announced with them 6, chip manufacturing and plans 11.
   - **Government measures** (27): US federal 12, Texas 2, UK 5, EU 4, China 4.
   - **Export controls** (20): BIS 14, MOFCOM 6.
7. **Compute in orbit.** One sentence and a link to “Arguments about compute in orbit”; the propositions are not repeated.
8. **Not covered.** Four groups: outside the page's bounds (orbital plans, launches and filings; compute records admitted earlier; the AI diffusion rule, which is on the frameworks-and-law guide; outcomes no record measures), held at admission (NVIDIA's H20 statements; ADA Space's launch statement), retrieval limits (the four sources read only in captures by the cross-family check), and how figures were coded (measures coded by rule; “not stated”).

## Design choices

- **Selection is the pack, by rule.** The page places every `cpo-` record that is not an orbit record (`cpo-orb-`) exactly once; a unit test fails if one is added or dropped. Sections and groups are authored; order within a group is by the record's date.
- **Dates.** A row's date is the claim's `time.date` and nothing else. Regulator decisions are rows like any other, so each is dated by its own record: FERC 2024-11-01 (its order), Shelby County 2025-07-02 (the permit), Louisiana PSC 2025-08-20 (the order's decision date). See open question 3 on the NRC record.
- **Stated dates** are a separate list, never rows, with the Inspector's heading wording “targets and terms, not events”. In section rows they follow the figures under the same label.
- **Figures.** One line per stored figure: the value and the unit exactly as stored (the unit keeps the source's wording), then the bound (“up to”, “about”, “more than”, “as stated, with no bound”, or “not stated” where none is stored), what it measures (`quantity.measures`, “not stated” where the code is `not_stated` or where a megawatt or gigawatt figure has no code), and for amounts the scope and its stated basis. 54 quantities and 27 amounts: 26 power figures are “not stated”, 9 generation capacity, 4 each facility power, power to the grid and contracted energy, 2 number of chips; 5 counts (shares, turbines, a percentage) show no measure line, since their unit says what they count. A range keeps both ends (Meta's “1–4 GW”). Amounts above a billion are written in billions only where exact to three decimals (“USD 5.695 billion”), otherwise in full; no figure is converted, added or compared, and the page computes no total.
- **Investors.** An amount whose scope is a round's total would read “a round's total, not one investor's share”; none occurs. The Microsoft and NVIDIA commitments to Anthropic read “one transaction: this investor's commitment”.
- **Plans and announcements.** The stage is shown as the record states it (“plan”, “letter of intent”, “term sheet”, “commitment”, “contract”, “closed”), with the source's own words where stored (“signed an agreement to explore”). A status record's heading is “Status stated”. The authored text never says a plan was carried out.
- **No trend or cause words.** The unit test checks the authored text and the rendered page's own text (statements, figures and record wording removed) against “boom”, “race”, “arms race”, “surge”, “led to”, “in response” and near relatives (“because of”, “driven by”, “spurred”, “soared”, “rush”, “accelerated” and others); it first checks that the pattern catches the brief's phrases. The browser test repeats the check on the live page.
- **Page code by address.** Every `/guide/*` page loaded both earlier guides' code. `pageCodeOf` now takes an address-specific entry first (`pageCodeById`), so this page loads only `ComputeBuildout`; the two earlier guides are unchanged.
- **Slice and budget.** The page is drawn from its slice alone (255 KB raw), with no relation core; the build's hydration identity check passes for both snapshots. New budget entry “Compute guide”: 310.0 KB measured, limit 340 KB. The built HTML is 444 KB (58 KB gzipped).
- **No research starter.** The brief did not ask for one; see open question 5.
- **Not a release collection**, like the edition-by-edition guide, so `pnpm release` inputs are unchanged.

## Wording for the maintainer to approve

1. **Title:** “AI compute: data centres, power, chips and rules, 2023–2026”. The working title “The AI compute build-out, 2023–2026” was not used: “build-out” reads as building done, while 91 of the 140 records are announcements and most figures are plans. Alternatives: “Data centres, power, chips and export rules for AI, 2023–2026”; “Building AI compute: the records, 2023–2026”.
2. **Address:** `/guide/ai-compute-2023-2026`, kept stable if the title changes.
3. **Question:** “Which data-centre sites, power agreements, chip supply agreements, government measures and export-control rules for AI computing do the records document from 2023 to 2026, with what figures, at what stage and dated by what?”
4. **Hub entry** on Institutions & people, after the dossiers: eyebrow “Guided reading”, the title, a four-sentence description, and the action “Read the compute records →”. No start-page example question was added.
5. **Section and group headings**, the four orientation passages and the five limits, in `src/reading/compute-buildout.ts`.
6. **Record-kind labels** (“Site announced”, “Capacity stated in a plan”, “Status stated”, “Spending plan”, “Power agreement”, “Regulator decision”, …) and stage labels (“plan”, “commitment”, “contract”, “stated as in production” for NVIDIA's “operational” Blackwell production record) in `src/domain/compute-buildout.ts`.
7. **Not-covered texts**, drawn from the admission records' “Held” tables, “Resting on the cross-family check” and part 2's open item 2.

## Open questions

1. **Orbital plans, launches and filings** (the `cpo-orb-` records other than the propositions) are listed under “Not covered” with three example links. A short sixth section, “Compute in orbit: plans and filings”, would show them on the timeline without repeating the arguments. Recommended if the page should cover the whole pack.
2. **Earlier compute records** (OpenAI–Oracle 4.5 GW, Stargate I deliveries, CoreWeave, the Anthropic–Google and Anthropic–Amazon capacity records; about 40 claims with topic `compute`) are not on the page. Adding them would make it the compute strand's full timeline but needs a selection rule across admissions.
3. **NRC record, possible data defect.** The admission record (part 2, item 34) says the Crane record became “the NRC's own record”, dated 1 July 2026 by Amendment No. 307. The stored claim `cpo-pw-crane-nrc-fuel-amendment` still has Constellation's statement, the date 2026-08-06 (basis announcement) and the qualification “the NRC approval document was not retrieved”, although its evidence now includes the NRC facility page quoting “By Amendment No. 307, dated July 1, 2026”. The map entry in `review/cpo-admission-map-2026-10-30.json` holds the corrected text as a one-item array, which the admission script appears not to have applied. The page shows the record as stored. Correcting it is a data change for a separately authorised task.
4. **Stage label for `operational`.** NVIDIA's Blackwell record has transaction stage `operational`; the page says “stated as in production” to avoid reading it as a data centre in operation. Confirm or choose another wording.
5. **Research starter.** The two earlier guides export a starter (Markdown, JSON, bibliography). One for this page is a follow-up of moderate size; it would need the same no-sum rule for figures.
6. **Release.** Registering the definition as a release collection would make the next release a minor one; not done.
7. **Deploy.** The page is public once this branch is merged to `main`.

## Inspection of the built page

Production build served by `vite preview`, inspected in headless Chromium at 1440×1000 and 390×844. Screenshots were taken in the session's scratch space and are not committed.

- **Desktop.** Header, table of contents and orientation read as on the frameworks-and-law guide, with the reading guide in the right column. Timeline rows show date and basis on the left; kind, stage, “Announcement” and section tags, statement, parties and inspect link on the right. The stated-dates list shows wording in bold (“first half of 2025”, “end of 2025”, “Q1 2026”) with kind, party and record date. Section rows show figures in a ruled block under the statement (“50 MW (as worded: '50 MW or greater')”, “Figure: at least · Measures: generation capacity”).
- **First pass findings, fixed before the checks below.** The header marked Governance as current; it now marks Institutions & people. Stated dates read “Construction start, as stated, stated by Crusoe”; kinds are now “Construction start reported” and “Operation start reported”, and the list reads “kind · party, date”. A record whose stage is “announced” repeated “announcement” in its section heading; the repeat is gone. The timeline's basis line sat at the middle of tall rows; it now sits under the date.
- **Phone.** No horizontal scroll at 390 px. Selecting a section row opens the Evidence Inspector directly below it, with the figure's measure and stated dates.
- **Console.** No application errors. The preview logged only the blocked Cloudflare analytics beacon, which the browser tests' fixtures block.

## Checks

- `pnpm -s check`: passed (format, lint, typecheck, 78 unit-test files with 723 tests, build with 4,537 pages pre-rendered, 0 pages needing the relation core, every page type within its budget; the page is in `sitemap.xml`).
- `pnpm -s check:privacy`: passed before each push.
- Unit tests: `src/domain/compute-buildout.test.ts` (8 tests: address, pre-rendering, title and page code; not a release collection; every non-orbit pack record placed once and every linked record present; rows dated by their records, in order, and every stated date listed apart; regulator decisions dated by their own records; figures as stored, with measures, bounds, scopes and no figure in the authored text; plans and letters of intent labelled as such; no trend or cause words in the authored text or the rendered page's own text).
- Browser tests: `tests/browser/compute-buildout.spec.ts` (4 tests: reached from the institutions hub with that hub current, 140 timeline rows in date order, announcement tags, FERC dated by its order, stated dates apart, five sections, figure measures and an investor's scope, keyboard inspection, the orbit link, not covered, no trend words in the page's own text, every internal link resolving to a built page, an axe scan and no console errors; the orbit link opening the arguments page; the phone layout with the inline inspector and no horizontal overflow; the page pre-rendered without JavaScript, with its timeline, stated dates, sections and sitemap entry). Run through an untracked Playwright configuration without `channel: 'msedge'`, deleted afterwards, with the suite's own preview server on port 4173. Full suite: 249 of 249 passed, the four new tests among them.
