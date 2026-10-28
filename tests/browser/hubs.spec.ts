import { test, expect } from './fixtures';
import type { Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// Each hub page names its research programme under the title (decided
// 2026-10-27; see docs/project-positioning.md#flagship-research-spines).

function collectErrors(page: Page) {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  return errors;
}

const hubs = [
  ['Governance', '/governance', 'Frontier AI governance'],
  [
    'Ideas & debates',
    '/ideas',
    'Human thought and institutions around machine intelligence',
  ],
  [
    'Institutions & people',
    '/institutions',
    'The institutional history of machine intelligence',
  ],
] as const;

test('each hub page shows its subtitle under the title', async ({ page }) => {
  const errors = collectErrors(page);
  await page.goto('/');
  const nav = page.getByRole('navigation', { name: 'Primary' });
  for (const [name, path, subtitle] of hubs) {
    // Opened in place from the menu, and loaded directly from its address.
    await nav.getByRole('link', { name }).click();
    await expect(page).toHaveURL(new RegExp(`${path}$`));
    const lede = page.locator('.landing-lede');
    await expect(lede.getByRole('heading', { level: 1 })).toHaveText(name);
    await expect(lede.locator('.hub-subtitle')).toHaveText(subtitle);
    await page.goto(path);
    await expect(page.locator('.hub-subtitle')).toHaveText(subtitle);
  }
  // Only the Ideas & debates page defines what its "institutions" are.
  await page.goto('/ideas');
  await expect(page.locator('.hub-scope-note')).toHaveText(
    'Institutions here are the forums, journals, mailing lists and organisations where the debates took place.',
  );
  const result = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();
  expect(result.violations.map((v) => `${v.id}: ${v.nodes.length}`)).toEqual(
    [],
  );
  for (const path of ['/governance', '/institutions']) {
    await page.goto(path);
    await expect(page.locator('.hub-scope-note')).toHaveCount(0);
  }
  // The Chinese histories stay a plain dossier group, with no priority label.
  await expect(page.getByText('Chinese AI histories').first()).toBeVisible();
  await expect(page.getByRole('main')).not.toContainText(/priority/i);
  expect(errors).toEqual([]);
});
