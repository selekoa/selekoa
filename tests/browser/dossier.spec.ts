import { expect, test } from './fixtures';
import AxeBuilder from '@axe-core/playwright';
import { dossierCount } from './dossier-count';

test('institution dossier connects chronology, people and exact evidence by keyboard', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/explore');
  await page
    .getByRole('navigation', { name: 'Explore the dataset' })
    .getByRole('button', { name: 'Anthropic', exact: true })
    .click();
  await page.getByRole('button', { name: 'Dossier', exact: true }).click();
  const dossier = page.getByRole('article', {
    name: 'Anthropic institutional dossier',
  });
  // 130 before week 4a, plus the two contested RSP change assessments.
  // 132 before week 4b, plus the Frontier Compliance Framework announcement
  // and RSP v3.0's quoted reference to California SB 53.
  // 134 before week 4c, plus eleven control-structure records and eleven
  // commitment records (listings, an announced intent and RSP links).
  const count = dossierCount('anthropic', 156);
  await expect(dossier).toContainText(`${count} claims ·`);
  await expect(dossier).toContainText(`${count} not editorially accepted`);
  await expect(page.getByLabel('Dossier reading guide')).toContainText(
    'No human review of the selection or framing is recorded',
  );
  await expect(dossier).toContainText('the order within it is unknown');
  await page.getByRole('button', { name: 'People & paths' }).click();
  await dossier
    .locator('summary')
    .filter({ hasText: /^Dario Amodei/ })
    .click();
  const claim = dossier.locator('[data-claim-id="dario-openai-vp-2020"]');
  await claim.focus();
  await page.keyboard.press('Enter');
  const panel = page.getByRole('complementary', { name: 'Evidence inspector' });
  await expect(panel).toBeFocused();
  await expect(panel).toContainText('Location in source');
  await expect(panel).toContainText('Machine-checked');
  await expect(panel).toContainText('snapshot');
  await expect(panel.locator('.source-title').first()).toHaveAttribute(
    'href',
    /^https:\/\//,
  );
  await panel.getByRole('button', { name: 'Close ×' }).click();
  await expect(claim).toBeFocused();
  await page.getByRole('button', { name: 'Ideas & documents' }).click();
  await dossier
    .locator('summary')
    .filter({ hasText: /^Weak-to-Strong/ })
    .click();
  const weak = dossier.locator('.dossier-group').filter({
    has: page.locator('[data-claim-id="lineage-ii-weak-cites-reward"]'),
  });
  await weak.getByText('Why this document is included').click();
  // From 2026-10-17 the connection is Leike's dated joining record.
  await expect(weak).toContainText('weak-to-strong generalization');
  await dossier
    .locator('[data-claim-id="lineage-ii-weak-cites-reward"]')
    .click();
  await expect(panel).toContainText('citation');
  await panel.getByRole('button', { name: 'Close ×' }).click();
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .analyze()
    ).violations,
  ).toEqual([]);
  expect(errors).toEqual([]);
});

test('capital and governance preserve bounds and dates in both modes on mobile', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/explore');
  await page
    .getByRole('navigation', { name: 'Explore the dataset' })
    .getByRole('button', { name: 'Anthropic', exact: true })
    .click();

  await page.getByRole('button', { name: 'Dossier', exact: true }).click();
  const dossier = page.getByRole('article', {
    name: 'Anthropic institutional dossier',
  });
  await page.getByRole('button', { name: 'Capital & compute' }).click();
  await dossier
    .locator('summary')
    .filter({ hasText: /^AmazonOrganisation/ })
    .click();
  const claim = dossier.locator(
    '[data-claim-id="amazon-anthropic-conditional-2026"]',
  );
  await claim.click();
  const panel = page.getByRole('complementary', { name: 'Evidence inspector' });
  await expect(panel).toBeFocused();
  await expect(panel).toContainText('commercial milestones');
  await expect(panel).toContainText('up to');
  await page.getByRole('button', { name: 'Dark mode' }).click();
  await expect(claim).toHaveAttribute('aria-pressed', 'true');
  await expect(panel).toContainText('announced');
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .analyze()
    ).violations,
  ).toEqual([]);
  await panel.getByRole('button', { name: 'Close ×' }).click();
  await expect(claim).toBeFocused();
  await dossier
    .getByRole('button', { name: 'Governance', exact: true })
    .click();
  await dossier
    .locator('summary')
    .filter({ hasText: /^Anthropic Responsible Scaling Policy — v2.0/ })
    .click();
  await expect(dossier).toContainText('Publication date unknown');
  await dossier.locator('[data-claim-id="rsp-v2-asl-meaning"]').click();
  await expect(panel).toContainText('2024-10-15 · effective');
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.screenshot({
    path: '.local/dossier-mobile-evidence.png',
    fullPage: true,
  });
  await page.getByRole('button', { name: 'Claims', exact: true }).click();
  await expect(panel).toContainText('2024-10-15 · effective');
});
