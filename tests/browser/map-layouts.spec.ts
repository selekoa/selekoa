import { expect, test, type Page } from './fixtures';

// Maps drawn from layouts the build stores, and maps laid out in a worker
// (src/ui/map-layout.ts, review/map-prebuilt-layouts-2026-10-31.md).

function collectErrors(page: Page) {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  return errors;
}

const network = (page: Page) => page.getByTestId('network');

/** Where each record's symbol is drawn, relative to the map's focus. */
async function bearings(
  page: Page,
  focus: string,
): Promise<Record<string, number>> {
  return page.locator('.map-node').evaluateAll((nodes, focusId) => {
    const at = (n: Element) => {
      const r = n.getBoundingClientRect();
      return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
    };
    const centre = at(
      nodes.find((n) => n.getAttribute('data-entity-id') === focusId)!,
    );
    return Object.fromEntries(
      nodes.map((n) => {
        const p = at(n);
        return [
          n.getAttribute('data-entity-id'),
          Math.round(Math.atan2(p.y - centre.y, p.x - centre.x) * 100),
        ];
      }),
    );
  }, focus);
}

for (const [width, dossier] of [
  [1440, 'anthropic'],
  [390, 'anthropic'],
  [1440, 'openai'],
  [390, 'openai'],
] as const)
  test(`${width}px: ${dossier}'s dossier map is drawn from its stored layout, with every record listed`, async ({
    page,
  }) => {
    const errors = collectErrors(page);
    await page.setViewportSize({ width, height: 1000 });
    const stored = page.waitForResponse(
      (r) => r.url().endsWith(`/slices/map/dossier/${dossier}.json`) && r.ok(),
    );
    await page.goto(`/dossier/${dossier}?view=map`);
    await stored;
    await expect(network(page)).toHaveAttribute('data-layout', 'stored');
    const nodes = page.locator('.map-node');
    await expect(nodes.first()).toBeAttached();
    const count = await nodes.count();
    // The keyboard list names every record the map draws.
    const list = page.locator('details', {
      has: page.locator('summary', { hasText: 'Records in this view' }),
    });
    await expect(list.locator('summary')).toHaveText(
      `Records in this view · ${count}`,
    );
    await list.locator('summary').click();
    await expect(list.locator('[data-map-entity-id]')).toHaveCount(count);
    await expect(
      list.locator(`[data-map-entity-id="${dossier}"]`),
    ).toHaveAttribute('aria-current', 'true');
    await expect(page.locator(`[data-label-for="${dossier}"]`)).toBeVisible();
    expect(errors).toEqual([]);
  });

test('the same map opened from the explorer is drawn from the same stored layout', async ({
  page,
}) => {
  const errors = collectErrors(page);
  await page.goto('/dossier/anthropic?view=map');
  await expect(network(page)).toHaveAttribute('data-layout', 'stored');
  await expect(page.locator('.map-node').first()).toBeAttached();
  const before = await bearings(page, 'anthropic');
  // The explorer's landmark opens the same records around Anthropic, so the
  // same stored positions: each record keeps its bearing from the centre.
  await page.goto('/explore');
  await page
    .getByRole('navigation', { name: 'Explore the dataset' })
    .getByRole('button', { name: 'Anthropic', exact: true })
    .click();
  await expect(network(page)).toHaveAttribute('data-layout', 'stored');
  await expect(page.locator('.map-node').first()).toBeAttached();
  const after = await bearings(page, 'anthropic');
  expect(Object.keys(after).sort()).toEqual(Object.keys(before).sort());
  for (const [id, angle] of Object.entries(before))
    expect(Math.abs(after[id] - angle), id).toBeLessThanOrEqual(3);
  expect(errors).toEqual([]);
});

