import { Fragment } from 'react';
import type { Repository } from '../domain/repository';
import { referencePath } from '../domain/addresses';
import {
  computeNotCoveredLabels,
  entityLabel,
  type ComputeBuildoutView,
  type ComputeFigure,
  type ComputeRecord,
  type ComputeStatedDate,
} from '../domain/compute-buildout';
import { ClaimLink, NavLink, SectionLink } from './NavLink';
import { CopyLink, StarterDownload } from './ReferenceActions';
import {
  computeBuildoutStarter,
  computeBuildoutStarterMarkdown,
} from '../domain/compute-buildout-starter';
import { starterJson } from '../domain/starter';
import { ClaimRow, InspectLink, type ClaimProps } from './ReadingRows';
import './reading-first.css';
import './frameworks-law.css';
import './compute-buildout.css';

const precisionNote = { year: 'year only', month: 'month only', day: '' };

/** "2024-07 · month only · announcement": the date as stored, with its kind. */
function dateMeta(record: ComputeRecord) {
  return [
    record.precision ? precisionNote[record.precision] : '',
    record.snapshot ? 'snapshot' : (record.basis ?? ''),
  ]
    .filter(Boolean)
    .join(' · ');
}

/** The label above a record: its kind, then its stated stage. */
const recordHeading = (r: ComputeRecord) =>
  r.stage ? `${r.kind} · ${r.stage}` : r.kind;

function Figures({ figures }: { figures: ComputeFigure[] }) {
  return (
    <span className="cb-figures">
      {figures.map((f) => (
        <span className="cb-figure" key={f.key}>
          <span className="cb-figure-value" data-record-text="">
            {f.value}
          </span>
          <span className="cb-figure-meta">
            {f.kind === 'amount' ? 'Amount' : 'Figure'}: {f.bound}
            {f.measures !== null && <> · Measures: {f.measures}</>}
            {f.scope && <> · Scope: {f.scope}</>}
          </span>
        </span>
      ))}
    </span>
  );
}

function statedText(d: ComputeStatedDate) {
  const shown = d.wording ?? d.date ?? '';
  return d.wording && d.date && !d.wording.includes(d.date)
    ? `${shown} (${d.date})`
    : shown;
}

function StatedDates({ dates }: { dates: ComputeStatedDate[] }) {
  return (
    <span className="cb-stated">
      <span className="cb-stated-label">
        Stated dates (targets and terms, not events):
      </span>{' '}
      {dates.map((d, i) => (
        <Fragment key={d.key}>
          {i > 0 && '; '}
          {d.kind.toLowerCase()}{' '}
          <span data-record-text="">{statedText(d)}</span> ({d.statedBy})
        </Fragment>
      ))}
    </span>
  );
}

function Orientation({
  view,
  ...props
}: Omit<ClaimProps, 'repository'> & {
  view: ComputeBuildoutView;
  repository: Repository;
}) {
  const { collection, records, figures, stated } = view;
  return (
    <section
      className="fl-orientation"
      id="cb-orientation"
      aria-labelledby="cb-orientation-title"
    >
      <h2 id="cb-orientation-title" tabIndex={-1}>
        What the page covers
      </h2>
      <p>
        {records.length} records in {collection.sections.length} sections, dated{' '}
        {collection.period.from} to {collection.period.to}, with{' '}
        {figures.length} figures and {stated.length} stated dates.{' '}
        {collection.bounds} The selection is not comprehensive.
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
                      {entityLabel(
                        props.repository.entities.get(claim.subject)!,
                      )}
                    </InspectLink>
                  </Fragment>
                );
              })}
            </p>
          </li>
        ))}
      </ul>
      <h3>How to read a record</h3>
      <dl className="fl-legend cb-legend">
        <div>
          <dt>Date</dt>
          <dd>
            The record’s own date, as stored, to the day, month or year the
            source gives, with its basis: an announcement, a publication, a
            signature or the date a text takes effect. A snapshot is one dated
            report of a state.
          </dd>
        </div>
        <div>
          <dt>Stage</dt>
          <dd>
            What the parties state: a plan, an announcement, a letter of intent,
            a term sheet, a commitment, a contract or a closing. A stage is
            never read as the next one.
          </dd>
        </div>
        <div>
          <dt>Figure</dt>
          <dd>
            The number and unit as the source words them, with its bound (up to,
            at least, about, more than) and what it measures. “Not stated” means
            the source does not say. Amounts show their scope: one transaction,
            one project or a programme.
          </dd>
        </div>
        <div>
          <dt>Stated dates</dt>
          <dd>
            Targets, deadlines and terms a party gave, with who gave them. They
            are listed apart from the timeline and never date a record.
          </dd>
        </div>
      </dl>
    </section>
  );
}

