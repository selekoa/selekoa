# Admission of the esoteric economics strand, 2026-10-16

The maintainer decided on 2026-10-16 to admit the candidate pack [`research/economics-mainstream/esoteric/`](../research/economics-mainstream/esoteric/README.md) into the dataset. It was admitted the same day into the existing collection “Economics of machine intelligence” as a third group, “Superintelligence and existential risk” (propositions E01–E05). Schema 2.14 is unchanged. Machine work, not human review; every record is a machine-checked seed.

- Script: [`scripts/esoteric-admission.ts`](../scripts/esoteric-admission.ts) (`--check` compares the stored rows with the pack and the map).
- Authored map: [`esoteric-admission-map-2026-10-16.json`](esoteric-admission-map-2026-10-16.json): proposition IDs and names, document and source IDs, author-name splits, lengths, rewrites of pack codes in reader-facing text, one shortened quotation and the passages held back.
- Quotation re-check: [`esoteric-admission-quote-check-2026-10-16.json`](esoteric-admission-quote-check-2026-10-16.json).
- Before-snapshot: [`esoteric-admission-before-2026-10-16.json`](esoteric-admission-before-2026-10-16.json), first in the chain in `src/editorial/historical-views.ts`; the exact-view test reproduces the dataset at main `d76440b`.

## What was admitted

