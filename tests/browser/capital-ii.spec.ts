import { expect, test } from '@playwright/test';

test('Capital II shows dated contract conditions without human-review promotion', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  await page.goto('/#/explore');
  const nav = page.getByRole('navigation', { name: 'Explore the dataset' });
  await nav.getByRole('button', { name: 'OpenAI', exact: true }).click();
  await nav.getByRole('button', { name: 'Compute', exact: false }).click();
  await page.getByRole('button', { name: 'Claims', exact: true }).click();
  const list = page.getByLabel('Claims list');
  const panel = page.getByRole('complementary', { name: 'Evidence inspector' });
  await list
    .locator('[data-claim-id="capital-ii-openai-azure-first-2026"]')
    .click();
  await expect(panel).toContainText('cannot and chooses not');
  await expect(panel).toContainText('2026-04-27');
  await list
    .locator('[data-claim-id="capital-ii-openai-coreweave-expansion-2025"]')
    .click();
  await expect(panel).toContainText('$4,000,000,000');
  await expect(panel).toContainText('contracted');
  await expect(panel).toContainText('delivery and availability');
  await page.screenshot({ path: '.local/capital-ii/app.png', fullPage: true });
  expect(errors).toEqual([]);
});
