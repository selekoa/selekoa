import { z } from 'zod';
import { canonicalJson, fingerprint } from '../domain/references';
import {
  paths,
  splitIds,
  validateSnapshot,
  type UpstreamRow,
} from './upstream';

const text = z.string().min(1);
export const selectionSchema = z.strictObject({
  id: text,
  title: text,
  version: z.literal(1),
  records: z
    .array(
      z.strictObject({
        upstreamId: z.string().regex(/^PCR-\d{3}$/),
        reason: text,
        qualification: text,
        openQuestions: z.array(text).min(1),
      }),
    )
    .min(8)
    .max(12),
  evidenceInterpretations: z.array(
    z.strictObject({
      ordinal: z.number().int().positive(),
      upstreamClaimId: text,
      role: z.enum([
        'supports',
        'partially_supports',
        'contradicts',
        'context',
      ]),
      rationale: text,
    }),
  ),
});
export type Selection = z.infer<typeof selectionSchema>;
const status = z.enum([
  'SUPPORTS',
  'PARTIALLY_SUPPORTS',
  'CONTRADICTS',
  'UNRESOLVED',
  'UNREADABLE',
]);
const nullable = (value: string) => value || null;
const order = <T extends { id: string }>(rows: T[]) =>
  [...rows].sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
function unique(values: string[], label: string) {
  if (new Set(values).size !== values.length)
    throw new Error('Duplicate ' + label);
}
const address = (path: string, row: UpstreamRow) => ({
  path,
  recordOrdinal: row.ordinal,
  projectedRowFingerprint: row.fingerprint,
});

export const corpusLimits = [
  'Preliminary machine-conducted research; investigated propositions are not accepted facts. Upstream claim-level and evidence-level statuses are attributed reports, not Selekoa graph resolution or editorial acceptance.',
  'This bounded selection is a method demonstration, not a representative history or a priority finding. Contradictions, incomplete mappings and source-version disagreements remain visible.',
  'Source passages retain the upstream SOURCE_QUOTE_OR_SUMMARY label. They have not all been authenticated as contiguous verbatim quotations; do not quote them as such. SOURCE_ESTABLISHES is an upstream assessment, not an independent conclusion.',
  'The baseline report is dated 2026-08-21. Row-level original check dates and upstream model/version are not supplied. Null means unknown; import date, publication date and archive date are not evidence-check dates.',
  'The importer reproduces selected committed report cells. It does not replay upstream retrievals, its SQLite-dependent generator or any private frozen packet. No original document bytes or authenticated source hashes are included.',
  'No human evidence review, narrative curation or academic reliance review is recorded. Before relying on a proposition, manually inspect every source and passage used, competing evidence, versions and the stated search boundary.',
  'Upstream is private and has no tracked licence at the pinned revision. This task authorizes the bounded private prototype only. Third-party source reuse rights are unassessed; these exports do not authorize redistribution.',
];

