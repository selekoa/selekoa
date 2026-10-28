# Frameworks to law, part 2: admission, 2026-10-28

Part 2 of the admission of the candidate pack in [`research/frameworks-to-law/`](../research/frameworks-to-law/README.md): the international, UK and US records, with the schema change they need. Part 1 is recorded in [frameworks-to-law-admission-1-2026-10-28.md](frameworks-to-law-admission-1-2026-10-28.md). Part 2 follows the maintainer's decisions of 2026-10-28, which adopt the recommended answers of the [pack report](frameworks-to-law-pack-2026-10-28.md) and every correction of the [cross-family check](../research/frameworks-to-law/cross-family-check-2026-10-28.md).

- **Script:** [`scripts/frameworks-to-law-admission.ts`](../scripts/frameworks-to-law-admission.ts) with `--part 2`, from the pack and the authored [map](frameworks-to-law-admission-map-2026-10-28.json). `--part 2 --check` compares the result with the stored data.
  - The script's later changes leave part 1 unchanged: `--part 1 --check` reproduces part 1 on the part 1 data.
  - It cannot be run on data that already contains part 2.
- **Before-snapshot:** [`frameworks-to-law-2-before-2026-10-28.json`](frameworks-to-law-2-before-2026-10-28.json), first in the chain in `src/editorial/historical-views.ts`, before part 1's.
- **Fresh retrieval at admission:** every quotation was matched again in a direct retrieval on 2026-10-28 ([`admission-verification-2026-10-28.json`](../research/frameworks-to-law/admission-verification-2026-10-28.json)).
  - The Internet Archive refused this admission's connections, so the release-period captures rest on the cross-family check's reading of them.
  - The Commission's library page also refused.
- **Editorial state:** every record is a seed. No evidence is human-reviewed.

## Schema 2.19 (decisions 1–3)

- **Countries (decision 1).** The entity type `country`, keyed by its ISO 3166-1 alpha-2 code in `countryCode`; the ID is `country-` and the code in lower case.
  - One country is recorded, New Zealand, because its joining of the Bletchley Declaration is a claim.
  - A whole list stays one document-level record.
  - `signed_commitment` may now have a country or a public body as subject.
- **Predicates (decision 2).**
  - `lists_participants`, document-level, with `attributes.listing`: the count of entries and whether the source states it or Selekoa counted it.
  - `introduced`, `passed`, `vetoed` and `revoked`, explicit events with supporting primary evidence.
  - No other proposed predicate was added: not `not_listed`, `legislative_status`, `renamed_body`, `re_established_as`, `announced_agreement`, `announced_rescission` or `reported_collaboration`.
- **Announcements as a stage (decision 2).**
  - An announced revocation is `revoked` with `attributes.activityStage: announced`, dated by its announcement; validation enforces both.
  - The US AI Safety Institute's announced agreements with Anthropic and OpenAI, and CAISI's reported work with both, use the existing `evaluation_engagement`, whose stage separates announced from reported work.
  - The UK–US memorandum is a `signed_commitment` with stage `signed`, dated by the release that reports the signing.
- **Renamings (decision 2).** `datedNames` on one entity, each name with its dates, a note and its sources.
  - The US AI Safety Institute (an existing record, changed) carries "U.S. AI Safety Institute" until June 2025 and "Center for AI Standards and Innovation (CAISI)" from June 2025.
  - The new UK AI Security Institute record carries "AI Safety Institute" from 2 November 2023 to 14 February 2025 and "AI Security Institute" from 14 February 2025.
- **Intergovernmental bodies (decision 3).** The G7 ("Intergovernmental forum") and the OECD ("Intergovernmental organisation") are public bodies with an intergovernmental subtype.
- **Computed dates (decision 4, moved from part 1).** `attributes.provision.computed` marks a provision record whose date a stated rule fixes. Such a record is inferred, carries its rationale, quotes the rule and is dated by the computed date with basis `effective`.
  - The AI Act's entry into force on 1 August 2024 is the one such record.
