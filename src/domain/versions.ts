import type { Claim, Dataset, Entity } from './schema';

export function versionDate(entity: Entity) {
  const v = entity.documentVersion;
  return v?.effectiveAt ?? v?.revisedAt ?? v?.publishedAt;
}

export function frameworkVersions(data: Dataset, family: string) {
  return data.entities
    .filter((e) => e.documentVersion?.family === family)
    .sort(
      (a, b) =>
        (versionDate(a) ?? '').localeCompare(versionDate(b) ?? '') ||
        a.id.localeCompare(b.id),
    );
}

export function versionNeighbours(claims: Claim[], documentId: string) {
  const chain = claims.filter(
    (c) => c.predicate === 'supersedes_document' && c.object.kind === 'entity',
  );
  return {
    predecessors: chain.filter((c) => c.subject === documentId),
    successors: chain.filter(
      (c) => c.object.kind === 'entity' && c.object.entityId === documentId,
    ),
  };
}

export const frameworkLabels: Record<string, string> = {
  'anthropic-rsp': 'Anthropic · Responsible Scaling Policy',
  'deepmind-fsf': 'Google DeepMind · Frontier Safety Framework',
  'openai-preparedness': 'OpenAI · Preparedness Framework',
  'openai-frontier-governance': 'OpenAI · Frontier Governance Framework',
  'xai-faif': 'xAI · Frontier AI Framework',
  'meta-frontier-ai': 'Meta · Frontier AI / Advanced AI Scaling Framework',
  'microsoft-frontier-governance': 'Microsoft · Frontier Governance Framework',
};
export function versionDescription(entity: Entity) {
  const v = entity.documentVersion;
  if (!v) return '';
  return [
    v.label,
    v.publishedAt ? 'Published ' + v.publishedAt : 'Publication date unknown',
    v.effectiveAt
      ? 'Effective ' + v.effectiveAt
      : 'Effective date not established',
    ...(v.revisedAt ? ['Revised ' + v.revisedAt] : []),
  ].join(' · ');
}
