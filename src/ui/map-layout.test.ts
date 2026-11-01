import { describe, expect, it, vi } from 'vitest';
import { repository } from '../domain/repository';
import { queryDataset } from '../domain/query';
import { siteFacts } from '../domain/site-facts';
import type { Claim, Entity } from '../domain/schema';
import { layoutKey, networkLayout, readLayout, storeLayout } from './layout';
import { mapLayouts } from '../prerender/render';
import { layoutsWaiting, placeRecords } from './map-layout';
import { mapLayoutPath } from '../domain/slices';

const data = repository.data;
const { anchors } = data.meta;
const relatedToAnthropic = (c: Claim) =>
  c.subject === 'anthropic' ||
  (c.object.kind === 'entity' && c.object.entityId === 'anthropic');
const around = (focusId: string, throughYear = 9999) =>
  queryDataset(data, { topic: 'all', throughYear, entityType: 'all', focusId });

describe('stored map layouts', () => {
  it('keys a layout by its records alone, in any order', () => {
    const view = around('anthropic');
    const key = layoutKey(view.entities, view.claims, anchors, 'anthropic');
    expect(
      layoutKey(
        [...view.entities].reverse(),
        [...view.claims, ...view.claims].reverse(),
        anchors,
        'anthropic',
      ),
    ).toBe(key);
    // Another focus, a record fewer or a pair fewer is another layout.
    expect(layoutKey(view.entities, view.claims, anchors, null)).not.toBe(key);
    const leaf = view.entities.find((e) => e.id !== 'anthropic')!;
    expect(
      layoutKey(
        view.entities.filter((e) => e !== leaf),
        view.claims,
        anchors,
        'anthropic',
      ),
    ).not.toBe(key);
    const pairs = view.claims.filter(
      (c) =>
        c.object.kind === 'entity' &&
        (c.subject === leaf.id || c.object.entityId === leaf.id),
    );
    expect(
      layoutKey(
        view.entities,
        view.claims.filter((c) => !pairs.includes(c)),
        anchors,
        'anthropic',
      ),
    ).not.toBe(key);
  });

  it("keeps a neighbourhood's layout when records are added around another record", () => {
    // A later release adds a record joined to OpenAI only. OpenAI's map
    // changes; Anthropic's records, their pairs and so their positions do not.
    const latest = siteFacts(data).years[0];
    const anthropic = around('anthropic', latest);
    const added = {
      ...data.entities.find((e) => e.type === 'person')!,
      id: 'zz-added',
    } as Entity;
    const joined = data.claims.find(
      (c) =>
        c.subject !== 'anthropic' &&
        c.object.kind === 'entity' &&
        c.object.entityId === 'openai' &&
        !relatedToAnthropic(c),
    )!;
    const claim = {
      ...joined,
      id: 'zz-added-claim',
      subject: added.id,
    } as Claim;
    const grown = {
      ...data,
      entities: [...data.entities, added],
      claims: [...data.claims, claim],
    };
    const at = (focusId: string, d = data) =>
      queryDataset(d, {
        topic: 'all',
        throughYear: latest,
        entityType: 'all',
        focusId,
      });
    const before = at('anthropic'),
      after = at('anthropic', grown);
    const key = (v: typeof before, f: string) =>
      layoutKey(v.entities, v.claims, anchors, f);
    expect(key(after, 'anthropic')).toBe(key(before, 'anthropic'));
    expect(
      networkLayout(after.entities, after.claims, anchors, 'anthropic'),
    ).toEqual(
      networkLayout(anthropic.entities, anthropic.claims, anchors, 'anthropic'),
    );
    expect(key(at('openai', grown), 'openai')).not.toBe(
      key(at('openai'), 'openai'),
    );
    expect(at('openai', grown).entities.some((e) => e.id === 'zz-added')).toBe(
      true,
    );
    expect(
      networkLayout(after.entities, after.claims, anchors, 'anthropic').get(
        'anthropic',
      ),
    ).toEqual({ x: 0, y: 0 });
  });

  it('stores positions to a tenth of a unit', () => {
    const view = around('anthropic');
    const positions = networkLayout(
      view.entities,
      view.claims,
      anchors,
      'anthropic',
    );
    const read = readLayout(storeLayout('k', positions));
    expect([...read.keys()].sort()).toEqual([...positions.keys()].sort());
    for (const [id, p] of positions) {
      expect(Math.abs(read.get(id)!.x - p.x)).toBeLessThanOrEqual(0.05);
      expect(Math.abs(read.get(id)!.y - p.y)).toBeLessThanOrEqual(0.05);
    }
  });

  it('writes the map each dossier and person page draws, beside the slices', () => {
    const latest = siteFacts(data).years[0];
    const dossier = mapLayouts('/dossier/openai')!;
    expect(dossier.file).toBe('/slices/map/dossier/openai.json');
    const view = around('openai', latest);
    expect(dossier.layouts.layouts).toHaveLength(1);
    const [stored] = dossier.layouts.layouts;
    expect(stored.key).toBe(
      layoutKey(view.entities, view.claims, anchors, 'openai'),
    );
    expect(stored.ids).toEqual(view.entities.map((e) => e.id).sort());
    const person = data.entities.find(
      (e) => e.type === 'person' && around(e.id).entities.length > 3,
    )!;
    const personMap = mapLayouts(`/person/${person.id}`)!;
    expect(personMap.file).toBe(mapLayoutPath(person));
    expect(personMap.layouts.layouts[0].key).toBe(
      layoutKey(
        around(person.id).entities,
        around(person.id).claims,
        anchors,
        person.id,
      ),
    );
    expect(mapLayouts('/document/rsp-v2-0')).toBeNull();
    expect(mapLayouts('/claim/dario-anthropic-2021')).toBeNull();
    expect(mapLayouts('/dossier/openai/x')).toBeNull();
  });
});

