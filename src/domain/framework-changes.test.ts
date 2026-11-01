import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { repository } from './repository';
import { resolveReference } from './deep-links';
import { comparisonView } from './framework-comparison';
import { frameworkChangesView, locatedStatuses } from './framework-changes';
import {
  frameworkChangesStarter,
  frameworkChangesStarterMarkdown,
} from './framework-changes-starter';
import { frameworkChanges as collection } from '../reading/framework-changes';
import { frameworkComparison } from '../reading/framework-comparison';
import { applicationCollections } from '../release/collections';
import { pageMeta, pagePaths } from '../prerender/pages';
import { renderPage } from '../prerender/render';

const data = repository.data;
const view = frameworkChangesView(data, collection, frameworkComparison);
const compare = comparisonView(data, frameworkComparison);
const claims = new Map(data.claims.map((c) => [c.id, c]));
const path = '/guide/frontier-frameworks-by-edition';

/** Words that state a trend or an assessment; never in the page's own text. */
const trendWords =
  /(?<![\w-])(tighten(ed|ing|s)?|weaken(ed|ing|s)?|matur(ed|ing|ity|e)|loosen(ed|ing|s)?|strengthen(ed|ing|s)?|soften(ed|ing|s)?|stricter|laxer|improv(ed|ement|es|ing)|progress(ed|ive)?|evolv(ed|es|ing)|evolution|watered|rolled back|backslid\w*|retreat(ed|s)?|expanded|narrowed|broadened|diluted|eroded|regress\w*|caused|because of|in response|led to)\b/i;

/** The page text without passages, notes and statements taken from records. */
function ownText(html: string) {
  const root = html.slice(html.indexOf('<div id="root"'));
  return root
    .replace(/<(\w+)[^>]*data-record-text[^>]*>[^<]*<\/\1>/g, ' ')
    .replace(/<ul class="record-rows">[\s\S]*?<\/ul>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ');
}

describe('frameworks edition by edition', () => {
  it('opens at its own address and is built as a page', () => {
    expect(resolveReference(path, data)).toEqual({
      target: { kind: 'guide', id: collection.id },
      notice: null,
    });
    expect(pagePaths(data)).toContain(path);
    expect(pageMeta(data, path)?.title).toBe(
      'Frontier AI safety frameworks, edition by edition, 2023–2026 · Selekoa',
    );
  });

  it('is not yet a release collection', () => {
    expect(
      applicationCollections.some((c) => c.definition.id === collection.id),
    ).toBe(false);
  });

  it('reads every edition on every comparison question', () => {
    expect(view.editionCount).toBe(22);
    expect(view.questionCount).toBe(18);
    expect(view.families.map((f) => f.family)).toEqual(
      frameworkComparison.families,
    );
    for (const f of view.families)
      for (const q of f.questions) {
        expect(q.cells.map((c) => c.edition.id)).toEqual(
          compare.columns
            .find((c) => c.family === f.family)!
            .editions.map((e) => e.id),
        );
        for (const c of q.cells) {
          const recorded = compare.cell(c.edition.id, q.facet.id);
          expect(c.status).toBe(recorded.status);
          expect(c.claim?.id).toBe(recorded.claim?.id);
        }
      }
  });

  it('computes a step only from the two cells’ own statuses and passages', () => {
    let status = 0;
    for (const f of view.families)
      for (const q of f.questions) {
        expect(q.steps).toHaveLength(q.cells.length - 1);
        for (const s of q.steps) {
          if (s.from.status === 'not-applicable')
            expect(s.difference).toBe('not-applicable');
          else if (s.from.status !== s.to.status) {
            expect(s.difference).toBe('status');
            status++;
          } else if (s.difference === 'same')
            expect(s.from.passages.map((e) => e.passage).sort()).toEqual(
              s.to.passages.map((e) => e.passage).sort(),
            );
          else expect(s.difference).toBe('passage');
          // A recorded absence carries its search record, never a passage.
          for (const c of [s.from, s.to])
            if (c.status === 'not-found') expect(c.passages).toHaveLength(0);
        }
      }
    expect(status).toBeGreaterThan(0);
    // The first edition of each framework has no step into it.
    const rsp = view.families.find((f) => f.family === 'anthropic-rsp')!;
    expect(rsp.questions[0].steps[0].from.edition.id).toBe('rsp-2023');
    const fgf = view.families.find(
      (f) => f.family === 'openai-frontier-governance',
    )!;
    for (const q of fgf.questions) expect(q.steps).toHaveLength(0);
  });

  it('gives the earliest located edition in the compared editions', () => {
    for (const row of view.earliest)
      for (const f of row.families) {
        const { cells } = view.families
          .find((x) => x.family === f.family)!
          .questions.find((q) => q.facet.id === row.facet.id)!;
        const index = cells.findIndex((c) =>
          locatedStatuses.includes(c.status),
        );
        expect(f.located).toBe(index < 0 ? null : cells[index]);
        const applies = cells.findIndex((c) => c.status !== 'not-applicable');
        expect(f.firstEdition).toBe(index >= 0 && index === applies);
        if (f.stated) {
          expect(f.located!.status).toBe('partly');
          expect(f.stated.status).toBe('stated');
        }
      }
    // Every edition of a framework was compared, so a dash means none recorded.
    const dashes = view.earliest.flatMap((r) =>
      r.families.filter((f) => !f.located),
    );
    for (const d of dashes) {
      const { cells } = view.families
        .find((x) => x.family === d.family)!
        .questions.find((q) =>
          view.earliest.some(
            (r) => r.facet.id === q.facet.id && r.families.includes(d),
          ),
        )!;
      for (const c of cells) expect(locatedStatuses).not.toContain(c.status);
    }
  });

  it('lists the editions read from archive copies, and no held cell', () => {
    expect(view.archiveCells.map((a) => a.edition.id).sort()).toEqual([
      'faif-2026',
      'meta-faf-v1-1',
    ]);
    expect(view.notChecked).toEqual([]);
    for (const f of view.families)
      for (const q of f.questions)
        for (const c of q.cells) expect(c.status).not.toBe('not-checked');
    for (const n of collection.notCovered)
      for (const id of n.claimIds) expect(claims.has(id), id).toBe(true);
  });

  it('states no trend, cause or assessment in its own text', async () => {
    const authored = [
      collection.title,
      collection.question,
      ...collection.reading,
      ...collection.notCovered.map((n) => n.text),
      ...collection.limits,
    ].join(' ');
    expect(authored).not.toMatch(trendWords);
    const template = readFileSync('index.html', 'utf8');
    const html = await renderPage(path, template, 'https://example.org/');
    const text = ownText(html!);
    expect(text).toContain('Across developers: earliest located');
    expect(text.match(trendWords)).toBeNull();
  });

  it('exports a research starter with every cell and record', async () => {
    const starter = await frameworkChangesStarter(
      data,
      collection,
      frameworkComparison,
    );
    expect(starter.claims.map((c) => c.id).sort()).toEqual(
      [...view.claimIds].sort(),
    );
    expect(
      starter.frameworkChanges.families.flatMap((f) =>
        f.questions.flatMap((q) => q.cells),
      ),
    ).toHaveLength(22 * 18);
    const md = frameworkChangesStarterMarkdown(starter);
    expect(md).toContain('## Across developers: earliest located');
    expect(md).toContain('### Between consecutive editions');
    expect(md).toContain('## Not covered');
  });
});
