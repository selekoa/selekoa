import { z } from 'zod';
import { createRepository } from '../domain/repository';
import { renderSeedReview, reviewOrderSchema } from './seed-review';

const incrementSchema = z.object({
  newEntityIds: z.array(z.string()),
  newClaimIds: z.array(z.string()),
  newSourceIds: z.array(z.string()),
  newEvidenceIds: z.array(z.string()),
});
const md = (value: string) => value.replace(/[\\`*_{}[\]<>#|]/g, '\\$&');

export function renderLineageReview(
  input: unknown,
  orderInput: unknown,
  incrementInput: unknown,
  title = 'intellectual lineage I — documented transmission',
): string {
  const repository = createRepository(input);
  const order = reviewOrderSchema.parse(orderInput);
  const increment = incrementSchema.parse(incrementInput);
  const ids = order.flatMap((g) => g.claimIds);
  for (const [key, collection] of [
    ['newEntityIds', repository.entities],
    ['newClaimIds', repository.claims],
    ['newSourceIds', repository.sources],
    ['newEvidenceIds', repository.evidence],
  ] as const) {
    if (
      new Set(increment[key]).size !== increment[key].length ||
      increment[key].some((id) => !collection.has(id))
    )
      throw new Error(`Invalid increment IDs: ${key}`);
  }
  if (increment.newClaimIds.some((id) => !ids.includes(id)))
    throw new Error('Lineage review must include every increment claim.');
  let text = renderSeedReview(repository.data, order, {
    selection: true,
    title,
  });
  const selected = ids.map((id) => repository.claims.get(id)!);
  const evidence = selected.flatMap((c) =>
    c.evidenceIds.map((id) => repository.evidence.get(id)!),
  );
  const counts = new Map<string, number>();
  for (const id of increment.newClaimIds) {
    const p = repository.claims.get(id)!.predicate;
    counts.set(p, (counts.get(p) ?? 0) + 1);
  }
  const coverage = [
    '## Coverage',
    '',
    `- Lineages: ${order.length}.`,
    `- New entities: ${increment.newEntityIds.length}.`,
    `- New claims: ${increment.newClaimIds.length}; unchanged context: ${ids.length - increment.newClaimIds.length}; total in pack: ${ids.length}.`,
    `- New sources: ${increment.newSourceIds.length}; sources used in pack: ${new Set(evidence.map((e) => e.sourceId)).size}.`,
    `- New evidence: ${increment.newEvidenceIds.length}; evidence used in pack: ${new Set(evidence.map((e) => e.id)).size}.`,
    '',
    '| Predicate | New claims |',
    '| --- | ---: |',
    ...[...counts]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([p, n]) => `| ${md(p)} | ${n} |`),
    '',
    'Mechanical links below are directed claims, not narrative transmission paths. Shared concepts, co-authors and institutional context do not establish transmission. Work-level citation targets do not identify the revision read by the citing author. Existing context retains its original evidence check and prior review history; new blank fields do not erase earlier decisions.',
    '',
  ].join('\n');
  text = text.replace('grouped by type.', 'grouped by lineage.');
  text = text.replace('## Decisions\n', coverage + '\n## Decisions\n');
  for (const group of order) {
    const edges = group.claimIds
      .map((id) => repository.claims.get(id)!)
      .filter(
        (c) =>
          repository.entities.get(c.subject)!.type === 'document' &&
          c.object.kind === 'entity',
      );
    const lines = edges.map((c) => {
      const target =
        c.object.kind === 'entity'
          ? repository.entities.get(c.object.entityId)!.name
          : '';
      return `${repository.entities.get(c.subject)!.name} — ${c.predicate} → ${target} [${c.id}]`;
    });
    const heading = `## ${md(group.title)}\n`;
    text = text.replace(
      heading,
      heading +
        '\n**Mechanical documentary links:**\n\n```text\n' +
        lines.join('\n') +
        '\n```\n',
    );
  }
  const newIds = new Set(increment.newClaimIds);
  return text.replace(
    /(### \d+ · `([^`]+)`\n)/g,
    (_match, heading: string, id: string) =>
      `${heading}\n**Increment membership:** ${newIds.has(id) ? 'New claim' : 'Unchanged context'}\n`,
  );
}
