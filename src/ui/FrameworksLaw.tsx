import { Fragment, useState } from 'react';
import type { Repository } from '../domain/repository';
import type { Claim } from '../domain/schema';
import { referencePath } from '../domain/addresses';
import { commitmentLinkLabels } from '../domain/commitments';
import { frameworkLabels } from '../domain/versions';
import { provisionKindLabels } from '../domain/document-history';
import {
  changeLabels,
  notCoveredLabels,
  shortName,
  standingLabels,
  standingNotes,
  type FrameworksLawItem,
  type FrameworksLawView,
  type Standing,
  type TimelineEntry,
} from '../domain/frameworks-law';
import { ClaimLink, NavLink, RecordLink, SectionLink } from './NavLink';
import { CopyLink, ExportFrameworksLawStarter } from './ReferenceActions';
import {
  ClaimRow,
  InspectLink,
  ProvisionRow,
  type ClaimProps,
} from './ReadingRows';
import { ArchiveLink, SourceLanguage } from './SourceArchive';
import { nonEnglishLanguage } from '../domain/source-archive';
import { startHref } from './SiteChrome';
import { startIds } from './start-ids';
import './reading-first.css';
import './control-commitments.css';
import './frameworks-law.css';

type PageProps = ClaimProps & { onEntity: (id: string) => void };

/** Shortens a statement for a link label, at a word boundary. */
function clip(text: string, max = 110) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:.]$/, '') + '…';
}

const precisionNote = { year: 'year only', month: 'month only', day: '' };
const dateKindNote = {
  event: '',
  snapshot: 'snapshot',
  stated: 'date set by the text',
  document: 'document record',
};

/** "2024-07 · month only · publication": the date as stored, with its kind. */
function dateMeta(row: TimelineEntry) {
  return [
    precisionNote[row.precision],
    dateKindNote[row.dateKind],
    row.basis ?? '',
  ]
    .filter(Boolean)
    .join(' · ');
}

function recordName(id: string, repository: Repository) {
  const entity = repository.entities.get(id)!;
  const family = entity.documentVersion?.family;
  if (family && frameworkLabels[family])
    return `${frameworkLabels[family]}, ${entity.documentVersion!.label}`;
  return shortName(entity);
}

/** The record links of one row: one per stored claim. */
function RowRecords({
  claims,
  label,
  ...props
}: Omit<ClaimProps, 'repository'> & { claims: Claim[]; label: string }) {
  return (
    <>
      {claims.map((claim, i) => (
        <Fragment key={claim.id}>
          {i > 0 && ' '}
          <InspectLink
            claim={claim}
            label={`Inspect: ${claim.statement}`}
            {...props}
          >
            {claims.length > 1 ? `Record ${i + 1}` : label}
          </InspectLink>
        </Fragment>
      ))}
    </>
  );
}

function StandingBadge({ standing }: { standing: Standing }) {
  return (
    <span className={`fl-standing fl-standing-${standing}`}>
      {standingLabels[standing]}
    </span>
  );
}

function Orientation({
  view,
  ...props
}: PageProps & { view: FrameworksLawView }) {
  const { collection, sections, editions } = view;
  const instruments = sections.reduce((n, s) => n + s.instruments.length, 0);
  return (
    <section
      className="fl-orientation"
      id="fl-orientation"
      aria-labelledby="fl-orientation-title"
    >
      <h2 id="fl-orientation-title" tabIndex={-1}>
        What the page covers
      </h2>
      <p>
        {editions.length} editions of {collection.families.length} developers’
        safety frameworks, and {instruments} laws and government texts that
        address developers of frontier or general-purpose AI models, dated{' '}
        {collection.period.from} to {collection.period.to}.{' '}
        {collection.coverage} The selection is not comprehensive. What is left
        out is listed under “Not covered”.
      </p>
      <ul className="fl-passages">
        {collection.orientation.map((passage) => (
          <li key={passage.id}>
            <p>{passage.text}</p>
            <p className="doc-question-records">
              Records:{' '}
              {passage.claimIds.map((id, i) => {
                const claim = props.repository.claims.get(id)!;
                return (
                  <Fragment key={id}>
                    {i > 0 && ' · '}
                    <InspectLink
                      claim={claim}
                      label={`Inspect: ${claim.statement}`}
                      selectedClaimId={props.selectedClaimId}
                      onClaim={props.onClaim}
                    >
                      {recordName(
                        claim.object.kind === 'entity' &&
                          props.repository.entities.get(claim.object.entityId)
                            ?.type === 'document'
                          ? claim.object.entityId
                          : claim.subject,
                        props.repository,
                      )}
                      {claim.attributes?.provision &&
                        `: ${provisionKindLabels[claim.attributes.provision.kind].toLowerCase()}`}
                    </InspectLink>
                  </Fragment>
                );
              })}
            </p>
          </li>
        ))}
      </ul>
      <h3>How to read the standings</h3>
      <p className="small-note">
        Each text carries one standing, chosen from the records shown with it. A
        standing describes the text’s form and recorded stage. It is not a
        finding on its legal effect, and it never shows compliance.
      </p>
      <dl className="fl-legend">
        {(Object.keys(standingLabels) as Standing[]).map((s) => (
          <div key={s}>
            <dt>
              <StandingBadge standing={s} />
            </dt>
            <dd>{standingNotes[s]}</dd>
          </div>
        ))}
        <div>
          <dt>
            <span className="fl-change">{changeLabels.revoked}</span>{' '}
            <span className="fl-change">
              {changeLabels['revocation-announced']}
            </span>{' '}
            <span className="fl-change">{changeLabels.vetoed}</span>{' '}
            <span className="fl-change">{changeLabels['later-version']}</span>{' '}
            <span className="fl-change">{changeLabels['second-round']}</span>
          </dt>
          <dd>
            Added where a later record revokes, announces the revocation of,
            vetoes or replaces the text with another version, or records the
            same text signed by another group. Each opens its record.
          </dd>
        </div>
      </dl>
    </section>
  );
}

