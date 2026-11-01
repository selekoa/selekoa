import { Fragment } from 'react';
import type { Repository } from '../domain/repository';
import type { CellStatus } from '../domain/framework-comparison';
import { referencePath } from '../domain/addresses';
import {
  changesNotCoveredLabels,
  statusLabels,
  type FrameworkChangesCell,
  type FrameworkChangesFamily,
  type FrameworkChangesQuestion,
  type FrameworkChangesView,
} from '../domain/framework-changes';
import { ClaimLink, NavLink, RecordLink, SectionLink } from './NavLink';
import { CopyLink, ExportFrameworkChangesStarter } from './ReferenceActions';
import { ClaimRow, InspectLink, type ClaimProps } from './ReadingRows';
import { ArchiveLink } from './SourceArchive';
import { quoted } from './quote';
import { startHref } from './SiteChrome';
import { startIds } from './start-ids';
import './reading-first.css';
import './control-commitments.css';
import './framework-comparison.css';
import './frameworks-law.css';
import './framework-changes.css';

type PageProps = ClaimProps & {
  onEntity: (id: string) => void;
  /** Opens the comparison, at one question when given. */
  onCompare: (facet?: string) => void;
};

const shortStatus: Record<CellStatus, string> = {
  stated: 'Stated',
  partly: 'Partly',
  recorded: 'Recorded',
  'not-found': 'Not found',
  'not-checked': 'Not checked',
  'not-applicable': 'Does not apply',
};

const label = (cell: FrameworkChangesCell) =>
  cell.edition.documentVersion?.label ?? cell.edition.name;

/** The edition a record is about, by its short name. */
function recordName(id: string, repository: Repository) {
  const claim = repository.claims.get(id)!;
  const entity = repository.entities.get(claim.subject)!;
  return entity.shortName ?? entity.name;
}

const sectionId = (family: string) => 'fc-' + family;

/** "effective 2024-10-15": an edition's ordering date with its kind. */
function dateText(date: string | null, kind: string | null) {
  return date ? `${kind} ${date}` : 'date unknown';
}

/** One cell's status as a link that opens its record. */
function CellLink({
  cell,
  facetLabel,
  secondary,
  plain,
  children,
  selectedClaimId,
  onClaim,
}: Omit<ClaimProps, 'repository'> & {
  cell: FrameworkChangesCell;
  facetLabel: string;
  secondary?: boolean;
  /** An ordinary record link, without the status's border. */
  plain?: boolean;
  children?: React.ReactNode;
}) {
  const text = children ?? statusLabels[cell.status];
  if (!cell.claim)
    return (
      <span
        className={'fc-status fc-status-' + cell.status}
        title={cell.reason ?? undefined}
      >
        {text}
      </span>
    );
  return (
    <ClaimLink
      className={
        plain ? 'doc-inspect' : 'doc-inspect fc-status fc-status-' + cell.status
      }
      pressed={selectedClaimId === cell.claim.id}
      secondary={secondary}
      aria-label={`Inspect: ${label(cell)}, ${facetLabel}: ${statusLabels[cell.status]}`}
      claimId={cell.claim.id}
      onOpen={() => onClaim(cell.claim!.id)}
    >
      {text}
      <span aria-hidden="true"> ↗</span>
    </ClaimLink>
  );
}

/** What one edition's cell records: its passages with their pages. */
function CellPassages({ cell }: { cell: FrameworkChangesCell }) {
  if (cell.status === 'not-applicable' || cell.status === 'not-checked')
    return <p className="cmp-note">{cell.reason}</p>;
  if (!cell.passages.length)
    return (
      <p className="cmp-note">
        No passage meeting the criterion was found in the recorded search.
      </p>
    );
  return (
    <ul className="cmp-passages">
      {cell.passages.map((e) => (
        <li key={e.id}>
          {e.passageType === 'quote' ? (
            <blockquote data-record-text="">{quoted(e.passage)}</blockquote>
          ) : (
            <p className="cmp-paraphrase">
              <span className="cmp-paraphrase-label">Paraphrase: </span>
              <span data-record-text="">{e.passage}</span>
            </p>
          )}
          <p className="cmp-locator" data-record-text="">
            {e.locator}
          </p>
        </li>
      ))}
    </ul>
  );
}

