import { createHash } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import { repository } from './repository';
import { datasetSchema, isAssessment, type Dataset } from './schema';
import { derivationLabels } from './epistemics';
import {
  historicalViews,
  preFixPassRaw,
  preReaderTextIdsRaw,
} from '../editorial/historical-views';
import fixPass from '../../review/fix-pass-before-2026-10-05.json';

const data = repository.data;
const sha = (value: unknown) =>
  createHash('sha256').update(JSON.stringify(value)).digest('hex');
const clone = () => structuredClone(data) as Dataset;
const claim = (d: Dataset, id: string) => d.claims.find((c) => c.id === id)!;
const issues = (d: Dataset) =>
  datasetSchema.safeParse(d).error?.issues.map((i) => i.message) ?? [];

describe('assessments are questions posed by Selekoa (schema 2.10)', () => {
  it('records every assessment and every unresolved non-inference as posed', () => {
    const assessments = data.claims.filter(isAssessment);
    expect(assessments.length).toBe(5);
    for (const c of assessments) {
      expect(c.derivation, c.id).toBe('posed');
      expect(c.resolution, c.id).not.toBe('supported');
      expect(c.time.kind, c.id).not.toBe('interval');
      expect(derivationLabels[c.derivation]).toBe('Question posed by Selekoa');
    }
    for (const c of data.claims.filter((c) => c.resolution === 'unresolved'))
      expect(['posed', 'inferred'], c.id).toContain(c.derivation);
  });

  it('dates the control assessments by what they assess, not by their sources', () => {
    const openai = claim(data, 'cs-assessed-openai-recapitalization-control');
    expect(openai.time).toMatchObject({ kind: 'event', date: '2025-10-28' });
    expect(openai.time.note).toMatch(/source dates, not the period/);
    const ltbt = claim(data, 'cs-assessed-anthropic-ltbt-independence');
    expect(ltbt.time.kind).toBe('unknown');
    expect(ltbt.time.note).toMatch(/source dates, not the period/);
  });

  it('rejects a source-publication window stored as an assessment interval', () => {
    const d = clone();
    claim(d, 'cs-assessed-openai-recapitalization-control').time = {
      kind: 'interval',
      from: '2025-10-28',
      until: '2026-05-11',
      note: 'Synthetic regression: the cited passages’ publication window.',
    };
    expect(issues(d)).toContain(
      'An assessment is dated by what it assesses or left undated, never by an interval',
    );
  });

  it('rejects an assessment or unresolved record labelled as stated in a source', () => {
    const d = clone();
    claim(d, 'cs-assessed-anthropic-ltbt-independence').derivation = 'explicit';
    expect(issues(d)).toEqual(
      expect.arrayContaining([
        'An assessment is a question posed by Selekoa',
        'An unresolved record is not stated by a source; record it as posed or inferred',
      ]),
    );
  });
});

describe('historical views', () => {
  it('reproduce every recorded earlier dataset exactly', () => {
    expect(historicalViews.filter((v) => !v.exact)).toHaveLength(1);
    for (const { snapshot, view } of historicalViews.filter((v) => v.exact)) {
      for (const key of ['entities', 'claims', 'sources', 'evidence'] as const)
        expect(sha(view[key]), key).toBe(snapshot.sha256[key]);
      expect(sha(view.meta)).toBe(snapshot.sha256.meta);
    }
    expect(preFixPassRaw.meta.schemaVersion).toBe('2.9');
  });

  it('the fix pass changed only the derivation and date of the five assessments', () => {
    for (const name of ['entities', 'sources', 'evidence'] as const) {
      expect(fixPass.added[name]).toEqual([]);
      expect(fixPass.before[name]).toEqual([]);
    }
    expect(fixPass.added.claims).toEqual([]);
    const before = fixPass.before.claims;
    expect(before.map((c) => c.id).sort()).toEqual(
      data.claims
        .filter(isAssessment)
        .map((c) => c.id)
        .sort(),
    );
    for (const prior of before) {
      // Compared with the rows before the 2026-10-15 removal of record IDs
      // from reader-facing text, which reworded one qualification.
      const { derivation, time, ...rest } = claim(
        preReaderTextIdsRaw as unknown as Dataset,
        prior.id,
      );
      const { derivation: d0, time: t0, ...rest0 } = prior;
      expect(rest, prior.id).toEqual(rest0);
      expect([d0, derivation]).toEqual(['explicit', 'posed']);
      if (prior.id.startsWith('cs-assessed-')) {
        expect(t0.kind).toBe('interval');
        expect(time.kind).not.toBe('interval');
      } else expect(time).toEqual(t0);
    }
  });
});
