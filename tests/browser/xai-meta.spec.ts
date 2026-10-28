import { expect, test } from './fixtures';
import AxeBuilder from '@axe-core/playwright';
import { dossierCount } from './dossier-count';
import { readFileSync } from 'node:fs';
import type { Claim, Evidence, Source } from '../../src/domain/schema';

const claims = JSON.parse(readFileSync('data/claims.json', 'utf8')) as Claim[];
const evidenceRecords = JSON.parse(
  readFileSync('data/evidence.json', 'utf8'),
) as Evidence[];
const sources = JSON.parse(
  readFileSync('data/sources.json', 'utf8'),
) as Source[];

const examples = {
  xai: {
    name: 'xAI',
    // 44 before week 4b, plus the December 2025 framework's quoted statement
    // that it complies with California SB 53, plus week 4c's Seoul and EU
    // listings, its announced EU intent and its framework's EU Code link.
    count: 49,
    seeds: 48,
    claims: [
      'xm-spacex-acquisition',
      'xm-babuschkin-departure',
      'xm-formal-verification',
      'xm-colossus-aggregate',
      'xm-open-weights',
    ],
  },
  meta: {
    name: 'Meta',
    // 22 before week 4a, plus two Meta issue records and one replacement,
    // plus week 4c's White House and Seoul listings, its EU refusal and its
    // framework's Seoul link, plus Daniel Gross's two earlier SSI records
    // once the lab genealogy (2026-10-17) placed him at Meta.
    count: 31,
    seeds: 31,
    claims: [
      'xm-meta-name',
      'xm-pineau-cohere',
      'xm-llama-transformer',
      'xm-rsc-plan',
      'xm-pytorch-governance',
    ],
  },
};
const sections = [
  'Chronology',
  'People & paths',
  'Ideas & documents',
  'Capital & compute',
  'Governance',
];

for (const [id, sample] of Object.entries(examples)) {
  for (const width of [1440, 390]) {
    test(`${sample.name} dossier: all sections, sources and keyboard at ${width}px`, async ({
      page,
    }) => {
      const errors: string[] = [];
      page.on('pageerror', (error) => errors.push(error.message));
      page.on('console', (message) => {
        if (message.type() === 'error') errors.push(message.text());
      });
      await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 });
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.goto('/dossier/' + id);
      const dossier = page.getByRole('article', {
        name: sample.name + ' institutional dossier',
      });
      await expect(
        page
          .getByRole('navigation', { name: 'Explore the dataset' })
          .getByRole('button', { name: sample.name, exact: true }),
      ).toBeVisible();
      // Lab genealogy records (2026-10-17) are seeds added to the count.
      const count = dossierCount(id, sample.count);
      await expect(dossier).toContainText(`${count} claims ·`);
      await expect(dossier).toContainText(
        `${sample.seeds + count - sample.count} not editorially accepted`,
      );
      for (let i = 0; i < sections.length; i++) {
        await dossier
          .getByRole('button', { name: sections[i], exact: false })
          .click();
        const section = dossier.getByRole('region', {
          name: sections[i],
          exact: true,
        });
        await expect(section.locator('.empty-note')).toHaveCount(0);
        const trigger = section.locator(
          `[data-claim-id="${sample.claims[i]}"]`,
        );
        const group = section.locator('.dossier-group').filter({
          has: page.locator(`[data-claim-id="${sample.claims[i]}"]`),
        });
        if ((await group.getAttribute('open')) === null)
          await group.locator(':scope > summary').click();
        await trigger.focus();
        await page.keyboard.press('Enter');
        const inspector = page.getByRole('complementary', {
          name: 'Evidence inspector',
        });
        await expect(inspector).toBeFocused();
        await expect(inspector).toContainText('Machine-checked');
        const claim = claims.find((c) => c.id === sample.claims[i])!;
        const evidence = evidenceRecords.find(
          (e) => e.id === claim.evidenceIds[0],
        )!;
        const source = sources.find((s) => s.id === evidence.sourceId)!;
        await expect(inspector).toContainText(evidence.locator);
        await expect(inspector).toContainText(claim.qualification);
        await expect(
          inspector.locator('.source-title').first(),
        ).toHaveAttribute('href', source.evidenceUrl);
        if (i === 3)
          await page.screenshot({
            path: `.local/${id}-${width}-compute-evidence.png`,
            fullPage: true,
          });
        await inspector.getByRole('button', { name: 'Close ×' }).click();
        await expect(trigger).toBeFocused();
      }
      await dossier.getByRole('button', { name: 'People & paths' }).click();
      await page.screenshot({
        path: `.local/${id}-${width}-people.png`,
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
}
