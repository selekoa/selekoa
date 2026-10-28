import { useMemo } from 'react';
import type { Dataset } from '../domain/schema';
import { appearances, type CollectionTarget } from '../domain/appearances';
import { NavLink } from './NavLink';
import { startHref } from './SiteChrome';
import { startIds } from './start-ids';

const records = (n: number, what: string) =>
  `${n} ${n === 1 ? 'record' : 'records'} ${what}`;

/**
 * "Appears in": the collections that hold records about this person or
 * document, or on texts the person wrote, with a link to each.
 */
export function AppearsIn({
  data,
  entityId,
  kind,
  onCollection,
}: {
  data: Dataset;
  entityId: string;
  kind: 'person' | 'document';
  onCollection: (target: CollectionTarget) => void;
}) {
  const found = useMemo(() => appearances(data, entityId), [data, entityId]);
  const headingId = kind + '-appears';
  return (
    <section className="record-appears" aria-labelledby={headingId}>
      <h2 id={headingId}>Appears in</h2>
      {found.length ? (
        <ul>
          {found.map((a) => (
            <li key={a.target.kind + ('id' in a.target ? a.target.id : '')}>
              <NavLink
                className="text-button record-explore"
                href={startHref(a.target, startIds)}
                onOpen={() => onCollection(a.target)}
              >
                {a.title} →
              </NavLink>
              <span className="record-appears-count">
                {[
                  a.texts > 0 && records(a.texts, 'on texts by this author'),
                  a.records > 0 &&
                    records(
                      a.records,
                      kind === 'person'
                        ? 'that name this person'
                        : 'on this document',
                    ),
                ]
                  .filter(Boolean)
                  .join(' · ')}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="record-appears-count">
          No collection holds a record about this {kind} yet.
        </p>
      )}
    </section>
  );
}
