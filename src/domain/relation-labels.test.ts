import { describe, expect, it } from 'vitest';
import { repository } from './repository';
import {
  predicates,
  relationLabel,
  relationLabelOverrides,
} from './predicates';

const claims = repository.data.claims;
const backer = /financial backer/i;

describe('relation labels (maintainer decision of 2026-10-29)', () => {
  it('narrows the label only where the statement names a financial backer', () => {
    for (const id of Object.keys(relationLabelOverrides)) {
      const claim = claims.find((c) => c.id === id)!;
      expect(claim.predicate).toBe('investment_announced');
      expect(claim.statement).toMatch(backer);
      expect(relationLabel(claim)).toBe('named as a financial backer of');
    }
    // Every such statement has the narrower label; others keep the predicate's.
    for (const claim of claims.filter(
      (c) => c.predicate === 'investment_announced',
    ))
      expect(relationLabel(claim)).toBe(
        backer.test(claim.statement)
          ? 'named as a financial backer of'
          : predicates.investment_announced.label,
      );
  });
});
