import { describe, expect, it } from 'vitest';
import { repository } from './repository';
import { frameworkComparison } from '../reading/framework-comparison';
import {
  cellStatusLabels,
  comparisonFacets,
  comparisonView,
} from './framework-comparison';
import {
  comparisonCsv,
  comparisonCsvColumns,
  comparisonCsvRows,
} from './comparison-csv';

/** A minimal RFC 4180 reader for the test. */
function parseCsv(text: string) {
  const rows: string[][] = [];
  let row: string[] = [];
  let value = '';
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') {
        value += '"';
        i++;
      } else if (ch === '"') quoted = false;
      else value += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ',') {
      row.push(value);
      value = '';
    } else if (ch === '\r' && text[i + 1] === '\n') {
      row.push(value);
      rows.push(row);
      row = [];
      value = '';
      i++;
    } else value += ch;
  }
  return rows;
}

describe('comparison CSV', () => {
  const data = repository.data;
  const view = comparisonView(data, frameworkComparison);
  const rows = comparisonCsvRows(data, frameworkComparison, 'https://x.test/');

  it('has one row per cell of every edition, with the page’s status', () => {
    const editions = view.columns.flatMap((c) => c.editions);
    expect(rows).toHaveLength(editions.length * comparisonFacets.length);
    let n = 0;
    for (const column of view.columns)
      for (const edition of column.editions)
        for (const facet of comparisonFacets) {
          const cell = view.cell(edition.id, facet.id);
          const row = rows[n++];
          expect(row.framework).toBe(column.label);
          expect(row.question_id).toBe(facet.id);
          expect(row.status).toBe(cellStatusLabels[cell.status]);
          expect(row.record).toBe(
            cell.claim ? `https://x.test/claim/${cell.claim.id}` : '',
          );
        }
  });

  it('gives each quotation and marked paraphrase with its page and check date', () => {
    for (const row of rows) {
      if (row.status === cellStatusLabels.stated) {
        expect(row.passage, row.record).not.toBe('');
        expect(row.page, row.record).not.toBe('');
        expect(row.source_url, row.record).toMatch(/^https?:\/\//);
        expect(row.date_checked, row.record).toMatch(/^\d{4}-\d{2}-\d{2}/);
      }
      for (const line of row.passage.split('\n').filter(Boolean))
        expect(line).toMatch(/^(“|Paraphrase: )/);
      if (row.status === cellStatusLabels['not-found']) {
        expect(row.passage).toBe('');
        expect(row.search_notes, row.record).not.toBe('');
      } else expect(row.search_notes).toBe('');
    }
  });

  it('reads back as the same rows', () => {
    const parsed = parseCsv(comparisonCsv(data, frameworkComparison));
    expect(parsed[0]).toEqual([...comparisonCsvColumns]);
    expect(parsed).toHaveLength(rows.length + 1);
    const plain = comparisonCsvRows(data, frameworkComparison);
    parsed.slice(1).forEach((values, i) => {
      expect(
        Object.fromEntries(comparisonCsvColumns.map((c, j) => [c, values[j]])),
      ).toEqual(plain[i]);
    });
  });
});