| Item                                           |       Count |
| ---------------------------------------------- | ----------: |
| Pack passages                                  |         119 |
| Admitted passages (evidence rows)              |         116 |
| Held back                                      |           3 |
| Records (claims)                               |          86 |
| – articulate / contest / bear on               | 35 / 3 / 48 |
| – tier 1 / tier 2                              |     67 / 19 |
| – relay (every passage reports another's view) |          11 |
| – model scenarios (flagged, context-only)      |          16 |
| Context-only evidence rows                     |          68 |
| Documents with records                         |          33 |
| New entities (5 propositions, 23 documents)    |          28 |
| New sources                                    |          25 |
| Existing rows changed                          |           2 |

| Proposition | Name in the dataset                                                       | Articulate | Contest | Bear on |
| ----------- | ------------------------------------------------------------------------- | ---------: | ------: | ------: |
| E01         | Machine intelligence improving itself accelerates its capability growth   |          6 |       3 |      14 |
| E02         | Machine intelligence exceeding human cognition in essentially all domains |          6 |       0 |       9 |
| E03         | Existential risk from AI as a matter for economic analysis                |          8 |       0 |       5 |
| E04         | AI developers’ incentives matter for safety                               |          6 |       0 |       6 |
| E05         | Economics’ engagement with superintelligence, AGI and the singularity     |          9 |       0 |      14 |

How the pack became records:

- **Relations, voice, context-only reasons, tiers and qualifications** are the pack's, after the adjudication of the GPT check and the maintainer's E05 decision (option A) of 2026-10-15. E05's criterion is the decided one.
- **Reported voice.** A passage marked `voice: reported` carries the note “The passage reports a view the author does not state as their own.” A record whose passages are all reported has register `relay`.
- **Model scenarios** (23 passages in 16 records) carry the qualifier “A model scenario under stated conditions, not the author’s own claim.” and every one is context-only.
- **Documents already in the collection** keep their identity. Six NBER texts and two Hanson texts reuse their existing source rows: each is the same expression, by SHA-256, as the pack checked. The two Hanson texts also take the dates already recorded for them (the comment on Vinge: 1998-10, wording attested 2000-11-17; the working paper: wording attested 2000-08-19), which give the same wording dates as the pack.
- **The compiled Hanson–Yudkowsky debate** (MIRI, 2013) became one document per post, so that each record is one text by one author with its own date: ten posts of 2008, 2011 and 2013. Two posts were already documents (Yudkowsky, “Recursive Self-Improvement”; Hanson, “What Core Argument?”); each gained a source for its chapter of the compilation. These are the two changed rows. Each post's length is counted from the compilation's text layer. “AI Go Foom” is dated 20 November 2008 from the original page, not the compilation's heading.
- **Trammell and Korinek, NBER Working Paper 31815**: the October 2023 version (Wayback capture of 2023-11-29) and the April 2026 revision are separate documents, because their wording differs and both hold records on the same propositions. The existing record of the 2021 GPI text is unchanged.
- **Jones**: the NBER working paper (2023) and the AER: Insights article (2024, abstract page) are separate documents, as journal versions are elsewhere in the collection.
- **Hyytinen's KAK editorial** is a Finnish source (`language: fi`); its two quotations stay in Finnish.
- **Lengths of abstract-only texts.** AER: Insights: 16 printed pages (575–590, Crossref) at 400 words a page. The five NBER papers whose PDFs were refused: a stated floor of 2,000 words, not a count.
- **Reader-facing text.** Research-pack passage codes in eleven qualifications and context-only notes were replaced with plain descriptions; references to pack files were removed from three criteria; a pack identifier and a stale “maintainer may reassign” were replaced in two tier bases. Each is listed in the map. Evidence check notes keep the pack codes, as elsewhere.
- **One quotation shortened.** E04-08 was 51 words as the dataset counts them; its second fragment and the ellipsis were dropped, and the context-only note now gives what follows. The wording is unchanged.

## Held back

| Passage | Proposition, relation                     | Reason          |
| ------- | ----------------------------------------- | --------------- |
| E01-04  | E01, articulates (reported, context-only) | Quotation limit |
| E01-07  | E01, bears on (context-only)              | Quotation limit |
| E02-02  | E02, bears on                             | Quotation limit |

All three are from Hanson's comment on Vinge's singularity concept (1998), which runs to about 1,500 words, so about 150 words may be quoted from it (editorial policy, 2026-10-15). The explosive-growth strand already quotes 120. The comment's E01 contest (E01-05, the same words as an existing quotation, counted once) and one context passage (E01-06, 26 words) fit. None of the three holds a role. Raising the limit for this text, or replacing an existing quotation, is a maintainer decision.

## Wayback passages

Twenty passages come from four Internet Archive captures (Hanson's 1998 article, comment and working paper; the October 2023 version of Trammell and Korinek). web.archive.org refuses connections from the cloud environment, so they were not re-read on 2026-10-15 or at admission, and no attempt was made. The script admits such a passage only if the GPT check of 2026-10-15 recorded the quotation as verified against a retrieval of the same capture made that day, with the Memento timestamp and SHA-256 equal to the pack's. All 20 meet this. Seventeen are admitted (three are held back above, for the quotation limit, not for verification). Their evidence rows are dated 2026-10-15 and their check notes state this basis.

## Quotation re-check at admission

Every other source of the pack (21: NBER PDFs and abstract pages, the AEA page, the MIRI compilation, the KAK PDF) was retrieved again on 2026-10-16 with `tools.mjs fetch`, and `verify` was run on a scratch copy of the pack. One of them, Sachs and Kotlikoff (2012), was read for the strand but has no passages. The 99 quotations from the other 20 match (one across a text-layer paragraph break, checked by hand earlier); no problems. Fourteen of those 20 texts are byte-identical to the recorded copies; the six HTML abstract pages differ in page furniture and still contain the quotations. These evidence rows are dated 2026-10-16.

## Earliest located

Recomputed by the script from the admitted records, per proposition and stance, within tier 1 and separately within tier 2, by the date of the checked wording (the attested date where there is one), over every record in the collection that points to E01–E05. Records whose passages are all reported never count. The existing G and M records point to other propositions, so no G or M role can change and none did. The result equals the pack's roles; the script fails otherwise.

| Proposition | Tier 1 articulation                                              | Tier 1 contest                    | Tier 2 articulation                                  | Tier 2 contest                                          |
| ----------- | ---------------------------------------------------------------- | --------------------------------- | ---------------------------------------------------- | ------------------------------------------------------- |
| E01         | Aghion, Jones and Jones (2017-10)                                | Aghion, Jones and Jones (2017-10) | Yudkowsky, “Recursive Self-Improvement” (2008-12-01) | Hanson, comment on Vinge (1998-10, attested 2000-11-17) |
| E02         | Trammell and Korinek, October 2023 version (attested 2023-11-29) | none                              | Hanson, “Debating Yudkowsky” (2011-07-03)            | none                                                    |
| E03         | Nordhaus (2015-09)                                               | none                              | none                                                 | none                                                    |
| E04         | Gans (2023-11)                                                   | none                              | Hanson, “Friendliness Factors” (2008-11-16)          | none                                                    |
| E05         | Nordhaus (2015-09)                                               | none                              | none                                                 | none                                                    |

Changes to earliest located: none against the pack. These are new propositions, so no earlier headline in the dataset is replaced. Earlier reported passages exist for E01 and E02 (Hanson's report of Yudkowsky's argument in “AI Go Foom”; Nordhaus, Korinek and Stiglitz, and the 2019 NBER introduction reporting computer scientists' views); they are relay records and hold no role. E05's tier-1 role rests on a statement about the field (Nordhaus 2015) and must be read with the records under E01–E04 from 1998; the collection's gaps say so.

## Validation change

Schema validation required every articulation to be no earlier than the earliest located one, so earlier relay records failed it. In a tiered collection a relay record now neither holds earliest located nor decides which record does, and validation reports a relay record that holds the role. Untiered collections (the human-thought collection, where `relay` means a text forwarded by someone else, such as Vinge's 1998 text) are unaffected. No field was added; the schema stays 2.14.

## Checks

- `pnpm tsx scripts/esoteric-admission.ts --check`: stored rows match the pack and the map.
- `pnpm validate:data`, `pnpm check` (format, lint, typecheck, tests, build) and `pnpm check:privacy`: see the branch's commit; all passed before the push.
- New test file `src/domain/esoteric-admission.test.ts`; the economics, version and transaction tests and the historical-view chain include the new snapshot.

## Open for the maintainer

- The three passages held back for the quotation limit of Hanson's 1998 comment.
- Re-read the 17 admitted Wayback passages when web.archive.org answers.
- Library and journal items from the pack: Hanson, _The Age of Em_ (2016); Cowen, _Average Is Over_ (2013); Puhakka's KAK editorial 3/2024.
- The five NBER papers of 2025–2026 are recorded from abstract pages only, with an assumed length floor.
- The tier basis of the compiled debate records it as tier 2 by the decision of 2026-10-12; whether individual Hanson posts count as substantive scholarly turns was not revisited.
