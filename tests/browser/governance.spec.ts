import { test, expect } from './fixtures';

test('version Inspector exposes predecessor, successor, publisher and family timeline', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(m.text());
  });
  await page.goto('/explore');
  await page.getByRole('searchbox').fill('RSP v2.0');
  await page.getByRole('searchbox').press('Enter');
  const inspector = page.getByRole('complementary', {
    name: 'Entity inspector',
  });
  await expect(inspector).toContainText('Effective 2024-10-15');
  await expect(inspector).toContainText('Publication date unknown');
  await expect(
    inspector.getByRole('button', { name: 'Publisher: Anthropic' }),
  ).toBeVisible();
  await expect(
    inspector.getByRole('link', {
      name: 'Responsible Scaling Policy (2023)',
      exact: true,
    }),
  ).toBeVisible();
  await expect(
    inspector.getByRole('link', {
      name: 'Anthropic Responsible Scaling Policy — v2.1',
      exact: true,
    }),
  ).toBeVisible();
  await page.screenshot({
    path: '.local/governance-inspector.png',
    fullPage: true,
  });
  await inspector.getByRole('button', { name: 'View family timeline' }).click();
  await expect(page.getByLabel('Framework family')).toHaveValue(
    'anthropic-rsp',
  );
  const timeline = page.getByLabel('Chronological claims');
  // 26 before week 4a, plus the RSP provisions, absences, provision changes
  // and contested assessments, each a dated record of the family.
  // 69 before the follow-up, plus 31 provisions, 4 absences and 3 changes
  // recorded when the stop list was re-run under the revised quotation rule,
  // plus RSP v3.0's quoted reference to California SB 53 (week 4b),
  // plus seven quoted references in v1.0 to v2.2 to the White House and
  // Seoul commitments (week 4c), plus six framework comparison cells for each
  // of the nine editions (2026-10-27), plus 107 cells for the paraphrased
  // questions (schema 2.18; first editions have no stated-changes cell),
  // plus the links of v3.1 to v3.4 to California SB 53 (2026-10-28).
  await expect(timeline.locator('[data-claim-id]')).toHaveCount(280);
  const dates = await timeline.locator('.timeline-date').allTextContents();
  expect(dates.map((s) => s.slice(0, 10))).toEqual(
    dates.map((s) => s.slice(0, 10)).sort(),
  );
  await timeline.locator('[data-claim-id="rsp-v3-4-coverage-date"]').click();
  await expect(
    page.getByRole('complementary', { name: 'Evidence inspector' }),
  ).toContainText('Official changelog');
  await page.screenshot({
    path: '.local/governance-timeline.png',
    fullPage: true,
  });
  expect(errors).toEqual([]);
});

test('DeepMind and OpenAI histories retain their separate framework semantics', async ({
  page,
}) => {
  await page.goto('/explore');
  await page
    .getByRole('navigation', { name: 'Explore the dataset' })
    .getByRole('button', { name: /^Governance/ })
    .click();
  await page.getByLabel('Framework family').selectOption('deepmind-fsf');
  const timeline = page.getByLabel('Chronological claims');
  await timeline.locator('[data-claim-id="fsf-v3-1-cbrn-tcls"]').click();
  const inspector = page.getByRole('complementary', {
    name: 'Evidence inspector',
  });
  await expect(inspector).toContainText('2026-04-17 · publication');
  await expect(inspector).toContainText('PDF p. 17');
  await page.screenshot({
    path: '.local/governance-deepmind.png',
    fullPage: true,
  });
  await page.getByLabel('Framework family').selectOption('openai-preparedness');
  await expect(
    timeline.locator('[data-claim-id="supersedes-pf-2"]'),
  ).toHaveCount(1);
  await timeline.locator('[data-claim-id="fgf-applies-preparedness"]').click();
  await expect(inspector).toContainText('without identifying a version');
  await expect(inspector).toContainText('applies parts of');
  await page.screenshot({
    path: '.local/governance-openai.png',
    fullPage: true,
  });
});

test('mobile xAI comparison is clearly inferred and presents both exact source editions', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/explore');
  await page
    .getByRole('navigation', { name: 'Explore the dataset' })
    .getByRole('button', { name: /^Governance/ })
    .click();
  await page.getByLabel('Framework family').selectOption('xai-faif');
  const timeline = page.getByLabel('Chronological claims');
  // Three before week 4a, plus seven quoted provisions and three absences.
  // Plus the December 2025 trusted-user exception (follow-up), and the
  // December 2025 edition's statement that it complies with SB 53 (week 4b),
  // and the June 2026 edition's footnote naming the EU Code's Safety and
  // Security chapter (week 4c), plus six framework comparison cells for each
  // edition (2026-10-27), plus 23 cells for the paraphrased questions
  // (schema 2.18; the December 2025 edition has no stated-changes cell).
  await expect(timeline.locator('[data-claim-id]')).toHaveCount(51);
  await timeline
    .locator('[data-claim-id="faif-2026-compliance-sentence"]')
    .click();
  const inspector = page.getByRole('complementary', {
    name: 'Evidence inspector',
  });
  await expect(inspector).toContainText(
    'Inferred by comparing the two editions',
  );
  await expect(inspector.locator('.evidence-card')).toHaveCount(2);
  await expect(inspector).toContainText('2025-12-30');
  await expect(inspector).toContainText('2026-06-30');
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await page.screenshot({
    path: '.local/governance-mobile.png',
    fullPage: true,
  });
});
