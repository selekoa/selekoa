import type { Dataset } from './schema';
import { keyPapers } from '../reading/key-papers';

/**
 * The papers the record cites (decisions 1 and 8 of 2026-10-28), computed
 * from stored records: for each basis-1 work, the dataset documents whose
 * citation records name it, recounted from the dataset at each release; for
 * each basis-2 work, the index's count as retrieved, with its date. Works are
 * listed by the date of their earliest recorded version, never by a count.
 */
export function keyPaperList(data: Dataset) {
  const entities = new Map(data.entities.map((e) => [e.id, e]));
  const citedBy = new Map<string, Set<string>>();
  for (const c of data.claims)
    if (c.predicate === 'cites' && c.object.kind === 'entity')
      citedBy.set(
        c.object.entityId,
        (citedBy.get(c.object.entityId) ?? new Set()).add(c.subject),
      );
  const firstDate = (id: string) =>
    data.sources
      .filter(
        (s) =>
          s.documentId === id || entities.get(id)?.sourceIds.includes(s.id),
      )
      .map((s) => s.publicationDate)
      .filter((d): d is string => !!d)
      .sort()[0] ?? null;
  const entry = (id: string) => {
    const document = entities.get(id);
    if (!document || document.type !== 'document') return null;
    return {
      document,
      date: firstDate(id),
      citingDocuments: [...(citedBy.get(id) ?? [])].sort(),
    };
  };
  const byDate = <T extends { date: string | null }>(a: T, b: T) =>
    (a.date ?? '9999').localeCompare(b.date ?? '9999');
  return {
    checkDate: keyPapers.checkDate,
    basis1: keyPapers.basis1.documentIds
      .map(entry)
      .filter((e) => e !== null)
      .sort(byDate),
    basis2: keyPapers.basis2.papers
      .map((p) => {
        const e = entry(p.documentId);
        return e && { ...e, rank: p.rank, citationCount: p.citationCount };
      })
      .filter((e) => e !== null)
      .sort(byDate),
  };
}
