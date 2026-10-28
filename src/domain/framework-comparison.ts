/**
 * Comparison questions (facets) for frontier safety frameworks (schema 2.17).
 * A facet is Selekoa's edition-neutral question; one claim per edition and
 * facet records what the edition states on it, or that no passage was found
 * within a recorded search. Labels and criteria come from the adjudicated
 * comparison pack (`research/frontier-framework-comparison/`). Questions whose
 * quotations fit every edition's quotation limit are quoted; from schema 2.18
 * the other questions are given as explicit paraphrases with page locators.
 */
import type { Claim, Dataset } from './schema';
import { frameworkLabels, frameworkVersions } from './versions';

export type FacetKind =
  | 'risk_domain'
  | 'threshold'
  | 'required_action'
  | 'decision_authority'
  | 'evaluation_timing'
  | 'exception'
  | 'reporting'
  | 'revision';

export type ComparisonFacet = {
  id: string;
  label: string;
  criterion: string;
};

export type ComparisonDimension = {
  id: string;
  label: string;
  question: string;
  kind: FacetKind;
  /**
   * How a stated cell gives the edition's text: quoted, or (schema 2.18) as an
   * explicit paraphrase, which keeps every edition within the quotation limit.
   */
  passages: 'quote' | 'paraphrase';
  facets: ComparisonFacet[];
};

