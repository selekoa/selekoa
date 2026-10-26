import type { Claim, Dataset } from './schema';
import { dateOf } from './query';
import { provisionKinds } from './document-history';
import type { StopItem } from './control-structures';

export type CommitmentsCollection = {
  id: string;
  version: number;
  title: string;
  question: string;
  editorialStatus: 'machine-proposed';
  /** Commitment texts, statutes and codes, in reading order. */
  documentIds: string[];
  introduction: string;
  limits: string[];
  openQuestions: {
    id: string;
    documentId: string;
    text: string;
    claimIds: string[];
  }[];
  stops: StopItem[];
};

export const commitmentStageLabels = {
  intent_announced: 'Intent to sign announced',
  signed: 'Signed',
  listed: 'Listed as signatory',
} as const;

export const commitmentLinkLabels = {
  fulfils: 'States that it fulfils',
  implements: 'States that it implements',
  responds_to: 'States that it responds to',
  designated_under: 'States that it serves as its framework under',
  complies_with: 'States that it complies with',
  names: 'Names',
} as const;

const byDate = (a: Claim, b: Claim) =>
  (dateOf(a) ?? '9999').localeCompare(dateOf(b) ?? '9999') ||
  a.id.localeCompare(b.id);
const targets = (c: Claim, id: string) =>
  c.object.kind === 'entity' && c.object.entityId === id;
const provisionOrder = (a: Claim, b: Claim) =>
  provisionKinds.indexOf(a.attributes!.provision!.kind) -
    provisionKinds.indexOf(b.attributes!.provision!.kind) ||
  a.attributes!.provision!.key.localeCompare(b.attributes!.provision!.key);

/**
 * Commitment texts and legal obligations with their recorded signatories,
 * refusals, quoted provisions and the published documents that explicitly
 * link themselves to each. A pure projection of stored claims: a signature
 * or a link is never presented as compliance.
 */
export function commitmentsView(
  data: Dataset,
  collection: CommitmentsCollection,
) {
  const entities = new Map(data.entities.map((e) => [e.id, e]));
  const documents = collection.documentIds.map((id) => {
    const entity = entities.get(id);
    if (!entity || entity.type !== 'document')
      throw new Error('Missing commitment document: ' + id);
    const about = (predicate: Claim['predicate']) =>
      data.claims.filter((c) => c.predicate === predicate && c.subject === id);
    const toward = (predicate: Claim['predicate']) =>
      data.claims
        .filter((c) => c.predicate === predicate && targets(c, id))
        .sort(byDate);
    const publisherId = entity.documentVersion?.publisherId;
    return {
      entity,
      publisher: publisherId ? (entities.get(publisherId) ?? null) : null,
      issued: [...toward('published'), ...toward('enacted')].sort(byDate),
      signatories: toward('signed_commitment'),
      declined: toward('declined_commitment'),
      provisions: about('states_provision').sort(provisionOrder),
      assessments: [
        ...about('provision_assessed'),
        ...about('control_assessed'),
      ].sort(byDate),
      links: toward('references_commitment'),
      sources: data.sources
        .filter((s) => s.documentId === id)
        .sort((a, b) => a.id.localeCompare(b.id)),
    };
  });
  // Who is recorded against which text: one row per organisation, one cell
  // per document, holding the stored signatory and refusal records. A
  // statute is enacted, not signed, so it has no column.
  const matrixDocuments = documents.filter(
    (d) =>
      d.signatories.length > 0 ||
      d.declined.length > 0 ||
      !d.issued.some((c) => c.predicate === 'enacted'),
  );
  const organisationIds = [
    ...new Set(
      documents.flatMap((d) =>
        [...d.signatories, ...d.declined].map((c) => c.subject),
      ),
    ),
  ];
  const matrix = organisationIds
    .map((id) => entities.get(id)!)
    .sort((a, b) =>
      (a.shortName ?? a.name).localeCompare(b.shortName ?? b.name, 'en', {
        sensitivity: 'base',
      }),
    )
    .map((organisation) => ({
      organisation,
      cells: matrixDocuments.map((d) => ({
        documentId: d.entity.id,
        claims: [...d.signatories, ...d.declined].filter(
          (c) => c.subject === organisation.id,
        ),
      })),
    }));
  const claimIds = [
    ...new Set([
      ...documents.flatMap((d) =>
        [
          ...d.issued,
          ...d.signatories,
          ...d.declined,
          ...d.provisions,
          ...d.assessments,
          ...d.links,
        ].map((c) => c.id),
      ),
      ...collection.openQuestions.flatMap((q) => q.claimIds),
      ...collection.stops.flatMap((s) => s.claimIds),
    ]),
  ];
  const known = new Set(data.claims.map((c) => c.id));
  for (const id of claimIds)
    if (!known.has(id)) throw new Error('Missing collection claim: ' + id);
  return {
    collection,
    documents,
    matrixDocumentIds: matrixDocuments.map((d) => d.entity.id),
    matrix,
    claimIds,
  };
}

export type CommitmentsView = ReturnType<typeof commitmentsView>;
export type CommitmentDocument = CommitmentsView['documents'][number];
