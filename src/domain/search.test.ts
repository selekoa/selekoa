import { describe, expect, it } from 'vitest';
import { repository } from './repository';
import {
  createSearchIndex,
  foldText,
  highlight,
  parseQuery,
  searchClaims,
  searchOrganisations,
  searchRecords,
  searchYears,
  type SearchResults,
} from './search';
import {
  applicationCollections,
  collectionClaimIds,
} from '../release/collections';
import { isPropositionRecord, queryDataset, relatedTo } from './query';

const index = createSearchIndex(repository.data);
const ids = (results: SearchResults, type: string) =>
  results.groups.find((g) => g.type === type)?.hits.map((h) => h.id) ?? [];
const marked = (segments: { text: string; match: boolean }[]) =>
  segments.filter((s) => s.match).map((s) => s.text);

describe('query parsing and folding', () => {
  it('folds case, accents, dashes and quote styles', () => {
    expect(foldText('Zürich’s “AI” — ASL-3')).toBe(`zurich's "ai"   asl 3`);
    expect(foldText('Ångström')).toBe('angstrom');
  });
  it('keeps quoted text and hyphenated words together as phrases', () => {
    expect(parseQuery('ASL-3 “Long-Term Benefit Trust” board')).toEqual([
      'asl 3',
      'long term benefit trust',
      'board',
    ]);
    expect(parseQuery('  (RSP)  rsp v2.0, ')).toEqual(['rsp', 'v2.0']);
    expect(parseQuery(' " " ')).toEqual([]);
  });
});

describe('highlighting', () => {
  it('marks matches in the original text, whatever their case or accents', () => {
    expect(marked(highlight('Zürich and ZURICH', ['zurich']))).toEqual([
      'Zürich',
      'ZURICH',
    ]);
    expect(marked(highlight('The ASL-3 Security Standard', ['asl 3']))).toEqual(
      ['ASL-3'],
    );
  });
  it('joins matched words that stand next to each other', () => {
    expect(
      marked(
        highlight('the Responsible Scaling Officer and the officer', [
          'responsible',
          'scaling',
          'officer',
        ]),
      ),
    ).toEqual(['Responsible Scaling Officer', 'officer']);
  });
  it('cuts long text to a window around the first match', () => {
    const text = `${'Earlier words here. '.repeat(20)}the whistleblower chapter ${'and later words. '.repeat(20)}`;
    const segments = highlight(text, ['whistleblower']);
    expect(segments[0].text).toBe('…');
    expect(segments.at(-1)!.text).toBe('…');
    expect(marked(segments)).toEqual(['whistleblower']);
    expect(segments.map((s) => s.text).join('').length).toBeLessThan(260);
  });
  it('matches word beginnings only, and single letters as whole words', () => {
    expect(marked(highlight('whistleblowers and blowers', ['blower']))).toEqual(
      ['blower'],
    );
    expect(marked(highlight('I. J. Good and its intelligence', ['i']))).toEqual(
      ['I'],
    );
  });
});

describe('full-text search over the records', () => {
  it('finds the whistleblower provision, its passages and the qualifications that name it', () => {
    const results = searchRecords(index, 'whistleblower');
    expect(ids(results, 'claim')).toContain(
      'sb-whistleblower-anti-retaliation',
    );
    expect(ids(results, 'passage')).toContain(
      'evidence-sb-whistleblower-anti-retaliation-1',
    );
    const qualification = results.groups
      .find((g) => g.type === 'claim')!
      .hits.find((h) => h.field === 'qualification');
    expect(qualification).toBeDefined();
    expect(marked(qualification!.snippet)).toContain('whistleblower');
  });
  it('finds an AI Safety Level term in claims and passages, however it is hyphenated', () => {
    const results = searchRecords(index, 'ASL-3');
    expect(ids(results, 'claim')).toContain('prov-rsp-v2-0-pause-training');
    expect(ids(results, 'passage')).toContain(
      'evidence-prov-rsp-v2-0-pause-training',
    );
    expect(searchRecords(index, '"ASL 3"').total).toBe(results.total);
  });
  it('finds a decision-maker by role and by name', () => {
    const role = searchRecords(index, 'Responsible Scaling Officer');
    expect(ids(role, 'claim')).toEqual(
      expect.arrayContaining([
        'kaplan-anthropic-rso-2024',
        'prov-rsp-v2-0-policy-change-approval',
      ]),
    );
    expect(ids(role, 'passage')).toContain(
      'evidence-kaplan-anthropic-rso-2024',
    );
    const name = searchRecords(index, 'Altman');
    expect(ids(name, 'claim')).toContain('cs-altman-board-departure-2023');
    expect(ids(name, 'source').length).toBeGreaterThan(0);
    expect(ids(name, 'entity')).toContain('sam-altman');
  });
  it('requires every term and returns groups in a fixed order', () => {
    const results = searchRecords(index, 'Altman board');
    for (const group of results.groups)
      for (const hit of group.hits)
        expect(hit.matchedFields.length).toBeGreaterThan(0);
    expect(results.groups.map((g) => g.type)).toEqual(
      ['claim', 'passage', 'source', 'entity'].filter((t) =>
        results.groups.some((g) => g.type === t),
      ),
    );
    expect(searchRecords(index, 'Altman zzzunmatched').total).toBe(0);
    expect(searchRecords(index, '   ').groups).toEqual([]);
  });
  it('gives claims and passages the stored status, date and sources of their claim', () => {
    const hit = searchRecords(index, 'whistleblower')
      .groups.find((g) => g.type === 'passage')!
      .hits.find(
        (h) => h.id === 'evidence-sb-whistleblower-anti-retaliation-1',
      )!;
    const claim = repository.claims.get('sb-whistleblower-anti-retaliation')!;
    expect(hit.claimId).toBe(claim.id);
    expect(hit.status).toEqual({
      derivation: claim.derivation,
      resolution: claim.resolution,
    });
    expect(hit.sourceIds).toEqual([repository.evidence.get(hit.id)!.sourceId]);
    const posed = repository.data.claims.find((c) => c.derivation === 'posed')!;
    const posedHit = searchRecords(index, posed.id)
      .groups.find((g) => g.type === 'claim')!
      .hits.find((h) => h.id === posed.id)!;
    expect(posedHit.status?.derivation).toBe('posed');
  });
  it('keeps entity lookup as a names-only mode', () => {
    const names = searchRecords(index, 'MIRI', { mode: 'names' });
    expect(names.groups.map((g) => g.type)).toEqual(['entity']);
    // The second hit is a post whose title names MIRI.
    expect(ids(names, 'entity')).toEqual([
      'miri',
      'lw-2022-miri-announces-new-death-with-dignity',
    ]);
    expect(
      searchRecords(index, '深度求索', { mode: 'names' }).groups[0].hits[0].id,
    ).toBe('deepseek');
    expect(searchRecords(index, 'whistleblower', { mode: 'names' }).total).toBe(
      0,
    );
  });
});

