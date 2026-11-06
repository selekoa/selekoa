/**
 * On a page drawn from its slice (docs/data-loading-design-c.md), input that
 * would change the page waits until what it needs is held: a claim link its
 * claim's bucket, anything else the whole records. Clicks and the keys that
 * act on a control (Enter, Space, arrows, Home, End, Page Up and Down) are
 * held and given again once what the control needs has loaded, as are a
 * select's or field's changes; a select's list opens once the records have. Pointing at or focusing a control starts the load. Controls that
 * need no records act at once: links within the page or to other sites, the
 * theme switch, the header's search, buttons that copy a link and controls
 * marked `data-in-page`. (Another copy made after a long wait may be
 * refused by the browser; copy buttons then show the text to copy.) A link to a page that has a slice of its own
 * is not held: it opens that page from its slice alone
 * (src/ui/page-visits.ts), and pointing at or focusing it fetches only that
 * slice. On the search page (`linksOnly`) only such links are handled.
 * Input held on a page that a link or the history has since replaced is
 * dropped, and a pointer that has not moved since a page was opened beneath
 * it prefetches nothing. Returns a function that stops holding.
 */
import { claimHeld, loadClaim, loadRecords, recordsHeld } from './records';
import { currentAddress } from './location';
import {
  linkAddress,
  opensFromSlice,
  pagesOpened,
  pointerResting,
  prefetchPage,
  visit,
} from './page-visits';
import { pageFailed } from './page-failure';

const controls =
  'a[href], button, summary, label, select, input, textarea, [role="tab"], [role="button"], [role="radio"]';
/** Controls the arrow keys and their kind act on, rather than scrolling. */
const moving = 'select, input[type="radio"], [role="tab"], [role="radio"]';
/**
 * Controls that act without the records. `data-in-page` marks a control that
 * only changes how a page shows what its slice holds (the view switch of
 * propositions by author).
 */
const exempt =
  '.theme-toggle, .header-search-toggle, .site-header form[role="search"] *, a[href^="#"], a[target="_blank"], [data-in-page]';
const pressing = new Set(['Enter', ' ']);
const keys = new Set([
  'ArrowLeft',
  'ArrowRight',
  'ArrowUp',
  'ArrowDown',
  'Home',
  'End',
  'PageUp',
  'PageDown',
]);

/** The claim a claim link opens, if the control is one. */
function claimOf(control: Element) {
  if (!control.matches('a[data-claim-link]')) return null;
  const path = new URL((control as HTMLAnchorElement).href).pathname;
  return decodeURIComponent(path.split('/')[2] ?? '') || null;
}

/** A link to another site, or to a file rather than a page (/data/claims.json). */
const external = (control: Element) => {
  if (!(control instanceof HTMLAnchorElement)) return false;
  const url = new URL(control.href, window.location.href);
  return (
    url.origin !== window.location.origin ||
    control.hasAttribute('download') ||
    /\.(?!html$)[a-z0-9]+$/i.test(url.pathname)
  );
};

/**
 * The address a control opens from its slice alone, if it is a link to such
 * a page (not a claim link, which opens its claim's panel in place).
 */
function sliceLink(control: Element, linksOnly: boolean): string | null {
  if (!(control instanceof HTMLAnchorElement) || claimOf(control)) return null;
  const address = linkAddress(control);
  // The search page's link to itself (its List view) keeps the reader's
  // order and filters, as before.
  if (linksOnly && address === currentAddress()) return null;
  return opensFromSlice(address) ? address : null;
}