- **Release format 1.7** adds the entity fields `countryCode` and `datedNames` and their CSV columns. [dataset-format.md](../docs/dataset-format.md) and [ontology.md](../docs/ontology.md) describe the change.
- **Interface:** a country silhouette for the map and legend; the Inspector shows a list's count and its basis, and an entity's dated names.

## Counts as admitted

| Records  | Added | Changed |
| -------- | ----: | ------: |
| Claims   |   114 |       0 |
| Entities |    51 |       1 |
| Sources  |    57 |       0 |
| Evidence |   170 |       0 |

- **Claims:** 39 international, 19 UK, 55 US and the AI Act's entry into force.
- **By predicate:**
  - `states_provision` 46, `published` 26, `lists_participants` 11, `enacted` 7, `passed` 5;
  - `evaluation_engagement` 4, `cites` 3, `signed_commitment` 3, `changes_from` 3;
  - `provision_not_found` 2, `revoked` 2, `vetoed` 1, `introduced` 1.
- **Derivation:** five records are inferred: two bounded absences, two comparisons of the New York texts and the computed entry into force.
- **Entities:** 38 documents, 12 public bodies and one country. The changed entity is the US AI Safety Institute, which gained its dated names.
- **Sources:** 57 new. 14 link a release-period Internet Archive capture that the cross-family check opened.
- **Evidence:** 141 quotations and 29 paraphrases.
  - 160 items are the pack's.
  - 6 are pack items of folded records (see below).
  - 4 were added at admission.

## Decisions applied, per record family

- **Participant lists as dated snapshots.**
  - Paris: the PDF lists 64 entries and the web page 65 (as served on 2026-10-27); they differ by Zimbabwe.
  - New Delhi: 88 (as on 21 February 2026) and 91 (24 February 2026) are counts stated by a release of 24 February 2026, and are now two records; 92 is the list "as of 5th March 2026", counted.
  - Hiroshima: 20 entities are stated by the OECD paper's Annex A. The 19 companies of the Japanese ministry's page and the 25 reports of the OECD.AI overview have different coverage and are named in the qualification, not reconciled.
  - Every list says that being listed is not a signature or compliance.
- **UK and US absence from the Paris lists.** The two pack records with the unadopted `not_listed` predicate are not admitted as records. The absence is stated in the two Paris list records, with the pack's evidence for each expression, and both say that absence is not a refusal.
- **Michigan HB 4668 (decision of 2026-10-28).** The pack's status record used the unadopted `legislative_status`.
  - The status is recorded in the introduction record's qualification and evidence, only as of the Internet Archive capture of 23 March 2026; the history source links that capture.
  - The quoted words are shortened to the wording the capture shows ("referred to"; the live page now says "re-referred").
  - At admission the live page could be reached and showed the same last actions of 19 March 2026; this is in the source note, not a later status record.
- **SB 1047 and the Illinois Act (decision 8).** Admitted as labelled.
  - The three SB 1047 votes rest on the author's office's releases.
  - The Illinois Act's enactment rests on the Governor's Executive Order 2026-07. The order, not the signature, dates the record.
  - No date, bill number or Public Act number from secondary reports is recorded. The pack's document note for the Illinois Act, which mentioned such reports, was rewritten.
- **"SI" wording (decision 9).**
  - Fourteen NIST, BIS and Michigan sources record the release-period capture the cross-family check opened as `archivedUrl` and `archivedAt`; the quotations are the wording the check matched there.
  - The BIS rescission page and its PDF as served now write "SI" for "AI" and add a bullet on Malaysia and Thailand, which their source notes say.
  - In this admission's retrieval of the NIST pages no "SI" substitution was found, so no difference is claimed for them.
- **BIS rescission.** An announcement, not a formal rescission: `revoked` with stage `announced`. The web page (13 May 2025) and the PDF (12 May 2025, "initiated a rescission") are separate sources, each with its own date.
- **Executive order provisions.** Dated by their Federal Register publication, like the AI Act's provisions by the Official Journal; the signature date is in each note. The revocation of EO 14110 is dated by EO 14148's signature.
- **Declarations that name commitment texts.** Three records are recorded with `cites`, not `references_commitment`:
  - the G7 leaders' welcome of the Hiroshima code;
  - the Seoul Declaration's support for the code;
  - the Seoul Declaration's note of the Frontier AI Safety Commitments.
  - Reason: that predicate and the external commitments collection are for frameworks that link themselves to a text, and a governmental declaration is not a framework. The words of each declaration are kept in the statement and evidence.
