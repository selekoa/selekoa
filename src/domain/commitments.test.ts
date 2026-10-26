import { describe, expect, it } from 'vitest';
import { repository } from './repository';
import { commitmentsView } from './commitments';
import {
  commitmentsStarter,
  commitmentsStarterMarkdown,
  controlStarterMarkdown,
  controlStructureStarter,
} from './governance-starters';
import { controlStructure } from './control-structures';
import { documentHistory } from './document-history';
import { documentHistoryStarter } from './starter';
import { resolveReference } from './deep-links';
import { externalCommitments } from '../reading/commitments';
import { controlStructures } from '../reading/control-structures';
import { frontierSafetyFrameworks } from '../reading/frontier-safety-frameworks';
import week4b from '../../review/week4b-before-2026-10-04.json';
import type { Dataset } from './schema';

const data = repository.data;
const words = (s: string) => s.trim().split(/\s+/).length;
const evidenceOf = (id: string) =>
  repository.claims
    .get(id)!
    .evidenceIds.map((e) => repository.evidence.get(e)!);

describe('California SB 53 (week 4b)', () => {
  const view = commitmentsView(data, externalCommitments);
  const sb53 = view.documents.find((d) => d.entity.id === 'california-sb-53')!;

  it('records the chaptered text as a versioned public-body document', () => {
    expect(sb53.entity.documentVersion).toMatchObject({
      family: 'ca-sb-53',
      publisherId: 'california-legislature',
      publishedAt: '2025-09-29',
      effectiveAt: '2026-01-01',
    });
    expect(repository.entities.get('california-legislature')!.type).toBe(
      'public_body',
    );
    expect(sb53.issued.map((c) => c.id)).toEqual(['sb-enactment-2025-09-29']);
    expect(sb53.issued[0]).toMatchObject({
      predicate: 'enacted',
      subject: 'governor-of-california',
      time: { date: '2025-09-29', basis: 'signature' },
    });
    expect(sb53.sources.map((s) => s.id)).toEqual(['source-ca-sb53-chaptered']);
  });

  it('quotes every provision from the chaptered text, briefly', () => {
    expect(sb53.provisions.length).toBe(19);
    for (const c of sb53.provisions) {
      expect(c).toMatchObject({
        predicate: 'states_provision',
        derivation: 'explicit',
        resolution: 'supported',
        editorialState: 'seed',
        time: { date: '2025-09-29', basis: 'publication' },
      });
      const quote = evidenceOf(c.id).find(
        (e) =>
          e.support === 'supports' &&
          e.passageType === 'quote' &&
          e.sourceId === 'source-ca-sb53-chaptered',
      );
      expect(quote, c.id).toBeTruthy();
      expect(words(quote!.passage)).toBeLessThanOrEqual(50);
      expect(c.qualification).toContain(
        'not evidence that the statute applies',
      );
    }
    const keys = sb53.provisions.map((c) => c.attributes!.provision!.key);
    expect(keys).toContain('sb53-frontier-model-compute-threshold');
    expect(keys).toContain('sb53-frontier-ai-framework-publication');
    expect(keys).toContain('sb53-attorney-general-enforcement');
  });

  it('links four framework editions to SB 53 only in their own quoted words', () => {
    expect(
      sb53.links.map((c) => [c.subject, c.attributes!.commitment!.link]),
    ).toEqual([
      ['faif-2025', 'complies_with'],
      ['ms-fgf-2026', 'responds_to'],
      ['rsp-v3-0', 'names'],
      ['frontier-governance-2026', 'designated_under'],
    ]);
    for (const c of sb53.links) {
      const own = evidenceOf(c.id).filter(
        (e) =>
          e.support === 'supports' &&
          e.passageType === 'quote' &&
          repository.sources.get(e.sourceId)!.documentId === c.subject,
      );
      expect(own.length, c.id).toBeGreaterThan(0);
      expect(c.qualification).toContain('not evidence that the edition');
    }
    // The edition histories show the same links (with those to the other
    // commitment texts), never as replacement.
    const history = documentHistory(data, frontierSafetyFrameworks);
    const links = history.families.flatMap((f) =>
      f.editions.flatMap((e) => e.commitmentLinks.map((c) => c.id)),
    );
    expect(links.sort()).toEqual(
      view.documents.flatMap((d) => d.links.map((c) => c.id)).sort(),
    );
    for (const c of sb53.links) expect(links).toContain(c.id);
  });

  it('keeps the Frontier Compliance Framework an announcement, not a link', () => {
    const fcf = repository.claims.get('sb-anthropic-fcf-published')!;
    expect(fcf).toMatchObject({
      predicate: 'published',
      subject: 'anthropic',
      time: { date: '2025-12-19', basis: 'announcement' },
    });
    expect(
      data.claims.some(
        (c) =>
          c.subject === 'anthropic-frontier-compliance-framework' &&
          c.predicate === 'references_commitment',
      ),
    ).toBe(false);
  });

  it('lists stopped questions without turning them into records', () => {
    expect(externalCommitments.stops.map((s) => s.category)).toEqual(
      Array(externalCommitments.stops.length).fill('legal_effect'),
    );
    for (const s of externalCommitments.stops)
      for (const id of s.claimIds) expect(repository.claims.has(id)).toBe(true);
    // No record asserts that a named company is covered or compliant.
    for (const id of week4b.added.claims) {
      const c = repository.claims.get(id)!;
      expect(c.statement).not.toMatch(/is a (large )?frontier developer/i);
    }
  });

  it('adds only machine-checked seeds and changes no stored row', () => {
    for (const id of week4b.added.claims) {
      const c = repository.claims.get(id)!;
      expect(c.editorialState).toBe('seed');
      for (const e of evidenceOf(id)) {
        expect(e.verification).toBe('machine_checked');
        expect(e.reviewer).toBeUndefined();
      }
    }
    for (const name of ['entities', 'claims', 'sources', 'evidence'] as const)
      expect(week4b.before[name]).toEqual([]);
  });

  it('exports a commitments starter with provisions, links and stops', async () => {
    const starter = await commitmentsStarter(data, externalCommitments);
    expect(
      starter.commitments.documents.find(
        (d) => d.documentId === 'california-sb-53',
      )!.linkClaimIds,
    ).toHaveLength(4);
    expect(starter.claims.map((c) => c.id)).toEqual(view.claimIds);
    const md = commitmentsStarterMarkdown(starter);
    expect(md).toContain('# External commitments and obligations');
    expect(md).toContain('never evidence of compliance');
    expect(md).toContain('## Questions set aside');
    expect(md).toContain('Provision (threshold or trigger)');
    const historyStarter = await documentHistoryStarter(
      data,
      frontierSafetyFrameworks,
    );
    expect(
      historyStarter.families
        .flatMap((f) => f.editions)
        .flatMap((e) => e.commitmentLinkClaimIds)
        .sort(),
    ).toEqual(view.documents.flatMap((d) => d.links.map((c) => c.id)).sort());
  });

  it('resolves the commitments page address and only the listed control pages', () => {
    expect(
      resolveReference('#/commitments/external-commitments', data).target,
    ).toEqual({ kind: 'commitments', id: 'external-commitments' });
    expect(controlStructures.map((c) => c.id)).toEqual(['openai', 'anthropic']);
    expect(resolveReference('#/control/openai', data).target).toEqual({
      kind: 'control',
      id: 'openai',
    });
    expect(resolveReference('#/control/xai', data).target).toBeNull();
  });
});

