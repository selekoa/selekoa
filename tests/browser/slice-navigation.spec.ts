import { test, expect, type Page } from './fixtures';
import { slicePath } from '../../src/domain/slices';

/**
 * Links and history between pages drawn from their slices
 * (docs/data-loading-design-c.md, "Navigation"): a link to a page with a
 * slice loads only that slice and draws the page exactly as a fresh load of
 * its address, and so do back and forward. The whole records are never
 * loaded on the way.
 */

/** The requests a page makes, by path, from the moment `mark` is called. */
function requests(page: Page) {
  const seen: string[] = [];
  page.on('request', (r) => seen.push(new URL(r.url()).pathname));
  let from = 0;
  const since = () => seen.slice(from);
  return {
    mark: () => {
      from = seen.length;
    },
    // The whole records: the content module and the relation core.
    records: () =>
      since().some((p) =>
        /\/assets\/_virtual_records-(content|core)-[^/]+\.js$/.test(p),
      ),
    slices: () => since().filter((p) => p.startsWith('/slices/')),
  };
}

/**
 * The page as drawn once it has settled: its title and the application's
 * elements, unchanged for half a second, each with its attributes in order
 * of name (React sets an input's type first when it creates one in the
 * browser), its style and form state as the browser reads them, and its
 * text, without the comments a page taken over keeps from
 * the server. IDs React makes for labels differ between a page taken over
 * and one drawn in the browser, and are left out.
 */
async function drawn(page: Page) {
  let last = '';
  for (let i = 0; i < 60; i++) {
    const now = await page.evaluate(() => {
      const out: string[] = [document.title];
      const walk = (node: Node) => {
        if (node.nodeType === Node.TEXT_NODE) out.push(node.textContent ?? '');
        if (!(node instanceof Element)) return;
        const attributes = [...node.attributes]
          // Form state as the browser holds it, not the attributes a page
          // taken over keeps from the server.
          .filter((a) => a.name !== 'selected' && a.name !== 'checked')
          .map(
            (a) =>
              `${a.name}="${a.name === 'style' ? (node as HTMLElement).style.cssText : a.value}"`,
          )
          .sort();
        if (
          node instanceof HTMLSelectElement ||
          node instanceof HTMLInputElement ||
          node instanceof HTMLTextAreaElement
        )
          attributes.push(`:value="${node.value}"`);
        if (node instanceof HTMLInputElement)
          attributes.push(`:checked="${node.checked}"`);
        out.push(`<${node.localName} ${attributes.join(' ')}>`);
        node.childNodes.forEach(walk);
        out.push(`</${node.localName}>`);
      };
      document.getElementById('root')!.childNodes.forEach(walk);
      return out.join('\n');
    });
    if (now === last) break;
    last = now;
    await page.waitForTimeout(500);
  }
  return last.replace(/«[rR][^»]*»|:[rR][0-9a-z]*:|_[rR]_[0-9a-z]*_/g, 'ID');
}

/** A fresh load of an address, as drawn. */
async function fresh(page: Page, address: string) {
  await page.goto(address);
  return drawn(page);
}

/** Every type of page with a slice, reached by a link from another. */
const links: { from: string; link: string; to?: string }[] = [
  {
    from: '/governance',
    link: 'main a[href="/guide/frontier-frameworks-and-law"]',
  },
  {
    from: '/governance',
    link: 'main a[href="/documents/frontier-safety-frameworks"]',
  },
  {
    from: '/governance',
    link: 'main a[href="/compare/frontier-safety-frameworks"]',
  },
  { from: '/governance', link: 'main a[href^="/control/"]' },
  { from: '/governance', link: 'main a[href^="/commitments/"]' },
  { from: '/governance', link: 'main a[href^="/question/"]' },
  { from: '/ideas', link: 'main a[href^="/propositions/"]' },
  { from: '/institutions', link: 'main a[href^="/dossier/"]' },
  { from: '/dossier/openai', link: 'header a[href="/institutions"]' },
  {
    from: '/claim/dario-anthropic-2021',
    link: 'a[href="/person/dario-amodei"]',
  },
  { from: '/person/jan-leike', link: 'main a[href^="/document/"]' },
  { from: '/document/rsp-v2-0', link: 'header a[href="/about"]' },
  { from: '/about', link: 'header a[href="/explore"]' },
  // The search page holds no records; its links open pages from slices.
  { from: '/search#q=responsible scaling', link: 'main a[href^="/document/"]' },
];

