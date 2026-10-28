import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import {
  latestReleaseVersion,
  publishedDataFiles,
  readSiteConfig,
  siteModule,
} from '../../scripts/site-config.ts';
import { archiveName } from '../../scripts/release-zip.ts';
import {
  contentType,
  dataLicenceFiles,
  llmsTxt,
  type ReleaseManifest,
} from './machine-readable';
import { contactPlaceholder, sitemapXml, type SiteConfig } from './site-config';

const version = latestReleaseVersion()!;
const dir = `release/v${version}`;
const manifest = JSON.parse(
  readFileSync(`${dir}/manifest.json`, 'utf8'),
) as ReleaseManifest & { files: { path: string; sha256: string }[] };
const config = readSiteConfig();

/** The files the production build emits, through the plugin's own hook. */
function emitted() {
  const files = new Map<string, Buffer | string>();
  const hook = siteModule().generateBundle as unknown as (this: {
    emitFile: (f: { fileName: string; source: Buffer | string }) => void;
  }) => void;
  hook.call({ emitFile: (f) => void files.set(f.fileName, f.source) });
  return files;
}

describe('data files', () => {
  const files = emitted();

  it('publishes every file of the latest release under data/, byte for byte', () => {
    expect(version).toBe(manifest.version);
    for (const name of [
      'manifest.json',
      ...manifest.files.map((f) => f.path),
    ]) {
      const source = files.get(`data/${name}`);
      expect(source, name).toBeInstanceOf(Buffer);
      expect(
        Buffer.compare(source as Buffer, readFileSync(`${dir}/${name}`)),
      ).toBe(0);
    }
    for (const { path, sha256 } of manifest.files)
      expect(
        createHash('sha256')
          .update(files.get(`data/${path}`) as Buffer)
          .digest('hex'),
      ).toBe(sha256);
  });

  it('publishes the licence files beside them, as in the dataset archive', () => {
    for (const name of dataLicenceFiles)
      expect(
        Buffer.compare(files.get(`data/${name}`) as Buffer, readFileSync(name)),
      ).toBe(0);
  });

  it('publishes nothing else under data/', () => {
    const published = [...files.keys()].filter((f) => f.startsWith('data/'));
    expect(published).toEqual(
      publishedDataFiles().files.map((f) => f.fileName),
    );
    expect(published).toHaveLength(
      manifest.files.length + 1 + dataLicenceFiles.length,
    );
  });

  it('leaves the sitemap to the page build, which lists every page', () => {
    // scripts/prerender.ts writes it; src/prerender/prerender.test.ts checks it.
    expect(files.has('sitemap.xml')).toBe(false);
  });
});

describe('llms.txt', () => {
  const open: SiteConfig = {
    indexing: true,
    baseUrl: 'https://example.org/',
    contact: 'corrections@example.org',
    analytics: { provider: 'none', cloudflareToken: '', goatcounterCode: '' },
  };
  const text = llmsTxt(open, manifest);

  it('follows the llms.txt layout: a title, a summary and link sections', () => {
    expect(text).toMatch(
      /^# Selekoa\n\n> A documentary history of machine intelligence\.\n/,
    );
    expect(text).toContain('Selekoa is a machine-first starting point');
    expect(text).toMatch(/\n## Data: dataset release v\d+\.\d+\.\d+ /);
    expect(text).toContain('\n## Optional\n');
  });

  it('links to the data files, the archive, About & method and the citation guidance', () => {
    for (const name of [
      'README.md',
      'manifest.json',
      'claims.json',
      'entities.json',
      'evidence.json',
      'sources.json',
      'collections.json',
      'sources.csl.json',
      'LICENSE-DATA.txt',
    ])
      expect(text).toContain(`](https://example.org/data/${name})`);
    expect(text).toContain(
      `](https://example.org/release/${archiveName(`v${manifest.version}`)})`,
    );
    expect(text).toContain('[About & method](https://example.org/about)');
    expect(text).toContain('[How to cite](https://example.org/data/README.md)');
    expect(text).toContain('corrections@example.org');
  });

  it('says the pages are readable without JavaScript and gives their address patterns', () => {
    expect(text).toContain('Every page is built as plain HTML');
    expect(text).not.toContain('#/');
    for (const pattern of [
      'claim/<claim-id>',
      'person/<person-id>',
      'document/<document-id>',
      'dossier/<organisation-id>',
      'documents/<id>',
      'compare/<id>',
      'control/<id>',
      'commitments/<id>',
      'propositions/<id>',
      'question/<id>',
    ])
      expect(text).toContain('`https://example.org/' + pattern + '`');
    expect(text).toContain('[sitemap](https://example.org/sitemap.xml)');
  });

  it('states the limits of the records and of the licence', () => {
    expect(text).toContain('machine-checked');
    expect(text).toContain('not been reviewed by an editor');
    expect(text).toContain('Coverage is selective');
    expect(text).toContain('CC BY 4.0');
    expect(text).toMatch(/Quoted source passages .* are excluded/);
  });

  it('omits a placeholder contact and uses relative links without a base address', () => {
    const closed = llmsTxt(
      { ...open, baseUrl: '', contact: contactPlaceholder },
      manifest,
    );
    expect(closed).not.toContain(contactPlaceholder);
    expect(closed).toContain('](data/claims.json)');
  });

  it('is built from the live settings with absolute links once indexing is on', () => {
    const live = String(emitted().get('llms.txt'));
    if (config.indexing)
      expect(live).toContain(`](${config.baseUrl}data/claims.json)`);
  });
});

describe('sitemap', () => {
  it('lists the pages, start page first, and then the plain files', () => {
    const xml = sitemapXml(
      { ...config, baseUrl: 'https://example.org/' },
      ['/', '/person/jan-leike'],
      ['llms.txt', 'data/claims.json'],
    );
    expect(xml.match(/<loc>[^<]+<\/loc>/g)).toEqual([
      '<loc>https://example.org/</loc>',
      '<loc>https://example.org/person/jan-leike</loc>',
      '<loc>https://example.org/llms.txt</loc>',
      '<loc>https://example.org/data/claims.json</loc>',
    ]);
  });
});

describe('data headers', () => {
  // A rule is a path line followed by indented "Name: value" lines.
  const rules = new Map<string, Record<string, string>>();
  let current: Record<string, string> = {};
  for (const line of readFileSync('public/_headers', 'utf8').split('\n')) {
    if (!line.trim() || line.trimStart().startsWith('#')) continue;
    if (!/^\s/.test(line)) rules.set(line.trim(), (current = {}));
    else {
      const [, name, value] = /^\s+([^:]+):\s*(.+)$/.exec(line)!;
      current[name] = value.trim();
    }
  }

  it('caches data files for a day and lets any origin read them and llms.txt', () => {
    for (const path of ['/data/*', '/llms.txt']) {
      expect(rules.get(path)?.['Cache-Control']).toBe('public, max-age=86400');
      expect(rules.get(path)?.['Access-Control-Allow-Origin']).toBe('*');
    }
    expect(rules.get('/data/*')?.['Content-Type']).toBeUndefined();
    expect(rules.get('/llms.txt')?.['Content-Type']).toBe(
      contentType('llms.txt'),
    );
  });

  it('gives every published data file its UTF-8 content type, and no other file one', () => {
    const typed = [...rules.keys()].filter(
      (p) => p.startsWith('/data/') && p !== '/data/*',
    );
    const published = publishedDataFiles().files.map((f) => '/' + f.fileName);
    expect(typed.sort()).toEqual([...published].sort());
    for (const path of published)
      expect(rules.get(path)?.['Content-Type'], path).toBe(contentType(path));
  });
});
