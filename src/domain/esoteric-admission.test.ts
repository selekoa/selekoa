import { describe, expect, it } from 'vitest';
import esoteric from '../../research/economics-mainstream/esoteric/pack.json';
import map from '../../review/esoteric-admission-map-2026-10-16.json';
import { repository } from './repository';
import { datasetSchema } from './schema';
import { propositionsView } from './propositions';
import { economicsOfMachineIntelligence } from '../reading/economics';

type Passage = {
  id: string;
  source: string;
  proposition: string;
  quote: string;
  locator: string;
  relation: string;
  voice?: string;
  roles?: string[];
  contextOnly?: unknown;
  flags?: string[];
};
const data = repository.data;
const held = map.holdBack as Record<string, string>;
const changes = map.quoteChanges as Record<string, { quote: string }>;
const all = esoteric.passages as Passage[];
const passages = all.filter((p) => !(p.id in held));
const tierOf = new Map(esoteric.sources.map((s) => [s.id, s.tier]));
const waybackSources = new Set(
  esoteric.sources
    .filter((s) => 'waybackCapture' in s.retrieval)
    .map((s) => s.id),
);
const evidenceOf = (p: Passage) =>
  repository.evidence.get('evidence-ec-' + p.id.toLowerCase());
const claimOf = (p: Passage) => repository.claims.get(evidenceOf(p)!.claimId)!;
const view = propositionsView(data, economicsOfMachineIntelligence);
const entries = view.groups
  .filter((g) => g.id === 'E')
  .flatMap((g) => g.propositions);

describe('the esoteric economics strand (admitted 2026-10-16)', () => {
  it('admits every passage except those held back, with quotation, locator and context-only flag', () => {
    expect(all.length).toBe(119);
    expect(Object.keys(held).sort()).toEqual(['E01-04', 'E01-07', 'E02-02']);
    for (const p of all) {
      const e = evidenceOf(p);
      if (p.id in held) {
        expect(e, p.id).toBeUndefined();
        continue;
      }
      expect(e, p.id).toBeDefined();
      expect(e!.locator, p.id).toBe(p.locator);
      expect(e!.passage, p.id).toBe(changes[p.id]?.quote ?? p.quote);
      expect(Boolean(e!.contextOnly), p.id).toBe(Boolean(p.contextOnly));
    }
  });

  it('records each text’s tier and keeps model scenarios flagged and context-only', () => {
    for (const p of passages) {
      const thought = claimOf(p).attributes!.thought!;
      expect(thought.tier?.value, p.id).toBe(tierOf.get(p.source));
      if (p.flags?.includes('model scenario')) {
        expect(thought.qualifier, p.id).toMatch(/^A model scenario/);
        expect(evidenceOf(p)!.contextOnly, p.id).toBeDefined();
      }
    }
  });

  it('carries the pack’s earliest-located roles, never on a reported passage alone', () => {
    const packHolders = new Set(
      passages
        .filter((p) =>
          (p.roles ?? []).some((r) => r.startsWith('earliest-located')),
        )
        .map((p) => claimOf(p).id),
    );
    const holders = data.claims.filter(
      (c) =>
        c.id.startsWith('ec-e0') &&
        c.attributes?.thought?.roles.some((r) =>
          r.startsWith('earliest-located'),
        ),
    );
    expect(holders.map((c) => c.id).sort()).toEqual([...packHolders].sort());
    for (const c of holders) {
      expect(c.attributes!.thought!.register, c.id).not.toBe('relay');
      const own = passages.filter(
        (p) => claimOf(p).id === c.id && p.voice !== 'reported',
      );
      expect(own.length, c.id).toBeGreaterThan(0);
    }
    for (const p of passages.filter((p) => p.voice === 'reported'))
      expect(p.roles ?? [], p.id).not.toContain('earliest-located');
  });

  it('names the tier-1 and tier-2 earliest texts separately', () => {
    const byCode = (code: string) =>
      entries.find((e) => e.proposition.code === code)!;
    expect(byCode('E05').earliest?.document.id).toBe(
      'nordhaus-2015-economic-singularity',
    );
    expect(byCode('E05').earliestTier2).toBeNull();
    expect(byCode('E02').earliest?.wording).toBe('2023-11-29');
    expect(byCode('E01').earliestTier2?.document.id).toBe(
      'yudkowsky-2008-recursive-self-improvement',
    );
    expect(byCode('E01').earliestContestTier2?.document.id).toBe(
      'hanson-1998-some-skepticism',
    );
  });

  it('validates that a tiered relay record never holds earliest located', () => {
    const copy = structuredClone(data);
    const relay = copy.claims.find(
      (c) => c.id === 'ec-e01-hanson-2008-ai-go-foom-a',
    )!;
    expect(relay.attributes!.thought!.register).toBe('relay');
    relay.attributes!.thought!.roles = ['earliest-located-tier-2'];
    const messages =
      datasetSchema.safeParse(copy).error?.issues.map((i) => i.message) ?? [];
    expect(messages).toContain(
      'ai-improving-ai-accelerates-capability: ec-e01-hanson-2008-ai-go-foom-a is a relay record and cannot be earliest located',
    );
  });

  it('admits the Wayback passages only on the cross-family check of 2026-10-15', () => {
    const wayback = passages.filter((p) => waybackSources.has(p.source));
    expect(wayback.length).toBe(17);
    for (const p of wayback) {
      const e = evidenceOf(p)!;
      expect(e.checkedAt, p.id).toBe('2026-10-15');
      expect(e.note, p.id).toContain('cross-family GPT check of 2026-10-15');
    }
  });
});
