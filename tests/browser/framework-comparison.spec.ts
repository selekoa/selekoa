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

async function setTheme(page: Page, theme: 'light' | 'dark') {
  const toggle = page.getByRole('button', { name: 'Dark mode' });
  if ((await toggle.getAttribute('aria-pressed')) !== String(theme === 'dark'))
    await toggle.click();
  await expect(page.locator('html')).toHaveAttribute(
    'data-selekoa-theme',
    theme,
  );
}

const fitsViewport = (page: Page) =>
  page.evaluate(
    () => document.documentElement.scrollWidth <= window.innerWidth,
  );

test('the comparison opens from the Governance hub and shows each framework’s words under shared questions', async ({
  page,
}) => {
  const errors = collectErrors(page);
  await page.goto('/governance');
  await page.getByRole('link', { name: 'Compare frameworks →' }).click();
  await expect(page).toHaveURL(/\/compare\/frontier-safety-frameworks$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Compare frameworks',
  );
  await expect(page.locator('.cmp-scope')).toContainText(
    'It does not show implementation, compliance or effectiveness',
  );
  // Rule B wording in the legend.
  await expect(page.locator('.cmp-legend')).toContainText(
    'in a weaker form than the criterion’s own words',
  );
  // Wide screen: the table, one column per framework, latest editions.
  const table = page.locator('.cmp-table table');
  await expect(table.locator('thead th')).toHaveCount(8);
  await expect(table.locator('thead th').nth(1)).toContainText('v3.4');
  const halt = table.locator('tbody tr', {
    has: page.locator('th', {
      hasText: 'Pause, non-deployment or non-training',
    }),
  });
  await expect(halt.locator('td')).toHaveCount(7);
  await expect(halt.locator('td').first()).toContainText(
    'We will delay AI development and deployment as needed',
  );
  // No colour scale: every status uses the same text style.
  const colours = await page
    .locator('.cmp-status')
    .evaluateAll((els) => [
      ...new Set(els.map((e) => getComputedStyle(e).color)),
    ]);
  expect(colours).toHaveLength(1);
  // Keyboard: a cell opens its record in the claim panel.
  await halt.locator('[data-claim-id="cmp-rsp-v3-4-d3-halt"]').focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/inspect=cmp-rsp-v3-4-d3-halt/);
  await expect(page.locator('#inspector')).toContainText(
    'Pause, non-deployment or non-training',
  );
  await page
    .locator('#inspector')
    .getByRole('button', { name: /Close/ })
    .first()
    .click();
  // An earlier edition can be chosen per framework.
  await page
    .getByRole('combobox', { name: /Anthropic · Responsible Scaling Policy/ })
    .selectOption('rsp-2023');
  await expect(table.locator('thead th').nth(1)).toContainText('v1.0');
  await expect(
    halt
      .locator('td')
      .first()
      .locator('[data-claim-id="cmp-rsp-2023-d3-halt"]'),
  ).toHaveCount(1);
  expect(errors).toEqual([]);
});

test('paraphrased questions are marked as paraphrases, never as quotations', async ({
  page,
}) => {
  const errors = collectErrors(page);
  await page.goto('/compare/frontier-safety-frameworks?facet=D5.cadence');
  await expect(page.locator('#cmp-question-title')).toContainText(
    'Evaluation timing',
  );
  const rows = page.locator('.cmp-rows > li');
  await expect(rows).toHaveCount(7);
  const anthropic = rows.filter({ hasText: 'Anthropic' });
  await expect(anthropic.locator('.cmp-paraphrase').first()).toContainText(
    /^Paraphrase: The edition/,
  );
  await expect(anthropic.locator('blockquote')).toHaveCount(0);
  await expect(anthropic.locator('.cmp-locator').first()).toContainText(
    'PDF p.',
  );
  await anthropic
    .getByRole('button', { name: /Inspect sources and checks/ })
    .click();
  await expect(page.locator('#inspector')).toContainText('Explicit paraphrase');
  await page
    .locator('#inspector')
    .getByRole('button', { name: /Close/ })
    .first()
    .click();
  // A first edition has no earlier edition to change from.
  await page
    .getByRole('combobox', { name: 'Question' })
    .selectOption('D8.changes');
  await page
    .getByRole('combobox', { name: /^Anthropic/ })
    .selectOption('rsp-2023');
  await expect(rows.filter({ hasText: 'Anthropic' })).toContainText(
    'Does not apply',
  );
  expect(errors).toEqual([]);
});

