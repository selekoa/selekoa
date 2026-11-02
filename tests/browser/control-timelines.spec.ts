import { test, expect, type Page } from './fixtures';
import AxeBuilder from '@axe-core/playwright';
import { parseTimelineCsv } from '../../src/domain/control-timelines';

/**
 * Control timelines side by side (review/control-timelines-2026-11-01.md):
 * four organisations' control records on one year axis, a list by year at
 * phone width, a record panel and a CSV built from the same records.
 */
const path = '/control/side-by-side';
const organisations = ['OpenAI', 'Anthropic', 'Google DeepMind', 'xAI'];

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

/** The record IDs of the marks drawn on the axis, row by row. */
const drawnIds = (page: Page) =>
  page
    .locator('.tl-axis .tl-mark')
    .evaluateAll((marks) => marks.map((m) => m.getAttribute('data-claim-id')!));

async function csvRows(page: Page) {
  const href = await page
    .getByRole('link', { name: 'Download the records shown (CSV)' })
    .getAttribute('href');
  const response = await page.request.get(href!);
  expect(response.status()).toBe(200);
  const [header, ...rows] = parseTimelineCsv(await response.text());
  return rows.map((row) =>
    Object.fromEntries(header.map((name, i) => [name, row[i]])),
  );
}

test('control timelines: one axis, four rows, dates at their precision', async ({
  page,
}) => {
  const errors = collectErrors(page);
  const slices: string[] = [];
  page.on('request', (r) => {
    const p = new URL(r.url()).pathname;
    if (p.startsWith('/slices/') || /_virtual_records-/.test(p)) slices.push(p);
  });
  await page.goto(path);
  await expect(page).toHaveTitle('Control timelines side by side · Selekoa');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Control timelines side by side',
  );
  // Drawn from its own slice; the whole records are not loaded.
  expect(slices).toContain('/slices/control/side-by-side.json');
  expect(slices.some((p) => /_virtual_records-/.test(p))).toBe(false);

  const axis = page.locator('.tl-axis');
  await expect(axis).toBeVisible();
  await expect(page.locator('.tl-by-year')).toBeHidden();
  await expect(axis.locator('.tl-lane-name')).toHaveText(organisations);
  const years = await axis.locator('.tl-year-label').allTextContents();
  expect(years.map(Number)).toEqual(
    Array.from({ length: years.length }, (_, i) => Number(years[0]) + i),
  );

  // A year-precision record is a band as wide as its year; a day is a dot.
  const box = async (selector: string) =>
    (await page.locator(selector).boundingBox())!;
  const label = (y: string) =>
    box(`.tl-year-label:text-is("${y}")`).then((b) => b.x);
  const yearWidth = (await label('2015')) - (await label('2014'));
  const band = await box(
    '.tl-axis [data-claim-id="google-acquired-deepmind-2014"] .tl-mark-shape',
  );
  expect(Math.abs(band.width - yearWidth)).toBeLessThan(2);
  expect(Math.abs(band.x - (await label('2014')))).toBeLessThan(2);
  const dot = await box(
    '.tl-axis [data-claim-id="xm-spacex-acquisition"] .tl-mark-shape',
  );
  expect(dot.width).toBeLessThan(14);
  await expect(
    axis.locator('[data-claim-id="google-acquired-deepmind-2014"]'),
  ).toHaveAttribute('data-precision', 'year');
  // An announcement is drawn as one, apart from a completed transaction.
  await expect(
    axis.locator('[data-claim-id="xm-spacex-acquisition"]'),
  ).toHaveAttribute('data-status', 'announced');
  await expect(
    axis.locator('[data-claim-id="google-acquired-deepmind-2014"]'),
  ).toHaveAttribute('data-status', 'effective');
  const styles = await page.evaluate(() => {
    const style = (id: string) =>
      getComputedStyle(
        document.querySelector(
          `.tl-axis [data-claim-id="${id}"] .tl-mark-shape`,
        )!,
      );
    const a = style('xm-spacex-acquisition');
    const e = style('google-acquired-deepmind-2014');
    return [
      a.borderTopStyle,
      e.borderTopStyle,
      a.backgroundColor !== e.backgroundColor,
    ];
  });
  expect(styles).toEqual(['dashed', 'solid', true]);

  // Gaps are stated, not filled; nothing is drawn between rows.
  const deepmind = axis.locator(
    '.tl-lane[data-organisation="google-deepmind"]',
  );
  await expect(deepmind.locator('.tl-gap').first()).toContainText(
    'No control record in this period',
  );
  await expect(axis.locator('svg, line, path')).toHaveCount(0);
  // No count ranks the organisations.
  const header = await page.locator('.doc-lede').textContent();
  expect(header).not.toMatch(/\d+ records/);
  await expect(page.locator('.tl-undated')).toContainText(
    'Every record shown has a stored date',
  );
  expect(await fitsViewport(page)).toBe(true);
  expect(errors).toEqual([]);
});

