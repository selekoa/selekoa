import { readFileSync } from 'node:fs';
import { test, expect, type Page } from './fixtures';
import AxeBuilder from '@axe-core/playwright';
import { parseTimelineCsv } from '../../src/domain/control-timelines';
import { authorKey } from '../../src/domain/propositions';
import type { Claim, Source } from '../../src/domain/schema';

/**
 * Propositions by author (review/propositions-by-thinker-2026-11-01.md): an
 * index of the propositions collections and one page per collection, read
 * by proposition or by author, a CSV of the stances shown, and links from
 * the tools, the Ideas & debates hub, collection and person pages.
 */
const path = '/stances/machine-succession';
const claims = new Map(
  (JSON.parse(readFileSync('data/claims.json', 'utf8')) as Claim[]).map((c) => [
    c.id,
    c,
  ]),
);
const sources = JSON.parse(
  readFileSync('data/sources.json', 'utf8'),
) as Source[];
const stances: Record<string, string> = {
  articulates_proposition: 'Articulates',
  contests_proposition: 'Contests',
  bears_on_proposition: 'Bears on',
};

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

/** Each row drawn: its record, section, stance line, heading and date. */
const drawnRows = (page: Page) =>
  page.locator('main .stances-rows [data-claim-id]').evaluateAll((rows) =>
    rows.map((row) => ({
      id: row.getAttribute('data-claim-id')!,
      section: row.closest('section')!.getAttribute('aria-labelledby')!,
      kind: row.querySelector('.control-kind')!.textContent!,
      heading: row.querySelector('.control-route')!.textContent!,
      date: row.querySelector('.dossier-relation')!.textContent!,
    })),
  );

test('by proposition: every row is a stored stance record, in date order', async ({
  page,
}) => {
  const errors = collectErrors(page);
  const slices: string[] = [];
  page.on('request', (r) => {
    const p = new URL(r.url()).pathname;
    if (p.startsWith('/slices/') || /_virtual_records-/.test(p)) slices.push(p);
  });
  await page.goto(path);
  await expect(page).toHaveTitle(/^Propositions by author: Machine succession/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Machine succession',
  );
  // Drawn from its own slice; the whole records are not loaded.
  expect(slices).toContain('/slices/stances/machine-succession.json');
  expect(slices.some((p) => /_virtual_records-/.test(p))).toBe(false);
  await expect(
    page.getByRole('button', { name: 'By proposition' }),
  ).toHaveAttribute('aria-pressed', 'true');

  const rows = await drawnRows(page);
  expect(rows.length).toBeGreaterThan(0);
  const bySection = new Map<string, typeof rows>();
  for (const row of rows) {
    // The record exists, relates this text to this proposition, and has
    // the stance the row shows; the date is the stored one.
    const claim = claims.get(row.id)!;
    expect(claim, row.id).toBeTruthy();
    expect(Object.keys(stances)).toContain(claim.predicate);
    expect(row.section).toBe(
      `stances-${claim.object.kind === 'entity' ? claim.object.entityId : ''}`,
    );
    expect(row.kind.split(' · ')[0]).toBe(stances[claim.predicate]);
    if (claim.time.kind === 'event')
      expect(row.date.startsWith(claim.time.date)).toBe(true);
    // "Earliest located" only where a stored role says so.
    const roles = claim.attributes!.thought!.roles;
    expect(row.kind.includes('Earliest located')).toBe(
      roles.some((r) => r.startsWith('earliest-located')),
    );
    bySection.set(row.section, [...(bySection.get(row.section) ?? []), row]);
  }
  for (const list of bySection.values()) {
    const dates = list.map((r) => r.date.split(' · ')[0]);
    expect(dates).toEqual([...dates].sort());
  }
  // No wording that ranks or characterises people.
  const text = await page.locator('main').innerText();
  expect(text).not.toMatch(
    /\bfirst to\b|\bcoined\b|\boriginated\b|\bopposes\b/i,
  );
  expect(errors).toEqual([]);
});

