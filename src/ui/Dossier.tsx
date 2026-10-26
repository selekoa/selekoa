import { useState } from 'react';
import {
  dossierSections,
  type DossierSection,
  type InstitutionalDossier,
} from '../domain/dossier';
import type { Repository } from '../domain/repository';
import { predicates } from '../domain/predicates';
import { timeLabel } from '../domain/query';
import { versionDescription } from '../domain/versions';
import { entityStyle } from './entityStyle';
import type { ResearchPath } from '../domain/research-path';
import { CopyLink } from './ReferenceActions';
import { ReviewMarkers } from './ReviewMarkers';
import { RecordMarks, StatedReason } from './RecordMarks';
import { ArchiveLink } from './SourceArchive';
import { derivationLabels, resolutionLabels } from '../domain/epistemics';

const notes: Record<DossierSection, string> = {
  chronology:
    'Records about the institution itself and documented changes to its frameworks, by year. Expand a year to read the claims. People’s other institutional records and related documents have their own sections. Where a date gives only the year or month, the order within it is unknown.',
  people:
    'Founding credits, roles and departure announcements, grouped by person. A person’s records at other institutions are context. They do not show a move between institutions or that one institution succeeded another. The list is not a complete roster. A snapshot is one dated report, not a tenure, and an unknown end date does not mean the person is still there.',
  ideas:
    'Works by people in this dossier or published by the institution, plus works one explicit citation, credit or reported method use away, in either direction. These links explain why a work is listed. They do not show that the institution adopted it. Authorship, citation, discussion, credit and reported use are separate relations.',
  capital:
    'Dated financing, cloud terms and compute capacity, grouped by the other party. Records running in both directions between two parties do not trace funds or show dependency. Each party is kept separate, and amounts, tranches and shared agreements are never added together.',
  governance:
    'Published frameworks, evaluation engagements, documented replacements between editions and selected changes. Each evaluation keeps its stage and the system it covered. A reported evaluation or a published policy does not show independent verification or effect.',
};

