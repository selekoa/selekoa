import { expect, test, type Page } from './fixtures';
import AxeBuilder from '@axe-core/playwright';
import { dossierCount } from './dossier-count';
import { researchPath } from '../../src/domain/research-path';
import { readFileSync } from 'node:fs';
import { datasetSchema } from '../../src/domain/schema';

// Playwright runs in Node; load JSON explicitly instead of Vite's JSON imports.
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
const repository = {
  data,
  evidence: new Map(data.evidence.map((e) => [e.id, e])),
  sources: new Map(data.sources.map((s) => [s.id, s])),
};

const selection = researchPath(repository.data, 'anthropic')!;
async function enter(page: Page) {
  await page.goto('/explore');
  await page
    .getByRole('navigation', { name: 'Explore the dataset' })
    .getByRole('button', { name: 'Anthropic', exact: true })
    .click();
  await page.getByRole('button', { name: 'Dossier', exact: true }).click();
  await page
    .getByRole('link', { name: 'Open the guided reading →', exact: true })
    .click();
  return page.getByRole('article', { name: 'Anthropic guided research path' });
}

test('principal reading groups seven founders and two leaders; optional branches retain exact evidence and bookmarks', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(m.text());
  });
  const reader = await enter(page);
  await expect(reader).toContainText(
    '9 main claims · 11 optional context records',
  );
  await expect(reader.locator('.path-record')).toHaveCount(9);
  await expect(
    reader.locator('.path-record').first().locator(':scope > :first-child'),
  ).toHaveText('Dario Amodei co-founded Anthropic in 2021.');
  await expect(
    reader.getByRole('button', { name: /Next|Previous/ }),
  ).toHaveCount(0);
  await expect(reader).not.toContainText('What this does not establish');
  await expect(reader).not.toContainText('Read alongside');
  await expect(
    reader
      .getByRole('region', { name: 'Founding participation', exact: true })
      .locator('.path-record'),
  ).toHaveCount(7);
  await expect(
    reader
      .getByRole('region', { name: 'Early leadership', exact: true })
      .locator('.path-record'),
  ).toHaveCount(2);
  await expect(
    reader.getByText(
      'Written by machine · not human-reviewed or editorially accepted.',
      { exact: true },
    ),
  ).toBeVisible();
  const inspector = page.getByRole('complementary', {
    name: 'Evidence inspector',
  });
  for (const section of selection.sections) {
    if (section.kind === 'context')
      await reader
        .getByRole('button', { name: section.title, exact: true })
        .click();
    const expected = selection.items.filter((i) => i.sectionId === section.id);
    await expect(reader.locator('.path-record')).toHaveCount(expected.length);
    for (const item of expected) {
      const card = reader.locator(
        '[data-reading-claim-id="' + item.claimId + '"]',
      );
      await expect(card.locator(':scope > :first-child')).toHaveText(
        item.claim.statement,
      );
      await card.locator('summary').click();
      await expect(card).toContainText(item.claim.qualification);
      await expect(card).toContainText(item.rationale);
      const trigger = card.locator('[data-claim-id]');
      await trigger.focus();
      await page.keyboard.press('Enter');
      await expect(inspector).toBeFocused();
      await expect(inspector.locator('.claim-title')).toHaveText(
        item.claim.statement,
      );
      const e = repository.evidence.get(item.claim.evidenceIds[0])!;
      await expect(inspector.locator('.locator').first()).toContainText(
        e.locator,
      );
      await expect(inspector.locator('.source-title').first()).toHaveAttribute(
        'href',
        repository.sources.get(e.sourceId)!.evidenceUrl,
      );
      await inspector.getByRole('button', { name: 'Close ×' }).click();
      await expect(trigger).toBeFocused();
      await expect(card).toHaveAttribute('data-bookmarked', 'true');
      await card.locator('summary').click();
    }
  }
  const saved = 'lineage-scaling-uses-batch';
  const anthropicCount = dossierCount('anthropic', 156);
  await reader
    .getByRole('link', { name: `Full dossier · ${anthropicCount} claims ↗` })
    .click();
  await expect(
    page.getByRole('article', { name: 'Anthropic institutional dossier' }),
  ).toContainText(`${anthropicCount} claims ·`);
  await page
    .getByRole('link', {
      name: 'Resume the Anthropic reading · Scaling publications',
      exact: true,
    })
    .click();
  await expect(
    reader.locator('[data-reading-claim-id="' + saved + '"]'),
  ).toHaveAttribute('data-bookmarked', 'true');
  await reader.getByRole('button', { name: 'Institution map ↗' }).click();
  await page
    .getByRole('link', {
      name: 'Resume the Anthropic reading · Scaling publications',
      exact: true,
    })
    .click();
  await reader
    .getByRole('button', { name: 'Back to founding & early leadership' })
    .click();
  const founder = reader.locator(
    '[data-reading-claim-id="jared-kaplan-anthropic-cofounder"]',
  );
  await founder.locator('[data-claim-id]').click();
  await inspector
    .getByRole('link', { name: 'Jared Kaplan', exact: true })
    .click();
  await expect(reader).not.toBeVisible();
  await page
    .getByRole('link', {
      name: 'Resume the Anthropic reading · Founding & early leadership',
      exact: true,
    })
    .click();
  await expect(founder).toHaveAttribute('data-bookmarked', 'true');
  await expect(founder.locator('h4')).toBeFocused();
  await expect(reader.locator('.path-record')).toHaveCount(9);
  expect(errors).toEqual([]);
});