for (const { from, link } of links)
  test(`a link from ${from} (${link}) draws its page as a fresh load`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    const seen = requests(page);
    await page.goto(from);
    const target = page.locator(link).first();
    const href = (await target.getAttribute('href'))!;
    seen.mark();
    await target.click();
    await expect(page).toHaveURL(new RegExp(`${href.replace(/[?]/g, '\\?')}$`));
    const opened = await drawn(page);
    expect(seen.records()).toBe(false);
    // Only the next page's slice, fetched once.
    const own = slicePath(href);
    expect(seen.slices()).toEqual(own ? [own] : []);
    expect(opened).toBe(await fresh(page, href));
    expect(errors).toEqual([]);
  });

test('back and forward draw each page as a fresh load', async ({ page }) => {
  const seen = requests(page);
  const walk = [
    '/governance',
    '/guide/frontier-frameworks-and-law',
    '/claim/dario-anthropic-2021',
    '/person/dario-amodei',
  ];
  const expected = new Map<string, string>();
  for (const address of walk) expected.set(address, await fresh(page, address));
  await page.goto(walk[0]);
  seen.mark();
  await page.locator(`main a[href="${walk[1]}"]`).first().click();
  await expect(page).toHaveURL(new RegExp(`${walk[1]}$`));
  // The guide's claim links open panels; the claim page is reached through
  // its address.
  await page.goto(walk[2]);
  seen.mark();
  await page.locator(`a[href="${walk[3]}"]`).first().click();
  await expect(page).toHaveURL(new RegExp(`${walk[3]}$`));
  expect(await drawn(page)).toBe(expected.get(walk[3]));
  await page.goBack();
  await expect(page).toHaveURL(new RegExp(`${walk[2]}$`));
  expect(await drawn(page)).toBe(expected.get(walk[2]));
  await page.goForward();
  await expect(page).toHaveURL(new RegExp(`${walk[3]}$`));
  expect(await drawn(page)).toBe(expected.get(walk[3]));
  await page.goBack();
  await page.goBack();
  await expect(page).toHaveURL(new RegExp(`${walk[1]}$`));
  expect(await drawn(page)).toBe(expected.get(walk[1]));
  await page.goBack();
  await expect(page).toHaveURL(new RegExp(`${walk[0]}$`));
  expect(await drawn(page)).toBe(expected.get(walk[0]));
  expect(seen.records()).toBe(false);
});

test('a page opened by a link holds none of the page left', async ({
  page,
}) => {
  const seen = requests(page);
  await page.goto('/dossier/openai');
  // A claim panel on the dossier, then a link away from it.
  await page.locator('main a[data-claim-link][data-claim-id]').first().click();
  await expect(page.locator('#inspector')).toBeVisible();
  seen.mark();
  await page.locator('header a[href="/institutions"]').click();
  await expect(page).toHaveURL(/\/institutions$/);
  await expect(page.locator('#inspector')).toHaveCount(0);
  expect(seen.slices()).toEqual(['/slices/hubs.json']);
  expect(seen.records()).toBe(false);
});

test('pointing at a link fetches only its page’s slice', async ({ page }) => {
  const seen = requests(page);
  await page.goto('/governance');
  seen.mark();
  await page
    .locator('main a[href="/guide/frontier-frameworks-and-law"]')
    .first()
    .hover();
  await expect
    .poll(() => seen.slices())
    .toEqual(['/slices/guide/frontier-frameworks-and-law.json']);
  await page.waitForTimeout(500);
  expect(seen.records()).toBe(false);
});

