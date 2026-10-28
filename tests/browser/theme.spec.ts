import { test, expect, type Page } from './fixtures';

/**
 * Relative luminance of a computed `rgb(...)` colour, 0 (black) to 1 (white).
 * A transparent colour (an element that paints nothing) is rejected.
 */
function luminance(colour: string) {
  const values = (colour.match(/[\d.]+/g) ?? []).map(Number);
  expect(values[3] ?? 1, `${colour} is not opaque`).toBe(1);
  const [r, g, b] = values.slice(0, 3).map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

const painted = (page: Page) =>
  page.evaluate(() => {
    const style = (element: Element) => getComputedStyle(element);
    return {
      body: style(document.body).backgroundColor,
      root: style(document.getElementById('root')!).backgroundColor,
      text: style(document.body).color,
    };
  });

test('dark system setting paints body and #root dark with light text', async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute(
    'data-selekoa-theme',
    'dark',
  );
  const colours = await painted(page);
  expect(luminance(colours.body)).toBeLessThan(0.05);
  expect(luminance(colours.root)).toBeLessThan(0.05);
  expect(luminance(colours.text)).toBeGreaterThan(0.5);
});

test('a host page that styles body and sets data-theme does not break dark mode', async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('/');
  await expect(page.locator('h1')).toBeVisible();
  // What a wrapping preview host might inject.
  await page.evaluate(() => {
    document.documentElement.dataset.theme = 'light';
    const style = document.createElement('style');
    style.textContent =
      'html { background: white; color-scheme: light; } body { background: white; color: black; }';
    document.head.append(style);
  });
  const colours = await painted(page);
  expect(luminance(colours.body)).toBeLessThan(0.05);
  expect(luminance(colours.root)).toBeLessThan(0.05);
  expect(luminance(colours.text)).toBeGreaterThan(0.5);
});

test('light system setting paints body light', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute(
    'data-selekoa-theme',
    'light',
  );
  expect(luminance((await painted(page)).body)).toBeGreaterThan(0.8);
});
