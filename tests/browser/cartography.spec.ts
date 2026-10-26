import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readFileSync } from 'node:fs';
import { datasetSchema } from '../../src/domain/schema';
const repository = {
  data: datasetSchema.parse(
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
  ),
};
import { queryDataset } from '../../src/domain/query';
import { compactClaims } from '../../src/ui/mapGrammar';
import { clickMapClaim } from './map-actions';

const panel = (page: import('@playwright/test').Page) =>
  page.getByRole('complementary', { name: 'Evidence inspector' });
test('no whole-dataset map; the full Anthropic focus retains topology, labels, orientation and theme-independent grammar', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(m.text());
  });
  await page.goto('/#/explore');
  // The whole dataset is never drawn; the list stands in for the map.
  await expect(page.locator('.map-withheld')).toContainText(
    'The map is drawn for a search, a topic or an institution.',
  );
  await expect(page.getByTestId('network')).toHaveCount(0);
  await expect(page.getByLabel('Claims list')).toBeVisible();
  await page
    .getByRole('navigation', { name: 'Explore the dataset' })
    .getByRole('button', { name: 'Anthropic', exact: true })
    .click();
  await expect(page.locator('[data-label-for="anthropic"]')).toBeVisible();
  const positions = await page
    .locator('.map-node')
    .evaluateAll((nodes) => nodes.map((n) => n.getAttribute('transform')));
  await page.getByRole('button', { name: 'Dark mode', exact: true }).click();
  expect(
    await page
      .locator('.map-node')
      .evaluateAll((nodes) => nodes.map((n) => n.getAttribute('transform'))),
  ).toEqual(positions);
  const expected = queryDataset(repository.data, {
    topic: 'all',
    throughYear: 2026,
    entityType: 'all',
    focusId: 'anthropic',
  });
  await expect(page.locator('.map-node')).toHaveCount(expected.entities.length);
  await expect(page.locator('.map-edge')).toHaveCount(
    compactClaims(expected.claims).length,
  );
  const rendered = (
    await page
      .locator('.map-edge')
      .evaluateAll((nodes) =>
        nodes.flatMap((n) => n.getAttribute('data-claim-ids')!.split(' ')),
      )
  ).sort();
  expect(rendered).toEqual(
    expected.claims
      .filter((c) => c.object.kind === 'entity')
      .map((c) => c.id)
      .sort(),
  );
  const labels = await page.locator('.map-node-label').count();
  expect(labels).toBeLessThan(expected.entities.length);
  await page.getByRole('button', { name: 'Zoom in', exact: true }).click();
  await expect(page.locator('[data-label-for="anthropic"]')).toBeVisible();
  await page.getByRole('button', { name: 'Reset map position' }).click();
  // Family patterns survive removal of all semantic colours.
  const strokes = await page
    .locator('.relation-legend svg > path:first-child')
    .evaluateAll((nodes) =>
      nodes.map((n) =>
        [
          n.getAttribute('stroke-width'),
          n.getAttribute('stroke-dasharray'),
        ].join('/'),
      ),
    );
  expect(new Set(strokes).size).toBe(5);
  expect(errors).toEqual([]);
});

test('OpenAI investment and cloud directions remain distinct and every January 2025 term opens its exact evidence', async ({
  page,
}) => {
  await page.goto('/#/explore');
  await page
    .getByRole('navigation', { name: 'Explore the dataset' })
    .getByRole('button', { name: 'OpenAI', exact: true })
    .click();
  await page
    .getByLabel('Record type', { exact: true })
    .selectOption('structural');
  const cloud = repository.data.claims.filter(
    (c) =>
      c.subject === 'openai' &&
      c.predicate === 'cloud_terms' &&
      c.time.kind === 'event' &&
      c.time.date.startsWith('2025-01'),
  );
  expect(cloud).toHaveLength(2);
  await clickMapClaim(page, cloud[0].id);
  const chooser = page.getByRole('region', {
    name: 'Choose an individual claim',
  });
  await expect(chooser).toBeFocused();
  for (const c of cloud) {
    const button = chooser.locator(`[data-map-claim-id="${c.id}"]`);
    await button.focus();
    await button.press('Enter');
    await expect(panel(page)).toBeFocused();
    await expect(page).toHaveURL(new RegExp(c.id));
    await expect(panel(page)).toContainText(c.statement);
    await panel(page)
      .getByRole('button', { name: 'Close ×', exact: true })
      .click();
    await expect(button).toBeFocused();
  }
  const capital = page.locator(
    '.map-edge[data-family="capital"][data-source="microsoft"][data-target="openai"]',
  );
  await expect(capital).not.toHaveCount(0);
  await expect(
    page.locator(
      '.map-edge[data-family="compute"][data-source="openai"][data-target="microsoft"]',
    ),
  ).not.toHaveCount(0);
  await expect(capital.first()).toHaveAttribute('data-stage', 'announced');
});

