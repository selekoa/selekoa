import { describe, expect, it } from 'vitest';
import { repository } from './repository';
import type { Entity, Source } from './schema';
import {
  apaReference,
  bibliographyFile,
  citationLookup,
  cslItem,
  cslItems,
  type CslItem,
} from './citation';
import { parseBibliography } from './citation-engine';
import { datasetSchema } from './schema';

const source = (overrides: Partial<Source> & Pick<Source, 'id'>): Source => ({
  title: 'A title',
  authors: ['OpenAI'],
  publisher: 'OpenAI',
  publicationDate: '2023-07-05',
  version: 'Dated page, inspected at retrieval',
  canonicalUrl: `https://example.org/${overrides.id}`,
  evidenceUrl: `https://example.org/${overrides.id}`,
  language: 'en',
  kind: 'announcement',
  accessedAt: '2026-10-04',
  reuse: {
    attribution: 'Publisher',
    licence: 'No licence asserted',
    note: 'Selekoa reuse note that must not be cited.',
  },
  ...overrides,
});

const entity = (overrides: Partial<Entity> & Pick<Entity, 'id' | 'type'>) =>
  ({
    subtype: 'Test',
    name: overrides.id,
    aliases: [],
    description: 'Test record.',
    sourceIds: [],
    ...overrides,
  }) as Entity;

const entities: Entity[] = [
  entity({
    id: 'ashish-vaswani',
    type: 'person',
    name: 'Ashish Vaswani',
    sortName: 'Vaswani, Ashish',
  }),
  entity({
    id: 'diego-de-las-casas',
    type: 'person',
    name: 'Diego de Las Casas',
    sortName: 'de Las Casas, Diego',
  }),
  entity({ id: 'openai', type: 'organisation', name: 'OpenAI' }),
  // A name shared with a non-person record is not treated as a person.
  entity({
    id: 'mercury-person',
    type: 'person',
    name: 'Mercury',
    sortName: 'Mercury, Freddie',
  }),
  entity({ id: 'mercury-model', type: 'model', name: 'Mercury' }),
  ...['v1', 'v2', 'v2-revised'].map((v) =>
    entity({
      id: `framework-${v}`,
      type: 'document',
      documentVersion: {
        family: 'test-framework',
        label: v === 'v1' ? 'Version 1' : 'v2.0',
        dateNote: 'Test edition.',
      },
    } as Partial<Entity> & Pick<Entity, 'id' | 'type'>),
  ),
];

