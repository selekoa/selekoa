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

test('the table opens from the Governance hub: cards as rows, questions as columns', async ({
  page,
}) => {
  const errors = collectErrors(page);
  await page.goto('/governance');
  await page
    .getByRole('link', { name: 'Model cards compared', exact: true })
    .click();
  await expect(page).toHaveURL(/\/compare\/model-cards$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Model cards compared',
  );
  const table = page.locator('.mc-table table');
  // The card column and sixteen questions, numbered as the criteria cite them.
  await expect(table.locator('thead th')).toHaveCount(17);
  await expect(table.locator('thead th').nth(1)).toContainText('Q01');
  await expect(table.locator('thead th').nth(16)).toContainText('Q16');
  // Twenty-eight cards under six developers, alphabetical.
  await expect(table.locator('tbody th[scope="row"]')).toHaveCount(50);
  await expect(table.locator('.cmp-dimension-row')).toHaveText([
    'Anthropic',
    'Google DeepMind',
    'Meta',
    'Microsoft',
    'OpenAI',
    'xAI',
  ]);
  // The table is on the first screen.
  const box = await table.locator('thead').boundingBox();
  expect(box!.y).toBeLessThan(1000);
  expect(errors).toEqual([]);
});

test('a cell opens its quotation, locator and note below its row, and closes', async ({
  page,
}) => {
  const errors = collectErrors(page);
  await page.goto('/compare/model-cards');
  const cell = page.getByRole('button', {
    name: /^Stated ?: o1 system card · 2024, Q05 Framework determination$/,
  });
  await cell.click();
  await expect(cell).toHaveAttribute('aria-expanded', 'true');
  const detail = page.locator('.mc-detail');
  await expect(detail).toBeVisible();
  await expect(detail.locator('h3')).toContainText(
    'Q05 Framework determination',
  );
  await expect(detail.locator('blockquote').first()).toBeVisible();
  await expect(detail.locator('.cmp-locator').first()).not.toBeEmpty();
  await expect(detail.locator('.cmp-note')).toContainText('Note:');
  // The record opens in the drawer, as in Compare frameworks.
  await detail.locator('.doc-inspect').click();
  await expect(page.locator('.cmp-drawer #inspector')).toBeVisible();
  await expect(page).toHaveURL(/inspect=/);
  await page.keyboard.press('Escape');
  await expect(page.locator('.cmp-drawer')).toHaveCount(0);
  await detail.getByRole('button', { name: 'Close' }).click();
  await expect(detail).toHaveCount(0);
  await expect(cell).toBeFocused();
  // A recorded absence shows its search; a question that does not arise, its reason.
  await page
    .getByRole('button', {
      name: /^Not found ?: Claude 2 model card, Q05 Framework determination$/,
    })
    .click();
  await expect(detail.locator('.mc-search')).toContainText('Terms searched');
  await page
    .getByRole('button', {
      name: /^Does not apply ?: .*Llama 2.*, Q03 Framework cited$/,
    })
    .click();
  await expect(detail).toContainText('predates every Meta framework edition');
  expect(errors).toEqual([]);
});

test('the developer filter keeps one developer’s cards, in the address', async ({
  page,
}) => {
  await page.goto('/compare/model-cards');
  await page.getByLabel('Developer').selectOption('openai');
  await expect(page).toHaveURL(/\/compare\/model-cards\?developer=openai$/);
  const rows = page.locator('.mc-table tbody th[scope="row"]');
  await expect(rows).toHaveCount(11);
  await expect(page.locator('.mc-table .cmp-dimension-row')).toHaveText([
    'OpenAI',
  ]);
  await expect(page.getByText('Showing 11 of 50 cards')).toBeVisible();
  // The address opens the same filter afresh.
  await page.goto('/compare/model-cards?developer=xai');
  await expect(rows).toHaveCount(5);
  await page.getByLabel('Developer').selectOption('');
  await expect(rows).toHaveCount(50);
});

test('every cell is also listed card by card, by keyboard', async ({
  page,
}) => {
  await page.goto('/compare/model-cards');
  const list = page.locator('.mc-list');
  await expect(list).not.toHaveAttribute('open', '');
  await list.locator('summary').focus();
  await page.keyboard.press('Enter');
  await expect(list).toHaveAttribute('open', '');
  await expect(list.locator('.mc-list-card')).toHaveCount(50);
  await expect(list.locator('.mc-list-card > dl > div > dt')).toHaveCount(
    50 * 16,
  );
  await expect(
    list.locator('.mc-list-card').first().locator('dt').first(),
  ).toHaveText('Q01 Card date');
});

