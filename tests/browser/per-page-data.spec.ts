import { test, expect, type Page } from './fixtures';

/**
 * Pages drawn from their slices (docs/data-loading-design-c.md): a record
 * page is taken over without the records chunk, opens a claim from the
 * claim's bucket and another page with a slice from that slice, and loads
 * the records before anything else changes the page.
 */

/** The requests a page makes, by path. */
function requests(page: Page) {
  const seen: string[] = [];
  page.on('request', (r) => seen.push(new URL(r.url()).pathname));
  return {
    // The whole records: the records chunk (c2), or the content module (c3).
    records: () =>
      seen.some((p) =>
        /\/assets\/(records|_virtual_records-content)-[^/]+\.js$/.test(p),
      ),
    slices: () => seen.filter((p) => p.startsWith('/slices/')),
  };
}

test('a dossier is taken over from its slice and opens a claim from its bucket', async ({
  page,
}) => {
  const seen = requests(page);
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  await page.goto('/dossier/openai');
  expect(seen.slices()).toEqual(['/slices/dossier/openai.json']);
  expect(seen.records()).toBe(false);
  await expect(page.getByText('Loading the records')).toHaveCount(0);

  const claim = page.locator('a[data-claim-link][data-claim-id]').first();
  const id = await claim.getAttribute('data-claim-id');
  await claim.click();
  await expect(page.locator('#inspector')).toContainText('Claim and evidence', {
    ignoreCase: true,
  });
  await expect(page).toHaveURL(new RegExp(`inspect=${id}`));
  expect(seen.slices().some((p) => p.startsWith('/slices/claims/'))).toBe(true);
  expect(seen.records()).toBe(false);
  expect(errors).toEqual([]);
});

test('a claim link opened by keyboard waits for its bucket', async ({
  page,
}) => {
  const seen = requests(page);
  await page.goto('/person/eliezer-yudkowsky');
  const claim = page.locator('a[data-claim-link][data-claim-id]').first();
  await claim.focus();
  await page.keyboard.press(' ');
  await expect(page.locator('#inspector')).toBeVisible();
  await expect(page.locator('#inspector')).not.toContainText('undefined');
  expect(seen.records()).toBe(false);
});

test('a link to another page with a slice loads only that slice', async ({
  page,
}) => {
  const seen = requests(page);
  await page.goto('/person/jan-leike');
  expect(seen.records()).toBe(false);
  await page
    .getByRole('navigation')
    .getByRole('link', { name: 'Governance', exact: true })
    .first()
    .click();
  await expect(page).toHaveURL(/\/governance$/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Governance',
  );
  // Since stage c5 (src/ui/page-visits.ts); a page without a slice still
  // loads the whole records (slice-navigation.spec.ts).
  expect(seen.slices()).toEqual([
    '/slices/person/jan-leike.json',
    '/slices/hubs.json',
  ]);
  expect(seen.records()).toBe(false);
});

test('a tab chosen by keyboard before the records load opens with them', async ({
  page,
}) => {
  await page.goto('/person/jan-leike');
  const tab = page.getByRole('tab', { name: 'Documented record' });
  await tab.focus();
  await page.keyboard.press('ArrowRight');
  await expect(
    page.getByRole('tab', { name: 'Connections map' }),
  ).toHaveAttribute('aria-selected', 'true');
});

test('a comparison edition chosen before the records load applies with them', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  await page.goto('/compare/frontier-safety-frameworks');
  await page
    .getByRole('combobox', { name: /Anthropic · Responsible Scaling Policy/ })
    .selectOption('rsp-2023');
  await expect(
    page.locator('.cmp-table thead th, table thead th').nth(1),
  ).toContainText('v1.0');
  expect(errors).toEqual([]);
});

test('a page whose slice cannot load is drawn from the records', async ({
  page,
}) => {
  await page.route('**/slices/dossier/anthropic.json', (route) =>
    route.fulfill({ status: 404, body: '' }),
  );
  const seen = requests(page);
  await page.goto('/dossier/anthropic');
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Anthropic',
  );
  expect(seen.records()).toBe(true);
});
