import { describe, expect, it } from 'vitest';
import pack from '../../research/china-labs-2/pack.json';
import map from '../../review/china-labs-2-admission-map-2026-10-27.json';
import { repository } from './repository';

const data = repository.data;
const claim = (id: string) => repository.claims.get(id)!;
const evidenceOf = (id: string) =>
  claim(id).evidenceIds.map((e) => repository.evidence.get(e)!);
const admitted = data.claims.filter((c) => c.id.startsWith('c2-'));

describe('the second Chinese institutions collection (admitted 2026-10-27)', () => {
  it('admits every pack record as an unaccepted, machine-checked seed', () => {
    expect(admitted.map((c) => c.id).sort()).toEqual(
      pack.claims.map((c) => c.id).sort(),
    );
    for (const c of admitted) {
      expect(c.editorialState).toBe('seed');
      for (const e of evidenceOf(c.id)) {
        expect(e.verification).toBe('machine_checked');
        expect(e.reviewer).toBeUndefined();
        expect(e.note).toContain('No human editorial review.');
      }
    }
  });

  it('keeps provisions to framework and commitment editions (decision 3)', () => {
    for (const c of admitted.filter((c) => c.predicate === 'states_provision'))
      expect(repository.entities.get(c.subject)!.documentVersion).toBeTruthy();
    for (const [id, publisher] of Object.entries(map.providers)) {
      const c = claim(id);
      expect(c.predicate).toBe('published');
      expect(c.subject).toBe(publisher);
      expect(c.attributes?.provision).toBeUndefined();
    }
  });

  it('records co-named organisations as credited, never as publishers (decision 4)', () => {
    for (const id of ['peng-cheng-laboratory', 'cncert', 'concordia-ai']) {
      const records = data.claims.filter(
        (c) => c.object.kind === 'entity' && c.object.entityId === id,
      );
      expect(records.map((c) => c.predicate)).toEqual(['explicitly_credits']);
      expect(data.claims.some((c) => c.subject === id)).toBe(false);
    }
  });

  it('records the AIIA image as a transcription, with the People’s Daily omission (decision 2)', () => {
    const fromImage = data.evidence.filter(
      (e) =>
        e.sourceId === 'c2-src-caict-wx-aisc-2024' &&
        e.locator.startsWith('Embedded image'),
    );
    expect(fromImage.length).toBeGreaterThan(17);
    for (const e of fromImage) expect(e.note).toMatch(/Transcription of/);
    expect(claim('c2-governance-aiia-aisc-published').qualification).toContain(
      '红队',
    );
    const redTeam = evidenceOf(
      'c2-governance-aiia-aisc-pre-release-red-teaming',
    );
    expect(
      redTeam.find(
        (e) => e.sourceRole === 'primary' && e.passageType === 'quote',
      )?.passage,
    ).toContain('红队测试');
  });

  it('maps each listed legal entity to its group entity by alias (decision 5)', () => {
    for (const c of admitted.filter(
      (c) => c.predicate === 'signed_commitment',
    )) {
      const legal = c.statement.match(/, as ([^,]+),/)![1];
      expect(repository.entities.get(c.subject)!.aliases).toContain(legal);
      expect(c.qualification).toContain(legal);
      expect(c.attributes?.commitment?.stage).toBe('listed');
    }
  });

  it('marks every English rendering of Chinese as machine translation (decision 6)', () => {
    for (const c of admitted)
      for (const e of evidenceOf(c.id))
        if (/[㐀-鿿]/.test(e.passage))
          expect(e.note).toMatch(
            /English machine translation, not verified by a person|No English rendering is given/,
          );
  });

  it('applies the cross-family corrections', () => {
    for (const e of data.evidence.filter((e) => e.id.startsWith('c2-ev-')))
      if (e.sourceId === 'c2-src-tc260-asgf-v2-pdf')
        expect(e.passage).not.toMatch(/\.\.\.|⻛|⻅/);
    expect(
      repository.evidence.get('c2-ev-minimax-prospectus-safety-assessment')!
        .locator,
    ).toContain('printed p. 279');
    expect(claim('c2-bytedance-seed-15-vl-report').time).toMatchObject({
      date: '2025-05-11',
    });
    expect(
      evidenceOf('c2-bytedance-seed-15-vl-report').map((e) => e.passage),
    ).toContain('Date: June 13, 2025');
    expect(claim('c2-moonshot-k2-readme').statement).not.toMatch(/created/);
    expect(claim('c2-moonshot-k3-licence').time.kind).toBe('snapshot');
    expect(claim('c2-moonshot-k3-licence-maas').statement).toContain(
      'affiliates',
    );
    expect(claim('c2-moonshot-k2-report-redteam').qualification).not.toMatch(
      /introduced subjectivity/,
    );
  });
});
