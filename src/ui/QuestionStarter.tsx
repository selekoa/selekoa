import { Fragment, useLayoutEffect } from 'react';
import type { Repository } from '../domain/repository';
import type { Claim } from '../domain/schema';
import { timeLabel } from '../domain/query';
import { derivationLabels, resolutionLabels } from '../domain/epistemics';
import { provisionKindLabels } from '../domain/document-history';
import { commitmentLinkLabels } from '../domain/commitments';
import {
  chronologyKindLabels,
  claimSources,
  type QuestionStarterView,
} from '../domain/question-starter';
import { CopyLink, ExportQuestionStarter } from './ReferenceActions';
import {
  changeBasis,
  claimRoute,
  InspectLink,
  provisionLabel,
  StatusBadge,
  type ClaimProps,
} from './ReadingRows';
import { ReviewMarkers } from './ReviewMarkers';
import { ArchiveLink, SourceLanguage } from './SourceArchive';
import { nonEnglishLanguage } from '../domain/source-archive';
import { StopList } from './ControlStructure';
import './reading-first.css';
import './control-commitments.css';
import './record-pages.css';
import './question-starter.css';

/** What the row is about: a provision, or the route of the relation. */
function rowHeading(claim: Claim, repository: Repository) {
  const kind = claim.attributes?.provision?.kind;
  if (!kind) return claimRoute(claim, repository);
  const entity = repository.entities.get(claim.subject)!;
  const prefix =
    claim.predicate === 'provision_not_found'
      ? 'Not found in the inspected text'
      : claim.predicate === 'changes_from'
        ? 'Change to a provision'
        : claim.predicate === 'provision_assessed'
          ? 'Assessment of a provision'
          : 'Provision';
  return `${entity.shortName ?? entity.name} · ${prefix} · ${provisionKindLabels[kind]}: ${provisionLabel(claim, repository)}`;
}

