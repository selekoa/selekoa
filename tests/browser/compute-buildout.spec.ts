import { test, expect, type Page } from './fixtures';
import AxeBuilder from '@axe-core/playwright';
import { readFileSync } from 'node:fs';
import { datasetSchema } from '../../src/domain/schema';
import { starterJson } from '../../src/domain/starter';
import {
  computeBuildoutStarter,
  computeBuildoutStarterMarkdown,
} from '../../src/domain/compute-buildout-starter';
import { computeBuildout } from '../../src/reading/compute-buildout';

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

const path = '/guide/ai-compute-2023-2026';
const title = 'AI compute: data centres, power, chips and rules, 2023–2026';

/** Words that state a trend or a cause; never in the page's own text. */
const trendWords =
  /(?<![\w-])(booms?|booming|race|races|racing|arms race|surg(e|es|ed|ing)|led to|leads to|in response|because of|as a result|driven by|spurred|triggered|soar(ed|ing|s)?|skyrocket\w*|frenzy|rush)\b/i;

function collectErrors(page: Page) {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  return errors;
}

const fitsViewport = (page: Page) =>
  page.evaluate(
    () => document.documentElement.scrollWidth <= window.innerWidth,
  );

/** The page's own text: statements, figures and record wording removed. */
const ownText = (page: Page) =>
  page.locator('#guide').evaluate((main) => {
    const copy = main.cloneNode(true) as HTMLElement;
    copy
      .querySelectorAll('[data-record-text], .record-rows')
      .forEach((e) => e.remove());
    return copy.textContent ?? '';
  });

test('compute guide: reached from the institutions hub, read by timeline and section', async ({
  page,
}) => {
  const errors = collectErrors(page);
  await page.goto('/institutions');
  await page.getByRole('link', { name: 'Read the compute records →' }).click();
  await expect(page).toHaveURL(new RegExp(path + '$'));
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(title);
  await expect(
    page.getByRole('link', { name: 'Institutions & people', exact: true }),
  ).toHaveAttribute('aria-current', 'page');

  // The timeline: one row per record, in date order, each with its basis.
  const rows = page.locator('.cb-row');
  await expect(rows).toHaveCount(167);
  const dates = await rows.locator('time').allTextContents();
  expect(dates).toEqual([...dates].sort());
  expect(dates[0] >= '2023').toBe(true);
  // Announcements are labelled; regulator decisions carry their own dates.
  await expect(
    rows.filter({ hasText: 'Helion announced' }).locator('.cb-announcement'),
  ).toHaveText('Announcement');
  const ferc = rows.filter({ hasText: 'FERC, by order issued' });
  await expect(ferc.locator('time')).toHaveText('2024-11-01');
  await expect(ferc.locator('.cb-announcement')).toHaveCount(0);

  // Stated dates are listed apart, never as timeline rows.
  const stated = page.locator('.cb-stated-rows > li');
  expect(await stated.count()).toBeGreaterThan(40);
  await expect(page.locator('.cb-stated-list')).toContainText(
    'It is not an event',
  );
  await expect(page.locator('.cb-stated-list')).toContainText('mid-2027');

  // Five sections; each figure shows what it measures and its bound.
  await expect(page.locator('.cb-section > h2')).toHaveText([
    'Data-centre projects',
    'Power',
    'Chip supply',
    'Government measures',
    'Export controls',
    'Compute in orbit: plans and filings',
  ]);
  const hyperion = page
    .locator('.cb-section li')
    .filter({ hasText: 'Hyperion' })
    .first();
  await expect(hyperion.locator('.cb-figure-meta')).toHaveText(
    'Figure: up to · Measures: not stated',
  );
  const investor = page
    .locator('.cb-section li')
    .filter({ hasText: 'NVIDIA was committing to invest' });
  await expect(investor.locator('.cb-figure-meta')).toContainText(
    'Scope: one transaction: this investor’s commitment',
  );

  // A row opens its record in the inspector, by keyboard.
  const link = ferc.getByRole('button', { name: /^Inspect: FERC/ });
  await link.focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/inspect=cpo-pw-ferc-susquehanna-isa-rejected/);
  await expect(
    page.getByRole('complementary', { name: 'Evidence inspector' }),
  ).toContainText('Susquehanna');
  await page.getByRole('button', { name: 'Close' }).first().click();

  // Compute in orbit is a link, not a repeat; Not covered lists held items.
  await expect(page.locator('.cb-orbit')).toContainText(
    'Read the arguments about compute in orbit →',
  );
  const notCovered = page.locator('#cb-not-covered');
  await expect(notCovered).toContainText('Held at admission');
  await expect(notCovered).toContainText('H20');
  await expect(notCovered).toContainText('Retrieval limits');

  // The page's own words state no trend or cause.
  expect((await ownText(page)).match(trendWords)).toBeNull();

  // Every internal link on the page resolves to a built page.
  const hrefs = await page
    .locator('#guide a[href^="/"]')
    .evaluateAll((els) => [
      ...new Set(els.map((e) => (e as HTMLAnchorElement).pathname)),
    ]);
  expect(hrefs.length).toBeGreaterThan(140);
  for (const href of hrefs) {
    const response = await page.request.get(href);
    expect(response.status(), href).toBe(200);
  }

  const results = await new AxeBuilder({ page }).include('#guide').analyze();
  expect(results.violations).toEqual([]);
  expect(errors).toEqual([]);
});