type Lane = 'all' | 'framework' | 'instrument';
const laneLabels: Record<Lane, string> = {
  all: 'Everything',
  framework: 'Framework editions',
  instrument: 'Laws and government texts',
};

function Timeline({
  view,
  onEntity,
  ...props
}: PageProps & { view: FrameworksLawView }) {
  const { repository } = props;
  const [lane, setLane] = useState<Lane>('all');
  const tags = new Map(view.sections.map((s) => [s.id, s.tag]));
  const rows = view.timeline.filter((r) => lane === 'all' || r.lane === lane);
  const years = [...new Set(rows.map((r) => r.date.slice(0, 4)))];
  return (
    <section
      className="fl-timeline"
      id="fl-timeline"
      aria-labelledby="fl-timeline-title"
    >
      <h2 id="fl-timeline-title" tabIndex={-1}>
        Timeline
      </h2>
      <p className="small-note">
        Every row is computed from the records: one row per text, kind of record
        and date. Dates are shown as stored, to the day, month or year the
        source gives. A snapshot is one dated report of a state, such as a
        published list. A date set by the text, such as when it takes effect, is
        kept apart from the events. Announcements are labelled as announcements.
        A row with no record of its own gives a date from the document record.
        The order of rows records no cause or influence.
      </p>
      <div
        className="view-switch fl-lanes"
        role="group"
        aria-label="Show in the timeline"
      >
        {(Object.keys(laneLabels) as Lane[]).map((l) => (
          <button key={l} aria-pressed={lane === l} onClick={() => setLane(l)}>
            {laneLabels[l]}
          </button>
        ))}
      </div>
      <p className="small-note" role="status">
        {rows.length} rows
        {lane === 'all'
          ? `: ${rows.filter((r) => r.lane === 'framework').length} framework editions, ${rows.filter((r) => r.lane === 'instrument').length} on laws and government texts.`
          : '.'}
      </p>
      {years.map((year) => (
        <div className="fl-year" key={year}>
          <h3>{year}</h3>
          <ol className="fl-rows">
            {rows
              .filter((r) => r.date.startsWith(year))
              .map((row) => {
                const named =
                  row.lane === 'framework'
                    ? view.links.filter((c) => c.subject === row.documentId)
                    : [];
                return (
                  <li
                    key={row.key}
                    className={`fl-row fl-row-${row.lane}${row.scheduled ? ' fl-row-scheduled' : ''}`}
                    data-lane={row.lane}
                  >
                    <span className="fl-row-date">
                      <time dateTime={row.date}>{row.date}</time>
                      {dateMeta(row) && (
                        <span className="fl-row-kind">{dateMeta(row)}</span>
                      )}
                    </span>
                    <span className="fl-row-body">
                      <span className="fl-row-label">
                        {row.label}
                        {row.scheduled && (
                          <span className="fl-scheduled">
                            {' '}
                            · set for a date after the latest check
                          </span>
                        )}
                        {row.sectionId && (
                          <span className="fl-tag">
                            {tags.get(row.sectionId)}
                          </span>
                        )}
                      </span>
                      <span className="fl-row-line">
                        <RecordLink
                          className="text-button fl-row-name"
                          id={row.documentId}
                          onOpen={() => onEntity(row.documentId)}
                        >
                          {recordName(row.documentId, repository)}
                        </RecordLink>
                        {row.claims.length > 0 && (
                          <span className="fl-row-records">
                            <RowRecords
                              claims={row.claims}
                              label="Inspect record"
                              selectedClaimId={props.selectedClaimId}
                              onClaim={props.onClaim}
                            />
                          </span>
                        )}
                      </span>
                      {named.length > 0 && (
                        <span className="fl-row-names">
                          Names:{' '}
                          {named
                            .map((c) =>
                              c.object.kind === 'entity'
                                ? shortName(
                                    repository.entities.get(c.object.entityId)!,
                                  )
                                : '',
                            )
                            .join(', ')}
                        </span>
                      )}
                    </span>
                  </li>
                );
              })}
          </ol>
        </div>
      ))}
    </section>
  );
}

