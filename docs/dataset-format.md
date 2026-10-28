# Dataset release format

A Selekoa dataset release is a fixed, versioned copy of the application records in a
public record format: `selekoa-dataset`, format version 1.2. `pnpm release <version>`
writes it to `release/v<version>/`. The site build publishes the latest release under
`data/` and every release as a ZIP archive (see [Reproducibility](#reproducibility)).

The format is the contract for anyone who reads a release. The internal schema
(`src/domain/schema.ts`, [ontology](ontology.md)) can change between releases; the
generator maps it onto this format, and a record field that the format does not list
stops the release until it is documented here and in `src/release/format.ts`.

## Files

| File                                  | Contents                                                                                     |
| ------------------------------------- | -------------------------------------------------------------------------------------------- |
| `entities.json`, `entities.csv`       | Stable referents: people, organisations, documents, concepts, models, public bodies and more |
| `claims.json`, `claims.csv`           | One scoped statement each, with time, epistemic state and evidence IDs                       |
| `evidence.json`, `evidence.csv`       | One source passage used for one claim                                                        |
| `sources.json`, `sources.csv`         | The inspected bibliographic expression of each source                                        |
| `collections.json`, `collections.csv` | Authored reading collections and the claims each one uses                                    |
| `sources.csl.json`                    | Every source as a CSL-JSON item, to cite the original documents (from format 1.2)            |
| `manifest.json`                       | Version, release date, dataset metadata, counts, field classes and file checksums            |
| `changes.json`, `CHANGELOG.md`        | Records added, changed and removed since the previous release, by ID                         |
| `README.md`, `CITATION.cff`           | What the release is, how to cite a record and the release                                    |

`release/CHANGELOG.md` indexes all releases, newest first. `release/removals.json` holds
the reasons for removing released records (see [Removal](#removal)).

JSON files are UTF-8 arrays of records sorted by `id`, indented by two spaces, with keys
in the order documented below and nested object keys sorted. The JSON is authoritative.
CSV files are a flat view of the same records: UTF-8 without a byte-order mark, LF line
endings, a header row, RFC 4180 quoting, list values joined by `" | "` and nested values
as canonical JSON. Numbers and `null` lose their type in CSV; an empty cell means the
field is not recorded.

## Versions

Release versions are `MAJOR.MINOR.PATCH`, written `v0.1.0` in directory names and
citations.

- **Major:** 1.0.0 is released only under the [version policy](roadmap.md#version-policy-recorded-2026-10-05):
  when Selekoa has real outside users. Before 1.0.0, a change that removes, renames or
  changes the meaning of a stable field, or changes the file layout, raises the minor
  version and is listed in the changelog.
- **Minor:** a new collection, or a schema change (the schema version rises, a field or
  an enumeration value is added, or a provisional field changes).
- **Patch:** corrections to existing records, and small additions within existing
  collections.

This rule was revised on 2026-10-26 ([decision record](../review/archive-admissions-2026-10-26.md));
earlier releases were numbered under the previous rule, in which any added record raised
the minor version.

Format 1.1 (dataset schema 2.11) adds the entity field `proposition` with its three CSV
columns, the claim attribute `thought` and the source kinds `book`, `message` and `post`.
Format 1.2 adds the file `sources.csl.json` (see [Citations](#citations)); its records are
unchanged from format 1.1. Format 1.3 (dataset schema 2.12) adds the evidence field
`contextOnly` and its CSV column `context_only_json`; inside `attributes.thought` it adds
`engagement` and `retrospective`. Format 1.4 changes no record field; it states the
licence (see below). Dataset schema 2.13 adds, inside `attributes.thought`, the
`tier` of a text, its model `conditions` and its stated `estimates`, and the role
`earliest-located-tier-2`; proposition codes may end in a lower-case letter. These
are provisional nested values, so format 1.4 carries them unchanged. Format 1.5 (dataset
schema 2.14) adds the source field `authorNames` and its CSV column `author_names_json`.
Format 1.6 (dataset schema 2.15) adds the evidence field `retrievalRoute` and its CSV
column `retrieval_route`, the predicates `founding_stated`, `licensing_hiring_agreement`
and `unit_disbanded`, and, inside `attributes`, `statedReason`; `attributes.activityStage`
can now be `announced` on personnel and organisational records. Dataset schema 2.16
adds, inside `proposition`, `withheld`: an earliest located role left unassigned by a
recorded decision, with its reason and date. It is a provisional nested value, so
format 1.6 carries it unchanged in the JSON files; the entity CSV columns do not
include it. Dataset schema 2.17 adds, inside `attributes.provision`, `facet`:
the framework comparison question a provision record answers (`id`) and, for a stated
cell, its `status` (`stated`, `partly` or `recorded`). It is a provisional nested value,
so format 1.6 carries it unchanged.
Dataset schema 2.18 adds the `attributes.provision.kind` values `risk_domain`,
`evaluation_timing`, `reporting` and `revision`, used only by framework comparison
cells, whose stated cells for those questions and for thresholds are supported by
paraphrases instead of quotations. Format 1.6 carries them unchanged.
Format 1.7 (dataset schema 2.19, 2026-10-28) adds the entity type `country`, keyed by
its ISO 3166-1 alpha-2 code in the new field `countryCode` (the entity ID is `country-`
and the code in lower case), and the field `datedNames`: the names an organisation or
public body bore, each with its dates, a note and the sources that give it, so that a
renaming keeps one entity. Their CSV columns are `country_code` and
`dated_names_json`. Schema 2.19 also adds the predicates `lists_participants`,
`introduced`, `passed`, `vetoed` and `revoked`; inside `attributes`, `listing` (the
`count` of a participant list and its `countBasis`, `stated` by the source or
`counted` by Selekoa); and inside `attributes.provision`, `computed`: a date that a
text's rule fixes without stating it, recorded as an inferred provision dated by the
computed date. `attributes.activityStage` can be `announced` on a `revoked` record, for
an announced revocation not yet formalised. `signed_commitment` may have a public body
or a country as its subject.
Releases written in earlier formats stay as they are. The generator still writes formats
1.1 to 1.5, so the tests can reproduce those releases byte for byte.

A release is never overwritten. `pnpm release` refuses an existing or earlier version,
and `pnpm release <version> --check` regenerates an existing release and compares it
byte for byte while the data is unchanged. A release states the dataset schema version
(`dataset.schemaVersion` in the manifest) separately from the release format version.

## IDs, supersession and removal

Record IDs are lowercase ASCII words joined by hyphens. Each record type is its own
namespace: entity `openai` and a collection about OpenAI are different records.
Collection IDs are written `<kind>/<id>`, such as `control/openai`, matching the page
address in the application.

An ID is stable once a record is merged to the main dataset, and it is never reused for
a different record. A correction that keeps a claim's proposition keeps its ID; the
change appears under “changed” in the next changelog. When the proposition itself
changes, a new claim is created whose `supersedes` field names the claim it replaces,
and the earlier claim stays in the dataset. Claim supersession is about records. It is
different from a document replacing an earlier edition, which is a claim with the
predicate `supersedes_document` between two document entities.

### Removal

Records are superseded rather than removed wherever possible. When a released record
must be removed, for example a duplicate entity, its ID and reason go into
`release/removals.json` (`{ "<record type>": { "<id>": "<reason>" } }`). The release
generator refuses to omit a released ID that has no recorded reason, and the next
changelog lists the removed ID with its reason. A test checks every pair of consecutive
releases and the current data against the latest release.

## Stability and text classes

Each field is **stable** or **provisional**. A stable field keeps its name, type and
meaning within a major version; enumerations can gain values in a minor release, so
readers should accept unknown values. A provisional field can be restructured in a minor
release, with the change listed in the changelog.

Each field also has a text class, listed in `manifest.json` under `fields`:

| Class           | Meaning                                                                                              |
| --------------- | ---------------------------------------------------------------------------------------------------- |
| `structured`    | Identifiers, enumerations, dates, numbers and URLs                                                   |
| `bibliographic` | Names, titles, authors and publishers as they identify a person, organisation or work                |
| `selekoa`       | Text written for Selekoa. Words inside quotation marks within it are quoted from the record's source |
| `third_party`   | Verbatim text quoted from a source. In formats 1.0 and 1.1 this is only the evidence `quote` field   |

Verbatim source passages are kept in `quote` and nowhere else as whole passages, so a
licence for Selekoa's own data and text (CC BY 4.0, see `LICENSING.md`) excludes them by
field. Short quoted phrases inside `selekoa` fields, marked by quotation marks, are
third-party text too. Releases in formats 1.1 to 1.3, written before the licence, say in
`manifest.json` under `licence` that none is granted; they are immutable and unchanged,
and `LICENSING.md` states that their Selekoa records and text are offered on the same
terms. From format 1.4 the manifest states `licence.granted: true`, the data licence
(`CC-BY-4.0`) and the code licence (`MIT`). The downloadable archive of every release
also contains `LICENSE-DATA.txt` and `LICENSING.md`, outside the checksummed files.

## Entities

| Field             | Meaning                                                                                                                                                               | Class         | Stability   |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | ----------- |
| `id`              | Stable entity ID                                                                                                                                                      | structured    | stable      |
| `type`            | `organisation`, `person`, `concept`, `document`, `infrastructure`, `model`, `public_body`, `fund` or, from schema 2.19, `country`                                     | structured    | stable      |
| `subtype`         | Finer descriptive label, such as “Framework family”                                                                                                                   | selekoa       | provisional |
| `name`            | Canonical name                                                                                                                                                        | bibliographic | stable      |
| `shortName`       | Short display name                                                                                                                                                    | bibliographic | stable      |
| `sortName`        | Person index form, “Family, Given”; a cataloguing convention, not a claim                                                                                             | bibliographic | stable      |
| `aliases`         | Other names, possibly empty                                                                                                                                           | bibliographic | stable      |
| `description`     | Neutral description of the referent                                                                                                                                   | selekoa       | stable      |
| `sourceIds`       | Sources that identify the referent                                                                                                                                    | structured    | stable      |
| `externalIds`     | Identifiers in other systems, by system name                                                                                                                          | structured    | provisional |
| `documentVersion` | For a document edition: `family`, `label`, `publisherId`, `publishedAt`, `effectiveAt`, `revisedAt` (each only if sourced) and `dateNote`                             | selekoa       | stable      |
| `proposition`     | For a proposition concept (schema 2.11): `code`, the one `criterion` texts are classified against, `terms`, its usual names, and from schema 2.16 any `withheld` role | selekoa       | provisional |
| `countryCode`     | For a country (schema 2.19): its ISO 3166-1 alpha-2 code                                                                                                              | structured    | stable      |
| `datedNames`      | For an organisation or public body that was renamed (schema 2.19): each `name` with `from` and `until` dates as its sources give them, a `note` and `sourceIds`       | selekoa       | provisional |

CSV: `id`, `type`, `subtype`, `name`, `short_name`, `sort_name`, `aliases`,
`description`, `source_ids`, `external_ids_json`, `document_family`, `document_label`,
`document_publisher_id`, `document_published_at`, `document_effective_at`,
`document_revised_at`, `document_date_note`, `proposition_code`, `proposition_criterion`,
`proposition_terms` and, from format 1.7, `country_code` and `dated_names_json`.

## Claims

| Field                | Meaning                                                                                                                                                                                                         | Class      | Stability   |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ----------- |
| `id`                 | Stable claim ID                                                                                                                                                                                                 | structured | stable      |
| `subject`            | Subject entity ID                                                                                                                                                                                               | structured | stable      |
| `predicate`          | Relation name; meanings and allowed endpoints are in `src/domain/predicates.ts`                                                                                                                                 | structured | stable      |
| `object`             | `{ kind: "entity", entityId }` or `{ kind: "literal", value, unit? }`; a literal is an amount or a Selekoa label, such as a provision name                                                                      | selekoa    | stable      |
| `topic`              | `people`, `institutions`, `ideas`, `capital`, `compute` or `governance`                                                                                                                                         | structured | stable      |
| `statement`          | The scoped proposition in plain language                                                                                                                                                                        | selekoa    | stable      |
| `time`               | `kind` `event` or `snapshot` with `date` (and an event's optional `basis`), `interval` with optional `from`/`until`, or `unknown`; always a `note`. Dates keep their precision: `2023`, `2023-09`, `2023-09-25` | selekoa    | stable      |
| `derivation`         | `explicit` (a source states it), `inferred` or, from schema 2.10, `posed` (a question Selekoa poses that sources take positions on)                                                                             | structured | stable      |
| `resolution`         | `supported`, `contested` or `unresolved`: an assessment of the recorded evidence, not a truth value                                                                                                             | structured | stable      |
| `inferenceRationale` | Premises and reasoning of an inferred claim                                                                                                                                                                     | selekoa    | stable      |
| `editorialState`     | `seed` or `accepted` by a human editor                                                                                                                                                                          | structured | stable      |
| `qualification`      | What the claim does not establish                                                                                                                                                                               | selekoa    | stable      |
| `evidenceIds`        | Evidence records for this claim                                                                                                                                                                                 | structured | stable      |
| `recordedAt`         | Date the record was made, not an event date                                                                                                                                                                     | structured | stable      |
| `supersedes`         | ID of the claim this one replaces                                                                                                                                                                               | structured | stable      |
| `attributes`         | Typed extensions added by schema minor versions: transactions, amounts, quantities, roles, evaluation activity, provisions, control, commitments and, from schema 2.11, `thought` (see below)                   | selekoa    | provisional |

From schema 2.15, `attributes.statedReason` records a reason for the recorded event as
the person or organisation concerned stated it: `by` (the entity that stated it), `text`
(a neutral paraphrase attributed to that entity) and `evidenceId` (the passage it rests
on). It is never an inferred motive; where the claim's statement mentions it, it is attributed.

An unknown or missing date is unknown, never “still current”. An interval is the
period the claim holds for; without `until` its end is unknown. It is never the
publication window of the sources: an assessment is dated by what it assesses or left
undated.

From schema 2.11, `attributes.thought` appears on the records with the predicates
`articulates_proposition`, `contests_proposition` and `bears_on_proposition`, which point
from a document to a proposition concept. It holds the record's `roles`
(`earliest-located`, `earliest-located-term`, `articulation`, `most-developed`,
`contesting` or `context`), the `register` of the passage (`nonfiction`, `fiction`,
`satirical`, `dream` or `relay`), the `term` of an earliest-located-term record, an optional
`qualifier`, the `missing` element of a context record, a `claimed` date that does not date
the wording and the `attested` date from which the quoted wording is known. Earliest
located means earliest among the texts the collection's recorded searches found, decided by
the date of the wording; it is not a claim of first use.

From schema 2.12 a contesting record can also be `earliest-located`, under the same date
rule, and any proposition record can hold `later-restatement`, a later restatement of a
point the same author made before. A contesting record may carry `engagement`: `kind` is `engages-premise` when the
passage's message or dialogue turn gives a reason against a premise of the proposition,
and `contrary-only` when it states the contrary conclusion without one; `rationale` is one
sentence. A record of any stance may carry `retrospective` when the author reports an
earlier belief of their own: `from` and `until` date the belief reported, where known, and
`note` describes it. The record itself is dated by the report, and the reported belief's
dates never decide earliest located.

From schema 2.13 a record in a tiered collection carries `tier`: `value` 1 or 2 under
the collection's rule and a one-line `basis`. Earliest located is then decided within
tier 1, and the role `earliest-located-tier-2` names the earliest located tier-2
articulating or contesting record by the same rule, shown beside the tier-1 role.
`conditions` gives the model assumptions or stated conditions under which a passage
holds, and `estimates` lists each estimate the text states as worded (`holder`,
`value`, `horizon`, `definition`, `conditional`, `conditions`); estimates are never
converted or combined.

CSV: `id`, `subject`, `predicate`, `object_kind`, `object_entity_id`, `object_value`,
`object_unit`, `topic`, `statement`, `time_kind`, `time_date`, `time_from`, `time_until`,
`time_basis`, `time_note`, `derivation`, `resolution`, `inference_rationale`,
`editorial_state`, `qualification`, `evidence_ids`, `recorded_at`, `supersedes`,
`attributes_json`.

## Evidence

| Field            | Meaning                                                                              | Class         | Stability   |
| ---------------- | ------------------------------------------------------------------------------------ | ------------- | ----------- |
| `id`             | Stable evidence ID                                                                   | structured    | stable      |
| `claimId`        | The claim this passage is used for                                                   | structured    | stable      |
| `sourceId`       | The source it comes from                                                             | structured    | stable      |
| `sourceRole`     | `primary` or `secondary`, relative to this claim; not a truth ranking                | structured    | stable      |
| `support`        | `supports`, `contradicts` or `context`                                               | structured    | stable      |
| `locator`        | Section, page, paragraph or data locator in the source                               | selekoa       | stable      |
| `passageType`    | `quote` or `paraphrase`                                                              | structured    | stable      |
| `quote`          | Verbatim passage, present only when `passageType` is `quote`                         | third_party   | stable      |
| `paraphrase`     | Selekoa's paraphrase of the passage, present only when `passageType` is `paraphrase` | selekoa       | stable      |
| `verification`   | `machine_checked` or `human_reviewed`                                                | structured    | stable      |
| `checkedAt`      | Date the passage was checked                                                         | structured    | stable      |
| `reviewer`       | Pseudonymous human reviewer, for human-reviewed evidence                             | bibliographic | stable      |
| `note`           | How the passage was checked and what it does not show                                | selekoa       | stable      |
| `contextOnly`    | From schema 2.12: the passage misleads when shown alone (see below)                  | selekoa       | provisional |
| `retrievalRoute` | From schema 2.15: `direct`, `reader_relay` or `x_syndication` (see below)            | structured    | provisional |

The internal schema stores one `passage` field; the release splits it into `quote` and
`paraphrase` so that third-party text has a field of its own.

`contextOnly` marks a passage whose quotation misleads when shown on its own, such as an
earlier view without the later text that rejects it. It holds the `reason`, the context
the passage `requires`, and optionally the `claimIds` of the records that supply that
context. A display or reuse must show the quotation only together with that context.

`retrievalRoute` says how the passage was read for its machine check: `direct` from the
publisher; `reader_relay`, through a third-party reader service (`r.jina.ai`) that renders
the publisher's current page where the publisher refused direct retrieval, which is not an
archive copy and does not authenticate earlier wording; or `x_syndication`, the text of a
post from X's own syndication endpoint, which truncates long notes. Records admitted before
schema 2.15 omit it.

CSV: `id`, `claim_id`, `source_id`, `source_role`, `support`, `locator`, `passage_type`,
`quote`, `paraphrase`, `verification`, `checked_at`, `reviewer`, `note` and, from format
1.3, `context_only_json` and, from format 1.6, `retrieval_route`.

## Sources

| Field             | Meaning                                                                                                             | Class         | Stability   |
| ----------------- | ------------------------------------------------------------------------------------------------------------------- | ------------- | ----------- |
| `id`              | Stable source ID                                                                                                    | structured    | stable      |
| `documentId`      | Document entity this source is an expression of                                                                     | structured    | stable      |
| `title`           | Title as published                                                                                                  | bibliographic | stable      |
| `authors`         | Authors as credited                                                                                                 | bibliographic | stable      |
| `authorNames`     | From schema 2.14: the credited authors split for citation, one entry per `authors` entry (see below)                | bibliographic | provisional |
| `publisher`       | Publisher as named                                                                                                  | bibliographic | stable      |
| `publisherId`     | Publisher entity ID                                                                                                 | structured    | stable      |
| `publicationDate` | Publication date, or `null` when unknown                                                                            | structured    | stable      |
| `version`         | Description of the inspected version                                                                                | selekoa       | stable      |
| `versionDate`     | Date of that version                                                                                                | structured    | stable      |
| `canonicalUrl`    | Canonical address of the work                                                                                       | structured    | stable      |
| `evidenceUrl`     | Address of the inspected expression                                                                                 | structured    | stable      |
| `language`        | BCP 47 language of the inspected expression                                                                         | structured    | stable      |
| `archivedUrl`     | An existing archive capture                                                                                         | structured    | stable      |
| `archivedAt`      | Capture date; a capture does not authenticate earlier bytes                                                         | structured    | stable      |
| `documentWords`   | Approximate length (`count`) and how it was counted (`basis`), for the quotation limit                              | selekoa       | provisional |
| `kind`            | `announcement`, `paper`, `report`, `dataset`, `article`, `filing` or, from schema 2.11, `book`, `message` or `post` | structured    | stable      |
| `accessedAt`      | Date the source was accessed                                                                                        | structured    | stable      |
| `reuse`           | Selekoa's reuse practice for the source: `attribution`, `licence` (as asserted by the source, if any) and `note`    | selekoa       | provisional |
| `upstream`        | For imported dataset rows: `dataset`, `version`, `retrievedAt`, `recordLocator` and `termsUrl`                      | selekoa       | provisional |

CSV: `id`, `document_id`, `title`, `authors`, `publisher`, `publisher_id`,
`publication_date`, `version`, `version_date`, `canonical_url`, `evidence_url`,
`language`, `archived_url`, `archived_at`, `document_words`, `document_words_basis`,
`kind`, `accessed_at`, `reuse_attribution`, `reuse_licence`, `reuse_note`,
`upstream_json` and, from format 1.5, `author_names_json`.

`authorNames` gives each name in `authors`, in the same order, as `family`, `given` and
an optional `suffix` (such as “Jr.”) for a person, or as a `literal` for an organisation,
a group or a pseudonym, which is never split. A literal pseudonym can carry the attributed
name in square brackets. It is a cataloguing aid for citation, not an evidenced claim
about anyone's name, and it is left out wherever the split is uncertain, such as unsigned,
anonymous or edited works and credits to unnamed contributors. `authors` stays the record
of the credit as printed.

## Collections

A collection is an authored, machine-proposed selection that the application reads as one
page: a guided question (`question`), a document history (`documents`), a control-structure
timeline (`control`), a set of external commitments (`commitments`) or, from format 1.1, a
collection of propositions with the texts that articulate, contest or bear on them
(`propositions`). It adds no facts;
its text frames the claims it lists.

| Field             | Meaning                                                                                                     | Class      | Stability   |
| ----------------- | ----------------------------------------------------------------------------------------------------------- | ---------- | ----------- |
| `id`              | `<kind>/<id>`                                                                                               | structured | stable      |
| `kind`            | `question`, `documents`, `control`, `commitments` or `propositions`                                         | structured | stable      |
| `version`         | The collection's own version number                                                                         | structured | stable      |
| `title`           | Page title                                                                                                  | selekoa    | stable      |
| `question`        | The research question the collection addresses                                                              | selekoa    | stable      |
| `editorialStatus` | `machine-proposed`: no human has reviewed the selection or framing                                          | structured | stable      |
| `claimIds`        | Every claim the page reads, computed from the definition with the application's own readers                 | structured | stable      |
| `definition`      | The full authored definition: introduction, limits, open questions, set-aside questions and selection rules | selekoa    | provisional |

CSV: `id`, `kind`, `version`, `title`, `question`, `editorial_status`, `claim_ids`,
`definition_json`.

Research corpora under `research/`, review packs and audit reports are not part of a
release.

## Citations

`sources.csl.json` gives each source record as a [CSL-JSON](https://github.com/citation-style-language/schema)
item, sorted by source ID, for import into Zotero, EndNote, Mendeley or any CSL processor.
An item describes the original document so that it can be cited directly; it never names
Selekoa as author or publisher and carries no claim, paraphrase, quote or reuse note. The
item `id` is the source ID. The file is a derived view of `sources.json`, computed by
`src/domain/citation.ts`, which documents the mapping in full:

- `type` follows the source `kind`: `announcement` → `webpage`, `report` → `report`,
  `message` and `post` → `post`, `book` → `book`, `dataset` → `dataset`; the mixed kinds
  `article`, `paper` and `filing` → `document`.
- `author` follows the source's `authorNames` where recorded. Otherwise it keeps each
  credited name as a `literal`, unsplit, unless the name belongs to a person record and no
  other record; then the person's `sortName` gives `family` and `given`. Organisation
  names are never split.
- `issued` is the publication date at its stored precision and is absent when the date is
  unknown. `accessed` is the access date.
- `URL` is the canonical address. `note` gives the version date, the inspected copy where
  it differs and the archive copy with its capture date.
- Editions of one document family are kept apart by title. If two editions share a title,
  the edition label is added to it. The free-text `version` field is not used.

The application offers the same items as CSL-JSON, BibTeX (with BibLaTeX field names) and
RIS, and an APA reference, for one source or for all the sources of a research starter.
Check every item against the original document before citing it.

## Manifest

`manifest.json` records `format`, `formatVersion`, `version`, `releasedAt`,
`previousVersion`, the dataset metadata (`dataset`: schema version, update date, title,
scope and research anchors), `inputFingerprint`, `counts` by record type, change totals,
the class and stability of every field, the third-party text fields, the licence status and
`files`: the size and SHA-256 checksum of every other file in the directory.

`inputFingerprint` is the SHA-256 of the canonical JSON (sorted keys, UTF-8) of the
generating input: dataset metadata, the four record arrays sorted by ID and the collection
definitions. Rebuilding that input from a release's own JSON files gives the same
fingerprint.

## Changes and changelog

`changes.json` lists, per record type, the IDs `added`, `changed` (any field of the
released JSON differs) and `removed` (with the reason) against `previousVersion`.
`CHANGELOG.md` is the same entry in prose, and `release/CHANGELOG.md` summarises each
release with a link to its full entry. The first release lists every record as added.

## Citing

Cite the original source for a fact. Cite Selekoa for a record by its ID and the release
version:

> Selekoa, claim record `<claim-id>`, dataset release v0.1.0 (2026-10-04).

`CITATION.cff` in each release describes the release as a whole.

## Reproducibility

`src/release/release.test.ts` checks that:

- every release matches its manifest checksums;
- every release rebuilds byte for byte from its own JSON records and manifest, with its
  previous release and recorded removals, and that the rebuilt input has the recorded
  fingerprint;
- the latest release rebuilds byte for byte from the current data while the data is
  unchanged (the test is skipped, and reported as skipped, once the data moves on);
- no ID present in a release disappears from a later release, or from the current data,
  without a listed removal;
- every field and CSV column is documented here.

The download offered on the About & method page is a ZIP archive of one release
directory, built from the tracked release files when the application is built. It is not
tracked and adds no content.

The built site also serves the files of the latest release one by one, unchanged, under
`data/` (`https://selekoa.org/data/manifest.json`, `…/data/claims.json` and so on), with
`LICENSE-DATA.txt` and `LICENSING.md` as in the archive, and lists them in `/llms.txt`.
These addresses always hold the latest release; read its version from
`data/manifest.json`. A fixed release is reached through its archive,
`release/selekoa-dataset-vX.Y.Z.zip`.
