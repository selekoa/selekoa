import { useSyncExternalStore } from 'react';

/**
 * Browser-only values for components that are also rendered at build time.
 * While a page is rendered on the server, and while the browser takes over a
 * built page, they return the value the built page was rendered with; React
 * then renders again with the browser's value, before the first paint where
 * the page is drawn in the browser.
 */
const unchanging = () => () => {};

/**
 * The screen width at which the renderer draws a page as the browser draws
 * it once it has taken it over, or false to draw it as built: the build does
 * so to find the records that drawing reads (src/prerender/render.tsx).
 */
let settled: number | false = false;
export const renderSettled = (width: number | false) => {
  settled = width;
};
export const settledWidth = () => settled;

/**
 * The width queries answered since the renderer last cleared them, while a
 * page was drawn as settled: a drawing that answered none, or each the same
 * at two widths, is the same at both.
 */
export const widthQueries = new Set<string>();
/** Whether every width query answered since clearing answers alike at both widths. */
export const sameAtWidths = (a: number, b: number) =>
  [...widthQueries].every((q) => widthMatches(q, a) === widthMatches(q, b));

/** Whether a width query matches a screen width; undefined for other queries. */
function widthMatches(query: string, width: number) {
  const min = /min-width:\s*(\d+)px/.exec(query);
  const max = /max-width:\s*(\d+)px/.exec(query);
  if (!min && !max) return undefined;
  return (!min || width >= Number(min[1])) && (!max || width <= Number(max[1]));
}

/** False on the server and while a built page is taken over; true after. */
export const useInBrowser = () =>
  useSyncExternalStore(
    unchanging,
    () => true,
    () => settled !== false,
  );

/** Whether a media query matches; `built` on the server. */
export function useMediaQuery(query: string, built: boolean) {
  return useSyncExternalStore(
    (change) => {
      const list = window.matchMedia?.(query);
      list?.addEventListener('change', change);
      return () => list?.removeEventListener('change', change);
    },
    () => window.matchMedia?.(query).matches ?? built,
    () => {
      if (settled === false) return built;
      const matches = widthMatches(query, settled);
      if (matches !== undefined) widthQueries.add(query);
      return matches ?? built;
    },
  );
}