function EditionTimeline({
  family,
  ...props
}: PageProps & { family: FrameworkChangesFamily }) {
  const { repository, onEntity } = props;
  return (
    <ol className="fc-editions" aria-label={`Editions of ${family.label}`}>
      {family.editions.map((e, i) => {
        const version = e.entity.documentVersion!;
        const stated = e.statedChanges;
        return (
          <li key={e.entity.id} className="fc-edition">
            <span className="fl-row-date">
              {e.date ? (
                <time dateTime={e.date}>{e.date}</time>
              ) : (
                'Date unknown'
              )}
              {e.kind && <span className="fl-row-kind">{e.kind}</span>}
            </span>
            <div className="fc-edition-body">
              <h4>
                <RecordLink
                  className="text-button"
                  id={e.entity.id}
                  onOpen={() => onEntity(e.entity.id)}
                >
                  {version.label}
                </RecordLink>
              </h4>
              {version.dateNote && (
                <p className="small-note" data-record-text="">
                  {version.dateNote}
                </p>
              )}
              <p className="doc-meta">
                {e.published.map((c) => (
                  <InspectLink
                    key={c.id}
                    claim={c}
                    label={`Inspect: ${c.statement}`}
                    selectedClaimId={props.selectedClaimId}
                    onClaim={props.onClaim}
                  >
                    Dated record
                  </InspectLink>
                ))}
                {e.replaces.map((c) => {
                  const earlier =
                    c.object.kind === 'entity'
                      ? repository.entities.get(c.object.entityId)
                      : undefined;
                  return (
                    <InspectLink
                      key={c.id}
                      claim={c}
                      label={`Inspect: ${c.statement}`}
                      selectedClaimId={props.selectedClaimId}
                      onClaim={props.onClaim}
                    >
                      Replaces{' '}
                      {earlier?.documentVersion?.label ?? earlier?.name}
                    </InspectLink>
                  );
                })}
                {i > 0 && !e.replaces.length && (
                  <span>No record says which edition it replaces</span>
                )}
                {e.sources.map((s) => (
                  <Fragment key={s.id}>
                    <a href={s.evidenceUrl} target="_blank" rel="noreferrer">
                      Exact text
                      <span className="visually-hidden">: {s.title}</span>
                      <span aria-hidden="true"> ↗</span>
                    </a>
                    {s.archivedUrl && <ArchiveLink source={s} />}
                  </Fragment>
                ))}
              </p>
              {i > 0 && (
                <details className="doc-provisions">
                  <summary>
                    Stated changes from the previous edition ·{' '}
                    {statusLabels[stated.status].toLowerCase()}
                  </summary>
                  <CellPassages cell={stated} />
                  <CellLink
                    cell={stated}
                    facetLabel="Stated changes from the previous edition"
                    secondary
                    selectedClaimId={props.selectedClaimId}
                    onClaim={props.onClaim}
                  >
                    Inspect the record
                  </CellLink>
                </details>
              )}
              {e.versionChanges.length > 0 && (
                <details className="doc-provisions">
                  <summary>
                    Changes from the earlier edition recorded by Selekoa ·{' '}
                    {e.versionChanges.length}
                  </summary>
                  <ul className="record-rows">
                    {e.versionChanges.map((c) => (
                      <ClaimRow key={c.id} claim={c} {...props} />
                    ))}
                  </ul>
                </details>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function StatusTable({
  family,
  view,
  ...props
}: PageProps & { family: FrameworkChangesFamily; view: FrameworkChangesView }) {
  return (
    <div className="doc-alignment-scroll">
      <table className="commit-table fc-status-table">
        <caption className="visually-hidden">
          Status of each comparison question in each edition of {family.label}
        </caption>
        <thead>
          <tr>
            <th scope="col">Question</th>
            {family.editions.map((e) => (
              <th scope="col" key={e.entity.id}>
                {e.entity.documentVersion!.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {view.dimensions.map((d) => (
            <Fragment key={d.id}>
              <tr className="fc-dimension-row">
                <th scope="colgroup" colSpan={family.editions.length + 1}>
                  {d.label}
                </th>
              </tr>
              {family.questions
                .filter((q) => q.facet.dimension.id === d.id)
                .map((q) => (
                  <tr key={q.facet.id}>
                    <th scope="row">
                      <SectionLink
                        className="text-button"
                        id={`fc-q-${family.family}-${q.facet.id}`}
                      >
                        {q.facet.label}
                      </SectionLink>
                    </th>
                    {q.cells.map((cell, i) => {
                      const differs =
                        i > 0 && q.steps[i - 1].difference === 'status';
                      return (
                        <td
                          key={cell.edition.id}
                          className={differs ? 'fc-differs' : undefined}
                        >
                          {differs && (
                            <span
                              className="fc-differs-mark"
                              aria-hidden="true"
                            >
                              ≠{' '}
                            </span>
                          )}
                          <CellLink
                            cell={cell}
                            facetLabel={q.facet.label}
                            selectedClaimId={props.selectedClaimId}
                            onClaim={props.onClaim}
                          >
                            {shortStatus[cell.status]}
                            {differs && (
                              <span className="visually-hidden">
                                , status differs from the previous edition
                              </span>
                            )}
                          </CellLink>
                        </td>
                      );
                    })}
                  </tr>
                ))}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** "v1.0, v2.0 and v2.1": edition labels of steps, as their later edition. */
function stepList(steps: FrameworkChangesQuestion['steps']) {
  const names = steps.map((s) => `${label(s.from)} → ${label(s.to)}`);
  return names.length < 2
    ? names.join('')
    : names.slice(0, -1).join(', ') + ' and ' + names.at(-1);
}

function Question({
  family,
  question,
  ...props
}: PageProps & {
  family: FrameworkChangesFamily;
  question: FrameworkChangesQuestion;
}) {
  const { facet, cells, steps } = question;
  const byStatus = steps.filter((s) => s.difference === 'status');
  const byPassage = steps.filter((s) => s.difference === 'passage');
  const same = steps.filter((s) => s.difference === 'same');
  const inapplicable = steps.filter((s) => s.difference === 'not-applicable');
  const headingId = `fc-q-${family.family}-${facet.id}`;
  return (
    <li className="fc-question" aria-labelledby={headingId}>
      <h4 id={headingId} tabIndex={-1}>
        {facet.label}
      </h4>
      {steps.length === 0 ? (
        <p>
          One compared edition: {statusLabels[cells[0].status].toLowerCase()}.
          No step between editions can be recorded.
        </p>
      ) : (
        <ul className="fc-steps">
          {byStatus.map((s) => (
            <li key={s.to.edition.id} className="fc-step-status">
              <span className="fc-step-label">
                {label(s.from)} → {label(s.to)}: status differs.
              </span>{' '}
              <CellLink
                cell={s.from}
                facetLabel={facet.label}
                secondary
                selectedClaimId={props.selectedClaimId}
                onClaim={props.onClaim}
              >
                {label(s.from)}: {statusLabels[s.from.status].toLowerCase()}
              </CellLink>{' '}
              →{' '}
              <CellLink
                cell={s.to}
                facetLabel={facet.label}
                secondary
                selectedClaimId={props.selectedClaimId}
                onClaim={props.onClaim}
              >
                {label(s.to)}: {statusLabels[s.to.status].toLowerCase()}
              </CellLink>
            </li>
          ))}
          {byPassage.length > 0 && (
            <li>
              Same status, different recorded passage: {stepList(byPassage)}.
            </li>
          )}
          {same.length > 0 && (
            <li>
              Same status and same recorded passage, or no passage in either:{' '}
              {stepList(same)}.
            </li>
          )}
          {inapplicable.length > 0 && (
            <li>
              {stepList(inapplicable)}: the question does not apply to{' '}
              {label(inapplicable[0].from)}, the first compared edition.
            </li>
          )}
        </ul>
      )}
      <details className="doc-provisions">
        <summary>Passages, edition by edition</summary>
        <ol className="fc-cells">
          {cells.map((cell, i) => (
            <li key={cell.edition.id}>
              <p className="fc-cell-head">
                <span className="fc-cell-edition">{label(cell)}</span>{' '}
                <CellLink
                  cell={cell}
                  facetLabel={facet.label}
                  secondary
                  selectedClaimId={props.selectedClaimId}
                  onClaim={props.onClaim}
                />
                {i > 0 &&
                  steps[i - 1].difference === 'same' &&
                  cell.passages.length > 0 && (
                    <span className="small-note">
                      {' '}
                      · same recorded passage as {label(cells[i - 1])}
                    </span>
                  )}
              </p>
              <CellPassages cell={cell} />
            </li>
          ))}
        </ol>
      </details>
      <p className="doc-meta">
        <NavLink
          className="text-button"
          href={referencePath({
            kind: 'compare',
            id: 'frontier-safety-frameworks',
            facet: facet.id,
          })}
          onOpen={() => props.onCompare(facet.id)}
        >
          This question in the comparison →
        </NavLink>
      </p>
    </li>
  );
}

function Family({
  family,
  view,
  ...props
}: PageProps & { family: FrameworkChangesFamily; view: FrameworkChangesView }) {
  const first = family.editions[0];
  const last = family.editions.at(-1)!;
  return (
    <section
      className="doc-family fc-family"
      aria-labelledby={sectionId(family.family)}
    >
      <h2 id={sectionId(family.family)} tabIndex={-1}>
        {family.label}
      </h2>
      <p className="doc-family-note">
        {family.editions.length === 1
          ? `One compared edition, ${dateText(first.date, first.kind)}.`
          : `${family.editions.length} compared editions, from ${first.entity.documentVersion!.label} (${dateText(first.date, first.kind)}) to ${last.entity.documentVersion!.label} (${dateText(last.date, last.kind)}).`}{' '}
        Publisher: {family.publisher}.
      </p>
      <h3>Editions</h3>
      <EditionTimeline family={family} {...props} />
      <h3>Status by question and edition</h3>
      <p className="small-note">
        Each cell opens its record. ≠ marks a status that differs from the
        previous edition’s.
      </p>
      <StatusTable family={family} view={view} {...props} />
      <h3>Between consecutive editions, question by question</h3>
      {view.dimensions.map((d) => (
        <div className="fc-dimension" key={d.id}>
          <h4 className="fc-dimension-title">{d.label}</h4>
          <ol className="fc-questions">
            {family.questions
              .filter((q) => q.facet.dimension.id === d.id)
              .map((q) => (
                <Question
                  key={q.facet.id}
                  family={family}
                  question={q}
                  {...props}
                />
              ))}
          </ol>
        </div>
      ))}
    </section>
  );
}

function Earliest({
  view,
  ...props
}: PageProps & { view: FrameworkChangesView }) {
  return (
    <section
      className="fc-earliest commit-matrix"
      aria-labelledby="fc-earliest-title"
    >
      <h2 id="fc-earliest-title" tabIndex={-1}>
        Across developers: earliest located
      </h2>
      <p className="small-note">
        For each question, the earliest compared edition of each framework whose
        cell records a passage, stated or stated partly: earliest located in the
        compared editions. Where that cell is “stated, partly”, the earliest
        “stated” cell follows if there is one. “Earliest compared edition” means
        the framework’s first edition in the comparison to which the question
        applies already records it. A dash means no compared edition records a
        passage. The developer may have said the same thing elsewhere or
        earlier.
      </p>
      <div className="doc-alignment-scroll">
        <table className="commit-table fc-earliest-table">
          <caption className="visually-hidden">
            Earliest compared edition recording a passage, by question and
            framework
          </caption>
          <thead>
            <tr>
              <th scope="col">Question</th>
              {view.families.map((f) => (
                <th scope="col" key={f.family}>
                  {f.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {view.earliest.map((row) => (
              <tr key={row.facet.id}>
                <th scope="row">{row.facet.label}</th>
                {row.families.map((f) => {
                  const family = view.families.find(
                    (x) => x.family === f.family,
                  )!;
                  const dated = (cell: FrameworkChangesCell) => {
                    const e = family.editions.find(
                      (x) => x.entity.id === cell.edition.id,
                    )!;
                    return (
                      <>
                        <span className="fc-nowrap">{label(cell)}</span> ·{' '}
                        <span className="fc-nowrap">
                          {e.date ?? 'date unknown'}
                        </span>
                      </>
                    );
                  };
                  return (
                    <td key={f.family}>
                      {f.located ? (
                        <>
                          <CellLink
                            cell={f.located}
                            facetLabel={row.facet.label}
                            secondary
                            plain
                            selectedClaimId={props.selectedClaimId}
                            onClaim={props.onClaim}
                          >
                            {dated(f.located)}
                          </CellLink>
                          <span className="fl-link-kind">
                            {statusLabels[f.located.status]}
                            {f.firstEdition && ' · earliest compared edition'}
                          </span>
                          {f.stated && (
                            <span className="fl-link-kind">
                              Stated:{' '}
                              <CellLink
                                cell={f.stated}
                                facetLabel={row.facet.label}
                                secondary
                                plain
                                selectedClaimId={props.selectedClaimId}
                                onClaim={props.onClaim}
                              >
                                {dated(f.stated)}
                              </CellLink>
                            </span>
                          )}
                        </>
                      ) : (
                        <span
                          className="doc-unknown"
                          aria-label="No compared edition records a passage"
                        >
                          –
                        </span>
                      )}
                    </td>
                  );
                })}
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
  view: FrameworkChangesView;
  repository: Repository;
  onClaim: (id: string) => void;
}) {
  const categories = Object.keys(changesNotCoveredLabels) as Array<
    keyof typeof changesNotCoveredLabels
  >;
  return (
    <section className="fl-not-covered" aria-labelledby="fc-not-covered-title">
      <h2 id="fc-not-covered-title" tabIndex={-1}>
        Not covered
      </h2>
      <p className="small-note">
        What the page leaves out, which editions were read from archive copies,
        and the limits of retrieval. A gap is not a finding that something did
        not happen.
      </p>
      {categories.map((category) => {
        const items = view.collection.notCovered.filter(
          (n) => n.category === category,
        );
        return (
          <div className="fl-block" key={category}>
            <h3>{changesNotCoveredLabels[category]}</h3>
            <ul>
              {items.map((n) => (
                <li key={n.id}>
                  {n.text}
                  {n.claimIds.length > 0 && (
                    <span className="doc-question-records">
                      {' '}
                      Record:{' '}
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
                            {recordName(id, repository)}
                          </ClaimLink>
                        </span>
                      ))}
                    </span>
                  )}
                </li>
              ))}
              {category === 'archive' &&
                view.archiveCells.map((a) => (
                  <li key={a.edition.id}>
                    {a.edition.shortName ?? a.edition.name}: {a.cells.length} of{' '}
                    {a.of} cells rest on evidence read in an Internet Archive
                    capture.
                  </li>
                ))}
              {category === 'held' &&
                (view.notChecked.length === 0 ? (
                  <li>
                    No cell is held or unchecked. The comparison records a cell
                    for every edition on every question that applies to it.
                  </li>
                ) : (
                  view.notChecked.map((n) => (
                    <li key={n.editionId}>
                      {repository.entities.get(n.editionId)?.name}:{' '}
                      {n.facetIds.length} questions not checked. {n.reason}
                    </li>
                  ))
                ))}
            </ul>
          </div>
        );
      })}
    </section>
  );
}

export function FrameworkChanges({
  view,
  repository,
  selectedClaimId,
  onClaim,
  onEntity,
  onCompare,
  onDocuments,
  onGuide,
}: {
  view: FrameworkChangesView;
  repository: Repository;
  selectedClaimId: string | null;
  onClaim: (id: string) => void;
  onEntity: (id: string) => void;
  onCompare: (facet?: string) => void;
  onDocuments: () => void;
  onGuide: (id: string) => void;
}) {
  const { collection, comparison, families } = view;
  const props = { repository, selectedClaimId, onClaim, onEntity, onCompare };
  const shownStatuses = (
    [
      'stated',
      'partly',
      'not-found',
      'not-applicable',
      'recorded',
      'not-checked',
    ] as CellStatus[]
  ).filter((s) =>
    families.some((f) =>
      f.questions.some((q) => q.cells.some((c) => c.status === s)),
    ),
  );
  const toc = [
    ['fc-orientation-title', 'What the page covers'],
    ...families.map((f) => [sectionId(f.family), f.label]),
    ['fc-earliest-title', 'Across developers: earliest located'],
    ['fc-not-covered-title', 'Not covered'],
  ];
  return (
    <article
      className="doc-history fl-page fc-page"
      aria-label={collection.title}
    >
      <header className="doc-lede">
        <span className="eyebrow">
          Guided reading · {view.editionCount} framework editions ·{' '}
          {families.length} frameworks · {view.questionCount} questions
        </span>
        <h1>{collection.title}</h1>
        <p className="landing-deck">{collection.question}</p>
        <p className="doc-status">
          A machine selected and arranged these records. No human review of the
          selection or framing is recorded.
        </p>
        <div className="doc-actions">
          <ExportFrameworkChangesStarter
            data={repository.data}
            collection={collection}
            comparison={comparison}
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
            href={referencePath({ kind: 'compare', id: comparison.id })}
            onOpen={() => onCompare()}
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
            href={referencePath({
              kind: 'guide',
              id: 'frontier-frameworks-and-law',
            })}
            onOpen={() => onGuide('frontier-frameworks-and-law')}
          >
            Frontier AI frameworks and law
          </NavLink>
        </p>
      </header>
      <nav className="commit-toc" aria-label="On this page">
        <ol>
          {toc.map(([id, text]) => (
            <li key={id}>
              <SectionLink className="text-button" id={id}>
                {text}
              </SectionLink>
            </li>
          ))}
        </ol>
      </nav>
      <section
        className="fl-orientation"
        aria-labelledby="fc-orientation-title"
      >
        <h2 id="fc-orientation-title" tabIndex={-1}>
          What the page covers
        </h2>
        <p>
          {view.editionCount} editions of {families.length} safety frameworks,
          dated {view.firstDate} to {view.lastDate}, read against the
          comparison’s {view.questionCount} questions in{' '}
          {view.dimensions.length} groups. Each edition has one cell per
          question. Six questions quote the edition; the other twelve give
          Selekoa’s paraphrase with the page.
        </p>
        {collection.reading.map((text) => (
          <p key={text}>{text}</p>
        ))}
        <h3>How to read the statuses</h3>
        <dl className="fl-legend">
          {shownStatuses.map((s) => (
            <div key={s}>
              <dt>
                <span className={'fc-status fc-status-' + s}>
                  {statusLabels[s]}
                </span>
              </dt>
              <dd>{comparison.legend[s]}</dd>
            </div>
          ))}
        </dl>
      </section>
      <details className="doc-limits-box">
        <summary>Limits of this page</summary>
        <ul className="doc-limits">
          {collection.limits.map((limit) => (
            <li key={limit}>{limit}</li>
          ))}
        </ul>
      </details>
      {families.map((family) => (
        <Family key={family.family} family={family} view={view} {...props} />
      ))}
      <Earliest view={view} {...props} />
      <NotCovered view={view} repository={repository} onClaim={onClaim} />
    </article>
  );
}
