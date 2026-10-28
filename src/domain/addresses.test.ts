import { describe, expect, it } from 'vitest';
import { repository } from './repository';
import {
  legacyHashPath,
  normalisePath,
  referencePath,
  resolveReference,
  type ReferenceTarget,
} from './deep-links';
import { queryForm } from './addresses';
import { mapReadable, queryDataset } from './query';

const data = repository.data;
const claim = 'dario-anthropic-2021';

describe('earlier hash addresses move to their paths', () => {
  // Every form src/domain/deep-links.ts resolved as a hash address, with the
  // page it opened. Each now redirects to a path that opens the same page.
  const forms: [string, string, ReferenceTarget | null][] = [
    ['#/', '/', null],
    ['#', '/', null],
    ['#explorer', '/explore', { kind: 'explore' }],
    ['#/explore', '/explore', { kind: 'explore' }],
    [
      '#/explore?q=Microsoft',
      '/explore?q=Microsoft',
      { kind: 'explore', q: 'Microsoft' },
    ],
    [
      '#/explore?q=ASL-3&view=timeline',
      '/explore?q=ASL-3&view=timeline',
      { kind: 'explore', q: 'ASL-3', view: 'timeline' },
    ],
    [
      '#/explore?view=map',
      '/explore?view=map',
      { kind: 'explore', view: 'map' },
    ],
    ['#/governance', '/governance', { kind: 'hub', id: 'governance' }],
    ['#/ideas', '/ideas', { kind: 'hub', id: 'ideas' }],
    ['#/institutions', '/institutions', { kind: 'hub', id: 'institutions' }],
    ['#/about', '/about', { kind: 'about' }],
    ['#/search', '/search', { kind: 'search' }],
    ['#/search?q=ASL-3', '/search?q=ASL-3', { kind: 'search', q: 'ASL-3' }],
    [
      '#/search?q=Staring%20into%20the%20Singularity',
      '/search?q=Staring%20into%20the%20Singularity',
      { kind: 'search', q: 'Staring into the Singularity' },
    ],
    [
      '#/search?q=MIRI&mode=names&inspect=' + claim,
      '/search?q=MIRI&mode=names&inspect=' + claim,
      { kind: 'search', q: 'MIRI', mode: 'names', inspect: claim },
    ],
    ['#/claim/' + claim, '/claim/' + claim, { kind: 'claim', id: claim }],
    [
      '#/dossier/anthropic',
      '/dossier/anthropic',
      { kind: 'dossier', id: 'anthropic' },
    ],
    [
      '#/dossier/anthropic?inspect=' + claim,
      '/dossier/anthropic?inspect=' + claim,
      { kind: 'dossier', id: 'anthropic', inspect: claim },
    ],
    [
      '#/person/jan-leike',
      '/person/jan-leike',
      { kind: 'person', id: 'jan-leike' },
    ],
    [
      '#/person/dario-amodei?inspect=' + claim,
      '/person/dario-amodei?inspect=' + claim,
      { kind: 'person', id: 'dario-amodei', inspect: claim },
    ],
    [
      '#/document/rsp-v2-0',
      '/document/rsp-v2-0',
      { kind: 'document', id: 'rsp-v2-0' },
    ],
    [
      '#/documents/frontier-safety-frameworks',
      '/documents/frontier-safety-frameworks',
      { kind: 'documents', id: 'frontier-safety-frameworks' },
    ],
    ['#/control/openai', '/control/openai', { kind: 'control', id: 'openai' }],
    [
      '#/commitments/external-commitments',
      '/commitments/external-commitments',
      { kind: 'commitments', id: 'external-commitments' },
    ],
    [
      '#/propositions/superintelligence',
      '/propositions/superintelligence',
      { kind: 'propositions', id: 'superintelligence' },
    ],
    [
      '#/reading/anthropic-formation',
      '/question/anthropic-formation',
      { kind: 'question', id: 'anthropic-formation' },
    ],
    [
      '#/reading/anthropic-formation?section=personnel',
      '/question/anthropic-formation?section=personnel',
      { kind: 'question', id: 'anthropic-formation', section: 'personnel' },
    ],
    [
      '#/question/anthropic-formation?section=formation&claim=' + claim,
      '/question/anthropic-formation?section=formation&claim=' + claim,
      {
        kind: 'question',
        id: 'anthropic-formation',
        section: 'formation',
        claim,
      },
    ],
    [
      '#/question/frameworks-to-obligations?section=law-and-code&inspect=sb-framework-duty',
      '/question/frameworks-to-obligations?section=law-and-code&inspect=sb-framework-duty',
      {
        kind: 'question',
        id: 'frameworks-to-obligations',
        section: 'law-and-code',
        inspect: 'sb-framework-duty',
      },
    ],
  ];

  it.each(forms)('%s → %s', (hash, path, target) => {
    expect(legacyHashPath(hash)).toBe(path);
    expect(resolveReference(path, data)).toEqual({ target, notice: null });
  });

  it('writes each page’s address back as an equivalent path', () => {
    for (const [, path, target] of forms) {
      if (!target) continue;
      const written = referencePath(target);
      // Only the encoding of a space and the search terms' place (fragment,
      // not query) may differ.
      expect(queryForm(written).replaceAll('+', '%20')).toBe(path);
      expect(resolveReference(written, data).target).toEqual(target);
    }
  });

  it('keeps an address that names no record as a notice, not another page', () => {
    for (const hash of ['#/person/missing', '#/claim/%ZZ', '#/nope']) {
      const path = legacyHashPath(hash)!;
      expect(resolveReference(path, data).target).toBeNull();
      expect(resolveReference(path, data).notice).toContain(
        'does not match any record',
      );
    }
  });

  it('leaves ordinary fragments alone', () => {
    for (const hash of ['', '#about-method', '#start', '#record-page'])
      expect(legacyHashPath(hash)).toBeNull();
  });
});

