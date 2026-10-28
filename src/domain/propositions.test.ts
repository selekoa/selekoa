import { describe, expect, it } from 'vitest';
import { repository } from './repository';
import { datasetSchema, type Dataset } from './schema';
import { propositionStances } from './predicates';
import { isPropositionRecord, queryDataset } from './query';
import { propositionsView, recordDates } from './propositions';
import {
  propositionsStarter,
  propositionsStarterMarkdown,
} from './propositions-starter';
import { resolveReference } from './deep-links';
import {
  applicationCollections,
  collectionClaimIds,
} from '../release/collections';
import { superintelligencePropositions } from '../reading/human-thought';

const data = repository.data;
const clone = () => structuredClone(data) as Dataset;
const claim = (d: Dataset, id: string) => d.claims.find((c) => c.id === id)!;
const thought = (d: Dataset, id: string) => claim(d, id).attributes!.thought!;
const issues = (d: Dataset) =>
  datasetSchema.safeParse(d).error?.issues.map((i) => i.message) ?? [];

describe('propositions and proposition records (schema 2.11)', () => {
  it('validates the stored records with their roles and registers', () => {
    expect(issues(data)).toEqual([]);
    const records = data.claims.filter(isPropositionRecord);
    expect(records.length).toBeGreaterThan(0);
    for (const c of records) {
      const target = repository.entities.get(
        c.object.kind === 'entity' ? c.object.entityId : '',
      );
      expect(target?.proposition, c.id).toBeDefined();
      expect(c.attributes?.thought?.register, c.id).toBeDefined();
      expect(c.derivation, c.id).toBe('explicit');
    }
  });

  it('keeps proposition records off the map', () => {
    const { claims } = queryDataset(data, {
      topic: 'all',
      entityType: 'all',
      throughYear: 2026,
      focusId: null,
    });
    expect(claims.some(isPropositionRecord)).toBe(false);
    const focused = queryDataset(data, {
      topic: 'all',
      entityType: 'all',
      throughYear: 2026,
      focusId: 'intelligence-explosion',
    });
    expect(focused.claims.some(isPropositionRecord)).toBe(false);
    expect(Object.keys(propositionStances)).toEqual([
      'articulates_proposition',
      'contests_proposition',
      'bears_on_proposition',
    ]);
  });

  it('allows one earliest located articulation, decided by the date of its wording', () => {
    const two = clone();
    thought(two, 'ts-a1-vinge-1993').roles = ['earliest-located'];
    expect(issues(two)).toContain(
      'intelligence-explosion: exactly one articulation is earliest located',
    );
    const earlier = clone();
    claim(earlier, 'ts-a1-vinge-1993').time = {
      kind: 'event',
      date: '1960',
      note: 'Synthetic regression: an earlier articulation.',
    };
    expect(issues(earlier)).toContain(
      'intelligence-explosion: ts-a1-vinge-1993 is dated before the earliest located record',
    );
    const undated = clone();
    thought(undated, 'ts-a1-good-1965').attested = {
      note: 'Synthetic regression: known only from an undated later copy.',
    };
    expect(issues(undated)).toContain(
      'intelligence-explosion: the earliest located record needs dated wording',
    );
  });

  it('dates claimed and attested wording around the work’s own date', () => {
    const d = clone();
    thought(d, 'ts-a1-sits').attested = {
      date: '1990',
      note: 'Synthetic regression: an attestation before the work.',
    };
    expect(issues(d)).toContain(
      'An attested date is not earlier than the work’s date',
    );
    const e = clone();
    thought(e, 'ts-a1-good-1965').claimed = {
      date: '1970',
      note: 'Synthetic regression: a claimed date after the work.',
    };
    expect(issues(e)).toContain(
      'A claimed date is not later than the work’s date',
    );
  });

  it('names the missing element of a context record and the term of a term record', () => {
    const d = clone();
    delete thought(d, 'ts-a3-good-1965-context').missing;
    expect(issues(d)).toContain(
      'A context record, and only a context record, names the missing element',
    );
    const e = clone();
    thought(e, 'ts-a1-vinge-1993').roles = [
      'articulation',
      'earliest-located-term',
    ];
    thought(e, 'ts-a1-vinge-1993').term = 'intelligence explosion';
    expect(issues(e)).toEqual(
      expect.arrayContaining([
        'The term appears in the record’s evidence',
        'intelligence-explosion: exactly one record is the earliest located use of a usual name',
      ]),
    );
  });

  it('documents what a text says and relates it to a proposition only', () => {
    const inferred = clone();
    claim(inferred, 'ts-a1-vinge-1993').derivation = 'inferred';
    claim(inferred, 'ts-a1-vinge-1993').inferenceRationale =
      'Synthetic premise.';
    expect(issues(inferred)).toContain(
      'A proposition record documents what the text says: explicit and supported',
    );
    const plain = clone();
    const concept = data.entities.find(
      (e) => e.type === 'concept' && !e.proposition,
    )!;
    claim(plain, 'ts-a1-vinge-1993').object = {
      kind: 'entity',
      entityId: concept.id,
    };
    expect(issues(plain)).toContain(
      'A proposition record points to a concept carrying a proposition',
    );
    const elsewhere = clone();
    claim(elsewhere, 'good-discusses-explosion-1965').attributes = {
      thought: { roles: ['articulation'], register: 'nonfiction' },
    };
    expect(issues(elsewhere)).toContain(
      'Thought attributes belong only to proposition records',
    );
  });

  it('keeps one record per text, proposition and stance', () => {
    const d = clone();
    const original = claim(d, 'ts-a1-vinge-1993');
    const evidence = d.evidence.find((e) => e.claimId === original.id)!;
    d.claims.push({
      ...structuredClone(original),
      id: 'test-duplicate-vinge',
      evidenceIds: ['test-duplicate-vinge-evidence'],
    });
    d.evidence.push({
      ...structuredClone(evidence),
      id: 'test-duplicate-vinge-evidence',
      claimId: 'test-duplicate-vinge',
    });
    expect(issues(d)).toContain('One record per text, proposition and stance');
  });
});

