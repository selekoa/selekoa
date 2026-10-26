// Test-only historical view: preserve old packs without rewriting their source data.
import { preFrameworkEvidenceRaw } from './pre-framework-evidence-data';
import lineageII from '../../review/intellectual-lineage-ii-increment.json';
import corrections from '../../review/approved-corrections-2026-09-25.json';
import { createRepository } from '../domain/repository';
import { withoutSortName } from './pre-sort-name-data';

const { entities, claims, sources, evidence } = preFrameworkEvidenceRaw;

function restore<T extends { id: string }>(
  rows: T[],
  changes: { id: string; before: unknown }[],
): T[] {
  return rows.flatMap((row) => {
    const change = changes.find((entry) => entry.id === row.id);
    if (!change) return [structuredClone(row)];
    return change.before === null ? [] : [structuredClone(change.before) as T];
  });
}

export const postCorrectionData = {
  meta: lineageII.baselineMeta,
  entities: entities
    .map(withoutSortName)
    .filter((r) => lineageII.baseline.entities.ids.includes(r.id)),
  claims: claims.filter((r) => lineageII.baseline.claims.ids.includes(r.id)),
  sources: sources.filter((r) => lineageII.baseline.sources.ids.includes(r.id)),
  evidence: evidence.filter((r) =>
    lineageII.baseline.evidence.ids.includes(r.id),
  ),
};
export const preCorrectionData = {
  meta: corrections.baselineMeta,
  entities: restore(postCorrectionData.entities, corrections.changes.entities),
  claims: restore(postCorrectionData.claims, corrections.changes.claims),
  sources: restore(postCorrectionData.sources, corrections.changes.sources),
  evidence: restore(postCorrectionData.evidence, corrections.changes.evidence),
};
export const preCorrectionRepository = createRepository(preCorrectionData);
