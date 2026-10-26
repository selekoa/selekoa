import { describe, expect, it } from 'vitest';
import { repository } from './repository';
import { datasetSchema, type Claim, type Dataset } from './schema';

// Synthetic records exercising the schema 2.9 rules, added to a copy of the
// real dataset so cross-record checks run as they do on stored data.
const day = '2026-10-04';
const source = (id: string, publisher: string, documentId?: string) => ({
  id,
  ...(documentId ? { documentId } : {}),
  title: 'Test source ' + id,
  authors: [publisher],
  publisher,
  publicationDate: '2025-01-01',
  version: 'Synthetic test expression.',
  canonicalUrl: 'https://example.org/' + id,
  evidenceUrl: 'https://example.org/' + id,
  language: 'en',
  documentWords: { count: 5000, basis: 'Synthetic.' },
  kind: 'report' as const,
  accessedAt: day,
  reuse: { attribution: publisher, licence: 'None', note: 'Synthetic.' },
});
const entity = (
  id: string,
  type: 'organisation' | 'public_body' | 'document',
  extra: object = {},
) => ({
  id,
  name: 'Test ' + id,
  type,
  subtype: 'Test',
  aliases: [],
  description: 'Synthetic test entity.',
  sourceIds: ['test-source-a'],
  ...extra,
});
const evidence = (
  id: string,
  claimId: string,
  sourceId: string,
  support: 'supports' | 'contradicts' | 'context' = 'supports',
  passageType: 'quote' | 'paraphrase' = 'quote',
) => ({
  id,
  claimId,
  sourceId,
  sourceRole: 'primary' as const,
  support,
  locator: 'Section 1',
  passage: 'A short synthetic passage.',
  passageType,
  verification: 'machine_checked' as const,
  checkedAt: day,
  note: 'Synthetic.',
});
const base = {
  topic: 'governance' as const,
  derivation: 'explicit' as const,
  resolution: 'supported' as const,
  editorialState: 'seed' as const,
  qualification: 'Synthetic.',
  recordedAt: day,
};
const claims: Claim[] = [
  {
    ...base,
    id: 'test-control-effective',
    subject: 'test-holder',
    predicate: 'holds_control_right',
    object: { kind: 'entity', entityId: 'test-entity' },
    statement: 'Holder appoints the directors of the entity.',
    time: { kind: 'interval', from: '2025-10-28', note: 'Effective date.' },
    evidenceIds: ['test-ev-control'],
    attributes: {
      control: {
        right: 'appoints_directors',
        instrument: 'Certificate of incorporation',
        stage: 'effective',
      },
    },
  },
  {
    ...base,
    id: 'test-control-announced',
    subject: 'test-holder',
    predicate: 'holds_control_right',
    object: { kind: 'entity', entityId: 'test-entity' },
    statement: 'Holder announced it would control the entity.',
    time: {
      kind: 'event',
      date: '2025-05-05',
      basis: 'announcement',
      note: 'Announcement.',
    },
    evidenceIds: ['test-ev-announced'],
    attributes: {
      control: { right: 'controls', instrument: 'Plan', stage: 'announced' },
    },
  },
  {
    ...base,
    id: 'test-conversion',
    subject: 'test-entity',
    predicate: 'converted_into',
    object: { kind: 'entity', entityId: 'test-holder' },
    statement: 'The entity converted.',
    time: { kind: 'event', date: '2025-10-28', note: 'Effective.' },
    evidenceIds: ['test-ev-conversion'],
    attributes: { control: { instrument: 'Conversion', stage: 'effective' } },
  },
  {
    ...base,
    id: 'test-form',
    subject: 'test-entity',
    predicate: 'has_legal_form',
    object: { kind: 'literal', value: 'Delaware public benefit corporation' },
    statement: 'The entity is a Delaware public benefit corporation.',
    time: { kind: 'snapshot', date: '2025-10-28', note: 'Snapshot.' },
    evidenceIds: ['test-ev-form'],
  },
  {
    ...base,
    id: 'test-enacted',
    subject: 'test-legislature',
    predicate: 'enacted',
    object: { kind: 'entity', entityId: 'test-commitment' },
    statement: 'The legislature enacted the text.',
    time: {
      kind: 'event',
      date: '2025-09-29',
      basis: 'signature',
      note: 'Signed.',
    },
    evidenceIds: ['test-ev-enacted'],
  },
  {
    ...base,
    id: 'test-signed',
    subject: 'test-holder',
    predicate: 'signed_commitment',
    object: { kind: 'entity', entityId: 'test-commitment' },
    statement: 'Holder signed the text.',
    time: {
      kind: 'event',
      date: '2025-09-29',
      basis: 'announcement',
      note: 'Listed.',
    },
    evidenceIds: ['test-ev-signed'],
    attributes: {
      commitment: { stage: 'listed', scope: 'Safety chapter only' },
    },
  },
  {
    ...base,
    id: 'test-declined',
    subject: 'test-entity',
    predicate: 'declined_commitment',
    object: { kind: 'entity', entityId: 'test-commitment' },
    statement: 'The entity stated it would not sign.',
    time: {
      kind: 'event',
      date: '2025-07-18',
      basis: 'announcement',
      note: 'Statement.',
    },
    evidenceIds: ['test-ev-declined'],
  },
  {
    ...base,
    id: 'test-link',
    subject: 'test-framework',
    predicate: 'references_commitment',
    object: { kind: 'entity', entityId: 'test-commitment' },
    statement: 'The framework states that it fulfils the commitment.',
    time: { kind: 'event', date: '2025-02-01', note: 'Edition date.' },
    evidenceIds: ['test-ev-link'],
    attributes: { commitment: { link: 'fulfils' } },
  },
  {
    ...base,
    id: 'test-assessed',
    subject: 'test-entity',
    predicate: 'control_assessed',
    object: { kind: 'literal', value: 'Whether control was preserved' },
    statement: 'Sources disagree whether control was preserved.',
    resolution: 'contested',
    time: { kind: 'event', date: '2025-10-28', note: 'Assessments.' },
    evidenceIds: ['test-ev-assessed-a', 'test-ev-assessed-b'],
  },
];
const ev = [
  evidence('test-ev-control', 'test-control-effective', 'test-source-a'),
  evidence('test-ev-announced', 'test-control-announced', 'test-source-a'),
  evidence('test-ev-conversion', 'test-conversion', 'test-source-a'),
  evidence('test-ev-form', 'test-form', 'test-source-a'),
  evidence('test-ev-enacted', 'test-enacted', 'test-source-law'),
  evidence('test-ev-signed', 'test-signed', 'test-source-a'),
  evidence('test-ev-declined', 'test-declined', 'test-source-b'),
  evidence('test-ev-link', 'test-link', 'test-source-framework'),
  evidence('test-ev-assessed-a', 'test-assessed', 'test-source-a'),
  evidence(
    'test-ev-assessed-b',
    'test-assessed',
    'test-source-b',
    'contradicts',
  ),
];
function fixture() {
  const d = structuredClone(repository.data) as Dataset;
  d.meta.schemaVersion = '2.9';
  d.entities.push(
    entity('test-holder', 'organisation') as Dataset['entities'][number],
    entity('test-entity', 'organisation') as Dataset['entities'][number],
    entity('test-legislature', 'public_body') as Dataset['entities'][number],
    entity('test-commitment', 'document', {
      documentVersion: {
        family: 'test-commitments',
        label: 'Enacted text',
        publisherId: 'test-legislature',
        publishedAt: '2025-09-29',
        dateNote: 'Synthetic.',
      },
    }) as Dataset['entities'][number],
    entity('test-framework', 'document', {
      sourceIds: ['test-source-framework'],
    }) as Dataset['entities'][number],
  );
  d.sources.push(
    source('test-source-a', 'Publisher A'),
    source('test-source-b', 'Publisher B'),
    source('test-source-law', 'Legislature', 'test-commitment'),
    source('test-source-framework', 'Publisher A', 'test-framework'),
  );
  d.claims.push(...structuredClone(claims));
  d.evidence.push(...structuredClone(ev));
  return d;
}
const parses = (d: Dataset) => datasetSchema.safeParse(d).success;
const get = (d: Dataset, id: string) => d.claims.find((c) => c.id === id)!;

