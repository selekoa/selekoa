import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const examples = {
  openai: {
    name: 'OpenAI',
    sections: {
      Chronology: 'atlas-openai-launch',
      'People & paths': 'atlas-altman-return',
      'Ideas & documents': 'atlas-gym',
      'Capital & compute': 'microsoft-investment-2019',
      Governance: 'atlas-openai-pbc-plan',
    },
  },
  deepmind: {
    name: 'DeepMind',
    sections: {
      Chronology: 'google-acquired-deepmind-2014',
      'People & paths': 'atlas-john-jumper-deepmind',
      'Ideas & documents': 'atlas-feedback-credits-openai',
      'Capital & compute': 'atlas-deepmind-alphafold-compute',
      Governance: 'atlas-ethics-unit',
    },
  },
  'google-deepmind': {
    name: 'Google DeepMind',
    sections: {
      Chronology: 'deepmind-combined-2023',
      'People & paths': 'atlas-jumper-gdm',
      'Ideas & documents': 'atlas-jumper-alphafold',
      'Capital & compute': 'deepmind-gemini-internal-compute-2023',
      Governance: 'atlas-gdm-rsc',
    },
  },
};

for (const [id, fixture] of Object.entries(examples)) {
  test(`${fixture.name}: five readable sections with exact evidence and source access`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text());
    });
    await page.goto(`/#/dossier/${id}`);
    const dossier = page.getByRole('article', {
      name: `${fixture.name} institutional dossier`,
    });
    const inspector = page.getByRole('complementary', {
      name: 'Evidence inspector',
    });
    for (const [section, claimId] of Object.entries(fixture.sections)) {
      await dossier.getByRole('button', { name: section, exact: true }).click();
      const claim = dossier.locator(`[data-claim-id="${claimId}"]`);
      const group = dossier.locator('.dossier-group').filter({
        has: page.locator(`[data-claim-id="${claimId}"]`),
      });
      if (!(await group.getAttribute('open'))) {
        // Empty-string open attributes are truthy in HTML, not JavaScript.
        if (!(await group.evaluate((el) => (el as HTMLDetailsElement).open)))
          await group.locator(':scope > summary').click();
      }
      await expect(claim).toBeVisible();
      await claim.focus();
      await page.keyboard.press('Enter');
      await expect(inspector).toBeFocused();
      await expect(inspector).toContainText('Machine-checked');
      await expect(inspector).toContainText('Location in source');
      await expect(inspector.locator('.source-title').first()).toHaveAttribute(
        'href',
        /^https:\/\//,
      );
      await inspector.getByRole('button', { name: 'Close ×' }).click();
      await expect(claim).toBeFocused();
    }
    expect(
      (
        await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
          .analyze()
      ).violations,
    ).toEqual([]);
    await page.screenshot({
      path: `.local/${id}-governance.png`,
      fullPage: true,
    });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.getByRole('button', { name: 'Dark mode' }).click();
    await expect(dossier).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.screenshot({ path: `.local/${id}-mobile.png`, fullPage: true });
    expect(errors).toEqual([]);
  });
}

test('DeepMind is discoverable and its combination path reaches two separate predecessor dossiers', async ({
  page,
}) => {
  await page.goto('/#/explore');
  await page
    .getByRole('navigation', { name: 'Explore the dataset' })
    .getByRole('button', { name: 'DeepMind', exact: true })
    .click();
  await page.getByRole('button', { name: 'Dossier', exact: true }).click();
  await page
    .getByRole('button', {
      name: /Inspect institutional connection: DeepMind was announced/,
    })
    .click();
  const inspector = page.getByRole('complementary', {
    name: 'Evidence inspector',
  });
  await expect(inspector).toContainText('2023-04-20');
  await inspector.getByRole('button', { name: 'Close ×' }).click();
  await page
    .getByRole('button', {
      name: 'Open Google DeepMind dossier →',
      exact: true,
    })
    .click();
  await expect(
    page.getByRole('article', {
      name: 'Google DeepMind institutional dossier',
    }),
  ).toBeVisible();
  await page
    .getByRole('button', { name: 'Open Google Brain dossier →', exact: true })
    .click();
  const brain = page.getByRole('article', {
    name: 'Google Brain institutional dossier',
  });
  await expect(brain).toBeVisible();
  await brain
    .getByRole('button', { name: 'Ideas & documents', exact: true })
    .click();
  await expect(
    brain.locator('summary').filter({ hasText: /Attention Is All You Need/ }),
  ).toBeVisible();
  await expect(page).toHaveURL(/#\/dossier\/google-brain$/);
});
