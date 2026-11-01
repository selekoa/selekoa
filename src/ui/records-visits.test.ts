import { afterEach, describe, expect, it } from 'vitest';
import { bucketPath, slicePath, type PlacedSlice } from '../domain/slices';
import {
  holdRecords,
  loadClaim,
  loadData,
  partsFor,
  prefetchParts,
  provideParts,
  repository,
} from './records';

/**
 * How the store changes when a link opens a page from its slice
 * (src/ui/page-visits.ts, docs/data-loading-design-c.md "Navigation"): it
 * then holds what a fresh load of the next page's address holds, and nothing
 * of the page left. The files are stubs.
 */
const at = (n: number[]) => ({
  entities: [],
  sources: [],
  evidence: [],
  claims: n,
});
const empty = { entities: [], sources: [], evidence: [] };
const part = (version: string, ...ids: [string, number][]): PlacedSlice => ({
  version,
  ...empty,
  claims: ids.map(([id]) => ({ id, statement: id.toUpperCase() })),
  at: at(ids.map(([, n]) => n)),
});
const a = '/dossier/a';
const b = '/person/b';
const files: Record<string, PlacedSlice> = {
  [slicePath(a)!]: part('v', ['a1', 0], ['a2', 1]),
  [slicePath(b)!]: part('v', ['b1', 2]),
  [bucketPath('x')]: part('v', ['x', 3]),
  [bucketPath('y')]: part('v', ['y', 4]),
};

function stub(slow: Record<string, Promise<void>> = {}) {
  const fetched: string[] = [];
  provideParts(async (url) => {
    fetched.push(url);
    await slow[url];
    const found = files[url];
    if (!found) throw new Error(`no ${url}`);
    return found;
  });
  return fetched;
}
const held = () => JSON.stringify(repository.data);
/** What a fresh load of an address holds. */
async function fresh(address: string) {
  holdRecords(null);
  stub();
  await loadData(address);
  return held();
}

afterEach(() => holdRecords(null));

describe('opening a page from its slice', () => {
  it('holds what a fresh load holds, without the page left or its claim panels', async () => {
    for (const next of [b, `${b}?inspect=y`, a]) {
      const expected = await fresh(next);
      holdRecords(null);
      stub();
      await loadData(`${a}?inspect=x`);
      await loadClaim('y');
      (await partsFor(next))();
      expect(held(), next).toBe(expected);
    }
  });

  it('holds nothing on the search page, as a fresh load does', async () => {
    holdRecords(null);
    stub();
    await loadData(a);
    (await partsFor('/search#q=x'))();
    expect(repository.data.claims).toEqual([]);
    expect(repository.data.meta).toBeUndefined();
  });

  it('never holds a claim bucket asked for by the page left', async () => {
    holdRecords(null);
    let release = () => {};
    const slow = new Promise<void>((resolve) => (release = resolve));
    stub({ [bucketPath('x')]: slow });
    await loadData(a);
    const panel = loadClaim('x');
    (await partsFor(b))();
    release();
    await panel;
    expect(repository.data.claims.map((c) => c.id)).toEqual(['b1']);
  });

  it('drops the files fetched for the page left, and keeps the page opened', async () => {
    holdRecords(null);
    const fetched = stub();
    await loadData(a);
    await loadClaim('x');
    (await partsFor(b))();
    await loadClaim('x');
    (await partsFor(b))();
    expect(fetched).toEqual([
      slicePath(a),
      bucketPath('x'),
      slicePath(b),
      bucketPath('x'),
    ]);
  });

  it('prefetches a page without holding it, and fetches it once', async () => {
    holdRecords(null);
    const fetched = stub();
    await loadData(a);
    const before = held();
    prefetchParts(b);
    prefetchParts(b);
    // Pages that need the whole records prefetch nothing.
    prefetchParts('/question/q?section=s');
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(held()).toBe(before);
    (await partsFor(b))();
    expect(fetched).toEqual([slicePath(a), slicePath(b)]);
  });

  it('refuses pages that need the whole records, and parts of different versions', async () => {
    holdRecords(null);
    stub();
    await expect(partsFor('/question/q?section=s')).rejects.toThrow();
    await expect(partsFor('/')).rejects.toThrow();
    files[bucketPath('z')] = part('w', ['z', 5]);
    await expect(partsFor(`${b}?inspect=z`)).rejects.toThrow(/versions/);
  });
});