for (const width of [1440, 390])
  for (const dark of [false, true]) {
    test(`branched presentation ${width} ${dark ? 'dark' : 'light'}: inline dates, keyboard return, no overflow`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 });
      await page.emulateMedia({ reducedMotion: 'reduce' });
      const errors: string[] = [];
      page.on('pageerror', (e) => errors.push(e.message));
      page.on('console', (m) => {
        if (m.type() === 'error') errors.push(m.text());
      });
      const reader = await enter(page);
      if (dark) await page.getByRole('button', { name: 'Dark mode' }).click();
      const dario = reader.locator(
        '[data-reading-claim-id="dario-cofounded-anthropic-2021"]',
      );
      await expect(
        dario.getByText('2021 · event · year-only precision', { exact: true }),
      ).toBeVisible();
      await expect(
        dario.getByText('Source published: 2022-04-29 · retrospective source', {
          exact: true,
        }),
      ).toBeVisible();
      const olah = reader.locator(
        '[data-reading-claim-id="chris-olah-cofounded-anthropic-2021"]',
      );
      await expect(
        olah.getByText('Source published: 2024 · retrospective source', {
          exact: true,
        }),
      ).toBeVisible();
      for (const id of [
        'jared-kaplan-anthropic-cofounder',
        'sam-mccandlish-anthropic-cofounder',
      ]) {
        const record = reader.locator('[data-reading-claim-id="' + id + '"]');
        await expect(
          record.getByText('Date unknown', { exact: true }),
        ).toBeVisible();
        await expect(
          record.getByText(
            'Source published: 2024-10-15 · retrospective attribution; founding date unknown',
            { exact: true },
          ),
        ).toBeVisible();
      }
      const trigger = olah.locator('[data-claim-id]');
      await trigger.focus();
      const before = await page.evaluate(() => window.scrollY);
      await page.keyboard.press('Enter');
      const inspector = page.getByRole('complementary', {
        name: 'Evidence inspector',
      });
      await expect(inspector).toBeFocused();
      await expect(inspector).toContainText('PDF page 6');
      await inspector.getByRole('button', { name: 'Close ×' }).click();
      await expect(trigger).toBeFocused();
      await expect
        .poll(() => page.evaluate(() => window.scrollY))
        .toBeCloseTo(before, 0);
      expect(
        (
          await new AxeBuilder({ page })
            .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
            .analyze()
        ).violations,
      ).toEqual([]);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      await reader.screenshot({
        path: `.local/refined-${width === 390 ? 'mobile' : 'desktop'}-${dark ? 'dark' : 'light'}.png`,
      });
      await reader
        .getByRole('button', { name: 'Prior institutional roles', exact: true })
        .click();
      await expect(
        reader.locator('[data-branch-id="personnel"]'),
      ).toBeVisible();
      await expect(
        reader.locator(
          '[data-reading-claim-id="dario-cofounded-anthropic-2021"]',
        ),
      ).toHaveCount(0);
      await expect(
        reader.locator(
          '[data-reading-claim-id="dario-openai-departure-announced-2020"] .path-warning',
        ),
      ).toBeVisible();
      await expect(
        reader.locator(
          '[data-reading-claim-id="daniela-openai-safety-prior"] .path-warning',
        ),
      ).toBeVisible();
      expect(
        (
          await new AxeBuilder({ page })
            .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
            .analyze()
        ).violations,
      ).toEqual([]);
      await reader.screenshot({
        path: `.local/refined-context-${width === 390 ? 'mobile' : 'desktop'}-${dark ? 'dark' : 'light'}.png`,
      });
      expect(errors).toEqual([]);
    });
  }

