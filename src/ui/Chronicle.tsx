import { useMemo, type ReactNode } from 'react';
import type { Dataset } from '../domain/schema';
import type { Topic } from '../domain/predicates';
import type { Claim } from '../domain/schema';
import { referencePath } from '../domain/addresses';
import { derivationLabels, resolutionLabels } from '../domain/epistemics';
import {
  chronicleTopicLabels,
  dateRoleLabels,
  precisionLabels,
  yearPageId,
  yearTopics,
  yearTotal,
  yearView,
  type ChronicleEntry,
  type ChronicleIndex,
  type ChronicleStated,
  type YearView,
} from '../domain/chronicle';
import { chronicleText } from '../reading/chronicle';
import { ClaimLink, NavLink, RecordLink } from './NavLink';
import './chronicle.css';

type Handlers = {
  selectedClaimId: string | null;
  onClaim: (id: string) => void;
  /** Opens a claim's own page. */
  onClaimPage: (id: string) => void;
  onEntity: (id: string) => void;
  /** Opens a chronicle page: a year page's id, or null for the index. */
  onYear: (id: string | null) => void;
  /** Opens a propositions collection at one record. */
  onCollectionRow: (collectionId: string, claimId: string) => void;
};

const yearHref = (id: string) => referencePath({ kind: 'year', id });
const indexHref = referencePath({ kind: 'years' });

/** A year page, or with no view, the index of the years. */
export function Chronicle({
  page,
  data,
  index,
  ...handlers
}: Handlers & {
  /** The year page's year and topic; null for the index. */
  page: { year: number; topic: Topic | null } | null;
  data: Dataset;
  index: ChronicleIndex;
}) {
  const year = page?.year;
  const topic = page?.topic ?? null;
  const view = useMemo(
    () => (year ? yearView(data, year, topic) : null),
    [data, year, topic],
  );
  return view ? (
    <YearPage view={view} {...handlers} />
  ) : (
    <YearsIndex index={index} onYear={handlers.onYear} />
  );
}

