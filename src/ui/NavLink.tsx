import {
  createContext,
  useContext,
  type AnchorHTMLAttributes,
  type ReactNode,
} from 'react';

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