export function holdUntilRecords({
  linksOnly = false,
}: { linksOnly?: boolean } = {}): () => void {
  /** Controls being given their input again, which passes through. */
  const passing = new WeakSet<Element>();

  const controlOf = (event: Event) => {
    const control = (event.target as Element | null)?.closest?.(controls);
    if (!control || control.matches(exempt) || external(control)) return null;
    // Copying a link copies an address, which needs no records.
    if (
      control.closest('.reference-action') &&
      /\blink\b/i.test(control.textContent ?? '')
    )
      return null;
    return control as HTMLElement;
  };
  /** Holds an event until what the control needs is held, then gives it again. */
  /**
   * Held input is given again in the order it came, each once what it needs
   * is held: a claim opened after a held click on a filter opens after that
   * click takes effect, even if its bucket loads first.
   */
  let queue: Promise<unknown> = Promise.resolve();
  let pending = 0;
  const hold = (event: Event, control: HTMLElement, again: () => void) => {
    const claim = claimOf(control);
    if (claim && claimHeld(claim) && !pending) return;
    event.preventDefault();
    event.stopPropagation();
    pending += 1;
    const page = pagesOpened();
    const needed = claim ? loadClaim(claim) : loadRecords();
    queue = queue
      .then(() => needed)
      .then(
        () => {
          if (pagesOpened() !== page) return;
          // A claim's row may have been drawn again meanwhile (an earlier
          // held input changed the list): its link is found by its address.
          const target = control.isConnected
            ? control
            : claim
              ? document.querySelector<HTMLElement>(
                  `a[data-claim-link][href="${CSS.escape(new URL((control as HTMLAnchorElement).href).pathname)}"]`,
                )
              : null;
          if (!target) return;
          passing.add(target);
          try {
            if (target === control) again();
            else target.click();
          } finally {
            passing.delete(target);
          }
        },
        // A link the records were loading for is followed by the browser.
        (error: unknown) => {
          if (pagesOpened() === page)
            pageFailed('The records could not be loaded', error);
          else console.error('The records could not be loaded', error);
        },
      )
      .finally(() => {
        pending -= 1;
      });
  };
  const onClick = (event: MouseEvent) => {
    if (recordsHeld()) return;
    const control = controlOf(event);
    if (!control || passing.has(control) || control.tagName === 'SUMMARY')
      return;
    // A new tab or window opens the built page itself.
    if (
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    )
      return;
    const address = sliceLink(control, linksOnly);
    if (address) {
      event.preventDefault();
      event.stopPropagation();
      visit(address, 'link');
      return;
    }
    if (linksOnly) return;
    hold(event, control, () => control.click());
  };
  const onKey = (event: KeyboardEvent) => {
    if (recordsHeld() || linksOnly) return;
    if (!pressing.has(event.key) && !keys.has(event.key)) return;
    const control = controlOf(event);
    if (!control || passing.has(control) || control.tagName === 'SUMMARY')
      return;
    // Enter on such a link is a click on it, handled above.
    if (sliceLink(control, linksOnly)) return;
    if (keys.has(event.key) && !control.matches(moving)) return;
    // Typing in a field is not held; only its Enter is.
    if (
      control.matches(
        'input:not([type="checkbox"], [type="radio"]), textarea',
      ) &&
      event.key !== 'Enter'
    )
      return;
    const { key, code, shiftKey, ctrlKey, altKey, metaKey } = event;
    hold(event, control, () =>
      (key === 'Enter' || key === ' ') && !control.matches('input, select')
        ? control.click()
        : control.dispatchEvent(
            new KeyboardEvent('keydown', {
              key,
              code,
              shiftKey,
              ctrlKey,
              altKey,
              metaKey,
              bubbles: true,
              cancelable: true,
            }),
          ),
    );
  };
  // A select opens its list on a press: it opens once the records are held.
  const onPress = (event: MouseEvent) => {
    if (recordsHeld() || linksOnly) return;
    const control = controlOf(event);
    if (!control?.matches('select')) return;
    hold(event, control, () => control.focus());
  };
  // A choice made in a select, or in a field typed into, is passed on once
  // the records are held; the control keeps showing it meanwhile.
  const onChange = (event: Event) => {
    if (recordsHeld() || linksOnly) return;
    const control = controlOf(event);
    if (!control?.matches('select, input, textarea') || passing.has(control))
      return;
    if (control.closest('form[role="search"]')) return;
    const type = event.type;
    const field = control as HTMLInputElement | HTMLSelectElement;
    const value = field.value;
    hold(event, control, () => {
      // Drawing the page with the records sets the control back to the value
      // it had; the choice is set again, past React's own record of the
      // value, so that React reads it as a change.
      const prototype = Object.getPrototypeOf(field) as object;
      Object.getOwnPropertyDescriptor(prototype, 'value')?.set?.call(
        field,
        value,
      );
      field.dispatchEvent(new Event(type, { bubbles: true }));
    });
  };
  const prefetch = (event: Event) => {
    if (recordsHeld()) return;
    // A page opened beneath a cursor that has not moved since.
    if (event.type === 'pointerover' && pointerResting()) return;
    const control = controlOf(event);
    if (!control || claimOf(control)) return;
    const address = sliceLink(control, linksOnly);
    if (address) prefetchPage(address);
    else if (!linksOnly) void loadRecords().catch(() => {});
  };
  document.addEventListener('click', onClick, true);
  document.addEventListener('keydown', onKey, true);
  document.addEventListener('mousedown', onPress, true);
  document.addEventListener('change', onChange, true);
  document.addEventListener('input', onChange, true);
  document.addEventListener('pointerover', prefetch);
  document.addEventListener('focusin', prefetch);
  return () => {
    document.removeEventListener('click', onClick, true);
    document.removeEventListener('keydown', onKey, true);
    document.removeEventListener('mousedown', onPress, true);
    document.removeEventListener('change', onChange, true);
    document.removeEventListener('input', onChange, true);
    document.removeEventListener('pointerover', prefetch);
    document.removeEventListener('focusin', prefetch);
  };
}
