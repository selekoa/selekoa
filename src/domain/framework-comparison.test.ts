import { describe, expect, it } from 'vitest';
import { repository } from './repository';
import { datasetSchema, type Dataset } from './schema';
import {
  cellNote,
  comparisonFacets,
  facetById,
  comparisonView,
  isComparisonCell,
} from './framework-comparison';
import { frameworkComparison } from '../reading/framework-comparison';
import { documentHistory } from './document-history';
import { frontierSafetyFrameworks } from '../reading/frontier-safety-frameworks';
import { referencePath, resolveReference } from './deep-links';
import pack from '../../research/frontier-framework-comparison/pack.json';
import paraphrases from '../../research/frontier-framework-comparison/paraphrases.json';

const data = repository.data;
const view = comparisonView(data, frameworkComparison);
const cells = data.claims.filter(isComparisonCell);
const clone = () => structuredClone(data) as Dataset;
const issues = (d: Dataset) => {
  const result = datasetSchema.safeParse(d);
  return result.success ? [] : result.error.issues.map((i) => i.message);
};

describe('framework comparison (schemas 2.17 and 2.18)', () => {
  it('has one cell or a recorded reason for every edition and question', () => {
    const editions = view.columns.flatMap((c) => c.editions);
    expect(editions).toHaveLength(pack.editions.length);
    for (const e of editions)
      for (const f of comparisonFacets)
        expect(view.cell(e.id, f.id)).toBeTruthy();
    expect(cells).toHaveLength(
      editions.length * comparisonFacets.length -
        frameworkComparison.notChecked.reduce(
          (n, g) => n + g.facetIds.length,
          0,
        ) -
        frameworkComparison.notApplicable.reduce(
          (n, g) => n + g.editionIds.length,
          0,
        ),
    );
  });

  it('keeps the adjudicated pack status of every admitted cell', () => {
    for (const c of pack.cells.filter((c) =>
      comparisonFacets.some((f) => f.id === c.facet),
    )) {
      const cell = view.cell(c.edition, c.facet);
      const expected =
        c.status === 'not-found'
          ? 'not-found'
          : c.status === 'not-applicable'
            ? c.facet === 'D8.changes'
              ? 'not-applicable'
              : 'not-checked'
            : c.status === 'carried-unverified'
              ? 'recorded'
              : 'partial' in c && c.partial
                ? 'partly'
                : 'stated';
      expect(cell.status, `${c.edition} ${c.facet}`).toBe(expected);
      if (cell.claim && c.status !== 'not-found')
        expect(cell.claim.evidenceIds).toHaveLength(c.entries.length);
    }
  });

  it('quotes each stated cell from its own edition, and contains the pack quotation', () => {
    const norm = (s: string) =>
      s
        .toLowerCase()
        .replace(/[‘’“”"']/g, "'")
        .replace(/[–—]/g, '-')
        .replace(/\s+/g, ' ')
        .trim();
    for (const c of pack.cells) {
      const cell = cells.find(
        (x) =>
          x.subject === c.edition &&
          x.attributes!.provision!.facet!.id === c.facet,
      );
      if (!cell || cell.predicate !== 'states_provision') continue;
      if (facetById(c.facet)!.dimension.passages === 'paraphrase') continue;
      const source = repository.sources.get(
        repository.evidence.get(cell.evidenceIds[0])!.sourceId,
      )!;
      expect(source.documentId).toBe(c.edition);
      if (c.status === 'carried-unverified') continue;
      c.entries.forEach((entry, i) => {
        const passage = norm(
          repository.evidence.get(cell.evidenceIds[i])!.passage,
        );
        for (const fragment of entry.quote.split(/\s*…\s*/))
          expect(passage, entry.id).toContain(norm(fragment));
      });
    }
  });

  it('paraphrases the other questions from their own edition, at the pack locator, quoting nothing', () => {
    let paraphrased = 0;
    for (const c of pack.cells) {
      if (facetById(c.facet)!.dimension.passages !== 'paraphrase') continue;
      const cell = cells.find(
        (x) =>
          x.subject === c.edition &&
          x.attributes!.provision!.facet!.id === c.facet,
      );
      if (!cell || cell.predicate !== 'states_provision') continue;
      paraphrased++;
      const rows = cell.evidenceIds.map((id) => repository.evidence.get(id)!);
      expect(rows.every((e) => e.passageType === 'paraphrase')).toBe(true);
      for (const e of rows)
        expect(repository.sources.get(e.sourceId)!.documentId).toBe(c.edition);
      if (c.status === 'carried-unverified') continue;
      const page = (s: string) => /PDF pp?\. ?(\d+)/.exec(s)?.[1];
      const drafted = (
        paraphrases.cells as Record<
          string,
          { entries?: Record<string, { locatorCorrected?: string }> }
        >
      )[`${c.edition}.${c.facet}`].entries!;
      c.entries.forEach((entry, i) => {
        if (!drafted[entry.id].locatorCorrected)
          expect(page(rows[i].locator), entry.id).toBe(page(entry.locator));
      });
      expect(cell.qualification).toContain(
        'paraphrased from the cited expression',
      );
    }
    expect(paraphrased).toBeGreaterThan(0);
  });

  it('gives every cell a note without the sentences the page states once', () => {
    for (const c of cells) {
      expect(cellNote(c).length).toBeLessThan(c.qualification.length);
      expect(cellNote(c)).not.toContain('not evidence of implementation');
    }
  });

  it('keeps cells out of the per-edition provision lists', () => {
    const history = documentHistory(data, frontierSafetyFrameworks);
    const ids = new Set(history.claimIds);
    expect(cells.some((c) => ids.has(c.id))).toBe(false);
  });

  it('orders columns by developer, never by any count', () => {
    expect(view.columns.map((c) => c.family)).toEqual(
      frameworkComparison.families,
    );
    expect(view.columns.map((c) => c.label)).toEqual(
      [...view.columns.map((c) => c.label)].sort((a, b) => a.localeCompare(b)),
    );
  });

  it('rejects a cell with the wrong kind, a second cell or a misplaced key', () => {
    const wrongKind = clone();
    const cell = wrongKind.claims.find(isComparisonCell)!;
    cell.attributes!.provision!.kind = 'threshold';
    expect(issues(wrongKind)).toContain(
      'A comparison cell carries the provision kind of its question',
    );
    const twice = clone();
    const first = twice.claims.find(isComparisonCell)!;
    const copy = structuredClone(first);
    copy.id = first.id + '-copy';
    copy.evidenceIds = [];
    twice.claims.push({ ...copy, evidenceIds: first.evidenceIds });
    expect(issues(twice).some((m) => m.startsWith('One comparison cell'))).toBe(
      true,
    );
    const key = clone();
    const provision = key.claims.find(
      (c) => c.predicate === 'states_provision' && !isComparisonCell(c),
    )!;
    provision.attributes!.provision!.key = 'comparison-d3-halt';
    expect(issues(key)).toContain(
      'A comparison key belongs only to comparison cells',
    );
    const status = clone();
    const stated = status.claims.find(
      (c) => isComparisonCell(c) && c.predicate === 'states_provision',
    )!;
    delete stated.attributes!.provision!.facet!.status;
    expect(issues(status)).toContain(
      'A stated comparison cell records its status',
    );
  });

  it('rejects a quotation on a paraphrased question, and a paraphrase alone on a quoted one', () => {
    const quoted = clone();
    const paraphrased = quoted.claims.find(
      (c) =>
        c.predicate === 'states_provision' &&
        facetById(c.attributes?.provision?.facet?.id ?? '')?.dimension
          .passages === 'paraphrase',
    )!;
    quoted.evidence.find(
      (e) => e.id === paraphrased.evidenceIds[0],
    )!.passageType = 'quote';
    expect(issues(quoted)).toContain(
      'A paraphrased comparison cell requires supporting paraphrases of at most 50 words from the cited edition, and no quotation',
    );
    const bare = clone();
    const cell = bare.claims.find(
      (c) =>
        c.predicate === 'states_provision' &&
        facetById(c.attributes?.provision?.facet?.id ?? '')?.dimension
          .passages === 'quote',
    )!;
    for (const id of cell.evidenceIds)
      bare.evidence.find((e) => e.id === id)!.passageType = 'paraphrase';
    expect(issues(bare)).toContain(
      'A stated provision requires a supporting verbatim quote of at most 50 words from the cited edition',
    );
  });

  it('has an address that resolves, with an optional question', () => {
    const path = referencePath({
      kind: 'compare',
      id: frameworkComparison.id,
      facet: 'D3.halt',
    });
    expect(path).toBe('/compare/frontier-safety-frameworks?facet=D3.halt');
    expect(resolveReference(path, data).target).toEqual({
      kind: 'compare',
      id: frameworkComparison.id,
      facet: 'D3.halt',
      inspect: undefined,
    });
    expect(
      resolveReference(
        '/compare/frontier-safety-frameworks?facet=D9.cbrn',
        data,
      ).target,
    ).toBeNull();
    expect(resolveReference('/compare/other', data).target).toBeNull();
  });
});
