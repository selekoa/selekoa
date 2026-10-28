import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { repository } from '../domain/repository';
import { pageMeta, pagePaths } from './pages';
import { pageFile } from './page-html';
import { renderNotFound, renderPage } from './render';

const data = repository.data;
const template = readFileSync('index.html', 'utf8');
const base = 'https://example.org/';

/** The text of the rendered application root, with entities decoded. */
function rootText(html: string) {
  const root = html.slice(html.indexOf('<div id="root"'));
  return root
    .replace(/<[^>]+>/g, ' ')
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ');
}
const flat = (text: string) => text.replace(/\s+/g, ' ').trim();

async function page(path: string) {
  const html = await renderPage(path, template, base);
  expect(html, path).not.toBeNull();
  return { html: html!, text: rootText(html!) };
}

describe('the pages the build writes', () => {
  const paths = pagePaths(data);

  it('covers every record page, collection and hub, once each', () => {
    expect(new Set(paths).size).toBe(paths.length);
    const count = (prefix: string) =>
      paths.filter((p) => p.startsWith(prefix)).length;
    const of = (type: string) =>
      data.entities.filter((e) => e.type === type).length;
    expect(count('/claim/')).toBe(data.claims.length);
    expect(count('/person/')).toBe(of('person'));
    expect(count('/document/')).toBe(of('document'));
    expect(count('/dossier/')).toBe(of('organisation'));
    for (const path of [
      '/',
      '/governance',
      '/ideas',
      '/institutions',
      '/about',
      '/search',
      '/explore',
      '/documents/frontier-safety-frameworks',
      '/control/openai',
      '/commitments/external-commitments',
      '/propositions/superintelligence',
      '/question/anthropic-formation',
      '/question/frameworks-to-obligations',
    ])
      expect(paths).toContain(path);
  });

  it('gives every page a title and a description', () => {
    for (const path of paths) {
      const meta = pageMeta(data, path);
      expect(meta, path).not.toBeNull();
      expect(meta!.title).toMatch(/Selekoa/);
      expect(meta!.description.length).toBeGreaterThan(20);
      expect(meta!.description.length).toBeLessThanOrEqual(200);
    }
  });

  it('writes each page to a file Cloudflare Pages serves at its path', () => {
    expect(pageFile('/')).toBe('index.html');
    expect(pageFile('/person/jan-leike')).toBe('person/jan-leike.html');
    expect(pageFile('/about')).toBe('about.html');
  });
});

describe('a pre-rendered page carries its record without JavaScript', () => {
  it('a person page: name, description, dated claims, canonical address', async () => {
    const person = repository.entities.get('jan-leike')!;
    const { html, text } = await page('/person/jan-leike');
    expect(html).toContain('<title>Jan Leike · Selekoa</title>');
    expect(html).toContain(
      '<link rel="canonical" href="https://example.org/person/jan-leike" />',
    );
    expect(html).toContain('data-path="/person/jan-leike"');
    expect(html).not.toContain('<noscript>');
    expect(text).toContain(flat(person.description));
    const claims = data.claims.filter((c) => c.subject === person.id);
    expect(claims.length).toBeGreaterThan(0);
    for (const claim of claims) expect(text).toContain(flat(claim.statement));
  });

  it('a sample of claim pages: statement, qualification, sources, review state', async () => {
    const sample = data.claims.filter((_, i) => i % 97 === 0);
    for (const claim of sample) {
      const { html, text } = await page('/claim/' + claim.id);
      expect(html).toContain(
        `<link rel="canonical" href="https://example.org/claim/${claim.id}" />`,
      );
      expect(text, claim.id).toContain(flat(claim.statement));
      expect(text, claim.id).toContain(flat(claim.qualification));
      expect(text, claim.id).toContain('Record ID ' + claim.id);
      expect(text, claim.id).toMatch(/Editorial status/);
      for (const id of claim.evidenceIds) {
        const source = repository.sources.get(
          repository.evidence.get(id)!.sourceId,
        )!;
        expect(text, claim.id).toContain(flat(source.title));
      }
    }
  });

  it('a dossier, a document and a collection page', async () => {
    const dossier = await page('/dossier/anthropic');
    expect(dossier.html).toContain(
      '<title>Anthropic: institutional dossier · Selekoa</title>',
    );
    expect(dossier.text).toContain('Anthropic');
    const document = await page('/document/rsp-v2-0');
    expect(document.text).toContain(
      flat(repository.entities.get('rsp-v2-0')!.name),
    );
    const history = await page('/documents/frontier-safety-frameworks');
    expect(history.text).toContain('Frontier safety frameworks');
  });

  it('gives each hub page its research subtitle', async () => {
    const subtitles = {
      '/governance': 'Frontier AI governance',
      '/ideas': 'Human thought and institutions around machine intelligence',
      '/institutions': 'The institutional history of machine intelligence',
    };
    for (const [path, subtitle] of Object.entries(subtitles)) {
      const { html } = await page(path);
      expect(html).toContain(`<p class="hub-subtitle">${subtitle}</p>`);
    }
    const ideas = await page('/ideas');
    expect(ideas.text).toContain(
      'Institutions here are the forums, journals, mailing lists and organisations where the debates took place.',
    );
    const governance = await page('/governance');
    expect(governance.html).not.toContain('hub-scope-note');
    const institutions = await page('/institutions');
    expect(institutions.text).toContain('Chinese AI histories');
    expect(institutions.text).not.toMatch(/priority/i);
  });

  it('links between pages with real paths, never hash addresses', async () => {
    for (const path of ['/', '/person/jan-leike', '/governance']) {
      const { html } = await page(path);
      expect(html).not.toMatch(/href="#\//);
      expect(html).toMatch(/href="\/(person|dossier|governance|about)/);
    }
  });

  it('opens no page for an address that names no record', async () => {
    expect(await renderPage('/person/missing', template, base)).toBeNull();
    const missing = await renderNotFound(template);
    expect(missing).toContain('<meta name="robots" content="noindex" />');
    expect(missing).not.toContain('rel="canonical"');
    expect(missing).not.toContain('data-path=');
    expect(rootText(missing)).toContain('does not match any record');
  });
});
