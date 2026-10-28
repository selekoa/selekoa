# Fresh eyes on the launched site, 26 October 2026

This repeats the first-use test of
[14 October](fresh-eyes-2026-10-14.md) on the launched site
(https://selekoa.org, dataset release v0.7.0). It uses the same three personas,
questions and method. Three simulated first-time readers, each with no prior
knowledge of Selekoa, tried to answer one research question using only the
site. They used Chromium at desktop width (1440 px) and phone width (390 px),
in light mode, as the original did. Each reader ran as a separate agent with its
own fresh context and its own browser session, so none shared knowledge with
the others. The three ran in parallel. Colour and dark mode were out of scope,
as before.

Since 14 October the site has been restructured. It now has three topic hubs,
one Search with List, Timeline and Map views, and one status line, and maps are
drawn only when they are readable (see `review/restructure-2026-10-25.md`,
`review/launch-polish-2026-10-26.md` and `review/map-followup-2026-10-26.md`).

This is a usability report. Nothing in the site or its data was changed.

Limits of the test are the same as before. The readers were simulated, not
people. They read page text and screenshots and drove a scripted browser, so
they cannot report how fast something felt or what caught their eye first.
Their judgements of clarity are a model's judgements. Click counts are as each
reader logged them, and a typed search counts as one click. One difference
from the original: this test ran against the live production site, not a local
preview. A separate session is changing the start page tonight (the tagline as
heading, a shorter "Not yet covered", one featured question). The test saw the
start page as it was before that change, and this report does not repeat those
changes as findings.

Before writing, an orientation pass confirmed the most consequential findings
directly in a separate browser session: the empty Search Timeline and Map, the
missing authors in People A–Z, the "Stabilization" author, the Summers date line,
the Yudkowsky person page and the claim panel position on the phone.

## Summary

**The restructure worked where it was aimed.** All three readers found their
entry point on the start page without clicking. Two of the hub cards' example
questions matched their questions almost word for word. All three had a first
usable answer at 1 click. On 14 October that took 1 to 3 clicks for two
readers, and the economic historian gave up after about 11 clicks without
learning from the start page that economics was out of scope. The phone header
is fully reachable. Search names collections and publishers. Every "Inspect"
button has a distinct accessible name. The provisions grid scrolls with a sticky
first column, and its row labels now fit every edition. All three readers again
described the review status correctly, and none called the notice
"wallpaper".

**What still hurts, ranked:**

1. **Search Timeline and Map lose the proposition collections.** "Yudkowsky"
   gives 169 claims in List and 2 in Timeline and Map. "Hanson" and "Acemoglu"
   give 0. This is the one thing that looks broken.
2. **The claim panel on the phone** still opens at the foot of pages 33,000 to
   83,000 px tall.
3. **Authors are not people.** The economists in the new economics collection,
   and Hanson and Bostrom, are missing from People A–Z. Person pages still lead
   with "2 RECORDED CLAIMS" for Yudkowsky.
4. **No route to contesting texts** across collections. Critics are found only
   by searching for a name the reader already knows.
5. **Codes and process wording in reader text** ("articulates M06a", "T01-e1",
   "Tier 1 by maintainer decision", "~10% cap").

New since 14 October: navigation is built from buttons without addresses, so
nothing opens in a new tab. There are two small data errors: an author called
"Stabilization", and a date line saying both "published 2023-11-29" and
"publication date unknown".

## Persona 1: historian of economic thought

**Question.** When did economics as a field start taking machine intelligence
seriously, and who were the earliest economists to write about it?

**Context.** On 14 October economics was outside the app, and that test
measured how quickly the app said so. Since then a collection, "Economics of
machine intelligence", has been admitted under Ideas & debates. This time the
question is in scope.

**Path (desktop).**

1. Start page (0 clicks). Above the fold: the status line, the three hub cards
   and the "Not yet covered" box, which says "Economics is covered only through
   the propositions in its collection under Ideas & debates." The Ideas &
   debates card offers "How did economists take up explosive growth and risk
   from AI?" The reader knew where to go without clicking.
2. That question (1 click) opens "Economics of machine intelligence": "24
   PROPOSITIONS · 323 RECORDS · 1952–2026", after about a second of "Loading the
   records…". "Known gaps" is open by default and lists what was not read: Simon's
   _The Shape of Automation_ (1965), I. J. Good, a 1931 JPE review that could not
   be retrieved, and books in general. M01's earliest located text is Walter S.
   Buckingham Jr.'s testimony as an economist at the 1955 congressional hearings
   on automation (1955-10-14), followed by Edwin G. Nourse (1955-10-28). The page
   tests the 2019 self-description that economics came to the subject late (M09)
   against the dated record from 1952 on. **First usable answer at 1 click.**
3. Expanded M09's "Texts that bear on it without meeting the criterion (25)" (2
   clicks). This gave the chronology: the 1955 hearings, Bowen and Mangum
   (1966), Mansfield (1966), Nilsson (1984), Leontief and Duchin (1984),
   Sachs and Kotlikoff (2012), Frey and Osborne (2013), Nordhaus (2015). Opening the
   disclosure moved the page by tens of thousands of pixels.
