# Reborn Genesis I: research corpus and academic starter

Selekoa remains **the biography of machine intelligence**. This increment adds a bounded research collection alongside the explanatory atlas. It does not change the atlas dataset, ontology, UI or review decisions.

## Decision: one separate collection, no graph migration

The smallest useful addition is a research proposition with linked evidence assessments and source expressions, plus an explicit upstream mapping. A proposition records what was investigated, including an erroneous assertion needed to understand a correction. It is not an accepted statement of fact. The corpus can preserve a rejected identification, a partial conceptual match, or an unresolved transmission question without inventing graph endpoints or predicates.

| Existing Selekoa contract                                            | Upstream reality                                                                                      | Prototype decision                                                                                                                               |
| -------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Claim resolution is supported, contested or unresolved               | Upstream also has CONTRADICTS and PARTIALLY_SUPPORTS, at both claim and evidence levels               | Retain attributed upstream statuses verbatim, separately at each level; do not map to graph resolution                                           |
| Evidence support and primary/secondary source role are separate      | Upstream roles include excerpt, archive capture, wrong object, later typeset edition and mutable wiki | Preserve role strings and explicit Selekoa evidence-relationship annotations with their rationale; no automatic primary/secondary classification |
| Sources identify an inspected expression and access date             | Some catalog URLs disagree with evidence URLs; original check dates are absent                        | Retain both URLs and all date strings, expose version limits, leave check/event dates null                                                       |
| A graph claim needs endpoints, temporal semantics and admission      | Some records are questions, failed identifications or search limitations                              | Keep the collection outside `data/` and out of the browser bundle                                                                                |
| Accepted claims and human evidence checks require explicit decisions | Baseline human fields are blank                                                                       | Import no human review; reject a changed input with nonempty human fields                                                                        |
| Graph research packets export admitted claims and omit passages      | The corpus must show the investigated assertion and what was actually reported checked                | Reuse canonical JSON and SHA-256 helpers; use a separate corpus renderer preserving qualified upstream passages                                  |

No schema version change to the application is needed. `src/research` contains pure TypeScript validation, selection and rendering; it has no React or Sigma dependency. The command adapter reads pinned Git objects and writes only this collection's artifacts. There is no database, crawler, status-voting algorithm, admission importer or review-decision importer.

```text
pinned upstream Git report cells
  → allowlisted frozen subset + byte hashes + CSV record addresses
  → explicit selection and evidence-role annotations
  → validated research collection
  → Markdown starter, source/evidence inventory, upstream crosswalk

separate future authorization + source checks
  → possible atlas candidates (not implemented here)
```

## What was accessible upstream

Inspected on 2026-09-28: the private `futurelightcone/source-integrity` repository at `54c62fc426d7b6ae008fd6acd3f53a0b993248ac`, also the remote main commit on that date. Its baseline report is dated 2026-08-21: 109 frozen packet mappings, 80 atomic claims, 108 evidence rows and 37 source-expression records. The tracked inventory includes packet hashes, stored claim transcription, source occurrences, quote targets and controlled vocabularies. The reports separate canonical claims, source expressions, claim/evidence assessments and atomization mappings. The provider, comparison and claim-support code keep retrieval and claim assessment distinct.

The tracked artifact builder combines manually curated claim/evidence literals with source metadata and crosswalks from a local SQLite store. It does not reproduce all reports from the tracked files alone. Its status fallback chooses a prioritized observed evidence status only where an explicit claim status is absent. Selekoa does not copy that aggregation rule. Replaying the original retrieval/derivation pipeline would require inputs absent from Git; this prototype reproduces selected committed report cells instead.

The accessible Codex project named Research Plan is the enclosing research workspace, with the source-integrity checkout nested inside it. It also contains protocol and dossier work, revision/schema reports, research-plan drafts and newer uncommitted source-integrity changes. These are overlapping stages of one local research workflow: source-integrity is a separately versioned upstream integrity/provenance project, not all of Research Plan and not subordinate to Selekoa. The surrounding drafts were inventoried, not imported or reproduced.

The later `reports/provenance-research-table.html` **was found locally**. Its embedded CSV matches the local CSV byte-for-byte and contains **127 data rows: 108 EVIDENCE and 19 RECORD_STUB**. The HTML SHA-256 is `5751c20aed6b10c89b622fa58ce99d03e1607ad86b567c683ad3e8eccb1f02aa`; embedded/local CSV SHA-256 is `752c0105ce8a8ebb278a0304477fd11cc279dbfda76ca54190e9988d153793a5`. These identify the inspected local artifacts, not a released upstream version or an endorsement of their findings.

The local canonical claims, claim evidence, research tables and artifact builder differ from Git. The viewer builder, schema-integrity checker and schema-revision tests are untracked. The HTML is ignored. The later table adds record typing, analytical scope and 19 research stubs; it is not the committed baseline. The baseline contains neither these additions nor the later viewer/schema tooling. No local changes were committed upstream or substituted for the pinned input.

The frozen packet documents themselves, dissertation drafts, SQLite working store, complete retrieval bodies and operational logs are not part of the tracked baseline's reproducible inputs. None is imported here. Public source authors in bibliographic records are not maintainer identity metadata. The upstream has no tracked licence at the pinned commit; private prototype reuse is scoped to this request. No public redistribution rights are asserted.

## Prototype and exact provenance

Open the [academic research starter](../research/collections/conceptual-provenance-i/starter.md), [inventory](../research/collections/conceptual-provenance-i/inventory.md), [crosswalk](../research/collections/conceptual-provenance-i/crosswalk.md) or [structured collection](../research/collections/conceptual-provenance-i/collection.json).