test('each question has a page listing every card’s cell', async ({ page }) => {
  const errors = collectErrors(page);
  await page.goto('/compare/model-cards');
  await page.getByRole('link', { name: 'Q15 Release decision' }).click();
  await expect(page).toHaveURL(/\/compare\/model-cards\/mc-q15$/);
  await expect(page.locator('#mc-question-title')).toContainText(
    'Release decision',
  );
  await expect(page.locator('.cmp-question .cmp-rows > li')).toHaveCount(50);
  await expect(page.locator('.cmp-question .cmp-criterion')).toContainText(
    'Criterion:',
  );
  // Every question links to its own page.
  const nav = page.getByRole('navigation', { name: 'Every question' });
  await expect(nav.getByRole('link')).toHaveCount(16);
  await nav.getByRole('link', { name: 'Q03 Framework cited' }).click();
  await expect(page).toHaveURL(/\/mc-q03$/);
  expect(errors).toEqual([]);
});

test('the CSV link downloads one row per cell', async ({ page, request }) => {
  await page.goto('/compare/model-cards');
  const link = page.getByRole('link', { name: 'Download every cell as CSV' });
  await expect(link).toHaveAttribute('href', '/compare/model-cards.csv');
  const response = await request.get('/compare/model-cards.csv');
  expect(response.ok()).toBe(true);
  const text = await response.text();
  expect(text.startsWith('card_id,developer,card,card_date,')).toBe(true);
  // A header row and 800 cells; quoted fields may hold line breaks.
  expect(
    text.match(
      /\r\n(?=[a-z0-9-]+,(Anthropic|Google DeepMind|Meta|Microsoft|OpenAI|xAI),)/g,
    ),
  ).toHaveLength(800);
});

test('cards link to the edition they cite, and editions to the cards that cite them', async ({
  page,
}) => {
  await page.goto('/compare/model-cards');
  await page
    .locator('#card-claude-opus-4-5-system-card')
    .getByRole('link', { name: /^Cites RSP · v2\.2/ })
    .click();
  await expect(page).toHaveURL(
    /\/compare\/frontier-safety-frameworks\?edition=rsp-v2-2$/,
  );
  await expect(page.locator('.cmp-table thead')).toContainText('v2.2');
  await page.goto('/compare/frontier-safety-frameworks');
  await page
    .locator('.cmp-cited-by')
    .getByRole('link', { name: /Gemini 4 Argon/ })
    .click();
  await expect(page).toHaveURL(
    /\/compare\/model-cards\?developer=google-deepmind$/,
  );
  await expect(page.locator('.mc-table tbody th[scope="row"]')).toHaveCount(8);
});

for (const width of [1440, 390])
  test(`model cards page at ${width}px: layout and accessibility`, async ({
    page,
  }) => {
    const errors = collectErrors(page);
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('/compare/model-cards');
    // A phone starts with one question at a time, as Compare frameworks does.
    if (width === 390)
      await expect(page.locator('.cmp-rows').first()).toBeVisible();
    else await expect(page.locator('.mc-table')).toBeVisible();
    expect(await fitsViewport(page)).toBe(true);
    expect(await axe(page)).toEqual([]);
    await page
      .getByRole('button', {
        name: width === 390 ? 'All questions' : 'One question',
      })
      .click();
    expect(await fitsViewport(page)).toBe(true);
    if (width === 390) {
      // The table on a phone scrolls inside its own box.
      await page
        .getByRole('button', {
          name: /^Stated ?: System Card: Claude Haiku 5\.5, Q01 Card date$/,
        })
        .click();
      await expect(page.locator('.mc-detail')).toBeVisible();
      expect(await fitsViewport(page)).toBe(true);
    }
    expect(await axe(page)).toEqual([]);
    expect(errors).toEqual([]);
  });

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('the built page carries its table, and a question page its quotations', async ({
    page,
  }) => {
    await page.goto('/compare/model-cards');
    await expect(page.locator('.mc-table tbody th[scope="row"]')).toHaveCount(
      50,
    );
    await expect(page.locator('.mc-list .mc-list-card')).toHaveCount(50);
    await page.goto('/compare/model-cards/mc-q05');
    await expect(
      page.locator('.cmp-question blockquote').first(),
    ).toBeVisible();
  });
});
