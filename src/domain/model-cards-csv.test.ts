import { describe, expect, it } from 'vitest';
import { repository } from './repository';
import { cardFacets } from './model-cards';
import { modelCardsCsv, modelCardsCsvRows } from './model-cards-csv';
import { modelCards } from '../reading/model-cards';
import { frameworkComparison } from '../reading/framework-comparison';

const data = repository.data;
const rows = modelCardsCsvRows(data, modelCards, frameworkComparison.families);

describe('model cards compared as CSV', () => {
  it('has one row per card and question, in row order', () => {
    expect(rows).toHaveLength(modelCards.cards.length * cardFacets.length);
    expect(rows.slice(0, cardFacets.length).map((r) => r.question_id)).toEqual(
      cardFacets.map((f) => f.id.slice(3)),
    );
    expect([...new Set(rows.map((r) => r.card_id))]).toEqual(modelCards.cards);
  });

  it('gives each cell its quotation, or its search, or its reason', () => {
    for (const r of rows) {
      if (r.status === 'Stated' || r.status === 'Stated, partly')
        expect(r.quotation, `${r.card_id} ${r.question_id}`).toMatch(/^“/);
      if (r.status === 'Not found in the recorded search')
        expect(r.search_terms, `${r.card_id} ${r.question_id}`).not.toBe('');
      if (r.status === 'Does not apply') {
        expect(r.note).toMatch(/predates/);
        expect(r.record).toBe('');
      }
      expect(r.sha256, r.card_id).toMatch(/^[0-9a-f]{64}$/);
    }
  });

  it('names the edition a card cites and the developer', () => {
    const o1 = rows.find((r) => r.card_id === 'o1-card-2024')!;
    expect(o1.developer).toBe('OpenAI');
    expect(o1.framework_edition).toBe('preparedness-beta-2023');
  });

  it('is RFC 4180 text', () => {
    const text = modelCardsCsv(data, modelCards, frameworkComparison.families);
    expect(text.startsWith('card_id,developer,card,')).toBe(true);
    expect(text.endsWith('\r\n')).toBe(true);
  });
});