describe('control-structure timeline projection', () => {
  // Synthetic records: the OpenAI and Anthropic timelines arrive with their
  // verified data in a later increment.
  const day = '2026-10-04';
  const fixture = () => {
    const d = structuredClone(data) as Dataset;
    const ev = (id: string, claimId: string) => ({
      id,
      claimId,
      sourceId: 'source-openai-launch',
      sourceRole: 'primary' as const,
      support: 'supports' as const,
      locator: 'Synthetic',
      passage: 'Synthetic paraphrase.',
      passageType: 'paraphrase' as const,
      verification: 'machine_checked' as const,
      checkedAt: day,
      note: 'Synthetic.',
    });
    d.entities.push({
      id: 'test-parent',
      name: 'Test Parent',
      type: 'organisation',
      subtype: 'Test',
      aliases: [],
      description: 'Synthetic.',
      sourceIds: ['source-openai-launch'],
    });
    d.entities.push({
      id: 'test-subsidiary',
      name: 'Test Subsidiary',
      type: 'organisation',
      subtype: 'Test',
      aliases: [],
      description: 'Synthetic.',
      sourceIds: ['source-openai-launch'],
    });
    const base = {
      topic: 'governance' as const,
      derivation: 'explicit' as const,
      resolution: 'supported' as const,
      editorialState: 'seed' as const,
      qualification: 'Synthetic.',
      recordedAt: day,
    };
    d.claims.push(
      {
        ...base,
        id: 'test-plan',
        subject: 'test-parent',
        predicate: 'holds_control_right',
        object: { kind: 'entity', entityId: 'test-subsidiary' },
        statement: 'Announced plan.',
        time: {
          kind: 'event',
          date: '2025-05-05',
          basis: 'announcement',
          note: 'Synthetic.',
        },
        evidenceIds: ['test-plan-ev'],
        attributes: {
          control: {
            right: 'controls',
            instrument: 'Plan',
            stage: 'announced',
          },
        },
      },
      {
        ...base,
        id: 'test-effective',
        subject: 'test-parent',
        predicate: 'holds_control_right',
        object: { kind: 'entity', entityId: 'test-subsidiary' },
        statement: 'Effective right.',
        time: { kind: 'interval', from: '2025-10-28', note: 'Synthetic.' },
        evidenceIds: ['test-effective-ev'],
        attributes: {
          control: {
            right: 'appoints_directors',
            instrument: 'Charter',
            stage: 'effective',
          },
        },
      },
      {
        ...base,
        id: 'test-form',
        subject: 'test-subsidiary',
        predicate: 'has_legal_form',
        object: { kind: 'literal', value: 'Public benefit corporation' },
        statement: 'Legal form.',
        time: { kind: 'unknown', note: 'Synthetic.' },
        evidenceIds: ['test-form-ev'],
      },
    );
    d.evidence.push(
      ev('test-plan-ev', 'test-plan'),
      ev('test-effective-ev', 'test-effective'),
      ev('test-form-ev', 'test-form'),
    );
    return d;
  };
  const collection = {
    id: 'test',
    version: 1,
    title: 'Test control structures',
    organisationId: 'test-parent',
    question: 'Who controls the test subsidiary?',
    editorialStatus: 'machine-proposed' as const,
    entityIds: ['test-subsidiary'],
    extraClaimIds: [],
    introduction: 'Synthetic.',
    limits: ['Synthetic limit one.', 'Synthetic limit two.'],
    openQuestions: [],
    stops: [
      {
        id: 'test-stop',
        category: 'legal_effect' as const,
        text: 'Synthetic stop.',
        claimIds: ['test-effective'],
      },
    ],
  };

  it('orders rights by date, keeps announced and effective apart, and lists undated last', () => {
    const structure = controlStructure(fixture(), collection);
    expect(structure.entries.map((e) => [e.claim.id, e.stage])).toEqual([
      ['test-plan', 'Announced'],
      ['test-effective', 'Effective'],
      ['test-form', null],
    ]);
    expect(structure.years.map((y) => y.year)).toEqual(['2025', null]);
    expect(structure.parties[0].legalForms.map((c) => c.id)).toEqual([
      'test-form',
    ]);
    // Records of other organisations are not part of this timeline.
    expect(structure.entries.every((e) => e.claim.id.startsWith('test-'))).toBe(
      true,
    );
  });

  it('exports the timeline with instruments, stages and stops', async () => {
    const starter = await controlStructureStarter(fixture(), collection);
    expect(starter.controlStructure.timeline.map((t) => t.stage)).toEqual([
      'announced',
      'effective',
      null,
    ]);
    const md = controlStarterMarkdown(starter);
    expect(md).toContain(
      '| Date | Stage | Holder | Right | Over | Instrument |',
    );
    expect(md).toContain('Instrument: Charter');
    expect(md).toContain('Synthetic stop.');
  });
});
