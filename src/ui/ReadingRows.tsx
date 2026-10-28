import type { ReactNode } from 'react';
import type { Claim, Source } from '../domain/schema';
import { RecordLink } from './NavLink';
import type { Repository } from '../domain/repository';
import { predicates } from '../domain/predicates';
import { timeLabel } from '../domain/query';
import { derivationLabels, resolutionLabels } from '../domain/epistemics';
import { commitmentStageLabels } from '../domain/commitments';
import {
  partyRoleLabels,
  provisionKindLabels,
  type ProvisionKind,
} from '../domain/document-history';
import { ReviewMarkers } from './ReviewMarkers';
import { RecordMarks, StatedReason } from './RecordMarks';
import { quoted } from './quote';

export const changeBasis = {
  publisher_statement: 'Publisher statement',
  changelog: 'Official changelog',
  document_comparison: 'Inferred document comparison',
  assessment: 'Assessed effect',
} as const;

/** A plain, visible marker for records that are not settled. */
export function StatusBadge({ claim }: { claim: Claim }) {
  if (claim.resolution === 'supported') return null;
  return (
    <span className={`claim-status claim-status-${claim.resolution}`}>
      {resolutionLabels[claim.resolution]}
    </span>
  );
}

/** Who holds a view: the publisher, or its authors where they differ. */
function attribution(source: Source) {
  const [first] = source.authors;
  if (first === source.publisher) return source.publisher;
  const name = first.split(' ').at(-1);
  return `${name}${source.authors.length > 1 ? ' et al.' : ''} (${source.publisher})`;
}

/** The stored label of a provision record, or of the provision a change concerns. */
export function provisionLabel(claim: Claim, repository: Repository) {
  const key = claim.attributes?.provision?.key;
  if (!key) return null;
  if (claim.object.kind === 'literal') return String(claim.object.value);
  const stated = repository.data.claims.find(
    (c) =>
      c.predicate === 'states_provision' &&
      c.subject === claim.subject &&
      c.attributes?.provision?.key === key,
  );
  return stated && stated.object.kind === 'literal'
    ? String(stated.object.value)
    : key;
}

/** Heading for a change row that concerns one keyed provision. */
export function provisionHeading(claim: Claim, repository: Repository) {
  const kind = claim.attributes?.provision?.kind;
  if (!kind) return undefined;
  return `Provision · ${provisionKindLabels[kind as ProvisionKind]}: ${provisionLabel(claim, repository)}`;
}

export type ClaimProps = {
  repository: Repository;
  selectedClaimId: string | null;
  onClaim: (id: string) => void;
};

/** "Subject → relation → object", using short names where recorded. */
export function claimRoute(claim: Claim, repository: Repository) {
  const subject = repository.entities.get(claim.subject)!;
  const object =
    claim.object.kind === 'entity'
      ? repository.entities.get(claim.object.entityId)!
      : null;
  // A signatory record names its stage; a literal record names its value.
  const stage = claim.attributes?.commitment?.stage;
  const relation =
    claim.predicate === 'signed_commitment' && stage
      ? commitmentStageLabels[stage].toLowerCase()
      : predicates[claim.predicate].label;
  const target =
    claim.object.kind === 'literal'
      ? String(claim.object.value)
      : (object?.shortName ?? object?.name ?? '');
  return `${subject.shortName ?? subject.name} → ${relation} → ${target}`;
}

/** An inline link-styled control that opens one claim in the Evidence Inspector. */
export function InspectLink({
  claim,
  label,
  children,
  selectedClaimId,
  onClaim,
}: Omit<ClaimProps, 'repository'> & {
  claim: Claim;
  label: string;
  children: ReactNode;
}) {
  return (
    <button
      className="doc-inspect"
      data-claim-id={claim.id}
      aria-pressed={selectedClaimId === claim.id}
      aria-label={label}
      onClick={() => onClaim(claim.id)}
    >
      {children}
      <span aria-hidden="true"> ↗</span>
    </button>
  );
}

