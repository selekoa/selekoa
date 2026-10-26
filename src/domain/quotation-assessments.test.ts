import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { createRepository, repository } from './repository';
import {
  datasetSchema,
  maxQuotedWords,
  withinQuotationLimit,
  type Dataset,
} from './schema';
import { documentHistory } from './document-history';
import { documentHistoryStarter, starterMarkdown } from './starter';
import { frontierSafetyFrameworks } from '../reading/frontier-safety-frameworks';
import {
  preFixPassRaw,
  preProvisionsRaw,
  preWeek4cRaw,
} from '../editorial/historical-views';
import {
  assessmentPackets,
  isAssessment,
  renderAssessmentPacket,
} from '../editorial/assessment-packet';
import { format, resolveConfig } from 'prettier';

const data = repository.data;
const words = (s: string) => s.trim().split(/\s+/).length;
const clone = () => structuredClone(data) as Dataset;
const parses = (d: Dataset) => datasetSchema.safeParse(d).success;
const claim = (d: Dataset, id: string) => d.claims.find((c) => c.id === id)!;
const evidenceOf = (id: string) =>
  repository.claims
    .get(id)!
    .evidenceIds.map((e) => repository.evidence.get(e)!);
// A passage quoted for several claims counts once (clarified in schema 2.11).
const quotedWords = (d: Dataset, sourceId: string) =>
  [
    ...new Set(
      d.evidence
        .filter((e) => e.sourceId === sourceId && e.passageType === 'quote')
        .map((e) => e.passage.trim().replace(/\s+/g, ' ')),
    ),
  ].reduce((n, passage) => n + words(passage), 0);

describe('length-scaled quotation rule (2026-10-15)', () => {
  it('allows 10% under 2,000 words, then 400 words or 5%, at most 800', () => {
    expect(maxQuotedWords(500)).toBe(50);
    expect(maxQuotedWords(1999)).toBe(199);
    expect(maxQuotedWords(2000)).toBe(400);
    expect(maxQuotedWords(8000)).toBe(400);
    expect(maxQuotedWords(10500)).toBe(525);
    expect(maxQuotedWords(13570)).toBe(678);
    expect(maxQuotedWords(16000)).toBe(800);
    expect(maxQuotedWords(100000)).toBe(800);
  });

  it('allows one complete sentence of up to 25 words in a short text', () => {
    const sentence = Array.from({ length: 24 }, (_, i) => 'w' + i).join(' ');
    expect(withinQuotationLimit(120, [sentence + '.'])).toBe(true);
    expect(withinQuotationLimit(120, [sentence + '?”'])).toBe(true);
    // The same passage quoted for two claims counts once.
    expect(withinQuotationLimit(120, [sentence + '.', sentence + '.'])).toBe(
      true,
    );
    // A fragment, a second passage or a longer sentence gets no allowance.
    expect(withinQuotationLimit(120, [sentence])).toBe(false);
    expect(withinQuotationLimit(120, [sentence + '.', 'Another.'])).toBe(false);
    expect(withinQuotationLimit(120, [sentence + ' w24 w25.'])).toBe(false);
    // From 2,000 words the scaled limit applies, with no sentence allowance.
    expect(withinQuotationLimit(2000, [sentence + '.'])).toBe(true);
  });

  it('records the length of every quoted source and keeps within its limit', () => {
    const quoted = new Set(
      data.evidence
        .filter((e) => e.passageType === 'quote')
        .map((e) => e.sourceId),
    );
    expect(quoted.size).toBeGreaterThan(40);
    for (const id of quoted) {
      const source = repository.sources.get(id)!;
      expect(source.documentWords, id).toBeDefined();
      const passages = data.evidence
        .filter((e) => e.sourceId === id && e.passageType === 'quote')
        .map((e) => e.passage);
      expect(
        withinQuotationLimit(source.documentWords!.count, passages),
        id,
      ).toBe(true);
      expect(source.reuse.note).not.toMatch(/five quotes/);
    }
    for (const e of data.evidence.filter((e) => e.passageType === 'quote'))
      expect(words(e.passage), e.id).toBeLessThanOrEqual(50);
  });

  it('rejects a missing length, an exceeded limit and a long quote', () => {
    const noLength = clone();
    delete noLength.sources.find((s) => s.id === 'source-rsp-2-0')!
      .documentWords;
    expect(parses(noLength)).toBe(false);

    const short = clone();
    // A 600-word document allows 60 quoted words; SaferAI carries 36.
    short.sources.find(
      (s) => s.id === 'source-saferai-rsp-2024',
    )!.documentWords!.count = 300;
    expect(quotedWords(short, 'source-saferai-rsp-2024')).toBeGreaterThan(30);
    expect(parses(short)).toBe(false);

    const long = clone();
    long.evidence.find(
      (e) => e.id === 'evidence-rsp-v3-0-assessed-weakening-kaplan',
    )!.passage = Array.from({ length: 51 }, (_, i) => 'w' + i).join(' ');
    expect(parses(long)).toBe(false);
  });

  it('leaves earlier schema versions readable without recorded lengths', () => {
    expect(preProvisionsRaw.meta.schemaVersion).toBe('2.7');
    expect(
      preProvisionsRaw.sources.some(
        (s) => 'documentWords' in (s as Record<string, unknown>),
      ),
    ).toBe(false);
    expect(() => createRepository(preProvisionsRaw)).not.toThrow();
  });
});

