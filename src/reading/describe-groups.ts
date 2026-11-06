import type {
  PropositionsCollection,
  PropositionsFrame,
} from '../domain/propositions';

/**
 * A collection's groups with their descriptions. The frames that every page
 * holds leave the descriptions out (src/reading/proposition-frames.ts); only
 * the whole collection, which its own page loads, carries them.
 */
export function describeGroups(
  groups: PropositionsFrame['groups'],
  descriptions: Record<string, string>,
): PropositionsCollection['groups'] {
  const unused = Object.keys(descriptions).filter(
    (id) => !groups.some((g) => g.id === id),
  );
  if (unused.length) throw new Error('No such group: ' + unused.join(', '));
  return groups.map((g) => {
    const description = descriptions[g.id];
    if (!description) throw new Error('No description for group ' + g.id);
    return {
      id: g.id,
      label: g.label,
      description,
      propositionIds: g.propositionIds,
    };
  });
}
