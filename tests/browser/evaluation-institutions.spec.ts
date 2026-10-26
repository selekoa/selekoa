import { expect, test } from '@playwright/test';

test('evaluation institution records retain evidence and limits in map and dossiers', async ({
  page,
}, testInfo) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  await page.goto('/#/claim/eval-i-arc-incubation');
  const inspector = page.getByRole('complementary', {
    name: 'Evidence inspector',
  });
  await expect(inspector).toContainText(
    'ARC Evals was incubated within ARC in 2022.',
  );
  await expect(inspector).toContainText('Not reviewed by an editor');
  await expect(inspector).toContainText('Machine-checked');
  // Map from a claim draws its subject's direct connections, the claim's
  // line marked, and keeps the claim address.
  await page.getByRole('button', { name: 'Map', exact: true }).click();
  await expect(page.locator('.exploration-heading .eyebrow')).toHaveText(
    'Direct connections',
  );
  await expect(page.locator('.map-withheld')).toHaveCount(0);
  await expect(
    page.locator(
      '.map-edge.is-selected[data-claim-ids~="eval-i-arc-incubation"]',
    ),
  ).toBeVisible();
  await expect(page).toHaveURL(/#\/claim\/eval-i-arc-incubation$/);
  await page.screenshot({
    path: testInfo.outputPath('map.png'),
    fullPage: true,
  });

  await page.goto('/#/dossier/metr');
  const dossier = page.getByRole('article', {
    name: 'Model Evaluation & Threat Research institutional dossier',
  });
  await expect(dossier).toBeVisible();
  await expect(dossier).toContainText('not editorially accepted');
  await expect(page.getByLabel('Dossier reading guide')).toContainText(
    'No human review',
  );
  await page.screenshot({
    path: testInfo.outputPath('metr-dossier.png'),
    fullPage: true,
  });

  await page.goto('/#/claim/eval-i-uk-metr-demonstrations');
  await expect(inspector).toContainText('2023-11');
  await expect(inspector).toContainText('2024-02-09');
  await expect(inspector).toContainText('Case study 3: autonomous systems');
  await expect(inspector).toContainText(
    'not proof that METR set government policy',
  );
  await page.screenshot({
    path: testInfo.outputPath('government-evidence.png'),
    fullPage: true,
  });

  await page.goto('/#/dossier/alignment-research-center');
  await expect(
    page.getByRole('article', {
      name: 'Alignment Research Center institutional dossier',
    }),
  ).toBeVisible();
  await page.goto('/#/claim/eval-i-claude-arc-credit');
  await expect(inspector).toContainText('what Anthropic calls “safety audits”');
  await expect(inspector).toContainText(
    'not an assertion of independent certification',
  );
  await expect(inspector).toContainText('Machine-checked');
  await page.screenshot({
    path: testInfo.outputPath('closeout-credit.png'),
    fullPage: true,
  });
  await page.goto('/#/claim/eval-i-metr-bis-publication');
  await expect(inspector).toContainText('dated October 11, 2024');
  await expect(inspector).toContainText(
    'government docket-receipt date are unknown',
  );
  await expect(inspector).toContainText('Not reviewed by an editor');
  await page.screenshot({
    path: testInfo.outputPath('closeout-bis.png'),
    fullPage: true,
  });
  expect(errors).toEqual([]);
});
