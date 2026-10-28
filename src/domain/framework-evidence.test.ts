import { describe, expect, it } from 'vitest';
import { createRepository, repository } from './repository';
import { datasetSchema, maxQuotedWords } from './schema';
import { documentHistory } from './document-history';
import { archiveCopy, nonEnglishLanguage } from './source-archive';
import { sourceReference } from './references';
import {
  documentHistoryStarter,
  quotationPermitted,
  starterJson,
  starterMarkdown,
} from './starter';
import { frontierSafetyFrameworks } from '../reading/frontier-safety-frameworks';
import {
  preFrameworkEvidenceRaw,
  preFrameworkEvidenceRows,
  withoutSourceArchiveFields,
} from '../editorial/pre-framework-evidence-data';
import { preProvisionsRaw } from '../editorial/historical-views';

const data = repository.data;
// The schema 2.7 pass is checked against its own dataset state (before the
// week 4a additions) and the five families the collection then held.
const data27 = createRepository(preProvisionsRaw).data;
const known27 = new Set(data27.claims.map((c) => c.id));
const history27 = documentHistory(data27, {
  ...frontierSafetyFrameworks,
  families: [
    'anthropic-rsp',
    'deepmind-fsf',
    'openai-preparedness',
    'openai-frontier-governance',
    'xai-faif',
  ],
  openQuestions: frontierSafetyFrameworks.openQuestions.filter((q) =>
    q.claimIds.every((id) => known27.has(id)),
  ),
});
const collectionClaims = new Set(history27.claimIds);
const collectionEvidence = data27.evidence.filter((e) =>
  collectionClaims.has(e.claimId),
);
const editionSourceIds = history27.families.flatMap((f) =>
  f.editions.flatMap((e) => e.sources.map((s) => s.id)),
);
const archivedIds = new Set([
  ...collectionEvidence.map((e) => e.sourceId),
  ...editionSourceIds,
]);
const clone = () => structuredClone(data);