describe('layouts computed in the page', () => {
  // Node has no Worker: layouts are computed in the page, one per task.
  const small = (focusId: string) => around(focusId);
  it('lays out a map without a worker, seeded by nothing', async () => {
    const view = small('anthropic');
    const placed = await placeRecords(
      view.entities,
      view.claims,
      anchors,
      'anthropic',
      null,
    );
    expect(placed.source).toBe('page');
    expect(placed.seed).toBeNull();
    expect(placed.positions).toEqual(
      networkLayout(view.entities, view.claims, anchors, 'anthropic'),
    );
  });

  it('drops a layout no map wants any more before it starts', async () => {
    const first = small('openai'),
      second = small('google-deepmind');
    const wanted = new AbortController();
    // Queued behind a layout being computed, then no longer wanted.
    const busy = placeRecords(
      small('xai').entities,
      small('xai').claims,
      anchors,
      'xai',
      null,
    );
    const dropped = placeRecords(
      first.entities,
      first.claims,
      anchors,
      'openai',
      null,
      wanted.signal,
    );
    const kept = placeRecords(
      second.entities,
      second.claims,
      anchors,
      'google-deepmind',
      null,
    );
    await Promise.resolve();
    wanted.abort();
    await expect(dropped).rejects.toMatchObject({ name: 'AbortError' });
    expect((await kept).positions.size).toBe(second.entities.length);
    expect((await busy).source).toBe('page');
    // Asked again, the dropped layout is computed afresh.
    expect(
      (
        await placeRecords(
          first.entities,
          first.claims,
          anchors,
          'openai',
          null,
        )
      ).positions.size,
    ).toBe(first.entities.length);
  });

  it('drops a layout whose map changed while its stored layouts loaded', async () => {
    const view = small('anthropic');
    let answer!: (r: Response) => void;
    const fetching = new Promise<Response>((resolve) => (answer = resolve));
    const fetch = vi.spyOn(globalThis, 'fetch').mockReturnValue(fetching);
    try {
      const wanted = new AbortController();
      const placing = placeRecords(
        view.entities,
        view.claims.slice(1),
        anchors,
        'anthropic',
        '/slices/map/dossier/anthropic.json',
        wanted.signal,
      );
      wanted.abort();
      answer(new Response(JSON.stringify({ version: 'x', layouts: [] })));
      await expect(placing).rejects.toMatchObject({ name: 'AbortError' });
      expect(layoutsWaiting()).toBe(0);
    } finally {
      fetch.mockRestore();
    }
  });
});
