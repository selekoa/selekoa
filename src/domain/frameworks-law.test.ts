import { describe, expect, it } from 'vitest';
import { repository } from './repository';
import { dateOf } from './query';
import { resolveReference } from './deep-links';
import { frameworksLawView } from './frameworks-law';
import {
  frameworksLawStarter,
  frameworksLawStarterMarkdown,
} from './frameworks-law-starter';
import { frontierFrameworksAndLaw as collection } from '../reading/frameworks-and-law';
import { pageMeta, pagePaths } from '../prerender/pages';

const data = repository.data;
const view = frameworksLawView(data, collection);
const claims = new Map(data.claims.map((c) => [c.id, c]));

describe('frameworks and law reading', () => {
  it('opens at its own address and is built as a page', () => {
    const path = '/guide/frontier-frameworks-and-law';
    expect(resolveReference(path, data)).toEqual({
      target: { kind: 'guide', id: collection.id },
      notice: null,
    });
    expect(resolveReference('/guide/no-such-reading', data).target).toBeNull();
    expect(pagePaths(data)).toContain(path);
    expect(pageMeta(data, path)?.title).toBe(
      'Frontier AI frameworks and law, 2023–2026 · Selekoa',
    );
  });

  it('lists each text once, as a document record', () => {
    const ids = view.sections.flatMap((s) =>
      s.instruments.map((i) => i.entity.id),
    );
    expect(new Set(ids).size).toBe(ids.length);
    for (const s of view.sections)
      for (const i of s.instruments) {
        expect(i.entity.type).toBe('document');
        expect(i.standingClaims.length).toBeGreaterThan(0);
      }
  });

  it('shows every framework edition of the comparison', () => {
    expect(view.editions).toHaveLength(22);
    const frameworkRows = view.timeline.filter((r) => r.lane === 'framework');
    expect(new Set(frameworkRows.map((r) => r.documentId)).size).toBe(22);
  });

  it('builds the timeline from stored dates, in order, without changing them', () => {
    const dates = view.timeline.map((r) => r.date);
    expect([...dates].sort()).toEqual(dates);
    for (const row of view.timeline) {
      for (const c of row.claims) expect(dateOf(c)).toBe(row.date);
      if (row.dateKind === 'document') expect(row.claims).toHaveLength(0);
      else expect(row.claims.length).toBeGreaterThan(0);
      if (row.dateKind === 'snapshot')
        for (const c of row.claims) expect(c.time.kind).toBe('snapshot');
    }
  });

  it('keeps dates set by a text apart, and marks the future ones', () => {
    const stated = view.timeline.filter((r) => r.dateKind === 'stated');
    expect(stated.length).toBeGreaterThan(0);
    for (const row of stated)
      for (const c of row.claims) {
        expect(c.predicate).toBe('states_provision');
        expect(c.time.kind === 'event' && c.time.basis).toBe('effective');
      }
    const scheduled = view.timeline.filter((r) => r.scheduled);
    expect(scheduled.map((r) => r.documentId)).toContain(
      'new-york-raise-act-chapter-96-2026',
    );
    for (const row of scheduled) expect(row.date > view.latestCheck).toBe(true);
  });

  it('labels announcements as announcements', () => {
    for (const row of view.timeline)
      for (const c of row.claims) {
        const announced =
          (c.time.kind === 'event' && c.time.basis === 'announcement') ||
          c.attributes?.activityStage === 'announced';
        if (announced && row.lane === 'instrument')
          expect(row.label, row.key).toMatch(/announce|reported/i);
      }
    const rescission = view.timeline.find((r) =>
      r.claims.some(
        (c) => c.id === 'fl-us-bis-ai-diffusion-rescission-announced',
      ),
    )!;
    expect(rescission.label).toBe('Revocation announced');
  });

  it('computes revocations and vetoes from the records', () => {
    const item = (id: string) =>
      view.sections
        .flatMap((s) => s.instruments)
        .find((i) => i.entity.id === id)!;
    expect(item('us-eo-14110-2023').changes.map((c) => c.change)).toEqual([
      'revoked',
    ]);
    expect(
      item('us-bis-ai-diffusion-ifr-2025').changes.map((c) => c.change),
    ).toEqual(['revocation-announced']);
    expect(item('ca-sb1047-2024').changes.map((c) => c.change)).toEqual([
      'vetoed',
    ]);
    // The September 2023 text is the same commitments signed by another
    // group: a second round, not a replacement (decision of 2026-10-29).
    expect(
      item('wh-voluntary-ai-commitments-2023-07').changes.map((c) => c.change),
    ).toEqual(['second-round']);
    expect(
      item('gpai-code-of-practice-draft1-2024').changes.map((c) => c.change),
    ).toEqual(['later-version']);
    // Signatories of commitment texts stay on the commitments page.
    expect(
      view.timeline.some(
        (r) =>
          r.documentId === 'frontier-ai-safety-commitments-2024' &&
          r.claims.some((c) => c.predicate === 'signed_commitment'),
      ),
    ).toBe(false);
  });

  it('shows every framework edition’s link to a text on the page, once', () => {
    const editionIds = new Set(view.editions.map((e) => e.entity.id));
    const texts = new Set(
      view.sections.flatMap((s) => s.instruments.map((i) => i.entity.id)),
    );
    const expected = data.claims
      .filter(
        (c) =>
          c.predicate === 'references_commitment' &&
          editionIds.has(c.subject) &&
          c.object.kind === 'entity' &&
          texts.has(c.object.entityId),
      )
      .map((c) => c.id)
      .sort();
    const shown = view.linkMatrix
      .flatMap((r) => r.cells.flatMap((c) => c.claims.map((x) => x.id)))
      .sort();
    expect(shown).toEqual(expected);
    expect(shown.length).toBeGreaterThan(20);
  });

  it('rests every passage and gap on existing records', () => {
    for (const p of collection.orientation) {
      expect(p.claimIds.length).toBeGreaterThan(0);
      for (const id of p.claimIds) expect(claims.has(id), id).toBe(true);
    }
    for (const n of collection.notCovered)
      for (const id of n.claimIds) expect(claims.has(id), id).toBe(true);
  });

  it('states no cause, influence or trend in its own text', () => {
    const text = [
      collection.title,
      collection.question,
      ...collection.orientation.map((o) => o.text),
      ...collection.sections.map((s) => s.note ?? ''),
      ...collection.notCovered.map((n) => n.text),
      ...collection.limits,
    ].join(' ');
    expect(text).not.toMatch(
      /\b(caused|led to|in response|responded|because of|triggered|prompted|shift(ed)? from|from voluntary)\b/i,
    );
  });

  it('exports a research starter with the timeline and every record', async () => {
    const starter = await frameworksLawStarter(data, collection);
    expect(starter.claims.map((c) => c.id).sort()).toEqual(
      [...view.claimIds].sort(),
    );
    expect(starter.frameworksLaw.timeline).toHaveLength(view.timeline.length);
    const md = frameworksLawStarterMarkdown(starter);
    expect(md).toContain('## Timeline');
    expect(md).toContain('## What frameworks say about law');
    expect(md).toContain('## Not covered');
  });

  it('shows the EU AI Act’s dates of application on the timeline (2026-10-29)', () => {
    const rows = view.timeline.filter((r) => r.documentId === 'eu-ai-act-2024');
    const at = (date: string) => rows.find((r) => r.date === date)!;
    expect(at('2025-08-02').claims.map((c) => c.id)).toEqual([
      'aia-art113-chapter-v-applies',
    ]);
    expect(at('2025-08-02').label).toBe(
      'Date stated in the text: Chapter V (general-purpose AI models) applies from 2 August 2025',
    );
    expect(at('2025-08-02').dateKind).toBe('stated');
    expect(at('2026-08-02').claims.map((c) => c.id)).toEqual([
      'aia-art113-general-date',
    ]);
    expect(at('2024-08-01').label).toBe(
      'Takes effect: date fixed by the text’s rule',
    );
  });
});