- **Statements that are not provisions** are `published` records by the document's publisher, as in part 1:
  - the Paris statement's note of the voluntary commitments;
  - the chair's statement on the AI Safety Institute's launch;
  - the UK release on the Institute's focus;
  - the UK release on AI incident reporting.
- **Provision kinds.** As in part 1; the pack's `principle` statements (affirmations in declarations) are required actions as worded. The kinds reserved for comparison cells are not used.
- **Provision keys.** Where the pack gave none, the record ID without its prefix.

## Cross-family corrections

| Item | Record                            | Correction                                                                                                                                                                                                                                                                    |
| ---- | --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 14   | Paris PDF list                    | 64 entries, Zimbabwe absent; dated by the PDF's file creation date, which is said to be metadata.                                                                                                                                                                             |
| 15   | Hiroshima opening round           | 19, 20 and 25 have different coverage; "opening round" in our prose.                                                                                                                                                                                                          |
| 18   | New Delhi counts                  | 88, 91 and 92 on their distinct dates (two records from one release).                                                                                                                                                                                                         |
| 22   | Paris, UK                         | Absence from both lists; not a refusal.                                                                                                                                                                                                                                       |
| 23   | Paris, US                         | The same.                                                                                                                                                                                                                                                                     |
| 42   | BIS rescission                    | Announced, not formal; web page 13 May 2025 and PDF 12 May 2025 as separate sources.                                                                                                                                                                                          |
| 51   | BIS model weights                 | The quotation keeps "open-weight"; the qualification gives Note 1 (published parameters, and additional training of at most 2x10^25 operations or 25 percent of the training operations) and Note 2 (models below the most advanced published model by aggregate benchmarks). |
| 56   | Michigan introduced               | Supported by the archive captures.                                                                                                                                                                                                                                            |
| 58   | NY Chapter 96, frontier model     | The 2025 distillation limb keeps its condition that the compute cost exceeds five million dollars, in this record and in the 2025 definition record. Signed 27 March 2026; replacement provisions apply from 1 January 2027.                                                  |
| 59   | NY Chapter 96, large developer    | The same dates.                                                                                                                                                                                                                                                               |
| 60   | AI Action Plan, CAISI evaluations | Locator: Pillar III, not Pillar II.                                                                                                                                                                                                                                           |
| 61   | Michigan status                   | Recorded only as of the capture of 23 March 2026 (above).                                                                                                                                                                                                                     |
| 64   | UK AI Security Institute          | Dated by the announcement; "from today" is not read as the name's effective date.                                                                                                                                                                                             |
| 70   | EO 14409 voluntary access         | The qualification gives the elided protection and nondisclosure requirements.                                                                                                                                                                                                 |
| 80   | NY 2025 civil penalty             | The amount depends on the severity of the violation (§ 1422(1)); "first violation" is quoted as the statute's term.                                                                                                                                                           |
| 81   | NY 2025 large developer           | The qualification gives the academic-research exclusion for accredited colleges and universities and the full intellectual-property transfer rule.                                                                                                                            |
| —    | All part 2 records                | "Initial" and "opening" in our prose; the source's "first" stays in quotations and quoted labels.                                                                                                                                                                             |

The other part 2 items agreed or found full support. None of them needed judgement beyond an adopted correction, so no record was held on that ground.

## Admission's own changes

