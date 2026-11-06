import { describe, expect, it } from 'vitest';
import { repository } from './repository';
import { datasetSchema, type Dataset } from './schema';
import {
  isLawCell,
  lawFacetById,
  lawFacetKey,
  lawFacets,
} from './law-questions';
import {
  checkLawsCompared,
  lawsComparedView,
  lawCellNote,
} from './law-comparison-view';
import { lawsComparedCsv, lawsComparedCsvRows } from './law-comparison-csv';
import {
  comparisonFacets,
  comparisonKey,
  facetById,
} from './framework-comparison';
import { cardFacetById, cardFacets } from './model-card-facets';
import { cardFacetKey } from './model-cards';
import { lawsCompared } from '../reading/laws-compared';
import { lawsComparedFrame } from '../reading/laws-compared-frame';
import { lawsComparedEarlierTexts } from '../reading/laws-compared-page';
import {
  applicationCollections,
  collectionClaimIds,
} from '../release/collections';
import { wholeCollections } from '../release/whole-collections';
import { frameworksLawView } from './frameworks-law';
import { frontierFrameworksAndLaw as frameworksAndLaw } from '../reading/frameworks-and-law';
import pack from '../../research/laws-compared/pack.json';
import questions from '../../research/laws-compared/questions.json';
import map from '../../review/laws-compared-admission-2-map-2026-11-05.json';

const data = repository.data;
const view = lawsComparedView(data, lawsCompared);
const cells = data.claims.filter(isLawCell);
const clone = () => structuredClone(data) as Dataset;
const issues = (d: Dataset) => {
  const result = datasetSchema.safeParse(d);
  return result.success ? [] : result.error.issues.map((i) => i.message);
};
const rows = map.rows as Record<string, string>;
const cellAt = (d: Dataset, id: string) => d.claims.find((c) => c.id === id)!;

