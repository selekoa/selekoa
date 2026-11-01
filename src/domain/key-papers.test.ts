import { describe, expect, it } from 'vitest';
import { repository } from './repository';
import { keyPaperList } from './key-papers';
import { keyPapers } from '../reading/key-papers';

const data = repository.data;

describe('papers the record cites (key papers admission)', () => {
  const list = keyPaperList(data);
  const ids = new Set(data.entities.map((e) => e.id));

  it('names only stored documents, each on one basis', () => {
    const basis1 = keyPapers.basis1.documentIds as readonly string[];
    const basis2: string[] = keyPapers.basis2.papers.map((p) => p.documentId);
    for (const id of [...basis1, ...basis2]) expect(ids.has(id)).toBe(true);
    expect(basis1.filter((id) => basis2.includes(id))).toEqual([]);
    expect(list.basis1).toHaveLength(basis1.length);
    expect(list.basis2).toHaveLength(basis2.length);
  });

  it('recounts citing documents from stored citation records', () => {
    for (const e of list.basis1) {
      const citing = new Set(
        data.claims
          .filter(
            (c) =>
              c.predicate === 'cites' &&
              c.object.kind === 'entity' &&
              c.object.entityId === e.document.id,
          )
          .map((c) => c.subject),
      );
      expect(e.citingDocuments).toEqual([...citing].sort());
      expect(e.citingDocuments).not.toContain(e.document.id);
    }
  });

  it('lists works by date, never by count', () => {
    for (const group of [list.basis1, list.basis2]) {
      const dates = group.map((e) => e.date ?? '9999');
      expect(dates).toEqual([...dates].sort());
    }
  });

  it('keeps LLaMA on basis 2, where the adjudication moved it', () => {
    expect(keyPapers.basis1.documentIds).not.toContain('llama-paper');
    expect(
      keyPapers.basis2.papers.find((p) => p.documentId === 'llama-paper'),
    ).toMatchObject({ rank: 50, citationCount: 22221 });
  });
});
