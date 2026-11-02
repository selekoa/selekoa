# Lab genealogy 2: admission, 2026-11-01

Admission of the candidate pack in [`research/lab-genealogy-2/`](../research/lab-genealogy-2/README.md) (founders, moves, licensing-and-hiring agreements and funding rounds of frontier AI labs, 2023–2026), under the maintainer's decisions of 2026-10-30 (open questions 1–12, as recommended, and the rule on records resting on reporting) and the maintainer's adjudication of 2026-10-31 of the [cross-family check](../research/lab-genealogy-2/cross-family-check-2026-10-29.md) (items 1–10), both in the [review note](lab-genealogy-2-pack-2026-10-29.md).

- **Script:** [`scripts/lab-genealogy-2-admission.ts`](../scripts/lab-genealogy-2-admission.ts), adapted from the first genealogy admission. `--verify` retrieves the new sources and matches the admission's own passages, writing [`admission-verification-2026-11-01.json`](../research/lab-genealogy-2/admission-verification-2026-11-01.json); without flags it writes the records and the before-snapshot; `--check` compares them with the stored data.
- **Map:** [`lab-genealogy-2-admission-map-2026-11-01.json`](lab-genealogy-2-admission-map-2026-11-01.json): every hold and change with its reason. **Held:** [`lab-genealogy-2-admission-held-2026-11-01.json`](lab-genealogy-2-admission-held-2026-11-01.json).
- **Before-snapshot:** [`lab-genealogy-2-admission-before-2026-11-01.json`](lab-genealogy-2-admission-before-2026-11-01.json), first in the chain in `src/editorial/historical-views.ts`. Base: branch `crane-nrc-fix` (v0.23.1), on `heterodox-admission` (v0.23.0), on `main` at 81717f0; rebuilt after `main` at e7f372c was merged into the chain, below.
- **Schema:** unchanged. **Editorial state:** every record is a seed; no evidence is human-reviewed.

## Counts as admitted

| Records  | Added | Changed |
| -------- | ----: | ------: |
| Claims   |   253 |       2 |
| Entities |   129 |       0 |
| Sources  |   121 |       2 |
| Evidence |   395 |       0 |

- **Claims:** `held_role` 103, `participated_in_round` 50, `co_founded` 29, `announced_funding` 25, `departure_announced` 25, `unit_of` 6, `founding_stated` 4, `licensing_hiring_agreement` 4, `investment_announced` 4, `launched` 2, `unit_disbanded` 1. 66 keep the stage “announced”. 95 say in their qualification that they rest on reporting; 14 of these had no such label in the pack and gained “The record rests on reporting.” (the rule of 2026-10-30).
- **Entities:** 77 people and 52 organisations (29 investors, 10 AI companies, 6 technology companies, 4 research units, 2 business units, 1 research institute). Three proposed entities were admitted meanwhile by other packs and are reused (Alec Radford, AMD, HUMAIN).
- **Evidence:** 247 quotations and 148 paraphrases, 23 of them added at admission from texts the check located.
- **Changed rows:** the existing records of the Microsoft–Inflection agreement (X01 context, X02 support) and of Sutskever's co-founding of SSI (X03 support) gain one or two evidence rows; two existing sources (xAI's Series C and Series E pages) gain the pack's length count so the quotation limit can be checked.

## Decisions applied

**Open questions of 2026-10-30.**

| Question                           | As applied                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2. CMA “certain assets”            | No `acquired` edge; the CMA's two passages are evidence on the existing agreement record (with adjudication 9).                                                                                                                                                                                                                                                                                                                                                        |
| 3. Brockman's sabbatical           | Not recorded (the pack held it); his return stands on his own post.                                                                                                                                                                                                                                                                                                                                                                                                    |
| 4. Departures known from reporting | Admitted under `departure_announced`, labelled as resting on reporting.                                                                                                                                                                                                                                                                                                                                                                                                |
| 5. Smaller or relaying outlets     | Held unless the check confirmed them from an originating report or a primary text: Radford (QbitAI), Xie Jian (36Kr), Nicolls (36Kr/新智元), Ramani (WinBuzzer), Quoc Le's departure (VnExpress), Velloso's Meta VP and Google DeepMind VP titles (Baguete). Admitted with the primary text the check found: Velloso's departures from Google and Meta (his posts), Ru Liyun's departure and co-founder credit (HCR's letter), Tworek and Schwarzer (their own notes). |
| 6. Investor participations         | Admitted where the recipient company's announcement or a filing names the investor (including Inflection's own release, adjudication 7). Held: reporting-only participants (General Catalyst in Mistral's Series B, Qiming and Tencent in StepFun's B+, Lightspeed and Sequoia at Ricursive and Ineffable), and the cases listed below as open.                                                                                                                        |
| 7. Zhipu's subscriber vehicles     | Admitted as inferred, with the vehicle named.                                                                                                                                                                                                                                                                                                                                                                                                                          |
| 8. Relayed reasons                 | Tworek's and Luan's reasons are now in their own words (adjudication 8); Velloso's reason relayed from an interview is not recorded.                                                                                                                                                                                                                                                                                                                                   |
| 9. Evidence for existing records   | X01–X03 added as evidence rows, not new claims.                                                                                                                                                                                                                                                                                                                                                                                                                        |
| 10. Investor entities              | Admitted with the pack's short descriptions; “DST” is not merged into DST Global (only the two records whose company names DST Global use it).                                                                                                                                                                                                                                                                                                                         |
| 11. Identity doubts                | Applied through adjudication 6.                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| 12. Reflection's date              | Through adjudication 5.                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| Records resting on reporting       | Admitted only where the check confirmed them from a primary text (that text is then evidence), or labelled as resting on reporting.                                                                                                                                                                                                                                                                                                                                    |

