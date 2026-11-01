// Measures how long built pages take to load and answer input on a phone
// profile: Playwright's Chromium, cold cache, 390 × 844, CPU slowed 4×,
// DevTools' "Fast 3G" network (562.5 ms round trip, 1.44 Mbit/s down,
// 675 kbit/s up). dist/ is served by a local server that maps /x to x.html
// and compresses with brotli at quality 5, close to the live host; requests
// to other hosts (the analytics beacon) are blocked. Timings vary between
// machines and runs, so this is not part of `pnpm check`; the results are
// recorded with each stage (docs/data-loading-design-c.md).
//   tsx scripts/measure-load.ts [--runs 3] [--fast] [path ...]
//   tsx scripts/measure-load.ts --clicks [--runs 3] [--fast]
//   tsx scripts/measure-load.ts --map [--runs 3] [--fast] [path ...]
// --fast measures without throttling. --clicks measures changes of page
// made in the page (`flows` below) instead of first loads: the first page
// is loaded and left quiet, then the link is tapped; the time is from the
// tap until the next page is drawn (its address and its content), and the
// bytes are those transferred from the tap until the network has been quiet
// for two seconds. --map measures pages that open with a map (`maps`
// below): the time until the map is first drawn (its drawing layer holds
// the records' symbols), and that time less the time the page answers.
import { existsSync, readFileSync, statSync } from 'node:fs';
import { createServer, type Server } from 'node:http';
import path from 'node:path';
import { brotliCompressSync, constants } from 'node:zlib';
import { chromium, type Page } from '@playwright/test';

const dist = path.resolve('dist');
const args = process.argv.slice(2);
const runs = Number(args[args.indexOf('--runs') + 1]) || 3;
const fast = args.includes('--fast');
const defaults = [
  '/',
  '/dossier/openai',
  '/person/jan-leike',
  '/document/rsp-v2-0',
  '/claim/dario-anthropic-2021',
  '/search#q=responsible scaling',
  '/explore',
];
const pages = args.filter(
  (a, i) => a.startsWith('/') && args[i - 1] !== '--runs',
);
const clicks = args.includes('--clicks');
const maps = args.includes('--map');
/** Pages that open with a drawn map, measured with --map. */
const mapPages = [
  '/dossier/openai?view=map',
  '/dossier/anthropic?view=map',
  '/explore#q=preparedness&view=map',
];
/** Changes of page measured with --clicks: from, the link tapped, then. */
const flows = [
  {
    name: 'Dossier → claim (panel)',
    from: '/dossier/openai',
    link: 'main a[data-claim-link]',
    to: (href: string) => `/dossier/openai?inspect=${href.split('/').pop()}`,
    drawn: '#inspector h2, #inspector h3',
  },
  {
    name: 'Claim → person',
    from: '/claim/dario-anthropic-2021',
    link: 'main a[href="/person/dario-amodei"]',
    to: () => '/person/dario-amodei',
    drawn: '#record-page h1',
  },
  {
    name: 'Hub → guide',
    from: '/governance',
    link: 'main a[href="/guide/frontier-frameworks-and-law"]',
    to: () => '/guide/frontier-frameworks-and-law',
    drawn: '#guide h1',
  },
];

const types: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml',
  '.woff2': 'font/woff2',
};
const compressed = new Map<string, Buffer>();

function file(pathname: string): string | null {
  const name = decodeURIComponent(pathname).replace(/^\/+/, '');
  for (const candidate of [
    name || 'index.html',
    `${name}.html`,
    path.join(name, 'index.html'),
  ]) {
    const full = path.join(dist, candidate);
    if (full.startsWith(dist) && existsSync(full) && statSync(full).isFile())
      return full;
  }
  return null;
}

