import { Fragment } from 'react';
import type { Repository } from '../domain/repository';
import { referencePath } from '../domain/addresses';
import { NavLink, RecordLink } from './NavLink';
import {
  commitmentLinkLabels,
  commitmentStageLabels,
  type CommitmentDocument,
  type CommitmentsView,
} from '../domain/commitments';
import type { Claim } from '../domain/schema';
import { dateOf, timeLabel } from '../domain/query';
import { versionDescription } from '../domain/versions';
import { CopyLink, ExportCommitmentsStarter } from './ReferenceActions';
import {
  ClaimRow,
  InspectLink,
  ProvisionRow,
  StatusBadge,
  claimRoute,
  type ClaimProps,
} from './ReadingRows';
import { ArchiveLink, SourceLanguage } from './SourceArchive';
import { nonEnglishLanguage } from '../domain/source-archive';
import { StopList } from './ControlStructure';
import './reading-first.css';
import './control-commitments.css';

const documentLabel = (d: CommitmentDocument) =>
  d.entity.shortName ?? d.entity.documentVersion?.label ?? d.entity.name;

/** Short cell text for one signatory or refusal record. */
function cellText(claim: Claim) {
  const date = dateOf(claim) ?? 'date unknown';
  if (claim.predicate === 'declined_commitment')
    return `Stated it would not sign · ${date}`;
  const stage = claim.attributes?.commitment?.stage;
  return `${stage ? commitmentStageLabels[stage] : 'Signatory'} · ${date}`;
}

/** Shorter stage labels for matrix cells; the note above the matrix and
 * each record's inspector give the full wording. */
const matrixStageLabels = {
  intent_announced: 'Intent announced',
  signed: 'Signed',
  listed: 'Listed',
} as const;

/** Matrix cell text; a date never breaks across lines. */
function matrixText(claim: Claim) {
  const stage = claim.attributes?.commitment?.stage;
  const label =
    claim.predicate === 'declined_commitment'
      ? 'Stated refusal'
      : stage
        ? matrixStageLabels[stage]
        : 'Signatory';
  return (
    <>
      {label} ·{' '}
      <span className="commit-date">{dateOf(claim) ?? 'date unknown'}</span>
    </>
  );
}

