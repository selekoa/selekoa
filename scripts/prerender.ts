// Writes every page as HTML into dist/ after the client build, with the page
// renderer built by `vite build --ssr` (src/prerender/render.tsx), then the
// not-found page and, with indexing on, sitemap.xml. A page at /person/x is
// written to person/x.html, which Cloudflare Pages serves at /person/x.
// See docs/architecture.md ("Addresses and pre-rendered pages").
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { availableParallelism, totalmem } from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} from 'node:worker_threads';
import { sitemapXml } from '../src/site/site-config.ts';
import { filesLoaded, type Manifest } from '../src/site/bundle-budget.ts';
import { pageCodeOf, readingModulesOf } from '../src/ui/page-files.ts';
import {
  dataNeeds,
  mergeSlices,
  slicePath,
  type PlacedSlice,
} from '../src/domain/slices.ts';
import { machineReadableFiles, readSiteConfig } from './site-config.ts';

type Renderer = typeof import('../src/prerender/render.tsx');

/** The deployment's file count and size, for the host's limits. */
export function measure(dir: string) {
  let files = 0;
  let bytes = 0;
  const walk = (d: string) => {
    for (const name of readdirSync(d)) {
      const file = path.join(d, name);
      const stat = statSync(file);
      if (stat.isDirectory()) walk(file);
      else {
        files += 1;
        bytes += stat.size;
      }
    }
  };
  walk(dir);
  return { files, bytes };
}

/**
 * Every link in the built pages that stays on the site, by page, whose target
 * is not a built file: a page (`/person/x` → person/x.html) or a plain file
 * (`/data/claims.json`). The query and fragment are ignored.
 */
export function brokenLinks(
  dist: string,
  pages: string[],
  pageFile: (path: string) => string,
) {
  const origin = 'https://site.invalid';
  const exists = (file: string) => {
    try {
      return statSync(path.join(dist, file)).isFile();
    } catch {
      return false;
    }
  };
  const broken: { page: string; href: string }[] = [];
  for (const page of pages) {
    const html = readFileSync(path.join(dist, pageFile(page)), 'utf8');
    for (const [, raw] of html.matchAll(/\shref="([^"]*)"/g)) {
      const href = raw.replaceAll('&amp;', '&');
      if (href.startsWith('#')) continue;
      const url = new URL(href, origin + page);
      if (url.origin !== origin) continue;
      const target = decodeURIComponent(url.pathname);
      if (exists(target.slice(1)) || exists(pageFile(target))) continue;
      broken.push({ page, href });
    }
  }
  return broken;
}

/** Cloudflare Pages' file limit per deployment, with a margin. */
export const fileBudget = 15_000;

/** What a drawer needs besides the pages: where to write, and how. */
type Setup = {
  dist: string;
  renderer: string;
  template: string;
  baseUrl: string | null;
};
/** A page to draw, by its place among the paths. */
type Job = {
  n: number;
  page: string;
  /** Its opening scripts with the relation core, and without it. */
  modules: { core: string[]; slice: string[] };
};
/** A drawn page's slice, if it has one, and why the slice was refused. */
type Drawn = { n: number; slice: PlacedSlice | null; problem: string | null };

const loadRenderer = async (renderer: string): Promise<Renderer> =>
  import(pathToFileURL(path.resolve(renderer)).href);

/**
 * Draws a page and writes it; with a slice of its own, draws the page again
 * to find the slice and checks it (docs/data-loading-design-c.md).
 */
async function drawPage(
  render: Renderer,
  { dist, template, baseUrl }: Setup,
  { n, page, modules }: Job,
): Promise<Drawn> {
  const body = await render.renderBody(page);
  const sliced = await render.renderSlice(page, body);
  // A page whose slice needs the whole relation core names it among its
  // opening scripts; any other page drawn from a slice does not load it.
  const html = await render.renderPage(
    page,
    template,
    baseUrl,
    sliced && !sliced.slice.core ? modules.slice : modules.core,
    body,
  );
  if (html === null) throw new Error(`No page for ${page}`);
  const file = path.join(dist, render.pageFile(page));
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, html);
  // The layout of the map centred on the page's record, beside the slices.
  const map = render.mapLayouts(page);
  if (map) {
    const target = path.join(dist, map.file.slice(1));
    mkdirSync(path.dirname(target), { recursive: true });
    writeFileSync(target, JSON.stringify(map.layouts));
  }
  if (!sliced) return { n, slice: null, problem: null };
  // renderSlice has checked the slice alone; a slice that needs the core is
  // checked with it.
  const problem = !sliced.slice.core
    ? null
    : await render.checkSlice(page, sliced.slice, sliced.html).then(
        (same) => (same ? null : 'drawn differently'),
        (error: unknown) => String(error).split('\n')[0],
      );
  return { n, slice: sliced.slice, problem };
}

/** Memory a drawing thread takes, with a margin (about 0.2 GB measured). */
const perThread = 0.5e9;

/**
 * Threads drawing pages: `PRERENDER_WORKERS`, or one per processor, at most
 * eight and as many as memory allows (each holds a renderer of its own).
 */
