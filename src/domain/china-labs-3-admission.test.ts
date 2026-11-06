import { describe, expect, it } from 'vitest';
import pack from '../../research/china-labs-3/pack.json';
import corrections from '../../review/corrections-2026-11-06-before-2026-11-06.json';
import map from '../../review/china-labs-3-admission-map-2026-10-31.json';
import part1 from '../../review/china-labs-3-admission-1-before-2026-10-31.json';
import part2 from '../../review/china-labs-3-admission-2-before-2026-10-31.json';
import { repository } from './repository';

const data = repository.data;
const claim = (id: string) => repository.claims.get(id)!;
const evidenceOf = (id: string) =>
  claim(id).evidenceIds.map((e) => repository.evidence.get(e)!);
const added = new Set([...part1.added.claims, ...part2.added.claims]);
const admitted = data.claims.filter((c) => added.has(c.id));

describe('the third Chinese institutions collection (admitted 2026-10-31)', () => {
  it('admits every pack record except the holds, as unaccepted machine-checked seeds', () => {
    expect([...added].sort()).toEqual(
      pack.claims
        .map((c) => c.id)
        .filter((id) => !(id in map.holds))
        .sort(),
    );
    // The corrections of 2026-11-06 admitted the two Tencent statements,
    // held only for a date, once their filing dated them.
    for (const id of Object.keys(map.holds))
      expect(repository.claims.has(id)).toBe(
        corrections.added.claims.includes(id),
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

  it('names one listed entity only in part 2, on a list counted as one entry (decision 2)', () => {
    const listed = data.claims.filter((c) => c.attributes?.listedEntity);
    expect(listed.map((c) => c.id).sort()).toEqual(
      [...part2.added.claims].sort(),
    );
    for (const c of listed) {
      expect(c.predicate).toBe('lists_participants');
      expect(c.attributes?.listing).toEqual({
        count: 1,
        countBasis: 'counted',
      });
    }
    expect(
      claim('c3-governance-cac-genai-list-2024-04-entry-tencent').attributes
        ?.listedEntity,
    ).toBe('shenzhen-tencent-computer-systems');
    expect(claim('c3-baai-bjp-endorsers').predicate).toBe('states_provision');
  });

  it('records investors under the legal names the filings print (decision 4)', () => {
    expect(claim('c3-sensetime-investor-softbank').subject).toBe(
      'svf-sense-singapore',
    );
    expect(claim('c3-iflytek-investor-china-mobile').subject).toBe(
      'china-mobile-communication-co-ltd',
    );
    for (const id of ['softbank-group', 'china-mobile'])
      expect(admitted.some((c) => c.subject === id)).toBe(false);
  });

  it('keeps the Chinese and English wordings of the Beijing principles apart', () => {
    const planning = evidenceOf('c3-baai-bjp-long-term-planning');
    expect(planning.map((e) => e.passage).join(' ')).toContain('潜在影响');
    expect(planning.find((e) => e.passageType === 'quote')!.passage).toContain(
      'potential risks',
    );
    expect(
      planning.find((e) => e.sourceId === 'c3-src-bjp-baai-zh-archive')!
        .support,
    ).toBe('context');
  });

  it('dates Tencent’s annual reports by signature, not by filing (K097–K100)', () => {
    expect(claim('c3-tencent-ar2025-hy-name').time).toMatchObject({
      date: '2026-03-18',
      basis: 'signature',
    });
    for (const id of [
      'c3-tencent-controls-tencent-computer-2025',
      'c3-tencent-legal-form-2025',
      'c3-tencent-ma-huateng-chair-ceo-2026',
    ])
      expect(claim(id).time.note).toContain('not a filing date');
  });

  it('adds StepFun’s own post to four existing role records (decision 8)', () => {
    for (const before of part1.before.claims) {
      const now = claim(before.id);
      expect(now.evidenceIds.slice(1)).toEqual(before.evidenceIds);
      const post = repository.evidence.get(now.evidenceIds[0])!;
      expect(post.sourceId).toBe('c3-src-stepfun-site-bundle');
      expect(post.sourceRole).toBe('primary');
    }
  });

  it('names no record ID in reader-facing text', () => {
    const ids = new Set(data.claims.map((c) => c.id));
    for (const c of admitted)
      for (const text of [c.statement, c.qualification, c.time.note])
        for (const token of text.match(/\b[a-z0-9]+(?:-[a-z0-9]+)+\b/g) ?? [])
          expect(ids.has(token), `${c.id}: ${token}`).toBe(false);
  });
});
