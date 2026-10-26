import { test, expect } from '@playwright/test';

test('browser Back and Forward follow start → governance → frameworks → search → map → record', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(m.text());
  });
  await page.goto('/');
  await page
    .getByRole('navigation', { name: 'Primary' })
    .getByRole('button', { name: 'Governance' })
    .click();
  await expect(page).toHaveURL(/#\/governance$/);
  await page
    .getByRole('button', { name: /Read the document histories/ })
    .click();
  await expect(page).toHaveURL(/#\/documents\//);
  await page
    .getByRole('navigation', { name: 'Primary' })
    .getByRole('button', { name: 'Search' })
    .click();
  await expect(page).toHaveURL(/#\/search$/);
  await page
    .getByRole('group', { name: 'Show search results as' })
    .getByRole('button', { name: 'Map' })
    .click();
  await expect(page).toHaveURL(/#\/explore$/);
  await page.getByRole('searchbox').fill('Jan Leike');
  await page
    .getByRole('button', { name: 'Jan Leike: person page', exact: true })
    .click();
  await expect(page).toHaveURL(/#\/person\/jan-leike$/);
  await expect(page.locator('#record-page')).toBeVisible();

  await page.goBack();
  await expect(page).toHaveURL(/#\/explore$/);
  await page.goBack();
  await expect(page).toHaveURL(/#\/search$/);
  await page.goBack();
  await expect(page).toHaveURL(/#\/documents\//);
  await page.goBack();
  await expect(page).toHaveURL(/#\/governance$/);
  await page.goBack();
  await expect(page).not.toHaveURL(/#\//);
  await expect(page.getByRole('search')).toBeVisible();

  await page.goForward();
  await expect(page).toHaveURL(/#\/governance$/);
  await page.goForward();
  await expect(page).toHaveURL(/#\/documents\//);
  await page.goForward();
  await expect(page).toHaveURL(/#\/search$/);
  await page.goForward();
  await expect(page).toHaveURL(/#\/explore$/);
  await page.goForward();
  await expect(page).toHaveURL(/#\/person\/jan-leike$/);
  await expect(page.locator('#record-page')).toBeVisible();
  expect(errors).toEqual([]);
});