function Timeline({
  view,
  ...props
}: Omit<ClaimProps, 'repository'> & { view: ComputeBuildoutView }) {
  const tags = new Map(view.collection.sections.map((s) => [s.id, s.tag]));
  const years = [...new Set(view.timeline.map((r) => r.date!.slice(0, 4)))];
  return (
    <section
      className="fl-timeline"
      id="cb-timeline"
      aria-labelledby="cb-timeline-title"
    >
      <h2 id="cb-timeline-title" tabIndex={-1}>
        Timeline
      </h2>
      <p className="small-note">
        One row per record, dated by the record itself. Announcements are
        labelled as announcements. Targets and deadlines are not rows; they are
        listed under “Stated dates”. The order of rows records no cause or
        influence.
      </p>
      {years.map((year) => (
        <div className="fl-year" key={year}>
          <h3>{year}</h3>
          <ol className="fl-rows">
            {view.timeline
              .filter((r) => r.date!.startsWith(year))
              .map((r) => (
                <li
                  key={r.claim.id}
                  className={`fl-row cb-row cb-row-${r.sectionId}`}
                  data-section={r.sectionId}
                >
                  <span className="fl-row-date">
                    <time dateTime={r.date!}>{r.date}</time>
                    {dateMeta(r) && (
                      <span className="fl-row-kind">{dateMeta(r)}</span>
                    )}
                  </span>
                  <span className="fl-row-body">
                    <span className="fl-row-label">
                      {recordHeading(r)}
                      {r.announcement && (
                        <span className="fl-tag cb-announcement">
                          Announcement
                        </span>
                      )}
                      <span className="fl-tag">{tags.get(r.sectionId)}</span>
                    </span>
                    <span className="cb-row-statement" data-record-text="">
                      {r.claim.statement}
                    </span>
                    <span className="fl-row-records">
                      {r.parties.join(' · ')}{' '}
                      <InspectLink
                        claim={r.claim}
                        label={`Inspect: ${r.claim.statement}`}
                        selectedClaimId={props.selectedClaimId}
                        onClaim={props.onClaim}
                      >
                        Inspect record
                      </InspectLink>
                    </span>
                  </span>
                </li>
              ))}
          </ol>
        </div>
      ))}
    </section>
  );
}

function Stated({
  view,
  onClaim,
}: {
  view: ComputeBuildoutView;
  onClaim: (id: string) => void;
}) {
  const yearOf = (d: ComputeStatedDate) =>
    d.date ? d.date.slice(0, 4) : 'No year stated';
  const years = [...new Set(view.stated.map(yearOf))];
  return (
    <section
      className="fl-timeline cb-stated-list"
      id="cb-stated"
      aria-labelledby="cb-stated-title"
    >
      <h2 id="cb-stated-title" tabIndex={-1}>
        Stated dates: targets, deadlines and terms
      </h2>
      <p className="small-note">
        {view.stated.length} dates that parties gave for something they expected
        or required, grouped by the year stated. Each is shown in the source’s
        words where a date cannot express them (“mid-2027”). A stated date
        records what was said on the record’s own date. It is not an event, and
        it does not show that the target was met.
      </p>
      {years.map((year) => (
        <div className="fl-year" key={year}>
          <h3>{year}</h3>
          <ul className="cb-stated-rows">
            {view.stated
              .filter((d) => yearOf(d) === year)
              .map((d) => (
                <li key={d.key}>
                  <span className="cb-stated-when" data-record-text="">
                    {statedText(d)}
                  </span>{' '}
                  <span className="cb-stated-kind">
                    {d.kind} · {d.statedBy}
                    {d.claim.time.kind !== 'unknown' &&
                      d.claim.time.kind !== 'interval' &&
                      `, ${d.claim.time.date}`}
                  </span>{' '}
                  <ClaimLink
                    secondary
                    className="doc-inspect"
                    claimId={d.claim.id}
                    onOpen={() => onClaim(d.claim.id)}
                    aria-label={`Inspect: ${d.claim.statement}`}
                  >
                    Record
                    <span aria-hidden="true"> ↗</span>
                  </ClaimLink>
                  {d.note && (
                    <span className="cb-stated-note" data-record-text="">
                      {d.note}
                    </span>
                  )}
                </li>
              ))}
          </ul>
        </div>
      ))}
    </section>
  );
}

