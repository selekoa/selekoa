# Selekoa dataset v0.11.0

Released 2026-10-28. Dataset schema 2.19, records updated 2026-10-28. Release format selekoa-dataset 1.7.

Selekoa is a research base on the documentary history of machine intelligence. Each claim is one scoped statement linked to the source passages it rests on. A claim records what its sources state, with its date, qualification and review state. It is not a finding of fact, and a missing record is a gap in coverage.

## Contents

| Records | Count | Files |
| --- | ---: | --- |
| Entities: people, organisations, documents, concepts and other referents | 1,071 | `entities.json`, `entities.csv` |
| Claims: one scoped statement each | 3,044 | `claims.json`, `claims.csv` |
| Evidence: one source passage used for one claim | 3,955 | `evidence.json`, `evidence.csv` |
| Sources: the inspected bibliographic expressions | 913 | `sources.json`, `sources.csv` |
| Collections: authored reading pages and the claims they use | 9 | `collections.json`, `collections.csv` |
| Citations: every source as a CSL-JSON item, for reference managers | 913 | `sources.csl.json` |

`manifest.json` gives the counts, the schema version, every file's SHA-256 checksum and each field's text class and stability. `changes.json` and `CHANGELOG.md` list the records added, changed and removed since the previous release, by ID. The JSON files are authoritative; the CSV files are flat views of them, with lists joined by ` | ` and nested values as JSON. The format is described in `docs/dataset-format.md` in the Selekoa repository.

## How to cite

Cite the original source for a fact itself. Cite Selekoa for the record: give the record ID and this release version.

> Selekoa, claim record `<claim-id>`, dataset release v0.11.0 (2026-10-28).

Use “entity record”, “evidence record”, “source record” or “collection record” for the other record types. A record ID is never reused for a different record. A correction that keeps a claim’s proposition keeps its ID; a changed proposition gets a new claim whose `supersedes` field names the earlier one, which stays in the dataset. `CITATION.cff` describes the release as a whole.

To cite an original source, import `sources.csl.json` into a reference manager such as Zotero. Each item describes the original document, not Selekoa, and carries no claim or passage. It is computed from the source records, so check its details against the document itself.

## Before relying on a record

- Read the cited passage in the original source, in the edition the evidence names. An access date, a current file or an archive capture does not prove what an earlier version said.
- `editorialState: seed` means that no human editor has accepted the record. `verification: machine_checked` means an automated research process checked the passage. Neither is a human review.
- `resolution: supported` is an assessment of the recorded evidence, not a statement that no contrary evidence exists. Contested and unresolved records keep the evidence on each side.
- A published framework, commitment or law shows what its author said. It is not evidence of implementation, compliance or effect.
- An evidence record with `contextOnly` misleads when shown alone. Show its quotation only together with the context that `contextOnly.requires` names and the records listed in `contextOnly.claimIds`.
- `retrievalRoute` says how an evidence passage was read for its check. `reader_relay` is a third-party reader service’s rendering of the publisher’s current page, not the publisher’s own server and not an archive copy; `x_syndication` is the text of a post from X’s syndication endpoint, which can be truncated. A claim whose supporting evidence is all `secondary` rests on reporting.

## Third-party text

Verbatim passages quoted from sources are in the `quote` field of evidence records and nowhere else as whole passages. Text inside quotation marks within a Selekoa text field is quoted from the source named by the record and is third-party text. Bibliographic fields (names, titles, authors and publishers) identify people and works. `manifest.json` lists the text class of every field.

## Licence

Selekoa’s own records and text in this release are licensed under CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/). Quoted source passages, quotations inside Selekoa text and the source documents are excluded and remain subject to their owners’ rights. The legal code and the scope note are LICENSE-DATA.txt and LICENSING.md in the Selekoa repository and in the downloadable archive.

## Not included

Research corpora outside the application dataset, human review packs and audit logs, and the source documents themselves.
