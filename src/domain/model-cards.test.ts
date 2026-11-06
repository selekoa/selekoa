import { describe, expect, it } from 'vitest';
import { repository } from './repository';
import { datasetSchema, type Dataset } from './schema';
import { cardDevelopers, cardFacets, isCardCell } from './model-cards';
import {
  cardCellNote,
  cardDate,
  cardDeveloper,
  cardEditions,
  cardSearchRecord,
  modelCardsView,
} from './model-cards-view';
import { frameworkComparison } from '../reading/framework-comparison';
import { wholeCollections } from '../release/whole-collections';
import { isComparisonCell } from './framework-comparison';
import { modelCards } from '../reading/model-cards';
import { modelCardsFrame } from '../reading/model-cards-frame';
import {
  applicationCollections,
  collectionClaimIds,
} from '../release/collections';
import pack1 from '../../research/model-cards/pack.json';
import pack2 from '../../research/model-cards-2/pack.json';
import pack3 from '../../research/model-cards-3/pack.json';
import map1 from '../../review/model-cards-admission-1-map-2026-11-03.json';
import map3 from '../../review/model-cards-admission-3-map-2026-11-05.json';
import map4 from '../../review/model-cards-admission-4-map-2026-11-05.json';
import questions from '../../research/model-cards/questions.json';

const data = repository.data;
const view = modelCardsView(data, modelCards);
const cells = data.claims.filter(isCardCell);
const clone = () => structuredClone(data) as Dataset;
const issues = (d: Dataset) => {
  const result = datasetSchema.safeParse(d);
  return result.success ? [] : result.error.issues.map((i) => i.message);
};
const cellOf = (d: Dataset, id: string) => d.claims.find((c) => c.id === id)!;
// The three admitted packs (parts 1–2, part 3 and part 4, without the cards
// the maintainer held) and each card's document.
const held = new Set<string>(map4.held);
const packCards = [...pack1.cards, ...pack2.cards, ...pack3.cards].filter(
  (c) => !held.has(c.id),
);
const packCells = [...pack1.cells, ...pack2.cells, ...pack3.cells].filter(
  (c) => !held.has(c.card),
);
const entityOf = new Map<string, string>(
  [map1.cards, map3.cards, map4.cards].flatMap((m) =>
    Object.entries(m as Record<string, { entity: string }>).map(
      ([card, plan]) => [card, plan.entity],
    ),
  ),
);

