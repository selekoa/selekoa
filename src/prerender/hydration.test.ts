import { StrictMode, createElement } from 'react';
import { renderToReadableStream } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import App from '../App';
import { repository } from '../domain/repository';
import {
  holdParts,
  holdRecords,
  loadClaim,
  loadData,
  partsFor,
  provideParts,
  repository as held,
} from '../ui/records';
import { renderSettled, sameAtWidths, widthQueries } from '../ui/client';
import {
  bucketPath,
  corePath,
  mergeSlices,
  slicePath,
  type PlacedSlice,
} from '../domain/slices';
import { checkSlice, core, renderSlice } from './render';
import { memorySearchSource } from '../ui/memory-search';
import { provideSearch } from '../ui/search-source';
import { browserData } from './browser-data';
import { pagePaths } from './pages';
import { riskDebate } from '../reading/risk-debate';
import { propositionFrames } from '../reading/proposition-frames';

/**
 * A built page is taken over in the browser only if the browser's first
 * render, with the records it has loaded by then, gives the HTML the build
 * wrote with the whole dataset. Each page in the sample is rendered both
 * ways. See docs/data-loading-design-c.md ("Hydration identity").
 */

const data = repository.data;

/** Every collection, hub and fixed page, and every 40th record page. */
function sample(paths: string[]) {
  const records = /^\/(dossier|person|document|claim|year)\//;
  const byType = new Map<string, string[]>();
  for (const p of paths.filter((p) => records.test(p))) {
    const type = p.split('/')[1];
    byType.set(type, [...(byType.get(type) ?? []), p]);
  }
  return [
    ...paths.filter((p) => !records.test(p)),
    ...[...byType.values()].flatMap((list) =>
      list.filter((_, i) => i % 40 === 0 || i === list.length - 1),
    ),
  ];
}

/** The application markup of a page rendered with the records given. */
async function render(path: string) {
  const stream = await renderToReadableStream(
    createElement(StrictMode, null, createElement(App, { address: path })),
    {
      onError(error) {
        throw error;
      },
    },
  );
  await stream.allReady;
  return new Response(stream).text();
}

/**
 * The identity checks draw pages over the whole dataset, so their time grows
 * with it; after the 2026-10-31 admissions they exceed the default 60 s on
 * four processors under load. The time limit is a test runner setting, not
 * a size budget.
 */
const IDENTITY_TIMEOUT = 300_000;

