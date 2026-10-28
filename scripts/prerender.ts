// Writes every page as HTML into dist/ after the client build, with the page
// renderer built by `vite build --ssr` (src/prerender/render.tsx), then the
// not-found page and, with indexing on, sitemap.xml. A page at /person/x is
// written to person/x.html, which Cloudflare Pages serves at /person/x.
// See docs/architecture.md ("Addresses and pre-rendered pages").
import {
  mkdirSync,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { sitemapXml } from '../src/site/site-config.ts';
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

export async function prerender({
  dist = 'dist',
  renderer = 'dist-ssr/render.js',
} = {}) {
  const started = performance.now();
  const config = readSiteConfig();
  const render: Renderer = await import(
    pathToFileURL(path.resolve(renderer)).href
  );
  const template = readFileSync(path.join(dist, 'index.html'), 'utf8');
  if (template.includes('data-path='))
    throw new Error(
      `${dist}/index.html is already a built page; rebuild first`,
    );
  const paths = render.paths();
  for (const page of paths) {
    const html = await render.renderPage(page, template, config.baseUrl);
    if (html === null) throw new Error(`No page for ${page}`);
    const file = path.join(dist, render.pageFile(page));
    mkdirSync(path.dirname(file), { recursive: true });
    writeFileSync(file, html);
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
    pages: paths.length,
    seconds: (performance.now() - started) / 1000,
    ...measure(dist),
  };
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const result = await prerender();
  console.log(
    `Pre-rendered ${result.pages} pages in ${result.seconds.toFixed(1)} s. ` +
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