function NotCovered({
  view,
  repository,
  onClaim,
}: {
  view: ComputeBuildoutView;
  repository: Repository;
  onClaim: (id: string) => void;
}) {
  const categories = Object.keys(computeNotCoveredLabels) as Array<
    keyof typeof computeNotCoveredLabels
  >;
  return (
    <section
      className="fl-not-covered"
      id="cb-not-covered"
      aria-labelledby="cb-not-covered-title"
    >
      <h2 id="cb-not-covered-title" tabIndex={-1}>
        Not covered
      </h2>
      <p className="small-note">
        Subjects outside the page’s bounds, records held at admission, sources
        that could not be retrieved and how figures were coded, from the
        admission records of 30 October 2026. A gap is not a finding that
        something did not happen.
      </p>
      {categories.map((category) => {
        const items = view.collection.notCovered.filter(
          (n) => n.category === category,
        );
        if (!items.length) return null;
        return (
          <div className="fl-block" key={category}>
            <h3>{computeNotCoveredLabels[category]}</h3>
            <ul>
              {items.map((n) => (
                <li key={n.id}>
                  {n.text}
                  {n.claimIds.length > 0 && (
                    <span className="doc-question-records">
                      {' '}
                      Records:{' '}
                      {n.claimIds.map((id, i) => {
                        const claim = repository.claims.get(id)!;
                        return (
                          <span key={id}>
                            {i > 0 && ' · '}
                            <ClaimLink
                              secondary
                              className="text-button"
                              claimId={id}
                              onOpen={() => onClaim(id)}
                              aria-label={`Inspect: ${claim.statement}`}
                            >
                              {entityLabel(
                                repository.entities.get(claim.subject)!,
                              )}
                            </ClaimLink>
                          </span>
                        );
                      })}
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

export function ComputeBuildout({
  view,
  repository,
  selectedClaimId,
  onClaim,
  onPropositions,
}: {
  view: ComputeBuildoutView;
  repository: Repository;
  selectedClaimId: string | null;
  onClaim: (id: string) => void;
  onPropositions: (id: string) => void;
}) {
  const { collection, sections, records, stated } = view;
  const props = { repository, selectedClaimId, onClaim };
  const toc = [
    ['cb-orientation-title', 'What the page covers'],
    ['cb-timeline-title', 'Timeline'],
    ['cb-stated-title', 'Stated dates'],
    ...sections.map((s) => ['cb-section-' + s.id, s.title]),
    ['cb-not-covered-title', 'Not covered'],
  ];
  const orbitHref = referencePath({
    kind: 'propositions',
    id: collection.orbit.collectionId,
  });
  return (
    <article
      className="doc-history fl-page cb-page"
      aria-label={collection.title}
    >
      <header className="doc-lede">
        <span className="eyebrow">
          Guided reading · {records.length} records · {stated.length} stated
          dates
        </span>
        <h1>{collection.title}</h1>
        <p className="landing-deck">{collection.question}</p>
        <div className="doc-actions">
          <StarterDownload
            data={repository.data}
            name={`${collection.id}-v${collection.version}-starter`}
            description="The timeline, the stated dates, every record by section with its stage and figures, and the list of what is not covered, with evidence locations, qualifications, source references, stored paraphrases and permitted short quotes. Figures are listed one by one and never added up. Original documents are not included."
            build={async () => {
              const starter = await computeBuildoutStarter(
                repository.data,
                collection,
              );
              return {
                md: computeBuildoutStarterMarkdown(starter),
                json: starterJson(starter),
                sources: starter.sources,
              };
            }}
          />
          <CopyLink
            target={{ kind: 'guide', id: collection.id }}
            label="Copy link to this page"
          />
        </div>
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
      <Stated view={view} onClaim={onClaim} />
      {sections.map((section) => (
        <section
          key={section.id}
          className="doc-family fl-section cb-section"
          aria-labelledby={'cb-section-' + section.id}
        >
          <h2 id={'cb-section-' + section.id} tabIndex={-1}>
            {section.title}
          </h2>
          {section.note && <p className="doc-family-note">{section.note}</p>}
          {section.id === collection.orbit.sectionId && (
            <div className="cb-orbit">
              <p>{collection.orbit.text}</p>
              <p>
                <NavLink
                  className="landing-action"
                  href={orbitHref}
                  onOpen={() => onPropositions(collection.orbit.collectionId)}
                >
                  Read the arguments about compute in orbit →
                </NavLink>
              </p>
            </div>
          )}
          {section.groups.map((group) => (
            <div className="fl-block cb-group" key={group.id}>
              <h3>
                {group.heading}{' '}
                <span className="small-note">
                  · {group.records.length}{' '}
                  {group.records.length === 1 ? 'record' : 'records'}
                </span>
              </h3>
              <ul className="record-rows">
                {group.records.map((r) => (
                  <ClaimRow
                    key={r.claim.id}
                    claim={r.claim}
                    {...props}
                    heading={
                      <>
                        {recordHeading(r)}
                        {r.announcement &&
                          r.stage !== 'announced' &&
                          ' · announcement'}
                      </>
                    }
                    excerpt={
                      (r.figures.length > 0 || r.statedDates.length > 0) && (
                        <span className="cb-excerpt">
                          {r.figures.length > 0 && (
                            <Figures figures={r.figures} />
                          )}
                          {r.statedDates.length > 0 && (
                            <StatedDates dates={r.statedDates} />
                          )}
                        </span>
                      )
                    }
                  />
                ))}
              </ul>
            </div>
          ))}
        </section>
      ))}
      <NotCovered view={view} repository={repository} onClaim={onClaim} />
    </article>
  );
}