4. "Venues and years searched" and "Methods" (3–4 clicks). These describe a title
   census of the main economics journals and NBER, and say that Leontief's
   "Machines and Man" (1952) was read "from the publisher's standfirst only".
   That explains the 1952 start of the range.
5. Opened the Buckingham record (6 clicks). The claim panel shows "Machine-checked,
   not reviewed by an editor", the full GPO citation, the locator "printed p. 31",
   a short quote with a context warning and the check date. The reader called it
   a citation they could use.
6. Search (7–17 clicks): "economist" 97 records, "Keynes" 2 (both Nordhaus
   mentioning him), "Herbert Simon" 5 (no text of his own), "Hanson" 120,
   "Nordhaus" 29, "Summers" 9 (all on the OpenAI board), "unemployment" 31,
   "labor" 130, "labour" 89, "Leontief" 15.
7. Institutions & people → People A–Z (18 clicks). Leontief, Nordhaus, Hanson,
   Acemoglu, Buckingham, Nourse and Simon are not in it. I. J. Good, Larry Summers
   and Ben Bernanke are. Search confirms Leontief has no person record.
8. Larry Summers (19 clicks): "Recorded here only for documented board roles".
   No discipline, and no link to the economics collection.
9. Leontief's "Machines and Man" document page (20–21 clicks), then "What this
   means →" to About & method (22 clicks), which the reader found clear.

**Phone.** The header wraps onto extra rows and every item is reachable. No
horizontal scroll. The economics page is about 83,000 px tall. Tapping a record
opens the claim panel at the foot of the page (the page jumps from the record to
scroll position 83,082). "Close ×" returns to roughly the right place.

**Answer reached: full for a first pass.** Economists testified on automation
and computers in 1955 (Buckingham, Nourse). The 1966 Commission, Mansfield, and
Leontief and Duchin (1984) follow. The AI-specific framing comes later (Hanson,
Sachs–Kotlikoff, Nordhaus, the 2019 NBER volume). The earliest phase is thin
(Keynes 1930, Simon 1965 and Wiener are not records), and the page says so itself.

**Friction.**

