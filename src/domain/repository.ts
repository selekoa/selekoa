import entities from '../../data/entities.json';
import claims from '../../data/claims.json';
import sources from '../../data/sources.json';
import evidence from '../../data/evidence.json';
import meta from '../../data/meta.json';
import { datasetSchema, type Dataset } from './schema';

export function createRepository(input: unknown) {
  const data: Dataset = datasetSchema.parse(input);
  return {
    data,
    entities: new Map(data.entities.map((e) => [e.id, e])),
    claims: new Map(data.claims.map((c) => [c.id, c])),
    sources: new Map(data.sources.map((s) => [s.id, s])),
    evidence: new Map(data.evidence.map((e) => [e.id, e])),
  };
}

export const repository = createRepository({
  meta,
  entities,
  claims,
  sources,
  evidence,
});
export type Repository = ReturnType<typeof createRepository>;
