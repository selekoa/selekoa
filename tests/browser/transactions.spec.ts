import { expect, test } from '@playwright/test';

test('OpenAI capital and compute paths expose distinct stages and bounded contract amounts', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(m.text());
  });
  await page.goto('/#/explore');
  const nav = page.getByRole('navigation', { name: 'Explore the dataset' });
  await nav.getByRole('button', { name: 'OpenAI', exact: true }).click();
  await page.locator('[data-claim-id="microsoft-investment-2019"]').click();
  const panel = page.getByRole('complementary', { name: 'Evidence inspector' });
  await expect(panel).toContainText('$1,000,000,000');
  await expect(panel).toContainText('announced');
  await nav.getByRole('button', { name: 'Compute', exact: false }).click();
  await page.getByRole('button', { name: 'Claims', exact: true }).click();
  await page
    .getByLabel('Claims list')
    .locator('[data-claim-id="openai-azure-contract-oct-2025"]')
    .click();
  await expect(panel).toContainText('contracted');
  await expect(panel).toContainText('$250,000,000,000');
  await expect(panel).toContainText('not payment');
  await expect(
    panel.getByRole('link', {
      name: 'The next chapter of the Microsoft–OpenAI partnership',
    }),
  ).toHaveAttribute(
    'href',
    'https://blogs.microsoft.com/blog/2025/10/28/the-next-chapter-of-the-microsoft-openai-partnership/',
  );
  await page.screenshot({
    path: '.local/capital-compute/openai-contract.png',
    fullPage: true,
  });
  await nav.getByRole('button', { name: 'Capital', exact: false }).click();
  await page
    .getByLabel('Claims list')
    .locator('[data-claim-id="stargate-spending-plan-2025"]')
    .click();
  await expect(panel).toContainText('planned');
  await expect(panel).toContainText('not a funding round');
  expect(errors).toEqual([]);
});

test('Anthropic timeline retains AWS and Google and exposes future TPU limits', async ({
  page,
}) => {
  await page.goto('/#/explore');
  await page
    .getByRole('navigation', { name: 'Explore the dataset' })
    .getByRole('button', { name: 'Anthropic', exact: true })
    .click();
  await page.getByRole('button', { name: 'Timeline', exact: true }).click();
  const list = page.getByLabel('Chronological claims');
  await page.getByLabel('Records through year').selectOption('2024');
  for (const id of [
    'anthropic-cloud-2023',
    'anthropic-google-cloud-2023',
    'anthropic-google-nonexclusive-2024',
  ])
    await expect(list.locator('[data-claim-id="' + id + '"]')).toBeVisible();
  await expect(
    list.locator('[data-claim-id="anthropic-google-tpu-plan-2025"]'),
  ).toHaveCount(0);
  await page.getByLabel('Records through year').selectOption('2026');
  await list
    .locator('[data-claim-id="anthropic-google-tpu-plan-2025"]')
    .click();
  const panel = page.getByRole('complementary', { name: 'Evidence inspector' });
  await expect(panel).toContainText('up to · 1,000,000 TPUs');
  await expect(panel).toContainText('planned');
  await expect(panel).toContainText('Capacity expected to come online in 2026');
  await page.screenshot({
    path: '.local/capital-compute/anthropic-providers.png',
    fullPage: true,
  });
});

test('xAI compute and internal Google paths retain snapshot and ownership limits', async ({
  page,
}) => {
  await page.goto('/#/explore');
  const nav = page.getByRole('navigation', { name: 'Explore the dataset' });
  const panel = page.getByRole('complementary', { name: 'Evidence inspector' });
  await nav.getByRole('button', { name: 'xAI', exact: true }).click();
  await page.locator('[data-claim-id="xai-colossus-grok4-2025"]').click();
  await expect(panel).toContainText('operational');
  await expect(panel).toContainText('200,000 GPUs in Colossus');
  await expect(panel).toContainText('ownership');
  await page.screenshot({
    path: '.local/capital-compute/xai-snapshot.png',
    fullPage: true,
  });
  await nav
    .getByRole('button', { name: 'Google DeepMind', exact: true })
    .click();
  await page
    .locator('[data-claim-id="deepmind-gemini-internal-compute-2023"]')
    .click();
  await expect(panel).toContainText('internal');
  await expect(panel).toContainText('not an external cloud purchase');
});

test('mobile transaction conditions remain inspectable without horizontal overflow', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/#/explore');
  await page
    .getByRole('navigation', { name: 'Explore the dataset' })
    .getByRole('button', { name: 'Anthropic', exact: true })
    .click();
  await page.locator('[data-claim-id="anthropic-aws-commitment-2026"]').click();
  const panel = page.getByRole('complementary', { name: 'Evidence inspector' });
  await expect(panel).toContainText('more than · $100,000,000,000');
  await expect(panel).toContainText('up to · 5 GW');
  await expect(panel).toContainText('committed');
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await page.screenshot({
    path: '.local/capital-compute/mobile-commitment.png',
    fullPage: true,
  });
});
