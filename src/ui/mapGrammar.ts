import type { Claim } from '../domain/schema';
import type { Predicate } from '../domain/predicates';
import { relationshipClaims } from '../domain/query';

export const relationStyles = {
  people: {
    label: 'Personnel & organisation',
    dash: '',
    color: 'var(--color-people)',
  },
  intellectual: {
    label: 'Authorship & intellectual',
    dash: '2 5',
    color: 'var(--color-ideas)',
  },
  governance: {
    label: 'Governance & versions',
    dash: '10 5',
    color: 'var(--color-governance)',
  },
  capital: { label: 'Capital', dash: '', color: 'var(--color-capital)' },
  compute: {
    label: 'Compute & commercial',
    dash: '10 4 2 4',
    color: 'var(--color-compute)',
  },
} as const;
export type RelationFamily = keyof typeof relationStyles;
const families: Record<Predicate, RelationFamily> = {
  evaluation_engagement: 'governance',
  separation_announced: 'people',
  name_transition_announced: 'people',
  held_role: 'people',
  co_founded: 'people',
  departure_announced: 'people',
  launched: 'people',
  acquired: 'people',
  unit_of: 'people',
  combined_into: 'people',
  founding_stated: 'people',
  licensing_hiring_agreement: 'people',
  unit_disbanded: 'people',
  authored: 'intellectual',
  published: 'intellectual',
  cites: 'intellectual',
  uses_method_from: 'intellectual',
  explicitly_credits: 'intellectual',
  discusses: 'intellectual',
  supported_research: 'intellectual',
  // Proposition records stay off the map (isPropositionRecord); listed for completeness.
  articulates_proposition: 'intellectual',
  contests_proposition: 'intellectual',
  bears_on_proposition: 'intellectual',
  reports_evaluation_of: 'governance',
  applies_framework: 'governance',
  supersedes_document: 'governance',
  changes_from: 'governance',
  states_provision: 'governance',
  provision_not_found: 'governance',
  provision_assessed: 'governance',
  holds_control_right: 'governance',
  has_legal_form: 'governance',
  formed_entity: 'governance',
  converted_into: 'governance',
  control_assessed: 'governance',
  enacted: 'governance',
  signed_commitment: 'governance',
  declined_commitment: 'governance',
  references_commitment: 'governance',
  invested_in: 'capital',
  investment_announced: 'capital',
  extended_credit_to: 'capital',
  participated_in_round: 'capital',
  announced_funding: 'capital',
  selected_cloud_provider: 'compute',
  cloud_terms: 'compute',
  compute_capacity: 'compute',
  uses_infrastructure: 'compute',
  uses_hardware_from: 'compute',
  plans_capacity: 'compute',
  plans_infrastructure_spend: 'compute',
};
export function relationFamily(claim: Claim): RelationFamily {
  return claim.predicate === 'published' && claim.topic === 'governance'
    ? 'governance'
    : families[claim.predicate];
}
export function stageLabel(claim: Claim) {
  return (
    claim.attributes?.activityStage ??
    claim.attributes?.transactionStage ??
    claim.attributes?.control?.stage ??
    claim.attributes?.commitment?.stage ??
    (claim.attributes?.transactionType ? 'undisclosed' : '')
  );
}
export function isProvisional(claim: Claim) {
  return [
    'proposed',
    'announced',
    'planned',
    'agreed_in_principle',
    'intent_announced',
    'committed',
    'contracted',
    'undisclosed',
  ].includes(stageLabel(claim));
}
export type ClaimBundle = ReturnType<typeof compactClaims>[number];
// A display group only: never inserted into Graphology or exported as a claim.
// Ordered endpoints, exact stage and family are independent keys.
export function compactClaims(claims: Claim[]) {
  const groups = new Map<
    string,
    {
      id: string;
      source: string;
      target: string;
      family: RelationFamily;
      stage: string;
      claims: Claim[];
    }
  >();
  for (const claim of relationshipClaims(claims)) {
    const family = relationFamily(claim);
    const stage = stageLabel(claim);
    const key = JSON.stringify([
      claim.subject,
      claim.object.entityId,
      family,
      stage,
    ]);
    const group = groups.get(key) ?? {
      id: key,
      source: claim.subject,
      target: claim.object.entityId,
      family,
      stage,
      claims: [],
    };
    group.claims.push(claim);
    groups.set(key, group);
  }
  return [...groups.values()]
    .sort((a, b) => a.id.localeCompare(b.id))
    .map((g) => ({
      ...g,
      claims: [...g.claims].sort((a, b) => a.id.localeCompare(b.id)),
    }));
}
