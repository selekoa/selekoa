import { describe, expect, it } from 'vitest';
import { repository } from './repository';
import {
  mapLimits,
  mapReadable,
  queryDataset,
  searchEntities,
  timeLabel,
  type Filters,
} from './query';
import { networkLayout } from '../ui/layout';
import { relationshipClaims } from './query';

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
    // commitments. The 2026-10-17 lab genealogy adds its Anthropic records.
    expect(result.claims.filter((c) => !c.id.startsWith('lg-')).length).toBe(
      41,
    );
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
    expect(
      result.claims
        .filter((c) => c.time.kind !== 'unknown')
        .map((c) => c.id)
        .sort(),
    ).toEqual(['good-authorship-1965', 'good-discusses-explosion-1965']);
    expect(result.claims.filter((c) => c.time.kind === 'unknown')).toEqual(
      repository.data.claims.filter((c) => c.time.kind === 'unknown'),
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
    expect(timeLabel(repository.data.claims[0])).toContain('snapshot');
    expect(
      timeLabel({
        ...repository.data.claims[0],
        time: { kind: 'interval', from: '2021', note: 'Test' },
      }),
    ).toBe('2021 → End unknown');
  });
  it('produces stable finite positions, including singleton and empty graphs', () => {
    const d = repository.data;
    const first = networkLayout(d.entities, d.claims, d.meta.anchors, null);
    expect(first).toEqual(
      networkLayout(d.entities, d.claims, d.meta.anchors, null),
    );
    expect(
      [...first.values()].every(
        (p) => Number.isFinite(p.x) && Number.isFinite(p.y),
      ),
    ).toBe(true);
    expect(networkLayout([], [], d.meta.anchors, null).size).toBe(0);
    expect(
      networkLayout([d.entities[0]], [], d.meta.anchors, d.entities[0].id).get(
        d.entities[0].id,
      ),
    ).toEqual(first.get(d.entities[0].id));
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
