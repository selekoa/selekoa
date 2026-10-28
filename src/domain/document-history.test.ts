import { isComparisonCell } from './framework-comparison';
import { describe, expect, it } from 'vitest';
import { repository } from './repository';
import {
  documentHistory,
  editionAnchorDate,
  editionTimeline,
} from './document-history';
import { canonicalJson } from './references';
import { reviewStatus, reviewStatusSentences } from './review-status';
import {
  documentHistoryStarter,
  starterJson,
  starterMarkdown,
} from './starter';
import { referencePath, resolveReference } from './deep-links';
import { frontierSafetyFrameworks as collection } from '../reading/frontier-safety-frameworks';

const data = repository.data;
const history = documentHistory(data, collection);
const family = (id: string) => history.families.find((f) => f.family === id)!;

describe('frontier safety framework document history', () => {
  it('lists every recorded edition of each family once, oldest first', () => {
    const versions = data.entities.filter(
      (e) =>
        e.documentVersion &&
        collection.families.includes(e.documentVersion.family),
    );
    const listed = history.families.flatMap((f) =>
      f.editions.map((e) => e.entity.id),
    );
    expect(new Set(listed).size).toBe(listed.length);
    expect([...listed].sort()).toEqual(versions.map((e) => e.id).sort());
    expect(family('anthropic-rsp').editions.map((e) => e.entity.id)).toEqual([
      'rsp-2023',
      'rsp-v2-0',
      'rsp-v2-1',
      'rsp-v2-2',
      'rsp-v3-0',
      'rsp-v3-1',
      'rsp-v3-2',
      'rsp-v3-3',
      'rsp-v3-4',
    ]);
  });

  it('returns original claim objects and shows replacement only where a claim records it', () => {
    for (const f of history.families)
      for (const e of f.editions)
        for (const c of [...e.issued, ...e.replaces, ...e.changes])
          expect(data.claims).toContain(c);
    const xai = family('xai-faif').editions;
    expect(xai.flatMap((e) => e.replaces)).toEqual([]);
    expect(xai[1].gaps).toContain('no-recorded-predecessor');
    expect(xai[1].changes.map((c) => c.id)).toEqual([
      'faif-2026-compliance-sentence',
    ]);
    const rsp = family('anthropic-rsp').editions;
    expect(rsp[0].gaps).toEqual([]);
    expect(rsp.slice(1).every((e) => e.replaces.length === 1)).toBe(true);
    // v3.1's only recorded delta is a provision comparison added in week 4a.
    expect(
      rsp.find((e) => e.entity.id === 'rsp-v3-1')!.changes.map((c) => c.id),
    ).toEqual(['provchange-rsp-v3-1-automated-rd-threshold']);
    // Microsoft's 2026 edition has a recorded replacement but no recorded delta.
    expect(family('microsoft-frontier-governance').editions[1].gaps).toEqual([
      'no-recorded-change',
    ]);
  });

  it('keeps framework application distinct from succession', () => {
    const fgf = family('openai-frontier-governance');
    expect(fgf.editions[0].applies.map((c) => c.id)).toEqual([
      'fgf-applies-preparedness',
    ]);
    expect(fgf.editions[0].replaces).toEqual([]);
    expect(
      family('openai-preparedness').referentClaims.map((c) => c.id),
    ).toEqual(['fgf-applies-preparedness']);
  });

  it('collects every framework claim and cites only existing records', () => {
    const versionIds = new Set(
      history.families.flatMap((f) => [
        ...f.editions.map((e) => e.entity.id),
        ...(f.referent ? [f.referent.id] : []),
      ]),
    );
    // Comparison cells (schema 2.17) belong to the comparison page.
    const touching = data.claims.filter(
      (c) =>
        !isComparisonCell(c) &&
        (versionIds.has(c.subject) ||
          (c.object.kind === 'entity' && versionIds.has(c.object.entityId))),
    );
    expect([...history.claimIds].sort()).toEqual(
      touching.map((c) => c.id).sort(),
    );
  });

  it('is independent of input record order', () => {
    const reversed = structuredClone(data);
    reversed.claims.reverse();
    reversed.entities.reverse();
    reversed.sources.reverse();
    const again = documentHistory(reversed, collection);
    expect(canonicalJson(again.claimIds)).toBe(canonicalJson(history.claimIds));
    expect(
      again.families.map((f) => f.editions.map((e) => e.entity.id)),
    ).toEqual(history.families.map((f) => f.editions.map((e) => e.entity.id)));
  });
});

