// Test-only historical view: schema 2.6 added only person sortName values
// (an authorised cataloguing field, not a claim). Removing them and restoring
// the 2.5 label reproduces the earlier dataset, so baseline hashes and packs
// stay checkable without rewriting their stored references.
import { createRepository } from '../domain/repository';
import type { Dataset } from '../domain/schema';
import { preFrameworkEvidenceRaw } from './pre-framework-evidence-data';

export function withoutSortName<T extends object>(row: T): T {
  const copy = structuredClone(row) as T & { sortName?: string };
  delete copy.sortName;
  return copy;
}

// Built on the pre-2.7 view, so later authorised changes stay reversed too.
const pre27 = createRepository(preFrameworkEvidenceRaw).data;
export const preSortNameData: Dataset = {
  ...pre27,
  meta: { ...pre27.meta, schemaVersion: '2.5' },
  entities: pre27.entities.map(withoutSortName),
};
export const preSortNameRepository = createRepository(preSortNameData);

/** Raw stored rows as they were before schema 2.6. */
export function preSortNameRaw(name: string) {
  const rows = JSON.parse(
    JSON.stringify(
      preFrameworkEvidenceRaw[name as keyof typeof preFrameworkEvidenceRaw],
    ),
  );
  if (name === 'meta') return { ...rows, schemaVersion: '2.5' };
  return name === 'entities' ? rows.map(withoutSortName) : rows;
}
