import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { repository } from './repository';
import { resolveReference } from './deep-links';
import { computeBuildoutView, recordFigures } from './compute-buildout';
import { computeBuildout as collection } from '../reading/compute-buildout';
import { propositionCollections } from '../reading/human-thought';
import {
  applicationCollections,
  collectionClaimIds,
} from '../release/collections';
import { propositionsView } from './propositions';
import {
  computeBuildoutStarter,
  computeBuildoutStarterMarkdown,
} from './compute-buildout-starter';
import { pageMeta, pagePaths } from '../prerender/pages';
import { renderPage } from '../prerender/render';
import { pageCodeOf } from '../ui/page-files';

const data = repository.data;
const view = computeBuildoutView(data, collection);
const claims = new Map(data.claims.map((c) => [c.id, c]));
const path = '/guide/ai-compute-2023-2026';

/**
 * Words that state a trend or a cause; never in the page's own text. The
 * brief names "boom", "race", "arms race", "surge", "led to" and "in
 * response"; their near relatives are added.
 */
const trendWords =
  /(?<![\w-])(booms?|booming|race|races|racing|arms race|surg(e|es|ed|ing)|led to|leads to|lead to|in response|in reaction|because of|as a result|result(ed|s)? in|caused|causing|driven by|spurred|triggered|prompted|fuel(l)?ed|soar(ed|ing|s)?|skyrocket\w*|explo(sion|sive|ded)|frenzy|rush|gold rush|scramble|escalat\w*|accelerat(ed|ing|ion))\b/i;

/** The page text without statements, figures and wording taken from records. */
function ownText(html: string) {
  const root = html.slice(html.indexOf('<div id="root"'));
  return root
    .replace(/<(\w+)[^>]*data-record-text[^>]*>[^<]*<\/\1>/g, ' ')
    .replace(/<ul class="record-rows">[\s\S]*?<\/ul>/g, ' ')
    .replace(/aria-label="[^"]*"/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ');
}

const authored = [
  collection.title,
  collection.question,
  collection.bounds,
  ...collection.orientation.map((o) => o.text),
  ...collection.sections.flatMap((s) => [
    s.title,
    s.note ?? '',
    ...s.groups.map((g) => g.heading),
  ]),
  collection.orbit.text,
  ...collection.notCovered.map((n) => n.text),
  ...collection.limits,
].join(' ');

