import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { datasetSchema } from '../../src/domain/schema';
import { researchPaths } from '../../src/domain/research-path';
import { referenceHash } from '../../src/domain/deep-links';
import {
  packetJson,
  packetMarkdown,
  researchPacket,
  sourceReference,
} from '../../src/domain/references';

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
const selection = researchPaths[0];
const item = selection.items.at(-1)!;
const reading = referenceHash({
  kind: 'reading',
  id: selection.id,
  section: item.sectionId,
  claim: item.claimId,
  inspect: item.claimId,
});

test('claim, dossier and reading links restore on fresh navigation and reload; hash navigation restores selection', async ({
  page,
  context,
}) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/' + referenceHash({ kind: 'claim', id: item.claimId }));
  const inspector = page.getByRole('complementary', {
    name: 'Evidence inspector',
  });
  await expect(inspector.locator('.claim-title')).toHaveText(
    data.claims.find((c) => c.id === item.claimId)!.statement,
  );
  await page.reload();
  await expect(inspector).toBeVisible();
  await inspector
    .getByRole('button', { name: 'Copy claim link', exact: true })
    .click();
  const copied = await page.evaluate(() => navigator.clipboard.readText());
  expect(copied).toContain(referenceHash({ kind: 'claim', id: item.claimId }));
  const fresh = await context.newPage();
  await fresh.goto(copied);
  await expect(
    fresh.getByRole('complementary', { name: 'Evidence inspector' }),
  ).toContainText(item.claimId);
  await fresh.close();
  await page.goto('/#/dossier/anthropic');
  await page.reload();
  await expect(
    page.getByRole('article', { name: 'Anthropic institutional dossier' }),
  ).toBeVisible();
  await page.evaluate((hash) => {
    window.location.hash = hash;
  }, reading);
  await expect(page.locator('[data-bookmarked="true"]')).toHaveAttribute(
    'data-reading-claim-id',
    item.claimId,
  );
  await expect(inspector).toBeVisible();
  await page.reload();
  await expect(page.locator('[data-bookmarked="true"]')).toHaveAttribute(
    'data-reading-claim-id',
    item.claimId,
  );
  await expect(inspector).toBeVisible();
  await inspector.getByRole('button', { name: 'Close ×' }).click();
  await page
    .getByRole('button', { name: 'Copy section link', exact: true })
    .click();
  const sectionUrl = await page.evaluate(() => navigator.clipboard.readText());
  expect(sectionUrl).toContain('?section=' + item.sectionId);
  expect(sectionUrl).not.toContain('&claim=');
  await page.goto(sectionUrl);
  await expect(page.locator('[data-branch-id]')).toHaveAttribute(
    'data-branch-id',
    item.sectionId,
  );
});

test('invalid references recover visibly, and source citation fallback preserves metadata', async ({
  page,
}) => {
  for (const hash of [
    '#/claim/missing',
    '#/dossier/missing',
    '#/reading/anthropic-formation?section=missing',
    '#/claim/%ZZ',
  ]) {
    await page.goto('/' + hash);
    await expect(
      page.getByText('This link does not match any record', {
        exact: false,
      }),
    ).toBeVisible();
    await expect(
      page.getByRole('complementary', { name: 'Evidence inspector' }),
    ).toHaveCount(0);
  }
  await page.getByRole('button', { name: 'Dismiss notice' }).click();
  // Dismissal leaves the explorer overview at its stable address.
  await expect(page).toHaveURL(/#\/explore$/);
  await page.addInitScript(() =>
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: () => Promise.reject(new Error('denied')) },
      configurable: true,
    }),
  );
  await page.goto('/#/claim/' + item.claimId);
  await page.reload(); // Run the injected clipboard denial after same-document hash navigation.
  const claim = data.claims.find((c) => c.id === item.claimId)!;
  const evidence = data.evidence.find((e) => e.id === claim.evidenceIds[0])!;
  const source = data.sources.find((s) => s.id === evidence.sourceId)!;
  await page
    .getByRole('button', { name: 'Copy source reference', exact: true })
    .first()
    .click();
  await expect(
    page.getByRole('textbox', { name: 'Copy source reference text' }),
  ).toHaveValue(sourceReference(source));
  await page
    .getByRole('button', { name: 'Copy claim reference', exact: true })
    .click();
  await expect(
    page.getByRole('textbox', { name: 'Copy claim reference text' }),
  ).toContainText('Selekoa claim record ' + item.claimId);
});

test('downloaded Markdown and JSON match deterministic domain exports', async ({
  page,
}) => {
  await page.goto('/#/reading/' + selection.id);
  await page.getByText('Export this reading', { exact: true }).click();
  const packet = await researchPacket(data, selection);
  for (const [label, extension, expected] of [
    ['Download Markdown', 'md', packetMarkdown(packet)],
    ['Download JSON', 'json', packetJson(packet)],
  ]) {
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: label, exact: true }).click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe(
      selection.id + '-v' + selection.version + '.' + extension,
    );
    expect(readFileSync((await download.path())!, 'utf8')).toBe(expected);
  }
});

for (const width of [1440, 390])
  for (const theme of ['light', 'dark']) {
    test(`reference surfaces ${width}px ${theme}: layout and console`, async ({
      page,
    }, testInfo) => {
      const errors: string[] = [];
      page.on('pageerror', (error) => errors.push(error.message));
      page.on('console', (message) => {
        if (message.type() === 'error') errors.push(message.text());
      });
      await page.setViewportSize({ width, height: 1000 });
      await page.goto('/#/reading/' + selection.id);
      if (
        (await page
          .getByRole('button', { name: 'Dark mode' })
          .getAttribute('aria-pressed')) !== String(theme === 'dark')
      )
        await page.getByRole('button', { name: 'Dark mode' }).click();
      await expect(page.locator('html')).toHaveAttribute(
        'data-selekoa-theme',
        theme,
      );
      await page.getByText('Export this reading', { exact: true }).click();
      await page
        .getByRole('button', { name: 'Download Markdown' })
        .scrollIntoViewIfNeeded();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBe(true);
      await page.screenshot({ path: testInfo.outputPath('reading.png') });
      await page.goto('/' + reading);
      if (
        (await page
          .getByRole('button', { name: 'Dark mode' })
          .getAttribute('aria-pressed')) !== String(theme === 'dark')
      )
        await page.getByRole('button', { name: 'Dark mode' }).click();
      await expect(page.locator('html')).toHaveAttribute(
        'data-selekoa-theme',
        theme,
      );
      const inspector = page.getByRole('complementary', {
        name: 'Evidence inspector',
      });
      await inspector
        .getByRole('button', { name: 'Copy claim reference' })
        .scrollIntoViewIfNeeded();
      await expect(inspector).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBe(true);
      await page.screenshot({ path: testInfo.outputPath('inspector.png') });
      expect(errors).toEqual([]);
    });
  }

test('skip link preserves the research URL and reading while moving keyboard focus', async ({
  page,
}) => {
  await page.goto(
    '/' +
      referenceHash({
        kind: 'reading',
        id: selection.id,
        section: selection.items[0].sectionId,
        claim: selection.items[0].claimId,
      }),
  );
  await expect(
    page.getByRole('article', { name: 'Anthropic guided research path' }),
  ).toBeVisible();
  const url = page.url();
  await page.getByRole('link', { name: 'Skip to content' }).focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#question')).toBeFocused();
  await expect(page).toHaveURL(url);
  await expect(
    page.getByRole('article', { name: 'Anthropic guided research path' }),
  ).toBeVisible();
});
