import type { ReactNode } from 'react';
import type { DocumentRecord } from '../domain/document-record';
import { editionAnchorDate, editionGapText } from '../domain/document-history';
import { predicates } from '../domain/predicates';
import { CopyLink } from './ReferenceActions';
import {
  ClaimRow,
  InspectLink,
  ProvisionRow,
  provisionHeading,
  type ClaimProps,
} from './ReadingRows';
import { ArchiveLink, ArchiveNote, SourceLanguage } from './SourceArchive';
import { nonEnglishLanguage } from '../domain/source-archive';
import { AppearsIn } from './AppearsIn';
import type { CollectionTarget } from '../domain/appearances';
import './record-pages.css';

const basisLabels: Record<string, string> = {
  announcement: 'Announced',
  signature: 'Signed',
  event: 'Dated event (basis not stated)',
  snapshot: 'Snapshot',
};

export function DocumentPage({
  record,
  repository,
  selectedClaimId,
  onClaim,
  onEntity,
  onExplore,
  onHistory,
  onProposition,
  onCollection,
  resume,
}: ClaimProps & {
  record: DocumentRecord;
  onEntity: (id: string) => void;
  onExplore: () => void;
  /** Opens the full document history when this family belongs to one. */
  onHistory?: () => void;
  /** Opens the propositions page at a proposition. */
  onProposition?: (id: string) => void;
  onCollection: (target: CollectionTarget) => void;
  resume?: ReactNode;
}) {
  const { document, family, edition } = record;
  const props = { repository, selectedClaimId, onClaim };
  const name = (id: string) => repository.entities.get(id)!.name;
  const pageLink = (id: string) => {
    const entity = repository.entities.get(id)!;
    if (entity.proposition && onProposition)
      return {
        label: `${entity.name}: propositions page →`,
        onClick: () => onProposition(id),
      };
    return {
      label: `${entity.shortName ?? entity.name}: ${
        entity.type === 'person'
          ? 'person page'
          : entity.type === 'document'
            ? 'document page'
            : entity.type === 'organisation'
              ? 'institution'
              : 'records'
      } →`,
      onClick: () => onEntity(id),
    };
  };
  const version = document.documentVersion;
  // One row per date kind; claim dates attach to the matching kind and value.
  const kindOf: Record<string, string> = {
    publication: 'Published',
    effective: 'Effective',
    revision: 'Revised',
  };
  const dateRows: { label: string; date?: string; claimIds: string[] }[] = (
    [
      ['Published', version?.publishedAt],
      ['Effective', version?.effectiveAt],
      ['Revised', version?.revisedAt],
    ] as const
  )
    .filter(([label, date]) => date || (version && label === 'Published'))
    .map(([label, date]) => ({ label, date, claimIds: [] as string[] }));
  for (const d of record.claimDates) {
    const label = kindOf[d.basis];
    const row = dateRows.find(
      (r) => r.label === label && (r.date === d.date || !r.date),
    );
    if (row && row.date === d.date) row.claimIds.push(...d.claimIds);
    else if (label && !dateRows.some((r) => r.label === label && r.date))
      dateRows.push({ label, date: d.date, claimIds: [...d.claimIds] });
    else
      dateRows.push({
        label: basisLabels[d.basis] ?? d.basis,
        date: d.date,
        claimIds: [...d.claimIds],
      });
  }
  // A placeholder "not established" row is replaced by a matching claim date.
  for (const label of ['Published', 'Effective', 'Revised'])
    if (dateRows.some((r) => r.label === label && r.date))
      for (let i = dateRows.length - 1; i >= 0; i--)
        if (dateRows[i].label === label && !dateRows[i].date)
          dateRows.splice(i, 1);
  // Source metadata, shown where no claim records authorship or a date. It
  // describes the source record; it is not a claim about the document.
  const described = record.exactSources.length
    ? record.exactSources
    : record.identitySources.filter((s) => s.documentId === document.id);
  const sourceAuthors = [...new Set(described.flatMap((s) => s.authors))];
  const sourceNote =
    described.length > 1 ? 'The source records' : 'The source record';
  const listed = (items: string[]) =>
    items.length > 1
      ? items.slice(0, -1).join(', ') + ' and ' + items.at(-1)
      : items[0];
  const sourceDates = [
    ...new Set(
      described.flatMap((s) => (s.publicationDate ? [s.publicationDate] : [])),
    ),
  ];
  const present = record.relations.filter((r) => r.claims.length);
  const absent = record.relations.filter(
    (r) => !r.claims.length && !r.onlyWhenPresent,
  );
  const actorRows = [
    ...record.issued.map((c) => ({
      claim: c,
      actor: c.subject,
      kind: 'Issued by',
    })),
    ...record.authored.map((c) => ({
      claim: c,
      actor: c.subject,
      kind: 'Author',
    })),
    ...record.supported.map((c) => ({
      claim: c,
      actor: c.subject,
      kind: 'Research supported by',
    })),
  ];
  return (
    <article
      className="record-page document-page"
      aria-label={document.name + ': document page'}
    >
      <header className="doc-lede">
        <span className="eyebrow">Document · {document.subtype}</span>
        <h1>{document.name}</h1>
        <p className="doc-intro">{document.description}</p>
        <dl className="record-facts">
          <dt>Issued by</dt>
          <dd>
            {record.issued.length ? (
              record.issued.map((c, i) => (
                <span key={c.id}>
                  {i > 0 && ' · '}
                  <InspectLink
                    claim={c}
                    label={`Inspect issue record: ${c.statement}`}
                    {...props}
                  >
                    {name(c.subject)}
                  </InspectLink>
                </span>
              ))
            ) : version ? (
              name(version.publisherId) + ' (from the version record)'
            ) : (
              <span className="doc-unknown">
                No issuing record yet. A missing record is a gap in coverage.
              </span>
            )}
          </dd>
          <dt>Authors credited</dt>
          <dd>
            {record.authored.length ? (
              record.authored.map((c, i) => (
                <span key={c.id}>
                  {i > 0 && ' · '}
                  <InspectLink
                    claim={c}
                    label={`Inspect authorship record: ${c.statement}`}
                    {...props}
                  >
                    {name(c.subject)}
                  </InspectLink>
                </span>
              ))
            ) : (
              <span className="doc-unknown">
                No authorship claim recorded yet.
                {sourceAuthors.length
                  ? ` ${sourceNote} ${described.length > 1 ? 'list' : 'lists'} ${listed(sourceAuthors)}.`
                  : ' A missing record is a gap in coverage.'}
              </span>
            )}
          </dd>
          <dt>Dates</dt>
          <dd>
            <ul className="record-dates">
              {dateRows.map((row) => (
                <li key={row.label + row.date}>
                  <span className="record-date-kind">{row.label}</span>{' '}
                  {row.date ? (
                    row.date
                  ) : (
                    <span className="doc-unknown">not established</span>
                  )}
                  {row.claimIds.map((id) => (
                    <span key={id} className="record-date-evidence">
                      {' '}
                      <InspectLink
                        claim={repository.claims.get(id)!}
                        label={`Inspect dated record: ${repository.claims.get(id)!.statement}`}
                        {...props}
                      >
                        {repository.claims.get(id)!.predicate === 'authored'
                          ? 'authorship evidence'
                          : 'issue evidence'}
                      </InspectLink>
                    </span>
                  ))}
                </li>
              ))}
              {!dateRows.length && (
                <li className="doc-unknown">
                  No date claim recorded yet.
                  {sourceDates.length
                    ? ` ${sourceNote} ${described.length > 1 ? 'give' : 'gives'} the publication date as ${listed(sourceDates)}.`
                    : ' A missing record is a gap in coverage.'}
                </li>
              )}
            </ul>
            {version && <p className="small-note">{version.dateNote}</p>}
          </dd>
          <dt>Exact source</dt>
          <dd>
            {record.exactSources.length ? (
              <ul className="record-dates">
                {record.exactSources.map((s) => (
                  <li key={s.id}>
                    <a href={s.evidenceUrl} target="_blank" rel="noreferrer">
                      {s.title}
                      <span aria-hidden="true"> ↗</span>
                    </a>
                    <span className="small-note">
                      {' '}
                      {s.publisher} ·{' '}
                      {s.publicationDate
                        ? 'published ' + s.publicationDate
                        : 'publication date unknown'}{' '}
                      · {s.version}
                      {nonEnglishLanguage(s) && (
                        <>
                          {' · '}
                          <SourceLanguage source={s} />
                        </>
                      )}
                    </span>
                    {s.archivedUrl && (
                      <span className="small-note record-archive">
                        <ArchiveNote source={s} />
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <>
                <span className="doc-unknown">
                  no source record matches this exact version of the document.
                </span>{' '}
                Sources for the description:{' '}
                {record.identitySources.map((s, i) => (
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
              </>
            )}
          </dd>
        </dl>
        <div className="doc-actions">
          <CopyLink
            target={{ kind: 'document', id: document.id }}
            label="Copy link to this page"
          />
          <button className="text-button record-explore" onClick={onExplore}>
            See this document’s connections in the explorer →
          </button>
        </div>
        <AppearsIn
          data={repository.data}
          entityId={document.id}
          kind="document"
          onCollection={onCollection}
        />
      </header>
      {resume}
      <section className="record-section" aria-labelledby="document-versions">
        <h2 id="document-versions">Versions</h2>
        {family && edition ? (
          <>
            <p className="record-note">
              {family.label}: {family.editions.length} recorded version
              {family.editions.length === 1 ? '' : 's'}, oldest first, published
              by {family.publisher.name}. A version is shown as replacing
              another only where a record says so. Date order alone never
              implies it.
            </p>
            <ol className="record-versions">
              {family.editions.map((e) => {
                const anchor = editionAnchorDate(e.entity);
                const current = e.entity.id === document.id;
                return (
                  <li
                    key={e.entity.id}
                    aria-current={current ? 'true' : undefined}
                  >
                    <span className="record-version-date">
                      {anchor ? `${anchor.date} · ${anchor.kind}` : 'Undated'}
                    </span>
                    {current ? (
                      <strong>
                        {e.entity.documentVersion!.label} (this version)
                      </strong>
                    ) : (
                      <button
                        className="text-button"
                        onClick={() => onEntity(e.entity.id)}
                      >
                        {e.entity.documentVersion!.label}
                      </button>
                    )}
                  </li>
                );
              })}
            </ol>
            {onHistory && (
              <button
                className="text-button record-explore"
                onClick={onHistory}
              >
                Read the full document history of these frameworks →
              </button>
            )}
            <h3 className="record-subheading">This version</h3>
            <ul className="record-rows">
              {edition.replaces.map((c) => (
                <ClaimRow
                  key={c.id}
                  claim={c}
                  heading="Replaces"
                  link={pageLink(
                    c.object.kind === 'entity' ? c.object.entityId : c.subject,
                  )}
                  {...props}
                />
              ))}
              {edition.replacedBy.map((c) => (
                <ClaimRow
                  key={c.id}
                  claim={c}
                  heading="Replaced by"
                  link={pageLink(c.subject)}
                  {...props}
                />
              ))}
              {edition.changes.map((c) => (
                <ClaimRow
                  key={c.id}
                  claim={c}
                  heading={
                    provisionHeading(c, repository) ??
                    'Recorded change from the previous version'
                  }
                  {...props}
                />
              ))}
              {record.laterChanges.map((c) => (
                <ClaimRow
                  key={c.id}
                  claim={c}
                  heading={
                    'Change recorded in ' +
                    (repository.entities.get(c.subject)!.documentVersion
                      ?.label ?? name(c.subject))
                  }
                  link={pageLink(c.subject)}
                  {...props}
                />
              ))}
            </ul>
            {(edition.provisions.length > 0 || edition.absences.length > 0) && (
              <>
                <h3 className="record-subheading" id="document-provisions">
                  Provisions in this version{' '}
                  <span>
                    · {edition.provisions.length} quoted
                    {edition.absences.length > 0 &&
                      ` · ${edition.absences.length} not found`}
                    {edition.assessments.length > 0 &&
                      ` · ${edition.assessments.length} disputed assessment${edition.assessments.length === 1 ? '' : 's'}`}
                  </span>
                </h3>
                <p className="record-note">
                  A limited selection of quoted provisions: what this edition
                  says about thresholds, required actions, who decides and
                  exceptions. It is not a full summary and says nothing about
                  implementation. A “not found” record states which part of the
                  edition was inspected. It is not a claim that the text was
                  deleted.
                </p>
                <ul className="record-rows provision-rows">
                  {[
                    ...edition.provisions,
                    ...edition.assessments,
                    ...edition.absences,
                  ].map((c) => (
                    <ProvisionRow key={c.id} claim={c} {...props} />
                  ))}
                </ul>
              </>
            )}
            {edition.gaps.map((gap) => (
              <p className="doc-gap" key={gap}>
                <strong>Coverage gap.</strong> {editionGapText[gap]}
              </p>
            ))}
            {!edition.replaces.length &&
              !edition.replacedBy.length &&
              !edition.changes.length &&
              !record.laterChanges.length &&
              !edition.gaps.length && (
                <p className="record-note">
                  Earliest version recorded here; no replacement is recorded.
                </p>
              )}
          </>
        ) : (
          <p className="record-note">
            No other versions of this document are recorded. The evidence
            applies to the source version listed above. Other versions, such as
            a preprint, working paper or journal publication, are not identified
            or substituted.
          </p>
        )}
      </section>
      {actorRows.length > 0 && (
        <section className="record-section" aria-labelledby="document-actors">
          <h2 id="document-actors">Issue and authorship records</h2>
          <ul className="record-rows">
            {actorRows.map(({ claim, actor, kind }) => (
              <ClaimRow
                key={claim.id}
                claim={claim}
                heading={kind + ': ' + name(actor)}
                link={pageLink(actor)}
                {...props}
              />
            ))}
          </ul>
        </section>
      )}
      <section className="record-section" aria-labelledby="document-relations">
        <h2 id="document-relations">Documentary relations</h2>
        <p className="record-note">
          Each relation is listed separately. Citing, crediting and reporting
          the use of a method are different acts, and none of them shows
          agreement or influence by itself.
        </p>
        {present.map((r) => (
          <section
            key={r.id}
            className="record-relation"
            aria-labelledby={'relation-' + r.id}
            data-relation={r.id}
          >
            <h3 className="record-subheading" id={'relation-' + r.id}>
              {r.label} <span>· {r.claims.length}</span>
            </h3>
            <p className="record-note">{r.note}</p>
            <ul className="record-rows">
              {r.claims.map((claim) => {
                const counterpart =
                  r.direction === 'outgoing'
                    ? claim.object.kind === 'entity'
                      ? claim.object.entityId
                      : claim.subject
                    : claim.subject;
                return (
                  <ClaimRow
                    key={claim.id}
                    claim={claim}
                    heading={name(counterpart)}
                    link={pageLink(counterpart)}
                    {...props}
                  />
                );
              })}
            </ul>
          </section>
        ))}
        {absent.length > 0 && (
          <p className="record-note record-absent">
            Not recorded for this document:{' '}
            {absent.map((r) => r.label.toLowerCase()).join(' · ')}. A missing
            record does not show that the relation does not exist.
          </p>
        )}
      </section>
      {record.other.length > 0 && (
        <section className="record-section" aria-labelledby="document-other">
          <h2 id="document-other">Other recorded relations</h2>
          <ul className="record-rows">
            {record.other.map((claim) => (
              <ClaimRow
                key={claim.id}
                claim={claim}
                heading={predicates[claim.predicate].label}
                {...props}
              />
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
