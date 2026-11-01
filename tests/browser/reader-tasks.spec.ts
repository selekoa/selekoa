import { expect, test, type Page } from './fixtures';
import { stubAnalytics } from './fixtures';

// Paths fixed after the reader-task test of 2026-10-29
// (review/reader-tasks-2026-10-29.md).

function collectErrors(page: Page) {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  return errors;
}

const claimId = 'cs-openai-lp-board-control-2019';
const statement =
  'OpenAI’s March 2019 announcement stated that OpenAI LP is controlled by the board of OpenAI Nonprofit';

test('a claim page leads with its statement, names its collections and keeps its panel', async ({
  page,
}) => {
  const errors = collectErrors(page);
  await page.goto('/claim/' + claimId);
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    statement,
  );
  const inspector = page.getByRole('complementary', {
    name: 'Evidence inspector',
  });
  await expect(inspector).toContainText('Machine-checked');
  const appears = page.getByRole('region', { name: 'Where it appears' });
  await appears
    .getByRole('link', { name: /OpenAI’s control structure, 2015–2026/ })
    .click();
  await expect(page).toHaveURL(
    new RegExp(`/control/openai\\?inspect=${claimId}$`),
  );
  await expect(
    page.locator(`main [data-claim-id="${claimId}"]`).first(),
  ).toHaveAttribute('aria-pressed', 'true');
  await expect(inspector).toContainText(statement);
  expect(errors).toEqual([]);
});

test('a claim page on a phone puts the claim before the explorer', async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  await stubAnalytics(context);
  const page = await context.newPage();
  await page.goto('/claim/' + claimId);
  await page.waitForSelector('html[data-selekoa-ready]', { state: 'attached' });
  await expect(page.getByRole('heading', { level: 1 })).toBeInViewport();
  await expect(page.locator('#entity-search')).toHaveCount(0);
  const panel = page.locator('#inspector');
  const top = await panel.evaluate(
    (el) => el.getBoundingClientRect().top + window.scrollY,
  );
  expect(top).toBeLessThan(2500);
  await context.close();
});

test('claim rows are links to claim pages and open the panel in place', async ({
  page,
}) => {
  await page.goto('/document/rsp-v2-0');
  const row = page
    .locator('#document-comparison')
    .locator('..')
    .getByRole('button', {
      name: /comparison question “Autonomy, self-improvement or AI research and development”/,
    });
  await expect(row).toHaveAttribute('href', '/claim/cmp-rsp-v2-0-d1-autonomy');
  // The row shows what the edition says, not only that it says something.
  await expect(row).toContainText('Autonomous AI R&D Capability Threshold');
  await row.click();
  await expect(page).toHaveURL(
    /\/document\/rsp-v2-0\?inspect=cmp-rsp-v2-0-d1-autonomy$/,
  );
  await expect(row).toHaveAttribute('aria-pressed', 'true');
  // Close returns to the row; Space presses it again, as on a button.
  await page
    .locator('#inspector')
    .getByRole('button', { name: 'Close ×' })
    .click();
  await expect(row).toBeFocused();
  await expect(row).toHaveAttribute('aria-pressed', 'false');
  await row.press(' ');
  await expect(row).toHaveAttribute('aria-pressed', 'true');
});

test.describe('without scripts', () => {
  test.use({ javaScriptEnabled: false });
  test('a record page reaches a claim page through its rows', async ({
    page,
  }) => {
    await page.goto('/document/california-sb-53');
    const links = page.locator('a[href^="/claim/"]');
    expect(await links.count()).toBeGreaterThan(20);
    // A relation recorded from another document reads from that document.
    await expect(page.locator('#document-other').locator('..')).toContainText(
      'explicitly links itself to this document',
    );
    await links.first().click();
    await expect(page).toHaveURL(/\/claim\//);
    await expect(page.locator('h1')).not.toHaveText(
      'Explore the documentary record',
    );
    await expect(page.locator('#inspector')).toContainText('Machine-checked');
  });

  test('the guided reading’s contents are links to its sections', async ({
    page,
  }) => {
    await page.goto('/guide/frontier-frameworks-and-law');
    const contents = page.getByRole('navigation', { name: 'On this page' });
    const eu = contents.getByRole('link', { name: 'European Union' });
    await expect(eu).toHaveAttribute('href', /^#fl-section-/);
    const target = (await eu.getAttribute('href'))!.slice(1);
    await expect(page.locator('#' + target)).toHaveCount(1);
  });
});

test('a section link moves to its heading without changing the address', async ({
  page,
}) => {
  await page.goto('/guide/frontier-frameworks-and-law');
  await page
    .getByRole('navigation', { name: 'On this page' })
    .getByRole('link', { name: 'United States: states' })
    .click();
  await expect(page).toHaveURL(/\/guide\/frontier-frameworks-and-law$/);
  const heading = page.locator(':focus');
  await expect(heading).toHaveText('United States: states');
  await expect(heading).toBeInViewport();
});

test('a dossier is the page’s main heading and links to its control structure', async ({
  page,
}) => {
  await page.goto('/dossier/openai');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('OpenAI');
  await page
    .getByRole('link', {
      name: /^OpenAI’s control structure, 2015–2026: who held/,
    })
    .click();
  await expect(page).toHaveURL(/\/control\/openai$/);
  await page.goto('/dossier/deepseek');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(/^DeepSeek/);
  await expect(
    page.getByRole('link', { name: /control structure/ }),
  ).toHaveCount(0);
});

test('search can list results earliest first and says what that shows', async ({
  page,
}) => {
  await page.goto('/search#q=AGI');
  await page.getByRole('combobox', { name: 'Order' }).selectOption('date');
  await expect(page.locator('#search-help')).toContainText('not a first use');
  const passages = page.getByRole('region', { name: /Evidence passages/ });
  // The technical history admission (2026-10-31) records Gubrud's November
  // 1997 use of the term, which now comes first; before it, a passage of
  // 2002-06-23 did.
  await expect(passages.locator('.search-hit').first()).toContainText(
    '1997-11',
  );
  const dates = await page
    .getByRole('region', { name: /^Claims/ })
    .locator('.search-hit-meta')
    .evaluateAll((els) =>
      els.map((el) => /\d{4}(-\d\d){0,2}/.exec(el.textContent ?? '')?.[0]),
    );
  const dated = dates.filter(Boolean) as string[];
  expect(dated).toEqual([...dated].sort());
});