function serve(): Promise<Server> {
  const server = createServer((req, res) => {
    const url = new URL(req.url ?? '/', 'http://localhost');
    const found = file(url.pathname);
    const target = found ?? path.join(dist, '404.html');
    let body = compressed.get(target);
    if (!body) {
      body = brotliCompressSync(readFileSync(target), {
        params: { [constants.BROTLI_PARAM_QUALITY]: 5 },
      });
      compressed.set(target, body);
    }
    res.writeHead(found ? 200 : 404, {
      'Content-Type': types[path.extname(target)] ?? 'application/octet-stream',
      'Content-Encoding': 'br',
      'Cache-Control': 'no-cache',
    });
    res.end(body);
  });
  return new Promise((resolve) =>
    server.listen(0, '127.0.0.1', () => resolve(server)),
  );
}

type Run = {
  firstPaint: number;
  interactive: number;
  results: number | null;
  map: number | null;
  blocking: number;
  blockingAfter: number;
  transferred: number;
  heap: number;
};

// Recorded in the page from its first script: when the page answers input
// (the marker the app sets), when search results appear, and long tasks.
const probe = () => {
  const w = window as unknown as Record<string, unknown>;
  w.__long = [] as [number, number][];
  new PerformanceObserver((list) => {
    for (const e of list.getEntries())
      (w.__long as [number, number][]).push([e.startTime, e.duration]);
  }).observe({ type: 'longtask', buffered: true });
  new MutationObserver(() => {
    if (
      w.__ready === undefined &&
      document.documentElement.hasAttribute('data-selekoa-ready')
    )
      w.__ready = performance.now();
    if (
      w.__results === undefined &&
      document.querySelector('.search-page-results .search-hit')
    )
      w.__results = performance.now();
    if (
      w.__map === undefined &&
      document.querySelector('svg.map-drawing')?.childElementCount
    )
      w.__map = performance.now();
  }).observe(document, { attributes: true, childList: true, subtree: true });
};

async function measure(page: Page, url: string, search: boolean, map = false) {
  const cdp = await page.context().newCDPSession(page);
  let transferred = 0;
  await cdp.send('Network.enable');
  cdp.on('Network.loadingFinished', (e) => {
    transferred += e.encodedDataLength;
  });
  await cdp.send('Performance.enable');
  if (!fast) {
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
    await cdp.send('Network.emulateNetworkConditions', {
      offline: false,
      latency: 562.5,
      downloadThroughput: 1_440_000 / 8,
      uploadThroughput: 675_000 / 8,
    });
  }
  await page.goto(url, { waitUntil: 'commit' });
  await page.waitForFunction(
    () => (window as unknown as { __ready?: number }).__ready !== undefined,
    null,
    { timeout: 120_000, polling: 100 },
  );
  if (search)
    await page.waitForFunction(
      () =>
        (window as unknown as { __results?: number }).__results !== undefined,
      null,
      { timeout: 120_000, polling: 100 },
    );
  if (map)
    await page.waitForFunction(
      () => (window as unknown as { __map?: number }).__map !== undefined,
      null,
      { timeout: 120_000, polling: 100 },
    );
  await page.waitForTimeout(500);
  const timings = await page.evaluate(() => {
    const w = window as unknown as {
      __ready: number;
      __results?: number;
      __map?: number;
      __long: [number, number][];
    };
    const paint = performance
      .getEntriesByType('paint')
      .find((e) => e.name === 'first-paint');
    return {
      firstPaint: paint?.startTime ?? NaN,
      interactive: w.__ready,
      results: w.__results ?? null,
      map: w.__map ?? null,
      blocking: w.__long
        .filter(([start]) => start < w.__ready)
        .reduce((sum, [, duration]) => sum + Math.max(0, duration - 50), 0),
      // Long tasks after the page answers, until the map is drawn and half
      // a second after: time in which the page does not answer input.
      blockingAfter: w.__long
        .filter(
          ([start]) =>
            start >= w.__ready && start < (w.__map ?? w.__ready) + 500,
        )
        .reduce((sum, [, duration]) => sum + Math.max(0, duration - 50), 0),
    };
  });
  const { metrics } = await cdp.send('Performance.getMetrics');
  const heap = metrics.find((m) => m.name === 'JSHeapUsedSize')?.value ?? 0;
  return { ...timings, transferred, heap } satisfies Run;
}