test('control timelines: a mark opens its record, with passage and source', async ({
  page,
}) => {
  const errors = collectErrors(page);
  await page.goto(path);
  const mark = page.locator('.tl-axis [data-claim-id="xm-spacex-acquisition"]');
  await expect(mark).toHaveAttribute('aria-label', /^xAI · 2026-02-02 · /);
  await mark.focus();
  await page.keyboard.press('Enter');
  const panel = page.locator('#inspector');
  await expect(panel).toBeVisible();
  await expect(page).toHaveURL(/\?inspect=xm-spacex-acquisition$/);
  await expect(panel).toContainText(
    'xAI announced that SpaceX had acquired xAI.',
  );
  // The evidence passage: a quotation or a marked paraphrase.
  await expect(panel.locator('.evidence-card').first()).toContainText(
    /Paraphrase|“/,
  );
  await expect(
    panel.locator('.evidence-card a[href^="http"]').first(),
  ).toBeVisible();
  await expect(mark).toHaveAttribute('aria-pressed', 'true');
  await panel
    .getByRole('button', { name: /^Close/ })
    .first()
    .click();
  await expect(panel).toHaveCount(0);
  await expect(mark).toBeFocused();
  // Opened at its address, the record is open beside the page.
  await page.goto(`${path}?inspect=deepmind-combined-2023`);
  await expect(page.locator('#inspector')).toContainText('Google DeepMind');
  expect(errors).toEqual([]);
});

test('control timelines at 390 px: years stacked, records listed, no sideways scroll', async ({
  page,
}) => {
  const errors = collectErrors(page);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(path);
  await expect(page.locator('.tl-axis')).toBeHidden();
  const list = page.locator('.tl-by-year');
  await expect(list).toBeVisible();
  const years = await list.locator('h3').allTextContents();
  expect(years).toEqual([...years].sort());
  const block = list.locator('.tl-year-block', {
    has: page.locator('h3', { hasText: /^2014$/ }),
  });
  await expect(block.locator('h4')).toHaveText(['Google DeepMind']);
  await expect(block.locator('.tl-gap-line')).toHaveText(
    'No control record in this period: OpenAI, Anthropic, xAI.',
  );
  await expect(block).toContainText('2014 · year only');
  expect(await fitsViewport(page)).toBe(true);
  // A record opens in place, below its item.
  const item = list.locator('[data-claim-id="xm-x-acquisition"]');
  await item.click();
  const slot = list.locator('li.inspector-slot #inspector');
  await expect(slot).toBeVisible();
  await expect(slot).toContainText('xAI had acquired X');
  expect(await fitsViewport(page)).toBe(true);
  expect(errors).toEqual([]);
});

test('control timelines: the CSV holds the records drawn, and each is stored', async ({
  page,
}) => {
  await page.goto(path);
  const link = page.getByRole('link', {
    name: 'Download the records shown (CSV)',
  });
  await expect(link).toHaveAttribute('download', /\.csv$/);
  const rows = await csvRows(page);
  const drawn = await drawnIds(page);
  const undated = await page
    .locator('.tl-undated [data-claim-id]')
    .evaluateAll((e) => e.map((x) => x.getAttribute('data-claim-id')!));
  expect(rows.map((r) => r.record_id)).toEqual([...drawn, ...undated]);
  // The list at phone width holds the same records.
  const listed = await page
    .locator('.tl-by-year [data-claim-id]')
    .evaluateAll((e) => e.map((x) => x.getAttribute('data-claim-id')!));
  expect(new Set(listed)).toEqual(new Set(drawn));
  // Each row agrees with its mark.
  for (const row of rows.slice(0, 200)) {
    const mark = page.locator(`.tl-axis [data-claim-id="${row.record_id}"]`);
    const lane = await mark.evaluate(
      (m) => m.closest('.tl-lane')!.querySelector('.tl-lane-name')!.textContent,
    );
    expect(lane).toBe(row.organisation);
    expect(await mark.getAttribute('data-precision')).toBe(row.date_precision);
    expect(row.date.startsWith((await mark.getAttribute('data-date'))!)).toBe(
      true,
    );
    expect(await mark.getAttribute('aria-label')).toContain(row.statement);
  }
  // Every drawn record is a stored claim with a page of its own.
  for (const id of drawn) {
    const response = await page.request.get(`/claim/${encodeURIComponent(id)}`);
    expect(response.status(), id).toBe(200);
    expect(await response.text(), id).toContain(`Record ID <code>${id}</code>`);
  }
});

test('control timelines: linked from the hub, the control pages and four dossiers', async ({
  page,
}) => {
  await page.goto('/governance');
  // A tool: the shared tool style, named with what it shows.
  const hubLink = page.locator('.tool-link[data-tool="control-timelines"]');
  await expect(hubLink).toHaveAccessibleName(
    /^Control timelines side by side: /,
  );
  await expect(hubLink).toHaveAttribute('href', path);
  for (const id of ['openai', 'anthropic']) {
    await page.goto(`/control/${id}`);
    await expect(
      page.getByRole('link', { name: 'Control timelines side by side' }),
    ).toHaveAttribute('href', path);
  }
  for (const id of ['openai', 'anthropic', 'google-deepmind', 'xai']) {
    await page.goto(`/dossier/${id}`);
    await expect(
      page.getByRole('link', { name: /^Control timelines side by side:/ }),
    ).toHaveAttribute('href', path);
  }
  await page.goto('/dossier/meta');
  await expect(
    page.getByRole('link', { name: /^Control timelines side by side:/ }),
  ).toHaveCount(0);
  // The link opens the page from its slice.
  await page.goto('/dossier/xai');
  await page
    .getByRole('link', { name: /^Control timelines side by side:/ })
    .click();
  await expect(page).toHaveURL(new RegExp(`${path}$`));
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Control timelines side by side',
  );
});

for (const width of [1440, 390])
  test(`control timelines ${width}px: accessibility`, async ({ page }) => {
    const errors = collectErrors(page);
    await page.setViewportSize({ width, height: 1000 });
    await page.goto(path);
    expect(
      (
        await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
          .analyze()
      ).violations,
    ).toEqual([]);
    expect(errors).toEqual([]);
  });