describe('search filters', () => {
  it('matches whole words only when asked', () => {
    expect(marked(highlight('Criticality and critics', ['critic']))).toEqual([
      'Critic',
      'critic',
    ]);
    expect(
      marked(highlight('Criticality and a critic', ['critic'], 90, true)),
    ).toEqual(['critic']);
    const prefix = searchRecords(index, 'critic');
    const whole = searchRecords(index, 'critic', { wholeWords: true });
    expect(whole.total).toBeLessThan(prefix.total);
    for (const group of whole.groups)
      for (const hit of group.hits)
        for (const s of hit.snippet.filter((s) => s.match))
          expect(foldText(s.text)).toMatch(/^critic$/);
  });
  it('limits by record type', () => {
    const results = searchRecords(index, 'Altman', { types: ['source'] });
    expect(results.groups.map((g) => g.type)).toEqual(['source']);
  });
  it('limits by collection through each record’s claims', () => {
    const frameworks = applicationCollections.find(
      (c) => c.definition.id === 'frontier-safety-frameworks',
    )!;
    const claimIds = new Set(collectionClaimIds(repository.data, frameworks));
    const results = searchRecords(index, 'ASL-3', { collection: claimIds });
    expect(results.total).toBeGreaterThan(0);
    for (const group of results.groups)
      for (const hit of group.hits)
        if (hit.claimId) expect(claimIds.has(hit.claimId)).toBe(true);
    expect(
      searchRecords(index, 'whistleblower', { collection: claimIds }).total,
    ).toBe(0);
  });
  it('limits by organisation to claims naming it or a document version it published', () => {
    const results = searchRecords(index, 'board', { organisationId: 'openai' });
    expect(results.total).toBeGreaterThan(0);
    const publishedByOpenAI = (id: string) =>
      repository.entities.get(id)?.documentVersion?.publisherId === 'openai';
    for (const hit of results.groups.flatMap((g) => g.hits))
      if (hit.claimId) {
        const claim = repository.claims.get(hit.claimId)!;
        expect(
          relatedTo(claim, 'openai') ||
            publishedByOpenAI(claim.subject) ||
            (claim.object.kind === 'entity' &&
              publishedByOpenAI(claim.object.entityId)),
        ).toBe(true);
      }
    // Provisions name the framework edition, which records its publisher.
    expect(
      ids(
        searchRecords(index, 'ASL-3', { organisationId: 'anthropic' }),
        'claim',
      ),
    ).toContain('prov-rsp-v2-0-pause-training');
    expect(
      searchRecords(index, 'ASL-3', { organisationId: 'openai' }).total,
    ).toBe(0);
    expect(searchOrganisations(repository.data).map((o) => o.id)).toContain(
      'openai',
    );
  });
  it('limits by year and leaves undated records out of a date range', () => {
    const results = searchRecords(index, 'Altman', {
      fromYear: 2023,
      untilYear: 2023,
    });
    expect(ids(results, 'claim')).toContain('cs-altman-board-departure-2023');
    expect(ids(results, 'claim')).not.toContain('altman-openai-2015');
    expect(ids(results, 'entity')).toEqual([]);
    const years = searchYears(repository.data);
    expect(years).toEqual([...years].sort((a, b) => a - b));
    expect(years).toContain(2023);
  });
});

describe('searchClaims: what a search timeline and map show', () => {
  it('keeps every claim the list shows, proposition records included', () => {
    for (const q of ['Yudkowsky', 'Hanson', 'Acemoglu', 'Anthropic']) {
      const { listed } = searchClaims(index, q);
      const hits = searchRecords(index, q).groups.flatMap((g) => g.hits);
      for (const hit of hits)
        if (hit.type === 'claim' || hit.type === 'passage')
          expect(listed.has(hit.claimId!)).toBe(true);
      const shown = queryDataset(repository.data, {
        topic: 'all',
        throughYear: 9999,
        entityType: 'all',
        focusId: null,
        propositions: true,
      }).claims.filter((c) => listed.has(c.id));
      expect(shown.length).toBe(listed.size);
    }
    // A search on an economist finds proposition records, which the explorer
    // leaves out without the flag, and the authorship records of the author's
    // texts.
    const hanson = searchClaims(index, 'Hanson').listed;
    expect(hanson.size).toBeGreaterThan(0);
    expect(
      [...hanson].every(
        (id) =>
          isPropositionRecord(repository.claims.get(id)!) ||
          repository.claims.get(id)!.predicate === 'authored',
      ),
    ).toBe(true);
  });
});
