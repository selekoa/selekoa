import { describe, expect, it } from 'vitest';
import growth from '../../research/economics-growth/pack.json';
import mainstream from '../../research/economics-mainstream/pack.json';
import esoteric from '../../research/economics-mainstream/esoteric/pack.json';
import map from '../../review/economics-admission-map-2026-10-14.json';
import esotericMap from '../../review/esoteric-admission-map-2026-10-16.json';
import { repository } from './repository';
import { propositionsView, requiredContext } from './propositions';
import { datasetSchema, type Dataset } from './schema';
import { preRecheckCorrectionsRaw } from '../editorial/historical-views';
import {
  propositionsStarter,
  propositionsStarterMarkdown,
} from './propositions-starter';
import { economicsOfMachineIntelligence } from '../reading/economics';

const data = repository.data;
const view = propositionsView(data, economicsOfMachineIntelligence);
const entries = view.groups.flatMap((g) => g.propositions);
const records = entries.flatMap((e) => e.records);
// The packs are compared with the records as admitted, before the re-check
// corrections of 2026-10-25, which are checked separately below.
const admitted = preRecheckCorrectionsRaw as unknown as Dataset;
const admittedEvidence = new Map(admitted.evidence.map((e) => [e.id, e]));
const admittedClaims = new Map(admitted.claims.map((c) => [c.id, c]));
const admittedRecords = propositionsView(
  admitted,
  economicsOfMachineIntelligence,
).groups.flatMap((g) => g.propositions.flatMap((p) => p.records));
type Passage = {
  id: string;
  source: string;
  quote: string;
  locator: string;
  relation: string;
  roles?: string[];
  conditions?: string;
  contextOnly?: unknown;
  estimate?: { holder: string };
  flags?: string[];
};
const passages: (Passage & { pack: 'g' | 'm'; tier: number })[] = [
  ...growth.propositions.flatMap((p) =>
    (p.passages as Passage[]).map((x) => ({
      ...x,
      pack: 'g' as const,
      tier: growth.sources.find((s) => s.id === x.source)!.tier.value,
    })),
  ),
  ...(mainstream.passages as Passage[]).map((x) => ({
    ...x,
    pack: 'm' as const,
    tier: mainstream.sources.find((s) => s.id === x.source)!.tier,
  })),
];
const changes = map.quoteChanges as Record<string, { quote: string }>;
const evidenceOf = (p: Passage) =>
  admittedEvidence.get('evidence-ec-' + p.id.toLowerCase());
const claimOf = (p: Passage) => admittedClaims.get(evidenceOf(p)!.claimId)!;

describe('the economics of machine intelligence collection (schema 2.13)', () => {
  it('keeps every pack passage as evidence with its quotation, locator and context-only flag', () => {
    expect(passages.length).toBe(282);
    for (const p of passages) {
      const e = evidenceOf(p);
      expect(e, p.id).toBeDefined();
      expect(e!.locator, p.id).toBe(p.locator);
      expect(e!.passageType).toBe('quote');
      expect(e!.passage, p.id).toBe(changes[p.id]?.quote ?? p.quote);
      expect(Boolean(e!.contextOnly), p.id).toBe(Boolean(p.contextOnly));
    }
  });

  it('admits the esoteric sub-pack separately (2026-10-16)', () => {
    const admittedPassages = esoteric.passages.filter(
      (p) => !(p.id in esotericMap.holdBack),
    );
    expect(
      admitted.evidence.filter((e) => e.id.startsWith('evidence-ec-')).length,
    ).toBe(passages.length + admittedPassages.length);
  });

  it('records each text’s tier, conditions and estimates', () => {
    for (const p of passages) {
      const thought = claimOf(p).attributes!.thought!;
      expect(thought.tier?.value, p.id).toBe(p.tier);
      if (p.conditions)
        expect(thought.conditions, p.id).toContain(p.conditions.trim());
      if (p.estimate)
        expect(
          thought.estimates?.map((e) => e.holder),
          p.id,
        ).toContain(p.estimate.holder);
      if (p.flags?.includes('model scenario')) {
        expect(thought.qualifier, p.id).toMatch(/^A model scenario/);
        expect(evidenceOf(p)!.contextOnly, p.id).toBeDefined();
      }
    }
  });

  it('carries every earliest-located role of the packs, tier 1 and tier 2 apart', () => {
    for (const p of passages)
      for (const role of p.roles ?? [])
        if (role.startsWith('earliest-located'))
          expect(claimOf(p).attributes!.thought!.roles, p.id).toContain(role);
    // The esoteric strand's roles are checked in esoteric-admission.test.ts.
    const held = admittedRecords.filter(
      (r) =>
        !r.claim.id.startsWith('ec-e0') &&
        r.roles.some((role) => role.startsWith('earliest-located')),
    );
    const packRoles = new Set(
      passages
        .filter((p) =>
          (p.roles ?? []).some((role) => role.startsWith('earliest-located')),
        )
        .map((p) => claimOf(p).id),
    );
    expect(held.map((r) => r.claim.id).sort()).toEqual([...packRoles].sort());
    for (const r of held)
      if (r.roles.includes('earliest-located-tier-2'))
        expect(r.tier?.value, r.claim.id).toBe(2);
      else expect(r.tier?.value, r.claim.id).toBe(1);
  });

  it('names the tier-1 and tier-2 earliest texts separately', () => {
    const g07 = entries.find((e) => e.proposition.code === 'G07')!;
    expect(g07.earliest?.document.id).toBe(
      'hanson-economic-growth-given-machine-intelligence',
    );
    expect(g07.earliestTier2?.document.id).toBe(
      'hanson-1994-if-uploads-come-first',
    );
    const g06 = entries.find((e) => e.proposition.code === 'G06')!;
    expect(g06.earliest).toBeNull();
    expect(g06.earliestTier2).not.toBeNull();
    const m05 = entries.find((e) => e.proposition.code === 'M05')!;
    expect(m05.earliest?.claim.id).toBe(
      'ec-m05-acemoglu-restrepo-2016-race-between-machine-and-man-a',
    );
    expect(m05.earliest?.wording).toBe('2017-06');
  });

  it('shows every record of its propositions once, in date order', () => {
    const ids = new Set(entries.map((e) => e.entity.id));
    const stored = data.claims.filter(
      (c) => c.object.kind === 'entity' && ids.has(c.object.entityId),
    );
    expect([...view.claimIds].sort()).toEqual(stored.map((c) => c.id).sort());
    for (const entry of entries) {
      const dates = entry.records.map((r) => r.dated);
      expect(dates, entry.entity.id).toEqual([...dates].sort());
    }
  });

  it('records engagement on every contesting record', () => {
    const contests = records.filter((r) => r.stance === 'contests');
    expect(contests.length).toBeGreaterThan(0);
    for (const r of contests) expect(r.engagement, r.claim.id).toBeDefined();
  });

  it('keeps headline corrections on records that exist', () => {
    for (const c of economicsOfMachineIntelligence.corrections) {
      expect(entries.map((e) => e.entity.id)).toContain(c.propositionId);
      for (const id of c.claimIds)
        expect(repository.claims.has(id), id).toBe(true);
    }
  });

  it('names the context of every context-only passage', () => {
    for (const e of data.evidence.filter(
      (x) => x.contextOnly && view.claimIds.includes(x.claimId),
    )) {
      expect(e.contextOnly!.requires.length, e.id).toBeGreaterThan(0);
      expect(
        requiredContext(e, repository.claims, repository.evidence).length,
        e.id,
      ).toBe(e.contextOnly!.claimIds?.length ?? 0);
    }
  });

  it('states tiers, conditions and context in the research starter', async () => {
    const markdown = propositionsStarterMarkdown(
      await propositionsStarter(data, economicsOfMachineIntelligence),
    );
    expect(markdown).toContain('### Tiers');
    expect(markdown).toContain('- Earliest located, tier 2: ');
    expect(markdown).toContain('  - Conditions: ');
    expect(markdown).toContain('  - Estimate by Tom Davidson: ');
    const notes = markdown
      .split('\n')
      .filter((l) => l.includes('Shown only with its context'));
    expect(notes.length).toBe(
      data.evidence.filter(
        (e) => e.contextOnly && view.claimIds.includes(e.claimId),
      ).length,
    );
  });
});

