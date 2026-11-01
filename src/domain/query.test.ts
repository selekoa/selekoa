import { describe, expect, it } from 'vitest';
import { repository } from './repository';
import {
  mapLimits,
  mapReadable,
  queryDataset,
  searchEntities,
  isOpenRole,
  roleStatedIn,
  storedTimeLabel,
  timeLabel,
  type Filters,
} from './query';
import { networkLayout } from '../ui/layout';
import { relationshipClaims } from './query';
import authorPersons from '../../review/author-persons-before-2026-10-27.json';
import keyPapers1 from '../../review/key-papers-admission-1-before-2026-10-31.json';
import keyPapers2 from '../../review/key-papers-admission-2-before-2026-10-31.json';
import keyPapers3 from '../../review/key-papers-admission-3-before-2026-10-31.json';
import technicalHistory1 from '../../review/technical-history-admission-1-before-2026-10-31.json';
import technicalHistory2 from '../../review/technical-history-admission-2-before-2026-10-31.json';

const filters: Filters = {
  topic: 'all',
  entityType: 'all',
  throughYear: 2024,
  focusId: null,
};
describe('exploration queries', () => {
  it('projects one edge per relationship ID while keeping literal claims outside the graph', () => {
    const edges = relationshipClaims(repository.data.claims);
    expect(edges).toHaveLength(
      repository.data.claims.filter((c) => c.object.kind === 'entity').length,
    );
    expect(new Set(edges.map((c) => c.id)).size).toBe(edges.length);
    expect(edges.map((c) => c.id)).not.toContain('xai-round-total-2024');
    expect(edges.map((c) => c.id)).toEqual(
      repository.data.claims
        .filter((c) => c.object.kind === 'entity')
        .map((c) => c.id),
    );
  });
  it('matches aliases without manufacturing relations', () => {
    // The second match is a post whose title names MIRI.
    expect(searchEntities(repository.data, 'MIRI').map((e) => e.id)).toEqual([
      'miri',
      'lw-2022-miri-announces-new-death-with-dignity',
    ]);
    expect(searchEntities(repository.data, 'nonexistent')).toEqual([]);
  });
  it('shows only direct relations in a focus neighbourhood', () => {
    const result = queryDataset(repository.data, {
      ...filters,
      focusId: 'anthropic',
    });
    // 33 before week 4c, plus its six Anthropic control records through
    // 2024 and its listings for the July 2023 White House and the 2024 Seoul
    // commitments.
    // commitments. The 2026-10-17 lab genealogy adds its Anthropic records,
    // the 2026-10-28 frameworks-to-law admission its records naming Anthropic
    // the 2026-10-30 AI and biosecurity admission its evaluation records and
    // the 2026-10-31 people admission its role record; all four are excluded
    // here.
    expect(
      result.claims.filter(
        (c) =>
          !c.id.startsWith('lg-') &&
          !c.id.startsWith('fl-') &&
          !c.id.startsWith('ab-') &&
          !c.id.startsWith('pp-'),
      ).length,
    ).toBe(41);
    expect(result.claims.map((c) => c.id)).toContain(
      'eval-ontology-i-arc-anthropic',
    );
    expect(result.entities.some((e) => e.id === 'openai')).toBe(false);
    expect(result.entities.some((e) => e.id === 'amazon')).toBe(true);
  });
  it('filters cumulative historical records, not current roles', () => {
    const result = queryDataset(repository.data, {
      ...filters,
      throughYear: 1965,
    });
    // Authorship records of the 2026-10-27 author-person admission and the
    // 2026-10-31 key papers and technical history records aside.
    const later = new Set([
      ...authorPersons.added.claims,
      ...keyPapers1.added.claims,
      ...keyPapers2.added.claims,
      ...keyPapers3.added.claims,
      ...technicalHistory1.added.claims,
      ...technicalHistory2.added.claims,
    ]);
    expect(
      result.claims
        .filter((c) => c.time.kind !== 'unknown' && !later.has(c.id))
        .map((c) => c.id)
        .sort(),
    ).toEqual(['good-authorship-1965', 'good-discusses-explosion-1965']);
    expect(
      result.claims.filter(
        (c) => c.time.kind === 'unknown' && !later.has(c.id),
      ),
    ).toEqual(
      repository.data.claims.filter(
        (c) => c.time.kind === 'unknown' && !later.has(c.id),
      ),
    );
  });
  it('retains standalone literal claims with their subject', () => {
    const result = queryDataset(repository.data, {
      ...filters,
      topic: 'capital',
      focusId: 'xai',
    });
    expect(result.claims.some((c) => c.object.kind === 'literal')).toBe(true);
    expect(result.entities.some((e) => e.id === 'xai')).toBe(true);
  });
  it('does not leave edges pointing to filtered-out nodes', () => {
    const result = queryDataset(repository.data, {
      ...filters,
      entityType: 'organisation',
    });
    const ids = new Set(result.entities.map((e) => e.id));
    expect(
      result.claims.every(
        (c) =>
          ids.has(c.subject) &&
          (c.object.kind === 'literal' || ids.has(c.object.entityId)),
      ),
    ).toBe(true);
  });
  it('keeps a focused entity visible when its dated relations are filtered out', () => {
    // Isolate this empty-neighbourhood case from undated roles, which deliberately survive time filtering.
    const datedOnly = {
      ...repository.data,
      claims: repository.data.claims.filter((c) => c.time.kind !== 'unknown'),
    };
    const result = queryDataset(datedOnly, {
      ...filters,
      focusId: 'anthropic',
      throughYear: 1965,
    });
    expect(result.entities.map((e) => e.id)).toEqual(['anthropic']);
    expect(result.claims).toHaveLength(0);
  });
  it('clearly labels snapshots and unknown ends', () => {
    const data = repository.data;
    expect(timeLabel(data.claims[0], data)).toContain('snapshot');
    const open = {
      ...data.claims[0],
      time: { kind: 'interval', from: '2021', note: 'Test' },
    } as const;
    // Records other than roles, and review packs, keep the stored reading.
    expect(timeLabel({ ...open, predicate: 'unit_of' }, data)).toBe(
      '2021 → End unknown',
    );
    expect(storedTimeLabel(open)).toBe('2021 → End unknown');
  });
  it('reads an open-ended role from the latest dated source that states it, never as present', () => {
    const data = repository.data;
    const claim = (id: string) => data.claims.find((c) => c.id === id)!;
    expect(timeLabel(claim('pp-ex-nadella-microsoft-ceo-2014'), data)).toBe(
      'from 2014-02-04 (stated in Microsoft Corporation 2026 Proxy Statement (Schedule 14A, definitive), 2026-10-21)',
    );
    // Its only source is an undated page.
    expect(timeLabel(claim('kingma-anthropic-research-from-2024'), data)).toBe(
      'from 2024 (end not recorded)',
    );
    // A role with a stated end keeps its interval.
    expect(timeLabel(claim('ng-brain-lead-2011-2012'), data)).toBe(
      '2011 → 2012',
    );
    for (const c of data.claims.filter(isOpenRole))
      expect(timeLabel(c, data)).toMatch(
        /^from \S+ \((stated in .+, \d{4}(-\d\d){0,2}|end not recorded)\)$/,
      );
    expect(data.claims.some((c) => /present/i.test(timeLabel(c, data)))).toBe(
      false,
    );

    const role = {
      ...data.claims[0],
      id: 'test-role',
      time: { kind: 'interval', from: '2021', note: 'Test' },
    } as const;
    const source = (id: string, dates: object) => ({
      id,
      title: 'Source ' + id,
      publicationDate: null,
      ...dates,
    });
    const records = {
      evidence: [
        { claimId: 'test-role', sourceId: 'a', support: 'supports' },
        { claimId: 'test-role', sourceId: 'b', support: 'supports' },
        { claimId: 'test-role', sourceId: 'c', support: 'context' },
        { claimId: 'other', sourceId: 'c', support: 'supports' },
      ] as const,
      sources: [
        source('a', { publicationDate: '2022-05-01' }),
        // No publication date: its version date counts, and its document
        // record names it.
        source('b', { versionDate: '2023-02', documentId: 'doc' }),
        // Later, but context only.
        source('c', { publicationDate: '2026-01-01' }),
      ],
      entities: [{ id: 'doc', name: 'Annual report 2022' }],
    };
    expect(timeLabel(role, records)).toBe(
      'from 2021 (stated in Annual report 2022, 2023-02)',
    );
    expect(roleStatedIn(records, role)).toMatchObject({
      sourceId: 'b',
      documentId: 'doc',
    });
    // Without the document record, the source title names it.
    expect(timeLabel(role, { ...records, entities: [] })).toBe(
      'from 2021 (stated in Source b, 2023-02)',
    );
    expect(
      timeLabel(role, {
        ...records,
        evidence: [records.evidence[0]],
      }),
    ).toBe('from 2021 (stated in Source a, 2022-05-01)');
    // No supporting source carries a date.
    expect(
      timeLabel(role, {
        ...records,
        sources: [source('a', {}), source('b', {}), records.sources[2]],
      }),
    ).toBe('from 2021 (end not recorded)');
    expect(roleStatedIn(records, data.claims[0])).toBeUndefined();
  });
  it('produces stable finite positions, including singleton and empty graphs', () => {
    const d = repository.data;
    // The layout is quadratic in the records drawn, and the app never draws
    // more than mapLimits.focused.records; the whole dataset's map is
    // withheld. Lay out a fixed, well-linked sample twice that size: the
    // records with the most claims, ties by ID, and the claims among them.
    const degree = new Map<string, number>();
    for (const c of d.claims)
      for (const id of [
        c.subject,
        c.object.kind === 'entity' ? c.object.entityId : '',
      ])
        if (id) degree.set(id, (degree.get(id) ?? 0) + 1);
    const sample = [...d.entities]
      .sort(
        (a, b) =>
          (degree.get(b.id) ?? 0) - (degree.get(a.id) ?? 0) ||
          a.id.localeCompare(b.id),
      )
      .slice(0, mapLimits.focused.records * 2);
    const sampled = new Set(sample.map((e) => e.id));
    const among = d.claims.filter(
      (c) =>
        sampled.has(c.subject) &&
        c.object.kind === 'entity' &&
        sampled.has(c.object.entityId),
    );
    const first = networkLayout(sample, among, d.meta.anchors, null);
    expect(first.size).toBe(sample.length);
    expect(among.length).toBeGreaterThan(sample.length);
    expect(first).toEqual(networkLayout(sample, among, d.meta.anchors, null));
    expect(
      [...first.values()].every(
        (p) => Number.isFinite(p.x) && Number.isFinite(p.y),
      ),
    ).toBe(true);
    expect(networkLayout([], [], d.meta.anchors, null).size).toBe(0);
    // A centred map pins its focus at the origin.
    expect(
      networkLayout([d.entities[0]], [], d.meta.anchors, d.entities[0].id).get(
        d.entities[0].id,
      ),
    ).toEqual({ x: 0, y: 0 });
  });
});
describe('map readability', () => {
  const all = { ...filters, throughYear: 9999 };
  it('withholds the map for the whole dataset', () => {
    expect(mapReadable(queryDataset(repository.data, all), false)).toBe(false);
  });
  it('draws every core institution’s direct connections', () => {
    for (const focusId of repository.data.meta.anchors)
      expect(
        mapReadable(queryDataset(repository.data, { ...all, focusId }), true),
      ).toBe(true);
  });
  it('applies both limits, higher for a map centred on one record', () => {
    const { unfocused, focused } = mapLimits;
    expect(focused.records).toBeGreaterThan(unfocused.records);
    expect(focused.relationships).toBeGreaterThan(unfocused.relationships);
    const entities = (n: number) => Array.from({ length: n }, () => ({}));
    expect(
      mapReadable(
        { entities: entities(unfocused.records + 1), claims: [] },
        false,
      ),
    ).toBe(false);
    expect(
      mapReadable({ entities: entities(unfocused.records), claims: [] }, false),
    ).toBe(true);
    expect(
      mapReadable(
        { entities: entities(unfocused.records + 1), claims: [] },
        true,
      ),
    ).toBe(true);
    expect(
      mapReadable(
        { entities: entities(focused.records + 1), claims: [] },
        true,
      ),
    ).toBe(false);
  });
});
