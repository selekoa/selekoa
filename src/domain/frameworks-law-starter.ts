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
import { provisionKindLabels } from './document-history';
import { commitmentLinkLabels } from './commitments';
import { frameworkLabels } from './versions';
import {
  changeLabels,
  frameworksLawView,
  notCoveredLabels,
  standingLabels,
  standingNotes,
  type FrameworksLawCollection,
} from './frameworks-law';

const frameworksLawKeyLimits = [
  keyLimits[0],
  keyLimits[1],
  'A framework, a commitment or a legal duty is never evidence of compliance, implementation or effectiveness. A standing describes a text’s form and recorded stage, not its legal effect.',
];

/** A research starter for the frameworks-and-law reading. */
export async function frameworksLawStarter(
  data: Dataset,
  collection: FrameworksLawCollection,
) {
  const view = frameworksLawView(data, collection);
  const documentIds = view.sections.flatMap((s) =>
    s.instruments.map((i) => i.entity.id),
  );
  const records = starterRecords(
    data,
    view.claimIds,
    [...documentIds, ...view.editions.map((e) => e.entity.id)],
    view.sections.flatMap((s) =>
      s.instruments.flatMap((i) => i.sources.map((src) => src.id)),
    ),
  );
  const starter = {
    format: 'selekoa-research-starter',
    formatVersion: 1,
    dataset: { metadata: data.meta, fingerprint: await fingerprint(data) },
    frameworksLaw: {
      definition: collection,
      fingerprint: await fingerprint(collection),
      interpretationStatus: 'machine-proposed',
      orderedClaimIds: view.claimIds,
      timeline: view.timeline.map((r) => ({
        date: r.date,
        precision: r.precision,
        dateKind: r.dateKind,
        basis: r.basis,
        scheduled: r.scheduled,
        label: r.label,
        lane: r.lane,
        recordId: r.documentId,
        sectionId: r.sectionId,
        claimIds: r.claims.map((c) => c.id),
      })),
      sections: view.sections.map((s) => ({
        sectionId: s.id,
        title: s.title,
        instruments: s.instruments.map((i) => ({
          documentId: i.entity.id,
          standing: i.standing,
          standingClaimIds: i.standingClaims.map((c) => c.id),
          changes: i.changes.map((c) => ({
            change: c.change,
            claimIds: c.claims.map((claim) => claim.id),
          })),
          lifecycleClaimIds: i.lifecycle.map((c) => c.id),
          statedDateClaimIds: i.statedDates.map((c) => c.id),
          provisionClaimIds: i.provisions.map((c) => c.id),
          versionChangeClaimIds: i.versionChanges.map((c) => c.id),
          citationClaimIds: [...i.cites, ...i.citedBy].map((c) => c.id),
          frameworkLinkClaimIds: i.links.map((c) => c.id),
          exactTextSourceIds: i.sources.map((src) => src.id),
        })),
        relatedClaimIds: s.related.map((c) => c.id),
      })),
      linkMatrix: view.linkMatrix.map((row) => ({
        family: row.family,
        cells: row.cells.map((c) => ({
          documentId: c.documentId,
          claimIds: c.claims.map((claim) => claim.id),
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
    limits: [...frameworksLawKeyLimits, ...limits.slice(2)],
  };
  // Snapshot so later caller mutations cannot change the export.
  return JSON.parse(canonicalJson(starter)) as typeof starter;
}

export type FrameworksLawStarter = Awaited<
  ReturnType<typeof frameworksLawStarter>
>;

export function frameworksLawStarterMarkdown(starter: FrameworksLawStarter) {
  const collection = starter.frameworksLaw.definition;
  const claims = new Map(starter.claims.map((c) => [c.id, c]));
  const entities = new Map(starter.entities.map((e) => [e.id, e]));
  const sources = new Map(starter.sources.map((s) => [s.id, s]));
  const name = (id: string) =>
    entities.get(id)?.shortName ?? entities.get(id)?.name ?? id;
  const lines = [
    '# ' + md(collection.title) + ': research starter',
    '',
    `A machine-proposed starting point for independent checking. It is not a finding. Collection ${collection.id}, version ${collection.version}; dataset updated ${starter.dataset.metadata.updatedAt}. Fingerprints and technical notes are at the end.`,
    '',
    '## Key limits',
    '',
    ...[...frameworksLawKeyLimits, ...collection.limits].map(
      (s) => '- ' + md(s),
    ),
    '',
    '## Research question',
    '',
    md(collection.question),
    '',
    ...collection.orientation.flatMap((o) => [
      md(o.text) + ` (claims: ${o.claimIds.join(', ')})`,
      '',
    ]),
    '## Review status of these records',
    '',
    ...reviewStatusSentences(starter.reviewStatus).map((s) => '- ' + md(s)),
    '',
    '## Standings',
    '',
    ...Object.entries(standingLabels).map(
      ([key, label]) =>
        `- ${md(label)}: ${md(standingNotes[key as keyof typeof standingNotes])}`,
    ),
    '',
    '## Timeline',
    '',
    'Computed from the records: one row per text, kind of record and date. Dates are as stored. “Set by the text” marks a date a text fixes for itself; “document record” marks a date field with no claim of its own.',
    '',
    '| Date | Kind | Row | Text | Claims |',
    '| --- | --- | --- | --- | --- |',
    ...starter.frameworksLaw.timeline.map(
      (r) =>
        `| ${r.date} | ${cell([r.dateKind === 'stated' ? 'set by the text' : r.dateKind === 'document' ? 'document record' : r.dateKind, r.basis ?? '', r.scheduled ? 'after the latest check' : ''].filter(Boolean).join(', '))} | ${cell(r.label)} | ${cell(name(r.recordId))} | ${r.claimIds.join(', ') || '–'} |`,
    ),
    '',
    '## What frameworks say about law',
    '',
    'Statements in framework editions that name a text on this page, in the edition’s own words. A link is the framework’s own statement, not evidence of compliance.',
    '',
  ];
  const linked = starter.frameworksLaw.linkMatrix[0]?.cells ?? [];
  lines.push(
    '| Framework | ' +
      linked.map((c) => cell(name(c.documentId))).join(' | ') +
      ' |',
    '| --- | ' + linked.map(() => '---').join(' | ') + ' |',
    ...starter.frameworksLaw.linkMatrix.map(
      (row) =>
        `| ${cell(frameworkLabels[row.family] ?? row.family)} | ` +
        row.cells
          .map((c) =>
            cell(
              c.claimIds
                .map((id) => {
                  const claim = claims.get(id)!;
                  const link = claim.attributes?.commitment?.link;
                  return `${entities.get(claim.subject)?.documentVersion?.label ?? claim.subject}: ${link ? commitmentLinkLabels[link].toLowerCase() : 'names'} (${id})`;
                })
                .join('; ') || '–',
            ),
          )
          .join(' | ') +
        ' |',
    ),
    '',
  );
  for (const section of starter.frameworksLaw.sections) {
    lines.push('## ' + md(section.title), '');
    for (const i of section.instruments) {
      const entity = entities.get(i.documentId)!;
      lines.push(
        '### ' + md(entity.name),
        '',
        `Standing: ${standingLabels[i.standing]}${i.changes.map((c) => '; ' + changeLabels[c.change].toLowerCase()).join('')}. ${md(entity.subtype ?? '')}`,
        '',
        md(entity.description),
        '',
      );
      if (i.exactTextSourceIds.length)
        lines.push(
          'Exact text: ' +
            i.exactTextSourceIds
              .map((id) => {
                const s = sources.get(id)!;
                return `${md(s.title)} <${s.evidenceUrl}>`;
              })
              .join('; '),
          '',
        );
      const groups: [string, string[]][] = [
        ['Standing record', i.standingClaimIds],
        ['Dated record', [...i.lifecycleClaimIds, ...i.statedDateClaimIds]],
        ['Version change', i.versionChangeClaimIds],
        ['Citation', i.citationClaimIds],
        ['Framework link', i.frameworkLinkClaimIds],
      ];
      const shown = new Set<string>();
      for (const [heading, ids] of groups)
        for (const id of ids) {
          if (shown.has(id)) continue;
          shown.add(id);
          lines.push(...claimBlockLines(starter, claims.get(id)!, heading));
        }
      for (const id of i.provisionClaimIds) {
        if (shown.has(id)) continue;
        shown.add(id);
        const claim = claims.get(id)!;
        const kind =
          provisionKindLabels[claim.attributes!.provision!.kind].toLowerCase();
        lines.push(...claimBlockLines(starter, claim, `Provision (${kind})`));
      }
    }
    for (const id of section.relatedClaimIds)
      lines.push(
        ...claimBlockLines(starter, claims.get(id)!, 'Related record'),
      );
  }
  lines.push('## Not covered', '');
  for (const n of starter.notCovered)
    lines.push(
      `- ${notCoveredLabels[n.category]}: ${md(n.text)} (${n.id}${n.claimIds.length ? '; related claims: ' + n.claimIds.join(', ') : ''})`,
    );
  lines.push('', ...closingLines(starter));
  const shownLimits = new Set([
    ...frameworksLawKeyLimits,
    ...collection.limits,
  ]);
  lines.push(
    '## Further limits and technical notes',
    '',
    ...starter.limits
      .filter((s) => !shownLimits.has(s))
      .map((s) => '- ' + md(s)),
    '',
    `Collection: ${collection.id} · version ${collection.version} · ${starter.frameworksLaw.interpretationStatus}`,
    `Collection fingerprint: ${starter.frameworksLaw.fingerprint}`,
    `Dataset: ${md(starter.dataset.metadata.title)} · schema ${starter.dataset.metadata.schemaVersion} · updated ${starter.dataset.metadata.updatedAt}`,
    `Dataset fingerprint: ${starter.dataset.fingerprint}`,
  );
  return lines.join('\n').trimEnd() + '\n';
}
