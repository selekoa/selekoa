import { readFileSync } from 'node:fs';
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

const fitsViewport = (page: Page) =>
  page.evaluate(
    () => document.documentElement.scrollWidth <= window.innerWidth,
  );

const axe = async (page: Page) =>
  (
    await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze()
  ).violations;

// The stored records, read as the tests' fixed expectations: the collection's
// proposition records and its institutional events (scoped by the `am-`
// prefix of the admission of 2026-11-06).
const claims: { id: string; predicate: string }[] = JSON.parse(
  readFileSync(new URL('../../data/claims.json', import.meta.url), 'utf8'),
);
const records = claims.filter(
  (c) => c.id.startsWith('am-u') && c.predicate.endsWith('_proposition'),
);
const events = claims.filter((c) => c.id.startsWith('am-event-'));
const path = '/propositions/ai-and-money';
const title =
  'AI and money: what central banks and financial authorities have said, 1997–2026';

test('the page opens from the Ideas hub with its propositions and events', async ({
  page,
}) => {
  const errors = collectErrors(page);
  await page.goto('/ideas');
  await page.getByRole('link', { name: /^Read AI and money/ }).click();
  await expect(page).toHaveURL(new RegExp(`${path}$`));
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(title);
  await expect(page.locator('.prop-section')).toHaveCount(12);
  await expect(page.locator('.prop-events li')).toHaveCount(events.length);
  expect(errors).toEqual([]);
});

test('a speech holding a headline shows the earliest institutional text beside it', async ({
  page,
}) => {
  await page.goto(path);
  // J06: a speech (Haldane, 2015) is earliest located; the earliest located
  // institutional text is the BIS Annual Economic Report 2024.
  const j06 = page.locator('#proposition-j06');
  await expect(j06.locator('.prop-headlines')).toContainText(
    'Earliest located institutional text',
  );
  await expect(j06.locator('.prop-headlines')).toContainText(
    'Speech or remarks',
  );
  // J02: an institution's own text holds the headline, so no second line.
  await expect(
    page.locator('#proposition-j02 .prop-headlines dt', {
      hasText: 'Earliest located institutional text',
    }),
  ).toHaveCount(0);
  // J08: no located text meets the criterion.
  await expect(page.locator('#proposition-j08 .prop-headlines')).toContainText(
    'No located text meets the criterion.',
  );
  // Work stated as under way is labelled so, never as done.
  await expect(
    page.locator('.prop-events li', { hasText: 'Stated as under way' }),
  ).toHaveCount(3);
});

test('a record opens its evidence from the keyboard', async ({ page }) => {
  await page.goto(path);
  const kuroda = page.locator(
    '#proposition-j01 .prop-row[data-claim-id="am-u01-boj-2017-kuroda-ai"]',
  );
  await kuroda.focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/inspect=am-u01-boj-2017-kuroda-ai/);
  await expect(page.locator('#inspector')).toContainText('Kuroda');
});

test('the CSV link downloads one row per record and per event', async ({
  page,
  request,
}) => {
  await page.goto(path);
  const link = page.getByRole('link', { name: 'Download CSV' });
  await expect(link).toHaveAttribute('href', `${path}.csv`);
  const response = await request.get(`${path}.csv`);
  expect(response.ok()).toBe(true);
  const text = await response.text();
  expect(text.split('\r\n')[0]).toBe(
    'row_kind,code,proposition,stance_or_stage,roles,voice,register,text,date,wording_date,statement,document,record',
  );
  expect(text.match(/\/claim\/am-u/g)).toHaveLength(records.length);
  expect(text.match(/\/claim\/am-event-/g)).toHaveLength(events.length);
});

for (const width of [1440, 390])
  test(`AI and money page at ${width}px: layout and accessibility`, async ({
    page,
  }) => {
    const errors = collectErrors(page);
    await page.setViewportSize({ width, height: 1000 });
    await page.goto(path);
    await expect(page.locator('.prop-events')).toBeVisible();
    expect(await fitsViewport(page)).toBe(true);
    expect(await axe(page)).toEqual([]);
    expect(errors).toEqual([]);
  });

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false });
  test('the built page holds every record and every event', async ({
    page,
  }) => {
    await page.goto(path);
    await expect(page.locator('.prop-events li')).toHaveCount(events.length);
    await expect(page.locator('.prop-section')).toHaveCount(12);
  });
});