test('RSP succession and all parallel v3.0 claims are independently selectable', async ({
  page,
}) => {
  await page.goto('/#/explore');
  await page
    .getByRole('navigation', { name: 'Explore the dataset' })
    .getByRole('button', { name: /Governance/ })
    .click();
  await page.getByLabel('Framework family').selectOption('anthropic-rsp');
  await page.getByRole('button', { name: 'Map', exact: true }).click();
  await expect(page.locator('.sequence-note')).toBeVisible();
  const changes = repository.data.claims.filter(
    (c) =>
      c.subject === 'rsp-v3-0' &&
      c.object.kind === 'entity' &&
      c.object.entityId === 'rsp-v2-2',
  );
  // Four earlier claims, plus two provision comparisons and one contested
  // assessment added in week 4a: each is its own selectable edge.
  expect(changes).toHaveLength(7);
  await clickMapClaim(page, changes[0].id);
  for (const c of changes) {
    await page.locator(`[data-map-claim-id="${c.id}"]`).click();
    await expect(panel(page)).toContainText(c.statement);
    await expect(page).toHaveURL(new RegExp(c.id));
  }
  await expect(
    page.locator('.map-edge[data-source="rsp-v3-0"][data-target="rsp-v2-2"]'),
  ).toHaveCount(1);
});

test('personnel navigation follows real historical roles and founding claims', async ({
  page,
}) => {
  await page.goto('/#/explore');
  await page.getByRole('searchbox').fill('Dario Amodei');
  await page.getByRole('searchbox').press('Enter');
  await expect(
    page.locator('.map-node[data-entity-id="openai"]'),
  ).toBeVisible();
  await expect(
    page.locator('.map-node[data-entity-id="anthropic"]'),
  ).toBeVisible();
  await expect(
    page.locator('.map-edge[data-source="openai"][data-target="anthropic"]'),
  ).toHaveCount(0);
  const c = repository.data.claims.find(
    (c) =>
      c.subject === 'dario-amodei' &&
      c.predicate === 'held_role' &&
      c.object.kind === 'entity' &&
      c.object.entityId === 'openai',
  )!;
  await clickMapClaim(page, c.id);
  if (await page.locator(`[data-map-claim-id="${c.id}"]`).count())
    await page.locator(`[data-map-claim-id="${c.id}"]`).click();
  await expect(panel(page)).toContainText(c.statement);
});

test('mobile reduced-motion keyboard route returns to the exact chooser and passes accessibility checks in both themes', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/#/explore');
  await page
    .getByRole('navigation', { name: 'Explore the dataset' })
    .getByRole('button', { name: 'Anthropic', exact: true })
    .click();
  const summary = page.locator('.map-connections summary');
  await summary.focus();
  await summary.press('Enter');
  const group = page
    .locator('.connection-index button')
    .filter({ hasText: 'Amazon → Anthropic' })
    .filter({ hasText: 'announced' });
  await group.focus();
  await group.press('Enter');
  const chooser = page.getByRole('region', {
    name: 'Choose an individual claim',
  });
  await expect(chooser).toBeFocused();
  const claim = chooser.locator('[data-map-claim-id="amazon-investment-2023"]');
  await claim.focus();
  await claim.press('Enter');
  await expect(panel(page)).toBeFocused();
  await expect(panel(page)).toContainText(
    'not evidence that $4 billion had already been paid',
  );
  await panel(page)
    .getByRole('button', { name: 'Close ×', exact: true })
    .click();
  await expect(claim).toBeFocused();
  for (const theme of ['light', 'dark']) {
    if (theme === 'dark')
      await page
        .getByRole('button', { name: 'Dark mode', exact: true })
        .click();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    const result = await new AxeBuilder({ page }).analyze();
    expect(result.violations).toEqual([]);
  }
  await page.getByRole('button', { name: 'Claims', exact: true }).click();
  await expect(
    page
      .getByLabel('Claims list')
      .locator('[data-claim-id]:not([data-claim-id^="lg-"])'),
    // 48 before week 4b, plus Anthropic's Frontier Compliance Framework
    // announcement, plus week 4c's eleven Anthropic control-structure
    // records and its four commitment listings and announced intent. The
    // 2026-10-17 lab genealogy records (lg-) are left out of this count.
  ).toHaveCount(64);
});
