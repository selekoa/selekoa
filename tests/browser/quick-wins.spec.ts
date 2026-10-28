import { test, expect } from './fixtures';

test('phone header shows every primary navigation item without sideways scrolling', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const nav = page.getByRole('navigation', { name: 'Primary' });
  const items = nav.getByRole('link');
  await expect(items).toHaveCount(5);
  for (const item of await items.all()) {
    const box = (await item.boundingBox())!;
    expect(box.x).toBeGreaterThanOrEqual(0);
    expect(box.x + box.width).toBeLessThanOrEqual(390);
  }
  expect(
    await nav.evaluate((element) => element.scrollWidth <= element.clientWidth),
  ).toBe(true);
});

test('person page links to the collections that hold the person’s texts', async ({
  page,
}) => {
  await page.goto('/person/eliezer-yudkowsky');
  const appears = page.getByRole('region', { name: 'Appears in' });
  await expect(appears).toContainText('records on texts by this author');
  await appears
    .getByRole('link', { name: /Yudkowsky’s arguments on common claims/ })
    .click();
  await expect(page).toHaveURL(/\/propositions\/yudkowsky-arguments$/);
  await expect(page.locator('h1')).toContainText(
    'Eliezer Yudkowsky’s arguments',
  );
});

test('document page without authorship or date claims says what the source record gives', async ({
  page,
}) => {
  // Held from the author-person admission of 2026-10-27: credited only
  // under a username on the author's blog.
  await page.goto('/document/christiano-2018-takeoff-speeds');
  const facts = page.locator('.record-facts');
  await expect(facts).toContainText(
    'No authorship claim recorded yet. The source record lists Paul Christiano.',
  );
  await expect(facts).toContainText('No date claim recorded yet.');
  await expect(facts).not.toContainText('no authorship record');
  await expect(facts).not.toContainText('no dated record');
});

test('a proposition named in the claim panel opens its place on the collection page', async ({
  page,
}) => {
  await page.goto('/claim/ts-a4-christiano-2018-takeoff-contests');
  const panel = page.getByRole('complementary', { name: 'Evidence inspector' });
  await panel
    .getByRole('link', { name: 'Fast or hard takeoff', exact: true })
    .first()
    .click();
  await expect(page).toHaveURL(/\/propositions\/superintelligence/);
  const heading = page.locator(':focus');
  await expect(heading).toHaveAttribute('id', /^proposition-.*-heading$/);
  await expect(heading).toBeInViewport();
});

test('search explains prefix matching, offers whole words and names collections and publishers', async ({
  page,
}) => {
  await page.goto('/search#q=critic');
  const status = page.locator('#search-status');
  await expect(page.locator('#search-help')).toContainText(
    'matches the beginning of a word',
  );
  const before = Number((await status.textContent())!.match(/\d+/)![0]);
  await page.getByLabel('Whole words only').check();
  await expect(page.locator('#search-help')).toContainText('whole words only');
  await expect(status).not.toContainText(`${before} records`);
  await expect(
    page.locator('.search-hit mark').filter({ hasText: /criticality/i }),
  ).toHaveCount(0);

  await page.goto('/search#q=Frontier%20Governance%20Framework');
  const claims = page.getByRole('region', { name: /^Claims/ });
  await expect(
    claims.locator('.search-hit-meta').filter({ hasText: /^Microsoft · / }),
  ).not.toHaveCount(0);
  await expect(
    claims
      .locator('.search-hit-collection')
      .filter({ hasText: 'In Frontier safety frameworks' }),
  ).not.toHaveCount(0);
});

test('search filters are folded on a phone and open on a wide screen', async ({
  page,
}) => {
  await page.goto('/search#q=ASL-3');
  await expect(page.locator('.search-filter-panel')).toHaveAttribute(
    'open',
    '',
  );
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/search#q=ASL-3');
  await page.reload();
  const panel = page.locator('.search-filter-panel');
  await expect(panel).not.toHaveAttribute('open', '');
  await expect(page.getByLabel('Organisation', { exact: true })).toBeHidden();
  await panel.locator('summary').click();
  await expect(page.getByLabel('Organisation', { exact: true })).toBeVisible();
});

test('each "Inspect claim & evidence" control names its claim', async ({
  page,
}) => {
  await page.goto('/documents/frontier-safety-frameworks');
  const buttons = page.getByRole('button', {
    name: /^Inspect claim & evidence/,
  });
  await expect(buttons.first()).toBeVisible();
  const names = await buttons.evaluateAll((all) =>
    all.slice(0, 40).map((b) => b.getAttribute('aria-label') ?? ''),
  );
  for (const name of names)
    expect(name.length).toBeGreaterThan('Inspect claim & evidence: '.length);
  expect(new Set(names).size).toBeGreaterThan(names.length / 2);
});

