/**
 * What the browser holds when it takes over a built page. The renderer
 * always has the whole dataset; a page is taken over without being drawn
 * afresh only if rendering it with what the browser holds gives the same HTML
 * (src/prerender/hydration.test.ts). See docs/data-loading-design-c.md
 * ("Hydration").
 */
import { normalisePath, startPath } from '../domain/addresses';
import { slicePath } from '../domain/slices';

/**
 * What the browser holds at a path before the page is taken over: nothing on
 * the start page, which renders from its precomputed summary, and on the
 * search page, which renders from its facets (src/ui/search-facets.ts); the
 * relation core and the page's slice on a page that has one; the whole
 * records chunk on every other page.
 */
export function browserData(path: string): 'none' | 'slice' | 'records' {
  const page = normalisePath(path);
  if (page === startPath || page === '/search') return 'none';
  return slicePath(page) ? 'slice' : 'records';
}
