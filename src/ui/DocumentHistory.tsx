import {
  Fragment,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from 'react';
import type { Repository } from '../domain/repository';
import {
  editionAnchorDate,
  editionGapText,
  editionTimeline,
  provisionKindLabels,
  type DocumentHistory as History,
  type EditionHistory,
  type FamilyHistory,
} from '../domain/document-history';
import { CopyLink, ExportStarter } from './ReferenceActions';
import {
  ClaimRow,
  InspectLink,
  ProvisionRow,
  StatusBadge,
  claimRoute,
  provisionHeading,
  type ClaimProps,
} from './ReadingRows';
import { ArchiveLink, SourceLanguage } from './SourceArchive';
import { nonEnglishLanguage } from '../domain/source-archive';
import { NavLink } from './NavLink';
import { referencePath } from '../domain/addresses';
import { frameworkComparison } from '../reading/framework-comparison';
import './reading-first.css';

const timelineYears = [2023, 2024, 2025, 2026];
/** Narrowest track width, in pixels, the lane layout is computed for. */
const trackMinWidth = 300;

const markLabel = (label: string) => label.replace(/ edition$/, '');

/**
 * Greedy lanes so close editions never overlap at the narrowest track width.
 * A label that would run past the end of the track is drawn leftwards.
 */
function layoutMarks(marks: { position: number; label: string }[]) {
  const lanes: [number, number][][] = [];
  return marks.map((m) => {
    const width = (markLabel(m.label).length * 7 + 18) / trackMinWidth;
    const flipped = m.position + width > 1;
    const span: [number, number] = flipped
      ? [m.position - width, m.position]
      : [m.position, m.position + width];
    let lane = lanes.findIndex((taken) =>
      taken.every(([start, end]) => span[1] <= start || span[0] >= end),
    );
    if (lane < 0) lane = lanes.push([]) - 1;
    lanes[lane].push(span);
    return { lane, flipped };
  });
}

function jumpTo(id: string) {
  const target = document.getElementById(id);
  if (!target) return;
  target.scrollIntoView({ block: 'start' });
  target.focus({ preventScroll: true });
}

function Edition({
  edition,
  first,
  ...props
}: ClaimProps & { edition: EditionHistory; first: boolean }) {
  const { repository } = props;
  const entity = edition.entity;
  const v = entity.documentVersion!;
  const anchor = editionAnchorDate(entity);
  const replacedLabels = edition.replaces.map((c) =>
    c.object.kind === 'entity'
      ? (repository.entities.get(c.object.entityId)!.documentVersion?.label ??
        repository.entities.get(c.object.entityId)!.name)
      : '',
  );
  const dates = [
    ['Effective', v.effectiveAt],
    ['Revised', v.revisedAt],
    ['Published', v.publishedAt],
  ] as const;
  const shownDates = dates.filter(([, date]) => date);
  const others = [...edition.applies, ...edition.credits];
  const links = edition.commitmentLinks;
  return (
    <li className="doc-edition" data-edition={entity.id}>
      <h3 id={'edition-' + entity.id} tabIndex={-1}>
        <span className="doc-edition-label">{v.label}</span>
        <span className="doc-edition-name">{entity.name}</span>
      </h3>
      <p className="doc-meta">
        {edition.issued.length ? (
          edition.issued.map((claim, i) => (
            <InspectLink
              key={claim.id}
              claim={claim}
              label={`Inspect issue record: ${claim.statement}`}
              {...props}
            >
              {i === 0
                ? shownDates
                    .map(([kind, date]) => `${kind} ${date}`)
                    .join(' · ')
                : 'Issue record'}
            </InspectLink>
          ))
        ) : (
          <span>
            {shownDates.map(([kind, date]) => `${kind} ${date}`).join(' · ')}
          </span>
        )}
        {!v.publishedAt && (
          <span className="doc-unknown">publication day not established</span>
        )}
        {edition.sources.map((s) => (
          <Fragment key={s.id}>
            <a href={s.evidenceUrl} target="_blank" rel="noreferrer">
              Exact edition text
              <span className="visually-hidden">: {s.title}</span>
              <span aria-hidden="true"> ↗</span>
            </a>
            {s.archivedUrl && <ArchiveLink source={s} />}
            {nonEnglishLanguage(s) && <SourceLanguage source={s} />}
          </Fragment>
        ))}
        {edition.replaces.map((claim, i) => (
          <InspectLink
            key={claim.id}
            claim={claim}
            label={`Inspect replacement record: ${claim.statement}`}
            {...props}
          >
            Replaces {replacedLabels[i]}
            {claim.resolution !== 'supported' &&
              ` (${claim.resolution === 'contested' ? 'contested' : 'unresolved'})`}
          </InspectLink>
        ))}
        {!first && !edition.replaces.length && (
          <span className="doc-unknown">replacement not recorded</span>
        )}
      </p>
      {!first && (
        <div className="doc-changes">
          <h4>
            {edition.replaces.length
              ? `Recorded changes from ${replacedLabels.join(', ')}`
              : 'Recorded changes'}
          </h4>
          {edition.changes.length > 0 && (
            <ul>
              {edition.changes.map((claim) => (
                <ClaimRow
                  key={claim.id}
                  claim={claim}
                  heading={provisionHeading(claim, repository)}
                  {...props}
                />
              ))}
            </ul>
          )}
          {edition.gaps.map((gap) => (
            <p className="doc-gap" key={gap}>
              <strong>Coverage gap.</strong> {editionGapText[gap]}
            </p>
          ))}
        </div>
      )}
      {first && (
        <p className="doc-first">
          Earliest edition of this framework recorded here.
        </p>
      )}
      {(edition.provisions.length > 0 || edition.absences.length > 0) && (
        <details className="doc-provisions">
          <summary>
            Provisions · {edition.provisions.length} quoted
            {edition.absences.length > 0 &&
              ` · ${edition.absences.length} not found`}
            {edition.assessments.length > 0 &&
              ` · ${edition.assessments.length} disputed assessment${edition.assessments.length === 1 ? '' : 's'}`}
          </summary>
          <ul className="record-rows provision-rows">
            {[
              ...edition.provisions,
              ...edition.assessments,
              ...edition.absences,
            ].map((claim) => (
              <ProvisionRow key={claim.id} claim={claim} {...props} />
            ))}
          </ul>
        </details>
      )}
      {links.length > 0 && (
        <div className="doc-changes doc-commitment-links">
          <h4>Links itself to external commitments or laws</h4>
          <ul>
            {links.map((claim) => (
              <ClaimRow key={claim.id} claim={claim} {...props} />
            ))}
          </ul>
        </div>
      )}
      <details className="doc-more">
        <summary>Date basis{others.length ? ' and other records' : ''}</summary>
        <p className="small-note">
          {anchor
            ? `Placed on the timeline by its ${anchor.kind} date. `
            : 'No date is established for this edition. '}
          {v.dateNote}
        </p>
        {others.length > 0 && (
          <ul className="doc-other">
            {others.map((claim) => (
              <ClaimRow key={claim.id} claim={claim} {...props} />
            ))}
          </ul>
        )}
      </details>
    </li>
  );
}

function Timeline({ history }: { history: History }) {
  const rows = editionTimeline(
    history,
    timelineYears[0],
    timelineYears.at(-1)!,
  );
  const yearAt = (i: number) =>
    ({ '--at': i / timelineYears.length }) as CSSProperties;
  return (
    <section className="doc-timeline" aria-labelledby="doc-timeline-title">
      <h2 id="doc-timeline-title">Editions, 2023–2026</h2>
      <p className="small-note">
        Each mark is one edition, placed at its effective date, or at its
        revision or publication date where no effective date is known. Select a
        framework or an edition to read it.
      </p>
      <div className="timeline-axis" aria-hidden="true">
        <div />
        <div>
          {timelineYears.map((year, i) => (
            <span key={year} style={yearAt(i)}>
              {year}
            </span>
          ))}
        </div>
      </div>
      {rows.map((row) => {
        const layout = layoutMarks(row.marks);
        const laneCount = Math.max(1, ...layout.map((l) => l.lane + 1));
        return (
          <div className="timeline-row" key={row.family}>
            <button
              className="timeline-family"
              onClick={() => jumpTo('family-heading-' + row.family)}
            >
              {row.label}
            </button>
            <div className="timeline-track-wrap">
              {timelineYears.map((year, i) => (
                <span
                  key={year}
                  className="timeline-grid"
                  style={yearAt(i)}
                  aria-hidden="true"
                />
              ))}
              <ol
                className="timeline-track"
                aria-label={row.label + ' editions'}
                style={{ '--lanes': laneCount } as CSSProperties}
              >
                {row.marks.map((mark, i) => (
                  <li
                    key={mark.id}
                    className={layout[i].flipped ? 'is-flipped' : undefined}
                    style={
                      {
                        '--at': mark.position,
                        '--lane': layout[i].lane,
                      } as CSSProperties
                    }
                  >
                    <button
                      aria-label={`${mark.label}, ${mark.kind} ${mark.date}`}
                      onClick={() => jumpTo('edition-' + mark.id)}
                    >
                      {markLabel(mark.label)}
                    </button>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        );
      })}
    </section>
  );
}

/**
 * Which provision grids the reader has opened during this visit, so a grid
 * stays open after navigating away and back. Nothing is stored in the browser.
 */
const openGrids = new Set<string>();

/**
 * Provision keys against editions: which edition states each keyed provision,
 * where an absence was recorded within an inspected scope, and where nothing
 * is recorded. Cells link to the stored claims; nothing is inferred.
 */
function ProvisionAlignment({
  family,
  ...props
}: ClaimProps & { family: FamilyHistory }) {
  const [open, setOpen] = useState(() => openGrids.has(family.family));
  const scroller = useRef<HTMLDivElement>(null);
  const [clipped, setClipped] = useState(false);
  useEffect(() => {
    const element = scroller.current;
    if (!open || !element) return;
    const measure = () =>
      setClipped(element.scrollWidth > element.clientWidth + 1);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, [open]);
  if (!family.provisionKeys.length) return null;
  return (
    <details
      className="doc-alignment"
      open={open}
      onToggle={(event) => {
        const now = event.currentTarget.open;
        if (now) openGrids.add(family.family);
        else openGrids.delete(family.family);
        setOpen(now);
      }}
    >
      <summary>
        Provisions across editions · {family.provisionKeys.length} tracked
        provision{family.provisionKeys.length === 1 ? '' : 's'}
      </summary>
      <p className="small-note">
        “Stated” means the edition’s quoted text contains the provision. “Not
        found” means it was not found in the inspected part of the edition,
        which is not a claim that it was deleted. A dash means nothing is
        recorded for that edition.
      </p>
      {clipped && (
        <p className="doc-alignment-cue" aria-hidden="true">
          Scroll sideways to see all {family.editions.length} editions →
        </p>
      )}
      <div
        className="doc-alignment-scroll"
        ref={scroller}
        role="region"
        aria-label={`${family.label}: provisions across editions`}
        tabIndex={0}
      >
        <table>
          <thead>
            <tr>
              <th scope="col">Provision</th>
              {family.editions.map((e) => (
                <th scope="col" key={e.entity.id}>
                  {e.entity.documentVersion!.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {family.provisionKeys.map((row) => (
              <tr key={row.key}>
                <th scope="row">
                  <span className="provision-kind">
                    {provisionKindLabels[row.kind]}
                  </span>{' '}
                  {row.wordings.length > 1 ? (
                    // The editions word it differently: each wording is
                    // shown with the editions it comes from.
                    <span className="provision-wordings">
                      {row.wordings.map((w) => (
                        <span key={w.label}>
                          <span className="provision-wording-editions">
                            {w.editionIds
                              .map(
                                (id) =>
                                  props.repository.entities.get(id)!
                                    .documentVersion!.label,
                              )
                              .join(', ')}
                            :
                          </span>{' '}
                          {w.label}
                        </span>
                      ))}
                    </span>
                  ) : (
                    (row.wordings[0]?.label ?? row.label)
                  )}
                </th>
                {row.editions.map((cell) => {
                  const claim = cell.stated ?? cell.absent;
                  const edition = props.repository.entities.get(
                    cell.editionId,
                  )!;
                  return (
                    <td key={cell.editionId}>
                      {claim ? (
                        <InspectLink
                          claim={claim}
                          label={`${cell.stated ? 'Stated' : 'Not found'} in ${edition.documentVersion!.label}: ${claim.statement}`}
                          {...props}
                        >
                          {cell.stated ? 'Stated' : 'Not found'}
                        </InspectLink>
                      ) : (
                        <span className="doc-unknown" aria-label="Not recorded">
                          –
                        </span>
                      )}
                      {claim && <StatusBadge claim={claim} />}
                      {cell.assessed.map((a) => (
                        <InspectLink
                          key={a.id}
                          claim={a}
                          label={`Disputed assessment of this provision: ${a.statement}`}
                          {...props}
                        >
                          {' '}
                          · assessed <StatusBadge claim={a} />
                        </InspectLink>
                      ))}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </details>
  );
}

export function DocumentHistory({
  history,
  repository,
  selectedClaimId,
  onClaim,
  onCompare,
}: {
  history: History;
  repository: Repository;
  selectedClaimId: string | null;
  onClaim: (id: string) => void;
  /** Opens the comparison of the same frameworks across developers. */
  onCompare?: () => void;
}) {
  const { collection, families } = history;
  const editions = families.reduce((n, f) => n + f.editions.length, 0);
  const publishers = [...new Set(families.map((f) => f.publisher.name))];
  const props = { repository, selectedClaimId, onClaim };
  return (
    <article className="doc-history" aria-label={collection.title}>
      <header className="doc-lede">
        <span className="eyebrow">
          Document history · {editions} editions · {families.length} frameworks
          · {publishers.join(', ')}
        </span>
        <h1>{collection.title}</h1>
        <p className="landing-deck">{collection.question}</p>
        <p className="doc-intro">{collection.introduction}</p>
        <p className="doc-status">
          A machine selected and arranged these records. No human review of the
          selection or framing is recorded.
        </p>
        <div className="doc-actions">
          <ExportStarter data={repository.data} collection={collection} />
          <CopyLink
            target={{ kind: 'documents', id: collection.id }}
            label="Copy link to this history"
          />
        </div>
        {onCompare && (
          <p className="doc-compare">
            <NavLink
              className="landing-action"
              href={referencePath({
                kind: 'compare',
                id: frameworkComparison.id,
              })}
              onOpen={onCompare}
            >
              Compare the frameworks question by question →
            </NavLink>
          </p>
        )}
      </header>
      <Timeline history={history} />
      <details className="doc-limits-box">
        <summary>Limits of this history</summary>
        <ul className="doc-limits">
          {collection.limits.map((limit) => (
            <li key={limit}>{limit}</li>
          ))}
        </ul>
      </details>
      {families.map((f) => (
        <section
          key={f.family}
          id={'family-' + f.family}
          className="doc-family"
          aria-labelledby={'family-heading-' + f.family}
        >
          <h2 id={'family-heading-' + f.family} tabIndex={-1}>
            {f.label}
          </h2>
          <p className="doc-family-note">
            Published by {f.publisher.name}. {f.editions.length} recorded
            edition{f.editions.length === 1 ? '' : 's'}, oldest first. An
            edition is shown as replacing another only where a record says so.
          </p>
          <ProvisionAlignment family={f} {...props} />
          <ol className="doc-editions">
            {f.editions.map((edition, index) => (
              <Edition
                key={edition.entity.id}
                edition={edition}
                first={index === 0}
                {...props}
              />
            ))}
          </ol>
          {f.openQuestions.length > 0 && (
            <div className="doc-questions">
              <h3>Open questions and source limits</h3>
              <ul>
                {f.openQuestions.map((q) => (
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
        </section>
      ))}
    </article>
  );
}
