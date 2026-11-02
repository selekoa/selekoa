import { test, expect, type Page } from './fixtures';
import AxeBuilder from '@axe-core/playwright';
import { existsSync } from 'node:fs';

/**
 * The chronicle (review/chronicle-by-year-2026-10-31.md): one page per year
 * and the index of the years, reached from the start page, the hubs, the
 * claim panel and search; drawn from each page's slice, at desktop and phone
 * widths and without scripts.
 */

/** Words that state a trend or a cause; never in the pages' own text. */
const trendWords =
  /(?<![\w-])(booms?|booming|race|races|racing|arms race|surg(e|es|ed|ing)|led to|leads to|in response|because of|as a result|driven by|spurred|triggered|soar(ed|ing|s)?|skyrocket\w*|frenzy|rush|turning point|milestone|landmark|watershed|breakthrough|rise of|decline|trend\w*)\b/i;

function collectErrors(page: Page) {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  return errors;
}

/** Requests made from the moment `mark` is called, by path. */
function requests(page: Page) {
  const seen: string[] = [];
  page.on('request', (r) => seen.push(new URL(r.url()).pathname));
  let from = 0;
  const since = () => seen.slice(from);
  return {
    mark: () => {
      from = seen.length;
    },
    records: () =>
      since().some((p) =>
        /\/assets\/_virtual_records-(content|core)-[^/]+\.js$/.test(p),
      ),
    slices: () => since().filter((p) => p.startsWith('/slices/')),
  };
}

const fitsViewport = (page: Page) =>
  page.evaluate(
    () => document.documentElement.scrollWidth <= window.innerWidth,
  );

/** The page's own text: statements, names and stated wording removed. */
const ownText = (page: Page) =>
  page.locator('#chronicle').evaluate((main) => {
    const copy = main.cloneNode(true) as HTMLElement;
    copy.querySelectorAll('[data-record-text]').forEach((e) => e.remove());
    return copy.textContent ?? '';
  });

/**
 * The application's markup once settled: each element with its attributes
 * sorted (React sets an input's type first when it creates one in the
 * browser), without React's generated IDs.
 */
async function settled(page: Page) {
  let last = '';
  for (let i = 0; i < 40; i++) {
    const now = await page.evaluate(() => {
      const out: string[] = [document.title];
      const walk = (node: Node) => {
        if (node.nodeType === Node.TEXT_NODE) out.push(node.textContent ?? '');
        if (!(node instanceof Element)) return;
        const attributes = [...node.attributes]
          .map((a) => `${a.name}="${a.value}"`)
          .sort();
        out.push(`<${node.localName} ${attributes.join(' ')}>`);
        node.childNodes.forEach(walk);
        out.push(`</${node.localName}>`);
      };
      document.getElementById('root')!.childNodes.forEach(walk);
      return out.join('\n');
    });
    if (now === last) break;
    last = now;
    await page.waitForTimeout(400);
  }
  return last.replace(/«[rR][^»]*»|:[rR][0-9a-z]*:|_[rR]_[0-9a-z]*_/g, 'ID');
}

test('chronicle: from the start page to a year, by topic, drawn from slices', async ({
  page,
}) => {
  const errors = collectErrors(page);
  const seen = requests(page);
  await page.goto('/');
  await page
    .getByRole('navigation', { name: 'Ways in' })
    .getByRole('link', { name: /^Browse by year/ })
    .click();
  await expect(page).toHaveURL(/\/years$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Browse by year',
  );
  await expect(page).toHaveTitle('Browse by year · Selekoa');
  const years = page.locator('.chronicle-year-link');
  const listed = await years.allTextContents();
  expect(listed).toEqual([...listed].sort());
  expect(listed).toContain('2025');

  // A year opens from its slice alone, as a fresh load of its address would.
  // From a page drawn from its slice (a fresh load: the start page's links
  // load the whole records), a year opens from its slice alone.
  await page.goto('/years');
  seen.mark();
  await page.locator('.chronicle-year-link', { hasText: /^1955$/ }).click();
  await expect(page).toHaveURL(/\/year\/1955$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('1955');
  expect(seen.slices()).toEqual(['/slices/year/1955.json']);
  expect(seen.records()).toBe(false);
  const linked = await settled(page);
  await page.goto('/year/1955');
  expect(await settled(page)).toBe(linked);

  // Records in date order under their months, each with its date's kind
  // and precision, and its links.
  await page.goto('/year/2025');
  await expect(page).toHaveTitle('Records dated 2025 · Selekoa');
  const topics = page.getByRole('navigation', { name: 'Topics' });
  await expect(
    topics.getByRole('link', { name: /^All topics/ }),
  ).toHaveAttribute('aria-current', 'page');
  for (const section of await page.locator('.chronicle-topic').all()) {
    // Each entry's own date: an interval also shows its end within the year
    // (since 2026-11-01 one 2025 record runs from April to July), which is
    // not its place in the order.
    const dates = await section
      .locator('.chronicle-date > time:first-of-type')
      .allTextContents();
    expect(dates).toEqual([...dates].sort());
    for (const date of dates) expect(date.startsWith('2025')).toBe(true);
  }
  const first = page.locator('.chronicle-entry').first();
  await expect(first.locator('.chronicle-date')).toContainText(/dated to the/);
  await expect(page.locator('.chronicle-stated h2')).toContainText(
    'Dates stated for 2025',
  );
  expect(await ownText(page)).toContain(
    'Selective: what the records hold, not a history of the year.',
  );
  expect((await ownText(page)).match(trendWords)).toBeNull();

  // A topic is a page of its own: a link, drawn from its slice.
  seen.mark();
  await topics.getByRole('link', { name: /^Governance/ }).click();
  await expect(page).toHaveURL(/\/year\/2025-governance$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    '2025: governance',
  );
  expect(seen.slices()).toEqual(['/slices/year/2025-governance.json']);
  expect(seen.records()).toBe(false);
  await expect(page.locator('.chronicle-topic')).toHaveCount(1);
  await expect(
    topics.getByRole('link', { name: /^Governance/ }),
  ).toHaveAttribute('aria-current', 'page');

  // The statement opens the claim and its evidence beside the page.
  const row = page.locator('.chronicle-entry a.chronicle-statement').first();
  await row.click();
  await expect(page.locator('#inspector')).toBeVisible();
  await expect(page).toHaveURL(/\/year\/2025-governance\?inspect=/);
  expect(errors).toEqual([]);
});

test('chronicle: reached from a hub, a claim panel and search', async ({
  page,
}) => {
  const errors = collectErrors(page);
  for (const hub of ['/governance', '/ideas', '/institutions']) {
    await page.goto(hub);
    await expect(
      page.getByRole('link', { name: 'Browse by year', exact: true }),
    ).toHaveAttribute('href', '/years');
  }
  await page.getByRole('link', { name: 'Browse by year', exact: true }).click();
  await expect(page).toHaveURL(/\/years$/);

  // A claim's date links to its year.
  await page.goto('/claim/dario-anthropic-2021');
  const year = page.locator('#inspector .inspector-year').first();
  await expect(year).toHaveText(/^Records dated \d{4} →$/);
  const href = await year.getAttribute('href');
  await year.click();
  await expect(page).toHaveURL(new RegExp(`${href}$`));
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    href!.split('/').at(-1)!,
  );

  // Search lists each year among its pages.
  await page.goto('/search#q=2025');
  await expect(
    page.getByRole('link', { name: /Records dated 2025/ }).first(),
  ).toHaveAttribute('href', '/year/2025');
  expect(errors).toEqual([]);
});

