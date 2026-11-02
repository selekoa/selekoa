import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import {
  analyticsTag,
  contactPlaceholder,
  launchProblems,
  shareCard,
  robotsTxt,
  siteConfigSchema,
  sitemapXml,
  transformHtml,
  type SiteConfig,
} from './site-config';

const closed: SiteConfig = {
  indexing: false,
  baseUrl: '',
  contact: contactPlaceholder,
  analytics: { provider: 'none', cloudflareToken: '', goatcounterCode: '' },
};
const open: SiteConfig = {
  ...closed,
  indexing: true,
  baseUrl: 'https://example.org/',
  contact: 'corrections@example.org',
};
const html = readFileSync('index.html', 'utf8');

describe('site.config.json', () => {
  const actual = siteConfigSchema.parse(
    JSON.parse(readFileSync('site.config.json', 'utf8')),
  );

  it('is valid and never ships a placeholder contact in a public build', () => {
    // Flipping indexing or analytics on with the placeholder fails here and
    // in the production build.
    expect(launchProblems(actual)).toEqual([]);
  });
});

describe('launch problems', () => {
  it('lets a closed site keep the placeholder contact', () => {
    expect(launchProblems(closed)).toEqual([]);
  });

  it('refuses the placeholder contact once indexing is on', () => {
    const problems = launchProblems({ ...open, contact: contactPlaceholder });
    expect(problems.join()).toContain('placeholder');
  });

  it('refuses the placeholder contact once analytics is on', () => {
    const problems = launchProblems({
      ...closed,
      analytics: {
        provider: 'goatcounter',
        cloudflareToken: '',
        goatcounterCode: 'selekoa',
      },
    });
    expect(problems.join()).toContain('placeholder');
  });

  it('needs an https base address with a trailing slash for indexing', () => {
    expect(launchProblems({ ...open, baseUrl: '' })).not.toEqual([]);
    expect(
      launchProblems({ ...open, baseUrl: 'http://example.org/' }),
    ).not.toEqual([]);
    expect(
      launchProblems({ ...open, baseUrl: 'https://example.org' }),
    ).not.toEqual([]);
    expect(launchProblems(open)).toEqual([]);
  });

  it('needs the provider setting that matches the provider', () => {
    const cloudflare = (token: string): SiteConfig => ({
      ...open,
      analytics: {
        provider: 'cloudflare',
        cloudflareToken: token,
        goatcounterCode: '',
      },
    });
    expect(launchProblems(cloudflare(''))).not.toEqual([]);
    expect(launchProblems(cloudflare('a'.repeat(32)))).toEqual([]);
  });

  it('rejects a contact that is neither the placeholder nor an address', () => {
    expect(() =>
      siteConfigSchema.parse({ ...closed, contact: 'soon' }),
    ).toThrow();
  });
});

describe('index.html transform', () => {
  it('keeps noindex and loads no third-party script when closed', () => {
    const out = transformHtml(html, closed);
    expect(out).toBe(html);
    expect(out).toContain('noindex, nofollow');
    expect(out).not.toMatch(/<script[^>]+src="(https?:)?\/\//);
  });

  it('removes noindex and adds canonical and preview tags when indexing', () => {
    const out = transformHtml(html, open);
    expect(out).not.toContain('noindex');
    expect(out).toContain(
      '<link rel="canonical" href="https://example.org/" />',
    );
    expect(out).toContain('property="og:title"');
    expect(out).toContain('property="og:description"');
    expect(out).toContain(
      '<meta property="og:image" content="https://example.org/og/selekoa-card.png" />',
    );
    expect(out).toContain('<meta property="og:image:width" content="1200" />');
    expect(out).toContain('name="twitter:card" content="summary_large_image"');
  });

  it('ships the share card at the size it declares', () => {
    const png = readFileSync(
      fileURLToPath(
        new URL('../../public/og/selekoa-card.png', import.meta.url),
      ),
    );
    // PNG IHDR: width and height as big-endian 32-bit integers at bytes 16–23.
    expect(png.readUInt32BE(16)).toBe(shareCard.width);
    expect(png.readUInt32BE(20)).toBe(shareCard.height);
  });

  it('adds one analytics script only for the chosen provider', () => {
    const cf = analyticsTag({
      ...closed,
      analytics: {
        provider: 'cloudflare',
        cloudflareToken: 'b'.repeat(32),
        goatcounterCode: '',
      },
    });
    expect(cf).toContain('static.cloudflareinsights.com');
    expect(cf).not.toContain('goatcounter');
    const gc = analyticsTag({
      ...closed,
      analytics: {
        provider: 'goatcounter',
        cloudflareToken: '',
        goatcounterCode: 'selekoa',
      },
    });
    expect(gc).toContain('selekoa.goatcounter.com');
    expect(analyticsTag(closed)).toBe('');
  });

  it('stops if the template loses its robots tag', () => {
    expect(() =>
      transformHtml(html.replace(/<meta name="robots"[^>]*>/, ''), closed),
    ).toThrow(/robots/);
  });
});

describe('robots.txt and sitemap', () => {
  it('disallows everything until indexing is on', () => {
    expect(robotsTxt(closed)).toContain('Disallow: /');
    expect(robotsTxt(open)).toContain('Allow: /');
    expect(robotsTxt(open)).toContain(
      'Sitemap: https://example.org/sitemap.xml',
    );
    expect(sitemapXml(open)).toContain('<loc>https://example.org/</loc>');
  });
});