- **Economists are not people in the index.** "People, A–Z" ("238 people named
  in recorded claims") omits every economist the collection is about. The
  reader called this the biggest navigation failure: "I cannot browse by
  economist." A discipline appears only inside claim text ("Speaker: …
  (economist)").
- **A wrong author.** The 1955 hearings record reads "Stabilization,
  “Automation and Technological Change: Hearings (statements by
  non-economists)” (1955-10) bears on M09." The short author takes the last word
  of "Subcommittee on Economic Stabilization". Confirmed in Search for
  "Stabilization".
- **A contradictory date line.** The Summers person page shows "Source published
  2023-11-29 · Source publication date unknown" on one line. Confirmed.
- Proposition codes in reader text: "M06a", "M09-06", "(M08-02)", "G09", "E05".
  They appear in the claim sentences themselves, including in search results
  ("…(1955-10-14) articulates M06a").
- Process wording in qualifications: "Tier 1 by maintainer decision of
  2026-10-12", "Reclassified as bearing on it after the cross-family check",
  "fresh-context audit (A1)".
- Dense label stacks: "EARLIEST LOCATED IN TIER 2 · TIER 2 · ENGAGES A PREMISE".
  Each record repeats its title three times.
- The document page for "Machines and Man" reads "Authors credited: No authorship
  claim recorded yet. The source record lists Wassily Leontief." This is better
  than 14 October's bare "no authorship record", but the reader still read it as
  a contradiction.
- "labor" and "labour" are not merged (130 against 89 records).
- On the phone the claim panel still opens at the foot of the page.

**Review status, in the reader's words.** "No person has checked these records.
An automated pipeline found the sources, extracted quotes and locators, and
checked each claim against its passage. A second, separate automated audit
re-checked a sample. 'Supported' means a machine found that the passage says
this, not that an editor vouched for it."

**Would come back?** "Yes, as a finding aid: it handed me Buckingham 1955 with a
GPO page number and an honest list of what it did not read, which is more than
most secondary literature gives me, but I'd want the economists themselves to be
people in the index."

**Screenshots, described.** Start page with the status line, three hub cards and
the "Not yet covered" box naming economics. The economics collection header with
the three-column proposition index (G, M, E). M09 expanded, with the
"Stabilization" attribution first in the list. The desktop claim panel for
Buckingham 1955 docked on the right. Search for "Leontief": claims, sources and
two document records, no person. People A–Z, mostly lab staff. The phone start
page with the header wrapped and fully visible. The phone claim panel, clean but
at the foot of the page.

## Persona 2: journalist (Yudkowsky)

**Question.** How have Eliezer Yudkowsky's views on AI risk changed over time, and
where have others contested them?

**Path (desktop).**

1. Start page (0 clicks). The Ideas & debates card asks "Which of his earlier
   views did Eliezer Yudkowsky later contest?", above the fold and almost the
   reader's own question.
2. That question (1 click) opens Yudkowsky's arguments: 29 propositions, 207
   records, 1996–2026, a page about 51,000 px tall. It showed "Loading the page…"
   for one to two seconds with the address unchanged. Under each early view,
   "Later texts by the same author that contest it" lists dated titles. Example:
   Y22 "Build superintelligence as fast as possible" is stated in "Staring into
   the Singularity" (1996-11-18) and contested by his own texts of 2000-11-13,
   2001-08-01 ("records an explicit reversal of his earlier view"), 2008-09-30
   and 2023-03-29. **First usable answer at 1 click.**
3. The table of contents jumped straight to Y22 (2 clicks).
4. "Inspect claim & evidence" (3 clicks) opened the claim panel, docked on the
   right. It shows the paraphrase, the quote, a locator ("paragraph beginning
   'Then, at some point, no'"), the check date and a context box quoting his later
   self-rejection: "I used to have the extremely convenient belief that Friendly
   AI would happen completely on automatic because morality was objective…" (SL4,
   2000-11-13). **A dated quote with a link to the original at 3 clicks.**
5. "Cite the original source" (4 clicks) gives APA, BibTeX, RIS and CSL-JSON and
   "Cite the original document, not Selekoa." When the clipboard is blocked, a
   text box with the reference appears instead, which the reader called a good
   fallback.
6. The document page (8–9 clicks) links onward to the collection and to both
   propositions. It reads "Authors credited: No authorship claim recorded yet.
   The source record lists Eliezer Yudkowsky." The name is not a link.
7. People A–Z (10 clicks): Yudkowsky is present. Robin Hanson, Ben Goertzel,
   Richard Ngo and Nick Bostrom are not, though records quote them.
8. Yudkowsky's person page (11 clicks): "PERSON · 2 RECORDED CLAIMS", described
   only as "Author credited on Intelligence Explosion Microeconomics, technical
   report 2013-1." New since 14 October: an "Appears in" block links to his
   collection (207 records), the superintelligence collection (52) and
   economics (1).
9. Paul Christiano's person page (12 clicks): roles at OpenAI, ARC, the
   Long-Term Benefit Trust and US AISI, and "Appears in" the superintelligence
   collection. Nothing mentions Yudkowsky.
10. Search "Yudkowsky critic" (13–14 clicks): 8 claims, all on "criticality". The
    page now warns about this ("so 'critic' also finds 'criticality'").
11. Search "Hanson": 61 claims, including Hanson's 1996 reply to Bostrom and
    "Is a Singularity Just Around the Corner?" (1998), and Yudkowsky's replies to
    Hanson. Search "Christiano": 29 claims. Opened "Takeoff speeds" (2018-02-24),
    filed under proposition A6 in the superintelligence collection, with a quote
    and an archived copy. **First named critic's text at about 15 clicks**, and
    only through Search.
12. The proposition name in the claim panel (16 clicks) now opens its place in
    the superintelligence collection, not an empty explorer. That collection has
    no link back to Yudkowsky's Y11 (slow takeoff), where Christiano's essay is
    what he answers.
13. Search "Yudkowsky" (17 clicks): List shows "427 records … 169 claims". Timeline
    (18 clicks) shows "Claims found by the search for “Yudkowsky”: 2", his two
    authorship credits from 2013 and 2016. Map (19 clicks) shows three nodes.
    **Broken; see below.**
14. "Copy claim reference" and "Download research starter" (20–21 clicks) both
    worked.

**Phone.** The header wraps onto two rows and every item is reachable. No
horizontal scroll. The collection page is about 77,000 px tall. "Inspect claim &
evidence" opens the panel at the foot of the page (scroll position 74,167 from
about 3,000). It is readable and not clipped, and "Close ×" returns to the record.
A reader who uses the back gesture instead would be lost 70,000 px down. In the
explorer, the sidebar (name search, topics, institutions) fills the first screen
before any result.