test('one question at a time, from a link, with absences and unchecked cells explained', async ({
  page,
}) => {
  const errors = collectErrors(page);
  await page.goto('/compare/frontier-safety-frameworks?facet=D4.oversight');
  await expect(page.locator('#cmp-question-title')).toContainText(
    'Board or external oversight',
  );
  const rows = page.locator('.cmp-rows > li');
  await expect(rows).toHaveCount(7);
  const xai = rows.filter({ hasText: 'xAI' });
  await expect(xai).toContainText('Not found in the recorded search');
  await xai.getByRole('button', { name: /Open the search record/ }).click();
  await expect(page.locator('#inspector')).toContainText('search');
  await page
    .locator('#inspector')
    .getByRole('button', { name: /Close/ })
    .first()
    .click();
  await page
    .getByRole('combobox', { name: 'Question' })
    .selectOption('D3.halt');
  await expect(page).toHaveURL(/facet=D3\.halt/);
  // Meta Version 1.1: re-checked cells are stated or not found.
  await page
    .getByRole('combobox', { name: /^Meta/ })
    .selectOption('meta-faf-v1-1');
  await expect(rows.filter({ hasText: 'Meta' })).toContainText('Stated');
  await expect(rows.filter({ hasText: 'Meta' })).not.toContainText(
    'Recorded, not re-checked',
  );
  await page
    .getByRole('combobox', { name: 'Question' })
    .selectOption('D6.competitor');
  await expect(rows.filter({ hasText: 'Meta' })).toContainText(
    'Not found in the recorded search',
  );
  await page
    .getByRole('combobox', { name: 'Question' })
    .selectOption('D4.oversight');
  await expect(rows.filter({ hasText: 'Meta' })).toContainText(
    'Not found in the recorded search',
  );
  await expect(rows.filter({ hasText: 'Meta' })).not.toContainText(
    'Not checked',
  );
  // The document histories link here.
  await page.goto('/documents/frontier-safety-frameworks');
  await page
    .getByRole('link', { name: /Compare the frameworks question by question/ })
    .click();
  await expect(page).toHaveURL(/\/compare\/frontier-safety-frameworks/);
  expect(errors).toEqual([]);
});

for (const width of [1440, 390])
  for (const theme of ['light', 'dark'] as const)
    test(`comparison page ${width}px ${theme}: layout and accessibility`, async ({
      page,
    }) => {
      const errors = collectErrors(page);
      await page.setViewportSize({ width, height: 1000 });
      await page.goto('/compare/frontier-safety-frameworks');
      await setTheme(page, theme);
      await page.locator('.doc-limits-box summary').click();
      // A phone starts with one question at a time.
      if (width === 390) await expect(page.locator('.cmp-rows')).toBeVisible();
      else await expect(page.locator('.cmp-table')).toBeVisible();
      expect(await fitsViewport(page)).toBe(true);
      expect(
        (
          await new AxeBuilder({ page })
            .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
            .analyze()
        ).violations,
      ).toEqual([]);
      // The other layout too.
      await page
        .getByRole('button', {
          name:
            width === 390
              ? 'All questions in a table'
              : 'One question at a time',
        })
        .click();
      expect(await fitsViewport(page)).toBe(true);
      expect(
        (
          await new AxeBuilder({ page })
            .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
            .analyze()
        ).violations,
      ).toEqual([]);
      expect(errors).toEqual([]);
    });

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('the built comparison carries its table, statuses, passages and sources', async ({
    page,
  }) => {
    await page.goto('/governance');
    await expect(
      page.getByRole('link', { name: 'Compare frameworks →' }),
    ).toHaveAttribute('href', '/compare/frontier-safety-frameworks');
    const response = await page.goto('/compare/frontier-safety-frameworks');
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle(
      'Compare frontier safety frameworks · Selekoa',
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      /\/compare\/frontier-safety-frameworks$/,
    );
    const table = page.locator('.cmp-table');
    await expect(table).toBeVisible();
    await expect(table).toContainText('Safeguards required');
    await expect(table).toContainText('Board or external oversight');
    await expect(table).toContainText('Anthropic');
    await expect(table).toContainText('xAI');
    await expect(table).toContainText('Not found in the recorded search');
    await expect(table.locator('blockquote').first()).toBeVisible();
    // Paraphrased questions are in the built table, marked as paraphrases.
    await expect(table).toContainText('Risk domains covered');
    await expect(table).toContainText('Revision process and approval');
    await expect(table.locator('.cmp-paraphrase').first()).toContainText(
      'Paraphrase:',
    );
    await expect(page.locator('.cmp-legend')).toContainText(
      'It does not show that the developer lacks the practice',
    );
    await expect(page.locator('.cmp-scope')).toContainText(
      'It does not show implementation, compliance or effectiveness',
    );
    await expect(
      page.getByRole('link', { name: /Edition text/ }).first(),
    ).toHaveAttribute('href', /^https:\/\//);
    await expect(page.locator('a[href^="#/"]')).toHaveCount(0);
  });
});

test('the browser takes over the built comparison in place', async ({
  page,
}) => {
  const errors = collectErrors(page);
  await page.goto('/compare/frontier-safety-frameworks', {
    waitUntil: 'commit',
  });
  await page.waitForSelector('.cmp-table');
  await page.evaluate(() => {
    (window as unknown as { built: Element }).built =
      document.querySelector('.cmp-table')!;
  });
  await page.waitForLoadState('networkidle');
  expect(
    await page.evaluate(
      () =>
        document.querySelector('.cmp-table') ===
        (window as unknown as { built: Element }).built,
    ),
  ).toBe(true);
  await expect(
    page.getByRole('combobox', { name: /^Anthropic/ }),
  ).toBeEnabled();
  expect(errors).toEqual([]);
});
