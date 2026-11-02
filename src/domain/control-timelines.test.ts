import { describe, expect, it } from 'vitest';
import { repository } from './repository';
import {
  controlTimelines,
  csvColumns,
  dateExtent,
  inYear,
  parseTimelineCsv,
  precisionOf,
  timelineCsv,
  timelineKindLabels,
  timelineRows,
  timelineStatus,
  timelineStatusLabels,
} from './control-timelines';
import { controlStructure } from './control-structures';
import { controlTimelines as definition } from '../reading/control-timelines';
import {
  controlTimelinesId,
  controlTimelinesOrganisations,
  controlTimelinesTitle,
} from '../reading/control-timelines-page';
import { controlStructures } from '../reading/control-structures';
import { pageMeta, pagePaths } from '../prerender/pages';
import { resolveReference } from './deep-links';
import type { Claim } from './schema';

const data = repository.data;
const view = controlTimelines(data, definition);
const shown = view.lanes.flatMap((l) => [...l.events, ...l.undated]);

describe('control timelines side by side', () => {
  it('has one row per organisation, in the definition’s order', () => {
    expect(view.lanes.map((l) => l.organisation.id)).toEqual([
      'openai',
      'anthropic',
      'google-deepmind',
      'xai',
    ]);
  });

  it('shows stored records only, each once', () => {
    const ids = shown.map((e) => e.claim.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const e of shown)
      expect(data.claims.find((c) => c.id === e.claim.id)).toBe(e.claim);
  });

  it('takes the control-structure pages’ records, without provisions and assessments', () => {
    for (const lane of view.lanes.filter((l) => l.collection)) {
      const entries = controlStructure(data, lane.collection!).entries;
      const expected = entries.filter(
        (e) => !definition.omittedKinds.includes(e.kind),
      );
      // Exactly the page's records.
      expect(lane.events.map((e) => e.claim.id).sort()).toEqual(
        expected.map((e) => e.claim.id).sort(),
      );
    }
    expect(shown.some((e) => e.kind === 'provision')).toBe(false);
    expect(shown.some((e) => e.kind === 'assessment')).toBe(false);
    expect(
      shown.some((e) => e.claim.id === 'lg-oai-schulman-departure-2024'),
    ).toBe(false);
  });

  it('names a selection for each row without a control-structure page', () => {
    const pages = new Set(controlStructures.map((c) => c.organisationId));
    for (const lane of view.lanes)
      expect(!!lane.collection).toBe(pages.has(lane.organisation.id));
    for (const lane of view.lanes.filter((l) => !l.collection)) {
      expect(lane.selection).toBeTruthy();
      expect(lane.events.length).toBeGreaterThan(0);
    }
  });

  it('draws no relation between organisations: no record names another row', () => {
    const rows = new Set(view.lanes.map((l) => l.organisation.id));
    for (const lane of view.lanes)
      for (const e of [...lane.events, ...lane.undated]) {
        const ends = [
          e.claim.subject,
          e.claim.object.kind === 'entity' ? e.claim.object.entityId : null,
        ];
        for (const id of ends)
          if (id && rows.has(id)) expect(id).toBe(lane.organisation.id);
      }
  });

  it('keeps each date as stored, with its precision', () => {
    for (const e of shown) {
      const t = e.claim.time;
      if (t.kind === 'unknown') {
        expect(e.date).toBeNull();
        continue;
      }
      const stored =
        t.kind === 'interval'
          ? (t.from ?? t.until)!
          : (t as { date: string }).date;
      expect(e.date).toBe(stored);
      expect(e.precision).toBe(precisionOf(stored));
    }
  });

  it('draws a year or a month as a band across it, never as a day', () => {
    expect(dateExtent('2014')).toEqual([2014, 2015]);
    const [from, to] = dateExtent('2024-04');
    expect(from).toBeCloseTo(2024 + 3 / 12);
    expect(to).toBeCloseTo(2024 + 4 / 12);
    const [a, b] = dateExtent('2023-11-17');
    expect(a).toBe(b);
    for (const e of shown.filter((e) => e.date)) {
      if (e.precision === 'day' && !e.until) expect(e.start).toBe(e.end);
      else expect(e.end).toBeGreaterThan(e.start);
    }
    const acquisition = shown.find(
      (e) => e.claim.id === 'google-acquired-deepmind-2014',
    )!;
    expect([acquisition.start, acquisition.end]).toEqual([2014, 2015]);
  });

  it('lists undated records apart from the axis', () => {
    for (const lane of view.lanes) {
      for (const e of lane.undated) expect(e.claim.time.kind).toBe('unknown');
      for (const e of lane.events)
        expect(e.claim.time.kind).not.toBe('unknown');
    }
  });

  it('keeps an announcement an announcement', () => {
    const status = (id: string) =>
      timelineStatus(data.claims.find((c) => c.id === id)!).status;
    expect(status('xm-spacex-acquisition')).toBe('announced');
    expect(status('xm-x-acquisition')).toBe('announced');
    expect(status('deepmind-combined-2023')).toBe('announced');
    expect(status('lg-mx-xai-spacexai-name-2026')).toBe('announced');
    expect(status('cs-openai-lp-announced-2019')).toBe('announced');
    // A control right read from a dated document is a dated record (PA-17).
    expect(status('cs-openai-foundation-elects-pbc-directors')).toBe('dated');
    expect(status('cs-anthropic-ltbt-class-t-consent')).toBe('dated');
    expect(status('cs-anthropic-ltbt-elects-directors')).toBe('effective');
    expect(status('google-acquired-deepmind-2014')).toBe('effective');
    // A snapshot of a role is neither.
    expect(status('lg-oai-hurd-board-2021')).toBe('dated');
    for (const e of shown) {
      const c: Claim = e.claim;
      const stage = c.attributes?.control?.stage;
      if (
        (stage && stage !== 'effective') ||
        (c.time.kind === 'event' && c.time.basis === 'announcement') ||
        c.attributes?.activityStage === 'announced'
      )
        expect(e.status).toBe('announced');
    }
  });

  it('shows each empty period as a gap, and no gap where a record lies', () => {
    for (const lane of view.lanes) {
      for (const year of view.years) {
        const gap = lane.gaps.some((g) => g.from <= year && year <= g.to);
        expect(gap).toBe(!lane.events.some((e) => inYear(e, year)));
      }
    }
  });

  it('places no two marks of a row on top of each other', () => {
    for (const lane of view.lanes) {
      const rows = new Map<number, typeof lane.events>();
      for (const e of lane.events)
        rows.set(e.row, [...(rows.get(e.row) ?? []), e]);
      for (const marks of rows.values())
        for (let i = 1; i < marks.length; i++)
          expect(marks[i].start).toBeGreaterThan(marks[i - 1].end);
      expect(lane.rows).toBe(Math.max(...lane.events.map((e) => e.row)) + 1);
    }
  });

  it('spans the years of its records', () => {
    const starts = shown.filter((e) => e.date).map((e) => e.start);
    expect(view.years[0]).toBe(Math.floor(Math.min(...starts)));
    expect(view.years).toEqual(
      Array.from({ length: view.years.length }, (_, i) => view.years[0] + i),
    );
  });
});