/** Original sources of one claim; supporting sources first. */
function OriginalSources({
  claim,
  repository,
}: {
  claim: Claim;
  repository: Repository;
}) {
  const seen = new Set<string>();
  const items = claimSources(repository.data, claim).filter(({ source }) => {
    if (seen.has(source.id)) return false;
    seen.add(source.id);
    return true;
  });
  return (
    <ul className="qs-sources" aria-label="Original sources">
      {items.map(({ source, evidence }) => (
        <li key={source.id}>
          <a href={source.evidenceUrl} target="_blank" rel="noreferrer">
            {source.title}
            <span aria-hidden="true"> ↗</span>
          </a>{' '}
          <span className="qs-source-meta">
            {source.publisher} · published{' '}
            {source.publicationDate ?? 'date unknown'}
            {evidence.support !== 'supports' &&
              (evidence.support === 'context'
                ? ' · context'
                : ' · contradicts the claim')}
          </span>
          {source.archivedUrl && (
            <>
              {' · '}
              <ArchiveLink source={source} />
            </>
          )}
          {nonEnglishLanguage(source) && (
            <>
              {' · '}
              <SourceLanguage source={source} />
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

/** One stored claim: the row opens the claim and its evidence. The
 * qualification and the original sources stay visible beneath it. */
function StarterRow({
  claim,
  repository,
  selectedClaimId,
  onClaim,
}: ClaimProps & { claim: Claim }) {
  return (
    <li data-question-claim={claim.id}>
      <button
        className="dossier-claim doc-claim"
        data-claim-id={claim.id}
        aria-label={`Inspect claim & evidence: ${claim.statement}`}
        aria-pressed={selectedClaimId === claim.id}
        onClick={() => onClaim(claim.id)}
      >
        {claim.attributes?.changeBasis && (
          <span
            className={`doc-basis doc-basis-${claim.attributes.changeBasis}`}
          >
            {changeBasis[claim.attributes.changeBasis]}
          </span>
        )}
        <StatusBadge claim={claim} />
        <span className="record-row-heading">
          {rowHeading(claim, repository)}
        </span>
        <span className="dossier-statement">{claim.statement}</span>
        <span className="dossier-relation">
          {timeLabel(claim)} · {derivationLabels[claim.derivation]} ·{' '}
          {resolutionLabels[claim.resolution]}{' '}
          <ReviewMarkers claim={claim} repository={repository} />
        </span>
        <span className="dossier-evidence-link">
          Inspect claim & evidence ↗
        </span>
      </button>
      <p className="qs-qualification">
        <strong>Qualification.</strong> {claim.qualification}
      </p>
      <OriginalSources claim={claim} repository={repository} />
    </li>
  );
}

function RecordButtons({
  ids,
  repository,
  onClaim,
}: {
  ids: string[];
  repository: Repository;
  onClaim: (id: string) => void;
}) {
  if (!ids.length) return null;
  return (
    <p className="doc-question-records">
      Records:{' '}
      {ids.map((id, i) => (
        <span key={id}>
          {i > 0 && ' · '}
          <button className="text-button" onClick={() => onClaim(id)}>
            {claimRoute(repository.claims.get(id)!, repository)}
          </button>
        </span>
      ))}
    </p>
  );
}

const headingId = (id: string) => 'question-heading-' + id;

export function QuestionStarter({
  view,
  section: openAt,
  repository,
  selectedClaimId,
  onClaim,
  onEntity,
  onDocuments,
  onCommitments,
}: {
  view: QuestionStarterView;
  /** A part to open at, from a section link. */
  section?: string | null;
  repository: Repository;
  selectedClaimId: string | null;
  onClaim: (id: string) => void;
  onEntity: (id: string) => void;
  onDocuments: () => void;
  onCommitments: () => void;
}) {
  const { definition } = view;
  const props = { repository, selectedClaimId, onClaim };
  useLayoutEffect(() => {
    if (!openAt) return;
    const target = document.getElementById(headingId(openAt));
    target?.scrollIntoView({ block: 'start' });
    target?.focus({ preventScroll: true });
    // Only an address naming a part moves focus.
  }, [openAt]);
  const parts = [
    { id: 'chronology', title: 'Chronology' },
    ...view.sections.map((s) => ({ id: s.id, title: s.title })),
    { id: 'cannot-answer', title: 'What Selekoa cannot answer here' },
  ];
  return (
    <article className="doc-history qs-page" aria-label={definition.title}>
      <header className="doc-lede">
        <span className="eyebrow">
          Research question · {view.claimIds.length} existing records
        </span>
        <h1>{definition.title}</h1>
        <p className="landing-deck">{definition.question}</p>
        <p className="doc-intro">{definition.scope}</p>
        <p className="doc-status">
          A machine selected and arranged these records. No human review of the
          selection or framing is recorded.
        </p>
        <div className="doc-actions">
          <ExportQuestionStarter
            data={repository.data}
            definition={definition}
          />
          <CopyLink
            target={{ kind: 'question', id: definition.id }}
            label="Copy link to this page"
          />
        </div>
        <p className="control-related">
          Related:{' '}
          <button className="text-button" onClick={onDocuments}>
            Frontier safety frameworks
          </button>
          {' · '}
          <button className="text-button" onClick={onCommitments}>
            External commitments and obligations
          </button>
        </p>
      </header>
      <nav className="commit-toc" aria-label="Parts of this page">
        <ol>
          {parts.map((p) => (
            <li key={p.id}>
              <button
                className="text-button"
                onClick={() => {
                  // Hash addresses belong to the router; move focus instead.
                  const target = document.getElementById(headingId(p.id));
                  target?.scrollIntoView({ block: 'start' });
                  target?.focus({ preventScroll: true });
                }}
              >
                {p.title}
              </button>
            </li>
          ))}
        </ol>
      </nav>
      <details className="doc-limits-box">
        <summary>Limits of this page</summary>
        <ul className="doc-limits">
          {definition.limits.map((limit) => (
            <li key={limit}>{limit}</li>
          ))}
        </ul>
      </details>
      <section
        className="doc-family qs-part"
        aria-labelledby={headingId('chronology')}
      >
        <h2 id={headingId('chronology')} tabIndex={-1}>
          Chronology
        </h2>
        <p className="doc-family-note">
          Issue, enactment and entry into force, and each framework edition that
          names a commitment or law. Each date keeps its basis. Date order is
          not a causal sequence.
        </p>
        <ol className="qs-chronology">
          {view.chronology.map((entry) => {
            // The entry's own cited evidence, one link per distinct source.
            const sources = [
              ...new Set(
                entry.evidenceIds.map(
                  (id) => repository.evidence.get(id)!.sourceId,
                ),
              ),
            ].map((id) => repository.sources.get(id)!);
            return (
              <li
                key={entry.kind + entry.claim.id}
                data-chronology-kind={entry.kind}
              >
                <span className="qs-date">
                  {entry.date} · {entry.basis}
                </span>
                <span className="qs-event">
                  <span className="control-kind">
                    {chronologyKindLabels[entry.kind]}
                  </span>{' '}
                  <button
                    className="text-button qs-document"
                    onClick={() => onEntity(entry.documentId)}
                  >
                    {entry.label}
                  </button>
                  {entry.kind === 'link' &&
                    entry.claim.attributes?.commitment?.link && (
                      <span className="qs-link-kind">
                        {' '}
                        (
                        {commitmentLinkLabels[
                          entry.claim.attributes.commitment.link
                        ].toLowerCase()}
                        )
                      </span>
                    )}
                  <span className="qs-entry-actions">
                    <InspectLink
                      claim={entry.claim}
                      label={
                        entry.kind === 'effective'
                          ? `Inspect the enactment record for the effective date: ${entry.claim.statement}`
                          : `Inspect claim and evidence: ${entry.claim.statement}`
                      }
                      {...props}
                    >
                      {entry.kind === 'effective'
                        ? 'Enactment record, with the effective date'
                        : 'Claim & evidence'}
                    </InspectLink>
                    {sources.map((source, i) => (
                      <Fragment key={source.id}>
                        <a
                          href={source.evidenceUrl}
                          target="_blank"
                          rel="noreferrer"
                          title={source.title}
                        >
                          Original source
                          {sources.length > 1 ? ' ' + (i + 1) : ''}
                          <span className="visually-hidden">
                            : {source.title}
                          </span>
                          <span aria-hidden="true"> ↗</span>
                        </a>
                        <ArchiveLink source={source} />
                      </Fragment>
                    ))}
                  </span>
                </span>
              </li>
            );
          })}
        </ol>
      </section>
      {view.sections.map((section) => (
        <section
          key={section.id}
          className="doc-family qs-part"
          data-question-section={section.id}
          aria-labelledby={headingId(section.id)}
        >
          <h2 id={headingId(section.id)} tabIndex={-1}>
            {section.title}
          </h2>
          <p className="doc-family-note">{section.description}</p>
          <CopyLink
            target={{
              kind: 'question',
              id: definition.id,
              section: section.id,
            }}
            label="Copy link to this part"
          />
          {section.groups.map((group) => (
            <div className="commit-block" key={group.title}>
              <h3>
                {group.title} ({group.claims.length})
              </h3>
              <ul className="record-rows qs-rows">
                {group.claims.map((claim) => (
                  <StarterRow key={claim.id} claim={claim} {...props} />
                ))}
              </ul>
            </div>
          ))}
          {section.id === 'open' && (
            <>
              <div className="doc-questions">
                <h3>Open questions ({view.openQuestions.length})</h3>
                <ul>
                  {view.openQuestions.map((q) => (
                    <li key={q.id} data-open-question={q.id}>
                      <p>{q.text}</p>
                      <RecordButtons
                        ids={q.claimIds}
                        repository={repository}
                        onClaim={onClaim}
                      />
                    </li>
                  ))}
                </ul>
              </div>
              {view.setAside.length > 0 && (
                <StopList
                  stops={view.setAside}
                  repository={repository}
                  onClaim={onClaim}
                />
              )}
            </>
          )}
        </section>
      ))}
      <section
        className="doc-family qs-part"
        aria-labelledby={headingId('cannot-answer')}
      >
        <h2 id={headingId('cannot-answer')} tabIndex={-1}>
          What Selekoa cannot answer here
        </h2>
        <p className="doc-family-note">
          Questions these records leave open. Each is a gap in the records, not
          a finding about what happened.
        </p>
        <ul className="qs-gaps">
          {view.gaps.map((gap) => (
            <li key={gap.id} data-gap={gap.id}>
              <p>
                <strong>{gap.area}.</strong> {gap.text}
                {gap.detail && <> {gap.detail.text}</>}
              </p>
              <RecordButtons
                ids={[...gap.claimIds, ...(gap.detail?.claimIds ?? [])]}
                repository={repository}
                onClaim={onClaim}
              />
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
