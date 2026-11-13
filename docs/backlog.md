# Backlog

One prioritised list of what is still open on 2026-11-01 (`origin/main` at
`4629608`, dataset v0.23.2). It collects the open questions, held records,
follow-ups and pending maintainer decisions from the review notes, admission
records, pack review notes, the [roadmap](roadmap.md) and
[launch readiness](launch-readiness.md). Each item cites where it is
recorded; read that section before acting.

The roadmap keeps the maintainer's direction and order. This file is the
working list under it. When an item is done, delete its line here in the same
branch that does it, and say so in that branch's review record.

The open findings of the [pre-launch audit](../review/prelaunch-audit-2026-11-02.md)
are D25 to D27 below, added on 2026-11-02 by the branch that applied the
maintainer's decisions on it ([record](../review/audit-followups-2026-11-02.md)).

## How to read an item

`ID. Title` (size · what it needs). One-line recommended action. Source.

- **Size:** S fits one short session or a single decision; M is one full
  session; L is several sessions or a pack.
- **Needs:** _Claude_ (a Claude session), _Codex_ (a cross-family check or a
  retrieval by Codex, run locally by the maintainer), _decision_ (the
  maintainer decides; a session only records it), _archive_ (a read of
  web.archive.org or another host that cloud sessions cannot reach; Codex
  does this).
- Paths are relative to the repository root. "§" names a section heading.

## Decisions waiting on the maintainer

Answering these unblocks the most work. Each is listed in full below; a
session can draft a one-page decision sheet for any group.

- **Before public mention:** P2, P3, P4, P6.
- **Schema questions (one minor release can carry several):** D1 (`cites` to
  a person), D2 (`states_position`), D3 (technical-history statement kinds,
  undated texts, Legg–Hutter, literal actor, "Thesis"), D9 (`served` date
  basis), D20 (archive-read retrieval route).
- **Lab genealogy 2 questions 1–9:** D4.
- **Pack-level choices:** D5 (risk debate 1–6), D6 (China III judgement items),
  D7 (compute, power and orbit confirmations), D8 (key papers confirmations),
  D10 (AI in biology holds), D21 (older compute records).
- **Interface choices:** I5, I6, I9, I14, I15, I16.

## 1. Before or just after public mention

