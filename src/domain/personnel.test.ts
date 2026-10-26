import { describe, expect, it } from 'vitest';
import { repository } from './repository';
import { queryDataset, timeLabel } from './query';
import { datasetSchema } from './schema';

const filters = {
  topic: 'all',
  entityType: 'all',
  throughYear: 2024,
  focusId: null,
} as const;
const claim = (id: string) => repository.data.claims.find((c) => c.id === id)!;

describe('personnel and institutional history', () => {
  it('shows Dario at both institutions through distinct direct claims, without a lab transition edge', () => {
    const result = queryDataset(repository.data, {
      ...filters,
      focusId: 'dario-amodei',
      topic: 'people',
    });
    expect(result.entities.map((e) => e.id).sort()).toEqual([
      'anthropic',
      'dario-amodei',
      'openai',
    ]);
    expect(result.claims).toHaveLength(4);
    expect(result.claims.every((c) => c.subject === 'dario-amodei')).toBe(true);
    expect(
      result.claims
        .filter(
          (c) =>
            c.object.kind === 'entity' && c.object.entityId === 'anthropic',
        )
        .map((c) => c.predicate)
        .sort(),
    ).toEqual(['co_founded', 'held_role']);
    expect(
      repository.data.claims.some(
        (c) =>
          c.subject === 'openai' &&
          c.object.kind === 'entity' &&
          ['anthropic', 'xai'].includes(c.object.entityId),
      ),
    ).toBe(false);
  });
  it('keeps a sourced interval after its end in cumulative history, without making it a current role', () => {
    const id = 'ng-brain-lead-2011-2012';
    expect(timeLabel(claim(id))).toBe('2011 → 2012');
    for (const [year, present] of [
      [2010, false],
      [2011, true],
      [2013, true],
    ] as const) {
      const result = queryDataset(repository.data, {
        ...filters,
        throughYear: year,
        focusId: 'andrew-ng',
      });
      expect(result.claims.some((c) => c.id === id)).toBe(present);
    }
    expect(claim('dario-openai-vp-2020').time.kind).toBe('snapshot');
    expect(claim('daniela-openai-safety-prior').time.kind).toBe('unknown');
  });
  it('keeps the public departure announcement distinct from a role snapshot or last working day', () => {
    const departure = claim('dario-openai-departure-announced-2020');
    expect(departure.time).toMatchObject({ kind: 'event', date: '2020-12-29' });
    expect(claim('dario-openai-vp-2020').time.kind).toBe('snapshot');
    expect(departure.attributes?.role).toBeTruthy();
    const data = structuredClone(repository.data);
    const record = data.claims.find((c) => c.id === departure.id)!;
    record.time = {
      kind: 'interval',
      from: '2020',
      note: 'Synthetic unsupported boundary',
    };
    expect(datasetSchema.safeParse(data).success).toBe(false);
    record.time = departure.time;
    delete record.attributes!.role;
    expect(datasetSchema.safeParse(data).success).toBe(false);
  });
  it('distinguishes an acquisition, an internal unit and a later combination', () => {
    expect(claim('google-acquired-deepmind-2014')).toMatchObject({
      subject: 'google',
      predicate: 'acquired',
      object: { entityId: 'deepmind' },
      time: { kind: 'event', date: '2014' },
    });
    expect(claim('brain-unit-google-research-2017')).toMatchObject({
      subject: 'google-brain',
      predicate: 'unit_of',
      object: { entityId: 'google-research' },
      time: { kind: 'snapshot' },
    });
    // The 2026-10-17 lab genealogy's combinations (io, xAI, Tongyi) are
    // checked with its own records.
    const combinations = repository.data.claims.filter(
      (c) => c.predicate === 'combined_into' && !c.id.startsWith('lg-'),
    );
    expect(combinations.map((c) => c.subject).sort()).toEqual([
      'deepmind',
      'google-brain',
    ]);
    expect(
      combinations.every(
        (c) =>
          c.object.kind === 'entity' && c.object.entityId === 'google-deepmind',
      ),
    ).toBe(true);
  });
  it.each(['co_founded', 'launched', 'acquired'] as const)(
    'rejects a snapshot masquerading as %s',
    (predicate) => {
      const data = structuredClone(repository.data);
      data.claims.find((c) => c.predicate === predicate)!.time = {
        kind: 'snapshot',
        date: '2023',
        note: 'Synthetic test',
      };
      expect(datasetSchema.safeParse(data).success).toBe(false);
    },
  );
  it('permits unknown publication dates without borrowing access dates', () => {
    const source = repository.data.sources.find(
      (s) => s.id === 'source-olah-bio',
    )!;
    expect(source.publicationDate).toBeNull();
    expect(source.accessedAt).toBeTruthy();
    expect(datasetSchema.safeParse(repository.data).success).toBe(true);
  });
});
