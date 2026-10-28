import type { Repository } from '../domain/repository';
import { NavLink, RecordLink } from './NavLink';
import { referencePath } from '../domain/addresses';
import { startHref } from './SiteChrome';
import { startIds } from './start-ids';
import {
  controlEntryLabels,
  controlRightLabels,
  stopCategoryLabels,
  type ControlEntry,
  type ControlStructure as Structure,
} from '../domain/control-structures';
import { predicates } from '../domain/predicates';
import { timeLabel } from '../domain/query';
import { CopyLink, ExportControlStarter } from './ReferenceActions';
import {
  ClaimRow,
  StatusBadge,
  claimRoute,
  type ClaimProps,
} from './ReadingRows';
import './reading-first.css';
import './control-commitments.css';

const shortName = (e: { name: string; shortName?: string } | null) =>
  e ? (e.shortName ?? e.name) : '';

/** "Holder → right → entity" for control rights; the stored relation otherwise. */
function entryRoute(entry: ControlEntry, repository: Repository) {
  if (entry.right)
    return `${shortName(entry.subject)} → ${controlRightLabels[entry.right].toLowerCase()} → ${shortName(entry.object)}`;
  if (entry.claim.object.kind === 'literal')
    return `${shortName(entry.subject)} → ${predicates[entry.claim.predicate].label} → ${String(entry.claim.object.value)}`;
  return claimRoute(entry.claim, repository);
}

function EntryHeading({
  entry,
  repository,
}: {
  entry: ControlEntry;
  repository: Repository;
}) {
  return (
    <>
      <span className="control-kind">
        {controlEntryLabels[entry.kind]}
        {entry.stage && (
          <span
            className={`control-stage control-stage-${entry.stage === 'Effective' ? 'effective' : 'provisional'}`}
          >
            {entry.stage}
          </span>
        )}
      </span>
      <span className="control-route">{entryRoute(entry, repository)}</span>
      {entry.instrument && (
        <span className="control-instrument">
          Instrument: {entry.instrument}
        </span>
      )}
    </>
  );
}

