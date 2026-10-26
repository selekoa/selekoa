import { expect, test } from '@playwright/test';

test('oversight citations retain pending review and non-adoption qualifications', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(m.text());
  });
  await page.goto('/#/explore');
  await page.getByRole('searchbox').fill('Scalable agent alignment');
  await page.getByRole('searchbox').press('Enter');
  await page.getByRole('button', { name: 'Timeline', exact: true }).click();
  const timeline = page.getByLabel('Chronological claims');
  await timeline
    .locator('[data-claim-id="lineage-ii-reward-cites-miri-agenda"]')
    .click();
  const inspector = page.getByRole('complementary', {
    name: 'Evidence inspector',
  });
  await expect(inspector).toContainText('not adoption');
  await expect(inspector).toContainText('Machine-checked');
  await expect(inspector).toContainText('Not reviewed by an editor');
  await expect(inspector.locator('a.source-title')).toHaveAttribute(
    'href',
    'https://arxiv.org/pdf/1811.07871v1',
  );
  await timeline
    .locator('[data-claim-id="lineage-ii-reward-cites-amplification"]')
    .click();
  await expect(inspector).toContainText('not a report of implementing');
  await expect(inspector).toContainText('2018-11-19');
  await page.screenshot({ path: '.local/lineage-ii-app.png', fullPage: true });
  expect(errors).toEqual([]);
});
