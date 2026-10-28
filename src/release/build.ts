import { datasetSchema, type Dataset } from '../domain/schema';
import { canonicalJson, fingerprint } from '../domain/references';
import { cslItems, cslJson } from '../domain/citation';
import {
  csvColumns,
  csvColumnsFor,
  fieldsFor,
  csvListSeparator,
  recordFields,
  recordTypes,
  releaseFormat,
  releaseFormatVersion,
  writableFormatVersions,
  type RecordType,
  type WritableFormatVersion,
} from './format';
import {
  collectionClaimIds,
  collectionKinds,
  type CollectionDefinition,
} from './collections';

type Row = Record<string, unknown>;
export type ReleaseRecords = Record<RecordType, Row[]>;

/** Everything a release is generated from: the dataset and its collections. */
export type ReleaseInput = {
  meta: Dataset['meta'];
  entities: Dataset['entities'];
  claims: Dataset['claims'];
  sources: Dataset['sources'];
  evidence: Dataset['evidence'];
  collections: CollectionDefinition[];
};

/** Removal reasons by record type and ID; a released ID never vanishes silently. */
export type Removals = Partial<Record<RecordType, Record<string, string>>>;

export type ReleaseChanges = {
  version: string;
  previousVersion: string | null;
  added: Record<RecordType, string[]>;
  changed: Record<RecordType, string[]>;
  removed: Record<RecordType, { id: string; reason: string }[]>;
};

export type ReleaseManifest = {
  format: string;
  formatVersion: string;
  version: string;
  releasedAt: string;
  previousVersion: string | null;
  dataset: Dataset['meta'];
  inputFingerprint: string;
  counts: Record<RecordType, number>;
  changes: { added: number; changed: number; removed: number };
  fields: Record<
    RecordType,
    Record<string, { textClass: string; stability: string }>
  >;
  thirdPartyText: { fields: string[]; inlineQuotation: string };
  licence:
    | { granted: false; note: string }
    | {
        granted: true;
        data: { spdx: string; url: string };
        code: { spdx: string };
        note: string;
      };
  files: { path: string; bytes: number; sha256: string }[];
};

export type Release = {
  version: string;
  files: Record<string, string>;
  manifest: ReleaseManifest;
  changes: ReleaseChanges;
};

const semver = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/;

export function parseVersion(value: string) {
  const version = value.replace(/^v/, '');
  if (!semver.test(version))
    throw new Error('A release version is MAJOR.MINOR.PATCH, such as 0.1.0');
  return version;
}

export function compareVersions(a: string, b: string) {
  const [x, y] = [a, b].map((v) => parseVersion(v).split('.').map(Number));
  return x[0] - y[0] || x[1] - y[1] || x[2] - y[2];
}

export const releaseDirectory = (version: string) =>
  'v' + parseVersion(version);
export const downloadName = (version: string) =>
  `selekoa-dataset-${releaseDirectory(version)}`;

const byId = <T extends { id: string }>(rows: readonly T[]) =>
  [...rows].sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
const collectionId = (c: CollectionDefinition) =>
  `${c.kind}/${c.definition.id}`;

/**
 * The validated input with records sorted by ID, so file order never changes a
 * release. Validation also applies the schema's normalisation, such as trimming
 * text, exactly as the application does when it loads the data.
 */
export function normaliseInput(input: ReleaseInput): ReleaseInput {
  const data = datasetSchema.parse({
    meta: input.meta,
    entities: byId(input.entities),
    claims: byId(input.claims),
    sources: byId(input.sources),
    evidence: byId(input.evidence),
  });
  const collections = [...input.collections].sort((a, b) =>
    collectionId(a) < collectionId(b) ? -1 : 1,
  );
  const ids = new Set<string>();
  for (const c of collections) {
    if (!collectionKinds.includes(c.kind))
      throw new Error('Unknown collection kind: ' + c.kind);
    if (ids.has(collectionId(c)))
      throw new Error('Duplicate collection: ' + collectionId(c));
    ids.add(collectionId(c));
  }
  return { ...data, collections };
}

export const inputFingerprint = (input: ReleaseInput) =>
  fingerprint(normaliseInput(input));