**Adjudication of 2026-10-31.**

1. **Patel (L197):** his own post (27 October 2026, matched) says he left Meta Superintelligence Labs a few months earlier: a completed departure, stated after the event, the exact date unknown (no “announced” stage).
2. **Hooker (L088), Katti (L195):** both stay announced; their own posts (matched) give the scheduled last days, 15 September 2025 and 15 November 2026.
3. **Zhipu (L013):** dated November 2023, the completion of stage 1 in which Shanghai Yunya subscribed (prospectus, matched); January 2024, the round's completion, is kept distinct.
4. **DST (L114, L121):** held; no mapping to DST Global.
5. **Reflection AI (L117–L124):** dated 9 October 2025 by the company's own post on X (matched); the blog's 9 August 2025 is recorded as a conflict without a cause.
6. **Goodman (L223), Applied Compute (L224, L227):** credits from Andi Peng's launch post, Applied Compute's post and Rhythm Garg's post (all matched); no founding dates.
7. **Inflection (L004–L006), Covariant (L028, L030–L032):** the originals the check recovered from archive captures are evidence as labelled paraphrases (the Internet Archive refused the admission, so nothing is quoted from them). Covariant's agreement is a licence and hiring agreement, not an acquisition; Stinson's move to CEO stays prospective. L029 (Chen as CEO) is unchanged: the original does not state it.
8. **Tworek (L137), Luan (L163), Schwarzer (L170–L171):** Tworek's note is an image, read visually by the check and again at admission, and paraphrased; Luan's post is matched; the part of Schwarzer's note about Anthropic was read in full only by the check and is paraphrased. Reasons only in their own words; titles stay with the reporting; no effective dates.
9. **X01–X03:** as above.
10. **L042** locator printed p. 135; **L063** the abridged quotation is marked in its note.

## Held

27 records; the full list with reasons is in the held file.

| Held                                                                                                                         | Why                                                                        |
| ---------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| 7 records on smaller or relaying outlets (above)                                                                             | Open question 5: not confirmed from an originating report or primary text. |
| 7 reporting-only or counsel-named participations                                                                             | Open question 6.                                                           |
| Periodic Labs' and Reflection AI's “DST”                                                                                     | Adjudication 4.                                                            |
| Thinking Machines Lab's seed participants (7)                                                                                | Open for the maintainer (below).                                           |
| Investor self-announcements: Lightspeed (Mistral seed), a16z (Mistral Series A), Emergence (Adaption), HUMAIN (xAI Series E) | Open for the maintainer (below).                                           |

Six proposed entities have no admitted record and are not admitted (Cisco, Emergence Capital, Jane Street, Michael Nicolls, Qiming Venture Partners, ServiceNow).

## Open for the maintainer

1. **Thinking Machines Lab's seed participants (L081–L087).** Open question 6 named them as a reporting-only list to leave as context; the check found Mira Murati's own post naming them, which changes that basis. Admit them with her post (which X's syndication endpoint truncates before the names, so it would be a check-read paraphrase), or keep them as context?
2. **Investor self-announcements (L003, L010, L165, L169).** Does an investor's own announcement of its investment count as “the company's own announcement” under open question 6?
3. **Archive-only originals.** Inflection's and Covariant's originals and the end of Schwarzer's note rest on the check's reading only. An archive-capable thread could match them and replace the paraphrases with quotations.
4. **SSI's updates page** is held twice in the dataset (the first genealogy's source, scoped to 3 July 2025, and this pack's, for 4 September 2024); they are not merged.
5. **Bubeck's stated reason** (a Microsoft spokesperson's account, relayed by Maginative without a named source) is not recorded; the check recommended leaving it out, and the adjudication does not decide it.
6. **Open question 5's reach.** It was applied to the outlets it names. Comparable trade outlets carrying Meta moves (Mobile World Live, TechTarget, Storyboard18, The Decoder; eight records) are admitted with the reporting label; the check did not confirm them from a primary text. Extend the hold to them?
7. **Participants named on the company's announcement page but not tied to the round** (Periodic Labs, Reflection AI, humans&) are admitted, because the check found the company's announcement of the round itself; Ricursive's are held, because the company names its backers only on its homepage, without the round. The distinction follows the check's ratings; confirm it.
8. **Reflection AI's blog source** keeps the displayed date (9 August 2025) as its publication date, which the check says is not established; the records are dated by the post on X.
9. **Ruddarraju's July 2026 move** rests on exchange4media, which the check could not read; the check found his own LinkedIn post of July, which was not added (not in the adjudication).

