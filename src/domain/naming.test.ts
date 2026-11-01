import { describe, expect, it } from 'vitest';
import { repository } from './repository';
import { namingView } from './naming';
import { technicalHistory } from '../reading/technical-history';

const { data } = repository;

describe('technical history naming collection (schema 2.26)', () => {
  const view = namingView(data, technicalHistory);
  const concepts = view.flatMap((g) => g.concepts);

  it('lists only concepts with a naming criterion, once each', () => {
    const ids = technicalHistory.groups.flatMap((g) => g.conceptIds);
    expect(new Set(ids).size).toBe(ids.length);
    for (const c of concepts) expect(c.concept.naming).toBeDefined();
  });

  it('names an earliest located use, or a withheld role with its reason, where uses meet the criterion', () => {
    for (const c of concepts) {
      if (!c.uses.length) continue;
      expect(Boolean(c.earliest) !== Boolean(c.withheld)).toBe(true);
    }
  });

  it('keeps the adjudicated headlines', () => {
    const earliest = Object.fromEntries(
      concepts.map((c) => [c.concept.id, c.earliest?.claim.id]),
    );
    expect(earliest['th-term-superintelligence']).toBe(
      'th-term-si-schwartz-1986',
    );
    expect(earliest['th-term-deep-learning']).toBe('th-term-dl-nips-2007');
    expect(earliest['th-term-agi']).toBe('th-term-agi-gubrud-1997');
    const agi = concepts.find((c) => c.concept.id === 'th-term-agi')!;
    expect(agi.earliest?.wording).toBe('1998-02-07');
  });

  it('points corrections and attributed statements at stored records', () => {
    const ids = new Set(data.claims.map((c) => c.id));
    for (const c of technicalHistory.corrections)
      for (const id of c.claimIds) expect(ids.has(id), id).toBe(true);
    for (const list of Object.values(technicalHistory.attributed))
      for (const id of list) expect(ids.has(id), id).toBe(true);
    for (const id of Object.keys(technicalHistory.searches))
      expect(
        technicalHistory.groups.some((g) => g.conceptIds.includes(id)),
      ).toBe(true);
  });
});