describe('provision text and disputes about it are separate records', () => {
  it('keeps the Preparedness v2 rule supported, with its own quote only', () => {
    const p = repository.claims.get(
      'prov-preparedness-v2-high-deployment-restriction',
    )!;
    expect(p.resolution).toBe('supported');
    expect(evidenceOf(p.id).map((e) => [e.support, e.sourceId])).toEqual([
      ['supports', 'source-pf-2'],
    ]);
  });

  it('records the dispute as a contested assessment with both sides', () => {
    const a = repository.claims.get(
      'assessed-preparedness-v2-high-deployment-mitigation',
    )!;
    expect(a).toMatchObject({
      predicate: 'provision_assessed',
      subject: 'preparedness-v2',
      resolution: 'contested',
      attributes: {
        provision: { key: 'pf-high-deployment-restriction' },
      },
    });
    const side = (support: string) =>
      evidenceOf(a.id)
        .filter((e) => e.support === support)
        .map((e) => e.id.replace(a.id + '-', '').replace('evidence-', ''));
    // The authors' reading of leadership discretion against OpenAI's stated
    // predeployment requirement for covered High-capability systems.
    expect(side('supports')).toEqual(['coggins-ceo']);
    expect(side('contradicts')).toEqual(['agent-card', 'openai-high']);
    // The framework-wide conclusion and the comparison with the predecessor
    // are context.
    expect(side('context')).toEqual(['coggins-conclusion', 'openai']);
    expect(a.statement).toContain('governance arrangements permit');
    expect(a.qualification).toMatch(/does not decide/);
    expect(a.qualification).toContain('v1 2025-09-29, v2 2025-10-13');
  });

  it('keeps the RSP assessments as open questions with context only', () => {
    const v2 = repository.claims.get('rsp-v2-0-assessed-weakening')!;
    const v3 = repository.claims.get('rsp-v3-0-assessed-weakening')!;
    expect(v2.statement).toBe(
      'Did RSP v2.0’s changes to threshold and mitigation specification reduce the verifiability of Anthropic’s safety commitments relative to v1.0?',
    );
    expect(v3.statement).toBe(
      'Whether RSP v3.0’s new roadmap and transparency mechanisms compensate for its reduced unilateral commitments, in the policy’s overall capacity to secure risk mitigation, remains unsettled.',
    );
    for (const c of [v2, v3]) {
      expect(c.resolution).toBe('unresolved');
      expect(c.qualification).toMatch(/does not decide the question/);
    }
    const side = (id: string, support: string) =>
      evidenceOf(id)
        .filter((e) => e.support === support)
        .map((e) => e.id.replace(id + '-', '').replace('evidence-', ''))
        .sort();
    for (const c of [v2, v3]) {
      expect(side(c.id, 'supports')).toEqual([]);
      expect(side(c.id, 'contradicts')).toEqual([]);
    }
    expect(side(v2.id, 'context')).toEqual([
      'anthropic',
      'saferai',
      'saferai-title',
    ]);
    expect(side(v3.id, 'context')).toEqual([
      'anthropic',
      'anthropic-goals',
      'anthropic-realistic',
      'govai-balance',
      'govai-concern',
      'govai-future',
      'govai-mitigations',
      'kaplan',
      'kaplan-u-turn',
      'kaplan-unilateral',
      'karnofsky-forcing',
      'karnofsky-unilateral',
      'time',
      'time-assessment',
    ]);
  });

  it('rejects a contested provision, a one-sided contest and an unstated provision', () => {
    const contestedText = clone();
    claim(
      contestedText,
      'prov-preparedness-v2-high-deployment-restriction',
    ).resolution = 'contested';
    expect(parses(contestedText)).toBe(false);

    const oneSided = clone();
    const a = claim(
      oneSided,
      'assessed-preparedness-v2-high-deployment-mitigation',
    );
    const disputing = new Set(
      oneSided.evidence
        .filter((e) => e.claimId === a.id && e.support === 'contradicts')
        .map((e) => e.id),
    );
    expect(disputing.size).toBe(2);
    a.evidenceIds = a.evidenceIds.filter((id) => !disputing.has(id));
    oneSided.evidence = oneSided.evidence.filter((e) => !disputing.has(e.id));
    expect(parses(oneSided)).toBe(false);

    const unstated = clone();
    claim(
      unstated,
      'assessed-preparedness-v2-high-deployment-mitigation',
    ).attributes!.provision!.key = 'pf-no-such-provision';
    expect(parses(unstated)).toBe(false);
  });

  it('shows the assessment with its provision and exports it', async () => {
    const history = documentHistory(data, frontierSafetyFrameworks);
    const pf = history.families.find(
      (f) => f.family === 'openai-preparedness',
    )!;
    const v2 = pf.editions.find((e) => e.entity.id === 'preparedness-v2')!;
    expect(v2.assessments.map((c) => c.id)).toEqual([
      'assessed-preparedness-v2-high-deployment-mitigation',
    ]);
    const row = pf.provisionKeys.find(
      (r) => r.key === 'pf-high-deployment-restriction',
    )!;
    const cell = row.editions.find((c) => c.editionId === 'preparedness-v2')!;
    expect(cell.stated?.id).toBe(
      'prov-preparedness-v2-high-deployment-restriction',
    );
    expect(cell.assessed.map((c) => c.id)).toEqual([
      'assessed-preparedness-v2-high-deployment-mitigation',
    ]);
    const starter = await documentHistoryStarter(
      data,
      frontierSafetyFrameworks,
    );
    const edition = starter.families
      .find((f) => f.family === 'openai-preparedness')!
      .editions.find((e) => e.documentId === 'preparedness-v2')!;
    expect(edition.assessmentClaimIds).toEqual([
      'assessed-preparedness-v2-high-deployment-mitigation',
    ]);
    expect(starterMarkdown(starter)).toContain(
      'Disputed assessment of a provision (required action)',
    );
  });
});