export const comparisonDimensions: ComparisonDimension[] = [
  {
    id: 'D1',
    label: 'Risk domains covered',
    question: 'Which risk domains does the edition name as within its scope?',
    kind: 'risk_domain',
    passages: 'paraphrase',
    facets: [
      {
        id: 'D1.cbrn',
        label: 'Chemical, biological, radiological or nuclear weapons',
        criterion:
          'The edition names any of chemical, biological, radiological or nuclear weapons (alone or combined) as a domain it tracks or sets a threshold for.',
      },
      {
        id: 'D1.cyber',
        label: 'Cyber operations',
        criterion:
          'The edition names cyber attacks, cyber offence or cybersecurity uplift as a tracked domain.',
      },
      {
        id: 'D1.autonomy',
        label: 'Autonomy, self-improvement or AI research and development',
        criterion:
          'The edition names autonomous operation, replication, self-improvement, AI research and development automation, or loss of control through such capabilities as a tracked domain. Overlap rule: autonomy, self-replication and AI research and development are recorded here; loss of control or misalignment defined through deception or undermining human oversight is recorded under “Other named domains”.',
      },
      {
        id: 'D1.persuasion',
        label: 'Persuasion or manipulation',
        criterion:
          'The edition names persuasion or manipulation of people as a tracked domain.',
      },
      {
        id: 'D1.other',
        label: 'Other named domains',
        criterion:
          'Any further domain the edition names as tracked (for example misalignment, deceptive behaviour, sabotage of oversight). Research categories or monitored-only domains are recorded with their status as worded. Overlap rule: loss of control or misalignment defined through deception or undermining human oversight is recorded here; autonomy, self-replication and AI research and development go under “Autonomy, self-improvement or AI research and development”.',
      },
    ],
  },
  {
    id: 'D2',
    label: 'Thresholds and triggers',
    question:
      'What capability levels does the edition define, and how is a level defined?',
    kind: 'threshold',
    passages: 'paraphrase',
    facets: [
      {
        id: 'D2.levels',
        label: 'Named levels or thresholds',
        criterion:
          'The names and structure of the capability levels or thresholds the edition uses.',
      },
      {
        id: 'D2.definition',
        label: 'How a threshold is defined',
        criterion:
          'The edition’s general definition of what reaching a threshold means (for example uplift relative to a baseline, or a capability that could cause severe harm).',
      },
    ],
  },
  {
    id: 'D3',
    label: 'Required actions when a threshold is reached',
    question:
      'What does the edition say must happen when a model reaches a threshold?',
    kind: 'required_action',
    passages: 'quote',
    facets: [
      {
        id: 'D3.safeguards',
        label: 'Safeguards required',
        criterion:
          'Safeguards, mitigations or standards the edition requires (or states it will apply) for a model at or above a threshold.',
      },
      {
        id: 'D3.halt',
        label: 'Pause, non-deployment or non-training',
        criterion:
          'A statement that development, training or deployment will stop, pause or not proceed when required safeguards are not in place or a level is reached.',
      },
    ],
  },
  {
    id: 'D4',
    label: 'Who decides',
    question:
      'Who determines thresholds and safeguard adequacy, and who oversees those decisions?',
    kind: 'decision_authority',
    passages: 'quote',
    facets: [
      {
        id: 'D4.determination',
        label: 'Determination of capability or safeguard adequacy',
        criterion:
          'The person, office or body the edition names as making or approving the determination that a threshold is reached, that safeguards are adequate, or that a model may be deployed.',
      },
      {
        id: 'D4.oversight',
        label: 'Board or external oversight',
        criterion:
          'A role the edition gives to a board, board committee, trust, or external party in overseeing or reviewing those decisions.',
      },
    ],
  },
  {
    id: 'D5',
    label: 'Evaluation cadence and timing',
    question: 'When, or how often, does the edition say models are evaluated?',
    kind: 'evaluation_timing',
    passages: 'paraphrase',
    facets: [
      {
        id: 'D5.cadence',
        label: 'Evaluation timing',
        criterion:
          'The edition’s statement of when evaluations are run: before deployment, at compute or capability intervals, on a calendar, or on another trigger.',
      },
    ],
  },
  {
    id: 'D6',
    label: 'Exceptions and discretion',
    question:
      'Where does the edition allow departures from its own procedures?',
    kind: 'exception',
    passages: 'quote',
    facets: [
      {
        id: 'D6.competitor',
        label: 'Provisions conditioned on other developers',
        criterion:
          'A provision that relaxes, adjusts or conditions the developer’s safeguards or commitments on what other developers do or have (often called a “race” or “marginal risk” clause). Scope tests that decide whether a model is covered by the framework are recorded as context, not counted.',
      },
      {
        id: 'D6.discretion',
        label: 'Other exceptions or discretion',
        criterion:
          'Any other stated exception, deviation, override or room for judgement in applying the framework.',
      },
    ],
  },
  {
    id: 'D7',
    label: 'Transparency and reporting',
    question:
      'To whom does the edition say it reports, internally and externally?',
    kind: 'reporting',
    passages: 'paraphrase',
    facets: [
      {
        id: 'D7.internal',
        label: 'Internal reporting',
        criterion:
          'Reporting or records the edition requires inside the developer (to leadership, a board, staff or a compliance function).',
      },
      {
        id: 'D7.external',
        label: 'Public or external reporting',
        criterion:
          'Disclosure the edition says it will make to the public, to governments, or to other external parties, excluding publication of the framework itself (recorded under “Revision process and approval”).',
      },
    ],
  },
  {
    id: 'D8',
    label: 'Revision',
    question:
      'How is the edition revised, and what does it say changed from the previous edition?',
    kind: 'revision',
    passages: 'paraphrase',
    facets: [
      {
        id: 'D8.process',
        label: 'Revision process and approval',
        criterion:
          'How the edition says the framework will be reviewed, updated and approved.',
      },
      {
        id: 'D8.changes',
        label: 'Stated changes from the previous edition',
        criterion:
          'The edition’s own statement (changelog, introduction or summary) of what changed from its predecessor. Not applicable to the first edition in a sequence.',
      },
    ],
  },
];

export const comparisonFacets = comparisonDimensions.flatMap((d) =>
  d.facets.map((f) => ({ ...f, dimension: d })),
);

/** The provision key a comparison cell carries: edition-neutral, across families. */
export const comparisonKey = (facetId: string) =>
  'comparison-' + facetId.toLowerCase().replace('.', '-');

export const isComparisonKey = (key: string) => key.startsWith('comparison-');

export const facetById = (id: string) =>
  comparisonFacets.find((f) => f.id === id);

/**
 * A comparison cell. Cells repeat passages that edition pages already list as
 * provisions, so provision lists leave them out; the comparison shows them.
 */
