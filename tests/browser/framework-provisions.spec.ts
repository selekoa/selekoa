import { test, expect, type Page } from '@playwright/test';
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

test('frameworks page shows quoted provisions, alignment and plain dispute status', async ({
  page,
}) => {
  const errors = collectErrors(page);
  await page.goto('/#/documents/frontier-safety-frameworks');
  const pf = page.locator('#family-openai-preparedness');
  const v2 = pf.locator('[data-edition="preparedness-v2"]');
  await expect(
    v2.getByRole('button', { name: /Inspect replacement record/ }),
  ).toContainText('Replaces Beta (unresolved)');
  const provisions = v2.locator('details.doc-provisions');
  await provisions.locator('summary').click();
  const row = provisions.locator(
    '[data-claim-id="prov-preparedness-v2-high-deployment-restriction"]',
  );
  await expect(row).toContainText('Required action');
  // The provision records the text and is not itself contested; the dispute
  // about it is a separate assessment record listed beside it.
  await expect(row).not.toContainText('Contested');
  await expect(row).toContainText(
    '“We do not deploy models that reach a High capability threshold',
  );
  await expect(
    provisions.locator(
      '[data-claim-id="absent-preparedness-v2-safety-enhancing-development-exception"]',
    ),
  ).toContainText('Not found in the inspected text');
  const alignment = pf.locator('details.doc-alignment');
  await alignment.locator('summary').click();
  // Five keys before the follow-up, plus four re-examined stops.
  await expect(alignment.locator('tbody tr')).toHaveCount(9);
  await expect(alignment).toContainText('Not found');
  await expect(
    alignment.getByRole('button', {
      name: /^Disputed assessment of this provision:/,
    }),
  ).toHaveCount(1);
  const assessment = provisions.locator(
    '[data-claim-id="assessed-preparedness-v2-high-deployment-mitigation"]',
  );
  await expect(assessment).toContainText('Assessment of this required action');
  await expect(assessment).toContainText('Contested');
  await expect(assessment).toContainText(
    'Holds: Coggins et al. (arXiv) · Disputes: OpenAI',
  );
  await assessment.click();
  await expect(page.locator('.dispute-note')).toContainText(
    'Competent sources disagree',
  );
  const rsp = page.locator('[data-edition="rsp-v3-0"] .doc-changes');
  await expect(
    rsp.locator('[data-claim-id="rsp-v3-0-assessed-weakening"]'),
  ).toContainText('Assessed effect');
  await expect(
    rsp.locator('[data-claim-id="rsp-v3-0-assessed-weakening"]'),
  ).toContainText('Unresolved');
  expect(errors).toEqual([]);
});

test('document page lists the edition’s provisions and recorded absences', async ({
  page,
}) => {
  const errors = collectErrors(page);
  await page.goto('/#/document/faif-2026');
  await expect(page.locator('#document-provisions')).toContainText(
    'Provisions in this version',
  );
  await expect(
    page
      .locator('.provision-rows')
      .getByText('Not found in the inspected text'),
  ).toHaveCount(3);
  await page.goto('/#/claim/supersedes-pf-2');
  await expect(page.locator('.dispute-note')).toContainText('Unresolved');
  expect(errors).toEqual([]);
});

for (const width of [1440, 390])
  for (const theme of ['light', 'dark'] as const)
    test(`provision views ${width}px ${theme}: layout and accessibility`, async ({
      page,
    }) => {
      const errors = collectErrors(page);
      await page.setViewportSize({ width, height: 1000 });
      await page.goto('/#/documents/frontier-safety-frameworks');
      await setTheme(page, theme);
      for (const id of ['anthropic-rsp', 'meta-frontier-ai']) {
        const family = page.locator('#family-' + id);
        await family.locator('details.doc-alignment summary').click();
        await family.locator('details.doc-provisions summary').first().click();
      }
      expect(await fitsViewport(page)).toBe(true);
      expect(
        (
          await new AxeBuilder({ page })
            .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
            .analyze()
        ).violations,
      ).toEqual([]);
      await page.goto('/#/document/meta-aasf-v2-0');
      await setTheme(page, theme);
      expect(await fitsViewport(page)).toBe(true);
      expect(errors).toEqual([]);
    });