function YearsIndex({
  index,
  onYear,
}: {
  index: ChronicleIndex;
  onYear: (id: string | null) => void;
}) {
  const decades = new Map<number, ChronicleIndex['years']>();
  for (const y of index.years) {
    const decade = y.year - (y.year % 10);
    decades.set(decade, [...(decades.get(decade) ?? []), y]);
  }
  return (
    <article className="chronicle" aria-labelledby="chronicle-title">
      <header className="doc-lede">
        <span className="eyebrow">Chronicle</span>
        <h1 id="chronicle-title">{chronicleText.indexTitle}</h1>
        <p className="doc-intro">{chronicleText.indexLede}</p>
        <p className="chronicle-selective">
          Selective: what the records hold, not a history of any year.
        </p>
        <details className="chronicle-limits">
          <summary>{chronicleText.indexLimitsHeading}</summary>
          <ul>
            {chronicleText.indexLimits.map((limit) => (
              <li key={limit}>{limit}</li>
            ))}
          </ul>
        </details>
      </header>
      {[...decades].map(([decade, years]) => (
        <section
          key={decade}
          className="chronicle-decade"
          aria-labelledby={`decade-${decade}`}
        >
          <h2 id={`decade-${decade}`}>{decade}s</h2>
          <ul className="chronicle-years">
            {years.map((y) => {
              const total = yearTotal(y);
              return (
                <li key={y.year}>
                  <NavLink
                    className="chronicle-year-link"
                    href={yearHref(String(y.year))}
                    onOpen={() => onYear(String(y.year))}
                  >
                    {y.year}
                  </NavLink>{' '}
                  <span className="chronicle-year-counts">
                    {total
                      ? `${total} ${total === 1 ? 'record' : 'records'}`
                      : 'No dated records'}
                    {y.stated
                      ? ` · ${y.stated} ${y.stated === 1 ? 'stated date' : 'stated dates'}`
                      : ''}
                    {total > 0 && (
                      <span className="chronicle-year-topics">
                        {yearTopics(y)
                          .map(
                            (t) => `${chronicleTopicLabels[t]} ${y.topics[t]}`,
                          )
                          .join(' · ')}
                      </span>
                    )}
                  </span>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </article>
  );
}

function YearPage({ view, ...handlers }: Handlers & { view: YearView }) {
  const { year, topic, summary } = view;
  const headingId = 'chronicle-title';
  return (
    <article className="chronicle" aria-labelledby={headingId}>
      <header className="doc-lede">
        <span className="eyebrow">
          <NavLink
            className="text-button"
            href={indexHref}
            onOpen={() => handlers.onYear(null)}
          >
            Chronicle
          </NavLink>{' '}
          ·{' '}
          {view.total
            ? `Records dated ${year}`
            : chronicleText.statedOnlyTitle(year)}
        </span>
        <h1 id={headingId}>
          {year}
          {topic && `: ${chronicleTopicLabels[topic].toLowerCase()}`}
        </h1>
        <p className="doc-intro">
          {view.total
            ? chronicleText.lede(summary, topic, view.stated.length)
            : chronicleText.noRecords(year)}
        </p>
        <p className="chronicle-selective">{chronicleText.selective}</p>
        <details className="chronicle-limits">
          <summary>{chronicleText.limitsHeading}</summary>
          <ul>
            {chronicleText.limits.map((text) => (
              <li key={text}>{text}</li>
            ))}
          </ul>
        </details>
        <nav className="chronicle-steps" aria-label="Years">
          {view.previous !== null && (
            <NavLink
              className="text-button"
              href={yearHref(String(view.previous))}
              onOpen={() => handlers.onYear(String(view.previous))}
            >
              ← {view.previous}
            </NavLink>
          )}
          <NavLink
            className="text-button"
            href={indexHref}
            onOpen={() => handlers.onYear(null)}
          >
            All years
          </NavLink>
          {view.next !== null && (
            <NavLink
              className="text-button"
              href={yearHref(String(view.next))}
              onOpen={() => handlers.onYear(String(view.next))}
            >
              {view.next} →
            </NavLink>
          )}
        </nav>
        {view.topics.length > 1 && (
          <nav className="chronicle-topics" aria-label="Topics">
            <span className="chronicle-topics-label">Show:</span>
            <ul>
              <TopicLink
                current={!topic}
                id={yearPageId(year)}
                onYear={handlers.onYear}
              >
                All topics ({view.total})
              </TopicLink>
              {view.topics.map((t) => (
                <TopicLink
                  key={t}
                  current={topic === t}
                  id={yearPageId(year, t)}
                  onYear={handlers.onYear}
                >
                  {chronicleTopicLabels[t]} ({summary.topics[t]})
                </TopicLink>
              ))}
            </ul>
          </nav>
        )}
      </header>
      {view.sections.map((section) => (
        <section
          key={section.topic}
          className="chronicle-topic"
          aria-labelledby={`topic-${section.topic}`}
        >
          <h2 id={`topic-${section.topic}`}>
            {section.label}{' '}
            <span className="chronicle-count">
              {section.records} {section.records === 1 ? 'record' : 'records'}
            </span>
          </h2>
          {section.months.map((month) => (
            <section
              key={month.id}
              className="chronicle-month"
              aria-labelledby={`${section.topic}-${month.id}`}
            >
              <h3 id={`${section.topic}-${month.id}`}>{month.heading}</h3>
              <ol className="chronicle-entries">
                {month.entries.map((entry) => (
                  <Entry key={entry.key} entry={entry} {...handlers} />
                ))}
              </ol>
            </section>
          ))}
        </section>
      ))}
      {view.stated.length > 0 && (
        <section
          className="chronicle-stated"
          aria-labelledby="chronicle-stated"
        >
          <h2 id="chronicle-stated">
            {chronicleText.statedHeading(year)}{' '}
            <span className="chronicle-count">
              {view.stated.length} {view.stated.length === 1 ? 'date' : 'dates'}
            </span>
          </h2>
          <p className="chronicle-note">{chronicleText.statedNote}</p>
          <ol className="chronicle-entries">
            {view.stated.map((s) => (
              <Stated key={s.key} stated={s} {...handlers} />
            ))}
          </ol>
        </section>
      )}
    </article>
  );
}

/** An entry's date as stored, and an interval's end within the year. */
function When({ entry }: { entry: ChronicleEntry }) {
  return (
    <>
      <time dateTime={entry.date}>{entry.date}</time>
      {entry.until && (
        <>
          {' → '}
          <time dateTime={entry.until}>{entry.until}</time>
        </>
      )}
    </>
  );
}

function TopicLink({
  current,
  id,
  onYear,
  children,
}: {
  current: boolean;
  id: string;
  onYear: (id: string) => void;
  children: ReactNode;
}) {
  return (
    <li>
      <NavLink
        className="chronicle-topic-link"
        href={yearHref(id)}
        aria-current={current ? 'page' : undefined}
        onOpen={() => onYear(id)}
      >
        {children}
      </NavLink>
    </li>
  );
}

/** The record's resolution where it is not settled, and how it was derived. */
function Status({ claim }: { claim: Claim }) {
  return (
    <>
      {claim.resolution !== 'supported' && (
        <span className={`claim-status claim-status-${claim.resolution}`}>
          {resolutionLabels[claim.resolution]}
        </span>
      )}
      {claim.derivation !== 'explicit' && (
        <span className="chronicle-derivation">
          {derivationLabels[claim.derivation]}
        </span>
      )}
    </>
  );
}

function Entry({ entry, ...handlers }: Handlers & { entry: ChronicleEntry }) {
  const { selectedClaimId, onClaim, onEntity } = handlers;
  const subject = entry.subject;
  const meta = [
    dateRoleLabels[entry.role],
    precisionLabels[entry.precision],
    ...(entry.kind === 'record' && entry.stage ? [entry.stage] : []),
  ].join(' · ');
  if (entry.kind === 'provisions')
    return (
      <li className="chronicle-entry chronicle-provisions">
        <p className="chronicle-date">
          <When entry={entry} /> · {meta}
        </p>
        <p className="chronicle-statement">
          {entry.claims.length}{' '}
          {entry.claims.length === 1 ? 'provision record' : 'provision records'}{' '}
          of <span data-record-text="">{subject.name}</span>
        </p>
        <p className="chronicle-links">
          <RecordLink
            className="text-button"
            id={subject.id}
            onOpen={() => onEntity(subject.id)}
          >
            Read them on the document’s page →
          </RecordLink>
        </p>
      </li>
    );
  const { claim } = entry;
  return (
    <li className="chronicle-entry">
      <p className="chronicle-date">
        <When entry={entry} /> · {meta} <Status claim={claim} />
      </p>
      <ClaimLink
        className="chronicle-statement"
        claimId={claim.id}
        pressed={selectedClaimId === claim.id}
        aria-label={`Inspect claim & evidence: ${claim.statement}`}
        onOpen={() => onClaim(claim.id)}
      >
        <span data-record-text="">{claim.statement}</span>
        <span className="chronicle-evidence"> Evidence ↗</span>
      </ClaimLink>
      {entry.marks.length > 0 && (
        <ul className="chronicle-marks">
          {entry.marks.map((mark) => (
            <li key={mark.collectionId + mark.text}>
              <NavLink
                className="text-button"
                href={referencePath({
                  kind: 'propositions',
                  id: mark.collectionId,
                  inspect: mark.claimId,
                })}
                onOpen={() =>
                  handlers.onCollectionRow(mark.collectionId, mark.claimId)
                }
              >
                <span data-record-text="">{mark.text}</span> →
              </NavLink>
            </li>
          ))}
        </ul>
      )}
      <p className="chronicle-links">
        <RecordLink
          className="text-button"
          id={subject.id}
          onOpen={() => onEntity(subject.id)}
        >
          <span data-record-text="">{subject.shortName ?? subject.name}</span> →
        </RecordLink>
        <NavLink
          className="text-button"
          href={referencePath({ kind: 'claim', id: claim.id })}
          aria-label={`Claim page: ${claim.statement}`}
          onOpen={() => handlers.onClaimPage(claim.id)}
        >
          Claim page →
        </NavLink>
      </p>
    </li>
  );
}

function Stated({
  stated,
  ...handlers
}: Handlers & { stated: ChronicleStated }) {
  const { claim } = stated;
  return (
    <li className="chronicle-entry chronicle-stated-entry">
      <p className="chronicle-date">
        {stated.date ? <time dateTime={stated.date}>{stated.date}</time> : null}
        {stated.wording ? (
          <>
            {' '}
            (as worded: “<span data-record-text="">{stated.wording}</span>”)
          </>
        ) : null}{' '}
        · {stated.label}
        {stated.statedBy && (
          <>
            {' '}
            · stated by{' '}
            <span data-record-text="">
              {stated.statedBy.shortName ?? stated.statedBy.name}
            </span>
          </>
        )}{' '}
        <Status claim={claim} />
      </p>
      <ClaimLink
        className="chronicle-statement"
        claimId={claim.id}
        pressed={handlers.selectedClaimId === claim.id}
        aria-label={`Inspect claim & evidence: ${claim.statement}`}
        onOpen={() => handlers.onClaim(claim.id)}
      >
        <span data-record-text="">{claim.statement}</span>
        <span className="chronicle-evidence"> Evidence ↗</span>
      </ClaimLink>
      <p className="chronicle-links">
        <NavLink
          className="text-button"
          href={referencePath({ kind: 'claim', id: claim.id })}
          aria-label={`Claim page: ${claim.statement}`}
          onOpen={() => handlers.onClaimPage(claim.id)}
        >
          Claim page →
        </NavLink>
      </p>
    </li>
  );
}
