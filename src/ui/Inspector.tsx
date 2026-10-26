import { Fragment } from 'react';
import { restsOnReporting, retrievalRouteLabels } from '../domain/genealogy';
import { StatedReason } from './RecordMarks';
import { quoted } from './quote';
import {
  frameworkVersions,
  versionNeighbours,
  versionDescription,
  frameworkLabels,
} from '../domain/versions';
import type { Claim } from '../domain/schema';
import type { Repository } from '../domain/repository';
import { predicates } from '../domain/predicates';
import { timeLabel } from '../domain/query';
import {
  engagementLabels,
  registerLabels,
  requiredContext,
  roleLabels,
  tierLabels,
} from '../domain/propositions';
import {
  derivationLabels,
  resolutionLabels,
  evidenceSummary,
  supportLabels,
} from '../domain/epistemics';
import { entityStyle } from './entityStyle';
import { EntitySymbol } from './EntitySymbol';
import {
  CiteSource,
  CopyLink,
  CopyReference,
  referenceUrl,
} from './ReferenceActions';
import { claimReference, sourceReference } from '../domain/references';
import { reviewLabel } from './ReviewMarkers';
import {
  partyRoleLabels,
  provisionKindLabels,
} from '../domain/document-history';
import { ArchiveLink, ArchiveNote, SourceLanguage } from './SourceArchive';
import {
  archiveCopy,
  languageName,
  nonEnglishLanguage,
} from '../domain/source-archive';

export function ClaimButton({
  claim,
  repository,
  onSelect,
  selected = false,
}: {
  claim: Claim;
  repository: Repository;
  onSelect: (id: string) => void;
  selected?: boolean;
}) {
  const subject = repository.entities.get(claim.subject)!;
  const objectName =
    claim.object.kind === 'entity'
      ? repository.entities.get(claim.object.entityId)!.name
      : `${claim.object.value.toLocaleString('en-US')} ${claim.object.unit ?? ''}`;
  return (
    <button
      className={`claim-row${selected ? ' is-selected' : ''}`}
      onClick={() => onSelect(claim.id)}
      aria-pressed={selected}
      data-claim-id={claim.id}
      aria-label={`${subject.name} ${predicates[claim.predicate].label} ${objectName}. ${timeLabel(claim)}. ${claim.predicate === 'changes_from' || claim.attributes?.transactionType || claim.attributes?.activityStage ? claim.statement : ''} Inspect evidence.`}
    >
      <span className="claim-route">
        {subject.shortName ?? subject.name}
        <span aria-hidden="true"> → </span>
        {objectName}
      </span>
      <span className="claim-predicate">
        {predicates[claim.predicate].label}
        {claim.attributes?.role ? ` · ${claim.attributes.role}` : ''}
        {claim.attributes?.activityStage
          ? ` · ${claim.attributes.activityStage.replaceAll('_', ' ')}`
          : ''}
      </span>
      {(claim.predicate === 'changes_from' ||
        claim.attributes?.transactionType ||
        claim.attributes?.activityStage) && (
        <span className="small-note">{claim.statement}</span>
      )}
      <span className="claim-row-meta">
        {timeLabel(claim)}
        <span>Evidence ↗</span>
      </span>
    </button>
  );
}