describe('stops recorded under the revised rule', () => {
  it('records the four priority stops and the v3.4 threshold change', () => {
    const ids = [
      'prov-rsp-2023-emergency-loosening',
      'prov-rsp-v2-0-lower-safeguards-if-others-pass',
      'prov-rsp-v2-1-lower-safeguards-if-others-pass',
      'prov-rsp-v2-2-lower-safeguards-if-others-pass',
      'prov-fsf-v2-0-government-disclosure',
      'prov-rsp-v3-3-automated-rd-threshold',
      'prov-rsp-v3-4-automated-rd-threshold',
    ];
    for (const id of ids) {
      const c = repository.claims.get(id)!;
      expect(c.predicate, id).toBe('states_provision');
      expect(
        evidenceOf(id).some(
          (e) => e.passageType === 'quote' && words(e.passage) <= 50,
        ),
        id,
      ).toBe(true);
    }
    const change = repository.claims.get(
      'provchange-rsp-v3-4-automated-rd-threshold',
    )!;
    expect(change).toMatchObject({
      subject: 'rsp-v3-4',
      object: { kind: 'entity', entityId: 'rsp-v3-3' },
      derivation: 'explicit',
      attributes: { changeBasis: 'changelog' },
    });
    expect(
      repository.claims.get('provchange-fsf-v3-0-government-disclosure')!
        .derivation,
    ).toBe('inferred');
  });
});