describe('edition timeline', () => {
  it('places every dated edition once, in order, at its anchor date', () => {
    const rows = editionTimeline(history, 2023, 2026);
    expect(rows.map((r) => r.family)).toEqual(collection.families);
    for (const [i, row] of rows.entries()) {
      const editions = history.families[i].editions;
      expect([...row.marks.map((m) => m.id), ...row.undated].sort()).toEqual(
        editions.map((e) => e.entity.id).sort(),
      );
      for (const mark of row.marks) {
        expect(mark.position).toBeGreaterThanOrEqual(0);
        expect(mark.position).toBeLessThan(1);
        const entity = editions.find((e) => e.entity.id === mark.id)!.entity;
        expect(editionAnchorDate(entity)).toEqual({
          kind: mark.kind,
          date: mark.date,
        });
      }
      const positions = row.marks.map((m) => m.position);
      expect(positions).toEqual([...positions].sort((a, b) => a - b));
    }
    const rsp = rows.find((r) => r.family === 'anthropic-rsp')!;
    expect(rsp.marks.find((m) => m.id === 'rsp-v3-0')).toMatchObject({
      kind: 'effective',
      date: '2026-02-24',
    });
  });

  it('rejects an edition outside the fixed span instead of clamping it', () => {
    expect(() => editionTimeline(history, 2024, 2026)).toThrow(
      'outside timeline span',
    );
  });
});

describe('dataset review status', () => {
  it('counts stored states and lists every exception by identity', () => {
    const status = reviewStatus(data);
    const accepted = data.claims.filter((c) => c.editorialState === 'accepted');
    const reviewed = data.evidence.filter(
      (e) => e.verification === 'human_reviewed',
    );
    expect(status.claims).toBe(data.claims.length);
    expect(status.seedClaims + status.acceptedClaimIds.length).toBe(
      data.claims.length,
    );
    expect(status.acceptedClaimIds).toEqual(accepted.map((c) => c.id));
    expect(status.humanReviewedEvidence.map((e) => e.evidenceId)).toEqual(
      reviewed.map((e) => e.id),
    );
    expect(status.humanReviewedEvidence.every((e) => e.reviewer)).toBe(true);
    const text = reviewStatusSentences(status).join(' ');
    for (const id of status.acceptedClaimIds) expect(text).toContain(id);
    expect(text).toContain('not a human review');
  });
  it('scopes to a claim subset', () => {
    const status = reviewStatus(data, history.claimIds);
    expect(status.claims).toBe(history.claimIds.length);
    expect(status.acceptedClaimIds).toEqual([]);
  });
});

describe('document history references', () => {
  it('resolves the collection, the explorer and the start page', () => {
    const target = {
      kind: 'documents' as const,
      id: collection.id,
      inspect: 'issued-rsp-2-0',
    };
    expect(resolveReference(referencePath(target), data).target).toEqual(
      target,
    );
    expect(resolveReference('/explore', data).target).toEqual({
      kind: 'explore',
    });
    expect(resolveReference('', data)).toEqual({ target: null, notice: null });
    for (const hash of [
      '/documents/missing',
      '/documents/' + collection.id + '?inspect=missing',
      '/documents/' + collection.id + '?section=a',
    ])
      expect(resolveReference(hash, data).notice).toContain(
        'does not match any record',
      );
  });
});