describe('the propositions collection page and its starter', () => {
  const view = propositionsView(data, superintelligencePropositions);
  const entries = view.groups.flatMap((g) => g.propositions);

  it('shows every proposition record once, in date order', () => {
    const ids = new Set(entries.map((e) => e.entity.id));
    expect([...view.claimIds].sort()).toEqual(
      data.claims
        .filter(isPropositionRecord)
        .filter((c) => c.object.kind === 'entity' && ids.has(c.object.entityId))
        .map((c) => c.id)
        .sort(),
    );
    expect(new Set(view.claimIds).size).toBe(view.claimIds.length);
    for (const entry of entries) {
      const dates = entry.records.map((r) => r.dated);
      expect(dates, entry.entity.id).toEqual([...dates].sort());
      if (entry.stated.some((r) => r.stance === 'articulates'))
        expect(entry.earliest, entry.entity.id).not.toBeNull();
      expect(entry.earliest?.stance ?? 'articulates').toBe('articulates');
      if (entry.proposition.terms.length)
        expect(entry.earliestTerm, entry.entity.id).not.toBeNull();
    }
  });

  it('names the earliest located text by the date of its wording', () => {
    for (const entry of entries) {
      if (!entry.earliest) continue;
      const wording = entry.earliest.wording!;
      for (const r of entry.stated.filter((r) => r.stance === 'articulates'))
        if (r.wording)
          expect(
            r.wording.slice(0, 4) >= wording.slice(0, 4),
            `${r.claim.id} before ${entry.earliest.claim.id}`,
          ).toBe(true);
    }
    const dates = recordDates(
      entries
        .flatMap((e) => e.records)
        .find((r) => r.claim.id === 'ts-a1-more-1998-contests')!,
    );
    expect(dates).toBe('1998 · wording attested 2000-08-17');
  });

  it('resolves the page address and lists the collection in releases', () => {
    expect(
      resolveReference('/propositions/superintelligence', data).target,
    ).toEqual({
      kind: 'propositions',
      id: 'superintelligence',
      inspect: undefined,
    });
    expect(resolveReference('/propositions/unknown', data).target).toBeNull();
    const release = applicationCollections.find(
      (c) => c.kind === 'propositions',
    )!;
    expect(collectionClaimIds(data, release)).toEqual(view.claimIds);
  });

  it('puts the original sources first in the starter', async () => {
    const starter = await propositionsStarter(
      data,
      superintelligencePropositions,
    );
    const md = propositionsStarterMarkdown(starter);
    const at = (s: string) => md.indexOf(s);
    expect(at('## Original sources')).toBeGreaterThan(0);
    expect(at('## Original sources')).toBeLessThan(at('## How we searched'));
    expect(at('## How we searched')).toBeLessThan(at('### A1 '));
    expect(md).toContain('- Earliest located: ');
    expect(starter.originalSources.map((s) => s.sourceId).sort()).toEqual(
      [...view.sourceIds].sort(),
    );
    const dates = starter.originalSources.map(
      (s) => s.publicationDate ?? '9999',
    );
    expect(dates).toEqual([...dates].sort());
  });
});