describe('search terms stay in the fragment', () => {
  it('writes search and explore terms after #, never as a query', () => {
    expect(referencePath({ kind: 'search', q: 'Leike' })).toBe(
      '/search#q=Leike',
    );
    expect(
      referencePath({ kind: 'explore', q: 'Microsoft', view: 'map' }),
    ).toBe('/explore#q=Microsoft&view=map');
    expect(referencePath({ kind: 'search' })).toBe('/search');
  });

  it('reads the fragment form and the earlier query form alike', () => {
    for (const address of ['/search#q=Leike', '/search?q=Leike'])
      expect(resolveReference(address, data).target).toEqual({
        kind: 'search',
        q: 'Leike',
        mode: undefined,
        inspect: undefined,
      });
    expect(queryForm('/person/jan-leike#section')).toBe(
      '/person/jan-leike#section',
    );
  });
});

describe('paths as a host may deliver them', () => {
  it('treats index.html, .html and a trailing slash as the same page', () => {
    expect(normalisePath('/')).toBe('/');
    expect(normalisePath('/index.html')).toBe('/');
    expect(normalisePath('/person/jan-leike/')).toBe('/person/jan-leike');
    expect(normalisePath('/person/jan-leike.html')).toBe('/person/jan-leike');
    expect(resolveReference('/person/jan-leike/', data).target).toEqual({
      kind: 'person',
      id: 'jan-leike',
    });
  });

  it('opens the start page at the site root whatever its query', () => {
    expect(resolveReference('/?ref=example', data)).toEqual({
      target: null,
      notice: null,
    });
  });
});

describe('a dossier’s map has its own address', () => {
  const map: ReferenceTarget = { kind: 'dossier', id: 'openai', view: 'map' };

  it('writes and reads the map of direct connections', () => {
    expect(referencePath(map)).toBe('/dossier/openai?view=map');
    expect(resolveReference('/dossier/openai?view=map', data)).toEqual({
      target: map,
      notice: null,
    });
    expect(
      resolveReference(`/dossier/openai?view=map&inspect=${claim}`, data)
        .target,
    ).toEqual({ ...map, inspect: claim });
  });

  it('accepts no other view', () => {
    for (const address of [
      '/dossier/openai?view=timeline',
      '/dossier/openai?view=',
      '/dossier/openai?view=map&view=map',
    ])
      expect(resolveReference(address, data).target, address).toBeNull();
  });

  it('draws OpenAI’s direct connections within the focused map limits', () => {
    const view = queryDataset(data, {
      topic: 'all',
      throughYear: 9999,
      entityType: 'all',
      focusId: 'openai',
    });
    expect(mapReadable(view, true)).toBe(true);
  });
});