/** Copy a record into the documented field order; unknown fields stop the release. */
function ordered(type: RecordType, record: Row): Row {
  const fields = recordFields[type];
  const known = new Set(fields.map((f) => f.name));
  for (const key of Object.keys(record))
    if (!known.has(key) && record[key] !== undefined)
      throw new Error(
        `Field ${type}.${key} is not in the release format; document it first`,
      );
  const out: Row = {};
  for (const field of fields) {
    const value = record[field.name];
    if (value === undefined) {
      if (field.required)
        throw new Error(`Missing ${type}.${field.name} on ${record.id}`);
      continue;
    }
    out[field.name] =
      value !== null && typeof value === 'object'
        ? JSON.parse(canonicalJson(value))
        : value;
  }
  return out;
}

/** The public records of a validated input. */
export function publicRecords(input: ReleaseInput): ReleaseRecords {
  const { collections, ...data } = normaliseInput(input);
  return {
    entities: data.entities.map((e) => ordered('entities', e)),
    claims: data.claims.map((c) => ordered('claims', c)),
    // Quoted source text sits in its own field so it can be excluded cleanly.
    evidence: data.evidence.map(({ passage, ...e }) =>
      ordered('evidence', {
        ...e,
        [e.passageType === 'quote' ? 'quote' : 'paraphrase']: passage,
      }),
    ),
    sources: data.sources.map((s) => ordered('sources', s)),
    collections: collections.map((c) => {
      const d = c.definition as Row;
      return ordered('collections', {
        id: collectionId(c),
        kind: c.kind,
        version: d.version,
        title: d.title,
        question: d.question,
        editorialStatus: d.editorialStatus,
        claimIds: collectionClaimIds(data, c),
        definition: d,
      });
    }),
  };
}

/** Rebuild the generating input from a release's JSON files and manifest. */
export function inputFromRelease(
  records: ReleaseRecords,
  manifest: Pick<ReleaseManifest, 'dataset'>,
): ReleaseInput {
  const rows = <T>(type: RecordType) => records[type] as T[];
  return {
    meta: manifest.dataset,
    entities: rows('entities'),
    claims: rows('claims'),
    sources: rows('sources'),
    evidence: rows<Row>('evidence').map(({ quote, paraphrase, ...e }) => ({
      ...e,
      passage: quote ?? paraphrase,
    })) as Dataset['evidence'],
    collections: rows<Row>('collections').map((c) => ({
      kind: c.kind as CollectionDefinition['kind'],
      definition: c.definition as CollectionDefinition['definition'],
    })),
  };
}

