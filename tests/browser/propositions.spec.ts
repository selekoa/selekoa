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

test('propositions page names earliest located texts, keeps dates apart and labels registers', async ({
  page,
}) => {
  const errors = collectErrors(page);
  await page.goto('/ideas');
  await page.getByRole('link', { name: /^Read the propositions/ }).click();
  await expect(page).toHaveURL(/\/propositions\/superintelligence$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Propositions about superintelligence, 1863–2022',
  );
  // The scope is stated once, with the known gaps.
  const search = page.locator('.prop-search');
  await expect(search).toContainText(
    'It is not a claim that no earlier text exists',
  );
  await expect(search).toContainText('The Extropians list before 1996-07-25');
  await expect(search).toContainText('HathiTrust');
  // A1: the headline gives the work's date and the earlier claimed date.
  const a1 = page.locator('#proposition-a1');
  const headlines = a1.locator('.prop-headlines');
  await expect(headlines).toContainText(
    'Speculations Concerning the First Ultraintelligent Machine · 1965 · claimed 1962-10',
  );
  await expect(headlines).toContainText('“intelligence explosion”');
  // A later copy's date is shown beside the work's own date.
  await expect(
    a1.locator('.prop-rows [data-claim-id="ts-a1-more-1998-contests"]'),
  ).toContainText('1998 · wording attested 2000-08-17');
  // The headline that the combined search replaced stays on record.
  await expect(a1.locator('.prop-corrections')).toContainText(
    'Clemmensen’s Extropians message of 1996-08-30',
  );
  // Registers: fiction and satire are labelled; nonfiction is not.
  const b6 = page.locator('#proposition-b6');
  await expect(
    b6.locator('.prop-rows [data-claim-id="ts-b6-erewhon-1872"]'),
  ).toContainText('Articulates · Fiction');
  await expect(
    b6.locator('.prop-rows [data-claim-id="ts-b6-butler-1863"]'),
  ).toContainText('Satirical');
  // Context records sit behind a disclosure and name what is missing.
  const a3 = page.locator('#proposition-a3');
  await a3.locator('details.prop-context summary').click();
  await expect(
    a3.locator('.prop-rows [data-claim-id="ts-a3-good-1965-context"]'),
  ).toContainText('Missing:');
  // Keyboard: a headline opens the record in the inspector.
  await headlines
    .getByRole('button', { name: /^Inspect: Good’s chapter argues/ })
    .first()
    .focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/inspect=ts-a1-good-1965/);
  await expect(page.locator('#inspector')).toContainText('Claimed date');
  await expect(page.locator('#inspector')).toContainText('Earliest located');
  // A document page lists its propositions and links back to this page.
  await page.goto('/document/erewhon-1872');
  await expect(page.locator('[data-relation="articulates"]')).toContainText(
    'Control or purpose specification',
  );
  await page
    .getByRole('link', {
      name: 'Fast or hard takeoff: propositions page →',
    })
    .click();
  await expect(page).toHaveURL(/\/propositions\/superintelligence$/);
  await expect(page.locator('#proposition-a4-heading')).toBeFocused();
  // An unknown collection is not routed.
  await page.goto('/propositions/unknown');
  await expect(
    page.getByText('This link does not match any record'),
  ).toBeVisible();
  expect(errors).toEqual([]);
});