test('a narrower dossier map is laid out in a worker, seeded by the stored layout', async ({
  page,
}) => {
  const errors = collectErrors(page);
  await page.goto('/dossier/anthropic?view=map');
  await expect(network(page)).toHaveAttribute('data-layout', 'stored');
  const stored = (await page.evaluate(() =>
    fetch('/slices/map/dossier/anthropic.json').then((r) => r.json()),
  )) as { layouts: { key: string }[] };
  const started = page.waitForEvent('worker');
  await page.getByLabel('Records through year').selectOption('2023');
  await started;
  await expect(network(page)).toHaveAttribute('data-layout', 'worker');
  // Seeded by Anthropic's stored map.
  await expect(network(page)).toHaveAttribute(
    'data-layout-seed',
    stored.layouts[0].key,
  );
  await expect(page.locator('.map-node').first()).toBeAttached();
  await expect(page.locator('[data-label-for="anthropic"]')).toBeVisible();
  expect(errors).toEqual([]);
});

test('a search map is laid out in a worker and drawn', async ({ page }) => {
  const errors = collectErrors(page);
  const started = page.waitForEvent('worker');
  await page.goto('/explore#q=preparedness&view=map');
  await started;
  await expect(network(page)).toHaveAttribute('data-layout', 'worker');
  await expect(network(page)).not.toHaveAttribute('data-layout-seed', /./);
  await expect(page.locator('.map-node').first()).toBeAttached();
  expect(errors).toEqual([]);
});

test('a map is still drawn when the worker cannot be loaded', async ({
  page,
}) => {
  const errors = collectErrors(page);
  // As after a deploy, with a tab still open: the worker's file is gone.
  await page.route(/\/assets\/layout-worker-[^/]+\.js$/, (route) =>
    route.fulfill({ status: 404, body: 'Not found' }),
  );
  await page.goto('/explore#q=preparedness&view=map');
  await expect(network(page)).toHaveAttribute('data-layout', 'page');
  await expect(page.locator('.map-node').first()).toBeAttached();
  await expect(page.locator('.graph-notice')).toHaveCount(0);
  // The only error is the missing file itself.
  expect(errors.filter((e) => !/404|Failed to load/.test(e))).toEqual([]);
});

test('a layout sent to a worker whose file fails is computed in the page', async ({
  page,
}) => {
  const errors = collectErrors(page);
  await page.route(/\/assets\/layout-worker-[^/]+\.js$/, (route) =>
    route.fulfill({ status: 404, body: 'Not found' }),
  );
  // Drawn from its stored layout: no worker yet.
  await page.goto('/dossier/anthropic?view=map');
  await expect(network(page)).toHaveAttribute('data-layout', 'stored');
  // The worker is built for this layout, which is sent to it at once; its
  // file then fails, and the layout is computed in the page.
  await page.getByLabel('Records through year').selectOption('2023');
  await expect(network(page)).toHaveAttribute('data-layout', 'page');
  await expect(page.locator('.map-node').first()).toBeAttached();
  await expect(page.locator('[data-label-for="anthropic"]')).toBeVisible();
  expect(errors.filter((e) => !/404|Failed to load/.test(e))).toEqual([]);
});

test('choosing a record from the list keeps keyboard focus on the page', async ({
  page,
}) => {
  const errors = collectErrors(page);
  await page.goto('/person/sam-altman');
  await page
    .getByRole('tablist', { name: 'Person page views' })
    .getByRole('tab', { name: 'Connections map' })
    .click();
  await expect(network(page)).toHaveAttribute('data-layout', 'stored');
  const summary = page.locator('summary', { hasText: 'Records in this view' });
  await summary.focus();
  await summary.press('Enter');
  const openai = page.locator('[data-map-entity-id="openai"]');
  await openai.focus();
  await openai.press('Enter');
  // OpenAI's dossier replaces the person page and its list.
  await expect(page).toHaveURL(/\/dossier\/openai$/);
  await expect
    .poll(() =>
      page.evaluate(() => document.activeElement?.tagName.toLowerCase()),
    )
    .toBe('main');
  expect(errors).toEqual([]);
});

test("a person's map is drawn from its stored layout", async ({ page }) => {
  const errors = collectErrors(page);
  await page.goto('/person/sam-altman');
  await page
    .getByRole('tablist', { name: 'Person page views' })
    .getByRole('tab', { name: 'Connections map' })
    .click();
  await expect(network(page)).toHaveAttribute('data-layout', 'stored');
  await expect(page.locator('.map-node').first()).toBeAttached();
  await expect(page.locator('[data-label-for="sam-altman"]')).toBeVisible();
  expect(errors).toEqual([]);
});
