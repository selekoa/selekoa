# Flagship reading: frontier AI frameworks and law, 2023–2026

The governance spine's flagship reading page, at `/guide/frontier-frameworks-and-law`. It brings together the records on developers' safety frameworks and on the laws and government texts that address developers of frontier or general-purpose models, as admitted in dataset release v0.11.0. No data record, schema or release changes; the page is an arrangement of existing records.

- **Definition:** [`src/reading/frameworks-and-law.ts`](../src/reading/frameworks-and-law.ts), registered in [`src/reading/guides.ts`](../src/reading/guides.ts).
- **Projection:** [`src/domain/frameworks-law.ts`](../src/domain/frameworks-law.ts), pure, with tests in `frameworks-law.test.ts`.
- **Page:** [`src/ui/FrameworksLaw.tsx`](../src/ui/FrameworksLaw.tsx) and `frameworks-law.css`.
- **Export:** a research starter (Markdown and JSON, with a bibliography file), [`src/domain/frameworks-law-starter.ts`](../src/domain/frameworks-law-starter.ts).
- **Editorial state:** machine-proposed selection and framing. No human review of the selection or framing is recorded, and the page says so.

## What the page shows

In page order, as built on 2026-10-29 against v0.11.0:

1. **Header.** Title, the question, the machine-selection notice, the research-starter download, a copy-link control and links to the framework comparison, the document histories and the external commitments page. A table of contents follows.
2. **What the page covers.** One computed sentence of scope (22 framework editions of 7 frameworks, 60 laws and government texts, 2023 to 2026) and one authored sentence on where the texts come from. Five short passages follow: binding duties (EU, China), laws requiring a framework (SB 53, the RAISE Act), the Code of Practice as a compliance route, US federal revocations and preemption moves, and voluntary texts (UK memoranda, the Hiroshima code, the King's Speeches). Each passage lists its records as inspect links; every factual sentence rests on them. A legend explains the ten standings and the four computed changes.
3. **Limits of this page** (collapsed): four limits, among them that a framework or legal duty is never evidence of compliance, and that the page records no cause or influence between texts.
4. **Timeline.** 114 rows in date order, grouped by year: 22 framework-edition rows and 92 on laws and government texts. A row is one text, one kind of record and one date; records of the same kind on the same date share a row (for example the Commission's three statements dated by its Opinion). Each row shows the date as stored, its precision when coarser than a day, its kind (event basis, snapshot, date set by the text, or document record), a label, a jurisdiction tag, the text (a link to its document page) and its records (inspect links). Framework rows also say which texts the edition names. A filter shows everything, framework editions only, or laws and government texts only.
5. **Six sections:** European Union (9 texts), China (7), US federal government (15, plus four records of the US AI Safety Institute's and CAISI's agreements and reported work with Anthropic and OpenAI), US states (8), United Kingdom (9), and the summits, the G7 and the OECD (12). Each text shows its standing, any computed change (revoked, revocation announced, vetoed, later version recorded) with its records, its form (`subtype`) and publisher, the records that show its standing, its dated records, the framework editions that name it, citations to and from it, version changes, its provisions (collapsed, by kind), and links to the exact text, an archived copy where recorded, and its document page. The four commitment texts link to their signatory records on the commitments page instead of repeating them.
6. **What frameworks say about law.** A table: one row per framework family, one column per text named (White House commitments of July 2023, Seoul commitments, EU AI Act, EU Code of Practice, California SB 53, New York RAISE Act), each cell listing the editions with their own link wording ("States that it fulfils", "Names" and others). 25 statements.
7. **Not covered.** Twelve items in four groups, each with its records: outside the page's bounds (compliance and legal application, the selection of provisions, other jurisdictions), held at admission (GB 45438-2025 scope), gaps in the records (developers' compliance documents, Michigan status after 23 March 2026, the Illinois Act's text, texts known only from announcements, declarations recorded as citations) and retrieval limits (EUR-Lex, the Commission's library page, the Internet Archive, the CAC site).

## Design choices

- **Timeline as a list, not a chart.** A dated list with year headings carries every date's kind and precision, works by keyboard and screen reader, and needs no separate list equivalent. A dot chart would have suggested density or trend, which the maintainer's framing decision rules out.
- **Two lanes, one order.** Framework rows carry a green rule; government rows a grey one; a dashed rule marks a date after the latest evidence check. The filter is the only interaction; there is no animation.
- **Progressive disclosure.** Provisions and version changes are collapsed per text, so a reader can scan standing and dates first. The legend and limits are on the page once each, not repeated per text.
- **Inspector integration.** Every date, standing record, badge, link cell and provision opens the claim in the existing Evidence Inspector. On a phone the inspector opens directly below the row, as on the other reading pages.
- **Address.** A new address kind, `/guide/<id>`, for readings that combine several collections. It is pre-rendered, in the sitemap, and covered by a no-cache rule in `public/_headers` like every other page family. `llms.txt` lists the new address pattern.
- **Not a release collection.** The definition is not added to `applicationCollections`: that would change the release input fingerprint and require a release. See open question 3.

## Editorial decisions made

- **Neutral framing.** The title, question, passages and limits state no trend, cause or response. A unit test fails if the page's own text contains "caused", "led to", "in response", "responded", "because of", "triggered", "prompted", "shift from" or "from voluntary". Framework link wording such as "States that it responds to" comes from the records' link types and is attributed to the edition.
- **Standing is chosen from records, never inferred from proximity.** Each text has one standing and the records that show it; the projection fails if a standing record is about none of the page's texts. Revocations, announced revocations, vetoes and later versions are computed from `revoked`, `vetoed` and `changes_from` records, never authored.
- **Announcements stay announcements.** A record dated by an announcement is labelled "Announced", "Signing announced", "Revocation announced" or "Agreement announced"; a unit test checks every row. The New York RAISE Act as described by the Governor, the Illinois Act and the UK–US memorandum have the standing "Known from an announcement".
- **Dates keep their kind.** Event bases (signature, publication, announcement, effective, revision), snapshots and dates a text sets for itself (`states_provision` with basis `effective`) are kept apart. New York's Chapter 96 date of 1 January 2027 is shown as set for a date after the latest check. A document record's publication date appears only where no record of that text has the same date, labelled "document record" (the AI Act's Official Journal publication, for example).
- **Signatories stay on the commitments page.** Signatory records of the four commitment texts are not repeated in the timeline; their sections link to the commitments page.
- **Declarations' citations are not framework links.** As decided at admission, the G7 and Seoul texts' references to commitment texts are `cites` records; they appear in their sections as citations and not in the framework-link table.
- **Not covered is drawn from the two admission records** of 2026-10-28 and the scope note. "Other jurisdictions" names Japan, South Korea, Canada and India as examples; the dataset holds no national law of these four.

## Wording for the maintainer to approve

1. **Title:** "Frontier AI frameworks and law, 2023–2026". Alternatives: "Frontier AI safety frameworks and the law, 2023–2026"; "Frameworks, laws and government texts on frontier AI, 2023–2026".
2. **Question:** "What did frontier AI developers' safety frameworks say, what did laws and government texts on frontier or general-purpose models state, with what standing and when, and which frameworks name which texts?"
3. **Standing labels:** Binding text; Law requiring a framework; Voluntary code with a legal role; Executive order; Voluntary; Memorandum; Declaration or statement; Bill, draft or proposal; Guidance, report or plan; Known from an announcement. Assignments that need a judgement:
   - the BIS AI diffusion rule (an interim final rule, published with an effective date) as a binding text, with its announced rescission shown;
   - GB 45438-2025 as a binding text, because the national standards catalogue lists it as mandatory; GB/T 45654-2025 (recommended) as guidance;
   - the Google DeepMind memorandum as "Memorandum", because no recorded provision says whether it binds (the Anthropic, Cohere and OpenAI memoranda say they do not);
   - the Hiroshima reporting framework as voluntary, on the OECD page's description of it as a structure for organisations to report on their alignment.
4. **Hub entry and start-page example.** The governance hub lists the page third, after the comparison, as "Guided reading"; its text names the standings in brackets. The start page's governance card gains a fourth example question: "Which laws and government texts address frontier AI developers, with what standing, and which frameworks name them?"
5. **"Later version recorded"** on the White House commitments of July 2023: the September text is recorded as a version of the same family with a recorded change, though it is a second round with other companies. Say if a different label is wanted.

## Open questions

1. **The existing research question's title.** The question starter at `/question/frameworks-to-obligations` is titled "From voluntary frameworks to legal obligations: how did frontier-AI developers' self-governance change, 2023–2026?" and appears on the start page next to this page. It uses the framing this page avoids. It is unchanged here; retitling it is a separate decision.
2. **Address kind.** `/guide/<id>` is new. Say if another prefix is preferred before the page is linked from outside.
3. **Release.** Registering the definition as a release collection would make the next release a minor one. Until then the research-starter export carries the definition and its fingerprint.
4. **Deploy.** The page is public once this branch is merged to `main`.

## Inspection of the built page

Production build served by `vite preview`, inspected in headless Chromium at 1440×1000 and at 390×844 (phone). Screenshots were taken in the session's scratch space and are not committed. What they showed:

- **Desktop, top.** The header reads "Guided reading · 22 framework editions · 60 laws and government texts · 25 framework links" above the serif title. The question, the machine-selection notice, "Download research starter" and "Copy link to this page" follow, then the related links and a ten-item table of contents. The reading guide sits in the right column.
- **Desktop, timeline.** The explanatory note, the three-way filter ("Everything" selected) and "114 rows: 22 framework editions, 92 on laws and government texts." Year heading 2023, then rows such as "2023-07-10 · publication · ISSUED [China] China generative AI interim measures (2023) Inspect record ↗" and "2023-09-19 FRAMEWORK EDITION Anthropic · Responsible Scaling Policy, v1.0 · Names: White House commitments (July 2023)" with a green left rule. Document-record rows (the Hiroshima code, 2023-10-30) show "document record" under the date and no inspect link.
- **Desktop, European Union.** The EU AI Act card shows "Binding text", "Regulation (EU law) · Publisher: European Parliament and Council of the European Union (as legislators)", two standing records, then "Signed 2024-06-13 · signature", "Published 2024-07-12 · document record" and "Takes effect: date fixed by the text's rule 2024-08-01 · date set by the text · effective", the two framework editions that name it, "What the text states · 36 provisions recorded" (collapsed) and the exact-text, archived-copy and document-page links. The initial draft of the Code shows "Bill, draft or proposal" and one "Later version recorded" badge with two record links.
- **Desktop, framework links.** A seven-row table with six text columns; Anthropic's row lists v1.0 to v2.2 under the White House column, v2.0 to v2.2 under Seoul and v3.0 to v3.4 under SB 53; Google DeepMind's row is all dashes.
- **Phone.** No horizontal scroll at 390 px. The header wraps to two lines; the timeline rows stack the date above the label; selecting a row's record opens the Evidence Inspector directly below it, with the claim, its badges, dates and scope. The US federal section's cards and the "Not covered" list read in one column; the link table scrolls sideways inside its frame.
- **Hub and start page.** The governance hub shows the new "Guided reading" entry after "Compare frameworks"; the start page's governance card shows the new question as its fourth example, below the existing three.
- **Console.** No errors from the page. The only console errors in the unstubbed screenshot run were the analytics beacon's CORS refusals from 127.0.0.1, which the browser test fixtures stub.

## Checks

- `pnpm -s check`: passed (format, lint, typecheck, 66 unit-test files with 635 tests, build with 4,022 pages pre-rendered; the page is in `sitemap.xml`).
- `pnpm -s check:privacy`: passed before each push.
- Unit tests: `src/domain/frameworks-law.test.ts` (11 tests: address and pre-rendering, one entry per text, all 22 editions in the timeline, stored dates unchanged and in order, stated and future dates, announcements, computed revocations and vetoes, every framework link once, every passage's records, no causal or trend wording, the starter export).
- Browser tests: `tests/browser/frameworks-law.spec.ts` (3 tests: reached from the governance hub, the timeline's order, lanes, announcement and future markers, keyboard inspection, standings, the link table, every internal link on the page resolving to a built page, an axe scan of the page and no console errors; the start-page entry and the phone layout with the inline inspector and no horizontal overflow; the page pre-rendered without JavaScript). Run through an untracked Playwright configuration without `channel: 'msedge'`, deleted afterwards. Full suite against the production preview: 209 of 209 passed, the three new tests among them.
