import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from './fixtures';

// The maintainer requests of 2026-10-29
// (review/site-search-header-2026-10-29.md).

function collectErrors(page: Page) {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  return errors;
}

async function noViolations(page: Page) {
  const result = await new AxeBuilder({ page })
    .include('header')
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();
  expect(result.violations).toEqual([]);
}

const fitsViewport = (page: Page) =>
  page.evaluate(
    () => document.documentElement.scrollWidth <= window.innerWidth,
  );

test('desktop: the header searches from any page and links the explorer', async ({
  page,
}) => {
  const errors = collectErrors(page);
  await page.goto('/document/good-1965');
  const banner = page.getByRole('banner');
  const field = banner.getByRole('searchbox', { name: 'Search the records' });
  await expect(field).toBeVisible();
  await expect(
    banner.getByRole('button', { name: 'Search', exact: true }),
  ).toBeHidden();
  const explore = banner
    .getByRole('navigation', { name: 'Primary' })
    .getByRole('link', { name: 'Explore the records' });
  await expect(explore).toHaveAttribute('href', '/explore');
  await noViolations(page);
  // Keyboard: Tab reaches the field, Enter searches.
  await explore.focus();
  await page.keyboard.press('Tab');
  await expect(field).toBeFocused();
  await page.keyboard.type('Anthropic’s control');
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/search#q=Anthropic%E2%80%99s\+control$/);
  await expect(
    page.getByRole('main').getByRole('searchbox', { name: 'Search terms' }),
  ).toHaveValue('Anthropic’s control');
  // The search page has its own field; the header leaves its field out.
  await expect(field).toHaveCount(0);
  // The explorer link opens the explorer and marks it as the current page.
  await explore.click();
  await expect(page).toHaveURL(/\/explore$/);
  await expect(explore).toHaveAttribute('aria-current', 'page');
  expect(await fitsViewport(page)).toBe(true);
  expect(errors).toEqual([]);
});

test('phone: an icon opens the search field, which closes again', async ({
  page,
}) => {
  const errors = collectErrors(page);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/governance');
  const banner = page.getByRole('banner');
  const toggle = banner.getByRole('button', { name: 'Search', exact: true });
  const field = banner.getByRole('searchbox', { name: 'Search the records' });
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(toggle).toHaveAttribute('href', '/search');
  await expect(field).toBeHidden();
  await expect(
    banner.getByRole('link', { name: 'Explore the records' }),
  ).toBeVisible();
  expect(await fitsViewport(page)).toBe(true);
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect(field).toBeFocused();
  expect(await fitsViewport(page)).toBe(true);
  await noViolations(page);
  // Escape closes it and returns to the icon.
  await page.keyboard.press('Escape');
  await expect(field).toBeHidden();
  await expect(toggle).toBeFocused();
  // Space opens it from the keyboard.
  await page.keyboard.press('Space');
  await expect(field).toBeFocused();
  await field.fill('Long-Term Benefit Trust');
  await field.press('Enter');
  await expect(page).toHaveURL(/\/search#q=Long-Term\+Benefit\+Trust$/);
  await expect(field).toBeHidden();
  await expect(page.locator('#search-status')).toContainText('page');
  expect(errors).toEqual([]);
});

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('the header search is a plain form that opens the search page', async ({
    page,
  }) => {
    await page.goto('/person/eliezer-yudkowsky');
    const form = page.getByRole('banner').getByRole('search');
    await expect(form).toHaveAttribute('action', '/search');
    await expect(form).toHaveAttribute('method', 'get');
    const field = form.getByRole('searchbox');
    await field.fill('ASL-3');
    await field.press('Enter');
    await expect(page).toHaveURL(/\/search\?q=ASL-3$/);
    await expect(page.locator('h1')).toHaveText('Search the records');
    // On a phone the icon is a link to the search page.
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/governance');
    await page
      .getByRole('banner')
      .getByRole('button', { name: 'Search', exact: true })
      .click();
    await expect(page).toHaveURL(/\/search$/);
  });
});

test('the search page leaves the header field out and keeps its own', async ({
  page,
}) => {
  await page.goto('/search');
  await expect(page.getByRole('banner').getByRole('search')).toHaveCount(0);
  await expect(
    page
      .getByRole('banner')
      .getByRole('button', { name: 'Search', exact: true }),
  ).toHaveCount(0);
  await expect(
    page.getByRole('main').getByRole('searchbox', { name: 'Search terms' }),
  ).toBeVisible();
  // Other pages keep it.
  await page.goto('/governance');
  await expect(page.getByRole('banner').getByRole('search')).toHaveCount(1);
});

