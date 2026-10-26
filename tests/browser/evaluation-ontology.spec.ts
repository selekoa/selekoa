import { expect, test } from '@playwright/test';
import { clickMapClaim } from './map-actions';
const claims = [
  'eval-ontology-i-arc-openai',
  'eval-ontology-i-arc-anthropic',
  'eval-ontology-i-arc-evals-separation',
  'eval-ontology-i-arc-evals-metr-name',
];
for (const theme of ['light', 'dark']) {
  test(
    'evaluation ontology: individual evidence, institutional maps and dossiers in ' +
      theme,
    async ({ page }, testInfo) => {
      const errors: string[] = [];
      page.on('pageerror', (e) => errors.push(e.message));
      page.on('console', (m) => {
        if (m.type() === 'error') errors.push(m.text());
      });
      await page.goto('/#/claim/' + claims[0]);
      if (theme === 'dark')
        await page
          .getByRole('button', { name: 'Dark mode', exact: true })
          .click();
      await expect(page.locator('html')).toHaveAttribute(
        'data-selekoa-theme',
        theme,
      );
      const inspector = page.getByRole('complementary', {
        name: 'Evidence inspector',
      });
      for (const [index, id] of claims.entries()) {
        await page.goto('/#/claim/' + id);
        await expect(inspector).toContainText('Activity stage');
        await expect(inspector).toContainText(
          index < 2 ? 'reported performed' : 'announced',
        );
        await expect(inspector).toContainText('Machine-checked');
        await expect(inspector).toContainText('Not reviewed by an editor');
        if (index < 2)
          await expect(inspector).toContainText('Evaluated system');
        else await expect(inspector).toContainText('Transition scope');
        await page.goto(
          '/#/dossier/' +
            (index < 2 ? 'alignment-research-center' : 'arc-evals'),
        );
        await page.getByRole('button', { name: 'Map', exact: true }).click();
        await expect(
          page.locator('.map-edge[data-claim-ids~="' + id + '"]').first(),
        ).toBeVisible();
        await clickMapClaim(page, id);
        await expect(inspector).toContainText(
          index < 2 ? 'reported performed' : 'announced',
        );
        await page.screenshot({
          path: testInfo.outputPath(id + '.png'),
          fullPage: true,
        });
      }
      for (const [entityId, id] of [
        ['alignment-research-center', claims[0]],
        ['arc-evals', claims[2]],
        ['metr', claims[3]],
        ['anthropic', claims[1]],
        ['openai', claims[0]],
      ]) {
        await page.goto('/#/dossier/' + entityId);
        const dossier = page.getByRole('article', {
          name: /institutional dossier$/,
        });
        await expect(dossier).toBeVisible();
        const claim = dossier.locator('[data-claim-id="' + id + '"]');
        // Chronology groups use native details, including unknown dates.
        await claim.evaluate((el) => {
          for (let p = el.parentElement; p; p = p.parentElement)
            if (p instanceof HTMLDetailsElement) p.open = true;
        });
        await claim.click();
        await expect(inspector).toContainText('Activity stage');
        await expect(dossier).toContainText('not editorially accepted');
        await page.screenshot({
          path: testInfo.outputPath(entityId + '-dossier.png'),
          fullPage: true,
        });
        await page.getByRole('button', { name: 'Map', exact: true }).click();
        await expect(
          page.locator('.map-edge[data-claim-ids~="' + id + '"]'),
        ).toBeVisible();
        await page.screenshot({
          path: testInfo.outputPath(entityId + '-map.png'),
          fullPage: true,
        });
      }
      expect(errors).toEqual([]);
    },
  );
}
