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

test('control-structure pages list rights with instrument and stage, and set legal questions aside', async ({
  page,
}) => {
  const errors = collectErrors(page);
  await page.goto('/governance');
  await expect(
    page
      .getByRole('navigation', { name: 'Primary' })
      .getByRole('link', { name: 'Governance' }),
  ).toHaveAttribute('aria-current', 'page');
  await page
    .getByRole('link', { name: 'OpenAI’s control structure, 2015–2026' })
    .click();
  await expect(page).toHaveURL(/\/control\/openai$/);
  const table = page.locator('.control-table');
  await expect(table).toContainText('OpenAI Group PBC');
  await expect(table).toContainText('Elects directors');
  await expect(table).toContainText('Announced');
  await expect(table).toContainText('Effective');
  // Keyboard: a right opens the inspector with its instrument and limits.
  const right = table.locator(
    '[data-claim-id="cs-openai-foundation-elects-pbc-directors"]',
  );
  await right.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#inspector')).toContainText(
    'no share register was inspected',
  );
  await expect(page).toHaveURL(
    /inspect=cs-openai-foundation-elects-pbc-directors/,
  );
  // The timeline shows provisions and the open assessment as such: a
  // question posed by Selekoa, dated by the recapitalization it concerns
  // rather than by the publication window of its sources.
  const timeline = page.locator('.control-timeline');
  await expect(timeline).toContainText('Provision of a governing document');
  const assessment = timeline.locator('li', {
    has: page.locator(
      '[data-claim-id="cs-assessed-openai-recapitalization-control"]',
    ),
  });
  await expect(assessment).toHaveCount(1);
  await expect(assessment).toContainText('Question posed by Selekoa');
  await expect(assessment).not.toContainText('Stated in source');
  await expect(assessment).not.toContainText('2026-05-11');
  await page.locator('.control-stops summary').click();
  await expect(page.locator('.control-stops')).toContainText(
    'Needs legal interpretation',
  );
  // The Anthropic page is one step away and keeps its amendment record.
  await page
    .getByRole('link', { name: 'Anthropic’s control structure, 2021–2026' })
    .click();
  await expect(page).toHaveURL(/\/control\/anthropic/);
  await expect(page.locator('.control-table')).toContainText(
    'Long-Term Benefit Trust',
  );
  await expect(page.locator('.control-timeline')).toContainText(
    'Change between filed versions',
  );
  expect(errors).toEqual([]);
});

for (const id of ['openai', 'anthropic'])
  for (const width of [1440, 390])
    for (const theme of ['light', 'dark'] as const)
      test(`control page ${id} ${width}px ${theme}: layout and accessibility`, async ({
        page,
      }) => {
        const errors = collectErrors(page);
        await page.setViewportSize({ width, height: 1000 });
        await page.goto(`/control/${id}`);
        await setTheme(page, theme);
        await page.locator('.control-stops summary').click();
        await page.locator('.doc-limits-box summary').click();
        await page.locator('.control-parties summary').click();
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
