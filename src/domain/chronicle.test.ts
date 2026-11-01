import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { repository } from './repository';
import { referencePath, resolveReference } from './deep-links';
import {
  after,
  chronicleIndex,
  chronicleIndexOf,
  parseYearPageId,
  placements,
  yearPageIds,
  yearTopics,
  yearTotal,
  yearView,
  type ChronicleEntry,
} from './chronicle';
import { chronicleText } from '../reading/chronicle';
import { pageMeta, pagePaths } from '../prerender/pages';
import { searchablePages } from '../prerender/searchable-pages';
import { renderPage } from '../prerender/render';
import { pageCodeOf } from '../ui/page-files';
import { slicePath } from './slices';
import type { Claim, Dataset } from './schema';
import { collectionIndex, seedCollectionIndex } from './collection-index';
import { resolutionLabels } from './epistemics';
import { isProvisionRecord as isProvision } from './query';

const data = repository.data;
const index = chronicleIndexOf(data);
/** The latest check of each record's own evidence. */
const checked = new Map<string, string>();
for (const e of data.evidence)
  if ((checked.get(e.claimId) ?? '') < e.checkedAt)
    checked.set(e.claimId, e.checkedAt);
const scheduled = (c: Claim, date: string) => after(date, checked.get(c.id)!);
const views = new Map(
  index.years.map((y) => [y.year, yearView(data, y.year, null)]),
);
const entriesOf = (year: number): ChronicleEntry[] =>
  views.get(year)!.sections.flatMap((s) => s.months.flatMap((m) => m.entries));
const claimsOf = (entry: ChronicleEntry): Claim[] =>
  entry.kind === 'record' ? [entry.claim] : entry.claims;

/**
 * Words that state a trend, a cause or an assessment; never in the pages'
 * own text. The lists of the compute and edition guides, together.
 */
const trendWords =
  /(?<![\w-])(booms?|booming|race|races|racing|arms race|surg(e|es|ed|ing)|led to|leads to|lead to|in response|in reaction|because of|as a result|result(ed|s)? in|caused|causing|driven by|spurred|triggered|prompted|fuel(l)?ed|soar(ed|ing|s)?|skyrocket\w*|explo(sion|sive|ded)|frenzy|rush|gold rush|scramble|escalat\w*|accelerat(ed|ing|ion)|tighten(ed|ing|s)?|weaken(ed|ing|s)?|matur(ed|ing|ity|e)|loosen(ed|ing|s)?|strengthen(ed|ing|s)?|soften(ed|ing|s)?|stricter|laxer|improv(ed|ement|es|ing)|progress(ed|ive)?|evolv(ed|es|ing)|evolution|watered|rolled back|backslid\w*|retreat(ed|s)?|expanded|narrowed|broadened|diluted|eroded|regress\w*|turning point|milestone|landmark|watershed|breakthrough|pivotal|heyday|golden age|dawn of|rise of|decline|growing|grew|trend\w*|momentum)\b/i;

/** The page text without statements, names and wording taken from records. */
function ownText(html: string) {
  const root = html.slice(html.indexOf('<div id="root"'));
  return root
    .replace(/<(\w+)[^>]*data-record-text[^>]*>[^<]*<\/\1>/g, ' ')
    .replace(/aria-label="[^"]*"/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ');
}

const template = readFileSync('index.html', 'utf8');
const page = async (path: string) =>
  (await renderPage(path, template, 'https://example.org/'))!;

