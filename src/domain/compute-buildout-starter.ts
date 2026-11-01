import type { Dataset } from './schema';
import {
  claimBlockLines,
  closingLines,
  keyLimits,
  limits,
  starterRecords,
} from './starter';
import { canonicalJson, fingerprint, md } from './references';
import { reviewStatus, reviewStatusSentences } from './review-status';
import {
  computeBuildoutView,
  computeNotCoveredLabels,
  type ComputeBuildoutCollection,
  type ComputeFigure,
} from './compute-buildout';

/**
 * Figures are each source's own. The starter lists every figure with its
 * record and never adds, converts or compares them, so it has no total.
 */
const computeKeyLimits = [
  keyLimits[0],
  keyLimits[1],
  'Every figure is the source’s own, in its own words. Figures are listed one by one with their record; none is added up, converted or compared.',
  'An announcement, a plan, a letter of intent or an agreement records what a party stated. It does not show that a site was built, that power was delivered, that chips were supplied or that money was spent. Stated dates are targets, deadlines and terms, never events.',
];

const figureLine = (f: Omit<ComputeFigure, 'key'>) =>
  `${md(f.value)} · ${f.kind === 'amount' ? 'amount' : 'figure'}: ${md(f.bound)}${f.measures !== null ? ` · measures: ${md(f.measures)}` : ''}${f.scope ? ` · scope: ${md(f.scope)}` : ''}`;

/** A research starter for the compute guide. */
export async function computeBuildoutStarter(
  data: Dataset,
  collection: ComputeBuildoutCollection,
) {
  const view = computeBuildoutView(data, collection);
  const records = starterRecords(data, view.claimIds, [], []);
  const starter = {
    format: 'selekoa-research-starter',
    formatVersion: 1,
    dataset: { metadata: data.meta, fingerprint: await fingerprint(data) },
    computeBuildout: {
      definition: collection,
      fingerprint: await fingerprint(collection),
      interpretationStatus:
        'machine-proposed; not human-reviewed or editorially accepted',
      orderedClaimIds: view.claimIds,
      timeline: view.timeline.map((r) => ({
        claimId: r.claim.id,
        date: r.date,
        dateKind: r.snapshot ? 'snapshot' : 'event',
        basis: r.basis,
        announcement: r.announcement,
        sectionId: r.sectionId,
      })),
      sections: view.sections.map((s) => ({
        id: s.id,
        title: s.title,
        groups: s.groups.map((g) => ({
          id: g.id,
          heading: g.heading,
          records: g.records.map((r) => ({
            claimId: r.claim.id,
            kind: r.kind,
            stage: r.stage,
            figures: r.figures.map((f) => ({
              kind: f.kind,
              value: f.value,
              bound: f.bound,
              measures: f.measures,
              scope: f.scope,
            })),
          })),
        })),
      })),
      statedDates: view.stated.map((d) => ({
        claimId: d.claim.id,
        kind: d.kind,
        date: d.date,
        wording: d.wording,
        statedBy: d.statedBy,
        note: d.note,
      })),
      orbitCollectionId: collection.orbit.collectionId,
    },
    reviewStatus: reviewStatus(data, view.claimIds),
    disagreements: records.disagreements,
    inferences: records.inferences,
    notCovered: collection.notCovered,
    claims: records.claims,
    evidence: records.evidence,
    sources: records.sources,
    entities: records.entities,
    limits: [...computeKeyLimits, ...limits.slice(2)],
  };
  // Snapshot so later caller mutations cannot change the export.
  return JSON.parse(canonicalJson(starter)) as typeof starter;
}

export type ComputeBuildoutStarter = Awaited<
  ReturnType<typeof computeBuildoutStarter>
>;

export function computeBuildoutStarterMarkdown(
  starter: ComputeBuildoutStarter,
) {
  const { definition: collection } = starter.computeBuildout;
  const claims = new Map(starter.claims.map((c) => [c.id, c]));
  const lines = [
    '# ' + md(collection.title) + ': research starter',
    '',
    `A machine-proposed starting point for independent checking. It is not a finding. Collection ${collection.id}, version ${collection.version}; dataset updated ${starter.dataset.metadata.updatedAt}. Fingerprints and technical notes are at the end.`,
    '',
    '## Key limits',
    '',
    ...[...computeKeyLimits, ...collection.limits].map((s) => '- ' + md(s)),
    '',
    '## Research question',
    '',
    md(collection.question),
    '',
    md(collection.bounds),
    '',
    `The arguments about compute in orbit are a separate collection (${collection.orbit.collectionId}).`,
    '',
    '## Review status of these records',
    '',
    ...reviewStatusSentences(starter.reviewStatus).map((s) => '- ' + md(s)),
    '',
    '## Timeline',
    '',
    'One line per record, dated by the record itself. Stated dates are listed apart.',
    '',
    ...starter.computeBuildout.timeline.map(
      (r) =>
        `- ${r.date} · ${r.dateKind === 'snapshot' ? 'snapshot' : (r.basis ?? 'event')}${r.announcement ? ' · announcement' : ''}: ${md(claims.get(r.claimId)!.statement)} (${r.claimId})`,
    ),
    '',
    '## Stated dates (targets, deadlines and terms, not events)',
    '',
    ...starter.computeBuildout.statedDates.map(
      (d) =>
        `- ${md(d.wording ?? d.date ?? '')}${d.wording && d.date && !d.wording.includes(d.date) ? ` (${d.date})` : ''}: ${md(d.kind)}, stated by ${md(d.statedBy)}${d.note ? `. ${md(d.note)}` : ''} (${d.claimId})`,
    ),
    '',
  ];
  for (const s of starter.computeBuildout.sections) {
    lines.push('## ' + md(s.title), '');
    for (const g of s.groups) {
      lines.push('### ' + md(g.heading), '');
      for (const r of g.records) {
        lines.push(
          `- ${md(r.kind)}${r.stage ? ` · ${md(r.stage)}` : ''} (${r.claimId})`,
        );
        for (const f of r.figures) lines.push('  - ' + figureLine(f));
      }
      lines.push('');
    }
  }
  lines.push('## Records', '');
  for (const claim of starter.claims)
    lines.push(...claimBlockLines(starter, claims.get(claim.id)!, 'Record'));
  lines.push('## Not covered', '');
  for (const n of starter.notCovered)
    lines.push(
      `- ${computeNotCoveredLabels[n.category]}: ${md(n.text)} (${n.id}${n.claimIds.length ? '; related claims: ' + n.claimIds.join(', ') : ''})`,
    );
  lines.push('', ...closingLines(starter));
  const shownLimits = new Set([...computeKeyLimits, ...collection.limits]);
  lines.push(
    '## Further limits and technical notes',
    '',
    ...starter.limits
      .filter((s) => !shownLimits.has(s))
      .map((s) => '- ' + md(s)),
    '',
    `Collection: ${collection.id} · version ${collection.version} · ${starter.computeBuildout.interpretationStatus}`,
    `Collection fingerprint: ${starter.computeBuildout.fingerprint}`,
    `Dataset: ${md(starter.dataset.metadata.title)} · schema ${starter.dataset.metadata.schemaVersion} · updated ${starter.dataset.metadata.updatedAt}`,
    `Dataset fingerprint: ${starter.dataset.fingerprint}`,
  );
  return lines.join('\n').trimEnd() + '\n';
}