for (const width of [1440, 390])
  for (const theme of ['light', 'dark'] as const)
    test(`propositions page ${width}px ${theme}: layout and accessibility`, async ({
      page,
    }) => {
      const errors = collectErrors(page);
      await page.setViewportSize({ width, height: 1000 });
      await page.goto('/propositions/superintelligence');
      await setTheme(page, theme);
      for (const summary of await page
        .locator('.prop-page details summary')
        .all())
        await summary.click();
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

test('Yudkowsky argument page pairs earlier views with later texts and shows context-only passages with their context', async ({
  page,
}) => {
  const errors = collectErrors(page);
  await page.goto('/ideas');
  await page
    .getByRole('link', { name: /^Read his arguments, claim by claim/ })
    .click();
  await expect(page).toHaveURL(/\/propositions\/yudkowsky-arguments$/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Eliezer Yudkowsky’s arguments on common claims about AI',
  );
  // The scope is stated once; engagement follows the message-level rule.
  const search = page.locator('.prop-search');
  await expect(search).toContainText(
    'passages from Yudkowsky’s own writing only',
  );
  await search.getByText('Methods').click();
  await expect(search).toContainText('message-level rule');
  // Y02: an earlier view is listed with his later texts that contest it.
  const y02 = page.locator('#proposition-y02');
  await expect(y02.locator('.prop-headlines')).toContainText(
    'Earliest located text that contests it',
  );
  const earlier = y02.locator(
    '.prop-rows li:has([data-claim-id="yk-y02-extropians-1996-11-22-yudkowsky-3178-a"])',
  );
  await expect(earlier.locator('.prop-later')).toContainText(
    'That Tiny Note of Discord',
  );
  await expect(
    y02.locator(
      '.prop-row[data-claim-id="yk-y02-extropians-1999-08-01-yudkowsky-1386-c"]',
    ),
  ).toContainText(
    'Contests · Earliest located · States the contrary · Looking back',
  );
  // The inspector shows a context-only passage only with its context.
  await earlier
    .locator('[data-claim-id="yk-y02-extropians-1996-11-22-yudkowsky-3178-a"]')
    .click();
  const inspector = page.locator('#inspector');
  await expect(inspector).toContainText('shown only with its context');
  const context = inspector.locator('.context-only');
  await expect(context).toContainText('Read it with this context');
  await context
    .getByRole('button', { name: /That Tiny Note of Discord/ })
    .click();
  await expect(page).toHaveURL(
    /inspect=yk-y02-lw-2008-that-tiny-note-of-discord-c/,
  );
  await expect(inspector).toContainText('Engagement');
  await expect(inspector).toContainText('Looking back');
  expect(errors).toEqual([]);
});

for (const [width, theme] of [
  [1440, 'light'],
  [390, 'dark'],
] as const)
  test(`Yudkowsky argument page ${width}px ${theme}: layout and accessibility`, async ({
    page,
  }) => {
    const errors = collectErrors(page);
    await page.setViewportSize({ width, height: 1000 });
    await page.goto(
      '/propositions/yudkowsky-arguments?inspect=yk-y22-staring-into-the-singularity-a',
    );
    await setTheme(page, theme);
    await expect(
      page.locator('#inspector .context-only').first(),
    ).toBeVisible();
    for (const summary of await page
      .locator('.prop-page details summary')
      .all())
      await summary.click();
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

test('economics page names tier-1 and tier-2 earliest texts and shows conditions, estimates and model scenarios', async ({
  page,
}) => {
  const errors = collectErrors(page);
  await page.goto('/ideas');
  await page
    .getByRole('link', { name: /^Read the economics propositions/ })
    .click();
  await expect(page).toHaveURL(
    /\/propositions\/economics-of-machine-intelligence$/,
  );
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Economics of machine intelligence',
  );
  // The scope is stated once, with the known gaps and the Finnish strand.
  const search = page.locator('.prop-search');
  await expect(search).toContainText(
    'within tier 1 unless the page says tier 2',
  );
  await expect(search).toContainText('The Shape of Automation (1965)');
  await search.getByText('Venues and years searched').click();
  await expect(search).toContainText('Kansantaloudellinen aikakauskirja');
  // G07: the tier-1 and tier-2 earliest texts are named separately.
  const g07 = page.locator('#proposition-g07');
  const headlines = g07.locator('.prop-headlines');
  await expect(headlines).toContainText('Earliest located, tier 1');
  await expect(headlines).toContainText(
    'Economic Growth Given Machine Intelligence · 2000-08-19 · wording attested 2000-08-19 · claimed 1998',
  );
  await expect(headlines).toContainText('Earliest located, tier 2');
  await expect(headlines).toContainText(
    'If Uploads Come First: The Crack of a Future Dawn · 1994-03-08 · wording attested 1998-02-20',
  );
  await expect(
    g07.locator(
      '.prop-row[data-claim-id="ec-g07-hanson-1994-if-uploads-come-first-a"]',
    ),
  ).toContainText('Articulates · Earliest located in tier 2 · Tier 2');
  // G06: no tier-1 text meets the criterion; the tier-2 earliest is shown.
  await expect(page.locator('#proposition-g06 .prop-headlines')).toContainText(
    'No located tier-1 text meets the criterion.',
  );
  // Model results carry their conditions; estimates are shown as worded.
  await expect(
    page.locator(
      '#proposition-g01 .prop-row[data-claim-id="ec-g01-hanson-economic-growth-given-machine-intelligence-a"]',
    ),
  ).toContainText('Conditions: Exogenous technology growth');
  await expect(
    page.locator(
      '#proposition-g09 .prop-row[data-claim-id="ec-g09-davidson-2021-explosive-economic-growth-a"]',
    ),
  ).toContainText('Estimate by Tom Davidson');
  // M05: the earliest located text is a model scenario, dated by its revision.
  const m05 = page.locator('#proposition-m05');
  await expect(m05.locator('.prop-headlines')).toContainText(
    '2016-05 · wording attested 2017-06',
  );
  const scenario = m05.locator(
    '.prop-row[data-claim-id="ec-m05-acemoglu-restrepo-2016-race-between-machine-and-man-a"]',
  );
  await expect(scenario).toContainText(
    'Articulates · Earliest located · Tier 1 · Model scenario',
  );
  await expect(m05.locator('.prop-corrections')).toContainText(
    'Nordhaus (2015), headlined as earliest located.',
  );
  // The inspector shows the tier and the passage only with its context.
  await scenario.click();
  const inspector = page.locator('#inspector');
  await expect(inspector).toContainText('Tier 1. NBER working paper');
  await expect(inspector).toContainText('shown only with its context');
  await expect(inspector).toContainText('Conditions');
  expect(errors).toEqual([]);
});

for (const [width, theme] of [
  [1440, 'dark'],
  [390, 'light'],
] as const)
  test(`economics page ${width}px ${theme}: layout and accessibility`, async ({
    page,
  }) => {
    const errors = collectErrors(page);
    await page.setViewportSize({ width, height: 1000 });
    await page.goto(
      '/propositions/economics-of-machine-intelligence?inspect=ec-g09-clancy-besiroglu-2023-great-inflection-a',
    );
    await setTheme(page, theme);
    await expect(page.locator('#inspector')).toContainText(
      'Estimate by Matt Clancy',
    );
    for (const summary of await page
      .locator('.prop-page details summary')
      .all())
      await summary.click();
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
