// Launch settings, read from site.config.json at build time (see
// docs/launch-runbook.md). Pure: no file access, so the tests can use it.
import { z } from 'zod';

/** The contact value that means "not decided yet". It must never ship publicly. */
export const contactPlaceholder = 'CONTACT-ADDRESS-NOT-SET';

export const siteConfigSchema = z.strictObject({
  /** Let search engines index the site. Off until launch. */
  indexing: z.boolean(),
  /** Public address of the site root, https with a trailing slash; "" before launch. */
  baseUrl: z.string(),
  /** Address for corrections and takedown requests. */
  contact: z.union([
    z.literal(contactPlaceholder),
    z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'not an email address'),
  ]),
  analytics: z.strictObject({
    provider: z.enum(['none', 'cloudflare', 'goatcounter']),
    /** Cloudflare Web Analytics token (32 hex characters). */
    cloudflareToken: z.string(),
    /** GoatCounter site code, the part before .goatcounter.com. */
    goatcounterCode: z.string(),
  }),
});
export type SiteConfig = z.infer<typeof siteConfigSchema>;

export const hasContact = (c: SiteConfig) => c.contact !== contactPlaceholder;
export const isPublic = (c: SiteConfig) =>
  c.indexing || c.analytics.provider !== 'none';

/**
 * Reasons this configuration must not ship. Checked on every production
 * build, and by the unit tests. The placeholder contact only blocks a build
 * that is public (indexing or analytics on).
 */
export function launchProblems(c: SiteConfig): string[] {
  const problems: string[] = [];
  if (isPublic(c) && !hasContact(c))
    problems.push(
      'contact is still the placeholder; set a real corrections address before enabling indexing or analytics',
    );
  if (c.indexing && !/^https:\/\/[^/\s]+(\/[^\s?#]*)?\/$/.test(c.baseUrl))
    problems.push(
      'indexing needs baseUrl as an https address ending in "/", such as https://example.org/',
    );
  if (
    c.analytics.provider === 'cloudflare' &&
    !/^[0-9a-f]{32}$/.test(c.analytics.cloudflareToken)
  )
    problems.push('analytics.cloudflareToken must be 32 hex characters');
  if (
    c.analytics.provider === 'goatcounter' &&
    !/^[a-z0-9][a-z0-9-]*$/.test(c.analytics.goatcounterCode)
  )
    problems.push('analytics.goatcounterCode must be a GoatCounter site code');
  return problems;
}

const escape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

/** The analytics script tag for the chosen provider; empty when analytics is off. */
export function analyticsTag(c: SiteConfig): string {
  switch (c.analytics.provider) {
    case 'cloudflare':
      return `<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token": "${escape(c.analytics.cloudflareToken)}"}'></script>`;
    case 'goatcounter':
      return `<script data-goatcounter="https://${escape(c.analytics.goatcounterCode)}.goatcounter.com/count" async src="https://gc.zgo.at/count.js"></script>`;
    default:
      return '';
  }
}

/** Applies the launch settings to index.html. Throws if the template changed shape. */
export function transformHtml(html: string, c: SiteConfig): string {
  let out = html;
  const robots = /[ \t]*<meta name="robots"[^>]*>\r?\n?/;
  if (!robots.test(out))
    throw new Error('index.html lost its robots meta tag; update site-config');
  const tags: string[] = [];
  if (c.indexing) {
    out = out.replace(robots, '');
    const title = out.match(/<title>([^<]*)<\/title>/)?.[1];
    const description = out.match(
      /<meta\s+name="description"\s+content="([^"]*)"/,
    )?.[1];
    if (!title || !description)
      throw new Error('index.html needs a title and a description');
    tags.push(
      `<link rel="canonical" href="${escape(c.baseUrl)}" />`,
      '<meta property="og:type" content="website" />',
      '<meta property="og:site_name" content="Selekoa" />',
      `<meta property="og:title" content="${title}" />`,
      `<meta property="og:description" content="${description}" />`,
      `<meta property="og:url" content="${escape(c.baseUrl)}" />`,
      '<meta name="twitter:card" content="summary" />',
    );
  }
  const analytics = analyticsTag(c);
  if (analytics) tags.push(analytics);
  if (tags.length)
    out = out.replace('</head>', `    ${tags.join('\n    ')}\n  </head>`);
  return out;
}

/** robots.txt: closed until indexing is on. */
export const robotsTxt = (c: SiteConfig) =>
  c.indexing
    ? `User-agent: *\nAllow: /\n\nSitemap: ${c.baseUrl}sitemap.xml\n`
    : 'User-agent: *\nDisallow: /\n';

/**
 * Every pre-rendered page, by path from the site root (`/`, `/person/x`), then
 * the plain files beside them (llms.txt, the data files), by their paths
 * relative to the base address.
 */
export const sitemapXml = (
  c: SiteConfig,
  pages: string[] = ['/'],
  files: string[] = [],
) =>
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[
    ...pages.map((path) => path.slice(1)),
    ...files,
  ]
    .map((path) => `  <url><loc>${escape(c.baseUrl + path)}</loc></url>\n`)
    .join('')}</urlset>\n`;
