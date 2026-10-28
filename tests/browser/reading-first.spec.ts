import { test, expect, type Page } from './fixtures';
import AxeBuilder from '@axe-core/playwright';
import { readFileSync } from 'node:fs';
import { datasetSchema } from '../../src/domain/schema';
import { reviewStatus } from '../../src/domain/review-status';
import { documentHistory } from '../../src/domain/document-history';
import {
  documentHistoryStarter,
  starterJson,
  starterMarkdown,
} from '../../src/domain/starter';
import { frontierSafetyFrameworks as collection } from '../../src/reading/frontier-safety-frameworks';

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
const status = reviewStatus(data);

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

async function noViolations(page: Page) {
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .analyze()
    ).violations,
  ).toEqual([]);
}

const fitsViewport = (page: Page) =>
  page.evaluate(
    () => document.documentElement.scrollWidth <= window.innerWidth,
  );

test('start page leads with search, three hubs and one review-status line', async ({
  page,
}) => {
  const errors = collectErrors(page);
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'A documentary history of machine intelligence.',
  );
  await expect(page.locator('.landing-lede .landing-deck')).toHaveText(
    'Selekoa is a machine-first starting point for research on the history of machine intelligence: machines find and check the records, and every one links to its source, for you to verify and build on.',
  );
  // The heading carries the tagline, so the header omits it on this page.
  await expect(
    page
      .locator('.site-header')
      .getByText('A documentary history of machine intelligence.'),
  ).toHaveCount(0);
  await expect(page.getByText(/machine-first/i)).toHaveCount(1);
  await expect(page).toHaveTitle(
    'Selekoa · A documentary history of machine intelligence',
  );
  const statusText =
    'Records found and checked by machines, not reviewed by an editor · What this means →';
  const banner = page.getByRole('banner');
  const line = banner.locator('.site-status');
  await expect(line).toContainText(statusText);
  // One plain line: no boxed notice, no counts, no disclaimer.
  await expect(page.locator('.review-notice, .review-notice-line')).toHaveCount(
    0,
  );
  await expect(page.getByText('what you make of them')).toHaveCount(0);
  await expect(line).not.toContainText(`${status.claims}`);
  await expect(
    page.getByRole('heading', { name: 'What’s covered' }),
  ).toBeVisible();
  for (const hub of ['Governance', 'Ideas & debates', 'Institutions & people'])
    await expect(
      page.getByRole('main').getByRole('heading', { name: hub, level: 3 }),
    ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Not yet covered' }),
  ).toBeVisible();
  await expect(page.getByRole('search')).toBeVisible();
  await expect(page.getByTestId('network')).toHaveCount(0);
  await noViolations(page);
  // The line links to "How this was checked" on the About & method page.
  await line.getByRole('link', { name: 'What this means →' }).click();
  await expect(page).toHaveURL(/\/about$/);
  await expect(page.locator('#about-method')).toBeFocused();
  await expect(page.locator('#about-method')).toHaveText(
    'How this was checked',
  );
  // The exceptions are listed by identity under the coverage counts.
  const exceptions = page.getByRole('list', {
    name: 'Review-state exceptions',
  });
  await page.locator('#review-status summary').click();
  await expect(exceptions).toBeVisible();
  await expect(page.locator('#review-status summary')).toContainText(
    `${status.acceptedClaimIds.length} editorially accepted`,
  );
  await expect(exceptions.getByRole('listitem')).toHaveCount(
    status.acceptedClaimIds.length + status.humanReviewedEvidence.length,
  );
  for (const id of status.acceptedClaimIds)
    await expect(
      exceptions.locator(`button[data-review-claim="${id}"]`).first(),
    ).toBeVisible();
  await exceptions
    .locator(`button[data-review-claim="${status.acceptedClaimIds[0]}"]`)
    .first()
    .click();
  const inspector = page.getByRole('complementary', {
    name: 'Evidence inspector',
  });
  await expect(inspector).toContainText('Editorially accepted');
  await expect(page).toHaveURL(
    new RegExp('/claim/' + status.acceptedClaimIds[0] + '$'),
  );
  // Inner pages carry the same header line once, and no notice of their own.
  await expect(page.getByRole('banner').locator('.site-status')).toHaveCount(1);
  await expect(page.locator('.site-status')).toHaveCount(1);
  await page
    .getByRole('banner')
    .getByRole('link', { name: 'What this means →' })
    .click();
  await expect(page.locator('#about-method')).toBeFocused();
  await page.getByRole('link', { name: 'Selekoa start page' }).click();
  await expect(page).toHaveURL(/:4173\/$/);
  // The start page's search box opens Search; its map is a view of the results.
  await page.getByRole('searchbox').fill('Anthropic');
  await page
    .getByRole('search')
    .getByRole('button', { name: 'Search' })
    .click();
  await expect(page).toHaveURL(/\/search#q=Anthropic$/);
  await page
    .getByRole('group', { name: 'Show search results as' })
    .getByRole('link', { name: 'Map' })
    .click();
  await expect(page).toHaveURL(/\/explore#q=Anthropic$/);
  await expect(page.locator('.exploration-heading h2')).toHaveText(
    'Search: Anthropic',
  );
  await expect(page.locator('.view-description')).toHaveText(
    'Records matching your search. Choose a record to see its direct connections.',
  );
  // Too many matches for a readable map: the list stands in for it.
  await expect(page.locator('.map-withheld')).toContainText(
    'too many for a readable map',
  );
  await expect(page.getByTestId('network')).toHaveCount(0);
  await expect(page.getByLabel('Claims list')).toBeVisible();
  await page.goto('/explore#q=Microsoft');
  await expect(page.getByTestId('network').locator('canvas')).not.toHaveCount(
    0,
  );
  await expect(
    page.getByRole('banner').getByRole('link', { name: 'Search', exact: true }),
  ).toHaveAttribute('aria-current', 'page');
  expect(errors).toEqual([]);
});

test('document history lists editions, labels inference and gaps, and restores inspection', async ({
  page,
}) => {
  const errors = collectErrors(page);
  await page.goto('/governance');
  await page
    .getByRole('link', { name: 'Read the document histories →' })
    .click();
  await expect(page).toHaveURL(/\/documents\/frontier-safety-frameworks$/);
  const history = page.getByRole('article', { name: collection.title });
  const editions = data.entities.filter(
    (e) =>
      e.documentVersion &&
      collection.families.includes(e.documentVersion.family),
  );
  await expect(history.locator('.doc-edition')).toHaveCount(editions.length);
  const xai = history.getByRole('region', {
    name: 'xAI · Frontier AI Framework',
  });
  await expect(xai).toContainText('Inferred document comparison');
  await expect(xai).toContainText('Coverage gap.');
  await expect(xai).toContainText('Open questions and source limits');
  const change = xai.locator('[data-claim-id="faif-2026-compliance-sentence"]');
  await change.click();
  const inspector = page.getByRole('complementary', {
    name: 'Evidence inspector',
  });
  await expect(inspector).toContainText(
    'Inferred by comparing the two editions',
  );
  await expect(inspector.locator('.evidence-card')).toHaveCount(2);
  await expect(page).toHaveURL(/inspect=faif-2026-compliance-sentence$/);
  await noViolations(page);
  await inspector.getByRole('button', { name: 'Close ×' }).click();
  await expect(change).toBeFocused();
  await page.goto(
    '/documents/frontier-safety-frameworks?inspect=issued-rsp-2-0',
  );
  await expect(
    page.getByRole('complementary', { name: 'Evidence inspector' }),
  ).toContainText('Responsible Scaling Policy v2.0');
  await expect(
    page.getByRole('article', { name: collection.title }),
  ).toBeVisible();
  expect(errors).toEqual([]);
});

test('frameworks page reads cleanly: timeline jump, changes and source in a few steps', async ({
  page,
}) => {
  const errors = collectErrors(page);
  await page.goto('/documents/' + collection.id);
  // A reading layout, not the explorer.
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    collection.title,
  );
  for (const absent of [
    page.getByRole('navigation', { name: 'Explore the dataset' }),
    page.getByRole('group', { name: 'Display mode' }),
    page.getByText('same claims and evidence as the map'),
    page.getByText('Explore the documentary record'),
  ])
    await expect(absent).toHaveCount(0);
  // No per-row seed label; exceptions only.
  const history = page.getByRole('article', { name: collection.title });
  await expect(history).not.toContainText('Not reviewed by an editor');
  await expect(page.getByRole('banner').locator('.site-status')).toContainText(
    'not reviewed by an editor',
  );

  // "What did Anthropic change between RSP v2.2 and v3.0, and where is the source?"
  const timeline = page.getByRole('region', { name: 'Editions, 2023–2026' });
  const rsp = timeline.getByRole('list', {
    name: 'Anthropic · Responsible Scaling Policy editions',
  });
  await expect(rsp.getByRole('button')).toHaveCount(
    data.entities.filter((e) => e.documentVersion?.family === 'anthropic-rsp')
      .length,
  );
  await rsp.getByRole('button', { name: 'v3.0, effective 2026-02-24' }).click();
  const heading = page.locator('#edition-rsp-v3-0');
  await expect(heading).toBeFocused();
  await expect(heading).toBeInViewport();
  const edition = page.locator('[data-edition="rsp-v3-0"]');
  await expect(edition.locator('.doc-meta')).toContainText(
    'Effective 2026-02-24 · Published 2026-02-24',
  );
  await expect(edition.locator('.doc-meta')).toContainText('Replaces v2.2');
  await expect(
    edition.getByRole('link', { name: /Exact edition text/ }),
  ).toHaveAttribute(
    'href',
    data.sources.find((s) => s.documentId === 'rsp-v3-0')!.evidenceUrl,
  );
  await expect(
    edition.getByRole('heading', { name: 'Recorded changes from v2.2' }),
  ).toBeVisible();
  const changeIds = data.claims
    .filter((c) => c.subject === 'rsp-v3-0' && c.predicate === 'changes_from')
    .map((c) => c.id);
  expect(changeIds.length).toBeGreaterThan(0);
  for (const id of changeIds)
    await expect(edition.locator(`[data-claim-id="${id}"]`)).toBeVisible();
  // The replacement link opens its own evidence.
  await edition
    .getByRole('button', { name: /Inspect replacement record/ })
    .click();
  const inspector = page.getByRole('complementary', {
    name: 'Evidence inspector',
  });
  await expect(inspector).toContainText('v2.2');
  await expect(inspector.locator('.evidence-card')).not.toHaveCount(0);
  await inspector.getByRole('button', { name: 'Close ×' }).click();
  await expect(
    edition.getByRole('button', { name: /Inspect replacement record/ }),
  ).toBeFocused();
  // Every edition claim on the page remains inspectable, exactly once.
  const editionClaims = documentHistory(data, collection).families.flatMap(
    (f) =>
      f.editions.flatMap((e) => [
        ...e.issued,
        ...e.replaces,
        ...e.changes,
        ...e.applies,
        ...e.credits,
      ]),
  );
  for (const c of editionClaims)
    await expect(history.locator(`[data-claim-id="${c.id}"]`)).toHaveCount(1);
  expect(errors).toEqual([]);
});

