import { test, expect, type Page } from './fixtures';
import AxeBuilder from '@axe-core/playwright';

function collectErrors(page: Page) {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  return errors;
}

async function setTheme(page: Page, theme: 'light' | 'dark') {
  const toggle = page.getByRole('button', { name: 'Dark mode' });
  if ((await toggle.getAttribute('aria-pressed')) !== String(theme === 'dark'))
    await toggle.click();
  await expect(page.locator('html')).toHaveAttribute(
    'data-selekoa-theme',
    theme,
  );
}

const fitsViewport = (page: Page) =>
  page.evaluate(
    () => document.documentElement.scrollWidth <= window.innerWidth,
  );

test('commitments page shows who signed which text, SB 53 provisions and the frameworks that link to them', async ({
  page,
}) => {
  const errors = collectErrors(page);
  await page.goto('/governance');
  await page.getByRole('link', { name: /^Read external commitments/ }).click();
  await expect(page).toHaveURL(/\/commitments\/external-commitments$/);
  const sb53 = page.locator('#commitment-california-sb-53');
  await expect(sb53.getByRole('heading', { level: 2 })).toContainText(
    'California SB 53',
  );
  await expect(
    sb53.getByRole('button', { name: /Inspect issue record/ }),
  ).toContainText('Enacted 2025-09-29 · signature');
  // Four editions link themselves to the statute, each in its own words.
  const links = sb53.locator('.commit-block').nth(1);
  for (const id of [
    'sb-link-openai-fgf',
    'sb-link-rsp-v3-0',
    'sb-link-faif-2025',
    'sb-link-ms-fgf-2026',
  ])
    await expect(links.locator(`[data-claim-id="${id}"]`)).toHaveCount(1);
  await expect(links).toContainText(
    'States that it serves as its framework under this text',
  );
  // The matrix has one column per signed text; the statute has none, and
  // its section says so rather than showing a coverage gap.
  const matrix = page.locator('.commit-matrix');
  await expect(matrix.locator('thead th')).toHaveText([
    'Organisation',
    'White House commitments (July 2023)',
    'White House commitments (Sept. 2023)',
    'Seoul commitments (2024)',
    'EU GPAI Code of Practice',
  ]);
  const xaiRow = matrix.locator('tbody tr', {
    has: page.locator('th', { hasText: /^xAI$/ }),
  });
  await expect(xaiRow).toContainText('(Safety and Security chapter only)');
  await expect(xaiRow).toContainText('Intent announced · 2025-07-31');
  const metaRow = matrix.locator('tbody tr', {
    has: page.locator('th', { hasText: /^Meta$/ }),
  });
  await expect(metaRow).toContainText('Stated refusal · 2025-07-18');
  // Keyboard: a matrix cell opens the inspector on the refusal record.
  await metaRow.locator('[data-claim-id="cm-eu-code-declined-meta"]').focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/inspect=cm-eu-code-declined-meta/);
  const eu = page.locator('#commitment-gpai-code-of-practice-2025');
  await expect(eu).toContainText('Signatories (13) · stated refusals (1)');
  await expect(
    page.locator('#commitment-wh-voluntary-ai-commitments-2023-09'),
  ).toContainText('No published framework is recorded as linking itself');
  await expect(sb53).toContainText('Organisations do not sign it');
  await expect(sb53).not.toContainText('Signatories (0)');
  const provisions = sb53.locator('details.doc-provisions');
  await provisions.locator('summary').click();
  const threshold = provisions.locator(
    '[data-claim-id="sb-frontier-model-threshold"]',
  );
  await expect(threshold).toContainText('Threshold or trigger');
  await expect(threshold).toContainText('10^26 integer or floating-point');
  // Keyboard: a provision row opens the inspector with its evidence.
  await threshold.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#inspector')).toContainText(
    'not evidence that the statute applies',
  );
  await expect(page).toHaveURL(/inspect=sb-frontier-model-threshold/);
  // Stopped questions are listed, not resolved.
  await page.locator('.control-stops summary').click();
  await expect(page.locator('.control-stops')).toContainText(
    'Needs legal interpretation',
  );
  // An edition's history shows its link to the statute.
  await page.goto('/documents/frontier-safety-frameworks');
  await expect(
    page.locator(
      '[data-edition="faif-2025"] .doc-commitment-links [data-claim-id="sb-link-faif-2025"]',
    ),
  ).toHaveCount(1);
  // An unlisted control timeline is not routed.
  await page.goto('/control/xai');
  await expect(
    page.getByText('This link does not match any record'),
  ).toBeVisible();
  expect(errors).toEqual([]);
});

for (const width of [1440, 390])
  for (const theme of ['light', 'dark'] as const)
    test(`commitments page ${width}px ${theme}: layout and accessibility`, async ({
      page,
    }) => {
      const errors = collectErrors(page);
      await page.setViewportSize({ width, height: 1000 });
      await page.goto('/commitments/external-commitments');
      await setTheme(page, theme);
      await page.locator('details.doc-provisions summary').first().click();
      await page.locator('.control-stops summary').click();
      await page.locator('.doc-limits-box summary').click();
      expect(await fitsViewport(page)).toBe(true);
      expect(
        (
          await new AxeBuilder({ page })
            .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
            .analyze()
        ).violations,
      ).toEqual([]);
      await page.goto('/document/california-sb-53');
      await setTheme(page, theme);
      expect(await fitsViewport(page)).toBe(true);
      expect(errors).toEqual([]);
    });
