import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readFileSync } from 'node:fs';
import { datasetSchema } from '../../src/domain/schema';
import { personProfile } from '../../src/domain/person-profile';
import { documentRecord } from '../../src/domain/document-record';
import { questionPath } from '../../src/domain/research-path';
import {
  personProjectionVersion,
  personStarter,
  personStarterMarkdown,
  starterJson,
} from '../../src/domain/starter';

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

function collectErrors(page: Page) {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  return errors;
}

async function setTheme(page: Page, theme: 'light' | 'dark') {
  const toggle = page.getByRole('button', { name: 'Dark mode' });
  if ((await toggle.getAttribute('aria-pressed')) !== String(theme === 'dark'))
    await toggle.click();
  await expect(page.locator('html')).toHaveAttribute(
    'data-selekoa-theme',
    theme,
  );
}

async function noViolations(page: Page) {
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .analyze()
    ).violations,
  ).toEqual([]);
}

const fitsViewport = (page: Page) =>
  page.evaluate(
    () => document.documentElement.scrollWidth <= window.innerWidth,
  );

const leikeOpenAI = 'jan-leike-openai-superalignment-2023';

test('People A–Z reaches Jan Leike’s documented path and OpenAI evidence quickly, by keyboard', async ({
  page,
}) => {
  const errors = collectErrors(page);
  await page.goto('/#/institutions');
  const started = Date.now();
  const entry = page
    .locator('.people-az')
    .getByRole('button', { name: 'Jan Leike', exact: true });
  await entry.focus();
  await page.keyboard.press('Enter');
  const person = page.getByRole('article', { name: 'Jan Leike: person page' });
  const path = person.getByRole('region', { name: 'Documented path' });
  const row = path.locator(`[data-claim-id="${leikeOpenAI}"]`);
  await expect(row).toContainText('Superalignment co-lead');
  await row.focus();
  await page.keyboard.press('Enter');
  const inspector = page.getByRole('complementary', {
    name: 'Evidence inspector',
  });
  await expect(inspector).toBeFocused();
  await expect(inspector.locator('.claim-title')).toHaveText(
    data.claims.find((c) => c.id === leikeOpenAI)!.statement,
  );
  await expect(inspector.locator('a.source-title')).toHaveAttribute(
    'href',
    data.sources.find((s) => s.id === 'source-openai-superalignment-2023')!
      .evidenceUrl,
  );
  // Well inside the 30-second budget for a person, including page loads.
  expect(Date.now() - started).toBeLessThan(10000);
  await expect(page).toHaveURL(
    new RegExp(`#/person/jan-leike\\?inspect=${leikeOpenAI}$`),
  );
  await inspector.getByRole('button', { name: 'Close ×' }).click();
  await expect(row).toBeFocused();
  expect(errors).toEqual([]);
});

test('person page keeps snapshots, undated roles and computed limits distinct', async ({
  page,
}) => {
  const errors = collectErrors(page);
  const profile = personProfile(data, 'jan-leike')!;
  await page.goto('/#/person/jan-leike');
  const person = page.getByRole('article', { name: 'Jan Leike: person page' });
  await expect(person.getByRole('heading', { level: 1 })).toHaveText(
    'Jan Leike',
  );
  await expect(person).toContainText(profile.person.description);
  const path = person.getByRole('region', { name: 'Documented path' });
  await expect(
    path.locator(`[data-time-kind="snapshot"]`).filter({ hasText: 'OpenAI' }),
  ).toContainText('Snapshot · one dated report');
  const undated = path.getByRole('list', { name: 'Undated' });
  await expect(undated.locator('[data-claim-id]')).toHaveCount(
    profile.undated.length,
  );
  for (const e of profile.undated)
    await expect(
      undated.locator(`[data-claim-id="${e.claim.id}"]`),
    ).toBeVisible();
  const limits = person.getByRole('region', {
    name: 'What this record cannot tell you',
  });
  for (const gap of profile.gaps)
    await expect(limits.locator(`[data-gap="${gap.id}"]`)).toContainText(
      gap.text,
    );
  const works = person.getByRole('region', { name: 'Works authored' });
  await expect(works.locator('[data-claim-id]')).toHaveCount(
    profile.works.length,
  );
  // No labels, vague association or inferred transition language.
  for (const phrase of ['associated with', 'moved to', 'joined', 'left '])
    await expect(person).not.toContainText(phrase);
  // Every record row opens the Evidence Inspector.
  const inspector = page.getByRole('complementary', {
    name: 'Evidence inspector',
  });
  for (const id of profile.claimIds) {
    await person
      .locator(`button.doc-claim[data-claim-id="${id}"]`)
      .first()
      .click();
    await expect(inspector.locator('.claim-title')).toHaveText(
      data.claims.find((c) => c.id === id)!.statement,
    );
  }
  await works
    .getByRole('button', {
      name: 'Deep reinforcement learning from human preferences: document page →',
    })
    .click();
  await expect(page).toHaveURL(/#\/document\/human-preferences-paper$/);
  expect(errors).toEqual([]);
});

test('person starter downloads match the deterministic domain export', async ({
  page,
}) => {
  await page.goto('/#/person/jan-leike');
  await page.getByText('Download research starter', { exact: true }).click();
  const starter = await personStarter(data, 'jan-leike');
  for (const [label, extension, expected] of [
    ['Download Markdown', 'md', personStarterMarkdown(starter)],
    ['Download JSON', 'json', starterJson(starter)],
  ]) {
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: label, exact: true }).click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe(
      `jan-leike-person-v${personProjectionVersion}-starter.${extension}`,
    );
    expect(readFileSync((await download.path())!, 'utf8')).toBe(expected);
  }
});

