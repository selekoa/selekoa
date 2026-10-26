import { z } from 'zod';
import { createRepository } from '../domain/repository';
import { dateOf, timeLabel } from '../domain/query';
import { renderSeedReview, reviewOrderSchema } from './seed-review';

const incrementSchema = z.object({
  newEntityIds: z.array(z.string()),
  newClaimIds: z.array(z.string()),
  newSourceIds: z.array(z.string()),
  newEvidenceIds: z.array(z.string()),
});
const md = (value: string) => value.replace(/[\\`*_{}[\]<>#|]/g, '\\$&');

export function renderPeopleReview(
  input: unknown,
  orderInput: unknown,
  incrementInput: unknown,
  title = 'people and institutional diaspora I',
): string {
  const repository = createRepository(input);
  const order = reviewOrderSchema.parse(orderInput);
  const increment = incrementSchema.parse(incrementInput);
  const ids = order.flatMap((group) => group.claimIds);
  const newIds = new Set(increment.newClaimIds);
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
    throw new Error('People review must include every increment claim.');
  // Reuse the seed renderer's validation, exact evidence fields and blank decisions.
  let text = renderSeedReview(repository.data, order, {
    selection: true,
    title,
  });
  const claims = ids.map((id) => repository.claims.get(id)!);
  const people = new Set<string>();
  for (const group of order) {
    const selected = group.claimIds.map((id) => repository.claims.get(id)!);
    const personClaims = selected.filter(
      (c) => repository.entities.get(c.subject)!.type === 'person',
    );
    if (personClaims.length === 0) continue;
    const person = personClaims[0].subject;
    if (
      personClaims.length !== selected.length ||
      selected.some((c) => c.subject !== person) ||
      people.has(person)
    )
      throw new Error('Each person must have one unmixed review group.');
    people.add(person);
    const chronological = [...selected].sort(
      (a, b) =>
        (dateOf(a) ?? '9999').localeCompare(dateOf(b) ?? '9999') ||
        a.id.localeCompare(b.id),
    );
    if (chronological.some((c, i) => c.id !== selected[i].id))
      throw new Error(
        `Person group must be chronological, with unknown dates last: ${person}`,
      );
    const summary = [
      '**Career path summary — mechanical listing**',
      '',
      'Ordered by the supplied date or first known interval boundary; partial dates do not establish within-year order. Undated records appear last and imply no sequence.',
      '',
      ...selected.map(
        (c) => `- ${md(timeLabel(c))} · \`${c.id}\` · ${md(c.statement)}`,
      ),
      '',
    ].join('\n');
    text = text.replace(
      `## ${md(group.title)}\n`,
      `## ${md(group.title)}\n\n${summary}`,
    );
  }
  const evidence = claims.flatMap((c) =>
    c.evidenceIds.map((id) => repository.evidence.get(id)!),
  );
  const distribution = new Map<string, { all: number; added: number }>();
  for (const c of claims) {
    const count = distribution.get(c.predicate) ?? { all: 0, added: 0 };
    count.all++;
    if (newIds.has(c.id)) count.added++;
    distribution.set(c.predicate, count);
  }
  const coverage = [
    '## Coverage',
    '',
    `- People: ${people.size}.`,
    `- New entities: ${increment.newEntityIds.length} (${increment.newEntityIds.filter((id) => repository.entities.get(id)!.type === 'person').length} people).`,
    `- Claims in this pack: ${claims.length}; new: ${newIds.size}; unchanged context: ${claims.length - newIds.size}.`,
    `- Sources used: ${new Set(evidence.map((e) => e.sourceId)).size}; new source records: ${increment.newSourceIds.length}.`,
    `- Evidence used: ${new Set(evidence.map((e) => e.id)).size}; new evidence records: ${increment.newEvidenceIds.length}.`,
    '',
    '| Predicate | In pack | New |',
    '| --- | ---: | ---: |',
    ...[...distribution.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([p, n]) => `| ${md(p)} | ${n.all} | ${n.added} |`),
    '',
    'Context is carried forward unchanged, not independently rechecked in this increment. Earlier decisions and disagreements remain in their original review packs, including the unresolved Daniela Amodei title disagreement. Blank fields here do not erase prior review work. All additions are machine-checked seeds; these summaries are not human-reviewed biographies.',
    '',
  ].join('\n');
  text = text.replace(
    'grouped by type.',
    'grouped by person, with institutional corridor labels and a final context section.',
  );
  text = text.replace('## Decisions\n', coverage + '\n## Decisions\n');
  text = text.replace(
    /(### \d+ · `([^`]+)`\n)/g,
    (_match, heading: string, id: string) =>
      `${heading}\n**Increment membership:** ${newIds.has(id) ? 'New claim' : 'Unchanged context'}\n`,
  );
  return text;
}
