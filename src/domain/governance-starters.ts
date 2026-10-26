import type { Dataset } from './schema';
import {
  cell,
  claimBlockLines,
  closingLines,
  keyLimits,
  limits,
  starterRecords,
} from './starter';
import { canonicalJson, fingerprint, md } from './references';
import { reviewStatus, reviewStatusSentences } from './review-status';
import { timeLabel } from './query';
import { versionDescription } from './versions';
import { provisionKindLabels } from './document-history';
import {
  controlEntryLabels,
  controlRightLabels,
  controlStageLabels,
  controlStructure,
  stopCategoryLabels,
  type ControlStructureCollection,
  type StopItem,
} from './control-structures';
import {
  commitmentStageLabels,
  commitmentsView,
  type CommitmentsCollection,
} from './commitments';

const controlKeyLimits = [
  keyLimits[0],
  keyLimits[1],
  'A control right records what a source documents about an instrument and its stage. It is not an ownership share, and nothing here joins separate records into a chain of control or interprets the legal effect of any instrument.',
];

const commitmentKeyLimits = [
  keyLimits[0],
  keyLimits[1],
  'A commitment, a signature or a legal obligation is never evidence of compliance, implementation or effectiveness. A document’s statement that it fulfils or complies with a commitment is that document’s own claim.',
];

function stopLines(stops: StopItem[]) {
  const lines = ['## Questions set aside', ''];
  if (!stops.length) return [...lines, 'None listed.', ''];
  for (const s of stops)
    lines.push(
      `- ${md(stopCategoryLabels[s.category])}: ${md(s.text)} (${s.id}${s.claimIds.length ? '; related claims: ' + s.claimIds.join(', ') : ''})`,
    );
  return [...lines, ''];
}

function questionLines(
  questions: { id: string; text: string; claimIds: string[] }[],
  heading: string,
) {
  if (!questions.length) return [];
  return [
    heading,
    '',
    ...questions.map(
      (q) => `- ${md(q.text)} (${q.id}; claims: ${q.claimIds.join(', ')})`,
    ),
    '',
  ];
}

function technicalLines(
  starterLimits: string[],
  collectionLimits: string[],
  shownLimits: string[],
  footer: string[],
) {
  const shown = new Set(shownLimits);
  return [
    '## Further limits and technical notes',
    '',
    ...[...starterLimits, ...collectionLimits]
      .filter((s) => !shown.has(s))
      .map((s) => '- ' + md(s)),
    '',
    ...footer,
  ];
}

/** A research starter for one organisation's control-structure timeline. */
export async function controlStructureStarter(
  data: Dataset,
  collection: ControlStructureCollection,
) {
  const structure = controlStructure(data, collection);
  const records = starterRecords(
    data,
    structure.claimIds,
    [collection.organisationId, ...collection.entityIds],
    [],
  );
  const starter = {
    format: 'selekoa-research-starter',
    formatVersion: 1,
    dataset: { metadata: data.meta, fingerprint: await fingerprint(data) },
    controlStructure: {
      definition: collection,
      fingerprint: await fingerprint(collection),
      interpretationStatus:
        'machine-proposed; not human-reviewed or editorially accepted',
      orderedClaimIds: structure.claimIds,
      timeline: structure.entries.map((e) => ({
        claimId: e.claim.id,
        kind: e.kind,
        date: e.date,
        stage: e.claim.attributes?.control?.stage ?? null,
        right: e.right,
        instrument: e.instrument,
        subjectId: e.subject.id,
        objectId: e.object?.id ?? null,
      })),
    },
    reviewStatus: reviewStatus(data, structure.claimIds),
    disagreements: records.disagreements,
    inferences: records.inferences,
    openQuestions: collection.openQuestions,
    stops: collection.stops,
    claims: records.claims,
    evidence: records.evidence,
    sources: records.sources,
    entities: records.entities,
    limits: [...controlKeyLimits, ...limits.slice(2)],
  };
  // Snapshot so later caller mutations cannot change the export.
  return JSON.parse(canonicalJson(starter)) as typeof starter;
}

export type ControlStarter = Awaited<
  ReturnType<typeof controlStructureStarter>
>;