describe('hydration identity', () => {
  const paths = sample(pagePaths(data));

  it('samples every type of page', () => {
    for (const prefix of [
      '/dossier/',
      '/person/',
      '/document/',
      '/claim/',
      '/question/',
      '/year/',
      '/years',
      '/',
    ])
      expect(
        paths.some((p) => p.startsWith(prefix)),
        prefix,
      ).toBe(true);
  });

  it(
    'renders each sampled page alike from what the browser holds',
    async () => {
      provideSearch(memorySearchSource(repository));
      for (const path of paths) {
        const held = browserData(path);
        if (held === 'slice') {
          const sliced = (await renderSlice(path))!;
          expect(sliced.html.built.length, path).toBeGreaterThan(1000);
          expect(await checkSlice(path, sliced.slice, sliced.html), path).toBe(
            true,
          );
          continue;
        }
        holdRecords(repository);
        const full = await render(path);
        holdRecords(held === 'none' ? null : repository);
        try {
          expect(await render(path), path).toBe(full);
        } finally {
          holdRecords(repository);
        }
        expect(full.length, path).toBeGreaterThan(1000);
      }
    },
    IDENTITY_TIMEOUT,
  );

  it(
    "renders pages alike from their slices held with other pages' slices",
    async () => {
      const sliced = paths.filter((p) => browserData(p) === 'slice');
      const slices = new Map<string, Awaited<ReturnType<typeof renderSlice>>>();
      for (const path of sliced) slices.set(path, await renderSlice(path));
      // Each page with the slices of the next three in the sample, as after a
      // visit that read them first.
      for (const [i, path] of sliced.entries()) {
        const others = Object.fromEntries(
          [1, 2, 3].map((k) => {
            const other = sliced[(i + k) % sliced.length];
            return [other, slices.get(other)!.slice];
          }),
        );
        const own = slices.get(path)!;
        expect(await checkSlice(path, own.slice, own.html, others), path).toBe(
          true,
        );
      }
    },
    IDENTITY_TIMEOUT,
  );

  it(
    'draws pages from the merged files the browser fetches',
    async () => {
      // A claim bucket holds the slices of every claim hashed to it, and the
      // three hubs share one file: each page is drawn from the whole file.
      const all = pagePaths(data);
      for (const file of [
        slicePath('/governance')!,
        bucketPath('dario-anthropic-2021'),
      ]) {
        const pages = all.filter((p) => slicePath(p) === file);
        expect(pages.length, file).toBeGreaterThan(2);
        const drawn = [];
        for (const page of pages) drawn.push((await renderSlice(page))!);
        const merged = mergeSlices(drawn.map((d) => d.slice));
        for (const [i, page] of pages.entries())
          expect(await checkSlice(page, merged, drawn[i].html), page).toBe(
            true,
          );
      }
    },
    IDENTITY_TIMEOUT,
  );

  it(
    'opens claim panels from their buckets as from the whole dataset',
    async () => {
      renderSettled(1440);
      try {
        for (const path of [
          '/dossier/openai',
          '/person/jan-leike',
          '/document/rsp-v2-0',
          '/question/anthropic-formation',
          '/explore',
        ]) {
          const page = (await renderSlice(path))!;
          const claims = page.slice.claims
            .map((c) => c.id!)
            .filter((_, i) => i % 25 === 0);
          for (const id of claims) {
            const address = `${path}?inspect=${id}`;
            holdRecords(repository);
            const full = await render(address);
            const bucket = (await renderSlice(`/claim/${id}`))!;
            holdRecords(null);
            // The relation core only when a slice says it needs it.
            holdParts({
              ...(page.slice.core || bucket.slice.core
                ? { [corePath]: core() }
                : {}),
              [path]: page.slice,
              [bucketPath(id)]: bucket.slice,
            });
            try {
              expect(await render(address), address).toBe(full);
            } finally {
              holdRecords(repository);
            }
          }
        }
      } finally {
        renderSettled(false);
      }
    },
    IDENTITY_TIMEOUT,
  );

  it(
    "draws a propositions page's text from its whole collection, which no other page loads",
    async () => {
      // The browser's shared code holds only the collection's frame
      // (src/reading/proposition-frames.ts); the page loads the rest.
      const frame = propositionFrames.find((f) => f.id === riskDebate.id)!;
      expect('limits' in frame).toBe(false);
      const sliced = (await renderSlice('/propositions/risk-debate'))!;
      for (const text of [
        riskDebate.exchanges![0].title,
        riskDebate.searchNote.venues[0].period,
      ])
        expect(sliced.html.built, text).toContain(text);
      expect(
        await checkSlice(
          '/propositions/risk-debate',
          sliced.slice,
          sliced.html,
        ),
      ).toBe(true);
    },
    IDENTITY_TIMEOUT,
  );

  it('opens pages by links and by back and forward as a fresh load of their address', async () => {
    // A walk through one page of every type with a slice and the search
    // page, then back through it. At each step the page left holds its slice
    // and a claim panel's bucket; the next page is opened as a link opens it
    // (src/ui/page-visits.ts) and drawn as the browser first draws it after
    // mounting the workspace afresh, then compared with its drawing from the
    // whole dataset and with what a fresh load of its address holds.
    const walk = [
      '/governance',
      '/guide/frontier-frameworks-and-law',
      '/dossier/openai',
      '/claim/dario-anthropic-2021',
      '/person/jan-leike',
      '/document/rsp-v2-0',
      '/documents/frontier-safety-frameworks',
      '/compare/frontier-safety-frameworks',
      '/compare/model-cards',
      '/compare/laws-compared',
      '/predictions/predictions-on-record',
      '/commitments/external-commitments',
      '/question/anthropic-formation',
      '/propositions/economics-of-machine-intelligence',
      '/year/2023',
      '/search',
      '/explore',
      '/about',
      '/institutions',
    ];
    const all = pagePaths(data);
    const control = all.find((p) => p.startsWith('/control/'))!;
    walk.splice(8, 0, control);
    for (const page of walk) expect(all, page).toContain(page);
    const files = new Map<string, PlacedSlice>();
    const drawn = new Map<string, Awaited<ReturnType<typeof renderSlice>>>();
    for (const page of walk) {
      const sliced = await renderSlice(page);
      drawn.set(page, sliced);
      if (sliced) files.set(slicePath(page)!, sliced.slice);
    }
    const panel = (page: string) =>
      drawn.get(page)?.slice.claims.find((c) => c.id)?.id;
    for (const page of walk) {
      const id = panel(page);
      if (id && !files.has(bucketPath(id)))
        files.set(bucketPath(id), (await renderSlice(`/claim/${id}`))!.slice);
    }
    provideParts(async (url) => {
      const file = files.get(url);
      if (!file) throw new Error(`no ${url}`);
      return file;
    });
    const steps = [
      ...walk.slice(1).map((next, i) => [walk[i], next]),
      ...walk
        .slice(0, -1)
        .reverse()
        .map((back, i) => [walk[walk.length - 1 - i], back]),
    ];
    try {
      for (const [from, to] of steps) {
        holdRecords(null);
        await loadData(from);
        const id = panel(from);
        if (id) await loadClaim(id);
        (await partsFor(to))();
        const opened = JSON.stringify(held.data);
        holdRecords(null);
        await loadData(to);
        expect(opened === JSON.stringify(held.data), `${from} → ${to}`).toBe(
          true,
        );
        (await partsFor(to))();
        const full = drawn.get(to)?.html;
        for (const width of [1440, 390] as const) {
          renderSettled(width);
          const html = await render(to);
          if (full)
            expect(html, `${from} → ${to} at ${width}`).toBe(
              width === 1440 ? full.wide : full.narrow,
            );
          else {
            holdRecords(repository);
            const whole = await render(to);
            (await partsFor(to))();
            expect(html, `${from} → ${to} at ${width}`).toBe(whole);
          }
        }
        renderSettled(false);
      }
    } finally {
      renderSettled(false);
      holdRecords(repository);
    }
  });

  it('draws a page once for both widths only when it is the same at both', async () => {
    holdRecords(repository);
    provideSearch(memorySearchSource(repository));
    const differing: string[] = [];
    try {
      for (const path of paths) {
        renderSettled(1440);
        widthQueries.clear();
        const wide = await render(path);
        if (!sameAtWidths(1440, 390)) {
          differing.push(path);
          continue;
        }
        renderSettled(390);
        expect(await render(path), path).toBe(wide);
      }
    } finally {
      renderSettled(false);
    }
    // The pages that ask the width are drawn at each.
    expect(differing).toEqual(
      expect.arrayContaining([
        '/search',
        '/compare/frontier-safety-frameworks',
      ]),
    );
  });
});
