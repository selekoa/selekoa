import { describe, expect, it } from 'vitest';
import pack from '../../research/lab-genealogy/pack.json';
import map from '../../review/genealogy-admission-map-2026-10-17.json';
import snapshot from '../../review/genealogy-admission-before-2026-10-17.json';
import { repository } from './repository';
import { datasetSchema, type Dataset } from './schema';
import { indirectRoutes, restsOnReporting, statedReason } from './genealogy';
import { preRecheckCorrectionsRaw } from '../editorial/historical-views';

const data = repository.data;
const held = map.holdBack as Record<string, string>;
const packRoute = new Map(pack.sources.map((s) => [s.id, s.retrieval.route]));
const routeOf = {
  direct: 'direct',
  relay: 'reader_relay',
  x: 'x_syndication',
} as const;
const claim = (id: string) => repository.claims.get(id)!;
const clone = () => structuredClone(data) as Dataset;
const issues = (d: Dataset) =>
  datasetSchema.safeParse(d).error?.issues.map((i) => i.message) ?? [];

describe('the lab genealogy (admitted 2026-10-17, schema 2.15)', () => {
  it('admits every pack record except those held back, with all its passages', () => {
    expect(Object.keys(held).sort()).toEqual([
      'lg-deal-luan-cofounded-adept',
      'lg-deal-luan-google-prior',
      'lg-deal-luan-openai-engineering-prior',
      'lg-deal-parmar-cofounded-adept',
      'lg-deal-vaswani-cofounded-adept',
    ]);
    for (const c of pack.claims) {
      const stored = repository.claims.get(c.id);
      if (c.id in held) {
        expect(stored, c.id).toBeUndefined();
        continue;
      }
      expect(stored?.predicate, c.id).toBe(c.predicate);
      expect(stored!.editorialState).toBe('seed');
      expect(stored!.evidenceIds).toEqual(c.evidence.map((e) => e.id));
    }
    // Admitted at schema 2.15; the re-check corrections of 2026-10-25 moved
    // the dataset to 2.16.
    expect(preRecheckCorrectionsRaw.meta.schemaVersion).toBe('2.15');
    expect(snapshot.added.claims).toHaveLength(
      pack.claims.length - Object.keys(held).length,
    );
  });

  it('records the retrieval route of every passage and marks indirect ones', () => {
    for (const c of pack.claims.filter((c) => !(c.id in held)))
      for (const e of c.evidence) {
        const stored = repository.evidence.get(e.id)!;
        const route = packRoute.get(e.sourceId)!;
        expect(stored.retrievalRoute, e.id).toBe(
          routeOf[route as keyof typeof routeOf],
        );
        expect(stored.verification).toBe('machine_checked');
      }
    // OpenAI pages were read through the reader relay; X posts through the
    // syndication endpoint.
    expect(
      indirectRoutes(claim('lg-oai-murati-cto-return-2023'), repository),
    ).toEqual(['reader_relay']);
    expect(
      indirectRoutes(claim('lg-ant-leike-joins-2024'), repository),
    ).toContain('x_syndication');
  });

  it('derives reliance on reporting from the supporting passages', () => {
    expect(
      restsOnReporting(claim('lg-new-tulloch-tml-departure-2025'), repository),
    ).toBe(true);
    expect(
      restsOnReporting(claim('lg-oai-murati-cto-return-2023'), repository),
    ).toBe(false);
    const reporting = snapshot.added.claims.filter((id) =>
      restsOnReporting(claim(id), repository),
    );
    expect(reporting.length).toBeGreaterThan(100);
  });

  it('attributes every stated reason and keeps it out of the statement', () => {
    const withReason = pack.claims.filter((c) => 'statedReason' in c);
    expect(withReason).toHaveLength(13);
    for (const c of withReason) {
      const stored = claim(c.id);
      const reason = stored.attributes!.statedReason!;
      expect(reason.by).toBe(c.statedReason!.by);
      expect(stored.evidenceIds).toContain(reason.evidenceId);
      expect(statedReason(stored, repository)!.by).toBe(
        repository.entities.get(reason.by)!.name,
      );
    }
    // Anthropic's explanation is Anthropic's, not Matheny's.
    expect(
      claim('lg-ant-matheny-ltbt-departure-2023').attributes!.statedReason!.by,
    ).toBe('anthropic');
  });

  it('applies the cross-family findings', () => {
    expect(claim('lg-oai-founding-stated-2015').time.note).not.toContain(
      '11 December',
    );
    expect(claim('lg-gc-wu-yonghui-google-deepmind-2023').time).toMatchObject({
      kind: 'snapshot',
      date: '2023',
    });
    expect(claim('lg-gs-superalignment-team-absorbed-2024').time.kind).toBe(
      'snapshot',
    );
    expect(claim('lg-gc-wang-haifeng-baidu-cto-2025-11').statement).not.toMatch(
      /Steering Committee/,
    );
    expect(claim('lg-gc-sun-tianxiang-baidu-bmu-2026').statement).not.toMatch(
      /BMC/,
    );
    expect(claim('lg-gc-li-feifei-alibaba-cloud-cto-2026')).toMatchObject({
      derivation: 'inferred',
    });
    expect(
      repository.evidence.get('lg-ev-new-yogatama-reka-ceo-2023')!.locator,
    ).toBe('Paragraph beginning “CEO Dani Yogatama”');
    // Every finding has a recorded disposition.
    expect(Object.keys(map.dispositions)).toHaveLength(31);
  });

  it('writes no record ID or health reason into the reader text of new records', () => {
    const ids = new Set(
      [...data.entities, ...data.claims, ...data.sources, ...data.evidence].map(
        (r) => r.id,
      ),
    );
    for (const id of snapshot.added.claims) {
      const c = claim(id);
      const text = [
        c.statement,
        c.qualification,
        c.time.note,
        c.attributes?.role ?? '',
        c.attributes?.statedReason?.text ?? '',
      ].join(' ');
      const found = (
        text.match(/\b[a-z0-9]+(?:-[a-z0-9]+){2,}\b/g) ?? []
      ).filter((w) => ids.has(w));
      expect(found, id).toEqual([]);
      if (id.startsWith('lg-gw-weng')) expect(text, id).not.toMatch(/health/i);
    }
  });

  it('updates the existing records touched by new evidence without deleting history', () => {
    const kreps = claim('cs-kreps-anthropic-board-2024');
    expect(kreps.time).toMatchObject({ kind: 'snapshot', date: '2024-05-29' });
    expect(kreps.qualification).toContain('15 October 2026');
    expect(kreps.qualification).toContain('none is inferred');
    expect(kreps.evidenceIds).toContain(
      'evidence-cs-kreps-anthropic-board-2024-company-2026',
    );
    expect(repository.entities.get('tang-jie')!.description).toContain(
      'co-founder',
    );
    expect(claim('lg-ant-mann-cofounded').qualification).toContain(
      'does not list him among its co-founders',
    );
  });
});

