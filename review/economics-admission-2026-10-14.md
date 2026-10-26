# Admission of the economics candidate packs, 2026-10-14

The maintainer authorised on 2026-10-14 admitting the two candidate packs of the [Economics of Machine Intelligence](../docs/projects/economics-of-machine-intelligence.md) project as proposition records, following the precedent of the Yudkowsky admission ([`yudkowsky-admission-2026-10-08.md`](yudkowsky-admission-2026-10-08.md)):

- [`research/economics-growth/`](../research/economics-growth/README.md): the explosive-growth debate, G01–G09 (merged in #26 and #27);
- [`research/economics-mainstream/`](../research/economics-mainstream/README.md): mainstream economics, automation and AI, M01–M09 with M06 split into M06a and M06b, including the Finnish strand (merged in #30).

Excluded: the esoteric sub-pack [`research/economics-mainstream/esoteric/`](../research/economics-mainstream/esoteric/README.md) (E01–E05), which has had no cross-family check. Its blind brief for that check was written the same day ([`gpt-check-input-2026-10-14.md`](../research/economics-mainstream/esoteric/gpt-check-input-2026-10-14.md)).

The packs are unchanged. `scripts/economics-admission.ts` rebuilds the records from them and the authored map [`economics-admission-map-2026-10-14.json`](economics-admission-map-2026-10-14.json); `--check` confirms that the stored records match. The rows added are listed in [`economics-admission-before-2026-10-14.json`](economics-admission-before-2026-10-14.json), from which the test-only historical view reproduces the earlier dataset. All records are seeds with machine-checked evidence. No person has reviewed them. Nothing is published, and no dataset release was cut.

## What was admitted

| Item                                        | Count                                                      |
| ------------------------------------------- | ---------------------------------------------------------- |
| Proposition concepts                        | 19 (G01–G09; M01–M05, M06a, M06b, M07–M09)                 |
| Passages (evidence items)                   | 282 (growth 67, mainstream 215)                            |
| Records (one per text, proposition, stance) | 231 (growth 51, mainstream 180)                            |
| By stance                                   | articulates 96, contests 21, bears on 114                  |
| By tier                                     | tier 1: 185 records; tier 2: 46                            |
| Documents                                   | 59 (58 new; one existing: Hanson, “If Uploads Come First”) |
| Sources                                     | 62 new                                                     |
| Context-only passages                       | 112                                                        |
| Records with conditions / estimates         | 109 / 7                                                    |
| Model scenarios                             | 5 (M05-18, M05-20, M05-22, M05-24, M05-29)                 |

Three documents appear in both packs and are one document with two sources each: Nordhaus (2015; Cowles capture and NBER current copy), Aghion, Jones and Jones (2017; NBER capture and current copy) and Acemoglu (2024; MIT-hosted capture and NBER current copy). Their quotations are counted together against the per-document limit; Nordhaus's total is 399 distinct quoted words, because one growth quotation (G07-d) is contained in a mainstream one (M06a-09).

## Schema 2.13

The minimal additions the packs needed, documented in [ontology](../docs/ontology.md#source-tiers-model-conditions-and-estimates-schema-213) and [dataset format](../docs/dataset-format.md):

- `attributes.thought.tier`: `value` 1 or 2 and a one-line `basis`, from each source's tier and basis in the pack.
- The role `earliest-located-tier-2`. Validation applies the earliest-located rules within each tier: tier-1 and untiered records share `earliest-located`; tier-2 records have their own role. A tier-2 text cannot be `earliest-located`.
- `attributes.thought.conditions`: the pack's model conditions (decision 3 of 2026-10-09: “a structured assumptions field will be added at admission”).
- `attributes.thought.estimates`: the G09 estimate records (decision 9), one per holder, as worded.
- Proposition codes may end in a lower-case letter (M06a, M06b).

The release format stays 1.4: these are provisional values nested in `attributes`. Release format 1.4 has not yet been cut.

## Mapping

| Pack                                                         | Selekoa                                                                                                                                                                                                                            |
| ------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Proposition G01–G09, M01–M09                                 | Concept with the pack's criterion verbatim, a short name, and the pack's statement as an alias (mainstream)                                                                                                                        |
| `articulates`, `contests`, `bears-on`                        | `articulates_proposition`, `contests_proposition` with `engagement`, `bears_on_proposition` with the pack's `missing` element                                                                                                      |
| Passage                                                      | Evidence `evidence-ec-<passage id>`: quotation, locator, check date. Several passages of one text, proposition and stance are one record `ec-<code>-<document>-<a/c/b>`                                                            |
| `context`                                                    | Claim statement, after a sentence naming the text, its date and its stance; dialogue speakers are named                                                                                                                            |
| `qualification`, voice, `formerly`                           | Claim qualification; multi-passage records prefix each with its passage ID                                                                                                                                                         |
| Source `date`, `attested`, `claimed`                         | Record date; `thought.attested`; `thought.claimed`. Hanson's undated working paper is dated 2000-08-19 by its capture, with 1998 claimed (decision 11)                                                                             |
| Source tier and basis                                        | `thought.tier`                                                                                                                                                                                                                     |
| `earliest-located`, `earliest-located-tier-2`                | Same roles on the record (never on bears-on records; none in the packs)                                                                                                                                                            |
| Engagement and rationale                                     | `thought.engagement`. A record engages a premise when any of its passages does (message-level rule). A rationale must be one sentence: the first sentence is kept and the rest of the pack's rationale goes into the qualification |
| `conditions`                                                 | `thought.conditions`                                                                                                                                                                                                               |
| G09 `estimate`                                               | `thought.estimates`                                                                                                                                                                                                                |
| `flags: model scenario`                                      | Qualifier “A model scenario under stated conditions, not the author’s own claim”, the pack's scenario note in the qualification, and the passage's context-only flag                                                               |
| `voice`: reported, relay, rejected view                      | Register `relay` when every passage of the record is in such a voice (16 records); a note in the qualification for each such passage                                                                                               |
| `contextOnly`                                                | `evidence.contextOnly` with the pack's reason and required context; M05-41's link to M05-42 becomes a claim link                                                                                                                   |
| Source versions, published version, references not retrieved | The source's `version` text, with the APA references                                                                                                                                                                               |
| Abstract-only sources                                        | `documentWords` estimated from the printed page range (400 words a page; 300 for ETLA Brief 22), with the basis stated; the pack's 40-word caps already hold                                                                       |

The collection's “Headlines replaced” list keeps the candidate-stage changes of earliest-located headlines (eleven), each pointing at records that exist: the audit and cross-family corrections of 2026-10-10 and 2026-10-12, the re-tiering of 2026-10-11 and the standing rule of 2026-10-12.

## Quotations

- **M07-07** (Acemoglu, 2024) was 50 words without its ellipsis and 51 as the dataset counts words, so its first fragment and the ellipsis were dropped. The wording is unchanged.
- Every other quotation is the pack's, verbatim. Per-document limits hold, counted across all sources of a document.
- **Re-check at admission** ([`economics-admission-quote-check-2026-10-14.json`](economics-admission-quote-check-2026-10-14.json)). The sources were retrieved again on 2026-10-14 by direct HTTP and each pack's `verify` was run. Mainstream: all 215 quotations match; 30 of 41 files are byte-identical to the recorded ones, and the 11 that differ (nine AEA abstract pages, the Scientific American page, the ETLA page) still contain the quotations. Growth: the Wayback Machine reset every connection, so the recorded current copies were used; 56 of 67 quotations match. The 11 passages from Davidson's report and Roodman's post (with Karnofsky's comment) exist only in Wayback captures and were not re-checked; they matched on the pack's re-check of 2026-10-11 and keep that check date.

## The Finnish strand

The pack records one Finnish text as passages: ETLA Brief 22 (Pajarinen and Rouvinen, 2014), admitted under M07. The 247 Kansantaloudellinen aikakauskirja texts in [`kak.md`](../research/economics-mainstream/kak.md) were classified by subject (subject-AI, subject-automation, subject-computers, passing, method-ML), not against M01–M09, so they have no relation to admit. The collection's “How we searched” note describes the crawl and points to the list. Turning them into records would need a classification against the propositions and its own checks.

## Not carried over

- The packs' per-proposition search notes, leads (21 in the mainstream pack), library list, census tables and timelines stay in the packs. The page's search note summarises the searches and names the open items.
- Pack passage IDs remain in qualifications and evidence notes; the page says so.

## Mapping self-audit

`scripts/economics-admission-audit.ts` drew 25 admitted records at random (seed 20261014) and compared each field with the packs: proposition, predicate, quotation, locator, context, qualification, date, attested date, tier, earliest-located roles, context-only flag and required context, conditions, missing element, engagement and estimate. The report is [`economics-admission-audit-2026-10-14.json`](economics-admission-audit-2026-10-14.json): 314 fields, no drift, one mapped difference (M07-07). A unit test (`src/domain/economics.test.ts`) checks quotation, locator, context-only flag, tier, conditions, estimates and every earliest-located role for all 282 passages, and that nothing from the esoteric sub-pack was admitted. The audit was run by the admitting session, not a fresh context.

## Decisions made at admission

1. **Tier field.** The schema had none, so schema 2.13 adds `thought.tier` on each record (a record is one text), and the role `earliest-located-tier-2`, rather than a source-level field: the rule is the collection's, not a property of the source.
2. **Conditions and estimates** as nested attributes, not new claim fields.
3. **Model scenarios** use the existing `qualifier` field; the page labels them “Model scenario”.
4. **Relay register** for records whose passages all report, relay or characterise others' views.
5. **Shared documents** across the packs are one document with two sources.
6. **Page-range length estimates** for abstract-only sources, stated as estimates.
7. **The KAK list** is not admitted as records (above).
8. **No CSS changed.** The page uses the existing proposition components; conditions and estimates reuse the row style of the missing element.

## Open for the maintainer

1. **Simon (1965)** is unread; he may state M05 in his own voice, which would move the M05 headline from a model scenario (lead L01).
2. **Acemoglu's journal version** (Economic Policy, 2025): whether it changes the M08 figures is unknown (publisher 403).
3. **The 1931 JPE review “Robots or Men?”**: unread (403).
4. **G06 wording** (open decision 3 of the project): under “no sign yet” no tier-1 text articulates G06.
5. **M09's tier-1 headline** rests on a 2019 self-description; the dated record from 1952 runs against a plain “only recently” reading.
6. **Hanson's 1994 essay**: the dataset already holds a scan of the printed issue (Extropy 13). Comparing the quoted wording with it could date the wording to 1994 rather than the 1998 capture; it would not change the G07 roles.
7. **Davidson, Roodman and Karnofsky passages**: not re-checked on 2026-10-14 (Wayback unreachable); G05-c's place under G05 has still not been re-read.
8. **KAK texts as records**: whether to classify the 247 listed texts against M01–M09 (or M09 only) in a later task.
9. **Esoteric strand**: run the GPT check from the brief of 2026-10-14; its findings decide any later admission.
10. **Publisher terms** before any publication, as the project document records.