describe('contesting records, retrospectives and context-only passages (schema 2.12)', () => {
  it('allows one earliest located contesting record, decided by the date of its wording', () => {
    const one = clone();
    thought(one, 'ts-b6-butler-1865-contests').roles = [
      'contesting',
      'earliest-located',
    ];
    expect(issues(one)).toEqual([]);
    const later = clone();
    thought(later, 'ts-b6-erewhon-1872-contests').roles = [
      'contesting',
      'earliest-located',
    ];
    expect(issues(later)).toContain(
      'control-or-purpose-specification: ts-b6-butler-1865-contests is dated before the earliest located contesting record',
    );
    thought(later, 'ts-b6-butler-1865-contests').roles = [
      'contesting',
      'earliest-located',
    ];
    expect(issues(later)).toContain(
      'control-or-purpose-specification: at most one contesting record is earliest located',
    );
    const context = clone();
    thought(context, 'ts-b5-bostrom-1996-09-03-context').roles = [
      'context',
      'earliest-located',
    ];
    expect(issues(context)).toContain(
      'A role does not match the record’s predicate',
    );
  });

  it('records engagement on contesting records only, with a one-sentence rationale', () => {
    const d = clone();
    thought(d, 'ts-b6-butler-1865-contests').engagement = {
      kind: 'engages-premise',
      rationale: 'Synthetic regression: the message gives a reason.',
    };
    expect(issues(d)).toEqual([]);
    thought(d, 'ts-b6-butler-1865-contests').engagement!.rationale =
      'Synthetic regression. Two sentences.';
    expect(issues(d)).toContain('An engagement rationale is one sentence');
    thought(d, 'ts-a1-good-1965').engagement = {
      kind: 'contrary-only',
      rationale: 'Synthetic regression.',
    };
    expect(issues(d)).toContain(
      'Engagement belongs only to a contesting record',
    );
  });

  it('dates a retrospective by the report, never after it', () => {
    const d = clone();
    thought(d, 'ts-b6-michie-1968-contests').retrospective = {
      from: '1950',
      until: '1960',
      note: 'Synthetic regression: an earlier belief reported.',
    };
    expect(issues(d)).toEqual([]);
    thought(d, 'ts-b6-michie-1968-contests').retrospective!.until = '1970';
    expect(issues(d)).toContain(
      'A retrospective reports a belief held before it',
    );
    thought(d, 'ts-b6-michie-1968-contests').retrospective = {
      from: '1960',
      until: '1950',
      note: 'Synthetic regression.',
    };
    expect(issues(d)).toContain('A reported belief starts before it ends');
  });

  it('names the context a context-only passage needs', () => {
    const d = clone();
    const e = d.evidence.find(
      (x) => x.claimId === 'ts-b6-butler-1865-contests',
    )!;
    e.contextOnly = {
      reason: 'Synthetic regression.',
      requires: 'The later record.',
      claimIds: ['ts-b6-erewhon-1872-contests'],
    };
    expect(issues(d)).toEqual([]);
    e.contextOnly.claimIds = ['no-such-claim', e.claimId];
    expect(issues(d)).toEqual(
      expect.arrayContaining([
        'Required context is not a record: no-such-claim',
        'Required context is another record',
      ]),
    );
  });
});
