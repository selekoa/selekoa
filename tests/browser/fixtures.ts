import { test as base, type BrowserContext } from '@playwright/test';

/**
 * Analytics hosts the production build may load (see analyticsTag in
 * src/site/site-config.ts). Their beacons fail CORS from 127.0.0.1 and would
 * trip the specs' no-console-errors checks whenever the network is reachable,
 * so every page gets an empty script instead. analytics.spec.ts checks that
 * the real build still carries the tag.
 */
const analyticsHosts =
  /^https:\/\/([^/]+\.)?(cloudflareinsights\.com|goatcounter\.com|gc\.zgo\.at)\//;

/** Stubs the analytics hosts in a context the spec creates itself. */
export async function stubAnalytics(context: BrowserContext) {
  await context.route(analyticsHosts, (route) =>
    route.fulfill({ status: 200, contentType: 'text/javascript', body: '' }),
  );
}

export const test = base.extend({
  context: async ({ context }, use) => {
    await stubAnalytics(context);
    await use(context);
  },
  // A page arrives as built HTML and then runs in the browser. Unless a test
  // asks for an earlier moment (waitUntil), goto waits until it runs, so
  // that a click is handled by the application rather than the browser.
  page: async ({ page, javaScriptEnabled }, use) => {
    const ready = async (options?: { waitUntil?: string }) => {
      if (javaScriptEnabled !== false && !options?.waitUntil)
        await page.waitForSelector('html[data-selekoa-ready]', {
          state: 'attached',
        });
    };
    const goto = page.goto.bind(page);
    page.goto = async (url, options) => {
      const response = await goto(url, options);
      await ready(options);
      return response;
    };
    const reload = page.reload.bind(page);
    page.reload = async (options) => {
      const response = await reload(options);
      await ready(options);
      return response;
    };
    await use(page);
  },
});

export { expect } from '@playwright/test';
export type { Page } from '@playwright/test';
