import { test, expect, stubAnalytics } from './fixtures';
import type { Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// Fixes from the reader test of 2026-10-26 (docs/fresh-eyes-2026-10-26.md);
// see review/reader-fixes-2026-10-26.md.

function collectErrors(page: Page) {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  return errors;
}

async function noViolations(page: Page) {
  const result = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();
  expect(result.violations.map((v) => `${v.id}: ${v.nodes.length}`)).toEqual(
    [],
  );
}

const fitsViewport = (page: Page) =>
  page.evaluate(
    () => document.documentElement.scrollWidth <= window.innerWidth + 1,
  );

/** The number in "N claims" in the search status line. */
async function listClaims(page: Page) {
  const status = await page.locator('#search-status').innerText();
  return Number(/(\d+) claims?\b/.exec(status)?.[1] ?? 0);
}

test('search timeline and map cover every claim the list shows', async ({
  page,
}) => {
  const errors = collectErrors(page);
  for (const q of ['Yudkowsky', 'Hanson', 'Acemoglu']) {
    await page.goto('/search#q=' + q);
    await expect(page.locator('#search-status')).toContainText('claims');
    const claims = await listClaims(page);
    expect(claims).toBeGreaterThan(0);
    await page
      .getByRole('group', { name: 'Show search results as' })
      .getByRole('link', { name: 'Timeline' })
      .click();
    await expect(page).toHaveURL(new RegExp(`/explore#q=${q}&view=timeline$`));
    const banner = page.locator('.explore-query');
    await expect(banner).toContainText(`search for “${q}”`);
    // Every claim behind the list's claims and passages is on the timeline.
    await expect(banner).toContainText('They include all');
    const shown = Number(
      /: (\d+)\./.exec(await banner.locator('p').innerText())![1],
    );
    expect(shown).toBeGreaterThanOrEqual(claims);
    await expect(
      page.getByLabel('Chronological claims').locator('.list-record'),
    ).toHaveCount(shown);
    await page
      .getByRole('group', { name: 'Display mode' })
      .getByRole('button', { name: 'Map' })
      .click();
    // The map is drawn, or the list stands in and says why; never empty.
    await expect(
      page.locator('.network-wrap, .map-withheld').first(),
    ).toBeVisible();
    await expect(page.getByText('No claims match these filters')).toHaveCount(
      0,
    );
  }
  // An address opened directly shows the same set.
  await page.goto('/explore#q=Hanson&view=timeline');
  await expect(page.locator('.explore-query')).toContainText(
    'They include all',
  );
  expect(
    await page
      .getByLabel('Chronological claims')
      .locator('.list-record')
      .count(),
  ).toBeGreaterThan(0);
  expect(errors).toEqual([]);
});

test('a scheduled future year is labelled as such in the year filter', async ({
  page,
}) => {
  await page.goto('/explore');
  const latest = page
    .getByLabel('Records through year')
    .locator('option')
    .first();
  const year = Number((await latest.innerText()).slice(0, 4));
  if (year > new Date().getFullYear())
    await expect(latest).toHaveText(/including scheduled dates$/);
});

test('internal navigation is made of real links that open in place or in a new tab', async ({
  page,
  context,
}) => {
  const errors = collectErrors(page);
  await page.goto('/');
  const nav = page.getByRole('navigation', { name: 'Primary' });
  for (const [name, href] of [
    ['Governance', '/governance'],
    ['Ideas & debates', '/ideas'],
    ['Institutions & people', '/institutions'],
    ['Search', '/search'],
    ['About & method', '/about'],
  ])
    await expect(nav.getByRole('link', { name })).toHaveAttribute('href', href);
  await expect(
    page.getByRole('link', { name: 'Selekoa start page' }),
  ).toHaveAttribute('href', '/');
  // Every hub card entry is a link with an address.
  const cards = page.locator('.hub-cards');
  await expect(cards.locator('button')).toHaveCount(0);
  for (const href of await cards
    .getByRole('link')
    .evaluateAll((links) => links.map((a) => a.getAttribute('href'))))
    expect(href).toMatch(/^\/[a-z]/);
  // A plain click opens the page in place, without reloading.
  await page.evaluate(() => ((window as unknown as { kept: number }).kept = 1));
  await nav.getByRole('link', { name: 'Institutions & people' }).click();
  await expect(
    page.getByRole('heading', { level: 1, name: 'Institutions & people' }),
  ).toBeVisible();
  expect(
    await page.evaluate(() => (window as unknown as { kept?: number }).kept),
  ).toBe(1);
  // People A–Z entries are links to person pages.
  const person = page.locator('.people-az a').first();
  const personHref = await person.getAttribute('href');
  expect(personHref).toMatch(/^\/person\//);
  // A link opened in a new tab lands on the same page.
  const opened = await context.newPage();
  await opened.goto(personHref!);
  await expect(opened.locator('.person-page h1')).toHaveText(
    await person.innerText(),
  );
  await opened.close();
  await person.click();
  await expect(page).toHaveURL(new RegExp(personHref!.replace('?', '\\?')));
  // "Appears in" entries on a person page are links to collection pages.
  await page.goto('/person/eliezer-yudkowsky');
  const appears = page.locator('.record-appears a');
  expect(await appears.count()).toBeGreaterThan(0);
  for (const href of await appears.evaluateAll((links) =>
    links.map((a) => a.getAttribute('href')),
  ))
    expect(href).toMatch(
      /^\/(propositions|documents|control|commitments|question)\//,
    );
  // A record link in the claim panel names its page's address.
  await page.goto('/propositions/yudkowsky-arguments');
  await page.locator('[data-claim-id]').first().click();
  const endpoints = page.locator('#inspector .claim-endpoints a');
  await expect(endpoints.first()).toHaveAttribute(
    'href',
    /^\/(document|person|propositions)\//,
  );
  // Keyboard: a link is focusable and Enter follows it.
  await page.goto('/');
  await nav.getByRole('link', { name: 'Search' }).focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/search$/);
  expect(errors).toEqual([]);
});

test('a person page leads with the records on the person’s texts', async ({
  page,
}) => {
  await page.goto('/person/eliezer-yudkowsky');
  const line = page.locator('.person-page .doc-lede .eyebrow').first();
  await expect(line).toHaveText(
    /^Person · \d+ records on texts by this author · \d+ recorded claims? about this person · appears in \d+ collections?$/i,
  );
  // Someone named in claims but not an author leads with the claims.
  await page.goto('/person/dario-amodei');
  await expect(
    page.locator('.person-page .doc-lede .eyebrow').first(),
  ).toHaveText(/^Person · \d+ recorded claims? about this person/i);
});

test('a person-page row with two sources names the source of each date', async ({
  page,
}) => {
  await page.goto('/person/larry-summers');
  const line = page
    .locator(
      '[data-claim-id="cs-summers-initial-board-2023"] .dossier-relation',
    )
    .first();
  await expect(line).toContainText(
    'Sam Altman returns as CEO, OpenAI has a new initial board: published 2023-11-29 · Our structure: publication date unknown',
  );
  await expect(line).not.toContainText('Source published');
});

test('on a phone the claim panel opens below the tapped record, and Close returns to it', async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
  });
  await stubAnalytics(context);
  const page = await context.newPage();
  const errors = collectErrors(page);
  const cases: [string, string, () => Promise<void>][] = [
    ['/propositions/yudkowsky-arguments', '[data-claim-id]', async () => {}],
    ['/search#q=Yudkowsky', 'button.search-hit', async () => {}],
    [
      '/documents/frontier-safety-frameworks',
      'td [data-claim-id]',
      () =>
        page
          .locator('#family-anthropic-rsp details.doc-alignment summary')
          .click(),
    ],
  ];
  for (const [address, selector, prepare] of cases) {
    await page.goto(address);
    await prepare();
    const record = page.locator(selector + ' >> visible=true').nth(5);
    await record.scrollIntoViewIfNeeded();
    const id = await record.getAttribute('data-claim-id');
    await record.tap();
    const panel = page.locator('#inspector');
    await expect(panel).toBeFocused();
    await expect(panel).toBeInViewport();
    const r = (await record.boundingBox())!;
    const p = (await panel.boundingBox())!;
    // Directly below: after the record, and right after its own list item or
    // table row.
    expect(p.y).toBeGreaterThanOrEqual(r.y + r.height);
    const rowBottom = await record.evaluate(
      (e) => e.closest('li, tr')!.getBoundingClientRect().bottom,
    );
    expect(p.y - rowBottom).toBeGreaterThanOrEqual(0);
    expect(p.y - rowBottom).toBeLessThan(40);
    expect(await fitsViewport(page)).toBe(true);
    await noViolations(page);
    await panel.getByRole('button', { name: /Close/ }).tap();
    await expect(panel).toHaveCount(0);
    await expect(page.locator(`[data-claim-id="${id}"]:focus`)).toHaveCount(1);
    await expect(record).toBeInViewport();
    await expect(page.locator('.inspector-slot')).toHaveCount(0);
  }
  expect(errors).toEqual([]);
  await context.close();
});

for (const width of [1440, 390])
  for (const theme of ['light', 'dark'] as const)
    test(`reader-fix surfaces ${width}px ${theme}: accessibility and console`, async ({
      page,
    }) => {
      const errors = collectErrors(page);
      await page.setViewportSize({ width, height: 1000 });
      await page.emulateMedia({ colorScheme: theme });
      for (const address of [
        '/',
        '/ideas',
        '/search#q=Yudkowsky',
        '/explore#q=Yudkowsky&view=timeline',
        '/explore#q=Hanson',
        '/person/eliezer-yudkowsky',
        '/dossier/anthropic',
        '/propositions/economics-of-machine-intelligence',
      ]) {
        await page.goto(address);
        await page.waitForLoadState('networkidle');
        await expect(page.locator('main').first()).toBeVisible();
        await expect(page.getByText(/^Loading/)).toHaveCount(0);
        expect(await fitsViewport(page), address).toBe(true);
        await noViolations(page);
      }
      expect(errors).toEqual([]);
    });