/** One stored claim as a full-width row; the whole row opens its evidence. */
export function ClaimRow({
  claim,
  repository,
  selectedClaimId,
  onClaim,
  heading,
  detail,
  link,
}: ClaimProps & {
  claim: Claim;
  /** Short label above the statement, such as a role or relation. */
  heading?: ReactNode;
  /** Replaces the default date line, for rows that show dates elsewhere. */
  detail?: ReactNode;
  /**
   * A separate navigation control below the row, never nested in it. With the
   * record's id it is a real link where that record has a page.
   */
  link?: { label: string; onClick: () => void; id?: string };
}) {
  return (
    <li>
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
        {heading && <span className="record-row-heading">{heading}</span>}
        <span className="dossier-statement">{claim.statement}</span>
        <span className="dossier-relation">
          {detail ?? timeLabel(claim)} · {derivationLabels[claim.derivation]} ·{' '}
          {resolutionLabels[claim.resolution]}{' '}
          <ReviewMarkers claim={claim} repository={repository} />{' '}
          <RecordMarks claim={claim} repository={repository} />
        </span>
        <span className="dossier-evidence-link">
          Inspect claim & evidence ↗
        </span>
      </button>
      <StatedReason claim={claim} repository={repository} />
      {link &&
        (link.id ? (
          <RecordLink
            className="text-button record-row-link"
            id={link.id}
            onOpen={link.onClick}
          >
            {link.label}
          </RecordLink>
        ) : (
          <button
            className="text-button record-row-link"
            onClick={link.onClick}
          >
            {link.label}
          </button>
        ))}
    </li>
  );
}

/**
 * One quoted provision (or recorded absence) of an exact edition. The row
 * shows the edition's own words, where they are, and who is named; the whole
 * row opens the claim and its evidence.
 */
export function ProvisionRow({
  claim,
  repository,
  selectedClaimId,
  onClaim,
}: ClaimProps & { claim: Claim }) {
  const provision = claim.attributes!.provision!;
  const absent = claim.predicate === 'provision_not_found';
  const assessed = claim.predicate === 'provision_assessed';
  // An assessment's evidence comes from other publications, on two sides.
  const sides = assessed
    ? (['supports', 'contradicts'] as const).map((side) => [
        ...new Set(
          claim.evidenceIds
            .map((id) => repository.evidence.get(id)!)
            .filter((e) => e.support === side)
            .map((e) => attribution(repository.sources.get(e.sourceId)!)),
        ),
      ])
    : null;
  const evidence = claim.evidenceIds
    .map((id) => repository.evidence.get(id)!)
    .find(
      (e) =>
        e.support === 'supports' &&
        repository.sources.get(e.sourceId)?.documentId === claim.subject,
    );
  const label =
    claim.object.kind === 'literal' ? String(claim.object.value) : '';
  return (
    <li>
      <button
        className="dossier-claim doc-claim provision-claim"
        data-claim-id={claim.id}
        data-provision-kind={provision.kind}
        aria-label={`Inspect claim & evidence: ${absent ? 'Not found in the inspected text. ' : ''}${claim.statement}`}
        aria-pressed={selectedClaimId === claim.id}
        onClick={() => onClaim(claim.id)}
      >
        <span className="provision-kind">
          {absent
            ? 'Not found in the inspected text'
            : assessed
              ? `Assessment of this ${provisionKindLabels[provision.kind].toLowerCase()} provision`
              : provisionKindLabels[provision.kind]}
        </span>
        <StatusBadge claim={claim} />
        <span className="provision-label">
          {assessed ? claim.statement : label}
        </span>
        {sides && (
          <span className="provision-parties">
            Holds: {sides[0].join(', ') || '—'} · Disputes:{' '}
            {sides[1].join(', ') || '—'}
          </span>
        )}
        {!absent && evidence?.passageType === 'quote' && (
          <span className="provision-quote">{quoted(evidence.passage)}</span>
        )}
        {provision.parties && (
          <span className="provision-parties">
            {provision.parties
              .map((p) => `${partyRoleLabels[p.role]}: ${p.actor}`)
              .join(' · ')}
          </span>
        )}
        {!assessed && (
          <span className="dossier-relation">
            {absent ? 'Inspected: ' : ''}
            {evidence?.locator}
          </span>
        )}
        <span className="dossier-evidence-link">
          Inspect claim & evidence ↗
        </span>
      </button>
    </li>
  );
}