test('by author: bylines as printed, alphabetical, no counts by name', async ({
  page,
}) => {
  const whole: string[] = [];
  page.on('request', (r) => {
    if (/_virtual_records-/.test(new URL(r.url()).pathname))
      whole.push(r.url());
  });
  await page.goto(path);
  await page.getByRole('button', { name: 'By author' }).click();
  await expect(page.getByRole('button', { name: 'By author' })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  // The switch acts at once, from the page's slice: it does not wait for
  // the whole records.
  expect(whole).toEqual([]);
  const authors = page.locator('.stances-author');
  await expect(authors.first()).toBeVisible();
  const sections = await authors.evaluateAll((list) =>
    list.map((s) => ({
      name: s.querySelector('h3')!.textContent!,
      ids: [...s.querySelectorAll('[data-claim-id]')].map((r) =>
        r.getAttribute('data-claim-id')!,
      ),
    })),
  );
  const named = sections.filter(
    (s) => s.name !== 'Texts without a recorded byline',
  );
  const collator = new Intl.Collator('en', { sensitivity: 'base' });
  const names = named.map((s) => s.name);
  expect(names).toEqual([...names].sort(collator.compare));
  for (const s of named) {
    // A name alone: no count beside it.
    expect(s.name).not.toMatch(/\d/);
    // Each row's text has an own source whose byline prints this author.
    for (const id of s.ids) {
      const claim = claims.get(id)!;
      expect(
        sources.some(
          (src) =>
            src.documentId === claim.subject &&
            src.authors.map(authorKey).includes(authorKey(s.name)),
        ),
        `${s.name} · ${id}`,
      ).toBe(true);
    }
  }
  // Moravec's texts are listed under his byline.
  const moravec = page.locator('.stances-author', {
    has: page.getByRole('heading', { name: 'Hans Moravec', exact: true }),
  });
  await expect(moravec.locator('[data-claim-id]').first()).toBeVisible();
  // A row opens its record.
  const row = moravec.locator('[data-claim-id]').first();
  const id = (await row.getAttribute('data-claim-id'))!;
  await row.click();
  await expect(page).toHaveURL(new RegExp(`inspect=${id}$`));
  await expect(page.locator('#inspector')).toBeVisible();
});

test('390 px: both views fit without sideways scrolling', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(path);
  expect(await fitsViewport(page)).toBe(true);
  await page.getByRole('button', { name: 'By author' }).click();
  await expect(page.locator('.stances-author').first()).toBeVisible();
  expect(await fitsViewport(page)).toBe(true);
  await page.goto('/stances');
  expect(await fitsViewport(page)).toBe(true);
});

test('the CSV holds exactly the stances shown, in the page’s order', async ({
  page,
}) => {
  await page.goto(path);
  const href = await page
    .getByRole('link', { name: 'Download the stances shown (CSV)' })
    .getAttribute('href');
  expect(href).toBe('/stances/machine-succession.csv');
  const response = await page.request.get(href!);
  expect(response.status()).toBe(200);
  const [header, ...csv] = parseTimelineCsv(await response.text());
  const at = (name: string) => header.indexOf(name);
  const rows = await drawnRows(page);
  expect(csv.map((r) => r[at('record_id')])).toEqual(rows.map((r) => r.id));
  csv.forEach((r, i) => {
    expect(r[at('stance')]).toBe(rows[i].kind.split(' · ')[0]);
    expect(rows[i].date).toBe(r[at('dates_shown')]);
  });
});

test('linked from the tools, the hub, the collection and person pages', async ({
  page,
}) => {
  const errors = collectErrors(page);
  await page.goto('/ideas');
  await page.locator('.tool-link[data-tool="stances"]').click();
  await expect(page).toHaveURL(/\/stances$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Propositions by author',
  );
  await page
    .getByRole('link', { name: /^Machine succession, scale and acceleration/ })
    .click();
  await expect(page).toHaveURL(/\/stances\/machine-succession$/);

  await page.goto('/propositions/machine-succession');
  await page.getByRole('link', { name: 'Propositions by author →' }).click();
  await expect(page).toHaveURL(/\/stances\/machine-succession$/);

  // From a person page: the collection's author view, at the person.
  await page.goto('/person/hans-moravec');
  await page
    .getByRole('region', { name: 'Appears in' })
    .getByRole('link', { name: 'Their texts’ stances, by author →' })
    .first()
    .click();
  await expect(page).toHaveURL(/\/stances\//);
  await expect(page.getByRole('button', { name: 'By author' })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  await expect(page.locator(':focus')).toHaveText('Hans Moravec');
  expect(errors).toEqual([]);
});

test('the index and a collection page pass an accessibility scan', async ({
  page,
}) => {
  for (const address of ['/stances', '/stances/ai-bio-arguments']) {
    await page.goto(address);
    expect(
      (
        await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
          .analyze()
      ).violations,
    ).toEqual([]);
  }
});