export function controlStarterMarkdown(starter: ControlStarter) {
  const collection = starter.controlStructure.definition;
  const claims = new Map(starter.claims.map((c) => [c.id, c]));
  const entities = new Map(starter.entities.map((e) => [e.id, e]));
  const name = (id: string | null) =>
    id ? (entities.get(id)?.shortName ?? entities.get(id)?.name ?? id) : '';
  const rights = starter.controlStructure.timeline.filter(
    (t) => t.kind === 'control',
  );
  const lines = [
    '# ' + md(collection.title) + ': research starter',
    '',
    `A machine-proposed starting point for independent checking. It is not a finding. Control structure ${collection.id}, version ${collection.version}; dataset updated ${starter.dataset.metadata.updatedAt}. Fingerprints and technical notes are at the end.`,
    '',
    '## Recorded control rights',
    '',
    'One row per recorded control right, in date order. Rows are not joined into a chain. Each keeps its own date, stage and evidence.',
    '',
    '| Date | Stage | Holder | Right | Over | Instrument | Claim |',
    '| --- | --- | --- | --- | --- | --- | --- |',
    ...rights.map((t) => {
      const claim = claims.get(t.claimId)!;
      return `| ${cell(timeLabel(claim))} | ${cell(t.stage ? controlStageLabels[t.stage] : '')} | ${cell(name(t.subjectId))} | ${cell(t.right ? controlRightLabels[t.right] : '')} | ${cell(name(t.objectId))} | ${cell(t.instrument ?? '')} | ${t.claimId} |`;
    }),
    '',
    '## Key limits',
    '',
    ...[...controlKeyLimits, ...collection.limits.slice(0, 2)].map(
      (s) => '- ' + md(s),
    ),
    '',
    '## Research question',
    '',
    md(collection.question),
    '',
    md(collection.introduction),
    '',
    '## Review status of these records',
    '',
    ...reviewStatusSentences(starter.reviewStatus).map((s) => '- ' + md(s)),
    '',
    '## Dated timeline',
    '',
  ];
  let year: string | null | undefined;
  for (const t of starter.controlStructure.timeline) {
    const y = t.date ? t.date.slice(0, 4) : null;
    if (y !== year) {
      lines.push('### ' + (y ?? 'Undated'), '');
      year = y;
    }
    const heading =
      controlEntryLabels[t.kind] +
      (t.stage ? ` (${controlStageLabels[t.stage].toLowerCase()})` : '');
    const block = claimBlockLines(starter, claims.get(t.claimId)!, heading);
    // The instrument follows the statement, before the dated facts.
    if (t.instrument) block.splice(4, 0, `Instrument: ${md(t.instrument)}`, '');
    lines.push(...block);
  }
  lines.push(
    ...questionLines(starter.openQuestions, '## Open questions'),
    ...stopLines(starter.stops),
    ...closingLines(starter),
    ...technicalLines(
      starter.limits,
      collection.limits,
      [...controlKeyLimits, ...collection.limits.slice(0, 2)],
      [
        `Control structure: ${collection.id} · version ${collection.version} · ${starter.controlStructure.interpretationStatus}`,
        `Collection fingerprint: ${starter.controlStructure.fingerprint}`,
        `Dataset: ${md(starter.dataset.metadata.title)} · schema ${starter.dataset.metadata.schemaVersion} · updated ${starter.dataset.metadata.updatedAt}`,
        `Dataset fingerprint: ${starter.dataset.fingerprint}`,
      ],
    ),
  );
  return lines.join('\n').trimEnd() + '\n';
}

/** A research starter for the external-commitments page. */
export async function commitmentsStarter(
  data: Dataset,
  collection: CommitmentsCollection,
) {
  const view = commitmentsView(data, collection);
  const records = starterRecords(
    data,
    view.claimIds,
    collection.documentIds,
    view.documents.flatMap((d) => d.sources.map((s) => s.id)),
  );
  const starter = {
    format: 'selekoa-research-starter',
    formatVersion: 1,
    dataset: { metadata: data.meta, fingerprint: await fingerprint(data) },
    commitments: {
      definition: collection,
      fingerprint: await fingerprint(collection),
      interpretationStatus:
        'machine-proposed; not human-reviewed or editorially accepted',
      orderedClaimIds: view.claimIds,
      documents: view.documents.map((d) => ({
        documentId: d.entity.id,
        publisherId: d.publisher?.id ?? null,
        issuedClaimIds: d.issued.map((c) => c.id),
        signatoryClaimIds: d.signatories.map((c) => c.id),
        declinedClaimIds: d.declined.map((c) => c.id),
        provisionClaimIds: d.provisions.map((c) => c.id),
        assessmentClaimIds: d.assessments.map((c) => c.id),
        linkClaimIds: d.links.map((c) => c.id),
        exactTextSourceIds: d.sources.map((s) => s.id),
      })),
      signatoryMatrixDocumentIds: view.matrixDocumentIds,
      signatoryMatrix: view.matrix.map((row) => ({
        organisationId: row.organisation.id,
        cells: row.cells.map((c) => ({
          documentId: c.documentId,
          claimIds: c.claims.map((claim) => claim.id),
        })),
      })),
    },
    reviewStatus: reviewStatus(data, view.claimIds),
    disagreements: records.disagreements,
    inferences: records.inferences,
    openQuestions: collection.openQuestions,
    stops: collection.stops,
    claims: records.claims,
    evidence: records.evidence,
    sources: records.sources,
    entities: records.entities,
    limits: [...commitmentKeyLimits, ...limits.slice(2)],
  };
  // Snapshot so later caller mutations cannot change the export.
  return JSON.parse(canonicalJson(starter)) as typeof starter;
}

export type CommitmentsStarter = Awaited<ReturnType<typeof commitmentsStarter>>;