test('Institutions & people lists people A–Z, each opening their person page', async ({
  page,
}) => {
  await page.goto('/institutions');
  const people = data.entities.filter((e) => e.type === 'person');
  const entry = page.locator('.people-az');
  await expect(entry.getByRole('link')).toHaveCount(people.length);
  // Filed under "Family, Given" sortName; displayed under the stored name.
  const names = await entry.getByRole('link').allTextContents();
  const collator = new Intl.Collator('en', { sensitivity: 'base' });
  expect(names).toEqual(
    [...people]
      .sort((a, b) => collator.compare(a.sortName!, b.sortName!))
      .map((p) => p.name),
  );
  await expect(
    entry.locator('div', {
      has: page.getByRole('heading', { name: 'L', exact: true }),
    }),
  ).toContainText('Liang Wenfeng / 梁文锋');
  await entry.getByRole('link', { name: 'Jan Leike', exact: true }).click();
  await expect(page).toHaveURL(/\/person\/jan-leike$/);
  await expect(
    page.getByRole('article', { name: 'Jan Leike: person page' }),
  ).toBeVisible();
});

test('research starter downloads match deterministic domain exports', async ({
  page,
}) => {
  await page.goto('/documents/' + collection.id);
  await page.getByText('Download research starter', { exact: true }).click();
  const starter = await documentHistoryStarter(data, collection);
  for (const [label, extension, expected] of [
    ['Download Markdown', 'md', starterMarkdown(starter)],
    ['Download JSON', 'json', starterJson(starter)],
  ]) {
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: label, exact: true }).click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe(
      `${collection.id}-v${collection.version}-starter.${extension}`,
    );
    expect(readFileSync((await download.path())!, 'utf8')).toBe(expected);
  }
});

