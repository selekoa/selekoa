import { createHash } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import { repository } from './repository';
import { controlStructure } from './control-structures';
import {
  controlStarterMarkdown,
  controlStructureStarter,
} from './governance-starters';
import {
  anthropicControl,
  controlStructures,
  openaiControl,
} from '../reading/control-structures';
import { preWeek4cRaw } from '../editorial/historical-views';
import week4c from '../../review/week4c-before-2026-10-04.json';

const data = repository.data;
const sha = (value: unknown) =>
  createHash('sha256').update(JSON.stringify(value)).digest('hex');
const added = new Set<string>(week4c.added.claims);
const evidenceOf = (id: string) =>
  repository.claims
    .get(id)!
    .evidenceIds.map((e) => repository.evidence.get(e)!);
const addedControl = data.claims.filter(
  (c) =>
    added.has(c.id) &&
    controlStructures.some((s) =>
      controlStructure(data, s).claimIds.includes(c.id),
    ),
);

describe('week 4c historical view', () => {
  it('reproduces the dataset as merged before week 4c', () => {
    for (const key of ['entities', 'claims', 'sources', 'evidence'] as const)
      expect(sha(preWeek4cRaw[key]), key).toBe(week4c.sha256[key]);
    expect(sha(preWeek4cRaw.meta)).toBe(week4c.sha256.meta);
  });

  it('changed only the three OpenAI announcement sources it quotes', () => {
    const changed = [
      'source-atlas-openai-lp',
      'source-atlas-openai-pbc-plan',
      'source-atlas-openai-recapitalization',
    ];
    expect(week4c.before.sources.map((s) => s.id).sort()).toEqual(changed);
    for (const name of ['entities', 'claims', 'evidence'] as const)
      expect(week4c.before[name]).toEqual([]);
    for (const id of changed)
      expect(repository.sources.get(id)!.documentWords).toBeDefined();
  });
});

