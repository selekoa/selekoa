import { test, expect, type Page } from './fixtures';
import { slicePath } from '../../src/domain/slices';

/**
 * A link followed in the browser whose page cannot be loaded or drawn there
 * (a tab kept open across a deploy: the host now serves another build's
 * slices, or no longer serves the old build's scripts) opens the page as a
 * fresh load of its address would, never a blank page
 * (src/ui/page-failure.ts, review/fix-blank-page-2026-11-05.md). Each failure
 * is made for the first request only, as after a deploy the page loaded
 * afresh finds the new build's files.
 */

/** Counts the pages the browser itself loads from the moment it is called. */
function documentLoads(page: Page) {
  let loads = 0;
  page.on('request', (r) => {
    if (r.resourceType() === 'document') loads += 1;
  });
  return () => loads;
}

/** The page shows the link's address and its heading, drawn and running. */
async function arrived(page: Page, address: string, heading: RegExp) {
  await expect(page).toHaveURL(
    new RegExp(`${address.replace(/[?]/g, '\\?')}$`),
  );
  await expect(page.locator('h1').first()).toHaveText(heading);
  await page.waitForSelector('html[data-selekoa-ready]', { state: 'attached' });
  expect(
    (await page.locator('#root').innerText()).trim().length,
  ).toBeGreaterThan(100);
}

test('a slice another build wrote opens its page afresh, not blank', async ({
  page,
}) => {
  await page.goto('/dossier/openai');
  // The next deploy's slice: the same records, the fields another build's
  // pages read (here none but the IDs), and that build's name.
  await page.route(
    `**${slicePath('/dossier/io-products')}`,
    async (route) => {
      const response = await route.fetch();
      const file = await response.json();
      for (const kind of Object.keys(file.records)) {
        const fields = file.records[kind].fields;
        for (const name of Object.keys(fields))
          if (name !== 'id') delete fields[name];
      }
      file.build = 'index-another-build.js';
      await route.fulfill({ response, json: file });
    },
    { times: 1 },
  );
  const loads = documentLoads(page);
  await page.locator('main a[href="/dossier/io-products"]').first().click();
  await arrived(page, '/dossier/io-products', /io Products/);
  expect(loads()).toBe(1);
});

test('a slice that cannot be read opens its page afresh', async ({ page }) => {
  await page.goto('/dossier/openai');
  await page.route(
    `**${slicePath('/dossier/io-products')}`,
    (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: '{"packed":1,"version":"x"',
      }),
    { times: 1 },
  );
  const loads = documentLoads(page);
  await page.locator('main a[href="/dossier/io-products"]').first().click();
  await arrived(page, '/dossier/io-products', /io Products/);
  expect(loads()).toBe(1);
});

test('a page whose script is gone opens afresh', async ({ page }) => {
  await page.goto('/dossier/openai');
  await page.route(
    /\/assets\/ControlStructure-[^/]+\.js$/,
    (route) => route.fulfill({ status: 404, body: '' }),
    { times: 1 },
  );
  const loads = documentLoads(page);
  await page.locator('main a[href="/control/openai"]').first().click();
  await arrived(page, '/control/openai', /OpenAI/);
  expect(loads()).toBe(1);
});

test('from the start page, a link whose code is gone opens afresh', async ({
  page,
}) => {
  await page.goto('/');
  await page.route(
    /\/assets\/Workspace-[^/]+\.js$/,
    (route) => route.fulfill({ status: 404, body: '' }),
    { times: 1 },
  );
  const loads = documentLoads(page);
  await page.locator('main a[href="/control/openai"]').first().click();
  await arrived(page, '/control/openai', /OpenAI/);
  expect(loads()).toBe(1);
});
