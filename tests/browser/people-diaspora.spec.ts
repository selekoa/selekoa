import { expect, test } from '@playwright/test';

for (const mobile of [false, true]) {
  test(`diaspora paths retain source precision and departure semantics (${mobile ? 'mobile' : 'desktop'})`, async ({
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
      .getByRole('navigation', { name: 'Explore the dataset' })
      .getByRole('button', { name: /^People/ })
      .click();
    await page.getByRole('searchbox').fill('Guodong Zhang');
    await page.getByRole('searchbox').press('Enter');
    await page.getByRole('button', { name: 'Timeline', exact: true }).click();
    const timeline = page.getByLabel('Chronological claims');
    // Lab genealogy records (2026-10-17, lg-) are left out of this count.
    await expect(
      timeline.locator('[data-claim-id]:not([data-claim-id^="lg-"])'),
    ).toHaveCount(4);
    await timeline.locator('[data-claim-id="zhang-brain-intern-2019"]').click();
    const inspector = page.getByRole('complementary', {
      name: 'Evidence inspector',
    });
    await expect(inspector).toContainText('2019-06 → 2019-11');
    await expect(inspector).toContainText('Research Intern');
    await expect(inspector).toContainText('Machine-checked');
    await expect(inspector).toContainText('Not reviewed by an editor');
    await page.getByRole('searchbox').fill('Daniel Gross');
    await page.getByRole('searchbox').press('Enter');
    await timeline
      .locator('[data-claim-id="gross-ssi-departure-announced-2025"]')
      .click();
    await expect(inspector).toContainText('2025-07-03 · announcement');
    await expect(inspector).toContainText('June 29');
    await expect(inspector.locator('a.source-title')).toHaveAttribute(
      'href',
      'https://ssi.inc/updates',
    );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    await page.screenshot({
      path: `.local/people-diaspora-${mobile ? 'mobile' : 'desktop'}.png`,
      fullPage: true,
    });
    expect(errors).toEqual([]);
  });
}
