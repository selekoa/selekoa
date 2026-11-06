import { readFileSync } from 'node:fs';
import { test, expect, type Page } from './fixtures';
import AxeBuilder from '@axe-core/playwright';

function collectErrors(page: Page) {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  return errors;
}

const fitsViewport = (page: Page) =>
  page.evaluate(
    () => document.documentElement.scrollWidth <= window.innerWidth,
  );

const axe = async (page: Page) =>
  (
    await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze()
  ).violations;

// The stored records, read as the tests' fixed expectations: every prediction
// record, and those with a printed target year.
const claims: {
  id: string;
  predicate: string;
  attributes?: { prediction?: { horizon: { years?: number[] } } };
}[] = JSON.parse(
  readFileSync(new URL('../../data/claims.json', import.meta.url), 'utf8'),
);
const predictions = claims.filter((c) => c.predicate === 'states_prediction');
const charted = predictions.filter(
  (c) => (c.attributes?.prediction?.horizon.years ?? []).length > 0,
);
const path = '/predictions/predictions-on-record';

test('the page opens from the Ideas hub with its chart and its table', async ({
  page,
}) => {
  const errors = collectErrors(page);
  await page.goto('/ideas');
  await page
    .getByRole('link', { name: 'Predictions on record', exact: true })
    .click();
  await expect(page).toHaveURL(new RegExp(`${path}$`));
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Predictions on record',
  );
  // The chart draws one group per record with a printed target year.
  await expect(page.locator('svg.pred-chart .pred-point')).toHaveCount(
    charted.length,
  );
  // No line for the present: the only lines are axes, grid and joins.
  await expect(page.locator('svg.pred-chart .pred-today')).toHaveCount(0);
  // The page says what it does not do.
  await expect(page.locator('.pred-not')).toContainText(
    'does not say whether any prediction came true',
  );
  expect(errors).toEqual([]);
});

test('the table is the chart’s accessible equivalent, with every record', async ({
  page,
}) => {
  await page.goto(path);
  const rows = page.locator('.pred-table tbody tr');
  await expect(rows).toHaveCount(predictions.length);
  // Every charted record is a row of the table.
  for (const c of charted.slice(0, 5))
    await expect(
      page.locator(`.pred-table [data-claim-id="${c.id}"]`),
    ).toHaveCount(1);
  // The table scrolls in its own box and can take the keyboard's focus.
  const region = page.getByRole('region', {
    name: 'Every record, as a table',
  });
  await region.focus();
  await expect(region).toBeFocused();
  // A relative horizon stays words, and is not on the chart.
  const turing = page.locator('.pred-table tr', {
    has: page.locator('[data-claim-id="pr-a-turing-1950-imitation-game"]'),
  });
  await expect(turing).toContainText("in about fifty years' time");
  await expect(
    page.locator('svg [data-claim="pr-a-turing-1950-imitation-game"]'),
  ).toHaveCount(0);
});

test('filters by form and decade narrow the chart and the table together', async ({
  page,
}) => {
  await page.goto(path);
  const rows = page.locator('.pred-table tbody tr');
  await page.getByRole('checkbox', { name: 'Stated forecast' }).uncheck();
  const surveys = await rows.count();
  expect(surveys).toBeLessThan(predictions.length);
  await expect(
    page.locator('svg.pred-chart .pred-point[data-form="stated-forecast"]'),
  ).toHaveCount(0);
  await page.getByRole('checkbox', { name: 'Stated forecast' }).check();
  await page
    .getByRole('combobox', { name: 'Decade of the source date' })
    .selectOption('1950');
  await expect(rows.first()).toContainText('1950');
  for (const text of await rows.locator('.pred-date').allTextContents())
    expect(text.slice(0, 3)).toBe('195');
  await expect(page.locator('.pred-count')).toContainText('Showing');
});

test('a record opens from the table and from the chart', async ({ page }) => {
  const errors = collectErrors(page);
  await page.goto(path);
  await page
    .locator('.pred-table [data-claim-id="pr-e-brooks-2018-mouse"]')
    .click();
  await expect(page.locator('#inspector')).toBeVisible();
  await expect(page).toHaveURL(/inspect=pr-e-brooks-2018-mouse/);
  await page
    .locator('svg [data-claim="pr-f-google-deepmind-2025-by-2030"]')
    .click();
  await expect(page).toHaveURL(/inspect=pr-f-google-deepmind-2025-by-2030/);
  expect(errors).toEqual([]);
});

test('a printed target year links to the year’s page, labelled as the dataset’s records', async ({
  page,
}) => {
  await page.goto(path);
  const link = page
    .getByRole('link', { name: 'What the dataset records for 2000 →' })
    .first();
  await expect(link).toHaveAttribute('href', '/year/2000');
});

test('the CSV link downloads one row per record', async ({ page, request }) => {
  await page.goto(path);
  const link = page.getByRole('link', { name: 'Download every record as CSV' });
  await expect(link).toHaveAttribute('href', `${path}.csv`);
  const response = await request.get(`${path}.csv`);
  expect(response.ok()).toBe(true);
  const text = await response.text();
  expect(text.startsWith('source_date,form,predictor,predicted_event,')).toBe(
    true,
  );
  expect(text).not.toContain('outcome');
  expect(text.match(/\/claim\/pr-/g)).toHaveLength(predictions.length);
});

for (const width of [1440, 390])
  test(`predictions page at ${width}px: layout and accessibility`, async ({
    page,
  }) => {
    const errors = collectErrors(page);
    await page.setViewportSize({ width, height: 1000 });
    await page.goto(path);
    await expect(page.locator('svg.pred-chart')).toBeVisible();
    expect(await fitsViewport(page)).toBe(true);
    expect(await axe(page)).toEqual([]);
    await page.locator('.pred-search summary').click();
    expect(await fitsViewport(page)).toBe(true);
    expect(await axe(page)).toEqual([]);
    expect(errors).toEqual([]);
  });

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false });
  test('the built page holds the table', async ({ page }) => {
    await page.goto(path);
    await expect(page.locator('.pred-table tbody tr')).toHaveCount(
      predictions.length,
    );
  });
});
