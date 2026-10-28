/**
 * The public dataset release format (docs/dataset-format.md). Every field a
 * release file can carry is listed here, in output order, with its text class
 * and stability. A record field missing from this list stops the release, so
 * the documented format cannot drift silently from the data.
 */

export const releaseFormat = 'selekoa-dataset';
export const releaseFormatVersion = '1.7';
/**
 * Formats the generator can still write, so a release made in an earlier
 * format reproduces byte for byte. Format 1.2 adds `sources.csl.json`;
 * format 1.3 adds the evidence field `contextOnly` (dataset schema 2.12);
 * format 1.4 changes no record field and states the licence (the manifest's
 * `licence` and the README's licence section); format 1.5 adds the source
 * field `authorNames` (dataset schema 2.14); format 1.6 adds the evidence
 * field `retrievalRoute` (dataset schema 2.15); format 1.7 adds the entity
 * fields `countryCode` and `datedNames` (dataset schema 2.19).
 */
export const writableFormatVersions = [
  '1.1',
  '1.2',
  '1.3',
  '1.4',
  '1.5',
  '1.6',
  '1.7',
] as const;
export type WritableFormatVersion = (typeof writableFormatVersions)[number];

/**
 * - `structured`: identifiers, enumerations, dates, numbers and URLs.
 * - `bibliographic`: names, titles, authors and publishers as they identify
 *   a person, organisation or work.
 * - `selekoa`: text written for Selekoa. It can contain short quotations in
 *   quotation marks; the quoted words are third-party text.
 * - `third_party`: verbatim text quoted from a source.
 */
export type TextClass =
  'structured' | 'bibliographic' | 'selekoa' | 'third_party';
export type Stability = 'stable' | 'provisional';
export type FieldSpec = {
  name: string;
  textClass: TextClass;
  stability: Stability;
  /** Present on every record; otherwise omitted when not recorded. */
  required?: boolean;
  /** Free-form nested object; its own keys are listed in the format document. */
  nested?: boolean;
  /** The release format that added the field; earlier formats omit it. */
  since?: WritableFormatVersion;
};

const f = (
  name: string,
  textClass: TextClass,
  stability: Stability,
  options: {
    required?: boolean;
    nested?: boolean;
    since?: WritableFormatVersion;
  } = {},
): FieldSpec => ({ name, textClass, stability, ...options });

export const recordTypes = [
  'entities',
  'claims',
  'evidence',
  'sources',
  'collections',
] as const;
export type RecordType = (typeof recordTypes)[number];

export const recordFields: Record<RecordType, FieldSpec[]> = {
  entities: [
    f('id', 'structured', 'stable', { required: true }),
    f('type', 'structured', 'stable', { required: true }),
    f('subtype', 'selekoa', 'provisional', { required: true }),
    f('name', 'bibliographic', 'stable', { required: true }),
    f('shortName', 'bibliographic', 'stable'),
    f('sortName', 'bibliographic', 'stable'),
    f('aliases', 'bibliographic', 'stable', { required: true }),
    f('description', 'selekoa', 'stable', { required: true }),
    f('sourceIds', 'structured', 'stable', { required: true }),
    f('externalIds', 'structured', 'provisional'),
    f('documentVersion', 'selekoa', 'stable', { nested: true }),
    f('proposition', 'selekoa', 'provisional', { nested: true }),
    f('countryCode', 'structured', 'stable', { since: '1.7' }),
    f('datedNames', 'selekoa', 'provisional', { nested: true, since: '1.7' }),
  ],
  claims: [
    f('id', 'structured', 'stable', { required: true }),
    f('subject', 'structured', 'stable', { required: true }),
    f('predicate', 'structured', 'stable', { required: true }),
    f('object', 'selekoa', 'stable', { required: true, nested: true }),
    f('topic', 'structured', 'stable', { required: true }),
    f('statement', 'selekoa', 'stable', { required: true }),
    f('time', 'selekoa', 'stable', { required: true, nested: true }),
    f('derivation', 'structured', 'stable', { required: true }),
    f('resolution', 'structured', 'stable', { required: true }),
    f('inferenceRationale', 'selekoa', 'stable'),
    f('editorialState', 'structured', 'stable', { required: true }),
    f('qualification', 'selekoa', 'stable', { required: true }),
    f('evidenceIds', 'structured', 'stable', { required: true }),
    f('recordedAt', 'structured', 'stable', { required: true }),
    f('supersedes', 'structured', 'stable'),
    f('attributes', 'selekoa', 'provisional', { nested: true }),
  ],
  evidence: [
    f('id', 'structured', 'stable', { required: true }),
    f('claimId', 'structured', 'stable', { required: true }),
    f('sourceId', 'structured', 'stable', { required: true }),
    f('sourceRole', 'structured', 'stable', { required: true }),
    f('support', 'structured', 'stable', { required: true }),
    f('locator', 'selekoa', 'stable', { required: true }),
    f('passageType', 'structured', 'stable', { required: true }),
    f('quote', 'third_party', 'stable'),
    f('paraphrase', 'selekoa', 'stable'),
    f('verification', 'structured', 'stable', { required: true }),
    f('checkedAt', 'structured', 'stable', { required: true }),
    f('reviewer', 'bibliographic', 'stable'),
    f('note', 'selekoa', 'stable', { required: true }),
    f('contextOnly', 'selekoa', 'provisional', { nested: true, since: '1.3' }),
    f('retrievalRoute', 'structured', 'provisional', { since: '1.6' }),
  ],
  sources: [
    f('id', 'structured', 'stable', { required: true }),
    f('documentId', 'structured', 'stable'),
    f('title', 'bibliographic', 'stable', { required: true }),
    f('authors', 'bibliographic', 'stable', { required: true }),
    f('authorNames', 'bibliographic', 'provisional', {
      nested: true,
      since: '1.5',
    }),
    f('publisher', 'bibliographic', 'stable', { required: true }),
    f('publisherId', 'structured', 'stable'),
    f('publicationDate', 'structured', 'stable', { required: true }),
    f('version', 'selekoa', 'stable', { required: true }),
    f('versionDate', 'structured', 'stable'),
    f('canonicalUrl', 'structured', 'stable', { required: true }),
    f('evidenceUrl', 'structured', 'stable', { required: true }),
    f('language', 'structured', 'stable'),
    f('archivedUrl', 'structured', 'stable'),
    f('archivedAt', 'structured', 'stable'),
    f('documentWords', 'selekoa', 'provisional', { nested: true }),
    f('kind', 'structured', 'stable', { required: true }),
    f('accessedAt', 'structured', 'stable', { required: true }),
    f('reuse', 'selekoa', 'provisional', { required: true, nested: true }),
    f('upstream', 'selekoa', 'provisional', { nested: true }),
  ],
  collections: [
    f('id', 'structured', 'stable', { required: true }),
    f('kind', 'structured', 'stable', { required: true }),
    f('version', 'structured', 'stable', { required: true }),
    f('title', 'selekoa', 'stable', { required: true }),
    f('question', 'selekoa', 'stable', { required: true }),
    f('editorialStatus', 'structured', 'stable', { required: true }),
    f('claimIds', 'structured', 'stable', { required: true }),
    f('definition', 'selekoa', 'provisional', {
      required: true,
      nested: true,
    }),
  ],
};