## Fresh-context review (2026-11-01)

A fresh-context machine review (Claude family) of the prepared admission reproduced the stored data and the before-snapshot, and confirmed adjudications 1–9 and open questions 2, 3, 5, 8, 11 and 12 as applied. Its findings, fixed through the map and the script:

- **Adjudication 10 was only partly applied.** Every locator the check flagged is now corrected (Mistral's Series A, Kilpatrick ×3, Covariant ×5, Carlini, Ricursive ×4, Patel, Hoffmann), and an abridged anchor (Andreou) is marked like an abridged quotation. Evidence notes no longer say that the check's findings were applied; they say which item re-read the record's sources.
- **Wording made stale by open question 4** (“Open question for the maintainer … pending a decision”) in four departures, and the Brockman sabbatical “held for the maintainer”: now the decided wording.
- **Entity descriptions restated held records** (Xie Jian, Aparna Ramani, Mat Velloso, General Catalyst) or named rounds with no admitted record (CRV, Greenoaks), and one used a priority word (Robert Keele); Patel's still said “reported … as leaving”. Rewritten. Entities now cite only the sources of their own admitted records.
- **Open question 7:** the three Zhipu participations name the subscriber vehicle in their role.
- **Velloso's roles** restated the titles held under open question 5; they now say the post gives none and attribute Baguete's wording.
- **Ru Liyun's departure** was dated by the commentary (16 July 2026); it is now dated by HCR's letter (19 July 2026), with 16 July in the note.
- **Reporting label:** three qualifications that already said what they rest on had the label prepended; the rule now looks for any “rests on”.
- **Notes:** Chinese quotations counted as one word now count characters; passages read only by the check carry the check's date (2026-10-31) and no retrieval route of the admission.
- **Existing records:** Sutskever's co-founding and the Microsoft–Inflection agreement now say in their qualifications what the added passages show.
- **Role wording:** Rhythm Garg's and Hoffmann's roles attribute their descriptions to the source.
- **Bubeck's relayed reason** is not recorded (listed above).
- **Open question 6 context:** the round totals of Mistral's Series B and StepFun's B+ name the reporting-only participants as context.
- **Script:** a rerun now stops when the stored data no longer matches the snapshot's base (after a merge of `main`), instead of restoring the snapshot's rows over it; “Amazon Staff” is no longer split into a given and a family name.

Listed above, not decided: the reach of open question 5, the Ricursive distinction, Reflection's blog date and Ruddarraju's own post.

## Release

Dataset release **v0.23.2**, a patch release: additions within the existing lab genealogy. No schema change.

## After the merges with control-timelines and main (2026-11-01)

The planning thread asked for `control-timelines` (release v0.22.1, the OpenAI control collection's version 2) to be merged into `heterodox-admission` and carried up the chain, then for `main` instead, which by then held `control-timelines` and the pre-launch interface (pull requests #124 and #125). Each branch below was rebuilt on its new base, and the rebuilt `crane-nrc-fix` (at f484e4b) was merged in here, without rebase and without conflict.

- **Data:** no branch below changed the data this admission starts from, so its records are unchanged. The script was rerun with `--base` (an option added for rebuilds on a new base): the before-snapshot is the same except that its `baseCommit` names the new base, `crane-nrc-fix` at f484e4b.
- **Release:** v0.23.2 was re-cut against the re-cut v0.23.1: 898 added and 4 changed, as in the first cut. It differs from the first cut only in the collections as `main` has them (the OpenAI control collection's version 2, and the limits the pre-launch interface reworded) and in the checksums. No record of this admission is in a control collection.
- **Page budgets:** with `main` and the base's people-index change, Search came to 275.6 of 275 KB: this admission adds about 1.1 KB to every page through its people in the A–Z index, and about 1.9 KB to the search page through its organisations in the search filter and its records in the search index. The landing summary now lists a person by name alone when the identifier is the name's slug (`listPerson` and `listedPerson` in `src/domain/people-index.ts`; the A–Z list derives the identifier back). 473 of the 516 people are listed by name alone, which saves about 3.0 KB on every page. A unit test checks that every listed person gives back the stored identifier and name. No limit was changed.
- **Code from the base:** the control timelines page and the pre-launch interface from `main`, the people index without sort names from `heterodox-admission`. The browser specs' exclusions of this admission's records (below) needed no change for the new interface: the full suite passed.

## Tests and code changed

- `transactions.test.ts`, `versions.test.ts` and the chain in `src/editorial/historical-views.ts` list the new snapshot first. `framework-evidence.test.ts` lists the new French source; `genealogy-admission.test.ts` and `research-path.test.ts` set aside the rows the before-snapshot lists as added. The README coverage block was regenerated.
- **People index on every page** (`src/domain/landing.ts`). The landing summary is in the shared bundle of every page, and its A–Z people index carried each person's family-name sort key as well as the name and link. With this admission's 77 people the Search page came to 277.5 of 275 KB. The index now ships only the name and the link (the sort order is already in the grouping), which saves about 3.5 KB gzip on every page; no limit was changed. Since the rebuild on `main` this change comes from `heterodox-admission`, where the merge of `main` first needed it; a second trim made here is described below.
- **Browser specs.** `tests/browser/dossier-count.ts` takes this admission's records out of the dataset before counting a dossier's earlier records, as for the key papers admission: Anthropic gains nine earlier records through the people this admission adds. `cartography.spec.ts` leaves `lg2-` records out of Anthropic's claim list. `chronicle.spec.ts` read every date in an entry, so an interval's end (Liberatore at xAI, April to July 2025) looked out of order; it now reads each entry's own date.
- The pack's scripts in `research/lab-genealogy-2/` had unused bindings that failed lint; removed, with no change in behaviour.

## Checks

- `pnpm tsx scripts/lab-genealogy-2-admission.ts --verify`: every new passage of the admission matched its retrieved text, or is marked as read by the check (2026-10-31) or read visually; `--check`: the stored records match the pack and the map.
- `pnpm -s validate:data`: valid (2,130 entities, 5,785 claims, 2,007 sources, 7,893 evidence records).
- `pnpm -s check`: format, lint, typecheck, 816 unit tests passed; 7,883 pages pre-rendered, 2,222 slice files (85.6 MB), no page needing the relation core.
- Bundle budgets: all sixteen pass, no limit changed. Start 111.0 of 115 KB; Hub 232.9 of 295; About 287.3 of 330; **Search 274.2 of 275** (the tightest); Explorer 271.9 of 330; Dossier 320.7 of 360; Person 232.7 of 295; Document 247.6 of 310; Claim 276.3 of 325; Collection 305.8 of 370; Comparison 286.0 of 520; Guide 326.8 of 630; Compute guide 275.4 of 340; Propositions 335.5 of 455; Year 348.9 of 400; Years index 229.1 of 305.
- `pnpm release 0.23.2 --check`: reproduces byte for byte. `pnpm -s check:privacy`: passed.
- Browser, the full suite (installed Chromium through an untracked copy of the configuration without the Edge channel, deleted afterwards; port 4173 free afterwards): 279 passed and 13 failed on frozen counts and the chronicle's interval end (above); after the fixes the 26 tests of the six affected specs passed.

### Checks after the merge with main

The checks above were run before the rebuild; these supersede them.

- `pnpm tsx scripts/lab-genealogy-2-admission.ts --check`: the stored records match the pack and the map. `pnpm -s validate:data`: valid (2,130 entities, 5,785 claims, 2,007 sources, 7,893 evidence records).
- `pnpm -s check`: format, lint, typecheck, 841 unit tests passed; 7,902 pages pre-rendered, 2,241 slice files (93.2 MB), no page needing the relation core.
- Bundle budgets: all seventeen pass, no limit changed. Start 108.9 of 115 KB; Hub 230.9 of 295; About 287.4 of 330; **Search 272.3 of 275** (the tightest); Explorer 269.9 of 330; Dossier 318.4 of 360; Person 230.7 of 295; Document 245.6 of 310; Claim 274.3 of 325; Collection 303.8 of 370; Comparison 285.0 of 520; Guide 325.2 of 630; Compute guide 273.4 of 340; Propositions 333.4 of 455; Control timelines 259.2 of 285; Year 346.9 of 400; Years index 227.1 of 305.
- `pnpm release 0.23.2 --check`: reproduces byte for byte. `pnpm -s check:privacy`: passed.
- Browser, the full suite against the new interface (installed Chromium through an untracked copy of the configuration without the Edge channel, deleted afterwards; port 4173 free afterwards): 316 passed, none failed.
