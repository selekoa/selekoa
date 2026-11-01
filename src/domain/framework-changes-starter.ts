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
import { facetById, type ComparisonCollection } from './framework-comparison';
import {
  changesNotCoveredLabels,
  frameworkChangesView,
  statusLabels,
  type FrameworkChangesCollection,
} from './framework-changes';

const changesKeyLimits = [
  keyLimits[0],
  keyLimits[1],
  'A difference is between two editions’ recorded cells. It is not an assessment, and no reason is given for it. A framework’s text is never evidence of compliance, implementation or effectiveness.',
];

const differenceLabels = {
  status: 'status differs',
  passage: 'same status, different recorded passage',
  same: 'same status and passage',
  'not-applicable': 'does not apply to the earlier edition',
} as const;

/** A research starter for the edition-by-edition reading of the comparison. */
export async function frameworkChangesStarter(
  data: Dataset,
  collection: FrameworkChangesCollection,
  comparison: ComparisonCollection,
) {
  const view = frameworkChangesView(data, collection, comparison);
  const records = starterRecords(
    data,
    view.claimIds,
    view.families.flatMap((f) => f.editions.map((e) => e.entity.id)),
    view.families.flatMap((f) =>
      f.editions.flatMap((e) => e.sources.map((s) => s.id)),
    ),
  );
  const starter = {
    format: 'selekoa-research-starter',
    formatVersion: 1,
    dataset: { metadata: data.meta, fingerprint: await fingerprint(data) },
    frameworkChanges: {
      definition: collection,
      fingerprint: await fingerprint(collection),
      comparison: {
        id: comparison.id,
        version: comparison.version,
        fingerprint: await fingerprint(comparison),
      },
      interpretationStatus:
        'machine-proposed; not human-reviewed or editorially accepted',
      orderedClaimIds: view.claimIds,
      families: view.families.map((f) => ({
        family: f.family,
        label: f.label,
        editions: f.editions.map((e) => ({
          documentId: e.entity.id,
          label: e.entity.documentVersion!.label,
          date: e.date,
          dateKind: e.kind,
          publishedClaimIds: e.published.map((c) => c.id),
          replacesClaimIds: e.replaces.map((c) => c.id),
          versionChangeClaimIds: e.versionChanges.map((c) => c.id),
          exactTextSourceIds: e.sources.map((s) => s.id),
        })),
        questions: f.questions.map((q) => ({
          facetId: q.facet.id,
          cells: q.cells.map((c) => ({
            documentId: c.edition.id,
            status: c.status,
            claimId: c.claim?.id ?? null,
          })),
          steps: q.steps.map((s) => ({
            from: s.from.edition.id,
            to: s.to.edition.id,
            difference: s.difference,
          })),
        })),
      })),
      earliestLocated: view.earliest.map((row) => ({
        facetId: row.facet.id,
        families: row.families.map((f) => ({
          family: f.family,
          located: f.located
            ? {
                documentId: f.located.edition.id,
                status: f.located.status,
                claimId: f.located.claim!.id,
                earliestComparedEdition: f.firstEdition,
              }
            : null,
          stated: f.stated
            ? { documentId: f.stated.edition.id, claimId: f.stated.claim!.id }
            : null,
        })),
      })),
    },
    reviewStatus: reviewStatus(data, view.claimIds),
    disagreements: records.disagreements,
    inferences: records.inferences,
    notCovered: collection.notCovered,
    claims: records.claims,
    evidence: records.evidence,
    sources: records.sources,
    entities: records.entities,
    limits: [...changesKeyLimits, ...limits.slice(2)],
  };
  // Snapshot so later caller mutations cannot change the export.
  return JSON.parse(canonicalJson(starter)) as typeof starter;
}

export type FrameworkChangesStarter = Awaited<
  ReturnType<typeof frameworkChangesStarter>
>;

