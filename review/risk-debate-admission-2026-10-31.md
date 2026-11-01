# Arguments about catastrophic risk from advanced AI: admission, 2026-10-31

Admission of the candidate pack in [`research/risk-debate/`](../research/risk-debate/README.md), under the maintainer's decisions of 2026-10-30 (open questions 1–15, all as recommended) and the adjudication of 2026-10-31 of the [cross-family check](../research/risk-debate/cross-family-check-2026-10-29.md), both recorded in the [review note](risk-debate-pack-2026-10-29.md).

- **Script:** [`scripts/risk-debate-admission.ts`](../scripts/risk-debate-admission.ts). `--verify` matches the admission's own quotations in a fresh retrieval and writes [`admission-verification-2026-10-31.json`](../research/risk-debate/admission-verification-2026-10-31.json); without flags it writes the records and the before-snapshot; `--check` rebuilds them and compares them with the stored data.
- **Map:** [`risk-debate-admission-map-2026-10-31.json`](risk-debate-admission-map-2026-10-31.json): every decision, correction, hold and mapping, each with its reason.
- **Before-snapshot:** [`risk-debate-admission-before-2026-10-31.json`](risk-debate-admission-before-2026-10-31.json), first in the chain in `src/editorial/historical-views.ts`. Base: branch `china-labs-3-admission` (v0.21.0), the previous admission of the 2026-10-31 chain; the snapshot was regenerated from that base by the script. It lists the base documents and sources the admission reused instead of duplicating.
- **Schema:** unchanged (no part 2). The pack's `comparative` attribute has no field and is not admitted; its date bases `posting` and `submission` become `publication` with the basis in the note, and `delivery` (a talk) carries no basis.
- **Editorial state:** every record is a seed. No evidence is human-reviewed.

## Counts as admitted

On the base of 2026-10-31 (`main` at 754ce57; counts can differ on a stacked base, where documents admitted earlier are reused):

| Records  | Added | Changed |
| -------- | ----: | ------: |
| Claims   |   239 |       0 |
| Entities |   158 |       0 |
| Sources  |   140 |       3 |
| Evidence |   415 |       0 |