/** The control rights alone, in date order: who holds what over whom. */
function ControlSummary({
  structure,
  ...props
}: ClaimProps & { structure: Structure }) {
  const rights = structure.entries.filter((e) => e.kind === 'control');
  if (!rights.length) return null;
  return (
    <section
      className="control-summary"
      aria-labelledby="control-summary-title"
    >
      <h2 id="control-summary-title">Who holds which control right</h2>
      <p className="small-note">
        Each row is one recorded control right, in date order. It names the
        holder, the right, the organisation it is held over, the instrument, and
        whether the source records it as announced, agreed or in effect. Rows
        are not joined into a chain. Read each against its own date and
        evidence.
      </p>
      <div className="doc-alignment-scroll control-table-scroll">
        <table className="control-table">
          <caption className="visually-hidden">
            Recorded control rights, {structure.organisation.name}
          </caption>
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Stage</th>
              <th scope="col">Holder</th>
              <th scope="col">Right</th>
              <th scope="col">Over</th>
              <th scope="col">Instrument</th>
            </tr>
          </thead>
          <tbody>
            {rights.map((entry) => (
              <tr key={entry.claim.id}>
                <td>{timeLabel(entry.claim)}</td>
                <td>{entry.stage}</td>
                <td>{shortName(entry.subject)}</td>
                <td>
                  <button
                    className="doc-inspect"
                    data-claim-id={entry.claim.id}
                    aria-pressed={props.selectedClaimId === entry.claim.id}
                    aria-label={`Inspect: ${entry.claim.statement}`}
                    onClick={() => props.onClaim(entry.claim.id)}
                  >
                    {controlRightLabels[entry.right!]}
                    <span aria-hidden="true"> ↗</span>
                  </button>
                  <StatusBadge claim={entry.claim} />
                </td>
                <td>{shortName(entry.object)}</td>
                <td>{entry.instrument}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function ControlStructure({
  structure,
  repository,
  selectedClaimId,
  onClaim,
  onEntity,
  others,
  onOther,
  onCommitments,
}: {
  structure: Structure;
  repository: Repository;
  selectedClaimId: string | null;
  onClaim: (id: string) => void;
  onEntity: (id: string) => void;
  others: { id: string; title: string }[];
  onOther: (id: string) => void;
  onCommitments: () => void;
}) {
  const { collection, years, parties } = structure;
  const props = { repository, selectedClaimId, onClaim };
  const dated = structure.entries.filter((e) => e.date).length;
  return (
    <article className="doc-history control-page" aria-label={collection.title}>
      <header className="doc-lede">
        <span className="eyebrow">
          Control structures · {structure.entries.length} records ({dated}{' '}
          dated) · {structure.organisation.name}
        </span>
        <h1>{collection.title}</h1>
        <p className="landing-deck">{collection.question}</p>
        <p className="doc-intro">{collection.introduction}</p>
        <p className="doc-status">
          A machine selected and arranged these records. No human review of the
          selection or framing is recorded.
        </p>
        <div className="doc-actions">
          <ExportControlStarter
            data={repository.data}
            collection={collection}
          />
          <CopyLink
            target={{ kind: 'control', id: collection.id }}
            label="Copy link to this page"
          />
        </div>
        <p className="control-related">
          Related:{' '}
          {others.map((o) => (
            <span key={o.id}>
              <NavLink
                className="text-button"
                href={referencePath({ kind: 'control', id: o.id })}
                onOpen={() => onOther(o.id)}
              >
                {o.title}
              </NavLink>
              {' · '}
            </span>
          ))}
          <NavLink
            className="text-button"
            href={startHref({ kind: 'commitments' }, startIds)}
            onOpen={onCommitments}
          >
            External commitments and obligations
          </NavLink>
        </p>
      </header>
      <ControlSummary structure={structure} {...props} />
      <details className="doc-limits-box">
        <summary>Limits of this page</summary>
        <ul className="doc-limits">
          {collection.limits.map((limit) => (
            <li key={limit}>{limit}</li>
          ))}
        </ul>
      </details>
      <section
        className="control-timeline"
        aria-labelledby="control-timeline-title"
      >
        <h2 id="control-timeline-title">Dated timeline</h2>
        <p className="small-note">
          Every record on this page, oldest first: control rights, legal forms,
          formations, conversions, name changes, board actions, quoted
          provisions of governing documents, changes between filed versions and
          questions about control that Selekoa poses and the sources do not
          settle. An announcement and the date an arrangement took effect are
          separate records. Undated records are listed last.
        </p>
        {years.map((group) => (
          <section
            key={group.year ?? 'undated'}
            className="control-year"
            aria-labelledby={'control-year-' + (group.year ?? 'undated')}
          >
            <h3 id={'control-year-' + (group.year ?? 'undated')}>
              {group.year ?? 'Undated'}
            </h3>
            <ol className="record-rows control-rows">
              {group.entries.map((entry) => (
                <ClaimRow
                  key={entry.claim.id}
                  claim={entry.claim}
                  heading={
                    <EntryHeading entry={entry} repository={repository} />
                  }
                  {...props}
                />
              ))}
            </ol>
          </section>
        ))}
      </section>
      <details className="doc-more control-parties">
        <summary>
          Organisations and bodies on this page ({parties.length})
        </summary>
        <p className="small-note">
          Distinct legal entities and bodies keep separate identities. A legal
          form is shown only where a stored record states it.
        </p>
        <ul className="control-party-list">
          {parties.map(({ entity, legalForms }) => (
            <li key={entity.id}>
              <RecordLink
                className="text-button"
                id={entity.id}
                onOpen={() => onEntity(entity.id)}
              >
                {entity.name}
              </RecordLink>{' '}
              <span className="small-note">{entity.subtype}</span>
              {legalForms.map((c) => (
                <span key={c.id}>
                  {' · '}
                  <button
                    className="doc-inspect"
                    data-claim-id={c.id}
                    aria-pressed={selectedClaimId === c.id}
                    aria-label={`Inspect legal form record: ${c.statement}`}
                    onClick={() => onClaim(c.id)}
                  >
                    {c.object.kind === 'literal' ? String(c.object.value) : ''}{' '}
                    ({timeLabel(c)})<span aria-hidden="true"> ↗</span>
                  </button>
                </span>
              ))}
            </li>
          ))}
        </ul>
      </details>
      {collection.openQuestions.length > 0 && (
        <div className="doc-questions">
          <h2>Open questions and source limits</h2>
          <ul>
            {collection.openQuestions.map((q) => (
              <li key={q.id}>
                <p>{q.text}</p>
                <p className="doc-question-records">
                  Records:{' '}
                  {q.claimIds.map((id, i) => (
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
          </ul>
        </div>
      )}
      {collection.stops.length > 0 && (
        <StopList
          stops={collection.stops}
          repository={repository}
          onClaim={onClaim}
        />
      )}
    </article>
  );
}

export function StopList({
  stops,
  repository,
  onClaim,
}: {
  stops: Structure['collection']['stops'];
  repository: Repository;
  onClaim: (id: string) => void;
}) {
  return (
    <details className="doc-more control-stops">
      <summary>Questions set aside ({stops.length})</summary>
      <p className="small-note">
        These questions were deliberately not turned into records. Answering
        them would need legal interpretation, a decisive source for conflicting
        dates, or statements about a living person beyond documented roles.
      </p>
      <ul>
        {stops.map((s) => (
          <li key={s.id}>
            <span className="control-kind">
              {stopCategoryLabels[s.category]}
            </span>{' '}
            {s.text}
            {s.claimIds.length > 0 && (
              <span className="doc-question-records">
                {' '}
                Related records:{' '}
                {s.claimIds.map((id, i) => (
                  <span key={id}>
                    {i > 0 && ' · '}
                    <button className="text-button" onClick={() => onClaim(id)}>
                      {claimRoute(repository.claims.get(id)!, repository)}
                    </button>
                  </span>
                ))}
              </span>
            )}
          </li>
        ))}
      </ul>
    </details>
  );
}
