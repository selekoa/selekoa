import type { Claim, Evidence } from './schema';

export const derivationLabels: Record<Claim['derivation'], string> = {
  explicit: 'Stated in source',
  inferred: 'Inferred',
  posed: 'Question posed by Selekoa',
};
export const supportLabels: Record<Evidence['support'], string> = {
  supports: 'Supports the claim',
  contradicts: 'Contradicts the claim',
  context: 'Context only',
};
export const resolutionLabels: Record<Claim['resolution'], string> = {
  supported: 'Supported',
  contested: 'Contested',
  unresolved: 'Unresolved',
};

// Counts and roles describe evidence coverage, never confidence or independence.
export function evidenceSummary(items: Evidence[]): string {
  return (['supports', 'contradicts', 'context'] as const)
    .flatMap((role) => {
      const records = items.filter((e) => e.support === role);
      if (!records.length) return [];
      const roles = (['primary', 'secondary'] as const).filter((r) =>
        records.some((e) => e.sourceRole === r),
      );
      const count = new Set(records.map((e) => e.sourceId)).size;
      const label = {
        supports: 'Supporting evidence',
        contradicts: 'Counterevidence',
        context: 'Context',
      }[role];
      return [
        `${label}: ${roles.join(' + ')} · ${count} source${count === 1 ? '' : 's'}`,
      ];
    })
    .join('; ');
}
