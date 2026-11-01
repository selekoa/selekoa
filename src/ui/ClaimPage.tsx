import type { Claim } from '../domain/schema';
import type { Repository } from '../domain/repository';
import { relationLabel } from '../domain/predicates';
import { timeLabel } from '../domain/query';
import { derivationLabels, resolutionLabels } from '../domain/epistemics';
import { NavLink, RecordLink } from './NavLink';

export type ClaimCollection = {
  title: string;
  href: string;
  onOpen: () => void;
};

/**
 * A claim's own page: the statement as its heading, what it is about, the
 * collections that hold it and a way into the explorer. The claim panel
 * beside it (below it on a phone) carries the evidence.
 */
export function ClaimPage({
  claim,
  repository,
  collections,
  onEntity,
  onExplore,
}: {
  claim: Claim;
  repository: Repository;
  collections: ClaimCollection[];
  onEntity: (id: string) => void;
  onExplore: () => void;
}) {
  const subject = repository.entities.get(claim.subject)!;
  const object =
    claim.object.kind === 'entity'
      ? repository.entities.get(claim.object.entityId)
      : undefined;
  return (
    <article
      className="record-page claim-page"
      aria-labelledby="claim-page-title"
    >
      <header className="doc-lede">
        <span className="eyebrow">
          Claim · {timeLabel(claim, repository.data)} ·{' '}
          {derivationLabels[claim.derivation]} ·{' '}
          {resolutionLabels[claim.resolution]}
        </span>
        <h1 id="claim-page-title">{claim.statement}</h1>
        <p className="doc-intro">
          One recorded claim. The claim panel gives its qualification, the
          source passages with their place in each source, and how it was
          checked.
        </p>
      </header>
      <section aria-labelledby="claim-page-about">
        <h2 id="claim-page-about">What it connects</h2>
        <p className="claim-page-route">
          <RecordLink id={subject.id} onOpen={() => onEntity(subject.id)}>
            {subject.name}
          </RecordLink>{' '}
          → {relationLabel(claim)} →{' '}
          {object ? (
            <RecordLink id={object.id} onOpen={() => onEntity(object.id)}>
              {object.name}
            </RecordLink>
          ) : claim.object.kind === 'literal' ? (
            <strong>
              {`${claim.object.value.toLocaleString('en-US')} ${claim.object.unit ?? ''}`.trim()}
            </strong>
          ) : null}
        </p>
      </section>
      <section aria-labelledby="claim-page-collections">
        <h2 id="claim-page-collections">Where it appears</h2>
        {collections.length ? (
          <ul className="claim-page-collections">
            {collections.map((c) => (
              <li key={c.href}>
                <NavLink
                  className="text-button record-explore"
                  href={c.href}
                  onOpen={c.onOpen}
                >
                  {c.title} →
                </NavLink>
              </li>
            ))}
          </ul>
        ) : (
          <p className="record-appears-count">
            No collection page holds this claim. It is listed with its records
            in the explorer.
          </p>
        )}
        <p>
          <button className="text-button record-explore" onClick={onExplore}>
            See it with the related records in the explorer →
          </button>
        </p>
      </section>
    </article>
  );
}
