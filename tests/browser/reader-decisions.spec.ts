import { expect, test, type Page } from './fixtures';

// The maintainer's decisions of 2026-10-29 on the reader tasks
// (review/reader-decisions-2026-10-29.md).

function collectErrors(page: Page) {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  return errors;
}

test('the frameworks-and-law timeline shows both EU AI Act dates of application', async ({
  page,
}) => {
  const errors = collectErrors(page);
  await page.goto('/guide/frontier-frameworks-and-law');
  const timeline = page.locator('#fl-timeline');
  const chapterV = timeline.locator('.fl-row', {
    hasText: 'Chapter V (general-purpose AI models) applies from 2 August 2025',
  });
  await expect(chapterV.locator('time')).toHaveText('2025-08-02');
  const general = timeline.locator('.fl-row', {
    hasText: 'General date of application: 2 August 2026',
  });
  await expect(general.locator('time')).toHaveText('2026-08-02');
  expect(errors).toEqual([]);
});

test('the RSP grid notes the AI R&D thresholds it does not yet track', async ({
  page,
}) => {
  const errors = collectErrors(page);
  await page.goto('/documents/frontier-safety-frameworks');
  const grid = page.locator('#family-anthropic-rsp details.doc-alignment');
  await grid.locator('summary').click();
  const note = grid.locator('.provision-row-note');
  await expect(note).toHaveCount(1);
  await expect(note).toContainText(
    'v2.0 to v2.2 also have a capability threshold for “Autonomous AI Research and Development”',
  );
  await note.getByRole('link', { name: /v2\.0/ }).click();
  await expect(page).toHaveURL(/\/document\/rsp-v2-0$/);
  expect(errors).toEqual([]);
});

test('the China scope note is on the Institutions hub and the About page', async ({
  page,
}) => {
  const errors = collectErrors(page);
  await page.goto('/institutions');
  const hubNote = page.locator('#china-scope');
  await expect(hubNote).toContainText('On China, the records hold');
  await expect(hubNote).toContainText('GB 45438-2025 is held');
  const text = (await hubNote.textContent())!;
  await page.goto('/about');
  await expect(page.locator('#about-china-scope')).toHaveText(text);
  expect(errors).toEqual([]);
});

test('a named financial backer is not shown as an announced investment', async ({
  page,
}) => {
  await page.goto('/claim/cn-high-flyer-backing');
  await expect(page.locator('main')).toContainText(
    'named as a financial backer of',
  );
  await expect(page.locator('main')).not.toContainText(
    'announced investment in',
  );
});