test('OpenAI remains a complete dossier and does not inherit the Anthropic branches', async ({
  page,
}) => {
  const reader = await enter(page);
  // The question page is a reading page; reach the explorer by its exit.
  await reader.getByRole('link', { name: /^Full dossier/ }).click();
  await page
    .getByRole('navigation', { name: 'Explore the dataset' })
    .getByRole('button', { name: 'OpenAI', exact: true })
    .click();
  const dossier = page.getByRole('article', {
    name: 'OpenAI institutional dossier',
  });
  // 158 before week 4b, plus the Frontier Governance Framework's quoted
  // designation under California SB 53, plus seven week 4c control-structure
  // records and five commitment records, plus ten records about Paul
  // Christiano and his papers once the 2017 author affiliation made him one
  // of its people (2026-10-15).
  await expect(dossier).toContainText(
    `${dossierCount('openai', 181)} claims ·`,
  );
  await expect(
    dossier.getByRole('link', { name: 'Open the guided reading →' }),
  ).toHaveCount(0);
  await page
    .getByRole('link', {
      name: 'Resume the Anthropic reading · Founding & early leadership',
      exact: true,
    })
    .click();
  await expect(page.locator('[data-branch-id="formation"]')).toBeVisible();
});

test('every authored passage exposes supporting claim IDs and evidence without losing the reading branch', async ({
  page,
}) => {
  const reader = await enter(page);
  const inspector = page.getByRole('complementary', {
    name: 'Evidence inspector',
  });
  for (const section of selection.sections) {
    if (section.kind === 'context')
      await reader
        .getByRole('button', { name: section.title, exact: true })
        .click();
    const passages =
      section.kind === 'principal'
        ? [...selection.introduction, ...section.passages]
        : section.passages;
    for (const passage of passages) {
      const block = reader.locator('[data-passage-id="' + passage.id + '"]');
      await expect(block.locator(':scope > p')).toHaveText(passage.text);
      await block.locator('summary').focus();
      await page.keyboard.press('Enter');
      await expect(block.locator('[data-passage-claim-id]')).toHaveCount(
        passage.claimIds.length,
      );
      for (const id of passage.claimIds) {
        const trigger = block.locator('[data-passage-claim-id="' + id + '"]');
        await expect(trigger.locator('code')).toHaveText(id);
        await trigger.focus();
        await page.keyboard.press('Enter');
        await expect(inspector.locator('.claim-title')).toHaveText(
          data.claims.find((c) => c.id === id)!.statement,
        );
        await inspector.getByRole('button', { name: 'Close ×' }).click();
        await expect(trigger).toBeFocused();
        await expect(
          reader.locator('[data-branch-id="' + section.id + '"]'),
        ).toBeVisible();
      }
      await block.locator('summary').click();
    }
  }
});