const fixtures = {
  paper: source({
    id: 'source-paper',
    kind: 'paper',
    title: 'Attention Is All You Need',
    authors: ['Ashish Vaswani', 'Diego de Las Casas', 'Google Brain'],
    publisher: 'arXiv',
    publicationDate: '2017',
    canonicalUrl: 'https://arxiv.org/abs/1706.03762',
    evidenceUrl: 'https://arxiv.org/pdf/1706.03762v1',
  }),
  announcement: source({
    id: 'source-announcement',
    title: 'Introducing Superalignment',
    authors: ['Mercury', 'OpenAI'],
  }),
  editionV1: source({
    id: 'source-framework-v1',
    kind: 'report',
    documentId: 'framework-v1',
    title: 'Test Framework — Version 1',
    versionDate: '2024-05-17',
  }),
  editionV2: source({
    id: 'source-framework-v2',
    kind: 'report',
    documentId: 'framework-v2',
    title: 'Test Framework',
    publicationDate: '2025-02',
  }),
  editionV2Revised: source({
    id: 'source-framework-v2-revised',
    kind: 'report',
    documentId: 'framework-v2-revised',
    title: 'Test Framework',
    publicationDate: null,
  }),
  undated: source({
    id: 'source-undated',
    kind: 'filing',
    title: 'Certificate of Incorporation',
    publicationDate: null,
  }),
  yearMonth: source({
    id: 'source-message',
    kind: 'message',
    title: 'Re: Singularity',
    authors: ['Robin Hanson'],
    publisher: 'Extropians mailing list',
    publicationDate: '1996-09',
  }),
  archivedOnly: source({
    id: 'source-archived-only',
    kind: 'article',
    title: 'The Mechanical Creation',
    authors: ['Unsigned (attributed to Samuel Butler)'],
    publisher: 'The Press (Christchurch)',
    publicationDate: '1863-06-13',
    canonicalUrl: 'https://example.org/gone/page_1?a=1&b=2#top',
    evidenceUrl:
      'https://web.archive.org/web/20260826113039/https://example.org/gone/page_1',
    archivedUrl:
      'https://web.archive.org/web/20260826113039/https://example.org/gone/page_1',
    archivedAt: '2026-08-26',
  }),
  chinese: source({
    id: 'source-chinese',
    kind: 'article',
    title: '智谱AI完成新一轮融资 & 100% {增长} $5_#',
    authors: ['于丽丽', '清华大学教育基金会'],
    publisher: '36氪',
    publicationDate: '2023-10-20',
    language: 'zh-Hans',
  }),
};
// Sources with structured author names (schema 2.14).
const named = {
  multiple: source({
    id: 'source-named-multiple',
    kind: 'paper',
    title: 'Training Compute-Optimal Large Language Models',
    authors: [
      'Jordan Hoffmann',
      'Diego de Las Casas',
      'George van den Driessche',
      'Walter S. Buckingham Jr.',
      'OpenAI Dota Team',
    ],
    authorNames: [
      { family: 'Hoffmann', given: 'Jordan' },
      // Overrides the person record's split as well as agreeing with it.
      { family: 'de Las Casas', given: 'Diego' },
      { family: 'van den Driessche', given: 'George' },
      { family: 'Buckingham', given: 'Walter S.', suffix: 'Jr.' },
      { literal: 'OpenAI Dota Team' },
    ],
    publisher: 'arXiv',
    publicationDate: '2022-03-29',
  }),
  organisation: source({
    id: 'source-named-organisation',
    kind: 'report',
    title: 'Automation and technological change',
    authors: [
      'Joint Committee on the Economic Report, Subcommittee on Economic Stabilization',
    ],
    authorNames: [
      {
        literal:
          'Joint Committee on the Economic Report, Subcommittee on Economic Stabilization',
      },
    ],
    publisher: 'U.S. Government Printing Office',
    publicationDate: '1955',
  }),
  chinese: source({
    id: 'source-named-chinese',
    kind: 'article',
    title: '疯狂的幻方：一家隐形AI巨头的大模型之路',
    authors: ['于丽丽'],
    authorNames: [{ family: '于', given: '丽丽' }],
    publisher: '36氪',
    publicationDate: '2023-05-24',
    language: 'zh-Hans',
  }),
  pseudonym: source({
    id: 'source-named-pseudonym',
    kind: 'article',
    title: 'Darwin among the Machines',
    authors: ['Cellarius (Samuel Butler)'],
    authorNames: [{ literal: 'Cellarius [Samuel Butler]' }],
    publisher: 'The Press (Christchurch)',
    publicationDate: '1863-06-13',
  }),
  // An "et al." list expanded to the full author list of the source.
  expanded: source({
    id: 'source-named-expanded',
    kind: 'paper',
    title: 'Highly accurate protein structure prediction with AlphaFold',
    authors: ['John Jumper', 'Richard Evans', 'Alexander Pritzel', 'Tim Green'],
    authorNames: [
      { family: 'Jumper', given: 'John' },
      { family: 'Evans', given: 'Richard' },
      { family: 'Pritzel', given: 'Alexander' },
      { family: 'Green', given: 'Tim' },
    ],
    publisher: 'Nature',
    publicationDate: '2021-07-15',
  }),
};

const data = { entities, sources: Object.values(fixtures) };
const lookup = citationLookup(data);
const item = (s: Source) => cslItem(s, lookup);