test('a search address from the plain form moves its terms to the fragment', async ({
  page,
}) => {
  await page.goto('/search?q=ASL-3');
  await expect(page).toHaveURL(/\/search#q=ASL-3$/);
  await expect(
    page.getByRole('main').getByRole('searchbox', { name: 'Search terms' }),
  ).toHaveValue('ASL-3');
});

for (const query of [
  "anthropic's control structure",
  'anthropics control structure',
  'Anthropic’s control structure',
])
  test(`pages come before records: “${query}”`, async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto('/search#q=' + encodeURIComponent(query));
    const pages = page.getByRole('region', { name: /^Pages/ });
    await expect(pages).toBeVisible();
    const first = pages.getByRole('link').first();
    await expect(first).toHaveAttribute('href', '/control/anthropic');
    await expect(first).toContainText('Control structure');
    await expect(first.locator('mark')).toHaveText([
      'Anthropic’s control structure',
    ]);
    await expect(page.locator('#search-status')).toContainText(
      /^1 page matches/,
    );
    // The Pages group sits above every record group.
    const groups = page.locator('.search-group h2');
    await expect(groups.first()).toContainText('Pages');
    await first.click();
    await expect(page).toHaveURL(/\/control\/anthropic$/);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      'Anthropic’s control structure, 2021–2026',
    );
    expect(errors).toEqual([]);
  });

test('a search that matches pages and records lists both, pages first', async ({
  page,
}) => {
  await page.goto('/search#q=OpenAI');
  const headings = page.locator('.search-group h2');
  await expect(headings.first()).toContainText('Pages');
  await expect(headings.nth(1)).toContainText('Claims');
  await expect(page.locator('#search-status')).toContainText(
    /^\d+ pages? and \d+ records match “OpenAI”/,
  );
  // Names only and filters list records alone.
  await page.getByLabel('Names and aliases only').check();
  await expect(page.getByRole('region', { name: /^Pages/ })).toHaveCount(0);
});

test('the start page offers its featured links as ways in', async ({
  page,
}) => {
  await page.goto('/');
  await expect(
    page.getByRole('navigation', { name: 'Ways in' }).getByRole('heading', {
      name: 'Questions to read',
    }),
  ).toBeVisible();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'A documentary history of machine intelligence.',
  );
});

for (const width of [1440, 390])
  test(`${width}px: a document page marks where it is earliest located and links the row`, async ({
    page,
  }) => {
    const errors = collectErrors(page);
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/document/good-1965');
    const mark = page.getByRole('link', {
      name: 'Earliest located in Propositions about superintelligence, 1863–2025 for A1 Intelligence explosion →',
    });
    await expect(mark).toBeVisible();
    const href = await mark.getAttribute('href');
    expect(href).toMatch(/^\/propositions\/superintelligence\?inspect=/);
    await expect(page.locator('.doc-earliest')).not.toContainText(/\bfirst\b/i);
    expect(await fitsViewport(page)).toBe(true);
    await mark.click();
    await expect(page).toHaveURL(href!);
    const claim = href!.split('inspect=')[1];
    await expect(
      page.locator(`main [data-claim-id="${claim}"]`).first(),
    ).toHaveAttribute('aria-pressed', 'true');
    expect(errors).toEqual([]);
  });

test('a document no collection headlines has no earliest mark', async ({
  page,
}) => {
  await page.goto('/document/rsp-v2-0');
  await expect(page.locator('.doc-earliest')).toHaveCount(0);
});

test('a chosen set of editions has an address that reopens it', async ({
  page,
}) => {
  const errors = collectErrors(page);
  await page.goto('/compare/frontier-safety-frameworks');
  await page.getByRole('button', { name: /^Choose editions/ }).click();
  const select = page
    .getByRole('group', { name: 'Edition shown for each framework' })
    .getByRole('combobox')
    .first();
  const first = await select.locator('option').first().getAttribute('value');
  await select.selectOption(first!);
  await expect(page).toHaveURL(
    new RegExp(`/compare/frontier-safety-frameworks\\?edition=${first}$`),
  );
  await expect(
    page.getByRole('button', { name: /^Choose editions/ }),
  ).toHaveText('Choose editions (1 chosen)');
  // The address reopens the same choice.
  await page.goto(`/compare/frontier-safety-frameworks?edition=${first}`);
  await expect(select).toHaveValue(first!);
  await expect(
    page.getByRole('button', { name: /^Choose editions/ }),
  ).toHaveText('Choose editions (1 chosen)');
  // Back to the latest edition removes it from the address.
  const latest = await select.locator('option').last().getAttribute('value');
  await select.selectOption(latest!);
  await expect(page).toHaveURL(/\/compare\/frontier-safety-frameworks$/);
  // An edition the comparison does not hold names no page.
  await page.goto('/compare/frontier-safety-frameworks?edition=good-1965');
  await expect(page.getByRole('heading', { level: 1 })).not.toHaveText(
    'Compare frameworks',
  );
  expect(errors).toEqual([]);
});
