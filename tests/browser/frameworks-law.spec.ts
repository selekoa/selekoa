import { test, expect, type Page } from './fixtures';
import AxeBuilder from '@axe-core/playwright';

const path = '/guide/frontier-frameworks-and-law';

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

test('frameworks and law: reached from the governance hub, with a timeline built from the records', async ({
  page,
}) => {
  const errors = collectErrors(page);
  await page.goto('/governance');
  await page.getByRole('link', { name: 'Read frameworks and law →' }).click();
  await expect(page).toHaveURL(new RegExp(path + '$'));
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Frontier AI frameworks and law, 2023–2026',
  );

  // The timeline: year groups in order, rows in date order, both lanes.
  const timeline = page.locator('#fl-timeline');
  const years = await timeline.locator('.fl-year > h3').allTextContents();
  expect(years.slice(0, 4)).toEqual(['2023', '2024', '2025', '2026']);
  const rows = timeline.locator('.fl-row');
  expect(await rows.count()).toBeGreaterThan(100);
  const dates = await timeline.locator('.fl-row time').allTextContents();
  expect(dates).toEqual([...dates].sort());
  await expect(timeline.locator('.fl-row-framework').first()).toBeVisible();
  // Announcements stay announcements; a future date is marked as such.
  await expect(
    timeline.locator('.fl-row', { hasText: 'Revocation announced' }),
  ).toHaveCount(1);
  await expect(timeline.locator('.fl-row-scheduled').first()).toContainText(
    'after the latest check',
  );

  // The lane filter shows only framework editions. The guide was opened from
  // its slice, so the click waits for the records, as on a fresh load.
  await timeline.getByRole('button', { name: 'Framework editions' }).click();
  await expect
    .poll(
      async () =>
        new Set(
          await timeline
            .locator('.fl-row')
            .evaluateAll((els) => els.map((e) => e.getAttribute('data-lane'))),
        ),
    )
    .toEqual(new Set(['framework']));
  await timeline.getByRole('button', { name: 'Everything' }).click();

  // A row opens its record in the inspector, by keyboard.
  const revoked = timeline.locator('[data-claim-id="fl-us-eo14110-revoked"]');
  await revoked.focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/inspect=fl-us-eo14110-revoked/);
  await expect(
    page.getByRole('complementary', { name: 'Evidence inspector' }),
  ).toContainText('hereby revoked');

  // Each text shows its standing; the links table names the texts.
  await expect(
    page.locator('.fl-instrument', { hasText: 'California SB 53' }).first(),
  ).toContainText('Law requiring a framework');
  await expect(
    page.locator('.fl-instrument', { hasText: 'EO 14110 (2023)' }).first(),
  ).toContainText('Revoked');
  await expect(page.locator('.fl-link-table thead th').first()).toHaveText(
    'Framework',
  );
  await expect(page.locator('#fl-not-covered')).toContainText(
    'Held at admission',
  );

  // Every internal link on the page resolves to a built page.
  const hrefs = await page
    .locator('#guide a[href^="/"]')
    .evaluateAll((els) => [
      ...new Set(els.map((e) => (e as HTMLAnchorElement).pathname)),
    ]);
  expect(hrefs.length).toBeGreaterThan(20);
  for (const href of hrefs) {
    const response = await page.request.get(href);
    expect(response.status(), href).toBe(200);
  }

  const results = await new AxeBuilder({ page }).include('#guide').analyze();
  expect(results.violations).toEqual([]);
  expect(errors).toEqual([]);
});

test('frameworks and law: start-page entry and phone layout', async ({
  page,
}) => {
  const errors = collectErrors(page);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page
    .getByRole('link', {
      name: /^Which laws and government texts address frontier AI developers/,
    })
    .click();
  await expect(page).toHaveURL(new RegExp(path + '$'));
  await expect(page.locator('#fl-timeline .fl-row').first()).toBeVisible();
  expect(await fitsViewport(page)).toBe(true);
  // On a phone the record opens directly below the row that opened it.
  const row = page
    .locator('#fl-timeline .fl-row', {
      has: page.locator('[data-claim-id="fl-us-ca-sb1047-vetoed"]'),
    })
    .first();
  await row.locator('[data-claim-id="fl-us-ca-sb1047-vetoed"]').click();
  await expect(page.locator('.inspector-slot #inspector')).toBeVisible();
  expect(await fitsViewport(page)).toBe(true);
  await page.locator('#fl-links').scrollIntoViewIfNeeded();
  expect(await fitsViewport(page)).toBe(true);
  expect(errors).toEqual([]);
});

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false });
  test('frameworks and law is pre-rendered with its timeline', async ({
    page,
  }) => {
    await page.goto(path);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      'Frontier AI frameworks and law, 2023–2026',
    );
    expect(await page.locator('#fl-timeline .fl-row').count()).toBeGreaterThan(
      100,
    );
    await expect(page.locator('#fl-section-eu')).toHaveText('European Union');
  });
});