describe('CSL-JSON mapping', () => {
  it('splits a person-authored paper only where a person record names the author', () => {
    const csl = item(fixtures.paper);
    expect(csl.type).toBe('document');
    expect(csl.author).toEqual([
      { family: 'Vaswani', given: 'Ashish' },
      { family: 'de Las Casas', given: 'Diego' },
      { literal: 'Google Brain' },
    ]);
    expect(csl.issued).toEqual({ 'date-parts': [[2017]] });
    expect(csl.URL).toBe('https://arxiv.org/abs/1706.03762');
    expect(csl.note).toBe(
      'Inspected copy: <https://arxiv.org/pdf/1706.03762v1>.',
    );
  });

  it('keeps organisation authors and ambiguous names whole', () => {
    const csl = item(fixtures.announcement);
    expect(csl.type).toBe('webpage');
    expect(csl.author).toEqual([{ literal: 'Mercury' }, { literal: 'OpenAI' }]);
    expect(csl.issued).toEqual({ 'date-parts': [[2023, 7, 5]] });
    expect(csl.accessed).toEqual({ 'date-parts': [[2026, 10, 4]] });
    expect(csl.note).toBeUndefined();
  });

  it('keeps editions apart by title, and adds the label only to a shared title', () => {
    const [v1, v2, revised] = [
      fixtures.editionV1,
      fixtures.editionV2,
      fixtures.editionV2Revised,
    ].map(item);
    expect(v1.title).toBe('Test Framework — Version 1');
    expect(v1.note).toBe('Version date: 2024-05-17.');
    expect(v2.title).toBe('Test Framework (v2.0)');
    expect(revised.title).toBe('Test Framework (v2.0)');
    expect('version' in v2).toBe(false);
    expect(v2.issued).toEqual({ 'date-parts': [[2025, 2]] });
    expect(revised.issued).toBeUndefined();
  });

  it('gives no date for an unknown publication date', () => {
    const csl = item(fixtures.undated);
    expect(csl.issued).toBeUndefined();
    expect(csl.type).toBe('document');
  });

  it('keeps year-month precision and names the list as the venue of a message', () => {
    const csl = item(fixtures.yearMonth);
    expect(csl.issued).toEqual({ 'date-parts': [[1996, 9]] });
    expect(csl.type).toBe('post');
    expect(csl['container-title']).toBe('Extropians mailing list');
    expect(csl.author).toEqual([{ literal: 'Robin Hanson' }]);
  });

  it('cites the canonical address and gives an archived copy in the note', () => {
    const csl = item(fixtures.archivedOnly);
    expect(csl.URL).toBe(fixtures.archivedOnly.canonicalUrl);
    expect(csl.note).toBe(
      'Archived copy: <https://web.archive.org/web/20260826113039/https://example.org/gone/page_1>, captured 2026-08-26.',
    );
  });

  it('keeps a non-English title and its language', () => {
    const csl = item(fixtures.chinese);
    expect(csl.title).toBe(fixtures.chinese.title);
    expect(csl.language).toBe('zh-Hans');
    expect(csl.author).toEqual([
      { literal: '于丽丽' },
      { literal: '清华大学教育基金会' },
    ]);
  });

  it('never carries the free-text version or Selekoa’s reuse note', () => {
    for (const s of Object.values(fixtures)) {
      const text = JSON.stringify(item(s));
      expect(text).not.toContain(s.version);
      expect(text).not.toContain(s.reuse.note);
    }
  });
});

