import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readFileSync } from 'node:fs';
import { datasetSchema } from '../../src/domain/schema';
import { questionStarterView } from '../../src/domain/question-starter';
import {
  questionStarter,
  questionStarterMarkdown,
} from '../../src/domain/question-starter-export';
import { starterJson } from '../../src/domain/starter';
import { selfGovernance as definition } from '../../src/reading/self-governance';

const data = datasetSchema.parse(
  Object.fromEntries(
    ['meta', 'entities', 'claims', 'sources', 'evidence'].map((name) => [
      name,
      JSON.parse(
        readFileSync(
          new URL('../../data/' + name + '.json', import.meta.url),
          'utf8',
        ),
      ),
    ]),
  ),
);
const view = questionStarterView(data, definition);
const address = '/#/question/' + definition.id;

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

test('question page lists records with qualifications, sources and gaps', async ({
  page,
}) => {
  const errors = collectErrors(page);
  await page.goto('/#/governance');
  await page
    .getByRole('button', { name: 'Open the research question →' })
    .click();
  await expect(page).toHaveURL(new RegExp('#/question/' + definition.id));
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    definition.title,
  );
  const article = page.getByRole('article', { name: definition.title });
  // Every selected record appears once, with its qualification and an
  // original source link beside the inspector control.
  await expect(article.locator('[data-question-claim]')).toHaveCount(
    view.claimIds.length,
  );
  const duty = article.locator('[data-question-claim="sb-framework-duty"]');
  await expect(duty).toContainText('Qualification.');
  await expect(duty.locator('.qs-sources a').first()).toHaveAttribute(
    'href',
    /^https:\/\//,
  );
  // The chronology keeps enactment and entry into force apart.
  const effective = article.locator('[data-chronology-kind="effective"]');
  await expect(
    effective.filter({ hasText: '2026-01-01 · effective' }),
  ).toHaveCount(1);
  await expect(
    effective.filter({ hasText: '2026-07-27 · effective' }),
  ).toHaveCount(1);
  await expect(
    article
      .locator('[data-chronology-kind="enacted"]')
      .filter({ hasText: '2025-09-29 · signature' }),
  ).toHaveCount(1);
  await expect(
    effective.filter({ hasText: '2027-01-01 · effective' }),
  ).toHaveCount(1);
  await expect(
    article
      .locator('[data-chronology-kind="enacted"]')
      .filter({ hasText: '2026-03-27 · signature' }),
  ).toHaveCount(1);
  // Keyboard: a row opens the inspector and records the address.
  await duty.locator('[data-claim-id="sb-framework-duty"]').focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/inspect=sb-framework-duty/);
  await expect(page.locator('#inspector')).toContainText(
    'large frontier developer',
  );
  // Contested and unresolved records sit in the open part, with reused
  // open questions and the questions set aside.
  const open = article.locator('[data-question-section="open"]');
  for (const claim of view.disputed)
    await expect(
      open.locator(`[data-question-claim="${claim.id}"]`),
    ).toHaveCount(1);
  await expect(open.locator('[data-open-question]')).toHaveCount(
    view.openQuestions.length,
  );
  for (const gap of view.gaps)
    await expect(article.locator(`[data-gap="${gap.id}"]`)).toContainText(
      gap.area,
    );
  // A part link opens at that part; an unknown part is not substituted.
  await page.goto(address + '?section=law-and-code');
  await expect(
    page.getByRole('heading', {
      name: 'Laws, guidance and codes: EU, California, New York and China',
    }),
  ).toBeFocused();
  await page.goto(address + '?section=unknown');
  await expect(
    page.getByText('This link does not match any record'),
  ).toBeVisible();
  expect(errors).toEqual([]);
});

test('question starter downloads match the domain export', async ({ page }) => {
  await page.goto(address);
  await page.getByText('Download research starter', { exact: true }).click();
  const starter = await questionStarter(data, definition);
  for (const [label, extension, expected] of [
    ['Download Markdown', 'md', questionStarterMarkdown(starter)],
    ['Download JSON', 'json', starterJson(starter)],
  ]) {
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: label, exact: true }).click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe(
      `${definition.id}-v${definition.version}-starter.${extension}`,
    );
    expect(readFileSync((await download.path())!, 'utf8')).toBe(expected);
  }
});

for (const width of [1440, 390])
  for (const theme of ['light', 'dark'] as const)
    test(`question page ${width}px ${theme}: layout and accessibility`, async ({
      page,
    }) => {
      const errors = collectErrors(page);
      await page.setViewportSize({ width, height: 1000 });
      await page.goto(address);
      await setTheme(page, theme);
      await page.locator('.doc-limits-box summary').click();
      await page.locator('.control-stops summary').click();
      expect(await fitsViewport(page)).toBe(true);
      expect(
        (
          await new AxeBuilder({ page })
            .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
            .analyze()
        ).violations,
      ).toEqual([]);
      expect(errors).toEqual([]);
    });
