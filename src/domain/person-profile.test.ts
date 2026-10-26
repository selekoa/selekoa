import { describe, expect, it } from 'vitest';
import { repository } from './repository';
import { personProfile, documentationDates } from './person-profile';
import { relatedTo } from './query';
import { canonicalJson } from './references';
import { personStarter, personStarterMarkdown, starterJson } from './starter';

const data = repository.data;
const people = data.entities.filter((e) => e.type === 'person');

describe('person profile projection', () => {
  it('returns null for anything but a person', () => {
    expect(personProfile(data, 'anthropic')).toBeNull();
    expect(personProfile(data, 'missing')).toBeNull();
  });

  it('lists every related claim once, as original objects', () => {
    const before = canonicalJson(data);
    for (const person of people) {
      const profile = personProfile(data, person.id)!;
      const related = data.claims.filter((c) => relatedTo(c, person.id));
      expect(new Set(profile.claimIds)).toEqual(
        new Set(related.map((c) => c.id)),
      );
      const listed = [
        ...profile.path.map((e) => e.claim),
        ...profile.undated.map((e) => e.claim),
        ...profile.works,
        ...profile.creditsTo,
        ...profile.other,
      ];
      for (const c of listed) expect(c).toBe(repository.claims.get(c.id));
      // Governance records may repeat path records; nothing else repeats.
      expect(new Set(listed.map((c) => c.id)).size).toBe(listed.length);
      for (const c of profile.governance) expect(c.topic).toBe('governance');
    }
    expect(canonicalJson(data)).toBe(before);
  });

  it('orders dated path records and keeps undated records separate', () => {
    for (const person of people) {
      const { path, undated } = personProfile(data, person.id)!;
      expect(path.every((e) => e.claim.time.kind !== 'unknown')).toBe(true);
      expect(undated.every((e) => e.claim.time.kind === 'unknown')).toBe(true);
      const dates = path.map((e) => {
        const t = e.claim.time;
        return t.kind === 'interval'
          ? (t.from ?? t.until)!
          : 'date' in t
            ? t.date
            : '';
      });
      expect(dates).toEqual([...dates].sort());
    }
  });

  it('Jan Leike: dated records, two undated roles and their computed limits', () => {
    const profile = personProfile(data, 'jan-leike')!;
    // One dated snapshot until 2026-10-17; the lab genealogy adds the
    // announced departure from OpenAI and the announced Anthropic role.
    expect(profile.path.map((e) => e.claim.id)).toEqual([
      'jan-leike-openai-superalignment-2023',
      'lg-oai-leike-departure-2024',
      'lg-ant-leike-joins-2024',
    ]);
    expect(profile.undated.map((e) => e.claim.id).sort()).toEqual([
      'leike-anthropic-alignment-science',
      'leike-deepmind-alignment-prior',
    ]);
    expect(profile.works).toHaveLength(3);
    expect(profile.gaps.map((g) => g.id)).toEqual([
      'snapshots',
      'undated',
      'unknown-publication',
      'no-end-or-departure',
    ]);
  });

  it('computes open intervals, retrospective sources and governance records from stored fields', () => {
    const kingma = personProfile(data, 'durk-kingma')!;
    const open = kingma.gaps.find((g) => g.id === 'open-intervals')!;
    expect(open.claimIds).toEqual(['kingma-anthropic-research-from-2024']);
    expect(open.text).toContain('not evidence that the role continues');
    // An undated source can never be called retrospective; it is its own gap.
    expect(kingma.gaps.some((g) => g.id === 'retrospective')).toBe(false);
    expect(
      kingma.gaps.find((g) => g.id === 'unknown-publication')?.claimIds,
    ).toContain('kingma-openai-research-2015-2018');
    // A closed interval documented after its end is retrospective.
    const closed = data.claims.find((c) => c.id === 'ng-brain-lead-2011-2012')!;
    expect(documentationDates(data, closed).publications).toEqual([
      expect.objectContaining({ date: '2024-04-11', retrospective: true }),
    ]);
    expect(
      personProfile(data, 'andrew-ng')!.gaps.find(
        (g) => g.id === 'retrospective',
      )?.claimIds,
    ).toEqual(['ng-brain-lead-2011-2012']);
    // An end inside the source's publication year is not retrospective.
    const sameYear = {
      ...closed,
      time: { ...closed.time, until: '2024' },
    } as typeof closed;
    expect(
      documentationDates(data, sameYear).publications[0].retrospective,
    ).toBe(false);
    const altman = personProfile(data, 'sam-altman')!;
    expect(altman.governance.map((c) => c.id)).toEqual([
      // Added by the 2026-10-17 lab genealogy.
      'lg-oai-sam-altman-nonprofit-board-2019',
      'atlas-altman-departure',
      'cs-altman-board-departure-2023',
      'atlas-altman-return',
      'cs-altman-board-return-2024',
    ]);
    // A departure announcement bounds the institution for the gap check.
    expect(altman.gaps.some((g) => g.id === 'no-end-or-departure')).toBe(false);
  });

  it('keeps explicit credits to a person separate from authorship', () => {
    const christiano = personProfile(data, 'paul-christiano')!;
    expect(christiano.creditsTo.map((c) => c.id)).toEqual([
      'eval-i-rsp-christiano-credit',
    ]);
    expect(christiano.works.some((c) => c.predicate !== 'authored')).toBe(
      false,
    );
  });
});

describe('person research starter', () => {
  it('is deterministic, complete and reuses the starter passage rules', async () => {
    const copy = structuredClone(data);
    const before = canonicalJson(copy);
    const starter = await personStarter(copy, 'jan-leike');
    expect(canonicalJson(copy)).toBe(before);
    const again = await personStarter(structuredClone(data), 'jan-leike');
    expect(starterJson(again)).toBe(starterJson(starter));
    expect(personStarterMarkdown(again)).toBe(personStarterMarkdown(starter));
    const profile = personProfile(data, 'jan-leike')!;
    expect(starter.person.orderedClaimIds).toEqual(profile.claimIds);
    expect(starter.claims.map((c) => c.id)).toEqual(profile.claimIds);
    expect(starter.person.cannotTell).toEqual(profile.gaps);
    for (const e of starter.evidence) {
      const original = data.evidence.find((o) => o.id === e.id)!;
      expect(e.locator).toBe(original.locator);
    }
    const markdown = personStarterMarkdown(starter);
    expect(markdown).toContain('## Documented path');
    expect(markdown).toContain('### Undated');
    expect(markdown).toContain('## What this record cannot tell you');
    expect(markdown).toContain('Superalignment co-lead');
    expect(markdown.trimEnd().endsWith(starter.dataset.fingerprint)).toBe(true);
    await expect(personStarter(data, 'anthropic')).rejects.toThrow(
      'Not a person',
    );
  });
});