/**
 * One change of page made in the page: load `from` as `measure` does, wait
 * for the network to be quiet, tap the link and wait until the next page is
 * drawn at its address.
 */
async function measureClick(page: Page, origin: string, flow: Flow) {
  const cdp = await page.context().newCDPSession(page);
  let transferred = 0;
  let last = Date.now();
  let open = 0;
  await cdp.send('Network.enable');
  cdp.on('Network.requestWillBeSent', () => {
    open += 1;
    last = Date.now();
  });
  const done = () => {
    open = Math.max(0, open - 1);
    last = Date.now();
  };
  cdp.on('Network.loadingFailed', done);
  cdp.on('Network.loadingFinished', (e) => {
    transferred += e.encodedDataLength;
    done();
  });
  if (!fast) {
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
    await cdp.send('Network.emulateNetworkConditions', {
      offline: false,
      latency: 562.5,
      downloadThroughput: 1_440_000 / 8,
      uploadThroughput: 675_000 / 8,
    });
  }
  const quiet = async () => {
    while (open > 0 || Date.now() - last < 2000) await page.waitForTimeout(100);
  };
  await page.goto(origin + flow.from, { waitUntil: 'commit' });
  await page.waitForFunction(
    () => (window as unknown as { __ready?: number }).__ready !== undefined,
    null,
    { timeout: 120_000, polling: 100 },
  );
  await quiet();
  const link = page.locator(flow.link).first();
  await link.scrollIntoViewIfNeeded();
  const to = flow.to((await link.getAttribute('href')) ?? '');
  await page.evaluate(
    ([address, drawn]) => {
      const w = window as unknown as Record<string, number | undefined>;
      document.addEventListener(
        'pointerdown',
        () => (w.__tapped = performance.now()),
        { capture: true, once: true },
      );
      // Written inline: tsx names declared functions with a helper the page
      // does not have.
      new MutationObserver(() => {
        if (w.__drawn !== undefined) return;
        if (
          location.pathname + location.search === address &&
          document.querySelector(drawn)
        )
          w.__drawn = performance.now();
      }).observe(document, {
        childList: true,
        subtree: true,
      });
    },
    [to, flow.drawn] as const,
  );
  transferred = 0;
  await link.tap();
  await page.waitForFunction(
    () => (window as unknown as { __drawn?: number }).__drawn !== undefined,
    null,
    { timeout: 120_000, polling: 100 },
  );
  await quiet();
  const time = await page.evaluate(() => {
    const w = window as unknown as { __drawn: number; __tapped: number };
    return w.__drawn - w.__tapped;
  });
  return { time, transferred };
}
type Flow = (typeof flows)[number];

async function mainClicks() {
  const server = await serve();
  const { port } = server.address() as { port: number };
  const origin = `http://127.0.0.1:${port}`;
  const browser = await chromium.launch({
    executablePath: process.env.PLAYWRIGHT_CHROMIUM || undefined,
  });
  const rows: string[] = [];
  try {
    for (const flow of flows) {
      const results: { time: number; transferred: number }[] = [];
      for (let i = 0; i < runs; i++) {
        const context = await browser.newContext({
          viewport: { width: 390, height: 844 },
          deviceScaleFactor: 2,
          isMobile: true,
          hasTouch: true,
        });
        await context.route(
          (url) => url.origin !== origin,
          (route) => route.abort(),
        );
        await context.addInitScript(probe);
        results.push(await measureClick(await context.newPage(), origin, flow));
        await context.close();
      }
      const time = median(results.map((r) => r.time)).toFixed(0);
      const kb = (median(results.map((r) => r.transferred)) / 1024).toFixed(0);
      rows.push(`| ${flow.name} | ${time} | ${kb} KB |`);
      console.error(
        rows.at(-1),
        results.map((r) => r.time.toFixed(0)).join(' '),
      );
    }
  } finally {
    await browser.close();
    server.close();
  }
  console.log(
    [
      `Profile: ${fast ? 'unthrottled' : '4× CPU, Fast 3G'}, 390 × 844, median of ${runs}; milliseconds from the tap until the next page is drawn.`,
      '',
      '| Change of page | Drawn after | Transferred |',
      '| -------------- | ----------: | ----------: |',
      ...rows,
    ].join('\n'),
  );
}

