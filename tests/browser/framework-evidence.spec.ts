import { test, expect, type Page } from './fixtures';
import { readFileSync } from 'node:fs';

const sources = JSON.parse(
  readFileSync(new URL('../../data/sources.json', import.meta.url), 'utf8'),
) as {
  id: string;
  archivedUrl?: string;
  archivedAt?: string;
}[];
const source = (id: string) => sources.find((s) => s.id === id)!;

function collectErrors(page: Page) {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  return errors;
}

test('frameworks page links each edition to its dated archive copy', async ({
  page,
}) => {
  const errors = collectErrors(page);
  await page.goto('/documents/frontier-safety-frameworks');
  const rsp = source('source-rsp-1-0');
  const link = page.getByRole('link', {
    name: new RegExp(`Archived copy, captured ${rsp.archivedAt}`),
  });
  await expect(link).toHaveAttribute('href', rsp.archivedUrl!);
  // 18 edition sources before week 4a, plus Meta (three) and Microsoft (two).
  // Meta v1.1's exact-text links also point into the archive (the file is no
  // longer served), so archive copies are counted by their label.
  await expect(
    page.getByRole('link', { name: /^· Archived copy, captured / }),
  ).toHaveCount(23);
  await page.getByText('Limits of this history').click();
  await expect(
    page.getByText('does not prove what the document said earlier').first(),
  ).toBeVisible();
  expect(errors).toEqual([]);
});

test('Inspector shows the archive capture and a non-English source language', async ({
  page,
}) => {
  const errors = collectErrors(page);
  await page.goto('/claim/rsp-credits-arc-2023');
  const card = page.locator('.evidence-card').first();
  const announcement = source('source-rsp-announcement');
  await expect(
    card.getByRole('link', {
      name: new RegExp(`Archived copy, captured ${announcement.archivedAt}`),
    }),
  ).toHaveAttribute('href', announcement.archivedUrl!);
  await expect(card.locator('blockquote')).toContainText(
    'which inspired our approach.',
  );
  await page.goto('/claim/cn-alibaba-budget');
  await expect(
    page.locator('.evidence-card .source-byline').first(),
  ).toContainText('In Traditional Chinese (zh-Hant)');
  expect(errors).toEqual([]);
});

test('document page shows the capture date and what it cannot authenticate', async ({
  page,
}) => {
  await page.goto('/document/rsp-v2-0');
  const rsp = source('source-rsp-2-0');
  const note = page.locator('.record-archive');
  await expect(note).toContainText(`captured ${rsp.archivedAt}`);
  await expect(note).toContainText('does not prove what the page said earlier');
});
