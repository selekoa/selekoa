import { expect, test } from './fixtures';

test('authorized source reviews remain distinct from wording approvals', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  await page.goto('/explore');
  const search = page.getByRole('searchbox');
  await search.fill('Igor Babuschkin');
  await search.press('Enter');
  await page.getByRole('button', { name: 'Claims', exact: true }).click();
  const list = page.getByLabel('Claims list');
  const inspector = page.getByRole('complementary', {
    name: 'Evidence inspector',
  });
  await list.locator('[data-claim-id="babuschkin-cofounded-xai"]').click();
  await expect(inspector).toContainText('Editorially accepted');
  await expect(inspector).toContainText('Reviewed by futurelightcone');
  await expect(inspector).toContainText(
    'not independent confirmation of legal founding history',
  );
  await search.fill('Daniel Levy');
  await search.press('Enter');
  await list.locator('[data-claim-id="levy-brain-intern-2017"]').click();
  await expect(inspector).toContainText('Research intern');
  await expect(inspector).toContainText('Summer 2017');
  await expect(inspector).toContainText('Not editorially accepted');
  await expect(inspector).toContainText('Machine-checked');
  await expect(inspector).toContainText('Reviewed by futurelightcone');
  await expect(inspector.locator('a.source-title')).toHaveCount(2);
  await page.screenshot({
    path: '.local/approved-corrections-levy.png',
    fullPage: true,
  });
  await search.fill('Adam: A Method');
  await search.press('Enter');
  for (const [id, name] of [
    ['lineage-kingma-adam', 'Diederik P. Kingma (Durk Kingma)'],
    ['lineage-ba-adam', 'Jimmy Lei Ba (Jimmy Ba)'],
  ]) {
    await list.locator(`[data-claim-id="${id}"]`).click();
    await expect(inspector).toContainText(name);
    await expect(inspector).toContainText('Not reviewed by an editor');
    await expect(inspector).not.toContainText('Reviewed by futurelightcone');
  }
  expect(errors).toEqual([]);
});