describe('structured author names', () => {
  const [multiple, organisation, chinese, pseudonym, expanded] =
    Object.values(named).map(item);

  it('gives the stored names in order, with particles, suffixes and literals', () => {
    expect(multiple.author).toEqual(named.multiple.authorNames);
    expect(organisation.author).toEqual([
      { literal: named.organisation.authors[0] },
    ]);
    expect(chinese.author).toEqual([{ family: '于', given: '丽丽' }]);
    expect(pseudonym.author).toEqual([
      { literal: 'Cellarius [Samuel Butler]' },
    ]);
    expect(expanded.author).toHaveLength(4);
  });

  it('keeps the person-record mapping for sources without them', () => {
    expect(item(fixtures.paper).author[0]).toEqual({
      family: 'Vaswani',
      given: 'Ashish',
    });
    expect(item(fixtures.chinese).author[0]).toEqual({ literal: '于丽丽' });
  });

  it('writes them to BibTeX and RIS and reads them back', async () => {
    const bib = await bibliographyFile([multiple, organisation], 'bibtex');
    expect(bib).toContain(
      'author = {Hoffmann, Jordan and de Las Casas, Diego and van den Driessche, George and Buckingham, Jr., Walter S. and {OpenAI Dota Team}}',
    );
    expect(bib).toContain(
      'author = {{Joint Committee on the Economic Report, Subcommittee on Economic Stabilization}}',
    );
    const ris = await bibliographyFile([multiple, chinese, pseudonym], 'ris');
    for (const line of [
      'AU  - de Las Casas, Diego',
      'AU  - van den Driessche, George',
      'AU  - Buckingham, Walter S., Jr.',
      'AU  - OpenAI Dota Team',
      'AU  - 于, 丽丽',
      'AU  - Cellarius [Samuel Butler]',
    ])
      expect(ris).toContain(line + '\n');
    const [back] = parseBibliography(await bibliographyFile([multiple], 'ris'));
    expect(back.author).toEqual(named.multiple.authorNames);
  });

  it('renders them in APA', async () => {
    expect((await apaReference([multiple])).text).toMatch(
      /^Hoffmann, J\., de Las Casas, D\., van den Driessche, G\., Buckingham, W\. S\., Jr\., & OpenAI Dota Team\. \(2022, March 29\)\./,
    );
    expect((await apaReference([organisation])).text).toMatch(
      /^Joint Committee on the Economic Report, Subcommittee on Economic Stabilization\. \(1955\)\./,
    );
    // A Chinese name is written family name first, without a comma.
    expect((await apaReference([chinese])).text).toMatch(
      /^于丽丽\. \(2023, May 24\)\./,
    );
    expect((await apaReference([pseudonym])).text).toMatch(
      /^Cellarius \[Samuel Butler\]\. \(1863, June 13\)\./,
    );
    expect((await apaReference([expanded])).text).toMatch(
      /^Jumper, J\., Evans, R\., Pritzel, A\., & Green, T\. \(2021, July 15\)\./,
    );
  });
});

const date = (c: Record<string, unknown>) =>
  (c.issued as { 'date-parts': number[][] } | undefined)?.['date-parts'][0];

describe('BibTeX, RIS and APA', () => {
  const items = Object.values(fixtures).map(item);

  it.each(Object.keys(fixtures))(
    '%s round-trips through BibTeX and RIS',
    async (name) => {
      const csl = item(fixtures[name as keyof typeof fixtures]);
      for (const format of ['bibtex', 'ris'] as const) {
        const [back] = parseBibliography(await bibliographyFile([csl], format));
        expect(back.title, format).toBe(csl.title);
        expect(date(back), format).toEqual(date(csl));
        expect(back.URL, format).toBe(csl.URL);
      }
    },
  );

  it('writes dates at their stored precision and never a day that is not stored', async () => {
    const bib = await bibliographyFile(items, 'bibtex');
    expect(bib).toContain('date = {2017}');
    expect(bib).toContain('date = {1996-09}');
    expect(bib).toContain('date = {2025-02}');
    expect(bib).toContain('urldate = {2026-10-04}');
    const undated = bib.split('@').find((e) => e.includes('{source-undated,'));
    expect(undated).not.toMatch(/\bdate = |\byear = /);
    const ris = await bibliographyFile([item(fixtures.paper)], 'ris');
    expect(ris).toMatch(/^PY {2}- 2017$/m);
    expect(ris).not.toMatch(/^DA {2}- 2017\/\d/m);
  });

  it('keeps Chinese text and escapes BibTeX special characters', async () => {
    const bib = await bibliographyFile([item(fixtures.chinese)], 'bibtex');
    // Capitalised words are braced to protect their case.
    expect(bib).toContain(
      'title = {智谱{AI}完成新一轮融资 \\& 100\\% \\{增长\\} \\$5\\_\\#}',
    );
    expect(bib).toContain('{于丽丽} and {清华大学教育基金会}');
    expect(bib).toContain('language = {zh-Hans}');
  });

  it('writes each RIS tag on one line, however long', async () => {
    const long = item(fixtures.archivedOnly);
    const ris = await bibliographyFile([long], 'ris');
    expect(ris).toContain(`UR  - ${long.URL}\n`);
    expect(ris).toContain(`N1  - ${long.note}\n`);
    for (const line of ris.split('\n'))
      expect(line).toMatch(/^([A-Z][A-Z0-9] {2}- |$)/);
  });

  it('gives the access date as Y2 for every RIS type, with padded dates', async () => {
    const ris = await bibliographyFile(
      [item(fixtures.announcement), item(fixtures.yearMonth)],
      'ris',
    );
    expect(ris.match(/^Y2 {2}- 2026\/10\/04\/$/gm)).toHaveLength(2);
    expect(ris).not.toMatch(/^M1 /m);
    expect(ris).toMatch(/^DA {2}- 2023\/07\/05\/$/m);
    expect(ris).toMatch(/^DA {2}- 1996\/09\/\/$/m);
  });

  it('renders APA with n.d. for an unknown date and the stored year otherwise', async () => {
    const undated = await apaReference([item(fixtures.undated)]);
    expect(undated.text).toContain(
      'OpenAI. (n.d.). Certificate of Incorporation.',
    );
    const paper = await apaReference([item(fixtures.paper)]);
    expect(paper.text).toMatch(
      /^Vaswani, A\., de Las Casas, D\., & Google Brain\. \(2017\)\./,
    );
    expect(paper.html).toContain('<i>Attention Is All You Need</i>');
    const message = await apaReference([item(fixtures.yearMonth)]);
    expect(message.text).toContain('(1996, September)');
  });

  it('writes CSL-JSON as the mapped items', async () => {
    expect(JSON.parse(await bibliographyFile(items, 'csl-json'))).toEqual(
      items,
    );
  });
});