function threads() {
  const given = process.env.PRERENDER_WORKERS;
  if (given) {
    const n = Number(given);
    if (!Number.isInteger(n) || n < 1)
      throw new Error(
        `PRERENDER_WORKERS must be a positive whole number, not "${given}"`,
      );
    return n;
  }
  const memory = Math.min(
    totalmem(),
    process.constrainedMemory?.() || Infinity,
  );
  return Math.max(
    1,
    Math.min(availableParallelism(), 8, Math.floor(memory / perThread) - 1),
  );
}

/** Pages a drawer is given at a time. */
const batch = 16;

/**
 * Draws every page, spread over worker threads (`threads`), each with a
 * renderer of its own; with one, in this thread. Drawing a page depends on
 * nothing but the data and its path, so the pages and slices are the same
 * however they are spread; the results come back in path order.
 */
async function drawAll(
  setup: Setup,
  jobs: Job[],
  progress: (done: number) => void,
): Promise<{ results: Drawn[]; count: number }> {
  const count = Math.max(
    1,
    Math.min(threads(), Math.ceil(jobs.length / batch)),
  );
  const results: Drawn[] = new Array(jobs.length);
  let done = 0;
  if (count === 1) {
    const render = await loadRenderer(setup.renderer);
    for (const job of jobs) {
      results[job.n] = await drawPage(render, setup, job);
      progress(++done);
    }
    return { results, count };
  }
  let next = 0;
  // A thread does not take on the loader running this script (tsx), so it
  // registers it before loading this file.
  const entry =
    `import(${JSON.stringify(import.meta.resolve('tsx/esm/api'))})` +
    `.then((tsx) => { tsx.register(); return import(${JSON.stringify(import.meta.url)}); })`;
  const workers = Array.from(
    { length: count },
    () => new Worker(entry, { eval: true, workerData: { drawer: setup } }),
  );
  try {
    await Promise.all(
      workers.map(
        (worker) =>
          new Promise<void>((resolve, reject) => {
            const give = () => {
              const given = jobs.slice(next, (next += batch));
              if (given.length) worker.postMessage(given);
              else resolve();
            };
            worker.on('message', (drawn: Drawn[] | { error: string }) => {
              if (!Array.isArray(drawn)) return reject(new Error(drawn.error));
              for (const d of drawn) results[d.n] = d;
              done += drawn.length;
              progress(done);
              give();
            });
            worker.on('error', reject);
            worker.on('exit', (code) =>
              reject(new Error(`A drawing thread stopped (${code})`)),
            );
            give();
          }),
      ),
    );
  } finally {
    await Promise.all(workers.map((w) => w.terminate()));
  }
  return { results, count };
}

/** A drawing thread: draws the pages it is given, and sends back their slices. */
async function drawer() {
  const setup = (workerData as { drawer: Setup }).drawer;
  const render = await loadRenderer(setup.renderer);
  parentPort!.on('message', (jobs: Job[]) => {
    void (async () => {
      const drawn: Drawn[] = [];
      for (const job of jobs) drawn.push(await drawPage(render, setup, job));
      return drawn;
    })().then(
      (drawn) => parentPort!.postMessage(drawn),
      (error: unknown) =>
        parentPort!.postMessage({
          error:
            error instanceof Error
              ? (error.stack ?? error.message)
              : String(error),
        }),
    );
  });
}

