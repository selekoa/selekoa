import { test, expect, type Page } from './fixtures';
import AxeBuilder from '@axe-core/playwright';

const path = '/guide/frontier-frameworks-by-edition';
const title = 'Frontier AI safety frameworks, edition by edition, 2023–2026';

/** Words that state a trend or an assessment; never in the page's own text. */
const trendWords =
  /(?<![\w-])(tighten(ed|ing|s)?|weaken(ed|ing|s)?|matur(ed|ing|ity|e)|loosen(ed|ing|s)?|strengthen(ed|ing|s)?|soften(ed|ing|s)?|stricter|laxer|improv(ed|ement|es|ing)|progress(ed|ive)?|evolv(ed|es|ing)|evolution|watered|rolled back|retreat(ed|s)?|expanded|narrowed|broadened|diluted|eroded)\b/i;

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

/** The page's own text: passages, notes and record statements removed. */
const ownText = (page: Page) =>
  page.locator('#guide').evaluate((main) => {
    const copy = main.cloneNode(true) as HTMLElement;
    copy
      .querySelectorAll('[data-record-text], .record-rows')
      .forEach((e) => e.remove());
    return copy.textContent ?? '';
  });

test('frameworks edition by edition: reached from the governance hub, read framework by framework', async ({
  page,
}) => {
  const errors = collectErrors(page);
  await page.goto('/governance');
  await page
    .getByRole('link', { name: 'Read the frameworks edition by edition →' })
    .click();
  await expect(page).toHaveURL(new RegExp(path + '$'));
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(title);
  await expect(page.locator('.fc-page .eyebrow').first()).toContainText(
    '22 framework editions · 7 frameworks · 18 questions',
  );

  // One section per framework, in the comparison's order.
  const families = page.locator('.fc-family > h2');
  await expect(families).toHaveCount(7);
  await expect(families.first()).toHaveText(
    'Anthropic · Responsible Scaling Policy',
  );

  // Anthropic: nine editions, in order, and a status for every question.
  const rsp = page.locator('.fc-family', {
    has: page.locator('#fc-anthropic-rsp'),
  });
  await expect(rsp.locator('.fc-edition')).toHaveCount(9);
  const dates = await rsp.locator('.fc-edition time').allTextContents();
  expect(dates).toEqual([...dates].sort());
  const table = rsp.locator('.fc-status-table');
  await expect(table.locator('thead th')).toHaveCount(10);
  await expect(table.locator('tbody th[scope="row"]')).toHaveCount(18);
  await expect(table.locator('td.fc-differs').first()).toBeVisible();

  // A question lists where consecutive editions' statuses differ, with both
  // cells, and its passages edition by edition.
  const step = rsp.locator('.fc-step-status').first();
  await expect(step).toContainText('status differs');
  await expect(step.locator('a[data-claim-link]')).toHaveCount(2);
  const question = rsp.locator('.fc-question').first();
  await question.locator('summary').click();
  await expect(question.locator('.fc-cells > li')).toHaveCount(9);

  // A cell opens its record in the inspector, by keyboard.
  const first = table.locator('[data-claim-id="cmp-rsp-2023-d1-cbrn"]');
  await first.focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/inspect=cmp-rsp-2023-d1-cbrn/);
  await expect(
    page.getByRole('complementary', { name: 'Evidence inspector' }),
  ).toContainText('comparison question');

  // OpenAI's Frontier Governance Framework has one compared edition.
  const fgf = page.locator('.fc-family', {
    has: page.locator('#fc-openai-frontier-governance'),
  });
  await expect(fgf.locator('.fc-question').first()).toContainText(
    'One compared edition',
  );

  // Across developers: one row per question, one column per framework.
  const earliest = page.locator('.fc-earliest-table');
  await expect(earliest.locator('tbody tr')).toHaveCount(18);
  await expect(earliest.locator('thead th')).toHaveCount(8);
  await expect(page.locator('.fc-earliest')).toContainText(
    'earliest located in the compared editions',
  );

  // Not covered names the editions read from archive copies.
  const notCovered = page.locator('.fl-not-covered');
  await expect(notCovered).toContainText('Editions read from archive copies');
  await expect(notCovered).toContainText('Meta FAF · v1.1');
  await expect(notCovered).toContainText('No cell is held or unchecked');

  // The page's own words state no trend.
  expect((await ownText(page)).match(trendWords)).toBeNull();

  // Every internal link on the page resolves to a built page.
  const hrefs = await page
    .locator('#guide a[href^="/"]')
    .evaluateAll((els) => [
      ...new Set(els.map((e) => (e as HTMLAnchorElement).pathname)),
    ]);
  expect(hrefs.length).toBeGreaterThan(300);
  for (const href of hrefs) {
    const response = await page.request.get(href);
    expect(response.status(), href).toBe(200);
  }

  const results = await new AxeBuilder({ page }).include('#guide').analyze();
  expect(results.violations).toEqual([]);
  expect(errors).toEqual([]);
});

test('frameworks edition by edition: a question opens in the comparison', async ({
  page,
}) => {
  const errors = collectErrors(page);
  await page.goto(path);
  const link = page
    .locator('.fc-family', { has: page.locator('#fc-anthropic-rsp') })
    .locator('.fc-question', {
      hasText: 'Pause, non-deployment or non-training',
    })
    .getByRole('link', { name: 'This question in the comparison →' });
  await expect(link).toHaveAttribute(
    'href',
    '/compare/frontier-safety-frameworks/d3-halt',
  );
  await link.click();
  await expect(page).toHaveURL(
    /\/compare\/frontier-safety-frameworks\/d3-halt$/,
  );
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Compare frameworks',
  );
  expect(errors).toEqual([]);
});

test('frameworks edition by edition: phone layout', async ({ page }) => {
  const errors = collectErrors(page);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(path);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(title);
  expect(await fitsViewport(page)).toBe(true);
  // On a phone the record opens directly below the table row that opened it.
  const cell = page.locator(
    '.fc-status-table [data-claim-id="cmp-rsp-v2-0-d3-halt"]',
  );
  await cell.scrollIntoViewIfNeeded();
  await cell.click();
  await expect(page.locator('.inspector-slot #inspector')).toBeVisible();
  expect(await fitsViewport(page)).toBe(true);
  await page.locator('.fc-earliest').scrollIntoViewIfNeeded();
  expect(await fitsViewport(page)).toBe(true);
  expect(errors).toEqual([]);
});

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false });
  test('frameworks edition by edition is pre-rendered with its tables and passages', async ({
    page,
  }) => {
    await page.goto(path);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(title);
    await expect(page.locator('.fc-status-table')).toHaveCount(7);
    await expect(page.locator('.fc-earliest-table tbody tr')).toHaveCount(18);
    // Passages are in the built page, inside closed details.
    expect(
      await page.locator('.fc-cells .cmp-passages').count(),
    ).toBeGreaterThan(300);
    const sitemap = await page.request.get('/sitemap.xml');
    expect(await sitemap.text()).toContain(path);
  });
});
