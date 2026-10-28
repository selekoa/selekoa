import AxeBuilder from '@axe-core/playwright';
import { readFileSync } from 'node:fs';
import { test, expect, stubAnalytics, type Page } from './fixtures';
import { datasetSchema } from '../../src/domain/schema';

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
const entity = (id: string) => data.entities.find((e) => e.id === id)!;
const claim = data.claims.find((c) => c.id === 'dario-anthropic-2021')!;

/** One pre-rendered page of each record type, with text it must carry. */
const samples = [
  {
    path: '/person/jan-leike',
    title: 'Jan Leike · Selekoa',
    heading: 'Jan Leike',
    text: entity('jan-leike').description,
  },
  {
    path: '/dossier/anthropic',
    title: 'Anthropic: institutional dossier · Selekoa',
    heading: 'Explore the documentary record',
    text: 'The documented history of Anthropic: chronology, people, research, capital and compute, and governance.',
  },
  {
    path: '/document/rsp-v2-0',
    title: entity('rsp-v2-0').name + ' · Selekoa',
    heading: entity('rsp-v2-0').name,
    text: entity('rsp-v2-0').description,
  },
  {
    path: '/claim/' + claim.id,
    title: 'Claim: ' + claim.statement.replace(/\.$/, '') + ' · Selekoa',
    heading: 'Explore the documentary record',
    text: claim.statement,
  },
];

const flat = (text: string) => text.replace(/\s+/g, ' ').trim();

function collectErrors(page: Page) {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  return errors;
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

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  for (const sample of samples)
    test(`${sample.path} carries its text, title and canonical address`, async ({
      page,
    }) => {
      const response = await page.goto(sample.path);
      expect(response?.status()).toBe(200);
      await expect(page).toHaveTitle(sample.title);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        'href',
        new RegExp(sample.path.replaceAll('/', '\\/') + '$'),
      );
      await expect(page.locator('h1').first()).toHaveText(sample.heading);
      expect(flat(await page.locator('#root').innerText())).toContain(
        flat(sample.text),
      );
      // Navigation is made of real links to paths.
      await expect(
        page.getByRole('navigation', { name: 'Primary' }).getByRole('link', {
          name: 'Governance',
        }),
      ).toHaveAttribute('href', '/governance');
      await expect(page.locator('a[href^="#/"]')).toHaveCount(0);
    });

  test('a claim page shows its evidence passage, source and review state', async ({
    page,
  }) => {
    await page.goto('/claim/' + claim.id);
    const inspector = page.locator('#inspector');
    await expect(inspector).toContainText(claim.statement);
    await expect(inspector).toContainText(claim.qualification);
    await expect(inspector).toContainText('Not reviewed by an editor');
    for (const id of claim.evidenceIds) {
      const evidence = data.evidence.find((e) => e.id === id)!;
      const source = data.sources.find((s) => s.id === evidence.sourceId)!;
      await expect(inspector).toContainText(source.title);
      await expect(
        inspector.locator(`a[href="${source.evidenceUrl}"]`).first(),
      ).toBeAttached();
    }
  });

  test('every link on a sample of pages leads to a built page or file', async ({
    page,
    request,
  }) => {
    const checked = new Set<string>();
    for (const path of ['/', '/person/jan-leike', '/about', '/governance']) {
      await page.goto(path);
      const hrefs = await page
        .locator('a[href]')
        .evaluateAll((links) =>
          links.map((a) => (a as HTMLAnchorElement).href),
        );
      for (const href of hrefs) {
        const url = new URL(href);
        if (url.origin !== new URL(page.url()).origin) continue;
        const target = url.pathname;
        if (checked.has(target)) continue;
        checked.add(target);
        const response = await request.get(target);
        expect(response.status(), target).toBe(200);
        const type = response.headers()['content-type'] ?? '';
        // The preview server answers an unknown path with the start page;
        // a built page names its own path.
        if (type.startsWith('text/html'))
          expect(await response.text(), target).toContain(
            `data-path="${target}"`,
          );
      }
    }
    expect(checked.size).toBeGreaterThan(20);
  });
});