**Answer reached: partial.** The change over time is fully answered, with dated
self-contestations, quotes and original links, at 1–3 clicks. The critics are
partly answered. Hanson's and Christiano's texts are in the data, but they are
reachable only by searching for a name the reader already knows. The collection
says "No search was made for other writers who made the same arguments", and no
person page links them.

**Friction.**

- **Search Timeline and Map drop most of the results.** Confirmed in the
  orientation pass: List shows 169 claims for "Yudkowsky", but Timeline and Map
  say "Claims found by the search for “Yudkowsky”: 2". "Hanson" (61 claims in
  List) and "Acemoglu" (45) give 0 in both views. "Anthropic" (178 in List)
  gives 235, so governance searches work. The views appear to cover only the
  explorer's records and to leave out the proposition collections. A reader
  told that Timeline and Map show "the same results" will conclude the
  collections are almost empty.
- No route from Yudkowsky's collection or person page to texts that contest him.
  The links exist only in the summaries ("Replying to Robin Hanson's critique…").
- The person page still leads with "PERSON · 2 RECORDED CLAIMS" for an author with
  about 260 records on his texts.
- People A–Z omits Hanson, Goertzel, Ngo and Bostrom.
- Codes and process wording in reader text: "contests Y01", "T01 corresponds to
  Y01", "Candidate pack passage T01-e1", "editorial state: seed" (in the copied
  reference), "has no Y23", SHA-256 hashes and long record IDs.
- "Quotation shortened to respect the ~10% cap for a short message": policy
  wording in a reader-facing qualification. The resulting quote is 9 words, too
  short to print without opening the archive.
- The APA reference repeats the list name: "(Extropians mailing list) [Online
  post]. Extropians mailing list. Extropians Mailing List."
- The explorer's year filter offers "2027 · all records", a future year. It is
  real (a New York act takes effect on 2027-01-01), but nothing says so.

**Review status, in the reader's words.** "Nothing here has been checked by a
person. A machine picked the texts, wrote the summaries and matched the quote
against a hashed copy of the archive page on a recorded date. 'Machine-checked,
not reviewed by an editor' means no editor accepted any of it. I must open the
original before quoting."

**Would come back?** "Yes for the Yudkowsky timeline — it saved me a day in the
Extropians and SL4 archives — but I'd still have to hunt down his critics
myself."

