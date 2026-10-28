import { useSyncExternalStore } from 'react';

/**
 * Browser-only values for components that are also rendered at build time.
 * While a page is rendered on the server, and while the browser takes over a
 * built page, they return the value the built page was rendered with; React
 * then renders again with the browser's value, before the first paint where
 * the page is drawn in the browser.
 */
const unchanging = () => () => {};

/** False on the server and while a built page is taken over; true after. */
export const useInBrowser = () =>
  useSyncExternalStore(
    unchanging,
    () => true,
    () => false,
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
    () => built,
  );
}
