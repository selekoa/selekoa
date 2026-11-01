/**
 * Changes of page from a page drawn from its slice
 * (docs/data-loading-design-c.md, "Navigation"). A link to a page that has a
 * slice, and a step back or forward to one, opens that page as a fresh load
 * of its address would: the records store holds only the next page's parts,
 * the workspace is mounted afresh at the address's path, and the same
 * function a fresh load uses (`locationState` in src/Workspace.tsx) gives
 * its state. No page is drawn from the parts of several pages, and a link
 * never waits for the whole records. Once the whole records are held (any
 * other input loads them), changes of page are made in place, as before.
 */
import { flushSync } from 'react-dom';
import { normalisePath } from '../domain/addresses';
import { dataNeeds } from '../domain/slices';
import { currentAddress } from './location';
import { preloadPage } from './page-modules';
import { partsFor, prefetchParts, recordsHeld } from './records';

/** Mounts the workspace afresh at a path (App). */
let mount: ((path: string) => void) | null = null;
export function provideVisits(open: ((path: string) => void) | null) {
  mount = open;
}

/** The address a link opens, in the form `currentAddress` reads. */
export function linkAddress(link: HTMLAnchorElement): string {
  const url = new URL(link.href, window.location.href);
  return url.pathname + url.search + url.hash;
}

/**
 * Whether a change to this address opens its page from its slice alone:
 * the page has a slice (or, like search, needs no records), and the page in
 * view is drawn from parts rather than the whole records.
 */
export const opensFromSlice = (address: string) =>
  !!mount && !recordsHeld() && !dataNeeds(address).records;

/** Starts loading a page's slice and code: a link pointed at or focused. */
export function prefetchPage(address: string) {
  prefetchParts(address);
  void preloadPage(pathOf(address)).catch(() => {});
}

const pathOf = (address: string) =>
  normalisePath(new URL(address, 'https://site.invalid').pathname);

/** How many pages links and history have opened from their slices. */
let opened = 0;
export const pagesOpened = () => opened;

/**
 * Whether the pointer has rested since a page was opened. The browser
 * reports the pointer as over whatever control the new page puts beneath a
 * cursor that has not moved; that is not the reader pointing at it, and
 * should not start loading what the control needs (the whole records).
 */
let resting = false;
export const pointerResting = () => resting;
if (typeof document !== 'undefined')
  document.addEventListener(
    'pointermove',
    () => {
      resting = false;
    },
    { capture: true, passive: true },
  );

/** The latest change of page asked for; an earlier one still loading gives way. */
let latest = 0;
/**
 * Whether a step back or forward is loading. The page in view then writes
 * no address of its own (the address effect in src/Workspace.tsx): the
 * browser already shows the next address, which the page left must not
 * overwrite. During a link's visit it still does, so that a change made in
 * place meanwhile supersedes the link.
 */
let pending = false;
export const visitPending = () => pending;

/**
 * Opens the page at an address from its parts alone: after a link
 * (`link`, a new history entry) or a step back or forward (`history`, the
 * browser has already moved). The page in view stays until the next one can
 * be drawn. If its parts cannot be loaded, the browser loads the address
 * itself.
 */
export function visit(link: string, how: 'link' | 'history') {
  const turn = ++latest;
  pending = how === 'history';
  /** The address in view when the link was followed. */
  const from = currentAddress();
  // A visit gives way to a later one, and a link to any change the reader
  // made in place meanwhile (input held until the records loaded).
  const stale = () =>
    turn !== latest || (how === 'link' && currentAddress() !== from);
  // A section named by a link's fragment (a proposition on its collection
  // page) is where the page opens; the address kept is the page's. The
  // search page's and explorer's fragments are their terms, and stay.
  const [address, section] = sectionOf(link);
  const path = pathOf(address);
  Promise.all([partsFor(address), preloadPage(path)]).then(
    ([hold]) => {
      if (turn === latest) pending = false;
      if (stale() || !mount) return;
      if (how === 'history' && currentAddress() !== address) return;
      if (how === 'link') {
        // The page left keeps where the reader was, for a step back to it.
        window.history.replaceState(
          { ...(window.history.state as object | null), scrollY },
          '',
        );
        window.history[
          currentAddress() === address ? 'replaceState' : 'pushState'
        ](null, '', address);
      }
      // The store and the workspace change in one render: the page left is
      // never drawn from the next page's parts.
      opened += 1;
      resting = true;
      flushSync(() => {
        hold();
        mount!(path);
      });
      if (how === 'link') arrive(section);
      // A step back or forward returns to where the reader was on that page.
      else
        window.scrollTo(
          0,
          (window.history.state as { scrollY?: number } | null)?.scrollY ?? 0,
        );
    },
    (error: unknown) => {
      if (turn === latest) pending = false;
      if (stale()) return;
      console.error('The page could not be opened in place', error);
      if (how === 'link') window.location.assign(link);
      else window.location.reload();
    },
  );
}

/** An address without a section fragment, and the section it names. */
function sectionOf(link: string): [string, string | null] {
  const at = link.indexOf('#');
  const hash = at < 0 ? '' : link.slice(at + 1);
  if (!hash || /^\/(search|explore)\b/.test(link) || hash.includes('='))
    return [link, null];
  return [link.slice(0, at), decodeURIComponent(hash)];
}

/**
 * After a link: the section its fragment named, with focus on its heading,
 * or the top of the page with focus on the page's content, as a reader of a
 * fresh load would start.
 */
function arrive(id: string | null) {
  const section = id ? document.getElementById(id) : null;
  if (section) {
    section.scrollIntoView({ block: 'start' });
    (document.getElementById(`${id}-heading`) ?? section).focus({
      preventScroll: true,
    });
    return;
  }
  window.scrollTo(0, 0);
  const skip = document.querySelector<HTMLAnchorElement>('.skip-link');
  const target = skip
    ? document.getElementById(skip.getAttribute('href')!.slice(1))
    : null;
  target?.focus({ preventScroll: true });
}
