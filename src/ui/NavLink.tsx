import {
  createContext,
  useContext,
  type AnchorHTMLAttributes,
  type ReactNode,
} from 'react';
import { referencePath } from '../domain/addresses';

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  href: string;
  /** Opens the page in place, with the page's own focus and scroll handling. */
  onOpen: () => void;
};

/**
 * An internal link with a real address, so a reader can open it in a new tab
 * or copy it. A plain click opens the page in place; a click with a modifier
 * key or another mouse button is left to the browser.
 */
export function NavLink({
  href,
  onOpen,
  onClick,
  className,
  ...rest
}: LinkProps) {
  return (
    <a
      {...rest}
      href={href}
      className={className ? `nav-link ${className}` : 'nav-link'}
      onClick={(event) => {
        onClick?.(event);
        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        )
          return;
        event.preventDefault();
        onOpen();
      }}
    />
  );
}

/**
 * The address a record link opens: a person or document page, an
 * organisation's dossier or a proposition's collection. A record that opens
 * in the explorer has no address of its own.
 */
export const RecordHref = createContext<(id: string) => string | undefined>(
  () => undefined,
);

/** A link to a record's page, or a button where the record has no address. */
export function RecordLink({
  id,
  onOpen,
  className,
  children,
  'aria-label': label,
}: {
  id: string;
  onOpen: () => void;
  className?: string;
  children: ReactNode;
  'aria-label'?: string;
}) {
  const href = useContext(RecordHref)(id);
  return href ? (
    <NavLink
      href={href}
      onOpen={onOpen}
      className={className}
      aria-label={label}
    >
      {children}
    </NavLink>
  ) : (
    <button className={className} onClick={onOpen} aria-label={label}>
      {children}
    </button>
  );
}

/**
 * A control that opens one claim's evidence in place, with the claim page's
 * address. It acts as a toggle button (Space and Enter press it, and it
 * reports whether its claim is open); the address lets a reader open the
 * claim page in a new tab or copy its link, and lets a page read without
 * scripts reach the claim.
 */
export function ClaimLink({
  claimId,
  onOpen,
  pressed,
  secondary,
  className,
  children,
  'aria-label': label,
  ...data
}: {
  claimId: string;
  onOpen: () => void;
  /** Whether its claim is open; left out where the control shows no state. */
  pressed?: boolean;
  /**
   * A further control for a claim, such as a "Records:" link; only a claim's
   * own row carries the row marker (`data-claim-id`).
   */
  secondary?: boolean;
  className?: string;
  children: ReactNode;
  'aria-label'?: string;
  /** Further `data-*` attributes for the control. */
  [data: `data-${string}`]: string | undefined;
}) {
  return (
    <NavLink
      {...data}
      href={referencePath({ kind: 'claim', id: claimId })}
      onOpen={onOpen}
      className={className}
      role="button"
      aria-pressed={pressed}
      aria-label={label}
      data-claim-id={secondary ? undefined : claimId}
      data-claim-link=""
      onKeyDown={(event) => {
        if (event.key !== ' ') return;
        event.preventDefault();
        onOpen();
      }}
    >
      {children}
    </NavLink>
  );
}

/**
 * A link to a section of the current page. A plain click moves to the
 * section's heading and focuses it without changing the address; the
 * fragment lets a reader copy the section's link, and lets a page read
 * without scripts jump to it.
 */
export function SectionLink({
  id,
  className,
  children,
}: {
  id: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={'#' + id}
      className={className ? `nav-link ${className}` : 'nav-link'}
      onClick={(event) => {
        if (
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        )
          return;
        event.preventDefault();
        const target = document.getElementById(id);
        target?.scrollIntoView({ block: 'start' });
        target?.focus({ preventScroll: true });
      }}
    >
      {children}
    </a>
  );
}