- **Claims:** 217 proposition records (103 articulate, 85 contest, 29 bear on) and 22 `cites` claims, the published replies. All explicit and supported, topic ideas.
- **Entities:** 142 documents and 16 propositions (R01–R03, R06–R09, R10a, R10b, R11–R17).
- **Evidence:** 410 quotations and 5 paraphrases.
- **Changed rows:** three base sources (Chalmers 2010, Concrete Problems v1, Meta's open-source letter of 2024) quoted for the first time; each gains the pack's length count so the quotation limit can be checked.
- **Reused from the base:** the documents and sources of the RAND red-team report, Seger and others (2023) and Kapoor and others (2024), admitted with AI and biosecurity, and the sources of Chalmers, Concrete Problems, Christiano's Takeoff speeds and Meta's letter. Corrigibility (2015) is quoted through its existing source.

## Decisions applied

- **Decision 1. R04 and R05 on B1 and A4.** The pack's records are on `treacherous-turn` and `fast-or-hard-takeoff`, classified against those propositions' own criteria. B1 and A4 keep their roles (Creating Friendly AI, Vinge 1993); the pack's headlines lapse and are recorded as corrections. The superintelligence collection names no earliest-located contesting record, so none is assigned on B1 or A4. Record IDs are re-lettered (`rd-r04-` → `rd-b1-`, `rd-r05-` → `rd-a4-`).
- **Decision 2. R03** is its own concept, `inner-or-deceptive-misalignment`, linked to B3 and B4 as narrower cases.
- **Decision 3. Y overlaps** stay separate and are linked both ways in the collection definitions (Y02, Y09, Y11, Y13, Y15, Y19, Y20); R17 links to E04.
- **Decisions 4–5.** R10a/R10b and the narrowed R13 and R14 criteria as in the pack.
- **Decisions 6–8.** Bostrom 2003: wording attested by the capture of 6 August 2003, so it is earliest located on R01 (correction); on A4 it is an articulation. R09 stays with Bostrom 2002.
- **Decisions 9–10.** No padding; the imbalance and the missing seeds are stated in the search note.
- **Decisions 11–13.** The 2019 thread records are dated by the compiler's copy; statements are texts, with no stance for any signatory and no signatory list.
- **Decision 14. Replies** are `cites` claims with "A reply is not agreement"; the 17 debates are a reading list ("Published exchanges") in the collection definition.
- **Decision 15. No sides.** Records show stance only; the pack's position counts stay in the research files.

## Adjudication of 2026-10-31, as applied

| Change                                                          | Records                                                                                                                                                                                                                                                                                                                                                                |
| --------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Earlier dated texts become earliest located (each a correction) | Joy, April 2000 (R07); Goertzel, May 2002 (R06); Goertzel, 17 February 2004 (R10a); Crawford, 25 June 2016 (R12); Marcus and Davis, 10 September 2019 (R14); Bostrom 2003 as attested (R01)                                                                                                                                                                            |
| Corrigibility, January 2015, on R04                             | Already recorded on B1 as an articulation; no new record                                                                                                                                                                                                                                                                                                               |
| Stance to "bears on"                                            | Andreessen 2023 on R10b (item 92); Brooks 2017 on R01 (item 96)                                                                                                                                                                                                                                                                                                        |
| Item 90, Aschenbrenner                                          | Context on A4: no qualifying whole-transition passage was cited                                                                                                                                                                                                                                                                                                        |
| Date displays                                                   | Grace (item 87) dated 31 August 2022; Ng's Batch letter (item 95) dated October 2023, on the record, the document and the source; AI Impacts (item 100) wording attested 26 May 2020                                                                                                                                                                                   |
| Balance texts                                                   | Violet Hour 2024 (R03, contests); Arctotherium 2026 (R17, articulates); Corrigibility 2015 (R10a and R10b, contests; earliest located contesting text on R10b, a correction); Hadshar 2023 (R11, contests); Encode Justice–FLI 2023 (R12, contests); Davidson 2023 (A4, articulates, with its metric stated; its estimate is in no quoted passage and is not recorded) |
| Other check findings                                            | Capture attestations for the Edge responses (Pinker 16 November, Kelly 18 November, Russell 6 December 2014) and Bengio (23 May 2023; 9 July 2024); locators of items 106 and 117; NTIA quotation reads "open-weight" (item 108); Millidge's limit on instilling values (item 82); undated Altman and CAIS pages noted (items 85, 104)                                 |

The check's Corrigibility quotation for R10b read "further research"; the PDF reads "future research", and the admission quotes the PDF. Its R10a quotation is replaced by the clauses around the utility-function symbols, whose text layer differs.

## Admission's own changes

- **Earliest located use of a name.** The pack had assigned the term role partly from titles. The schema requires the name in the quoted passage, so the script applies the rule mechanically and reports each move: R02 → Bostrom 2012 ("convergent instrumental"); R03 → Shah 2022; R06 → Russell's 2019 comment; R07 → the CAIS statement ("risk of extinction"); R08 → Carlsmith 2022; R09 → Hendrycks 2023; R12 → Bengio's FAQ (wording attested only from the retrieval of 2026-10-29); R15 → Goertzel and Pitt 2012; R16 → Christiano 2018; R17 → Askell 2019 ("incentives").
- Three records with both articulation and most-developed keep most-developed only; two context records whose passages the pack marked all as context rest on their first passage.
- Chollet's essay of 2017 is admitted as a document without stance, as the text Yudkowsky's reply answers.

## Held

| Held                                                                                            | Why                                                                                                                     |
| ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Yudkowsky 2017 (AlphaGo Zero), Drexler 2019, Eth and Davidson 2025, AI 2027 on A4               | Meet the pack's R05 but not A4 as worded (no hard or fast takeoff, no period of hours to months). Context on A4, or A1? |
| "What is Friendly AI?" (2001) as earliest located on R10b                                       | The check named the criterion fit for adjudication; not decided                                                         |
| Stochastic Parrots (2021), LeCun 2022, LeCun's Senate testimony (2023), stances of Chollet 2017 | The adjudication named only the six balance texts; several stances have no quoted passage                               |
| Ng, The Batch of 10 July 2024, as context on R15                                                | Its only passage does not mention open source, so nothing quoted ties it to R15 (fresh-context review)                  |

## Open for the maintainer

1. The four A4 holds above.
2. The superintelligence page now shows B1 and A4 records after 2022 under its title "1863–2022"; its limits say so (its search note is left unchanged, because the stored earliest-located packet renders it). Retitle?
3. Generic usual names (R14 "agency", R17 "incentives", "market", R16 "gradual") make the term role fall on texts that use the word in passing.
4. Whether the four missing seeds should be admitted from the check's captures.
5. Bengio's FAQ holds the term role on R12 ("current harms") on wording attested only from 2026-10-29; no capture of 2023 was compared (open question 6). Compare one, or accept the role as attested.
6. Ng's Batch letter of July 2024: add a passage on open source, or leave it unrecorded. A passage for Davidson's estimate (about 10% for under three months) and for the figures cut from five other statements (below) would let them be restored.

## Fresh-context review (2026-10-31)

A fresh-context machine review of the prepared admission found thirteen defects, all verified and fixed through the map and the script (no hand edits to `data/`):

- **No sides (decision 15).** The collection's landing text and its search-note venue no longer place texts or named authors on "both sides"; the introduction says an author can have records that articulate and records that contest one proposition.
- **Bostrom 2003 source.** The source now carries the capture of 6 August 2003 (`archivedUrl`, `archivedAt`) and says what the check found in it; "no earlier copy compared" is gone.
- **Grace (item 87) and Ng (item 95) dates** reach the document descriptions and the sources' `publicationDate` and attribution (2022-08-31; 2023-10), through a new `documentDates` map section.
- **Time notes.** The five replies from the 2019 thread carry the thread's note (dated by the LessWrong copy; comments undated), and Benson-Tilsen and Soares carries its PDF-metadata note, instead of "Date of posting."
- **AlphaGo Zero post.** The collection says it is not recorded on A4 and is recorded as contesting gradual takeoff, instead of "not recorded here".
- **Goertzel.** The month and issue-label finding moved from the 2002 essay's source to the time notes of the two Goertzel 2015 records.
- **A4 context records.** Muehlhauser and Salamon no longer rest on the name "intelligence explosion"; Aschenbrenner's `missing` says the year or less is for algorithmic progress, not the whole transition.
- **Map, R07.** The Bostrom 2002 entry no longer claims the term role; the reason says the passage rule places it on the CAIS statement.
- **Bengio FAQ.** It carries `attested` 2026-10-29, as Bengio's post on rogue AIs does; it keeps the R12 term role (the only R12 record whose passages use a usual name) and is listed above.
- **Decision numbering.** "Decisions applied" uses the decision numbers of the review note.
- **Statements trimmed to their passages** (no new retrieval): Carlsmith's 25%, Belrose and Pope's 1% (also cut from their R10b qualification), Davidson's 10% (statement, `estimates` and `conditions`), Hoes and Gilardi's design, Gopal's hackathon details (also cut from the engagement rationale). Ng's letter of July 2024 is held (above).
- **Zador and LeCun.** The qualification refers to the 2019 thread as recorded from the LessWrong copy, not "not retrieved" and "of October 2019"; the same correction is made for Chollet's essay in the qualification of Yudkowsky's reply. The collection text no longer dates the thread itself to October 2019 (its exchange is dated September–October 2019, between the essay and the copy).
- **Script.** A before-snapshot is used only when the stored data holds every row it lists as added; otherwise it is treated as foreign and the admission is rebuilt from the stored data, without restoring its meta or rows. Source version texts now end with a full stop before the check's note.

The counts above changed by one claim, entity, source and evidence record (the held Ng letter).

## Release

Dataset release **v0.22.0**, a minor release: a new collection. No schema change.

## Tests changed

- `research-path.test.ts` excludes this admission's added claims from the OpenAI dossier count (the reply to OpenAI's launch announcement); `search.test.ts` leaves this admission's passages out of the earliest "AGI" passage check. Both read the before-snapshot.
- The README coverage block and `review/essay-starter-gaps.md` were regenerated.
- The two map layout tests (2026-11-01, after main was merged into the chain). `query.test.ts` laid out the whole dataset twice and `mapGrammar.test.ts` four times; with this admission's records (1,928 entities) the first ran about 60 s on its own, past its 60 s limit, and the second 94 s in the full run, past its 90 s limit. The layout is quadratic in the records drawn; the app draws at most 150 (`mapLimits.focused`) and withholds the whole dataset's map. Both tests now lay out a fixed sample twice the largest drawable map (the 300 records with the most claims, ties by ID; in `mapGrammar.test.ts` also every landmark and the whole Anthropic map), with the claims among them, and keep the same checks: identical positions on a second run, in reverse order and with doubled claims; landmarks pinned; all positions finite; the empty, singleton and focused cases. Together they take seconds. No time limit was raised; the layout code is unchanged.
- Left to the release thread: `transactions.test.ts`, `versions.test.ts` and the chain in `src/editorial/historical-views.ts`, which need the new snapshot first in the chain (with it added temporarily, the historical-view tests passed).