function SignatoryMatrix({
  view,
  ...props
}: ClaimProps & { view: CommitmentsView }) {
  if (!view.matrix.length) return null;
  return (
    <section className="commit-matrix" aria-labelledby="commit-matrix-title">
      <h2 id="commit-matrix-title">Who signed or refused which text</h2>
      <p className="small-note">
        One row per organisation. Each cell lists the recorded signatures or
        refusals, with stage and date. Announcing an intent to sign, signing and
        appearing on a published list (“listed”) are different stages; a listing
        is dated by the list, not by the signature. A dash means nothing is
        recorded. It does not mean the organisation did not sign. Laws are not
        signed and have no column. Signing is not compliance.
      </p>
      <div className="doc-alignment-scroll">
        <table className="commit-table">
          <caption className="visually-hidden">
            Recorded signatories and refusals by commitment text
          </caption>
          <thead>
            <tr>
              <th scope="col">Organisation</th>
              {view.documents
                .filter((d) => view.matrixDocumentIds.includes(d.entity.id))
                .map((d) => (
                  <th scope="col" key={d.entity.id}>
                    {documentLabel(d)}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {view.matrix.map((row) => (
              <tr key={row.organisation.id}>
                <th scope="row">
                  {row.organisation.shortName ?? row.organisation.name}
                </th>
                {row.cells.map((cell) => (
                  <td key={cell.documentId}>
                    {cell.claims.length ? (
                      cell.claims.map((claim, i) => (
                        <Fragment key={claim.id}>
                          {i > 0 && <br />}
                          <InspectLink
                            claim={claim}
                            label={`Inspect: ${claim.statement}`}
                            {...props}
                          >
                            {matrixText(claim)}
                          </InspectLink>
                          {claim.attributes?.commitment?.scope && (
                            <span className="commit-scope">
                              {' '}
                              ({claim.attributes.commitment.scope})
                            </span>
                          )}
                          <StatusBadge claim={claim} />
                        </Fragment>
                      ))
                    ) : (
                      <span className="doc-unknown" aria-label="Not recorded">
                        –
                      </span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function CommitmentSection({
  document: d,
  questions,
  onEntity,
  ...props
}: ClaimProps & {
  document: CommitmentDocument;
  questions: CommitmentsView['collection']['openQuestions'];
  onEntity: (id: string) => void;
}) {
  const { repository } = props;
  const entity = d.entity;
  // A statute has no signatories; its enactment record stands instead.
  const statute =
    !d.signatories.length &&
    !d.declined.length &&
    d.issued.some((c) => c.predicate === 'enacted');
  return (
    <section
      id={'commitment-' + entity.id}
      className="doc-family commit-document"
      aria-labelledby={'commitment-heading-' + entity.id}
    >
      <h2 id={'commitment-heading-' + entity.id} tabIndex={-1}>
        {entity.name}
      </h2>
      <p className="doc-family-note">
        {d.publisher ? `Issued by ${d.publisher.name}. ` : ''}
        {entity.description}
      </p>
      <p className="doc-meta">
        {entity.documentVersion && <span>{versionDescription(entity)}</span>}
        {d.issued.map((claim) => (
          <InspectLink
            key={claim.id}
            claim={claim}
            label={`Inspect issue record: ${claim.statement}`}
            {...props}
          >
            {claim.predicate === 'enacted' ? 'Enacted' : 'Issued'}{' '}
            {timeLabel(claim)}
          </InspectLink>
        ))}
        {d.sources.map((s) => (
          <Fragment key={s.id}>
            <a href={s.evidenceUrl} target="_blank" rel="noreferrer">
              Exact text
              <span className="visually-hidden">: {s.title}</span>
              <span aria-hidden="true"> ↗</span>
            </a>
            {s.archivedUrl && <ArchiveLink source={s} />}
            {nonEnglishLanguage(s) && <SourceLanguage source={s} />}
          </Fragment>
        ))}
        <RecordLink
          className="text-button"
          id={entity.id}
          onOpen={() => onEntity(entity.id)}
        >
          Document page
        </RecordLink>
      </p>
      {statute ? (
        <p className="small-note commit-block">
          This text is a law. Organisations do not sign it, so no signatory is
          recorded.
        </p>
      ) : (
        <div className="commit-block">
          <h3>
            Signatories ({d.signatories.length})
            {d.declined.length > 0 &&
              ` · stated refusals (${d.declined.length})`}
          </h3>
          {d.signatories.length + d.declined.length > 0 ? (
            <ol className="record-rows commit-rows">
              {[...d.signatories, ...d.declined].map((claim) => {
                const org = repository.entities.get(claim.subject)!;
                const scope = claim.attributes?.commitment?.scope;
                return (
                  <ClaimRow
                    key={claim.id}
                    claim={claim}
                    heading={
                      <>
                        <span className="control-route">
                          {org.shortName ?? org.name}
                        </span>
                        <span className="control-kind">
                          {cellText(claim)}
                          {scope ? ` · ${scope}` : ''}
                        </span>
                      </>
                    }
                    {...props}
                  />
                );
              })}
            </ol>
          ) : (
            <p className="doc-gap">
              <strong>Coverage gap.</strong> No signatory is recorded for this
              text.
            </p>
          )}
        </div>
      )}
      <div className="commit-block">
        <h3>Published documents that link themselves to this text</h3>
        {d.links.length > 0 ? (
          <ul className="record-rows commit-rows">
            {d.links.map((claim) => {
              const linking = repository.entities.get(claim.subject)!;
              const link = claim.attributes?.commitment?.link;
              return (
                <ClaimRow
                  key={claim.id}
                  claim={claim}
                  heading={
                    <>
                      <span className="control-kind">
                        {link ? commitmentLinkLabels[link] : 'Links to'} this
                        text
                      </span>
                      <span className="control-route">{linking.name}</span>
                    </>
                  }
                  link={{
                    label: `Open ${linking.documentVersion?.label ?? linking.name}`,
                    onClick: () => onEntity(linking.id),
                    id: linking.id,
                  }}
                  {...props}
                />
              );
            })}
          </ul>
        ) : (
          <p className="doc-gap">
            <strong>Coverage gap.</strong> No published framework is recorded as
            linking itself to this text. One may still do so.
          </p>
        )}
      </div>
      {d.provisions.length > 0 && (
        <details className="doc-provisions">
          <summary>
            Provisions · {d.provisions.length} quoted
            {d.assessments.length > 0 &&
              ` · ${d.assessments.length} disputed assessment${d.assessments.length === 1 ? '' : 's'}`}
          </summary>
          <ul className="record-rows provision-rows">
            {[...d.provisions, ...d.assessments].map((claim) =>
              claim.attributes?.provision ? (
                <ProvisionRow key={claim.id} claim={claim} {...props} />
              ) : (
                <ClaimRow key={claim.id} claim={claim} {...props} />
              ),
            )}
          </ul>
        </details>
      )}
      {questions.length > 0 && (
        <div className="doc-questions">
          <h3>Open questions and source limits</h3>
          <ul>
            {questions.map((q) => (
              <li key={q.id}>
                <p>{q.text}</p>
                <p className="doc-question-records">
                  Records:{' '}
                  {q.claimIds.map((id, i) => (
                    <span key={id}>
                      {i > 0 && ' · '}
                      <button
                        className="text-button"
                        onClick={() => props.onClaim(id)}
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
    </section>
  );
}

export function Commitments({
  view,
  repository,
  selectedClaimId,
  onClaim,
  onEntity,
  controls,
  onControl,
}: {
  view: CommitmentsView;
  repository: Repository;
  selectedClaimId: string | null;
  onClaim: (id: string) => void;
  onEntity: (id: string) => void;
  controls: { id: string; title: string }[];
  onControl: (id: string) => void;
}) {
  const { collection, documents } = view;
  const props = { repository, selectedClaimId, onClaim };
  const signatoryRecords = documents.reduce(
    (n, d) => n + d.signatories.length,
    0,
  );
  return (
    <article className="doc-history commit-page" aria-label={collection.title}>
      <header className="doc-lede">
        <span className="eyebrow">
          External commitments · {documents.length}{' '}
          {documents.length === 1 ? 'text' : 'texts'}
          {signatoryRecords > 0 &&
            ` · ${signatoryRecords} signatory record${signatoryRecords === 1 ? '' : 's'}`}
          {view.matrix.length > 0 &&
            ` · ${view.matrix.length} organisation${view.matrix.length === 1 ? '' : 's'}`}
        </span>
        <h1>{collection.title}</h1>
        <p className="landing-deck">{collection.question}</p>
        <p className="doc-intro">{collection.introduction}</p>
        <p className="doc-status">
          A machine selected and arranged these records. No human review of the
          selection or framing is recorded.
        </p>
        <div className="doc-actions">
          <ExportCommitmentsStarter
            data={repository.data}
            collection={collection}
          />
          <CopyLink
            target={{ kind: 'commitments', id: collection.id }}
            label="Copy link to this page"
          />
        </div>
        {controls.length > 0 && (
          <p className="control-related">
            Related:{' '}
            {controls.map((c, i) => (
              <span key={c.id}>
                {i > 0 && ' · '}
                <NavLink
                  className="text-button"
                  href={referencePath({ kind: 'control', id: c.id })}
                  onOpen={() => onControl(c.id)}
                >
                  {c.title}
                </NavLink>
              </span>
            ))}
          </p>
        )}
      </header>
      <nav className="commit-toc" aria-label="Commitment texts">
        <ol>
          {documents.map((d) => (
            <li key={d.entity.id}>
              <button
                className="text-button"
                onClick={() => {
                  // Hash addresses belong to the router; move focus instead.
                  const target = document.getElementById(
                    'commitment-heading-' + d.entity.id,
                  );
                  target?.scrollIntoView({ block: 'start' });
                  target?.focus({ preventScroll: true });
                }}
              >
                {d.entity.name}
              </button>
            </li>
          ))}
        </ol>
      </nav>
      <SignatoryMatrix view={view} {...props} />
      <details className="doc-limits-box">
        <summary>Limits of this page</summary>
        <ul className="doc-limits">
          {collection.limits.map((limit) => (
            <li key={limit}>{limit}</li>
          ))}
        </ul>
      </details>
      {documents.map((d) => (
        <CommitmentSection
          key={d.entity.id}
          document={d}
          questions={collection.openQuestions.filter(
            (q) => q.documentId === d.entity.id,
          )}
          onEntity={onEntity}
          {...props}
        />
      ))}
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
