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

test('the table opens from the Governance hub: questions as rows, instruments as columns', async ({
  page,
}) => {
  const errors = collectErrors(page);
  await page.goto('/governance');
  await page.getByRole('link', { name: 'Laws compared', exact: true }).click();
  await expect(page).toHaveURL(/\/compare\/laws-compared$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Laws compared',
  );
  const table = page.locator('.lc-table table');
  // Groups, with the revoked and rescission-announced texts last.
  await expect(table.locator('.lc-group-row th')).toHaveText([
    'European Union',
    'United States: states',
    'China',
    'Revoked, or rescission announced',
  ]);
  // The question column and nine instruments, each with its standing.
  const heads = table.locator('thead tr:last-child th');
  await expect(heads).toHaveCount(10);
  await expect(heads.nth(2)).toContainText('Compliance route, not binding');
  await expect(heads.nth(4)).toContainText('As amended, Chapter 96 of 2026');
  await expect(heads.nth(9)).toContainText('Rescission announced');
  // Fifteen questions, numbered as the criteria cite them.
  await expect(table.locator('tbody th[scope="row"]')).toHaveCount(15);
  await expect(table.locator('tbody th[scope="row"]').first()).toContainText(
    'Q01',
  );
  // The table is on the first screen.
  const box = await table.locator('thead').boundingBox();
  expect(box!.y).toBeLessThan(1000);
  expect(errors).toEqual([]);
});

test('a cell opens its passages, locator and note below its row, and closes', async ({
  page,
}) => {
  const errors = collectErrors(page);
  await page.goto('/compare/laws-compared');
  const cell = page.getByRole('button', {
    name: /^Stated ?: EU AI Act, Q07 Incident reporting$/,
  });
  await cell.click();
  await expect(cell).toHaveAttribute('aria-expanded', 'true');
  const detail = page.locator('.mc-detail');
  await expect(detail.locator('h3')).toContainText('Q07 Incident reporting');
  await expect(detail.locator('blockquote').first()).toBeVisible();
  await expect(detail.locator('.cmp-locator').first()).not.toBeEmpty();
  // The record opens in the drawer.
  await detail.locator('.doc-inspect').click();
  await expect(page.locator('.cmp-drawer #inspector')).toBeVisible();
  await expect(page).toHaveURL(/inspect=/);
  await page.keyboard.press('Escape');
  await expect(page.locator('.cmp-drawer')).toHaveCount(0);
  await detail.getByRole('button', { name: 'Close' }).click();
  await expect(detail).toHaveCount(0);
  await expect(cell).toBeFocused();
  // A paraphrased cell says so; a Chinese quotation has its translation.
  await page
    .getByRole('button', {
      name: /^Partly ?: California SB 53, Q05 Risk evaluation$/,
    })
    .click();
  await expect(detail.locator('.lc-paraphrase')).toContainText('Paraphrase:');
  await page
    .getByRole('button', {
      name: /^Stated ?: China, generative AI services \(2023\), Q01 Who is covered$/,
    })
    .click();
  await expect(detail.locator('.lc-translation').first()).toContainText(
    'Working translation:',
  );
  // A recorded absence shows its search; a question that does not arise, its reason.
  await page
    .getByRole('button', {
      name: /^Not found ?: US Executive Order 14110, Q13 Penalties$/,
    })
    .click();
  await expect(detail.locator('.mc-search')).toContainText('Terms searched');
  await page
    .getByRole('button', {
      name: /^Does not apply ?: EU AI Act, Q04 Framework published$/,
    })
    .click();
  await expect(detail).toContainText('no written framework document');
  expect(errors).toEqual([]);
});

test('the New York version switch shows the text as signed, in the address', async ({
  page,
}) => {
  const errors = collectErrors(page);
  await page.goto('/compare/laws-compared');
  await page
    .getByLabel('New York RAISE Act')
    .selectOption('ny-raise-act-chapter-699-2025');
  await expect(page).toHaveURL(
    /\/compare\/laws-compared\?edition=ny-raise-act-chapter-699-2025$/,
  );
  await expect(page.getByRole('status')).toContainText(
    'Showing an earlier text',
  );
  // Q11 of the 2025 text: the rule, with its date marked as computed.
  await page
    .getByRole('button', {
      name: /^Stated ?: New York RAISE Act \(As signed, Chapter 699 of 2025\), Q11 In force$/,
    })
    .click();
  await expect(page.locator('.mc-detail')).toContainText('Computed date:');
  // The address opens the same text afresh; the default is the amended text.
  await page.goto('/compare/laws-compared');
  await expect(page.getByLabel('New York RAISE Act')).toHaveValue(
    'new-york-raise-act-chapter-96-2026',
  );
  expect(errors).toEqual([]);
});

