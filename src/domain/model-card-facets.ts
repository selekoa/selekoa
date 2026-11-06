/**
 * The card questions' identifiers and labels, and the developers whose
 * cards are rows: what the hubs, the page titles and the address resolver
 * read, which load with the start page. The rest of the card questions'
 * code is in ./model-cards.ts, which loads with the pages that use it.
 */

/** The sixteen card questions, in the pack's order. */
export const cardFacets = [
  { id: 'MC.Q01', label: 'Card date' },
  { id: 'MC.Q02', label: 'Release date' },
  { id: 'MC.Q03', label: 'Framework cited' },
  { id: 'MC.Q04', label: 'Link to framework' },
  { id: 'MC.Q05', label: 'Framework determination' },
  { id: 'MC.Q06', label: 'Safeguards tied to determination' },
  { id: 'MC.Q07', label: 'Chemical and biological' },
  { id: 'MC.Q08', label: 'Cyber' },
  { id: 'MC.Q09', label: 'Autonomy and AI R&D' },
  { id: 'MC.Q10', label: 'Persuasion' },
  { id: 'MC.Q11', label: 'Alignment and deception' },
  { id: 'MC.Q12', label: 'Red-teaming' },
  { id: 'MC.Q13', label: 'External testers' },
  { id: 'MC.Q14', label: 'Government institute' },
  { id: 'MC.Q15', label: 'Release decision' },
  { id: 'MC.Q16', label: 'Stated limits' },
] as const;

/**
 * The developers whose cards are rows, in row order, as the cards' sources
 * name them (checked against the records in src/domain/model-cards.test.ts):
 * the developer filter and its address (`?developer=`) need them before any
 * record loads.
 */
export const cardDevelopers = [
  { id: 'anthropic', name: 'Anthropic' },
  { id: 'google-deepmind', name: 'Google DeepMind' },
  { id: 'meta', name: 'Meta' },
  { id: 'microsoft', name: 'Microsoft' },
  { id: 'openai', name: 'OpenAI' },
  { id: 'xai', name: 'xAI' },
] as const;

export type CardFacetId = (typeof cardFacets)[number]['id'];

export const cardFacetById = (id: string) =>
  cardFacets.find((f) => f.id === id);

/** A question's number as the criteria cite it: `MC.Q05` → `Q05`. */
export const cardFacetNumber = (facetId: string) => facetId.slice(3);
