import { describe, expect, it } from 'vitest';
import { repository } from './repository';
import { appearanceTotals, appearances } from './appearances';
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

describe('appearanceTotals: what a person page leads with', () => {
  it('counts each record once, however many collections hold it', () => {
    for (const id of ['eliezer-yudkowsky', 'dario-amodei']) {
      const found = appearances(data, id);
      const totals = appearanceTotals(data, id);
      expect(totals.collections).toBe(found.length);
      expect(totals.texts).toBeLessThanOrEqual(
        found.reduce((n, a) => n + a.texts, 0),
      );
      expect(totals.records).toBeLessThanOrEqual(
        found.reduce((n, a) => n + a.records, 0),
      );
    }
    // Most of what concerns Yudkowsky is records on his texts.
    expect(appearanceTotals(data, 'eliezer-yudkowsky').texts).toBeGreaterThan(
      appearanceTotals(data, 'eliezer-yudkowsky').records,
    );
    expect(appearanceTotals(data, 'no-such-record')).toEqual({
      collections: 0,
      records: 0,
      texts: 0,
    });
  });
});
