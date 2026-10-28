/**
 * The page renderer: a pure function from the release data (bundled with
 * this module) and a path to the page's HTML. It renders the application's
 * own React components to a string with React's web-stream server API,
 * which runs in Node and in a Cloudflare Worker alike, so the build and a
 * later render-on-request use the same code. Built as a separate bundle
 * (`pnpm build`, see vite.config.ts) with no Node-only import.
 */
import { StrictMode } from 'react';
import { renderToReadableStream } from 'react-dom/server';
import App from '../App';
import { repository } from '../domain/repository';
import { pageMeta, pagePaths, siteName } from './pages';
import { pageHtml } from './page-html';

export { pageFile } from './page-html';

/** Every path the build writes. */
export const paths = () => pagePaths(repository.data);

async function renderApp(address: string) {
  const stream = await renderToReadableStream(
    <StrictMode>
      <App address={address} />
    </StrictMode>,
    {
      onError(error) {
        throw error;
      },
    },
  );
  // Wait for every page component to load, so the markup is complete.
  await stream.allReady;
  return new Response(stream).text();
}

/**
 * The HTML of the page at a path, or null when the path opens no page.
 * `template` is the built index.html; `baseUrl` the site's address for the
 * canonical link.
 */
export async function renderPage(
  path: string,
  template: string,
  baseUrl: string | null,
): Promise<string | null> {
  const meta = pageMeta(repository.data, path);
  if (!meta) return null;
  return pageHtml({
    template,
    path,
    body: await renderApp(path),
    meta,
    baseUrl,
  });
}

/** The not-found page, sent for any path the site does not have. */
export async function renderNotFound(template: string) {
  return pageHtml({
    template,
    path: null,
    body: await renderApp('/not-found'),
    meta: {
      title: `Page not found · ${siteName}`,
      description: 'This address does not match any page or record.',
    },
    baseUrl: null,
  });
}