**Screenshots, described.** Start page, with the Yudkowsky question in the Ideas
& debates card. The collection with the claim panel docked on the right. "Cite
the original source" expanded, with the clipboard fallback and the APA string.
The document page with "No authorship claim recorded yet". The person page with
"PERSON · 2 RECORDED CLAIMS" and the "Appears in" counts 52, 207 and 1. The
Timeline for "Yudkowsky" with two authorship rows. The Map with three nodes
joined by dotted lines. The phone start page with the header in two rows. The
phone claim panel at the foot of the page. The phone explorer, its sidebar
filling the first screen.

## Persona 3: policy researcher (frameworks)

**Question.** How did Anthropic's, OpenAI's and Google DeepMind's safety and
scaling frameworks change between versions?

**Path (desktop).**

1. Start page (0 clicks). The first Governance question, "How did each
   developer's safety framework change between editions?", is the reader's
   question almost word for word.
2. That question (1 click) opens "Frontier safety frameworks": 22 editions of 7
   frameworks, after a brief "Loading the page…". Each edition has "Recorded
   changes from vX" with quoted provisions and badges ("INFERRED DOCUMENT
   COMPARISON", "OFFICIAL CHANGELOG", "ASSESSED EFFECT · UNRESOLVED").
   **First usable answer at 1 click.**
3. "Provisions across editions · 22 tracked provisions" for Anthropic (2 clicks).
   The grid now has a sticky first column and header, the hint "Scroll sideways
   to see all 9 editions →" and a legend for "Stated", "Not found" and "–". At
   rest the last columns are cut mid-cell, so fragments "v", "S" and "N" show at
   the right edge. The other six frameworks' grids fit without scrolling.
4. Row labels now name the editions they apply to. The policy-change row reads
   "v1.0: Policy updates approved by board after LTBT consultation / v2.0, v2.1:
   Policy changes proposed by CEO and RSO, approved by Board", so the v1.0 cell
   fits its label. The row on deployment decisions handles a renamed provision
   the same way.
5. The v1.0 "Stated ↗" cell (3 clicks) opens the claim panel: decider (Board of
   Directors), consulted (LTBT), the excerpt, the locator "PDF p. 10 (printed
   p. 10), section 'Procedural Commitments', numbered item 1, first sentence" and
   "Machine-checked · 2026-10-03". The reader called it excellent for citing.
6. A "Not found ↗" cell (4 clicks), v3.0 "Pause training until ASL-3 Security
   Standard implemented": the inspected pages, the search terms and the hits
   examined and set aside. The reader found it rigorous but a wall of text.
7. "Download research starter" → "Download Markdown" (5–7 clicks). The file is
   563 KB and 5,459 lines. It has a good per-edition summary table and an honest
   review-status section ("276 of 276 claims… editorial state: seed"). It leaves
   out the provisions grid, and several headings are record IDs.
8. The frameworks page has no link to the related research question. The reader
   reached it through the Governance hub (8–9 clicks). "Frameworks, commitments
   and legal obligations, 2023–2026" is about 70,000 px tall. It has a dated
   chronology and "What Selekoa cannot answer here".
9. Search "CBRN" (10–11 clicks): 19 records, each now prefixed by publisher
   ("Anthropic ·", "Microsoft ·", "Google DeepMind ·", "xAI ·"). No OpenAI result,
   and nothing says why.
10. Search "\"Frontier Governance Framework\"" (12–13 clicks): 36 claims. The first
    20 shown are all Microsoft. OpenAI's appear only after "Show all 36 claims".
    Four results have no publisher prefix.
11. Map (14 clicks): a drawn map of 9 records and 12 relationships. OpenAI's
    edition is labelled "FGF · May 2026 edition" with no publisher, while
    Microsoft's nodes carry it. The banner doubles the quote marks:
    'Claims found by the search for ""Frontier Governance Framework"": 36.'
    The reader said the map added little to this question.

**Phone.** The header wraps to three rows and every item is reachable. No
horizontal page scroll. The provisions grid shows about two and a half edition
columns beside the sticky first column, and some row labels run to ten lines or
more. Tapping a cell moves to the claim panel at the foot of the page (scroll
position 32,215 of 33,711). "Close ×" returns to the grid's heading, not to the
tapped cell, so the reader loses their place in a 22-row grid.