export const isComparisonCell = (claim: {
  attributes?: { provision?: { facet?: unknown } };
}) => !!claim.attributes?.provision?.facet;

export type CellStatus =
  | 'stated'
  | 'partly'
  | 'recorded'
  | 'not-found'
  | 'not-checked'
  | 'not-applicable';

export type ComparisonCollection = {
  id: string;
  version: number;
  title: string;
  question: string;
  editorialStatus: 'machine-proposed';
  /** Framework families as columns, in this fixed order. */
  families: string[];
  introduction: string;
  /** Status wording (Rule B, 2026-10-27). */
  legend: Record<CellStatus, string>;
  limits: string[];
  /** Cells with no record because the edition could not be inspected. */
  notChecked: { editionId: string; facetIds: string[]; reason: string }[];
  /** Cells with no record because the question does not apply to the edition. */
  notApplicable: { editionIds: string[]; facetId: string; reason: string }[];
};

/**
 * The comparison as rows (questions) by columns (framework families), each
 * column holding every edition, oldest first. Computed from stored claims; a
 * cell never counts, scores or ranks.
 */
export function comparisonView(
  data: Dataset,
  collection: ComparisonCollection,
) {
  const entities = new Map(data.entities.map((e) => [e.id, e]));
  const cells = new Map<string, Claim>();
  for (const c of data.claims) {
    const facet = c.attributes?.provision?.facet;
    if (facet) cells.set(`${c.subject} ${facet.id}`, c);
  }
  const columns = collection.families.map((family) => {
    const editions = frameworkVersions(data, family);
    if (!editions.length) throw new Error('Empty framework family: ' + family);
    return {
      family,
      label: frameworkLabels[family] ?? family,
      publisher:
        entities.get(editions[0].documentVersion!.publisherId)?.name ?? '',
      editions,
    };
  });
  const cell = (editionId: string, facetId: string) => {
    const claim = cells.get(`${editionId} ${facetId}`);
    if (claim) {
      const status: CellStatus =
        claim.predicate === 'provision_not_found'
          ? 'not-found'
          : claim.attributes!.provision!.facet!.status!;
      return { status, claim, reason: null };
    }
    const inapplicable = collection.notApplicable.find(
      (n) => n.editionIds.includes(editionId) && n.facetId === facetId,
    );
    if (inapplicable)
      return {
        status: 'not-applicable' as CellStatus,
        claim: null,
        reason: inapplicable.reason,
      };
    const gap = collection.notChecked.find(
      (n) => n.editionId === editionId && n.facetIds.includes(facetId),
    );
    if (!gap)
      throw new Error(`No comparison record for ${editionId} ${facetId}`);
    return {
      status: 'not-checked' as CellStatus,
      claim: null,
      reason: gap.reason,
    };
  };
  return {
    collection,
    dimensions: comparisonDimensions,
    columns,
    cell,
    claimIds: [...cells.values()]
      .filter((c) =>
        columns.some((col) => col.editions.some((e) => e.id === c.subject)),
      )
      .map((c) => c.id),
  };
}
export type ComparisonView = ReturnType<typeof comparisonView>;

/** Sentences every cell's qualification carries; the page states them once. */
export const cellStandingText = [
  'What the edition states, quoted from the cited expression. It is not evidence of implementation, compliance or effectiveness, and a shared question does not make two editions’ provisions equivalent.',
  'What the edition states, paraphrased from the cited expression with its page. It is not evidence of implementation, compliance or effectiveness, and a shared question does not make two editions’ provisions equivalent.',
  'A recorded absence within the stated scope: not a claim that the provision was deleted, and not a statement about practice or intent.',
  'Stated, partly: the passage has what the question’s criterion asks for, but in a weaker form than the criterion’s own words.',
  'Recorded, not re-checked: the passage was recorded from the archive capture of 2025-02-13; the comparison could not retrieve the edition.',
];

/** A cell's own note: its qualification without the sentences shared by every cell. */
export function cellNote(claim: Claim) {
  let note = claim.qualification;
  for (const text of cellStandingText) note = note.replace(text, '');
  return note.trim();
}