describe('schema 2.9 control structures and commitments', () => {
  it('accepts well-formed control, commitment and assessment records', () => {
    const result = datasetSchema.safeParse(fixture());
    expect(result.error?.issues ?? []).toEqual([]);
  });

  it('requires a right, an instrument and a stage on control rights', () => {
    const d = fixture();
    delete get(d, 'test-control-effective').attributes!.control!.right;
    expect(parses(d)).toBe(false);
    const e = fixture();
    delete get(e, 'test-control-effective').attributes;
    expect(parses(e)).toBe(false);
    const f = fixture();
    get(f, 'test-conversion').attributes!.control!.right = 'controls';
    expect(parses(f)).toBe(false);
  });

  it('dates announced arrangements by announcement, effective ones otherwise', () => {
    const d = fixture();
    get(d, 'test-control-announced').time = {
      kind: 'interval',
      from: '2025-05-05',
      note: 'Wrongly treated as effective.',
    };
    expect(parses(d)).toBe(false);
    const e = fixture();
    get(e, 'test-control-effective').time = {
      kind: 'event',
      date: '2025-10-28',
      basis: 'announcement',
      note: 'An announcement is not the effective date.',
    };
    expect(parses(e)).toBe(false);
  });

  it('keeps control and commitment attributes on their own predicates', () => {
    const d = fixture();
    get(d, 'test-form').attributes = {
      control: { instrument: 'x', stage: 'effective' },
    };
    expect(parses(d)).toBe(false);
    const e = fixture();
    get(e, 'test-form').attributes = { commitment: { scope: 'x' } };
    expect(parses(e)).toBe(false);
    const f = fixture();
    get(f, 'test-declined').attributes = { commitment: { stage: 'signed' } };
    expect(parses(f)).toBe(false);
  });

  it('requires a signing stage, an announced refusal and an explicit record', () => {
    const d = fixture();
    delete get(d, 'test-signed').attributes!.commitment!.stage;
    expect(parses(d)).toBe(false);
    const e = fixture();
    get(e, 'test-declined').time = {
      kind: 'snapshot',
      date: '2025-07-18',
      note: 'Not an announcement.',
    };
    expect(parses(e)).toBe(false);
    const f = fixture();
    Object.assign(get(f, 'test-signed'), {
      derivation: 'inferred',
      inferenceRationale: 'Inferred from a list.',
    });
    expect(parses(f)).toBe(false);
  });

  it('requires a commitment link to quote the linking document', () => {
    const d = fixture();
    d.evidence.find((e) => e.id === 'test-ev-link')!.passageType = 'paraphrase';
    expect(parses(d)).toBe(false);
    const e = fixture();
    e.evidence.find((x) => x.id === 'test-ev-link')!.sourceId = 'test-source-a';
    expect(parses(e)).toBe(false);
    const f = fixture();
    delete get(f, 'test-link').attributes!.commitment!.link;
    expect(parses(f)).toBe(false);
  });

  it('never records a control assessment as supported or one-sourced', () => {
    const d = fixture();
    get(d, 'test-assessed').resolution = 'supported';
    expect(parses(d)).toBe(false);
    const e = fixture();
    e.evidence.find((x) => x.id === 'test-ev-assessed-b')!.sourceId =
      'test-source-a';
    expect(parses(e)).toBe(false);
  });

  it('lets public bodies publish versioned texts but not frameworks of others', () => {
    const d = fixture();
    d.entities.find(
      (x) => x.id === 'test-commitment',
    )!.documentVersion!.publisherId = 'test-framework';
    expect(parses(d)).toBe(false);
    const e = fixture();
    get(e, 'test-enacted').time = {
      kind: 'interval',
      from: '2025-09-29',
      note: 'Not an event.',
    };
    expect(parses(e)).toBe(false);
  });
});
