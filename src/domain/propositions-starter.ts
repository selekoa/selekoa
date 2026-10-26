import type { Claim, Dataset } from './schema';
import { canonicalJson, fingerprint, md } from './references';
import { reviewStatus, reviewStatusSentences } from './review-status';
import { referenceHash } from './deep-links';
import {
  cell,
  closingLines,
  contextOnlyLine,
  keyLimits,
  limits,
  starterRecords,
} from './starter';
import {
  engagementLabels,
  laterContests,
  propositionsView,
  recordDates,
  registerLabels,
  roleLabels,
  stanceLabels,
  tierLabels,
  type PropositionRecord,
  type PropositionsCollection,
} from './propositions';

const supportOrder = { supports: 0, contradicts: 1, context: 2 } as const;

/**
 * A research starter for a propositions collection: the original sources
 * first, in date order, then each proposition's records with the original
 * source and the place in it before the Selekoa identifiers.
 */
export async function propositionsStarter(
  data: Dataset,
  collection: PropositionsCollection,
) {
  const view = propositionsView(data, collection);
  const propositionIds = view.groups.flatMap((g) =>
    g.propositions.map((p) => p.entity.id),
  );
  const records = starterRecords(
    data,
    view.claimIds,
    [...view.documentIds, ...propositionIds],
    view.sourceIds,
  );
  const sources = new Map(records.sources.map((s) => [s.id, s]));
  const brief = (r: PropositionRecord | null) =>
    r && {
      claimId: r.claim.id,
      documentId: r.document.id,
      label: r.label,
      dates: recordDates(r),
      ...(r.term ? { term: r.term } : {}),
    };
  const citations = records.claims.map((claim) => {
    const items = records.evidence
      .filter((e) => e.claimId === claim.id)
      .sort((a, b) => supportOrder[a.support] - supportOrder[b.support]);
    return {
      original: items.map((e) => {
        const s = sources.get(e.sourceId)!;
        return {
          title: s.title,
          authors: s.authors,
          publisher: s.publisher,
          publicationDate: s.publicationDate,
          url: s.evidenceUrl,
          archivedUrl: s.archivedUrl ?? null,
          archivedAt: s.archivedAt ?? null,
          locator: e.locator,
          support: e.support,
          sourceRole: e.sourceRole,
        };
      }),
      selekoa: {
        claimId: claim.id,
        evidenceIds: items.map((e) => e.id),
        sourceIds: items.map((e) => e.sourceId),
        applicationLink: referenceHash({ kind: 'claim', id: claim.id }),
      },
    };
  });
  const starter = {
    format: 'selekoa-research-starter',
    formatVersion: 1,
    dataset: { metadata: data.meta, fingerprint: await fingerprint(data) },
    collection: {
      kind: 'propositions',
      definition: collection,
      fingerprint: await fingerprint(collection),
      interpretationStatus:
        'machine-proposed; not human-reviewed or editorially accepted',
      groups: view.groups.map((g) => ({
        id: g.id,
        label: g.label,
        propositions: g.propositions.map((p) => ({
          id: p.entity.id,
          code: p.proposition.code,
          label: p.entity.name,
          criterion: p.proposition.criterion,
          terms: p.proposition.terms,
          earliestLocated: brief(p.earliest),
          ...(p.earliestWithheld
            ? { earliestLocatedWithheld: p.earliestWithheld }
            : {}),
          earliestLocatedContest: brief(p.earliestContest),
          ...(collection.tiers
            ? {
                earliestLocatedTier2: brief(p.earliestTier2),
                ...(p.earliestTier2Withheld
                  ? { earliestLocatedTier2Withheld: p.earliestTier2Withheld }
                  : {}),
                earliestLocatedContestTier2: brief(p.earliestContestTier2),
              }
            : {}),
          earliestLocatedTerm: brief(p.earliestTerm),
          mostDeveloped: brief(p.mostDeveloped),
          openPremises: p.openPremises,
          records: p.records.map((r) => ({
            claimId: r.claim.id,
            documentId: r.document.id,
            label: r.label,
            stance: r.stance,
            roles: r.roles,
            register: r.register,
            dates: recordDates(r),
            ...(r.qualifier ? { qualifier: r.qualifier } : {}),
            ...(r.missing ? { missing: r.missing } : {}),
            ...(r.engagement ? { engagement: r.engagement } : {}),
            ...(r.retrospective ? { retrospective: r.retrospective } : {}),
            ...(r.tier ? { tier: r.tier } : {}),
            ...(r.conditions ? { conditions: r.conditions } : {}),
            ...(r.estimates ? { estimates: r.estimates } : {}),
            laterContestingClaimIds: laterContests(r, p.records).map(
              (l) => l.claim.id,
            ),
          })),
        })),
      })),
    },
    // Every original source, earliest first: the place to begin checking.
    originalSources: [...records.sources]
      .sort(
        (a, b) =>
          (a.publicationDate ?? '9999').localeCompare(
            b.publicationDate ?? '9999',
          ) || a.id.localeCompare(b.id),
      )
      .map((s) => ({
        sourceId: s.id,
        authors: s.authors,
        title: s.title,
        publisher: s.publisher,
        publicationDate: s.publicationDate,
        version: s.version,
        url: s.evidenceUrl,
        archivedUrl: s.archivedUrl ?? null,
        archivedAt: s.archivedAt ?? null,
      })),
    citations,
    reviewStatus: reviewStatus(data, view.claimIds),
    disagreements: records.disagreements,
    inferences: records.inferences,
    claims: records.claims,
    evidence: records.evidence,
    sources: records.sources,
    entities: records.entities,
    limits: [...keyLimits, ...collection.limits, ...limits.slice(2)],
  };
  // Snapshot so later caller mutations cannot change the export.
  return JSON.parse(canonicalJson(starter)) as typeof starter;
}