test('compute guide: the orbit link opens the arguments page', async ({
  page,
}) => {
  const errors = collectErrors(page);
  await page.goto(path);
  await page
    .getByRole('link', { name: 'Read the arguments about compute in orbit →' })
    .click();
  await expect(page).toHaveURL(/\/propositions\/orbital-compute-arguments$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Arguments about compute in orbit',
  );
  expect(errors).toEqual([]);
});

test('compute guide: starter downloads match the domain export', async ({
  page,
}) => {
  await page.goto(path);
  await page.getByText('Download research starter', { exact: true }).click();
  const starter = await computeBuildoutStarter(data, computeBuildout);
  for (const [label, extension, expected] of [
    ['Download Markdown', 'md', computeBuildoutStarterMarkdown(starter)],
    ['Download JSON', 'json', starterJson(starter)],
  ]) {
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: label, exact: true }).click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe(
      `${computeBuildout.id}-v${computeBuildout.version}-starter.${extension}`,
    );
    expect(readFileSync((await download.path())!, 'utf8')).toBe(expected);
  }
});

test('compute guide: phone layout', async ({ page }) => {
  const errors = collectErrors(page);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(path);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(title);
  expect(await fitsViewport(page)).toBe(true);
  // On a phone the record opens directly below the row that opened it.
  const row = page
    .locator('#cb-section-power')
    .locator('xpath=..')
    .locator('[data-claim-id]')
    .first();
  await row.scrollIntoViewIfNeeded();
  await row.click();
  await expect(page.locator('.inspector-slot #inspector')).toBeVisible();
  expect(await fitsViewport(page)).toBe(true);
  await page.locator('#cb-stated').scrollIntoViewIfNeeded();
  expect(await fitsViewport(page)).toBe(true);
  expect(errors).toEqual([]);
});

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false });
  test('compute guide is pre-rendered with its timeline, stated dates and sections', async ({
    page,
  }) => {
    await page.goto(path);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(title);
    await expect(page.locator('.cb-row')).toHaveCount(167);
    expect(await page.locator('.cb-stated-rows > li').count()).toBeGreaterThan(
      40,
    );
    await expect(page.locator('.cb-section .record-rows > li')).toHaveCount(
      167,
    );
    const sitemap = await page.request.get('/sitemap.xml');
    expect(await sitemap.text()).toContain(path);
  });
});