describe('schema 2.15 validation', () => {
  it('rejects a founding date in another year, an interval, or a non-literal', () => {
    const d = clone();
    const c = d.claims.find((c) => c.id === 'lg-oai-founding-stated-2015')!;
    c.time = { kind: 'event', date: '2016', note: 'Wrong year.' };
    expect(issues(d)).toContain(
      'A stated founding date’s event year must be the year the wording names',
    );
    c.time = { kind: 'interval', from: '2015', note: 'Not an event.' };
    expect(issues(d)).toContain(
      'A stated founding date is an event or unknown',
    );
  });

  it('rejects a stated reason that names no actor or rests on another record', () => {
    const d = clone();
    const c = d.claims.find(
      (c) => c.id === 'lg-ant-matheny-ltbt-departure-2023',
    )!;
    c.attributes!.statedReason!.by = d.entities.find(
      (e) => e.type === 'document',
    )!.id;
    c.attributes!.statedReason!.evidenceId =
      'evidence-cs-kreps-anthropic-board-2024-company-2026';
    const found = issues(d);
    expect(found).toContain(
      'A stated reason names the person or organisation that stated it',
    );
    expect(found).toContain(
      'A stated reason rests on a supporting or context passage of the same record',
    );
  });

  it('allows the announced stage only on personnel and organisational records', () => {
    const d = clone();
    const c = d.claims.find((c) => c.predicate === 'authored')!;
    c.attributes = { ...c.attributes, activityStage: 'announced' };
    expect(issues(d).some((m) => m.startsWith('Activity stage belongs'))).toBe(
      true,
    );
  });

  it('keeps licensing-and-hiring agreements explicit and free of amounts', () => {
    const d = clone();
    const c = d.claims.find(
      (c) => c.predicate === 'licensing_hiring_agreement',
    )!;
    c.derivation = 'inferred';
    c.inferenceRationale = 'Test.';
    c.attributes = { ...c.attributes, transactionStage: 'announced' };
    const found = issues(d);
    expect(found).toContain(
      'A licensing and hiring agreement must be explicit',
    );
    expect(found).toContain(
      'Licensing-and-hiring agreements and disbanded units carry no transaction stage or amount',
    );
  });
});