test('the legend gives the four rules for “partly”, the limits and how we searched', async ({
  page,
}) => {
  await page.goto('/compare/laws-compared');
  await page.getByText('What the statuses mean').click();
  await expect(page.locator('.lc-rules li')).toHaveCount(4);
  await page.getByText('How we searched').click();
  const searched = page.locator('.doc-limits-box').last();
  await expect(searched).toContainText('Illinois');
  await expect(searched).toContainText('Korea');
  await expect(searched).toContainText('another family');
});

test('every cell is also listed instrument by instrument, by keyboard', async ({
  page,
}) => {
  await page.goto('/compare/laws-compared');
  const list = page.locator('.mc-list');
  await list.locator('summary').focus();
  await page.keyboard.press('Enter');
  await expect(list).toHaveAttribute('open', '');
  // Nine instruments, New York with both its texts.
  await expect(list.locator('.mc-list-card')).toHaveCount(10);
  await expect(list.locator('.mc-list-card > dl > div > dt')).toHaveCount(
    10 * 15,
  );
  await expect(list.locator('h2').last()).toHaveText(
    'Revoked, or rescission announced',
  );
});

test('each question has a page listing every instrument’s cell', async ({
  page,
}) => {
  const errors = collectErrors(page);
  await page.goto('/compare/laws-compared');
  await page.getByRole('link', { name: 'Q09 Whistleblowers' }).click();
  await expect(page).toHaveURL(/\/compare\/laws-compared\/l-q09$/);
  await expect(page.locator('#lc-question-title')).toContainText(
    'Whistleblowers',
  );
  // Every text: nine instruments, New York with both its texts.
  await expect(page.locator('.cmp-question .cmp-rows > li')).toHaveCount(10);
  const nav = page.getByRole('navigation', { name: 'Every question' });
  await expect(nav.getByRole('link')).toHaveCount(15);
  await nav.getByRole('link', { name: 'Q14 Enforcer' }).click();
  await expect(page).toHaveURL(/\/l-q14$/);
  expect(errors).toEqual([]);
});

test('the CSV link downloads one row per text and question', async ({
  page,
  request,
}) => {
  await page.goto('/compare/laws-compared');
  const link = page.getByRole('link', { name: 'Download every cell as CSV' });
  await expect(link).toHaveAttribute('href', '/compare/laws-compared.csv');
  const response = await request.get('/compare/laws-compared.csv');
  expect(response.ok()).toBe(true);
  const text = await response.text();
  expect(
    text.startsWith('instrument,jurisdiction,instrument_standing,text,'),
  ).toBe(true);
  // A header row and 150 cells (both New York texts); fields break lines
  // only with a bare line feed.
  expect(text.split('\r\n')).toHaveLength(1 + 150 + 1);
});

test('Compare frameworks and the frameworks-and-law page link to the laws', async ({
  page,
}) => {
  await page.goto('/compare/frontier-safety-frameworks');
  await page
    .getByRole('link', { name: /How laws treat the same questions/ })
    .click();
  await expect(page).toHaveURL(/\/compare\/laws-compared$/);
  await page.goto('/guide/frontier-frameworks-and-law');
  await page
    .getByRole('link', { name: /Laws compared: how binding texts/ })
    .click();
  await expect(page).toHaveURL(/\/compare\/laws-compared$/);
});

for (const width of [1440, 390])
  test(`laws compared page at ${width}px: layout and accessibility`, async ({
    page,
  }) => {
    const errors = collectErrors(page);
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('/compare/laws-compared');
    // A phone starts with one question at a time, as Model cards compared does.
    if (width === 390)
      await expect(page.locator('.cmp-rows').first()).toBeVisible();
    else await expect(page.locator('.lc-table')).toBeVisible();
    expect(await fitsViewport(page)).toBe(true);
    expect(await axe(page)).toEqual([]);
    await page
      .getByRole('button', {
        name: width === 390 ? 'All questions' : 'One question',
      })
      .click();
    expect(await fitsViewport(page)).toBe(true);
    if (width === 390) {
      await page
        .getByRole('button', {
          name: /^Stated ?: California SB 53, Q01 Who is covered$/,
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

  test('the built page carries its table and list, and a question page its quotations', async ({
    page,
  }) => {
    await page.goto('/compare/laws-compared');
    await expect(page.locator('.lc-table tbody th[scope="row"]')).toHaveCount(
      15,
    );
    await expect(page.locator('.mc-list .mc-list-card')).toHaveCount(10);
    await page.goto('/compare/laws-compared/l-q07');
    await expect(
      page.locator('.cmp-question blockquote').first(),
    ).toBeVisible();
  });
});