- **Quotations required by the schema.** Three records gained a short quotation where the pack gave only a paraphrase: the G7 welcome of the code, the UK–Anthropic memorandum on research with the Institute and the UK–OpenAI memorandum's statement that it is not binding.
- **Short texts.** GOV.UK's publication page for the Bletchley Declaration is about 60 words long. Its change-history entry on New Zealand is given by paraphrase, so that only its publication date is quoted.
- **Splits.** CAISI's reported work with OpenAI and Anthropic is two records, one per company, because an evaluation engagement names one developer. The New Delhi counts are two records, as above.
- **Dates and notes.** The pack's snapshot dates on provisions and links became events of their text. Bases the schema lacks (adoption, passage, veto, introduction, listing) were dropped and the note says what the date is. Where the pack gave no note, a plain one was added.
- **Families.** Each summit text, memorandum and speech is its own document family, so that unrelated texts are not presented as versions of one another. NIST AI 800-1's two drafts and New York's two RAISE Act texts are versions of one family.

## Held

None. Four pack records were folded rather than admitted as records of their own:

- the UK's absence from the Paris lists;
- the US's absence from the Paris lists;
- Michigan HB 4668's status;
- CAISI's re-establishment, now a dated name.

Two pack records became four by splitting.

## Release

Dataset release **v0.11.0**, a minor release: the schema rises from 2.18 to 2.19 (docs/dataset-format.md, Versions). Release format 1.7. `pnpm release 0.11.0` against v0.10.3: 392 added and 1 changed. Part 2 was first released on part 1 as v0.10.2; after main released the paraphrase corrections as v0.10.2 and part 1 was re-released as v0.10.3, part 1 was merged into this branch (no admitted record of part 2 changed), the before-snapshot was regenerated by the admission script from the new base (`baseCommit` e234f85), and part 2 was re-released as v0.11.0 on that base.

## Tests changed

- `transactions.test.ts`, `versions.test.ts` and `research-path.test.ts` exclude part 2's added claims from their earlier counts. `dossier.test.ts` excludes them from the Anthropic governance groups, and `query.test.ts` excludes `fl-` records from the Anthropic focus count.
- `framework-provisions.test.ts` expects schema 2.19; `mapGrammar.test.ts` expects nine entity silhouettes.

## Checks

- `pnpm tsx scripts/frameworks-to-law-admission.ts --part 2 --check`: the stored records match the pack and the map.
- `pnpm -s validate:data`: valid.
- `pnpm -s check`, run step by step: format, lint, typecheck, unit tests (619 passed, 1 skipped) and build, with 4,021 pages pre-rendered.
- `pnpm -s check:privacy`: passed.
- `pnpm release 0.11.0 --check`: reproduces byte for byte.
- `pnpm docs:coverage` and `pnpm question:gaps` regenerated the README coverage block and `review/essay-starter-gaps.md`.
- Browser tests: full suite against the production preview, 205 passed and 1 failed; the failure was a mobile cartography selector that counted the new admission records, now excluded like the other admissions, and that spec then passed (5 of 5).

After merging part 1 as re-released at v0.10.3 and re-releasing part 2 as v0.11.0 against it:

- `pnpm tsx scripts/frameworks-to-law-admission.ts --part 2 --check`: the stored records match the pack and the map.
- `pnpm -s validate:data`: valid (1,071 entities, 3,044 claims, 913 sources, 3,955 evidence records).
- `pnpm -s check`, run step by step: format, lint, typecheck, unit tests (624 passed) and build, with 4,021 pages pre-rendered.
- `pnpm -s check:privacy`: passed.
- `pnpm release 0.11.0 --check`: reproduces byte for byte.
- Browser tests, through an untracked copy of the Playwright configuration with the installed Chromium instead of Edge (deleted afterwards): 206 of 206 passed.

## Open for the maintainer

1. **Declarations as citations.** The G7 and Seoul texts' references to the Hiroshima code and to the Seoul commitments are `cites`, so they do not appear among the frameworks on the commitments page. If the page should show governmental texts that name a commitment, that is a change to the collection, not to the records.
2. **Archive captures.** The capture readings, the Commission's draft date and the BIS PDF's date rest on the cross-family check, because this admission could not reach the Internet Archive or the Commission's library.
3. **Michigan.** The bill's status after 23 March 2026 is not recorded, by decision. The live page showed no later action at admission.
4. **Illinois.** The Act's bill record, dates and text wait for a route to ilga.gov.
5. **Developers' compliance documents** (decision 11) remain for a separate pass.