export function commitmentsStarterMarkdown(starter: CommitmentsStarter) {
  const collection = starter.commitments.definition;
  const claims = new Map(starter.claims.map((c) => [c.id, c]));
  const entities = new Map(starter.entities.map((e) => [e.id, e]));
  const sources = new Map(starter.sources.map((s) => [s.id, s]));
  const docName = (id: string) =>
    entities.get(id)?.shortName ?? entities.get(id)?.name ?? id;
  const cellFor = (ids: string[]) =>
    ids
      .map((id) => {
        const c = claims.get(id)!;
        const date = timeLabel(c);
        if (c.predicate === 'declined_commitment')
          return `stated it would not sign, ${date}`;
        const stage = c.attributes?.commitment?.stage;
        const scope = c.attributes?.commitment?.scope;
        return `${stage ? commitmentStageLabels[stage].toLowerCase() : 'signatory'}, ${date}${scope ? ' (' + scope + ')' : ''}`;
      })
      .join('; ') || '–';
  const documents = starter.commitments.documents;
  const matrixIds = starter.commitments.signatoryMatrixDocumentIds;
  const lines = [
    '# ' + md(collection.title) + ': research starter',
    '',
    `A machine-proposed starting point for independent checking. It is not a finding. Collection ${collection.id}, version ${collection.version}; dataset updated ${starter.dataset.metadata.updatedAt}. Fingerprints and technical notes are at the end.`,
    '',
    '## Who signed or refused which text',
    '',
    'One row per organisation. Each cell lists the recorded signatures or refusals, with stage and date. A dash means nothing is recorded. Laws are not signed and have no column. Signing is not compliance.',
    '',
    '| Organisation | ' +
      matrixIds.map((id) => cell(docName(id))).join(' | ') +
      ' |',
    '| --- | ' + matrixIds.map(() => '---').join(' | ') + ' |',
    ...starter.commitments.signatoryMatrix.map(
      (row) =>
        `| ${cell(entities.get(row.organisationId)!.name)} | ` +
        row.cells.map((c) => cell(cellFor(c.claimIds))).join(' | ') +
        ' |',
    ),
    '',
    '## Key limits',
    '',
    ...[...commitmentKeyLimits, ...collection.limits.slice(0, 2)].map(
      (s) => '- ' + md(s),
    ),
    '',
    '## Research question',
    '',
    md(collection.question),
    '',
    md(collection.introduction),
    '',
    '## Review status of these records',
    '',
    ...reviewStatusSentences(starter.reviewStatus).map((s) => '- ' + md(s)),
    '',
    '## Commitment texts and obligations',
    '',
  ];
  for (const d of documents) {
    const entity = entities.get(d.documentId)!;
    lines.push('### ' + md(entity.name), '', md(entity.description), '');
    if (entity.documentVersion)
      lines.push(
        md(versionDescription(entity)),
        '',
        'Date note: ' + md(entity.documentVersion.dateNote),
        '',
      );
    if (d.exactTextSourceIds.length)
      lines.push(
        'Exact text: ' +
          d.exactTextSourceIds
            .map((id) => {
              const s = sources.get(id)!;
              return (
                `${md(s.title)} <${s.evidenceUrl}>` +
                (s.archivedUrl
                  ? ` (archived copy${s.archivedAt ? ', captured ' + s.archivedAt : ''}: <${s.archivedUrl}>)`
                  : '')
              );
            })
            .join('; '),
        '',
      );
    const groups: [string, string[]][] = [
      ['Issued', d.issuedClaimIds],
      ['Signatory', d.signatoryClaimIds],
      ['Stated refusal', d.declinedClaimIds],
      ['Linked document', d.linkClaimIds],
      ['Disputed assessment', d.assessmentClaimIds],
    ];
    for (const [heading, ids] of groups)
      for (const id of ids)
        lines.push(...claimBlockLines(starter, claims.get(id)!, heading));
    if (!d.linkClaimIds.length)
      lines.push(
        'Coverage gap: no published framework is recorded as linking itself to this text.',
        '',
      );
    for (const id of d.provisionClaimIds) {
      const claim = claims.get(id)!;
      const kind =
        provisionKindLabels[claim.attributes!.provision!.kind].toLowerCase();
      lines.push(...claimBlockLines(starter, claim, `Provision (${kind})`));
    }
    lines.push(
      ...questionLines(
        starter.openQuestions.filter((q) => q.documentId === d.documentId),
        '#### Open questions',
      ),
    );
  }
  lines.push(
    ...stopLines(starter.stops),
    ...closingLines(starter),
    ...technicalLines(
      starter.limits,
      collection.limits,
      [...commitmentKeyLimits, ...collection.limits.slice(0, 2)],
      [
        `Collection: ${collection.id} · version ${collection.version} · ${starter.commitments.interpretationStatus}`,
        `Collection fingerprint: ${starter.commitments.fingerprint}`,
        `Dataset: ${md(starter.dataset.metadata.title)} · schema ${starter.dataset.metadata.schemaVersion} · updated ${starter.dataset.metadata.updatedAt}`,
        `Dataset fingerprint: ${starter.dataset.fingerprint}`,
      ],
    ),
  );
  return lines.join('\n').trimEnd() + '\n';
}