describe('schema 2.7 source language and archive captures', () => {
  it('differs from 2.6 only in source fields, framework evidence passages and dataset dating', () => {
    const before = createRepository(preFrameworkEvidenceRaw).data;
    expect(before.meta.schemaVersion).toBe('2.6');
    expect(data27.meta.schemaVersion).toBe('2.7');
    expect(before.entities).toEqual(data27.entities);
    expect(before.claims).toEqual(data27.claims);
    data27.sources.forEach((s, i) => {
      const prior = before.sources[i];
      const { reuse, ...rest } = withoutSourceArchiveFields(s);
      const { reuse: priorReuse, ...priorRest } = prior;
      expect(rest).toEqual(priorRest);
      expect(reuse.attribution).toBe(priorReuse.attribution);
      expect(reuse.licence).toBe(priorReuse.licence);
      if (reuse.note !== priorReuse.note) expect(archivedIds).toContain(s.id);
    });
    const changed = data27.evidence.filter(
      (e, i) => JSON.stringify(e) !== JSON.stringify(before.evidence[i]),
    );
    expect(changed.map((e) => e.id)).toEqual(
      Object.keys(preFrameworkEvidenceRows),
    );
    for (const e of changed) {
      expect(collectionEvidence).toContain(e);
      const prior = before.evidence.find((r) => r.id === e.id)!;
      // Only the passage, its type and locator, the check date and the note move.
      const { passage, passageType, locator, checkedAt, note, ...rest } = e;
      const {
        passage: p0,
        passageType: t0,
        locator: l0,
        checkedAt: c0,
        note: n0,
        ...priorRest
      } = prior;
      expect(rest).toEqual(priorRest);
      expect([passage, passageType, locator, note]).not.toEqual([
        p0,
        t0,
        l0,
        n0,
      ]);
      expect(checkedAt).toBe('2026-10-03');
      expect(c0 < checkedAt).toBe(true);
    }
  });

  it('records a canonical language for every source, marking Chinese scripts', () => {
    for (const s of data.sources) expect(s.language).toBeTruthy();
    const byTag = (tag: string) =>
      data.sources
        .filter((s) => s.language === tag)
        .map((s) => s.id)
        .sort();
    expect(byTag('zh-Hant')).toEqual([
      'source-cn-alibaba-budget',
      'source-cn-zhipu-prospectus',
    ]);
    // The second Chinese institutions collection (2026-10-27) keeps its own
    // pack-prefixed sources, all in Simplified Chinese where Chinese.
    // The frameworks-to-law admission (2026-10-28) adds Chinese government
    // texts, also in Simplified Chinese.
    expect(byTag('zh-Hans').filter((id) => !id.startsWith('c2-src-'))).toEqual([
      'source-cn-cac-genai-filings-2024',
      'source-cn-cac-genai-filings-2025',
      'source-cn-csl-amendment-2025',
      'source-cn-csl-presidential-order-61',
      'source-cn-gb-45438-2025-catalogue',
      'source-cn-gbt-45654-2025-catalogue',
      'source-cn-generative-ai-measures-2023',
      'source-cn-generative-ai-measures-2023-govcn',
      'source-cn-glm45-readme',
      'source-cn-keg-search',
      'source-cn-labelling-measures-2025',
      'source-cn-labelling-news-2025',
      'source-cn-liang-interview',
      'source-cn-qwen3',
      'source-cn-samr-standards-2025-09',
      'source-cn-zhipu-education',
      'source-cn-zhipu-profile',
    ]);
    expect(byTag('fr')).toEqual(['source-xm-fair-paris']);
    // Earlier free-text language notes agree with the structured tag.
    for (const s of data.sources) {
      const noted = s.version.match(/Source language: [^(]+\(([^)]+)\)/)?.[1];
      if (noted) expect(s.language).toBe(noted);
    }
  });

  it('archived exactly the frameworks collection sources in 2.7; captures match their dates', () => {
    const archived27 = data27.sources.filter((s) => s.archivedUrl);
    expect(archived27.map((s) => s.id).sort()).toEqual([...archivedIds].sort());
    expect(archived27).toHaveLength(27);
    for (const id of archivedIds)
      expect(repository.sources.get(id)!.archivedUrl).toBeTruthy();
    const archived = data.sources.filter((s) => s.archivedUrl);
    // Publication-period captures at earlier addresses, byte-identical to the
    // inspected files (see the audit record).
    expect(repository.sources.get('source-rsp-1-0')!.archivedUrl).toContain(
      '/20230919161730/https://www-files.anthropic.com/',
    );
    expect(repository.sources.get('source-rsp-2-0')!.archivedUrl).toContain(
      '/20241022154907/https://assets.anthropic.com/',
    );
    for (const s of archived) {
      expect(s.archivedUrl).toMatch(
        /^https:\/\/web\.archive\.org\/web\/\d{14}\/https?:\/\//,
      );
      const stamp = s.archivedUrl!.split('/')[4];
      expect(s.archivedAt).toBe(
        `${stamp.slice(0, 4)}-${stamp.slice(4, 6)}-${stamp.slice(6, 8)}`,
      );
    }
  });

  it('keeps quotes within the short-quotation limits', () => {
    // A passage quoted for several claims counts once (schema 2.11).
    const perSource = new Map<string, { quotes: number; words: number }>();
    const counted = new Set<string>();
    for (const e of data.evidence.filter((e) => e.passageType === 'quote')) {
      const words = e.passage.trim().split(/\s+/).length;
      expect(words, e.id).toBeLessThanOrEqual(50);
      const passage = `${e.sourceId} ${e.passage.trim().replace(/\s+/g, ' ')}`;
      if (counted.has(passage)) continue;
      counted.add(passage);
      const total = perSource.get(e.sourceId) ?? { quotes: 0, words: 0 };
      perSource.set(e.sourceId, {
        quotes: total.quotes + 1,
        words: total.words + words,
      });
    }
    // The per-document quotation limit (schema 2.8; length-scaled from
    // 2026-10-15). These sources are well within it.
    for (const [id, total] of perSource) {
      if (!archivedIds.has(id)) continue;
      const length = repository.sources.get(id)!.documentWords!.count;
      expect(total.words, id).toBeLessThanOrEqual(maxQuotedWords(length));
    }
    for (const e of collectionEvidence.filter((e) => e.passageType === 'quote'))
      expect(
        quotationPermitted(repository.sources.get(e.sourceId)!),
        e.id,
      ).toBe(true);
    for (const id of archivedIds)
      expect(repository.sources.get(id)!.reuse.note).toContain(
        'Publisher terms that forbid quotation override',
      );
    const upgraded = repository.evidence.get('evidence-rsp-credits-arc-2023')!;
    expect(upgraded).toMatchObject({
      passageType: 'quote',
      verification: 'machine_checked',
      claimId: 'rsp-credits-arc-2023',
    });
  });

  it('rejects a capture date without an archive URL, a mismatched date and bad tags', () => {
    const noUrl = clone();
    delete noUrl.sources[0].archivedUrl;
    noUrl.sources[0].archivedAt = '2026-01-01';
    expect(datasetSchema.safeParse(noUrl).success).toBe(false);
    const mismatch = clone();
    const archived = mismatch.sources.find((s) => s.archivedUrl)!;
    archived.archivedAt = '2001-01-01';
    expect(datasetSchema.safeParse(mismatch).success).toBe(false);
    for (const tag of ['zh-hans', 'english', 'EN', '']) {
      const bad = clone();
      bad.sources[0].language = tag;
      expect(datasetSchema.safeParse(bad).success, tag).toBe(false);
    }
    const missing = clone();
    delete missing.sources[0].language;
    expect(datasetSchema.safeParse(missing).success).toBe(false);
    expect(
      datasetSchema.safeParse({
        ...missing,
        meta: { ...missing.meta, schemaVersion: '2.6' },
      }).success,
    ).toBe(true);
  });

  it('states what a capture cannot authenticate, and names non-English languages', () => {
    expect(archiveCopy(repository.sources.get('source-rsp-1-0')!)!.timing).toBe(
      'Captured on the recorded version date.',
    );
    const rsp = repository.sources.get('source-rsp-2-1')!;
    const copy = archiveCopy(rsp)!;
    expect(copy.captured).toBe(rsp.archivedAt);
    expect(copy.timing).toMatch(
      /^Captured \d+ days after the recorded version date\.$/,
    );
    expect(copy.limit).toContain('does not prove what the page said earlier');
    expect(archiveCopy(repository.sources.get('source-openai-launch')!)).toBe(
      null,
    );
    expect(nonEnglishLanguage(rsp)).toBe(null);
    expect(
      nonEnglishLanguage(repository.sources.get('source-cn-alibaba-budget')!),
    ).toEqual({ tag: 'zh-Hant', name: 'Traditional Chinese' });
    expect(sourceReference(rsp)).toContain(
      `Archive URL: ${rsp.archivedUrl} (captured ${rsp.archivedAt}).`,
    );
    expect(sourceReference(rsp)).toContain('Language (BCP 47): en.');
  });

  it('carries archive copies and languages into the frameworks starter', async () => {
    const starter = await documentHistoryStarter(
      data,
      frontierSafetyFrameworks,
    );
    expect(starterJson(starter)).toContain(`"archivedAt": "`);
    const rsp = starter.sources.find((s) => s.id === 'source-rsp-3-4')!;
    expect(rsp).toMatchObject({ language: 'en' });
    expect(rsp.archivedUrl).toBeTruthy();
    const markdown = starterMarkdown(starter);
    expect(markdown).toContain(
      `([archived copy, captured ${rsp.archivedAt}](<${rsp.archivedUrl}>))`,
    );
    expect(markdown).toContain(
      `(archived copy, captured ${rsp.archivedAt}: <${rsp.archivedUrl}>)`,
    );
  });
});