export async function buildCollection(
  snapshotInput: unknown,
  selectionInput: unknown,
) {
  const snapshot = await validateSnapshot(snapshotInput);
  const selection = selectionSchema.parse(selectionInput);
  unique(
    selection.records.map((r) => r.upstreamId),
    'selection',
  );
  unique(
    selection.evidenceInterpretations.map((e) => String(e.ordinal)),
    'evidence interpretation',
  );
  unique(
    snapshot.claims.map((r) => r.values.CLAIM_ID),
    'claim ID',
  );
  unique(
    snapshot.sources.map((r) => r.values.EXPRESSION_ID),
    'expression ID',
  );
  unique(
    snapshot.evidence.map((r) => r.fingerprint),
    'evidence content',
  );
  const wanted = new Set(selection.records.map((r) => r.upstreamId));
  if (
    snapshot.claims.length !== wanted.size ||
    snapshot.claims.some((r) => !wanted.has(r.values.CLAIM_ID))
  )
    throw new Error('Selection/snapshot mismatch');
  const sourceIds = new Map(
    snapshot.sources.map((r) => [r.values.EXPRESSION_ID, r.values.SOURCE_ID]),
  );
  if (selection.evidenceInterpretations.length !== snapshot.evidence.length)
    throw new Error('Evidence interpretation coverage mismatch');
  const evidence = order(
    snapshot.evidence.map((row) => {
      const e = row.values;
      const interpretation = selection.evidenceInterpretations.find(
        (item) => item.ordinal === row.ordinal,
      );
      if (!interpretation || interpretation.upstreamClaimId !== e.CLAIM_ID)
        throw new Error('Evidence interpretation mapping mismatch');
      if (
        !wanted.has(e.CLAIM_ID) ||
        sourceIds.get(e.EXPRESSION_ID) !== e.SOURCE_ID
      )
        throw new Error('Broken evidence source/claim mapping');
      if (!e.LOCATION || !e.PASSAGE || !e.RATIONALE)
        throw new Error('Missing evidence locator, passage or rationale');
      z.url().parse(e.EVIDENCE_URL);
      return {
        id: 'si-evidence-' + String(row.ordinal).padStart(3, '0'),
        recordId: 'si-' + e.CLAIM_ID.toLowerCase(),
        sourceId: e.SOURCE_ID,
        expressionId: e.EXPRESSION_ID,
        upstream: address(paths.evidence, row),
        expressionUrlInspectedByUpstream: e.EVIDENCE_URL,
        locator: e.LOCATION,
        passage: {
          text: e.PASSAGE,
          upstreamComposition: e.PASSAGE_COMPOSITION,
          quotationAuthenticatedBySelekoa: false,
        },
        sourceRoleAsReported: e.SOURCE_ROLE,
        assessment: {
          status: status.parse(e.MACHINE_PRELIMINARY_STATUS),
          sourceEstablishes: e.SOURCE_ESTABLISHES,
          rationale: e.RATIONALE,
          confidenceAsReported: e.CONFIDENCE,
          temporalAdequacyAsReported: e.TEMPORALLY_ADEQUATE,
          roleAdequacyAsReported: e.SOURCE_ROLE_ADEQUATE,
        },
        // Explicit selection annotation, never an automatic upstream-status crosswalk.
        relationship: {
          role: interpretation.role,
          rationale: interpretation.rationale,
          assignedBy: 'Selekoa machine selection',
          checkedAt: '2026-09-28',
          scope:
            'upstream report assessment; not a new original-source verification',
        },
        captureDateAsReported: nullable(e.CAPTURE_DATE),
        originalCheckDate: null,
        humanEvidenceReview: { state: 'not_recorded' as const },
      };
    }),
  );
  const sources = order(
    snapshot.sources.map((row) => {
      const s = row.values;
      const linked = evidence.filter((e) => e.expressionId === s.EXPRESSION_ID);
      if (!linked.length) throw new Error('Orphan source expression');
      z.url().parse(s.CANONICAL_URL);
      z.url().parse(s.EXPRESSION_URL_USED);
      return {
        id: s.EXPRESSION_ID,
        sourceId: s.SOURCE_ID,
        workIdAsReported: s.WORK_ID,
        upstream: address(paths.sources, row),
        title: s.TITLE,
        authorsAsReported: nullable(s.AUTHORS),
        venueAsReported: nullable(s.VENUE),
        bibliographicIdentityAsReported: s.CANONICAL_BIBLIOGRAPHIC_IDENTITY,
        canonicalUrl: s.CANONICAL_URL,
        catalogExpressionUrl: s.EXPRESSION_URL_USED,
        originalPacketUrl: s.ORIGINAL_PACKET_URL,
        publicationDateAsReported: nullable(s.DATE),
        expressionDateAsReported: nullable(s.EXPRESSION_DATE),
        captureDateAsReported: nullable(s.CAPTURE_DATE),
        roleAsReported: s.SOURCE_ROLE,
        historicalOrganizationContext: nullable(
          s.HISTORICAL_ORGANIZATION_CONTEXT,
        ),
        identityEvidenceAsReported: nullable(s.IDENTITY_EVIDENCE),
        versionLimits: [
          'Upstream expression identifier is retained; it is not an authenticated hash of original source bytes. Date labels are upstream values and have not been resolved into historical version dates.',
          ...(linked.some(
            (e) => e.expressionUrlInspectedByUpstream !== s.EXPRESSION_URL_USED,
          )
            ? [
                'Evidence URL differs from the source catalog expression URL. Preserve both; format, archive and revision differences require inspection.',
              ]
            : []),
        ],
        rights: { status: 'unassessed' as const, termsUrl: null },
      };
    }),
  );
  const records = order(
    snapshot.claims.map((row) => {
      const c = row.values;
      const annotation = selection.records.find(
        (r) => r.upstreamId === c.CLAIM_ID,
      )!;
      const id = 'si-' + c.CLAIM_ID.toLowerCase();
      const linked = evidence.filter((e) => e.recordId === id);
      if (!linked.length) throw new Error('Record has no evidence');
      return {
        id,
        upstreamId: c.CLAIM_ID,
        upstream: address(paths.claims, row),
        concept: c.CONCEPT,
        investigatedProposition: c.ATOMIC_CLAIM,
        propositionKindAsReported: c.CLAIM_TYPE,
        assertionClassAsReported: c.ASSERTION_CLASS,
        provenanceTaxonomyAsReported: nullable(c.PROVENANCE_TAXONOMY),
        machineFinding: {
          status: status.parse(c.MACHINE_PRELIMINARY_STATUS),
          rationale: c.RATIONALE,
          originalCheckDate: null,
          actor: 'source-integrity baseline machine research',
          model: null,
        },
        search: {
          scope: c.SEARCH_SCOPE,
          boundary: nullable(c.SEARCH_BOUNDARY),
          venueScope: nullable(c.VENUE_SCOPE),
          networkScope: nullable(c.NETWORK_SCOPE),
          prioritySensitive: c.PRIORITY_SENSITIVE === 'YES',
          earliestPositiveEvidenceAsReported: nullable(
            c.EARLIEST_POSITIVE_EVIDENCE_DATE,
          ),
          earlierCandidatesAsReported: nullable(c.EARLIER_CANDIDATES_FOUND),
          priorityStatusAsReported: nullable(c.PRIORITY_STATUS),
        },
        eventDate: null,
        evidenceIds: linked.map((e) => e.id),
        qualification: annotation.qualification,
        selectionReason: annotation.reason,
        openQuestions: annotation.openQuestions,
        editorialAdmission: 'research_only' as const,
        humanReview: {
          evidence: 'not_recorded' as const,
          interpretation: 'not_recorded' as const,
          reliance: 'not_recorded' as const,
        },
      };
    }),
  );
  const mappings = snapshot.mappings.map((row) => {
    const m = row.values;
    return {
      id: 'si-mapping-' + String(row.ordinal).padStart(3, '0'),
      upstream: address(paths.mappings, row),
      packetClaimId: m.PACKET_CLAIM_ID,
      packetOccurrenceId: m.PACKET_OCCURRENCE_ID,
      sourceIdAsReported: m.SOURCE_ID,
      sourceGroupedAtomicIds: splitIds(m.ATOMIC_CLAIM_IDS),
      packetLevelAtomicIds: splitIds(m.PACKET_LEVEL_ATOMIC_CLAIM_IDS),
      provenanceClassificationIds: splitIds(
        m.PROVENANCE_CLASSIFICATION_CLAIM_IDS,
      ),
      basis: m.PROVENANCE_MAPPING_BASIS,
      treatment: m.TREATMENT,
      selectedRecordIds: [
        ...new Set(
          [
            ...splitIds(m.ATOMIC_CLAIM_IDS),
            ...splitIds(m.PACKET_LEVEL_ATOMIC_CLAIM_IDS),
            ...splitIds(m.PROVENANCE_CLASSIFICATION_CLAIM_IDS),
          ].filter((id) => wanted.has(id)),
        ),
      ]
        .sort()
        .map((id) => 'si-' + id.toLowerCase()),
    };
  });
  if (mappings.some((m) => !m.selectedRecordIds.length))
    throw new Error('Unrelated packet mapping');
  const normalizedSnapshot = {
    ...snapshot,
    files: [...snapshot.files].sort((a, b) => (a.path < b.path ? -1 : 1)),
    ...Object.fromEntries(
      (['claims', 'evidence', 'sources', 'mappings'] as const).map((k) => [
        k,
        [...snapshot[k]].sort((a, b) => a.ordinal - b.ordinal),
      ]),
    ),
  };
  const normalizedSelection = {
    ...selection,
    records: [...selection.records].sort((a, b) =>
      a.upstreamId < b.upstreamId ? -1 : 1,
    ),
    evidenceInterpretations: [...selection.evidenceInterpretations].sort(
      (a, b) => a.ordinal - b.ordinal,
    ),
  };
  const body = {
    format: 'selekoa-research-collection',
    formatVersion: 1,
    id: selection.id,
    title: selection.title,
    selectionVersion: selection.version,
    upstream: {
      repository: snapshot.repository,
      commit: snapshot.commit,
      reportDate: '2026-08-21',
      importedAt: snapshot.retrievedAt,
      files: normalizedSnapshot.files,
      attribution:
        'source-integrity baseline v1; maintained by futurelightcone',
      terms:
        'No tracked licence at pinned commit; bounded private reuse authorized for this prototype.',
    },
    reproduction: {
      snapshotFingerprint: await fingerprint(normalizedSnapshot),
      selectionFingerprint: await fingerprint(normalizedSelection),
      originalSourceReplay: false,
    },
    records,
    evidence,
    sources,
    mappings: order(mappings),
    limits: corpusLimits,
  };
  return { ...body, fingerprint: await fingerprint(body) };
}

export type ResearchCollection = Awaited<ReturnType<typeof buildCollection>>;
export const collectionJson = (collection: ResearchCollection) =>
  JSON.stringify(JSON.parse(canonicalJson(collection)), null, 2) + '\n';
