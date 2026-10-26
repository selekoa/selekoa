import { describe, expect, it } from 'vitest';
import { repository } from './repository';
import { documentRecord, documentRelations } from './document-record';
import { familyHistory } from './document-history';
import { relatedTo } from './query';
import { resolveReference } from './deep-links';

const data = repository.data;
const documents = data.entities.filter((e) => e.type === 'document');

describe('document record projection', () => {
  it('returns null for anything but a document', () => {
    expect(documentRecord(data, 'jan-leike')).toBeNull();
    expect(documentRecord(data, 'missing')).toBeNull();
  });

  it('places every related claim on the page, using original claim objects', () => {
    for (const document of documents) {
      const record = documentRecord(data, document.id)!;
      const shown = [
        ...record.issued,
        ...record.authored,
        ...record.supported,
        ...record.relations.flatMap((r) => r.claims),
        ...(record.edition
          ? [
              ...record.edition.issued,
              ...record.edition.replaces,
              ...record.edition.replacedBy,
              ...record.edition.changes,
              ...record.edition.provisions,
              ...record.edition.absences,
              ...record.edition.assessments,
            ]
          : []),
        ...record.laterChanges,
        ...record.other,
      ];
      for (const c of shown) expect(c).toBe(repository.claims.get(c.id));
      expect(new Set(shown.map((c) => c.id))).toEqual(
        new Set(
          data.claims.filter((c) => relatedTo(c, document.id)).map((c) => c.id),
        ),
      );
    }
  });

  it('keeps each relation separate and directional', () => {
    const record = documentRecord(data, 'human-preferences-paper')!;
    const ids = (id: string) =>
      record.relations.find((r) => r.id === id)!.claims.map((c) => c.id);
    expect(ids('cites')).toEqual(['lineage-preferences-cites-trpo']);
    expect(ids('uses-method-from')).toEqual(['lineage-preferences-uses-trpo']);
    expect(ids('cited-by').sort()).toEqual(
      [
        'atlas-feedback-cites-paper',
        'lineage-instruct-cites-preferences',
        'lineage-summaries-cites-preferences',
      ].sort(),
    );
    expect(record.authored).toHaveLength(3);
    expect(record.family).toBeNull();
    expect(record.claimDates).toEqual([
      {
        date: '2017-06-12',
        basis: 'publication',
        claimIds: record.authored.map((c) => c.id),
      },
    ]);
    expect(new Set(documentRelations.map((r) => r.id)).size).toBe(
      documentRelations.length,
    );
  });

  it('reuses the document-history family projection for versions', () => {
    const record = documentRecord(data, 'rsp-v2-0')!;
    expect(record.family).toEqual(familyHistory(data, 'anthropic-rsp'));
    expect(record.edition!.replaces.map((c) => c.id)).toEqual([
      'supersedes-rsp-2-0',
    ]);
    expect(record.laterChanges.map((c) => c.id)).toEqual([
      'provchange-rsp-v2-1-ceo-rso-decision-board-ltbt-informed',
      'rsp-v2-1-rd-thresholds',
    ]);
    // The edition's own references to external commitments (week 4c) are
    // the only relations outside its family history.
    expect(record.other.map((c) => c.id)).toEqual([
      'cm-link-rsp-v2-0-seoul',
      'cm-link-rsp-v2-0-wh',
    ]);
  });

  it('resolves person and document addresses only for entities of that type', () => {
    expect(resolveReference('#/document/rsp-v2-0', data).target).toEqual({
      kind: 'document',
      id: 'rsp-v2-0',
    });
    for (const hash of [
      '#/document/jan-leike',
      '#/person/rsp-v2-0',
      '#/person/missing',
      '#/person/jan-leike?section=a',
      '#/person/jan-leike?inspect=missing',
    ])
      expect(resolveReference(hash, data).notice).toContain(
        'does not match any record',
      );
  });
});
