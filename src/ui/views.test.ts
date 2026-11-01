import { describe, expect, it } from 'vitest';
import { entityView, type View } from './views';

describe('the view a selected record opens', () => {
  it("opens an organisation's dossier from a claim's own page", () => {
    // The link to a claim's organisation on its page once drew the explorer:
    // the claim view was kept with no claim open.
    expect(entityView('claim', true)).toBe('dossier');
    expect(entityView('claim', false)).toBe('claims');
  });

  it('opens the dossier from every reading page, and keeps the explorer', () => {
    const reading: View[] = [
      'path',
      'starter',
      'documents',
      'compare',
      'control',
      'commitments',
      'guide',
      'propositions',
      'person',
      'document',
      'search',
      'claim',
      'dossier',
      'home',
      'hub',
    ];
    for (const view of reading)
      expect(entityView(view, true), view).toBe('dossier');
    for (const view of ['map', 'claims', 'timeline'] as View[])
      expect(entityView(view, true), view).toBe(view);
    expect(entityView('home', false)).toBe('map');
    expect(entityView('dossier', false)).toBe('claims');
  });
});
