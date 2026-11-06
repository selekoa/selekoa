/**
 * What happens when a change of page made in the browser fails: the code or
 * records it needs cannot be loaded or read (a tab kept open across a
 * deploy, whose files the host no longer serves or has replaced), or the
 * next page cannot be drawn from them. The browser then loads the page
 * itself, as a reload would; a blank page, or a click that does nothing, is
 * never the outcome. A failure while a page first opens is only reported:
 * loading it again would fail again.
 */
import { currentAddress } from './location';

/** How long after a click a failure is taken to belong to its link. */
const linkWindow = 15_000;

/** The address the page was loaded at. */
const loadedAt = typeof window === 'undefined' ? '' : currentAddress();
/** The link to a page of this site last followed, and when. */
let followed: { address: string; at: number } | null = null;
let leaving = false;

/** A link the browser would open as a page of this site, in this tab. */
function siteLink(event: MouseEvent): string | null {
  if (
    event.button !== 0 ||
    event.ctrlKey ||
    event.metaKey ||
    event.shiftKey ||
    event.altKey
  )
    return null;
  const link = (event.target as Element | null)?.closest?.('a[href]');
  if (!(link instanceof HTMLAnchorElement)) return null;
  if (link.target === '_blank' || link.hasAttribute('download')) return null;
  const url = new URL(link.href, window.location.href);
  if (url.origin !== window.location.origin) return null;
  // A file rather than a page (/data/claims.json).
  if (/\.(?!html$)[a-z0-9]+$/i.test(url.pathname)) return null;
  return url.pathname + url.search + url.hash;
}

/** Notes each link to a page of this site that the reader follows. */
export function noteLinks() {
  window.addEventListener(
    'click',
    (event) => {
      const address = siteLink(event);
      if (address !== null) followed = { address, at: Date.now() };
    },
    true,
  );
}

/**
 * The page to load afresh after a failure: the link just followed, or the
 * address in view if it is no longer the one the page was loaded at (a step
 * back or forward, a page opened in place). None during the first load.
 */
export function pageToLoad(now = Date.now()): string | null {
  if (followed && now - followed.at < linkWindow) return followed.address;
  const address = currentAddress();
  return address !== loadedAt ? address : null;
}

/** Loads an address as a new page (a reload when it is in view). */
export function loadAfresh(address: string) {
  if (leaving) return;
  leaving = true;
  if (address === currentAddress()) window.location.reload();
  else window.location.assign(address);
}

/**
 * Reports a failure to change page in place and loads the page meant
 * (`pageToLoad`). Returns whether it did.
 */
export function pageFailed(message: string, error: unknown): boolean {
  const address = pageToLoad();
  console.error(
    address === null ? message : `${message}; loading ${address} afresh`,
    error,
  );
  if (address === null) return false;
  loadAfresh(address);
  return true;
}

/** For tests: forget the link followed. */
export function resetFailures() {
  followed = null;
  leaving = false;
}
