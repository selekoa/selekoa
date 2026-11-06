/**
 * Built markup that a page shows before its records arrive: text the build
 * draws from the whole dataset, which the browser keeps as it was built
 * (React leaves the content of an element set by `dangerouslySetInnerHTML`
 * as the server wrote it when it takes over a page) until the page has
 * loaded the records to draw it itself. The browser has none of these
 * strings: a page drawing an island there draws it empty, and only where
 * the built page already holds its content.
 *
 * The Model cards page keeps its list of every cell this way, so that the
 * page's own records (its slice) hold the cells' statuses and not their
 * text (review/corrections-2026-11-06.md, "The Model cards page").
 */
let source: ((key: string) => string | undefined) | null = null;

/** The renderer provides the built markup (src/prerender/render.tsx). */
export function provideIslands(
  islands: ((key: string) => string | undefined) | null,
) {
  source = islands;
}

/** The built markup of an island, or the empty string in the browser. */
export const islandHtml = (key: string) => source?.(key) ?? '';
