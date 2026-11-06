/**
 * Law questions (schema 2.31). A law question is Selekoa's question put to
 * every binding instrument compared in "Laws compared"; one claim per
 * instrument text and question records what the text states on it, or that
 * no passage was found within a recorded search. The questions are a set of
 * their own, outside the framework comparison's facets
 * (src/domain/framework-comparison.ts) and the card questions
 * (src/domain/model-card-facets.ts): their identifiers (`L.Q01`…) and keys
 * (`comparison-law-q01`…) cannot collide with either. Each question carries
 * the provision kind its cells record; four questions whose answers fit no
 * provision kind are statements (schema 2.20). This module holds only what
 * validation, the address resolver and the hubs need; each question's
 * wording and criterion are in the collection definition
 * (src/reading/laws-compared.ts). Labels come from the adjudicated candidate
 * pack (`research/laws-compared/questions.json`).
 */

/** The fifteen law questions, in the pack's order. */
export const lawFacets = [
  { id: 'L.Q01', label: 'Who is covered', kind: 'statement' },
  { id: 'L.Q02', label: 'Threshold', kind: 'threshold' },
  { id: 'L.Q03', label: 'Safety framework', kind: 'required_action' },
  { id: 'L.Q04', label: 'Framework published', kind: 'statement' },
  { id: 'L.Q05', label: 'Risk evaluation', kind: 'required_action' },
  { id: 'L.Q06', label: 'Outside assessment', kind: 'required_action' },
  { id: 'L.Q07', label: 'Incident reporting', kind: 'reporting' },
  { id: 'L.Q08', label: 'Model information', kind: 'required_action' },
  { id: 'L.Q09', label: 'Whistleblowers', kind: 'required_action' },
  { id: 'L.Q10', label: 'Adopted or signed', kind: 'date' },
  { id: 'L.Q11', label: 'In force', kind: 'date' },
  { id: 'L.Q12', label: 'Duties apply from', kind: 'date' },
  { id: 'L.Q13', label: 'Penalties', kind: 'statement' },
  { id: 'L.Q14', label: 'Enforcer', kind: 'decision_authority' },
  { id: 'L.Q15', label: 'Frameworks and codes', kind: 'statement' },
] as const;

export type LawFacetId = (typeof lawFacets)[number]['id'];

export const lawFacetById = (id: string) => lawFacets.find((f) => f.id === id);

/** A question's number as the criteria cite it: `L.Q05` → `Q05`. */
export const lawFacetNumber = (facetId: string) => facetId.slice(2);

/** The provision key a law cell carries: `comparison-law-q01` for `L.Q01`. */
export const lawFacetKey = (facetId: string) =>
  'comparison-law-' + lawFacetNumber(facetId).toLowerCase();

export const isLawFacetKey = (key: string) => key.startsWith('comparison-law-');

/** A law cell: a claim answering one law question for one instrument text. */
export const isLawCell = (claim: {
  attributes?: { provision?: { facet?: { id: string } } };
}) => !!lawFacetById(claim.attributes?.provision?.facet?.id ?? '');