export function Dossier({
  dossier,
  repository,
  selectedClaimId,
  onClaim,
  onInstitution,
  onRecordPage,
  path,
  onRead,
}: {
  dossier: InstitutionalDossier;
  repository: Repository;
  selectedClaimId: string | null;
  onClaim: (id: string) => void;
  onInstitution: (id: string) => void;
  /** Opens a person or document reading page. */
  onRecordPage?: (id: string) => void;
  path?: ResearchPath | null;
  onRead?: () => void;
}) {
  const [section, setSection] = useState<DossierSection>('chronology');
  const seedCount = dossier.claims.filter(
    (c) => c.editorialState === 'seed',
  ).length;
  return (
    <article
      className="dossier"
      aria-label={`${dossier.institution.name} institutional dossier`}
    >
      <header className="dossier-overview">
        <CopyLink
          target={{ kind: 'dossier', id: dossier.institution.id }}
          label="Copy dossier link"
        />
        {path && onRead && (
          <div className="path-entry">
            <p className="eyebrow">
              A guided reading ·{' '}
              {path.items.filter((i) => i.section.kind === 'principal').length}{' '}
              main claims
            </p>
            <p>{path.question}</p>
            <button onClick={onRead}>Open the guided reading →</button>
            <small>
              Selected by machine · no human review of the framing recorded
            </small>
          </div>
        )}
        <p className="eyebrow">Institutional dossier</p>
        <p className="dossier-deck">
          The documented history of {dossier.institution.name}: chronology,
          people, research, capital and compute, and governance. Every statement
          opens its source and its limits.
        </p>
        <p className="dossier-coverage">
          Records dated {dossier.coverage.from ?? 'unknown'} to{' '}
          {dossier.coverage.until ?? 'unknown'} · {dossier.coverage.unknown}{' '}
          undated
        </p>
        <p className="small-note">
          {dossier.claims.length} claims · {dossier.sourceIds.length} sources ·{' '}
          {seedCount} not editorially accepted. The counts describe this
          selection. They do not measure completeness or independent
          confirmation.
        </p>
        <details className="dossier-method">
          <summary>Scope, evidence and limits</summary>
          <p>Description: {dossier.institution.description}</p>
          <p>
            The records are grouped automatically. No human inspection of the
            selected claims, source paths or framing is recorded for this
            dossier. Each source passage shows how it was checked.
          </p>
          <p>
            The dossier is computed from existing records. It is not a
            continuous history of the institution, and a missing record does not
            mean that an event or relationship did not happen. The chronology
            uses the dates of events and reports, not the date the public could
            first have known of them. Later sources can describe earlier events.
          </p>
          <p>
            Select any statement to see its exact claim, qualification, date
            note, evidence passage, location in the source, source version and
            review status. The description above is Selekoa’s stored description
            of the institution, based on these sources:
          </p>
          <ul>
            {dossier.institution.sourceIds.map((id) => {
              const s = repository.sources.get(id)!;
              return (
                <li key={id}>
                  <a href={s.evidenceUrl} target="_blank" rel="noreferrer">
                    {s.title}
                  </a>
                  {s.archivedUrl && (
                    <>
                      {' · '}
                      <ArchiveLink source={s} />
                    </>
                  )}
                </li>
              );
            })}
          </ul>
        </details>
        {dossier.institutionLinks.length > 0 && (
          <details className="dossier-institutions" open>
            <summary>Connected institutional dossiers</summary>
            <p className="small-note">
              Institutions linked by a documented relationship. Each keeps its
              own chronology and evidence. When units combine, their earlier
              records stay separate.
            </p>
            <ul>
              {dossier.institutionLinks.map(({ entity, claim }) => (
                <li key={claim.id}>
                  <button onClick={() => onInstitution(entity.id)}>
                    Open {entity.name} dossier →
                  </button>
                  <button
                    className="dossier-connection-evidence"
                    onClick={() => onClaim(claim.id)}
                    aria-label={`Inspect institutional connection: ${claim.statement}`}
                  >
                    {claim.statement} <span>Inspect evidence ↗</span>
                  </button>
                </li>
              ))}
            </ul>
          </details>
        )}
      </header>
      <div
        className="dossier-navigation"
        role="group"
        aria-label="Dossier sections"
      >
        {Object.entries(dossierSections).map(([id, label], index) => (
          <button
            key={id}
            aria-pressed={section === id}
            onClick={() => setSection(id as DossierSection)}
          >
            <span aria-hidden="true">0{index + 1}</span> {label}
          </button>
        ))}
      </div>
      <section
        className={`dossier-section dossier-${section}`}
        aria-label={dossierSections[section]}
      >
        <h3>{dossierSections[section]}</h3>
        <p className="dossier-section-note">{notes[section]}</p>
        {dossier.sections[section].length === 0 && (
          <p className="empty-note">
            No records in this section yet. A missing record is a gap in
            coverage.
          </p>
        )}
        {dossier.sections[section].map((group, index) => (
          <details
            className="dossier-group"
            key={`${section}-${group.id}`}
            open={index === 0 ? true : undefined}
          >
            <summary>
              <span className="dossier-group-heading">
                {group.entity && (
                  <span
                    className={`entity-symbol symbol-${group.entity.type}`}
                    aria-hidden="true"
                  />
                )}
                <span>
                  {group.label}
                  <small>
                    {group.entity
                      ? entityStyle[group.entity.type].label
                      : 'Record year'}{' '}
                    · {group.claims.length} claims
                    {group.entity?.documentVersion
                      ? ` · ${group.entity.documentVersion.label}`
                      : ''}
                  </small>
                </span>
              </span>
            </summary>
            {group.connectionClaims && (
              <details className="dossier-connection">
                <summary>Why this document is included</summary>
                <p>
                  These records explain why the document appears here. They do
                  not show that the institution adopted it or was influenced by
                  it.
                </p>
                {group.connectionClaims.map((c) => (
                  <button key={c.id} onClick={() => onClaim(c.id)}>
                    {c.statement} <span>Inspect evidence ↗</span>
                  </button>
                ))}
              </details>
            )}
            {onRecordPage &&
              (group.entity?.type === 'person' ||
                group.entity?.type === 'document') && (
                <button
                  className="text-button dossier-page-link"
                  onClick={() => onRecordPage(group.entity!.id)}
                >
                  {group.entity.type === 'person'
                    ? `${group.entity.name}: person page →`
                    : `${group.entity.name}: document page →`}
                </button>
              )}
            {group.entity?.documentVersion && (
              <p className="dossier-version">
                {versionDescription(group.entity)}
                <br />
                {group.entity.documentVersion.dateNote}
              </p>
            )}
            <ol className="dossier-records">
              {group.claims.map((claim) => {
                const subject = repository.entities.get(claim.subject)!;
                const object =
                  claim.object.kind === 'entity'
                    ? repository.entities.get(claim.object.entityId)!
                    : null;
                const attrs = claim.attributes;
                return (
                  <li
                    key={claim.id}
                    className={`dossier-record family-${claim.topic}`}
                  >
                    <div className="dossier-record-meta">
                      <span>
                        {timeLabel(claim)}
                        {claim.time.kind === 'interval' ? ' · interval' : ''}
                      </span>
                      <span>{claim.topic}</span>
                    </div>
                    <button
                      className="dossier-claim"
                      data-claim-id={claim.id}
                      aria-label={`Inspect claim & evidence: ${claim.statement}`}
                      aria-pressed={selectedClaimId === claim.id}
                      onClick={() => onClaim(claim.id)}
                    >
                      <span className="dossier-statement">
                        {claim.statement}
                      </span>
                      <span className="dossier-relation">
                        {subject.shortName ?? subject.name} →{' '}
                        {predicates[claim.predicate].label} →{' '}
                        {object?.shortName ??
                          object?.name ??
                          (claim.object.kind === 'literal'
                            ? `${claim.object.value} ${claim.object.unit ?? ''}`
                            : '')}
                      </span>
                      <span className="dossier-evidence-link">
                        Inspect claim & evidence ↗
                      </span>
                    </button>
                    <p className="dossier-context">
                      {dossier.connections[claim.id]} ·{' '}
                      {derivationLabels[claim.derivation]} ·{' '}
                      {resolutionLabels[claim.resolution]}{' '}
                      <ReviewMarkers claim={claim} repository={repository} />{' '}
                      <RecordMarks claim={claim} repository={repository} />
                    </p>
                    <StatedReason claim={claim} repository={repository} />
                    {attrs && (
                      <p className="dossier-transaction">
                        {[
                          attrs.activityStage
                            ? `Activity: ${attrs.activityStage.replaceAll('_', ' ')}`
                            : '',
                          attrs.evaluatedSystem
                            ? `System: ${attrs.evaluatedSystem}`
                            : '',
                          attrs.transitionScope
                            ? attrs.transitionScope.replaceAll('_', ' ')
                            : '',
                          attrs.transactionStage
                            ? `Stage: ${attrs.transactionStage}`
                            : '',
                          attrs.amount
                            ? `${attrs.amount.bound.replaceAll('_', ' ')} ${attrs.amount.currency} ${attrs.amount.value.toLocaleString('en-US')} · ${attrs.amount.scope.replaceAll('_', ' ')}`
                            : '',
                          attrs.quantity
                            ? `${attrs.quantity.bound?.replaceAll('_', ' ') ?? ''} ${attrs.quantity.value.toLocaleString('en-US')} ${attrs.quantity.unit}`
                            : '',
                          attrs.period ?? '',
                        ]
                          .filter(Boolean)
                          .join(' · ')}
                      </p>
                    )}
                    <details className="dossier-limits">
                      <summary>Qualification and date notes</summary>
                      <p>{claim.qualification}</p>
                      <p>{claim.time.note}</p>
                      {attrs?.conditions && (
                        <p>Conditions: {attrs.conditions}</p>
                      )}
                    </details>
                  </li>
                );
              })}
            </ol>
          </details>
        ))}
      </section>
    </article>
  );
}
