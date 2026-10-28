import {
  Suspense,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { pages } from './page-modules';
import {
  publicationPhrases,
  type PathEntry,
  type PersonProfile,
} from '../domain/person-profile';
import { predicates } from '../domain/predicates';
import { mapReadable, mapSize, queryDataset } from '../domain/query';
import { derivationLabels, resolutionLabels } from '../domain/epistemics';
import { CopyLink, ExportPersonStarter } from './ReferenceActions';
import { ClaimRow, claimRoute, type ClaimProps } from './ReadingRows';
import { ReviewMarkers } from './ReviewMarkers';
import { RecordMarks, StatedReason } from './RecordMarks';
import { ArchiveLink } from './SourceArchive';
import { AppearsIn } from './AppearsIn';
import {
  appearanceTotals,
  type AppearanceTotals,
  type CollectionTarget,
} from '../domain/appearances';
import './record-pages.css';

const { Network } = pages;

const kindLabels = {
  event: 'Event',
  snapshot: 'Snapshot · one dated report',
  interval: 'Interval · stated start and end only',
  unknown: 'Undated',
} as const;

const capitalise = (text: string) => text[0].toUpperCase() + text.slice(1);

function PathRow({
  entry,
  repository,
  selectedClaimId,
  onClaim,
}: ClaimProps & { entry: PathEntry }) {
  const { claim, institution, dates } = entry;
  const role = claim.attributes?.role;
  return (
    <li className="person-path-row" data-time-kind={claim.time.kind}>
      <div className="person-path-date">
        <span>{dates.record}</span>
        <span className="person-path-kind">{kindLabels[claim.time.kind]}</span>
      </div>
      <button
        className="dossier-claim doc-claim"
        data-claim-id={claim.id}
        aria-label={`Inspect claim & evidence: ${claim.statement}`}
        aria-pressed={selectedClaimId === claim.id}
        onClick={() => onClaim(claim.id)}
      >
        <span className="record-row-heading">
          {capitalise(predicates[claim.predicate].label)}
          {institution ? ' ' + institution.name : ''}
          {role ? ' · ' + role : ''}
        </span>
        <span className="dossier-statement">{claim.statement}</span>
        <span className="dossier-relation">
          {publicationPhrases(dates.publications).map((p, i) => (
            <span key={p.sourceId} data-source-id={p.sourceId}>
              {i > 0 && ' · '}
              {p.title && (
                <>
                  <cite>{p.title}</cite>:{' '}
                </>
              )}
              {p.text}
            </span>
          ))}{' '}
          · {derivationLabels[claim.derivation]} ·{' '}
          {resolutionLabels[claim.resolution]}{' '}
          <ReviewMarkers claim={claim} repository={repository} />{' '}
          <RecordMarks claim={claim} repository={repository} />
        </span>
        <span className="dossier-evidence-link">
          Inspect claim & evidence ↗
        </span>
      </button>
      <StatedReason claim={claim} repository={repository} />
    </li>
  );
}

const counterpartOf = (
  claim: PersonProfile['works'][number],
  personId: string,
) =>
  claim.object.kind === 'entity' && claim.subject === personId
    ? claim.object.entityId
    : claim.subject;

const count = (n: number, one: string, many: string) =>
  `${n} ${n === 1 ? one : many}`;

/**
 * The page's header line. It leads with the records on the person's texts,
 * where there are any, so an author with few claims about them does not read
 * as barely recorded.
 */
export function personLine(claims: number, reach: AppearanceTotals) {
  return [
    'Person',
    reach.texts > 0 &&
      count(
        reach.texts,
        'record on texts by this author',
        'records on texts by this author',
      ),
    count(
      claims,
      'recorded claim about this person',
      'recorded claims about this person',
    ),
    reach.collections > 0 &&
      `appears in ${count(reach.collections, 'collection', 'collections')}`,
  ]
    .filter(Boolean)
    .join(' · ');
}

export function PersonPage({
  profile,
  repository,
  selectedClaimId,
  onClaim,
  onEntity,
  onExplore,
  onCollection,
  resume,
  theme,
}: ClaimProps & {
  profile: PersonProfile;
  onEntity: (id: string) => void;
  onExplore: () => void;
  onCollection: (target: CollectionTarget) => void;
  resume?: ReactNode;
  theme: 'light' | 'dark';
}) {
  const { person } = profile;
  const [tab, setTab] = useState<'record' | 'map'>('record');
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const props = { repository, selectedClaimId, onClaim };
  const neighbourhood = useMemo(
    () =>
      queryDataset(repository.data, {
        topic: 'all',
        throughYear: 9999,
        entityType: 'all',
        focusId: person.id,
      }),
    [repository.data, person.id],
  );
  const pageLink = (id: string) => {
    const entity = repository.entities.get(id)!;
    return entity.type === 'document' || entity.type === 'person'
      ? {
          label: `${entity.shortName ?? entity.name}: ${entity.type} page →`,
          onClick: () => onEntity(id),
          id,
        }
      : undefined;
  };
  const reach = useMemo(
    () => appearanceTotals(repository.data, person.id),
    [repository.data, person.id],
  );
  const switchTab = (event: KeyboardEvent) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    const next = tab === 'record' ? 'map' : 'record';
    setTab(next);
    tabs.current[next === 'record' ? 0 : 1]?.focus();
  };
  return (
    <article
      className="record-page person-page"
      aria-label={person.name + ': person page'}
    >
      <header className="doc-lede">
        <span className="eyebrow">
          {personLine(profile.claimIds.length, reach)}
        </span>
        <h1>{person.name}</h1>
        <p className="landing-deck">{person.description}</p>
        <p className="record-identity">
          Description from Selekoa’s record. Sources:{' '}
          {profile.identitySources.map((s, i) => (
            <span key={s.id}>
              {i > 0 && ' · '}
              <a href={s.canonicalUrl} target="_blank" rel="noreferrer">
                {s.title}
                <span aria-hidden="true"> ↗</span>
              </a>
              {s.archivedUrl && (
                <>
                  {' · '}
                  <ArchiveLink source={s} />
                </>
              )}
            </span>
          ))}
        </p>
        <p className="doc-status">
          Computed from stored claims by fixed rules. The page adds no
          connecting text and infers no moves between roles. No human review of
          the selection is recorded.
        </p>
        <div className="doc-actions">
          <ExportPersonStarter data={repository.data} personId={person.id} />
          <CopyLink
            target={{ kind: 'person', id: person.id }}
            label="Copy link to this page"
          />
          <button className="text-button record-explore" onClick={onExplore}>
            See {person.name}’s connections in the explorer →
          </button>
        </div>
        <AppearsIn
          data={repository.data}
          entityId={person.id}
          kind="person"
          onCollection={onCollection}
        />
      </header>
      {resume}
      <div
        className="record-tabs"
        role="tablist"
        aria-label="Person page views"
        onKeyDown={switchTab}
      >
        {(
          [
            ['record', 'Documented record'],
            ['map', 'Connections map'],
          ] as const
        ).map(([id, label], i) => (
          <button
            key={id}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            role="tab"
            id={'person-tab-' + id}
            aria-selected={tab === id}
            aria-controls={'person-panel-' + id}
            tabIndex={tab === id ? 0 : -1}
            onClick={() => setTab(id)}
          >
            {label}
          </button>
        ))}
      </div>
      {tab === 'record' ? (
        <div
          role="tabpanel"
          id="person-panel-record"
          aria-labelledby="person-tab-record"
        >
          <section className="record-section" aria-labelledby="person-path">
            <h2 id="person-path">Documented path</h2>
            <p className="record-note">
              Roles, founding, launches and departures in date order. A snapshot
              is one dated report, not a tenure. An interval keeps only the
              start and end its source states, and a missing end is unknown. One
              row following another does not mean one role led to the next.
            </p>
            {profile.path.length ? (
              <ol className="person-path">
                {profile.path.map((entry) => (
                  <PathRow key={entry.claim.id} entry={entry} {...props} />
                ))}
              </ol>
            ) : (
              <p className="empty-note">
                No dated role, founding or departure record.
              </p>
            )}
            {profile.undated.length > 0 && (
              <>
                <h3 className="record-subheading" id="person-undated">
                  Undated
                </h3>
                <p className="record-note">
                  No defensible date is recorded for these. They are sorted by
                  institution, and their order carries no meaning.
                </p>
                <ol className="person-path" aria-labelledby="person-undated">
                  {profile.undated.map((entry) => (
                    <PathRow key={entry.claim.id} entry={entry} {...props} />
                  ))}
                </ol>
              </>
            )}
          </section>
          <section
            className="record-section record-limits"
            aria-labelledby="person-cannot"
          >
            <h2 id="person-cannot">What this record cannot tell you</h2>
            <ul>
              {profile.gaps.map((gap) => (
                <li key={gap.id} data-gap={gap.id}>
                  <p>{gap.text}</p>
                  <p className="doc-question-records">
                    Records:{' '}
                    {gap.claimIds.map((id, i) => (
                      <span key={id}>
                        {i > 0 && ' · '}
                        <button
                          className="text-button"
                          onClick={() => onClaim(id)}
                        >
                          {claimRoute(repository.claims.get(id)!, repository)}
                        </button>
                      </span>
                    ))}
                  </p>
                </li>
              ))}
              <li>
                <p>
                  Nothing here records why a person moved, or that one role led
                  to another. Authorship and a printed affiliation do not show
                  employment. A record that has not been collected is missing,
                  and its absence disproves nothing.
                </p>
              </li>
            </ul>
          </section>
          <section className="record-section" aria-labelledby="person-works">
            <h2 id="person-works">Works authored</h2>
            <p className="record-note">
              Authorship as credited in each document. A credit does not imply
              sole authorship.
            </p>
            {profile.works.length ? (
              <ul className="record-rows">
                {profile.works.map((claim) => (
                  <ClaimRow
                    key={claim.id}
                    claim={claim}
                    heading={
                      repository.entities.get(counterpartOf(claim, person.id))!
                        .name
                    }
                    link={pageLink(counterpartOf(claim, person.id))}
                    {...props}
                  />
                ))}
              </ul>
            ) : (
              <p className="empty-note">No authorship record.</p>
            )}
          </section>
          <section className="record-section" aria-labelledby="person-credits">
            <h2 id="person-credits">Explicit credits</h2>
            <p className="record-note">
              Documents that expressly credit this person, within the scope each
              record states. Credit that this person gives in their own work
              appears on that work’s document page.
            </p>
            {profile.creditsTo.length ? (
              <ul className="record-rows">
                {profile.creditsTo.map((claim) => (
                  <ClaimRow
                    key={claim.id}
                    claim={claim}
                    heading={
                      'Credited by ' +
                      repository.entities.get(claim.subject)!.name
                    }
                    link={pageLink(claim.subject)}
                    {...props}
                  />
                ))}
              </ul>
            ) : (
              <p className="empty-note">No explicit credit is recorded.</p>
            )}
          </section>
          <section
            className="record-section"
            aria-labelledby="person-governance"
          >
            <h2 id="person-governance">Governance roles</h2>
            <p className="record-note">
              Records classified under governance, such as board actions and
              executive appointments announced as governance events. They also
              appear in the documented path where they are role or departure
              records.
            </p>
            {profile.governance.length ? (
              <ul className="record-rows">
                {profile.governance.map((claim) => (
                  <ClaimRow key={claim.id} claim={claim} {...props} />
                ))}
              </ul>
            ) : (
              <p className="empty-note">No governance record.</p>
            )}
          </section>
          {profile.other.length > 0 && (
            <section className="record-section" aria-labelledby="person-other">
              <h2 id="person-other">Other recorded relations</h2>
              <ul className="record-rows">
                {profile.other.map((claim) => (
                  <ClaimRow key={claim.id} claim={claim} {...props} />
                ))}
              </ul>
            </section>
          )}
        </div>
      ) : (
        <div
          role="tabpanel"
          id="person-panel-map"
          aria-labelledby="person-tab-map"
          className="record-map"
        >
          <p className="record-note">
            Only records directly connected to {person.name}. Distance and
            position carry no meaning. The Documented record tab lists the same
            records as text.
          </p>
          {mapReadable(neighbourhood, true) ? (
            <Suspense
              fallback={
                <div className="network-wrap">
                  <p className="graph-notice">Loading the map…</p>
                </div>
              }
            >
              <Network
                entities={neighbourhood.entities}
                claims={neighbourhood.claims}
                anchors={repository.data.meta.anchors}
                focusId={person.id}
                selectedClaimId={selectedClaimId}
                onEntity={onEntity}
                onClaim={onClaim}
                theme={theme}
              />
            </Suspense>
          ) : (
            <p className="map-withheld" role="status">
              {mapSize(neighbourhood).records} records and{' '}
              {mapSize(neighbourhood).relationships} relationships connect to{' '}
              {person.name}, too many for a readable map. The Documented record
              tab lists them.
            </p>
          )}
        </div>
      )}
    </article>
  );
}
