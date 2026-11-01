/**
 * Opening a collection page at one claim's row (`openInCollection` in
 * src/Workspace.tsx). The row exists only once the page's code and the
 * reading text it shows (a propositions collection, loaded whole with its
 * page, src/ui/proposition-text.ts) have loaded and the page has drawn. The
 * opening waits for that load, however long it takes, then for the row, so
 * that the row is opened, scrolled to and focused rather than the claim
 * selected without it.
 */

export type RevealRow = {
  /** Resolves when the page's code and text have loaded (`preloadPage`). */
  loaded: Promise<unknown>;
  /** The row, once the page has drawn it. */
  find: () => HTMLElement | null;
  /** Opens, scrolls to and focuses the row. */
  open: (row: HTMLElement) => void;
  /** The page loaded but drew no such row: the claim is selected alone. */
  missing: () => void;
  /** Whether this opening still stands: no later opening or page replaced it. */
  current: () => boolean;
  /** Frames to wait for the row once the page has loaded. */
  frames?: number;
  /** Calls back at the next animation frame. */
  nextFrame?: (callback: () => void) => void;
};

/**
 * Waits for the page to load, then for its row; resolves to whether the row
 * was opened. A page that failed to load shows its own error and no row.
 */
export async function revealRow({
  loaded,
  find,
  open,
  missing,
  current,
  frames = 60,
  nextFrame = (callback) => requestAnimationFrame(() => callback()),
}: RevealRow): Promise<boolean> {
  await loaded.catch(() => {});
  for (let left = frames; ; left -= 1) {
    // The page draws what has loaded at the next frames.
    await new Promise<void>((resolve) => nextFrame(resolve));
    if (!current()) return false;
    const row = find();
    if (row) {
      open(row);
      return true;
    }
    if (left <= 0) {
      missing();
      return false;
    }
  }
}
