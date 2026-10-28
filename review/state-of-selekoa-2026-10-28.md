# State of Selekoa, 2026-10-28

A snapshot for whoever runs the next stretch of work, written as the Max-plan
period ends. Counts are as of release v0.11.0 and are not kept up to date
here; current figures are in the [README](../README.md#research-sample) and
[release notes](../release/CHANGELOG.md). Procedure is in the
[operating guide](../docs/operating-guide.md).

## Where it stands

- **Live** at https://selekoa.org since 2026-10-26; dataset v0.11.0 (schema
  2.19): 1,071 entities, 3,044 claims, 3,955 evidence records, 913 sources, 9
  collections; about 4,000 pre-rendered pages in the sitemap.
- **Spines:** Frontier AI governance (framework comparison of 22 editions,
  frameworks-to-law records for the EU, China, the UK, the US and
  international summits); Human thought and institutions around machine
  intelligence (lineages, arguments, the Yudkowsky corpus, economics);
  The institutional history of machine intelligence (dossiers, genealogy,
  capital and compute, two Chinese-lab collections).
- **Findability:** phases 1 and 2 are done (release files, `llms.txt`, real
  paths and pre-rendered HTML). Phase 3 (on-demand rendering) waits for the
  triggers recorded in the roadmap.

## Work in flight

| Item                                      | Branch                                    | State                                       | Next                                                                                          |
| ----------------------------------------- | ----------------------------------------- | ------------------------------------------- | --------------------------------------------------------------------------------------------- |
| Archive verification (729 sources)        | `archive-verification-2026-10-28` (items) | Codex running, locally, in several sittings | Report on `codex/archive-verification-2026-10-28`; then a patch adding captures and fixes     |
| B: compute, power and orbit (201 records) | `compute-power-orbit-pack`                | Pack done; decisions recorded               | Codex check; admission in two parts (schema change: sites, measured quantities, stated dates) |
| C: AI and biosecurity (209 records)       | `ai-bio-pack`                             | Pack done; decisions recorded               | Codex check; admission in two parts (new evaluation-result predicate)                         |
| Key papers (112 papers, 1,221 records)    | `key-papers-pack`                         | Pack done; decisions recorded               | Codex check; admission in three steps (documents, persons, credits)                           |
| Public source sync                        | `selekoa/selekoa`                         | At the launch snapshot                      | Sync to the current release, on the maintainer's authorisation                                |

## Held or open

- `fl-cn-gb45438-scope`: held until the standard's own text is read.
- Michigan HB 4668: status recorded only as of the capture of 2026-03-23.
- The October 2024 national security memorandum: no revocation retrieved
  (C pack, question 10).
- NIST's centre naming ("CAISSI"): kept apart until a naming announcement is
  retrieved.
- AI Magazine 2006 date difference (2006-12-15 against 1 December 2006):
  recorded, not adjudicated.
- Christiano's "Takeoff speeds" and Butler's 1865 article: held author
  records.
- Cell notes that now repeat a condition their paraphrase gives: trimming is
  a separate change.

## Backlog, in the maintainer's order

1. Admissions of B, C and key papers, as their checks come back.
2. Kinds of AI and technical history (the key papers pack is its first part).
3. AGI term provenance, with Goertzel and Legg records.
4. Claim-page headings and claim-row links (findability phase 2 follow-ups).
5. Executives pass; single-record authors.
6. Outbound mail as `maintainer@selekoa.org`.
7. Step-back review of priorities and usability, mid-November 2026.

The Yudgment (a separate repository) is parked.

## Decisions waiting on the maintainer

- Whether Codex becomes the preparing family from November, and the
  editorial policy's family wording if so (see the operating guide, "Roles").
- Authorisation for the public source sync.