// Axe runs in the page, so these keep scripts on and block the application's
// own code: the page is the built HTML alone.
for (const scheme of ['light', 'dark'] as const)
  test(`built pages without the application pass axe, ${scheme}`, async ({
    page,
  }) => {
    await page.route(/\/assets\/.*\.js$/, (route) => route.abort());
    await page.emulateMedia({ colorScheme: scheme });
    for (const sample of samples) {
      // The application never runs here, so goto waits for the page alone.
      await page.goto(sample.path, { waitUntil: 'load' });
      await expect(page.locator('h1').first()).toHaveText(sample.heading);
      await noViolations(page);
    }
  });

test('the browser takes over the built HTML in place, with no errors', async ({
  page,
}) => {
  const errors = collectErrors(page);
  for (const sample of samples) {
    await page.goto(sample.path, { waitUntil: 'commit' });
    // The built heading, marked before the application runs.
    await page.waitForSelector('h1');
    await page.evaluate(() => {
      (window as unknown as { built: Element }).built =
        document.querySelector('h1')!;
    });
    await page.waitForLoadState('networkidle');
    // Hydration keeps the built element; a fresh render would replace it.
    expect(
      await page.evaluate(
        () =>
          document.querySelector('h1') ===
          (window as unknown as { built: Element }).built,
      ),
      sample.path,
    ).toBe(true);
    // The page is interactive: the theme toggle answers.
    await page.getByRole('button', { name: 'Dark mode' }).click();
    await expect(page.locator('html')).toHaveAttribute(
      'data-selekoa-theme',
      'dark',
    );
    await page.getByRole('button', { name: 'Dark mode' }).click();
  }
  expect(errors).toEqual([]);
});

test('a button pressed before the page runs takes effect once it does', async ({
  page,
}) => {
  // Hold back the records, so the page is still the built HTML.
  let release = () => {};
  const held = new Promise<void>((resolve) => (release = resolve));
  await page.route(/\/assets\/records-.*\.js$/, async (route) => {
    await held;
    await route.continue();
  });
  await page.goto('/explore', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('#entity-search')).toHaveAttribute('readonly', '');
  await page
    .getByRole('navigation', { name: 'Explore the dataset' })
    .getByRole('button', { name: 'OpenAI', exact: true })
    .click();
  release();
  await expect(page.locator('.map-withheld')).toHaveCount(0);
  await expect(page.locator('#entity-search')).not.toHaveAttribute('readonly');
});