describe('model cards compared (schema 2.30)', () => {
  it('has one record or a recorded reason for every card and question', () => {
    expect(view.rows).toHaveLength(packCards.length);
    expect(view.rows.map((r) => r.id).sort()).toEqual(
      packCards.map((c) => entityOf.get(c.id)).sort(),
    );
    for (const r of view.rows)
      for (const f of cardFacets) expect(view.cell(r.id, f.id)).toBeTruthy();
    const inapplicable = modelCards.notApplicable.reduce(
      (n, g) => n + g.facetIds.length,
      0,
    );
    expect(cells).toHaveLength(
      packCards.length * cardFacets.length - inapplicable,
    );
    // Row order, which interleaves the packs; the same set as the stored cells.
    expect([...view.claimIds].sort()).toEqual(cells.map((c) => c.id).sort());
  });

  it('keeps the adjudicated pack status of every cell, with decision 13a', () => {
    for (const c of packCells) {
      const expected =
        c.card === 'openai-gpt-4v' && c.question === 'Q15'
          ? 'not-found'
          : c.status;
      expect(
        view.cell(entityOf.get(c.card)!, 'MC.' + c.question).status,
        `${c.card} ${c.question}`,
      ).toBe(expected);
    }
  });

  it('defines the pack’s questions, verbatim, outside the framework comparison', () => {
    for (const q of questions.questions) {
      const facet = cardFacets.find((f) => f.id === 'MC.' + q.id)!;
      expect(facet.label).toBe(q.short);
      expect(modelCards.questions[facet.id]).toEqual({
        question: q.question,
        criterion: q.criterion,
      });
    }
    expect(cells.some(isComparisonCell)).toBe(false);
  });

  it('is a release collection, registered by its frame', () => {
    // The application reads the frame; releases record the whole definition.
    const registered = applicationCollections.filter(
      (c) => c.definition.id === modelCards.id,
    );
    expect(registered).toEqual([
      { kind: 'compare', definition: modelCardsFrame },
    ]);
    expect(collectionClaimIds(data, registered[0])).toEqual(view.claimIds);
    expect(
      wholeCollections.find((c) => c.definition.id === modelCards.id)
        ?.definition,
    ).toBe(modelCards);
  });

  it('names the developers of its rows, in row order', () => {
    const developers = view.rows.map((card) => cardDeveloper(data, card));
    expect([...new Map(developers.map((d) => [d.id, d])).values()]).toEqual(
      cardDevelopers.map((d) => ({ ...d })),
    );
  });

  it('reads every recorded absence’s search', () => {
    for (const c of cells.filter(
      (c) => c.predicate === 'provision_not_found',
    )) {
      const search = cardSearchRecord(c);
      expect(search, c.id).not.toBeNull();
      expect(search!.terms, c.id).toMatch(/“/);
    }
  });

  it('links cards to the framework editions they cite', () => {
    const editions = cardEditions(data, frameworkComparison.families);
    expect(editions.get('o1-card-2024')).toEqual(['preparedness-beta-2023']);
    expect(editions.get('claude-opus-4-5-system-card')).toEqual(['rsp-v2-2']);
    // A card that predates its developer's frameworks cites none.
    expect(editions.has('gpt-4v-system-card')).toBe(false);
  });

  it('dates each card as it is dated, never by a commit', () => {
    const date = (id: string) =>
      cardDate(
        data.entities.find((e) => e.id === id)!,
        view.cell(id, 'MC.Q01').claim,
      );
    expect(date('claude-opus-4-5-system-card')).toBe(
      'dated 2025-11 · revised 2025-12-05',
    );
    expect(date('grok-4-7-model-card')).toBe('dated 2026-09-21');
    expect(date('phi-4-model-card')).toBe('No printed date');
  });

  it('keeps each cell’s own note apart from the shared sentences', () => {
    for (const c of cells) {
      const note = cardCellNote(c);
      expect(note.length, c.id).toBeGreaterThan(0);
      expect(note).not.toContain('A card is the developer’s own account');
    }
  });

  it('validates card cells by their own rules', () => {
    const id = 'mc-cell-openai-gpt-4v-q01';
    const wrongKind = clone();
    cellOf(wrongKind, id).attributes!.provision!.kind = 'statement';
    expect(issues(wrongKind)).toContain(
      'A model-card cell carries the disclosure kind',
    );

    const recorded = clone();
    cellOf(recorded, id).attributes!.provision!.facet!.status = 'recorded';
    expect(issues(recorded)).toContain(
      'A stated model-card cell is stated or partly',
    );

    const label = clone();
    cellOf(label, id).object = { kind: 'literal', value: 'Release date' };
    expect(issues(label)).toContain(
      'A model-card cell is named by its question’s label',
    );

    const undated = clone();
    cellOf(undated, id).time = { kind: 'unknown', note: 'No date.' };
    expect(issues(undated)).toContain(
      'A model-card cell is dated by a publication or revision date of the card read, or is undated when the card prints none',
    );

    const twice = clone();
    const copy = structuredClone(cellOf(twice, id));
    copy.id = 'mc-cell-duplicate';
    twice.claims.push(copy);
    expect(issues(twice)).toContain(
      'One model-card cell per card and question: gpt-4v-system-card MC.Q01',
    );

    const disclosure = clone();
    const framework = disclosure.claims.find(isComparisonCell)!;
    framework.attributes!.provision!.kind = 'disclosure';
    expect(issues(disclosure)).toContain(
      'A disclosure belongs only to model-card cells',
    );

    expect(issues(clone())).toEqual([]);
  });
});
