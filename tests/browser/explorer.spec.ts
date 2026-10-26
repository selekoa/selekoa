import { readdirSync } from 'node:fs';
import { clickMapClaim } from './map-actions';
import claims from '../../data/claims.json' with { type: 'json' };
import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// The explorer and its map leave proposition records out; the propositions
// collection and document pages list them.
const explored = claims.filter(
  (c) =>
    ![
      'articulates_proposition',
      'contests_proposition',
      'bears_on_proposition',
    ].includes(c.predicate),
);

test('map renders in Edge without console or runtime errors', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  await page.goto('/#/explore');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Explore the documentary record',
  );
  // Without a search, topic or institution the list stands in for the map.
  await expect(page.getByTestId('network')).toHaveCount(0);
  await expect(page.locator('.map-withheld')).toBeVisible();
  await page
    .getByRole('navigation', { name: 'Explore the dataset' })
    .getByRole('button', { name: 'Compute' })
    .click();
  await page
    .getByRole('group', { name: 'Display mode' })
    .getByRole('button', { name: 'Map' })
    .click();
  await expect(page.getByTestId('network').locator('canvas')).not.toHaveCount(
    0,
  );
  await expect(
    page.getByText('The map needs WebGL.', { exact: false }),
  ).toHaveCount(0);
  await page.getByRole('button', { name: 'Zoom in', exact: true }).click();
  await page.getByRole('button', { name: 'Reset map position' }).click();
  await page.screenshot({ path: '.local/overview.png', fullPage: true });
  expect(errors).toEqual([]);
});
test('curved reciprocal lines open their distinct evidence records', async ({
  page,
}) => {
  // Fixed viewport matches the manually inspected ordinary-desktop layout.
  await page.setViewportSize({ width: 1265, height: 744 });
  await page.goto('/#/explore');
  await page
    .getByRole('navigation', { name: 'Explore the dataset' })
    .getByRole('button', { name: 'OpenAI', exact: true })
    .click();
  await expect(page.getByTestId('network').locator('canvas')).not.toHaveCount(
    0,
  );
  // Isolate this pair so added personnel cannot move the canvas hit targets.
  await page
    .getByLabel('Record type', { exact: true })
    .selectOption('organisation');
  await page.getByLabel('Records through year').selectOption('2019');
  const cloud = claims.find(
    (c) =>
      c.subject === 'openai' &&
      c.predicate === 'selected_cloud_provider' &&
      c.time.kind === 'event' &&
      c.time.date?.startsWith('2019'),
  )!;
  const investment = claims.find(
    (c) =>
      c.subject === 'microsoft' &&
      c.predicate === 'investment_announced' &&
      c.time.kind === 'event' &&
      c.time.date?.startsWith('2019'),
  )!;
  await clickMapClaim(page, cloud.id);
  const panel = page.getByRole('complementary', { name: 'Evidence inspector' });
  await expect(panel).toContainText('selected cloud provider');
  await clickMapClaim(page, investment.id);
  await expect(panel).toContainText('announced investment in');
  await expect(panel).toContainText('cash disbursement');
});