describe('the re-check corrections of 2026-10-25', () => {
  const entry = (code: string) =>
    entries.find((e) => e.proposition.code === code)!;

  it('moves the earliest located roles the maintainer decided', () => {
    expect(entry('G01').earliestTier2?.claim.id).toBe(
      'ec-g01-davidson-2021-explosive-economic-growth-a',
    );
    expect(entry('G03').earliest?.document.id).toBe(
      'hanson-1998-is-a-singularity-just-around-the-corner',
    );
    expect(entry('M04').earliest?.document.id).toBe(
      'agrawal-gans-goldfarb-2016-simple-economics-of-machine-intelligence',
    );
    for (const code of ['M06a', 'M06b'])
      expect(entry(code).earliestTier2?.document.id, code).toBe(
        'diebold-1955-automation-condensation',
      );
    expect(entry('M05').earliest?.claim.id).toBe(
      'ec-m05-acemoglu-restrepo-2016-race-between-machine-and-man-a',
    );
    for (const r of records.filter(
      (r) => r.document.id === 'erdil-besiroglu-2023-explosive-growth-review',
    ))
      expect(r.tier?.value, r.claim.id).toBe(1);
  });

  it('withholds the tier-1 G09 role and says so wherever the headline appears', async () => {
    const g09 = entry('G09');
    expect(g09.earliest).toBeNull();
    expect(g09.earliestWithheld).toMatch(/unchecked lead/);
    const markdown = propositionsStarterMarkdown(
      await propositionsStarter(data, economicsOfMachineIntelligence),
    );
    expect(markdown).toContain(
      '- Earliest located, tier 1: not assigned. ' + g09.earliestWithheld,
    );
  });

  it('dates M08 by the April 2024 version and keeps the May figures', () => {
    const m08 = entry('M08').earliest!;
    expect(m08.claim.time).toMatchObject({ date: '2024-04-05' });
    expect(m08.wording).toBe('2025-01-06');
    const sources = m08.claim.evidenceIds.map(
      (id) => repository.evidence.get(id)!.sourceId,
    );
    expect(new Set(sources)).toEqual(
      new Set(['source-acemoglu-2024-mit', 'source-acemoglu-2024-nber']),
    );
  });

  it('rejects a holder of a withheld role, and no holder without one', () => {
    const issues = (d: Dataset) =>
      datasetSchema.safeParse(d).error?.issues.map((i) => i.message) ?? [];
    const held = structuredClone(data) as Dataset;
    held.claims.find(
      (c) => c.id === 'ec-g09-hanson-2000-long-term-growth-exponential-modes-a',
    )!.attributes!.thought!.roles = ['earliest-located'];
    expect(issues(held)).toContain(
      'explosive-growth-estimates: the earliest located role is withheld, so no articulation holds it',
    );
    const unheld = structuredClone(data) as Dataset;
    delete unheld.entities.find((e) => e.id === 'explosive-growth-estimates')!
      .proposition!.withheld;
    expect(issues(unheld)).toContain(
      'explosive-growth-estimates: exactly one articulation is earliest located',
    );
  });
});
