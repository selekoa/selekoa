import type { Claim, Dataset } from './schema';
import { canonicalJson, fingerprint, md } from './references';
import { reviewStatus, reviewStatusSentences } from './review-status';
import { referencePath } from './deep-links';
import { timeLabel } from './query';
import { derivationLabels, resolutionLabels } from './epistemics';
import {
  cell,
  closingLines,
  keyLimits,
  limits,
  starterRecords,
} from './starter';
import { stopCategoryLabels } from './control-structures';
import {
  chronologyKindLabels,
  questionStarterView,
  type QuestionStarterDefinition,
} from './question-starter';

const supportOrder = { supports: 0, contradicts: 1, context: 2 } as const;

/** A research starter for one question page: original sources first. */
export async function questionStarter(
  data: Dataset,
  definition: QuestionStarterDefinition,
) {
  const view = questionStarterView(data, definition);
  const records = starterRecords(data, view.claimIds, view.documentIds, []);
  const sources = new Map(records.sources.map((s) => [s.id, s]));
  // One citation per claim. Each original source comes first, with the
  // place in it; the Selekoa identifiers follow.
  const citations = records.claims.map((claim) => {
    const items = records.evidence
      .filter((e) => e.claimId === claim.id)
      .sort((a, b) => supportOrder[a.support] - supportOrder[b.support]);
    return {
      original: items.map((e) => {
        const s = sources.get(e.sourceId)!;
        return {
          title: s.title,
          publisher: s.publisher,
          publicationDate: s.publicationDate,
          url: s.evidenceUrl,
          archivedUrl: s.archivedUrl ?? null,
          archivedAt: s.archivedAt ?? null,
          language: s.language ?? null,
          locator: e.locator,
          support: e.support,
          sourceRole: e.sourceRole,
        };
      }),
      selekoa: {
        claimId: claim.id,
        evidenceIds: items.map((e) => e.id),
        sourceIds: items.map((e) => e.sourceId),
        applicationLink: referencePath({ kind: 'claim', id: claim.id }),
      },
    };
  });
  const starter = {
    format: 'selekoa-research-starter',
    formatVersion: 1,
    dataset: { metadata: data.meta, fingerprint: await fingerprint(data) },
    question: {
      definition,
      fingerprint: await fingerprint(definition),
      interpretationStatus:
        'machine-proposed; not human-reviewed or editorially accepted',
      orderedClaimIds: view.claimIds,
      chronology: view.chronology.map((c) => ({
        date: c.date,
        basis: c.basis,
        kind: c.kind,
        label: c.label,
        documentId: c.documentId,
        claimId: c.claim.id,
        evidenceIds: c.evidenceIds,
      })),
      sections: view.sections.map((s) => ({
        id: s.id,
        title: s.title,
        description: s.description,
        groups: s.groups.map((g) => ({
          title: g.title,
          claimIds: g.claims.map((c) => c.id),
        })),
      })),
      openQuestions: view.openQuestions,
      setAside: view.setAside,
      cannotAnswer: view.gaps.map((g) => ({
        id: g.id,
        area: g.area,
        text: g.text,
        detail: g.detail,
        claimIds: g.claimIds,
      })),
    },
    citations,
    reviewStatus: reviewStatus(data, view.claimIds),
    disagreements: records.disagreements,
    inferences: records.inferences,
    claims: records.claims,
    evidence: records.evidence,
    sources: records.sources,
    entities: records.entities,
    limits: [
      ...keyLimits,
      ...definition.limits.slice(0, 2),
      ...limits.slice(2),
    ],
  };
  // Snapshot so later caller mutations cannot change the export.
  return JSON.parse(canonicalJson(starter)) as typeof starter;
}

export type QuestionStarterExport = Awaited<ReturnType<typeof questionStarter>>;

/** Markdown link with an angle-bracketed URL, safe inside tables. */
const link = (title: string, url: string) =>
  `[${cell(title)}](<${url.replaceAll('|', '%7C').replaceAll('>', '%3E')}>)`;

function originalLine(
  o: QuestionStarterExport['citations'][number]['original'][number],
) {
  return [
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
    ...(o.support === 'supports'
      ? []
      : [o.support === 'contradicts' ? 'contradicts the claim' : 'context']),
  ].join(' · ');
}