## Budgets (maintainer decision, 2026-10-31)

The first build of this admission exceeded six page budgets (About, Search, dossier, claim, comparison, propositions). Decision: fix all three causes; no limit raised. Sizes are gzip-9 KB, as `pnpm build` measures them.

1. **The whole collection index on every sliced page** (+11.8 KB with this admission; 55.5 KB in all). Each slice now carries only the index entries of the records it holds (`indexFor` in `src/domain/collection-index.ts`): the collections of its claims, the earliest-located marks of its documents, and the proposition records whose authors include a person whose aliases the page reads (the person page's "texts they wrote"). The parts held give their entries together (`mergeIndexes` in `src/domain/slices.ts`, through `holdParts` in `src/ui/records.ts`), in the renderer and the browser alike; a slice that needs the relation core carries the whole index. The `virtual:collection-index` module is gone. The build draws every page from its slice with only these entries, as before.
2. **Every page loaded every reading definition** (`assets/question-starter-*.js`, +5.9 KB with `src/reading/risk-debate.ts`). The shared code (`Workspace.tsx`, `pages.ts`, `appearances.ts`, `landing.ts`, `deep-links.ts`, `release/collections.ts`, `propositions.ts`) imported every collection definition with its reader text. Propositions collections are now split: their frames (ID, title, question, groups, start-page wording; `src/reading/proposition-frames.ts`) are shared; each whole collection, with its introduction, search note, corrections, limits, related propositions, exchanges and open premises, loads only with its own page (`src/reading/proposition-loaders.ts`, `src/ui/proposition-text.ts`, preloaded with the page code) and computes its view there. Releases, starters and search facets read the whole collections (`src/release/whole-collections.ts`, `src/prerender/searchable-pages.ts`); the release definitions are unchanged, byte for byte. The shared chunk fell from 58.4 to 32.3 KB, plus a 5.2 KB frames chunk.
3. **Risk-debate records in the comparison and economics slices.** `comparisonView` read `attributes` of every claim to find comparison cells, so every claim with attributes (3,306, including the 217 risk-debate records) was in the comparison slice; it now reads only claims about the editions shown. `propositionsView` built a record for every proposition record in the dataset, of every collection, before keeping its own; it now keeps the records on its own propositions first. Neither page shows those records.

Built HTML: all 7,049 pages identical to the first build apart from `/assets/` tags (`scripts/page-hashes.ts`).

| Page type    | China III | This admission, before | After | Limit |
| ------------ | --------: | ---------------------: | ----: | ----: |
| Start page   |     110.0 |                  110.1 | 110.4 |   115 |
| Hub          |     275.6 |                  293.4 | 219.5 |   295 |
| About        |     327.4 |                  346.1 | 270.8 |   330 |
| Search       |     267.7 |                  276.9 | 256.4 |   275 |
| Explorer     |     307.2 |                  325.0 | 250.0 |   330 |
| Dossier      |     353.6 |                  371.6 | 299.1 |   360 |
| Person       |     276.8 |                  294.6 | 219.3 |   295 |
| Document     |     289.7 |                  307.5 | 234.2 |   310 |
| Claim        |     312.2 |                  331.3 | 256.9 |   325 |
| Collection   |     341.6 |                  359.4 | 292.3 |   370 |
| Comparison   |     512.5 |                  545.8 | 272.5 |   520 |
| Guide        |     365.6 |                  383.4 | 313.1 |   630 |
| Propositions |     428.4 |                  465.4 | 321.5 |   455 |

Slices: comparison 255.5 → 58.0 KB, economics propositions 171.5 → 95.0 KB; others grow by their index entries (dossier OpenAI 81.4 → 84.7, claim bucket 44.9 → 46.2, document history 67.6 → 76.3). All slices: 62.2 → 59.5 MB raw.

Not done: the other collection kinds (question starters, guides, control structures, commitments, document histories, the comparison, guided readings) still put their whole text in every page's shared code; the same split would apply. The search facets (+3.2 KB on Search with this collection) still list every collection's claims.

## Checks

Final run on the branch rebuilt after China III, the review corrections and the budget fixes:

- `pnpm tsx scripts/risk-debate-admission.ts --check`: the stored records match the pack and the map.
- `pnpm -s validate:data`: valid (1,915 entities, 5,338 claims, 1,815 sources, 7,169 evidence records).
- `pnpm -s check`: format, lint, typecheck, 763 unit tests passed; build with 7,048 pages pre-rendered on 4 threads in 139.6 s, 1,834 slice files (59.5 MB), no page needing the relation core. The pack's build scripts had eight lint errors (an unused constant and destructured fields left unused on purpose); they were fixed without changing behaviour.
- Bundle budgets: all thirteen pass, no limit changed. Start 110.4 of 115 KB; Hub 219.5 of 295; About 270.8 of 330; Search 256.4 of 275; Explorer 250.0 of 330; Dossier 299.1 of 360; Person 219.3 of 295; Document 234.2 of 310; Claim 256.9 of 325; Collection 292.3 of 370; Comparison 272.5 of 520; Guide 313.1 of 630; Propositions 321.5 of 455.
- `pnpm -s check:privacy`: passed. `pnpm release 0.22.0 --check`: reproduces byte for byte.
- Browser suite, the full suite on the last branch of the chain (installed Chromium through an untracked copy of the configuration without the Edge channel, deleted afterwards; no other server on port 4173): 237 passed and 8 failed in 48.9 min. Seven were expectations the admission's records change: Dario Amodei's search now also matches his Senate statement, so two specs open the person result instead of pressing Enter; the OpenAI dossier count leaves out `rd-` records; the names-mode search finds the two new Altman documents; the person-page check uses Daniela Amodei, who has no authored texts, since Dario Amodei now has one; one map wait uses the first-draw limit. The eighth was a layout fault in this admission's interface: the new related-collection and published-exchange links did not wrap, so the Yudkowsky page was 416 px wide at 390 px (and the risk debate page 875 px). They now wrap, as such links do elsewhere (`src/ui/propositions.css`), and no propositions page is wider than the screen at 390 px. The seven spec files then passed (41 tests).
- A fresh-context review of the budget changes found no fault of medium severity or above. One low finding is left open: opening a row of a second propositions collection from another page waits at most 60 animation frames for that collection's text to load, and if it has not loaded, the row is selected but not scrolled to. Fixed on the maintainer's decision of 2026-10-31: the opening waits for the page's code and the collection's text to load (`preloadPage`, `revealRow` in `src/ui/reveal-row.ts`), then for the row, which is opened, scrolled to and focused (`src/ui/reveal-row.test.ts`).

### Rerun after main was merged into the chain (2026-11-01)

- `pnpm -s validate:data`: valid (1,928 entities, 5,360 claims, 1,821 sources, 7,201 evidence records).
- `pnpm -s check`: 810 unit tests passed; 7,265 pages pre-rendered on 4 threads in 184.4 s, 2,029 slice files (77.7 MB), no page needing the relation core.
- Bundle budgets: all sixteen pass, no limit changed. Start 112.8 of 115 KB; Hub 234.1 of 295; About 285.7 of 330; Search 271.7 of 275; Explorer 265.3 of 330; Dossier 313.9 of 360; Person 233.9 of 295; Document 248.9 of 310; Claim 271.5 of 325; Collection 307.0 of 370; Comparison 287.2 of 520; Guide 328.0 of 630; Compute guide 276.5 of 340; Propositions 336.4 of 455; Year 339.2 of 400; Years index 230.3 of 305.
- `pnpm release 0.22.0 --check`: reproduces byte for byte. `pnpm -s check:privacy`: passed.
- Browser suite, full (installed Chromium through an untracked copy of the configuration without the Edge channel, deleted afterwards; no other server on port 4173): 292 passed in 37.2 min.