describe('every stored source', () => {
  const sources = repository.data.sources;
  const items: CslItem[] = cslItems(repository.data, sources);

  it('maps to CSL-JSON with a title, an author and an address', () => {
    for (const csl of items) {
      expect(csl.title.length, csl.id).toBeGreaterThan(0);
      expect(csl.author.length, csl.id).toBeGreaterThan(0);
      expect(csl.URL, csl.id).toMatch(/^https?:\/\//);
    }
  });

  it('keeps every edition of a document family distinct', () => {
    const lookup = citationLookup(repository.data);
    const seen = new Map<string, string>();
    for (const csl of items) {
      const edition = lookup.editions.get(csl.id);
      if (!edition) continue;
      const key = `${edition.family}|${csl.title}`;
      const other = seen.get(key);
      const sameDocument =
        other &&
        sources.find((s) => s.id === other)!.documentId ===
          sources.find((s) => s.id === csl.id)!.documentId;
      expect(!other || sameDocument, `${csl.id} and ${other}`).toBe(true);
      seen.set(key, csl.id);
    }
  });

  it('round-trips every source through BibTeX and RIS', async () => {
    for (const format of ['bibtex', 'ris'] as const) {
      const back = parseBibliography(await bibliographyFile(items, format));
      expect(back.length, format).toBe(items.length);
      back.forEach((b, i) => {
        // Records come back in order; RIS shortens long IDs.
        const csl = items[i];
        if (format === 'bibtex') expect(b['citation-key']).toBe(csl.id);
        expect(b.title, `${format} ${csl.id}`).toBe(csl.title);
        expect(date(b), `${format} ${csl.id}`).toEqual(date(csl));
      });
    }
  }, 120_000);

  it('records no "et al." and one structured name per credited author', () => {
    for (const s of sources) {
      for (const a of s.authors) expect(a, s.id).not.toMatch(/\bet al\b/);
      if (s.authorNames)
        expect(s.authorNames.length, s.id).toBe(s.authors.length);
    }
    const alphafold = sources.find(
      (s) => s.id === 'source-atlas-alphafold-paper',
    )!;
    expect(alphafold.authors).toHaveLength(34);
    expect(alphafold.authorNames?.at(-1)).toEqual({
      family: 'Hassabis',
      given: 'Demis',
    });
  });

  it('rejects structured names that do not match the credited authors', () => {
    const broken = structuredClone(repository.data);
    const s = broken.sources.find((s) => s.authorNames)!;
    s.authorNames = [...s.authorNames!, { literal: 'Extra' }];
    expect(datasetSchema.safeParse(broken).success).toBe(false);
  });

  it('renders APA for every source', async () => {
    const { text } = await apaReference(items);
    expect(text.split('\n').length).toBe(items.length);
  }, 120_000);
});
