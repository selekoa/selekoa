import ontology from '../../review/evaluation-ontology-i-increment.json';
import type { Dataset } from '../domain/schema';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { format, resolveConfig } from 'prettier';
import increment from '../../review/evaluation-institutions-i-increment.json';
import order from '../../review/evaluation-institutions-i-order.json';
import closeout from '../../review/evaluation-institutions-i-closeout.json';
import { preSortNameRepository as repository } from './pre-sort-name-data';
import { preSortNameRaw } from './pre-sort-name-data';
import { institutionalDossier } from '../domain/dossier';
import { renderSeedReview } from './seed-review';

// Reproduce the historical packs against their complete original dataset.
const priorData: Dataset = {
  ...repository.data,
  meta: ontology.baselineMeta as Dataset['meta'],
  entities: repository.data.entities.filter((r) =>
    ontology.baseline.entities.ids.includes(r.id),
  ),
  claims: repository.data.claims.filter((r) =>
    ontology.baseline.claims.ids.includes(r.id),
  ),
  sources: repository.data.sources.filter((r) =>
    ontology.baseline.sources.ids.includes(r.id),
  ),
  evidence: repository.data.evidence.filter((r) =>
    ontology.baseline.evidence.ids.includes(r.id),
  ),
};
describe('evaluation institutions research boundaries', () => {
  it('preserves every prior record, including ARC identity and the original RSP credit', () => {
    for (const key of ['entities', 'claims', 'sources', 'evidence'] as const) {
      const raw = preSortNameRaw(key) as {
        id: string;
      }[];
      const previous = raw.filter((r) =>
        increment.baseline[key].ids.includes(r.id),
      );
      expect(previous).toHaveLength(increment.baseline[key].count);
      expect(
        createHash('sha256').update(JSON.stringify(previous)).digest('hex'),
      ).toBe(increment.baseline[key].sha256);
      expect(
        repository.data[key].filter((r) => increment.added[key].includes(r.id)),
      ).toHaveLength(increment.added[key].length);
    }
  });

  it('retains unknown dates, retrospective attribution and bounded method reuse', () => {
    expect(
      repository.claims.get('eval-i-metr-bis-publication')?.time.kind,
    ).toBe('unknown');
    expect(
      repository.sources.get('source-eval-i-bis-comment')?.publicationDate,
    ).toBeNull();
    expect(
      repository.claims.get('eval-i-uk-metr-demonstrations')?.time,
    ).toMatchObject({ date: '2023-11' });
    expect(
      repository.sources.get('source-eval-i-uk-approach')?.publicationDate,
    ).toBe('2024-02-09');
    expect(repository.claims.has('eval-i-uk-credit-arc')).toBe(false);
    expect(
      repository.evidence.get('evidence-eval-i-barnes-metr')?.sourceRole,
    ).toBe('secondary');
    const method = repository.claims.get('eval-i-o1-method')!;
    expect(method.predicate).toBe('uses_method_from');
    expect(method.attributes?.method).toBe('General-autonomy test task suite');
    expect(method.object).toEqual({
      kind: 'entity',
      entityId: 'metr-gpt4o-report',
    });
    const dossier = institutionalDossier(repository.data, 'metr')!;
    expect(dossier.claims.map((c) => c.id)).toEqual(
      expect.arrayContaining([
        'eval-i-barnes-metr',
        'eval-i-metr-bis-publication',
        'eval-i-uk-metr-demonstrations',
      ]),
    );
  });

  it('keeps additions as seeds and reproduces the blank working pack', async () => {
    expect(order.flatMap((g) => g.claimIds)).toEqual(increment.added.claims);
    for (const id of increment.added.claims) {
      const claim = repository.claims.get(id)!;
      expect(claim.editorialState).toBe('seed');
      for (const evidenceId of claim.evidenceIds) {
        expect(repository.evidence.get(evidenceId)?.verification).toBe(
          'machine_checked',
        );
        expect(repository.evidence.get(evidenceId)?.reviewer).toBeUndefined();
      }
    }
    const path = 'review/evaluation-institutions-i-closeout-review.md';
    const expected = await format(
      renderSeedReview(priorData, order, {
        selection: true,
        title: 'Evaluation Institutions I — exploratory seeds',
      }),
      { ...(await resolveConfig(path)), parser: 'markdown' },
    );
    expect(readFileSync(path, 'utf8').replace(/\r\n/g, '\n')).toBe(expected);
    expect(expected.match(/^\*\*Human decision:\*\*$/gm)).toHaveLength(
      increment.added.claims.length,
    );
    expect(expected.match(/^\*\*Notes:\*\*$/gm)).toHaveLength(
      increment.added.claims.length,
    );
  });
  it('preserves the historical pack and every editorial and verification state', async () => {
    const historical = structuredClone(priorData);
    for (const before of closeout.before.claims) {
      const index = historical.claims.findIndex((r) => r.id === before.id);
      historical.claims[index] = before as (typeof historical.claims)[number];
    }
    for (const before of closeout.before.evidence) {
      const index = historical.evidence.findIndex((r) => r.id === before.id);
      historical.evidence[index] =
        before as (typeof historical.evidence)[number];
    }
    const path = 'review/evaluation-institutions-i-review.md';
    const original = readFileSync(path, 'utf8').replace(/\r\n/g, '\n');
    expect(createHash('sha256').update(original).digest('hex')).toBe(
      closeout.historicalPackSha256,
    );
    expect(
      await format(
        renderSeedReview(historical, order, {
          selection: true,
          title: 'Evaluation Institutions I — exploratory seeds',
        }),
        { ...(await resolveConfig(path)), parser: 'markdown' },
      ),
    ).toBe(original);
    const claims = preSortNameRaw('claims') as typeof repository.data.claims;
    const evidence = preSortNameRaw(
      'evidence',
    ) as typeof repository.data.evidence;
    const states = {
      claims: claims
        .filter((r) =>
          [
            ...increment.baseline.claims.ids,
            ...increment.added.claims,
          ].includes(r.id),
        )
        .map(({ id, editorialState }) => ({ id, editorialState })),
      evidence: evidence
        .filter((r) =>
          [
            ...increment.baseline.evidence.ids,
            ...increment.added.evidence,
          ].includes(r.id),
        )
        .map(({ id, verification, checkedAt, reviewer }) => ({
          id,
          verification,
          checkedAt,
          ...(reviewer === undefined ? {} : { reviewer }),
        })),
    };
    expect(
      createHash('sha256').update(JSON.stringify(states)).digest('hex'),
    ).toBe(closeout.preservedReviewStatesSha256);
    const sample = readFileSync(
      'review/evaluation-institutions-i-spot-check.md',
      'utf8',
    );
    const sampleIds = [
      ...sample.matchAll(/^\| \x60(eval-i-[^\x60]+)\x60\s+\|/gm),
    ].map((m) => m[1]);
    expect(sampleIds).toEqual(closeout.pendingHumanSample);
    for (const field of [
      'Human reviewer',
      'Inspection date',
      'Sample outcome',
    ]) {
      expect(sample).toMatch(
        new RegExp('\\*\\*' + field + ':\\*\\*\\r?\\n\\r?\\n'),
      );
    }
  });

  it('retains attributed disagreement without manufacturing dates or human acceptance', () => {
    const claude = readFileSync(closeout.reports[0].path, 'utf8');
    const grok = readFileSync(closeout.reports[1].path, 'utf8');
    expect(claude.match(/\|\s+YES\s+\|/g)).toHaveLength(17);
    expect(claude.match(/\|\s+EDIT\s+\|/g)).toHaveLength(2);
    expect(grok.match(/— YES\*\*/g)).toHaveLength(19);
    for (const report of closeout.reports) {
      expect(report.executionDate).toBeNull();
      expect(report.modelVersion).toBeNull();
    }
    const credit = repository.claims.get('eval-i-claude-arc-credit')!;
    expect(credit.statement).toContain('what Anthropic calls “safety audits”');
    expect(credit.qualification).toContain(
      'not an assertion of independent certification',
    );
    expect(closeout.documentChronology).toMatchObject({
      documentDate: '2024-10-11',
      publicPostingDate: null,
      docketReceiptDate: null,
    });
    const publication = repository.claims.get('eval-i-metr-bis-publication')!;
    expect(publication.predicate).toBe('published');
    expect(publication.time.kind).toBe('unknown');
    expect(publication.statement).toContain('dated October 11, 2024');
    expect(publication.time.note).toContain('document date');
  });
});