function Instrument({
  item,
  view,
  onEntity,
  onCommitments,
  ...props
}: PageProps & {
  item: FrameworksLawItem;
  view: FrameworksLawView;
  onCommitments: () => void;
}) {
  const { repository } = props;
  const entity = item.entity;
  const name = shortName(entity);
  const dated = view.timeline.filter((r) => r.documentId === entity.id);
  const headingId = 'fl-doc-' + entity.id;
  return (
    <section className="fl-instrument" aria-labelledby={headingId}>
      <h3 id={headingId} tabIndex={-1}>
        {name}
      </h3>
      {name !== entity.name && <p className="fl-fullname">{entity.name}</p>}
      <p className="fl-badges">
        <StandingBadge standing={item.standing} />
        {item.changes.map(({ change, claims }) => (
          <span className="fl-change-group" key={change}>
            <span className="fl-change">{changeLabels[change]}</span>{' '}
            <RowRecords
              claims={claims}
              label="Inspect"
              selectedClaimId={props.selectedClaimId}
              onClaim={props.onClaim}
            />
          </span>
        ))}
      </p>
      <p className="doc-meta">
        {entity.subtype && <span>{entity.subtype}</span>}
        {item.publisher && <span>Publisher: {item.publisher.name}</span>}
      </p>
      <p className="fl-standing-records">
        Standing shown by:{' '}
        {item.standingClaims.map((claim, i) => (
          <Fragment key={claim.id}>
            {i > 0 && ' · '}
            <InspectLink
              claim={claim}
              label={`Inspect: ${claim.statement}`}
              selectedClaimId={props.selectedClaimId}
              onClaim={props.onClaim}
            >
              {clip(claim.statement)}
            </InspectLink>
          </Fragment>
        ))}
      </p>
      {dated.length > 0 && (
        <ul className="fl-dates" aria-label={`Dates of ${name}`}>
          {dated.map((row) => (
            <li key={row.key}>
              <span className="fl-dates-label">{row.label}</span>{' '}
              <time dateTime={row.date}>{row.date}</time>
              {dateMeta(row) && (
                <span className="fl-row-kind"> · {dateMeta(row)}</span>
              )}
              {row.scheduled && (
                <span className="fl-scheduled"> · after the latest check</span>
              )}{' '}
              {row.claims.length > 0 && (
                <RowRecords
                  claims={row.claims}
                  label="Inspect"
                  selectedClaimId={props.selectedClaimId}
                  onClaim={props.onClaim}
                />
              )}
            </li>
          ))}
        </ul>
      )}
      {item.links.length > 0 && (
        <div className="fl-block">
          <h4>Framework editions that name it</h4>
          <ul className="fl-inline-list">
            {item.links.map((claim) => {
              const link = claim.attributes?.commitment?.link;
              return (
                <li key={claim.id}>
                  <InspectLink
                    claim={claim}
                    label={`Inspect: ${claim.statement}`}
                    selectedClaimId={props.selectedClaimId}
                    onClaim={props.onClaim}
                  >
                    {recordName(claim.subject, repository)}
                  </InspectLink>{' '}
                  <span className="small-note">
                    {link ? commitmentLinkLabels[link] : 'Names'} this text
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      {(item.cites.length > 0 || item.citedBy.length > 0) && (
        <div className="fl-block">
          <h4>Texts it names, and texts that name it</h4>
          <ul className="record-rows">
            {[...item.cites, ...item.citedBy].map((claim) => (
              <ClaimRow key={claim.id} claim={claim} {...props} />
            ))}
          </ul>
        </div>
      )}
      {item.versionChanges.length > 0 && (
        <details className="doc-provisions">
          <summary>
            Changes from the earlier version · {item.versionChanges.length}{' '}
            recorded
          </summary>
          <ul className="record-rows">
            {item.versionChanges.map((claim) => (
              <ClaimRow key={claim.id} claim={claim} {...props} />
            ))}
          </ul>
        </details>
      )}
      {item.provisions.length > 0 ? (
        <details className="doc-provisions">
          <summary>
            What the text states · {item.provisions.length}{' '}
            {item.provisions.length === 1 ? 'provision' : 'provisions'} recorded
          </summary>
          <ul className="record-rows provision-rows">
            {item.provisions.map((claim) => (
              <ProvisionRow key={claim.id} claim={claim} {...props} />
            ))}
          </ul>
        </details>
      ) : (
        <p className="small-note">
          No provision of this text is recorded. That does not mean it has none.
        </p>
      )}
      <p className="doc-meta">
        {item.signatoryCount > 0 && (
          <NavLink
            className="text-button"
            href={startHref({ kind: 'commitments' }, startIds)}
            onOpen={onCommitments}
          >
            {item.signatoryCount} signatory records on the commitments page →
          </NavLink>
        )}
        {item.sources.map((s) => (
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
    </section>
  );
}

function LinkMatrix({
  view,
  ...props
}: Omit<ClaimProps, 'repository'> & {
  view: FrameworksLawView;
  repository: Repository;
}) {
  const { repository } = props;
  return (
    <section
      className="fl-links commit-matrix"
      id="fl-links"
      aria-labelledby="fl-links-title"
    >
      <h2 id="fl-links-title" tabIndex={-1}>
        What frameworks say about law
      </h2>
      <p className="small-note">
        {view.links.length} statements in framework editions that name one of
        the texts on this page, in the edition’s own words. One row per
        framework, one column per text named. A link is the framework’s own
        statement: that it fulfils, responds to, complies with or serves as its
        framework under a text, or that it names it. It is not evidence of
        compliance. A dash means no such statement is recorded; an edition may
        still respond to a text without saying so.
      </p>
      <div className="doc-alignment-scroll">
        <table className="commit-table fl-link-table">
          <caption className="visually-hidden">
            Framework editions’ statements naming laws and commitments
          </caption>
          <thead>
            <tr>
              <th scope="col">Framework</th>
              {view.linkedIds.map((id) => (
                <th scope="col" key={id}>
                  {shortName(repository.entities.get(id)!)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {view.linkMatrix.map((row) => (
              <tr key={row.family}>
                <th scope="row">{row.label}</th>
                {row.cells.map((cell) => (
                  <td key={cell.documentId}>
                    {cell.claims.length ? (
                      cell.claims.map((claim, i) => {
                        const link = claim.attributes?.commitment?.link;
                        return (
                          <Fragment key={claim.id}>
                            {i > 0 && <br />}
                            <InspectLink
                              claim={claim}
                              label={`Inspect: ${claim.statement}`}
                              selectedClaimId={props.selectedClaimId}
                              onClaim={props.onClaim}
                            >
                              {
                                repository.entities.get(claim.subject)!
                                  .documentVersion!.label
                              }
                            </InspectLink>
                            <span className="fl-link-kind">
                              {link ? commitmentLinkLabels[link] : 'Names'}
                            </span>
                          </Fragment>
                        );
                      })
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

function NotCovered({
  view,
  repository,
  onClaim,
}: {
  view: FrameworksLawView;
  repository: Repository;
  onClaim: (id: string) => void;
}) {
  const categories = Object.keys(notCoveredLabels) as Array<
    keyof typeof notCoveredLabels
  >;
  return (
    <section
      className="fl-not-covered"
      id="fl-not-covered"
      aria-labelledby="fl-not-covered-title"
    >
      <h2 id="fl-not-covered-title" tabIndex={-1}>
        Not covered
      </h2>
      <p className="small-note">
        Stated gaps, records held at admission and sources that could not be
        retrieved, from the admission records of 28 October 2026. A gap is not a
        finding that something did not happen.
      </p>
      {categories.map((category) => {
        const items = view.collection.notCovered.filter(
          (n) => n.category === category,
        );
        if (!items.length) return null;
        return (
          <div className="fl-block" key={category}>
            <h3>{notCoveredLabels[category]}</h3>
            <ul>
              {items.map((n) => (
                <li key={n.id}>
                  {n.text}
                  {n.claimIds.length > 0 && (
                    <span className="doc-question-records">
                      {' '}
                      Records:{' '}
                      {n.claimIds.map((id, i) => (
                        <span key={id}>
                          {i > 0 && ' · '}
                          <ClaimLink
                            secondary
                            className="text-button"
                            claimId={id}
                            onOpen={() => onClaim(id)}
                            aria-label={`Inspect: ${repository.claims.get(id)!.statement}`}
                          >
                            {recordName(
                              (() => {
                                const c = repository.claims.get(id)!;
                                return c.object.kind === 'entity' &&
                                  repository.entities.get(c.object.entityId)
                                    ?.type === 'document'
                                  ? c.object.entityId
                                  : c.subject;
                              })(),
                              repository,
                            )}
                          </ClaimLink>
                        </span>
                      ))}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </section>
  );
}

/** Moves focus to a heading on this page; hash addresses belong to the router. */
export function FrameworksLaw({
  view,
  repository,
  selectedClaimId,
  onClaim,
  onEntity,
  onCompare,
  onDocuments,
  onCommitments,
}: {
  view: FrameworksLawView;
  repository: Repository;
  selectedClaimId: string | null;
  onClaim: (id: string) => void;
  onEntity: (id: string) => void;
  onCompare: () => void;
  onDocuments: () => void;
  onCommitments: () => void;
}) {
  const { collection, sections } = view;
  const props = { repository, selectedClaimId, onClaim, onEntity };
  const instruments = sections.reduce((n, s) => n + s.instruments.length, 0);
  const toc = [
    ['fl-orientation-title', 'What the page covers'],
    ['fl-timeline-title', 'Timeline'],
    ...sections.map((s) => ['fl-section-' + s.id, s.title]),
    ['fl-links-title', 'What frameworks say about law'],
    ['fl-not-covered-title', 'Not covered'],
  ];
  return (
    <article className="doc-history fl-page" aria-label={collection.title}>
      <header className="doc-lede">
        <span className="eyebrow">
          Guided reading · {view.editions.length} framework editions ·{' '}
          {instruments} laws and government texts · {view.links.length}{' '}
          framework links
        </span>
        <h1>{collection.title}</h1>
        <p className="landing-deck">{collection.question}</p>
        <div className="doc-actions">
          <ExportFrameworksLawStarter
            data={repository.data}
            collection={collection}
          />
          <CopyLink
            target={{ kind: 'guide', id: collection.id }}
            label="Copy link to this page"
          />
        </div>
        <p className="control-related">
          Related:{' '}
          <NavLink
            className="text-button"
            href={referencePath({
              kind: 'compare',
              id: 'frontier-safety-frameworks',
            })}
            onOpen={onCompare}
          >
            Compare frameworks
          </NavLink>
          {' · '}
          <NavLink
            className="text-button"
            href={startHref({ kind: 'documents' }, startIds)}
            onOpen={onDocuments}
          >
            Framework editions, document by document
          </NavLink>
          {' · '}
          <NavLink
            className="text-button"
            href={startHref({ kind: 'commitments' }, startIds)}
            onOpen={onCommitments}
          >
            External commitments and their signatories
          </NavLink>
        </p>
      </header>
      <nav className="commit-toc" aria-label="On this page">
        <ol>
          {toc.map(([id, label]) => (
            <li key={id}>
              <SectionLink className="text-button" id={id}>
                {label}
              </SectionLink>
            </li>
          ))}
        </ol>
      </nav>
      <Orientation view={view} {...props} />
      <details className="doc-limits-box">
        <summary>Limits of this page</summary>
        <ul className="doc-limits">
          {collection.limits.map((limit) => (
            <li key={limit}>{limit}</li>
          ))}
        </ul>
      </details>
      <Timeline view={view} {...props} />
      {sections.map((section) => (
        <section
          key={section.id}
          className="doc-family fl-section"
          aria-labelledby={'fl-section-' + section.id}
        >
          <h2 id={'fl-section-' + section.id} tabIndex={-1}>
            {section.title}
          </h2>
          {section.note && <p className="doc-family-note">{section.note}</p>}
          {section.instruments.map((item) => (
            <Instrument
              key={item.entity.id}
              item={item}
              view={view}
              onCommitments={onCommitments}
              {...props}
            />
          ))}
          {section.related.length > 0 && (
            <div className="fl-block">
              <h3>{section.relatedHeading}</h3>
              <ul className="record-rows">
                {section.related.map((claim) => (
                  <ClaimRow
                    key={claim.id}
                    claim={claim}
                    repository={repository}
                    selectedClaimId={selectedClaimId}
                    onClaim={onClaim}
                  />
                ))}
              </ul>
            </div>
          )}
        </section>
      ))}
      <LinkMatrix
        view={view}
        repository={repository}
        selectedClaimId={selectedClaimId}
        onClaim={onClaim}
      />
      <NotCovered view={view} repository={repository} onClaim={onClaim} />
    </article>
  );
}
