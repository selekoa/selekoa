// Build-time site facts: a small virtual module for the interface, the launch
// settings applied to index.html, robots.txt, llms.txt, the licence files and
// the latest release's data files served beside the site. The pages and
// sitemap.xml are written after the build (scripts/prerender.ts).
// Derived on every build and dev load; never tracked.
import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import type { Plugin } from 'vite';
import {
  contentType,
  dataLicenceFiles,
  dataPaths,
  llmsTxt,
  type ReleaseManifest,
} from '../src/site/machine-readable.ts';
import {
  hasContact,
  isPublic,
  launchProblems,
  robotsTxt,
  siteConfigSchema,
  transformHtml,
  type SiteConfig,
} from '../src/site/site-config.ts';

const moduleId = 'virtual:site';
const resolvedId = '\0' + moduleId;

/** Reads and validates site.config.json (SELEKOA_SITE_CONFIG names another file, for trial builds). */
export function readSiteConfig(
  file = process.env.SELEKOA_SITE_CONFIG ?? 'site.config.json',
): SiteConfig {
  return siteConfigSchema.parse(JSON.parse(readFileSync(file, 'utf8')));
}

/** The newest release directory's version, from the tracked releases. */
export function latestReleaseVersion(root = 'release') {
  const versions = readdirSync(root)
    .filter((n) => /^v\d+\.\d+\.\d+$/.test(n))
    .map((n) => n.slice(1))
    .sort((a, b) => {
      const [x, y] = [a.split('.').map(Number), b.split('.').map(Number)];
      return x[0] - y[0] || x[1] - y[1] || x[2] - y[2];
    });
  return versions.at(-1) ?? null;
}

/**
 * Licence texts and notices served beside the site, as plain text, so the
 * About page can link to them. Published path -> repository file.
 */
export const legalFiles: Record<string, string> = {
  'legal/LICENSING.txt': 'LICENSING.md',
  'legal/LICENSE.txt': 'LICENSE',
  'legal/LICENSE-DATA.txt': 'LICENSE-DATA.txt',
  'legal/THIRD-PARTY-NOTICES.txt': 'THIRD-PARTY-NOTICES.md',
};

/**
 * The latest release's files, published under data/ byte for byte, with the
 * licence files from the repository root as in the dataset archive. Empty
 * before the first release.
 */
export function publishedDataFiles(root = 'release') {
  const version = latestReleaseVersion(root);
  if (!version) return { manifest: null, files: [] };
  const dir = path.join(root, `v${version}`);
  const manifest = JSON.parse(
    readFileSync(path.join(dir, 'manifest.json'), 'utf8'),
  ) as ReleaseManifest;
  const files = dataPaths(manifest).map((fileName) => {
    const name = fileName.slice('data/'.length);
    const source = dataLicenceFiles.includes(name)
      ? name
      : path.join(dir, name);
    return { fileName, source: readFileSync(source) };
  });
  return { manifest, files };
}

/** Plain files at the site root and under data/, by published path. */
export function machineReadableFiles(config: SiteConfig, root = 'release') {
  const { manifest, files } = publishedDataFiles(root);
  if (!manifest) return [];
  return [
    { fileName: 'llms.txt', source: Buffer.from(llmsTxt(config, manifest)) },
    ...files,
  ];
}

export function siteModule(): Plugin {
  const config = readSiteConfig();
  let building = false;
  return {
    name: 'selekoa-site',
    configResolved(resolved) {
      building = resolved.command === 'build';
    },
    buildStart() {
      const problems = launchProblems(config);
      if (building && problems.length)
        this.error(
          'site.config.json is not ready for a public build:\n- ' +
            problems.join('\n- '),
        );
    },
    resolveId: (id) => (id === moduleId ? resolvedId : undefined),
    load(id) {
      if (id !== resolvedId) return;
      const info = {
        releaseVersion: latestReleaseVersion(),
        // The address reaches the page only once it is a real one.
        contact: hasContact(config) ? config.contact : null,
        analytics: config.analytics.provider,
        indexing: config.indexing,
        isLive: isPublic(config),
      };
      return Object.entries(info)
        .map(([k, v]) => `export const ${k} = ${JSON.stringify(v)};`)
        .join('\n');
    },
    transformIndexHtml: (html) => transformHtml(html, config),
    generateBundle() {
      // The page renderer's bundle carries no site files.
      if (this.environment?.config.consumer === 'server') return;
      const plain = machineReadableFiles(config);
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: robotsTxt(config),
      });
      for (const file of plain) this.emitFile({ type: 'asset', ...file });
      for (const [fileName, source] of Object.entries(legalFiles))
        this.emitFile({
          type: 'asset',
          fileName,
          source: readFileSync(source, 'utf8'),
        });
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = (req.url ?? '').replace(/^\//, '');
        const plain = machineReadableFiles(config).find(
          (f) => f.fileName === url,
        );
        if (plain) {
          res.setHeader('Content-Type', contentType(url));
          return res.end(plain.source);
        }
        const source = legalFiles[url];
        if (!source) return next();
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.end(readFileSync(source, 'utf8'));
      });
    },
  };
}
