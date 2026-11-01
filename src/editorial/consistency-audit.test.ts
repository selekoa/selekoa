import { describe, expect, it } from 'vitest';
import type { Dataset } from '../domain/schema';
import {
  auditChecks,
  auditDataset,
  datesCompatible,
  mentionsDate,
  normaliseName,
  stripQuoted,
} from './consistency-audit';

const reuse = { attribution: 'A', licence: 'None', note: 'Short quotes.' };
const source = (id: string, extra: object = {}) => ({
  id,
  title: `Title ${id}`,
  authors: ['A'],
  publisher: 'Example',
  publicationDate: '2024-01-01',
  version: 'Page',
  canonicalUrl: `https://example.org/${id}`,
  evidenceUrl: `https://example.org/${id}`,
  language: 'en',
  kind: 'announcement',
  accessedAt: '2026-10-01',
  reuse,
  ...extra,
});
const claim = (id: string, extra: object = {}) => ({
  id,
  subject: 'lab-a',
  predicate: 'held_role',
  object: { kind: 'entity', entityId: 'lab-b' },
  topic: 'people',
  statement: `Statement of ${id}.`,
  time: { kind: 'event', date: '2024-01-01', note: 'Announcement date.' },
  derivation: 'explicit',
  resolution: 'supported',
  editorialState: 'seed',
  qualification: 'Scoped.',
  evidenceIds: [`evidence-${id}`],
  recordedAt: '2026-10-01',
  ...extra,
});
const evidence = (claimId: string, extra: object = {}) => ({
  id: `evidence-${claimId}`,
  claimId,
  sourceId: 'source-a',
  sourceRole: 'primary',
  support: 'supports',
  locator: 'p. 1',
  passage: 'A passage.',
  passageType: 'quote',
  verification: 'machine_checked',
  checkedAt: '2026-10-01',
  note: 'Checked.',
  ...extra,
});
const entity = (id: string, name: string, extra: object = {}) => ({
  id,
  name,
  type: 'organisation',
  subtype: 'AI company',
  aliases: [],
  description: `${name}.`,
  sourceIds: ['source-a'],
  ...extra,
});

const fixture = {
  meta: {
    schemaVersion: '2.19',
    updatedAt: '2026-10-28',
    title: 'Fixture',
    scope: 'Fixture',
    anchors: ['lab-a'],
  },
  entities: [
    entity('lab-a', 'Lab A', { aliases: ['Example Labs'] }),
    entity('lab-b', 'Example Labs Inc.'),
    entity('quiet', 'Quiet Org'),
  ],
  claims: [
    claim('role-one', {
      statement: 'Lab A pioneered the method in order to win.',
    }),
    claim('ts-x-lab-a-articulates', {
      predicate: 'bears_on_proposition',
    }),
    claim('yk-y01-lab-a-a', { predicate: 'bears_on_proposition' }),
  ],
  sources: [
    source('source-a', { documentWords: { count: 100, basis: 'Count' } }),
    source('source-late', { publicationDate: '2026-11-01' }),
  ],
  evidence: [
    evidence('role-one'),
    evidence('ts-x-lab-a-articulates', { id: 'evidence-role-one-2' }),
    evidence('yk-y01-lab-a-a'),
  ],
} as unknown as Dataset;
fixture.claims[1].evidenceIds = ['evidence-role-one-2'];

describe('consistency audit helpers', () => {
  it('normalises names and compares dates at their precision', () => {
    expect(normaliseName('Example Labs, Inc.')).toBe('example labs');
    expect(normaliseName('Codeium (company, historical name)')).toBe('codeium');
    expect(datesCompatible('2024', '2024-05-02')).toBe(true);
    expect(datesCompatible('2024-04', '2024-05-02')).toBe(false);
    expect(mentionsDate('Posted on 29 October 2025.', '2025-10-29')).toBe(true);
    expect(stripQuoted('He wrote “the first to” here')).not.toContain('first');
  });
});

describe('auditDataset', () => {
  const report = auditDataset(fixture, [
    {
      kind: 'question',
      id: 'q',
      definition: { id: 'q', claimIds: ['role-one', 'missing-claim'] },
    },
  ]);
  const codes = report.findings.map((f) => f.code);

  it('reports what validation leaves to an editor', () => {
    expect(codes).toContain('name-collision');
    expect(codes).toContain('source-published-after-access');
    expect(codes).toContain('source-unused');
    expect(codes).toContain('entity-without-claims');
    expect(codes).toContain('collection-member-missing');
    expect(codes).toContain('id-states-other-stance');
    expect(codes).toContain('priority-word');
    expect(codes).toContain('motive');
    expect(codes).toContain('evidence-id-names-other-claim');
  });

  it('summarises every check, including those with no findings', () => {
    expect(report.summary.map((s) => s.check)).toEqual([...auditChecks]);
    const total = report.summary.reduce((n, s) => n + s.findings, 0);
    expect(total).toBe(report.findings.length);
  });

  it('reads the stance letter of lettered collections', () => {
    const stance = report.findings.filter(
      (f) => f.code === 'id-states-other-stance',
    );
    expect(stance.map((f) => f.ids[0]).sort()).toEqual([
      'ts-x-lab-a-articulates',
      'yk-y01-lab-a-a',
    ]);
  });

  it('keeps the merge candidate as a lead that needs a source', () => {
    const merge = report.findings.find((f) => f.code === 'name-collision');
    expect(merge?.fix).toBe('needs_source');
    expect(merge?.ids.sort()).toEqual(['lab-a', 'lab-b']);
  });
});
