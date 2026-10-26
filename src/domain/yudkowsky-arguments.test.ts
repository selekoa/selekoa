import { describe, expect, it } from 'vitest';
import pack from '../../research/yudkowsky-arguments/pack.json';
import map from '../../review/yudkowsky-admission-map-2026-10-08.json';
import quoteTrims from '../../review/quote-trims-before-2026-10-13.json';
import { repository } from './repository';
import { datasetSchema } from './schema';
import {
  laterContests,
  propositionsView,
  requiredContext,
} from './propositions';
import {
  propositionsStarter,
  propositionsStarterMarkdown,
} from './propositions-starter';
import { yudkowskyArguments } from '../reading/yudkowsky-arguments';

const data = repository.data;
const view = propositionsView(data, yudkowskyArguments);
const entries = view.groups.flatMap((g) => g.propositions);
const records = entries.flatMap((e) => e.records);
type Passage = (typeof pack.takes)[number]['passages'][number] & {
  cardUse?: { reason: string };
};
const passages = pack.takes.flatMap((t) => t.passages as Passage[]);
const changes = map.quoteChanges as Record<
  string,
  { quote?: string; paraphrase?: string }
>;
// Quotations shortened on 2026-10-13 are checked against their earlier text
// in quote-trims.test.ts; the earlier text must still be the admitted one.
const trimmed = new Map(
  quoteTrims.before.evidence.map((e) => [e.id, e.passage]),
);

describe('the Yudkowsky argument collection (schema 2.12)', () => {
  it('keeps every pack passage as evidence with its quotation and locator', () => {
    for (const p of passages) {
      const e = repository.evidence.get('evidence-yk-' + p.id.toLowerCase());
      expect(e, p.id).toBeDefined();
      expect(e!.locator, p.id).toBe(p.locator);
      const change = changes[p.id];
      if (change?.paraphrase) expect(e!.passageType).toBe('paraphrase');
      else
        expect(trimmed.get(e!.id) ?? e!.passage, p.id).toBe(
          change?.quote ?? p.quote,
        );
      expect(Boolean(e!.contextOnly), p.id).toBe(Boolean(p.cardUse));
    }
  });

  it('shows the open premises exactly as the pack states them', () => {
    const ids = map.propositions as Record<string, { id: string }>;
    expect(yudkowskyArguments.openPremises).toEqual(
      Object.fromEntries(
        pack.takes
          .filter((t) => t.open.length)
          .map((t) => [ids[t.id].id, t.open]),
      ),
    );
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

  it('names an earliest located contesting text for every proposition contested', () => {
    for (const entry of entries)
      if (entry.records.some((r) => r.stance === 'contests'))
        expect(entry.earliestContest, entry.entity.id).not.toBeNull();
  });

  it('records engagement on every contesting record, under the message-level rule', () => {
    for (const r of records.filter((r) => r.stance === 'contests')) {
      expect(r.engagement, r.claim.id).toBeDefined();
      expect(r.engagement!.rationale).toContain('message-level rule');
    }
    expect(records.some((r) => r.engagement?.kind === 'contrary-only')).toBe(
      true,
    );
  });

  it('never makes a retrospective articulation earliest located, and protects its passage', () => {
    const retrospective = records.filter(
      (r) => r.stance === 'articulates' && r.retrospective,
    );
    expect(retrospective.length).toBeGreaterThan(0);
    for (const r of retrospective) {
      expect(r.roles, r.claim.id).not.toContain('earliest-located');
      expect(r.evidence.every((e) => e.contextOnly)).toBe(true);
    }
    const copy = structuredClone(data);
    const reported = copy.claims.find(
      (c) =>
        c.id === 'yk-y22-lw-2008-fighting-a-rearguard-action-against-the-b',
    )!;
    reported.attributes!.thought!.roles = ['earliest-located'];
    const messages =
      datasetSchema.safeParse(copy).error?.issues.map((i) => i.message) ?? [];
    expect(messages).toContain(
      'A retrospective articulation is not earliest located',
    );
  });

  it('stores no selection role such as "strongest"', () => {
    for (const r of records)
      expect(r.roles as string[], r.claim.id).not.toContain('strongest');
  });

  it('shows earlier views with later contesting texts by the same author', () => {
    for (const r of records.filter(
      (r) =>
        r.stance === 'articulates' && r.evidence.some((e) => e.contextOnly),
    )) {
      const entry = entries.find((e) => e.records.includes(r))!;
      expect(
        laterContests(r, entry.records).length,
        r.claim.id,
      ).toBeGreaterThan(0);
    }
  });

  it('names the context of every context-only passage and resolves its records', () => {
    const items = data.evidence.filter((e) => e.contextOnly);
    expect(items.length).toBeGreaterThan(0);
    for (const e of items) {
      expect(e.contextOnly!.requires.length, e.id).toBeGreaterThan(0);
      const required = requiredContext(
        e,
        repository.claims,
        repository.evidence,
      );
      expect(required.length, e.id).toBe(e.contextOnly!.claimIds?.length ?? 0);
      for (const { quote } of required)
        if (quote) expect(quote.contextOnly, e.id).toBeUndefined();
    }
  });

  it('states the context beside each context-only passage in the starter', async () => {
    const markdown = propositionsStarterMarkdown(
      await propositionsStarter(data, yudkowskyArguments),
    );
    const lines = markdown.split('\n');
    const notes = lines
      .map((l, i) => [l, lines[i - 1]] as const)
      .filter(([l]) => l.includes('Shown only with its context'));
    expect(notes.length).toBe(
      data.evidence.filter(
        (e) => e.contextOnly && view.claimIds.includes(e.claimId),
      ).length,
    );
    for (const [, before] of notes)
      expect(before).toMatch(/^ {4}- (Quote|Paraphrase): /);
  });
});
