import { afterEach, describe, expect, it } from 'vitest';
import { corePath, slicePath, type PlacedSlice } from '../domain/slices';
import type { Dataset } from '../domain/schema';
import {
  dataHeld,
  holdRecords,
  loadData,
  provideParts,
  provideRecords,
  repository,
  repositoryOf,
} from './records';

/**
 * How the browser holds parts (src/ui/records.ts): a slice that stands alone
 * is held by itself; one that says `core` is held only with the relation
 * core, and a part that fails is tried again (docs/data-loading-design-c.md,
 * stage c4). The files are stubs.
 */
const empty = { entities: [], sources: [], evidence: [] };
const at = { entities: [], sources: [], evidence: [] };
const core: PlacedSlice = {
  version: 'v',
  ...empty,
  claims: [
    { id: 'a', subject: 'x' },
    { id: 'b', subject: 'y' },
  ],
  at: { ...at, claims: [0, 1] },
};
const alone: PlacedSlice = {
  version: 'v',
  ...empty,
  claims: [{ id: 'a', subject: 'x', statement: 'A' }],
  at: { ...at, claims: [0] },
};
const withCore: PlacedSlice = {
  version: 'v',
  core: true,
  ...empty,
  claims: [{ id: 'a', statement: 'A' }],
  at: { ...at, claims: [0] },
};
const page = '/dossier/x';
const file = slicePath(page)!;

function stub(files: Record<string, PlacedSlice | (() => PlacedSlice)>) {
  const fetched: string[] = [];
  provideParts(async (url) => {
    fetched.push(url);
    const found = files[url];
    if (!found) throw new Error(`no ${url}`);
    return typeof found === 'function' ? found() : found;
  });
  return fetched;
}
const ids = () => repository.data.claims.map((c) => c.id);

afterEach(() => holdRecords(null));

describe('parts held in the browser', () => {
  it('holds a slice that stands alone without the core', async () => {
    holdRecords(null);
    const fetched = stub({ [file]: alone });
    await loadData(page);
    expect(fetched).toEqual([file]);
    expect(dataHeld(page)).toBe(true);
    expect(ids()).toEqual(['a']);
    expect(repository.claims.get('a')?.statement).toBe('A');
  });

  it('holds a slice that says core only with the core', async () => {
    holdRecords(null);
    const fetched = stub({ [file]: withCore, [corePath]: core });
    await loadData(page);
    expect(fetched).toEqual([file, corePath]);
    expect(dataHeld(page)).toBe(true);
    expect(ids()).toEqual(['a', 'b']);
    expect(repository.claims.get('a')).toMatchObject({
      subject: 'x',
      statement: 'A',
    });
  });

  it('tries a part again when its core failed, and serves the whole records meanwhile', async () => {
    holdRecords(null);
    let coreFails = true;
    const fetched = stub({
      [file]: withCore,
      [corePath]: () => {
        if (coreFails) throw new Error('offline');
        return core;
      },
    });
    const whole = repositoryOf({
      meta: {} as Dataset['meta'],
      ...empty,
      claims: [{ id: 'whole' }],
    } as unknown as Dataset);
    let wholeLoads = 0;
    provideRecords(async () => {
      wholeLoads += 1;
      if (wholeLoads === 1) throw new Error('offline too');
      return whole;
    });
    const errors = console.error;
    console.error = () => {};
    try {
      await expect(loadData(page)).rejects.toThrow();
      expect(dataHeld(page)).toBe(false);
      coreFails = false;
      await loadData(page);
    } finally {
      console.error = errors;
    }
    // The slice and the core were fetched again rather than given up.
    expect(fetched).toEqual([file, corePath, file, corePath]);
    expect(dataHeld(page)).toBe(true);
    expect(ids()).toEqual(['a', 'b']);
  });
});
