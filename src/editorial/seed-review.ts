import { versionDescription, versionNeighbours } from '../domain/versions';
import { createHash } from 'node:crypto';
import { z } from 'zod';
import { createRepository } from '../domain/repository';
import { topics, predicates } from '../domain/predicates';
import { timeLabel } from '../domain/query';
import { evidenceSummary } from '../domain/epistemics';

export const reviewOrderSchema = z
  .array(
    z.strictObject({
      title: z.string().min(1),
      topic: z.enum(topics).optional(),
      claimIds: z.array(z.string().min(1)).min(1),
    }),
  )
  .min(1);
const md = (value: string) =>
  value.replace(/[\\`*_{}[\]<>#|]/g, '\\$&').replaceAll('\n', '\n\n');
const field = (label: string, value: string) => `**${label}:** ${md(value)}\n`;

// Refuse every differing existing file, including edits to fields outside decisions.
// The tool has no overwrite or decision-import option.
export function assertSafeReviewOutput(
  existing: string | undefined,
  generated: string,
) {
  if (existing !== undefined && existing !== generated)
    throw new Error(
      'Existing review differs. Preserve your working copy and choose a new --output review/<name>.md. Nothing was overwritten; no decisions were applied.',
    );
}

export function renderSeedReview(
  input: unknown,
  orderInput: unknown,
  options: { selection?: boolean; title?: string } = {},
): string {
  const repository = createRepository(input);
  const { data } = repository;
  const order = reviewOrderSchema.parse(orderInput);
  const ids = order.flatMap((group) => group.claimIds);
  const seeds = data.claims.filter(
    (c) =>
      c.editorialState === 'seed' && (!options.selection || ids.includes(c.id)),
  );
  if (
    new Set(ids).size !== ids.length ||
    ids.length !== seeds.length ||
    seeds.some((c) => !ids.includes(c.id))
  )
    throw new Error(
      'Review order must contain every requested seed claim exactly once, without unknown or accepted IDs. Update the explicit order deliberately.',
    );
  for (const group of order)
    for (const id of group.claimIds)
      if (group.topic && repository.claims.get(id)?.topic !== group.topic)
        throw new Error(`Wrong review group for ${id}`);

  const fingerprint = createHash('sha256')
    .update(JSON.stringify(data))
    .digest('hex');
  const out = [
    `# Selekoa — ${md(options.title ?? 'seed claim review')}`,
    '',
    `${seeds.length} claims, grouped by type. These are research seeds; machine checks are not human review. This document is an editorial working aid and is never loaded by the application.`,
    '',
    `Schema: ${data.meta.schemaVersion}. Dataset date: ${data.meta.updatedAt}. Dataset fingerprint: \`${fingerprint}\`.`,
    '',
    'Claim wording, qualifications and passages below come from the validated dataset. Quotes and paraphrases are labelled separately. Source roles are relative to each claim. A primary source is not a truth rank, and multiple sources do not guarantee independence.',
    '',
    '## Decisions',
    '',
    '- **YES:** The evidence supports the claim as scoped and worded.',
    '- **EDIT:** The underlying proposition appears supported but wording, temporal scope, amount, role, qualification, entity identity or similar detail should change.',
    '- **RESEARCH MORE:** Available evidence is insufficient, ambiguous, mutable, conflicting, or needs another source.',
    '- **REJECT:** The proposition is materially unsupported or wrong.',
    '',
    'Enter exactly one of YES, EDIT, RESEARCH MORE or REJECT in each Human decision field when you have reviewed it. Leave unreviewed fields empty. Use Notes for reasoning, replacement wording and source links. Writing YES here does not change application data or mark evidence human_reviewed.',
    '',
    'Return this completed file, or decisions and notes keyed by claim ID, with an explicit request to apply them. Use a pseudonymous reviewer identity. Regeneration refuses to overwrite any differing working copy. No decisions are imported automatically.',
    '',
    '## Five questions',
    '',
    '1. Does the source support the exact claim?',
    '2. Is the claim scoped correctly in time, amount, role and certainty?',
    '3. Are the entities correctly identified?',
    '4. Is the source appropriate evidence for this proposition?',
    '5. Is there an obvious correction, contradiction or later development that changes how this historical claim should be represented?',
    '',
    '## Reading the dimensions',
    '',
    'Derivation explicit means a source states the proposition; inferred means reasoning from evidence and requires a rationale. Resolution supported means recorded support for the scoped claim, not objective truth or absence of undiscovered contradiction. Contested retains supporting and contradictory evidence. Unresolved records an open question. Editorial state and evidence verification are separate.',
    '',
  ];
  let number = 0;
  for (const group of order) {
    out.push(`## ${md(group.title)}\n`);
    for (const id of group.claimIds) {
      const claim = repository.claims.get(id)!;
      const subject = repository.entities.get(claim.subject)!;
      const object =
        claim.object.kind === 'entity'
          ? `${repository.entities.get(claim.object.entityId)!.name} [${claim.object.entityId}]`
          : `${String(claim.object.value)} ${claim.object.unit ?? ''} [literal; no graph edge]`;
      const evidence = claim.evidenceIds.map((id) =>
        repository.evidence.get(id)!,
      );
      out.push(
        `### ${String(++number).padStart(2, '0')} · \`${claim.id}\`\n`,
        field('Statement', claim.statement),
        field(
          'Relation',
          `${subject.name} [${subject.id}] → ${claim.predicate} (${predicates[claim.predicate].label}) → ${object}`,
        ),
        field('Relation semantics', predicates[claim.predicate].description),
        field(
          'Temporal scope',
          `${timeLabel(claim)}; kind: ${claim.time.kind}`,
        ),
        field('Temporal qualification', claim.time.note),
        field('Qualification / scope limits', claim.qualification),
        field(
          'Epistemic dimensions',
          `derivation: ${claim.derivation}; resolution: ${claim.resolution}`,
        ),
        field('Editorial state', claim.editorialState),
        field('Claim recorded', claim.recordedAt),
        field('Evidence coverage', evidenceSummary(evidence)),
      );
      for (const endpoint of [
        subject,
        claim.object.kind === 'entity'
          ? repository.entities.get(claim.object.entityId)
          : undefined,
      ]) {
        if (!endpoint?.documentVersion) continue;
        out.push(
          field(
            'Document version',
            endpoint.id + ': ' + versionDescription(endpoint),
          ),
        );
        out.push(
          field(
            'Version date qualification',
            endpoint.documentVersion.dateNote,
          ),
        );
        const neighbours = versionNeighbours(data.claims, endpoint.id);
        out.push(
          field(
            'Document predecessor / successor',
            'Predecessors: ' +
              (neighbours.predecessors
                .map((c) =>
                  c.object.kind === 'entity' ? c.object.entityId : '',
                )
                .join(', ') || 'none recorded') +
              '; successors: ' +
              (neighbours.successors.map((c) => c.subject).join(', ') ||
                'none recorded'),
          ),
        );
      }
      if (claim.attributes?.changeBasis)
        out.push(
          field(
            'Change evidence mode',
            claim.attributes.changeBasis === 'document_comparison'
              ? 'INFERRED DOCUMENT COMPARISON — not an explicit publisher change statement; inspect BOTH version sources'
              : claim.attributes.changeBasis === 'changelog'
                ? 'Official version-specific changelog'
                : 'Explicit publisher change statement',
          ),
        );
      if (claim.inferenceRationale)
        out.push(
          field('Inference rationale / premises', claim.inferenceRationale),
        );
      if (claim.attributes?.transactionType) {
        const a = claim.attributes;
        out.push(
          field('Transaction type', a.transactionType!),
          field('Transaction stage', a.transactionStage!),
          field('Relationship context', a.relationshipContext!),
          field(
            'Amount / bound / currency / scope',
            a.amount
              ? [
                  a.amount.bound,
                  a.amount.value,
                  a.amount.currency,
                  a.amount.scope,
                ].join(' · ')
              : 'Not specified',
          ),
          field(
            'Quantity / bound / unit',
            a.quantity
              ? [a.quantity.bound, a.quantity.value, a.quantity.unit].join(
                  ' · ',
                )
              : 'Not specified',
          ),
        );
        if (a.period) out.push(field('Period / expected timing', a.period));
        if (a.conditions) out.push(field('Conditions', a.conditions));
      }
      if (claim.attributes)
        out.push(
          '**Structured attributes:**\n',
          '```json\n' + JSON.stringify(claim.attributes, null, 2) + '\n```\n',
        );
      for (const [index, e] of evidence.entries()) {
        const source = repository.sources.get(e.sourceId)!;
        out.push(
          `#### Evidence ${index + 1} · \`${e.id}\`\n`,
          field('Source title', source.title),
          field('Source ID', source.id),
          field(
            'Publisher / authors',
            `${source.publisher} / ${source.authors.join('; ')}`,
          ),
          field('Source role relative to this claim', e.sourceRole),
          field('Evidence role', e.support),
          field(
            e.passageType === 'quote'
              ? 'Exact source excerpt'
              : 'Paraphrase (not a quotation)',
            e.passage,
          ),
          field('Locator', e.locator),
          `**Canonical source:** [${md(source.title)}](${source.canonicalUrl})\n`,
          source.evidenceUrl === source.canonicalUrl
            ? '**Evidence URL:** Same as canonical source.\n'
            : `**Evidence URL:** [Inspected version](${source.evidenceUrl})\n`,
          field(
            'Source publication date',
            source.publicationDate ?? 'Unknown; not inferred from access date',
          ),
          field('Source / version description', source.version),
          field(
            'Version date',
            source.versionDate ?? 'Not separately recorded',
          ),
          field('Source accessed', source.accessedAt),
          field('Evidence verification', e.verification),
          field(
            e.verification === 'machine_checked'
              ? 'Machine-check date'
              : 'Human-check date',
            e.checkedAt,
          ),
          field('Verification note', e.note),
        );
        if (e.reviewer) out.push(field('Reviewer', e.reviewer));
        if (source.archivedUrl)
          out.push(`**Archive:** [Archived source](${source.archivedUrl})\n`);
      }
      out.push('**Human decision:**\n', '**Notes:**\n', '---\n');
    }
  }
  return out.join('\n').trimEnd() + '\n';
}