test('provisions grid keeps its first column in view, cues scrolling and stays open', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/documents/frontier-safety-frameworks');
  const family = page.locator('#family-anthropic-rsp');
  const grid = family.locator('details.doc-alignment');
  await grid.locator('summary').click();
  await expect(grid.locator('.doc-alignment-cue')).toContainText(
    'Scroll sideways',
  );
  const scroller = grid.getByRole('region', {
    name: /provisions across editions/,
  });
  const header = grid.locator('tbody th').first();
  const before = (await header.boundingBox())!.x;
  await scroller.evaluate((element) => (element.scrollLeft = 400));
  await expect
    .poll(async () => (await header.boundingBox())!.x)
    .toBeCloseTo(before, 0);

  await page
    .getByRole('navigation', { name: 'Primary' })
    .getByRole('link', { name: 'Search' })
    .click();
  await page
    .getByRole('navigation', { name: 'Primary' })
    .getByRole('link', { name: 'Governance' })
    .click();
  await page.getByRole('link', { name: /Read the document histories/ }).click();
  await expect(
    page.locator('#family-anthropic-rsp details.doc-alignment'),
  ).toHaveAttribute('open', '');
});

test('a source excerpt in the claim panel is closed by a quotation mark', async ({
  page,
}) => {
  await page.goto('/claim/prov-preparedness-v2-high-deployment-restriction');
  const excerpt = page
    .getByRole('complementary', { name: 'Evidence inspector' })
    .locator('blockquote')
    .first();
  await expect(excerpt).toHaveText(/^“[^]*”$/);
});

test('provisions grid attaches each wording to the editions it comes from', async ({
  page,
}) => {
  await page.goto('/documents/frontier-safety-frameworks');
  const grid = page.locator('#family-anthropic-rsp details.doc-alignment');
  await grid.locator('summary').click();
  const row = grid
    .locator('tbody tr')
    .filter({ hasText: 'Policy updates approved by board' });
  const header = row.locator('th');
  await expect(header).toContainText(
    'v1.0: Policy updates approved by board after LTBT consultation',
  );
  await expect(header).toContainText(
    'v2.0, v2.1: Policy changes proposed by CEO and RSO, approved by Board',
  );
});

test('collection notices drop the version number and the claim panel avoids “Seed”', async ({
  page,
}) => {
  await page.goto('/documents/frontier-safety-frameworks');
  await expect(page.locator('.doc-status').first()).toHaveText(
    /^A machine selected and arranged these records\. /,
  );
  await page.goto('/claim/prov-preparedness-v2-high-deployment-restriction');
  const panel = page.getByRole('complementary', { name: 'Evidence inspector' });
  await panel.getByText('Status and meaning').click();
  await expect(panel).toContainText('Not reviewed by an editor');
  await expect(panel).not.toContainText('Seed');
});

test('start page says what is not yet covered', async ({ page }) => {
  await page.goto('/');
  await expect(
    page.locator('.landing-gaps').getByRole('heading', { level: 2 }),
  ).toHaveText('Not yet covered');
  const gaps = page.locator('.landing-gaps');
  await expect(gaps).toContainText('Coverage is selective.');
  await gaps.getByRole('link', { name: 'What is not covered →' }).click();
  await expect(page).toHaveURL(/\/about$/);
  const full = page.locator('#about-not-covered');
  await expect(full).toBeFocused();
  await expect(full.locator('+ p')).toContainText('Economics');
});

test('the featured question opens the OpenAI control structure', async ({
  page,
}) => {
  await page.goto('/');
  const featured = page.getByRole('link', {
    name: 'Who controlled OpenAI, and when? →',
  });
  await expect(featured).toBeVisible();
  // The Governance card does not repeat the featured question.
  await expect(
    page.locator('.hub-examples').getByText(/controlled OpenAI/),
  ).toHaveCount(0);
  await featured.click();
  await expect(
    page.getByRole('heading', {
      level: 1,
      name: 'OpenAI’s control structure, 2015–2026',
    }),
  ).toBeVisible();
  // The header tagline returns away from the start page.
  await expect(
    page
      .locator('.site-header')
      .getByText('A documentary history of machine intelligence.'),
  ).toBeVisible();
});