**Answer reached: partial, close to full one lab at a time.** For Anthropic (9
editions), Google DeepMind (4) and OpenAI (Preparedness Framework Beta and
Version 2, and a separate May 2026 Frontier Governance Framework) the reader had
quoted before-and-after provisions with page locators and archive links, enough
to write per-lab paragraphs. There is still no cross-lab comparison. The
research question is a chronology, not a comparison.

**Friction.**

- No cross-lab view. The reader would build the brief's comparison table by hand
  from seven separate grids.
- A dash after a run of "Stated" cells (the policy-change row shows "–" from v2.2
  to v3.4) invites the reading "dropped in v2.2". The legend explains a dash, but
  in small print above the grid.
- A "Not found" record is badged "INFERRED" and "SUPPORTED". "Supported" on an
  absence reads oddly. Its reasoning includes "(wording narrowed on
  2026-10-25)", which is editorial history, not reader information.
- Internal IDs in the panel and the starter: "provision ID
  rsp-policy-change-approval", "##### Issued: anthropic-rsp-2023", "###
  source-fsf-1-0".
- Graph-triple prose on the research-question page and at the foot of each
  history: "RSP · v2.0 → supersedes version → RSP · 2023", "Records: Microsoft →
  published → Microsoft FGF · Feb 2026". The same edition is "RSP · 2023" there
  and "v1.0" in the history.
- Abbreviations never expanded on the pages where they appear: FGF, FAIF, FAF,
  RSO, LTBT, SAG, CCL. "Preparedness family" (a map node) is unexplained.
- A 563 KB "starter" is not something to paste into a brief.
- Search result order hides OpenAI's Frontier Governance Framework behind
  Microsoft's; one Microsoft source reads "Publication date unknown".
- On the phone, the claim panel opens at the foot of the page and "Close"
  returns to the grid heading.

**Review status, in the reader's words.** "A machine found every record, quoted
it, checked it against the source passage and recorded the check date. No editor
has accepted any of them. 'Supported' means the machine judged that the passage
supports the statement. It is not a verdict on whether a lab followed its
framework."

**Would come back?** "Yes, as the fastest way to find the exact clause and page
in each edition of a lab's framework, but I'd still build my cross-lab comparison
table myself."

**Screenshots, described.** Start page with the question as the first Governance
link. The edition timeline above the opened Anthropic grid, with legend, scroll
hint and edition-named row labels, the right columns cut at v3.2. The claim panel
for RSP v1.0's update process. The "Not found" panel for v3.0's training pause.
The top of the research-question page. CBRN results, each with its publisher.
The map for the Frontier Governance Framework search, with the unprefixed
OpenAI node. The phone header in three rows. The phone grid with two and a half
columns and a very tall row label. The phone claim panel at the foot of the page.

## Compared with 14 October

### First usable answer

| Persona               | 14 October                                  | 26 October                                               |
| --------------------- | ------------------------------------------- | -------------------------------------------------------- |
| Economic thought      | None; gave up at about 11 clicks (no scope) | Full first pass at 1 click (new economics collection)    |
| Journalist: change    | Dated quote at 3 clicks                     | Change at 1 click; dated quote with citation at 3 clicks |
| Journalist: critics   | Christiano by name search at 8 clicks       | Christiano by name search at about 15 clicks             |
| Policy: per-lab edits | 1 click                                     | 1 click                                                  |
| Policy: cross-lab     | Not available (by design)                   | Not available (unchanged)                                |

The journalist's critic count is not a regression in itself. This reader spent
more clicks on citation tools and person pages first. The route is the same as
before: Search for a name the reader already knows.

### What the restructure fixed

- **Scope on the start page** (old problem 1). All three readers knew where to go
  without clicking. The hub cards' example questions matched two of the three
  questions almost word for word, and "Not yet covered" told the economic
  historian where economics sits. The economics answer itself comes from the new
  collection, not from the restructure.
- **Phone navigation** (part of old problem 5). The header wraps and every item
  is reachable. Search filters are collapsed on the phone, and results start
  about one screen down instead of after 700 px of filters.