type Props = {
  repository: Repository;
  claimId: string | null;
  entityId: string | null;
  visibleClaims: Claim[];
  onClaim: (id: string) => void;
  onEntity: (id: string) => void;
  /** Opens a person or document reading page from the entity view. */
  onPage?: (id: string) => void;
  onClose: () => void;
  onFamily?: (family: string) => void;
  onTopic: (topic: 'ideas' | 'capital' | 'governance') => void;
};
export function Inspector({
  repository,
  claimId,
  entityId,
  visibleClaims,
  onClaim,
  onEntity,
  onPage,
  onClose,
  onFamily,
  onTopic,
}: Props) {
  const claim = claimId ? repository.claims.get(claimId) : undefined;
  const entity = entityId ? repository.entities.get(entityId) : undefined;
  if (claim) {
    const subject = repository.entities.get(claim.subject)!;
    const object =
      claim.object.kind === 'entity'
        ? repository.entities.get(claim.object.entityId)
        : undefined;
    const attributes = claim.attributes;
    return (
      <aside
        className="inspector"
        aria-label="Evidence inspector"
        tabIndex={-1}
        id="inspector"
      >
        <div className="inspector-top">
          <span className="eyebrow">Claim and evidence</span>
          <button className="text-button" onClick={onClose}>
            Close ×
          </button>
        </div>
        <div className="claim-endpoints">
          <button onClick={() => onEntity(subject.id)}>{subject.name}</button>
          <span>{predicates[claim.predicate].label} ↓</span>
          {object ? (
            <button onClick={() => onEntity(object.id)}>{object.name}</button>
          ) : (
            <strong>
              {claim.object.kind === 'literal'
                ? `${claim.object.value.toLocaleString('en-US')} ${claim.object.unit ?? ''}`
                : ''}
            </strong>
          )}
        </div>
        <h2 className="claim-title">{claim.statement}</h2>
        <CopyLink
          target={{ kind: 'claim', id: claim.id }}
          label="Copy claim link"
        />
        <CopyReference
          label="Copy claim reference"
          text={() =>
            claimReference(
              repository.data,
              claim,
              referenceUrl({ kind: 'claim', id: claim.id }),
            )
          }
        />
        {claim.supersedes && (
          <p>
            Replaces earlier claim:{' '}
            <button
              className="text-button"
              onClick={() => onClaim(claim.supersedes!)}
            >
              {claim.supersedes}
            </button>
          </p>
        )}
        {repository.data.claims
          .filter((c) => c.supersedes === claim.id)
          .map((c) => (
            <p key={c.id}>
              Replaced by newer claim:{' '}
              <button className="text-button" onClick={() => onClaim(c.id)}>
                {c.id}
              </button>
            </p>
          ))}
        <div className="status-line">
          <span className="status status-review">
            {reviewLabel(claim, repository)}
          </span>
          <span className={`status status-${claim.derivation}`}>
            {derivationLabels[claim.derivation]}
          </span>
          <span className={`status status-${claim.resolution}`}>
            {resolutionLabels[claim.resolution]}
          </span>
        </div>
        {claim.resolution !== 'supported' && (
          <p className={`dispute-note dispute-note-${claim.resolution}`}>
            {claim.resolution === 'contested'
              ? 'Contested. Competent sources disagree. Evidence on both sides is shown below, and this record does not decide between them.'
              : 'Unresolved. The recorded evidence does not settle this question. The linked evidence is background only: it neither supports nor contradicts the claim.'}
          </p>
        )}
        <p className="small-note" aria-label="Evidence coverage">
          {evidenceSummary(
            claim.evidenceIds.map((id) => repository.evidence.get(id)!),
          )}
        </p>
        {claim.derivation === 'inferred' && (
          <p className="qualification">
            <strong>Reasoning and premises</strong>
            {claim.inferenceRationale}
          </p>
        )}
        <dl className="facts">
          {attributes?.changeBasis && (
            <>
              <dt>Basis of the change</dt>
              <dd>
                {attributes.changeBasis === 'document_comparison'
                  ? 'Inferred by comparing the two editions. No publisher statement of this change is recorded.'
                  : attributes.changeBasis === 'changelog'
                    ? 'Official changelog'
                    : attributes.changeBasis === 'assessment'
                      ? claim.resolution === 'contested'
                        ? 'Assessed effect. Sources disagree, and this is not a finding.'
                        : 'Assessed effect. An open question, and not a finding.'
                      : 'Stated by the publisher'}
              </dd>
            </>
          )}
          {attributes?.provision && (
            <>
              <dt>
                {claim.predicate === 'provision_assessed'
                  ? 'Assessed provision'
                  : 'Provision'}
              </dt>
              <dd>
                {provisionKindLabels[attributes.provision.kind]} · provision ID{' '}
                <code>{attributes.provision.key}</code>
              </dd>
              {attributes.provision.parties?.map((party) => (
                <Fragment key={party.role + party.actor}>
                  <dt>{partyRoleLabels[party.role]}</dt>
                  <dd>{party.actor}</dd>
                </Fragment>
              ))}
            </>
          )}
          {[subject, object]
            .filter((e) => e?.documentVersion)
            .map((e) => (
              <Fragment key={e!.id}>
                <dt>
                  {e!.id === subject.id ? 'Subject version' : 'Object version'}
                </dt>
                <dd>{versionDescription(e!)}</dd>
              </Fragment>
            ))}
          <dt>Date</dt>
          <dd>{timeLabel(claim)}</dd>
          {attributes?.thought && (
            <>
              {attributes.thought.attested && (
                <>
                  <dt>Wording attested</dt>
                  <dd>
                    {attributes.thought.attested.date ??
                      'Only in a later, undated copy'}
                    . {attributes.thought.attested.note}
                  </dd>
                </>
              )}
              {attributes.thought.claimed && (
                <>
                  <dt>Claimed date</dt>
                  <dd>
                    {attributes.thought.claimed.date}.{' '}
                    {attributes.thought.claimed.note}
                  </dd>
                </>
              )}
              <dt>Role</dt>
              <dd>
                {attributes.thought.roles.map((r) => roleLabels[r]).join(', ')}
              </dd>
              <dt>Register (kind of text)</dt>
              <dd>{registerLabels[attributes.thought.register]}</dd>
              {attributes.thought.term && (
                <>
                  <dt>Name used</dt>
                  <dd>“{attributes.thought.term}”</dd>
                </>
              )}
              {attributes.thought.qualifier && (
                <>
                  <dt>Scope of the passage</dt>
                  <dd>{attributes.thought.qualifier}</dd>
                </>
              )}
              {attributes.thought.missing && (
                <>
                  <dt>Missing element</dt>
                  <dd>{attributes.thought.missing}</dd>
                </>
              )}
              {attributes.thought.engagement && (
                <>
                  <dt>Engagement</dt>
                  <dd>
                    {engagementLabels[attributes.thought.engagement.kind]}.{' '}
                    {attributes.thought.engagement.rationale}
                  </dd>
                </>
              )}
              {attributes.thought.retrospective && (
                <>
                  <dt>Looking back</dt>
                  <dd>
                    {attributes.thought.retrospective.note}
                    {(attributes.thought.retrospective.from ||
                      attributes.thought.retrospective.until) &&
                      ` Belief dated ${[
                        ...new Set([
                          attributes.thought.retrospective.from,
                          attributes.thought.retrospective.until,
                        ]),
                      ]
                        .filter(Boolean)
                        .join('–')} by the text.`}{' '}
                    The record is dated by the report.
                  </dd>
                </>
              )}
              {attributes.thought.tier && (
                <>
                  <dt>Tier</dt>
                  <dd>
                    {tierLabels[attributes.thought.tier.value]}.{' '}
                    {attributes.thought.tier.basis}
                  </dd>
                </>
              )}
              {attributes.thought.conditions && (
                <>
                  <dt>Conditions</dt>
                  <dd>{attributes.thought.conditions}</dd>
                </>
              )}
              {attributes.thought.estimates?.map((e) => (
                <Fragment key={e.holder + e.value}>
                  <dt>Estimate by {e.holder}</dt>
                  <dd>
                    {e.value}. Horizon: {e.horizon}. Definition: {e.definition}.
                    {e.conditional ? ' Conditional.' : ''}
                    {e.conditions ? ` Conditions: ${e.conditions}` : ''}
                  </dd>
                </Fragment>
              ))}
            </>
          )}
          {attributes?.activityStage && (
            <>
              <dt>Activity stage</dt>
              <dd>{attributes.activityStage.replaceAll('_', ' ')}</dd>
            </>
          )}
          {attributes?.evaluatedSystem && (
            <>
              <dt>Evaluated system</dt>
              <dd>{attributes.evaluatedSystem}</dd>
              <dt>Activity scope</dt>
              <dd>{attributes.activityScope}</dd>
            </>
          )}
          {attributes?.transitionScope && (
            <>
              <dt>Transition scope</dt>
              <dd>{attributes.transitionScope.replaceAll('_', ' ')}</dd>
            </>
          )}
          {attributes?.role && (
            <>
              <dt>Role</dt>
              <dd>{attributes.role}</dd>
            </>
          )}
          {attributes?.transactionType && (
            <>
              <dt>Transaction type</dt>
              <dd>{attributes.transactionType.replaceAll('_', ' ')}</dd>
              <dt>Relationship context</dt>
              <dd>{attributes.relationshipContext}</dd>
            </>
          )}
          {attributes?.period && (
            <>
              <dt>Period or expected timing</dt>
              <dd>{attributes.period}</dd>
            </>
          )}
          {attributes?.conditions && (
            <>
              <dt>Conditions</dt>
              <dd>{attributes.conditions}</dd>
            </>
          )}
          {attributes?.transactionStage && (
            <>
              <dt>Stage</dt>
              <dd>{attributes.transactionStage}</dd>
            </>
          )}
          {attributes?.amount && (
            <>
              <dt>Amount</dt>
              <dd>
                {attributes.amount.bound.replaceAll('_', ' ')} ·{' '}
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: attributes.amount.currency,
                  maximumFractionDigits: 0,
                }).format(attributes.amount.value)}
                <br />
                {attributes.amount.scope.replaceAll('_', ' ')}
              </dd>
            </>
          )}
          {attributes?.quantity && (
            <>
              <dt>Quantity</dt>
              <dd>
                {attributes.quantity.bound
                  ? attributes.quantity.bound.replaceAll('_', ' ') + ' · '
                  : ''}
                {attributes.quantity.value.toLocaleString('en-US')}{' '}
                {attributes.quantity.unit}
              </dd>
            </>
          )}
        </dl>
        <p className="qualification">
          <strong>Scope and limits</strong>
          {claim.qualification}
        </p>
        {restsOnReporting(claim, repository) && (
          <p className="qualification">
            <strong>Rests on reporting</strong>
            No primary source supports this record; its supporting passages come
            from reporting.
          </p>
        )}
        <StatedReason claim={claim} repository={repository} />
        <h3 className="section-heading">
          The evidence{' '}
          <span>{claim.evidenceIds.length.toString().padStart(2, '0')}</span>
        </h3>
        {claim.evidenceIds.map((id) => {
          const e = repository.evidence.get(id)!;
          const s = repository.sources.get(e.sourceId)!;
          const archive = archiveCopy(s);
          return (
            <article className="evidence-card" key={id}>
              <div className="evidence-label">
                <span>{e.sourceRole} source</span>
                <span>{supportLabels[e.support]}</span>
              </div>
              <a
                className="source-title"
                href={s.evidenceUrl}
                target="_blank"
                rel="noreferrer"
              >
                {s.title} <span aria-hidden="true">↗</span>
              </a>
              <p className="source-byline">
                {s.publisher} ·{' '}
                {s.publicationDate ?? 'Publication date unknown'}
                {nonEnglishLanguage(s) && (
                  <>
                    {' · '}
                    <SourceLanguage source={s} />
                  </>
                )}
              </p>
              {archive && (
                <p className="source-archive">
                  <ArchiveLink source={s} />
                </p>
              )}
              <CopyReference
                label="Copy source reference"
                text={() => sourceReference(s)}
              />
              <CiteSource data={repository.data} source={s} />
              <span className="eyebrow passage-label">
                {e.passageType === 'quote' ? 'Source excerpt' : 'Paraphrase'}
                {e.contextOnly && ' · shown only with its context'}
              </span>
              {e.passageType === 'quote' ? (
                <blockquote>{quoted(e.passage)}</blockquote>
              ) : (
                <p className="passage">{e.passage}</p>
              )}
              {e.contextOnly && (
                <div className="context-only" role="note">
                  <p>
                    <strong>Read it with this context.</strong>{' '}
                    {e.contextOnly.requires}
                  </p>
                  <p className="small-note">
                    Why: {e.contextOnly.reason.replace(/\.?$/, '.')}
                  </p>
                  {requiredContext(
                    e,
                    repository.claims,
                    repository.evidence,
                  ).map(({ claim: c, quote }) => (
                    <div className="context-only-record" key={c.id}>
                      <button
                        className="text-button"
                        onClick={() => onClaim(c.id)}
                      >
                        {c.statement} Inspect →
                      </button>
                      {quote && (
                        <blockquote>{quoted(quote.passage)}</blockquote>
                      )}
                    </div>
                  ))}
                </div>
              )}
              <p className="locator">
                <strong>Location in source</strong> {e.locator}
              </p>
              {e.retrievalRoute && (
                <p className="locator retrieval-route">
                  <strong>How it was read</strong>{' '}
                  {retrievalRouteLabels[e.retrievalRoute]}
                </p>
              )}
              <p className="check-label">
                {e.verification === 'machine_checked'
                  ? 'Machine-checked'
                  : `Reviewed by ${e.reviewer}`}{' '}
                · {e.checkedAt}
              </p>
              <details>
                <summary>Source details and check notes</summary>
                <dl className="source-details">
                  <dt>Authors</dt>
                  <dd>{s.authors.join('; ')}</dd>
                  <dt>Version</dt>
                  <dd>{s.version}</dd>
                  {s.versionDate && (
                    <>
                      <dt>Version date</dt>
                      <dd>{s.versionDate}</dd>
                    </>
                  )}
                  <dt>Canonical address</dt>
                  <dd>
                    <a href={s.canonicalUrl} target="_blank" rel="noreferrer">
                      Open the canonical source ↗
                    </a>
                  </dd>
                  <dt>Accessed</dt>
                  <dd>{s.accessedAt}</dd>
                  {s.language && (
                    <>
                      <dt>Language</dt>
                      <dd>
                        {languageName(s.language)} ({s.language})
                      </dd>
                    </>
                  )}
                  {archive && (
                    <>
                      <dt>Archive copy</dt>
                      <dd>
                        <ArchiveNote source={s} label="Open archived copy" />
                      </dd>
                    </>
                  )}
                  <dt>Attribution</dt>
                  <dd>{s.reuse.attribution}</dd>
                  <dt>Reuse</dt>
                  <dd>
                    {s.reuse.licence}. {s.reuse.note}
                  </dd>
                  <dt>Check notes</dt>
                  <dd>{e.note}</dd>
                </dl>
              </details>
            </article>
          );
        })}
        <details className="semantics">
          <summary>Status and meaning</summary>
          <p>
            <strong>Editorial status. </strong>
            {claim.editorialState === 'seed' ? (
              <>
                <span>
                  {claim.evidenceIds.some(
                    (id) =>
                      repository.evidence.get(id)?.verification ===
                      'human_reviewed',
                  )
                    ? 'Not editorially accepted'
                    : 'Not reviewed by an editor'}
                </span>
                . An exploratory record that no editor has accepted. This status
                does not say whether a person has read any linked passage. Each
                evidence record above shows how it was checked.
              </>
            ) : (
              <span>Editorially accepted</span>
            )}
          </p>
          <p>
            <strong>Relation. </strong>
            {predicates[claim.predicate].description}
          </p>
          <p>
            <strong>Date. </strong>
            {claim.time.note}
          </p>
          <p>
            Record ID <code>{claim.id}</code>
          </p>
        </details>
      </aside>
    );
  }
  if (entity)
    return (
      <aside
        className="inspector"
        aria-label="Entity inspector"
        tabIndex={-1}
        id="inspector"
      >
        <div className="inspector-top">
          <span className="eyebrow">Record and direct connections</span>
          <button className="text-button" onClick={onClose}>
            Clear ×
          </button>
        </div>
        <span className="entity-type">
          <EntitySymbol type={entity.type} />
          {entityStyle[entity.type].label} · {entity.subtype}
        </span>
        <h2>{entity.name}</h2>
        <p className="entity-description">{entity.description}</p>
        {onPage && (entity.type === 'person' || entity.type === 'document') && (
          <button
            className="text-button entity-page-link"
            onClick={() => onPage(entity.id)}
          >
            {entity.type === 'person'
              ? 'Read the person page: documented path and works →'
              : 'Read the document page: versions and relations →'}
          </button>
        )}
        {(entity.documentVersion || entity.subtype === 'Framework family') && (
          <section aria-label="Framework version history">
            {entity.documentVersion && (
              <>
                <p className="small-note">{versionDescription(entity)}</p>
                <p className="small-note">{entity.documentVersion.dateNote}</p>
                <button
                  className="text-button"
                  onClick={() => onEntity(entity.documentVersion!.publisherId)}
                >
                  Publisher:{' '}
                  {
                    repository.entities.get(entity.documentVersion.publisherId)!
                      .name
                  }
                </button>
                {(['predecessors', 'successors'] as const).map((direction) => {
                  const links = versionNeighbours(
                    repository.data.claims,
                    entity.id,
                  )[direction];
                  return (
                    <div key={direction}>
                      <h3>
                        {direction === 'predecessors'
                          ? 'Replaces'
                          : 'Replaced by'}
                      </h3>
                      {links.length ? (
                        links.map((c) => {
                          const target =
                            direction === 'successors'
                              ? c.subject
                              : c.object.kind === 'entity'
                                ? c.object.entityId
                                : '';
                          return (
                            <p key={c.id}>
                              <button
                                className="text-button"
                                onClick={() => onEntity(target)}
                              >
                                {repository.entities.get(target)!.name}
                              </button>{' '}
                              <button
                                className="text-button"
                                onClick={() => onClaim(c.id)}
                              >
                                Evidence ↗
                              </button>
                            </p>
                          );
                        })
                      ) : (
                        <p className="small-note">
                          No replacement relation recorded.
                        </p>
                      )}
                    </div>
                  );
                })}
              </>
            )}
            <details>
              <summary>All versions in this family</summary>
              <ul>
                {frameworkVersions(
                  repository.data,
                  entity.documentVersion?.family ?? entity.id,
                ).map((v) => (
                  <li key={v.id}>
                    <button
                      className="text-button"
                      onClick={() => onEntity(v.id)}
                    >
                      {v.name}
                    </button>
                  </li>
                ))}
              </ul>
            </details>
            <p className="small-note">
              {frameworkLabels[entity.documentVersion?.family ?? entity.id]}
            </p>
            {onFamily && (
              <button
                className="text-button"
                onClick={() =>
                  onFamily(entity.documentVersion?.family ?? entity.id)
                }
              >
                View family timeline →
              </button>
            )}
          </section>
        )}
        {entity.aliases.length > 0 && (
          <p className="aliases">Also known as {entity.aliases.join(', ')}</p>
        )}
        <h3 className="section-heading">
          Relationships{' '}
          <span>{visibleClaims.length.toString().padStart(2, '0')}</span>
        </h3>
        <p className="small-note">
          Within the current filters. Select one to inspect its evidence.
        </p>
        {visibleClaims.length ? (
          visibleClaims.map((c) => (
            <ClaimButton
              key={c.id}
              claim={c}
              repository={repository}
              onSelect={onClaim}
            />
          ))
        ) : (
          <p className="empty-note">
            No relationships match the current filters.
          </p>
        )}
        <details className="semantics">
          <summary>Sources for this description</summary>
          <ul>
            {entity.sourceIds.map((id) => {
              const s = repository.sources.get(id)!;
              return (
                <li key={id}>
                  <a href={s.canonicalUrl} target="_blank" rel="noreferrer">
                    {s.title} ↗
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
          <code>{entity.id}</code>
        </details>
      </aside>
    );
  return (
    <aside className="inspector welcome" aria-label="Getting started">
      <span className="eyebrow">Inspectable sources</span>
      <h2>Explore the records</h2>
      <p>
        Roles, funding and compute agreements, links between documents, and
        dated governance texts.
      </p>
      <p>
        Select a name to see its direct connections. Select a relationship to
        see exactly what its source shows.
      </p>
      <div className="reading-guide">
        <span className="eyebrow">Start with a question</span>
        <button onClick={() => onEntity('anthropic')}>
          <span>01</span>
          <span>
            How is Anthropic connected?
            <small>People, cloud provision, policy</small>
          </span>
          <span>↗</span>
        </button>
        <button onClick={() => onTopic('ideas')}>
          <span>02</span>
          <span>
            How are ideas documented?
            <small>Citations and explicit credit</small>
          </span>
          <span>↗</span>
        </button>
        <button onClick={() => onTopic('capital')}>
          <span>03</span>
          <span>
            What capital was announced?<small>Amounts, dates and limits</small>
          </span>
          <span>↗</span>
        </button>
      </div>
      <div className="editorial-note">
        <h3>Dataset coverage</h3>
        <p>
          {repository.data.claims.length} claims about{' '}
          {repository.data.entities.length} people, organisations, documents and
          other subjects. Every claim links to evidence you can inspect.
        </p>
        <p>
          This is a selective historical sample. It is neither complete nor
          current. Each claim shows its editorial status and, separately, how
          its evidence was checked.
        </p>
      </div>
    </aside>
  );
}
