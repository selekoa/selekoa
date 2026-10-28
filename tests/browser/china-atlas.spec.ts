import { expect, test } from './fixtures';
import AxeBuilder from '@axe-core/playwright';
import { readFileSync } from 'node:fs';
import type { Claim, Evidence, Source } from '../../src/domain/schema';
import { dossierCount } from './dossier-count';

const claims = JSON.parse(readFileSync('data/claims.json', 'utf8')) as Claim[];
const evidence = JSON.parse(
  readFileSync('data/evidence.json', 'utf8'),
) as Evidence[];
const sources = JSON.parse(
  readFileSync('data/sources.json', 'utf8'),
) as Source[];
const samples = [
  {
    id: 'deepseek',
    name: 'DeepSeek / 深度求索',
    label: 'DeepSeek',
    count: 10,
    claims: [
      'cn-deepseek-v3',
      'cn-liang-deepseek',
      'cn-r1-qwen',
      'cn-deepseek-h800',
      'cn-deepseek-r1-license',
    ],
  },
  {
    id: 'alibaba-group',
    name: 'Alibaba Group / 阿里巴巴集团',
    label: 'Alibaba / Qwen',
    count: 11,
    claims: [
      'cn-qwen-alibaba',
      'cn-junyang-lin-alibaba',
      'cn-qwen-ppo',
      'cn-alibaba-budget',
      'cn-alibaba-reorganisation',
    ],
  },
  {
    id: 'zhipu',
    name: 'Zhipu AI / 智谱',
    label: 'Zhipu AI',
    // 9 before week 4c, plus its listing for the Frontier AI Safety
    // Commitments (2024), plus Tang Jie's two earlier records once the lab
    // genealogy (2026-10-17) made Tang Jie one of its people.
    count: 12,
    claims: [
      'cn-zhipu-profile',
      'cn-wang-zhipu',
      'cn-zhipu-keg-origin',
      'cn-zhipu-convertible',
      'cn-zhipu-glm45-license',
    ],
  },
];
const sections = [
  'Chronology',
  'People & paths',
  'Ideas & documents',
  'Capital & compute',
  'Governance',
];

for (const sample of samples)
  for (const width of [1440, 390]) {
    test(`${sample.label}: discovery, five sections and source access at ${width}px`, async ({
      page,
    }) => {
      const errors: string[] = [];
      page.on('pageerror', (e) => errors.push(e.message));
      page.on('console', (m) => {
        if (m.type() === 'error') errors.push(m.text());
      });
      await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 });
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.goto('/explore');
      await page.locator('.collection-nav > summary').click();
      await expect(page.locator('.collection-nav')).toContainText(
        'no shared ownership, strategy or lineage',
      );
      await page
        .locator('.collection-nav')
        .getByRole('link', { name: sample.label, exact: true })
        .click();
      await expect(page).toHaveURL(new RegExp('/dossier/' + sample.id + '$'));
      const dossier = page.getByRole('article', {
        name: sample.name + ' institutional dossier',
      });
      // The 2026-10-17 lab genealogy adds records to these dossiers; the
      // earlier records keep their count.
      const count = dossierCount(sample.id, sample.count);
      await expect(dossier).toContainText(`${count} claims ·`);
      await expect(dossier).toContainText(`${count} not editorially accepted`);
      for (let i = 0; i < sections.length; i++) {
        await dossier
          .getByRole('button', { name: sections[i], exact: false })
          .click();
        const section = dossier.getByRole('region', {
          name: sections[i],
          exact: true,
        });
        await expect(section.locator('.empty-note')).toHaveCount(0);
        const selector = `[data-claim-id="${sample.claims[i]}"]`;
        const group = section
          .locator('.dossier-group')
          .filter({ has: page.locator(selector) });
        if ((await group.getAttribute('open')) === null)
          await group.locator(':scope > summary').click();
        const trigger = section.locator(selector);
        await trigger.focus();
        await page.keyboard.press('Enter');
        const inspector = page.getByRole('complementary', {
          name: 'Evidence inspector',
        });
        await expect(inspector).toBeFocused();
        const claim = claims.find((c) => c.id === sample.claims[i])!;
        const item = evidence.find((e) => e.id === claim.evidenceIds[0])!;
        const source = sources.find((s) => s.id === item.sourceId)!;
        await expect(inspector).toContainText(item.locator);
        await expect(inspector).toContainText(claim.qualification);
        await expect(inspector).toContainText('Machine-checked');
        await expect(
          inspector.locator('.source-title').first(),
        ).toHaveAttribute('href', source.evidenceUrl);
        if (i === 3)
          await page.screenshot({
            path: `.local/china-${sample.id}-${width}-evidence.png`,
            fullPage: true,
          });
        await inspector.getByRole('button', { name: 'Close ×' }).click();
        await expect(trigger).toBeFocused();
      }
      await dossier
        .getByRole('button', { name: 'Ideas & documents', exact: false })
        .click();
      await page.screenshot({
        path: `.local/china-${sample.id}-${width}-dossier.png`,
        fullPage: true,
      });
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
      expect(errors).toEqual([]);
    });
  }
