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

const scripts = (page: Page) => {
  const loaded: string[] = [];
  page.on('request', (request) => {
    if (request.resourceType() === 'script')
      loaded.push(new URL(request.url()).pathname);
  });
  return loaded;
};

test('the start page renders without the records, which load on demand', async ({
  page,
}) => {
  const errors = collectErrors(page);
  const loaded = scripts(page);
  await page.goto('/');
  await expect(
    page.getByRole('heading', {
      level: 1,
      name: 'A documentary history of machine intelligence.',
    }),
  ).toBeVisible();
  await expect(page.getByText(/^Current coverage: \d+ claims/)).toBeVisible();
  await page.waitForLoadState('networkidle');
  expect(loaded.some((p) => /\/records-/.test(p))).toBe(false);
  expect(loaded.some((p) => /\/Workspace-/.test(p))).toBe(false);
  // A start-page link carries over to the page it names once records load.
  await page
    .getByRole('link', {
      name: 'How did each developer’s safety framework change between editions?',
    })
    .click();
  await expect(
    page.getByRole('heading', { level: 1, name: 'Frontier safety frameworks' }),
  ).toBeVisible();
  await expect(page).toHaveURL(/\/documents\/frontier-safety-frameworks$/);
  expect(loaded.some((p) => /\/records-/.test(p))).toBe(true);
  expect(errors).toEqual([]);
});

test('search finds claims and passages, groups them and opens the evidence', async ({
  page,
}) => {
  const errors = collectErrors(page);
  await page.goto('/');
  await page
    .getByRole('navigation', { name: 'Primary' })
    .getByRole('link', { name: 'Search' })
    .click();
  const field = page.getByRole('searchbox', { name: 'Search terms' });
  await expect(field).toBeFocused();
  await field.fill('whistleblower');
  const status = page.locator('#search-status');
  await expect(status).toContainText('records match “whistleblower”');
  await expect(page).toHaveURL(/\/search#q=whistleblower$/);
  const claims = page.getByRole('region', { name: /^Claims/ });
  const passages = page.getByRole('region', { name: /^Evidence passages/ });
  await expect(
    claims.locator('[data-claim-id="sb-whistleblower-anti-retaliation"]'),
  ).toBeVisible();
  await expect(
    passages.locator('[data-claim-id="sb-whistleblower-anti-retaliation"]'),
  ).not.toHaveCount(0);
  await expect(claims.locator('mark').first()).toHaveText(/whistleblower/i);
  // Each result shows its claim's derivation and resolution.
  await expect(claims.locator('.search-hit-meta').first()).toContainText(
    /Stated in source|Inferred|Question posed by Selekoa/,
  );
  // Enter moves to the first result; Enter again opens its evidence.
  await field.press('Enter');
  await expect(page.locator('.search-hit').first()).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#inspector')).toBeFocused();
  await expect(page).toHaveURL(/\/search#q=whistleblower&inspect=/);
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .analyze()
    ).violations,
  ).toEqual([]);
  expect(errors).toEqual([]);
});

test('search covers an ASL term and a decision-maker, with filters and a names mode', async ({
  page,
}) => {
  await page.goto('/search#q=ASL-3');
  const status = page.locator('#search-status');
  await expect(status).toContainText(/claims? and \d+ evidence passages?/);
  await page
    .getByLabel('Organisation', { exact: true })
    .selectOption({ label: 'OpenAI' });
  await expect(status).toContainText('No claim statement');
  await expect(status).toContainText('with these filters');
  await page
    .getByLabel('Organisation', { exact: true })
    .selectOption({ label: 'Anthropic' });
  await page
    .getByLabel('Record type', { exact: true })
    .selectOption({ label: 'Claims' });
  await expect(status).toContainText(/claims?\.$/);
  await expect(
    page.getByRole('region', { name: /^Evidence passages/ }),
  ).toHaveCount(0);
  await page.getByRole('button', { name: 'Reset filters' }).click();

  const field = page.getByRole('searchbox', { name: 'Search terms' });
  await field.fill('Responsible Scaling Officer');
  await expect(
    page
      .getByRole('region', { name: /^Claims/ })
      .locator('[data-claim-id="kaplan-anthropic-rso-2024"]'),
  ).toBeVisible();
  await expect(
    page.locator('mark', { hasText: 'Responsible Scaling Officer' }),
  ).not.toHaveCount(0);

  await field.fill('Altman');
  await page.getByRole('radio', { name: 'Names and aliases only' }).check();
  await expect(status).toHaveText(
    '1 record matches “Altman” by name or alias.',
  );
  await expect(page).toHaveURL(/\/search#q=Altman&mode=names$/);
  await page.getByRole('link', { name: 'Sam Altman: person page' }).click();
  await expect(page.locator('#record-page')).toBeFocused();
});

test('the explorer lookup says what it searched and links to full search', async ({
  page,
}) => {
  await page.goto('/explore');
  const lookup = page.getByRole('searchbox');
  await lookup.fill('whistleblower');
  const results = page.locator('#search-results');
  await expect(results.getByRole('status')).toHaveText(
    'No name or alias matches “whistleblower”.',
  );
  await lookup.fill('MIRI');
  await expect(results.getByRole('status')).toHaveText(
    /^\d+ records? match(es)? by name or alias$/,
  );
  await results
    .getByRole('button', {
      name: 'Search claims, passages and sources for “MIRI” →',
    })
    .click();
  await expect(page).toHaveURL(/\/search#q=MIRI$/);
  await expect(
    page.getByRole('searchbox', { name: 'Search terms' }),
  ).toHaveValue('MIRI');
});

test('a source whose original address is dead shows its capture in results', async ({
  page,
}) => {
  await page.goto('/search#q=Staring%20into%20the%20Singularity');
  const hit = page
    .getByRole('region', { name: /^Sources/ })
    .locator('.search-hit')
    .filter({ hasText: 'Staring into the Singularity (version 1.2.1)' });
  await expect(
    hit.getByRole('link', { name: 'Open the source ↗' }),
  ).toHaveAttribute('href', 'http://sysopmind.com/singularity.html');
  await expect(
    hit.getByRole('link', {
      name: /^Archived copy, captured 2000-12-04/,
    }),
  ).toHaveAttribute(
    'href',
    'https://web.archive.org/web/20001204213100/http://sysopmind.com:80/singularity.html',
  );
});
