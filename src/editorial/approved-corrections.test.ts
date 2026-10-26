import { createHash } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import corrections from '../../review/approved-corrections-2026-09-25.json';
import { preSortNameRepository as repository } from './pre-sort-name-data';
import { preCorrectionData, postCorrectionData } from './pre-correction-data';
import { renderSeedReview } from './seed-review';

describe('authorized corrections and limited human inspection', () => {
  it('reconstructs the original collections and allows only ledger-recorded changes', () => {
    for (const key of ['entities', 'claims', 'sources', 'evidence'] as const) {
      expect(
        createHash('sha256')
          .update(JSON.stringify(preCorrectionData[key]))
          .digest('hex'),
      ).toBe(corrections.baselineHashes[key]);
      for (const entry of corrections.changes[key]) {
        expect(repository.data[key].find((row) => row.id === entry.id)).toEqual(
          entry.after,
        );
      }
    }
    expect(postCorrectionData.claims.map((c) => c.id)).toEqual(
      preCorrectionData.claims.map((c) => c.id),
    );
    expect(postCorrectionData.entities).toEqual(preCorrectionData.entities);
  });

  it('records only the two explicitly inspected passages as human-reviewed', () => {
    expect(
      repository.data.evidence
        .filter((e) => e.verification === 'human_reviewed')
        .map((e) => e.id)
        .sort(),
    ).toEqual([
      'evidence-babuschkin-cofounded-xai',
      'evidence-levy-brain-intern-2017-cv',
    ]);
    for (const e of repository.data.evidence.filter(
      (e) => e.verification === 'human_reviewed',
    )) {
      expect(e.reviewer).toBe('futurelightcone');
      expect(e.checkedAt).toBe('2026-09-25');
    }
    expect(
      repository.data.claims
        .filter((c) => c.editorialState === 'accepted')
        .map((c) => c.id),
    ).toEqual(['babuschkin-cofounded-xai']);
    expect(
      repository.claims.get('babuschkin-cofounded-xai')?.qualification,
    ).toContain('not independent confirmation of legal founding history');
    expect(repository.claims.get('levy-brain-intern-2017')).toMatchObject({
      editorialState: 'seed',
      attributes: { role: 'Research intern' },
      time: { kind: 'snapshot', date: '2017' },
    });
    expect(
      repository.evidence.get('evidence-levy-brain-intern-2017')?.verification,
    ).toBe('machine_checked');
    expect(
      repository.evidence.get('evidence-levy-brain-intern-2017-cv')?.passage,
    ).toBe('Google Brain, Mountain View. Research Intern. Summer 2017.');
  });

  it('keeps wording approvals distinct from source review and generates corrected blank seeds', () => {
    const ids = [
      'lineage-kingma-adam',
      'lineage-ba-adam',
      'lineage-superalignment-discusses-rlhf',
    ];
    for (const id of ids) {
      const c = repository.claims.get(id)!;
      expect(c.editorialState).toBe('seed');
      for (const eid of c.evidenceIds)
        expect(repository.evidence.get(eid)?.verification).toBe(
          'machine_checked',
        );
    }
    expect(
      repository.evidence.get('evidence-lineage-kingma-identity'),
    ).toMatchObject({ sourceId: 'source-kingma-bio', support: 'context' });
    const pack = renderSeedReview(
      repository.data,
      [{ title: 'Approved wording', topic: 'ideas', claimIds: ids }],
      { selection: true },
    );
    expect(pack).toContain('Diederik P. Kingma (Durk Kingma)');
    expect(pack).toContain('Jimmy Lei Ba (Jimmy Ba)');
    expect(pack).toContain(
      'current alignment techniques including RLHF will not scale',
    );
    expect(pack.match(/^\*\*Human decision:\*\*$/gm)).toHaveLength(3);
    expect(() =>
      renderSeedReview(
        repository.data,
        [
          {
            title: 'Accepted attribution',
            topic: 'people',
            claimIds: ['babuschkin-cofounded-xai'],
          },
        ],
        { selection: true },
      ),
    ).toThrow();
  });
});