test("the link to a claim's organisation on its page opens the dossier", async ({
  page,
}) => {
  const seen = requests(page);
  await page.goto('/claim/dario-anthropic-2021');
  seen.mark();
  await page.locator('a[href="/dossier/anthropic"]').first().click();
  await expect(page).toHaveURL(/\/dossier\/anthropic$/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Anthropic',
  );
  await expect(page.locator('.dossier')).not.toHaveCount(0);
  expect(seen.records()).toBe(false);
  expect(await drawn(page)).toBe(await fresh(page, '/dossier/anthropic'));
});

test('a link to a page without a slice still loads the whole records', async ({
  page,
}) => {
  const seen = requests(page);
  await page.goto('/person/jan-leike');
  seen.mark();
  await page.locator('header a[href="/"]').first().click();
  await expect(page).toHaveURL(/\/$/);
  expect(seen.records()).toBe(true);
});

test('a page opened beneath a cursor that has not moved loads nothing more', async ({
  page,
}) => {
  // The narrow layout puts a disclosure beneath the link that was clicked.
  await page.setViewportSize({ width: 390, height: 844 });
  const seen = requests(page);
  await page.goto('/ideas');
  const link = page.locator('main a[href^="/propositions/"]').first();
  await link.scrollIntoViewIfNeeded();
  seen.mark();
  await link.click();
  await expect(page).toHaveURL(/\/propositions\//);
  await page.waitForTimeout(1500);
  expect(seen.records()).toBe(false);
  // Once the pointer moves, pointing at a control loads the records again.
  await page.mouse.move(5, 5);
  await page.locator('main summary, main button').first().hover();
  await expect.poll(() => seen.records()).toBe(true);
});

test('a link still loading gives way to a change made in place meanwhile', async ({
  page,
}) => {
  let release = () => {};
  const held = new Promise<void>((resolve) => (release = resolve));
  await page.route(
    '**/slices/guide/frontier-frameworks-and-law.json',
    async (route) => {
      await held;
      await route.continue();
    },
  );
  await page.goto('/governance');
  await page
    .locator('main a[href="/guide/frontier-frameworks-and-law"]')
    .first()
    .click();
  // Meanwhile the reader follows another link, which opens at once.
  await page.locator('header a[href="/ideas"]').click();
  await expect(page).toHaveURL(/\/ideas$/);
  release();
  await page.waitForTimeout(1500);
  await expect(page).toHaveURL(/\/ideas$/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Ideas');
});

test('a step back returns to where the reader was on the page', async ({
  page,
}) => {
  await page.goto('/dossier/openai');
  await page.evaluate(() => window.scrollTo(0, 2000));
  await page.waitForTimeout(200);
  const at = await page.evaluate(() => window.scrollY);
  expect(at).toBeGreaterThan(1000);
  await page.evaluate(() =>
    document
      .querySelector<HTMLAnchorElement>('header a[href="/institutions"]')!
      .click(),
  );
  await expect(page).toHaveURL(/\/institutions$/);
  await page.goBack();
  await expect(page).toHaveURL(/\/dossier\/openai$/);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(at);
});

test("the search page's List link keeps the reader's choices", async ({
  page,
}) => {
  await page.goto('/search#q=responsible%20scaling');
  const order = page.getByRole('combobox', { name: /Order/ });
  await order.selectOption('date');
  await page.locator('.search-views a[aria-current="page"]').click();
  await expect(order).toHaveValue('date');
});

test('the header’s “How this works” link opens How this was built', async ({
  page,
}) => {
  const seen = requests(page);
  await page.goto('/person/jan-leike');
  seen.mark();
  await page.getByRole('link', { name: 'How this works →' }).click();
  await expect(page).toHaveURL(/\/about$/);
  await expect(page.locator('#about-built')).toBeFocused();
  await expect(page.locator('#about-built')).toBeInViewport();
  expect(seen.records()).toBe(false);
});