test('neighbourhood map is a secondary, keyboard-reachable tab', async ({
  page,
}) => {
  const errors = collectErrors(page);
  await page.goto('/#/person/sam-altman');
  const tabs = page.getByRole('tablist', { name: 'Person page views' });
  const record = tabs.getByRole('tab', { name: 'Documented record' });
  await expect(record).toHaveAttribute('aria-selected', 'true');
  await record.focus();
  await page.keyboard.press('ArrowRight');
  const map = tabs.getByRole('tab', { name: 'Connections map' });
  await expect(map).toBeFocused();
  await expect(map).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByTestId('network').locator('canvas')).not.toHaveCount(
    0,
  );
  await page.keyboard.press('ArrowLeft');
  await expect(
    page.getByRole('region', { name: 'Governance roles' }),
  ).toContainText('removal as CEO');
  expect(errors).toEqual([]);
});

test('document page separates citation, credit and reported method use', async ({
  page,
}) => {
  const errors = collectErrors(page);
  const record = documentRecord(data, 'human-preferences-paper')!;
  await page.goto('/#/document/human-preferences-paper');
  const article = page.getByRole('article', {
    name: record.document.name + ': document page',
  });
  const dates = article.locator('.record-dates').first();
  await expect(dates.getByRole('listitem')).toHaveCount(1);
  await expect(dates).toContainText('Published 2017-06-12');
  await expect(dates.locator('[data-claim-id]')).toHaveCount(
    record.authored.length,
  );
  await expect(
    article.getByRole('link', { name: /Deep reinforcement learning/ }),
  ).toHaveAttribute('href', record.exactSources[0].evidenceUrl);
  for (const relation of record.relations.filter((r) => r.claims.length)) {
    const region = article.locator(`[data-relation="${relation.id}"]`);
    await expect(region.getByRole('heading')).toContainText(relation.label);
    await expect(region.locator('[data-claim-id]')).toHaveCount(
      relation.claims.length,
    );
  }
  await expect(article).toContainText(
    'No other versions of this document are recorded',
  );
  await article.locator('[data-relation="cites"] [data-claim-id]').click();
  await expect(
    page.getByRole('complementary', { name: 'Evidence inspector' }),
  ).toContainText('Citation alone is neither agreement');
  await page.goto('/#/document/rsp-v2-0');
  const versions = page.getByRole('region', { name: 'Versions' });
  await expect(versions.locator('[aria-current="true"]')).toContainText(
    'v2.0 (this version)',
  );
  const v2dates = page.locator('.record-dates').first();
  await expect(v2dates.getByRole('listitem')).toHaveText([
    'Published not established',
    /^Effective 2024-10-15 issue evidence/,
  ]);
  await expect(versions).toContainText('Replaces');
  await expect(versions).toContainText('Replaced by');
  await versions.getByRole('button', { name: 'v2.1', exact: true }).click();
  await expect(page).toHaveURL(/#\/document\/rsp-v2-1$/);
  expect(errors).toEqual([]);
});

test('every person and document entity has a page that lists all its claims', async ({
  page,
}) => {
  const errors = collectErrors(page);
  await page.goto('/');
  for (const entity of data.entities.filter(
    (e) => e.type === 'person' || e.type === 'document',
  )) {
    await page.evaluate(
      ([kind, id]) => {
        window.location.hash = `#/${kind}/${id}`;
      },
      [entity.type, entity.id],
    );
    const article = page.getByRole('article', {
      name: `${entity.name}: ${entity.type} page`,
    });
    await expect(article.getByRole('heading', { level: 1 })).toHaveText(
      entity.name,
    );
    const related = data.claims.filter(
      (c) =>
        c.subject === entity.id ||
        (c.object.kind === 'entity' && c.object.entityId === entity.id),
    );
    for (const c of related)
      await expect(
        article.locator(`[data-claim-id="${c.id}"]`).first(),
      ).toBeAttached();
  }
  expect(errors).toEqual([]);
});

test('person links from search, dossiers and the inspector open person pages', async ({
  page,
}) => {
  await page.goto('/#/explore');
  await page.getByRole('searchbox').fill('Jan Leike');
  await page
    .getByRole('button', { name: 'Jan Leike: person page', exact: true })
    .click();
  await expect(page).toHaveURL(/#\/person\/jan-leike$/);
  await page.goto('/#/dossier/anthropic');
  await page
    .getByRole('group', { name: 'Dossier sections' })
    .getByRole('button', { name: /People/ })
    .click();
  const group = page.locator('details.dossier-group', {
    has: page.locator('summary', { hasText: 'Dario Amodei' }),
  });
  await group.evaluate((d) => ((d as HTMLDetailsElement).open = true));
  await group
    .getByRole('button', {
      name: 'Dario Amodei: person page →',
    })
    .click();
  await expect(page).toHaveURL(/#\/person\/dario-amodei$/);
  await page.goto('/#/claim/' + leikeOpenAI);
  await page
    .getByRole('complementary', { name: 'Evidence inspector' })
    .getByRole('button', { name: 'Jan Leike', exact: true })
    .click();
  await expect(page).toHaveURL(/#\/person\/jan-leike$/);
  await page
    .getByRole('button', {
      name: 'See Jan Leike’s connections in the explorer →',
    })
    .click();
  await page.getByRole('button', { name: 'Claims', exact: true }).click();
  await expect(page.getByLabel('Claims list').getByRole('button')).toHaveCount(
    personProfile(data, 'jan-leike')!.claimIds.length,
  );
  await page
    .getByRole('complementary', { name: 'Entity inspector' })
    .getByRole('button', { name: /Read the person page/ })
    .click();
  await expect(page).toHaveURL(/#\/person\/jan-leike$/);
});

test('question page computes disputes and open questions; reading links still resolve', async ({
  page,
}) => {
  const errors = collectErrors(page);
  const question = questionPath(data, 'anthropic-formation')!;
  await page.goto('/#/reading/anthropic-formation?section=personnel');
  await expect(page).toHaveURL(
    /#\/question\/anthropic-formation\?section=personnel&claim=/,
  );
  await expect(page.locator('[data-branch-id]')).toHaveAttribute(
    'data-branch-id',
    'personnel',
  );
  const disputed = page.getByRole('region', { name: 'What is disputed' });
  await expect(disputed).toContainText(
    'No selected record is contested or unresolved',
  );
  for (const q of question.openQuestionList)
    await expect(page.locator(`[data-open-question="${q.id}"]`)).toContainText(
      q.text,
    );
  await page.goto('/#/question/anthropic-formation');
  await expect(
    page.getByRole('article', { name: 'Anthropic guided research path' }),
  ).toBeVisible();
  // A reading page: no explorer sidebar, display switch or map caption.
  await expect(
    page.getByRole('navigation', { name: 'Explore the dataset' }),
  ).toHaveCount(0);
  await expect(page.getByRole('group', { name: 'Display mode' })).toHaveCount(
    0,
  );
  await expect(
    page.getByText('same claims and evidence as the map'),
  ).toHaveCount(0);
  expect(errors).toEqual([]);
});

for (const width of [1440, 390])
  for (const theme of ['light', 'dark'] as const)
    test(`record pages ${width}px ${theme}: layout, accessibility and console`, async ({
      page,
    }, testInfo) => {
      const errors = collectErrors(page);
      await page.setViewportSize({ width, height: 1000 });
      await page.emulateMedia({ reducedMotion: 'reduce' });
      for (const hash of [
        '#/person/jan-leike',
        '#/person/durk-kingma',
        '#/document/human-preferences-paper',
        '#/document/rsp-v3-0',
        '#/question/anthropic-formation',
      ]) {
        await page.goto('/' + hash);
        await setTheme(page, theme);
        await expect(page.getByRole('article')).toBeVisible();
        expect(await fitsViewport(page)).toBe(true);
        await noViolations(page);
        await page.screenshot({
          path: testInfo.outputPath(hash.replaceAll('/', '_') + '.png'),
          fullPage: true,
        });
      }
      await page.goto('/#/person/jan-leike?inspect=' + leikeOpenAI);
      await setTheme(page, theme);
      expect(await fitsViewport(page)).toBe(true);
      await noViolations(page);
      expect(errors).toEqual([]);
    });

test('person page sources keep the original address and add the archived copy', async ({
  page,
}) => {
  const profile = personProfile(data, 'jay-kreps')!;
  const archived = profile.identitySources.filter((s) => s.archivedUrl);
  expect(archived.length).toBeGreaterThan(0);
  await page.goto('/#/person/jay-kreps');
  const identity = page.locator('.record-identity');
  for (const s of archived) {
    await expect(
      identity.getByRole('link', { name: s.title, exact: true }),
    ).toHaveAttribute('href', s.canonicalUrl);
    await expect(
      identity.getByRole('link', {
        name: new RegExp(`^Archived copy, captured ${s.archivedAt}`),
      }),
    ).toHaveAttribute('href', s.archivedUrl!);
  }
});