describe('OpenAI and Anthropic control structures (week 4c)', () => {
  const openai = controlStructure(data, openaiControl);
  const anthropic = controlStructure(data, anthropicControl);

  it('routes two timelines built from stored records only', () => {
    expect(controlStructures.map((c) => c.id)).toEqual(['openai', 'anthropic']);
    expect(addedControl.length).toBeGreaterThan(40);
    for (const s of [openai, anthropic])
      for (const e of s.entries)
        expect(e.claim).toBe(repository.claims.get(e.claim.id));
  });

  it('adds only machine-checked seeds', () => {
    for (const c of addedControl) {
      expect(c.editorialState, c.id).toBe('seed');
      for (const e of evidenceOf(c.id)) {
        expect(e.verification).toBe('machine_checked');
        expect(e.reviewer).toBeUndefined();
      }
    }
  });

  it('keeps announced and effective arrangements apart', () => {
    const staged = addedControl.filter((c) => c.attributes?.control);
    expect(staged.length).toBe(15);
    for (const c of staged) {
      const announced =
        c.time.kind === 'event' && c.time.basis === 'announcement';
      expect(announced, c.id).toBe(
        c.attributes!.control!.stage !== 'effective',
      );
    }
    const rights = openai.entries
      .filter((e) => e.kind === 'control')
      .map((e) => [e.claim.id, e.stage, e.right]);
    expect(rights).toContainEqual([
      'cs-openai-lp-board-control-2019',
      'Announced',
      'controls',
    ]);
    expect(rights).toContainEqual([
      'cs-openai-nonprofit-retains-control-2025',
      'Announced',
      'controls',
    ]);
  });

  it('records who holds which right over OpenAI Group PBC, from the filed certificate', () => {
    const overPbc = openai.entries.filter(
      (e) => e.kind === 'control' && e.object?.id === 'openai-group-pbc',
    );
    expect(
      overPbc.map((e) => [e.subject.id, e.right, e.stage, e.date]),
    ).toEqual([
      ['openai-inc', 'elects_directors', 'Effective', '2025-10-28'],
      ['openai-inc', 'veto', 'Effective', '2025-10-28'],
      ['openai-inc', 'removes_directors', 'Effective', '2025-10-28'],
    ]);
    for (const e of overPbc)
      expect(
        evidenceOf(e.claim.id).some(
          (v) => v.sourceId === 'source-openai-group-pbc-certificate',
        ),
      ).toBe(true);
    // A provision of the certificate and of the Delaware letter is shown as such.
    expect(
      openai.entries
        .filter((e) => e.kind === 'provision')
        .map((e) => e.claim.subject),
    ).toEqual(
      expect.arrayContaining([
        'openai-group-pbc-certificate-2025',
        'delaware-ag-openai-statement-2025',
      ]),
    );
  });

  it('records the Long-Term Benefit Trust’s rights and their amendment from the certificates', () => {
    expect(
      anthropic.entries
        .filter((e) => e.kind === 'control')
        .map((e) => [e.subject.id, e.right]),
    ).toEqual([
      ['anthropic-ltbc', 'veto'],
      ['anthropic-ltbt', 'elects_directors'],
      ['anthropic-ltbt', 'veto'],
      ['anthropic-ltbt', 'removes_directors'],
    ]);
    const change = repository.claims.get(
      'provchange-anthropic-coi-2024-01-29-class-t-phase-in',
    )!;
    expect(change).toMatchObject({
      predicate: 'changes_from',
      derivation: 'inferred',
      object: { kind: 'entity', entityId: 'anthropic-coi-2023-09-21' },
      attributes: {
        changeBasis: 'document_comparison',
        provision: { key: 'class-t-phase-in' },
      },
    });
    expect(anthropic.entries.map((e) => e.kind)).toContain('amendment');
  });

  it('marks quotes read from certificate scans as visual transcriptions', () => {
    const scans = new Set(
      data.sources
        .filter(
          (s) =>
            s.id.startsWith('source-anthropic-coi-') ||
            s.id === 'source-openai-group-pbc-certificate',
        )
        .map((s) => s.id),
    );
    expect(scans.size).toBe(7);
    const quotes = data.evidence.filter(
      (e) => scans.has(e.sourceId) && e.passageType === 'quote',
    );
    expect(quotes.length).toBeGreaterThan(10);
    for (const e of quotes)
      expect(e.note, e.id).toMatch(/transcribed from the page image/);
  });

  it('keeps two control assessments as open questions with context from two or more publishers', () => {
    const assessed = data.claims.filter(
      (c) => added.has(c.id) && c.predicate === 'control_assessed',
    );
    expect(assessed.map((c) => c.id).sort()).toEqual([
      'cs-assessed-anthropic-ltbt-independence',
      'cs-assessed-openai-recapitalization-control',
    ]);
    for (const c of assessed) {
      // The 2026-10-04 different-model check found no opposing passages on
      // the same practical-capability question; every passage is context.
      expect(c.resolution).toBe('unresolved');
      expect(c.statement).not.toMatch(/disagree/);
      const items = evidenceOf(c.id);
      expect(items.every((e) => e.support === 'context')).toBe(true);
      expect(
        new Set(items.map((e) => repository.sources.get(e.sourceId)!.publisher))
          .size,
      ).toBeGreaterThan(1);
    }
  });

  it('sets aside legal questions instead of recording them', () => {
    for (const s of [openaiControl, anthropicControl]) {
      expect(s.stops.length).toBeGreaterThan(3);
      for (const q of [...s.stops, ...s.openQuestions])
        for (const id of q.claimIds)
          expect(repository.claims.has(id), id).toBe(true);
    }
    for (const c of addedControl)
      expect(c.statement, c.id).not.toMatch(
        /controls? .* in law|is the general partner\b|legally binding/i,
      );
  });

  it('exports a research starter for each timeline', async () => {
    for (const collection of controlStructures) {
      const starter = await controlStructureStarter(data, collection);
      const md = controlStarterMarkdown(starter);
      expect(md).toContain(`# ${collection.title}: research starter`);
      expect(md).toContain('## Recorded control rights');
      expect(md).toContain('Provision of a governing document');
      expect(starter.controlStructure.timeline.length).toBe(
        controlStructure(data, collection).entries.length,
      );
    }
  });
});
