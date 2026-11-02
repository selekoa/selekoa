import { useMemo } from 'react';
import type { Dataset } from '../domain/schema';
import { appearances, type CollectionTarget } from '../domain/appearances';
import { authorKey } from '../domain/propositions';
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
  // A person's name and aliases as byline keys: propositions by author opens
  // at the first that a byline of the collection prints.
  const authors = useMemo(() => {
    const person = data.entities.find((e) => e.id === entityId);
    return person && kind === 'person'
      ? [...new Set([person.name, ...person.aliases].map(authorKey))]
      : [];
  }, [data, entityId, kind]);
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
              {a.target.kind === 'propositions' &&
                a.texts > 0 &&
                authors.length > 0 && (
                  <StancesLink
                    target={{ kind: 'stances', id: a.target.id, authors }}
                    onCollection={onCollection}
                  />
                )}
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

/** The link from a person's collection to its stances, at their bylines. */
function StancesLink({
  target,
  onCollection,
}: {
  target: Extract<CollectionTarget, { kind: 'stances' }>;
  onCollection: (target: CollectionTarget) => void;
}) {
  return (
    <NavLink
      className="text-button record-explore"
      href={
        startHref(target, startIds) +
        '#authors=' +
        encodeURIComponent(target.authors.join('|'))
      }
      onOpen={() => onCollection(target)}
    >
      Their texts’ stances, by author →
    </NavLink>
  );
}