The selection contains 11 investigated propositions: PCR-001, PCR-002, PCR-004, PCR-010, PCR-015, PCR-017, PCR-027, PCR-028, PCR-035, PCR-036 and PCR-045. It preserves all 18 linked evidence rows and 12 linked source expressions. Claim-level findings include three SUPPORTS, one PARTIALLY_SUPPORTS, four CONTRADICTS and three UNRESOLVED. Selection is purposive and methodological, not historically representative.

`upstream.json` is an allowlisted projection of four committed CSVs, not a raw audit log. It retains source and claim IDs, expression/work IDs, CSV data-record ordinals and SHA-256 fingerprints of projected rows. The manifest records exact upstream file SHA-256 hashes and Git blob IDs. Crosswalk cells preserve original packet claim and occurrence IDs and all three mapping lists. Private original citation prose is omitted. Source-grouped mappings are associations, not a claim that every packet proposition equals every linked atomic proposition.

The original atomic propositions and machine assessments are unchanged. `selection.json` adds Selekoa's selection rationale, qualifications, open questions and explicit per-evidence support/partial/contradictory/context annotations. Those annotations are dated machine interpretations of the upstream reports, not rechecks of all original sources. They never determine claim resolution or editorial acceptance. Reordering input does not change output; duplicate identities/content and broken links fail validation. Repeated source use is preserved across different propositions and is not counted as independent corroboration.

Generated artifacts contain no current-time timestamp or absolute paths. Source publication/expression/capture date strings remain distinct and exactly as reported; blank dates become null. The baseline report date and import date are not fabricated original evidence-check dates. The collection fingerprint identifies metadata and reported passages, not the original source bytes.

## Reproduction

From a Selekoa checkout with locked dependencies installed:

```sh
pnpm research:corpus
pnpm research:corpus --check
```

The first command regenerates the four projections. Do not put review decisions in generated outputs. Edit the selection only for an explicitly scoped research revision; never edit the frozen subset to repair an upstream error silently.

Optional verification against an accessible local clone of source-integrity:

```sh
pnpm research:corpus --check --upstream <source-integrity-checkout>
```

The path is only a command argument and is never stored. Git reads the pinned commit, even if that checkout has newer or uncommitted changes. No network or upstream writes occur. To reproduce the initial subset capture in a disposable clean copy where `upstream.json` is absent, use `--capture --upstream <source-integrity-checkout>`; capture refuses to overwrite an existing input. Normal generation is fully offline and requires no Research Plan workspace, upstream clone, Python or SQLite database.

## Source-check coverage and academic usability

The starter exposes the original investigated assertion, every selected linked evidence item, exact locator and URL, catalog expression URL, conflicting assessments, source-version limits and follow-up questions. It is usable for source discovery and planning. It is not ready to supply uninspected historical conclusions to academic work.

A limited **same-agent** machine spot-check on 2026-09-28 inspected three original source paths independently of the import code. It was neither a blind audit nor independent execution, and it does not satisfy the editorial policy's human sample:

- PCR-001: the [CEV PDF](https://intelligence.org/files/CEV.pdf), page 1, reports the author, title and 2004 bibliographic year. Current MIRI branding also shows why this does not authenticate original 2004 bytes. No priority conclusion follows.
- PCR-010: the [version-labelled arXiv PDF](https://arxiv.org/pdf/1906.01820v1), abstract/page 1, contains the authorial neologism claim. The retrieved extraction also shows a March 2022 title-page date alongside a v1/June 2019 stamp. This is an unresolved expression/date anomaly; do not silently normalize it or claim the original v1 bytes were authenticated. Upstream's catalog-v4/evidence-v1 mismatch is separately preserved.
- PCR-035: the [report PDF](https://metr.org/AR_report.pdf), page 1 and section 1.1, names the ARA capability cluster and identifies the Alignment Research Center, Evaluations Team. This supports the bounded textual description, not a general capability or transmission finding.

The source checks are paraphrased here; no raw tool logs or document copies are committed. Original-source checking was not repeated for the other eight propositions or all 18 evidence rows. The baseline's machine/model identity and row-level check dates are not supplied. No human review, curation or reliance decision is claimed.

Risks needing targeted triage: earliest-use questions (PCR-002/004), failed retrieval versus historical nonexistence (PCR-015), attribution and wrong-object conflicts (PCR-017/028), partial passage composition (PCR-027), version/rebranding (PCR-010/036) and claimed transmission (PCR-045). Independent human sampling remains outstanding: at least three claims, including a random selection and a different source or relation family. Curated interpretation and academic reliance must follow the existing policy; this is a private preliminary artifact, not a mandatory queue of all seeds.

## Tradeoffs and next increment

Keeping upstream evidence and corpus propositions outside the atlas avoids forced ontology changes and accidental promotion. The cost is a small parallel representation and generated-file redundancy. Reused canonical serialization/fingerprinting ensures consistent export identity, but the existing atlas packet cannot represent false investigated propositions or upstream expression conflicts without distortion. A corpus browser, collection registry, reusable bibliography export, independent audit events and explicit scoped human-review records remain future infrastructure; the current prototype hard-codes the absence of review instead of pretending to implement that workflow.

Next, resolve the two expression-identity problems in PCR-010 and PCR-028 and run one bounded priority/transmission search for PCR-002 or PCR-045. Record searched corpora, time bounds, candidate exclusions and carrier evidence. Obtain the independent human sample. If the 19 later stubs are worth pursuing, first freeze/version them upstream with reuse terms and stable mappings; assess their scope before any separately authorized import. Expansion should follow one research question, not all 127 local rows.

Map, Claims, Timeline, Dossier, guided readings, deep links, exports, keyboard list alternatives, graph data, review packs and all existing decisions remain unchanged.
