import { describe, expect, it } from 'vitest';
import { revealRow, type RevealRow } from './reveal-row';
import { preloadPage } from './page-modules';
import { wholePropositions } from './proposition-text';

/**
 * Opening a collection page at a claim's row (`openInCollection` in
 * src/Workspace.tsx) when the collection's text loads slowly: the row is
 * opened once it is drawn, however long the load takes.
 */
function frames() {
  let count = 0;
  const waiting: (() => void)[] = [];
  return {
    nextFrame: (callback: () => void) => {
      waiting.push(callback);
    },
    /** Runs frames until nothing waits for one. */
    async run(limit = 1000) {
      // What awaits the load asks for its first frame meanwhile.
      await new Promise((resolve) => setTimeout(resolve, 0));
      for (let n = 0; waiting.length && n < limit; n += 1) {
        count += 1;
        waiting.shift()!();
        // Let the awaiting code run before the next frame.
        await new Promise((resolve) => setTimeout(resolve, 0));
      }
    },
    get count() {
      return count;
    },
  };
}

function deferred() {
  let resolve!: () => void;
  let reject!: (error: unknown) => void;
  const promise = new Promise<void>((yes, no) => {
    resolve = yes;
    reject = no;
  });
  return { promise, resolve, reject };
}

const row = {} as HTMLElement;

function opening(overrides: Partial<RevealRow> = {}) {
  const calls: string[] = [];
  const clock = frames();
  const options: RevealRow = {
    loaded: Promise.resolve(),
    find: () => row,
    open: (found) => calls.push(found === row ? 'open' : 'other'),
    missing: () => calls.push('missing'),
    current: () => true,
    nextFrame: clock.nextFrame,
    ...overrides,
  };
  return { calls, clock, options };
}

describe('opening a collection page at a row', () => {
  it('waits for a load that takes longer than the frames it waits for the row', async () => {
    const load = deferred();
    let drawn = false;
    const { calls, clock, options } = opening({
      loaded: load.promise,
      find: () => (drawn ? row : null),
    });
    const done = revealRow(options);
    // While the collection's text loads the opening counts no frames, so
    // however long the load takes it does not give up.
    await new Promise((resolve) => setTimeout(resolve, 20));
    expect(clock.count).toBe(0);
    expect(calls).toEqual([]);
    load.resolve();
    await new Promise((resolve) => setTimeout(resolve, 0));
    // The page draws the rows a few frames after the text has loaded.
    await clock.run(3);
    drawn = true;
    await clock.run();
    expect(await done).toBe(true);
    expect(calls).toEqual(['open']);
  });

  it('selects the claim alone when the loaded page draws no such row', async () => {
    const { calls, clock, options } = opening({ find: () => null, frames: 5 });
    const done = revealRow(options);
    await clock.run();
    expect(await done).toBe(false);
    expect(calls).toEqual(['missing']);
    expect(clock.count).toBe(6);
  });

  it('opens the row after a failed load only if the page draws it', async () => {
    const { calls, clock, options } = opening({
      loaded: Promise.reject(new Error('offline')),
      find: () => null,
      frames: 2,
    });
    const done = revealRow(options);
    await clock.run();
    expect(await done).toBe(false);
    expect(calls).toEqual(['missing']);
  });

  it('gives way to a later opening or page', async () => {
    let latest = true;
    const load = deferred();
    const { calls, clock, options } = opening({
      loaded: load.promise,
      current: () => latest,
    });
    const done = revealRow(options);
    latest = false;
    load.resolve();
    await new Promise((resolve) => setTimeout(resolve, 0));
    await clock.run();
    expect(await done).toBe(false);
    expect(calls).toEqual([]);
  });

  it("waits for a propositions page's whole collection, which the page then reads at once", async () => {
    const loaded = preloadPage('/propositions/risk-debate');
    const text = wholePropositions('risk-debate');
    let read: string | undefined;
    const { clock, options } = opening({
      loaded,
      // The page reads the collection with `use`, which returns a settled
      // value at once (src/ui/tracked.ts): the rows are drawn.
      find: () => (text.status === 'fulfilled' ? row : null),
      open: () => {
        read = text.value?.id;
      },
      frames: 0,
    });
    const done = revealRow(options);
    await loaded;
    await new Promise((resolve) => setTimeout(resolve, 0));
    await clock.run();
    expect(await done).toBe(true);
    expect(read).toBe('risk-debate');
  });
});