/** CSV columns: a flat view of the JSON records. JSON is authoritative. */
export const csvColumns: Record<RecordType, string[]> = {
  entities: [
    'id',
    'type',
    'subtype',
    'name',
    'short_name',
    'sort_name',
    'aliases',
    'description',
    'source_ids',
    'external_ids_json',
    'document_family',
    'document_label',
    'document_publisher_id',
    'document_published_at',
    'document_effective_at',
    'document_revised_at',
    'document_date_note',
    'proposition_code',
    'proposition_criterion',
    'proposition_terms',
    'country_code',
    'dated_names_json',
  ],
  claims: [
    'id',
    'subject',
    'predicate',
    'object_kind',
    'object_entity_id',
    'object_value',
    'object_unit',
    'topic',
    'statement',
    'time_kind',
    'time_date',
    'time_from',
    'time_until',
    'time_basis',
    'time_note',
    'derivation',
    'resolution',
    'inference_rationale',
    'editorial_state',
    'qualification',
    'evidence_ids',
    'recorded_at',
    'supersedes',
    'attributes_json',
  ],
  evidence: [
    'id',
    'claim_id',
    'source_id',
    'source_role',
    'support',
    'locator',
    'passage_type',
    'quote',
    'paraphrase',
    'verification',
    'checked_at',
    'reviewer',
    'note',
    'context_only_json',
    'retrieval_route',
  ],
  sources: [
    'id',
    'document_id',
    'title',
    'authors',
    'publisher',
    'publisher_id',
    'publication_date',
    'version',
    'version_date',
    'canonical_url',
    'evidence_url',
    'language',
    'archived_url',
    'archived_at',
    'document_words',
    'document_words_basis',
    'kind',
    'accessed_at',
    'reuse_attribution',
    'reuse_licence',
    'reuse_note',
    'upstream_json',
    'author_names_json',
  ],
  collections: [
    'id',
    'kind',
    'version',
    'title',
    'question',
    'editorial_status',
    'claim_ids',
    'definition_json',
  ],
};

/** Separator for list values in CSV cells; it never occurs in a value. */
export const csvListSeparator = ' | ';

/** CSV columns added by a later format, which earlier formats omit. */
const csvColumnsSince: Record<string, WritableFormatVersion> = {
  context_only_json: '1.3',
  author_names_json: '1.5',
  retrieval_route: '1.6',
  country_code: '1.7',
  dated_names_json: '1.7',
};

const formatOrder = (v: WritableFormatVersion) =>
  writableFormatVersions.indexOf(v);

/** The fields a release in `format` carries. */
export function fieldsFor(type: RecordType, format: WritableFormatVersion) {
  return recordFields[type].filter(
    (field) => !field.since || formatOrder(field.since) <= formatOrder(format),
  );
}

/** The CSV columns a release in `format` carries. */
export function csvColumnsFor(type: RecordType, format: WritableFormatVersion) {
  return csvColumns[type].filter((column) => {
    const since = csvColumnsSince[column];
    return !since || formatOrder(since) <= formatOrder(format);
  });
}