function csvCell(value: unknown): string {
  let text: string;
  if (value === undefined || value === null) text = '';
  else if (Array.isArray(value)) {
    for (const item of value)
      if (typeof item !== 'string' || item.includes(csvListSeparator.trim()))
        throw new Error('A CSV list value contains the separator: ' + item);
    text = value.join(csvListSeparator);
  } else if (typeof value === 'object') text = canonicalJson(value);
  else text = String(value);
  if (text.includes('\r'))
    throw new Error('Carriage returns are not allowed in release text');
  return /[",\n]|^\s|\s$/.test(text)
    ? '"' + text.replaceAll('"', '""') + '"'
    : text;
}

function csvRow(type: RecordType, r: Row): unknown[] {
  if (type === 'entities') {
    const v = (r.documentVersion ?? {}) as Row;
    const p = (r.proposition ?? {}) as Row;
    return [
      r.id,
      r.type,
      r.subtype,
      r.name,
      r.shortName,
      r.sortName,
      r.aliases,
      r.description,
      r.sourceIds,
      r.externalIds,
      v.family,
      v.label,
      v.publisherId,
      v.publishedAt,
      v.effectiveAt,
      v.revisedAt,
      v.dateNote,
      p.code,
      p.criterion,
      p.terms,
      r.countryCode,
      r.datedNames === undefined ? undefined : canonicalJson(r.datedNames),
    ];
  }
  if (type === 'claims') {
    const o = r.object as Row;
    const t = r.time as Row;
    return [
      r.id,
      r.subject,
      r.predicate,
      o.kind,
      o.entityId,
      o.value,
      o.unit,
      r.topic,
      r.statement,
      t.kind,
      t.date,
      t.from,
      t.until,
      t.basis,
      t.note,
      r.derivation,
      r.resolution,
      r.inferenceRationale,
      r.editorialState,
      r.qualification,
      r.evidenceIds,
      r.recordedAt,
      r.supersedes,
      r.attributes,
    ];
  }
  if (type === 'evidence')
    return [
      r.id,
      r.claimId,
      r.sourceId,
      r.sourceRole,
      r.support,
      r.locator,
      r.passageType,
      r.quote,
      r.paraphrase,
      r.verification,
      r.checkedAt,
      r.reviewer,
      r.note,
      r.contextOnly,
      r.retrievalRoute,
    ];
  if (type === 'sources') {
    const words = r.documentWords as Row | undefined;
    const reuse = r.reuse as Row;
    return [
      r.id,
      r.documentId,
      r.title,
      r.authors,
      r.publisher,
      r.publisherId,
      r.publicationDate,
      r.version,
      r.versionDate,
      r.canonicalUrl,
      r.evidenceUrl,
      r.language,
      r.archivedUrl,
      r.archivedAt,
      words?.count,
      words?.basis,
      r.kind,
      r.accessedAt,
      reuse.attribution,
      reuse.licence,
      reuse.note,
      r.upstream,
      // An array of objects, written as one JSON value, not as a list.
      r.authorNames === undefined ? undefined : canonicalJson(r.authorNames),
    ];
  }
  return [
    r.id,
    r.kind,
    r.version,
    r.title,
    r.question,
    r.editorialStatus,
    r.claimIds,
    r.definition,
  ];
}

export function toCsv(
  type: RecordType,
  rows: Row[],
  format: WritableFormatVersion = releaseFormatVersion,
) {
  const columns = csvColumnsFor(type, format);
  const lines = [columns.join(',')];
  for (const r of rows) {
    const cells = csvRow(type, r).slice(0, columns.length);
    if (
      cells.length !== columns.length ||
      columns.length > csvColumns[type].length
    )
      throw new Error('CSV column mismatch for ' + type);
    lines.push(cells.map(csvCell).join(','));
  }
  return lines.join('\n') + '\n';
}

const emptyLists = <T>() =>
  Object.fromEntries(recordTypes.map((t) => [t, [] as T[]])) as Record<
    RecordType,
    T[]
  >;

/** Records added, changed and removed by ID against the previous release. */
export function compareReleases(
  version: string,
  records: ReleaseRecords,
  previous: { version: string; records: ReleaseRecords } | null,
  removals: Removals,
): ReleaseChanges {
  const changes: ReleaseChanges = {
    version,
    previousVersion: previous?.version ?? null,
    added: emptyLists(),
    changed: emptyLists(),
    removed: emptyLists(),
  };
  const missingReasons: string[] = [];
  for (const type of recordTypes) {
    const before = new Map(
      (previous?.records[type] ?? []).map((r) => [
        r.id as string,
        canonicalJson(r),
      ]),
    );
    const now = new Set<string>();
    for (const r of records[type]) {
      const id = r.id as string;
      now.add(id);
      const prior = before.get(id);
      if (prior === undefined) changes.added[type].push(id);
      else if (prior !== canonicalJson(r)) changes.changed[type].push(id);
    }
    for (const id of [...before.keys()].sort()) {
      if (now.has(id)) continue;
      const reason = removals[type]?.[id];
      if (!reason) missingReasons.push(`${type}/${id}`);
      else changes.removed[type].push({ id, reason });
    }
    changes.added[type].sort();
    changes.changed[type].sort();
  }
  if (missingReasons.length)
    throw new Error(
      'Released records are missing without a recorded removal reason (release/removals.json): ' +
        missingReasons.join(', '),
    );
  return changes;
}

const typeLabels: Record<RecordType, string> = {
  entities: 'Entities',
  claims: 'Claims',
  evidence: 'Evidence',
  sources: 'Sources',
  collections: 'Collections',
};
const total = (lists: Record<RecordType, unknown[]>) =>
  recordTypes.reduce((n, t) => n + lists[t].length, 0);
const thousands = (n: number) => n.toLocaleString('en-US');

export function changelogEntry(
  changes: ReleaseChanges,
  date: string,
  counts: Record<RecordType, number>,
) {
  const lines = [
    `# Selekoa dataset v${changes.version} (${date})`,
    '',
    changes.previousVersion
      ? `Compared with v${changes.previousVersion}. A changed record is one whose released JSON differs in any field.`
      : 'Initial release. Every record is listed as added.',
    '',
    '| Record type | Added | Changed | Removed | In this release |',
    '| --- | ---: | ---: | ---: | ---: |',
    ...recordTypes.map(
      (t) =>
        `| ${typeLabels[t]} | ${thousands(changes.added[t].length)} | ${thousands(changes.changed[t].length)} | ${thousands(changes.removed[t].length)} | ${thousands(counts[t])} |`,
    ),
    '',
  ];
  const idSection = (title: string, lists: Record<RecordType, string[]>) => {
    lines.push(`## ${title}`, '');
    if (!total(lists)) lines.push('None.', '');
    for (const t of recordTypes)
      if (lists[t].length)
        lines.push(
          `### ${typeLabels[t]} (${thousands(lists[t].length)})`,
          '',
          lists[t].map((id) => '`' + id + '`').join(', '),
          '',
        );
  };
  idSection('Added', changes.added);
  idSection('Changed', changes.changed);
  lines.push('## Removed', '');
  if (!total(changes.removed)) lines.push('None.', '');
  for (const t of recordTypes)
    if (changes.removed[t].length)
      lines.push(
        `### ${typeLabels[t]} (${thousands(changes.removed[t].length)})`,
        '',
        ...changes.removed[t].map((r) => `- \`${r.id}\`: ${r.reason}`),
        '',
      );
  return lines.join('\n').trimEnd() + '\n';
}

const thirdPartyNote =
  'Text inside quotation marks within a Selekoa text field is quoted from the source named by the record and is third-party text.';
const noLicenceNote =
  'No licence is granted with this release. Selekoa’s own records and text are not yet licensed for reuse, and quoted third-party passages remain subject to their publishers’ rights.';
const dataLicence = {
  spdx: 'CC-BY-4.0',
  url: 'https://creativecommons.org/licenses/by/4.0/',
};
const grantedLicenceNote = `Selekoa’s own records and text in this release are licensed under CC BY 4.0 (${dataLicence.url}). Quoted source passages, quotations inside Selekoa text and the source documents are excluded and remain subject to their owners’ rights. The legal code and the scope note are LICENSE-DATA.txt and LICENSING.md in the Selekoa repository and in the downloadable archive.`;

/** Releases in format 1.4 and later state the licence; earlier ones say none is granted. */
const licenceGranted = (format: WritableFormatVersion) =>
  !['1.1', '1.2', '1.3'].includes(format);
const licenceFor = (
  format: WritableFormatVersion,
): ReleaseManifest['licence'] =>
  licenceGranted(format)
    ? {
        granted: true,
        data: dataLicence,
        code: { spdx: 'MIT' },
        note: grantedLicenceNote,
      }
    : { granted: false, note: noLicenceNote };

function readme(
  version: string,
  date: string,
  counts: Record<RecordType, number>,
  meta: Dataset['meta'],
  formatVersion: WritableFormatVersion,
) {
  const v = 'v' + version;
  const citations =
    formatVersion === '1.1'
      ? { row: '', how: '' }
      : {
          row: `| Citations: every source as a CSL-JSON item, for reference managers | ${thousands(counts.sources)} | \`sources.csl.json\` |\n`,
          how: '\n\nTo cite an original source, import `sources.csl.json` into a reference manager such as Zotero. Each item describes the original document, not Selekoa, and carries no claim or passage. It is computed from the source records, so check its details against the document itself.',
        };
  const contextOnly =
    formatVersion === '1.1' || formatVersion === '1.2'
      ? ''
      : '- An evidence record with `contextOnly` misleads when shown alone. Show its quotation only together with the context that `contextOnly.requires` names and the records listed in `contextOnly.claimIds`.\n';
  const retrieval = ['1.1', '1.2', '1.3', '1.4', '1.5'].includes(formatVersion)
    ? ''
    : '- `retrievalRoute` says how an evidence passage was read for its check. `reader_relay` is a third-party reader service’s rendering of the publisher’s current page, not the publisher’s own server and not an archive copy; `x_syndication` is the text of a post from X’s syndication endpoint, which can be truncated. A claim whose supporting evidence is all `secondary` rests on reporting.\n';
  return `# Selekoa dataset ${v}

Released ${date}. Dataset schema ${meta.schemaVersion}, records updated ${meta.updatedAt}. Release format ${releaseFormat} ${formatVersion}.

Selekoa is a research base on the documentary history of machine intelligence. Each claim is one scoped statement linked to the source passages it rests on. A claim records what its sources state, with its date, qualification and review state. It is not a finding of fact, and a missing record is a gap in coverage.

## Contents

| Records | Count | Files |
| --- | ---: | --- |
| Entities: people, organisations, documents, concepts and other referents | ${thousands(counts.entities)} | \`entities.json\`, \`entities.csv\` |
| Claims: one scoped statement each | ${thousands(counts.claims)} | \`claims.json\`, \`claims.csv\` |
| Evidence: one source passage used for one claim | ${thousands(counts.evidence)} | \`evidence.json\`, \`evidence.csv\` |
| Sources: the inspected bibliographic expressions | ${thousands(counts.sources)} | \`sources.json\`, \`sources.csv\` |
| Collections: authored reading pages and the claims they use | ${thousands(counts.collections)} | \`collections.json\`, \`collections.csv\` |
${citations.row}
\`manifest.json\` gives the counts, the schema version, every file's SHA-256 checksum and each field's text class and stability. \`changes.json\` and \`CHANGELOG.md\` list the records added, changed and removed since the previous release, by ID. The JSON files are authoritative; the CSV files are flat views of them, with lists joined by \`${csvListSeparator}\` and nested values as JSON. The format is described in \`docs/dataset-format.md\` in the Selekoa repository.

## How to cite

Cite the original source for a fact itself. Cite Selekoa for the record: give the record ID and this release version.

> Selekoa, claim record \`<claim-id>\`, dataset release ${v} (${date}).

Use “entity record”, “evidence record”, “source record” or “collection record” for the other record types. A record ID is never reused for a different record. A correction that keeps a claim’s proposition keeps its ID; a changed proposition gets a new claim whose \`supersedes\` field names the earlier one, which stays in the dataset. \`CITATION.cff\` describes the release as a whole.${citations.how}

## Before relying on a record

- Read the cited passage in the original source, in the edition the evidence names. An access date, a current file or an archive capture does not prove what an earlier version said.
- \`editorialState: seed\` means that no human editor has accepted the record. \`verification: machine_checked\` means an automated research process checked the passage. Neither is a human review.
- \`resolution: supported\` is an assessment of the recorded evidence, not a statement that no contrary evidence exists. Contested and unresolved records keep the evidence on each side.
- A published framework, commitment or law shows what its author said. It is not evidence of implementation, compliance or effect.
${contextOnly}${retrieval}
## Third-party text

Verbatim passages quoted from sources are in the \`quote\` field of evidence records and nowhere else as whole passages. ${thirdPartyNote} Bibliographic fields (names, titles, authors and publishers) identify people and works. \`manifest.json\` lists the text class of every field.

## Licence

${licenceGranted(formatVersion) ? grantedLicenceNote : noLicenceNote + ' This release is a private, unpublished snapshot.'}

## Not included

Research corpora outside the application dataset, human review packs and audit logs, and the source documents themselves.
`;
}

function citation(version: string, date: string) {
  return `cff-version: 1.2.0
message: >-
  To cite a Selekoa record, give its record ID and this release version,
  for example "Selekoa, claim record <claim-id>, dataset release v${version}".
  Cite the original source for a fact itself.
type: dataset
title: Selekoa dataset
version: ${version}
date-released: '${date}'
authors:
  - name: Selekoa
abstract: >-
  Source-critical records on the documentary history of machine
  intelligence: entities, scoped claims, the source passages they rest
  on, the sources themselves and authored reading collections. Claims
  record what sources state; they are not findings of fact.
keywords:
  - machine intelligence
  - artificial intelligence
  - history
  - governance
  - provenance
`;
}

async function sha256(text: string) {
  const digest = await globalThis.crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(text),
  );
  return [...new Uint8Array(digest)]
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/** Generate every file of one release. Pure: the same arguments give the same bytes. */
export async function buildRelease({
  input,
  version: requested,
  date,
  previous,
  removals = {},
  formatVersion = releaseFormatVersion,
}: {
  input: ReleaseInput;
  version: string;
  date: string;
  previous: { version: string; records: ReleaseRecords } | null;
  removals?: Removals;
  /** An earlier format, only to reproduce a release written in it. */
  formatVersion?: string;
}): Promise<Release> {
  const version = parseVersion(requested);
  const format = writableFormatVersions.find((f) => f === formatVersion);
  if (!format)
    throw new Error(`Release format ${formatVersion} cannot be written`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date))
    throw new Error('A release date is YYYY-MM-DD');
  if (previous && compareVersions(version, previous.version) <= 0)
    throw new Error(
      `v${version} must be later than the previous release v${previous.version}`,
    );
  const records = publicRecords(input);
  const changes = compareReleases(version, records, previous, removals);
  const counts = Object.fromEntries(
    recordTypes.map((t) => [t, records[t].length]),
  ) as Record<RecordType, number>;
  const files: Record<string, string> = {};
  for (const type of recordTypes) {
    files[`${type}.json`] = JSON.stringify(records[type], null, 2) + '\n';
    files[`${type}.csv`] = toCsv(type, records[type], format);
  }
  if (format !== '1.1') {
    const data = normaliseInput(input);
    files['sources.csl.json'] = cslJson(cslItems(data, data.sources));
  }
  files['changes.json'] = JSON.stringify(changes, null, 2) + '\n';
  files['CHANGELOG.md'] = changelogEntry(changes, date, counts);
  files['README.md'] = readme(version, date, counts, input.meta, format);
  files['CITATION.cff'] = citation(version, date);
  const manifest: ReleaseManifest = {
    format: releaseFormat,
    formatVersion: format,
    version,
    releasedAt: date,
    previousVersion: changes.previousVersion,
    dataset: input.meta,
    inputFingerprint: await inputFingerprint(input),
    counts,
    changes: {
      added: total(changes.added),
      changed: total(changes.changed),
      removed: total(changes.removed),
    },
    fields: Object.fromEntries(
      recordTypes.map((t) => [
        t,
        Object.fromEntries(
          fieldsFor(t, format).map((f) => [
            f.name,
            { textClass: f.textClass, stability: f.stability },
          ]),
        ),
      ]),
    ) as ReleaseManifest['fields'],
    thirdPartyText: {
      fields: recordTypes.flatMap((t) =>
        fieldsFor(t, format)
          .filter((f) => f.textClass === 'third_party')
          .map((f) => `${t}.${f.name}`),
      ),
      inlineQuotation: thirdPartyNote,
    },
    licence: licenceFor(format),
    files: await Promise.all(
      Object.keys(files)
        .sort()
        .map(async (path) => ({
          path,
          bytes: new TextEncoder().encode(files[path]).length,
          sha256: await sha256(files[path]),
        })),
    ),
  };
  files['manifest.json'] = JSON.stringify(manifest, null, 2) + '\n';
  return { version, files, manifest, changes };
}

/** The cumulative changelog index across releases, newest first. */
export function changelogIndex(manifests: ReleaseManifest[]) {
  const sorted = [...manifests].sort((a, b) =>
    compareVersions(b.version, a.version),
  );
  return (
    [
      '# Selekoa dataset releases',
      '',
      'Each entry links to the full list of records added, changed and removed by ID. Generated by `pnpm release`.',
      '',
      ...sorted.flatMap((m) => [
        `## v${m.version} (${m.releasedAt})`,
        '',
        `${m.previousVersion ? `Against v${m.previousVersion}: ` : 'Initial release: '}${thousands(m.changes.added)} added, ${thousands(m.changes.changed)} changed, ${thousands(m.changes.removed)} removed. Schema ${m.dataset.schemaVersion}; ${recordTypes.map((t) => `${thousands(m.counts[t])} ${t}`).join(', ')}. [Full list](${releaseDirectory(m.version)}/CHANGELOG.md).`,
        '',
      ]),
    ]
      .join('\n')
      .trimEnd() + '\n'
  );
}