- **P2. Editorial-status wording in the data** (S · decision, then Claude).
  The 1,516 evidence notes saying "Human editorial review is pending" were
  reworded on 2026-11-02 (PA-56). Still open: the dataset description in
  `data/meta.json` and other review-stage sentences in evidence notes ("Human
  source review is pending", "Human review pending" and similar, about 150),
  which the decision did not cover. Source: `docs/roadmap.md` § Interface
  work 3 ("Review status"); `review/audit-followups-2026-11-02.md` § Held.
- **P3. Public source sync** (S · decision, then Claude). `selekoa/selekoa`
  is still at the launch snapshot, and About now links the operating guide
  there, so that link shows an old guide. Authorise one sync to v0.23.2 (see
  the operating guide, "Working on a smaller plan", Public sync). Source:
  `docs/publishing.md`; `review/prelaunch-interface-2026-11-01.md` §
  Decisions 2; `review/state-of-selekoa-2026-10-28.md` § Decisions waiting
  on the maintainer.
- **P4. About texts: signature and edits** (S · decision). "Why machine-first"
  is signed "the maintainer" until a name is chosen; the maintainer may still
  edit it. Decide or leave as is. Source: `docs/roadmap.md` § Interface work 3.
- **P5. Live host checks** (S · Claude). Confirm `curl -I` on
  `https://selekoa.org/data/claims.json` (type, CORS), that
  `/person/jan-leike` is served without a redirect, `/nope` returns 404 and
  pages carry the intended cache headers. Source:
  `review/data-urls-llms-2026-10-27.md` § Open decisions;
  `review/prerender-pages-2026-10-27.md` § Open questions 5.
- **P6. "What's new" and feeds** (M · decision, then Claude). No record of
  it exists yet. A page and an Atom feed generated from
  `release/CHANGELOG.md` would let returning readers see additions. Decide
  whether wanted; if so, one interface session. Source: handover brief of
  2026-11-01 (not recorded elsewhere).
- **P7. Untested surfaces** (M · maintainer or Claude). Real phones, a screen
  reader, print and a slow connection have not been tried on the live site.
  A short manual pass by the maintainer on a phone is the cheapest first
  step. Source: `docs/launch-readiness.md` § What remains.
- **P8. Public repository issues as a suggestions route** (S · decision).
  Offer them in About only if issues are open on `selekoa/selekoa`. Source:
  `docs/roadmap.md` § Interface work 3.
- **P9. Takedown and correction response time** (S · decision). "If wanted".
  Source: `docs/launch-readiness.md` § Status after launch.
- **P10. Outbound mail as `maintainer@selekoa.org`** (S · maintainer). No
  outbound route is set up. Source: `docs/operating-guide.md` § Hosting;
  `review/state-of-selekoa-2026-10-28.md` § Backlog 6.
- **P11. Publisher terms read by hand** (S · decision). OpenAI, Meta and the
  English EUR-Lex notice; the proposals await a decision. Source:
  `docs/launch-readiness.md` § Licence gaps; `docs/source-terms.md`.

## 2. Data follow-ups

Corrections and holds on admitted collections. Each is a patch release unless
it needs a schema change (minor).

- **D1. Heterodox thought: 39 held links** (M · decision, then Claude). 27
  `cites` links point at persons (Moravec 10, Land 5, Kurzweil 5, Vinge 3,
  Good, Drexler, Chalmers, Verdon); 12 point at would-be single-use
  entities. Recommend: allow `cites` to take a person (minor schema change,
  as `explicitly_credits` did in 2.26), admit the 27, and leave the 12 named
  in the search note. Source: `review/heterodox-admission-2026-11-01.md` §
  Held; Open for the maintainer 1.
- **D2. People: 7 statement records** (M · decision, then Claude). Pichai
  2018, Nadella 2023 (two) and 2025, Zuckerberg 2025, Son, Hennessy 2026
  wait for a `states_position` predicate. Recommend: decide with D1 and
  admit in the same minor release. Source:
  `review/people-admission-2026-10-31.md` § Held; Decision 1.
- **D3. Technical history: maintainer questions 1–6** (S · decision). Two
  statement kinds (`attributed-history`, `method-name`, 5 records); undated
  texts (IBM Deep Blue, GPT-2, Colmerauer–Roussel); the Legg–Hutter
  definition; a literal actor on `explicitly_credits`; statistical learning
  (Valiant 1984); the "Thesis" subtype. Recommend: answer all six in one
  sitting; a session applies them. Source:
  `review/technical-history-admission-2026-10-31.md` § For the maintainer.
- **D4. Lab genealogy 2: questions 1–9 and 27 held records** (M · decision,
  then Claude). Thinking Machines Lab seed participants (L081–L087);
  investor self-announcements (L003, L010, L165, L169); archive-only
  originals (Inflection, Covariant, Schwarzer); SSI updates page held twice;
  Bubeck's relayed reason; extending the trade-outlet hold to 8 Meta-move
  records; Ricursive; the Reflection AI blog date; Ruddarraju's own post. Six
  entities were not admitted (Cisco, Emergence, Jane Street, Nicolls,
  Qiming, ServiceNow). Source: `review/lab-genealogy-2-admission-2026-11-01.md`
  § Held; Open for the maintainer 1–9;
  `review/lab-genealogy-2-admission-held-2026-11-01.json`.
- **D5. Risk debate: open questions 1–6** (S · decision). Four A4 holds
  (Yudkowsky 2017, Drexler 2019, Eth and Davidson 2025, AI 2027): context on
  A4 or A1; retitle the superintelligence collection ("1863–2022" in
  `src/reading/proposition-frames.ts`); generic usual names (R14, R16, R17);
  four missing seeds; Bengio FAQ term role; Ng's Batch letter and the cut
  figures; "What is Friendly AI?" on R10b. Source:
  `review/risk-debate-admission-2026-10-31.md` § Held; Open for the
  maintainer 1–6.
- **D6. China III: items needing judgement** (S · decision). K057/K097
  widening; BAAI's two rows; SenseTime alias (group or subsidiary); a
  "Regulatory listing" subtype; 11 redated provisions; StepFun role
  rewrites; 01.AI joint venture stage. Source:
  `review/china-labs-3-admission-2026-10-31.md` § Needing judgement 1–10.
- **D7. Compute, power and orbit confirmations** (S · decision). Codes O1–O11
  or a wider pattern; subtypes beyond the decided four (Compute cluster,
  Data-centre programme, Designated zone, Regulatory filing); measures coded
  by keyword rule; the `power`/`supply`/`term` fields; O6 candidate. Source:
  `review/cpo-admission-1-2026-10-30.md` § Open 3;
  `review/cpo-admission-2-2026-10-30.md` § Open 1, 2, 5.
- **D8. Key papers confirmations** (S · decision). Three subtypes (Book,
  Guidance, Technical report); LLaMA as the 31st basis-2 work; dates for the
  two undated OpenAI papers (A002, A005); four author lists that print other
  name forms. Source: `review/key-papers-admission-2026-10-31.md` § Open for
  the maintainer.
- **D9. Undated served pages** (S · decision). 5 AI-bio and 20 AI-in-biology
  provisions are held because the schema has no `served` date basis.
  Recommend: keep held unless D1/D2's minor release adds one. Source:
  `review/ai-bio-admission-1-2026-10-30.md` § Held, decision 2;
  `review/ai-in-biology-admission-2026-10-31.md` § Held; Still open 1.
- **D10. AI in biology holds** (S · decision, then Claude). Two held ESM3
  post provisions; three held records (RFdiffusion absence, AF3 addendum,
  ESM3 preprint versions); publisher records for ESM-2, ESM3, Evo and
  RoseTTAFold (dates disagree). Source:
  `review/ai-in-biology-admission-2026-10-31.md` § Held; Still open 5–6.
- **D11. AI-bio: 18 paraphrase-only provisions** (S · decision). "Left out
  for now". Revisit only if quotation room or the provision rule changes.
  Source: `review/ai-bio-admission-1-2026-10-30.md` § Held; decision 1.
- **D12. Key papers: held persons** (L · Claude + Codex). 99 two-paper
  persons and Jian Sun (201 credits) stay printed names by decision; also
  Tom B Brown, Sheer El-Showk, Karen/Karén Simonyan; 12 admitted persons the
  check marked identity-unresolved. Recommend: only with an identifying
  source per person, in a bounded pack of the most cited. Source:
  `review/key-papers-admission-2026-10-31.md` § Held; Maintainer decision on
  persons.
- **D13. People: deferred passes** (L · Claude + Codex). 164 printed names;
  heads of Chinese developers from filings; Writer roles from institutional
  pages; pen names and list senders (decision first). Also: split the FSF
  2024 announcement post and admit Allan Dafoe (S). Source:
  `review/people-pack-2026-10-29.md` § Open questions 7, 9–11;
  `review/people-admission-2026-10-31.md` § Held.
- **D14. Archive verification: results still to apply** (S · Codex +
  archive). The 11 re-checks and 21 held rows were re-read by Codex on
  2026-11-04 and applied in the corrections of 2026-11-06. Still open:
  retrieval gaps with no readable capture (`source-ca-gov-11546-8`,
  `source-good`, `source-michie-1986-on-machine-intelligence`,
  `source-vinge-1983-omni-scan`, `source-xm-babuschkin-departure`; the three
  gwern.net captures answer 403), X and investing.com pages with no
  content-bearing capture (`lg-src-mx-spacexai-rebrand`,
  `lg-src-new-murati-x-2026`, `source-xm-x-acquisition`), NY S8828 (no
  capture) and the Nordhaus canonical address (decision). Source:
  `review/corrections-2026-11-06.md` § Held.
- **D15. Link health: sources without archive copies** (M · Codex +
  archive). 41 non-ok sources were not on the Codex list (39 still without
  `archivedUrl`); 144 sources were blocked or unreadable from the cloud (28
  without a copy). Rerun `scripts/link-health.mjs` from the maintainer's
  network. Decide the " / " line-break convention and the Trammell–Korinek
  canonical address. Source: `review/link-health-2026-10-29.md` §
  Recommended next steps 3–5; § Changed.
- **D17. Single held records** (S each · Claude or archive).
  - AI Magazine 2006 date (15 Dec against 1 Dec): decide.
    `review/followups-2026-10-28.md` § Open for the maintainer 2.
  - Shanghai AI Lab founding (a laboratory reprint gives July 2020; no
    founding or registration text).
    `review/china-labs-3-admission-2026-10-31.md` § Held;
    `review/corrections-2026-11-06.md` § Held.
  - NVIDIA H20 statements (no BIS letter or rule found by the Codex reads
    of 2026-11-07); ADA Space Three-Body
    launch; Starcloud-1 "Gemini" or "Gemma".
    `review/cpo-admission-2-2026-10-30.md` § Held; Corrections.
  - O10: no located text states which workloads ground links limit; the
    next orbital-compute pass searches for one (decision 14a of 2026-11-07).
    `review/recheck-and-reads-2026-11-07.md` § Left open.
  - Michigan HB 4668 after 2026-03-28 (the latest capture read).
    `review/frameworks-to-law-admission-2-2026-10-28.md` § Open 3.
  - Hanson 1994 base records dated by a heading (1994-03-08; the printed
    issue is the third quarter of 1994).
    `review/heterodox-admission-2026-11-01.md` § Open 4;
    `review/corrections-2026-11-06.md` § Held.
  - NRC Amendment No. 307 text (still 403 on 2026-11-07; the Federal
    Register notice confirms its date and scope). `review/crane-nrc-fix-2026-11-01.md`;
    `review/recheck-and-reads-2026-11-07.md` § Left open.
  - Audit holds: `cncert` typing, working-paper/journal pairs, the UK AI
    Security Institute launch claim (all now read; decisions).
    `review/audit-fixes-2026-10-29.md` § Held, and why;
    `review/corrections-2026-11-06.md` § Held.
- **D18. Comparison and framework corrections** (S · Claude). Trim cell notes
  that repeat their paraphrase (`review/paraphrase-corrections-2026-10-28.md`
  § Open 2); the GPT check's "cyber" reason that the text layers do not
  contain (`review/recheck-38-frameworks-2026-10-26.md` § Other
  observations); the EU Code of Practice copy against the FGF date (§
  Disagreements 4); key RSP v2.0–v2.2 AI R&D thresholds to their provision
  and drop the row note (M, needs Codex;
  `review/reader-decisions-2026-10-29.md` § 3).
- **D19. Consistency audit leftovers** (M · Claude). Same-title document
  pairs, `technology-innovation-institute` typing, 10 quotation budgets near
  their limit, 56 short texts at their limit, two records with a trailing
  space (`lineage-ii-critique-cites-concrete`). Fold into H3's rerun. Source:
  `review/audit-fixes-2026-10-29.md` § Audit findings before and after;
  `review/data-loading-c3-2026-10-30.md` § What is left.
- **D20. Archive-read retrieval route** (S · decision). The schema cannot say
  a passage was read from an archive capture. A minor schema change; bundle
  with D1. Source: `review/archive-admissions-2026-10-26.md` § Records added.
- **D21. Older compute records** (M · decision, then Claude). About 40
  compute claims from before the compute pack are left out of the compute
  guide until a selection rule exists. Recommend: a rule such as "a dated
  project, deal or capacity statement by a party" and one session to apply
  it. Source: `review/guide-compute-buildout-2026-10-31.md` § Open 2;
  `review/guide-compute-followups-2026-10-31.md` § Open 2.
- **D22. Smaller items with a decision attached** (S · decision). Rainier
  later snapshot and claim 23 wording (`review/data-fixes-2026-10-26.md` §
  B3, B4); ERNIE 3.0 Titan date and the Seed-Coder licence change
  (`review/china-labs-pack-2-2026-10-27.md` § Open questions 7–8);
  interlocutors without their own texts and author disciplines
  (`review/author-person-pack-2026-10-27.md` § Open questions 2, 4, 5);
  declarations recorded as citations on the commitments page
  (`review/frameworks-to-law-admission-2-2026-10-28.md` § Open 1); AIIA
  commitments in the external commitments collection
  (`review/china-labs-2-admission-2026-10-27.md` § Open leads); whether the
  widened dating rule of v0.12.1 should have been minor
  (`review/reader-decisions-2026-10-29.md` § Open decision); term roles taken
  from titles and the e/acc `…-repost` ID
  (`review/heterodox-admission-2026-11-01.md` § Open 5; Fresh-context
  review).
- **D23. Citation export gaps** (S · Claude). Six sources without structured
  authors, two group credits hiding named chairs, no editor role. Source:
  `docs/roadmap.md` § Next steps; `review/citation-authors-2026-10-15.md`.
- **D24. Licence links for open-licence sources** (S · Claude). CC and OGL
  sources name the licence but do not link it. Source:
  `docs/launch-readiness.md` § Licence gaps.
- **D25. Pre-launch audit: earliest-located re-check and held data items**
  (M · Codex, then decision and Claude). Source for each:
  `review/prelaunch-audit-2026-11-02.md` (finding ID) and
  `review/audit-followups-2026-11-02.md`.
  - PA-01, PA-02: the re-check is complete
    (`review/earliest-located-recheck-2026-11-02.md`). 73 headlines were
    withdrawn (20 by #135, 53 by `review/recheck-interim-2026-11-02.md`); the
    adjudication (`review/recheck-apply-2026-11-02.md`) moved 3. The
    maintainer's decisions 1 to 4 of 2026-11-02
    (`review/recheck-decisions-2026-11-02.md`) dropped 12 name headlines as
    ordinary phrases and moved 31 to newly admitted records. The 9 moves held
    for the archive (roles 55, 70, 89, 110, 113, 119, 122, 125, 132) were
    admitted on 2026-11-02 from Codex's archive retrieval
    (`review/archive-fetch-apply-2026-11-02.md`); machine succession now runs
    from 1863. The remaining 19 headlines were settled on 2026-11-07
    (`review/recheck-and-reads-2026-11-07.md`) except two: W10 (the February
    1979 _Analog_ print read only in a copy Selekoa does not cite) and O10
    (no text states a workload limit). The gwern.net capture comparisons
    (Good, Michie, Vinge) are still blocked.
  - Leads outside the dataset from the re-check (add no records until an
    admission): Schaff and others (September 1997), which uses “virtual cell”
    for a cell-model framework (role 8; P2's term headline); Chollet's dated
    text using “diminishing returns” in the R13 sense, known here only as
    Marcus's quotation of 2018 (role 18).
  - PA-19 (backlog by decision): admit "independent director" as a board role
    in the OpenAI control collection, version 3, and add the November 2023
    departure records (Toner, McCauley, Hoffman, Zilis, Hurd, Karnofsky).
  - PA-27 (backlog by decision): record RSP v1.0's "Autonomous AI research"
    passage (a provision record) in the next framework pack, with a
    cross-family check.
  - PA-28 (backlog by decision): record xAI's Risk Management Framework of
    2025-08-20 as its first edition, or reword the not-applicable reason.
  - PA-34 (backlog by decision): `power.technology` on
    `cpo-pw-google-constellation-2700mw-supply` needs a schema decision: a
    "not stated" value, or drop the attribute.
  - PA-45: re-check the CMU Moravec 503s later (`scripts/link-health.mjs`).
  - PA-46 remainder: key-paper citation records also say in `time.note` that
    "the citation does not identify which version of the cited work was
    read"; the decision reworded the qualification template only.
- **D26. Pre-launch audit: open data-display items** (S each · Claude).
  Recommended by the audit, not yet decided. Source:
  `review/prelaunch-audit-2026-11-02.md` (finding ID).
  - PA-18: in `statedReason()` (`src/domain/genealogy.ts`), do not print a
    source date earlier than the record's own date.
  - PA-20: person pages, records of one date: roles at the institution left,
    then the departure, then new roles; year-only records after dated ones
    (`src/domain/person-profile.ts`).
  - PA-30: list records whose evidence is the person's own account on the
    person page (Liang Wenfeng and High-Flyer).
  - PA-47: label retrieval snapshots "as served on <date>" on year pages, or
    keep them off.
  - PA-48: let word-for-word identical statements name their own subject
    first (Nobel pairs on year pages).
  - PA-53: format literal amounts with their bound; show `attrs.role` on
    `co_founded` lines.
  - PA-57: show the reason for differing dates on document pages (Good 1965,
    Buckingham 1955, GPT-2).
- **D27. Pre-launch audit: open interface items** (S each · Claude).
  Recommended by the audit, not yet decided. Source:
  `review/prelaunch-audit-2026-11-02.md` (finding ID).
  - PA-31: the OpenAI control table on a 390 px phone: a scroll hint, or
    stacked rows below 600 px.
  - PA-32: re-scroll to a section address once the page has rendered.
  - PA-33: the side-by-side's year-by-year list at all widths, or labels on
    hover and focus.
  - PA-52: label the topic counts on `/explore` (they exclude proposition
    records).
  - PA-54: the question as H1 on one-question comparison pages.
  - PA-55: drop the slug in the AI-in-science group heading ("biology ·
    Biology").

- **D28. Cross-family audit sample: open items** (S each · decision, then
  Claude or Codex). The blind sample of 2026-11-02 (120 claims; 4 material
  errors, 13 minor slips) was applied in v0.26.1
  ([record](../review/audit-sample-fixes-2026-11-02.md)), except:
  - Item 66, Natural Questions paper: July 2019 is unsupported by the cited
    expression (ACL month empty; Crossref print month November 2019), and a
    record citing it is dated January 2019. Settle the work's earliest
    expression once for all ten records of the paper. Codex's read of
    2026-11-04 found the published PDF's footer gives July 2019, and a dated
    announcement attests the accepted paper on 2019-01-23 (decision:
    `review/corrections-2026-11-06.md` § Held).
  - The sample certifies no unsampled record. The Codex sweep of absence
    claims is applied: part 1 in v0.26.2
    ([record](../review/absence-sweep-apply-part1-2026-11-02.md)), part 2 in
    v0.26.3 ([record](../review/absence-sweep-apply-part2-2026-11-03.md)).
    Left as they are: the 3 unverifiable records (`ts-b6-samuel-1960-contests`,
    `ts-b1-crocker-1996-12-31-context`, `yk-y17-creating-friendly-ai-2001-c`)
    and the 21 `aib-`/`ab-` records the maintainer excluded, which the sweep
    did not check.
  - Leads from part 1, for the A3 re-check and Y20: Minsky 1961's GPS
    "bootstrapping" and its reference to Newell, Shaw and Simon; AIPNFGR
    section 10 ("does not hate you") as a possible Y20 contesting record.

  Source: `review/cross-family-audit-sample-2026-11-02.md`;
  `review/audit-sample-fixes-2026-11-02.md` § Held.

- **D29. Blind audit of 2026-11-09: items left open** (S · Codex +
  archive). The adjudicated corrections were applied in v0.33.0
  ([record](../review/audit-corrections-and-model-cards-5-2026-11-10.md)).
  Still open: the eight cannot-check items (California SB 53 Q01, Q06, Q10,
  Q12; Illinois Q10; the two OpenAI prediction captures; the 2015 One Bank
  Research Agenda capture) and the Michie, Vinge and Analog (W10) reads, for
  the next Codex brief with library access. Source:
  `review/audit-2026-11-09-adjudication.md` § Cannot check, § Next step.

## 3. Interface follow-ups

- **I1. Propositions by thinker** (M · Claude). In flight on branch
  `propositions-by-thinker`; review and merge it before starting other
  interface work. Source: `docs/roadmap.md` § Interface work 5.
- **I2. Kinds of AI page** (M · Claude). The technical-history collection
  (admitted 2026-10-31) has no page, route or hub entry. Planned: a page in
  the institutional hub with a timeline view, terms linked from the thought
  hub, within the collection-page budget. Source:
  `review/technical-history-admission-2026-10-31.md` § Collection.
- **I3. Key papers hub section** (M · Claude + decision).
  `src/domain/key-papers.ts` exists but no page uses it. The start page is
  near its 115 KB budget, so measure before placing it there. Source:
  `review/key-papers-admission-2026-10-31.md` § Schema; Open.
- **I4. Map: slice for `/dossier/<id>?view=map`** (M · Claude). The dossier
  map still loads the whole records (about 11 s to interactive on a phone).
  Source: `review/map-prebuilt-layouts-2026-10-31.md` § Open 2.
- **I5. Map: stars at phone width** (M · Claude + decision). At 390 px a
  star of 90 or more records is legible only by zooming: open zoomed, or
  draw smaller symbols. Confirm "no map" as the explorer default. Source:
  `review/map-prebuilt-layouts-2026-10-31.md` § Open 1, 3.
- **I6. Very long collection pages on phones** (M · decision + Claude).
  50,000–83,000 px; collapse each proposition's records by default? Source:
  `review/reader-tasks-2026-10-29.md` § Next steps.
- **I7. Whole records still loaded by non-link input** (L · Claude). Filters,
  tabs, selects, exports, starters, `/` and query addresses load about
  1.1 MB. Do only when a page needs it; each fix should free budget. Source:
  `review/data-loading-c5-2026-10-31.md` § Where the whole records still load.
- **I8. Budget: other collection kinds ship whole text in shared code** (M ·
  Claude). The split applied to propositions was not applied to starters,
  guides, control structures, commitments, histories and the comparison;
  search facets list every collection's claims. This is where room for the
  Search page will come from. Source:
  `review/risk-debate-admission-2026-10-31.md` § Budgets ("Not done").
- **I9. Compare frameworks: keyboard access to the status explanation** (S ·
  decision). It is a `title` attribute; a focusable tooltip adds 126 tab
  stops. Also: keep the page question at body size? Source:
  `review/compare-first-screen-2026-11-01.md` § Open decisions.
- **I10. Edition guide: links by edition** (S · Claude). Rows and cells link
  by facet only, although `?edition=` exists. Register the edition guide and
  the compute guide as release collections (needs a minor release). Source:
  `review/guide-framework-changes-2026-10-29.md` § Open 1–2;
  `review/guide-compute-followups-2026-10-31.md` § Decisions 5.
- **I11. Reader-test findings still open** (M · Claude). A document's author
  name opens the authorship claim, not the person page; "texts by other
  writers that bear on this"; internal codes and process wording in claim
  text; search polish (spelling variants, doubled quote marks); search
  filters not carried to Timeline or Map; the claim panel's "primary · 1
  source" wording. Source: `review/reader-fixes-2026-10-26.md` § Reader-test
  findings still open; `review/reader-tasks-2026-10-29.md` § Blind reader.
- **I12. Small interface fixes** (S · Claude). Sideways scroll below 360 px
  (`review/site-search-header-2026-10-29.md` § Open); back navigation from
  search pushing an entry (`review/data-loading-c1-2026-10-30.md` § Review);
  copy-link buttons detected by a label regex in
  `src/ui/hold-until-records.ts` (`review/data-loading-c2-2026-10-30.md` §
  Open 3); "Search: …" explorer line (`review/map-followup-2026-10-26.md` §
  Open 3); person-page date line that does not say which source it dates
  (`docs/roadmap.md` § Parked work); listed entity on organisation pages
  (`review/china-labs-3-admission-2026-10-31.md` § Needing judgement 10).
- **I13. Comparison Markdown starter export** (S · Claude). The CSV exists;
  the Markdown research starter does not. Source:
  `review/framework-comparison-ui-2026-10-27.md` § 6.
- **I14. Interface choices left open** (S · decision). Header search field
  on `/search`; the site-search decisions taken in-branch
  (`review/site-search-header-2026-10-29.md` § Open; Decisions taken here);
  edition guide wording (`review/guide-framework-changes-2026-10-29.md` §
  Wording); compute guide question wording
  (`review/guide-compute-followups-2026-10-31.md` § Open 1); chronicle
  wording and open questions 1–6 (`review/chronicle-by-year-2026-10-31.md`);
  start-page gaps line (`review/homepage-tweaks-2026-10-26.md`); featured map
  scope and title (`review/start-page-featured-2026-10-27.md` § Open
  decisions); map-from-claim object and address
  (`review/map-followup-2026-10-26.md` § Open 1–2).
- **I15. Commitments by developer** (M · Claude). Who signed which external
  commitment, when and in which edition; a signature is never compliance.
  Design work on existing records. Source: `docs/roadmap.md` § Interface
  work 6.
- **I16. AI in biology: a field collection page** (L · decision + Claude). A
  new collection kind for a field's institutions, models and people, and its
  hub placement. Source: `review/ai-in-biology-admission-2026-10-31.md` §
  Still open 3–4.
- **I17. Control timelines: thin rows** (M · Claude, research). Google
  DeepMind and xAI have 3 and 4 records, none on board or control. Source:
  `review/control-timelines-2026-11-01.md` § Coverage.

## 4. Research packs

Each is pack → Codex check → adjudication → admission
([operating guide](operating-guide.md)).

- **R1. Laws compared** (L · Claude + Codex). Done at release 0.30.0
  (`review/laws-compared-admission-2-2026-11-05.md`). Next: a small pack for
  the jurisdictions not yet read, starting with Korea's AI Basic Act
  (decision 10a).
- **R2. Guide: the risk debate** (M · Claude). A reader's guide over the
  risk-debate collection, like the edition and compute guides. Design work
  on existing records. Source: handover brief of 2026-11-01; template
  `review/guide-compute-buildout-2026-10-31.md`.
- **R3. Guide: kinds of AI** (M · Claude). Goes with I2. Source: handover
  brief; `review/technical-history-admission-2026-10-31.md` § Collection.
- **R4. Guide: AI in biology** (M · Claude). Over the AI-bio and AI-in-biology
  collections. Source: handover brief.
- **R6. Technical history: seven withheld headlines** (L · Claude + Codex).
  Connectionism, machine learning, evolutionary computation, statistical
  learning, neurosymbolic AI, search and planning, symbolic AI. Source:
  `review/technical-history-admission-2026-10-31.md` § Corrections 4.
- **R7. AGI term provenance** (M · Claude + Codex). Gubrud 1997; Goertzel and
  Pennachin 2007; Legg. Goertzel and Legg now have person records. Source:
  `docs/roadmap.md` § Backlog.
- **R8. AI in biology, second increment** (L · Claude + Codex). CASP15–17,
  AF-Multimer and Server, AlphaGenome, ESM Atlas, trial registries; the
  "not found" items of question 21; P4 and P5 earliest-located texts.
  Source: `review/ai-in-biology-pack-2026-10-30.md` § Gaps 21–22;
  `review/ai-in-biology-admission-2026-10-31.md` § Still open 2.
- **R9. AI-bio arguments** (M · Claude). D2 has no articulating text and D5
  no contesting text; the 2022 dual-use drug-discovery commentary is not
  recorded. Source: `review/ai-bio-admission-2-2026-10-30.md` § Still open.
- **R10. China follow-ups** (L · Claude + Codex). CAC deep-synthesis batches
  2–17 and provincial lists; legal names of Moonshot, ByteDance and Alibaba;
  earlier StepFun and 01.AI rounds; quote the Chinese Beijing AI Principles,
  the Yi agreement and SenseNova 5.0 from captures; the July 2025 Chinese
  safety commitment framework and later AIIA signatories. Source:
  `review/china-labs-3-admission-2026-10-31.md` § Open leads;
  `review/china-labs-2-admission-2026-10-27.md` § Open leads.
- **R11. Risk debate balance** (M · Claude). LessWrong posts (Pope, Belrose,
  Barnett, Wentworth, Kokotajlo 2020, Hanson on AlphaGo Zero); a search for
  R17 liability texts; the held Stochastic Parrots, LeCun and Chollet
  stances. Source: `review/risk-debate-pack-2026-10-29.md` § Open questions
  9; `review/risk-debate-admission-2026-10-31.md` § Held.
- **R12. More frameworks in the comparison** (L · decision, then Claude +
  Codex). Anthropic's Frontier Compliance Framework, xAI's earlier drafts,
  Amazon, NVIDIA, Cohere, G42, Naver. Decide scope first. Source:
  `review/framework-adjudication-2026-10-27.md` § Not covered by this memo.
- **R13. Frameworks to law, second pass** (M · Claude). Developers' SB 53
  compliance documents; the second and third Code of Practice drafts; the
  reported May 2026 CAISI agreements. Overlaps R1. Source:
  `review/frameworks-to-law-admission-2-2026-10-28.md` § Open 5;
  `review/frameworks-to-law-pack-2026-10-28.md` § Scope choices.
- **R14. Compute leads** (S · Claude). Crusoe and Stargate Abilene; a
  definitive OpenAI–NVIDIA agreement; US executive-branch pages compared
  with near-release captures. Source:
  `review/compute-power-orbit-pack-2026-10-28.md` § Q7, Q9, Q10; Retrieval
  failures.
- **R15. Parked research** (L · archive + Claude). Economics follow-ups
  (Wayback re-reads, Hanson 1998 quotation room, unread books, G06 wording,
  M05, M08, audit-letter key); Yudkowsky corpus leads; Christiano's 2013
  MIRI listing; machine-succession leads (Drexler 1986 ch. 5, "Contra Land",
  unread printings; items 41, 51, 69 re-reads). Source: `docs/roadmap.md` §
  Parked work; `review/thought-spine-leads.md`;
  `review/heterodox-thought-pack-2026-10-31.md` § Maintainer decisions on
  the check 3–5, 10.
- **R16. Later strands** (L · Claude + Codex). AI in mathematics and science
  beyond biology; ASI in fiction (low priority). Source: `docs/roadmap.md` §
  Backlog.

## 5. Housekeeping

- **H1. Branch cleanup** (S · decision). 101 remote branches are merged or
  their content is on `main`. `technical-history-pack` (a historical author
  address) and `author-person-pack` (a container path in two early commits)
  carry material that should not stay; delete them first. List and commands
  in [branch cleanup](branch-cleanup.md). Source:
  `review/technical-history-pack-2026-10-29.md` § Open questions 12;
  `review/author-person-pack-2026-10-27.md` § Findings worth noting.
- **H2. Roadmap refresh** (S · Claude). Mark interface item 4 (control
  timelines) done; drop "Explorer map speed" (done in #112); move key papers
  and kinds of AI out of the backlog (admitted); update the China line
  (StepFun, 01.AI and Hunyuan were admitted in China III); drop the parked
  OpenAI–Oracle and Summers lines (done). Point the backlog sections at this
  file. Source: `docs/roadmap.md`.
- **H3. Rerun the 20 reader tasks and the consistency audit** (M · Claude).
  Last run 2026-10-29 at about 3,040 claims; v0.23.2 has 5,785. Fix what they
  find in one patch. Source: `docs/roadmap.md` § Next steps.
- **H4. Public source sync** (S · Claude, on authorisation). See P3; repeat
  at each release.
- **H5. Host limits** (S · Claude + maintainer). 7,902 pages and 2,241
  slices; the last `dist/` file count recorded was 6,549 against a budget of
  15,000 (host limit 20,000). Record the Cloudflare build time from the
  deploy log at each release; phase 3 triggers at about 10,000 pages.
  Source: `review/data-loading-c4-2026-10-31.md`; `docs/roadmap.md` §
  Findability phase 3.
- **H6. Test hygiene** (S · Claude). `MAP_FIRST_DRAW_TIMEOUT` (60 s) in
  `tests/browser/fixtures.ts` may now be tightened; re-measure dossier maps
  after key papers; `src/domain/appearances.test.ts` times out under the
  parallel run. Source: `review/map-prebuilt-layouts-2026-10-31.md` § Open
  4; `review/spines-hubs-2026-10-27.md` § Checks.
- **H7. Stale wording in records** (S · Claude). `#/` example addresses in
  topic docs (`docs/architecture.md`, `docs/china-atlas.md`,
  `docs/control-commitments.md`); the archive-fixes status line still says
  "not merged". Source: `review/prerender-pages-2026-10-27.md` § Open 6;
  `review/archive-fixes-2026-10-30.md`.
- **H8. Step-back review, mid-November** (M · maintainer). Priorities and
  usability; also revisit the "AI in science" spine wording. Source:
  `docs/operating-guide.md` § Housekeeping;
  `review/ai-in-biology-pack-2026-10-30.md` § Q3.
- **H9. Codex as preparing family** (S · decision). Whether Codex prepares
  packs from November and Claude checks. The policy already allows either
  family. Source: `docs/operating-guide.md` § Roles.
- **H10. Re-check in 2027** (S · Claude). Whether New York chapter 96 took
  effect on 2027-01-01 (`ny-ch96-effective-date`). Source:
  `review/chronicle-by-year-2026-10-31.md` § What a year page shows.
- **H11. Versioned `/data` copies and sub-path hosting** (S · decision). Keep
  the release ZIPs as the versioned route (recommended); trial deployments
  must be served from a host root. Source:
  `review/data-urls-llms-2026-10-27.md` § Open decisions;
  `review/prerender-pages-2026-10-27.md` § Open 4.

## Suggested order

1. P3 and H1 decisions, which cost the maintainer
   a few words each.
2. I1 merged; H2 and H3 in one housekeeping session.
3. One schema decision sitting (D1, D2, D3, D20, D9), then one minor release
   applying them.
4. D4, D5, D6, D7, D8 decisions; one patch per collection.
5. One Codex retrieval for what D14 and D17 still need (blocked hosts).
6. Interface: I2 with R3, then I3, I4, I5.
7. R1 when its pack and check are ready.

Ready-to-paste briefs for the first tasks are in [`briefs/`](briefs/).