const median = (values: number[]) => {
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.floor(sorted.length / 2)];
};

async function main() {
  if (!existsSync(path.join(dist, 'index.html')))
    throw new Error('No dist/; run pnpm build');
  const server = await serve();
  const { port } = server.address() as { port: number };
  const origin = `http://127.0.0.1:${port}`;
  // A Chromium other than Playwright's own, if given (PLAYWRIGHT_CHROMIUM).
  const browser = await chromium.launch({
    executablePath: process.env.PLAYWRIGHT_CHROMIUM || undefined,
  });
  const rows: string[] = [];
  try {
    for (const target of pages.length ? pages : maps ? mapPages : defaults) {
      const results: Run[] = [];
      for (let i = 0; i < runs; i++) {
        const context = await browser.newContext({
          viewport: { width: 390, height: 844 },
          deviceScaleFactor: 2,
          isMobile: true,
          hasTouch: true,
        });
        await context.route(
          (url) => url.origin !== origin,
          (route) => route.abort(),
        );
        await context.addInitScript(probe);
        const page = await context.newPage();
        results.push(
          await measure(
            page,
            origin + target,
            target.startsWith('/search') && target.includes('#q='),
            maps,
          ),
        );
        await context.close();
      }
      const m = (key: keyof Run) =>
        median(results.map((r) => r[key] ?? NaN)).toFixed(0);
      const kb = (median(results.map((r) => r.transferred)) / 1024).toFixed(0);
      const heap = (median(results.map((r) => r.heap)) / 1024 / 1024).toFixed(
        0,
      );
      const resultsAt = results[0].results === null ? '' : m('results');
      if (maps) {
        const after = median(
          results.map((r) => (r.map ?? NaN) - r.interactive),
        ).toFixed(0);
        rows.push(
          `| \`${target}\` | ${m('interactive')} | ${m('map')} | ${after} | ${m('blockingAfter')} | ${kb} KB |`,
        );
        console.error(
          rows.at(-1),
          results
            .map((r) => `${r.interactive.toFixed(0)}/${r.map?.toFixed(0)}`)
            .join(' '),
        );
        continue;
      }
      rows.push(
        `| \`${target}\` | ${m('firstPaint')} | ${m('interactive')} | ${resultsAt} | ${m('blocking')} | ${kb} KB | ${heap} MB |`,
      );
      console.error(rows.at(-1));
    }
  } finally {
    await browser.close();
    server.close();
  }
  if (maps) {
    console.log(
      [
        `Profile: ${fast ? 'unthrottled' : '4× CPU, Fast 3G'}, 390 × 844, cold cache, median of ${runs}; milliseconds.`,
        '',
        '| Page | Interactive | Map drawn | Map after interactive | Blocking after | Transferred |',
        '| ---- | ----------: | --------: | --------------------: | -------------: | ----------: |',
        ...rows,
      ].join('\n'),
    );
    return;
  }
  console.log(
    [
      `Profile: ${fast ? 'unthrottled' : '4× CPU, Fast 3G'}, 390 × 844, cold cache, median of ${runs}; milliseconds.`,
      '',
      '| Page | First paint | Interactive | Results | Blocking | Transferred | JS heap |',
      '| ---- | ----------: | ----------: | ------: | -------: | ----------: | ------: |',
      ...rows,
    ].join('\n'),
  );
}

if (!existsSync(path.join(dist, 'index.html')))
  throw new Error('No dist/; run pnpm build');
await (clicks ? mainClicks() : main());