export type PropositionsStarter = Awaited<
  ReturnType<typeof propositionsStarter>
>;

/** Markdown link with an angle-bracketed URL, safe inside tables. */
const link = (title: string, url: string) =>
  `[${cell(title)}](<${url.replaceAll('|', '%7C').replaceAll('>', '%3E')}>)`;

export function propositionsStarterMarkdown(starter: PropositionsStarter) {
  const c = starter.collection;
  const definition = c.definition;
  const note = definition.searchNote;
  const claims = new Map(starter.claims.map((x) => [x.id, x]));
  const evidence = new Map(starter.evidence.map((e) => [e.id, e]));
  const citations = new Map(
    starter.citations.map((x) => [x.selekoa.claimId, x]),
  );
  const headline = (
    label: string,
    b: { claimId: string; label: string; dates: string; term?: string },
  ) =>
    `- ${label}: ${md(b.label)} (${b.dates})${b.term ? `, using “${md(b.term)}”` : ''}; claim ${b.claimId}.`;
  const record = (
    r: PropositionsStarter['collection']['groups'][number]['propositions'][number]['records'][number],
  ) => {
    const claim = claims.get(r.claimId) as Claim;
    const citation = citations.get(r.claimId)!;
    const roles = r.roles
      .map((role) => roleLabels[role as keyof typeof roleLabels])
      .join(', ');
    const tier = 'tier' in r && r.tier ? ` · ${tierLabels[r.tier.value]}` : '';
    const lines = [
      `- **${r.dates}.** ${cell(r.label)}. ${stanceLabels[r.stance as keyof typeof stanceLabels]} · ${roles}${tier} · ${registerLabels[r.register as keyof typeof registerLabels]}. ${cell(claim.statement)}`,
    ];
    for (const [i, o] of citation.original.entries()) {
      lines.push(
        `  - Original source: ${[
          link(o.title, o.url),
          md(o.publisher),
          'published ' + (o.publicationDate ?? 'date unknown'),
          'location: ' + cell(o.locator),
          ...(o.archivedUrl
            ? [
                link(
                  'archived copy' +
                    (o.archivedAt ? ', captured ' + o.archivedAt : ''),
                  o.archivedUrl,
                ),
              ]
            : []),
          ...(o.support === 'supports' ? [] : [o.support]),
        ].join(' · ')}`,
      );
      const e = evidence.get(citation.selekoa.evidenceIds[i])!;
      if (e.passageIncluded)
        lines.push(
          `    - ${e.passageType === 'quote' ? 'Quote: “' + cell(e.passage) + '”' : 'Paraphrase: ' + cell(e.passage)}`,
        );
      else lines.push(`    - ${cell(e.passageOmissionReason)}`);
      if (e.contextOnly)
        lines.push(`    - ${cell(contextOnlyLine(e.contextOnly))}`);
    }
    if (r.missing) lines.push(`  - Missing element: ${cell(r.missing)}`);
    if ('tier' in r && r.tier)
      lines.push(`  - ${tierLabels[r.tier.value]}: ${cell(r.tier.basis)}`);
    if ('conditions' in r && r.conditions)
      lines.push(`  - Conditions: ${cell(r.conditions)}`);
    if ('estimates' in r)
      for (const e of r.estimates ?? [])
        lines.push(
          `  - Estimate by ${cell(e.holder)}: ${cell(e.value)}; horizon: ${cell(e.horizon)}; definition: ${cell(e.definition)}${e.conditional ? '; conditional' : ''}${e.conditions ? '; conditions: ' + cell(e.conditions) : ''}`,
        );
    if (r.engagement)
      lines.push(
        `  - ${engagementLabels[r.engagement.kind]}: ${cell(r.engagement.rationale)}`,
      );
    if (r.retrospective)
      lines.push(
        `  - Looking back: ${cell(r.retrospective.note)} The record is dated by the report.`,
      );
    if (r.laterContestingClaimIds.length)
      lines.push(
        `  - Later texts by the same author that contest it: claims ${r.laterContestingClaimIds.join(', ')}`,
      );
    if (r.qualifier) lines.push(`  - Qualifier: ${cell(r.qualifier)}`);
    lines.push(
      `  - Qualification: ${cell(claim.qualification)}`,
      `  - Selekoa: claim ${claim.id} · evidence ${citation.selekoa.evidenceIds.join(', ')} · editorial state: ${claim.editorialState} · ${citation.selekoa.applicationLink}`,
    );
    return lines;
  };
  const lines = [
    '# ' + md(definition.title) + ': research starter',
    '',
    `A machine-proposed starting point for independent checking. It is not a finding and contains no essay or conclusion. Collection ${definition.id}, version ${definition.version}; dataset updated ${starter.dataset.metadata.updatedAt}. Fingerprints and technical notes are at the end.`,
    '',
    'The original sources come first, in date order. Each proposition’s records follow, each citing its original source and the place in it before the Selekoa identifiers.',
    '',
    '## Research question',
    '',
    md(definition.question),
    '',
    md(definition.introduction),
    '',
    '## Key limits',
    '',
    ...[...keyLimits, ...definition.limits.slice(0, 2)].map(
      (s) => '- ' + md(s),
    ),
    '',
    '## Original sources',
    '',
    '| Date | Authors | Title | Publisher | Inspected copy | Archived copy |',
    '| --- | --- | --- | --- | --- | --- |',
    ...starter.originalSources.map(
      (s) =>
        `| ${s.publicationDate ?? 'unknown'} | ${cell(s.authors.join('; '))} | ${cell(s.title)} | ${cell(s.publisher)} | ${link('inspected copy', s.url)} | ${s.archivedUrl ? link('captured ' + (s.archivedAt ?? ''), s.archivedUrl) : ''} |`,
    ),
    '',
    '## How we searched',
    '',
    md(note.scope),
    '',
  ];
  for (const v of note.venues) {
    lines.push(`### ${md(v.period)}`, '');
    for (const item of v.items) lines.push('- ' + md(item));
    lines.push('');
  }
  if (definition.tiers)
    lines.push(
      '### Tiers',
      '',
      `- Tier 1: ${md(definition.tiers[1])}`,
      `- Tier 2: ${md(definition.tiers[2])}`,
      '',
    );
  lines.push('### Methods', '', ...note.methods.map((m) => '- ' + md(m)), '');
  lines.push('### Known gaps', '', ...note.gaps.map((g) => '- ' + md(g)), '');
  lines.push(md(note.corrections), '');
  lines.push(
    '## Review status of these records',
    '',
    ...reviewStatusSentences(starter.reviewStatus).map((s) => '- ' + md(s)),
    '',
  );
  for (const group of c.groups) {
    lines.push(`## ${md(group.label)}`, '');
    for (const p of group.propositions) {
      lines.push(
        `### ${p.code} ${md(p.label)}`,
        '',
        'Criterion: ' + md(p.criterion),
        '',
      );
      if (p.terms.length)
        lines.push(
          'Usual names: ' + p.terms.map((t) => `“${md(t)}”`).join(', '),
          '',
        );
      const tiered = !!definition.tiers;
      if (p.earliestLocated)
        lines.push(
          headline(
            tiered ? 'Earliest located, tier 1' : 'Earliest located',
            p.earliestLocated,
          ),
        );
      else if ('earliestLocatedWithheld' in p && p.earliestLocatedWithheld)
        lines.push(
          `- ${tiered ? 'Earliest located, tier 1' : 'Earliest located'}: not assigned. ` +
            md(p.earliestLocatedWithheld),
        );
      else if (definition.earliestEmpty)
        lines.push('- Earliest located: ' + md(definition.earliestEmpty));
      if ('earliestLocatedTier2' in p && p.earliestLocatedTier2)
        lines.push(
          headline('Earliest located, tier 2', p.earliestLocatedTier2),
        );
      else if (
        'earliestLocatedTier2Withheld' in p &&
        p.earliestLocatedTier2Withheld
      )
        lines.push(
          '- Earliest located, tier 2: not assigned. ' +
            md(p.earliestLocatedTier2Withheld),
        );
      if (p.earliestLocatedContest)
        lines.push(
          headline(
            tiered
              ? 'Earliest located tier-1 text that contests it'
              : 'Earliest located text that contests it',
            p.earliestLocatedContest,
          ),
        );
      if ('earliestLocatedContestTier2' in p && p.earliestLocatedContestTier2)
        lines.push(
          headline(
            'Earliest located tier-2 text that contests it',
            p.earliestLocatedContestTier2,
          ),
        );
      if (p.earliestLocatedTerm)
        lines.push(
          headline('Earliest located use of the name', p.earliestLocatedTerm),
        );
      if (p.mostDeveloped)
        lines.push(headline('Most developed', p.mostDeveloped));
      else if (definition.mostDevelopedEmpty !== null)
        lines.push(
          '- Most developed: ' +
            (definition.mostDevelopedEmpty === undefined
              ? 'none named; this proposition was looked for only before mid-1996.'
              : md(definition.mostDevelopedEmpty)),
        );
      for (const o of p.openPremises)
        lines.push('- Not addressed by any located passage: ' + md(o));
      lines.push('');
      for (const r of p.records) lines.push(...record(r));
      const replaced = definition.corrections.filter(
        (x) => x.propositionId === p.id,
      );
      if (replaced.length) {
        lines.push('', 'Headlines replaced:', '');
        for (const x of replaced)
          lines.push(
            `- ${md(x.replaced)} ${md(x.reason)} (recorded ${x.recordedAt}; claims: ${x.claimIds.join(', ')})`,
          );
      }
      lines.push('');
    }
  }
  lines.push(
    ...closingLines(starter),
    '## Further limits and technical notes',
    '',
    ...starter.limits
      .filter(
        (s, i, all) =>
          ![...keyLimits, ...definition.limits.slice(0, 2)].includes(s) &&
          all.indexOf(s) === i,
      )
      .map((s) => '- ' + md(s)),
    '',
    `Collection: propositions/${definition.id} · version ${definition.version} · ${c.interpretationStatus}`,
    `Collection fingerprint: ${c.fingerprint}`,
    `Dataset: ${md(starter.dataset.metadata.title)} · schema ${starter.dataset.metadata.schemaVersion} · updated ${starter.dataset.metadata.updatedAt}`,
    `Dataset fingerprint: ${starter.dataset.fingerprint}`,
  );
  return lines.join('\n').trimEnd() + '\n';
}
