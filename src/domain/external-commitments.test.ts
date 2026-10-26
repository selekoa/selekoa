import { describe, expect, it } from 'vitest';
import { repository } from './repository';
import { commitmentsView } from './commitments';
import {
  commitmentsStarter,
  commitmentsStarterMarkdown,
} from './governance-starters';
import { dateOf } from './query';
import { externalCommitments } from '../reading/commitments';
import week4c from '../../review/week4c-before-2026-10-04.json';
import type { Claim } from './schema';

const data = repository.data;
const added = new Set<string>(week4c.added.claims);
const words = (s: string) => s.trim().split(/\s+/).length;
const evidenceOf = (id: string) =>
  repository.claims
    .get(id)!
    .evidenceIds.map((e) => repository.evidence.get(e)!);
const commitmentRecords = data.claims.filter(
  (c) =>
    added.has(c.id) && /^(cm-|prov-(wh|fasc|eu)-|provchange-wh-)/.test(c.id),
);

describe('external commitments (week 4c)', () => {
  const view = commitmentsView(data, externalCommitments);
  const doc = (id: string) => view.documents.find((d) => d.entity.id === id)!;
  const listed = (id: string) =>
    doc(id).signatories.filter(
      (c) => c.attributes!.commitment!.stage === 'listed',
    );
  const subjects = (claims: Claim[]) => claims.map((c) => c.subject).sort();

  it('covers five texts in date order, each with its own issue record', () => {
    expect(
      view.documents.map((d) => [d.entity.id, d.issued.map(dateOf)]),
    ).toEqual([
      ['wh-voluntary-ai-commitments-2023-07', ['2023-07-21']],
      ['wh-voluntary-ai-commitments-2023-09', ['2023-09-12']],
      ['frontier-ai-safety-commitments-2024', ['2024-05-21']],
      ['gpai-code-of-practice-2025', ['2025-07-10']],
      ['california-sb-53', ['2025-09-29']],
    ]);
    expect(doc('frontier-ai-safety-commitments-2024').publisher!.id).toBe(
      'dsit',
    );
    expect(doc('gpai-code-of-practice-2025').publisher!.id).toBe(
      'european-commission',
    );
  });

  it('records every organisation on the White House and Seoul lists, dated by the list', () => {
    expect(subjects(listed('wh-voluntary-ai-commitments-2023-07'))).toEqual([
      'amazon',
      'anthropic',
      'google',
      'inflection-ai',
      'meta',
      'microsoft',
      'openai',
    ]);
    expect(subjects(listed('wh-voluntary-ai-commitments-2023-09'))).toEqual([
      'adobe',
      'cohere',
      'ibm',
      'nvidia',
      'palantir',
      'salesforce',
      'scale-ai',
      'stability-ai',
    ]);
    const seoul = listed('frontier-ai-safety-commitments-2024');
    expect(seoul).toHaveLength(20);
    // Four organisations were added to the list in the February 2025 revision.
    expect(
      subjects(
        seoul.filter(
          (c) => c.time.kind === 'event' && c.time.basis === 'revision',
        ),
      ),
    ).toEqual(['magic-ai', 'minimax', 'nvidia', 'zero-one-ai']);
    for (const c of seoul)
      expect(dateOf(c)).toBe(
        c.time.kind === 'event' && c.time.basis === 'revision'
          ? '2025-02-07'
          : '2024-05-21',
      );
    for (const id of [
      'wh-voluntary-ai-commitments-2023-07',
      'wh-voluntary-ai-commitments-2023-09',
    ])
      for (const c of listed(id)) {
        expect(c.time).toMatchObject({ basis: 'publication' });
        expect(dateOf(c)).toBe(dateOf(doc(id).issued[0]));
      }
    // Apple's 2024 announcement names no text, so it has no record.
    expect(
      data.claims.some(
        (c) => c.predicate === 'signed_commitment' && c.subject === 'apple',
      ),
    ).toBe(false);
  });

  it('keeps announced intent, listing and refusal apart for the EU Code of Practice', () => {
    const code = doc('gpai-code-of-practice-2025');
    expect(subjects(listed('gpai-code-of-practice-2025'))).toEqual([
      'amazon',
      'anthropic',
      'cohere',
      'google',
      'ibm',
      'microsoft',
      'mistral-ai',
      'openai',
      'xai',
    ]);
    for (const c of listed('gpai-code-of-practice-2025'))
      expect(dateOf(c)).toBe('2025-08-01');
    const intents = code.signatories.filter(
      (c) => c.attributes!.commitment!.stage === 'intent_announced',
    );
    expect(intents.map((c) => [c.subject, dateOf(c)])).toEqual([
      ['openai', '2025-07-11'],
      ['anthropic', '2025-07-21'],
      ['google', '2025-07-30'],
      ['xai', '2025-07-31'],
    ]);
    for (const c of intents)
      expect(c.time).toMatchObject({ basis: 'announcement' });
    // xAI's listing and announcement both carry the chapter scope.
    for (const id of ['cm-eu-code-xai', 'cm-eu-code-intent-xai'])
      expect(repository.claims.get(id)!.attributes!.commitment!.scope).toBe(
        'Safety and Security chapter only',
      );
    expect(code.declined.map((c) => [c.id, c.subject])).toEqual([
      ['cm-eu-code-declined-meta', 'meta'],
    ]);
    expect(code.declined[0].time).toMatchObject({
      date: '2025-07-18',
      basis: 'announcement',
    });
    // The refusal is quoted from Meta's own statement.
    expect(
      evidenceOf('cm-eu-code-declined-meta').some(
        (e) =>
          e.support === 'supports' &&
          e.passageType === 'quote' &&
          e.sourceId === 'source-meta-kaplan-eu-code-2025',
      ),
    ).toBe(true);
    // The statute has no column: it is enacted, not signed.
    expect(view.matrixDocumentIds).toEqual(
      externalCommitments.documentIds.filter((id) => id !== 'california-sb-53'),
    );
    expect(view.matrix).toHaveLength(25);
    const meta = view.matrix.find((r) => r.organisation.id === 'meta')!;
    expect(meta.cells.map((c) => c.claims.map((x) => x.id))).toEqual([
      ['cm-wh-2023-07-meta'],
      [],
      ['cm-seoul-meta'],
      ['cm-eu-code-declined-meta'],
    ]);
  });

  it('quotes provisions briefly from the exact text inspected', () => {
    expect(
      [
        'wh-voluntary-ai-commitments-2023-07',
        'wh-voluntary-ai-commitments-2023-09',
        'frontier-ai-safety-commitments-2024',
        'gpai-code-of-practice-2025',
      ].map((id) => doc(id).provisions.length),
    ).toEqual([5, 1, 5, 9]);
    for (const d of view.documents.slice(0, 4))
      for (const c of d.provisions) {
        const quote = evidenceOf(c.id).find(
          (e) =>
            e.support === 'supports' &&
            e.passageType === 'quote' &&
            repository.sources.get(e.sourceId)!.documentId === d.entity.id,
        );
        expect(quote, c.id).toBeTruthy();
        expect(words(quote!.passage)).toBeLessThanOrEqual(50);
      }
    // The EU provisions come from one of the Code's three chapters.
    const chapters = [
      'source-eu-code-safety-security',
      'source-eu-code-transparency-chapter',
      'source-eu-code-copyright-chapter',
    ];
    for (const c of doc('gpai-code-of-practice-2025').provisions)
      expect(evidenceOf(c.id).some((e) => chapters.includes(e.sourceId))).toBe(
        true,
      );
    // The September 2023 scope change is an inferred comparison of both texts.
    const change = repository.claims.get('provchange-wh-2023-09-scope')!;
    expect(change).toMatchObject({
      derivation: 'inferred',
      attributes: { changeBasis: 'document_comparison' },
    });
    expect(
      evidenceOf(change.id)
        .map((e) => e.sourceId)
        .sort(),
    ).toEqual([
      'source-wh-commitments-2023-07',
      'source-wh-commitments-2023-09',
    ]);
  });

  it('links framework editions to a text only in their own quoted words', () => {
    const pairs = (id: string) =>
      doc(id).links.map((c) => [c.subject, c.attributes!.commitment!.link]);
    expect(pairs('wh-voluntary-ai-commitments-2023-07')).toEqual([
      ['rsp-2023', 'names'],
      ['rsp-v2-0', 'fulfils'],
      ['rsp-v2-1', 'fulfils'],
      ['rsp-v2-2', 'fulfils'],
    ]);
    expect(pairs('wh-voluntary-ai-commitments-2023-09')).toEqual([]);
    expect(pairs('frontier-ai-safety-commitments-2024')).toEqual([
      ['rsp-v2-0', 'fulfils'],
      ['ms-fgf-2025', 'responds_to'],
      ['meta-faf-v1-1', 'responds_to'],
      ['rsp-v2-1', 'fulfils'],
      ['rsp-v2-2', 'fulfils'],
      ['ms-fgf-2026', 'responds_to'],
    ]);
    expect(pairs('gpai-code-of-practice-2025')).toEqual([
      ['ms-fgf-2026', 'responds_to'],
      ['frontier-governance-2026', 'designated_under'],
      ['faif-2026', 'names'],
    ]);
    for (const d of view.documents.slice(0, 4))
      for (const c of d.links)
        expect(
          evidenceOf(c.id).some(
            (e) =>
              e.support === 'supports' &&
              e.passageType === 'quote' &&
              repository.sources.get(e.sourceId)!.documentId === c.subject,
          ),
          c.id,
        ).toBe(true);
  });

  it('adds only machine-checked seeds and asserts no compliance or legal effect', () => {
    expect(commitmentRecords.length).toBe(84);
    for (const c of commitmentRecords) {
      expect(c.editorialState, c.id).toBe('seed');
      for (const e of evidenceOf(c.id)) {
        expect(e.verification).toBe('machine_checked');
        expect(e.reviewer).toBeUndefined();
      }
      expect(c.statement, c.id).not.toMatch(
        /\b(complied|is compliant|legally binding|is bound by)\b/i,
      );
    }
    for (const s of externalCommitments.stops)
      expect(s.category).toBe('legal_effect');
  });

  it('exports the signatory matrix with stages, scopes and refusals', async () => {
    const starter = await commitmentsStarter(data, externalCommitments);
    expect(starter.commitments.documents.map((d) => d.documentId)).toEqual(
      externalCommitments.documentIds,
    );
    const md = commitmentsStarterMarkdown(starter);
    expect(md).toContain('## Who signed or refused which text');
    expect(md).toContain('listed as signatory, 2025-08-01 · publication');
    expect(md).toContain('(Safety and Security chapter only)');
    expect(md).toContain('stated it would not sign, 2025-07-18 · announcement');
    expect(md).toContain('intent to sign announced, 2025-07-11 · announcement');
  });
});
