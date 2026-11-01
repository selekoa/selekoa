import { describe, expect, it } from 'vitest';
import { bucketPath, dataNeeds, slicePath } from '../domain/slices';

describe('the data a page needs', () => {
  it('runs the search page alone unless a claim is inspected', () => {
    expect(dataNeeds('/search')).toEqual({ records: false, parts: [] });
    expect(dataNeeds('/search#q=board&mode=names').records).toBe(false);
    expect(dataNeeds('/search?q=board').records).toBe(false);
    expect(dataNeeds('/search#q=board&inspect=dario-anthropic-2021')).toEqual({
      records: true,
      parts: [],
    });
    expect(slicePath('/person/jan-leike.html')).toBe(
      '/slices/person/jan-leike.json',
    );
    // A slice names the relation core itself when it needs it.
    expect(dataNeeds('/claim/x.html').parts).toEqual([bucketPath('x')]);
  });

  it('draws record pages and collections from their slices', () => {
    expect(dataNeeds('/dossier/openai')).toEqual({
      records: false,
      parts: ['/slices/dossier/openai.json'],
    });
    expect(dataNeeds('/person/jan-leike?inspect=x').parts).toEqual([
      '/slices/person/jan-leike.json',
      bucketPath('x'),
    ]);
    expect(slicePath('/claim/dario-anthropic-2021')).toBe(
      bucketPath('dario-anthropic-2021'),
    );
    expect(slicePath('/question/anthropic-formation')).toBe(
      '/slices/question/anthropic-formation.json',
    );
  });

  it('draws the hubs, About & method and the explorer from slices', () => {
    for (const hub of ['/governance', '/ideas', '/institutions'])
      expect(slicePath(hub)).toBe('/slices/hubs.json');
    expect(slicePath('/about')).toBe('/slices/about.json');
    expect(dataNeeds('/explore')).toEqual({
      records: false,
      parts: ['/slices/explore.json'],
    });
  });

  it('loads the records for other pages and other queries', () => {
    for (const address of [
      '/',
      '/explore#q=x',
      '/question/anthropic-formation?section=x',
      '/compare/frontier-safety-frameworks?editions=a',
    ])
      expect(dataNeeds(address).records, address).toBe(true);
  });
});
