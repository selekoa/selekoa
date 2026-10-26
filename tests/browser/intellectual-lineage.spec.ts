import { expect, test } from '@playwright/test';

for (const mobile of [false, true]) {
  test(`lineage evidence separates citation and reported use (${mobile ? 'mobile' : 'desktop'})`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(e.message));
    page.on('console', (m) => {
      if (m.type() === 'error') errors.push(m.text());
    });
    if (mobile) await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/#/explore');
    await page
      .getByRole('searchbox')
      .fill('Training language models to follow instructions');
    await page.getByRole('searchbox').press('Enter');
    await page.getByRole('button', { name: 'Timeline', exact: true }).click();
    const timeline = page.getByLabel('Chronological claims');
    await timeline
      .locator('[data-claim-id="lineage-instruct-cites-ppo"]')
      .click();
    const inspector = page.getByRole('complementary', {
      name: 'Evidence inspector',
    });
    await expect(inspector).toContainText('InstructGPT cites PPO');
    await expect(inspector).toContainText(
      'neither agreement nor a causal influence',
    );
    await timeline
      .locator('[data-claim-id="lineage-instruct-uses-ppo"]')
      .click();
    await expect(inspector).toContainText('InstructGPT reports using PPO');
    await expect(inspector).toContainText('2022-03-04');
    await expect(inspector).toContainText('v1 §3.5');
    await expect(inspector).toContainText('Machine-checked');
    await expect(inspector).toContainText('Not reviewed by an editor');
    await expect(inspector.locator('a.source-title')).toHaveAttribute(
      'href',
      'https://arxiv.org/pdf/2203.02155v1',
    );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    await page.screenshot({
      path: `.local/lineage-${mobile ? 'mobile' : 'desktop'}.png`,
      fullPage: true,
    });
    expect(errors).toEqual([]);
  });
}