test('chronicle: every link on its pages resolves to a built page', async ({
  page,
}) => {
  // The preview server answers any path with a page; a link resolves only
  // if the build wrote its file.
  const built = (path: string) =>
    path === '/'
      ? existsSync('dist/index.html')
      : existsSync(`dist${decodeURI(path)}.html`) ||
        existsSync(`dist${decodeURI(path)}`);
  expect(built('/year/not-a-year')).toBe(false);
  const checked = new Set<string>();
  for (const path of [
    '/years',
    '/year/1955',
    '/year/2050',
    '/year/2024-capital',
    '/year/2025',
  ]) {
    await page.goto(path);
    const hrefs = await page
      .locator('#root a[href^="/"]')
      .evaluateAll((links) =>
        links.map((a) => new URL((a as HTMLAnchorElement).href).pathname),
      );
    for (const href of new Set(hrefs)) {
      if (checked.has(href)) continue;
      checked.add(href);
      expect(built(href), `${path}: ${href}`).toBe(true);
    }
  }
  expect(checked.size).toBeGreaterThan(400);
});

test('chronicle: accessible, and no wider than the screen', async ({
  page,
}) => {
  const errors = collectErrors(page);
  await page.goto('/year/1955');
  const results = await new AxeBuilder({ page })
    .include('#chronicle')
    .analyze();
  expect(results.violations).toEqual([]);
  await page.goto('/years');
  const index = await new AxeBuilder({ page }).include('#chronicle').analyze();
  expect(index.violations).toEqual([]);
  for (const path of ['/years', '/year/2025', '/year/2050']) {
    await page.goto(path);
    expect(await fitsViewport(page), path).toBe(true);
  }
  expect(errors).toEqual([]);
});

test.describe('on a phone', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('chronicle: fits the screen; a claim opens below its record', async ({
    page,
  }) => {
    const errors = collectErrors(page);
    for (const path of ['/years', '/year/2025', '/year/2025-compute']) {
      await page.goto(path);
      expect(await fitsViewport(page), path).toBe(true);
    }
    const statement = page.locator('a.chronicle-statement').first();
    await statement.click();
    const panel = page.locator('.inspector-slot #inspector');
    await expect(panel).toBeVisible();
    expect(await fitsViewport(page)).toBe(true);
    expect(errors).toEqual([]);
  });
});

test.describe('without scripts', () => {
  test.use({ javaScriptEnabled: false });

  test('chronicle: years, topics and records are real links', async ({
    page,
  }) => {
    await page.goto('/years');
    await page.locator('.chronicle-year-link', { hasText: /^2025$/ }).click();
    await expect(page).toHaveURL(/\/year\/2025$/);
    await expect(page.locator('.chronicle-entry').first()).toBeVisible();
    await page
      .getByRole('navigation', { name: 'Topics' })
      .getByRole('link', { name: /^Capital/ })
      .click();
    await expect(page).toHaveURL(/\/year\/2025-capital$/);
    await expect(page.locator('.chronicle-topic')).toHaveCount(1);
    await page.getByRole('link', { name: '2026 →' }).click();
    await expect(page).toHaveURL(/\/year\/2026$/);
    const statement = page.locator('a.chronicle-statement').first();
    const href = await statement.getAttribute('href');
    expect(href).toMatch(/^\/claim\//);
    await statement.click();
    await expect(page).toHaveURL(new RegExp(`${href}$`));
    // The claim page's date links back to its year.
    await expect(page.locator('.inspector-year').first()).toHaveAttribute(
      'href',
      /^\/year\/\d{4}$/,
    );
  });
});
