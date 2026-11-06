import { describe, expect, it } from 'vitest';
import { repository } from './repository';
import { datasetSchema, type Dataset } from './schema';
import {
  predictionDecades,
  predictionRows,
  predictionsClaimIds,
} from './predictions';
import { predictionsCsv, predictionsCsvColumns } from './predictions-csv';
import {
  predictionForms,
  predictionVerdictWords,
  unquoted,
} from './prediction-fields';
import { predictionsOnRecord } from '../reading/predictions';
import { predictionsFrame } from '../reading/predictions-frame';
import { parseYearPageId } from './chronicle-index';
import {
  applicationCollections,
  collectionClaimIds,
} from '../release/collections';
import { resolveReference } from './deep-links';
import { referencePath } from './addresses';
import before from '../../review/predictions-admission-before-2026-11-05.json';

const data = repository.data;
const clone = () => structuredClone(data) as Dataset;
const parses = (d: Dataset) => datasetSchema.safeParse(d).success;
const prediction = (d: Dataset, id: string) =>
  d.claims.find((c) => c.id === id)!.attributes!.prediction!;

describe('Predictions on record (schema 2.32)', () => {
  const rows = predictionRows(data);

  it('holds every prediction record the admission added, and only those', () => {
    const ids = predictionsClaimIds(data, predictionsFrame);
    expect(new Set(ids)).toEqual(new Set(before.added.claims));
    expect(rows.map((r) => r.claimId).sort()).toEqual([...ids].sort());
    const collection = applicationCollections.find(
      (c) => c.kind === 'predictions',
    )!;
    expect(collectionClaimIds(data, collection)).toEqual(ids);
  });

  it('dates each record by its text, and lists rows by source date', () => {
    const dates = rows.map((r) => r.sourceDate);
    expect([...dates].sort()).toEqual(dates);
    for (const r of rows) {
      const c = repository.claims.get(r.claimId)!;
      expect(c.time.kind).toBe('event');
      expect(r.sourceDate).toBe(c.time.kind === 'event' ? c.time.date : '');
    }
  });

  it('puts on the chart only years a text prints, never a relative horizon', () => {
    for (const r of rows) {
      if (['relative', 'period', 'vague', 'figure'].includes(r.horizonKind))
        expect(r.years, r.claimId).toEqual([]);
      for (const y of r.years)
        expect(r.horizon, r.claimId).toContain(String(y));
    }
    // Turing's "in about fifty years' time" stays words.
    const turing = rows.find(
      (r) => r.claimId === 'pr-a-turing-1950-imitation-game',
    )!;
    expect(turing.years).toEqual([]);
    expect(turing.horizon).toBe("in about fifty years' time");
  });

  it('keeps a survey’s figure with the survey and a platform figure with its dated copy', () => {
    for (const c of data.claims) {
      const p = c.attributes?.prediction;
      if (!p) continue;
      if (p.form === 'expert-survey') expect(p.predictor.kind).toBe('survey');
      if (p.form === 'platform-question') {
        expect(p.predictor.kind).toBe('platform');
        expect(p.capture?.url).toMatch(
          /^https:\/\/web\.archive\.org\/web\/\d{14}\//,
        );
      }
    }
    // Decision 15a: one platform figure, from its capture of 2025-01-05.
    expect(rows.filter((r) => r.form === 'platform-question')).toHaveLength(1);
  });

  it('marks forecast or aim, later reports, reported statements and attested wording', () => {
    const marks = (id: string) => rows.find((r) => r.claimId === id)!.marks;
    expect(marks('pr-f-altman-2025-2035-capacity')).toContain(
      'forecast-or-aim',
    );
    expect(marks('pr-e-cotra-2020-bio-anchors-as-reported-2022')).toContain(
      'reported-later',
    );
    expect(marks('pr-a-lighthill-1973-correspondents-2000')).toContain(
      'reported-statement',
    );
    expect(marks('pr-e-brooks-2018-mouse')).toContain('attested');
  });

  it('records no outcome, and no verdict words in its own text', () => {
    for (const c of data.claims.filter((c) => c.attributes?.prediction)) {
      expect(Object.keys(c.attributes!.prediction!)).not.toContain('outcome');
      expect(predictionVerdictWords.test(unquoted(c.statement)), c.id).toBe(
        false,
      );
      expect(predictionVerdictWords.test(unquoted(c.qualification)), c.id).toBe(
        false,
      );
    }
    const text = [
      predictionsOnRecord.introduction,
      ...predictionsOnRecord.doesNot,
      ...predictionsOnRecord.limits,
    ].join(' ');
    // The page says what it does not do; it never says what came true.
    expect(text).toContain('does not say whether any prediction came true');
    expect(text).toContain('does not rank predictors or combine estimates');
  });

  it('describes every form and decade the rows hold', () => {
    expect(predictionsOnRecord.forms.map((f) => f.id).sort()).toEqual(
      [...predictionForms].sort(),
    );
    expect(new Set(rows.map((r) => r.form)).size).toBe(predictionForms.length);
    expect(predictionDecades(rows)[0]).toBe(1950);
  });

  it('links a printed target year only to a year page the dataset has', () => {
    const last = Number(data.meta.updatedAt.slice(0, 4));
    for (const r of rows)
      for (const y of r.years.filter((y) => y >= 1950 && y <= last))
        expect(
          parseYearPageId(data, String(y)),
          `${r.claimId} ${y}`,
        ).not.toBeNull();
  });

  it('writes one CSV row per record, with the table’s columns and no outcome column', () => {
    const csv = predictionsCsv(
      data,
      predictionsOnRecord,
      'https://example.org',
    );
    const lines = csv.trimEnd().split('\r\n');
    expect(lines[0]).toBe(predictionsCsvColumns.join(','));
    expect(predictionsCsvColumns).not.toContain('outcome');
    expect(csv).toContain(
      'https://example.org/claim/pr-a-turing-1950-imitation-game',
    );
    // Quoted fields may hold line breaks; count the records instead.
    expect(csv.match(/\/claim\/pr-/g)).toHaveLength(rows.length);
  });

  it('opens its page at its address, and no other', () => {
    const target = { kind: 'predictions' as const, id: predictionsFrame.id };
    expect(referencePath(target)).toBe('/predictions/predictions-on-record');
    expect(
      resolveReference('/predictions/predictions-on-record', data).target,
    ).toEqual({ ...target, inspect: undefined });
    expect(resolveReference('/predictions/other', data).target).toBeNull();
  });

  describe('validation', () => {
    const id = 'pr-a-simon-newell-1958-chess';
    it('accepts the stored records', () => expect(parses(data)).toBe(true));
    it('rejects a year computed from a relative horizon', () => {
      const d = clone();
      prediction(d, id).horizon.years = [1967];
      expect(parses(d)).toBe(false);
    });
    it('rejects a year the horizon does not print', () => {
      const d = clone();
      prediction(d, 'pr-e-brooks-2018-mouse').horizon.years = [2031];
      expect(parses(d)).toBe(false);
    });
    it('rejects an event that is not in a quoted passage', () => {
      const d = clone();
      const p = prediction(d, id);
      p.event.text = 'a computer will be world chess champion';
      d.claims.find((c) => c.id === id)!.object = {
        kind: 'literal',
        value: p.event.text,
      };
      expect(parses(d)).toBe(false);
    });
    it('rejects a survey figure given to a person', () => {
      const d = clone();
      prediction(d, 'pr-c-grace-2017-all-tasks').predictor.kind = 'person';
      expect(parses(d)).toBe(false);
    });
    it('rejects a platform figure without its dated capture', () => {
      const d = clone();
      delete prediction(d, 'pr-d-metaculus-5121-capture-2025-01-05').capture;
      expect(parses(d)).toBe(false);
    });
    it('rejects a contested record without a documentary dispute', () => {
      const d = clone();
      d.claims.find((c) => c.id === id)!.resolution = 'contested';
      expect(parses(d)).toBe(false);
    });
    it('rejects a verdict in the record’s own words', () => {
      const d = clone();
      d.claims.find((c) => c.id === id)!.qualification +=
        ' The prediction came true.';
      expect(parses(d)).toBe(false);
    });
  });
});