describe('laws compared (schema 2.31)', () => {
  it('has a record, a cited record or a recorded reason for every cell of the pack', () => {
    expect(pack.cells).toHaveLength(150);
    for (const c of pack.cells) {
      const cell = view.cell(rows[c.instrument], 'L.' + c.question);
      // Illinois Q05 was held and decided partly (decision 1a of 2026-11-05).
      expect(cell.status).toBe(c.status);
    }
    expect(cells).toHaveLength(150 - 5 - 1);
    expect(
      view.claimIds
        .filter(
          (id) =>
            !lawsCompared.columns.some((c) => c.standingClaimIds.includes(id)),
        )
        .sort(),
    ).toEqual(
      [...cells.map((c) => c.id), 'lc-ny-ch699-effect-computed'].sort(),
    );
  });

  it('puts the pack’s questions and criteria verbatim, with labels and non-colliding identifiers', () => {
    for (const q of questions.questions) {
      const f = lawFacetById('L.' + q.id)!;
      expect(f.label).toBe(q.short);
      expect(lawsCompared.questions[f.id]).toEqual({
        question: q.question,
        criterion: q.criterion,
      });
    }
    expect(lawsCompared.partlyRules).toEqual(questions.partlyRules);
    for (const f of lawFacets) {
      expect(facetById(f.id)).toBeUndefined();
      expect(cardFacetById(f.id)).toBeUndefined();
      expect(comparisonFacets.map((c) => comparisonKey(c.id))).not.toContain(
        lawFacetKey(f.id),
      );
      expect(cardFacets.map((c) => cardFacetKey(c.id))).not.toContain(
        lawFacetKey(f.id),
      );
    }
  });

  it('orders columns by group, with the revoked and announced texts last', () => {
    expect(
      view.groups.flatMap((g) => g.columns.map((c) => c.column.id)),
    ).toEqual(lawsCompared.columns.map((c) => c.id));
    expect(view.groups.at(-1)!.heading).toBe(
      'Revoked, or rescission announced',
    );
    expect(view.groups.at(-1)!.columns.map((c) => c.column.id)).toEqual([
      'us-eo14110',
      'us-bis-ifr',
    ]);
    // The frame shared code reads is the definition's.
    expect(
      lawsCompared.columns.map(({ id, family, texts, standingClaimIds }) => ({
        id,
        family,
        texts,
        standingClaimIds,
      })),
    ).toEqual(lawsComparedFrame.columns);
  });

  it('shows New York as one column, amended by default, with the 2025 text as an earlier version', () => {
    const ny = view.columns.find((c) => c.column.id === 'ny-raise-act')!;
    expect(ny.texts).toEqual([
      'ny-raise-act-chapter-699-2025',
      'new-york-raise-act-chapter-96-2026',
    ]);
    expect(ny.text).toBe('new-york-raise-act-chapter-96-2026');
    const earlier = lawsComparedView(data, lawsCompared, [
      'ny-raise-act-chapter-699-2025',
    ]).columns.find((c) => c.column.id === 'ny-raise-act')!;
    expect(earlier.text).toBe('ny-raise-act-chapter-699-2025');
    expect(earlier.earlier).toBe(true);
    // The address resolver's list of earlier texts is the frame's.
    expect(lawsComparedEarlierTexts).toEqual(
      lawsComparedFrame.columns.flatMap((c) => c.texts.slice(0, -1)),
    );
    // Q11 of the 2025 text cites the effect rule with its computed date.
    const q11 = view.cell('ny-raise-act-chapter-699-2025', 'L.Q11');
    expect(q11.claim!.id).toBe('lc-ny-ch699-effect-computed');
    expect(q11.claim!.attributes!.provision!.computed).toBe(true);
  });

  it('records every column’s standing from data, never the announcement as a rescission', () => {
    expect(checkLawsCompared(data, lawsCompared)).toEqual([]);
    for (const col of view.columns)
      expect(col.standing.length).toBeGreaterThan(0);
    const bis = view.columns.find((c) => c.column.id === 'us-bis-ifr')!;
    const announced = data.claims.find(
      (c) => bis.standing.includes(c.id) && c.predicate === 'revoked',
    )!;
    expect(announced.attributes?.activityStage).toBe('announced');
  });

  it('marks paraphrased cells and keeps translations beside Chinese quotations', () => {
    const paraphrased = cells
      .filter((c) => c.attributes!.provision!.facet!.paraphrased)
      .map((c) => c.id)
      .sort();
    expect(paraphrased).toEqual([
      'lc-cell-ca-sb53-q05',
      'lc-cell-ca-sb53-q06',
      'lc-cell-ca-sb53-q10',
      'lc-cell-eu-ai-act-q09',
      'lc-cell-il-aisma-q10',
      'lc-cell-ny-ch96-q13',
      'lc-cell-ny-ch96-q14',
      'lc-cell-us-bis-ifr-q14',
    ]);
    const chinese = data.evidence.filter(
      (e) => e.id.startsWith('lc-ev-cn-') && e.passageType === 'quote',
    );
    expect(chinese.length).toBeGreaterThan(0);
    for (const e of chinese) expect(e.translation).toBeTruthy();
  });

  it('rejects a law cell with another kind, key, label or a second cell, and a stray paraphrase mark', () => {
    const id = 'lc-cell-ca-sb53-q01';
    let d = clone();
    cellAt(d, id).attributes!.provision!.kind = 'threshold';
    expect(issues(d)).toContain(
      'A law cell carries the provision kind of its question',
    );
    d = clone();
    cellAt(d, id).attributes!.provision!.key = 'comparison-law-q02';
    expect(issues(d)).toContain('A law cell carries its question’s key');
    d = clone();
    cellAt(d, id).object = { kind: 'literal', value: 'Covered' };
    expect(issues(d)).toContain('A law cell is named by its question’s label');
    d = clone();
    cellAt(d, 'lc-cell-ca-sb53-q02').attributes!.provision!.facet!.id = 'L.Q01';
    cellAt(d, 'lc-cell-ca-sb53-q02').attributes!.provision!.kind = 'statement';
    cellAt(d, 'lc-cell-ca-sb53-q02').attributes!.provision!.key =
      'comparison-law-q01';
    cellAt(d, 'lc-cell-ca-sb53-q02').object = {
      kind: 'literal',
      value: 'Who is covered',
    };
    expect(issues(d)).toContain(
      'One law cell per text and question: california-sb-53 L.Q01',
    );
    d = clone();
    delete cellAt(d, 'lc-cell-ca-sb53-q05').attributes!.provision!.facet!
      .paraphrased;
    expect(issues(d)).toContain(
      'A law cell resting on a paraphrase is marked as paraphrased, and only then',
    );
    d = clone();
    const e = d.evidence.find((x) => x.id === 'lc-ev-ca-sb53-q01-1')!;
    e.translation = 'A translation of an English text';
    expect(issues(d)).toContain(
      'A translation belongs only to a quotation in another language',
    );
  });

  it('keeps law cells out of the frameworks-and-law page and states the shared sentences once', () => {
    const law = frameworksLawView(data, frameworksAndLaw);
    expect(law.claimIds.filter((id) => id.startsWith('lc-cell-'))).toEqual([]);
    for (const c of cells) {
      expect(lawCellNote(c)).not.toMatch(
        /A cell records what the text requires/,
      );
    }
  });

  it('registers the collection and records it whole in releases', () => {
    const registered = applicationCollections.find(
      (c) => c.definition.id === lawsCompared.id,
    )!;
    expect(registered.kind).toBe('compare');
    expect(collectionClaimIds(data, registered)).toEqual(view.claimIds);
    const whole = wholeCollections.find(
      (c) => c.definition.id === lawsCompared.id,
    )!;
    expect(whole.definition).toBe(lawsCompared);
  });

  it('writes one CSV row per text and question', () => {
    const csvRows = lawsComparedCsvRows(data, lawsCompared);
    expect(csvRows).toHaveLength(10 * 15);
    const cn = csvRows.find(
      (r) =>
        r.instrument.startsWith('China, generative') && r.question_id === 'Q01',
    )!;
    expect(cn.translation).not.toBe('');
    const q11 = csvRows.find(
      (r) => r.text.startsWith('S6953-B') && r.question_id === 'Q11',
    )!;
    expect(q11.date_kind).toBe('takes effect (computed)');
    expect(lawsComparedCsv(data, lawsCompared).split('\r\n')[0]).toContain(
      'instrument_standing',
    );
  });
});