describe('the chronicle', () => {
  it('has a page for every year with a dated record or a stated date', () => {
    const years = new Set<number>();
    for (const c of data.claims) {
      for (const p of placements(c)) years.add(Number(p.date.slice(0, 4)));
      for (const d of c.attributes?.statedDates ?? [])
        if (d.date) years.add(Number(d.date.slice(0, 4)));
    }
    expect(index.years.map((y) => y.year)).toEqual(
      [...years].sort((a, b) => a - b),
    );
    const paths = new Set(pagePaths(data));
    expect(paths.has('/years')).toBe(true);
    for (const id of yearPageIds(data)) {
      const path = referencePath({ kind: 'year', id });
      expect(paths.has(path), path).toBe(true);
      expect(slicePath(path)).toBe(`/slices/year/${id}.json`);
      expect(pageCodeOf(path)).toEqual(['Chronicle']);
      expect(resolveReference(path, data).target).toEqual({ kind: 'year', id });
    }
    expect(slicePath('/years')).toBe('/slices/years.json');
  });

  it('lists every dated record under each year its date gives, once', () => {
    const placed = new Map<string, string[]>();
    for (const y of index.years)
      for (const entry of entriesOf(y.year))
        for (const c of claimsOf(entry))
          placed.set(c.id, [...(placed.get(c.id) ?? []), entry.date]);
    for (const c of data.claims) {
      const expected = placements(c)
        .filter((p) => !scheduled(c, p.date))
        .map((p) => p.date);
      expect(placed.get(c.id) ?? [], c.id).toEqual(expected);
    }
    // A record listed only within a group of provisions is settled.
    for (const y of index.years)
      for (const entry of entriesOf(y.year))
        if (entry.kind === 'provisions')
          for (const c of entry.claims)
            expect(c.resolution, c.id).toBe('supported');
    // An unknown date places nothing.
    const unknown = data.claims.filter((c) => c.time.kind === 'unknown');
    expect(unknown.length).toBeGreaterThan(0);
    for (const c of unknown) expect(placed.has(c.id)).toBe(false);
  });

  it('keeps each date as stored, with its kind and precision', () => {
    for (const y of index.years) {
      const view = views.get(y.year)!;
      for (const section of view.sections)
        for (const month of section.months)
          for (const entry of month.entries) {
            for (const claim of claimsOf(entry)) {
              const t = claim.time;
              const stored =
                t.kind === 'interval'
                  ? [t.from, t.until]
                  : t.kind === 'unknown'
                    ? []
                    : [t.date];
              // Never padded: the date is one the record stores.
              expect(stored).toContain(entry.date);
              if (t.kind === 'event')
                expect(entry.role).toBe(t.basis ?? 'event');
              if (t.kind === 'snapshot') expect(entry.role).toBe('snapshot');
            }
            expect(entry.precision).toBe(
              entry.date.length === 4
                ? 'year'
                : entry.date.length === 7
                  ? 'month'
                  : 'day',
            );
            // A year-only date sits under the year, a month-only date
            // under its month: never on an invented day or month.
            if (entry.precision === 'year') expect(month.id).toBe('year');
            else expect(month.id).toBe(entry.date.slice(5, 7));
          }
    }
  });

  it('orders each topic’s records by date, the year before its months', () => {
    for (const y of index.years)
      for (const section of views.get(y.year)!.sections) {
        const dates = section.months.flatMap((m) =>
          m.entries.map((e) => e.date),
        );
        expect(dates).toEqual([...dates].sort());
        expect(section.months.findIndex((m) => m.id === 'year')).toBeLessThan(
          1,
        );
      }
  });

  it('keeps stated and scheduled dates apart from the records', () => {
    let stated = 0;
    let scheduledDates = 0;
    for (const y of index.years) {
      const view = views.get(y.year)!;
      for (const s of view.stated) {
        expect(s.date.slice(0, 4)).toBe(String(y.year));
        if (s.scheduled) {
          scheduledDates += 1;
          // Judged against the record's own sources' latest check.
          expect(scheduled(s.claim, s.date)).toBe(true);
        } else {
          stated += 1;
          // A stated date comes from the record's stated dates, never its own date.
          expect(
            s.claim.attributes?.statedDates?.some((d) => d.date === s.date),
          ).toBe(true);
        }
      }
      for (const entry of entriesOf(y.year))
        for (const c of claimsOf(entry))
          expect(scheduled(c, entry.date), c.id).toBe(false);
      expect(view.stated.length).toBe(y.stated);
    }
    expect(stated).toBeGreaterThan(0);
    expect(scheduledDates).toBeGreaterThan(0);
    // A year with stated dates only has a page, and no records.
    const future = index.years.filter((y) => !yearTotal(y));
    expect(future.length).toBeGreaterThan(0);
    for (const y of future) expect(entriesOf(y.year)).toEqual([]);
    // An interval within one year is one entry; its end must not be a
    // scheduled date, or it would be shown as a record.
    for (const c of data.claims)
      for (const p of placements(c))
        if (p.until) expect(scheduled(c, p.until), c.id).toBe(false);
  });

  it('titles a year with stated dates only by its stated dates', async () => {
    const y = index.years.find((y) => !yearTotal(y))!;
    expect(pageMeta(data, `/year/${y.year}`)!.title).toBe(
      `Dates stated for ${y.year} · Selekoa`,
    );
    const text = ownText(await page(`/year/${y.year}`));
    expect(text).toContain(chronicleText.noRecords(y.year));
    expect(text).not.toContain(`records dated ${y.year}, in date order`);
  });

  it('counts each topic’s records as its page lists them', () => {
    for (const y of index.years) {
      const view = views.get(y.year)!;
      for (const section of view.sections)
        expect(
          section.months
            .flatMap((m) => m.entries)
            .reduce((n, e) => n + claimsOf(e).length, 0),
          `${y.year} ${section.topic}`,
        ).toBe(section.records);
      for (const topic of yearTopics(y)) {
        const one = yearView(data, y.year, topic);
        expect(one.sections.map((s) => s.topic)).toEqual([topic]);
        expect(one.stated.every((s) => s.claim.topic === topic)).toBe(true);
      }
    }
  });

  it('computes the same index from the whole dataset as it gives a part', () => {
    expect(chronicleIndex(data)).toEqual(index);
    // A part is given the whole dataset's index: an empty part still
    // resolves every year page.
    const empty = {
      ...data,
      claims: [],
      entities: [],
      sources: [],
      evidence: [],
    } as Dataset;
    // Unseeded, an empty part has no years.
    expect(parseYearPageId(empty, '2025')).toBeNull();
    const part = { ...empty } as Dataset;
    seedCollectionIndex(part, collectionIndex(data));
    expect(chronicleIndexOf(part)).toEqual(index);
    for (const id of yearPageIds(data))
      expect(parseYearPageId(part, id), id).not.toBeNull();
  });

  it('resolves only the years and topic pages it has', () => {
    const single = index.years.find((y) => yearTopics(y).length === 1)!;
    const topic = yearTopics(single)[0];
    for (const bad of [
      '/year/1800',
      '/year/25',
      '/year/2025-economy',
      `/year/${single.year}-${topic}`,
      '/year/2025?topic=governance',
      '/years/2025',
    ])
      expect(resolveReference(bad, data).target, bad).toBeNull();
    expect(resolveReference('/years', data).target).toEqual({ kind: 'years' });
    expect(
      resolveReference('/year/2025?inspect=' + data.claims[0].id, data).target,
    ).toEqual({ kind: 'year', id: '2025', inspect: data.claims[0].id });
  });

  it('lists each year in search’s pages', () => {
    const pages = searchablePages(data).filter((p) => p.kind === 'Chronicle');
    expect(pages.map((p) => p.path)).toEqual([
      '/years',
      ...index.years.map((y) => `/year/${y.year}`),
    ]);
    expect(pageMeta(data, '/year/2025')!.title).toBe(
      'Records dated 2025 · Selekoa',
    );
    expect(pageMeta(data, '/year/2025-governance')!.title).toBe(
      'Records dated 2025: governance · Selekoa',
    );
  });

  /** A record's row on its year page, from its start to its claim page link. */
  async function rowOf(claim: Claim) {
    const year = placements(claim)[0].date.slice(0, 4);
    const html = await page(`/year/${year}`);
    const at = html.indexOf(`href="/claim/${claim.id}"`);
    expect(at, claim.id).toBeGreaterThan(0);
    return html
      .slice(html.lastIndexOf('<li', at), html.indexOf('</li>', at))
      .replaceAll('<!-- -->', '');
  }

  it('shows every unsettled record’s status in its row', async () => {
    const unsettled = data.claims.filter(
      (c) => c.resolution !== 'supported' && placements(c).length,
    );
    expect(unsettled.some((c) => c.resolution === 'contested')).toBe(true);
    expect(unsettled.some((c) => c.resolution === 'unresolved')).toBe(true);
    for (const claim of unsettled)
      expect(await rowOf(claim), claim.id).toContain(
        `claim-status-${claim.resolution}">${resolutionLabels[claim.resolution]}`,
      );
  });

  it('keeps an announcement an announcement, and a plan a plan', async () => {
    const announced = data.claims.find(
      (c) =>
        c.time.kind === 'event' &&
        c.time.basis === 'announcement' &&
        !isProvision(c),
    )!;
    expect(await rowOf(announced)).toMatch(/<\/time> · announcement · /);
    for (const [stage, label] of [
      ['planned', 'plan'],
      ['committed', 'commitment'],
      ['letter_of_intent', 'letter of intent'],
    ]) {
      const claim = data.claims.find(
        (c) =>
          c.attributes?.transactionStage === stage &&
          placements(c).length &&
          !placements(c).some((p) => scheduled(c, p.date)),
      )!;
      expect(claim, stage).toBeDefined();
      expect(await rowOf(claim), claim.id).toMatch(
        new RegExp(`dated to the (day|month|year) · ${label}`),
      );
    }
  });

  it('draws a month- or year-only date under its month or year, as stored', async () => {
    for (const length of [4, 7]) {
      const claim = data.claims.find(
        (c) =>
          c.time.kind === 'event' &&
          c.time.date.length === length &&
          !isProvision(c),
      )!;
      const date = placements(claim)[0].date;
      const row = await rowOf(claim);
      expect(row).toContain(`<time dateTime="${date}">${date}</time>`);
      expect(row).toContain(
        length === 4 ? 'dated to the year' : 'dated to the month',
      );
      const html = await page(`/year/${date.slice(0, 4)}`);
      const at = html.indexOf(`href="/claim/${claim.id}"`);
      const heading = [
        ...html.slice(0, at).matchAll(/<h3[^>]*>([^<]*)<\/h3>/g),
      ].at(-1)![1];
      expect(heading).toBe(
        length === 4
          ? `Dated to ${date} only`
          : `${new Date(date + '-01').toLocaleString('en-GB', { month: 'long', timeZone: 'UTC' })} ${date.slice(0, 4)}`,
      );
    }
  });

  it('states no trend or cause in its own text', async () => {
    for (const phrase of [
      'the AI boom',
      'which led to new rules',
      'a turning point',
      'the rise of',
    ])
      expect(trendWords.test(phrase), phrase).toBe(true);
    const authored = [
      ...Object.values(chronicleText).filter(
        (v): v is string => typeof v === 'string',
      ),
      ...chronicleText.limits,
      chronicleText.statedOnlyTitle(2050),
      chronicleText.statedHeading(2025),
      chronicleText.noRecords(2050),
    ].join(' ');
    expect(authored).not.toMatch(trendWords);
    for (const path of [
      '/years',
      '/year/1955',
      '/year/2025',
      '/year/2025-governance',
      '/year/2050',
    ]) {
      const text = ownText(await page(path));
      expect(text, path).toContain(
        path === '/years'
          ? 'not a history of any year'
          : 'not a history of the year',
      );
      expect(text.match(trendWords), path).toBeNull();
    }
  });

  it('links each record to its claim page, its evidence and its record', async () => {
    const html = await page('/year/1955');
    for (const entry of entriesOf(1955)) {
      if (entry.kind !== 'record') continue;
      const id = entry.claim.id;
      // The statement opens the evidence; the claim page has its own link.
      expect(
        html.match(new RegExp(`href="/claim/${id}"`, 'g'))?.length,
      ).toBeGreaterThanOrEqual(2);
    }
    expect(html).toContain('href="/year/1952"');
    expect(html).toContain('href="/years"');
  });
});