export async function prerender({
  dist = 'dist',
  renderer = 'dist-ssr/render.js',
} = {}) {
  const started = performance.now();
  const config = readSiteConfig();
  const render = await loadRenderer(renderer);
  const template = readFileSync(path.join(dist, 'index.html'), 'utf8');
  if (template.includes('data-path='))
    throw new Error(
      `${dist}/index.html is already a built page; rebuild first`,
    );
  const paths = render.paths();
  // The scripts each page opens with, named in it so that they load with the
  // entry script rather than after it: the workspace, the page's own code
  // and reading text (a propositions page's collection) and its data (the
  // code that gives a page drawn from its slice its collection index
  // entries, with the relation core when its slice needs it; the core and
  // content of a page drawn from the whole records; on the search page the
  // index).
  const manifestFile = path.join(dist, '.vite', 'manifest.json');
  const manifest: Manifest | null = existsSync(manifestFile)
    ? JSON.parse(readFileSync(manifestFile, 'utf8'))
    : null;
  const inTemplate = new Set(
    [...template.matchAll(/(?:src|href)="\/(assets\/[^"]+)"/g)].map(
      (m) => m[1],
    ),
  );
  const openingModules = (page: string, core: boolean) => {
    if (!manifest || page === '/') return [];
    const keys = [
      'src/Workspace.tsx',
      ...pageCodeOf(page).map((name) => `src/ui/${name}.tsx`),
      ...readingModulesOf(page),
      ...(page === '/search'
        ? ['virtual:search-index', 'src/domain/search-index.ts']
        : [
            ...(core ? ['virtual:records-core'] : []),
            ...(dataNeeds(page).records ? ['virtual:records-content'] : []),
            'src/domain/collection-index.ts',
          ]),
    ];
    return filesLoaded(manifest, keys)
      .filter((file) => file.endsWith('.js') && !inTemplate.has(file))
      .map((file) => `/${file}`);
  };
  // Each page with a slice of its own: the records drawing it reads, checked
  // by drawing it again from them (docs/data-loading-design-c.md). Claim
  // slices are packed into bucket files.
  const slices = new Map<string, PlacedSlice[]>();
  const refused: string[] = [];
  let reported = 0;
  const { results: drawn, count } = await drawAll(
    { dist, renderer, template, baseUrl: config.baseUrl },
    paths.map((page, n) => ({
      n,
      page,
      modules: {
        core: openingModules(page, true),
        slice: openingModules(page, false),
      },
    })),
    (done) => {
      if (done - reported < 1000) return;
      reported = done - (done % 1000);
      console.log(
        `${reported} pages in ${((performance.now() - started) / 1000).toFixed(0)} s`,
        process.env.PRERENDER_MEMORY
          ? `${(process.memoryUsage().heapUsed / 1e9).toFixed(2)} GB`
          : '',
      );
    },
  );
  // Pages drawn from a slice that needs the whole relation core as well.
  const withCore: string[] = [];
  /** The pages each slice file serves (a claim bucket, the hubs). */
  const sharing = new Map<string, string[]>();
  for (const { n, slice, problem } of drawn) {
    const page = paths[n];
    if (problem) refused.push(`${page}: ${problem}`);
    if (!slice) continue;
    if (slice.core) withCore.push(page);
    const target = slicePath(page)!;
    slices.set(target, [...(slices.get(target) ?? []), slice]);
    sharing.set(target, [...(sharing.get(target) ?? []), page]);
  }
  if (refused.length)
    throw new Error(
      `${refused.length} pages draw differently from their slices, such as:\n` +
        refused
          .slice(0, 10)
          .map((p) => `- ${p}`)
          .join('\n'),
    );
  // A page whose own slice stands alone, in a file shared with a page whose
  // slice needs the relation core, loads the core too (src/ui/records.ts):
  // it names the core among its opening scripts.
  for (const [target, parts] of slices) {
    if (parts.length < 2 || !parts.some((p) => p.core)) continue;
    for (const [i, page] of sharing.get(target)!.entries()) {
      if (parts[i].core) continue;
      const html = await render.renderPage(
        page,
        template,
        config.baseUrl,
        openingModules(page, true),
      );
      writeFileSync(path.join(dist, render.pageFile(page)), html!);
    }
  }
  // Every slice names the version of the records its positions hold in.
  const version = render.core().version;
  let sliceBytes = 0;
  for (const [target, parts] of slices) {
    const file = path.join(dist, target.slice(1));
    mkdirSync(path.dirname(file), { recursive: true });
    const json = JSON.stringify({
      ...(parts.length === 1 ? parts[0] : mergeSlices(parts)),
      version,
    });
    sliceBytes += json.length;
    writeFileSync(file, json);
  }
  for (const file of render.pageFiles(config.baseUrl)) {
    const target = path.join(dist, file.path.slice(1));
    mkdirSync(path.dirname(target), { recursive: true });
    writeFileSync(target, file.text);
  }
  writeFileSync(
    path.join(dist, '404.html'),
    await render.renderNotFound(template),
  );
  if (config.indexing)
    writeFileSync(
      path.join(dist, 'sitemap.xml'),
      sitemapXml(
        config,
        paths,
        machineReadableFiles(config).map((f) => f.fileName),
      ),
    );
  const broken = brokenLinks(dist, paths, render.pageFile);
  if (broken.length)
    throw new Error(
      `${broken.length} links in the built pages lead to no built file, such as:\n` +
        broken
          .slice(0, 10)
          .map((b) => `- ${b.page}: ${b.href}`)
          .join('\n'),
    );
  return {
    slices: slices.size,
    sliceBytes,
    withCore,
    pages: paths.length,
    threads: count,
    seconds: (performance.now() - started) / 1000,
    ...measure(dist),
  };
}

if (!isMainThread && (workerData as { drawer?: Setup } | null)?.drawer)
  await drawer();
else if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const result = await prerender();
  console.log(
    `Pre-rendered ${result.pages} pages in ${result.seconds.toFixed(1)} s ` +
      `(${result.threads} thread${result.threads === 1 ? '' : 's'}). ` +
      `${result.slices} slice files, ${(result.sliceBytes / 1e6).toFixed(1)} MB` +
      `; pages that need the whole relation core: ${result.withCore.length}` +
      `${result.withCore.length ? ` (${result.withCore.slice(0, 5).join(', ')}${result.withCore.length > 5 ? ', …' : ''})` : ''}. ` +
      `dist/: ${result.files} files, ${(result.bytes / 1e6).toFixed(1)} MB.`,
  );
  if (result.files > fileBudget) {
    console.error(
      `dist/ has ${result.files} files, over the ${fileBudget}-file budget (host limit 20,000).`,
    );
    process.exit(1);
  }
  // The renderer keeps a scheduler alive; the work is done.
  process.exit(0);
}