test('entity focus opens exact capital evidence and qualifications', async ({
  page,
}) => {
  await page.goto('/#/explore');
  await page
    .getByRole('navigation', { name: 'Explore the dataset' })
    .getByRole('button', { name: 'Anthropic', exact: true })
    .click();
  await expect(
    page.getByRole('complementary', { name: 'Entity inspector' }),
  ).toContainText('Relationships');
  await page.locator('[data-claim-id="amazon-investment-2023"]').click();
  const panel = page.getByRole('complementary', { name: 'Evidence inspector' });
  await expect(panel).toContainText('up to $4 billion');
  await expect(panel).toContainText(
    'not evidence that $4 billion had already been paid',
  );
  await expect(
    panel.getByRole('link', { name: /Expanding access/ }),
  ).toHaveAttribute('href', 'https://www.anthropic.com/news/anthropic-amazon');
  await expect(panel).toContainText('Machine-checked');
  await expect(
    panel.getByText('Stated in source', { exact: true }),
  ).toBeVisible();
  await expect(panel.getByText('Supported', { exact: true })).toBeVisible();
  await expect(panel.getByLabel('Evidence coverage')).toHaveText(
    'Supporting evidence: primary · 1 source',
  );
  // Seed is the default: no row or status-line marker, only the details.
  await expect(panel.locator('.status-line')).not.toContainText('Seed');
  await panel.getByText('Status and meaning').click();
  await expect(
    panel.getByText('Not reviewed by an editor', { exact: true }),
  ).toBeVisible();
  await panel.getByText('Source details and check notes').click();
  await expect(panel).toContainText('Human editorial review is pending');
  await page.screenshot({ path: '.local/evidence.png', fullPage: true });
});
test('search, two-source provenance and keyboard inspection', async ({
  page,
}) => {
  await page.goto('/#/explore');
  await page.getByRole('searchbox').fill('I. J. Good');
  await page.getByRole('searchbox').press('Enter');
  const button = page.getByRole('button', {
    name: /I. J. Good authored Speculations/,
  });
  await button.focus();
  await button.press('Enter');
  const panel = page.getByRole('complementary', { name: 'Evidence inspector' });
  await expect(panel).toBeFocused();
  await expect(panel).toContainText('primary source');
  await expect(panel).toContainText('secondary source');
  await expect(panel.getByLabel('Evidence coverage')).toHaveText(
    'Supporting evidence: primary + secondary · 2 sources',
  );
  await expect(panel).toContainText('1965 · event');
});
test('time and type filters produce honest empty states and reset', async ({
  page,
}) => {
  await page.goto('/#/explore');
  await page.getByLabel('Record type', { exact: true }).selectOption('all');
  await page.getByLabel('Records through year').selectOption('1965');
  await page.getByRole('button', { name: 'Timeline', exact: true }).click();
  const list = page.getByLabel('Chronological claims');
  // Through 1965 includes undated records, sorted last.
  const through1965 = explored.filter((c) => {
    const t = c.time as {
      kind: string;
      date?: string;
      from?: string;
      until?: string;
    };
    const date = t.kind === 'interval' ? (t.from ?? t.until) : t.date;
    return !date || date.slice(0, 4) <= '1965';
  });
  await expect(list.getByRole('button')).toHaveCount(through1965.length);
  await expect(
    list.locator('[data-claim-id="daniela-openai-safety-prior"]'),
  ).toContainText('Date unknown');
  await expect(list).not.toContainText('2013');
  await page
    .getByLabel('Record type', { exact: true })
    .selectOption('organisation');
  await expect(
    list.locator('[data-claim-id="eval-ontology-i-arc-openai"]'),
  ).toContainText('Date unknown');
  await page
    .getByLabel('Record type', { exact: true })
    .selectOption('infrastructure');
  await expect(list).toContainText('No claims match');
  await page.getByRole('button', { name: 'Reset filters' }).click();
  await expect(list.getByRole('button')).not.toHaveCount(0);
});
test('all claims are accessible as text and the footer opens About & method', async ({
  page,
}) => {
  await page.goto('/#/explore');
  await page.getByLabel('Record type', { exact: true }).selectOption('all');
  await page.getByRole('button', { name: 'Claims', exact: true }).click();
  await expect(page.getByLabel('Claims list').getByRole('button')).toHaveCount(
    explored.length,
  );
  await page.locator('[data-claim-id="xai-round-total-2024"]').click();
  await expect(
    page.getByRole('complementary', { name: 'Evidence inspector' }),
  ).toContainText('round total');
  await page
    .getByRole('contentinfo')
    .getByRole('button', { name: 'About & method' })
    .click();
  await expect(page).toHaveURL(/#\/about$/);
  const about = page.getByRole('article', {
    name: 'About Selekoa and its method',
  });
  await expect(about).toContainText('Neither role ranks truth.');
  await expect(about).toContainText(
    'does not mean the claim is beyond dispute',
  );
  await expect(about).toContainText('Read the original passage');
  await expect(about).toContainText(
    'checked by a model from a different family',
  );
});
test('About & method states coverage, labels, citation and corrections', async ({
  page,
}) => {
  await page.goto('/');
  await page
    .getByRole('button', { name: 'About Selekoa and its method →' })
    .first()
    .click();
  await expect(page).toHaveURL(/#\/about$/);
  const about = page.getByRole('article', {
    name: 'About Selekoa and its method',
  });
  await expect(about.getByRole('heading', { level: 2 })).toHaveText([
    'What Selekoa is',
    'Current coverage',
    'How this was checked',
    'What the labels mean',
    'Known limits and errors',
    'How to cite',
    'Licences and credits',
    'Corrections',
    'Privacy',
    'Keyboard use',
  ]);
  // Version status and licences, from the release and the licence files.
  await expect(about).toContainText('research preview, version 0.x');
  await expect(about).not.toContainText('private');
  await expect(
    about.getByRole('link', { name: 'Notices for every shipped dependency' }),
  ).toHaveAttribute('href', 'legal/THIRD-PARTY-NOTICES.txt');
  await expect(about).toContainText('sets no cookies');
  await expect(about).toContainText(
    'It stores one item in your browser: your light or dark theme choice',
  );
  // Coverage is computed from the loaded dataset, not typed in.
  await expect(about).toContainText(
    `${claims.length.toLocaleString('en-US')} claims:`,
  );
  for (const label of [
    'Stated in source',
    'Inferred',
    'Question posed by Selekoa',
    'Supported',
    'Contested',
    'Unresolved',
    'Not reviewed by an editor',
    'Editorially accepted',
    'Machine-checked',
    'Human-reviewed evidence',
    'Coverage gap',
  ])
    await expect(
      about.getByRole('term').filter({ hasText: label }).first(),
    ).toBeVisible();
  await expect(about).toContainText('at most 50 words');
  // The latest release version and a local download built from its files.
  const latest = readdirSync('release')
    .filter((d) => /^v\d+\.\d+\.\d+$/.test(d))
    .map((d) => d.slice(1).split('.').map(Number))
    .sort((a, b) => b[0] - a[0] || b[1] - a[1] || b[2] - a[2])[0]
    .join('.');
  await expect(about).toContainText(`dataset release v${latest}`);
  const download = about.getByRole('link', {
    name: /^Download dataset v\d+\.\d+\.\d+$/,
  });
  await expect(download).toHaveAttribute(
    'href',
    /^release\/selekoa-dataset-v\d+\.\d+\.\d+\.zip$/,
  );
  const archive = await page.request.get(
    (await download.getAttribute('href'))!,
  );
  expect(archive.status()).toBe(200);
  expect((await archive.body()).subarray(0, 2).toString()).toBe('PK');
  // Placeholder only: no contact address or personal identity is published.
  await expect(about.locator('#about-corrections ~ p').first()).toContainText(
    'will be published here before any public release',
  );
  await expect(about).not.toContainText('@');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    'content',
    'noindex, nofollow',
  );
  // The in-page index moves focus to its section.
  await about.getByRole('button', { name: 'How to cite' }).click();
  await expect(page.locator('#about-cite')).toBeFocused();
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .analyze()
    ).violations,
  ).toEqual([]);
  // The review line lists the exceptions behind a disclosure.
  const exceptions = about.getByRole('list', {
    name: 'Review-state exceptions',
  });
  await expect(exceptions).toBeHidden();
  await about.locator('#review-status summary').click();
  await expect(exceptions).toBeVisible();
});
test('baseline accessibility in overview and evidence view', async ({
  page,
}) => {
  await page.goto('/#/explore');
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .analyze()
    ).violations,
  ).toEqual([]);
  await page
    .getByRole('navigation', { name: 'Explore the dataset' })
    .getByRole('button', { name: 'Anthropic', exact: true })
    .click();
  await page.locator('[data-claim-id="amazon-investment-2023"]').click();
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .analyze()
    ).violations,
  ).toEqual([]);
});
test('narrow screens keep controls and evidence within the viewport', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/#/explore');
  await page
    .getByRole('navigation', { name: 'Explore the dataset' })
    .getByRole('button', { name: 'Anthropic', exact: true })
    .click();
  await page.locator('[data-claim-id="amazon-investment-2023"]').click();
  await expect(
    page.getByRole('complementary', { name: 'Evidence inspector' }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await page.screenshot({ path: '.local/mobile.png', fullPage: true });
});