describe('research starter export', () => {
  it('is deterministic and does not mutate its input', async () => {
    const copy = structuredClone(data);
    const before = canonicalJson(copy);
    const starter = await documentHistoryStarter(copy, collection);
    expect(canonicalJson(copy)).toBe(before);
    const again = await documentHistoryStarter(
      structuredClone(data),
      structuredClone(collection),
    );
    expect(starterJson(again)).toBe(starterJson(starter));
    expect(starterMarkdown(again)).toBe(starterMarkdown(starter));
  });

  it('carries claims, evidence locators, permitted passages, gaps and limits', async () => {
    const starter = await documentHistoryStarter(data, collection);
    expect(starter.collection.orderedClaimIds).toEqual(history.claimIds);
    for (const claim of starter.claims)
      expect(claim).toEqual(data.claims.find((c) => c.id === claim.id));
    const sources = new Map(data.sources.map((s) => [s.id, s]));
    for (const e of starter.evidence) {
      const original = data.evidence.find((o) => o.id === e.id)!;
      expect(e.locator).toBe(original.locator);
      expect(e.verification).toBe(original.verification);
      const permitted =
        original.passageType === 'paraphrase' ||
        /excerpt|short attributed quotations/i.test(
          sources.get(original.sourceId)!.reuse.note,
        );
      expect(e.passageIncluded).toBe(permitted);
      // Every framework source now records the short-quotation practice.
      expect(e.passageIncluded).toBe(true);
      if (e.passageIncluded) expect(e.passage).toBe(original.passage);
      else expect(e).not.toHaveProperty('passage');
    }
    const inferred = starter.inferences.map((i) => i.claimId);
    expect(inferred).toContain('faif-2026-compliance-sentence');
    expect(inferred).toContain('supersedes-pf-2');
    // Every other inference is a recorded absence or a provision comparison.
    for (const id of inferred.filter(
      (id) =>
        !['faif-2026-compliance-sentence', 'supersedes-pf-2'].includes(id),
    ))
      expect(id).toMatch(/^(absent|provchange)-/);
    for (const i of starter.inferences) expect(i.rationale).toBeTruthy();
    expect(starter.disagreements.note).toBe(
      'Contested and unresolved records retain all linked evidence.',
    );
    expect(starter.disagreements.contestedOrUnresolvedClaimIds).toEqual(
      expect.arrayContaining([
        'supersedes-pf-2',
        'assessed-preparedness-v2-high-deployment-mitigation',
        'rsp-v2-0-assessed-weakening',
        'rsp-v3-0-assessed-weakening',
      ]),
    );
    const xai = starter.families.find((f) => f.family === 'xai-faif')!;
    expect(xai.editions[1].coverageGaps.map((g) => g.gap)).toContain(
      'no-recorded-predecessor',
    );
    const markdown = starterMarkdown(starter);
    for (const value of [
      'Research question',
      'Review status of these records',
      'Coverage gap:',
      'Open questions',
      'Inferred by comparing editions',
      'Locator:',
      'Paraphrase:',
      starter.dataset.fingerprint,
    ])
      expect(markdown).toContain(value);
  });

  it('leads with a summary table and key limits, ending with fingerprints', async () => {
    const starter = await documentHistoryStarter(data, collection);
    const markdown = starterMarkdown(starter);
    const at = (text: string) => {
      const index = markdown.indexOf(text);
      expect(index, text).toBeGreaterThan(-1);
      return index;
    };
    expect(at('## Summary')).toBeLessThan(at('## Key limits'));
    expect(at('## Key limits')).toBeLessThan(at('## Research question'));
    expect(at('## Source metadata')).toBeLessThan(
      at('## Further limits and technical notes'),
    );
    expect(at('## Further limits and technical notes')).toBeLessThan(
      at('Dataset fingerprint: ' + starter.dataset.fingerprint),
    );
    expect(markdown.indexOf('fingerprint: sha256')).toBeGreaterThan(
      at('## Further limits'),
    );
    const keyLimits = markdown
      .slice(at('## Key limits'), at('## Research question'))
      .split('\n')
      .filter((line) => line.startsWith('- '));
    expect(keyLimits.length).toBeLessThanOrEqual(4);
    // Every limit appears exactly once across key and further limits.
    for (const limit of [...starter.limits, ...collection.limits])
      expect(markdown.split(limit.slice(0, 60)).length - 1).toBe(1);
    const rows = markdown
      .slice(at('## Summary'), at('## Key limits'))
      .split('\n')
      .filter((line) => line.startsWith('| ') && !line.startsWith('| ---'))
      .slice(1);
    expect(rows).toHaveLength(
      history.families.reduce((n, f) => n + f.editions.length, 0),
    );
    const v3 = rows.find((r) => r.includes('v3.0 (replaces v2.2)'))!;
    expect(v3).toContain('effective 2026-02-24; published 2026-02-24');
    expect(v3).toContain(
      '](<https://anthropic.com/responsible-scaling-policy/rsp-v3-0>)',
    );
    expect(v3).toContain(
      'Publisher statement: RSP v3.0 introduces Risk Reports',
    );
    expect(rows.find((r) => r.includes('June 2026 edition'))).toContain(
      'Inferred by comparing editions',
    );
  });

  it('omits quotes whose source records no excerpt permission', async () => {
    const modified = structuredClone(data);
    const quote = modified.evidence.find(
      (e) => e.id === 'evidence-anthropic-rsp-2023',
    )!;
    expect(quote.passageType).toBe('quote');
    modified.sources.find((s) => s.id === quote.sourceId)!.reuse.note =
      'Linked externally only.';
    const starter = await documentHistoryStarter(modified, collection);
    const exported = starter.evidence.find((e) => e.id === quote.id)!;
    expect(exported.passageIncluded).toBe(false);
    expect(starterMarkdown(starter)).not.toContain(quote.passage);
    expect(starterJson(starter)).not.toContain(quote.passage);
  });
});
