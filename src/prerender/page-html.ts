/**
 * Places a rendered page into the built index.html. Plain string work, so it
 * runs wherever the renderer runs (the build, or a worker later).
 */
import type { PageMeta } from './pages';

const escapeHtml = (text: string) =>
  text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');

export type PageHtmlInput = {
  /** The built index.html, with its script and stylesheet tags. */
  template: string;
  /** The page's path, such as `/person/jan-leike`; null for the not-found page. */
  path: string | null;
  /** The rendered application markup. */
  body: string;
  meta: PageMeta;
  /** The site's absolute address, ending in a slash; null leaves out the canonical link. */
  baseUrl: string | null;
};

/**
 * The full page: its title, description and canonical address (and the
 * Open Graph copies the launch settings add), and the rendered markup inside
 * the application root, marked with the path it was rendered for. The
 * no-script note goes: the page's text is present. The not-found page has no
 * address of its own and is never indexed.
 */
export function pageHtml({
  template,
  path,
  body,
  meta,
  baseUrl,
}: PageHtmlInput) {
  const replace = (html: string, pattern: RegExp, value: string) => {
    if (!pattern.test(html))
      throw new Error(`index.html has no match for ${pattern}`);
    return html.replace(pattern, () => value);
  };
  /** Sets an optional tag's attribute where the tag is present. */
  const optional = (html: string, pattern: RegExp, value: string | null) =>
    html.replace(pattern, () => value ?? '');
  const address =
    path !== null && baseUrl ? new URL(path.slice(1), baseUrl).href : null;
  let html = template;
  html = replace(
    html,
    /<title>[^<]*<\/title>/,
    `<title>${escapeHtml(meta.title)}</title>`,
  );
  html = replace(
    html,
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${escapeHtml(meta.description)}" />`,
  );
  // With indexing on, the launch settings add these for the start page.
  html = optional(
    html,
    /<meta property="og:title" content="[^"]*" \/>/,
    `<meta property="og:title" content="${escapeHtml(meta.title)}" />`,
  );
  html = optional(
    html,
    /<meta property="og:description" content="[^"]*" \/>/,
    `<meta property="og:description" content="${escapeHtml(meta.description)}" />`,
  );
  html = optional(
    html,
    /\s*<meta property="og:url" content="[^"]*" \/>/,
    address &&
      `\n    <meta property="og:url" content="${escapeHtml(address)}" />`,
  );
  html = optional(html, /\s*<link rel="canonical" href="[^"]*" \/>/, '');
  if (address)
    html = replace(
      html,
      /<\/title>/,
      `</title>\n    <link rel="canonical" href="${escapeHtml(address)}" />`,
    );
  if (path === null) {
    html = optional(html, /\s*<meta name="robots"[^>]*>/, '');
    html = replace(
      html,
      /<\/title>/,
      '</title>\n    <meta name="robots" content="noindex" />',
    );
  }
  html = replace(html, /\s*<noscript>[\s\S]*?<\/noscript>/, '');
  html = replace(
    html,
    /<div id="root"><\/div>/,
    path === null
      ? `<div id="root">${body}</div>`
      : `<div id="root" data-path="${escapeHtml(path)}">${body}</div>`,
  );
  return html;
}

/** The file a page's path is written to: `/person/x` → `person/x.html`. */
export const pageFile = (path: string) =>
  path === '/' ? 'index.html' : `${path.slice(1)}.html`;
