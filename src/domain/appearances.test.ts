import { describe, expect, it } from 'vitest';
import { repository } from './repository';
import { appearances } from './appearances';
import { propositionsView } from './propositions';
import { yudkowskyArguments } from '../reading/yudkowsky-arguments';

const data = repository.data;

describe('appearances: collections that hold a person’s or document’s records', () => {
  it('links Eliezer Yudkowsky to the collection of his arguments', () => {
    const found = appearances(data, 'eliezer-yudkowsky');
    const own = found.find(
      (a) =>
        a.target.kind === 'propositions' &&
        a.target.id === 'yudkowsky-arguments',
    );
    expect(own).toBeDefined();
    expect(own!.texts).toBe(
      propositionsView(data, yudkowskyArguments).claimIds.length,
    );
  });

  it('counts only records that name the entity or texts by the person', () => {
    for (const entity of data.entities.filter(
      (e) => e.type === 'person' || e.type === 'document',
    ))
      for (const a of appearances(data, entity.id)) {
        expect(a.records + a.texts).toBeGreaterThan(0);
        if (entity.type === 'document') expect(a.texts).toBe(0);
      }
  });

  it('returns nothing for an unknown record', () => {
    expect(appearances(data, 'no-such-record')).toEqual([]);
  });
});