export function questionStarterMarkdown(starter: QuestionStarterExport) {
  const q = starter.question;
  const definition = q.definition;
  const claims = new Map(starter.claims.map((c) => [c.id, c]));
  const citations = new Map(
    starter.citations.map((c) => [c.selekoa.claimId, c]),
  );
  const shownLimits = [...keyLimits, ...definition.limits.slice(0, 2)];
  const record = (claim: Claim) => {
    const citation = citations.get(claim.id)!;
    const lines = [`- **${timeLabel(claim)}.** ${cell(claim.statement)}`];
    for (const [i, o] of citation.original.entries()) {
      lines.push(`  - Original source: ${originalLine(o)}`);
      const e = starter.evidence.find(
        (x) => x.id === citation.selekoa.evidenceIds[i],
      )!;
      if (e.passageIncluded)
        lines.push(
          `    - ${e.passageType === 'quote' ? 'Quote' : 'Paraphrase'}: ${e.passageType === 'quote' ? '“' + cell(e.passage) + '”' : cell(e.passage)}`,
        );
    }
    lines.push(
      `  - Qualification: ${cell(claim.qualification)}`,
      `  - Selekoa: claim ${claim.id} · evidence ${citation.selekoa.evidenceIds.join(', ')} · ${derivationLabels[claim.derivation]} · ${resolutionLabels[claim.resolution]} · editorial state: ${claim.editorialState} · ${citation.selekoa.applicationLink}`,
    );
    return lines;
  };
  const evidence = new Map(starter.evidence.map((e) => [e.id, e]));
  const sources = new Map(starter.sources.map((s) => [s.id, s]));
  // The chronology cites each entry's own evidence: the original, then where.
  const entrySources = (ids: string[]) =>
    ids
      .map((id) => {
        const e = evidence.get(id)!;
        const s = sources.get(e.sourceId)!;
        return `${link(s.title, s.evidenceUrl)} (${cell(e.locator)})`;
      })
      .join('; ');
  const lines = [
    '# ' + md(definition.title) + ': research starter',
    '',
    `A machine-proposed starting point for independent checking. It is not a finding and contains no essay or conclusion. Question ${definition.id}, version ${definition.version}; dataset updated ${starter.dataset.metadata.updatedAt}. Fingerprints and technical notes are at the end.`,
    '',
    'Citations give the original source first: its title, publisher, date and the place in it. Selekoa identifiers follow, so that a citation can point to the original.',
    '',
    '## Research question',
    '',
    md(definition.question),
    '',
    md(definition.scope),
    '',
    '## Key limits',
    '',
    ...shownLimits.map((s) => '- ' + md(s)),
    '',
    '## Review status of these records',
    '',
    ...reviewStatusSentences(starter.reviewStatus).map((s) => '- ' + md(s)),
    '',
    '## Chronology',
    '',
    'One row per dated issue, enactment, entry into force and framework edition that names a commitment or law. Each date keeps its basis. Date order is not a causal sequence.',
    '',
    '| Date | Basis | Event | Document | Original source (location) | Selekoa claim |',
    '| --- | --- | --- | --- | --- | --- |',
    ...q.chronology.map((c) => {
      const source = entrySources(c.evidenceIds);
      return `| ${c.date} | ${cell(c.basis)} | ${cell(chronologyKindLabels[c.kind])} | ${cell(c.label)} | ${source} | ${c.claimId} |`;
    }),
    '',
  ];
  for (const section of q.sections) {
    lines.push('## ' + md(section.title), '', md(section.description), '');
    for (const group of section.groups) {
      lines.push('### ' + md(group.title), '');
      for (const id of group.claimIds) lines.push(...record(claims.get(id)!));
      lines.push('');
    }
    if (section.id === 'open') {
      lines.push('### Open questions', '');
      for (const item of q.openQuestions)
        lines.push(
          `- ${md(item.text)} (${item.id}; claims: ${item.claimIds.join(', ')})`,
        );
      lines.push('', '### Questions set aside', '');
      for (const s of q.setAside)
        lines.push(
          `- ${md(stopCategoryLabels[s.category])}: ${md(s.text)} (${s.id}; claims: ${s.claimIds.join(', ')})`,
        );
      lines.push('');
    }
  }
  lines.push('## What Selekoa cannot answer here', '');
  for (const gap of q.cannotAnswer) {
    const ids = [...gap.claimIds, ...(gap.detail?.claimIds ?? [])];
    lines.push(
      `- **${md(gap.area)}.** ${md(gap.text)}${gap.detail ? ' ' + md(gap.detail.text) : ''}${ids.length ? ` (claims: ${ids.join(', ')})` : ''}`,
    );
  }
  lines.push(
    '',
    ...closingLines(starter),
    '## Further limits and technical notes',
    '',
    ...[...starter.limits, ...definition.limits]
      .filter((s, i, all) => !shownLimits.includes(s) && all.indexOf(s) === i)
      .map((s) => '- ' + md(s)),
    '',
    `Question: ${definition.id} · version ${definition.version} · ${q.interpretationStatus}`,
    `Question fingerprint: ${q.fingerprint}`,
    `Dataset: ${md(starter.dataset.metadata.title)} · schema ${starter.dataset.metadata.schemaVersion} · updated ${starter.dataset.metadata.updatedAt}`,
    `Dataset fingerprint: ${starter.dataset.fingerprint}`,
  );
  return lines.join('\n').trimEnd() + '\n';
}

/**
 * The gap list as candidate research tasks for maintainers. Generated into
 * review/, never applied to data.
 */
export function questionGapsMarkdown(
  data: Dataset,
  definition: QuestionStarterDefinition,
) {
  const view = questionStarterView(data, definition);
  const statement = new Map(data.claims.map((c) => [c.id, c.statement]));
  const lines = [
    `# Candidate research tasks: ${definition.title}`,
    '',
    `Generated by \`pnpm question:gaps\` from question \`${definition.id}\` (version ${definition.version}) against the dataset updated ${data.meta.updatedAt}. Do not edit by hand.`,
    '',
    'Each item is a gap the question page lists under “What Selekoa cannot answer here”, with a candidate task. A task is not authorised work. Any admission follows `docs/editorial-policy.md`: passage-level evidence, version and date qualifications, and separate machine checks. Nothing here is a finding.',
    '',
  ];
  for (const gap of view.gaps) {
    const ids = [...gap.claimIds, ...(gap.detail?.claimIds ?? [])];
    lines.push(
      `## ${gap.area}: \`${gap.id}\``,
      '',
      `Gap shown on the page: ${gap.text}`,
      '',
    );
    if (gap.detail)
      lines.push(`Computed from the records: ${gap.detail.text}`, '');
    lines.push(`Candidate task: ${gap.task}`, '');
    if (ids.length) {
      lines.push('Related records:', '');
      for (const id of ids) lines.push(`- \`${id}\`: ${statement.get(id)}`);
      lines.push('');
    } else
      lines.push(
        'Related records: none. The gap concerns a kind of record that does not exist yet.',
        '',
      );
  }
  return lines.join('\n').trimEnd() + '\n';
}