- **Proposition link in the claim panel** (part of old problem 3). It now opens
  the proposition's place on its collection page instead of an empty explorer.
- **"Explore records" against "Search."** No reader was confused. The explorer is
  reached only as Search's Timeline and Map views.
- **Person and document pages** (part of old problem 2). Person and document
  pages have an "Appears in" block linking to the collections. Yudkowsky's page
  links to his 207 records. Document pages say "No authorship claim recorded yet.
  The source record lists …" instead of a bare "no authorship record".
- **Search.** Each result names its collection. Publisher prefixes separate
  same-named frameworks in most results. The prefix rule is explained under the
  box, and "Whole words only" exists.
- **Distinct button names.** Every "Inspect" button and grid cell has a
  descriptive accessible name ("Stated in v1.0: RSP v1.0 states that…").
- **Provisions grid.** Sticky first column and header, a sideways-scroll hint,
  and row labels that name the editions they cover. The grid row-label problem
  flagged for editorial check on 14 October is resolved.
- **Review status.** One header line ("Records found and checked by machines, not
  reviewed by an editor") and a per-claim chip ("Machine-checked, not reviewed by
  an editor"). No reader called the notice "wallpaper", and all three described
  the review status correctly.
- No console errors in any session, as before. The only warnings were WebGL
  "GPU stall" messages from the map canvas.

### What is unchanged

- **The claim panel on the phone** still opens at the foot of pages up to 83,000
  px tall. "Close ×" returns roughly to the record on collection pages, but to the
  grid heading on the frameworks page.
- **Authors are still not people.** Robin Hanson, Nick Bostrom, Ben Goertzel,
  Richard Ngo, Leontief, Nordhaus and Acemoglu are not in People A–Z. For the
  economics collection this now blocks the economic historian's main way in.
- **The person page header** still reads "PERSON · 2 RECORDED CLAIMS" for
  Yudkowsky. The new "Appears in" block sits below it.
- **No "contested by other writers" links** between collections (old problem 3).
  The journalist still reaches critics only by searching for a known name.
- **Internal codes in reader text** (old problem 4): proposition codes ("M06a",
  "Y01", "T01-e1") inside claim sentences and search results, process wording
  ("Tier 1 by maintainer decision", "cross-family check", "~10% cap"), record IDs
  in panels and starters, and "editorial state: seed" in the copied reference.
  These are mostly data and need an editorial task.
- **No cross-lab comparison of frameworks.** This needs the decision named on 14
  October.
- **Search prefix matching** is explained but still the default, so "Yudkowsky
  critic" still finds "criticality".

### What is new

- **Search Timeline and Map drop the proposition collections.** This is the one
  thing that looks broken; see below.
- **"Stabilization" as an author** in the economics collection.
- **"Source published 2023-11-29 · Source publication date unknown"** on the
  Summers person page.
- **No real links.** Header items, hub cards, "Appears in" entries and "Document
  page →" are buttons without an address. A reader cannot open a page in a new
  tab, copy a link from the context menu, or middle-click. Researchers open many
  tabs; every reader of this test worked one page at a time because they had to.
- "labor" and "labour" give different results (130 and 89 records).
- Opening a long disclosure (M09's 25 texts) moves the page by tens of thousands
  of pixels.
- "Loading the page…" shows for one to two seconds on the first visit to a
  collection, with the address unchanged.
- The search banner doubles quote marks for a quoted phrase.
- The research starter for the frameworks is 563 KB, too large to be a starter.
- "2027" in the year filter and on the start page ("Dated records run from 1863
  to 2027") without saying that the latest date is a scheduled effective date.

## Broken

1. **Search Timeline and Map silently lose most results.** List and the two views
   disagree, and nothing says why. Measured on the live site:

   | Search    | List (claims) | Timeline and Map ("Claims found") |
   | --------- | ------------- | --------------------------------- |
   | Yudkowsky | 169           | 2                                 |
   | Hanson    | 61            | 0                                 |
   | Acemoglu  | 45            | 0                                 |
   | Anthropic | 178           | 235                               |

   The views seem to query only the explorer's records, which leave out the
   proposition collections (and count differently for governance). A reader
   switching views on an ideas topic sees an almost empty result and no
   explanation.

2. **Wrong author string** "Stabilization" on the 1955 hearings record
   (economics collection), probably an author-shortening rule taking the last
   word of a committee name.
3. **Contradictory date line** on the Summers person page: "Source published
   2023-11-29 · Source publication date unknown".

Nothing else was broken. There were no console errors.

## Ranked fixes

At most ten, ranked by how much each helps a first-time reader. Each is the
smallest change that would work. UI = interface code; Data = dataset records
(needs separately authorised editorial work); Editorial = wording or policy in
records or collection definitions.

1. **UI: make Search Timeline and Map cover the same results as List**, or say
   plainly in the view what it leaves out ("Timeline and Map show governance and
   institution records only; N claims from Ideas & debates are in the List").
   The note is the smallest fix; matching results is the real one.
2. **UI: open the claim panel near the record on the phone.** A bottom sheet or
   an inline panel under the tapped row, and "Close" returns to the tapped row
   or cell, not the section heading. This is the last of the old top-5 problems.
3. **UI: make internal navigation real links** (anchors with `#/…` addresses for
   the header, hub cards, "Appears in", "Document page →" and person names), so
   pages open in new tabs and links can be copied.
4. **Data: give authors in the proposition collections person records** (Hanson,
   Bostrom, Leontief, Nordhaus, Acemoglu, Buckingham and others), or, as an
   interim UI step, list in People A–Z the authors credited in source records
   with a link to their texts. State a discipline only where a source states it.
5. **UI: lead person pages with what the reader came for.** Show the "Appears
   in" counts in the header line ("2 recorded claims · 260 records on texts by
   this author") and link the author's name on document pages to the person.
6. **Editorial and UI: link contesting texts across collections.** Where the
   data already records that a text answers Yudkowsky (Hanson 2008, Christiano's
   "Takeoff speeds" and "Where I agree and disagree with Eliezer"), add "Texts by
   other writers that bear on this" under the proposition, as the 14 October
   report proposed.
7. **Data: fix "Stabilization" and the Summers date line.** The first is
   probably an author-shortening rule (UI if it is computed). The second needs a
   check of which of the two dates is right.
8. **Editorial: remove codes and process wording from reader-facing text.** Keep
   codes as anchors, but drop "articulates M06a" in claim sentences in favour of
   the proposition's name, and move "Tier 1 by maintainer decision", "cross-family
   check", "~10% cap" and "(wording narrowed on …)" to the record's history. In
   the UI, hide "provision ID …" and "editorial state: seed" behind "Record
   details".
9. **UI: small search fixes.** Merge "labor"/"labour" spelling variants, stop
   doubling quote marks in the banner, and interleave publishers when results
   share a title (or show "Microsoft 20 · OpenAI 16" above them).
10. **UI: link the frameworks page to its research question and expand
    abbreviations on first use** (FGF, FAIF, RSO, LTBT, CCL), and make the "Not
    found" panel lead with one plain sentence before its reasoning.

Not ranked here because they need a decision rather than a fix: a cross-lab
"Compare a provision" view (still the policy researcher's main unmet need), and
a smaller "starter" for very large collections.

Start-page changes made tonight in a separate session (tagline as heading, a
shorter "Not yet covered", one featured question) were not tested and are not
findings here.

## Method notes

- Live site: https://selekoa.org, dataset release v0.7.0, tested on 2026-10-26.
  It loaded directly; the pages.dev fallback was not needed.
- Each reader drove its own persistent Chromium session (light theme, 1440 × 900,
  then 390 × 844 with touch) through a small untracked helper that returned page
  text, visible controls, viewport text, page metrics and console messages, and
  took screenshots. At most three readers ran at once.
- Readers were told to use only the site: no repository files, no web search.
  They were not given the 14 October report. The comparison above was written
  afterwards from both reports and the orientation pass.
- Screenshots (about 30) and the readers' full logs were kept outside the
  repository and are described in words above. None is committed.