describe('the compute guide', () => {
  it('opens at its own address, is built as a page and loads its own code', () => {
    expect(resolveReference(path, data)).toEqual({
      target: { kind: 'guide', id: collection.id },
      notice: null,
    });
    expect(pagePaths(data)).toContain(path);
    expect(pageMeta(data, path)?.title).toBe(`${collection.title} · Selekoa`);
    expect(pageCodeOf(path)).toEqual(['ComputeBuildout']);
    expect(pageCodeOf('/guide/frontier-frameworks-and-law')).toEqual([
      'FrameworksLaw',
      'FrameworkChanges',
    ]);
  });

  it('is not yet a release collection, and is ready to be registered', () => {
    expect(
      applicationCollections.some((c) => c.definition.id === collection.id),
    ).toBe(false);
    // Registering it is one entry in applicationCollections: the release
    // reader already resolves it to the page's records.
    expect(
      collectionClaimIds(data, { kind: 'guide', definition: collection }),
    ).toEqual(view.claimIds);
  });

  it('places every record of the pack exactly once, without the arguments', () => {
    // The arguments about compute in orbit are their own collection; the one
    // record dated before the page's period is listed under "Not covered".
    const orbit = collection.orbit.collectionId;
    const argumentIds = new Set(
      propositionsView(
        data,
        propositionCollections.find((c) => c.id === orbit)!,
      ).claimIds,
    );
    const earlier = 'cpo-orb-ascend-study-chosen';
    const pack = data.claims
      .filter(
        (c) =>
          c.id.startsWith('cpo-') &&
          !argumentIds.has(c.id) &&
          !c.predicate.endsWith('_proposition') &&
          c.id !== earlier,
      )
      .map((c) => c.id)
      .sort();
    const placed = view.records.map((r) => r.claim.id);
    expect(new Set(placed).size).toBe(placed.length);
    expect([...placed].sort()).toEqual(pack);
    expect(placed).toHaveLength(167);
    expect(placed.some((id) => argumentIds.has(id))).toBe(false);
    expect(
      collection.notCovered.some((n) => n.claimIds.includes(earlier)),
    ).toBe(true);
    for (const id of [
      ...collection.orientation.flatMap((o) => o.claimIds),
      ...collection.notCovered.flatMap((n) => n.claimIds),
    ])
      expect(claims.has(id), id).toBe(true);
    expect(
      propositionCollections.some(
        (c) => c.id === collection.orbit.collectionId,
      ),
    ).toBe(true);
  });

  it('dates each row by its record, never by a stated date', () => {
    expect(view.timeline).toHaveLength(view.records.length);
    for (const r of view.timeline) {
      const time = r.claim.time;
      expect(time.kind === 'event' || time.kind === 'snapshot').toBe(true);
      if (time.kind === 'event' || time.kind === 'snapshot')
        expect(r.date).toBe(time.date);
      expect(r.announcement).toBe(
        time.kind === 'event' && time.basis === 'announcement',
      );
    }
    const dates = view.timeline.map((r) => r.date!);
    expect([...dates].sort()).toEqual(dates);
    expect(dates[0] >= String(collection.period.from)).toBe(true);
    expect(dates.at(-1)! < String(collection.period.to + 1)).toBe(true);
    // Every stated date is listed apart, with who stated it.
    const stored = view.records.flatMap(
      (r) => r.claim.attributes?.statedDates ?? [],
    );
    expect(view.stated).toHaveLength(stored.length);
    expect(stored.length).toBeGreaterThan(40);
  });

  it('dates regulator decisions by their own records', () => {
    const decisions = view.records.filter(
      (r) => r.claim.predicate === 'regulator_decision',
    );
    expect(decisions).toHaveLength(4);
    for (const r of decisions) {
      expect(r.claim.time.kind).toBe('event');
      expect(r.date).toBe(
        r.claim.time.kind === 'event' ? r.claim.time.date : null,
      );
    }
    const ferc = decisions.find(
      (r) => r.claim.id === 'cpo-pw-ferc-susquehanna-isa-rejected',
    )!;
    expect(ferc.date).toBe('2024-11-01');
    expect(ferc.announcement).toBe(false);
  });

  it('shows each figure as stored, with what it measures, and never sums one', () => {
    let quantities = 0;
    let amounts = 0;
    for (const r of view.records) {
      const a = r.claim.attributes;
      const figures = recordFigures(r.claim);
      expect(r.figures).toEqual(figures);
      expect(figures).toHaveLength((a?.quantity ? 1 : 0) + (a?.amount ? 1 : 0));
      for (const f of figures) {
        if (f.kind === 'quantity') {
          quantities++;
          expect(f.value.endsWith(a!.quantity!.unit)).toBe(true);
          if (a!.quantity!.measures === 'not_stated' || !a!.quantity!.measures)
            expect(f.measures ?? 'not stated').toBe('not stated');
          if (!a!.quantity!.bound && !a!.quantity!.range)
            expect(f.bound).toBe('not stated');
        } else {
          amounts++;
          expect(f.value.startsWith(a!.amount!.currency)).toBe(true);
          expect(f.scope).toBeTruthy();
        }
      }
    }
    expect(view.figures).toHaveLength(quantities + amounts);
    // A range keeps both ends; a figure of unstated measure says so.
    const rfp = view.records.find(
      (r) => r.claim.id === 'cpo-pw-meta-nuclear-rfp',
    )!;
    expect(rfp.figures[0].value).toMatch(/^1–4 GW/);
    const hyperion = view.records.find(
      (r) => r.claim.id === 'cpo-dc-meta-hyperion-5gw-2025',
    )!;
    expect(hyperion.figures[0].measures).toBe('not stated');
    expect(hyperion.figures[0].bound).toBe('up to');
    // An investor's commitment is never shown as a round's total.
    for (const f of view.figures)
      if (f.scope?.includes('round')) expect(f.scope).toContain('not one');
    expect(
      view.records.find(
        (r) => r.claim.id === 'cpo-ch-nvidia-anthropic-investment',
      )!.figures[0].scope,
    ).toBe('one transaction: this investor’s commitment');
    // The authored text states no figure of its own.
    expect(authored).not.toMatch(/\d\s*(GW|MW|gigawatt|megawatt|billion)/i);
  });

  it('labels plans and announcements as stated, never as achieved', () => {
    for (const r of view.records) {
      const stage = r.claim.attributes?.transactionStage;
      if (stage === 'planned') expect(r.stage).toBe('plan');
      if (stage === 'letter_of_intent')
        expect(r.stage).toBe('letter of intent');
    }
    // "Whether" or "does not show that" a site was built is allowed.
    expect(authored).not.toMatch(
      /(?<!(?:whether|that) (?:an? )?[\w-]+(?: [\w-]+)? )\b(was|were|has been|have been) (built|completed|delivered|achieved)\b/i,
    );
  });

  it('states no trend or cause in its own text', async () => {
    expect(trendWords.test('the AI boom')).toBe(true);
    expect(trendWords.test('which led to new rules')).toBe(true);
    expect(trendWords.test('an arms race')).toBe(true);
    expect(trendWords.test('in response to demand')).toBe(true);
    expect(authored).not.toMatch(trendWords);
    const template = readFileSync('index.html', 'utf8');
    const html = await renderPage(path, template, 'https://example.org/');
    const text = ownText(html!);
    expect(text).toContain('Stated dates: targets, deadlines and terms');
    expect(text).toContain('Read the arguments about compute in orbit');
    expect(text.match(trendWords)).toBeNull();
  });

  it('exports a research starter that lists every figure and sums none', async () => {
    const starter = await computeBuildoutStarter(data, collection);
    expect(starter.claims.map((c) => c.id).sort()).toEqual(
      [...view.claimIds].sort(),
    );
    const figures = starter.computeBuildout.sections.flatMap((s) =>
      s.groups.flatMap((g) => g.records.flatMap((r) => r.figures)),
    );
    expect(figures).toHaveLength(view.figures.length);
    expect(starter.computeBuildout.timeline).toHaveLength(167);
    expect(starter.computeBuildout.statedDates).toHaveLength(
      view.stated.length,
    );
    const md = computeBuildoutStarterMarkdown(starter);
    expect(md).toContain('## Timeline');
    expect(md).toContain('## Stated dates (targets, deadlines and terms');
    expect(md).toContain('## Compute in orbit: plans and filings');
    expect(md).toContain('## Not covered');
    expect(md).toContain('none is added up, converted or compared');
    // No total, trend or cause appears in the starter's own text: the
    // lines that carry record statements, wording and figures are removed.
    const own = md
      .split('## Records')[0]
      .replace(/^- .*\((cpo|fl|openai|abilene)-[^)]*\)$/gm, '')
      .replace(/^ {2}- .*$/gm, '');
    expect(own).not.toMatch(/\b(total|in all|combined|altogether|sum)\b/i);
    expect(own).not.toMatch(trendWords);
  });
});