describe('cross-model review packet', () => {
  it('reproduces the week 4a packet from the dataset before week 4c', async () => {
    const pre4c = createRepository(preWeek4cRaw).data;
    const path = new URL(
      '../../review/week4a-contested-for-cross-model.md',
      import.meta.url,
    );
    const packet = readFileSync(path, 'utf8');
    const options = (await resolveConfig(path)) ?? {};
    expect(packet).toBe(
      await format(renderAssessmentPacket(pre4c, assessmentPackets.week4a), {
        ...options,
        parser: 'markdown',
      }),
    );
    const included = pre4c.claims.filter(
      (c) => c.resolution === 'contested' || isAssessment(c),
    );
    expect(included.map((c) => c.id)).toEqual([
      'rsp-v2-0-assessed-weakening',
      'rsp-v3-0-assessed-weakening',
      'assessed-preparedness-v2-high-deployment-mitigation',
    ]);
    for (const c of included) {
      expect(packet).toContain(`## \`${c.id}\``);
      expect(packet).toContain(c.statement);
      expect(packet).toContain(c.qualification);
      for (const e of evidenceOf(c.id)) {
        expect(packet).toContain(`\`${e.id}\``);
        expect(packet).toContain(e.passage);
      }
    }
    expect(packet).not.toMatch(/^Verdict: /m);
  });
});

describe('week 4c cross-model packet', () => {
  it('is regenerated from the stored records and holds the week 4c control assessments', async () => {
    const path = new URL(
      '../../review/week4c-contested-for-cross-model.md',
      import.meta.url,
    );
    const packet = readFileSync(path, 'utf8');
    const options = (await resolveConfig(path)) ?? {};
    expect(packet).toBe(
      await format(
        renderAssessmentPacket(
          createRepository(preFixPassRaw).data,
          assessmentPackets.week4c,
        ),
        {
          ...options,
          parser: 'markdown',
        },
      ),
    );
    const included = data.claims.filter(
      (c) =>
        assessmentPackets.week4c.inScope(c) &&
        (c.resolution === 'contested' || isAssessment(c)),
    );
    expect(included.map((c) => c.id).sort()).toEqual([
      'cs-assessed-anthropic-ltbt-independence',
      'cs-assessed-openai-recapitalization-control',
    ]);
    for (const c of included) {
      expect(c.predicate).toBe('control_assessed');
      expect(c.resolution).toBe('unresolved');
      expect(packet).toContain(c.qualification);
      expect(packet).toContain(`## \`${c.id}\``);
      expect(packet).toContain(c.statement);
      for (const e of evidenceOf(c.id)) {
        expect(packet).toContain(`\`${e.id}\``);
        expect(packet).toContain(e.passage);
      }
    }
    // The week 4a records were checked separately and are not repeated.
    expect(packet).not.toContain('rsp-v3-0-assessed-weakening');
    expect(packet).not.toMatch(/^Verdict: /m);
  });
});