for (const width of [1440, 390])
  for (const theme of ['light', 'dark'] as const)
    test(`reading-first surfaces ${width}px ${theme}: layout, accessibility and console`, async ({
      page,
    }, testInfo) => {
      const errors = collectErrors(page);
      await page.setViewportSize({ width, height: 1000 });
      await page.goto('/');
      await setTheme(page, theme);
      expect(await fitsViewport(page)).toBe(true);
      await noViolations(page);
      await page.screenshot({
        path: testInfo.outputPath('start.png'),
        fullPage: true,
      });
      await page.goto('/documents/' + collection.id);
      await setTheme(page, theme);
      await page
        .locator('[data-claim-id="faif-2026-compliance-sentence"]')
        .scrollIntoViewIfNeeded();
      expect(await fitsViewport(page)).toBe(true);
      await noViolations(page);
      await page.screenshot({
        path: testInfo.outputPath('documents.png'),
        fullPage: true,
      });
      expect(errors).toEqual([]);
    });

test('the theme follows the system until chosen, and only the choice is stored', async ({
  page,
}) => {
  const errors = collectErrors(page);
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute(
    'data-selekoa-theme',
    'dark',
  );
  expect(await page.evaluate(() => localStorage.length)).toBe(0);
  await setTheme(page, 'light');
  expect(
    await page.evaluate(() => ({ ...localStorage }) as Record<string, string>),
  ).toEqual({ 'selekoa-theme': 'light' });
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute(
    'data-selekoa-theme',
    'light',
  );
  // Without storage the toggle still works for the visit.
  const blocked = await page.context().newPage();
  await blocked.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', {
      get() {
        throw new Error('blocked');
      },
    });
  });
  const blockedErrors = collectErrors(blocked);
  await blocked.goto('/');
  await setTheme(blocked, 'dark');
  await setTheme(blocked, 'light');
  expect(blockedErrors).toEqual([]);
  expect(errors).toEqual([]);
});
