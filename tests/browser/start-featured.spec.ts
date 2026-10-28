import { expect, test, type Page } from './fixtures';

const mapPath = '/dossier/openai?view=map';
const mapName = 'See it as a map: OpenAI’s direct connections →';

function collectErrors(page: Page) {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  return errors;
}

/** The focused map is drawn, not replaced by the list. */
async function expectOpenAIMap(page: Page) {
  await expect(page).toHaveURL(new RegExp(mapPath.replace('?', '\\?') + '$'));
  await expect(page.locator('.exploration-heading h2')).toHaveText('OpenAI');
  await expect(page.locator('.exploration-heading .eyebrow')).toHaveText(
    'Direct connections',
  );
  await expect(page.getByTestId('network').locator('canvas')).not.toHaveCount(
    0,
  );
  await expect(page.locator('.map-withheld')).toHaveCount(0);
  await expect(
    page
      .getByRole('group', { name: 'Display mode' })
      .getByRole('button', { name: 'Map' }),
  ).toHaveAttribute('aria-pressed', 'true');
}

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('the built start page labels the featured question and links the map', async ({
    page,
  }) => {
    await page.goto('/');
    const featured = page.locator('.landing-featured');
    await expect(featured.locator('.eyebrow')).toHaveText(
      'A question the records answer:',
    );
    await expect(
      featured.getByRole('link', {
        name: 'Who controlled OpenAI, and when? →',
      }),
    ).toHaveAttribute('href', '/control/openai');
    await expect(featured.getByRole('link', { name: mapName })).toHaveAttribute(
      'href',
      mapPath,
    );
  });
});

for (const width of [1440, 390])
  test(`${width}px: the map link opens OpenAI’s drawn map, and its address reopens it`, async ({
    page,
  }) => {
    const errors = collectErrors(page);
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('/');
    await page.getByRole('link', { name: mapName }).click();
    await expectOpenAIMap(page);
    // The address opens the same map from the built dossier page.
    await page.goto(mapPath);
    await expectOpenAIMap(page);
    // The dossier and the map share one page: switching replaces the address.
    await page
      .getByRole('group', { name: 'Display mode' })
      .getByRole('button', { name: 'Dossier' })
      .click();
    await expect(page).toHaveURL(/\/dossier\/openai$/);
    expect(errors).toEqual([]);
  });
