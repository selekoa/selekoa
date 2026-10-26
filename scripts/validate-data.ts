import { repository } from '../src/domain/repository';
const { entities, claims, sources, evidence } = repository.data;
console.log(
  `Valid: ${entities.length} entities, ${claims.length} claims, ${sources.length} sources, ${evidence.length} evidence records.`,
);