test('a built page opened with a query applies it after taking over', async ({
  page,
}) => {
  const errors = collectErrors(page);
  const inspect = 'jan-leike-openai-superalignment-2023';
  await page.goto('/person/jan-leike?inspect=' + inspect);
  await expect(
    page.getByRole('complementary', { name: 'Evidence inspector' }),
  ).toContainText(data.claims.find((c) => c.id === inspect)!.statement);
  await expect(page).toHaveURL(/\/person\/jan-leike\?inspect=/);
  // The earlier query form still opens the search, and the terms move to the
  // fragment so that they never reach the host.
  await page.goto('/search?q=ASL-3');
  await expect(page.getByRole('searchbox').first()).toHaveValue('ASL-3');
  await expect(page).toHaveURL(/\/search#q=ASL-3$/);
  expect(errors).toEqual([]);
});

test('navigation inside the site changes the path and the title', async ({
  page,
}) => {
  await page.goto('/');
  await page
    .getByRole('navigation', { name: 'Primary' })
    .getByRole('link', { name: 'Institutions & people' })
    .click();
  await expect(page).toHaveURL(/\/institutions$/);
  await expect(page).toHaveTitle('Institutions & people · Selekoa');
  await page
    .locator('.people-az')
    .getByRole('link', { name: 'Jan Leike', exact: true })
    .click();
  await expect(page).toHaveURL(/\/person\/jan-leike$/);
  await expect(page).toHaveTitle('Jan Leike · Selekoa');
  await page.goBack();
  await expect(page).toHaveURL(/\/institutions$/);
});

test.describe('earlier hash addresses', () => {
  const forms: [string, string, string][] = [
    ['/#/', '/', 'A documentary history of machine intelligence.'],
    ['/#explorer', '/explore', 'Explore the documentary record'],
    [
      '/#/explore?q=Microsoft',
      '/explore#q=Microsoft',
      'Explore the documentary record',
    ],
    ['/#/governance', '/governance', 'Governance'],
    ['/#/about', '/about', 'About Selekoa and its method'],
    ['/#/search?q=ASL-3', '/search#q=ASL-3', 'Search the records'],
    ['/#/person/jan-leike', '/person/jan-leike', 'Jan Leike'],
    ['/#/document/rsp-v2-0', '/document/rsp-v2-0', entity('rsp-v2-0').name],
    [
      '/#/dossier/anthropic',
      '/dossier/anthropic',
      'Explore the documentary record',
    ],
    [
      '/#/claim/' + claim.id,
      '/claim/' + claim.id,
      'Explore the documentary record',
    ],
    [
      '/#/documents/frontier-safety-frameworks',
      '/documents/frontier-safety-frameworks',
      'Frontier safety frameworks',
    ],
    [
      '/#/control/openai',
      '/control/openai',
      'OpenAI’s control structure, 2015–2026',
    ],
    [
      '/#/commitments/external-commitments',
      '/commitments/external-commitments',
      'External commitments and obligations',
    ],
    [
      '/#/propositions/superintelligence',
      '/propositions/superintelligence',
      'Propositions about superintelligence, 1863–2022',
    ],
    [
      '/#/question/frameworks-to-obligations',
      '/question/frameworks-to-obligations',
      'Frameworks, commitments and legal obligations, 2023–2026',
    ],
    [
      '/#/reading/anthropic-formation',
      '/question/anthropic-formation',
      'Anthropic: Founding and early leadership',
    ],
  ];

  for (const [hash, path, heading] of forms)
    test(`${hash} redirects to ${path}`, async ({ page }) => {
      const errors = collectErrors(page);
      await page.goto(hash);
      await expect(page.locator('h1').first()).toHaveText(heading);
      const url = new URL(page.url());
      // Only a search keeps a fragment: its terms, which never reach the host.
      if (!path.includes('#')) expect(url.hash).toBe('');
      // The page may add its own reading position to the query.
      expect(url.pathname + url.search + url.hash).toContain(path);
      expect(errors).toEqual([]);
    });

  test('a hash address followed from an open page moves to its path', async ({
    page,
  }) => {
    await page.goto('/');
    await page.evaluate(() => {
      window.location.hash = '#/person/jan-leike';
    });
    await expect(page.locator('h1').first()).toHaveText('Jan Leike');
    await expect(page).toHaveURL(/:4173\/person\/jan-leike$/);
  });
});

for (const width of [1440, 390])
  for (const theme of ['light', 'dark'] as const)
    test(`pre-rendered record pages ${width}px ${theme}: axe and layout`, async ({
      browser,
    }) => {
      const context = await browser.newContext({
        viewport: { width, height: 1000 },
        colorScheme: theme,
        reducedMotion: 'reduce',
      });
      await stubAnalytics(context);
      const page = await context.newPage();
      const errors = collectErrors(page);
      for (const sample of samples) {
        await page.goto(sample.path);
        await expect(page.locator('html')).toHaveAttribute(
          'data-selekoa-theme',
          theme,
        );
        await expect(page.locator('h1').first()).toHaveText(sample.heading);
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= window.innerWidth,
          ),
          sample.path,
        ).toBe(true);
        await noViolations(page);
      }
      expect(errors).toEqual([]);
      await context.close();
    });