export function frameworkChangesStarterMarkdown(
  starter: FrameworkChangesStarter,
) {
  const { definition: collection } = starter.frameworkChanges;
  const claims = new Map(starter.claims.map((c) => [c.id, c]));
  const entities = new Map(starter.entities.map((e) => [e.id, e]));
  const sources = new Map(starter.sources.map((s) => [s.id, s]));
  const edition = (id: string) =>
    entities.get(id)?.documentVersion?.label ?? id;
  const question = (facetId: string) =>
    md(facetById(facetId)?.label ?? facetId) + ` (${facetId})`;
  const lines = [
    '# ' + md(collection.title) + ': research starter',
    '',
    `A machine-proposed starting point for independent checking. It is not a finding. Collection ${collection.id}, version ${collection.version}; comparison ${starter.frameworkChanges.comparison.id}, version ${starter.frameworkChanges.comparison.version}; dataset updated ${starter.dataset.metadata.updatedAt}. Fingerprints and technical notes are at the end.`,
    '',
    '## Key limits',
    '',
    ...[...changesKeyLimits, ...collection.limits].map((s) => '- ' + md(s)),
    '',
    '## Research question',
    '',
    md(collection.question),
    '',
    ...collection.reading.flatMap((s) => [md(s), '']),
    '## Review status of these records',
    '',
    ...reviewStatusSentences(starter.reviewStatus).map((s) => '- ' + md(s)),
    '',
  ];
  for (const f of starter.frameworkChanges.families) {
    lines.push('## ' + md(f.label), '', '### Editions', '');
    for (const e of f.editions)
      lines.push(
        `- ${md(e.label)} (${e.documentId}): ${e.date ? `${e.dateKind} ${e.date}` : 'date unknown'}.${e.exactTextSourceIds.length ? ' Exact text: ' + e.exactTextSourceIds.map((id) => `<${sources.get(id)!.evidenceUrl}>`).join(', ') + '.' : ''}${e.replacesClaimIds.length ? ' Replaces: ' + e.replacesClaimIds.join(', ') + '.' : ''}${e.versionChangeClaimIds.length ? ' Recorded changes: ' + e.versionChangeClaimIds.join(', ') + '.' : ''}`,
      );
    lines.push(
      '',
      '### Status by question and edition',
      '',
      '| Question | ' + f.editions.map((e) => cell(e.label)).join(' | ') + ' |',
      '| --- | ' + f.editions.map(() => '---').join(' | ') + ' |',
      ...f.questions.map(
        (q) =>
          `| ${cell(question(q.facetId))} | ` +
          q.cells
            .map((c) => cell(`${statusLabels[c.status]} (${c.claimId ?? '–'})`))
            .join(' | ') +
          ' |',
      ),
      '',
      '### Between consecutive editions',
      '',
    );
    for (const q of f.questions)
      lines.push(
        `- ${question(q.facetId)}: ` +
          (q.steps.length
            ? q.steps
                .map(
                  (s) =>
                    `${md(edition(s.from))} → ${md(edition(s.to))}: ${differenceLabels[s.difference]}`,
                )
                .join('; ')
            : 'one compared edition') +
          '.',
      );
    lines.push('');
  }
  lines.push(
    '## Across developers: earliest located',
    '',
    'The earliest compared edition of each framework whose cell records a passage (stated or stated partly). It is the earliest located in the compared editions, not the first time a developer said it.',
    '',
    '| Question | ' +
      starter.frameworkChanges.families.map((f) => cell(f.label)).join(' | ') +
      ' |',
    '| --- | ' +
      starter.frameworkChanges.families.map(() => '---').join(' | ') +
      ' |',
    ...starter.frameworkChanges.earliestLocated.map(
      (row) =>
        `| ${cell(question(row.facetId))} | ` +
        row.families
          .map((f) =>
            cell(
              f.located
                ? `${edition(f.located.documentId)}, ${statusLabels[f.located.status].toLowerCase()}${f.located.earliestComparedEdition ? ', earliest compared edition' : ''} (${f.located.claimId})${f.stated ? `; stated: ${edition(f.stated.documentId)} (${f.stated.claimId})` : ''}`
                : '–',
            ),
          )
          .join(' | ') +
        ' |',
    ),
    '',
    '## Records',
    '',
  );
  for (const claim of starter.claims)
    lines.push(...claimBlockLines(starter, claims.get(claim.id)!, 'Record'));
  lines.push('## Not covered', '');
  for (const n of starter.notCovered)
    lines.push(
      `- ${changesNotCoveredLabels[n.category]}: ${md(n.text)} (${n.id}${n.claimIds.length ? '; related claims: ' + n.claimIds.join(', ') : ''})`,
    );
  lines.push('', ...closingLines(starter));
  const shownLimits = new Set([...changesKeyLimits, ...collection.limits]);
  lines.push(
    '## Further limits and technical notes',
    '',
    ...starter.limits
      .filter((s) => !shownLimits.has(s))
      .map((s) => '- ' + md(s)),
    '',
    `Collection: ${collection.id} · version ${collection.version} · ${starter.frameworkChanges.interpretationStatus}`,
    `Collection fingerprint: ${starter.frameworkChanges.fingerprint}`,
    `Comparison fingerprint: ${starter.frameworkChanges.comparison.fingerprint}`,
    `Dataset: ${md(starter.dataset.metadata.title)} · schema ${starter.dataset.metadata.schemaVersion} · updated ${starter.dataset.metadata.updatedAt}`,
    `Dataset fingerprint: ${starter.dataset.fingerprint}`,
  );
  return lines.join('\n').trimEnd() + '\n';
}
