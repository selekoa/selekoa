import { expect, MAP_FIRST_DRAW_TIMEOUT, test } from './fixtures';

test('personnel search, distinct roles and source uncertainty are inspectable', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  await page.goto('/explore');
  await page
    .getByRole('navigation', { name: 'Explore the dataset' })
    .getByRole('button', { name: /^People/ })
    .click();
  await page.getByRole('button', { name: 'Claims', exact: true }).click();
  await expect(
    page
      .getByLabel('Claims list')
      .locator('[data-claim-id="dario-cofounded-anthropic-2021"]'),
  ).toBeVisible();
  await page.getByRole('main').getByRole('searchbox').fill('Dario Amodei');
  // The risk-debate admission (2026-10-31, rd-) adds a document whose name
  // also matches, so Enter no longer selects the only match; choose the
  // person from the results.
  await page
    .locator('#search-results')
    .getByRole('button', { name: 'Dario Amodei Person', exact: true })
    .click();
  const list = page.getByLabel('Claims list');
  // Lab genealogy records (2026-10-17, lg-) and the key papers admission's
  // authorship records (2026-10-31, kp-) are left out of this count.
  await expect(
    list.locator(
      '[data-claim-id]:not([data-claim-id^="lg-"]):not([data-claim-id^="kp-"])',
    ),
  ).toHaveCount(5);
  await expect(
    list.locator('[data-claim-id="lineage-dario-amodei-preferences"]'),
  ).toContainText('authored');
  await list
    .locator('[data-claim-id="dario-openai-departure-announced-2020"]')
    .click();
  const evidence = page.getByRole('complementary', {
    name: 'Evidence inspector',
  });
  await expect(evidence).toContainText('2020-12-29 · event');
  await expect(evidence).toContainText('Machine-checked');
  await expect(evidence).toContainText('Not reviewed by an editor');
  await page.getByRole('main').getByRole('searchbox').fill('Christopher Olah');
  await page.getByRole('main').getByRole('searchbox').press('Enter');
  await list
    .locator('[data-claim-id="olah-openai-interpretability-prior"]')
    .click();
  await expect(evidence).toContainText('Date unknown');
  await expect(evidence).toContainText('Publication date unknown');
  await expect(evidence.locator('a.source-title')).toHaveAttribute(
    'href',
    'https://colah.github.io/about.html',
  );
  await page.screenshot({
    path: '.local/personnel-evidence.png',
    fullPage: true,
  });
  await page.getByRole('main').getByRole('searchbox').fill('Andrew Ng');
  await page.getByRole('main').getByRole('searchbox').press('Enter');
  await page.getByRole('button', { name: 'Timeline', exact: true }).click();
  await expect(page.getByLabel('Chronological claims')).toContainText(
    '2011 → 2012',
  );
  await page.getByLabel('Records through year').selectOption('2010');
  await expect(page.getByLabel('Chronological claims')).toContainText(
    'No claims match',
  );
  await page.getByLabel('Records through year').selectOption('2013');
  await expect(
    page.getByLabel('Chronological claims').getByRole('button'),
  ).toHaveCount(1);
  expect(errors).toEqual([]);
});

test('institutional acquisition and combination remain distinct direct claims', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  await page.goto('/explore');
  await page
    .getByRole('navigation', { name: 'Explore the dataset' })
    .getByRole('button', { name: /^Institutions/ })
    .click();
  await page.getByRole('button', { name: 'Claims', exact: true }).click();
  const list = page.getByLabel('Claims list');
  await list.locator('[data-claim-id="google-acquired-deepmind-2014"]').click();
  const evidence = page.getByRole('complementary', {
    name: 'Evidence inspector',
  });
  await expect(evidence).toContainText('2014 · event');
  await expect(evidence.locator('a.source-title')).toHaveAttribute(
    'href',
    'https://drops.dagstuhl.de/entities/document/10.4230/OASIcs.ICCSW.2014.1',
  );
  await page.getByRole('main').getByRole('searchbox').fill('Google Brain');
  await page.getByRole('main').getByRole('searchbox').press('Enter');
  await list
    .locator('[data-claim-id="brain-unit-google-research-2017"]')
    .click();
  await expect(evidence).toContainText('2017-09-13 · snapshot');
  await page.getByRole('button', { name: 'Map', exact: true }).click();
  await expect(page.getByTestId('network').locator('canvas')).not.toHaveCount(
    0,
    { timeout: MAP_FIRST_DRAW_TIMEOUT },
  );
  await page.screenshot({ path: '.local/brain-history.png', fullPage: true });
  expect(errors).toEqual([]);
});

test('an open-ended role reads from its start and the latest document that states it', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  const id = 'pp-ex-nadella-microsoft-ceo-2014';
  const label =
    'from 2014-02-04 (stated in Microsoft Corporation 2026 Proxy Statement (Schedule 14A, definitive), 2026-10-21)';
  await page.goto('/person/satya-nadella');
  const path = page.locator('.person-path');
  const row = path.locator('.person-path-row').filter({
    has: page.locator(`a[href$="/claim/${id}"]`),
  });
  await expect(row.locator('.person-path-date')).toContainText(label);
  await expect(path).not.toContainText('End unknown');
  await row.locator(`a[href$="/claim/${id}"]`).click();
  await expect(
    page.getByRole('complementary', { name: 'Evidence inspector' }),
  ).toContainText(label);
  await page.goto('/claim/' + id);
  await expect(page.getByRole('main')).toContainText('Claim · ' + label);
  expect(errors).toEqual([]);
});