describe('the control timelines CSV', () => {
  const csv = timelineCsv(data, view);
  const [header, ...rows] = parseTimelineCsv(csv);

  it('has the columns, and one row per record shown, in the page’s order', () => {
    expect(header).toEqual([...csvColumns]);
    expect(rows.map((r) => r[csvColumns.indexOf('record_id')])).toEqual(
      shown.map((e) => e.claim.id),
    );
  });

  it('matches the page record by record', () => {
    const at = (name: (typeof csvColumns)[number]) => csvColumns.indexOf(name);
    rows.forEach((row, i) => {
      const e = shown[i];
      expect(row[at('organisation')]).toBe(e.organisation.name);
      expect(row[at('date')]).toBe(
        e.until ? `${e.date}/${e.until}` : (e.date ?? ''),
      );
      expect(row[at('date_precision')]).toBe(e.precision ?? 'unknown');
      expect(row[at('date_kind')]).toBe(e.dateKind);
      expect(row[at('kind')]).toBe(timelineKindLabels[e.kind]);
      expect(row[at('status')]).toBe(timelineStatusLabels[e.status]);
      expect(row[at('stage')]).toBe(e.stage);
      expect(row[at('statement')]).toBe(e.claim.statement);
      const urls = row[at('source_url')].split(' ; ');
      expect(urls.length).toBeGreaterThan(0);
      for (const url of urls) expect(url).toMatch(/^https?:\/\//);
    });
  });

  it('round-trips quotation marks, commas and line ends', () => {
    expect(timelineRows(data, view)).toHaveLength(rows.length);
    expect(parseTimelineCsv('"a ""b"", c","d\r\ne"\r\n')).toEqual([
      ['a "b", c', 'd\r\ne'],
    ]);
  });
});

describe('the control timelines page', () => {
  it('is built, has a title and resolves at its address', () => {
    const path = '/control/side-by-side';
    expect(pagePaths(data)).toContain(path);
    expect(pageMeta(data, path)?.title).toBe(
      'Control timelines side by side · Selekoa',
    );
    expect(resolveReference(path, data).target).toEqual({
      kind: 'control',
      id: 'side-by-side',
      inspect: undefined,
    });
  });

  it('names its page, title and organisations in the small module the workspace loads', () => {
    expect(controlTimelinesId).toBe(definition.id);
    expect(controlTimelinesTitle).toBe(definition.title);
    expect([...controlTimelinesOrganisations]).toEqual(
      definition.lanes.map((l) => l.organisationId),
    );
  });
});
